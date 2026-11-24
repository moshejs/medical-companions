#!/usr/bin/env python3
"""Offline checks for tools/font_licenses.py and the licences it ships in fonts/.

    python3 tools/test_font_licenses.py
"""
import hashlib, json, pathlib, shutil, sys, tempfile, unittest
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import font_licenses as fl

COMMIT = "0" * 40
OFL_A = b"Copyright 2020 The Alpha Project Authors\n\nThis Font Software is licensed under the SIL Open Font License, Version 1.1.\n"
UFL = b"UBUNTU FONT LICENCE Version 1.0\n"
UFL_CR = b"Copyright 2011 Canonical Ltd.\n"
# a fake google/fonts at COMMIT: Alpha Sans under ofl/, Beta Mono under ufl/ with a COPYRIGHT.txt
UPSTREAM = {
    "ofl/alphasans/METADATA.pb": b'name: "Alpha Sans"\nlicense: "OFL"\nfonts {\n  copyright: "Copyright 2020 The Alpha Project Authors"\n}\n',
    "ofl/alphasans/OFL.txt": OFL_A,
    "ufl/betamono/METADATA.pb": b'name: "Beta Mono"\nlicense: "UFL"\nfonts {\n  copyright: "Copyright 2011 Canonical Ltd."\n}\n',
    "ufl/betamono/UFL.txt": UFL,
    "ufl/betamono/COPYRIGHT.txt": UFL_CR,
}


def fake_get(calls=None):
    def get(url):
        if calls is not None: calls.append(url)
        if url == fl.MAIN: return json.dumps({"sha": COMMIT}).encode()
        prefix = f"https://raw.githubusercontent.com/google/fonts/{COMMIT}/"
        path = url.removeprefix(prefix)
        if path in UPSTREAM: return UPSTREAM[path]
        raise OSError(f"404 {url}")
    return get


class Fixture(unittest.TestCase):
    def setUp(self):
        self.dir = pathlib.Path(tempfile.mkdtemp())
        self.fonts = self.dir / "fonts"; self.fonts.mkdir()
        files = {"Alpha Sans": ["alpha-sans-latin-400.aaaaaaaaaa.woff2"], "Beta Mono": ["beta-mono-latin-400.bbbbbbbbbb.woff2"]}
        q = {"q": [{"family": fam, "file": f} for fam, fs in files.items() for f in fs]}
        (self.fonts / "fonts.json").write_text(json.dumps({"queries": q, "fallbacks": {}}))
        for fs in files.values():
            for f in fs: (self.fonts / f).write_bytes(b"wOF2")

    def tearDown(self):
        shutil.rmtree(self.dir)


class Sync(Fixture):
    def test_fetches_each_family_byte_for_byte_and_checks_clean(self):
        fl.sync(get=fake_get(), fonts_dir=self.fonts)
        lic = self.fonts / "licenses"
        self.assertEqual((lic / "alpha-sans-OFL.txt").read_bytes(), OFL_A)
        self.assertEqual((lic / "beta-mono-UFL.txt").read_bytes(), UFL)
        self.assertEqual((lic / "beta-mono-COPYRIGHT.txt").read_bytes(), UFL_CR)
        self.assertFalse((lic / "alpha-sans-COPYRIGHT.txt").exists())
        idx = json.loads((lic / "index.json").read_text())
        self.assertEqual(idx["families"]["Alpha Sans"]["license"], "OFL")
        self.assertEqual(idx["families"]["Beta Mono"]["folder"], "ufl/betamono")
        self.assertEqual(idx["families"]["Alpha Sans"]["commit"], COMMIT)
        md = (self.fonts / "LICENSES.md").read_text()
        self.assertIn("| `alpha-sans-*.woff2` (1) | Alpha Sans | SIL Open Font License 1.1 |", md)
        self.assertIn("Ubuntu Font Licence 1.0", md)
        self.assertIn(COMMIT, md)
        self.assertEqual(fl.check(self.fonts), [])

    def test_second_sync_needs_no_network(self):
        fl.sync(get=fake_get(), fonts_dir=self.fonts)
        calls = []
        fl.sync(get=fake_get(calls), fonts_dir=self.fonts)
        self.assertEqual(calls, [])

    def test_pinned_commit_is_used_instead_of_main(self):
        calls = []
        fl.sync(get=fake_get(calls), fonts_dir=self.fonts, commit=COMMIT)
        self.assertNotIn(fl.MAIN, calls)

    def test_a_family_dropped_from_fonts_loses_its_licence(self):
        fl.sync(get=fake_get(), fonts_dir=self.fonts)
        (self.fonts / "beta-mono-latin-400.bbbbbbbbbb.woff2").unlink()
        fl.sync(get=fake_get(), fonts_dir=self.fonts)
        self.assertFalse((self.fonts / "licenses" / "beta-mono-UFL.txt").exists())
        self.assertNotIn("Beta Mono", (self.fonts / "LICENSES.md").read_text())
        self.assertEqual(fl.check(self.fonts), [])

    def test_metadata_naming_another_family_is_refused(self):
        bad = dict(UPSTREAM); bad["ofl/alphasans/METADATA.pb"] = b'name: "Alpha Serif"\nlicense: "OFL"\n'
        get = lambda url: json.dumps({"sha": COMMIT}).encode() if url == fl.MAIN else bad[url.split(COMMIT + "/", 1)[1]]
        with self.assertRaises(ValueError):
            fl.sync(get=get, fonts_dir=self.fonts)

    def test_a_copyright_file_that_only_repeats_the_licence_is_not_copied(self):
        same = dict(UPSTREAM); same["ufl/betamono/COPYRIGHT.txt"] = UFL
        get = lambda url: json.dumps({"sha": COMMIT}).encode() if url == fl.MAIN else same[url.split(COMMIT + "/", 1)[1]]
        fl.sync(get=get, fonts_dir=self.fonts)
        self.assertFalse((self.fonts / "licenses" / "beta-mono-COPYRIGHT.txt").exists())
        self.assertEqual(fl.check(self.fonts), [])

    def test_unknown_family_is_an_error(self):
        with self.assertRaises(LookupError):
            fl.resolve("Gamma", COMMIT, fake_get())


