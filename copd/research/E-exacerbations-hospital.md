# E · Exacerbations & hospital care

Pass date: 2026-11-07. Modules served: flareups, hospital, bloodgas.

This pass covers COPD exacerbations (flare-ups): how they are defined and graded (the Rome proposal adopted by GOLD 2023), what triggers them, the frequent-exacerbator phenotype, what happens to lung function, symptoms and survival afterwards, and hospital care: systemic corticosteroids, antibiotics, controlled oxygen, non-invasive ventilation (NIV), prognostic scores, discharge and readmission. The bloodgas module gets the published arterial blood gas (ABG) thresholds for hypercapnia, acidosis and starting NIV, plus reference ranges and compensation rules, so a builder can make an ABG teaching interpreter. Guideline statements and doses are quoted as published. They describe what guidelines and trials say. They are not instructions for treating anyone.

Access notes:
- The Rome proposal (Celli2022) has no PubMed abstract and no open full text. Its thresholds were checked in two open-access papers that restate them (Jacobson2023, Lee2023) and against the GOLD 2023 Executive Summary open full text (PMC10111975), which adopts it.
- The BTS/ICS 2016 hypercapnic respiratory failure guideline (Thorax supplement) and the BTS 2017 oxygen guideline (Thorax supplement) are paywalled or blocked (HTTP 403). Their wording was read from the official open-access summaries in BMJ Open Respiratory Research (Davidson2016Summary, PMC4800170; ODriscoll2017Summary, PMC5531304), which reproduce the full recommendation lists.
- The ERS/ATS 2017 NIV guideline (Rochwerg2017) full text was blocked (403). Its recommendation wording is quoted as reproduced in an open review (Trethewey2018) and labelled that way.
- The BTS/ICS initial NIV pressure settings (in Figure 1 of the guideline) are an image and could not be read as text. They are left out. Pressures given here come from trials only.
- NCBI Bookshelf (StatPearls) served a CAPTCHA and was not used. ABG reference ranges come from open-access peer-reviewed sources indexed in PubMed (Samuel2023, Sood2010) and the BTS oxygen guideline.
- PubMed E-utilities were rate-limited (shared IP). All records were still validated through PubMed esummary using retries. Full texts were read via Europe PMC.

Call-now box (for every page built from this file): A COPD flare-up can become an emergency. If someone with COPD is much more breathless than usual at rest, confused or very drowsy, has blue lips, chest pain, or cannot speak in full sentences, call your local emergency number now. If they carry an oxygen alert card, show it to the ambulance crew.

## Findings

### flareups · What an exacerbation is: the Rome definition (GOLD 2023)
- GOLD 2023 adopted the Rome proposal, which defines an exacerbation of COPD (ECOPD) as "an event characterized by dyspnea and/or cough and sputum that worsen over ≤14 days, which may be accompanied by tachypnea and/or tachycardia and is often associated with increased local and systemic inflammation caused by airway infection, pollution, or other insult to the airways" [[Agusti2023,Celli2022]].
- GOLD 2023 says the previous definition ("acute worsening of respiratory symptoms that results in additional therapy") was "highly non-specific". It graded severity after the fact (mild, moderate, severe) by how much healthcare was used, which GOLD calls "useless to guide treatment at the point of care" [[Agusti2023]].
- Rome grades severity at the point of care with dyspnoea on a 0–10 visual analogue scale (VAS), respiratory rate, heart rate, resting oxygen saturation (and its change from baseline) and C-reactive protein (CRP). An ABG is added in emergency or hospital settings to decide on ventilatory support [[Agusti2023,Celli2022]].
- Rome "mild" thresholds: VAS dyspnoea <5, respiratory rate <24 breaths/min, heart rate <95 bpm, resting SpO2 ≥92% on air (or the usual oxygen prescription) with a change of ≤3% (when known), and CRP <10 mg/L (if obtained) [[Jacobson2023,Celli2022]].
- Rome "moderate" requires at least three of five: VAS ≥5, respiratory rate ≥24, heart rate ≥95, resting SpO2 <92% and/or a change of >3%, CRP ≥10 mg/L. The ABG may show hypoxaemia (PaO2 ≤8 kPa) and/or hypercapnia (PaCO2 >6 kPa) but no acidosis [[Jacobson2023,Celli2022]].
- Rome "severe" is defined by the ABG: hypercapnia (PaCO2 >6 kPa; >45 mmHg) with acidosis (pH <7.35) [[Jacobson2023,Lee2023,Celli2022]].
- GOLD 2023 notes that the ABG must show "new-onset/worsening hypercapnia or acidosis", because a few patients have chronic hypercapnia [[Agusti2023]].
- In a Korean validation of 740 emergency visits or admissions, Rome classed 30.9% as mild, 58.6% as moderate and 10.4% as severe. It predicted ICU admission (AUROC 0.850) and need for NIV or invasive ventilation (AUROC 0.870) better than GesEPOC 2021 [[Lee2023]].
- In a Swedish telehealth cohort of 125 exacerbations, GOLD 2023 (Rome) downgraded severity significantly compared with GOLD 2022, and comorbid heart failure did not distort the Rome parameters [[Jacobson2023]].

### flareups · Look-alikes to exclude
- GOLD 2023 warns that decompensated heart failure, pneumonia and pulmonary embolism may "mimic or aggravate" an ECOPD. Worsening breathlessness without the classic features should prompt a search for these [[Agusti2023]].
- A meta-analysis of 7 CT-angiography studies (880 patients) found pulmonary embolism in a pooled 16.1% (95% CI 8.3–25.8%) of unexplained exacerbations. 68% of emboli were in the main, lobar or interlobar arteries [[Aleva2017]].
- In that meta-analysis, pleuritic chest pain and cardiac failure were more frequent in exacerbations with pulmonary embolism, and signs of respiratory infection were less frequent [[Aleva2017]].

### flareups · Triggers: viruses, bacteria, eosinophils
- In 64 patients admitted with exacerbations, viral and/or bacterial infection was detected in 78%: viruses in 48.4% (6.2% when stable) and bacteria in 54.7% (37.5% when stable) [[Papi2006]].
- In the same study, co-infection with a virus and bacteria was linked to worse lung function and longer stays. Sputum eosinophils rose in virus-associated exacerbations [[Papi2006]].
- In 83 London patients, 64% of exacerbations were associated with a cold in the 18 days before. Viruses were found in 39.2% of 168 exacerbations, and 58.2% of the viruses were rhinoviruses [[Seemungal2001]].
- Viral exacerbations had a longer median symptom recovery of 13 days [[Seemungal2001]].
- Molecular typing in 81 outpatients showed that acquiring a new strain of *H. influenzae*, *M. catarrhalis* or *S. pneumoniae* more than doubled the risk of exacerbation (33.0% vs 15.4% of visits; relative risk 2.15, 95% CI 1.83–2.53) [[Sethi2002]].
- Cluster analysis of 182 exacerbations found four biological types: bacterial-, viral- and eosinophil-predominant, plus "pauci-inflammatory". 55%, 29% and 28% of exacerbations were associated with bacteria, viruses or sputum eosinophilia respectively [[Bafadhel2011]].
- The best biomarkers were sputum IL-1β for bacterial (AUROC 0.89), serum CXCL10 for viral (0.83) and percentage peripheral blood eosinophils for eosinophilic exacerbations (0.85) [[Bafadhel2011]].
- A Lancet review states that exacerbations are "triggered mainly by respiratory viruses and bacteria". They are linked to more airway and systemic inflammation and to hyperinflation [[WedzichaSeemungal2007]].
- GOLD 2023 notes that air pollution increases the risk of exacerbations, hospitalisations and mortality [[Agusti2023]].

### flareups · Frequent exacerbators
- In ECLIPSE (2138 patients followed for 3 years), first-year exacerbation rates were 0.85 per person in GOLD stage 2, 1.34 in stage 3 and 2.00 in stage 4 [[Hurst2010]].
- Frequent exacerbations (two or more in the first year) occurred in 22% of stage 2, 33% of stage 3 and 47% of stage 4 patients [[Hurst2010]].
- In ECLIPSE, "the single best predictor of exacerbations, across all GOLD stages, was a history of exacerbations". The phenotype was stable over 3 years. It was also linked to reflux or heartburn, worse quality of life and a raised white-cell count [[Hurst2010]].
- In 99,574 UK primary care patients followed for up to 10 years, around one quarter never had an exacerbation [[Rothnie2018]].
- In that cohort, the number of exacerbations in year 1 predicted the long-term rate in a graded way: HR 1.71 for one event up to HR 3.41 for five or more [[Rothnie2018]].
- Frequent moderate exacerbations raised the risk of death in a graded way (HR 1.10 for two up to 1.57 for five or more). A severe (hospitalised) exacerbation carried HR 1.79 [[Rothnie2018]].
- In 70 London patients, only 51% of 190 exacerbations were reported to clinicians. Frequent exacerbators (3–8 per year) had St George's Respiratory Questionnaire total scores 14.8 points worse than infrequent exacerbators [[Seemungal1998]].

### flareups · What a flare-up does over time
- In 101 patients and 504 exacerbations, median recovery was 6 days for peak flow and 7 days for symptoms. Peak flow had fully recovered in only 75.2% of exacerbations at 35 days, and had not recovered by 91 days in 7.1% [[Seemungal2000]].
- Symptoms such as breathlessness, sore throat, cough and cold symptoms worsened before the exacerbation onset, but lung function did not [[Seemungal2000]].
- Over 4 years in 109 patients, frequent exacerbators lost FEV1 at −40.1 mL/year, versus −32.1 mL/year in infrequent exacerbators [[Donaldson2002]].
- Treatment started a median of 3.69 days after onset. Each day of delay lengthened recovery by 0.42 days, and not reporting exacerbations was associated with emergency admission [[Wilkinson2004]].

### flareups · Prevention (overview; drug detail is in pass D)
- A Lancet review lists inhaled corticosteroids, long-acting bronchodilators and their combinations as reducing exacerbation frequency and severity. It calls pulmonary rehabilitation, self-management and home ventilatory support "increasingly important" [[WedzichaSeemungal2007]] (Established).
- The CHEST/Canadian Thoracic Society guideline grouped prevention into non-pharmacological, inhaled and oral therapies [[Criner2015]].
- The ECLIPSE authors conclude that the frequent-exacerbator susceptibility "has implications for the targeting of exacerbation-prevention strategies across the spectrum of disease severity" [[Hurst2010]].
- Suissa and colleagues propose "delaying the second severe exacerbation" as a strategic target for COPD management [[Suissa2012]].

