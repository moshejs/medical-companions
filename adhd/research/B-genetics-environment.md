# B · Causes: genetics and environmental risk

Pass date: 2026-10-25. Modules served: genes, risk.

This pass covers what is known about why ADHD develops: twin, family and adoption studies; genome-wide association studies (GWAS); polygenic scores; rare copy number variants (CNVs) and rare coding variants; historical candidate genes; genetic overlap with other conditions; and the main environmental risk factors (preterm birth and low birth weight, prenatal tobacco, alcohol, acetaminophen and valproate, lead, early severe deprivation, traumatic brain injury, relative age in class), with the sibling-comparison and Mendelian-randomisation (MR) studies that shrink or remove many of these associations. It ends with the common myths (sugar, parenting style, vaccines, screen time). Epidemiology, brain mechanisms, diagnosis and treatment are covered by other passes.

Access notes:
- PubMed E-utilities were rate-limited for most of this pass (shared IP, HTTP 429). Every record was first pulled from Europe PMC, then all 66 PMIDs were cross-checked in a single PubMed `esummary` batch: title, journal, year, volume, issue, pages and DOI matched for all 66, so every source line says `(validated: PubMed)`.
- Full texts read: Faraone2019 (open access on nature.com); Demontis2019, Faraone2021, PGCCDG2019 and Uchida2021 (author manuscripts via the NCBI BioC PMC service); Demontis2026 (Europe PMC open-access XML). Everything else is from the abstract.
- The Demontis2023 full text was not reachable (paywall; the medRxiv preprint blocked automated access). Its numbers come from its PubMed abstract, its preprint abstract on Europe PMC (PPR455075; "around seven thousand variants explaining 90% of the SNP heritability"), and Demontis2026's summary of it ("around 7,300 common variants"; common variants explain "14–22%" of liability). The ~14% SNP heritability named in the brief is not stated in any text I could read, so this file gives the 14–22% range as Demontis2026 states it.
- The DRD4 7-repeat pooled odds ratios (Faraone2001DRD4) are not in the abstract. This file says only what the abstract and Faraone2019 say: the association is small but real, and candidate-gene odds ratios are below 1.5.
- The FDA's 2025 action on acetaminophen labelling in pregnancy was not checked against a regulator record and is not cited.

Shared keys checked and cited: Faraone2019 (PMID 29892054), Faraone2021 (33549739), Posner2020 (31982036), Demontis2023 (36702997). Shared keys not cited because I took no facts from them: APA2022DSM, Polanczyk2007, Song2021, Staley2024, Wolraich2019, NICE2018, Cortese2018, MTA1999, Hoogman2017, Kessler2005, Faraone2006, Dalsgaard2015.

## Findings

### genes · How much is inherited: twin studies
- Across 37 twin studies of ADHD diagnosis or symptom counts, mean heritability is 74%. (Established) [[Faraone2019,Faraone2021]]
- Heritability is 70–80% when the same parent or teacher rates both twins. It falls to about 30–40% with self-ratings or a different rater for each twin, and Faraone and Larsson attribute the drop mostly to rater effects and measurement error, not lower genetic influence. [[Faraone2019]]
- The first adult twin studies used self-report and estimated heritability at 30–40%. One study that combined self and parent ratings estimated 80%. [[Faraone2019]]
- In the Swedish Twin Registry (59,514 twins born 1959–2001), heritability of clinically diagnosed ADHD (register diagnosis or ADHD medication) was 0.88 (95% CI 0.83–0.92). In adults it was 0.72 (95% CI 0.56–0.84), and shared environmental effects were non-significant and of minimal importance. [[Larsson2014]]
- Heritability is the share of differences between people in a population that is linked to genetic differences. It does not mean that 74% of one person's ADHD is "caused by genes", and it does not mean the environment cannot matter. Gene–environment interplay is included in the twin estimate. [[Faraone2021,Thapar2013]]

### genes · Families, siblings, offspring and adoption
- In a study of 894 children with ADHD and 1,135 of their siblings aged 5–17, siblings had a ninefold higher risk of ADHD than siblings of control children. [[Faraone2019]]
- Swedish register, 1,656,943 people born 1985–2006 and followed from age 3 to 2009, with 31,865 ADHD diagnoses (male:female ratio 3.7). Birth-year-adjusted hazard ratios (HR) for ADHD in a relative of a person with ADHD:
  - monozygotic twin 70.45
  - dizygotic twin 8.44
  - full sibling 8.27
  - maternal half-sibling 2.86
  - paternal half-sibling 2.31
  - full cousin 2.24
  - half cousin 1.47 [[Chen2017JCPP]]
- In the same cohort, maternal half-siblings had a significantly higher HR than paternal half-siblings. The authors read this as a small contribution from shared environment on top of the genetic effect. [[Chen2017JCPP]]
- Persistence marks stronger familial loading: full siblings of people diagnosed with ADHD at age 18 or older had HR 11.49, against HR 4.68 for siblings of people diagnosed only before 18. [[Chen2017JCPP]]
- Adoption design (25 adopted children with ADHD, 101 non-adopted children with ADHD, 50 controls): 6% of adoptive parents of the adopted children had ADHD, against 18% of the biological parents of the non-adopted children and 3% of the parents of controls. [[Sprich2000]]
- Adoption studies point to genetic rather than shared-environment explanations for family clustering. [[Faraone2019]]
- High-risk offspring design: of 84 children of referred adults with childhood-onset ADHD, 48 (57%) met criteria for ADHD, and 36 of those 48 (75%) had been treated for it. [[Biederman1995]]
- A systematic review of offspring of parents with ADHD found 4 eligible studies. ADHD prevalence in these "high-risk" children ranged from 9.3% to 57% (40–57% after excluding one medical-record study), against 2–20% in comparison children. [[Uchida2021]]
- ADHD is diagnosed 2 to 7 times more often in males than in females. In Swedish registers (77,905 cases, 1,874,637 controls), siblings of affected females had a higher familial risk of ADHD than siblings of affected males (OR 1.14, 95% CI 1.11–1.18). This fits a greater familial risk burden in girls and women who reach diagnosis. [[Martin2018SexBias]]
- Common-variant polygenic scores were not higher in female than in male cases (OR 1.02, 95% CI 0.98–1.06), and common-variant effects were almost fully shared across sexes (rg close to 1). Autosomal common variants therefore do not explain the sex ratio. [[Martin2018SexBias]]
- Females with ADHD in the Swedish data were at especially high risk of co-occurring autism and congenital malformations. [[Martin2018SexBias]]

### genes · Common variants: genome-wide association studies
- Before 2019, GWAS had found no genome-wide-significant variant. Combined earlier samples (2,064 trios, 896 cases, 2,455 controls) were too small. [[Faraone2019]]
- Demontis 2019 (PGC + iPSYCH): 20,183 people with ADHD and 35,191 controls gave the first 12 genome-wide-significant loci, made up of 304 variants at P<5×10⁻⁸. [[Demontis2019]]
- Each risk allele at the 12 index SNPs carries a small odds ratio, from 1.077 to 1.198. [[Demontis2019]]
- Liability-scale SNP heritability (assuming 5% population prevalence) was h²snp = 0.216 (SE 0.014), about one-third of twin heritability. Earlier, smaller studies gave 0.10–0.28. [[Demontis2019,Faraone2019]]
- ADHD risk variants are enriched in evolutionarily constrained regions, loss-of-function-intolerant genes and central-nervous-system regulatory elements (per-SNP heritability enrichment 2.44, SE 0.35). [[Demontis2019]]
- ADHD GWAS results correlate strongly with GWAS of ADHD symptom scores in the general population (rg 0.970 with the EAGLE/QIMR symptom meta-analysis). This supports the view that diagnosed ADHD is the extreme end of a continuous, heritable trait. (Established) [[Demontis2019,Faraone2019]]
- Demontis 2023: 38,691 people with ADHD and 186,843 controls gave 27 genome-wide-significant loci and 76 candidate risk genes. These genes are enriched for expression in early brain development and point to several neuronal subtypes, including midbrain dopaminergic neurons. [[Demontis2023]]
- From the two largest GWAS, common variants explain 14–22% of the variation in liability. About 7,300 common variants account for 90% of the SNP heritability, so ADHD is highly polygenic. [[Demontis2026,Demontis2023]]
- An estimated 84–98% of ADHD-influencing variants are shared with other psychiatric disorders (bivariate Gaussian mixture modelling). [[Demontis2023]]
- Common-variant ADHD risk is associated with weaker complex cognition, including verbal reasoning and several executive functions such as attention. [[Demontis2023]]
- In exome data from 17,896 people, rare protein-truncating variants were more common in ADHD in a set of genes that also carry likely causal common variants. This implicates SORCS3 through both common and rare variants. [[Demontis2023]]

### genes · Polygenic scores (PGS): useful in research, not a diagnostic test
- In iPSYCH, the ADHD polygenic risk score explained at most 5.5% of variance on average (Nagelkerke R²). Cases scored higher than controls (OR 1.56 per SD, 95% CI 1.53–1.60), and odds of ADHD rose with each PRS decile. [[Demontis2019,Faraone2019]]
- A meta-analysis of 12 PGS effect sizes (N=40,088) found a pooled correlation with ADHD of r=0.201 (random effects; 95% CI 0.144–0.288) and r=0.190 (fixed effects; 95% CI 0.180–0.199). That is 3.6–4.0% of the variance in ADHD. [[Li2021PGS]]
- ADHD PGS also predict ADHD symptoms in the general population. People with high ADHD polygenic risk are more likely to have been diagnosed with ADHD, anxiety or depression. [[Faraone2021]]
- Known genetic risks are individually small or rare and raise risk for many conditions, so they "cannot be used for prediction, genetic testing or diagnostic purposes" beyond what a family history already tells you. (Established) [[Thapar2013]]
- The consensus statement says genetic and brain findings help explain causes but are "not useful for diagnosing the disorder". [[Faraone2021]]

