# H · Research frontier

Pass date: 2026-11-07. Modules served: frontier.

This pass maps where COPD research is heading as of November 2026, and how strong the evidence is for each route. It covers: the airway-epithelium "alarmin" biologics (anti-TSLP tezepelumab; anti-IL-33 itepekimab and tozorakimab; anti-ST2 astegolimab); the type 2 biologics now licensed or in phase 3 (dupilumab, mepolizumab, benralizumab, depemokimab, lunsekimig, verekitug); inhaled phosphodiesterase inhibitors (ensifentrine, tanimilast); failed anti-neutrophil and regenerative attempts (danirixin, retinoids, mesenchymal stem cells) and the newer progenitor-cell work; early and "pre-" COPD and lung-function trajectories; alpha-1 antitrypsin deficiency (AATD) therapies beyond augmentation (RNA interference, base editing, RNA editing, small-molecule correctors, gene therapy, recombinant AAT); the lung microbiome; treatable traits; bronchoscopic procedures for chronic bronchitis and airway nerves (bronchial rheoplasty, metered cryospray, targeted lung denervation); and AI applied to CT and spirometry.

Evidence labels, used on every route:
- (Established): a licensed treatment, or a finding replicated in phase 3 trials or several large cohorts.
- (Early evidence): positive or mixed results in phase 2 trials, one phase 3 programme not yet licensed, small sham-controlled device trials, or single cohorts.
- (Hypothesis): preclinical, first-in-human or mechanistic data only.

Access notes:
- Every paper was found by PubMed esearch and its record (authors, title, journal, year, volume, pages, PMID, PMCID, DOI) confirmed with PubMed efetch/esummary. Numbers come from the abstracts, read in full.
- Every NCT number was confirmed on the ClinicalTrials.gov v2 API (title, acronym, sponsor, phase, status, enrolment, dates). For AERIFY-1, AERIFY-2 and VX-864 (NCT04474197), the primary-outcome results posted on ClinicalTrials.gov are quoted directly because no peer-reviewed paper had appeared by the pass date.
- Label indications were checked on openFDA (drug/label and drugsfda endpoints). openFDA did not give the COPD supplement approval dates for Dupixent or Nucala, so those dates are not stated.
- The Martinez 2018 "early COPD" perspective and the Han 2021 "pre-COPD" perspective have no PubMed abstract, and their full text could not be retrieved (Europe PMC full-text returned HTTP 500; PMC efetch returned no body). They are cited only for the concepts their titles name. Their operational criteria are not quoted.
- Fazirsiran sources reuse the keys the cirrhosis companion already uses (Strnad2022Fazirsiran, Clark2024SEQUOIA).

## Findings

### frontier · Why new routes are needed
- In COURSE, patients already on triple inhaled therapy with at least two exacerbations in the previous year still had 2.11 moderate or severe exacerbations per year on placebo. This is the unmet need that the newer add-on biologics target [[Singh2025COURSE]].
- Three newer drugs have reached US labels for COPD so far. Dupilumab and mepolizumab are labelled as add-on maintenance treatment for adults with inadequately controlled COPD and an eosinophilic phenotype. Ensifentrine is labelled for maintenance treatment of COPD in adults (Established) [[FDA-Dupixent,FDA-Nucala,FDA-Ohtuvayre]].
- The eosinophil-targeted route is therefore Established, but only for a subgroup. MATINEE notes that eosinophilic inflammation is present in 20 to 40% of patients with COPD [[Sciurba2025]].
- The "treatable traits" proposal (2016) treats asthma and COPD as a continuum of diseases with shared mechanisms (endotypes) and observable features (phenotypes) that call for individualised treatment. Its working definition of precision medicine is treatment based on genetic, biomarker, phenotypic or psychosocial characteristics (Hypothesis, now partly tested) [[Agusti2016]].

### frontier · Type 2 biologics: what is already proven
- BOREAS (dupilumab 300 mg every 2 weeks vs placebo; eosinophils ≥300/µL, on triple therapy; n=939): moderate or severe exacerbations were 0.78 vs 1.10 per year (rate ratio 0.70, 95% CI 0.58–0.86). Pre-bronchodilator FEV1 rose 83 mL more than placebo at week 12 (Established) [[Bhatt2023]].
- NOTUS (n=935) replicated the result: exacerbations 0.86 vs 1.30 per year (rate ratio 0.66, 95% CI 0.54–0.82), FEV1 +82 mL vs placebo at week 12 and +62 mL at week 52. Unlike BOREAS, NOTUS showed no significant difference in SGRQ at 52 weeks [[Bhatt2024]].
- MATINEE (mepolizumab 100 mg every 4 weeks; eosinophils ≥300/µL; triple therapy; n=804): exacerbations 0.80 vs 1.01 per year (rate ratio 0.79, 95% CI 0.66–0.94). Median time to first exacerbation was 419 vs 321 days. Quality-of-life and symptom differences were not significant (Established) [[Sciurba2025]].
- The earlier mepolizumab trials gave mixed results. In METREX, the eosinophilic subgroup had 1.40 vs 1.71 exacerbations per year (rate ratio 0.82; adjusted P=0.04), with no effect in the overall population (rate ratio 0.98). In METREO the 100 mg rate ratio was 0.80 (adjusted P=0.07). The effect was larger at higher screening eosinophil counts [[Pavord2017]].
- Benralizumab, an IL-5 receptor-α cytolytic antibody, did not significantly lower the exacerbation rate at any dose in GALATHEA or TERRANOVA (eosinophils ≥220/mm³). The best rate ratio was 0.83 (100 mg, GALATHEA, P=0.05) [[Criner2019]].
- RESOLUTE (NCT04053634) retested benralizumab 100 mg in a narrower group: ≥2 exacerbations despite triple therapy and eosinophils ≥300/µL (n=689; completed July 2025; no results posted on ClinicalTrials.gov at the pass date) (Early evidence) [[NCT04053634]].
- Depemokimab, a long-acting anti-IL-5 antibody, is in three phase 3 COPD trials of type 2 inflammation: ENDURA-1 (NCT06959095; ~981 planned), ENDURA-2 (NCT06961214; ~961 planned) and VIGILANT (NCT07177339; ~1,196 planned; "early" add-on initiation). All are recruiting, with the annual moderate/severe exacerbation rate as primary endpoint (Early evidence) [[NCT06959095,NCT06961214,NCT07177339]].
- Lunsekimig is in phase 2b/3 for COPD with an eosinophilic phenotype on triple therapy: PERSEPHONE (NCT07190209) and THESEUS (NCT07190222), ~942 each, both recruiting with exacerbation-rate primary endpoints. A long-term safety study, COLOSSUS (NCT07793409; ~1,508), began in September 2026 [[NCT07190209,NCT07190222,NCT07793409]].

### frontier · Alarmins: TSLP at the top of the cascade
- Tezepelumab blocks thymic stromal lymphopoietin (TSLP), an epithelial cytokine whose expression is higher in COPD than in healthy people [[Singh2025COURSE]].
- COURSE (phase 2a; tezepelumab 420 mg every 4 weeks vs placebo; ≥2 exacerbations on triple therapy; n=333) missed its primary endpoint: 1.75 vs 2.11 exacerbations per year, rate ratio 0.83 (90% CI 0.64–1.06; one-sided p=0.10) (Early evidence) [[Singh2025COURSE]].
- In prespecified eosinophil subgroups, the COURSE rate ratio was 1.19 below 150 cells/µL, 0.66 at 150–<300 cells/µL and 0.54 at ≥300 cells/µL. The effect appears to grow with eosinophil count, but every confidence interval crosses 1 [[Singh2025COURSE]].
- Serious adverse events were 30% in both COURSE arms, and no death was judged treatment-related [[Singh2025COURSE]].
- Two phase 3 tezepelumab COPD trials, EMBARK (NCT06883305) and JOURNEY (NCT06878261), each plan to enrol about 990 adults with moderate to very severe COPD. Both began in March 2025, are recruiting, and have primary completion estimated in March 2029 [[NCT06883305,NCT06878261]].
- Verekitug, an antibody against the TSLP receptor, is in a phase 2b COPD trial (NCT06981078; n=666; mMRC ≥2 on triple therapy; active, not recruiting) [[NCT06981078]].

