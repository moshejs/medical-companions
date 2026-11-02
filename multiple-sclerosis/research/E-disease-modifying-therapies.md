# E. Disease-modifying therapies (DMTs)

This pass covers the disease-modifying therapies for multiple sclerosis: their mechanisms, pivotal trials (endpoint, comparator, timepoint, absolute and relative effects), first US approvals, label indications and dosing, adverse events, label-required monitoring, pregnancy and lactation statements, the treatment strategy literature (guidelines, escalation versus early high-efficacy therapy, stopping, switching and rebound), and vaccination on DMTs. Trial numbers come from PubMed or Europe PMC abstracts. Label statements come from the current US labels in openFDA (effective dates 2024–2026). First US approval dates come from openFDA Drugs@FDA submission records (the "ORIG" approval, or the multiple sclerosis efficacy supplement where the licence predates MS use).

Access notes:
- Tysabri's own label is not in the openFDA label endpoint, so natalizumab label statements come from the biosimilar Tyruko label, which carries the same natalizumab class wording and PML table.
- Ocrevus Zunovo's label is also missing from that endpoint. Drugs@FDA confirms its approval date, and its dose comes from OCARINA II.
- ECTRIMS/EAN 2018 wording is quoted from the authors' accepted manuscript on UCL Discovery. The publisher versions (Mult Scler; Eur J Neurol) were paywalled.
- AAN 2018 wording is quoted from the AAN's official clinician summary PDF of the guideline.
- I found no published results for DELIVER-MS or TREAT-MS as of 2026-10-20.
- I did not search Israeli Ministry of Health approvals and give none.

Shared keys: Montalban2018 (PMID 29353550), RaeGrant2018 (29686116), Hauser2017 (28002679), Montalban2017 (28002688) and Polman2006 (16510744) were each checked and are correct. Reich2018 was not cited because I read no numbers from it.

Two corrections to the brief:
- The FDA's alemtuzumab stroke safety communication is dated 29 November 2018 in every source found, not 2019. The FDA page now returns 404, so that date is unverified. The EMA restriction was 2019 (CHMP opinion 14 November 2019, Commission decision 16 January 2020).
- The marketed ozanimod dose is labelled 0.92 mg. The trials call the same dose "1 mg" (as ozanimod hydrochloride).

## Facts

### Overview: classes and mechanisms (one line each)
- Interferon beta-1b and -1a (including peginterferon beta-1a) are injectable interferons, and the labels state that the mechanism in MS is unknown [BetaseronLabel2026].
- Glatiramer acetate is a mixture of synthetic polypeptides "thought to act by modifying immune processes"; the label says the mechanism is not fully understood [CopaxoneLabel2026].
- Teriflunomide inhibits dihydroorotate dehydrogenase, a mitochondrial enzyme of de novo pyrimidine synthesis, and may reduce the number of activated lymphocytes in the CNS [AubagioLabel2026].
- Dimethyl fumarate and its metabolite monomethyl fumarate activate the Nrf2 oxidative-stress pathway. The therapeutic mechanism in MS is unknown. Diroximel fumarate is converted to the same active metabolite [TecfideraLabel2025; VumerityLabel2025].
- The sphingosine 1-phosphate (S1P) receptor modulators stop lymphocytes leaving lymph nodes and so lower blood lymphocyte counts. They differ in receptor selectivity: fingolimod-phosphate binds S1P1,3,4,5; siponimod and ozanimod bind S1P1 and S1P5; ponesimod binds S1P1 [GilenyaLabel2026; MayzentLabel2026; ZeposiaLabel2026; PonvoryLabel2025].
- Cladribine is a purine antimetabolite thought to deplete B and T lymphocytes by impairing DNA synthesis [MavencladLabel2026].
- Natalizumab binds the α4 subunit of α4β1 and α4β7 integrins and blocks leukocyte adhesion to VCAM-1 on activated endothelium [TyrukoLabel2025].
- Ocrelizumab, ofatumumab and ublituximab are CD20-directed antibodies that lyse pre-B and mature B cells by antibody-dependent and complement-mediated cytolysis [OcrevusLabel2026; KesimptaLabel2026; BriumviLabel2026].
- Alemtuzumab binds CD52 on T and B lymphocytes, NK cells, monocytes and macrophages and causes cytolysis [LemtradaLabel2025].
- Tolebrutinib is an oral, brain-penetrant Bruton's tyrosine kinase (BTK) inhibitor that targets B cells and myeloid cells, including microglia [Fox2025].

### First US approvals and label indications
- First FDA approval dates (Drugs@FDA) for the self-injectables:
  - interferon beta-1b (Betaseron): 23 Jul 1993
  - IM interferon beta-1a (Avonex): 17 May 1996
  - glatiramer acetate (Copaxone): 20 Dec 1996
  - SC interferon beta-1a (Rebif): 7 Mar 2002
  - peginterferon beta-1a (Plegridy): 15 Aug 2014 [FDA2026Approvals]
- First FDA approval dates for the orals:
  - fingolimod: 21 Sep 2010
  - teriflunomide: 12 Sep 2012
  - dimethyl fumarate: 27 Mar 2013
  - siponimod: 26 Mar 2019
  - cladribine tablets (Mavenclad): 29 Mar 2019
  - diroximel fumarate: 29 Oct 2019
  - ozanimod: 25 Mar 2020
  - ponesimod: 18 Mar 2021 [FDA2026Approvals]
- First FDA approval dates for the infused and injected antibodies:
  - natalizumab (Tysabri): 23 Nov 2004, with a further efficacy supplement approved 5 Jun 2006
  - alemtuzumab MS efficacy supplement (Lemtrada): 14 Nov 2014
  - ocrelizumab IV: 28 Mar 2017
  - ofatumumab MS efficacy supplement (Kesimpta): 20 Aug 2020
  - ublituximab: 28 Dec 2022
  - biosimilar natalizumab-sztn (Tyruko): 24 Aug 2023
  - subcutaneous ocrelizumab with hyaluronidase (Ocrevus Zunovo): 13 Sep 2024 [FDA2026Approvals]
- In the EU, Tysabri was first authorised on 27 June 2006 for "highly active relapsing remitting multiple sclerosis" (despite at least one DMT, or rapidly evolving severe disease). This is narrower than the US "relapsing forms" wording [EMATysabri2026].
- The current US labels share one indication: "relapsing forms of multiple sclerosis (MS), to include clinically isolated syndrome, relapsing-remitting disease, and active secondary progressive disease, in adults." Labels with this wording:
  - interferons, glatiramer acetate, teriflunomide
  - dimethyl fumarate, diroximel fumarate
  - siponimod, ozanimod, ponesimod
  - ofatumumab, ublituximab, natalizumab-sztn
  [AubagioLabel2026; MayzentLabel2026; KesimptaLabel2026; BriumviLabel2026; TyrukoLabel2025]
- Fingolimod has the same relapsing-forms indication but extends it to patients 10 years and older [GilenyaLabel2026].
- Ocrelizumab is the only label here that includes primary progressive MS in adults. It also covers relapsing forms in adults, and relapsing-remitting MS in children aged 10 and older who weigh at least 25 kg [OcrevusLabel2026].
- Alemtuzumab and cladribine leave out clinically isolated syndrome and are positioned later in the sequence:
  - Alemtuzumab "should generally be reserved for patients who have had an inadequate response to two or more drugs" [LemtradaLabel2025].
  - Cladribine is "generally recommended for patients who have had an inadequate response to, or are unable to tolerate, an alternate drug", and is "not recommended" in CIS [MavencladLabel2026].
- The mitoxantrone label covers secondary (chronic) progressive, progressive relapsing, or worsening relapsing-remitting MS, and states it is not indicated in primary progressive MS [MitoxantroneLabel2025].

### Interferons and glatiramer acetate
- **Established:** IFNB MS Study Group 1993 enrolled 372 patients with RRMS. Interferon beta-1b 8 MIU SC every other day lowered the 2-year annual exacerbation rate to 0.84 versus 1.27 on placebo (p=0.0001), about a one-third reduction. Exacerbation-free patients at 2 years: 36 versus 18 (p=0.007). No significant effect on EDSS was shown [IFNBMSSG1993].
- **Established:** PRISMS 1998 randomised 560 patients with RRMS. SC interferon beta-1a three times weekly lowered 2-year relapses to 1.82 per patient (22 µg) and 1.73 (44 µg) versus 2.56 on placebo. Risk reductions were 27% (95% CI 14–39) and 33% (21–44), with dose-related MRI benefit [PRISMS1998].
- **Established:** In MSCRG (Jacobs 1996; 301 patients), IM interferon beta-1a 30 µg weekly delayed sustained EDSS progression of at least 1.0 point (p=0.02). Kaplan–Meier progression at 104 weeks was 21.9% versus 34.9% on placebo, and annual exacerbation rate 0.61 versus 0.90 [Jacobs1996].
- **Established:** ADVANCE (1512 patients; peginterferon beta-1a 125 µg SC) at 48 weeks:
  - every 2 weeks: adjusted annualised relapse rate (ARR) 0.256 versus 0.397 on placebo (rate ratio 0.644, 95% CI 0.500–0.831)
  - every 4 weeks: ARR 0.288 (rate ratio 0.725, 0.565–0.930) [Calabresi2014]
