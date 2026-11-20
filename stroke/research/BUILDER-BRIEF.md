# Stroke Companion: builder brief

You are writing modules of the **Stroke Companion**, an animated, cited study and patient-education guide to stroke, one companion of the Medical Companions site. Audience: medical, nursing and therapy students; people who have had a stroke (many with aphasia, one-sided weakness, visual neglect or fatigue, so plain text, big targets and short sentences matter); families and carers. It is an educational synthesis, **not medical advice**: report what guidelines, trials and labels say ("in HERMES...", "the 2019 AHA/ASA guideline recommends..."), never tell the reader what to do. The exception: "call emergency services" is the universal public message and may be stated directly, cited.

Top priority is **animation**: every content module has at least one real `draw(t)` SVG animation with slider + Play, and where it teaches something a calculator, clickable diagram or explorer. Quality bar: read `cystic-fibrosis/src/sections/14-cftr.html` + `js/14-cftr.js`, `myocardial-infarction/src/js/*` and `gout/src/js/11-what.js`; match their depth (each module roughly 20-35 KB JS + 10-18 KB section), not less. Modules also carry tables, cards (key-number cards via `.cards`), callouts, Exam hook and In plain words boxes.

## Paths (REPO is the checkout named in your task)
- Parts: `REPO/stroke/src/`: `00-head.html` (all CSS, tokens documented at its top), `10-shell.html`, `sections/NN-<id>.html`, `js/NN-<id>.js`, `js/01-config.js` (MODS, GROUPS), `js/02-draw.js` (drawing kit, read it fully, it documents each glyph), `sources.json`.
- Research: `REPO/stroke/research/<A..I>-*.md`. Facts and numbers come ONLY from these files (A what, history; B vessels, cascade, causes, tia; C bleeds, ich, sah; D signs, imaging, nihss; E lysis, evt; F unit, nursing; G prevent, af, carotid; H rehab, after; I frontier). Read every section relevant to your modules, including Exam hooks, In plain words, Numbers for the animations and Open questions.
- Shared runtime (read, never edit, never copy): `REPO/tools/core/00-core.js`, `03-router.js`.

## What you may write
ONLY your own `sections/NN-<id>.html` and `js/NN-<id>.js`, plus a fragment file `REPO/stroke/src/.pages/<id>.json` containing `{"<id>":{"title":"...","description":"..."}}` (title: search-worthy, distinct, under 70 characters; description: 120-155 characters, never over 160, plain text). File prefixes: what 11, vessels 12, cascade 13, causes 14, bleeds 15, tia 16, signs 21, imaging 22, nihss 23, lysis 31, evt 32, ich 33, sah 34, unit 35, prevent 41, af 42, carotid 43, rehab 51, after 52, nursing 53, frontier 54, history 61, review/quiz/glossary/sources 62-review. Never edit head, shell, foot, draw kit, config, tools or other builders' files. If you need a new glyph, put it inside your own js file with a unique prefix. Extra CSS goes in a `<style>` block at the top of your section, every selector prefixed `#m-<id>`.
All top-level JS names share one closure: **prefix every const and function with your module's own 2-4 letter prefix** (e.g. `CSC_STEPS`), so nothing collides.

## Module skeleton
```html
<!-- ================= X.Y TITLE ================= -->
<section class="mod" id="m-ID" data-mod="ID" hidden>
  <div class="mhead"><p class="eyebrow">Part N · Group name</p><h2>Title</h2>
    <p class="lede">One or two sentences: what this shows and what to do.</p></div>
  <div class="stepper" id="xxSteps"></div>
  <div class="lab">
    <div class="stage"><div class="scroll"><svg id="xxSvg" viewBox="0 0 720 400" style="min-width:560px" role="img" aria-label="Describe the whole animation in one sentence"></svg></div>
      <div class="ctrls"><button class="btn primary" id="xxPlay">%t:player.play%</button><label class="stage-cap tl" for="xxT">Timeline <input type="range" id="xxT" min="0" max="1" step="0.002" value="0.05"></label></div>
      <p class="stage-cap">Schematic, not to scale.</p></div>
    <aside class="note" id="xxNote" aria-live="polite"></aside>
  </div>
</section>
```
```js
/* =============== X.Y title =============== */
const XX_STEPS=[{from:0,at:.05,k:'Kicker',t:'Title',txt:'Body with citation [[Key1,Key2]]',pt:'Plain-language version',hook:'Exam hook text'}, ...];
inits.ID=()=>{
  const svg=$('#xxSvg'),rg=$('#xxT');
  function draw(t){
    const N=vb(svg,'720 400','400 640');           // wide and narrow viewBoxes; returns true when narrow
    const L=N?{/* narrow coordinates */}:{/* wide coordinates */};
    let s=''; /* build the SVG from t in [0,1], reading every coordinate from L */ svg.innerHTML=s;
    const p=phaseOf(XX_STEPS,t); setSt(p); $('#xxNote').innerHTML=noteHTML(XX_STEPS[p]);
  }
  const stop=playWire(rg,$('#xxPlay'),draw,14000,'%t:player.replay%','ID');
  const setSt=stepWire($('#xxSteps'),XX_STEPS,rg,draw,stop);
  draw(+rg.value);
};
```
Check `tools/core` for exact helper signatures, and copy how the CF modules call them. A module with several players or widgets must chain `redraws[id]` (`const prev=redraws.ID; redraws.ID=()=>{prev&&prev();drawOther()}`).