### frontier · Alarmins: IL-33 and its receptor ST2
- Genetics pointed to IL-33 before the trials did: loss-of-function variants in IL33 were associated with lower COPD risk, and gain-of-function variants in IL33 and IL1RL1 (the gene for ST2) with higher risk (Early evidence) [[Rabe2021]].
- Itepekimab phase 2a (anti-IL-33, 300 mg every 2 weeks; n=343) missed its primary endpoint overall: 1.30 vs 1.61 exacerbations per year (relative risk 0.81, P=0.13). FEV1 improved by 0.06 L [[Rabe2021]].
- Smoking status split the itepekimab phase 2 result. Former smokers had fewer exacerbations (RR 0.58, 95% CI 0.39–0.85) and a 0.09 L FEV1 gain. Current smokers showed no benefit (RR 1.09) [[Rabe2021]].
- AERIFY-1 (NCT04701983) and AERIFY-2 (NCT04751487) were designed to test itepekimab in former smokers with COPD and chronic bronchitis and ≥2 moderate or ≥1 severe exacerbation in the previous year. AERIFY-2 also enrolled a secondary current-smoker population [[Rabe2024AERIFY]].
- The AERIFY-1 results posted on ClinicalTrials.gov (former smokers, n=1,127) give 0.650 exacerbations per participant-year on itepekimab every 2 weeks vs 0.891 on placebo (rate ratio 0.729, 95% CI 0.598–0.890; p=0.0019). For every 4 weeks the rate ratio was 0.795 (p=0.0213) [[NCT04701983]].
- AERIFY-2's posted former-smoker results did not replicate this: rate ratio 0.984 (p=0.88) for every 2 weeks and 0.876 (p=0.22) for every 4 weeks vs a placebo rate of 0.879 (Early evidence: one positive and one negative phase 3) [[NCT04751487]].
- A long-term itepekimab safety study in COPD, AERIFY-4 (NCT06208306; n=669), was completed in September 2026 without posted results [[NCT06208306]].
- Astegolimab (anti-ST2) phase 2a, COPD-ST2OP (n=81 registered), did not significantly reduce exacerbations: 2.18 vs 2.81 per year (rate ratio 0.78, P=0.19). It improved SGRQ-C by 3.3 points and cut sputum eosinophils (geometric mean ratio 0.25) [[Yousuf2022]].
- In the pivotal astegolimab trials (476 mg every 2 or 4 weeks, regardless of eosinophils), phase 2b ALIENTO (n=1,301) gave a rate ratio of 0.85 (95% CI 0.72–1.00; p=0.049) for every 2 weeks. Phase 3 ARNASA (n=1,375) gave 0.85 (p=0.068) for every 2 weeks and 0.82 (p=0.024) for every 4 weeks, but did not meet its primary endpoint at statistical significance [[Papi2026]].
- The prespecified pooled analysis (n=2,682) reported a 15% reduction with astegolimab every 2 weeks (rate ratio 0.85, 95% CI 0.76–0.96) and a nominal 32% fall in severe exacerbations (rate ratio 0.68) (Early evidence) [[Wedzicha2026]].
- Tozorakimab inhibits both the reduced and the oxidised forms of IL-33 [[Watz2026]].
- Tozorakimab phase 2a, FRONTIER-4 (600 mg every 4 weeks; COPD with chronic bronchitis; n=135), missed its primary endpoint of pre-bronchodilator FEV1 (+24 mL, p=0.216). Post-bronchodilator FEV1 improved by 67 mL, with larger signals in patients with ≥2 prior exacerbations [[Singh2025FRONTIER4]].
- In the replicate phase 3 trials OBERON and TITANIA (tozorakimab 300 mg every 4 weeks; no eosinophil criterion), the former-smoker exacerbation rate ratios were 0.71 (95% CI 0.57–0.88) and 0.66 (0.55–0.80). In the overall populations they were 0.70 and 0.71 (Early evidence: replicated phase 3, not yet licensed) [[Sciurba2026]].
- The LUNA programme also includes MIRANDA (NCT06040086; 1,454 randomised 3:2 to every 2 weeks or placebo) and the extension PROSPERO (NCT05742802; primary endpoint severe exacerbations). Its design paper calls it the largest pivotal biologic programme in COPD to date [[Watz2026,NCT06040086,NCT05742802]].

### frontier · Inhaled phosphodiesterase inhibitors (PDE3/4 and PDE4)
- Ensifentrine is a dual PDE3 and PDE4 inhibitor given by nebuliser. In ENHANCE-1 (n=760) and ENHANCE-2 (n=789), FEV1 AUC0–12h improved by 87 mL and 94 mL vs placebo (Established) [[Anzueto2023]].
- Over 24 weeks, ensifentrine lowered the moderate or severe exacerbation rate vs placebo (rate ratio 0.64 in ENHANCE-1; 0.57 in ENHANCE-2). Symptoms and quality of life improved in ENHANCE-1 only [[Anzueto2023]].
- The FDA approved ensifentrine (Ohtuvayre, NDA 217389) as a new molecular entity on 26 June 2024. Its label describes it as a PDE3 and PDE4 inhibitor for COPD maintenance in adults [[FDA-Ohtuvayre]].
- Tanimilast (CHF6001), an inhaled PDE4 inhibitor, showed no FEV1 dose-response in phase 2 PIONEER (n=1,130). Exacerbation reductions were 13–28% and not significant. Post hoc, they were larger in patients with chronic bronchitis and eosinophils ≥150/µL [[Singh2020PIONEER]].
- Tanimilast's phase 3 trials in COPD with chronic bronchitis on triple therapy, PILASTER (NCT04636801; 4,710 enrolled) and PILLAR (NCT04636814; 3,973 enrolled; roflumilast comparator), were terminated as a "strategic decision by Sponsor; not due to safety reasons". No results were posted (route stalled) [[NCT04636801,NCT04636814]].

### frontier · Neutrophil-directed drugs: a cautionary result
- Danirixin, an oral CXCR2 antagonist meant to stop neutrophil migration, did not improve symptoms or health status in a 26-week phase 2b trial (n=614). It increased exacerbations, and pneumonias at 50 mg, giving "an unfavorable benefit-risk profile" (route negative) [[Lazaar2020]].

### frontier · Early COPD, pre-COPD and lung-development trajectories
- About half of COPD does not come from fast decline. In three cohorts, people with FEV1 <80% predicted before age 40 developed COPD over 22 years in 26% of cases, against 7% when baseline FEV1 was ≥80% (Established) [[Lange2015]].
- Of 332 people with COPD at the end of follow-up, about half had normal early FEV1 and lost 53 ± 21 mL per year. The other half started low and lost only 27 ± 18 mL per year, despite similar smoking [[Lange2015]].
- The normal lifetime curve has three phases: growth from birth to early adulthood, a plateau of a few years, and decline with ageing. Genes and environment can change any of them [[Agusti2019Trajectories]].
- In the Tasmanian cohort (spirometry from age 7 to 53; n=2,438), six FEV1 trajectories were found. Three of them ("early below average, accelerated decline", 4%; "persistently low", 6%; "below average", 32%) accounted for 75% of COPD burden at age 53 [[Bui2018]].
- The odds of COPD at 53 compared with the average trajectory were 35.0 for "early below average, accelerated decline", 9.5 for "persistently low" and 3.7 for "below average". Childhood asthma, bronchitis, pneumonia and maternal smoking predicted the at-risk trajectories (Established for association; prevention trials not yet done) [[Bui2018]].
- Two perspectives set out the agenda for catching the disease before airflow obstruction: "early COPD" [[Martinez2018]] and "pre-COPD" [[Han2021]]. GOLD proposes pre-COPD as a predisease state (Hypothesis as a treatment target) [[Colak2024]].
- In Copenhagen adults aged 20–50, those "susceptible" (chronic bronchitis plus subtle lung-function impairment) developed COPD over 10 years in 28% of cases vs 8% of non-susceptible people. More than half of new COPD arose from a susceptible state (Early evidence) [[Colak2024]].
- Treating pre-COPD with bronchodilators has not worked. In RETHINC (n=535 randomised; tobacco-exposed, CAT ≥10, preserved spirometry), indacaterol–glycopyrrolate for 12 weeks gave a ≥4-point SGRQ improvement in 56.4% vs 59.0% on placebo (adjusted OR 0.91; P=0.65), although FEV1 rose 2.48 percentage points [[Han2022RETHINC]].

### frontier · Regeneration and stem cells
- The adult lung is normally quiet, but after injury, progenitor populations can activate and surviving cells can re-enter the cell cycle. That is the basis for trying to stimulate endogenous repair or replace cells derived from pluripotent stem cells (Hypothesis) [[Kotton2014]].
- Retinoids promote alveolar septation in the developing lung. In the FORTE feasibility trial (n=148), all-trans and 13-cis retinoic acid did not improve lung function, CT density or quality of life over 6 months (route negative so far) [[Roth2006]].
- Palovarotene, a γ-selective retinoid, did not change CT lung density over 1 year in 262 patients with severe AATD emphysema (REPAIR; placebo-corrected difference −0.25 HU at week 52, p=0.94) [[Stolk2012]].
- Intravenous allogeneic mesenchymal stem cells (4 monthly infusions of 100 × 10⁶ cells; n=62) appeared safe over 2 years, but did not change lung function, exacerbations or quality of life. CRP fell early in patients whose CRP was raised (Early evidence for safety only) [[Weiss2013]].
- In a small Chinese trial, autologous P63+ airway basal progenitor cells (collected by bronchoscopic brushing, cultured 3–5 weeks, returned bronchoscopically) were given to people with stage II–IV COPD. At 24 weeks, DLCO changed by +18.2% in the 17 evaluable treated patients vs −17.4% in 3 controls (P=0.008), with no grade 3–5 adverse events (Early evidence; very small, unbalanced control group) [[Wang2024P63]].

