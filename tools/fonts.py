#!/usr/bin/env python3
"""Self-host the site's web fonts, so no page loads anything from Google Fonts.

    python3 tools/fonts.py            # fetch what is missing (tools/build_site.py runs this first)
    python3 tools/fonts.py --refresh  # fetch every stylesheet again (a font's new version)

The parts still name their fonts the way Google Fonts does: a stylesheet link to
https://fonts.googleapis.com/css2?family=… in 00-head.html, src/<lang>/meta.html and
hub/index.html, and fonts.google for each language in site.json. This tool reads every
such query, asks Google Fonts for its stylesheet once, and keeps the woff2 files the
site can use under fonts/: for each face only the unicode-range slices (latin, latin-ext,
hebrew, greek, …) that cover a character somewhere in the site's parts, so a page never
asks for a slice it has no text for. Each file is named by a hash of its contents
(fonts/<family>-<subset>-<style><weight>.<hash>.woff2), so vercel.json can cache /fonts/
for a year: a changed font is a new address. fonts/fonts.json records the stylesheet of
every query (with the local files) and, for each family, a metric-matched fallback.

tools/build.py (and build_site.py for the hub) then call page_fonts(): each Google Fonts
link becomes an inline <style> of @font-face rules pointing at /fonts/, the preconnects
to Google go, and the page preloads only its body face and, when that file is small, its
h1 face (in the page's script: Hebrew for a Hebrew page). The fallback is a local font (Arial, Times New Roman
or Courier New) with size-adjust, ascent-override, descent-override and line-gap-override
set from the real font's metrics, named "<Family> Fallback" and listed right after the
family in the page's font stacks, limited to the family's unicode ranges. Until the web
font arrives the text is set in that fallback, which takes up the same room, so the swap
does not move the page.

The build itself needs no network: only a query missing from fonts.json is fetched.
Measuring the fallbacks needs fontTools and the fallback fonts installed (macOS has
them); without them a family gets no fallback and the tool says so.
"""
import hashlib, json, pathlib, re, sys, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "fonts"
MANIFEST = FONTS / "fonts.json"
CSS_API = "https://fonts.googleapis.com/css2?"
# a current Chrome, so Google Fonts answers with woff2 split into unicode-range slices
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
PRELOAD_MAX = 50_000  # bytes: a second preload larger than this is left to load on its own
LINK_RE = re.compile(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2\?([^"]+)">\n?')
PRECONNECT_RE = re.compile(r'<link rel="preconnect" href="https://fonts\.(?:googleapis|gstatic)\.com"(?: crossorigin)?>\n?')

# The local font each fallback is built from (and fonts metric-compatible with it, for
# systems without it). Monospaced families are found from the font itself (post.isFixedPitch).
FALLBACK = {
    "sans": (["Arial", "Liberation Sans", "Arimo"], ["/System/Library/Fonts/Supplemental/Arial.ttf", "/Library/Fonts/Arial.ttf"]),
    "serif": (["Times New Roman", "Liberation Serif", "Tinos"], ["/System/Library/Fonts/Supplemental/Times New Roman.ttf", "/Library/Fonts/Times New Roman.ttf"]),
    "mono": (["Courier New", "Liberation Mono", "Cousine"], ["/System/Library/Fonts/Supplemental/Courier New.ttf", "/Library/Fonts/Courier New.ttf"]),
}
SERIF = {"Newsreader", "Spectral", "Alegreya", "Playfair Display", "Gelasio", "Young Serif", "Bitter", "Fraunces",
         "DM Serif Display", "Literata", "Source Serif 4", "Zilla Slab", "Frank Ruhl Libre", "Noto Serif JP",
         "Noto Serif KR", "Noto Serif SC", "Noto Naskh Arabic"}
# English letter frequencies (per mille), for the average width of running text
FREQ = dict(zip("etaoinshrdlcumwfgypbvkjxqz ", [127, 91, 82, 75, 70, 67, 63, 61, 60, 43, 40, 28, 28, 24, 24, 22, 20,
                                                 20, 19, 15, 10, 8, 2, 2, 1, 1, 180]))


def norm(query):
    """A css2 query without its display parameter (the page's own display value is kept apart)."""
    q = query.replace("&amp;", "&")
    return "&".join(p for p in q.split("&") if not p.startswith("display="))


def display_of(query):
    m = re.search(r"display=(\w+)", query)
    return m.group(1) if m else "swap"


def queries():
    """Every Google Fonts query the parts and site.json name."""
    found = []
    files = list(ROOT.glob("*/src/00-head.html")) + list(ROOT.glob("*/src/*/meta.html")) + [ROOT / "hub" / "index.html"]
    for f in sorted(files):
        found += [norm(q) for q in LINK_RE.findall(f.read_text(encoding="utf-8"))]
    cfg = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
    used = {l for c in cfg["companions"] for l in c.get("langs", ["en"])}
    for code, info in cfg["languages"].items():
        g = info.get("fonts", {}).get("google")
        if g and code in used: found.append(norm(g))
    return list(dict.fromkeys(found))


def used_chars():
    """Every character in the site's parts: what a page could ever need a glyph for."""
    chars = set()
    pats = ["*/src/**/*.html", "*/src/**/*.js", "*/src/**/*.json", "*/src/**/*.css", "hub/*.html", "tools/i18n/*.json", "site.json"]
    for pat in pats:
        for f in ROOT.glob(pat):
            chars |= {ord(ch) for ch in f.read_text(encoding="utf-8")}
    return chars


def parse_range(r):
    out = []
    for part in r.split(","):
        part = part.strip().upper().removeprefix("U+")
        if "-" in part:
            a, b = part.split("-"); out.append((int(a, 16), int(b, 16)))
        elif "?" in part:
            out.append((int(part.replace("?", "0"), 16), int(part.replace("?", "F"), 16)))
        elif part:
            out.append((int(part, 16), int(part, 16)))
    return out


def hits(rng, chars):
    return any(a <= c <= b for c in chars for a, b in parse_range(rng))


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8")


def fetch_faces(query):
    """The faces of QUERY's stylesheet: descriptors, unicode-range, subset and remote url."""
    css = fetch(CSS_API + query + "&display=swap")
    faces = []
    for subset, body in re.findall(r"/\*\s*([\w\-\[\]. ]+?)\s*\*/\s*@font-face\s*\{(.*?)\}", css, flags=re.S):
        d = dict((k.strip(), v.strip()) for k, v in re.findall(r"([\w-]+)\s*:\s*([^;]+);", body))
        url = re.search(r"url\((https://[^)]+)\)", d["src"]).group(1)
        faces.append({"family": d["font-family"].strip("'\""), "style": d.get("font-style", "normal"),
                      "weight": d.get("font-weight", "400"), "stretch": d.get("font-stretch"),
                      "subset": subset.strip("[] ").replace(" ", ""), "range": d.get("unicode-range", ""), "url": url})
    if not faces: sys.exit(f"fonts: no faces in the Google Fonts stylesheet for {query}")
    return faces


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def load():
    if MANIFEST.exists(): return json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {"queries": {}, "fallbacks": {}}


def measure(font_path, fallback_path, cat):
    """size-adjust and the metric overrides that make the fallback set text in the room
    the real font takes (the method of Capsize and next/font)."""
    from fontTools.ttLib import TTFont
    def avg(f):
        cmap, hmtx, upem = f.getBestCmap(), f["hmtx"], f["head"].unitsPerEm
        tot = n = 0
        for ch, w in FREQ.items():
            g = cmap.get(ord(ch))
            if g: tot += hmtx[g][0] * w; n += w
        return tot / n / upem if n else None
    web, fb = TTFont(font_path), TTFont(fallback_path)
    a, b = avg(web), avg(fb)
    if not a or not b: return None
    size = a / b
    upem, hh = web["head"].unitsPerEm, web["hhea"]
    os2 = web["OS/2"]
    if os2.fsSelection & (1 << 7):  # USE_TYPO_METRICS: browsers use the typo metrics
        asc, desc, gap = os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap
    else:
        asc, desc, gap = hh.ascent, hh.descent, hh.lineGap
    pct = lambda v: f"{v * 100:.2f}%"
    return {"local": FALLBACK[cat][0], "size": pct(size), "ascent": pct(asc / upem / size),
            "descent": pct(abs(desc) / upem / size), "gap": pct(gap / upem / size)}


def sync(refresh=False):
    """Fetch every query not yet in fonts.json (all of them with refresh), download the
    slices the site's characters need, measure each family's fallback, write fonts.json."""
    m = load()
    chars = used_chars()
    FONTS.mkdir(exist_ok=True)
    wanted = queries()
    by_hash = {p.name.rsplit(".", 2)[-2]: p.name for p in FONTS.glob("*.woff2")}
    changed = False
    for q in wanted:
        faces = m["queries"].get(q)
        if faces is None or refresh:
            print(f"fonts: fetching {q[:90]}")
            faces = fetch_faces(q); m["queries"][q] = faces; changed = True
        for f in faces:
            need = hits(f["range"], chars) if f["range"] else True
            if need and not (f.get("file") and (FONTS / f["file"]).exists()):
                data = fetch(f["url"], binary=True)
                h = hashlib.sha256(data).hexdigest()[:10]
                name = by_hash.get(h) or f"{slug(f['family'])}-{f['subset']}-{'i' if f['style'] == 'italic' else ''}{f['weight'].replace(' ', '-')}.{h}.woff2"
                if not (FONTS / name).exists(): (FONTS / name).write_bytes(data)
                by_hash[h] = name; f["file"] = name; changed = True
            elif not need and f.get("file"):
                f.pop("file"); changed = True
    # each family's fallback, measured on its latin (or first) regular face
    fams = {f["family"] for q in wanted for f in m["queries"][q]}
    for fam in sorted(fams):
        if fam in m["fallbacks"] and not refresh: continue
        faces = [f for q in wanted for f in m["queries"][q] if f["family"] == fam and f.get("file")]
        if not faces: continue
        pick = sorted(faces, key=lambda f: (f["subset"] != "latin", f["style"] != "normal",
                                             abs(int(f["weight"].split()[0]) - 400)))[0]
        try:
            from fontTools.ttLib import TTFont
            fixed = TTFont(FONTS / pick["file"])["post"].isFixedPitch
            cat = "mono" if fixed or fam.endswith((" Mono", " Code")) or fam in ("Courier Prime", "Space Mono") else "serif" if fam in SERIF else "sans"
            path = next((p for p in FALLBACK[cat][1] if pathlib.Path(p).exists()), None)
            if not path: raise FileNotFoundError(f"no {FALLBACK[cat][0][0]} to measure against")
            fb = measure(FONTS / pick["file"], path, cat)
            if fb: m["fallbacks"][fam] = fb; changed = True
        except Exception as e:  # noqa: BLE001 - the fallback is an improvement, not a requirement
            print(f"fonts: no metric fallback for {fam}: {e}", file=sys.stderr)
    # drop files no query uses any more
    keep = {f["file"] for q in wanted for f in m["queries"][q] if f.get("file")}
    for p in FONTS.glob("*.woff2"):
        if p.name not in keep: p.unlink(); changed = True
    m["queries"] = {q: m["queries"][q] for q in wanted}
    if changed or not MANIFEST.exists():
        MANIFEST.write_text(json.dumps(m, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    n = len(keep)
    print(f"fonts: {len(wanted)} stylesheets, {n} woff2 files in fonts/ ({sum((FONTS / k).stat().st_size for k in keep) // 1024} KB)")
    return m


_M = None
def manifest():
    global _M
    if _M is None:
        _M = load()
    return _M


def faces_for(query):
    global _M
    q = norm(query)
    faces = manifest()["queries"].get(q)
    if faces is None:
        faces = sync()["queries"][q]
        _M = None
    return [f for f in faces if f.get("file")]


def face_rule(f, display, base):
    d = [f"font-family:'{f['family']}'", f"font-style:{f['style']}", f"font-weight:{f['weight']}"]
    if f.get("stretch"): d.append(f"font-stretch:{f['stretch']}")
    d += [f"font-display:{display}", f"src:url({base}{f['file']}) format('woff2')"]
    if f["range"]: d.append(f"unicode-range:{f['range'].replace(', ', ',')}")
    return "@font-face{" + ";".join(d) + "}"


def fallback_rule(fam, faces):
    fb = manifest()["fallbacks"].get(fam)
    if not fb: return ""
    ranges = list(dict.fromkeys(f["range"].replace(", ", ",") for f in faces if f["family"] == fam and f["range"]))
    src = ",".join(f'local("{n}")' for n in fb["local"])
    return (f'@font-face{{font-family:"{fam} Fallback";src:{src};size-adjust:{fb["size"]};ascent-override:{fb["ascent"]};'
            f'descent-override:{fb["descent"]};line-gap-override:{fb["gap"]}'
            + (f';unicode-range:{",".join(ranges)}' if ranges else "") + "}")


def match(faces, fam, w, subset):
    """The normal-style face of FAM in SUBSET a browser would use for weight W (CSS font
    matching: the weight itself, else for W above 500 the next heavier, then lighter)."""
    cands = [f for f in faces if f["family"] == fam and f["style"] == "normal" and f["subset"] == subset]
    span = lambda f: [int(x) for x in f["weight"].split()]
    for f in cands:
        if span(f)[0] <= w <= span(f)[-1]: return f
    heavier = sorted((f for f in cands if span(f)[0] > w), key=lambda f: span(f)[0])
    lighter = sorted((f for f in cands if span(f)[-1] < w), key=lambda f: -span(f)[-1])
    order = heavier + lighter if w > 500 else lighter + heavier
    return order[0] if order else None


def page_fonts(html, base="/fonts/", preload=(), subset="latin"):
    """HTML with each Google Fonts link replaced by inline @font-face rules for the local
    files, the preconnects to Google removed, "<Family> Fallback" added after each family
    in the page's <style> font stacks, and a preload for each (family, weight) in PRELOAD
    (normal style, the SUBSET slice, else latin)."""
    links = [q.replace("&amp;", "&") for q in LINK_RE.findall(html)]
    if not links: return html
    faces_all, fams, seen = [], [], set()
    for q in links:
        for f in faces_for(q):
            key = (f["family"], f["style"], f["weight"], f["subset"])
            if key in seen: continue
            seen.add(key); faces_all.append((f, display_of(q)))
            if f["family"] not in fams: fams.append(f["family"])
    rules = [face_rule(f, disp, base) for f, disp in faces_all]
    faces_all = [f for f, _ in faces_all]
    rules += [r for r in (fallback_rule(fam, faces_all) for fam in fams) if r]
    pre = []
    for i, (fam, w) in enumerate(preload):
        f = match(faces_all, fam, w, subset) or match(faces_all, fam, w, "latin")
        # past the first (the body face, which the largest text on a phone is set in), a
        # big file (a variable font with an optical-size axis runs to 130 KB) would only
        # hold up the page's script and first paint: its fallback stands in for it instead
        if f and f["file"] not in pre and (i == 0 or (FONTS / f["file"]).stat().st_size <= PRELOAD_MAX):
            pre.append(f["file"])
    tags = "".join(f'<link rel="preload" href="{base}{p}" as="font" type="font/woff2" crossorigin>\n' for p in pre[:2])
    block = tags + "<style>" + "".join(rules) + "</style>\n"
    first = True
    def put(m):
        nonlocal first
        if first:
            first = False; return block
        return ""
    html = LINK_RE.sub(put, html)
    html = PRECONNECT_RE.sub("", html)
    # the fallback right after its family, in every font stack of the page's styles
    have = {fam for fam in fams if manifest()["fallbacks"].get(fam)}
    def stacks(m):
        css = m.group(0)
        for fam in have:
            css = re.sub(r'(["\'])' + re.escape(fam) + r'\1(?!\s*,\s*["\']' + re.escape(fam) + ' Fallback)',
                         lambda n: f'{n.group(0)},"{fam} Fallback"', css)
        return css
    html = re.sub(r"<style>(?!@font-face).*?</style>", stacks, html, flags=re.S)
    return html


def h1_weight(html, default=700):
    """The weight the page's h1 is set in, from its styles."""
    found = re.findall(r"(?<![\w.#-])h1\{(?:[^}]*?font-weight:|font:)(\d+)", html)
    return int(found[-1]) if found else default


def first_family(html, var):
    m = re.search(r"--" + var + r':\s*"([^"]+)"', html)
    return m.group(1) if m else None


if __name__ == "__main__":
    sync(refresh="--refresh" in sys.argv)
