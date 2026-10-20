/* =============== 4.2 nursing care =============== */
/* The assessment round: seven segments in the order of the research summary (H, step sequence). */
const NC_RING=[
 {from:0,at:.035,k:'Assessment round · 1 of 7',t:'Breathing',col:'--air',soft:'--air-soft',lbl:['Breathing'],
  h:['Symptoms, SpO2,','FVC or SNIP, cough'],
  items:['Breathless? Orthopnoea?','Sleep, morning headache','Abdominal paradox','SpO2 at rest, room air','FVC or SNIP, with position','Peak cough flow'],
  txt:`NICE NG42 lists the symptoms to ask about: breathlessness, orthopnoea, disturbed or non-refreshing sleep, nightmares, morning headaches, daytime sleepiness, poor concentration, fatigue and poor appetite. The signs include a raised respiratory rate, shallow breathing, a weak cough or sniff, abdominal paradox and accessory-muscle use. At baseline it records a single SpO2 at rest on room air plus FVC or VC and/or SNIP or MIP, repeated every 2 to 3 months, and notes that a weak cough "could be assessed by measuring peak cough flow". [[NICE2016]] Upright and supine FVC differ, so the position of each measurement matters when values are compared over time. [[Lechtzin2002,Miller2009AAN]]`,
  pt:'The nurse asks how the person sleeps and whether lying flat makes breathing harder, watches the belly and neck as they breathe, and measures how hard they can blow out or sniff in.',
  hook:'In 25 people with ALS, supine FVC below 75% predicted was 100% sensitive and specific for a low transdiaphragmatic pressure, and accessory-muscle use was 84% sensitive and 100% specific. [[Lechtzin2002]] Sniff nasal pressure predicted hypercapnia better than VC (sensitivity 81% vs 53%), but no test did so with marked bulbar weakness. [[Lyall2001]]'},
 {from:1/7,at:1/7+.035,k:'Assessment round · 2 of 7',t:'Swallowing and nutrition',col:'--food',soft:'--food-soft',lbl:['Swallowing,','nutrition'],
  h:['Weight, meals,','a swallow screen'],
  items:['Weight against the trend','How long meals take','Coughing on swallowing','Fluid intake','EAT-10 screen','Swallow assessment if concern'],
  txt:`NICE expects weight, diet, fluid intake, hydration, oral health and swallowing to be assessed at diagnosis, at each MDT assessment and whenever there is concern, with a clinical swallowing assessment if problems are suspected. [[NICE2016]] The AAN nutrition algorithm adds prompts: prolonged meal times, meals ended early from fatigue, accelerated weight loss and family concern. [[Miller2009AAN]] In 70 people with ALS who had videofluoroscopy, an EAT-10 score of 8 or more identified aspiration with 86% sensitivity and 72% specificity. [[Plowman2016]]`,
  pt:'The nurse weighs the person, asks whether meals take longer or end in coughing, and uses a short questionnaire to spot unsafe swallowing early.',
  hook:'In 145 people followed with endoscopic swallow studies, 8% of those with dysphagia did not perceive it, and 44% of people with dysphagia refused thickeners or a gastrostomy. [[Onesti2017]]'},
 {from:2/7,at:2/7+.035,k:'Assessment round · 3 of 7',t:'Skin under the mask',col:'--bad',soft:'--bad-soft',lbl:['Skin under','the mask'],
  h:['Nasal bridge, pressure','areas, mask fit'],
  items:['Nasal bridge','Cheeks under the interface','Other pressure areas','Mask fit','Positioning','Humidification'],
  txt:`No study of NIV-mask pressure injury in ALS was found for this guide. In hospitalised adults, an integrative review of 21 studies reported a 63.3% pressure-injury incidence with oronasal masks, most often on the nasal bridge. [[Fidalgo2023]] In healthy volunteers on CPAP, interface pressure was highest at the nasal bridge, and humidification disrupted the skin barrier. [[Alqahtani2018]] The Braden scale is a general pressure-sore risk tool; no validation in ALS was found. [[Bergstrom1987]]`,
  pt:'A tight mask can damage the skin on the bridge of the nose. The nurse looks at the skin under it and checks how the mask fits.',
  hook:'Nasal masks allow easier speech but can leak through the mouth with bulbar weakness, and both nasal and full-face masks can cause facial pressure ulcers. [[Dorst2019]]'},
 {from:3/7,at:3/7+.035,k:'Assessment round · 4 of 7',t:'Medicines',col:'--treat',soft:'--treat-soft',lbl:['Medicines'],
  h:['Timing, liver tests,','the form, the tube'],
  items:['Riluzole and meal timing','Date of last liver tests','Form: tablet, liquid, film','Edaravone or tofersen dates','Gastrostomy site','Flushes: 30 mL'],
  txt:`On the US label riluzole is taken at least 1 hour before or 2 hours after a meal, with liver tests every month for the first 3 months and periodically after that. [[FDA2026Riluzole]] The form in use matters: tablet, oral suspension (which may go through a PEG) or oral film. [[FDA2026Tiglutik,FDA2020Exservan]] Edaravone runs in 14-day dosing cycles and tofersen has its own intrathecal schedule. [[FDA2026Radicava,FDA2023Qalsody]] ESPEN flushes the tube with 30 mL of water before, between and after each medicine, and checks the site daily. [[Bischoff2022]] Part 2 takes each one in turn.`,
  pt:'The nurse checks that each medicine is in a form the person can swallow or put through the tube, given at the right time around meals, with blood tests up to date.'},
 {from:4/7,at:4/7+.035,k:'Assessment round · 5 of 7',t:'Communication',col:'--steel',soft:'--steel-soft',lbl:['Communication'],
  h:['Method, yes/no signal,','aid within reach'],
  items:['Method in use','The yes/no signal','Aid within reach','Change in speech'],
  txt:`Acute-care guidance asks staff to find out whether the person uses a yes/no code (any reliable movement, such as blinking), not to finish their sentences, and not to use family as translators unless the person asks. [[MNDA2026acute]] NICE calls for prompt speech and language therapy assessment, low-tech and high-tech AAC, and alternative ways to contact services. [[NICE2016]] No published source on adapted nurse-call systems for people with weak hands in ALS was found.`,
  pt:'Before anything else, the nurse learns how this person says yes and no, and makes sure their board or device is where they can use it.',
  hook:'In 35 people with late-stage ALS and no speech, an eye-transfer (ETRAN) board improved communication over no aid, and eye-tracking devices improved it further. [[Caligari2013]]'},
 {from:5/7,at:5/7+.035,k:'Assessment round · 6 of 7',t:'Mood and caregiver',col:'--warn',soft:'--warn-soft',lbl:['Mood and','caregiver'],
  h:['Mood, lability, cognition,','pain, the carer'],
  items:['Depression screen','Emotional lability','Cognition and behaviour','Pain','Carer burden'],
  txt:`Published screens include the ADI-12 for depression (30 or more identified every case of current major depression in 39 people), the CNS-LS for emotional lability (13 or more is the threshold used) and the ECAS for cognition and behaviour, designed for health care professionals and taking 15 to 20 minutes. [[Hammer2008,Brooks2013,Abrahams2014]] Pain was reported by 56.9% of 160 people with ALS against 33.1% of controls, and the authors judged it under-recognised and undertreated. [[Chio2012Pain]] NICE asks the team to tell carers about their right to a carer assessment and respite. [[NICE2016]]`,
  pt:'The nurse asks how the person feels, whether laughing or crying comes on out of nowhere, whether anything hurts, and how the family carer is coping.',
  hook:'Emotional lability is not the same as depression: EAN asks for the two to be told apart, and both to be told apart from frontotemporal symptoms. [[VanDamme2024EAN]]'},
 {from:6/7,at:6/7+.035,k:'Assessment round · 7 of 7',t:'Documentation',col:'--muted',soft:'--panel-2',lbl:['Documentation'],
  h:['Record, share,','alert'],
  items:['Measures, date, position','Weight trend, mask skin','Communication method','Medicines, liver tests','Advance decisions','Share with the team'],
  txt:`NICE asks that key decisions be shared with every professional involved, that the person and carers be offered a copy of the NIV care plan, and that services likely to see the person in a crisis be told they use NIV. [[NICE2016]] Acute-care guidance lists the documents to look for: an emergency healthcare plan, ReSPECT form, advance care plan, ADRT, DNACPR and an MND Alert Card. [[MNDA2026acute]] No single published nursing documentation checklist for ALS was found; the note builder in part 4 gathers the items the guidelines and labels name.`,
  pt:'Writing down the numbers with the date and position lets the next nurse see the trend, and sharing the plan means an emergency team knows what the person wants.',
  hook:'Upright and supine FVC differ, yet no guideline found specifies recording the position. Recording it is inferred from those data, not stated in a guideline. [[Lechtzin2002,Miller2009AAN]]'}
];

/* the screening tools; slider ranges are the tools' score ranges, cut-offs are the published ones */
const NC_SCR={
 eat:{b:'EAT-10 · swallowing',min:0,max:40,def:9,cuts:[3,8],
  means:[ [4.28,'mean, safe swallowers 4.28'],[7.10,'mean, penetration 7.10'],[20.50,'mean, aspiration 20.50'] ],
  zones:['Below 3: under both published cut-offs.',
   'At 3 or more: the cut-off that identified penetration or aspiration (sensitivity 88%, specificity 57%, AUC 0.77). [[Plowman2016]]',
   'At 8 or more: the cut-off that identified aspiration (sensitivity 86%, specificity 72%, AUC 0.88, negative predictive value 95.5%). [[Plowman2016]]'],
  txt:'The study: 70 people with ALS completed the EAT-10 and had videofluoroscopy. Mean scores were 4.28 in safe swallowers, 7.10 in those with penetration and 20.50 in those who aspirated. [[Plowman2016]]',
  hook:'EAT-10 at 8 or more had a negative predictive value of 95.5% for aspiration in ALS: a low score made aspiration unlikely in that sample. [[Plowman2016]]'},
 cns:{b:'CNS-LS · emotional lability',min:7,max:35,def:15,cuts:[13],means:[],
  zones:['Below 13, the threshold used for pseudobulbar affect symptoms.',
   'At 13 or more: in ALS (n=99) this cut-off matched neurologists\' diagnoses in 82% (sensitivity 0.84, specificity 0.81). [[Brooks2013]]'],
  txt:'The CNS-LS is a 7-item self-report measure of laughing and crying lability developed in ALS, with 4 laughter and 3 tearfulness items. [[Moore1997]] In the PRISM registry, 51.1% of women and 41.0% of men with ALS scored 13 or more (difference not significant). [[Brooks2013]]',
  hook:'EAN lists SSRIs, tricyclics or dextromethorphan/quinidine for emotional lability, after it has been told apart from depression and frontotemporal symptoms. [[VanDamme2024EAN]]'},
 adi:{b:'ADI-12 · depression',min:12,max:48,def:25,cuts:[23,30],means:[],
  zones:['Below both published cut-offs.',
   'At 23 or more: the cut-off that identified any depressive disorder (specificity 60%). [[Hammer2008]]',
   'At 30 or more: the cut-off that identified everyone with current major depression (sensitivity 100%, specificity 83%). [[Hammer2008]]'],
  txt:'The ALS Depression Inventory was validated in 39 people with ALS, correlating with the Beck Depression Inventory at r = 0.80. [[Hammer2008]] The HADS, designed for hospital outpatients, fitted the Rasch model in 298 people with MND only after one item was removed from each subscale. [[Zigmond1983,Gibbons2011]]',
  hook:'The AAN found depression prevalence in ALS reported from 0 to 44% and no controlled treatment trials (Level U). [[Miller2009AANb]]'}
};