### frontier · Alpha-1 antitrypsin deficiency: from protein replacement to gene correction
- Augmentation therapy is the reference point. In RAPID (n=180; 60 mg/kg weekly intravenous A1PI vs placebo, 24 months), CT lung density loss at TLC was −1.45 vs −2.19 g/L per year (difference 0.74, p=0.03). The combined TLC+FRC primary endpoint narrowly missed (p=0.06) (Established) [[Chapman2015]].
- SPARTA (NCT01983241; n=345; whole-lung PD15 density primary endpoint) is a phase 3 trial of a modified-process A1PI. It completed in July 2026 with no results posted at the pass date [[NCT01983241]].
- Recombinant AAT-Fc fusion protein: ELEVAATE (NCT05856331; phase 2; n=99) compared SAR447537 (INBRX-101) with plasma-derived A1PI (Zemaira) on steady-state functional AAT levels. It completed in August 2025 without posted results (Early evidence) [[NCT05856331]].
- RNA interference for the liver: fazirsiran degrades Z-AAT mRNA. In the open-label AROAAT-2002 trial (n=16), liver Z-AAT fell by a median of 83% and serum by about 90% at nadir. Fibrosis regressed in 7 of 15 patients (Early evidence) [[Strnad2022Fazirsiran]].
- In the placebo-controlled SEQUOIA trial (n=40), serum Z-AAT fell 61%, 83% and 94% with fazirsiran 25, 100 and 200 mg at week 16. Liver Z-AAT fell by a median of 93% vs a 26% rise on placebo. Pulmonary function tests stayed stable [[Clark2024SEQUOIA]].
- Fazirsiran phase 3 trials are recruiting in AATD liver disease with fibrosis (NCT05677971; ~160) and with mild fibrosis (NCT06165341; ~50). Silencing does not raise circulating AAT, so the route targets the liver, not emphysema [[NCT05677971,NCT06165341,Strnad2022Fazirsiran]].
- Small-molecule correctors: GSK716 binds a cryptic pocket in Z-AAT, blocks polymerisation and raised Z-AAT secretion threefold in iPSC cells and sevenfold in transgenic mice (Hypothesis) [[Lomas2021]].
- Vertex's corrector VX-864 raised plasma functional AAT by about 2.2–2.3 µM vs placebo at day 28 in a phase 2 trial in PiZZ patients (NCT04474197; n=44) [[NCT04474197]].
- A second VX-864 phase 2 trial (NCT05643495) was terminated "based on frequency and nature of skin and subcutaneous tissue disorders" [[NCT05643495]].
- Gene therapy (AAV): in a phase 2 trial (n=9), intramuscular rAAV1-AAT produced dose-dependent normal M-AAT, but well below therapeutic targets [[Flotte2011]]. Follow-up showed stable expression at 2.0–2.5% of the target level from years 1 to 5, with partial correction of neutrophil defects (Early evidence) [[Mueller2017]].
- Base editing (DNA): BEAM-302, a lipid-nanoparticle base editor, is in a phase 1/2 trial for AATD lung and/or liver disease (NCT06389877; ~192 planned; recruiting) [[NCT06389877]].
- In the first liver biopsy after in vivo base editing (a 66-year-old PiZZ man in the YOLT-202 trial, NCT07193615), the PiZ variant was corrected in 54–57% of alleles at 10 weeks, with no detected off-target editing. Circulating AAT stayed active (Hypothesis-to-early evidence: single case) [[Krooss2027,NCT07193615]].
- RNA editing: SERPINA1-994, a GalNAc oligonucleotide that recruits the body's own ADAR enzymes, edited 50% of Z transcripts in PiZ mouse liver. It raised serum AAT and elastase-inhibiting capacity and reduced liver aggregates (Hypothesis) [[Monian2026]].
- The clinical RNA-editing candidate WVE-006 is in a phase 1b/2a trial in PiZZ AATD (RestorAATion-2, NCT06405633; ~48 planned; recruiting) [[NCT06405633]].

### frontier · The lung microbiome
- In 87 patients sampled 476 times by sputum 16S sequencing, the lung microbiota shifted with exacerbations. Antibiotics and steroids changed it in different ways, and a few taxa, especially Haemophilus, seemed to shape the whole community. Sputum IL-8 tracked microbiome structure (Early evidence) [[Wang2016]].
- In AERIS (101 patients, 584 sputum samples over 1 year), microbiome stability fell during exacerbations and in frequent exacerbators. Bacterial and eosinophilic exacerbations tended to repeat within the same person, while viral ones did not [[Mayhew2018]].
- Haemophilus and Moraxella were linked to disease severity, exacerbations and bronchiectasis. This supports microbiome-based biomarkers, but no microbiome-directed therapy has been tested in COPD yet (Hypothesis as a treatment route) [[Mayhew2018]].

### frontier · Treatable traits in practice
- A 2022 meta-analysis of treatable-traits interventions in obstructive airway disease (11 studies; 7 controlled trials pooled) found better quality of life (mean difference −6.96), fewer hospitalisations (OR 0.52) and lower 1-year mortality (OR 0.65) (Early evidence: small, mixed asthma/COPD trials) [[Sarwar2022]].

### frontier · Bronchoscopic procedures for chronic bronchitis and airway nerves
- Bronchial rheoplasty applies non-thermal pulsed electrical fields to ablate airway epithelium so that normal epithelium can regrow. In 30 patients, CAT fell by 7.9 and SGRQ by 14.6 points at 6 months, goblet-cell hyperplasia fell, and mild haemoptysis occurred in 47% (Early evidence: uncontrolled) [[Valipour2020]].
- The sham-controlled rheoplasty trial RheSolve (NCT04677465; ~270; primary endpoint CAT) is listed with status "unknown" and had posted no results by the pass date [[NCT04677465]].
- Metered cryospray delivers liquid nitrogen to the bronchial airways. In SPRAY-CB (NCT03893370; 203 patients randomised 2:1 vs sham), SGRQ improved by 5.9 points and CAT by 3.4 points vs control at 12 months. Periprocedural pneumothorax occurred in 3.6% of treatments (Early evidence) [[Criner2026SPRAYCB,NCT03893370]].
- A mechanistic sham-controlled cryospray trial (n=32) found no reduction in goblet-cell density, the expected mechanism, but did find better SGRQ (−9.6) and less CT air trapping [[Orton2026]].
- Targeted lung denervation uses bronchoscopic radiofrequency ablation to disrupt parasympathetic nerves to the lungs. In AIRFLOW-2 (n=82, sham-controlled), respiratory adverse events at 3–6.5 months were 32% vs 71%, and the hazard ratio for exacerbations needing hospital care was 0.35 over 12.5 months. Symptoms and time to first exacerbation did not differ (Early evidence) [[Slebos2019]].
- AIRFLOW-3 (NCT03639051; 464 enrolled; primary endpoint moderate or severe exacerbations) is active, not recruiting, with follow-up to 2028 [[NCT03639051]].

### frontier · AI, quantitative CT and mucus plugs
- Parametric response mapping matches inspiratory and expiratory CT voxel by voxel to separate functional small airways disease from emphysema. In 194 COPDGene participants, it gave CT evidence that small airways disease comes before emphysema as severity rises (Early evidence) [[Galban2012]].
- A convolutional neural network trained on CT scans from 7,983 COPDGene participants detected COPD with a C statistic of 0.856. It predicted mortality with C indices of 0.72 (COPDGene) and 0.60 (ECLIPSE), so performance fell on an external cohort (Early evidence) [[Gonzalez2018]].
- In 4,363 COPDGene participants followed for a median 9.5 years, mortality was 34.0%, 46.7% and 54.1% with mucus plugs in 0, 1–2 and ≥3 lung segments (adjusted HR 1.15 and 1.24). This makes CT mucus plugs a candidate imaging trait (Established association) [[Diaz2023]].
- Explainable AI raised pulmonologists' diagnostic accuracy on lung-function reports by 5.4–10.4 percentage points (preferred diagnosis) and increased their confidence and agreement [[Das2023]].
- In a randomised trial of primary-care clinicians (133 completed), AI decision support improved spirometry diagnosis by 9.0 percentage points overall and 15.9 points for COPD cases (Early evidence: simulated case records) [[Doe2025]].

### frontier · Step sequence
Where the new treatments act, from the airway surface inward (one phase per step).
1. **Kicker: Damage.** **Title: Smoke and viruses injure the epithelium.** Epithelial damage releases IL-33, an inflammatory cytokine implicated in COPD [[Rabe2024AERIFY]], and TSLP, which is raised in COPD [[Singh2025COURSE]].
2. **Kicker: Alarm.** **Title: Blocking the alarmins.** Anti-IL-33 tozorakimab cut exacerbations by about 30% in two replicate phase 3 trials, without selecting patients by eosinophil count [[Sciurba2026]]. Anti-ST2 astegolimab gave a 15% pooled reduction [[Wedzicha2026]].
3. **Kicker: Type 2.** **Title: Downstream IL-4/IL-13 and IL-5.** In patients with eosinophils ≥300/µL, dupilumab (rate ratio 0.70 and 0.66) and mepolizumab (0.79) lowered exacerbations on top of triple therapy [[Bhatt2023,Bhatt2024,Sciurba2025]].
4. **Kicker: Muscle and mucus.** **Title: Dual PDE3/4 inhibition.** Nebulised ensifentrine added 87–94 mL of FEV1 and lowered exacerbations over 24 weeks [[Anzueto2023]].
5. **Kicker: Structure.** **Title: Resurfacing airways and cutting nerves.** Rheoplasty, cryospray and targeted lung denervation act directly on the bronchial wall, with mostly symptom gains in small sham-controlled trials [[Valipour2020,Criner2026SPRAYCB,Slebos2019]].
6. **Kicker: Repair.** **Title: Regrowing lung tissue.** Retinoids and stem-cell infusions have failed so far, and autologous P63+ progenitor transplantation is the first small positive signal [[Roth2006,Weiss2013,Wang2024P63]].

