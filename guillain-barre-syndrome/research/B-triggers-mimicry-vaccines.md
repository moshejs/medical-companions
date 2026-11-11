# B · Triggers, vaccines and molecular mimicry

Pass date: 2026-11-09. Modules served: triggers, mimicry, vaccines.

This pass covers what sets Guillain-Barré syndrome (GBS) off: antecedent infections and their shares, the absolute risk of GBS after each infection, host and genetic factors, non-infectious triggers (surgery, cancer, checkpoint inhibitors), the molecular-mimicry mechanism from *Campylobacter jejuni* lipo-oligosaccharide to anti-ganglioside antibody to complement injury at the node of Ranvier, the animal models that established it, and the vaccine-safety literature from the 1976 swine-influenza campaign to the 2024–2025 RSV vaccine signal. Every absolute risk is given with its exposure denominator so the icon-array can put infection and vaccination side by side.

Access notes:
- Vaccine labels are regulated by FDA's CBER and are **not** in the openFDA `drug/label` endpoint (queries for Abrysvo, Arexvy and "respiratory syncytial virus vaccine" all return `NOT_FOUND`). The RSV label warning is therefore validated against FDA's own safety-communication page, cited as `FDA-RSVGBS2025`.
- Numbers for Hanson 2022 are taken from the PubMed abstract, which is truncated at the direct Ad26-versus-mRNA rate ratio; that one comparison is therefore not quoted.
- Two brief items were corrected against the record: the brief's "Mycoplasma" paper at PMID 11026446 is in fact Ogawara 2000 on axonal GBS and anti-ganglioside antibodies (kept as `Ogawara2000`), and the frequently cited Vellozzi "~1–2 per million" figure is a narrative review conclusion (`Vellozzi2014CID`), with the hard numbers coming from Salmon 2013 and Kwong 2013.
- I found no validated source giving a *vaccine-specific* GBS risk for mRNA COVID-19 vaccines above background; the two large studies found none, which is reported as such.
- Shared canonical keys checked and correct as given: Leonhard2019 (PMID 31541214), vanDoorn2023 (37814552), Shahrizaila2021 (33647239), Willison2016 (26948435), Yuki2012 (22694000), Doets2018 (30247567), Sejvar2011 (21422765), Sejvar2011Brighton (20600491).

## Findings

### triggers · How often an infection comes first, and how long before

- About two-thirds of people who develop GBS report symptoms of an infection in the six weeks before onset; these infections are thought to trigger the immune response that causes GBS [[Leonhard2019]].
- GBS "is preceded by upper respiratory or gastrointestinal infection in about two-thirds of cases" [[Vellozzi2014CID]].
- In the IGOS-1000 cohort, symptoms of an antecedent infection were reported by 556 of 768 patients (72%); the proportion did not differ significantly between those who tested positive and those who tested negative on serology, so reported symptoms and laboratory evidence often disagree [[Leonhard2022IGOS]].
- In the IGOS comparison cohort used by the UK vaccine-surveillance study, 502 of 652 patients (77%) reported an antecedent infection [[Tamborska2022]].
- The typical latency from infection to first neurological symptom is 1–2 weeks: GBS "occurs 1–2 wk after various infections, in particular, *Campylobacter jejuni* enteritis" [[Yuki2004]].
- In the Zika-associated outbreak in French Polynesia, 37 of 42 patients (88%) had a transient illness a median of 6 days (IQR 4–10) before neurological onset — the shortest well-documented interval for any GBS trigger [[CaoLormeau2016]].
- Six pathogens have been temporally associated with GBS in case-control studies: *C. jejuni*, cytomegalovirus (CMV), hepatitis E virus (HEV), *Mycoplasma pneumoniae*, Epstein–Barr virus (EBV) and Zika virus. Other pathogens are linked only through case series or ecological studies and their causal role is uncertain [[Leonhard2019]].
- The absence of an antecedent illness does not exclude GBS [[Leonhard2019]]. The EAN/PNS guideline puts it the other way round as a good practice point: GBS is *more likely* if there is a history of recent diarrhoea or respiratory infection [[vanDoorn2023]].
- Most patients in the large treatment-trial cohort had **no** identified infection on serology, which is why a negative work-up cannot be used against the diagnosis [[Hadden2001]].

### triggers · Campylobacter jejuni: share of cases

- Case-control serology in 154 patients and 154 neurological controls found recent *C. jejuni* infection in 32% of patients with GBS, significantly more often than controls; CMV in 13% and EBV in 10% were also significantly raised, and *M. pneumoniae* in 5% was raised on univariate analysis only [[Jacobs1998]].
- A systematic review of 2,502 GBS cases estimated that 31% of GBS cases are attributable to *Campylobacter* infection [[Poropatich2010]].
- IGOS-1000 (768 patients with biosamples, 19 countries) found serological evidence of recent infection with *C. jejuni* in 228 (30%), *M. pneumoniae* in 77 (10%), CMV in 30 (4%), HEV in 23 (3%) and EBV in 7 (1%); more than one recent infection was found in 49 (6%) [[Leonhard2022IGOS]].
- The proportions of these five infections were similar across continents in IGOS-1000, so regional differences in GBS phenotype are **not** explained by a different infection mix alone [[Leonhard2022IGOS]].
- In the 229-patient Plasma Exchange/Sandoglobulin trial cohort, recent *C. jejuni* was found in 53 (23%), CMV in 19 (8%) and EBV in 4 (2%) [[Hadden2001]].
- In 86 consecutive Japanese patients, identified infections were *C. jejuni* 23%, CMV 10%, *M. pneumoniae* 6% and EBV 3% [[Ogawara2000]].
- In a prospective Chinese cohort of 150 patients, 53% had serology positive for a recent infection: *C. jejuni* 27%, influenza A 17%, influenza B 16%, hepatitis A virus 5%, dengue 3%, CMV 3%, EBV 3%, *M. pneumoniae* 2%; HEV, *Haemophilus influenzae* and Zika serology were all negative [[Hao2019]].
- *C. jejuni*-positive patients in IGOS-1000 were more severely affected: lower MRC sum score at nadir (p = 0.004) and longer time to regain independent walking (p = 0.005) [[Leonhard2022IGOS]].
- *C. jejuni* infection is associated with antibodies to GM1 and GD1b and with a severe pure motor form of GBS; CMV infection is associated with anti-GM2 antibodies and with severe motor-sensory deficits [[Jacobs1998]].
- Bangladesh, where *C. jejuni*-driven axonal disease dominates, had the highest proportion of pure motor GBS (74/107, 69%) and of the axonal electrophysiological subtype (34/94, 36%) in IGOS, against 6% axonal in Europe/Americas [[Doets2018]].

### triggers · Absolute risk per infection — why only about 1 in 3,000 gets GBS

- In a Swedish cohort of 29,563 laboratory-confirmed *C. jejuni* infections (1987–1995), 9 people developed GBS: **30.4 per 100,000 infections** (95% CI 13.9–57.8), against an expected 0.3 per 100,000 over a 2-month window in the general population — roughly a 100-fold relative risk, and about 1 case per 3,300 infections [[McCarthy2001]].
- A nested case-control study in the UK General Practice Research Database (1991–2001) found, after correcting for under-ascertainment of *Campylobacter*, a **60-fold** excess risk of GBS after *Campylobacter* enteritis, with 20% of GBS cases attributable to the pathogen; it also confirmed associations with EBV infection and with influenza-like illness in the previous two months [[Tam2007]].
- A prospective French cohort of 506 patients with GBS found 63 (12.4%) had primary CMV infection, and estimated the incidence of CMV-associated GBS at **0.6–2.2 cases per 1,000 primary CMV infections**, against 0.25–0.65 per 1,000 *C. jejuni* infections — the per-infection risk is of a similar, very small order for both [[Orlikowski2011]].
- Patients with CMV-associated GBS were mostly young (median age 32 years), with frequent sensory deficits (72%) and facial palsy (49%); long-term neurological sequelae affected 21% [[Orlikowski2011]].
- HEV: anti-HEV IgM was found in 10 of 201 Dutch patients with GBS (5.0%) versus 1 of 201 matched healthy controls (0.5%) — odds ratio 10.5 (95% CI 1.3–82.6, p = 0.026). HEV RNA was detected in blood in 3 and in faeces in 1; 70% of anti-HEV IgM-positive patients had mildly raised liver enzymes, and all CSF samples were HEV RNA-negative [[vanDenBerg2014HEV]].
- HEV has also been identified as a preceding infection in GBS in Bangladesh, extending the association beyond high-income settings [[Geurtsvankessel2013]].
- *Haemophilus influenzae*: raised anti-*H. influenzae* antibodies in two or three immunoglobulin classes were found in 6 of 46 Japanese patients with GBS (13%) and in none of 49 healthy controls or 51 disease controls (p = 0.01 and p = 0.009). These patients had a uniform picture — prodromal respiratory infection, pure motor axonal degeneration, IgG anti-GM1 positivity — but seemed to recover better than *C. jejuni*-related cases [[Mori2000Hinfluenzae]].
- A particular strain of non-typable *H. influenzae* carries a GM1-like structure, which is the proposed mechanism for the axonal phenotype [[Mori2000Hinfluenzae]].
- Influenza-like illness raises GBS risk sharply: the relative incidence of GBS within 90 days of an influenza-like illness was 7.35 (95% CI 4.36–12.38), rising to 16.64 (95% CI 9.37–29.54) within 30 days, in a UK self-controlled case series [[Stowe2009]].
- An influenza-coded healthcare encounter in Ontario carried a relative incidence of GBS of 15.81 (95% CI 10.28–24.32) within 6 weeks, equal to **17.2 GBS admissions per million influenza-coded encounters** [[Kwong2013]].
- RSV infection is now also implicated: among 452,471 US Medicare beneficiaries aged ≥65 with medically attended RSV disease, the adjusted incidence rate ratio for GBS in days 1–42 was 2.11 (95% CI 1.01–4.37), rising to 3.98 (95% CI 1.45–10.91) in those aged ≥75 (Early evidence; fewer than 11 risk-period cases, suppressed by Medicare cell-size rules) [[Liang2026RSV]].

