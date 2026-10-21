/* =============== 5.3 nursing care =============== */
/* ---- 1 · the head-to-toe screen ---- */
const NS_AS=[
 {k:'Domain 1 of 9',t:'Walking and falls',vis:'dots',
  tool:'T25FW: a rise of more than 20% in walk time was proposed as a possibly significant change.',
  txt:`In an individual-data meta-analysis of 537 people followed for 3 months, 56% fell at least once and 37% fell two or more times (1,721 falls). 65% of falls happened indoors, and fall risk peaked at EDSS 4.0 and 6.0, with odds ratios of about 5. [[Nilsagard2015]] A handbook review puts balance and gait problems at 50–80% of people with MS. [[Cameron2018]] On the Timed 25-Foot Walk, clinically stable people varied by less than 20% over 12 months, so the authors proposed that a rise of more than 20% may mean a significant change in gait. [[Kaufman2000]]`,
  hook:'Falls: 56% fell at least once in 3 months, 37% twice or more. T25FW: more than 20% slower is the proposed change threshold.'},
 {k:'Domain 2 of 9',t:'Arm and hand use',vis:'peg',
  tool:'9HPT: a 20% change is the threshold commonly used for meaningful worsening.',
  txt:`The 9-Hole Peg Test is described as the gold-standard measure of manual dexterity in MS. A 20% change in score is the threshold commonly used for clinically meaningful worsening, a definition its authors say still needs validation at all disease stages. [[Feys2017]] With the T25FW and a cognitive test it makes up the MS Functional Composite: each part becomes a z-score and the z-scores are averaged. [[Fischer1999]]`,
  pt:'The peg test times a fiddly hand task. A result about a fifth slower than before is the change the literature watches for.'},
 {k:'Domain 3 of 9',t:'Fatigue',vis:'bars',bars:[ {l:'Moderate or severe fatigue, TONiC cohort (n=6,356)',v:56.5,lbl:'565 per 1,000'},{l:'Mean FSS of 4 or more, 82-person sample',v:77,lbl:'77%'} ],
  tool:'FSS: a mean score of 4 or more is used as the criterion for substantial fatigue.',
  txt:`In the UK TONiC cohort, moderate or severe fatigue affected 565.4 per 1,000 people. It was higher in progressive MS, peaked at ages 50–64, and only 4.9% followed a low, stable course. [[Young2026]] The Fatigue Severity Scale was developed in people with MS and lupus, and its scores were largely independent of depressive symptoms. [[Krupp1989]] A mean FSS score of 4 or more is used as the criterion for substantial fatigue. [[Learmonth2013]] NICE lists other causes to look for: sleep problems, pain, spasticity, bladder dysfunction, medicines, infection, anaemia, thyroid dysfunction, anxiety and depression. [[NICE2022]]`},
 {k:'Domain 4 of 9',t:'Bladder',vis:'bars',bars:[ {l:'Lower urinary tract symptoms, by self-report',v:68.4,lbl:'68.4%'},{l:'Lower urinary tract symptoms, on urodynamics',v:64,lbl:'64.0%'} ],
  tool:'UK consensus: urine dipstick plus post-void residual. NICE CG148: residual by ultrasound.',
  txt:`A meta-analysis of 12 studies put lower urinary tract symptoms at 68.4% by self-report and 64.0% on urodynamics. [[AlDandan2020]] A UK consensus that included MS nurses built routine bladder care on a reagent-strip test for infection and a post-micturition residual volume, where other countries' guidelines recommend cystometry. [[Fowler2009]] NICE CG148 recommends measuring the residual by ultrasound, preferably with a portable scanner, and re-checking it after starting antimuscarinics or botulinum toxin A in people not using a catheter. It says indwelling urethral catheters may carry higher renal risks than intermittent self-catheterisation. [[NICE2012CG148]] The widely quoted residual of more than 100 mL for starting self-catheterisation could not be confirmed from the consensus full text. [[Fowler2009]]`,
  hook:'UK bladder consensus: dipstick for infection + post-void residual volume, not routine cystometry.'},
 {k:'Domain 5 of 9',t:'Bowel',vis:'bars',bars:[ {l:'Moderate or severe bowel dysfunction, 1,100 outpatients',v:14,lbl:'14%'},{l:'The same, among the most disabled',a:26,v:32,lbl:'26–32%'} ],
  tool:'Neurogenic Bowel Dysfunction score. Management runs from diet and fluids to transanal irrigation.',
  txt:`Among 1,100 Italian outpatients scored with the Neurogenic Bowel Dysfunction score, 14% had moderate or severe bowel dysfunction, rising to 26–32% among the most disabled. Female sex, impaired walking and bladder symptoms predicted severity. [[Bisecco2022]] A nursing review describes bowel dysfunction as one of the most frequent problems in MS, present from onset. Management ranges from diet, fluids and drugs to biofeedback, abdominal massage, transanal irrigation and tibial nerve stimulation. [[Gulick2022]]`},
 {k:'Domain 6 of 9',t:'Skin and pressure areas',vis:'chips',
  tool:'NICE: check areas at risk of pressure ulcers at every contact when mobility is severely reduced.',
  txt:`The Braden Scale has 6 subscales. At a cut-off of 16, sensitivity was 100% in two prospective studies and specificity 64–90%, and inter-rater reliability reached r=0.99 among registered nurses. [[Bergstrom1987]] NICE NG220 recommends checking people with severely reduced mobility for areas at risk at every contact, and regular assessment of contracture risk and bone health. [[NICE2022]] In Missouri long-term care, residents with MS had more pressure ulcers on admission, and an MS diagnosis was associated with developing them by 180 days. [[Newland2005]]`,
  hook:'Braden: 6 subscales; cut-off 16 gave 100% sensitivity in two studies.'},
 {k:'Domain 7 of 9',t:'Swallowing',vis:'bars',bars:[ {l:'Dysphagia, pooled from 54 studies',v:44.8,lbl:'44.8%'},{l:'DYMUS abnormal, 226 clinic patients',v:35,lbl:'35%'} ],
  tool:'DYMUS: 2 or more flagged residue or penetration, 3 or more aspiration (one study).',
  txt:`A 2023 meta-analysis of 54 studies (11,266 people) put dysphagia at 44.8% (95% CI 40.4–49.2%), with very high heterogeneity. [[Mirmosayyeb2023]] The DYMUS questionnaire was built for MS, has solid and liquid subscales, and was abnormal in 35% of 226 clinic patients; it is meant to select people for instrumental assessment. [[Bergamaschi2008]] <span class="ev early">Early evidence</span> Against endoscopic evaluation in 108 people, DYMUS scores of 2 or more flagged pharyngeal residue or penetration, and 3 or more flagged aspiration. [[Erensoy2025]]`},
 {k:'Domain 8 of 9',t:'Mood',vis:'bars',bars:[ {l:'Depression, population-based studies',v:23.7,lbl:'23.7%'},{l:'Anxiety, population-based studies',v:21.9,lbl:'21.9%'} ],
  tool:'PHQ-9: sensitivity 84%. HADS depression subscale at 11: specificity 95%.',
  txt:`A systematic review of 118 studies put population-based prevalence at 23.7% for depression and 21.9% for anxiety. [[Marrie2015Psych]] Against a structured interview in 253 people, the PHQ-9 had the highest sensitivity for major depression (84%) and the HADS depression subscale at a cut-point of 11 the highest specificity (95%). [[Marrie2018]] <span class="ev early">Controversy</span> A Canadian analysis found about 30% screened positive at every visit, mostly with persistent symptoms, and argued resources may do more good in long-term management. [[Patten2010]] The interferon beta-1a label lists depression and suicidal ideation as warnings. [[RebifLabel2025]]`},
 {k:'Domain 9 of 9',t:'Cognition',vis:'bars',bars:[ {l:'Cognitive impairment, adults (by sample and criteria)',a:34,v:65,lbl:'34–65%'},{l:'Cognitive impairment, under-18s',v:33,lbl:'about 33%'} ],
  tool:'SDMT at a stable baseline, then yearly with the same test.',
  txt:`Depending on sample and criteria, cognitive impairment affects 34–65% of adults with MS and about 33% of under-18s. The National MS Society recommends a baseline SDMT, or a similar validated test, when the person is clinically stable, then yearly re-assessment with the same instrument. [[Kalb2018]] A change of about 4 points or 10% is the supported responder definition. [[Benedict2017]] NICE notes that people may not link cognitive problems to their MS, and that anxiety, depression, poor sleep, fatigue and medicines can all affect cognition. [[NICE2022]]`,
  hook:'SDMT: a change of about 4 points or 10% (or 0.5 SD) is treated as meaningful.',
  pt:'Thinking speed is checked once when things are calm, then again each year with the same test, so changes can be seen.'}
];
NS_AS.forEach((s,i)=>{s.from=i/9;s.at=i/9+.04});
const NS_AS_SHORT=['Walking, falls','Arms, hands','Fatigue','Bladder','Bowel','Skin','Swallowing','Mood','Cognition'];
const NS_AS_MK=[ [17,262],[56,170],[0,100],[11,150],[-15,150],[-19,293],[0,54],[-9,18],[9,34] ];
const NS_BRADEN=['Sensory perception','Moisture','Activity','Mobility','Friction and shear','Nutrition'];

/* ---- 2 · infusion day ---- */
const NS_INF_OCR=[
 {from:0,at:.05,k:'Before the day',t:'Checks before the infusion',
  txt:`The ocrelizumab label calls for checking for active infection before every infusion and delaying the infusion if one is present. Before the first dose it requires hepatitis B screening, quantitative immunoglobulins and liver tests. The label places live or live-attenuated vaccines at least 4 weeks before starting, and non-live vaccines at least 2 weeks before where possible. [[OcrevusLabel2026]] The label schedule is 300 mg, 300 mg two weeks later, then 600 mg every 6 months. [[OcrevusLabel2026]]`},
 {from:.12,at:.2,k:'The hour before',t:'Premedication before every infusion',
  txt:`The label's premedication before every infusion is IV methylprednisolone 100 mg (2 mg/kg under 40 kg), finished about 30 minutes before, plus an antihistamine 30–60 minutes before. An antipyretic 30–60 minutes before may be considered. [[OcrevusLabel2026]] Ublituximab uses the same corticosteroid-plus-antihistamine premedication. [[BriumviLabel2026]]`,
  hook:'Ocrelizumab label premedication: methylprednisolone 100 mg IV ~30 min before + antihistamine 30–60 min before (± antipyretic).'},
 {from:.28,at:.45,k:'The infusion',t:'A rate that steps up every 30 minutes',
  txt:`For the 300 mg initial infusions, the label starts at 30 mL/h and raises the rate by 30 mL/h every 30 minutes to a maximum of 180 mL/h, over 2.5 hours or longer. The 600 mg doses use a 3.5-hour schedule (40 rising to 200 mL/h) or, with no prior serious infusion reaction, a 2-hour schedule (100, 200, 250, then 300 mL/h). [[OcrevusLabel2026]] In a randomised substudy, reactions within 24 hours were similar with 2-hour and 3.5-hour infusions (24.4% vs 23.3%). [[OcrevusLabel2026]] Use the Reaction buttons to see the label's rate rules.`},
 {from:.62,at:.7,k:'Afterwards',t:'At least 1 hour after every infusion',
  txt:`The current label calls for observation during and for at least 1 hour after each infusion. [[OcrevusLabel2026]] Switch to the comparison view: the rule differs from product to product, not by any class principle. [[OcrevusLabel2026,BriumviLabel2026,TyrukoLabel2025,LemtradaLabel2025]]`,
  hook:'Ocrelizumab, current US label: observation during and for at least 1 hour after every infusion.',
  pt:'After the drip finishes, the person stays at least an hour so a reaction can be seen and treated.'},
 {from:.8,at:.92,k:'The next 24 hours',t:'Reactions can come later',
  txt:`The label calls for telling patients that reactions can occur up to 24 hours after the infusion. [[OcrevusLabel2026]] In OPERA I and II, infusion-related reactions occurred in 34.3% of ocrelizumab-treated patients. [[Hauser2017]] The label table gives 34% vs 10% (interferon plus placebo infusion) in relapsing MS and 40% vs 26% (placebo) in primary progressive MS. Serious reactions occurred in 0.3% of adults, none fatal. [[OcrevusLabel2026]]`}
];
const NS_INF_CMP=[
 {from:0,at:.04,k:'Infusion 1',t:'All four products observe after the first',
  txt:`Ocrelizumab: at least 1 hour after each infusion. [[OcrevusLabel2026]] Ublituximab: at least 1 hour after the first two infusions. [[BriumviLabel2026]] Natalizumab: 1 hour after each of the first 12. [[TyrukoLabel2025]] Alemtuzumab: 2 hours after each infusion, in a boxed warning. [[LemtradaLabel2025]]`},
 {from:2/14,at:.18,k:'Infusion 3',t:'Ublituximab drops its fixed observation',
  txt:`From the third infusion the ublituximab label leaves monitoring to the physician unless a reaction has occurred. Infusion reactions occurred in 48% of ublituximab-treated patients. [[BriumviLabel2026]]`},
 {from:3/14,at:.5,k:'Infusions 4 to 12',t:'Three rules keep running',
  txt:`The natalizumab label gives 300 mg IV over about 1 hour every 4 weeks, never as a push or bolus. Reactions, defined as any event within 2 hours of starting, occurred in about 24% vs 18% on placebo; serious hypersensitivity in under 1%, linked to anti-natalizumab antibodies. [[TyrukoLabel2025]] In AFFIRM, hypersensitivity reactions of any kind occurred in 4% and serious hypersensitivity in 1%. [[Polman2006]] In the alemtuzumab label each infusion runs over 4 hours, with 1,000 mg methylprednisolone immediately before it on the first 3 days of each course. In its trials 92% had infusion reactions, some more than 24 hours later, and the boxed warning reports stroke and arterial dissection within 3 days of dosing. [[LemtradaLabel2025]]`,
  hook:'Alemtuzumab boxed warning: 2 hours of monitoring after each infusion; patients are taught stroke symptoms (stroke reported within 3 days).'},
 {from:12/14,at:.9,k:'Infusion 13',t:'Natalizumab moves to clinical judgment',
  txt:`After the first 12 infusions, the natalizumab label leaves observation to clinical judgment if there has been no hypersensitivity. [[TyrukoLabel2025]]`},
 {from:.965,at:1,k:'The pattern',t:'Rules by product, not by class',
  txt:`<span class="ev early">Controversy</span> How long to observe after an infusion differs by product: every infusion for ocrelizumab, the first two for ublituximab, the first 12 for natalizumab, and 2 hours after each for alemtuzumab. The research found no class principle behind the differences. [[OcrevusLabel2026,BriumviLabel2026,TyrukoLabel2025,LemtradaLabel2025]]`,
  pt:'Each drug has its own rule for how long people stay after a drip, and the rule comes from that drug\'s own label.'}
];
const NS_RXNOTE={
 mild:` <b>Mild to moderate reaction:</b> the label halves the infusion rate for at least 30 minutes. [[OcrevusLabel2026]]`,
 severe:` <b>Severe reaction:</b> the label interrupts the infusion and restarts at half the rate once symptoms have resolved. [[OcrevusLabel2026]]`,
 life:` <b>Life-threatening reaction:</b> the label stops the infusion and discontinues ocrelizumab permanently. [[OcrevusLabel2026]]`
};