/* giving the medicines: each step names a small picture (g) drawn by the init below */
const NC_MEDS={
 tab:{b:'Riluzole tablet',n:'Riluzole tablet',
  pt:'Riluzole is a tablet taken twice a day, away from food on the US label, with blood tests to check the liver.',
  hook:'EAN recommends lifelong riluzole from diagnosis. If adverse events occur it suggests reducing the dose, then stopping if they persist. [[VanDamme2024EAN]]',
  steps:[
   {t:'Time it around meals',g:'day',d:'US label: 50 mg twice daily, at least 1 hour before or 2 hours after a meal. [[FDA2026Riluzole]] The EU SmPC does not make fasting part of the dosing, and reports that a high-fat meal lowers Cmax by 44% and AUC by 17%. [[EMA_RilutekSmPC]]'},
   {t:'Check the liver tests',g:'lft',d:'Aminotransferases are measured before and during treatment. Riluzole is not recommended above 5 times the upper limit of normal on the US label, and is stopped at 5 times on the EU SmPC. On the US label ALT rose above 5 times the upper limit in 2%, with the highest rise within 3 months. The two schedules differ; the timeline below the player compares them. [[FDA2026Riluzole,EMA_RilutekSmPC]]'},
   {t:'If tablets are hard to swallow',g:'crush',d:'No US or EU label statement on crushing riluzole tablets was found. In a home simulation, 15 inexperienced volunteers who crushed tablets lost a mean 6.27% of the powder and 8.53% of the active drug. [[Casiraghi2023]] Authors of an observational study judged crushing into food inconsistent with safe and effective use. [[Onesti2017]] A liquid and an oral film exist: the next two options.'},
   {t:'What to watch for',g:'lines',lines:['Fever: neutropenia, first 2 months','Interstitial lung disease','Pancreatitis: weeks to years later'],d:'Label warnings that call for observation: severe neutropenia within the first 2 months (patients are told to report a febrile illness), interstitial lung disease, and acute pancreatitis (abdominal pain, nausea, vomiting, anorexia) weeks to years after starting. [[FDA2026Riluzole]] For a person on riluzole admitted with fever, acute-care guidance lists a full blood count and liver tests. [[MNDA2026acute]]'}
  ]},
 liq:{b:'Riluzole liquid',n:'Riluzole oral suspension (Tiglutik)',
  pt:'The liquid form lets people who cannot swallow tablets, or who have a feeding tube, keep taking riluzole.',
  hook:'Tube materials named on the labels: silicone and polyurethane PEGs for Tiglutik; silicone, PVC or polyurethane NG or PEG tubes for edaravone oral suspension. [[FDA2026Tiglutik,FDA2026Radicava]]',
  steps:[
   {t:'Shake the bottle',g:'shake',d:'Tiglutik is riluzole 50 mg in 10 mL. The bottle is shaken gently for at least 30 seconds before each dose. [[FDA2026Tiglutik]]'},
   {t:'By mouth or through a PEG',g:'route',lbl:'PEG: silicone or polyurethane',d:'It may be taken by mouth or given through a PEG tube, and both silicone and polyurethane PEGs can be used. [[FDA2026Tiglutik]] In healthy volunteers, suspension given by intragastric tube was bioequivalent to oral dosing (AUC ratio 90.6%, Cmax ratio 97.0%), in a manufacturer-linked study. [[Brooks2019]]'},
   {t:'The same meal timing',g:'day',d:'The tablet timing applies: at least 1 hour before or 2 hours after a meal, which with tube feeding means fitting the dose around the feed. [[FDA2026Tiglutik]] No published ALS nursing protocol joining these label rules with feeding regimens was found.'},
   {t:'Discard 15 days after opening',g:'discard',d:'Unused suspension is discarded 15 days after the bottle is opened. [[FDA2026Tiglutik]]'}
  ]},
 film:{b:'Riluzole film',n:'Riluzole oral film (Exservan)',
  pt:'The film melts on the tongue, so there is no tablet to swallow and no water to drink with it.',
  hook:'In 9 people with ALS, videofluoroscopy before and after a dose of the film showed no worsening of swallowing; the study was manufacturer-linked. [[Wymer2023]]',
  steps:[
   {t:'On top of the tongue',g:'tongue',lines:['On top of the tongue','Not cut','One film at a time'],d:'Exservan is riluzole 50 mg as an oral film. It is placed on top of the tongue, where it sticks and dissolves. It is not cut, and one film is taken at a time. [[FDA2020Exservan]]'},
   {t:'Let it dissolve',g:'dissolve',lines:['No liquids','No chewing or spitting','No talking'],d:'It is not taken with liquids. Saliva is swallowed normally, and chewing, spitting and talking are avoided while it dissolves. In healthy subjects, 38% had oral hypoaesthesia on the film against none on tablets. [[FDA2020Exservan]]'},
   {t:'The same meal timing',g:'day',d:'The film carries the same meal timing as the tablets. Taking it with food reduced AUC by 15% and Cmax by 45%. [[FDA2020Exservan,Wymer2023]]'}
  ]},
 eiv:{b:'Edaravone IV',n:'Edaravone infusion (Radicava IV)',
  pt:'Edaravone by drip takes an hour, on set days of a four-week cycle.',
  hook:'EAN 2024 does not recommend IV or oral edaravone outside clinical trials (an interim recommendation). [[VanDamme2024EAN]]',
  steps:[
   {t:'Check the overwrap',g:'lines',lines:['Indicator blue or purple: not used','Used within 24 h of opening','Nothing added to the bag'],d:'Radicava IV is not used if the oxygen indicator on the overwrap has turned blue or purple, and is used within 24 hours of opening the overwrap. No other medicines are added to the bag. [[FDA2026Radicava]]'},
   {t:'Two 30 mg bags, 60 minutes',g:'bags',d:'The 60 mg dose is two consecutive 30 mg bags over a total of 60 minutes, about 1 mg per minute. [[FDA2026Radicava]]'},
   {t:'Watch for hypersensitivity',g:'lines',lines:['Stopped at the first sign','Anaphylaxis can occur','Sulfite reactions: more in asthma'],d:'The infusion is stopped at the first sign of hypersensitivity. The label warns of anaphylaxis and of sulfite (sodium bisulfite) reactions, more frequent in people with asthma. The commonest IV adverse reactions were contusion (15% vs 9%), gait disturbance (13% vs 9%) and headache (10% vs 6%). [[FDA2026Radicava]]'},
   {t:'The 28-day cycle',g:'cycle',d:'Cycle 1 is daily dosing for 14 days, then 14 drug-free days. Later cycles are dosing on 10 of 14 days, then 14 drug-free days. [[FDA2026Radicava]]'}
  ]},
 eor:{b:'Edaravone oral',n:'Edaravone oral suspension (Radicava ORS)',
  pt:'Liquid edaravone is taken first thing in the morning on an empty stomach, with nothing to eat for an hour afterwards.',
  hook:'Riluzole and edaravone oral suspension both carry food-timing rules, so a tube-feeding schedule decides when they can be given. No published ALS protocol joining these rules with feeding regimens was found. [[FDA2026Tiglutik,FDA2026Radicava]]',
  steps:[
   {t:'Morning, after an overnight fast',g:'fast',d:'Radicava ORS is 105 mg (5 mL), by mouth or feeding tube, in the morning after an overnight fast, with no food for 1 hour afterwards; water is allowed. [[FDA2026Radicava]]'},
   {t:'If food was taken',g:'waits',d:'If food was eaten, the label sets how long to wait before the dose: 8 hours after a high-fat meal, 4 hours after a low-fat meal and 2 hours after a 250-calorie supplement, with no food for 1 hour after the dose in every case. [[FDA2026Radicava]]'},
   {t:'Through the tube',g:'flushOne',d:'The bottle is shaken for at least 30 seconds. NG or PEG tubes of silicone, PVC or polyurethane may be used, flushed with at least 30 mL of water before and after. The supplied 5 mL syringe is used (a household teaspoon is not adequate), and the bottle is discarded 15 days after opening. [[FDA2026Radicava]]'},
   {t:'The same 28-day cycle',g:'cycle',d:'The oral suspension follows the same cycles as the infusion: 14 days of dosing then 14 days off for cycle 1, then dosing on 10 of 14 days followed by 14 days off. [[FDA2026Radicava]]'}
  ]},
 tof:{b:'Tofersen',n:'Tofersen, intrathecal (Qalsody)',
  pt:'Tofersen goes into the fluid around the spinal cord through a needle in the lower back: three doses two weeks apart, then one every four weeks.',
  hook:'In VALOR, lumbar-puncture-related adverse events were common and neurologic serious adverse events occurred in 7% of tofersen recipients. EAN recommends tofersen first-line for progressive SOD1-ALS and asks that the burden of repeated intrathecal dosing be discussed. [[Miller2022,VanDamme2024EAN]]',
  steps:[
   {t:'Prepare the vial',g:'lines',lines:['Room temperature, no external heat','Not shaken','Given within 4 h of drawing up'],d:'Qalsody is 100 mg in 15 mL, given intrathecally by lumbar puncture by, or under the direction of, professionals experienced in lumbar puncture. The vial reaches room temperature without external heat and is not shaken, and the dose is given within 4 hours of being drawn up. [[FDA2023Qalsody]]'},
   {t:'Remove about 10 mL of CSF',g:'csf',d:'About 10 mL of cerebrospinal fluid is removed before the dose. Sedation and imaging guidance may be considered if indicated. [[FDA2023Qalsody]]'},
   {t:'Bolus over 1 to 3 minutes',g:'bolus',d:'The drug is injected undiluted as a bolus over 1 to 3 minutes. [[FDA2023Qalsody]]'},
   {t:'Evaluate before and after',g:'evalT',d:'Patients are evaluated before and after the injection for conditions related to lumbar puncture. The label gives no fixed observation period after the dose, so this guide does not give one. [[FDA2023Qalsody]] Routine bed rest after dural puncture did not prevent headache in a Cochrane review (not ALS-specific) and probably increased it (RR 1.24). [[Arevalo2016]]'},
   {t:'Loading, then every 28 days',g:'tofSched',d:'Three loading doses are given at 14-day intervals, then one dose every 28 days. Label warnings include myelitis or radiculitis, papilloedema or raised intracranial pressure, and aseptic meningitis. Pain (42% vs 22%) and fatigue (17% vs 6%) were the commonest adverse reactions against placebo. [[FDA2023Qalsody]]'}
  ]},
 tube:{b:'Several via the tube',n:'Several medicines through one tube',
  pt:'Water before, between and after each medicine keeps the tube clear and stops medicines mixing in it.',
  hook:'Two sources, two volumes for the flush between medicines: 30 mL in ESPEN 2022, at least 5 mL in NHS Lothian 2013. [[Bischoff2022,NHSLothian2013]]',
  steps:[
   {t:'Flush, one drug, flush',g:'flush',d:'ESPEN: medicines are given one at a time, flushing the tube with 30 mL of water before, between and after each one. [[Bischoff2022]] An NHS Lothian best-practice statement (2013, past its review date) gives at least 30 mL before, at least 5 mL between each and at least 30 mL after, and medicines are not mixed with each other or with the feed. [[NHSLothian2013]]'},
   {t:'Forms that are not crushed',g:'lines',lines:['Enteric-coated','Modified or slow release','Cytotoxic or hormonal'],d:'Enteric-coated, modified or slow-release, and cytotoxic or hormonal medicines are not crushed. [[NHSLothian2013]] ESPEN says crushing "should be avoided whenever possible", warns that liquid medicines may carry sorbitol or a high osmolality, and asks for a pharmacist to be involved. [[Bischoff2022]]'},
   {t:'Drugs for an empty stomach',g:'empty',d:'For drugs that need an empty stomach, feeds are stopped 15 to 30 minutes before and restarted 15 to 30 minutes after. [[NHSLothian2013]] Riluzole and edaravone oral suspension have their own, longer label windows around food. [[FDA2026Tiglutik,FDA2026Radicava]]'},
   {t:'Record it',g:'lines',lines:['Form and volume: prescription chart','Flushes: fluid balance chart','Blocked tube: no cola (ESPEN)'],d:'The dosage form and liquid volume go on the prescription chart, and flushes on the fluid balance chart where relevant. [[NHSLothian2013]] For a blocked tube, ESPEN does not recommend cola, calls sodium bicarbonate "not evidence-based", and leaves a guide wire or declogger to an expert. [[Bischoff2022]]'}
  ]}
};