### genes · Rare variants: CNVs, protein-truncating and de novo variants
- In 366 children with ADHD and 1,047 controls, large (>500 kb) rare CNVs occurred at a rate of 0.156 against 0.075 in controls. The rate was 0.424 in children with ADHD and intellectual disability and 0.125 in those without. [[Williams2010Lancet]]
- The same study found an excess of 16p13.11 duplications, replicated in an Icelandic sample. The CNVs were enriched for loci already implicated in autism and schizophrenia. [[Williams2010Lancet]]
- In 896 cases and 2,455 controls (IMAGE II), the rate of rare CNVs over 100 kb was 1.15 times higher in ADHD. Rare CNVs over 500 kb showed the greatest enrichment (1.28-fold). [[Williams2012AJP]]
- Duplications at 15q13.3 spanning CHRNA7 had a frequency of 0.6% and an odds ratio for ADHD of 2.22 (95% CI 1.5–3.6). The finding replicated in 2,242 further cases and 8,552 controls, and the duplication appeared to be associated with co-occurring conduct disorder. [[Williams2012AJP]]
- Exome sequencing of about 8,000 children with autism and/or ADHD and 5,000 controls found a similar burden of rare protein-truncating variants (PTVs) in evolutionarily constrained genes in autism and in ADHD, both higher than controls. MAP1A emerged as a shared risk gene. [[Satterstrom2019]]
- Demontis 2026 (exomes of 8,895 people with ADHD and 53,780 controls):
  - rare PTVs were slightly more common in ADHD across all genes (OR 1.06, 95% CI 1.04–1.08) and more so in constrained genes (OR 1.35, 95% CI 1.26–1.45)
  - three genes reached significance: MAP1A, ANO8 and ANK2, with odds ratios of 5.55–15.13 [[Demontis2026]]
- Rare-variant burden heritability was 2.5%. The rare-variant odds ratios are far larger than those of common variants or CNVs, but rare variants explain a small part of overall liability. [[Demontis2026]]
- Carrying one or more damaging rare variants in constrained genes raised ADHD risk by about as much as a 20% increase in common-variant polygenic load. Rare and common effects were additive. [[Demontis2026]]
- Among 962 adults with ADHD, each rare deleterious variant in a constrained gene was associated with 2.25 fewer IQ points (β −2.25, P=0.02). Carriers with ADHD more often had lower education and socioeconomic status. [[Demontis2026]]
- Whole-exome sequencing of 152 parent–child trios found an excess of rare and ultra-rare de novo damaging variants in ADHD. With 3,206 further cases and 5,002 controls, KDM5B was identified as a high-confidence risk gene. The study estimated that 1,057 genes contribute to ADHD risk. [[Olfson2024]]
- Rare genetic syndromes with high rates of ADHD:
  - velo-cardio-facial (22q11.2 deletion) syndrome
  - fragile X syndrome
  - Turner syndrome
  - tuberous sclerosis
  - neurofibromatosis
  - Klinefelter syndrome
  - Williams syndrome [[Faraone2019]]
- In rare cases, ADHD-like symptoms can result from a single genetic abnormality, from extreme early deprivation, or from traumatic brain injury early in life. [[Faraone2021]]

### genes · Candidate genes (historical)
- A meta-analytic review of candidate-gene studies found significant associations for DAT1 (SLC6A3), DRD4, DRD5, 5HTT, HTR1B and SNAP25. Effect sizes varied significantly across studies for most of them. [[Gizer2009]]
- In both child and adult meta-analyses, each candidate-gene association has a small odds ratio, below 1.5. [[Faraone2019]]
- The DRD4 7-repeat allele association held in both case-control and family-based studies, with no single study driving it and no evidence of publication bias. The authors call it "small" but real. [[Faraone2001DRD4]]
- The candidate-gene era was overtaken by GWAS: the first robust genome-wide loci came only from samples of more than 20,000 cases. (Established) [[Demontis2019,Faraone2019]]

### genes · Shared genetics with other conditions and traits
- Of 219 phenotypes tested, 43 showed significant genetic correlation with ADHD (Demontis 2019). Selected genetic correlations (rg):
  - major depressive disorder 0.42
  - depressive symptoms 0.45
  - neuroticism 0.26
  - subjective well-being −0.28 [[Demontis2019]]
- Selected rg for education, cognition and smoking:
  - years of schooling −0.53
  - intelligence −0.41
  - ever smoked 0.48
  - lung cancer 0.39 [[Demontis2019]]
- Selected rg for reproduction and metabolic traits:
  - age at first birth −0.612
  - number of children 0.42
  - childhood obesity 0.22
  - type 2 diabetes 0.18 [[Demontis2019]]
- Twin studies show genetic correlations between ADHD and autism above 0.50. Shared genetic factors explain most of the overlap of ADHD with depression and anxiety. [[Faraone2019]]
- Cross-Disorder Group of the PGC: 232,964 cases and 494,162 controls across 8 disorders. It found 109 loci associated with at least two disorders, 23 of them pleiotropic for four or more. [[PGCCDG2019]]
- In that analysis, ADHD's SNP heritability was 0.222 (SE 0.014). ADHD grouped with autism, Tourette syndrome and depression in an "early-onset neurodevelopmental" genetic factor, and its genetic correlation with major depression was 0.44 (±0.03). [[PGCCDG2019]]
- Across 25 brain disorders (265,218 patients, 784,643 controls), psychiatric disorders share common-variant risk, whereas neurological disorders are more distinct. (Established) [[Brainstorm2018]]
- Two-sample MR results:
  - Education: each doubling of genetic liability to ADHD was associated with 1.7 fewer months of education (95% CI −2.8 to −0.7), independent of cognitive ability.
  - Reverse direction: genetic liability to more education lowered ADHD risk (OR 0.33 per SD, 95% CI 0.26–0.43). (Early evidence) [[Dardani2022]]
- In ALSPAC (N=8,310), ADHD at age 7 predicted recurrent depression at 18–25 (OR 1.35, 95% CI 1.05–1.73). MR suggested a causal effect of ADHD genetic liability on major depression (OR 1.21, 95% CI 1.12–1.31), but only a weak effect on broadly defined depression (OR 1.07, 95% CI 1.02–1.13). (Early evidence) [[Riglin2021]]
- Bidirectional MR found that higher BMI increases ADHD risk (β 0.324 on the ln-odds scale per SD of BMI, 95% CI 0.198–0.449). It found no consistent evidence that ADHD liability raises BMI. (Early evidence) [[MartinsSilva2019]]

### risk · How to read environmental risk evidence
- For most people, ADHD results from many genetic and environmental risks that each have a very small effect and add up. Rarely does one factor cause it. (Established) [[Faraone2021]]
- Because confounding is hard to rule out, the consensus statement calls pre- and postnatal environmental features "correlates" rather than causes. [[Faraone2021]]
- No single risk factor explains ADHD, and inherited and non-inherited factors are interdependent. Calling a cause either "genetic" or "environmental" is "unhelpful and incorrect". [[Thapar2013]]
- The risks found most consistently in 2013 were:
  - an affected biological relative
  - large rare CNVs
  - small-effect candidate variants
  - extreme early adversity
  - lead exposure
  - low birth weight or prematurity

  None was yet known to be definitely causal. [[Thapar2013]]
- Designs that go beyond simple association have begun to contest several environmental risk factors once thought robust: sibling comparison, cousin comparison, paternal negative controls, IVF "cross-fostering" and MR. [[Thapar2013,Rice2009]]
- The Lancet seminar notes that science is beginning to "fundamentally challenge current conceptions of the causes of ADHD". (Hypothesis) [[Posner2020]]
- Umbrella review (35 articles, 63 meta-analyses, 40 environmental factors). Class I ("convincing") associations:
  - maternal pre-pregnancy obesity OR 1.63 (1.49–1.77)
  - childhood eczema OR 1.31 (1.20–1.44)
  - hypertensive disorders of pregnancy OR 1.29 (1.22–1.36)
  - pre-eclampsia OR 1.28 (1.21–1.35)
  - maternal acetaminophen in pregnancy RR 1.25 (1.17–1.34) [[Kim2020LancetPsych]]
- Class II ("highly suggestive") associations in the same review:
  - maternal smoking in pregnancy OR 1.6 (1.45–1.76)
  - childhood asthma OR 1.51 (1.4–1.63)
  - maternal pre-pregnancy overweight OR 1.28 (1.21–1.35)
  - serum vitamin D WMD −6.93 (−9.34 to −4.51)

  The authors note that familial studies suggest the obesity, overweight and smoking associations are confounded by familial or genetic factors. [[Kim2020LancetPsych]]

### risk · Preterm birth and low birth weight
- Meta-analysis of 12 studies (N=1,787): very preterm/very low birth weight and extremely preterm/extremely low birth weight children combined had OR 3.04 for an ADHD diagnosis (95% CI 2.19–4.21) against term, normal-weight controls. [[Franz2018]]
- Odds rose with immaturity: very preterm/very low birth weight OR 2.25 (95% CI 1.56–3.26); extremely preterm/extremely low birth weight OR 4.05 (95% CI 2.38–6.87). [[Franz2018]]
- Across 29 studies (N=3,504), the symptom differences in these children were largest for inattention (SMD 1.31, 95% CI 0.66–1.96). They were smaller for hyperactivity-impulsivity (SMD 0.74) and combined symptoms (SMD 0.55). [[Franz2018]]
- An earlier meta-analysis found that children born preterm had more than twice the relative risk of ADHD (pooled RR 2.64, 95% CI 1.85–3.78). Term-born controls scored 10.9 points higher on cognitive tests (95% CI 9.2–12.5). [[Bhutta2002]]
- Swedish national cohort (1,180,616 children born 1987–2000). Fully adjusted odds of ADHD medication by gestational age, against 39–41 weeks:
  - 23–28 weeks: OR 2.1 (1.4–2.7)
  - 29–32 weeks: OR 1.6 (1.4–1.7)
  - 33–34 weeks: OR 1.4 (1.2–1.7)
  - 35–36 weeks: OR 1.3 (1.1–1.4)
  - 37–38 weeks: OR 1.1 (1.1–1.2) [[Lindstrom2011]]