### hospital · Mortality and natural history after admission
- In a Quebec cohort of 73,106 people from their first COPD hospitalisation, 50% had died by 3.6 years and 75% by 7.7 years [[Suissa2012]].
- In that cohort, the median time from the first to the second severe exacerbation was about 5 years. It fell to under 4 months between the 9th and 10th [[Suissa2012]].
- The risk of the next severe exacerbation was three times higher after the second and 24 times higher after the tenth, compared with the first [[Suissa2012]].
- Mortality after a severe exacerbation peaked at 40 deaths per 10,000 per day in the first week and fell gradually to 5 per 10,000 per day after 3 months [[Suissa2012]].
- In SUPPORT (1016 patients admitted with PaCO2 ≥50 mmHg), 11% died in hospital. Mortality was 20% at 60 days, 33% at 180 days, 43% at 1 year and 49% at 2 years [[Connors1996]].
- In SUPPORT, only 26% were alive with good-to-excellent quality of life at 6 months [[Connors1996]].
- In a Dutch cohort of 171 admissions, mortality was 8% in hospital and 23% at 1 year. It was 35% at 1 year for those admitted to ICU for respiratory failure [[Groenewegen2003]].
- In 304 Spanish men followed for 5 years, three or more hospital-treated exacerbations carried a mortality hazard ratio of 4.13 (95% CI 1.80–9.41). Age and PaCO2 were also independent predictors [[SolerCataluna2005]].
- GOLD 2023 states that long-term prognosis after hospitalisation for an exacerbation is poor, "with a five-year mortality rate of about 50%" [[Agusti2023]].
- In 2.3 million US Medicare COPD hospitalisations, 64.2% were readmitted within 1 year. 1-year mortality was 26.2% overall, 45.7% after invasive ventilation, 41.8% after NIV and 24.4% with no ventilation [[Lindenauer2018]].
- In the same data, the daily risk of readmission halved within 28–43 days and plateaued by 46–61 days, depending on ventilation [[Lindenauer2018]].
- The European COPD Audit (13 countries) found spirometry results for only 49.7% of admissions and blood gases for only 81.6%. Death risk rose with age, acidotic respiratory failure, need for ventilatory support and comorbidity [[Hartl2016]].

### hospital · When to admit and risk scores
- GOLD 2023 lists indications for hospitalisation: severe symptoms (sudden worsening of resting dyspnoea, high respiratory rate, low oxygen saturation, confusion, drowsiness), acute respiratory failure, new physical signs (cyanosis, peripheral oedema), failure of initial treatment, serious comorbidities (heart failure, new arrhythmias) and insufficient home support [[Agusti2023]].
- DECAF combines the five strongest admission predictors of in-hospital death: extended MRC Dyspnoea score, Eosinopenia, Consolidation, Acidaemia and atrial Fibrillation. In the derivation cohort of 920 patients (10.4% died), its AUROC was 0.86 [[Steer2012]].
- DECAF scoring: eMRCD 5a = 1 and 5b = 2; eosinophils <0.05 × 10⁹/L = 1; consolidation = 1; pH <7.30 = 1; atrial fibrillation = 1 (maximum 6) [[Echevarria2016]].
- In the 1725-patient validation cohort, in-hospital mortality by DECAF score was 0% (score 0), 1.5% (1), 5.4% (2), 15.3% (3), 31.0% (4), 40.5% (5) and 50.0% (6; n=2). AUROC was 0.83 internally and 0.82 externally [[Echevarria2016]].
- The validation authors say DECAF 0–1 identifies low-risk patients who may suit hospital at home or early supported discharge. DECAF 3–6 identifies high-risk patients for escalation planning or early palliation [[Echevarria2016]].
- A Cochrane review of 8 trials (870 patients) found hospital at home reduced readmissions compared with inpatient care (RR 0.76, 95% CI 0.59–0.99). The mortality trend (RR 0.65, 0.40–1.04) was not significant. Trials excluded people with arterial pH <7.35 [[Jeppesen2012]].

### hospital · Bronchodilators
- GOLD 2023: SABA, with or without SAMA, are the initial bronchodilators for an exacerbation, given by MDI with a spacer if needed, or by nebuliser. If a nebuliser is used, "air-driven is preferable to oxygen-driven nebulization to avoid the potential risk of increasing PaCO2" [[Agusti2023]].
- GOLD 2023 recommends continuing long-acting bronchodilators during the exacerbation, or starting them as soon as possible before discharge. It does not recommend IV methylxanthines because of lack of efficacy and significant side effects [[Agusti2023]].
- The BTS 2017 oxygen guideline says nebulised bronchodilators for patients with hypercapnic acidosis should be given by ultrasonic nebuliser or by a jet nebuliser driven by compressed air, with supplemental oxygen by nasal cannulae [[ODriscoll2017Summary]].
- For ambulances using oxygen-driven nebulisers in known COPD, the BTS guideline says to limit oxygen-driven nebulisation to 6 minutes [[ODriscoll2017Summary]].

### hospital · Systemic corticosteroids
- A Cochrane review (16 trials) found systemic corticosteroids reduced treatment failure compared with placebo (OR 0.48, 95% CI 0.35–0.67; NNT 9; high-quality evidence). 30-day mortality did not change (OR 1.00) [[Walters2014]].
- In that review, FEV1 improved by 140 mL by 72 hours, but the gain was not seen later. Adverse events were more likely (OR 2.33; one extra adverse event per six treated), including hyperglycaemia (OR 2.79) [[Walters2014]].
- Walters et al. found no benefit of parenteral over oral corticosteroid on treatment failure, relapse or mortality. Adverse effects were greater with parenteral treatment [[Walters2014]].
- In the VA SCCOPE trial (271 inpatients), treatment failure at 30 days was 23% with glucocorticoids versus 33% with placebo. An 8-week course was not better than 2 weeks, and hyperglycaemia needing treatment occurred in 15% versus 4% [[Niewoehner1999]].
- In 56 non-acidotic inpatients, prednisolone 30 mg daily for 14 days raised post-bronchodilator FEV1 % predicted from 28.2% to 41.5%, versus 25.7% to 32.2% with placebo, and shortened hospital stay [[Davies1999]].
- In 210 inpatients, 5 days of oral prednisolone 60 mg was non-inferior to IV prednisolone 60 mg: 90-day treatment failure was 56.3% (oral) versus 61.7% (IV) [[deJong2007]].
- REDUCE (314 emergency patients, 92% admitted) compared prednisone 40 mg daily for 5 versus 14 days. Re-exacerbation within 180 days was 37.2% versus 38.4% (HR 0.95, 90% CI 0.70–1.29; non-inferior) [[Leuppi2013]].
- In REDUCE, cumulative prednisone dose was 379 mg (5 days) versus 793 mg (14 days) [[Leuppi2013]].
- GOLD 2023 states: "A dose of 40 mg prednisone-equivalent per day for 5 days is recommended". Longer courses "increase the risk of pneumonia and mortality", and oral prednisolone is "equally effective to intravenous administration" [[Agusti2023]].
- ERS/ATS 2017 made conditional recommendations for oral corticosteroids in outpatients and for oral rather than intravenous corticosteroids in hospitalised patients [[Wedzicha2017]].
- In an eosinophil-guided pilot, 49% of exacerbations were not given prednisolone. Among exacerbations with eosinophils ≤2%, treatment failure was 15% with prednisolone versus 2% with placebo [[Bafadhel2012]] (Early evidence).
- CORTICO-COP (318 inpatients) gave prednisolone only on days with blood eosinophils ≥0.3 × 10⁹/L. Days alive and out of hospital were 8.9 versus 9.3 (non-inferior), and median steroid duration was 2 versus 5 days [[Sivapalan2019]] (Early evidence).
- GOLD 2023 notes that glucocorticoids "may be less efficacious" in patients with lower blood eosinophils [[Agusti2023]].

### hospital · Antibiotics
- Anthonisen's 1987 crossover trial (362 exacerbations) defined exacerbations by increased dyspnoea, sputum volume and sputum purulence. Treatment success was 68% with antibiotic versus 55% with placebo, and deterioration was 10% versus 19% [[Anthonisen1987]].
- GOLD 2023: antibiotics "should be given to patients with ECOPD who have increased sputum volume and sputum purulence and most of those requiring mechanical ventilation (invasive or noninvasive)". The recommended length is 5–7 days [[Agusti2023]].
- GOLD 2023 lists usual initial empirical choices as an aminopenicillin with clavulanic acid, a macrolide, a tetracycline or, in selected patients, a quinolone, chosen by local resistance patterns. Sputum cultures are advised for frequent exacerbators, severe obstruction or ventilated patients because of possible *Pseudomonas* or resistant organisms [[Agusti2023]].
- A Cochrane review (19 trials, 2663 people) found antibiotics reduced treatment failure in outpatients (RR 0.72; 295 to 212 per 1000; low-quality evidence). In non-ICU inpatients the reduction with current antibiotics was not significant (RR 0.65, 95% CI 0.38–1.12) [[Vollenweider2018]].
- In the single ICU trial in that review, antibiotics greatly reduced treatment failure (RR 0.19; 565 to 107 per 1000) and mortality (Peto OR 0.21) [[Vollenweider2018,Nouira2001]].
- That ICU trial (93 ventilated patients) gave ofloxacin 400 mg daily or placebo for 10 days. In-hospital deaths were 4% versus 22% (absolute risk reduction 17.5%) [[Nouira2001]].
- In 310 outpatients with mild-to-moderate COPD, amoxicillin/clavulanate gave clinical cure in 74.1% versus 59.9% with placebo. The best CRP cut-off for predicting failure on placebo was 40 mg/L [[Llor2012]].
- PACE (653 UK primary care patients) found point-of-care CRP guidance cut reported antibiotic use from 77.4% to 57.0% (adjusted OR 0.31) without worse 2-week health status [[Butler2019]].
- In 208 inpatients, procalcitonin guidance cut antibiotic prescription from 72% to 40% with similar clinical outcomes [[Stolz2007]].

### hospital · Controlled oxygen
- GOLD 2023: supplemental oxygen for hypoxaemia "should be titrated to a target saturation of 88–92%". Venturi masks give more accurate, controlled delivery than nasal prongs [[Agusti2023]].
- GOLD 2023 warns that pulse oximetry is less accurate than ABG and "may overestimate blood oxygen content among individuals with darker skin tones" [[Agusti2023]].
- In a Tasmanian cluster RCT (405 patients treated by paramedics), mortality was 9% with high-flow oxygen versus 4% with titrated oxygen (RR 0.42, 95% CI 0.20–0.89) [[Austin2010]].
- In the subgroup with spirometry-confirmed COPD, mortality was 9% versus 2% (RR 0.22, 95% CI 0.05–0.91) [[Austin2010]].
- Patients given titrated oxygen per protocol were less likely to have respiratory acidosis (mean pH difference 0.12) or hypercapnia (mean PaCO2 difference −33.6 mmHg) [[Austin2010]].
- The titrated arm targeted SpO2 88–92% [[Austin2010]] (unverified: target range not stated in the abstract; from the trial methods as cited in BTS 2017).
- A Cochrane review found this was still the only included pre-hospital trial (214 confirmed-COPD participants): 2 deaths with titrated oxygen versus 11 with high flow (RR 0.22; NNT 14). Certainty was low [[Kopsaftis2020]].
- BTS 2017: oxygen should be prescribed to achieve "a target saturation of 94–98% for most acutely ill patients or 88–92% or patient-specific target range for those at risk of hypercapnic respiratory failure" [[ODriscoll2017,ODriscoll2017Summary]].
- BTS 2017, before blood gases are available in COPD: "use a 24% Venturi mask at 2–3 L/min or 28% Venturi mask at 4 L/min or nasal cannulae at 1–2 L/min". Adjust to 94–98% if PCO2 is normal (unless there is a history of NIV or IMV) and recheck gases after 30–60 min [[ODriscoll2017Summary]].
- BTS 2017 states that the risk of respiratory acidosis in hypercapnic respiratory failure rises if PaO2 is above 10.0 kPa because of excessive oxygen [[ODriscoll2017Summary]].
- BTS 2017 warns that "sudden cessation of supplementary oxygen therapy can cause life-threatening rebound hypoxaemia". If oxygen-induced hypercapnia is suspected, oxygen should be stepped down to the lowest level that keeps 88–92%, not stopped [[ODriscoll2017Summary]].
- BTS 2017 recommends oxygen alert cards for patients with previous hypercapnic failure. Without a card, those who previously needed NIV or ventilation should start on 24% Venturi at 2–3 L/min with an initial target of 88–92% [[ODriscoll2017Summary]].
- A Critical Care review argues that clinicians' fear of oxygen-induced hypercapnia via loss of "hypoxic drive" is "not based on evidence in the literature" and recommends titrated oxygen [[Abdo2012]].