const NC_MYTHS=[
 {m:'Twitching means ALS.',a:'Among 121 people diagnosed with benign fasciculations, with a normal examination and normal electrophysiology apart from the twitching, none developed motor neuron disease over 2 to 32 years. [[Blexrud1993]] NICE does list muscle twitching among possible presenting features, alongside weakness and other signs. [[NICE2016]]'},
 {m:'A feeding tube means no more eating.',a:'The AAN states that "PEG does not eliminate oral feeding", and describes it as a way to give medicines and fluids and to stabilise weight. [[Miller2009AAN]]'},
 {m:'Once NIV starts, it cannot be stopped.',a:'NICE asks professionals to "explain that non-invasive ventilation can be stopped at any time", with support from professionals experienced in withdrawal. [[NICE2016]] In interviews with 24 UK doctors, colleagues were sometimes unclear about the difference between palliation, treatment withdrawal and assisted death. [[Phelps2017]]'},
 {m:'People with ALS choke to death.',a:'In 121 German and 50 UK deaths, most people died peacefully (88% and 98%) and "no patient choked to death". The commonest symptoms in the last 24 hours were breathlessness, cough, anxiety and restlessness. [[Neudert2001]] Acute-care guidance asks staff to reassure the person that death from choking is rare. [[MNDA2026acute]]'},
 {m:'Oxygen relieves breathlessness in ALS.',a:'MND Association guidance states that "Oxygen does not help breathlessness". In a pilot of 6 people with terminal ALS, nasal oxygen beforehand did not significantly reduce breathlessness, while morphine did. [[MNDA2026acute,Clemens2008]] Oxygen can also raise carbon dioxide: see the hospital oxygen panel above.'},
 {m:'Bed rest prevents headache after a lumbar puncture.',a:'A Cochrane review of 24 trials (2996 participants) found no evidence that routine bed rest prevents post-dural-puncture headache; bed rest probably increased it (RR 1.24). The review was not ALS-specific. [[Arevalo2016]]'}
];

const NC_DOC=[
 {k:'resp',c:true,l:'Breathing measures, with date and position',v:'Breathing [date]: SpO2 ___% at rest on room air. FVC ___% predicted, position [upright / supine]. SNIP ___ cmH2O. Peak cough flow ___ L/min. Orthopnoea, sleep, morning headache: ___.'},
 {k:'food',c:true,l:'Weight and the trend',v:'Nutrition: weight ___ kg (last ___ kg on [date]). Meal length, coughing on swallowing, fluid intake: ___. EAT-10 ___.'},
 {k:'skin',c:true,l:'Skin under the mask',v:'Skin: nasal bridge and cheeks under the NIV interface [intact / marked]. Other pressure areas ___. Mask fit, positioning and humidification reviewed.'},
 {k:'meds',c:false,l:'Medicines and liver tests',v:'Medicines: riluzole as [tablet / suspension via PEG / film], timing around meals or feeds ___. Last liver tests [date]. Edaravone or tofersen dates, if prescribed ___. Changes ___.'},
 {k:'tube',c:false,l:'Gastrostomy site and flushes',v:'Gastrostomy: site ___; tube moves freely [yes / no]. Dosage form and volume on the prescription chart; flushes on the fluid balance chart.'},
 {k:'comm',c:true,l:'Communication method and yes/no signal',v:'Communication: method ___; yes/no signal ___; aid within reach [yes / no]. Change in speech ___.'},
 {k:'mood',c:false,l:'Mood, lability, cognition, pain and the carer',v:'Mood and cognition: [screen used and score]. Pain ___. Carer: [how they are coping; carer assessment offered].'},
 {k:'acp',c:false,l:'Advance decisions',v:'Advance decisions: ADRT, DNACPR, ventilation and feeding decisions, preferred place of care [where they are recorded].'},
 {k:'share',c:false,l:'Shared with the team and crisis services',v:'Shared with: [team members]. Services that may see the person in a crisis told about NIV [yes / no].'}
];

const NC_TXT={
 ofN:(i,n)=>`${i} of ${n}`,
 checks:'Published checks',
 /* breathing calculator */
 respLede:'NICE NG42 sets thresholds at which breathing results lead to discussion and possible referral to the respiratory service. Move the values and the switches to see which ones are reached. [[NICE2016]]',
 fvcL:'FVC or VC, % predicted',snipL:'SNIP or MIP, cmH2O',spoL:'SpO2 at rest, %',
 fvcO:v=>`${v}% predicted`,snipO:v=>`${v} cmH2O`,spoO:v=>`${v}%`,
 symK:'Symptoms (especially orthopnoea)',sexK:'Sex (for the SNIP threshold)',fallK:'SNIP or MIP fell by more than 10 cmH2O in 3 months',lungK:'Known lung disease',
 yes:'Yes',no:'No',men:'Men',women:'Women',
 gFvc:'FVC or VC',gSnip:'SNIP or MIP',gSpo:'SpO2',
 crit:['FVC or VC below 50% predicted','SNIP or MIP below 40 cmH2O','FVC or VC below 80% predicted, with symptoms'],
 critSnip:{m:'SNIP or MIP below 65 cmH2O (men), with symptoms',f:'SNIP or MIP below 55 cmH2O (women), with symptoms'},
 critFall:'SNIP or MIP falling by more than 10 cmH2O per 3 months',
 critSpo:{n:'SpO2 94% or below: blood gases indicated',y:'SpO2 92% or below with known lung disease: blood gases indicated'},
 reached:'Reached',notReached:'Not reached',
 sumOn:'At these values, a NICE NG42 threshold for discussion and possible referral is reached.',
 sumOff:'At these values, no NICE NG42 threshold for discussion and referral is reached.',
 respK:'NICE NG42 thresholds',respH:'What the numbers reach',
 respMore:'NICE adds that a PaCO2 above 6 kPa calls for urgent referral, to be seen within 1 week. If bulbar or cognitive problems are severe, SpO2 is still measured, but FVC, VC, SNIP and MIP are not done if the interfaces are not suitable for the person. Some pulse oximeters over- or underestimate near borderline values, and overestimation has been reported in people with dark skin. [[NICE2016]]',
 respPt:'These tests show how strong the breathing muscles are. Crossing a line on them is a reason for the team to talk about breathing support, not a verdict.',
 respHook:'Peak cough flow above 160 L/min is needed to clear secretions, and clinicians recommend assistive devices below 270 L/min (Class III). [[Miller2009AAN]]',
 respCap:'This shows how the published NICE NG42 thresholds classify the numbers entered. It does not diagnose, predict how anyone will do, or replace the respiratory team.',
 /* screens */
 scrLede:'Three screens that the research for this guide found validated or widely used in ALS. Pick one and move the example score to see where its published cut-offs fall.',
 scrL:'Example score',scrO:v=>`${v}`,
 cutsK:'Published cut-offs (vertical lines)',ex:v=>`example: ${v}`,
 scrCap:'A screen flags who may need a fuller assessment. It does not diagnose aspiration, lability or depression, and this tool says nothing about any one person.',
 /* visits */
 visRows:[ ['NICE NG42',2],['NICE NG42',3],['EAN 2024',3],['EAN 2024',6] ],
 every:(g,n)=>`${g}: every ${n} months`,
 mo:m=>`${m}`,months:'months from diagnosis',
 visCap:(m,a,b,c,d)=>`Month ${m}: NICE ${a} to ${b} reviews so far, EAN ${c} to ${d}.`,
 visNote:'<div class="kicker">Controversy</div><h4>Every 2 to 3 months, or every 3 to 6?</h4><p>NICE NG42 sets multidisciplinary assessments usually every 2 to 3 months, more or less often depending on symptoms, the rate of progression and the person\'s preference. [[NICE2016]] The EAN 2024 guideline sets reviews "usually every 3–6 months depending on disease progression", naming the ALSFRS-R as the functional assessment. [[VanDamme2024EAN]] Neither gives a separate frequency for BMI: weight is tied to the visit in both.</p><div class="pt"><b>In plain words</b>The UK guideline asks for check-ups a little more often than the European one. Both say the timing should follow how fast things are changing.</div>',
 /* medicines */
 medLede:'Four questions recur for each ALS medicine: which form, when around food or feeds, how it goes in, and what to watch for. Pick a medicine and press Play; each step comes from its label or from enteral-feeding guidance. [[FDA2026Riluzole,EMA_RilutekSmPC,FDA2026Tiglutik,FDA2020Exservan,FDA2026Radicava,FDA2023Qalsody,Bischoff2022]]',
 medCap:'Schematic. Steps as the labels and guidelines describe them, not a local procedure; the meal times shown are an example day.',
 hr:h=>`${h}:00`,dose:'dose',noDose:'no dose',meal:'meal',
 mBefore:'before',mN:m=>`month ${m}`,mPer:'then periodically',mAx:'months on riluzole',
 crush:'crushed at home: 8.53% of the active drug lost',
 shake:'shaken for at least 30 seconds',sec:s=>`${s} s`,
 stomach:'stomach',
 discard:'discard',dayN:d=>`day ${d}`,
 bags:'two bags back to back: 60 min in all',mg30:'30 mg',min:m=>`${m} min`,
 cyc1:'cycle 1',cycL:'later',cyc1T:'14 dosing days, then 14 without',cycLT:'dosing on 10 of 14 days, then 14 without',
 night:'overnight fast',noFood:'no food for 1 h, water allowed',
 waits:[ ['high-fat meal',8],['low-fat meal',4],['250-calorie supplement',2] ],h:n=>`${n} h`,
 water:v=>`${v} mL`,waterMin:v=>`≥${v} mL`,drugN:n=>`drug ${n}`,dose5:'5 mL',espen:'ESPEN',lothian:'NHS Lothian',
 syringe:'the supplied 5 mL syringe, not a teaspoon',
 csfOut:'CSF removed',csfV:'about 10 mL',qal:'Qalsody',qalV:'15 mL',
 bolus:'bolus over 1 to 3 minutes',
 evalB:'evaluate',evalA:'evaluate',noFixed:'no fixed observation time on the label',
 loading:'loading',every28:'every 28 days',
 feed:'feed',drug:'drug',gap:'15–30 min',
 /* liver tests */
 lftUS:'US label',lftEU:'EU SmPC',lftBefore:'before',lftPer:'then periodically',lftAfter:'after year 1',
 lftCap:(m,a,b)=>`Month ${m}: ${a} dated tests on the US schedule, ${b} on the EU schedule.`,
 lftNote:'<div class="kicker">Controversy: the labels differ</div><h4>Monthly for 3 months, then?</h4><p>The US label measures aminotransferases before and during treatment, monitoring for liver injury "every month for the first 3 months of treatment, and periodically thereafter". [[FDA2026Riluzole]] The EU SmPC asks for ALT every month for the first 3 months, every 3 months for the rest of the first year, and periodically after that, and stops riluzole if ALT reaches 5 times the upper limit of normal. [[EMA_RilutekSmPC]]</p><div class="hook"><b>Exam hook</b>On the US label about 50% had at least one ALT above the upper limit of normal and 8% above 3 times, with the largest rise within 3 months. [[FDA2026Riluzole]]</div><div class="pt"><b>In plain words</b>Riluzole can irritate the liver, mostly early on, so blood tests are done monthly at first. Europe then asks for them every three months during the first year.</div>',
 lftDraw:'Only the US label\'s pre-treatment test is drawn; the EU wording on a baseline test was not part of this guide\'s research.',
 /* gastrostomy */
 pegModes:[ ['espen','ESPEN 2022'],['esge','ESGE 2021'] ],
 pegLbl:{stomach:'stomach',wall:'stomach wall',abd:'abdominal wall',skin:'skin',ib:'internal bumper',eb:'external bumper',turn:'turn',push:'push in, then back',pushE:'push in 2–10 cm',gap:'1–2 cm loose'},
 pegDay:d=>`Day ${d}`,pegH:(d,a)=>`Day ${d}: ${a}`,pegTurn:'turn',pegPush:'push in',pegBoth:'turn, and push in',
 pegHead:'A week after the site has healed',
 pegCap:'Schematic, not to scale. ESPEN gives the distance for the weekly inward movement; the ESGE abstract read for this guide gives the bumper gap.',
 pegNote:{
  espen:'ESPEN 2022: the exit site is checked daily and kept clean and dry, with aseptic care until it heals (usually up to 5 to 7 days). After about one week the tube "should be rotated daily", and moved inwards at least once a week, by at least 2 cm and up to 10 cm. Occlusive dressings are avoided. [[Bischoff2022]]',
  esge:'ESGE 2021 recommends daily mobilisation of the tube (pushing it inward) and keeping the external bumper loose, 1 to 2 cm from the abdominal wall, to reduce the risk of a buried bumper (strong recommendation, low-quality evidence). [[Gkolfakis2021]]'},
 pegCommon:'Controversy: ESPEN pairs daily turning with weekly inward movement, while ESGE asks for daily inward movement. [[Bischoff2022,Gkolfakis2021]]',
 pegPt:'Moving the tube regularly helps stop the inner disc sinking into the stomach wall, which is called a buried bumper.',
 pegHook:'Buried-bumper warning signs on the ESPEN list: the tube is hard to move, leakage around the site on flushing, frequent pump alarms, abdominal pain, a chronic site infection, or resistance when giving feed or fluids. [[Bischoff2022]]',
 /* oxygen */
 o2Bands:[ [94,98,'--steel','94–98%','Target for most acutely ill adults (BTS-based oxygen policy).'],
           [88,92,'--air','88–92%','Target for people at risk of hypercapnic respiratory failure, neuromuscular disorders among them (BTS-based policy); acceptable in MND unless other pathology is present (MND Association).'] ],
 o2Ax:'SpO2, %',o2Leg:(b,l)=>`${b}: ${l}`,
 o2Cap:'Target bands as published. Not a prescription.',
 o2Note:'<div class="kicker">Hospital admission</div><h4>Why the target is lower</h4><p>A BTS-based oxygen policy names neuromuscular disorders among the groups in whom oxygen may raise carbon dioxide. [[BTS2017template,ODriscoll2017]] MND Association guidance says supplemental oxygen is used "only with extreme caution", because excess oxygen can cause acidaemic respiratory failure and death, with monitoring by arterial blood gas and the person\'s own NIV used for breathlessness and hypercapnia. Saline nebulisers are driven by air rather than oxygen. [[MNDA2026acute]] In 8 people with neuromuscular disease and diaphragm weakness, low-flow oxygen (0.5 to 2 L/min) raised PaCO2 by a mean 28.2 mmHg. [[Gay1995]]</p><div class="hook"><b>Exam hook</b>NICE NG42 itself has no explicit oxygen-caution recommendation: the 88–92% target and the warning come from BTS and the MND Association. [[NICE2016,BTS2017template,MNDA2026acute]]</div><div class="pt"><b>In plain words</b>When breathing muscles are weak, extra oxygen can let carbon dioxide build up. Hospital teams aim a little lower and use the person\'s own breathing machine.</div>',
 /* myths and documentation */
 mythLede:'Six beliefs that published sources address directly. Choose one to see what the source says.',
 mythK:'Often believed',mythA:'What the source says',
 docLede:'NICE asks that key decisions be shared with everyone involved and that services seeing the person in a crisis know they use NIV. [[NICE2016]] Tick what was assessed and the entry assembles below, with blanks to fill in.',
 docK:'Entry built from the ticked items',docAll:'Tick everything',docNone:'Clear',docEmpty:'Nothing ticked yet.',
 docCap:'No single published nursing documentation checklist for ALS was found. These items are gathered from what NICE, EAN, the MND Association, NHS Lothian and the drug labels say to assess, monitor or record. Your service decides the format.'
};

