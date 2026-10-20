#!/usr/bin/env python3
"""Build the whole site from site.json.

    python3 tools/build_site.py

1. builds every companion in every language it lists (tools/build.py)
2. writes the hub, index.html, from hub/index.html (%SITE% and %CITED:slug% filled in),
   its share-card.png from hub/share-card.html when either that or site.json changed,
   and 404.html from hub/404.html
3. writes sitemap.xml (with hreflang pairs) and robots.txt
4. writes redirects/<old repository>/: pages for each companion's old address that
   send visitors, and search engines, to the new one. Copy each folder's contents over
   the old repository's site so its links keep working.

Change "site" in site.json to move the site to another address, then run this again.
"""
import datetime, html, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
SITE = CFG["site"].rstrip("/")
TODAY = datetime.date.today().isoformat()

def last_modified(path):
    """Date of the last commit to PATH, or today if it has uncommitted changes (same rule as build.py)."""
    git = lambda *a: subprocess.run(["git", "-C", str(ROOT), *a], capture_output=True, text=True).stdout.strip()
    if git("status", "--porcelain", "--", path): return TODAY
    return git("log", "-1", "--format=%cs", "--", path) or TODAY

def url(slug, lang="en"):
    return f"{SITE}/{slug}/" + ("" if lang == "en" else f"{lang}/")

# 1. companions
cited = {}
for c in CFG["companions"]:
    for lang in c["langs"]:
        r = subprocess.run([sys.executable, str(ROOT / "tools" / "build.py"), c["slug"], "--lang", lang],
                           capture_output=True, text=True)
        sys.stdout.write(r.stdout.splitlines()[0] + "\n" if r.stdout else "")
        if r.returncode:
            sys.exit(f"build failed for {c['slug']} ({lang}):\n{r.stderr}")
        m = re.search(r"(\d+) sources cited", r.stdout)
        cited[c["slug"]] = int(m.group(1))

# 2. hub
hub = (ROOT / "hub" / "index.html").read_text(encoding="utf-8").replace("%SITE%", SITE)
hub = re.sub(r"%CITED:([a-z0-9-]+)%", lambda m: str(cited[m.group(1)]), hub)
leftover = re.findall(r"%(?:SITE|CITED:[^%]*)%", hub)
if leftover: sys.exit(f"hub has unfilled placeholders: {leftover}")
hub = re.sub(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com/[^"]+)">',
             lambda m: f'<link rel="preload" as="style" href="{m.group(1)}" onload="this.onload=null;this.rel=\'stylesheet\'">'
                       f'<noscript><link rel="stylesheet" href="{m.group(1)}"></noscript>', hub)  # same as tools/build.py
(ROOT / "index.html").write_text(hub, encoding="utf-8")
print("wrote index.html (hub)")
card, card_src = ROOT / "share-card.png", ROOT / "hub" / "share-card.html"
if not card.exists() or card.stat().st_mtime < max(card_src.stat().st_mtime, (ROOT / "site.json").stat().st_mtime):
    subprocess.run([sys.executable, str(ROOT / "tools" / "share_card.py"), str(card_src), str(card)], check=True)
(ROOT / "404.html").write_text((ROOT / "hub" / "404.html").read_text(encoding="utf-8").replace("%SITE%", SITE), encoding="utf-8")

# 3. sitemap and robots
rows = [f"  <url>\n    <loc>{SITE}/</loc>\n    <lastmod>{last_modified('hub')}</lastmod>\n    <priority>1.0</priority>\n  </url>"]
for c in CFG["companions"]:
    alts = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{url(c["slug"], l)}"/>' for l in c["langs"]) if len(c["langs"]) > 1 else ""
    if alts: alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{url(c["slug"])}"/>'
    for lang in c["langs"]:
        rows.append(f"  <url>\n    <loc>{url(c['slug'], lang)}</loc>\n    <lastmod>{last_modified(c['slug'] + '/src')}</lastmod>\n"
                    f"    <priority>{'0.9' if lang == 'en' else '0.8'}</priority>{alts}\n  </url>")
(ROOT / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + "\n".join(rows) + "\n</urlset>\n", encoding="utf-8")
(ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
print(f"wrote sitemap.xml ({len(rows)} pages) and robots.txt")

# 4. redirects from the old addresses. GitHub Pages cannot send a real 301, so each
# page carries a canonical link and an immediate meta refresh (which search engines
# treat as a permanent move), plus a script that keeps the #module the visitor asked for.
REDIR = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<title>{moved_title}</title>
<link rel="canonical" href="{to}">
<meta http-equiv="refresh" content="0; url={to}">
<script>location.replace({to_js} + location.hash)</script>
</head>
<body>
<p>{moved_text} <a href="{to}">{to}</a></p>
</body>
</html>
"""
MOVED = {"en": ("{name} has moved", "{name} has moved to"),
         "he": ("{name} עבר לכתובת חדשה", "{name} עבר לכתובת:")}
out_root = ROOT / "redirects"
for c in CFG["companions"]:
    stem = c["old"].rstrip("/").rsplit("/", 1)[1]
    d = out_root / stem
    for lang in c["langs"]:
        to = url(c["slug"], lang)
        page = d / ("index.html" if lang == "en" else f"{lang}/index.html")
        page.parent.mkdir(parents=True, exist_ok=True)
        name = html.escape(c["name"][lang])
        moved = MOVED.get(lang, MOVED["en"])
        page.write_text(REDIR.format(lang=lang, moved_title=moved[0].format(name=name), moved_text=moved[1].format(name=name),
                                     to=to, to_js=json.dumps(to)), encoding="utf-8")
    (d / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    (d / ".nojekyll").write_text("", encoding="utf-8")
    print(f"wrote redirects/{stem}/ -> {url(c['slug'])}")