/* ---- 2 · fingolimod first dose ---- */
const NS_FG=[
 {from:0,at:.04,k:'Before the dose',t:'When the observation applies',
  txt:`In the label, fingolimod first-dose monitoring applies at the first dose, on restarting after a break of more than 14 days, and on paediatric dose increases. It begins with an ECG before dosing. [[GilenyaLabel2026]] The label also requires VZV antibody testing in people without confirmed chickenpox or full vaccination; seronegative people are vaccinated and treatment starts a month later. [[GilenyaLabel2026]]`},
 {from:.08,at:.16,k:'Hour 1',t:'The heart rate starts to fall',
  txt:`After the first dose, heart rate starts falling within an hour. [[GilenyaLabel2026]] The label describes observation for at least 6 hours with hourly pulse and blood pressure. [[GilenyaLabel2026]]`,
  pt:'The first tablet slows the heart for a few hours, so the person is watched in clinic with a pulse and blood-pressure check every hour.'},
 {from:.3,at:.5,k:'Hours 2 to 6',t:'Lowest point within 6 hours',
  txt:`Heart rate reaches its lowest point within 6 hours. Symptomatic bradycardia occurred in 0.6% vs 0.1% on placebo. [[GilenyaLabel2026]]`,
  hook:'Fingolimod label, first dose: ECG before, ≥6 h with hourly pulse and BP, ECG at the end.'},
 {from:.7,at:.76,k:'Hour 6',t:'The second ECG, and the decision to extend',
  txt:`The label repeats the ECG at the end of observation. It extends monitoring if the adult heart rate is below 45 bpm at 6 hours, if there is AV block, or if the lowest heart rate falls at the end of the period. [[GilenyaLabel2026]] The length of the extension is not part of the research summary used here, so the animation leaves it open-ended.`},
 {from:.84,at:.94,k:'Up to a month',t:'A second dip, then recovery',
  txt:`A second dip comes within 24 hours, and heart rate returns to baseline within a month. [[GilenyaLabel2026]] The label requires a fundus examination including the macula near the start and 3–4 months later: macular oedema occurred in 0.5% vs 0.4% on placebo, mostly in the first 3–4 months. [[GilenyaLabel2026]]`}
];

/* ---- 3 · monitoring calendar ---- */
const NS_CAL=[
 {from:0,at:.005,k:'Month 0',t:'The baseline checks',
  txt:`Before starting, the labels list: lymphocytes within normal limits for cladribine [[MavencladLabel2026]]; a CBC with lymphocyte count for dimethyl fumarate [[TecfideraLabel2025]]; transaminases and bilirubin within 6 months before teriflunomide [[AubagioLabel2026]]; hepatitis B, immunoglobulins and liver tests for ocrelizumab [[OcrevusLabel2026]]; a baseline skin examination for alemtuzumab [[LemtradaLabel2025]]; and VZV status and an ECG for fingolimod. [[GilenyaLabel2026]]`},
 {from:.02,at:.08,k:'Months 1 to 6',t:'The busiest stretch',
  txt:`What the labels list for these months. Teriflunomide: ALT at least monthly for 6 months, plus blood pressure checks. [[AubagioLabel2026]] Cladribine: a CBC 2 and 6 months after each course starts, monthly if the month-2 count is below 200 cells/µL, with herpes prophylaxis below 200. [[MavencladLabel2026]] Dimethyl fumarate: a CBC at 6 months. [[TecfideraLabel2025]] Fingolimod: an eye examination at 3–4 months. [[GilenyaLabel2026]] Alemtuzumab: monthly CBC with differential, creatinine and urinalysis, thyroid function every 3 months, and herpes prophylaxis from day 1 for at least 2 months or until the CD4+ count is at least 200 cells/µL, whichever is later. [[LemtradaLabel2025]]`,
  hook:'Alemtuzumab label: monthly CBC, creatinine and urinalysis until 48 months after the last infusion; thyroid every 3 months.'},
 {from:.23,at:.25,k:'Month 12',t:'Second courses',
  txt:`In CARE-MS I, alemtuzumab 12 mg/day was given for 5 days, then for 3 days 12 months later. [[Cohen2012]] The cladribine label requires lymphocytes of at least 800 cells/µL before the second yearly course, and may be delayed up to 6 months for recovery; if recovery takes longer, no further cladribine is given. [[MavencladLabel2026]] Its boxed warning requires effective contraception during dosing and for 6 months after the last dose of each course for women, and 14 weeks for men. [[MavencladLabel2026]]`},
 {from:.27,at:.4,k:'Months 13 to 24',t:'Natalizumab and the anti-JCV test',
  txt:`The natalizumab label reports anti-JCV seroconversion of 3–8% a year and asks for antibody-negative patients to be retested periodically, without giving an interval. [[TyrukoLabel2025]] A UK expert group reports that the EMA's CHMP recommends testing every 6 months, and suggests MRI at least 6-monthly (index 1.5 or less) or every 3–4 months (index above 1.5) after 18 months in antibody-positive patients. [[McGuigan2016]] The boxed warning names longer treatment, especially beyond 2 years, as a PML risk factor, alongside anti-JCV antibodies and prior immunosuppressant use. [[TyrukoLabel2025]] Use the toggle to compare the two rules.`,
  pt:'The JCV blood test checks for a virus that, rarely, causes a serious brain infection on natalizumab. The US label says to repeat it "periodically"; European regulators say every 6 months.'},
 {from:.52,at:.75,k:'Years 3 and 4',t:'Some schedules stop, one keeps going',
  txt:`Cladribine: the label gives no further tablets in the 2 years after the two courses, because treatment then may further increase the risk of malignancy. [[MavencladLabel2026]] Dimethyl fumarate: the label asks for a CBC every 6–12 months, with interruption considered if lymphocytes stay below 0.5×10⁹/L for more than 6 months. [[TecfideraLabel2025]] Alemtuzumab: monitoring runs until 48 months after the last infusion, so past month 48 on this calendar. Immune thrombocytopenia has been diagnosed more than 3 years after the last dose, and thyroid disorders reached 36.8%. [[LemtradaLabel2025]]`}
];

/* ---- calculators ---- */
const NS_CALC=[
 {id:'t25',n:'Timed 25-Foot Walk',u:'seconds',b:5.0,f:6.2,thr:20,dir:1,
  lede:'Time to walk 25 feet. Minimally affected people often took 3–5 seconds in one cohort. [[Kaufman2000]]'},
 {id:'hpt',n:'9-Hole Peg Test',u:'seconds',b:20.0,f:22.4,thr:20,dir:1,
  lede:'Timed manual dexterity, described as the gold standard in MS. [[Feys2017]]'},
 {id:'sdmt',n:'Symbol Digit Modalities Test',u:'correct',b:52,f:47,thr:4,dir:-1,
  lede:'Processing speed. Lower scores are worse. [[Benedict2017]]'}
];
const NS_MYTHS=[
 {m:'Every new symptom is a relapse.',a:`NICE requires symptoms lasting more than 24 hours with no infection or other cause, after at least 1 month of stability, and asks for infection to be ruled out first. [[NICE2022]] How common this belief is among patients has no citable source.`},
 {m:'Steroids change the long-term course.',a:`The Cochrane review found methylprednisolone or ACTH protective against worsening within 5 weeks (OR 0.37), but too few data to show any effect on later relapses or long-term disability. [[Filippini2000]]`},
 {m:'IV steroids work better than oral.',a:`A Cochrane review of 5 trials found no significant difference in recovery at 4 weeks. [[Burton2012]] In COPOUSEP, 81% (oral) vs 80% (IV) had improved by day 28. [[LePage2015]]`},
 {m:'Fatigue is always the MS.',a:`NICE lists other causes to look for: sleep problems, pain, spasticity, bladder dysfunction, medicines, infection, anaemia, thyroid dysfunction, anxiety and depression. [[NICE2022]]`},
 {m:'Exercise will make MS worse.',a:`NICE states that regular exercise may benefit MS and does not harm it. [[NICE2022]] In the Cochrane exercise review, relapses were similar with and without exercise (25 vs 26). [[Heine2015]]`},
 {m:'A negative JCV test means no PML risk.',a:`The natalizumab label states that antibody-negative patients remain at risk, from new infection or a false-negative result; the assay's false-negative rate is 3%. [[TyrukoLabel2025]]`},
 {m:'Infusion reactions only happen in the chair.',a:`The labels state reactions can occur up to 24 hours after ocrelizumab or ublituximab, and after the 2-hour monitoring period with alemtuzumab. [[OcrevusLabel2026,BriumviLabel2026,LemtradaLabel2025]]`},
 {m:'Stopping a DMT when stable is harmless.',a:`The fingolimod label reports severe increases in disability with multiple new lesions after stopping, usually within 12 weeks but up to 24, and most patients did not return to their previous function. [[GilenyaLabel2026]] Accelerated elimination of teriflunomide may allow disease activity to return. [[AubagioLabel2026]]`},
 {m:'Pills are easier, so people take them more reliably.',a:`In US claims data, 12-month adherence was 54.1% for new self-injectable users and 53.0% for new oral users, not significantly different. [[Munsell2017]] <span class="ev early">Controversy</span> Industry-funded analyses report higher adherence with monthly ofatumumab; results depend on database, metric and funding. [[Tai2026]]`},
 {m:'Pregnancy makes MS worse.',a:`In PRIMS, the relapse rate fell from 0.7 per woman-year before pregnancy to 0.2 in the third trimester, rose to 1.2 in the first 3 months after delivery, then returned to the pre-pregnancy rate. [[Confavreux1998]] NICE says pregnancy does not increase the risk of progression. [[NICE2022]]`}
];
const NS_DOC=[
 {g:'NICE comprehensive review, at least once a year [[NICE2022]]',items:[
  'Mobility, balance and falls; aids and wheelchair needs','Arm and hand use','Spasms, stiffness and tremor','Bladder, bowel and sexual function','Sensory symptoms and pain','Speech and swallowing','Vision','Cognition','Fatigue, depression, anxiety and sleep','Respiratory function','Disease course: progression, activity, relapses in the past year, DMT eligibility','The nature and extent of disability','Weight, smoking, alcohol and drugs, exercise, screening, contraception','Social participation, driving and employment','Personal and social care, and carers']},
 {g:'Label-driven items [[OcrevusLabel2026,TyrukoLabel2025,LemtradaLabel2025,GilenyaLabel2026,TecfideraLabel2025,MavencladLabel2026,McGuigan2016]]',items:[
  'Infection screen before each anti-CD20 infusion','Premedication given, with times','Infusion rate, and any rate change with the reason','Post-infusion observation time (ocrelizumab ≥1 h each; natalizumab 1 h for the first 12; alemtuzumab ≥2 h)','Fingolimod first dose: hourly pulse and blood pressure, both ECGs','Lymphocyte count against the label threshold (fumarate, cladribine)','Anti-JCV antibody status and index']},
 {g:'Contacts and plans [[NICE2022]]',items:[
  'Relapse reported to the MS multidisciplinary team','Whom to contact when symptoms change','Written information given (for example on steroid side effects)']}
];

