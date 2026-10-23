# Parkinson's Companion

An animated, cited study and patient-education guide to **Parkinson's disease**, the most common cause of parkinsonism.

**Live site:** https://www.medcompanions.org/parkinsons-disease/

> **Not medical advice.** Parkinson's Companion is an educational synthesis of the published literature, made for health-science students (including nursing), people living with Parkinson's and family caregivers. It cannot diagnose anyone and nothing in it should change a treatment without your own clinician; Parkinson's medicines should never be stopped suddenly. Doses and guideline statements are quoted as published, not as instructions.

## What's inside

A first page and one page per module: a left rail of modules, one module on stage at a time, and SVG animations you scrub with a timeline slider or play. Every animation has a phone layout of its own, keyboard controls and a spoken description for screen readers.

| Part | Modules |
|---|---|
| 1 · The disease | What Parkinson's is · The dopamine pathway (nigrostriatal pathway and the basal-ganglia loops) · Alpha-synuclein and Lewy bodies · How it spreads: Braak stages · Genes and inheritance (LRRK2, GBA1, SNCA, parkin) |
| 2 · Course and diagnosis | Before the tremor (the prodromal years) · Stages and symptoms (Hoehn and Yahr) · Diagnosis and the MDS criteria (criteria calculator, DaT scan and synuclein tests) · The differential |
| 3 · Treatment | Levodopa and carbidopa · Levodopa over time (wearing-off and dyskinesia over a day and over the years) · The other medicines · Deep-brain stimulation · Beyond movement (non-motor symptoms) |
| 4 · Living, caring, preventing | Risk and protection · Living with Parkinson's · Nursing care · Toward a cure (evidence-labelled routes) |
| 5 · Context and review | History and people · Flashcards and mnemonics · Quiz · Glossary · Sources |

Where the biology is shared with Alzheimer's disease, the modules reuse the Alzheimer's Companion's animations: the alpha-synuclein module is built on its amyloid processing and aggregation animations, the Braak module on its staging map, the prodrome on its biomarker cascade. The dopamine pathway, levodopa wearing-off, the MDS criteria calculator and deep-brain stimulation are drawn for this companion.

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. Real disagreements (for example the biological definitions of Parkinson's disease against the clinical criteria, or whether the levodopa "window" really narrows) are shown as disagreements.

## How it was made

Nine research passes, in `research/` (`A-` to `I-`, format in `research/RESEARCH-FORMAT.md`): epidemiology, course, risk and history; pathology and the circuit; genetics; diagnosis and the differential; levodopa and the other medicines; DBS and device-aided therapy; non-motor symptoms, living and caregiving; nursing care; research toward a cure. Each returned cited facts and checked its own PMIDs and DOIs. Their reference lists were merged into `src/sources.json` by `src/compile_sources.py`, every PMID and DOI was then checked again against PubMed and Crossref and every other link opened (`src/source-corrections.json` records the result), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                  # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py parkinsons-disease                    # just this one; fails on an unknown citation key
python3 tools/smoke.py parkinsons-disease/index.html all     # headless-Chrome check: no JS errors, no empty animations
python3 parkinsons-disease/src/compile_sources.py parkinsons-disease/research   # rebuild sources.json from the passes
python3 tools/share_card.py parkinsons-disease/src/share-card.html parkinsons-disease/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `src/00-head.html` holds all CSS (theme tokens for light and dark). The token names match the Alzheimer's Companion so the same styles and drawing kit work; here `--amber` is dopamine, `--rose` is alpha-synuclein and `--sky` is treatment.
- `src/js/00-core.js` has the shared helpers and the drawing kit (`neuron`, `lewyBody`, `lewyNeurite`, `syn`, `vesicle`, `playWire`, `stepWire`, `noteHTML`, routing).
- `src/sections/*.html` and `src/js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- `src/pages.json` gives each module page its search title and description; `src/strings.json` holds this companion's interface strings (the rest come from `tools/i18n/`).

English only for now. A translation follows the steps in the root README's Translations section (`src/<lang>/` parts, `tools/check_lang.py`, and a named medical reviewer in `site.json` before it is indexed).

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
