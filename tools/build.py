#!/usr/bin/env python3
"""Assemble one companion into a single index.html.

Usage: build.py COMPANION [--lang he] [--out PATH] [--draft]

COMPANION is a folder at the repo root (alzheimers, fmf). Parts come from
COMPANION/src: 00-head.html, 10-shell.html, sections/*.html (sorted), 90-foot.html,
js/*.js (sorted). Sources come from COMPANION/src/sources.json. The page is written
to COMPANION/index.html, or COMPANION/<lang>/index.html for another language.

With --lang he, each part is taken from src/he/<same path> when that file exists
(otherwise the English part is used and listed as untranslated), the metadata block
between <!--META--> markers in 00-head.html is replaced by src/he/meta.html, the page
is set to lang="he" dir="rtl", src/he/rtl.css is appended to the styles.

Citation markers [[Key]] or [[KeyA,KeyB]] anywhere in HTML or JS become
<sup class="c" data-ref="...">n</sup>, numbered by order in sources.json.
The build fails on an unknown key, and warns about sources never cited.

%SITE% anywhere in the page becomes the site address from site.json, so moving the
site to another domain is a one-line change there and a rebuild.

The MedicalWebPage structured data gets datePublished (site.json), dateModified (the
last commit to the companion's src/, or today when src/ has uncommitted changes) and
the publisher (site.json). Google Fonts stylesheets are loaded without blocking the
first paint; the fallback fonts in each --display/--body stack show until they arrive.
"""
import datetime, json, re, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
SITE = CFG["site"].rstrip("/")

def last_modified(slug):
    """Date of the last commit to SLUG/src, or today if it has uncommitted changes."""
    git = lambda *a: subprocess.run(["git", "-C", str(ROOT), *a], capture_output=True, text=True).stdout.strip()
    if git("status", "--porcelain", "--", f"{slug}/src"):
        return datetime.date.today().isoformat()
    return git("log", "-1", "--format=%cs", "--", f"{slug}/src") or datetime.date.today().isoformat()

args = [a for a in sys.argv[1:]]
LANG, OUT = "en", None
for i, a in enumerate(args):
    if a == "--lang": LANG = args[i+1]
    if a == "--out": OUT = pathlib.Path(args[i+1]).resolve()
names = [a for i, a in enumerate(args) if not a.startswith("--") and (i == 0 or args[i-1] not in ("--lang", "--out"))]
if not names or not (ROOT / names[0] / "src").is_dir():
    sys.exit(__doc__.split("\n\n")[1])
COMP = ROOT / names[0]
SRC = COMP / "src"
if OUT is None: OUT = COMP / "index.html" if LANG == "en" else COMP / LANG / "index.html"

untranslated = []
def read(p):
    if LANG != "en" and p.is_relative_to(SRC) and p.name != "sources.json":
        alt = SRC / LANG / p.relative_to(SRC)
        if alt.exists(): return alt.read_text(encoding="utf-8")
        if p.name != "00-head.html": untranslated.append(str(p.relative_to(SRC)))
    return p.read_text(encoding="utf-8")

sources = json.loads(read(SRC / "sources.json"))
order = {s["key"]: i + 1 for i, s in enumerate(sources)}
canon = {s["key"]: s["key"] for s in sources}
for s in sources:
    for a in s.get("aliases", []): canon[a] = s["key"]; order[a] = order[s["key"]]

head = (SRC / "00-head.html").read_text(encoding="utf-8")
if LANG != "en":
    L = SRC / LANG
    head = head.replace('<html lang="en">', f'<html lang="{LANG}" dir="rtl">', 1)
    a, b = head.index("<!--META-->"), head.index("<!--/META-->") + len("<!--/META-->")
    head = head[:a] + (L / "meta.html").read_text(encoding="utf-8").strip() + head[b:]
    i = head.rindex("</style>")
    head = head[:i] + (L / "rtl.css").read_text(encoding="utf-8") + head[i:]
parts = [head, read(SRC / "10-shell.html")]
parts += [read(p) for p in sorted((SRC / "sections").glob("*.html"))]
parts.append(read(SRC / "90-foot.html"))
js = [read(p) for p in sorted((SRC / "js").glob("*.js"))]
src_js = "const SOURCES=" + json.dumps(sources, ensure_ascii=False) + ";\n"
# the sources array goes right after the core helpers (first js part)
html = "".join(parts) + js[0] + src_js + "".join(js[1:])
html = html.replace("%SITE%", SITE)

comp = next((c for c in CFG["companions"] if c["slug"] == COMP.name), {})
def stamp(m):
    data = json.loads(m.group(1))
    if data.get("@type") != "MedicalWebPage": return m.group(0)
    if comp.get("published"): data["datePublished"] = comp["published"]
    data["dateModified"] = last_modified(COMP.name)
    if CFG.get("publisher"): data["publisher"] = {"@type": "Organization", **CFG["publisher"]}
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "</script>"
html = re.sub(r'<script type="application/ld\+json">(.*?)</script>', stamp, html, flags=re.S)

def async_fonts(m):
    href = m.group(1)
    return (f'<link rel="preload" as="style" href="{href}" onload="this.onload=null;this.rel=\'stylesheet\'">'
            f'<noscript><link rel="stylesheet" href="{href}"></noscript>')
html = re.sub(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com/[^"]+)">', async_fonts, html)

used, missing = set(), set()
def cite(m):
    keys = [k.strip() for k in m.group(1).split(",") if k.strip()]
    nums = []
    for k in keys:
        if k not in order:
            missing.add(k); continue
        used.add(canon[k]); nums.append(order[k])
    if not nums: return ""
    keys = list(dict.fromkeys(canon[k] for k in keys if k in order))
    label = ",".join(str(n) for n in sorted(set(nums)))
    return f'<sup class="c" data-ref="{",".join(keys)}" title="Source {label}">{label}</sup>'

# each key must contain a letter, so nested numeric arrays such as [[250,288]]
# in module JS are never mistaken for citations
CITE_RE = r"\[\[(\s*(?=[A-Za-z0-9_\-]*[A-Za-z])[A-Za-z0-9][A-Za-z0-9_\-]*(?:\s*,\s*(?=[A-Za-z0-9_\-]*[A-Za-z])[A-Za-z0-9][A-Za-z0-9_\-]*)*\s*)\]\]"
html = re.sub(CITE_RE, cite, html)
if missing:
    print("UNKNOWN citation keys:", ", ".join(sorted(missing)), file=sys.stderr)
    if "--draft" not in sys.argv: sys.exit(1)
unused = [s["key"] for s in sources if s["key"] not in used]
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(html, encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT) if OUT.is_relative_to(ROOT) else OUT} ({len(html)//1024} KB), {len(used)} sources cited, {len(unused)} listed but uncited")
if unused: print("uncited:", ", ".join(unused))
if untranslated: print(f"untranslated ({LANG}):", ", ".join(untranslated))
