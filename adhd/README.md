# ADHD Companion

An animated, cited study and patient-education guide to **attention deficit hyperactivity disorder (ADHD)** in children and adults: how common it is and how often it lasts into adulthood, what the brain, dopamine and genetic studies show, how it is diagnosed under DSM-5-TR and ICD-11, rating scales as teaching tools, why it is missed in girls and women, how stimulant and non-stimulant medicines work and how well they work, parent training, CBT and the MTA study, the long-term course, living with ADHD at school and work, and nursing care.

**Live site:** https://www.medcompanions.org/adhd/

> **Not medical advice.** The ADHD Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people with ADHD and their families. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. Rating scales are shown as teaching tools, not for self-diagnosis. Criteria, doses and guideline statements are quoted as published (APA, AAP, NICE, the US drug labels), not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · The condition | What ADHD is (prevalence, sex ratio, persistence) · The ADHD brain · Dopamine & noradrenaline · Genes & heritability · Environment, risk & myths |
| 2 · Recognising & diagnosing | Signs across the lifespan · DSM-5-TR criteria calculator · Rating scales & assessment · Look-alikes & co-occurring conditions · Girls, women & late diagnosis |
| 3 · Medication | How stimulants work · Formulations & the daily curve · Non-stimulant medicines · How well treatments work (network meta-analysis) · Side effects, safety & misuse |
| 4 · Behavioural & psychological care | Parent training & classroom support · CBT, coaching & adult support · The MTA study & long-term treatment |
| 5 · Living with ADHD | Course & outcomes · Living with ADHD · Nursing care · Research frontiers (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The wording is neutral and person-first ("people with ADHD"), and controlled-substance and misuse facts are stated factually.

## How it was made

Eight research passes, one per area: (A) epidemiology, presentation across the lifespan and history; (B) causes: genetics and environmental risk; (C) neurobiology: brain networks, catecholamines and how the medicines act; (D) diagnosis: criteria, rating scales, assessment and differential; (E) pharmacological treatment: stimulants and non-stimulants; (F) behavioural, psychological, school and combined treatment; (G) course, comorbidity, outcomes and research toward better treatment; (H) living, family, school and work, and nursing care. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. The NICE NG87 web page and the ICD-11 browser entry are listed as unverified and never cited; NICE recommendations are cited to the guideline's validated PubMed/Bookshelf record, and ICD-11 facts to the peer-reviewed papers that reproduce them. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py adhd                          # just this one; fails on an unknown citation key
python3 tools/smoke.py adhd/index.html all           # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py adhd                # rebuild sources.json from research/
python3 tools/share_card.py adhd/src/share-card.html adhd/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Raspberry pink carries the interface and deep teal is the accent and the colour of medicines. Part colours: the condition coral-orange, diagnosis indigo, medication deep teal, behavioural and psychological care leaf green. In the drawings dopamine is amber, noradrenaline periwinkle and the transporters teal. Fonts: Space Grotesk, Atkinson Hyperlegible and Fira Code.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`brain`, `synapse`, `person`, `ped`, `desk`, `axes`, `trace`, `wave`, `pill`, `bubble`, `clock`, `marker`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
