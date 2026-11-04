# AUD Companion

An animated, cited study and patient-education guide to **alcohol use disorder** and alcohol withdrawal: how common it is and the words we use, standard drinks, blood alcohol and how the liver clears it, what alcohol does to GABA and glutamate and the addiction cycle, genes and family risk, the AUDIT and AUDIT-C, the DSM-5-TR criteria and blood and urine markers, the withdrawal timeline, CIWA-Ar, managing withdrawal safely, thiamine and Wernicke-Korsakoff, naltrexone, acamprosate and disulfiram, the off-label medicines, talking therapies and mutual help, course and recovery, the liver, cancer, heart and brain, pregnancy and FASD, families, nursing care in hospital, research toward better treatment and history.

**Live site:** https://www.medcompanions.org/alcohol-use-disorder/

> **Not medical advice.** The AUD Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for people with alcohol use disorder, their families and friends. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. The AUDIT, the criteria counter, PAWSS, CIWA-Ar, the Caine criteria and the blood-alcohol, Maddrey and MELD calculators are teaching aids, not self-tests, and the blood-alcohol calculator can never say whether it is safe to drive. Doses, benzodiazepine and thiamine regimens, CIWA-Ar thresholds and guideline statements are quoted as published (ASAM, APA, USPSTF, the US drug labels), not as instructions, and outcome figures are population statistics. Stopping suddenly after long, heavy daily drinking can be dangerous: get medical help to stop safely. If you or someone else may have alcohol poisoning or severe withdrawal (seizure, confusion, hallucinations), call emergency services. For help with drinking in the US, SAMHSA's National Helpline is free and confidential: 1-800-662-4357. If you are in crisis or thinking about suicide, contact a crisis line (in the US call or text 988; in the UK and Ireland Samaritans 116 123).

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding AUD | What alcohol use disorder is · Standard drinks, blood alcohol & metabolism · Alcohol and the brain: reward, adaptation, craving · Genes, family & risk |
| 2 · Screening & diagnosis | Screening: AUDIT, AUDIT-C & brief intervention · Diagnosis: DSM-5-TR criteria & severity (teaching counter) · Blood and urine markers of drinking |
| 3 · Withdrawal & acute care | Alcohol withdrawal: the timeline · CIWA-Ar: scoring withdrawal · Managing withdrawal safely · Thiamine, Wernicke and Korsakoff |
| 4 · Treatment & recovery | Approved medicines: naltrexone, acamprosate, disulfiram · Other medicines: topiramate, gabapentin, baclofen and more · Talking therapies and mutual help · Course, relapse and recovery |
| 5 · Body, family & care | The liver: fatty liver to cirrhosis · Alcohol and the whole body: cancer, heart, brain · Families, friends and everyday life · Pregnancy and fetal alcohol spectrum disorders · Nursing care in hospital · Research frontier (evidence-labelled) |
| 6 · Context & review | A history of alcohol use disorder · Flashcards & memory aids · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (%CITED% cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. The language is person-first ("people with alcohol use disorder", never "alcoholic"), suicide content follows safe-messaging guidance, and the help line text is on the home page and in the disclaimer.

## How it was made

Eight research passes, one per area: (A) epidemiology, drinking patterns, burden and history; (B) alcohol in the body and brain: metabolism, neurobiology and genetics; (C) screening, diagnosis and biomarkers; (D) alcohol withdrawal: the syndrome, CIWA-Ar, management and Wernicke; (E) medicines for AUD, approved and off-label; (F) psychosocial treatment, mutual help, course and recovery; (G) medical harms: liver, cancer, heart, brain, pregnancy and FASD; (H) nursing, harm reduction, special groups and the research frontier. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. Facts the passes could not check against a source were dropped or marked unverified in the pass files and are never used on the site. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (519 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                       # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py alcohol-use-disorder                       # just this one; fails on an unknown citation key
python3 tools/smoke.py alcohol-use-disorder/index.html all        # headless-Chrome check: no JS errors, no empty animations
python3 alcohol-use-disorder/src/compile_sources.py               # rebuild sources.json from research/
python3 tools/share_card.py alcohol-use-disorder/src/share-card.html alcohol-use-disorder/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Deep olive carries the interface; plum marks screening and diagnosis, ember withdrawal and acute care (also the safety callouts), and teal treatment and recovery. In the drawings, blue is GABA (inhibition), ember-red glutamate (excitation), amber ethanol and acetaldehyde, brown-red the liver and yellow-green thiamine. No drawing shows a drink as attractive. Fonts: Alegreya, Mulish and DM Mono. The icon is a liver lobe with a rising recovery line.
- `js/00-core.js` has the shared helpers and this companion's drawing kit (`synapse`, `balance`, `brain`, `liver`, `pathway`, `curve`, `bacSeries`, `bodymap`, `person`, `symptoms`, `mol`, `tank`, `gauge`, `beaker`, `pill`, `ladder`, `tline`, `ped`, `marker`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