### hospital · Non-invasive ventilation (NIV): the evidence
- Brochard 1995 (85 ICU patients): NIV cut intubation from 74% to 26%, complications from 48% to 16%, mean stay from 35 to 23 days, and in-hospital mortality from 29% to 9% [[Brochard1995]].
- Plant 2000 (236 patients, 14 UK general respiratory wards, mild-to-moderate acidosis): treatment failure (intubation criteria) was 27% with standard care versus 15% with NIV. In-hospital mortality was 20% versus 10% [[Plant2000]].
- In Plant 2000, NIV improved pH faster in the first hour and lowered respiratory rate more by 4 hours [[Plant2000]].
- The 2017 Cochrane review (17 RCTs, 1264 participants) found NIV reduced mortality by 46% (RR 0.54, 95% CI 0.38–0.76; NNT 12) and intubation by 65% (RR 0.36, 0.28–0.46; NNT 5). Both were moderate-quality evidence [[Osadnik2017]].
- In that review, NIV shortened hospital stay by 3.39 days and improved pH by 0.05 and PaO2 by 7.47 mmHg at one hour. Intolerance was more frequent (risk difference 0.11) [[Osadnik2017]].
- The Cochrane review found benefit of similar size for mild (pH 7.30–7.35) and more severe (pH <7.30) acidosis, and in ICU or ward settings [[Osadnik2017]].
- The Cochrane inclusion definition of acute hypercapnic respiratory failure was a mean admission pH <7.35 and PaCO2 >45 mmHg (6 kPa) [[Osadnik2017]].
- The earlier 2003 meta-analysis (8 trials) reported RR 0.41 for mortality and 0.42 for intubation. It said NIV "should be tried early in the course of respiratory failure and before severe acidosis" [[Lightowler2003]].
- ERS/ATS 2017 made a strong recommendation for NIV in acute or acute-on-chronic respiratory failure in COPD exacerbations [[Wedzicha2017,Rochwerg2017]].
- ERS/ATS NIV 2017, as quoted in a review, also strongly recommends a trial of NIV in "patients considered to require endotracheal intubation and mechanical ventilation, unless the patient is immediately deteriorating" [[Rochwerg2017,Trethewey2018]].
- GOLD 2023: NIV "is the preferred initial mode of ventilation". Once patients can tolerate at least 4 hours of unassisted breathing, NIV can be stopped directly without weaning [[Agusti2023]].
- GOLD 2023 does not recommend respiratory stimulants (e.g. caffeine, doxapram) for exacerbations [[Agusti2023]].
- The ERS 2022 high-flow nasal cannula guideline suggests "trialling NIV prior to use of HFNC in patients with COPD and hypercapnic ARF" (conditional) [[Oczkowski2022]].
- GOLD 2023 notes that high-flow nasal therapy did not prevent intubation in hospitalised exacerbations [[Agusti2023]].

### hospital · NIV in practice: who, where, how fast
- BTS/ICS 2016, recommendation 25: "NIV should be started when pH <7.35 and pCO2 >6.5 kPa persist or develop despite optimal medical therapy" (grade A) [[Davidson2016,Davidson2016Summary]].
- BTS/ICS 2016, recommendation 26: "Severe acidosis alone does not preclude a trial of NIV in an appropriate area with ready access to staff who can perform safe endotracheal intubation" (grade B) [[Davidson2016Summary]].
- BTS/ICS 2016, recommendation 24: for most exacerbations, initial management should be optimal medical therapy with a target saturation of 88–92% (grade A). Recommendation 4: oxygen should be adjusted to SaO2 88–92% in all causes of hypercapnic respiratory failure treated with NIV (grade A) [[Davidson2016Summary]].
- BTS/ICS 2016 notes that acute hypercapnic respiratory failure complicates around 20% of COPD exacerbations. About 12% of hypercapnic COPD patients died during admission, and 33% if the acidosis developed after admission [[Davidson2016Summary]].
- BTS/ICS 2016, Box 1, lists indications for invasive ventilation: imminent respiratory arrest, severe distress, failure of or contraindication to NIV, "persisting pH <7.15 or deterioration in pH despite NIV", and GCS <8 [[Davidson2016Summary]].
- BTS/ICS 2016 good practice: maximise time on NIV in the first 24 h, then taper daytime use over 2–3 days before stopping overnight. NIV can be discontinued once pH and pCO2 have normalised and the patient is generally improved (recommendation 31, grade B) [[Davidson2016Summary]].
- BTS/ICS 2016 recommends one nurse for every 2 NIV patients, especially in the first 24 h [[Davidson2016Summary]].
- BTS/ICS 2016 recommends documenting an individualised plan for what happens if NIV fails before treatment starts. Advanced age alone should not preclude a trial of NIV (grade A) [[Davidson2016Summary]].
- BTS Quality Standard 4: patients who meet criteria "should start NIV within 60 min of the blood gas result associated with the clinical decision to provide NIV and within 120 min of hospital arrival" [[Davies2018]].
- BTS Quality Standard 6: all patients on acute NIV should have blood gases within 2 hours of starting. Failure to improve should trigger specialist review within 30 min [[Davies2018]].
- A UK national audit of 9716 admissions found 20% acidotic on admission, with another 6% becoming acidotic later. Of 1077 NIV patients, 55% had pH <7.26 [[Roberts2011]].
- In that audit, hospital mortality was 25% on NIV and 39% when acidosis developed late. 30% of patients with persisting respiratory acidosis did not get NIV [[Roberts2011]].
- In the European COPD Audit (16,016 admissions), 90-day mortality was 9.1%, 16.1% and 28.1% for non-acidotic (pH >7.35), mildly acidotic (7.25–7.35) and severely acidotic (<7.25) patients, as reported in a UK review [[Trethewey2018,Hartl2016]].
- Confalonieri's risk charts (1033 patients) put NIV failure risk above 70% with GCS <11, APACHE II ≥29, respiratory rate ≥30 and admission pH <7.25. pH <7.25 after 2 hours of NIV raised the risk above 90% [[Confalonieri2005]].
- In Plant's cohort, admission H+ (OR 1.22 per nmol/L) and PaCO2 predicted failure. Improving acidosis and falling respiratory rate at 4 h predicted success [[Plant2001]].
- Median survival in Plant's cohort was 16.8 months after NIV versus 13.4 months with standard care (p=0.12) [[Plant2001]].
- Jeffrey 1992 (139 episodes of type II failure) found death in 10 of 39 episodes where H+ reached ≥55 nmol/L (pH ≈7.26), versus 7 of 100 below that. Overall mortality was 12% [[Jeffrey1992]].
- In HOT-HMV, home NIV settings were a median IPAP of 24 cmH2O, EPAP of 4 cmH2O and backup rate of 14 breaths/min [[Murphy2017]].

### hospital · Discharge, readmission and follow-up
- GOLD 2023: early readmissions in the first 90 days are frequent. Risk factors are comorbidities, previous exacerbations and hospitalisations, and longer stay [[Agusti2023]].
- GOLD 2023 calls it good practice before discharge to cover inhaler education, home support and a follow-up plan. It advises follow-up within one month, which is linked to fewer readmissions, and again at three months [[Agusti2023]].
- A systematic review of 14 studies found COPD discharge bundles reduced readmissions (pooled RR 0.80, 95% CI 0.65–0.99; four trials at moderate-to-high risk of bias). There was no significant effect on mortality or quality of life [[Ospina2017]].
- A UK team described designing a discharge care bundle from guidelines, expert opinion and patient consultation, and piloting it with staff and patient input [[Hopkinson2012]].
- BTS/ICS 2016 discharge checklist after hypercapnic failure includes early specialist review, pulmonary rehabilitation, smoking-cessation help, future care planning, a warning card or ambulance alert for controlled oxygen, and consideration of home NIV [[Davidson2016Summary]].
- A Cochrane review of 20 trials found post-exacerbation pulmonary rehabilitation reduced readmissions (OR 0.44, 95% CI 0.21–0.91; heterogeneous, moderate quality). It improved SGRQ total by 7.80 points, above the 4-point minimal important difference [[Puhan2016]].
- ERS/ATS 2017 conditionally recommends starting pulmonary rehabilitation within 3 weeks after discharge and recommends against starting it during hospitalisation [[Wedzicha2017]].
- GOLD 2023 says the effects of starting pulmonary rehabilitation in the first 4 weeks after discharge are unclear [[Agusti2023]].
- HOT-HMV (116 patients with PaCO2 >53 mmHg 2–4 weeks after acidosis resolved) found home NIV plus oxygen lengthened median time to readmission or death from 1.4 to 4.3 months (adjusted HR 0.49) [[Murphy2017]].
- In HOT-HMV, 12-month readmission or death was 63.4% versus 80.4% [[Murphy2017]].
- GOLD 2023 recommends thromboembolism prophylaxis for hospitalised patients because of raised DVT and pulmonary embolism risk, and says smoking cessation should be "strongly" enforced [[Agusti2023]].

