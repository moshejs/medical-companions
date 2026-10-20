#!/usr/bin/env python3
"""Build the whole site from site.json.

    python3 tools/build_site.py

1. builds every companion in every language it lists (tools/build.py): a first page,
   a page per module and the shared app.js
2. writes the hub, index.html, from hub/index.html (%SITE% and %CITED:slug% filled in),
   its share-card.png from hub/share-card.html when either that or site.json changed,
   and 404.html from hub/404.html
3. writes sitemap.xml and robots.txt. The sitemap lists every built page that may be
   indexed (not noindex), each with the hreflang pairs from its own head. A translation
   is noindex until it is complete and its reviewer is named in site.json (tools/build.py),
   so unreviewed pages never reach the sitemap
4. writes redirects/<old repository>/: pages for each companion's old address that
   send visitors, and search engines, to the new one (an old #module link goes straight
   to that module's page). Copy each folder's contents over
   the old repository's site so its links keep working.

Change "site" in site.json to move the site to another address, then run this again.
"""
import datetime, html, json, pathlib, re, subprocess, sys
import i18n

ROOT, CFG, SITE = i18n.ROOT, i18n.CFG, i18n.SITE
TODAY = datetime.date.today().isoformat()

def last_modified(path):
    """Date of the last commit to PATH, or today if it has uncommitted changes (same rule as build.py)."""
    git = lambda *a: subprocess.run(["git", "-C", str(ROOT), *a], capture_output=True, text=True).stdout.strip()
    if git("status", "--porcelain", "--", path): return TODAY
    return git("log", "-1", "--format=%cs", "--", path) or TODAY

url = lambda slug, lang="en": i18n.lang_url(slug, lang)

# 1. companions
cited = {}
for c in CFG["companions"]:
    for lang in c["langs"]:
        r = subprocess.run([sys.executable, str(ROOT / "tools" / "build.py"), c["slug"], "--lang", lang],
                           capture_output=True, text=True)
        sys.stdout.write(r.stdout.splitlines()[0] + "\n" if r.stdout else "")
        for line in r.stdout.splitlines()[1:]:
            if line.startswith(("untranslated", "missing strings", "review")): print("  " + line)
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

# 3. sitemap and robots: every built page of every companion that may be indexed
def pages(c, lang):
    """The built pages of companion C in LANG: (url, path), first page first."""
    base = ROOT / c["slug"] / i18n.lang_dir(lang)
    found = [(url(c["slug"], lang), base / "index.html")]
    for d in sorted(p for p in base.iterdir() if p.is_dir() and p.name not in {i18n.lang_dir(l) for l in c["langs"]}):
        f = d / "index.html"
        if f.exists() and 'data-root="' in f.read_text(encoding="utf-8"):
            found.append((url(c["slug"], lang) + d.name + "/", f))
    return found

rows = [f"  <url>\n    <loc>{SITE}/</loc>\n    <lastmod>{last_modified('hub')}</lastmod>\n    <priority>1.0</priority>\n  </url>"]
for c in CFG["companions"]:
    mod = last_modified(c["slug"] + "/src")
    for lang in c["langs"]:
        for i, (loc, f) in enumerate(pages(c, lang)):
            page = f.read_text(encoding="utf-8")
            if re.search(r'<meta name="robots" content="[^"]*noindex', page): continue
            alts = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{h}"/>'
                           for l, h in re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">', page))
            pri = (0.9 if i == 0 else 0.7) - (0 if lang == "en" else 0.1)
            rows.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{mod}</lastmod>\n    <priority>{pri:.1f}</priority>{alts}\n  </url>")
(ROOT / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + "\n".join(rows) + "\n</urlset>\n", encoding="utf-8")
(ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
print(f"wrote sitemap.xml ({len(rows)} pages) and robots.txt")

# 4. redirects from the old addresses. GitHub Pages cannot send a real 301, so each
# page carries a canonical link and an immediate meta refresh (which search engines
# treat as a permanent move), plus a script that sends a #module link to that module's page.
REDIR = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<title>{moved_title}</title>
<link rel="canonical" href="{to}">
<meta http-equiv="refresh" content="0; url={to}">
<script>var h=location.hash.slice(1);location.replace({to_js}+({mods_js}.indexOf(h)>-1?h+"/":location.hash))</script>
</head>
<body>
<p>{moved_text} <a href="{to}">{to}</a></p>
</body>
</html>
"""
out_root = ROOT / "redirects"
for c in CFG["companions"]:
    stem = c["old"].rstrip("/").rsplit("/", 1)[1]
    d = out_root / stem
    for lang in c["langs"]:
        to = url(c["slug"], lang)
        page = d / i18n.lang_dir(lang) / "index.html"
        page.parent.mkdir(parents=True, exist_ok=True)
        name = html.escape(c["name"].get(lang, c["name"]["en"]))
        s = i18n.Strings(c["slug"], lang)
        page.write_text(REDIR.format(lang=lang, moved_title=s.get("redirect.title").format(name=name),
                                     moved_text=s.get("redirect.text").format(name=name),
                                     to=to, to_js=json.dumps(to),
                                     mods_js=json.dumps([u[len(to):-1] for u, _ in pages(c, lang)[1:]])), encoding="utf-8")
    (d / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    (d / ".nojekyll").write_text("", encoding="utf-8")
    print(f"wrote redirects/{stem}/ -> {url(c['slug'])}")
