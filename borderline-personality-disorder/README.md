# BPD Companion

An animated, cited study and patient-education guide to **borderline personality disorder (BPD)**, a condition of intense, fast-changing emotions, unstable relationships and self-image, and impulsive behaviour: how common it is, what is known about its causes and the brain, how it is diagnosed under DSM-5-TR and ICD-11, the psychotherapies that help, what the medication trials show, safety and crisis care, the long-term course, and living with BPD.

**Live site:** https://www.medcompanions.org/borderline-personality-disorder/

> **Not medical advice.** The BPD Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people with BPD, their families and carers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. Criteria, doses and guideline statements are quoted as published (APA, NICE, WHO), not as instructions; no medicine is approved for BPD itself, and outcome figures are population statistics. If you are in crisis or thinking about suicide, contact local emergency services or a crisis line (in the US call or text 988; in the UK and Ireland Samaritans 116 123).

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding BPD | What BPD is (prevalence, sex ratio and referral bias, words that matter) · The emotion wave · Causes & the biosocial model · Genes & families · Brain & stress systems |
| 2 · Diagnosis | DSM-5-TR criteria (the nine criteria, five needed) · ICD-11 & dimensional models · Assessment & interviews · BPD or something else? (bipolar disorder, complex PTSD, ADHD, depression) |
| 3 · Psychotherapies | Dialectical behaviour therapy · Mentalization-based treatment · Schema therapy & TFP · Good psychiatric management · Therapies compared |
| 4 · Medication, safety & research | Medication: the evidence · Suicide & self-harm safety · Research toward better care (evidence-labelled) |
| 5 · Course & living | Course & recovery · Families & carers · Living with BPD · Nursing care |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The wording is person-first ("people with BPD", never "borderlines"), and suicide and self-harm are written to safe-messaging guidance: no methods, an emphasis on help-seeking and on treatability, and a crisis line on the home page and in the disclaimer.

## How it was made

Eight research passes, one per area: (A) epidemiology, presentation, stigma and history; (B) causes: genes, temperament, adversity and the biosocial model; (C) mechanisms: emotion dysregulation, neurobiology and mentalizing; (D) diagnosis: DSM-5-TR, ICD-11, assessment and differential; (E) psychological treatments: DBT, MBT, schema therapy, TFP, GPM and their evidence; (F) medication evidence, crisis care and suicide and self-harm safety; (G) course, outcomes and research toward better care; (H) living, families, work and school, and nursing care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label before it went in. The ICD-11 browser (icd.who.int) returned no readable content to the validation services, so it is listed as unverified and never cited; ICD-11 facts are cited to the peer-reviewed papers that reproduce the codes. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                                # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py borderline-personality-disorder                     # just this one; fails on an unknown citation key
python3 tools/smoke.py borderline-personality-disorder/index.html all      # headless-Chrome check: no JS errors, no empty animations
python3 borderline-personality-disorder/src/compile_sources.py             # rebuild sources.json from research/
python3 tools/share_card.py borderline-personality-disorder/src/share-card.html borderline-personality-disorder/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Dusky lavender-violet carries the interface and sea green is the accent: it means calm, skills and therapy. Rose means emotional intensity and distress, dusky blue diagnosis and assessment, amber medication and safety. No colour stands for a "good" or "bad" person. Fonts: Playfair Display, Source Sans 3 and Overpass Mono.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`moodF`, `wave`, `thermo`, `brain`, `synapse`, `person`, `bond`, `bubble`, `ladder`, `pill`, `tline`, `ped`, `marker`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