### bloodgas · Reference ranges and arithmetic for an interpreter
- Normal arterial pH is 7.35–7.45. ΔpH (pH − 7.40) of −0.05 to +0.05 is taken as normal [[Samuel2023]].
- Normal PaCO2 is 35–45 mmHg (PaCO2 − 40 between −5 and +5 mmHg) [[Samuel2023]].
- Standard base excess of −2 to +2 mmol/L is normal. Negative values point to metabolic acidosis and positive values to metabolic alkalosis [[Samuel2023]].
- Samuel's classification uses HCO3⁻ 22–26 mmol/L for respiratory acidosis without metabolic compensation, >26–35 for partial and >35–42 for marked compensation [[Samuel2023]].
- Hypercapnia thresholds used by guidelines: PaCO2 >6 kPa (45 mmHg) in Rome, BTS oxygen and Cochrane. BTS/ICS uses pCO2 >6.5 kPa for starting NIV [[Jacobson2023,ODriscoll2017Summary,Osadnik2017,Davidson2016Summary]].
- Hypoxaemia threshold in Rome: PaO2 ≤8 kPa [[Jacobson2023]].
- Consistency check: the modified Henderson equation [H⁺] (nmol/L) = 24 × PaCO2 (mmHg) / HCO3⁻ (mmol/L). [H⁺] can be estimated as 80 minus the two digits after the decimal point of pH, e.g. pH 7.23 → 57 nmol/L [[Sood2010]].
- pH–[H⁺] anchors from Sood's table: pH 7.00 = 100, 7.10 = 79, 7.20 = 63, 7.25 = 56, 7.30 = 50, 7.35 = 45, 7.40 = 40, 7.45 = 35, 7.50 = 32 nmol/L [[Sood2010]].
- Expected compensation in respiratory acidosis: acute, HCO3⁻ rises by 1 mEq/L per 10 mmHg rise in PaCO2 above 40. Chronic, it rises by 3.5 mEq/L per 10 mmHg [[Sood2010]].
- To judge acute versus chronic: ΔH⁺/ΔPaCO2 <0.3 suggests chronic, >0.8 acute, and 0.3–0.8 acute-on-chronic [[Sood2010]].
- In metabolic acidosis, expected PaCO2 = (1.5 × HCO3⁻ + 8) ± 2. A higher PaCO2 than expected implies a concomitant respiratory acidosis [[Sood2010]].
- Sood advises never interpreting PaO2 without knowing FiO2, and gives expected PaO2 as roughly five times the FiO2 percentage [[Sood2010]].
- Unit conversion: 1 kPa = 7.50 mmHg, so 6.0 kPa ≈ 45 mmHg, 6.5 kPa ≈ 49 mmHg and 8 kPa ≈ 60 mmHg (derived arithmetic, generated).

### bloodgas · Published decision thresholds (as stated)
- BTS 2017: if PCO2 is raised but pH ≥7.35 ([H⁺] ≤45 nmol/L) and/or bicarbonate is high (>28 mmol/L), "the patient has probably got long-standing hypercapnia". Keep 88–92% and repeat gases at 30–60 min [[ODriscoll2017Summary]].
- BTS 2017: "If the patient is hypercapnic (PCO2 >6 kPa or 45 mm Hg) and acidotic (pH <7.35 or [H+] >45 nmol/L), start NIV with targeted oxygen therapy if respiratory acidosis persists for more than 30 min after initial standard medical management" [[ODriscoll2017Summary]].
- BTS/ICS 2016: NIV when pH <7.35 and pCO2 >6.5 kPa persist or develop despite optimal medical therapy (grade A) [[Davidson2016Summary]].
- BTS/ICS 2016: "Conventionally, a pH <7.35 and a PCO2 >6.5 kPa defines acute respiratory failure". "More severe degrees of acidosis, such as pH <7.25, have been used as a threshold for considering provision of IMV" [[Davidson2016Summary]].
- BTS/ICS 2016 Box 1: persisting pH <7.15, or a falling pH despite NIV, is an indication for invasive ventilation [[Davidson2016Summary]].
- BTS/ICS 2016: permissive hypercapnia (pH 7.2–7.25) may be needed during invasive ventilation in severe obstruction to avoid high airway pressures (grade D). Expiratory time should be long (I:E 1:3 or more) with a low rate of 10–15/min to limit dynamic hyperinflation [[Davidson2016Summary]].
- Rome severe exacerbation: PaCO2 >45 mmHg and pH <7.35 [[Lee2023,Celli2022]].
- DECAF scores acidaemia at pH <7.30 [[Echevarria2016]].
- HOT-HMV defined persistent hypercapnia as PaCO2 >53 mmHg (≈7 kPa) 2–4 weeks after acidosis resolved [[Murphy2017]].
- Jeffrey 1992 required PaO2 <6.6 kPa and PaCO2 >6.6 kPa on air to enter, and used [H⁺] ≥55 nmol/L as the prognostic cut-off [[Jeffrey1992]].

### bloodgas · Sampling: arterial, venous, earlobe, oximetry
- In 234 exacerbation patients, venous and arterial pH (mean difference 0.03; limits −0.05 to 0.11) and HCO3⁻ agreed well. SpO2 agreed with SaO2 when SpO2 was >80% [[McKeever2016]].
- Arterial sampling needed more attempts and hurt more: median pain score 4 versus 1 for venous [[McKeever2016]].
- McKeever reported agreement for pH and HCO3⁻, not for CO2. Venous PCO2 should not be read as arterial PaCO2 [[McKeever2016]].
- BTS 2017: arterialised earlobe gases measure pH and PCO2 accurately, but PO2 "underestimates the oxygen tension by 0.5–1 kPa" [[ODriscoll2017Summary]].
- BTS 2017 (C2): local anaesthesia should be used for all arterial samples except in emergencies (grade A) [[ODriscoll2017Summary]].
- BTS 2017: "The presence of a normal SpO2 does not negate the need for blood gas measurements especially if the patient is on supplemental oxygen therapy" [[ODriscoll2017Summary]].
- BTS 2017: recheck gases after 30–60 min in COPD or other hypercapnia risk "even if the initial PCO2 measurement was normal" [[ODriscoll2017Summary]].
- The European COPD Audit found that only 81.6% of admitted patients had blood gases taken [[Hartl2016]].

### Exam hooks
- Rome severity is graded at the bedside (VAS ≥5, RR ≥24, HR ≥95, SpO2 <92% or drop >3%, CRP ≥10 mg/L). Severe means hypercapnia plus acidosis on ABG [[Jacobson2023,Celli2022]].
- The best predictor of future exacerbations is a past exacerbation [[Hurst2010]].
- Prednisone 40 mg for 5 days is as good as 14 days for re-exacerbation at 6 months (REDUCE) [[Leuppi2013]].
- Oral steroids work as well as IV [[deJong2007,Walters2014]].
- Anthonisen criteria = more dyspnoea, more sputum, more purulent sputum [[Anthonisen1987]].
- Titrated oxygen to 88–92% reduced pre-hospital mortality versus high flow (RR 0.42) [[Austin2010]].
- NIV: NNT 12 to prevent a death and NNT 5 to prevent an intubation [[Osadnik2017]].
- BTS/ICS: NIV when pH <7.35 and pCO2 >6.5 kPa persist despite optimal medical therapy. Start within 60 min of the qualifying gas [[Davidson2016Summary,Davies2018]].
- Stopping oxygen suddenly in oxygen-induced hypercapnia risks rebound hypoxaemia. Step it down instead [[ODriscoll2017Summary]].
- Chronic respiratory acidosis: HCO3⁻ rises about 3.5 mEq/L per 10 mmHg PaCO2. Acute: about 1 [[Sood2010]].
- High PCO2 with pH ≥7.35 and HCO3⁻ >28 mmol/L suggests long-standing hypercapnia [[ODriscoll2017Summary]].
- Venous gas agrees with arterial for pH and HCO3⁻, not for PCO2 [[McKeever2016]].

### In plain words
- A flare-up means your breathing, cough or phlegm gets clearly worse over a few days, up to two weeks [[Agusti2023]].
- Colds and chest infections cause most flare-ups [[Papi2006,Seemungal2001]].
- Getting treatment early helps you get better faster [[Wilkinson2004]].
- Many flare-ups take about a week to settle, but some take more than a month [[Seemungal2000]].
- If you have had one flare-up, you are more likely to have another. That is why doctors focus on prevention [[Hurst2010]].
- In hospital, a short course of steroid tablets (often 5 days) helps the airways calm down [[Leuppi2013,Agusti2023]].
- Antibiotics help most when phlegm becomes more and changes colour [[Anthonisen1987]].
- People with COPD may get less oxygen than you expect. Too much oxygen can make carbon dioxide build up, so staff aim for a level of about 88–92% [[Austin2010,ODriscoll2017Summary]].
- If carbon dioxide builds up and the blood turns acidic, a mask machine (NIV) can help you breathe and often avoids a breathing tube [[Osadnik2017]].
- A blood gas test measures oxygen, carbon dioxide and acid in your blood, usually from an artery in the wrist [[ODriscoll2017Summary]].
- An oxygen alert card tells ambulance crews how much oxygen is safe for you [[ODriscoll2017Summary]].
- A check-up within a month of leaving hospital, and a rehab course, lower the chance of going back in [[Agusti2023,Puhan2016]].

### flareups · Step sequence
1. **Kicker: Trigger · Title: A virus or new bacteria reaches the airways.** Most hospital-treated flare-ups carry a virus, bacteria or both (78% in one series), often after a cold [[Papi2006,Seemungal2001]].
2. **Kicker: Inflammation · Title: The airways swell and fill with mucus.** Airway and whole-body inflammation rise and the lungs hyperinflate, so breathing gets harder [[WedzichaSeemungal2007]].
3. **Kicker: Symptoms · Title: Breathlessness, cough and sputum worsen over ≤14 days.** That is the Rome definition, and severity is graded from VAS, breathing rate, heart rate, SpO2 and CRP [[Agusti2023,Jacobson2023]].
4. **Kicker: Act early · Title: Each day's delay slows recovery.** Each day of delay before treatment added about 0.42 days to recovery [[Wilkinson2004]].
5. **Kicker: Recovery · Title: Most recover in about a week, some never fully.** Median recovery was 6–7 days, but peak flow had not recovered in 7.1% of exacerbations at 91 days [[Seemungal2000]].
6. **Kicker: Pattern · Title: One flare-up predicts the next.** A history of exacerbations was the strongest predictor across all GOLD stages [[Hurst2010,Rothnie2018]].

### hospital · Step sequence
1. **Kicker: Arrival · Title: Controlled oxygen, then a blood gas.** In COPD, BTS 2017 starts with 24–28% Venturi oxygen targeting 88–92% and gets a blood gas, rechecked at 30–60 min [[ODriscoll2017Summary]].
2. **Kicker: Medicines · Title: Bronchodilators, 5 days of steroid, antibiotics if sputum is purulent.** GOLD 2023 lists SABA ± SAMA, prednisone 40 mg for 5 days, and antibiotics for 5–7 days when sputum increases and turns purulent [[Agusti2023]].
3. **Kicker: Check the acid · Title: pH <7.35 with high CO2 despite treatment.** BTS/ICS recommends NIV when pH <7.35 and pCO2 >6.5 kPa persist despite optimal medical therapy [[Davidson2016Summary]].
4. **Kicker: NIV · Title: The mask machine within the hour.** Start NIV within 60 min of the qualifying gas and recheck gases within 2 h [[Davies2018]]. Doing so halves mortality (RR 0.54) [[Osadnik2017]].
5. **Kicker: Escalate or ease off · Title: Intubate if pH keeps falling, wean as it normalises.** Persisting pH <7.15 or worsening pH despite NIV is an indication for invasive ventilation. NIV stops once pH and pCO2 normalise [[Davidson2016Summary]].
6. **Kicker: Going home · Title: Bundle, follow-up, rehab.** Discharge bundles (RR 0.80) and post-exacerbation rehab (OR 0.44) reduced readmissions, and GOLD advises review within a month [[Ospina2017,Puhan2016,Agusti2023]].

