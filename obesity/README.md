# Obesity Companion

An animated, cited study and patient-education guide to **obesity**: what it is and how common it is, BMI, waist and body fat, the genes and environments behind it, the gut-brain loop that sets appetite, fat tissue as an organ, why lost weight comes back, the complications across the body, type 2 diabetes, assessment and staging, weight stigma, diet, activity and behaviour, how GLP-1 medicines work, the semaglutide and tirzepatide trials, the other weight-loss medicines, side effects and stopping, metabolic and bariatric surgery and life after it, children and adolescents, pregnancy and fertility, living with obesity, nursing care, the research frontier and history.

**Live site:** https://www.medcompanions.org/obesity/

> **Not medical advice.** The Obesity Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people living with obesity, their families and carers. It cannot diagnose anyone, and nothing in it should start, stop or change a treatment without your own clinician. The BMI, waist-to-height, staging and eligibility tools are teaching aids with population caveats, never a diagnosis or a target. Doses, escalation schedules, guideline thresholds and supplement statements are quoted as published, not as instructions, and weight-change results are population averages from trials. If eating or weight is causing distress, or you are restricting, bingeing or purging, talk to a clinician or an eating-disorder service.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding obesity | What obesity is (global prevalence 1990–2022, clinical vs preclinical obesity explorer) · BMI, waist &amp; body fat (BMI and waist-to-height teaching calculator) · Causes: genes &amp; environment (polygenic deciles, ultra-processed food trial) · Appetite: the gut-brain loop (24-hour ghrelin curve) · Fat tissue as an organ (adipocyte turnover) · Why lost weight comes back (metabolic adaptation, hormone comparator) |
| 2 · Health &amp; assessment | Complications across the body (risk by BMI band) · Obesity &amp; type 2 diabetes (DiRECT remission, DPP curves, per-kg calculator) · Assessment &amp; staging (EOSS sketch, Lancet Commission and STOP-Bang checklists) · Weight stigma &amp; bias (words-matter flip cards) |
| 3 · Treatment | Diet, activity &amp; behaviour (trial chips, diet comparator) · How GLP-1 medicines work (label dose steps) · Semaglutide &amp; tirzepatide trials (weight curves, responder icon arrays) · Other weight-loss medicines (mechanism map, withdrawn-drug timeline) · Side effects, safety &amp; stopping (adverse-event comparator) · Metabolic &amp; bariatric surgery (stomach morph, SOS curves, ASMBS/IFSO explainer) · Life after surgery (micronutrient explorer) |
| 4 · Across life &amp; care | Children &amp; adolescents · Pregnancy &amp; fertility · Living with obesity (maintenance supports, binge-eating screen) · Nursing care · Research frontier (pipeline chart, receptor explorer, evidence-labelled) |
| 5 · Context &amp; review | History &amp; people · Flashcards &amp; memory aids · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (548 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Nine research passes, one per area: (A) definitions, measurement, epidemiology and history; (B) causes: genetics, environment and risk factors; (C) physiology: appetite, adipose tissue and energy balance; (D) complications, comorbidities and clinical assessment; (E) lifestyle and behavioural treatment; (F) anti-obesity medications; (G) metabolic and bariatric surgery; (H) children, pregnancy, stigma, living with obesity and nursing; (I) the research frontier. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in; anything that could not be checked was dropped. The 2020 Canadian adult guideline (CMAJ) and the full text of the 2023 AAP guideline could not be read, so the AAP key action statements are cited through open-access papers that reproduce them; each pass's Provenance section says what else is second-hand. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (618 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py obesity                       # just this one; fails on an unknown citation key
python3 tools/smoke.py obesity/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py obesity             # rebuild sources.json from research/
python3 tools/share_card.py obesity/src/share-card.html obesity/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A deep teal carries the interface, apricot marks fat tissue, berry marks health and assessment, medicine blue marks treatment and leaf green marks life and care, with shape tokens for adipocytes, macrophages, hormones, the gut, the liver and injector pens. Fonts: Lora, Rubik and Source Code Pro.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit, documented at its top (`adipocyte`, `adiposeTissue`, `macrophage`, `stomach`, `gutTract`, `brainHypothalamus`, `hormoneDot`, `liver`, `pen`, `person`, `seesaw`, `curveAxes`, `plotLine`, `iconArray`).
- Animations have two layouts: `draw()` asks `vb()` for the wide or narrow viewBox, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

The language follows person-first, non-stigmatising usage ("people with obesity", not "obese people"), as the 2020 joint international consensus on ending weight stigma recommends.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
