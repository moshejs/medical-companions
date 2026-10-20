# ALS Companion: builder brief

You are adding modules to **ALS Companion**, an animated, cited study and patient-education guide
to amyotrophic lateral sclerosis, one companion of the Medical Companions site. Audience:
health-science students (medicine, nursing, therapies), people living with ALS and family
caregivers. Many readers have weak hands, use eye-gaze or switch access, or read on a phone. It is
an educational synthesis of published literature, **not medical advice**: report what guidelines,
trials and labels say ("in VALOR…", "the label lists…", "NICE NG42 recommends offering…"), never
tell the reader what to do.

The top priority is **animation**: every module needs at least one real `draw(t)` SVG animation
driven by a timeline slider and Play button, plus other interactive pieces (toggles, calculators,
clickable diagrams). Rich, accurate, legible animation beats prose.

## Paths

- REPO = `/Users/moshemalka/Library/Application Support/Claude/scratch-workspaces/4b6b3329-5467-41ba-8486-2e12820ff9a4/5e00402c-0b65-4794-9575-f30e61486275/scratch-2026-10-20-a5ca26/mc-als`
- Companion parts: `REPO/als/src/`: `00-head.html` (all CSS), `10-shell.html`, `sections/*.html`, `90-foot.html`, `js/*.js`, `sources.json`
- Research (cited facts; read the files for your modules, including their `## Step sequence`): `REPO/als/research/`
  A epidemiology, phenotypes, course (ALSFRS-R, staging), history · B mechanism and pathology (UMN/LMN, TDP-43) ·
  C genetics · D diagnosis, criteria, differential · E drugs (riluzole, edaravone, AMX0035, tofersen) ·
  F breathing, nutrition, symptom care · G living, communication, end of life · H nursing care · I research toward a cure
- The plan: `REPO/../mcr-als/dossiers/als.json`, `module_plan` (your module's archetype, animation spec, phases,
  toggles, layouts, exam hook and plain-words ideas). The plan's seed numbers are NOT citable; numbers come from
  the research files only.
- Build tools (shared, do not edit): `REPO/tools/build.py`, `REPO/tools/smoke.py`

## What you may write

ONLY your own files: `REPO/als/src/sections/NN-<id>.html` and `REPO/als/src/js/NN-<id>.js` for your module ids
(file prefixes: what 11, neurons 12, tdp43 13, genes 14, dx 21, ddx 22, course 23, drugs 31, tofersen 32,
breathing 33, nutrition 34, living 41, nursing 42, cure 43, history 51). Never edit `00-head.html`, `10-shell.html`,
`90-foot.html`, `js/00-core.js`, `js/05-home.js`, `js/52-review.js`, `sources.json`, the tools, or another builder's
files. Extra CSS goes in a `<style>` block at the top of your section file, every selector prefixed `#m-<id>`.

## Read these first

- `REPO/als/src/00-head.html`: CSS tokens and classes.
- `REPO/als/src/js/00-core.js`: helpers, routing, UI strings, the drawing kit, the two-layout helpers.
- A reference module with both layouts: `REPO/fmf/src/sections/13-mech.html` + `REPO/fmf/src/js/13-mech.js`
  (bespoke mechanism), `REPO/fmf/src/js/32-dx.js` (criteria calculator), `REPO/fmf/src/js/14-attack.js`
  (curves over time), `REPO/alzheimers/src/js/22-stages.js` (progression), `REPO/fmf/src/js/43-nursing.js`
  (nursing archetype), `REPO/fmf/src/js/44-cure.js` (cure routes), `REPO/fmf/src/js/51-history.js` (timeline),
  `REPO/fmf/src/js/12-gene.js` (inheritance). Reuse their patterns; do not copy their content.

## Module skeleton

