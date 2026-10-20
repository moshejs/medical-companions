# ALS Companion

An animated, cited study and patient-education guide to **amyotrophic lateral sclerosis (ALS)**, the disease of upper and lower motor neurons, also called motor neuron disease (MND) and Lou Gehrig's disease.

**Live site:** https://moshejs.github.io/medical-companions/als/

> **Not medical advice.** ALS Companion is an educational synthesis of the published literature, made for health-science students and for people living with ALS and their families. It cannot diagnose anyone, and nothing in it should change a treatment or a care decision without your own ALS team. Criteria, doses and guideline thresholds are quoted as published, not as instructions.

## What's inside

A rail of modules, one module on stage at a time, each on its own page, with SVG animations you scrub with a timeline slider or play. Every animation has a phone layout.

| Part | Modules |
|---|---|
| 1 · The disease | What ALS is (onset and spread on a body map, the numbers, phenotypes) · Upper and lower motor neurons (cortex to muscle; UMN, LMN and EMG signs; reinnervation; split hand) · TDP-43 (mislocalisation, aggregation, STMN2 cryptic exon; SOD1 and FUS contrasts; Brettschneider stages) · Genes (C9orf72 repeat and its three routes, SOD1 misfolding, a penetrance-by-age pedigree, a result reader) |
| 2 · Diagnosis & course | Diagnosis & criteria (Gold Coast, revised El Escorial and Awaji calculator) · The differential (decision tree, 15 mimics) · ALSFRS-R and the course (12-item scorer, progression rate, King's stages, ENCALS) |
| 3 · Treatment & care | Riluzole, edaravone and others (synapse animation, approvals timeline 1995–2026) · Tofersen (antisense mechanism, VALOR biomarkers over weeks) · Breathing and NIV (FVC decline, a six-guideline NIV-trigger checker) · Swallowing and feeding tubes (weight, FVC and the gastrostomy window, ProGas, symptom table) |
| 4 · Living & the future | Living with ALS (communication over the course, ECAS, mood, planning, end of life, caregivers) · Nursing care (assessment round, giving the medicines, teaching, documentation) · Toward a cure (intervention points, every route with its evidence label and trial status) |
| 5 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence*, *Hypothesis* or *Tested and negative*.

## How it was made

1. **Dossier.** The plan (module list, the archetype each module reuses, animation specs, seed figures, shared citation keys) is `dossiers/als.json` in the private research repository, seeded from the topic's validated catalogue row.
2. **Nine research passes**, one per area, in [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md): A epidemiology, phenotypes, course and history · B mechanism and pathology · C genetics · D diagnosis, criteria and differential · E drugs · F breathing, nutrition and symptom care · G living, communication and end of life · H nursing care · I research toward a cure. Each pass checked its own sources against PubMed, Crossref, Europe PMC and ClinicalTrials.gov, and the files are in [`research/`](research/).
3. **Sources.** `src/compile_sources.py research` merges the passes' source lists into `src/sources.json`, then applies `src/source-corrections.json`. The corrections come from a second, whole-list validation on 2026-10-20 ([`research/validation/`](research/validation/)): every PMID against PubMed esummary, every DOI against Crossref, PMCIDs against Europe PMC, all 43 trial IDs against the ClinicalTrials.gov v2 API, US labels against openFDA by set ID, and the EMA and NICE pages opened.
4. **Modules** were written against the research files by builders following [`research/BUILDER-BRIEF.md`](research/BUILDER-BRIEF.md).

## Building

```bash
python3 tools/build_site.py                  # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py als                   # just this one; fails on an unknown citation key
python3 tools/smoke.py als/index.html all    # headless-Chrome check of every module page
python3 als/src/compile_sources.py als/research          # rebuild sources.json from the research files
python3 als/research/validation/make_corrections.py      # regenerate the corrections, then run compile_sources again
python3 tools/share_card.py als/src/share-card.html als/share-card.png
```

- `src/00-head.html` holds the CSS, with theme tokens for light and dark: steel blue for the interface and the healthy pathway, violet for the upper motor neuron, ochre for the lower motor neuron, brick red for pathology, green for treatment, sky blue for breathing and wheat for nutrition. Every colour also has a text label.
- `src/js/00-core.js` has the shared helpers, the drawing kit (`umn`, `lmn`, `fibre`, `tdp`, `bodyMap`) and, in `UI`, every interface string the core writes.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.

## Ready for translation

ALS reads far more in German, Spanish and French than its English share would predict, so it is planned as the first companion beyond Hebrew. The parts are written for that: every visible string sits in the HTML or in a data object at the top of its module (`*_STEPS`, `*_TXT`), sentences are never assembled from fragments, numbers stay digits, code never compares against visible text, and SVG labels leave room for longer words. The core's interface strings are in `UI` and the review module's in `RV`, ready to become `%t:key%` strings once the shared i18n layer lands. The ALSFRS-R items are paraphrased, not reproduced, since validated translations of the scale exist per language.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