### triggers · Zika virus

- The first case-control evidence came from French Polynesia (October 2013 – April 2014): of 42 patients with GBS, 41 (98%) had anti-Zika IgM or IgG and 100% had neutralising antibodies, against 54 of 98 (56%) in non-febrile hospital controls (p < 0.0001) [[CaoLormeau2016]].
- Zika-associated GBS in that outbreak was fast and severe: median installation phase 6 days (IQR 4–9), median plateau 4 days (3–10), electrophysiology compatible with acute motor axonal neuropathy (AMAN), and 12 of 42 (29%) needing respiratory assistance; no one died [[CaoLormeau2016]].
- Anti-glycolipid reactivity was found in 13 of 42 (31%) by ELISA, notably against GA1 in 8 (19%), and in 19 of 41 (46%) by glycoarray — but the typical AMAN-associated anti-ganglioside antibodies were rarely present, so Zika-associated GBS is not simply GM1 mimicry (Established that classic anti-ganglioside antibodies are usually absent; the mechanism is a Hypothesis) [[CaoLormeau2016]].
- Past dengue exposure did not differ between cases (95%) and the two control groups (89%, 83%), arguing against dengue-priming as the explanation in that outbreak [[CaoLormeau2016]].
- Across 11 locations with Zika and GBS surveillance data, the modelled risk was **2.0 reported GBS cases per 10,000 Zika virus infections** (95% credible interval 0.5–4.5) [[MierYTeranRomero2018]].
- Puerto Rico's 2016 epidemic produced 123 confirmed GBS cases; of 107 tested, 71 (66%) had evidence of Zika infection. Zika-positive cases more often had facial weakness (62.0% vs 27.8%, p < 0.001), dysphagia (53.5% vs 25.0%, p = 0.005), ICU admission (66.2% vs 44.4%, p = 0.03) and mechanical ventilation (31.0% vs 11.1%, p = 0.02) [[Dirlikov2018]].
- At 6 months, Zika-positive GBS cases more often reported excessive or inadequate tearing (53.6% vs 26.1%, p = 0.03) and substantial pain (27.3% vs 4.3%, p = 0.03) [[Dirlikov2018]].

### triggers · SARS-CoV-2

- A systematic review of the first 73 published COVID-19-associated GBS cases found a broad age range (mean 55 years), male predominance (68.5%), a distribution of variants and electrophysiological subtypes resembling classic GBS, albumino-cytological dissociation in about 71%, no detectable SARS-CoV-2 RNA in CSF in any tested case, and good prognosis in more than 70% (Early evidence; case-series level) [[AbuRumeileh2021]].
- A Spanish emergency-department network found 11 GBS cases among 71,904 patients with COVID-19 during the 2-month pandemic peak: relative frequency 0.15‰ in COVID versus 0.02‰ in non-COVID patients (OR 6.30, 95% CI 3.18–12.5), and standardised incidence 9.44 versus 0.69 cases per 100,000 inhabitant-years (OR 13.5, 95% CI 9.87–18.4) [[Fragiel2021]].
- Against this, a UK national study found **no** epidemiological association: GBS treated in UK hospitals ran at 1.65–1.88 per 100,000 per year in 2016–2019, incidence *fell* between March and May 2020, and regional GBS and COVID-19 incidence did not correlate (r = 0.06, 95% CI −0.56 to 0.63, p = 0.86). Clinical phenotype and outcome did not differ between COVID-positive and COVID-negative GBS [[Keddie2021]].
- The UK authors proposed that lockdown reduced transmission of the pathogens that actually cause GBS — *C. jejuni* and respiratory viruses — which would mask any small SARS-CoV-2 effect [[Keddie2021]].
- A large English self-controlled case series found the risk of GBS raised after a positive SARS-CoV-2 test: incidence rate ratio 5.25 (95% CI 3.00–9.18) in the 28 days after the test, equal to **145 excess GBS cases per 10 million people** with a positive test [[Patone2021]].
- A 20-site multinational self-controlled case series (Global Vaccine Data Network) found the relative incidence of GBS after SARS-CoV-2 infection to be 3.35 (95% CI 1.83–6.11) in days 1–42, based on 489 cases identified from electronic data sources [[Nasreen2025]].

### triggers · Host factors, genetics and non-infectious triggers

- Age and sex, not infection, are the strongest population-level risk factors: in a meta-analysis of 1,643 cases over 152.7 million person-years, GBS incidence rose by 20% for every 10-year increase in age, and risk was higher in males than females. The fitted background rate is exp[−12.0771 + 0.01813 × age in years] × 100,000 per 100,000 person-years [[Sejvar2011]].
- There is no strong HLA association. A meta-analysis of 9 case-control studies (780 cases, 1,353 controls) found **no** significant association between HLA-DQB1 polymorphisms and GBS in either Asian or Caucasian populations; two comparisons only approached significance (DQB1*030x in Asians, OR 0.76, 95% CI 0.57–1.03, p = 0.07; DQB1*060x overall, OR 1.48, 95% CI 0.96–2.29, p = 0.08) [[Jin2015]].
- A field synopsis covering 220 polymorphisms from 41 studies, with 95 primary meta-analyses, found significant associations for only four variants: FcγRIIA rs1801274, TNF-α rs1800629, HLA-DRB1*0401 and HLA-DRB1*1301. In subgroup analysis TNF-α rs1800629, TNF-α rs1800630 and TLR4 rs4986790 were associated in Asians, and FcγRIIA rs1801274 and HLA-DRB1*14 in Caucasians; TNF-α rs1800629 was associated with the AMAN subtype. The FcγRIIA result was not robust to sensitivity analysis (Early evidence) [[Zhao2020]].
- Familial GBS exists but is rare: 12 Dutch families were described in which at least two members had had GBS, with earlier onset in successive generations, suggesting some genetic contribution (Hypothesis) [[Geleijns2004]].
- Surgery is moderately associated with GBS. In a French nationwide case-crossover study of 8,364 GBS hospitalisations (2009–2014), 257 patients had surgery in the case window (1–60 days before) versus 175 in the referent window (366–425 days before): adjusted OR 1.53 (95% CI 1.25–1.88). The association persisted for operations with no recorded infection (OR 1.40, 95% CI 1.12–1.73) and was strongest for bone surgery (OR 2.78, 95% CI 1.68–4.60) and digestive-organ surgery (OR 2.36, 95% CI 1.32–4.21) [[Rudant2018]].
- Malignancy: in a 12-year single-centre series of 118 patients, cancer was more common than in the general population (OR 2.08, 95% CI 1.06–3.71, p = 0.036), but the association disappeared when paraneoplastic criteria were applied. Cancer-associated cases were older, more often hyponatraemic, had more axonal loss, lower CSF protein, less neurological improvement and higher inpatient mortality (Early evidence) [[Hiew2017]].
- Immune checkpoint inhibitors: of 2,208 GBS reports in FDA's Adverse Event Reporting System (2003 Q3 – 2023 Q2), 242 (10.9%) were associated with a checkpoint inhibitor. All five drugs showed disproportionate reporting — avelumab (reporting OR 29.8), atezolizumab (17.0), ipilimumab (16.0), pembrolizumab (11.9), nivolumab (8.2). Disproportionality analysis cannot give an incidence (Early evidence) [[Abrahao2024]].
- Guideline framing: relationships between GBS and immunobiologicals (TNF antagonists, checkpoint inhibitors, type I interferons) rest on case series and biological plausibility, while surgery and malignancy "lack a clear biological rationale and the epidemiological evidence is limited" [[Leonhard2019]].
- Recurrence is rare — 2–5% of patients — though still higher than the general-population lifetime risk of GBS (about 0.1%) [[Leonhard2019]]. In a Dutch survey of 245 people with GBS, 9 had a confirmed recurrence [[Kuitwaard2009]].

### mimicry · Carbohydrate mimicry: from bacterial LOS to anti-ganglioside antibody