### frontier · Step sequence: AATD routes along gene → RNA → protein
1. **Kicker: Gene.** **Title: Rewrite the Z mutation.** In vivo base editing corrected 54–57% of PiZ alleles in one patient's liver [[Krooss2027]]. BEAM-302 is in phase 1/2 [[NCT06389877]].
2. **Kicker: RNA.** **Title: Edit or silence the message.** RNA editing turned 50% of Z transcripts into normal ones in mice [[Monian2026]]. RNAi with fazirsiran cut liver Z-AAT by 83–93% [[Strnad2022Fazirsiran,Clark2024SEQUOIA]].
3. **Kicker: Folding.** **Title: Help Z-AAT fold and leave the liver.** Correctors raise secretion (GSK716 sevenfold in mice; VX-864 +2.3 µM in patients) [[Lomas2021,NCT04474197]].
4. **Kicker: Replace.** **Title: Give back the missing protein.** Weekly A1PI slowed CT lung density loss at TLC (−1.45 vs −2.19 g/L per year) [[Chapman2015]]. AAV gene therapy reached only 2.0–2.5% of target levels [[Mueller2017]].
5. **Kicker: Protect.** **Title: Lung and liver need different fixes.** Silencing protects the liver but does not raise AAT for the lung, while editing aims to do both [[Strnad2022Fazirsiran,Monian2026]].

### Exam hooks
- Dupilumab (anti-IL-4Rα) and mepolizumab (anti-IL-5) have US COPD labels limited to an eosinophilic phenotype. Benralizumab failed in GALATHEA/TERRANOVA [[FDA-Dupixent,FDA-Nucala,Criner2019]].
- BOREAS and NOTUS both required blood eosinophils ≥300/µL, and the exacerbation rate ratios were 0.70 and 0.66 [[Bhatt2023,Bhatt2024]].
- Ensifentrine is a dual PDE3/PDE4 inhibitor given by nebuliser. FDA approved it on 26 June 2024 [[FDA-Ohtuvayre,Anzueto2023]].
- Tezepelumab blocks TSLP. COURSE missed its primary endpoint (rate ratio 0.83), and phase 3 trials EMBARK and JOURNEY are running [[Singh2025COURSE,NCT06883305]].
- IL-33 antibodies looked better in former than in current smokers in phase 2 (itepekimab RR 0.58 vs 1.09) [[Rabe2021]].
- Tozorakimab reduced exacerbations by about 30% in both OBERON and TITANIA [[Sciurba2026]].
- Half of COPD comes from a low peak FEV1 in early adulthood, not from fast decline (27 vs 53 mL per year) [[Lange2015]].
- Dual bronchodilators did not help symptomatic smokers with preserved spirometry (RETHINC) [[Han2022RETHINC]].
- In RAPID, A1PI augmentation slowed lung density loss at TLC (p=0.03), but the combined primary endpoint gave p=0.06 [[Chapman2015]].
- Fazirsiran is an RNAi drug for AATD liver disease. It lowers Z-AAT and does not replace AAT for the lung [[Strnad2022Fazirsiran]].
- Targeted lung denervation ablates parasympathetic nerves. Bronchial rheoplasty and cryospray resurface the epithelium in chronic bronchitis [[Slebos2019,Valipour2020,Criner2026SPRAYCB]].
- CT mucus plugs in ≥3 segments carry an adjusted HR for death of 1.24 [[Diaz2023]].

### In plain words
- Most people with COPD use inhalers. For some who still have flare-ups, injections called biologics can lower how often flare-ups happen. Two are already approved for people with high levels of a white blood cell called the eosinophil [[FDA-Dupixent,FDA-Nucala]].
- Newer injections block "alarm signals" (IL-33 and TSLP) that damaged airway cells send out. One of them, tozorakimab, cut flare-ups by about a third in two large studies, but it is not approved yet [[Sciurba2026]].
- Some of these drugs seemed to work better in people who had stopped smoking than in people who still smoke [[Rabe2021]].
- A newer inhaled medicine, ensifentrine, opens the airways and is breathed in through a nebuliser machine [[FDA-Ohtuvayre,Anzueto2023]].
- COPD can start early in life. Children whose lungs never grow to full size have a higher chance of COPD later, even if their lungs do not wear out faster [[Lange2015,Bui2018]].
- Scientists are trying to regrow damaged lung tissue, but so far this works only in small early studies [[Wang2024P63,Weiss2013]].
- For alpha-1 antitrypsin deficiency, a genetic cause of COPD, researchers are testing ways to fix the faulty gene or its message, not only to replace the missing protein [[Krooss2027,Clark2024SEQUOIA]].
- Doctors are testing small procedures done through a camera tube to calm mucus-making airways or the nerves that tighten them. These are still being studied [[Criner2026SPRAYCB,Slebos2019]].
- Computers that read CT scans and breathing tests may help find COPD earlier and more accurately [[Gonzalez2018,Doe2025]].

## Numbers for the animations
- exacerbation_rate_ratio_vs_placebo | BOREAS dupilumab | 0.70 | rate ratio | [[Bhatt2023]]
- exacerbation_rate_ratio_vs_placebo | NOTUS dupilumab | 0.66 | rate ratio | [[Bhatt2024]]
- exacerbation_rate_ratio_vs_placebo | MATINEE mepolizumab | 0.79 | rate ratio | [[Sciurba2025]]
- exacerbation_rate_ratio_vs_placebo | METREX mepolizumab (eosinophilic) | 0.82 | rate ratio | [[Pavord2017]]
- exacerbation_rate_ratio_vs_placebo | GALATHEA benralizumab 100 mg | 0.83 | rate ratio | [[Criner2019]]
- exacerbation_rate_ratio_vs_placebo | TERRANOVA benralizumab 100 mg | 0.93 | rate ratio | [[Criner2019]]
- exacerbation_rate_ratio_vs_placebo | COURSE tezepelumab | 0.83 | rate ratio (90% CI 0.64–1.06) | [[Singh2025COURSE]]
- exacerbation_rate_ratio_vs_placebo | itepekimab phase 2 overall | 0.81 | relative risk | [[Rabe2021]]
- exacerbation_rate_ratio_vs_placebo | AERIFY-1 itepekimab Q2W | 0.729 | rate ratio | [[NCT04701983]]
- exacerbation_rate_ratio_vs_placebo | AERIFY-2 itepekimab Q2W (former smokers) | 0.984 | rate ratio | [[NCT04751487]]
- exacerbation_rate_ratio_vs_placebo | ALIENTO astegolimab Q2W | 0.85 | rate ratio | [[Papi2026]]
- exacerbation_rate_ratio_vs_placebo | ARNASA astegolimab Q4W | 0.82 | rate ratio | [[Papi2026]]
- exacerbation_rate_ratio_vs_placebo | astegolimab pooled Q2W | 0.85 | rate ratio | [[Wedzicha2026]]
- exacerbation_rate_ratio_vs_placebo | OBERON tozorakimab (overall) | 0.70 | rate ratio | [[Sciurba2026]]
- exacerbation_rate_ratio_vs_placebo | TITANIA tozorakimab (overall) | 0.71 | rate ratio | [[Sciurba2026]]
- exacerbation_rate_ratio_vs_placebo | ENHANCE-1 ensifentrine | 0.64 | rate ratio | [[Anzueto2023]]
- exacerbation_rate_ratio_vs_placebo | ENHANCE-2 ensifentrine | 0.57 | rate ratio | [[Anzueto2023]]
- annual_exacerbations_placebo_vs_drug | BOREAS placebo | 1.10 | events/year | [[Bhatt2023]]
- annual_exacerbations_placebo_vs_drug | BOREAS dupilumab | 0.78 | events/year | [[Bhatt2023]]
- annual_exacerbations_placebo_vs_drug | MATINEE placebo | 1.01 | events/year | [[Sciurba2025]]
- annual_exacerbations_placebo_vs_drug | MATINEE mepolizumab | 0.80 | events/year | [[Sciurba2025]]
- annual_exacerbations_placebo_vs_drug | OBERON placebo (former smokers) | 1.90 | events/year | [[Sciurba2026]]
- annual_exacerbations_placebo_vs_drug | OBERON tozorakimab (former smokers) | 1.34 | events/year | [[Sciurba2026]]
- annual_exacerbations_placebo_vs_drug | TITANIA placebo (former smokers) | 2.07 | events/year | [[Sciurba2026]]
- annual_exacerbations_placebo_vs_drug | TITANIA tozorakimab (former smokers) | 1.37 | events/year | [[Sciurba2026]]
- tezepelumab_rate_ratio_by_eosinophils | <150 cells/µL | 1.19 | rate ratio | [[Singh2025COURSE]]
- tezepelumab_rate_ratio_by_eosinophils | 150–<300 cells/µL | 0.66 | rate ratio | [[Singh2025COURSE]]
- tezepelumab_rate_ratio_by_eosinophils | ≥300 cells/µL | 0.54 | rate ratio | [[Singh2025COURSE]]
- itepekimab_phase2_by_smoking | former smokers | 0.58 | relative risk | [[Rabe2021]]
- itepekimab_phase2_by_smoking | current smokers | 1.09 | relative risk | [[Rabe2021]]
- fev1_gain_vs_placebo | BOREAS dupilumab wk 12 | 83 | mL | [[Bhatt2023]]
- fev1_gain_vs_placebo | NOTUS dupilumab wk 12 | 82 | mL | [[Bhatt2024]]
- fev1_gain_vs_placebo | ENHANCE-1 ensifentrine AUC0–12h | 87 | mL | [[Anzueto2023]]
- fev1_gain_vs_placebo | ENHANCE-2 ensifentrine AUC0–12h | 94 | mL | [[Anzueto2023]]
- fev1_gain_vs_placebo | itepekimab phase 2 wk 16–24 | 60 | mL | [[Rabe2021]]
- fev1_decline_by_trajectory | normal start, rapid decline | 53 | mL/year | [[Lange2015]]
- fev1_decline_by_trajectory | low start, normal decline | 27 | mL/year | [[Lange2015]]
- copd_after_22y_by_early_fev1 | FEV1 <80% predicted before 40 | 26 | % | [[Lange2015]]
- copd_after_22y_by_early_fev1 | FEV1 ≥80% predicted before 40 | 7 | % | [[Lange2015]]
- tahs_trajectory_share | early below average, accelerated decline | 4 | % of cohort | [[Bui2018]]
- tahs_trajectory_share | persistently low | 6 | % of cohort | [[Bui2018]]
- tahs_trajectory_share | early low, accelerated growth, normal decline | 8 | % of cohort | [[Bui2018]]
- tahs_trajectory_share | persistently high | 12 | % of cohort | [[Bui2018]]
- tahs_trajectory_share | below average | 32 | % of cohort | [[Bui2018]]
- tahs_trajectory_share | average | 39 | % of cohort | [[Bui2018]]
- tahs_copd_odds_at_53 | early below average, accelerated decline | 35.0 | odds ratio vs average | [[Bui2018]]
- tahs_copd_odds_at_53 | persistently low | 9.5 | odds ratio vs average | [[Bui2018]]
- tahs_copd_odds_at_53 | below average | 3.7 | odds ratio vs average | [[Bui2018]]
- incident_copd_10y | susceptible young adults | 28 | % | [[Colak2024]]
- incident_copd_10y | non-susceptible young adults | 8 | % | [[Colak2024]]
- fazirsiran_serum_zaat_change_wk16 | 25 mg | -61 | % | [[Clark2024SEQUOIA]]
- fazirsiran_serum_zaat_change_wk16 | 100 mg | -83 | % | [[Clark2024SEQUOIA]]
- fazirsiran_serum_zaat_change_wk16 | 200 mg | -94 | % | [[Clark2024SEQUOIA]]
- rapid_lung_density_loss_TLC | placebo | -2.19 | g/L per year | [[Chapman2015]]
- rapid_lung_density_loss_TLC | A1PI 60 mg/kg weekly | -1.45 | g/L per year | [[Chapman2015]]
- aat_gene_therapy_level | rAAV1-AAT years 1–5 | 2.0–2.5 | % of target level | [[Mueller2017]]
- base_editing_allele_correction | YOLT-202 liver biopsy wk 10 | 54–57 | % of alleles | [[Krooss2027]]
- rna_editing_z_transcripts | SERPINA1-994 mouse liver | 50 | % edited | [[Monian2026]]
- vx864_functional_aat_gain_day28 | 100 mg | 2.3 | µM vs placebo | [[NCT04474197]]
- vx864_functional_aat_gain_day28 | 500 mg | 2.2 | µM vs placebo | [[NCT04474197]]
- mucus_plug_mortality | 0 segments | 34.0 | % died (median 9.5 y) | [[Diaz2023]]
- mucus_plug_mortality | 1–2 segments | 46.7 | % died | [[Diaz2023]]
- mucus_plug_mortality | ≥3 segments | 54.1 | % died | [[Diaz2023]]
- tld_resp_adverse_events_3to6.5mo | TLD | 32 | % | [[Slebos2019]]
- tld_resp_adverse_events_3to6.5mo | sham | 71 | % | [[Slebos2019]]
- p63_dlco_change_24wk | progenitor transplant | +18.2 | % from baseline | [[Wang2024P63]]
- p63_dlco_change_24wk | control | -17.4 | % from baseline | [[Wang2024P63]]
- ai_ct_copd_detection | COPDGene CNN | 0.856 | C statistic | [[Gonzalez2018]]
- ai_spirometry_gain_primary_care | COPD cases | 15.9 | percentage points | [[Doe2025]]

