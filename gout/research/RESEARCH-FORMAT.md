# Research pass format

One file per research area: `<LETTER>-<area-slug>.md` (for example `C-mechanism.md`). `gout/src/compile_sources.py` reads every `[A-H]-*.md` here and merges the **Sources** sections into `gout/src/sources.json`, so the layout below is a contract, not a suggestion. This is the same format the FMF and Alzheimer's passes used; their pass files were not committed, and their output survives as `fmf/src/sources.json` and `alzheimers/src/sources.json`.

```markdown
# <LETTER> · <Area title>

Pass date: YYYY-MM-DD. Modules served: <module ids>.

## Findings

### <module id> · <topic>
- One fact per bullet, with the number, unit, population and comparator, ending in its citation(s) [[Key]] or [[KeyA,KeyB]].
- Research-landscape claims carry an evidence label in brackets: (Established), (Early evidence) or (Hypothesis).
- Disagreements between sources are written out: "X reports 40–65% (label) [[A]]; Y reports 10–20% [[B]]."
- Anything not confirmed against the original ends with (unverified).

### Exam hooks
- Short, testable statements, cited.

### In plain words
- Patient-level sentences, grade-8 reading level.

## Numbers for the animations
- Anchor points as `series | t | value | unit | [[Key]]`, for the curves-over-time widgets.

## Open questions and controversies
- Question: position A [[...]]; position B [[...]]; status.

## Sources
- [Key] Authors (up to 6, then et al.). Title. Journal. Year;Vol(Issue):pages. PMID n; PMCID PMCn; doi:10.xxxx/yyyy. Validated: PubMed|Europe PMC|Crossref|FDA label|ClinicalTrials.gov, YYYY-MM-DD.
- [Key] ... (unverified: why)

## Provenance
- What could not be accessed (paywalls, blocked sites), which facts are marked (unverified), and how each source was validated.
```

## Rules

- **Keys** are `FirstAuthorYear` (`Martinon2006`), with a letter suffix only to separate two works (`Choi2004NEJM`, `Choi2004Lancet`). Labels and registries use a short name (`FDA-Colcrys`, `NCT01234567`). Use the shared canonical keys from the dossier as given, so all passes cite the same work the same way.
- **Every source is validated** against PubMed (E-utilities `esummary`), Europe PMC (`/search?query=EXT_ID:` or `DOI:`) or Crossref (`api.crossref.org/works/<doi>`): authors, title, journal, year and identifiers must match the record. Labels are checked on the regulator's site; trials on ClinicalTrials.gov. A source that cannot be checked is kept only if essential, and its line says `(unverified: reason)`.
- **Facts come from the source cited.** Read at least the abstract; quote numbers only as the source states them. Prefer guidelines, RCTs, meta-analyses and major reviews.
- **Reuse.** A work already in `fmf/src/sources.json` keeps its FMF key and text, so the companions share citations.
- **No Hebrew, no CPCs, no referral notes here.** Those stay in the private research repo.