### bloodgas · Step sequence
1. **Kicker: Step 1 · Title: Is the sample consistent?** Check that [H⁺] = 24 × PaCO2/HCO3⁻ agrees with the pH (pH 7.40 = 40 nmol/L) [[Sood2010]].
2. **Kicker: Step 2 · Title: Acidaemia or alkalaemia?** Normal pH is 7.35–7.45, and below 7.35 is acidaemia [[Samuel2023]].
3. **Kicker: Step 3 · Title: Is CO2 the culprit?** PaCO2 above 45 mmHg (6 kPa) with low pH means respiratory acidosis [[Samuel2023,ODriscoll2017Summary]].
4. **Kicker: Step 4 · Title: Acute or chronic?** In chronic retention, HCO3⁻ rises about 3.5 mEq/L per 10 mmHg CO2 (acute: about 1). BTS reads high CO2 with pH ≥7.35 and HCO3⁻ >28 as long-standing [[Sood2010,ODriscoll2017Summary]].
5. **Kicker: Step 5 · Title: Oxygen in context.** Interpret PaO2 only with FiO2. Rome treats PaO2 ≤8 kPa as hypoxaemia, and BTS warns that PaO2 >10 kPa in hypercapnic patients signals excess oxygen [[Sood2010,Jacobson2023,ODriscoll2017Summary]].
6. **Kicker: Step 6 · Title: Does it meet the NIV line?** pH <7.35 with pCO2 >6.5 kPa despite optimal therapy (BTS/ICS), or >6 kPa persisting 30 min (BTS O2), meets the published NIV threshold. pH <7.25 marks higher NIV failure risk [[Davidson2016Summary,ODriscoll2017Summary,Confalonieri2005]].

## Numbers for the animations
- rome_mild_rr_max | threshold | 24 | breaths/min (mild if below) | [[Jacobson2023]]
- rome_mild_hr_max | threshold | 95 | bpm (mild if below) | [[Jacobson2023]]
- rome_mild_spo2_min | threshold | 92 | % on air (mild if at or above) | [[Jacobson2023]]
- rome_spo2_change | threshold | 3 | % drop from baseline | [[Jacobson2023]]
- rome_vas | threshold | 5 | 0–10 dyspnoea VAS | [[Jacobson2023]]
- rome_crp | threshold | 10 | mg/L | [[Jacobson2023]]
- rome_moderate_count | rule | 3 | of 5 criteria | [[Jacobson2023]]
- rome_severe_paco2 | threshold | 45 | mmHg (>6 kPa) with pH <7.35 | [[Lee2023,Jacobson2023]]
- rome_hypoxaemia_pao2 | threshold | 8 | kPa | [[Jacobson2023]]
- rome_validation_mild | share | 30.9 | % of 740 events | [[Lee2023]]
- rome_validation_moderate | share | 58.6 | % of 740 events | [[Lee2023]]
- rome_validation_severe | share | 10.4 | % of 740 events | [[Lee2023]]
- eclipse_exac_rate_gold2 | year 1 | 0.85 | per person | [[Hurst2010]]
- eclipse_exac_rate_gold3 | year 1 | 1.34 | per person | [[Hurst2010]]
- eclipse_exac_rate_gold4 | year 1 | 2.00 | per person | [[Hurst2010]]
- eclipse_frequent_gold2 | year 1 | 22 | % with ≥2 | [[Hurst2010]]
- eclipse_frequent_gold3 | year 1 | 33 | % with ≥2 | [[Hurst2010]]
- eclipse_frequent_gold4 | year 1 | 47 | % with ≥2 | [[Hurst2010]]
- recovery_pefr_median | day | 6 | days | [[Seemungal2000]]
- recovery_symptoms_median | day | 7 | days | [[Seemungal2000]]
- recovery_pefr_complete | day 35 | 75.2 | % of exacerbations recovered | [[Seemungal2000]]
- recovery_pefr_not_recovered | day 91 | 7.1 | % of exacerbations | [[Seemungal2000]]
- treatment_delay_median | onset | 3.69 | days | [[Wilkinson2004]]
- recovery_penalty_per_delay_day | per day | 0.42 | days | [[Wilkinson2004]]
- fev1_decline_frequent | per year | -40.1 | mL/year | [[Donaldson2002]]
- fev1_decline_infrequent | per year | -32.1 | mL/year | [[Donaldson2002]]
- suissa_daily_mortality | week 1 | 40 | deaths per 10,000 per day | [[Suissa2012]]
- suissa_daily_mortality | 3 months | 5 | deaths per 10,000 per day | [[Suissa2012]]
- suissa_cum_mortality | 3.6 years | 50 | % dead | [[Suissa2012]]
- suissa_cum_mortality | 7.7 years | 75 | % dead | [[Suissa2012]]
- suissa_gap_1st_to_2nd | median | 5 | years (approx.) | [[Suissa2012]]
- suissa_gap_9th_to_10th | median | 4 | months (less than) | [[Suissa2012]]
- support_mortality | in hospital | 11 | % | [[Connors1996]]
- support_mortality | 60 days | 20 | % | [[Connors1996]]
- support_mortality | 180 days | 33 | % | [[Connors1996]]
- support_mortality | 1 year | 43 | % | [[Connors1996]]
- support_mortality | 2 years | 49 | % | [[Connors1996]]
- groenewegen_mortality | in hospital | 8 | % | [[Groenewegen2003]]
- groenewegen_mortality | 1 year | 23 | % | [[Groenewegen2003]]
- medicare_readmission | 1 year | 64.2 | % | [[Lindenauer2018]]
- medicare_mortality_all | 1 year | 26.2 | % | [[Lindenauer2018]]
- medicare_mortality_imv | 1 year | 45.7 | % | [[Lindenauer2018]]
- medicare_mortality_niv | 1 year | 41.8 | % | [[Lindenauer2018]]
- medicare_mortality_novent | 1 year | 24.4 | % | [[Lindenauer2018]]
- decaf_mortality | score 0 | 0 | % in-hospital (n=255) | [[Echevarria2016]]
- decaf_mortality | score 1 | 1.5 | % (n=519) | [[Echevarria2016]]
- decaf_mortality | score 2 | 5.4 | % (n=498) | [[Echevarria2016]]
- decaf_mortality | score 3 | 15.3 | % (n=301) | [[Echevarria2016]]
- decaf_mortality | score 4 | 31.0 | % (n=113) | [[Echevarria2016]]
- decaf_mortality | score 5 | 40.5 | % (n=37) | [[Echevarria2016]]
- decaf_mortality | score 6 | 50.0 | % (n=2) | [[Echevarria2016]]
- euaudit_90d_mortality | pH >7.35 | 9.1 | % | [[Trethewey2018,Hartl2016]]
- euaudit_90d_mortality | pH 7.25–7.35 | 16.1 | % | [[Trethewey2018,Hartl2016]]
- euaudit_90d_mortality | pH <7.25 | 28.1 | % | [[Trethewey2018,Hartl2016]]
- reduce_reexac_5d | 180 days | 37.2 | % | [[Leuppi2013]]
- reduce_reexac_14d | 180 days | 38.4 | % | [[Leuppi2013]]
- reduce_cum_prednisone_5d | course | 379 | mg | [[Leuppi2013]]
- reduce_cum_prednisone_14d | course | 793 | mg | [[Leuppi2013]]
- cochrane_steroid_fev1_gain | 72 h | 140 | mL | [[Walters2014]]
- anthonisen_success_placebo | 21 days | 55 | % | [[Anthonisen1987]]
- anthonisen_success_antibiotic | 21 days | 68 | % | [[Anthonisen1987]]
- pace_antibiotic_use_usual | 4 weeks | 77.4 | % | [[Butler2019]]
- pace_antibiotic_use_crp | 4 weeks | 57.0 | % | [[Butler2019]]
- austin_mortality_highflow | admission | 9 | % (all) | [[Austin2010]]
- austin_mortality_titrated | admission | 4 | % (all) | [[Austin2010]]
- austin_mortality_highflow_confirmed | admission | 9 | % (confirmed COPD) | [[Austin2010]]
- austin_mortality_titrated_confirmed | admission | 2 | % (confirmed COPD) | [[Austin2010]]
- o2_target_hypercapnia_risk | range | 88–92 | % SpO2 | [[ODriscoll2017Summary,Agusti2023]]
- o2_target_most_acutely_ill | range | 94–98 | % SpO2 | [[ODriscoll2017Summary]]
- o2_excess_pao2 | threshold | 10.0 | kPa | [[ODriscoll2017Summary]]
- brochard_intubation_standard | admission | 74 | % | [[Brochard1995]]
- brochard_intubation_niv | admission | 26 | % | [[Brochard1995]]
- brochard_mortality_standard | admission | 29 | % | [[Brochard1995]]
- brochard_mortality_niv | admission | 9 | % | [[Brochard1995]]
- plant_failure_standard | admission | 27 | % | [[Plant2000]]
- plant_failure_niv | admission | 15 | % | [[Plant2000]]
- plant_mortality_standard | admission | 20 | % | [[Plant2000]]
- plant_mortality_niv | admission | 10 | % | [[Plant2000]]
- cochrane_niv_mortality_rr | pooled | 0.54 | risk ratio (NNT 12) | [[Osadnik2017]]
- cochrane_niv_intubation_rr | pooled | 0.36 | risk ratio (NNT 5) | [[Osadnik2017]]
- cochrane_niv_ph_gain | 1 h | 0.05 | pH units | [[Osadnik2017]]
- niv_start_time | qualifying gas | 60 | min | [[Davies2018]]
- niv_repeat_gas | after start | 120 | min | [[Davies2018]]
- niv_failure_risk | admission pH <7.25 + GCS <11, APACHE ≥29, RR ≥30 | >70 | % | [[Confalonieri2005]]
- niv_failure_risk | pH <7.25 after 2 h | >90 | % | [[Confalonieri2005]]
- hothmv_readmit_death_o2 | 12 months | 80.4 | % | [[Murphy2017]]
- hothmv_readmit_death_niv | 12 months | 63.4 | % | [[Murphy2017]]
- hothmv_median_time_o2 | readmission or death | 1.4 | months | [[Murphy2017]]
- hothmv_median_time_niv | readmission or death | 4.3 | months | [[Murphy2017]]
- abg_ph_normal | range | 7.35–7.45 | pH | [[Samuel2023]]
- abg_paco2_normal | range | 35–45 | mmHg | [[Samuel2023]]
- abg_hco3_band | uncompensated | 22–26 | mmol/L | [[Samuel2023]]
- abg_sbe_normal | range | -2 to +2 | mmol/L | [[Samuel2023]]
- abg_niv_ph | BTS/ICS | <7.35 | pH | [[Davidson2016Summary]]
- abg_niv_pco2 | BTS/ICS | >6.5 | kPa | [[Davidson2016Summary]]
- abg_niv_pco2 | BTS O2 | >6.0 | kPa (45 mmHg) | [[ODriscoll2017Summary]]
- abg_imv_consider | BTS/ICS (conventional) | <7.25 | pH | [[Davidson2016Summary]]
- abg_imv_indication | BTS/ICS Box 1 | <7.15 | pH persisting | [[Davidson2016Summary]]
- abg_chronic_hco3 | BTS O2 | >28 | mmol/L | [[ODriscoll2017Summary]]
- h_ion | pH 7.00 | 100 | nmol/L | [[Sood2010]]
- h_ion | pH 7.10 | 79 | nmol/L | [[Sood2010]]
- h_ion | pH 7.20 | 63 | nmol/L | [[Sood2010]]
- h_ion | pH 7.25 | 56 | nmol/L | [[Sood2010]]
- h_ion | pH 7.30 | 50 | nmol/L | [[Sood2010]]
- h_ion | pH 7.35 | 45 | nmol/L | [[Sood2010]]
- h_ion | pH 7.40 | 40 | nmol/L | [[Sood2010]]
- h_ion | pH 7.45 | 35 | nmol/L | [[Sood2010]]
- h_ion | pH 7.50 | 32 | nmol/L | [[Sood2010]]
- comp_resp_acid_acute | per 10 mmHg PaCO2 | 1 | mEq/L HCO3⁻ rise | [[Sood2010]]
- comp_resp_acid_chronic | per 10 mmHg PaCO2 | 3.5 | mEq/L HCO3⁻ rise | [[Sood2010]]
- vbg_abg_ph_bias | mean difference | 0.03 | pH units (LoA −0.05 to 0.11) | [[McKeever2016]]
- vbg_abg_hco3_bias | mean difference | -0.04 | mmol/L (LoA −2.90 to 2.82) | [[McKeever2016]]
- earlobe_po2_underestimate | bias | 0.5–1 | kPa | [[ODriscoll2017Summary]]

