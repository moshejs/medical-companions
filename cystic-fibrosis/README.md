# CF Companion

An animated, cited study and patient-education guide to **cystic fibrosis (CF)** and the **CFTR modulators**: what CF is and how common it is, the CFTR gene and how CF is inherited, the variant classes and genotype, how the CFTR channel moves chloride, bicarbonate and water, thick mucus, infection and bronchiectasis in the lungs, the pancreas, gut and liver, CF-related diabetes, bones and fertility, newborn screening, the sweat test and genetic testing, lung function monitoring, how modulators work and the trials behind them, airway clearance and inhaled therapies, infection and cross-infection, nutrition and enzymes, advanced lung disease and transplant, living with CF, fertility and pregnancy, nursing care, the research frontier and history.

**Live site:** https://www.medcompanions.org/cystic-fibrosis/

> **Not medical advice.** The CF Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people with CF, their families and caregivers. It does not replace a CF care team, it cannot diagnose anyone, and nothing in it should change a treatment without your own clinician. The carrier odds calculator, sweat-chloride band explainer, screening funnel, FEV1 explainer and modulator eligibility tool are teaching aids, never for diagnosis or treatment decisions. Doses, enzyme ranges, eligibility, airway-clearance routines and infection-control guidance are quoted as published (CF Foundation and ECFS guidance, the US drug labels), not as instructions, and survival figures are registry population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding CF | What cystic fibrosis is · The CFTR gene & inheritance (carrier odds teaching calculator) · Variant classes & genotype · How CFTR works |
| 2 · How CF affects the body | Lungs: mucus, infection & bronchiectasis · Pancreas, gut & liver · Sweat, diabetes, bones & fertility |
| 3 · Screening, diagnosis & monitoring | Newborn screening & diagnosis (screening funnel) · The sweat test & genetic testing (sweat-chloride band explainer) · Lung function & monitoring (FEV1 explainer) |
| 4 · Treatment | CFTR modulators: how they work · Modulator trials & eligibility (label eligibility teaching tool) · Airway clearance & inhaled therapies · Infection, antibiotics & cross-infection · Nutrition & enzymes |
| 5 · Living & care | Advanced lung disease & transplant · Living with CF · Fertility, pregnancy & parenthood · Nursing care · Research frontier (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (485 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Eight research passes, one per area: (A) epidemiology, survival, presentation and history; (B) the CFTR gene, inheritance, variant classes and genotype; (C) CFTR physiology and the lungs; (D) the digestive system, other organs and nutrition; (E) newborn screening, diagnosis and monitoring; (F) CFTR modulators and the research frontier; (G) airway clearance, infection and transplant; (H) living with CF, fertility, pregnancy and nursing care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in; anything that could not be checked was dropped. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (520 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                   # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py cystic-fibrosis                        # just this one; fails on an unknown citation key
python3 tools/smoke.py cystic-fibrosis/index.html all         # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py cystic-fibrosis              # rebuild sources.json from research/
python3 tools/share_card.py cystic-fibrosis/src/share-card.html cystic-fibrosis/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A deep aubergine carries the interface, with bicarbonate blue for diagnosis, modulator teal for treatment and sea-salt green for living and care, and tokens for chloride, bicarbonate, sodium and water, the airway lining and its liquid layer, mucus from thin to thick, the CFTR protein and its misfolded form, correctors and potentiators, bacteria and biofilm, the lungs, pancreas and enzymes. Fonts: Domine, Manrope and Victor Mono.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`membrane`, `cftr`, `ion`, `epithelium`, `mucusPlug`, `bacterium`, `lungs`, `pancreas`, `sweatGland`, `chrom`, `geneStrip`, `spiro`, `punnett`, `capsule`, `clock`, `icons`, `curve`, `tline`, `gauge`, `ladder`, `pill`, `person`, `ped`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
