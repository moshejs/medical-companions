#!/usr/bin/env python3
"""Headless smoke test: load each module in Chrome, report JS errors and SVGs that
drew nothing. Also scrubs every range input through 0, .33, .66, 1 so draw(t) runs
across the whole timeline and clicks every button-like toggle once.

Usage: smoke.py BUILT_HTML module1 [module2 ...]   (or 'all')

BUILT_HTML is a companion's first page (alzheimers/index.html, alzheimers/he/index.html).
Each module is loaded from its own page, <folder>/<module>/index.html, and must show
that module; 'all' means every module page beside it. A one-page build (build.py
--single) has no module pages, so there each module is loaded as BUILT_HTML#module.
"""
import json, re, subprocess, sys, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
html = pathlib.Path(sys.argv[1]).resolve()
mods = sys.argv[2:]
src = html.read_text(encoding="utf-8")
paged = 'data-page="' in src
if mods == ["all"]:
    if paged:
        mods = ["home"] + sorted(d.name for d in html.parent.iterdir()
                                 if (d / "index.html").exists() and 'data-root="' in (d / "index.html").read_text(encoding="utf-8"))
    else:
        mods = re.findall(r'data-mod="([a-z0-9]+)"', src)

PROBE = r"""
<script>
window.__errs=[];
window.addEventListener('error',e=>window.__errs.push(String(e.message)+' @'+e.lineno));
window.addEventListener('load',()=>setTimeout(()=>{
  const sec=document.querySelector('[data-mod]:not([hidden])');const out={mod:sec&&sec.dataset.mod,errs:window.__errs,empty:[],ranges:0,clicks:0,overflow:0};
  try{
    sec.querySelectorAll('input[type=range]').forEach(r=>{out.ranges++;[r.min||0,.33*(r.max||1),.66*(r.max||1),r.max||1].forEach(v=>{r.value=v;r.dispatchEvent(new Event('input',{bubbles:true}))})});
    sec.querySelectorAll('button[aria-pressed],[data-st],input[type=checkbox],select').forEach(b=>{try{if(b.tagName==='SELECT'){b.selectedIndex=Math.min(1,b.options.length-1);b.dispatchEvent(new Event('change',{bubbles:true}))}else b.click();out.clicks++}catch(e){window.__errs.push('click:'+e.message)}});
    sec.querySelectorAll('input[type=range]').forEach(r=>{r.value=r.max||1;r.dispatchEvent(new Event('input',{bubbles:true}))});
  }catch(e){window.__errs.push('probe:'+e.message)}
  sec.querySelectorAll('svg').forEach(s=>{if(s.closest('.brand'))return;if(s.innerHTML.trim().length<40)out.empty.push(s.id||'(svg)')});
  out.errs=window.__errs;
  const pre=document.createElement('pre');pre.id='__smoke';pre.textContent=JSON.stringify(out);document.body.appendChild(pre);
},400));
</script>
"""
tmpdir = pathlib.Path(tempfile.mkdtemp())
bad = 0
for m in mods:
    page = html if not paged or m == "home" else html.parent / m / "index.html"
    if not page.exists():
        print(f"BAD {m}: no page {page}"); bad += 1; continue
    s = page.read_text(encoding="utf-8")
    # the copy runs from a temp folder: <base> keeps ../app.js and other relative links pointing at the real files
    s = s.replace("<head>", f'<head><base href="{page.parent.as_uri()}/">', 1)
    s = re.sub(r"<body\b[^>]*>", lambda b: b.group(0) + PROBE, s, count=1)
    tmp = tmpdir / f"smoke-{m}.html"
    tmp.write_text(s, encoding="utf-8")
    r = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--virtual-time-budget=4000",
                        "--window-size=1280,900", "--dump-dom", tmp.as_uri() + ("" if paged else f"#{m}")],
                       capture_output=True, text=True, timeout=90)
    mm = re.search(r'<pre id="__smoke">(.*?)</pre>', r.stdout, re.S)
    if not mm:
        print(f"{m}: NO RESULT (page did not finish?)"); bad += 1; continue
    res = json.loads(mm.group(1).replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">"))
    ok = res["mod"] == m and not res["errs"] and not res["empty"]
    bad += 0 if ok else 1
    print(f"{'OK ' if ok else 'BAD'} {m}: shown={res['mod']} ranges={res['ranges']} clicks={res['clicks']} errs={res['errs']} empty={res['empty']}")
sys.exit(1 if bad else 0)
