/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding heart attack",2:"Part 2 · Diagnosis",3:"Part 3 · Emergency treatment",4:"Part 4 · Medicines & revascularisation",5:"Part 5 · Recovery & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding heart attack ---- */
 [1,`How many heart attacks happen in the US each year?`,`About 805,000: 605,000 first and 200,000 recurrent, roughly one every 40 seconds. About 170,000 of them are silent (AHA/NHLBI tabulation of ARIC data) [[Martin2025HDSS]].`],
 [1,`What is the average age at a first heart attack in the US?`,`65.6 years for males and 72.0 years for females [[Martin2025HDSS]].`],
 [1,`How many deaths worldwide were due to ischaemic heart disease in 2021?`,`About 8.99 million (GBD 2021) [[Martin2025HDSS]]. It was the leading age-standardised cause of death in 1990, 2019 and 2021 [[GBD2021CausesOfDeath]].`],
 [1,`How does the Fourth Universal Definition (2018) define a heart attack?`,`Acute myocardial injury, shown by a cardiac troponin above the 99th-percentile upper reference limit with a rise and/or fall, in the setting of evidence of acute myocardial ischaemia [[Thygesen2018UDMI4,Domienik2021UDMI4]].`],
 [1,`Type 1 versus type 2 MI: what is the difference?`,`Type 1 is atherothrombotic: a clot on a plaque. Type 2 is a mismatch between oxygen supply and demand caused by another illness, without acute atherothrombosis [[DeFilippis2019Type2,Domienik2021UDMI4]].`],
 [1,`What are the troponin thresholds for procedure-related MI?`,`With a normal baseline, a rise above 5× the 99th-percentile URL after PCI (type 4a) or 10× after CABG (type 5), within 48 hours, plus a clinical criterion [[Domienik2021UDMI4]].`],
 [1,`Is takotsubo syndrome counted as MI under the 2018 definition?`,`No. It is classed as another cause of myocardial injury, not as MI [[Domienik2021UDMI4]].`],
 [1,`What is MINOCA, and how common is it?`,`MI with non-obstructive coronary arteries: about 6% of MI patients (median age 55, 40% women). Cardiac MRI showed myocarditis in 33% and a typical infarct in only 24% [[Pasupathy2015]].`],
 [1,`How common is a silent heart attack?`,`In ARIC, silent MI made up more than 45% of incident MIs, and it was still linked to higher coronary death (HR 3.06) [[Zhang2016SilentMI]].`],
 [1,`What starts atherosclerosis?`,`Retention of apoB-containing lipoproteins, such as LDL, beneath the inner lining of the artery [[Tabas2007]].`],
 [1,`What is a thin-cap fibroatheroma?`,`A plaque with a fibrous cap under 65 µm over a necrotic core: the classic vulnerable plaque [[Virmani2006]]. Ruptured plaques have caps under 55 µm in autopsy series [[Narula2013]].`],
 [1,`What are the three plaque events that set off a coronary clot?`,`Rupture (most common), erosion (next) and the uncommon calcified nodule [[Virmani2006,Falk2013]]. Erosion is relatively more common in younger patients, women and NSTE-ACS [[Farb1996,Jia2013OCT]].`],
 [1,`Were most heart attack culprit arteries badly narrowed beforehand?`,`No. About two-thirds had less than 50% stenosis on an earlier angiogram [[Little1988]].`],
 [1,`What is the "wavefront" of cell death?`,`In dogs, necrosis spread from the inner wall outward: 38% of the at-risk wall died after 40 minutes, 57% at 3 hours, 71% at 6 hours and 85% at 24 hours (animal data) [[Reimer1977]].`],
 [1,`Stunning versus hibernation?`,`Stunning is pump dysfunction that persists after blood flow returns. Hibernation is dysfunction during ongoing low flow that reverses with revascularisation [[Braunwald1982,Rahimtoola1989]].`],
 [1,`What did INTERHEART find?`,`Nine modifiable factors explained 90% of the population attributable risk of a first MI in men and 94% in women, in 52 countries. ApoB/ApoA1 had the largest share (49.2%) [[Yusuf2004INTERHEART]].`],
 [1,`Waist-to-hip ratio or BMI: which predicts MI better?`,`Waist-to-hip ratio (population attributable risk 24.3% vs 7.7% for BMI) [[Yusuf2005Obesity]].`],
 [1,`What Lp(a) level counts as a risk-enhancing factor?`,`≥50 mg/dL (≥125 nmol/L) [[Arnett2019ACC]]. Lp(a) is more than 90% genetically determined [[Kronenberg2022]].`],
 /* ---- Part 2: diagnosis ---- */
 [2,`How often do women and men having a heart attack report chest pain?`,`In VIRGO (aged 18–55), 87.0% of women and 89.5% of men had chest pain, pressure, tightness or discomfort. Women more often had three or more extra symptoms (61.9% vs 54.8%) [[Lichtman2018VIRGO]].`],
 [2,`Which word do the ESC and AHA/ACC advise against for chest pain?`,`"Atypical". Describe chest pain as cardiac, possibly cardiac or noncardiac [[Gulati2021ChestPain,Byrne2023ESC]].`],
 [2,`How many people with MI had no chest pain on arrival in NRMI-2?`,`One in three (33%). They were older, more often women and more often had diabetes, and their in-hospital mortality was higher (23.3% vs 9.3%) [[Canto2000]].`],
 [2,`Which symptoms does the ESC call red flags?`,`Prolonged chest pain (>15 minutes) and/or pain that recurs within 1 hour [[Byrne2023ESC]].`],
 [2,`What is the target time for the first ECG?`,`Within 10 minutes of first medical contact, recorded and interpreted [[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`What are the UDMI4 STEMI ST-elevation thresholds?`,`≥1 mm J-point elevation in 2 contiguous leads; in V2–V3, ≥2 mm in men ≥40, ≥2.5 mm in men <40 and ≥1.5 mm in women [[Thygesen2018UDMI4C]].`],
 [2,`In what order do ECG changes usually evolve in a STEMI?`,`Hyperacute T waves, then ST elevation, then Q waves, then T inversion [[Thygesen2018UDMI4C]].`],
 [2,`What does ST depression in V1–V3 suggest?`,`Posterior coronary occlusion, especially with ST elevation in V7–V9 (0.5 mm threshold there) [[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`What does widespread ST depression with ST elevation in aVR suggest?`,`Multivessel ischaemia or left main obstruction (ST depression ≥1 mm in ≥6 leads) [[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`What are the original Sgarbossa criteria for MI in left bundle branch block?`,`Concordant ST elevation ≥1 mm, ST depression ≥1 mm in V1–V3, and discordant ST elevation ≥5 mm. The Smith modification replaces the third with an ST/S ratio ≤ −0.25 [[Sgarbossa1996,Smith2012]].`],
 [2,`How many NSTEMIs have a totally blocked culprit artery?`,`About a quarter (25.5%), most often the right coronary or circumflex artery, with higher short-term mortality [[Khan2017]].`],
 [2,`What is myocardial injury, and when is it MI?`,`Injury is a troponin above the 99th-percentile URL. MI also needs a rise and/or fall plus evidence of ischaemia [[Thygesen2018UDMI4C]].`],
 [2,`Why does the definition recommend sex-specific troponin limits?`,`Values are lower in women. With sex-specific hs-cTnI thresholds, 30% of women and 5% of men with type 1 MI were reclassified [[Thygesen2018UDMI4C,Ferry2019]].`],
 [2,`How well does the ESC 0 h/1 h algorithm perform?`,`Rule-out negative predictive value above 99% and rule-in positive predictive value about 70–75%; the rest are observed with a third troponin [[Byrne2023ESC]].`],
 [2,`When is a single very-low 0 h troponin enough to rule out MI?`,`Only if chest pain began more than 3 hours before the sample [[Byrne2023ESC]].`],
 [2,`What does HEART stand for, and how is it scored?`,`History, ECG, Age, Risk factors, Troponin: 0, 1 or 2 points each, 0–10 in all [[Six2008HEART]]. Six-week MACE was 1.7% at 0–3, 16.6% at 4–6 and 50.1% at 7–10 [[Backus2013]].`],
 [2,`What GRACE score favours an early invasive strategy?`,`A GRACE risk score >140, within 24 hours [[Byrne2023ESC]].`],
 [2,`Takotsubo syndrome: who and what?`,`About 90% are women, with a mean age of 67–70; apical ballooning is commonest, and coronary disease does not rule it out [[Ghadri2018,Templin2015]].`],
 [2,`Who has spontaneous coronary artery dissection (SCAD)?`,`In the Canadian cohort, 88.5% were women (mean age 51.8) and 33.9% had no cardiac risk factors; fibromuscular dysplasia was found in 31.1% [[Saw2019]].`],
 /* ---- Part 3: emergency treatment ---- */
 [3,`Why call an ambulance rather than drive in?`,`EMS transport was linked with a shorter door-to-balloon time (63 vs 76 min) [[Mathews2011]]. A prehospital ECG shortened it further (61 vs 75 min) [[Diercks2009]]. The ESC advises contacting EMS rather than self-presenting [[Byrne2023ESC]].`],
 [3,`How much does bystander CPR help after out-of-hospital arrest?`,`It roughly doubled the odds of 30-day survival (OR 2.15) in Sweden [[HasselqvistAx2015]].`],
 [3,`What did an AED add in the Resuscitation Outcomes Consortium?`,`Survival to discharge was 9% with bystander CPR but no AED, 24% when an AED was applied and 38% when it delivered a shock [[Weisfeldt2010]].`],
 [3,`What did ISIS-2 show?`,`Aspirin cut 5-week vascular death from 11.8% to 9.4% and streptokinase from 12.0% to 9.2%; together they cut it from 13.2% to 8.0% (42% odds reduction) [[ISIS2_1988]].`],
 [3,`Primary PCI or fibrinolysis: what did 23 trials show?`,`Primary angioplasty: short-term death 7% vs 9%, reinfarction 3% vs 7% and stroke 1% vs 2% [[Keeley2003]].`],
 [3,`What is the fibrinolysis "golden hour"?`,`Lives saved per 1000 treated were 65 in the first hour, 37 at 1–2 h, 26 at 2–3 h and 29 at 3–6 h [[Boersma1996]].`],
 [3,`What are the ESC 2023 reperfusion time targets?`,`Primary PCI if possible within 120 minutes of the ECG diagnosis; otherwise fibrinolysis within 10 minutes of diagnosis; door-in to door-out ≤30 minutes; angiography 2–24 h after fibrinolysis [[Byrne2023ESC]].`],
 [3,`Why did door-to-balloon times fall while population mortality stayed flat?`,`The treated population grew and changed. At the individual level, each 10 minutes saved still meant about 8% lower odds of in-hospital death (OR 0.92) [[Nallamothu2015,Menees2013]].`],
 [3,`Wrist or groin for PCI?`,`In MATRIX, radial (wrist) access reduced major bleeding and all-cause mortality compared with femoral (groin) access [[Valgimigli2015MATRIX]].`],
 [3,`Should clot be sucked out routinely during primary PCI?`,`No. TOTAL and TASTE showed no benefit, and TOTAL found more stroke [[Jolly2015TOTAL,Frobert2013TASTE]].`],
 [3,`Multivessel disease in STEMI: complete or culprit-only?`,`In stable patients, complete revascularisation reduced cardiovascular death or MI (COMPLETE). In cardiogenic shock, culprit-only PCI first was better (CULPRIT-SHOCK) [[Mehta2019COMPLETE,Thiele2017CULPRIT]].`],
 [3,`How does aspirin work?`,`It irreversibly acetylates platelet COX-1 (serine 529), blocking thromboxane A2 for the platelet's life [[Undas2014,Patrono2015]].`],
 [3,`What is the ESC 2023 default antiplatelet plan after ACS?`,`Aspirin plus prasugrel or ticagrelor for 12 months; clopidogrel only when those are contraindicated or unavailable [[Byrne2023ESC]].`],
 [3,`What did PLATO show for ticagrelor?`,`Fewer events than clopidogrel (9.8% vs 11.7% at 12 months) and lower all-cause death (4.5% vs 5.9%) [[Wallentin2009PLATO]].`],
 [3,`Who should not get prasugrel, according to its label?`,`People with prior TIA or stroke (contraindicated). It is generally not recommended at ≥75 years, and 5 mg is considered under 60 kg [[FDA-Effient]].`],
 [3,`Why is clopidogrel response variable?`,`It is a prodrug activated mainly by CYP2C19; its boxed warning concerns CYP2C19 poor metabolisers [[FDA-Plavix]].`],
 [3,`When is the risk of dangerous ventricular rhythms highest after STEMI?`,`About 90% of VT/VF in STEMI treated with primary PCI occurs within 48 hours of symptom onset [[Mehta2009APEX]].`],
 [3,`What are the SCAI shock stages?`,`A at risk, B beginning, C classic, D deteriorating, E extremis [[Baran2019SCAI]].`],
 [3,`Where does LV thrombus form most often?`,`After anterior MI: up to 25% with optimal imaging. Cardiac MRI is more sensitive than echo [[McCarthy2018LVT,Levine2022LVT]].`],
 /* ---- Part 4: medicines & revascularisation ---- */
 [4,`What is the CTT "22% rule"?`,`Each 1 mmol/L (about 39 mg/dL) LDL-C reduction lowers major vascular events by about 22% (RR 0.78), with no lower threshold seen [[CTT2010]].`],
 [4,`What did PROVE IT show after ACS?`,`Atorvastatin 80 mg beat pravastatin 40 mg (16% hazard reduction; LDL-C 62 vs 95 mg/dL) [[Cannon2004PROVEIT]].`],
 [4,`How much did ezetimibe add in IMPROVE-IT?`,`A 2.0-percentage-point absolute reduction at 7 years (32.7% vs 34.7%) [[Cannon2015IMPROVEIT]].`],
 [4,`What did FOURIER and ODYSSEY OUTCOMES show?`,`PCSK9 antibodies: evolocumab cut LDL-C by 59% (HR 0.85) [[Sabatine2017FOURIER]]; alirocumab after ACS gave HR 0.85, with deaths 3.5% vs 4.1% [[Schwartz2018ODYSSEY]].`],
 [4,`Are most muscle aches on statins caused by the statin?`,`No. More than 90% of muscle reports on statins were not due to the statin [[CTT2022Muscle]].`],
 [4,`What is the ESC/EAS LDL-C goal at very high risk?`,`<1.4 mmol/L (<55 mg/dL) and a ≥50% reduction from baseline [[Mach2019ESC,Sabouret2026G]].`],
 [4,`Who clearly benefits from a beta-blocker after MI?`,`People with LVEF ≤40%: carvedilol lowered all-cause mortality in CAPRICORN (HR 0.77) [[Dargie2001CAPRICORN]]. With preserved EF, REDUCE-AMI and REBOOT were neutral [[Yndigegn2024REDUCE,Ibanez2025REBOOT]].`],
 [4,`Did SGLT2 inhibitors reduce death or HF hospitalisation after MI?`,`Not as primary hard end points in EMPACT-MI or DAPA-MI [[Butler2024EMPACT,James2024DAPAMI]].`],
 [4,`What did the IAMI flu-vaccine trial show?`,`Vaccination soon after MI reduced death, MI or stent thrombosis at 12 months (HR 0.72) and all-cause death (HR 0.59) [[Frobert2021IAMI]].`],
 [4,`How many older adults still took a statin 2 years after ACS?`,`About 4 in 10 (40.1%) [[Jackevicius2002]].`],
 [4,`Diabetes with multivessel disease: CABG or PCI?`,`CABG beat PCI for death, MI or stroke at 5 years in FREEDOM (18.7% vs 26.6%), with more stroke [[Farkouh2012FREEDOM]].`],
 [4,`Which graft defines survival after CABG?`,`The internal mammary artery to the LAD: vein-only patients had 1.61 times the 10-year risk of death [[Loop1986]].`],
 /* ---- Part 5: recovery & living ---- */
 [5,`What does exercise-based cardiac rehab do?`,`At 6–12 months it cut MI (RR 0.72) and all-cause hospital admission (RR 0.65); the all-cause mortality effect was small (RR 0.86) [[Dibben2026]].`],
 [5,`Home-based or centre-based rehab?`,`Similar outcomes in Cochrane 2023 (mortality RR 1.19, confidence interval crossing 1) [[McDonagh2023]].`],
 [5,`How many eligible US Medicare beneficiaries attend cardiac rehab?`,`About 1 in 4 (24.4%); women 18.9%, and Black and Hispanic patients about 13% [[Ritchey2020]].`],
 [5,`How common is depression after MI, and does it matter?`,`About 1 in 5 (19.8% on structured interview) [[Thombs2006]]. It roughly doubles mortality risk (OR 2.25) [[Meijer2011]].`],
 [5,`How many people return to work after an MI?`,`About 8 in 10 (81.1% pooled) [[Kai2022]].`],
 [5,`Is sex risky after a heart attack?`,`The absolute risk is very small (2–3 MIs per 10,000 person-years per extra hour a week), and regular exercise blunts it [[Dahabreh2011]].`],
 [5,`Should everyone with suspected MI get oxygen?`,`No. In DETO2X-AMI (SpO2 ≥90%), oxygen did not lower 1-year mortality (5.0% vs 5.1%) [[Hofmann2017]]; AVOID linked it to larger infarcts [[Stub2015]].`],
 [5,`How does morphine interact with ticagrelor?`,`It reduced ticagrelor exposure by about 36% and delayed its peak from 2 to 4 hours [[Kubica2016]].`],
 [5,`What does the nitroglycerin label say about dosing and erection pills?`,`One tablet every 5 minutes, no more than 3 in 15 minutes, taken sitting; contraindicated with PDE-5 inhibitors such as sildenafil [[FDA-Nitrostat]].`],
 [5,`When is an unplanned DAPT stop most dangerous?`,`In the first 7 days after the disruption (HR 7.04) [[Mehran2013]].`],
 [5,`When do readmissions after MI happen?`,`About 1 in 5 within 30 days; two-thirds of those within 15 days, and most are not for MI [[Dharmarajan2013]].`],
 [5,`Colchicine after MI: what do the trials say?`,`COLCOT was positive and the larger CLEAR SYNERGY neutral, so its role early after MI is contested <span class="ev early">Early evidence</span> [[Tardif2019,Jolly2025]].`],
 /* ---- Part 6: history ---- */
 [6,`Who described the clinical picture of acute MI in 1912?`,`James B. Herrick, in JAMA [[Herrick1912,Braunwald2012History]].`],
 [6,`What are Braunwald's eras of MI treatment?`,`Bed rest (1912–1961), the coronary care unit (1961–1974) and reperfusion (1975 onward) [[Braunwald2012History]].`],
 [6,`Whose 1961 paper began the coronary care unit era?`,`Desmond Julian, in the Lancet [[Julian1961CCU,Braunwald2012History]].`],
 [6,`What did DeWood show in 1980?`,`Total coronary occlusion in 87% of patients studied within 4 hours of transmural MI, establishing thrombosis as the cause [[DeWood1980]].`],
 [6,`When and by whom was coronary angioplasty first reported?`,`Andreas Grüntzig, in a 1978 Lancet letter [[Gruntzig1978Lancet]].`],
 [6,`When did the Framingham Heart Study begin?`,`In 1948; its "factors of risk" paper appeared in 1961 [[Mahmood2014Framingham,Kannel1961Framingham]].`],
 [6,`Who described a troponin T immunoassay in 1989?`,`Katus and colleagues; troponin T was raised in all 50 patients with transmural AMI [[Katus1989TnT]].`],
 [6,`What did the IMPACT model credit for the US fall in coronary deaths, 1980–2000?`,`About 47% to treatments and 44% to risk-factor changes [[Ford2007IMPACT]].`]
];
const RV_MN=[
 ["Ten, one-twenty, ten, thirty","memory aid",`The ESC 2023 STEMI clock: ECG within <b>10</b> min of first medical contact; primary PCI if possible within <b>120</b> min of the ECG diagnosis; otherwise fibrinolysis within <b>10</b> min of diagnosis; door-in to door-out ≤<b>30</b> min when transferring [[Byrne2023ESC]].`],
 ["H-E-A-R-T","score acronym",`<b>H</b>istory, <b>E</b>CG, <b>A</b>ge, <b>R</b>isk factors, <b>T</b>roponin: 0–2 points each, 0–10 in all [[Six2008HEART]]. A teaching tool for clinicians, never for self-triage.`],
 ["T, ST, Q, T","memory aid",`The usual order of ECG change in STEMI: hyperacute <b>T</b> waves, then <b>ST</b> elevation, then <b>Q</b> waves, then <b>T</b> inversion [[Thygesen2018UDMI4C]].`],
 ["Rupture before erosion","memory aid",`The commonest cause of a coronary clot is plaque rupture, then erosion; the calcified nodule is uncommon [[Virmani2006,Falk2013]]. Erosion leans younger, female and NSTE-ACS [[Farb1996,Jia2013OCT]].`],
 ["Five for stents, ten for surgery","memory aid",`Procedure-related MI needs a troponin rise above <b>5×</b> the 99th-percentile URL after PCI (type 4a) or <b>10×</b> after CABG (type 5) [[Domienik2021UDMI4]].`],
 ["Two for a year","memory aid",`ESC 2023 default after ACS: <b>two</b> antiplatelets, aspirin plus prasugrel or ticagrelor, for <b>12 months</b>, with shorter plans for people at high bleeding risk [[Byrne2023ESC]].`],
 ["Twenty-two per one","memory aid",`Each <b>1</b> mmol/L lower LDL-C, about <b>22%</b> fewer major vascular events, with no floor seen [[CTT2010]].`],
 ["A, B, C, D, E of shock","official staging",`SCAI cardiogenic shock stages: <b>A</b>t risk, <b>B</b>eginning, <b>C</b>lassic, <b>D</b>eteriorating, <b>E</b>xtremis [[Baran2019SCAI]].`],
 ["Oxygen if low, not by habit","memory aid",`Routine oxygen with SpO2 ≥90% did not lower 1-year mortality [[Hofmann2017]], and in non-hypoxic STEMI it was linked to larger infarcts [[Stub2015]].`],
 ["Three in fifteen, sitting down","memory aid",`The nitroglycerin label: one tablet every 5 minutes, no more than 3 in 15 minutes, taken at rest, preferably sitting; never with PDE-5 inhibitors [[FDA-Nitrostat]]. Quoted as published, not as instructions.`]
];
/* the five targets on the memory aid, in the order the animation lights them */
const RV_TG=[
 ['10','min','ECG read within','10 min of first medical contact'],
 ['120','min','primary PCI, if possible','within 120 min of the ECG diagnosis'],
 ['10','min','otherwise fibrinolysis','within 10 min of diagnosis'],
 ['2–24','h','then angiography;','rescue PCI if fibrinolysis fails'],
 ['30','min','transfer: door-in to','door-out in 30 min or less']
];
const RV_REIMER=[['40 min',38],['3 h',57],['6 h',71],['24 h',85]];/* % of at-risk wall necrotic, dogs [[Reimer1977]] */
const RV_BOERSMA=[['0–1 h',65],['1–2 h',37],['2–3 h',26],['3–6 h',29]];/* lives saved per 1000 by fibrinolysis [[Boersma1996]] */
const RV_STEPS=[
 {from:0,at:.12,k:'Ten',t:'An ECG within 10 minutes',txt:`The 2023 ESC guideline says the 12-lead ECG should be obtained at first medical contact and interpreted within 10 minutes, ideally by ambulance staff [[Byrne2023ESC]]. ST elevation counts as ≥1 mm at the J point in 2 contiguous leads, with higher, age- and sex-specific thresholds in V2–V3 [[Thygesen2018UDMI4C]]. The clot in the artery above is the cause; the raised ST segment is its signature.`,pt:'The heart tracing (ECG) should be done within 10 minutes of reaching medical help, often already in the ambulance.',hook:'ECG within 10 min of first medical contact [[Byrne2023ESC]].'},
 {from:.2,at:.32,k:'One-twenty',t:'Can PCI happen within 120 minutes?',txt:`Primary PCI is preferred "provided it can be performed in a timely manner (i.e. within 120 min of the ECG-based diagnosis", for people who present within 12 hours of symptom onset [[Byrne2023ESC]]. Every minute counts because muscle dies from the inside out: in dogs, 38% of the at-risk wall had died after 40 minutes of occlusion and 71% after 6 hours (animal data) [[Reimer1977]].`,pt:'Heart muscle dies a little more with every minute the artery stays blocked. Getting help fast saves muscle and lives.',hook:'Each 30 min of delay to primary PCI: RR 1.075 for 1-year death [[DeLuca2004]].'},
 {from:.4,at:.52,k:'Yes',t:'Primary PCI: balloon and stent',txt:`A wire crosses the clot, a balloon opens the artery and a stent holds it open. Across 23 trials, primary angioplasty beat fibrinolysis: short-term death 7% vs 9%, reinfarction 3% vs 7% and stroke 1% vs 2% [[Keeley2003]]. The ESC lists the radial (wrist) approach as default access [[Byrne2023ESC]]; in MATRIX it reduced major bleeding and all-cause mortality [[Valgimigli2015MATRIX]]. As flow returns, the ST segment settles back towards the baseline [[Thygesen2018UDMI4C]].`,pt:'When the balloon-and-stent procedure can be done quickly, it works better than clot-dissolving medicine.',hook:'Primary PCI vs fibrinolysis: death 7% vs 9% (Keeley 2003) [[Keeley2003]].'},
 {from:.6,at:.72,k:'No',t:'Fibrinolysis within 10 minutes',txt:`"If PPCI is not feasible within 120 min, patients should undergo immediate fibrinolysis", and "the goal is to start fibrinolytic therapy within 10 min of the STEMI diagnosis" [[Byrne2023ESC]]. Routine angiography follows within 2–24 hours, with rescue PCI if fibrinolysis fails [[Byrne2023ESC]]. The drug works best early: 65 lives saved per 1000 in the first hour versus 29 per 1000 at 3–6 hours [[Boersma1996]]. Its main risk is bleeding in the brain, about 4 extra strokes per 1000 on days 0–1 [[FTT1994]].`,pt:'When the balloon procedure cannot be done quickly, clot-dissolving medicine is given first, and the artery is checked later.',hook:'Golden hour: 65 lives saved per 1000 at 0–1 h (Boersma) [[Boersma1996]].'},
 {from:.8,at:.93,k:'Thirty',t:'Transfers: door-in to door-out',txt:`When the first hospital cannot do PCI, "a door-in to door-out time of ≤30 min is recommended" [[Byrne2023ESC]]. Transfer works when it is fast: in DANAMI-2, moving patients for angioplasty beat on-site fibrinolysis (8.5% vs 14.2% death, reinfarction or disabling stroke at 30 days), and 96% were transferred within 2 hours [[Andersen2003DANAMI2]]. Ambulance crews can send the ECG ahead so the team is waiting [[Mathews2011,Diercks2009]]. These are targets for health systems, not a test for whether to call for help: if in doubt, call.`,pt:'Calling an ambulance is better than driving yourself. The crew can record your ECG on the way and warn the hospital.',hook:'Door-in to door-out ≤30 min at a non-PCI hospital (ESC 2023) [[Byrne2023ESC]].'}
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

  /* ---- mnemonic in motion: ten, one-twenty, ten, thirty ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  function draw(t){
    const N=vb(svg,'720 380','400 660');
    /* layout: artery, ECG and a bar chart on one side; the clock and the target list on the other */
    const A=N?{x:16,y:34,w:368,h:84}:{x:16,y:40,w:330,h:96},
      E=N?{x:16,y:130,w:368,h:68}:{x:16,y:150,w:330,h:76},
      B=N?{x:16,y:212,w:368,h:96}:{x:16,y:240,w:330,h:128},
      P=N?{x:16,y:318,w:368,h:332}:{x:364,y:14,w:340,h:354};
    const ph=t<.2?0:t<.4?1:t<.6?2:t<.8?3:4;
    /* artery state */
    let clot=1,bal=0,stn=0,drug=0;
    if(ph===2){clot=1-ramp(t,.44,.5);bal=bump(t,.43,.53);stn=ramp(t,.5,.56)}
    else if(ph===3){clot=1-.92*ramp(t,.64,.76);drug=ramp(t,.61,.64)*(1-ramp(t,.76,.79))}
    else if(ph===4){clot=0;stn=ramp(t,.8,.84)}
    const reperf=ph===2?ramp(t,.5,.58):ph===3?ramp(t,.7,.78):ph===4?1:0;
    let s='';
    const ttl=['First medical contact: the ECG','Decision: is PCI possible in time?','Yes: primary PCI reopens the artery','No: fibrinolysis dissolves the clot','Transfer, then PCI'][ph];
    s+=`<text class="t-lbl" x="${A.x}" y="${A.y-12}">${ttl}</text>`;
    const ar=artery(A.x,A.y,A.w,A.h,{plaque:.62,cap:.3,px:.5,rupture:ph<2?.7:0,clot,balloon:bal,stent:stn,down:clamp(1-clot*1.1),ph:t*9,seed:5});
    s+=ar.svg;
    if(drug>0){const yt=ar.at.top,yb=ar.at.bot,rr=rng(11);for(let k=0;k<12;k++){const u=(k/12+t*6+rr()*.05)%1,dx=A.x+8+u*(A.w*.5-8),dy=yt+(yb-yt)*(.2+.6*rr());
      s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="2.8" style="fill:var(--rx);opacity:${f1(drug*.9)}"/>`}
      s+=`<text class="t-xs" x="${A.x+8}" y="${A.y+A.h+12}" style="fill:var(--rx);font-weight:700">fibrinolytic drug</text>`}
    else s+=`<text class="t-xs" x="${A.x+8}" y="${A.y+A.h+12}">${clot>.5?'clot blocks the coronary artery':stn>.5?'stent holds the artery open':'flow restored'}</text>`;
    /* ECG strip: ST elevation while blocked, settling after reperfusion */
    const mm=4,st=lerp(3,.3,reperf);
    s+=ecgGrid(E.x,E.y,E.w,E.h,{mm,minor:!N});
    const base=E.y+E.h-(N?18:22);
    const pen=ph===0?ramp(t,.02,.16):1;
    const tr=ecgTrace(E.x+4,base,E.w-8,{mm,hr:75,from:t*14,st,t:lerp(4.2,2.2,reperf),hyper:lerp(.5,0,reperf),upto:pen,pen:ph===0&&pen<1});
    s+=tr.svg;
    s+=`<rect x="${E.x+E.w-118}" y="${E.y+3}" width="114" height="16" rx="4" style="fill:var(--panel);opacity:.9"/><text class="t-xs t-end" x="${E.x+E.w-8}" y="${E.y+15}" style="fill:var(${st>1.5?'--bad':'--good'});font-weight:700">ST ${st>1.5?'elevated':'settling'}: ${f1(st)} mm</text>`;
    /* bar chart: Reimer (dogs) before treatment, Boersma (people) from the fibrinolysis step */
    const boe=ph>=3,data=boe?RV_BOERSMA:RV_REIMER,mx=boe?70:100,grow=boe?ramp(t,.62,.72):ramp(t,.03,.3);
    s+=`<text class="t-sm" x="${B.x}" y="${B.y+12}" style="fill:var(--ink);font-weight:700">${boe?'Lives saved per 1000 by fibrinolysis':'At-risk wall necrotic after occlusion'}</text>`;
    s+=`<text class="t-xs" x="${B.x}" y="${B.y+(N?25:28)}">${boe?'by hours from symptom onset (22 trials)':'% by duration, dogs (animal data)'}</text>`;
    const by0=B.y+B.h-14,bh=B.h-(N?54:64),bw=(B.w-30)/4;
    s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${by0}" y2="${by0}" class="axis"/>`;
    data.forEach(([lab,v],k)=>{const g=ramp(grow,k*.18,k*.18+.4),h=bh*v/mx*g,x=B.x+6+k*(bw+6),hot=boe?k===0:k===0;
      s+=`<rect x="${f1(x)}" y="${f1(by0-h)}" width="${f1(bw-4)}" height="${f1(h)}" rx="4" style="fill:var(${boe?'--rx':'--isch-fill'});opacity:${hot?.95:.7}"/>`;
      if(g>.6)s+=`<text class="t-sm t-mid" x="${f1(x+(bw-4)/2)}" y="${f1(by0-h-4)}" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(g,.6,1))}">${v}${boe?'':'%'}</text>`;
      s+=`<text class="t-xs t-mid" x="${f1(x+(bw-4)/2)}" y="${by0+12}" style="${N?'font-size:11.5px':''}">${lab}</text>`});
    /* clock + target list */
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const mins=ph===0?10*ramp(t,.02,.18):ph===1?120*ramp(t,.22,.38):ph===2?120:ph===3?10*ramp(t,.61,.69):30*ramp(t,.82,.95);
    const ref=ph===0?'since first medical contact':ph===4?'from door-in to door-out':'since the ECG diagnosis';
    const cr=N?34:42,ccx=P.x+16+cr,ccy=P.y+16+cr;
    s+=clock(ccx,ccy,cr,mins,{full:ph===1||ph===2?120:ph===4?30:10,col:ph===3?'var(--rx)':'var(--brand)'});
    s+=`<text class="t-big" x="${ccx+cr+16}" y="${ccy+4}" style="fill:var(--brand);font-size:${N?28:32}px">${Math.round(mins)} min</text><text class="t-xs" x="${ccx+cr+16}" y="${ccy+22}">${ref}</text>`;
    if(ph===1){const ok=ramp(t,.36,.39);s+=`<text class="t-sm" x="${ccx+cr+16}" y="${ccy-24}" style="fill:var(--ink);opacity:${f1(ok)};font-weight:700">PCI in time? yes / no</text>`}
    const active=[0,1,1,2,4][ph],done=k=>ph===0?false:ph===1?k===0:ph===2?k<2:ph===3?(k===0||(k===2&&t>.7)||(k===3&&t>.74)):k<2;
    const ry0=P.y+2*cr+(N?30:42),rh=N?(P.h-2*cr-40)/5:(P.h-2*cr-54)/5;
    RV_TG.forEach(([num,u,l1,l2],k)=>{
      const on=k===active||(ph===3&&k===3&&t>.72),dn=done(k),skip=ph===2&&(k===2||k===3),y=ry0+k*rh,op=on?1:dn?.85:skip?.3:.45;
      s+=`<g style="opacity:${op}"><rect x="${P.x+12}" y="${f1(y)}" width="${P.w-24}" height="${f1(rh-6)}" rx="8" style="fill:var(${on?'--brand-soft':'--panel'});stroke:var(${on?'--brand':'--line'});stroke-width:${on?2:1}"/>`;
      s+=`<text class="t-lbl t-mid" x="${P.x+50}" y="${f1(y+rh/2-1)}" style="fill:var(${k===2||k===3?'--rx':'--brand'});font-size:${num.length>3?14:17}px">${num}</text><text class="t-xs t-mid" x="${P.x+50}" y="${f1(y+rh/2+10)}">${u}</text>`;
      s+=`<text class="t-sm" x="${P.x+92}" y="${f1(y+rh/2-4)}" style="fill:var(--ink);font-size:${N?13:12.5}px">${l1}</text><text class="t-xs" x="${P.x+92}" y="${f1(y+rh/2+11)}" style="font-size:${N?11.5:11}px">${l2}</text>`;
      if(dn&&!on)s+=`<text class="t-lbl t-end" x="${P.x+P.w-22}" y="${f1(y+rh/2+2)}" style="fill:var(--good)">✓</text>`;
      s+='</g>'});
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,18000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
  addEventListener('resize',()=>{if(cur==='review')draw(+rg.value)});
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 /* ---- Part 1 ---- */
 [1,`About how many heart attacks happen in the US each year?`,[`About 805,000`,`About 80,000`,`About 8 million`,`About 2.5 million`],0,`About 605,000 first and 200,000 recurrent attacks, roughly one every 40 seconds [[Martin2025HDSS]].`],
 [1,`Of US heart attacks each year, about how many are silent?`,[`Almost none`,`About 170,000`,`About half a million`,`About 10,000`],1,`About 170,000 of the 805,000 happen without significant symptoms [[Martin2025HDSS]].`],
 [1,`Under the Fourth Universal Definition, myocardial injury means:`,[`Any chest pain lasting over 15 minutes`,`ST elevation on the ECG`,`A cardiac troponin above the 99th-percentile upper reference limit`,`A coronary stenosis over 70%`],2,`Injury is a cTn above the 99th-percentile URL; it is acute when values rise and/or fall, and it is MI only with evidence of acute ischaemia [[Thygesen2018UDMI4,Domienik2021UDMI4]].`],
 [1,`A 78-year-old with pneumonia and severe anaemia has a rising troponin and ischaemic ECG changes, with no coronary thrombus. The best UDMI4 label is:`,[`Type 1 MI`,`Type 3 MI`,`Type 4a MI`,`Type 2 MI`],3,`Type 2 MI comes from a supply/demand mismatch secondary to another illness, such as respiratory failure or severe anaemia, without acute atherothrombosis [[Domienik2021UDMI4,DeFilippis2019Type2]].`],
 [1,`The troponin threshold for MI after CABG (type 5) with a normal baseline is:`,[`More than 10× the 99th-percentile URL`,`More than 2× the URL`,`More than 5× the URL`,`Any detectable troponin`],0,`Type 5 needs >10×, and PCI-related type 4a >5×, within 48 hours [[Domienik2021UDMI4]].`],
 [1,`Under UDMI4, takotsubo syndrome is classed as:`,[`Type 1 MI`,`Another cause of myocardial injury, not MI`,`Type 2 MI`,`MINOCA by definition`],1,`[[Domienik2021UDMI4]].`],
 [1,`MINOCA is more common in:`,[`Older men`,`Smokers only`,`Women (10.5% vs 3.4% of MIs)`,`People with diabetes only`],2,`In the ACTION Registry–GWTG, 10.5% of women vs 3.4% of men with MI had MINOCA [[Smilowitz2017ACTION]].`],
 [1,`In GBD 2021, the leading age-standardised cause of death worldwide was:`,[`Stroke`,`COVID-19`,`Lung cancer`,`Ischaemic heart disease`],3,`IHD was leading in 1990, 2019 and 2021; COVID-19 moved to second in 2021 [[GBD2021CausesOfDeath]].`],
 [1,`Five-year all-cause death in Edinburgh was highest after:`,[`Myocardial injury without MI (72.4%)`,`Type 1 MI (36.7%)`,`Type 2 MI (62.5%)`,`They were identical`],0,`Most excess deaths after type 2 MI or injury were noncardiovascular [[Chapman2018Type2]].`],
 [1,`The initiating event in atherosclerosis is:`,[`Calcium deposition`,`Subendothelial retention of apoB-containing lipoproteins`,`Platelet activation`,`Smooth-muscle death`],1,`[[Tabas2007]].`],
 [1,`A thin-cap fibroatheroma has a fibrous cap thinner than:`,[`1 mm`,`500 µm`,`65 µm`,`5 µm`],2,`TCFA: cap <65 µm over a necrotic core [[Virmani2006]]. Ruptured plaques have caps <55 µm in autopsy series [[Narula2013]].`],
 [1,`The most common cause of coronary thrombosis is:`,[`Calcified nodule`,`Coronary spasm`,`Embolism`,`Plaque rupture`],3,`Rupture, then erosion; the calcified nodule is uncommon [[Virmani2006,Falk2013]].`],
 [1,`Compared with rupture, plaque erosion is relatively more common in:`,[`Younger patients, women and NSTE-ACS`,`Older men with STEMI`,`People with calcified arteries`,`Only people with diabetes`],0,`Erosion also has thicker caps and less stenosis [[Farb1996,Jia2013OCT]].`],
 [1,`About what share of later MI culprit arteries had less than 50% stenosis on an earlier angiogram?`,[`5%`,`About two-thirds`,`All of them`,`About 10%`],1,`This is why a heart attack can come "out of the blue" [[Little1988]].`],
 [1,`In Reimer's dog model, how much of the at-risk wall had died after 40 minutes of occlusion?`,[`85%`,`5%`,`38%`,`100%`],2,`38% at 40 minutes, 57% at 3 h, 71% at 6 h and 85% at 24 h, spreading from the inner wall outward (animal data) [[Reimer1977]].`],
 [1,`Myocardial dysfunction that persists after blood flow has been restored is called:`,[`Hibernation`,`Preconditioning`,`Necrosis`,`Stunning`],3,`Hibernation is dysfunction during ongoing low flow that reverses with revascularisation [[Braunwald1982,Rahimtoola1989]].`],
 [1,`In INTERHEART, the factor with the largest population attributable risk was:`,[`ApoB/ApoA1 ratio (49.2%)`,`Diabetes`,`Alcohol`,`Family history`],0,`Nine modifiable factors explained 90% of PAR in men and 94% in women [[Yusuf2004INTERHEART]].`],
 [1,`Lp(a) is:`,[`Mostly determined by diet`,`More than 90% genetically determined`,`Lowered by exercise alone`,`Not linked to heart risk`],1,`An Lp(a) ≥50 mg/dL (≥125 nmol/L) is a risk-enhancing factor [[Kronenberg2022,Arnett2019ACC]].`],
 [1,`Pre-eclampsia raises later ischaemic heart disease risk by about:`,[`10%`,`No change`,`Twofold (RR 2.16)`,`Tenfold`],2,`[[Bellamy2007]].`],
 [1,`CANTOS showed that blocking IL-1β:`,[`Lowered LDL by 50%`,`Had no effect`,`Raised events`,`Lowered cardiovascular events without lowering lipids`],3,`HR 0.85 at 150 mg, at the cost of more fatal infections [[Ridker2017CANTOS]].`],
 /* ---- Part 2 ---- */
 [2,`In VIRGO (aged 18–55), what share of women with MI had chest pain, pressure, tightness or discomfort?`,[`87.0%`,`20%`,`50%`,`99%`],0,`87.0% of women and 89.5% of men; women more often had three or more additional symptoms [[Lichtman2018VIRGO]].`],
 [2,`The ESC and the AHA/ACC advise describing chest pain as:`,[`Typical or atypical`,`Cardiac, possibly cardiac or noncardiac`,`Male or female pattern`,`Mild or severe`],1,`The descriptor "atypical" should be avoided [[Gulati2021ChestPain,Byrne2023ESC]].`],
 [2,`In NRMI-2, people with MI who arrived without chest pain were:`,[`Younger and mostly men`,`At lower risk of death`,`Older, more often women and more often diabetic`,`Rare (under 5%)`],2,`One in three had no chest pain; in-hospital mortality was 23.3% vs 9.3% [[Canto2000]].`],
 [2,`The ESC red-flag symptoms that should prompt calling EMS are:`,[`Pain only on exertion`,`Pain relieved by antacids`,`Pain lasting under a minute`,`Chest pain >15 minutes and/or recurring within 1 hour`],3,`[[Byrne2023ESC]].`],
 [2,`The ECG should be recorded and interpreted within how long of first medical contact?`,[`10 minutes`,`30 minutes`,`60 minutes`,`2 hours`],0,`[[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`The UDMI4 ST-elevation threshold in V2–V3 for a woman of any age is:`,[`≥2.5 mm`,`≥1.5 mm`,`≥0.5 mm`,`≥4 mm`],1,`Men ≥40: ≥2 mm; men <40: ≥2.5 mm; other leads ≥1 mm in 2 contiguous leads [[Thygesen2018UDMI4C]].`],
 [2,`The usual order of ECG changes in STEMI is:`,[`Q waves, ST elevation, hyperacute T`,`T inversion first`,`Hyperacute T, ST elevation, Q waves, T inversion`,`ST depression, then nothing`],2,`[[Thygesen2018UDMI4C]].`],
 [2,`ST depression in V1–V3 with ST elevation in V7–V9 suggests:`,[`Pericarditis`,`Pulmonary embolism`,`Right ventricular infarction only`,`Posterior coronary occlusion`],3,`The V7–V9 threshold is 0.5 mm [[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`ST depression ≥1 mm in six or more leads plus ST elevation in aVR suggests:`,[`Multivessel ischaemia or left main obstruction`,`A normal variant`,`Takotsubo`,`Hyperkalaemia`],0,`[[Byrne2023ESC,Thygesen2018UDMI4C]].`],
 [2,`In the Smith-modified Sgarbossa rule, the ≥5 mm discordant criterion is replaced by:`,[`Any Q wave`,`An ST/S ratio ≤ −0.25`,`T inversion in V1`,`A heart rate over 100`],1,`It raised sensitivity (91% vs 52% in derivation) [[Smith2012]].`],
 [2,`In NSTEMI, about what share have a totally occluded culprit artery?`,[`None`,`5%`,`About 25%`,`90%`],2,`25.5%, mostly right coronary or circumflex, with higher short-term mortality [[Khan2017]].`],
 [2,`Why does UDMI4 recommend sex-specific hs-troponin limits?`,[`Men have lower values`,`They are cheaper`,`Age matters more`,`Values are lower in women`],3,`Age-specific cut-offs are not recommended [[Thygesen2018UDMI4C]].`],
 [2,`The ESC 0 h/1 h algorithm's rule-out negative predictive value has been:`,[`Above 99%`,`About 75%`,`About 50%`,`About 90%`],0,`Rule-in PPV is about 70–75% [[Byrne2023ESC]].`],
 [2,`A single very-low 0 h troponin can rule out MI only if:`,[`The patient is under 40`,`Chest pain began more than 3 hours before the sample`,`The ECG shows ST elevation`,`The patient took aspirin`],1,`[[Byrne2023ESC]].`],
 [2,`A HEART score of 7–10 carried what 6-week MACE rate in the 2013 validation?`,[`1.7%`,`5%`,`16.6%`,`50.1%`],3,`0–3: 1.7%; 4–6: 16.6% [[Backus2013]]. A teaching tool, not for self-triage.`],
 [2,`Which is one of the 7 TIMI risk score items?`,[`Aspirin use in the prior 7 days`,`Female sex`,`Heart rate over 100`,`Obesity`],0,`[[Antman2000]].`],
 [2,`Which variable is part of the GRACE in-hospital model?`,[`Cholesterol`,`Killip class`,`Body mass index`,`Family history`],1,`GRACE uses age, Killip class, systolic BP, ST deviation, cardiac arrest, creatinine, positive enzymes and heart rate [[Granger2003]].`],
 [2,`Takotsubo syndrome mostly affects:`,[`Young men`,`Children`,`Older women (about 90% women)`,`Athletes`],2,`Coronary disease does not exclude it [[Ghadri2018,Templin2015]].`],
 [2,`In the Canadian SCAD cohort, the share of women was:`,[`10%`,`50%`,`25%`,`88.5%`],3,`A third had no cardiac risk factors [[Saw2019]].`],
 [2,`In IRAD, how often was the ECG normal in acute aortic dissection?`,[`About one-third (31.3%)`,`Never`,`Always`,`5%`],0,`[[Hagan2000]].`],
 [2,`In developed countries, most pericarditis is:`,[`Tuberculous`,`Idiopathic or presumed viral (80–90%)`,`Caused by MI`,`Drug-induced`],1,`Tuberculosis causes <5% [[Imazio2015]].`],
 /* ---- Part 3 ---- */
 [3,`Compared with self-transport, EMS transport for STEMI was linked with a median door-to-balloon time of:`,[`120 vs 63 min`,`No difference`,`63 vs 76 min`,`10 vs 20 min`],2,`[[Mathews2011]].`],
 [3,`Bystander CPR before EMS arrival was linked with 30-day survival odds of:`,[`OR 0.5`,`No change`,`OR 10`,`OR 2.15`],3,`[[HasselqvistAx2015]].`],
 [3,`In ISIS-2, aspirin plus streptokinase versus neither cut 5-week vascular mortality from:`,[`13.2% to 8.0%`,`50% to 25%`,`5% to 4%`,`20% to 19%`],0,`A 42% odds reduction; the effects were additive [[ISIS2_1988]].`],
 [3,`Primary angioplasty versus fibrinolysis (23 trials) gave short-term death of:`,[`9% vs 7%`,`7% vs 9%`,`1% vs 2%`,`14% vs 8%`],1,`With less reinfarction (3% vs 7%) and stroke (1% vs 2%) [[Keeley2003]].`],
 [3,`Fibrinolysis saved the most lives per 1000 when given:`,[`At 3–6 hours`,`At 12–24 hours`,`In the first hour (65 per 1000)`,`It did not vary`],2,`[[Boersma1996]].`],
 [3,`ESC 2023: if primary PCI is not feasible within 120 minutes, the guideline says:`,[`Wait for a PCI team`,`Give oxygen and observe`,`Start a statin`,`Immediate fibrinolysis, within 10 min of diagnosis`],3,`Followed by angiography within 2–24 h, and rescue PCI if fibrinolysis fails [[Byrne2023ESC]].`],
 [3,`At the individual level, each 10-minute cut in door-to-balloon time was linked with:`,[`No effect`,`Higher mortality`,`About 8% lower odds of in-hospital death`,`50% lower mortality`],2,`Population mortality stayed flat because the treated population grew and changed [[Nallamothu2015]].`],
 [3,`In MATRIX, radial versus femoral access reduced:`,[`Stent thrombosis only`,`Nothing`,`Stroke only`,`Major bleeding and all-cause mortality`],3,`[[Valgimigli2015MATRIX]].`],
 [3,`Routine thrombus aspiration in STEMI (TOTAL) resulted in:`,[`No benefit and more stroke`,`Lower mortality`,`Smaller infarcts and fewer deaths`,`Less bleeding`],0,`TASTE was also neutral [[Jolly2015TOTAL,Frobert2013TASTE]].`],
 [3,`In cardiogenic shock with multivessel disease, CULPRIT-SHOCK favoured:`,[`Immediate multivessel PCI`,`Culprit-lesion-only PCI first`,`Medical therapy alone`,`Routine IABP`],1,`Death or renal-replacement therapy at 30 days: 45.9% vs 55.4% [[Thiele2017CULPRIT]].`],
 [3,`Aspirin blocks platelets by:`,[`Blocking P2Y12 reversibly`,`Activating thrombin`,`Binding GP IIb/IIIa`,`Irreversibly acetylating COX-1`],3,`Thromboxane A2 is blocked for the platelet's life [[Undas2014,Patrono2015]].`],
 [3,`In CURE, clopidogrel plus aspirin in NSTE-ACS:`,[`Cut events 20% with more major bleeding`,`Had no effect`,`Lowered bleeding`,`Raised death`],0,`9.3% vs 11.4%; major bleeding 3.7% vs 2.7% [[Yusuf2001CURE]].`],
 [3,`Prasugrel's label says it is contraindicated in people with:`,[`Diabetes`,`Prior TIA or stroke`,`Atrial fibrillation`,`Age under 60`],1,`In that subgroup, stroke was 6.5% on prasugrel vs 1.2% on clopidogrel [[FDA-Effient]].`],
 [3,`A patient on ticagrelor reports mild breathlessness. The label notes dyspnoea in about:`,[`0.1%`,`90%`,`14% (PLATO)`,`50%`],2,`Usually mild to moderate and often resolving with continued treatment; the care team should be told [[FDA-Brilinta]].`],
 [3,`ISAR-REACT 5 compared prasugrel with ticagrelor and found:`,[`Ticagrelor better`,`No difference`,`Prasugrel caused more bleeding`,`Prasugrel better for death, MI or stroke`],3,`6.9% vs 9.3% at 1 year, with similar bleeding [[Schupke2019ISAR5]].`],
 [3,`TWILIGHT: dropping aspirin after 3 months of ticagrelor plus aspirin:`,[`Nearly halved bleeding with no rise in ischaemic events`,`Doubled MI`,`Raised stroke`,`Increased bleeding`],0,`4.0% vs 7.1% bleeding; death, MI or stroke 3.9% in both [[Mehran2019TWILIGHT]].`],
 [3,`ESC 2023: one major or two minor ARC-HBR criteria indicate:`,[`High ischaemic risk`,`High bleeding risk`,`Need for CABG`,`Low risk`],1,`PRECISE-DAPT ≥25 also marks high bleeding risk on DAPT [[Byrne2023ESC,Costa2017PRECISE]].`],
 [3,`In AUGUSTUS (AF plus ACS/PCI), adding aspirin:`,[`Halved bleeding`,`Had no effect on bleeding`,`Nearly doubled bleeding (16.1% vs 9.0%)`,`Lowered death`],2,`Apixaban also bled less than VKA (10.5% vs 14.7%) [[Lopes2019AUGUSTUS]].`],
 [3,`About what share of VT/VF in STEMI treated with primary PCI occurs within 48 hours?`,[`90%`,`10%`,`50%`,`Almost none`],0,`Late VT/VF carries higher 90-day mortality than early (33.3% vs 17.2%) [[Mehta2009APEX]].`],
 [3,`ST elevation in V4R in an inferior MI points to:`,[`Posterior MI`,`Right ventricular infarction`,`Pericarditis`,`Left main disease`],1,`Sensitivity 88%, specificity 78% [[Zehender1993]].`],
 [3,`Early ICDs after MI (DINAMIT, IRIS):`,[`Cut total mortality`,`Raised arrhythmic death`,`Cut arrhythmic death but not total mortality`,`Were never tested`],2,`Non-arrhythmic deaths rose [[Hohnloser2004DINAMIT,Steinbeck2009IRIS]].`],
 /* ---- Part 4 ---- */
 [4,`According to CTT 2010, each 1 mmol/L LDL-C reduction lowers major vascular events by about:`,[`2%`,`50%`,`22%`,`90%`],2,`RR 0.78, with no lower threshold seen [[CTT2010]].`],
 [4,`In PROVE IT after ACS, atorvastatin 80 mg was compared with:`,[`Placebo`,`Ezetimibe`,`Evolocumab`,`Pravastatin 40 mg`],3,`16% hazard reduction; LDL-C 62 vs 95 mg/dL [[Cannon2004PROVEIT]].`],
 [4,`In FOURIER, evolocumab lowered LDL-C to a median of:`,[`30 mg/dL`,`100 mg/dL`,`70 mg/dL`,`150 mg/dL`],0,`A 59% reduction; HR 0.85 for the primary end point [[Sabatine2017FOURIER]].`],
 [4,`Inclisiran injections are given:`,[`Daily`,`At day 1, day 90, then every 6 months`,`Weekly`,`Once in a lifetime`],1,`About 50% LDL-C lowering [[Ray2020ORION,FDA-Leqvio]].`],
 [4,`A patient on a statin reports aching legs. The CTT 2022 analysis found that of muscle reports on statins:`,[`All were caused by the statin`,`Half were caused by the statin`,`More than 90% were not due to the statin`,`None were recorded`],2,`Talking with the care team before stopping matters [[CTT2022Muscle]].`],
 [4,`Bempedoic acid in statin intolerance (CLEAR Outcomes) gave MACE HR 0.87, with a watch for:`,[`Hair loss`,`Hearing loss`,`Low blood sugar`,`Gout and gallstones`],3,`[[Nissen2023CLEAR]].`],
 [4,`The ESC/EAS LDL-C goal at very high risk is:`,[`<1.4 mmol/L (<55 mg/dL) and ≥50% reduction`,`<3.0 mmol/L`,`<100 mg/dL only`,`No goal`],0,`[[Mach2019ESC,Sabouret2026G]].`],
 [4,`REDUCE-AMI and REBOOT tested beta-blockers after MI with preserved ejection fraction and were:`,[`Strongly positive`,`Neutral`,`Harmful`,`Stopped for benefit`],1,`BETAMI-DANBLOCK (LVEF ≥40%) favoured beta-blockers (HR 0.85) [[Yndigegn2024REDUCE,Ibanez2025REBOOT,Munkhaugen2025BETAMI]].`],
 [4,`In VALIANT, combining valsartan with captopril after MI:`,[`Halved mortality`,`Was better than either`,`Only added side effects`,`Was never tested`],2,`Valsartan was as effective as captopril [[Pfeffer2003VALIANT]].`],
 [4,`Which trial showed that a flu shot soon after MI reduced all-cause death (HR 0.59)?`,[`SECURE`,`FOURIER`,`TWILIGHT`,`IAMI`],3,`[[Frobert2021IAMI]].`],
 [4,`The SECURE polypill contained:`,[`Aspirin, ramipril and atorvastatin`,`Ticagrelor and rosuvastatin`,`Metoprolol and ezetimibe`,`Colchicine and aspirin`],0,`MACE HR 0.76 versus usual care [[Castellano2022SECURE]].`],
 [4,`Quitting smoking after a coronary diagnosis is associated with mortality lower by about:`,[`5%`,`36% (RR 0.64)`,`80%`,`0%`],1,`[[Critchley2003]].`],
 [4,`In FREEDOM (diabetes, multivessel disease), CABG versus PCI gave:`,[`More death, MI or stroke`,`Identical outcomes`,`Fewer deaths, MIs or strokes but more stroke`,`Less stroke`],2,`5-year death, MI or stroke 18.7% vs 26.6% [[Farkouh2012FREEDOM]].`],
 [4,`In SYNTAX at 12 months, the excess events after PCI versus CABG came mainly from:`,[`Stroke`,`Death`,`Bleeding`,`Repeat revascularisation`],3,`13.5% vs 5.9%; stroke was higher with CABG [[Serruys2009SYNTAX]].`],
 /* ---- Part 5 ---- */
 [5,`Exercise-based cardiac rehab at 6–12 months reduced:`,[`MI (RR 0.72) and all-cause hospital admission (RR 0.65)`,`Nothing measurable`,`Only weight`,`Stroke only`],0,`The all-cause mortality effect was small (RR 0.86) [[Dibben2026]].`],
 [5,`Compared with centre-based rehab, home-based rehab gave:`,[`Much worse outcomes`,`Similar outcomes`,`Higher mortality`,`Much better survival`],1,`[[McDonagh2023]].`],
 [5,`In US Medicare, about what share of eligible beneficiaries took part in cardiac rehab?`,[`90%`,`70%`,`About 24%`,`5%`],2,`Women and Black and Hispanic patients attended less [[Ritchey2020]].`],
 [5,`About how common is major depression after MI on structured interview?`,[`1 in 100`,`Almost everyone`,`1 in 2`,`About 1 in 5 (19.8%)`],3,`[[Thombs2006]].`],
 [5,`ENRICHD and SADHART showed that treating post-MI depression:`,[`Improves mood but has not been shown to improve cardiac survival`,`Halves cardiac death`,`Worsens heart function`,`Has no effect on mood`],0,`[[Berkman2003,Glassman2002]].`],
 [5,`About what share of people develop PTSD symptoms after ACS?`,[`50%`,`12%`,`1%`,`80%`],1,`It doubles the risk of recurrence or death (RR 2.00) [[Edmondson2012]].`],
 [5,`In DETO2X-AMI, routine oxygen for suspected MI with SpO2 ≥90%:`,[`Halved mortality`,`Raised mortality sharply`,`Did not lower 1-year mortality (5.0% vs 5.1%)`,`Prevented all reinfarction`],2,`[[Hofmann2017]].`],
 [5,`Morphine given before ticagrelor:`,[`Speeds its effect`,`Has no interaction`,`Raises its levels`,`Lowers exposure about 36% and delays the peak`],3,`Peak delayed from 2 h to 4 h [[Kubica2016]].`],
 [5,`The strongest predictor of retroperitoneal bleeding after PCI is:`,[`Femoral access (OR 19.66)`,`Radial access`,`Female sex`,`Statin use`],0,`[[Kwok2018]].`],
 [5,`Patent haemostasis after radial access (confirming flow during compression):`,[`Raises bleeding`,`Cuts radial artery occlusion by 75% at 30 days`,`Has no effect`,`Requires surgery`],1,`[[Pancholy2008]].`],
 [5,`The nitroglycerin label limits sublingual tablets to:`,[`One a day`,`Ten in an hour`,`No more than 3 in 15 minutes`,`Unlimited`],2,`Taken at rest, preferably sitting; never with PDE-5 inhibitors [[FDA-Nitrostat]].`],
 [5,`When is unplanned disruption of DAPT most dangerous?`,[`After 1 year`,`It never matters`,`After 6 months`,`In the first 7 days after disruption (HR 7.04)`],3,`Physician-guided discontinuation did not raise risk [[Mehran2013]].`],
 [5,`Pooled return to work after MI, ACS or angina is about:`,[`81%`,`30%`,`50%`,`99%`],0,`Lower with lower education, reduced LVEF and heavy physical work [[Kai2022]].`],
 [5,`Two-thirds of 30-day readmissions after AMI happen within:`,[`48 hours`,`15 days`,`6 months`,`1 year`],1,`Most are not for MI [[Dharmarajan2013]].`],
 [5,`Who was more likely to wait longer than 10 minutes for an ECG in US EDs?`,[`Men with chest pain`,`Younger white men`,`Women, Black patients and people without chest pain`,`People who arrived by ambulance`],2,`[[Yiadom2022]].`],
 [5,`An AI ECG model for occlusion MI reached sensitivity of 80.6% versus STEMI criteria at:`,[`95%`,`80%`,`60%`,`32.5%`],3,`A diagnostic accuracy study; no trial has shown better outcomes yet <span class="ev early">Early evidence</span> [[Herman2024]].`],
 /* ---- Part 6 ---- */
 [6,`Who published the 1912 JAMA description of sudden coronary obstruction?`,[`James B. Herrick`,`William Heberden`,`Andreas Grüntzig`,`Desmond Julian`],0,`[[Herrick1912,Braunwald2012History]].`],
 [6,`Einthoven published galvanometric recording of the human ECG in:`,[`1850`,`1903`,`1948`,`1977`],1,`[[Einthoven1903]].`],
 [6,`Braunwald's coronary care unit era ran from:`,[`1800–1900`,`1975 onward`,`1961–1974`,`1912–1961`],2,`Bed rest 1912–1961; reperfusion from 1975 [[Braunwald2012History]].`],
 [6,`GISSI (1986) showed that the benefit of streptokinase:`,[`Was the same at any time`,`Was harmful at all times`,`Grew with delay`,`Faded with delay (RR 0.74 at 0–3 h vs 1.19 at 9–12 h)`],3,`[[GISSI1986]].`],
 [6,`The first Universal Definition, which introduced the five MI types, appeared in:`,[`2007`,`1979`,`2000`,`2025`],0,`The third (2012) and fourth (2018) followed [[Thygesen2007UDMI,Thygesen2018UDMI4]].`],
 [6,`The 2025 ACC/AHA ACS guideline replaces:`,[`The 2023 ESC guideline`,`The 2013 STEMI and 2014 NSTE-ACS guidelines`,`The universal definition`,`The CPR guideline`],1,`[[Rao2025ACC]].`]
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
 ["0 h/1 h algorithm",`The ESC's preferred rapid troponin pathway: high-sensitivity troponin at presentation and 1 hour later sorts patients into rule-out, observe or rule-in. Rule-out NPV has been above 99% [[Byrne2023ESC]].`,"troponin"],
 ["0 h/2 h algorithm",`The ESC's "second-best option" rapid troponin pathway, with a second sample at 2 hours [[Byrne2023ESC]].`,"troponin"],
 ["99th-percentile upper reference limit (URL)",`The troponin decision level for myocardial injury, set for each assay; UDMI4 recommends sex-specific values for hs-cTn assays [[Thygesen2018UDMI4C]].`,"troponin"],
 ["ACE inhibitor",`A medicine that blocks angiotensin-converting enzyme. After MI with LV dysfunction, captopril cut mortality 19% in SAVE [[Pfeffer1992SAVE]].`,"secondary"],
 ["Acute coronary syndrome (ACS)",`The umbrella term for STEMI, NSTEMI and unstable angina; the ESC working diagnosis is classified as STEMI or NSTE-ACS using the ECG [[Byrne2023ESC]].`,"what"],
 ["Adherence",`Taking medicines as prescribed. Only about 4 in 10 older adults were still adherent to a statin 2 years after ACS [[Jackevicius2002]].`,"secondary"],
 ["AED (automated external defibrillator)",`A public device that analyses the rhythm and can deliver a shock. Survival to discharge was 38% when an AED delivered a shock before EMS arrived [[Weisfeldt2010]].`,"call"],
 ["Alirocumab",`A PCSK9 antibody. In ODYSSEY OUTCOMES, given 1–12 months after ACS, it gave HR 0.85, with deaths 3.5% vs 4.1% [[Schwartz2018ODYSSEY]].`,"lipids"],
 ["Anticoagulant",`A drug that acts on clotting proteins (thrombin, fibrin) rather than platelets, such as heparin, enoxaparin, fondaparinux or bivalirudin. The ESC indicates a combination of antiplatelet and anticoagulant therapy acutely [[Byrne2023ESC]].`,"antithrombotic"],
 ["Antiplatelet",`A drug that makes platelets less sticky: aspirin, the P2Y12 inhibitors and the GP IIb/IIIa inhibitors [[Undas2014,FDA-Plavix]].`,"antithrombotic"],
 ["Aortic dissection",`A tear in the wall of the aorta that can mimic MI. In IRAD, sudden severe sharp pain was commonest and the ECG was normal in 31.3% [[Hagan2000]].`,"differential"],
 ["ApoB",`Apolipoprotein B, carried by LDL and other atherogenic particles. Retention of apoB-containing lipoproteins starts atherosclerosis [[Tabas2007]].`,"plaque"],
 ["ApoB/ApoA1 ratio",`The INTERHEART lipid measure with the largest population attributable risk (49.2%) [[Yusuf2004INTERHEART]].`,"risk"],
 ["ARC-HBR",`Academic Research Consortium for High Bleeding Risk. One major or two minor criteria indicate high bleeding risk [[Urban2019ARCHBR,Byrne2023ESC]].`,"antithrombotic"],
 ["ARIC",`Atherosclerosis Risk in Communities: US community surveillance used for AHA incidence estimates and long-term trends [[Martin2025HDSS,Rosamond2012ARIC]].`,"what"],
 ["Aspirin",`An irreversible inhibitor of platelet COX-1 [[Undas2014]]. In ISIS-2 it cut 5-week vascular death from 11.8% to 9.4% [[ISIS2_1988]]. Doses are quoted from guidelines, never as instructions.`,"antithrombotic"],
 ["Atherosclerosis",`The slow build-up of fatty plaque in artery walls, often starting in the teens or twenties [[Strong1999PDAY,Tuzcu2001]].`,"plaque"],
 ["Atrial fibrillation (AF) after MI",`An irregular heart rhythm in 6–21% of acute MIs; it raises mortality and stroke risk, even when transient [[Schmitt2009AF]].`,"complications"],
 ["AV block (heart block)",`A conduction block between atria and ventricles. After inferior MI it usually reflects right coronary occlusion; in the PCI era its excess mortality is confined to the first 30 days [[Gang2012]].`,"complications"],
 ["Bempedoic acid",`An oral LDL-lowering drug for statin intolerance; CLEAR Outcomes MACE HR 0.87, with gout and gallstones to watch for [[Nissen2023CLEAR]].`,"lipids"],
 ["Beta-blocker",`A medicine that slows the heart. After MI with LVEF ≤40%, carvedilol lowered mortality (HR 0.77) [[Dargie2001CAPRICORN]]; with preserved EF, recent trials disagree [[Yndigegn2024REDUCE,Munkhaugen2025BETAMI]].`,"secondary"],
 ["Bivalirudin",`A direct thrombin inhibitor used during PCI instead of heparin. Trials disagree: in EUROMAX it cut death or major bleeding but raised acute stent thrombosis [[Steg2013EUROMAX]]; in HEAT-PPCI ischaemic events were higher than with heparin [[Shahzad2014HEAT]].`,"antithrombotic"],
 ["Bystander CPR",`Chest compressions by people at the scene before EMS arrives; linked with roughly doubled odds of 30-day survival (OR 2.15) [[HasselqvistAx2015]].`,"call"],
 ["CABG (coronary artery bypass grafting)",`Surgery that routes blood around blocked coronary arteries using a vein or artery graft [[Loop1986]].`,"cabg"],
 ["Calcified nodule",`An uncommon cause of coronary thrombosis, after rupture and erosion [[Virmani2006]].`,"plaque"],
 ["Cangrelor",`An intravenous, reversible P2Y12 inhibitor: onset within 2 minutes and offset within 1 hour [[FDA-Kengreal]].`,"antithrombotic"],
 ["Cardiac MRI (CMR)",`Magnetic resonance imaging of the heart; in MINOCA it often shows myocarditis (33%) [[Pasupathy2015]], and it detects LV thrombus more sensitively than echo [[Levine2022LVT]].`,"differential"],
 ["Cardiac rehabilitation (CR)",`A programme of exercise, education and support. Exercise-based CR cut MI (RR 0.72) and hospital admission at 6–12 months [[Dibben2026]].`,"rehab"],
 ["Cardiogenic shock",`End-organ hypoperfusion because the heart cannot pump enough; up to 10% after acute MI, with about 40% mortality at 30 days (population statistics) [[Samsky2021]].`,"complications"],
 ["Case fatality",`The share of people with an event who die of it. About 14% of people who have an MI die of it (ARIC, 2005–2014) [[Martin2025HDSS]].`,"what"],
 ["Chain of survival",`The linked steps of recognising arrest, calling, CPR and early defibrillation; the 2025 AHA guidelines emphasise high-quality compressions and early defibrillation [[DelRios2025AHA,Kleinman2025BLS]].`,"call"],
 ["Chest pain-equivalent symptoms",`ESC 2023 lists dyspnoea, epigastric pain, and pain in the left or right arm or neck/jaw [[Byrne2023ESC]].`,"symptoms"],
 ["Clopidogrel",`A P2Y12 prodrug activated mainly by CYP2C19; its boxed warning concerns poor metabolisers [[FDA-Plavix]]. CURE: 20% fewer events with aspirin in NSTE-ACS [[Yusuf2001CURE]].`,"antithrombotic"],
 ["Colchicine",`An anti-inflammatory drug. COLCOT after MI was positive, CLEAR SYNERGY neutral <span class="ev early">Early evidence</span> [[Tardif2019,Jolly2025]].`,"frontier"],
 ["Complete revascularisation",`Treating non-culprit narrowings as well as the culprit. In stable STEMI with multivessel disease it reduced CV death or MI (COMPLETE) [[Mehta2019COMPLETE]].`,"reperfusion"],
 ["Coronary care unit (CCU)",`A ward for monitored care of MI patients, begun with Julian's 1961 paper [[Julian1961CCU,Braunwald2012History]].`,"history"],
 ["COX-1",`Cyclooxygenase-1, the platelet enzyme that aspirin acetylates at serine 529 [[Undas2014]].`,"antithrombotic"],
 ["CTT (Cholesterol Treatment Trialists)",`The collaboration whose 2010 meta-analysis found about 22% fewer major vascular events per 1 mmol/L LDL-C lowering [[CTT2010]].`,"lipids"],
 ["Culprit lesion",`The plaque responsible for the acute event. In shock with multivessel disease, culprit-only PCI first was better (CULPRIT-SHOCK) [[Thiele2017CULPRIT]].`,"reperfusion"],
 ["CYP2C19",`The liver enzyme that activates clopidogrel; some people's genes make it work less well [[FDA-Plavix]].`,"antithrombotic"],
 ["DAPT (dual antiplatelet therapy)",`Aspirin plus a P2Y12 inhibitor. ESC 2023 default after ACS: aspirin plus prasugrel or ticagrelor for 12 months [[Byrne2023ESC]].`,"antithrombotic"],
 ["De-escalation",`Switching from a potent P2Y12 inhibitor to clopidogrel; ESC 2023 does not recommend it in the first 30 days after ACS [[Byrne2023ESC]].`,"antithrombotic"],
 ["de Winter pattern",`Upsloping precordial ST depression at the J point linked to proximal LAD occlusion without classic ST elevation [[deWinter2008,Thygesen2018UDMI4C]].`,"ecg"],
 ["Depression after MI",`About 1 in 5 people (19.8%) [[Thombs2006]]; it roughly doubles mortality risk (OR 2.25) [[Meijer2011]]. A treatable illness, not weakness.`,"living"],
 ["DIDO (door-in to door-out)",`Time spent at a non-PCI hospital before transfer; ESC 2023 recommends ≤30 minutes [[Byrne2023ESC]].`,"reperfusion"],
 ["Door-to-balloon time",`Time from hospital arrival to the first device in the artery. US medians fell from 96 min (2005) to 64 min (2010) [[Krumholz2011D2B]].`,"reperfusion"],
 ["Door-to-ECG time",`Time from arrival to the first ECG; the goal is ≤10 minutes. Women, Black patients and people without chest pain waited longer [[Yiadom2022]].`,"nursing"],
 ["Dressler syndrome (post-cardiac injury syndrome)",`Immune-mediated pericarditis after injury to the heart; treatment is empirical anti-inflammatory therapy plus colchicine [[Imazio2013]].`,"complications"],
 ["Driving after MI",`UK audits found written driving advice often missing from discharge summaries; teaching improved documentation [[Bharaj2021,Dyson2025]].`,"living"],
 ["Dyspnoea on ticagrelor",`Breathlessness in about 14% (PLATO), usually mild to moderate and often settling on treatment [[FDA-Brilinta]].`,"antithrombotic"],
 ["ECG (electrocardiogram)",`A recording of the heart's electrical activity; for suspected MI it should be done within 10 minutes of first medical contact [[Byrne2023ESC]].`,"ecg"],
 ["EMS (emergency medical services)",`Ambulance care. EMS transport was linked with shorter onset-to-arrival (89 vs 120 min) and door-to-balloon times [[Mathews2011]].`,"call"],
 ["Erosion (plaque erosion)",`Loss of the plaque surface without rupture; more common in younger patients, women and NSTE-ACS [[Farb1996,Jia2013OCT]].`,"plaque"],
 ["Evolocumab",`A PCSK9 antibody; in FOURIER it cut LDL-C 59% to a median 30 mg/dL (HR 0.85) [[Sabatine2017FOURIER]].`,"lipids"],
 ["Ezetimibe",`A pill that blocks cholesterol absorption; IMPROVE-IT: 2.0-point absolute reduction at 7 years after ACS [[Cannon2015IMPROVEIT]].`,"lipids"],
 ["Fatty streak",`An AHA type II lesion, the first lesion visible to the naked eye; types I–II are usual in children [[Stary1994]].`,"plaque"],
 ["Fibrinolysis (thrombolysis)",`Clot-dissolving drug treatment. ESC 2023: start within 10 min of STEMI diagnosis when primary PCI is not feasible within 120 min [[Byrne2023ESC]].`,"reperfusion"],
 ["First medical contact (FMC)",`The moment a patient is first assessed by a paramedic or clinician; the ECG clock starts here [[Byrne2023ESC]].`,"call"],
 ["Fondaparinux",`A factor Xa inhibitor; less bleeding than enoxaparin in NSTE-ACS (OASIS-5), but not recommended for primary PCI [[Yusuf2006OASIS5,Byrne2023ESC]].`,"antithrombotic"],
 ["Framingham Heart Study",`A US cohort that examined its first volunteer in 1948 and named "factors of risk" in 1961 [[Mahmood2014Framingham,Kannel1961Framingham]].`,"history"],
 ["Free wall rupture",`A tear in the outer wall of the ventricle, a rare mechanical complication usually within the first week [[Gong2021]].`,"complications"],
 ["Golden hour",`The first hour of symptoms, when fibrinolysis saved the most lives (65 per 1000) [[Boersma1996]].`,"reperfusion"],
 ["GP IIb/IIIa inhibitor",`An intravenous antiplatelet such as tirofiban; ESC 2023 reserves it for bail-out (no-reflow or thrombotic complication) [[Byrne2023ESC,FDA-Aggrastat]].`,"antithrombotic"],
 ["GRACE score",`A model of 8 in-hospital variables, including age, Killip class, blood pressure and creatinine [[Granger2003]]. GRACE >140 favours an early invasive strategy [[Byrne2023ESC]].`,"scores"],
 ["GTN (glyceryl trinitrate, nitroglycerin)",`A nitrate for angina; the label limits sublingual use to 3 tablets in 15 minutes and forbids use with PDE-5 inhibitors [[FDA-Nitrostat]].`,"nursing"],
 ["HEART score",`History, ECG, Age, Risk factors, Troponin, each 0–2, total 0–10 [[Six2008HEART]]. A clinician's teaching tool, not for self-triage.`,"scores"],
 ["Heart failure after MI",`A weaker pump after MI. In Framingham, 5-year HF incidence rose (27.6% to 31.9%) as more people survived the MI [[Velagaleti2008]].`,"complications"],
 ["Hibernation (hibernating myocardium)",`Muscle that stops contracting during ongoing low flow and recovers with revascularisation [[Rahimtoola1989]].`,"ischaemia"],
 ["High-sensitivity troponin (hs-cTn)",`Assays that detect troponin at very low levels, shortening the time to diagnosis to within 3 h in many patients [[Thygesen2018UDMI4C]].`,"troponin"],
 ["Home-based cardiac rehab",`Rehab at home with team support; outcomes similar to centre-based rehab [[McDonagh2023]].`,"rehab"],
 ["Hyperacute T waves",`Tall, broad-based, symmetrical T waves that may come before ST elevation [[Thygesen2018UDMI4C]].`,"ecg"],
 ["IABP (intra-aortic balloon pump)",`A balloon in the aorta that inflates in diastole. Routine use did not reduce mortality in MI with shock (IABP-SHOCK II) [[Thiele2012IABP]].`,"complications"],
 ["ICD (implantable cardioverter-defibrillator)",`A device that shocks dangerous rhythms. Early ICDs after MI did not cut total mortality [[Hohnloser2004DINAMIT]]; later, with LVEF ≤30%, they did (MADIT-II) [[Moss2002MADIT]].`,"complications"],
 ["Inclisiran",`A small interfering RNA that lowers LDL-C about 50% with injections at day 1, day 90, then every 6 months [[Ray2020ORION,FDA-Leqvio]].`,"lipids"],
 ["Infarct size",`How much muscle dies. Each 5% larger infarct was linked to HR 1.19 for 1-year death after primary PCI [[Stone2016InfarctSize]].`,"ischaemia"],
 ["Influenza vaccination",`A flu shot soon after MI reduced death, MI or stent thrombosis at 12 months (IAMI, HR 0.72) [[Frobert2021IAMI]].`,"secondary"],
 ["Internal mammary artery graft",`The chest-wall artery grafted to the LAD in CABG; vein-only patients had 1.61 times the 10-year risk of death [[Loop1986]].`,"cabg"],
 ["INTERHEART",`A case-control study in 52 countries: nine modifiable factors explained 90% (men) and 94% (women) of the risk of a first MI [[Yusuf2004INTERHEART]].`,"risk"],
 ["Ischaemia",`Too little blood flow for the muscle's needs; prolonged ischaemia causes necrosis from the inner wall outward [[Reimer1977]].`,"ischaemia"],
 ["Ischaemic preconditioning",`Brief prior occlusions that protect muscle: four 5-minute occlusions cut infarct size to 25% of control in dogs [[Murry1986]].`,"ischaemia"],
 ["J point",`Where the QRS ends and the ST segment begins; ST elevation is measured here [[Thygesen2018UDMI4C]].`,"ecg"],
 ["Killip class",`A bedside heart-failure grading in MI; part of GRACE (OR 2.0 per class) [[Granger2003]]. Named after Killip and Kimball's 1967 CCU report [[Killip1967CCU]].`,"scores"],
 ["LAD (left anterior descending artery)",`The coronary artery down the front of the heart. The de Zwaan–Wellens pattern marks a critical stenosis high in the LAD [[deZwaan1982]].`,"ecg"],
 ["LBBB (left bundle branch block)",`A conduction pattern that "precludes an accurate assessment" of ST elevation; with high suspicion, manage like STEMI [[Byrne2023ESC]].`,"ecg"],
 ["LDL cholesterol (LDL-C)",`The cholesterol in low-density lipoproteins, a cause of atherosclerotic disease [[Ference2017EAS]].`,"lipids"],
 ["Left main disease",`Narrowing of the left main coronary artery; PCI and CABG gave similar 5-year death in pooled trials (10.7% vs 10.5%) [[Head2018]].`,"cabg"],
 ["Lp(a) (lipoprotein(a))",`An inherited LDL-like particle, more than 90% genetic [[Kronenberg2022]]. ≥50 mg/dL (≥125 nmol/L) is a risk-enhancing factor [[Arnett2019ACC]].`,"risk"],
 ["LV thrombus",`A clot in the left ventricle, up to 25% after anterior MI with optimal imaging; anticoagulation prevents embolism [[McCarthy2018LVT]].`,"complications"],
 ["LVEF (left ventricular ejection fraction)",`The share of blood the left ventricle pumps out per beat; ≤30% after MI raised early sudden-death risk to 2.3% per month [[Solomon2005VALIANT]].`,"complications"],
 ["MACE",`Major adverse cardiac events, a composite trial end point; HEART 0–3 carried 1.7% 6-week MACE [[Backus2013]].`,"scores"],
 ["Mechanical complications",`Septal, free wall or papillary muscle rupture; 0.27% of STEMI but 42.4% in-hospital mortality [[Elbadawi2019]].`,"complications"],
 ["Microaxial flow pump",`A catheter pump (Impella CP); in DanGer Shock it lowered 180-day death in selected STEMI shock, with more complications [[Moller2024DanGer]].`,"complications"],
 ["MINOCA",`MI with non-obstructive coronary arteries: about 6% of MI; a working diagnosis that needs a cause [[Pasupathy2015,TamisHolland2019MINOCA]].`,"what"],
 ["Morphine and P2Y12 absorption",`Morphine reduced ticagrelor exposure by about 36% and delayed its peak [[Kubica2016]].`,"nursing"],
 ["Myocardial infarction (MI)",`Heart attack: acute myocardial injury with clinical evidence of acute ischaemia [[Thygesen2018UDMI4,Domienik2021UDMI4]].`,"what"],
 ["Myocardial injury",`A troponin above the 99th-percentile URL; acute if it rises and/or falls. Without ischaemia it is not MI [[Thygesen2018UDMI4C]].`,"troponin"],
 ["Necrotic core",`The lipid-rich, dead centre of a plaque under the fibrous cap [[Virmani2006]].`,"plaque"],
 ["NSTE-ACS",`Non-ST-elevation acute coronary syndrome: NSTEMI and unstable angina; the ECG may be normal in more than a third [[Byrne2023ESC]].`,"what"],
 ["NSTEMI",`Non-ST-elevation MI; troponin testing raised its counts and it now makes up the majority of MIs [[Roger2010Olmsted]].`,"what"],
 ["Occlusion MI (OMI)",`A proposed paradigm based on whether the culprit artery is occluded; STEMI criteria were 41% sensitive for OMI <span class="ev hyp">Hypothesis</span> as a replacement for STEMI/NSTEMI [[Meyers2021OMI]].`,"ecg"],
 ["Oxygen therapy",`Routine oxygen with SpO2 ≥90% did not lower mortality [[Hofmann2017]]; continued SpO2 monitoring is needed [[Hofmann2017]].`,"nursing"],
 ["P2Y12 inhibitor",`An antiplatelet blocking the platelet ADP receptor: clopidogrel, prasugrel, ticagrelor or cangrelor [[FDA-Plavix,FDA-Brilinta]].`,"antithrombotic"],
 ["Papillary muscle rupture",`Rupture of a mitral valve support muscle, causing acute mitral regurgitation; 36.3% in-hospital mortality [[Bhardwaj2020]].`,"complications"],
 ["Patent haemostasis",`Compression after radial access that keeps the artery open, confirmed by Barbeau's test; cut radial occlusion 75% at 30 days [[Pancholy2008]].`,"nursing"],
 ["Patient delay",`Time from symptom onset to seeking care; an AHA statement calls it "the major factor limiting delivery of definitive treatment" [[Moser2006]].`,"call"],
 ["PCI (percutaneous coronary intervention)",`Opening a coronary artery with a wire, balloon and stent through the wrist or groin [[Keeley2003,Valgimigli2015MATRIX]].`,"reperfusion"],
 ["PCSK9 inhibitor",`An injected antibody (evolocumab, alirocumab) that sharply lowers LDL-C [[Sabatine2017FOURIER,Schwartz2018ODYSSEY]].`,"lipids"],
 ["Pericarditis",`Inflammation of the sac around the heart: chest pain, a rub, ECG changes and effusion [[Imazio2015]]. Early post-MI pericarditis fell to 1.2% in the reperfusion era [[Lador2018]].`,"differential"],
 ["Pharmaco-invasive strategy",`Fibrinolysis followed by angiography; in STREAM, similar outcomes to primary PCI when PCI could not be done within 1 hour [[Armstrong2013STREAM]].`,"reperfusion"],
 ["Plaque rupture",`A crack in a plaque's fibrous cap that exposes the core to blood; the most common cause of coronary thrombosis [[Virmani2006,Falk2013]].`,"plaque"],
 ["Platelet",`A tiny blood cell that sticks, activates and clumps on an exposed plaque, starting the clot [[Byrne2023ESC]].`,"plaque"],
 ["Polypill",`One tablet combining several heart medicines; SECURE (aspirin, ramipril, atorvastatin) cut MACE (HR 0.76) <span class="ev early">Early evidence</span> [[Castellano2022SECURE]].`,"secondary"],
 ["Prasugrel",`A potent, irreversible P2Y12 inhibitor; beat clopidogrel in TRITON with more bleeding [[Wiviott2007TRITON]]. Contraindicated after TIA or stroke [[FDA-Effient]].`,"antithrombotic"],
 ["PRECISE-DAPT",`A five-item bleeding score; ≥25 marks high bleeding risk on DAPT [[Costa2017PRECISE]].`,"antithrombotic"],
 ["Prehospital ECG",`An ECG recorded in the ambulance; median door-to-balloon 61 vs 75 min with it [[Diercks2009]].`,"call"],
 ["Primary PCI",`PCI as the first reperfusion treatment for STEMI; preferred if done within 120 min of the ECG diagnosis [[Byrne2023ESC]].`,"reperfusion"],
 ["Proton pump inhibitor (PPI)",`A stomach-protecting drug; in COGENT omeprazole cut GI events on DAPT [[Bhatt2010COGENT]]. The Plavix label advises avoiding omeprazole or esomeprazole [[FDA-Plavix]].`,"antithrombotic"],
 ["PTSD after ACS",`Trauma-like stress symptoms in about 12%, doubling the risk of recurrence or death [[Edmondson2012]].`,"living"],
 ["Pulmonary embolism (PE)",`A clot in the lung arteries that can mimic MI; the Wells score and PERC rule help assess probability [[Wells2000,Kline2008]].`,"differential"],
 ["Q wave (pathological)",`A deep, wide Q wave showing necrosis; prior-MI Q waves are most specific when >0.04 s or in several leads [[Thygesen2018UDMI4C]].`,"ecg"],
 ["Radial access",`PCI through the wrist artery; the ESC lists it as default access to reduce bleeding [[Byrne2023ESC]].`,"reperfusion"],
 ["Radial artery occlusion",`Closure of the wrist artery after radial access: 7.7% within 24 h and 5.5% after a week [[Rashid2016]].`,"nursing"],
 ["Red-flag symptoms",`ESC 2023: prolonged chest pain (>15 minutes) and/or pain that recurs within 1 hour should prompt contact with emergency services [[Byrne2023ESC]].`,"symptoms"],
 ["\"Atypical\" (a word to avoid)",`The ESC and AHA/ACC advise against calling chest pain "atypical"; describe it as cardiac, possibly cardiac or noncardiac [[Gulati2021ChestPain,Byrne2023ESC]].`,"symptoms"],
 ["Core components of cardiac rehab",`Patient assessment, nutritional counselling, risk-factor management, psychosocial support, and physical-activity counselling with exercise training; the 2024 update adds programme quality [[Brown2024]].`,"rehab"],
 ["HIIT (high-intensity interval training)",`Short bursts of hard exercise; in cardiac rehab it improved fitness more than moderate continuous training (SMD 0.34) [[Hannan2018]].`,"rehab"],
 ["Readmission",`Return to hospital. 19.9% of Medicare AMI stays were followed by readmission within 30 days, most not for MI [[Dharmarajan2013]].`,"nursing"],
 ["Reperfusion",`Restoring blood flow in a blocked artery by PCI or fibrinolysis, within 12 hours of symptom onset in the ESC guideline [[Byrne2023ESC]].`,"reperfusion"],
 ["Reperfusion injury",`Damage at the moment flow returns; no drug or conditioning strategy has yet shown clinical benefit <span class="ev hyp">Hypothesis</span> [[Hausenloy2019CONDI2,Cung2015CIRCUS]].`,"frontier"],
 ["Rescue PCI",`Urgent PCI when fibrinolysis fails [[Byrne2023ESC]].`,"reperfusion"],
 ["Retroperitoneal haemorrhage",`Bleeding behind the abdomen after femoral access (OR 19.66), 0.06% of PCIs [[Kwok2018]].`,"nursing"],
 ["Return to work",`About 81% return to work after MI, ACS or angina [[Kai2022]].`,"living"],
 ["Right ventricular infarction",`Infarction of the right ventricle in inferior MI; ST elevation in V4R had 88% sensitivity [[Zehender1993]].`,"complications"],
 ["SCAD (spontaneous coronary artery dissection)",`A tear inside a coronary artery, mostly in women (88.5%), linked to fibromuscular dysplasia [[Saw2019,Hayes2018]].`,"differential"],
 ["SCAI shock stages",`A to E: at risk, beginning, classic, deteriorating, extremis [[Baran2019SCAI]].`,"complications"],
 ["Sex-specific troponin thresholds",`Different 99th-percentile limits for women and men (for example 16 vs 34 ng/L for one hs-cTnI assay) [[Ferry2019,Lee2019]].`,"troponin"],
 ["Sexual activity after MI",`A very small, transient extra risk (2–3 MIs per 10,000 person-years per extra hour a week), smaller with regular exercise [[Dahabreh2011]].`,"living"],
 ["Sgarbossa criteria",`ECG criteria for MI in LBBB: concordant ST elevation, ST depression in V1–V3 and discordant ST elevation ≥5 mm [[Sgarbossa1996]]. The Smith modification uses an ST/S ratio ≤ −0.25 [[Smith2012]].`,"ecg"],
 ["SGLT2 inhibitor",`A diabetes and heart-failure drug class; after MI, EMPACT-MI and DAPA-MI did not cut death or HF hospitalisation as primary hard end points [[Butler2024EMPACT,James2024DAPAMI]].`,"secondary"],
 ["Silent MI",`An MI without significant symptoms, found later on an ECG; more than 45% of incident MIs in ARIC [[Zhang2016SilentMI]].`,"what"],
 ["Smoking cessation",`Quitting after a coronary diagnosis is associated with 36% lower mortality [[Critchley2003]]; quitting medicine started in hospital helps [[Eisenberg2016EVITA]].`,"secondary"],
 ["ST elevation",`J-point elevation ≥1 mm in 2 contiguous leads, with higher V2–V3 thresholds [[Thygesen2018UDMI4C]].`,"ecg"],
 ["Statin",`The first-line LDL-lowering medicine; high-intensity atorvastatin beat pravastatin after ACS (PROVE IT) [[Cannon2004PROVEIT]].`,"lipids"],
 ["STEMI",`ST-elevation MI, usually a fully blocked artery; 28% of US MI hospitalisations (2005–2019) [[Martin2025HDSS]].`,"what"],
 ["Stent",`A mesh tube that holds a coronary artery open after balloon dilatation; Sigwart reported coronary stents in 1987 [[Sigwart1987Stents]].`,"reperfusion"],
 ["Streptokinase",`A fibrinolytic drug; in GISSI it cut 21-day mortality to 10.7% vs 13% [[GISSI1986]].`,"history"],
 ["Stunning (stunned myocardium)",`Pump dysfunction that persists after blood flow returns and recovers over time [[Braunwald1982]].`,"ischaemia"],
 ["Sudden cardiac death",`Unexpected death from a rhythm disturbance; after MI, risk is highest in the first 30 days (1.4% per month) [[Solomon2005VALIANT]].`,"complications"],
 ["Takotsubo syndrome",`Stress-related, usually apical, ballooning of the left ventricle that mimics MI; about 90% women [[Ghadri2018,Templin2015]].`,"differential"],
 ["Thin-cap fibroatheroma (TCFA)",`A vulnerable plaque with a cap <65 µm over a necrotic core [[Virmani2006]].`,"plaque"],
 ["Thrombus aspiration",`Sucking out clot during primary PCI; no routine benefit (TOTAL, TASTE) [[Jolly2015TOTAL,Frobert2013TASTE]].`,"reperfusion"],
 ["Ticagrelor",`A reversible P2Y12 inhibitor that needs no activation; PLATO: fewer events and deaths than clopidogrel [[Wallentin2009PLATO,FDA-Brilinta]].`,"antithrombotic"],
 ["TIMI risk score",`Seven one-point items for UA/NSTEMI, including aspirin in the prior 7 days [[Antman2000]].`,"scores"],
 ["Time is muscle",`The principle that earlier reperfusion saves more muscle; each 30 min of PCI delay carried RR 1.075 for 1-year death [[DeLuca2004,Gersh2005JAMA]].`,"ischaemia"],
 ["Troponin",`A heart-muscle protein released when muscle is damaged; the blood test that confirms MI [[Thygesen2018UDMI4C,Katus1989TnT]].`,"troponin"],
 ["Type 1 MI",`Atherothrombotic MI: a clot on a ruptured or eroded plaque [[Thygesen2018UDMI4C]].`,"what"],
 ["Type 2 MI",`MI from a supply/demand mismatch without acute atherothrombosis, about 20–26% of adjudicated MIs [[Saaby2013Type2,Chapman2018Type2]].`,"what"],
 ["Universal Definition of MI",`The consensus definitions of 2007, 2012 and 2018 (fourth, UDMI4) [[Thygesen2007UDMI,Thygesen2012UDMI3,Thygesen2018UDMI4]].`,"what"],
 ["Ventricular septal rupture",`A hole torn in the septum after MI: 0.2% in GUSTO-I, with 73.8% 30-day mortality [[Crenshaw2000]].`,"complications"],
 ["VT/VF",`Ventricular tachycardia or fibrillation; about 90% in primary-PCI STEMI occurs within 48 hours [[Mehta2009APEX]].`,"complications"],
 ["Waist-to-hip ratio",`A body-shape measure that predicts MI better than BMI (PAR 24.3% vs 7.7%) [[Yusuf2005Obesity]].`,"risk"],
 ["Wavefront phenomenon",`Necrosis spreading from the subendocardium to the subepicardium over hours (dogs) [[Reimer1977]].`,"ischaemia"],
 ["Wearable defibrillator",`A vest that can shock; VEST did not significantly reduce arrhythmic death at 90 days [[Olgin2018VEST]].`,"complications"],
 ["Wellens (de Zwaan–Wellens) pattern",`Precordial ST-T changes in unstable angina marking critical proximal LAD stenosis; 75% of untreated patients had an anterior MI within weeks [[deZwaan1982]].`,"ecg"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'p2y12' or 'type 2' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, burden, types & history',B:'Atherosclerosis, plaque rupture, thrombosis, ischaemia & risk factors',C:'Presentation, ECG, troponin, risk scores & differential diagnosis',D:'First minutes, emergency services & reperfusion (PCI, fibrinolysis, CABG)',E:'Antithrombotic therapy in acute coronary syndromes',F:'Complications, cardiogenic shock, prognosis & research toward better treatment',G:'Secondary prevention medicines and LDL lowering',H:'Cardiac rehabilitation, living after a heart attack & nursing care'};
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