- The core mimicry is a shared carbohydrate: the terminal Galβ1-3GalNAcβ1-4(NeuAcα2-3)Galβ1- structure on *C. jejuni* lipo-oligosaccharide (LOS) is identical to the terminal sugar of human GM1 ganglioside [[Yuki2004]].
- Sensitising rabbits with *C. jejuni* LOS produced IgG anti-GM1 antibody and flaccid limb weakness, with peripheral-nerve pathology identical to that of human GBS — the decisive demonstration that carbohydrate mimicry causes autoimmune neuropathy (Established) [[Yuki2004]].
- A monoclonal antibody raised in mice against the same LOS bound GM1 and human peripheral nerve. That antibody and patient-derived IgG anti-GM1 did not themselves paralyse animals but blocked muscle action potentials in muscle–spinal cord coculture, showing that anti-GM1 antibody is sufficient to cause weakness [[Yuki2004]].
- The genetics of the bacterium matter. Among Japanese isolates, LOS biosynthesis locus **class A** was present in 72 of 106 (68%) strains from patients with GBS but only 17 of 103 (17%) from patients with uncomplicated enteritis. Class A strains were predominantly serotype HS:19 and carried the **cstII (Thr51)** sialyltransferase genotype, which builds both GM1-like and GD1a-like LOS [[Koga2006]].
- Both anti-GM1 and anti-GD1a monoclonal antibodies bound class A LOS regularly, whereas other locus classes bound neither or only one; logistic regression made serotype HS:19 and the class A locus predictors of developing GBS after enteritis [[Koga2006]].
- Mimicry explains the anatomical target because gangliosides are not evenly distributed: GM1 was shown to be present on the axons of peripheral nerves, and IgG was deposited on the axons of the **anterior roots** in the ganglioside-sensitised rabbit [[Yuki2001]].
- Sensitising rabbits with a bovine brain ganglioside mixture, or with purified GM1 alone, produced high IgG anti-GM1 titres, acute flaccid limb weakness and a monophasic course, with predominant Wallerian-like degeneration and neither lymphocytic infiltration nor demyelination — an animal model of the axonal form (AMAN) [[Yuki2001]].
- Antibody specificity tracks electrophysiological subtype. In 86 consecutive Japanese patients, IgG antibodies were found against GM1 (40%), GD1a (30%), GalNAc-GD1a (17%) and GD1b (21%), and there was a strong association between AMAN and IgG against any of these four. Almost all patients with at least one of them had an AMAN pattern or rapidly reversible conduction slowing/block [[Ogawara2000]].
- The mimicry story is not complete: more than half of the patients with AMAN or with anti-ganglioside antibodies in that series were *C. jejuni*-negative, so other organisms frequently trigger the same anti-ganglioside response [[Ogawara2000]].
- Anti-GQ1b antibodies are the serological hallmark of the Miller Fisher variant and are regarded as its principal pathogenic mediator; GQ1b is enriched in the oculomotor nerves, which is the proposed reason that variant presents with ophthalmoplegia [[Halstead2008]].
- Anti-ganglioside testing has limited clinical use: the EAN/PNS guideline states that testing is of limited value in most patients with typical motor-sensory GBS, but anti-GQ1b should be considered when Miller Fisher syndrome is suspected [[vanDoorn2023]].
- For acute inflammatory demyelinating polyradiculoneuropathy (AIDP) — the commonest subtype in Europe and the Americas — no target antigen has been identified, and no mimicry mechanism is established (Hypothesis) [[Shahrizaila2021,Willison2016]].

### mimicry · Complement, the node of Ranvier and axonal injury

- The effector step is complement. In ganglioside-immunised animals with progressing limb weakness, nodal Nav channel clusters were disrupted or had disappeared at abnormally lengthened nodes, together with deposition of IgG and complement products [[Susuki2007]].
- The structures that normally stabilise Nav clusters — paranodal axoglial junctions, the nodal cytoskeleton and Schwann cell microvilli — were also disrupted. Crucially, nodal molecules disappeared in lesions with complement deposition but **no** macrophages, showing complement alone is enough [[Susuki2007]].
- During recovery, complement deposition at nodes decreased and Nav channels redistributed on both sides of the affected nodes, which is the structural counterpart of the clinically observed rapidly reversible conduction failure [[Susuki2007]].
- The downstream cascade runs: antibody binding → complement activation → membrane attack complex (MAC, C5b-9) pores → uncontrolled calcium influx → activation of the calcium-dependent protease calpain → cleavage of neural cytoskeletal and transmembrane proteins → functional failure [[Campbell2022]].
- Blocking complement prevents the injury. In an in vitro mouse Miller Fisher model, eculizumab (anti-C5) completely prevented electrophysiological and structural lesions at anti-GQ1b-exposed neuromuscular junctions when normal human serum supplied complement; in a novel in vivo model, intravenous eculizumab prevented respiratory paralysis and the associated functional and morphological hallmarks of terminal motor neuropathy [[Halstead2008]].
- Inhibition further upstream also works: the anti-C2 humanised antibody ARGX-117, which blocks C3 convertase formation and so the classical and lectin pathways, significantly reduced injury to paranodal proteins and improved respiratory function in Schwann-cell nodal-membrane injury models, and protected axonal integrity in an established AMAN model [[Campbell2022]].
- Where the antibody lands decides the pathology. In glycosyltransferase-disrupted transgenic mice expressing GM1 **only in neurons** or **only in glia**, axonal targeting caused catastrophic acute axonal disruption, while Schwann-cell targeting caused acute disruption of perisynaptic glia and Schwann cell membranes at nodes, followed subacutely by axonal disruption at nodes and secondary (bystander) axonal degeneration [[McGonigal2022]].
- Human pathology matches both routes: autopsy study of 15 Japanese patients with axonal GBS showed axonal degeneration predominating, and inflammatory infiltrates have been documented in the spinal cord in GBS [[Sobue1997,Muller2003]].
- Macrophage invasion of myelin and of the periaxonal space is the classic AIDP lesion; in the complement-driven nodal models the molecular damage precedes and can occur without macrophage arrival [[Susuki2007,Muller2003]].

### mimicry · Anatomical vulnerability: why roots and why so patchy

- Endoneurial inflammatory oedema of the **proximal nerve trunks, particularly the spinal nerves**, is the outstanding lesion in autopsy studies of early classical GBS (≤10 days from onset) [[Berciano2024]].
- Lesion topography is dictated by variable permeability of the blood–nerve barrier: the barrier is deficient at the roots, the dorsal root ganglia and the nerve terminals, which is where antibody can reach its antigen [[Berciano2024]].
- In proximal nerve trunks that possess an epi-perineurium, oedema can raise endoneurial fluid pressure and cause ischaemic change, adding a second, mechanical mechanism of injury (Hypothesis) [[Berciano2024]].
- In both AMAN and acute motor-sensory axonal neuropathy, Wallerian-like degeneration of motor fibres predominates in the distal part of the ventral spinal roots where they abut the dura — re-emphasising that region as the hotspot of any early GBS subtype [[Berciano2024]].
- Taken together with the per-infection risk figures, the picture is multi-hit: a strain carrying the right LOS class (about 2 in 3 of GBS-associated isolates, versus 1 in 6 of enteritis isolates) plus a permissive host, giving roughly 1 GBS case per 3,000 *Campylobacter* infections [[Koga2006,McCarthy2001]].
- T cells are not the established effector in the ganglioside-mediated subtypes; the direct evidence in GBS is for antibody plus complement, and the role of T cells remains inferential (Hypothesis) [[Susuki2007,Campbell2022]].

### vaccines · The 1976 swine influenza campaign

- The 1976–77 National Influenza Immunization Program was suspended on 16 December 1976 after reports of GBS, and nationwide surveillance then identified 1,098 patients with GBS onset between 1 October 1976 and 31 January 1977 [[Schonberger1979]].
- Of these, 532 had recently received A/New Jersey influenza vaccine before onset and 543 had not; the vaccinated population had a significantly elevated attack rate in every adult age group [[Schonberger1979]].
- The estimated attributable risk was **just under one case per 100,000 vaccinations** (≈10 per million) in adults — the largest vaccine-associated GBS risk ever documented [[Schonberger1979]].
- The excess was concentrated in the 5 weeks after vaccination, although it lasted approximately 9–10 weeks [[Schonberger1979]].

### vaccines · Seasonal and pandemic influenza vaccines

- Later influenza vaccines carry a risk of a wholly different order. Two studies have suggested about **one additional GBS case per one million vaccinations**, several orders of magnitude lower than 1976 [[Leonhard2019]].
- Ontario self-controlled risk-interval study (1993–2011, 2,831 incident GBS admissions): risk within 6 weeks of seasonal influenza vaccination was 52% higher than in the 9–42-week control interval (relative incidence 1.52, 95% CI 1.17–1.99), greatest in weeks 2–4. The attributable risk was **1.03 GBS admissions per million vaccinations** [[Kwong2013]].
- The same study put the risk after an influenza-coded healthcare encounter at 17.2 GBS admissions per million — about **17 times** the risk attributed to the vaccine [[Kwong2013]].
- A UK self-controlled case series (General Practice Research Database, 1990–2005) found **no** increased risk after seasonal influenza vaccine: relative incidence within 90 days 0.76 (95% CI 0.41–1.40), and 0.89 (95% CI 0.42–1.89) when restricted to validated cases — while the relative incidence after influenza-like illness was 7.35 (95% CI 4.36–12.38) [[Stowe2009]].
- The 2009 H1N1 monovalent inactivated vaccines: a meta-analysis of six US surveillance systems covering about 23 million vaccinated people found an incidence rate ratio of 2.35 (95% CI 1.42–4.01, p = 0.0003), equal to about **1.6 excess GBS cases per million people vaccinated** [[Salmon2013]].
- At the population level over the whole 2009–10 pandemic season (catchment 45 million, 392 GBS cases), the H1N1-vaccinated population had a *lower* cumulative GBS risk than the unvaccinated: 6.6 versus 9.2 cases per million persons (p = 0.012), incidence density ratio 0.83 (95% CI 0.63–1.08) — consistent with vaccination preventing more infection-triggered GBS than it causes [[Vellozzi2014AJPH]].
- The UK case-control database also found evidence of a *protective* effect of influenza vaccination on GBS risk, which the authors attributed either to protection against influenza disease or to confounding (people with recent infection being less likely to be vaccinated) [[Tam2007]].
- The narrative summary from CDC's vaccine-safety group: studies over 35 years have shown an increased risk of GBS after influenza infection whose magnitude is **several times greater** than that after influenza vaccination [[Vellozzi2014CID]].
- Coincidence matters in interpreting any mass campaign: if 10 million people were vaccinated in the UK, 21.5 GBS cases would be expected within 6 weeks purely as background, with no causal link at all [[Black2009]].
- In Canadian paediatric tertiary centres (1996–2012), 24 of 246 GBS cases (10%) had onset within 30 days of an immunisation, an annual post-immunisation GBS rate of 2.0 per 100,000 hospitalisations — an infrequent cause of paediatric admission [[Top2015]].

### vaccines · COVID-19 vaccines: adenoviral-vector versus mRNA

