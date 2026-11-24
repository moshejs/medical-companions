#!/usr/bin/env python3
"""Ship each self-hosted font family's licence with its files.

    python3 tools/font_licenses.py            # fetch the licence of any family that has none yet
    python3 tools/font_licenses.py --refresh  # fetch every family's licence again, at google/fonts main
    python3 tools/font_licenses.py --refresh --commit <sha>  # ... at that google/fonts commit
    python3 tools/font_licenses.py --check    # fail if a family in fonts/ lacks its licence or index row

Every family tools/fonts.py keeps under fonts/ comes from Google Fonts, and each is
published under its own licence in the google/fonts repository: a folder ofl/<key>,
apache/<key> or ufl/<key> whose METADATA.pb names the family and its licence, next to
the licence text (OFL.txt, LICENSE.txt or UFL.txt). The OFL and the UFL both require
that a redistributed copy of the fonts carry the copyright notice and the licence, so
for each family this tool copies, byte for byte and from a pinned commit:

  - the licence file, which for the OFL starts with that family's own copyright and
    Reserved Font Name lines, to fonts/licenses/<family>-<OFL|LICENSE|UFL>.txt
  - the folder's COPYRIGHT.txt, where there is one and it is not just another copy of
    the licence, to fonts/licenses/<family>-COPYRIGHT.txt (the UFL text has no
    copyright line of its own; for Ubuntu Mono the notice, "Copyright 2011 Canonical
    Ltd.", is in each font file's name table, as Google serves it, and in the index)

and records them in fonts/licenses/index.json (family, folder, licence, commit, files
with their sha256, the copyright lines from METADATA.pb), from which it writes
fonts/LICENSES.md: every font file pattern and the licence file that covers it.

tools/fonts.py runs sync() after it fetches fonts, so a new family gets its licence in
the same step and a family no page uses any more loses it. Like the fonts, only a
family missing from the index needs the network. check() is what tools/check_site.py
runs in CI.
"""
import hashlib, json, pathlib, re, sys, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "fonts"
DIR = FONTS / "licenses"
INDEX = DIR / "index.json"
TABLE = FONTS / "LICENSES.md"
REPO = "google/fonts"
RAW = "https://raw.githubusercontent.com/google/fonts/{commit}/{path}"
MAIN = "https://api.github.com/repos/google/fonts/commits/main"
# METADATA.pb license value -> the google/fonts folder, the licence file in it, its name
LICENCES = {
    "OFL": ("ofl", "OFL.txt", "SIL Open Font License 1.1"),
    "APACHE2": ("apache", "LICENSE.txt", "Apache License 2.0"),
    "UFL": ("ufl", "UFL.txt", "Ubuntu Font Licence 1.0"),
}
EXTRA = ("COPYRIGHT.txt",)  # shipped too where the family's folder has one


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def key(family):
    """The family's folder name in google/fonts: lower case, letters and digits only."""
    return re.sub(r"[^a-z0-9]", "", family.lower())


def present(fonts_dir=FONTS):
    """{family: [woff2 file, ...]} for every font file in fonts/, from fonts.json. A file
    fonts.json does not name is reported under the family None."""
    m = json.loads((fonts_dir / "fonts.json").read_text(encoding="utf-8"))
    owner = {}
    for faces in m["queries"].values():
        for f in faces:
            if f.get("file"): owner.setdefault(f["file"], f["family"])
    out = {}
    for p in sorted(fonts_dir.glob("*.woff2")):
        out.setdefault(owner.get(p.name), []).append(p.name)
    return out


def load(index=INDEX):
    if index.exists(): return json.loads(index.read_text(encoding="utf-8"))
    return {"source": f"https://github.com/{REPO}", "families": {}}


