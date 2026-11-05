# Cirrhosis Companion

An animated, cited study and patient-education guide to **cirrhosis** of the liver: how common it is and who it affects, how the liver works, how injury becomes scar and whether scar can regress, the main causes (alcohol-related liver disease, MASLD and MASH, hepatitis B and C, and the genetic, autoimmune and bile-duct diseases), blood tests, scans and biopsy, FIB-4 and elastography, the Child–Pugh and MELD scores, portal hypertension and varices, ascites, infection and kidney injury, hepatic encephalopathy, liver cancer surveillance, the course from compensated to decompensated disease, liver transplant, nutrition and medicine safety, nursing care, living with cirrhosis, research toward better treatment and history.

**Live site:** https://www.medcompanions.org/cirrhosis/

> **Not medical advice.** The Cirrhosis Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people living with cirrhosis, their families and carers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. The FIB-4 and MELD calculators and the self-check log are teaching aids, not tests or triage tools. Vomiting blood, black stools, new confusion, a fever with a swollen belly or yellowing of the eyes that comes on quickly need urgent care. Scores, thresholds, doses and guideline statements are quoted as published (AASLD, EASL, Baveno VII, the US drug labels), not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding cirrhosis | What cirrhosis is (burden, causes, words matter) · The liver and what it does · From injury to scar |
| 2 · Causes | Alcohol-related liver disease · Fatty liver disease (MASLD & MASH) · Viral hepatitis B & C · Other causes: genes, immunity & bile ducts |
| 3 · Diagnosis & staging | Blood tests, scans & biopsy · Measuring scarring without a biopsy (FIB-4 teaching calculator) · Child–Pugh & MELD scores (MELD, MELD-Na and MELD 3.0 teaching calculator) |
| 4 · Complications | Portal hypertension & varices · Ascites, infection & kidney injury · Hepatic encephalopathy · Liver cancer surveillance · Compensated to decompensated: the course |
| 5 · Treatment & living | Liver transplant · Nutrition, muscle & medicine safety · Nursing care · Living with cirrhosis · Research toward better treatment (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (461 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The language is person-first ("people with cirrhosis", "alcohol-associated" rather than "alcoholic"), and the urgent-care signs are on the home page, in the disclaimer and on the complication modules. The vaccine checklist and the self-check log keep what the reader enters only in their own browser.

## How it was made

Eight research passes, one per area: (A) epidemiology, burden, natural history and history; (B) liver biology, fibrosis and regression; (C) alcohol-related liver disease and MASLD; (D) viral hepatitis and the other causes; (E) diagnosis, staging scores and liver cancer surveillance; (F) portal hypertension, varices, ascites, SBP and kidney injury; (G) hepatic encephalopathy, nutrition, medicine safety and transplant; (H) living with cirrhosis, nursing and palliative care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. Facts the passes could not check against a source (the per-item Child–Pugh point thresholds, some guideline wording behind paywalls) are marked unverified in the pass files and never used on the site, so Child–Pugh is shown with its published class ranges and no points calculator. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (519 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                   # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py cirrhosis                              # just this one; fails on an unknown citation key
python3 tools/smoke.py cirrhosis/index.html all               # headless-Chrome check: no JS errors, no empty animations
python3 cirrhosis/src/compile_sources.py                      # rebuild sources.json from research/
python3 tools/share_card.py cirrhosis/src/share-card.html cirrhosis/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Deep petrol-cyan, the colour of the portal vein, carries the interface; bile gold marks jaundice and bilirubin, warm red-brown the healthy liver, pale grey-cream scar, with tokens for ammonia and ascites. Fonts: Gelasio, Karla and Courier Prime.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`liver`, `lobule`, `hepatocyte`, `stellate`, `collagen`, `nodule`, `portalMap`, `abdomen`, `gauge`, `nh3`, `brain`, `kidney`, `person`, `pill`, `curve`, `ladder`, `tline`, `ped`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