- A within-mother, between-pregnancy analysis (N=34,334) gave very similar odds ratios, so the preterm effect was not explained by genetic or family confounding. Low maternal education strengthened the effect of moderate (not extreme) preterm birth. [[Lindstrom2011]]
- Finnish register (10,321 cases, 38,355 matched controls): ADHD risk rose with each week less of gestation, including late preterm and early term births. Weight for gestational age showed a U-shaped risk, raised at 1 SD below and 2 SD above the mean. [[Sucksdorff2015]]
- Within twin pairs (21,775 Swedish twins), lower birth weight predicted more ADHD symptoms (total scale β −0.42 per kg, 95% CI −0.53 to −0.30), and this held within identical-twin pairs. One kilogram less birth weight corresponded to almost one point higher on the parent-rated ADHD scale. [[Pettersson2015]]
- A meta-analysis of 85 studies (over 4.6 million births) found a small-to-moderate correlation between low birth weight and ADHD. [[Faraone2021]]
- Preterm birth and fetal growth restriction are among the environmental risks that survive sibling and twin controls. (Established for association; mechanism unclear) [[Lindstrom2011,Pettersson2015]]

### risk · Prenatal tobacco: an association that shrinks with better designs
- Meta-analysis of 12 prospective cohorts (17,304 pregnant women): maternal smoking in pregnancy RR 1.58 for ADHD (95% CI 1.33–1.88). [[He2020JAttenDisord]]
- Three meta-analyses covering more than three million people link prenatal smoking with a more than 50% higher ADHD incidence. The association disappears after adjustment for family history of ADHD. [[Faraone2021]]
- Swedish cohort (813,030 births 1992–2000). Hazard ratios for moderate and high smoking in pregnancy, by level of control:
  - population level: 1.89 and 2.50
  - adjusted for measured confounders: 1.62 and 2.04
  - cousin comparison: 1.45 and 1.69
  - sibling comparison: 0.88 and 0.84 [[Skoglund2014]]
- Danish cohort (968,665 singletons): conventional adjusted HR 2.01 (95% CI 1.94–2.07); sibling analysis HR 1.07 (95% CI 0.94–1.22). In the same sibling design, the link between smoking and low birth weight stayed robust (OR 1.68, 95% CI 1.33–2.12). [[Obel2016]]
- Norwegian MoBa (>100,000 children): maternal smoking in pregnancy was no more strongly associated with ADHD than paternal smoking, the grandmother's smoking when pregnant with the mother, or maternal smoking in an earlier pregnancy. Siblings discordant for exposure did not differ in ADHD symptoms. [[Gustavson2017Smoking]]
- ALSPAC (8,324 children): ADHD symptoms were associated with both maternal (β 0.25, 95% CI 0.18–0.32) and paternal (β 0.21, 95% CI 0.15–0.27) smoking in pregnancy. This pattern points to genetic or household confounding rather than an intrauterine effect. [[Langley2012]]
- In an IVF design where the mother carrying the baby may be genetically unrelated to it, prenatal smoking lowered birth weight whether or not mother and child were related. It was linked to antisocial behaviour only when they were related. The outcome here was antisocial behaviour, not ADHD. [[Rice2009]]
- Danish authors' conclusion: stopping smoking in pregnancy is still recommended for its other harms, "but we have no reason to believe that this would reduce the risk of ADHD in the offspring". [[Obel2016]]

### risk · Prenatal alcohol
- Meta-analysis of low-to-moderate prenatal alcohol (10 studies reviewed, 6 pooled) found no increase in offspring ADHD symptoms:
  - ≤20 g/week: OR 1.01 (0.68–1.49)
  - ≤50 g/week: OR 0.94 (0.85–1.03)
  - ≤70 g/week: OR 0.94 (0.86–1.02) [[SanMartinPorter2019]]
- Heavy exposure is different. Across 26 articles (5,984 people with fetal alcohol spectrum disorder), ADHD occurred in 50% of people with FASD, about 10 times the expected rate. [[Weyrauch2017]]

### risk · Prenatal acetaminophen (paracetamol): a live controversy
- Swedish cohort with sibling control (2,480,797 children born 1995–2019; 7.49% exposed in pregnancy):
  - crude 10-year ADHD risk was 2.46% unexposed and 2.87% exposed
  - without sibling control, HR 1.07 (95% CI 1.05–1.10), risk difference 0.21% [[Ahlqvist2024]]
- In that cohort's matched full-sibling analysis, the ADHD HR was 0.98 (95% CI 0.94–1.02), with no dose-response. The authors conclude the population-level association was probably familial confounding. [[Ahlqvist2024]]
- Hong Kong (708,020 mother–child pairs, about 43.3% exposed): in the sibling-matched ADHD cohort (97,285 children), the adjusted HR was 1.01 (95% CI 0.93–1.08). [[Luo2026JAMAIM]]
- Use before pregnancy, which cannot affect the fetus, served as a negative control and was itself associated with ADHD (HR 1.24, 95% CI 1.20–1.28). The positive signals in conventional analyses are therefore likely residual familial confounding. [[Luo2026JAMAIM]]
- Norwegian MoBa sibling study (26,613 children, 12,902 families): exposure for 29 days or more gave aHR 2.02 (95% CI 1.17–3.25). Between families the aHR was 2.77 (1.48–5.05); within families it was 1.06 (0.51–2.05), consistent with family confounding. [[Gustavson2021APAP]]
- Earlier pooled observational data rated the association "convincing" (RR 1.25, 95% CI 1.17–1.34). That class rests on association strength, not on a causal design. [[Kim2020LancetPsych]]
- A 2021 consensus statement backed by 91 scientists called for precaution. Its advice: avoid acetaminophen in pregnancy unless medically indicated, consult a clinician before long-term use, and use the lowest effective dose for the shortest time. [[Bauer2021]]
- A 2025 Navigation Guide review of 46 studies (27 positive, 9 null, 4 negative associations) concluded the evidence is consistent with an association and advised limiting use. [[Prada2025]]
- Sibling-controlled studies point to no causal effect, while several reviews urge precaution. The question is not settled for all exposure patterns. (Early evidence for causation; association Established) [[Ahlqvist2024,Luo2026JAMAIM,Prada2025]]

### risk · Other prenatal medicines and maternal factors
- Danish cohort (913,302 children): 49 of the 580 children exposed to valproate in pregnancy (8.4%) had ADHD, against 3.2% of unexposed children (aHR 1.48, 95% CI 1.09–2.00). Absolute 15-year risk was 11.0% exposed and 4.6% unexposed. Other antiepileptic drugs showed no association. [[Christensen2019Valproate]]
- Swedish cohort (673,632 people) on maternal pre-pregnancy BMI:
  - population HRs: overweight 1.23 (1.18–1.27), obesity 1.64 (1.57–1.73)
  - full-sibling comparison: overweight 0.98 (0.83–1.16), obesity 1.15 (0.85–1.56), consistent with familial confounding [[Chen2014IJE]]
- Further associations listed by the consensus statement:
  - maternal pre-eclampsia: about 15% higher ADHD likelihood, over 40% when combined with small for gestational age
  - pre-existing maternal type 1 and type 2 diabetes: small increases
  - maternal autoimmune disease: 12% higher likelihood
  - maternal thyroid disease: slight increases [[Faraone2021]]

### risk · Lead and other toxicants
- Meta-analysis of 33 studies (10,232 children and adolescents): lead exposure correlated with inattention (r=0.16, k=27) and with hyperactivity-impulsivity (r=0.13, k=23). Excluding hair-analysis studies, the figures were 0.14 and 0.12. [[Goodlad2013]]
- At population-typical exposure (236 children; mean blood lead 0.73 µg/dL, maximum 2.2 µg/dL), blood lead was associated with combined-type ADHD but not inattentive-type ADHD after controlling for IQ and prenatal smoking. [[Nigg2010Lead]]
- Summary of further lead data:
  - a meta-analysis of 14 studies (>17,000 children) found that higher blood lead was associated with quadrupled odds of ADHD
  - in national survey data, children in the top third of blood lead had 2.3 times the odds of ADHD
  - children in the top fifth had 4 times the odds [[Faraone2021]]
- Lead is among the environmental risks judged most consistent, but it is not proven causal. (Established association) [[Thapar2013]]
- Mothers in the top quintile of phthalate metabolites had children three times more likely to have ADHD than the bottom quintile, after adjustment. (Early evidence) [[Faraone2021]]

### risk · Early severe deprivation (English and Romanian Adoptees study)
- The ERA study followed children who spent up to 43 months in severely depriving Romanian institutions before adoption into UK families. Those with more than 6 months of exposure (n=98 at age 6; n=72 in young adulthood) had persistently higher inattention/overactivity than UK adoptees through ages 22–25. Those with less than 6 months resembled UK controls. [[SonugaBarke2017]]
- A fifth (n=15) of the more-than-6-months group were problem-free at every assessment, showing resilience. [[SonugaBarke2017]]
- ADHD rates by deprivation group (from parent report on DSM-5 criteria):
  - low-deprivation group: 5.6% at age 15 and 3.8% in young adulthood, similar to the general population
  - high-deprivation group: 19% at 15 (nearly 4 times the low-deprivation group) and 29.3% in young adulthood (over 7 times) [[Kennedy2016]]
