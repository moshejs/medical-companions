/* =============== 5.2 flashcards & memory aids =============== */
/* part names come from GROUPS in 01-config.js. Every fact comes from research passes A-I; trial figures are population averages. */
const RV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const RV_FC=[
 /* ---- Part 1: what, measuring, causes, appetite, adipose, adaptation ---- */
 [1,`How does the 2025 Lancet Commission define obesity?`,`"A condition characterised by excess adiposity, with or without abnormal distribution or function of adipose tissue", with causes that are multifactorial and still incompletely understood [[Rubino2025Commission]].`],
 [1,`What separates clinical from preclinical obesity?`,`Clinical obesity is a chronic, systemic illness in which excess adiposity alters how tissues, organs or the whole person function. Preclinical obesity is excess adiposity with organ function preserved, but with a raised risk of disease [[Rubino2025Commission]].`],
 [1,`How does the Commission say excess adiposity should be confirmed?`,`By direct fat measurement, by BMI plus one anthropometric measure (waist, waist-to-hip or waist-to-height), or by two anthropometric measures. Above BMI 40 it can be assumed [[Rubino2025Commission]].`],
 [1,`What is BMI, and what are the WHO adult classes?`,`Weight in kilograms divided by height in metres squared. 25-29.9 pre-obese (overweight), 30-34.9 class I, 35-39.9 class II, 40 or more class III [[WHO2000TRS894,Flegal1998]].`],
 [1,`How well does a BMI of 30 or more detect excess body fat?`,`Specific but insensitive: sensitivity 0.42 and specificity 0.97 in a meta-analysis of 31,968 people. BMI misses about half of adults with excess body fat [[Okorodudu2010]].`],
 [1,`What did the 2004 WHO consultation add for Asian populations?`,`It kept the international cut-offs but added public health action points at 23.0, 27.5, 32.5 and 37.5 kg/m², because risk rises at lower BMI in many Asian populations [[WHO2004Asian]].`],
 [1,`In England, what BMI gave the same diabetes risk as BMI 30 in White adults?`,`23.9 in south Asian, 26.6 in Arab, 26.9 in Chinese and 28.1 in Black adults, in a cohort of 1.47 million [[Caleyachetty2021Ethnicity]].`],
 [1,`How many people were living with obesity worldwide in 2022?`,`More than 1 billion: 504 million women, 374 million men and 159 million children and adolescents aged 5-19 [[NCDRisC2024]].`],
 [1,`What share of US adults had obesity in 2021-2023?`,`40.3%, with severe obesity (BMI 40 or more) in 9.4% [[Emmerich2024]].`],
 [1,`How heritable is BMI in twin studies?`,`0.47 to 0.90, median 0.75, across 88 twin estimates. Family studies give lower figures, median 0.46 [[Elks2012]]. Heritability is a population statistic, not destiny.`],
 [1,`What does carrying two copies of the FTO risk allele mean?`,`About 3 kg more weight and 1.67-fold odds of obesity [[Frayling2007]]. The effect is about 27% smaller in physically active adults [[Kilpelainen2011]].`],
 [1,`How far apart are the top and bottom deciles of a polygenic score?`,`13.0 kg in adult weight, and a 25-fold gradient in severe obesity, yet only 0.06 kg apart at birth [[Khera2019]].`],
 [1,`What is the commonest single-gene cause of obesity?`,`MC4R deficiency: 29 of 500 people (5.8%) with severe childhood obesity, codominant, with hyperphagia, more lean mass and faster growth [[Farooqi2003MC4R]].`],
 [1,`What did the NIH ultra-processed food trial show?`,`On an ultra-processed diet matched for calories offered, people ate 508 kcal a day more and gained 0.9 kg in 2 weeks; on the unprocessed diet they lost 0.9 kg [[Hall2019UPF]].`],
 [1,`Which two groups of arcuate neurons set hunger and fullness?`,`POMC/CART neurons reduce intake through alpha-MSH acting on MC4R. NPY/AgRP neurons increase it. Leptin excites POMC neurons and quietens NPY input [[Cowley2001]].`],
 [1,`Why is leptin high, not low, in common obesity?`,`Leptin rises with body fat (r = 0.85), so high levels point to leptin resistance [[Considine1996]]. The CSF-to-serum ratio is 4.3-fold lower in obesity [[Caro1996]].`],
 [1,`How much of the insulin response to oral glucose is the incretin effect?`,`72.8% in people without diabetes, but only 36.0% in type 2 diabetes [[Nauck1986]].`],
 [1,`Does weight loss remove fat cells?`,`No. About 10% of adult fat cells are replaced each year, but the total number is set by the end of adolescence and stays constant after weight loss [[Spalding2008]].`],
 [1,`Which fat depot carries more metabolic risk?`,`Visceral fat: odds ratio for metabolic syndrome 4.7 per SD against 3.0 for subcutaneous fat in women [[Fox2007Framingham]]. Liposuction of about 10 kg of subcutaneous fat brought no metabolic benefit [[Klein2004]].`],
 [1,`How does the body respond to holding a 10% lower weight?`,`Total energy expenditure falls by about 6-8 kcal per kg of fat-free mass a day beyond what body-composition change predicts [[Leibel1995]].`],
 [1,`What had happened to appetite hormones one year after diet-induced weight loss?`,`Leptin, PYY and CCK were still low, and ghrelin and hunger still high: the push toward regain had not reverted [[Sumithran2011]].`],
 [1,`Which pushes back harder after weight loss: appetite or metabolism?`,`Appetite. Intake rises by about 100 kcal a day per kg lost, more than three times the fall in energy expenditure [[Polidori2016]].`],

 /* ---- Part 2: complications, diabetes, assessment, stigma ---- */
 [2,`What did the Diabetes Prevention Program show?`,`Over 2.8 years, lifestyle (goals of at least 7% weight loss and 150 minutes of activity a week) cut diabetes incidence by 58%, and metformin by 31%, against placebo [[Knowler2002DPP]].`],
 [2,`In the DPP lifestyle arm, how much did each kilogram lost matter?`,`Each kilogram lost meant 16% lower diabetes risk [[Hamman2006]].`],
 [2,`What were DiRECT's 12-month results?`,`Type 2 diabetes remission in 46% with the weight management programme against 4% with usual care; 86% of those who lost 15 kg or more were in remission [[Lean2018DiRECT]].`],
 [2,`How durable was remission in DiRECT?`,`36% at 2 years [[Lean2019DiRECT]]; at 5 years 13% of the extension group, and 26% of those in remission at year 2, consistent with a chronic, relapsing condition [[Lean2024DiRECT]].`],
 [2,`Did Look AHEAD's intensive lifestyle reduce cardiovascular events?`,`No: HR 0.95 (0.83-1.09). It was stopped for futility at a median 9.6 years, with weight loss of 6.0% against 3.5% [[LookAHEAD2013]].`],
 [2,`What does losing 5 to under 10% of weight improve?`,`In Look AHEAD: HbA1c, blood pressure, triglycerides and HDL cholesterol, but not LDL cholesterol [[Wing2011DiabetesCare]].`],
 [2,`How strongly does weight gain affect sleep apnoea?`,`A 10% weight gain predicted about 6-fold odds of developing moderate-to-severe sleep-disordered breathing [[Peppard2000]].`],
 [2,`How is STOP-Bang scored?`,`One point each for Snoring, Tiredness, Observed apnoea, high blood Pressure, BMI, Age, Neck circumference and male Gender [[Chung2008STOP]]. 0-2 low risk, 5-8 high risk; 3 or more has 93% sensitivity for moderate-to-severe OSA [[Chung2016STOPBang]].`],
 [2,`How many cancers does IARC link to excess body fatness?`,`13, including oesophageal adenocarcinoma, colorectal, liver, kidney, endometrial, postmenopausal breast, meningioma, thyroid and multiple myeloma [[LaubySecretan2016]].`],
 [2,`What is MASLD?`,`Metabolic dysfunction-associated steatotic liver disease, the 2023 name for NAFLD: steatosis plus at least 1 of 5 cardiometabolic risk factors [[Rinella2023MASLD]].`],
 [2,`Which FIB-4 values rule advanced fibrosis out and in?`,`Below 1.3 rules it out; 2.67 or more rules it in (AASLD) [[Rinella2023AASLD]].`],
 [2,`How much knee load does 1 kg of weight loss remove?`,`About 40.6 N of compressive force per step, roughly four units of load for each unit of weight [[Messier2005]].`],
 [2,`How are obesity and depression linked?`,`Both ways: obesity raised the odds of later depression (OR 1.55) and depression raised the odds of later obesity (OR 1.58) [[Luppino2010]].`],
 [2,`What does the Edmonton Obesity Staging System grade?`,`Comorbidity and function, not size, on stages 0-4 [[Sharma2009EOSS]]. Stages 2 and 3 predicted higher mortality (HR 1.57 and 2.69) even after adjusting for BMI [[Padwal2011EOSS]].`],
 [2,`What size should a blood pressure cuff be?`,`Bladder length 75-100% and width 37-50% of arm circumference. A cuff that is too small overestimates blood pressure [[Muntner2019]].`],
 [2,`How does the 2020 consensus define weight stigma?`,`"Social devaluation and denigration of individuals because of their excess body weight". It causes physical and psychological harm and poorer care [[Rubino2020Stigma]].`],
 [2,`How is weight discrimination linked to mortality?`,`About 60% higher: HR 1.57 and 1.59 in two US cohorts, not explained by common risk factors [[Sutin2015]].`],
 [2,`What share would avoid appointments after weight stigma from a doctor?`,`19%, and 21% would seek a new doctor [[Puhl2013Language]].`],

 /* ---- Part 3: lifestyle, glp, medtrials, othermeds, sideeffects, surgery, aftersurgery ---- */
 [3,`How does the AHA/ACC/TOS guideline define a high-intensity lifestyle programme?`,`At least 14 sessions in 6 months, with average losses of about 8 kg in that time; individual results cannot be predicted [[Jensen2014Guideline]].`],
 [3,`What does USPSTF recommend for adults with BMI 30 or more?`,`Offer or refer to intensive, multicomponent behavioural interventions (grade B) [[Curry2018USPSTF]]. The pooled effect was about 2.4 kg more loss than control at 12-18 months [[LeBlanc2018]].`],
 [3,`Low-fat or low-carbohydrate: what did DIETFITS find?`,`-5.3 kg against -6.0 kg at 12 months, not a significant difference; genotype did not predict who did better [[Gardner2018DIETFITS]].`],
 [3,`Does aerobic exercise alone cause much weight loss?`,`About 1.6-1.7 kg [[Thorogood2011]]. Activity matters more for health and for keeping weight off [[Thorogood2011,Jensen2014Guideline]].`],
 [3,`What makes semaglutide last a week?`,`94% sequence homology to GLP-1 with changes that resist breakdown and a fatty-acid chain that binds albumin; the label gives a half-life of about 1 week [[FDA-Wegovy,Lau2015]].`],
 [3,`What was the STEP 1 result?`,`Semaglutide 2.4 mg: -14.9% against -2.4% with placebo at 68 weeks (trial averages) [[Wilding2021STEP1]].`],
 [3,`What was the SURMOUNT-1 result?`,`Tirzepatide 15 mg: -20.9% against -3.1% at 72 weeks; 57% lost at least 20% [[Jastreboff2022SURMOUNT1]].`],
 [3,`What did SURMOUNT-5 compare?`,`Tirzepatide against semaglutide head to head: -20.2% against -13.7% at 72 weeks [[Aronne2025SURMOUNT5]].`],
 [3,`What did SELECT show?`,`Semaglutide cut major cardiovascular events by 20% (HR 0.80) in adults with cardiovascular disease and BMI 27 or more without diabetes [[Lincoff2023SELECT]].`],
 [3,`What happens when GLP-1 treatment stops?`,`In STEP 4 weight rose 6.9% after switching to placebo [[Rubino2021STEP4]]; in the STEP 1 extension two-thirds of the lost weight returned within a year [[Wilding2022STEP1ext]]. This is biology, not failure.`],
 [3,`What is the incretin class boxed warning?`,`Thyroid C-cell tumours in rodents; contraindicated with a personal or family history of medullary thyroid carcinoma or MEN 2 [[FDA-Wegovy]].`],
 [3,`What is Contrave's boxed warning?`,`Suicidal thoughts and behaviours, from its bupropion component [[FDA-Contrave]].`],
 [3,`How does orlistat work, and what did XENDOS show?`,`It blocks gut lipases so some dietary fat is not absorbed [[FDA-Xenical]]. Over 4 years it cut diabetes incidence by 37.3%, confined to people with impaired glucose tolerance [[Torgerson2004XENDOS]].`],
 [3,`Who is setmelanotide for?`,`Obesity from breaks in the leptin-melanocortin pathway: POMC, PCSK1 or LEPR deficiency, Bardet-Biedl syndrome and acquired hypothalamic obesity. It is not for common obesity [[FDA-Imcivree]].`],
 [3,`Is weight loss on GLP-1 drugs just the result of nausea?`,`No. In STEP 1-3, less than 1 percentage point of the extra weight loss was explained by GI adverse events [[Wharton2022GItolerability]].`],
 [3,`How much of the weight lost on tirzepatide was lean mass?`,`About 25% in the SURMOUNT-1 DXA substudy, the same share as with placebo [[Look2025SURMOUNT1DXA]].`],
 [3,`What are the 2022 ASMBS/IFSO surgery thresholds?`,`Recommended at BMI over 35 regardless of comorbidity; considered at 30-34.9 with metabolic disease; offered at over 27.5 in Asian populations [[Eisenberg2022ASMBS]].`],
 [3,`How do sleeve and bypass change gut hormones?`,`The sleeve lowers ghrelin [[Karamanakos2008]]; the bypass raises post-meal GLP-1 and PYY [[leRoux2006]].`],
 [3,`What did the Swedish Obese Subjects (SOS) study find on survival?`,`Adjusted mortality HR 0.71 [[Sjostrom2007SOS]]; 3.0 years more life than usual care, but still 5.5 years less than the general population [[Carlsson2020NEJM]].`],
 [3,`What did STAMPEDE show at 5 years?`,`HbA1c 6% or less in 29% after bypass, 23% after sleeve and 5% with medical therapy [[Schauer2017STAMPEDE]].`],
 [3,`What is the signature late problem of the sleeve?`,`Reflux: endoscopic oesophagitis in 31% after sleeve against 7% after bypass at 10 years [[Salminen2022SLEEVEPASS]].`],
 [3,`What separates early from late dumping?`,`Early dumping is reported in up to 40% and late dumping in up to 25% [[Kim2026Complications]]; late dumping is a glucose nadir below 50 mg/dL [[Scarpellini2020]].`],
 [3,`Why does persistent vomiting after surgery worry the team?`,`It can trigger thiamine (B1) deficiency, which untreated can lead to Wernicke-Korsakoff syndrome [[Lupoli2017]].`],

 /* ---- Part 4: children, pregnancy, living, nursing, frontier ---- */
 [4,`How are child obesity and its severe classes defined?`,`BMI at or above the 95th percentile; class 2 at 120% of the 95th percentile (or BMI 35), class 3 at 140% (or BMI 40) [[Ogden2023,Hampl2023AAP]].`],
 [4,`What does the 2023 AAP guideline say about waiting?`,`No "watchful waiting": treat when obesity is diagnosed, with intensive health behaviour and lifestyle treatment of at least 26 hours over 3-12 months [[Hampl2023AAP,Orr2026]].`],
 [4,`At what ages does the AAP guideline mention medicines and surgery?`,`Offer pharmacotherapy from age 12, and refer for surgery evaluation for severe obesity from age 13, as published [[Hampl2023AAP,Orr2026]].`],
 [4,`What did STEP TEENS show?`,`BMI -16.1% with semaglutide against +0.6% with placebo at 68 weeks [[Weghuber2022STEPTEENS]].`],
 [4,`Does obesity in adolescence persist?`,`About 80% of adolescents with obesity still have it as adults, but 70% of adults with obesity did not have it as children [[Simmonds2016]].`],
 [4,`What did Teen-LABS add on diabetes?`,`Five years after bypass, type 2 diabetes remitted in 86% of adolescents against 53% of adults [[Inge2019NEJM]].`],
 [4,`What total pregnancy weight gain did IOM 2009 publish for BMI 30 or more?`,`5-9 kg, quoted as published, not as a target [[Rasmussen2009IOM]].`],
 [4,`How does pre-eclampsia risk change with BMI?`,`It roughly doubles with each 5-7 kg/m² rise in pre-pregnancy BMI [[OBrien2003]].`],
 [4,`When does the Wegovy label say to stop before a planned pregnancy?`,`At least 2 months before, because of semaglutide's long half-life [[FDA-Wegovy]].`],
 [4,`Why does the Zepbound label mention contraception?`,`Tirzepatide can reduce the effect of oral contraceptives; the label advises a non-oral method, or adding a barrier method for 4 weeks after starting and after each dose increase [[FDA-Zepbound]].`],
 [4,`What does the 2019 consensus say about pregnancy after surgery?`,`Postpone until weight is stable, about 1 year after sleeve or bypass and 2 after a band; give vitamin A as beta-carotene, because retinol is teratogenic [[Shawe2019ObesRev]].`],
 [4,`How common is binge eating disorder, and is it treated?`,`Median lifetime prevalence 1.4% across 14 countries, more than bulimia nervosa; fewer than half ever got treatment [[Kessler2013BED]].`],
 [4,`How is adjusted body weight calculated?`,`Ideal body weight + 0.4 × (total body weight − ideal body weight) [[Nightingale2015]].`],
 [4,`Which bedside sign warns of a leak after gastric bypass?`,`A heart rate above 120, with respiratory distress; routine contrast studies missed 78% of leaks [[Hamilton2003]].`],
 [4,`What predicts a difficult intubation better than BMI?`,`Neck circumference and Mallampati score [[Brodsky2002,Juvin2003]]. Difficult intubation occurred in 15.5% at BMI 35 or more against 2.2% in lean patients [[Juvin2003]].`],
 [4,`Why can a standard IM needle fail in the deltoid?`,`A 16 mm needle would not have reached 5 mm into muscle in 48.4% of women and 17% of men [[Poland1997]].`],
 [4,`What is retatrutide, and what did TRIUMPH-1 show?`,`A GIP, GLP-1 and glucagon receptor agonist: -25.0% on 12 mg against -3.9% on placebo at 80 weeks. Still investigational [[Jastreboff2026TRIUMPH1]].`],
 [4,`Did oral semaglutide slow early Alzheimer's disease?`,`No. evoke and evoke+ were negative, although observational data had suggested a link [[Cummings2026Evoke]].`],

 /* ---- Part 5: history ---- */
 [5,`Who described the index, and who named it BMI?`,`Adolphe Quetelet in 1832; Ancel Keys and colleagues named it the "body mass index" in 1972 [[Eknoyan2008,Keys1972]].`],
 [5,`When was the ob gene, leptin, cloned?`,`1994, by Friedman's group [[Zhang1994]].`],
 [5,`When did the AMA recognise obesity as a disease?`,`2013, as "a complex, chronic disease requiring medical attention" [[Kyle2016AMA]].`],
 [5,`Why were fenfluramine and dexfenfluramine withdrawn?`,`Valvular heart disease in women taking fen-phen [[Connolly1997]]; the FDA requested voluntary withdrawal in 1997 [[CDC1997Fenfluramine]].`],
 [5,`Why was sibutramine withdrawn?`,`SCOUT found more non-fatal heart attacks and strokes (HR 1.16 for the primary outcome) [[James2010SCOUT]]; Europe withdrew it in 2010 [[Galhardo2010]].`],
 [5,`Why was rimonabant withdrawn in Europe?`,`Psychiatric harm: more depressive mood disorders and anxiety [[Christensen2007]].`],
 [5,`When was gastric bypass first described, and what were the 1991 NIH thresholds?`,`Mason and Ito, 1967 [[Mason1967]]. The 1991 NIH thresholds were BMI over 40, or over 35 with comorbidities [[NIH1991Consensus,Eisenberg2022ASMBS]].`],
 [5,`When were Wegovy and Zepbound first approved in the US?`,`Wegovy on 4 June 2021 and Zepbound on 8 November 2023 [[FDA-DrugsAtFDA-AOM]].`]
];
/* the 5As and STOP-Bang are published names; every other phrase here is written for this guide */
const RV_MN=[
 ["5As",1,`<b>Ask</b> permission, <b>Assess</b>, <b>Advise</b>, <b>Agree</b>, <b>Assist</b>: the modified 5As for obesity counselling [[Vallis2013]]. Played below.`],
 ["STOP-Bang",1,`<b>S</b>noring, <b>T</b>iredness, <b>O</b>bserved apnoea, blood <b>P</b>ressure; <b>B</b>MI, <b>A</b>ge, <b>N</b>eck, <b>G</b>ender. 0-2 low risk, 5-8 high risk for moderate-to-severe sleep apnoea [[Chung2008STOP,Chung2016STOPBang]].`],
 ["Is it changing how the body works?",0,`The question behind clinical obesity: excess adiposity <b>plus</b> organ dysfunction or limits on daily life. Without that, it is preclinical obesity [[Rubino2025Commission]].`],
 ["94/80, then 102/88",0,`Lean's two waist action levels for men/women: <b>94/80 cm</b> and <b>102/88 cm</b> [[Lean1995]].`],
 ["Half your height",0,`A waist-to-height ratio of <b>0.5</b> as a rough boundary [[Browning2010]], less fair to shorter people [[Nevill2023]].`],
 ["Red, adrenal, hungry",0,`POMC deficiency: <b>red</b> hair, <b>adrenal</b> insufficiency and early-onset obesity with intense hunger [[Krude1998]].`],
 ["Ghrelin grumbles first",0,`Ghrelin, from the stomach, rises nearly twofold <b>before</b> meals and falls within an hour after [[Cummings2001]].`],
 ["58 beats 31",0,`DPP: lifestyle cut diabetes incidence by <b>58%</b>, metformin by <b>31%</b> [[Knowler2002DPP]].`],
 ["One off the scale, four off the knee",0,`Each <b>1</b> unit of weight lost removed about <b>4</b> units of knee load per step [[Messier2005]].`],
 ["Sleeve sinks ghrelin, bypass boosts GLP-1",0,`Sleeve gastrectomy lowers ghrelin [[Karamanakos2008]]; gastric bypass raises post-meal GLP-1 and PYY [[leRoux2006]].`]
];
/* the five steps: letter word and what it covers [[Vallis2013]] */
const RV_A=[
 ['Ask','permission, without judgement'],
 ['Assess','size, stage, drivers, complications'],
 ['Advise','risks, benefits, options'],
 ['Agree','realistic expectations, a plan'],
 ['Assist','barriers, resources, follow-up']
];
const RV_HEAD=['Ask: permission first','Assess: the whole picture','Advise: modest loss, real gains','Agree: realistic expectations','Assist: keep in touch','Why asking first matters'];
const RV_CAP=[
 ['Ask permission, without judgement,','and explore readiness'],
 ['Measure and stage the person,','not just the scale'],
 ['Odds of each gain at 1 year,','5 to <10% loss vs stable weight'],
 ['A schematic average, not a target','for any person'],
 ['Guideline contact, as published:','at least monthly for a year or more'],
 ['19 in 100 would avoid future','appointments after weight stigma']
];
/* Look AHEAD, 5 to <10% loss vs stable weight at 1 year: odds ratios [[Wing2011DiabetesCare]] */
const RV_OR=[['HbA1c down 0.5',3.52],['Triglycerides down 40',2.20],['HDL up 5',1.69],['Systolic BP down 5',1.56]];
const RV_STEPS=[
 {from:0,at:.04,k:'Ask',t:'Ask permission to talk about weight',txt:`The first A means asking permission to discuss weight, without judgement, and exploring whether the person is ready [[Vallis2013]]. Many people with obesity have met weight stigma in health care: in six countries, 56-61% of people in a weight-management programme reported it, two-thirds of them from doctors [[Puhl2021SixCountries]].`,pt:'A good check-up starts by asking whether it is all right to talk about weight. You can say no, or not today.',hook:'5As: Ask (permission), Assess, Advise, Agree, Assist. [[Vallis2013]]'},
 {from:1/6,at:1/6+.04,k:'Assess',t:'Assess size, stage, drivers and complications',txt:`Assess covers BMI, waist circumference, obesity stage, and the drivers and complications of excess weight [[Vallis2013]]. BMI alone misses about half of adults with excess body fat [[Okorodudu2010]], and EOSS stages 2-3 predicted mortality after adjustment for BMI [[Padwal2011EOSS]]. Drivers include medicines such as some antipsychotics, antidepressants and diabetes drugs [[Domecq2015]].`,pt:'The team looks at your whole health: blood pressure, blood tests, sleep, mood, joints and medicines, not only the number on the scale.',hook:'EOSS grades comorbidity and function (stages 0-4), not size. [[Sharma2009EOSS,Padwal2011EOSS]]'},
 {from:2/6,at:2/6+.04,k:'Advise',t:'Advise on risks, benefits and options',txt:`Advise covers health risks, the benefits of modest weight loss, the need for a long-term strategy, and treatment options [[Vallis2013]]. In Look AHEAD, losing 5 to under 10% at 1 year raised the odds of a 0.5-point HbA1c fall (OR 3.52), a 40 mg/dL triglyceride fall (OR 2.20), a 5 mg/dL HDL rise (OR 1.69) and a 5 mmHg systolic fall (OR 1.56); LDL cholesterol was not linked (P = 0.79) [[Wing2011DiabetesCare]].`,pt:'Even a modest change can improve blood sugar, blood fats and blood pressure for many people. These are averages from a large trial.',hook:'Modest loss (5 to <10%) improves glycaemia, BP, triglycerides and HDL, but not LDL. [[Wing2011DiabetesCare]]'},
 {from:3/6,at:3/6+.04,k:'Agree',t:'Agree on realistic expectations and a plan',txt:`Agree covers realistic expectations and the plan [[Vallis2013]]. Across 80 trials with at least a year of follow-up, average loss plateaued at about 6 months, and 3-6% was still maintained at 48 months [[Franz2007]]. Reviews describe this early loss, plateau and gradual regain as nearly universal, driven by biology, behaviour and environment [[Hall2018Maintenance]].`,pt:'Weight often levels off after a few months and some comes back. That is the body defending its weight, not a personal failure.',hook:'Regain is biology: hormones that favour it persist a year after weight loss. [[Sumithran2011]]'},
 {from:4/6,at:4/6+.04,k:'Assist',t:'Assist with barriers, resources and follow-up',txt:`Assist covers barriers, resources, referrals and regular follow-up [[Vallis2013]]. The AHA/ACC/TOS guideline recommends maintenance programmes with contact at least monthly for a year or more [[Jensen2014Guideline]]. In a maintenance trial, monthly personal contact cut 30-month regain to 4.0 kg against 5.5 kg self-directed [[Svetkey2008WLM]].`,pt:'Support works best when it keeps going: regular contact, help with practical barriers, and referral to other services when needed.',hook:'USPSTF (grade B): offer or refer adults with BMI 30 or more to intensive behavioural interventions. [[Curry2018USPSTF]]'},
 {from:5/6,at:5/6+.04,k:'Why',t:'Why asking first matters',txt:`In a US survey, 19% said they would avoid future appointments and 21% would seek a new doctor if they felt their doctor stigmatised their weight [[Puhl2013Language]]. Done kindly, a brief offer is welcome: when English GPs spent 30 seconds offering referral, 81% of patients found it appropriate and helpful [[Aveyard2016BWeL]].`,pt:'You have a right to respectful words. "A person with obesity" or "higher weight" puts the person first.',hook:'Weight stigma does not motivate change; it harms health and drives people away from care. [[Rubino2020Stigma]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=RV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=RV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=RV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag ${m[1]?'good':'accent'}">${m[1]?'published name':'memory aid written for this guide'}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: the 5As ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const tx=(x,y,c,txt,st='',a='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${a?` text-anchor="${a}"`:''}${st?` style="${st}"`:''}>${txt}</text>`;
  const tick=(x,y,on)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="10" style="fill:var(${on?'--good':'--panel'});stroke:var(${on?'--good':'--line'});stroke-width:1.4"/>`+(on?`<path d="M${f1(x-5)} ${f1(y)}l3.6 3.8l6.4-7.4" style="fill:none;stroke:var(--panel);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/>`:'');
  const bubble=(x,y,w,h,tail,fill)=>`<path d="M${x+10} ${y}H${x+w-10}Q${x+w} ${y} ${x+w} ${y+10}V${y+h-10}Q${x+w} ${y+h} ${x+w-10} ${y+h}H${tail+14}L${tail} ${y+h+14}L${tail+2} ${y+h}H${x+10}Q${x} ${y+h} ${x} ${y+h-10}V${y+10}Q${x} ${y} ${x+10} ${y}Z" style="fill:var(${fill});stroke:var(--line);stroke-width:1.2"/>`;
  /* the schematic average course: % change from start by month, shaped on pooled trial averages [[Franz2007]] */
  const course=monoFn([[0,0],[2,-4],[6,-7.5],[12,-7],[24,-5.6],[36,-4.9],[48,-4.5]]);
  function draw(t){
    const N=vb(svg,'720 410','400 690');
    const p=phaseOf(RV_STEPS,t),u=clamp((t-RV_STEPS[p].from)*6);
    const L=N?{x:12,y:34,w:376,rh:44,th:38,ty:256}:{x:16,y:44,w:300,rh:60,th:52,ty:0};
    const R=N?{x:12,y:268,w:376,h:410}:{x:332,y:14,w:372,h:382};
    let s=tx(L.x,L.y-13,'rv-a','The 5As: talking about weight');
    RV_A.forEach(([w,d],k)=>{
      const y=L.y+k*L.rh,hot=k===p,on=k<p||(k===p&&u>.5)||p===5;
      s+=`<g style="opacity:${hot||p===5?1:on?.92:.55}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?14:17,cy=y+L.th/2;
      s+=`<circle cx="${L.x+cr+6}" cy="${cy}" r="${cr}" style="fill:var(${hot||on?'--brand':'--muted'})"/>`+tx(L.x+cr+6,cy+5,'rv-n','A','','middle');
      s+=tx(L.x+cr+14,cy+cr-1,'rv-m',String(k+1),'fill:var(--ink)');
      const x2=L.x+cr*2+18;
      s+=tx(x2,y+(N?16:22),'rv-c',w,'font-weight:700')+tx(x2,y+(N?31:40),'rv-b',d);
      s+=on?tick(L.x+L.w-18,cy,true):'';
      s+='</g>'});
    if(!N){const done=p===5?5:p+(u>.5?1:0);
      s+=tx(L.x,352,'rv-b',`Steps covered: ${done} of 5`);
      const bw=(L.w-4*8)/5;for(let k=0;k<5;k++)s+=`<rect x="${f1(L.x+k*(bw+8))}" y="360" width="${f1(bw)}" height="14" rx="5" style="fill:var(${k<done?'--brand':'--panel-2'});stroke:var(--line)"/>`;
      s+=tx(L.x,398,'rv-b','A published framework, quoted for learning.')}
    /* explainer panel */
    const W=R.w,cx=W/2,H=R.h;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=tx(16,30,'rv-a',RV_HEAD[p]);
    const cp=RV_CAP[p];s+=tx(cx,H-40,'rv-c',cp[0],'','middle')+tx(cx,H-20,'rv-c',cp[1],'','middle');
    if(p===0){
      const a=ease(ramp(u,.05,.35)),b=ease(ramp(u,.5,.8));
      s+=`<g style="opacity:${f1(a)}">`+bubble(16,48,W-60,44,70,'--panel')+tx(30,75,'rv-c','"Is it all right to talk about weight today?"')+'</g>';
      s+=`<g style="opacity:${f1(b)}">`+bubble(W-170,108,150,34,W-66,'--brand-soft')+tx(W-95,130,'rv-c','"Yes, that is OK."','font-weight:700','middle')+'</g>';
      const c1=person(70,128,150,{size:.25}),c2=person(W-70,128,150,{size:.75});
      s+=c1.svg+c2.svg;
      s+=tx(70,300,'rv-b','clinician','','middle')+tx(W-70,300,'rv-b','person','','middle');
      s+=tx(cx,212,'rv-b','example wording','font-style:italic','middle');
    }else if(p===1){
      const items=[['BMI','a screening number only'],['Waist circumference','a "vital sign" beside BMI'],['Obesity stage (EOSS)','comorbidity and function'],['Drivers','medicines, sleep, mood, life'],['Complications','heart, liver, joints, sleep']];
      const n=ease(ramp(u,.03,.85))*items.length;
      items.forEach(([a,b],k)=>{const y=58+k*52,on=n>k+.4;
        s+=`<rect x="16" y="${y}" width="${W-32}" height="44" rx="8" style="fill:var(${on?'--good-soft':'--panel'});stroke:var(${on?'--good':'--line'});stroke-width:${on?1.5:1}"/>`;
        s+=tick(38,y+22,on)+tx(58,y+19,'rv-c',a,'font-weight:700')+tx(58,y+36,'rv-b',b)});
    }else if(p===2){
      s+=tx(16,52,'rv-b','Look AHEAD, adults with type 2 diabetes');
      const x0=16,bx=176,bw=W-bx-50,X=v=>bx+bw*v/4,g=ease(ramp(u,.05,.7));
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="66" y2="282" style="stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3"/>`;
      s+=tx(X(1),296,'rv-b','OR 1: no change','','middle');
      [0,2,4].forEach(v=>{s+=tx(X(v),62,'rv-b',String(v),'','middle')});
      RV_OR.forEach(([lab,v],k)=>{const y=74+k*44,vv=lerp(1,v,g);
        s+=tx(x0,y+17,'rv-c',lab);
        s+=`<rect x="${f1(X(1))}" y="${y+4}" width="${f1(Math.max(0,X(vv)-X(1)))}" height="20" rx="4" style="fill:var(--brand);opacity:.85"/>`;
        s+=`<rect x="${f1(X(0))}" y="${y+4}" width="${f1(X(1)-X(0))}" height="20" rx="4" style="fill:var(--brand-soft)"/>`;
        s+=tx(X(vv)+6,y+19,'rv-q',vv.toFixed(2))});
      const y5=74+4*44,l=ease(ramp(u,.7,.95));
      s+=`<g style="opacity:${f1(.25+.75*l)}">`+tx(x0,y5+17,'rv-c','LDL cholesterol')+tx(X(1)+8,y5+17,'rv-c','no link (P = 0.79)','font-weight:700;fill:var(--muted)')+'</g>';
    }else if(p===3){
      const x0=56,x1=W-20,y0=70,y1=262,X=m=>x0+(x1-x0)*m/48,Y=v=>y0+(y1-y0)*(-v)/10,k=ease(ramp(u,.03,.85))*48;
      [0,-5,-10].forEach(v=>{s+=`<line class="grid" x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}"/>`+tx(x0-8,Y(v)+4,'rv-b',v+'%','','end')});
      [0,6,12,24,36,48].forEach(m=>{s+=tx(X(m),y1+20,'rv-b',String(m),'','middle')});
      s+=tx((x0+x1)/2,y1+38,'rv-b','months','','middle');
      let d='';for(let m=0;m<=k;m+=.5)d+=(m?'L':'M')+f1(X(m))+' '+f1(Y(course(m)));
      if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<circle cx="${f1(X(k))}" cy="${f1(Y(course(k)))}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
      if(k>2)s+=kitLabel(X(1.5)+8,Y(-3.2),'early loss');
      if(k>8)s+=kitLabel(X(6),Y(-7.5)+22,'plateau about 6 months',{a:'m'});
      if(k>30)s+=kitLabel(X(36),Y(-4.9)-14,'gradual regain',{a:'m'});
    }else if(p===4){
      const x0=30,x1=W-30,ay=150,X=m=>x0+(x1-x0)*m/12,n=Math.floor(ease(ramp(u,.03,.8))*13);
      s+=`<line class="axis" x1="${x0}" y1="${ay}" x2="${x1}" y2="${ay}"/>`;
      for(let m=0;m<=12;m++){const on=m<n;s+=`<circle cx="${f1(X(m))}" cy="${ay}" r="${on?8:5}" style="fill:var(${on?'--brand':'--panel'});stroke:var(${on?'--brand':'--line'});stroke-width:1.4"/>`;
        if(m%3===0)s+=tx(X(m),ay+28,'rv-b',String(m),'','middle')}
      s+=tx(cx,ay+48,'rv-b','months of contact','','middle');
      s+=tx(16,80,'rv-c',`Contacts so far: ${n}`,'font-weight:700');
      const box=[['Barriers','time, cost, transport'],['Resources','programmes, apps'],['Referral','dietitian, psychology']],bw2=(W-32-16)/3;
      box.forEach(([a,b],k)=>{const x=16+k*(bw2+8),on=u>.25+k*.2;
        s+=`<rect x="${f1(x)}" y="226" width="${f1(bw2)}" height="58" rx="8" style="fill:var(${on?'--brand-soft':'--panel'});stroke:var(${on?'--brand':'--line'})"/>`;
        s+=tx(x+bw2/2,250,'rv-c',a,'font-weight:700','middle')+tx(x+bw2/2,270,'rv-b',b,'','middle')});
    }else{
      const k=Math.round(19*ease(ramp(u,.05,.75))),sz=N?20:19,gp=N?8:7,ia=iconArray(0,0,{n:100,cols:10,size:sz,gap:gp,groups:[{k,col:'var(--bad)'}]});
      const ox=(W-ia.w)/2;
      s+=`<g transform="translate(${f1(ox)} 50)">${ia.svg}</g>`;
      s+=tx(cx,50+ia.h+22,'rv-c',`${k} of 100 would avoid future appointments`,'font-weight:700','middle');
      s+=tx(cx,50+ia.h+42,'rv-b','21% would seek a new doctor','','middle');
    }
    s+='</g>';svg.innerHTML=s;
    setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${RV_STEPS[p].k}: ${RV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#rvPlay'),draw,26000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 5.3 quiz =============== */
/* [part, question, options, index of the right option, cited explanation] */
const QZ_Q=[
 /* Part 1 */
 [1,`The 2025 Lancet Commission says BMI should be used:`,[`As the main individual diagnosis of obesity`,`Only as a population-level surrogate, for epidemiology or screening`,`Only in children`,`Never, in any setting`],1,`The Commission recommends BMI only as a surrogate measure of health risk at population level, for epidemiology or screening, not as an individual measure of health [[Rubino2025Commission]].`],
 [1,`Clinical obesity, as defined by the Commission, requires excess adiposity plus:`,[`A BMI of 40 or more`,`A waist above 102 cm`,`Organ or tissue dysfunction, or substantial limits on daily activities, due to obesity`,`A family history of obesity`],2,`Clinical obesity needs confirmed excess adiposity plus reduced organ function or age-adjusted limits on daily activities [[Rubino2025Commission]].`],
 [1,`Above which BMI does the Commission say excess adiposity can be assumed without further measurement?`,[`40 kg/m²`,`30 kg/m²`,`35 kg/m²`,`25 kg/m²`],0,`When BMI is above 40, excess adiposity "can pragmatically be assumed" [[Rubino2025Commission]].`],
 [1,`In the WHO adult classification, class II obesity is a BMI of:`,[`30.0-34.9`,`25.0-29.9`,`40 or more`,`35.0-39.9`],3,`Class I is 30.0-34.9, class II 35.0-39.9 and class III 40 or more [[WHO2000TRS894,Flegal1998]].`],
 [1,`In a meta-analysis, a BMI cut-off of 30 for detecting excess body fat was:`,[`Highly sensitive but not specific`,`Highly specific (about 0.97) but insensitive (about 0.42)`,`Equally sensitive and specific at about 0.90`,`Useless in both respects`],1,`BMI 30 had sensitivity 0.42 and specificity 0.97, missing about half of adults with excess body fat [[Okorodudu2010]].`],
 [1,`In the English cohort, the BMI giving the same diabetes risk as BMI 30 in White adults was lowest in:`,[`Black adults`,`Chinese adults`,`South Asian adults`,`Arab adults`],2,`23.9 in south Asian adults, against 26.6 Arab, 26.9 Chinese and 28.1 Black [[Caleyachetty2021Ethnicity]].`],
 [1,`Lean's higher waist action levels (men/women) are:`,[`102/88 cm`,`94/80 cm`,`110/95 cm`,`88/80 cm`],0,`94/80 cm and 102/88 cm were the two action levels in the Glasgow study [[Lean1995]].`],
 [1,`The usual waist-to-height ratio boundary is:`,[`0.3`,`0.7`,`1.0`,`0.5`],3,`A global boundary of 0.5: "keep your waist circumference to less than half your height" [[Browning2010]].`],
 [1,`Global age-standardised obesity prevalence in women rose from 1990 to 2022 from 8.8% to:`,[`12.1%`,`18.5%`,`25.3%`,`31.0%`],1,`From 8.8% to 18.5% in women, and from 4.8% to 14.0% in men [[NCDRisC2024]].`],
 [1,`The median twin-study heritability of BMI is about:`,[`0.25`,`0.46`,`0.75`,`0.95`],2,`Twin estimates ranged 0.47-0.90 with a median of 0.75; family studies gave a median of 0.46 [[Elks2012]].`],
 [1,`In the Danish adoption study, adult adoptees' BMI tracked most closely with:`,[`Their biological parents`,`Their adoptive parents`,`Their adoptive siblings`,`Neither set of parents`],0,`Weight class tracked the biological parents' BMI, not the adoptive parents' [[Stunkard1986]].`],
 [1,`The FTO risk allele's effect on obesity was smaller in:`,[`Children`,`Women`,`People born before 1942`,`Physically active adults`],3,`Each allele raised odds 1.30-fold in inactive and 1.22-fold in active adults, about 27% less [[Kilpelainen2011]].`],
 [1,`The commonest monogenic cause of severe early obesity is a defect in:`,[`The leptin gene`,`MC4R`,`POMC`,`PCSK1`],1,`MC4R mutations were found in 5.8% of 500 people with severe childhood obesity [[Farooqi2003MC4R]].`],
 [1,`Red hair, adrenal insufficiency and early-onset obesity suggest a defect in:`,[`MC4R`,`FTO`,`POMC`,`GPR75`],2,`Loss of POMC removes ACTH (adrenal insufficiency) and alpha-MSH (pigment and fullness) [[Krude1998]].`],
 [1,`In the NIH inpatient trial, the ultra-processed diet led people to eat about how much more a day?`,[`50 kcal`,`500 kcal`,`1000 kcal`,`No more`],1,`508 ± 106 kcal a day more, with 0.9 kg weight gain over 2 weeks [[Hall2019UPF]].`],
 [1,`In the arcuate nucleus, the neurons that increase food intake are:`,[`NPY/AgRP neurons`,`POMC/CART neurons`,`Oxytocin neurons`,`Dopamine neurons`],0,`NPY/AgRP neurons increase intake; POMC/CART neurons reduce it [[Cowley2001,Aponte2011]].`],
 [1,`High leptin levels in most people with obesity point to:`,[`Leptin deficiency`,`Leptin overdose`,`Leptin resistance`,`Leptin-secreting tumours`],2,`Leptin rises with body fat (r = 0.85), so high levels point to insensitivity to leptin [[Considine1996]].`],
 [1,`Plasma ghrelin, measured across a day, is highest:`,[`Just after a meal`,`Just before a meal`,`Only at night`,`Never changes`],1,`It rose nearly twofold just before each meal and fell to its trough within an hour after eating [[Cummings2001]].`],
 [1,`After Roux-en-Y gastric bypass, the 24-hour ghrelin area under the curve was:`,[`24% higher than before`,`Unchanged`,`Twice normal`,`77% lower than in normal-weight controls`],3,`After diet-induced loss ghrelin rose 24%; after bypass it was 77% below normal-weight controls [[Cummings2002]].`],
 [1,`In type 2 diabetes, the incretin effect falls from about 73% to:`,[`36%`,`60%`,`10%`,`0%`],0,`72.8% of the insulin response in controls against 36.0% in type 2 diabetes [[Nauck1986]].`],
 [1,`How many adult fat cells are renewed each year?`,[`About 1%`,`About 50%`,`About 10%`,`None`],2,`Carbon-14 dating showed about 10% renewed yearly, with total number stable in adults [[Spalding2008]].`],
 [1,`Large-volume liposuction of about 10 kg of subcutaneous fat:`,[`Cured type 2 diabetes`,`Did not improve insulin sensitivity or risk factors`,`Raised adiponectin to normal`,`Lowered blood pressure by 10 mmHg`],1,`It did not change insulin sensitivity, inflammatory markers or other risk factors at 10-12 weeks [[Klein2004]].`],
 [1,`One year after diet-induced weight loss, which pattern persisted?`,[`High leptin and low ghrelin`,`All hormones back to baseline`,`Low insulin only`,`Low leptin, PYY and CCK, with high ghrelin and hunger`],3,`The hormonal push toward regain was still present at 62 weeks [[Sumithran2011]].`],
 [1,`Six years after "The Biggest Loser", metabolic adaptation was about:`,[`-499 kcal/day`,`0 kcal/day`,`+200 kcal/day`,`-50 kcal/day`],0,`Resting metabolic rate was still 704 kcal/day below baseline and adaptation was -499 kcal/day [[Fothergill2016]].`],

 /* Part 2 */
 [2,`In the DPP, lifestyle intervention reduced diabetes incidence versus placebo by:`,[`31%`,`58%`,`16%`,`90%`],1,`Lifestyle 58%, metformin 31%, over a mean 2.8 years [[Knowler2002DPP]].`],
 [2,`The DPP number needed to treat with lifestyle to prevent one case over 3 years was:`,[`2.1`,`13.9`,`6.9`,`50`],2,`6.9 for lifestyle and 13.9 for metformin [[Knowler2002DPP]].`],
 [2,`In DiRECT, remission at 12 months was 46% versus 4%. Among people who lost 15 kg or more it was:`,[`86%`,`46%`,`57%`,`100%`],0,`Remission rose with weight loss: 0% with gain up to 86% (31/36) with 15 kg or more [[Lean2018DiRECT]].`],
 [2,`Look AHEAD's primary cardiovascular outcome showed:`,[`A 20% reduction`,`A 50% reduction`,`Harm from lifestyle`,`No significant difference (HR 0.95)`],3,`HR 0.95 (0.83-1.09); stopped for futility at a median 9.6 years [[LookAHEAD2013]].`],
 [2,`Losing 5 to under 10% of weight in Look AHEAD was NOT associated with improvement in:`,[`HbA1c`,`LDL cholesterol`,`Triglycerides`,`HDL cholesterol`],1,`LDL cholesterol was not associated with weight loss (P = 0.79) [[Wing2011DiabetesCare]].`],
 [2,`In the Wisconsin Sleep Cohort, a 10% weight gain predicted moderate-to-severe sleep-disordered breathing odds of about:`,[`1.1-fold`,`2-fold`,`6-fold`,`20-fold`],2,`About 6-fold (95% CI 2.2-17.0) [[Peppard2000]].`],
 [2,`A STOP-Bang score of 3 or more has a sensitivity for moderate-to-severe OSA of about:`,[`93%`,`50%`,`70%`,`20%`],0,`93% for moderate-to-severe and 100% for severe OSA [[Chung2016STOPBang]].`],
 [2,`Which is NOT one of IARC's 13 cancers linked to excess body fatness?`,[`Meningioma`,`Multiple myeloma`,`Thyroid cancer`,`Lung cancer`],3,`The 13 include meningioma, thyroid and multiple myeloma; lung cancer is not among them [[LaubySecretan2016]].`],
 [2,`MASLD requires hepatic steatosis plus at least:`,[`Heavy alcohol use`,`One of five cardiometabolic risk factors`,`A BMI of 35`,`Cirrhosis`],1,`At least 1 of 5 cardiometabolic risk factors [[Rinella2023MASLD]].`],
 [2,`AASLD: a FIB-4 score that rules out advanced fibrosis is:`,[`2.67 or more`,`Above 3.25`,`Below 1.3`,`Exactly 2`],2,`Below 1.3 rules it out; 2.67 or more rules it in [[Rinella2023AASLD]].`],
 [2,`Obesity in Framingham was linked to atrial fibrillation mainly through:`,[`Left atrial enlargement`,`Thyroid disease`,`Valve disease`,`Alcohol`],0,`The excess AF risk appeared to be mediated by left atrial enlargement [[Wang2004AF]].`],
 [2,`Each 1-unit BMI increase raised heart-failure risk in Framingham women by:`,[`1%`,`20%`,`50%`,`7%`],3,`5% in men and 7% in women per BMI unit [[Kenchaiah2002]].`],
 [2,`The relationship between obesity and depression is best described as:`,[`One-way, obesity to depression`,`Bidirectional`,`One-way, depression to obesity`,`Absent`],1,`Obesity to depression OR 1.55; depression to obesity OR 1.58 [[Luppino2010]].`],
 [2,`EOSS stages are based on:`,[`BMI bands`,`Waist circumference`,`Comorbidity and functional status`,`Body-fat percentage`],2,`EOSS grades comorbidity and function, not size; stages 2-3 predicted mortality after BMI adjustment [[Sharma2009EOSS,Padwal2011EOSS]].`],
 [2,`A blood pressure cuff that is too small for the arm will:`,[`Overestimate blood pressure`,`Underestimate blood pressure`,`Not change the reading`,`Only affect diastolic pressure`],0,`A too-small cuff gives an artificially high reading; bladder length should be 75-100% of arm circumference [[Muntner2019]].`],
 [2,`The first "A" of the 5As for obesity is:`,[`Assess`,`Advise`,`Assist`,`Ask permission`],3,`Ask permission to discuss weight, without judgement [[Vallis2013]].`],
 [2,`Acanthosis nigricans is a skin marker of:`,[`Vitamin D deficiency`,`Hyperinsulinaemia`,`Hypothyroidism`,`Liver failure`],1,`Found in 74% of obesity clinic adults and called a reliable marker of hyperinsulinaemia [[Hud1992]].`],
 [2,`Weight discrimination was associated with mortality higher by about:`,[`5%`,`20%`,`60%`,`200%`],2,`HR 1.57 and 1.59 in two cohorts [[Sutin2015]].`],
 [2,`Implicit anti-fat bias among 2284 doctors was:`,[`Strong, similar to the general public`,`Absent`,`Reversed (pro-fat)`,`Weak, far below the public`],0,`Cohen's d 0.93 in doctors against 1.0 in the public [[Sabin2012]].`],
 [2,`Which term did people rate among the most stigmatising for providers to use?`,[`Weight`,`Unhealthy weight`,`BMI`,`"Morbidly obese"`],3,`"Weight" and "unhealthy weight" were most desirable; "morbidly obese", "fat" and "obese" least [[Puhl2013Language]].`],
 [2,`USPSTF 2018 recommends intensive behavioural interventions for adults with BMI of at least:`,[`25`,`30`,`35`,`40`],1,`Offer or refer adults with BMI 30 or more (grade B) [[Curry2018USPSTF]].`],

 /* Part 3 */
 [3,`The AHA/ACC/TOS guideline defines high-intensity lifestyle intervention as at least:`,[`4 sessions in 12 months`,`1 session a year`,`14 sessions in 6 months`,`52 sessions in 6 months`],2,`"≥14 sessions in 6 mo", with average losses of about 8 kg [[Jensen2014Guideline]].`],
 [3,`DIETFITS compared healthy low-fat and low-carbohydrate diets and found:`,[`No significant difference in 12-month weight loss`,`Low-fat clearly better`,`Low-carbohydrate twice as effective`,`Genotype predicted the best diet`],0,`-5.3 against -6.0 kg, not significant; genotype did not predict response [[Gardner2018DIETFITS]].`],
 [3,`Adding time-restricted eating to calorie restriction for 12 months:`,[`Doubled weight loss`,`Caused weight gain`,`Was required for any loss`,`Gave no significant extra loss`],3,`Net -1.8 kg, P = 0.11 [[Liu2022TRE]].`],
 [3,`Alternate-day fasting compared with daily calorie restriction gave:`,[`Twice the weight loss`,`Similar loss with higher dropout`,`No weight loss`,`Lower LDL cholesterol`],1,`-6.0% against -5.3% at 12 months, with 38% dropout on alternate-day fasting [[Trepanowski2017ADF]].`],
 [3,`Aerobic exercise alone produces average weight loss of about:`,[`10 kg`,`5 kg`,`1.6-1.7 kg`,`None at all`],2,`1.6 kg at 6 months and 1.7 kg at 12 months [[Thorogood2011]].`],
 [3,`Native GLP-1 is rapidly inactivated by:`,[`DPP-4`,`Lipase`,`Pepsin`,`Amylase`],0,`Over 50% was converted to inactive forms within 2 minutes in rats, by DPP-4 [[Kieffer1995]].`],
 [3,`Tirzepatide activates which receptors?`,[`GLP-1 only`,`MC4R`,`Amylin and GLP-1`,`GIP and GLP-1`],3,`A single molecule that activates both GIP and GLP-1 receptors [[FDA-Zepbound]].`],
 [3,`In STEP 1, mean weight change on semaglutide 2.4 mg at 68 weeks was:`,[`-5.0%`,`-14.9%`,`-25.0%`,`-2.4%`],1,`-14.9% against -2.4% with placebo; a trial average [[Wilding2021STEP1]].`],
 [3,`In SURMOUNT-1, the share losing at least 20% on tirzepatide 15 mg was:`,[`3%`,`25%`,`57%`,`91%`],2,`57% on 15 mg against 3% on placebo [[Jastreboff2022SURMOUNT1]].`],
 [3,`In SURMOUNT-5, head to head at 72 weeks:`,[`Tirzepatide -20.2% vs semaglutide -13.7%`,`Semaglutide -20.2% vs tirzepatide -13.7%`,`No difference`,`Both under 5%`],0,`-20.2% with tirzepatide against -13.7% with semaglutide [[Aronne2025SURMOUNT5]].`],
 [3,`SELECT enrolled adults with cardiovascular disease, BMI 27 or more and:`,[`Type 1 diabetes`,`Type 2 diabetes`,`Heart failure only`,`No diabetes`],3,`Without diabetes; MACE HR 0.80 [[Lincoff2023SELECT]].`],
 [3,`In SURMOUNT-4, people switched to placebo after the lead-in regained about:`,[`1%`,`14%`,`50%`,`0%`],1,`+14.0% on placebo against -5.5% further loss on continued tirzepatide [[Aronne2024SURMOUNT4]].`],
 [3,`Incretin anti-obesity drugs are contraindicated with a personal or family history of:`,[`Papillary thyroid cancer`,`Hypothyroidism`,`Medullary thyroid carcinoma or MEN 2`,`Graves' disease`],2,`The boxed warning on thyroid C-cell tumours carries this contraindication [[FDA-Wegovy]].`],
 [3,`Qsymia is dispensed through a REMS programme because:`,[`Topiramate can cause oral clefts`,`Phentermine is addictive`,`It causes thyroid tumours`,`It raises blood pressure`],0,`First-trimester topiramate exposure raises the risk of oral clefts; monthly pregnancy tests are advised [[FDA-Qsymia]].`],
 [3,`The Saxenda label says to stop if an adult has not lost at least what share by 16 weeks?`,[`10%`,`1%`,`7%`,`4%`],3,`Saxenda: less than 4% at 16 weeks, quoted as published [[FDA-Saxenda]].`],
 [3,`The AGA 2022 guideline suggested AGAINST which medicine?`,[`Semaglutide 2.4 mg`,`Orlistat`,`Phentermine-topiramate ER`,`Naltrexone-bupropion ER`],1,`It suggested against orlistat [[Grunvald2022AGA]].`],
 [3,`Setmelanotide is an agonist at:`,[`GLP-1 receptors`,`Amylin receptors`,`MC4 receptors`,`Leptin receptors`],2,`An MC4 receptor agonist, for specific genetic and hypothalamic obesity only [[FDA-Imcivree]].`],
 [3,`A characteristic adverse effect of setmelanotide is:`,[`Skin hyperpigmentation`,`Hair loss`,`Hypoglycaemia`,`Hearing loss`],0,`Hyperpigmentation occurred in 61% in the Bardet-Biedl trial [[Haqq2022Setmelanotide]].`],
 [3,`GLP-1 receptor agonists in weight-loss trials raised gallbladder or biliary disease by:`,[`Not at all`,`RR 0.5`,`RR 10`,`RR 2.29`],3,`RR 1.37 overall and 2.29 in weight-loss trials [[He2022Gallbladder]].`],
 [3,`The 1991 NIH surgery thresholds were BMI over 40, or over 35 with comorbidities. ASMBS/IFSO 2022 recommend surgery at BMI over:`,[`50`,`35 regardless of comorbidity`,`45`,`30 regardless of comorbidity`],1,`Recommended above 35 regardless of comorbidity; considered at 30-34.9 with metabolic disease [[Eisenberg2022ASMBS]].`],
 [3,`Which operation lowers fasting ghrelin markedly?`,[`Gastric band`,`Gastric bypass`,`Sleeve gastrectomy`,`Intragastric balloon`],2,`Fasting ghrelin fell after sleeve but not significantly after bypass in a randomised study [[Karamanakos2008]].`],
 [3,`SOS life expectancy after surgery compared with usual care was:`,[`3.0 years longer`,`10 years longer`,`The same`,`2 years shorter`],0,`3.0 years longer than usual care, but 5.5 years shorter than the general population [[Carlsson2020NEJM]].`],
 [3,`In STAMPEDE at 5 years, HbA1c 6% or less was reached by 29% after bypass, 23% after sleeve and:`,[`50%`,`23%`,`0%`,`5% with medical therapy`],3,`5% with intensive medical therapy alone [[Schauer2017STAMPEDE]].`],
 [3,`At 10 years in SLEEVEPASS, endoscopic oesophagitis was found in 31% after sleeve against:`,[`7% after bypass`,`31% after bypass`,`60% after bypass`,`0% after bypass`],0,`31% against 7%; Barrett's oesophagus was 4% in both [[Salminen2022SLEEVEPASS]].`],
 [3,`Closing mesenteric defects during bypass reduces later:`,[`Reflux`,`Small bowel obstruction from internal hernia`,`Dumping`,`Anaemia`],1,`Reoperation for obstruction fell from 10.2% to 5.5% (HR 0.56) [[Stenberg2016Lancet]].`],
 [3,`Late dumping is diagnosed by a glucose nadir below:`,[`100 mg/dL`,`70 mg/dL`,`50 mg/dL`,`30 mg/dL`],2,`Late dumping: glucose nadir below 50 mg/dL [[Scarpellini2020]].`],
 [3,`Persistent vomiting after bariatric surgery especially risks deficiency of:`,[`Vitamin K`,`Vitamin C`,`Zinc`,`Thiamine (B1)`],3,`Thiamine deficiency can lead to Wernicke-Korsakoff syndrome [[Lupoli2017]].`],
 [3,`Current perioperative mortality for metabolic and bariatric surgery is reported at:`,[`0.03-0.2%`,`2-5%`,`5-10%`,`About 1 in 10`],0,`0.03-0.2%, much improved since the early 2000s [[Arterburn2020JAMA,Eisenberg2022ASMBS]].`],

 /* Part 4 */
 [4,`Class 3 obesity in children is BMI at or above what share of the 95th percentile?`,[`100%`,`120%`,`140%`,`200%`],2,`Class 2 is 120% (or BMI 35); class 3 is 140% (or BMI 40) [[Ogden2023,Hampl2023AAP]].`],
 [4,`The 2023 AAP guideline's position on "watchful waiting" is:`,[`It is first-line for all ages`,`It is advised until age 12`,`It is advised for a year`,`It recommends against it`],3,`Treatment should begin when obesity is diagnosed [[Hampl2023AAP,Cuda2024OMA]].`],
 [4,`Intensive health behaviour and lifestyle treatment (IHBLT) is most effective with at least:`,[`26 hours over 3-12 months`,`2 hours over a year`,`100 hours over a month`,`5 hours over a week`],0,`≥26 hours of face-to-face, family-based, multicomponent treatment over 3-12 months [[Hampl2023AAP,Orr2026]].`],
 [4,`In STEP TEENS, mean BMI change with semaglutide at 68 weeks was:`,[`-5%`,`-16.1%`,`-30%`,`+0.6%`],1,`-16.1% against +0.6% with placebo [[Weghuber2022STEPTEENS]].`],
 [4,`Of adults with obesity, about how many did NOT have obesity in childhood?`,[`10%`,`30%`,`70%`,`95%`],2,`70%, so targeting only children with higher weight would not remove most adult obesity [[Simmonds2016]].`],
 [4,`Five years after bypass, type 2 diabetes remitted in adolescents (Teen-LABS) versus adults in:`,[`86% vs 53%`,`53% vs 86%`,`20% vs 20%`,`100% vs 0%`],0,`Adolescents 86% against adults 53% [[Inge2019NEJM]].`],
 [4,`Young people in a 2021 survey most disliked which word for their weight?`,[`"Healthy weight"`,`"Weight"`,`"Growing"`,`"Obese"`],3,`"Obese", "fat" and "large" made them feel sad, ashamed and embarrassed [[Puhl2022Terms]].`],
 [4,`IOM 2009 total gestational weight gain for pre-pregnancy BMI 30 or more is:`,[`12.5-18 kg`,`5-9 kg`,`11.5-16 kg`,`0 kg`],1,`5-9 kg, quoted as published [[Rasmussen2009IOM,Goldstein2017]].`],
 [4,`Maternal obesity is associated with LOWER odds of:`,[`Neural tube defects`,`Spina bifida`,`Gastroschisis`,`Cardiovascular anomalies`],2,`Gastroschisis OR 0.17; neural tube defects OR 1.87 [[Stothard2009]].`],
 [4,`Pre-eclampsia risk roughly doubles with each pre-pregnancy BMI rise of:`,[`5-7 kg/m²`,`1 kg/m²`,`15 kg/m²`,`20 kg/m²`],0,`In 13 cohorts of nearly 1.4 million women [[OBrien2003]].`],
 [4,`After bariatric surgery, pregnancy outcomes compared with matched controls showed:`,[`More gestational diabetes`,`More large-for-gestational-age babies`,`No differences`,`Less gestational diabetes and more small-for-gestational-age babies`],3,`Gestational diabetes 1.9% vs 6.8%; SGA 15.6% vs 7.6% [[Johansson2015NEJM]].`],
 [4,`Why should vitamin A be given as beta-carotene in pregnancy after surgery?`,[`It is cheaper`,`The retinol form is teratogenic`,`Retinol causes dumping`,`Beta-carotene raises iron`],1,`The 2019 consensus advises beta-carotene because retinol is teratogenic [[Shawe2019ObesRev]].`],
 [4,`The BEDS-7 binge-eating screener had 100% sensitivity and 38.7% specificity, so it:`,[`Diagnoses BED`,`Rules BED in`,`Screens, then needs full evaluation`,`Replaces a clinician`],2,`It flags possible BED for full evaluation; it screens rather than diagnoses [[Herman2016BEDS7]].`],
 [4,`The NIOSH recommended maximum for manual patient handling is:`,[`35 lb (about 16 kg)`,`100 lb`,`10 lb`,`70 lb`],0,`Above 35 lb, assistive devices should be used [[Waters2007]].`],
 [4,`The AAGBI/SOBA guideline suggests which weight for tidal volume and tracheal tube size?`,[`Total body weight`,`Adjusted body weight`,`Lean body weight`,`Ideal body weight`],3,`Ideal body weight for tidal volume and tube size; lean body weight for induction propofol; adjusted for antibiotics and LMWH, as published [[Nightingale2015]].`],
 [4,`After laparoscopic gastric bypass, the most sensitive signs of a leak were:`,[`Fever and rash`,`Heart rate above 120 and respiratory distress`,`Low blood pressure only`,`Abdominal distension only`],1,`Contrast swallow detected only 2 of 9 leaks [[Hamilton2003]].`],
 [4,`In 100 patients with BMI over 40, difficult intubation was best predicted by:`,[`BMI`,`Weight`,`Neck circumference and Mallampati score`,`Age`],2,`Neither BMI nor weight predicted it [[Brodsky2002]].`],
 [4,`Retatrutide acts on:`,[`GIP, GLP-1 and glucagon receptors`,`GLP-1 and amylin receptors`,`MC4R`,`The GIP receptor as a blocker`],0,`A triple agonist; TRIUMPH-1 -25.0% on 12 mg against -3.9% placebo [[Jastreboff2026TRIUMPH1]].`],
 [4,`MariTide differs from tirzepatide because at the GIP receptor it is:`,[`An agonist`,`Inactive`,`An amylin mimic`,`An antagonist (blocker)`],3,`It blocks the GIP receptor while activating GLP-1; tirzepatide activates both [[Jastreboff2025MariTide]].`],
 [4,`The evoke and evoke+ trials of oral semaglutide in early Alzheimer's disease were:`,[`Strongly positive`,`Negative`,`Stopped for harm`,`Never completed`],1,`No difference from placebo at 104 weeks [[Cummings2026Evoke]].`],
 [4,`A noninferiority cardiovascular safety trial such as SYNCHRONIZE-CVOT shows that a drug:`,[`Proves benefit`,`Must be withdrawn`,`Does not raise risk, without proving benefit`,`Is cheaper`],2,`HR 0.89, non-inferior: it rules out excess risk but does not prove benefit [[Bozkurt2026SYNCHRONIZECVOT]].`],

 /* Part 5 */
 [5,`Who named weight/height² the "body mass index", and when?`,[`Ancel Keys and colleagues, 1972`,`Adolphe Quetelet, 1832`,`The WHO, 1997`,`Friedman, 1994`],0,`Quetelet described the index in 1832; Keys named it BMI in 1972 [[Eknoyan2008,Keys1972]].`],
 [5,`Leptin's gene (ob) was cloned in:`,[`1972`,`1987`,`2005`,`1994`],3,`By Friedman's group (Zhang et al.) [[Zhang1994]].`],
 [5,`Fenfluramine and dexfenfluramine were withdrawn in 1997 because of:`,[`Liver failure`,`Valvular heart disease`,`Suicide`,`Thyroid tumours`],1,`Valvulopathy in women on fen-phen led to the FDA's request [[Connolly1997,CDC1997Fenfluramine]].`],
 [5,`Rimonabant, a CB1 blocker, was withdrawn in Europe because of:`,[`Heart attacks`,`Kidney failure`,`Depressive and anxiety disorders`,`Gallstones`],2,`People were 2.5 times more likely to stop for depressive mood disorders [[Christensen2007]].`],
 [5,`The AMA recognised obesity as a disease in:`,[`2013`,`1948`,`2025`,`1991`],0,`"A complex, chronic disease requiring medical attention" [[Kyle2016AMA]].`],
 [5,`Gastric bypass for obesity was first described by:`,[`Sjöström, 1987`,`Keys, 1972`,`Rubino, 2016`,`Mason and Ito, 1967`],3,`Mason and Ito, 1967 [[Mason1967]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${RV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='%t:quiz.letters%'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'%t:quiz.correct%':'%t:quiz.wrong%'}</b> %t:quiz.answer_is{l:ansL}% ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'%t:quiz.next%':'%t:quiz.results%'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 5.4 glossary =============== */
/* [term, cited definition, module id] */
const GS_T=[
 ["5As",`A counselling framework for obesity: Ask permission, Assess, Advise, Agree and Assist [[Vallis2013]].`,"assessment"],
 ["Acanthosis nigricans",`Dark, velvety skin in folds; a reliable marker of hyperinsulinaemia, seen in 74% of adults at one obesity clinic [[Hud1992]].`,"assessment"],
 ["Adaptive thermogenesis",`The coordinated fall in energy expenditure and related responses after weight loss that favour regain [[Rosenbaum2010]].`,"adaptation"],
 ["Adipocyte",`A fat cell. Adult numbers stay constant even after weight loss, with about 10% renewed each year [[Spalding2008]].`,"adipose"],
 ["Adiponectin",`A protein made only by fat cells that is paradoxically lower in obesity [[Arita1999]].`,"adipose"],
 ["Adiposity-based chronic disease (ABCD)",`AACE/ACE's proposed diagnostic term, naming a chronic disease and avoiding the stigma of the word "obesity" [[Mechanick2017ABCD,Garvey2016AACE]].`,"what"],
 ["Adjusted body weight",`Ideal body weight + 0.4 × (total body weight − ideal body weight); the AAGBI/SOBA scalar for antibiotics and LMWH, as published [[Nightingale2015]].`,"nursing"],
 ["Adjustable gastric band",`A silicone band placed below the cardia, adjusted with saline through a port under the skin [[Lupoli2017]]; its use has declined [[Angrisani2024IFSO]].`,"surgery"],
 ["Adolescent bariatric surgery",`Considered for class II obesity with a comorbidity or class III obesity in the 2018 ASMBS paediatric guideline [[Pratt2018ASMBS]].`,"children"],
 ["AgRP/NPY neurons",`Arcuate hunger neurons. Switching on about 800 of them in mice triggered intense feeding within minutes [[Aponte2011]].`,"appetite"],
 ["Alpha-MSH",`The POMC product that activates MC4R to reduce intake; its absence also causes red hair in POMC deficiency [[Huszar1997,Krude1998]].`,"appetite"],
 ["Alternate-day fasting",`Eating 25% of needs on fast days and 125% on feast days; it matched daily restriction with higher dropout (38%) [[Trepanowski2017ADF]].`,"lifestyle"],
 ["Amycretin",`A single molecule acting on GLP-1 and amylin receptors, tested as an injection and a tablet (Early evidence) [[Dahl2025Amycretin]].`,"frontier"],
 ["Amylin analogue",`A drug that mimics amylin, a fullness hormone; cagrilintide is one, combined with semaglutide in CagriSema [[Garvey2025REDEFINE1]].`,"frontier"],
 ["Arcuate nucleus",`The hypothalamic area holding opposing POMC (fullness) and NPY/AgRP (hunger) neurons, both with leptin receptors [[Cowley2001]].`,"appetite"],
 ["Area postrema",`A circumventricular organ outside the blood-brain barrier, where semaglutide reaches the brain [[Gabery2020]].`,"glp"],
 ["Bardet-Biedl syndrome",`A rare recessive ciliopathy with retinal dystrophy, obesity, extra digits, kidney problems and learning difficulties [[Forsythe2013]]. A setmelanotide indication [[FDA-Imcivree]].`,"othermeds"],
 ["Beige fat",`Fat cells within white fat that switch on UCP1 and burn energy as heat when stimulated [[Wu2012]].`,"adipose"],
 ["Biliopancreatic diversion / duodenal switch",`The operations with the most weight loss and most malabsorption [[Buchwald2004JAMA,Risstad2015JAMASurg]], used in under 2% of cases [[Lupoli2017]].`,"surgery"],
 ["Binge eating disorder (BED)",`Recurrent binge eating; median lifetime prevalence 1.4% across 14 countries, more than bulimia nervosa [[Kessler2013BED]]. CBT helps most [[Hilbert2019]].`,"living"],
 ["Bimagrumab",`An antibody blocking activin type II receptors, tested to preserve muscle during weight loss (Early evidence) [[Heymsfield2021Bimagrumab]].`,"frontier"],
 ["Body mass index (BMI)",`Weight in kg divided by height in metres squared [[Keys1972,Eknoyan2008]]; a population-level surrogate, not an individual diagnosis [[Rubino2025Commission]].`,"measuring"],
 ["Brown fat",`Thermogenic fat that burns energy through UCP1; seen on PET-CT in 7.5% of women and 3.1% of men [[Cypess2009]].`,"adipose"],
 ["CagriSema",`Cagrilintide plus semaglutide weekly: -20.4% against -3.0% at 68 weeks in REDEFINE 1 [[Garvey2025REDEFINE1]].`,"frontier"],
 ["Carbohydrate-insulin model",`The hypothesis that high-glycaemic-load diets drive fat storage, which drives eating [[Ludwig2021CIM]].`,"adaptation"],
 ["Cholecystokinin (CCK)",`A gut satiety hormone; infusion made lean men stop eating sooner [[Kissileff1981]].`,"appetite"],
 ["Class I, II, III obesity",`WHO adult BMI bands: 30-34.9, 35-39.9 and 40 or more [[WHO2000TRS894,Flegal1998]].`,"measuring"],
 ["Clinical obesity",`A chronic systemic illness in which excess adiposity alters organ or tissue function or limits daily activities [[Rubino2025Commission]].`,"what"],
 ["Compounded GLP-1 products",`Pharmacy-made versions not reviewed by the FDA for safety or quality; 10-fold dosing errors have been reported [[Lambson2023Compounded,McCall2026Compounded]].`,"sideeffects"],
 ["Contrave (naltrexone-bupropion)",`An opioid antagonist with a dopamine and noradrenaline reuptake inhibitor; boxed warning on suicidality [[FDA-Contrave]].`,"othermeds"],
 ["Crown-like structure",`Macrophages surrounding a dead, enlarged fat cell; over 90% of fat-tissue macrophages in obesity [[Cinti2005]].`,"adipose"],
 ["Diabetes Prevention Program (DPP)",`US trial: lifestyle cut diabetes incidence by 58% and metformin by 31% [[Knowler2002DPP]].`,"diabetes"],
 ["DiRECT",`UK trial of total diet replacement in primary care: 46% type 2 diabetes remission at 12 months against 4% [[Lean2018DiRECT]].`,"diabetes"],
 ["Diabetes remission",`In DiRECT, HbA1c below 6.5% after at least 2 months off all glucose-lowering drugs [[Lean2018DiRECT]].`,"diabetes"],
 ["DPP-4",`The enzyme that inactivates GLP-1 and GIP within minutes [[Kieffer1995]].`,"glp"],
 ["Dumping syndrome",`Symptoms after eating following surgery: early in up to 40%, late in up to 25% [[Kim2026Complications]]; late dumping has a glucose nadir below 50 mg/dL [[Scarpellini2020]].`,"aftersurgery"],
 ["Dysaesthesia",`Abnormal skin sensation; a new signal with semaglutide 7.2 mg (22.9%) [[Wharton2025STEPUP]].`,"sideeffects"],
 ["Ectopic fat",`Fat stored in the wrong places, such as the liver and around the heart, adding cardiometabolic risk [[Neeland2019]].`,"adipose"],
 ["Edmonton Obesity Staging System (EOSS)",`A 0-4 clinical and functional staging system used alongside BMI [[Sharma2009EOSS]]; stages 2-3 predict mortality [[Padwal2011EOSS]].`,"assessment"],
 ["Endoscopic sleeve gastroplasty (ESG)",`An organ-sparing procedure through the mouth; 13.6% total weight loss against 0.8% at 52 weeks in MERIT [[AbuDayyeh2022MERIT]].`,"surgery"],
 ["Energy balance model",`The brain regulates body weight, mostly below awareness, in response to the body's needs and the food environment [[Hall2022EBM]].`,"adaptation"],
 ["Energy gap",`The extra intake needed to sustain a higher weight: about 0.9 MJ (220 kcal) a day for the US epidemic [[Hall2011Lancet]].`,"adaptation"],
 ["Excess adiposity",`More body fat than is healthy; confirmed by direct measurement or anthropometry, or assumed above BMI 40 [[Rubino2025Commission]].`,"what"],
 ["Extended BMI-for-age charts",`CDC charts (Dec 2022) adding the 98th to 99.99th percentiles, up to BMI 60 [[Ogden2023]].`,"children"],
 ["Fen-phen",`Fenfluramine plus phentermine, linked to valvular heart disease [[Connolly1997]]; fenfluramine was withdrawn in 1997 [[CDC1997Fenfluramine]].`,"history"],
 ["FIB-4",`A score from age, ALT, AST and platelets; below 1.3 rules out advanced fibrosis, 2.67 or more rules it in [[Rinella2023AASLD]].`,"complications"],
 ["FTO",`The first common obesity variant: two risk alleles mean about 3 kg more weight [[Frayling2007]].`,"causes"],
 ["Gastric bypass (Roux-en-Y)",`A small pouch joined to a jejunal Roux limb, bypassing most of the stomach and the duodenum [[Kim2026Complications]].`,"surgery"],
 ["Gestational weight gain",`Weight gained in pregnancy. IOM 2009 published 5-9 kg for pre-pregnancy BMI 30 or more [[Rasmussen2009IOM]].`,"pregnancy"],
 ["Ghrelin",`A 28-amino-acid hunger hormone from the stomach, rising before meals [[Kojima1999,Cummings2001]].`,"appetite"],
 ["GIP",`Glucose-dependent insulinotropic polypeptide, an incretin from the gut that also promotes energy storage in fat [[Baggio2007]].`,"glp"],
 ["GLP-1",`Glucagon-like peptide-1, made by intestinal L cells; raises insulin, lowers glucagon and slows gastric emptying [[Holst2007]].`,"glp"],
 ["GLP-1 receptor agonist",`A medicine that activates the GLP-1 receptor, such as liraglutide or semaglutide [[FDA-Saxenda,FDA-Wegovy]].`,"glp"],
 ["Heritability",`The share of variation in a trait linked to genes in a given environment; for BMI in twins, median 0.75 [[Elks2012]].`,"causes"],
 ["High-intensity lifestyle intervention",`At least 14 sessions in 6 months, producing about 8 kg average loss [[Jensen2014Guideline]].`,"lifestyle"],
 ["Hyperphagia",`Intense, persistent hunger and eating, a feature of MC4R deficiency [[Farooqi2003MC4R]] and Prader-Willi syndrome [[Cassidy2012]].`,"causes"],
 ["Hypertrophy (adipose)",`Fat growth by larger cells; linked to higher insulin and lower insulin sensitivity, independent of fat mass [[Arner2010]].`,"adipose"],
 ["Hypothalamic obesity",`Obesity after a hypothalamic tumour, lesion or injury; setmelanotide gave BMI -16.5% against +3.3% [[Miller2026TRANSCEND]].`,"othermeds"],
 ["Ideal body weight",`In the AAGBI/SOBA guideline, height in cm minus 105 (women) or 100 (men); used for tidal volume, as published [[Nightingale2015]].`,"nursing"],
 ["IHBLT",`Intensive health behaviour and lifestyle treatment for children: at least 26 hours over 3-12 months [[Hampl2023AAP,Orr2026]].`,"children"],
 ["Incretin effect",`Extra insulin after oral versus IV glucose: 72.8% of the response in controls, 36.0% in type 2 diabetes [[Nauck1986]].`,"glp"],
 ["Internalised weight bias",`Applying weight stereotypes to oneself; 40-50% of US adults with overweight or obesity do so [[Rubino2020Stigma]].`,"stigma"],
 ["Internal hernia",`Bowel trapped in a mesenteric gap after bypass; closing the defects cut reoperation for obstruction (HR 0.56) [[Stenberg2016Lancet]].`,"aftersurgery"],
 ["Intragastric balloon",`An endoscopic balloon removed after 6 months; 10.2% against 3.3% loss at 6 months [[Courcoulas2017IGB]].`,"surgery"],
 ["IWQOL-Lite",`A 31-item weight-specific quality-of-life questionnaire with five scales [[Kolotkin2001]].`,"living"],
 ["King's Obesity Staging Criteria",`Nine domains, A to I, from Airways to body Image, each scored 0-3 [[Aasheim2011]].`,"assessment"],
 ["Lean body weight",`Weight without fat; rarely above 100 kg in men or 70 kg in women [[Nightingale2015]].`,"nursing"],
 ["Lean mass loss",`Lean tissue lost with weight; about 25% of the loss on tirzepatide in SURMOUNT-1 [[Look2025SURMOUNT1DXA]].`,"sideeffects"],
 ["Leptin",`The ob gene product, a fat-mass signal cloned in 1994 [[Zhang1994]]; high in common obesity [[Considine1996]].`,"appetite"],
 ["Leptin deficiency (congenital)",`A rare homozygous leptin mutation causing severe early obesity [[Montague1997]], treatable with leptin [[Farooqi2002Leptin]].`,"causes"],
 ["Leptin resistance",`Reduced brain response to leptin; the CSF-to-serum leptin ratio is 4.3-fold lower in obesity [[Caro1996]].`,"appetite"],
 ["Liraglutide",`A daily GLP-1 receptor agonist with a 13-hour half-life [[FDA-Saxenda]]; -8.4 against -2.8 kg in SCALE [[PiSunyer2015SCALE]].`,"glp"],
 ["Look AHEAD",`Intensive lifestyle in type 2 diabetes: no reduction in cardiovascular events (HR 0.95) [[LookAHEAD2013]].`,"diabetes"],
 ["Maintenance energy gap",`The extra daily intake needed to sustain a higher weight once reached [[Hall2011Lancet]].`,"adaptation"],
 ["Mallampati score",`A view of the throat used to predict difficult intubation; III-IV was the only independent risk factor in one study [[Juvin2003]].`,"nursing"],
 ["Marginal ulcer",`An ulcer at the pouch-bowel join after bypass; risk factors include smoking, NSAIDs and steroids [[Coblijn2015]].`,"aftersurgery"],
 ["MariTide (maridebart cafraglutide)",`A monthly antibody-peptide that activates GLP-1 and blocks the GIP receptor (Early evidence) [[Jastreboff2025MariTide]].`,"frontier"],
 ["MASLD",`Metabolic dysfunction-associated steatotic liver disease: steatosis plus at least 1 of 5 cardiometabolic risk factors [[Rinella2023MASLD]].`,"complications"],
 ["MASH",`The inflammatory form of MASLD. Semaglutide resolved it in 62.9% against 34.3% in ESSENCE [[Sanyal2025ESSENCE]].`,"complications"],
 ["MC4R",`The melanocortin-4 receptor; its deficiency is the commonest monogenic obesity [[Farooqi2003MC4R]].`,"causes"],
 ["Medullary thyroid carcinoma (MTC)",`A thyroid C-cell cancer; a personal or family history contraindicates incretin drugs [[FDA-Wegovy]].`,"sideeffects"],
 ["Metabolic adaptation",`A fall in energy expenditure beyond what body-composition change predicts; -499 kcal/day six years after "The Biggest Loser" [[Fothergill2016]].`,"adaptation"],
 ["Metabolic and bariatric surgery",`Operations on the stomach and gut that change weight and metabolism; about 280,000 in the US in 2022 [[Clapp2024ASMBS]].`,"surgery"],
 ["Metabolically healthy obesity",`Obesity without diabetes, hypertension or dyslipidaemia; it still carried higher heart-failure risk (HR 1.96) [[Caleyachetty2017MHO]].`,"complications"],
 ["Microbiome",`Gut microbes; mouse transfers suggest a role in fat gain (Early evidence in humans) [[Turnbaugh2006,Ridaura2013]].`,"causes"],
 ["Monogenic obesity",`Obesity caused by one powerful gene change, such as in leptin, its receptor, POMC or MC4R [[Loos2022]].`,"causes"],
 ["Motivational interviewing",`A counselling style the AAP recommends for children and families [[Hampl2023AAP,Pont2017AAP]].`,"children"],
 ["NEAT",`Non-exercise activity thermogenesis; it explained a 10-fold range in fat gain with overfeeding [[Levine1999]].`,"lifestyle"],
 ["Neural tube defects",`Spine and brain birth defects, more likely with maternal obesity (OR 1.87) [[Stothard2009]].`,"pregnancy"],
 ["Obesity",`A chronic, relapsing disease of excess adiposity with genetic, environmental and social causes [[Rubino2025Commission,Bray2017WOF]].`,"what"],
 ["Obstructive sleep apnoea (OSA)",`Repeated airway closure in sleep; a 10% weight gain raised the odds of moderate-to-severe disease about 6-fold [[Peppard2000]].`,"complications"],
 ["Orforglipron",`A small-molecule oral GLP-1 receptor agonist, approved as FOUNDAYO, taken with or without food [[FDA-Foundayo]].`,"glp"],
 ["Orlistat",`A gut lipase inhibitor that blocks some fat absorption [[FDA-Xenical]].`,"othermeds"],
 ["PCOS",`Polycystic ovary syndrome; women with PCOS have higher obesity prevalence (RR 2.77) [[Lim2012PCOS]].`,"pregnancy"],
 ["People-first language",`"People with obesity" rather than "obese people" [[Kyle2014,Puhl2020Words]].`,"stigma"],
 ["Personal fat threshold",`The hypothesis that each person has a fat level beyond which type 2 diabetes becomes likely, independent of BMI [[Taylor2015PFT]].`,"adipose"],
 ["Phentermine-topiramate (Qsymia)",`A sympathomimetic with an anticonvulsant; teratogenic, so dispensed through a REMS [[FDA-Qsymia]].`,"othermeds"],
 ["Polygenic score",`A sum of many small gene effects; top versus bottom decile meant 13 kg difference in adult weight [[Khera2019]].`,"causes"],
 ["POMC",`Pro-opiomelanocortin, made by arcuate fullness neurons; its deficiency causes obesity, adrenal insufficiency and red hair [[Cowley2001,Krude1998]].`,"appetite"],
 ["Prader-Willi syndrome",`Loss of paternal genes at 15q11.2-q13, with infant hypotonia, then hyperphagia and early obesity [[Cassidy2012]].`,"causes"],
 ["Pre-eclampsia",`High blood pressure with organ involvement in pregnancy; risk roughly doubles per 5-7 kg/m² of pre-pregnancy BMI [[OBrien2003]].`,"pregnancy"],
 ["Preclinical obesity",`Excess adiposity with preserved organ function, carrying raised risk of clinical obesity and other diseases [[Rubino2025Commission]].`,"what"],
 ["Pressure injury",`Skin damage from pressure; the BMI-risk curve is J-shaped, highest at both extremes [[Jia2024]].`,"nursing"],
 ["PYY",`Peptide YY(3-36), a gut fullness hormone acting on Y2 receptors; people with obesity stay sensitive to it [[Batterham2002,Batterham2003]].`,"appetite"],
 ["Quetelet index",`Weight divided by height squared, described by Adolphe Quetelet in 1832 [[Eknoyan2008]].`,"history"],
 ["Ramped position",`Ear level with the sternum, improving the laryngoscopy view; the default for induction [[Nightingale2015]].`,"nursing"],
 ["REMS",`An FDA safety programme; Qsymia is dispensed only through certified pharmacies [[FDA-Qsymia]].`,"othermeds"],
 ["Retatrutide",`A GIP, GLP-1 and glucagon receptor agonist, still investigational: -25.0% on 12 mg in TRIUMPH-1 [[Jastreboff2026TRIUMPH1]].`,"frontier"],
 ["Rimonabant",`A CB1 receptor blocker withdrawn in Europe for depressive disorders [[Christensen2007]].`,"history"],
 ["Sarcopenic obesity",`Excess adiposity with low skeletal muscle mass and function (ESPEN/EASO 2022) [[Donini2022]].`,"measuring"],
 ["SELECT",`Semaglutide outcome trial: 20% fewer major cardiovascular events (HR 0.80) without diabetes [[Lincoff2023SELECT]].`,"medtrials"],
 ["Semaglutide",`A weekly GLP-1 analogue with 94% homology to GLP-1 and a half-life of about 1 week [[FDA-Wegovy]].`,"glp"],
 ["Set-point model",`The idea that active feedback defends a level of fat; it struggles to explain the rise in obesity [[Speakman2011]].`,"adaptation"],
 ["Setmelanotide",`An MC4 receptor agonist for specific genetic and hypothalamic obesity, not common obesity [[FDA-Imcivree]].`,"othermeds"],
 ["Sibutramine",`A drug withdrawn after SCOUT showed more non-fatal heart attacks and strokes [[James2010SCOUT,Galhardo2010]].`,"history"],
 ["Sleeve gastrectomy",`Removal of the greater curvature of the stomach, about 75-80% of it [[Lupoli2017,Kim2026Complications]].`,"surgery"],
 ["SOS study",`Swedish Obese Subjects, a matched (not randomised) surgery cohort; mortality HR 0.71 [[Sjostrom2007SOS]].`,"surgery"],
 ["STEP 1",`Semaglutide 2.4 mg trial: -14.9% against -2.4% at 68 weeks [[Wilding2021STEP1]].`,"medtrials"],
 ["STOP-Bang",`An 8-item sleep apnoea screen; 0-2 low and 5-8 high risk [[Chung2008STOP,Chung2016STOPBang]].`,"assessment"],
 ["SURMOUNT-1",`Tirzepatide trial: -20.9% on 15 mg against -3.1% at 72 weeks [[Jastreboff2022SURMOUNT1]].`,"medtrials"],
 ["Survodutide",`A glucagon/GLP-1 dual agonist with a non-inferior cardiovascular safety trial (HR 0.89) [[Bozkurt2026SYNCHRONIZECVOT]].`,"frontier"],
 ["Thiamine (vitamin B1)",`A vitamin whose deficiency after surgery, often with vomiting, risks Wernicke-Korsakoff syndrome [[Lupoli2017]].`,"aftersurgery"],
 ["Time-restricted eating",`Eating in a daily window; no better than calorie restriction alone at 12 months [[Liu2022TRE]].`,"lifestyle"],
 ["Tirzepatide",`A weekly dual GIP and GLP-1 receptor agonist with a half-life of about 5 days [[FDA-Zepbound]].`,"glp"],
 ["Total diet replacement",`Formula-only diet for a set period; 825-853 kcal a day for 3-5 months in DiRECT, as published [[Lean2018DiRECT]].`,"lifestyle"],
 ["UCP1",`Uncoupling protein 1, which lets brown and beige fat burn energy as heat [[Becher2021,Wu2012]].`,"adipose"],
 ["Ultra-processed food",`Industrial foods; in a ward trial they led to 508 kcal a day more intake [[Hall2019UPF]].`,"causes"],
 ["Visceral fat",`Fat inside the abdomen, more strongly linked to metabolic risk than subcutaneous fat [[Fox2007Framingham]].`,"adipose"],
 ["Waist circumference",`A "vital sign" giving information beyond BMI, per IAS/ICCR [[Ross2020IASICCR]].`,"measuring"],
 ["Waist-to-height ratio",`Waist divided by height; 0.5 is a common boundary [[Browning2010,Ashwell2012]].`,"measuring"],
 ["Weight stigma",`"Social devaluation and denigration of individuals because of their excess body weight" [[Rubino2020Stigma]].`,"stigma"],
 ["Weight discrimination",`Unfair treatment because of weight, linked to about 60% higher mortality [[Sutin2015]].`,"stigma"],
 ["Wernicke-Korsakoff syndrome",`Brain damage from thiamine deficiency, a risk with vomiting after bariatric surgery [[Lupoli2017]].`,"aftersurgery"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'stop-bang', 'stop bang' or 'stopbang' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  const L0=GS_T.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GS_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 5.5 sources =============== */
const SR_AREAN={A:'Definitions, measurement, epidemiology & history',B:'Causes: genetics, environment & risk factors',C:'Physiology: appetite, adipose tissue & energy balance',D:'Complications, comorbidities & clinical assessment',E:'Lifestyle & behavioural treatment',F:'Anti-obesity medications',G:'Metabolic & bariatric surgery',H:'Children, pregnancy, stigma, living with obesity & nursing',I:'Research frontier'};
const SR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const srSvc=s=>s.unverified?[]:SR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text; a trailing comma is dropped */
const srLink=s=>{let l=(s.link||'').replace(/[,.;]+$/,'');if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(SR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[ ['all','%t:sources.all%'] ].concat(used.map(a=>[a,SR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>srSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=srSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=srLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
