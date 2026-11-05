#!/usr/bin/env python3
"""Build the whole site from site.json.

    python3 tools/build_site.py                 (--no-prerender: skip step 6, e.g. without Chrome)

1. builds every companion in every language it lists (tools/build.py): a first page,
   a page per module and the shared app.js
2. writes the hub, index.html, from hub/index.html (%SITE% and %CITED:slug% filled in,
   and %LANGS:slug% / %LANGNAMES:slug%: a card's language links and names, for each
   language in the companion's "langs" whose first page may be indexed),
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

6. prerenders the text the module scripts draw into empty containers into each built
   page (tools/prerender.py, headless Chrome), so it is readable without JavaScript.

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

noindex = lambda f: bool(re.search(r'<meta name="robots" content="[^"]*noindex', f.read_text(encoding="utf-8")))

# 2. hub
def hub_langs(slug):
    """The languages of SLUG the hub links to: those whose built first page may be indexed,
    so an unreviewed translation is not promoted from the hub."""
    langs = i18n.companion(slug).get("langs") or sys.exit(f"hub names a companion that is not in site.json: {slug}")
    return [l for l in langs if not noindex(ROOT / slug / i18n.lang_dir(l) / "index.html")]

def hub_links(slug):
    """A card's links, one per language: hub.read from tools/i18n/<lang>.json ("Read in English"),
    or the language's own name until it has one. The hub is English, so only other languages
    carry lang and hreflang."""
    def link(l):
        label = i18n._load(ROOT / "tools" / "i18n" / f"{l}.json").get("hub.read") or i18n.lang(l)["name"]
        attrs = "" if l == i18n.SOURCE else f' hreflang="{l}" lang="{l}"'
        return f'<a href="{i18n.lang_url(slug, l)[len(SITE) + 1:]}"{attrs}>{label}</a>'
    return "".join(link(l) for l in hub_langs(slug))

hub = (ROOT / "hub" / "index.html").read_text(encoding="utf-8").replace("%SITE%", SITE)
hub = re.sub(r"%CITED:([a-z0-9-]+)%", lambda m: str(cited[m.group(1)]), hub)
hub = re.sub(r"%LANGS:([a-z0-9-]+)%", lambda m: hub_links(m.group(1)), hub)
hub = re.sub(r"%LANGNAMES:([a-z0-9-]+)%", lambda m: " · ".join(i18n.lang(l)["name"] for l in hub_langs(m.group(1))), hub)
leftover = re.findall(r"%(?:SITE|CITED:[^%]*|LANGS:[^%]*|LANGNAMES:[^%]*)%", hub)
if leftover: sys.exit(f"hub has unfilled placeholders: {leftover}")
hub = re.sub(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com/[^"]+)">',
             lambda m: f'<link rel="preload" as="style" href="{m.group(1)}" onload="this.onload=null;this.rel=\'stylesheet\'">'
                       f'<noscript><link rel="stylesheet" href="{m.group(1)}"></noscript>', hub)  # same as tools/build.py
hub = hub.replace("</head>", i18n.ANALYTICS + "</head>", 1)
(ROOT / "index.html").write_text(hub, encoding="utf-8")
print("wrote index.html (hub)")
card, card_src = ROOT / "share-card.png", ROOT / "hub" / "share-card.html"
if not card.exists() or card.stat().st_mtime < max(card_src.stat().st_mtime, (ROOT / "site.json").stat().st_mtime):
    subprocess.run([sys.executable, str(ROOT / "tools" / "share_card.py"), str(card_src), str(card)], check=True)
(ROOT / "404.html").write_text((ROOT / "hub" / "404.html").read_text(encoding="utf-8").replace("%SITE%", SITE)
                              .replace("</head>", i18n.ANALYTICS + "</head>", 1), encoding="utf-8")

# 2b. the site's own pages, about/ and privacy/: hub/_page-head.html wraps hub/<name>.html
ED = CFG.get("editor") or {}
ORG = {"@type": "Organization", "@id": f"{SITE}/#org", "name": CFG["name"], "url": f"{SITE}/",
       "email": "hello@medcompanions.org",
       **({"founder": {"@id": f"{SITE}/about/#editor"}} if ED else {}),
       **({"parentOrganization": {"@type": "Organization", **CFG["publisher"]}} if CFG.get("publisher") else {})}
EDITOR = ({"@type": "Person", "@id": f"{SITE}/about/#editor", "name": ED["name"], "jobTitle": ED.get("role", "Editor"),
           "worksFor": {"@id": f"{SITE}/#org"}, "url": f"{SITE}/about/"} if ED else None)
SITE_PAGES = {
    "about": ("About Medical Companions: who edits them and how AI makes them",
              "Who is responsible for Medical Companions, how AI researches and writes each cited guide, "
              "what has not been clinically reviewed yet, and how to read the evidence labels.", "AboutPage"),
    "privacy": ("Privacy · Medical Companions",
                "No accounts, cookies or ads. What Medical Companions keeps on your device, what it counts, "
                "and which services see your visit.", "WebPage"),
}
head = (ROOT / "hub" / "_page-head.html").read_text(encoding="utf-8")
for name, (title, desc, kind) in SITE_PAGES.items():
    page = {"@type": kind, "@id": f"{SITE}/{name}/", "url": f"{SITE}/{name}/", "name": title, "description": desc,
            "inLanguage": "en", "isPartOf": {"@id": f"{SITE}/#site"}, "publisher": {"@id": f"{SITE}/#org"},
            "dateModified": last_modified(f"hub/{name}.html")}
    if kind == "AboutPage": page["about"] = {"@id": f"{SITE}/#org"}
    ld = json.dumps({"@context": "https://schema.org", "@graph": [page, ORG] + ([EDITOR] if EDITOR else [])},
                    ensure_ascii=False, separators=(",", ":"))
    h = head
    for k, v in {"%TITLE%": html.escape(title), "%DESC%": html.escape(desc), "%PATH%": name, "%LD%": ld,
                 "%CUR_about%": ' aria-current="page"' if name == "about" else "",
                 "%CUR_privacy%": ' aria-current="page"' if name == "privacy" else ""}.items():
        h = h.replace(k, v)
    body = (ROOT / "hub" / f"{name}.html").read_text(encoding="utf-8")
    foot = ('</main>\n<footer><span>Medical Companions · educational only, not medical advice</span>'
            '<span><a href="%SITE%/about/">About</a> · <a href="%SITE%/privacy/">Privacy</a></span>'
            '<span>Built by <a href="https://quentin.software">Quentin.Code</a></span></footer>\n</div>\n</body>\n</html>\n')
    out = (h + body + foot).replace("%SITE%", SITE).replace("</head>", i18n.ANALYTICS + "</head>", 1)
    (ROOT / name).mkdir(exist_ok=True)
    (ROOT / name / "index.html").write_text(out, encoding="utf-8")
    print(f"wrote {name}/index.html")

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
rows += [f"  <url>\n    <loc>{SITE}/{n}/</loc>\n    <lastmod>{last_modified(f'hub/{n}.html')}</lastmod>\n    <priority>0.5</priority>\n  </url>" for n in SITE_PAGES]
for c in CFG["companions"]:
    mod = last_modified(c["slug"] + "/src")
    for lang in c["langs"]:
        for i, (loc, f) in enumerate(pages(c, lang)):
            if noindex(f): continue
            page = f.read_text(encoding="utf-8")
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
    if not c.get("old"): continue  # born on this site: no old address to forward from
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

# 5. no built page may ship an unfilled placeholder (hub/ is the template: /hub/ redirects to /)
left = [str(f.relative_to(ROOT)) for f in ROOT.rglob("*.html")
        if "%SITE%" in f.read_text(encoding="utf-8") and f.relative_to(ROOT).parts[0] not in ("hub", "redirects")
        and "src" not in f.relative_to(ROOT).parts and not f.relative_to(ROOT).parts[0].startswith(".")]
if left:
    sys.exit("unfilled %SITE% in: " + ", ".join(sorted(left)[:20]))

# 6. the text each module's script draws into empty containers, written into its page for
# readers and crawlers without JavaScript (tools/prerender.py; needs Chrome)
if "--no-prerender" in sys.argv[1:]:
    print("prerender: skipped (--no-prerender)")
else:
    r = subprocess.run([sys.executable, str(ROOT / "tools" / "prerender.py")])
    if r.returncode: sys.exit("prerender failed (run with --no-prerender to skip it)")