## Open questions and controversies
- Do eosinophils pick the responders to alarmin drugs? Tezepelumab's effect rose across eosinophil strata (1.19 → 0.54) [[Singh2025COURSE]], but tozorakimab and astegolimab reduced exacerbations without any eosinophil criterion [[Sciurba2026,Papi2026]]. Status: the tezepelumab phase 3 trials will test this [[NCT06883305,NCT06878261]].
- Does current smoking blunt anti-IL-33 therapy? Itepekimab phase 2 helped only former smokers [[Rabe2021]], and AERIFY-1 (former smokers) was positive while AERIFY-2 was not [[NCT04701983,NCT04751487]]. Tozorakimab worked in the overall current-plus-former population [[Sciurba2026]]. Status: unresolved, and the epitope or IL-33 form targeted (reduced vs oxidised) may matter [[Watz2026]].
- How big is "worthwhile"? Astegolimab's pooled 15% reduction met significance, but ARNASA alone did not [[Papi2026,Wedzicha2026]]. Effects of 20–34% for licensed type 2 biologics set the bar [[Bhatt2023,Bhatt2024,Sciurba2025]]. Status: depends on regulators and payers.
- Should pre-COPD be treated? People in a susceptible state progress more often [[Colak2024]], but dual bronchodilators did not relieve symptoms in RETHINC [[Han2022RETHINC]]. Status: no proven therapy, and targets other than bronchodilation are needed.
- Is A1PI augmentation proven? The RAPID TLC result was significant but the combined primary was not (p=0.06) [[Chapman2015]]. SPARTA's results are pending [[NCT01983241]].
- Lung or liver first in AATD? Silencing helps the liver without raising lung protection [[Strnad2022Fazirsiran]]; editing and correctors try to do both [[Monian2026,Krooss2027]]. VX-864 was stopped for skin toxicity [[NCT05643495]]. Status: early human data only.
- Can devices beat sham on hard outcomes? Cryospray and TLD improved symptoms or adverse-event windows, but not all exacerbation endpoints [[Criner2026SPRAYCB,Slebos2019]]. Cryospray did not lower goblet-cell density, its expected mechanism [[Orton2026]]. Status: AIRFLOW-3 and RheSolve are awaited [[NCT03639051,NCT04677465]].
- Will AI generalise? CT CNN mortality discrimination fell from 0.72 in COPDGene to 0.60 in ECLIPSE [[Gonzalez2018]]. The primary-care AI spirometry trial used simulated record reading, not real patients [[Doe2025]].

