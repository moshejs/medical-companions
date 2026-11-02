# TB Companion

An animated, cited study and patient-education guide to **tuberculosis (TB)**, the airborne infection caused by *Mycobacterium tuberculosis*: how it spreads, TB infection versus TB disease, the tests, treatment of drug-susceptible and drug-resistant TB, prevention and vaccines, and living with TB.

**Live site:** https://www.medcompanions.org/tuberculosis/

> **Not medical advice.** The TB Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for patient and family understanding. It cannot diagnose anyone, and nothing in it should change a test or treatment decision without your own clinician. Regimens, doses, criteria and guideline statements are quoted as published by WHO, CDC and ATS/IDSA, not as instructions; outcome figures are population statistics. TB is a notifiable disease: anyone with symptoms should see a clinician.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The infection | What TB is (infection vs disease, the global numbers) · The TB bacterium · How TB spreads (droplet nuclei, shared air, ventilation) · Infection to granuloma · TB infection vs TB disease · Who is at risk |
| 2 · Diagnosis | Symptoms & where TB strikes · TB infection tests: TST & IGRA · Diagnosing TB disease (smear, Xpert, culture, chest X-ray, urine LAM) · Drug resistance |
| 3 · Treatment | How TB drugs work · Treating TB disease (the 6-month regimen and 4-month options) · Treating TB infection (3HP, 1HP, 3HR, 4R, isoniazid) · Treating drug-resistant TB (BPaLM, BPaL) · Side effects & monitoring · TB with HIV, in children & pregnancy |
| 4 · Prevention & control | BCG & new vaccines · Infection control & contacts · Ending TB: targets & research (evidence-labelled) |
| 5 · Living with TB | Living with TB (treatment support, stigma, costs, life after TB) · Nursing care |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The wording is person-first ("people with TB", "TB infection" rather than "latent TB"), following the Stop TB Partnership's guidance.

## How it was made

Eight research passes, one per area: (A) epidemiology, global burden and history; (B) transmission, risk factors and host susceptibility; (C) microbiology, immunology and pathogenesis; (D) clinical presentation and diagnosis; (E) treatment of drug-susceptible TB disease and TB infection; (F) drug-resistant TB, comorbidity and outcomes; (G) living with TB, infection control and nursing; (H) vaccines, the End TB Strategy and research. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or openFDA before it went in. The WHO Global Tuberculosis Report 2025 has no record in those services, so it was checked against its WHO IRIS record (hdl:10665/383364, ISBN 9789240116924) and is marked that way in `src/source-corrections.json`. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py tuberculosis                        # just this one; fails on an unknown citation key
python3 tools/smoke.py tuberculosis/index.html all         # headless-Chrome check: no JS errors, no empty animations
python3 tuberculosis/src/compile_sources.py                # rebuild sources.json from research/
python3 tools/share_card.py tuberculosis/src/share-card.html tuberculosis/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Rust carries the interface and slate blue (the methylene-blue counterstain of a Ziehl–Neelsen smear) is the accent and marks diagnosis. The bacillus is carbol-fuchsin magenta, as it stains; treatment is green, prevention and vaccines violet, and each first-line drug has its own chip colour (rifampicin orange, after the colour it gives body fluids). Fonts: Zilla Slab, Atkinson Hyperlegible and Space Mono.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`bacillus`, `clump`, `droplet`, `macrophage`, `tcell`, `granuloma`, `alveolus`, `lung`, `person`, `pill`, `blister`, `forearm`, `sputum`, `marker`, `blob`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
