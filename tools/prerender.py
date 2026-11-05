#!/usr/bin/env python3
"""Prerender the text the module scripts draw into empty containers, so a reader or
crawler without JavaScript sees it too.

    python3 tools/prerender.py                  # every built page of every companion and language
    python3 tools/prerender.py fmf/what/index.html fmf/he/index.html   # just these pages
    python3 tools/prerender.py --check          # report what would change, write nothing

A module page ships containers such as <div id="whCards"></div> that its init fills with
$('#whCards').innerHTML=... . For each built page this loads the page in headless Chrome
(like tools/smoke.py) and, for every element with an id inside the page's own section
that is empty in the static HTML and holds text once the module has initialised, writes
that rendered HTML into the static file between <!--pre--> and <!--/pre-->. The script
still runs as before and replaces it, and the section stays invisible until the script
shows it (tools/build.py), so a reader with JavaScript sees no change.

What is left out:
- the quiz, flashcard (review) and sources modules (reader state; sources are static already)
- the page chrome outside the module's section (nav, theme button, pager)
- <svg>, <canvas> and form fields inside a container, and any container whose only
  text is on buttons (steppers, filters, toggles)
- anything that depends on the reader: each page is rendered twice, the second time at
  phone width, another locale and time zone, a clock 400 days ahead and a different
  Math.random, and a container whose HTML differs between the two is left empty
- a container whose HTML would repeat an id already on the page, or block HTML
  (a <p>, a <div>) meant for an inline container such as a <p>, which would re-parse differently

Each written page is then loaded once more and must end up with the same DOM, after the
script has run, as the original page; if it does not, the page is left as it was.

The output is deterministic (reduced motion, a fresh browser profile, fixed window size)
and the step is idempotent: <!--pre-->...<!--/pre--> is removed before a page is read, so
re-running rewrites the same text rather than nesting it.
"""
import argparse, concurrent.futures as cf, json, os, pathlib, re, shutil, subprocess, sys, tempfile, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import i18n  # noqa: E402

CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
SKIP_MODS = {"quiz", "review", "sources"}
DROP_TAGS = {"svg", "canvas", "input", "select", "textarea", "button", "i", "img", "video", "audio", "iframe"}
# containers that may hold only phrasing content: block HTML written into one would be
# re-parsed differently (a <p> inside a <p> closes it), so such a fill is left out
PHRASING = {"p", "span", "small", "b", "em", "strong", "label", "a", "sup", "sub", "code", "h1", "h2", "h3", "h4", "h5", "h6"}
BLOCK = re.compile(r"<(?:p|div|ul|ol|li|dl|dt|dd|table|h[1-6]|section|aside|article|figure|blockquote|pre|header|footer|nav|form|hr|details)\b", re.I)
PRE = re.compile(r"<!--pre-->.*?<!--/pre-->", re.S)
OFFSET_MS = 400 * 864e5