## Sources
- [Singh2025COURSE] Singh D, Brightling CE, Rabe KF, Han MK, Christenson SA, Drummond MB, et al. Efficacy and safety of tezepelumab versus placebo in adults with moderate to very severe chronic obstructive pulmonary disease (COURSE): a randomised, placebo-controlled, phase 2a trial. Lancet Respir Med. 2025;13(1):47-58. PMID 39653044; doi:10.1016/S2213-2600(24)00324-2. (validated: PubMed)
- [Rabe2021] Rabe KF, Celli BR, Wechsler ME, Abdulai RM, Luo X, Boomsma MM, et al. Safety and efficacy of itepekimab in patients with moderate-to-severe COPD: a genetic association study and randomised, double-blind, phase 2a trial. Lancet Respir Med. 2021;9(11):1288-1298. PMID 34302758; doi:10.1016/S2213-2600(21)00167-3. (validated: PubMed)
- [Rabe2024AERIFY] Rabe KF, Martinez FJ, Bhatt SP, Kawayama T, Cosio BG, Mroz RM, et al. AERIFY-1/2: two phase 3, randomised, controlled trials of itepekimab in former smokers with moderate-to-severe COPD. ERJ Open Res. 2024;10(5):00718-2023. PMID 39319046; PMCID PMC11417606; doi:10.1183/23120541.00718-2023. (validated: PubMed)
- [Yousuf2022] Yousuf AJ, Mohammed S, Carr L, Yavari Ramsheh M, Micieli C, Mistry V, et al. Astegolimab, an anti-ST2, in chronic obstructive pulmonary disease (COPD-ST2OP): a phase 2a, placebo-controlled trial. Lancet Respir Med. 2022;10(5):469-477. PMID 35339234; doi:10.1016/S2213-2600(21)00556-7. (validated: PubMed)
- [Papi2026] Papi A, Greening NJ, Bhatt SP, Roche N, Celli B, Wedzicha JA, et al. Safety and efficacy of astegolimab for COPD with frequent exacerbations regardless of baseline blood eosinophil counts (ALIENTO and ARNASA): randomised, double-blind, placebo-controlled, phase 2b and 3 trials. Lancet. 2026;407(10543):2027-2039. PMID 42150581; doi:10.1016/S0140-6736(26)00637-9. (validated: PubMed)
- [Wedzicha2026] Wedzicha JA, Agustí À, Brightling CE, Calverley P, Chalmers JD, Greening NJ, et al. Astegolimab for chronic obstructive pulmonary disease with frequent exacerbations: pooled analysis of the ALIENTO and ARNASA trials. Am J Respir Crit Care Med. 2026;212(9):2050-2060. PMID 42148875; PMCID PMC13519342; doi:10.1093/ajrccm/aamag226. (validated: PubMed)
- [Singh2025FRONTIER4] Singh D, Guller P, Reid F, Doffman S, Seppälä U, Psallidas I, et al. A phase 2a trial of the IL-33 monoclonal antibody tozorakimab in patients with COPD: FRONTIER-4. Eur Respir J. 2025;66(1):2402231. PMID 40154559; PMCID PMC12256803; doi:10.1183/13993003.02231-2024. (validated: PubMed)
- [Sciurba2026] Sciurba FC, Watz H, Bourdin A, Janssens W, Martinez FJ, Zheng J, et al. Tozorakimab to Prevent COPD Exacerbations. N Engl J Med. 2026;395(17):1703-1716. PMID 42708515; doi:10.1056/NEJMoa2606998. (validated: PubMed)
- [Watz2026] Watz H, Sciurba FC, Bonini M, Yañez A, Bourdin A, Zheng J, et al. Phase III LUNA clinical programme: design of four randomised, double-blind, placebo-controlled studies assessing the efficacy and safety of tozorakimab in patients with symptomatic COPD and a high risk of exacerbations. BMJ Open Respir Res. 2026;13(1). PMID 42476723; PMCID PMC13386067; doi:10.1136/bmjresp-2026-004145. (validated: PubMed)
- [Anzueto2023] Anzueto A, Barjaktarevic IZ, Siler TM, Rheault T, Bengtsson T, Rickard K, et al. Ensifentrine, a Novel Phosphodiesterase 3 and 4 Inhibitor for the Treatment of Chronic Obstructive Pulmonary Disease: Randomized, Double-Blind, Placebo-controlled, Multicenter Phase III Trials (the ENHANCE Trials). Am J Respir Crit Care Med. 2023;208(4):406-416. PMID 37364283; PMCID PMC10449067; doi:10.1164/rccm.202306-0944OC. (validated: PubMed)
- [Singh2020PIONEER] Singh D, Emirova A, Francisco C, Santoro D, Govoni M, Nandeuil MA. Efficacy and safety of CHF6001, a novel inhaled PDE4 inhibitor in COPD: the PIONEER study. Respir Res. 2020;21(1):246. PMID 32962709; PMCID PMC7510119; doi:10.1186/s12931-020-01512-y. (validated: PubMed)
- [Bhatt2023] Bhatt SP, Rabe KF, Hanania NA, Vogelmeier CF, Cole J, Bafadhel M, et al. Dupilumab for COPD with Type 2 Inflammation Indicated by Eosinophil Counts. N Engl J Med. 2023;389(3):205-214. PMID 37272521; doi:10.1056/NEJMoa2303951. (validated: PubMed)
- [Bhatt2024] Bhatt SP, Rabe KF, Hanania NA, Vogelmeier CF, Bafadhel M, Christenson SA, et al. Dupilumab for COPD with Blood Eosinophil Evidence of Type 2 Inflammation. N Engl J Med. 2024;390(24):2274-2283. PMID 38767614; doi:10.1056/NEJMoa2401304. (validated: PubMed)
- [Sciurba2025] Sciurba FC, Criner GJ, Christenson SA, Martinez FJ, Papi A, Roche N, et al. Mepolizumab to Prevent Exacerbations of COPD with an Eosinophilic Phenotype. N Engl J Med. 2025;392(17):1710-1720. PMID 40305712; doi:10.1056/NEJMoa2413181. (validated: PubMed)
- [Pavord2017] Pavord ID, Chanez P, Criner GJ, Kerstjens HAM, Korn S, Lugogo N, et al. Mepolizumab for Eosinophilic Chronic Obstructive Pulmonary Disease. N Engl J Med. 2017;377(17):1613-1629. PMID 28893134; doi:10.1056/NEJMoa1708208. (validated: PubMed)
- [Criner2019] Criner GJ, Celli BR, Brightling CE, Agusti A, Papi A, Singh D, et al. Benralizumab for the Prevention of COPD Exacerbations. N Engl J Med. 2019;381(11):1023-1034. PMID 31112385; doi:10.1056/NEJMoa1905248. (validated: PubMed)
- [Lazaar2020] Lazaar AL, Miller BE, Donald AC, Keeley T, Ambery C, Russell J, et al. CXCR2 antagonist for patients with chronic obstructive pulmonary disease with chronic mucus hypersecretion: a phase 2b trial. Respir Res. 2020;21(1):149. PMID 32532258; PMCID PMC7291447; doi:10.1186/s12931-020-01401-4. (validated: PubMed)
- [Han2022RETHINC] Han MK, Ye W, Wang D, White E, Arjomandi M, Barjaktarevic IZ, et al. Bronchodilators in Tobacco-Exposed Persons with Symptoms and Preserved Lung Function. N Engl J Med. 2022;387(13):1173-1184. PMID 36066078; PMCID PMC9741866; doi:10.1056/NEJMoa2204752. (validated: PubMed)
- [Martinez2018] Martinez FJ, Han MK, Allinson JP, Barr RG, Boucher RC, Calverley PMA, et al. At the Root: Defining and Halting Progression of Early Chronic Obstructive Pulmonary Disease. Am J Respir Crit Care Med. 2018;197(12):1540-1551. PMID 29406779; PMCID PMC6006401; doi:10.1164/rccm.201710-2028PP. (validated: PubMed; record only, no abstract and full text not retrieved, cited for the concept only)
- [Han2021] Han MK, Agusti A, Celli BR, Criner GJ, Halpin DMG, Roche N, et al. From GOLD 0 to Pre-COPD. Am J Respir Crit Care Med. 2021;203(4):414-423. PMID 33211970; PMCID PMC7885837; doi:10.1164/rccm.202008-3328PP. (validated: PubMed; record only, no abstract, cited for the concept only)
- [Colak2024] Çolak Y, Lange P, Vestbo J, Nordestgaard BG, Afzal S. Susceptible Young Adults and Development of Chronic Obstructive Pulmonary Disease Later in Life. Am J Respir Crit Care Med. 2024;210(5):607-617. PMID 38364200; doi:10.1164/rccm.202308-1452OC. (validated: PubMed)
- [Bui2018] Bui DS, Lodge CJ, Burgess JA, Lowe AJ, Perret J, Bui MQ, et al. Childhood predictors of lung function trajectories and future COPD risk: a prospective cohort study from the first to the sixth decade of life. Lancet Respir Med. 2018;6(7):535-544. PMID 29628376; doi:10.1016/S2213-2600(18)30100-0. (validated: PubMed)
- [Lange2015] Lange P, Celli B, Agustí A, Boje Jensen G, Divo M, Faner R, et al. Lung-Function Trajectories Leading to Chronic Obstructive Pulmonary Disease. N Engl J Med. 2015;373(2):111-22. PMID 26154786; doi:10.1056/NEJMoa1411532. (validated: PubMed)
- [Agusti2019Trajectories] Agusti A, Faner R. Lung function trajectories in health and disease. Lancet Respir Med. 2019;7(4):358-364. PMID 30765254; doi:10.1016/S2213-2600(18)30529-0. (validated: PubMed)
- [Kotton2014] Kotton DN, Morrisey EE. Lung regeneration: mechanisms, applications and emerging stem cell populations. Nat Med. 2014;20(8):822-32. PMID 25100528; PMCID PMC4229034; doi:10.1038/nm.3642. (validated: PubMed)
- [Wang2024P63] Wang Y, Meng Z, Liu M, Zhou Y, Chen D, Zhao Y, et al. Autologous transplantation of P63+ lung progenitor cells for chronic obstructive pulmonary disease therapy. Sci Transl Med. 2024;16(734):eadi3360. PMID 38354225; doi:10.1126/scitranslmed.adi3360. (validated: PubMed)
- [Weiss2013] Weiss DJ, Casaburi R, Flannery R, LeRoux-Williams M, Tashkin DP. A placebo-controlled, randomized trial of mesenchymal stem cells in COPD. Chest. 2013;143(6):1590-1598. PMID 23172272; PMCID PMC4694112; doi:10.1378/chest.12-2094. (validated: PubMed)
- [Roth2006] Roth MD, Connett JE, D'Armiento JM, Foronjy RF, Friedman PJ, Goldin JG, et al. Feasibility of retinoids for the treatment of emphysema study. Chest. 2006;130(5):1334-45. PMID 17099008; doi:10.1378/chest.130.5.1334. (validated: PubMed)
- [Stolk2012] Stolk J, Stockley RA, Stoel BC, Cooper BG, Piitulainen E, Seersholm N, et al. Randomised controlled trial for emphysema with a selective agonist of the γ-type retinoic acid receptor. Eur Respir J. 2012;40(2):306-12. PMID 22282548; doi:10.1183/09031936.00161911. (validated: PubMed)
- [Chapman2015] Chapman KR, Burdon JG, Piitulainen E, Sandhaus RA, Seersholm N, Stocks JM, et al. Intravenous augmentation treatment and lung density in severe α1 antitrypsin deficiency (RAPID): a randomised, double-blind, placebo-controlled trial. Lancet. 2015;386(9991):360-8. PMID 26026936; doi:10.1016/S0140-6736(15)60860-1. (validated: PubMed)
- [Strnad2022Fazirsiran] Strnad P, Mandorfer M, Choudhury G, Griffiths W, Trautwein C, Loomba R, et al. Fazirsiran for Liver Disease Associated with Alpha(1)-Antitrypsin Deficiency. N Engl J Med. 2022;387(6):514-524. PMID 35748699; doi:10.1056/NEJMoa2205416. (validated: PubMed)
- [Clark2024SEQUOIA] Clark VC, Strange C, Strnad P, Sanchez AJ, Kwo P, Pereira VM, et al. Fazirsiran for Adults With Alpha-1 Antitrypsin Deficiency Liver Disease: A Phase 2 Placebo Controlled Trial (SEQUOIA). Gastroenterology. 2024;167(5):1008-1018.e5. PMID 38964420; doi:10.1053/j.gastro.2024.06.028. (validated: PubMed)
- [Lomas2021] Lomas DA, Irving JA, Arico-Muendel C, Belyanskaya S, Brewster A, Brown M, et al. Development of a small molecule that corrects misfolding and increases secretion of Z α1-antitrypsin. EMBO Mol Med. 2021;13(3):e13167. PMID 33512066; PMCID PMC7933930; doi:10.15252/emmm.202013167. (validated: PubMed)
- [Krooss2027] Krooss SA, Yang T, Yuan Q, Drick N, Sgodda M, Held J, et al. Liver biopsy confirms precise and efficient correction of SERPINA1 after in vivo Base Editing in a Patient with Alpha-1 Antitrypsin Deficiency. J Hepatol. 2027 (epub ahead of print). PMID 42971508; doi:10.1016/j.jhep.2026.09.028. (validated: PubMed)
- [Monian2026] Monian P, Shivalila C, Lu G, Bowman K, Briem S, Bylsma M, et al. RNA editing for the treatment of alpha-1 antitrypsin deficiency. Nucleic Acids Res. 2026;54(2). PMID 41533577; PMCID PMC12802959; doi:10.1093/nar/gkaf1518. (validated: PubMed)
- [Flotte2011] Flotte TR, Trapnell BC, Humphries M, Carey B, Calcedo R, Rouhani F, et al. Phase 2 clinical trial of a recombinant adeno-associated viral vector expressing α1-antitrypsin: interim results. Hum Gene Ther. 2011;22(10):1239-47. PMID 21609134; PMCID PMC3205788; doi:10.1089/hum.2011.053. (validated: PubMed)
- [Mueller2017] Mueller C, Gernoux G, Gruntman AM, Borel F, Reeves EP, Calcedo R, et al. 5 Year Expression and Neutrophil Defect Repair after Gene Therapy in Alpha-1 Antitrypsin Deficiency. Mol Ther. 2017;25(6):1387-1394. PMID 28408179; PMCID PMC5474959; doi:10.1016/j.ymthe.2017.03.029. (validated: PubMed)
- [Wang2016] Wang Z, Bafadhel M, Haldar K, Spivak A, Mayhew D, Miller BE, et al. Lung microbiome dynamics in COPD exacerbations. Eur Respir J. 2016;47(4):1082-92. PMID 26917613; doi:10.1183/13993003.01406-2015. (validated: PubMed)
- [Mayhew2018] Mayhew D, Devos N, Lambert C, Brown JR, Clarke SC, Kim VL, et al. Longitudinal profiling of the lung microbiome in the AERIS study demonstrates repeatability of bacterial and eosinophilic COPD exacerbations. Thorax. 2018;73(5):422-430. PMID 29386298; PMCID PMC5909767; doi:10.1136/thoraxjnl-2017-210408. (validated: PubMed)
- [Agusti2016] Agusti A, Bel E, Thomas M, Vogelmeier C, Brusselle G, Holgate S, et al. Treatable traits: toward precision medicine of chronic airway diseases. Eur Respir J. 2016;47(2):410-9. PMID 26828055; doi:10.1183/13993003.01359-2015. (validated: PubMed)
- [Sarwar2022] Sarwar MR, McDonald VM, Abramson MJ, McLoughlin RF, Geethadevi GM, George J. Effectiveness of Interventions Targeting Treatable Traits for the Management of Obstructive Airway Diseases: A Systematic Review and Meta-Analysis. J Allergy Clin Immunol Pract. 2022;10(9):2333-2345.e21. PMID 35643276; doi:10.1016/j.jaip.2022.05.012. (validated: PubMed)
- [Valipour2020] Valipour A, Fernandez-Bussy S, Ing AJ, Steinfort DP, Snell GI, Williamson JP, et al. Bronchial Rheoplasty for Treatment of Chronic Bronchitis. Twelve-Month Results from a Multicenter Clinical Trial. Am J Respir Crit Care Med. 2020;202(5):681-689. PMID 32407638; PMCID PMC7462406; doi:10.1164/rccm.201908-1546OC. (validated: PubMed)
- [Slebos2019] Slebos DJ, Shah PL, Herth FJF, Pison C, Schumann C, Hübner RH, et al. Safety and Adverse Events after Targeted Lung Denervation for Symptomatic Moderate to Severe Chronic Obstructive Pulmonary Disease (AIRFLOW). A Multicenter Randomized Controlled Clinical Trial. Am J Respir Crit Care Med. 2019;200(12):1477-1486. PMID 31404499; PMCID PMC6909835; doi:10.1164/rccm.201903-0624OC. (validated: PubMed)
- [Criner2026SPRAYCB] Criner GJ, Browning RF, Abu-Hijleh M, Yoneda KY, Strange C, Wahidi MM, et al. Metered-Dose Liquid Nitrogen Cryospray for Chronic Bronchitis: Results From the Prospective, Sham-Controlled Trial (SPRAY-CB). Am J Respir Crit Care Med. 2026 (epub ahead of print). PMID 42768446; doi:10.1093/ajrccm/aamag502. (validated: PubMed)
- [Orton2026] Orton CM, Tonkin J, Chan LT, Tana A, Marc ST, Conway F, et al. Metered cryospray in patients with chronic bronchitis: a mechanistic randomised controlled study. Thorax. 2026 (epub ahead of print). PMID 42448469; doi:10.1136/thorax-2026-224822. (validated: PubMed)
- [Gonzalez2018] González G, Ash SY, Vegas-Sánchez-Ferrero G, Onieva Onieva J, Rahaghi FN, Ross JC, et al. Disease Staging and Prognosis in Smokers Using Deep Learning in Chest Computed Tomography. Am J Respir Crit Care Med. 2018;197(2):193-203. PMID 28892454; PMCID PMC5768902; doi:10.1164/rccm.201705-0860OC. (validated: PubMed)
- [Galban2012] Galbán CJ, Han MK, Boes JL, Chughtai KA, Meyer CR, Johnson TD, et al. Computed tomography-based biomarker provides unique signature for diagnosis of COPD phenotypes and disease progression. Nat Med. 2012;18(11):1711-5. PMID 23042237; PMCID PMC3493851; doi:10.1038/nm.2971. (validated: PubMed)
- [Diaz2023] Diaz AA, Orejas JL, Grumley S, Nath HP, Wang W, Dolliver WR, et al. Airway-Occluding Mucus Plugs and Mortality in Patients With Chronic Obstructive Pulmonary Disease. JAMA. 2023;329(21):1832-1839. PMID 37210745; PMCID PMC10201404; doi:10.1001/jama.2023.2065. (validated: PubMed)
- [Das2023] Das N, Happaerts S, Gyselinck I, Staes M, Derom E, Brusselle G, et al. Collaboration between explainable artificial intelligence and pulmonologists improves the accuracy of pulmonary function test interpretation. Eur Respir J. 2023;61(5):2201720. PMID 37080566; PMCID PMC10196345; doi:10.1183/13993003.01720-2022. (validated: PubMed)
- [Doe2025] Doe G, Banya W, Edwards G, Topalovic M, El-Emir E, Evans RA, et al. AI-Assisted Spirometry Interpretation in Primary Care: A Randomized Controlled Trial. NEJM AI. 2025;2(8):AIoa2400804. PMID 42932578; doi:10.1056/AIoa2400804. (validated: PubMed)
- [FDA-Dupixent] Regeneron/Sanofi. DUPIXENT (dupilumab) injection, prescribing information, section 1.6 Chronic Obstructive Pulmonary Disease. BLA 761055; set id 595f437d-2729-40bb-9c62-c8ece1f82780; label effective 2026-04-22. https://api.fda.gov/drug/label.json?search=set_id:595f437d-2729-40bb-9c62-c8ece1f82780 (validated: openFDA)
- [FDA-Nucala] GlaxoSmithKline. NUCALA (mepolizumab) prescribing information, section 1.3 Chronic Obstructive Pulmonary Disease. set id fefb887c-e4ac-431e-8893-e9d1a5a63fea; label effective 2025-08-06. https://api.fda.gov/drug/label.json?search=set_id:fefb887c-e4ac-431e-8893-e9d1a5a63fea (validated: openFDA)
- [FDA-Ohtuvayre] Verona Pharma (Merck). OHTUVAYRE (ensifentrine) inhalation suspension, prescribing information. NDA 217389, original approval 2024-06-26 (Type 1 new molecular entity); set id e6433c98-41a0-4f99-8f7f-d0e9db6e3f40; label effective 2026-04-23. https://api.fda.gov/drug/drugsfda.json?search=application_number:NDA217389 (validated: openFDA)
- [NCT04701983] Sanofi. Study to Assess the Efficacy, Safety, and Tolerability of SAR440340/REGN3500/Itepekimab in COPD (AERIFY-1). ClinicalTrials.gov NCT04701983; phase 3; completed 2025-08-27; enrollment 1127 actual; results posted. (validated: ClinicalTrials.gov)
- [NCT04751487] Sanofi. Study to Assess the Efficacy, Safety, and Tolerability of SAR440340/REGN3500/Itepekimab in COPD (AERIFY-2). ClinicalTrials.gov NCT04751487; phase 3; completed 2025-08-28; enrollment 1234 actual; results posted. (validated: ClinicalTrials.gov)
- [NCT06208306] Sanofi. A Study to Investigate Long-term Safety and Tolerability of Itepekimab in Participants With COPD (AERIFY-4). ClinicalTrials.gov NCT06208306; phase 3; completed 2026-09-10; enrollment 669 actual. (validated: ClinicalTrials.gov)
- [NCT06883305] AstraZeneca. A Study to Investigate the Efficacy and Safety of Tezepelumab in Adult Participants With Moderate to Very Severe COPD (EMBARK; D5241C00006). ClinicalTrials.gov NCT06883305; phase 3; recruiting; enrollment 990 estimated. (validated: ClinicalTrials.gov)
- [NCT06878261] AstraZeneca. A Study to Investigate the Efficacy and Safety of Tezepelumab in Adult Participants With Moderate to Very Severe COPD (JOURNEY; D5241C00007). ClinicalTrials.gov NCT06878261; phase 3; recruiting; enrollment 990 estimated. (validated: ClinicalTrials.gov)
- [NCT06981078] Upstream Bio. A Study to Assess the Efficacy and Safety of Verekitug in Participants With COPD. ClinicalTrials.gov NCT06981078; phase 2b; active, not recruiting; enrollment 666. (validated: ClinicalTrials.gov)
- [NCT06040086] AstraZeneca. Efficacy and Safety of Tozorakimab in Symptomatic COPD With a History of Exacerbations (MIRANDA). ClinicalTrials.gov NCT06040086; phase 3; completed 2026-05-22; enrollment 1454 actual. (validated: ClinicalTrials.gov)
- [NCT05742802] AstraZeneca. Long-term Efficacy and Safety of Tozorakimab in Participants With COPD With a History of Exacerbations (PROSPERO). ClinicalTrials.gov NCT05742802; phase 3; completed 2026-05-27; enrollment 1713 actual. (validated: ClinicalTrials.gov)
- [NCT04053634] AstraZeneca. Efficacy and Safety of Benralizumab in Moderate to Very Severe COPD With a History of Frequent Exacerbations and Elevated Peripheral Blood Eosinophils (RESOLUTE). ClinicalTrials.gov NCT04053634; phase 3; completed 2025-07-28; enrollment 689. (validated: ClinicalTrials.gov)
- [NCT06959095] GlaxoSmithKline. Depemokimab as an Extended Treatment Duration Biologic in Adults With COPD (ENDURA-1). ClinicalTrials.gov NCT06959095; phase 3; recruiting; enrollment 981 estimated. (validated: ClinicalTrials.gov)
- [NCT06961214] GlaxoSmithKline. Depemokimab as an Extended Treatment Duration Biologic in Adults With COPD and Type 2 Inflammation (ENDURA-2). ClinicalTrials.gov NCT06961214; phase 3; recruiting; enrollment 961 estimated. (validated: ClinicalTrials.gov)
- [NCT07177339] GlaxoSmithKline. Efficacy and Safety of Early Depemokimab Initiation as add-on Treatment in COPD Patients With Type 2 Inflammation (VIGILANT). ClinicalTrials.gov NCT07177339; phase 3; recruiting; enrollment 1196 estimated. (validated: ClinicalTrials.gov)
- [NCT07190209] Sanofi. Efficacy, Safety, and Tolerability Study of Lunsekimig in Adults With Inadequately Controlled COPD Characterized by an Eosinophilic Phenotype (PERSEPHONE). ClinicalTrials.gov NCT07190209; phase 2b/3; recruiting; enrollment 942 estimated. (validated: ClinicalTrials.gov)
- [NCT07190222] Sanofi. Efficacy, Safety, and Tolerability Study of Lunsekimig in Adults With Inadequately Controlled COPD, Characterized by an Eosinophilic Phenotype (THESEUS). ClinicalTrials.gov NCT07190222; phase 3; recruiting; enrollment 942 estimated. (validated: ClinicalTrials.gov)
- [NCT07793409] Sanofi. A Study to Evaluate the Long-term Safety and Efficacy of Lunsekimig in Adults With COPD (COLOSSUS). ClinicalTrials.gov NCT07793409; phase 3; enrolling by invitation; enrollment 1508 estimated. (validated: ClinicalTrials.gov)
- [NCT04636801] Chiesi Farmaceutici. 52-week placebo-controlled study of two doses of CHF6001 DPI (tanimilast) add-on to maintenance triple therapy in COPD and chronic bronchitis (PILASTER). ClinicalTrials.gov NCT04636801; phase 3; terminated (sponsor strategic decision, not safety); enrollment 4710. (validated: ClinicalTrials.gov)
- [NCT04636814] Chiesi Farmaceutici. 52-week placebo- and roflumilast-controlled study of two doses of CHF6001 DPI (tanimilast) add-on to triple therapy in COPD and chronic bronchitis (PILLAR). ClinicalTrials.gov NCT04636814; phase 3; terminated (sponsor strategic decision, not safety); enrollment 3973. (validated: ClinicalTrials.gov)
- [NCT03639051] Nuvaira. Evaluation of the Safety and Efficacy of TLD in Patients with COPD (AIRFLOW-3). ClinicalTrials.gov NCT03639051; device; active, not recruiting; enrollment 464 actual. (validated: ClinicalTrials.gov)
- [NCT04677465] Gala Therapeutics. Clinical Study of the RheOx Bronchial Rheoplasty System in Treating the Symptoms of Chronic Bronchitis (RheSolve). ClinicalTrials.gov NCT04677465; device; status unknown; enrollment 270. (validated: ClinicalTrials.gov)
- [NCT03893370] CSA Medical. RejuvenAir System Trial for COPD With Chronic Bronchitis (SPRAY-CB). ClinicalTrials.gov NCT03893370; device; status unknown; enrollment 210. (validated: ClinicalTrials.gov)
- [NCT05677971] Takeda. Study of fazirsiran in people with liver disease and fibrosis due to an abnormal alpha-1 antitrypsin protein. ClinicalTrials.gov NCT05677971; phase 3; recruiting; enrollment 160 estimated. (validated: ClinicalTrials.gov)
- [NCT06165341] Takeda. Study of fazirsiran in alpha-1 antitrypsin liver disease with mild liver scarring (fibrosis). ClinicalTrials.gov NCT06165341; phase 3; recruiting; enrollment 50 estimated. (validated: ClinicalTrials.gov)
- [NCT06389877] Beam Therapeutics. A Study to Evaluate the Safety and Efficacy of BEAM-302 in Adult Patients With Alpha-1 Antitrypsin Deficiency. ClinicalTrials.gov NCT06389877; phase 1/2; recruiting; enrollment 192 estimated. (validated: ClinicalTrials.gov)
- [NCT06405633] Wave Life Sciences. Phase 1b/2a SAD and MAD study of WVE-006 in participants with AATD Pi*ZZ (RestorAATion-2). ClinicalTrials.gov NCT06405633; phase 1/2; recruiting; enrollment 48 estimated. (validated: ClinicalTrials.gov)
- [NCT07193615] RenJi Hospital. Study of YOLT-202 in the Treatment of Alpha-1 Antitrypsin Deficiency. ClinicalTrials.gov NCT07193615; early phase 1; active, not recruiting; enrollment 18 estimated. (validated: ClinicalTrials.gov)
- [NCT05856331] Sanofi. Study of SAR447537 (INBRX-101) Compared to Plasma-derived A1PI Therapy in Adults With AATD Emphysema (ELEVAATE). ClinicalTrials.gov NCT05856331; phase 2; completed 2025-08-06; enrollment 99 actual. (validated: ClinicalTrials.gov)
- [NCT01983241] Grifols Therapeutics. Efficacy and Safety of Alpha1-Proteinase Inhibitor (Human), Modified Process (Alpha-1 MP) in Subjects With Pulmonary Emphysema Due to AATD (SPARTA). ClinicalTrials.gov NCT01983241; phase 3; completed 2026-07-07; enrollment 345. (validated: ClinicalTrials.gov)
- [NCT04474197] Vertex Pharmaceuticals. Evaluation of the Efficacy and Safety of VX-864 in Subjects With the PiZZ Genotype. ClinicalTrials.gov NCT04474197; phase 2; completed 2021-05-04; enrollment 44; results posted. (validated: ClinicalTrials.gov)
- [NCT05643495] Vertex Pharmaceuticals. A Study to Evaluate Efficacy and Safety of VX-864 in Participants With the PiZZ Genotype. ClinicalTrials.gov NCT05643495; phase 2; terminated (skin and subcutaneous tissue disorders); enrollment 14. (validated: ClinicalTrials.gov)

