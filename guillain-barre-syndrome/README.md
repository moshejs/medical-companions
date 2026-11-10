# GBS Companion

An animated, cited study and patient-education guide to **Guillain-Barré syndrome (GBS)**: what it is and how common it is, the infections that come first, molecular mimicry at the node of Ranvier, the AIDP and AMAN subtypes, Miller Fisher syndrome and the other variants, the course from onset to nadir, plateau and recovery, signs and red flags, diagnostic criteria, lumbar puncture and nerve conduction studies, look-alikes, breathing and the 20/30/40 rule, IVIg, plasma exchange, what did not work, autonomic dysfunction, intensive care and pain, prognosis with EGOS and mEGOS, rehabilitation, life after GBS, children and pregnancy, vaccines, nursing care, the research frontier and history.

**Live site:** https://www.medcompanions.org/guillain-barre-syndrome/

> **Not medical advice.** The GBS Companion is an educational synthesis of the published literature, made for medical, nursing and therapy courses and for people who have or have had GBS, their families and carers. It does not replace a care team, it cannot diagnose anyone, and nothing in it should change a treatment without your own clinician. Weakness that is getting worse quickly, or trouble breathing or swallowing, needs emergency care. The Brighton criteria, EGRIS, EGOS and mEGOS tools are teaching aids, never for diagnosis, prognosis or treatment decisions. Doses and guideline statements are quoted as published, not as instructions, and outcome figures are population statistics.

## What's inside

A left rail of modules, one module per page, and SVG animations you scrub with a timeline slider or play.

| Part | Modules |
|---|---|
| 1 · Understanding GBS | What GBS is (incidence by age and country, IGOS outcomes by region) · Triggers *(not yet built)* · Molecular mimicry *(not yet built)* · Subtypes: AIDP &amp; AMAN (myelin versus node attack, subtype mix by cohort) · Miller Fisher &amp; other variants · The course over time (fluctuation explorer) |
| 2 · Diagnosis | Signs &amp; red flags (red-flag sorter) · Diagnostic criteria (Brighton teaching calculator) · Lumbar puncture &amp; CSF · Nerve conduction studies (criteria teaching tool) · Look-alikes (mimic comparison explorer) |
| 3 · Acute care | Breathing &amp; the 20/30/40 rule (EGRIS and mEGRIS teaching calculators) · IVIg · Plasma exchange (apheresis circuit, Cochrane forest plot) · Steroids, repeats &amp; relapses (A-CIDP explorer) · Autonomic storms · Intensive care &amp; pain |
| 4 · Recovery | Prognosis: EGOS &amp; mEGOS (teaching calculator) · Rehabilitation &amp; recovery · Life after GBS |
| 5 · Special situations &amp; care | Children &amp; pregnancy · Vaccines &amp; GBS *(not yet built)* · Nursing care (single breath count explorer) · Research frontier (complement and IgG drug targets, trial explorer, evidence-labelled) |
| 6 · Context &amp; review | History &amp; people · Flashcards &amp; memory aids · Quiz · Glossary · Sources |

Every research claim links to a numbered entry in the Sources module (479 cited sources). Research-landscape claims carry an evidence label: *Established*, *Early evidence* or *Hypothesis*.

## How it was made

Nine research passes, one per area: (A) epidemiology, burden, presentation and history; (B) triggers, vaccines and molecular mimicry; (C) subtypes, nerve pathology and electrophysiology; (D) clinical course, diagnostic criteria, CSF and the differential; (E) immunotherapy: IVIg, plasma exchange, steroids and fluctuations; (F) respiratory failure, autonomic dysfunction, pain and intensive care; (G) prognosis, recovery, rehabilitation and long-term outcomes; (H) children, pregnancy, nursing care and living with GBS; (I) the research frontier. Each pass returned cited facts, and every source was checked against PubMed, Europe PMC, Crossref, ClinicalTrials.gov or the drug label (openFDA) before it went in; anything that could not be checked was dropped. The full text of the 2023 EAN/PNS guideline could not be fetched, so its statements use the wording of its abstract; each pass's Provenance section says what else is second-hand. The pass files are in [`research/`](research/) (format: [`research/RESEARCH-FORMAT.md`](research/RESEARCH-FORMAT.md)); `tools/compile_sources.py` merged their reference lists into `src/sources.json` (544 entries, each recording which service confirmed it), and the modules were written against them.

## Building

```bash
python3 tools/build_site.py                                           # from the repo root: every companion, the hub and the sitemap
python3 tools/build.py guillain-barre-syndrome                        # just this one; fails on an unknown citation key
python3 tools/smoke.py guillain-barre-syndrome/index.html all         # headless-Chrome check: no JS errors, no empty animations
python3 tools/compile_sources.py guillain-barre-syndrome              # rebuild sources.json from research/
python3 tools/share_card.py guillain-barre-syndrome/src/share-card.html guillain-barre-syndrome/share-card.png
```

The build tools are shared by every companion and live in `tools/` at the repo root (see the root README).

- `00-head.html` holds all CSS (theme tokens for light and dark). A deep myelin indigo carries the interface, with impulse amber as the accent, teal for diagnosis, crimson for acute care, green for recovery and steel blue for special situations and care, and shape tokens for the axon, myelin, nodes of Ranvier, sodium channels, antibodies, complement, macrophages, gangliosides and the bacterial sugar that mimics them (deliberately the same hue). Fonts: Petrona, Plus Jakarta Sans and Ubuntu Mono.
- `js/01-config.js` has its storage prefix, `MODS` and `GROUPS`; the shared runtime (helpers, routing, the player) is `tools/core/`; `js/02-draw.js` has this companion's drawing kit, documented at its top (`nerveFibre`, `nodeZoom`, `ganglioside`, `antibody`, `mac`, `macrophage`, `campy`, `virus`, `bodyFront`, `lungs`, plus chart helpers shared with the Stroke Companion's kit).
- Animations have two layouts: `draw()` asks `vb()` for the wide or narrow viewBox and reads coordinates from the matching table, so a phone gets its own arrangement.
- `sections/*.html` and `js/*.js` hold one module each. Citations are written as `[[Key]]` and become numbered links at build time.
- Interface text is written as `%t:key%` (see Translations in the root README); this companion's own wording for the shared keys is in `strings.json`.

English only for now. A translation would follow the steps under Translations in the root README.

## Licence and reuse

Text and code are provided for education. Check the original sources before relying on any figure.
