# Research format for Parkinson's Companion

You are researching one area for an animated, cited study and patient-education guide about
Parkinson's disease, for health-science (including nursing) students, people living with
Parkinson's and family caregivers. Report what guidelines, trials, reviews and drug labels say.
Never phrase anything as advice to a reader.

Use WebSearch and WebFetch. Prefer primary papers, guidelines, regulatory documents (FDA labels,
EMA assessments), and major reviews. For PubMed/DOI checks, these APIs work when publisher pages
block automated access:
- PubMed E-utilities: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=<pmid>&retmode=json
  (and efetch.fcgi?db=pubmed&id=<pmid>&rettype=abstract&retmode=text for the abstract)
- Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:<pmid>&format=json&resultType=core
- Crossref: https://api.crossref.org/works/<doi>
- ClinicalTrials.gov: https://clinicaltrials.gov/api/v2/studies/<NCT>
- openFDA labels: https://api.fda.gov/drug/label.json?search=openfda.generic_name:"<name>"

Write your findings to the file path you are given, in exactly this shape:

    # <Letter>. <Area title>
    (one paragraph on scope and on anything you could not access)

    ## Facts
    ### <subsection>
    - One fact per bullet, specific numbers where they exist, ending in one or more
      bracketed citation keys like [Postuma2015] or [Postuma2015; Bloem2021].

    ## Sources
    - [Key] Authors. Title. Journal. Year;Vol(Issue):pages. PMID n. doi:10.xxxx. (note)

Rules:
- Keys are FirstAuthorYear (add a letter or short word if two collide, e.g. Postuma2019RBD).
  Keys use only letters, digits, hyphen and underscore, and must contain a letter.
- Reuse these common keys exactly if you cite them, so the guide's source lists merge:
  [Postuma2015] MDS clinical diagnostic criteria, Mov Disord 2015;
  [Heinzel2019] MDS prodromal criteria update, Mov Disord 2019;
  [Braak2003] Braak staging, Neurobiol Aging 2003;
  [Spillantini1997] alpha-synuclein in Lewy bodies, Nature 1997;
  [Polymeropoulos1997] SNCA A53T, Science 1997;
  [Poewe2017] Parkinson disease, Nat Rev Dis Primers 2017;
  [Bloem2021] Parkinson's disease, Lancet seminar 2021;
  [GBD2018PD] GBD 2016 Parkinson's Disease Collaborators, Lancet Neurol 2018;
  [WHO2023PD] WHO fact sheet on Parkinson disease;
  [Hoehn1967] Hoehn and Yahr, Neurology 1967;
  [Goetz2004HY] MDS task force on the Hoehn and Yahr scale, Mov Disord 2004;
  [Goetz2008] MDS-UPDRS clinimetrics, Mov Disord 2008;
  [Fox2018] MDS evidence-based review of motor treatments, Mov Disord 2018;
  [Armstrong2020] Diagnosis and treatment of Parkinson disease, JAMA 2020;
  [NICE2017] NICE guideline NG71;
  [Fahn2004] ELLDOPA, NEJM 2004;
  [Verschuur2019] LEAP, NEJM 2019;
  [Ahlskog2001] frequency of levodopa motor complications, Mov Disord 2001;
  [Deuschl2006] DBS vs best medical therapy, NEJM 2006;
  [Schuepbach2013] EARLYSTIM, NEJM 2013;
  [Siderowf2023] alpha-synuclein seed amplification in PPMI, Lancet Neurol 2023;
  [Hoglinger2024] SynNeurGe, Lancet Neurol 2024;
  [Simuni2024] NSD-ISS, Lancet Neurol 2024;
  [Postuma2019RBD] RBD conversion, Brain 2019;
  [Blauwendraat2020] genetics of PD review, Lancet Neurol 2020;
  [Parkinson1817] An Essay on the Shaking Palsy.
- Every source line must carry a PMID or DOI when the work has one, and you must have checked it
  against PubMed, Europe PMC or Crossref (authors, title, journal, year, volume, pages). Note
  "(validated: PubMed)" or "(validated: Crossref)" at the end of each source line once checked.
  For guidelines, labels and web pages, give the URL and the date you opened it.
- Every number must come from a source you actually read (abstract or full text). Mark anything you
  could not verify "(unverified)". If something common has no citable source, say so explicitly.
- Aim for 50-90 facts and 20-45 sources. Note real controversies and disagreements between sources.
- The guide animates mechanisms and time courses: wherever you can, give the numbers an animation
  needs (percentages, times, rates, stage definitions, item wordings).
- Finish by replying with a 6-line summary and the file path.