PROBE = r"""<script>
(()=>{
const OFF=%OFF%,SEED=%SEED%,LOC=%LOC%,IDS=%IDS%;
if(LOC){
  const wrap=(o,k)=>{const f=o[k];o[k]=function(l,...r){return f.call(this,l===undefined?LOC:l,...r)}};
  [[Number.prototype,'toLocaleString'],[Array.prototype,'toLocaleString'],[Date.prototype,'toLocaleString'],
   [Date.prototype,'toLocaleDateString'],[Date.prototype,'toLocaleTimeString']].forEach(([o,k])=>wrap(o,k));
  ['NumberFormat','DateTimeFormat','Collator','PluralRules','RelativeTimeFormat','ListFormat'].forEach(k=>{const C=Intl[k];if(!C)return;
    const W=function(l,...r){return new C(l===undefined?LOC:l,...r)};W.prototype=C.prototype;W.supportedLocalesOf=C.supportedLocalesOf;Intl[k]=W});
  Object.defineProperty(navigator,'language',{get:()=>LOC});Object.defineProperty(navigator,'languages',{get:()=>[LOC]});
}
if(OFF){const D=Date;class FD extends D{constructor(...a){a.length?super(...a):super(D.now()+OFF)}static now(){return D.now()+OFF}};window.Date=FD}
let s=SEED>>>0;Math.random=()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const errs=[];addEventListener('error',e=>errs.push(String(e.message)));
addEventListener('load',()=>setTimeout(()=>{
  const sec=document.querySelector('[data-mod]:not([hidden])'),fill={};
  for(const id of IDS){
    const el=document.getElementById(id);if(!el)continue;
    const c=el.cloneNode(true);
    c.querySelectorAll('svg,canvas,input,select,textarea,script,noscript,template').forEach(n=>n.remove());
    const t=c.cloneNode(true);t.querySelectorAll('button,[role=button]').forEach(n=>n.remove());
    if(!t.textContent.trim())continue;
    fill[id]={html:c.innerHTML,ids:[...c.querySelectorAll('[id]')].map(n=>n.id)};
  }
  const out={mod:sec&&sec.dataset.mod,errs,fill,dom:document.body.innerHTML};
  const x=document.createElement('script');x.type='application/json';x.id='__pre';
  x.textContent=JSON.stringify(out).replace(/</g,'\\u003c');document.body.appendChild(x);
},400));
})();
</script>"""

# run A: the page as written. run B: the same page under another reader's conditions
# (the probe sets B's locale itself: Chrome's --lang does not reach Intl when headless).
VARIANTS = {
    "a": dict(width=1280, lang="en-US", tz="UTC", off=0, seed=1),
    "b": dict(width=390, lang="de-DE", tz="Pacific/Kiritimati", off=OFFSET_MS, seed=987654321),
}


def section_bounds(s):
    m = re.search(r'<section\b[^>]*\bdata-mod="([a-z0-9-]+)"[^>]*>', s)
    if not m: return None
    end = s.find("</section>", m.end())
    return m.group(1), m.end(), end


def empty_ids(s):
    """The module's id and {id: tag} of the elements inside its section that have no content in the static HTML."""
    b = section_bounds(s)
    if not b: return None, {}
    mod, start, end = b
    sec = s[start:end]
    ids = {m.group(2): m.group(1).lower() for m in re.finditer(r'<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?\bid="([^"]+)"[^>]*>\s*</\1>', sec)
           if m.group(1).lower() not in DROP_TAGS}
    return mod, ids


def run(page, src, ids, v, tmp):
    """Load SRC (the text of PAGE) in headless Chrome under variant V; return the probe's result."""
    probe = (PROBE.replace("%OFF%", str(int(v["off"]))).replace("%SEED%", str(v["seed"]))
             .replace("%LOC%", json.dumps(v["lang"] if v["lang"] != "en-US" else ""))
             .replace("%IDS%", json.dumps(list(ids))))
    s = src.replace("<head>", f'<head><base href="{page.parent.as_uri()}/">' + probe, 1)
    f = tmp / "page.html"
    f.write_text(s, encoding="utf-8")
    prof = tmp / "profile"
    shutil.rmtree(prof, ignore_errors=True)
    r = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-extensions",
                        "--disable-background-networking", "--disable-component-update", "--disable-sync",
                        f"--user-data-dir={prof}", "--force-prefers-reduced-motion", "--lang=en-US",
                        "--virtual-time-budget=1500", f"--window-size={v['width']},900", "--dump-dom", f.as_uri()],
                       capture_output=True, text=True, timeout=120, env={**os.environ, "TZ": v["tz"]})
    m = re.search(r'<script type="application/json" id="__pre">(.*?)</script>', r.stdout, re.S)
    return json.loads(m.group(1)) if m else None


def fill(src, chosen):
    """SRC with each chosen id's container filled (between markers)."""
    for id_, inner in chosen.items():
        src, n = re.subn(r'(<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?\bid="' + re.escape(id_) + r'"[^>]*>)\s*(</\2>)',
                         lambda m: m.group(1) + "<!--pre-->" + inner + "<!--/pre-->" + m.group(3), src, count=1)
        assert n == 1, id_
    return src