- Deprivation-related adult ADHD was equally common in males and females and mostly inattentive. It co-occurred with autism features, disinhibited social engagement and callous-unemotional traits. [[Kennedy2016]]

### risk · Traumatic brain injury (TBI)
- Meta-analysis of 24 studies (12,374 children with TBI, 43,491 controls): children had higher ADHD rates before their injury (16.0%, 95% CrI 11.3–21.7%) than the general pediatric incidence (10.8%). Pre-injury ADHD therefore confounds post-injury rates. [[Asarnow2021]]
- In the same meta-analysis, concussion and mild TBI did not significantly raise the odds of later ADHD. Severe TBI did: more than 1 year after injury, OR 6.25 (95% CrI 2.06–15.06) against uninjured children and OR 6.70 (2.02–16.82) against children with other injuries. [[Asarnow2021]]
- Of 5,920 children with severe TBI, 35.5% had ADHD more than 1 year after injury. [[Asarnow2021]]
- Prospective Ohio cohort (187 children injured at age 3–7, no prior ADHD): 25.7% developed secondary ADHD within 5–10 years. [[Narad2018]]
- In that cohort, severe TBI carried HR 3.62 (95% CI 1.59–8.26) against orthopaedic-injury controls. Higher maternal education was protective (HR 0.33), and family dysfunction raised risk within the TBI group (HR 4.24). [[Narad2018]]
- The consensus statement cites a 5-study meta-analysis finding that mild TBI doubled ADHD likelihood. The larger 2021 meta-analysis did not find a significant rise after mild TBI, so the two disagree. [[Faraone2021,Asarnow2021]]

### risk · Relative age in class: who gets diagnosed
- US claims data (407,846 children born 2007–2009) in states with a 1 September kindergarten cutoff:
  - diagnosed ADHD: 85.1 per 10,000 among August-born children against 63.6 per 10,000 among September-born children (difference 21.5 per 10,000, 95% CI 8.8–34.0)
  - ADHD treatment: 52.9 against 40.4 per 10,000 [[Layton2018]]
- In states without a 1 September cutoff, the August–September difference was 8.9 per 10,000 (95% CI −14.9 to 20.8). Asthma, diabetes and obesity did not differ by birth month. [[Layton2018]]
- UK primary-care cohort (1,042,106 children aged 4–15): the youngest quarter of the school year had aHR 1.36 for ADHD diagnosis (95% CI 1.28–1.45) against the oldest quarter, with a graded pattern (second quarter 1.15, third 1.31). [[Root2019]]
- British Columbia (937,943 children aged 6–12; 31 December cutoff), December-born against January-born:
  - boys: diagnosis RR 1.30 (1.23–1.37); medication RR 1.41 (1.33–1.50)
  - girls: diagnosis RR 1.70 (1.53–1.88); medication RR 1.77 (1.57–2.00) [[Morrow2012]]
- A systematic review of 19 studies in 13 countries (over 15.4 million children) found that in 17 of 19 studies the youngest in the class were more likely to be diagnosed or medicated. Denmark showed a weak or no effect, possibly because parents often delay school entry for less mature children ("redshirting"). [[Whitely2019]]
- The relative-age effect shows how judging behaviour against classmates shapes who is diagnosed. It is evidence about diagnosis practice, not about what causes ADHD. (Established) [[Layton2018,Whitely2019]]

### risk · Social and family environment
- Danish registers (over 630,000 youths) show dose-response links between lower parental education, parental unemployment and relative poverty and higher ADHD risk. A Swedish study of over 800,000 people found similar results after adjusting for shared familial/genetic risk. [[Faraone2021]]
- In two adoption designs where the rearing mother is genetically unrelated to the child, maternal hostile parenting was linked with child ADHD symptoms, so passive gene–environment correlation could not explain it. [[Harold2013]]
- In the adoption-at-birth sample, the biological mother's ADHD symptoms predicted the child's early impulsivity, which predicted hostile parenting by the adoptive mother, which in turn predicted later ADHD symptoms. The child's behaviour shapes parenting as well as the reverse (evocative gene–environment correlation). [[Harold2013]]
- Population data link ADHD inattentive type with past sexual abuse and physical neglect after adjustment for family risk factors. [[Faraone2021]]

### risk · Myths and claims with weak or no support
- Sugar: a meta-analysis of 23 double-blind, placebo-controlled challenge studies (16 reports) found that sugar does not affect children's behaviour or cognition. Every mean effect size had a 95% CI including 0 (range −0.14 to +0.30). A small effect, or an effect in subgroups, "cannot be ruled out". (Established) [[Wolraich1995]]
- Parental expectation: 35 boys described as "sugar sensitive" all received placebo (aspartame). Mothers told their son had received sugar rated him as more hyperactive and watched and criticised him more. [[Hoover1994]]
- A meta-analysis of seven studies (over 25,000 youths) found no association between sugar consumption and ADHD. [[Faraone2021]]
- Food colours: parent-rated effects were small:
  - g=0.18 (95% CI 0.08–0.24), falling to 0.12 after adjustment for publication bias
  - teacher/observer ratings: non-significant
  - restriction diets: g=0.29 [[Nigg2012FoodColor]]
- The authors estimated that about 8% of children with ADHD may have symptoms related to synthetic food colours. (Early evidence) [[Nigg2012FoodColor]]
- In a randomised, double-blind crossover trial in the general population, artificial colour/benzoate mix A increased a global hyperactivity score in 3-year-olds (effect size 0.20, 95% CI 0.01–0.39). In 8/9-year-olds who drank at least 85% of the drinks, both mixes had small effects (0.12 and 0.17). (Early evidence) [[McCann2007]]
- Vaccines: in 109,863 UK children, more thimerosal-containing DTP/DT doses by 4 months were not linked to higher risk of attention-deficit disorder. The association ran the other way (HR 0.79 per dose, 95% CI 0.64–0.98). [[Andrews2004]]
- In 1,047 children aged 7–10 given 42 neuropsychological tests, early thimerosal exposure showed only a few small associations, split almost equally between better and worse performance. The study does not support a causal link. [[Thompson2007NEJM]]
- Parenting style as the cause: twin heritability, adoption data and family studies show that ADHD runs in biological families. Shared family environment adds little. Parenting can interact with a child's behaviour but is not the main cause. (Established) [[Larsson2014,Sprich2000,Harold2013]]
- Screen time, prospective cohort: in 2,587 adolescents without ADHD symptoms at baseline, each additional high-frequency digital media activity was associated with higher odds of later ADHD symptoms (adjusted OR 1.10, 95% CI 1.05–1.15). [[Ra2018JAMA]]
- In the same cohort, 4.6% of those with no high-frequency use developed symptoms, against 9.5% with 7 activities and 10.5% with 14. The authors call it modest and not shown to be causal. (Early evidence) [[Ra2018JAMA]]
- Screen-time meta-analysis (9 studies, 81,234 children): ≥2 hours a day against <2 hours gave OR 1.51 (95% CI 1.20–1.90). The included studies are observational. (Early evidence) [[Liu2024ScreenMeta]]
- A two-sample MR study reported ORs of 1.85 (mobile-phone use) and 2.10 (television time) for childhood ADHD. The results were significant only by two of five methods, and the authors call for more research. (Hypothesis) [[Meng2024MR]]

### Exam hooks
- Mean twin heritability of ADHD is 74% (37 twin studies). [[Faraone2019]]
- Register-diagnosed ADHD heritability in Swedish twins: 0.88 overall, 0.72 in adults. [[Larsson2014]]
- Low adult heritability estimates (30–40%) come mostly from self-report and rater effects. [[Faraone2019]]
- Sibling recurrence: a full sibling of a person with ADHD has HR 8.27; an identical co-twin HR 70.45. [[Chen2017JCPP]]
- Adoption study: 18% of biological parents against 6% of adoptive parents of children with ADHD had ADHD. [[Sprich2000]]
- First ADHD GWAS loci: 12 loci, 20,183 cases (2019). Next: 27 loci, 38,691 cases (2023). [[Demontis2019,Demontis2023]]
- SNP heritability ≈ 0.22, about one-third of twin heritability: the "missing heritability". [[Demontis2019,Faraone2019]]
- Polygenic scores explain about 4–5.5% of variance in ADHD and are not a diagnostic test. [[Li2021PGS,Demontis2019,Thapar2013]]
- Rare 15q13.3 (CHRNA7) duplications: OR 2.22 for ADHD; rare-variant genes MAP1A/ANO8/ANK2: OR 5.55–15.13. [[Williams2012AJP,Demontis2026]]
- Historical candidate genes (DAT1, DRD4): odds ratios below 1.5. [[Gizer2009,Faraone2019]]
- Strongest genetic correlations of ADHD: years of schooling −0.53, major depression 0.42, ever smoked 0.48. [[Demontis2019]]
- Very preterm/very low birth weight: OR about 3 for ADHD (3.04); extremely preterm OR 4.05. [[Franz2018]]
- Prenatal smoking: conventional HR about 2; sibling-comparison HR about 1 (familial confounding). [[Skoglund2014,Obel2016]]
- Prenatal acetaminophen: population HR 1.07 to sibling HR 0.98 (Sweden, 2.48 million children). [[Ahlqvist2024]]
- Relative age: in states with a September 1 cutoff, August-born children have 34% more ADHD diagnoses than September-born children (85.1 against 63.6 per 10,000). [[Layton2018]]
- Severe pediatric TBI, more than 1 year later: OR about 6 for ADHD; mild TBI: no significant increase. [[Asarnow2021]]
- ERA study: more than 6 months of early institutional deprivation is linked to adult ADHD in 29.3%. [[Kennedy2016]]
- Sugar does not affect children's behaviour in double-blind trials. [[Wolraich1995]]

