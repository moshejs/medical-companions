/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js */
const COPDRV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const COPDRV_FC=[
 /* ---- Part 1: understanding COPD ---- */
 [1,`How does GOLD 2023 define COPD?`,`"A heterogeneous lung condition characterized by chronic respiratory symptoms (dyspnea, cough, expectoration, and/or exacerbations) due to abnormalities of the airways (bronchitis, bronchiolitis) and/or alveoli (emphysema) that cause persistent, often progressive, airflow obstruction" [[Agusti2023]].`],
 [1,`How many people aged 30–79 had COPD worldwide in 2019?`,`10.3% by the GOLD fixed-ratio definition, or 391.9 million people; 7.6% (292.0 million) by the lower limit of normal. 80.5% of them lived in low- and middle-income countries [[Adeloye2022]].`],
 [1,`How many deaths did COPD cause in 2019, and how has that changed since 1990?`,`3.3 million deaths and 74.4 million DALYs. Deaths rose from 2.5 million in 1990, while the age-standardised death rate fell by 41.7% [[Safiri2022]].`],
 [1,`What share of spirometry-defined COPD is undiagnosed?`,`81.4% across 44 sites in 27 countries, from 50.0% in Lexington, Kentucky to 98.3% in Ile-Ife, Nigeria. Only 26.4% had ever had a lung function test [[Lamprecht2015]].`],
 [1,`Which risks account for the most COPD DALYs in GBD 2019?`,`Smoking 46.0%, ambient particulate matter 20.7% and occupational particulates, gases and fumes 15.6% [[Safiri2022]].`],
 [1,`Can people who never smoked get COPD?`,`Yes. Never smokers made up 23.3% of moderate or worse (GOLD II+) COPD in BOLD [[Lamprecht2011]]; estimates range from 25% to 45% [[Salvi2009]]. About 3 billion people are exposed to biomass smoke [[Salvi2009]].`],
 [1,`What are the two routes to COPD in Lange 2015?`,`About half started with a normal FEV1 before 40 and declined fast (53 ± 21 mL a year); the other half started low and declined at a normal rate (27 ± 18 mL a year) [[Lange2015]].`],
 [1,`What did Fletcher and Peto find about quitting?`,`A susceptible smoker who stops does not regain lost function, but the further rate of FEV1 loss returns to normal [[Fletcher1977]].`],
 [1,`Where is the main site of obstruction in COPD?`,`Small airways under 2 mm across [[McDonough2011]]. Terminal bronchioles are lost before emphysema develops: 40% fewer already in GOLD 1 [[McDonough2011,Koo2018]].`],
 [1,`Centrilobular versus panlobular emphysema?`,`Centrilobular is most closely linked to smoking and starts around the respiratory bronchioles. Panacinar (panlobular) involves the acinus more evenly and is associated with AATD [[Hogg2004Lancet,Hogg2009]].`],
 [1,`Which CT threshold best matches macroscopic emphysema?`,`−950 HU was the only threshold whose relative area did not differ from measured macroscopic emphysema [[Gevenois1995]].`],
 [1,`How does cigarette smoke weaken alpha-1 antitrypsin even when the gene is normal?`,`Oxidants in smoke turn methionine into methionine sulfoxide; smokers' BAL fluid had 40% lower elastase-inhibitory capacity [[Carp1982]].`],
 [1,`What is dynamic hyperinflation, and how is it seen?`,`A rise in operating lung volume during exertion that overloads the inspiratory muscles [[ODonnell2006]]. 80% of 105 patients hyperinflated on cycling, with inspiratory capacity falling by a mean 0.37 L [[ODonnell2001]].`],
 [1,`What causes the low blood oxygen of COPD?`,`Ventilation–perfusion mismatch and shunt, with no evidence of diffusion limitation [[Wagner1977]].`],
 [1,`How high is pulmonary artery pressure usually in COPD?`,`Mean PAP usually 20–35 mmHg in stable disease; fewer than 5% have severe PH over 40 mmHg [[Weitzenblum2009]].`],
 [1,`What is the Z allele of alpha-1 antitrypsin deficiency?`,`A Glu342Lys change in SERPINA1 (chromosome 14q32.1) [[Hamesch2019,WHO1997]]. Z protein polymerises in the liver, so a ZZ homozygote secretes only 15% [[Lomas1992]].`],
 [1,`What is the protective alpha-1 antitrypsin threshold?`,`Serum levels below 11 µmol/L increase the risk of emphysema [[Stoller2005]].`],
 [1,`When does breathlessness start in ZZ smokers versus non-smokers?`,`At a mean age of 32 in smokers and 51 in non-smokers; mean age at death 48 versus 67 years [[Janus1985]].`],
 [1,`Who should be tested for AATD, per the Alpha-1 Foundation 2016 guidance?`,`All adults with symptomatic fixed airflow obstruction (COPD or asthma), people with unexplained bronchiectasis or liver disease, and first-degree relatives [[Sandhaus2016]].`],
 /* ---- Part 2: diagnosis & assessment ---- */
 [2,`What spirometry result does GOLD 2023 need for a COPD diagnosis?`,`A post-bronchodilator FEV1/FVC below 0.7, in someone with symptoms and/or exposure to risk factors [[Agusti2023]].`],
 [2,`When does GOLD 2023 advise repeating spirometry?`,`When a single post-bronchodilator ratio falls between 0.60 and 0.80; an initial ratio below 0.6 is "very unlikely" to rise above 0.7 [[Agusti2023]].`],
 [2,`GOLD grades 1 to 4 by post-bronchodilator FEV1?`,`GOLD 1 ≥80% predicted; GOLD 2 50–79%; GOLD 3 30–49%; GOLD 4 below 30% [[Lin2025,Agusti2023]].`],
 [2,`Why does the fixed 0.70 ratio overdiagnose older people?`,`The lower limit of normal of FEV1/FVC falls with age, dropping below 0.70 at a median age of 42 in men and 48 in women [[Swanney2008]].`],
 [2,`What is the ATS/ERS 2019 repeatability target?`,`For age over 6, the two largest FVC values and the two largest FEV1 values must each agree within 0.150 L [[Graham2019]].`],
 [2,`How is a positive bronchodilator response defined since 2022?`,`A rise in FEV1 or FVC of more than 10% of the predicted value, replacing ≥12% and >200 mL from baseline [[Zhao2025,Stanojevic2022]].`],
 [2,`mMRC grade 2 versus grade 3?`,`Grade 2: walks slower than people of the same age on the level, or stops at own pace. Grade 3: stops for breath after about 100 metres or a few minutes on the level [[Xiong2026]].`],
 [2,`How is the CAT scored, and what change matters?`,`Eight items, each 0–5, for a total of 0–40 [[Minov2015]]. The minimum clinically important difference is 2 points [[Kon2014]].`],
 [2,`Which exacerbation history puts someone in GOLD group E?`,`Two or more moderate exacerbations, or one or more leading to hospital admission, in the past year, whatever the symptom level [[Cheng2023,Agusti2023]].`],
 [2,`Where do groups A and B split?`,`At mMRC 2 or CAT 10: below both is "less symptomatic" (A), at or above is "more symptomatic" (B) [[Han2013,Cheng2023]].`],
 [2,`What do blood eosinophil counts tell about inhaled steroids (GOLD 2023)?`,`Below 100 cells/µL, little or no effect; 300 or more, a strong likelihood of benefit; a continuous gradation between [[Agusti2023]].`],
 [2,`What does the BODE index measure, and how strongly does it predict death?`,`BMI, airflow obstruction, dyspnoea and exercise capacity on a 0–10 scale. Each point carried a hazard ratio of 1.34 for death from any cause [[Celli2004]].`],
 [2,`What is PRISm?`,`Preserved ratio impaired spirometry: FEV1/FVC ≥0.7 with FEV1 below 80% predicted. Prevalence 7.1–20.3%, with higher all-cause mortality [[Agusti2023]].`],
 [2,`How many older people with a GP diagnosis of COPD had hidden heart failure?`,`20.5% of 405 people aged 65 or over; only 60.2% actually met GOLD COPD criteria [[Rutten2005]].`],
 [2,`Does the USPSTF recommend screening adults without symptoms for COPD?`,`No: grade D, no net benefit [[USPSTF2022]]. GOLD supports case-finding in people with symptoms or risk factors [[Agusti2023]].`],
 /* ---- Part 3: treatment ---- */
 [3,`How does tiotropium open the airways?`,`It is a long-acting antimuscarinic; bronchodilation comes from "inhibition of M3-receptors at the smooth muscle" (label) [[FDA-SpirivaHandiHaler]].`],
 [3,`What did UPLIFT show for tiotropium over 4 years?`,`Higher FEV1, better quality of life and fewer exacerbations, but no slowing of the rate of FEV1 decline [[Tashkin2008D]].`],
 [3,`POET-COPD: tiotropium or salmeterol for exacerbations?`,`Tiotropium lengthened time to first moderate or severe exacerbation from 145 to 187 days (HR 0.83) [[Vogelmeier2011]].`],
 [3,`What did FLAME compare and find?`,`Indacaterol–glycopyrronium (LABA+LAMA) against salmeterol–fluticasone (LABA+ICS): fewer exacerbations (rate ratio 0.89) and less pneumonia (3.2% vs 4.8%) [[Wedzicha2016]].`],
 [3,`Did TORCH show a mortality benefit for salmeterol–fluticasone?`,`No. HR 0.825 versus placebo (P=0.052). Pneumonia was more frequent with fluticasone-containing arms [[Calverley2007]].`],
 [3,`IMPACT: annual moderate-or-severe exacerbation rates?`,`0.91 with triple therapy, 1.07 with FF/VI and 1.21 with UMEC/VI (rate ratios 0.85 and 0.75) [[Lipson2018]].`],
 [3,`Does GOLD 2023 still encourage LABA + ICS in COPD?`,`No. "If there is an indication for an ICS, then LABA + LAMA + ICS has been shown to be superior to LABA + ICS and is therefore the preferred choice" [[Agusti2023]].`],
 [3,`What did WISDOM show about withdrawing inhaled steroids?`,`Stepwise withdrawal on LAMA + LABA was noninferior for first exacerbation (HR 1.06), but trough FEV1 fell 38 mL more by week 18 [[Magnussen2014]].`],
 [3,`What is roflumilast labelled for?`,`To reduce the risk of exacerbations in severe COPD with chronic bronchitis and a history of exacerbations. It "is not a bronchodilator"; 250 mcg is a starting dose only [[FDA-Daliresp]].`],
 [3,`What did daily azithromycin do in Albert 2011?`,`Time to first exacerbation 266 versus 174 days; hearing decrements 25% versus 20% [[Albert2011]]. No benefit in current smokers (HR 0.99) [[Han2014]].`],
 [3,`Which biologics have US labels for COPD, and for whom?`,`Dupilumab (IL-4Rα, approved 2024-09-27) and mepolizumab (IL-5, approved 2025-05-22), as add-on maintenance for COPD with an eosinophilic phenotype [[FDA-Dupixent,FDA-Nucala]].`],
 [3,`BOREAS: what did dupilumab do?`,`In people on triple therapy with eosinophils ≥300/µL, exacerbations fell from 1.10 to 0.78 a year (rate ratio 0.70) [[Bhatt2023]]. NOTUS replicated it (0.66) [[Bhatt2024]].`],
 [3,`What is ensifentrine?`,`A dual PDE3/PDE4 inhibitor given by jet nebuliser, FDA-approved on 2024-06-26 for COPD maintenance [[FDA-Ohtuvayre]]. FEV1 AUC rose 87 and 94 mL in ENHANCE-1 and -2 [[Anzueto2023]].`],
 [3,`How many people use their inhaler correctly?`,`31% in a review of 144 articles and 59,584 technique tests, with no improvement over about 40 years [[Sanchis2016]].`],
 [3,`What inspiratory flow does a dry powder inhaler need?`,`An optimal peak inspiratory flow of at least 60 L/min [[Mahler2017]]. 52% of people admitted with an exacerbation fell short [[Loh2017]].`],
 [3,`Did a smoking-cessation programme lower deaths in the Lung Health Study?`,`Yes: 8.83 versus 10.38 deaths per 1,000 person-years over 14.5 years (HR for usual care 1.18) [[Anthonisen2005]].`],
 [3,`Varenicline in smokers with mild to moderate COPD?`,`Continuous abstinence over weeks 9–12 was 42.3% versus 8.8% with placebo [[Tashkin2011Chest]].`],
 [3,`What does pulmonary rehabilitation achieve in stable COPD?`,`Six-minute walk distance up 43.93 m and SGRQ improved by 6.89 points, both above the minimal important differences [[McCarthy2015]].`],
 [3,`What are the ATS 2020 thresholds for long-term oxygen?`,`PaO2 ≤55 mm Hg (7.3 kPa) or SpO2 ≤88%; or PaO2 56–59 mm Hg or SpO2 89% with oedema, haematocrit ≥55% or P pulmonale [[Jacobs2020]].`],
 [3,`What did NOTT and MRC show?`,`NOTT: mortality 1.94 times higher with 12-hour nocturnal than continuous oxygen [[NOTT1980]]. MRC: 45% versus 67% dead over 5 years with ≥15 h/day oxygen versus none [[MRC1981]].`],
 [3,`Does oxygen help moderate desaturation (LOTT)?`,`No difference in time to death or first hospitalisation (HR 0.94) for resting SpO2 89–93% or exercise-only desaturation [[Albert2016]].`],
 [3,`What did HOT-HMV find for home NIV?`,`After a hypercapnic admission, home NIV plus oxygen lengthened median time to readmission or death from 1.4 to 4.3 months (HR 0.49) [[Murphy2017]].`],
 /* ---- Part 4: flare-ups & hospital ---- */
 [4,`How does the Rome proposal (GOLD 2023) define an exacerbation?`,`Dyspnoea and/or cough and sputum that worsen over ≤14 days, possibly with tachypnoea and/or tachycardia, often with inflammation from infection, pollution or another insult [[Agusti2023,Celli2022]].`],
 [4,`Rome "moderate": which five signs, and how many?`,`At least three of: VAS dyspnoea ≥5, respiratory rate ≥24, heart rate ≥95, SpO2 <92% and/or a fall >3%, CRP ≥10 mg/L [[Jacobson2023,Celli2022]].`],
 [4,`What makes a Rome exacerbation "severe"?`,`The blood gas: hypercapnia (PaCO2 >45 mmHg) with acidosis (pH <7.35) [[Celli2022,Lee2023]].`],
 [4,`What is the single best predictor of future exacerbations?`,`A history of exacerbations, across all GOLD stages (ECLIPSE) [[Hurst2010]].`],
 [4,`What triggers flare-ups?`,`Viruses were found in 48.4% and bacteria in 54.7% of admitted exacerbations [[Papi2006]]; 58.2% of the viruses in a London cohort were rhinoviruses [[Seemungal2001]].`],
 [4,`How often is pulmonary embolism found in unexplained exacerbations?`,`A pooled 16.1% on CT angiography [[Aleva2017]].`],
 [4,`What is the outlook after a first COPD hospitalisation (Quebec)?`,`50% had died by 3.6 years and 75% by 7.7 years [[Suissa2012]].`],
 [4,`What steroid course does GOLD 2023 recommend for an exacerbation?`,`"A dose of 40 mg prednisone-equivalent per day for 5 days" [[Agusti2023]]; in REDUCE, 5 days was non-inferior to 14 [[Leuppi2013]].`],
 [4,`What are the Anthonisen criteria?`,`More dyspnoea, more sputum volume and more sputum purulence [[Anthonisen1987]].`],
 [4,`What oxygen saturation target does GOLD 2023 give for an exacerbation?`,`88–92% [[Agusti2023]]. Paramedic titration to this range cut mortality versus high flow (9% vs 4%; RR 0.42) [[Austin2010]].`],
 [4,`What does BTS 2017 suggest before blood gases are known in COPD?`,`A 24% Venturi mask at 2–3 L/min, a 28% Venturi at 4 L/min or nasal cannulae at 1–2 L/min, aiming for 88–92% [[ODriscoll2017Summary]].`],
 [4,`How much does NIV help in acute hypercapnic failure?`,`Cochrane 2017: NNT 12 to prevent one death and NNT 5 to prevent one intubation [[Osadnik2017]].`],
 [4,`When does BTS/ICS 2016 say to start NIV?`,`When pH <7.35 and pCO2 >6.5 kPa persist or develop despite optimal medical therapy [[Davidson2016Summary]], within 60 minutes of the qualifying gas [[Davies2018]].`],
 [4,`What does each DECAF letter stand for?`,`Dyspnoea (extended MRC), Eosinopenia, Consolidation, Acidaemia and atrial Fibrillation [[Steer2012]]. In-hospital mortality was 0% at score 0 and 40.5% at 5 [[Echevarria2016]].`],
 [4,`How does bicarbonate respond to a raised PaCO2?`,`Acute: about 1 mEq/L per 10 mmHg; chronic: about 3.5 mEq/L per 10 mmHg [[Sood2010]].`],
 [4,`What can a venous blood gas replace?`,`Venous and arterial pH and bicarbonate agreed well, but venous PCO2 should not be read as arterial [[McKeever2016]].`],
 /* ---- Part 5: living & care ---- */
 [5,`What did self-management with a written action plan achieve (Cochrane 2017)?`,`SGRQ −2.69 and fewer respiratory admissions (OR 0.69; NNT 12 at high baseline risk) [[Lenferink2017]].`],
 [5,`How does pursed-lip breathing help?`,`It lengthens expiration: end-expiratory chest-wall volume fell 0.33 L and tidal volume rose 0.65 L [[Bianchi2004]].`],
 [5,`What does a hypoxic challenge test imitate, and how is it read?`,`15% oxygen, about a cabin altitude of 2,438 m. PaO2 <6.6 kPa or SpO2 <85% means in-flight oxygen is recommended (BTS 2022) [[Coker2022]].`],
 [5,`When is heart risk highest after an exacerbation?`,`In the first 30 days: SUMMIT HR 3.8, and 9.9 after a hospitalised exacerbation [[Kunisaki2018]].`],
 [5,`Should people with COPD avoid beta-blockers?`,`GOLD 2023 supports selective β1-blockers when there is a clear cardiovascular indication [[Agusti2023]]. Metoprolol without one increased hospitalised exacerbations in BLOCK COPD [[Dransfield2019]].`],
 [5,`How common is lung cancer in COPD?`,`16.7 per 1,000 person-years in 2,507 outpatients; squamous cell carcinoma was most common (44%) [[deTorres2011]].`],
 [5,`USPSTF 2021 lung cancer screening criteria?`,`Annual low-dose CT for adults aged 50–80 with 20 pack-years who smoke or quit within 15 years [[Krist2021]].`],
 [5,`How common are depressive symptoms in COPD?`,`24.6% versus 11.7% of controls (pooled OR 2.81) [[Zhang2011]].`],
 [5,`What is NEWS2 scale 2?`,`The second oxygen saturation scale, with a target of 88–92% for people with hypercapnic respiratory failure [[Echevarria2019]].`],
 [5,`What did teach-to-goal inhaler training achieve?`,`Metered-dose inhaler misuse of 12.5% versus 46% after brief verbal and written instruction [[Press2012]].`],
 [5,`What is the main fire risk with home oxygen?`,`Tobacco smoking; any naked flame is a hazard, and e-cigarettes are considered unsafe with home oxygen [[Cooper2015]].`],
 [5,`NETT: who gained survival from lung volume reduction surgery?`,`People with upper-lobe-predominant emphysema and low exercise capacity (risk ratio 0.47) [[Fishman2003]].`],
 [5,`What must be true for endobronchial valves to work, and what is the main early risk?`,`Little or no collateral ventilation into the target lobe [[Davey2015,FDA-Zephyr]]. Pneumothorax: 18% in STELVIO, 29.2% in TRANSFORM [[Klooster2015,Kemp2017]].`],
 [5,`Does oxygen ease breathlessness in people who are not hypoxaemic?`,`No more than room air through the same concentrator in 239 people with refractory breathlessness [[Abernethy2010]].`],
 [5,`Which TSLP and IL-33 results define the frontier?`,`Tezepelumab missed its COURSE primary endpoint (rate ratio 0.83) [[Singh2025COURSE]]; itepekimab helped former but not current smokers in phase 2 (RR 0.58 vs 1.09) [[Rabe2021]] (Early evidence).`],
 [5,`What does the COTE index add?`,`A COTE score ≥4 roughly doubled the risk of death (HR 2.26–2.68) in every BODE quartile [[Divo2012]].`],
 /* ---- Part 6: context & history ---- */
 [6,`Who invented the spirometer, and what did he name?`,`John Hutchinson, in 1846. He named the volume exhaled from full lungs the "vital capacity" [[Hutchinson1846,Petty2002]].`],
 [6,`Who introduced the forced expiratory volume in one second?`,`Tiffeneau and Pinelli in Paris, December 1947 (their CPUE) [[Yernault1997]].`],
 [6,`Who described alpha-1 antitrypsin deficiency, and how?`,`Laurell and Eriksson in Sweden, 1963, from a missing α1-globulin band on serum electrophoresis [[Laurell1963,Perciaccante2018]].`],
 [6,`What founded the protease–antiprotease theory?`,`Gross's 1964 finding that papain produced emphysema in animals, together with alpha-1 antitrypsin deficiency [[Petty2006]].`],
 [6,`How did the ATS define chronic bronchitis in 1962?`,`Clinically: chronic cough for at least three months in at least two years. Emphysema was defined anatomically [[Petty2006]].`],
 [6,`Who is believed to have first used the term COPD?`,`William Briscoe, at the 9th Aspen Emphysema Conference [[Petty2006]].`],
 [6,`What did quitting gain male British doctors?`,`Stopping at 60, 50, 40 or 30 gained about 3, 6, 9 or 10 years of life expectancy [[Doll2004]].`],
 [6,`How did oxygen and exercise look in the early 1960s?`,`Oxygen was considered contraindicated in COPD and exercise was discouraged for fear of straining the right heart [[Petty2006]].`],
 [6,`How have GOLD groups changed since 2017?`,`GOLD 2017 separated spirometric grade from the ABCD groups [[Vogelmeier2017]]; GOLD 2023 merged C and D into a single group E [[Agusti2023]].`]
];
/* every mnemonic here is coined for this guide */
const COPDRV_MN=[
 ["Double, count, triple, add, step back",`The GOLD 2023 follow-up path: LABA + LAMA for persistent breathlessness; an eosinophil count for flare-ups; triple therapy at ≥100 cells/µL on LABA + LAMA; roflumilast or a macrolide on top; ICS de-escalation if pneumonia develops [[Agusti2023]].`],
 ["Seven-tenths, after the puff",`Diagnosis needs a <b>post-bronchodilator</b> FEV1/FVC below <b>0.7</b>; repeat if a single ratio is 0.60–0.80 [[Agusti2023]].`],
 ["Eighty, fifty, thirty",`GOLD grades by post-bronchodilator FEV1 % predicted: 1 at ≥<b>80</b>, 2 at <b>50</b>–79, 3 at <b>30</b>–49, 4 below 30 [[Lin2025,Agusti2023]].`],
 ["Two at home or one in hospital: E",`Group E: <b>2</b> or more moderate exacerbations, or <b>1</b> or more leading to hospital admission, in the past year [[Cheng2023,Agusti2023]].`],
 ["Under one hundred, little; three hundred, likely",`Blood eosinophils and inhaled steroids: below <b>100</b> cells/µL little or no effect, <b>300</b> or more a strong likelihood of benefit [[Agusti2023]].`],
 ["Fifty-five or eighty-eight",`Long-term oxygen threshold in ATS 2020: PaO2 ≤<b>55</b> mm Hg or SpO2 ≤<b>88</b>% (or 56–59 mm Hg with oedema, haematocrit ≥55% or P pulmonale) [[Jacobs2020]].`],
 ["Eighty-eight to ninety-two",`The oxygen saturation target for people at risk of hypercapnic respiratory failure, in GOLD 2023 and BTS 2017 [[Agusti2023,ODriscoll2017Summary]].`],
 ["Forty for five",`GOLD 2023: "<b>40</b> mg prednisone-equivalent per day for <b>5</b> days" for an exacerbation [[Agusti2023]]; REDUCE found 5 days non-inferior to 14 [[Leuppi2013]].`],
 ["Breath, bulk, colour",`The Anthonisen criteria: more dyspnoea, more sputum volume, more sputum purulence [[Anthonisen1987]].`],
 ["Below 7.35, above 6.5",`BTS/ICS 2016: start NIV when pH <<b>7.35</b> and pCO2 ><b>6.5</b> kPa persist despite optimal medical therapy [[Davidson2016Summary]].`],
 ["Sixty-two halves to thirty-one",`Lung Health Study: sustained quitters lost FEV1 at 31 versus 62 mL a year in continuing smokers [[Scanlon2000]].`]
];
/* the follow-up path for the animation: step number, memory word, situation (wide), result (wide), situation (narrow) */
const COPDRV_TL=[
 ['1','Start','on LAMA or LABA','review breathlessness and flare-ups','one bronchodilator'],
 ['2','Double','still breathless','step up to LABA + LAMA','still breathless'],
 ['3','Count','flare-ups on one','dual, or triple if eosinophils ≥300','flare-ups on one'],
 ['4','Triple','flare-ups on two','add ICS if eosinophils ≥100/µL','flare-ups on two'],
 ['5','Add','flare-ups on triple','roflumilast or a macrolide','flare-ups on triple'],
 ['6','Step back','pneumonia on ICS','ICS de-escalation can be considered','pneumonia on ICS']
];
const COPDRV_TXT={
 head:'Double, count, triple, add, step back',
 title:(n,w)=>`Step ${n} · ${w}`,
 trait:['breathlessness','flare-ups','side effects'],
 chip:{lama:'LAMA',laba:'LABA',ics:'ICS',rof:'roflumilast',mac:'macrolide',one:'LAMA or LABA'},
 eosT:'blood eosinophils, cells/µL',eosNow:v=>`count: ${v}/µL`,
 zone:['little or none','graded','strong'],
 cap:[
  ['one long-acting bronchodilator','review two traits at each visit'],
  ['dyspnoea persists: add the other class','still breathless: check device, other causes'],
  ['eosinophils below 300: LABA + LAMA','eosinophils 300 or more: may go triple'],
  ['eosinophils below 100: ICS adds little','eosinophils 100 or more: add ICS'],
  ['roflumilast: chronic bronchitis, FEV1 <50%','macrolide: people who are not current smokers'],
  ['pneumonia or side effects: step ICS down','at 300 or more, flare-ups more likely']
 ],
 foot:'schematic of GOLD 2023, not a plan',
 val:s=>`${s.k}: ${s.t}`
};
const COPDRV_STEPS=[
 {from:0,at:.06,k:'Step 1',t:'Start: one long-acting bronchodilator',txt:`GOLD 2023 bases follow-up treatment on two treatable traits, "dyspnea and occurrence of exacerbations" [[Agusti2023]]. As a memory aid written for this guide, five words follow the path on from one long-acting bronchodilator: <b>double, count, triple, add, step back</b>. GOLD itself notes that "Treatment escalation has not been systematically tested" [[Agusti2023]].`,pt:'At each review the team asks two questions: is breathing still hard, and are flare-ups still happening?',hook:'GOLD follow-up is driven by two traits: dyspnoea and exacerbations. [[Agusti2023]]'},
 {from:1/6,at:1/6+.06,k:'Step 2',t:'Double: still breathless',txt:`Persistent dyspnoea on one long-acting bronchodilator: "a step up to LABA + LAMA is recommended". If that fails, "clinicians should consider switching inhaler device or molecules, as well as investigating and treating other causes of dyspnea" [[Agusti2023]]. The ATS 2020 guideline makes a strong recommendation for LABA/LAMA over either alone in people with dyspnoea or exercise intolerance [[Nici2020]].`,pt:'If breathing stays hard on one inhaled medicine, guidelines describe adding a second kind that opens the airways in a different way.',hook:'Breathless on one: LABA + LAMA. Still breathless: check the device and look for other causes. [[Agusti2023]]'},
 {from:2/6,at:2/6+.06,k:'Step 3',t:'Count: flare-ups on one',txt:`Exacerbations on monotherapy: "escalation to LABA + LAMA is recommended, except for patients with blood eosinophils ≥300 cells/μl, who may be escalated to LABA + LAMA + ICS" [[Agusti2023]]. GOLD reads the count as a gradient: little or no ICS effect below 100 cells/µL, a strong likelihood of benefit at 300 or more, and a continuous gradation between [[Agusti2023]].`,pt:'For flare-ups, a blood count of eosinophils, one kind of white blood cell, helps show whether an inhaled steroid is likely to help.',hook:'Eosinophils <100/µL: little or no ICS benefit. ≥300/µL: strong likelihood of benefit. [[Agusti2023]]'},
 {from:3/6,at:3/6+.06,k:'Step 4',t:'Triple: flare-ups on two',txt:`Exacerbations on LABA + LAMA: "escalation to LABA + LAMA + ICS is recommended if they have blood eosinophils ≥100 cells/μl" [[Agusti2023]]. In IMPACT, the triple-therapy rate ratio against umeclidinium–vilanterol was 0.88 below 90 eosinophils/µL and 0.56 at 310 or more [[Pascoe2019]]. GOLD 2023 no longer encourages LABA + ICS; if an ICS is indicated, triple therapy is preferred [[Agusti2023]].`,pt:'If flare-ups continue on two airway-openers and the eosinophil count is not very low, guidelines describe adding an inhaled steroid.',hook:'Flaring on LABA + LAMA with eosinophils ≥100: triple therapy. IMPACT rate ratio 0.56 at ≥310/µL. [[Agusti2023,Pascoe2019]]'},
 {from:4/6,at:4/6+.06,k:'Step 5',t:'Add: flare-ups on triple',txt:`Exacerbations despite triple therapy, or with eosinophils below 100 cells/µL: "the addition of roflumilast (particularly in patients with chronic bronchitis and an FEV1 < 50% predicted) or a macrolide (particularly in patients who are not current smokers) may be considered" [[Agusti2023]]. Azithromycin 250 mg daily lengthened time to first exacerbation from 174 to 266 days [[Albert2011]], with no benefit in current smokers (HR 0.99) [[Han2014]]. Roflumilast "is not a bronchodilator" (label) [[FDA-Daliresp]].`,pt:'If flare-ups still happen, there are add-on tablets: one that dampens airway inflammation, and an antibiotic taken every day at a low dose.',hook:'Add-ons: roflumilast (chronic bronchitis, FEV1 <50%) or a macrolide (not current smokers). [[Agusti2023]]'},
 {from:5/6,at:5/6+.06,k:'Step 6',t:'Step back: pneumonia on ICS',txt:`"ICS de-escalation can be considered if pneumonia or other considerable side effects develop. In case of a blood eosinophil count ≥300 cells/μl, ICS de-escalation is more likely to be associated with development of exacerbations" [[Agusti2023]]. In WISDOM, stepwise fluticasone withdrawal on LAMA + LABA was noninferior for first exacerbation (HR 1.06), but trough FEV1 fell 38 mL more by week 18 [[Magnussen2014]]. The ERS 2020 guideline strongly recommends not withdrawing ICS at eosinophils ≥300/µL [[Chalmers2020]].`,pt:'An inhaled steroid can be stepped down if it causes problems such as pneumonia, though flare-ups are more likely when the eosinophil count is high.',hook:'WISDOM: ICS withdrawal noninferior for first exacerbation (HR 1.06), with trough FEV1 38 mL lower. [[Magnussen2014]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(COPDRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=COPDRV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=COPDRV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=COPDRV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=COPDRV_MN.map(m=>`<div class="card"><span class="tag accent">memory aid, not from a source</span><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');

  /* ---- mnemonic in motion: the GOLD 2023 follow-up path ---- */
  const svg=$('#rvSvg'),rg=$('#rvT'),T=COPDRV_TXT;
  /* one maintenance block: soft fill and strong edge from a token pair */
  const chipG=(x,y,w,h,lab,tok,o=1,dash=false)=>`<g style="opacity:${f1(o)}"><rect x="${f1(x)}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--${tok}-soft);stroke:var(--${tok});stroke-width:1.8${dash?';stroke-dasharray:5 4':''}"/><text class="rv-c" x="${f1(x+w/2)}" y="${y+h/2+5}" text-anchor="middle" style="font-weight:700">${lab}</text></g>`;
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const p=phaseOf(COPDRV_STEPS,t),u=clamp((t-COPDRV_STEPS[p].from)*6);
    const L=N?{x:12,y:40,w:376,rh:40,th:34,hy:24}:{x:16,y:48,w:300,rh:54,th:46,hy:32};
    const R=N?{x:12,y:290,w:376,h:336}:{x:332,y:16,w:372,h:348};
    let s=`<text class="rv-a" x="${L.x}" y="${L.hy}">${T.head}</text>`;
    COPDRV_TL.forEach(([num,word,what,res,whatN],k)=>{
      const y=L.y+k*L.rh,hot=k===p,done=k<p;
      s+=`<g style="opacity:${hot?1:done?.8:.5}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--rx-soft':'--panel'});stroke:var(${hot?'--rx':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?13:15;
      s+=`<circle cx="${L.x+cr+8}" cy="${y+L.th/2}" r="${cr}" style="fill:var(${hot?'--rx':'--muted'})"/><text class="rv-n" x="${L.x+cr+8}" y="${y+L.th/2+4.5}" text-anchor="middle">${num}</text>`;
      const tx=L.x+cr*2+18;
      if(N)s+=`<text class="rv-c" x="${tx}" y="${y+L.th/2+5}"><tspan style="font-weight:700">${word}</tspan> · ${whatN}</text>`;
      else s+=`<text class="rv-c" x="${tx}" y="${y+20}" style="font-weight:700">${word}: ${what}</text><text class="rv-b" x="${tx}" y="${y+37}">${res}</text>`;
      s+='</g>'});
    /* explainer panel, in its own coordinates */
    const W=R.w,H=R.h;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=`<text class="rv-a" x="16" y="28">${T.title(COPDRV_TL[p][0],COPDRV_TL[p][1])}</text>`;
    /* the trait being reviewed */
    const tr=p===0?-1:p===1?0:p===5?2:1,pw=110;
    T.trait.forEach((lab,k)=>{const x=16+k*(pw+8),on=k===tr||(p===0&&k<2);
      s+=`<rect x="${x}" y="40" width="${pw}" height="24" rx="12" style="fill:var(${k===tr?'--fl-soft':'--panel'});stroke:var(${k===tr?'--fl':'--line'});stroke-width:${k===tr?1.6:1}${on?'':';opacity:.55'}"/><text class="rv-b" x="${x+pw/2}" y="56" text-anchor="middle" style="${k===tr?'fill:var(--ink);font-weight:700':''}">${lab}</text>`});
    /* eosinophil value for this moment (cells/µL), drawn on the scale below */
    let eos=null;
    if(p===2)eos=Math.round(lerp(60,380,ease(ramp(u,.12,.82))));
    else if(p===3)eos=Math.round(lerp(50,260,ease(ramp(u,.12,.8))));
    else if(p===4)eos=80;
    else if(p===5)eos=Math.round(lerp(150,340,ease(ramp(u,.45,.9))));
    /* the maintenance stack */
    const cw=(W-32-3*8)/4,cy=80,chH=46,cx=k=>16+k*(cw+8);
    let line=0;
    if(p===0){s+=chipG(cx(0),cy,cw*2+8,chH,T.chip.one,'bd')}
    else{
      const inL=p===1?ease(ramp(u,.1,.4)):1;
      s+=chipG(cx(0),cy,cw,chH,T.chip.lama,'bd');
      s+=chipG(lerp(cx(0),cx(1),inL),cy,cw,chH,T.chip.laba,'bd',inL);
      if(p===1)line=u>.6?1:0;
      if(p===2){const on=eos>=300;s+=chipG(cx(2),cy,cw,chH,T.chip.ics,'ics',on?1:.18,!on);line=on?1:0}
      if(p===3){const on=eos>=100;s+=chipG(cx(2),cy,cw,chH,T.chip.ics,'ics',on?1:.18,!on);line=on?1:0}
      if(p===4){s+=chipG(cx(2),cy,cw,chH,T.chip.ics,'ics');const a=ease(ramp(u,.08,.35)),rof=u<.55;line=rof?0:1;
        s+=chipG(lerp(W-16-cw,cx(3),a),cy,cw,chH,rof?T.chip.rof:T.chip.mac,'rx',a)}
      if(p===5){const d=ease(ramp(u,.12,.42));s+=chipG(cx(2),cy+d*16,cw,chH,T.chip.ics,'ics',1-d*.75,d>.3);line=u<.45?0:1}
    }
    /* what this step means, two lines; the active one in bold */
    const C=T.cap[p];
    s+=`<text class="rv-c" x="16" y="${cy+chH+34}" style="${line===0?'font-weight:700':'opacity:.7'}">${C[0]}</text><text class="rv-c" x="16" y="${cy+chH+56}" style="${line===1?'font-weight:700':'opacity:.7'}">${C[1]}</text>`;
    /* the eosinophil scale, 0 to 400 cells/µL */
    const bx0=24,bx1=W-24,by=226,bh=16,X=v=>bx0+(bx1-bx0)*clamp(v/400);
    s+=`<g style="opacity:${eos===null?.4:1}">`;
    s+=`<text class="rv-b" x="16" y="${by-14}">${T.eosT}</text>`;
    if(eos!==null)s+=`<text class="rv-b" x="${W-16}" y="${by-14}" text-anchor="end" style="fill:var(--ink);font-weight:700">${T.eosNow(eos)}</text>`;
    s+=`<rect x="${bx0}" y="${by}" width="${f1(X(100)-bx0)}" height="${bh}" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<rect x="${f1(X(100))}" y="${by}" width="${f1(X(300)-X(100))}" height="${bh}" style="fill:var(--ics-soft);stroke:var(--line)"/>`;
    s+=`<rect x="${f1(X(300))}" y="${by}" width="${f1(bx1-X(300))}" height="${bh}" style="fill:var(--ics);opacity:.55;stroke:var(--line)"/>`;
    [100,300].forEach(v=>{s+=`<line x1="${f1(X(v))}" y1="${by-3}" x2="${f1(X(v))}" y2="${by+bh+3}" style="stroke:var(--ink);stroke-width:1.6"/><text class="rv-b" x="${f1(X(v))}" y="${by+bh+16}" text-anchor="middle">${v}</text>`});
    s+=`<text class="rv-b" x="${f1((bx0+X(100))/2)}" y="${by+bh+34}" text-anchor="middle">${T.zone[0]}</text><text class="rv-b" x="${f1((X(100)+X(300))/2)}" y="${by+bh+34}" text-anchor="middle">${T.zone[1]}</text><text class="rv-b" x="${f1((X(300)+bx1)/2)}" y="${by+bh+34}" text-anchor="middle">${T.zone[2]}</text>`;
    if(eos!==null){const nx=X(eos);s+=`<path d="M${f1(nx-7)} ${by-8}L${f1(nx+7)} ${by-8}L${f1(nx)} ${by+3}Z" style="fill:var(--ink)"/><line x1="${f1(nx)}" y1="${by}" x2="${f1(nx)}" y2="${by+bh}" style="stroke:var(--ink);stroke-width:2.4"/>`}
    s+='</g>';
    s+=`<text class="rv-b" x="16" y="${H-14}">${T.foot}</text></g>`;
    svg.innerHTML=s;
    setSt(p);$('#rvNote').innerHTML=noteHTML(COPDRV_STEPS[p]);
    rg.setAttribute('aria-valuetext',T.val(COPDRV_STEPS[p]))}
  const stop=playWire(rg,$('#rvPlay'),draw,24000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),COPDRV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const COPDQZ_Q=[
 /* ---- Part 1 ---- */
 [1,`Which post-bronchodilator spirometry finding does GOLD 2023 require for a COPD diagnosis?`,[`FEV1 below 80% predicted`,`FEV1/FVC below 0.7`,`FVC below 70% predicted`,`A rise in FEV1 of 12% after salbutamol`],1,`GOLD 2023: a post-bronchodilator FEV1/FVC below 0.7 is needed, with symptoms and/or exposure to risk factors [[Agusti2023]].`],
 [1,`Roughly how many people aged 30–79 had COPD worldwide in 2019 by the GOLD fixed ratio?`,[`About 39 million`,`About 120 million`,`About 392 million`,`About 1.1 billion`],2,`10.3%, or 391.9 million people; 7.6% (292.0 million) by the LLN [[Adeloye2022]].`],
 [1,`What share of spirometry-defined COPD was undiagnosed across 44 sites in 27 countries?`,[`About 20%`,`About 45%`,`About 60%`,`About 81%`],3,`81.4% undiagnosed, ranging from 50.0% to 98.3% by site [[Lamprecht2015]].`],
 [1,`In GBD 2019, which single risk accounted for the largest share of COPD DALYs?`,[`Ambient particulate matter`,`Smoking`,`Occupational exposures`,`Household biomass smoke`],1,`Smoking 46.0%, ambient PM 20.7%, occupational exposures 15.6% [[Safiri2022]].`],
 [1,`In Lange 2015, about what share of COPD came from a low FEV1 in early adulthood with a normal rate of decline?`,[`About a tenth`,`About a quarter`,`About half`,`Nearly all`],2,`About half had low early FEV1 with a normal decline (27 mL/yr); the other half normal early FEV1 with fast decline (53 mL/yr) [[Lange2015]].`],
 [1,`What happens to FEV1 when a susceptible smoker stops, according to Fletcher and Peto?`,[`Lost function is fully regained`,`Decline continues at the smoker's rate`,`Lost function is not regained, but decline returns to the normal rate`,`FEV1 stops declining altogether`],2,`"Will not recover his lung function, but the average further rates of loss of FEV1 will revert to normal" [[Fletcher1977]].`],
 [1,`Which airways are the main site of obstruction in COPD?`,[`The trachea`,`Main bronchi`,`Small airways under 2 mm`,`Alveolar ducts only`],2,`Small airways under 2 mm; terminal bronchioles are lost before emphysema [[McDonough2011]].`],
 [1,`Which emphysema pattern is associated with alpha-1 antitrypsin deficiency?`,[`Centrilobular`,`Panacinar (panlobular)`,`Paraseptal`,`Bullous only`],1,`Panacinar involves the acinus evenly and is associated with AATD; centrilobular is linked to smoking [[Hogg2004Lancet]].`],
 [1,`What explains the hypoxaemia of advanced COPD in Wagner's inert-gas studies?`,[`Diffusion limitation`,`V/Q mismatch and shunt`,`Low haemoglobin`,`Hypoventilation alone`],1,`V/Q mismatch and shunt explained all of the hypoxaemia, with no diffusion limitation [[Wagner1977]].`],
 [1,`A mean pulmonary artery pressure above 40 mmHg in COPD is found in what share of patients?`,[`Under 5%`,`About 15%`,`About 30%`,`Over 50%`],0,`Severe or "disproportionate" PH over 40 mmHg affects fewer than 5% [[Weitzenblum2009]]; COPD was the sole cause in 1.1% of a catheterised series [[Chaouat2005]].`],
 [1,`The Z allele of SERPINA1 is which amino-acid change?`,[`Arg117His`,`Glu342Lys`,`Phe508del`,`Gly551Asp`],1,`Z = Glu342Lys in SERPINA1; Pi*ZZ carriers may develop lung and liver disease [[Hamesch2019,Stoller2005]].`],
 [1,`What fraction of Z protein does a ZZ homozygote secrete from the liver?`,[`About 15%`,`About 50%`,`About 85%`,`All of it, but inactive`],0,`Only 15% is secreted; 85% accumulates in the endoplasmic reticulum [[Lomas1992]].`],
 [1,`Below what serum level does alpha-1 antitrypsin raise the risk of emphysema?`,[`3 µmol/L`,`11 µmol/L`,`35 µmol/L`,`60 µmol/L`],1,`The protective threshold is 11 µmol/L [[Stoller2005]].`],
 [1,`In RAPID, what did weekly alpha-1 augmentation do?`,[`Improved FEV1 by 200 mL`,`Slowed CT lung density loss at TLC (p=0.03), while the combined primary end point missed (p=0.06)`,`Halved exacerbations`,`Restored lost lung density`],1,`Density loss at TLC −1.45 vs −2.19 g/L/yr (p=0.03); combined end point p=0.06 [[Chapman2015]]. Lost density was never recovered [[McElvaney2017]].`],
 /* ---- Part 2 ---- */
 [2,`A single post-bronchodilator FEV1/FVC is 0.68. What does GOLD 2023 advise?`,[`Diagnose COPD at once`,`Repeat spirometry on a separate occasion`,`Ignore it as normal`,`Order a CT instead`],1,`Ratios between 0.60 and 0.80 should be confirmed by repeat spirometry [[Agusti2023]].`],
 [2,`Post-bronchodilator FEV1 is 42% predicted with an FEV1/FVC of 0.55. Which GOLD grade?`,[`GOLD 1`,`GOLD 2`,`GOLD 3`,`GOLD 4`],2,`GOLD 3 is 30% ≤ FEV1 < 50% predicted [[Lin2025,Agusti2023]].`],
 [2,`At what median age does the LLN of FEV1/FVC fall below 0.70 in healthy men?`,[`32`,`42`,`58`,`70`],1,`42 years for men and 48 for women, so the fixed ratio overdiagnoses older people [[Swanney2008]].`],
 [2,`ATS/ERS 2019: within what volume must the two largest FEV1 values agree (age over 6)?`,[`0.050 L`,`0.150 L`,`0.250 L`,`0.500 L`],1,`Within 0.150 L for both FEV1 and FVC [[Graham2019]].`],
 [2,`Under the 2022 interpretation standard, a positive bronchodilator response is…`,[`≥12% and >200 mL from baseline`,`>10% of the predicted value in FEV1 or FVC`,`Any rise in FEV1`,`>400 mL in FVC only`],1,`The 2021–2022 ERS/ATS standard replaced the 2005 ≥12%/200 mL criterion [[Zhao2025,Stanojevic2022]].`],
 [2,`Someone stops for breath after about 100 metres on level ground. Which mMRC grade fits?`,[`Grade 1`,`Grade 2`,`Grade 3`,`Grade 4`],2,`Grade 3: stops after about 100 m or a few minutes on the level [[Xiong2026]].`],
 [2,`What is the minimum clinically important difference for the CAT?`,[`1 point`,`2 points`,`4 points`,`10 points`],1,`2 points; ROC curves consistently gave −2 [[Kon2014]].`],
 [2,`Under GOLD 2023, one exacerbation that led to hospital admission last year places a person in…`,[`Group A`,`Group B`,`Group E`,`Group D`],2,`Group E: ≥2 moderate exacerbations or ≥1 leading to hospitalisation [[Cheng2023,Agusti2023]]. Group D no longer exists [[Agusti2023]].`],
 [2,`Which blood eosinophil count does GOLD 2023 say identifies a strong likelihood of ICS benefit?`,[`≥50 cells/µL`,`≥100 cells/µL`,`≥300 cells/µL`,`≥1,000 cells/µL`],2,`≥300 cells/µL; below 100, little or no effect [[Agusti2023]].`],
 [2,`In BODE, each 1-point rise carried what hazard ratio for death from any cause?`,[`1.04`,`1.34`,`2.00`,`3.41`],1,`HR 1.34 (1.62 for respiratory death); C statistic 0.74 vs 0.65 for FEV1 [[Celli2004]].`],
 [2,`PRISm means…`,[`FEV1/FVC <0.7 with normal FEV1`,`FEV1/FVC ≥0.7 with FEV1 <80% predicted`,`Emphysema on CT with normal spirometry`,`A positive bronchodilator test`],1,`Preserved ratio impaired spirometry; prevalence 7.1–20.3% [[Agusti2023]].`],
 [2,`Among people aged 65+ with a GP diagnosis of COPD, how many had unrecognised heart failure?`,[`About 2%`,`About 8%`,`About 20%`,`About 50%`],2,`20.5% (83 of 405) [[Rutten2005]].`],
 [2,`What does the USPSTF recommend about screening adults without symptoms for COPD?`,[`Annual spirometry from 40`,`Screening only for smokers`,`Against screening (grade D)`,`Peak flow at every visit`],2,`Grade D, with moderate certainty of no net benefit [[USPSTF2022]].`],
 /* ---- Part 3 ---- */
 [3,`Through which receptor does tiotropium bronchodilate?`,[`β2-adrenergic`,`M3 muscarinic`,`H1 histamine`,`Leukotriene CysLT1`],1,`"Inhibition of M3-receptors at the smooth muscle leading to bronchodilation" (label) [[FDA-SpirivaHandiHaler]].`],
 [3,`What did UPLIFT find for the rate of FEV1 decline with tiotropium?`,[`Halved`,`No significant difference`,`Faster decline`,`Reversed to a gain`],1,`No difference in rate of decline after day 30, though FEV1 stayed higher throughout [[Tashkin2008D]].`],
 [3,`In POET-COPD, tiotropium versus salmeterol for time to first exacerbation gave…`,[`HR 0.83`,`HR 1.00`,`HR 1.25`,`HR 0.50`],0,`145 to 187 days; HR 0.83 [[Vogelmeier2011]].`],
 [3,`FLAME compared LABA+LAMA with LABA+ICS. Pneumonia occurred in…`,[`3.2% vs 4.8%`,`10% vs 5%`,`Equal rates`,`0% vs 12%`],0,`3.2% with indacaterol–glycopyrronium vs 4.8% with salmeterol–fluticasone; exacerbation rate ratio 0.89 [[Wedzicha2016]].`],
 [3,`TORCH's primary mortality result for salmeterol–fluticasone versus placebo was…`,[`HR 0.825, P=0.052`,`HR 0.50, P<0.001`,`HR 1.20, P=0.01`,`Not measured`],0,`It missed significance [[Calverley2007]].`],
 [3,`In IMPACT, the moderate-or-severe exacerbation rate ratio for triple versus UMEC/VI was…`,[`0.75`,`0.95`,`1.10`,`0.40`],0,`0.75 (95% CI 0.70 to 0.81) [[Lipson2018]].`],
 [3,`Which statement matches GOLD 2023 on LABA + ICS?`,[`Preferred first line`,`No longer encouraged; triple is preferred if an ICS is indicated`,`Recommended for everyone in group A`,`Only for current smokers`],1,`[[Agusti2023]].`],
 [3,`Which of these is NOT a bronchodilator, according to its label?`,[`Tiotropium`,`Roflumilast`,`Salmeterol`,`Albuterol`],1,`The Daliresp label: roflumilast "is not a bronchodilator" [[FDA-Daliresp]].`],
 [3,`In whom did daily azithromycin show no reduction in exacerbations?`,[`Former smokers`,`Current smokers`,`People over 65`,`GOLD 2 patients`],1,`HR 0.99 in current smokers [[Han2014]].`],
 [3,`Dupilumab is labelled for COPD in adults with…`,[`Any COPD`,`An eosinophilic phenotype, as add-on maintenance`,`Alpha-1 antitrypsin deficiency`,`Acute exacerbations only`],1,`Add-on maintenance for inadequately controlled COPD with an eosinophilic phenotype [[FDA-Dupixent]]; BOREAS rate ratio 0.70 [[Bhatt2023]].`],
 [3,`Ensifentrine inhibits which enzymes?`,[`PDE4 only`,`PDE3 and PDE4`,`PDE5`,`COX-1 and COX-2`],1,`A dual PDE3/PDE4 inhibitor, given by nebuliser [[FDA-Ohtuvayre]].`],
 [3,`What optimal peak inspiratory flow is usually cited for dry powder inhalers?`,[`At least 15 L/min`,`At least 30 L/min`,`At least 60 L/min`,`At least 120 L/min`],2,`≥60 L/min [[Mahler2017]].`],
 [3,`In the Lung Health Study, sustained quitters lost FEV1 at about what rate after the first year?`,[`8 mL/yr`,`31 mL/yr`,`62 mL/yr`,`120 mL/yr`],1,`31 ± 48 vs 62 ± 55 mL/yr in continuing smokers [[Scanlon2000]].`],
 [3,`EAGLES tested varenicline's neuropsychiatric safety. What did it find?`,[`A large excess of suicide`,`No significant excess versus placebo in either cohort`,`More events than nicotine patch in everyone`,`It was stopped early`],1,`None of the varenicline–placebo risk differences was significant [[Anthenelli2016]].`],
 [3,`Pulmonary rehabilitation in stable COPD improved 6-minute walk distance by about…`,[`5 m`,`44 m`,`150 m`,`300 m`],1,`43.93 m (95% CI 32.64–55.21) [[McCarthy2015]].`],
 [3,`Which resting value meets the ATS 2020 threshold for long-term oxygen on its own?`,[`SpO2 92%`,`PaO2 62 mm Hg`,`PaO2 ≤55 mm Hg or SpO2 ≤88%`,`SpO2 94% on exertion`],2,`[[Jacobs2020]].`],
 [3,`In NOTT, mortality on 12-hour nocturnal oxygen compared with continuous oxygen was…`,[`The same`,`1.94 times higher`,`Halved`,`Ten times higher`],1,`1.94 times (P=0.01) [[NOTT1980]].`],
 [3,`What did REDOX find comparing 24 and 15 hours a day of oxygen?`,[`24 h halved deaths`,`No difference in hospitalisation or death at 1 year`,`15 h was harmful`,`It was not completed`],1,`HR 0.99 (124.7 vs 124.5 events per 100 person-years) [[Ekstrom2024]].`],
 /* ---- Part 4 ---- */
 [4,`Over how many days do symptoms worsen in the Rome definition of an exacerbation?`,[`≤3`,`≤7`,`≤14`,`≤30`],2,`≤14 days [[Agusti2023,Celli2022]].`],
 [4,`Which finding defines a Rome "severe" exacerbation?`,[`CRP ≥10 mg/L`,`Heart rate ≥95`,`PaCO2 >45 mmHg with pH <7.35`,`SpO2 below 92%`],2,`Hypercapnia with acidosis on the blood gas [[Celli2022,Lee2023]].`],
 [4,`What is the single best predictor of future exacerbations in ECLIPSE?`,[`FEV1`,`Age`,`A history of exacerbations`,`Blood eosinophils`],2,`[[Hurst2010]].`],
 [4,`Which virus family was most often found in viral exacerbations in a London cohort?`,[`Influenza`,`Rhinoviruses`,`RSV`,`Coronaviruses`],1,`58.2% of the viruses were rhinoviruses [[Seemungal2001]].`],
 [4,`Pulmonary embolism was found in what share of unexplained exacerbations?`,[`About 2%`,`About 16%`,`About 40%`,`About 70%`],1,`16.1% pooled [[Aleva2017]].`],
 [4,`GOLD 2023's recommended systemic steroid course for an exacerbation is…`,[`Prednisone 40 mg for 5 days`,`Prednisone 60 mg for 14 days`,`IV methylprednisolone for 10 days`,`No steroid`],0,`"40 mg prednisone-equivalent per day for 5 days"; oral is "equally effective" to IV [[Agusti2023]].`],
 [4,`Which three features make up the Anthonisen criteria?`,[`Fever, cough, chest pain`,`More dyspnoea, more sputum volume, more purulence`,`Wheeze, tachycardia, hypoxaemia`,`CRP, eosinophils, procalcitonin`],1,`[[Anthonisen1987]].`],
 [4,`In the Tasmanian paramedic trial, titrated oxygen versus high flow…`,[`Lowered mortality (RR 0.42)`,`Raised mortality`,`Made no difference`,`Was not tolerated`],0,`9% vs 4% mortality; 9% vs 2% in confirmed COPD [[Austin2010]].`],
 [4,`Before blood gases in COPD, which delivery does BTS 2017 list?`,[`15 L/min by non-rebreather`,`24% Venturi at 2–3 L/min or 28% at 4 L/min`,`60% Venturi`,`No oxygen until gases return`],1,`Or nasal cannulae at 1–2 L/min, aiming for 88–92% [[ODriscoll2017Summary]].`],
 [4,`What does BTS 2017 say about oxygen-induced hypercapnia?`,[`Stop oxygen at once`,`Step oxygen down to the lowest level keeping 88–92%`,`Increase oxygen`,`Switch to a non-rebreather`],1,`Sudden cessation "can cause life-threatening rebound hypoxaemia" [[ODriscoll2017Summary]].`],
 [4,`The 2017 Cochrane review of NIV in hypercapnic failure gave an NNT to prevent one death of…`,[`5`,`12`,`50`,`100`],1,`NNT 12 for death and 5 for intubation [[Osadnik2017]].`],
 [4,`Which DECAF item is scored at pH <7.30?`,[`Dyspnoea`,`Eosinopenia`,`Acidaemia`,`Fibrillation`],2,`Acidaemia at pH <7.30 scores 1 [[Echevarria2016]].`],
 [4,`In chronic respiratory acidosis, bicarbonate rises by about how much per 10 mmHg PaCO2?`,[`0.5 mEq/L`,`1 mEq/L`,`3.5 mEq/L`,`10 mEq/L`],2,`Acute about 1; chronic about 3.5 [[Sood2010]].`],
 /* ---- Part 5 ---- */
 [5,`Self-management with a written action plan reduced respiratory admissions with an NNT (high baseline risk) of…`,[`3`,`12`,`50`,`200`],1,`OR 0.69; NNT 12 at high and 17 at low baseline risk [[Lenferink2017]].`],
 [5,`How does pursed-lip breathing ease breathlessness?`,[`It shortens expiration`,`It lengthens expiration and lowers end-expiratory volume`,`It raises PaCO2`,`It relaxes the diaphragm completely`],1,`End-expiratory volume −0.33 L, tidal volume +0.65 L [[Bianchi2004]].`],
 [5,`A hypoxic challenge test shows SpO2 83%. What does the BTS 2022 statement say?`,[`In-flight oxygen not required`,`In-flight oxygen recommended`,`Flying forbidden`,`Repeat at 21% oxygen`],1,`SpO2 <85% or PaO2 <6.6 kPa means in-flight oxygen is recommended [[Coker2022]].`],
 [5,`When is cardiovascular risk highest after an exacerbation in SUMMIT?`,[`First 30 days`,`Month 6`,`After 2 years`,`It never rises`],0,`HR 3.8 in the first 30 days; 9.9 after a hospitalised one [[Kunisaki2018]].`],
 [5,`In BLOCK COPD, metoprolol given without a cardiac indication…`,[`Halved exacerbations`,`Increased exacerbations needing admission`,`Improved FEV1`,`Lowered mortality`],1,`HR 1.91 for hospitalised exacerbations; stopped early [[Dransfield2019]].`],
 [5,`USPSTF 2021 lung cancer screening starts at what age and pack-year history?`,[`40 and 10`,`50 and 20`,`55 and 30`,`65 and 40`],1,`Ages 50–80, 20 pack-years, smoking or quit within 15 years [[Krist2021]].`],
 [5,`NEWS2 scale 2 uses which saturation target?`,[`94–98%`,`88–92%`,`85–89%`,`92–96%`],1,`For hypercapnic respiratory failure [[Echevarria2019]].`],
 [5,`In NETT, lung volume reduction surgery lowered mortality in…`,[`Everyone`,`Upper-lobe emphysema with low exercise capacity`,`Non-upper-lobe emphysema with high exercise capacity`,`No subgroup`],1,`Risk ratio 0.47; non-upper-lobe high-capacity patients did worse (2.06) [[Fishman2003]].`],
 [5,`Endobronchial valves work only when the target lobe has…`,[`Collateral ventilation`,`Little or no collateral ventilation`,`Bronchiectasis`,`Normal lung density`],1,`Collateral ventilation "prevents lobar atelectasis" [[Davey2015]]; Zephyr is labelled for regions with "little to no collateral ventilation" [[FDA-Zephyr]].`],
 [5,`Which biologic did not significantly lower exacerbations at any dose in its two COPD trials?`,[`Dupilumab (BOREAS)`,`Benralizumab (GALATHEA, TERRANOVA)`,`Mepolizumab (MATINEE)`,`Ensifentrine (ENHANCE)`],1,`Benralizumab did not significantly lower exacerbations at any dose [[Criner2019H]].`],
 /* ---- Part 6 ---- */
 [6,`Who invented the spirometer and coined "vital capacity"?`,[`René Laennec`,`John Hutchinson`,`Robert Tiffeneau`,`Edward Gaensler`],1,`Hutchinson published his method in 1846 [[Hutchinson1846,Petty2002]].`],
 [6,`In what year did Laurell and Eriksson describe alpha-1 antitrypsin deficiency?`,[`1946`,`1963`,`1977`,`2001`],1,`1963, from the missing α1-globulin band [[Laurell1963,Perciaccante2018]].`],
 [6,`Which 1964 experiment helped found the protease–antiprotease theory?`,[`Papain instilled into animal lungs`,`Smoke-exposed dogs`,`Bleomycin in mice`,`Tobacco extract in cell culture`],0,`Gross produced emphysema with papain [[Petty2006]].`],
 [6,`The 1962 ATS clinical definition of chronic bronchitis required cough for at least…`,[`1 month in 1 year`,`3 months in at least 2 years`,`6 months in 1 year`,`12 months in 3 years`],1,`[[Petty2006]].`],
 [6,`When was GOLD launched by the WHO and NHLBI?`,[`1959`,`1980`,`2001`,`2017`],2,`[[Pauwels2001,Petty2006]].`],
 [6,`Among male British doctors, quitting at 30 gained about how many years of life expectancy?`,[`1`,`3`,`6`,`10`],3,`About 10 years; 3 at 60 [[Doll2004]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(COPDRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=COPDQZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${COPDRV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='%t:quiz.letters%'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'%t:quiz.correct%':'%t:quiz.wrong%'}</b> %t:quiz.answer_is{l:ansL}% ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'%t:quiz.next%':'%t:quiz.results%'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const COPDGL_T=[
 ["6-minute walk test (6MWD)",`A field walking test of how far someone walks in six minutes; the ERS/ATS standard advises two tests [[Holland2014]]. A fall of more than 30 m carried a hazard ratio of 1.93 for death in ECLIPSE [[Polkey2013]].`,"assessment"],
 ["ABE tool",`The GOLD 2023 assessment that replaced ABCD: groups A and B by symptoms, and group E (for exacerbations) merging the old C and D [[Agusti2023]].`,"assessment"],
 ["Acidaemia (respiratory acidosis)",`A blood pH below 7.35 from a raised PaCO2; normal pH is 7.35–7.45 [[Samuel2023]]. With hypercapnia it defines a Rome "severe" exacerbation [[Celli2022]].`,"bloodgas"],
 ["Action plan (written)",`A written plan for what to do when symptoms worsen. Within self-management it improved SGRQ by 2.69 points and cut respiratory admissions (OR 0.69) [[Lenferink2017]].`,"living"],
 ["Advance care planning",`Structured talks about future care. One nurse-led session improved end-of-life communication without raising distress [[Houben2019]].`,"living"],
 ["Air trapping",`Air left in the lungs at the end of breathing out because small airways close and empty slowly; it underlies hyperinflation [[Barnes2015,Hogg2004Lancet]].`,"breathless"],
 ["Alpha-1 antitrypsin (AAT)",`A protein made mainly in the liver whose main job is to protect the lung against neutrophil elastase [[Stoller2005]].`,"aatd"],
 ["Alpha-1 antitrypsin deficiency (AATD)",`An inherited, autosomal co-dominant shortage of AAT that causes early emphysema and liver disease [[FDA-ProlastinC,Stoller2005]]; about 1 in 2,000–5,000 people [[Stoller2005]].`,"aatd"],
 ["Alveoli",`The air sacs where gas exchange happens; their walls are destroyed in emphysema [[Agusti2023,Hogg2004Lancet]].`,"lungs"],
 ["Ambulatory oxygen",`Oxygen used while moving about; ATS 2020 suggests it for severe exertional hypoxaemia, defined as SpO2 ≤88% on exertion [[Jacobs2020]].`,"oxygen"],
 ["Anthonisen criteria",`Increased dyspnoea, sputum volume and sputum purulence; antibiotic success was 68% vs 55% with placebo in the 1987 trial [[Anthonisen1987]].`,"hospital"],
 ["Antimuscarinic (anticholinergic)",`A drug that blocks muscarinic receptors; tiotropium bronchodilates by inhibiting M3 receptors on airway smooth muscle (label) [[FDA-SpirivaHandiHaler]].`,"inhalers"],
 ["Arterial blood gas (ABG)",`A sample of arterial blood measuring pH, PaO2, PaCO2 and bicarbonate. Rome adds it in hospital to decide on ventilatory support [[Agusti2023,Celli2022]].`,"bloodgas"],
 ["Asthma–COPD overlap",`Features of both conditions; pooled prevalence 27% among people with COPD in population studies [[Alshabanat2015]]. GOLD says COPD with asthma should be treated as asthma [[Agusti2023]].`,"lookalikes"],
 ["Augmentation therapy",`Weekly intravenous plasma-derived AAT, 60 mg/kg by label [[FDA-ProlastinC]]. In RAPID it slowed CT lung density loss at TLC (p=0.03) [[Chapman2015]].`,"aatd"],
 ["Azithromycin (long-term)",`A macrolide antibiotic given at 250 mg daily in trials; time to first exacerbation 266 vs 174 days, with more hearing decrements [[Albert2011]].`,"escalation"],
 ["Base excess",`A blood-gas measure of the metabolic component; −2 to +2 mmol/L is normal [[Samuel2023]].`,"bloodgas"],
 ["Benralizumab",`An IL-5 receptor-α antibody that did not significantly lower exacerbations in GALATHEA or TERRANOVA [[Criner2019H]].`,"frontier"],
 ["Beta-blocker (cardioselective)",`A heart drug blocking β1 receptors. GOLD 2023 supports it when there is a clear cardiovascular indication [[Agusti2023]]; without one, metoprolol increased hospitalised exacerbations [[Dransfield2019]].`,"comorbid"],
 ["Bicarbonate (HCO3⁻)",`The blood buffer that rises to compensate for a high PaCO2: about 1 mEq/L per 10 mmHg acutely and 3.5 chronically [[Sood2010]].`,"bloodgas"],
 ["Biomass smoke",`Smoke from burning wood, crop waste, dung or coal indoors; about 3 billion people are exposed [[Salvi2009]]. Solid fuel use: OR 2.80 for COPD [[Kurmi2010]].`,"causes"],
 ["Blood eosinophil count",`A blood test used to judge the likely benefit of an inhaled steroid: <100 cells/µL little or no effect, ≥300 strong likelihood [[Agusti2023]].`,"assessment"],
 ["BODE index",`Body-mass index, airflow Obstruction, Dyspnoea and Exercise capacity, a 0–10 score; each point HR 1.34 for death [[Celli2004]].`,"assessment"],
 ["BOLD study",`Burden of Obstructive Lung Disease, a population spirometry study; GOLD stage II+ COPD in 10.1% of 9,425 adults aged 40+ [[Buist2007]].`,"what"],
 ["BOREAS and NOTUS",`Phase 3 trials of dupilumab in COPD with eosinophils ≥300/µL on triple therapy; exacerbation rate ratios 0.70 and 0.66 [[Bhatt2023,Bhatt2024]].`,"escalation"],
 ["Bronchiectasis",`Permanently widened bronchi. 57.2% of 201 people with moderate-to-severe COPD had it on HRCT, with higher mortality (HR 2.54) [[MartinezGarcia2013]].`,"lookalikes"],
 ["Bronchiolitis (obstructive)",`Inflammation and narrowing of the small airways, one of the two lesions of COPD with emphysema [[Barnes2015,Agusti2023]].`,"lungs"],
 ["Bronchodilator",`A medicine that relaxes airway smooth muscle; SABA with or without SAMA are the initial bronchodilators in a flare-up [[Agusti2023]].`,"inhalers"],
 ["Bronchodilator responsiveness",`The rise in FEV1 or FVC after a bronchodilator; since 2022, positive means >10% of the predicted value [[Zhao2025,Stanojevic2022]]. It varies between tests [[Albert2012]].`,"spirometry"],
 ["Bullectomy",`Removal of a large bulla; GOLD 2023 lists it as an option for a large bulla [[Agusti2023]].`,"advanced"],
 ["CAT (COPD Assessment Test)",`Eight items scored 0–5, total 0–40, higher is worse [[Minov2015,Jones2011]]; MCID 2 points [[Kon2014]].`,"assessment"],
 ["CD8+ T cell",`A cytotoxic lymphocyte raised in the peripheral airways of smokers with COPD compared with smokers without it [[Saetta1998]].`,"lungs"],
 ["Centrilobular emphysema",`Emphysema starting around the respiratory bronchioles, most closely linked to smoking [[Hogg2004Lancet,Hogg2009]].`,"lungs"],
 ["Chronic bronchitis",`Mucus overproduction and hypersecretion by goblet cells [[Kim2013]]; clinically, chronic cough for at least three months in at least two years (ATS 1962) [[Petty2006]].`,"lungs"],
 ["Chronic hypercapnia",`A long-standing raised PaCO2. ATS 2020 uses resting PaCO2 >45 mm Hg outside an exacerbation for chronic hypercapnic COPD [[Macrea2020]].`,"oxygen"],
 ["Collateral ventilation",`Airflow between lobes that bypasses the bronchi; it "prevents lobar atelectasis" and blocks valve benefit [[Davey2015]].`,"advanced"],
 ["Comorbidome / COTE index",`The pattern of conditions that predict death in COPD. 12 of 79 comorbidities formed COTE; a score ≥4 roughly doubled death risk [[Divo2012]].`,"comorbid"],
 ["Compliance (lung)",`How easily the lung stretches; emphysema makes it more compliant, so it empties slowly [[Hogg2004Lancet]].`,"breathless"],
 ["Cor pulmonale",`Pulmonary hypertension caused by lung disease that enlarges the right ventricle and may cause right heart failure; COPD is its leading cause [[Weitzenblum2009]].`,"breathless"],
 ["CRP (C-reactive protein)",`A blood marker of inflammation; ≥10 mg/L is one Rome sign [[Jacobson2023,Celli2022]]. Point-of-care CRP cut antibiotic use from 77.4% to 57.0% in PACE [[Butler2019]].`,"flareups"],
 ["Cytisine",`A smoking-cessation medicine that helped more people quit than placebo (RR 1.30) [[LivingstoneBanks2023]].`,"quitting"],
 ["DECAF score",`Dyspnoea (eMRCD), Eosinopenia, Consolidation, Acidaemia, atrial Fibrillation: predicts in-hospital death, AUROC 0.86 [[Steer2012]]; scored 0–6 [[Echevarria2016]].`,"hospital"],
 ["Diffusing capacity (DLCO)",`A test of how well gas crosses from air to blood; low in panlobular and centrilobular emphysema in MESA [[Smith2014]].`,"lookalikes"],
 ["Discharge bundle",`A set of checks before leaving hospital; pooled readmission RR 0.80 [[Ospina2017]]. GOLD advises follow-up within one month [[Agusti2023]].`,"hospital"],
 ["Dry powder inhaler (DPI)",`An inhaler with internal resistance that relies on the person's own breath to break up the powder [[Mahler2017]].`,"technique"],
 ["Dual bronchodilation (LABA + LAMA)",`One long-acting β2-agonist plus one long-acting antimuscarinic; GOLD 2023 recommends it for group B [[Agusti2023]].`,"inhalers"],
 ["Dupilumab",`An IL-4Rα antibody blocking IL-4 and IL-13; labelled 300 mg every 2 weeks as add-on for eosinophilic COPD [[FDA-Dupixent]].`,"escalation"],
 ["Dynamic hyperinflation",`A temporary rise in operating lung volumes during exertion, seen as a fall in inspiratory capacity (mean 0.37 L) [[ODonnell2006,ODonnell2001]].`,"breathless"],
 ["Dyspnoea",`The sensation of breathlessness; the most prominent and distressing symptom of COPD [[ODonnell2006]], with several distinct qualities [[Parshall2012]].`,"breathless"],
 ["Early COPD",`GOLD 2023 term only for the biological first steps of disease studied experimentally [[Agusti2023]].`,"lookalikes"],
 ["E-cigarette",`A device delivering nicotine vapour; it raised quit rates versus NRT (RR 1.59) in the Cochrane living review [[Lindson2024]]. Considered unsafe with home oxygen [[Cooper2015]].`,"quitting"],
 ["Emphysema",`Enlarged airspaces with loss of alveolar walls (ATS 1962, anatomical definition) [[Petty2006]].`,"lungs"],
 ["Endobronchial valve",`A one-way valve placed by bronchoscope to collapse a hyperinflated lobe; Zephyr was FDA-approved on 29 June 2018 [[FDA-Zephyr,Davey2015]].`,"advanced"],
 ["Ensifentrine",`A nebulised dual PDE3/PDE4 inhibitor (Ohtuvayre), FDA-approved 26 June 2024 [[FDA-Ohtuvayre]].`,"escalation"],
 ["Eosinophilic exacerbation",`A flare-up with sputum eosinophilia, 28% of exacerbations in one cohort; blood eosinophil percentage identified it (AUROC 0.85) [[Bafadhel2011]].`,"flareups"],
 ["Exacerbation (ECOPD, flare-up)",`Dyspnoea and/or cough and sputum that worsen over ≤14 days (Rome definition, GOLD 2023) [[Agusti2023,Celli2022]].`,"flareups"],
 ["Expiratory flow limitation",`Flow out that cannot rise however hard the person pushes; called the pathophysiological hallmark of COPD [[ODonnell2006]].`,"breathless"],
 ["Fazirsiran",`An RNAi drug that silences Z-AAT in the liver; liver Z-AAT fell a median 83% (Early evidence) [[Strnad2022Fazirsiran]].`,"frontier"],
 ["FEV1",`Forced expiratory volume in one second; it sets GOLD grades 1–4 once the ratio is <0.7 [[Agusti2023]].`,"spirometry"],
 ["FEV1/FVC ratio",`The share of the forced vital capacity blown out in the first second; post-bronchodilator <0.7 confirms obstruction for GOLD [[Agusti2023]].`,"spirometry"],
 ["Fixed ratio",`The 0.70 cut-off for FEV1/FVC that GOLD prefers for simplicity; it may overdiagnose older adults [[Agusti2023,Swanney2008]].`,"spirometry"],
 ["Frailty",`A state of reduced reserve; 19% of people with COPD are frail and 56% pre-frail [[Marengoni2018]].`,"comorbid"],
 ["Frequent exacerbator",`Two or more exacerbations a year; 22% of GOLD 2 and 47% of GOLD 4 in ECLIPSE [[Hurst2010]].`,"flareups"],
 ["FVC",`Forced vital capacity: the total volume blown out after a full breath in. An FVC manoeuvre has four phases [[Graham2019]].`,"spirometry"],
 ["GLI equations",`Global Lung Function Initiative reference equations from 97,759 records [[Quanjer2012]]; GLI Global (2022) is race-neutral [[Bowerman2023]].`,"spirometry"],
 ["GOLD",`The Global Initiative for Chronic Obstructive Lung Disease [[Agusti2023]], launched by the WHO and NHLBI in 2001 [[Pauwels2001,Petty2006]].`,"history"],
 ["GOLD grade",`Severity of airflow obstruction, 1 to 4, from post-bronchodilator FEV1: ≥80, 50–79, 30–49, <30% predicted [[Lin2025,Agusti2023]].`,"spirometry"],
 ["Goblet cell",`A mucus-secreting airway cell; more of them in smokers with chronic bronchitis and airflow limitation [[Saetta2000]].`,"lungs"],
 ["Handheld fan",`A fan directed at the face for 5 minutes reduced breathlessness compared with the legs (P = 0.003) [[Galbraith2010]].`,"living"],
 ["HDAC2",`Histone deacetylase 2; its activity falls with GOLD stage and is linked to steroid resistance [[Ito2005,Barnes2016]].`,"lungs"],
 ["Heart failure",`A frequent look-alike and companion of COPD; 20.5% of older people labelled COPD had it unrecognised [[Rutten2005]].`,"lookalikes"],
 ["Home non-invasive ventilation",`A mask ventilator used at home, usually at night. In HOT-HMV, with oxygen, it lengthened time to readmission or death (HR 0.49) [[Murphy2017]].`,"oxygen"],
 ["Hospital at home",`Treatment of an exacerbation at home by a hospital team; readmissions RR 0.76 versus inpatient care [[Jeppesen2012]].`,"hospital"],
 ["Hypercapnia",`A raised arterial CO2: PaCO2 >6 kPa (45 mmHg) in Rome and BTS; BTS/ICS uses >6.5 kPa to start NIV [[Jacobson2023,Davidson2016Summary]].`,"bloodgas"],
 ["Hyperinflation (static)",`Lungs larger than normal at rest; a low IC/TLC independently predicted death [[Casanova2005]].`,"breathless"],
 ["Hypoxaemia",`Low arterial oxygen; Rome uses PaO2 ≤8 kPa [[Jacobson2023]]. In COPD it comes from V/Q mismatch [[Wagner1977]].`,"bloodgas"],
 ["Hypoxic challenge test (HCT)",`Breathing 15% oxygen to imitate a 2,438 m cabin; SpO2 <85% or PaO2 <6.6 kPa means in-flight oxygen is recommended [[Coker2022]].`,"living"],
 ["ICS (inhaled corticosteroid)",`An inhaled steroid such as fluticasone or budesonide; it raised serious pneumonia (fluticasone OR 1.78) [[Kew2014]].`,"escalation"],
 ["ICS withdrawal (de-escalation)",`Stepping an inhaled steroid down; ERS 2020 conditionally recommends it without frequent exacerbations, and not at eosinophils ≥300/µL [[Chalmers2020]].`,"escalation"],
 ["IL-33",`An epithelial alarmin; IL33 gene variants are linked to COPD risk [[Rabe2021]]. Antibodies include itepekimab and tozorakimab [[Rabe2021,Sciurba2026]].`,"frontier"],
 ["IMPACT trial",`10,355 patients: single-inhaler triple therapy versus FF/VI or UMEC/VI; exacerbation rate ratios 0.85 and 0.75 [[Lipson2018]].`,"escalation"],
 ["Inspiratory capacity (IC)",`The largest breath in from the end of a normal breath out; it falls during exercise in dynamic hyperinflation [[ODonnell2001,Diaz2000]].`,"breathless"],
 ["Isoelectric focusing (phenotyping)",`A lab method separating AAT variants, kept for confirmation after level and genotyping [[Miravitlles2010]].`,"aatd"],
 ["LABA",`Long-acting β2-agonist such as salmeterol, formoterol or vilanterol; versus placebo, fewer hospitalised exacerbations (OR 0.73) [[Kew2013]].`,"inhalers"],
 ["LAMA",`Long-acting muscarinic antagonist such as tiotropium; versus placebo, exacerbations OR 0.78 [[Karner2014]].`,"inhalers"],
 ["Lower limit of normal (LLN)",`The bottom 5% of a healthy reference population; it depends on the reference equation chosen [[Agusti2023,Bhakta2023]].`,"spirometry"],
 ["Long-term oxygen therapy (LTOT)",`Oxygen for at least 15 h/day in severe chronic resting hypoxaemia (ATS 2020, strong recommendation) [[Jacobs2020]].`,"oxygen"],
 ["LOTT",`The Long-Term Oxygen Treatment Trial: no benefit for moderate desaturation (HR 0.94) [[Albert2016]].`,"oxygen"],
 ["Lung cancer screening",`Annual low-dose CT; NLST cut lung-cancer deaths by 20.0% [[Aberle2011]]. USPSTF 2021: ages 50–80, 20 pack-years [[Krist2021]].`,"comorbid"],
 ["Lung Health Study",`A trial in 5,887 smokers with early COPD; quitting halved FEV1 decline and lowered mortality over 14.5 years [[Anthonisen1994,Scanlon2000,Anthonisen2005]].`,"quitting"],
 ["Lung transplantation",`Replacing one or both lungs; median survival 5.0 years in COPD, longer after bilateral (6.41 vs 4.59) [[Thabut2008]].`,"advanced"],
 ["Lung volume reduction surgery (LVRS)",`Removing the most damaged lung; in NETT it lowered mortality in upper-lobe emphysema with low exercise capacity (RR 0.47) [[Fishman2003]].`,"advanced"],
 ["Macrophage elastase",`An enzyme that smoke-induced emphysema needs in mice; knockout mice did not develop emphysema [[Hautamaki1997]].`,"lungs"],
 ["Mepolizumab",`An IL-5 antibody, labelled 100 mg every 4 weeks for eosinophilic COPD [[FDA-Nucala]]; MATINEE rate ratio 0.79 [[Sciurba2025]].`,"escalation"],
 ["Metered-dose inhaler (pMDI)",`A pressurised canister that needs priming; commonest errors are coordination (45%) and no breath-hold (46%) [[FDA-Breztri,Sanchis2016]].`,"technique"],
 ["mMRC dyspnoea scale",`A 0–4 self-rating of breathlessness during activity; GOLD uses ≥2 as "more symptomatic" [[Xiong2026,Han2013]].`,"assessment"],
 ["Mucus plug",`A mucus cast blocking an airway on CT; plugs in ≥3 segments carried an adjusted HR for death of 1.24 [[Diaz2023]].`,"lungs"],
 ["NETT",`The National Emphysema Treatment Trial of LVRS in 1,218 people; no overall survival benefit at first [[Fishman2003]], a 5-year risk ratio of 0.86 later [[Naunheim2006]].`,"advanced"],
 ["Neutrophil elastase",`A protease from neutrophils that digests lung elastin; alpha-1 antitrypsin is its main inhibitor in the lower airways [[FDA-ProlastinC,Stoller2005]].`,"aatd"],
 ["NEWS2 scale 2",`The early-warning oxygen scale targeting 88–92% for hypercapnic respiratory failure [[Echevarria2019]].`,"nursing"],
 ["Nicotine replacement therapy (NRT)",`Nicotine by patch, gum, lozenge, inhalator or spray; raises quitting by 50% to 60% [[HartmannBoyce2018]].`,"quitting"],
 ["Non-invasive ventilation (NIV)",`Breathing support by mask; in acute hypercapnic failure NNT 12 for death and 5 for intubation [[Osadnik2017]].`,"hospital"],
 ["NOTT",`The 1980 Nocturnal Oxygen Therapy Trial: mortality 1.94 times higher with 12-hour nocturnal than continuous oxygen [[NOTT1980]].`,"oxygen"],
 ["Occult hypoxaemia",`SaO2 <88% while the oximeter reads 92–96%; more common in Black, Asian and Hispanic patients [[Fawzy2022]].`,"nursing"],
 ["Opioids for breathlessness",`Low-quality evidence of benefit from oral or parenteral opioids [[Barnes2016F]]; BEAMS found no benefit at 8 or 16 mg/day morphine [[Ekstrom2022]].`,"advanced"],
 ["Osteoporosis",`Thin, fragile bone; 9–69% of people with COPD [[GraatVerboom2009]]. Recurrent systemic steroids raise the risk [[Agusti2023]].`,"comorbid"],
 ["Overlap syndrome",`COPD plus obstructive sleep apnoea; without CPAP, mortality RR 1.79 [[Marin2010]].`,"comorbid"],
 ["Oxygen alert card",`A card for people with previous hypercapnic failure; initial oxygen follows it until blood gases are known [[ODriscoll2017Summary]].`,"nursing"],
 ["Pack-year",`A measure of lifetime tobacco exposure. GOLD 2023 names more than 20 pack-years among the risk factors for case-finding spirometry [[Agusti2023]].`,"causes"],
 ["Palliative care",`Care focused on symptoms and choices; GOLD 2023 says all with advanced COPD should be considered for it [[Agusti2023]].`,"advanced"],
 ["Panlobular (panacinar) emphysema",`Emphysema involving the whole acinus evenly, associated with AATD [[Hogg2004Lancet]].`,"lungs"],
 ["PaCO2",`Arterial carbon dioxide pressure; normal 35–45 mmHg [[Samuel2023]].`,"bloodgas"],
 ["PDE4 inhibitor",`A drug blocking phosphodiesterase 4, which breaks down cyclic AMP; roflumilast is oral [[FDA-Daliresp]].`,"escalation"],
 ["Peak inspiratory flow (PIF)",`The fastest breath in; at least 60 L/min is cited as optimal for DPIs [[Mahler2017]].`,"technique"],
 ["pH",`Blood acidity; normal 7.35–7.45 [[Samuel2023]]. [H⁺] ≈ 80 minus the two digits after the decimal point [[Sood2010]].`,"bloodgas"],
 ["Pneumococcal vaccine",`A vaccine against Streptococcus pneumoniae; in COPD, NNTB 21 for pneumonia and 8 for an exacerbation [[Walters2017]].`,"quitting"],
 ["Pre-COPD",`Symptoms and/or structural or functional changes with FEV1/FVC ≥0.7; no evidence yet on the best treatment [[Agusti2023]].`,"lookalikes"],
 ["PRISm",`Preserved ratio impaired spirometry: FEV1/FVC ≥0.7 with FEV1 <80% predicted [[Agusti2023]]; mortality 29.6 vs 18.0 per 1,000 person-years [[Wan2021]].`,"lookalikes"],
 ["Protease–antiprotease imbalance",`The model in which elastase outweighs its inhibitors and digests the lung [[FDA-ProlastinC]], founded on papain experiments and AATD [[Petty2006]].`,"lungs"],
 ["Pulmonary artery-to-aorta ratio",`A CT ratio above 1 was associated with severe exacerbations (OR 3.44) [[Wells2012]].`,"lookalikes"],
 ["Pulmonary embolism",`A blood clot in the lung arteries; found in 16.1% of unexplained exacerbations [[Aleva2017]].`,"flareups"],
 ["Pulmonary hypertension",`Raised pressure in the lung arteries, usually mild in COPD (mean 20–35 mmHg) [[Weitzenblum2009]].`,"breathless"],
 ["Pulmonary rehabilitation",`Exercise training, education and behaviour change tailored after assessment (ATS/ERS 2013) [[Spruit2013,Rochester2023]].`,"rehab"],
 ["Pulse oximetry (SpO2)",`A finger probe estimate of saturation; it may overestimate oxygen in darker skin tones [[Agusti2023,Fawzy2022]].`,"nursing"],
 ["Pursed-lip breathing",`Breathing out through narrowed lips; it lengthens expiration and lowers end-expiratory volume [[Bianchi2004]].`,"living"],
 ["Reid index",`The thickness of the bronchial mucous gland layer, proposed by Reid in 1960 as a yardstick for chronic bronchitis [[Reid1960,Petty2006]].`,"history"],
 ["Roflumilast",`An oral PDE4 inhibitor labelled for severe COPD with chronic bronchitis and prior exacerbations; not a bronchodilator [[FDA-Daliresp]].`,"escalation"],
 ["Rome proposal",`The 2022 exacerbation definition and point-of-care severity scale adopted by GOLD 2023 [[Celli2022,Agusti2023]].`,"flareups"],
 ["RSV vaccine",`A vaccine against respiratory syncytial virus; ACIP 2024 recommended one dose for all adults ≥75 and at-risk adults 60–74 [[Britton2024]].`,"quitting"],
 ["SABA",`Short-acting β2-agonist such as salbutamol (albuterol), labelled 2 inhalations every 4 to 6 hours [[FDA-VentolinHFA]].`,"inhalers"],
 ["Self-management",`Programmes that teach people to manage their own condition; "unlikely to cause harm" in the 2022 Cochrane review [[Schrijver2022]].`,"living"],
 ["SERPINA1",`The gene for alpha-1 antitrypsin, on chromosome 14q32.1 [[WHO1997]].`,"aatd"],
 ["SGRQ",`St George's Respiratory Questionnaire of health status; a 4-point change is the minimal important difference [[McCarthy2015]].`,"rehab"],
 ["Small airways",`Airways under 2 mm across, the main site of obstruction in COPD [[McDonough2011]].`,"lungs"],
 ["Soft mist inhaler",`An inhaler such as Respimat that makes a slow aerosol cloud; needs priming before first use (label) [[FDA-SpirivaRespimat]].`,"technique"],
 ["Spacer",`A tube that holds the aerosol from a pMDI; GOLD names MDI "with a spacer device if necessary" for flare-ups [[Agusti2023]].`,"technique"],
 ["Spirometry",`The forced blow test measuring FEV1 and FVC, needed to diagnose COPD [[Agusti2023,Graham2019]].`,"spirometry"],
 ["Systemic corticosteroid",`Oral or IV steroid for a flare-up; reduced treatment failure (OR 0.48) [[Walters2014]].`,"hospital"],
 ["Telerehabilitation",`Pulmonary rehabilitation delivered remotely; little or no difference from centre-based in 6MWD [[Cox2021Cochrane]].`,"rehab"],
 ["Terminal bronchiole",`One of the smallest conducting airways. GOLD 4 lungs had 72–89% fewer, and their loss came before emphysematous destruction [[McDonough2011]].`,"lungs"],
 ["Tezepelumab",`An anti-TSLP antibody; COURSE missed its primary endpoint (rate ratio 0.83) [[Singh2025COURSE]].`,"frontier"],
 ["Tiotropium",`A once-daily LAMA; protection lasted longer than 24 hours in preclinical studies (label) [[FDA-SpirivaHandiHaler]].`,"inhalers"],
 ["Treatable traits",`An approach treating each identified feature or mechanism rather than a label [[Agusti2016]].`,"frontier"],
 ["Triple therapy",`LABA + LAMA + ICS, often in one inhaler; lowered exacerbations versus dual therapy in IMPACT and ETHOS [[Lipson2018,Rabe2020]].`,"escalation"],
 ["TSLP",`Thymic stromal lymphopoietin, an epithelial cytokine at the top of the inflammatory cascade, higher in COPD [[Singh2025COURSE]].`,"frontier"],
 ["Varenicline",`A nicotine receptor partial agonist; beat placebo (RR 2.32), bupropion and single NRT [[LivingstoneBanks2023]].`,"quitting"],
 ["Venturi mask",`A mask that gives more accurate, controlled oxygen than nasal prongs [[Agusti2023]]; BTS 2017 lists 24% at 2–3 L/min or 28% at 4 L/min in COPD [[ODriscoll2017Summary]].`,"bloodgas"],
 ["V/Q mismatch",`An uneven match of ventilation and blood flow in lung units, the cause of hypoxaemia in COPD [[Wagner1977,RodriguezRoisin2009]].`,"breathless"],
 ["Vital capacity",`The volume exhaled from fully inflated lungs, named by Hutchinson as "the capacity to live" [[Hutchinson1846,Petty2002]].`,"history"],
 ["Young COPD",`GOLD 2023 term for COPD in people aged 20–50 [[Agusti2023]].`,"what"],
 ["Z allele (PI*Z)",`The commonest severe AAT variant, Glu342Lys; most severe deficiency is PI type ZZ [[Hamesch2019,WHO1997]].`,"aatd"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'fev 1' or 'fev1' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  function render(){const q=norm(inp.value.trim());const L=COPDGL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:COPDGL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
/* area names as in sources.config.json */
const COPDSR_AREAN={A:'Epidemiology, risk factors & history',B:'Mechanism, pathology & alpha-1 antitrypsin deficiency',C:'Diagnosis & assessment',D:'Medicines for stable COPD & inhalers',E:'Exacerbations & hospital care',F:'Smoking cessation, vaccines, rehabilitation, oxygen & advanced therapies',G:'Living with COPD, comorbidities & nursing care',H:'Research frontier'};
const COPDSR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const copdsrSvc=s=>s.unverified?[]:COPDSR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const copdsrLink=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(COPDSR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(used.map(a=>[a,COPDSR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>copdsrSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=COPDSR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=copdsrSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=copdsrLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${COPDSR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