Interpreter worked examples (generated from the cited rules; label as generated):
- Example A, acute respiratory acidosis: PaCO2 60 mmHg, expected acute HCO3⁻ = 24 + 2 × 1 = 26 mmol/L, [H⁺] = 24 × 60/26 ≈ 55 nmol/L → pH ≈ 7.26. This meets the BTS/ICS NIV threshold if it persists despite optimal therapy (6.5 kPa ≈ 49 mmHg) [[Sood2010,Davidson2016Summary]].
- Example B, chronic compensated: PaCO2 60 mmHg, expected chronic HCO3⁻ = 24 + 2 × 3.5 = 31 mmol/L, [H⁺] = 24 × 60/31 ≈ 46 nmol/L → pH ≈ 7.34–7.35. Near the line. BTS reads PCO2 raised with pH ≥7.35 and HCO3⁻ >28 as long-standing hypercapnia [[Sood2010,ODriscoll2017Summary]].
- Example C, acute-on-chronic: PaCO2 80 mmHg with HCO3⁻ 32 mmol/L, [H⁺] = 24 × 80/32 = 60 nmol/L → pH ≈ 7.22. pH <7.25 marks a higher NIV failure risk [[Sood2010,Confalonieri2005]].

## Open questions and controversies
- Rome versus older definitions: Rome downgraded severity compared with GOLD 2022 in a Swedish cohort [[Jacobson2023]] and outperformed GesEPOC 2021 for ICU/ventilation prediction in Korea [[Lee2023]]. GOLD 2023 itself says prospective validation is still needed [[Agusti2023]]. Status: being validated.
- Hypercapnia cut-off for NIV: BTS/ICS uses pCO2 >6.5 kPa [[Davidson2016Summary]], while BTS 2017 oxygen guidance, Rome and Cochrane use >6 kPa (45 mmHg) [[ODriscoll2017Summary,Jacobson2023,Osadnik2017]]. All agree on pH <7.35. An interpreter should show both lines.
- How long to wait before NIV: BTS 2017 says acidosis persisting >30 min after initial treatment [[ODriscoll2017Summary]]. BTS/ICS says "despite optimal medical therapy" [[Davidson2016Summary]]. The Quality Standard sets 60 min from the qualifying gas [[Davies2018]].
- Severe acidosis: older practice treated pH <7.25 as a line for invasive ventilation [[Davidson2016Summary]]. Cochrane found similar NIV benefit below pH 7.30 [[Osadnik2017]], and BTS/ICS says severe acidosis alone does not preclude an NIV trial where intubation is available [[Davidson2016Summary]]. Failure risk is still much higher below 7.25 [[Confalonieri2005]].
- Eosinophil-guided steroids: CORTICO-COP was non-inferior with fewer steroid days [[Sivapalan2019]], and Bafadhel's pilot suggested placebo may be better when eosinophils are ≤2% [[Bafadhel2012]]. GOLD 2023 only says steroids "may be less efficacious" with low eosinophils [[Agusti2023]]. (Early evidence)
- Antibiotics in non-ICU inpatients: the Cochrane estimate for current antibiotics was not significant (RR 0.65, 0.38–1.12) [[Vollenweider2018]]. GOLD recommends them with purulent sputum [[Agusti2023]]. Biomarker guidance by CRP [[Butler2019]] or procalcitonin [[Stolz2007]] cut use without apparent harm.
- Timing of post-exacerbation rehab: Cochrane found fewer readmissions with heterogeneous trials [[Puhan2016]]. ERS/ATS suggests starting within 3 weeks of discharge [[Wedzicha2017]]. GOLD 2023 calls starting within 4 weeks "unclear" [[Agusti2023]].
- Readmission bundles: pooled RR 0.80 came from trials at moderate-to-high risk of bias, with no proven effect on mortality [[Ospina2017]].
- Where to give NIV: UK practice is largely ward-based [[Trethewey2018]], and audit mortality (25%) is far above trial mortality [[Roberts2011]]. The audit suggests NIV is often used as a ceiling of treatment in sicker, mixed-acidosis patients [[Roberts2011]].
- Oximetry bias: GOLD 2023 flags overestimation in darker skin tones, which matters for an 88–92% target [[Agusti2023]].
- Normal PaO2 depends on age and altitude. No validated open source with a fixed adult PaO2 reference range was obtained in this pass, so the interpreter should take PaO2 references from the local laboratory or label any range as illustrative (unverified).