### In plain words
- ADHD often runs in families. If one child has ADHD, a brother or sister is several times more likely to have it too. [[Chen2017JCPP]]
- Genes explain much of why some people have ADHD and others do not, but there is no single "ADHD gene". Thousands of small genetic differences add up. [[Demontis2023,Demontis2026]]
- A genetic test cannot diagnose ADHD today. Diagnosis comes from a careful history and assessment. [[Thapar2013,Faraone2021]]
- ADHD is not caused by bad parenting. Family stress can make things harder, and a child's ADHD can also make parenting harder. [[Harold2013,Sprich2000]]
- Sugar does not cause ADHD. When parents believe a child had sugar, they tend to see more hyperactivity even when the child had none. [[Wolraich1995,Hoover1994]]
- Studies of the vaccine preservative thimerosal found no link to ADHD or attention problems. [[Andrews2004,Thompson2007NEJM]]
- Babies born very early or very small have a higher chance of ADHD, so follow-up of preterm children matters. [[Franz2018,Lindstrom2011]]
- Smoking in pregnancy harms babies in many ways. Better studies suggest it is not the main reason ADHD runs in families. [[Obel2016,Skoglund2014]]
- Large studies comparing brothers and sisters found no link between occasional acetaminophen in pregnancy and ADHD. Talk to your clinician about any medicine in pregnancy. [[Ahlqvist2024,Luo2026JAMAIM]]
- The youngest children in a class are diagnosed with ADHD more often. Being younger than classmates can look like ADHD, so age in class should be considered. [[Layton2018,Root2019]]
- Severe head injury in childhood can lead to attention problems, so children should be followed up after a serious injury. [[Asarnow2021]]
- Lead exposure is linked to more ADHD symptoms. Reducing children's exposure to lead is worthwhile. [[Goodlad2013]]
- Girls and women with ADHD tend to carry a higher family load of risk, yet they are diagnosed less often than boys. [[Martin2018SexBias]]

## Numbers for the animations
- relative_HR_by_relatedness | MZ twin | 70.45 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | DZ twin | 8.44 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | full sibling | 8.27 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | maternal half-sibling | 2.86 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | paternal half-sibling | 2.31 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | full cousin | 2.24 | HR | [[Chen2017JCPP]]
- relative_HR_by_relatedness | half cousin | 1.47 | HR | [[Chen2017JCPP]]
- heritability_by_design | twin mean (37 studies) | 74 | % | [[Faraone2019]]
- heritability_by_design | Swedish twins, all ages | 88 | % | [[Larsson2014]]
- heritability_by_design | Swedish twins, adults | 72 | % | [[Larsson2014]]
- heritability_by_design | same-rater parent/teacher, upper | 80 | % | [[Faraone2019]]
- heritability_by_design | self-report adults, lower | 30 | % | [[Faraone2019]]
- heritability_by_design | SNP heritability 2019 GWAS | 21.6 | % | [[Demontis2019]]
- heritability_by_design | rare-variant burden heritability | 2.5 | % | [[Demontis2026]]
- heritability_by_design | PGS variance explained (meta, random) | 4.0 | % | [[Li2021PGS]]
- adoption_parent_ADHD | adoptive parents of adopted ADHD | 6 | % | [[Sprich2000]]
- adoption_parent_ADHD | biological parents of ADHD | 18 | % | [[Sprich2000]]
- adoption_parent_ADHD | parents of controls | 3 | % | [[Sprich2000]]
- gwas_loci_by_year | 2019 (20,183 cases) | 12 | loci | [[Demontis2019]]
- gwas_loci_by_year | 2023 (38,691 cases) | 27 | loci | [[Demontis2023]]
- gwas_cases_by_year | 2019 | 20183 | cases | [[Demontis2019]]
- gwas_cases_by_year | 2023 | 38691 | cases | [[Demontis2023]]
- effect_size_ladder | common SNP, smallest index | 1.077 | OR | [[Demontis2019]]
- effect_size_ladder | common SNP, largest index | 1.198 | OR | [[Demontis2019]]
- effect_size_ladder | rare CNV 15q13.3 dup | 2.22 | OR | [[Williams2012AJP]]
- effect_size_ladder | rare PTV in constrained genes | 1.35 | OR | [[Demontis2026]]
- effect_size_ladder | single rare-variant genes, low | 5.55 | OR | [[Demontis2026]]
- effect_size_ladder | single rare-variant genes, high | 15.13 | OR | [[Demontis2026]]
- genetic_correlation | years of schooling | -0.53 | rg | [[Demontis2019]]
- genetic_correlation | intelligence | -0.41 | rg | [[Demontis2019]]
- genetic_correlation | major depressive disorder | 0.42 | rg | [[Demontis2019]]
- genetic_correlation | ever smoked | 0.48 | rg | [[Demontis2019]]
- genetic_correlation | age at first birth | -0.612 | rg | [[Demontis2019]]
- genetic_correlation | childhood obesity | 0.22 | rg | [[Demontis2019]]
- gestational_age_OR | 23–28 wk | 2.1 | OR | [[Lindstrom2011]]
- gestational_age_OR | 29–32 wk | 1.6 | OR | [[Lindstrom2011]]
- gestational_age_OR | 33–34 wk | 1.4 | OR | [[Lindstrom2011]]
- gestational_age_OR | 35–36 wk | 1.3 | OR | [[Lindstrom2011]]
- gestational_age_OR | 37–38 wk | 1.1 | OR | [[Lindstrom2011]]
- gestational_age_OR | 39–41 wk (reference) | 1.0 | OR | [[Lindstrom2011]]
- prematurity_meta_OR | VP/VLBW | 2.25 | OR | [[Franz2018]]
- prematurity_meta_OR | EP/ELBW | 4.05 | OR | [[Franz2018]]
- smoking_HR_by_design | population, high SDP | 2.50 | HR | [[Skoglund2014]]
- smoking_HR_by_design | measured confounders | 2.04 | HR | [[Skoglund2014]]
- smoking_HR_by_design | cousin comparison | 1.69 | HR | [[Skoglund2014]]
- smoking_HR_by_design | sibling comparison | 0.84 | HR | [[Skoglund2014]]
- smoking_HR_Denmark | conventional | 2.01 | HR | [[Obel2016]]
- smoking_HR_Denmark | sibling | 1.07 | HR | [[Obel2016]]
- acetaminophen_HR_by_design | population model (Sweden) | 1.07 | HR | [[Ahlqvist2024]]
- acetaminophen_HR_by_design | sibling control (Sweden) | 0.98 | HR | [[Ahlqvist2024]]
- acetaminophen_HR_by_design | sibling-matched (Hong Kong) | 1.01 | HR | [[Luo2026JAMAIM]]
- acetaminophen_HR_by_design | pre-pregnancy negative control (Hong Kong) | 1.24 | HR | [[Luo2026JAMAIM]]
- acetaminophen_10y_risk | unexposed | 2.46 | % | [[Ahlqvist2024]]
- acetaminophen_10y_risk | exposed | 2.87 | % | [[Ahlqvist2024]]
- maternal_obesity_HR_by_design | population | 1.64 | HR | [[Chen2014IJE]]
- maternal_obesity_HR_by_design | sibling | 1.15 | HR | [[Chen2014IJE]]
- valproate_15y_risk | unexposed | 4.6 | % | [[Christensen2019Valproate]]
- valproate_15y_risk | exposed | 11.0 | % | [[Christensen2019Valproate]]
- ERA_ADHD_rate | low deprivation, age 15 | 5.6 | % | [[Kennedy2016]]
- ERA_ADHD_rate | low deprivation, young adult | 3.8 | % | [[Kennedy2016]]
- ERA_ADHD_rate | high deprivation, age 15 | 19 | % | [[Kennedy2016]]
- ERA_ADHD_rate | high deprivation, young adult | 29.3 | % | [[Kennedy2016]]
- TBI_ADHD_OR_gt1y_vs_uninjured | mild TBI | 1.07 | OR | [[Asarnow2021]]
- TBI_ADHD_OR_gt1y_vs_uninjured | moderate TBI | 3.67 | OR | [[Asarnow2021]]
- TBI_ADHD_OR_gt1y_vs_uninjured | severe TBI | 6.25 | OR | [[Asarnow2021]]
- relative_age_diagnosis_per10k | August-born (Sept 1 cutoff) | 85.1 | per 10,000 | [[Layton2018]]
- relative_age_diagnosis_per10k | September-born (Sept 1 cutoff) | 63.6 | per 10,000 | [[Layton2018]]
- relative_age_aHR_UK | quarter 1 (oldest, reference) | 1.00 | aHR | [[Root2019]]
- relative_age_aHR_UK | quarter 2 | 1.15 | aHR | [[Root2019]]
- relative_age_aHR_UK | quarter 3 | 1.31 | aHR | [[Root2019]]
- relative_age_aHR_UK | quarter 4 (youngest) | 1.36 | aHR | [[Root2019]]
- relative_age_RR_BC | boys, diagnosis | 1.30 | RR | [[Morrow2012]]
- relative_age_RR_BC | girls, diagnosis | 1.70 | RR | [[Morrow2012]]
- screen_ADHD_symptom_rate | 0 high-frequency activities | 4.6 | % | [[Ra2018JAMA]]
- screen_ADHD_symptom_rate | 7 activities | 9.5 | % | [[Ra2018JAMA]]
- screen_ADHD_symptom_rate | 14 activities | 10.5 | % | [[Ra2018JAMA]]
- umbrella_class_I | maternal pre-pregnancy obesity | 1.63 | OR | [[Kim2020LancetPsych]]
- umbrella_class_I | acetaminophen in pregnancy | 1.25 | RR | [[Kim2020LancetPsych]]
- umbrella_class_I | pre-eclampsia | 1.28 | OR | [[Kim2020LancetPsych]]
- umbrella_class_II | maternal smoking | 1.6 | OR | [[Kim2020LancetPsych]]