- English self-controlled case series covering 20,417,752 first doses of ChAdOx1 nCoV-19 and 12,134,782 first doses of BNT162b2: GBS risk was raised after ChAdOx1 (incidence rate ratio 2.90, 95% CI 2.15–3.92 at 15–21 days), with independent Scottish support (IRR 2.32, 95% CI 1.08–5.02 at 1–28 days). The estimate was **38 excess GBS cases per 10 million people** receiving ChAdOx1 [[Patone2021]].
- The same study's headline comparison: 38 excess GBS cases per 10 million after ChAdOx1 versus **145 excess cases per 10 million** after a positive SARS-CoV-2 test — the risk of neurological complications was substantially higher after infection than after vaccination [[Patone2021]].
- US Vaccine Safety Datalink (10,158,003 participants, 15,120,073 doses): 11 confirmed GBS cases after Ad26.COV2.S, giving an unadjusted incidence of **32.4 per 100,000 person-years** (95% CI 14.8–61.5) in days 1–21, significantly above the background rate of 1–2 per 100,000 person-years; the adjusted rate ratio for days 1–21 versus 22–42 was 6.03 (95% CI 0.79–147.79) [[Hanson2022]].
- In the same surveillance system, 36 confirmed GBS cases followed mRNA vaccines, an unadjusted incidence of **1.3 per 100,000 person-years** (95% CI 0.7–2.4) in days 1–21 — indistinguishable from the background rate [[Hanson2022]].
- The 20-site Global Vaccine Data Network self-controlled case series (1 December 2020 – 9 August 2023) found increased risk of Brighton level 1–2 GBS after ChAdOx1-S (relative incidence 3.10, 95% CI 1.12–8.62) in days 1–42, and *decreased* risk after BNT162b2 (RI 0.48, 95% CI 0.27–0.85) and CoronaVac/Sinovac (RI 0.04, 95% CI 0.00–0.61) [[Nasreen2025]].
- UK prospective surveillance received 67 GBS reports after ChAdOx1 (65 after a first dose) and 3 after BNT162b2 between 1 January and 30 June 2021; causal association was graded probable in 56 (80%, all ChAdOx1) [[Tamborska2022]].
- Those vaccine-associated cases had an unusual profile: only 10% (7/69) reported an antecedent infection versus 77% (502/652) in IGOS (p < 0.00001), with more facial weakness (63% vs 36%, p < 0.00001) and more sensory dysfunction (93% vs 69%, p = 0.00005), but similar severity and outcome. Bilateral facial weakness with paraesthesias accounted for 10 of 70 cases (14%) [[Tamborska2022]].
- Both EU and US regulators acted on the adenoviral-vector signal; the published evidence base is the English, Scottish, UK-surveillance and VSD studies above [[Patone2021,Tamborska2022,Hanson2022]].

### vaccines · RSV vaccines in older adults (2024–2026)

- On 7 January 2025 FDA required a Guillain-Barré syndrome warning in the prescribing information for the RSV vaccines Abrysvo and Arexvy, based on its own postmarketing self-controlled case series in Medicare claims (May 2023 – July 2024, risk window 1–42 days, control window 43–90 days, adults aged ≥65) [[FDA-RSVGBS2025]].
- FDA's estimates were **9 excess GBS cases per million doses of Abrysvo** and **7 excess GBS cases per million doses of Arexvy**, and the new Warnings and Precautions text states the data "suggest an increased risk of Guillain-Barré syndrome (GBS) during the 42 days following vaccination". FDA also states that the available evidence is insufficient to establish a causal relationship [[FDA-RSVGBS2025]].
- England's programme for 2.5 million people aged 75–79, vaccinated with bivalent pre-F (Abrysvo) from September 2024, confirmed a signal: self-controlled case series relative incidence **3.34 (95% CI 2.12–5.28)** and attributable risk **23 cases per million doses (95% CI 17–26)** in the 0–42-day window, using the immunoglobulin registry and GBS-coded hospital discharges. The authors conclude this is a small risk "far exceeded by the vaccine benefits" [[Stowe2025RSV]].
- FDA's wider surveillance of 11 *other* prespecified outcomes in 3.82 million Medicare RSV vaccinees (2.60 million RSVPreF3+AS01; 1.21 million RSVPreF) found no statistically significant elevation for any of them; GBS was reported separately [[Lloyd2026RSV]].
- The comparator on the other side of the ledger: medically attended RSV disease in US Medicare beneficiaries aged ≥65 carried an adjusted GBS incidence rate ratio of 2.11 (95% CI 1.01–4.37) in days 1–42, and 3.98 (95% CI 1.45–10.91) in those aged ≥75 [[Liang2026RSV]].

### vaccines · Revaccination after GBS

- ACIP recommends not giving influenza vaccine to people who have had GBS within 6 weeks of a prior influenza vaccination, unless they are at high risk of severe complications from influenza illness [[Baxter2012]].
- The evidence behind revaccination safety: in Kaiser Permanente Northern California, 550 neurologist-confirmed GBS cases arose over 33 million person-years. After their GBS diagnosis, 989 vaccines were given to 279 of these individuals, including 405 trivalent inactivated influenza vaccines to 107 people. Only 6 of 550 (1.1%) had a recurrent GBS diagnosis, and **none** of those 6 had any vaccine exposure in the 2 months before the second onset [[Baxter2012]].
- Of 18 people whose index GBS began within 6 weeks of influenza vaccine, 2 were revaccinated with influenza vaccine without recurrence [[Baxter2012]].
- A Dutch patient-society survey reached the same conclusion: none of 106 people with previous GBS who received influenza vaccination (1–37 times each, 775 vaccinations in total) reported a recurrence. By contrast, 5 of 24 people with CIDP who were vaccinated reported an increase in symptoms [[Kuitwaard2009]].
- Guideline position: many vaccines carry a GBS warning, but prior GBS is **not a strict contraindication**. Expert discussion is advised for people diagnosed with GBS less than 1 year before a planned vaccination, or who previously developed GBS shortly after the same vaccine; in those people the benefit of vaccination must be weighed against a small and possibly only theoretical risk of recurrence [[Leonhard2019]].
- The Brighton Collaboration case definitions for GBS and Fisher syndrome exist precisely to standardise immunisation-safety data collection, and were used to grade certainty in the COVID-19 and RSV vaccine studies above [[Sejvar2011Brighton,Nasreen2025,Tamborska2022]].

### Exam hooks

- About two-thirds of people with GBS report an infection in the preceding 6 weeks; the usual interval from infection to first neurological symptom is 1–2 weeks [[Leonhard2019,Yuki2004]].
- The six pathogens with case-control support are *C. jejuni*, CMV, HEV, *M. pneumoniae*, EBV and Zika virus [[Leonhard2019]].
- *C. jejuni* is found in roughly 30% of GBS cases (IGOS-1000: 228/768, 30%; Jacobs 1998: 32%) and about 31% of cases are attributable to it [[Leonhard2022IGOS,Jacobs1998,Poropatich2010]].
- Risk of GBS after laboratory-confirmed *C. jejuni* infection is 30.4 per 100,000 infections (95% CI 13.9–57.8), about 100-fold the background rate — roughly 1 in 3,300 [[McCarthy2001]].
- *C. jejuni* GBS is associated with anti-GM1 and anti-GD1b antibodies, pure motor disease, axonal electrophysiology and worse outcome; CMV GBS with anti-GM2, younger age, facial palsy and sensory involvement [[Jacobs1998,Hadden2001,Orlikowski2011]].
- The mimicked epitope is the terminal Galβ1-3GalNAcβ1-4(NeuAcα2-3)Galβ1- of GM1, carried on *C. jejuni* LOS [[Yuki2004]].
- The bacterial gene that matters is the sialyltransferase **cstII**; LOS biosynthesis locus class A (cstII Thr51, serotype HS:19) is found in 68% of GBS-associated isolates versus 17% of enteritis isolates [[Koga2006]].
- Anti-GQ1b is the serological marker of Miller Fisher syndrome; GQ1b enrichment in oculomotor nerves explains the ophthalmoplegia [[Halstead2008]].
- The effector mechanism in anti-ganglioside GBS is complement: MAC formation disrupts Nav channel clusters at lengthened nodes of Ranvier, without requiring macrophages [[Susuki2007]].
- Eculizumab (anti-C5) and ARGX-117 (anti-C2) both prevent injury in mouse models, which is the preclinical rationale for complement inhibition trials [[Halstead2008,Campbell2022]].
- No target antigen is known for AIDP [[Shahrizaila2021,Willison2016]].
- The 1976 A/New Jersey swine influenza vaccine carried an attributable risk of just under 1 GBS case per 100,000 vaccinations, concentrated in the first 5 weeks [[Schonberger1979]].
- Modern seasonal influenza vaccine carries about 1 excess GBS case per million doses (Ontario: 1.03 per million); influenza illness carries about 17 per million encounters [[Kwong2013]].
- The 2009 H1N1 monovalent vaccine carried about 1.6 excess GBS cases per million vaccinated (IRR 2.35, 95% CI 1.42–4.01) [[Salmon2013]].
- ChAdOx1 nCoV-19 gave 38 excess GBS cases per 10 million first doses; a positive SARS-CoV-2 test gave 145 excess cases per 10 million [[Patone2021]].
- mRNA COVID-19 vaccines showed no excess: 1.3 GBS cases per 100,000 person-years in days 1–21, against a background of 1–2 per 100,000 person-years [[Hanson2022]].
- FDA required a GBS warning for Abrysvo and Arexvy in January 2025, estimating 9 and 7 excess cases per million doses respectively; England's SCCS found 23 per million doses (RI 3.34) [[FDA-RSVGBS2025,Stowe2025RSV]].
- There is no strong HLA association in GBS; HLA-DQB1 meta-analysis is null [[Jin2015]].
- Recent surgery is modestly associated with GBS (adjusted OR 1.53, 95% CI 1.25–1.88), strongest for bone and digestive-organ operations [[Rudant2018]].
- Prior GBS is not a strict contraindication to vaccination; ACIP advises against influenza vaccine only when GBS began within 6 weeks of a previous influenza vaccination and the person is not at high risk from influenza [[Leonhard2019,Baxter2012]].

