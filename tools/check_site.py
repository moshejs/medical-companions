#!/usr/bin/env python3
"""Check the built site before it is deployed. Run after tools/build_site.py.

Fails (exit 1) on:
- a page whose JSON-LD does not parse
- a placeholder left in a page (%SITE%, %t:key%, %CITED:slug%, [[Key]] citation markers)
- a sitemap URL with no built page, listed twice, marked noindex, or whose canonical is another URL
- an indexable page (no noindex, canonical to itself) missing from the sitemap
- an internal link or asset that points at nothing, or a link to #id that the target page lacks

Usage: check_site.py [-v]
"""
import html.parser, json, pathlib, re, sys, urllib.parse, xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))["site"].rstrip("/")
VERBOSE = "-v" in sys.argv[1:]
SKIP_DIRS = {".git", ".github", "tools", "redirects", "fonts", "node_modules"}
PLACEHOLDER = re.compile(r"%SITE%|%t:[a-z0-9_.-]+%|%CITED:[a-z0-9-]+%|\[\[[A-Za-z0-9_.:-]+\]\]")

errors = []
def err(msg): errors.append(msg)


def built_pages():
    """Every built HTML page: index.html files and 404.html outside source folders."""
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT)
        if rel.parts[0] in SKIP_DIRS or rel.parts[0].startswith(".") or "src" in rel.parts or rel.parts[0] == "hub": continue
        if p.name in ("index.html", "404.html"): yield p


class Page(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.ld, self.canonical, self.noindex = set(), [], [], None, False
        self._ld = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: self.ids.add(a["id"])
        if tag == "a" and a.get("name"): self.ids.add(a["name"])
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        if tag == "meta" and a.get("name") == "robots" and "noindex" in (a.get("content") or ""): self.noindex = True
        if tag == "script" and a.get("type") == "application/ld+json": self._ld = []
        for k in ("href", "src"):
            v = a.get(k)
            # skip alternates/hreflang (other origins are fine) and preconnects
            if v and not (tag == "link" and a.get("rel") in ("preconnect", "dns-prefetch")):
                self.links.append(v)
    def handle_data(self, data):
        if self._ld is not None: self._ld.append(data)
    def handle_endtag(self, tag):
        if tag == "script" and self._ld is not None:
            self.ld.append("".join(self._ld)); self._ld = None


def url_to_file(path):
    """Site path (/fmf/what/) -> built file, as Vercel serves it (trailingSlash, cleanUrls)."""
    p = ROOT / urllib.parse.unquote(path).lstrip("/")
    if path.endswith("/") or p.is_dir(): p = p / "index.html"
    if not p.exists() and p.suffix == "": p = p.with_suffix(".html")
    return p


parsed = {}
def parse(f):
    if f not in parsed:
        pg = Page(); pg.feed(f.read_text(encoding="utf-8")); parsed[f] = pg
    return parsed[f]


pages = list(built_pages())
if not pages: sys.exit("check_site: no built pages; run tools/build_site.py first")

# 1. per page: JSON-LD, placeholders, links
missing_ids = {}
for f in pages:
    rel = f.relative_to(ROOT)
    text = f.read_text(encoding="utf-8")
    pg = parse(f)
    for i, block in enumerate(pg.ld):
        try: json.loads(block)
        except json.JSONDecodeError as e: err(f"{rel}: JSON-LD block {i + 1} does not parse: {e}")
    # placeholders, ignoring the page's own scripts (they hold no build placeholders, but may hold [[...]] in code)
    visible = re.sub(r"<script\b(?![^>]*ld\+json)[^>]*>.*?</script>", "", text, flags=re.S)
    for m in sorted(set(PLACEHOLDER.findall(visible)))[:5]: err(f"{rel}: unfilled placeholder {m}")
    base = SITE + "/" + ("" if str(rel.parent) == "." else rel.parent.as_posix() + "/")
    for href in pg.links:
        if href.startswith(("mailto:", "tel:", "data:", "javascript:", "#")) and not href.startswith("#"): continue
        absu = urllib.parse.urljoin(base, href)
        u = urllib.parse.urlsplit(absu)
        if u.scheme not in ("http", "https") or f"{u.scheme}://{u.netloc}" != SITE: continue
        if u.path.startswith("/_vercel/"): continue
        target = url_to_file(u.path or "/")
        if not target.exists():
            err(f"{rel}: link to {href} -> {target.relative_to(ROOT)} does not exist"); continue
        if u.fragment and target.suffix == ".html" and target.name in ("index.html", "404.html"):
            # #module links on a companion page are sent to that module's page by the router
            routed = (target.parent / u.fragment / "index.html").exists() or (target.parent.parent / u.fragment / "index.html").exists()
            if u.fragment not in parse(target).ids and not routed:
                missing_ids.setdefault((target.relative_to(ROOT), u.fragment), []).append(str(rel))
for (target, frag), srcs in sorted(missing_ids.items()):
    err(f"{srcs[0]}{' and %d more' % (len(srcs) - 1) if len(srcs) > 1 else ''}: link to #{frag} but {target} has no such id")

# 2. sitemap
sm = ROOT / "sitemap.xml"
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
locs = [e.text.strip() for e in ET.parse(sm).getroot().findall("s:url/s:loc", ns)]
seen = set()
for loc in locs:
    if loc in seen: err(f"sitemap: {loc} listed twice")
    seen.add(loc)
    if not loc.startswith(SITE + "/"): err(f"sitemap: {loc} is not on {SITE}"); continue
    f = url_to_file(loc[len(SITE):])
    if not f.exists(): err(f"sitemap: {loc} has no built page"); continue
    pg = parse(f)
    if pg.noindex: err(f"sitemap: {loc} is marked noindex")
    if pg.canonical and pg.canonical != loc: err(f"sitemap: {loc} has canonical {pg.canonical}")
for f in pages:
    pg = parse(f)
    if f.name != "index.html" or pg.noindex or not pg.canonical: continue
    rel = f.relative_to(ROOT).parent
    self_url = SITE + "/" + ("" if str(rel) == "." else str(rel).replace("\\", "/") + "/")
    if pg.canonical == self_url and self_url not in seen: err(f"sitemap: indexable page {self_url} is missing")

print(f"check_site: {len(pages)} pages, {sum(len(parse(f).ld) for f in pages)} JSON-LD blocks, {len(locs)} sitemap URLs")
if errors:
    for e in errors[: None if VERBOSE else 60]: print("  " + e)
    if len(errors) > 60 and not VERBOSE: print(f"  ... and {len(errors) - 60} more (-v for all)")
    sys.exit(f"check_site: {len(errors)} problem(s)")
print("check_site: OK")
