# Gout Companion

An animated, cited study and patient-education guide to **gout**, the commonest inflammatory arthritis and the one whose cause, urate crystals, can be removed.

**Live site:** https://www.medcompanions.org/gout/

> **Not medical advice.** Gout Companion is an educational synthesis of the published literature, made for health-science study and for patient understanding. It cannot diagnose anyone and nothing in it should change a treatment without your own clinician. Doses and guideline statements are quoted as published, not as instructions.

## What's inside

One page per module: a left rail of modules, one module on stage at a time, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The disease | What gout is (stages A–D, a joint map) · Where urate comes from (purines, xanthine oxidase, kidney and gut transporters) · Crystals vs serum urate (saturation, temperature, years of deposition and dissolution) · A flare, hour by hour (crystal → NLRP3 → IL-1β → neutrophils → resolution) |
| 2 · Treating a flare | Colchicine inside the cell · Treating a flare (colchicine, NSAIDs, glucocorticoids, IL-1 blockers, ice) · Colchicine dosing, safety and interactions |
| 3 · Lowering urate | How urate-lowering drugs work · Treat to target (allopurinol and febuxostat titration, flare prophylaxis) · Safety (HLA-B*58:01, CARES vs FAST) |
| 4 · Diagnosis & complications | Diagnosis and the ACR/EULAR 2015 calculator, with a polarised-light microscope · The differential · Gout, kidneys and heart |
| 5 · Living, care & the future | Living with gout · Nursing care · Toward a cure |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## Built on FMF Companion

The colchicine modules (inside the cell, dosing and interactions) and the inflammasome drawing are adapted from [FMF Companion](../fmf/README.md), and colchicine sources validated there are cited under the same keys. The palette keeps FMF's variable names, so adapted code draws in gout's colours unchanged.

## How it was made

Eight research passes, one per area, each returned cited facts with every source checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label:

- A: epidemiology, risk factors and history
- B: diagnosis, classification and imaging
- C: urate biology and crystal inflammation
- D: treating a flare and colchicine
- E: urate-lowering therapy and treat-to-target
- F: kidney and cardiovascular links
- G: living with gout and nursing care
- H: research toward a cure

They are in `research/`, with the format in `research/RESEARCH-FORMAT.md`. `src/compile_sources.py` merges their Sources sections into `src/sources.json`, and the modules were written against them.

## Building

```bash
python3 gout/src/compile_sources.py            # research/*.md → src/sources.json (then source-corrections.json)
python3 tools/build.py gout                    # writes gout/index.html, gout/<module>/index.html and gout/app.js
python3 tools/smoke.py gout/index.html all     # headless-Chrome check of every module page
python3 tools/share_card.py gout/src/share-card.html gout/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README). Parts are laid out as in FMF: `00-head.html` (styles and metadata), `10-shell.html` (rail, crawler outline, home), `sections/*.html` and `js/*.js` (one module each), `90-foot.html`, and `pages.json` (each module page's title and description).
