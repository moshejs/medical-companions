# COPD Companion: builder brief

You are adding modules to the **COPD Companion**, an animated, cited study and patient-education guide to chronic obstructive pulmonary disease, one companion of the Medical Companions site (https://www.medcompanions.org). Audience: health-science students (medicine, nursing, physiotherapy, pharmacy), people with COPD (many older, many breathless, some with poor eyesight, often on a phone) and family caregivers. It is an educational synthesis of published literature, **not medical advice**: report what guidelines, trials and labels say ("GOLD 2023 recommends…", "in IMPACT…", "the label states…"), never tell the reader what to do.

The top priority is **animation and interaction that teach**: every content module needs at least one real `draw(t)` SVG animation driven by a timeline slider and Play button (with a stepper), plus where it teaches something a calculator, toggle, clickable diagram or second scrubber. Rich, accurate, legible animation beats prose. The quality bar is the CF Companion (`REPO/cystic-fibrosis/`) and the Sepsis Companion (`REPO/sepsis-and-shock/`): match their depth (each module there is a 10–18 KB section and a 15–35 KB script: an animation, one or two interactives, cited tables and cards).

## Paths

- REPO = the folder that holds `tools/` and `copd/` (the repo root; you were given its absolute path).
- Companion parts: `REPO/copd/src/`: `00-head.html` (all CSS and tokens), `10-shell.html`, `sections/*.html`, `90-foot.html`, `js/01-config.js` (MODS), `js/02-draw.js` (the drawing kit), `js/05-home.js`, `sources.json` (compiled; never edit).
- Research (the ONLY source of facts and citation keys): `REPO/copd/research/<A..H>-*.md`. A epidemiology, risk factors, history · B mechanism, pathology, alpha-1 antitrypsin deficiency · C diagnosis and assessment · D medicines for stable COPD and inhalers · E exacerbations and hospital care · F smoking cessation, vaccines, rehabilitation, oxygen, advanced therapies · G living, comorbidities, nursing · H research frontier. Each has `### <module> · Step sequence` sections for your animation phases and `## Numbers for the animations`.
- Shared runtime (read, never edit): `REPO/tools/core/00-core.js`, `REPO/tools/core/03-router.js`.

## What you may write

ONLY your own files: `REPO/copd/src/sections/NN-<id>.html` and `REPO/copd/src/js/NN-<id>.js` for your module ids. File prefixes: what 11, causes 12, lungs 13, breathless 14, aatd 15, spirometry 21, assessment 22, lookalikes 23, inhalers 31, escalation 32, technique 33, quitting 34, rehab 35, oxygen 36, flareups 41, hospital 42, bloodgas 43, advanced 51, living 52, comorbid 53, nursing 54, frontier 55, history 61; review/quiz/glossary/sources all live in `sections/62-review.html` + `js/62-review.js`. The section files for your modules currently hold a stub: replace it entirely. Never edit `00-head.html`, `10-shell.html`, `90-foot.html`, `01-config.js`, `02-draw.js`, `05-home.js`, `sources.json`, the research files, the tools, or another builder's files. Do not run git. Extra CSS goes in a `<style>` block at the top of your section file, every selector prefixed `#m-<id>`. If you need a drawing helper the kit lacks, define it inside your own module file with a module-specific prefix (e.g. `spDevice()`), never a bare global name another builder might also use. Every top-level `const`/`function` name in your JS must carry your module's prefix (all modules share one script scope).

## Read these first

- `REPO/copd/src/00-head.html` CSS from `*{box-sizing` on: the classes (`.mod .mhead .eyebrow .lede .stepper .lab .stage .scroll .ctrls .btn .btn.primary .tl .note .readout .tbl .cards .card .tag .ev.est/.early/.hyp .callout .prose .teach .crisis .support .verdict .calc .big-num .legend .split2 .t-lbl .t-big .t-sm .t-xs .axis .grid h3.sub`) and the colour tokens in `:root`.
- `REPO/copd/src/js/02-draw.js` (header comment lists the kit: `lungs`, `airway`, `alveoli`, `inhaler`, `person`, `cig`, `smoke`, `dots`, `gauge`, `chip`, `wrapT`, `axes`, `spiroVT`, `spiroFV`, `heart`) and `REPO/copd/src/js/05-home.js` (a working animation using it).
- Reference modules for patterns (do not copy their content): `REPO/cystic-fibrosis/src/sections/33-monitoring.html` + `js/33-monitoring.js` (spirometry animation + band calculator), `REPO/cystic-fibrosis/src/sections/43-clearance.html` + `js/43-clearance.js` (treatment sequence + trial results), `REPO/cystic-fibrosis/src/js/42-trials.js` (trial explorer), `REPO/sepsis-and-shock/src/js/*` (calculators such as NEWS2, qSOFA), `REPO/cystic-fibrosis/src/js/54-nursing.js` (nursing), `REPO/cystic-fibrosis/src/js/55-frontier.js` (frontier with evidence labels), `REPO/cystic-fibrosis/src/js/61-history.js` (timeline), `REPO/cystic-fibrosis/src/js/62-review.js` + `sections/62-review.html` (flashcards, quiz, glossary, sources).

## Module skeleton

```html
<!-- ================= X.Y TITLE ================= -->
<style>#m-ID .xx{...}</style>
<section class="mod" id="m-ID" data-mod="ID" hidden>
  <div class="mhead"><p class="eyebrow">Part N · Group name</p><h2>Title</h2>
    <p class="lede">One or two sentences: what this shows and what to do.</p></div>
  <div class="stepper" id="xxSteps"></div>
  <div class="lab">
    <div class="stage"><div class="scroll"><svg id="xxSvg" viewBox="0 0 720 400" role="img" aria-label="Describe the whole animation in one sentence"></svg></div>
      <div class="ctrls"><button class="btn primary" id="xxPlay">Play</button><label class="stage-cap tl" for="xxT">Timeline <input type="range" id="xxT" min="0" max="1" step="0.002" value="0.05"></label></div>
      <p class="stage-cap">Schematic, not to scale. [[Key]]</p></div>
    <aside class="note" id="xxNote" aria-live="polite"></aside>
  </div>
  … tables (.tbl), cards (.cards/.card), a calculator, prose (.prose), with citations …
</section>
```

```js
/* =============== X.Y title =============== */
const XX_STEPS=[{from:0,at:.05,k:'Kicker',t:'Title',txt:'Body with citation [[Key1,Key2]]',pt:'Plain-language version',hook:'Exam hook text'}, ...];
const XX_TXT={/* every other visible string this module writes: SVG labels, captions, readouts */};
inits.ID=()=>{
  const svg=$('#xxSvg'),rg=$('#xxT');
  function draw(t){
    const N=vb(svg,'720 400','400 640');           // wide and narrow viewBoxes; returns true when narrow
    const L=N?{/* narrow coordinates */}:{/* wide coordinates */};
    let s=''; /* build the SVG string from t in [0,1], reading every coordinate from L */ svg.innerHTML=s;
    const p=phaseOf(XX_STEPS,t); setSt(p); $('#xxNote').innerHTML=noteHTML(XX_STEPS[p]);
  }
  const stop=playWire(rg,$('#xxPlay'),draw,14000,'%t:player.replay%','ID');   // last arg = module id
  const setSt=stepWire($('#xxSteps'),XX_STEPS,rg,draw,stop);
  draw(+rg.value);
};
```

Helpers (global): `$`, `$$`, `RM`, `store`, `rng(seed)`, `lerp`, `clamp`, `ramp(x,a,b)`, `ease`, `bump`, `f1`, `animate`, `pathFn(fn,x0,x1,y0,y1,N)` (fn: u in 0..1 -> v in 0..1, v=0 at y0), `marker(id,color)`, `playWire`, `stepWire`, `phaseOf`, `noteHTML({k,t,txt,pt,hook})`, `inits`, `onShow`, `onHide`, `redraws`, `show(id)`, `NARROW()`, `vb(svg,wide,narrow)`, `SOURCES`. `data-go="moduleId"` on a button navigates. A module with several players or widgets that redraw on resize must chain `redraws[id]` (`const prev=redraws.ID; redraws.ID=()=>{prev&&prev();drawOther()}`); `playWire` already does this for its own draw.

## Citations and content rules

- Write citations as `[[Key]]` or `[[KeyA,KeyB]]`, using ONLY keys that appear in a `## Sources` list of the research files (the build fails on an unknown key; check with `python3 tools/build.py copd`, which names it). Every factual claim carries one. Prefer keys from your module's own pass, but any pass's key is fine.
- Numbers exactly as the research states them. Do not add facts from memory. If the research lacks something, leave it out.
- Research-landscape claims carry `<span class="ev est">Established</span>`, `<span class="ev early">Early evidence</span>` or `<span class="ev hyp">Hypothesis</span>`.
- Doses, oxygen targets and guideline statements are quoted as published, with the source named in the sentence. Every calculator/score/band tool gets a `<p class="teach" role="note"><b>Teaching tool</b>…not for diagnosis or treatment decisions…</p>` beside it.
- Urgent signs (where your module names them) go in `<p class="crisis" role="note"><b>Get help</b><span>…as published…</span></p>`, quoting the source.
- Each step's `txt` carries citations; `pt` is a grade-8 "In plain words" sentence; `hook` is a short testable "Exam hook".
- Person-first, non-blaming language: "people with COPD", never "COPD patients" in patient-facing text, never "sufferers"; smoking is described without blame (addiction, exposure).
- Interface text inside the shared player and pager is already handled (`%t:` strings); do not hard-code "Play"/"Pause" elsewhere: use `'%t:player.play%'` only if you build your own play button.

## Two layouts are required

Every `draw()` calls `vb(svg, wide, narrow)` first and reads coordinates from an `L` table chosen by its return value. Narrow viewBox width is **400**; height is whatever the content needs (tall is fine). Stack what sits side by side. Never shrink text below the CSS classes' sizes to fit; shorten wording in narrow mode only (keep a narrow label under ~22 characters or wrap it with `wrapT`). Nothing may overlap or clip at any `t`, in any toggle state, in either layout. No horizontal page scroll at 390px: tables go in `.tbl` (which scrolls inside itself), and a `.scroll` svg wrapper must not set `min-width` above 360px for narrow-capable svgs (the CF modules use `style="min-width:560px"` only on wide-only charts; prefer giving every svg a narrow layout instead).

## Clean for translation

Every visible string lives in the HTML or in a data object at the top of your JS (`XX_STEPS`, `XX_TXT`, table rows). Never build a sentence from fragments; write a function in `XX_TXT` that takes the numbers. Never pluralise by appending "s". Keep state in variables and `data-*` attributes, not in labels. No idioms or wordplay in labels; mnemonics only in the review module.

## Styling

Colours only via CSS variables, inline as `style="fill:var(--x)"`. Tokens: `--ink --muted --line --panel --panel-2 --field --bg --brand --accent`; group colours `--dx` (diagnosis teal) `--rx` (treatment violet) `--fl` (flare-ups ember) `--rec` (living green), each with `-soft`; topic tokens `--air --air-soft --air-ink` (airflow), `--o2 --o2-soft --o2-ink`, `--co2 --co2-soft --co2-ink`, `--blood`, `--smoke --smoke-soft --tar`, `--airway --airway-soft --inflamed --inflamed-soft`, `--alv --alv-edge --elastin --capillary`, `--muscle`, `--mucus --mucus-soft --mucus-ink`, `--tissue --cell --nucleus --membrane`, `--neut --macro --eos --bact --virus`, `--bd --bd-soft` (bronchodilator), `--ics --ics-soft --ics-ink` (inhaled steroid), `--lung --bronchi --heart --bone`, `--good --warn --bad` (+`-soft`), `--gold`. Fonts: `var(--display)`, `var(--body)`, `var(--mono)`. SVG text uses classes `t-lbl t-big t-sm t-xs` (and `t-mid`, `t-end` for anchors). Every colour must read in light and dark themes (the tokens handle it if you use them).

## Check your work (do this before you finish)

Build into your own scratch file so you never collide with other builders:

```bash
cd REPO
python3 tools/build.py copd --single --out <your scratch dir>/copd.html     # must say 'wrote', no unknown-citation error
python3 tools/smoke.py <your scratch dir>/copd.html <your module ids>     # every line must be OK: no JS errors, no empty SVGs
```

`node --check` on a copy of your JS helps find syntax errors. Then open your module in narrow mode in your head: every `L` coordinate for the 400-wide layout must keep labels inside 0..400. Fix everything before reporting.

## Report back

Reply in under 150 words: files written, each module's animation and interactives in one line, citation keys count, smoke result, anything you left out because the research did not support it.
