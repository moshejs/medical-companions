# MS Companion

An animated, cited study and patient-education guide to **multiple sclerosis (MS)**, the immune-mediated disease of the brain, spinal cord and optic nerves.

**Live site:** https://www.medcompanions.org/multiple-sclerosis/

> **Not medical advice.** MS Companion is an educational synthesis of the published literature, made for health-science and nursing courses and for patient understanding. It cannot diagnose anyone, and nothing in it should change a treatment without your own neurologist or MS nurse. Criteria, doses and guideline statements are quoted as published, not as instructions.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The disease | What MS is · Myelin & demyelination (saltatory conduction, a lesion forming, repair, axon loss, Uhthoff) · The immune attack (lymph node to blood-brain barrier to lesion) · Genes & risk factors (HLA-DRB1*15:01, EBV, vitamin D, smoking) |
| 2 · The course | Relapse & remission over time (RRMS, SPMS, PPMS, PIRA, smouldering MS) · A relapse, week by week · Measuring disability: EDSS |
| 3 · Diagnosis | McDonald criteria calculator (2017 and 2024) · The differential (NMOSD, MOGAD and other mimics) |
| 4 · Treatment | How the drugs work · The DMT ladder · Safety & monitoring (PML and the JCV index) · Toward a cure (evidence-labeled routes) |
| 5 · Living with MS | Symptoms & rehabilitation · Living with MS (pregnancy, work, heat, exercise) · Nursing care |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Eight research passes, run in parallel, one per area: (A) epidemiology, clinical course and history; (B) genetics and risk factors; (C) mechanism and pathology; (D) diagnosis, the McDonald criteria and the differential; (E) disease-modifying therapies; (F) relapses, symptoms and living with MS; (G) research toward a cure; (H) nursing care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or openFDA before it went in. The pass files are in [`research/`](research/); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                   # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py multiple-sclerosis                     # just this one; fails on an unknown citation key
python3 tools/smoke.py multiple-sclerosis/index.html all      # headless-Chrome check: no JS errors, no empty animations
python3 multiple-sclerosis/src/compile_sources.py multiple-sclerosis/research   # rebuild sources.json from the passes
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Indigo carries the interface and MS-awareness orange is the accent; myelin is gold, the immune attack magenta, treatment teal.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`fiber`, `tcell`, `bcell`, `plasma`, `mac`, `oligo`, `ab`, `lesion`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys, and its two extra keys, are in `strings.json`.

English only for now. A Hebrew version would follow the steps under Translations in the root README; the dossier in the private research repo has a draft Hebrew vocabulary and drug-name table.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
