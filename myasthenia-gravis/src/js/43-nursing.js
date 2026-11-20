/* =============== 4.3 Nursing care =============== */
/* hours are counted from 07:00 (h = 0) to 07:00 the next morning (h = 24) */
const NU_STEPS=[
 {from:0,at:.02,k:'07:00 · Admission',t:'Baseline strength and breathing',
  txt:'Myaware\'s guidance for nurses asks for a baseline respiratory measurement on admission, forced vital capacity (FVC) at least four times a day when the breathing muscles are involved, and a recheck after any change. The single breath count is the bedside companion: a deep breath, then counting aloud at about 2 counts a second, seated, best of 2 attempts. In 31 people with AChR-antibody MG it correlated with FVC (r = 0.554), inspiratory force (r = 0.530) and neck flexor strength (r = 0.519). [[MyawareNurses,Elsheikh2016]]',
  pt:'At the start of the shift the nurse writes down how strong the breathing and swallowing are, so that any change later is easy to see.',
  hook:'The MG Core Exam scores the breath count 0 (30 or more), 1 (25 to 29), 2 (20 to 24) or 3 (under 20). Ptosis is scored after <b>60 seconds of upgaze</b>. [[Guidon2021]]'},
 {from:.2,at:.22,k:'Doses on time',t:'Before meals, within 30 minutes',
  txt:'Pyridostigmine usually starts working in 30 to 60 minutes, so NHS Scotland\'s guidance places doses about 30 to 60 minutes before meals, the first on rising. A London medicines-safety bulletin calls it a critical medicine to be given within 30 minutes of the due time, even when that does not match the ward round, because a late dose can cause excessive weakness or inability to swallow. Press the late-dose button to see what a 90-minute delay does to breakfast and lunch. [[RightDecisionsPyrido2025,KHP2025]]',
  pt:'The tablet needs about half an hour to an hour to work, so it is given before food. A late tablet can mean the person cannot chew or swallow the meal.',
  hook:'The "time-critical" status rests on NHS safety documents and charity guidance. <b>No study has measured the outcomes of late or missed doses in hospital.</b> [[KHP2025,RightDecisionsPyrido2025]]'},
 {from:.45,at:.5,k:'Watch',t:'Breathing, swallowing, speech',
  txt:'In 42 people with severe MG, ventilation was unlikely while vital capacity stayed above 20 mL/kg, maximal inspiratory pressure more negative than -40 cmH2O and maximal expiratory pressure above 40 cmH2O; a fall of 30% or more in inspiratory pressure marked higher risk. Swallowing needs the same attention: of 20 people with MG given a barium swallow, 7 aspirated and 4 of them silently. [[Thieben2005,Koopman2004]]',
  pt:'The nurse keeps checking breathing, swallowing and the voice through the day, because MG weakness can creep up quietly.',
  hook:'One small ICU series found repeated vital capacity did not separate the episodes that needed ventilation, so the <b>trend and the whole picture</b> matter more than any single number. [[Rieder1995,McKenzie2024]]'},
 {from:.72,at:.8,k:'Escalate',t:'Trend, thresholds, who is told',
  txt:'A review of neuromuscular respiratory failure says no single tool predicts it well and prefers a combined assessment: history, single breath count, neck flexion, bulbar weakness, paradoxical breathing and lung function, measured serially. The consensus defines manifest crisis as worsening that needs intubation, or noninvasive ventilation to avoid intubation. [[McKenzie2024,Sanders2016]]',
  pt:'If the numbers keep falling or swallowing gets worse, the nurse calls for help early rather than waiting for a crisis.',
  hook:'The well-known "20/30/40" rule (VC 20 mL/kg, inspiratory pressure 30, expiratory pressure 40) comes from Guillain-Barré syndrome. <b>No MG-specific validation of the full rule was found</b> in the sources read. [[Lawn2001,Vianello2022]]'}
];
const NU_MEALS=[[1.25,'Breakfast'],[5.5,'Lunch'],[10.5,'Evening meal']];
const NU_DOSES=[{h:.5,d:3.5},{h:4.75,d:3.5},{h:9.75,d:3.5},{h:15,d:6}];
const NU_KIND={S:['var(--nerve)','breath count, FVC'],P:['var(--ab)','ptosis after dose'],W:['var(--musk)','swallow'],C:['var(--achr)','pre-infusion']};
const NU_RUNGS=[['var(--good)','var(--good-soft)','Baseline and trend'],['var(--warn)','var(--warn-soft)','A change: recheck, tell the team'],['var(--ab)','var(--ab-soft)','Near thresholds: urgent review'],['var(--bad)','var(--bad-soft)','Ventilatory support']];
const NU_INF={
 ivig:{n:'IVIG',s:2.5,e:6.5,lab:'IVIG infusion · schematic length',win:'aseptic meningitis watch: hours to 2 days →',
  pre:'IVIG carries a boxed warning for thrombosis, renal dysfunction and acute renal failure. Risk factors include older age, immobility, hypercoagulable states, previous thrombosis and oestrogen use; for people at risk the label asks for the lowest practicable dose and rate, good hydration, and monitoring. It suggests haemoglobin before the infusion in higher-risk patients. The consensus adds that IVIG cannot be used in renal failure. [[FDAGamunexC2026,Sanders2016]]',
  run:'The Gamunex-C label (written for immunodeficiency; it lists no MG indication) starts at 1 mg/kg/min and steps up as tolerated to at most 8 mg/kg/min. Most reactions, such as flushing, headache, malaise, fever and chills, are mild and pass; slower infusion and premedication reduce them. [[FDAGamunexC2026,Guo2018]]',
  post:'Aseptic meningitis usually starts within several hours to 2 days, more often after 2 g/kg or a fast infusion. Haemolysis is more likely at 2 g/kg or more and in non-O blood groups, so the label suggests haemoglobin again at about 36 hours and at 7 to 10 days in higher-risk patients. Lung injury (TRALI) and fluid overload are also listed. [[FDAGamunexC2026]]'},
 plex:{n:'Plasma exchange',s:2.5,e:4.5,lab:'Plasma exchange · schematic length',win:'',
  pre:'Plasma exchange cannot be used in sepsis. In a prospective cohort of 42 people, 83% completed it through peripheral veins and 90% were treated as outpatients. In a review of 230 courses, central lines brought more complications (68% vs 35%) and more serious ones (41% vs 4%), including 2 deaths. [[Sanders2016,Ebadi2013,Guptill2013]]',
  run:'In that prospective cohort 55% had no complications and 45% had mild to moderate reactions, mostly citrate reactions and vein problems. Low calcium and low blood pressure during exchange are widely taught, but MG-specific rates for them could not be verified for this page. [[Ebadi2013]]',
  post:'Without other immunotherapy the effect lasts only a few weeks, according to the German guideline. The consensus calls IVIG and plasma exchange probably equally effective in severe generalised MG, and says exchange may work better in MuSK MG. [[Wiendl2023,Sanders2016]]'},
 c5:{n:'C5 inhibitor',s:2.5,e:2.5+35/60,mon:1,lab:'eculizumab 35 min + 1 h watch',win:'REMS card carried →',
  pre:'Eculizumab, ravulizumab and zilucoplan carry boxed warnings for serious meningococcal infection. Vaccination against serogroups A, C, W, Y and B is completed or updated at least 2 weeks before the first dose, or antibiotics are given if treatment is urgent, and each drug is available only through a REMS programme. The eculizumab label material asks for vaccination dates, any prophylactic antibiotics and the issue of the REMS card to be recorded. [[FDASoliris2026,FDAUltomiris2025,FDAZilbrysq2026,Narayanaswami2021]]',
  run:'Eculizumab runs IV over 35 minutes in adults (1 to 4 hours in children). If it is slowed, the total time should not exceed 2 hours in adults. The patient is monitored for at least 1 hour afterwards. [[FDASoliris2026]]',
  post:'The REMS card lists fever, headache with a stiff neck, rash, light sensitivity and confusion as reasons to seek immediate medical evaluation. It is carried for 3 months after the last eculizumab dose, 8 months after ravulizumab and 2 months after zilucoplan. Vaccination is not complete protection: one vaccinated patient developed meningococcal meningitis in the REGAIN extension. For penicillin-allergic patients needing prophylaxis, the guidance notes that macrolides and fluoroquinolones can worsen MG. [[FDASoliris2026,FDAUltomiris2025,FDAZilbrysq2026,Narayanaswami2021]]'},
 fcrn:{n:'FcRn blocker',s:2.5,e:3.5,lab:'efgartigimod IV · 1 h',win:'no live vaccines during treatment →',
  pre:'Efgartigimod IV is 10 mg/kg (1,200 mg at 120 kg or more) once a week for 4 weeks per cycle, with further cycles on clinical review. FcRn blockers lower IgG, so live vaccines are not recommended during treatment and the labels ask for an immunisation review before each cycle. None of them needs meningococcal vaccination. [[FDAVyvgart2026,FDARystiggo2026,FDAImaavy2026]]',
  run:'Efgartigimod IV runs over 1 hour. The subcutaneous form with hyaluronidase comes as a 1,000 mg prefilled syringe given over about 20 to 30 seconds, which patients or carers can self-inject. Rozanolixizumab is given by a clinician with a subcutaneous pump at up to 20 mL/h, weekly for 6 weeks. [[FDAVyvgart2026,FDAVyvgartHytrulo2026,FDARystiggo2026]]',
  post:'The rozanolixizumab label warns of aseptic meningitis. The IgG fall reverses after a cycle ends. Because maternal IgG falls too, the efgartigimod label anticipates less passive immunity in a baby exposed in pregnancy. [[FDARystiggo2026,FDAVyvgart2026]]'}
};
const NU_SC={
 postop:{n:'Day after thymectomy',
  sbc:[[0,26],[4,27],[8,25],[12,24],[14,25],[16,26],[20,26],[24,26]],
  chk:[[0,'S'],[4,'S'],[8,'S'],[12,'S'],[14,'S'],[16,'S'],[20,'S'],[1,'W']],
  rung:h=>h>=12&&h<14?1:0, lid:h=>.42, neck:h=>.72,
  swal:h=>h<1?'not yet screened':'screened before oral intake',
  ev:[
   {h:0,t:'Handover and baseline',d:'A meta-analysis of 15 studies and 2,626 patients found crisis after thymectomy more likely with a previous crisis (RR 3.36), bulbar symptoms (RR 3.59), thymoma (RR 2.10), postoperative complications (RR 2.59) and higher pyridostigmine doses. High-dose steroids went with less crisis (RR 0.41). The baseline is what every later check is compared against. [[Geng2020,MyawareNurses]]'},
   {h:.5,t:'First dose, by tube if nil by mouth',d:'NHS Scotland\'s Q&A makes the nasogastric route the preferred option for a patient who is nil by mouth. The oral solution is licensed for NG and PEG tubes (not latex tubes), and immediate-release tablets can be crushed to a fine powder and mixed with at least 10 mL of water. Myaware says the medicine should never be withheld because the patient is nil by mouth. [[RightDecisionsPyrido2025,MyawareNurses]]'},
   {h:1,t:'Swallow screen before anything by mouth',d:'Of 20 people with MG who had a modified barium swallow, 7 aspirated and 4 of those did so silently. A patient questionnaire, the neurologist\'s prediction and the QMG bulbar subscore all correlated with aspiration; the bedside speech-therapy prediction was highly sensitive but less specific. [[Koopman2004]]'},
   {h:5.08,t:'Ptosis check 20 minutes after the lunchtime dose',d:'Myaware suggests checking ptosis or double vision about 20 minutes after a dose and documenting the response. The nursing pharmacology text calls ease of eyelid raising an important sign of improvement. [[MyawareNurses,OpenStaxPharmNurses]]'},
   {h:12,t:'The count dips to 24',d:'Some people have a low count with near-normal FVC, possibly from vocal-cord or bulbar weakness, so the count is read alongside FVC, neck flexion and swallowing. Myaware asks for a recheck after any change, and here the next count recovers. [[Elsheikh2016,MyawareNurses]]'},
   {h:15,t:'Bedtime dose',d:'By day a dose usually lasts 3 to 4 hours, and a bedtime dose about 6 hours. The extended-release Timespan 180 mg tablet acts at first about like 60 mg and lasts on average 2.5 times as long, with doses at least 6 hours apart. [[RightDecisionsPyrido2025,FDAMestinon2020]]'},
   {h:20,t:'Night check, position recorded',d:'The published method is seated, best of 2 attempts. The authors note that testing lying down might reveal more weakness, so the position goes in the notes with the count. [[Elsheikh2016]]'}
  ]},
 crisis:{n:'Crisis watch',
  sbc:[[0,24],[3,23],[6,22],[9,20],[12,18],[15,17],[18,15],[21,14],[24,14]],
  chk:[[0,'S'],[3,'S'],[6,'S'],[9,'S'],[12,'S'],[15,'S'],[18,'S'],[21,'S'],[1,'W'],[5.25,'W'],[10.25,'W']],
  rung:h=>h<3?0:h<9?1:h<18?2:3, lid:h=>.45+.3*ramp(h,0,18), neck:h=>.7-.5*ramp(h,0,18),
  swal:h=>h<1?'not yet screened':h<9?'rescreened before each meal':'unsafe: nil by mouth, medicines by tube',
  ev:[
   {h:0,t:'Admitted with worsening weakness',d:'Impending crisis is rapid worsening that, in the treating physician\'s opinion, could lead to crisis within days to weeks. In 815 German patients, worse crisis outcomes went with lower vital capacity before and at admission, older age, more comorbidities and infection as the trigger. [[Sanders2016,Nelke2022]]'},
   {h:1,t:'Swallow screen before breakfast',d:'Aspiration triggered 10% of crises in a Columbia series of 73, and silent aspiration was common in the barium-swallow study. Myaware asks for regular speech and language therapy reviews, and when speech is affected, short conversations and a pad and pen. [[Thomas1997,Koopman2004,MyawareNurses]]'},
   {h:3,t:'Count 23: recheck and report',d:'A sustained fall matters more than one reading. In Thieben\'s series a decline of 30% or more in maximal inspiratory pressure identified higher risk of needing ventilation, and raised CO2 was frequent. [[Thieben2005,MyawareNurses]]'},
   {h:6,t:'Steroids and the early dip',d:'Corticosteroids may cause transient worsening, so the consensus says it may be appropriate to wait several days for IVIG or plasma exchange to work before starting them in impending crisis. In 55 people started on prednisone 40 to 80 mg, 42% worsened within 4 weeks. [[Sanders2016,Bae2006]]'},
   {h:9,t:'The count reaches 20',d:'Elsheikh proposed 25 or more as normal; 20 had earlier been proposed as a sign of respiratory compromise, and every MGFA class 3 patient in that study was below 25. Myaware asks for FVC at least four times a day; Thieben\'s thresholds were VC above 20 mL/kg, inspiratory pressure more negative than -40 cmH2O and expiratory pressure above 40 cmH2O. [[Elsheikh2016,MyawareNurses,Thieben2005]]'},
   {h:12,t:'Oxygen saturation can look normal',d:'In a neuromuscular audit, 54% of patients with raised CO2 still had saturation of 95% or more. Those were chronic, not MG crisis, data. In a Mayo series, a PaCO2 above 45 mmHg when BiPAP started was the only predictor of BiPAP failure. [[Gray2024,Seneviratne2008]]'},
   {h:15,t:'Secretions and the bedtime dose',d:'The consensus notes that cholinesterase inhibitors increase airway secretions, which may make breathing harder. A review describes them as usually stopped during ventilation and restarted at a low dose around extubation. That decision belongs to the medical team. [[Sanders2016,Wendell2011]]'},
   {h:18,t:'Count 15: ventilatory support',d:'In a Mayo series BiPAP was the first support in 24 of 60 episodes and avoided intubation in 14. Noninvasive ventilation may raise aspiration risk when bulbar weakness is present. Breathing or swallowing failure is an emergency at any hour. [[Seneviratne2008,Wendell2011]]'}
  ]},
 infuse:{n:'Outpatient infusion day',
  sbc:[[2,31],[2.4,31]], chk:[], rung:h=>0, lid:h=>.3, neck:h=>.86,
  swal:h=>h<2?'at home':'screened in clinic',
  ev:[
   {h:.5,t:'Morning dose at home',d:'On an infusion day the person takes their own pyridostigmine on time. Myaware suggests letting patients self-administer in hospital too, because pyridostigmine timing often does not fit drug rounds. [[MyawareNurses]]'},
   {h:2,t:'Arrival and pre-infusion checks',d:'pre'},
   {h:2.5,t:'The infusion',d:'run'},
   {h:-1,t:'After the infusion',d:'post'}
  ]}
};
const NU_ADMIN=[
 {n:'Timed to meals',tag:['drug','Timing'],b:['Usually starts working in 30 to 60 minutes, so doses are taken about 30 to 60 minutes before meals, the first on rising.','Usual duration 3 to 4 hours by day and about 6 hours for a bedtime dose.','Sources differ: Myaware\'s nurse page says about 20 minutes before meals for a modified diet; the nursing pharmacology text describes timing doses so the peak falls at meals.'],c:'[[RightDecisionsPyrido2025,MyawareNurses,OpenStaxPharmNurses]]'},
 {n:'On time means within 30 minutes',tag:['ab','Critical medicine'],b:['King\'s Health Partners lists pyridostigmine as a critical medicine to be given within 30 minutes of the due time, even if that does not match ward rounds.','It warns that a missed or late dose can precipitate myasthenic crisis, which can be fatal.','NHS Scotland reports a known risk of adverse incidents from repeated missed doses.'],c:'[[KHP2025,RightDecisionsPyrido2025]]'},
 {n:'Nil by mouth is not "no tablets"',tag:['drug','Route'],b:['Nasogastric administration is the preferred option when a patient is nil by mouth.','The oral solution is licensed for NG and PEG tubes, except latex tubes.','Immediate-release tablets can be crushed to a fine powder and mixed with at least 10 mL of water.','Myaware: medication should never be withheld because the patient is nil by mouth.'],c:'[[RightDecisionsPyrido2025,MyawareNurses]]'},
 {n:'No enteral route at all',tag:['warn','Neurology advice'],b:['Parenteral neostigmine is a short-term option on neurology advice.','Oral pyridostigmine 60 mg is about equivalent to 1 to 1.5 mg of neostigmine IM or SC.','Neostigmine\'s half-life is about 1 to 2 hours, against 3 to 4 hours for pyridostigmine, so doses come closer together.','Current US injectable neostigmine labels are indicated only for reversing neuromuscular blockade, not for MG.'],c:'[[RightDecisionsPyrido2025,FDANeostigmine2024]]'},
 {n:'Timespan, the extended-release tablet',tag:['warn','Extended release'],b:['Timespan 180 mg acts at first about like 60 mg of the ordinary tablet and lasts on average 2.5 times as long; doses are at least 6 hours apart, and ordinary tablets or syrup may be needed alongside.','The nursing pharmacology text teaches that extended-release forms must not be chewed, broken or crushed.','The US label itself does not address crushing; it says only that Timespan tablets are single-scored. A patient on Timespan who becomes nil by mouth needs the prescriber to review the regimen.'],c:'[[FDAMestinon2020,OpenStaxPharmNurses]]'},
 {n:'Too much or too little?',tag:['ab','Look at the clock'],b:['Worsening 15 to 60 minutes after a dose suggests cholinergic toxicity; worsening 3 to 4 hours after a dose suggests underdosing.','The label recommends atropine for cholinergic crisis and warns it can mask the signs of overdose.','Cramps, diarrhoea, salivation and sweating may be countered with propantheline 15 mg taken 15 to 30 minutes before the dose, or loperamide.','IV cholinesterase inhibitors may provoke uterine contractions and are not used in pregnancy.'],c:'[[RightDecisionsPyrido2025,FDAMestinon2020,Sanders2016]]'},
 {n:'Dose ranges, set by the clinician',tag:['drug','Published ranges'],b:['NHS Scotland: usual start 15 to 30 mg three to four times a day; most people need about 180 mg a day; usual maximum 360 mg a day.','The US label gives an average of 600 mg a day (ten 60 mg tablets), up to 25 tablets in severe cases.','The two sources disagree on the upper range. The dose is set by the treating clinician; the nursing text warns that raising it because weakness increases risks cholinergic crisis.','Caution in the elderly, the frail and in heart disease (an ECG is suggested); lower doses may be needed in renal impairment.'],c:'[[RightDecisionsPyrido2025,FDAMestinon2020]]'}
];
const NU_TBL=[
 ['IVIG','Infusion; label rate 1 rising to at most 8 mg/kg/min as tolerated (immunodeficiency label, no MG indication). MG regimens follow consensus guidance.','Hydration; haemoglobin in higher-risk patients; thrombosis and renal risk factors. Not in renal failure.','Headache, flushing, chills; aseptic meningitis within hours to 2 days; haemoglobin at about 36 h and 7 to 10 days if higher risk.','[[FDAGamunexC2026,Sanders2016]]'],
 ['Plasma exchange','A course of exchanges; 83% completed peripherally and 90% as outpatients in one cohort.','Not in sepsis. Vein access planned: central lines carried more serious complications (41% vs 4%).','Citrate reactions and vein problems in 45%; MG-specific rates for low calcium and low blood pressure not verified.','[[Sanders2016,Ebadi2013,Guptill2013]]'],
 ['Eculizumab','IV over 35 min in adults; no more than 2 h if slowed.','Meningococcal A, C, W, Y and B vaccines at least 2 weeks before the first dose, or antibiotics if urgent; REMS.','Monitor at least 1 h. REMS card carried 3 months after the last dose.','[[FDASoliris2026]]'],
 ['Ravulizumab','IV, weight-based loading dose, then maintenance on day 15 and every 8 weeks. A supplemental dose is needed after plasma exchange or IVIG.','As eculizumab: vaccination and REMS.','Card carried 8 months after the last dose. The label advises against breastfeeding during treatment and for 8 months after.','[[FDAUltomiris2025,Vu2023]]'],
 ['Zilucoplan','Once-daily subcutaneous self-injection, dosed by weight.','Vaccination and REMS; baseline lipase and amylase.','Card carried 2 months after the last dose.','[[FDAZilbrysq2026]]'],
 ['Efgartigimod IV','10 mg/kg over 1 h, weekly for 4 weeks per cycle (1,200 mg if 120 kg or more).','Immunisation review; no live vaccines during treatment.','Further cycles by clinical evaluation.','[[FDAVyvgart2026]]'],
 ['Efgartigimod SC (with hyaluronidase)','1,000 mg prefilled syringe over about 20 to 30 s, which patients or carers can self-inject; or a 1,008 mg vial over 30 to 90 s given by a professional.','As efgartigimod IV.','Weekly for 4-week cycles.','[[FDAVyvgartHytrulo2026]]'],
 ['Rozanolixizumab','Subcutaneous pump infusion by a clinician at up to 20 mL/h, weekly for 6 weeks; 420, 560 or 840 mg by weight band.','No live vaccines during treatment.','The label warns of aseptic meningitis.','[[FDARystiggo2026]]'],
 ['Nipocalimab','IV 30 mg/kg loading dose, then 15 mg/kg every 2 weeks.','Immunisation review; no live vaccines during treatment.','Continuous dosing rather than cycles.','[[FDAImaavy2026]]']
];
const NU_MONC=[
 {n:'IVIG: what the label asks',b:['Boxed warning: thrombosis, renal dysfunction and acute renal failure.','At-risk patients: lowest practicable dose and rate, adequate hydration, watch for thrombosis and hyperviscosity.','Haemolysis risk higher at 2 g/kg or more and in non-O blood groups.','Serious rare effects also include arrhythmia, haemolytic anaemia and TRALI; switching to subcutaneous immunoglobulin is one way reviews describe reducing reactions.'],c:'[[FDAGamunexC2026,Guo2018]]'},
 {n:'Plasma exchange',b:['Peripheral venous access succeeded in 75% of 230 courses.','Central catheters: total complications 68% vs 35%, serious 41% vs 4%, including 2 deaths.','In the prospective cohort 55% had no complication at all.','Choice between exchange and IVIG depends on the patient: exchange is out in sepsis, IVIG in renal failure.'],c:'[[Guptill2013,Ebadi2013,Sanders2016]]'},
 {n:'Corticosteroids',b:['May cause transient worsening of weakness at the start; published rates vary widely.','The prednisone label warns that anticholinesterases together with corticosteroids can cause severe weakness in MG.','Myaware asks nurses to monitor blood glucose; the Nordic guidance lists blood pressure, weight, bone density, glucose, sleep and mood.','The 2022 ACR bone guideline (not MG-specific) applies to 2.5 mg a day or more for over 3 months. No MG-specific recommendation on stomach protection was found.'],c:'[[Sanders2016,FDAPrednisone2026,MyawareNurses,Gilhus2024,Humphrey2023]]'},
 {n:'Children on steroids',b:['Blood pressure, growth velocity and weight are monitored.','Vitamin D for all children; gastric protection considered.','Bone density assessment with long-term use.','Families are given a list of medicines that may worsen MG.'],c:'[[OConnell2020]]'},
 {n:'Immunosuppressants',b:['Myaware asks for bloods and a watch for signs of infection in people on immunosuppression.','The azathioprine label warns of severe marrow toxicity with low or absent TPMT activity, and says TPMT testing cannot replace blood-count monitoring.','Serious infections were more common in an Ontario MG cohort than in comparators (adjusted HR 1.39), most often bacterial pneumonia.'],c:'[[MyawareNurses,FDAImuran2025,Kassardjian2020]]'}
];
const NU_MYTHS=[
 {m:'More weakness means more pyridostigmine',t:'Not automatically',
  a:'Increasing weakness is not automatically underdosing. Raising the dose risks cholinergic crisis, and both under- and overdosing can stop the drug helping. The clock helps: worsening 15 to 60 minutes after a dose points toward too much, 3 to 4 hours after toward too little. The dose belongs to the prescriber. [[OpenStaxPharmNurses,FDAMestinon2020,RightDecisionsPyrido2025]]',
  q:'Ask: "When did you last take a tablet, and when did the weakness start?"'},
 {m:'She managed the stairs this morning, so she can now',t:'Fatigability is the disease',
  a:'Myaware reminds nurses that a task possible earlier the same day may not be possible now. That is what fatigable weakness means, not a lack of effort. [[MyawareNurses]]',
  q:'Ask: "Which jobs are hardest by the end of the day?"'},
 {m:'Nil by mouth means no tablets',t:'The medicine is given another way',
  a:'Myaware says pyridostigmine should never be withheld because the patient is nil by mouth. NHS Scotland prefers the nasogastric route, using the licensed oral solution or a crushed immediate-release tablet; parenteral neostigmine is a short-term option on neurology advice. [[MyawareNurses,RightDecisionsPyrido2025]]',
  q:'Check: "Which route is prescribed if this patient cannot swallow?"'},
 {m:'The dose can wait for the drug round',t:'Within 30 minutes of the due time',
  a:'The King\'s Health Partners bulletin asks for pyridostigmine within 30 minutes of the due time, even when that does not match ward rounds, and Myaware suggests self-administration in hospital for the same reason. [[KHP2025,MyawareNurses]]',
  q:'Ask: "What times do you take it at home?" and chart those times.'},
 {m:'Oxygen saturation is normal, so breathing is fine',t:'Saturation can lag behind',
  a:'In a neuromuscular audit, 54% of patients with raised CO2 had saturation of 95% or more. That audit was in chronic neuromuscular disease, not MG crisis, so it is a warning rather than an MG figure. MG monitoring relies on vital capacity, inspiratory pressure, the breath count and blood gases. [[Gray2024,Thieben2005]]',
  q:'Look: count, voice, neck flexion and the work of breathing, not only the probe.'},
 {m:'I have been vaccinated, so meningitis is impossible on a C5 inhibitor',t:'Vaccination reduces risk, it does not remove it',
  a:'The labels state that vaccination does not eliminate the risk, and one vaccinated patient developed meningococcal meningitis in the REGAIN extension. The REMS card lists the symptoms that need immediate medical evaluation. [[FDASoliris2026,Narayanaswami2021]]',
  q:'Ask: "Where is your card, and what would make you go straight to hospital?"'},
 {m:'The flu jab will set off a flare',t:'The trial data say otherwise',
  a:'In a randomised trial of 47 people with AChR MG, flu vaccine protected as well as in healthy controls and did not cause exacerbations. A population study found no rise in MG admissions in the 6 weeks after vaccination (relative incidence 0.84, 95% CI 0.65 to 1.09). Live vaccines are a separate question for people on immunosuppression. [[Strijbos2019,Zinman2009,Gilhus2018b]]',
  q:'Ask: "Has anyone told you to avoid vaccines?"'},
 {m:'Low mood is just MG tiredness',t:'Depression is common and can be mistaken for weakness',
  a:'A meta-analysis put depression at 36% and anxiety at 33% in MG. A juvenile MG review warns that low mood and depression-related fatigue can be mistaken for myasthenic weakness, leading to overtreatment. [[Nadali2023,OConnell2020]]',
  q:'Ask about sleep, mood and worry as well as strength.'}
];
const NU_DOCI=[
 {k:'base',l:'Baseline respiratory measure on admission',v:'07:05 Baseline FVC 2.9 L seated. Breath count 26 (best of 2: 24, 26), seated.',c:true,s:'[[MyawareNurses,Elsheikh2016]]'},
 {k:'ser',l:'Serial FVC and breath counts, with position',v:'11:00 FVC 2.8 L, count 27 seated. 19:00 count 24 seated, rechecked 21:00: 25.',c:true,s:'[[MyawareNurses,Elsheikh2016]]'},
 {k:'ce',l:'MG Core Exam item scores',v:'MG-CE: ptosis 1 (lid above pupil after 60 s upgaze), diplopia 0, breath count 1, arm abduction 1.',c:true,s:'[[Guidon2021]]'},
 {k:'dose',l:'Each dose: time due and time given',v:'Pyridostigmine due 11:45, given 11:50 via NG (oral solution).',c:true,s:'[[KHP2025,RightDecisionsPyrido2025]]'},
 {k:'resp',l:'Response of ptosis or diplopia about 20 min after a dose',v:'12:10 Ptosis improved: lid now clear of the iris. No double vision on sustained gaze.',c:true,s:'[[MyawareNurses]]'},
 {k:'fat',l:'Dose times against fatigue and strength',v:'Patient reports chewing tires at the end of lunch; dose-to-meal gap 45 min.',c:false,s:'[[OpenStaxPharmNurses]]'},
 {k:'swal',l:'Swallow status and route',v:'Swallow screen 07:55: coughing on thin fluids. Nil by mouth pending SLT review; medicines by NG.',c:true,s:'[[Koopman2004,MyawareNurses]]'},
 {k:'c5',l:'Complement inhibitor: vaccination dates, antibiotics, REMS card issued',v:'MenACWY and MenB completed 3 weeks before first dose; no prophylaxis needed. REMS card issued and explained.',c:false,s:'[[FDASoliris2026]]'},
 {k:'ivig',l:'IVIG at-risk: pre-infusion and follow-up haemoglobin',v:'Pre-infusion Hb 132 g/L. Repeat at about 36 h and 7 to 10 days requested.',c:false,s:'[[FDAGamunexC2026]]'},
 {k:'ster',l:'Steroids: glucose and blood pressure',v:'Capillary glucose 8.1 mmol/L pre-lunch. BP 138/84.',c:false,s:'[[MyawareNurses,Gilhus2024]]'},
 {k:'esc',l:'Who was told, and when',v:'19:05 Count 24 reported to nurse in charge and on-call team; plan: recheck in 2 h.',c:false,s:''}
];
inits.nursing=()=>{
  /* ======== 1 · the shift ======== */
  let sc='postop',inf='ivig',late=false;
  const svg=$('#nuSvg'),rg=$('#nuT');
  const clk=h=>{const m=((Math.round((7+h)*60)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
  const doses=()=>NU_DOSES.map((d,i)=>{let g=d.h;if(late&&i===0)g=2;if(late&&i===1)g=5.5;return {due:d.h,g,d:d.d}});
  const eff=(h,D)=>clamp(D.reduce((e,d)=>e+ramp(h,d.g+.25,d.g+.9)*(1-ramp(h,d.g+d.d-.6,d.g+d.d+.4)),0));
  const interp=(P,h)=>{if(h<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(h<=P[i][0])return lerp(P[i-1][1],P[i][1],(h-P[i-1][0])/(P[i][0]-P[i-1][0]));return P[P.length-1][1]};
  const ceS=c=>c>=30?0:c>=25?1:c>=20?2:3;
  const lidS=d=>d<.27?0:d<.45?1:d<.62?2:3;
  /* the outpatient day borrows its checks and events from the chosen infusion */
  function scen(){const S=NU_SC[sc];if(sc!=='infuse')return S;const I=NU_INF[inf],end=I.e+(I.mon||0);
    return Object.assign({},S,{sbc:[[2,31],[end+.25,31]],chk:[[2,'S'],[2,'C'],[end+.25,'S']],
      ev:S.ev.map(e=>e.d==='pre'?{h:e.h,t:e.t,d:I.pre}:e.d==='run'?{h:e.h,t:I.n+': the infusion',d:I.run}:e.d==='post'?{h:end,t:'After the infusion',d:I.post}:e)})}
  $('#nuScen').innerHTML='<span class="kicker">Scenario</span>'+Object.entries(NU_SC).map(([k,v])=>`<button class="btn" data-nusc="${k}" aria-pressed="${k===sc}">${v.n}</button>`).join('');
  $('#nuInf').innerHTML='<span class="kicker">Infusion</span>'+Object.entries(NU_INF).map(([k,v])=>`<button class="btn" data-nuin="${k}" aria-pressed="${k===inf}">${v.n}</button>`).join('');
  function draw(t){
    const N=vb(svg,'720 520','400 726'),H=t*24,S=scen(),D=doses();
    const L=N?{X0:20,X1:354,tk:6,ax:40,gTop:48,mealLab:64,meal:78,mealT:92,doseLab:106,pill:118,effT:134,effB:172,chkLab:194,legY:210,legX:20,chk:233,bar:251,infLab:263,winLab:275,sbcLab:293,sTop:305,sBot:393,ladT:419,lad0:527,ladX:20,ladW:364,cx:20,cy:561,cw:364,ch:152}
             :{X0:24,X1:664,tk:3,ax:40,gTop:48,mealLab:64,meal:78,mealT:92,doseLab:106,pill:118,effT:134,effB:172,chkLab:194,legY:194,legX:0,chk:212,bar:231,infLab:244,winLab:244,sbcLab:264,sTop:276,sBot:358,ladT:384,lad0:484,ladX:24,ladW:306,cx:350,cy:372,cw:350,ch:144};
    const X=h=>L.X0+h/24*(L.X1-L.X0),gBot=L.sBot+6;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${L.X0}" y="22" class="t-lbl">07:00 to 07:00 · ${S.n}${sc==='infuse'?' ('+NU_INF[inf].n+')':''}</text>`;
    s+=`<text x="${N?384:700}" y="22" class="t-lbl t-end" style="fill:var(--ab)">${clk(H)}</text>`;
    /* night and the hour grid */
    s+=`<rect x="${f1(X(14))}" y="${L.gTop}" width="${f1(X(24)-X(14))}" height="${gBot-L.gTop}" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=`<text x="${f1(X(19))}" y="${L.mealLab}" class="t-xs t-mid">night</text>`;
    for(let h=0;h<=24;h+=L.tk){const x=X(h);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gTop}" y2="${gBot}" class="grid"/>`;
      s+=`<text x="${f1(x)}" y="${L.ax}" class="t-xs ${h===0?'':h===24?'t-end':'t-mid'}">${clk(h)}</text>`}
    /* meals */
    s+=`<text x="${L.X0}" y="${L.mealLab}" class="t-sm">MEALS · illustrative times</text>`;
    NU_MEALS.forEach(([h,n])=>{const x=X(h),e=eff(h+.25,D),ok=e>.6,past=H>=h;
      s+=`<circle cx="${f1(x)}" cy="${L.meal}" r="7" style="fill:${ok?'var(--achr-soft)':'var(--warn-soft)'};stroke:${ok?'var(--achr)':'var(--warn)'};stroke-width:${past?2.2:1.2}"/><circle cx="${f1(x)}" cy="${L.meal}" r="3" style="fill:none;stroke:${ok?'var(--achr)':'var(--warn)'};stroke-width:1"/>`;
      s+=`<text x="${f1(x)}" y="${L.mealT}" class="t-xs t-mid" style="fill:${ok?'var(--muted)':'var(--warn)'};font-weight:${ok?500:700}">${n}${ok||N?'':' · trough'}</text>`});
    /* doses, windows and the schematic effect */
    s+=`<text x="${L.X0}" y="${L.doseLab}" class="t-sm">PYRIDOSTIGMINE · ON-TIME WINDOWS · EFFECT (SCHEMATIC)</text>`;
    let ep=`M${f1(X(0))} ${L.effB}`;for(let i=0;i<=192;i++){const h=i/8;ep+=`L${f1(X(h))} ${f1(L.effB-(L.effB-L.effT)*eff(h,D))}`}
    s+=`<path d="${ep}L${f1(X(24))} ${L.effB}Z" style="fill:var(--drug-soft);stroke:var(--drug);stroke-width:1.4"/>`;
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.effB}" y2="${L.effB}" class="axis"/>`;
    D.forEach((d,i)=>{const x=X(d.g),moved=Math.abs(d.g-d.due)>.01;
      s+=`<rect x="${f1(X(d.due-.5))}" y="${L.pill-7}" width="${f1(X(d.due+.5)-X(d.due-.5))}" height="14" rx="4" style="fill:var(--achr-soft)"/>`;
      if(moved){s+=`<rect x="${f1(X(d.due)-7)}" y="${L.pill-4}" width="14" height="8" rx="4" style="fill:none;stroke:var(--drug);stroke-width:1.2;stroke-dasharray:2 2"/>`;
        s+=`<line x1="${f1(X(d.due)+8)}" x2="${f1(x-9)}" y1="${L.pill}" y2="${L.pill}" style="stroke:var(--ab);stroke-width:1.4;stroke-dasharray:3 2"/>`}
      s+=`<rect x="${f1(x-7)}" y="${L.pill-4}" width="14" height="8" rx="4" style="fill:var(--drug);opacity:${H>=d.g?1:.45}"/>`;
      if(!N||!moved||i===0)s+=`<text x="${f1(x)}" y="${L.effT-4}" class="t-xs t-mid" style="fill:${moved?'var(--ab)':'var(--muted)'}">${clk(d.g)}${i===3?' bed':''}</text>`});
    /* checks */
    s+=`<text x="${L.X0}" y="${L.chkLab}" class="t-sm">${sc==='infuse'?'CLINIC':'BEDSIDE CHECKS'}</text>`;
    const chk=S.chk.slice();if(sc!=='infuse')D.forEach(d=>chk.push([d.g+1/3,'P']));
    const kinds=[...new Set(chk.map(c=>c[1]))],row={S:-9,P:0,W:9,C:9};
    let lx=N?L.legX:L.X1;const leg=kinds.map(k=>[k,NU_KIND[k]]);
    if(N){leg.forEach(([k,[c,l]])=>{s+=`<circle cx="${lx+4}" cy="${L.legY-3}" r="4" style="fill:${c}"/><text x="${lx+12}" y="${L.legY}" class="t-xs">${l}</text>`;lx+=24+l.length*5.8})}
    else{leg.slice().reverse().forEach(([k,[c,l]])=>{const w=l.length*5.8;s+=`<text x="${lx}" y="${L.legY}" class="t-xs t-end">${l}</text><circle cx="${f1(lx-w-8)}" cy="${L.legY-3}" r="4" style="fill:${c}"/>`;lx-=w+26})}
    if(sc==='infuse'){const I=NU_INF[inf],xs=X(I.s),xe=X(I.e);
      s+=`<rect x="${f1(xs)}" y="${L.chk-5}" width="${f1(Math.max(4,xe-xs))}" height="10" rx="3" style="fill:var(--drug);opacity:${H>=I.s?1:.4}"/>`;
      if(I.mon)s+=`<rect x="${f1(xe)}" y="${L.chk-5}" width="${f1(X(I.e+I.mon)-xe)}" height="10" rx="3" style="fill:none;stroke:var(--drug);stroke-dasharray:3 2"/>`;
      s+=`<text x="${f1(xs)}" y="${L.infLab}" class="t-xs" style="fill:var(--drug)">${I.lab}</text>`;
      if(I.win){const xw=X(I.e+(I.mon||0));s+=`<rect x="${f1(xw)}" y="${L.bar}" width="${f1(L.X1-xw)}" height="4" rx="2" style="fill:var(--ab);opacity:${H>=I.e?.7:.25}"/>`;
        s+=`<text x="${L.X1}" y="${L.winLab}" class="t-xs t-end" style="fill:var(--ab)">${I.win}</text>`}}
    chk.forEach(([h,k])=>{const x=X(h),y=L.chk+row[k],c=NU_KIND[k][0],dn=H>=h;
      s+=`<circle cx="${f1(x)}" cy="${y}" r="4.5" style="fill:${dn?c:'var(--panel)'};stroke:${c};stroke-width:1.5"/>`});
    /* the breath-count trend against the MG-CE bands */
    s+=`<text x="${L.X0}" y="${L.sbcLab}" class="t-sm">${N?'BREATH COUNT · schematic · dashes at 25, 20':'SINGLE BREATH COUNT · schematic trend · dashed lines at 25 and 20'}</text>`;
    const Y=c=>L.sTop+(40-clamp(c,10,40))/30*(L.sBot-L.sTop);
    [[40,30,'var(--good-soft)','0'],[30,25,'var(--ach-soft)','1'],[25,20,'var(--warn-soft)','2'],[20,10,'var(--bad-soft)','3']].forEach(([a,b,c,l])=>{
      s+=`<rect x="${L.X0}" y="${f1(Y(a))}" width="${L.X1-L.X0}" height="${f1(Y(b)-Y(a))}" style="fill:${c}"/>`;
      s+=`<text x="${N?384:700}" y="${f1((Y(a)+Y(b))/2+3)}" class="t-xs t-end">${l}</text>`});
    s+=`<text x="${N?384:700}" y="${L.sTop-3}" class="t-xs t-end">MG-CE</text>`;
    [25,20].forEach(c=>s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${f1(Y(c))}" y2="${f1(Y(c))}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:4 3;opacity:.55"/>`);
    [25,20].forEach(c=>s+=`<text x="${L.X1+4}" y="${f1(Y(c)+3)}" class="t-xs">${c}</text>`);
    const P=S.sbc,h0=P[0][0],h1=P[P.length-1][0];
    let pa='',pb='';for(let i=0;i<=120;i++){const h=lerp(h0,h1,i/120),pt=`${f1(X(h))} ${f1(Y(interp(P,h)))}`;if(h<=H)pa+=(pa?'L':'M')+pt;else pb+=(pb?'L':'M')+pt}
    if(pb)s+=`<path d="${pb}" style="fill:none;stroke:var(--nerve);stroke-width:1.5;stroke-dasharray:3 3;opacity:.45"/>`;
    if(pa)s+=`<path d="${pa}" style="fill:none;stroke:var(--nerve);stroke-width:2.4"/>`;
    chk.filter(c=>c[1]==='S'&&H>=c[0]).forEach(([h])=>s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(interp(P,h)))}" r="3.6" style="fill:var(--field);stroke:var(--nerve);stroke-width:1.6"/>`);
    if(sc==='infuse')s+=`<text x="${f1(X(12))}" y="${f1(Y(35)+3)}" class="t-xs t-mid">not measured at home</text>`;
    /* now cursor */
    const xn=X(H);s+=`<line x1="${f1(xn)}" x2="${f1(xn)}" y1="${L.gTop-2}" y2="${gBot}" style="stroke:var(--ab);stroke-width:1.6"/><path d="M${f1(xn-5)} ${L.gTop-6}h10l-5 6z" style="fill:var(--ab)"/>`;
    /* escalation ladder */
    const rung=S.rung(H);
    s+=`<text x="${L.ladX}" y="${L.ladT}" class="t-xs">ESCALATION · schematic; local policy decides</text>`;
    NU_RUNGS.forEach(([c,cs,l],i)=>{const y=L.lad0-i*30,on=i===rung,below=i<rung;
      s+=`<rect x="${L.ladX}" y="${y}" width="${L.ladW}" height="26" rx="7" style="fill:${on?cs:'var(--panel)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<circle cx="${L.ladX+16}" cy="${y+13}" r="8" style="fill:${on||below?c:'var(--panel-2)'}"/><text x="${L.ladX+16}" y="${y+17}" class="t-xs t-mid" style="fill:${on||below?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${L.ladX+32}" y="${y+17.5}" class="t-lbl" style="opacity:${on?1:.6}">${l}</text>`});
    /* bedside card */
    const inClinic=sc!=='infuse'||(H>=h0&&H<=h1),cnt=Math.round(interp(P,H)),droop=clamp(S.lid(H)-.3*eff(H,D)),neck=clamp(S.neck(H)+.12*eff(H,D));
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${L.cx+14}" y="${L.cy+20}" class="t-sm">AT THE BEDSIDE · ${clk(H)}</text>`;
    s+=eyelid(L.cx+54,L.cy+76,62,droop);
    s+=`<text x="${L.cx+54}" y="${L.cy+124}" class="t-xs t-mid">after 60 s upgaze</text>`;
    const vx=L.cx+L.cw-14,lx2=L.cx+110,rows=[
      ['Breath count',inClinic?`${cnt} · MG-CE ${ceS(cnt)}`:'not measured'],
      ['FVC, derived',inClinic?`≈ ${f1(cnt*.116)} L`:'—'],
      ['Ptosis (MG-CE)',String(lidS(droop))],
      ['Neck flexion',''],
      ['Swallow',S.swal(H)]];
    rows.forEach(([a,b],i)=>{const y=L.cy+40+i*20;
      if(i===4){s+=`<text x="${lx2}" y="${y}" class="t-sm">${a}</text><text x="${vx}" y="${y+14}" class="t-xs t-end" style="fill:var(--ink)">${b}</text>`;return}
      s+=`<text x="${lx2}" y="${y}" class="t-sm">${a}</text>`;
      if(i===3){const bw=60;s+=`<rect x="${vx-bw}" y="${y-8}" width="${bw}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${vx-bw}" y="${y-8}" width="${f1(bw*neck)}" height="8" rx="4" style="fill:${neck<.4?'var(--bad)':'var(--achr)'}"/>`}
      else s+=`<text x="${vx}" y="${y}" class="t-lbl t-end" style="font-size:12.5px">${b}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(NU_STEPS,t);setSt(p);
    const evs=S.ev.filter(e=>H>=e.h),ev=evs[evs.length-1];
    let note=noteHTML(NU_STEPS[p]);
    if(late&&p===1)note+=`<div class="kv"><div><dt>The late dose</dt><dd>Given at 09:00 instead of 07:30, breakfast falls before the dose has started to work. NHS Scotland\'s rule for a dose more than 1 hour late is to give it straight away and delay the next by 3 to 4 hours, never doubling, so the lunchtime dose moves too. ${'[[RightDecisionsPyrido2025]]'}</dd></div></div>`;
    if(ev)note+=`<div class="kv"><div><dt>${clk(ev.h)} · ${ev.t}</dt><dd>${ev.d}</dd></div></div>`;
    $('#nuNote').innerHTML=note;
    $('#nuRead').innerHTML=`<span>time <b>${clk(H)}</b></span><span>breath count <b>${inClinic?cnt:'not measured'}</b></span><span>est. FVC <b>${inClinic?'≈ '+f1(cnt*.116)+' L':'—'}</b></span><span>pyridostigmine effect <b>${eff(H,D)>.6?'on':eff(H,D)>.15?'rising or fading':'trough'}</b></span><span>escalation <b>level ${rung+1}</b></span>`;
  }
  const stop=playWire(rg,$('#nuPlay'),draw,24000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  $('#nuScen').addEventListener('click',e=>{const b=e.target.closest('[data-nusc]');if(!b)return;sc=b.dataset.nusc;
    $$('[data-nusc]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#nuInf').hidden=sc!=='infuse';draw(+rg.value)});
  $('#nuInf').addEventListener('click',e=>{const b=e.target.closest('[data-nuin]');if(!b)return;inf=b.dataset.nuin;
    $$('[data-nuin]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#nuLate').onclick=()=>{late=!late;$('#nuLate').setAttribute('aria-pressed',late);draw(+rg.value)};

  /* ======== the single breath count scorer ======== */
  $('#nuSbLede').innerHTML='Set two attempts and a body weight. The scorer takes the better attempt, as the published method does, places it on the MG Core Exam bands, and turns it into a rough vital-capacity estimate from the average of 116 mL per count (range 76 to 199) that Elsheikh and colleagues measured. Press the button to hear it counted at 2 a second. [[Elsheikh2016,Guidon2021]]';
  const sv=$('#nuSbSvg'),sr=$('#nuSbT');let sup=false,sbStop=null;
  function drawSb(t){
    const N=vb(sv,'720 300','400 470');
    const a1=+$('#nuA1').value,a2=+$('#nuA2').value,wt=+$('#nuWt').value,best=Math.max(a1,a2),c=best*t,cn=Math.floor(c+1e-6);
    $('#nuA1v').textContent=a1;$('#nuA2v').textContent=a2;$('#nuWtv').textContent=wt;
    const L=N?{tx:20,ty:44,tw:70,th:150,nx:200,ny:120,sx0:20,sx1:380,sy:250,lab:302,l1:324,l2:340,vx0:20,vx1:380,vy:410,vt:384}
             :{tx:28,ty:44,tw:80,th:200,nx:68,ny:282,sx0:160,sx1:690,sy:80,lab:132,l1:156,l2:172,vx0:160,vx1:690,vy:240,vt:212};
    const SX=v=>L.sx0+v/45*(L.sx1-L.sx0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* the breath, emptying */
    const lv=1-t;
    s+=`<rect x="${L.tx}" y="${L.ty}" width="${L.tw}" height="${L.th}" rx="14" style="fill:var(--panel);stroke:var(--nerve);stroke-width:1.6"/>`;
    s+=`<rect x="${L.tx+4}" y="${f1(L.ty+4+(L.th-8)*(1-lv))}" width="${L.tw-8}" height="${f1((L.th-8)*lv)}" rx="10" style="fill:var(--nerve-soft)"/>`;
    s+=`<text x="${L.tx+L.tw/2}" y="${L.ty-10}" class="t-xs t-mid">one breath</text>`;
    if(N){s+=`<text x="${L.nx}" y="${L.ny-40}" class="t-sm t-mid">COUNTING ALOUD</text><text x="${L.nx}" y="${L.ny+6}" class="t-big t-mid" style="font-size:52px;fill:var(--nerve)">${cn}</text><text x="${L.nx}" y="${L.ny+30}" class="t-xs t-mid">${f1(c/2)} s at 2 counts a second</text>`;
      if(sup)s+=`<text x="${L.nx}" y="${L.ny+48}" class="t-xs t-mid" style="fill:var(--warn)">lying flat: not the published method</text>`}
    else{s+=`<text x="${L.nx}" y="${L.ny-8}" class="t-big t-mid" style="font-size:30px;fill:var(--nerve)">${cn}</text><text x="${L.nx}" y="${L.ny+10}" class="t-xs t-mid">${f1(c/2)} s</text>`}
    /* the scale */
    s+=`<text x="${L.sx0}" y="${L.sy-30}" class="t-sm">BEST OF 2 ON THE MG CORE EXAM BANDS</text>`;
    if(!N&&sup)s+=`<text x="${L.sx1}" y="${L.sy-30}" class="t-xs t-end" style="fill:var(--warn)">lying flat: not the published method</text>`;
    [[0,20,'var(--bad-soft)','MG-CE 3'],[20,25,'var(--warn-soft)','2'],[25,30,'var(--ach-soft)','1'],[30,45,'var(--good-soft)','MG-CE 0']].forEach(([a,b,col,l])=>{
      s+=`<rect x="${f1(SX(a))}" y="${L.sy}" width="${f1(SX(b)-SX(a))}" height="22" style="fill:${col}"/>`;
      s+=`<text x="${f1((SX(a)+SX(b))/2)}" y="${L.lab}" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${L.sx0}" y="${L.sy+8}" width="${f1(SX(c)-L.sx0)}" height="6" rx="3" style="fill:var(--nerve)"/>`;
    [20,25].forEach(v=>{s+=`<line x1="${f1(SX(v))}" x2="${f1(SX(v))}" y1="${L.sy-2}" y2="${L.sy+26}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 2"/>`});
    [0,10,20,25,30,40].forEach(v=>s+=`<text x="${f1(SX(v))}" y="${L.sy+36}" class="t-xs t-mid" style="fill:${v===20||v===25?'var(--ink)':'var(--muted)'}">${v}</text>`);
    [[a1,'1'],[a2,'2']].forEach(([v,l])=>{const x=SX(v),b=v===best;
      s+=`<path d="M${f1(x)} ${L.sy-1}l-5 -9h10z" style="fill:${b?'var(--nerve)':'var(--panel)'};stroke:var(--nerve);stroke-width:1.2"/>`});
    s+=`<circle cx="${f1(SX(c))}" cy="${L.sy+11}" r="6" style="fill:var(--panel);stroke:var(--nerve);stroke-width:2.4"/>`;
    s+=`<text x="${L.sx0}" y="${L.l1}" class="t-xs">${N?'25 or more: proposed as normal (seated)':'25 or more: proposed as normal respiratory muscle function (seated)'}</text>`;
    s+=`<text x="${L.sx0}" y="${L.l2}" class="t-xs">${N?'under 20: earlier proposed as compromise':'under 20: earlier proposed as a sign of respiratory compromise'}</text>`;
    /* the derived vital capacity */
    const ml=best*116,lo=best*76,hi=best*199,VX=v=>L.vx0+clamp(v/80)*(L.vx1-L.vx0);
    s+=`<text x="${L.vx0}" y="${L.vt}" class="t-sm">ESTIMATED VITAL CAPACITY, mL/kg · DERIVED, OPEN DOT</text>`;
    s+=`<rect x="${L.vx0}" y="${L.vy-4}" width="${L.vx1-L.vx0}" height="8" rx="4" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${L.vx0}" y="${L.vy-4}" width="${f1(VX(20)-L.vx0)}" height="8" rx="4" style="fill:var(--bad-soft)"/>`;
    s+=`<line x1="${f1(VX(20))}" x2="${f1(VX(20))}" y1="${L.vy-12}" y2="${L.vy+12}" style="stroke:var(--bad);stroke-width:1.6"/><text x="${f1(VX(20))}" y="${L.vy+24}" class="t-xs t-mid" style="fill:var(--bad)">20</text>`;
    [0,40,60,80].forEach(v=>s+=`<text x="${f1(VX(v))}" y="${L.vy+24}" class="t-xs t-mid">${v}${v===80?'+':''}</text>`);
    if(t>.999){s+=`<line x1="${f1(VX(lo/wt))}" x2="${f1(VX(hi/wt))}" y1="${L.vy}" y2="${L.vy}" style="stroke:var(--nerve);stroke-width:2.4;opacity:.5"/>`;
      s+=`<circle cx="${f1(VX(ml/wt))}" cy="${L.vy}" r="6" style="fill:var(--field);stroke:var(--nerve);stroke-width:2.2"/>`;
      s+=`<text x="${L.vx0}" y="${L.vy+44}" class="t-xs" style="fill:var(--ink)">≈ ${Math.round(ml/wt)} mL/kg (${(ml/1000).toFixed(1)} L; range ${(lo/1000).toFixed(1)} to ${(hi/1000).toFixed(1)} L)</text>`}
    else s+=`<text x="${L.vx0}" y="${L.vy+44}" class="t-xs">the estimate appears when the count ends</text>`;
    sv.innerHTML=s;
    const sc2=best>=30?0:best>=25?1:best>=20?2:3;
    $('#nuSbNote').innerHTML=`<div class="kicker">Best of 2: ${best} counts</div><h4>MG Core Exam breath-count item: ${sc2}</h4>
      <p>${best>=25?'At 25 or more, the count sits where Elsheikh and colleagues proposed normal respiratory muscle function. No MGFA class 1 patient in their study counted below 25.':best>=20?'Between 20 and 25. Every MGFA class 3 patient in the study failed to reach 25, but the count alone does not say why: some people had low counts with near-normal FVC, possibly from vocal-cord or bulbar weakness.':'Under 20, the level earlier proposed as a sign of respiratory compromise in MG. A count this low is read with FVC, neck flexion, swallowing and the work of breathing, and reported.'} [[Elsheikh2016]]</p>
      <div class="kv"><div><dt>The estimate, and its limits</dt><dd>${best} × 116 mL ≈ ${(ml/1000).toFixed(1)} L, or about ${Math.round(ml/wt)} mL/kg at ${wt} kg. The count correlated with FVC only moderately (r = 0.554), and each count stood for anywhere from 76 to 199 mL, so this is a prompt to measure, not a measurement. In Thieben's series ventilation was unlikely while vital capacity stayed above 20 mL/kg. [[Elsheikh2016,Thieben2005]]</dd></div></div>
      ${sup?'<div class="kv"><div><dt>Lying flat</dt><dd>The study tested people seated only, and the authors note that testing lying down might reveal more deficit. A supine count is not comparable with the seated thresholds, so the position is written down with the number. [[Elsheikh2016]]</dd></div></div>':''}
      <div class="hook"><b>Exam hook</b>Method: a deep breath, then count aloud in a normal voice at about 2 a second, <b>seated, best of 2</b>. A review adds that the count has been used by telephone. [[Elsheikh2016,Dishnica2023]]</div>
      <div class="pt"><b>In plain words</b>How far someone can count on one breath is a quick, free way to check breathing muscles. Roughly, each number is about 100 mL of air.</div>`;
  }
  function sbStopF(){if(sbStop)sbStop();sbStop=null;$('#nuSbPlay').textContent='Count it out'}
  $('#nuSbPlay').onclick=()=>{if(sbStop){sbStopF();return}const best=Math.max(+$('#nuA1').value,+$('#nuA2').value);let t0=+sr.value;if(t0>.99)t0=0;
    $('#nuSbPlay').textContent='Pause';sbStop=animate((1-t0)*best*500,p=>{const t=t0+(1-t0)*p;sr.value=t;drawSb(t)},()=>{sbStop=null;$('#nuSbPlay').textContent='Count again'})};
  sr.addEventListener('input',()=>{sbStopF();drawSb(+sr.value)});
  ['#nuA1','#nuA2','#nuWt'].forEach(id=>$(id).addEventListener('input',()=>{sbStopF();sr.value=1;drawSb(1)}));
  const setPos=v=>{sup=v;$('#nuSeat').setAttribute('aria-pressed',!v);$('#nuSup').setAttribute('aria-pressed',v);drawSb(+sr.value)};
  $('#nuSeat').onclick=()=>setPos(false);$('#nuSup').onclick=()=>setPos(true);

  /* ======== 2 · late-dose explorer ======== */
  $('#nuMedLede').innerHTML='Most of what goes wrong with pyridostigmine in hospital is about the clock. Drag how late the 07:30 dose is and watch which rule applies and where the next dose falls. The rules come from NHS Scotland\'s pyridostigmine Q&A and a King\'s Health Partners safety bulletin; doses themselves are set by the treating clinician. [[RightDecisionsPyrido2025,KHP2025]]';
  const lv=$('#nuLateSvg'),lr=$('#nuLateR');
  function drawLate(v){
    const N=vb(lv,'720 230','400 300'),late2=Math.round(v*180/5)*5,due=7.5,g=due+late2/60,over=late2>60;
    const L=N?{x0:20,x1:384,tk:2,ttl:22,ax:44,zone:56,dose:104,eT:122,eB:160,meal:186,mealT:204,ft:236,lg:[254,270,286]}
             :{x0:30,x1:690,tk:1,ttl:22,ax:44,zone:56,dose:104,eT:122,eB:160,meal:184,mealT:202,ft:222,lg:null};
    const T0=6.5,T1=15,X=h=>L.x0+(h-T0)/(T1-T0)*(L.x1-L.x0);
    const hm=h=>String(Math.floor(h)).padStart(2,'0')+':'+String(Math.round((h%1)*60)).padStart(2,'0');
    const cat=late2<=30?['var(--good)','On time: within 30 minutes']:late2<=60?['var(--warn)','Up to 1 hour late: give it, keep the schedule']:['var(--bad)','Over 1 hour late: give now, delay the next 3 to 4 h'];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${L.x0}" y="${L.ttl}" class="t-lbl">Due 07:30 · given ${hm(g)} · ${late2} min late</text>`;
    if(!N)s+=`<text x="${L.x1}" y="${L.ttl}" class="t-lbl t-end" style="fill:${cat[0]}">${cat[1]}</text>`;
    for(let h=7;h<=15;h+=L.tk)s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${L.ax+4}" y2="${L.eB}" class="grid"/><text x="${f1(X(h))}" y="${L.ax}" class="t-xs t-mid">${hm(h)}</text>`;
    /* rule zones */
    [[due-.5,due+.5,'var(--good-soft)'],[due+.5,due+1,'var(--warn-soft)'],[due+1,due+3,'var(--bad-soft)']].forEach(([a,b,c])=>s+=`<rect x="${f1(X(a))}" y="${L.zone}" width="${f1(X(b)-X(a))}" height="22" style="fill:${c}"/>`);
    s+=`<line x1="${f1(X(due))}" x2="${f1(X(due))}" y1="${L.zone-2}" y2="${L.zone+24}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    s+=`<line x1="${f1(X(g))}" x2="${f1(X(g))}" y1="${L.zone-4}" y2="${L.dose+6}" style="stroke:${cat[0]};stroke-width:2"/>`;
    /* doses */
    const next0=11.75,next=over?g+3.5:next0;
    s+=`<rect x="${f1(X(due)-8)}" y="${L.dose-5}" width="16" height="10" rx="5" style="fill:none;stroke:var(--drug);stroke-width:1.2;stroke-dasharray:2 2"/>`;
    s+=`<rect x="${f1(X(g)-8)}" y="${L.dose-5}" width="16" height="10" rx="5" style="fill:var(--drug)"/>`;
    if(over){s+=`<rect x="${f1(X(g+3))}" y="${L.dose-9}" width="${f1(X(g+4)-X(g+3))}" height="18" rx="5" style="fill:var(--drug-soft)"/>`;
      s+=`<rect x="${f1(X(next0)-8)}" y="${L.dose-5}" width="16" height="10" rx="5" style="fill:none;stroke:var(--drug);stroke-width:1.2;stroke-dasharray:2 2"/>`}
    s+=`<rect x="${f1(X(next)-8)}" y="${L.dose-5}" width="16" height="10" rx="5" style="fill:var(--drug);opacity:.8"/>`;
    s+=`<text x="${f1(X(next))}" y="${L.dose-12}" class="t-xs t-mid" style="fill:var(--drug)">next ${hm(next)}${over&&!N?' (3 to 4 h band)':''}</text>`;
    /* schematic effect */
    const E=h=>clamp([[g,3.5],[next,3.5]].reduce((e,[a,d])=>e+ramp(h,a+.25,a+.9)*(1-ramp(h,a+d-.6,a+d+.4)),0));
    let p=`M${f1(X(T0))} ${L.eB}`;for(let i=0;i<=136;i++){const h=T0+i/16;p+=`L${f1(X(h))} ${f1(L.eB-(L.eB-L.eT)*E(h))}`}
    s+=`<path d="${p}L${f1(X(T1))} ${L.eB}Z" style="fill:var(--drug-soft);stroke:var(--drug);stroke-width:1.3"/>`;
    s+=`<text x="${L.x1}" y="${L.eB+12}" class="t-xs t-end">effect, schematic</text>`;
    [[8.25,'Breakfast 08:15'],[12.5,'Lunch 12:30']].forEach(([h,n])=>{const ok=E(h+.2)>.6,x=X(h);
      s+=`<circle cx="${f1(x)}" cy="${L.meal}" r="7" style="fill:${ok?'var(--achr-soft)':'var(--warn-soft)'};stroke:${ok?'var(--achr)':'var(--warn)'};stroke-width:2"/>`;
      s+=`<text x="${f1(x)}" y="${L.mealT}" class="t-xs t-mid" style="fill:${ok?'var(--muted)':'var(--warn)'}">${n}${ok?'':' · trough'}</text>`});
    s+=`<text x="${L.x0}" y="${L.ft}" class="t-xs" style="fill:var(--ink)">${N?cat[1]:'NHS Scotland: doses are never doubled.'}</text>`;
    if(N){s+=`<text x="${L.x0}" y="${L.lg[0]}" class="t-xs">NHS Scotland: doses are never doubled.</text>`;
      s+=`<rect x="${L.x0}" y="${L.lg[1]-8}" width="10" height="10" style="fill:var(--good-soft)"/><text x="${L.x0+14}" y="${L.lg[1]}" class="t-xs">within 30 min</text>`;
      s+=`<rect x="${L.x0+110}" y="${L.lg[1]-8}" width="10" height="10" style="fill:var(--warn-soft)"/><text x="${L.x0+124}" y="${L.lg[1]}" class="t-xs">up to 1 h</text>`;
      s+=`<rect x="${L.x0+200}" y="${L.lg[1]-8}" width="10" height="10" style="fill:var(--bad-soft)"/><text x="${L.x0+214}" y="${L.lg[1]}" class="t-xs">over 1 h</text>`}
    else{s+=`<rect x="300" y="${L.ft-8}" width="10" height="10" style="fill:var(--good-soft)"/><text x="314" y="${L.ft}" class="t-xs">within 30 min</text><rect x="420" y="${L.ft-8}" width="10" height="10" style="fill:var(--warn-soft)"/><text x="434" y="${L.ft}" class="t-xs">up to 1 h late</text><rect x="550" y="${L.ft-8}" width="10" height="10" style="fill:var(--bad-soft)"/><text x="564" y="${L.ft}" class="t-xs">over 1 h late</text>`}
    lv.innerHTML=s;
    $('#nuLateNote').innerHTML=`<div class="kicker">${late2} minutes late</div><h4>${cat[1]}</h4>`+
      (late2<=30?'<p>The King\'s Health Partners bulletin treats pyridostigmine as a critical medicine to be given within 30 minutes of the due time, even if that does not fit the ward round. It warns that a late dose can cause excessive weakness or inability to swallow, and that missed or late doses can precipitate myasthenic crisis. [[KHP2025]]</p>'
       :late2<=60?'<p>This is outside the 30-minute standard. NHS Scotland\'s Q&A says a dose missed by up to 1 hour is taken and the usual schedule kept. Breakfast may now come before the dose has started to work, which is what the 30 to 60 minute lead time is meant to avoid. [[KHP2025,RightDecisionsPyrido2025]]</p>'
       :'<p>NHS Scotland\'s Q&A: a dose more than 1 hour late is taken immediately and the next is delayed 3 to 4 hours. Doses are never doubled. The Q&A also reports a known risk of adverse incidents from repeated missed doses. [[RightDecisionsPyrido2025]]</p>')+
      '<div class="nu-gap"><b>Where the evidence stops</b>No published study has measured the clinical outcomes of late or missed pyridostigmine doses in hospital. The 30-minute standard rests on NHS safety documents and charity guidance, not on outcome data. [[KHP2025,MyawareNurses]]</div>'+
      '<div class="hook"><b>Exam hook</b>Up to 1 hour late: give it and keep the schedule. Over 1 hour: give it now and push the next dose back 3 to 4 hours. <b>Never double.</b> [[RightDecisionsPyrido2025]]</div>'+
      '<div class="pt"><b>In plain words</b>If a tablet is late, take it when you remember. If it is very late, the next one moves later too. Never take two at once.</div>';
  }
  playWire(lr,$('#nuLatePlay'),drawLate,9000,'Replay','nursing');
  $('#nuAdmin').innerHTML=NU_ADMIN.map(a=>`<div class="card"><span class="tag ${a.tag[0]}" style="align-self:flex-start">${a.tag[1]}</span><h4>${a.n}</h4><ul>${a.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${a.c}</p></div>`).join('');
  $('#nuInfTbl').innerHTML=NU_TBL.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]} ${r[4]}</td></tr>`).join('');
  $('#nuMon').innerHTML=NU_MONC.map(a=>`<div class="card"><h4>${a.n}</h4><ul>${a.b.map(x=>`<li>${x}</li>`).join('')}</ul><p class="stage-cap">${a.c}</p></div>`).join('');

  /* ======== 3 · teaching ======== */
  $('#nuTeachLede').innerHTML='The nursing pharmacology text sets out what to teach about pyridostigmine, and the charities add what people most often get wrong on the ward. Pick a belief to see what the sources say, and a question that brings it out. [[OpenStaxPharmNurses,MyawareNurses]]';
  let myth=0;
  function renderMyths(){
    $('#nuMyths').innerHTML=NU_MYTHS.map((m,i)=>`<button class="nu-q" data-nm="${i}" aria-expanded="${i===myth}"><span class="myth">Often believed</span><b>${m.m}</b></button>`).join('');
    const M=NU_MYTHS[myth];
    $('#nuMythNote').innerHTML=`<div class="kicker">What the sources say</div><h4>${M.t}</h4><div class="nu-ans"><p>${M.a}</p><p><b>${M.q}</b></p></div>`;
  }
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyths()});
  renderMyths();
  $('#nuTeach').innerHTML=`
   <div class="card"><h4>Teaching points in the nursing text</h4><ul><li>MG treatment is lifelong.</li><li>The signs of underdosing (ptosis, trouble swallowing) and of cholinergic toxicity.</li><li>Keep a record of dose times, tired times, and strength before and after doses.</li><li>Wear a medical alert bracelet.</li><li>Do not stop pyridostigmine abruptly.</li><li>Rest between activities.</li><li>Contact the prescriber urgently for trouble swallowing, speaking or breathing.</li></ul><p class="stage-cap">[[OpenStaxPharmNurses]]</p></div>
   <div class="card"><h4>The emergency alert card</h4><ul><li>The MGFA Emergency Alert Card is a fillable card in English and Spanish, kept in a wallet, a glove box or on the fridge.</li><li>It warns first responders that MG weakness, drooping eyelids, double vision and breathing or swallowing trouble can be mistaken for intoxication, and may signal a crisis.</li><li>People on a C5 inhibitor also carry the REMS safety card for months after the last dose.</li></ul><p class="stage-cap">[[MGFACard,FDASoliris2026]]</p></div>
   <div class="card"><h4>Medicines that may worsen MG</h4><ul><li>Myaware notes more than 30 drugs that could in theory impair neuromuscular transmission.</li><li>It names telithromycin as the one drug that must be avoided (deaths reported), penicillamine as best avoided, and IV magnesium as to be avoided if possible.</li><li>For many neurology and psychiatry drugs it advises caution rather than a ban: a listed drug may still be used when needed, with the clinician watching closely.</li></ul><p><button class="btn" data-go="drugs">Open the drug checker</button></p><p class="stage-cap">[[MyawareDrugs,MGFA2024]]</p></div>
   <div class="card"><h4>Speech, swallowing and communication</h4><ul><li>Consider swallow safety and NG tubes; arrange regular speech and language therapy reviews.</li><li>When speech is affected, avoid long conversations and offer a pad and pen.</li><li>The patient questionnaire was one of the measures that correlated with aspiration on barium swallow, so asking the person is part of the screen.</li></ul><p class="stage-cap">[[MyawareNurses,Koopman2004]]</p></div>
   <div class="card"><h4>Fatigue, measured</h4><ul><li>Severe fatigue was present in 62% of 420 Dutch registry patients, linked to disease severity, female sex, BMI and depressive symptoms, and inversely to strenuous activity.</li><li>The MG-ADL is an 8-question patient-reported survey; in 254 encounters it correlated with the QMG (r = 0.583).</li></ul><p class="stage-cap">[[Ruiter2021,Wolfe1999]]</p></div>
   <div class="card"><h4>Children and families</h4><ul><li>Families of children with MG should be given a list of medicines that may worsen MG.</li><li>Ophthalmology input helps prevent amblyopia in young children with ptosis.</li><li>Steroid monitoring in children covers blood pressure, growth velocity and weight.</li></ul><p><button class="btn" data-go="living">Living with MG</button></p><p class="stage-cap">[[OConnell2020]]</p></div>`;

  /* ======== 4 · documentation ======== */
  $('#nuDocLede').innerHTML='The sources ask for a short list of things to be written down: the baseline, the serial numbers with the position they were taken in, the response to each dose, and, for the biologics, vaccination and the safety card. Tick what you observed and the entry assembles beside it. [[MyawareNurses,Elsheikh2016,Guidon2021,FDASoliris2026]]';
  const st={};NU_DOCI.forEach(f=>st[f.k]=f.c);
  function renderDoc(){
    $('#nuDoc').innerHTML=NU_DOCI.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${st[f.k]?'checked':''}><span>${f.l} ${f.s}</span></label>`).join('');
    const lines=NU_DOCI.filter(f=>st[f.k]).map(f=>f.v);
    $('#nuDocOut').textContent=lines.length?lines.join('\n'):'Nothing ticked yet.';
  }
  $('#nuDoc').addEventListener('change',e=>{const i=e.target.closest('[data-nd]');if(!i)return;st[i.dataset.nd]=i.checked;
    $('#nuDocOut').textContent=NU_DOCI.filter(f=>st[f.k]).map(f=>f.v).join('\n')||'Nothing ticked yet.'});
  $('#nuDocAll').onclick=()=>{NU_DOCI.forEach(f=>st[f.k]=true);renderDoc()};
  $('#nuDocNone').onclick=()=>{NU_DOCI.forEach(f=>st[f.k]=false);renderDoc()};
  renderDoc();
  $('#nuGaps').innerHTML=`<p><b>Where the evidence stops.</b> These gaps were found while writing this page and are left open rather than filled in:</p><ul>
    <li>No study measures the outcomes of late or missed in-hospital pyridostigmine doses; the 30-minute rule is a safety standard, not a trial result. [[KHP2025,RightDecisionsPyrido2025]]</li>
    <li>The "20/30/40" rule is from Guillain-Barré syndrome; MG thresholds here come from one series of 42 patients, and another small series found serial vital capacity unhelpful. [[Lawn2001,Thieben2005,Rieder1995]]</li>
    <li>Hypocalcaemia and hypotension during plasma exchange are widely taught, but MG-specific rates were not verified. [[Ebadi2013]]</li>
    <li>The US Mestinon label does not address crushing Timespan; the "do not crush" teaching comes from the nursing text. [[FDAMestinon2020,OpenStaxPharmNurses]]</li>
    <li>"Saturation is a late sign" has no MG-specific number behind it; the 54% figure is from chronic neuromuscular disease. [[Gray2024]]</li>
    <li>Sources disagree on the dose lead time before meals (20 vs 30 to 60 minutes) and on the upper daily dose (360 vs 600 mg or more). [[MyawareNurses,RightDecisionsPyrido2025,FDAMestinon2020]]</li></ul>`;
  /* redraw the two extra stages on a narrow/wide switch; stop the counter on leaving */
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawSb(+sr.value)};
  const prevH=onHide.nursing;onHide.nursing=()=>{prevH&&prevH();sbStopF()};
  draw(+rg.value);drawSb(+sr.value);drawLate(+lr.value);
};