- **Established:** Johnson 1995 (251 patients) tested copolymer 1 (glatiramer acetate) 20 mg SC daily. The 2-year relapse rate was 1.19 versus 1.68 on placebo, a 29% reduction (p=0.007; annualised 0.59 versus 0.84). A transient systemic post-injection reaction occurred in 15.2% versus 3.2% [Johnson1995].
- **Established:** GALA (Khan 2013; 1404 patients) tested glatiramer acetate 40 mg SC three times weekly over 12 months. Confirmed relapse risk fell 34.0% versus placebo (ARR 0.331 versus 0.505; p<0.0001). Injection-site reactions occurred in 35.5% versus 5.0% [Khan2013].
- Label dosing (self-injectables):
  - Betaseron: 0.25 mg SC every other day, titrated up over 6 weeks from 0.0625 mg
  - Avonex: 30 µg IM weekly, optional titration in 7.5 µg weekly steps
  - Rebif: 22 or 44 µg SC three times weekly, at least 48 hours apart
  - Plegridy: 125 µg SC or IM every 14 days after titration (63, then 94, then 125 µg)
  - Copaxone: 20 mg/mL daily or 40 mg/mL three times weekly at least 48 hours apart; the two strengths are "not interchangeable"
  [BetaseronLabel2026; AvonexLabel2025; RebifLabel2025; PlegridyLabel2025; CopaxoneLabel2026]
- Interferon beta labels list these warnings:
  - hepatic injury (monitor liver tests)
  - depression and suicide
  - injection-site reactions including necrosis
  - decreased blood counts (monitor CBC)
  - thrombotic microangiopathy, pulmonary arterial hypertension and congestive heart failure
  [BetaseronLabel2026; RebifLabel2025; AvonexLabel2025]
- The Copaxone label carries a boxed warning for anaphylaxis, which can occur "from as early as after the first dose, up to years" after starting. It also lists immediate post-injection reactions, lipoatrophy and skin necrosis [CopaxoneLabel2026].

