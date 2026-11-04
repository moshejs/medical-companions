/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding cirrhosis",2:"Part 2 · Causes",3:"Part 3 · Diagnosis & staging",4:"Part 4 · Complications",5:"Part 5 · Treatment & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding cirrhosis ---- */
 [1,`What is cirrhosis?`,`A long period of inflammation replaces healthy liver tissue with fibrous scar and regenerative nodules, which leads to portal hypertension [[Gines2021Lancet]]. Under the microscope: regenerative nodules surrounded by fibrous bands [[Schuppan2008]].`],
 [1,`Is cirrhosis an alcohol disease?`,`Not only. Causes include obesity and fatty liver disease, high alcohol intake, hepatitis B or C, autoimmune and cholestatic diseases, and iron or copper overload [[Gines2021Lancet]]. In the US many people have more than one cause [[Tapper2023JAMA]].`],
 [1,`How many deaths did cirrhosis cause worldwide in 2017?`,`More than 1.32 million, or 2.4% of all deaths, up from fewer than 899,000 in 1990 [[GBD2020Cirrhosis]].`],
 [1,`If deaths rose from 1990 to 2017, did the death rate rise too?`,`No. The age-standardised death rate fell from 21.0 to 16.5 per 100,000; counts rose mainly because the population grew and aged [[GBD2020Cirrhosis]].`],
 [1,`How many US adults with laboratory evidence of cirrhosis knew they had liver disease?`,`Only about 3 in 10: 69% were unaware (NHANES 1999–2010) [[Scaglione2015]].`],
 [1,`How do compensated and decompensated cirrhosis differ in survival?`,`Median survival over 12 years when compensated, under 2 years when decompensated. These are population statistics [[Zipprich2012,DAmico2006]].`],
 [1,`Where does the liver's blood come from?`,`75–80% through the portal vein from the gut and spleen, about 25% from the hepatic artery. The liver gets nearly 25% of cardiac output at about 2.5% of body weight [[Eipel2010]].`],
 [1,`Which lobule zone gets the most oxygen?`,`Zone 1, periportal. Zone 3, around the central vein, gets the least [[Trefts2017,Kietzmann2017]].`],
 [1,`Where do stellate cells live, and what do they store?`,`In the space of Disse, between hepatocytes and sinusoidal cells. They hold 80–90% of the liver's vitamin A [[Friedman2008PhysiolRev]].`],
 [1,`Which cells make most of the scar?`,`Activated stellate cells (myofibroblasts): 82–96% of myofibroblasts in mouse fate-tracing [[Mederacke2013]].`],
 [1,`Can scar in the liver shrink?`,`Yes, when the cause is removed (Established) [[Kisseleva2021]]. After 5 years of tenofovir, 74% of people with cirrhosis on biopsy no longer met criteria for cirrhosis [[Marcellin2013]].`],
 [1,`What limits regression?`,`Matrix cross-linking by tissue transglutaminase and failed stellate-cell apoptosis, in a rat model [[Issa2004]]. When cirrhosis becomes truly irreversible is not established [[GarciaTsao2010]].`],
 [1,`How fast does untreated hepatitis C scar the liver?`,`A median 0.133 METAVIR units a year, about 30 years to cirrhosis, from 13 to 42 years depending on age, sex and alcohol [[Poynard1997]].`],
 /* ---- Part 2: causes ---- */
 [2,`How many heavy drinkers get fatty liver, and how many get severe disease?`,`Fatty liver in about 90%; only about 10–20% develop alcohol-associated hepatitis or cirrhosis (ACG 2018) [[Singal2018ACG]].`],
 [2,`At the same intake, who has the higher cirrhosis risk: women or men?`,`Women. One drink a day raised risk in women but not men, and women's risk was higher at every level [[Roerecke2019Cirrhosis]].`],
 [2,`Does drinking pattern matter?`,`Yes. At the same total intake, daily drinking raised cirrhosis risk (RR 1.71 in men, 1.56 in women) (Early evidence) [[LlamosasFalcon2023]].`],
 [2,`Which gene variant raises risk for both alcohol-related cirrhosis and MASLD?`,`PNPLA3 rs738409 (I148M), with TM6SF2 and MBOAT7 [[Buch2015NatGenet,Romeo2008PNPLA3]]. AASLD does not recommend genetic testing, as it does not change management [[Rinella2023AASLD]].`],
 [2,`What lab pattern fits alcohol-associated hepatitis in the NIAAA criteria?`,`AST over 50 IU/L, AST/ALT over 1.5, both under 400 IU/L, and bilirubin over 3.0 mg/dL, with jaundice within 8 weeks [[Crabb2016NIAAA]].`],
 [2,`What did STOPAH show?`,`Prednisolone: 28-day mortality OR 0.72 (P = 0.06), no 90-day or 1-year benefit, and serious infections 13% vs 7%. Pentoxifylline did not help [[Thursz2015STOPAH]].`],
 [2,`What does a Lille score of 0.45 or more mean?`,`Non-response to steroids at about day 7: 6-month survival 25% vs 85% below it [[Louvet2007Lille]].`],
 [2,`What did the first early-transplant study in severe alcohol-associated hepatitis find?`,`6-month survival 77% vs 23% in matched controls, in 26 highly selected people (fewer than 2% of admissions) [[Mathurin2011NEJM]].`],
 [2,`How often does decompensated alcohol-related cirrhosis recompensate after stopping drinking?`,`12.3% at 1 year, 23.4% at 2 years and 33.8% at 5 years; stopping within a month doubled the chance [[Hofer2026JHep]].`],
 [2,`What is MASLD?`,`Steatotic liver disease plus at least 1 of 5 cardiometabolic risk factors; it replaced NAFLD in 2023, and MASH replaced NASH [[Rinella2023MASLD]].`],
 [2,`How much weight loss reversed MASH in the lifestyle biopsy study?`,`At 10% or more: NASH resolution in 90% and fibrosis regression in 45% [[VilarGomez2015]].`],
 [2,`What does the resmetirom label cover?`,`Adults with noncirrhotic MASH and F2–F3 fibrosis, with diet and exercise, under accelerated approval; avoid in decompensated cirrhosis [[FDA-Rezdiffra]].`],
 [2,`How likely is hepatitis B to become chronic?`,`90% in newborns of HBeAg-positive mothers, 25–30% in under-5s, under 5% in adults [[Terrault2018AASLD]].`],
 [2,`What did REVEAL-HBV show?`,`Cirrhosis risk rose with viral load: 4.5% at under 300 copies/mL to 36.2% at 10^6 or more; adjusted RR 6.5 [[Iloeje2006]].`],
 [2,`What happened after Taiwan's 1984 universal hepatitis B vaccination?`,`Liver cancer in children aged 6–14 fell from 0.70 to 0.36 per 100,000: a vaccine preventing cancer [[Chang1997NEJM]].`],
 [2,`Why test for hepatitis B before curing hepatitis C?`,`DAA labels carry a boxed warning: HBV can reactivate, sometimes fatally [[FDA-Epclusa,FDA-Mavyret]].`],
 [2,`How well do modern hepatitis C tablets work?`,`SVR12 about 99%, including compensated cirrhosis [[Feld2015ASTRAL1,Forns2017EXPEDITION1]].`],
 [2,`In haemochromatosis, which ferritin level makes cirrhosis unlikely?`,`Below 1,000 µg/L: probability about 7.4%, vs 72% above it [[Morrison2003,Kowdley2019ACG]].`],
 [2,`How often are Kayser–Fleischer rings seen in Wilson disease?`,`Almost 100% in neurological disease, 40–50% in hepatic disease, 20–30% before symptoms [[Czlonkowska2018]].`],
 /* ---- Part 3: diagnosis & staging ---- */
 [3,`Why do some call "liver function tests" a misnomer?`,`ALT, AST, ALP and bilirubin mostly show injury or blocked bile flow; ACG prefers "liver chemistries" or "liver tests" [[Kwo2017ACG]].`],
 [3,`Why are platelets often low in cirrhosis?`,`Splenic sequestration, marrow suppression and less thrombopoietin [[Afdhal2008Platelets]]. Platelets under 160 ×10³/µL raise the likelihood of cirrhosis (LR 6.3) [[Udell2012JAMA]].`],
 [3,`What is the best single ultrasound sign of cirrhosis?`,`Liver surface nodularity: specificity 95%, LR+ 11.6 [[Colli2003US]].`],
 [3,`How often do two biopsies from the same liver disagree?`,`33.1% differed by at least one stage; in 14.5% one lobe read as cirrhosis and the other as stage 3 [[Regev2002]].`],
 [3,`What is the FIB-4 formula?`,`Age × AST / (platelets × √ALT) [[Sterling2006FIB4]].`],
 [3,`Which FIB-4 cut-offs are used in MASLD?`,`Below 1.3 low risk, 1.3–2.67 intermediate, above 2.67 high [[Rinella2023AASLD,Shah2009FIB4]].`],
 [3,`How does age change FIB-4?`,`Unreliable at 35 or younger (AUROC 0.60); specificity falls to 35% at 65 or older, where 2.0 was proposed [[McPherson2017Age]].`],
 [3,`What is Baveno VII's "rule of 5"?`,`Liver stiffness of 10, 15, 20 and 25 kPa marks rising risk of decompensation and liver-related death; under 10 kPa rules out cACLD [[deFranchis2022BavenoVII]].`],
 [3,`How can elastography rule clinically significant portal hypertension in or out?`,`Out: LSM 15 kPa or less with platelets 150 ×10⁹/L or more. In: LSM 25 kPa or more [[deFranchis2022BavenoVII]].`],
 [3,`How often is a FibroScan result unusable?`,`Failure 3.1% and unreliable 15.8%: nearly 1 in 5, mostly with BMI over 30 or inexperienced operators [[Castera2010Pitfalls]].`],
 [3,`What goes into Child–Pugh?`,`Bilirubin, albumin, INR, ascites and encephalopathy, 1–3 points each: A 5–6, B 7–9, C 10–15 [[Costa2023ChildB,InfanteRivard1987]].`],
 [3,`What was MELD built for?`,`Predicting survival after elective TIPS (Mayo, 2000) from bilirubin, creatinine, INR and cause [[Malinchoc2000]], then validated as MELD in 2001 [[Kamath2001MELD]].`],
 [3,`MELD or Child–Pugh for 3-month waitlist death?`,`C-statistic 0.83 for MELD vs 0.76 for Child–Turcotte–Pugh [[Wiesner2003]].`],
 [3,`What did MELD 3.0 add?`,`Female sex and albumin, two interaction terms and a creatinine cap of 3.0 mg/dL; US allocation adopted it in July 2023 [[Kim2021MELD3,Akabane2025MELD3]].`],
 /* ---- Part 4: complications ---- */
 [4,`Which HVPG defines clinically significant portal hypertension?`,`10 mmHg or more; HVPG is the gold standard [[deFranchis2022BavenoVII]].`],
 [4,`Below which HVPG was variceal bleeding not seen in the classic series?`,`12 mmHg [[GarciaTsao1985Hepatology]]. A fall to 12 or less, or by 20%, protected against rebleeding [[Feu1995Lancet]].`],
 [4,`What did PREDESCI show?`,`β-blockers cut decompensation or death from 27% to 16%, mainly by preventing ascites [[Villanueva2019PREDESCI]].`],
 [4,`Which β-blocker does Baveno VII prefer in compensated cirrhosis?`,`Carvedilol, which adds α1-blocking vasodilation [[deFranchis2022BavenoVII]].`],
 [4,`What is the acute variceal bleeding bundle?`,`Vasoactive drug as soon as possible for 2–5 days, antibiotics from admission, endoscopy within 12 h with band ligation, and transfusion to Hb 7–8 g/dl [[deFranchis2022BavenoVII]].`],
 [4,`What did the early TIPS trial find?`,`1-year survival 86% vs 61% with TIPS within 72 h in high-risk patients [[GarciaPagan2010NEJM]].`],
 [4,`What does a SAAG of 1.1 g/dl or more mean?`,`Portal-hypertensive ascites, about 97% accuracy [[EASL2018Decomp,Runyon1992AnnIntern]].`],
 [4,`How is SBP diagnosed?`,`Ascitic neutrophils above 250 cells/µl; culture is negative in up to 60% [[EASL2018Decomp]].`],
 [4,`Why give albumin in SBP?`,`In the Sort trial, albumin with cefotaxime cut renal impairment from 33% to 10% and in-hospital death from 29% to 10% [[Sort1999NEJM]].`],
 [4,`How much albumin does EASL quote after large-volume paracentesis?`,`8 g per litre removed when more than 5 L is drained, as published [[EASL2018Decomp]].`],
 [4,`What did CONFIRM show for terlipressin in HRS?`,`HRS reversal 32% vs 17%, with more respiratory deaths; the label carries a boxed warning for respiratory failure [[Wong2021CONFIRM,FDA-Terlivaz]].`],
 [4,`What separates West Haven grade I from grade II?`,`Grade I: oriented, with trivial lack of awareness. Grade II: disorientation for time, and asterixis [[Vilstrup2014HE]].`],
 [4,`What most often triggers episodic overt HE?`,`Infection, then GI bleeding and diuretic overdose [[Vilstrup2014HE]].`],
 [4,`Does a high ammonia level diagnose HE?`,`No: alone it adds no diagnostic, staging or prognostic value [[Vilstrup2014HE]].`],
 [4,`How much did rifaximin cut breakthrough HE?`,`22.1% vs 45.9% over 6 months; more than 90% also took lactulose [[Bass2010Rifaximin]].`],
 [4,`What liver cancer surveillance does AASLD recommend?`,`Ultrasound and AFP about every 6 months [[Singal2023AASLDHCC]].`],
 [4,`How sensitive is ultrasound for early HCC?`,`47% alone, 63% with AFP [[Tzartzeva2018]]. Only 24.0% of people with cirrhosis get surveillance [[Wolf2021Surveillance]].`],
 [4,`What are the Milan criteria?`,`One tumour 5 cm or less, or up to 3 each 3 cm or less, with no macrovascular invasion [[Mazzaferro1996Milan]].`],
 [4,`What 28-day mortality did CANONIC report for ACLF?`,`33.9% with ACLF at enrolment vs 1.9% without [[Moreau2013CANONIC]].`],
 [4,`What does Baveno VII require for recompensation?`,`Cause removed, no ascites, HE or variceal rebleeding off treatment for 12 months or more, and stable improvement in albumin, INR and bilirubin [[deFranchis2022BavenoVII]].`],
 /* ---- Part 5: treatment & living ---- */
 [5,`At what MELD does transplant start to beat waiting?`,`Not at low MELD: first-year mortality was higher with transplant at MELD 6–11 (HR 3.64); benefit rose with MELD [[Merion2005]].`],
 [5,`How many US liver transplants were done in 2023 and 2024?`,`10,659 and 11,458, both records; 1-year patient survival 93.5% (2024 report) [[Kwong2025OPTN,Kwong2026SRTR]].`],
 [5,`Is protein restricted in HE?`,`No. EASL: "Avoid protein restriction in patients with HE"; targets are 1.2–1.5 g/kg/day [[EASL2019Nutrition,Lai2021AASLD]].`],
 [5,`What did the late-evening snack trial show?`,`710 kcal at night added about 2 kg of lean tissue over 12 months; the same supplement by day did not [[Plank2008]].`],
 [5,`What maximum gap between meals while awake does AASLD give?`,`3–4 hours [[Lai2021AASLD]].`],
 [5,`What makes up the Liver Frailty Index?`,`Grip strength, chair stands and balance; frail at 4.4 or more (AASLD) [[Lai2017LFI,Lai2021AASLD]].`],
 [5,`Which painkiller does AASLD prefer first in cirrhosis?`,`Paracetamol (acetaminophen) up to 2 g a day, as published; systemic NSAIDs should be avoided [[Rogal2022AASLD]].`],
 [5,`Which acid-suppressing medicines are linked to HE and SBP?`,`Proton pump inhibitors: HE aHR 1.36, SBP aHR 1.72 in cirrhosis with ascites [[Dam2016PPI]].`],
 [5,`What does LiverHope ask nurses to do after large-volume paracentesis?`,`BP every 15 minutes for 2 hours, then every 30 minutes for 2 hours, and check the puncture site [[Fabrellas2020LiverHope]].`],
 [5,`How strongly does covert HE predict falls?`,`1-year falls 52.3% with cognitive dysfunction vs 6.5% without [[Soriano2012]].`],
 [5,`How many people are readmitted after a decompensation?`,`37% within 1 month [[Volk2012Readmit]]; HE is most strongly linked to readmission [[Tapper2016Readmit]].`],
 [5,`When can palliative care start?`,`At any stage, alongside disease-directed treatment; only 11% of people with cirrhosis are referred [[Rogal2022AASLD]].`],
 [5,`What is the first step for muscle cramps?`,`Check electrolytes and replete potassium, magnesium and zinc [[Rogal2022AASLD]].`],
 [5,`Did simvastatin with rifaximin prevent ACLF in LIVERHOPE-EFFICACY?`,`No (17.9% vs 14.2%), and 2.6% developed rhabdomyolysis [[Pose2025LIVERHOPE]].`],
 /* ---- Part 6: history ---- */
 [6,`Who named cirrhosis, and from what word?`,`René Laennec in 1819, from Greek kirrhos, "tawny", in a footnote [[Duffin1987]].`],
 [6,`When did the Child and Pugh scores appear?`,`Child–Turcotte in 1964 for portal hypertension surgery; Pugh's modification in 1973 [[ChildTurcotte1964,Pugh1973]].`],
 [6,`When was the first human liver transplant?`,`1963, by Starzl; none of the first five survived beyond 23 days. A successful series began in 1967 [[Starzl1963,Meirelles2015]].`],
 [6,`Which drug made transplant practical from 1979?`,`Cyclosporin A, reported by Calne [[Calne1979]].`],
 [6,`When and where was the first stent-supported TIPS?`,`1989, Heidelberg (Richter and colleagues), after an experimental shunt in 1969 [[Richter1989Radiologe,Rosch1969]].`],
 [6,`When was hepatitis C discovered?`,`1989 (Choo, Houghton and colleagues); the 2020 Nobel Prize honoured Alter, Houghton and Rice [[Choo1989,Lin2021Nobel]].`],
 [6,`When did the FDA first approve sofosbuvir?`,`6 December 2013 [[FDA-Sovaldi]].`],
 [6,`When did NAFLD become MASLD?`,`2023, through a multisociety Delphi process [[Rinella2023MASLD]].`]
];
const RV_MN=[
 ["ABCDE of Child–Pugh","memory aid",`<b>A</b>lbumin, <b>B</b>ilirubin, <b>C</b>lotting (PT/INR), <b>D</b>istension (ascites), <b>E</b>ncephalopathy: 1–3 points each, A 5–6, B 7–9, C 10–15 [[Costa2023ChildB,InfanteRivard1987]].`],
 ["Rule of 5","Baveno VII",`Liver stiffness of <b>10, 15, 20, 25</b> kPa marks rising risk. Under 10 rules out cACLD; over 15 is highly suggestive [[deFranchis2022BavenoVII]].`],
 ["Fluid, fog, bleed","memory aid",`The three Baveno VII decompensating events: overt <b>ascites</b>, overt <b>HE</b> (West Haven grade II or higher) and <b>variceal bleeding</b> [[deFranchis2022BavenoVII]].`],
 ["Drugs, bugs, scope, blood","memory aid",`The variceal bleed bundle: vasoactive <b>drugs</b> early for 2–5 days, antibiotics for <b>bugs</b> from admission, a <b>scope</b> within 12 h, and <b>blood</b> to Hb 7–8 g/dl [[deFranchis2022BavenoVII]].`],
 ["B-C-I, then sodium, then sex","memory aid",`MELD uses <b>B</b>ilirubin, <b>C</b>reatinine and <b>I</b>NR [[Kamath2001MELD]]; MELD-Na added sodium in 2008 [[Kim2008MELDNa]]; MELD 3.0 added female sex and albumin [[Kim2021MELD3]].`],
 ["One five, or three threes","memory aid",`Milan criteria: <b>one</b> tumour of 5 cm or less, or up to <b>three</b> each 3 cm or less, with no macrovascular invasion [[Mazzaferro1996Milan]].`],
 ["250 and 1.5–1","memory aid",`SBP when ascitic neutrophils exceed <b>250</b> cells/µl; albumin <b>1.5</b> g/kg on day 1 and <b>1</b> g/kg on day 3, as published [[EASL2018Decomp,Sort1999NEJM]].`],
 ["Two or three a day","memory aid",`Lactulose is titrated to 2–3 soft stools a day [[Vilstrup2014HE,FDA-Enulose]]. Lactulose after the first episode; rifaximin added after the second [[Vilstrup2014HE]].`],
 ["Every six months","memory aid",`HCC surveillance: ultrasound with AFP about every 6 months in cirrhosis, continued after hepatitis C cure [[Singal2023AASLDHCC,Kanwal2017]].`],
 ["High gradient, high pressure","memory aid",`SAAG of <b>1.1</b> g/dl or more points to portal hypertension as the cause of ascites [[EASL2018Decomp,Runyon1992AnnIntern]].`]
];
/* the five Child–Pugh measures on the ABCDE memory aid, with illustrative example points */
const RV_CP=[
 ['A','Albumin','made by the liver',2],
 ['B','Bilirubin','cleared into bile',2],
 ['C','Clotting','prothrombin time / INR',1],
 ['D','Distension','ascites',2],
 ['E','Encephalopathy','confusion from liver failure',1]
];
const RV_STEPS=[
 {from:0,at:.1,k:'A and B',t:'The lab pair',txt:`Child–Pugh adds five measures, each scoring 1 to 3 points: bilirubin, albumin, prothrombin time or INR, ascites and encephalopathy [[Costa2023ChildB,InfanteRivard1987]]. The ABCDE order is a memory aid, not the published layout. Albumin and bilirubin are plain lab values; the ALBI grade uses only these two and performed at least as well as Child–Pugh in more than 6,000 people with liver cancer [[Johnson2015ALBI]].`,pt:'Two of the five come from a blood test: how much albumin the liver makes, and how well it clears bilirubin.',hook:'ALBI = albumin + bilirubin only; it splits Child–Pugh A into two prognostic groups.'},
 {from:.2,at:.3,k:'C',t:'Clotting replaced nutrition',txt:`Child and Turcotte's 1964 classification, built to stratify people facing portal hypertension surgery, used nutritional status [[ChildTurcotte1964,Peng2016ChildMELD]]. Pugh and colleagues replaced it with prothrombin time or INR in 1973 [[Pugh1973,Peng2016ChildMELD]].`,pt:'The liver makes clotting proteins, so a slow clotting test is one sign that it is struggling.',hook:'Pugh (1973) swapped nutritional status for PT/INR.'},
 {from:.4,at:.5,k:'D and E',t:'Two bedside judgements',txt:`Ascites and encephalopathy are the two subjective items in Child–Pugh [[Johnson2015ALBI]]. Grading HE with the West Haven criteria has limited interobserver reliability, especially for grade I [[Vilstrup2014HE]].`,pt:'Two of the five depend on what the clinician sees and hears: fluid in the belly, and changes in thinking.',hook:'The subjective pair: ascites and encephalopathy.'},
 {from:.6,at:.7,k:'Add it up',t:'From 5 to 15',txt:`Each measure scores 1 to 3, so the total runs from 5 to 15 [[Costa2023ChildB,InfanteRivard1987]]. In 177 people with cirrhosis, the three classes captured less survival variance than the continuous 5–15 score, which captured less than the component values in their original units [[InfanteRivard1987]].`,pt:'Everyone starts with 5 points; each problem that is worse adds more.',hook:'Minimum 5 (all 1s), maximum 15 (all 3s).'},
 {from:.8,at:.9,k:'Class',t:'A, B or C',txt:`The total gives class A (5–6), B (7–9) or C (10–15) [[Costa2023ChildB,InfanteRivard1987]]. Class A is the usual requirement for HCC resection and for atezolizumab–bevacizumab [[Singal2023AASLDHCC,Reig2022BCLC]]. For 3-month waitlist death, MELD's c-statistic was 0.83 vs 0.76 for Child–Turcotte–Pugh [[Wiesner2003]], though across 119 studies the two had similar prognostic value in most settings [[Peng2016ChildMELD]]. A teaching tool, not for prognosis or transplant decisions.`,pt:'Scores describe groups of people, not one person\'s future. Your team reads them alongside everything else they know about you.',hook:'Child–Pugh A 5–6 · B 7–9 · C 10–15.'}
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
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag accent">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: ABCDE of Child–Pugh ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  function draw(t){
    const N=vb(svg,'720 380','400 620');
    const L=N?{x:16,y:44,w:368}:{x:16,y:48,w:330},R=N?{x:16,y:282,w:368,h:326}:{x:362,y:20,w:342,h:344};
    const RH=N?45:58,TH=N?39:48;
    const ph=[0,.2,.4,.6,.8,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=1-ramp(t,ph[1]-.02,ph[1]+.015);
    const revAt=[[.03,.08],[.08,.13],[.23,.29],[.43,.48],[.49,.54]];
    const rev=k=>ramp(t,revAt[k][0],revAt[k][1]);
    const shown=RV_CP.map((c,k)=>Math.round(c[3]*rev(k)));
    const total=shown.reduce((a,b)=>a+b,0);
    let s='';
    const ttl=t<.2?'A and B: the lab pair':t<.4?'C: clotting':t<.6?'D and E: bedside judgements':t<.8?`Points so far: ${total}`:`Total ${total}: class ${total<=6?'A':total<=9?'B':'C'}`;
    s+=`<text class="t-lbl" x="${L.x}" y="${L.y-16}">${ttl}</text>`;
    s+=`<text class="t-xs t-end" x="${L.x+L.w}" y="${L.y-16}">example points</text>`;
    RV_CP.forEach(([ch,w,sub,p],k)=>{
      const y=L.y+k*RH,on=rev(k),hot=on>.5;
      const op=f1(.25+.75*on);
      s+=`<g style="opacity:${op}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${TH}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      s+=`<circle cx="${L.x+22}" cy="${y+TH/2}" r="${N?13:14}" style="fill:var(--brand)"/><text class="t-lbl t-mid" x="${L.x+22}" y="${y+TH/2+5}" style="fill:var(--on-brand)">${ch}</text>`;
      s+=`<text class="t-sm" x="${L.x+46}" y="${y+(N?17:21)}" style="fill:var(--ink);font-weight:700;font-size:${N?13:12.5}px">${w}</text><text class="t-xs" x="${L.x+46}" y="${y+(N?32:37)}" style="font-size:${N?11:10.5}px">${sub}</text>`;
      for(let d=0;d<3;d++){const cx=L.x+L.w-62+d*20,f=d<shown[k];
        s+=`<circle cx="${cx}" cy="${y+TH/2}" r="7" style="fill:var(${f?'--accent':'--panel-2'});stroke:var(${f?'--accent':'--line'})"/>`}
      s+='</g>'});
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const W=R.w;
    s+=`<text class="t-big t-end" x="${W-16}" y="34" style="fill:var(--accent);font-size:26px">${total}</text><text class="t-xs t-end" x="${W-16}" y="50">points</text>`;
    /* phase 0: albumin and bilirubin */
    if(v0>0){const bh=48,y1=70,y2=130,c1=rev(0),c2=rev(1);
      s+=`<g style="opacity:${f1(v0)}"><text class="t-lbl" x="16" y="30">Two lab values</text>`;
      [[y1,'Albumin','the liver makes it; low when it struggles',c1],[y2,'Bilirubin','the liver clears it; high when it struggles',c2]].forEach(([y,h,sub,c])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--brand);stroke-width:${f1(1+c*1.2)};opacity:${f1(.35+.65*c)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+20}">${h}</text><text class="t-xs" x="30" y="${y+37}">${sub}</text>`});
      s+=`<text class="t-sm" x="16" y="214" style="fill:var(--ink)">ALBI grade: these two alone</text><text class="t-xs" x="16" y="234">no bedside judgement needed</text><text class="t-xs" x="16" y="252">splits class A into two groups</text>`;
      s+='</g>'}
    /* phase 1: clotting replaced nutrition */
    const a1=vis(1);
    if(a1>0){const out=ramp(t,.24,.31),inn=ramp(t,.28,.35),bw=W-32;
      s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="30">The swap</text>`;
      s+=`<rect x="16" y="66" width="${bw}" height="46" rx="10" style="fill:var(--panel);stroke:var(--line);opacity:${f1(1-.55*out)}"/><text class="t-lbl" x="30" y="86" style="opacity:${f1(1-.5*out)}">1964 · Child–Turcotte</text><text class="t-xs" x="30" y="103" style="opacity:${f1(1-.5*out)}">used nutritional status</text>`;
      s+=`<line x1="24" x2="${f1(24+(bw-16)*out)}" y1="89" y2="89" style="stroke:var(--bad);stroke-width:2.2"/>`;
      s+=`<path d="M${W/2} 120 L${W/2} 140" style="stroke:var(--muted);stroke-width:1.6;opacity:${f1(inn)}" marker-end="url(#rvAr)"/>`;
      s+=`<rect x="16" y="150" width="${bw}" height="46" rx="10" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.8;opacity:${f1(inn)}"/><text class="t-lbl" x="30" y="170" style="opacity:${f1(inn)}">1973 · Pugh and colleagues</text><text class="t-xs" x="30" y="187" style="opacity:${f1(inn)}">prothrombin time / INR instead</text>`;
      s+=`<text class="t-xs" x="16" y="226">the liver makes clotting proteins</text><text class="t-xs" x="16" y="244">a lab value replaced a judgement</text></g>`}
    /* phase 2: the two subjective items */
    const a2=vis(2);
    if(a2>0){const c3=rev(3),c4=rev(4),bh=54;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="30">Seen at the bedside</text>`;
      [[68,'Distension','ascites: fluid in the belly',c3],[136,'Encephalopathy','West Haven grades of confusion',c4]].forEach(([y,h,sub,c])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--accent);stroke-width:${f1(1+c*1.2)};opacity:${f1(.35+.65*c)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+22}">${h}</text><text class="t-xs" x="30" y="${y+40}">${sub}</text>`;
        s+=`<rect x="${W-118}" y="${y+12}" width="88" height="20" rx="10" style="fill:var(--accent-soft);opacity:${f1(c)}"/><text class="t-xs t-mid" x="${W-74}" y="${y+26}" style="fill:var(--accent);opacity:${f1(c)}">subjective</text>`});
      s+=`<text class="t-xs" x="16" y="226">grading HE has limited agreement</text><text class="t-xs" x="16" y="244">between observers, most for grade I</text></g>`}
    /* phase 3: add it up */
    const a3=vis(3);
    if(a3>0){const x0=20,x1=W-20,X=v=>x0+(x1-x0)*v/15,gr=ease(ramp(t,.61,.68)),yb=92;
      s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="30">Five measures, one total</text>`;
      let acc=0;RV_CP.forEach(([ch,,,p],k)=>{const w=(X(acc+p)-X(acc))*gr,xs=x0+(X(acc)-x0)*gr;
        s+=`<rect x="${f1(xs)}" y="${yb}" width="${f1(Math.max(0,w-2))}" height="34" rx="5" style="fill:var(${k%2?'--brand':'--fluid-fill'});opacity:.9"/>`;
        if(gr>.9)s+=`<text class="t-sm t-mid" x="${f1(xs+w/2)}" y="${yb+22}" style="fill:var(--on-brand);font-weight:700;font-size:${w>30?12:11}px">${w>30?ch+p:ch}</text><text class="t-xs t-mid" x="${f1(xs+w/2)}" y="${yb-4}">${w>30?'':p}</text>`;
        acc+=p});
      s+=`<line x1="${x0}" x2="${x1}" y1="${yb+44}" y2="${yb+44}" class="axis"/>`;
      [0,5,10,15].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${yb+44}" y2="${yb+49}" class="axis"/><text class="t-xs t-mid" x="${f1(X(v))}" y="${yb+62}">${v}</text>`});
      s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${yb-12}" y2="${yb+44}" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:3 3"/><text class="t-xs" x="${f1(X(5)+4)}" y="${yb-16}" style="fill:var(--good)">all 1s = 5</text>`;
      s+=`<line x1="${f1(X(15))}" x2="${f1(X(15))}" y1="${yb-12}" y2="${yb+44}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3"/><text class="t-xs t-end" x="${f1(X(15)-4)}" y="${yb-16}" style="fill:var(--bad)">all 3s = 15</text>`;
      s+=`<text class="t-sm" x="16" y="200" style="fill:var(--ink)">each measure: 1, 2 or 3 points</text><text class="t-xs" x="16" y="220">cut-offs for each are in the scores module</text><text class="t-xs" x="16" y="238">the continuous score holds more information</text></g>`}
    /* phase 4: the class */
    const a4=vis(4);
    if(a4>0){const x0=20,x1=W-20,X=v=>x0+(x1-x0)*(v-5)/10,yb=86,mv=lerp(5,total,ease(ramp(t,.81,.88)));
      s+=`<g style="opacity:${f1(a4)}"><text class="t-lbl" x="16" y="30">Class A, B or C</text>`;
      [[5,6.5,'A','5–6','--good'],[6.5,9.5,'B','7–9','--warn'],[9.5,15,'C','10–15','--bad']].forEach(([a,b,cl,rgL,col])=>{
        s+=`<rect x="${f1(X(a))}" y="${yb}" width="${f1(X(b)-X(a)-2)}" height="34" rx="6" style="fill:var(${col});opacity:.85"/><text class="t-lbl t-mid" x="${f1((X(a)+X(b))/2)}" y="${yb+22}" style="fill:var(--on-brand)">${cl}</text><text class="t-xs t-mid" x="${f1((X(a)+X(b))/2)}" y="${yb+52}">${rgL}</text>`});
      s+=`<path d="M${f1(X(mv))} ${yb-4} l-7 -12 h14 z" style="fill:var(--ink)"/><text class="t-xs t-mid" x="${f1(X(mv))}" y="${yb-20}" style="fill:var(--ink)">example ${Math.round(mv)}</text>`;
      const o1=ramp(t,.88,.92),o2=ramp(t,.92,.96);
      s+=`<g style="opacity:${f1(o1)}"><text class="t-sm" x="16" y="182" style="fill:var(--ink)">class A: usual requirement for</text><text class="t-xs" x="16" y="200">HCC resection and atezolizumab–bevacizumab</text></g>`;
      s+=`<g style="opacity:${f1(o2)}"><text class="t-sm" x="16" y="232" style="fill:var(--ink)">3-month waitlist death, c-statistic:</text><text class="t-xs" x="16" y="250">MELD 0.83 vs Child–Pugh 0.76</text></g>`;
      s+=`<text class="t-xs" x="16" y="${R.h-16}" style="fill:var(--muted)">a teaching tool, not a prognosis</text></g>`}
    s+='</g>';
    svg.innerHTML=`<defs>${marker('rvAr')}</defs>`+s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 /* ---- Part 1 ---- */
 [1,`In GBD 2017, cirrhosis and other chronic liver diseases caused about what share of all deaths worldwide?`,[`2.4%`,`0.2%`,`12%`,`24%`],0,`More than 1.32 million deaths, 2.4% of the total, up from 1.9% in 1990 [[GBD2020Cirrhosis]].`],
 [1,`Which statement about the causes of cirrhosis is correct?`,[`Only alcohol causes cirrhosis`,`Hepatitis C is the only viral cause`,`Causes include MASLD, alcohol, hepatitis B and C, autoimmune and cholestatic disease, and iron or copper overload`,`Cirrhosis is always inherited`],2,`Cirrhosis has many causes [[Gines2021Lancet]].`],
 [1,`In NHANES 1999–2010, what share of US adults with laboratory evidence of cirrhosis were unaware of liver disease?`,[`9%`,`29%`,`49%`,`69%`],3,`About 7 in 10 did not know [[Scaglione2015]].`],
 [1,`Median survival in compensated vs decompensated cirrhosis, as summarised from D'Amico's review, is about:`,[`Over 12 years vs under 2 years`,`2 years vs 12 years`,`6 months vs 1 month`,`The same in both`],0,`Population statistics, not individual predictions [[Zipprich2012,DAmico2006]].`],
 [1,`What share of the liver's blood inflow comes through the portal vein?`,[`10%`,`75–80%`,`25%`,`100%`],1,`The hepatic artery supplies the remaining ~25% [[Eipel2010]].`],
 [1,`Which cytokine is described as the strongest fibrogenic signal?`,[`Insulin`,`PDGF`,`Interleukin-2`,`TGF-β1`],3,`PDGF is the most potent stellate-cell mitogen; TGF-β1 drives matrix synthesis and blocks its breakdown [[Bataller2005]].`],
 [1,`After 5 years of tenofovir, what share of people with cirrhosis on biopsy no longer had cirrhosis?`,[`4%`,`74%`,`24%`,`100%`],1,`71 of 96 people (Ishak 5–6 at baseline) [[Marcellin2013]].`],
 [1,`In untreated hepatitis C, which factor did NOT speed fibrosis progression in Poynard's cohort?`,[`Infection after age 40`,`Drinking 50 g of alcohol or more a day`,`HCV genotype`,`Male sex`],2,`Genotype had no effect [[Poynard1997]].`],
 [1,`Which feature limits regression of scar in experimental cirrhosis?`,[`Matrix cross-linking by tissue transglutaminase`,`Too many fenestrae`,`High vitamin A stores`,`Low bilirubin`],0,`Residual septa were hypocellular and cross-linked [[Issa2004]].`],
 /* ---- Part 2 ---- */
 [2,`About what share of chronic heavy drinkers develop severe forms such as alcohol-associated hepatitis or cirrhosis?`,[`90%`,`50%`,`10–20%`,`Under 1%`],2,`Fatty liver develops in about 90%, but only 10–20% develop severe disease [[Singal2018ACG]].`],
 [2,`At the same total intake, daily drinking compared with non-daily drinking:`,[`Raised cirrhosis risk (RR about 1.6–1.7)`,`Lowered cirrhosis risk`,`Made no difference`,`Only affected heart disease`],0,`RR 1.71 in men and 1.56 in women (Early evidence) [[LlamosasFalcon2023]].`],
 [2,`The genetic variant most strongly linked to both alcohol-related cirrhosis and MASLD is:`,[`HFE C282Y`,`PNPLA3 I148M (rs738409)`,`ATP7B`,`SERPINA1 Z`],1,`TM6SF2 and MBOAT7 are other lipid-handling loci [[Buch2015NatGenet,Romeo2008PNPLA3]].`],
 [2,`Which lab pattern fits the NIAAA criteria for alcohol-associated hepatitis?`,[`ALT over 1,000 IU/L`,`AST/ALT under 0.5`,`AST over 50, AST/ALT over 1.5, both under 400 IU/L, bilirubin over 3 mg/dL`,`Normal bilirubin`],2,`AST/ALT below 1.5 is seen in under 2% of biopsy-proven cases [[Crabb2016NIAAA]].`],
 [2,`A Lille score of 0.45 or more after about a week of steroids indicates:`,[`Non-response, with 6-month survival about 25%`,`Complete cure`,`Need for a higher steroid dose`,`Hepatitis C`],0,`Below 0.45, 6-month survival was 85% [[Louvet2007Lille]].`],
 [2,`ACG 2024 names which score as the most accurate for stratifying alcohol-associated hepatitis, with over 20 defining severe disease?`,[`Child–Pugh`,`MELD`,`FIB-4`,`APRI`],1,`A global cohort concluded Maddrey "should no longer be used" for prognosis [[Jophlin2024ACG,MoralesArraez2022]].`],
 [2,`Of people with decompensated alcohol-related cirrhosis who stopped drinking, about how many recompensated by 5 years?`,[`None`,`Almost all`,`About 1 in 3`,`About 1 in 100`],2,`33.8% at 5 years; earlier abstinence doubled the chance [[Hofer2026JHep]].`],
 [2,`Which AUD medicine has a randomised trial showing more abstinence in people with cirrhosis?`,[`Disulfiram`,`Topiramate`,`Naltrexone injection`,`Baclofen`],3,`71% vs 29% abstinent, with no hepatic side effects recorded [[Addolorato2007Lancet]].`],
 [2,`MASLD requires steatosis plus:`,[`At least 1 of 5 cardiometabolic risk factors`,`A positive hepatitis B test`,`Alcohol above 420 g a week`,`A liver biopsy`],0,`It replaced NAFLD in the 2023 Delphi nomenclature [[Rinella2023MASLD]].`],
 [2,`In the 52-week lifestyle study, people who lost 10% or more of body weight had NASH resolution in about:`,[`10%`,`30%`,`90%`,`50%`],2,`And fibrosis regression in 45% [[VilarGomez2015]].`],
 [2,`Which group does the resmetirom label cover?`,[`Decompensated cirrhosis`,`Child–Pugh C cirrhosis`,`Children with MASLD`,`Adults with noncirrhotic MASH and F2–F3 fibrosis`],3,`Accelerated approval; avoid in decompensated cirrhosis [[FDA-Rezdiffra]].`],
 [2,`The risk that acute hepatitis B becomes chronic is highest in:`,[`Newborns of HBeAg-positive mothers (about 90%)`,`Healthy adults`,`Older people`,`Teenagers`],0,`Under 5% in adults [[Terrault2018AASLD]].`],
 [2,`REVEAL-HBV showed that cirrhosis risk in untreated hepatitis B rises with:`,[`Age at vaccination`,`Baseline HBV DNA level`,`Blood group`,`Height`],1,`Adjusted RR 6.5 at 10^6 copies/mL or more [[Iloeje2006]].`],
 [2,`Why do HBV antiviral labels carry a boxed warning?`,[`They cause hair loss`,`They cure HBV in a week`,`Stopping them can cause severe flares of hepatitis B`,`They must be taken with alcohol`],2,`Monitoring is advised for months after stopping [[FDA-Baraclude,FDA-Viread,FDA-Vemlidy]].`],
 [2,`Before starting a direct-acting antiviral for hepatitis C, labels say to test for:`,[`Hepatitis B (HBsAg and anti-HBc)`,`Hepatitis A`,`HIV only`,`Iron`],0,`HBV reactivation has caused fulminant hepatitis and death [[FDA-Epclusa,FDA-Mavyret]].`],
 [2,`Hepatitis D infects only people who also have:`,[`Hepatitis C`,`Hepatitis B`,`Haemochromatosis`,`MASLD`],1,`EASL calls it the most aggressive viral hepatitis [[EASL2023HDV]].`],
 [2,`In Wilson disease, Kayser–Fleischer rings are found in almost all people with:`,[`Hepatic disease`,`No symptoms`,`Fatty liver`,`Neurological disease`],3,`Only 40–50% with hepatic disease [[Czlonkowska2018]].`],
 [2,`PBC is usually diagnosed from cholestatic liver tests plus:`,[`Antimitochondrial antibodies`,`A raised ferritin`,`HBsAg`,`Low caeruloplasmin`],0,`Untreated, it leads to biliary cirrhosis [[EASL2017PBC]].`],
 [2,`About what share of people with PSC also have inflammatory bowel disease?`,[`7%`,`71%`,`17%`,`100%`],1,`Mostly ulcerative colitis [[Zhang2022PSCIBD]].`],
 [2,`In population data, the most common single drug cause of drug-induced liver injury was:`,[`Paracetamol at labelled doses`,`Insulin`,`Amoxicillin–clavulanate`,`Vitamin D`],2,`22% of cases in Iceland [[Bjornsson2013]].`],
 /* ---- Part 3 ---- */
 [3,`ACG says "liver function tests" is a misnomer because ALT, AST, ALP and bilirubin:`,[`Are too expensive`,`Are never abnormal`,`Measure kidney function`,`Mostly reflect injury or blocked bile flow rather than function`],3,`ACG prefers "liver chemistries" or "liver tests" [[Kwo2017ACG]].`],
 [3,`The most accurate single ultrasound sign of cirrhosis in Colli's study was:`,[`Gallbladder wall thickness`,`Liver surface nodularity`,`Spleen colour`,`Bile duct width`],1,`Specificity 95%, LR+ 11.6 [[Colli2003US]].`],
 [3,`Paired right- and left-lobe biopsies disagreed on cirrhosis vs stage 3 in about:`,[`0%`,`50%`,`14.5%`,`90%`],2,`Sampling error, not reader error [[Regev2002]].`],
 [3,`FIB-4 is calculated from:`,[`Bilirubin, albumin and INR`,`Sodium and creatinine`,`Ferritin and transferrin`,`Age, AST, ALT and platelets`],3,`Age × AST / (platelets × √ALT) [[Sterling2006FIB4]].`],
 [3,`In MASLD, a FIB-4 below 1.3 means:`,[`Low risk of advanced fibrosis`,`Cirrhosis is certain`,`High risk`,`Biopsy is mandatory`],0,`Above 2.67 is high risk [[Rinella2023AASLD,Shah2009FIB4]].`],
 [3,`FIB-4 specificity for advanced fibrosis falls at age 65 or older; the proposed cut-off there is:`,[`0.5`,`2.0`,`5.0`,`10`],1,`It raised specificity to 70% [[McPherson2017Age]].`],
 [3,`By Baveno VII, a liver stiffness under 10 kPa (without other signs):`,[`Confirms portal hypertension`,`Means transplant is needed`,`Rules out compensated advanced chronic liver disease`,`Is always a false result`],2,`3-year risk of decompensation or liver-related death is negligible (1% or less) [[deFranchis2022BavenoVII]].`],
 [3,`Which combination rules out clinically significant portal hypertension in Baveno VII?`,[`LSM 30 kPa and low platelets`,`FIB-4 above 3.25`,`Bilirubin under 1 mg/dL`,`LSM 15 kPa or less plus platelets 150 ×10⁹/L or more`],3,`LSM 25 kPa or more rules it in [[deFranchis2022BavenoVII]].`],
 [3,`Which is NOT one of the five Child–Pugh measures?`,[`Albumin`,`Creatinine`,`Ascites`,`Encephalopathy`],1,`Creatinine is in MELD, not Child–Pugh [[Costa2023ChildB,Kamath2001MELD]].`],
 [3,`A Child–Pugh total of 8 points is class:`,[`A`,`D`,`B`,`C`],2,`A 5–6, B 7–9, C 10–15 [[Costa2023ChildB,InfanteRivard1987]].`],
 [3,`MELD began as a model to predict survival after:`,[`Kidney transplant`,`Hepatitis C cure`,`Liver biopsy`,`Elective TIPS`],3,`Mayo TIPS model, 2000 [[Malinchoc2000]].`],
 [3,`The original MELD uses:`,[`Bilirubin, creatinine and INR (plus cause)`,`Albumin and ascites`,`Age and platelets`,`Sodium only`],0,`Validated in 4 cohorts with c-statistics 0.78–0.87 [[Kamath2001MELD]].`],
 [3,`MELD 3.0 added which variables to MELD-Na?`,[`Age and weight`,`Female sex and albumin`,`Platelets and AST`,`Ferritin`],1,`It also caps creatinine at 3.0 mg/dL [[Kim2021MELD3]].`],
 [3,`On the US waiting list, MELD's c-statistic for 3-month death compared with Child–Turcotte–Pugh was:`,[`0.50 vs 0.90`,`Equal at 0.60`,`0.70 vs 0.95`,`0.83 vs 0.76`],3,`This supported MELD-based allocation [[Wiesner2003]].`],
 [3,`Nearly 1 in 5 transient elastography results cannot be interpreted. The main cause is:`,[`BMI over 30`,`Low bilirubin`,`Young age`,`Female sex`],0,`Operator experience under 500 exams also mattered [[Castera2010Pitfalls]].`],
 /* ---- Part 4 ---- */
 [4,`Clinically significant portal hypertension is defined as an HVPG of:`,[`2 mmHg or more`,`10 mmHg or more`,`30 mmHg or more`,`Any value`],1,`HVPG is the gold standard [[deFranchis2022BavenoVII]].`],
 [4,`In the classic 1985 series, variceal bleeding was not seen below an HVPG of:`,[`3 mmHg`,`25 mmHg`,`12 mmHg`,`40 mmHg`],2,`[[GarciaTsao1985Hepatology]].`],
 [4,`In PREDESCI, β-blockers reduced decompensation or death mainly by preventing:`,[`Bleeding`,`Encephalopathy`,`Liver cancer`,`Ascites`],3,`27% to 16% overall; ascites HR 0.44 [[Villanueva2019PREDESCI]].`],
 [4,`Which non-selective β-blocker does Baveno VII prefer in compensated cirrhosis?`,[`Carvedilol`,`Atenolol`,`Metoprolol`,`Bisoprolol`],0,`It adds anti-α1 vasodilation [[deFranchis2022BavenoVII]].`],
 [4,`Baveno VII's target haemoglobin for transfusion in variceal bleeding is:`,[`12–14 g/dl`,`7–8 g/dl`,`10 g/dl always`,`No transfusion ever`],1,`Adjusted for heart disease, age and ongoing bleeding [[deFranchis2022BavenoVII]].`],
 [4,`In acute variceal bleeding, endoscopy should be done:`,[`After 1 week`,`Only if bleeding recurs`,`Within 12 h once resuscitated`,`Never`],2,`[[deFranchis2022BavenoVII]].`],
 [4,`Antibiotic prophylaxis during upper GI bleeding in cirrhosis:`,[`Raises mortality`,`Has no effect`,`Is only for children`,`Reduces mortality, infections and rebleeding`],3,`RR 0.79 for death in a Cochrane review [[ChavezTapia2010Cochrane]].`],
 [4,`Pre-emptive TIPS within 72 h in high-risk variceal bleeding improved 1-year survival in the original RCT from:`,[`61% to 86%`,`86% to 61%`,`10% to 12%`,`It made no difference`],0,`[[GarciaPagan2010NEJM]].`],
 [4,`The most common decompensating event in cirrhosis is:`,[`Liver cancer`,`Variceal bleeding`,`Ascites`,`Jaundice`],2,`5–10% of people with compensated cirrhosis develop it each year [[EASL2018Decomp]].`],
 [4,`A serum–ascites albumin gradient (SAAG) of 1.1 g/dl or more indicates:`,[`Tuberculosis`,`Pancreatitis`,`Cancer of the ovary`,`Portal hypertension`],3,`About 97% accuracy [[EASL2018Decomp,Runyon1992AnnIntern]].`],
 [4,`Spontaneous bacterial peritonitis is diagnosed by an ascitic neutrophil count above:`,[`250 cells/µl`,`25 cells/µl`,`2,500 cells/µl`,`25,000 cells/µl`],0,`Cultures are negative in up to 60% [[EASL2018Decomp]].`],
 [4,`In the Sort trial, adding albumin to cefotaxime for SBP:`,[`Raised mortality`,`Cut renal impairment and in-hospital death`,`Had no effect`,`Caused SBP`],1,`Renal impairment 33% to 10%; in-hospital death 29% to 10% [[Sort1999NEJM]].`],
 [4,`EASL quotes albumin after large-volume paracentesis of more than 5 L at:`,[`1 g per litre`,`100 g per litre`,`8 g per litre removed`,`None at all`],2,`As published, not an instruction [[EASL2018Decomp]].`],
 [4,`The terlipressin (Terlivaz) label carries a boxed warning for:`,[`Serious or fatal respiratory failure`,`Hair loss`,`Hearing loss`,`Low blood sugar`],0,`Do not start if SpO₂ is under 90% [[FDA-Terlivaz]].`],
 [4,`West Haven grade II hepatic encephalopathy includes:`,[`Coma`,`Disorientation for time and asterixis`,`Only abnormal psychometric tests`,`No symptoms at all`],1,`Grade II is the first overt grade [[Vilstrup2014HE]].`],
 [4,`"Covert" hepatic encephalopathy groups together:`,[`Grades III and IV`,`Grade II only`,`Minimal HE and grade I`,`All grades`],2,`Overt HE is grades II–IV [[Vilstrup2014HE]].`],
 [4,`The most common precipitant of episodic overt HE is:`,[`High protein meals`,`Exercise`,`Sunlight`,`Infection`],3,`Then GI bleeding and diuretic overdose [[Vilstrup2014HE]].`],
 [4,`A raised blood ammonia level on its own in chronic liver disease:`,[`Adds no diagnostic, staging or prognostic value`,`Confirms HE`,`Sets the West Haven grade`,`Predicts death precisely`],0,`A normal level in overt HE questions the diagnosis [[Vilstrup2014HE]].`],
 [4,`In Bass 2010, rifaximin (mostly with lactulose) changed 6-month breakthrough HE from:`,[`10% to 90%`,`22% to 46%`,`45.9% to 22.1%`,`It had no effect`],2,`HE hospitalisation fell from 22.6% to 13.6% [[Bass2010Rifaximin]].`],
 [4,`AASLD 2023 recommends HCC surveillance in cirrhosis with:`,[`CT every month`,`AFP once`,`MRI every 5 years`,`Ultrasound and AFP about every 6 months`],3,`[[Singal2023AASLDHCC]].`],
 [4,`Ultrasound alone detects early-stage HCC with a sensitivity of about:`,[`47%`,`99%`,`10%`,`84%`],0,`84% for any stage; 63% for early HCC with AFP [[Tzartzeva2018]].`],
 [4,`The Milan criteria for transplant in HCC are:`,[`Any tumour size`,`One tumour 5 cm or less, or up to 3 each 3 cm or less, no macrovascular invasion`,`Up to 10 tumours`,`Only tumours over 10 cm`],1,`[[Mazzaferro1996Milan]].`],
 [4,`First-line systemic therapy for BCLC C with preserved liver function, per BCLC 2022, is:`,[`Sorafenib alone`,`Liver transplant`,`Atezolizumab–bevacizumab`,`Radiofrequency ablation`],2,`IMbrave150: HR for death 0.58 vs sorafenib [[Reig2022BCLC,Finn2020IMbrave150]].`],
 [4,`After hepatitis C cure, HCC incidence in people with cirrhosis:`,[`Falls to zero`,`Rises tenfold`,`Is unknown`,`Falls but stays at about 1.82 per 100 person-years`],3,`So surveillance continues [[Kanwal2017]].`],
 [4,`In CANONIC, 28-day mortality in people with ACLF at enrolment was:`,[`33.9%`,`1.9%`,`99%`,`0%`],0,`1.9% without ACLF [[Moreau2013CANONIC]].`],
 [4,`Under Baveno VII, ascites controlled by TIPS without removing the cause and without better liver function is:`,[`Recompensation`,`Not recompensation`,`Cure`,`ACLF`],1,`Recompensation needs cause removal and stable improvement in albumin, INR and bilirubin [[deFranchis2022BavenoVII]].`],
 /* ---- Part 5 ---- */
 [5,`In US data, deceased donor transplant at MELD 6–11, compared with waiting:`,[`Cut mortality by 96%`,`Had no data`,`Was linked to higher first-year mortality (HR 3.64)`,`Was not allowed`],2,`The benefit rose with MELD [[Merion2005]].`],
 [5,`A living donor liver transplant, compared with waiting for a deceased donor, was linked to:`,[`Higher mortality`,`No difference`,`Only paediatric benefit`,`Lower mortality (adjusted HR 0.56)`],3,`To be balanced against donor risk [[Berg2007A2ALL]].`],
 [5,`The tacrolimus label's boxed warning covers:`,[`Serious infections and malignancies`,`Weight gain`,`Hair growth`,`Low potassium`],0,`It also warns about grapefruit [[FDA-Prograf]].`],
 [5,`In hepatic encephalopathy, current guidelines say protein intake should be:`,[`Restricted to 0.5 g/kg`,`Not restricted: 1.2–1.5 g/kg/day`,`Stopped entirely`,`Only from supplements`],1,`Normal to high protein "does not precipitate HE" [[EASL2019Nutrition,Lai2021AASLD]].`],
 [5,`A 710 kcal supplement taken at night for 12 months, compared with daytime:`,[`Caused HE`,`Made no difference`,`Added about 2 kg of lean tissue`,`Lowered albumin`],2,`[[Plank2008]].`],
 [5,`AASLD 2021 suggests a maximum gap between meals while awake of:`,[`12 hours`,`8 hours`,`1 hour`,`3–4 hours`],3,`With an early breakfast or late-evening snack [[Lai2021AASLD]].`],
 [5,`The Liver Frailty Index combines:`,[`Grip strength, chair stands and balance`,`Bilirubin and INR`,`Height and weight`,`Ammonia and sodium`],0,`Frail at 4.4 or more [[Lai2017LFI,Lai2021AASLD]].`],
 [5,`AASLD palliative guidance names which painkiller as preferred first-line, as published?`,[`Ibuprofen`,`Paracetamol (acetaminophen) up to 2 g a day`,`Codeine`,`Tramadol`],1,`Systemic NSAIDs should be avoided [[Rogal2022AASLD]].`],
 [5,`In cirrhosis with ascites, proton pump inhibitor use was linked to:`,[`Fewer infections`,`Better sleep`,`More HE and SBP`,`Lower ammonia`],2,`HE aHR 1.36; SBP aHR 1.72 [[Dam2016PPI]].`],
 [5,`LiverHope advises blood pressure checks after large-volume paracentesis:`,[`Once a week`,`Only if the patient asks`,`Never`,`Every 15 minutes for 2 hours, then every 30 minutes for 2 hours`],3,`Quoted as published [[Fabrellas2020LiverHope]].`],
 [5,`In LiverHope's nursing guidance, black tarry stools (melaena) should be taught as a sign of:`,[`Gastrointestinal bleeding`,`Good diet`,`Dehydration only`,`Normal lactulose effect`],0,`Melaena needs urgent care [[Fabrellas2020LiverHope]].`],
 [5,`In outpatients with cirrhosis, cognitive dysfunction on PHES predicted 1-year falls of:`,[`6.5%`,`52.3%`,`99%`,`1%`],1,`6.5% without cognitive dysfunction [[Soriano2012]].`],
 [5,`According to AASLD, palliative care in cirrhosis:`,[`Means stopping all treatment`,`Is only for the last week of life`,`Can be considered at any stage alongside disease-directed treatment`,`Excludes transplant candidates`],2,`Only 11% are referred [[Rogal2022AASLD]].`],
 [5,`AASLD says advance care planning should start:`,[`Only after transplant`,`Only in intensive care`,`Never`,`At the diagnosis of cirrhosis, before decompensation`],3,`And before loss of decision-making capacity [[Rogal2022AASLD]].`],
 [5,`The first step AASLD gives for muscle cramps in decompensated cirrhosis is:`,[`Check electrolytes and replete potassium, magnesium and zinc`,`Start opioids`,`Stop all diuretics forever`,`Surgery`],0,`[[Rogal2022AASLD]].`],
 [5,`Which vaccines does US ACIP list for people with chronic liver disease?`,[`None`,`Hepatitis A, hepatitis B and pneumococcal`,`Only influenza`,`Only BCG`],1,`[[Nelson2020ACIP,Weng2022ACIP,Kobayashi2022ACIP]].`],
 [5,`After a decompensation, about what share of people were readmitted within 1 month?`,[`3%`,`97%`,`37%`,`0%`],2,`22% of 30-day readmissions were possibly preventable [[Volk2012Readmit]].`],
 [5,`ACG 2024 prefers which benzodiazepines for alcohol withdrawal in poor liver function?`,[`Long-acting diazepam only`,`None ever`,`High-dose chlordiazepoxide`,`Short- and intermediate-acting agents such as lorazepam and oxazepam`],3,`With a symptom-triggered approach [[Jophlin2024ACG]].`],
 [5,`In ESSENCE, semaglutide 2.4 mg in MASH with F2–F3 fibrosis gave fibrosis reduction in:`,[`36.8% vs 22.4% on placebo`,`99% vs 1%`,`0% vs 50%`,`10% vs 10%`],0,`Steatohepatitis resolution 62.9% vs 34.3% (Established) [[Sanyal2025ESSENCE]].`],
 [5,`Normothermic machine perfusion compared with cold storage of donor livers gave:`,[`More discarded organs`,`50% lower graft injury and 50% lower discard`,`Worse survival`,`No change in anything`],1,`Survival and bile duct complications did not differ [[Nasralla2018]].`],
 /* ---- Part 6 ---- */
 [6,`Laennec named cirrhosis from the Greek kirrhos, meaning:`,[`Hard`,`Lumpy`,`Tawny`,`Small`],2,`In a footnote, 1819 [[Duffin1987]].`],
 [6,`The first human liver transplant was performed in 1963 by:`,[`Calne`,`Moore`,`Child`,`Starzl`],3,`None of the first five survived more than 23 days [[Starzl1963,Meirelles2015]].`],
 [6,`Calne reported which immunosuppressant in 1979?`,[`Cyclosporin A`,`Tacrolimus`,`Azathioprine`,`Prednisone`],0,`Tacrolimus followed in 1990 [[Calne1979,Meirelles2015]].`],
 [6,`The first stent-supported TIPS done entirely by interventional radiology was reported in:`,[`1819`,`1989, Heidelberg`,`2013`,`1964`],1,`[[Richter1989Radiologe]].`],
 [6,`Hepatitis C virus was identified in:`,[`1965`,`2001`,`1989`,`1950`],2,`The 2020 Nobel Prize recognised the discovery [[Choo1989,Lin2021Nobel]].`],
 [6,`The US adopted MELD 3.0 for liver allocation in:`,[`1999`,`2001`,`2008`,`July 2023`],3,`Partly to narrow the sex gap in access [[Kwong2025OPTN]].`],
 [6,`Pugh's 1973 modification of the Child classification appeared in a paper on:`,[`Oesophageal transection for bleeding varices`,`Hepatitis C`,`Liver transplant`,`Alcohol policy`],0,`[[Pugh1973]].`],
 [6,`The FDA first approved sofosbuvir (Sovaldi) on:`,[`10 October 2014`,`6 December 2013`,`22 May 2026`,`14 March 2024`],1,`Harvoni followed on 10 October 2014 [[FDA-Sovaldi,FDA-Harvoni]].`]
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

