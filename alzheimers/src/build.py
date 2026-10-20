#!/usr/bin/env python3
"""Assemble the companion into a single index.html.

Parts: src/00-head.html, src/10-shell.html, src/sections/*.html (sorted),
src/90-foot.html, src/js/*.js (sorted). Sources come from src/sources.json.

With --lang he, each part is taken from src/he/<same path> when that file exists
(otherwise the English part is used and listed as untranslated), the metadata block
between <!--META--> markers in 00-head.html is replaced by src/he/meta.html, the page
is set to lang="he" dir="rtl", src/he/rtl.css is appended to the styles, and the
output goes to ../he/index.html.

Citation markers [[Key]] or [[KeyA,KeyB]] anywhere in HTML or JS become
<sup class="c" data-ref="...">n</sup>, numbered by order in sources.json.
The build fails on an unknown key, and warns about sources never cited.
"""
import json, re, sys, pathlib

SRC = pathlib.Path(__file__).resolve().parent
LANG = "en"
for i,a in enumerate(sys.argv):
    if a == "--lang": LANG = sys.argv[i+1]
OUT = SRC.parent / "index.html" if LANG == "en" else SRC.parent / LANG / "index.html"
for i,a in enumerate(sys.argv):
    if a == "--out": OUT = pathlib.Path(sys.argv[i+1]).resolve()

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
print(f"wrote {OUT} ({len(html)//1024} KB), {len(used)} sources cited, {len(unused)} listed but uncited")
if unused: print("uncited:", ", ".join(unused))
if untranslated: print(f"untranslated ({LANG}):", ", ".join(untranslated))