## Two layouts are required
Every `draw()` calls `vb(svg,wide,narrow)` first and reads coordinates from a table chosen by its return value. Narrow viewBox width is **400**; height is whatever the content needs. Stack what sits side by side. Never shrink text to fit; shorten wording in narrow mode. **Nothing may overlap or clip at any `t`, in any toggle state, in either layout.** This is the most common failure: check it with screenshots at several `t`.

## Strings
Visible strings live in the HTML or in data objects at the top of your JS. No sentence-building from fragments, no "+s" plurals. Mnemonics only in the review module. Leave spare width in SVG labels.

## Styling
Colours only via CSS variables (documented at the top of `00-head.html`), inline as `style="fill:var(--x)"`. Shape-only tokens never colour text. SVG text classes `t-lbl t-big t-sm t-xs t-mid t-end`; lines `axis grid arrow`. HTML: `.btn` (`aria-pressed` toggles, `.primary` Play), `.ctrls`, `.kicker`, `.tag`, `.ev.est/.ev.early/.ev.hyp`, `.cards>.card`, `.tbl>table`, `.callout`, `.hook` (`<div class="hook"><b>Exam hook</b>...</div>`), `.pt` (`<div class="pt"><b>In plain words</b>...</div>`), `.readout`, `.legend`, `.split2`, `.prose`, `.stepper`, `.kv`, `h3.sub`. No horizontal page overflow at 390px: wide SVGs in `<div class="scroll">`, tables in `.tbl`. Use only `<h2>` then `<h3>`, then `<h4>`: never skip a level.

## Accessibility
Every SVG `role="img"` with a one-sentence `aria-label`. Anything clickable in an SVG also reachable by keyboard or with an equivalent row of `.btn`s. Note panels `aria-live="polite"`. Never encode meaning in colour alone: label directly. Buttons at least 40px tall. 4.5:1 text contrast in both themes.

## Content rules
- Cite with `[[Key]]` or `[[KeyA,KeyB]]`, using ONLY keys in `stroke/src/sources.json`. Every number has a citation from the research files; never invent numbers, and never add figures from your own memory. No citation, no claim. Where research flags "(unverified)", leave it out. Illustrative curves between published anchors are labelled "Schematic".
- `[[...]]` only in HTML or in single-quoted / backtick JS strings, never in double-quoted JS strings. Never write a nested numeric array on one line as `[[1,2]]`; space it `[ [1,2] ]` or the build reads a citation.
- Research-landscape claims carry `.ev` labels: Established / Early evidence / Hypothesis. Real controversies are presented as controversies, with both positions cited.
- Doses, thresholds, criteria and guideline statements are quoted as published, with the not-advice framing, and with their guideline's class of recommendation when the research gives it.
- Calculators (NIHSS, ABCD2, ICH score, CHA2DS2-VASc, ASPECTS, ...) explain how a published scale scores inputs, say in their caption that they are teaching tools never for an individual's diagnosis, prognosis or treatment, and give scale results as population figures from the cited source.
- Person-first, non-stigmatising language ("a person who has had a stroke"; never "victim", "sufferer"). "Survivor" only when a source or organisation uses it. UK-neutral clinical spellings as in the module titles (ischaemic, haemorrhage), and mention the US spelling once where it helps search. Avoid em dashes; plain, concrete, short sentences. Don't write "patients" where "people" works, except when reporting a trial population.

## Testing (required before you finish)
```
cd REPO
python3 tools/build.py stroke --draft --out "$TMPDIR/stroke-<you>/index.html"   # no UNKNOWN citation keys may come from your files
python3 tools/smoke.py "$TMPDIR/stroke-<you>/index.html" <id1> <id2> ...       # every module must print OK
```
Use a private directory under your own scratch (not /tmp shared names). Run `python3 tools/build.py --help` if flags differ. Look at it. Headless Chrome will not render a window narrower than about 500px, so check narrow inside a 390px iframe:
```
printf '<iframe src="file://$OUT/<id>/index.html" style="width:390px;height:3000px;border:0"></iframe>' > $OUT/fr.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=450,3100 --virtual-time-budget=4000 --screenshot=$OUT/shot.png "file://$OUT/fr.html"
```
and wide with `--window-size=1440,2200` directly. Read the PNGs and fix what you see at several timeline positions (temporarily set the slider's `value` in your section; restore it) and in dark mode (`--force-dark-mode` isn't enough: set `data-theme="dark"` via a temp copy if needed). Do NOT use the in-app browser pane; other agents share it. If another builder's half-saved file breaks the build, wait a minute and retry; never touch their files. Do not commit; the orchestrator commits.

Finish with a short report (under 8 lines): files written, the animations, any facts left out, any known issue. Do not paste content.
