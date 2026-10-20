# Myasthenia Gravis Companion

An animated, cited study and patient-education guide to **myasthenia gravis (MG)**, the autoimmune disease of the junction between nerve and muscle.

**Live site:** https://moshejs.github.io/medical-companions/myasthenia-gravis/

> **Not medical advice.** Myasthenia Gravis Companion is an educational synthesis of the published literature, made for health-science (including nursing) students, people living with MG and their families. It cannot diagnose anyone and nothing in it should change a treatment without your own clinician. Doses, drug lists and guideline statements are quoted as published, not as instructions. Sudden trouble breathing or swallowing is an emergency.

## What's inside

One page per module: a left rail of modules, one module on stage, and SVG animations you scrub with a timeline slider or play. Every animation has a phone layout of its own, keyboard controls and a spoken description for screen readers.

| Part | Modules |
|---|---|
| 1 · The disease | What myasthenia gravis is · The neuromuscular junction (one impulse in slow motion, the safety factor) · Antibodies at the junction (AChR, complement, MuSK, LRP4) · Weakness over a day (rundown and fatigability) |
| 2 · Diagnosis | Diagnosis (antibodies, repetitive nerve stimulation, single-fibre EMG, a predictive-value calculator) · MGFA class and scores (MG-ADL calculator) · The differential (Lambert-Eaton, botulism, ALS and others) |
| 3 · Treatment | Pyridostigmine, animated · The treatment ladder · Thymectomy over the years (MGTX) · Complement and FcRn inhibitors over time (eculizumab, ravulizumab, zilucoplan, efgartigimod, rozanolixizumab, nipocalimab, trial week by trial week) |
| 4 · Crisis, care and the future | Myasthenic crisis · Drugs that can worsen MG (a cited checker) · Nursing care · Living with MG (pregnancy and transient neonatal MG, surgery, exercise) · Toward a cure (evidence-labelled routes) |
| 5 · Context and review | History and people · Flashcards and mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. Real disagreements (pooled prevalence estimates, the thymectomy age ceiling, where guidelines place the biologics, REGAIN's primary endpoint, how big the biologics' benefit is over placebo) are shown as disagreements.

## How it was made

Nine research passes, one per area, each returned cited facts: A epidemiology, clinical picture and history; B the junction and immunopathology; C diagnosis, classification and the differential; D symptomatic and conventional immunotherapy; E the thymus, thymectomy and thymoma; F complement, FcRn and B-cell biologics; G myasthenic crisis and drugs that worsen MG; H nursing care, pregnancy, surgery and living with MG; I research toward a cure. The pass files are in `research/`. Their reference lists were merged into `src/sources.json` (576 sources), and every journal source was checked against PubMed, Europe PMC or Crossref, field by field. The modules were written against those files only.

## Building

```bash
python3 tools/build_site.py                             # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py myasthenia-gravis                # just this one; fails on an unknown citation key
python3 tools/smoke.py myasthenia-gravis/index.html all # headless-Chrome check of every module page
python3 myasthenia-gravis/src/compile_sources.py myasthenia-gravis/research   # rebuild sources.json from the passes
python3 tools/share_card.py myasthenia-gravis/src/share-card.html myasthenia-gravis/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `src/00-head.html` holds all CSS (theme tokens for light and dark) and the metadata. Nerve blue is the signal, receptor green the healthy junction, antibody rose the disease, complement red the attack, indigo the treatment, gold acetylcholine.
- `src/js/00-core.js` has the shared helpers, routing and the junction drawing kit (`achDot`, `vesicle`, `achr`, `igg`, `eyelid`), so every module draws the junction the same way.
- `src/sections/*.html` and `src/js/*.js` hold one module each. Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table.
- Citations are written as `[[Key]]` and become numbered links at build time.
- `src/source-corrections.json` is applied after `compile_sources.py`, so validated fixes survive a regeneration.

No build dependencies beyond Python 3. External resources: Google Fonts only.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