inits.nursing=()=>{
  const T=(x,y,s,cls,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const wrap=(s,n)=>{const out=[];let l='';s.split(' ').forEach(w=>{if(l&&(l+' '+w).length>n){out.push(l);l=w}else l=l?l+' '+w:w});if(l)out.push(l);return out};
  const pr=(el,v)=>el.setAttribute('aria-pressed',v);
  $$('[data-ns-jump]').forEach(b=>b.addEventListener('click',()=>{const el=$('#'+b.dataset.nsJump);if(el)el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}));

  /* =========== 1a head-to-toe screen =========== */
  const as=$('#nsAsSvg'),ar=$('#nsAsT');
  function body(cx,top,s){
    const limb=(x1,y1,x2,y2,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--cell-line);stroke-width:${w+3};stroke-linecap:round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--cell);stroke-width:${w};stroke-linecap:round"/>`;
    let g=`<g transform="translate(${f1(cx)} ${f1(top)}) scale(${s})">`;
    g+=limb(-40,64,-54,166,13)+limb(40,64,54,166,13)+limb(-15,170,-18,290,17)+limb(15,170,18,290,17);
    g+=`<rect x="-34" y="52" width="68" height="122" rx="18" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    g+=`<rect x="-7" y="40" width="14" height="16" style="fill:var(--cell)"/><circle cx="0" cy="24" r="21" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    return g+'</g>'}
  function drawAs(t){
    const N=vb(as,'720 400','400 690');
    const L=N?{bx:84,bt:14,bs:.84,mr:8,list:[178,34,25],px:10,py:282,pw:380,ph:398,ix:26,kick:308,ttl:332,vy:350,vw:348,tool:572,tch:52,dc:15,lgx:170,lgn:30,bw:262,chW:166,chC:2}
             :{bx:112,bt:30,bs:1.15,mr:9,list:null,px:228,py:16,pw:476,ph:368,ix:250,kick:44,ttl:70,vy:94,vw:432,tool:318,tch:64,dc:17,lgx:192,lgn:38,bw:320,chW:136,chC:3};
    const p=phaseOf(NS_AS,t),P=NS_AS[p],u=ease(ramp(t,P.from,P.from+.7/9));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=body(L.bx,L.bt,L.bs);
    NS_AS_MK.forEach(([mx,my],i)=>{const x=L.bx+mx*L.bs,y=L.bt+my*L.bs,on=i===p,done=i<p;
      if(on)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(L.mr+3+5*bump((t*9)%1,0,1))}" style="fill:none;stroke:var(--brand);stroke-width:2;opacity:.5"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${L.mr}" style="fill:${on?'var(--brand)':done?'var(--brand-soft)':'var(--panel)'};stroke:${on||done?'var(--brand)':'var(--muted)'};stroke-width:1.5"/>`;
      s+=T(x,y+3.4,i+1,'t-xs t-mid',`font-weight:700;fill:${on?'var(--on-brand)':done?'var(--brand)':'var(--muted)'}`)});
    if(L.list){const [lx,ly,lh]=L.list;NS_AS_SHORT.forEach((n,i)=>{const y=ly+i*lh,on=i===p;
      s+=T(lx,y,`${i+1}`,'t-sm',on?'fill:var(--brand);font-weight:700':'')+T(lx+16,y,n+(i<p?' ✓':''),on?'t-lbl':'t-sm',on?'fill:var(--brand)':'')})}
    // panel
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=T(L.ix,L.kick,P.k.toUpperCase(),'t-xs','letter-spacing:.1em')+T(L.ix,L.ttl,P.t,'t-big');
    const vx=L.ix,vy=L.vy;
    if(P.vis==='dots'){const c=L.dc,n=Math.round(u*100);
      s+=T(vx,vy+8,N?'537 people, 3 months, scaled to 100':'537 people followed for 3 months, scaled to 100','t-xs');
      for(let i=0;i<100;i++){const x=vx+(i%10)*c+c/2,y=vy+20+Math.floor(i/10)*c+c/2,on=i<n;
        const st=!on?'fill:var(--panel-2)':i<37?'fill:var(--attack)':i<56?'fill:var(--attack-soft);stroke:var(--attack);stroke-width:1.2':'fill:var(--panel-2);stroke:var(--line)';
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.36)}" style="${st}"/>`}
      const lx=vx+L.lgx,o=ramp(u,.55,1);
      const lg=[ ['fill:var(--attack)','37 fell two or more times'],['fill:var(--attack-soft);stroke:var(--attack);stroke-width:1.2','19 more fell once (56 in all)'],['fill:var(--panel-2);stroke:var(--line)','44 did not fall'] ];
      lg.forEach(([st,l],i)=>{const y=vy+36+i*22;s+=`<circle cx="${lx+6}" cy="${y-4}" r="5.5" style="${st};opacity:${f1(o)}"/>`+T(lx+18,y,l,'t-xs',`opacity:${f1(o)};fill:var(--ink)`)});
      wrap('65% of falls happened indoors. Risk peaked at EDSS 4.0 and 6.0.',L.lgn).forEach((l,i)=>{s+=T(lx,vy+118+i*15,l,'t-xs',`opacity:${f1(o)}`)})}
    if(P.vis==='bars'){const bw=L.bw;
      P.bars.forEach((b,i)=>{const y=vy+14+i*58;s+=T(vx,y,b.l,'t-xs','fill:var(--ink)');
        s+=`<rect x="${vx}" y="${y+7}" width="${bw}" height="18" rx="5" style="fill:var(--panel-2)"/>`;
        [25,50,75].forEach(g=>{s+=`<line x1="${f1(vx+bw*g/100)}" y1="${y+7}" x2="${f1(vx+bw*g/100)}" y2="${y+25}" style="stroke:var(--panel);stroke-width:1.5"/>`});
        const a=b.a?b.a*u:0,v=b.v*u;
        if(b.a)s+=`<rect x="${f1(vx+bw*a/100)}" y="${y+7}" width="${f1(Math.max(0,bw*(v-a)/100))}" height="18" rx="5" style="fill:var(--brand);opacity:.55"/>`;
        else s+=`<rect x="${vx}" y="${y+7}" width="${f1(bw*v/100)}" height="18" rx="5" style="fill:var(--brand)"/>`;
        s+=T(vx+bw*b.v/100*u+8,y+21,b.lbl,'t-sm',`fill:var(--ink);font-weight:600;opacity:${f1(ramp(u,.6,1))}`)});
      const ay=vy+14+P.bars.length*58+2;
      [0,50,100].forEach(g=>{s+=T(vx+bw*g/100,ay,g+'%','t-xs '+(g===0?'':g===100?'t-end':'t-mid'))});
      if(P.bars.some(b=>b.a))s+=T(vx,ay+18,N?'Shaded span: the published range':'Shaded span: the published range, not a single value','t-xs')}
    if(P.vis==='peg'){const bx=vx+6,by=vy+10,cs=N?40:44,n=Math.round(u*9);
      s+=`<rect x="${bx}" y="${by}" width="${cs*3+20}" height="${cs*3+20}" rx="12" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.5"/>`;
      for(let i=0;i<9;i++){const x=bx+10+(i%3)*cs+cs/2,y=by+10+Math.floor(i/3)*cs+cs/2;
        s+=`<circle cx="${x}" cy="${y}" r="9" style="fill:var(--panel-2);stroke:var(--gold);stroke-width:1.2"/>`;
        if(i<n)s+=`<rect x="${x-4}" y="${y-16}" width="8" height="20" rx="3" style="fill:var(--brand)"/>`}
      const lx=bx+cs*3+36,ln=N?28:40;
      const lines=[ ['Gold-standard dexterity','measure in MS'],['20% change: the common','threshold for worsening'],['Validation at all stages','still needed'] ];
      lines.forEach((pr2,i)=>{const y=by+18+i*44;s+=T(lx,y,pr2[0],'t-xs','fill:var(--ink)')+T(lx,y+14,pr2[1],'t-xs','fill:var(--ink)')});
      wrap('Peg board drawn as an icon only; the test procedure is not described in the sources used.',N?40:70).forEach((l,i)=>{s+=T(bx,by+cs*3+(N?40:42)+i*14,l,'t-xs')})}
    if(P.vis==='chips'){const cw=L.chW,cc=L.chC;
      s+=T(vx,vy+8,'Braden Scale: 6 subscales','t-xs','fill:var(--ink)');
      NS_BRADEN.forEach((c,i)=>{const o=ramp(u,i/8,i/8+.25),x=vx+(i%cc)*(cw+8),y=vy+20+Math.floor(i/cc)*34;
        s+=`<g style="opacity:${f1(o)}"><rect x="${x}" y="${y}" width="${cw}" height="26" rx="13" style="fill:var(--brand-soft);stroke:var(--brand)"/>${T(x+cw/2,y+17,c,'t-xs t-mid','fill:var(--ink)')}</g>`});
      const y0=vy+20+Math.ceil(6/cc)*34+18,o=ramp(u,.7,1);
      wrap('At a cut-off of 16: sensitivity 100% in two studies, specificity 64–90%. Inter-rater r = 0.99 among registered nurses.',N?54:68).forEach((l,i)=>{s+=T(vx,y0+i*15,l,'t-xs',`fill:var(--ink);opacity:${f1(o)}`)})}
    // tool line
    s+=`<line x1="${L.ix}" y1="${L.tool-16}" x2="${L.px+L.pw-20}" y2="${L.tool-16}" class="grid"/>`;
    s+=T(L.ix,L.tool,'TOOL','t-xs','letter-spacing:.1em;fill:var(--brand);font-weight:700');
    wrap(P.tool,L.tch).forEach((l,i)=>{s+=T(L.ix,L.tool+17+i*16,l,'t-sm','fill:var(--ink)')});
    as.innerHTML=s;
    setAs(p);$('#nsAsNote').innerHTML=noteHTML(P);
  }
  const stopAs=playWire(ar,$('#nsAsPlay'),drawAs,22000,'Replay','nursing');
  const setAs=stepWire($('#nsAsSteps'),NS_AS.map((s,i)=>({...s,t:NS_AS_SHORT[i]})),ar,drawAs,stopAs);

  /* =========== 1b calculators =========== */
  const calcs=$('#nsCalcs');
  calcs.innerHTML=NS_CALC.map(c=>`<div class="ns-tool" id="nsC-${c.id}"><h4>${c.n}</h4><p>${c.lede}</p>
    <div class="ns-in"><label>Baseline (${c.u})<input type="number" step="${c.dir>0?'0.1':'1'}" min="0" value="${c.b}" data-ns-c="${c.id}" data-k="b"></label><label>Follow-up (${c.u})<input type="number" step="${c.dir>0?'0.1':'1'}" min="0" value="${c.f}" data-ns-c="${c.id}" data-k="f"></label></div>
    <div class="ns-out" id="nsCo-${c.id}" aria-live="polite"></div></div>`).join('')+
    `<div class="ns-tool" id="nsC-fss"><h4>Fatigue Severity Scale</h4><p>A unidimensional fatigue-severity scale developed in people with MS and lupus. [[Krupp1989]]</p>
    <label class="stage-cap tl" for="nsFss"><span class="ns-nw">Mean score <b id="nsFssV">4.6</b></span> <input type="range" id="nsFss" min="1" max="7" step="0.1" value="4.6"></label>
    <span class="ns-unv">Not confirmed</span><p style="font-size:13.5px;color:var(--muted)">The slider runs 1 to 7 because the scale is commonly described as 9 items each rated 1–7. That structure was not confirmed in the abstracts read for this module. [[Krupp1989,Learmonth2013]]</p>
    <div class="ns-out" id="nsCo-fss" aria-live="polite"></div></div>`;
  const meter=(frac,thr,lab0,labT,labM,bad)=>`<div class="ns-meter" aria-hidden="true"><i style="width:${f1(clamp(frac)*100)}%;background:${bad?'var(--bad)':'var(--good)'}"></i><s style="left:${f1(thr*100)}%"></s></div><div class="ns-mcap" aria-hidden="true" style="position:relative"><span>${lab0}</span><span style="position:absolute;left:${f1(thr*100)}%;transform:translateX(-50%)">${labT}</span><span>${labM}</span></div>`;
  function calc(id){
    const c=NS_CALC.find(x=>x.id===id),q=k=>parseFloat($(`#nsC-${id} [data-k="${k}"]`).value),b=q('b'),f=q('f'),out=$('#nsCo-'+id);
    if(!(b>0)||!(f>=0)){out.innerHTML='<p>Enter a baseline above zero and a follow-up value.</p>';return}
    const pc=(f-b)/b*100,pq=Math.round(pc*1e6)/1e6;
    if(c.dir>0){const st=id==='t25',worse=st?pq>c.thr:pq>=c.thr,better=st?pq<-c.thr:pq<=-c.thr;
      out.innerHTML=`<div class="kicker">Change in time</div><div class="big">${pc>=0?'+':''}${f1(pc)}%</div>${meter(Math.abs(pc)/50,c.thr/50,'0%','20% line','50%',worse)}
      <div class="verdict ${worse?'no':better?'yes':'maybe'}">${st?(worse?'Slower by more than 20%':better?'Faster by more than 20%':'Within ±20%'):(worse?'Slower by 20% or more':better?'Faster by 20% or more':'A change of less than 20%')}</div>
      <p>${id==='t25'?(worse?'Kaufman et al. proposed that a rise of more than 20% may indicate a significant change in gait. [[Kaufman2000]]':'Walk times of clinically stable people varied by less than 20% over 12 months or less. [[Kaufman2000]]')+' The MS Outcome Assessments Consortium says the 20% threshold still needs validation across the whole disability spectrum. [[Motl2017T25FW]]'
        :(worse?'A 20% change is the threshold commonly used for clinically meaningful worsening.':'The commonly used threshold for clinically meaningful worsening is a 20% change.')+' Its authors say the definition needs further validation at all disease stages. [[Feys2017]]'}</p>`}
    else{const d=Math.round((f-b)*1e6)/1e6,meets=d<=-4||pq<=-10,gain=d>=4||pq>=10;
      out.innerHTML=`<div class="kicker">Change</div><div class="big">${d>=0?'+':''}${d} points (${pc>=0?'+':''}${f1(pc)}%)</div>${meter(Math.abs(d)/12,4/12,'0','4 points','12',meets)}
      <div class="verdict ${meets?'no':gain?'yes':'maybe'}">${meets?'A fall that meets the ~4-point or 10% definition':gain?'A rise of 4 points or 10% or more':'Smaller than 4 points and 10%'}</div>
      <p>Research supports a responder definition of a change of about 4 points or 10%. [[Benedict2017]] The National MS Society recommendations repeat it, or a change of 0.5 SD, and advise re-testing yearly with the same instrument. [[Kalb2018]]</p>`}
  }
  function fss(){const v=+$('#nsFss').value,hi=v>=4;$('#nsFssV').textContent=f1(v);
    $('#nsCo-fss').innerHTML=`<div class="kicker">Mean FSS</div><div class="big">${f1(v)}</div>${meter((v-1)/6,3/6,'1','4','7',hi)}
    <div class="verdict ${hi?'no':'yes'}">${hi?'At or above 4: meets the criterion for substantial fatigue':'Below 4'}</div>
    <p>A mean FSS of 4 or more is used as the criterion for substantial fatigue; 77% of an 82-person MS sample met it. [[Learmonth2013]]</p>`}
  calcs.addEventListener('input',e=>{const el=e.target.closest('[data-ns-c]');if(el)calc(el.dataset.nsC);if(e.target.id==='nsFss')fss()});
  NS_CALC.forEach(c=>calc(c.id));fss();

  /* =========== 1c other scales =========== */
  let ruler='';[0,...Array.from({length:18},(_,i)=>1+i/2),10].forEach(v=>{const h=v%1!==0;ruler+=`<span class="${h?'h':''}" title="${v}">${h?'':v}</span>`});
  $('#nsScaleCards').innerHTML=`
   <div class="card"><h4>EDSS: who scores it</h4><div class="ns-ruler" style="grid-template-columns:repeat(20,minmax(0,1fr))" role="img" aria-label="EDSS steps 0, then 1.0 to 9.5 in half points, then 10">${ruler}</div>
    <p>The EDSS runs from 0 (normal) to 10 (death due to MS), in half-points from 1.0 to 9.5, built on 8 Functional Systems: pyramidal, cerebellar, brainstem, sensory, bowel and bladder, visual, cerebral and other. [[Kurtzke1983]]</p>
    <p>It is traditionally scored by trained neurologists using the standardised Neurostatus method. In a Swiss randomised crossover study of 100 people, specially trained non-neurologist professionals agreed with neurologists at a concordance of 0.87. [[Mallucci2025]] In two phase 3 trials, 40.1% of assessments had internal inconsistencies at first entry; electronic checking cut this to 22.1% and changed the final score in 14.8%. [[DSouza2020]] Reported inter-rater kappa is 0.32–0.76. [[MeyerMoock2014]]</p>
    <div class="hook"><b>Exam hook</b>Trials usually count confirmed worsening as +1.0 point from a baseline of 5.5 or less, or +0.5 above 5.5, confirmed after 12 or 24 weeks. [[Kappos2020]]</div></div>
   <div class="card"><span class="ns-unv">Item structure not confirmed</span><h4>Modified Fatigue Impact Scale</h4><p>A multidimensional scale with physical, cognitive and psychosocial subscales. Six-month reliability was ICC 0.863, against 0.751 for the FSS. [[Learmonth2013]] A four-country study found internal consistency of 0.92 overall but only 0.65 for the psychosocial subscale, and advised caution with that subscale. [[Kos2005]]</p><p>The widely quoted structure of 21 items and a 0–84 total comes from a full text that could not be retrieved, so it is not stated here as fact. [[Larson2013]]</p></div>
   <div class="card"><span class="ns-unv">Grade set not confirmed</span><h4>Modified Ashworth Scale</h4><p>In the original reliability study, two raters grading elbow-flexor spasticity in 30 patients agreed on 86.7% of ratings (Kendall's tau 0.847). [[Bohannon1987]] The grades usually taught (0, 1, 1+, 2, 3, 4) were not confirmed in the abstract read.</p><p>NICE lists signs that should raise suspicion of spasticity (spasms, stiffness, pain or restriction with movement, a change in mobility or arm function), recommends looking for aggravating factors such as pressure ulcers, bladder or bowel problems, infection, posture and pain, and notes that some people use their spasticity to stand, walk or transfer. [[NICE2022]]</p></div>
   <div class="card"><h4>MSIS-29</h4><p>A patient-reported impact scale with 20 physical and 9 psychological items, developed from 129 candidate items in a postal survey of 1,530 UK MS Society members. Item test-retest reliability was r=0.65–0.90 and Cronbach's alpha up to 0.91. [[Hobart2001]]</p></div>
   <div class="card"><h4>Advanced and inpatient MS</h4><p>The EAN palliative-care guideline for severe progressive MS (EDSS above 6.0) made 34 recommendations, 33 of them weak, and notes a lack of evidence on advance care planning and on support for carers. [[Solari2020]] NICE recommends palliative care referral when appropriate and discussing carers' right to an assessment. [[NICE2022]]</p><p>In Veneto death records, aspiration pneumonia, pressure ulcers or skin infections, sepsis and urinary tract infection were all associated with MS-related deaths. [[Fedeli2023]] NICE recommends regular assessment of contracture risk [[NICE2022]], but no MS-specific trial of nursing contracture-prevention methods was found in the research for this module.</p></div>`;

  /* =========== 2a infusion day =========== */
  const isv=$('#nsInfSvg'),ir=$('#nsInfT');let view='ocr',rx='none',setInf=()=>{};
  const steps=()=>view==='ocr'?NS_INF_OCR:NS_INF_CMP;
  const infM=t=>t<.12?-90:t<.28?lerp(-60,0,(t-.12)/.16):t<.62?lerp(0,170,(t-.28)/.34):t<.8?lerp(170,230,(t-.62)/.18):lerp(230,1440,(t-.8)/.2);
  const BASE=[ [0,30,30],[30,60,60],[60,90,90],[90,120,120],[120,150,150],[150,170,180] ];
  function rateSegs(){
    const cut=(a)=>BASE.filter(s=>s[0]<a).map(s=>[s[0],Math.min(s[1],a),s[2]]),rest=(a)=>BASE.filter(s=>s[1]>a).map(s=>[Math.max(s[0],a),s[1],s[2]]);
    if(rx==='mild')return{act:[...cut(75),[75,105,45]],grey:rest(105),ev:[ [75,'rate halved, ≥30 min'] ]};
    if(rx==='severe')return{act:[...cut(75),[75,95,0],[95,125,45]],grey:rest(125),ev:[ [75,'interrupted'],[95,'restart at half'] ]};
    if(rx==='life')return{act:[...cut(75),[75,170,0]],grey:[],ev:[ [75,'stopped permanently'] ]};
    return{act:BASE,grey:[],ev:[]};
  }
  function drawOcr(t,N){
    const L=N?{x0:44,W:296,tx0:352,tx1:392,ttl:24,clk:44,clkX:392,ev:58,rows:[74,94,114],br:138,ct:156,cb:300,ol:324,ol1:348,ol2:364,st:392,box:[10,58,380,244],bwrap:52}
             :{x0:74,W:556,tx0:648,tx1:704,ttl:28,clk:28,clkX:704,ev:46,rows:[64,84,104],br:134,ct:150,cb:268,ol:296,ol1:320,ol2:320,st:340,box:[20,48,684,222],bwrap:96};
    const pw=.22*L.W,m=infM(t);
    const X=v=>v<=-60?L.x0:v<0?L.x0+(v+60)/60*pw:v<=230?L.x0+pw+v/230*(L.W-pw):L.tx0+(Math.min(v,1440)-230)/(1440-230)*(L.tx1-L.tx0);
    const Y=r=>L.cb-r/180*(L.cb-L.ct);
    let s='';
    s+=T(10,L.ttl,N?'Ocrelizumab, initial 300 mg dose':'Ocrelizumab infusion day, initial 300 mg dose','t-lbl');
    const clk=m<-60?'Before the day':m<0?`${Math.round(m)} min`:m<=230?`+${Math.round(m)} min`:`+${f1(m/60)} h`;
    const R=rateSegs(),cur=R.act.find(sg=>m>=sg[0]&&m<sg[1]);
    s+=T(L.clkX,L.clk,clk+(cur&&m>=0?` · ${cur[2]} mL/h`:''),'t-sm t-end','fill:var(--ink);font-weight:600');
    // premedication rows
    const po=ramp(t,.11,.15);
    if(po>0){const r=L.rows,xa=X(-60),xb=X(-30),g=`opacity:${f1(po)}`;
      s+=`<g style="${g}">`;
      for(let k=0;k<4;k++)s+=`<rect x="${f1(lerp(xa,xb,k/4))}" y="${r[0]-5}" width="${f1((xb-xa)/4+.5)}" height="10" style="fill:var(--rx);opacity:${f1(.2+k*.25)}"/>`;
      s+=`<line x1="${f1(xb)}" y1="${r[0]-8}" x2="${f1(xb)}" y2="${r[0]+8}" style="stroke:var(--rx);stroke-width:2.5"/>`;
      s+=T(xb+8,r[0]+4,N?'MP 100 mg IV, done ~30 min before':'Methylprednisolone 100 mg IV, finished about 30 min before','t-xs','fill:var(--ink)');
      s+=`<path d="M${f1(xa)} ${r[1]+5}V${r[1]-5}H${f1(xb)}V${r[1]+5}" style="fill:none;stroke:var(--rx);stroke-width:2"/>`+T(xb+8,r[1]+4,'Antihistamine, 30–60 min before','t-xs','fill:var(--ink)');
      s+=`<path d="M${f1(xa)} ${r[2]+5}V${r[2]-5}H${f1(xb)}V${r[2]+5}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:3 3"/>`+T(xb+8,r[2]+4,N?'Antipyretic: may be considered':'Antipyretic 30–60 min before: may be considered','t-xs');
      s+='</g>'}
    // rate axes
    const ao=ramp(t,.1,.14);
    s+=`<g style="opacity:${f1(ao)}">`;
    [0,60,120,180].forEach(r=>{s+=`<line x1="${L.x0}" y1="${f1(Y(r))}" x2="${f1(X(230))}" y2="${f1(Y(r))}" class="${r?'grid':'axis'}"/>`+T(L.x0-6,Y(r)+3.5,r,'t-xs t-end')});
    s+=T(L.x0-6,L.ct-8,'mL/h','t-xs t-end');
    s+=`<line x1="${f1(X(0))}" y1="${L.ct-6}" x2="${f1(X(0))}" y2="${L.cb}" style="stroke:var(--muted);stroke-width:1"/>`;
    [0,60,120,180].forEach(v=>{s+=T(X(v),L.cb+13,v===0?'0':`${v/60} h`,'t-xs t-mid')});
    s+=T(X(-60),L.cb+13,N?'−1 h':'−60 min','t-xs');
    // bracket for 2.5 h
    s+=`<path d="M${f1(X(0))} ${L.br+4}V${L.br}H${f1(X(150))}V${L.br+4}" style="fill:none;stroke:var(--muted);stroke-width:1"/>`+T((X(0)+X(150))/2,L.br-4,N?'to 180 mL/h by 2.5 h':'+30 mL/h every 30 min: 2.5 hours or longer','t-xs t-mid');
    s+='</g>';
    // rate path up to the cursor
    if(m>0){const mm=Math.min(m,230);let d='',area='';const act=R.act.filter(sg=>sg[0]<mm);
      act.forEach((sg,i)=>{const a=sg[0],b=Math.min(sg[1],mm);d+=(i?'L':'M')+f1(X(a))+' '+f1(Y(sg[2]))+'L'+f1(X(b))+' '+f1(Y(sg[2]))});
      if(act.length){area=`M${f1(X(0))} ${L.cb}`+d.replace(/^M/,'L')+`L${f1(X(Math.min(act[act.length-1][1],mm)))} ${L.cb}Z`;
        s+=`<path d="${area}" style="fill:var(--rx-soft);opacity:.8"/><path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:2.6;stroke-linejoin:round"/>`}
      R.grey.forEach(sg=>{if(mm>sg[0])s+=`<path d="M${f1(X(sg[0]))} ${f1(Y(sg[2]))}H${f1(X(Math.min(sg[1],mm)))}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4;opacity:.6"/>`});
      if(R.grey.length&&mm>R.grey[0][0])s+=T(X(R.grey[0][0])+6,Y(R.grey[0][2])+14,N?'then per label':'then as the label directs (not modelled)','t-xs');
      const evs=R.ev.filter(([em])=>mm>=em);
      evs.forEach(([em],i)=>{const x=X(em),y=L.ct+12;
        s+=`<path d="M${f1(x)} ${y-12}L${f1(x+7)} ${y}L${f1(x-7)} ${y}Z" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.5"/>`+T(x,y-2.5,'!','t-xs t-mid','font-weight:700;fill:var(--warn)')});
      if(evs.length)s+=T(L.clkX,L.ev,'Reaction at +75 min: '+evs.map(e=>e[1]).join(', then '),'t-xs t-end','fill:var(--warn);font-weight:600');
      if(rx==='life'&&mm>75)s+=T(X(120),Y(30),N?'discontinued':'ocrelizumab discontinued','t-sm t-mid','fill:var(--bad);font-weight:600')}
    // observation lane
    if(m>0){const o=L.ol,mm=Math.min(m,170);
      s+=`<rect x="${f1(X(0))}" y="${o-8}" width="${f1(X(mm)-X(0))}" height="16" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(m>40)s+=T(X(0)+8,o+3.5,N?'observed during':'observed during the infusion','t-xs','fill:var(--ink)');
      if(m>170){const mb=Math.min(m,230);s+=`<rect x="${f1(X(170))}" y="${o-8}" width="${f1(X(mb)-X(170))}" height="16" rx="4" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.5"/>`;
        if(m>200)s+=T((X(170)+X(230))/2,o+3.5,'≥1 h','t-xs t-mid','fill:var(--ink);font-weight:700')}
      if(m>230){s+=`<path d="M${f1(X(230))} ${o}H${f1(X(m))}" style="stroke:var(--warn);stroke-width:2;stroke-dasharray:3 4"/>`;
        s+=T(L.tx1,L.cb+13,'24 h','t-xs t-end')}
      s+=`<path d="M${L.tx0-9} ${o-9}l5 18M${L.tx0-4} ${o-9}l5 18" style="stroke:var(--muted);stroke-width:1"/>`;
      if(m>175)s+=T(L.x0,L.ol1,N?'≥1 h after every infusion (current label)':'Observation for at least 1 hour after every infusion (current label)','t-xs','fill:var(--ink)');
      if(m>232)s+=T(N?L.x0:L.tx1,L.ol2,'Reactions can occur up to 24 h later',N?'t-xs':'t-xs t-end','fill:var(--warn)')}
    // cursor
    if(m>=-60){const x=X(m);s+=`<line x1="${f1(x)}" y1="${L.ct-4}" x2="${f1(x)}" y2="${L.ol+10}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3;opacity:.6"/>`}
    // trial figures
    const so=ramp(t,.8,.86);
    if(so>0){const G=[ ['OPERA I and II',[ ['Ocrelizumab',34.3] ]],['Label, relapsing MS',[ ['Ocrelizumab',34],['Interferon + placebo infusion',10] ]],['Label, primary progressive MS',[ ['Ocrelizumab',40],['Placebo',26] ]] ];
      s+=`<g style="opacity:${f1(so)}">`+T(N?10:20,L.st,'INFUSION REACTIONS, OCRELIZUMAB VS COMPARATOR','t-xs','letter-spacing:.08em;font-weight:700');
      G.forEach(([h,bars],i)=>{const gx=N?10:20+i*228,gy=N?L.st+18+i*46:L.st+18,bw=N?200:150;
        s+=T(gx,gy,h,'t-xs','fill:var(--ink);font-weight:600');
        bars.forEach(([l,v],j)=>{const y=gy+5+j*15,w=bw*v/100*ease(ramp(t,.8,.9));s+=`<rect x="${gx}" y="${y}" width="${f1(w)}" height="11" rx="3" style="fill:${j?'var(--muted)':'var(--rx)'};opacity:${j?.55:1}"/>`+T(gx+w+6,y+9.5,`${v}%${N||j?' '+(j?l.toLowerCase():''):''}`.trim(),'t-xs','fill:var(--ink)')})});
      s+='</g>'}
    // before box
    const bo=1-ramp(t,.1,.13);
    if(bo>0){const [bx,by,bw,bh]=L.box;s+=`<g style="opacity:${f1(bo)}"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`+T(bx+14,by+24,'Before the infusion: what the label lists','t-lbl');
      let y=by+48;['Before every infusion: a check for active infection; the infusion is delayed if one is present.','Before the first dose: hepatitis B screening, quantitative immunoglobulins and liver tests.','Vaccines: live or live-attenuated at least 4 weeks before starting; non-live at least 2 weeks before, where possible.','Schedule: 300 mg, 300 mg two weeks later, then 600 mg every 6 months.'].forEach(par=>{
        wrap(par,L.bwrap).forEach((l,i)=>{s+=T(bx+(i?26:14),y,(i?'':'• ')+l,'t-sm','fill:var(--ink)');y+=16});y+=6});
      s+='</g>'}
    return s}
  const CMP=[ {n:'Ocrelizumab',r:'at least 1 h after every infusion',rn:'≥1 h, every infusion',h:k=>1},
   {n:'Ublituximab',r:'at least 1 h after the first two only',rn:'≥1 h, first two only',h:k=>k<2?1:0},
   {n:'Natalizumab',r:'1 h after each of the first 12',rn:'1 h, first 12 only',h:k=>k<12?1:0},
   {n:'Alemtuzumab',r:'2 h after each infusion (boxed warning); 8 infusions in two courses',rn:'2 h after each (8 in all)',h:k=>k<8?2:-1} ];
  function drawCmp(t,N){
    const L=N?{hd:[22,38],num:68,r0:96,rh:80,cx:16,cw:26,ch:34,lg:[426,442]}:{hd:[28],num:62,r0:92,rh:76,cx:20,cw:48,ch:36,lg:[392]};
    const col=Math.min(14,Math.floor(t*14)+1);let s='';
    if(N)s+=T(10,L.hd[0],'Observation after an infusion,','t-lbl')+T(10,L.hd[1],'by infusion number (US labels)','t-lbl');
    else s+=T(10,L.hd[0],'Observation after an infusion, by infusion number (current US labels)','t-lbl');
    s+=T(L.cx,L.num-14,'Infusion number →','t-xs');
    for(let k=0;k<14;k++){const x=L.cx+k*L.cw+(L.cw-4)/2;s+=T(x,L.num,k+1,'t-xs t-mid',k+1===col?'fill:var(--ink);font-weight:700':'')}
    s+=`<rect x="${f1(L.cx+(col-1)*L.cw-2)}" y="${L.num-12}" width="${L.cw}" height="${f1(L.r0+3*L.rh+10+L.ch+4-(L.num-12))}" rx="6" style="fill:var(--brand-soft);opacity:.55"/>`;
    CMP.forEach((d,i)=>{const y=L.r0+i*L.rh;s+=T(L.cx,y,`<tspan style="font-weight:700">${d.n}</tspan> · ${N?d.rn:d.r}`,'t-sm','fill:var(--ink)');
      for(let k=0;k<14;k++){const x=L.cx+k*L.cw,cy=y+10,w=L.cw-4,on=k<col,h=d.h(k);
        if(!on){s+=`<rect x="${x}" y="${cy}" width="${w}" height="${L.ch}" rx="4" style="fill:none;stroke:var(--line);stroke-dasharray:2 3"/>`;continue}
        if(h===-1){s+=`<rect x="${x}" y="${cy}" width="${w}" height="${L.ch}" rx="4" style="fill:none;stroke:var(--line)"/>`+T(x+w/2,cy+L.ch/2+4,'–','t-sm t-mid');continue}
        if(h){const fh=L.ch*h/2;s+=`<rect x="${x}" y="${cy}" width="${w}" height="${L.ch}" rx="4" style="fill:var(--panel);stroke:${h===2?'var(--attack)':'var(--rx)'};stroke-width:1.3"/><rect x="${x}" y="${f1(cy+L.ch-fh)}" width="${w}" height="${f1(fh)}" rx="4" style="fill:${h===2?'var(--attack-soft)':'var(--rx-soft)'}"/>`+T(x+w/2,cy+L.ch-5,N?h+'h':h+' h','t-xs t-mid','fill:var(--ink);font-weight:600')}
        else s+=`<rect x="${x}" y="${cy}" width="${w}" height="${L.ch}" rx="4" style="fill:var(--field);stroke:var(--muted);stroke-dasharray:3 3"/>`+T(x+w/2,cy+L.ch/2+4,'?','t-sm t-mid')}});
    const lg=N?['Shaded height = hours of fixed observation.','? = judgment per label. – = no further infusion.']:['Shaded height = hours of fixed observation.  ? = no fixed time: clinical judgment, per label.  – = no infusion (two courses: 5 + 3).'];
    lg.forEach((l,i)=>{s+=T(10,L.lg[i],l,'t-xs')});
    return s}
  function drawInf(t){
    const N=view==='ocr'?vb(isv,'720 400','400 540'):vb(isv,'720 404','400 452');
    isv.innerHTML=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`+(view==='ocr'?drawOcr(t,N):drawCmp(t,N));
    const S=steps(),p=phaseOf(S,t);setInf(p);let P=S[p];
    if(view==='ocr'&&rx!=='none'&&p>=2)P={...P,txt:P.txt+NS_RXNOTE[rx]};
    $('#nsInfNote').innerHTML=noteHTML(P);
  }
  const stopInf=playWire(ir,$('#nsInfPlay'),drawInf,20000,'Replay','nursing');
  function buildInfSteps(){const old=$('#nsInfSteps'),nw=old.cloneNode(false);old.replaceWith(nw);setInf=stepWire(nw,steps(),ir,drawInf,stopInf)}
  buildInfSteps();
  function setView(v){view=v;stopInf();pr($('#nsInfVOcr'),v==='ocr');pr($('#nsInfVCmp'),v==='cmp');$('#nsInfRx').hidden=v!=='ocr';
    $('#nsInfCap').textContent=v==='ocr'?'Rates and timings from the current US label; the time axis is compressed before the start and after the infusion.':'Columns are infusion numbers, not dates. Each drug has its own schedule.';
    buildInfSteps();ir.value=v==='ocr'?.05:.04;drawInf(+ir.value)}
  $('#nsInfVOcr').onclick=()=>setView('ocr');$('#nsInfVCmp').onclick=()=>setView('cmp');
  $('#nsInfRx').addEventListener('click',e=>{const b=e.target.closest('[data-ns-rx]');if(!b)return;rx=b.dataset.nsRx;$$('#nsInfRx [data-ns-rx]').forEach(x=>pr(x,x===b));
    if(+ir.value<.45){stopInf();ir.value=.5}drawInf(+ir.value)});

  /* =========== 2b fingolimod first dose =========== */
  const fsv=$('#nsFgSvg'),fr=$('#nsFgT');let fg='typ';
  const FGP={typ:{hp:4.5,A:.26},low:{hp:4.8,A:.44},late:{hp:7,A:.3}};
  const fgH=t=>t<.08?0:t<.72?lerp(0,6,(t-.08)/.64):t<.82?lerp(6,8,(t-.72)/.1):lerp(8,24,(t-.82)/.18);
  const rel=h=>{const q=FGP[fg];if(h<=0)return 1;const g=q.A*Math.pow(h/q.hp,1.5)*Math.exp(1.5*(1-h/q.hp));return 1-g-.12*Math.exp(-Math.pow((h-18)/2.5,2))};
  function drawFg(t){
    const N=vb(fsv,'720 360','400 452');
    const L=N?{x0:40,x1:330,tx0:346,tx1:390,ap:[22,38,54],lgy:72,ct:90,cb:252,ecg:286,hr:318,ext:346,ft:[378,394,410,426]}
             :{x0:60,x1:600,tx0:618,tx1:704,ap:[26],lgy:44,ct:62,cb:226,ecg:258,hr:292,ext:318,ft:[346]};
    const X=h=>h<=8?L.x0+h/8*(L.x1-L.x0):L.tx0+(Math.min(h,24)-8)/16*(L.tx1-L.tx0);
    const Y=r=>L.ct+14+(1-r)/.6*(L.cb-L.ct-14),h=fgH(t);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const ap=N?['Applies at: the first dose,','restart after a break of more than 14 days,','and paediatric dose increases']:['Applies at the first dose, on restart after a break of more than 14 days, and at paediatric dose increases'];
    ap.forEach((l,i)=>{s+=T(10,L.ap[i],l,'t-sm','fill:var(--ink)')});
    // axes
    s+=`<line x1="${L.x0}" y1="${L.cb}" x2="${L.x1}" y2="${L.cb}" class="axis"/><line x1="${L.tx0}" y1="${L.cb}" x2="${L.tx1}" y2="${L.cb}" class="axis"/>`;
    s+=`<path d="M${L.tx0-11} ${L.cb-6}l5 12M${L.tx0-6} ${L.cb-6}l5 12" style="stroke:var(--muted);stroke-width:1"/>`;
    for(let k=0;k<=8;k++){if(N&&k%2)continue;s+=T(X(k),L.cb+13,k+' h','t-xs t-mid')}
    s+=T(L.tx1,L.cb+13,'24 h','t-xs t-end');
    s+=`<text transform="translate(${L.x0-14} ${(L.ct+L.cb)/2}) rotate(-90)" class="t-xs t-mid">Heart rate (schematic)</text>`;
    // threshold
    const ty=Y(.62);s+=`<line x1="${L.x0}" y1="${f1(ty)}" x2="${L.tx1}" y2="${f1(ty)}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:5 4"/>`;
    s+=`<line x1="10" y1="${L.lgy-4}" x2="30" y2="${L.lgy-4}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:5 4"/>`+T(36,L.lgy,N?'45 bpm: adult threshold at 6 h (position schematic)':'45 bpm: the adult extension threshold at 6 h (line position schematic)','t-xs','fill:var(--bad)');
    // 6 h line
    s+=`<line x1="${f1(X(6))}" y1="${L.ct}" x2="${f1(X(6))}" y2="${L.cb}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`+T(X(6),L.ct-4,'6 h','t-xs t-mid','font-weight:700');
    // curve
    if(t>=.08){const hm=Math.min(h,24),seg=(a,b)=>{let d='';for(let i=0;i<=100;i++){const hh=lerp(a,b,i/100);d+=(i?'L':'M')+f1(X(hh))+' '+f1(Y(rel(hh)))}return `<path d="${d}" style="fill:none;stroke:var(--attack);stroke-width:2.6;stroke-linejoin:round"/>`};
      s+=seg(0,Math.min(hm,8));if(hm>8)s+=seg(8,hm);
      s+=`<circle cx="${f1(X(hm))}" cy="${f1(Y(rel(hm)))}" r="5" style="fill:var(--attack)"/>`}
    else s+=`<line x1="${L.x0}" y1="${f1(Y(1))}" x2="${L.x0+16}" y2="${f1(Y(1))}" style="stroke:var(--attack);stroke-width:2.6"/>`;
    if(h>19&&!N)s+=T(X(18),Y(rel(18))+16,N?'dip':'2nd dip','t-xs t-mid','fill:var(--attack)');
    // ECG markers
    const ecg=(x,on,lab)=>`<g style="opacity:${on?1:.3}"><rect x="${f1(x-20)}" y="${L.ecg-12}" width="40" height="18" rx="4" style="fill:var(--panel);stroke:var(--brand)"/><path d="M${f1(x-16)} ${L.ecg-3}h8l3 -6l3 10l3 -4h17" style="fill:none;stroke:var(--brand);stroke-width:1.4"/></g>`+T(x+26,L.ecg+2,lab,'t-xs',on?'fill:var(--ink)':'opacity:.5');
    s+=ecg(X(0)+20,true,N?'ECG before':'ECG before dosing')+ecg(X(6),h>=6,'ECG at 6 h');
    // hourly checks
    if(!N)s+=T(L.x0-4,L.hr+4,'Hourly','t-xs t-end');
    for(let k=1;k<=6;k++){const x=X(k),on=h>=k;s+=`<rect x="${f1(x-(N?15:22))}" y="${L.hr-9}" width="${N?30:44}" height="18" rx="9" style="fill:${on?'var(--brand-soft)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--line)'}"/>`+T(x,L.hr+3.5,on?(N?'✓':'✓ P, BP'):(N?k+'h':k+' h'),'t-xs t-mid',on?'fill:var(--brand);font-weight:700':'');
      if(on&&t>=.08)s+=`<circle cx="${f1(x)}" cy="${f1(Y(rel(k)))}" r="3.4" style="fill:var(--panel);stroke:var(--brand);stroke-width:1.6"/>`}
    // extension
    if(h>6){const ext=fg!=='typ',xe=X(Math.min(h,8));
      if(ext){s+=`<rect x="${f1(X(6))}" y="${L.ext-8}" width="${f1(Math.max(0,xe-X(6)))}" height="16" rx="4" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
        if(h>=8)s+=`<path d="M${f1(X(8))} ${L.ext}l10 0m-4 -4l4 4l-4 4" style="fill:none;stroke:var(--warn);stroke-width:1.6"/>`;
        s+=T(X(6)-6,L.ext+4,fg==='low'?(N?'below 45: extended':'Below 45 bpm at 6 h: extended'):(N?'still falling: extended':'Lowest rate at the end: extended'),'t-xs t-end','fill:var(--warn);font-weight:600')}
      else s+=T(X(6)-6,L.ext+4,N?'no extension criterion met':'No extension criterion met in this course','t-xs t-end','fill:var(--good);font-weight:600')}
    const ft=N?[ ['✓ = hourly pulse and blood pressure check',1],['Symptomatic bradycardia: 0.6% vs 0.1% placebo',0],['Heart rate back to baseline within a month',0],['Extension length is not given here: open-ended',1] ]:[ ['Symptomatic bradycardia 0.6% vs 0.1% on placebo. Heart rate returns to baseline within a month. Extension length not shown.',0] ];
    const fo=ramp(t,.84,.9);ft.forEach(([l,k],i)=>{s+=T(10,L.ft[i],l,'t-xs',`opacity:${f1(k?1:fo)}`)});
    fsv.innerHTML=s;
    const p=phaseOf(NS_FG,t);setFg(p);let P=NS_FG[p];
    if(p>=3&&fg!=='typ')P={...P,txt:P.txt+(fg==='low'?' In this course the heart rate is below 45 bpm at 6 hours, one of the label\'s extension criteria.':' In this course the lowest heart rate falls at the end of the 6 hours, one of the label\'s extension criteria.')};
    $('#nsFgNote').innerHTML=noteHTML(P);
  }
  const stopFg=playWire(fr,$('#nsFgPlay'),drawFg,16000,'Replay','nursing');
  const setFg=stepWire($('#nsFgSteps'),NS_FG,fr,drawFg,stopFg);
  $$('[data-ns-fg]').forEach(b=>b.addEventListener('click',()=>{fg=b.dataset.nsFg;$$('[data-ns-fg]').forEach(x=>pr(x,x===b));if(+fr.value<.76){stopFg();fr.value=.8}drawFg(+fr.value)}));

  /* =========== 2c self-injection cards =========== */
  $('#nsInjCards').innerHTML=`
   <div class="card"><h4>Glatiramer acetate</h4><p>Subcutaneous only. The label lists the arms, abdomen, hips and thighs for self-injection and says to let the syringe reach room temperature for about 20 minutes. The 20 mg/mL (daily) and 40 mg/mL (three times weekly, at least 48 hours apart) products are not interchangeable. [[CopaxoneLabel2026]]</p><p>On 20 mg/mL, injection-site erythema occurred in 43% (placebo 10%). An immediate post-injection reaction (at least two of flushing, chest pain, palpitations, tachycardia, anxiety, dyspnoea, throat constriction or urticaria) occurred in about 16% (placebo 4%); it usually starts months into treatment, within seconds to minutes of an injection, and the label notes its symptoms may overlap with anaphylaxis. Lipoatrophy (about 2%) is probably permanent; correct technique and site rotation may reduce it. [[CopaxoneLabel2026]]</p></div>
   <div class="card"><h4>Interferon beta-1a (SC)</h4><p>The label titrates from 20% of the target dose over 4 weeks and suggests dosing on the same three days each week at least 48 hours apart, preferably late afternoon or evening. Analgesics or antipyretics on dosing days may ease flu-like symptoms. [[RebifLabel2025]]</p><p>Injection-site reactions occurred in 92% at 44 mcg (placebo 39%) and necrosis in 3%; influenza-like symptoms in 59% (51%). The label advises against injecting into an affected area until it has healed. [[RebifLabel2025]]</p></div>
   <div class="card"><h4>Ofatumumab</h4><p>Self-injected into the abdomen, thigh or outer upper arm, avoiding moles, scars, stretch marks and tender, bruised, red, scaly or hard skin. The label states that the first injection should be done under healthcare-professional guidance. [[KesimptaLabel2026]]</p><p>Systemic injection reactions occurred in 21% (15% with teriflunomide plus placebo injections), most after the first injection (14.4%), falling to 4.4% after the second and under 3% after the third. [[KesimptaLabel2026]]</p><div class="hook"><b>Exam hook</b>Ofatumumab systemic injection reactions: 14.4% at injection 1, 4.4% at injection 2.</div></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Injection anxiety</h4><p>In 101 people starting weekly IM interferon, injection self-efficacy before treatment predicted adherence at 6 months, through the ability to self-inject. [[Mohr2001]] In a trial of 30 people unable to self-inject because of anxiety, 8 given a six-session nurse-administered programme self-injected at 6 weeks, against 3 controls (significant among completers, p=0.022; a trend by intention to treat, p=0.058). [[Mohr2005]]</p><div class="pt"><b>In plain words</b>Fear of needles is common and can stop treatment. In a small trial, nurse-led practice sessions helped some people inject themselves.</div></div>`;

  /* =========== 3 monitoring calendar =========== */
  const csv=$('#nsCalSvg'),cr=$('#nsCalT');let jcv='us';
  const range=(a,b,st=1)=>{const o=[];for(let m=a;m<=b+1e-9;m+=st)o.push(+m.toFixed(3));return o};
  const ROWS=()=>[
   {n:'Alemtuzumab',sh:'monthly labs; thyroid 3-monthly',dose:[ [0,'course 1'],[12,'course 2'] ],lab:range(1,48),sub:range(3,48,3),exam:[0,12,24,36,48],band:[ [0,2,'pro'],[12,14,'pro'] ],arrow:1,
    due:m=>[m>=1&&'alemtuzumab: CBC with differential, creatinine, urinalysis',m%3===0&&m>0&&'alemtuzumab: thyroid function',m%12===0&&'alemtuzumab: skin examination',(m===0||m===12)&&'alemtuzumab: course, with herpes prophylaxis'].filter(Boolean)},
   {n:'Cladribine',sh:'lymphocytes before each course',dose:[ [0,'course 1'],[12,'course 2'] ],lab:[2,6,14,18],sub:[],exam:[],band:[ [12,18,'win'],[24,48,'none'] ],
    due:m=>[m===0&&'cladribine: lymphocytes normal before course 1',m===12&&'cladribine: lymphocytes ≥800/µL before course 2',[2,6,14,18].includes(m)&&'cladribine: CBC after the course'].filter(Boolean)},
   {n:'Dimethyl fumarate',sh:'CBC at 6 months, then every 6–12',dose:[ [0,'start'] ],lab:[0,6],sub:[],exam:[],band:[ [6,48,'rng'] ],
    due:m=>[(m===0||m===6)&&'dimethyl fumarate: CBC with lymphocytes'].filter(Boolean)},
   {n:'Natalizumab',sh:'every 4 weeks; anti-JCV retests',dose:range(0,48,12/13).map(m=>[m,'']),lab:[],labS:jcv==='eu'?range(0,48,6):[0],sub:[],exam:[],band:jcv==='us'?[ [1,48,'q'] ]:[],obs:12,
    due:m=>[m<=10&&'natalizumab: infusion, 1 h observation (first 12)',m>10&&'natalizumab: infusion every 4 weeks',jcv==='eu'&&m%6===0&&'natalizumab: anti-JCV test (EMA 6-monthly)'].filter(Boolean)},
   {n:'Ocrelizumab',sh:'infection check every infusion',dose:[ [0,'300 mg twice, 2 weeks apart'],...range(6,48,6).map(m=>[m,'']) ],lab:[0],sub:[],exam:[],band:[],
    due:m=>[m===0&&'ocrelizumab: HBV, immunoglobulins, liver tests; 300 mg twice, 2 weeks apart',m>0&&m%6===0&&'ocrelizumab: infection check, then 600 mg'].filter(Boolean)},
   {n:'Teriflunomide',sh:'ALT monthly for 6 months',dose:[ [0,'start'] ],lab:[0,...range(1,6)],sub:[],exam:[],band:[],
    due:m=>[m===0&&'teriflunomide: transaminases and bilirubin (within 6 months before)',m>=1&&m<=6&&'teriflunomide: ALT'].filter(Boolean)},
   {n:'Fingolimod',sh:'first dose 6 h; eye exam 3–4 mo',dose:[ [0,'first dose'] ],lab:[],sub:[],exam:[0,3.5],band:[],
    due:m=>[m===0&&'fingolimod: VZV status, ECG, 6-hour first-dose monitoring, eye examination',(m===3||m===4)&&'fingolimod: fundus examination at 3–4 months'].filter(Boolean)}
  ];
  function drawCal(t){
    const N=vb(csv,'720 440','400 604');
    const L=N?{x0:16,x1:384,hd:[20,36],ax:66,r0:88,rh:64,nm:0,sh:14,tr:31,sb:43,lg:[556,572,588],mr:2.1,lw:1}
             :{x0:206,x1:700,hd:[24],ax:56,r0:74,rh:46,nm:4,sh:18,tr:8,sb:20,lg:[412,428],mr:2.6,lw:1.4};
    const X=m=>L.x0+m/48*(L.x1-L.x0),cm=t*48,R=ROWS();
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N)s+=T(10,L.hd[0],'Months from starting, 0 to 48','t-lbl')+T(10,L.hd[1],'(schematic calendar from the US labels)','t-xs');
    else s+=T(10,L.hd[0],'Months from starting, 0 to 48 (schematic calendar from the US labels)','t-lbl');
    const vbands=N?R.map((_,i)=>[L.r0+i*L.rh+L.tr-13,L.r0+i*L.rh+L.sb+5]):[ [L.ax+4,L.r0+R.length*L.rh-10] ];
    for(let m=0;m<=48;m+=6){if(N&&m%12)continue;vbands.forEach(([a,b])=>{s+=`<line x1="${f1(X(m))}" y1="${a}" x2="${f1(X(m))}" y2="${b}" class="grid"/>`});s+=T(X(m),L.ax,m,'t-xs t-mid')}
    const op=m=>m<=cm+1e-6?1:.22;
    R.forEach((r,i)=>{const y0=L.r0+i*L.rh,ty=y0+L.tr,sy=y0+L.sb;
      if(N){s+=T(10,y0+L.nm,r.n,'t-lbl')+T(10,y0+L.sh,r.sh,'t-xs')}
      else{s+=T(10,y0+L.nm+4,r.n,'t-lbl')+T(10,y0+L.sh,r.sh,'t-xs')}
      s+=`<line x1="${L.x0}" y1="${ty}" x2="${L.x1}" y2="${ty}" class="axis"/>`;
      r.band.forEach(([a,b,k])=>{const o=op(a);
        const st=k==='pro'?'fill:var(--gold-soft);stroke:var(--gold)':k==='win'?'fill:none;stroke:var(--rx);stroke-dasharray:3 3':k==='none'?'fill:var(--panel-2);stroke:var(--line)':k==='rng'?'fill:var(--brand-soft);stroke:var(--brand);stroke-dasharray:2 2':'fill:none;stroke:var(--brand);stroke-dasharray:1 4;stroke-width:2';
        const yy=k==='pro'?ty+3:k==='q'?sy-3:ty-6,hh=k==='pro'?5:k==='q'?6:12;
        s+=`<rect x="${f1(X(a))}" y="${yy}" width="${f1(X(b)-X(a))}" height="${hh}" rx="3" style="${st};opacity:${f1(o)}"/>`;
        const lab=k==='none'?(N?'no cladribine, years 3–4':'no cladribine in years 3 and 4'):k==='rng'?(N?'CBC every 6–12 months':'CBC every 6–12 months'):k==='q'?'anti-JCV: retest "periodically" (no interval given)':k==='win'?'':'';
        if(lab)s+=T((X(a)+X(b))/2,k==='q'?sy+13:ty+3.5,N&&k==='q'?'anti-JCV: "periodically"':lab,'t-xs t-mid',`opacity:${f1(Math.max(.45,o))};fill:var(--ink)`)});
      if(r.obs){const xe=X(11*12/13+.3);s+=`<rect x="${f1(X(0)-2)}" y="${ty-8}" width="${f1(xe-X(0)+4)}" height="16" rx="4" style="fill:none;stroke:var(--warn);stroke-width:1.2;opacity:${f1(op(0))}"/>`}
      r.lab.forEach(m=>{const o=op(m),pop=m<=cm&&cm-m<1?1+.6*(1-(cm-m)):1;s+=`<circle cx="${f1(X(m))}" cy="${ty}" r="${f1(L.mr*pop*(r.n==='Alemtuzumab'?1:1.25))}" style="fill:var(--brand);opacity:${f1(o)}"/>`});
      (r.labS||[]).forEach(m=>{const o=op(m);s+=`<circle cx="${f1(X(m))}" cy="${sy}" r="${f1(L.mr*1.25)}" style="fill:var(--brand);opacity:${f1(o)}"/>`});
      r.sub.forEach(m=>{const o=op(m),x=X(m);s+=`<path d="M${f1(x)} ${sy-3}l3.2 6h-6.4z" style="fill:var(--good);opacity:${f1(o)}"/>`});
      r.exam.forEach(m=>{const o=op(m),x=X(m);s+=`<rect x="${f1(x-3.5)}" y="${ty-13}" width="7" height="7" style="fill:var(--gold);opacity:${f1(o)}"/>`});
      r.dose.forEach(([m,lab])=>{const o=op(m),x=X(m),sz=r.n==='Natalizumab'?2.6:5;s+=`<path d="M${f1(x)} ${f1(ty-sz)}l${sz} ${sz}l${-sz} ${sz}l${-sz} ${-sz}z" style="fill:var(--rx);opacity:${f1(o)}"/>`;
        if(lab&&!N&&r.n!=='Fingolimod')s+=T(x+8,ty-6,lab,'t-xs','opacity:'+f1(Math.max(.5,o)))});
      if(r.arrow){s+=`<path d="M${f1(L.x1-2)} ${ty-5}l6 5l-6 5" style="fill:none;stroke:var(--brand);stroke-width:1.5;opacity:${f1(op(48))}"/>`;
        s+=T(L.x1,sy+(N?11:12),N?'to 48 months after the last infusion':'continues to 48 months after the last infusion','t-xs t-end','opacity:'+f1(Math.max(.5,op(40))))}});
    // playhead
    const px=X(cm);vbands.forEach(([a,b])=>{s+=`<line x1="${f1(px)}" y1="${N?a:a+2}" x2="${f1(px)}" y2="${b}" style="stroke:var(--ink);stroke-width:1.5;opacity:.7"/>`});
    const pc=clamp(px,L.x0+14,L.x1-14);s+=`<rect x="${f1(pc-24)}" y="${L.ax-26}" width="48" height="16" rx="8" style="fill:var(--ink)"/>`+T(pc,L.ax-14,'m '+Math.floor(cm+1e-6),'t-xs t-mid','fill:var(--bg);font-weight:700');
    // legend
    const lg=N?['◆ dose or course   ● lab check   ▲ thyroid   ■ exam','▭ prophylaxis or window   ▨ no treatment','Natalizumab box: 1 h observation, first 12 infusions']
             :['◆ dose or course   ● lab check   ▲ thyroid function   ■ examination   ▭ herpes prophylaxis or delay window   ▨ no treatment','Natalizumab: small diamonds every 4 weeks; the outlined box marks the first 12 infusions, each with 1 h observation'];
    lg.forEach((l,i)=>{s+=T(10,L.lg[i],l,'t-xs')});
    csv.innerHTML=s;
    const mi=Math.floor(cm+1e-6),due=[].concat(...R.map(r=>r.due(mi)));
    $('#nsCalRead').innerHTML=`<span><b>Month ${mi}</b></span><span>${due.length?due.join(' · '):'no scheduled check in this teaching calendar'}</span>`;
    const p=phaseOf(NS_CAL,t);setCal(p);$('#nsCalNote').innerHTML=noteHTML(NS_CAL[p]);
  }
  const stopCal=playWire(cr,$('#nsCalPlay'),drawCal,24000,'Replay','nursing');
  const setCal=stepWire($('#nsCalSteps'),NS_CAL,cr,drawCal,stopCal);
  $$('[data-ns-jcv]').forEach(b=>b.addEventListener('click',()=>{jcv=b.dataset.nsJcv;$$('[data-ns-jcv]').forEach(x=>pr(x,x===b));drawCal(+cr.value)}));

  /* =========== 4 methylprednisolone =========== */
  let mpd=1;
  function mp(){const min=+$('#nsMpMin').value;$('#nsMpMinV').textContent=min+' min';
    const rapid=mpd>.5&&min<10;
    $('#nsMpOut').innerHTML=`<div class="kicker">Rate</div><div class="big">${f1(mpd*1000/min)} mg/min</div>
    <div class="verdict ${rapid?'no':'yes'}">${rapid?'Inside the label\'s rapid-administration description':'Outside the label\'s rapid-administration description'}</div>
    <p>The SOLU-MEDROL label reports arrhythmias and cardiac arrest after rapid IV administration of large doses, more than 0.5 g over less than 10 minutes. It also reports bradycardia unrelated to infusion speed. [[SoluMedrolLabel2026]] ${mpd===1?'NICE describes IV methylprednisolone 1 g daily for 3–5 days as the IV alternative. [[NICE2022]]':'NICE\'s oral regimen is 0.5 g daily for 5 days. [[NICE2022]]'}</p>`}
  $('#nsMp').addEventListener('click',e=>{const b=e.target.closest('[data-ns-mpd]');if(!b)return;mpd=+b.dataset.nsMpd;$$('[data-ns-mpd]').forEach(x=>pr(x,x===b));mp()});
  $('#nsMpMin').addEventListener('input',mp);mp();
  $('#nsMpCards').innerHTML=`
   <div class="card"><h4>The NICE regimens</h4><p>Oral methylprednisolone 0.5 g daily for 5 days. IV methylprednisolone 1 g daily for 3–5 days is the alternative when oral steroids have failed or are not tolerated, or when admission is needed for a severe relapse or to monitor conditions such as diabetes or depression. Treatment is offered as early as possible and within 14 days of onset. [[NICE2022]]</p><div class="hook"><b>Exam hook</b>NICE: oral MP 0.5 g × 5 days first; IV 1 g × 3–5 days as the alternative; within 14 days of onset.</div></div>
   <div class="card"><h4>What people are told</h4><p>NICE asks that people be told about temporary mental-health effects (insomnia, depression, confusion, agitation) and worse glucose control in diabetes, and be given written information. It recommends against supplying steroids for people to treat future relapses themselves. [[NICE2022]] The label describes psychiatric effects from euphoria and insomnia to severe depression and psychosis, raised blood glucose, and rare toxic hepatitis, sometimes weeks later, after pulsed 1 g/day courses for MS relapse. [[SoluMedrolLabel2026]]</p></div>
   <div class="card"><span class="ev early">Controversy</span><h4>Oral or IV, and what steroids do</h4><p>A Cochrane review of 6 trials found methylprednisolone or ACTH protective against worsening within 5 weeks (OR 0.37), with too few data on later relapses or long-term disability. [[Filippini2000]] Oral and IV gave similar recovery at 4 weeks in a Cochrane review of 5 trials. [[Burton2012]] In COPOUSEP, 81% (oral) vs 80% (IV) improved by day 28; insomnia was more frequent with oral treatment (77% vs 64%). Some services still default to IV. [[LePage2015]]</p><div class="pt"><b>In plain words</b>Steroids can speed recovery from a relapse over the next few weeks. Tablets worked as well as a drip in the trials, but they did not change the long-term course.</div></div>`;

  /* =========== 5a relapse sorter =========== */
  const RQ=[ {n:'New or worsening symptoms lasting more than 24 hours?',o:[ ['yes','Yes'],['no','No'] ],d:'yes'},
   {n:'Infection, fever or another cause found?',o:[ ['unk','Not yet checked'],['yes','Yes'],['no','Ruled out'] ],d:'unk'},
   {n:'Stable for at least 1 month before this?',o:[ ['yes','Yes'],['no','No'] ],d:'yes'},
   {n:'Symptoms present for more than 3 months?',o:[ ['no','No'],['yes','Yes'] ],d:'no'} ];
  const rsel=RQ.map(q=>q.d);
  $('#nsRel').innerHTML=RQ.map((q,i)=>`<div class="ns-qi"><span id="nsRq${i}">${i+1} · ${q.n}</span><div class="ctrls" role="group" aria-labelledby="nsRq${i}">${q.o.map(([v,l])=>`<button class="btn" data-rq="${i}" data-v="${v}" aria-pressed="${v===q.d}">${l}</button>`).join('')}</div></div>`).join('');
  function rel2(){
    let cls='yes',h='',body='';
    if(rsel[0]==='no'){cls='no';h='Not a relapse by this definition';body='NICE requires new or worsening symptoms lasting more than 24 hours. [[NICE2022]] The 2010 McDonald panel counted paroxysmal symptoms only as multiple episodes over at least 24 hours. [[Polman2011]]'}
    else if(rsel[1]==='unk'){cls='maybe';h='Infection comes first';body='Before diagnosing a relapse, NICE asks for infection, particularly urinary and respiratory, to be ruled out, and for a relapse to be told apart from fluctuation or progression. [[NICE2022]] Screened at a suspected relapse, 30.4% of inpatients and 20.0% of outpatients in one centre had a possible urinary infection. [[Fitzgerald2019]]'}
    else if(rsel[1]==='yes'){cls='maybe';h='NICE\'s definition is not met';body='NICE\'s definition requires the absence of infection or another cause. [[NICE2022]] A temporary worsening of old symptoms without new inflammation is often called a pseudo-relapse; NICE notes that heat and biological, physical or emotional stress can bring on MS fatigue. [[NICE2022]] Infection and relapse can also coexist: exacerbation risk was raised 2.1-fold from 2 weeks before to 5 weeks after a systemic infection. [[Buljevac2002]]'}
    else if(rsel[2]==='no'){cls='maybe';h='The stability requirement is not met';body='NICE\'s definition needs at least 1 month of stability before the new or worsening symptoms. [[NICE2022]]'}
    else if(rsel[3]==='yes'){cls='maybe';h='Present for more than 3 months';body='NICE says a relapse should not routinely be diagnosed when symptoms have been present for more than 3 months. [[NICE2022]]'}
    else{h='Fits NICE\'s description of a relapse';body='More than 24 hours, no infection or other cause, after at least 1 month of stability. NICE also asks for relapse to be told apart from fluctuation or progression, and for the MS multidisciplinary team to be told about every relapse, because relapse frequency may influence DMT choice. [[NICE2022]]'}
    $('#nsRelOut').innerHTML=`<div class="kicker">What the definition says</div><div class="verdict ${cls}">${h}</div><p>${body}</p><div class="pt"><b>In plain words</b>A day or two of feeling worse in the heat, or with a bladder infection, is often the old symptoms flaring, not new damage. That is why infection is checked first.</div>`}
  $('#nsRel').addEventListener('click',e=>{const b=e.target.closest('[data-rq]');if(!b)return;const i=+b.dataset.rq;rsel[i]=b.dataset.v;$$(`#nsRel [data-rq="${i}"]`).forEach(x=>pr(x,x===b));rel2()});
  rel2();

  /* =========== 5b myths =========== */
  $('#nsMyths').innerHTML=NS_MYTHS.map((m,i)=>`<div><button class="ns-myth" aria-expanded="false" aria-controls="nsMa${i}" data-my="${i}"><small>Misunderstanding</small><b>“${m.m}”</b></button><div class="ns-ans" id="nsMa${i}" hidden>${m.a}</div></div>`).join('');
  $('#nsMyths').addEventListener('click',e=>{const b=e.target.closest('[data-my]');if(!b)return;const o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);$('#nsMa'+b.dataset.my).hidden=!o});

  /* =========== 5c teaching cards =========== */
  $('#nsTeachCards').innerHTML=`
   <div class="card"><h4>Heat</h4><p>In a Swiss registry survey of 760 people, 73.3% reported temperature sensitivity, most often to heat. Of those who were heat-sensitive and knew of cooling methods, only 44.3% used them. [[Iaquinto2026]] NICE notes that MS fatigue may be brought on by heat. [[NICE2022]]</p></div>
   <div class="card"><h4>Infection signs</h4><p>NICE recommends explaining that symptom changes can come from another illness such as infection, a relapse or a change in disease course, and giving a plan that says whom to contact. [[NICE2022]] The natalizumab label describes PML symptoms progressing over days to weeks: one-sided weakness or clumsiness, visual disturbance, and changes in thinking, memory and orientation. [[TyrukoLabel2025]] The alemtuzumab label asks for patients to be taught stroke symptoms. [[LemtradaLabel2025]]</p></div>
   <div class="card"><h4>Vaccines</h4><p>The AAN guideline recommends following local vaccine standards with yearly influenza vaccine, vaccinating at least 4–6 weeks before starting immunosuppressive or immunomodulating therapy, avoiding live-attenuated vaccines during such therapy, and delaying vaccination during a relapse. [[Farez2019]] Anti-CD20 labels exclude live vaccines until B cells recover. [[OcrevusLabel2026]]</p></div>
   <div class="card"><h4>Pregnancy planning</h4><p>The 2026 UK consensus puts family planning into treatment choice, describes antibody transfer into breast milk as generally low, and vaccines in pregnancy as generally safe. [[Mullan2026]] Label contraception windows: 2 months after fingolimod [[GilenyaLabel2026]], 6 months after ofatumumab [[KesimptaLabel2026]], 6 months (women) or 14 weeks (men) after each cladribine course [[MavencladLabel2026]], and for teriflunomide during treatment and accelerated elimination. [[AubagioLabel2026]]</p></div>
   <div class="card"><h4>After stopping a DMT</h4><p>After stopping fingolimod, the label reports severe increases in disability with multiple new MRI lesions, usually within 12 weeks. [[GilenyaLabel2026]] Without accelerated elimination, the label says teriflunomide plasma levels take on average 8 months, and up to 2 years, to fall below 0.02 mg/L; cholestyramine or activated charcoal for 11 days lowers levels by more than 98%. [[AubagioLabel2026]]</p><div class="hook"><b>Exam hook</b>Fingolimod rebound: usually within 12 weeks of stopping, up to 24.</div></div>
   <div class="card"><h4>Adherence</h4><p>Reported DMT adherence ranged from 41% to 88% across 24 studies. [[Menzin2013]] Pooled 1-year adherence to daily oral DMTs was 78.5% by MPR and 71.8% by PDC, with 25.4% discontinuing. [[Nicholas2020]] Depression was associated with lower adherence (OR 0.618). [[Munsell2017]] The AAN guideline includes monitoring adherence and engaging patients among its 30 recommendations. [[RaeGrant2018]]</p></div>
   <div class="card"><h4>Exercise, smoking and fatigue</h4><p>NICE recommends telling people that regular exercise may benefit MS and does not harm it, and advising against smoking because it increases disability progression. For fatigue it recommends a personalised self-management discussion and aerobic, resistance and balance exercise, and advises against vitamin B12 injections and hyperbaric oxygen. [[NICE2022]]</p><p><span class="ev early">Controversy</span> Energy conservation helped in the short term in 2 pooled trials [[Blikman2013]] but was no better than nurse-given fatigue information in an 86-person trial. [[Blikman2017]]</p></div>`;

  /* =========== 6 documentation =========== */
  $('#nsDoc').innerHTML=NS_DOC.map((g,gi)=>`<h5>${g.g}</h5>`+g.items.map((it,i)=>`<label><input type="checkbox" data-doc="${gi}-${i}"><span>${it}</span></label>`).join('')).join('');
  function doc(){const lines=[];NS_DOC.forEach((g,gi)=>{const ticked=g.items.filter((_,i)=>$(`#nsDoc [data-doc="${gi}-${i}"]`).checked);if(ticked.length){lines.push(g.g.replace(/<sup[^>]*>.*?<\/sup>/g,'').trim().toUpperCase());ticked.forEach(x=>lines.push('  - '+x+': ________'))}});
    $('#nsDocOut').textContent=lines.length?'MS contact: outline (fictional)\n\n'+lines.join('\n'):'Tick items on the left to build an outline.'}
  $('#nsDoc').addEventListener('change',doc);
  $('#nsDocAll').onclick=()=>{$$('#nsDoc input').forEach(x=>x.checked=true);doc()};
  $('#nsDocNone').onclick=()=>{$$('#nsDoc input').forEach(x=>x.checked=false);doc()};
  doc();

  /* =========== 7 the MS nurse =========== */
  const CASE=[ ['Sustainable caseload now used by the MS Trust',315,''],['Earlier recommended caseload, judged too high',358,''],['Observed UK mean caseload, 2021',472,'w'] ];
  $('#nsCase').innerHTML=CASE.map(([l,v,c])=>`<div><span>${l}</span><s><i class="${c}" data-w="${f1(v/500*100)}"></i></s><b>${v}</b></div>`).join('');
  const fillCase=()=>requestAnimationFrame(()=>$$('#nsCase i').forEach(i=>i.style.width=i.dataset.w+'%'));
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){fillCase();io.disconnect()}});io.observe($('#nsCase'))}else fillCase();
  $('#nsRoleCards').innerHTML=`
   <div class="card"><h4>The team NICE describes</h4><p>A single point of contact who knows MS services, and care through a coordinated multidisciplinary team that includes MS nurses, neurologists, physiotherapists, occupational therapists, speech and language therapists, psychologists, dietitians, continence specialists, MS pharmacists, rehabilitation consultants, social care and primary care. NICE recommends a face-to-face follow-up within 6 weeks of diagnosis and a comprehensive review at least once a year, which people can ask for. [[NICE2022]]</p></div>
   <div class="card"><h4>What the role covers</h4><p>An international review describes MS nurses helping people understand the disease and treatment options, supporting treatment start and management, and encouraging adherence; it predicted oral therapies would add drug-specific monitoring. [[Burke2011]] A proposal for MS Care Units puts neurologists and nurses at the core, working to formal protocols for starting and following DMTs. [[SoelbergSorensen2019]] MS Nurse PRO is a free, accredited European e-learning curriculum started in 2012. [[EMSP_MSNursePRO]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Workforce</h4><p>Of 163 UK MS specialist nurses, 83.4% regularly worked unpaid overtime; psychological support, physical assessments and benefits support were most often left undone. [[Punshon2021]] The 2021 mapping survey counted 360 nurses (298 whole-time) and estimated that 79% of people with MS lived in areas above the sustainable caseload, a shortfall of 149 whole-time nurses. [[MSTrust2021]] A 2026 scoping review mapped 12 studies of nurse-led digital interventions with associations, not pooled effects, on self-management, adherence and fatigue. [[Azzellino2026]]</p></div>
   <div class="card"><h4>The evidence gap</h4><p>No randomised trial or pooled systematic review isolating the effect of MS specialist nurses on relapses, admissions or disability was found. The case for the role rests mainly on workforce surveys, service evaluations and descriptive reviews. [[Punshon2021,MSTrust2021,Azzellino2026]]</p><div class="pt"><b>In plain words</b>MS nurses are the people who explain, check, teach and coordinate. Nobody has yet run a trial that measures how much they change hard outcomes.</div></div>`;
  $('#nsGaps').innerHTML=`
   <li>No trial isolating the effect of MS specialist nurses on relapses, admissions or disability. [[Punshon2021,MSTrust2021]]</li>
   <li>No MS-specific nursing documentation standard found; the checklist above comes from NICE and the labels.</li>
   <li>No MS-specific trial of nursing contracture-prevention methods such as positioning or stretching programmes.</li>
   <li>Not confirmed from the sources read: the FSS item structure, the MFIS 21-item 0–84 structure, the Modified Ashworth grade set, and the 100 mL post-void residual threshold. [[Learmonth2013,Larson2013,Bohannon1987,Fowler2009]]</li>
   <li>Whether depression screening improves outcomes is unsettled. [[Marrie2018,Patten2010]]</li>
   <li>How common the belief that every new symptom is a relapse is: no citable source.</li>`;

  /* ---- first paint ---- */
  drawAs(+ar.value);setView('ocr');drawFg(+fr.value);drawCal(+cr.value);
};
