/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js */
const STRV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const STRV_FC=[
 /* ---- Part 1: what, vessels, cascade, causes, bleeds, tia ---- */
 [1,`How does the classic WHO definition describe a stroke?`,`A focal (or global) deficit lasting more than 24 hours or leading to death, with no apparent cause other than a vascular one [[Engelhardt2017]].`],
 [1,`What did the AHA/ASA 2013 definition add?`,`Imaging or pathology evidence of infarction counts, even if symptoms are brief. Silent infarction has no known symptoms [[Sacco2013]].`],
 [1,`What are the global shares of the three stroke types?`,`GBD 2021: ischaemic 65.3%, intracerebral haemorrhage 28.8%, subarachnoid haemorrhage 5.8% [[Feigin2024]].`],
 [1,`What is the worldwide burden of stroke in GBD 2021?`,`11.9 million new strokes, 93.8 million people living after stroke, 7.3 million deaths and 160.5 million DALYs [[Feigin2024]].`],
 [1,`What is the lifetime risk of stroke from age 25?`,`About 25%, or 1 in 4 [[Feigin2018]]. This is a population figure.`],
 [1,`What does "counts up, rates down" mean?`,`From 1990 to 2021, new strokes rose 70.2% while age-standardised incidence fell 21.8% [[Feigin2024]].`],
 [1,`Which single risk factor carries the largest share of stroke DALYs?`,`High systolic blood pressure, 56.8% [[Feigin2025]].`],
 [1,`How often does stroke recur over time?`,`Pooled: 11.1% at 1 year, 26.4% at 5 years, 39.2% at 10 years [[Mohan2011]].`],
 [1,`How complete is the circle of Willis in a general population?`,`Complete in only 11.9% of the Tromso population sample on 3T MR angiography [[Hindenes2020]].`],
 [1,`Leg-predominant weakness with abulia points to which artery?`,`The anterior cerebral artery [[Stebner2025]].`],
 [1,`What does an entire MCA syndrome include?`,`Contralateral gaze palsy, hemiplegia, hemisensory loss, neglect and hemianopsia, with global aphasia if on the left [[Lo2025]].`],
 [1,`What signs define Wallenberg syndrome?`,`Ipsilateral face and contralateral body loss of pain and temperature sense, with ipsilateral Horner syndrome [[Lo2025]].`],
 [1,`Name the five classic lacunar syndromes.`,`Pure motor, pure sensory, sensorimotor, ataxic hemiparesis and dysarthria-clumsy hand [[Arboix2009]].`],
 [1,`What are the Oxfordshire shares?`,`Of infarcts in the original project: TACI 17%, PACI 34%, POCI 24%, LACI 25% [[Bamford1991]].`],
 [1,`What is spared in locked-in syndrome?`,`Vertical eye movement and blinking [[Das2023]].`],
 [1,`How much is lost each minute in a large-vessel stroke, by Saver's estimate?`,`1.9 million neurons, 14 billion synapses and 12 km of myelinated fibres [[Saver2006]].`],
 [1,`What are the key blood-flow numbers?`,`Normal flow is about 50-60 mL/100 g/min. Below 10-20 mL/100 g/min is the injury zone [[Mangiardi2023]].`],
 [1,`What is the ischaemic penumbra?`,`Tissue in the perfusion range between two flow thresholds. Flow restored above the functional threshold can reverse deficits without permanent damage [[Heiss2011]].`],
 [1,`How fast do SELECT slow progressors grow?`,`Under 10 mL per hour [[Sarraj2021]]. Collaterals matter: growth was 52.3 cm3 with poor and 0.9 cm3 with good collaterals in one series [[Vagal2018]].`],
 [1,`When is the delayed opening of the blood-brain barrier?`,`At 24-72 hours, after a reversible early opening [[Yang2011]].`],
 [1,`What are the five TOAST subtypes?`,`Large-artery atherosclerosis, cardioembolism, small-vessel occlusion, other determined and undetermined cause [[Adams1993]]. Large-artery needs over 50% stenosis [[Kim2014]].`],
 [1,`What is ESUS?`,`A non-lacunar infarct with no proximal stenosis or cardioembolic source [[Hart2014]]. Three anticoagulant trials against aspirin were neutral [[Hart2018,Diener2019,Kamel2024]].`],
 [1,`How much AF did long-term monitoring find in CRYSTAL AF?`,`12.4% at 12 months and 30.0% at 36 months [[Sanna2014,Brachmann2016]].`],
 [1,`What does SMASH-U classify, and what are the shares?`,`The cause of ICH: hypertensive angiopathy 35%, undetermined 21%, amyloid 20%, anticoagulation 14%, structural 5%, systemic disease 5% [[Meretoja2012]].`],
 [1,`What does the location of an ICH suggest?`,`Deep bleeds point to hypertensive disease, and lobar bleeds to cerebral amyloid angiopathy [[Magid2022,An2017]].`],
 [1,`How good is the CT angiography spot sign at predicting expansion?`,`Specificity 85%, sensitivity 51% [[Demchuk2012]].`],
 [1,`What do the Ottawa SAH Rule's numbers show?`,`Six items, sensitivity 100% in derivation, specificity about 15% [[Perry2013]].`],
 [1,`Why does the 6-hour mark matter for CT in suspected SAH?`,`Within 6 hours sensitivity was 100%, on a modern scanner read by a qualified radiologist [[Perry2011]].`],
 [1,`What is the tissue definition of TIA?`,`A transient episode of focal neurological dysfunction from ischaemia, without acute infarction [[Easton2009]].`],
 [1,`What 2-day stroke risk went with an ABCD2 score of 6-7?`,`8.1%, against 4.1% at 4-5 and 1.0% at 0-3 [[Johnston2007]].`],
 [1,`What did EXPRESS show about urgent TIA care?`,`90-day stroke fell from 10.3% to 2.1% [[Rothwell2007]].`],
 [1,`What does NICE say about ABCD2?`,`Do not use it to decide urgency [[NICE-NG128]].`],

 /* ---- Part 2: signs, imaging, nihss ---- */
 [2,`What did adding balance and eyes do in the BE-FAST study?`,`Missed ischaemic strokes fell from 14.1% to 4.4%. The study was retrospective and could not measure specificity [[Aroor2017]].`],
 [2,`What share of haemorrhages does FAST miss?`,`About 30.6% [[Kleindorfer2007]].`],
 [2,`What are the items of the Cincinnati scale (CPSS)?`,`Arm, speech and face [[Kothari1999]].`],
 [2,`What are the published LVO thresholds for RACE and LAMS?`,`RACE 5 or more and LAMS 4 or more [[PerezDeLaOssa2014,Nazliel2008]]. No clinical scale reliably gives both high sensitivity and high specificity [[Smith2018]].`],
 [2,`How often are cerebrovascular events missed at the first emergency visit?`,`Roughly 9%, with a false-negative rate of 39.4% when the complaint is dizziness [[Tarnutzer2017]].`],
 [2,`Is posterior stroke misdiagnosed more often than anterior?`,`About twice as often: 37% against 16% [[Arch2016]].`],
 [2,`How common are stroke mimics?`,`About 30% of people seen by a stroke team [[Merino2013]]. The most frequent are seizure, syncope, sepsis, migraine and brain tumours [[Gibson2013]].`],
 [2,`What is the risk of symptomatic haemorrhage if a mimic is thrombolysed?`,`About 0.5 to 1% [[Tsivgoulis2015,Zinkstok2013]].`],
 [2,`How sensitive is CT against MRI for acute stroke?`,`26% against 83% for any acute stroke [[Chalela2007]]. CT reached 41.8% in the posterior fossa [[Hwang2012]].`],
 [2,`How does ASPECTS score?`,`10 regions, 10 is normal, subtract 1 per region with early ischaemic change. Poor outcome rises sharply at 7 or less [[Pexman2001]].`],
 [2,`What were the DEFUSE 3 imaging criteria?`,`Core below 70 mL, mismatch ratio of 1.8 or more and penumbra of 15 mL or more, at 6 to 16 hours [[Albers2018]].`],
 [2,`What does a DWI-positive, FLAIR-negative lesion suggest?`,`Onset within about 4.5 hours [[Thomalla2011,Thomalla2018]].`],
 [2,`What was the Helsinki principle, and what did it reach?`,`Do as much as possible before arrival. Median door-to-needle fell from 105 minutes in 1998 to 20 in 2011 [[Meretoja2012D]].`],
 [2,`What is the structure of the NIHSS?`,`15 elements and a maximum of 42 [[Budincevic2022]].`],
 [2,`What are the two named weaknesses of the NIHSS?`,`Left hemisphere bias and poor capture of posterior strokes [[Woo1999,Sato2008]].`],
 [2,`What did NIHSS scores forecast in TOAST?`,`16 or more forecast death or severe disability, and 6 or less forecast good recovery [[Adams1999]].`],
 [2,`What separates mRS 3 from mRS 4?`,`Grade 3 walks without assistance, with some help. Grade 4 cannot walk without assistance. Grade 6 is death [[Luo2026]].`],

 /* ---- Part 3: lysis, evt, ich, sah, unit ---- */
 [3,`What is the published alteplase dose for stroke?`,`0.9 mg/kg, maximum 90 mg, 10% as a bolus over 1 minute and the rest over 60 minutes [[FDA-Activase]].`],
 [3,`What is the published tenecteplase stroke dose?`,`0.25 mg/kg, maximum 25 mg, single bolus [[Menon2022,FDA-TNKase]]. 0.40 mg/kg gave no reperfusion gain [[Campbell2020JAMA]].`],
 [3,`What did NINDS show for symptomatic ICH and mortality?`,`Symptomatic ICH 6.4% against 0.6%, with 3-month mortality 17% against 21% [[NINDS1995]].`],
 [3,`How does time change alteplase benefit?`,`mRS 0-1 was 32.9% against 23.1% within 3 hours and 35.3% against 30.1% from 3 to 4.5 hours [[Emberson2014]].`],
 [3,`Do lytics help non-disabling minor stroke?`,`PRISMS, ARAMIS and TEMPO-2 did not show benefit [[Khatri2018,Chen2023,Coutts2024]].`],
 [3,`What drug history predicts angio-oedema with alteplase?`,`Prior ACE inhibitor use (OR 2.3) [[Hurford2015]].`],
 [3,`What did the ESO set as blood pressure thresholds around lysis?`,`Below 185/110 before, and below 180/105 during and for 24 hours after [[Sandset2026]].`],
 [3,`What is the HERMES headline?`,`Five trials, 1287 patients, common OR 2.49, and a number needed to treat of 2.6 for at least one mRS level better [[Goyal2016]].`],
 [3,`How do DAWN and DEFUSE 3 select people?`,`DAWN: clinical-core mismatch at 6 to 24 hours. DEFUSE 3: perfusion mismatch at 6 to 16 hours [[Nogueira2018,Albers2018]].`],
 [3,`What does each hour of delay cost in thrombectomy?`,`Functional independence falls 5.2 percentage points [[Saver2016]].`],
 [3,`What did basilar trials count as a good outcome, and what did ATTENTION find?`,`mRS 0-3: 46% against 23%, with mortality 37% against 55% [[Tao2022]].`],
 [3,`Did thrombectomy help medium-vessel occlusion?`,`ESCAPE-MeVO and DISTAL were neutral on function [[Goyal2025,Psychogios2025]].`],
 [3,`Why not push systolic pressure below 140 after thrombectomy?`,`In OPTIMAL-BP it reduced functional independence (39.4% against 54.4%), and the ESO recommends against it [[Nam2023,Sandset2026]].`],
 [3,`What goes into the ICH score?`,`GCS (0 to 2), age 80 or over, infratentorial origin, volume 30 cm3 or more, and intraventricular blood [[Hemphill2001]].`],
 [3,`What does AHA/ASA 2022 say about systolic pressure below 130 in ICH?`,`It calls this potentially harmful in mild to moderate ICH [[Greenberg2022]].`],
 [3,`What reverses warfarin best in ICH?`,`Four-factor PCC beat FFP for INR correction: INR 1.2 or lower within 3 hours in 67% against 9% (INCH) [[Steiner2016]].`],
 [3,`What is the story of factor VIIa in ICH?`,`It slowed haematoma growth without improving function, in FAST and FASTEST [[Mayer2008,Broderick2026]].`],
 [3,`When is cerebellar ICH a Class 1 indication for surgery?`,`At 15 mL or more, or with brainstem compression or hydrocephalus, in AHA/ASA 2022 [[Greenberg2022]].`],
 [3,`What nimodipine regimen did BRANT use?`,`60 mg orally every 4 hours for 21 days. Capsules are never given intravenously [[Pickard1989,FDA-Nimodipine]].`],
 [3,`When does delayed cerebral ischaemia happen?`,`Mostly days 4 to 14, with a peak at days 6 to 10 [[Hoh2023]].`],
 [3,`What did ISAT show?`,`About 7% less death or dependence at 1 year with coiling, and more late rebleeding [[Molyneux2005]].`],
 [3,`How much difference does a stroke unit make?`,`For every 100 people treated: 2 more survive, 6 more live at home, 6 more live independently [[Langhorne2020]].`],
 [3,`What is FeSS, and what did QASC find?`,`Nurse-initiated protocols for Fever, Sugar and Swallow, with a number needed to treat of 6.4 for death or dependency at 90 days [[Middleton2011]].`],
 [3,`What is the benefit of aspirin started within 48 hours?`,`A net 9 fewer further strokes or deaths per 1000 in hospital [[Chen2000]].`],
 [3,`What did CLOTS teach?`,`Stockings failed in CLOTS 1, thigh-length beat below-knee in CLOTS 2, and intermittent pneumatic compression worked in CLOTS 3 [[Dennis2009,Dennis2010,Dennis2013]].`],
 [3,`What is the number needed to treat for craniectomy in the pooled trials?`,`Two for survival, within 48 hours at age 60 or under [[Vahedi2007]]. Over 60: 38% against 18% survived without severe disability [[Juttler2014]].`],

 /* ---- Part 4: prevent, af, carotid ---- */
 [4,`What did INTERSTROKE find?`,`Ten factors made up about 90% of population attributable risk, with hypertension the largest at 47.9% [[ODonnell2016]].`],
 [4,`How much does a 10 mm Hg fall in systolic pressure lower stroke?`,`By about 27% [[Ettehad2016]].`],
 [4,`What is the trade-off in SPARCL?`,`Fewer strokes overall but more haemorrhagic strokes (55 against 33) [[Amarenco2006]].`],
 [4,`When does dual antiplatelet benefit sit after minor stroke?`,`In the first 21 days [[Pan2019]]. Long-term dual therapy in lacunar stroke raised bleeding and death [[Benavente2012]].`],
 [4,`Which CHA2DS2-VASc items score 2?`,`Age 75 or over and previous thromboembolism [[Olesen2011]].`],
 [4,`How much does warfarin lower stroke in AF?`,`64%, against 22% for antiplatelets [[Hart2007]]. DOACs halve intracranial haemorrhage compared with warfarin [[Ruff2014]].`],
 [4,`What is the 5-year gain from carotid surgery by stenosis?`,`70% or more: 16% absolute gain. 50-69%: 4.6%. Below 30%: harm [[Rothwell2003]].`],
 [4,`How much does timing of carotid surgery matter?`,`Number needed to treat 5 within 2 weeks, against 125 after 12 weeks [[Rothwell2004]].`],
 [4,`What is the CREST trade-off?`,`More periprocedural stroke with stenting (4.1% against 2.3%), and more MI with surgery (2.3% against 1.1%) [[Brott2010]].`],
 [4,`What did SAMMPRIS show?`,`Intracranial stenting was worse than aggressive medical therapy at 30 days: 14.7% against 5.8% [[Chimowitz2011]].`],
 [4,`When does PASCAL rate a PFO as probable?`,`RoPE of 7 or more plus a large shunt or atrial septal aneurysm [[Chambers2026]].`],

 /* ---- Part 5: rehab, after, nursing, frontier ---- */
 [5,`How fast does function recover in the Copenhagen data?`,`80% reached best ADL function by 6 weeks and 95% by 12.5 weeks [[Jorgensen1995]].`],
 [5,`What is proportional recovery, and why is it disputed?`,`About 0.7 of initial impairment, except a severe subgroup [[Prabhakaran2008,Winters2015]]. Statistical coupling may inflate it [[Hope2019]].`],
 [5,`What did the 2026 AHA/ASA rehabilitation guideline say on early mobilisation?`,`Mobilise from 24 to 48 hours (COR 1), and no high-dose mobilisation in the first 24 hours (COR 3: Harm) [[Richards2026]].`],
 [5,`When did extra arm therapy work best in CPASS?`,`At 2 to 3 months after stroke [[Dromerick2021]].`],
 [5,`Which arm trials were positive and which neutral?`,`EXCITE was positive, ICARE and RATULS neutral [[Wolf2006,Winstein2016JAMA,Rodgers2019]].`],
 [5,`What did FCET2EC and VERSE show for aphasia therapy?`,`FCET2EC showed benefit in chronic aphasia, and VERSE no benefit from early intensive therapy [[Breitenstein2017,Godecke2021]].`],
 [5,`Does fluoxetine aid recovery?`,`No functional benefit in large trials, with less depression and more fractures [[Dennis2019,Hankey2020,Lundstrom2020,Legg2021]].`],
 [5,`What does botulinum toxin do for arm spasticity?`,`Less resistance to passive movement and better self-care, but no gain in arm capacity [[Andringa2019]].`],
 [5,`How common are mood and pain problems after stroke?`,`Depression about 31% [[Hackett2014]], anxiety 29% [[Rafsten2018]], fatigue 48% [[Alghamdi2021]], central pain 11% [[Liampas2020]].`],
 [5,`What are the dementia figures?`,`10% develop dementia soon after a first stroke, and more than a third have it after recurrent stroke [[Pendlebury2009]].`],
 [5,`What are the UK driving rules after stroke, as published?`,`Group 1: 1 month off driving. Group 2: 1 year. Rules differ by country [[DVLA-Neuro]].`],
 [5,`What is the standard observation schedule after thrombolysis?`,`Every 15 minutes for 2 hours, every 30 minutes for 6 hours, then hourly until 24 hours, as described in OPTIMISTmain [[Anderson2025F]].`],
 [5,`When should a swallow screen happen, in the FeSS wording?`,`Within 4 hours of admission and before oral food, drink or medications [[Fasugba2023]].`],
 [5,`Why does dysphagia matter so much?`,`Dysphagia raises pneumonia risk (RR 3.17), and confirmed aspiration raises it further (RR 11.56) [[Martino2005]].`],
 [5,`Why did asundexian fail in AF but work after stroke?`,`It lost to apixaban in AF, and cut ischaemic stroke against placebo after non-cardioembolic stroke. Mechanism and comparator matter [[Piccini2025,Sharma2026]].`],
 [5,`What did paired vagus nerve stimulation add in VNS-REHAB?`,`A 2.6-point between-group difference on the Fugl-Meyer arm scale [[Dawson2021]].`],
 [5,`What is the lesson of LOOP?`,`Three times more AF found and twice as much anticoagulation did not significantly reduce stroke [[Svendsen2021]].`],

 /* ---- Part 6: history ---- */
 [6,`Who first used the word "stroke" in English medical writing?`,`William Cole, in 1689 [[Engelhardt2017]].`],
 [6,`Who coined "lacune", "thrombosis" and "embolism"?`,`Dechambre "lacune" in 1838, and Virchow "thrombosis" and "embolism" in 1852 [[Engelhardt2017]].`],
 [6,`What was Egas Moniz's Nobel Prize for?`,`Prefrontal leucotomy, not angiography, although he showed the first cerebral angiogram in 1927 [[Artico2017]].`],
 [6,`When was the first CT scan of a live patient?`,`1 October 1971, at Atkinson Morley Hospital [[Schulz2021]].`],
 [6,`Who said "penumbra" first?`,`Lindsay Symon, in his London laboratory in 1975 [[Astrup2025]].`],
 [6,`What was the thrombectomy turnaround?`,`Three neutral trials in 2013 [[Broderick2013,Ciccone2013,Kidwell2013]], then MR CLEAN in 2015 with a 13.5-point gain in independence [[Berkhemer2015]].`]
];
/* BE-FAST, ABCD2 and FeSS are published names; every other phrase here is written for this guide */
const STRV_MN=[
 ["BE-FAST",1,`Balance, Eyes, Face, Arm, Speech, Time. FAST with balance and eyes added. In one retrospective study it cut missed ischaemic strokes from 14.1% to 4.4%; the authors made changes to public education conditional on prospective validation [[Aroor2017]].`],
 ["ABCD2",1,`Age 60 or over, Blood pressure 140/90 mmHg or higher, Clinical features, Duration, Diabetes: 0 to 7 points [[Johnston2007]]. Played below, with its limits.`],
 ["FeSS",1,`Fever, Sugar, Swallow: the three protocols nurses started in QASC [[Middleton2011]]. As later listed: temperature of 37.5°C or more, glucose above 10 mmol/L, and a swallow screen within 4 hours [[Fasugba2023]].`],
 ["The two twos",0,`CHA2DS2-VASc shows you its 2-point items in its own name: A<sub>2</sub> (age 75 or over) and S<sub>2</sub> (previous thromboembolism). Every other item scores 1 [[Olesen2011]].`],
 ["Nine, ninety, ten",0,`Alteplase as labelled: <b>0.9</b> mg/kg, maximum <b>90</b> mg, <b>10</b>% as the bolus [[FDA-Activase]].`],
 ["A quarter, up to twenty-five",0,`Tenecteplase for stroke as published: <b>0.25</b> mg/kg, maximum <b>25</b> mg, one bolus [[Menon2022,FDA-TNKase]].`],
 ["Fifteen, thirty, hourly",0,`Standard observations after lysis: every <b>15</b> minutes for 2 hours, every <b>30</b> minutes for 6 hours, then hourly until 24 hours [[Anderson2025F]].`],
 ["Sixty, four, twenty-one",0,`Nimodipine in BRANT: <b>60</b> mg by mouth every <b>4</b> hours for <b>21</b> days [[Pickard1989]].`],
 ["Four to fourteen, peak at six to ten",0,`Delayed cerebral ischaemia after aneurysmal SAH: mostly days <b>4</b> to <b>14</b>, peak risk days <b>6</b> to <b>10</b> [[Hoh2023]].`],
 ["Seventy big, fifty small, thirty harmed",0,`Symptomatic carotid surgery by stenosis: 70% or more gains 16% over 5 years, 50-69% gains 4.6%, and below 30% is harmed [[Rothwell2003]].`]
];
/* ABCD2 for the animation: letter, word, the rule as published, the most points the item can add */
const STRV_AB=[
 ['A','Age','60 or over: 1 point',1],
 ['B','Blood pressure','140/90 mmHg or higher: 1 point',1],
 ['C','Clinical features','weakness 2, speech only 1',2],
 ['D','Duration','60 min or more 2, 10-59 min 1',2],
 ['D','Diabetes','present: 1 point',1]
];
/* the published 2-day bands, shown as population figures */
const STRV_BANDS=[
 {n:'0-3',w:'low',r:1.0,p:'34% of people'},
 {n:'4-5',w:'moderate',r:4.1,p:'45% of people'},
 {n:'6-7',w:'high',r:8.1,p:'21% of people'}
];
const STRV_STEPS=[
 {from:0,at:.06,k:'A',t:'Age: 60 or over',txt:`Age 60 or over scores 1 [[Johnston2007]]. In an earlier emergency department cohort of 1,707 people, age carried an odds ratio of 1.8 [[Johnston2000]].`,pt:'The first letter is age. Being 60 or over adds one point.',hook:'ABCD2 items: Age, Blood pressure, Clinical features, Duration, Diabetes. Total 0 to 7. [[Johnston2007]]'},
 {from:1/6,at:1/6+.06,k:'B',t:'Blood pressure: 140/90 or higher',txt:`A blood pressure of 140/90 mmHg or higher scores 1 [[Johnston2007]].`,pt:'B is blood pressure. A reading of 140/90 or higher adds one point.'},
 {from:2/6,at:2/6+.06,k:'C',t:'Clinical features: weakness or speech',txt:`Unilateral weakness scores 2. Speech disturbance without weakness scores 1 [[Johnston2007]].`,pt:'C is what happened. Weakness on one side adds two points. Trouble speaking without weakness adds one.',hook:'Clinical features score by the worse symptom: weakness 2, speech without weakness 1. [[Johnston2007]]'},
 {from:3/6,at:3/6+.06,k:'D',t:'Duration: how long it lasted',txt:`60 minutes or more scores 2, and 10 to 59 minutes scores 1 [[Johnston2007]]. Watch the clock: under 10 minutes adds nothing.`,pt:'The first D is how long it lasted. The longer, the more points, up to two.'},
 {from:4/6,at:4/6+.06,k:'D',t:'Diabetes',txt:`Diabetes scores 1 [[Johnston2007]]. Added up, the highest possible score is 7.`,pt:'The second D is diabetes. It adds one point. That makes seven in all.'},
 {from:5/6,at:5/6+.06,k:'Total',t:'The bands, and the limits',txt:`Stroke at 2 days: 1.0% at 0-3, 4.1% at 4-5, 8.1% at 6-7 [[Johnston2007]]. The limits matter: at a cut-off of 4, sensitivity was 86.7% and specificity 35.4%, and 20% of people scoring under 4 had carotid stenosis over 50% or AF [[Wardlaw2015]]. NICE says do not use ABCD2 to decide urgency [[NICE-NG128]].`,pt:'A low score does not mean safe. The bands describe large groups of people, not one person. If stroke signs appear, even briefly, call emergency services [[Harbison2003,Ekundayo2013]].',hook:'A low ABCD2 does not exclude a dangerous cause: 20% under 4 had carotid stenosis or AF. [[Wardlaw2015]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(STRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=STRV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=STRV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=STRV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=STRV_MN.map(m=>`<div class="card"><span class="tag ${m[1]?'good':'accent'}">${m[1]?'published name':'memory aid written for this guide'}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: ABCD2 ---- */
  const svg=$('#strvSvg'),rg=$('#strvT');
  const tx=(x,y,c,txt,st='',a='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${a?` text-anchor="${a}"`:''}${st?` style="${st}"`:''}>${txt}</text>`;
  /* a blood drop with sugar specks, for the diabetes item */
  const drop=(cx,cy,r,k)=>{let g=`<path d="M${f1(cx)} ${f1(cy-r*1.5)}C${f1(cx+r*.5)} ${f1(cy-r*.7)} ${f1(cx+r)} ${f1(cy-r*.2)} ${f1(cx+r)} ${f1(cy+r*.3)}A${f1(r)} ${f1(r)} 0 1 1 ${f1(cx-r)} ${f1(cy+r*.3)}C${f1(cx-r)} ${f1(cy-r*.2)} ${f1(cx-r*.5)} ${f1(cy-r*.7)} ${f1(cx)} ${f1(cy-r*1.5)}Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/>`;
    for(let n=0;n<9;n++){const a=n*2.4,d=r*.72*Math.sqrt((n+.5)/9),o=clamp(k*9-n);g+=`<rect x="${f1(cx+Math.cos(a)*d-4)}" y="${f1(cy+r*.25+Math.sin(a)*d-4)}" width="8" height="8" rx="1.5" transform="rotate(${Math.round(a*40)} ${f1(cx+Math.cos(a)*d)} ${f1(cy+r*.25+Math.sin(a)*d)})" style="fill:var(--panel);stroke:var(--ink);stroke-width:1;opacity:${f1(o)}"/>`}
    return g};
  function draw(t){
    const N=vb(svg,'720 410','400 730');
    const p=phaseOf(STRV_STEPS,t),u=clamp((t-STRV_STEPS[p].from)*6),ph=t*40;
    const L=N?{x:12,y:34,w:376,rh:43,th:37,ty:264}:{x:16,y:44,w:300,rh:56,th:48,ty:338};
    const R=N?{x:12,y:322,w:376,h:398}:{x:332,y:14,w:372,h:382};
    let s=tx(L.x,L.y-13,'rv-a','ABCD2: five letters, seven points');
    /* running total: the most each item can add */
    let lit=0;STRV_AB.forEach((a,k)=>{if(k<p)lit+=a[3]});
    const curPts=p<5?STRV_AB[p][3]:0;const add=p<5?Math.round(ease(ramp(u,.3,.7))*curPts):0;lit+=add;
    STRV_AB.forEach(([l,word,rule,pts],k)=>{
      const y=L.y+k*L.rh,hot=k===p,done=k<p||p===5;
      s+=`<g style="opacity:${hot?1:done?.85:.55}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?13:15,cy=y+L.th/2;
      s+=`<circle cx="${L.x+cr+7}" cy="${cy}" r="${cr}" style="fill:var(${hot?'--brand':'--muted'})"/>`+tx(L.x+cr+7,cy+5,'rv-n',l,'','middle');
      const x2=L.x+cr*2+16;
      s+=tx(x2,y+(N?15:20),'rv-c',word,'font-weight:700')+tx(x2,y+(N?31:38),'rv-b',rule);
      s+=tx(L.x+L.w-10,cy+5,'rv-c','+'+pts,'font-weight:700','end');
      s+='</g>'});
    const bw=(L.w-6*5)/7;
    s+=tx(L.x,L.ty,'rv-b',`Highest possible score so far: ${p===5?7:lit} of 7`);
    for(let k=0;k<7;k++){const on=p===5||k<lit;s+=`<rect x="${f1(L.x+k*(bw+5))}" y="${L.ty+8}" width="${f1(bw)}" height="24" rx="5" style="fill:var(${on?'--brand':'--panel-2'});stroke:var(--line)"/>`+tx(L.x+k*(bw+5)+bw/2,L.ty+25,on?'rv-m':'rv-b',String(k+1),'','middle')}
    /* explainer panel */
    const W=R.w,cx=W/2;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const H=['Age','Blood pressure','Clinical features','Duration','Diabetes','Adding it up: stroke within 2 days'][p];
    s+=tx(16,30,'rv-a',p<5?`${STRV_AB[p][0]}: ${H}`:H);
    const cap=(a,b)=>tx(cx,R.h-(b?44:24),'rv-c',a,'','middle')+(b?tx(cx,R.h-22,'rv-c',b,'','middle'):'');
    const sc=N?150:140;
    if(p===0){
      const x0=34,x1=W-34,ay=sc+70,X=a=>x0+(x1-x0)*(a-20)/70,age=lerp(32,78,ease(ramp(u,.05,.8))),on=age>=60;
      s+=`<rect x="${f1(X(60))}" y="${ay-8}" width="${f1(x1-X(60))}" height="16" rx="4" style="fill:var(--accent-soft);stroke:var(--accent)"/><line class="axis" x1="${x0}" y1="${ay}" x2="${x1}" y2="${ay}"/>`;
      [20,40,60,80].forEach(a=>{s+=`<line class="axis" x1="${f1(X(a))}" y1="${ay-5}" x2="${f1(X(a))}" y2="${ay+5}"/>`+tx(X(a),ay+26,'rv-b',String(a),a===60?'font-weight:700;fill:var(--ink)':'','middle')});
      s+=person(X(age),ay-98,84,on?'var(--accent)':'var(--muted)');
      s+=tx(X(age),ay-108,'rv-a',on?'+1':'0','','middle');
      s+=tx(cx,ay+50,'rv-b','age in years','','middle');
      s+=cap('Age 60 or over adds 1 point');
    }else if(p===1){
      const v=lerp(110,165,ease(ramp(u,.05,.8))),on=v>=140;
      s+=gauge(cx,sc+64,104,v,200,{bands:[{to:140,col:'var(--panel-2)'},{to:200,col:'var(--accent)'}],big:true});
      s+=tx(cx,sc+90,'rv-b','mmHg, systolic side shown','','middle');
      s+=tx(cx,sc+114,'rv-a',on?'+1':'0','','middle');
      s+=cap('140/90 mmHg or higher adds 1 point');
    }else if(p===2){
      const x1=W*.27,x2=W*.73,dr=ease(ramp(u,.05,.5)),sp=ramp(u,.5,.9);
      s+=armsGlyph(x1,sc+10,136,{drift:dr,side:'L'});
      s+=tx(x1,sc+98,'rv-a','+2','','middle')+tx(x1,sc+118,'rv-c','weakness','','middle')+tx(x1,sc+136,'rv-c','on one side','','middle');
      const bx=x2-62,by=sc-52;
      s+=`<g style="opacity:${f1(.35+.65*sp)}"><path d="M${f1(bx+10)} ${by}H${f1(bx+114)}Q${f1(bx+124)} ${by} ${f1(bx+124)} ${by+10}V${by+60}Q${f1(bx+124)} ${by+70} ${f1(bx+114)} ${by+70}H${f1(bx+40)}L${f1(bx+22)} ${by+88}V${by+70}H${f1(bx+10)}Q${f1(bx)} ${by+70} ${f1(bx)} ${by+60}V${by+10}Q${f1(bx)} ${by} ${f1(bx+10)} ${by}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
      let w='';for(let n=0;n<=40;n++){const a=n/40;w+=`${n?'L':'M'}${f1(bx+16+a*92)} ${f1(by+35+Math.sin(a*14+ph)*(5+6*Math.sin(a*5)))}`}
      s+=`<path d="${w}" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-linecap:round"/></g>`;
      s+=tx(x2,sc+98,'rv-a','+1','','middle')+tx(x2,sc+118,'rv-c','speech trouble,','','middle')+tx(x2,sc+136,'rv-c','no weakness','','middle');
      s+=cap('Only the higher of the two counts');
    }else if(p===3){
      const min=60*ease(ramp(u,.03,.9)),pts=min>=59.5?2:min>=10?1:0,x1=W*.3,cy=sc+20;
      s+=clock(x1,cy,78,min,{full:60,col:'var(--accent)'});
      s+=tx(x1,cy+108,'rv-c',`${Math.round(min)} minutes`,'font-weight:700','middle');
      const rows=[['under 10 min','0'],['10-59 min','+1'],['60 min or more','+2']];
      rows.forEach((r,k)=>{const y=cy-52+k*42,hot=k===pts,x=W*.56,w=W*.44-14;
        s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="34" rx="7" style="fill:var(${hot?'--accent-soft':'--panel'});stroke:var(${hot?'--accent':'--line'});stroke-width:${hot?1.8:1}"/>`+tx(x+8,y+22,'rv-c',r[0],hot?'font-weight:700':'')+tx(x+w-8,y+22,'rv-c',r[1],'font-weight:700','end')});
      s+=cap('Longer symptoms add more points');
    }else if(p===4){
      const k=ease(ramp(u,.05,.7));
      s+=drop(cx,sc+6,70,k);
      s+=tx(cx,sc+118,'rv-a',k>.6?'+1':'0','','middle');
      s+=cap('Diabetes adds 1 point: 7 is the most possible');
    }else{
      const k=ease(ramp(u,.05,.7)),x0=N?94:92,bw2=W-x0-66,y0=58;
      STRV_BANDS.forEach((b,j)=>{const y=y0+j*76,w=Math.max(2,bw2*k*b.r/8.1);
        s+=tx(16,y+20,'rv-a',b.n)+tx(16,y+40,'rv-b',b.w);
        s+=`<rect x="${x0}" y="${y+4}" width="${f1(w)}" height="28" rx="5" style="fill:var(--accent);opacity:${.45+j*.25}"/>`;
        s+=tx(x0+w+7,y+24,'rv-c',b.r.toFixed(1)+'%','font-weight:700',);
        s+=tx(x0,y+50,'rv-b',b.p)});
      s+=tx(cx,y0+240,'rv-b','Population figures from the published cohorts,','','middle')+tx(cx,y0+258,'rv-b','not a forecast for any one person.','','middle');
      s+=cap('NICE: do not use ABCD2 to','decide how urgent care is');
    }
    s+='</g>';svg.innerHTML=s;
    setSt(p);$('#strvNote').innerHTML=noteHTML(STRV_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${STRV_STEPS[p].k}: ${STRV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#strvPlay'),draw,26000,'%t:player.replay%','review');
  const setSt=stepWire($('#strvSteps'),STRV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const STQZ_Q=[
 /* ---- Part 1 ---- */
 [1,`In GBD 2021, roughly what share of new strokes worldwide were ischaemic?`,[`35%`,`50%`,`65%`,`85%`],2,`Ischaemic 65.3%, ICH 28.8%, SAH 5.8% [[Feigin2024]].`],
 [1,`The classic WHO definition requires symptoms to last more than how long, unless they lead to death?`,[`1 hour`,`24 hours`,`7 days`,`4.5 hours`],1,`More than 24 hours or leading to death, with no apparent cause other than a vascular one [[Engelhardt2017]].`],
 [1,`What is the lifetime risk of stroke from age 25?`,[`About 1 in 4`,`About 1 in 10`,`About 1 in 20`,`About 1 in 2`],0,`About 25%, or 1 in 4 [[Feigin2018]].`],
 [1,`Between 1990 and 2021, what happened to global stroke numbers?`,[`Counts and rates both fell`,`Counts fell and rates rose`,`Both were unchanged`,`Counts rose and age-standardised incidence fell`],3,`New strokes rose 70.2% while age-standardised incidence fell 21.8% [[Feigin2024]].`],
 [1,`Which risk factor carries the largest share of stroke DALYs?`,[`Smoking`,`High systolic blood pressure`,`Atrial fibrillation`,`Diabetes`],1,`High systolic blood pressure, 56.8% of stroke DALYs [[Feigin2025]].`],
 [1,`What is pooled stroke recurrence at 5 years?`,[`About 5%`,`About 11%`,`About 26%`,`About 60%`],2,`11.1% at 1 year, 26.4% at 5 years, 39.2% at 10 years [[Mohan2011]].`],
 [1,`In the Tromso population study, how often was the circle of Willis complete?`,[`11.9%`,`42%`,`74%`,`98%`],0,`11.9% on 3T imaging, with 47 variants found [[Hindenes2020]].`],
 [1,`Leg-predominant weakness with abulia points most to which artery?`,[`Middle cerebral artery`,`Posterior cerebral artery`,`Basilar artery`,`Anterior cerebral artery`],3,`The anterior cerebral artery [[Stebner2025]].`],
 [1,`Wallenberg syndrome gives which pattern of pain and temperature loss?`,[`Ipsilateral face, contralateral body`,`Contralateral face, ipsilateral body`,`Both sides of the body only`,`Ipsilateral face and body`],0,`Ipsilateral face and contralateral body, with ipsilateral Horner syndrome [[Lo2025]].`],
 [1,`What is usually spared in locked-in syndrome?`,[`Speech`,`Limb power`,`Vertical eye movement and blinking`,`Swallowing`],2,`Vertical eye movement and blinking [[Das2023]].`],
 [1,`Which of these is NOT a classic lacunar syndrome?`,[`Pure motor`,`Global aphasia`,`Ataxic hemiparesis`,`Dysarthria-clumsy hand`],1,`The five are pure motor, pure sensory, sensorimotor, ataxic hemiparesis and dysarthria-clumsy hand [[Arboix2009]].`],
 [1,`By Saver's estimate, how many neurons are lost per minute in a typical large-vessel stroke?`,[`1,900`,`190,000`,`19 million`,`1.9 million`],3,`1.9 million neurons, 14 billion synapses and 12 km of myelinated fibres per minute [[Saver2006]].`],
 [1,`Cerebral blood flow is normally about:`,[`10-20 mL/100 g/min`,`50-60 mL/100 g/min`,`100-150 mL/100 g/min`,`200-250 mL/100 g/min`],1,`About 50-60. Below 10-20 mL/100 g/min is the injury zone [[Mangiardi2023]].`],
 [1,`Large-artery atherosclerosis in TOAST needs a stenosis of more than:`,[`50%`,`20%`,`30%`,`90%`],0,`Over 50% in the corresponding artery, as restated in a later review [[Kim2014]].`],
 [1,`How did the three anticoagulant trials in ESUS turn out?`,[`All favoured anticoagulants`,`All favoured no treatment`,`Two were positive, one neutral`,`All were neutral against aspirin`],3,`NAVIGATE ESUS, RE-SPECT ESUS and ARCADIA [[Hart2018,Diener2019,Kamel2024]].`],
 [1,`How much AF had CRYSTAL AF found by 36 months of monitoring?`,[`3%`,`12.4%`,`30.0%`,`65%`],2,`12.4% at 12 months and 30.0% at 36 months [[Sanna2014,Brachmann2016]].`],
 [1,`What transcranial Doppler velocity defined STOP entry in sickle cell anaemia?`,[`100 cm/s or more`,`150 cm/s or more`,`250 cm/s or more`,`200 cm/s or more`],3,`200 cm/s or more [[Adams1998]].`],
 [1,`A lobar ICH points especially to:`,[`Hypertensive angiopathy`,`Cerebral amyloid angiopathy`,`A cavernoma in every case`,`Sickle cell disease`],1,`Deep bleeds point to hypertensive disease, and lobar bleeds to CAA [[Magid2022,An2017]].`],
 [1,`In SMASH-U, which cause was the most common?`,[`Hypertensive angiopathy`,`Amyloid angiopathy`,`Anticoagulation`,`Structural lesions`],0,`Hypertensive angiopathy 35%, undetermined 21%, amyloid 20%, anticoagulation 14% [[Meretoja2012]].`],
 [1,`What is the Ottawa SAH Rule's specificity?`,[`About 95%`,`About 75%`,`About 15%`,`About 50%`],2,`Sensitivity 100%, specificity 15.3% in derivation [[Perry2013]].`],
 [1,`The tissue definition of TIA turns on:`,[`Symptoms under 24 hours`,`Symptoms under 1 hour`,`A normal CT`,`No acute infarction`],3,`Absence of acute infarction, not a 24-hour clock [[Easton2009]].`],
 [1,`What 2-day stroke risk went with an ABCD2 of 6-7?`,[`1.0%`,`8.1%`,`4.1%`,`25%`],1,`8.1%, as a population figure [[Johnston2007]].`],
 [1,`EXPRESS lowered 90-day stroke after TIA or minor stroke from 10.3% to:`,[`2.1%`,`5.1%`,`7.3%`,`0.2%`],0,`2.1%, through urgent assessment and treatment [[Rothwell2007]].`],

 /* ---- Part 2 ---- */
 [2,`What do B and E add to FAST?`,[`Blood pressure and ECG`,`Bleeding and embolism`,`Balance and eyes`,`Breathing and energy`],2,`Balance, Eyes, Face, Arm, Speech, Time [[Aroor2017]].`],
 [2,`In the retrospective BE-FAST study, the share of people with stroke not identified fell from 14.1% to:`,[`0%`,`4.4%`,`9.2%`,`12.0%`],1,`4.4%. That design could not measure specificity [[Aroor2017]].`],
 [2,`What share of haemorrhages did FAST miss in one series?`,[`About 3%`,`About 8%`,`About 60%`,`About 30%`],3,`30.6% of haemorrhages, 8.9% of ischaemic strokes and 8.2% of TIAs [[Kleindorfer2007]].`],
 [2,`A ROSIER score is positive when it is:`,[`Above 0`,`3 or more`,`Below 0`,`Equal to 5`],0,`Above 0, on a range of -2 to +5 [[Nor2005]].`],
 [2,`What is the published LVO threshold for RACE?`,[`2 or more`,`9 or more`,`5 or more`,`7 or more`],2,`5 or more, with LAMS 4 or more [[PerezDeLaOssa2014,Nazliel2008]].`],
 [2,`Roughly how many cerebrovascular events are missed at the first emergency presentation?`,[`1%`,`9%`,`25%`,`50%`],1,`About 9%, with a false-negative rate of 39.4% for dizziness [[Tarnutzer2017]].`],
 [2,`Which group is misdiagnosed more often?`,[`Anterior circulation stroke`,`Neither, the rates match`,`Lacunar stroke in every series`,`Posterior circulation stroke`],3,`Posterior 37% against anterior 16% [[Arch2016]].`],
 [2,`About what share of people seen by a stroke team have a mimic?`,[`30%`,`3%`,`60%`,`80%`],0,`About 30% [[Merino2013]].`],
 [2,`For any acute stroke, CT sensitivity against MRI was:`,[`83% against 26%`,`26% against 83%`,`50% against 60%`,`95% against 99%`],1,`26% for CT and 83% for MRI [[Chalela2007]].`],
 [2,`ASPECTS counts how many regions, and which score is normal?`,[`7 regions, 0 is normal`,`42 regions, 42 is normal`,`10 regions, 0 is normal`,`10 regions, 10 is normal`],3,`One point off per region with early change [[Barber2000,Pexman2001]].`],
 [2,`Which were the DEFUSE 3 core and mismatch criteria?`,[`Core below 30 mL, ratio 5 or more`,`Core below 70 mL, ratio 1.8 or more`,`Core below 150 mL, ratio 1.2 or more`,`Any core, any ratio`],1,`With penumbra of 15 mL or more, at 6 to 16 hours [[Albers2018]].`],
 [2,`A lesion that shows on DWI but not on FLAIR suggests onset within about:`,[`4.5 hours`,`1 hour`,`12 hours`,`24 hours`],0,`About 4.5 hours, the idea behind WAKE-UP [[Thomalla2011,Thomalla2018]].`],
 [2,`What median door-to-needle time did Helsinki reach in 2011?`,[`60 minutes`,`45 minutes`,`20 minutes`,`5 minutes`],2,`105 minutes in 1998, 60 in 2003, 20 in 2011 [[Meretoja2012D]].`],
 [2,`What is the maximum NIHSS score?`,[`15`,`25`,`100`,`42`],3,`15 elements, maximum 42 [[Budincevic2022]].`],
 [2,`NIHSS tends to underscore which strokes for the same infarct volume?`,[`Right hemisphere`,`Left hemisphere`,`Frontal only`,`Deep left only`],0,`Left hemisphere bias: at NIHSS 16 to 20, median 133 mL right against 48 mL left [[Woo1999]].`],
 [2,`On the mRS, grade 3 differs from grade 4 in that a person at grade 3:`,[`Needs constant nursing care`,`Has no symptoms`,`Can walk without assistance`,`Is bedridden`],2,`Grade 3 needs some help but walks without assistance [[Luo2026]].`],

 /* ---- Part 3 ---- */
 [3,`What is the labelled maximum dose of alteplase for stroke?`,[`50 mg`,`90 mg`,`100 mg`,`25 mg`],1,`0.9 mg/kg to a maximum of 90 mg, 10% as a bolus [[FDA-Activase]].`],
 [3,`What is the published stroke dose of tenecteplase?`,[`0.25 mg/kg, maximum 25 mg`,`0.40 mg/kg, maximum 40 mg`,`0.9 mg/kg, maximum 90 mg`,`0.1 mg/kg, maximum 10 mg`],0,`A single bolus. 0.40 mg/kg gave no reperfusion gain [[Menon2022,Campbell2020JAMA,FDA-TNKase]].`],
 [3,`What was symptomatic ICH in NINDS, t-PA against placebo?`,[`1.0% against 1.0%`,`20% against 5%`,`12% against 2%`,`6.4% against 0.6%`],3,`With no excess of 3-month mortality: 17% against 21% (P=0.30) [[NINDS1995]].`],
 [3,`Which trial extended alteplase from 3 to 4.5 hours?`,[`WAKE-UP`,`ECASS III`,`EXTEND`,`DAWN`],1,`ECASS III (821 patients) [[Hacke2008]].`],
 [3,`Which trial used perfusion imaging to select lysis at 4.5 to 9 hours or on waking?`,[`EXTEND`,`WAKE-UP`,`HERMES`,`PRISMS`],0,`EXTEND used perfusion; WAKE-UP used DWI-FLAIR mismatch [[Ma2019,Thomalla2018]].`],
 [3,`In non-disabling minor stroke, what did PRISMS, ARAMIS and TEMPO-2 show?`,[`Clear benefit from lysis`,`Benefit only over age 80`,`No benefit shown from a lytic`,`Benefit only with tenecteplase`],2,`None showed benefit from a lytic [[Khatri2018,Chen2023,Coutts2024]].`],
 [3,`Which medicine most raises the odds of angio-oedema with alteplase?`,[`Statins`,`Metformin`,`Aspirin`,`ACE inhibitors`],3,`Prior ACE inhibitor use, OR 2.3 [[Hurford2015]].`],
 [3,`ESO thresholds for blood pressure before lysis are below:`,[`140/90`,`185/110`,`220/120`,`160/100`],1,`Below 185/110 before, and below 180/105 during and for 24 hours after [[Sandset2026]].`],
 [3,`What number needed to treat did HERMES report for at least a one-level mRS improvement?`,[`2.6`,`6.4`,`25`,`79`],0,`2.6 [[Goyal2016]].`],
 [3,`DAWN selected people at 6 to 24 hours by:`,[`Age alone`,`Perfusion mismatch ratio`,`NIHSS over 25 alone`,`Clinical-core mismatch`],3,`DAWN used clinical-core mismatch, DEFUSE 3 perfusion mismatch [[Nogueira2018,Albers2018]].`],
 [3,`Each hour of delay to reperfusion lowers functional independence by about:`,[`0.5 points`,`25 points`,`5.2 percentage points`,`15 points`],2,`5.2 percentage points in HERMES data [[Saver2016]].`],
 [3,`What does mTICI 2b mean?`,[`No perfusion`,`More than half of the territory reperfused`,`Complete reperfusion`,`Less than half reperfused`],1,`Grade 2a is less than half, 2b more than half, and 3 complete [[Zaidat2013]].`],
 [3,`What did ESCAPE-MeVO and DISTAL show for medium-vessel thrombectomy?`,[`Neutral on function`,`Large functional benefit`,`Benefit only under age 50`,`Cured every occlusion`],0,`Both were neutral on function [[Goyal2025,Psychogios2025]].`],
 [3,`After successful thrombectomy, OPTIMAL-BP tested a systolic target below 140 mmHg. What happened?`,[`More independence`,`No change in anything`,`Less bleeding and more independence`,`Less functional independence`],3,`mRS 0-2 was 39.4% against 54.4%; the ESO recommends against it [[Nam2023,Sandset2026]].`],
 [3,`Which is NOT an item in the ICH score?`,[`Age 80 or over`,`Volume 30 cm3 or more`,`Blood pressure`,`Intraventricular blood`],2,`The items are GCS, age, infratentorial origin, volume and IVH [[Hemphill2001]].`],
 [3,`AHA/ASA 2022 calls lowering systolic pressure below what potentially harmful in mild to moderate ICH?`,[`180`,`130`,`160`,`100`],1,`Below 130 mmHg [[Greenberg2022]].`],
 [3,`Which corrected INR better in warfarin-related ICH in INCH?`,[`Four-factor PCC`,`FFP`,`Vitamin K alone`,`Platelets`],0,`INR 1.2 or lower within 3 hours in 67% with PCC and 9% with FFP [[Steiner2016]].`],
 [3,`What did PATCH find for platelet transfusion in ICH on antiplatelets?`,[`It improved survival`,`No effect at all`,`It halved growth`,`It worsened outcome`],3,`It worsened outcome [[Baharoglu2016]].`],
 [3,`Factor VIIa in FAST and FASTEST:`,[`Improved function greatly`,`Increased haematoma growth`,`Slowed growth without better function`,`Was never given within 4 hours`],2,`Haematoma growth slowed, with no functional gain [[Mayer2008,Broderick2026]].`],
 [3,`How is oral nimodipine given after SAH in BRANT?`,[`60 mg every 4 hours for 21 days`,`30 mg daily for 7 days`,`60 mg once for 1 day`,`120 mg every 8 hours for 3 days`],0,`Capsules must never be given intravenously [[Pickard1989,FDA-Nimodipine]].`],
 [3,`Delayed cerebral ischaemia after aneurysmal SAH peaks around:`,[`Hours 1 to 6`,`Days 6 to 10`,`Days 30 to 40`,`Months 3 to 6`],1,`Mostly days 4 to 14, peak days 6 to 10 [[Hoh2023]].`],
 [3,`What is the status of prophylactic hypervolaemia after SAH?`,[`Standard care`,`Recommended for everyone`,`Harmful`,`Only for good grade`],2,`Prophylactic hypervolaemia and augmentation are harmful [[Hoh2023]].`],
 [3,`ISAT at 1 year favoured which option for death or dependence?`,[`Clipping, by 20%`,`Neither`,`Conservative care`,`Coiling, by about 7%`],3,`With more late rebleeding after coiling [[Molyneux2005]].`],
 [3,`For every 100 people in a stroke unit rather than the alternative, how many more live independently?`,[`6`,`1`,`25`,`50`],0,`2 more survive, 6 more live at home, 6 more live independently [[Langhorne2020]].`],
 [3,`QASC tested nurse-initiated protocols for:`,[`Falls, skin, sleep`,`Fever, sugar, swallow`,`Oxygen, salt, stockings`,`Pain, posture, pressure`],1,`Number needed to treat 6.4 for death or dependency at 90 days [[Middleton2011]].`],
 [3,`What did HeadPoST find for lying flat against head up 30 degrees?`,[`Less pneumonia flat`,`More deaths flat`,`Better function flat`,`No difference`],3,`No difference in outcome or pneumonia [[Anderson2017]].`],
 [3,`What did SHINE find for intensive insulin?`,[`No benefit, and severe hypoglycaemia in 2.6%`,`Clear benefit`,`Fewer deaths only`,`Benefit in lacunar stroke`],0,`No benefit, with 2.6% severe hypoglycaemia [[Johnston2019]].`],
 [3,`In CLOTS, what worked for preventing DVT?`,[`Thigh-length stockings against none`,`Aspirin alone`,`Intermittent pneumatic compression`,`Head-up positioning`],2,`CLOTS 3 [[Dennis2013]]. Stockings failed in CLOTS 1 [[Dennis2009]].`],
 [3,`In people aged 60 or under treated within 48 hours, what is the number needed to treat for survival with craniectomy?`,[`20`,`2`,`8`,`50`],1,`Two, in the pooled analysis [[Vahedi2007]].`],

 /* ---- Part 4 ---- */
 [4,`Which factor had the largest population attributable risk in INTERSTROKE?`,[`Hypertension`,`Smoking`,`Diet`,`Alcohol`],0,`Hypertension 47.9%. Ten factors together about 90% [[ODonnell2016]].`],
 [4,`A 10 mm Hg fall in systolic pressure lowers stroke by about:`,[`2%`,`10%`,`50%`,`27%`],3,`RR 0.73 [[Ettehad2016]].`],
 [4,`In PROGRESS, what lowered stroke?`,[`Perindopril alone`,`Placebo`,`Combination therapy`,`Aspirin`],2,`Combination therapy did, single-agent perindopril did not, and benefit included non-hypertensive people [[PROGRESS2001]].`],
 [4,`What was the trade-off in SPARCL?`,[`Fewer strokes overall, more haemorrhagic`,`More strokes overall, fewer haemorrhagic`,`No change in strokes`,`More heart attacks`],0,`Ischaemic 218 against 274, and haemorrhagic 55 against 33 [[Amarenco2006]].`],
 [4,`When does the benefit of dual antiplatelets after minor stroke sit?`,[`Beyond year 1`,`First 21 days`,`From day 22 to day 90`,`Only after 5 years`],1,`5.2% against 7.8% in the first 21 days, with no benefit from day 22 to 90 [[Pan2019]].`],
 [4,`Which CHA2DS2-VASc items score 2 points?`,[`Hypertension and diabetes`,`Female sex and vascular disease`,`Age 65 to 74 and heart failure`,`Age 75 or over and previous thromboembolism`],3,`Those two score 2, and the rest 1 [[Olesen2011]].`],
 [4,`How much does adjusted-dose warfarin lower stroke in AF?`,[`22%`,`8%`,`64%`,`90%`],2,`64% against control. Antiplatelets 22% [[Hart2007]].`],
 [4,`Compared with warfarin, DOACs reduce intracranial haemorrhage by about:`,[`Half`,`Nothing`,`A tenth`,`They raise it`],0,`RR 0.48 [[Ruff2014]].`],
 [4,`What did ELAN, TIMING and OPTIMAS test?`,[`Which DOAC is best`,`Closing the appendage`,`Earlier against later anticoagulant start after stroke`,`Aspirin against placebo`],2,`Composite at 30 days 2.9% against 4.1% in ELAN; TIMING and OPTIMAS met non-inferiority [[Fischer2023,Oldgren2022,Werring2024]].`],
 [4,`Symptomatic carotid stenosis of 70% or more gains what absolute 5-year reduction from surgery?`,[`1%`,`16%`,`4.6%`,`40%`],1,`16% at 70% or more, 4.6% at 50-69% [[Rothwell2003]].`],
 [4,`The number needed to treat for carotid surgery within 2 weeks is 5. After 12 weeks it is:`,[`10`,`20`,`50`,`125`],3,`125 [[Rothwell2004]].`],
 [4,`In CREST, which is true?`,[`More periprocedural stroke with stenting, more MI with surgery`,`More of both with stenting`,`More of both with surgery`,`Neither differed`],0,`Stroke 4.1% against 2.3%, and MI 1.1% against 2.3% [[Brott2010]].`],
 [4,`What happened in SAMMPRIS?`,[`Stenting was better`,`Both arms equal at 30 days`,`Stenting was worse: 14.7% against 5.8%`,`Medical therapy was stopped`],2,`Stenting was worse at 30 days [[Chimowitz2011]].`],
 [4,`PASCAL rates a PFO as probable when:`,[`Any PFO is found`,`RoPE of 7 or more, plus large shunt or atrial septal aneurysm`,`Age over 60`,`A migraine history`],1,`High RoPE plus a high-risk PFO feature [[Chambers2026]].`],

 /* ---- Part 5 ---- */
 [5,`In the Copenhagen data, 95% reached best ADL function by about:`,[`2 weeks`,`6 months`,`2 years`,`12.5 weeks`],3,`80% by 6 weeks and 95% by 12.5 weeks [[Jorgensen1995]].`],
 [5,`AVERT tested very early, higher-dose mobilisation. Favourable outcome was:`,[`46% against 50%`,`70% against 50%`,`50% against 50%`,`60% against 30%`],0,`Worse with the higher dose [[Bernhardt2015]]. Shorter, more frequent sessions looked better [[Bernhardt2016]].`],
 [5,`In the 2026 AHA/ASA rehabilitation guideline, high-dose mobilisation in the first 24 hours is rated:`,[`COR 1`,`COR 3: Harm`,`COR 2a`,`Not mentioned`],1,`Mobilise from 24 to 48 hours is COR 1 [[Richards2026]].`],
 [5,`When did extra arm therapy work best in CPASS?`,[`First 48 hours`,`After 5 years`,`At 2 to 3 months`,`At 12 months only`],2,`At 2 to 3 months after stroke [[Dromerick2021]].`],
 [5,`Which arm therapy trial was positive?`,[`ICARE`,`RATULS`,`LEAPS`,`EXCITE`],3,`EXCITE tested constraint-induced movement therapy; ICARE and RATULS were neutral [[Wolf2006,Winstein2016JAMA,Rodgers2019]].`],
 [5,`What did VERSE find for early intensive aphasia therapy?`,[`No benefit over usual care`,`Large benefit`,`Harm`,`Benefit only at 2 years`],0,`Communication recovery 50.3% against 52.1% [[Godecke2021]].`],
 [5,`What do fluoxetine trials show after stroke?`,[`Better function, fewer fractures`,`No functional benefit, less depression, more fractures`,`Better function, more depression`,`No effect on anything`],1,`FOCUS, the trials after it and a review [[Dennis2019,Hankey2020,Lundstrom2020,Legg2021]].`],
 [5,`About how common is depression after stroke?`,[`3%`,`10%`,`31%`,`80%`],2,`31% pooled across 61 studies [[Hackett2014]].`],
 [5,`About how common is post-stroke fatigue, using a Fatigue Severity Scale cut-off of 4?`,[`48%`,`5%`,`15%`,`90%`],0,`48% (95% CI 42% to 53%) [[Alghamdi2021]].`],
 [5,`Under UK DVLA rules as published, how long must a Group 1 driver not drive after stroke?`,[`1 year`,`1 week`,`6 months`,`1 month`],3,`1 month, and 1 year for Group 2. Rules differ by country [[DVLA-Neuro]].`],
 [5,`The standard post-lysis schedule starts with observations:`,[`Hourly`,`Every 15 minutes for 2 hours`,`Every 4 hours`,`Once a shift`],1,`Then every 30 minutes for 6 hours, then hourly until 24 hours [[Anderson2025F]].`],
 [5,`The FeSS wording puts the swallow screen:`,[`At discharge`,`At 24 hours`,`Within 4 hours and before oral intake`,`Only if the person coughs`],2,`Within 4 hours of admission and before oral food, drink or medications [[Fasugba2023]].`],
 [5,`Asundexian against apixaban in AF, in OCEANIC-AF:`,[`More strokes, trial stopped early`,`Fewer strokes`,`Equal in all outcomes`,`Never completed enrolment by design`],0,`Stroke or embolism 1.3% against 0.4% [[Piccini2025]].`],
 [5,`In OCEANIC-STROKE, asundexian against placebo after non-cardioembolic stroke:`,[`Doubled major bleeding`,`Had no effect on stroke`,`Was stopped for harm`,`Reduced ischaemic stroke: 6.2% against 8.4%`],3,`Major bleeding 1.9% against 1.7% [[Sharma2026]].`],

 /* ---- Part 6 ---- */
 [6,`Who first used "stroke" for apoplexy in English medical writing?`,[`Thomas Willis`,`William Cole`,`Rudolf Virchow`,`Egas Moniz`],1,`William Cole, 1689 [[Engelhardt2017]].`],
 [6,`Moniz's Nobel Prize was for:`,[`Prefrontal leucotomy`,`Cerebral angiography`,`CT`,`Thrombolysis`],0,`Not for angiography [[Artico2017]].`],
 [6,`The first CT scan of a live patient was in:`,[`1927`,`1955`,`1971`,`1995`],2,`1 October 1971 [[Schulz2021]].`],
 [6,`What was the absolute gain in functional independence in MR CLEAN?`,[`2.6 points`,`50 points`,`1 point`,`13.5 points`],3,`32.6% against 19.1% [[Berkhemer2015]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(STRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=STQZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${STRV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
const STGL_T=[
 ["ABC/2",`A bedside method for estimating intracerebral haematoma volume from CT [[Kothari1996]].`,"ich"],
 ["ABCD2",`A 7-point TIA score: Age, Blood pressure, Clinical features, Duration, Diabetes. 2-day stroke risk 8.1% at 6-7 [[Johnston2007]]. NICE says do not use it to decide urgency [[NICE-NG128]].`,"tia"],
 ["ABCD3-I",`ABCD2 with dual TIA, carotid stenosis of 50% or more, and a DWI lesion added, each +2 [[Merwick2010]].`,"tia"],
 ["Abulia",`Loss of will or initiative. With leg-predominant weakness it points to the anterior cerebral artery [[Stebner2025]].`,"vessels"],
 ["ACA (anterior cerebral artery)",`An anterior circulation artery. Its stroke gives leg-predominant weakness and abulia [[Stebner2025]].`,"vessels"],
 ["ADL (activities of daily living)",`Everyday self-care tasks. 80% reached best ADL function by 6 weeks and 95% by 12.5 weeks in Copenhagen [[Jorgensen1995]].`,"rehab"],
 ["AF (atrial fibrillation)",`An irregular heart rhythm that can throw clots to the brain. In Framingham it raised stroke risk nearly fivefold [[Wolf1991]].`,"af"],
 ["Alteplase (t-PA)",`A clot-dissolving drug for stroke. Labelled 0.9 mg/kg, maximum 90 mg, 10% as a bolus [[FDA-Activase]].`,"lysis"],
 ["Andexanet",`A factor Xa inhibitor reversal agent. ANNEXA-I: haemostatic efficacy 67.0% against 53.1%, thrombotic events 10.3% against 5.6% [[Connolly2024]].`,"ich"],
 ["Angio-oedema",`Swelling of the lips and tongue, a complication of lysis. Prior ACE inhibitor use is the predictor (OR 2.3) [[Hurford2015]].`,"lysis"],
 ["Aphasia",`A language disorder. Median frequency 30% in mixed acute stroke [[Flowers2016]].`,"rehab"],
 ["Apoplexy",`The old word for stroke, meaning struck down with violence. It covered non-vascular events too [[Engelhardt2017]].`,"history"],
 ["ASPECTS",`A 10-region CT score of the MCA territory. 10 is normal, with 1 point off per affected region [[Barber2000,Pexman2001]].`,"imaging"],
 ["Aspiration",`Food or fluid entering the airway. Confirmed aspiration raises pneumonia risk (RR 11.56) [[Martino2005]].`,"unit"],
 ["Asundexian",`An oral factor XIa inhibitor. It failed against apixaban in AF, and reduced ischaemic stroke against placebo after non-cardioembolic stroke [[Piccini2025,Sharma2026]].`,"frontier"],
 ["Atrial septal aneurysm",`A floppy bulge of the wall between the atria. With a PFO it counts as a high-risk feature in PASCAL [[Chambers2026,Kent2021]].`,"carotid"],
 ["AVERT",`A trial of very early, higher-dose mobilisation. Favourable outcome 46% against 50% [[Bernhardt2015]].`,"rehab"],
 ["Basilar artery",`The main artery of the posterior circulation. Occlusion can bring decreased consciousness, quadriparesis and coma [[Lo2025]].`,"vessels"],
 ["BE-FAST",`Balance, Eyes, Face, Arm, Speech, Time. Cut missed ischaemic strokes from 14.1% to 4.4% in a retrospective study [[Aroor2017]].`,"signs"],
 ["Boston criteria",`Criteria for cerebral amyloid angiopathy. Version 2.0 adds white matter features, and needs age 50 or over for probable CAA [[Charidimou2022]].`,"bleeds"],
 ["Botulinum toxin",`An injected treatment for spasticity. It reduces resistance to passive movement and aids self-care, but not arm capacity [[Andringa2019]].`,"rehab"],
 ["Bridging",`Giving a clot-dissolving drug before thrombectomy, rather than going direct. Tested in DIRECT-MT, DEVT and SKIP [[Yang2020,Zi2021,Suzuki2021]].`,"evt"],
 ["CAA (cerebral amyloid angiopathy)",`Amyloid in arterial walls with loss of smooth muscle, mainly in lobar locations, with microbleeds or superficial siderosis [[Magid2022]].`,"bleeds"],
 ["Cardioembolism",`A stroke from a clot formed in the heart. One TOAST subtype; pooled 22% of ischaemic strokes [[Adams1993,Ornello2018]].`,"causes"],
 ["Carotid endarterectomy",`Surgery to clean out a narrowed carotid artery. Benefit depends on stenosis and on timing [[Rothwell2003,Rothwell2004]].`,"carotid"],
 ["Carotid stenting",`Opening a carotid narrowing with a stent. CREST: more periprocedural stroke than surgery, less MI [[Brott2010]].`,"carotid"],
 ["CHA2DS2-VASc",`An AF stroke-risk score from 0 to 9. Age 75 or over and previous thromboembolism score 2 [[Olesen2011]].`,"af"],
 ["Chameleon",`A stroke that looks like something else. Young people, women and those with nonspecific symptoms are at higher risk of misdiagnosis [[Wallace2021,Bakradze2018]].`,"signs"],
 ["Circle of Willis",`The anastomosis joining the anterior and posterior circulations [[Rosner2023]]. Complete in only 11.9% in one population [[Hindenes2020]].`,"vessels"],
 ["Clazosentan",`An endothelin receptor antagonist tried in SAH. It reduced vasospasm without better function [[Alsakti2026]].`,"frontier"],
 ["Clinical-core mismatch",`A severe deficit with a small core on imaging. DAWN used it for selection at 6 to 24 hours [[Nogueira2018]].`,"evt"],
 ["Coiling",`Treating a ruptured aneurysm from inside with coils. ISAT: about 7% less death or dependence at 1 year than clipping [[Molyneux2005]].`,"sah"],
 ["Clipping",`Surgery that closes an aneurysm with a clip at its neck. Compared with coiling in ISAT [[Molyneux2005]].`,"sah"],
 ["Collaterals",`Back-up vessels that keep tissue alive during occlusion [[Liebeskind2003,Mangiardi2023]]. Growth was 52.3 cm3 with poor and 0.9 cm3 with good collaterals in one series [[Vagal2018]].`,"cascade"],
 ["Constraint-induced movement therapy",`Restraining the stronger arm to drive practice of the weaker one. EXCITE was positive [[Wolf2006]].`,"rehab"],
 ["Core",`Tissue already irreversibly damaged. Core below 70 mL was a DEFUSE 3 criterion [[Albers2018]].`,"cascade"],
 ["CPSS (Cincinnati Prehospital Stroke Scale)",`A prehospital scale with three items: arm, speech and face [[Kothari1999]].`,"signs"],
 ["Craniectomy, decompressive",`Removing part of the skull to relieve pressure in swollen infarction. Number needed to treat 2 for survival, age 60 or under within 48 hours [[Vahedi2007]].`,"unit"],
 ["CREST",`A trial of carotid stenting against surgery in 2502 people [[Brott2010]].`,"carotid"],
 ["Cryptogenic stroke",`A stroke with no cause found, about 25% of strokes, the group from which ESUS was proposed [[Hart2014]].`,"causes"],
 ["CT angiography (CTA)",`CT of the vessels, showing clot and collaterals [[Tan2009]].`,"imaging"],
 ["CT perfusion",`CT mapping of blood flow to separate core from penumbra. No single threshold avoids false positives [[Campbell2011CBF]].`,"imaging"],
 ["Central post-stroke pain",`Pain with sensory abnormalities in body parts matching the injured area [[Klit2009]]. Pooled prevalence 11% [[Liampas2020]].`,"after"],
 ["DALY",`Disability-adjusted life year, a measure of healthy life lost. 160.5 million for stroke in 2021 [[Feigin2024]].`,"what"],
 ["DAPT (dual antiplatelet therapy)",`Two antiplatelet drugs together. The benefit after minor stroke sits in the first 21 days [[Pan2019]].`,"af"],
 ["DAWN",`A late-window thrombectomy trial, 6 to 24 hours: functional independence 49% against 13% [[Nogueira2018]].`,"evt"],
 ["DCI (delayed cerebral ischaemia)",`Deterioration after aneurysmal SAH, mostly days 4 to 14, peak days 6 to 10 [[Hoh2023]].`,"sah"],
 ["DEFUSE 3",`A late-window thrombectomy trial at 6 to 16 hours, with perfusion selection [[Albers2018]].`,"evt"],
 ["Dissection",`A tear in an artery wall. 15% of stroke at ages 15-49 in one cohort [[Putaala2009]]; head or neck pain is common [[Lee2006]].`,"causes"],
 ["DOAC",`Direct oral anticoagulant. Against warfarin, intracranial haemorrhage RR 0.48 [[Ruff2014]].`,"af"],
 ["Door-to-needle time",`Minutes from arrival to thrombolysis. Helsinki reached a median of 20 minutes [[Meretoja2012D]].`,"imaging"],
 ["DWI-FLAIR mismatch",`A lesion on diffusion MRI that does not yet show on FLAIR, suggesting onset within about 4.5 hours [[Thomalla2011]].`,"imaging"],
 ["Dysarthria",`Slurred speech from weak speech muscles. Scored on the NIHSS (item 10) [[Budincevic2022]].`,"nihss"],
 ["Dysphagia",`Swallowing difficulty. Present in more than 50% of people with acute stroke, says one guideline [[Dziewas2021]].`,"unit"],
 ["Early brain injury",`The name for the first 24 to 48 hours after SAH [[Dodd2021]].`,"sah"],
 ["Early supported discharge",`Going home sooner with a specialist team. Hospital stay about 6 days shorter [[Langhorne2017]].`,"rehab"],
 ["ECASS III",`The trial that extended alteplase to 3 to 4.5 hours: favourable outcome 52.4% against 45.2% [[Hacke2008]].`,"lysis"],
 ["Embolism",`A clot carried from elsewhere. Virchow created the term [[Engelhardt2017,Bagot2008]].`,"history"],
 ["Emotionalism",`A problem with emotional control after stroke. 12% in one cohort [[Langhorne2000]].`,"after"],
 ["ENRICH",`A trial of minimally invasive ICH surgery. The benefit appeared in lobar bleeds [[Pradilla2024]].`,"ich"],
 ["ESUS",`Embolic stroke of undetermined source: a non-lacunar infarct with no proximal stenosis or cardioembolic source [[Hart2014]].`,"causes"],
 ["EVD (external ventricular drain)",`A tube draining CSF, used in acute hydrocephalus after SAH [[Hoh2023]].`,"sah"],
 ["Excitotoxicity",`Injury from excess glutamate overstimulating receptors [[Dirnagl1999]].`,"cascade"],
 ["EXPRESS",`The Oxford study of urgent TIA care: 90-day stroke 10.3% before and 2.1% after [[Rothwell2007]].`,"tia"],
 ["EXTEND",`A trial of lysis at 4.5 to 9 hours or on waking, selected by perfusion imaging [[Ma2019]].`,"lysis"],
 ["Factor XI inhibitors",`Anticoagulants tested with the hypothesis of less bleeding for similar effect [[Jain2024]].`,"frontier"],
 ["FAST",`Face, Arm, Speech, Time. Missed 30.6% of haemorrhages in one series [[Kleindorfer2007]].`,"signs"],
 ["Fatigue",`Tiredness not relieved by rest [[Richards2026]]. Pooled prevalence 48% [[Alghamdi2021]].`,"after"],
 ["FeSS",`Fever, Sugar, Swallow protocols, tested in QASC [[Middleton2011]].`,"unit"],
 ["FFP (fresh frozen plasma)",`Plasma given to correct clotting. Four-factor PCC beat it in INCH [[Steiner2016]].`,"ich"],
 ["Fisher scale, modified",`A grading of SAH by clot thickness and intraventricular blood, 0 to 4 [[Claassen2022,Frontera2006]].`,"bleeds"],
 ["Fluoxetine",`An antidepressant tried for recovery. No functional benefit, less depression, more fractures [[Dennis2019,Legg2021]].`,"rehab"],
 ["Fugl-Meyer (FMA-UE)",`An arm impairment scale from 0 to 66 [[Winters2015]].`,"rehab"],
 ["GCS (Glasgow Coma Scale)",`A bedside scale of conscious level. Its authors advise describing people by its three components [[Teasdale2014]].`,"nursing"],
 ["Haematoma expansion",`Growth of a bleed after onset. 26% had substantial growth in the first hour in one series [[Brott1997]].`,"bleeds"],
 ["Haemorrhagic transformation",`Bleeding into an infarct. Only PH2 clearly changes the clinical course [[Fiorelli1999]].`,"unit"],
 ["HeadPoST",`A trial of lying flat against head up 30 degrees: no difference in outcome [[Anderson2017]].`,"unit"],
 ["Helsinki model",`Do as much as possible before arrival. Median door-to-needle 20 minutes [[Meretoja2012D]].`,"imaging"],
 ["Hemianopia",`Loss of half the visual field, scored on the NIHSS (item 3) [[Budincevic2022]].`,"vessels"],
 ["Hemiplegic shoulder pain",`Shoulder pain on the weak side, about 29% in one population study, with onset peaking at 4 months [[AdeyWakeling2015]].`,"nursing"],
 ["HERMES",`A pooled analysis of five thrombectomy trials: common OR 2.49, number needed to treat 2.6 [[Goyal2016]].`,"evt"],
 ["Horner syndrome",`Part of Wallenberg syndrome on the same side as the lesion [[Lo2025]], and a sign of dissection [[Debette2009]].`,"vessels"],
 ["Hunt and Hess",`A clinical grading of SAH from 1 (mild headache) to 5 (coma) [[Claassen2022,Hunt1968]].`,"bleeds"],
 ["Hydrocephalus",`Enlarged ventricles from blocked CSF flow. About 25% after aneurysmal SAH [[Vergouwen2026]].`,"sah"],
 ["ICH (intracerebral haemorrhage)",`Bleeding into the brain. 28.8% of incident strokes worldwide [[Feigin2024]].`,"ich"],
 ["ICH score",`A 0 to 6 score from GCS, age, location, volume and intraventricular blood [[Hemphill2001]].`,"ich"],
 ["Idarucizumab",`Reverses dabigatran: median maximum reversal 100% in RE-VERSE AD [[Pollack2017]].`,"ich"],
 ["Infarct",`Dead tissue after blocked blood supply. Cohnheim introduced the word in 1872 [[Engelhardt2017]].`,"history"],
 ["INTERACT2",`A blood pressure trial in ICH: under 140 systolic within 1 hour against under 180 [[Anderson2013]].`,"ich"],
 ["INTERSTROKE",`A case-control study in 32 countries: ten factors, about 90% of population attributable risk [[ODonnell2016]].`,"prevent"],
 ["ISAT",`The coiling against clipping trial in ruptured aneurysm [[Molyneux2002,Molyneux2005]].`,"sah"],
 ["Ischaemic cascade",`The chain of injury after blood flow falls: excitotoxicity, peri-infarct depolarisations, inflammation and apoptosis [[Dirnagl1999]].`,"cascade"],
 ["IVH (intraventricular haemorrhage)",`Blood in the ventricles, an ICH score item [[Hemphill2001]].`,"ich"],
 ["Lacunar stroke",`A small deep infarct, about one quarter of ischaemic strokes, with five classic syndromes [[Arboix2009]].`,"vessels"],
 ["Lacune",`A small deep cavity. Dechambre introduced the word in 1838 [[Engelhardt2017]]; Fisher linked it to penetrating artery disease [[Fisher1965,Caplan2015]].`,"history"],
 ["LAMS",`Los Angeles Motor Scale: face, arm and grip, 0 to 5, with 4 or more the LVO threshold [[Llanes2004,Nazliel2008]].`,"signs"],
 ["Large core",`Extensive early infarct. Trials used ASPECTS 3 to 5, and SELECT2 also core 50 mL or more [[Sarraj2023,Yoshimura2022]].`,"evt"],
 ["Left atrial appendage closure",`A device or surgery to seal the appendage where clots form in AF. LAAOS III: 4.8% against 7.0% [[Whitlock2021]].`,"af"],
 ["Lipohyalinosis",`Disease of small penetrating arteries, tied to lacunes [[Fisher1982]] and most often found in non-lobar ICH [[An2017]].`,"causes"],
 ["Locked-in syndrome",`Paralysis with preserved consciousness from pontine injury, sparing vertical eye movement and blinking [[Das2023]].`,"vessels"],
 ["LVO (large vessel occlusion)",`A blocked main brain artery. No clinical scale identifies it with both high sensitivity and high specificity [[Smith2018]].`,"signs"],
 ["MCA (middle cerebral artery)",`The artery most commonly involved in ischaemic stroke, with segments M1 to M4 [[Benjamin2026MCA]].`,"vessels"],
 ["Mimic",`A condition that looks like a stroke but is not. About 30% of those seen by a stroke team [[Merino2013]].`,"signs"],
 ["Mobile stroke unit",`An ambulance with a CT scanner. BEST-MSU: onset-to-t-PA 72 against 108 minutes [[Grotta2021]].`,"signs"],
 ["mRS (modified Rankin Scale)",`A disability scale from 0 (no symptoms) to 6 (death) [[Luo2026]].`,"nihss"],
 ["mTICI",`The reperfusion grade after thrombectomy. 2b means more than half of the territory [[Zaidat2013]].`,"evt"],
 ["Neglect",`Inattention to one side. About 29% overall, more after right brain damage [[Esposito2021]].`,"rehab"],
 ["Nerinetide",`A neuroprotectant tested in ESCAPE-NA1. A subgroup signal did not replicate in ESCAPE-NEXT [[Hill2020,Hill2025]].`,"frontier"],
 ["Neuroplasticity",`The nervous system's ability to reorganise structure, function and connections [[Cramer2011]].`,"rehab"],
 ["NIHSS",`The NIH Stroke Scale: 15 elements, maximum 42 [[Budincevic2022]].`,"nihss"],
 ["Nimodipine",`A calcium channel blocker for SAH. BRANT: 60 mg orally every 4 hours for 21 days [[Pickard1989]].`,"sah"],
 ["NINDS trial",`The 1995 t-PA trial within 3 hours [[NINDS1995]].`,"lysis"],
 ["NNT (number needed to treat)",`How many people must be treated for one extra to benefit. 2.6 in HERMES [[Goyal2016]].`,"evt"],
 ["No-reflow",`Failure of microvessels to refill after the main artery opens [[Bai2015,Dalkara2012]].`,"cascade"],
 ["OCEANIC-STROKE",`A phase 3 asundexian trial after stroke or TIA: ischaemic stroke 6.2% against 8.4% [[Sharma2026]].`,"frontier"],
 ["Oxfordshire classification",`TACI, PACI, POCI and LACI: 17%, 34%, 24% and 25% [[Bamford1991]].`,"vessels"],
 ["Ottawa SAH Rule",`Six items to decide who needs tests for SAH: sensitivity 100%, specificity about 15% [[Perry2013]].`,"bleeds"],
 ["PAR (population attributable risk)",`The share of cases linked to a factor. Hypertension 47.9% in INTERSTROKE [[ODonnell2016]].`,"prevent"],
 ["PASCAL",`A PFO classification combining RoPE with high-risk PFO features [[Chambers2026,Kent2021]].`,"carotid"],
 ["PCA (posterior cerebral artery)",`Its stroke can give hemianopia, memory loss and alexia without agraphia [[Stebner2025]].`,"vessels"],
 ["PCC (prothrombin complex concentrate)",`A clotting factor concentrate. Four-factor PCC beat FFP for INR correction [[Steiner2016]].`,"ich"],
 ["PEG",`A feeding tube through the stomach wall. Not supported early by FOOD [[Dennis2005]].`,"nursing"],
 ["Penumbra",`Tissue in the range between two flow thresholds, which can recover if flow returns [[Heiss2011]].`,"cascade"],
 ["PFO (patent foramen ovale)",`A small opening between the atria, in about 1 in 4 adults [[Messe2020]].`,"carotid"],
 ["PH2",`Parenchymal haematoma type 2, the haemorrhagic transformation grade that clearly changes the course [[Fiorelli1999]].`,"unit"],
 ["Posterior circulation",`The vertebral and basilar system. Stroke here is misdiagnosed about twice as often as anterior stroke [[Arch2016]].`,"vessels"],
 ["Proportional recovery",`The idea that people regain about 0.7 of initial impairment; statistical coupling may inflate it [[Prabhakaran2008,Hope2019]].`,"rehab"],
 ["QASC",`A cluster trial of FeSS protocols in 19 acute stroke units [[Middleton2011]].`,"unit"],
 ["RACE",`An LVO scale of face, arm, leg, gaze and aphasia or agnosia with a threshold of 5 or more [[PerezDeLaOssa2014]].`,"signs"],
 ["Reperfusion injury",`Damage after flow returns. No study has quantified its share in people with stroke [[Bai2015,Nour2013]].`,"cascade"],
 ["RoPE score",`A 0 to 10 score of how likely a PFO is to be the cause. Higher means younger with fewer risk factors [[Kent2013,Nouh2016]].`,"carotid"],
 ["ROSIER",`A recognition scale from -2 to +5, positive above 0 [[Nor2005]].`,"signs"],
 ["SAH (subarachnoid haemorrhage)",`Bleeding around the brain, usually from an aneurysm. 5.8% of incident strokes [[Feigin2024,Vergouwen2026]].`,"sah"],
 ["SAMMPRIS",`Intracranial stenting against aggressive medical therapy: 14.7% against 5.8% at 30 days [[Chimowitz2011]].`,"carotid"],
 ["SeLECT",`A score for late seizures: Severity, Large-artery, Early seizures, Cortical involvement, Territory of MCA [[Galovic2018]].`,"unit"],
 ["Sentinel headache",`A warning headache before SAH, reported in 10 to 43% across studies [[Polmear2003]].`,"bleeds"],
 ["SMASH-U",`A classification of ICH causes: structural lesions, anticoagulation, amyloid, systemic disease, hypertensive angiopathy, undetermined [[Meretoja2012]].`,"bleeds"],
 ["SO2S",`A trial of routine oxygen in non-hypoxic people: no benefit [[Roffe2017]].`,"unit"],
 ["Spasticity",`Stiff, resistant muscles. Prevalence 17% to 42.6% beyond 3 months [[Wissel2013]].`,"rehab"],
 ["SPARCL",`High-dose atorvastatin after stroke: fewer strokes overall, more haemorrhagic [[Amarenco2006]].`,"prevent"],
 ["Spot sign",`Contrast leak in a haematoma on CT angiography, predicting expansion: specificity 85% [[Demchuk2012]].`,"bleeds"],
 ["Stent retriever",`A mesh device that grips a clot and pulls it out. 81.5% of the MR CLEAN intervention group [[Berkhemer2015]].`,"evt"],
 ["Stroke unit",`Organised inpatient care. 6 more per 100 live independently [[Langhorne2020]].`,"unit"],
 ["Tenecteplase",`A clot-dissolving drug given as one bolus: 0.25 mg/kg, maximum 25 mg [[Menon2022,FDA-TNKase]].`,"lysis"],
 ["Thrombectomy",`Pulling the clot out through a catheter [[Goyal2016]].`,"evt"],
 ["Thrombolysis",`Dissolving a clot with a drug, given within time and imaging limits [[Emberson2014]].`,"lysis"],
 ["Thunderclap headache",`A sudden severe headache from onset, the commonest presentation of SAH [[Claassen2022]].`,"bleeds"],
 ["TIA (transient ischaemic attack)",`A transient neurological episode from focal ischaemia, without acute infarction [[Easton2009]].`,"tia"],
 ["Tmax",`A perfusion delay measure. Above 6 s marks hypoperfused tissue in common use [[Albers2018,Olivot2009]].`,"imaging"],
 ["TOAST",`A five-subtype classification of the cause of ischaemic stroke [[Adams1993]].`,"causes"],
 ["Vagus nerve stimulation",`Stimulation paired with arm rehabilitation. Vivistim is FDA-approved, and the between-group difference was 2.6 FMA-UE points [[FDA-Vivistim,Dawson2021]].`,"frontier"],
 ["Vasospasm",`Narrowing of arteries after SAH, with peak risk on post-bleed days 6 to 10 [[Hoh2023]].`,"sah"],
 ["CAST",`A trial of 21,106 people given aspirin 160 mg/day or placebo within 48 hours: deaths 3.3% against 3.9% [[CAST1997]].`,"unit"],
 ["Find-AF",`A trial of repeated 10-day Holter monitoring after stroke: AF found in 14% against 5% at 6 months [[Wachter2017]].`,"unit"],
 ["Visual field loss",`Part of the visual field gone. In a referred sample at follow-up: 7.5% full recovery, 39% improvement, 52% no recovery [[Rowe2013]].`,"rehab"],
 ["Wallenberg syndrome",`Lateral medullary stroke, from PICA or vertebral artery disease [[Lo2025]].`,"vessels"],
 ["WFNS grade",`A SAH grading from 1 (GCS 15) to 5 (GCS 3 to 6) [[Claassen2022,Teasdale1988]].`,"bleeds"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'be fast' or 'be-fast' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  const L0=STGL_T.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:STGL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const STSR_AREAN={A:'Epidemiology, burden, presentation & history',B:'Brain blood supply, the ischaemic cascade, causes & TIA',C:'Haemorrhagic stroke: intracerebral & subarachnoid',D:'Recognition, prehospital care, imaging & the NIHSS',E:'Reperfusion: thrombolysis & thrombectomy',F:'Stroke unit care, complications & nursing',G:'Secondary prevention: risk factors, antithrombotics, AF, carotid & PFO',H:'Rehabilitation, recovery & life after stroke',I:'Research frontier'};
const STSR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const stsrSvc=s=>s.unverified?[]:STSR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const stsrLink=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(STSR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(used.map(a=>[a,STSR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>stsrSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=STSR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=stsrSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=stsrLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${STSR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
