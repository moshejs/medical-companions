#!/usr/bin/env python3
"""Fetch the readership figures for /most-read/ and write its page body, hub/most-read.html.

    python3 tools/most_read.py                 the 12 full months before today
    python3 tools/most_read.py --end 2026-10   the 12 months ending with that month
    python3 tools/most_read.py --render        rewrite the page from hub/most-read.data.json, offline

Reads hub/most-read.json (one English Wikipedia article per health topic; "also" lists the
older titles of a renamed article, "guide" the companion that covers the topic), asks the
Wikimedia Analytics API for each article's monthly views by people (agent "user": crawlers
that say they are bots and traffic flagged as automated are left out), and ranks the
articles by their average month. Titles are first resolved to the article they now
redirect to, since the API counts a title only under the name it was opened by.

Writes hub/most-read.html (the page body; tools/build_site.py wraps it like about/ and
privacy/) and hub/most-read.data.json (the fetched numbers, for review). Both are committed:
the build itself never touches the network. Rerun this, commit both files, and the page,
its "last updated" line and its sitemap date move together.

The figures are Wikimedia Analytics data, released under CC0
(https://dumps.wikimedia.org/other/pageview_complete/readme.html).
"""
import concurrent.futures as cf, datetime, html, json, os, pathlib, sys, time, urllib.error, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT, DATA = ROOT / "hub" / "most-read.json", ROOT / "hub" / "most-read.html", ROOT / "hub" / "most-read.data.json"
# Wikimedia asks API clients for a descriptive User-Agent with a way to reach the operator
# (https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy) and
# may block generic ones: set MOST_READ_UA to one naming the site or a contact address.
UA = {"User-Agent": os.environ.get("MOST_READ_UA") or "most-read-page/1.0 (static site build tool)"}
CFG = json.loads((ROOT / "site.json").read_text(encoding="utf-8"))
MONTHS = "January February March April May June July August September October November December".split()


def get(url, tries=6):
    """JSON from URL; None on 404. Waits and retries when rate-limited (429) or on a network error."""
    last = None
    for t in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as f:
                return json.load(f)
        except urllib.error.HTTPError as e:
            if e.code == 404: return None
            last = f"HTTP {e.code}"
            print(f"  {last}, retrying: {url[-90:]}", file=sys.stderr, flush=True)
            time.sleep(float(e.headers.get("Retry-After") or 0) or 2 ** t)
        except (urllib.error.URLError, TimeoutError) as e:
            last = repr(e)
            time.sleep(2 ** t)
    sys.exit(f"most_read: could not fetch {url} ({last})")


def window(end_arg):
    """(first day, last day) of the 12 months ending with END_ARG (YYYY-MM), or the last full month."""
    if end_arg:
        y, m = map(int, end_arg.split("-"))
    else:
        first = datetime.date.today().replace(day=1)
        last = first - datetime.timedelta(days=1)
        y, m = last.year, last.month
    end = (datetime.date(y + (m == 12), m % 12 + 1, 1) - datetime.timedelta(days=1))
    sy, sm = (y, m - 11) if m > 11 else (y - 1, m + 1)
    return datetime.date(sy, sm, 1), end


def resolve(titles):
    """{title: the title it redirects to now} for every title in TITLES (itself if not a redirect)."""
    out = {}
    for i in range(0, len(titles), 50):
        chunk = titles[i:i + 50]
        q = urllib.parse.urlencode({"action": "query", "titles": "|".join(chunk), "redirects": 1, "format": "json", "formatversion": 2})
        d = get("https://en.wikipedia.org/w/api.php?" + q)["query"]
        step = {n["from"]: n["to"] for k in ("normalized", "redirects") for n in d.get(k, [])}
        missing = {p["title"] for p in d["pages"] if p.get("missing")}
        for t in chunk:
            cur = t
            for _ in range(3): cur = step.get(cur, cur)
            if cur in missing: sys.exit(f"most_read: no English Wikipedia article {t!r}")
            out[t] = cur
    return out


def monthly(title, start, end):
    """{YYYY-MM: views by people} for TITLE on English Wikipedia, START..END."""
    path = urllib.parse.quote(title.replace(" ", "_"), safe="")
    u = (f"https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/"
         f"{path}/monthly/{start:%Y%m%d}00/{end:%Y%m%d}00")
    return {i["timestamp"][:4] + "-" + i["timestamp"][4:6]: i["views"] for i in (get(u) or {}).get("items", [])}


def round_views(v):
    return int(round(v, -2)) if v >= 1000 else int(round(v, -1))