### In plain words

- In about two out of three people, GBS starts a week or two after an ordinary infection — most often a stomach upset or a chest or throat infection.
- The commonest single trigger is a food-poisoning bacterium called *Campylobacter*, found in about three in ten people with GBS.
- Having that infection almost never leads to GBS: about 1 person in 3,000 who gets a confirmed *Campylobacter* infection goes on to develop GBS.
- The reason is a case of mistaken identity. Part of the sugar coating on the bacterium looks almost exactly like a sugar on the surface of your own nerves, so the antibodies made against the germ also stick to the nerve.
- Once the antibody sticks, a part of the immune system called complement punches holes in the nerve membrane at the gaps between the insulating segments. That stops the nerve carrying signals, which is why muscles go weak.
- Drugs that block complement stop this damage in laboratory animals, which is why they are now being tested in people.
- Nerves are most vulnerable where they leave the spinal cord, because the protective barrier around them is thinnest there.
- Genes matter a little but not much. There is no single gene or tissue type that explains who gets GBS, and GBS running in a family is very rare.
- Some vaccines can very rarely be followed by GBS. The numbers are small: about 1 extra case per million flu vaccinations, and about 7 to 23 extra cases per million RSV vaccinations in older adults.
- The 1976 swine flu vaccine in the United States was different: it caused about 1 extra case per 100,000 doses, which is why that campaign was stopped.
- For most infections, catching the illness carries a bigger GBS risk than the vaccine against it. After a positive COVID-19 test the excess was about four times that after the adenoviral-vector vaccine, and flu illness carried roughly 17 times the risk of flu vaccine.
- The mRNA COVID-19 vaccines showed no increase in GBS at all in studies of millions of doses.
- Having had GBS does not usually mean you can never be vaccinated again. In a study of over 100 people with past GBS who had flu vaccines, none had a recurrence.
- The one caution is if your GBS began within six weeks of a flu vaccine. Then the advice is to discuss it with a specialist before having that vaccine again.
- A negative test for all these germs does not mean you do not have GBS. Many people never have the trigger identified.

## Numbers for the animations

Shares of antecedent infection (IGOS-1000, n = 768 with biosamples):

- infection-share | C. jejuni | 30 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | M. pneumoniae | 10 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | CMV | 4 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | HEV | 3 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | EBV | 1 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | more than one infection | 6 | % of GBS cases | [[Leonhard2022IGOS]]
- infection-share | symptoms reported | 72 | % of GBS cases | [[Leonhard2022IGOS]]

Risk per exposure, for the icon-array (all per million exposures, so one scale):

- risk-per-million | background GBS (6 weeks, UK) | 2.15 | cases per million people | [[Black2009]]
- risk-per-million | seasonal influenza vaccine | 1.03 | excess cases per million doses | [[Kwong2013]]
- risk-per-million | 2009 H1N1 monovalent vaccine | 1.6 | excess cases per million vaccinated | [[Salmon2013]]
- risk-per-million | ChAdOx1 nCoV-19, first dose | 3.8 | excess cases per million doses | [[Patone2021]]
- risk-per-million | mRNA COVID-19 vaccine | 0 | excess cases per million doses (no excess detected) | [[Hanson2022]]
- risk-per-million | Arexvy (RSVPreF3+AS01), FDA estimate | 7 | excess cases per million doses | [[FDA-RSVGBS2025]]
- risk-per-million | Abrysvo (RSVPreF), FDA estimate | 9 | excess cases per million doses | [[FDA-RSVGBS2025]]
- risk-per-million | Abrysvo, England SCCS | 23 | excess cases per million doses | [[Stowe2025RSV]]
- risk-per-million | 1976 A/New Jersey swine influenza vaccine | 10 | excess cases per million doses | [[Schonberger1979]]
- risk-per-million | SARS-CoV-2 infection (positive test) | 14.5 | excess cases per million people | [[Patone2021]]
- risk-per-million | influenza-coded healthcare encounter | 17.2 | cases per million encounters | [[Kwong2013]]
- risk-per-million | Zika virus infection | 200 | cases per million infections | [[MierYTeranRomero2018]]
- risk-per-million | primary CMV infection (upper bound) | 2200 | cases per million infections | [[Orlikowski2011]]
- risk-per-million | confirmed C. jejuni infection | 304 | cases per million infections | [[McCarthy2001]]

Relative incidence by exposure (self-controlled designs):

- relative-incidence | influenza-like illness, 0–30 d | 16.64 | relative incidence | [[Stowe2009]]
- relative-incidence | influenza-coded encounter, 0–6 wk | 15.81 | relative incidence | [[Kwong2013]]
- relative-incidence | influenza-like illness, 0–90 d | 7.35 | relative incidence | [[Stowe2009]]
- relative-incidence | SARS-CoV-2 positive test, 0–28 d | 5.25 | incidence rate ratio | [[Patone2021]]
- relative-incidence | SARS-CoV-2 infection, 1–42 d (GVDN) | 3.35 | relative incidence | [[Nasreen2025]]
- relative-incidence | Abrysvo RSV vaccine, 0–42 d | 3.34 | relative incidence | [[Stowe2025RSV]]
- relative-incidence | ChAdOx1-S, 1–42 d (GVDN) | 3.10 | relative incidence | [[Nasreen2025]]
- relative-incidence | ChAdOx1 nCoV-19, 15–21 d | 2.90 | incidence rate ratio | [[Patone2021]]
- relative-incidence | 2009 H1N1 monovalent vaccine | 2.35 | incidence rate ratio | [[Salmon2013]]
- relative-incidence | medically attended RSV disease, 1–42 d | 2.11 | incidence rate ratio | [[Liang2026RSV]]
- relative-incidence | recent surgery, 1–60 d | 1.53 | adjusted odds ratio | [[Rudant2018]]
- relative-incidence | seasonal influenza vaccine, 0–6 wk | 1.52 | relative incidence | [[Kwong2013]]
- relative-incidence | BNT162b2, 1–42 d (GVDN) | 0.48 | relative incidence | [[Nasreen2025]]
- relative-incidence | seasonal influenza vaccine, 0–90 d (UK) | 0.76 | relative incidence | [[Stowe2009]]
- relative-incidence | CoronaVac/Sinovac, 1–42 d (GVDN) | 0.04 | relative incidence | [[Nasreen2025]]

Time course after exposure, for the scrubber:

- latency-days | Zika illness to neurological onset (median) | 6 | days | [[CaoLormeau2016]]
- latency-days | infection to GBS onset (typical) | 7–14 | days | [[Yuki2004]]
- latency-weeks | 1976 vaccine, peak excess | 0–5 | weeks | [[Schonberger1979]]
- latency-weeks | 1976 vaccine, total excess period | 9–10 | weeks | [[Schonberger1979]]
- latency-weeks | seasonal influenza vaccine, greatest risk | 2–4 | weeks | [[Kwong2013]]
- latency-weeks | COVID-19 vaccine, peak window | 15–21 | days | [[Patone2021]]
- latency-weeks | RSV vaccine, risk window | 0–42 | days | [[FDA-RSVGBS2025,Stowe2025RSV]]
- latency-weeks | antecedent-infection reporting window | 0–6 | weeks | [[Leonhard2019]]

Bacterial genotype and GBS risk:

- cstII-class-A | isolates from GBS cases | 68 | % (72/106) | [[Koga2006]]
- cstII-class-A | isolates from enteritis-only cases | 17 | % (17/103) | [[Koga2006]]

Anti-ganglioside antibody frequencies (86 consecutive Japanese patients):

- antibody-frequency | IgG anti-GM1 | 40 | % | [[Ogawara2000]]
- antibody-frequency | IgG anti-GD1a | 30 | % | [[Ogawara2000]]
- antibody-frequency | IgG anti-GD1b | 21 | % | [[Ogawara2000]]
- antibody-frequency | IgG anti-GalNAc-GD1a | 17 | % | [[Ogawara2000]]

Background incidence for denominators:

- background-incidence | UK, GBS treated in hospital, 2016–2019 | 1.65–1.88 | per 100,000 per year | [[Keddie2021]]
- background-incidence | US VSD background rate | 1–2 | per 100,000 person-years | [[Hanson2022]]
- background-incidence | age effect | +20 | % per 10 years of age | [[Sejvar2011]]

## Open questions and controversies

