# Heart Attack Companion

An animated, cited study and patient-education guide to **heart attack** (myocardial infarction and acute coronary syndromes): what a heart attack is and its five types, plaque, rupture and clot, ischaemia and "time is muscle", risk factors and prevention, symptoms and who presents differently, the 12-lead ECG, troponin and rapid rule-out, the HEART, TIMI and GRACE scores, other causes of chest pain, the first minutes (calling for help, CPR and defibrillators), reperfusion by PCI or clot-busting drugs, antiplatelets and anticoagulants, complications and cardiogenic shock, the medicines after a heart attack, lowering LDL cholesterol, stents or bypass surgery, cardiac rehabilitation, living after a heart attack, nursing care, research toward better treatment and history.

**Live site:** https://www.medcompanions.org/myocardial-infarction/

> **Not medical advice.** The Heart Attack Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people who have had a heart attack, their families and carers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. The ECG criteria explainer, the HEART and TIMI calculators and the recovery checklist are teaching aids, not triage tools. If you think someone is having a heart attack, call your local emergency number now (999 in the UK, 911 in the US, 112 in the EU) and do not drive yourself to hospital. Criteria, time targets, doses and guideline statements are quoted as published (ESC, ACC/AHA, the Fourth Universal Definition, the US drug labels), not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding heart attack | What a heart attack is (types, burden, survival) · Plaque, rupture & clot · Ischaemia: time is muscle · Risk factors & prevention |
| 2 · Diagnosis | Symptoms & who presents differently · The ECG: STEMI, NSTEMI & territories (criteria explainer) · Troponin & rapid rule-out · Risk scores: HEART, TIMI & GRACE (teaching calculators) · Chest pain: heart attack or something else? |
| 3 · Emergency treatment | The first minutes: calling for help, CPR & defibrillators · Reperfusion: PCI & clot-busting drugs · Antiplatelets & anticoagulants · Complications & cardiogenic shock |
| 4 · Medicines & revascularisation | Medicines after a heart attack · Lowering LDL cholesterol · Stents or bypass? Revascularisation choices |
| 5 · Recovery & living | Cardiac rehabilitation · Living after a heart attack · Nursing care · Research toward better treatment (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (437 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The call-now box is on the home page, in the disclaimer and on the symptom, emergency and review modules. The recovery checklist keeps what the reader ticks only in their own browser.

## How it was made

Eight research passes, one per area: (A) epidemiology, definitions and history; (B) atherosclerosis, plaque rupture, thrombosis, ischaemia and risk factors; (C) presentation, the ECG, troponin and risk scores; (D) the first minutes, reperfusion and time targets; (E) antithrombotic therapy; (F) complications, cardiogenic shock, prognosis and research toward better treatment; (G) secondary prevention and lipids; (H) cardiac rehabilitation, living after a heart attack and nursing care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. Facts the passes could not check against a source (the UK driving rules, the ECG lead-to-territory map, CPR rate and depth wording, parts of the 2025 US guideline) are marked unverified in the pass files and never used on the site; the territory map is shown as a labelled teaching convention, and the page tells readers to learn CPR on a certified course. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (495 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                        # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py myocardial-infarction                       # just this one; fails on an unknown citation key
python3 tools/smoke.py myocardial-infarction/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py myocardial-infarction             # rebuild sources.json from research/
python3 tools/share_card.py myocardial-infarction/src/share-card.html myocardial-infarction/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Cardinal red carries the interface and the heart muscle; navy marks the coronary arteries and the ECG, with tokens for clot, plaque, oxygenated and starved muscle. The call-now box (`.crisis`, alias `.callnow`) and the teaching notice (`.teach`) are shared across modules. Fonts: Archivo, Figtree and Sometype Mono.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`heart`, `artery`, `xsec`, `platelet`, `ecgGrid`, `ecgBeat`, `ecgTrace`, `tropCurve`, `clock`, `bodymap`, `stent`, `icons`, `curve`, `tline`, `gauge`, `ladder`, `pill`, `person`, `marker`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