## Open questions and controversies
- Prenatal acetaminophen: in sibling-controlled studies from Sweden and Hong Kong, the association disappears (HR 0.98; aHR 1.01) and a pre-pregnancy negative control shows the same signal [[Ahlqvist2024,Luo2026JAMAIM]]. Navigation Guide and consensus authors judge the evidence consistent with harm and advise precaution [[Prada2025,Bauer2021]]. Long-duration exposure was not ruled out in a small sibling sample (within-family aHR 1.06, CI 0.51–2.05) [[Gustavson2021APAP]]. Status: sibling designs favour confounding; precautionary advice persists.
- Prenatal smoking: conventional meta-analysis gives RR 1.58 [[He2020JAttenDisord]]. Sibling, cousin and paternal-comparison designs bring it to about 1.0 [[Skoglund2014,Obel2016,Gustavson2017Smoking,Langley2012]]. Status: most likely familial confounding for ADHD; the harm to birth weight is real.
- Mild TBI: a 5-study meta-analysis cited in the consensus statement reports doubled ADHD odds [[Faraone2021]]. A 24-study Bayesian meta-analysis finds no significant increase after mild TBI and high pre-injury ADHD rates [[Asarnow2021]]. Status: reverse causation (ADHD raises injury risk) is likely part of the signal.
- Missing heritability: twin h² is 74–88% [[Faraone2019,Larsson2014]], but common variants explain 14–22% and rare-variant burden about 2.5% [[Demontis2026]]. Candidate explanations under study: many more rare variants (an estimated 1,057 contributing genes) [[Olfson2024]], gene–environment interplay folded into twin estimates [[Thapar2013]], and rater effects [[Faraone2019]]. Status: open.
- Sex ratio: the male excess is not explained by autosomal common variants [[Martin2018SexBias]]. Siblings of affected females carry higher familial risk, consistent with a higher threshold, and also with under-recognition of girls (Hypothesis) [[Martin2018SexBias]].
- Screen time: observational and meta-analytic associations are modest (adjusted OR 1.10 per activity; OR 1.51 for ≥2 h/day) [[Ra2018JAMA,Liu2024ScreenMeta]]. MR evidence rests on two of five methods [[Meng2024MR]]. Reverse causation (children with ADHD traits seek more screen time) is not excluded. Status: Hypothesis for causation.
- Food colours: small parent-rated effects that shrink after publication-bias correction [[Nigg2012FoodColor]], with a general-population RCT signal [[McCann2007]]. Status: a possible effect in a subset; not a main cause.
- Relative age: the effect appears even in low-prescribing countries [[Whitely2019]]. One reading is overdiagnosis of younger children; another is under-recognition in older children. The data cannot settle which [[Layton2018,Morrow2012]].

