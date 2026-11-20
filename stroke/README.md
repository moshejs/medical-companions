# Stroke Companion

An animated, cited study and patient-education guide to **stroke**: what a stroke is and how common it is, the brain's arterial territories, core and penumbra and how fast tissue is lost, the causes of ischaemic stroke, intracerebral and subarachnoid haemorrhage, TIA, recognising stroke with FAST and BE-FAST, imaging, ASPECTS and the first hour, the NIH Stroke Scale, thrombolysis and thrombectomy, treating bleeding strokes, stroke unit care, risk factors, AF and antithrombotics, carotid disease and PFO, rehabilitation, life after stroke, nursing care, the research frontier and history.

**Live site:** https://www.medcompanions.org/stroke/

> **Not medical advice.** The Stroke Companion is an educational synthesis of the published literature, made for medical, nursing and therapy courses and for people who have had a stroke, their families and carers. It does not replace a stroke team, it cannot diagnose anyone, and nothing in it should change a treatment without your own clinician. If you think someone is having a stroke, call your local emergency number. The ASPECTS scorer, NIH Stroke Scale, ABCD2, ICH score, CHA2DS2-VASc, RoPE and NASCET tools are teaching aids, never for diagnosis, prognosis or treatment decisions. Doses, time windows and guideline statements are quoted as published, not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding stroke | What a stroke is · The brain's blood supply (artery explorer, circle of Willis block tool) · Core, penumbra & time (fast and slow progressors, reperfusion timing) · Causes of ischaemic stroke · Bleeding strokes (Ottawa SAH rule, Boston v2.0) · TIA: the warning stroke (ABCD2 teaching calculator) |
| 2 · Recognition & assessment | Recognising stroke (BE-FAST, scale accuracy explorer) · Imaging & the first hour (ASPECTS scorer, mismatch explorer) · The NIH Stroke Scale (teaching calculator, modified Rankin Scale) |
| 3 · Acute treatment | Clot-dissolving treatment (benefit by delay) · Thrombectomy (trial explorer) · Treating intracerebral haemorrhage (ICH score teaching calculator) · Treating subarachnoid haemorrhage (day 0 to 21 lanes, coil vs clip) · The stroke unit |
| 4 · Preventing another stroke | Risk factors & prevention (INTERSTROKE explorer) · AF & antithrombotics (CHA2DS2-VASc teaching tool, DOAC timing) · Carotid disease & PFO (NASCET measuring tool, RoPE) |
| 5 · Recovery & care | Rehabilitation & recovery (recovery curves, proportional recovery debate) · Life after stroke · Nursing care · Research frontier (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (1,057 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Nine research passes, one per area: (A) epidemiology, burden, presentation and history; (B) brain blood supply, the ischaemic cascade, causes and TIA; (C) intracerebral and subarachnoid haemorrhage; (D) recognition, prehospital care, imaging and the NIHSS; (E) thrombolysis and thrombectomy; (F) stroke unit care, complications and nursing; (G) secondary prevention, antithrombotics, AF, carotid disease and PFO; (H) rehabilitation, recovery and life after stroke; (I) the research frontier. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in; anything that could not be checked was dropped or marked. Full texts of several AHA/ASA guidelines could not be fetched, so most class and level wording is left out; each pass's Provenance section says what is second-hand. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (1,098 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py stroke                        # just this one; fails on an unknown citation key
python3 tools/smoke.py stroke/index.html all         # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py stroke              # rebuild sources.json from research/
python3 tools/share_card.py stroke/src/share-card.html stroke/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A deep navy carries the interface, with violet-blue for recognition and assessment, ember for acute treatment, ochre for prevention and green for recovery, and shape tokens for arteries, clots, core and penumbra, arterial territories, scan greys and the modified Rankin Scale. Fonts: Crimson Pro, Hanken Grotesk and Anonymous Pro.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit, documented at its top (`brainSide`, `brainAxial`, `aspects`, `willis`, `artery`, `aneurysm`, `clot`, `carotidBif`, `catheterStent`, `neuron`, `heartAF`, `faceGlyph`, `armsGlyph`, `bodyHemi`, `mrsStack`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
