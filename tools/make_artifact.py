#!/usr/bin/env python3
"""Derive the Claude artifact file from the one-page build.

The site gives each module its own page; the artifact is a single file, so by default
this builds the companion with tools/build.py --single (every module in one page,
switched by #hash) into a temporary file and works from that.

The artifact is wrapped in its own document skeleton at publish time, so this
strips the doctype, html, head and body tags and the charset/viewport metas.

It also swaps the title. The published site wants a title that names the disease,
because that is the strongest on-page search signal; the artifact gallery wants a
short product name. Same page, two names.

A translation is its own artifact (--lang he). Its language, and for a right-to-left
language its direction (site.json), live on <html>, which the skeleton replaces, so a
one-line script sets them again before the body renders. --other URL points the language link (and the crawler
outline's link back) at the other language's artifact.

Usage: make_artifact.py COMPANION [--lang he] [--other URL] [BUILT_HTML] [OUT_HTML]

The short name comes from site.json; the file lands beside the repo, named after the
companion's old repository (alzheimers-companion-artifact.html).
"""
import json, pathlib, re, subprocess, sys, tempfile
import i18n

ROOT = pathlib.Path(__file__).resolve().parent.parent
args, LANG, OTHER = [], "en", None
it = iter(sys.argv[1:])
for a in it:
    if a == "--lang": LANG = next(it)
    elif a == "--other": OTHER = next(it)
    else: args.append(a)
if not args: sys.exit(__doc__.split("Usage: ")[1].split("\n")[0])
slug = args.pop(0)
comp = next((c for c in json.loads((ROOT / "site.json").read_text(encoding="utf-8"))["companions"] if c["slug"] == slug), None)
if comp is None: sys.exit(f"no companion {slug!r} in site.json")
TITLE = comp["name"][LANG]
stem = comp["old"].rstrip("/").rsplit("/", 1)[1] if comp.get("old") else f"{slug}-companion"
default_out = ROOT.parent / (f"{stem}-artifact.html" if LANG == "en" else f"{stem}-{LANG}-artifact.html")
if args:
    src_path = pathlib.Path(args[0])
else:
    src_path = pathlib.Path(tempfile.mkdtemp()) / "single.html"
    subprocess.run([sys.executable, str(ROOT / "tools" / "build.py"), slug, "--lang", LANG, "--single", "--out", str(src_path)],
                   check=True, stdout=subprocess.DEVNULL)
out_path = pathlib.Path(args[1]) if len(args) > 1 else default_out

src = src_path.read_text(encoding="utf-8")
head = src.split("<head>", 1)[1].split("</head>", 1)[0]
body = src.split("<body>", 1)[1].rsplit("</body>", 1)[0]

head = re.sub(r'<meta charset="utf-8">\s*', "", head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', "", head)

title_tag = re.search(r"<title>.*?</title>", head)
if title_tag is None:
    sys.exit("no <title> in the built page")
head = head.replace(title_tag.group(0), "", 1)

if OTHER:
    body, n = re.subn(r'(id="langBtn" href=")[^"]*"', lambda m: m.group(1) + OTHER + '"', body)
    if n != 1: sys.exit("language link not found")
    body = body.replace('<a href="../" hreflang="en"', f'<a href="{OTHER}" hreflang="en"')
DIR = i18n.lang(LANG)["dir"]
dir_js = ("<script>" + ("document.documentElement.setAttribute('dir','rtl');" if DIR == "rtl" else "")
          + f"document.documentElement.lang='{LANG}'</script>\n" if LANG != "en" else "")
out = (f"<title>{TITLE}</title>\n"
       '<meta name="claude:viewport-fit-sides" content="cover">\n'
       + dir_js + head.strip() + "\n" + body.strip() + "\n")

low = out.lower()
for forbidden in ("<!doctype", "<html", "<head>", "<body>"):
    if forbidden in low:
        sys.exit(f"artifact file still contains {forbidden}")

out_path.write_text(out, encoding="utf-8")
print(f"wrote {out_path} ({len(out)//1024} KB)")