## Sources
- [Faraone2019] Faraone SV, Larsson H. Genetics of attention deficit hyperactivity disorder. Mol Psychiatry. 2019;24(4):562-575. PMID 29892054; PMCID PMC6477889; doi:10.1038/s41380-018-0070-0. (validated: PubMed)
- [Faraone2021] Faraone SV, Banaschewski T, Coghill D, Zheng Y, Biederman J, Bellgrove MA, et al. The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder. Neurosci Biobehav Rev. 2021;128:789-818. PMID 33549739; PMCID PMC8328933; doi:10.1016/j.neubiorev.2021.01.022. (validated: PubMed)
- [Posner2020] Posner J, Polanczyk GV, Sonuga-Barke E. Attention-deficit hyperactivity disorder. Lancet. 2020;395(10222):450-462. PMID 31982036; PMCID PMC7880081; doi:10.1016/s0140-6736(19)33004-1. (validated: PubMed)
- [Demontis2023] Demontis D, Walters GB, Athanasiadis G, Walters R, Therrien K, Nielsen TT, et al. Genome-wide analyses of ADHD identify 27 risk loci, refine the genetic architecture and implicate several cognitive domains. Nat Genet. 2023;55(2):198-208. PMID 36702997; PMCID PMC10914347; doi:10.1038/s41588-022-01285-8. (validated: PubMed)
- [Demontis2019] Demontis D, Walters RK, Martin J, Mattheisen M, Als TD, Agerbo E, et al. Discovery of the first genome-wide significant risk loci for attention deficit/hyperactivity disorder. Nat Genet. 2019;51(1):63-75. PMID 30478444; PMCID PMC6481311; doi:10.1038/s41588-018-0269-7. (validated: PubMed)
- [Demontis2026] Demontis D, Duan J, Hsu YH, Pintacuda G, Grove J, Nielsen TT, et al. Rare genetic variants confer a high risk of ADHD and implicate neuronal biology. Nature. 2026;649(8098):909-917. PMID 41224997; PMCID PMC12823435; doi:10.1038/s41586-025-09702-8. (validated: PubMed)
- [Larsson2014] Larsson H, Chang Z, D'Onofrio BM, Lichtenstein P. The heritability of clinically diagnosed attention deficit hyperactivity disorder across the lifespan. Psychol Med. 2014;44(10):2223-2229. PMID 24107258; PMCID PMC4071160; doi:10.1017/s0033291713002493. (validated: PubMed)
- [Chen2017JCPP] Chen Q, Brikell I, Lichtenstein P, Serlachius E, Kuja-Halkola R, Sandin S, et al. Familial aggregation of attention-deficit/hyperactivity disorder. J Child Psychol Psychiatry. 2017;58(3):231-239. PMID 27545745; doi:10.1111/jcpp.12616. (validated: PubMed)
- [Sprich2000] Sprich S, Biederman J, Crawford MH, Mundy E, Faraone SV. Adoptive and biological families of children and adolescents with ADHD. J Am Acad Child Adolesc Psychiatry. 2000;39(11):1432-1437. PMID 11068899; doi:10.1097/00004583-200011000-00018. (validated: PubMed)
- [Biederman1995] Biederman J, Faraone SV, Mick E, Spencer T, Wilens T, Kiely K, et al. High risk for attention deficit hyperactivity disorder among children of parents with childhood onset of the disorder: a pilot study. Am J Psychiatry. 1995;152(3):431-435. PMID 7864271; doi:10.1176/ajp.152.3.431. (validated: PubMed)
- [Uchida2021] Uchida M, Driscoll H, DiSalvo M, Rajalakshmim A, Maiello M, Spera V, et al. Assessing the Magnitude of Risk for ADHD in Offspring of Parents with ADHD: A Systematic Literature Review and Meta-Analysis. J Atten Disord. 2021;25(13):1943-1948. PMID 32830611; PMCID PMC8051515; doi:10.1177/1087054720950815. (validated: PubMed)
- [Li2021PGS] Li JJ, He Q. Polygenic Scores for ADHD: A Meta-Analysis. Res Child Adolesc Psychopathol. 2021;49(3):297-310. PMID 33492530; doi:10.1007/s10802-021-00774-4. (validated: PubMed)
- [Satterstrom2019] Satterstrom FK, Walters RK, Singh T, Wigdor EM, Lescai F, Demontis D, et al. Autism spectrum disorder and attention deficit hyperactivity disorder have a similar burden of rare protein-truncating variants. Nat Neurosci. 2019;22(12):1961-1965. PMID 31768057; PMCID PMC6884695; doi:10.1038/s41593-019-0527-8. (validated: PubMed)
- [Williams2010Lancet] Williams NM, Zaharieva I, Martin A, Langley K, Mantripragada K, Fossdal R, et al. Rare chromosomal deletions and duplications in attention-deficit hyperactivity disorder: a genome-wide analysis. Lancet. 2010;376(9750):1401-1408. PMID 20888040; PMCID PMC2965350; doi:10.1016/s0140-6736(10)61109-9. (validated: PubMed)
- [Williams2012AJP] Williams NM, Franke B, Mick E, Anney RJ, Freitag CM, Gill M, et al. Genome-wide analysis of copy number variants in attention deficit hyperactivity disorder: the role of rare variants and duplications at 15q13.3. Am J Psychiatry. 2012;169(2):195-204. PMID 22420048; PMCID PMC3601405; doi:10.1176/appi.ajp.2011.11060822. (validated: PubMed)
- [Olfson2024] Olfson E, Farhat LC, Liu W, Vitulano LA, Zai G, Lima MO, et al. Rare de novo damaging DNA variants are enriched in attention-deficit/hyperactivity disorder and implicate risk genes. Nat Commun. 2024;15(1):5870. PMID 38997333; PMCID PMC11245598; doi:10.1038/s41467-024-50247-7. (validated: PubMed)
- [Gizer2009] Gizer IR, Ficks C, Waldman ID. Candidate gene studies of ADHD: a meta-analytic review. Hum Genet. 2009;126(1):51-90. PMID 19506906; doi:10.1007/s00439-009-0694-x. (validated: PubMed)
- [Faraone2001DRD4] Faraone SV, Doyle AE, Mick E, Biederman J. Meta-analysis of the association between the 7-repeat allele of the dopamine D(4) receptor gene and attention deficit hyperactivity disorder. Am J Psychiatry. 2001;158(7):1052-1057. PMID 11431226; doi:10.1176/appi.ajp.158.7.1052. (validated: PubMed)
- [PGCCDG2019] Cross-Disorder Group of the Psychiatric Genomics Consortium. Genomic Relationships, Novel Loci, and Pleiotropic Mechanisms across Eight Psychiatric Disorders. Cell. 2019;179(7):1469-1482.e11. PMID 31835028; PMCID PMC7077032; doi:10.1016/j.cell.2019.11.020. (validated: PubMed)
- [Brainstorm2018] Brainstorm Consortium, Anttila V, Bulik-Sullivan B, Finucane HK, Walters RK, Bras J, et al. Analysis of shared heritability in common disorders of the brain. Science. 2018;360(6395):eaap8757. PMID 29930110; PMCID PMC6097237; doi:10.1126/science.aap8757. (validated: PubMed)
- [Martin2018SexBias] Martin J, Walters RK, Demontis D, Mattheisen M, Lee SH, Robinson E, et al. A Genetic Investigation of Sex Bias in the Prevalence of Attention-Deficit/Hyperactivity Disorder. Biol Psychiatry. 2018;83(12):1044-1053. PMID 29325848; PMCID PMC5992329; doi:10.1016/j.biopsych.2017.11.026. (validated: PubMed)
- [Dardani2022] Dardani C, Riglin L, Leppert B, Sanderson E, Rai D, Howe LD, et al. Is genetic liability to ADHD and ASD causally linked to educational attainment? Int J Epidemiol. 2022;50(6):2011-2023. PMID 34999873; PMCID PMC8743131; doi:10.1093/ije/dyab107. (validated: PubMed)
- [Riglin2021] Riglin L, Leppert B, Dardani C, Thapar AK, Rice F, O'Donovan MC, et al. ADHD and depression: investigating a causal explanation. Psychol Med. 2021;51(11):1890-1897. PMID 32249726; PMCID PMC8381237; doi:10.1017/s0033291720000665. (validated: PubMed)
- [MartinsSilva2019] Martins-Silva T, Vaz JDS, Hutz MH, Salatino-Oliveira A, Genro JP, Hartwig FP, et al. Assessing causality in the association between attention-deficit/hyperactivity disorder and obesity: a Mendelian randomization study. Int J Obes (Lond). 2019;43(12):2500-2508. PMID 31000774; doi:10.1038/s41366-019-0346-8. (validated: PubMed)
- [Thapar2013] Thapar A, Cooper M, Eyre O, Langley K. What have we learnt about the causes of ADHD? J Child Psychol Psychiatry. 2013;54(1):3-16. PMID 22963644; PMCID PMC3572580; doi:10.1111/j.1469-7610.2012.02611.x. (validated: PubMed)
- [Kim2020LancetPsych] Kim JH, Kim JY, Lee J, Jeong GH, Lee E, Lee S, et al. Environmental risk factors, protective factors, and peripheral biomarkers for ADHD: an umbrella review. Lancet Psychiatry. 2020;7(11):955-970. PMID 33069318; doi:10.1016/s2215-0366(20)30312-6. (validated: PubMed)
- [Franz2018] Franz AP, Bolat GU, Bolat H, Matijasevich A, Santos IS, Silveira RC, et al. Attention-Deficit/Hyperactivity Disorder and Very Preterm/Very Low Birth Weight: A Meta-analysis. Pediatrics. 2018;141(1):e20171645. PMID 29255083; doi:10.1542/peds.2017-1645. (validated: PubMed)
- [Bhutta2002] Bhutta AT, Cleves MA, Casey PH, Cradock MM, Anand KJ. Cognitive and behavioral outcomes of school-aged children who were born preterm: a meta-analysis. JAMA. 2002;288(6):728-737. PMID 12169077; doi:10.1001/jama.288.6.728. (validated: PubMed)
- [Lindstrom2011] Lindström K, Lindblad F, Hjern A. Preterm birth and attention-deficit/hyperactivity disorder in schoolchildren. Pediatrics. 2011;127(5):858-865. PMID 21502231; doi:10.1542/peds.2010-1279. (validated: PubMed)
- [Sucksdorff2015] Sucksdorff M, Lehtonen L, Chudal R, Suominen A, Joelsson P, Gissler M, et al. Preterm Birth and Poor Fetal Growth as Risk Factors of Attention-Deficit/Hyperactivity Disorder. Pediatrics. 2015;136(3):e599-608. PMID 26304830; doi:10.1542/peds.2015-1043. (validated: PubMed)
- [Pettersson2015] Pettersson E, Sjölander A, Almqvist C, Anckarsäter H, D'Onofrio BM, Lichtenstein P, et al. Birth weight as an independent predictor of ADHD symptoms: a within-twin pair analysis. J Child Psychol Psychiatry. 2015;56(4):453-459. PMID 25040291; PMCID PMC4295006; doi:10.1111/jcpp.12299. (validated: PubMed)
- [He2020JAttenDisord] He Y, Chen J, Zhu LH, Hua LL, Ke FF. Maternal Smoking During Pregnancy and ADHD: Results From a Systematic Review and Meta-Analysis of Prospective Cohort Studies. J Atten Disord. 2020;24(12):1637-1647. PMID 29039728; doi:10.1177/1087054717696766. (validated: PubMed)
- [Skoglund2014] Skoglund C, Chen Q, D'Onofrio BM, Lichtenstein P, Larsson H. Familial confounding of the association between maternal smoking during pregnancy and ADHD in offspring. J Child Psychol Psychiatry. 2014;55(1):61-68. PMID 25359172; PMCID PMC4217138; doi:10.1111/jcpp.12124. (validated: PubMed)
- [Obel2016] Obel C, Zhu JL, Olsen J, Breining S, Li J, Grønborg TK, et al. The risk of attention deficit hyperactivity disorder in children exposed to maternal smoking during pregnancy - a re-examination using a sibling design. J Child Psychol Psychiatry. 2016;57(4):532-537. PMID 26511313; doi:10.1111/jcpp.12478. (validated: PubMed)
- [Gustavson2017Smoking] Gustavson K, Ystrom E, Stoltenberg C, Susser E, Surén P, Magnus P, et al. Smoking in Pregnancy and Child ADHD. Pediatrics. 2017;139(2):e20162509. PMID 28138005; PMCID PMC5260151; doi:10.1542/peds.2016-2509. (validated: PubMed)
- [Langley2012] Langley K, Heron J, Smith GD, Thapar A. Maternal and paternal smoking during pregnancy and risk of ADHD symptoms in offspring: testing for intrauterine effects. Am J Epidemiol. 2012;176(3):261-268. PMID 22791738; PMCID PMC3406617; doi:10.1093/aje/kwr510. (validated: PubMed)
- [Rice2009] Rice F, Harold GT, Boivin J, Hay DF, van den Bree M, Thapar A. Disentangling prenatal and inherited influences in humans with an experimental design. Proc Natl Acad Sci U S A. 2009;106(7):2464-2467. PMID 19188591; PMCID PMC2634805; doi:10.1073/pnas.0808798106. (validated: PubMed)
- [SanMartinPorter2019] San Martin Porter M, Maravilla JC, Betts KS, Alati R. Low-moderate prenatal alcohol exposure and offspring attention-deficit hyperactivity disorder (ADHD): systematic review and meta-analysis. Arch Gynecol Obstet. 2019;300(2):269-277. PMID 31161393; doi:10.1007/s00404-019-05204-x. (validated: PubMed)
- [Weyrauch2017] Weyrauch D, Schwartz M, Hart B, Klug MG, Burd L. Comorbid Mental Disorders in Fetal Alcohol Spectrum Disorders: A Systematic Review. J Dev Behav Pediatr. 2017;38(4):283-291. PMID 28460370; doi:10.1097/dbp.0000000000000440. (validated: PubMed)
- [Ahlqvist2024] Ahlqvist VH, Sjöqvist H, Dalman C, Karlsson H, Stephansson O, Johansson S, et al. Acetaminophen Use During Pregnancy and Children's Risk of Autism, ADHD, and Intellectual Disability. JAMA. 2024;331(14):1205-1214. PMID 38592388; PMCID PMC11004836; doi:10.1001/jama.2024.3172. (validated: PubMed)
- [Luo2026JAMAIM] Luo S, Gong Q, Ai Y, Zhang J, Chan L, Wong WCW, et al. Prenatal Acetaminophen (Paracetamol) Use and the Risk of Autism and/or Attention-Deficit/Hyperactivity Disorder Among Sibling-Matched Cohorts. JAMA Intern Med. 2026;186(9):1102-1111. PMID 42371637; doi:10.1001/jamainternmed.2026.2215. (validated: PubMed)
- [Gustavson2021APAP] Gustavson K, Ystrom E, Ask H, Ask Torvik F, Hornig M, Susser E, et al. Acetaminophen use during pregnancy and offspring attention deficit hyperactivity disorder - a longitudinal sibling control study. JCPP Adv. 2021;1(2):e12020. PMID 37431475; PMCID PMC10242945; doi:10.1002/jcv2.12020. (validated: PubMed)
- [Prada2025] Prada D, Ritz B, Bauer AZ, Baccarelli AA. Evaluation of the evidence on acetaminophen use and neurodevelopmental disorders using the Navigation Guide methodology. Environ Health. 2025;24(1):56. PMID 40804730; PMCID PMC12351903; doi:10.1186/s12940-025-01208-0. (validated: PubMed)
- [Bauer2021] Bauer AZ, Swan SH, Kriebel D, Liew Z, Taylor HS, Bornehag CG, et al. Paracetamol use during pregnancy - a call for precautionary action. Nat Rev Endocrinol. 2021;17(12):757-766. PMID 34556849; PMCID PMC8580820; doi:10.1038/s41574-021-00553-7. (validated: PubMed)
- [Goodlad2013] Goodlad JK, Marcus DK, Fulton JJ. Lead and Attention-Deficit/Hyperactivity Disorder (ADHD) symptoms: a meta-analysis. Clin Psychol Rev. 2013;33(3):417-425. PMID 23419800; doi:10.1016/j.cpr.2013.01.009. (validated: PubMed)
- [Nigg2010Lead] Nigg JT, Nikolas M, Mark Knottnerus G, Cavanagh K, Friderici K. Confirmation and extension of association of blood lead with attention-deficit/hyperactivity disorder (ADHD) and ADHD symptom domains at population-typical exposure levels. J Child Psychol Psychiatry. 2010;51(1):58-65. PMID 19941632; PMCID PMC2810427; doi:10.1111/j.1469-7610.2009.02135.x. (validated: PubMed)
- [SonugaBarke2017] Sonuga-Barke EJS, Kennedy M, Kumsta R, Knights N, Golm D, Rutter M, et al. Child-to-adult neurodevelopmental and mental health trajectories after early life deprivation: the young adult follow-up of the longitudinal English and Romanian Adoptees study. Lancet. 2017;389(10078):1539-1548. PMID 28237264; doi:10.1016/s0140-6736(17)30045-4. (validated: PubMed)
- [Kennedy2016] Kennedy M, Kreppner J, Knights N, Kumsta R, Maughan B, Golm D, et al. Early severe institutional deprivation is associated with a persistent variant of adult attention-deficit/hyperactivity disorder: clinical presentation, developmental continuities and life circumstances in the English and Romanian Adoptees study. J Child Psychol Psychiatry. 2016;57(10):1113-1125. PMID 27264475; PMCID PMC5042050; doi:10.1111/jcpp.12576. (validated: PubMed)
- [Asarnow2021] Asarnow RF, Newman N, Weiss RE, Su E. Association of Attention-Deficit/Hyperactivity Disorder Diagnoses With Pediatric Traumatic Brain Injury: A Meta-analysis. JAMA Pediatr. 2021;175(10):1009-1016. PMID 34251435; PMCID PMC8276124; doi:10.1001/jamapediatrics.2021.2033. (validated: PubMed)
- [Narad2018] Narad ME, Kennelly M, Zhang N, Wade SL, Yeates KO, Taylor HG, et al. Secondary Attention-Deficit/Hyperactivity Disorder in Children and Adolescents 5 to 10 Years After Traumatic Brain Injury. JAMA Pediatr. 2018;172(5):437-443. PMID 29554197; PMCID PMC5875309; doi:10.1001/jamapediatrics.2017.5746. (validated: PubMed)
- [Layton2018] Layton TJ, Barnett ML, Hicks TR, Jena AB. Attention Deficit-Hyperactivity Disorder and Month of School Enrollment. N Engl J Med. 2018;379(22):2122-2130. PMID 30485780; PMCID PMC6322209; doi:10.1056/nejmoa1806828. (validated: PubMed)
- [Root2019] Root A, Brown JP, Forbes HJ, Bhaskaran K, Hayes J, Smeeth L, et al. Association of Relative Age in the School Year With Diagnosis of Intellectual Disability, Attention-Deficit/Hyperactivity Disorder, and Depression. JAMA Pediatr. 2019;173(11):1068-1075. PMID 31545342; PMCID PMC6763997; doi:10.1001/jamapediatrics.2019.3194. (validated: PubMed)
- [Whitely2019] Whitely M, Raven M, Timimi S, Jureidini J, Phillimore J, Leo J, et al. Attention deficit hyperactivity disorder late birthdate effect common in both high and low prescribing international jurisdictions: a systematic review. J Child Psychol Psychiatry. 2019;60(4):380-391. PMID 30317644; PMCID PMC7379308; doi:10.1111/jcpp.12991. (validated: PubMed)
- [Morrow2012] Morrow RL, Garland EJ, Wright JM, Maclure M, Taylor S, Dormuth CR. Influence of relative age on diagnosis and treatment of attention-deficit/hyperactivity disorder in children. CMAJ. 2012;184(7):755-762. PMID 22392937; PMCID PMC3328520; doi:10.1503/cmaj.111619. (validated: PubMed)
- [Wolraich1995] Wolraich ML, Wilson DB, White JW. The effect of sugar on behavior or cognition in children. A meta-analysis. JAMA. 1995;274(20):1617-1621. PMID 7474248; doi:10.1001/jama.1995.03530200053037. (validated: PubMed)
- [Hoover1994] Hoover DW, Milich R. Effects of sugar ingestion expectancies on mother-child interactions. J Abnorm Child Psychol. 1994;22(4):501-515. PMID 7963081; doi:10.1007/bf02168088. (validated: PubMed)
- [Harold2013] Harold GT, Leve LD, Barrett D, Elam K, Neiderhiser JM, Natsuaki MN, et al. Biological and rearing mother influences on child ADHD symptoms: revisiting the developmental interface between nature and nurture. J Child Psychol Psychiatry. 2013;54(10):1038-1046. PMID 24007415; PMCID PMC3767192; doi:10.1111/jcpp.12100. (validated: PubMed)
- [Thompson2007NEJM] Thompson WW, Price C, Goodson B, Shay DK, Benson P, Hinrichsen VL, et al. Early thimerosal exposure and neuropsychological outcomes at 7 to 10 years. N Engl J Med. 2007;357(13):1281-1292. PMID 17898097; doi:10.1056/nejmoa071434. (validated: PubMed)
- [Andrews2004] Andrews N, Miller E, Grant A, Stowe J, Osborne V, Taylor B. Thimerosal exposure in infants and developmental disorders: a retrospective cohort study in the United kingdom does not support a causal association. Pediatrics. 2004;114(3):584-591. PMID 15342825; doi:10.1542/peds.2003-1177-l. (validated: PubMed)
- [Ra2018JAMA] Ra CK, Cho J, Stone MD, De La Cerda J, Goldenson NI, Moroney E, et al. Association of Digital Media Use With Subsequent Symptoms of Attention-Deficit/Hyperactivity Disorder Among Adolescents. JAMA. 2018;320(3):255-263. PMID 30027248; PMCID PMC6553065; doi:10.1001/jama.2018.8931. (validated: PubMed)
- [Liu2024ScreenMeta] Liu H, Chen X, Huang M, Yu X, Gan Y, Wang J, et al. Screen time and childhood attention deficit hyperactivity disorder: a meta-analysis. Rev Environ Health. 2024;39(4):643-650. PMID 37163581; doi:10.1515/reveh-2022-0262. (validated: PubMed)
- [Meng2024MR] Meng Z, Ao B, Wang W, Niu T, Chen Y, Ma X, et al. Relationships between screen time and childhood attention deficit hyperactivity disorder: a Mendelian randomization study. Front Psychiatry. 2024;15:1441191. PMID 39376970; PMCID PMC11457377; doi:10.3389/fpsyt.2024.1441191. (validated: PubMed)
- [Nigg2012FoodColor] Nigg JT, Lewis K, Edinger T, Falk M. Meta-analysis of attention-deficit/hyperactivity disorder or attention-deficit/hyperactivity disorder symptoms, restriction diet, and synthetic food color additives. J Am Acad Child Adolesc Psychiatry. 2012;51(1):86-97.e8. PMID 22176942; PMCID PMC4321798; doi:10.1016/j.jaac.2011.10.015. (validated: PubMed)
- [McCann2007] McCann D, Barrett A, Cooper A, Crumpler D, Dalen L, Grimshaw K, et al. Food additives and hyperactive behaviour in 3-year-old and 8/9-year-old children in the community: a randomised, double-blinded, placebo-controlled trial. Lancet. 2007;370(9598):1560-1567. PMID 17825405; doi:10.1016/s0140-6736(07)61306-3. (validated: PubMed)
- [Christensen2019Valproate] Christensen J, Pedersen L, Sun Y, Dreier JW, Brikell I, Dalsgaard S. Association of Prenatal Exposure to Valproate and Other Antiepileptic Drugs With Risk for Attention-Deficit/Hyperactivity Disorder in Offspring. JAMA Netw Open. 2019;2(1):e186606. PMID 30646190; PMCID PMC6324310; doi:10.1001/jamanetworkopen.2018.6606. (validated: PubMed)
- [Chen2014IJE] Chen Q, Sjölander A, Långström N, Rodriguez A, Serlachius E, D'Onofrio BM, et al. Maternal pre-pregnancy body mass index and offspring attention deficit hyperactivity disorder: a population-based cohort study using a sibling-comparison design. Int J Epidemiol. 2014;43(1):83-90. PMID 24058000; PMCID PMC3937971; doi:10.1093/ije/dyt152. (validated: PubMed)

