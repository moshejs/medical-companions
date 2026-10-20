#!/usr/bin/env python3
"""Derive the Claude artifact file from the built page.

The artifact is wrapped in its own document skeleton at publish time, so this
strips the doctype, html, head and body tags and the charset/viewport metas.

It also swaps the title. The published site wants a title that names the disease,
because that is the strongest on-page search signal; the artifact gallery wants a
short product name. Same page, two names.

Usage: make_artifact.py [BUILT_HTML] [OUT_HTML]
"""
import pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
src_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parent / "index.html"
out_path = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else HERE.parent.parent / "fmf-companion-artifact.html"

src = src_path.read_text(encoding="utf-8")
head = src.split("<head>", 1)[1].split("</head>", 1)[0]
body = src.split("<body>", 1)[1].rsplit("</body>", 1)[0]

head = re.sub(r'<meta charset="utf-8">\s*', "", head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', "", head)

title_tag = re.search(r"<title>.*?</title>", head)
if title_tag is None:
    sys.exit("no <title> in the built page")
head = head.replace(title_tag.group(0), "", 1)

out = ("<title>FMF Companion</title>\n"
       '<meta name="claude:viewport-fit-sides" content="cover">\n'
       + head.strip() + "\n" + body.strip() + "\n")

low = out.lower()
for forbidden in ("<!doctype", "<html", "<head>", "<body>"):
    if forbidden in low:
        sys.exit(f"artifact file still contains {forbidden}")

out_path.write_text(out, encoding="utf-8")
print(f"wrote {out_path} ({len(out)//1024} KB)")
