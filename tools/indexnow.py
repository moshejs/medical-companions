#!/usr/bin/env python3
"""Tell IndexNow search engines (Bing, Yandex, Seznam, Naver and others) about every
page in sitemap.xml. Run after a deploy has gone live.

    python3 tools/indexnow.py

The key is indexnow_key in site.json; its file, <key>.txt, sits at the site root so
the engines can check the site is ours. Google does not use IndexNow: submit
sitemap.xml in Google Search Console instead.
"""
import json, pathlib, re, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
cfg = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
site, key = cfg["site"].rstrip("/"), cfg["indexnow_key"]
urls = re.findall(r"<loc>([^<]+)</loc>", (ROOT / "sitemap.xml").read_text(encoding="utf-8"))
body = json.dumps({"host": site.split("://", 1)[1].split("/")[0], "key": key,
                   "keyLocation": f"{site}/{key}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                             headers={"Content-Type": "application/json; charset=utf-8"})
with urllib.request.urlopen(req, timeout=30) as r:
    print(f"IndexNow: HTTP {r.status} for {len(urls)} URLs")