## Provenance
- All 66 sources were found and read through Europe PMC (abstracts, plus full text where noted in the access notes), then confirmed in one PubMed E-utilities `esummary` batch. For every record the PMID resolved, and the title, journal, year, volume, issue, pages and DOI matched, so every line says `(validated: PubMed)`.
- No source is unverified, and no facts are marked (unverified).
- Full texts read: Faraone2019 (nature.com open access); Demontis2019, Faraone2021, PGCCDG2019 and Uchida2021 (NCBI BioC PMC author manuscripts); Demontis2026 (Europe PMC open-access XML). All other facts come from PubMed/Europe PMC abstracts.
- Not accessible: the Demontis2023 full text (paywall; medRxiv preprint PPR455075 blocked automated access, but its abstract was read on Europe PMC); PMC web pages (reCAPTCHA); Popova 2016 Lancet FASD comorbidity full text, so FASD figures use Weyrauch2017 instead.
- Dropped because the abstract gives no figure:
  - the DRD4 7-repeat pooled odds ratios (Faraone2001DRD4 is cited only for the abstract's qualitative conclusion)
  - Popova 2016 FASD ADHD prevalence
  - an MR study of maternal smoking (Xie 2024) disputed in a published comment
- The ~14% SNP heritability and "~7,000 variants" in the brief are reported as Demontis2026 and the Demontis2023 preprint abstract state them: 14–22%; about 7,300 / "around seven thousand".
- Faraone2021 statements are quoted as summaries of the meta-analyses it curates. Where it disagrees with a primary study (mild TBI), both are given.
