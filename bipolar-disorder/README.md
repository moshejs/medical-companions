# Bipolar Companion

An animated, cited study and patient-education guide to **bipolar disorder** and lithium therapy: how common it is and how much of the illness is depression, mania, hypomania and mixed states on a life chart, genes and family risk, sleep and the body clock, the DSM-5-TR criteria, bipolar I, II and cyclothymia, screening tools and look-alike conditions, lithium (the evidence, serum levels, toxicity and interactions), valproate, lamotrigine and carbamazepine, antipsychotics, treating bipolar depression, psychoeducation and talking therapies, suicide risk and crisis safety, pregnancy and the postpartum period, course and comorbidity, living well, families, nursing care, research toward better treatment and history.

**Live site:** https://www.medcompanions.org/bipolar-disorder/

> **Not medical advice.** The Bipolar Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people living with bipolar disorder, their families and carers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. The criteria counter, the screening tools and the lithium level explainer are teaching aids, not self-tests, and suspected lithium toxicity is an emergency. Criteria, doses, serum levels, titration schedules and guideline statements are quoted as published (APA, NICE, CANMAT/ISBD, the US drug labels), not as instructions, and outcome figures are population statistics. If you are in crisis or thinking about suicide, contact local emergency services or a crisis line (in the US call or text 988; in the UK and Ireland Samaritans 116 123).

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding bipolar disorder | What bipolar disorder is (prevalence, time spent ill, words matter) · Mania, hypomania & depression · Genes & family risk · Brain, sleep & the body clock (evidence-labelled) |
| 2 · Diagnosis | DSM-5-TR criteria (teaching counter) · Bipolar I, II, cyclothymia & specifiers · Screening & rating scales · Bipolar or something else? |
| 3 · Medicines | Lithium: how it works and the evidence · Lithium levels, toxicity & interactions · Valproate, lamotrigine & carbamazepine · Antipsychotics in bipolar disorder · Treating bipolar depression |
| 4 · Therapy, safety & pregnancy | Psychoeducation & talking therapies · Suicide risk & crisis safety · Pregnancy & the postpartum period |
| 5 · Course & living | Course, relapse & comorbidity · Living well: sleep, routine & mood charting · Families, work & school · Nursing care · Research toward better treatment (evidence-labelled) |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (456 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The language is person-first ("people with bipolar disorder"), suicide content follows safe-messaging guidance, and the crisis line is on the home page, in the disclaimer and on the safety modules. The mood tracker and the safety-plan builder keep what the reader types only in their own browser.

## How it was made

Eight research passes, one per area: (A) epidemiology, presentation, burden and history; (B) genetics, family risk and environment; (C) circadian rhythm, brain networks and how lithium works; (D) DSM-5-TR and ICD-11 diagnosis, types, specifiers, screening and the differential; (E) lithium evidence, pharmacokinetics, monitoring, toxicity and interactions; (F) anticonvulsants, antipsychotics, antidepressants, ECT and guidelines; (G) psychological care, suicide safety, living well, families and nursing; (H) course, comorbidity, pregnancy and special groups, and research toward better treatment. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. Facts the passes could not check against a source (finer DSM-5-TR specifier wording behind the paywalled manual, the ICD-11 browser) are marked unverified in the pass files and never used on the site. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (538 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                   # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py bipolar-disorder                       # just this one; fails on an unknown citation key
python3 tools/smoke.py bipolar-disorder/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py bipolar-disorder             # rebuild sources.json from research/
python3 tools/share_card.py bipolar-disorder/src/share-card.html bipolar-disorder/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Pine green carries the interface and stands for the steady middle band (euthymia); gold marks mania and elevation, slate-blue depression and mauve mixed features. Plum marks diagnosis, teal the medicines and clay therapy, safety and pregnancy (also the crisis box). Fonts: Young Serif, Nunito Sans and Azeret Mono. The icon is a mood wave with a gold peak and a blue trough.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`moodSeries`, `lifechart`, `brain`, `synapse`, `person`, `clock24`, `sleepbar`, `ion`, `pill`, `kidney`, `ladder`, `tline`, `ped`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
