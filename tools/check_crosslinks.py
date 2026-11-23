#!/usr/bin/env python3
"""Check the links to Bugs & Cells, a separate study guide by the same author.

Each condition below links once, from its footer, to the Bugs & Cells page whose own text names that condition
(its tests/check.mjs holds the same anchors). Fails (exit 1) when a footer lacks its link or has another one to
that site, a link has no rel="noopener", carries a query string, or uses another host, or (with --live) a
target does not answer HTTP 200. Reads the companions' src/90-foot.html, so it runs before or after a build.

Usage: check_crosslinks.py [--live]
"""
import pathlib, re, sys, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
HOST = "https://bugs-and-cells.quentin.software"
CROSSLINKS = {
    "tuberculosis": "/gallery/#bug-mycobacterium-tuberculosis",
    "guillain-barre-syndrome": "/gallery/#bug-campylobacter-jejuni",
    "colorectal-cancer": "/gallery/#bug-streptococcus-gallolyticus-bovis",
    "cystic-fibrosis": "/gallery/#bug-pseudomonas-aeruginosa",
    "cirrhosis": "/virus/#vir-hepatitis-b",
    "sepsis-and-shock": "/defense/",
}
LINK = re.compile(r'<a\s+href="(https?://[^"]*bugs-and-cells[^"]*)"([^>]*)>')

errors = []
for foot in sorted(ROOT.glob("*/src/90-foot.html")) + sorted(ROOT.glob("*/src/*/90-foot.html")):
    slug = foot.relative_to(ROOT).parts[0]
    links = LINK.findall(foot.read_text(encoding="utf-8"))
    want = CROSSLINKS.get(slug) if foot.parent.name == "src" else None
    if want is None and links and foot.parent.name == "src":
        errors.append(f"{slug}: links to Bugs & Cells but is not in CROSSLINKS")
    if want is not None and [h for h, _ in links] != [HOST + want]:
        errors.append(f"{slug}: expected one link to {HOST + want}, found {[h for h, _ in links]}")
    for href, attrs in links:
        if not href.startswith(HOST + "/") or "?" in href:
            errors.append(f"{slug}: {href} is not a plain {HOST} link")
        if 'rel="noopener"' not in attrs:
            errors.append(f"{slug}: {href} has no rel=\"noopener\"")

if "--live" in sys.argv[1:]:
    for path in sorted({p.split("#")[0] for p in CROSSLINKS.values()}):
        url = HOST + path
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "check_crosslinks"}), timeout=20) as r:
                print(f"{r.status} {url}")
                if r.status != 200: errors.append(f"{url}: HTTP {r.status}")
        except Exception as e:
            errors.append(f"{url}: {e}")

for e in errors: print("FAIL " + e)
print(f"{len(CROSSLINKS)} cross-links checked, {len(errors)} problem(s)")
sys.exit(1 if errors else 0)