const NC_CARDS={
 assess:`
  <div class="card"><h4>Falls</h4><ul><li>In a prospective study of 66 people with ALS, 47% of those who walked had fallen by 3 months and 59% by 6 months; among wheelchair users the figures were 18% and 10%.</li><li>Lower-limb strength and fatigue predicted falls. NICE places "mobility and avoiding falls" in the occupational therapy and physiotherapy assessment.</li></ul><p class="stage-cap">[[Alencar2026,NICE2016]]</p></div>
  <div class="card"><h4>Pressure areas</h4><ul><li>Controversy: older small case series described few pressure sores in ALS, but a Taiwanese claims cohort (514 people with ALS, 2056 controls) found a higher risk, adjusted HR 8.82.</li><li>A hospital quality-improvement project measured 6.37 to 12.2 kPa on the nasal bridge under some oronasal masks tightened against leak, and reduced category 2 mask injuries over 1466 NIV days.</li><li>The Braden scale has six subscales (sensory perception, moisture, activity, mobility, friction and shear, nutrition); a cut-off of 16 had 100% sensitivity in two studies, but it has not been validated in ALS.</li><li>For acute settings: "Good skin pressure care is vital", and a person who cannot lie flat may be propped at 30 to 45 degrees or use their own NIV.</li></ul><p class="stage-cap">[[Chen2018,Rochester2025,Bergstrom1987,MNDA2026acute]]</p></div>
  <div class="card"><h4>Cognition and behaviour</h4><ul><li>The ECAS takes 15 to 20 minutes and was designed for health care professionals working with people with physical disability. Control-based cut-offs are 77/100 (ALS-specific), 24/36 (non-specific) and 105/136 (total).</li><li>In its development sample, 29% of 48 people had abnormal ALS-specific scores, and 40% of carers reported behaviour change.</li><li>Acute-care guidance describes about 50% of people with MND as cognitively unaffected, about 35% with mild change and up to 15% developing FTD.</li></ul><p class="stage-cap">[[Abrahams2014,MNDA2026acute]]</p></div>
  <div class="card"><h4>The carer</h4><ul><li>The Zarit Burden Interview comes from research on relatives of impaired older adults.</li><li>In one Chinese home-care study of 120 caregiver pairs, the 22-item ZBI averaged 63.63 of 88, classed by the authors as moderate to severe burden; caregiver anxiety predicted burden.</li><li>NICE asks the team to discuss the psychological impact with family and carers and to tell them about carer assessment and respite.</li></ul><p class="stage-cap">[[Zarit1980,Tang2021,NICE2016]]</p></div>
  <div class="card"><h4>The ALSFRS-R</h4><ul><li>The revision added dyspnoea, orthopnoea and the need for ventilatory support. Scores run from 0 to 48, higher meaning better function.</li><li>Inter-rater reliability ICC 0.93, telephone against in person 0.97; a self-administered version ICC 0.93; online self-rating r = 0.96 against on-site.</li><li>None of these studies tested nurse raters specifically.</li></ul><p class="stage-cap">[[Cedarbaum1999,Miller2022,Kaufmann2007,Montes2006,Maier2012]]</p></div>
  <div class="card"><h4>Where the evidence stops</h4><ul><li>No ALS-specific source was found on nasal-bridge pressure-injury rates under home NIV, on the Braden scale in ALS, or on nurse-led NIV set-up.</li><li>NICE names a specialist nurse in the core team but gives NIV decisions to the team with the respiratory ventilation service.</li><li>This module does not fill these gaps with numbers.</li></ul><p class="stage-cap">[[NICE2016,Fidalgo2023,Bergstrom1987]]</p></div>`,
 med:`
  <div class="card"><h4>Saliva medicines</h4><ul><li>NICE: consider an antimuscarinic first line, glycopyrronium first line with cognitive impairment "because it has fewer central nervous system side effects", and botulinum toxin A as a specialist option.</li><li>EAN lists amitriptyline, atropine, glycopyrrolate, oxybutynin and scopolamine first line, and says suction devices lack evidence and "may increase the saliva production".</li><li>On the glycopyrrolate oral solution label (a paediatric indication; adult ALS use is off-label), dry mouth, vomiting, constipation, flushing and nasal congestion each affected 30% or more.</li><li>Over-drying can make saliva thick and hard to clear, and NICE asks for saliva treatments to be reviewed then.</li></ul><p class="stage-cap">[[NICE2016,VanDamme2024EAN,FDA2024Cuvposa,MNDA2026acute]]</p></div>
  <div class="card"><h4>Breathlessness and the end of life</h4><ul><li>NICE suggests considering opioids for breathlessness and benzodiazepines when anxiety makes it worse (both off-label in 2016), as-needed supplies at home for people on NIV, and anticipatory medicines towards the end of life.</li><li>In a pilot of 6 people with terminal ALS, morphine lowered respiratory rate (42 to 29 per minute) and breathlessness (7.5 to 1.8 out of 10) at 120 minutes, without significant CO2 rise or desaturation.</li><li>Acute-care guidance: sedatives are "used with caution, but not withheld at end of life".</li></ul><p class="stage-cap">[[NICE2016,Clemens2008,MNDA2026acute]]</p></div>
  <div class="card"><h4>On admission to hospital</h4><ul><li>Drug routes depend on swallowing and on whether an enteral tube is present.</li><li>For a person on riluzole with fever, a full blood count (neutropenia) and liver tests are listed.</li><li>An MND alert wristband with an oxygen warning is among the alert tools described.</li></ul><p class="stage-cap">[[MNDA2026acute]]</p></div>`,
 teach:`
  <div class="card"><h4>If the ventilator fails</h4><ul><li>NICE asks for training in NIV use and interfaces, emergency procedures, help at night with removing or replacing the mask, use with wheelchairs, "what to do if the equipment fails", and secretion management.</li><li>The care plan covers device maintenance and 24-hour clinical and technical support; the risk assessment covers battery back-up, a humidifier, and compatibility with eye-gaze equipment.</li><li>No ALS-specific source on mask cleaning schedules or alarm-response teaching was found.</li></ul><p class="stage-cap">[[NICE2016]]</p></div>
  <div class="card"><h4>Cough: the published order</h4><ul><li>NICE and EAN: unassisted breath stacking and/or manually assisted cough first; assisted breath stacking with a lung-volume recruitment bag if bulbar function is poor or cough stays ineffective; then a mechanical cough assist device. EAN adds that a suction device may be considered.</li><li>Mechanical insufflation-exsufflation raised peak cough flow by 26% (bulbar) and 28% (non-bulbar), against 11% to 13% for manually assisted cough (Class III; Level C).</li></ul><p class="stage-cap">[[NICE2016,VanDamme2024EAN,Miller2009AAN]]</p></div>
  <div class="card"><h4>Swallowing safely: the chin tuck</h4><ul><li>In 81 people with ALS studied by videofluoromanometry, a chin tuck resolved aspiration in 13 of 24 people who aspirated, head rotation in 6, and neither in 5.</li><li>A scoping review of 157 MND dysphagia papers found very few that tested whether such strategies work.</li><li>ESPEN 2018 recommends texture changes and postures such as the chin tuck in moderate dysphagia (good-practice point). No ALS evidence on small boluses was found beyond NICE's general advice on posture, seating and texture.</li></ul><p class="stage-cap">[[Solazzo2011,Waito2017,Burgos2018ESPEN,NICE2016]]</p></div>
  <div class="card"><h4>Choking and laryngospasm</h4><ul><li>Acute-care guidance asks staff to clear the blockage (saliva, food or fluid), offer palliation for distress, and reassure the person "that death from choking is rare".</li><li>EAN lists laryngospasm triggers (liquid or saliva at the larynx, reflux, smoke, strong smells, emotion, alcohol, cold air, spicy food) and recommends explaining that it is self-limiting.</li><li>No validated ALS-specific choking first-aid protocol was found.</li></ul><p class="stage-cap">[[MNDA2026acute,VanDamme2024EAN]]</p></div>
  <div class="card"><h4>Yes/no codes and eye-gaze</h4><ul><li>Acute-care guidance asks staff to find out the person's yes/no code (any reliable movement, such as a blink), to use yes/no or single-word questions, not to finish the person's sentences, and not to use family as translators unless the person asks.</li><li>NICE and EAN call for low-tech boards and high-tech AAC, referral to a specialised AAC hub for eye-gaze, and ongoing training for carers. The AAN found no controlled studies of these aids (Level U).</li><li>No published source on adapted call bells for weak hands in ALS was found; NICE mentions environmental controls only in general.</li></ul><p class="stage-cap">[[MNDA2026acute,NICE2016,VanDamme2024EAN,Miller2009AANb]]</p></div>
  <div class="card"><h4>Energy and secretions</h4><ul><li>In a 28-person randomised trial in MND, three weekly one-hour occupational therapy sessions on energy conservation improved fatigue and occupational performance, but not quality of life.</li><li>NICE suggests humidification, nebulisers and carbocisteine for thick secretions, alongside advice on posture, oral care and suction when drooling is a problem.</li></ul><p class="stage-cap">[[Fateh2022,NICE2016]]</p></div>`,
 doc:`
  <div class="card"><h4>Advance care planning: what NICE lists</h4><ul><li>ADRT, DNACPR, Lasting Power of Attorney, preferred place of death, what the person does not want (for example hospital admission), who will speak for them, and plans for intercurrent illness.</li><li>How the plans will be available when needed, for example on the Summary Care Record, and a review when gastrostomy or NIV is planned.</li><li>EAN adds invasive ventilation, palliative sedation and treatment withdrawal.</li></ul><p class="stage-cap">[[NICE2016,VanDamme2024EAN]]</p></div>
  <div class="card"><h4>On admission</h4><ul><li>"An MND specialist (nurse, neurologist or care centre coordinator) should be alerted within 24 hours."</li><li>Extubation can be difficult, and a high NEWS-type score may be normal for the person.</li><li>In Pennsylvania, 32% of 1748 gastrostomies and 67% of 373 tracheostomies in ALS were placed during emergency admissions. EAN recommends discussing invasive ventilation in advance "to avoid emergency invasive ventilation".</li></ul><p class="stage-cap">[[MNDA2026acute,Tsou2012,VanDamme2024EAN]]</p></div>
  <div class="card"><h4>The specialist nurse and the team</h4><ul><li>NICE and EAN both name a specialist nurse in the core team.</li><li>A Cochrane review found no randomised trials of multidisciplinary care in MND, with low-quality evidence of fewer hospital admissions.</li><li>Controversy: in all 719 incident cases in Ireland and Northern Ireland, attending the central multidisciplinary clinic was linked to better survival (HR 0.59), and the authors judged it superior to community care supported by a specialist care worker. In New Zealand, unplanned admissions fell after a key-worker role began (before/after audit).</li><li>In a 2025 UK census of 64 MND nurses and therapists, 14% were at medium and 12% at high risk of burnout.</li></ul><p class="stage-cap">[[NICE2016,VanDamme2024EAN,Ng2009,Rooney2015,Wiseman2026,Chau2025]]</p></div>`
};

