# Sepsis Companion

An animated, cited study and patient-education guide to **sepsis** (the body's harmful response to an infection), **septic shock** and the other types of shock: how common sepsis is, how an infection tips into a dysregulated host response, leaky vessels, microclots and failing organs, haemodynamics and the four types of shock, who is at risk, the warning signs and early warning scores, SIRS to Sepsis-3 and SOFA-2, lactate, cultures and procalcitonin, the first hour, fluids, vasopressors and steroids, source control and antibiotic stewardship, organ support in intensive care, cardiogenic, hypovolaemic, obstructive and anaphylactic shock, sepsis in babies and children and in pregnancy, life after sepsis, nursing care, prevention, research toward better treatment and history.

**Live site:** https://www.medcompanions.org/sepsis-and-shock/

> **Not medical advice.** The Sepsis Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people who survive sepsis, their families and caregivers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. The qSOFA, SOFA, NEWS2, Phoenix, SIC/DIC, MAP, shock-index and urine-output calculators are teaching aids, never for self-triage or for deciding whether to seek care. Sepsis is a medical emergency: if someone with an infection becomes very unwell (confused or very drowsy, breathing very fast, cold, mottled or bluish skin, passing little or no urine), call your local emergency number or go to an emergency department now and ask: could this be sepsis? Doses, fluid volumes, MAP and lactate targets, antibiotic timings and guideline statements are quoted as published (Surviving Sepsis Campaign, Sepsis-3, the drug labels), not as instructions, and mortality figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding sepsis & shock | What sepsis is · Infection to dysregulated host response · Vessels, clotting & failing organs (SIC and ISTH DIC teaching calculator) · Shock and haemodynamics (MAP and shock-index teaching calculator, blood-pressure sandbox) |
| 2 · Who is at risk & recognising it | Who is at risk · Recognising sepsis (NEWS2 teaching calculator) |
| 3 · Definitions & tests | Definitions & scores: SIRS to Sepsis-3 (qSOFA and SOFA teaching calculators) · Lactate, cultures, procalcitonin & tests |
| 4 · Treatment | The first hour: bundle & antibiotics · Fluids · Vasopressors & steroids · Source control & antimicrobial stewardship · Organ support in intensive care |
| 5 · Special situations & recovery | Cardiogenic, hypovolaemic, obstructive & anaphylactic shock · Sepsis in babies and children (Phoenix Sepsis Score teaching calculator) · Sepsis in pregnancy and after birth · After sepsis: recovery & families · Nursing care (urine-output teaching calculator) · Preventing sepsis · Research frontier (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The call-now box is on the home page, in the disclaimer and on every clinical module; the recovery module is written for survivors and the bereaved as well as for students. The follow-up question list in "After sepsis" keeps nothing the reader ticks.

## How it was made

Eight research passes, one per area: (A) epidemiology, burden, risk factors and history; (B) immunology, endothelium, coagulation and organ dysfunction, and the research frontier; (C) haemodynamics and shock types; (D) recognising sepsis, early warning scores and definitions; (E) tests, biomarkers, the first hour and maternal sepsis; (F) fluids, vasopressors, steroids and MAP targets; (G) source control, stewardship, ICU organ support and nursing care; (H) after sepsis, survivorship, families and prevention. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. Sources that could not be checked against one of those services (the NICE NG51 update documents, the RCP NEWS2 report, the WHO 2020 sepsis report, a Sepsis Alliance campaign page) are marked unverified in `src/sources.json` and are not cited anywhere: NEWS2 bands come from a peer-reviewed reproduction of the chart, and the NICE risk tables are left out. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (536 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                   # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py sepsis-and-shock                       # just this one; fails on an unknown citation key
python3 tools/smoke.py sepsis-and-shock/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py sepsis-and-shock             # rebuild sources.json from research/
python3 tools/share_card.py sepsis-and-shock/src/share-card.html sepsis-and-shock/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A deep chocolate brown carries the interface, ember orange marks fever and urgency, with tokens for pathogens, immune cells, oxygenated and deoxygenated blood, the vessel wall and glycocalyx, leaking fluid, microclots, healthy and failing organs, lactate and mottled skin. Fonts: Merriweather, Work Sans and Inconsolata.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`bacterium`, `virus`, `neutrophil`, `macrophage`, `cytokines`, `vessel`, `capbed`, `organ`, `body`, `gauge`, `lactateMeter`, `ivBag`, `pump`, `thermometer`, `clock`, `tcurve`, `icons`, `curve`, `tline`, `ladder`, `pill`, `person`).
- A few module scripts share drawings through the one closure: `endothelium` uses `whCoag()` from `what`, `pressors` uses `flDumb()` from `fluids`, and `othershock` uses the circulation circuit from `shock`.
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