def month_name(d): return f"{MONTHS[d.month - 1]} {d.year}"
def day_name(d): return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def render(rows, start, end, fetched):
    guides = {c["slug"]: c["name"]["en"] for c in CFG["companions"]}
    n = len(rows)
    trs = []
    for r in rows:
        wiki = "https://en.wikipedia.org/wiki/" + urllib.parse.quote(r["title"].replace(" ", "_"), safe="(),'")
        cell = f'<a href="{html.escape(wiki)}" rel="external">{html.escape(r["title"])}</a>'
        if r.get("renamed_from"):
            cell += f'<span class="note">Includes views under its earlier title, {html.escape(r["renamed_from"])}</span>'
        if r["months"] < 12:
            cell += f'<span class="note">Only {r["months"]} of the 12 months have data</span>'
        if r.get("guide"):
            cell += f'<span class="guide">Our guide: <a href="%SITE%/{r["guide"]}/">{html.escape(guides[r["guide"]])}</a></span>'
        trs.append(f'<tr><td class="n">{r["rank"]}</td><td>{cell}</td><td class="v">{round_views(r["avg"]):,}</td></tr>')
    span = f"{month_name(start)} to {month_name(end)}"
    return f"""<h1>Health topics people read most on Wikipedia</h1>
<p class="lede">{n} English Wikipedia articles about health topics, ranked by how often people opened them in an average month from {span}. How much people read about a topic is one of the things we weigh when choosing which guide to write next.</p>

<div class="card">
  <p><b>This measures reading, not searching, and not patients.</b> Wikipedia does not record who its readers are or why they opened an article: they may be students, clinicians, carers, the curious or people with the condition. A high place says nothing about how common or how serious a condition is.</p>
</div>

<h2>What the numbers are</h2>
<ul>
  <li><b>Source:</b> the Wikimedia Analytics pageviews API, per article, for English Wikipedia, all devices, counting only views classed as by people: crawlers that identify themselves as bots and traffic the Wikimedia Foundation flags as automated are left out.</li>
  <li><b>Period:</b> {span}. The figure is the average of the 12 monthly totals, rounded to the nearest hundred.</li>
  <li><b>Fetched:</b> {day_name(fetched)}.</li>
  <li><b>Licence:</b> Wikimedia Analytics datasets are released under the <a href="https://creativecommons.org/publicdomain/zero/1.0/" rel="external">CC0 public domain dedication</a> (<a href="https://dumps.wikimedia.org/other/pageview_complete/readme.html" rel="external">Wikimedia's statement</a>).</li>
</ul>

<h2>What they leave out</h2>
<ul>
  <li><b>One article per topic.</b> Readers of a broader or related article are not counted. The figure for <i>Type 2 diabetes</i>, for example, does not include anyone who read the general <i>Diabetes</i> article.</li>
  <li><b>Views through a redirect are not counted.</b> Wikipedia counts a view under the title the reader opened, so someone who follows an alternative name to the article is counted under that name, not here.</li>
  <li><b>Not every health topic.</b> The list is the set of topics we looked at as possible guides in October 2026, plus the two the site began with (Alzheimer's disease and Familial Mediterranean fever). A topic missing from it may well be read more than the ones shown.</li>
  <li><b>English only.</b> Readers in other languages are not counted.</li>
</ul>

<h2>The ranking</h2>
<div class="scroll">
<table class="rank">
<caption>English Wikipedia articles by average monthly views by people, {span}</caption>
<thead><tr><th scope="col" class="n">#</th><th scope="col">Article</th><th scope="col" class="v">Views a month</th></tr></thead>
<tbody>
{chr(10).join(trs)}
</tbody>
</table>
</div>

<h2>Not medical advice</h2>
<p>This page is about what people read, not about any condition. It cannot tell you whether a symptom matters or what to do about it; for that, talk to your own clinician.</p>

<p class="updated">Last updated {day_name(fetched)}. Figures for {span}.</p>
"""


def render_saved():
    """Rewrite hub/most-read.html from the saved figures, without fetching (after a wording change)."""
    d = json.loads(DATA.read_text(encoding="utf-8"))
    rows = [a | {"renamed_from": ", ".join(a["series"][1:]) or None} for a in d["articles"]]
    day = datetime.date.fromisoformat
    OUT.write_text(render(rows, day(d["from"]), day(d["to"]), day(d["fetched"])), encoding="utf-8")
    print(f"most_read: rewrote {OUT.relative_to(ROOT)} from {DATA.relative_to(ROOT)} (fetched {d['fetched']})")


def main():
    args = sys.argv[1:]
    if "--render" in args: return render_saved()
    end_arg = args[args.index("--end") + 1] if "--end" in args else None
    start, end = window(end_arg)
    arts = json.loads(SRC.read_text(encoding="utf-8"))["articles"]
    titles = sorted({t for a in arts for t in [a["title"], *a.get("also", [])]})
    canon = resolve(titles)
    for t, c in canon.items():
        if t != c: print(f"  {t!r} now redirects to {c!r}")
    rows = []
    for a in arts:
        main_title = canon[a["title"]]
        others = sorted({t for t in a.get("also", []) if t != main_title} | ({a["title"]} if a["title"] != main_title else set()))
        rows.append({"title": main_title, "series": [main_title] + others, "guide": a.get("guide"),
                     "renamed_from": ", ".join(others) or None})
    seen = {}
    for r in rows:
        if r["title"] in seen: sys.exit(f"most_read: two topics resolve to the same article {r['title']!r}")
        seen[r["title"]] = r
    jobs = sorted({t for r in rows for t in r["series"]})
    with cf.ThreadPoolExecutor(2) as ex:
        got = dict(zip(jobs, ex.map(lambda t: monthly(t, start, end), jobs)))
    for r in rows:
        per = {}
        for t in r["series"]:
            for m, v in got[t].items(): per[m] = per.get(m, 0) + v
        r["months"], r["avg"] = len(per), (sum(per.values()) / len(per) if per else 0)
        r["by_month"] = dict(sorted(per.items()))
    rows.sort(key=lambda r: (-r["avg"], r["title"]))
    for i, r in enumerate(rows, 1): r["rank"] = i
    fetched = datetime.date.today()
    OUT.write_text(render(rows, start, end, fetched), encoding="utf-8")
    DATA.write_text(json.dumps({
        "source": "Wikimedia Analytics pageviews API, per-article, en.wikipedia, all-access, agent=user, monthly",
        "licence": "CC0 (https://dumps.wikimedia.org/other/pageview_complete/readme.html)",
        "from": start.isoformat(), "to": end.isoformat(), "fetched": fetched.isoformat(),
        "articles": [{k: r[k] for k in ("rank", "title", "series", "guide", "months", "avg", "by_month")} | {"avg": round(r["avg"], 1)}
                     for r in rows]}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"most_read: {len(rows)} articles, {start:%Y-%m} to {end:%Y-%m}; wrote {OUT.relative_to(ROOT)} and {DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
