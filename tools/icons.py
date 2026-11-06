#!/usr/bin/env python3
"""Write the site's icons from the hub's cup mark (the same drawing as the hub's own favicon).

    python3 tools/icons.py

Writes, at the site root (committed, like share-card.png; run again only to change the mark):
  icon.svg               the tab icon (transparent; a lighter cup in dark mode)
  favicon.ico            16, 32 and 48 px, for browsers and crawlers that ask for /favicon.ico
  apple-touch-icon.png   180x180, opaque (iOS fills transparency with black)
  icon-192.png, icon-512.png   the web app manifest's icons (site.webmanifest)
  icon-maskable-512.png  the mark inside the maskable safe zone (the middle 80%)
Needs Chrome (as tools/share_card.py; CHROME overrides its path) and Pillow; the build needs neither.
"""
import os, pathlib, subprocess, tempfile
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
BG, INK, INK_DARK = "#f6eee1", "#a5482a", "#f0a36e"  # the hub's --bg and its mark colour; --accent in dark mode

CUP = ("<path d='M9 17h28v6c0 8-6 14-14 14S9 31 9 23z' fill='{c}'/>"
       "<path d='M37 20h2.5a4.5 4.5 0 0 1 0 9H36' fill='none' stroke='{c}' stroke-width='3' stroke-linecap='round'/>"
       "<path d='M4 40h38' stroke='{c}' stroke-width='3' stroke-linecap='round'/>")
CX, CY = 23, 29.25  # the middle of the cup's drawn extent (x 2.5-43.5, y 17-41.5)

def tile(scale):
    """The cup centred on an opaque square, at SCALE of its drawn size."""
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect width='48' height='48' fill='{BG}'/>"
            f"<g transform='translate(24 24) scale({scale}) translate({-CX} {-CY})'>{CUP.format(c=INK)}</g></svg>")

CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
def png(svg, size, out):
    """SVG rendered by headless Chrome at 1024 px on a transparent page, then scaled to SIZE."""
    d = pathlib.Path(tempfile.mkdtemp())
    (d / "i.html").write_text("<style>html,body{margin:0;background:transparent}svg{display:block;width:1024px;height:1024px}</style>"
                              + svg, encoding="utf-8")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    "--default-background-color=00000000", "--window-size=1024,1024", f"--screenshot={d / 'i.png'}",
                    f"file://{d / 'i.html'}"], check=True, capture_output=True)
    Image.open(d / "i.png").convert("RGBA").resize((size, size), Image.LANCZOS).save(out, optimize=True)

icon = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>"
        f"<style>path{{color:{INK}}}@media (prefers-color-scheme:dark){{path{{color:{INK_DARK}}}}}</style>"
        + CUP.format(c="currentColor") + "</svg>\n")
(ROOT / "icon.svg").write_text(icon, encoding="utf-8")

png(tile(0.9), 180, ROOT / "apple-touch-icon.png")
png(tile(0.9), 192, ROOT / "icon-192.png")
png(tile(0.9), 512, ROOT / "icon-512.png")
png(tile(0.62), 512, ROOT / "icon-maskable-512.png")

# favicon.ico: the transparent mark, which reads at 16 px
tmp = pathlib.Path(tempfile.mkdtemp()) / "fav.png"
png(icon.replace("currentColor", INK).replace("<style>", "<!--").replace("</style>", "-->"), 256, tmp)
Image.open(tmp).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
for n in ("icon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"):
    print("wrote", n)