def prerender(page):
    """Prerender one page. Returns (page, filled ids, note)."""
    orig = page.read_text(encoding="utf-8")
    base = PRE.sub("", orig)
    mod, ids = empty_ids(base)
    if mod is None or mod in SKIP_MODS or not ids:
        return page, base, {}, ("skipped" if mod in SKIP_MODS else "nothing to fill")
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="prerender-"))
    try:
        a = run(page, base, ids, VARIANTS["a"], tmp)
        if not a or a["mod"] != mod or a["errs"]:
            return page, base, {}, f"not prerendered: page did not initialise ({a and (a['errs'] or a['mod'])})"
        b = run(page, base, ids, VARIANTS["b"], tmp)
        if not b or b["mod"] != mod or b["errs"]:
            return page, base, {}, "not prerendered: the variant run failed"
        static_ids = set(re.findall(r'\bid="([^"]+)"', base))
        chosen, varies, dup, nest = {}, [], [], []
        for id_, r in a["fill"].items():
            if b["fill"].get(id_, {}).get("html") != r["html"]: varies.append(id_); continue
            if ids[id_] in PHRASING and BLOCK.search(r["html"]): nest.append(id_); continue
            if set(r["ids"]) & static_ids or len(set(r["ids"])) != len(r["ids"]): dup.append(id_); continue
            static_ids |= set(r["ids"])
            chosen[id_] = r["html"]
        if not chosen:
            return page, base, {}, f"nothing stable to fill (varies: {varies})"
        out = fill(base, chosen)
        c = run(page, out, ids, VARIANTS["a"], tmp)
        if not c or c["errs"] or c["dom"] != a["dom"]:
            return page, base, {}, "not prerendered: the prerendered page renders differently with JavaScript"
        note = ", ".join(x for x in [varies and f"varies: {' '.join(varies)}", dup and f"duplicate ids: {' '.join(dup)}",
                                       nest and f"block content in an inline container: {' '.join(nest)}"] if x)
        return page, out, chosen, note
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def all_pages():
    for c in i18n.CFG["companions"]:
        for lang in c["langs"]:
            base = ROOT / c["slug"] / i18n.lang_dir(lang)
            yield base / "index.html"
            langdirs = {i18n.lang_dir(l) for l in c["langs"]}
            for d in sorted(p for p in base.iterdir() if p.is_dir() and p.name not in langdirs):
                f = d / "index.html"
                if f.exists() and 'data-root="' in f.read_text(encoding="utf-8"):
                    yield f


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("pages", nargs="*", help="built pages (default: every companion page)")
    ap.add_argument("--check", action="store_true", help="report only, write nothing")
    ap.add_argument("-j", "--jobs", type=int, default=min(8, os.cpu_count() or 2))
    ap.add_argument("-v", "--verbose", action="store_true", help="list the filled ids of every page")
    args = ap.parse_args()
    if not os.path.exists(CHROME):
        sys.exit(f"prerender: Chrome not found at {CHROME} (set CHROME=..., or skip this step: build_site.py --no-prerender)")
    pages = [pathlib.Path(p).resolve() for p in args.pages] or list(all_pages())
    t0 = time.time()
    before = after = filled = changed = 0
    notes = []
    with cf.ThreadPoolExecutor(args.jobs) as ex:
        for page, out, chosen, note in ex.map(prerender, pages):
            rel = page.relative_to(ROOT)
            old = page.read_text(encoding="utf-8")
            before += len(old.encode()); after += len(out.encode())
            filled += len(chosen)
            if note and note not in ("skipped", "nothing to fill"): notes.append(f"  {rel}: {note}")
            if args.verbose: print(f"  {rel}: {len(chosen)} {' '.join(chosen)}")
            if out != old:
                changed += 1
                if not args.check: page.write_text(out, encoding="utf-8")
    for n in notes: print(n)
    print(f"prerender: {filled} containers on {sum(1 for _ in pages)} pages, {changed} page(s) "
          f"{'would change' if args.check else 'changed'}, {before / 1e6:.2f} MB -> {after / 1e6:.2f} MB, "
          f"{time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()
