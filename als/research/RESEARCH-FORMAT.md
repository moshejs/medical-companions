# Research format for ALS Companion

You are researching one area for an animated, cited study and patient-education guide about
amyotrophic lateral sclerosis (ALS), for health-science students (medicine, nursing, therapies),
people living with ALS and family caregivers. Report what guidelines, trials, reviews and drug
labels say. Never phrase anything as advice to a reader.

The plan this research feeds is the ALS dossier (module plan, seeds, shared keys). Seed figures
in your brief are claims to confirm, correct or drop. Do not copy a seed into your file unless
you found it in a source you read.

Use WebSearch and WebFetch, and Bash with curl for the APIs below. Prefer primary papers,
guidelines (AAN, EFNS/EAN, NICE, national guidelines), regulatory documents (FDA labels on
DailyMed or Drugs@FDA, EMA EPARs) and major reviews.

## Validation is part of the pass

Every journal source you list must be checked against a registry record you fetched in this
pass, not written from memory. Earlier companions had research files with wrong authors,
wrong journals and papers that said the opposite of the claim; this step is how that is avoided.

- PubMed: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=<pmid>&retmode=json
  (search: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=<terms>&retmode=json)
- Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:<pmid>&format=json&resultType=core
  (abstracts: add &resultType=core and read abstractText)
- Crossref: https://api.crossref.org/works/<doi>
- ClinicalTrials.gov: https://clinicaltrials.gov/api/v2/studies/<NCT>
- openFDA labels: https://api.fda.gov/drug/label.json?search=openfda.generic_name:<name>

For each source, confirm: first author, title (published title, not a paraphrase), journal,
year, volume, issue, first page, and that the PMID and DOI name the same paper. Copy the
title from the record. If you cannot confirm a source, either drop it or mark it
"(unverified: reason)". Pause about 0.4 s between NCBI calls.

## File shape

Write your findings to the file path you are given, in exactly this shape:

    # <Letter>. <Area title>
    (one paragraph on scope and on anything you could not access: paywalls, blocked sites)

    ## Facts
    ### <subsection>
    - One fact per bullet, specific numbers where they exist (with the population, setting,
      timepoint and comparator they belong to), ending in one or more bracketed citation
      keys like [Miller2022] or [Miller2022; Bourke2006].

    ## Step sequence            (only if your brief asks for one: numbered steps for an animation)

    ## Sources
    - [Key] Authors (up to 6, then et al.). Title. Journal. Year;Vol(Issue):pages. PMID n. PMCID PMCn. doi:10.xxxx. (Abstract read | Full text read | Label read) 

    ### Notes on verification
    (what was checked against which registry; anything miscited elsewhere that you noticed)

Rules:
- Keys are FirstAuthorYear (add a letter or short word if two collide), letters, digits, _ and - only,
  and must start with a letter. Reuse the shared keys in your brief exactly if you cite those works, so
  the guide's source lists merge.
- Every number must come from a source you actually read (abstract or full text). Say which you read.
  Mark anything you could not verify "(unverified)". If something commonly said has no citable source,
  say so explicitly.
- Aim for 60-90 facts and 25-45 sources. Note real controversies and disagreements between sources,
  as controversies.
- Patient-facing framing: person-first ("people with ALS"), no "sufferer". Prognosis as ranges.
- Write the file, then reply with a 6-line summary and the file path.