class Check(Fixture):
    def setUp(self):
        super().setUp()
        fl.sync(get=fake_get(), fonts_dir=self.fonts)

    def test_new_family_without_licence_fails(self):
        m = json.loads((self.fonts / "fonts.json").read_text())
        m["queries"]["q2"] = [{"family": "Gamma", "file": "gamma-latin-400.cccccccccc.woff2"}]
        (self.fonts / "fonts.json").write_text(json.dumps(m))
        (self.fonts / "gamma-latin-400.cccccccccc.woff2").write_bytes(b"wOF2")
        self.assertTrue(any("Gamma: no licence recorded" in p for p in fl.check(self.fonts)))

    def test_missing_licence_file_fails(self):
        (self.fonts / "licenses" / "alpha-sans-OFL.txt").unlink()
        self.assertIn("Alpha Sans: fonts/licenses/alpha-sans-OFL.txt is missing", fl.check(self.fonts))

    def test_edited_licence_file_fails(self):
        (self.fonts / "licenses" / "alpha-sans-OFL.txt").write_bytes(OFL_A + b"edited\n")
        self.assertTrue(any("differs from google/fonts" in p for p in fl.check(self.fonts)))

    def test_missing_index_row_fails(self):
        md = self.fonts / "LICENSES.md"
        md.write_text("\n".join(l for l in md.read_text().splitlines() if "Beta Mono" not in l) + "\n")
        self.assertTrue(any("LICENSES.md" in p for p in fl.check(self.fonts)))

    def test_font_file_outside_fonts_json_fails(self):
        (self.fonts / "stray-latin-400.dddddddddd.woff2").write_bytes(b"wOF2")
        self.assertTrue(any("stray-latin-400" in p for p in fl.check(self.fonts)))


class Shipped(unittest.TestCase):
    """The licences committed in this repository."""

    def test_every_family_in_fonts_has_its_licence(self):
        self.assertEqual(fl.check(), [])

    def test_licence_files_match_their_recorded_hash_and_kind(self):
        idx = fl.load()
        self.assertTrue(idx["families"])
        for fam, e in idx["families"].items():
            first = e["files"][0]
            self.assertEqual(first["upstream"], f"{e['folder']}/{fl.LICENCES[e['license']][1]}", fam)
            data = (fl.DIR / first["file"]).read_bytes()
            self.assertEqual(hashlib.sha256(data).hexdigest(), first["sha256"], fam)
            if e["license"] == "OFL":
                self.assertIn(b"SIL Open Font License, Version 1.1", data, fam)
                self.assertTrue(data.lstrip().startswith(b"Copyright"), fam)  # the family's own header


if __name__ == "__main__":
    unittest.main()
