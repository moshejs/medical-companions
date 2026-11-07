# G · Source control, stewardship, ICU organ support & nursing care

Pass date: 2026-11-04. Modules served: source, icu, nursing.

This pass covers finding and removing the source of infection (source control), choosing, timing, dosing and stopping antibiotics (stewardship), antimicrobial resistance, the main organ-support decisions in intensive care (ventilation, oxygen, kidney support, glucose, transfusion, prophylaxis, sedation, nutrition, ECMO, goals of care) and the bedside nursing work around them (screening and escalation, cultures, antibiotic timing, fluid balance, vasopressor safety, device-infection prevention, pressure injury, delirium, mobility, diaries and family care). Trial numbers come from PubMed abstracts. Surviving Sepsis Campaign (SSC) 2021 wording comes from the open-access full text in Europe PMC (PMC8486643). The KDIGO acute kidney injury definition comes from the open-access KDIGO summary (PMC4057151). IDSA catheter-infection wording comes from the PMC full text (PMC4039170). Norepinephrine label wording comes from the current Levophed label in openFDA (effective 2025-06-12).

Access notes:
- Fluid volumes, vasopressor and antibiotic doses, MAP, glucose, haemoglobin and oxygen targets below are quoted as the source publishes them. They are teaching facts, never instructions.
- Every mortality figure is a population statistic from a trial or cohort. It does not predict what will happen to one person.
- I did not use the RCP NEWS2 report (not indexed in PubMed or Crossref with a DOI I could confirm). NEWS2 observation-frequency wording therefore does not appear here. Pass D covers NEWS2.
- The CDC/HICPAC CAUTI and CLABSI prevention guidelines (Gould 2010; O'Grady 2011) have no PubMed abstract and their PMC full text is not open to text mining. I dropped them and used trial and meta-analysis abstracts instead.
- The Mega-ROX oxygen trial had only protocol papers in PubMed when I searched (2026-11-04). I give no Mega-ROX results.
- Shared keys reused from pass E with identical text: Evans2021SSC, Kumar2006Delay, Seymour2017Timing, Lee2007Cultures, Liu2017Antibiotics. Ely2001CAMICU reuses the key and text from the alcohol-use-disorder companion.

Call-now box (for every page built from this file that discusses symptoms, recognition or treatment): "Sepsis is a medical emergency. If someone with an infection becomes very unwell (confused or very drowsy, breathing very fast, cold, mottled or bluish skin, passing little or no urine), call your local emergency number or go to an emergency department now and ask: could this be sepsis?"

## Findings

### source · Source control: principles
- SSC 2021: "For adults with sepsis or septic shock, we recommend rapidly identifying or excluding a specific anatomical diagnosis of infection that requires emergent source control and implementing any required source control intervention as soon as medically and logistically practical" (Best Practice Statement) [[Evans2021SSC]]
- SSC 2021 rationale: smaller studies suggest source control within 6–12 h is advantageous, and studies generally show reduced survival beyond that point. Failure to show a benefit under 6 h may reflect small numbers and varied interventions [[Evans2021SSC]]
- SSC 2021: "we recommend prompt removal of intravascular access devices that are a possible source of sepsis or septic shock after other vascular access has been established" (Best Practice Statement) [[Evans2021SSC]]
- SSC 2021 rationale: the least invasive effective option is preferred. Surgery is considered when percutaneous or other approaches are inadequate or cannot be done in time, or when diagnostic uncertainty persists after imaging. Staff availability is a real logistic factor [[Evans2021SSC]]
- In a Spanish multicentre cohort of 3,663 ICU patients with severe sepsis or septic shock (99 ICUs, 2011–2013), 1,173 (32%) needed source control, mostly abdominal, urinary and soft-tissue infections [[Martinez2017Source]]
- In the same cohort, people who had source control were sicker but had lower crude ICU mortality (21.2% vs 25.1%) and lower adjusted hospital mortality (OR 0.809, 95% CI 0.658–0.994) than those who did not need it [[Martinez2017Source]]
- In the same cohort, source control after 12 hours was not linked to higher mortality (27.6% vs 26.8%; p = 0.789). The authors could not link timing to survival in this observational data (Early evidence) [[Martinez2017Source]]
- In a German cohort of 1,011 patients in 44 ICUs (MEDUSA), median time to surgical source control was 3 hours. Among 422 people who had source control, 28-day mortality was 42.9% if it came more than 6 h after organ dysfunction began, vs 26.7% if earlier (P < 0.001) [[Bloos2014Source]]
- In 154 people with gastrointestinal perforation and septic shock in one Japanese centre, time from admission to surgery was the main factor in 60-day survival. Survival was 0% when surgery started more than 6 hours after admission [[Azuhata2014Perforation]]

### source · Source control: specific situations
- Necrotising soft tissue infections ("flesh-eating" infections): a meta-analysis of 109 studies (6,051 patients) found 21.1% overall mortality [[Nawijn2020NSTI]]
- In that meta-analysis, surgery within 6 h of presentation gave 19% mortality vs 32% when surgery was delayed beyond 6 h (OR 0.43, 95% CI 0.26–0.70; 10 studies). Surgery within 12 h also lowered mortality vs after 12 h (OR 0.41, 95% CI 0.27–0.61) [[Nawijn2020NSTI]]
- In 89 people with necrotising fasciitis in Singapore, only 13 were diagnosed at admission. On multivariate analysis, only a surgical delay of more than 24 hours was linked to higher mortality (relative risk 9.4). Diabetes was present in 70.8% [[Wong2003NecFasc]]
- Infected obstructed kidney: among 1,712 US inpatients with sepsis and a ureteral stone (2007–2009), 78% had surgical decompression (stent or nephrostomy). Mortality was 19.2% without decompression vs 8.82% with it (adjusted OR 2.6, 95% CI 1.9–3.7) [[Borofsky2013Decompression]]
- Acute cholangitis (bile-duct infection), Tokyo Guidelines 2018: mild cases usually settle with antibiotics; moderate cases are indicated for early endoscopic or percutaneous biliary drainage; severe cases need drainage "as soon as possible" once respiratory and circulatory support has stabilised the patient [[Miura2018TG18]]
- IDSA 2009: long-term catheters should be removed for catheter-related bloodstream infection with severe sepsis, suppurative thrombophlebitis, endocarditis, bacteraemia persisting beyond 72 h of active therapy, or infection with S. aureus, P. aeruginosa, fungi or mycobacteria (A-II) [[Mermel2009IDSA]]
- IDSA 2009: short-term catheters should be removed for catheter-related bloodstream infection due to gram-negative bacilli, S. aureus, enterococci, fungi and mycobacteria (A-II) [[Mermel2009IDSA]]

### source · Empirical antibiotic choice and timing
- SSC 2021: "For adults with possible septic shock or a high likelihood for sepsis, we recommend administering antimicrobials immediately, ideally within 1 h of recognition" (strong recommendation) [[Evans2021SSC]]
- SSC 2021: for possible sepsis without shock, a time-limited course of rapid investigation is suggested and, if concern for infection persists, antimicrobials "within 3 h from the time when sepsis was first recognised" (weak recommendation) [[Evans2021SSC]]
- In 2,154 people with septic shock in 14 ICUs, effective antimicrobials in the first hour of hypotension were linked to 79.9% survival to discharge. Each hour of delay over the next 6 hours was linked to an average fall in survival of 7.6% [[Kumar2006Delay]]
- In the same cohort, adjusted odds of death rose 1.119 per hour of delay (95% CI 1.103–1.136). Median time to effective therapy was 6 hours, and only 50% received it within 6 hours of hypotension [[Kumar2006Delay]]
- Under New York State's mandated sepsis protocols (49,331 patients, 149 hospitals), each hour to antibiotics was linked to higher risk-adjusted in-hospital mortality (OR 1.04 per hour, 95% CI 1.03–1.06). Time to finishing the first fluid bolus was not (OR 1.01, 95% CI 0.99–1.02) [[Seymour2017Timing]]
- In 35,000 emergency patients with sepsis in Northern California, each hour of delay raised the odds of hospital death (OR 1.09, 95% CI 1.05–1.13). The absolute mortality increase per hour was 0.3% for sepsis, 0.4% for severe sepsis and 1.8% for shock [[Liu2017Antibiotics]]
- SSC 2021: MRSA cover is recommended for adults at high risk of MRSA (Best Practice Statement) and suggested against for those at low risk (weak recommendation) [[Evans2021SSC]]
- SSC 2021 rationale: MRSA incidence ranges from about 2% in Western Europe to 10% in North America. Listed risk factors include prior MRSA infection or colonisation, recent IV antibiotics, recurrent skin infections or chronic wounds, invasive devices, haemodialysis, recent admissions and severity of illness [[Evans2021SSC]]
- SSC 2021: two gram-negative agents are suggested for empirical treatment when the risk of multidrug-resistant (MDR) organisms is high, suggested against when it is low, and suggested against once the pathogen and its susceptibilities are known (all weak recommendations, very low quality of evidence) [[Evans2021SSC]]
- SSC 2021: empirical antifungal therapy is suggested for adults at high risk of fungal infection and suggested against at low risk (weak recommendations). Listed risk factors include Candida colonisation at multiple sites, central lines, total parenteral nutrition, broad-spectrum antibiotics, GI perforation and anastomotic leak, and haemodialysis [[Evans2021SSC]]
- EMPIRICUS (260 non-neutropenic ICU patients with ICU-acquired sepsis, multiple Candida colonisation and multiple organ failure): empirical micafungin did not improve 28-day survival free of invasive fungal infection (68% vs 60.2%; HR 1.35, 95% CI 0.87–2.08). It did reduce new invasive fungal infections (3% vs 12%) [[Timsit2016EMPIRICUS]]
- A Cochrane review of 69 trials (7,863 participants) found no mortality benefit from adding an aminoglycoside to the same beta-lactam (RR 0.97, 95% CI 0.73–1.30). Nephrotoxicity was much less frequent with monotherapy (RR 0.30, 95% CI 0.23–0.39) [[Paul2014Cochrane]]
- In 17,430 adults with culture-positive community-onset sepsis at 104 US hospitals, 67.0% got empirical cover for resistant organisms, but resistant organisms were uncommon: MRSA 11.7%, ceftriaxone-resistant gram-negatives 13.1%, VRE 2.1%, ESBL 0.8% [[Rhee2020Broad]]
- In that cohort, both inadequate empirical antibiotics (OR 1.19, 95% CI 1.03–1.37) and unnecessarily broad ones (OR 1.22, 95% CI 1.06–1.40) were linked to higher in-hospital mortality. This makes too narrow and too broad both a risk (Early evidence) [[Rhee2020Broad]]
- SSC 2021: for suspected sepsis that is not confirmed, the team should keep searching for alternative diagnoses and stop empirical antimicrobials if another cause is shown or strongly suspected (Best Practice Statement) [[Evans2021SSC]]

### source · De-escalation and shorter courses
- SSC 2021: daily assessment for de-escalation is suggested over fixed durations without daily reassessment (weak recommendation) [[Evans2021SSC]]
- SSC 2021: with adequate source control, shorter rather than longer antimicrobial courses are suggested (weak recommendation). Where the right duration is unclear, procalcitonin plus clinical evaluation is suggested to decide when to stop [[Evans2021SSC]]
- Chastre 2003 (401 ICU patients with microbiologically proven ventilator-associated pneumonia, 51 French ICUs): 8 vs 15 days gave similar 28-day mortality (18.8% vs 17.2%) and recurrence (28.9% vs 26.0%), with more antibiotic-free days (13.1 vs 8.7) [[Chastre2003VAP]]
- In the same trial, VAP due to non-fermenting gram-negative bacilli such as Pseudomonas recurred more often after 8 days (40.6% vs 25.4%). Among recurrences, multiresistant pathogens emerged less often after 8 days (42.1% vs 62.0%) [[Chastre2003VAP]]
- STOP-IT (518 patients with complicated intra-abdominal infection and adequate source control): a fixed course of about 4 days gave the same rate of surgical-site infection, recurrence or death as a course of up to 10 days (21.8% vs 22.3%). Median antibiotic duration was 4.0 vs 8.0 days [[Sawyer2015STOPIT]]
- BALANCE (3,608 hospitalised patients with bloodstream infection, 74 hospitals, 7 countries, 55.0% in ICU): 90-day mortality was 14.5% with 7 days vs 16.1% with 14 days (difference −1.6 points, 95.7% CI −4.0 to 0.8). This met the 4-point noninferiority margin [[Daneman2025BALANCE]]
- BALANCE excluded severe immunosuppression, foci needing prolonged therapy and Staphylococcus aureus bacteraemia. Sources were urinary 42.2%, abdominal 18.8%, lung 13.0%, catheter 6.3% and skin 5.2% [[Daneman2025BALANCE]]
- A French RCT of de-escalation (116 patients with severe sepsis) found longer ICU stay (median 9 vs 8 days, failing noninferiority) and more superinfections (27% vs 11%) with de-escalation, but similar mortality [[Leone2014Deescalation]]
- A systematic review of de-escalation in ICU (2 RCTs, 12 cohorts) found a pooled RR for mortality of 0.68 (95% CI 0.52–0.88). The authors warn this may only reflect that de-escalation happens in patients who are already improving (Early evidence) [[Tabah2016Deescalation]]
- A meta-analysis of 145 studies of hospital stewardship goals linked guideline-adherent empirical therapy with a 35% relative reduction in mortality (RR 0.65) and de-escalation with 56% (RR 0.44). Evidence quality was generally low [[Schuts2016Stewardship]]

### source · Dosing: prolonged infusion and drug monitoring
- SSC 2021: prolonged infusion of beta-lactams for maintenance, after an initial bolus, is suggested over conventional bolus infusion (weak recommendation, moderate quality of evidence) [[Evans2021SSC]]
- SSC 2021: dosing should follow pharmacokinetic/pharmacodynamic principles (Best Practice Statement). Augmented renal clearance, AKI, low albumin, kidney replacement therapy and ECMO all change antibiotic levels [[Evans2021SSC]]
- BLING III (7,031 critically ill adults on piperacillin-tazobactam or meropenem, 104 ICUs): 90-day mortality was 24.9% with continuous infusion vs 26.8% with intermittent infusion (OR 0.91, 95% CI 0.81–1.01; P = .08). Clinical cure was higher (55.7% vs 50.0%) [[Dulhunty2024BLING3]]
- A 2024 meta-analysis of 18 RCTs (9,108 adults with sepsis) found prolonged beta-lactam infusion linked to lower 90-day mortality (RR 0.86, 95% credible interval 0.72–0.98; high certainty), with a 99.1% posterior probability of benefit [[AbdulAziz2024Infusion]]
- In the same meta-analysis, prolonged infusion was also linked to lower ICU mortality (RR 0.84) and more clinical cure (RR 1.16) [[AbdulAziz2024Infusion]]
- TARGET (249 evaluable patients with sepsis on continuous piperacillin-tazobactam): daily drug-level (TDM) guided dosing reached target concentrations more often (37.3% vs 14.6%) but did not lower mean SOFA score (7.9 vs 8.2) or 28-day mortality significantly (21.6% vs 25.8%) [[Hagel2022TARGET]]

### source · Antimicrobial resistance, stewardship and C. difficile
- GRAM 2019: an estimated 4.95 million deaths were associated with bacterial antimicrobial resistance (AMR) in 2019, including 1.27 million (95% UI 0.911–1.71) directly attributable to it [[Murray2022GRAM]]
- GRAM 2019: six pathogens led deaths associated with resistance (E. coli, S. aureus, K. pneumoniae, S. pneumoniae, A. baumannii and P. aeruginosa). MRSA alone caused more than 100,000 attributable deaths [[Murray2022GRAM]]
- GRAM 2019: the attributable death rate was highest in western sub-Saharan Africa (27.3 per 100,000) and lowest in Australasia (6.5 per 100,000). Lower respiratory infections were the most burdensome syndrome (more than 1.5 million associated deaths) [[Murray2022GRAM]]
- GBD AMR 2021: 4.71 million associated and 1.14 million attributable deaths in 2021. From 1990 to 2021, AMR deaths fell by more than 50% in children under 5 and rose by over 80% in adults aged 70 and over [[Naghavi2024GRAM]]
- GBD AMR forecast for 2050: 1.91 million attributable and 8.22 million associated deaths. A "better care" scenario could avert 92.0 million deaths cumulatively from 2025 to 2050 [[Naghavi2024GRAM]]
- GBD AMR: MRSA-attributable deaths rose from 57,200 in 1990 to 130,000 in 2021. Carbapenem-resistance deaths in gram-negatives rose from 619,000 to 1.03 million associated deaths [[Naghavi2024GRAM]]
- The WHO AWaRe classification sorts antibiotics into Access, Watch and Reserve groups as a simple "traffic light" stewardship metric. In a 56-country paediatric survey, Access use in children ranged from 7.8% (China) to 61.2% (Slovenia) of prescriptions, and Reserve use was low everywhere [[Hsia2019AWaRe]]
- C. difficile is described in IDSA/SHEA guidelines as the most commonly identified cause of healthcare-associated infection in adults in the United States [[McDonald2018CDI]]
- In a community meta-analysis, the antibiotics most strongly linked to C. difficile infection were clindamycin (OR 16.80), cephalosporins/monobactams/carbapenems (OR 5.68) and fluoroquinolones (OR 5.50), vs penicillins (2.71), macrolides (2.65) and tetracyclines (0.92, no effect) [[Brown2013CDI]]

### icu · Who is in the ICU with sepsis
- ICON audit (10,069 ICU patients, May 2012): sepsis occurred during the ICU stay in 29.5%, with ICU mortality 25.8% and hospital mortality 35.3% [[Sakr2018ICON]]
- ICON: mortality varied widely by region, from 11.9% ICU / 19.3% hospital in Oceania to 39.5% / 47.2% in Africa. These are population figures [[Sakr2018ICON]]
- EPIC III (15,202 ICU patients, 88 countries, 13 September 2017): 54% had suspected or proven infection, 70% were on at least one antibiotic, and in-hospital mortality among infected patients was 30% [[Vincent2020EPICIII]]
- EPIC III: among infected patients with a positive culture, gram-negatives were found in 67%, gram-positives in 37% and fungi in 16%. ICU-acquired infection carried higher odds of death than community-acquired infection (OR 1.32) [[Vincent2020EPICIII]]
- SSC 2021: for adults with sepsis who need ICU care, admission within 6 h is suggested (weak recommendation, low-quality evidence) [[Evans2021SSC]]

### icu · Breathing support
- ARDSNet 2000 (861 patients with acute lung injury/ARDS): 6 mL/kg predicted body weight with plateau pressure ≤30 cmH2O vs 12 mL/kg cut mortality from 39.8% to 31.0% (P = 0.007) and increased ventilator-free days (12 vs 10) [[ARDSNet2000]]
- SSC 2021: for sepsis-induced ARDS, a low tidal volume strategy (6 mL/kg) is recommended over >10 mL/kg (strong, high quality). An upper plateau pressure goal of 30 cmH2O is recommended for severe ARDS (strong, moderate quality) [[Evans2021SSC]]
- SSC 2021: higher PEEP is suggested for moderate-severe sepsis-induced ARDS, and low tidal volume is suggested even without ARDS (weak recommendations) [[Evans2021SSC]]
- PROSEVA (466 patients with severe ARDS, PaO2:FiO2 <150): prone sessions of at least 16 hours cut 28-day mortality from 32.8% to 16.0% (HR 0.39) and 90-day mortality from 41.0% to 23.6% [[Guerin2013PROSEVA]]
- SSC 2021: prone ventilation for more than 12 h daily is recommended for moderate-severe sepsis-induced ARDS (strong recommendation, moderate quality) [[Evans2021SSC]]
- ACURASYS 2010 (340 patients with severe early ARDS): 48 h of cisatracurium improved adjusted 90-day survival (HR 0.68), although crude 90-day mortality (31.6% vs 40.7%) did not differ significantly [[Papazian2010ACURASYS]]
- ROSE 2019 (1,006 patients with moderate-severe ARDS on high PEEP): early continuous cisatracurium with deep sedation did not lower 90-day mortality vs lighter sedation (42.5% vs 42.8%). The trial stopped for futility [[Moss2019ROSE]]
- SSC 2021: intermittent neuromuscular blocker boluses are suggested over continuous infusion for moderate-severe sepsis-induced ARDS (weak recommendation) [[Evans2021SSC]]
- SSC 2021: high-flow nasal oxygen is suggested over non-invasive ventilation for sepsis-induced hypoxaemic respiratory failure (weak recommendation) [[Evans2021SSC]]
- FACTT (1,000 patients with acute lung injury): a conservative fluid strategy kept 7-day cumulative fluid balance at −136 mL vs +6,992 mL. It increased ventilator-free days (14.6 vs 12.1) without a significant change in 60-day mortality (25.5% vs 28.4%) [[Wiedemann2006FACTT]]

### icu · Oxygen targets
- SSC 2021 found insufficient evidence to recommend conservative oxygen targets in sepsis. It describes conservative targets as generally PaO2 55–70 mmHg or SpO2 88–92% [[Evans2021SSC]]
- ICU-ROX (1,000 ventilated adults): conservative oxygen did not change ventilator-free days (median 21.3 vs 22.1). 180-day mortality was 35.7% vs 34.5% [[Mackle2020ICUROX]]
- HOT-ICU (2,928 adults with acute hypoxaemic respiratory failure): targeting PaO2 60 vs 90 mmHg gave the same 90-day mortality (42.9% vs 42.4%; adjusted RR 1.02) [[Schjorring2021HOTICU]]
- UK-ROX (16,500 ventilated adults, 97 UK ICUs): an SpO2 target of 90% (range 88–92%) cut oxygen exposure by 29% but did not change 90-day mortality (35.4% vs 34.9%; risk difference 0.7 points, 95% CI −0.7 to 2.0) [[Martin2025UKROX]]

### icu · ECMO (heart-lung machine support)
- SSC 2021: veno-venous ECMO is suggested for sepsis-induced severe ARDS when conventional ventilation fails, in experienced centres (weak recommendation, low quality) [[Evans2021SSC]]
- EOLIA (249 patients with very severe ARDS): 60-day mortality was 35% with early VV-ECMO vs 46% with conventional care (RR 0.76, 95% CI 0.55–1.04; P = 0.09). 28% of controls crossed over to ECMO [[Combes2018EOLIA]]
- In a retrospective cohort, 82 people with sepsis-induced cardiogenic shock on VA-ECMO had 60% 90-day survival vs 25% in 130 controls (weighted 51% vs 14%). Unmeasured confounding cannot be excluded (Early evidence) [[Brechot2020VAECMO]]

### icu · Kidney support
- KDIGO defines AKI as a creatinine rise of ≥0.3 mg/dL within 48 h, creatinine ≥1.5 times baseline within 7 days, or urine volume <0.5 mL/kg/hour for 6 hours [[Kellum2013KDIGO]]
- KDIGO urine-output stages: stage 1 <0.5 mL/kg/h for 6–12 h; stage 2 <0.5 mL/kg/h for ≥12 h; stage 3 <0.3 mL/kg/h for ≥24 h or anuria for ≥12 h [[Kellum2013KDIGO]]
- AKIKI (620 patients with KDIGO stage 3 AKI on ventilation and/or catecholamines): early vs delayed dialysis gave the same 60-day mortality (48.5% vs 49.7%). 49% of the delayed group never needed dialysis [[Gaudry2016AKIKI]]
- In AKIKI, catheter-related bloodstream infections were more common with early dialysis (10% vs 5%) [[Gaudry2016AKIKI]]
- IDEAL-ICU (488 patients with early septic shock and RIFLE-failure AKI): 90-day mortality was 58% early vs 54% delayed (P = 0.38). 38% of the delayed group never received dialysis. The trial stopped for futility [[Barbar2018IDEAL]]
- STARRT-AKI (2,927 patients): accelerated vs standard dialysis start gave the same 90-day mortality (43.9% vs 43.7%). It led to more dialysis dependence among survivors (10.4% vs 6.0%) and more adverse events (23.0% vs 16.5%) [[Bagshaw2020STARRT]]
- SSC 2021: for sepsis with AKI and no definitive indication, kidney replacement therapy is suggested against. When it is needed, continuous or intermittent methods are both acceptable (weak recommendations) [[Evans2021SSC]]

### icu · Glucose, transfusion, clots, stomach protection, nutrition, fever
- NICE-SUGAR (6,104 ICU adults): an intensive glucose target of 81–108 mg/dL (4.5–6.0 mmol/L) raised 90-day mortality vs a target of ≤180 mg/dL (≤10.0 mmol/L): 27.5% vs 24.9% (OR 1.14, 95% CI 1.02–1.28) [[Finfer2009NICESUGAR]]
- In NICE-SUGAR, severe hypoglycaemia (≤40 mg/dL) occurred in 6.8% of the intensive group vs 0.5% of the conventional group [[Finfer2009NICESUGAR]]
- SSC 2021: insulin is recommended starting at glucose ≥180 mg/dL (10 mmol/L), with a typical target of 144–180 mg/dL (8–10 mmol/L) (strong recommendation) [[Evans2021SSC]]
- TRISS (998 analysed patients with septic shock): transfusing at Hb ≤7 g/dL vs ≤9 g/dL gave similar 90-day mortality (43.0% vs 45.0%; RR 0.94) with fewer units (median 1 vs 4) [[Holst2014TRISS]]
- SSC 2021: a restrictive transfusion strategy is recommended (strong). It "typically includes a haemoglobin concentration transfusion trigger of 70 g/L," but transfusion should not be guided by haemoglobin alone [[Evans2021SSC]]
- SSC 2021: drug prophylaxis against venous thromboembolism is recommended unless contraindicated, LMWH over unfractionated heparin (strong recommendations). Adding mechanical prophylaxis is suggested against [[Evans2021SSC]]
- PROTECT (3,764 ICU patients): dalteparin vs unfractionated heparin gave similar proximal DVT rates (5.1% vs 5.8%) but fewer pulmonary emboli (1.3% vs 2.3%; HR 0.51) [[Cook2011PROTECT]]
- SSC 2021: stress ulcer prophylaxis is suggested for adults with sepsis who have risk factors for GI bleeding (weak recommendation) [[Evans2021SSC]]
- SUP-ICU (3,298 at-risk ICU adults): IV pantoprazole 40 mg daily vs placebo gave the same 90-day mortality (31.1% vs 30.4%). Clinically important GI bleeding was 2.5% vs 4.2% [[Krag2018SUPICU]]
- REVISE (4,821 invasively ventilated adults): pantoprazole cut clinically important upper GI bleeding (1.0% vs 3.5%; HR 0.30) with no significant effect on 90-day mortality (29.1% vs 30.9%) [[Cook2024REVISE]]
- PEPTIC (26,828 ventilated patients, cluster crossover): hospital mortality was 18.3% with proton pump inhibitors vs 17.5% with H2 blockers (RR 1.05, 95% CI 1.00–1.10; P = .054). GI bleeding was 1.3% vs 1.8% [[Young2020PEPTIC]]
- SSC 2021: for adults with sepsis who can be fed enterally, early enteral nutrition (within 72 h) is suggested (weak recommendation, very low quality) [[Evans2021SSC]]
- NUTRIREA-2 (2,410 ventilated adults in shock): early enteral vs parenteral nutrition gave similar 28-day mortality (37% vs 35%). Enteral feeding brought more vomiting (34% vs 20%) and bowel ischaemia (2% vs <1%) [[Reignier2018NUTRIREA2]]
- NUTRIREA-3 (3,036 analysed ventilated adults in shock): low calorie/protein targets (6 kcal/kg/day) vs standard (25 kcal/kg/day) in week one gave similar 90-day mortality (41.3% vs 42.8%) and slightly faster readiness for ICU discharge (median 8 vs 9 days) [[Reignier2023NUTRIREA3]]
- HEAT (700 febrile ICU patients with suspected infection): IV acetaminophen 1 g every 6 h vs placebo did not change ICU-free days (23 vs 22) or 90-day mortality (15.9% vs 16.6%) [[Young2015HEAT]]

### icu · Sedation, delirium and the ABCDEF bundle
- SPICE III (4,000 ventilated adults): early dexmedetomidine as the main sedative gave the same 90-day mortality as usual care (29.1% vs 29.1%). 64% also needed propofol, and bradycardia and hypotension were more common [[Shehabi2019SPICE3]]
- MENDS2 (422 ventilated adults with sepsis on light sedation): dexmedetomidine vs propofol gave the same days alive without delirium or coma (10.7 vs 10.8) and the same 90-day mortality (38% vs 39%) [[Hughes2021MENDS2]]
- The 2018 SCCM PADIS guideline (pain, agitation/sedation, delirium, immobility, sleep) issued 37 recommendations (3 strong, 34 conditional), with ICU survivors on the panel [[Devlin2018PADIS]]
- ABC trial (336 ventilated patients): pairing daily sedation interruption with a spontaneous breathing trial gave more days breathing unassisted (14.7 vs 11.6) and shorter ICU stay (median 9.1 vs 12.9 days) [[Girard2008ABC]]
- In the ABC trial, one-year mortality was lower with the paired protocol (HR 0.68, 95% CI 0.50–0.92), with a number needed to treat of 7.4 [[Girard2008ABC]]
- Early physical and occupational therapy during sedation breaks (104 ventilated adults) raised return to independent function at discharge (59% vs 35%) and shortened delirium (median 2 vs 4 days) [[Schweickert2009Mobility]]
- ICU Liberation Collaborative (15,226 adults, 68 ICUs): complete ABCDEF bundle performance was linked to lower hospital death within 7 days (aHR 0.32), less delirium (AOR 0.60), less restraint use (AOR 0.37) and fewer ICU readmissions (AOR 0.54) (observational) [[Pun2019ABCDEF]]

### icu · Goals of care and families
- SSC 2021: discussing goals of care and prognosis with patients and families is recommended (Best Practice Statement), early (within 72 h) rather than late (weak recommendation) [[Evans2021SSC]]
- SSC 2021: palliative care principles should be integrated when appropriate (Best Practice Statement). Routine formal palliative care consultation for everyone is suggested against, in favour of clinician judgement [[Evans2021SSC]]
- SSC 2021: offering written and verbal sepsis education to patients and families before discharge is suggested, and the guideline notes almost 40% of sepsis survivors are rehospitalised within 3 months [[Evans2021SSC]]
- For families of 126 patients dying in 22 French ICUs, a proactive end-of-life conference plus a bereavement brochure lowered PTSD-related symptoms at 90 days (45% vs 69%), anxiety (45% vs 67%) and depression (29% vs 56%) [[Lautrette2007Family]]
- In that trial, intervention conferences lasted longer (median 30 vs 20 minutes), and families spent more of the time talking (14 vs 5 minutes) [[Lautrette2007Family]]

### nursing · Screening, escalation and rapid response
- SSC 2021: hospitals should run a sepsis performance improvement programme, including screening of acutely ill, high-risk patients and standard operating procedures (strong recommendation). In a meta-analysis of 50 observational studies, such programmes were linked to lower mortality (OR 0.66, 95% CI 0.61–0.72) [[Evans2021SSC]]
- SSC 2021 rationale: screening tools (SIRS, qSOFA, SOFA, NEWS, MEWS) vary widely in accuracy, and most have poor predictive values. For hospital-acquired sepsis, machine-learning tools had a pooled AUROC of 0.89 vs SIRS 0.70, MEWS 0.50 and SOFA 0.78 [[Evans2021SSC]]
- A nurse-driven Detect, Act, Reassess, Titrate (DART) protocol with a checklist in one emergency department raised compliance with all 3-hour bundle metrics from 30% to 80% and cut average hospital stay by 2.5 days (single-centre quality project) [[Moore2019NurseProtocol]]
- A nurse-driven rapid response team sepsis protocol in one hospital halved median time to the first antibiotic dose (269 to 135 minutes, 32 patients) [[Semanco2022RRTProtocol]]
- MERIT (23 Australian hospitals, cluster-randomised): a medical emergency team system tripled emergency calls (3.1 vs 8.7 per 1,000 admissions) but did not change the composite of cardiac arrest, unexpected death or unplanned ICU admission (5.86 vs 5.31 per 1,000) [[Hillman2005MERIT]]
- In a meta-analysis (nearly 1.3 million admissions), rapid response teams in adults cut cardiopulmonary arrests outside the ICU by 33.8% (RR 0.66) without lowering hospital mortality (RR 0.96). In children, both fell (RR 0.62 and 0.79) [[Chan2010RRT]]
- Early warning and sepsis scores (qSOFA, SOFA, NEWS2, shock index) are teaching tools in this companion and are never for self-triage or for deciding whether to seek care. SSC itself notes their poor predictive values [[Evans2021SSC]]

### nursing · Cultures and getting antibiotics in on time
- Of 629 single-organism bloodstream infections with ≥3 cultures in 24 h, the first culture detected 73.1%, two detected 89.7%, three 98.2% and four 99.8% [[Lee2007Cultures]]
- IDSA 2009: when catheter infection is suspected, paired blood cultures from the catheter and a peripheral vein should be drawn before antibiotics start and/or the catheter is removed (A-II) [[Mermel2009IDSA]]
- In New York State, 82.5% of patients had the 3-hour bundle (cultures, broad-spectrum antibiotics, lactate) completed within 3 hours. The median time to antibiotics was 0.95 hours [[Seymour2017Timing]]
- In Kaiser Northern California, the median time from ED registration to antibiotics was 2.1 hours (IQR 1.4–3.1) [[Liu2017Antibiotics]]

### nursing · Fluid balance and urine output
- Urine output below 0.5 mL/kg/hour for 6 hours meets the KDIGO definition of AKI. This is why ICU nurses chart hourly urine output and report sustained low output [[Kellum2013KDIGO]]
- In ARDS, a protocol that kept fluid balance near even over 7 days (−136 mL vs +6,992 mL) shortened ventilation and ICU stay without more shock or dialysis. This supports careful daily fluid balance charting [[Wiedemann2006FACTT]]

### nursing · Vasopressor infusion safety and extravasation
- SSC 2021: starting vasopressors peripherally is suggested rather than delaying until a central line is placed (weak recommendation). When peripheral, they "should be administered only for a short period of time and in a vein in or proximal to the antecubital fossa" [[Evans2021SSC]]
- In one medical ICU, 734 patients received norepinephrine, dopamine or phenylephrine through a peripheral IV 783 times for 49 ± 22 hours. Extravasation occurred in 19 (2%), with no tissue injury after local phentolamine and nitroglycerin paste. 13% later needed a central line [[CardenasGarcia2015Peripheral]]
- In a systematic review of 325 published extravasation or tissue-injury events, 318 came from peripheral lines, and 85.3% of peripheral injury events involved a site below the antecubital or popliteal fossa [[Loubani2015Extravasation]]
- A meta-analysis of 11 adult studies (16,055 patients) found a pooled 1.8% incidence of local adverse events with peripheral vasopressors (95% CI 0.1–4.8%). The rate in children was 3.3% [[Owen2021Peripheral]]
- Levophed (norepinephrine) label: "Infuse LEVOPHED into a large vein." Extravasated areas "should be infiltrated as soon as possible with 10 mL to 15 mL of saline solution containing from 5 mg to 10 mg of an adrenergic blocking agent" [[FDA-Levophed]]
- Levophed label: monitor blood pressure every two minutes until the desired effect is reached, then every five minutes. Reduce the infusion gradually, since abrupt stopping may cause marked hypotension. Avoid leg veins in elderly patients or those with occlusive vascular disease [[FDA-Levophed]]

### nursing · Preventing device infections (central lines, urinary catheters)
- Keystone ICU project (103 mostly Michigan ICUs, 375,757 catheter-days): the mean catheter-related bloodstream infection rate fell from 7.7 to 1.4 per 1,000 catheter-days at 16–18 months, a reduction of up to 66% (IRR 0.34) [[Pronovost2006Keystone]]
- Keystone sustainability (90 ICUs): mean rates stayed low at 1.1 per 1,000 catheter-days at 34–36 months after the intervention (IRR 0.34) [[Pronovost2010BMJ]]
- The original Johns Hopkins intervention had five parts: staff education, a catheter insertion cart, asking daily whether each catheter could come out, an insertion checklist, and empowering nurses to stop insertion if guidelines were breached. Infections fell from 11.3 to 0 per 1,000 catheter-days [[Berenholtz2004CRBSI]]
- Daily bathing with 2% chlorhexidine cloths in 9 ICU and transplant units (7,727 patients) cut MDRO acquisition by 23% (5.10 vs 6.60 per 1,000 patient-days) and hospital-acquired bloodstream infections by 28% (4.78 vs 6.60) [[Climo2013CHG]]
- A US national CAUTI programme (926 units, 603 hospitals) cut adjusted CAUTI rates from 2.40 to 2.05 per 1,000 catheter-days (IRR 0.86). The gain was in non-ICU wards (2.28 to 1.54), and ICU rates were largely unchanged [[Saint2016CAUTI]]
- In a meta-analysis of 11 studies, urinary catheter reminders or stop orders cut CAUTI rates by 53% (rate ratio 0.47, 95% CI 0.30–0.64) with no significant harm from removal strategies [[Meddings2014CAUTI]]

### nursing · Pressure injuries
- DecubICUs (13,254 patients, 1,117 ICUs, 90 countries): pressure injury prevalence was 26.6%, and ICU-acquired prevalence 16.2%. The sacrum (37%) and heels (19.5%) were most affected [[Labeau2021DecubICUs]]
- In DecubICUs, ICU-acquired injury was linked to a Braden score <19, ICU stay >3 days, mechanical ventilation and kidney replacement therapy. Odds of death rose with stage: stage I OR 1.5, stage II 1.6, stage III or worse 2.8 [[Labeau2021DecubICUs]]

### nursing · Delirium screening, recovery and diaries
- CAM-ICU (111 ventilated patients): two study nurses using it had sensitivities of 100% and 93% and specificities of 98% and 100% vs expert diagnosis. Interrater kappa was 0.96, and it took about 2 minutes [[Ely2001CAMICU]]
- In the CAM-ICU validation cohort, delirium affected 83.3% of evaluable ventilated patients for a mean of 2.4 days. It was present in 39.5% of observations where the patient looked alert [[Ely2001CAMICU]]
- Among 224 ventilated patients who were not persistently comatose, 81.7% developed delirium. Delirium was linked to higher 6-month mortality (34% vs 15%; adjusted HR 3.2) and 10 more days in hospital [[Ely2004Delirium]]
- BRAIN-ICU (821 adults with respiratory failure or shock): 74% had delirium. At 3 months, 40% had global cognition 1.5 SD below population norms (similar to moderate traumatic brain injury) and 26% were 2 SD below (similar to mild Alzheimer's disease) [[Pandharipande2013Cognition]]
- In BRAIN-ICU at 12 months, 34% and 24% still had those levels of impairment. Longer delirium was linked to worse cognition [[Pandharipande2013Cognition]]
- An ICU diary given at 1 month after discharge (352 patients) cut new PTSD at 3 months from 13% to 5% (P = 0.02) [[Jones2010Diaries]]
- A larger French RCT (657 ventilated patients, 35 ICUs) found that a diary written by staff and family did not significantly reduce PTSD symptoms at 3 months (29.9% vs 34.3%) [[GarrousteOrgeas2019Diary]]

### Exam hooks
- Source control means finding and draining, removing or debriding the source "as soon as medically and logistically practical" (SSC 2021, Best Practice Statement) [[Evans2021SSC]]
- A possibly infected IV line should be removed promptly, after other vascular access has been established [[Evans2021SSC]]
- Necrotising soft tissue infection: surgery within 6 h vs later, mortality 19% vs 32% [[Nawijn2020NSTI]]
- Septic shock or high likelihood of sepsis: antimicrobials ideally within 1 h. Possible sepsis without shock: within 3 h if concern persists [[Evans2021SSC]]
- Kumar 2006: effective antibiotics in the first hour of hypotension, 79.9% survival; about 7.6% lower survival for each hour of delay over the next 6 h [[Kumar2006Delay]]
- Double gram-negative cover is for high MDR risk only, and it stops once susceptibilities are known [[Evans2021SSC]]
- Seven days of antibiotics was noninferior to 14 days for bloodstream infection (BALANCE; S. aureus excluded) [[Daneman2025BALANCE]]
- About 4 days after adequate source control was as good as about 8 days for intra-abdominal infection (STOP-IT) [[Sawyer2015STOPIT]]
- VAP: 8 vs 15 days gave the same mortality, but non-fermenters (Pseudomonas) recurred more [[Chastre2003VAP]]
- Lung-protective ventilation: 6 mL/kg predicted body weight, plateau ≤30 cmH2O. Mortality fell from 39.8% to 31.0% in ARDSNet [[ARDSNet2000]]
- Prone positioning for severe ARDS: 28-day mortality 16.0% vs 32.8% (PROSEVA). SSC: prone >12 h daily [[Guerin2013PROSEVA,Evans2021SSC]]
- NICE-SUGAR: tight glucose (81–108 mg/dL) increased mortality. SSC starts insulin at ≥180 mg/dL and targets 144–180 mg/dL [[Finfer2009NICESUGAR,Evans2021SSC]]
- Transfusion trigger in septic shock: Hb 7 g/dL was as safe as 9 g/dL (TRISS) [[Holst2014TRISS]]
- LMWH over unfractionated heparin for VTE prophylaxis in sepsis (SSC, strong) [[Evans2021SSC]]
- KDIGO oliguria: urine <0.5 mL/kg/h for 6 h defines AKI [[Kellum2013KDIGO]]
- Early dialysis without urgent indications does not save lives (AKIKI, IDEAL-ICU, STARRT-AKI) [[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]]
- CAM-ICU is a validated bedside delirium tool for ventilated patients (sensitivity 93–100%) [[Ely2001CAMICU]]
- Keystone checklist bundle: central-line infections fell from 7.7 to 1.4 per 1,000 catheter-days [[Pronovost2006Keystone]]
- Norepinephrine extravasation: infiltrate the area with an adrenergic blocker (phentolamine) in saline as soon as possible (label) [[FDA-Levophed]]
- Clindamycin carries the highest odds of community C. difficile infection (OR 16.8) [[Brown2013CDI]]

### In plain words
- Sepsis (the body's harmful response to an infection) often has a "source", such as an abscess (a pocket of pus), a blocked infected kidney or a bile duct, an infected line or dead tissue. Doctors try to drain or remove it as soon as it is safe to do so [[Evans2021SSC]]
- With some infections that spread under the skin very fast, an operation within hours can make a big difference to survival [[Nawijn2020NSTI]]
- Antibiotics are started fast, usually within an hour when someone is very unwell. Later, doctors switch to the narrowest drug that works and stop as soon as it is safe [[Evans2021SSC]]
- Shorter antibiotic courses often work just as well as long ones and cause fewer side effects and less resistance [[Daneman2025BALANCE,Sawyer2015STOPIT]]
- Germs that resist antibiotics cause more than a million deaths a year worldwide. Using antibiotics only when needed helps keep them working for everyone [[Murray2022GRAM]]
- In intensive care, a breathing machine is set to give small, gentle breaths to protect the lungs. Some people are turned onto their front to help oxygen get in [[ARDSNet2000,Guerin2013PROSEVA]]
- Nurses measure urine every hour, because passing very little urine is an early sign that the kidneys are struggling [[Kellum2013KDIGO]]
- Medicines that raise blood pressure can damage skin if they leak out of the vein, so nurses check the drip site often [[FDA-Levophed]]
- Many people in intensive care become confused for a while (delirium). Nurses check for it every day with a short quiz, and it usually gets better [[Ely2001CAMICU]]
- Getting out of bed and moving early, even while on a breathing machine, can help people walk and look after themselves sooner [[Schweickert2009Mobility]]
- Some ICUs keep a diary of the stay. It can help survivors make sense of gaps in their memory [[Jones2010Diaries]]
- Families should expect regular, honest talks with the team about what is happening and what matters most to their loved one [[Evans2021SSC,Lautrette2007Family]]
- The numbers on this page come from studies of large groups. They cannot tell anyone what will happen to one person [[Sakr2018ICON]]

## Numbers for the animations
- kumar_survival_first_hour | 1 h | 79.9 | % survival to discharge | [[Kumar2006Delay]]
- kumar_survival_drop_per_hour | 1–6 h | 7.6 | % average fall in survival per hour of delay | [[Kumar2006Delay]]
- kumar_effective_abx_within_6h | 6 h | 50 | % of patients | [[Kumar2006Delay]]
- seymour_or_per_hour_abx | per hour | 1.04 | odds ratio for in-hospital death | [[Seymour2017Timing]]
- liu_abs_mortality_per_hour_sepsis | per hour | 0.3 | % absolute increase | [[Liu2017Antibiotics]]
- liu_abs_mortality_per_hour_severe | per hour | 0.4 | % absolute increase | [[Liu2017Antibiotics]]
- liu_abs_mortality_per_hour_shock | per hour | 1.8 | % absolute increase | [[Liu2017Antibiotics]]
- nsti_mortality_surgery | ≤6 h | 19 | % mortality | [[Nawijn2020NSTI]]
- nsti_mortality_surgery | >6 h | 32 | % mortality | [[Nawijn2020NSTI]]
- medusa_28d_mortality_source_control | ≤6 h | 26.7 | % | [[Bloos2014Source]]
- medusa_28d_mortality_source_control | >6 h | 42.9 | % | [[Bloos2014Source]]
- martinez_mortality_source_control | ≤12 h | 26.8 | % | [[Martinez2017Source]]
- martinez_mortality_source_control | >12 h | 27.6 | % | [[Martinez2017Source]]
- ureteral_stone_sepsis_mortality | decompressed | 8.82 | % | [[Borofsky2013Decompression]]
- ureteral_stone_sepsis_mortality | not decompressed | 19.2 | % | [[Borofsky2013Decompression]]
- blood_culture_cumulative_detection | 1 culture | 73.1 | % | [[Lee2007Cultures]]
- blood_culture_cumulative_detection | 2 cultures | 89.7 | % | [[Lee2007Cultures]]
- blood_culture_cumulative_detection | 3 cultures | 98.2 | % | [[Lee2007Cultures]]
- blood_culture_cumulative_detection | 4 cultures | 99.8 | % | [[Lee2007Cultures]]
- balance_90d_mortality | 7 days | 14.5 | % | [[Daneman2025BALANCE]]
- balance_90d_mortality | 14 days | 16.1 | % | [[Daneman2025BALANCE]]
- stopit_composite_outcome | ~4 days | 21.8 | % | [[Sawyer2015STOPIT]]
- stopit_composite_outcome | ~8 days | 22.3 | % | [[Sawyer2015STOPIT]]
- chastre_28d_mortality | 8 days | 18.8 | % | [[Chastre2003VAP]]
- chastre_28d_mortality | 15 days | 17.2 | % | [[Chastre2003VAP]]
- chastre_antibiotic_free_days | 8 days | 13.1 | days | [[Chastre2003VAP]]
- chastre_antibiotic_free_days | 15 days | 8.7 | days | [[Chastre2003VAP]]
- bling3_90d_mortality | continuous | 24.9 | % | [[Dulhunty2024BLING3]]
- bling3_90d_mortality | intermittent | 26.8 | % | [[Dulhunty2024BLING3]]
- prolonged_infusion_meta_rr | 90 d | 0.86 | risk ratio | [[AbdulAziz2024Infusion]]
- amr_deaths_attributable | 2019 | 1.27 | million | [[Murray2022GRAM]]
- amr_deaths_associated | 2019 | 4.95 | million | [[Murray2022GRAM]]
- amr_deaths_attributable | 2021 | 1.14 | million | [[Naghavi2024GRAM]]
- amr_deaths_associated | 2021 | 4.71 | million | [[Naghavi2024GRAM]]
- amr_deaths_attributable | 2050 forecast | 1.91 | million | [[Naghavi2024GRAM]]
- amr_deaths_associated | 2050 forecast | 8.22 | million | [[Naghavi2024GRAM]]
- mrsa_attributable_deaths | 1990 | 57200 | deaths | [[Naghavi2024GRAM]]
- mrsa_attributable_deaths | 2021 | 130000 | deaths | [[Naghavi2024GRAM]]
- cdi_odds_by_class | clindamycin | 16.80 | odds ratio | [[Brown2013CDI]]
- cdi_odds_by_class | cephalosporins/carbapenems | 5.68 | odds ratio | [[Brown2013CDI]]
- cdi_odds_by_class | fluoroquinolones | 5.50 | odds ratio | [[Brown2013CDI]]
- cdi_odds_by_class | penicillins | 2.71 | odds ratio | [[Brown2013CDI]]
- cdi_odds_by_class | macrolides | 2.65 | odds ratio | [[Brown2013CDI]]
- cdi_odds_by_class | tetracyclines | 0.92 | odds ratio | [[Brown2013CDI]]
- icon_sepsis_mortality | ICU | 25.8 | % | [[Sakr2018ICON]]
- icon_sepsis_mortality | hospital | 35.3 | % | [[Sakr2018ICON]]
- ardsnet_mortality | 6 mL/kg | 31.0 | % | [[ARDSNet2000]]
- ardsnet_mortality | 12 mL/kg | 39.8 | % | [[ARDSNet2000]]
- proseva_mortality_prone | 28 d | 16.0 | % | [[Guerin2013PROSEVA]]
- proseva_mortality_supine | 28 d | 32.8 | % | [[Guerin2013PROSEVA]]
- proseva_mortality_prone | 90 d | 23.6 | % | [[Guerin2013PROSEVA]]
- proseva_mortality_supine | 90 d | 41.0 | % | [[Guerin2013PROSEVA]]
- eolia_60d_mortality | ECMO | 35 | % | [[Combes2018EOLIA]]
- eolia_60d_mortality | control | 46 | % | [[Combes2018EOLIA]]
- ukrox_90d_mortality | conservative SpO2 90% | 35.4 | % | [[Martin2025UKROX]]
- ukrox_90d_mortality | usual | 34.9 | % | [[Martin2025UKROX]]
- hoticu_90d_mortality | PaO2 60 mmHg | 42.9 | % | [[Schjorring2021HOTICU]]
- hoticu_90d_mortality | PaO2 90 mmHg | 42.4 | % | [[Schjorring2021HOTICU]]
- factt_cumulative_fluid_balance | day 7 conservative | -136 | mL | [[Wiedemann2006FACTT]]
- factt_cumulative_fluid_balance | day 7 liberal | 6992 | mL | [[Wiedemann2006FACTT]]
- akiki_60d_mortality | early | 48.5 | % | [[Gaudry2016AKIKI]]
- akiki_60d_mortality | delayed | 49.7 | % | [[Gaudry2016AKIKI]]
- starrt_90d_mortality | accelerated | 43.9 | % | [[Bagshaw2020STARRT]]
- starrt_90d_mortality | standard | 43.7 | % | [[Bagshaw2020STARRT]]
- ideal_icu_90d_mortality | early | 58 | % | [[Barbar2018IDEAL]]
- ideal_icu_90d_mortality | delayed | 54 | % | [[Barbar2018IDEAL]]
- kdigo_urine_output_stage1 | 6–12 h | 0.5 | mL/kg/h (below) | [[Kellum2013KDIGO]]
- kdigo_urine_output_stage2 | ≥12 h | 0.5 | mL/kg/h (below) | [[Kellum2013KDIGO]]
- kdigo_urine_output_stage3 | ≥24 h | 0.3 | mL/kg/h (below) | [[Kellum2013KDIGO]]
- nicesugar_90d_mortality | 81–108 mg/dL | 27.5 | % | [[Finfer2009NICESUGAR]]
- nicesugar_90d_mortality | ≤180 mg/dL | 24.9 | % | [[Finfer2009NICESUGAR]]
- nicesugar_severe_hypoglycaemia | intensive | 6.8 | % | [[Finfer2009NICESUGAR]]
- nicesugar_severe_hypoglycaemia | conventional | 0.5 | % | [[Finfer2009NICESUGAR]]
- triss_90d_mortality | Hb ≤7 | 43.0 | % | [[Holst2014TRISS]]
- triss_90d_mortality | Hb ≤9 | 45.0 | % | [[Holst2014TRISS]]
- triss_median_units | Hb ≤7 | 1 | units | [[Holst2014TRISS]]
- triss_median_units | Hb ≤9 | 4 | units | [[Holst2014TRISS]]
- revise_gi_bleeding | pantoprazole | 1.0 | % | [[Cook2024REVISE]]
- revise_gi_bleeding | placebo | 3.5 | % | [[Cook2024REVISE]]
- protect_pulmonary_embolism | dalteparin | 1.3 | % | [[Cook2011PROTECT]]
- protect_pulmonary_embolism | UFH | 2.3 | % | [[Cook2011PROTECT]]
- abc_icu_days | paired SAT+SBT | 9.1 | days (median) | [[Girard2008ABC]]
- abc_icu_days | usual sedation + SBT | 12.9 | days (median) | [[Girard2008ABC]]
- mobility_independent_at_discharge | early PT/OT | 59 | % | [[Schweickert2009Mobility]]
- mobility_independent_at_discharge | control | 35 | % | [[Schweickert2009Mobility]]
- delirium_6mo_mortality | delirium | 34 | % | [[Ely2004Delirium]]
- delirium_6mo_mortality | no delirium | 15 | % | [[Ely2004Delirium]]
- brain_icu_cognition_tbi_level | 3 months | 40 | % | [[Pandharipande2013Cognition]]
- brain_icu_cognition_tbi_level | 12 months | 34 | % | [[Pandharipande2013Cognition]]
- brain_icu_cognition_ad_level | 3 months | 26 | % | [[Pandharipande2013Cognition]]
- brain_icu_cognition_ad_level | 12 months | 24 | % | [[Pandharipande2013Cognition]]
- keystone_crbsi_mean_rate | baseline | 7.7 | per 1,000 catheter-days | [[Pronovost2006Keystone]]
- keystone_crbsi_mean_rate | 16–18 months | 1.4 | per 1,000 catheter-days | [[Pronovost2006Keystone]]
- keystone_crbsi_mean_rate | 34–36 months | 1.1 | per 1,000 catheter-days | [[Pronovost2010BMJ]]
- keystone_irr | 0–3 months | 0.62 | incidence rate ratio | [[Pronovost2006Keystone]]
- keystone_irr | 16–18 months | 0.34 | incidence rate ratio | [[Pronovost2006Keystone]]
- hopkins_crbsi_rate | Q1 1998 | 11.3 | per 1,000 catheter-days | [[Berenholtz2004CRBSI]]
- hopkins_crbsi_rate | Q4 2002 | 0 | per 1,000 catheter-days | [[Berenholtz2004CRBSI]]
- cauti_rate_non_icu | baseline | 2.28 | per 1,000 catheter-days | [[Saint2016CAUTI]]
- cauti_rate_non_icu | sustainability | 1.54 | per 1,000 catheter-days | [[Saint2016CAUTI]]
- chg_bsi_rate | chlorhexidine | 4.78 | per 1,000 patient-days | [[Climo2013CHG]]
- chg_bsi_rate | control cloths | 6.60 | per 1,000 patient-days | [[Climo2013CHG]]
- peripheral_vasopressor_adverse_events | adults pooled | 1.8 | % | [[Owen2021Peripheral]]
- peripheral_vasopressor_adverse_events | children pooled | 3.3 | % | [[Owen2021Peripheral]]
- pressure_injury_prevalence | all ICU | 26.6 | % | [[Labeau2021DecubICUs]]
- pressure_injury_prevalence | ICU-acquired | 16.2 | % | [[Labeau2021DecubICUs]]
- icu_diary_new_ptsd | diary | 5 | % | [[Jones2010Diaries]]
- icu_diary_new_ptsd | control | 13 | % | [[Jones2010Diaries]]
- family_ptsd_symptoms_bereaved | proactive conference + brochure | 45 | % | [[Lautrette2007Family]]
- family_ptsd_symptoms_bereaved | usual conference | 69 | % | [[Lautrette2007Family]]
- rapid_response_arrest_rr | adults | 0.66 | relative risk | [[Chan2010RRT]]
- nurse_rrt_protocol_time_to_abx | before | 269 | minutes (median) | [[Semanco2022RRTProtocol]]
- nurse_rrt_protocol_time_to_abx | after | 135 | minutes (median) | [[Semanco2022RRTProtocol]]

## Open questions and controversies
- How fast must source control happen? Within 6 h, MEDUSA [[Bloos2014Source]] and perforation [[Azuhata2014Perforation]] cohorts and the NSTI meta-analysis [[Nawijn2020NSTI]] link delay to death. In the ABISS-Edusepsis cohort, timing beyond 12 h was not linked to mortality [[Martinez2017Source]]. SSC settles on "as soon as medically and logistically practical" [[Evans2021SSC]]. Status: observational only; no RCT.
- Continuous or prolonged beta-lactam infusion: BLING III missed significance on its primary outcome (OR 0.91, P = .08) [[Dulhunty2024BLING3]], but the 2024 meta-analysis gives RR 0.86 with high certainty [[AbdulAziz2024Infusion]]. SSC 2021 (pre-dating both) already suggested prolonged infusion [[Evans2021SSC]]. Status: leaning toward prolonged infusion as standard (Established for clinical cure; Early evidence for mortality from any single trial).
- Is de-escalation safe and useful? Observational pooled data look protective (RR 0.68) but are confounded [[Tabah2016Deescalation]]. The only RCT found longer ICU stay and more superinfections [[Leone2014Deescalation]]. SSC suggests daily assessment for de-escalation [[Evans2021SSC]]. Status: unresolved.
- How broad should empirical cover be? Both too narrow and unnecessarily broad empirical therapy were linked to higher mortality [[Rhee2020Broad]]. SSC ties MRSA and double gram-negative cover to individual risk [[Evans2021SSC]]. Status: rapid diagnostics are the hoped-for answer (Hypothesis).
- Do 7-day courses suit everyone with bacteraemia? BALANCE excluded S. aureus, severe immunosuppression and foci needing long therapy [[Daneman2025BALANCE]]. Status: noninferiority holds only within the trial population.
- Therapeutic drug monitoring: TDM improved target attainment but not organ dysfunction in TARGET [[Hagel2022TARGET]]. SSC notes TDM is not widely available [[Evans2021SSC]]. Status: unresolved.
- Oxygen targets: ICU-ROX, HOT-ICU and UK-ROX all found no mortality difference with conservative oxygen [[Mackle2020ICUROX,Schjorring2021HOTICU,Martin2025UKROX]]. SSC 2021 made no recommendation [[Evans2021SSC]]. Mega-ROX results were not in PubMed when I searched. Status: open.
- Kidney replacement timing: three trials found no benefit from early start [[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]], and STARRT-AKI showed harm signals (more dialysis dependence) [[Bagshaw2020STARRT]]. Status: watchful waiting without urgent indications is now favoured (Established).
- Stress ulcer prophylaxis: pantoprazole lowers bleeding with no clear mortality effect [[Krag2018SUPICU,Cook2024REVISE]]. PEPTIC hinted at higher mortality with PPIs vs H2 blockers (P = .054) [[Young2020PEPTIC]]. Status: open.
- Neuromuscular blockade in ARDS: benefit in ACURASYS [[Papazian2010ACURASYS]], none in ROSE [[Moss2019ROSE]]. SSC suggests intermittent boluses over infusion [[Evans2021SSC]]. Status: largely settled against routine continuous infusion.
- ICU diaries: a 352-patient RCT showed less new PTSD [[Jones2010Diaries]], but a 657-patient RCT did not [[GarrousteOrgeas2019Diary]]. Status: unresolved. Diaries may still be valued for meaning-making (Hypothesis).
- Rapid response teams: fewer ward cardiac arrests but no clear fall in adult hospital mortality [[Chan2010RRT,Hillman2005MERIT]]. Status: widely used despite mixed evidence.
- Peripheral vasopressors: pooled local adverse events are low (1.8%) [[Owen2021Peripheral]], but the evidence is mostly low quality, and injury clusters at distal sites [[Loubani2015Extravasation]]. SSC suggests short-term use in or above the antecubital fossa [[Evans2021SSC]]. Status: accepted for short periods; best duration and site limits still debated.
- VA-ECMO for septic cardiomyopathy: large survival difference in a retrospective cohort [[Brechot2020VAECMO]]. Status: no RCT (Early evidence).
- Early nutrition dose: lower-calorie early feeding was not worse and sped recovery in NUTRIREA-3 [[Reignier2023NUTRIREA3]]. Enteral was not better than parenteral in NUTRIREA-2 [[Reignier2018NUTRIREA2]]. SSC suggests early enteral feeding within 72 h [[Evans2021SSC]]. Status: evolving.

## Sources
- [Evans2021SSC] Evans L, Rhodes A, Alhazzani W, Antonelli M, Coopersmith CM, French C, et al. Surviving sepsis campaign: international guidelines for management of sepsis and septic shock 2021. Intensive Care Med. 2021;47(11):1181-1247. PMID 34599691; PMCID PMC8486643; doi:10.1007/s00134-021-06506-y. Co-published as Crit Care Med. 2021;49(11):e1063-e1143, PMID 34605781, doi:10.1097/CCM.0000000000005337. Recommendation wording read from the open-access full text (Europe PMC). (validated: PubMed)
- [Martinez2017Source] Martínez ML, Ferrer R, Torrents E, Guillamat-Prats R, Gomà G, Suárez D, et al. Impact of Source Control in Patients With Severe Sepsis and Septic Shock. Crit Care Med. 2017;45(1):11-19. PMID 27611975; doi:10.1097/CCM.0000000000002011. (validated: PubMed)
- [Bloos2014Source] Bloos F, Thomas-Rüddel D, Rüddel H, Engel C, Schwarzkopf D, Marshall JC, et al. Impact of compliance with infection management guidelines on outcome in patients with severe sepsis: a prospective observational multi-center study. Crit Care. 2014;18(2):R42. PMID 24589043; PMCID PMC4057316; doi:10.1186/cc13755. (validated: PubMed)
- [Azuhata2014Perforation] Azuhata T, Kinoshita K, Kawano D, Komatsu T, Sakurai A, Chiba Y, et al. Time from admission to initiation of surgery for source control is a critical determinant of survival in patients with gastrointestinal perforation with associated septic shock. Crit Care. 2014;18(3):R87. PMID 24886954; PMCID PMC4057117; doi:10.1186/cc13854. (validated: PubMed)
- [Nawijn2020NSTI] Nawijn F, Smeeing DPJ, Houwert RM, Leenen LPH, Hietbrink F. Time is of the essence when treating necrotizing soft tissue infections: a systematic review and meta-analysis. World J Emerg Surg. 2020;15:4. PMID 31921330; PMCID PMC6950871; doi:10.1186/s13017-019-0286-6. (validated: PubMed)
- [Wong2003NecFasc] Wong CH, Chang HC, Pasupathy S, Khin LW, Tan JL, Low CO. Necrotizing fasciitis: clinical presentation, microbiology, and determinants of mortality. J Bone Joint Surg Am. 2003;85(8):1454-60. PMID 12925624. No DOI listed in PubMed. (validated: PubMed)
- [Borofsky2013Decompression] Borofsky MS, Walter D, Shah O, Goldfarb DS, Mues AC, Makarov DV. Surgical decompression is associated with decreased mortality in patients with sepsis and ureteral calculi. J Urol. 2013;189(3):946-51. PMID 23017519; doi:10.1016/j.juro.2012.09.088. (validated: PubMed)
- [Miura2018TG18] Miura F, Okamoto K, Takada T, Strasberg SM, Asbun HJ, Pitt HA, et al. Tokyo Guidelines 2018: initial management of acute biliary infection and flowchart for acute cholangitis. J Hepatobiliary Pancreat Sci. 2018;25(1):31-40. PMID 28941329; doi:10.1002/jhbp.509. (validated: PubMed)
- [Mermel2009IDSA] Mermel LA, Allon M, Bouza E, Craven DE, Flynn P, O'Grady NP, et al. Clinical practice guidelines for the diagnosis and management of intravascular catheter-related infection: 2009 Update by the Infectious Diseases Society of America. Clin Infect Dis. 2009;49(1):1-45. PMID 19489710; PMCID PMC4039170; doi:10.1086/599376. Recommendation wording read from the PMC full text. (validated: PubMed)
- [Kumar2006Delay] Kumar A, Roberts D, Wood KE, Light B, Parrillo JE, Sharma S, et al. Duration of hypotension before initiation of effective antimicrobial therapy is the critical determinant of survival in human septic shock. Crit Care Med. 2006;34(6):1589-96. PMID 16625125; doi:10.1097/01.CCM.0000217961.75225.E9. (validated: PubMed)
- [Seymour2017Timing] Seymour CW, Gesten F, Prescott HC, Friedrich ME, Iwashyna TJ, Phillips GS, et al. Time to Treatment and Mortality during Mandated Emergency Care for Sepsis. N Engl J Med. 2017;376(23):2235-2244. PMID 28528569; PMCID PMC5538258; doi:10.1056/NEJMoa1703058. (validated: PubMed)
- [Liu2017Antibiotics] Liu VX, Fielding-Singh V, Greene JD, Baker JM, Iwashyna TJ, Bhattacharya J, et al. The Timing of Early Antibiotics and Hospital Mortality in Sepsis. Am J Respir Crit Care Med. 2017;196(7):856-863. PMID 28345952; PMCID PMC5649973; doi:10.1164/rccm.201609-1848OC. (validated: PubMed)
- [Timsit2016EMPIRICUS] Timsit JF, Azoulay E, Schwebel C, Charles PE, Cornet M, Souweine B, et al. Empirical Micafungin Treatment and Survival Without Invasive Fungal Infection in Adults With ICU-Acquired Sepsis, Candida Colonization, and Multiple Organ Failure: The EMPIRICUS Randomized Clinical Trial. JAMA. 2016;316(15):1555-1564. PMID 27706483; doi:10.1001/jama.2016.14655. (validated: PubMed)
- [Paul2014Cochrane] Paul M, Lador A, Grozinsky-Glasberg S, Leibovici L. Beta lactam antibiotic monotherapy versus beta lactam-aminoglycoside antibiotic combination therapy for sepsis. Cochrane Database Syst Rev. 2014;2014(1):CD003344. PMID 24395715; PMCID PMC6517128; doi:10.1002/14651858.CD003344.pub3. (validated: PubMed)
- [Rhee2020Broad] Rhee C, Kadri SS, Dekker JP, Danner RL, Chen HC, Fram D, et al. Prevalence of Antibiotic-Resistant Pathogens in Culture-Proven Sepsis and Outcomes Associated With Inadequate and Broad-Spectrum Empiric Antibiotic Use. JAMA Netw Open. 2020;3(4):e202899. PMID 32297949; PMCID PMC7163409; doi:10.1001/jamanetworkopen.2020.2899. (validated: PubMed)
- [Chastre2003VAP] Chastre J, Wolff M, Fagon JY, Chevret S, Thomas F, Wermert D, et al. Comparison of 8 vs 15 days of antibiotic therapy for ventilator-associated pneumonia in adults: a randomized trial. JAMA. 2003;290(19):2588-98. PMID 14625336; doi:10.1001/jama.290.19.2588. (validated: PubMed)
- [Sawyer2015STOPIT] Sawyer RG, Claridge JA, Nathens AB, Rotstein OD, Duane TM, Evans HL, et al. Trial of short-course antimicrobial therapy for intraabdominal infection. N Engl J Med. 2015;372(21):1996-2005. PMID 25992746; PMCID PMC4469182; doi:10.1056/NEJMoa1411162. (validated: PubMed)
- [Daneman2025BALANCE] BALANCE Investigators; Daneman N, Rishu A, Pinto R, Rogers BA, Shehabi Y, Parke R, et al. Antibiotic Treatment for 7 versus 14 Days in Patients with Bloodstream Infections. N Engl J Med. 2025;392(11):1065-1078. PMID 39565030; doi:10.1056/NEJMoa2404991. (validated: PubMed)
- [Leone2014Deescalation] Leone M, Bechis C, Baumstarck K, Lefrant JY, Albanèse J, Jaber S, et al. De-escalation versus continuation of empirical antimicrobial treatment in severe sepsis: a multicenter non-blinded randomized noninferiority trial. Intensive Care Med. 2014;40(10):1399-408. PMID 25091790; doi:10.1007/s00134-014-3411-8. (validated: PubMed)
- [Tabah2016Deescalation] Tabah A, Cotta MO, Garnacho-Montero J, Schouten J, Roberts JA, Lipman J, et al. A Systematic Review of the Definitions, Determinants, and Clinical Outcomes of Antimicrobial De-escalation in the Intensive Care Unit. Clin Infect Dis. 2016;62(8):1009-1017. PMID 26703860; doi:10.1093/cid/civ1199. (validated: PubMed)
- [Schuts2016Stewardship] Schuts EC, Hulscher MEJL, Mouton JW, Verduin CM, Stuart JWTC, Overdiek HWPM, et al. Current evidence on hospital antimicrobial stewardship objectives: a systematic review and meta-analysis. Lancet Infect Dis. 2016;16(7):847-856. PMID 26947617; doi:10.1016/S1473-3099(16)00065-7. (validated: PubMed)
- [Dulhunty2024BLING3] Dulhunty JM, Brett SJ, De Waele JJ, Rajbhandari D, Billot L, Cotta MO, et al. Continuous vs Intermittent β-Lactam Antibiotic Infusions in Critically Ill Patients With Sepsis: The BLING III Randomized Clinical Trial. JAMA. 2024;332(8):629-637. PMID 38864155; PMCID PMC11170452; doi:10.1001/jama.2024.9779. (validated: PubMed)
- [AbdulAziz2024Infusion] Abdul-Aziz MH, Hammond NE, Brett SJ, Cotta MO, De Waele JJ, Devaux A, et al. Prolonged vs Intermittent Infusions of β-Lactam Antibiotics in Adults With Sepsis or Septic Shock: A Systematic Review and Meta-Analysis. JAMA. 2024;332(8):638-648. PMID 38864162; PMCID PMC11170459; doi:10.1001/jama.2024.9803. (validated: PubMed)
- [Hagel2022TARGET] Hagel S, Bach F, Brenner T, Bracht H, Brinkmann A, Annecke T, et al. Effect of therapeutic drug monitoring-based dose optimization of piperacillin/tazobactam on sepsis-related organ dysfunction in patients with sepsis: a randomized controlled trial. Intensive Care Med. 2022;48(3):311-321. PMID 35106617; PMCID PMC8866359; doi:10.1007/s00134-021-06609-6. (validated: PubMed)
- [Murray2022GRAM] Antimicrobial Resistance Collaborators. Global burden of bacterial antimicrobial resistance in 2019: a systematic analysis. Lancet. 2022;399(10325):629-655. PMID 35065702; PMCID PMC8841637; doi:10.1016/S0140-6736(21)02724-0. (validated: PubMed)
- [Naghavi2024GRAM] GBD 2021 Antimicrobial Resistance Collaborators. Global burden of bacterial antimicrobial resistance 1990-2021: a systematic analysis with forecasts to 2050. Lancet. 2024;404(10459):1199-1226. PMID 39299261; PMCID PMC11718157; doi:10.1016/S0140-6736(24)01867-1. (validated: PubMed)
- [Hsia2019AWaRe] Hsia Y, Lee BR, Versporten A, Yang Y, Bielicki J, Jackson C, et al. Use of the WHO Access, Watch, and Reserve classification to define patterns of hospital antibiotic use (AWaRe): an analysis of paediatric survey data from 56 countries. Lancet Glob Health. 2019;7(7):e861-e871. PMID 31200888; doi:10.1016/S2214-109X(19)30071-3. (validated: PubMed)
- [McDonald2018CDI] McDonald LC, Gerding DN, Johnson S, Bakken JS, Carroll KC, Coffin SE, et al. Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by the Infectious Diseases Society of America (IDSA) and Society for Healthcare Epidemiology of America (SHEA). Clin Infect Dis. 2018;66(7):e1-e48. PMID 29462280; PMCID PMC6018983; doi:10.1093/cid/cix1085. (validated: PubMed)
- [Brown2013CDI] Brown KA, Khanafer N, Daneman N, Fisman DN. Meta-analysis of antibiotics and the risk of community-associated Clostridium difficile infection. Antimicrob Agents Chemother. 2013;57(5):2326-32. PMID 23478961; PMCID PMC3632900; doi:10.1128/AAC.02176-12. (validated: PubMed)
- [Sakr2018ICON] Sakr Y, Jaschinski U, Wittebole X, Szakmany T, Lipman J, Ñamendys-Silva SA, et al. Sepsis in Intensive Care Unit Patients: Worldwide Data From the Intensive Care over Nations Audit. Open Forum Infect Dis. 2018;5(12):ofy313. PMID 30555852; PMCID PMC6289022; doi:10.1093/ofid/ofy313. (validated: PubMed)
- [Vincent2020EPICIII] Vincent JL, Sakr Y, Singer M, Martin-Loeches I, Machado FR, Marshall JC, et al. Prevalence and Outcomes of Infection Among Patients in Intensive Care Units in 2017. JAMA. 2020;323(15):1478-1487. PMID 32207816; PMCID PMC7093816; doi:10.1001/jama.2020.2717. (validated: PubMed)
- [ARDSNet2000] Acute Respiratory Distress Syndrome Network; Brower RG, Matthay MA, Morris A, Schoenfeld D, Thompson BT, Wheeler A. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-8. PMID 10793162; doi:10.1056/NEJM200005043421801. (validated: PubMed)
- [Guerin2013PROSEVA] Guérin C, Reignier J, Richard JC, Beuret P, Gacouin A, Boulain T, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-68. PMID 23688302; doi:10.1056/NEJMoa1214103. (validated: PubMed)
- [Papazian2010ACURASYS] Papazian L, Forel JM, Gacouin A, Penot-Ragon C, Perrin G, Loundou A, et al. Neuromuscular blockers in early acute respiratory distress syndrome. N Engl J Med. 2010;363(12):1107-16. PMID 20843245; doi:10.1056/NEJMoa1005372. (validated: PubMed)
- [Moss2019ROSE] National Heart, Lung, and Blood Institute PETAL Clinical Trials Network; Moss M, Huang DT, Brower RG, Ferguson ND, Ginde AA, Gong MN, et al. Early Neuromuscular Blockade in the Acute Respiratory Distress Syndrome. N Engl J Med. 2019;380(21):1997-2008. PMID 31112383; PMCID PMC6741345; doi:10.1056/NEJMoa1901686. (validated: PubMed)
- [Wiedemann2006FACTT] National Heart, Lung, and Blood Institute Acute Respiratory Distress Syndrome (ARDS) Clinical Trials Network; Wiedemann HP, Wheeler AP, Bernard GR, Thompson BT, Hayden D, deBoisblanc B, et al. Comparison of two fluid-management strategies in acute lung injury. N Engl J Med. 2006;354(24):2564-75. PMID 16714767; doi:10.1056/NEJMoa062200. (validated: PubMed)
- [Mackle2020ICUROX] ICU-ROX Investigators and the Australian and New Zealand Intensive Care Society Clinical Trials Group; Mackle D, Bellomo R, Bailey M, Beasley R, Deane A, Eastwood G, et al. Conservative Oxygen Therapy during Mechanical Ventilation in the ICU. N Engl J Med. 2020;382(11):989-998. PMID 31613432; doi:10.1056/NEJMoa1903297. (validated: PubMed)
- [Schjorring2021HOTICU] Schjørring OL, Klitgaard TL, Perner A, Wetterslev J, Lange T, Siegemund M, et al. Lower or Higher Oxygenation Targets for Acute Hypoxemic Respiratory Failure. N Engl J Med. 2021;384(14):1301-1311. PMID 33471452; doi:10.1056/NEJMoa2032510. (validated: PubMed)
- [Martin2025UKROX] Martin DS, Gould DW, Shahid T, Doidge JC, Cowden A, Sadique Z, et al. Conservative Oxygen Therapy in Mechanically Ventilated Critically Ill Adult Patients: The UK-ROX Randomized Clinical Trial. JAMA. 2025;334(5):398-408. PMID 40501321; PMCID PMC12163715; doi:10.1001/jama.2025.9663. (validated: PubMed)
- [Combes2018EOLIA] Combes A, Hajage D, Capellier G, Demoule A, Lavoué S, Guervilly C, et al. Extracorporeal Membrane Oxygenation for Severe Acute Respiratory Distress Syndrome. N Engl J Med. 2018;378(21):1965-1975. PMID 29791822; doi:10.1056/NEJMoa1800385. (validated: PubMed)
- [Brechot2020VAECMO] Bréchot N, Hajage D, Kimmoun A, Demiselle J, Agerstrand C, Montero S, et al. Venoarterial extracorporeal membrane oxygenation to rescue sepsis-induced cardiogenic shock: a retrospective, multicentre, international cohort study. Lancet. 2020;396(10250):545-552. PMID 32828186; doi:10.1016/S0140-6736(20)30733-9. (validated: PubMed)
- [Kellum2013KDIGO] Kellum JA, Lameire N; KDIGO AKI Guideline Work Group. Diagnosis, evaluation, and management of acute kidney injury: a KDIGO summary (Part 1). Crit Care. 2013;17(1):204. PMID 23394211; PMCID PMC4057151; doi:10.1186/cc11454. Definition and staging read from the open-access full text. (validated: PubMed)
- [Gaudry2016AKIKI] Gaudry S, Hajage D, Schortgen F, Martin-Lefevre L, Pons B, Boulet E, et al. Initiation Strategies for Renal-Replacement Therapy in the Intensive Care Unit. N Engl J Med. 2016;375(2):122-33. PMID 27181456; doi:10.1056/NEJMoa1603017. (validated: PubMed)
- [Barbar2018IDEAL] Barbar SD, Clere-Jehl R, Bourredjem A, Hernu R, Montini F, Bruyère R, et al. Timing of Renal-Replacement Therapy in Patients with Acute Kidney Injury and Sepsis. N Engl J Med. 2018;379(15):1431-1442. PMID 30304656; doi:10.1056/NEJMoa1803213. (validated: PubMed)
- [Bagshaw2020STARRT] STARRT-AKI Investigators; Bagshaw SM, Wald R, Adhikari NKJ, Bellomo R, da Costa BR, Dreyfuss D, et al. Timing of Initiation of Renal-Replacement Therapy in Acute Kidney Injury. N Engl J Med. 2020;383(3):240-251. PMID 32668114; doi:10.1056/NEJMoa2000741. (validated: PubMed)
- [Finfer2009NICESUGAR] NICE-SUGAR Study Investigators; Finfer S, Chittock DR, Su SY, Blair D, Foster D, Dhingra V, et al. Intensive versus conventional glucose control in critically ill patients. N Engl J Med. 2009;360(13):1283-97. PMID 19318384; doi:10.1056/NEJMoa0810625. (validated: PubMed)
- [Holst2014TRISS] Holst LB, Haase N, Wetterslev J, Wernerman J, Guttormsen AB, Karlsson S, et al. Lower versus higher hemoglobin threshold for transfusion in septic shock. N Engl J Med. 2014;371(15):1381-91. PMID 25270275; doi:10.1056/NEJMoa1406617. (validated: PubMed)
- [Cook2011PROTECT] PROTECT Investigators for the Canadian Critical Care Trials Group and the Australian and New Zealand Intensive Care Society Clinical Trials Group; Cook D, Meade M, Guyatt G, Walter S, Heels-Ansdell D, Warkentin TE, et al. Dalteparin versus unfractionated heparin in critically ill patients. N Engl J Med. 2011;364(14):1305-14. PMID 21417952; doi:10.1056/NEJMoa1014475. (validated: PubMed)
- [Krag2018SUPICU] Krag M, Marker S, Perner A, Wetterslev J, Wise MP, Schefold JC, et al. Pantoprazole in Patients at Risk for Gastrointestinal Bleeding in the ICU. N Engl J Med. 2018;379(23):2199-2208. PMID 30354950; doi:10.1056/NEJMoa1714919. (validated: PubMed)
- [Cook2024REVISE] Cook D, Deane A, Lauzier F, Zytaruk N, Guyatt G, Saunders L, et al. Stress Ulcer Prophylaxis during Invasive Mechanical Ventilation. N Engl J Med. 2024;391(1):9-20. PMID 38875111; doi:10.1056/NEJMoa2404245. (validated: PubMed)
- [Young2020PEPTIC] PEPTIC Investigators for the Australian and New Zealand Intensive Care Society Clinical Trials Group, Alberta Health Services Critical Care Strategic Clinical Network, and the Irish Critical Care Trials Group; Young PJ, Bagshaw SM, Forbes AB, Nichol AD, Wright SE, Bailey M, et al. Effect of Stress Ulcer Prophylaxis With Proton Pump Inhibitors vs Histamine-2 Receptor Blockers on In-Hospital Mortality Among ICU Patients Receiving Invasive Mechanical Ventilation: The PEPTIC Randomized Clinical Trial. JAMA. 2020;323(7):616-626. PMID 31950977; PMCID PMC7029750; doi:10.1001/jama.2019.22190. (validated: PubMed)
- [Reignier2018NUTRIREA2] Reignier J, Boisramé-Helms J, Brisard L, Lascarrou JB, Ait Hssain A, Anguel N, et al. Enteral versus parenteral early nutrition in ventilated adults with shock: a randomised, controlled, multicentre, open-label, parallel-group study (NUTRIREA-2). Lancet. 2018;391(10116):133-143. PMID 29128300; doi:10.1016/S0140-6736(17)32146-3. (validated: PubMed)
- [Reignier2023NUTRIREA3] Reignier J, Plantefeve G, Mira JP, Argaud L, Asfar P, Aissaoui N, et al. Low versus standard calorie and protein feeding in ventilated adults with shock: a randomised, controlled, multicentre, open-label, parallel-group trial (NUTRIREA-3). Lancet Respir Med. 2023;11(7):602-612. PMID 36958363; doi:10.1016/S2213-2600(23)00092-9. (validated: PubMed)
- [Young2015HEAT] Young P, Saxena M, Bellomo R, Freebairn R, Hammond N, van Haren F, et al. Acetaminophen for Fever in Critically Ill Patients with Suspected Infection. N Engl J Med. 2015;373(23):2215-24. PMID 26436473; doi:10.1056/NEJMoa1508375. (validated: PubMed)
- [Shehabi2019SPICE3] Shehabi Y, Howe BD, Bellomo R, Arabi YM, Bailey M, Bass FE, et al. Early Sedation with Dexmedetomidine in Critically Ill Patients. N Engl J Med. 2019;380(26):2506-2517. PMID 31112380; doi:10.1056/NEJMoa1904710. (validated: PubMed)
- [Hughes2021MENDS2] Hughes CG, Mailloux PT, Devlin JW, Swan JT, Sanders RD, Anzueto A, et al. Dexmedetomidine or Propofol for Sedation in Mechanically Ventilated Adults with Sepsis. N Engl J Med. 2021;384(15):1424-1436. PMID 33528922; PMCID PMC8162695; doi:10.1056/NEJMoa2024922. (validated: PubMed)
- [Devlin2018PADIS] Devlin JW, Skrobik Y, Gélinas C, Needham DM, Slooter AJC, Pandharipande PP, et al. Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU. Crit Care Med. 2018;46(9):e825-e873. PMID 30113379; doi:10.1097/CCM.0000000000003299. (validated: PubMed)
- [Girard2008ABC] Girard TD, Kress JP, Fuchs BD, Thomason JW, Schweickert WD, Pun BT, et al. Efficacy and safety of a paired sedation and ventilator weaning protocol for mechanically ventilated patients in intensive care (Awakening and Breathing Controlled trial): a randomised controlled trial. Lancet. 2008;371(9607):126-34. PMID 18191684; doi:10.1016/S0140-6736(08)60105-1. (validated: PubMed)
- [Schweickert2009Mobility] Schweickert WD, Pohlman MC, Pohlman AS, Nigos C, Pawlik AJ, Esbrook CL, et al. Early physical and occupational therapy in mechanically ventilated, critically ill patients: a randomised controlled trial. Lancet. 2009;373(9678):1874-82. PMID 19446324; PMCID PMC9906655; doi:10.1016/S0140-6736(09)60658-9. (validated: PubMed)
- [Pun2019ABCDEF] Pun BT, Balas MC, Barnes-Daly MA, Thompson JL, Aldrich JM, Barr J, et al. Caring for Critically Ill Patients with the ABCDEF Bundle: Results of the ICU Liberation Collaborative in Over 15,000 Adults. Crit Care Med. 2019;47(1):3-14. PMID 30339549; PMCID PMC6298815; doi:10.1097/CCM.0000000000003482. (validated: PubMed)
- [Lautrette2007Family] Lautrette A, Darmon M, Megarbane B, Joly LM, Chevret S, Adrie C, et al. A communication strategy and brochure for relatives of patients dying in the ICU. N Engl J Med. 2007;356(5):469-78. PMID 17267907; doi:10.1056/NEJMoa063446. (validated: PubMed)
- [Moore2019NurseProtocol] Moore WR, Vermuelen A, Taylor R, Kihara D, Wahome E. Improving 3-Hour Sepsis Bundled Care Outcomes: Implementation of a Nurse-Driven Sepsis Protocol in the Emergency Department. J Emerg Nurs. 2019;45(6):690-698. PMID 31235077; doi:10.1016/j.jen.2019.05.005. (validated: PubMed)
- [Semanco2022RRTProtocol] Semanco M, Wright S, Rich RL. Improving Initial Sepsis Management Through a Nurse-Driven Rapid Response Team Protocol. Crit Care Nurse. 2022;42(5):51-57. PMID 36180059; doi:10.4037/ccn2022608. (validated: PubMed)
- [Hillman2005MERIT] Hillman K, Chen J, Cretikos M, Bellomo R, Brown D, Doig G, et al. Introduction of the medical emergency team (MET) system: a cluster-randomised controlled trial. Lancet. 2005;365(9477):2091-7. PMID 15964445; doi:10.1016/S0140-6736(05)66733-5. (validated: PubMed)
- [Chan2010RRT] Chan PS, Jain R, Nallmothu BK, Berg RA, Sasson C. Rapid Response Teams: A Systematic Review and Meta-analysis. Arch Intern Med. 2010;170(1):18-26. PMID 20065195; doi:10.1001/archinternmed.2009.424. (validated: PubMed)
- [Lee2007Cultures] Lee A, Mirrett S, Reller LB, Weinstein MP. Detection of bloodstream infections in adults: how many blood cultures are needed?. J Clin Microbiol. 2007;45(11):3546-8. PMID 17881544; PMCID PMC2168497; doi:10.1128/JCM.01555-07. (validated: PubMed)
- [CardenasGarcia2015Peripheral] Cardenas-Garcia J, Schaub KF, Belchikov YG, Narasimhan M, Koenig SJ, Mayo PH. Safety of peripheral intravenous administration of vasoactive medication. J Hosp Med. 2015;10(9):581-5. PMID 26014852; doi:10.1002/jhm.2394. (validated: PubMed)
- [Loubani2015Extravasation] Loubani OM, Green RS. A systematic review of extravasation and local tissue injury from administration of vasopressors through peripheral intravenous catheters and central venous catheters. J Crit Care. 2015;30(3):653.e9-17. PMID 25669592; doi:10.1016/j.jcrc.2015.01.014. (validated: PubMed)
- [Owen2021Peripheral] Owen VS, Rosgen BK, Cherak SJ, Ferland A, Stelfox HT, Fiest KM, et al. Adverse events associated with administration of vasopressor medications through a peripheral intravenous catheter: a systematic review and meta-analysis. Crit Care. 2021;25(1):146. PMID 33863361; PMCID PMC8050944; doi:10.1186/s13054-021-03553-1. (validated: PubMed)
- [FDA-Levophed] Hospira, Inc. LEVOPHED (norepinephrine bitartrate) injection, US prescribing information. Label effective 2025-06-12; set ID 2c7dd2b0-cc10-4db6-bf56-6eb154ebeb10. Sections 2 and 5.1 read from the openFDA drug label endpoint. (validated: openFDA)
- [Pronovost2006Keystone] Pronovost P, Needham D, Berenholtz S, Sinopoli D, Chu H, Cosgrove S, et al. An intervention to decrease catheter-related bloodstream infections in the ICU. N Engl J Med. 2006;355(26):2725-32. PMID 17192537; doi:10.1056/NEJMoa061115. (validated: PubMed)
- [Pronovost2010BMJ] Pronovost PJ, Goeschel CA, Colantuoni E, Watson S, Lubomski LH, Berenholtz SM, et al. Sustaining reductions in catheter related bloodstream infections in Michigan intensive care units: observational study. BMJ. 2010;340:c309. PMID 20133365; PMCID PMC2816728; doi:10.1136/bmj.c309. (validated: PubMed)
- [Berenholtz2004CRBSI] Berenholtz SM, Pronovost PJ, Lipsett PA, Hobson D, Earsing K, Farley JE, et al. Eliminating catheter-related bloodstream infections in the intensive care unit. Crit Care Med. 2004;32(10):2014-20. PMID 15483409; doi:10.1097/01.ccm.0000142399.70913.2f. (validated: PubMed)
- [Climo2013CHG] Climo MW, Yokoe DS, Warren DK, Perl TM, Bolon M, Herwaldt LA, et al. Effect of daily chlorhexidine bathing on hospital-acquired infection. N Engl J Med. 2013;368(6):533-42. PMID 23388005; PMCID PMC5703051; doi:10.1056/NEJMoa1113849. (validated: PubMed)
- [Saint2016CAUTI] Saint S, Greene MT, Krein SL, Rogers MA, Ratz D, Fowler KE, et al. A Program to Prevent Catheter-Associated Urinary Tract Infection in Acute Care. N Engl J Med. 2016;374(22):2111-9. PMID 27248619; PMCID PMC9661888; doi:10.1056/NEJMoa1504906. (validated: PubMed)
- [Meddings2014CAUTI] Meddings J, Rogers MA, Krein SL, Fakih MG, Olmsted RN, Saint S. Reducing unnecessary urinary catheter use and other strategies to prevent catheter-associated urinary tract infection: an integrative review. BMJ Qual Saf. 2014;23(4):277-89. PMID 24077850; PMCID PMC3960353; doi:10.1136/bmjqs-2012-001774. (validated: PubMed)
- [Labeau2021DecubICUs] Labeau SO, Afonso E, Benbenishty J, Blackwood B, Boulanger C, Brett SJ, et al. Prevalence, associated factors and outcomes of pressure injuries in adult intensive care unit patients: the DecubICUs study. Intensive Care Med. 2021;47(2):160-169. PMID 33034686; PMCID PMC7880913; doi:10.1007/s00134-020-06234-9. (validated: PubMed)
- [Ely2001CAMICU] Ely EW, Inouye SK, Bernard GR, Gordon S, Francis J, May L, et al. Delirium in mechanically ventilated patients: validity and reliability of the confusion assessment method for the intensive care unit (CAM-ICU). JAMA. 2001;286(21):2703-10. PMID 11730446; doi:10.1001/jama.286.21.2703. (validated: PubMed)
- [Ely2004Delirium] Ely EW, Shintani A, Truman B, Speroff T, Gordon SM, Harrell FE Jr, et al. Delirium as a predictor of mortality in mechanically ventilated patients in the intensive care unit. JAMA. 2004;291(14):1753-62. PMID 15082703; doi:10.1001/jama.291.14.1753. (validated: PubMed)
- [Pandharipande2013Cognition] Pandharipande PP, Girard TD, Jackson JC, Morandi A, Thompson JL, Pun BT, et al. Long-term cognitive impairment after critical illness. N Engl J Med. 2013;369(14):1306-16. PMID 24088092; PMCID PMC3922401; doi:10.1056/NEJMoa1301372. (validated: PubMed)
- [Jones2010Diaries] Jones C, Bäckman C, Capuzzo M, Egerod I, Flaatten H, Granja C, et al. Intensive care diaries reduce new onset post traumatic stress disorder following critical illness: a randomised, controlled trial. Crit Care. 2010;14(5):R168. PMID 20843344; PMCID PMC3219263; doi:10.1186/cc9260. (validated: PubMed)
- [GarrousteOrgeas2019Diary] Garrouste-Orgeas M, Flahault C, Vinatier I, Rigaud JP, Thieulot-Rolin N, Mercier E, et al. Effect of an ICU Diary on Posttraumatic Stress Disorder Symptoms Among Patients Receiving Mechanical Ventilation: A Randomized Clinical Trial. JAMA. 2019;322(3):229-239. PMID 31310299; PMCID PMC6635906; doi:10.1001/jama.2019.9058. (validated: PubMed)

## Provenance
- Every source above was checked with NCBI E-utilities esummary (authors, title, journal, year, volume, pages, PMID, PMCID, DOI) on 2026-11-04, and its abstract was read with efetch before any number was taken. FDA-Levophed was checked against the openFDA drug label endpoint (brand LEVOPHED, Hospira, effective 2025-06-12).
- Full texts read: SSC 2021 (Europe PMC, PMC8486643) for recommendation wording, strength and rationale. KDIGO summary (Europe PMC, PMC4057151) for AKI definition and staging. IDSA 2009 catheter guideline (NCBI PMC, PMC4039170) for catheter-removal and paired-culture wording.
- Authors for Tabah2016Deescalation and Pronovost2010BMJ (beyond the first) were taken from the PubMed esummary author list.
- Dropped because no abstract or open full text could be read: CDC/HICPAC CAUTI guideline (Gould 2010), CDC intravascular catheter guideline (O'Grady 2011), IDSA/SHEA stewardship guideline (Barlam 2016), WHO AWaRe Antibiotic Book commentary (Sharland 2022), blood culture contamination review (Doern 2019), and the KDIGO précis by Khwaja 2012. Hsia2019AWaRe replaces Sharland for the AWaRe classification.
- Not used: RCP NEWS2 2017 report (no PubMed or Crossref record found), so NEWS2 observation-frequency wording is absent (pass D's area). Mega-ROX had only protocol papers in PubMed on 2026-11-04.
- Nothing in this file is marked (unverified).
- Canonical keys used from the dossier: Evans2021SSC, Kumar2006Delay, Seymour2017Timing (text identical to pass E). Keys reused from other companions or passes: Lee2007Cultures, Liu2017Antibiotics (pass E), Ely2001CAMICU (alcohol-use-disorder companion; the Alzheimer's companion lists the same work as Ely2001).
- Statements of guideline wording, doses (pantoprazole 40 mg, acetaminophen 1 g, micafungin 100 mg, norepinephrine label wording), glucose, haemoglobin, oxygen and urine-output thresholds are quoted as published for teaching, never as instructions.
