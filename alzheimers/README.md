# Alzheimer's Companion

An animated, cited study and patient-education guide to **Alzheimer's disease**, the most common cause of dementia.

**Live site:** https://www.medcompanions.org/alzheimers/ · **בעברית:** https://www.medcompanions.org/alzheimers/he/

> **Not medical advice.** Alzheimer's Companion is an educational synthesis of the published literature, made for health-science students (including nursing), people living with the disease and family caregivers. It cannot diagnose anyone and nothing in it should change a treatment without your own clinician. Doses and guideline statements are quoted as published, not as instructions.

## What's inside

One self-contained page (`index.html`): a left rail of modules, one module on stage at a time, and SVG animations you scrub with a timeline slider or play. Every animation has a phone layout of its own, keyboard controls and a spoken description for screen readers.

| Part | Modules |
|---|---|
| 1 · The disease | What Alzheimer's is · The brain that forgets (Braak and Thal stages, the memory circuit) · Amyloid, animated (APP processing to plaque) · Tau and the tangle · Microglia and the lost synapse · Genes and inheritance (APOE, the dominant families, Down syndrome) |
| 2 · Course and diagnosis | Twenty years before symptoms (the biomarker cascade) · Stages and symptoms · Diagnosis and biomarkers (blood-test calculator) · The differential |
| 3 · Treatment | Cholinesterase inhibitors and memantine · Anti-amyloid antibodies over time (lecanemab and donanemab over 18 months, ARIA) · Beyond memory (neuropsychiatric symptoms) |
| 4 · Living, caring, preventing | Lowering the risk (the 14 Lancet Commission factors, prevention trials) · Living with dementia and caregiving · Nursing care · Toward a cure (evidence-labelled routes) |
| 5 · Context and review | History and people · Flashcards and mnemonics · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module. Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*. Real disagreements (for example the 2024 Alzheimer's Association criteria versus IWG 2024, or whether the antibodies' benefit is clinically meaningful) are shown as disagreements.

## How it was made

Nine research passes (epidemiology, stages and history; pathology; genetics; diagnosis and biomarkers; symptomatic drugs and neuropsychiatric symptoms; anti-amyloid antibodies; prevention, living and caregiving; nursing care; research toward a cure) each returned cited facts. Their reference lists were merged into `src/sources.json`, and the modules were written against them.

## Building

The page is assembled from parts in `src/`:

```bash
python3 tools/build_site.py                  # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py alzheimers                # just this one; writes alzheimers/index.html, fails on an unknown citation key
python3 tools/smoke.py alzheimers/index.html all # headless-Chrome check: no JS errors, no empty animations
python3 tools/make_artifact.py alzheimers        # derives the Claude artifact copy
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

### Hebrew version

`src/he/` holds Hebrew copies of the parts, at the same paths. `python3 tools/build.py alzheimers --lang he` builds
`alzheimers/he/index.html`: right to left, Hebrew fonts and metadata (`src/he/meta.html`, `src/he/rtl.css`),
with the English part used for anything not yet translated (the build lists those). Interface text shared
with other companions is in `tools/i18n/he.json`, and this companion's own (its name, tagline, disclaimer) in
`src/he/strings.json`. Drawings keep a left-to-right frame so time axes read the same in both languages.
Other languages work the same way; see Translations in the root README.

When an English part changes, change its Hebrew copy too, then run `python3 tools/check_lang.py alzheimers he`:
it fails if a translation's code, element structure, citations or numbers differ from the English.

`compile_sources.py` rebuilds `sources.json` from the research files; `source-corrections.json`, when present, is applied afterwards so validated fixes survive a regeneration.
