# FMF Companion

An animated, cited study and patient-education guide to **Familial Mediterranean Fever (FMF)**, the most common inherited autoinflammatory disease.

**Live site:** https://www.medcompanions.org/fmf/

> **Not medical advice.** FMF Companion is an educational synthesis of the published literature, made for a health-science course and for patient understanding. It cannot diagnose anyone and nothing in it should change a treatment without your own clinician. Doses and guideline statements are quoted as published, not as instructions.

## What's inside

One self-contained page (`index.html`): a left rail of modules, one module on stage at a time, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The disease | What FMF is · The gene & inheritance (animated Punnett square, genetic-result reader) · Pyrin, animated (normal vs M694V) · An attack, hour by hour (72 h, site by site) |
| 2 · Colchicine | Inside the cell (pill → neutrophil → microtubule → pyrin) · Over months (why benefit is gradual; decades of amyloid risk) · Dosing, safety, interactions |
| 3 · Complications & diagnosis | AA amyloidosis · Diagnosis & criteria (Eurofever/PRINTO calculator) · The differential |
| 4 · Treatment & the future | Treatment ladder (CLUSTER) · Living with FMF · Nursing care (assessment, administration, teaching, documentation) · Toward a cure (evidence-labeled routes) |
| 5 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Seven research passes (epidemiology and history; genetics and diagnosis; mechanism; colchicine; amyloidosis, treatment and living; research toward a cure; nursing care) each returned cited facts. Those reference lists were merged into `src/sources.json`, and the modules were written against them.

## Building

The page is assembled from parts in `src/`:

```bash
python3 tools/build_site.py                  # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py fmf                # just this one; writes fmf/index.html, fails on an unknown citation key
python3 tools/smoke.py fmf/index.html all # headless-Chrome check: no JS errors, no empty animations
python3 tools/make_artifact.py fmf        # derives the Claude artifact copy
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

`compile_sources.py` rebuilds `sources.json` from the research files; `source-corrections.json`
is applied afterwards, so validated fixes survive a regeneration.

- `00-head.html` holds all CSS (theme tokens for light and dark).
- Animations have two layouts. `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement rather than a shrunken one.
- `sections/*.html` and `js/*.js` hold one module each; `js/00-core.js` has the shared helpers (`playWire`, `stepWire`, `noteHTML`, routing).
- Citations are written as `[[Key]]` and become numbered links at build time.

No build dependencies beyond Python 3. External resources: Google Fonts only.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