- Does SARS-CoV-2 infection cause GBS? Position A: yes — a UK self-controlled case series found IRR 5.25 (95% CI 3.00–9.18) after a positive test [[Patone2021]], a multinational SCCS found RI 3.35 (95% CI 1.83–6.11) [[Nasreen2025]], and a Spanish ED network found a 13.5-fold standardised incidence ratio [[Fragiel2021]]. Position B: no epidemiological signal — UK national GBS incidence fell in spring 2020, regional GBS and COVID-19 incidence did not correlate (r = 0.06, p = 0.86), and COVID-associated cases were phenotypically indistinguishable [[Keddie2021]]. Status: the weight of later, larger self-controlled studies supports a real but small association; the 2020 null result is now usually read as confounded by lockdown suppressing *C. jejuni* and respiratory-virus transmission (Established that a small association exists; its size is still debated).
- Is the risk after adenoviral-vector COVID-19 vaccines causal? Position A: probably — a consistent signal across English, Scottish, multinational and US datasets, plus an atypical phenotype (10% antecedent infection, 63% facial weakness) and an unusual age distribution [[Patone2021,Nasreen2025,Hanson2022,Tamborska2022]]. Position B: surveillance studies cannot confirm causation, as the UK authors themselves state [[Tamborska2022]]. Status: accepted as a very rare adverse event; absolute excess about 3.8 per million doses, well below the excess after infection.
- Do mRNA COVID-19 vaccines cause GBS? Position A: no detectable excess — 1.3 per 100,000 person-years in days 1–21, within the 1–2 per 100,000 background [[Hanson2022]]. Position B: the multinational SCCS found a *reduced* relative incidence after BNT162b2 (RI 0.48, 95% CI 0.27–0.85), which the authors do not interpret as protection [[Nasreen2025]]. Status: no established association.
- Do RSV vaccines cause GBS? Position A: FDA judged the Medicare signal strong enough to require a label warning (9 per million for Abrysvo, 7 per million for Arexvy) while stating the evidence is insufficient to establish causation [[FDA-RSVGBS2025]]. Position B: England's independent SCCS confirmed and quantified it at 23 per million doses (RI 3.34, 95% CI 2.12–5.28) [[Stowe2025RSV]]. Status: signal confirmed in two national datasets; the point estimates differ about 2–3-fold, and both groups state the benefit of vaccination exceeds the risk. RSV *disease* itself carries an IRR of 2.11 for GBS [[Liang2026RSV]].
- Is influenza vaccination net-protective against GBS? Position A: possibly — the H1N1-vaccinated population had lower cumulative GBS risk than the unvaccinated (6.6 vs 9.2 per million, p = 0.012) [[Vellozzi2014AJPH]], and the UK database showed a protective association [[Tam2007]]. Position B: these are observational comparisons and may reflect confounding, such as people with recent infection being less likely to be vaccinated [[Tam2007]]. Status: plausible and consistent with the much larger risk from influenza illness, but not established.
- Why do so few infected people get GBS? Position A: bacterial genotype is a major filter — LOS locus class A / cstII is present in 68% of GBS-associated isolates versus 17% of enteritis isolates [[Koga2006]]. Position B: host factors must matter too, since the same organism produces different pathologies in different people [[Hadden2001]], and more than half of patients with AMAN or anti-ganglioside antibodies are *C. jejuni*-negative [[Ogawara2000]]. Status: both; no single host genetic determinant has been identified, and HLA-DQB1 meta-analysis is null [[Jin2015]].
- Is there a genetic susceptibility worth testing for? Position A: four variants reached significance in a 220-polymorphism field synopsis (FcγRIIA rs1801274, TNF-α rs1800629, HLA-DRB1*0401, HLA-DRB1*1301) [[Zhao2020]], and familial clustering exists [[Geleijns2004]]. Position B: no strong HLA association, the FcγRIIA result failed sensitivity analysis, and no GWAS-scale evidence exists [[Zhao2020,Jin2015]]. Status: no clinically useful genetic test (Hypothesis).
- Are surgery and malignancy genuine triggers? Position A: a nationwide case-crossover study found adjusted OR 1.53 for recent surgery [[Rudant2018]], and a single-centre series found OR 2.08 for malignancy [[Hiew2017]]. Position B: the ten-steps guideline holds that these relationships "lack a clear biological rationale and the epidemiological evidence is limited" [[Leonhard2019]], and the malignancy signal vanished under paraneoplastic criteria [[Hiew2017]]. Status: unresolved (Early evidence).
- Do checkpoint inhibitors cause GBS, and how often? Position A: disproportionate reporting for all five agents tested, with 242 of 2,208 FAERS GBS reports linked to a checkpoint inhibitor [[Abrahao2024]]. Position B: disproportionality analysis of a spontaneous-reporting database cannot give an incidence and is subject to reporting bias; the guideline treats the link as case-series level [[Abrahao2024,Leonhard2019]]. Status: recognised association, incidence unknown (Early evidence).
- What drives AIDP, the commonest subtype in Europe and the Americas? No target antigen has been identified, no mimicry mechanism is established, and no animal model reproduces it as cleanly as the GM1 models reproduce AMAN [[Shahrizaila2021,Willison2016]]. Status: open (Hypothesis).
- How much do anti-ganglioside antibodies add clinically? The EAN/PNS guideline says testing is of limited clinical value in typical motor-sensory GBS, reserving anti-GQ1b for suspected Miller Fisher syndrome [[vanDoorn2023]], even though the antibodies are central to the mechanism [[Yuki2004,Ogawara2000]]. Status: mechanistically important, diagnostically marginal.

## Sources

