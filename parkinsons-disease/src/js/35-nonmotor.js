/* =============== 3.5 nonmotor: beyond movement =============== */
/* kinds of figure, so a point prevalence is never read as a lifetime risk */
const NM_KIND={pt:['prevalence','var(--sage)'],cum:['over years','var(--violet)'],late:['20-year survivors','var(--rose)'],obj:['on testing','var(--sky)'],ask:['when asked','var(--muted)']};
/* body-map domains: hotspot in body coordinates (300 x 380 box), colour, bars [label, %, lo, hi, kind] */
const NM_DOM=[
 {id:'all',s:'all',n:'All domains',hx:150,hy:180,c:'var(--sage)',src:'PRIAMO, 1,072 people, 55 Italian centres',
  rows:[['At least one non-motor symptom',98.6,null,null,'pt'],['Psychiatric symptoms (any)',67,null,null,'pt'],['Fatigue',58,null,null,'pt'],['Anxiety',56,null,null,'pt'],['Leg pain',38,null,null,'pt'],['Insomnia',37,null,null,'pt']],
  foot:'Mean 7.8 non-motor symptoms per person (range 0 to 32)'},
 {id:'mood',s:'mood',n:'Mood and motivation',hx:128,hy:50,c:'var(--violet)',src:'systematic reviews and meta-analyses',
  rows:[['Clinically significant depressive symptoms',35,null,null,'pt'],['Minor depression',22,null,null,'pt'],['Major depressive disorder',17,null,null,'pt'],['Dysthymia',13,null,null,'pt'],['Anxiety disorders',31,null,null,'pt'],['Apathy',39.8,null,null,'pt']],
  foot:'Published depression rates range from 2.7% to over 90%, by method'},
 {id:'psy',s:'psychosis',n:'Hallucinations and delusions',hx:166,hy:66,c:'var(--rose)',src:'Norwegian cohort (230 people) and Sydney cohort',
  rows:[['Hallucinations or delusions, 12 years',60,null,null,'cum'],['Hallucinations, 20-year survivors',74,null,null,'late']],
  foot:'Incidence 79.7 per 1,000 person-years'},
 {id:'cog',s:'thinking',n:'Thinking and dementia',hx:150,hy:30,c:'var(--violet)',src:'MDS Task Force, systematic review and three cohorts',
  rows:[['Mild cognitive impairment (range of studies)',27,19,38,'pt'],['Dementia, all studies (95% CI)',24.5,17.4,31.5,'pt'],['Dementia, best-quality studies',31.1,null,null,'pt'],['Dementia by 10 years (CamPaIGN)',46,null,null,'cum'],['Dementia by 8 years, Norway (95% CI)',78.2,71.1,84.0,'cum'],['Dementia, 20-year survivors',83,null,null,'late']],
  foot:'Early hallucinations predicted dementia (OR 3.1)'},
 {id:'sleep',s:'sleep',n:'Sleep',hx:210,hy:24,c:'var(--sage)',src:'2023 meta-analysis; Sydney cohort',
  rows:[['REM sleep behaviour disorder',46,null,null,'pt'],['Insomnia',44,null,null,'pt'],['Excessive daytime sleepiness',35,null,null,'pt'],['Daytime sleepiness, 20-year survivors',70,null,null,'late']],
  foot:'No qualifying randomised trial for RBD in Parkinson\'s (MDS 2019)'},
 {id:'bp',s:'blood pressure',n:'Blood pressure on standing',hx:166,hy:142,c:'var(--vessel)',src:'meta-analysis of 25 studies; Sydney cohort',
  rows:[['Orthostatic hypotension (95% CI)',30.1,22.9,38.4,'pt'],['Symptomatic postural hypotension, 20-year survivors',48,null,null,'late']],
  foot:'Fall of at least 20/10 mmHg within 3 minutes of standing'},
 {id:'swal',s:'swallowing',n:'Swallowing and saliva',hx:150,hy:102,c:'var(--warn)',src:'meta-analysis; PRIAMO; NMSS study; Sydney cohort',
  rows:[['Swallowing problems, when asked (95% CI)',35,28,41,'ask'],['Swallowing problems, on testing (95% CI)',82,77,87,'obj'],['Controls, on testing',23,null,null,'obj'],['Drooling (PRIAMO)',31,null,null,'pt'],['Dribbling saliva (NMSS study)',56.7,null,null,'pt'],['Choking, 20-year survivors',48,null,null,'late']],
  foot:'Under-reported: 35% say so, 82% on testing'},
 {id:'gu',s:'bladder, bowel',n:'Bladder and bowel',hx:150,hy:226,c:'var(--glia)',src:'PRIAMO; NMSS study; Sydney cohort',
  rows:[['Urgency or nocturia (PRIAMO)',35,null,null,'pt'],['Nocturia (NMSS study)',68.4,null,null,'pt'],['Urinary incontinence, 20-year survivors',71,null,null,'late']],
  foot:'Constipation before diagnosis: RR 2.34 for later Parkinson\'s'},
 {id:'pain',s:'pain, fatigue',n:'Pain and fatigue',hx:126,hy:318,c:'var(--bad)',src:'PRIAMO; NMSS study',
  rows:[['Fatigue (PRIAMO)',58,null,null,'pt'],['Fatigue (NMSS study)',65.9,null,null,'pt'],['Leg pain (PRIAMO)',38,null,null,'pt']],
  foot:'Apathy was most tied to worse quality of life (PRIAMO)'}
];
const NM_STEPS=[
 {from:0,at:.07,k:'Common',t:'Most people have non-motor symptoms',
  txt:`In PRIAMO, 1,072 people with Parkinson's were interviewed across 55 Italian centres: 98.6% reported at least one non-motor symptom, with a mean of 7.8 each (range 0 to 32). Psychiatric symptoms were the most frequent domain (67%), and non-motor symptoms became more frequent as the disease lasted longer and grew more severe. In an international study of 411 people, the Non-Motor Symptoms Scale tracked quality of life more closely (rS 0.70) than a motor score did (0.58). [[Barone2009,Martinez-Martin2011]]`,
  pt:`Almost everyone with Parkinson's has symptoms that are not about movement, usually several at once.`,
  hook:`PRIAMO: <b>98.6%</b> have at least one non-motor symptom; mean <b>7.8</b> each. [[Barone2009]]`},
 {from:.11,at:.18,k:'Mood',t:'Depression, anxiety and apathy',
  txt:`A systematic review of 36 studies found major depressive disorder in 17%, minor depression in 22% and dysthymia in 13%; clinically significant depressive symptoms were present in 35%. Published rates range from 2.7% to over 90% depending on method: structured interviews found major depression in 19%, against 7% without them. Anxiety disorders averaged 31% across 45 studies (generalized anxiety 14%, panic disorder 6.8%). Apathy was pooled at 39.8%; about half of people with apathy also had depression (57.2%), and the other half had neither depression nor cognitive impairment, which supports apathy as a separate syndrome. [[Reijnders2008,Broen2016,denBrok2015]]`,
  pt:`Low mood, worry and loss of motivation are common, and apathy is not simply depression under another name.`,
  hook:`Apathy <b>39.8%</b> · anxiety disorders <b>31%</b> · clinically significant depression <b>35%</b>. [[denBrok2015,Broen2016,Reijnders2008]]`},
 {from:.22,at:.29,k:'Psychosis',t:'Hallucinations and delusions',
  txt:`In a population-based Norwegian cohort of 230 people followed for 12 years, 60% developed hallucinations or delusions (79.7 per 1,000 person-years). Independent risk factors were older age at onset, a higher baseline levodopa-equivalent dose, probable REM sleep behaviour disorder and time. Among Sydney survivors at 20 years, 74% had hallucinations. In another population-based study, hallucinations were the strongest predictor of moving into a nursing home over 4 years. The approach is set out step by step below. [[Forsaa2010,Hely2008,Aarsland2000]]`,
  pt:`Seeing or believing things that are not there becomes common over the years, and it is one of the main reasons people move into care.`,
  hook:`Psychosis risk factors: <b>older onset, higher dopaminergic dose, RBD, time</b>. [[Forsaa2010]]`},
 {from:.33,at:.4,k:'Cognition',t:'Thinking changes and dementia',
  txt:`The MDS Task Force criteria for mild cognitive impairment in Parkinson's (PD-MCI) need established Parkinson's, a gradual decline noticed by the person, an informant or a clinician, deficits on testing, and preserved independence; mean prevalence was 27% (range 19 to 38%) in people without dementia. A systematic review found dementia in 24.5% (31.1% in the best studies). Over time it becomes common: 46% at 10 years in the CamPaIGN incident cohort, 78.2% at 8 years in a Norwegian cohort, and 83% of Sydney survivors at 20 years. In CamPaIGN, 23% had a "good outcome" at 10 years: alive without dementia or postural instability. [[Litvan2012,Aarsland2005,Williams-Gray2013,Aarsland2003,Hely2008]]`,
  pt:`Thinking changes are common, mild at first. Over many years most people develop dementia, but timing varies widely, and some are still free of it at 10 years.`,
  hook:`Read the label on each bar: <b>24.5%</b> is prevalence at one time; <b>83%</b> is among people who survived 20 years. [[Aarsland2005,Hely2008]]`},
 {from:.44,at:.51,k:'Sleep',t:'Nights and days',
  txt:`A 2023 meta-analysis pooled REM sleep behaviour disorder (acting out dreams) at 46%, insomnia at 44% and excessive daytime sleepiness at 35%. Among Sydney survivors at 20 years, 70% had excessive daytime sleepiness. The 2019 MDS review found no qualifying randomised trial for RBD in Parkinson's. RBD as an early sign is covered in <a href="#prodrome" data-go="prodrome">Before the tremor</a>. [[Maggi2023,Hely2008,Seppi2019]]`,
  pt:`Acting out dreams, poor sleep at night and sleepiness by day are each common.`,
  hook:`Pooled: RBD <b>46%</b>, insomnia <b>44%</b>, daytime sleepiness <b>35%</b>. [[Maggi2023]]`},
 {from:.55,at:.62,k:'Autonomic',t:'Blood pressure on standing',
  txt:`A meta-analysis of 25 studies put orthostatic hypotension at 30.1% (95% CI 22.9 to 38.4%), with large heterogeneity. It is defined as a sustained fall of at least 20 mmHg systolic or 10 mmHg diastolic within 3 minutes of standing or head-up tilt; a heart-rate rise of less than 15 beats a minute during the fall suggests a neurogenic cause. Among Sydney survivors at 20 years, 48% had symptomatic postural hypotension. [[Velseboer2011,Gibbons2017,Hely2008]]`,
  pt:`Blood pressure can drop on standing up, causing dizziness, fainting or falls.`,
  hook:`OH: <b>≥20 systolic or ≥10 diastolic within 3 minutes</b>; a heart-rate rise <b>under 15 bpm</b> suggests a neurogenic cause. [[Gibbons2017]]`},
 {from:.66,at:.73,k:'Swallowing',t:'Swallowing and saliva',
  txt:`When asked, 35% of people reported swallowing problems; on objective testing the pooled prevalence was 82%, against 23% in controls, so problems are under-reported unless looked for. A 15-item questionnaire (SDQ) would have referred half of the people who denied any problem. Drooling affected 31% in PRIAMO and dribbling saliva 56.7% in the international NMSS study. Choking was reported by 48% of Sydney survivors at 20 years. [[Kalf2012,Manor2007,Barone2009,Martinez-Martin2011,Hely2008]]`,
  pt:`Most people have some swallowing difficulty when it is tested, far more than notice it themselves.`,
  hook:`Dysphagia: <b>35% when asked, 82% on testing</b>. [[Kalf2012]]`},
 {from:.77,at:.84,k:'Bladder and bowel',t:'Bladder and bowel',
  txt:`Urinary urgency or nocturia affected 35% in PRIAMO, and nocturia was the most frequent complaint (68.4%) in the international NMSS study. Urinary incontinence affected 71% of Sydney survivors at 20 years. No pooled prevalence of constipation in established Parkinson's was captured for this guide; in one meta-analysis, constipation was linked to later Parkinson's (RR 2.34) and may be an early feature rather than a cause. [[Barone2009,Martinez-Martin2011,Hely2008,Noyce2012]]`,
  pt:`Needing to pass urine at night, urgency and constipation are common, and constipation can come before the diagnosis.`,
  hook:`Nocturia was the <b>most frequent</b> complaint in the NMSS study (68.4%). [[Martinez-Martin2011]]`},
 {from:.88,at:.95,k:'Pain and fatigue',t:'Pain and tiredness',
  txt:`Fatigue was the commonest non-motor symptom in PRIAMO (58%) and affected 65.9% in the NMSS study; leg pain affected 38%. In PRIAMO, apathy was the symptom most associated with worse quality of life, and fatigue, attention and memory problems and psychiatric symptoms also lowered it. [[Barone2009,Martinez-Martin2011]]`,
  pt:`Tiredness and pain are among the most common complaints, and they weigh on everyday life.`,
  hook:`PRIAMO: <b>fatigue 58%</b> was the most common single symptom; <b>apathy</b> was most tied to poor quality of life. [[Barone2009]]`}
];
const NM_PS=[
 {from:0,at:.07,k:'Step 1 · Ask and look',t:'Ask, and look for a medical cause',
  txt:`NICE asks about hallucinations and delusions at reviews and after any change in Parkinson's medicines, and recommends a general medical evaluation. Parkinson's UK hospital guidance lists infection, dehydration and constipation among causes of confusion to look for and treat. Known risk factors for psychosis include older age at onset, a higher dopaminergic dose and REM sleep behaviour disorder. [[NICE2017,PUKEmergency2023,Forsaa2010]]`,
  pt:`First ask about it, then check for an illness or other cause that could be behind it.`,
  hook:`NICE: ask at reviews <b>and after every medicine change</b>. [[NICE2017]]`},
 {from:.16,at:.23,k:'Step 2 · Tolerated?',t:'Well tolerated: not treated',
  txt:`NICE advises not treating hallucinations and delusions if they are well tolerated. [[NICE2017]]`,
  pt:`If the experiences are not distressing, guidelines do not add a medicine just for them.`},
 {from:.33,at:.44,k:'Step 3 · Reduce',t:'Reduce the medicines that may have triggered it',
  txt:`Next NICE suggests reducing any Parkinson's medicines that might have triggered the hallucinations or delusions, with specialist advice. The NICE text read for this guide sets no fixed order. The sources do link some medicines more than others: agonists carry more risk of hallucinations than other add-ons, amantadine caused visual hallucinations in 23.8% in its trial, and a higher levodopa-equivalent dose was a risk factor. Any reduction trades against movement, and Parkinson's medicines must never be stopped suddenly: NICE warns of acute akinesia and neuroleptic malignant syndrome. [[NICE2017,Pahwa2017,Forsaa2010]]`,
  pt:`A specialist may lower the medicine most likely to be causing it, step by step, watching movement as they go.`,
  hook:`NICE: reduce the triggering medicines <b>with specialist advice</b>; never stop Parkinson's medicines abruptly. [[NICE2017]]`},
 {from:.5,at:.6,k:'Step 4 · Treat',t:'Then a medicine for psychosis',
  txt:`If symptoms persist, the 2019 MDS review rates clozapine "efficacious" and "clinically useful", with specialized monitoring, and pimavanserin "efficacious" and "clinically useful". In the Parkinson Study Group trial, 60 people on low-dose clozapine (mean 24.7 mg a day, weekly blood counts) improved 1.6 points on the Clinical Global Impression against 0.5 on placebo, without worse parkinsonism. Pimavanserin 40 mg cut the SAPS-PD psychosis score by 5.79 against 2.73 points over 6 weeks (difference −3.06, Cohen's d 0.50), without motor worsening; the FDA approved it on 29 Apr 2016 with a boxed warning about increased mortality in older people with dementia-related psychosis. NICE offers clozapine if standard treatment fails, with registration with a patient monitoring service. [[Seppi2019,PSG1999,Cummings2014,openFDA2026,NICE2017]]`,
  pt:`Two medicines have good trial evidence in Parkinson's psychosis without worsening movement: low-dose clozapine, which needs regular blood tests, and pimavanserin.`,
  hook:`MDS 2019: <b>clozapine</b> and <b>pimavanserin</b> efficacious and clinically useful. [[Seppi2019]]`},
 {from:.66,at:.74,k:'Step 5 · Disagreement',t:'Quetiapine: NICE and MDS differ',
  txt:`NICE suggests considering quetiapine for people without cognitive impairment. The 2019 MDS review rates it "insufficient evidence", because no high-quality randomised trial shows it works, yet calls low-dose quetiapine a "pragmatic first choice" on safety grounds. NICE also notes that lower doses of quetiapine and clozapine are needed in Parkinson's than in other conditions. [[NICE2017,Seppi2019]]`,
  pt:`Quetiapine is chosen for safety rather than proof: trials have not shown that it works, and the two guidelines weigh that differently.`,
  hook:`Quetiapine: NICE <b>consider</b> (no cognitive impairment) · MDS <b>insufficient evidence, possibly useful</b>. [[NICE2017,Seppi2019]]`},
 {from:.82,at:.92,k:'Step 6 · Avoid',t:'What to avoid',
  txt:`NICE: do not offer olanzapine (the MDS review rates it not efficacious, with unacceptable risk); other antipsychotics such as phenothiazines and butyrophenones, the class that includes haloperidol, can worsen motor features. Parkinson's UK and the Parkinson's Foundation list haloperidol and other typical antipsychotics, and the anti-sickness drugs metoclopramide and prochlorperazine, among drugs to avoid. MDS warns that all atypical antipsychotics need great caution in people with dementia, because of falls, cognitive worsening, pneumonia, cardiovascular effects, stroke and death, and pimavanserin's controlled safety data do not extend beyond 6 weeks. [[NICE2017,Seppi2019,PUKEmergency2023,PF2023]]`,
  pt:`Older antipsychotics such as haloperidol, and some anti-sickness medicines, block dopamine and can make Parkinson's much worse.`,
  hook:`Avoid <b>haloperidol</b> and other typical antipsychotics, <b>olanzapine</b>, <b>metoclopramide</b> and <b>prochlorperazine</b>. [[NICE2017,PUKEmergency2023,PF2023]]`}
];
const NM_OPT=[
 {cap:'EXPRESS: changes over 24 weeks, drug against placebo. The one-year rule timeline is schematic.',
  k:'Dementia',t:'Rivastigmine, and the one-year rule',
  txt:`In EXPRESS, 541 people whose dementia began at least 2 years after their Parkinson's diagnosis took rivastigmine (3 to 12 mg a day) or placebo for 24 weeks. On the 70-point ADAS-cog, rivastigmine improved scores by 2.1 points while placebo worsened by 0.7. Clinically meaningful improvement on the global rating was 19.8% against 14.5%, and worsening 13.0% against 23.1%; nausea, vomiting and tremor were more frequent. The FDA record shows an Exelon efficacy supplement on 27 June 2006, and the label now lists mild-to-moderate dementia associated with Parkinson's (the link between the two is inferred from the date). MDS 2019 rates rivastigmine efficacious and clinically useful; donepezil and galantamine possibly useful; memantine investigational. NICE offers a cholinesterase inhibitor for mild or moderate Parkinson's dementia. The DLB Consortium keeps the 1-year rule (dementia before or within about a year of parkinsonism points to dementia with Lewy bodies; later, Parkinson's disease dementia) and calls the cut-off arbitrary but clinically useful. [[Emre2004,openFDA2026,Seppi2019,NICE2017,McKeith2017]]`,
  pt:`One medicine, rivastigmine, has a licence for Parkinson's dementia; its effect is modest. Whether a dementia is called Parkinson's dementia or Lewy body dementia depends mainly on timing.`,
  hook:`<b>1-year rule</b>: dementia within a year of parkinsonism → DLB; later → PDD. The consortium calls it <b>arbitrary</b>. [[McKeith2017]]`},
 {cap:'Bars scaled within each panel. HAM-D is a depression rating scale; a larger fall is better.',
  k:'Depression',t:'Antidepressants and talking therapy',
  txt:`In a 12-week trial of 115 people, HAM-D fell 6.2 points more than placebo on paroxetine and 4.2 points more on venlafaxine XR, with no worsening of motor function. In a trial of 80 people, 10 weeks of Parkinson's-adapted CBT improved HAM-D by 7.35 points against 0.05 with clinical monitoring, and 56% against 8% responded; blinding is impossible in such trials and adverse events were reported in a limited way. MDS 2019 rates venlafaxine efficacious and clinically useful, CBT likely efficacious and possibly useful, and some SSRIs (paroxetine, citalopram, fluoxetine) insufficient evidence but possibly useful. [[Richard2012,Dobkin2011,Seppi2019]]`,
  pt:`Both an antidepressant and a talking therapy adapted for Parkinson's helped depression in trials.`,
  hook:`MDS 2019: <b>venlafaxine</b> efficacious; <b>CBT</b> likely efficacious. [[Seppi2019]]`},
 {cap:'Schematic blood-pressure trace. The droxidopa bar shows what the label says about duration; ratings are from MDS 2019 and NICE.',
  k:'Blood pressure',t:'Medicines for orthostatic hypotension',
  txt:`NICE's first step is to review medicines that can lower blood pressure: antihypertensives including diuretics, dopaminergics, anticholinergics and antidepressants. Then it suggests considering midodrine, with monitoring for high blood pressure when lying down, and fludrocortisone if midodrine is unsuitable (both off-label in 2017). MDS 2019 rates midodrine and fludrocortisone insufficient evidence but possibly useful, and droxidopa efficacious in the short term and possibly useful. Droxidopa received FDA priority approval on 18 Feb 2014 for symptomatic neurogenic orthostatic hypotension, including in Parkinson's; its label says that "effectiveness beyond 2 weeks of treatment has not been established" and carries a boxed warning for supine hypertension. [[NICE2017,Seppi2019,openFDA2026]]`,
  pt:`First the medicines that may be lowering blood pressure are reviewed. The drugs that raise it have modest evidence, and one is proven only for two weeks.`,
  hook:`Droxidopa (2014): effectiveness <b>beyond 2 weeks not established</b>; boxed warning for <b>supine hypertension</b>. [[openFDA2026]]`},
 {cap:'Consensus measures for neurogenic orthostatic hypotension, as published by the panel. Reported for study, not as individual advice.',
  k:'Blood pressure',t:'Measures without medicines',
  txt:`A consensus panel on neurogenic orthostatic hypotension lists: at least about 2 litres of water a day; drinking about 500 mL within 5 minutes, which can raise systolic pressure by about 30 mmHg within 5 minutes for up to an hour; adding 1 to 2 teaspoons (2.3 to 4.6 g) of salt a day if appropriate; raising the head of the bed by 6 to 9 inches (15 to 23 cm), not with stacked pillows; and compression garments of 30 to 40 mmHg. [[Gibbons2017]]`,
  pt:`Water, salt where appropriate, a raised bed head and compression garments can all help blood pressure on standing.`,
  hook:`Water bolus: <b>about 500 mL in 5 minutes</b> → systolic up about <b>30 mmHg</b> for up to an hour. [[Gibbons2017]]`},
 {cap:'Bed-safety steps from the AASM 2023 good-practice statement, drawn schematically.',
  k:'Dream enactment',t:'REM sleep behaviour disorder',
  txt:`The AASM 2023 guideline makes a good-practice statement on bed safety: remove bedside weapons and objects that could be thrown or wielded, move or pad sharp furniture, put a soft mat beside the bed, and with severe uncontrolled RBD sleep apart from the partner or at least put a pillow between them. For RBD due to a medical condition it makes conditional suggestions for clonazepam, immediate-release melatonin and, in Parkinson's, transdermal rivastigmine, and advises against deep brain stimulation for RBD. NICE suggests considering clonazepam or melatonin after a medicines review (both off-label in 2017). The 2019 MDS review found no qualifying randomised trial, so the drug evidence is weak. [[Howell2023,NICE2017,Seppi2019]]`,
  pt:`Making the bedroom safe comes first. The medicines suggested have little trial evidence in Parkinson's.`,
  hook:`RBD: <b>bed safety first</b>; clonazepam or melatonin are conditional suggestions; <b>no qualifying RCT</b> in Parkinson's (MDS 2019). [[Howell2023,Seppi2019]]`},
 {cap:'Schematic head showing the two salivary glands MDS says to inject. Ratings from MDS 2019; sequence from NICE.',
  k:'Drooling',t:'Saliva control',
  txt:`NICE suggests speech and language therapy first, then glycopyrronium bromide, then referral for botulinum toxin A; other anticholinergics only if the risk of cognitive side effects is minimal. MDS 2019 rates botulinum toxin A and B efficacious and clinically useful, with specialized monitoring, and glycopyrrolate efficacious and possibly useful; both the parotid and submandibular glands should be injected. [[NICE2017,Seppi2019]]`,
  pt:`Speech therapy comes first; then a tablet that dries saliva; then injections into the salivary glands.`,
  hook:`Drooling: <b>speech therapy → glycopyrronium → botulinum toxin A</b> (NICE). [[NICE2017]]`},
 {cap:'Every rating named in this module, by the 2019 MDS evidence category. "Possibly useful" and "clinically useful" are separate practice ratings, in the note.',
  k:'MDS 2019',t:'The ratings at a glance',
  txt:`The 2019 MDS evidence-based review covered Level I studies through 2016. It rates efficacy (efficacious, likely efficacious, insufficient evidence, not efficacious) separately from practice implications (clinically useful, possibly useful, investigational, not useful). It found no qualifying randomised trials for anxiety disorders, RBD, excessive sweating, impaired smell or eye problems, and no clinically useful treatment for non-dementia cognitive impairment. For constipation it rates probiotics and prebiotic fibre efficacious and clinically useful, macrogol and lubiprostone likely efficacious, and advises always recommending fibre and fluid; sildenafil is efficacious for erectile dysfunction; modafinil possibly useful for daytime sleepiness; rivastigmine efficacious for apathy on one small study. [[Seppi2019]]`,
  pt:`For several non-motor symptoms there is good evidence; for others, such as anxiety and dream enactment, no qualifying trials exist.`,
  hook:`No qualifying RCTs (MDS 2019): <b>anxiety, RBD, sweating, smell, eyes</b>. [[Seppi2019]]`}
];
const NM_MDS=[
 ['Efficacious','var(--good)',[['rivastigmine','dementia'],['clozapine','psychosis'],['pimavanserin','psychosis'],['venlafaxine','depression'],['droxidopa (short term)','low BP on standing'],['botulinum toxin A, B','drooling'],['glycopyrrolate','drooling'],['probiotics, prebiotic fibre','constipation'],['sildenafil','erectile dysfunction'],['rivastigmine','apathy']]],
 ['Likely efficacious','var(--sky)',[['CBT','depression'],['macrogol','constipation'],['lubiprostone','constipation']]],
 ['Insufficient evidence','var(--warn)',[['donepezil','dementia'],['galantamine','dementia'],['quetiapine','psychosis'],['some SSRIs','depression'],['midodrine','low BP on standing'],['fludrocortisone','low BP on standing'],['modafinil','daytime sleepiness']]],
 ['Not efficacious or investigational','var(--bad)',[['olanzapine','psychosis: not efficacious'],['memantine','dementia: investigational']]]
];
inits.nonmotor=()=>{
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* ---------- 1. body map with prevalence bars ---------- */
  const svg=$('#nmSvg'),rg=$('#nmT');
  function body(ox,oy,k){const P=(x,y)=>f1(ox+x*k)+' '+f1(oy+y*k),w=v=>f1(v*k);
    let s=`<path d="M${P(100,118)} L${P(70,236)} L${P(64,264)} M${P(200,118)} L${P(230,236)} L${P(236,264)}" style="fill:none;stroke:var(--cell-line);stroke-width:${w(20)};stroke-linecap:round;stroke-linejoin:round;opacity:.35"/>`;
    s+=`<path d="M${P(124,250)} L${P(118,372)} M${P(176,250)} L${P(182,372)}" style="fill:none;stroke:var(--cell-line);stroke-width:${w(26)};stroke-linecap:round;opacity:.35"/>`;
    s+=`<path d="M${P(98,112)} Q${P(150,100)} ${P(202,112)} L${P(214,252)} Q${P(150,270)} ${P(86,252)} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<rect x="${f1(ox+139*k)}" y="${f1(oy+88*k)}" width="${w(22)}" height="${w(22)}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<circle cx="${f1(ox+150*k)}" cy="${f1(oy+54*k)}" r="${w(38)}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<ellipse cx="${f1(ox+150*k)}" cy="${f1(oy+46*k)}" rx="${w(27)}" ry="${w(19)}" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:1;opacity:.8"/>`;
    s+=`<path d="M${P(132,40)} q${w(6)} ${w(-8)} ${w(12)} 0 t${w(12)} 0 t${w(12)} 0 M${P(136,54)} q${w(6)} ${w(-6)} ${w(12)} 0 t${w(12)} 0" style="fill:none;stroke:var(--violet);stroke-width:1;opacity:.6"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const k=N?.72:1,ox=N?92:22,oy=N?8:10;
    const BP=N?{x0:20,x1:310,y:318,rh:48,tY:298}:{x0:344,x1:640,y:66,rh:50,tY:30};
    const p=phaseOf(NM_STEPS,t),D=NM_DOM[p];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=body(ox,oy,k);
    /* sleep moon beside the head */
    const mx=ox+214*k,my=oy+22*k;
    s+=`<path d="M${f1(mx+6*k)} ${f1(my-9*k)} a${f1(10*k)} ${f1(10*k)} 0 1 0 ${f1(4*k)} ${f1(17*k)} a${f1(8*k)} ${f1(8*k)} 0 0 1 ${f1(-4*k)} ${f1(-17*k)} Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:1.2;opacity:.8"/>`;
    /* hotspots */
    const pulse=.5+.5*Math.sin(t*Math.PI*60);
    NM_DOM.forEach((d,i)=>{if(!i)return;const x=ox+d.hx*k,y=oy+d.hy*k,cur=i===p||p===0,o=p===0?ease(ramp(t,.01+i*.006,.03+i*.006)):1;
      s+=`<g class="clk" data-dom="${i}" style="opacity:${f1(o)}">`;
      if(i===p)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1((15+5*pulse)*k)}" style="fill:${d.c};opacity:${f1(.12+.12*pulse)}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1((i===p?10:7)*k)}" style="fill:${cur?d.c:'var(--panel)'};stroke:${d.c};stroke-width:1.8"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(14*k)}" style="fill:transparent"/></g>`});
    if(p===0){const r=ease(ramp(t,.005,.06));s+=`<ellipse cx="${f1(ox+150*k)}" cy="${f1(oy+196*k)}" rx="${f1(140*k*r)}" ry="${f1(186*k*r)}" style="fill:none;stroke:var(--sage);stroke-width:1.6;stroke-dasharray:4 5;opacity:.6"/>`}
    /* domain name on the body side */
    if(p){const x=ox+D.hx*k,y=oy+D.hy*k,left=D.hx<150||p===3,ex=left?ox+90*k:Math.max(ox+214*k,x+26);
      s+=`<path d="M${f1(x+(left?-11:11)*k)} ${f1(y)} L${f1(ex)} ${f1(y)}" style="stroke:${D.c};stroke-width:1.2;stroke-dasharray:2 3"/>`;
      s+=`<text x="${f1(left?ex-4:ex+4)}" y="${f1(y+3)}" class="t-xs${left?' t-end':''}" style="fill:${D.c};font-weight:700">${D.s}</text>`}
    /* bars */
    s+=`<text x="${BP.x0}" y="${BP.tY}" class="t-sm" style="fill:${D.c}">${D.n.toUpperCase()}</text><text x="${BP.x0}" y="${BP.tY+14}" class="t-xs">${D.src}</text>`;
    const sc=(BP.x1-BP.x0)/100,yE=BP.y+D.rows.length*BP.rh-8;
    [0,50,100].forEach(v=>{s+=`<line x1="${f1(BP.x0+v*sc)}" x2="${f1(BP.x0+v*sc)}" y1="${BP.y-2}" y2="${yE}" class="grid"/>`});
    D.rows.forEach(([lab,v,lo,hi,kind],i)=>{const g=ease(ramp(t,NM_STEPS[p].from+.004+i*.007,NM_STEPS[p].from+.045+i*.007)),y=BP.y+i*BP.rh,K=NM_KIND[kind];
      s+=`<text x="${BP.x0}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
      s+=`<text x="${BP.x0}" y="${y+36}" class="t-xs" style="fill:${K[1]};opacity:${f1(ramp(g,.3,1))}">${K[0]}</text>`;
      s+=`<rect x="${BP.x0}" y="${y+13}" width="${f1(BP.x1-BP.x0)}" height="12" rx="3" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${BP.x0}" y="${y+13}" width="${f1(v*sc*g)}" height="12" rx="3" style="fill:${K[1]}"/>`;
      if(lo!=null&&g>.9)s+=`<path d="M${f1(BP.x0+lo*sc)} ${y+19} H${f1(BP.x0+hi*sc)} M${f1(BP.x0+lo*sc)} ${y+14} v10 M${f1(BP.x0+hi*sc)} ${y+14} v10" style="stroke:var(--ink);stroke-width:1.3"/>`;
      s+=`<text x="${f1(BP.x1+8)}" y="${y+23}" class="t-lbl" style="opacity:${f1(ramp(g,.5,1))}">${v}%</text>`});
    s+=`<text x="${BP.x0}" y="${yE+18}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(t,NM_STEPS[p].from+.04,NM_STEPS[p].from+.06))}">${D.foot}</text>`;
    svg.innerHTML=s;
    setSt(p);$('#nmNote').innerHTML=noteHTML(NM_STEPS[p]);
    $('#nmCap').textContent=`Domain ${p+1} of ${NM_STEPS.length}: ${D.n}. Click a point on the body or a step to choose. The figure is schematic; every bar is a published figure.`;
  }
  const stop=playWire(rg,$('#nmPlay'),draw,24000,'Replay','nonmotor');
  const setSt=stepWire($('#nmSteps'),NM_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dom]');if(!g)return;stop();const a=NM_STEPS[+g.dataset.dom].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---------- 2. the psychosis approach ---------- */
  const ps=$('#nmPs'),pr=$('#nmPsT');
  const MEDS=[['Levodopa',1,.85],['Dopamine agonist',1,.5],['Amantadine',1,.45],['MAO-B inhibitor',0,1],['COMT inhibitor',0,1],['Anticholinergic',0,1]];
  const BOARD=[['Clozapine','efficacious · clinically useful (monitoring)','NICE: offer if standard treatment fails','var(--good)'],
               ['Pimavanserin','efficacious · clinically useful','FDA: approved 29 Apr 2016, boxed warning','var(--good)'],
               ['Quetiapine','insufficient evidence · possibly useful','NICE: consider if no cognitive impairment','var(--warn)'],
               ['Olanzapine','not efficacious · not useful','NICE: do not offer','var(--bad)']];
  function drawPs(t){
    const N=vb(ps,'720 420','400 760');
    const p=phaseOf(NM_PS,t),node=[0,1,2,3,3,3][p];
    const L=N?{nx:[52,148,244,340],nw:88,nh:40,ny:18,mt:94,mx:20,bx0:136,bx1:330,mr:28,gy:292,fn:350,bt:372,bx:20,bw:360,br:392,ax:20,ay:590,aw:360}
             :{nx:[95,265,435,605],nw:150,nh:32,ny:18,mt:98,mx:20,bx0:150,bx1:304,mr:30,gy:316,fn:388,bt:98,bx:360,bw:340,br:120,ax:360,ay:304,aw:340};
    let s=`<defs>${marker('nmA','var(--muted)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const names=N?[['Ask and','look'],['Tolerated?','watch'],['Reduce','triggers'],['Treat','psychosis']]:[['Ask and look'],['Tolerated? Watch'],['Reduce triggers'],['Treat psychosis']];
    L.nx.forEach((x,i)=>{const cur=i===node,done=i<node;
      s+=`<rect x="${x-L.nw/2}" y="${L.ny}" width="${L.nw}" height="${L.nh}" rx="${L.nh/2}" style="fill:${cur?'var(--sky-soft)':'var(--panel)'};stroke:${cur||done?'var(--sky)':'var(--line)'};stroke-width:${cur?2.2:1.2}"/>`;
      names[i].forEach((l,j)=>{s+=`<text x="${x}" y="${L.ny+(names[i].length>1?16+j*13:21)}" class="${N?'t-xs':'t-lbl'} t-mid" style="fill:${cur?'var(--ink)':'var(--muted)'};${N?'font-weight:700':''}">${l}</text>`});
      if(i<3)s+=`<path d="M${x+L.nw/2+2} ${L.ny+L.nh/2} H${L.nx[i+1]-L.nw/2-4}" class="arrow" marker-end="url(#nmA)"/>`});
    /* token on the flow */
    const tp=clamp(t/.6)*3,ti=Math.min(2,Math.floor(tp)),tx=lerp(L.nx[ti],L.nx[Math.min(3,ti+1)],ease(tp-ti));
    s+=`<circle cx="${f1(tx)}" cy="${L.ny+L.nh+8}" r="4" style="fill:var(--sky)"/>`;
    /* medicines panel */
    const red=ease(ramp(t,.36,.48)),trt=ease(ramp(t,.52,.62));
    s+=`<text x="${L.mx}" y="${L.mt}" class="t-sm">PARKINSON'S MEDICINES · SCHEMATIC</text>`;
    MEDS.forEach(([n,link,lo],i)=>{const y=L.mt+18+i*L.mr,lv=lerp(1,lo,red);
      s+=`<text x="${L.mx}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${L.bx0}" y="${y}" width="${L.bx1-L.bx0}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${L.bx0}" y="${y}" width="${f1((L.bx1-L.bx0)*lv)}" height="12" rx="3" style="fill:${link&&red>0?'var(--sky)':'var(--cell-line)'};opacity:.85"/>`;
      if(link)s+=`<circle cx="${L.bx1+10}" cy="${y+6}" r="4" style="fill:var(--rose)"/>`;
      if(link&&red>.05&&red<1)s+=`<text x="${f1(L.bx0+(L.bx1-L.bx0)*lv-4)}" y="${y+10}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">↓</text>`});
    if(p===2)s+=`<text x="${L.bx1+16}" y="${L.mt+18+1*L.mr+10}" class="t-xs" style="fill:var(--sky);font-weight:700">${N?'':'with specialist advice'}</text>`;
    /* meters */
    const hall=clamp(.82-.32*red-.38*trt),mov=clamp(.78-.14*red);
    [['Hallucinations',hall,'var(--rose)'],['Movement',mov,'var(--good)']].forEach(([n,v,c],i)=>{const y=L.gy+i*24;
      s+=`<text x="${L.mx}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${n}</text><rect x="${L.bx0}" y="${y}" width="${L.bx1-L.bx0}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${L.bx0}" y="${y}" width="${f1((L.bx1-L.bx0)*v)}" height="12" rx="6" style="fill:${c}"/>`});
    s+=`<circle cx="${L.mx+4}" cy="${L.fn-4}" r="4" style="fill:var(--rose)"/><text x="${L.mx+14}" y="${L.fn}" class="t-xs">${N?'linked to hallucinations in the sources':'linked to hallucinations in the sources · levels illustrative'}</text>`;
    /* right panel: checklist early, evidence board later */
    if(p<3){const o=1-ramp(t,.46,.5);
      s+=`<g style="opacity:${f1(o)}"><rect x="${L.bx}" y="${L.bt-16}" width="${L.bw}" height="${N?190:190}" rx="11" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${L.bx+14}" y="${L.bt+4}" class="t-sm">${p<2?'BEFORE ANY NEW MEDICINE':'REDUCING, NOT STOPPING'}</text>`;
      const items=p<2?['Ask at reviews and after medicine changes','General medical evaluation','Look for infection, dehydration, constipation','Well tolerated? NICE: do not treat']:['Lower the likely triggers first','With specialist advice','Watch movement as doses fall','Never stop suddenly: NMS risk'];
      items.forEach((it,i)=>{const oo=ease(ramp(t,(p<2?.02:.34)+i*.035,(p<2?.06:.38)+i*.035)),y=L.bt+30+i*34,hl=p===1&&i===3;
        s+=`<g style="opacity:${f1(oo)}"><circle cx="${L.bx+22}" cy="${y-4}" r="7" style="fill:${hl?'var(--sky)':'var(--sky-soft)'};stroke:var(--sky)"/><path d="M${L.bx+18} ${y-4} l3 3 l5 -6" style="fill:none;stroke:${hl?'var(--panel)':'var(--sky)'};stroke-width:1.6"/><text x="${L.bx+36}" y="${y}" class="t-xs" style="fill:var(--ink)${hl?';font-weight:700':''}">${it}</text></g>`});
      s+='</g>'}
    else{s+=`<text x="${L.bx}" y="${L.bt+(N?0:-2)}" class="t-sm">MEDICINES FOR PSYCHOSIS · MDS 2019 / NICE</text>`;
      BOARD.forEach(([n,m,nc,c],i)=>{const o=ease(ramp(t,.52+i*.03,.58+i*.03)),y=L.br+i*44,q=i===2&&p===4,av=i===3&&p===5;
        s+=`<g style="opacity:${f1(o)}">`;
        if(q)s+=`<rect x="${L.bx-6}" y="${y-14}" width="${L.bw+6}" height="44" rx="8" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.6"/><text x="${L.bx+L.bw-8}" y="${y}" class="t-xs t-end" style="fill:var(--warn);font-weight:700">they differ</text>`;
        if(av)s+=`<rect x="${L.bx-6}" y="${y-14}" width="${L.bw+6}" height="44" rx="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/>`;
        s+=`<text x="${L.bx}" y="${y}" class="t-lbl">${n}</text>`;
        s+=`<circle cx="${L.bx+4}" cy="${y+9}" r="3.5" style="fill:${c}"/><text x="${L.bx+12}" y="${y+13}" class="t-xs" style="fill:var(--ink)">MDS: ${m}</text>`;
        s+=`<text x="${L.bx+12}" y="${y+26}" class="t-xs">${nc}</text></g>`})}
    /* avoid box */
    const ao=ease(ramp(t,.83,.9));
    s+=`<g style="opacity:${f1(.12+.88*ao)}"><rect x="${L.ax}" y="${L.ay}" width="${L.aw}" height="${N?150:106}" rx="11" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/>`;
    s+=`<text x="${L.ax+14}" y="${L.ay+22}" class="t-sm" style="fill:var(--bad)">AVOID IN PARKINSON'S</text>`;
    const AV=['haloperidol, other typicals','olanzapine','metoclopramide','prochlorperazine'];
    AV.forEach((a,i)=>{const col=N?0:i%2,row=N?i:Math.floor(i/2),x=L.ax+14+col*(N?0:190),y=L.ay+48+row*(N?24:28);
      s+=`<path d="M${x} ${y-8} l8 8 M${x+8} ${y-8} l-8 8" style="stroke:var(--bad);stroke-width:2;stroke-linecap:round"/><text x="${x+16}" y="${y}" class="t-xs" style="fill:var(--ink)">${a}</text>`});
    s+='</g>';
    ps.innerHTML=s;
    setPs(p);$('#nmPsNote').innerHTML=noteHTML(NM_PS[p]);
  }
  const stopPs=playWire(pr,$('#nmPsPlay'),drawPs,20000,'Replay','nonmotor');
  const setPs=stepWire($('#nmPsSteps'),NM_PS,pr,drawPs,stopPs);
  drawPs(+pr.value);

  /* ---------- 3. symptom by symptom ---------- */
  const os=$('#nmOpt'),or=$('#nmOptT');let opt=0;
  const HT=[[420,660],[360,560],[400,680],[260,600],[320,540],[340,600],[420,640]];
  /* one labelled bar: label above (narrow) or left (wide) */
  function bar(o,y,lab,v,max,col,txt,k){const w=(o.x1-o.x0)*v/max*k;
    let s=o.N?`<text x="${o.x0}" y="${y-4}" class="t-xs" style="fill:var(--ink)">${lab}</text>`:`<text x="${o.x0-10}" y="${y+10}" class="t-xs t-end" style="fill:var(--ink)">${lab}</text>`;
    s+=`<rect x="${o.x0}" y="${y}" width="${f1(Math.max(0,w))}" height="13" rx="3" style="fill:${col}"/>`;
    return s+`<text x="${f1(o.x0+Math.max(0,w)+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${txt}</text>`}
  function chip(x,y,txt,col,on){const w=txt.length*5.7+16;return `<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="18" rx="9" style="fill:${on?col:'var(--panel)'};stroke:${col};stroke-width:1.4;opacity:${on?.18:1}"/><text x="${f1(x+w/2)}" y="${y+13}" class="t-xs t-mid" style="fill:var(--ink)">${txt}</text>`}
  function drawOpt(t){
    const N=vb(os,'720 '+HT[opt][0],'400 '+HT[opt][1]),W=N?400:720,H=N?HT[opt][1]:HT[opt][0];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const LX=20;
    if(opt===0){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'EXPRESS: RIVASTIGMINE, 24 WEEKS':'EXPRESS: RIVASTIGMINE IN PARKINSON\'S DEMENTIA, 24 WEEKS (541 PEOPLE)'}</text>`;
      /* diverging ADAS-cog */
      const zx=N?150:330,sc=N?60:70,y0=N?66:52;
      s+=`<text x="${LX}" y="${y0-8}" class="t-xs">${N?'ADAS-cog change (points)':'ADAS-cog change, points: right = better, left = worse'}</text>`;
      s+=`<line x1="${zx}" x2="${zx}" y1="${y0}" y2="${y0+52}" class="axis"/>`;
      [['Rivastigmine',2.1,'var(--sky)','2.1 better'],['Placebo',-0.7,'var(--muted)','0.7 worse']].forEach(([n,v,c,lab],i)=>{const k=ease(ramp(t,.04+i*.08,.24+i*.08)),y=y0+6+i*24,w=v*sc*k;
        s+=`<text x="${N?LX:zx-90}" y="${y+11}" class="t-xs${N?'':' t-end'}" style="fill:var(--ink)">${n}</text>`;
        s+=`<rect x="${f1(Math.min(zx,zx+w))}" y="${y}" width="${f1(Math.abs(w))}" height="14" rx="3" style="fill:${c}"/>`;
        s+=`<text x="${f1(v>0?zx+w+6:zx+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${lab}</text>`});
      const o={N,x0:N?LX:230,x1:N?300:560},y1=N?166:134;
      s+=`<text x="${LX}" y="${y1-12}" class="t-xs">${N?'Global rating, % of people':'Clinician global rating (ADCS-CGIC), % of people'}</text>`;
      [['Meaningfully better: rivastigmine',19.8,'var(--sky)'],['Meaningfully better: placebo',14.5,'var(--muted)'],['Meaningfully worse: rivastigmine',13.0,'var(--sky)'],['Meaningfully worse: placebo',23.1,'var(--muted)']].forEach(([n,v,c],i)=>{
        const k=ease(ramp(t,.2+i*.05,.4+i*.05));s+=bar(o,y1+(N?12:0)+i*(N?32:22)+(i>1?(N?10:8):0),n,v,30,c,v.toFixed(1)+'%',k)});
      /* one-year rule */
      const R=N?{x0:30,x1:370,y:430}:{x0:70,x1:680,y:320},yx=v=>R.x0+(R.x1-R.x0)*(v+2)/8;
      const ro=ramp(t,.5,.56);
      s+=`<g style="opacity:${f1(ro)}"><text x="${LX}" y="${R.y-74}" class="t-sm">${N?'THE ONE-YEAR RULE (SCHEMATIC)':'THE ONE-YEAR RULE: DLB OR PARKINSON\'S DEMENTIA? (SCHEMATIC)'}</text>`;
      s+=`<rect x="${f1(yx(-2))}" y="${R.y-22}" width="${f1(yx(1)-yx(-2))}" height="22" style="fill:var(--warn-soft)"/><rect x="${f1(yx(1))}" y="${R.y-22}" width="${f1(yx(6)-yx(1))}" height="22" style="fill:var(--violet-soft)"/>`;
      s+=`<text x="${f1((yx(-2)+yx(1))/2)}" y="${R.y-7}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">DLB</text><text x="${f1((yx(1)+yx(6))/2)}" y="${R.y-7}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">${N?'PDD':'Parkinson\'s disease dementia'}</text>`;
      s+=`<line x1="${R.x0}" x2="${R.x1}" y1="${R.y}" y2="${R.y}" class="axis"/>`;
      [-2,0,1,2,4,6].forEach(v=>{s+=`<line x1="${f1(yx(v))}" x2="${f1(yx(v))}" y1="${R.y}" y2="${R.y+5}" class="axis"/><text x="${f1(yx(v))}" y="${R.y+17}" class="t-xs t-mid">${v>0?'+'+v:v}</text>`});
      s+=`<text x="${R.x1}" y="${R.y+31}" class="t-xs t-end">years after parkinsonism began</text>`;
      s+=`<path d="M${f1(yx(0))} ${R.y-34} l-6 -10 h12 z" style="fill:var(--sage)"/><text x="${f1(yx(0))}" y="${R.y-48}" class="t-xs t-mid" style="fill:var(--sage)">parkinsonism</text>`;
      s+=`<path d="M${f1(yx(1))} ${R.y-26} V${R.y+4}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(yx(1)+4)}" y="${R.y+44}" class="t-xs" style="fill:var(--ink)">1 year: arbitrary, but clinically useful</text></g>`;
      const dm=ramp(t,.58,.95);if(dm>0){const v=lerp(-1.5,5,ease(dm)),x=yx(v),dlb=v<=1;
        s+=`<circle cx="${f1(x)}" cy="${R.y-11}" r="6" style="fill:${dlb?'var(--warn)':'var(--violet)'};stroke:var(--panel);stroke-width:1.5"/>`;
        s+=`<text x="${f1(clamp(x,R.x0+90,R.x1-90))}" y="${R.y+(N?62:60)}" class="t-lbl t-mid" style="fill:${dlb?'var(--warn)':'var(--violet)'}">dementia at ${v>=0?'+':''}${f1(v)} y → ${dlb?'DLB':'PDD'}</text>`}
    }else if(opt===1){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'ANTIDEPRESSANTS, 12 WEEKS (115 PEOPLE)':'ANTIDEPRESSANTS vs PLACEBO, 12 WEEKS (115 PEOPLE): EXTRA FALL IN HAM-D'}</text>`;
      const o={N,x0:N?LX:230,x1:N?300:560};
      [['Paroxetine (up to 40 mg)',6.2,'6.2 points'],['Venlafaxine XR (up to 225 mg)',4.2,'4.2 points']].forEach(([n,v,txt],i)=>{s+=bar(o,(N?62:48)+i*(N?40:28),n,v,8,'var(--sky)',txt,ease(ramp(t,.04+i*.1,.3+i*.1)))});
      const y2=N?170:136;
      s+=`<text x="${LX}" y="${y2}" class="t-sm">${N?'CBT vs MONITORING, 10 WEEKS (80)':'PARKINSON\'S-ADAPTED CBT vs CLINICAL MONITORING, 10 WEEKS (80 PEOPLE)'}</text>`;
      [['HAM-D fall: CBT',7.35,10,'var(--sky)','7.35 points'],['HAM-D fall: monitoring',0.05,10,'var(--muted)','0.05 points'],['Responded: CBT',56,60,'var(--sky)','56%'],['Responded: monitoring',8,60,'var(--muted)','8%']].forEach(([n,v,mx,c,txt],i)=>{
        s+=bar(o,y2+(N?26:18)+i*(N?36:24)+(i>1?10:0),n,v,mx,c,txt,ease(ramp(t,.3+i*.07,.5+i*.07)))});
      const y3=N?H-118:H-74,mo=ramp(t,.75,.85);
      s+=`<g style="opacity:${f1(mo)}"><text x="${LX}" y="${y3}" class="t-sm">MDS 2019</text>`;
      const C=[['venlafaxine: efficacious','var(--good)'],['CBT: likely efficacious','var(--sky)'],['some SSRIs: insufficient','var(--warn)']];
      let cx=LX,cy=y3+10;C.forEach(([c,col])=>{const w=c.length*5.7+16;if(cx+w>W-14){cx=LX;cy+=26}s+=chip(cx,cy,c,col,1);cx+=w+8});
      s+='</g>';
    }else if(opt===2){
      const P=N?{x0:46,x1:370,y0:60,y1:186}:{x0:60,x1:360,y0:62,y1:206};
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'STANDING TEST (SCHEMATIC)':'LYING, THEN STANDING: WHAT COUNTS (SCHEMATIC TRACE)'}</text>`;
      const tx=m=>P.x0+(P.x1-P.x0)*m/8,yb=v=>P.y0+(P.y1-P.y0)*(1-(v+40)/60);
      s+=`<rect x="${f1(tx(5))}" y="${P.y0}" width="${f1(tx(8)-tx(5))}" height="${P.y1-P.y0}" style="fill:var(--panel-2)"/>`;
      s+=`<text x="${f1(tx(2.5))}" y="${P.y0-6}" class="t-xs t-mid">lying 5 min</text><text x="${f1(tx(6.5))}" y="${P.y0-6}" class="t-xs t-mid">standing 3 min</text>`;
      s+=`<line x1="${P.x0}" x2="${P.x1}" y1="${f1(yb(0))}" y2="${f1(yb(0))}" class="grid"/><line x1="${P.x0}" x2="${P.x1}" y1="${f1(yb(-20))}" y2="${f1(yb(-20))}" style="stroke:var(--bad);stroke-dasharray:4 3;stroke-width:1.2"/>`;
      s+=`<text x="${P.x0-4}" y="${f1(yb(0)+3)}" class="t-xs t-end">0</text><text x="${P.x0-4}" y="${f1(yb(-20)+3)}" class="t-xs t-end" style="fill:var(--bad)">−20</text>`;
      const mEnd=8*ease(ramp(t,.03,.4));
      const sys=m=>m<5?0:-26*ease(clamp((m-5)/1.2)),hr=m=>m<5?0:8*ease(clamp((m-5)/1));
      let d1='',d2='';for(let i=0;i<=80;i++){const m=mEnd*i/80;d1+=(i?'L':'M')+f1(tx(m))+' '+f1(yb(sys(m)));d2+=(i?'L':'M')+f1(tx(m))+' '+f1(yb(hr(m)))}
      s+=`<path d="${d1}" style="fill:none;stroke:var(--vessel);stroke-width:2.6"/><path d="${d2}" style="fill:none;stroke:var(--sage);stroke-width:2;stroke-dasharray:5 3"/>`;
      if(mEnd>7.5){s+=`<text x="${f1(tx(8)-4)}" y="${f1(yb(-26)+14)}" class="t-xs t-end" style="fill:var(--vessel);font-weight:700">systolic falls ≥20</text><text x="${f1(tx(8)-4)}" y="${f1(yb(8)-6)}" class="t-xs t-end" style="fill:var(--sage);font-weight:700">heart rate up &lt;15</text>`}
      s+=`<text x="${P.x0}" y="${P.y1+16}" class="t-xs" style="fill:var(--ink)">Sustained fall ≥20 systolic or ≥10 diastolic</text><text x="${P.x0}" y="${P.y1+29}" class="t-xs" style="fill:var(--ink)">within 3 minutes of standing = orthostatic hypotension</text>`;
      /* droxidopa duration */
      const D=N?{x0:LX,x1:370,y:256}:{x0:400,x1:700,y:66},dx=w=>D.x0+(D.x1-D.x0)*w/8,dk=ease(ramp(t,.42,.6));
      s+=`<text x="${D.x0}" y="${D.y-16}" class="t-sm">DROXIDOPA LABEL (FDA, 18 FEB 2014)</text>`;
      s+=`<rect x="${D.x0}" y="${D.y}" width="${f1((dx(2)-D.x0)*clamp(dk*4))}" height="16" rx="3" style="fill:var(--sky)"/>`;
      if(dk>.25)s+=`<rect x="${f1(dx(2))}" y="${D.y}" width="${f1((dx(8)-dx(2))*clamp((dk-.25)/.75))}" height="16" rx="3" style="fill:none;stroke:var(--warn);stroke-dasharray:4 3;stroke-width:1.4"/>`;
      [0,2,4,6,8].forEach(w=>{s+=`<text x="${f1(dx(w))}" y="${D.y+30}" class="t-xs t-mid">${w}</text>`});
      s+=`<text x="${D.x1}" y="${D.y+44}" class="t-xs t-end">weeks</text>`;
      s+=`<text x="${f1(dx(2)+6)}" y="${D.y+12}" class="t-xs" style="fill:var(--warn);opacity:${f1(ramp(dk,.5,1))}">beyond 2 weeks: not established</text>`;
      /* options */
      const Q=N?{x:LX,y:350}:{x:400,y:150};
      s+=`<text x="${Q.x}" y="${Q.y}" class="t-sm">NICE ORDER, THEN DROXIDOPA</text>`;
      const OPTS=[['1 · Review medicines','antihypertensives, dopaminergics,','anticholinergics, antidepressants','var(--sky)'],['2 · Midodrine','NICE consider; monitor supine BP','MDS: insufficient · possibly useful','var(--warn)'],['3 · Fludrocortisone','NICE if midodrine unsuitable','MDS: insufficient · possibly useful','var(--warn)'],['Droxidopa','MDS: efficacious short term','· possibly useful · boxed warning','var(--good)']];
      OPTS.forEach(([n,a,b,c],i)=>{const o=ease(ramp(t,.6+i*.07,.68+i*.07)),y=Q.y+22+i*(N?72:56);
        s+=`<g style="opacity:${f1(o)}"><rect x="${Q.x}" y="${y-12}" width="4" height="${N?50:44}" rx="2" style="fill:${c}"/><text x="${Q.x+12}" y="${y+2}" class="t-lbl">${n}</text><text x="${Q.x+12}" y="${y+17}" class="t-xs">${a}</text><text x="${Q.x+12}" y="${y+30}" class="t-xs">${b}</text></g>`});
    }else if(opt===3){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'CONSENSUS NON-DRUG MEASURES':'CONSENSUS NON-DRUG MEASURES FOR NEUROGENIC ORTHOSTATIC HYPOTENSION'}</text>`;
      const T=[['water','about 2 L','of water a day, at least'],['bolus','+30 mmHg','systolic, about 500 mL drunk within 5 minutes, for up to an hour'],['salt','2.3–4.6 g','salt a day (1 to 2 teaspoons), if appropriate'],['bed','15–23 cm','head of the bed raised, not with stacked pillows'],['sock','30–40 mmHg','compression garments']];
      T.forEach(([g,big,txt],i)=>{const o=ease(ramp(t,.05+i*.16,.2+i*.16)),col=N?i%2:i,row=N?Math.floor(i/2):0,w=N?172:132,x=(N?20:16)+col*(N?188:140),y=(N?44:44)+row*(N?184:0),h=N?172:196;
        s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:${o>.9?'var(--sky)':'var(--line)'};stroke-width:1.4"/>`;
        const cx=x+w/2,cy=y+(N?44:58),st='fill:none;stroke:var(--sky);stroke-width:2;stroke-linejoin:round;stroke-linecap:round';
        if(g==='water'||g==='bolus'){s+=`<path d="M${cx-14} ${cy-22} H${cx+14} L${cx+10} ${cy+22} H${cx-10} Z" style="${st}"/>`;const lv=g==='bolus'?o:.7;s+=`<path d="M${f1(cx-13+3*(1-lv))} ${f1(cy+22-40*lv)} H${f1(cx+13-3*(1-lv))} L${cx+10} ${cy+22} H${cx-10} Z" style="fill:var(--sky-soft)"/>`;if(g==='bolus')s+=`<path d="M${cx+22} ${cy+10} V${cy-16} M${cx+16} ${cy-10} l6 -6 l6 6" style="${st};stroke:var(--vessel)"/>`}
        if(g==='salt')s+=`<path d="M${cx-12} ${cy-8} H${cx+12} V${cy+22} H${cx-12} Z M${cx-12} ${cy-8} Q${cx} ${cy-26} ${cx+12} ${cy-8}" style="${st}"/><circle cx="${cx-4}" cy="${cy-16}" r="1.5" style="fill:var(--sky)"/><circle cx="${cx+4}" cy="${cy-16}" r="1.5" style="fill:var(--sky)"/>`;
        if(g==='bed'){const a=-.14*o;s+=`<g transform="rotate(${f1(a*57.3)} ${cx+30} ${cy+14})"><path d="M${cx-34} ${cy+6} H${cx+30}" style="${st};stroke-width:5"/><rect x="${cx-32}" y="${cy-4}" width="16" height="8" rx="3" style="fill:var(--sky-soft);stroke:var(--sky)"/></g><path d="M${cx-34} ${cy+24} H${cx+34}" style="${st};stroke:var(--muted)"/>`}
        if(g==='sock')s+=`<path d="M${cx-6} ${cy-24} V${cy+8} Q${cx-6} ${cy+20} ${cx+6} ${cy+20} H${cx+18} Q${cx+22} ${cy+12} ${cx+12} ${cy+8} H${cx+8} V${cy-24} Z" style="${st};fill:var(--sky-soft)"/><path d="M${cx-6} ${cy-14} H${cx+8} M${cx-6} ${cy-4} H${cx+8} M${cx-6} ${cy+6} H${cx+8}" style="stroke:var(--sky);stroke-width:1"/>`;
        s+=`<text x="${cx}" y="${y+(N?96:124)}" class="t-big t-mid" style="fill:var(--sky)">${big}</text>`;
        wrapT(txt,N?26:19).forEach((l,j)=>{s+=`<text x="${cx}" y="${y+(N?116:148)+j*13}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`});
        s+='</g>'});
    }else if(opt===4){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'BED SAFETY (AASM 2023)':'BED SAFETY FIRST: AASM 2023 GOOD-PRACTICE STATEMENT'}</text>`;
      const B=N?{x:200,y:150}:{x:190,y:170},sv=i=>ease(ramp(t,.06+i*.16,.18+i*.16));
      /* bed with two sleepers */
      s+=`<rect x="${B.x-120}" y="${B.y-10}" width="240" height="40" rx="8" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/><rect x="${B.x-130}" y="${B.y-50}" width="12" height="90" rx="4" style="fill:var(--cell-line);opacity:.5"/>`;
      s+=`<ellipse cx="${B.x-80}" cy="${B.y-16}" rx="22" ry="10" style="fill:var(--panel);stroke:var(--line)"/><ellipse cx="${B.x+40}" cy="${B.y-16}" rx="22" ry="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<path d="M${B.x-104} ${B.y-6} H${B.x-30}" style="stroke:var(--violet);stroke-width:10;stroke-linecap:round;opacity:.6"/><path d="M${B.x+16} ${B.y-6} H${B.x+90}" style="stroke:var(--sage);stroke-width:10;stroke-linecap:round;opacity:.6"/>`;
      const kick=Math.sin(t*Math.PI*40)*4*(1-sv(3));s+=`<path d="M${B.x-34} ${B.y-6} l14 ${f1(-6+kick)}" style="stroke:var(--violet);stroke-width:6;stroke-linecap:round;opacity:.7"/>`;
      /* 1 remove objects */
      const o1=sv(0);s+=`<rect x="${B.x-170}" y="${B.y-40}" width="34" height="70" rx="4" style="fill:var(--panel);stroke:var(--cell-line)"/><g style="opacity:${f1(1-o1)}"><path d="M${B.x-162} ${B.y-40} l6 -22 h12 l6 22" style="fill:var(--amber-soft);stroke:var(--amber)"/></g>`;
      if(o1>.5)s+=`<path d="M${B.x-166} ${B.y-66} l26 26 M${B.x-140} ${B.y-66} l-26 26" style="stroke:var(--bad);stroke-width:2;opacity:${f1(o1)}"/>`;
      /* 2 pad sharp furniture */
      const o2=sv(1);s+=`<circle cx="${B.x-136}" cy="${B.y-40}" r="${f1(7*o2)}" style="fill:var(--good-soft);stroke:var(--good)"/>`;
      /* 3 soft mat */
      const o3=sv(2);s+=`<rect x="${B.x-110}" y="${B.y+44}" width="${f1(220*o3)}" height="10" rx="5" style="fill:var(--good-soft);stroke:var(--good)"/>`;
      /* 4 pillow barrier */
      const o4=sv(3);s+=`<rect x="${B.x-24}" y="${f1(B.y-24-30*(1-o4))}" width="30" height="22" rx="8" style="fill:var(--sage-soft);stroke:var(--sage);opacity:${f1(o4)}"/>`;
      if(o1>.9)s+=`<text x="${B.x-170}" y="${B.y-76}" class="t-xs" style="fill:var(--bad)">objects removed</text>`;
      if(o3>.9)s+=`<text x="${B.x}" y="${B.y+70}" class="t-xs t-mid" style="fill:var(--good)">soft mat</text>`;
      if(o4>.9)s+=`<text x="${B.x-9}" y="${B.y-32}" class="t-xs t-mid" style="fill:var(--sage)">pillow</text>`;
      const SL=['Remove objects that could be thrown or wielded','Move or pad sharp furniture','A soft mat beside the bed','Severe RBD: sleep apart, or a pillow between'];
      const LY=N?260:56,LXX=N?LX:410;
      SL.forEach((l,i)=>{const o=sv(i),y=LY+i*(N?28:30);s+=`<g style="opacity:${f1(.2+.8*o)}"><circle cx="${LXX+8}" cy="${y-4}" r="8" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${LXX+8}" y="${y}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">${i+1}</text><text x="${LXX+24}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text></g>`});
      const ey=N?400:200,eo=ramp(t,.72,.84);
      s+=`<g style="opacity:${f1(eo)}"><text x="${LXX}" y="${ey}" class="t-sm">THE MEDICINE EVIDENCE</text>`;
      const EV=[['MDS 2019: no qualifying randomised trial','var(--bad)'],['NICE: consider clonazepam or melatonin','var(--warn)'],['AASM: conditional for clonazepam, IR melatonin,','var(--warn)'],['  transdermal rivastigmine; against DBS for RBD','var(--warn)'],['Pooled prevalence of RBD: 46%','var(--sage)']];
      EV.forEach(([l,c],i)=>{s+=`<text x="${LXX}" y="${ey+20+i*18}" class="t-xs" style="fill:${i===3?'var(--ink)':'var(--ink)'}">${i===3?'':'<tspan style="fill:'+c+'">● </tspan>'}${l.trim()}</text>`});
      s+='</g>';
    }else if(opt===5){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'DROOLING: WHAT IS INJECTED':'DROOLING: THE GLANDS, AND THE ORDER NICE SETS OUT'}</text>`;
      const C=N?{x:150,y:150}:{x:170,y:180};
      /* head profile facing right */
      s+=`<path d="M${C.x-70} ${C.y+90} V${C.y+40} Q${C.x-96} ${C.y-20} ${C.x-60} ${C.y-80} Q${C.x} ${C.y-120} ${C.x+50} ${C.y-70} Q${C.x+64} ${C.y-40} ${C.x+66} ${C.y-14} L${C.x+82} ${C.y+6} L${C.x+66} ${C.y+14} Q${C.x+70} ${C.y+34} ${C.x+58} ${C.y+40} Q${C.x+60} ${C.y+60} ${C.x+30} ${C.y+62} L${C.x+20} ${C.y+90}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.8"/>`;
      s+=`<ellipse cx="${C.x-36}" cy="${C.y-4}" rx="9" ry="14" style="fill:var(--panel);stroke:var(--cell-line)"/>`;
      const g1=ease(ramp(t,.06,.2)),g2=ease(ramp(t,.18,.32)),pl=.5+.5*Math.sin(t*Math.PI*30);
      s+=`<ellipse cx="${C.x-16}" cy="${C.y+14}" rx="${f1(16*g1)}" ry="${f1(22*g1)}" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.6"/>`;
      s+=`<ellipse cx="${C.x+22}" cy="${C.y+50}" rx="${f1(15*g2)}" ry="${f1(9*g2)}" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.6"/>`;
      if(g1>.9)s+=`<text x="${C.x-16}" y="${C.y-24}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">parotid</text>`;
      if(g2>.9)s+=`<text x="${C.x+22}" y="${C.y+76}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">submandibular</text>`;
      if(t>.25&&t<.45)s+=`<circle cx="${C.x+70}" cy="${f1(C.y+40+pl*10)}" r="3" style="fill:var(--sky)"/>`;
      const Q=N?{x:LX,y:330}:{x:380,y:60};
      const ST=[['1','Speech and language therapy','NICE first step','var(--sky)'],['2','Glycopyrronium bromide','MDS (glycopyrrolate): efficacious · possibly useful','var(--sky)'],['3','Botulinum toxin A (referral)','MDS: A and B efficacious · clinically useful','var(--good)']];
      ST.forEach(([n,a,b,c],i)=>{const o=ease(ramp(t,.36+i*.14,.46+i*.14)),y=Q.y+i*62;
        s+=`<g style="opacity:${f1(.15+.85*o)}"><circle cx="${Q.x+14}" cy="${y+12}" r="13" style="fill:${c}"/><text x="${Q.x+14}" y="${y+17}" class="t-lbl t-mid" style="fill:var(--panel)">${n}</text><text x="${Q.x+36}" y="${y+10}" class="t-lbl">${a}</text><text x="${Q.x+36}" y="${y+25}" class="t-xs">${b}</text>`;
        if(i<2)s+=`<path d="M${Q.x+14} ${y+28} V${y+48}" style="stroke:var(--line);stroke-width:2"/>`;s+='</g>'});
      const fo=ramp(t,.82,.92),fy=N?H-56:250;
      s+=`<g style="opacity:${f1(fo)}">`;wrapT('Other anticholinergics: only if the risk of cognitive side effects is minimal (NICE). Prevalence: drooling 31% (PRIAMO), dribbling 56.7% (NMSS study).',N?60:56).forEach((l,i)=>{s+=`<text x="${Q.x}" y="${fy+i*14}" class="t-xs" style="fill:var(--ink)">${l}</text>`});s+='</g>';
    }else{
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'MDS 2019 EFFICACY RATINGS':'MDS 2019 EFFICACY RATINGS FOR NON-MOTOR SYMPTOMS (NAMED IN THIS MODULE)'}</text>`;
      let yN=56;
      NM_MDS.forEach(([cat,col,items],ci)=>{const o=ease(ramp(t,.04+ci*.18,.18+ci*.18));
        if(N){s+=`<text x="${LX}" y="${yN}" class="t-sm" style="fill:${col};opacity:${f1(.2+.8*o)}">${cat.toUpperCase()}</text>`;
          items.forEach(([d,sym],i)=>{const x=LX+(i%2)*184,y=yN+10+Math.floor(i/2)*34,oi=ease(ramp(t,.06+ci*.18+i*.012,.16+ci*.18+i*.012));
            s+=`<g style="opacity:${f1(oi)}"><rect x="${x}" y="${y}" width="176" height="28" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.3"/><text x="${x+8}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${d.length>30?d.slice(0,29)+'…':d}</text><text x="${x+8}" y="${y+23}" class="t-xs">${sym}</text></g>`});
          yN+=10+Math.ceil(items.length/2)*34+20}
        else{const x=16+ci*176;s+=`<text x="${x}" y="52" class="t-sm" style="fill:${col};opacity:${f1(.2+.8*o)}">${cat==='Not efficacious or investigational'?'NOT EFFICACIOUS /':cat.toUpperCase()}</text>`;
          if(ci===3)s+=`<text x="${x}" y="64" class="t-sm" style="fill:${col};opacity:${f1(.2+.8*o)}">INVESTIGATIONAL</text>`;
          items.forEach(([d,sym],i)=>{const y=74+i*31,oi=ease(ramp(t,.06+ci*.18+i*.012,.16+ci*.18+i*.012));
            s+=`<g style="opacity:${f1(oi)}"><rect x="${x}" y="${y}" width="168" height="27" rx="7" style="fill:var(--panel);stroke:${col};stroke-width:1.3"/><text x="${x+8}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${d.length>27?d.slice(0,26)+'…':d}</text><text x="${x+8}" y="${y+22}" class="t-xs">${sym}</text></g>`})}});
      const fo=ramp(t,.82,.92),fy=N?H-24:H-18;
      s+=`<text x="${LX}" y="${fy}" class="t-xs" style="fill:var(--bad);font-weight:700;opacity:${f1(fo)}">${N?'No qualifying RCTs: anxiety, RBD, sweating, smell, eyes':'No qualifying RCTs at all: anxiety disorders, RBD, excessive sweating, impaired smell, eye problems'}</text>`;
    }
    os.innerHTML=s;
    or.setAttribute('aria-valuetext',`${Math.round(t*100)}% revealed`);
  }
  function setOpt(v){opt=v;$$('[data-nmo]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.nmo===v));
    $('#nmOptNote').innerHTML=noteHTML(NM_OPT[v]);$('#nmOptCap').textContent=NM_OPT[v].cap;drawOpt(+or.value)}
  $$('[data-nmo]').forEach(b=>b.addEventListener('click',()=>{stopO();or.value=0;setOpt(+b.dataset.nmo);$('#nmOptPlay').click()}));
  const stopO=playWire(or,$('#nmOptPlay'),drawOpt,8000,'Replay','nonmotor');
  setOpt(0);

  /* ---------- 4. quality of life ---------- */
  const qs=$('#nmQol'),qr=$('#nmQolT');
  function drawQ(t){
    const N=vb(qs,'720 220','400 450');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const A=N?{x0:20,x1:330,y:56}:{x0:20,x1:420,y:56};
    s+=`<text x="20" y="26" class="t-sm">${N?'GPDS: QUALITY OF LIFE EXPLAINED':'GPDS, SIX COUNTRIES: QUALITY OF LIFE EXPLAINED'}</text>`;
    const k1=ease(ramp(t,.04,.3)),k2=ease(ramp(t,.32,.6)),sc=(A.x1-A.x0)/100;
    s+=`<rect x="${A.x0}" y="${A.y}" width="${A.x1-A.x0}" height="26" rx="5" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${A.x0}" y="${A.y}" width="${f1(59.7*sc*k2)}" height="26" rx="5" style="fill:var(--violet);opacity:.75"/>`;
    s+=`<rect x="${A.x0}" y="${A.y}" width="${f1(17.3*sc*k1)}" height="26" rx="5" style="fill:var(--muted)"/>`;
    s+=`<text x="${A.x0}" y="${A.y+46}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(k1,.6,1))}"><tspan style="font-weight:700">17.3%</tspan> stage and medication alone</text>`;
    s+=`<text x="${f1(A.x0+59.7*sc)}" y="${A.y+62}" class="t-xs t-end" style="fill:var(--violet);opacity:${f1(ramp(k2,.6,1))}"><tspan style="font-weight:700">59.7%</tspan> with other factors added</text>`;
    const d=ramp(t,.6,.7);
    const dl=wrapT('Depression (Beck Depression Inventory) was the strongest predictor; satisfaction with the explanation at diagnosis and optimism also counted.',N?58:64);
    s+=`<text x="${A.x0}" y="${A.y-6}" class="t-xs">0%</text><text x="${A.x1}" y="${A.y-6}" class="t-xs t-end">100% of the variation</text>`;
    s+=`<g style="opacity:${f1(d)}"><rect x="${A.x0}" y="${A.y+76}" width="${N?360:400}" height="${dl.length*13+14}" rx="9" style="fill:var(--violet-soft);stroke:var(--violet)"/>`;
    dl.forEach((l,i)=>{s+=`<text x="${A.x0+12}" y="${A.y+94+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`});s+='</g>';
    const B=N?{x0:20,x1:300,y:280}:{x0:470,x1:660,y:56};
    s+=`<text x="${B.x0}" y="${B.y-30}" class="t-sm">${N?'CORRELATION WITH PDQ-39':'CORRELATION WITH PDQ-39'}</text><text x="${B.x0}" y="${B.y-16}" class="t-xs">411 people, international study</text>`;
    [['Non-motor scale (NMSS)',.70,'var(--violet)'],['Motor scale (SCOPA-Motor)',.58,'var(--muted)']].forEach(([n,v,c],i)=>{const k=ease(ramp(t,.7+i*.08,.9+i*.08)),y=B.y+i*44;
      s+=`<text x="${B.x0}" y="${y+8}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${B.x0}" y="${y+14}" width="${f1((B.x1-B.x0)*v*k)}" height="14" rx="3" style="fill:${c}"/><text x="${f1(B.x0+(B.x1-B.x0)*v*k+6)}" y="${y+26}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(k,.6,1))}">rS ${v.toFixed(2)}</text>`});
    s+=`<text x="${B.x0}" y="${B.y+102}" class="t-xs">bar length: rS from 0 to 1</text>`;
    qs.innerHTML=s;
    qr.setAttribute('aria-valuetext',`${Math.round(t*100)}% of the bars grown`);
  }
  playWire(qr,$('#nmQolPlay'),drawQ,7000,'Replay','nonmotor');drawQ(+qr.value);
  $('#nmQolNote').innerHTML=noteHTML({k:'Quality of life',t:'Mood matters more than the movement score',
    txt:`In the Global Parkinson's Disease Survey across six countries, Hoehn and Yahr stage and medication explained only 17.3% of the variation in quality of life; adding other factors raised this to 59.7%, and depression was the strongest predictor (adjusted R² 0.582). Satisfaction with the explanation of the diagnosis and optimism were also significant. In an international study of 411 people, the Non-Motor Symptoms Scale correlated with PDQ-39 more strongly (rS 0.70) than the SCOPA-Motor score (0.58). [[GPDS2002,Martinez-Martin2011]]`,
    pt:`How a person feels in mood, and how well the diagnosis was explained, shape quality of life more than the stage of the disease.`,
    hook:`GPDS: <b>depression</b> was the strongest predictor of quality of life. [[GPDS2002]]`});
  {const prev=redraws.nonmotor;redraws.nonmotor=()=>{prev&&prev();drawOpt(+or.value);drawQ(+qr.value)}}

  /* ---------- 5. cards ---------- */
  $('#nmCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Impulse-control disorders</h4><p>Compulsive gambling, buying, eating or sexual behaviour affected 17.1% of people on a dopamine agonist against 6.9% of others in DOMINION, and 46.1% developed one within 5 years in DIGPD. The rates, the screening questionnaire and what NICE advises are in <a href="#drugs" data-go="drugs">The other medicines</a>. [[Weintraub2010,Corvol2018]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Hallucinations and moving into care</h4><p>In a 4-year population-based study, 26.4% (47 of 178) moved into a nursing home. Old age, functional impairment, dementia and hallucinations were independent predictors, and hallucinations were the strongest. [[Aarsland2000]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Twenty years on</h4><p>In the Sydney cohort, 100 of 136 people had died by 20 years. Among the survivors the main problems were features that do not respond to levodopa: falls 87%, freezing 81%, hallucinations 74%, urinary incontinence 71%, daytime sleepiness 70%, choking 48%. [[Hely2008]]</p>
     <div class="pt"><b>In plain words</b>Over the long run, the hardest problems are often not the tremor or stiffness that levodopa treats.</div></div>
   <div class="card"><span class="ev early">Gap</span><h4>Anxiety has no tested treatment</h4><p>Anxiety disorders affect about 31% of people with Parkinson's, yet the 2019 MDS review found no qualifying randomised trial for them, nor for RBD, excessive sweating, impaired smell or eye problems. [[Broen2016,Seppi2019]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Swallowing problems hide</h4><p>Only 35% report swallowing problems when asked, against 82% on testing. On a 15-item questionnaire, half of the people who denied any problem would still have been referred. NICE offers speech and language therapy for swallowing and saliva problems. [[Kalf2012,Manor2007,NICE2017]]</p></div>
   <div class="card"><span class="tag warn">Debated</span><h4>Two names, one disease?</h4><p>The DLB Consortium keeps the 1-year rule between dementia with Lewy bodies and Parkinson's disease dementia but calls the cut-off arbitrary and based on expert opinion, and says it may need revising as the biology is clarified. It may not reflect distinct diseases. How DLB is told apart is in <a href="#ddx" data-go="ddx">The differential</a>. [[McKeith2017]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Daytime sleepiness and driving</h4><p>NICE: people with daytime sleepiness or sudden onset of sleep should not drive. Modafinil is considered only after a sleep history has excluded reversible causes, with review at least every 12 months. [[NICE2017]]</p></div>`;
};