### Teriflunomide
- **Established:** TEMSO (O'Connor 2011; 1088 patients; 108 weeks):
  - ARR 0.37 on either 7 mg or 14 mg versus 0.54 on placebo (relative reductions 31.2% and 31.5%)
  - 12-week confirmed disability progression 20.2% on 14 mg versus 27.3% on placebo (p=0.03); 21.7% on 7 mg (p=0.08, not significant) [OConnor2011]
- **Established:** TOWER (Confavreux 2014; 1169 patients):
  - ARR 0.32 (95% CI 0.27–0.38) on 14 mg versus 0.50 (0.43–0.58) on placebo
  - sustained disability: HR 0.68 (0.47–1.00) for 14 mg; no effect for 7 mg (HR 0.95, 0.68–1.35)
  - hair thinning 13% versus 4%; ALT increase 14% versus 8% [Confavreux2014]
- Label dosing is 7 mg or 14 mg orally once daily [AubagioLabel2026].
- The boxed warning covers hepatotoxicity and embryofetal toxicity. Labelled monitoring:
  - transaminases and bilirubin within 6 months before starting, then ALT at least monthly for 6 months
  - CBC before starting
  - screening for latent tuberculosis
  - blood pressure monitoring
  [AubagioLabel2026]
- Accelerated elimination per label: cholestyramine 8 g every 8 hours for 11 days, or 50 g activated charcoal every 12 hours for 11 days. Without it, clearance "may take as long as 2 years." Women who wish to become pregnant must stop and confirm a plasma teriflunomide level below 0.02 mg/L. Men wishing to father a child are told the same [AubagioLabel2026].
- The teriflunomide label states "women should not breastfeed during treatment" [AubagioLabel2026].

### Fumarates
- **Established:** DEFINE (Gold 2012) tested dimethyl fumarate 240 mg twice daily against placebo over 2 years:
  - proportion relapsing 27% versus 46%
  - ARR 0.17 versus 0.36 (53% relative reduction)
  - confirmed disability progression 16% versus 27% (38% relative reduction, p=0.005) [Gold2012]
- **Established:** CONFIRM (Fox 2012) at 2 years: ARR 0.22 on dimethyl fumarate twice daily versus 0.40 on placebo (44% reduction). The reference arm, glatiramer acetate, reached 0.29 (29% reduction). Reductions in disability progression were not significant for any arm (21%, 24%, 7%) [Fox2012].
- **Established:** EVOLVE-MS-2 (Naismith 2020) was a 5-week head-to-head tolerability study of diroximel fumarate 462 mg versus dimethyl fumarate 240 mg, both twice daily:
  - days with GI symptom intensity ≥2 cut by 46% (rate ratio 0.54, 95% CI 0.39–0.75)
  - GI adverse events 34.8% versus 49.0%
  - discontinuation for GI adverse events 0.8% versus 4.8% [Naismith2020]
- Label dosing:
  - dimethyl fumarate: 120 mg twice daily for 7 days, then 240 mg twice daily
  - diroximel fumarate: 231 mg twice daily for 7 days, then 462 mg twice daily
  - non-enteric-coated aspirin up to 325 mg 30 minutes before a dose "may reduce" flushing [TecfideraLabel2025; VumerityLabel2025]
- The fumarate labels require a CBC with lymphocyte count before starting, after 6 months, and every 6–12 months thereafter. They advise considering interruption if lymphocytes stay below 0.5 × 10⁹/L for more than 6 months, and list PML and liver injury as warnings [TecfideraLabel2025; VumerityLabel2025].

### S1P receptor modulators
- **Established:** FREEDOMS (Kappos 2010; 1272 patients; 24 months):
  - ARR 0.18 on fingolimod 0.5 mg versus 0.40 on placebo
  - disability progression: HR 0.70 (cumulative probability 17.7% versus 24.1%) [Kappos2010]
- **Established:** TRANSFORMS (Cohen 2010; 1292 patients; 12 months) compared fingolimod 0.5 mg with IM interferon beta-1a:
  - ARR 0.16 (95% CI 0.12–0.21) versus 0.33 (0.26–0.42)
  - no significant difference in disability
  - two fatal herpesvirus infections, both on the unapproved 1.25 mg dose [Cohen2010]
- **Established:** EXPAND (Kappos 2018) enrolled 1651 patients with SPMS; 64% had no relapse in the prior 2 years. 3-month confirmed disability progression occurred in 26% on siponimod 2 mg versus 32% on placebo (HR 0.79, 95% CI 0.65–0.95; relative risk reduction 21%) [Kappos2018].
- **Established:** SUNBEAM (Comi 2019; at least 12 months) compared ozanimod 1 mg with IM interferon beta-1a: ARR 0.18 versus 0.35 (rate ratio 0.52, 95% CI 0.41–0.66) [Comi2019].
- **Established:** RADIANCE (Cohen 2019; 24 months), same comparison: ARR 0.17 versus 0.28 (rate ratio 0.62, 0.51–0.77). Neither trial reported symptomatic first-dose bradycardia or second- or third-degree AV block on ozanimod [Cohen2019].
- **Established:** OPTIMUM (Kappos 2021; 1133 patients; 108 weeks) compared ponesimod 20 mg with teriflunomide 14 mg:
  - ARR 0.202 versus 0.290 (30.5% relative reduction)
  - NEDA-3 25.0% versus 16.4%
  - 12-week confirmed disability accumulation 10.1% versus 12.4% (not significant, p=0.29) [Kappos2021]
- Fingolimod label dosing and first-dose monitoring:
  - 0.5 mg once daily (0.25 mg if 40 kg or less)
  - observe every patient for bradycardia for at least 6 hours after the first dose, with hourly pulse and blood pressure and an ECG before and after
  - repeat this after an interruption of more than 14 days [GilenyaLabel2026]
- Fingolimod label pre-treatment and ongoing monitoring:
  - CBC; transaminases and bilirubin within 6 months; VZV antibodies (vaccinate if negative)
  - fundus examination at baseline and again at 3–4 months
  - skin examination [GilenyaLabel2026]
- Macular oedema in the 2-year fingolimod trials (label): 0.5% (4/783) on 0.5 mg, 1.5% on 1.25 mg and 0.4% on placebo, mostly within the first 3–4 months [GilenyaLabel2026].
- Siponimod label: CYP2C9 genotyping is required before starting.
  - CYP2C9*3/*3 is a contraindication.
  - *1/*3 and *2/*3 carriers take a 1 mg maintenance dose instead of 2 mg.
  - Titration is required; first-dose monitoring is recommended for pre-existing bradycardia, conduction block, prior MI or heart failure. [MayzentLabel2026]
- Ozanimod label: titration of 0.23 mg on days 1–4, 0.46 mg on days 5–7, then 0.92 mg from day 8. Ponesimod: 14-day titration from 2 mg to 20 mg. Both labels require a baseline ECG and CBC [ZeposiaLabel2026; PonvoryLabel2025; Kappos2021].
- All four S1P labels warn of a "severe increase in disability" after stopping. The siponimod and ozanimod labels say severe exacerbation "including disease rebound" has been "rarely reported" after stopping an S1P modulator [GilenyaLabel2026; MayzentLabel2026; ZeposiaLabel2026].
- **Early evidence:** In a UCSF case series (Hatcher 2016), 5 of 46 patients (10.9%) who stopped fingolimod had severe rebound relapses 4–16 weeks later. The median was 9 new gadolinium-enhancing lesions, and new lesions persisted for 3–6 months despite steroids or B-cell depletion [Hatcher2016].

### Cladribine tablets
- **Established:** CLARITY (Giovannoni 2010; 1326 patients; 96 weeks) compared cumulative 3.5 mg/kg with placebo:
  - ARR 0.14 versus 0.33
  - relapse-free 79.7% versus 60.9%
  - 3-month sustained disability progression HR 0.67 (95% CI 0.48–0.93)
  - lymphocytopenia as an adverse event in 21.6% versus 1.8% [Giovannoni2010]
- Label dosing: cumulative 3.5 mg/kg orally, split into 2 yearly treatment courses of 1.75 mg/kg. Each course has 2 cycles of 1–2 tablets daily for 4 or 5 consecutive days. No further cladribine is given in the following 2 years, because "Treatment during these 2 years may further increase the risk of malignancy" [MavencladLabel2026].
- Label lymphocyte rules: counts must be normal before course 1 and at least 800 cells/µL before course 2. Course 2 can be delayed up to 6 months; if recovery takes longer, no further cladribine is given [MavencladLabel2026].
- In the label, 87% of treated patients had lymphopenia. On 3.5 mg/kg, nadir counts fell below 500 cells/µL in 26% and below 200 in 1%, and median recovery to at least 800 cells/µL took about 28 weeks [MavencladLabel2026].
- Malignancies occurred in 0.27 events per 100 patient-years on cladribine. The boxed warning covers malignancy and teratogenicity [MavencladLabel2026].
- **Established:** Cochrane 2026 (Celani), comparing cladribine with placebo:
  - "likely reduces" new relapses (RR 0.53, 95% CI 0.45–0.62; moderate certainty)
  - "may have little to no effect" on freedom from disability worsening to 24 months (RR 1.05, 0.96–1.16; low certainty) [Celani2026]

### Natalizumab
- **Established:** AFFIRM (Polman 2006; 942 patients) compared natalizumab 300 mg IV every 4 weeks with placebo:
  - sustained disability progression over 2 years cut by 42% (HR 0.58, 95% CI 0.43–0.77; 17% versus 29%)
  - relapse rate at 1 year 68% lower
  - new or enlarging T2 lesions 83% fewer [Polman2006]
- **Established:** SENTINEL (Rudick 2006; 1171 patients) added natalizumab to interferon beta-1a:
  - ARR 0.34 versus 0.75
  - disability progression HR 0.76 (0.61–0.96)
  - two cases of PML, one fatal [Rudick2006]
- **Established:** In a post hoc AFFIRM analysis, 37% on natalizumab versus 7% on placebo were free of combined clinical and radiological disease activity over 2 years (difference 29.5%, 95% CI 24.7–34.3%). This is the first use of what later became NEDA-3 [Havrdova2009].
- **Established:** Bloomgren 2012: as of 29 Feb 2012 there were 212 confirmed PML cases among 99,571 natalizumab-treated patients (2.1 per 1000).
  - All 54 PML cases with earlier samples were anti-JCV antibody positive.
  - Lowest risk: antibody-negative, ≤0.09 per 1000 (95% CI 0–0.48).
  - Highest risk: antibody-positive, prior immunosuppressant, 25–48 months of treatment, 11.1 per 1000 (8.3–14.5). [Bloomgren2012]
- **Established:** Ho 2017 pooled four cohorts (37,249 patients; 156 PML cases):
  - anti-JCV negative: below 0.07 per 1000 (95% CI 0.00–0.40)
  - antibody-positive, 6-year cumulative probability: 2.7% (1.8–4.0) with prior immunosuppressants and 1.7% (1.4–2.1) without [Ho2017]
- **Established:** Ho 2017 annual risk per 1000 for antibody-positive patients without prior immunosuppressants, by antibody index:
  - index ≤0.9: 0.01 in year 1 to 0.6 in year 6
  - index >0.9 to 1.5: 0.1 to 3.0
  - index >1.5: 0.2 to 10.0 [Ho2017]
- The natalizumab label table (US postmarketing data, about 100,000 patients) gives PML incidence by anti-JCV status and treatment duration:

  | Natalizumab exposure | Antibody-negative | Positive, no prior immunosuppressant | Positive, prior immunosuppressant |
  |---|---|---|---|
  | Any duration | 1/10,000 | | |
  | 1–24 months | | <1/1000 | 1/1000 |
  | 25–48 months | | 2/1000 | 6/1000 |
  | 49–72 months | | 4/1000 | 7/1000 |
  | 73–96 months | | 2/1000 | 6/1000 |

  [TyrukoLabel2025]
- Label dosing is 300 mg IV over one hour every 4 weeks, prescribed only within a REMS programme. The boxed warning names anti-JCV antibodies, treatment duration and prior immunosuppressant use as PML risk factors [TyrukoLabel2025].
- **Established:** NOVA (Foley 2022; 499 patients stable for at least 12 months on 4-weekly natalizumab) compared switching to 6-weekly dosing with staying on 4-weekly. New or newly enlarging T2 lesions at week 72:
  - primary estimand: 0.20 versus 0.05 (mean lesion ratio 4.24, 95% CI 0.86–20.85; p=0.076)
  - secondary estimand: 0.31 versus 0.06 (ratio 4.93, 1.05–23.20; p=0.044)
  - two outlier patients drove most of the excess
  - one asymptomatic PML case occurred in the 6-weekly arm [Foley2022]
- **Established:** Antelope (Hemmer 2023; 264 patients with JCV index ≤1.5) compared biosimilar PB006 with reference natalizumab. The difference in cumulative new active lesions over 24 weeks was 0.17 (95% CI −0.61 to 0.94), inside the ±2.1 equivalence margin. This trial supported Tyruko's 2023 approval [Hemmer2023; FDA2026Approvals].
- Subcutaneous natalizumab (two 150 mg/mL syringes, 300 mg every 4 weeks) was reportedly authorised in the EU in 2021. The FDA issued a complete response letter for the SC supplement on 28 April 2021 (unverified; company and press reports only) [Biogen2021].
- **Established:** RESTORE (Fox 2014; 175 patients relapse-free on natalizumab) randomised patients to a 24-week interruption. MRI activity returned in 0% who continued versus 46% on placebo. Relapses occurred in 4% who continued versus 15–29% in the other arms, from 4–8 weeks after the last dose [Fox2014].

### Anti-CD20 therapies
- **Established:** OPERA I/II (Hauser 2017; 1656 patients; 96 weeks) compared ocrelizumab 600 mg IV every 24 weeks with SC interferon beta-1a 44 µg:
  - ARR 0.16 versus 0.29 in both trials (46% and 47% lower)
  - pooled 12-week confirmed disability progression 9.1% versus 13.6% (HR 0.60, 95% CI 0.45–0.81)
  - infusion reactions 34.3% [Hauser2017]
- **Established:** ORATORIO (Montalban 2017; 732 patients with PPMS) compared ocrelizumab with placebo:
  - 12-week confirmed disability progression 32.9% versus 39.3% (HR 0.76, 95% CI 0.59–0.98)
  - 24-week: 29.6% versus 35.7% (HR 0.75, 0.58–0.98)
  - neoplasms 2.3% versus 0.8% [Montalban2017]
- Ocrelizumab label dosing:
  - 300 mg IV, then 300 mg two weeks later, then 600 mg IV every 6 months
  - premedication with methylprednisolone and an antihistamine
  - before starting: hepatitis B screening, quantitative immunoglobulins and liver tests
  - infusion reactions in 48% in the paediatric trial versus 24% on fingolimod plus placebo infusion [OcrevusLabel2026]
- **Established:** OCARINA II (Newsome 2025; 236 patients) found SC ocrelizumab 920 mg every 24 weeks non-inferior to 600 mg IV on drug exposure (AUC weeks 1–12 geometric mean ratio 1.29, 90% CI 1.23–1.35). Injection reactions occurred in 51.5%, all mild or moderate. SC ocrelizumab (Ocrevus Zunovo) was FDA-approved on 13 Sep 2024 [Newsome2025; FDA2026Approvals].
- **Established:** ASCLEPIOS I/II (Hauser 2020; 1882 patients) compared ofatumumab 20 mg SC with teriflunomide 14 mg:
  - ARR 0.11 versus 0.22 (difference −0.11, 95% CI −0.16 to −0.06) and 0.10 versus 0.25 (−0.15, −0.20 to −0.09)
  - pooled 3-month confirmed disability worsening 10.9% versus 15.0% (HR 0.66)
  - serious infections 2.5% versus 1.8% [Hauser2020Ofatumumab]
- Ofatumumab label dosing: 20 mg SC at weeks 0, 1 and 2, then monthly from week 4, with hepatitis B screening and immunoglobulin measurement first [KesimptaLabel2026].
- **Established:** ULTIMATE I/II (Steinman 2022; 1094 patients; 96 weeks) compared ublituximab with teriflunomide:
  - ARR 0.08 versus 0.19 (rate ratio 0.41, 95% CI 0.27–0.62) and 0.09 versus 0.18 (0.51, 0.33–0.78)
  - 12-week disability worsening 5.2% versus 5.9%, not significant (HR 0.84, 0.50–1.41)
  - infusion reactions 47.7%; serious infections 5.0% versus 2.9% [Steinman2022]
- Ublituximab label dosing: 150 mg IV, then 450 mg two weeks later, then 450 mg every 24 weeks. Patients are observed for at least one hour after the first two infusions [BriumviLabel2026].
- **Established:** RIFUND-MS (Svenningsson 2022; 200 patients; Sweden) tested off-label rituximab 1000 mg IV then 500 mg every 6 months against dimethyl fumarate. Protocol-defined relapse over 24 months occurred in 3% versus 16% (risk ratio 0.19, 95% CI 0.06–0.62). Rituximab is not approved for MS [Svenningsson2022].
- **Early evidence:** Kallin 2026 (Swedish MS register; 13,748 treatment starts in relapsing-remitting MS, 2011–2023, matched to 61,065 general-population episodes) found a crude inflammatory bowel disease incidence of 110 per 100,000 person-years on rituximab (95% CI 76–147), 13 (3–30) on natalizumab, dimethyl fumarate or fingolimod, and 41 (34–48) in the general population. The adjusted HR for the comparator drugs versus rituximab was 0.10 (0.04–0.22); 62% of cases on rituximab were Crohn disease versus 29% in the general population; number needed to harm at 5 years 131 (93–228). Only rituximab was studied [Kallin2026].
- The anti-CD20 labels recommend:
  - monitoring immunoglobulins at the start, during treatment and after stopping until B cells recover
  - considering stopping for serious opportunistic or recurrent infections or prolonged hypogammaglobulinaemia
  - no live or live-attenuated vaccines during treatment or until B-cell repletion
  [OcrevusLabel2026; KesimptaLabel2026; BriumviLabel2026]

### Alemtuzumab
- **Established:** CARE-MS I (Cohen 2012; treatment-naive) compared alemtuzumab 12 mg/day (5 days, then 3 days at 12 months) with SC interferon beta-1a:
  - relapse rate ratio 0.45 (95% CI 0.32–0.63); relapse-free at 2 years 78% versus 59%
  - sustained disability 8% versus 11%, not significant (HR 0.70, 0.40–1.23)
  - thyroid adverse events 18%; immune thrombocytopenia 1% by 24 months [Cohen2012]
- **Established:** CARE-MS II (Coles 2012; relapse despite first-line therapy) compared alemtuzumab with interferon beta-1a:
  - relapse rate ratio 0.51 (0.39–0.65)
  - sustained disability 13% versus 20% (HR 0.58, 0.38–0.87)
  - infusion reactions 90%; thyroid disorders 16% [Coles2012]
- The label boxed warning covers autoimmunity, infusion reactions, stroke and malignancies. Across controlled and extension studies the label reports:
  - thyroid disorders 36.8%, with new cases more than 7 years after the first dose
  - immune thrombocytopenia 2% [LemtradaLabel2025]
- Label monitoring:
  - CBC with differential, serum creatinine and urinalysis with cell counts monthly until 48 months after the last infusion
  - thyroid function every 3 months for the same period
  - antiviral herpes prophylaxis for at least 2 months after each course
  - baseline and yearly skin examination [LemtradaLabel2025]
- The boxed warning reports serious stroke, ischaemic or haemorrhagic, "within 3 days" of administration [LemtradaLabel2025].
- EMA Article 20 review (CHMP 14 Nov 2019; Commission 16 Jan 2020) narrowed Lemtrada in the EU:
  - restricted to highly active RRMS despite at least one DMT, or rapidly evolving severe disease
  - new contraindications including prior angina, myocardial infarction, stroke, cervicocephalic arterial dissection and uncontrolled hypertension
  - infusion only in hospitals with ready access to intensive care [EMALemtrada2020]

### Mitoxantrone (historic)
- **Established:** MIMS (Hartung 2002; 194 patients with worsening RRMS or SPMS) tested mitoxantrone 12 mg/m² every 3 months for 24 months. It improved the multivariate primary outcome versus placebo (difference 0.30, 95% CI 0.17–0.44) and EDSS change (0.24, 0.04–0.44) [Hartung2002].
- Label limits:
  - no dosing if LVEF is below 50% or cumulative lifetime dose exceeds 140 mg/m²
  - LVEF assessed before every dose
  - congestive heart failure "may occur ... months to years after termination"
  - therapy "increases the risk of developing secondary acute myeloid leukemia" [MitoxantroneLabel2025]
- AAN 2018 (Level B): "clinicians should not prescribe mitoxantrone to people with MS unless the potential therapeutic benefits greatly outweigh the risks," citing cardiomyopathy, ovarian failure and promyelocytic leukaemia [RaeGrant2018].

### BTK inhibitors (regulatory status only; results belong to pass G)
- **Established:** HERCULES (Fox 2025; 1131 participants with non-relapsing SPMS) compared tolebrutinib 60 mg daily with placebo. 6-month confirmed disability progression occurred in 22.6% versus 30.7% (HR 0.69, 95% CI 0.55–0.88). ALT above 3× the upper limit occurred in 4.0% versus 1.6% [Fox2025].
- **Established:** GEMINI 1/2 (Oh 2025): tolebrutinib was not superior to teriflunomide on ARR (0.13 versus 0.12; 0.11 versus 0.11) [Oh2025].
- FDA status: Sanofi announced on 24 Dec 2025 that the FDA had issued a complete response letter for tolebrutinib in non-relapsing SPMS. Press reports say the letter cited drug-induced liver injury risk (unverified detail) [Sanofi2025].
- EU status: the CHMP gave a positive opinion on 23 Apr 2026, and the EU marketing authorisation for Cenrifki (tolebrutinib 60 mg) was issued on 19 Jun 2026. The indication is adults with SPMS "without relapses in the last 2 years," and the product is under additional monitoring [EMACenrifki2026].
- On 30 Sep 2026 the FDA accepted Roche's new drug application for fenebrutinib in relapsing MS and PPMS under priority review. No decision had been made by 2026-10-20 [Roche2026].

### Treatment strategy: guidelines
- ECTRIMS/EAN 2018 produced 21 recommendations using GRADE. Wording of the starting recommendations:
  - R2 (strong): "Offer interferon or glatiramer acetate to patients with CIS and an abnormal MRI with lesions suggestive of MS who do not fulfil criteria for MS"
  - R3 (strong): "Offer early treatment with DMDs to patients with active relapsing-remitting MS as defined by clinical relapses and/or MRI activity" [Montalban2018]
- ECTRIMS/EAN 2018 R14 (strong): "Offer a more efficacious drug to patients treated with interferon or glatiramer acetate who show evidence of disease activity." R16 (consensus) adds that when a highly efficacious drug is stopped, clinicians should "consider starting another highly efficacious drug," weighing half-life and "the potential for resumed disease activity or even rebound (particularly with natalizumab)" [Montalban2018].
- ECTRIMS/EAN 2018 recommendations for progressive MS (all weak):
  - R5: interferon-1a (SC) or -1b for active SPMS, noting "the dubious efficacy"
  - R6: mitoxantrone for active SPMS
  - R7: ocrelizumab or cladribine for active SPMS
  - R8: ocrelizumab for PPMS [Montalban2018]
- ECTRIMS/EAN 2018 R11 (consensus) on monitoring response: take a reference brain MRI "usually within six months of treatment onset" and compare it with one "typically 12 months after starting treatment." R13: MRI every 3–6 months for patients at high PML risk (JCV positive, natalizumab beyond 18 months) [Montalban2018].
- AAN 2018 produced 30 recommendations: 17 on starting, 10 on switching and 3 on stopping. Starting Recommendation 9 (Level B): "Clinicians should offer DMTs to people with relapsing forms of MS with recent clinical relapses or MRI activity" [RaeGrant2018].
- AAN 2018 recommendations on CIS:
  - Starting Rec 7 (Level B): clinicians should prescribe DMT to people with a single demyelinating event and two or more characteristic brain lesions "who decide they want this therapy."
  - Starting Rec 8 (Level C): clinicians may follow untreated, inactive CIS or relapsing MS with at least annual imaging for five years instead [RaeGrant2018]
- AAN 2018 recommendations on higher-efficacy and progressive disease:
  - Starting Rec 14 (Level B): "Clinicians should prescribe alemtuzumab, fingolimod, or natalizumab for people with MS with highly active MS."
  - Starting Rec 17 (Level B): "Clinicians should offer ocrelizumab to people with PPMS who are likely to benefit from this therapy unless there are risks of treatment that outweigh the benefits." [RaeGrant2018]
- AAN 2018 defines breakthrough disease in Switching Rec 1 (Level B): clinicians should discuss switching in adherent patients on a DMT long enough to take full effect who have "one or more relapses, two or more unequivocally new MRI-detected lesions, or increased disability on examination, over a one-year period" [RaeGrant2018].
- AAN 2018 notes that "current evidence supports higher efficacy of alemtuzumab, natalizumab, fingolimod, and ocrelizumab compared with previously approved self-injectable DMTs." It gives PML risk on natalizumab after 25–36 months without prior immunosuppression as 0.2/1000 (index ≤0.9), 0.3/1000 (0.9–1.5) and 3/1000 (>1.5) [RaeGrant2018].
- **Established:** NEDA (no evident disease activity) was proposed as a treat-to-target goal in 2015, with a rebaselining MRI after the DMT takes effect and at least annual MRI. The trial version, NEDA-3, means no relapses, no sustained disability progression and no new or enlarging T2 or gadolinium-enhancing lesions [Giovannoni2015; Havrdova2009].
- The 2021 MAGNIMS-CMSC-NAIMS MRI consensus names 3D FLAIR as the core brain sequence for detecting new lesions when monitoring treatment effect, and recommends judicious use of gadolinium [Wattjes2021].
- **Established:** The Cochrane network meta-analysis update (Gonzalez-Lorenzo 2024; 50 RCTs, 36,541 participants) reported high certainty that natalizumab, cladribine and alemtuzumab reduce relapses over 24 months versus placebo, with relative risks of people relapsing:
  - cladribine RR 0.53 (0.44–0.64)
  - alemtuzumab RR 0.57 (0.47–0.68)
  - natalizumab RR 0.56 (0.48–0.65) [GonzalezLorenzo2024]
- **Established:** In the same review, glatiramer acetate (RR 0.84) and interferon beta-1a (RR 0.84) produced moderate reductions (moderate certainty). The authors note that over half of the trials were industry-sponsored and that evidence beyond 2 years is insufficient [GonzalezLorenzo2024].
- No 2024–2026 update of the ECTRIMS/EAN or AAN DMT guidelines was found. The newest consensus found is an Italian Delphi (Filippi 2025; 65 neurologists) with strong consensus "to support early HE-DMT initiation to prevent irreversible disability" [Filippi2025].

### Escalation versus early high-efficacy therapy
- **Early evidence:** Harding 2019 (Wales cohort; 592 patients) compared early intensive therapy with escalation:
  - 5-year EDSS change 0.3 versus 1.2 (adjusted β −0.85, 95% CI −1.38 to −0.32)
  - 60% of the patients who escalated developed sustained disability before escalation [Harding2019]
- **Early evidence:** He 2020 (MSBase and Swedish registries; 213 versus 253 matched patients) compared starting high-efficacy therapy within 2 years of onset with starting at 4–6 years. Mean EDSS at year 10 was 2.3 versus 3.5, an adjusted difference of −0.98 (95% CI −1.51 to −0.45) over years 6–10 [He2020].
- **Early evidence:** Brown 2019 (JAMA; 1555 propensity-matched patients) found that initial fingolimod, alemtuzumab or natalizumab carried a lower hazard of conversion to SPMS than initial interferon or glatiramer acetate (HR 0.66, 95% CI 0.44–0.99; 5-year absolute risk 7% versus 12%). Escalating within 5 years versus later gave HR 0.76 (0.66–0.88) [Brown2019].
- **Early evidence:** Spelman 2021 compared national strategies. 34.5% of Swedish versus 7.6% of Danish patients started a highly effective DMT, and the Swedish strategy was associated with less 24-week confirmed disability worsening (HR 0.71, 95% CI 0.57–0.90) [Spelman2021].
- DELIVER-MS (NCT03535298) is a pragmatic randomised trial with a parallel observational cohort. Its primary outcome is brain volume loss from baseline to month 36, and it compares early high-efficacy monoclonal antibodies with escalation [Ontaneda2020; NCT03535298].
- DELIVER-MS enrolled 816 people. In the observational arm, 67% chose early high-efficacy therapy. The registry lists the trial as active, not recruiting, with primary completion estimated for July 2027, and no results [Tallantyre2026; NCT03535298].
- TREAT-MS (NCT03500328) randomised 900 treatment-naive people (mean age 36, mean EDSS 2.5) to higher-efficacy versus traditional DMT strategies. The primary outcome is sustained EDSS-plus worsening. The registry shows it completed in July 2026 with no results posted, and no outcome paper was found [Mowry2025; NCT03500328].

### Stopping, switching and rebound
- **Established:** DISCOMS (Corboy 2023; 259 patients aged 55 or older, with no relapse for 5 years and no new MRI lesion for 3 years) randomised them to stop or continue their DMT:
  - new disease activity over 2 years: 12.2% if stopped versus 4.7% if continued (difference 7.5 percentage points, 95% CI 0.6–15.0)
  - non-inferiority against the 8% margin could not be concluded
  - the authors say discontinuation "might be a reasonable option" in stable patients over 55 [Corboy2023]
- AAN 2018 stopping recommendations:
  - Level B: advocate that stable patients "continue their current DMT unless the patient and physician decide a trial off therapy is warranted"
  - Level C: clinicians may advise stopping in SPMS without relapses or gadolinium-enhancing lesions in people who have not been ambulatory (EDSS 7 or more) for at least 2 years [RaeGrant2018]
- ECTRIMS/EAN 2018 R18 (weak): "Consider continuing a DMD if a patient is stable (clinically and on MRI) and shows no safety or tolerability issues." R17 (weak) warns of "resumed disease activity or even rebound when stopping treatment, particularly with natalizumab" [Montalban2018].
- AAN 2018 Switching Rec 9:
  - Level A: physicians must counsel that relapse or MRI activity risk rises "within six months" of stopping natalizumab
  - Level B: when switching from natalizumab to fingolimod, start fingolimod "within eight to 12 weeks" (for reasons other than pregnancy) [RaeGrant2018]

### Pregnancy and lactation (label statements)
- **Interferon beta:** labels state that a large population-based cohort and decades of data "have not identified a drug-associated risk of major birth defects" with early-pregnancy exposure. Findings on low birth weight or miscarriage are "inconsistent." Low levels of interferon beta-1a have been described in human milk [RebifLabel2025; AvonexLabel2025; PlegridyLabel2025].
- **Glatiramer acetate:** decades of data "have not identified a drug-associated risk of major birth defects, miscarriage, or other adverse maternal or fetal outcomes." Breastfeeding "is not expected to result in clinically relevant exposure of the infant" [CopaxoneLabel2026].
- **Dimethyl fumarate:** the pregnancy registry and other data "have not indicated an increased risk of major birth defects, miscarriage." Most exposures were in the first trimester [TecfideraLabel2025].
- **Fingolimod:** registry data "suggest that use of GILENYA is associated with an increased prevalence of major birth defects," with limits on firm conclusions. Contraception is advised during treatment and for 2 months after stopping [GilenyaLabel2026].
- **Other S1P modulators:** contraception for 10 days after stopping siponimod, 3 months after ozanimod and 1 week after ponesimod [MayzentLabel2026; ZeposiaLabel2026; PonvoryLabel2025].
- **Teriflunomide:** contraindicated in pregnancy and in women of reproductive potential not using effective contraception [AubagioLabel2026].
- **Cladribine:** contraindicated in pregnancy. Contraception is required during dosing and for 6 months after the last dose of each course for women, or 14 weeks for men. Breastfeeding is contraindicated on a treatment day and for 10 days after the last dose [MavencladLabel2026].
- **Anti-CD20 antibodies:** labels advise contraception during treatment and for 6 months after the last dose. Transient B-cell depletion has been reported in infants exposed to other anti-CD20 antibodies in utero. For breastfeeding, human IgG is excreted in milk and the risk of infant B-cell depletion is "unknown" [OcrevusLabel2026; KesimptaLabel2026; BriumviLabel2026].
- **Natalizumab:** neonatal thrombocytopenia and anaemia have been reported, and the label recommends a CBC in exposed neonates. The drug "has been detected in human milk" [TyrukoLabel2025].
- **Alemtuzumab:** contraception during and for 4 months after each course. Neonatal Graves' disease from placental transfer of anti-thyroid antibodies has been reported [LemtradaLabel2025].
- ECTRIMS/EAN 2018 pregnancy recommendations:
  - R19 (consensus): DMDs "are not licensed during pregnancy, except glatiramer acetate 20 mg/ml"
  - R21 (weak): for persistent high activity, "natalizumab throughout pregnancy may be considered after full discussion," and alemtuzumab is an option for planned pregnancy if "a 4-month interval is strictly observed" before conception [Montalban2018]
- AAN 2018 Switching Rec 10 (Level B): clinicians should counsel stopping DMT before conception for planned pregnancies "unless the risk of MS activity during pregnancy outweighs the risk associated with the specific DMT" [RaeGrant2018].

### Vaccination on DMTs
- ECTRIMS/EAN 2023 vaccination consensus (53 recommendations), timing before starting immunosuppressive DMTs:
  - inactivated vaccines "ideally at least 2 weeks before treatment onset"
  - live attenuated vaccines "at least 4 weeks before treatment onset, 6 weeks for ocrelizumab and alemtuzumab" [OteroRomero2023]
- The same consensus says live attenuated vaccines can be used untreated or on interferon or glatiramer acetate. They "should be avoided" on these immunosuppressive therapies:
  - dimethyl fumarate, teriflunomide
  - S1P modulators, natalizumab
  - cladribine, alemtuzumab, anti-CD20 antibodies [OteroRomero2023]
- On 6-monthly anti-CD20 therapy, the consensus advises inactivated vaccines "at least 3 months after the last anti-CD20 treatment and 4–6 weeks before the next infusion." In VELOCE, responses on ocrelizumab were lower than in controls:
  - tetanus 23.9% versus 54.5%
  - 12 or more pneumococcal serotypes 37.3% versus 97.1% [OteroRomero2023]
- The fingolimod label says the drug "reduces the immune response to vaccination." Vaccination "may be less effective during and for up to 2 months after" stopping, and live attenuated vaccines should be avoided during and for 2 months after treatment [GilenyaLabel2026].
- The ocrelizumab label advises giving live vaccines at least 4 weeks, and non-live vaccines "whenever possible, at least 2 weeks," before starting [OcrevusLabel2026].

## Controversies
- Escalation or early high-efficacy therapy:
  - For early high-efficacy therapy: registry and cohort studies consistently favour it [Harding2019; He2020; Brown2019; Spelman2021], and an Italian Delphi strongly endorses it [Filippi2025].
  - Against firm conclusions: these studies are observational and open to confounding by indication. AAN 2018 called for research into early higher-potency versus stepped care [RaeGrant2018], and baseline DELIVER-MS data show milder disease among those willing to be randomised [Tallantyre2026].
  - Status: the randomised trials DELIVER-MS and TREAT-MS have no published results as of 2026-10-20 [NCT03535298; NCT03500328].
- Stopping DMT in older stable patients:
  - DISCOMS could not show non-inferiority of stopping; new activity was 12.2% versus 4.7% [Corboy2023].
  - AAN 2018 still allows a discontinuation trial or stopping in non-ambulatory SPMS [RaeGrant2018], and ECTRIMS/EAN 2018 favours continuing stable treatment [Montalban2018].
  - Status: a shared decision, with a small excess MRI risk reported.
- Extended-interval natalizumab dosing:
  - It is used to lower PML risk, and Ho 2017 shows strong dependence of risk on antibody index and duration [Ho2017].
  - NOVA showed a numerical (and, under one estimand, significant) increase in new lesions with 6-weekly dosing, driven by two outliers [Foley2022].
  - Status: the US label still states every 4 weeks [TyrukoLabel2025].
- Strength of the PPMS evidence for ocrelizumab:
  - The ORATORIO effect was modest (HR 0.76; upper CI 0.98) [Montalban2017].
  - AAN gives a Level B "should offer" [RaeGrant2018], while ECTRIMS/EAN gives a weak "consider" [Montalban2018].
- Tolebrutinib regulatory divergence:
  - The EU authorised it in June 2026 for SPMS without relapses in 2 years [EMACenrifki2026].
  - The FDA issued a complete response letter in December 2025 [Sanofi2025].
  - Both rest on the same HERCULES data, with a liver-enzyme signal [Fox2025].
- Disability benefit of some high-efficacy drugs:
  - CARE-MS I [Cohen2012] and ULTIMATE [Steinman2022] showed no significant disability benefit over their comparators.
  - CARE-MS II [Coles2012], OPERA [Hauser2017] and ASCLEPIOS [Hauser2020Ofatumumab] did.
  - Cochrane rates the cladribine disability evidence low certainty and possibly null [Celani2026], despite the CLARITY HR of 0.67 [Giovannoni2010].
- Off-label rituximab:
  - RIFUND-MS showed superiority over dimethyl fumarate [Svenningsson2022].
  - Rituximab remains unapproved for MS in the US and EU; AAN 2018 lists it only in the PML counselling context [RaeGrant2018].
- Siponimod label versus trial population:
  - EXPAND enrolled a population in which 64% had no relapses in the prior 2 years, with a 21% relative risk reduction [Kappos2018].
  - The US label covers only "active secondary progressive disease" within relapsing forms [MayzentLabel2026].

## Sources
- [Montalban2018] Montalban X, Gold R, Thompson AJ, Otero-Romero S, Amato MP, Chandraratna D, et al. ECTRIMS/EAN Guideline on the pharmacological treatment of people with multiple sclerosis. Mult Scler. 2018;24(2):96-120. PMID 29353550. doi:10.1177/1352458517751049. Recommendation wording read from the authors' accepted manuscript on UCL Discovery (eprint 10042276); co-published as Eur J Neurol 2018;25(2):215-237, PMID 29352526. (validated: PubMed)
- [RaeGrant2018] Rae-Grant A, Day GS, Marrie RA, Rabinstein A, Cree BAC, Gronseth GS, et al. Practice guideline recommendations summary: Disease-modifying therapies for adults with multiple sclerosis. Neurology. 2018;90(17):777-788. PMID 29686116. doi:10.1212/WNL.0000000000005347. Recommendation wording read from the AAN clinician summary PDF (aan.com GetGuidelineContent/900). (validated: PubMed)
- [Hauser2017] Hauser SL, Bar-Or A, Comi G, Giovannoni G, Hartung HP, Hemmer B, et al. Ocrelizumab versus Interferon Beta-1a in Relapsing Multiple Sclerosis. N Engl J Med. 2017;376(3):221-234. PMID 28002679. doi:10.1056/NEJMoa1601277. (validated: PubMed)
- [Montalban2017] Montalban X, Hauser SL, Kappos L, Arnold DL, Bar-Or A, Comi G, et al. Ocrelizumab versus Placebo in Primary Progressive Multiple Sclerosis. N Engl J Med. 2017;376(3):209-220. PMID 28002688. doi:10.1056/NEJMoa1606468. (validated: PubMed)
- [Polman2006] Polman CH, O'Connor PW, Havrdova E, Hutchinson M, Kappos L, Miller DH, et al. A randomized, placebo-controlled trial of natalizumab for relapsing multiple sclerosis. N Engl J Med. 2006;354(9):899-910. PMID 16510744. doi:10.1056/NEJMoa044397. (validated: PubMed)
- [IFNBMSSG1993] The IFNB Multiple Sclerosis Study Group. Interferon beta-1b is effective in relapsing-remitting multiple sclerosis. I. Clinical results of a multicenter, randomized, double-blind, placebo-controlled trial. Neurology. 1993;43(4):655-61. PMID 8469318. doi:10.1212/wnl.43.4.655. (validated: PubMed)
- [PRISMS1998] PRISMS Study Group. Randomised double-blind placebo-controlled study of interferon beta-1a in relapsing/remitting multiple sclerosis. Lancet. 1998;352(9139):1498-504. PMID 9820297. No DOI listed in PubMed. (validated: PubMed)
- [Jacobs1996] Jacobs LD, Cookfair DL, Rudick RA, Herndon RM, Richert JR, Salazar AM, et al. Intramuscular interferon beta-1a for disease progression in relapsing multiple sclerosis. Ann Neurol. 1996;39(3):285-94. PMID 8602746. doi:10.1002/ana.410390304. (validated: PubMed)
- [Calabresi2014] Calabresi PA, Kieseier BC, Arnold DL, Balcer LJ, Boyko A, Pelletier J, et al. Pegylated interferon β-1a for relapsing-remitting multiple sclerosis (ADVANCE): a randomised, phase 3, double-blind study. Lancet Neurol. 2014;13(7):657-65. PMID 24794721. doi:10.1016/S1474-4422(14)70068-7. (validated: PubMed)
- [Johnson1995] Johnson KP, Brooks BR, Cohen JA, Ford CC, Goldstein J, Lisak RP, et al. Copolymer 1 reduces relapse rate and improves disability in relapsing-remitting multiple sclerosis: results of a phase III multicenter, double-blind placebo-controlled trial. Neurology. 1995;45(7):1268-76. PMID 7617181. doi:10.1212/wnl.45.7.1268. (validated: PubMed)
- [Khan2013] Khan O, Rieckmann P, Boyko A, Selmaj K, Zivadinov R; GALA Study Group. Three times weekly glatiramer acetate in relapsing-remitting multiple sclerosis. Ann Neurol. 2013;73(6):705-13. PMID 23686821. doi:10.1002/ana.23938. (validated: PubMed)
- [OConnor2011] O'Connor P, Wolinsky JS, Confavreux C, Comi G, Kappos L, Olsson TP, et al. Randomized trial of oral teriflunomide for relapsing multiple sclerosis. N Engl J Med. 2011;365(14):1293-303. PMID 21991951. doi:10.1056/NEJMoa1014656. (validated: PubMed)
- [Confavreux2014] Confavreux C, O'Connor P, Comi G, Freedman MS, Miller AE, Olsson TP, et al. Oral teriflunomide for patients with relapsing multiple sclerosis (TOWER): a randomised, double-blind, placebo-controlled, phase 3 trial. Lancet Neurol. 2014;13(3):247-56. PMID 24461574. doi:10.1016/S1474-4422(13)70308-9. (validated: PubMed)
- [Gold2012] Gold R, Kappos L, Arnold DL, Bar-Or A, Giovannoni G, Selmaj K, et al. Placebo-controlled phase 3 study of oral BG-12 for relapsing multiple sclerosis. N Engl J Med. 2012;367(12):1098-107. PMID 22992073. doi:10.1056/NEJMoa1114287. (validated: PubMed)
- [Fox2012] Fox RJ, Miller DH, Phillips JT, Hutchinson M, Havrdova E, Kita M, et al. Placebo-controlled phase 3 study of oral BG-12 or glatiramer in multiple sclerosis. N Engl J Med. 2012;367(12):1087-97. PMID 22992072. doi:10.1056/NEJMoa1206328. (validated: PubMed)
- [Naismith2020] Naismith RT, Wundes A, Ziemssen T, Jasinska E, Freedman MS, Lembo AJ, et al. Diroximel Fumarate Demonstrates an Improved Gastrointestinal Tolerability Profile Compared with Dimethyl Fumarate in Patients with Relapsing-Remitting Multiple Sclerosis: Results from the Randomized, Double-Blind, Phase III EVOLVE-MS-2 Study. CNS Drugs. 2020;34(2):185-196. PMID 31953790. doi:10.1007/s40263-020-00700-0. (validated: PubMed)
- [Kappos2010] Kappos L, Radue EW, O'Connor P, Polman C, Hohlfeld R, Calabresi P, et al. A placebo-controlled trial of oral fingolimod in relapsing multiple sclerosis. N Engl J Med. 2010;362(5):387-401. PMID 20089952. doi:10.1056/NEJMoa0909494. (validated: PubMed)
- [Cohen2010] Cohen JA, Barkhof F, Comi G, Hartung HP, Khatri BO, Montalban X, et al. Oral fingolimod or intramuscular interferon for relapsing multiple sclerosis. N Engl J Med. 2010;362(5):402-15. PMID 20089954. doi:10.1056/NEJMoa0907839. (validated: PubMed)
- [Kappos2018] Kappos L, Bar-Or A, Cree BAC, Fox RJ, Giovannoni G, Gold R, et al. Siponimod versus placebo in secondary progressive multiple sclerosis (EXPAND): a double-blind, randomised, phase 3 study. Lancet. 2018;391(10127):1263-1273. PMID 29576505. doi:10.1016/S0140-6736(18)30475-6. (validated: PubMed)
- [Comi2019] Comi G, Kappos L, Selmaj KW, Bar-Or A, Arnold DL, Steinman L, et al. Safety and efficacy of ozanimod versus interferon beta-1a in relapsing multiple sclerosis (SUNBEAM): a multicentre, randomised, minimum 12-month, phase 3 trial. Lancet Neurol. 2019;18(11):1009-1020. PMID 31492651. doi:10.1016/S1474-4422(19)30239-X. (validated: PubMed)
- [Cohen2019] Cohen JA, Comi G, Selmaj KW, Bar-Or A, Arnold DL, Steinman L, et al. Safety and efficacy of ozanimod versus interferon beta-1a in relapsing multiple sclerosis (RADIANCE): a multicentre, randomised, 24-month, phase 3 trial. Lancet Neurol. 2019;18(11):1021-1033. PMID 31492652. doi:10.1016/S1474-4422(19)30238-8. (validated: PubMed)
- [Kappos2021] Kappos L, Fox RJ, Burcklen M, Freedman MS, Havrdová EK, Hennessy B, et al. Ponesimod Compared With Teriflunomide in Patients With Relapsing Multiple Sclerosis in the Active-Comparator Phase 3 OPTIMUM Study: A Randomized Clinical Trial. JAMA Neurol. 2021;78(5):558-567. PMID 33779698. doi:10.1001/jamaneurol.2021.0405. (validated: PubMed)
- [Giovannoni2010] Giovannoni G, Comi G, Cook S, Rammohan K, Rieckmann P, Soelberg Sørensen P, et al. A placebo-controlled trial of oral cladribine for relapsing multiple sclerosis. N Engl J Med. 2010;362(5):416-26. PMID 20089960. doi:10.1056/NEJMoa0902533. (validated: PubMed)
- [Celani2026] Celani MG, Orso M, Melis M, Ercolani MV, Cantisani TA. Cladribine for people with multiple sclerosis. Cochrane Database Syst Rev. 2026;1(1):CD013524. PMID 41510790. doi:10.1002/14651858.CD013524.pub2. (validated: Europe PMC)
- [Rudick2006] Rudick RA, Stuart WH, Calabresi PA, Confavreux C, Galetta SL, Radue EW, et al. Natalizumab plus interferon beta-1a for relapsing multiple sclerosis. N Engl J Med. 2006;354(9):911-23. PMID 16510745. doi:10.1056/NEJMoa044396. (validated: PubMed)
- [Havrdova2009] Havrdova E, Galetta S, Hutchinson M, Stefoski D, Bates D, Polman CH, et al. Effect of natalizumab on clinical and radiological disease activity in multiple sclerosis: a retrospective analysis of the Natalizumab Safety and Efficacy in Relapsing-Remitting Multiple Sclerosis (AFFIRM) study. Lancet Neurol. 2009;8(3):254-260. PMID 19201654. doi:10.1016/S1474-4422(09)70021-3. (validated: Europe PMC)
- [Bloomgren2012] Bloomgren G, Richman S, Hotermans C, Subramanyam M, Goelz S, Natarajan A, et al. Risk of natalizumab-associated progressive multifocal leukoencephalopathy. N Engl J Med. 2012;366(20):1870-80. PMID 22591293. doi:10.1056/NEJMoa1107829. (validated: PubMed)
- [Ho2017] Ho PR, Koendgen H, Campbell N, Haddock B, Richman S, Chang I. Risk of natalizumab-associated progressive multifocal leukoencephalopathy in patients with multiple sclerosis: a retrospective analysis of data from four clinical studies. Lancet Neurol. 2017;16(11):925-933. PMID 28969984. doi:10.1016/S1474-4422(17)30282-X. (validated: PubMed)
- [Foley2022] Foley JF, Defer G, Ryerson LZ, Cohen JA, Arnold DL, Butzkueven H, et al. Comparison of switching to 6-week dosing of natalizumab versus continuing with 4-week dosing in patients with relapsing-remitting multiple sclerosis (NOVA): a randomised, controlled, open-label, phase 3b trial. Lancet Neurol. 2022;21(7):608-619. PMID 35483387. doi:10.1016/S1474-4422(22)00143-0. (validated: PubMed)
- [Hemmer2023] Hemmer B, Wiendl H, Roth K, Wessels H, Höfler J, Hornuss C, et al. Efficacy and Safety of Proposed Biosimilar Natalizumab (PB006) in Patients With Relapsing-Remitting Multiple Sclerosis: The Antelope Phase 3 Randomized Clinical Trial. JAMA Neurol. 2023;80(3):298-307. PMID 36689214. doi:10.1001/jamaneurol.2022.5007. (validated: PubMed)
- [Fox2014] Fox RJ, Cree BA, De Sèze J, Gold R, Hartung HP, Jeffery D, et al. MS disease activity in RESTORE: a randomized 24-week natalizumab treatment interruption study. Neurology. 2014;82(17):1491-1498. PMID 24682966. doi:10.1212/WNL.0000000000000355. (validated: Europe PMC)
- [Hauser2020Ofatumumab] Hauser SL, Bar-Or A, Cohen JA, Comi G, Correale J, Coyle PK, et al. Ofatumumab versus Teriflunomide in Multiple Sclerosis. N Engl J Med. 2020;383(6):546-557. PMID 32757523. doi:10.1056/NEJMoa1917246. (validated: PubMed)
- [Steinman2022] Steinman L, Fox E, Hartung HP, Alvarez E, Qian P, Wray S, et al. Ublituximab versus Teriflunomide in Relapsing Multiple Sclerosis. N Engl J Med. 2022;387(8):704-714. PMID 36001711. doi:10.1056/NEJMoa2201904. (validated: PubMed)
- [Svenningsson2022] Svenningsson A, Frisell T, Burman J, Salzer J, Fink K, Hallberg S, et al. Safety and efficacy of rituximab versus dimethyl fumarate in patients with relapsing-remitting multiple sclerosis or clinically isolated syndrome in Sweden: a rater-blinded, phase 3, randomised controlled trial. Lancet Neurol. 2022;21(8):693-703. PMID 35841908. doi:10.1016/S1474-4422(22)00209-5. (validated: PubMed)
- [Kallin2026] Kallin S, Svenningsson A, Olén O, Hedin C, Lycke J, Alping P. Risk of Inflammatory Bowel Disease After Anti-CD20 Treatment in Multiple Sclerosis. JAMA Neurol. 2026 (online ahead of print 22 Oct 2026):e263439. PMID 42911175; PMCID PMC13691918; doi:10.1001/jamaneurol.2026.3439. (validated: PubMed, 2026-10-29; added by research update U-2026-10-29)
- [Newsome2025] Newsome SD, Krzystanek E, Selmaj KW, Dufek M, Goldstick L, Pozzilli C, et al. Subcutaneous Ocrelizumab in Patients With Multiple Sclerosis: Results of the Phase 3 OCARINA II Study. Neurology. 2025;104(9):e213574. PMID 40245351. doi:10.1212/WNL.0000000000213574. A second PubMed record of the same title exists (PMID 40601887; Neurology 2025;105(3):e213909). (validated: PubMed)
- [Cohen2012] Cohen JA, Coles AJ, Arnold DL, Confavreux C, Fox EJ, Hartung HP, et al. Alemtuzumab versus interferon beta 1a as first-line treatment for patients with relapsing-remitting multiple sclerosis: a randomised controlled phase 3 trial. Lancet. 2012;380(9856):1819-28. PMID 23122652. doi:10.1016/S0140-6736(12)61769-3. (validated: PubMed)
- [Coles2012] Coles AJ, Twyman CL, Arnold DL, Cohen JA, Confavreux C, Fox EJ, et al. Alemtuzumab for patients with relapsing multiple sclerosis after disease-modifying therapy: a randomised controlled phase 3 trial. Lancet. 2012;380(9856):1829-39. PMID 23122650. doi:10.1016/S0140-6736(12)61768-1. (validated: PubMed)
- [Hartung2002] Hartung HP, Gonsette R, König N, Kwiecinski H, Guseo A, Morrissey SP, et al. Mitoxantrone in progressive multiple sclerosis: a placebo-controlled, double-blind, randomised, multicentre trial. Lancet. 2002;360(9350):2018-25. PMID 12504397. doi:10.1016/S0140-6736(02)12023-X. (validated: PubMed)
- [Fox2025] Fox RJ, Bar-Or A, Traboulsee A, Oreja-Guevara C, Giovannoni G, Vermersch P, et al. Tolebrutinib in Nonrelapsing Secondary Progressive Multiple Sclerosis. N Engl J Med. 2025;392(19):1883-1892. PMID 40202696. doi:10.1056/NEJMoa2415988. (validated: PubMed)
- [Oh2025] Oh J, Arnold DL, Cree BAC, Ionete C, Kim HJ, Sormani MP, et al. Tolebrutinib versus Teriflunomide in Relapsing Multiple Sclerosis. N Engl J Med. 2025;392(19):1893-1904. PMID 40202623. doi:10.1056/NEJMoa2415985. (validated: PubMed)
- [Harding2019] Harding K, Williams O, Willis M, Hrastelj J, Rimmer A, Joseph F, et al. Clinical Outcomes of Escalation vs Early Intensive Disease-Modifying Therapy in Patients With Multiple Sclerosis. JAMA Neurol. 2019;76(5):536-541. PMID 30776055. doi:10.1001/jamaneurol.2018.4905. (validated: PubMed)
- [He2020] He A, Merkel B, Brown JWL, Zhovits Ryerson L, Kister I, Malpas CB, et al. Timing of high-efficacy therapy for multiple sclerosis: a retrospective observational cohort study. Lancet Neurol. 2020;19(4):307-316. PMID 32199096. doi:10.1016/S1474-4422(20)30067-3. (validated: PubMed)
- [Brown2019] Brown JWL, Coles A, Horakova D, Havrdova E, Izquierdo G, Prat A, et al. Association of Initial Disease-Modifying Therapy With Later Conversion to Secondary Progressive Multiple Sclerosis. JAMA. 2019;321(2):175-187. PMID 30644981. doi:10.1001/jama.2018.20588. (validated: PubMed)
- [Spelman2021] Spelman T, Magyari M, Piehl F, Svenningsson A, Rasmussen PV, Kant M, et al. Treatment Escalation vs Immediate Initiation of Highly Effective Treatment for Patients With Relapsing-Remitting Multiple Sclerosis: Data From 2 Different National Strategies. JAMA Neurol. 2021;78(10):1197-1204. PMID 34398221. doi:10.1001/jamaneurol.2021.2738. (validated: PubMed)
- [Corboy2023] Corboy JR, Fox RJ, Kister I, Cutter GR, Morgan CJ, Seale R, et al. Risk of new disease activity in patients with multiple sclerosis who continue or discontinue disease-modifying therapies (DISCOMS): a multicentre, randomised, single-blind, phase 4, non-inferiority trial. Lancet Neurol. 2023;22(7):568-577. PMID 37353277. doi:10.1016/S1474-4422(23)00154-0. (validated: PubMed)
- [Hatcher2016] Hatcher SE, Waubant E, Nourbakhsh B, Crabtree-Hartman E, Graves JS. Rebound Syndrome in Patients With Multiple Sclerosis After Cessation of Fingolimod Treatment. JAMA Neurol. 2016;73(7):790-794. PMID 27135594. doi:10.1001/jamaneurol.2016.0826. (validated: Europe PMC)
- [Giovannoni2015] Giovannoni G, Turner B, Gnanapavan S, Offiah C, Schmierer K, Marta M. Is it time to target no evident disease activity (NEDA) in multiple sclerosis? Mult Scler Relat Disord. 2015;4(4):329-33. PMID 26195051. doi:10.1016/j.msard.2015.04.006. (validated: PubMed)
- [Wattjes2021] Wattjes MP, Ciccarelli O, Reich DS, Banwell B, de Stefano N, Enzinger C, et al. 2021 MAGNIMS-CMSC-NAIMS consensus recommendations on the use of MRI in patients with multiple sclerosis. Lancet Neurol. 2021;20(8):653-670. PMID 34139157. doi:10.1016/S1474-4422(21)00095-8. (validated: Europe PMC)
- [GonzalezLorenzo2024] Gonzalez-Lorenzo M, Ridley B, Minozzi S, Del Giovane C, Peryer G, Piggott T, et al. Immunomodulators and immunosuppressants for relapsing-remitting multiple sclerosis: a network meta-analysis. Cochrane Database Syst Rev. 2024;1:CD011381. PMID 38174776. doi:10.1002/14651858.CD011381.pub3. (validated: Europe PMC)
- [Filippi2025] Filippi M, Amato MP, Centonze D, Gallo P, Gasperini C, Inglese M, et al. The use of high-efficacy disease-modifying therapies in multiple sclerosis: recommendations from an expert Delphi consensus. J Neurol. 2025;272(9):565. PMID 40783885. doi:10.1007/s00415-025-13293-9. (validated: Europe PMC)
- [OteroRomero2023] Otero-Romero S, Lebrun-Frénay C, Reyes S, Amato MP, Campins M, Farez M, et al. ECTRIMS/EAN consensus on vaccination in people with multiple sclerosis: Improving immunization strategies in the era of highly active immunotherapeutic drugs. Mult Scler. 2023;29(8):904-925. PMID 37293841. doi:10.1177/13524585231168043. Full text read via Europe PMC (PMC10338708). (validated: PubMed)
- [Ontaneda2020] Ontaneda D, Tallantyre EC, Raza PC, Planchon SM, Nakamura K, Miller D, et al. Determining the effectiveness of early intensive versus escalation approaches for the treatment of relapsing-remitting multiple sclerosis: The DELIVER-MS study protocol. Contemp Clin Trials. 2020;95:106009. PMID 32320842. doi:10.1016/j.cct.2020.106009. (validated: Europe PMC)
- [Tallantyre2026] Tallantyre EC, Planchon SM, Howard H, Mays J, Frowd N, Cohen JA, et al. Disease-modifying treatment preferences and decision-making in a multiple sclerosis randomized and observational clinical trial (DELIVER-MS). Mult Scler. 2026;32(7):722-736. PMID 42218617. doi:10.1177/13524585261449988. (validated: Europe PMC)
- [Mowry2025] Mowry EM, Qian P, Meador W, Lynch S, Narayan R, Borazanci A, et al. The TRaditional versus Early Aggressive Therapy for Multiple Sclerosis (TREAT-MS) trial: design and baseline characteristics of participants. Contemp Clin Trials. 2025;159:108117. PMID 41135813. doi:10.1016/j.cct.2025.108117. (validated: Europe PMC)
- [NCT03535298] DELIVER-MS: Determining the Effectiveness of earLy Intensive Versus Escalation Approaches for the Treatment of Relapsing-Remitting Multiple Sclerosis. ClinicalTrials.gov NCT03535298; status active, not recruiting; primary completion estimated 2027-07-30; no results posted (accessed 2026-10-20). (validated: ClinicalTrials.gov)
- [NCT03500328] TREAT-MS: A Pragmatic Trial to Evaluate the Intermediate-term Effects of Early, Aggressive Versus Escalation Therapy in People With Multiple Sclerosis. ClinicalTrials.gov NCT03500328; status completed; primary completion 2026-07-31; enrolment 900; no results posted (accessed 2026-10-20). (validated: ClinicalTrials.gov)
- [FDA2026Approvals] US FDA, Drugs@FDA application records via openFDA drugsfda endpoint: BLA103471, BLA103628, BLA103780, BLA125499, NDA020622, NDA202992, NDA204063, NDA211855, NDA022527, NDA209884, NDA209899, NDA213498, NDA022561, BLA125104, BLA761322, BLA761053, BLA761371, BLA125326 (suppl. 70), BLA761238, BLA103948 (suppl. 5139) (accessed 2026-10-20). (validated: openFDA)
- [BetaseronLabel2026] Bayer. BETASERON (interferon beta-1b) prescribing information, BLA103471, effective 2026-03-03, set id 66311f74-0472-4fa3-848a-06002ca0def5. (validated: openFDA)
- [AvonexLabel2025] Biogen. AVONEX (interferon beta-1a) prescribing information, BLA103628, effective 2025-11-19, set id d70a39cc-de15-4c12-a1ec-8063b69ea0e1. (validated: openFDA)
- [RebifLabel2025] EMD Serono. REBIF (interferon beta-1a) prescribing information, BLA103780, effective 2025-09-22, set id c6fcb5d2-8fcd-44fa-a838-b84ee5f44f0f. (validated: openFDA)
- [PlegridyLabel2025] Biogen. PLEGRIDY (peginterferon beta-1a) prescribing information, BLA125499, effective 2025-11-12, set id 08f0ea03-4e6d-195d-aef4-886e32befa95. (validated: openFDA)
- [CopaxoneLabel2026] Teva. COPAXONE (glatiramer acetate) prescribing information, NDA020622, effective 2026-06-23, set id aa88f583-4f5f-433b-80b4-1f4c9fb28357. (validated: openFDA)
- [AubagioLabel2026] Sanofi Genzyme. AUBAGIO (teriflunomide) prescribing information, NDA202992, effective 2026-02-20, set id 4650d12c-b9c8-4525-b07f-a2d773eca155. (validated: openFDA)
- [TecfideraLabel2025] Biogen. TECFIDERA (dimethyl fumarate) prescribing information, NDA204063, effective 2025-06-04, set id 665d7e74-036c-5f68-5b67-ab84b9b49151. (validated: openFDA)
- [VumerityLabel2025] Biogen. VUMERITY (diroximel fumarate) prescribing information, NDA211855, effective 2025-05-29, set id 2d74414f-6b83-4ea2-9a95-3cecabbce774. (validated: openFDA)
- [GilenyaLabel2026] Novartis. GILENYA (fingolimod) prescribing information, NDA022527, effective 2026-07-22, set id cc9e1c8c-0e2b-44e2-878b-27057f786be9. (validated: openFDA)
- [MayzentLabel2026] Novartis. MAYZENT (siponimod) prescribing information, NDA209884, effective 2026-06-30, set id 44492772-5aed-4627-bd85-e8e89f308bb3. (validated: openFDA)
- [ZeposiaLabel2026] Bristol Myers Squibb. ZEPOSIA (ozanimod) prescribing information, NDA209899, effective 2026-04-16, set id 93ce2fab-edfb-4804-8074-963071de51e4. (validated: openFDA)
- [PonvoryLabel2025] Janssen. PONVORY (ponesimod) prescribing information, NDA213498, effective 2025-12-04, set id 0c025ba8-ba51-272e-e063-6294a90ad120. (validated: openFDA)
- [MavencladLabel2026] EMD Serono. MAVENCLAD (cladribine) tablets prescribing information, NDA022561, effective 2026-05-27, set id 9c75e30a-a410-40f1-b653-04d532bd9144. (validated: openFDA)
- [TyrukoLabel2025] Sandoz. TYRUKO (natalizumab-sztn) prescribing information, BLA761322, effective 2025-10-31, set id ef653c36-dd4b-4e71-9d2d-40b8fea24b67. Used for natalizumab class labelling because the Tysabri label is absent from openFDA. (validated: openFDA)
- [OcrevusLabel2026] Genentech. OCREVUS (ocrelizumab) prescribing information, BLA761053, effective 2026-05-14, set id 9da42362-3bb5-4b83-b4bb-b59fd4e55f0d. (validated: openFDA)
- [KesimptaLabel2026] Novartis. KESIMPTA (ofatumumab) prescribing information, BLA125326, effective 2026-04-01, set id 6a8a3f53-2062-48ff-9dbe-b939df133ca3. (validated: openFDA)
- [BriumviLabel2026] TG Therapeutics. BRIUMVI (ublituximab-xiiy) prescribing information, BLA761238, effective 2026-02-19, set id 3a77cd8c-811b-407c-9140-d0c5c26435c2. (validated: openFDA)
- [LemtradaLabel2025] Sanofi Genzyme. LEMTRADA (alemtuzumab) prescribing information, BLA103948, effective 2025-11-03, set id 6236b0bc-82e9-4447-9a78-f57d94770269. (validated: openFDA)
- [MitoxantroneLabel2025] Mitoxantrone injection USP (concentrate) prescribing information, ANDA077356, effective 2025-04-24, set id 1634528a-30c5-4309-acc8-4c0293ae14ae. (validated: openFDA)
- [EMACenrifki2026] European Medicines Agency. Cenrifki (tolebrutinib) EPAR overview page: CHMP opinion 23/04/2026; marketing authorisation issued 19/06/2026. https://www.ema.europa.eu/en/medicines/human/EPAR/cenrifki (accessed 2026-10-20). (unverified: regulator web page read directly; not indexed by the listed APIs)
- [EMALemtrada2020] European Medicines Agency. Lemtrada Article 20 referral page: review started April 2019; CHMP 14 Nov 2019; EC decision 16 Jan 2020. https://www.ema.europa.eu/en/medicines/human/referrals/lemtrada (accessed 2026-10-20). (unverified: regulator web page read directly; not indexed by the listed APIs)
- [EMATysabri2026] European Medicines Agency. Tysabri (natalizumab) EPAR overview page: EU authorisation 27 June 2006. https://www.ema.europa.eu/en/medicines/human/EPAR/tysabri (accessed 2026-10-20). (unverified: regulator web page read directly; not indexed by the listed APIs)
- [Sanofi2025] Sanofi. Press release: Sanofi provides update on tolebrutinib regulatory submission in non-relapsing secondary progressive multiple sclerosis. 24 Dec 2025. https://www.sanofi.com/en/media-room/press-releases/2025/2025-12-24-06-00-00-3210238 (unverified: company press release; the CRL's reasons are not in the release)
- [Roche2026] Roche. Media release: FDA accepts fenebrutinib NDA under priority review for RMS and PPMS. 30 Sep 2026. https://www.roche.com/media/releases/med-cor-2026-09-30 (unverified: company press release)
- [Biogen2021] Biogen. Regulatory update on the supplemental BLA for subcutaneous TYSABRI (complete response letter 28 April 2021; EU approval of SC administration earlier in 2021). Reported by NeurologyLive and MS News Today, April 2021; the company page was not accessible (HTTP 403). (unverified: company page not accessible; secondary reports only)