- [Leonhard2019] Leonhard SE, Mandarakas MR, Gondim FAA, Bateman K, Ferreira MLB, Cornblath DR, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019;15(11):671-683. PMID 31541214; PMCID PMC6821638; doi:10.1038/s41582-019-0250-9. (validated: PubMed)
- [vanDoorn2023] van Doorn PA, Van den Bergh PYK, Hadden RDM, Avau B, Vankrunkelsven P, Attarian S, et al. European Academy of Neurology/Peripheral Nerve Society Guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol. 2023;30(12):3646-3674. PMID 37814552; doi:10.1111/ene.16073. (validated: PubMed)
- [Shahrizaila2021] Shahrizaila N, Lehmann HC, Kuwabara S. Guillain-Barré syndrome. Lancet. 2021;397(10280):1214-1228. PMID 33647239; doi:10.1016/S0140-6736(21)00517-1. (validated: PubMed)
- [Willison2016] Willison HJ, Jacobs BC, van Doorn PA. Guillain-Barré syndrome. Lancet. 2016;388(10045):717-27. PMID 26948435; doi:10.1016/S0140-6736(16)00339-1. (validated: PubMed)
- [Doets2018] Doets AY, Verboon C, van den Berg B, Harbo T, Cornblath DR, Willison HJ, et al. Regional variation of Guillain-Barré syndrome. Brain. 2018;141(10):2866-2877. PMID 30247567; doi:10.1093/brain/awy232. (validated: PubMed)
- [Sejvar2011] Sejvar JJ, Baughman AL, Wise M, Morgan OW. Population incidence of Guillain-Barré syndrome: a systematic review and meta-analysis. Neuroepidemiology. 2011;36(2):123-33. PMID 21422765; PMCID PMC5703046; doi:10.1159/000324710. (validated: PubMed)
- [Sejvar2011Brighton] Sejvar JJ, Kohl KS, Gidudu J, Amato A, Bakshi N, Baxter R, et al. Guillain-Barré syndrome and Fisher syndrome: case definitions and guidelines for collection, analysis, and presentation of immunization safety data. Vaccine. 2011;29(3):599-612. PMID 20600491; doi:10.1016/j.vaccine.2010.06.003. (validated: PubMed)
- [Jacobs1998] Jacobs BC, Rothbarth PH, van der Meché FG, Herbrink P, Schmitz PI, de Klerk MA, et al. The spectrum of antecedent infections in Guillain-Barré syndrome: a case-control study. Neurology. 1998;51(4):1110-5. PMID 9781538; doi:10.1212/wnl.51.4.1110. (validated: PubMed)
- [Leonhard2022IGOS] Leonhard SE, van der Eijk AA, Andersen H, Antonini G, Arends S, Attarian S, et al. An International Perspective on Preceding Infections in Guillain-Barré Syndrome: The IGOS-1000 Cohort. Neurology. 2022;99(12):e1299-e1313. PMID 35981895; doi:10.1212/WNL.0000000000200885. (validated: PubMed)
- [Hadden2001] Hadden RD, Karch H, Hartung HP, Zielasek J, Weissbrich B, Schubert J, et al. Preceding infections, immune factors, and outcome in Guillain-Barré syndrome. Neurology. 2001;56(6):758-65. PMID 11274311; doi:10.1212/wnl.56.6.758. (validated: PubMed)
- [Hao2019] Hao Y, Wang W, Jacobs BC, Qiao B, Chen M, Liu D, et al. Antecedent infections in Guillain-Barré syndrome: a single-center, prospective study. Ann Clin Transl Neurol. 2019;6(12):2510-2517. PMID 31714025; PMCID PMC6917331; doi:10.1002/acn3.50946. (validated: PubMed)
- [Poropatich2010] Poropatich KO, Walker CL, Black RE. Quantifying the association between Campylobacter infection and Guillain-Barré syndrome: a systematic review. J Health Popul Nutr. 2010;28(6):545-52. PMID 21261199; PMCID PMC2995022; doi:10.3329/jhpn.v28i6.6602. (validated: PubMed)
- [McCarthy2001] McCarthy N, Giesecke J. Incidence of Guillain-Barré syndrome following infection with Campylobacter jejuni. Am J Epidemiol. 2001;153(6):610-4. PMID 11257070; doi:10.1093/aje/153.6.610. (validated: PubMed)
- [Tam2007] Tam CC, O'Brien SJ, Petersen I, Islam A, Hayward A, Rodrigues LC. Guillain-Barré syndrome and preceding infection with campylobacter, influenza and Epstein-Barr virus in the general practice research database. PLoS One. 2007;2(4):e344. PMID 17406668; PMCID PMC1828628; doi:10.1371/journal.pone.0000344. (validated: PubMed)
- [Orlikowski2011] Orlikowski D, Porcher R, Sivadon-Tardy V, Quincampoix JC, Raphaël JC, Durand MC, et al. Guillain-Barré syndrome following primary cytomegalovirus infection: a prospective cohort study. Clin Infect Dis. 2011;52(7):837-44. PMID 21427390; doi:10.1093/cid/cir074. (validated: PubMed)
- [vanDenBerg2014HEV] van den Berg B, van der Eijk AA, Pas SD, Hunter JG, Madden RG, Tio-Gillen AP, et al. Guillain-Barré syndrome associated with preceding hepatitis E virus infection. Neurology. 2014;82(6):491-7. PMID 24415572; doi:10.1212/WNL.0000000000000111. (validated: PubMed)
- [Geurtsvankessel2013] Geurtsvankessel CH, Islam Z, Mohammad QD, Jacobs BC, Endtz HP, Osterhaus AD. Hepatitis E and Guillain-Barre syndrome. Clin Infect Dis. 2013;57(9):1369-70. PMID 23899686; doi:10.1093/cid/cit512. (validated: PubMed)
- [Mori2000Hinfluenzae] Mori M, Kuwabara S, Miyake M, Noda M, Kuroki H, Kanno H, et al. Haemophilus influenzae infection and Guillain-Barré syndrome. Brain. 2000;123(Pt 10):2171-8. PMID 11004133; doi:10.1093/brain/123.10.2171. (validated: PubMed)
- [Ogawara2000] Ogawara K, Kuwabara S, Mori M, Hattori T, Koga M, Yuki N. Axonal Guillain-Barré syndrome: relation to anti-ganglioside antibodies and Campylobacter jejuni infection in Japan. Ann Neurol. 2000;48(4):624-31. PMID 11026446. (validated: PubMed)
- [CaoLormeau2016] Cao-Lormeau VM, Blake A, Mons S, Lastère S, Roche C, Vanhomwegen J, et al. Guillain-Barré Syndrome outbreak associated with Zika virus infection in French Polynesia: a case-control study. Lancet. 2016;387(10027):1531-1539. PMID 26948433; PMCID PMC5444521; doi:10.1016/S0140-6736(16)00562-6. (validated: PubMed)
- [Dirlikov2018] Dirlikov E, Major CG, Medina NA, Lugo-Robles R, Matos D, Muñoz-Jordan JL, et al. Clinical Features of Guillain-Barré Syndrome With vs Without Zika Virus Infection, Puerto Rico, 2016. JAMA Neurol. 2018;75(9):1089-1097. PMID 29799940; PMCID PMC6143122; doi:10.1001/jamaneurol.2018.1058. (validated: PubMed)
- [MierYTeranRomero2018] Mier-Y-Teran-Romero L, Delorey MJ, Sejvar JJ, Johansson MA. Guillain-Barré syndrome risk among individuals infected with Zika virus: a multi-country assessment. BMC Med. 2018;16(1):67. PMID 29759069; PMCID PMC5952697; doi:10.1186/s12916-018-1052-4. (validated: PubMed)
- [Keddie2021] Keddie S, Pakpoor J, Mousele C, Pipis M, Machado PM, Foster M, et al. Epidemiological and cohort study finds no association between COVID-19 and Guillain-Barré syndrome. Brain. 2021;144(2):682-693. PMID 33313649; PMCID PMC7799186; doi:10.1093/brain/awaa433. (validated: PubMed)
- [Fragiel2021] Fragiel M, Miró Ò, Llorens P, Jiménez S, Piñera P, Burillo G, et al. Incidence, clinical, risk factors and outcomes of Guillain-Barré in Covid-19. Ann Neurol. 2021;89(3):598-603. PMID 33295021; doi:10.1002/ana.25987. (validated: PubMed)
- [AbuRumeileh2021] Abu-Rumeileh S, Abdelhak A, Foschi M, Tumani H, Otto M. Guillain-Barré syndrome spectrum associated with COVID-19: an up-to-date systematic review of 73 cases. J Neurol. 2021;268(4):1133-1170. PMID 32840686; PMCID PMC7445716; doi:10.1007/s00415-020-10124-x. (validated: PubMed)
- [Patone2021] Patone M, Handunnetthi L, Saatci D, Pan J, Katikireddi SV, Razvi S, et al. Neurological complications after first dose of COVID-19 vaccines and SARS-CoV-2 infection. Nat Med. 2021;27(12):2144-2153. PMID 34697502; PMCID PMC8629105; doi:10.1038/s41591-021-01556-7. (validated: PubMed)
- [Nasreen2025] Nasreen S, Jiang Y, Lu H, Lee A, Cutland CL, Gentile A, et al. Risk of Guillain-Barré syndrome after COVID-19 vaccination or SARS-CoV-2 infection: A multinational self-controlled case series study. Vaccine. 2025;60:127291. PMID 40440921; doi:10.1016/j.vaccine.2025.127291. (validated: PubMed)
- [Hanson2022] Hanson KE, Goddard K, Lewis N, Fireman B, Myers TR, Bakshi N, et al. Incidence of Guillain-Barré Syndrome After COVID-19 Vaccination in the Vaccine Safety Datalink. JAMA Netw Open. 2022;5(4):e228879. PMID 35471572; PMCID PMC9044108; doi:10.1001/jamanetworkopen.2022.8879. (validated: PubMed)
- [Tamborska2022] Tamborska AA, Singh B, Leonhard SE, Hodel EM, Stowe J, Watson-Fargie T, et al. Guillain-Barré syndrome following SARS-CoV-2 vaccination in the UK: a prospective surveillance study. BMJ Neurol Open. 2022;4(2):e000309. PMID 35856053; PMCID PMC9277028; doi:10.1136/bmjno-2022-000309. (validated: PubMed)
- [Schonberger1979] Schonberger LB, Bregman DJ, Sullivan-Bolyai JZ, Keenlyside RA, Ziegler DW, Retailliau HF, et al. Guillain-Barre syndrome following vaccination in the National Influenza Immunization Program, United States, 1976-1977. Am J Epidemiol. 1979;110(2):105-23. PMID 463869; doi:10.1093/oxfordjournals.aje.a112795. (validated: PubMed)
- [Kwong2013] Kwong JC, Vasa PP, Campitelli MA, Hawken S, Wilson K, Rosella LC, et al. Risk of Guillain-Barré syndrome after seasonal influenza vaccination and influenza health-care encounters: a self-controlled study. Lancet Infect Dis. 2013;13(9):769-76. PMID 23810252; doi:10.1016/S1473-3099(13)70104-X. (validated: PubMed)
- [Stowe2009] Stowe J, Andrews N, Wise L, Miller E. Investigation of the temporal association of Guillain-Barre syndrome with influenza vaccine and influenzalike illness using the United Kingdom General Practice Research Database. Am J Epidemiol. 2009;169(3):382-8. PMID 19033158; doi:10.1093/aje/kwn310. (validated: PubMed)
- [Salmon2013] Salmon DA, Proschan M, Forshee R, Gargiullo P, Bleser W, Burwen DR, et al. Association between Guillain-Barré syndrome and influenza A (H1N1) 2009 monovalent inactivated vaccines in the USA: a meta-analysis. Lancet. 2013;381(9876):1461-8. PMID 23498095; doi:10.1016/S0140-6736(12)62189-8. (validated: PubMed)
- [Vellozzi2014CID] Vellozzi C, Iqbal S, Broder K. Guillain-Barre syndrome, influenza, and influenza vaccination: the epidemiologic evidence. Clin Infect Dis. 2014;58(8):1149-55. PMID 24415636; doi:10.1093/cid/ciu005. (validated: PubMed)
- [Vellozzi2014AJPH] Vellozzi C, Iqbal S, Stewart B, Tokars J, DeStefano F. Cumulative risk of Guillain-Barré syndrome among vaccinated and unvaccinated populations during the 2009 H1N1 influenza pandemic. Am J Public Health. 2014;104(4):696-701. PMID 24524517; PMCID PMC4025712; doi:10.2105/AJPH.2013.301651. (validated: PubMed)
- [Black2009] Black S, Eskola J, Siegrist CA, Halsey N, MacDonald N, Law B, et al. Importance of background rates of disease in assessment of vaccine safety during mass immunisation with pandemic H1N1 influenza vaccines. Lancet. 2009;374(9707):2115-2122. PMID 19880172; PMCID PMC2861912; doi:10.1016/S0140-6736(09)61877-8. (validated: PubMed)
- [Top2015] Top KA, Desai S, Moore D, Law BJ, Vaudry W, Halperin SA, et al. Guillain-Barré Syndrome After Immunization in Canadian Children (1996-2012). Pediatr Infect Dis J. 2015;34(12):1411-3. PMID 26379167; doi:10.1097/INF.0000000000000903. (validated: PubMed)
- [Stowe2025RSV] Stowe J, Watson CH, Ramsay ME, Andrews NJ. Assessing the risk of Guillain-Barré syndrome in older adults after bivalent RSV pre-F vaccination in England. Nat Commun. 2025;16(1):11496. PMID 41381510; PMCID PMC12748555; doi:10.1038/s41467-025-66280-z. (validated: PubMed)
- [Liang2026RSV] Liang C, Judy J, Chilson EL, Kelly SP, Liu Q, Maynard JD, et al. Estimating Risk of Guillain-Barré Syndrome in US Medicare-enrolled Older Adults Following Medically Attended Respiratory Syncytial Virus Disease: A Self-controlled Case Series Analysis. Clin Infect Dis. 2026;82(4):e799-e806. PMID 41234154; PMCID PMC13169517; doi:10.1093/cid/ciaf621. (validated: PubMed)
- [Lloyd2026RSV] Lloyd PC, Shah PB, Zhang HT, Shah N, Nair N, Wan Z, et al. Safety monitoring of health outcomes following RSVPreF3 + AS01 and RSVPreF vaccination among Medicare beneficiaries aged 65 years and older in the United States, 2023-2024. Vaccine. 2026;79:128459. PMID 41833132; doi:10.1016/j.vaccine.2026.128459. (validated: PubMed)
- [FDA-RSVGBS2025] US Food and Drug Administration. FDA Requires Guillain-Barré Syndrome (GBS) Warning in the Prescribing Information for RSV Vaccines Abrysvo and Arexvy. Center for Biologics Evaluation and Research safety communication, content current as of 7 January 2025. (validated: FDA website — fda.gov/vaccines-blood-biologics/safety-availability-biologics; vaccine labels are not carried in the openFDA drug/label endpoint)
- [Baxter2012] Baxter R, Lewis N, Bakshi N, Vellozzi C, Klein NP; CISA Network. Recurrent Guillain-Barre syndrome following vaccination. Clin Infect Dis. 2012;54(6):800-4. PMID 22267712; doi:10.1093/cid/cir960. (validated: PubMed)
- [Kuitwaard2009] Kuitwaard K, Bos-Eyssen ME, Blomkwist-Markens PH, van Doorn PA. Recurrences, vaccinations and long-term symptoms in GBS and CIDP. J Peripher Nerv Syst. 2009;14(4):310-5. PMID 20021573; doi:10.1111/j.1529-8027.2009.00243.x. (validated: PubMed)
- [Yuki2004] Yuki N, Susuki K, Koga M, Nishimoto Y, Odaka M, Hirata K, et al. Carbohydrate mimicry between human ganglioside GM1 and Campylobacter jejuni lipooligosaccharide causes Guillain-Barre syndrome. Proc Natl Acad Sci U S A. 2004;101(31):11404-9. PMID 15277677; PMCID PMC509213; doi:10.1073/pnas.0402391101. (validated: PubMed)
- [Yuki2001] Yuki N, Yamada M, Koga M, Odaka M, Susuki K, Tagawa Y, et al. Animal model of axonal Guillain-Barré syndrome induced by sensitization with GM1 ganglioside. Ann Neurol. 2001;49(6):712-20. PMID 11409422. (validated: PubMed)
- [Koga2006] Koga M, Gilbert M, Takahashi M, Li J, Koike S, Hirata K, et al. Comprehensive analysis of bacterial risk factors for the development of Guillain-Barre syndrome after Campylobacter jejuni enteritis. J Infect Dis. 2006;193(4):547-55. PMID 16425134; doi:10.1086/499969. (validated: PubMed)
- [Susuki2007] Susuki K, Rasband MN, Tohyama K, Koibuchi K, Okamoto S, Funakoshi K, et al. Anti-GM1 antibodies cause complement-mediated disruption of sodium channel clusters in peripheral motor nerve fibers. J Neurosci. 2007;27(15):3956-67. PMID 17428969; PMCID PMC6672537; doi:10.1523/JNEUROSCI.4401-06.2007. (validated: PubMed)
- [Halstead2008] Halstead SK, Zitman FM, Humphreys PD, Greenshields K, Verschuuren JJ, Jacobs BC, et al. Eculizumab prevents anti-ganglioside antibody-mediated neuropathy in a murine model. Brain. 2008;131(Pt 5):1197-208. PMID 18184663; doi:10.1093/brain/awm316. (validated: PubMed)
- [Campbell2022] Campbell CI, McGonigal R, Barrie JA, Delaere J, Bracke L, Cunningham ME, et al. Complement inhibition prevents glial nodal membrane injury in a GM1 antibody-mediated mouse model. Brain Commun. 2022;4(6):fcac306. PMID 36523267; PMCID PMC9746686; doi:10.1093/braincomms/fcac306. (validated: PubMed)
- [McGonigal2022] McGonigal R, Campbell CI, Barrie JA, Yao D, Cunningham ME, Crawford CL, et al. Schwann cell nodal membrane disruption triggers bystander axonal degeneration in a Guillain-Barré syndrome mouse model. J Clin Invest. 2022;132(14):e158524. PMID 35671105; PMCID PMC9282931; doi:10.1172/JCI158524. (validated: PubMed)
- [Berciano2024] Berciano J. The pathophysiological role of endoneurial inflammatory edema in early classical Guillain-Barré syndrome. Clin Neurol Neurosurg. 2024;237:108131. PMID 38308937; doi:10.1016/j.clineuro.2024.108131. (validated: PubMed)
- [Sobue1997] Sobue G, Li M, Terao S, Aoki S, Ichimura M, Ieda T, et al. Axonal pathology in Japanese Guillain-Barré syndrome: a study of 15 autopsied cases. Neurology. 1997;48(6):1694-700. PMID 9191789; doi:10.1212/wnl.48.6.1694. (validated: PubMed)
- [Muller2003] Müller HD, Beckmann A, Schröder JM. Inflammatory infiltrates in the spinal cord of patients with Guillain-Barré syndrome. Acta Neuropathol. 2003;106(6):509-17. PMID 13680278; doi:10.1007/s00401-003-0768-0. (validated: PubMed)
- [Zhao2020] Zhao Y, Zhu R, Tian D, Liu X. Genetic polymorphisms in Guillain-Barré Syndrome: A field synopsis and systematic meta-analysis. Autoimmun Rev. 2020;19(11):102665. PMID 32949724; doi:10.1016/j.autrev.2020.102665. (validated: PubMed)
- [Jin2015] Jin PP, Sun LL, Ding BJ, Qin N, Zhou B, Xia F, et al. Human Leukocyte Antigen DQB1 (HLA-DQB1) Polymorphisms and the Risk for Guillain-Barré Syndrome: A Systematic Review and Meta-Analysis. PLoS One. 2015;10(7):e0131374. PMID 26204120; PMCID PMC4512729; doi:10.1371/journal.pone.0131374. (validated: PubMed)
- [Geleijns2004] Geleijns K, Brouwer BA, Jacobs BC, Houwing-Duistermaat JJ, van Duijn CM, van Doorn PA. The occurrence of Guillain-Barre syndrome within families. Neurology. 2004;63(9):1747-50. PMID 15534275; doi:10.1212/01.wnl.0000143055.09646.31. (validated: PubMed)
- [Rudant2018] Rudant J, Dupont A, Mikaeloff Y, Bolgert F, Coste J, Weill A. Surgery and risk of Guillain-Barré syndrome: A French nationwide epidemiologic study. Neurology. 2018;91(13):e1220-e1227. PMID 30143563; doi:10.1212/WNL.0000000000006246. (validated: PubMed)
- [Hiew2017] Hiew FL, Rajabally YA. Malignancy in Guillain-Barré syndrome: A twelve-year single-center study. J Neurol Sci. 2017;375:275-278. PMID 28320147; doi:10.1016/j.jns.2017.02.024. (validated: PubMed)
- [Abrahao2024] Abrahao A, Tenório PHM, Rodrigues M, Mello M, Nascimento OJM. Guillain-Barré syndrome and checkpoint inhibitor therapy: insights from pharmacovigilance data. BMJ Neurol Open. 2024;6(1):e000544. PMID 38501128; PMCID PMC10946360; doi:10.1136/bmjno-2023-000544. (validated: PubMed)

