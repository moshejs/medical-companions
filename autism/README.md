# Autism Companion

An animated, cited study and patient-education guide to **autism** across the lifespan: how many people are autistic and why the numbers rose, words and identity, the sensory world, genes and heritability, prenatal risk factors and what does not cause autism, the developing brain, early signs and screening, the DSM-5-TR and ICD-11 criteria and the diagnostic assessment, co-occurring conditions, supports and the evidence behind them, the ABA debate, communication and AAC, medicines and unproven treatments, school, adulthood, physical health, nursing care and history.

**Live site:** https://www.medcompanions.org/autism/

> **Not medical advice.** The Autism Companion is an educational synthesis of the published literature, made for health-science, medical and nursing courses and for autistic people, families and caregivers. It cannot diagnose anyone, and nothing in it should change a treatment decision without your own clinician. Screening questionnaires are shown as teaching tools, not for self-diagnosis, and their items are never reproduced. Criteria, doses and guideline statements are quoted as published (APA, WHO, AAP, the US drug labels), not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding autism | What autism is (prevalence, sex ratio, why the numbers rose) · Words, identity & neurodiversity · The sensory world |
| 2 · Causes & the brain | Genes & heritability · Risk factors & myths (vaccines are not a cause) · The developing brain (evidence-labelled) |
| 3 · Signs & diagnosis | Early signs & development · Screening tools · DSM-5-TR & ICD-11 criteria · The diagnostic assessment · Co-occurring conditions |
| 4 · Supports & interventions | Supports & the evidence · ABA and the debate · Communication, AAC & therapies · Medication · Unproven & harmful treatments · Research toward better support (evidence-labelled) |
| 5 · Living & lifespan | Family, school & play · Autistic adults · Physical health, sleep & safety · Nursing & healthcare visits |
| 6 · Context & review | History & people · Flashcards & mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. Identity-first ("autistic person") and person-first ("person with autism") language are both used, and the choice is explained once in module 1.2; supports are presented with their evidence and with the community debate around them.

## How it was made

Eight research passes, one per area: (A) epidemiology, identity, language and history; (B) genetics, causes and risk factors, and what does not cause autism; (C) neuroscience, brain development and sensory processing; (D) early signs, screening, DSM-5-TR/ICD-11 criteria and assessment; (E) supports and non-pharmacological interventions, including the ABA debate; (F) medication, unproven treatments and research; (G) co-occurring conditions, physical health, course and outcomes; (H) family, school, work, adulthood and nursing. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in. A few entries that no listed service indexes (NICE web guidelines, ONS releases, FDA Federal Register notices, ASHA position statements, a UK statute) are listed as unverified and never cited. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `src/compile_sources.py` merged their reference lists into `src/sources.json` (each entry records which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                          # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py autism                        # just this one; fails on an unknown citation key
python3 tools/smoke.py autism/index.html all         # headless-Chrome check: no JS errors, no empty animations
python3 autism/src/compile_sources.py                # rebuild sources.json from research/
python3 tools/share_card.py autism/src/share-card.html autism/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). Ochre-gold carries the interface and parts 1, 5 and 6; charcoal-blue is the accent and marks signs and diagnosis; violet marks causes and the brain; green marks supports and interventions. In the drawings the brain is warm sand, neurons amber, excitation orange-red, inhibition blue and sensory input amber waves. Fonts: Bitter, Lexend and Martian Mono. The icon is a gold infinity loop.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit (`brain`, `neuron`, `synapse`, `face`, `bubble`, `wave`, `profile`, `dial`, `chrom`, `tl`, `person`, `ped`).
- Animations have two layouts: `draw()` asks `NARROW()` and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