## Provenance
- Validation: 50 papers confirmed on PubMed (efetch XML for authors, title, journal, volume/issue/pages, PMID, PMCID, DOI, with abstracts read in full). 29 trial registrations confirmed on the ClinicalTrials.gov v2 API. 3 US labels confirmed on openFDA (drug/label for indications and set ids; drugsfda for the Ohtuvayre NDA approval date).
- Posted registry results used directly, with no paper yet: AERIFY-1 and AERIFY-2 primary outcomes (itepekimab), and VX-864 NCT04474197 functional AAT change. These are sponsor-reported and not peer reviewed.
- Recent papers given as epub without volume or pages: Krooss 2027 (J Hepatol, base editing case; record year 2027), Criner 2026 SPRAY-CB (AJRCCM), Orton 2026 (Thorax).
- Not accessible: full texts of Martinez 2018 and Han 2021 (no PubMed abstract; Europe PMC full-text endpoint returned HTTP 500 and PMC efetch returned no body). Their operational definitions of early COPD and pre-COPD are therefore not quoted.
- Not stated because unverified: approval dates of the COPD indications for Dupixent and Nucala (openFDA drugsfda listed supplements without indication detail), and peer-reviewed AERIFY results.
- No results were posted at the pass date for RESOLUTE, SPARTA, ELEVAATE, OBERON/TITANIA (published in NEJM instead), MIRANDA, PROSPERO, AERIFY-4, AIRFLOW-3, RheSolve and SPRAY-CB (published in AJRCCM instead).
- Reuse: Strnad2022Fazirsiran and Clark2024SEQUOIA take their keys and text from cirrhosis/src/sources.json. Shared canonical keys used: Bhatt2023, Bhatt2024, Sciurba2025, Anzueto2023, Lange2015. No other PMID in this pass was found in any companion's sources.json.