## Provenance

- 59 sources are listed. All 58 journal sources were validated against PubMed E-utilities: `esearch` to locate the record, `esummary` (batched, comma-separated ids) to confirm authors, title, journal, year, volume, issue, pages, DOI and PMCID, and `efetch` (rettype=abstract) to read the abstract before any number was taken from it. No PMID or DOI was written from memory.
- Every numeric claim above is quoted as its source states it, with population, comparator, timepoint and confidence interval where the source gives them. Risks converted to a common "per million exposures" scale for the icon-array are flagged as conversions in the animation block: Patone 2021's 38 and 145 per 10 million become 3.8 and 14.5 per million; McCarthy 2001's 30.4 per 100,000 becomes 304 per million; Mier-y-Teran-Romero 2018's 2.0 per 10,000 becomes 200 per million; Orlikowski 2011's 2.2 per 1,000 becomes 2,200 per million; Schonberger 1979's "just under one per 100,000" becomes ~10 per million. No other arithmetic was applied.
- `FDA-RSVGBS2025` is the one non-journal source. It is validated against FDA's own safety-communication page (Center for Biologics Evaluation and Research, content current as of 7 January 2025), which states the study design, the 1–42-day risk window, the 43–90-day control window, the Medicare population aged ≥65, the 9 and 7 excess cases per million doses, and FDA's causation caveat. It is kept because it is the regulatory action itself. openFDA's `drug/label` endpoint was queried for `openfda.brand_name:"Abrysvo"`, `openfda.brand_name:"Arexvy"`, free-text `abrysvo`, `arexvy` and `openfda.generic_name:"respiratory syncytial virus vaccine"`, and all five returned `NOT_FOUND`: CBER-regulated vaccine labels are not in that dataset.
- Full-text access: Leonhard2019 was read in full from Europe PMC (PMC6821638) for the two-thirds figure, the six-pathogen list, the vaccine and immunobiological paragraphs, and the revaccination guidance. Cao-Lormeau2016's Europe PMC full text (PMC5444521) returned an empty body, so all its numbers come from the PubMed abstract. The Hanson 2022 abstract is truncated by PubMed at the Ad26-versus-mRNA rate ratio, which is therefore not quoted.
- Nothing in this file is marked (unverified). Items considered and dropped for lack of a traceable source: a GBS risk estimate specific to EBV infection per exposure; any incidence (as opposed to disproportionality) figure for checkpoint-inhibitor-associated GBS; the 2023 revaccination guidance referred to in the brief, which I could not locate as a distinct validated publication (Top 2015 Canadian paediatric surveillance and the Leonhard 2019 guideline paragraph are cited instead); and a *Mycoplasma*-specific per-infection risk.
- Evidence labels: (Established) is used for carbohydrate mimicry as a cause of anti-ganglioside neuropathy, for complement as the effector, and for the small adenoviral-vector and RSV vaccine signals; (Early evidence) for RSV disease as a trigger, surgery, malignancy and checkpoint inhibitors, and for the genetic polymorphism findings; (Hypothesis) for the Zika mechanism, familial genetics, the endoneurial-ischaemia contribution, the role of T cells, and AIDP's target antigen.
- Outcome and risk figures in this file are population statistics from cohorts, registries and self-controlled case series; they describe groups, not what will happen to an individual.
