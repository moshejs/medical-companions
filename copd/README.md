# COPD Companion

An animated, cited study and patient-education guide to **chronic obstructive pulmonary disease (COPD)**: what COPD is and how common it is, smoking, biomass smoke and the other causes, small airways, mucus, inflammation and emphysema, air trapping and breathlessness, alpha-1 antitrypsin deficiency, spirometry and the FEV1/FVC ratio, symptoms, exacerbations and the GOLD groups, asthma and other look-alikes, bronchodilators, inhaled steroids, triple therapy and biologics, inhaler devices and technique, stopping smoking and vaccines, pulmonary rehabilitation, long-term oxygen and home ventilation, flare-ups and hospital treatment, oxygen targets and blood gases, lung volume reduction, transplant and palliative care, living with COPD, the conditions that come with it, nursing care, the research frontier and history.

**Live site:** https://www.medcompanions.org/copd/

> **Not medical advice.** The COPD Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people with COPD, their families and caregivers. It does not replace a respiratory team, it cannot diagnose anyone, and nothing in it should change a treatment without your own clinician. The spirometry and GOLD grade calculator, the mMRC, CAT, ABE and BODE tools, the Rome severity classifier, the DECAF calculator, the blood-gas interpreter, the oxygen-threshold explainer and the other calculators are teaching aids, never for diagnosis or treatment decisions. Doses, oxygen targets, inhaler routines and guideline statements are quoted as published (GOLD, NICE, ATS/ERS, BTS and the US drug labels), not as instructions, and survival and risk figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding COPD | What COPD is · Causes & risk factors (Fletcher–Peto quit-age chart, illustrative) · Inside the lungs · Air trapping & breathlessness (breathing-rate teaching model) · Alpha-1 antitrypsin deficiency (genotype explorer) |
| 2 · Diagnosis & assessment | Spirometry & the FEV1/FVC ratio (ratio, LLN and GOLD grade teaching calculator) · Symptoms, exacerbations & GOLD groups (mMRC, CAT domains, ABE and BODE teaching tools) · Asthma, look-alikes & imaging |
| 3 · Treatment | Bronchodilators · Inhaled steroids, triple therapy & beyond (eosinophil explainer, GOLD follow-up flow) · Inhaler devices & technique · Stopping smoking & vaccines · Pulmonary rehabilitation · Long-term oxygen & home ventilation (threshold explainer) |
| 4 · Flare-ups & hospital | Flare-ups (Rome severity teaching classifier) · Hospital treatment (DECAF teaching calculator) · Oxygen targets & blood gases (ABG teaching interpreter) |
| 5 · Living & care | Lung volume reduction, transplant & palliative care · Living with COPD (flying explainer) · Heart, mood, bones & other conditions · Nursing care (oxygen target checker) · Research frontier (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The CAT is a licensed instrument, so the guide names each item's topic and links to open-access papers for the wording rather than reproducing it.

## How it was made

Eight research passes, one per area: (A) epidemiology, risk factors and history; (B) mechanism, pathology and alpha-1 antitrypsin deficiency; (C) diagnosis and assessment; (D) medicines for stable COPD and inhalers; (E) exacerbations and hospital care; (F) smoking cessation, vaccines, rehabilitation, oxygen and advanced therapies; (G) living with COPD, comorbidities and nursing care; (H) the research frontier. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in; anything that could not be checked was dropped. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md); the module builders' brief is [`research/BUILDER-BRIEF.md`](research/BUILDER-BRIEF.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (498 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py copd                          # just this one; fails on an unknown citation key
python3 tools/smoke.py copd/index.html all           # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py copd                # rebuild sources.json from research/
python3 tools/share_card.py copd/src/share-card.html copd/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A slate blue carries the interface, with oxygen teal for diagnosis, inhaler violet for treatment, ember red for flare-ups and moss green for living and care, and tokens for airflow, oxygen and carbon dioxide, smoke, the airway wall and its smooth muscle, mucus, the air sacs, elastin and capillaries, inflammatory cells, bronchodilators and inhaled steroids. Fonts: Lora, Plus Jakarta Sans and Spline Sans Mono.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`lungs`, `airway`, `alveoli`, `inhaler`, `person`, `cig`, `smoke`, `dots`, `gauge`, `chip`, `wrapT`, `axes`, `spiroVT`, `spiroFV`, `heart`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each (3.2 and 3.3 use small chart helpers defined in `js/31-inhalers.js`; 1.5 reuses two cell glyphs from `js/13-lungs.js`). Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
