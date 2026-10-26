# Colorectal Cancer Companion

An animated, cited study and patient-education guide to **colorectal cancer (CRC)**, cancer of the colon and rectum, also called bowel cancer.

**Live site:** https://www.medcompanions.org/colorectal-cancer/

> **Not medical advice.** The Colorectal Cancer Companion is an educational synthesis of the published literature, made for health-science and nursing courses and for patient understanding. It cannot diagnose anyone, and nothing in it should change a screening or treatment decision without your own clinician. Criteria, doses, survival figures and guideline statements are quoted as published, not as instructions or a prognosis. Anyone with symptoms should see a clinician, whatever their screening history.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The disease | What colorectal cancer is (numbers, where in the bowel, the rise under 50) · The colon & its lining (crypts, stem cells, APC and Wnt) · From polyp to cancer (the adenoma–carcinoma sequence, the serrated pathway, CIN and MSI) · Risk factors & prevention · Lynch syndrome & FAP |
| 2 · Screening | Screening tests compared (FIT, stool DNA, blood tests, colonoscopy, sigmoidoscopy, CT colonography) · Colonoscopy, animated · When to start, how often (a guideline calculator) |
| 3 · Diagnosis & staging | Symptoms & red flags · Staging: TNM calculator · Tumour biomarkers (MMR/MSI, RAS, BRAF, HER2) |
| 4 · Treatment | Surgery · Chemotherapy after surgery (FOLFOX, CAPOX, IDEA) · Rectal cancer pathway (total neoadjuvant therapy, watch-and-wait) · Metastatic disease · Toward a cure (evidence-labelled routes) |
| 5 · Living with CRC | Living with colorectal cancer (follow-up, LARS, stoma, neuropathy, exercise) · Nursing care |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Eight research passes, run in parallel, one per area: (A) epidemiology, symptoms and history; (B) risk factors, prevention and hereditary syndromes; (C) biology and the adenoma–carcinoma sequence; (D) screening and colonoscopy; (E) diagnosis, staging and biomarkers; (F) treatment of localised colon and rectal cancer; (G) metastatic disease and research toward a cure; (H) living, survivorship and nursing. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or openFDA before it went in. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                    # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py colorectal-cancer                       # just this one; fails on an unknown citation key
python3 tools/smoke.py colorectal-cancer/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 colorectal-cancer/src/compile_sources.py               # rebuild sources.json from research/
python3 tools/share_card.py colorectal-cancer/src/share-card.html colorectal-cancer/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Mulberry carries the interface and colorectal-awareness navy is the accent; healthy mucosa is pink, crypt stem cells green, polyps amber, carcinoma crimson, lymph and spread violet, treatment teal. Fonts: Literata, Atkinson Hyperlegible and Red Hat Mono.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`crypt`, `polyp`, `wall`, `colon`, `node`, `liver`, `scope`, `person`, `ped`, `tube`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A Hebrew version would follow the steps under Translations in the root README; the dossier in the private research repo has a draft Hebrew vocabulary.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
