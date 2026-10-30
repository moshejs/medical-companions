# EDS Companion

An animated, cited study and patient-education guide to the **Ehlers-Danlos syndromes (EDS)**, a group of 13 inherited connective-tissue conditions (2017 International Classification), and to the related **hypermobility spectrum disorders (HSD)**.

**Live site:** https://www.medcompanions.org/ehlers-danlos-syndromes/

> **Not medical advice.** The EDS Companion is an educational synthesis of the published literature, made for health-science and nursing courses and for patient understanding. It cannot diagnose anyone: the Beighton score and the hEDS criteria checklist are teaching tools, not a self-test. Criteria, doses and guideline statements are quoted as published, not as instructions. Anyone with vascular EDS warning signs (sudden severe pain in the chest, abdomen, back or head) needs emergency care.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The syndromes | What EDS is · Collagen, gene to fibril · The 13 types (2017) · Inheritance & genetic testing |
| 2 · Diagnosis | Beighton score · The 2017 hEDS criteria · hEDS or HSD? · Look-alikes & red flags |
| 3 · Body systems | Joints & dislocations · Pain & fatigue · Skin, scars & bruising · POTS & the autonomic link · Gut, bladder & MCAS · Vascular EDS |
| 4 · Treatment | Exercise & physiotherapy · Medicines · Surgery & anaesthesia · Toward better treatment (evidence-labelled) |
| 5 · Living with EDS | Living with EDS · Pregnancy & parenthood · Nursing care |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. Associations that are still debated (POTS, mast-cell activation, gut symptoms) carry their published uncertainty.

## How it was made

Eight research passes, run in parallel, one per area: (A) epidemiology, history and the classification; (B) genetics, collagen biology and the 13 types; (C) mechanisms in tissue, joints, skin, pain and fatigue; (D) diagnosis, criteria, differential and assessment tools; (E) physiotherapy, exercise and psychological care; (F) medicines, surgery and anaesthesia; (G) course, comorbidity and outcomes; (H) living, family, nursing and research toward better care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or openFDA before it went in. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py ehlers-danlos-syndromes                       # just this one; fails on an unknown citation key
python3 tools/smoke.py ehlers-danlos-syndromes/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 ehlers-danlos-syndromes/src/compile_sources.py               # rebuild sources.json from research/
python3 tools/share_card.py ehlers-danlos-syndromes/src/share-card.html ehlers-danlos-syndromes/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Zebra graphite and white carry the interface, with jade as the accent (the zebra is the EDS community symbol); cobalt marks diagnosis, crimson marks the body systems and is kept for vascular EDS and red flags. The three collagen chains are jade, graphite and amber, a pathogenic variant is orange. Fonts: DM Serif Display, Atkinson Hyperlegible and Roboto Mono.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`chain`, `helix`, `fibril`, `joint`, `limb`, `skin`, `artery`, `pulse`, `tilt`, `zebra`, `person`, `ped`, `marker`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A Hebrew version would follow the steps under Translations in the root README; the dossier in the private research repo has a draft Hebrew vocabulary.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