```html
<!-- ================= X.Y TITLE ================= -->
<section class="mod" id="m-ID" data-mod="ID" hidden>
  <div class="mhead"><p class="eyebrow">Part N · Group name</p><h2>Title</h2>
    <p class="lede">One or two sentences: what this shows and what to do.</p></div>
  <div class="stepper" id="xxSteps"></div>
  <div class="lab">
    <div class="stage"><div class="scroll"><svg id="xxSvg" viewBox="0 0 720 400" style="min-width:560px" role="img" aria-label="Describe the whole animation in one sentence"></svg></div>
      <div class="ctrls"><button class="btn primary" id="xxPlay">Play</button><label class="stage-cap tl" for="xxT">Timeline <input type="range" id="xxT" min="0" max="1" step="0.002" value="0.05"></label></div>
      <p class="stage-cap">Schematic, not to scale.</p></div>
    <aside class="note" id="xxNote" aria-live="polite"></aside>
  </div>
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
  const stop=playWire(rg,$('#xxPlay'),draw,14000,UI.replay,'ID');   // last arg = module id: stops on leave, redraws on rotate
  const setSt=stepWire($('#xxSteps'),XX_STEPS,rg,draw,stop);         // also announces "Step n of m: title" to screen readers
  draw(+rg.value);
};
```

Helpers: `$`, `$$`, `RM`, `store`, `rng(seed)`, `lerp`, `clamp`, `ramp(x,a,b)`, `ease`, `bump`, `f1`,
`animate`, `pathFn(fn,x0,x1,y0,y1,N)`, `interp(points,x)`, `marker(id,color)`, `playWire`, `stepWire`, `phaseOf`,
`noteHTML({k,t,txt,pt,hook})`, `toggleRow(el,[[value,label],…],initial,onChange)`, `inits`, `onShow`, `onHide`,
`redraws`, `show(id)`, `NARROW()`, `vb(svg,wide,narrow)`, `UI` (shared interface strings), `amp`.
Drawing kit: `umn(x,y,r,o,{dead,axon,axonLen,col,fill})` (pyramidal upper motor neuron), `lmn(x,y,r,o,{dead,axon,axonLen})`
(multipolar anterior-horn cell), `fibre(x,y,w,h,o,{atrophy,flick})` (muscle fibre), `tdp(x,y,scale,o,agg)` (TDP-43,
normal dimer or aggregate), `bodyMap(x,y,scale,{bulbar,cervical,thoracic,lumbosacral},labels)` (figure with the four
ALS regions shaded 0..1; pass `{hide:true}` as labels to draw your own). `SOURCES` holds the source list.
`data-go="moduleId"` navigates (a real link `href="#id"` also works; the build rewrites it).

Module ids: home, what, neurons, tdp43, genes, dx, ddx, course, drugs, tofersen, breathing, nutrition, living,
nursing, cure, history, review, quiz, glossary, sources.

## Two layouts are required from the start

Every `draw()` calls `vb(svg, wide, narrow)` first and reads coordinates from an `L` table chosen by its
return value. Narrow viewBox width is **400**; height is whatever the content needs (tall is fine). Stack
what sits side by side. Never shrink text to fit; shorten wording in narrow mode only. Nothing may overlap
or clip at any `t`, in any toggle state, in either layout. A module with several players or widgets
without their own player must chain `redraws[id]` (`const prev=redraws.ID; redraws.ID=()=>{prev&&prev();drawOther()}`).

## Clean for translation (this companion is the first to go into German, Spanish and French)

- Every visible string lives in the HTML or in a data object at the top of your JS (`XX_STEPS`, `XX_TXT`,
  table rows). Never build a sentence from fragments (`'Stage '+n+' of '+m`); write a function in your
  `XX_TXT` that takes the numbers (`stageOf:(n,m)=>\`Stage ${n} of ${m}\``) so word order can change.
- Never pluralise by appending "s"; never compare against visible text; keep state in variables and
  `data-*` attributes, not in labels.
- Numbers stay digits; keep the unit as a separate word or symbol.
- Leave about 35% spare width in SVG labels for German. In narrow layouts keep a label under about 22 characters,
  or wrap it into two `<tspan>` lines placed by code.
- No idioms, puns or wordplay in labels. Mnemonics only in the review module.
- Use `UI.play`, `UI.replay` and the other shared strings in `00-core.js` rather than writing them again.

## Styling rules

- Colours only via CSS variables, inline as `style="fill:var(--x)"`. Tokens: `--ink --muted --line --panel
  --panel-2 --field --bg`; `--steel --steel-soft` (interface, healthy motor pathway); `--umn --umn-soft` (upper
  motor neuron, violet); `--lmn --lmn-soft` (lower motor neuron, ochre); `--tdp --tdp-soft` (pathology:
  TDP-43, SOD1, aggregates, disease); `--treat --treat-soft` (drugs, interventions); `--air --air-soft`
  (breathing, ventilation); `--food --food-soft` (nutrition, weight); `--good --warn --bad` (+`-soft`);
  bio: `--cell --cell-line --nuc --axon --myelin --muscle --muscle-line --csf`.