/* =============== 6.4 glossary =============== */
const GL_T=[
 ["ACLF (acute-on-chronic liver failure)",`A severe form of acutely decompensated cirrhosis with organ failure and high short-term mortality, driven by an excessive inflammatory response to triggers such as infection [[EASL2023ACLF]]. 28-day mortality 33.9% in CANONIC [[Moreau2013CANONIC]].`,"course"],
 ["Acamprosate",`An AUD medicine that is not metabolised by the liver; contraindicated in severe renal impairment (creatinine clearance 30 mL/min or less) [[FDA-Campral]].`,"alcohol"],
 ["Advance care planning",`An iterative process that AASLD says should start at the diagnosis of cirrhosis, before decompensation and loss of capacity [[Rogal2022AASLD]].`,"living"],
 ["AFP (alpha-fetoprotein)",`A blood marker used with ultrasound for HCC surveillance; at 20 ng/mL it is about 60% sensitive, and over 40% of HCCs have normal AFP [[Singal2023AASLDHCC]].`,"hcc"],
 ["AKI (acute kidney injury)",`In cirrhosis, a creatinine rise of 0.3 mg/dl or more within 48 h, or 50% or more within 7 days [[EASL2018Decomp]]. It affects about 20% of people hospitalised with cirrhosis [[GarciaTsao2008AKI]].`,"ascites"],
 ["ALBI grade",`A score using only albumin and bilirubin; it performed at least as well as Child–Pugh in more than 6,000 people with HCC [[Johnson2015ALBI]].`,"scores"],
 ["Albumin",`The most abundant protein the liver secretes, about 55% of plasma protein; the liver makes about 10.5 g a day [[Trefts2017,Levitt2016]].`,"liver"],
 ["Albumin infusion",`Used for SBP, AKI beyond stage 1A, large-volume paracentesis and with terlipressin for HRS-AKI, per Baveno VII [[deFranchis2022BavenoVII]].`,"ascites"],
 ["Alcohol-associated hepatitis",`An acute syndrome of jaundice and liver failure in people drinking heavily; severe cases carry 20–50% 1-month mortality (ACG 2024) [[Jophlin2024ACG]].`,"alcohol"],
 ["Alcohol-related liver disease (ARLD)",`A spectrum from fatty liver to steatohepatitis, fibrosis, cirrhosis and in some people HCC [[Seitz2018NRDP]]. AASLD uses "alcohol-associated liver diseases" [[Crabb2020AASLD]].`,"alcohol"],
 ["Alpha-1 antitrypsin deficiency",`In Pi*ZZ, misfolded Z protein builds up in hepatocytes and can cause liver fibrosis [[Strnad2022Fazirsiran]].`,"othercauses"],
 ["ALT (alanine aminotransferase)",`A liver enzyme marking hepatocellular injury; ACG gives a "true healthy normal" of 29–33 IU/L for males and 19–25 IU/L for females [[Kwo2017ACG]].`,"tests"],
 ["Ammonia",`Mostly made in the gut; cleared by the urea cycle, and in liver disease partly by muscle, which is why sarcopenia raises HE risk [[Rose2020]]. A raised level alone does not diagnose HE [[Vilstrup2014HE]].`,"encephalopathy"],
 ["Animal naming test",`Naming animals in 1 minute: fewer than 10 (age- and education-adjusted) is abnormal and predicts overt HE [[Campagna2017ANT]].`,"encephalopathy"],
 ["APRI",`AST-to-platelet ratio index; at 1.0, 76% sensitive and 72% specific for cirrhosis in hepatitis C [[Lin2011APRI]].`,"noninvasive"],
 ["Ascites",`Fluid in the abdomen, the most common decompensating event, from renal sodium retention plus portal hypertension [[EASL2018Decomp]].`,"ascites"],
 ["Asterixis",`A flapping tremor: brief loss of muscle tone while holding a posture, first called the "liver flap" [[Lui2026Asterixis]]. A sign of West Haven grade II HE [[Vilstrup2014HE]].`,"encephalopathy"],
 ["AST/ALT ratio",`Often rises above 1 as cirrhosis develops in chronic hepatitis; above 2 is usual in alcohol-related liver disease [[Williams1988ASTALT]].`,"tests"],
 ["Atezolizumab–bevacizumab",`First-choice first-line systemic therapy for BCLC C HCC with preserved liver function [[Reig2022BCLC]]; HR for death 0.58 vs sorafenib in IMbrave150 [[Finn2020IMbrave150]].`,"hcc"],
 ["Autoimmune hepatitis",`Immune attack on the liver, diagnosed from transaminases, IgG, autoantibodies and interface hepatitis; treated with steroids and azathioprine [[MieliVergani2018]].`,"othercauses"],
 ["Baclofen",`An AUD medicine with an RCT in cirrhosis: abstinence 71% vs 29% [[Addolorato2007Lancet]].`,"alcohol"],
 ["Band ligation",`Endoscopic rubber bands on varices: the recommended endoscopic treatment for oesophageal variceal bleeding [[deFranchis2022BavenoVII]].`,"portal"],
 ["Bariatric surgery",`In MASH, resolution without fibrosis worsening in 84% at 5 years [[Lassailly2020]]; major adverse liver outcomes 2.3% vs 9.6% at 10 years in SPLENDOR [[Aminian2021JAMA]].`,"masld"],
 ["Baveno VII",`The 2021 consensus on portal hypertension, latest in a series begun in Groningen in 1986 [[deFranchis2022BavenoVII]].`,"portal"],
 ["BCLC staging",`Barcelona Clinic Liver Cancer stages 0, A, B, C and D link HCC stage to treatment [[Reig2022BCLC]].`,"hcc"],
 ["Beta-blockers (NSBBs)",`Propranolol, nadolol or carvedilol lower portal pressure; PREDESCI cut decompensation or death from 27% to 16% [[Villanueva2019PREDESCI,deFranchis2022BavenoVII]].`,"portal"],
 ["Bilirubin",`A pigment the liver conjugates and excretes; a raised conjugated bilirubin implies liver disease or biliary obstruction [[Kwo2017ACG]].`,"tests"],
 ["Bulevirtide",`An HDV entry inhibitor; FDA accelerated approval on 22 May 2026 for chronic HDV without cirrhosis or with compensated cirrhosis [[FDA-Hepcludex]].`,"hepatitis"],
 ["cACLD",`Compensated advanced chronic liver disease; liver stiffness under 10 kPa rules it out and over 15 kPa is highly suggestive [[deFranchis2022BavenoVII]].`,"noninvasive"],
 ["Caput medusae",`Visible swollen veins around the navel from paraumbilical collaterals in portal hypertension. As collaterals form, gut blood flow rises [[DiazSoto2022TAG]].`,"portal"],
 ["Carvedilol",`A non-selective β-blocker with anti-α1 vasodilation; Baveno VII's preferred NSBB in compensated cirrhosis [[deFranchis2022BavenoVII]].`,"portal"],
 ["Caudate lobe hypertrophy",`In cirrhosis the right lobe shrinks and the caudate enlarges; the caudate-to-right-lobe ratio separated cirrhotic livers with 100% specificity in a small series [[Harbin1980Caudate]].`,"tests"],
 ["Child–Pugh score",`Bilirubin, albumin, INR, ascites and encephalopathy, 1–3 points each: A 5–6, B 7–9, C 10–15 [[Costa2023ChildB,InfanteRivard1987]].`,"scores"],
 ["Cholangiocytes",`The cells lining bile ducts, the second most abundant epithelial cell of the liver [[Trefts2017]].`,"liver"],
 ["Cholestatic pattern",`Alkaline phosphatase raised out of proportion to AST and ALT [[Kwo2017ACG]].`,"tests"],
 ["Cholestyramine",`First-line treatment for cholestatic itch in AASLD guidance [[Rogal2022AASLD]].`,"living"],
 ["CIWA-Ar",`A 10-item scale for alcohol withdrawal severity [[Sullivan1989CIWA]].`,"nursing"],
 ["CLDQ",`Chronic Liver Disease Questionnaire: 29 items in six domains of quality of life [[Younossi1999CLDQ]].`,"living"],
 ["Collagen",`Collagens I and III dominate the scar; advanced fibrosis holds about 6 times normal matrix [[Bataller2005]].`,"fibrosis"],
 ["Compensated cirrhosis",`Cirrhosis with no present or past complications; split by the absence or presence of CSPH [[deFranchis2022BavenoVII]].`,"course"],
 ["Covert hepatic encephalopathy",`Minimal HE plus grade I [[Vilstrup2014HE]]; pooled prevalence 40.9% [[Lv2024CHE]].`,"encephalopathy"],
 ["Cryptogenic cirrhosis",`Cirrhosis without a known cause; 73% of one series had diabetes, obesity or both, pointing to MASH [[Caldwell1999]].`,"othercauses"],
 ["CSPH (clinically significant portal hypertension)",`HVPG 10 mmHg or more [[deFranchis2022BavenoVII]].`,"portal"],
 ["Cyclosporin A",`The immunosuppressant Calne reported in 1979, which made transplant practical [[Calne1979]].`,"history"],
 ["DAAs (direct-acting antivirals)",`Hepatitis C tablets targeting NS3/4A, NS5A and NS5B; cure in more than 90% [[Manns2017NRDP]].`,"hepatitis"],
 ["Decompensation",`Overt ascites, overt HE (West Haven II or higher) or variceal bleeding [[deFranchis2022BavenoVII]].`,"course"],
 ["Diuretics",`Spironolactone, then furosemide, for ascites; EASL quotes 100–400 mg and 40–160 mg a day, as published [[EASL2018Decomp]].`,"ascites"],
 ["DILI (drug-induced liver injury)",`A diagnosis of exclusion; antimicrobials, supplements and anticancer drugs are the common causes in the West [[Chalasani2021ACG]].`,"othercauses"],
 ["Dry weight",`Body weight corrected for ascites (subtract 5%, 10% or 15%) and oedema, used for nutrition targets [[EASL2019Nutrition,Lai2021AASLD]].`,"nutrition"],
 ["Early liver transplant (alcohol-associated hepatitis)",`Transplant before 6 months of abstinence in highly selected people: 6-month survival 77% vs 23% [[Mathurin2011NEJM]].`,"transplant"],
 ["ELF test",`Enhanced Liver Fibrosis panel of hyaluronic acid, TIMP-1 and PIIINP; 9.8 or more marks higher risk in NAFLD [[Rinella2023AASLD,Rosenberg2004ELF]].`,"noninvasive"],
 ["Entecavir",`A preferred HBV antiviral; label 0.5 mg daily compensated, 1 mg decompensated, as published [[FDA-Baraclude,Terrault2018AASLD]].`,"hepatitis"],
 ["Erectile dysfunction",`Reported in 79% of men with cirrhosis in a meta-analysis [[Yoo2023ED]].`,"living"],
 ["Extracellular matrix (ECM)",`The protein scaffold, mainly collagen, that builds up in fibrosis [[Bataller2005]].`,"fibrosis"],
 ["Fazirsiran",`An RNAi drug cutting liver Z-AAT in alpha-1 antitrypsin deficiency (Early evidence) [[Strnad2022Fazirsiran,Clark2024SEQUOIA]].`,"frontier"],
 ["Fenestrae",`Pores of 50–180 nm in sinusoidal endothelial cells that let plasma reach hepatocytes [[Trefts2017]].`,"liver"],
 ["FIB-4",`Age × AST / (platelets × √ALT); in MASLD under 1.3 is low risk and over 2.67 high [[Sterling2006FIB4,Rinella2023AASLD]].`,"noninvasive"],
 ["Fibrosis",`Excessive build-up of extracellular matrix in chronic liver disease [[Bataller2005]].`,"fibrosis"],
 ["Fontan-associated liver disease",`Liver fibrosis from chronically high venous pressure after Fontan surgery; cumulative cirrhosis 32.2% at 20 years or more [[Hitawala2024Fontan]].`,"othercauses"],
 ["Frailty",`Reduced physical function; 17–43% of outpatients with cirrhosis [[Lai2021AASLD]].`,"nutrition"],
 ["Further decompensation",`A second portal hypertension event or jaundice, recurrent bleeding, ascites or HE, SBP or HRS-AKI: a stage with higher mortality [[deFranchis2022BavenoVII]].`,"course"],
 ["Gastric varices",`Present in about 20% of people with cirrhosis; they bleed less often than oesophageal varices but more severely [[EASL2018Decomp,Sarin1992Hepatology]].`,"portal"],
 ["GLP-1 receptor agonists",`Semaglutide and related drugs; ESSENCE showed MASH resolution 62.9% vs 34.3% [[Sanyal2025ESSENCE]].`,"masld"],
 ["Haemochromatosis (HFE)",`Iron overload; C282Y homozygosity in about 1 in 156 to 1 in 227 people of European descent [[Pilling2019BMJ,Adams2005HEIRS]]. Phlebotomy is the mainstay [[Kowdley2019ACG]].`,"othercauses"],
 ["HBeAg",`Hepatitis B e antigen, a marker of the replicative phase [[Fattovich2008]].`,"hepatitis"],
 ["HBsAg",`Hepatitis B surface antigen; global prevalence 3.2% (257.5 million) in 2022 [[Polaris2023HBV]].`,"hepatitis"],
 ["HCC (hepatocellular carcinoma)",`The main primary liver cancer; about 1–4% of people with cirrhosis develop it each year [[Tapper2023JAMA]].`,"hcc"],
 ["Hepatic arterial buffer response",`When portal flow falls, arterial flow rises and can buffer 25–60% of the loss [[Eipel2010]].`,"liver"],
 ["Hepatic encephalopathy (HE)",`Brain dysfunction from liver insufficiency or portosystemic shunting, from subclinical change to coma [[Vilstrup2014HE]].`,"encephalopathy"],
 ["Hepatitis B",`A virus that can persist for life, especially when caught at birth; antivirals suppress it and can reverse cirrhosis [[Terrault2018AASLD,Marcellin2013]].`,"hepatitis"],
 ["Hepatitis C",`A virus now curable in about 99% with 8–12 weeks of tablets [[Feld2015ASTRAL1,FDA-Mavyret]].`,"hepatitis"],
 ["Hepatitis D (delta)",`A defective virus needing HBV; the most aggressive viral hepatitis [[EASL2023HDV]].`,"hepatitis"],
 ["Hepatocellular pattern",`AST and ALT raised out of proportion to alkaline phosphatase [[Kwo2017ACG]].`,"tests"],
 ["Hepatocytes",`The main liver cells, doing most of its metabolic and synthetic work [[Trefts2017]].`,"liver"],
 ["Hepatostat",`The liver's ability to restore 100% of the liver-to-body-weight ratio after loss [[Michalopoulos2021]].`,"liver"],
 ["Hospice",`Comfort-focused care when life expectancy is measured in months; underused in cirrhosis [[Rogal2022AASLD]].`,"living"],
 ["HRS-AKI (hepatorenal syndrome)",`Kidney failure from renal vasoconstriction without major structural damage; treated with vasoconstrictors plus albumin, and ideally transplant [[Gines2018HRS]].`,"ascites"],
 ["HVPG (hepatic venous pressure gradient)",`Wedged minus free hepatic venous pressure, measured by a balloon catheter; the gold standard for portal pressure [[DiazSoto2022TAG,deFranchis2022BavenoVII]].`,"portal"],
 ["Hyponatraemia",`Low blood sodium: 130 mmol/L or less in 21.6% of people with cirrhosis [[Angeli2006Hepatology]].`,"ascites"],
 ["INR",`International normalised ratio, a clotting test; part of Child–Pugh and MELD [[Costa2023ChildB,Kamath2001MELD]].`,"scores"],
 ["Ishak score",`A fibrosis staging system from 0 to 6; 5–6 is cirrhosis [[Ishak1995,Marcellin2013]].`,"fibrosis"],
 ["Kayser–Fleischer rings",`Copper in Descemet's membrane of the eye in Wilson disease [[Czlonkowska2018]].`,"othercauses"],
 ["Kupffer cells",`The liver's resident macrophages, 80–90% of the body's tissue macrophages [[Bilzer2006]].`,"liver"],
 ["Lactulose",`A non-absorbable sugar, first choice for overt HE, titrated to 2–3 soft stools a day [[Vilstrup2014HE,FDA-Enulose]].`,"encephalopathy"],
 ["Large-volume paracentesis (LVP)",`Draining all the fluid in one session; first-line for grade 3 ascites [[EASL2018Decomp]].`,"ascites"],
 ["Late-evening snack",`A bedtime snack that shortens the overnight fast; 710 kcal at night added about 2 kg of lean tissue in a year [[Plank2008]].`,"nutrition"],
 ["Leipzig score",`Combines signs, copper tests and mutations for Wilson disease; 4 or more establishes the diagnosis [[Czlonkowska2018,Ferenci2003Leipzig]].`,"othercauses"],
 ["LI-RADS",`A system grading liver nodules from LR-1 (benign) to LR-5 (HCC) [[Singal2023AASLDHCC,Chernyak2018LIRADS]].`,"hcc"],
 ["Lille model",`Bilirubin change after a week of steroids, with other variables; 0.45 or more means non-response [[Louvet2007Lille]].`,"alcohol"],
 ["Liver biopsy",`A tissue sample; prone to sampling error, with major bleeding about 6 per 1,000 [[Regev2002,West2010Biopsy]].`,"tests"],
 ["Liver Frailty Index",`Grip strength, chair stands and balance; frail at 4.4 or more [[Lai2017LFI,Lai2021AASLD]].`,"nutrition"],
 ["Liver stiffness measurement (LSM)",`Elastography reading in kPa; stiffer usually means more scar [[FriedrichRust2008TE]].`,"noninvasive"],
 ["Living donor liver transplant",`Part of a living person's liver; adjusted mortality HR 0.56 vs waiting [[Berg2007A2ALL]].`,"transplant"],
 ["Lobule",`The hexagonal unit with a central vein and portal triads at the corners [[Trefts2017]].`,"liver"],
 ["LSEC (liver sinusoidal endothelial cell)",`The most permeable endothelial cells in mammals; they keep portal pressure low and stellate cells quiet [[Poisson2017]].`,"liver"],
 ["Maddrey discriminant function",`An older alcohol-associated hepatitis score; 32 or more defined severe disease [[Singal2018ACG,Maddrey1978]].`,"alcohol"],
 ["Machine perfusion",`Pumping blood or fluid through a donor liver; cut graft injury and discard by 50% vs cold storage [[Nasralla2018]].`,"frontier"],
 ["Malnutrition",`Reported in 20% of compensated and more than 50% of decompensated cirrhosis [[EASL2019Nutrition]].`,"nutrition"],
 ["MASH",`Metabolic dysfunction-associated steatohepatitis, formerly NASH [[Rinella2023MASLD]].`,"masld"],
 ["MASLD",`Metabolic dysfunction-associated steatotic liver disease: steatosis plus at least 1 of 5 cardiometabolic risk factors [[Rinella2023MASLD]].`,"masld"],
 ["MELD",`Model for End-stage Liver Disease: bilirubin, creatinine and INR [[Kamath2001MELD]].`,"scores"],
 ["MELD 3.0",`MELD-Na plus female sex and albumin, with a creatinine cap of 3.0 mg/dL; US allocation from July 2023 [[Kim2021MELD3,Kwong2025OPTN]].`,"scores"],
 ["MELD-Na",`MELD plus serum sodium (2008) [[Kim2008MELDNa]].`,"scores"],
 ["Melaena",`Black, tarry stools from upper GI bleeding; caregivers are taught to recognise it [[Fabrellas2020LiverHope]].`,"nursing"],
 ["METAVIR",`Fibrosis staging F0 to F4 (cirrhosis) and activity A0 to A3 [[Poynard1997,Bedossa1996]].`,"fibrosis"],
 ["MetALD",`MASLD plus 140–350 g a week of alcohol (women) or 210–420 g (men) [[Rinella2023MASLD]].`,"masld"],
 ["Metabolic zonation",`Division of liver functions along the lobule from periportal zone 1 to pericentral zone 3 [[Trefts2017]].`,"liver"],
 ["Milan criteria",`One HCC 5 cm or less, or up to 3 each 3 cm or less, with no macrovascular invasion [[Mazzaferro1996Milan]].`,"transplant"],
 ["Minimal hepatic encephalopathy",`Abnormal psychometric tests without clinical signs [[Vilstrup2014HE]]; linked to car crashes [[Bajaj2009Crashes]].`,"encephalopathy"],
 ["MMPs and TIMPs",`Matrix metalloproteinases break down scar; TIMPs block them. A fall in TIMP-1 permits regression [[Bataller2005,Iredale1998]].`,"fibrosis"],
 ["MR elastography",`Magnetic resonance stiffness imaging; 5 kPa or more suggests cirrhosis [[Rinella2023AASLD,Singh2015MRE]].`,"noninvasive"],
 ["Myofibroblast",`An activated, collagen-producing stellate cell [[Tsuchida2017]].`,"fibrosis"],
 ["Naltrexone",`An AUD medicine; a VA cohort found no probable drug-induced liver injury in cirrhosis (Early evidence) [[Thompson2024JHEP]].`,"alcohol"],
 ["Nodule (regenerative)",`A ball of regenerating liver tissue ringed by scar, the defining feature of cirrhosis [[Schuppan2008]].`,"fibrosis"],
 ["NSAIDs",`Ibuprofen-type medicines; AASLD advises avoiding systemic NSAIDs in cirrhosis [[Rogal2022AASLD]].`,"nutrition"],
 ["Oesophageal varices",`Swollen veins in the oesophagus from portal hypertension; first bleed at 10–15% a year [[DiazSoto2022TAG]].`,"portal"],
 ["Overt hepatic encephalopathy",`West Haven grades II–IV; occurs in 30–40% during the course of cirrhosis [[Vilstrup2014HE]].`,"encephalopathy"],
 ["Palliative care",`Specialised care for symptoms and planning, possible at any stage alongside treatment [[Rogal2022AASLD]].`,"living"],
 ["Paracetamol (acetaminophen)",`AASLD's preferred first-line analgesic, up to 2 g a day in cirrhosis, as published [[Rogal2022AASLD]].`,"nutrition"],
 ["PBC (primary biliary cholangitis)",`Autoimmune small bile duct disease; antimitochondrial antibodies plus cholestatic tests [[EASL2017PBC]].`,"othercauses"],
 ["PNPLA3 I148M",`The strongest common genetic risk variant for alcohol-related cirrhosis and MASLD [[Buch2015NatGenet,Romeo2008PNPLA3]].`,"alcohol"],
 ["Portal hypertension",`Raised pressure in the portal vein from scar, nodules and vascular tone [[DiazSoto2022TAG]].`,"portal"],
 ["Portal triad",`A branch of the portal vein, hepatic artery and bile duct at each lobule corner [[Trefts2017]].`,"liver"],
 ["Pre-emptive TIPS",`A covered TIPS within 72 h of a variceal bleed in high-risk patients [[deFranchis2022BavenoVII,GarciaPagan2010NEJM]].`,"portal"],
 ["PSC (primary sclerosing cholangitis)",`Bile duct strictures, often with IBD; high cholangiocarcinoma and colorectal cancer risk [[Karlsen2017,Zhang2022PSCIBD]].`,"othercauses"],
 ["Recompensation",`Cause removed, complications resolved off treatment for 12 months, stable albumin, INR and bilirubin [[deFranchis2022BavenoVII]].`,"course"],
 ["Regression",`Shrinkage of scar after the cause is removed (Established) [[Kisseleva2021]].`,"fibrosis"],
 ["Resmetirom",`A thyroid hormone receptor-β agonist approved for noncirrhotic MASH with F2–F3 fibrosis [[FDA-Rezdiffra,Harrison2024MAESTRO]].`,"masld"],
 ["Rifaximin",`A gut-acting antibiotic added to lactulose to prevent HE recurrence; 550 mg twice daily on the label [[FDA-Xifaxan,Bass2010Rifaximin]].`,"encephalopathy"],
 ["Rule of 5",`Baveno VII: liver stiffness of 10, 15, 20 and 25 kPa marks rising risk [[deFranchis2022BavenoVII]].`,"noninvasive"],
 ["SAAG",`Serum–ascites albumin gradient; 1.1 g/dl or more means portal hypertension [[EASL2018Decomp,Runyon1992AnnIntern]].`,"ascites"],
 ["Sarcopenia",`Loss of muscle mass; L3 skeletal muscle index under 50 cm²/m² in men and 39 cm²/m² in women [[Carey2017SMI]].`,"nutrition"],
 ["SBP (spontaneous bacterial peritonitis)",`Infection of ascites without a surgical source; ascitic neutrophils above 250 cells/µl [[EASL2018Decomp]].`,"ascites"],
 ["Sinusoids",`Low-pressure capillaries where portal and arterial blood mix on the way to the central vein [[Trefts2017,Eipel2010]].`,"liver"],
 ["Space of Disse",`The gap between hepatocytes and sinusoidal cells where stellate cells live [[Friedman2008PhysiolRev]].`,"liver"],
 ["Spironolactone",`An aldosterone antagonist for ascites; the label advises starting in hospital in cirrhosis [[FDA-Aldactone]].`,"ascites"],
 ["Statins",`Safe for cardiovascular risk in MASLD including compensated cirrhosis [[Rinella2023AASLD]]; LIVERHOPE-EFFICACY did not reduce ACLF [[Pose2025LIVERHOPE]].`,"frontier"],
 ["Stellate cell",`A vitamin A-storing cell that becomes the main scar-maker when activated [[Tsuchida2017,Friedman2008PhysiolRev]].`,"fibrosis"],
 ["Steatosis",`Fat in the liver; develops in about 90% of heavy drinkers [[Singal2018ACG]].`,"masld"],
 ["SVR (sustained virological response)",`Hepatitis C cure: no virus 12 weeks after treatment [[Manns2017NRDP]].`,"hepatitis"],
 ["Tacrolimus",`The main anti-rejection drug after liver transplant; boxed warning for serious infections and malignancies [[FDA-Prograf]].`,"transplant"],
 ["Tenofovir",`An HBV antiviral (TDF or TAF); 5 years of TDF reversed cirrhosis in 74% on biopsy [[Marcellin2013,FDA-Viread,FDA-Vemlidy]].`,"hepatitis"],
 ["Terlipressin",`A vasoconstrictor for variceal bleeding and HRS-AKI; boxed warning for respiratory failure [[FDA-Terlivaz,EASL2018Decomp]].`,"ascites"],
 ["TGF-β1",`The strongest fibrogenic cytokine [[Bataller2005]].`,"fibrosis"],
 ["Thrombocytopenia",`Low platelets, seen in up to 76% of people with chronic liver disease [[Afdhal2008Platelets]].`,"tests"],
 ["TIPS",`Transjugular intrahepatic portosystemic shunt, a stent through the liver that lowers portal pressure [[Richter1989Radiologe,deFranchis2022BavenoVII]].`,"portal"],
 ["Transient elastography (FibroScan)",`An ultrasound-based pulse measuring liver stiffness; AUROC 0.94 for cirrhosis [[FriedrichRust2008TE]].`,"noninvasive"],
 ["Ursodiol (UDCA)",`First-line PBC treatment; label 13–15 mg/kg/day, as published [[FDA-Urso]].`,"othercauses"],
 ["Variceal bleeding",`Bleeding from varices, with 15–25% 6-week mortality per episode [[EASL2018Decomp]].`,"portal"],
 ["West Haven criteria",`Grades of HE from minimal to grade IV coma [[Vilstrup2014HE]].`,"encephalopathy"],
 ["Wilson disease",`Autosomal recessive copper overload from ATP7B mutations [[Ferenci2003Leipzig,Czlonkowska2018]].`,"othercauses"],
 ["Xenotransplantation",`Using a gene-edited pig liver; first human cases are Hypothesis-stage [[Tao2025Xeno,Zhang2026Xeno]].`,"frontier"],
 ["Zone 3",`The pericentral zone of the lobule, with the least oxygen [[Trefts2017,Kietzmann2017]].`,"liver"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'meld 3.0' or 'childpugh' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, burden, natural history & history',B:'Liver biology, fibrosis mechanisms & regression',C:'Causes I: alcohol-related liver disease & MASLD',D:'Causes II: viral hepatitis & other causes',E:'Diagnosis, staging scores & liver cancer surveillance',F:'Portal hypertension, varices & bleeding, ascites, SBP & kidney injury',G:'Hepatic encephalopathy, nutrition & sarcopenia, medicine safety & liver transplant',H:'Living with cirrhosis, nursing care, palliative care & self-management'};
const SO_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SO_svc=s=>s.unverified?[]:SO_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SO_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(SO_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SO_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SO_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SO_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SO_link(s)?`<a href="${esc(SO_link(s))}" target="_blank" rel="noopener">${esc(SO_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SO_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
