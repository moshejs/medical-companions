#!/usr/bin/env python3
"""Assemble one companion into its pages: one per module, and a shared script.

Usage: build.py COMPANION [--lang he] [--single] [--out PATH] [--draft]

COMPANION is a folder at the repo root (alzheimers, fmf). Parts come from
COMPANION/src: 00-head.html, 10-shell.html, sections/*.html (sorted), 90-foot.html,
js/*.js (sorted). Sources come from COMPANION/src/sources.json. The companion's first
page is COMPANION/index.html, or COMPANION/<lang>/index.html for another language.

Each module is its own page, so search engines can index each topic. The first page
carries the home module; every other module is written to <first page's folder>/<module>/
index.html with only its own section (the shell, nav and footer stay), its heading as
the h1, and its own title, description, canonical, hreflang pair, Open Graph tags and
structured data (with a breadcrumb). Every page loads one script, app.js beside the
first page, as app.js?v=<its hash> so a deploy never pairs new pages with an old cached
script. The router in js/00-core.js reads <body data-page data-root>, and sends an old
#module link to that module's page.

Titles and descriptions come from src/pages.json (src/<lang>/pages.json for another
language; the English one is never used for it), keyed by module id, each with "title"
and "description". A module missing there gets "<its nav title> | <companion name>" and
the first sentences of its lede that fit in 160 characters.

A translated page that still uses an English part (shell, footer, core script, its
section or its module script) is marked noindex and left out of the hreflang pairs, so
half-translated pages are not indexed as Hebrew copies of the English ones.

With --single, the one-page build: every module in one page with the script inline,
switched by #hash (tools/make_artifact.py uses it). --out PATH puts the page (or, without
--single, the first page) there. A translation whose core script predates page routing
is built that way too, with a warning.

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
import datetime, hashlib, html as H, json, re, subprocess, sys, pathlib

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
SINGLE = "--single" in args
names = [a for i, a in enumerate(args) if not a.startswith("--") and (i == 0 or args[i-1] not in ("--lang", "--out"))]
if not names or not (ROOT / names[0] / "src").is_dir():
    sys.exit(__doc__.split("\n\n")[1])
COMP = ROOT / names[0]
SRC = COMP / "src"
if OUT is None: OUT = COMP / "index.html" if LANG == "en" else COMP / LANG / "index.html"
comp = next((c for c in CFG["companions"] if c["slug"] == COMP.name), {})

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
section_files = sorted((SRC / "sections").glob("*.html"))
parts = [head, read(SRC / "10-shell.html")]
parts += [read(p) for p in section_files]
parts.append(read(SRC / "90-foot.html"))
js_files = sorted((SRC / "js").glob("*.js"))
js = [read(p) for p in js_files]
src_js = "const SOURCES=" + json.dumps(sources, ensure_ascii=False) + ";\n"
# the sources array goes right after the core helpers (first js part); <!--JS--> marks
# where the script starts, so the page build can move it out to app.js
html = "".join(parts) + "<!--JS-->" + js[0] + src_js + "".join(js[1:])
html = html.replace("%SITE%", SITE)

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
rel = lambda p: p.relative_to(ROOT) if p.is_relative_to(ROOT) else p

def report(first):
    print(first + f", {len(used)} sources cited, {len(unused)} listed but uncited")
    if unused: print("uncited:", ", ".join(unused))
    if untranslated: print(f"untranslated ({LANG}):", ", ".join(untranslated))

page_html, js_html = html.split("<!--JS-->")
if not SINGLE and "dataset.page" not in js_html:
    print(f"warning: {LANG} js/00-core.js has no page routing; built as one page", file=sys.stderr)
    SINGLE = True
if SINGLE:
    html = page_html + js_html
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    report(f"wrote {rel(OUT)} ({len(html)//1024} KB)")
    sys.exit(0)

# ------------------------------------------------------------------ one page per module
BASE = OUT.parent
head_html, body_html = page_html.split("<body>", 1)
m = re.fullmatch(r"\s*<script>\n?(.*)</script>\s*</body>\s*</html>\s*", js_html, re.S)
if not m: sys.exit("the js parts must open with <script> (00-core.js) and end with </script></body></html> (99-boot.js)")
app_js = m.group(1)

# modules, in nav order, from MODS in the core script: {id:'x',t:'Title',g:1,n:'1.1',d:'...'}
mods_js = re.search(r"\bconst MODS=\[(.*?)\];", app_js, re.S)
unjs = lambda s: re.sub(r"\\(.)", r"\1", s)
MODS = [(i, unjs(t)) for i, t in re.findall(r"\{id:'([a-z0-9]+)',t:'((?:\\.|[^'\\])*)'", mods_js.group(1) if mods_js else "")]
mod_ids = [i for i, _ in MODS]
if not mod_ids or mod_ids[0] != "home": sys.exit("could not read MODS (starting with home) from js/00-core.js")

def mod_sections(body):
    """(start, end, id) of each top-level <section data-mod> in BODY."""
    out, depth, start = [], 0, None
    for t in re.finditer(r"<section\b[^>]*>|</section>", body):
        if t.group(0).startswith("</"):
            depth -= 1
            if depth == 0 and start: out.append((start[0], t.end(), start[1])); start = None
        else:
            if depth == 0:
                d = re.search(r'data-mod="([a-z0-9]+)"', t.group(0))
                if d: start = (t.start(), d.group(1))
            depth += 1
    return out

secs = {i: (a, b) for a, b, i in mod_sections(body_html)}
if set(secs) != set(mod_ids):
    sys.exit(f"sections and MODS disagree: no section for {sorted(set(mod_ids) - set(secs))}, no MODS entry for {sorted(set(secs) - set(mod_ids))}")

# which source files make each module, to tell whether a translation is complete
def part_of(mid):
    files = {"10-shell.html", "90-foot.html", "js/00-core.js"}
    for p in section_files:
        if f'data-mod="{mid}"' in p.read_text(encoding="utf-8"): files.add(f"sections/{p.name}")
    for p in js_files:
        if re.search(rf"\binits\.{mid}\s*=", p.read_text(encoding="utf-8")): files.add(f"js/{p.name}")
    return files
PARTS = {i: part_of(i) for i in mod_ids}
def translated(lang, mid):
    return lang == "en" or all((SRC / lang / f).exists() for f in PARTS[mid])

pages_json = (SRC / "pages.json") if LANG == "en" else (SRC / LANG / "pages.json")
SEO = json.loads(pages_json.read_text(encoding="utf-8")) if pages_json.exists() else {}
unknown = set(SEO) - set(mod_ids)
if unknown: sys.exit(f"{rel(pages_json)} names modules that do not exist: {sorted(unknown)}")
NAME = comp.get("name", {}).get(LANG, COMP.name)

def lede_text(section):
    p = re.search(r'<p class="lede">(.*?)</p>', section, re.S)
    if not p: return ""
    t = re.sub(r'\s*<sup class="c".*?</sup>', "", p.group(1), flags=re.S)
    return " ".join(H.unescape(re.sub(r"<[^>]+>", "", t)).split())

def describe(text, limit=160):
    out = ""
    for s in re.split(r"(?<=[.!?])\s+", text):
        if len(out) + len(s) + 1 > limit: break
        out = (out + " " + s).strip()
    return out or text[:limit - 1].rsplit(" ", 1)[0] + "…"

canon_m = re.search(r'<link rel="canonical" href="([^"]+)">', head_html)
if not canon_m: sys.exit("no canonical link in the head")
HOME_URL = canon_m.group(1)
ALT_RE = r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">\n?'
alts = re.findall(ALT_RE, head_html)
other_langs = [l for l in comp.get("langs", ["en"]) if l != "en"]

def page_head(mid, nav, title, desc, url):
    h = head_html
    ok = translated(LANG, mid)
    # hreflang: this module in every language whose page for it is fully translated
    langs = ["en"] + [l for l in other_langs if translated(l, mid)]
    links = ""
    if ok and len(langs) > 1:
        for lang, href in alts:
            if lang in langs or lang == "x-default":
                links += f'<link rel="alternate" hreflang="{lang}" href="{href}{"" if mid == "home" else mid + "/"}">\n'
    i = re.search(ALT_RE, h)
    h = re.sub(ALT_RE, "", h)
    if i: h = h[:i.start()] + links + h[i.start():]
    if not ok:
        h = re.sub(r'<meta name="robots" content="[^"]*">', '<meta name="robots" content="noindex,follow">', h)
    # Until the script shows the module (removing its hidden attribute) it keeps its place
    # but is invisible: shown earlier, its steppers and phone-width drawings would grow
    # under the reader, and with a short static part (most of a module is drawn by the
    # script), the footer would start on screen and then drop away; so it also takes at
    # least a screen. Both count as layout shift. Without JavaScript it is simply shown.
    h = h.replace("</head>", "<style>body[data-page] [data-mod][hidden]{display:block!important;visibility:hidden;min-height:100vh}</style>"
                  "<noscript><style>body[data-page] [data-mod][hidden]{visibility:visible}</style></noscript>\n</head>", 1)
    if mid == "home": return h
    e = lambda s: H.escape(s, quote=True)
    h = re.sub(r"<title>.*?</title>", lambda _: f"<title>{e(title)}</title>", h, count=1, flags=re.S)
    for pat, val in ((r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{e(desc)}">'),
                     (r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">'),
                     (r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">'),
                     (r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{e(title)}">'),
                     (r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{e(title)}">'),
                     (r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{e(desc)}">'),
                     (r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{e(desc)}">')):
        h = re.sub(pat, lambda _: val, h, count=1)
    def ld(m):
        data = json.loads(m.group(1))
        if data.get("@type") == "FAQPage": return ""  # the questions belong to the first page
        if data.get("@type") != "MedicalWebPage": return m.group(0)
        site = data.get("isPartOf", {})
        data.update(name=title, headline=title, url=url, description=desc)
        crumbs = [(site.get("name"), site.get("url")), (NAME, HOME_URL), (nav, url)]
        data["breadcrumb"] = {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": n + 1, "name": c[0], "item": c[1]} for n, c in enumerate(c for c in crumbs if c[0] and c[1])]}
        return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "</script>"
    return re.sub(r'<script type="application/ld\+json">(.*?)</script>', ld, h, flags=re.S)

def page_body(mid):
    up = "" if mid == "home" else "../"
    keep = secs[mid]
    b, last = "", 0
    for i, (s, t) in sorted(secs.items(), key=lambda kv: kv[1][0]):
        b += body_html[last:s] + (body_html[s:t] if i == mid else "")
        last = t
    b += body_html[last:]
    sec = body_html[keep[0]:keep[1]]
    new = sec
    if mid != "home":
        new = re.sub(r"<h2>(.*?)</h2>", r'<h1 class="mh">\1</h1>', new, count=1, flags=re.S)
        # the crawler outline keeps its list of modules; its questions belong to the first page
        b = re.sub(r'(<noscript id="nsOutline">.*?</ul>).*?(\s*</section>\s*</noscript>)', r"\1\2", b, count=1, flags=re.S)
    b = b.replace(sec, new, 1)
    if mid != "home":
        # links relative to the first page: a language link goes to this module in that language
        def relink(a):
            tag = a.group(0)
            href = re.search(r'href="([^"]*)"', tag)
            if not href or re.match(r"[a-z][a-z0-9+.-]*:|/|#", href.group(1)): return tag
            to = up + href.group(1) + (mid + "/" if "hreflang=" in tag else "")
            return tag.replace(href.group(0), f'href="{to}"', 1)
        b = re.sub(r"<a\b[^>]*>", relink, b)
    def modlink(a):
        to = a.group(1)
        return f'href="{(up or "./") if to == "home" else up + to + "/"}"'
    b = re.sub(r'href="#(' + "|".join(mod_ids) + r')"', modlink, b)
    return b

app_name = "app.js"
ver = hashlib.sha1(app_js.encode("utf-8")).hexdigest()[:10]
BASE.mkdir(parents=True, exist_ok=True)
(BASE / app_name).write_text(app_js, encoding="utf-8")
written = 0
for mid, t in MODS:
    url = HOME_URL if mid == "home" else HOME_URL + mid + "/"
    sec = body_html[secs[mid][0]:secs[mid][1]]
    seo = SEO.get(mid, {})
    title = seo.get("title") or f"{t} | {NAME}"
    desc = seo.get("description") or describe(lede_text(sec))
    if len(desc) > 160: print(f"warning: {mid}: description is {len(desc)} characters; search results cut it near 160", file=sys.stderr)
    up = "" if mid == "home" else "../"
    body_tag = f'<body data-page="{mid}"' + (f' data-root="{up}"' if up else "") + ">"
    page = (page_head(mid, t, title, desc, url) + body_tag + page_body(mid)
            + f'<script src="{up}{app_name}?v={ver}"></script>\n</body>\n</html>\n')
    out = OUT if mid == "home" else BASE / mid / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")
    written += 1
# a module that was removed or renamed leaves its old page behind: remove it
for d in BASE.iterdir():
    old = d / "index.html"
    if (d.is_dir() and d.name not in mod_ids and d.name not in comp.get("langs", []) and old.exists()
            and 'data-root="' in old.read_text(encoding="utf-8")):
        old.unlink()
        if not any(d.iterdir()): d.rmdir()
        print(f"removed {rel(old)} (no such module now)")
report(f"wrote {rel(OUT)} and {written - 1} module pages ({len(OUT.read_text(encoding='utf-8'))//1024} KB first page, "
       f"{len(app_js)//1024} KB {app_name})")