def http(url):
    req = urllib.request.Request(url, headers={"User-Agent": "medical-companions-fonts"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main_commit(get=http):
    return json.loads(get(MAIN))["sha"]


def metadata(text):
    """name, license and the distinct copyright lines of a METADATA.pb."""
    name = re.search(r'^name:\s*"([^"]+)"', text, re.M)
    lic = re.search(r'^license:\s*"([^"]+)"', text, re.M)
    cr = list(dict.fromkeys(re.findall(r'^\s*copyright:\s*"((?:[^"\\]|\\.)*)"', text, re.M)))
    return (name.group(1) if name else None), (lic.group(1) if lic else None), cr


def resolve(family, commit, get=http):
    """The google/fonts folder of FAMILY at COMMIT and its METADATA.pb fields."""
    for lic_id, (top, _, _) in LICENCES.items():
        path = f"{top}/{key(family)}"
        try:
            text = get(RAW.format(commit=commit, path=path + "/METADATA.pb")).decode("utf-8")
        except Exception:  # noqa: BLE001 - not in this folder: try the next
            continue
        name, lic, cr = metadata(text)
        if name != family:
            raise ValueError(f"{path}/METADATA.pb names {name!r}, not {family!r}")
        if lic not in LICENCES:
            raise ValueError(f"{family}: licence {lic!r} in {path}/METADATA.pb is not one this tool knows")
        if LICENCES[lic][0] != top:
            raise ValueError(f"{family}: METADATA.pb says {lic} but the folder is {top}/")
        return path, lic, cr
    raise LookupError(f"{family}: no folder {key(family)} under ofl/, apache/ or ufl/ in {REPO}@{commit[:12]}")


def fetch_family(family, commit, get=http, out=DIR):
    """Copy FAMILY's licence (and COPYRIGHT.txt where there is one) into OUT; its index entry."""
    path, lic, cr = resolve(family, commit, get)
    names = [LICENCES[lic][1]] + list(EXTRA)
    files = []
    for i, name in enumerate(names):
        url = RAW.format(commit=commit, path=f"{path}/{name}")
        try:
            data = get(url)
        except Exception:  # noqa: BLE001
            if i == 0: raise  # the licence itself must be there
            continue
        if i and hashlib.sha256(data).hexdigest() == files[0]["sha256"]: continue  # the licence again
        local = f"{slug(family)}-{name}"
        out.mkdir(parents=True, exist_ok=True)
        (out / local).write_bytes(data)
        files.append({"file": local, "upstream": f"{path}/{name}", "sha256": hashlib.sha256(data).hexdigest()})
    return {"folder": path, "license": lic, "commit": commit, "copyright": cr, "files": files}


def render(index, fams):
    """fonts/LICENSES.md for the index and the families present ({family: [files]})."""
    commits = sorted({e["commit"] for e in index["families"].values()})
    lines = [
        "# Font licences",
        "",
        "The web fonts in this folder are not covered by the repository's LICENSE. They are",
        "Google Fonts, fetched by `tools/fonts.py` as Google Fonts serves them (woff2 files cut",
        "into unicode-range slices by Google; this repository does not change them), and each",
        "family stays under its own licence. The licence file next to each family below is a",
        f"byte-for-byte copy from [{REPO}]({index['source']}) at commit"
        + ("s " if len(commits) > 1 else " ") + ", ".join(f"`{c}`" for c in commits) + ",",
        "fetched by `tools/font_licenses.py` (which also writes this file and checks it in CI).",
        "",
        "| Font files | Family | Licence | Licence file(s) | Source | Copyright |",
        "|---|---|---|---|---|---|",
    ]
    for fam in sorted(fams):
        e = index["families"][fam]
        src = f"https://github.com/{REPO}/tree/{e['commit']}/{e['folder']}"
        lic = LICENCES[e["license"]][2]
        files = ", ".join(f"[`licenses/{f['file']}`](licenses/{f['file']})" for f in e["files"])
        cr = "<br>".join(c.replace("|", "\\|") for c in e["copyright"]) or "see the licence file"
        lines.append(f"| `{slug(fam)}-*.woff2` ({len(fams[fam])}) | {fam} | {lic} | {files} | [{e['folder']}]({src}) | {cr} |")
    return "\n".join(lines) + "\n"


def sync(refresh=False, get=http, fonts_dir=FONTS, commit=None):
    """Fetch the licence of every family in fonts/ that has none (all with refresh), drop
    the licences of families no longer there, write index.json and LICENSES.md."""
    out, index_path, table = fonts_dir / "licenses", fonts_dir / "licenses" / "index.json", fonts_dir / "LICENSES.md"
    index = load(index_path)
    fams = {f: v for f, v in present(fonts_dir).items() if f is not None}
    todo = [f for f in sorted(fams) if refresh or f not in index["families"]]
    if todo:
        commit = commit or main_commit(get)
        for fam in todo:
            print(f"font licences: {fam} from {REPO}@{commit[:12]}")
            index["families"][fam] = fetch_family(fam, commit, get, out)
    for fam in [f for f in index["families"] if f not in fams]:
        for f in index["families"].pop(fam)["files"]:
            (out / f["file"]).unlink(missing_ok=True)
    index["families"] = dict(sorted(index["families"].items()))
    if fams:
        out.mkdir(parents=True, exist_ok=True)
        text = json.dumps(index, indent=1, ensure_ascii=False) + "\n"
        if not index_path.exists() or index_path.read_text(encoding="utf-8") != text: index_path.write_text(text, encoding="utf-8")
        md = render(index, fams)
        if not table.exists() or table.read_text(encoding="utf-8") != md: table.write_text(md, encoding="utf-8")
    return index


def check(fonts_dir=FONTS):
    """Problems: a font file no family owns, a family with no index entry, a licence file
    missing or changed since it was fetched, a stray licence file, LICENSES.md out of date
    (so a missing row)."""
    out, index_path, table = fonts_dir / "licenses", fonts_dir / "licenses" / "index.json", fonts_dir / "LICENSES.md"
    problems = []
    fams = present(fonts_dir)
    for f in fams.pop(None, []):
        problems.append(f"fonts/{f} is not in fonts/fonts.json, so its family and licence are unknown")
    if not fams: return problems
    if not index_path.exists():
        return problems + ["fonts/licenses/index.json is missing: run python3 tools/font_licenses.py"]
    index = load(index_path)
    shipped = set()
    for fam in sorted(fams):
        e = index["families"].get(fam)
        if not e:
            problems.append(f"{fam}: no licence recorded (fonts/licenses/index.json); run python3 tools/font_licenses.py"); continue
        if not e.get("files") or e["files"][0]["upstream"].rsplit("/", 1)[-1] != LICENCES.get(e.get("license"), (0, None))[1]:
            problems.append(f"{fam}: its index entry does not start with its {e.get('license')} licence file")
        for f in e.get("files", []):
            p = out / f["file"]; shipped.add(f["file"])
            if not p.exists():
                problems.append(f"{fam}: fonts/licenses/{f['file']} is missing")
            elif hashlib.sha256(p.read_bytes()).hexdigest() != f["sha256"]:
                problems.append(f"{fam}: fonts/licenses/{f['file']} differs from {REPO}@{e['commit'][:12]}/{f['upstream']}")
    for fam in index["families"]:
        if fam not in fams: problems.append(f"{fam}: licence recorded but no font files; run python3 tools/font_licenses.py")
    for p in sorted(out.glob("*.txt")) if out.exists() else []:
        if p.name not in shipped: problems.append(f"fonts/licenses/{p.name} belongs to no family in fonts/")
    if not problems:
        want = render(index, fams)
        if not table.exists() or table.read_text(encoding="utf-8") != want:
            problems.append("fonts/LICENSES.md is missing or out of date: run python3 tools/font_licenses.py")
    return problems


if __name__ == "__main__":
    if "--check" in sys.argv:
        found = check()
        for p in found: print("font licences:", p, file=sys.stderr)
        sys.exit(1 if found else 0)
    pin = sys.argv[sys.argv.index("--commit") + 1] if "--commit" in sys.argv else None
    idx = sync(refresh="--refresh" in sys.argv, commit=pin)
    print(f"font licences: {len(idx['families'])} families, licences in fonts/licenses/, index in fonts/LICENSES.md")