inits.nursing=()=>{
  const T=NC_TXT,bg=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
  /* split a label into lines of at most mx characters, at spaces, so any language wraps */
  const wrap=(s,mx)=>{const out=[];let ln='';String(s).split(' ').forEach(w=>{if(ln&&(ln+' '+w).length>mx){out.push(ln);ln=w}else ln=ln?ln+' '+w:w});if(ln)out.push(ln);return out};
  const txt=(x,y,lines,cls,dy=16,sty='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${sty?` style="${sty}"`:''}>${lines.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?dy:0}">${l}</tspan>`).join('')}</text>`;
  const tick=(x,y,c='var(--good)',sw=2.4)=>`<path d="M${f1(x-5)} ${f1(y)} l3.5 4 7 -8" style="fill:none;stroke:${c};stroke-width:${sw};stroke-linecap:round;stroke-linejoin:round"/>`;
  $$('[data-nc-jump]').forEach(b=>b.addEventListener('click',()=>{const el=document.getElementById(b.dataset.ncJump);if(el)el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}));

  /* ============ 1a the assessment round ============ */
  const svg=$('#ncSvg'),rg=$('#ncT');
  const P=(cx,cy,r,a)=>[cx+r*Math.sin(a),cy-r*Math.cos(a)];
  function seg(cx,cy,r0,r1,a0,a1){const [x0,y0]=P(cx,cy,r1,a0),[x1,y1]=P(cx,cy,r1,a1),[x2,y2]=P(cx,cy,r0,a1),[x3,y3]=P(cx,cy,r0,a0),lg=a1-a0>Math.PI?1:0;
    return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 ${lg} 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 ${lg} 0 ${f1(x3)} ${f1(y3)}Z`}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{cx:200,cy:188,kx:28,ky:400,dy:34}:{cx:196,cy:200,kx:398,ky:46,dy:36};
    const R1=166,R0=100,n=NC_RING.length,p=phaseOf(NC_RING,t),S=NC_RING[p],u=clamp((t-S.from)*n);
    let s=bg;
    NC_RING.forEach((g,i)=>{
      const a0=i*2*Math.PI/n+.022,a1=(i+1)*2*Math.PI/n-.022,am=(a0+a1)/2,cur=i===p,done=i<p;
      if(cur){const pulse=.35+.35*Math.sin(u*Math.PI*8);s+=`<path d="${seg(L.cx,L.cy,R1+3,R1+9,a0,a1)}" style="fill:var(${g.col});opacity:${f1(pulse+.2)}"/>`}
      s+=`<path d="${seg(L.cx,L.cy,R0,R1,a0,a1)}" style="fill:var(${cur||done?g.soft:'--panel-2'});stroke:var(${cur?g.col:'--line'});stroke-width:${cur?3:1.2}"/>`;
      const [lx,ly]=P(L.cx,L.cy,(R0+R1)/2+2,am),k=g.lbl.length,y0=ly+4-k*7,ink=`fill:var(${cur||done?'--ink':'--muted'})`;
      if(done)s+=tick(lx+1,y0-4,'var(--good)');
      else s+=`<text x="${f1(lx)}" y="${f1(y0)}" class="t-sm t-mid" style="font-weight:700;${ink}">${i+1}</text>`;
      s+=txt(lx,y0+14,g.lbl,g.lbl.some(l=>l.length>11)?'t-xs t-mid':'t-sm t-mid',14,`${ink};font-weight:${cur?700:500}`);
    });
    /* the round's progress: a track and a moving dot inside the ring */
    const ang=t*2*Math.PI,rt=R0-12;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${rt}" style="fill:none;stroke:var(--line);stroke-width:3"/>`;
    if(t>.002){const [ex,ey]=P(L.cx,L.cy,rt,Math.min(ang,2*Math.PI-.001));s+=`<path d="M${L.cx} ${L.cy-rt}A${rt} ${rt} 0 ${ang>Math.PI?1:0} 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--steel);stroke-width:4;stroke-linecap:round"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="6" style="fill:var(--steel);stroke:var(--panel);stroke-width:2"/>`}
    s+=`<text x="${L.cx}" y="${L.cy-26}" class="t-sm t-mid">${T.ofN(p+1,n)}</text>`;
    s+=txt(L.cx,L.cy+(S.lbl.length>1?-2:6),S.lbl,'t-big t-mid',20);
    /* the checklist for the lit segment */
    s+=`<text x="${L.kx}" y="${L.ky}" class="t-sm" style="letter-spacing:.1em">${T.checks.toUpperCase()}</text>`;
    s+=txt(L.kx,L.ky+26,S.h,'t-big',20);
    const m=S.items.length;
    S.items.forEach((it,k)=>{const y=L.ky+82+k*L.dy,on=u>=(k+1)/(m+1.2);
      s+=`<rect x="${L.kx}" y="${y-13}" width="18" height="18" rx="4" style="fill:${on?`var(${S.soft})`:'var(--panel)'};stroke:var(${on?S.col:'--line'});stroke-width:1.6"/>`;
      if(on)s+=tick(L.kx+9,y-4,`var(${S.col==='--muted'?'--ink':S.col})`,2.2);
      s+=`<text x="${L.kx+28}" y="${y+1}" class="t-lbl" style="opacity:${on?1:.5}">${it}</text>`});
    svg.innerHTML=s;
    setSt(p);$('#ncNote').innerHTML=noteHTML({k:S.k,t:S.h.join(' '),txt:S.txt,pt:S.pt,hook:S.hook});
  }
  const stop=playWire(rg,$('#ncPlay'),draw,22000,UI.replay,'nursing');
  const setSt=stepWire($('#ncSteps'),NC_RING,rg,draw,stop);

  /* ============ 1b breathing measures vs NICE ============ */
  $('#ncRespLede').innerHTML=`<p>${T.respLede}</p>`;$('#ncRespCap').textContent=T.respCap;
  $('#ncFvcL').textContent=T.fvcL;$('#ncSnipL').textContent=T.snipL;$('#ncSpoL').textContent=T.spoL;
  ['Sym','Sex','Fall','Lung'].forEach(k=>{$('#nc'+k+'K').textContent=T[k.toLowerCase()+'K'];$('#nc'+k).setAttribute('aria-label',T[k.toLowerCase()+'K'])});
  const R={sym:'y',sex:'m',fall:'n',lung:'n'};
  toggleRow($('#ncSym'),[ ['y',T.yes],['n',T.no] ],R.sym,v=>{R.sym=v;drawResp()});
  toggleRow($('#ncSex'),[ ['m',T.men],['f',T.women] ],R.sex,v=>{R.sex=v;drawResp()});
  toggleRow($('#ncFall'),[ ['y',T.yes],['n',T.no] ],R.fall,v=>{R.fall=v;drawResp()});
  toggleRow($('#ncLung'),[ ['y',T.yes],['n',T.no] ],R.lung,v=>{R.lung=v;drawResp()});
  ['#ncFvc','#ncSnip','#ncSpo'].forEach(id=>$(id).addEventListener('input',drawResp));
  const rsv=$('#ncRespSvg');
  function gauge(L,y,lbl,val,vtxt,lo,hi,zones,cuts){
    const X=v=>L.x0+L.w*(clamp(v,lo,hi)-lo)/(hi-lo);let s='';
    if(L.n){s+=`<text x="${L.x0}" y="${y-14}" class="t-lbl">${lbl}</text><text x="${L.x0+L.w}" y="${y-14}" class="t-lbl t-end" style="fill:var(--steel)">${vtxt}</text>`}
    else{s+=`<text x="20" y="${y+4}" class="t-lbl">${lbl}</text><text x="20" y="${y+21}" class="t-sm" style="fill:var(--steel);font-weight:700">${vtxt}</text>`}
    s+=`<rect x="${L.x0}" y="${y-6}" width="${L.w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    zones.forEach(([a,b,c])=>{if(b>a)s+=`<rect x="${f1(X(a))}" y="${y-6}" width="${f1(X(b)-X(a))}" height="12" style="fill:var(${c})"/>`});
    cuts.forEach(c=>{s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${y-11}" y2="${y+11}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(c))}" y="${y+25}" class="t-xs t-mid" style="fill:var(--ink)">${c}</text>`});
    [lo,hi].forEach((e,i)=>s+=`<text x="${f1(X(e))}" y="${y+25}" class="t-xs ${i?'t-end':''}">${e}</text>`);
    s+=`<circle cx="${f1(X(val))}" cy="${y}" r="9" style="fill:var(--steel);stroke:var(--panel);stroke-width:2.5"/>`;
    return s}
  function drawResp(){
    const N=vb(rsv,'720 236','400 236');
    const L=N?{n:1,x0:24,w:352}:{n:0,x0:220,w:470};
    const fvc=+$('#ncFvc').value,snip=+$('#ncSnip').value,spo=+$('#ncSpo').value,sym=R.sym==='y',st=R.sex==='m'?65:55,so=R.lung==='y'?92:94;
    $('#ncFvcO').textContent=T.fvcO(fvc);$('#ncSnipO').textContent=T.snipO(snip);$('#ncSpoO').textContent=T.spoO(spo);
    let s=bg;
    s+=gauge(L,46,T.gFvc,fvc,T.fvcO(fvc),0,120,[ [0,50,'--bad-soft'],[50,80,sym?'--warn-soft':'--panel-2'] ],[50,80]);
    s+=gauge(L,122,T.gSnip,snip,T.snipO(snip),0,120,[ [0,40,'--bad-soft'],[40,st,sym?'--warn-soft':'--panel-2'] ],[40,st]);
    s+=gauge(L,198,T.gSpo,spo,T.spoO(spo),85,100,[ [85,so+.5,'--warn-soft'] ],[so]);
    rsv.innerHTML=s;
    const C=[ [T.crit[0],fvc<50],[T.crit[1],snip<40],[T.crit[2],fvc<80&&sym],[T.critSnip[R.sex],snip<st&&sym],[T.critFall,R.fall==='y'] ];
    const any=C.some(c=>c[1]),bg2=spo<=so;
    const li=([l,on])=>`<li><span class="tag ${on?'bad':''}">${on?T.reached:T.notReached}</span><span>${l}</span></li>`;
    $('#ncRespNote').innerHTML=`<div class="kicker">${T.respK}</div><h4>${T.respH}</h4><div class="nc-sum ${any?'on':'off'}">${any?T.sumOn:T.sumOff}</div><ul class="nc-crit">${C.map(li).join('')}${li([T.critSpo[R.lung],bg2])}</ul><p>${T.respMore}</p><div class="pt"><b>${UI.plain}</b>${T.respPt}</div><div class="hook"><b>${UI.hook}</b>${T.respHook}</div>`;
  }

  /* ============ 1c screening scores ============ */
  $('#ncScrLede').textContent=T.scrLede;$('#ncScrL').textContent=T.scrL;$('#ncScrCap').textContent=T.scrCap;
  let scr='eat';const ssv=$('#ncScrSvg'),sr=$('#ncScr');
  function setScr(k){scr=k;const D=NC_SCR[k];sr.min=D.min;sr.max=D.max;sr.value=D.def;drawScr()}
  toggleRow($('#ncScrBtns'),Object.entries(NC_SCR).map(([k,v])=>[k,v.b]),scr,setScr);
  sr.addEventListener('input',drawScr);
  function drawScr(){
    const D=NC_SCR[scr],v=+sr.value,N=NARROW();
    const H=D.means.length?(N?192:186):130;
    vb(ssv,`720 ${H}`,`400 ${H}`);
    const x0=N?24:40,w=N?352:640,X=a=>x0+w*(a-D.min)/(D.max-D.min),ay=86;
    let s=bg;
    s+=`<text x="${x0}" y="24" class="t-sm" style="letter-spacing:.06em">${T.cutsK.toUpperCase()}</text>`;
    D.cuts.forEach((c,i)=>{const nx=D.cuts[i+1]??D.max;s+=`<rect x="${f1(X(c))}" y="${ay-20}" width="${f1(X(nx)-X(c))}" height="20" style="fill:var(${i===D.cuts.length-1?'--bad-soft':'--warn-soft'})"/>`});
    s+=`<line x1="${x0}" x2="${x0+w}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:2"/>`;
    D.cuts.forEach(c=>{s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${ay-30}" y2="${ay+8}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(X(c))}" y="${ay-36}" class="t-lbl t-mid">${c}</text>`});
    D.means.slice().reverse().forEach(([m,l],i)=>{const mx=X(m),ly=ay+54+i*16;
      s+=`<path d="M${f1(mx)} ${ay+2} l-4 7 h8z" style="fill:var(--muted)"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${ay+36}" y2="${ly-9}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2"/>`;
      s+=`<text x="${f1(mx+3)}" y="${ly}" class="t-xs">${l}</text>`});
    s+=`<circle cx="${f1(X(v))}" cy="${ay}" r="9" style="fill:var(--steel);stroke:var(--panel);stroke-width:2.5"/>`;
    const ex=clamp(X(v),x0+30,x0+w-30);
    s+=`<text x="${f1(ex)}" y="${ay+28}" class="t-lbl t-mid" style="fill:var(--steel)">${T.ex(v)}</text>`;
    ssv.innerHTML=s;
    $('#ncScrO').textContent=T.scrO(v);
    let z=0;D.cuts.forEach((c,i)=>{if(v>=c)z=i+1});
    $('#ncScrNote').innerHTML=`<div class="kicker">${D.b}</div><h4>${T.ex(v)}</h4><div class="nc-sum ${z?'on':'off'}">${D.zones[z]}</div><p>${D.txt}</p><div class="hook"><b>${UI.hook}</b>${D.hook}</div>`;
  }

  /* ============ 1d visit intervals, NICE vs EAN ============ */
  const vsv=$('#ncVisSvg'),vr=$('#ncVisT');$('#ncVisNote').innerHTML=T.visNote;
  function drawVis(t){
    const N=vb(vsv,'720 230','400 262'),M=t*12;
    const L=N?{x0:24,w:352,y0:56,dy:50,lab:-14}:{x0:250,w:440,y0:44,dy:40,lab:4};
    const X=m=>L.x0+L.w*m/12;let s=bg;
    const cnt=[];
    T.visRows.forEach(([g,n],i)=>{const y=L.y0+i*L.dy,col=i<2?'--steel':'--warn';
      s+=`<text x="${N?L.x0:20}" y="${y+L.lab}" class="t-sm" style="fill:var(${col});font-weight:700">${T.every(g,n)}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(12)}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2"/>`;
      let c=0;for(let m=n;m<=12;m+=n){const on=m<=M+1e-6;if(on)c++;
        s+=`<circle cx="${f1(X(m))}" cy="${y}" r="${on?8:6}" style="fill:${on?`var(${col})`:'var(--panel)'};stroke:var(${col});stroke-width:2"/>`}
      cnt.push(c)});
    const ay=L.y0+3*L.dy+34;
    s+=`<line x1="${X(0)}" x2="${X(12)}" y1="${ay-14}" y2="${ay-14}" class="axis"/>`;
    for(let m=0;m<=12;m+=(N?3:1))s+=`<text x="${f1(X(m))}" y="${ay}" class="t-xs t-mid">${T.mo(m)}</text>`;
    s+=`<text x="${f1(X(12))}" y="${ay+16}" class="t-xs t-end">${T.months}</text>`;
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${L.y0-18}" y2="${ay-14}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    vsv.innerHTML=s;
    $('#ncVisCap').textContent=T.visCap(Math.floor(M+1e-6),cnt[1],cnt[0],cnt[3],cnt[2]);
  }
  playWire(vr,$('#ncVisPlay'),drawVis,9000,UI.replay,'nursing');
  $('#ncAssessCards').innerHTML=NC_CARDS.assess;

  /* ============ 2a giving the medicines ============ */
  $('#ncMedLede').innerHTML=`<p>${T.medLede}</p>`;$('#ncMedCap').textContent=T.medCap;
  let med='tab',setMed=()=>{};
  const msv=$('#ncMedSvg'),mr=$('#ncMedT');
  const dayStrip=(u,x,y,w)=>{const hx=h=>x+w*(h-6)/18;let s=`<rect x="${x}" y="${y+20}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    [9,13,18].forEach(m=>{s+=`<rect x="${f1(hx(m-1))}" y="${y+20}" width="${f1(hx(m+2)-hx(m-1))}" height="12" style="fill:var(--warn-soft);opacity:${f1(ramp(u,0,.3))}"/><rect x="${f1(hx(m-.25))}" y="${y+20}" width="${f1(w*.5/18)}" height="12" style="fill:var(--food)"/>`});
    s+=`<text x="${f1(hx(13.5))}" y="${y+14}" class="t-xs t-mid" style="opacity:${f1(ramp(u,.2,.3))}">${T.noDose}</text>`;
    [7.5,20.5].forEach(d=>{const dy=lerp(y+2,y+26,ease(ramp(u,.3,.7)));
      s+=`<circle cx="${f1(hx(d))}" cy="${f1(dy)}" r="6" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${f1(ramp(u,.25,.32))}"/><text x="${f1(hx(d))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700;opacity:${f1(ramp(u,.7,.8))}">${T.dose}</text>`});
    [6,12,18,24].forEach((h,i)=>s+=`<text x="${f1(hx(h))}" y="${y+50}" class="t-xs ${i===0?'':i===3?'t-end':'t-mid'}">${T.hr(h)}</text>`);
    s+=`<text x="${f1(hx(9))}" y="${y+50}" class="t-xs t-mid" style="fill:var(--food)">${T.meal}</text>`;return s};
  const lftMini=(u,x,y,w)=>{const mx=m=>x+16+(w-32)*m/6;let s=`<text x="${x}" y="${y+10}" class="t-xs">${T.mAx}</text><line x1="${f1(mx(0))}" x2="${f1(mx(3))}" y1="${y+28}" y2="${y+28}" style="stroke:var(--muted);stroke-width:2"/>`;
    [0,1,2,3].forEach((m,k)=>{const on=u>k/5;s+=`<circle cx="${f1(mx(m))}" cy="${y+28}" r="7" style="fill:${on?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/><text x="${f1(mx(m))}" y="${y+50}" class="t-xs t-mid">${m?T.mN(m):T.mBefore}</text>`});
    const o=ramp(u,.78,.9);s+=`<line x1="${f1(mx(3.3))}" x2="${f1(mx(6))}" y1="${y+28}" y2="${y+28}" style="stroke:var(--treat);stroke-width:2.5;stroke-dasharray:5 5;opacity:${f1(o)}"/><text x="${f1(mx(6))}" y="${y+50}" class="t-xs t-end" style="opacity:${f1(o)}">${T.mPer}</text>`;return s};
  const crush=(u,x,y,w)=>{const bw=w*.92,k=1-.0853,e=ease(ramp(u,.15,.8));
    return `<rect x="${x}" y="${y+12}" width="${f1(bw*k)}" height="18" rx="4" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.5"/><rect x="${f1(x+bw*k+2)}" y="${f1(y+12+e*14)}" width="${f1(bw*.0853)}" height="18" rx="3" style="fill:var(--bad);opacity:${f1(1-.45*e)}"/><text x="${x}" y="${y+52}" class="t-sm" style="opacity:${f1(ramp(u,.5,.7))}">${T.crush}</text>`};
  const lines=(u,x,y,w,st)=>st.lines.map((l,k)=>{const o=ramp(u,k*.22,k*.22+.2);return `<g style="opacity:${f1(o)}"><circle cx="${x+6}" cy="${y+10+k*19}" r="4" style="fill:var(--treat)"/><text x="${x+18}" y="${y+14+k*19}" class="t-sm" style="fill:var(--ink)">${l}</text></g>`}).join('');
  const shake=(u,x,y,w)=>{const a=u>0&&u<1?Math.sin(u*Math.PI*14)*14:0;
    return `<g transform="translate(${x+22} ${y+30}) rotate(${f1(a)})"><rect x="-11" y="-22" width="22" height="40" rx="5" style="fill:var(--treat-soft);stroke:var(--treat);stroke-width:1.6"/><rect x="-7" y="-28" width="14" height="7" rx="2" style="fill:var(--treat)"/></g>`+
      `<text x="${x+62}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${T.shake}</text><rect x="${x+62}" y="${y+24}" width="${w-72}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x+62}" y="${y+24}" width="${f1((w-72)*ramp(u,0,.85))}" height="10" rx="5" style="fill:var(--treat)"/><text x="${x+62}" y="${y+50}" class="t-xs">${T.sec(0)}</text><text x="${x+w-10}" y="${y+50}" class="t-xs t-end">${T.sec(30)}</text>`};
  const route=(u,x,y,w,st)=>{const x1=x+46,x2=x+w-44,dx=lerp(x1,x2,ease(ramp(u,.1,.85)));
    return `<rect x="${x}" y="${y+18}" width="46" height="20" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${x+4}" y="${y+22}" width="${f1(36*(1-ramp(u,.1,.85)))}" height="12" style="fill:var(--treat-soft)"/>`+
      `<line x1="${x1}" x2="${x2}" y1="${y+28}" y2="${y+28}" style="stroke:var(--muted);stroke-width:5;stroke-linecap:round"/><circle cx="${f1(dx)}" cy="${y+28}" r="5" style="fill:var(--treat)"/>`+
      `<ellipse cx="${x+w-22}" cy="${y+28}" rx="22" ry="17" style="fill:var(--food-soft);stroke:var(--food);stroke-width:1.5"/><text x="${f1((x1+x2)/2)}" y="${y+14}" class="t-xs t-mid">${st.lbl}</text><text x="${x+w-22}" y="${y+56}" class="t-xs t-mid">${T.stomach}</text>`};
  const discard=(u,x,y,w)=>{const cw=Math.min(20,(w-96)/15),c=Math.floor(ramp(u,0,.85)*15+1e-6);let s='';
    for(let i=0;i<15;i++)s+=`<rect x="${f1(x+i*cw)}" y="${y+14}" width="${f1(cw-3)}" height="18" rx="3" style="fill:${i<c?'var(--treat-soft)':'var(--panel)'};stroke:var(${i<c?'--treat':'--line'});stroke-width:1.2"/>`;
    s+=`<text x="${x}" y="${y+48}" class="t-xs">${T.dayN(1)}</text><text x="${f1(x+15*cw-3)}" y="${y+48}" class="t-xs t-end">${T.dayN(15)}</text>`;
    s+=`<text x="${f1(x+15*cw+8)}" y="${y+28}" class="t-lbl" style="fill:var(--bad);opacity:${c>=15?1:0}">${T.discard}</text>`;return s};
  const tongue=(u,x,y,w,st,mode)=>{const cx=x+80,fy=mode==='place'?lerp(y-2,y+25,ease(ramp(u,0,.7))):y+25,fo=mode==='place'?1:1-ramp(u,.1,.9),fw=mode==='place'?52:52*(1-.5*ramp(u,.1,.9));
    let s=`<path d="M${x+6} ${y+54} Q${cx} ${y+6} ${x+154} ${y+54}Z" style="fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.5"/>`;
    s+=`<rect x="${f1(cx-fw/2)}" y="${f1(fy)}" width="${f1(fw)}" height="6" rx="2" style="fill:var(--treat);opacity:${f1(fo)}"/>`;
    st.lines.forEach((l,k)=>s+=`<text x="${x+176}" y="${y+14+k*18}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(u,k*.2,k*.2+.2))}">${l}</text>`);return s};
  const bags=(u,x,y,w)=>{let s='';[0,1].forEach(b=>{const bx=x+6+b*42,lv=1-ramp(u,b*.5,b*.5+.5);
      s+=`<rect x="${bx}" y="${y+4}" width="30" height="38" rx="7" style="fill:var(--panel);stroke:var(--treat);stroke-width:1.5"/><rect x="${bx+3}" y="${f1(y+7+32*(1-lv))}" width="24" height="${f1(32*lv)}" rx="4" style="fill:var(--treat-soft)"/><text x="${bx+15}" y="${y+54}" class="t-xs t-mid">${T.mg30}</text>`});
    const ax=x+100,aw=w-112;s+=`<text x="${ax}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${T.bags}</text><rect x="${ax}" y="${y+20}" width="${aw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${ax}" y="${y+20}" width="${f1(aw*u)}" height="10" rx="5" style="fill:var(--treat)"/>`;
    [0,30,60].forEach((m,i)=>s+=`<text x="${f1(ax+aw*m/60)}" y="${y+46}" class="t-xs ${i===0?'':i===2?'t-end':'t-mid'}">${T.min(m)}</text>`);return s};
  const cycle=(u,x,y,w)=>{const lx=60,cw=(w-lx)/28,d=Math.floor(ramp(u,0,.9)*28+1e-6);let s='';
    [ [T.cyc1,T.cyc1T,i=>i<14],[T.cycL,T.cycLT,i=>i<10] ].forEach(([lb,lt,on],r)=>{const ry=y+r*31;
      s+=`<text x="${x}" y="${ry+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${lb}</text>`;
      for(let i=0;i<28;i++){const o=on(i),seen=i<d;s+=`<rect x="${f1(x+lx+i*cw)}" y="${ry}" width="${f1(cw-1.5)}" height="12" rx="2" style="fill:${o?'var(--treat)':'var(--panel)'};stroke:var(${o?'--treat':'--line'});opacity:${seen?1:.25}"/>`}
      if(r===1)s+=`<rect x="${f1(x+lx-1)}" y="${ry-1}" width="${f1(cw*14)}" height="14" rx="3" style="fill:none;stroke:var(--treat);stroke-width:1;stroke-dasharray:3 2;opacity:${f1(ramp(u,.3,.4))}"/>`;
      s+=`<text x="${x+lx}" y="${ry+22}" class="t-xs">${lt}</text>`});return s};
  const fast=(u,x,y,w)=>{const hx=h=>x+w*(h+10)/12,c=lerp(-10,2,u);
    let s=`<rect x="${x}" y="${y+22}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(hx(-10))}" y="${y+22}" width="${f1(hx(0)-hx(-10))}" height="12" rx="6" style="fill:var(--air-soft);stroke:var(--air)"/><rect x="${f1(hx(0))}" y="${y+22}" width="${f1(hx(1)-hx(0))}" height="12" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
    s+=`<text x="${f1(hx(-5))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--air)">${T.night}</text><circle cx="${f1(hx(0))}" cy="${y+28}" r="7" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${u>.5?1:.3}"/><text x="${f1(hx(0))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.dose}</text>`;
    s+=`<text x="${x+w}" y="${y+52}" class="t-xs t-end" style="fill:var(--warn)">${T.noFood}</text><line x1="${f1(hx(c))}" x2="${f1(hx(c))}" y1="${y+18}" y2="${y+38}" style="stroke:var(--ink);stroke-width:2"/>`;return s};
  const waits=(u,x,y,w)=>T.waits.map(([l,h],k)=>{const ry=y+4+k*18,bw=(w-186)*h/8*ease(ramp(u,k*.2,k*.2+.4));
    return `<text x="${x}" y="${ry+9}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x+136}" y="${ry}" width="${f1(bw)}" height="11" rx="4" style="fill:var(--warn)"/><text x="${f1(x+142+bw)}" y="${ry+9}" class="t-xs">${T.h(h)}</text>`}).join('');
  const blocks=(u,x,y,list)=>{let s='',cx=x;const n=list.length;list.forEach(([kind,lbl,bw],i)=>{const o=ramp(u,i/n*.9,i/n*.9+.12);
      s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="${f1(cx)}" y="${y}" width="${bw-3}" height="20" rx="4" style="fill:var(${kind==='w'?'--air-soft':'--treat-soft'});stroke:var(${kind==='w'?'--air':'--treat'});stroke-width:1.2"/><text x="${f1(cx+(bw-3)/2)}" y="${y+14}" class="t-xs t-mid" style="fill:var(--ink)">${lbl}</text></g>`;cx+=bw});return s};
  const flush=(u,x,y,w)=>`<text x="${x}" y="${y+18}" class="t-xs" style="fill:var(--ink);font-weight:700">${T.espen}</text>`+blocks(u,x+72,y+4,[ ['w',T.water(30),60],['d',T.drugN(1),52],['w',T.water(30),60],['d',T.drugN(2),52],['w',T.water(30),60] ])+
      `<text x="${x}" y="${y+46}" class="t-xs" style="fill:var(--ink);font-weight:700">${T.lothian}</text>`+blocks(u,x+72,y+32,[ ['w',T.waterMin(30),60],['d',T.drugN(1),52],['w',T.waterMin(5),34],['d',T.drugN(2),52],['w',T.waterMin(30),60] ]);
  const flushOne=(u,x,y,w)=>blocks(u,x,y+8,[ ['w',T.waterMin(30),70],['d',T.dose5,56],['w',T.waterMin(30),70] ])+`<text x="${x}" y="${y+48}" class="t-xs">${T.syringe}</text>`;
  const csf=(u,x,y,w)=>{const bx=x+92,bw=w-170;let s='';
    [ [T.csfOut,T.csfV,10,'--air',ramp(u,0,.8)],[T.qal,T.qalV,15,'--treat',ramp(u,.85,1)] ].forEach(([l,vl,v,c,o],r)=>{const ry=y+8+r*24,ww=bw*v/15*o;
      s+=`<text x="${x}" y="${ry+10}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${bx}" y="${ry}" width="${bw}" height="13" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${ry}" width="${f1(ww)}" height="13" rx="4" style="fill:var(${c})"/><text x="${bx+bw+6}" y="${ry+10}" class="t-xs" style="opacity:${f1(o>0?1:.3)}">${vl}</text>`});return s};
  const bolus=(u,x,y,w)=>{const e=ramp(u,.1,.9),ax=x+150,aw=w-160;
    let s=`<rect x="${x}" y="${y+14}" width="110" height="22" rx="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+3+104*e)}" y="${y+17}" width="${f1(104*(1-e))}" height="16" style="fill:var(--treat-soft)"/><rect x="${f1(x-14+104*e)}" y="${y+12}" width="5" height="26" style="fill:var(--ink)"/><line x1="${x+110}" x2="${x+134}" y1="${y+25}" y2="${y+25}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${ax}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${T.bolus}</text><rect x="${ax}" y="${y+20}" width="${aw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(ax+aw/3)}" y="${y+20}" width="${f1(aw*2/3)}" height="10" style="fill:var(--treat-soft);stroke:var(--treat)"/><line x1="${f1(ax+aw*e)}" x2="${f1(ax+aw*e)}" y1="${y+16}" y2="${y+34}" style="stroke:var(--ink);stroke-width:2"/>`;
    [0,1,2,3].forEach((m,i)=>s+=`<text x="${f1(ax+aw*m/3)}" y="${y+46}" class="t-xs ${i===0?'':i===3?'t-end':'t-mid'}">${T.min(m)}</text>`);return s};
  const evalT=(u,x,y,w)=>{const p=[x+24,x+100,x+176];
    let s=`<line x1="${p[0]}" x2="${p[2]}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2"/><line x1="${p[2]}" x2="${x+w}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:3 5;opacity:${f1(ramp(u,.6,.8))}"/>`;
    [ [p[0],T.evalB,'--steel',0],[p[1],T.dose,'--treat',.25],[p[2],T.evalA,'--steel',.5] ].forEach(([px,l,c,a])=>{const o=ramp(u,a,a+.15);s+=`<circle cx="${px}" cy="${y+26}" r="7" style="fill:var(${c});opacity:${f1(.2+.8*o)}"/><text x="${px}" y="${y+14}" class="t-xs t-mid" style="fill:var(${c});font-weight:700">${l}</text>`});
    s+=`<text x="${x}" y="${y+50}" class="t-xs" style="fill:var(--ink);opacity:${f1(ramp(u,.6,.8))}">${T.noFixed}</text>`;return s};
  const tofSched=(u,x,y,w)=>{const dx=d=>x+14+(w-28)*d/112,c=u*112;
    let s=`<line x1="${f1(dx(0))}" x2="${f1(dx(112))}" y1="${y+26}" y2="${y+26}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<text x="${f1(dx(14))}" y="${y+12}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.loading}</text><text x="${f1(dx(84))}" y="${y+12}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.every28}</text>`;
    [0,14,28,56,84,112].forEach((d,i)=>{const on=c>=d-1e-6;s+=`<circle cx="${f1(dx(d))}" cy="${y+26}" r="7" style="fill:${on?(i<3?'var(--treat)':'var(--treat-soft)'):'var(--panel)'};stroke:var(--treat);stroke-width:2"/><text x="${f1(dx(d))}" y="${y+48}" class="t-xs t-mid">${T.dayN(d)}</text>`});return s};
  const empty=(u,x,y,w)=>{const mx=m=>x+w*(m+60)/120,c=lerp(-60,60,u);
    let s=`<rect x="${x}" y="${y+22}" width="${w}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
    [ [-60,-30,1],[-30,-15,.4],[15,30,.4],[30,60,1] ].forEach(([a,b,o])=>{const bb=Math.min(b,c);if(bb>a)s+=`<rect x="${f1(mx(a))}" y="${y+22}" width="${f1(mx(bb)-mx(a))}" height="12" style="fill:var(--food);opacity:${o}"/>`});
    s+=`<circle cx="${f1(mx(0))}" cy="${y+28}" r="7" style="fill:var(--treat);stroke:var(--panel);stroke-width:2;opacity:${c>=0?1:.3}"/>`;
    s+=`<text x="${f1(mx(-45))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.feed}</text><text x="${f1(mx(0))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--treat);font-weight:700">${T.drug}</text><text x="${f1(mx(45))}" y="${y+14}" class="t-xs t-mid" style="fill:var(--food);font-weight:700">${T.feed}</text>`;
    s+=`<text x="${f1(mx(-22.5))}" y="${y+50}" class="t-xs t-mid">${T.gap}</text><text x="${f1(mx(22.5))}" y="${y+50}" class="t-xs t-mid">${T.gap}</text>`;return s};
  const G={day:dayStrip,lft:lftMini,crush,lines,shake,route,discard,tongue:(u,x,y,w,st)=>tongue(u,x,y,w,st,'place'),dissolve:(u,x,y,w,st)=>tongue(u,x,y,w,st,'dissolve'),bags,cycle,fast,waits,flushOne,flush,csf,bolus,evalT,tofSched,empty};
  function drawMed(t){
    const M=NC_MEDS[med],n=M.steps.length,N=NARROW();
    const rowH=N?106:Math.min(82,360/n);
    vb(msv,'720 400',`400 ${30+n*106}`);
    const p=phaseOf(M.steps,t);let s=bg;
    M.steps.forEach((st,i)=>{
      const u=i===p?clamp((t-st.from)*n):1,y=16+i*rowH,cur=i===p,done=i<p;
      s+=`<g style="opacity:${i>p?.3:1}">`;
      if(cur)s+=`<rect x="8" y="${f1(y)}" width="${N?384:704}" height="${f1(rowH-6)}" rx="10" style="fill:var(--treat-soft);opacity:.6"/>`;
      const bx=N?28:30,by=N?y+20:y+(rowH-6)/2;
      s+=`<circle cx="${bx}" cy="${f1(by)}" r="13" style="fill:${done?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/>`;
      s+=done?tick(bx,by-1,'var(--panel)',2.6):`<text x="${bx}" y="${f1(by+4)}" class="t-sm t-mid" style="fill:var(--treat);font-weight:700">${i+1}</text>`;
      const tl=wrap(st.t,N?34:21);
      s+=txt(bx+22,by+5-(tl.length-1)*8,tl,'t-lbl',16);
      const gx=N?22:262,gy=N?y+40:y+(rowH-6)/2-28,gw=N?356:440;
      s+=G[st.g](u,gx,gy,gw,st);
      s+='</g>'});
    msv.innerHTML=s;
    setMed(p);const S=M.steps[p];
    $('#ncMedNote').innerHTML=noteHTML({k:M.n,t:S.t,txt:S.d,pt:M.pt,hook:M.hook});
  }
  const stopMed=playWire(mr,$('#ncMedPlay'),drawMed,16000,UI.replay,'nursing');
  function useMed(k){med=k;stopMed();const M=NC_MEDS[k],n=M.steps.length;
    M.steps.forEach((s,i)=>{s.from=i/n;s.at=i/n+.45/n});
    const old=$('#ncMedSteps'),nw=old.cloneNode(false);old.replaceWith(nw);setMed=stepWire(nw,M.steps,mr,drawMed,stopMed);
    mr.value=M.steps[0].at;drawMed(+mr.value)}
  toggleRow($('#ncMedBtns'),Object.entries(NC_MEDS).map(([k,v])=>[k,v.b]),med,useMed);

  /* ============ 2b liver tests, US vs EU ============ */
  const lsv=$('#ncLftSvg'),lr=$('#ncLftT');$('#ncLftNote').innerHTML=T.lftNote;
  const LFT=[ [T.lftUS,[0,1,2,3],3],[T.lftEU,[1,2,3,6,9,12],12] ];
  function drawLft(t){
    const N=vb(lsv,'720 210','400 204'),M=t*15;
    const L=N?{x0:24,w:352,y0:62,dy:66,lab:-20}:{x0:200,w:490,y0:56,dy:60,lab:4};
    const X=m=>L.x0+L.w*m/15;let s=bg,cnt=[];
    LFT.forEach(([lb,ds,last],r)=>{const y=L.y0+r*L.dy;
      s+=`<text x="${N?L.x0:20}" y="${y+L.lab}" class="t-lbl">${lb}</text>`;
      s+=`<line x1="${X(0)}" x2="${X(last)}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:2"/><line x1="${f1(X(last+.4))}" x2="${X(15)}" y1="${y}" y2="${y}" style="stroke:var(--treat);stroke-width:2.5;stroke-dasharray:5 5"/>`;
      s+=`<text x="${X(15)}" y="${y-12}" class="t-xs t-end" style="fill:var(--treat)">${T.lftPer}</text>`;
      let c=0;ds.forEach(m=>{const on=m<=M+1e-6;if(on)c++;s+=`<circle cx="${f1(X(m))}" cy="${y}" r="${on?8:6}" style="fill:${on?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:2"/>`;
        if(m===0)s+=`<text x="${f1(X(0))}" y="${y+22}" class="t-xs t-mid">${T.lftBefore}</text>`});
      cnt.push(c)});
    const ay=L.y0+L.dy+46;
    s+=`<line x1="${X(0)}" x2="${X(15)}" y1="${ay-14}" y2="${ay-14}" class="axis"/>`;
    for(let m=0;m<=12;m+=(N?3:1))s+=`<text x="${f1(X(m))}" y="${ay}" class="t-xs t-mid">${T.mo(m)}</text>`;
    s+=`<rect x="${f1(X(12.3))}" y="${ay-12}" width="${f1(X(15)-X(12.3))}" height="4" style="fill:var(--treat-soft)"/><text x="${X(15)}" y="${ay+16}" class="t-xs t-end">${T.lftAfter}</text><text x="${X(0)}" y="${ay+16}" class="t-xs">${T.mAx}</text>`;
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${L.y0-24}" y2="${ay-14}" style="stroke:var(--ink);stroke-width:1.5;opacity:.45"/>`;
    lsv.innerHTML=s;
    $('#ncLftCap').textContent=T.lftCap(Math.floor(M+1e-6),cnt[0],cnt[1])+' '+T.lftDraw;
  }
  playWire(lr,$('#ncLftPlay'),drawLft,9000,UI.replay,'nursing');
  $('#ncMedCards').innerHTML=NC_CARDS.med;

  /* ============ 3a gastrostomy care, ESPEN vs ESGE ============ */
  let peg='espen';const psv=$('#ncPegSvg'),pr=$('#ncPegT');$('#ncPegCap').textContent=T.pegCap;
  const PL=T.pegLbl;
  function pegActs(d){return peg==='espen'?{turn:true,push:d===6}:{turn:false,push:true}}
  function drawPeg(t){
    const N=vb(psv,'720 300','400 520');
    const ox=N?20:24,oy=N?36:44,lx=N?24:430,ly=N?306:54,ldy=N?30:33,lw=N?352:266;
    const d=Math.min(6,Math.floor(t*7)),u=clamp(t*7-d),A=pegActs(d);
    const dx=A.push?-26*bump(u,.05,.55):0,rot=A.turn?ramp(u,A.push?.55:.1,A.push?.95:.8):0,gap=peg==='esge'?18:10;
    let s=bg;
    s+=`<text x="${ox}" y="${oy-16}" class="t-sm" style="letter-spacing:.06em">${T.pegHead.toUpperCase()}</text>`;
    s+=`<g transform="translate(${ox} ${oy})">`;
    s+=`<rect x="0" y="20" width="120" height="190" style="fill:var(--food-soft)"/><rect x="120" y="20" width="20" height="190" style="fill:var(--muscle)"/><rect x="140" y="20" width="70" height="190" style="fill:var(--cell)"/><rect x="210" y="20" width="4" height="190" style="fill:var(--muscle-line)"/>`;
    s+=`<text x="10" y="40" class="t-xs">${PL.stomach}</text><text x="175" y="14" class="t-xs t-mid">${PL.abd}</text><text x="128" y="226" class="t-xs t-mid">${PL.wall}</text><text x="214" y="226" class="t-xs t-mid">${PL.skin}</text>`;
    s+=`<rect x="${f1(60+dx)}" y="108" width="${f1(300-dx)}" height="14" rx="3" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<rect x="${f1(100+dx)}" y="80" width="14" height="70" rx="7" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><text x="8" y="66" class="t-xs">${PL.ib}</text><path d="M60 70 L102 82" style="stroke:var(--muted);stroke-width:1"/>`;
    s+=`<rect x="${214+gap}" y="90" width="12" height="50" rx="4" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:2"/><text x="228" y="80" class="t-xs">${PL.eb}</text>`;
    if(peg==='esge')s+=`<path d="M214 152 v6 h${gap} v-6" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="216" y="172" class="t-xs" style="fill:var(--ink)">${PL.gap}</text>`;
    if(A.push){const o=bump(u,.02,.6);s+=`<g style="opacity:${f1(o)}"><path d="M340 180 h-60" style="stroke:var(--treat);stroke-width:2.5;fill:none" marker-end="url(#ncArr)"/><text x="350" y="198" class="t-xs t-end" style="fill:var(--treat);font-weight:700">${peg==='espen'?PL.pushE:PL.push}</text></g>`}
    if(A.turn){const a=Math.max(.15,rot*1.8*Math.PI),cx=300,cy=115,rx=9,ry=24,ex=cx+rx*Math.sin(a),ey=cy-ry*Math.cos(a);
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:var(--treat);stroke-width:1.2;stroke-dasharray:3 3;opacity:.45"/>`;
      if(rot>0)s+=`<path d="M${cx} ${cy-ry} A${rx} ${ry} 0 ${a>Math.PI?1:0} 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--treat);stroke-width:2.5" marker-end="url(#ncArr)"/>`;
      s+=`<text x="${cx+16}" y="${cy-14}" class="t-xs" style="fill:var(--treat);font-weight:700">${PL.turn}</text>`}
    s+='</g>';
    s=s.replace(bg,bg+`<defs>${marker('ncArr','var(--treat)')}</defs>`);
    for(let i=0;i<7;i++){const y=ly+i*ldy,a=pegActs(i),on=i===d,past=i<d;
      if(on)s+=`<rect x="${lx-8}" y="${y-18}" width="${lw+16}" height="${ldy-4}" rx="8" style="fill:var(--treat-soft)"/>`;
      s+=`<text x="${lx}" y="${y}" class="t-lbl" style="opacity:${on||past?1:.55}">${T.pegDay(i+1)}</text>`;
      s+=`<text x="${lx+lw}" y="${y}" class="t-sm t-end" style="fill:var(${on?'--treat':'--muted'});font-weight:${on?700:500}">${a.turn&&a.push?T.pegBoth:a.turn?T.pegTurn:T.pegPush}</text>`;
      if(past)s+=tick(lx+lw*.45,y-5,'var(--good)')}
    psv.innerHTML=s;
    $('#ncPegNote').innerHTML=`<div class="kicker">${T.pegModes.find(m=>m[0]===peg)[1]}</div><h4>${T.pegH(d+1,A.turn&&A.push?T.pegBoth:A.turn?T.pegTurn:T.pegPush)}</h4><p>${T.pegNote[peg]}</p><p>${T.pegCommon}</p><div class="hook"><b>${UI.hook}</b>${T.pegHook}</div><div class="pt"><b>${UI.plain}</b>${T.pegPt}</div>`;
  }
  const stopPeg=playWire(pr,$('#ncPegPlay'),drawPeg,14000,UI.replay,'nursing');
  toggleRow($('#ncPegBtns'),T.pegModes,peg,v=>{peg=v;stopPeg();drawPeg(+pr.value)});

  /* ============ 3b oxygen targets ============ */
  const osv=$('#ncO2Svg');$('#ncO2Note').innerHTML=T.o2Note;$('#ncO2Cap').textContent=T.o2Cap;
  function drawO2(){
    const N=NARROW(),x0=N?24:40,w=N?352:640,X=v=>x0+w*(v-80)/20,ay=84,mx=N?50:92;
    const leg=T.o2Bands.map(b=>wrap(T.o2Leg(b[3],b[4]),mx));let hh=ay+44;leg.forEach(l=>hh+=l.length*15+10);
    vb(osv,`720 ${hh}`,`400 ${hh}`);
    let s=bg+`<text x="${x0}" y="26" class="t-sm" style="letter-spacing:.06em">${T.o2Ax}</text>`;
    T.o2Bands.forEach(([a,b,c,lb])=>{s+=`<rect x="${f1(X(a))}" y="${ay-30}" width="${f1(X(b)-X(a))}" height="30" rx="4" style="fill:var(${c}-soft);stroke:var(${c});stroke-width:1.5"/><text x="${f1((X(a)+X(b))/2)}" y="${ay-11}" class="t-sm t-mid" style="fill:var(${c});font-weight:700">${lb}</text>`});
    s+=`<line x1="${x0}" x2="${x0+w}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:2"/>`;
    for(let v=80;v<=100;v+=2)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ay}" y2="${ay+5}" style="stroke:var(--muted)"/><text x="${f1(X(v))}" y="${ay+18}" class="t-xs t-mid">${v}</text>`;
    let y=ay+44;T.o2Bands.forEach(([a,b,c,lb],i)=>{s+=`<rect x="${x0}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(${c}-soft);stroke:var(${c})"/>`+txt(x0+20,y,leg[i],'t-sm',15,'fill:var(--ink)');y+=leg[i].length*15+10});
    osv.innerHTML=s;
  }

  /* ============ 3c misunderstandings ============ */
  $('#ncMythLede').textContent=T.mythLede;let myth=0;
  $('#ncMyths').innerHTML=NC_MYTHS.map((m,i)=>`<button class="nc-q" data-nm="${i}" aria-pressed="${i===myth}"><span class="myth">${T.mythK}</span><b>${m.m}</b></button>`).join('');
  function renderMyth(){$$('#ncMyths [data-nm]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.nm===myth));const M=NC_MYTHS[myth];
    $('#ncMythNote').innerHTML=`<div class="kicker">${T.mythA}</div><h4>${M.m}</h4><p>${M.a}</p>`}
  $('#ncMyths').addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;myth=+b.dataset.nm;renderMyth()});
  renderMyth();
  $('#ncTeachCards').innerHTML=NC_CARDS.teach;

  /* ============ 4 the note builder ============ */
  $('#ncDocLede').innerHTML=`<p>${T.docLede}</p>`;$('#ncDocK').textContent=T.docK;$('#ncDocCap').textContent=T.docCap;$('#ncDocAll').textContent=T.docAll;$('#ncDocNone').textContent=T.docNone;
  const ds={};NC_DOC.forEach(f=>ds[f.k]=f.c);
  function renderDoc(){
    $('#ncDocFields').innerHTML=NC_DOC.map(f=>`<label><input type="checkbox" data-nd="${f.k}" ${ds[f.k]?'checked':''}><span>${f.l}</span></label>`).join('');
    const out=NC_DOC.filter(f=>ds[f.k]).map(f=>f.v);$('#ncDocOut').textContent=out.length?out.join('\n\n'):T.docEmpty}
  $('#ncDocFields').addEventListener('change',e=>{const i=e.target.closest('[data-nd]');if(!i)return;ds[i.dataset.nd]=i.checked;renderDoc()});
  $('#ncDocAll').onclick=()=>{NC_DOC.forEach(f=>ds[f.k]=true);renderDoc()};
  $('#ncDocNone').onclick=()=>{NC_DOC.forEach(f=>ds[f.k]=false);renderDoc()};
  renderDoc();
  $('#ncDocCards').innerHTML=NC_CARDS.doc;

  /* ---- first paint, and redraws when the layout flips ---- */
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawResp();drawScr();drawO2()};
  draw(+rg.value);drawResp();setScr('eat');drawVis(+vr.value);useMed('tab');drawLft(+lr.value);drawPeg(+pr.value);drawO2();
};