- SVG text classes: `t-lbl`, `t-big`, `t-sm`, `t-xs`, `t-mid`, `t-end`; lines `axis`, `grid`, `arrow`.
- HTML classes: `.btn` (`aria-pressed` toggles, `.primary` for Play), `.ctrls`, `.kicker`, `.tag`
  (+ `.steel .umn .lmn .tdp .treat .air .food .good .warn .bad`), `.ev.est` / `.ev.early` / `.ev.hyp`,
  `.cards > .card`, `.tbl > table`, `.callout`, `.hook` (`<div class="hook"><b>Exam hook</b>…</div>`),
  `.pt` (`<div class="pt"><b>In plain words</b>…</div>`), `.readout`, `.legend`, `.split2`, `.prose`, `.stepper`, `.kv`.
- No horizontal page overflow at 400px: wide SVGs sit in `<div class="scroll">`, tables in `.tbl`.

## Accessibility (required)

- Every SVG: `role="img"` and a one-sentence `aria-label` describing the whole animation.
- Anything clickable inside an SVG must also be reachable by keyboard, or offer an equivalent row of `.btn` buttons.
- The note panel is `aria-live="polite"`; put the state a sighted user would read off the drawing into it.
- Never encode meaning in colour alone: label lines and bars in text as well (UMN vs LMN especially).
- Large click targets (at least 40px tall buttons) for readers with weak hands.

## Content rules

- Cite with `[[Key]]` or `[[KeyA,KeyB]]`, using ONLY keys in `REPO/als/src/sources.json` (`key` or one of its
  `aliases`). Every factual number needs a citation from the research files; never invent numbers. If the
  research does not support something, leave it out or state it as general background without a number.
  Where the research flags a fact "(unverified)", leave it out.
- Put `[[...]]` only in HTML or in single-quoted / backtick JS strings, never in double-quoted JS strings.
  Escape apostrophes in single-quoted strings (`\'`) or use backticks. Never write a nested numeric array
  literal on one line as `[[1,2]]`; space it as `[ [1,2] ]` so the build cannot mistake it for a citation.
- Every module: at least one `draw(t)` animation with Play + slider (and a stepper where there are phases),
  at least one Exam hook and one In plain words box, and citations.
- Label research claims Established / Early evidence / Hypothesis where relevant. Present real controversies
  as controversies. Doses, criteria and guideline thresholds are "published guidance", with the not-advice framing.
- Calculators explain how published criteria or scales classify inputs; they never say "you have ALS" or give a
  personal prognosis. Say so in the calculator's own caption.
- Person-first, non-stigmatising language ("a person living with ALS", "people with ALS"; never "sufferer",
  "victim", "trapped"). Prognosis as ranges with the share who live much longer. Plain, concrete, short sentences.
  No em-dash overuse.

## Testing (required before you finish)

```
cd REPO
python3 tools/build.py als --draft --out /tmp/als-<you>/index.html   # no UNKNOWN citation keys may come from your files
python3 tools/smoke.py /tmp/als-<you>/index.html <id1> <id2> ...     # every module must print OK
```

Look at it. Headless Chrome will not render a window narrower than about 500px, so check narrow inside a
400px iframe:

```
printf '<iframe src="file:///tmp/als-<you>/<id>/index.html" style="width:400px;height:3000px;border:0"></iframe>' > /tmp/fr-<you>.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=460,3100 --virtual-time-budget=4000 --screenshot=/tmp/shot-<you>.png "file:///tmp/fr-<you>.html"
```

and wide with `--window-size=1280,2000` directly on `file:///tmp/als-<you>/<id>/index.html`. Read the PNGs (they are
images; open them with your file-reading tool) and fix what you see, at several timeline positions (set the slider's
`value` attribute in your section temporarily, or add `#` nothing: the page opens at its default). Do NOT use the in-app
browser pane; other agents share it. If another builder's half-saved file breaks the build, wait a minute and retry;
never touch their files.

Finish with a short report: files written, what each animation shows in both layouts, any facts left
out for lack of a source.