## Sources
- [Agusti2023] Agustí A, Celli BR, Criner GJ, Halpin D, Anzueto A, Barnes P, et al. Global Initiative for Chronic Obstructive Lung Disease 2023 Report: GOLD Executive Summary. Am J Respir Crit Care Med. 2023;207(7):819-837. PMID 36856433; PMCID PMC10111975; doi:10.1164/rccm.202301-0106PP. Exacerbation section read in open full text (Europe PMC). (validated: PubMed)
- [Celli2022] Celli BR, Fabbri LM, Aaron SD, Agusti A, Brook R, Criner GJ, et al. An Updated Definition and Severity Classification of Chronic Obstructive Pulmonary Disease Exacerbations: The Rome Proposal. Am J Respir Crit Care Med. 2021;204(11):1251-1258. PMID 34570991; doi:10.1164/rccm.202108-1819PP. No abstract or open full text; thresholds checked via Jacobson2023, Lee2023 and Agusti2023. (validated: PubMed)
- [Jacobson2023] Jacobson PK, Lind L, Persson HL. Applying the Rome Proposal on Exacerbations of Chronic Obstructive Pulmonary Disease: Does Comorbid Chronic Heart Failure Matter? Int J Chron Obstruct Pulmon Dis. 2023;18:2055-2064. PMID 37744733; PMCID PMC10517701; doi:10.2147/COPD.S425592. (validated: PubMed)
- [Lee2023] Lee HJ, Lee JK, Park TY, Heo EY, Kim DK, Lee HW. Validation of the Rome proposal for severity of acute exacerbation of chronic obstructive pulmonary disease. Ther Adv Respir Dis. 2023;17:17534666231172917. PMID 37338152; PMCID PMC10286168; doi:10.1177/17534666231172917. (validated: PubMed)
- [Hurst2010] Hurst JR, Vestbo J, Anzueto A, Locantore N, Müllerova H, Tal-Singer R, et al. Susceptibility to exacerbation in chronic obstructive pulmonary disease. N Engl J Med. 2010;363(12):1128-1138. PMID 20843247; doi:10.1056/NEJMoa0909883. (validated: PubMed)
- [Rothnie2018] Rothnie KJ, Müllerová H, Smeeth L, Quint JK. Natural History of Chronic Obstructive Pulmonary Disease Exacerbations in a General Practice-based Population with Chronic Obstructive Pulmonary Disease. Am J Respir Crit Care Med. 2018;198(4):464-471. PMID 29474094; PMCID PMC6118021; doi:10.1164/rccm.201710-2029OC. (validated: PubMed)
- [Seemungal1998] Seemungal TA, Donaldson GC, Paul EA, Bestall JC, Jeffries DJ, Wedzicha JA. Effect of exacerbation on quality of life in patients with chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 1998;157(5 Pt 1):1418-1422. PMID 9603117; doi:10.1164/ajrccm.157.5.9709032. (validated: PubMed)
- [Seemungal2000] Seemungal TA, Donaldson GC, Bhowmik A, Jeffries DJ, Wedzicha JA. Time course and recovery of exacerbations in patients with chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 2000;161(5):1608-1613. PMID 10806163; doi:10.1164/ajrccm.161.5.9908022. (validated: PubMed)
- [Seemungal2001] Seemungal T, Harper-Owen R, Bhowmik A, Moric I, Sanderson G, Message S, et al. Respiratory viruses, symptoms, and inflammatory markers in acute exacerbations and stable chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 2001;164(9):1618-1623. PMID 11719299; doi:10.1164/ajrccm.164.9.2105011. (validated: PubMed)
- [Donaldson2002] Donaldson GC, Seemungal TA, Bhowmik A, Wedzicha JA. Relationship between exacerbation frequency and lung function decline in chronic obstructive pulmonary disease. Thorax. 2002;57(10):847-852. PMID 12324669; PMCID PMC1746193; doi:10.1136/thorax.57.10.847. (validated: PubMed)
- [Wilkinson2004] Wilkinson TM, Donaldson GC, Hurst JR, Seemungal TA, Wedzicha JA. Early therapy improves outcomes of exacerbations of chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 2004;169(12):1298-1303. PMID 14990395; doi:10.1164/rccm.200310-1443OC. (validated: PubMed)
- [Papi2006] Papi A, Bellettato CM, Braccioni F, Romagnoli M, Casolari P, Caramori G, et al. Infections and airway inflammation in chronic obstructive pulmonary disease severe exacerbations. Am J Respir Crit Care Med. 2006;173(10):1114-1121. PMID 16484677; doi:10.1164/rccm.200506-859OC. (validated: PubMed)
- [Sethi2002] Sethi S, Evans N, Grant BJ, Murphy TF. New strains of bacteria and exacerbations of chronic obstructive pulmonary disease. N Engl J Med. 2002;347(7):465-471. PMID 12181400; doi:10.1056/NEJMoa012561. (validated: PubMed)
- [Bafadhel2011] Bafadhel M, McKenna S, Terry S, Mistry V, Reid C, Haldar P, et al. Acute exacerbations of chronic obstructive pulmonary disease: identification of biologic clusters and their biomarkers. Am J Respir Crit Care Med. 2011;184(6):662-671. PMID 21680942; doi:10.1164/rccm.201104-0597OC. (validated: PubMed)
- [WedzichaSeemungal2007] Wedzicha JA, Seemungal TA. COPD exacerbations: defining their cause and prevention. Lancet. 2007;370(9589):786-796. PMID 17765528; PMCID PMC7134993; doi:10.1016/S0140-6736(07)61382-8. (validated: PubMed)
- [Aleva2017] Aleva FE, Voets LWLM, Simons SO, de Mast Q, van der Ven AJAM, Heijdra YF. Prevalence and Localization of Pulmonary Embolism in Unexplained Acute Exacerbations of COPD: A Systematic Review and Meta-analysis. Chest. 2017;151(3):544-554. PMID 27522956; doi:10.1016/j.chest.2016.07.034. (validated: PubMed)
- [Criner2015] Criner GJ, Bourbeau J, Diekemper RL, Ouellette DR, Goodridge D, Hernandez P, et al. Prevention of acute exacerbations of COPD: American College of Chest Physicians and Canadian Thoracic Society Guideline. Chest. 2015;147(4):894-942. PMID 25321320; PMCID PMC4388124; doi:10.1378/chest.14-1676. (validated: PubMed)
- [SolerCataluna2005] Soler-Cataluña JJ, Martínez-García MA, Román Sánchez P, Salcedo E, Navarro M, Ochando R. Severe acute exacerbations and mortality in patients with chronic obstructive pulmonary disease. Thorax. 2005;60(11):925-931. PMID 16055622; PMCID PMC1747235; doi:10.1136/thx.2005.040527. (validated: PubMed)
- [Suissa2012] Suissa S, Dell'Aniello S, Ernst P. Long-term natural history of chronic obstructive pulmonary disease: severe exacerbations and mortality. Thorax. 2012;67(11):957-963. PMID 22684094; PMCID PMC3505864; doi:10.1136/thoraxjnl-2011-201518. (validated: PubMed)
- [Connors1996] Connors AF Jr, Dawson NV, Thomas C, Harrell FE Jr, Desbiens N, Fulkerson WJ, et al. Outcomes following acute exacerbation of severe chronic obstructive lung disease. The SUPPORT investigators. Am J Respir Crit Care Med. 1996;154(4 Pt 1):959-967. PMID 8887592; doi:10.1164/ajrccm.154.4.8887592. (validated: PubMed)
- [Groenewegen2003] Groenewegen KH, Schols AM, Wouters EF. Mortality and mortality-related factors after hospitalization for acute exacerbation of COPD. Chest. 2003;124(2):459-467. PMID 12907529; doi:10.1378/chest.124.2.459. (validated: PubMed)
- [Lindenauer2018] Lindenauer PK, Dharmarajan K, Qin L, Lin Z, Gershon AS, Krumholz HM. Risk Trajectories of Readmission and Death in the First Year after Hospitalization for Chronic Obstructive Pulmonary Disease. Am J Respir Crit Care Med. 2018;197(8):1009-1017. PMID 29206052; PMCID PMC5909167; doi:10.1164/rccm.201709-1852OC. (validated: PubMed)
- [Hartl2016] Hartl S, Lopez-Campos JL, Pozo-Rodriguez F, Castro-Acosta A, Studnicka M, Kaiser B, et al. Risk of death and readmission of hospital-admitted COPD exacerbations: European COPD Audit. Eur Respir J. 2016;47(1):113-121. PMID 26493806; doi:10.1183/13993003.01391-2014. (validated: PubMed)
- [Steer2012] Steer J, Gibson J, Bourke SC. The DECAF Score: predicting hospital mortality in exacerbations of chronic obstructive pulmonary disease. Thorax. 2012;67(11):970-976. PMID 22895999; doi:10.1136/thoraxjnl-2012-202103. (validated: PubMed)
- [Echevarria2016] Echevarria C, Steer J, Heslop-Marshall K, Stenton SC, Hickey PM, Hughes R, et al. Validation of the DECAF score to predict hospital mortality in acute exacerbations of COPD. Thorax. 2016;71(2):133-140. PMID 26769015; PMCID PMC4752621; doi:10.1136/thoraxjnl-2015-207775. Scoring table and Table 4 read in open full text. (validated: PubMed)
- [Jeppesen2012] Jeppesen E, Brurberg KG, Vist GE, Wedzicha JA, Wright JJ, Greenstone M, et al. Hospital at home for acute exacerbations of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2012;(5):CD003573. PMID 22592692; PMCID PMC11622732; doi:10.1002/14651858.CD003573.pub2. (validated: PubMed)
- [Wedzicha2017] Wedzicha JA, Miravitlles M, Hurst JR, Calverley PMA, Albert RK, Anzueto A, et al. Management of COPD exacerbations: a European Respiratory Society/American Thoracic Society guideline. Eur Respir J. 2017;49(3):1600791. PMID 28298398; doi:10.1183/13993003.00791-2016. (validated: PubMed)
- [Walters2014] Walters JA, Tan DJ, White CJ, Gibson PG, Wood-Baker R, Walters EH. Systemic corticosteroids for acute exacerbations of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2014;(9):CD001288. PMID 25178099; PMCID PMC11195634; doi:10.1002/14651858.CD001288.pub4. (validated: PubMed)
- [Niewoehner1999] Niewoehner DE, Erbland ML, Deupree RH, Collins D, Gross NJ, Light RW, et al. Effect of systemic glucocorticoids on exacerbations of chronic obstructive pulmonary disease. Department of Veterans Affairs Cooperative Study Group. N Engl J Med. 1999;340(25):1941-1947. PMID 10379017; doi:10.1056/NEJM199906243402502. (validated: PubMed)
- [Davies1999] Davies L, Angus RM, Calverley PM. Oral corticosteroids in patients admitted to hospital with exacerbations of chronic obstructive pulmonary disease: a prospective randomised controlled trial. Lancet. 1999;354(9177):456-460. PMID 10465169; doi:10.1016/s0140-6736(98)11326-0. (validated: PubMed)
- [deJong2007] de Jong YP, Uil SM, Grotjohan HP, Postma DS, Kerstjens HA, van den Berg JW. Oral or IV prednisolone in the treatment of COPD exacerbations: a randomized, controlled, double-blind study. Chest. 2007;132(6):1741-1747. PMID 17646228; doi:10.1378/chest.07-0208. (validated: PubMed)
- [Leuppi2013] Leuppi JD, Schuetz P, Bingisser R, Bodmer M, Briel M, Drescher T, et al. Short-term vs conventional glucocorticoid therapy in acute exacerbations of chronic obstructive pulmonary disease: the REDUCE randomized clinical trial. JAMA. 2013;309(21):2223-2231. PMID 23695200; doi:10.1001/jama.2013.5023. (validated: PubMed)
- [Bafadhel2012] Bafadhel M, McKenna S, Terry S, Mistry V, Pancholi M, Venge P, et al. Blood eosinophils to direct corticosteroid treatment of exacerbations of chronic obstructive pulmonary disease: a randomized placebo-controlled trial. Am J Respir Crit Care Med. 2012;186(1):48-55. PMID 22447964; PMCID PMC3400995; doi:10.1164/rccm.201108-1553OC. (validated: PubMed)
- [Sivapalan2019] Sivapalan P, Lapperre TS, Janner J, Laub RR, Moberg M, Bech CS, et al. Eosinophil-guided corticosteroid therapy in patients admitted to hospital with COPD exacerbation (CORTICO-COP): a multicentre, randomised, controlled, open-label, non-inferiority trial. Lancet Respir Med. 2019;7(8):699-709. PMID 31122894; doi:10.1016/S2213-2600(19)30176-6. (validated: PubMed)
- [Anthonisen1987] Anthonisen NR, Manfreda J, Warren CP, Hershfield ES, Harding GK, Nelson NA. Antibiotic therapy in exacerbations of chronic obstructive pulmonary disease. Ann Intern Med. 1987;106(2):196-204. PMID 3492164; doi:10.7326/0003-4819-106-2-196. (validated: PubMed)
- [Vollenweider2018] Vollenweider DJ, Frei A, Steurer-Stey CA, Garcia-Aymerich J, Puhan MA. Antibiotics for exacerbations of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2018;10(10):CD010257. PMID 30371937; PMCID PMC6517133; doi:10.1002/14651858.CD010257.pub2. (validated: PubMed)
- [Nouira2001] Nouira S, Marghli S, Belghith M, Besbes L, Elatrous S, Abroug F. Once daily oral ofloxacin in chronic obstructive pulmonary disease exacerbation requiring mechanical ventilation: a randomised placebo-controlled trial. Lancet. 2001;358(9298):2020-2025. PMID 11755608; doi:10.1016/S0140-6736(01)07097-0. (validated: PubMed)
- [Llor2012] Llor C, Moragas A, Hernández S, Bayona C, Miravitlles M. Efficacy of antibiotic therapy for acute exacerbations of mild to moderate chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 2012;186(8):716-723. PMID 22923662; doi:10.1164/rccm.201206-0996OC. (validated: PubMed)
- [Butler2019] Butler CC, Gillespie D, White P, Bates J, Lowe R, Thomas-Jones E, et al. C-Reactive Protein Testing to Guide Antibiotic Prescribing for COPD Exacerbations. N Engl J Med. 2019;381(2):111-120. PMID 31291514; doi:10.1056/NEJMoa1803185. (validated: PubMed)
- [Stolz2007] Stolz D, Christ-Crain M, Bingisser R, Leuppi J, Miedinger D, Müller C, et al. Antibiotic treatment of exacerbations of COPD: a randomized, controlled trial comparing procalcitonin-guidance with standard therapy. Chest. 2007;131(1):9-19. PMID 17218551; doi:10.1378/chest.06-1500. (validated: PubMed)
- [Austin2010] Austin MA, Wills KE, Blizzard L, Walters EH, Wood-Baker R. Effect of high flow oxygen on mortality in chronic obstructive pulmonary disease patients in prehospital setting: randomised controlled trial. BMJ. 2010;341:c5462. PMID 20959284; PMCID PMC2957540; doi:10.1136/bmj.c5462. (validated: PubMed)
- [Kopsaftis2020] Kopsaftis Z, Carson-Chahhoud KV, Austin MA, Wood-Baker R. Oxygen therapy in the pre-hospital setting for acute exacerbations of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2020;1(1):CD005534. PMID 31934729; PMCID PMC6984654; doi:10.1002/14651858.CD005534.pub3. (validated: PubMed)
- [ODriscoll2017] O'Driscoll BR, Howard LS, Earis J, Mak V; British Thoracic Society Emergency Oxygen Guideline Group; BTS Emergency Oxygen Guideline Development Group. BTS guideline for oxygen use in adults in healthcare and emergency settings. Thorax. 2017;72(Suppl 1):ii1-ii90. PMID 28507176; doi:10.1136/thoraxjnl-2016-209729. Full text blocked (403); wording taken from ODriscoll2017Summary. (validated: PubMed)
- [ODriscoll2017Summary] O'Driscoll BR, Howard LS, Earis J, Mak V. British Thoracic Society Guideline for oxygen use in adults in healthcare and emergency settings. BMJ Open Respir Res. 2017;4(1):e000170. PMID 28883921; PMCID PMC5531304; doi:10.1136/bmjresp-2016-000170. Open full text read (Europe PMC). (validated: PubMed)
- [Abdo2012] Abdo WF, Heunks LM. Oxygen-induced hypercapnia in COPD: myths and facts. Crit Care. 2012;16(5):323. PMID 23106947; PMCID PMC3682248; doi:10.1186/cc11475. (validated: PubMed)
- [Davidson2016] Davidson AC, Banham S, Elliott M, Kennedy D, Gelder C, Glossop A, et al. BTS/ICS guideline for the ventilatory management of acute hypercapnic respiratory failure in adults. Thorax. 2016;71(Suppl 2):ii1-ii35. PMID 26976648; doi:10.1136/thoraxjnl-2015-208209. Full text blocked (403); wording taken from Davidson2016Summary. (validated: PubMed)
- [Davidson2016Summary] Davidson C, Banham S, Elliott M, Kennedy D, Gelder C, Glossop A, et al. British Thoracic Society/Intensive Care Society Guideline for the ventilatory management of acute hypercapnic respiratory failure in adults. BMJ Open Respir Res. 2016;3(1):e000133. PMID 27026806; PMCID PMC4800170; doi:10.1136/bmjresp-2016-000133. Open full text read (Europe PMC). (validated: PubMed)
- [Davies2018] Davies M, Allen M, Bentley A, Bourke SC, Creagh-Brown B, D'Oliveiro R, et al. British Thoracic Society Quality Standards for acute non-invasive ventilation in adults. BMJ Open Respir Res. 2018;5(1):e000283. PMID 29636979; PMCID PMC5890056; doi:10.1136/bmjresp-2018-000283. (validated: PubMed)
- [Rochwerg2017] Rochwerg B, Brochard L, Elliott MW, Hess D, Hill NS, Nava S, et al. Official ERS/ATS clinical practice guidelines: noninvasive ventilation for acute respiratory failure. Eur Respir J. 2017;50(2):1602426. PMID 28860265; doi:10.1183/13993003.02426-2016. Full text blocked (403); recommendation wording as quoted in Trethewey2018. (validated: PubMed)
- [Trethewey2018] Trethewey SP, Edgar RG, Turner AM, Mukherjee R. Ward-Based Non-Invasive Ventilation in Acute Exacerbations of COPD: A Narrative Review of Current Practice and Outcomes in the UK. Healthcare (Basel). 2018;6(4):145. PMID 30544857; PMCID PMC6315392; doi:10.3390/healthcare6040145. (validated: PubMed)
- [Osadnik2017] Osadnik CR, Tee VS, Carson-Chahhoud KV, Picot J, Wedzicha JA, Smith BJ. Non-invasive ventilation for the management of acute hypercapnic respiratory failure due to exacerbation of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2017;7(7):CD004104. PMID 28702957; PMCID PMC6483555; doi:10.1002/14651858.CD004104.pub4. (validated: PubMed)
- [Lightowler2003] Lightowler JV, Wedzicha JA, Elliott MW, Ram FS. Non-invasive positive pressure ventilation to treat respiratory failure resulting from exacerbations of chronic obstructive pulmonary disease: Cochrane systematic review and meta-analysis. BMJ. 2003;326(7382):185. PMID 12543832; PMCID PMC140272; doi:10.1136/bmj.326.7382.185. (validated: PubMed)
- [Brochard1995] Brochard L, Mancebo J, Wysocki M, Lofaso F, Conti G, Rauss A, et al. Noninvasive ventilation for acute exacerbations of chronic obstructive pulmonary disease. N Engl J Med. 1995;333(13):817-822. PMID 7651472; doi:10.1056/NEJM199509283331301. (validated: PubMed)
- [Plant2000] Plant PK, Owen JL, Elliott MW. Early use of non-invasive ventilation for acute exacerbations of chronic obstructive pulmonary disease on general respiratory wards: a multicentre randomised controlled trial. Lancet. 2000;355(9219):1931-1935. PMID 10859037; doi:10.1016/s0140-6736(00)02323-0. (validated: PubMed)
- [Plant2001] Plant PK, Owen JL, Elliott MW. Non-invasive ventilation in acute exacerbations of chronic obstructive pulmonary disease: long term survival and predictors of in-hospital outcome. Thorax. 2001;56(9):708-712. PMID 11514692; PMCID PMC1746126; doi:10.1136/thorax.56.9.708. (validated: PubMed)
- [Confalonieri2005] Confalonieri M, Garuti G, Cattaruzza MS, Osborn JF, Antonelli M, Conti G, et al. A chart of failure risk for noninvasive ventilation in patients with COPD exacerbation. Eur Respir J. 2005;25(2):348-355. PMID 15684302; doi:10.1183/09031936.05.00085304. (validated: PubMed)
- [Roberts2011] Roberts CM, Stone RA, Buckingham RJ, Pursey NA, Lowe D; National Chronic Obstructive Pulmonary Disease Resources and Outcomes Project implementation group. Acidosis, non-invasive ventilation and mortality in hospitalised COPD exacerbations. Thorax. 2011;66(1):43-48. PMID 21075776; doi:10.1136/thx.2010.153114. (validated: PubMed)
- [Jeffrey1992] Jeffrey AA, Warren PM, Flenley DC. Acute hypercapnic respiratory failure in patients with chronic obstructive lung disease: risk factors and use of guidelines for management. Thorax. 1992;47(1):34-40. PMID 1539142; PMCID PMC463551; doi:10.1136/thx.47.1.34. (validated: PubMed)
- [Oczkowski2022] Oczkowski S, Ergan B, Bos L, Chatwin M, Ferrer M, Gregoretti C, et al. ERS clinical practice guidelines: high-flow nasal cannula in acute respiratory failure. Eur Respir J. 2022;59(4):2101574. PMID 34649974; doi:10.1183/13993003.01574-2021. (validated: PubMed)
- [Murphy2017] Murphy PB, Rehal S, Arbane G, Bourke S, Calverley PMA, Crook AM, et al. Effect of Home Noninvasive Ventilation With Oxygen Therapy vs Oxygen Therapy Alone on Hospital Readmission or Death After an Acute COPD Exacerbation: A Randomized Clinical Trial. JAMA. 2017;317(21):2177-2186. PMID 28528348; PMCID PMC5710342; doi:10.1001/jama.2017.4451. (validated: PubMed)
- [McKeever2016] McKeever TM, Hearson G, Housley G, Reynolds C, Kinnear W, Harrison TW, et al. Using venous blood gas analysis in the assessment of COPD exacerbations: a prospective cohort study. Thorax. 2016;71(3):210-215. PMID 26628461; PMCID PMC4789825; doi:10.1136/thoraxjnl-2015-207573. (validated: PubMed)
- [Sood2010] Sood P, Paul G, Puri S. Interpretation of arterial blood gas. Indian J Crit Care Med. 2010;14(2):57-64. PMID 20859488; PMCID PMC2936733; doi:10.4103/0972-5229.68215. Open full text read (Europe PMC). (validated: PubMed)
- [Samuel2023] Samuel R. Application of Boston Compensation Rules in the Development of a Stepwise Approach for Novel Diagnostic Arterial Blood Gas Interpretation Method. Indian J Crit Care Med. 2023;27(10):717-723. PMID 37908425; PMCID PMC10613873; doi:10.5005/jp-journals-10071-24552. Open full text read (Europe PMC). (validated: PubMed)
- [Puhan2016] Puhan MA, Gimeno-Santos E, Cates CJ, Troosters T. Pulmonary rehabilitation following exacerbations of chronic obstructive pulmonary disease. Cochrane Database Syst Rev. 2016;12(12):CD005305. PMID 27930803; PMCID PMC6463852; doi:10.1002/14651858.CD005305.pub4. (validated: PubMed)
- [Ospina2017] Ospina MB, Mrklas K, Deuchar L, Rowe BH, Leigh R, Bhutani M, et al. A systematic review of the effectiveness of discharge care bundles for patients with COPD. Thorax. 2017;72(1):31-39. PMID 27613539; doi:10.1136/thoraxjnl-2016-208820. (validated: PubMed)
- [Hopkinson2012] Hopkinson NS, Englebretsen C, Cooley N, Kennie K, Lim M, Woodcock T, et al. Designing and implementing a COPD discharge care bundle. Thorax. 2012;67(1):90-92. PMID 21846790; PMCID PMC3240777; doi:10.1136/thoraxjnl-2011-200233. (validated: PubMed)

