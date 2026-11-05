#!/usr/bin/env python3
"""Render a 1200x630 share card from an HTML file with headless Chrome.

    python3 tools/share_card.py hub/share-card.html share-card.png

%HOST% in the HTML becomes the site address from site.json without its scheme.
"""
import json, pathlib, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
src, out = pathlib.Path(sys.argv[1]).resolve(), pathlib.Path(sys.argv[2]).resolve()
host = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))["site"].split("://", 1)[1].rstrip("/")
tmp = pathlib.Path(tempfile.mkdtemp()) / "card.html"
tmp.write_text(src.read_text(encoding="utf-8").replace("%HOST%", host), encoding="utf-8")
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                "--window-size=1200,630", "--virtual-time-budget=5000", f"--screenshot={out}", f"file://{tmp}"],
               check=True, capture_output=True)
print(f"wrote {out}")