## Provenance
- All 64 sources were validated with PubMed E-utilities esummary (authors, title, journal, year, volume, pages, DOI, PMCID). Abstracts were read via efetch for every source that has one.
- Open full texts read through Europe PMC: GOLD 2023 Executive Summary (PMC10111975), BTS/ICS 2016 summary (PMC4800170), BTS 2017 oxygen summary (PMC5531304), BTS NIV Quality Standards (PMC5890056), Echevarria 2016 DECAF validation (PMC4752621), Jacobson 2023 (PMC10517701), Lee 2023 (PMC10286168), Trethewey 2018 (PMC6315392), Sood 2010 (PMC2936733), Samuel 2023 (PMC10613873), Csoma 2022 (PMC9181664, consulted only, not cited).
- Not accessible: Thorax supplements for BTS/ICS 2016 and BTS 2017 (HTTP 403; open summaries used instead), the ERS/ATS NIV guideline full text (403; wording via Trethewey2018), the Rome proposal full text (no abstract; thresholds via two open restatements and GOLD 2023), NCBI Bookshelf StatPearls (CAPTCHA; not bypassed), and the BTS website guideline PDF (over 10 MB; not downloaded).
- Marked (unverified): the 88–92% target in the Austin 2010 titrated arm (not in the abstract), and any fixed adult PaO2 reference range (deliberately not given).
- Hartl2016 90-day mortality by pH band comes from the Trethewey2018 review's summary of the audit. The Hartl abstract has no numbers.
- The Rochwerg2017 recommendation wording is a secondary quotation via Trethewey2018.
- The kPa–mmHg conversion and the three interpreter worked examples are generated arithmetic from the cited rules and are labelled as generated.
- Considered but dropped: Jencks 2009 (no COPD-specific figure in the abstract), Berend 2014 NEJM acid–base review (paywalled, abstract not read), Köhnlein 2014 (stable-state home NIV belongs to pass F).
- Reuse check: of these PMIDs, only 28507176 appears in another companion's sources.json (als, key ODriscoll2017). That key is reused here.
