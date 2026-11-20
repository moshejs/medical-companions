/* =============== 4.3 nursing =============== */
/* ---- the late dose clock: an invented schedule, ward rounds and three ways the day can go ---- */
const NU_DOSE=[7,10,13,16,19,22];
const NU_ROUND=[8,12,18,22];
const NU_MODE={
 on:{g:[7.08,10.05,12.97,16.1,19.03,22.07],why:['','','','','',''],
   rem:`Every dose is given close to the person's own time, so the ribbon stays ON for most of the day; only the early-morning OFF, before the first dose works, remains.`},
 late:{g:[8.08,10.33,12.17,18,19.75,22.17],why:['given with the 08:00 round','','given early, with the 12:00 round','given with the 18:00 round','',''],
   rem:`Doses are pulled towards the ward rounds: some an hour or two late, one given early. Gaps open into OFF time, and two doses close together bunch into a peak with dyskinesia.`},
 miss:{g:[8.08,null,null,17.83,null,22.08],why:['given with the 08:00 round','missed: nil by mouth for a scan','missed: still nil by mouth','given after the scan','missed: not on the ward formulary',''],
   rem:`Three doses are missed: two while the person is nil by mouth for a scan with no other route arranged, and one because the drug is not stocked on the ward. The ribbon stays OFF for hours.`}
};
/* schematic response to one dose, d hours after it is given: acts after about 20 to 30 minutes, wears off after about three hours */
const NU_K=d=>d<1/3?0:d<.75?ease((d-1/3)/(.75-1/3)):d<2.75?1:d<3.5?1-ease((d-2.75)/.75):0;
const NU_CLK=[
 {from:0,at:.03,k:'06:00 · Before the first dose',t:'The person\'s own times',
  txt:`The day starts OFF, before the first dose has worked. At home this person takes levodopa at 07:00, 10:00, 13:00, 16:00, 19:00 and 22:00 (an invented schedule). NICE NG71 says people with Parkinson's in hospital or a care home should have their medicines at the appropriate times, "which in some cases may mean allowing self-medication". [[NICE2017]] Quality statement 4 measures this as levodopa taken within 30 minutes of the individually prescribed time. [[NICE2018QS]]`,
  pt:'The right time is the person\'s own time, not the ward routine.',
  hook:`QS164 statement 4: levodopa within 30 minutes of the person's prescribed time. [[NICE2018QS]]`},
 {from:.1,at:.13,k:'08:00 · The first drug round',t:'The round, not the clock',
  txt:`Ward rounds run at fixed times. In a US veterans' hospital study (3,873 Parkinson's doses timed by barcode), 675 administrations were incorrect: 322 omitted, 300 late by 30 minutes or more and 53 early by 30 minutes or more. Correct administration was lower in the first 2 days of admission (74.6% vs 82.8%) and higher when a neurologist was consulted (85.5% vs 76.5%). [[Hou2012]]`,
  pt:'Doses get pulled to the round times, and the first two days of a stay are the worst.'},
 {from:.24,at:.3,k:'Late morning · The window',t:'How late is too late?',
  txt:`Oral levodopa usually takes "at least 20 to 30 minutes" to take effect. [[Freitas2017]] Parkinson's UK says a delay of as little as 30 minutes can mean the difference between functioning well and being unable to move, walk, talk or swallow, and asks hospitals to report any dose more than 30 minutes late as an adverse event. [[PUK2023]] The Parkinson's Foundation's US hospital summary is tighter: within ±15 minutes of the home schedule. [[PF2023]]`,
  hook:`Two windows: NICE 30 minutes; Parkinson's Foundation ±15 minutes. [[NICE2018QS,PF2023]]`},
 {from:.4,at:.46,k:'Afternoon · Missed',t:'When a dose never comes',
  txt:`NICE says Parkinson's medicines should not be withdrawn abruptly, or allowed to fail suddenly through poor absorption, because of the risk of acute akinesia or neuroleptic malignant syndrome. [[NICE2017]] Parkinsonism-hyperpyrexia syndrome looks like neuroleptic malignant syndrome: rigidity, fever and reduced consciousness, with reported mortality up to 4%. [[Newman2009]] Nil by mouth does not have to mean no Parkinson's medicine; the guidance describes other routes (see the Nil by mouth tab). [[Alty2016,PUKEmergency2023]]`,
  pt:'A missed dose is not a neutral event. Hours of OFF can follow, and stopping suddenly can be dangerous.',
  hook:`Never stop abruptly: risk of acute akinesia and an NMS-like parkinsonism-hyperpyrexia syndrome. [[NICE2017,Newman2009]]`},
 {from:.57,at:.63,k:'Evening · What follows',t:'Late doses and longer stays',
  txt:`In 339 hospital encounters, people with a delayed or missed dose stayed a mean 8.2 days against 3.6. [[MartinezRamirez2015]] In a Dutch survey of 684 people, incorrect anti-parkinsonian medication in hospital was linked to deterioration (OR 5.8, 95% CI 2.5 to 13.7). [[Gerlach2012]] These studies are observational; the research for this guide found no randomised trial of on-time dosing. [[Lance2021,Gerlach2012,Hou2012]]`,
  pt:'People whose doses go wrong tend to do worse and stay longer, though these studies cannot prove cause.'},
 {from:.8,at:.9,k:'Night · What helps',t:'Fixing the system',
  txt:`A New Zealand before-and-after study (staff education, sticker alerts, pharmacist priority review) cut the medication error rate from 22.5% to 9.3%; mean stay fell from 13 to 8 days, not significantly. [[Lance2021]] In UK audit data, 58% of people admitted in 2022 did not get their medication on time every time, and in a Parkinson's UK survey 48% of people admitted wanted to manage and take their own medication. [[PUK2023]]`,
  hook:`Get It On Time: report any dose more than 30 minutes late as an adverse event. [[PUK2023]]`}
];

/* ---- MDS-UPDRS (items paraphrased from the 2019 official form) ---- */
const NU_UP=[
 {p:'I',n:'Non-motor experiences of daily living',items:13,rat:13,
  who:`13 questions. Part IA (items 1.1 to 1.6) is rated by the clinician; Part IB (1.7 to 1.13) is completed by the patient. [[MDS2019UPDRS]]`,
  list:['1.1 Cognitive impairment','1.2 Hallucinations and psychosis','1.3 Depressed mood','1.4 Anxious mood','1.5 Apathy','1.6 Features of dopamine dysregulation syndrome','1.7 Sleep problems','1.8 Daytime sleepiness','1.9 Pain','1.10 Urinary problems','1.11 Constipation','1.12 Light-headedness on standing','1.13 Fatigue']},
 {p:'II',n:'Motor experiences of daily living',items:13,rat:13,
  who:`13 items, all completed by the patient. [[MDS2019UPDRS]]`,
  list:['2.1 Speech','2.2 Saliva and drooling','2.3 Chewing and swallowing','2.4 Eating tasks','2.5 Dressing','2.6 Hygiene','2.7 Handwriting','2.8 Hobbies','2.9 Turning in bed','2.10 Tremor','2.11 Getting out of bed, a car or a deep chair','2.12 Walking and balance','2.13 Freezing']},
 {p:'III',n:'Motor examination',items:18,rat:33,
  who:`18 items. Several are rated separately for each side or body region, giving 33 scored ratings: rigidity, for example, is rated for the neck and each limb, and rest tremor amplitude for four limbs plus lip and jaw. Ratings are whole numbers ("no half points, no missing ratings"); "UR" (unable to rate) is used only when testing is impossible, such as after an amputation, and otherwise the rater is told to "rate what you see". Before the examination the form records whether the person takes Parkinson's medication, the ON or OFF state and minutes since the last levodopa dose; afterwards, whether dyskinesia was present and interfered, then the Hoehn and Yahr stage. [[MDS2019UPDRS]]`,
  list:['3.1 Speech','3.2 Facial expression','3.3 Rigidity','3.4 Finger tapping','3.5 Hand movements','3.6 Pronation-supination','3.7 Toe tapping','3.8 Leg agility','3.9 Arising from chair','3.10 Gait','3.11 Freezing of gait','3.12 Postural stability','3.13 Posture','3.14 Global spontaneity of movement','3.15 Postural tremor','3.16 Kinetic tremor','3.17 Rest tremor amplitude','3.18 Constancy of rest tremor']},
 {p:'IV',n:'Motor complications',items:6,rat:6,
  who:`6 items. Item 4.5 bands how predictable OFF periods are: 1 = predictable more than 75% of the time, 2 = 51% to 75%, 3 = 26% to 50%, 4 = 25% or less. [[MDS2019UPDRS]]`,
  list:['4.1 Time with dyskinesia','4.2 Functional impact of dyskinesia','4.3 Time in OFF','4.4 Functional impact of fluctuations','4.5 Complexity of fluctuations','4.6 Painful OFF-state dystonia']}
];
const NU_HY=[
 {s:'No signs',f:'Asymptomatic.'},
 {s:'One side only',f:'Unilateral involvement only.'},
 {s:'Both sides, balance intact',f:'Bilateral involvement without impairment of balance.'},
 {s:'Balance impaired, independent',f:'Mild to moderate involvement; some postural instability but physically independent; needs assistance to recover from the pull test.'},
 {s:'Severe disability, stands or walks unaided',f:'Severe disability; still able to walk or stand unassisted.'},
 {s:'Wheelchair or bed unless aided',f:'Wheelchair-bound or bedridden unless aided.'}
];
/* invented example readings for the orthostatic check: supine, 1 min, 3 min as [sys, dia, hr] */
const NU_OHX=[
 {b:'Example: small heart-rate rise',v:[[132,78,68],[106,64,72],[100,60,74]],bb:false},
 {b:'Example: large heart-rate rise',v:[[124,76,70],[100,66,92],[102,66,96]],bb:false},
 {b:'Example: supine hypertension',v:[[168,94,66],[146,86,70],[142,84,71]],bb:false},
 {b:'Example: no fall',v:[[126,78,70],[122,80,78],[124,80,80]],bb:false}
];

/* ---- nil by mouth ---- */
const NU_ROUTES=[
 {k:'mouth',n:'By mouth',d:'Tablets, or dispersible in thickened fluid'},
 {k:'ng',n:'Nasogastric tube',d:'Dispersible levodopa, flushed after'},
 {k:'patch',n:'Skin patch',d:'Rotigotine, site rotated every 24 h'},
 {k:'sc',n:'Under the skin',d:'Apomorphine pump or injection'},
 {k:'pej',n:'Jejunal tube (PEJ)',d:'Levodopa-carbidopa gel (Duodopa)'}
];
const NU_RST={use:['Used','var(--sky)'],cont:['Continues','var(--good)'],alt:['Substitute','var(--warn)'],no:['Not used','var(--muted)']};
const NU_NBM=[
 {k:'surg',b:'Planned surgery',r:{mouth:'use',ng:'no',patch:'no',sc:'no',pej:'no'},
  t:'Keep the oral routine as close to surgery as allowed',
  txt:`Parkinson's UK guidance before elective surgery: oral medicines may be taken with clear fluids up to 2 hours before surgery; the person goes first on the list where possible; and regional anaesthesia, compared with general, allows usual medication to continue. [[PUKEmergency2023]] NICE warns against letting medicines fail suddenly through poor absorption, naming abdominal surgery as an example. [[NICE2017]]`,
  hook:`Clear fluids up to 2 h before; first on the list; regional where possible. [[PUKEmergency2023]]`},
 {k:'thick',b:'Swallow impaired, some oral intake',r:{mouth:'use',ng:'no',patch:'no',sc:'no',pej:'no'},
  t:'Change the form, not the dose times',
  txt:`Dispersible preparations in thickened fluids are one of the published routes. [[Alty2016]] Parkinson's UK: tablets can be given one at a time on a teaspoon with soft food or thickened fluid; modified-release products (CR, MR, XL, PR) are never crushed or split, and other tablets are broken only if scored. [[PUKEmergency2023]] Extended-release carbidopa-levodopa "should not be chewed or crushed". [[FDAcdld2026]] NICE offers speech and language therapy for swallowing problems. [[NICE2017]]`,
  pt:'If tablets are hard to swallow, the medicine can change form, but the times stay the same.'},
 {k:'ng',b:'Swallow unsafe: tube possible',r:{mouth:'no',ng:'use',patch:'alt',sc:'no',pej:'no'},
  t:'Levodopa down the tube',
  txt:`Parkinson's UK prefers a nasogastric tube for levodopa, because it is absorbed mainly in the jejunum. Dispersible co-beneldopa is used, controlled-release doses are converted to a dispersible equivalent because of reduced bioavailability, and the tube is flushed after liquid medicines. COMT and MAO-B inhibitors are not licensed for enteral tubes and can usually be omitted for a short time; oral dopamine agonists are not licensed for tubes either, and rotigotine patches are the substitute. [[PUKEmergency2023]]`,
  hook:`NG tube: dispersible levodopa; agonist → rotigotine patch; COMT/MAO-B usually omitted for a short time. [[PUKEmergency2023]]`},
 {k:'patch',b:'No tube tolerated',r:{mouth:'no',ng:'no',patch:'use',sc:'no',pej:'no'},
  t:'The rotigotine patch',
  txt:`The guidance places the rotigotine patch as an option when an NG, NJ or PEG tube is not tolerated. It "could be contraindicated in delirium", and the patch is removed before MRI or cardioversion because its backing contains aluminium. [[PUKEmergency2023]] PDMedCalc, the calculator Parkinson's UK now points to, applies a correction factor so rotigotine doses are not too large, because large doses can cause confusion, hallucinations or delirium. [[PUKCalc2025]]`,
  pt:'A patch can stand in for tablets for a while, but it is not a perfect swap, and too much can cause confusion.'},
 {k:'apo',b:'Uses an apomorphine pump',r:{mouth:'use',ng:'no',patch:'no',sc:'cont',pej:'no'},
  t:'The pump keeps running',
  txt:`Apomorphine pumps continue at the prescribed rate, and settings change only on specialist request. [[PUKEmergency2023]] PDMedCalc needs no conversion for apomorphine. [[PUKCalc2025]] Ondansetron and the other 5HT3 antagonists are contraindicated with apomorphine because of profound hypotension and loss of consciousness. [[FDAapokyn2024]]`,
  hook:`Apomorphine user: no ondansetron (5HT3 antagonists contraindicated). [[FDAapokyn2024]]`},
 {k:'duo',b:'Uses Duodopa',r:{mouth:'no',ng:'no',patch:'alt',sc:'no',pej:'cont'},
  t:'Intestinal gel continues if the gut works',
  txt:`Duodopa continues if gastric emptying and the PEJ tube are working; if not, it is replaced with rotigotine. [[PUKEmergency2023]] Duodopa and ProDuodopa need no conversion in PDMedCalc. [[PUKCalc2025]] The Parkinson's Foundation says the device is turned off, disconnected and taken out of the room during imaging, and that people may bring their own cassettes. [[PF2023]]`},
 {k:'eol',b:'End of life',r:{mouth:'use',ng:'no',patch:'alt',sc:'no',pej:'no'},
  t:'Not stopped at the end of life',
  txt:`In end-of-life care, Parkinson's medication is not stopped; people who cannot take it by mouth are converted to rotigotine. [[PUKEmergency2023]] NICE recommends discussing prognosis and advance care planning, and considering referral to palliative care at any stage. [[NICE2017]]`,
  pt:'Even at the end of life, the medicine keeps the person more comfortable and is continued in another form.'}
];

/* ---- contraindicated-drug checker ---- */
const NU_V={avoid:['Avoid','var(--bad)','var(--bad-soft)'],contra:['Contraindicated','var(--bad)','var(--bad-soft)'],worse:['Can worsen','var(--warn)','var(--warn-soft)'],caution:['Caution','var(--warn)','var(--warn-soft)'],
 consider:['Consider','var(--good)','var(--good-soft)'],safe:['Safe list','var(--good)','var(--good-soft)'],ns:['Not named','var(--muted)','var(--panel-2)']};
const NU_SRCN=['NICE NG71',"Parkinson's UK","Parkinson's Foundation",'US drug label'];
const NU_PUKAP=`Avoid haloperidol, chlorpromazine and other antipsychotics. [[PUKEmergency2023]]`;
const NU_PUKAE=`Avoid metoclopramide and prochlorperazine: they "can worsen Parkinson's symptoms and in some cases can be fatal". [[PUKEmergency2023]]`;
const NU_PUKCY=`Cyclizine and ondansetron can be used after surgery but may cause confusion and altered consciousness. [[PUKEmergency2023]]`;
const NU_PUKCONF=`For confusion, consider a benzodiazepine rather than antipsychotics if a drug is needed; the avoid list names haloperidol, chlorpromazine "and other antipsychotics". [[PUKEmergency2023]]`;
const NU_PFAE=`Lists prochlorperazine, metoclopramide, promethazine and droperidol as anti-sickness drugs to avoid. [[PF2023]]`;
const NU_PFEX=`One of three antipsychotics the avoid list makes an exception for (pimavanserin, quetiapine and clozapine). [[PF2023]]`;
const NU_LNEU=`The carbidopa-levodopa label describes NMS-like cases after levodopa is reduced or withdrawn and advises close observation, "especially if the patient is receiving neuroleptics". [[FDAcdld2026]]`;
const NU_RAS=`The rasagiline label contraindicates it because of the risk of serotonin syndrome or psychosis; at least 14 days should pass between stopping rasagiline and starting it. [[FDArasagiline2026]]`;
const NU_PFOP=`Frames MAO-B inhibitor and opioid combinations as "beware of mixing" rather than as absolute contraindications. [[PF2023]]`;
const NU_NS=`Not named in the guidance read for this guide.`;
const NU_DRUGS=[
 {k:'halo',g:'Antipsychotics',n:'Haloperidol',o:'avoid',lab:'Levodopa label',
  sum:'Both patient organisations list it to avoid, and NICE says butyrophenones such as haloperidol can worsen motor features.',
  s:[['worse','Butyrophenones can worsen motor features',`Other antipsychotics, such as phenothiazines and butyrophenones, can worsen the motor features of Parkinson's. [[NICE2017]]`],['avoid','Names haloperidol and other antipsychotics',NU_PUKAP],['avoid','Typical antipsychotics on the avoid list',`Lists haloperidol and other typical antipsychotics as drugs to avoid. [[PF2023]]`],['caution','NMS-like risk with neuroleptics',NU_LNEU]]},
 {k:'chlor',g:'Antipsychotics',n:'Chlorpromazine and other typical antipsychotics',o:'avoid',lab:'Levodopa label',
  sum:'Both patient organisations list them to avoid, and NICE says phenothiazines can worsen motor features.',
  s:[['worse','Phenothiazines can worsen motor features',`Other antipsychotics, such as phenothiazines and butyrophenones, can worsen the motor features of Parkinson's. [[NICE2017]]`],['avoid','Names chlorpromazine and other antipsychotics',NU_PUKAP],['avoid','Typical antipsychotics on the avoid list',`Lists haloperidol and other typical antipsychotics as drugs to avoid. [[PF2023]]`],['caution','NMS-like risk with neuroleptics',NU_LNEU]]},
 {k:'olan',g:'Antipsychotics',n:'Olanzapine',o:'avoid',lab:'US drug label',
  sum:'An atypical antipsychotic, but not one of the exceptions.',
  s:[['avoid','Not offered for psychosis',`Olanzapine is not offered for psychosis in Parkinson's. [[NICE2017]]`],['avoid','Other antipsychotics: avoid',NU_PUKAP],['avoid','Not an exception: avoid',`Lists atypical antipsychotics other than pimavanserin, quetiapine and clozapine as drugs to avoid. [[PF2023]]`],['ns','Not read',NU_NS]]},
 {k:'quet',g:'Antipsychotics',n:'Quetiapine',o:'caution',ol:'Specialist use',lab:'US drug label',
  sum:'Named by NICE and the Parkinson\'s Foundation as an option for psychosis, at low doses.',
  s:[['consider','Consider if no cognitive impairment',`Consider quetiapine for psychosis in people without cognitive impairment, at lower doses than in other indications. [[NICE2017]]`],['caution','Prefers a benzodiazepine for confusion',NU_PUKCONF],['safe','An exception',NU_PFEX],['ns','Not read',NU_NS]]},
 {k:'cloz',g:'Antipsychotics',n:'Clozapine',o:'caution',ol:'Specialist use',lab:'US drug label',
  sum:'Offered by NICE when standard treatment fails, with blood monitoring registration.',
  s:[['consider','Offer if standard treatment fails',`Offer clozapine if standard treatment fails, with registration with a patient monitoring service, at lower doses than in other indications. [[NICE2017]]`],['caution','Prefers a benzodiazepine for confusion',NU_PUKCONF],['safe','An exception',NU_PFEX],['ns','Not read',NU_NS]]},
 {k:'meto',g:'Anti-sickness',n:'Metoclopramide',o:'avoid',lab:'Levodopa label',
  sum:'A dopamine blocker. Both patient organisations list it to avoid, and the levodopa label warns about it.',
  s:[['ns','Not named',NU_NS],['avoid','Can worsen; in some cases fatal',NU_PUKAE],['avoid','On the anti-sickness avoid list',NU_PFAE],['caution','Dopamine blocking may worsen control',`Metoclopramide "may increase the bioavailability of levodopa by increasing gastric emptying" but "may also adversely affect disease control by its dopamine receptor antagonistic properties". [[FDAcdld2026]]`]]},
 {k:'proc',g:'Anti-sickness',n:'Prochlorperazine',o:'avoid',lab:'US drug label',
  sum:'A phenothiazine anti-sickness drug, listed to avoid by both patient organisations.',
  s:[['ns','Not named',NU_NS],['avoid','Can worsen; in some cases fatal',NU_PUKAE],['avoid','On the anti-sickness avoid list',NU_PFAE],['ns','Not read',NU_NS]]},
 {k:'prom',g:'Anti-sickness',n:'Promethazine',o:'avoid',lab:'US drug label',
  sum:'Named to avoid by the Parkinson\'s Foundation; the UK sources read here do not name it.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['avoid','On the anti-sickness avoid list',NU_PFAE],['ns','Not read',NU_NS]]},
 {k:'drop',g:'Anti-sickness',n:'Droperidol',o:'avoid',lab:'US drug label',
  sum:'Named to avoid by the Parkinson\'s Foundation; the UK sources read here do not name it.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['avoid','On the anti-sickness avoid list',NU_PFAE],['ns','Not read',NU_NS]]},
 {k:'domp',g:'Anti-sickness',n:'Domperidone',o:'consider',ol:'Consider, not in heart disease',lab:'US drug label',
  sum:'The anti-sickness option Parkinson\'s UK suggests, with a cardiac exception.',
  s:[['ns','Not named',NU_NS],['consider','Consider; avoid in cardiac disease',`Consider domperidone (oral or rectal) if there are no contraindications, but avoid it in cardiac disease because of a small rise in the risk of arrhythmia and sudden cardiac death. [[PUKEmergency2023]]`],['ns','Not named',NU_NS],['ns','Not read',NU_NS]]},
 {k:'cycl',g:'Anti-sickness',n:'Cyclizine',o:'caution',lab:'US drug label',
  sum:'Usable after surgery in the UK guidance, with a warning about confusion.',
  s:[['ns','Not named',NU_NS],['caution','Usable after surgery; may confuse',NU_PUKCY],['ns','Not named',NU_NS],['ns','Not read',NU_NS]]},
 {k:'onda',g:'Anti-sickness',n:'Ondansetron (5HT3 antagonists)',o:'disagree',lab:'Apomorphine label',
  sum:'On one source\'s safe list, but contraindicated with apomorphine.',
  s:[['ns','Not named',NU_NS],['caution','Usable after surgery; may confuse',NU_PUKCY],['safe','In the safe column',`Lists ondansetron and the other 5HT3 antagonists in its "safe" column. [[PF2023]]`],['contra','Contraindicated with apomorphine',`The APOKYN label contraindicates 5HT3 antagonists (ondansetron, granisetron, dolasetron, palonosetron, alosetron) because of "profound hypotension and loss of consciousness" when apomorphine was given with ondansetron. [[FDAapokyn2024]]`]]},
 {k:'peth',g:'With an MAO-B inhibitor',n:'Pethidine (meperidine)',o:'contra',lab:'Rasagiline label',
  sum:'With rasagiline, the label says contraindicated; the Parkinson\'s Foundation frames it as a combination to beware of.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['caution','Beware of mixing',NU_PFOP],['contra','Contraindicated; 14-day gap',NU_RAS]]},
 {k:'tram',g:'With an MAO-B inhibitor',n:'Tramadol',o:'contra',lab:'Rasagiline label',
  sum:'With rasagiline, the label says contraindicated; the Parkinson\'s Foundation frames it as a combination to beware of.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['caution','Beware of mixing',NU_PFOP],['contra','Contraindicated; 14-day gap',NU_RAS]]},
 {k:'sero',g:'With an MAO-B inhibitor',n:'Methadone, dextromethorphan, St John\'s wort, cyclobenzaprine, other MAO inhibitors',o:'contra',lab:'Rasagiline label',
  sum:'The rest of the rasagiline label\'s contraindication list.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['caution','Opioids: beware of mixing',NU_PFOP],['contra','Contraindicated; 14-day gap',`The rasagiline label contraindicates methadone, propoxyphene, other MAO inhibitors, St John's wort, cyclobenzaprine and dextromethorphan, as well as pethidine and tramadol, because of serotonin syndrome or psychosis risk, with at least 14 days between stopping rasagiline and starting them. [[FDArasagiline2026]]`]]},
 {k:'benzo',g:'Other',n:'Benzodiazepines, muscle relaxants, bladder drugs',o:'caution',lab:'US drug label',
  sum:'Not banned. One source warns about confusion and falls; another prefers a benzodiazepine to an antipsychotic when a drug is needed for confusion.',
  s:[['ns','Not named',NU_NS],['consider','Benzodiazepine over antipsychotic',NU_PUKCONF],['caution','May cause confusion and falls',`Warns that benzodiazepines, muscle relaxants, bladder-control drugs and other sleep or pain drugs may cause confusion, hallucinations and falls. [[PF2023]]`],['ns','Not read',NU_NS]]},
 {k:'iron',g:'Other',n:'Iron tablets and multivitamins with iron',o:'caution',ol:'Interaction',lab:'Levodopa label',
  sum:'Not a contraindication, but an interaction that lowers how much levodopa is absorbed.',
  s:[['ns','Not named',NU_NS],['ns','Not named',NU_NS],['ns','Not named',NU_NS],['caution','Can chelate levodopa',`Iron salts, including those in multivitamins, can chelate levodopa and carbidopa and lower their bioavailability. [[FDAcdld2026]]`]]}
];

/* ---- safety in numbers ---- */
const NU_RISK=[
 {t:'Falls',sub:'22 prospective studies',cols:['var(--bad)','var(--bad)'],b:[['At least one fall',60.5,'60.5%'],['Recurrent falls',39,'39%']],max:100,note:'Ranges 35–90% and 18–65%'},
 {t:'Delirium in hospital',sub:'DSM-5 diagnosis',b:[['Parkinson\'s (n = 121)',66.9,'66.9%'],['Older controls (n = 199)',38.7,'38.7%']],max:100,note:'12-month mortality HR 3.3'},
 {t:'Aspiration pneumonia',sub:'per 1,000 person-years',b:[['Parkinson\'s',3.01,'3.01'],['Matched controls',.59,'0.59']],max:3.6,note:'Hazard ratio 4.21'},
 {t:'Swallowing problems',sub:'pooled prevalence',cols:['var(--muted)','var(--bad)'],b:[['Reported when asked',35,'35%'],['Found on testing',82,'82%']],max:100,note:'Under-reported unless tested'},
 {t:'Orthostatic hypotension',sub:'pooled prevalence, 25 studies',b:[['Parkinson\'s',30.1,'30.1%',[22.9,38.4]]],max:100,note:'95% CI 22.9–38.4%'},
 {t:'Impulse-control disorders',sub:'5-year cumulative incidence',b:[['Ever took an agonist',51.5,'51.5%'],['Never took one',12.4,'12.4%']],max:100,note:'Early disease, 411 people'}
];

/* ---- DBS procedures (one centre's sheet) ---- */
const NU_DBS=[
 {k:'mri',b:'MRI',v:'Only some systems, under protocol',c:'var(--warn)',
  s:['Allowed only on some DBS systems,','under specific protocols.','May need the programmer in "MRI" mode','or a prior eligibility check.','Remove any rotigotine patch first.'],
  f:`MRI is allowed only on some DBS systems under specific protocols, which may require putting the programmer into "MRI" mode (Abbott Infinity, Boston Scientific Vercise Gevia and Genus, Medtronic Percept) or a prior eligibility check (Medtronic Activa). [[UCDavis2025]] A rotigotine patch is removed before MRI because its backing contains aluminium. [[PUKEmergency2023]] The Parkinson's Foundation notes that DBS has specific requirements for MRI, EKG and EEG. [[PF2023]]`},
 {k:'dia',b:'Diathermy',v:'Not allowed',c:'var(--bad)',
  s:['Shortwave, microwave or therapeutic','ultrasound diathermy: NOT ALLOWED.','May cause damage even if no heat','is created, and even with DBS off.'],
  f:`The sheet says diathermy (shortwave, microwave or therapeutic ultrasound) is "NOT ALLOWED" and "may cause damage even if no heat is created". Strong electrical fields can make the DBS system carry energy "capable of causing brain injury even if the system is turned off". [[UCDavis2025]]`},
 {k:'cau',b:'Electrocautery',v:'Turn off, or Surgery Mode',c:'var(--warn)',
  s:['Turn DBS off (Medtronic, Boston','Scientific) or use Surgery Mode (Abbott).','Prefer bipolar cautery.','Grounding pad on the legs.'],
  f:`For electrocautery: turn DBS off (Medtronic, Boston Scientific) or use "Surgery Mode" (Abbott), prefer bipolar cautery and place the grounding pad on the legs. [[UCDavis2025]]`},
 {k:'ecg',b:'ECG, EEG, cardioversion',v:'Turn DBS off',c:'var(--warn)',
  s:['Turn DBS off for ECG, EEG','and cardioversion.','Remove any rotigotine patch','before cardioversion.'],
  f:`Turn DBS off for ECG, EEG and cardioversion. [[UCDavis2025]] A rotigotine patch is removed before cardioversion because its backing contains aluminium. [[PUKEmergency2023]]`},
 {k:'ect',b:'ECT and TMS',v:'Not permitted',c:'var(--bad)',
  s:['Electroconvulsive therapy and','transcranial magnetic stimulation','are not permitted.'],
  f:`ECT and TMS are not permitted. [[UCDavis2025]]`},
 {k:'doc',b:'Before surgery',v:'Document the settings',c:'var(--sky)',
  s:['A physician documents DBS settings','before surgery, in case the device resets.','The person brings the patient programmer','and an ID card with the device model.'],
  f:`A physician should document DBS settings before surgery in case the device resets, and patients should always bring their patient programmer to hospital. [[UCDavis2025]] People with DBS stay on their usual medication routine, carry an ID card with the device model number and contact details, and need an oral drug list in case the DBS fails. [[PUKEmergency2023]]`},
 {k:'off',b:'Battery stopped',v:'An emergency',c:'var(--bad)',
  s:['DBS withdrawal syndrome: rapid decline,','may not respond to high-dose levodopa,','can become life-threatening.','Authors: replace the battery urgently.'],
  f:`In a review of 20 cases of DBS withdrawal syndrome, compared with 15 patients whose stimulation stopped without problems, the main risk factors were long disease duration and many years of DBS. Patients can deteriorate quickly, may not respond to high-dose levodopa, and the condition can become life-threatening; the authors argue that a stopped battery should be replaced as an emergency. [[Grimaldi2023]]`}
];

/* ---- teaching: myths and the diary ---- */
const NU_MYTH=[
 {m:'"Levodopa stops working after about five years, so it is better saved for later."',k:'The most pervasive myth',t:'Levodopa keeps working; the window narrows',
  txt:`The Parkinson's Foundation calls this "perhaps the single most pervasive myth about PD treatment" and replies that "levodopa works for decades". [[PFMyths]] What does change: across the cumulative literature, about 40% of patients have motor fluctuations (wearing-off) after 4 to 6 years of levodopa and just under 40% have dyskinesia; fluctuations were "nil" in the first year. The authors note these are incidence figures and that clinically important problems may be much less common. [[Ahlskog2001]] See <a href="#wearing" data-go="wearing">Levodopa over time</a>.`,
  pt:'Levodopa does not stop working. Over the years each dose may last a shorter time, which is a different problem.',
  hook:`Myth: "levodopa stops working after 5 years". Fact: ~40% fluctuations at 4–6 years; it keeps working. [[PFMyths,Ahlskog2001]]`},
 {m:'"If the next dose is due, it is fine to push it back a little."',k:'Timing',t:'On time, just before the last dose wears off',
  txt:`The Parkinson's Foundation corrects the belief that the next dose should be postponed: levodopa works best "taken on time, just before the previous dose wears off". [[PFMyths]] Parkinson's UK says a delay of as little as 30 minutes can matter. [[PUK2023]]`,
  pt:'A late dose is not a smaller problem. The timing is part of the treatment.'},
 {m:'"No complaint about swallowing means the swallow is safe."',k:'Swallowing',t:'Swallowing problems are under-reported',
  txt:`Swallowing problems were reported by 35% of people with Parkinson's when asked, but found in 82% on objective testing. [[Kalf2012]] Of 24 patients who denied swallowing problems, 12 would still have been referred on the SDQ alone. [[Manor2007]] Symptoms such as dribbling had often never been disclosed to a professional. [[Chaudhuri2006]]`,
  pt:'People often do not notice, or do not mention, swallowing trouble. Screening finds much more.'},
 {m:'"A ward round close to the dose time is close enough."',k:'Hospital',t:'Thirty minutes is the outer limit',
  txt:`NICE measures on-time levodopa as within 30 minutes of the person's prescribed time; the Parkinson's Foundation's standard is ±15 minutes. [[NICE2018QS,PF2023]] In one hospital study, 300 of 3,873 doses were 30 minutes or more late and 322 were omitted. [[Hou2012]]`},
 {m:'"A home exercise programme will stop the falls."',k:'Falls',t:'It depended on severity',
  txt:`In an RCT of 231 people, home exercise for balance, leg strength and freezing (40 to 60 minutes, 3 times a week for 6 months) did not reduce falls overall (IRR 0.73, 95% CI 0.45 to 1.17). Falls dropped in the milder-disease subgroup (IRR 0.31) and tended to rise in the more severe subgroup (IRR 1.61, not significant). [[Canning2015]]`,
  pt:'Exercise helped people with milder Parkinson\'s fall less, but not everyone.'}
];
const NU_DST=[
 {k:'S',n:'Asleep',c:'var(--panel-2)',s:'var(--line)'},
 {k:'F',n:'OFF',c:'var(--bad)'},
 {k:'O',n:'ON',c:'var(--good)'},
 {k:'N',n:'ON, non-troublesome dyskinesia',sn:'ON, mild dyskinesia',c:'var(--good-soft)',s:'var(--good)'},
 {k:'T',n:'ON, troublesome dyskinesia',sn:'ON, troublesome dysk.',c:'var(--warn)'}
];
const NU_DAYS=[
 {k:'steady',b:'A steady day',seg:[['F',1],['O',33],['S',2]]},
 {k:'wear',b:'A wearing-off day',seg:[['F',2],['O',4],['F',2],['O',3],['T',1],['O',1],['F',2],['O',4],['F',2],['O',3],['N',2],['F',2],['O',4],['S',4]]},
 {k:'hosp',b:'A hospital day with late doses',seg:[['F',4],['O',4],['N',1],['F',8],['O',3],['T',2],['O',2],['F',6],['O',3],['S',3]]}
];
const NU_DOC=[
 {k:'times',l:`Dose times copied from the person's own schedule; every dose across 24 hours prescribed; first dose as STAT. [[PUKEmergency2023]]`,
  e:`MEDICINES: Levodopa prescribed at home times 07:00, 10:00, 13:00, 16:00, 19:00, 22:00. First dose given STAT on admission.`},
 {k:'given',l:`Actual time each dose was given; any dose more than 30 minutes late reported as an adverse event. [[Hou2012,PUK2023]]`,
  e:`GIVEN: 10:00 dose at 10:04. 13:00 dose at 13:41 (41 min late), reported as an adverse event.`},
 {k:'motor',l:`Motor state at assessment: ON or OFF, minutes since the last levodopa dose, dyskinesia. [[MDS2019UPDRS]]`,
  e:`MOTOR STATE: 14:20 assessed OFF, 81 min after last levodopa. No dyskinesia seen.`},
 {k:'swallow',l:`Swallow status: screen result, speech and language therapy referral, route for medicines. [[NICE2017,PUKEmergency2023]]`,
  e:`SWALLOW: Coughing with thin fluids. Speech and language therapy referral made. Tablets given one at a time with thickened fluid.`},
 {k:'falls',l:`Falls history, including falls in the past year and freezing. [[Allen2013]]`,
  e:`FALLS: Two falls in the past year, both when turning. Freezing reported.`},
 {k:'bp',l:`Lying and standing blood pressure with heart rate, at the times measured. [[Gibbons2017]]`,
  e:`LYING/STANDING BP: Supine 132/78 HR 68; 1 min 106/64 HR 72; 3 min 100/60 HR 74.`},
 {k:'delir',l:`Delirium screen with the 4AT, and causes looked for. [[PUKEmergency2023]]`,
  e:`DELIRIUM: 4AT completed. Score and actions recorded per local policy.`},
 {k:'icd',l:`Impulse-control disorder information given and discussion recorded. [[NICE2017,NICE2018QS]]`,
  e:`ICD: Discussed with patient and partner; written information given.`},
 {k:'dbs',l:`DBS: device model from the ID card, settings documented before surgery, programmer with the person. [[UCDavis2025,PUKEmergency2023]]`,
  e:`DBS: Device model recorded from ID card. Programmer with patient. Settings documented by the team before theatre.`},
 {k:'miss',l:`If doses were missed: tremor against baseline, temperature, respiratory rate, BP, cognition, swallowing, CK. [[PUKEmergency2023]]`,
  e:`MISSED-DOSE OBS: Temp 37.1, RR 16, BP 128/76. Tremor at baseline. CK requested.`}
];

inits.nursing=()=>{
  const T=(x,y,s,cls,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const HALO='paint-order:stroke;stroke:var(--field);stroke-width:4px;stroke-linejoin:round;';
  const BG='<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>';
  const pr=(el,v)=>el.setAttribute('aria-pressed',v?'true':'false');
  const hm=h=>{const m=Math.round(h*60);return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
  const wrap=(s,n)=>{const out=[];let c='';s.split(' ').forEach(w=>{if(c&&(c+' '+w).length>n){out.push(c);c=w}else c=c?c+' '+w:w});if(c)out.push(c);return out};
  const lines=(x,y,arr,lh,cls,st)=>arr.map((l,i)=>T(x,y+i*lh,l,cls,st)).join('');
  const sw=(x,y,fill,stroke)=>`<rect x="${f1(x)}" y="${f1(y-9)}" width="12" height="10" rx="2" style="fill:${fill};stroke:${stroke||'none'}"/>`;
  const num=id=>{const v=parseFloat($(id).value);return isFinite(v)?v:NaN};

  /* =========== tabs =========== */
  const tabs=$$('[data-nu-tab]');
  function showTab(k){if(!tabs.some(b=>b.dataset.nuTab===k))k='assess';
    tabs.forEach(b=>{const on=b.dataset.nuTab===k;pr(b,on);const p=$('#nuT-'+b.dataset.nuTab);if(p)p.hidden=!on});store.set('nuTab',k)}
  $('#nuTabs').addEventListener('click',e=>{const b=e.target.closest('[data-nu-tab]');if(b)showTab(b.dataset.nuTab)});
  showTab(store.get('nuTab','assess'));

  /* =========== the late dose clock =========== */
  const ck=$('#nuClkSvg'),cr=$('#nuClkT');let mode='late',win='nice';
  const ST=[{n:'OFF',c:'var(--bad)'},{n:'Wearing off',c:'var(--warn-soft)',s:'var(--warn)'},{n:'ON',c:'var(--good)'},{n:'Dyskinesia',c:'var(--warn)'}];
  const SEE=['stiff and slow; may be unable to walk, talk or swallow','slowing; stiffness and tremor returning','moving, talking and swallowing','extra involuntary movements at the peak'];
  const gm=(x,y,ok,r)=>ok?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--good);stroke:var(--panel);stroke-width:1.5"/>`:`<path d="M${f1(x)} ${f1(y-r-1.5)} L${f1(x+r+1.5)} ${f1(y)} L${f1(x)} ${f1(y+r+1.5)} L${f1(x-r-1.5)} ${f1(y)} Z" style="fill:var(--warn);stroke:var(--panel);stroke-width:1.5"/>`;
  const mot=h=>NU_MODE[mode].g.reduce((a,g)=>a+(g!=null&&h>=g?NU_K(h-g):0),0);
  const stOf=m=>m>1.3?3:m>=.7?2:m>=.3?1:0;
  function runs(h0,h1){const R=[];const dt=.05;for(let v=h0;v<h1-1e-9;v+=dt){const b=Math.min(h1,v+dt),st=stOf(mot((v+b)/2));const l=R[R.length-1];if(l&&l.st===st)l.b=b;else R.push({a:v,b,st})}return R}
  function drawClk(t){
    const N=vb(ck,'720 400','400 660'),h=6+18*t,w=win==='nice'?.5:.25,M=NU_MODE[mode],G=M.g;
    const L=N?{cx:200,cy:122,r:88,x0:40,x1:380,ax:268,pr:306,gv:354,c0:396,c1:452,rb:474,rh:20,ob:512,lg:572,every:3}
             :{cx:124,cy:194,r:94,x0:272,x1:700,ax:44,pr:88,gv:138,c0:180,c1:244,rb:266,rh:22,ob:312,lg:356,every:2};
    const X=v=>L.x0+(v-6)/18*(L.x1-L.x0);
    const A=v=>v/24*2*Math.PI-Math.PI/2,P=(v,r)=>[L.cx+Math.cos(A(v))*r,L.cy+Math.sin(A(v))*r];
    const arc=(a,b,r)=>{const p=P(a,r),q=P(b,r);return `M${f1(p[0])} ${f1(p[1])} A${r} ${r} 0 ${b-a>12?1:0} 1 ${f1(q[0])} ${f1(q[1])}`};
    const m=mot(h),st=stOf(m),R=runs(6,Math.max(6.001,h));
    let s=BG;
    /* --- clock --- */
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/>`;
    const p0=P(0,L.r-1),p6=P(6,L.r-1);
    s+=`<path d="M${L.cx} ${L.cy} L${f1(p0[0])} ${f1(p0[1])} A${L.r-1} ${L.r-1} 0 0 1 ${f1(p6[0])} ${f1(p6[1])} Z" style="fill:var(--panel-2);opacity:.7"/>`;
    for(let k=0;k<24;k++){const a=P(k,L.r-3),b=P(k,L.r-(k%6?8:13));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:${k%6?1:1.6}"/>`;
      if(k%6===0){const q=P(k,L.r-25);s+=T(q[0],q[1]+4,String(k).padStart(2,'0'),'t-xs t-mid')}}
    const rr=L.r*.6;
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${f1(rr)}" style="fill:none;stroke:var(--panel-2);stroke-width:11"/>`;
    R.forEach(g=>{s+=`<path d="${arc(g.a,g.b,rr)}" style="fill:none;stroke:${ST[g.st].c};stroke-width:11"/>`});
    NU_DOSE.forEach((p,i)=>{const q=P(p,L.r);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="4.5" style="fill:var(--panel);stroke:var(--amber);stroke-width:2.5"/>`;
      const g=G[i],o=P(g==null?p:g,L.r+11);
      if(g!=null&&h>=g)s+=gm(o[0],o[1],Math.abs(g-p)<=w+1e-6,4.5);
      else if(g==null&&h>=p+w)s+=`<path d="M${f1(o[0]-4)} ${f1(o[1]-4)} l8 8 m0 -8 l-8 8" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`});
    const hp=P(h,L.r-14);
    s+=`<line x1="${L.cx}" y1="${L.cy}" x2="${f1(hp[0])}" y2="${f1(hp[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${L.cx}" cy="${L.cy}" r="4" style="fill:var(--ink)"/>`;
    s+=T(L.cx,L.cy-14,hm(h),'t-big t-mid')+T(L.cx,L.cy+24,ST[st].n,'t-sm t-mid',`fill:${st===1?'var(--warn)':ST[st].c};font-weight:700`);
    if(!N)s+=T(L.cx,L.cy+L.r+30,'24-hour clock: doses on the rim','t-xs t-mid');
    /* --- timeline --- */
    s+=`<line x1="${L.x0}" y1="${L.ax}" x2="${L.x1}" y2="${L.ax}" class="axis"/>`;
    for(let v=6;v<=24;v+=1){s+=`<line x1="${f1(X(v))}" y1="${L.ax}" x2="${f1(X(v))}" y2="${L.ax-(v%L.every?3:6)}" class="axis"/>`;if(v%L.every===0)s+=T(X(v),L.ax-10,String(v).padStart(2,'0'),'t-xs t-mid')}
    NU_ROUND.forEach(v=>{s+=`<line x1="${f1(X(v))}" y1="${L.ax+4}" x2="${f1(X(v))}" y2="${L.gv+10}" style="stroke:var(--sky);stroke-width:1;stroke-dasharray:3 3;opacity:.8"/><path d="M${f1(X(v)-5)} ${L.ax+1} l10 0 l-5 7 z" style="fill:var(--sky)"/>`});
    s+=T(L.x0,L.pr-14,N?'Prescribed (own times)':'Prescribed: the person\'s own times','t-xs',HALO+'fill:var(--ink)');
    s+=T(L.x0,L.gv-16,N?'Given (▼ = ward round)':'Given on the ward (▼ = ward drug round)','t-xs',HALO+'fill:var(--ink)');
    NU_DOSE.forEach((p,i)=>{
      s+=`<rect x="${f1(X(p-w))}" y="${L.pr-7}" width="${f1(X(p+w)-X(p-w))}" height="14" rx="4" style="fill:var(--good-soft);stroke:var(--good);stroke-width:.8"/><circle cx="${f1(X(p))}" cy="${L.pr}" r="4.5" style="fill:var(--panel);stroke:var(--amber);stroke-width:2.5"/>`;
      const g=G[i];
      if(g!=null&&h>=g){const ok=Math.abs(g-p)<=w+1e-6,d=Math.round((g-p)*60);
        s+=`<path d="M${f1(X(p))} ${L.pr+7} L${f1(X(g))} ${L.gv-7}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 2;fill:none"/>`;
        s+=gm(X(g),L.gv,ok,6);
        s+=T(X(g),L.gv+19,(d>0?'+':d<0?'−':'')+Math.abs(d),'t-xs t-mid',ok?'':'fill:var(--warn);font-weight:700')}
      else if(g==null&&h>=p+w){s+=`<path d="M${f1(X(p)-5)} ${L.gv-5} l10 10 m0 -10 l-10 10" style="stroke:var(--bad);stroke-width:2.6;stroke-linecap:round"/>`+T(X(p),L.gv+19,'missed','t-xs t-mid','fill:var(--bad);font-weight:700')}
    });
    /* --- effect curve and ribbon --- */
    const Yc=v=>L.c1-clamp(v,0,1.6)/1.6*(L.c1-L.c0);
    s+=T(L.x0,L.c0-6,N?'Schematic levodopa effect':'Schematic levodopa effect (one dose ≈ 3 hours)','t-xs');
    [.7,.3].forEach(v=>{s+=`<line x1="${L.x0}" y1="${f1(Yc(v))}" x2="${L.x1}" y2="${f1(Yc(v))}" class="grid"/>`});
    let cp='';for(let v=6;v<=h+1e-9;v+=1/30)cp+=(cp?'L':'M')+f1(X(v))+' '+f1(Yc(mot(v)));
    if(cp){s+=`<path d="${cp}L${f1(X(h))} ${L.c1}L${L.x0} ${L.c1}Z" style="fill:var(--amber-soft);opacity:.75"/><path d="${cp}" style="fill:none;stroke:var(--amber);stroke-width:2.2;stroke-linejoin:round"/>`}
    s+=`<line x1="${L.x0}" y1="${L.c1}" x2="${L.x1}" y2="${L.c1}" class="axis"/>`;
    s+=`<rect x="${L.x0}" y="${L.rb}" width="${L.x1-L.x0}" height="${L.rh}" rx="5" style="fill:var(--panel-2)"/>`;
    R.forEach(g=>{s+=`<rect x="${f1(X(g.a))}" y="${L.rb}" width="${f1(X(g.b)-X(g.a)+.4)}" height="${L.rh}" style="fill:${ST[g.st].c};${ST[g.st].s?'stroke:'+ST[g.st].s+';stroke-width:.6':''}"/>`});
    s+=T(L.x0,L.rb-5,'Motor state','t-xs','fill:var(--ink)');
    /* cursor */
    s+=`<line x1="${f1(X(h))}" y1="${L.ax}" x2="${f1(X(h))}" y2="${L.rb+L.rh}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;
    /* what staff see */
    if(N)s+=T(L.x0,L.ob,`${hm(h)} · ${ST[st].n}`,'t-lbl')+lines(L.x0,L.ob+17,wrap('Staff may see: '+SEE[st],56),13,'t-xs');
    else s+=T(L.x0,L.ob,`${hm(h)} · ${ST[st].n}: ${SEE[st]}`,'t-sm','fill:var(--ink)');
    /* legend */
    const LG=[['var(--good-soft)','var(--good)','Timing window'],['var(--amber)',null,'Prescribed dose'],['var(--good)',null,'Given in window'],['var(--warn)',null,'Outside window'],['var(--bad)',null,'Missed'],
      ['var(--good)',null,'ON'],['var(--warn-soft)','var(--warn)','Wearing off'],['var(--bad)',null,'OFF'],['var(--warn)',null,'Dyskinesia'],['var(--amber-soft)','var(--amber)','Levodopa effect']];
    LG.forEach((g,i)=>{const c=N?i%2:i%5,r=N?Math.floor(i/2):Math.floor(i/5),x=N?20+c*186:20+c*138,y=L.lg+r*(N?17:20);
      s+=(i===1?`<circle cx="${x+6}" cy="${y-4}" r="4.5" style="fill:var(--panel);stroke:var(--amber);stroke-width:2.5"/>`:i===2?gm(x+6,y-4,true,5):i===3?gm(x+6,y-4,false,4.5):i===4?`<path d="M${x+2} ${y-8} l8 8 m0 -8 l-8 8" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`:sw(x,y,g[0],g[1]))+T(x+18,y,g[2],'t-xs')});
    ck.innerHTML=s;
    /* readout and note */
    let inW=0,outW=0,miss=0;NU_DOSE.forEach((p,i)=>{const g=G[i];if(g==null)miss++;else if(Math.abs(g-p)<=w+1e-6)inW++;else outW++});
    const off=R.filter(g=>g.st===0).reduce((a,g)=>a+g.b-g.a,0);
    $('#nuClkRead').innerHTML=`<span>This schematic day: within the ${win==='nice'?'30-minute':'±15-minute'} window <b>${inW} of 6</b></span><span>outside it <b>${outW}</b></span><span>missed <b>${miss}</b></span><span>OFF by ${hm(h)} <b>${f1(off)} h</b></span>`;
    const ph=phaseOf(NU_CLK,t);setClk(ph);
    const PS=NU_CLK[ph],why=G.map((g,i)=>M.why[i]?`${hm(NU_DOSE[i])} ${M.why[i]}`:'').filter(Boolean);
    $('#nuClkNote').innerHTML=noteHTML({...PS,txt:PS.txt+`</p><p><b>This run.</b> ${M.rem}${why.length?' ('+why.join('; ')+'.)':''}`});
    cr.setAttribute('aria-valuetext',`${hm(h)}, ${ST[st].n}. Step ${ph+1} of ${NU_CLK.length}: ${PS.t}`);
  }
  const stopClk=playWire(cr,$('#nuClkPlay'),drawClk,20000,'Replay','nursing');
  const setClk=stepWire($('#nuClkSteps'),NU_CLK,cr,drawClk,stopClk);
  const MB={on:$('#nuModeOn'),late:$('#nuModeLate'),miss:$('#nuModeMiss')},WB={nice:$('#nuWinNice'),pf:$('#nuWinPf')};
  Object.keys(MB).forEach(k=>MB[k].addEventListener('click',()=>{mode=k;Object.keys(MB).forEach(j=>pr(MB[j],j===k));drawClk(+cr.value)}));
  Object.keys(WB).forEach(k=>WB[k].addEventListener('click',()=>{win=k;Object.keys(WB).forEach(j=>pr(WB[j],j===k));drawClk(+cr.value)}));
  drawClk(+cr.value);

  /* =========== MDS-UPDRS =========== */
  let upSel=2;
  $('#nuUpBtns').innerHTML=NU_UP.map((u,i)=>`<button class="btn" data-up="${i}" aria-pressed="${i===upSel}">Part ${u.p}</button>`).join('');
  function drawUp(){
    const sv=$('#nuUpSvg'),N=vb(sv,'520 330','400 340'),bx=N?72:90,bw=N?300:400,tot=N?360:480;
    let s=BG+T(20,26,'Maximum score by part (derived)','t-sm','fill:var(--ink)');
    NU_UP.forEach((u,i)=>{const y=56+i*42,mx=u.rat*4,on=i===upSel;
      s+=T(20,y+12,'Part '+u.p,'t-lbl',on?'fill:var(--sage)':'');
      s+=T(bx,y-5,`${u.items} items${u.rat!==u.items?', '+u.rat+' ratings':''} · 0 to ${mx}`,'t-xs',on?'fill:var(--ink)':'');
      s+=`<rect x="${bx}" y="${y}" width="${f1(mx/132*bw)}" height="16" rx="4" style="fill:${on?'var(--sage)':'var(--sage-soft)'};stroke:var(--sage);stroke-width:${on?0:.8}"/>`});
    s+=T(20,234,N?'Total 0 to 260 (derived)':'Total 0 to 260 (derived; MDS reports part sums)','t-xs','fill:var(--ink)');
    let x=20;NU_UP.forEach((u,i)=>{const ww=u.rat*4/260*tot;s+=`<rect x="${f1(x)}" y="240" width="${f1(ww-1.5)}" height="14" style="fill:${i===upSel?'var(--sage)':'var(--sage-soft)'}"/>`;if(ww>26)s+=T(x+ww/2,251,u.p,'t-xs t-mid',i===upSel?'fill:var(--on-sage)':'');x+=ww});
    s+=T(20,280,'Every item, every part:','t-xs');
    const A=['Normal','Slight','Mild','Moderate','Severe'],aw=N?72:96;
    A.forEach((a,i)=>{const ax=20+i*aw;s+=`<rect x="${ax}" y="288" width="${aw-4}" height="26" rx="5" style="fill:${['var(--panel-2)','var(--sage-soft)','var(--warn-soft)','var(--amber-soft)','var(--bad-soft)'][i]}"/>`+T(ax+(aw-4)/2,305,`${i} ${a}`,'t-xs t-mid','fill:var(--ink)')});
    sv.innerHTML=s;
  }
  function setUp(){
    $$('#nuUpBtns [data-up]').forEach(b=>pr(b,+b.dataset.up===upSel));
    const u=NU_UP[upSel];
    $('#nuUpList').innerHTML=`<div class="kicker">Part ${u.p} · maximum ${u.rat*4} (derived)</div><h4 style="margin:4px 0 6px;font:800 19px/1.2 var(--display)">${u.n}</h4><p style="font-size:14.5px">${u.who}</p><ul class="nu-list nu-cols" style="list-style:none;padding-left:0">${u.list.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    drawUp();
  }
  $('#nuUpBtns').addEventListener('click',e=>{const b=e.target.closest('[data-up]');if(b){upSel=+b.dataset.up;setUp()}});
  setUp();

  /* MCID */
  function drawMc(){
    const a=num('#nuMcA'),b=num('#nuMcB'),ok=isFinite(a)&&isFinite(b),ch=ok?b-a:0;
    const sv=$('#nuMcidSvg'),N=vb(sv,'520 160','400 170'),x0=N?20:30,x1=N?380:490,X=v=>x0+(v+15)/30*(x1-x0);
    let s=BG;
    s+=`<rect x="${x0}" y="56" width="${f1(X(-3.25)-x0)}" height="28" style="fill:var(--good-soft)"/><rect x="${f1(X(-3.25))}" y="56" width="${f1(X(4.63)-X(-3.25))}" height="28" style="fill:var(--panel-2)"/><rect x="${f1(X(4.63))}" y="56" width="${f1(x1-X(4.63))}" height="28" style="fill:var(--bad-soft)"/>`;
    s+=T((x0+X(-3.25))/2,74,N?'Improved ≥ MCID':'Improvement ≥ MCID','t-xs t-mid','fill:var(--good)')+T((X(-3.25)+X(4.63))/2,74,N?'< MCID':'Smaller than MCID','t-xs t-mid')+T((X(4.63)+x1)/2,74,N?'Worse ≥ MCID':'Worsening ≥ MCID','t-xs t-mid','fill:var(--bad)');
    [-15,-10,-5,0,5,10,15].forEach(v=>{s+=`<line x1="${f1(X(v))}" y1="84" x2="${f1(X(v))}" y2="89" class="axis"/>`+T(X(v),100,v>0?'+'+v:v<0?'−'+(-v):'0','t-xs t-mid')});
    [[-3.25,'−3.25','var(--good)'],[4.63,'+4.63','var(--bad)']].forEach(([v,l,c])=>{s+=`<line x1="${f1(X(v))}" y1="56" x2="${f1(X(v))}" y2="88" style="stroke:${c};stroke-width:1.5"/><line x1="${f1(X(v))}" y1="106" x2="${f1(X(v))}" y2="112" style="stroke:${c};stroke-width:1.5"/>`+T(X(v),124,l,'t-sm t-mid',`fill:${c};font-weight:700`)});
    if(ok){const mx=X(clamp(ch,-15,15));s+=`<line x1="${f1(mx)}" y1="40" x2="${f1(mx)}" y2="88" style="stroke:var(--ink);stroke-width:3"/><path d="M${f1(mx-6)} 32 L${f1(mx+6)} 32 L${f1(mx)} 41 Z" style="fill:var(--ink)"/>`+T(clamp(mx,x0+40,x1-40),24,`change ${ch>0?'+':ch<0?'−':''}${Math.abs(ch)}`,'t-sm t-mid','fill:var(--ink);font-weight:700')}
    s+=T((x0+x1)/2,N?150:146,'Change in Part III score (lower is better)','t-xs t-mid');
    sv.innerHTML=s;
    let h;
    if(!ok)h='<p>Enter both scores (0 to 132).</p>';
    else if(a<0||b<0||a>132||b>132)h='<p>Part III scores run from 0 to 132 (derived maximum).</p>';
    else h=`<div class="kicker">Change</div><div class="big">${ch>0?'+':ch<0?'−':''}${Math.abs(ch)} points</div><p>${ch<=-3.25?'At or beyond the minimal clinically important improvement (−3.25).':ch>=4.63?'At or beyond the minimal clinically important worsening (+4.63).':'Smaller than either minimal clinically important difference.'} [[Horvath2015]]</p>`;
    $('#nuMcOut').innerHTML=h;
  }
  ['#nuMcA','#nuMcB'].forEach(id=>$(id).addEventListener('input',drawMc));
  drawMc();

  /* Hoehn and Yahr */
  let hySel=2;
  $('#nuHyBtns').innerHTML=NU_HY.map((h,i)=>`<button class="btn" data-hy="${i}" aria-pressed="${i===hySel}" aria-label="Stage ${i}: ${h.s}">${i}</button>`).join('');
  function drawHy(){
    const sv=$('#nuHySvg'),N=vb(sv,'520 260','400 290');
    let s=BG;
    if(N){NU_HY.forEach((h,i)=>{const y=14+i*45,w=44+i*34,on=i===hySel;
        s+=`<rect x="20" y="${y}" width="${w}" height="34" rx="5" style="fill:${on?'var(--sage)':'var(--sage-soft)'}"/>`+T(34,y+23,i,'t-big',on?'fill:var(--on-sage)':'');
        const ln=wrap(h.s,Math.floor((380-(30+w))/6));s+=lines(30+w,y+(ln.length>1?14:21),ln,13,'t-xs',on?'fill:var(--ink);font-weight:700':'')});
      sv.innerHTML=s;return}
    const x0=20,sw_=80,bot=230,top=i=>200-i*28;
    NU_HY.forEach((h,i)=>{const x=x0+i*sw_,y=top(i),on=i===hySel;
      s+=`<rect x="${x}" y="${y}" width="${sw_-4}" height="${bot-y}" rx="5" style="fill:${on?'var(--sage)':'var(--sage-soft)'}"/>`;
      s+=T(x+(sw_-4)/2,y+22,i,'t-big t-mid',on?'fill:var(--on-sage)':'');
      const ln=wrap(h.s,13);s+=lines(x+1,y-8-(ln.length-1)*12,ln,12,'t-xs',on?'fill:var(--ink);font-weight:700':'')});
    s+=T(500,250,'Hoehn and Yahr stage','t-xs t-end');
    sv.innerHTML=s;
  }
  function setHy(){$$('#nuHyBtns [data-hy]').forEach(b=>pr(b,+b.dataset.hy===hySel));
    $('#nuHyOut').innerHTML=`<div class="kicker">Stage ${hySel}</div><div class="big">${NU_HY[hySel].s}</div><p>${NU_HY[hySel].f} [[MDS2019UPDRS]]</p>${hySel>=2&&hySel<=4?'<p class="stage-cap">Reliability and validity are best supported for stages 2 to 4. [[Goetz2004HY]]</p>':''}`;drawHy()}
  $('#nuHyBtns').addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(b){hySel=+b.dataset.hy;setHy()}});
  setHy();

  /* =========== orthostatic blood pressure =========== */
  const OHID=[['#nuOh0s','#nuOh0d','#nuOh0h'],['#nuOh1s','#nuOh1d','#nuOh1h'],['#nuOh3s','#nuOh3d','#nuOh3h']];
  function loadOh(i){const x=NU_OHX[i];OHID.forEach((r,j)=>r.forEach((id,k)=>{$(id).value=x.v[j][k]}));$('#nuOhBB').checked=x.bb;drawOh()}
  $('#nuOhEx').innerHTML=NU_OHX.map((x,i)=>`<button class="btn" data-ohx="${i}">${x.b}</button>`).join('');
  $('#nuOhEx').addEventListener('click',e=>{const b=e.target.closest('[data-ohx]');if(b)loadOh(+b.dataset.ohx)});
  function drawOh(){
    const V=OHID.map(r=>r.map(num)),ok=V.every(r=>r.every(isFinite)),bb=$('#nuOhBB').checked;
    const sv=$('#nuOhSvg'),N=vb(sv,'520 350','400 390');
    const xs=N?[96,206,316]:[120,270,420],xr=N?352:462,Y=v=>(N?196:190)-(clamp(v,40,200)-40)/160*(N?158:154),hy0=N?336:324,hy1=N?262:254;
    const hrs=V.map(r=>r[2]).filter(isFinite),hlo=hrs.length?Math.min(...hrs)-8:40,hhi=hrs.length?Math.max(...hrs,V[0][2]+15)+8:140,HY=v=>hy0-(clamp(v,hlo,hhi)-hlo)/Math.max(1,hhi-hlo)*(hy0-hy1);
    let s=BG;
    [60,100,140,180].forEach(v=>{s+=`<line x1="${xs[0]-40}" y1="${f1(Y(v))}" x2="${xr}" y2="${f1(Y(v))}" class="grid"/>`+T(xs[0]-46,Y(v)+4,v,'t-xs t-end')});
    s+=T(14,22,'mmHg','t-xs');
    ['Supine','1 min','3 min'].forEach((l,i)=>{s+=T(xs[i],N?218:212,l,'t-xs t-mid','fill:var(--ink)')});
    if(ok){
      const htn=V[0][0]>=150||V[0][1]>=90,tS=htn?30:20,tD=htn?15:10;
      const tl=(v,lab,c)=>`<line x1="${xs[0]-40}" y1="${f1(Y(v))}" x2="${xr}" y2="${f1(Y(v))}" style="stroke:${c};stroke-width:1.5;stroke-dasharray:6 4"/>`+T(xr+4,Y(v)+4,lab,'t-xs',`fill:${c};font-weight:700`);
      s+=tl(V[0][0]-tS,`−${tS}`,'var(--bad)')+tl(V[0][1]-tD,`−${tD}`,'var(--bad)');
      [[0,'var(--sage)'],[1,'var(--sky)']].forEach(([k,c])=>{s+=`<path d="${xs.map((x,i)=>(i?'L':'M')+x+' '+f1(Y(V[i][k]))).join('')}" style="fill:none;stroke:${c};stroke-width:2.5"/>`;
        xs.forEach((x,i)=>{s+=`<circle cx="${x}" cy="${f1(Y(V[i][k]))}" r="5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`+T(x+9,Y(V[i][k])+(k?15:-7),V[i][k],'t-xs',HALO+'fill:var(--ink)')})});
      /* heart rate */
      s+=T(14,hy1-12,'Heart rate, bpm','t-xs');
      s+=`<line x1="${xs[0]-40}" y1="${f1(HY(V[0][2]+15))}" x2="${xr}" y2="${f1(HY(V[0][2]+15))}" style="stroke:var(--violet);stroke-width:1.2;stroke-dasharray:4 4"/>`+T(xr+4,HY(V[0][2]+15)+4,'+15','t-xs','fill:var(--violet);font-weight:700');
      s+=`<path d="${xs.map((x,i)=>(i?'L':'M')+x+' '+f1(HY(V[i][2]))).join('')}" style="fill:none;stroke:var(--violet);stroke-width:2"/>`;
      xs.forEach((x,i)=>{s+=`<rect x="${x-4}" y="${f1(HY(V[i][2])-4)}" width="8" height="8" style="fill:var(--violet)"/>`+T(x+9,HY(V[i][2])+14,V[i][2],'t-xs',HALO+'fill:var(--ink)')});
      const lg=N?[[20,378],[110,378],[210,378]]:[[230,22],[310,22],[400,22]];
      s+=`<line x1="${lg[0][0]}" y1="${lg[0][1]-4}" x2="${lg[0][0]+16}" y2="${lg[0][1]-4}" style="stroke:var(--sage);stroke-width:2.5"/>`+T(lg[0][0]+20,lg[0][1],'Systolic','t-xs');
      s+=`<line x1="${lg[1][0]}" y1="${lg[1][1]-4}" x2="${lg[1][0]+16}" y2="${lg[1][1]-4}" style="stroke:var(--sky);stroke-width:2.5"/>`+T(lg[1][0]+20,lg[1][1],'Diastolic','t-xs');
      s+=`<line x1="${lg[2][0]}" y1="${lg[2][1]-4}" x2="${lg[2][0]+16}" y2="${lg[2][1]-4}" style="stroke:var(--bad);stroke-width:1.5;stroke-dasharray:4 3"/>`+T(lg[2][0]+20,lg[2][1],`OH threshold (${tS}/${tD})`,'t-xs');
      /* result */
      const f1s=V[0][0]-V[1][0],f3s=V[0][0]-V[2][0],f1d=V[0][1]-V[1][1],f3d=V[0][1]-V[2][1];
      const met1=f1s>=tS||f1d>=tD,met3=f3s>=tS||f3d>=tD,met=met1||met3,fs=Math.max(f1s,f3s),fd=Math.max(f1d,f3d);
      const hr=Math.max(V[1][2],V[2][2])-V[0][2];
      let h=`<div class="kicker">${htn?'Supine hypertension present: 30/15 criterion':'Standard criterion: 20/10 mmHg'}</div><div class="big" style="color:${met?'var(--bad)':'var(--good)'}">${met?'OH criterion met':'OH criterion not met'}</div>`;
      h+=`<p>Largest fall within 3 minutes: systolic ${fs>0?fs:0} mmHg, diastolic ${fd>0?fd:0} mmHg.${htn?` Supine ${V[0][0]}/${V[0][1]} is at or above 150/90, where a fall of 30 systolic or 15 diastolic "may be a more appropriate criterion".`:''} [[Gibbons2017]]</p>`;
      if(htn&&!met&&(fs>=20||fd>=10))h+=`<p>The fall would meet the standard 20/10 definition, but not the 30/15 criterion suggested for supine hypertension.</p>`;
      if(met1&&!met3)h+=`<p>The fall at 1 minute had recovered by 3 minutes. The consensus definition describes a <i>sustained</i> fall. [[Gibbons2017]]</p>`;
      if(met){h+=bb?`<p>Heart-rate rise ${hr} bpm, but with a rate-limiting drug the heart-rate criteria do not apply. [[Gibbons2017]]</p>`
        :hr<15?`<p>Heart-rate rise ${hr} bpm: less than 15 bpm, which suggests a neurogenic cause. [[Gibbons2017]]</p>`
        :`<p>Heart-rate rise ${hr} bpm: non-neurogenic OH typically shows a rise of more than 15 bpm within 3 minutes. [[Gibbons2017]]</p>`}
      else h+=`<p>The heart-rate criteria apply only when blood pressure actually falls. [[Gibbons2017]]</p>`;
      $('#nuOhOut').innerHTML=h;
    } else {s+=T(N?200:260,120,'Enter all nine readings','t-sm t-mid');$('#nuOhOut').innerHTML='<p>Enter all nine readings, or load an example.</p>'}
    sv.innerHTML=s;
  }
  [...OHID.flat(),'#nuOhBB'].forEach(id=>{$(id).addEventListener('input',drawOh);$(id).addEventListener('change',drawOh)});
  loadOh(0);

  /* =========== MoCA and TUG =========== */
  const mo=$('#nuMoca'),tu=$('#nuTug');
  function drawCut(){
    const m=Math.round(+mo.value),g=+tu.value,sv=$('#nuCutSvg'),N=vb(sv,'520 250','400 270'),x0=N?20:30,x1=N?380:490;
    const XM=v=>x0+v/30*(x1-x0),XT=v=>x0+(v-5)/25*(x1-x0);
    let s=BG+T(x0,22,'MoCA (0 to 30) in Parkinson\'s','t-sm','fill:var(--ink)');
    s+=`<rect x="${x0}" y="40" width="${f1(XM(21)-x0)}" height="24" style="fill:var(--bad-soft)"/><rect x="${f1(XM(21))}" y="40" width="${f1(XM(26)-XM(21))}" height="24" style="fill:var(--warn-soft)"/><rect x="${f1(XM(26))}" y="40" width="${f1(x1-XM(26))}" height="24" style="fill:var(--good-soft)"/>`;
    (N?[0,5,10,15,21,26,30]:[0,5,10,15,20,21,26,30]).forEach(v=>{s+=T(XM(v),78,v,'t-xs t-mid',v===21||v===26?'fill:var(--ink);font-weight:700':'')});
    s+=T((x0+XM(21))/2,56,N?'< 21: PDD':'below 21: PD dementia cut-off','t-xs t-mid','fill:var(--bad)')+T((XM(21)+XM(26))/2,56,N?'< 26':'below 26: PD-MCI','t-xs t-mid','fill:var(--warn)')+T((XM(26)+x1)/2,56,'26+','t-xs t-mid','fill:var(--good)');
    let mx=XM(m);s+=`<path d="M${f1(mx-6)} 30 L${f1(mx+6)} 30 L${f1(mx)} 39 Z" style="fill:var(--ink)"/><line x1="${f1(mx)}" y1="39" x2="${f1(mx)}" y2="64" style="stroke:var(--ink);stroke-width:2.5"/>`+T(clamp(mx,x0+20,x1-20),N?96:98,`score ${m}`,'t-sm t-mid','fill:var(--ink);font-weight:700');
    const ty=N?140:136;
    s+=T(x0,ty,'Timed Up and Go (seconds)','t-sm','fill:var(--ink)');
    s+=`<rect x="${x0}" y="${ty+18}" width="${f1(XT(11.5)-x0)}" height="24" style="fill:var(--good-soft)"/><rect x="${f1(XT(11.5))}" y="${ty+18}" width="${f1(x1-XT(11.5))}" height="24" style="fill:var(--warn-soft)"/>`;
    [5,10,11.5,15,20,25,30].forEach(v=>{s+=T(XT(v),ty+56,v,'t-xs t-mid',v===11.5?'fill:var(--ink);font-weight:700':'')});
    s+=T((XT(11.5)+x1)/2,ty+34,N?'slower than 11.5 s':'slower than the proposed 11.5 s cut-off','t-xs t-mid','fill:var(--warn)');
    mx=XT(g);s+=`<path d="M${f1(mx-6)} ${ty+8} L${f1(mx+6)} ${ty+8} L${f1(mx)} ${ty+17} Z" style="fill:var(--ink)"/><line x1="${f1(mx)}" y1="${ty+17}" x2="${f1(mx)}" y2="${ty+42}" style="stroke:var(--ink);stroke-width:2.5"/>`+T(clamp(mx,x0+24,x1-24),ty+76,`${g} s`,'t-sm t-mid','fill:var(--ink);font-weight:700');
    sv.innerHTML=s;
    mo.setAttribute('aria-valuetext',`${m} of 30`);tu.setAttribute('aria-valuetext',`${g} seconds`);
    $('#nuCutOut').innerHTML=`<p><b>MoCA ${m}/30:</b> ${m<21?'below both cut-offs: under 21 detected PD dementia (81% sensitivity, 95% specificity), and under 26 detected PD-MCI.':m<26?'below the 26 cut-off that detected PD-MCI with 90% sensitivity and 75% specificity, but not below 21.':'at or above both cut-offs.'} [[DalrympleAlford2010]]</p><p><b>TUG ${g} s:</b> ${g>11.5?'slower than':g===11.5?'at':'faster than'} the proposed 11.5-second cut-off for fallers. [[Nocera2013]]</p><p class="stage-cap">Screens point to who needs a fuller assessment; they do not make a diagnosis.</p>`;
  }
  [mo,tu].forEach(r=>r.addEventListener('input',drawCut));
  drawCut();

  /* =========== on-time windows =========== */
  const wr=$('#nuWinR');
  function drawWin(){
    const d=Math.round(+wr.value),sv=$('#nuWinSvg'),N=vb(sv,'720 240','400 250'),x0=N?24:70,x1=N?376:650,X=v=>x0+(v+60)/120*(x1-x0);
    let s=BG;
    const row=(y,a,b,fill,stroke,lab,lc)=>`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="22" rx="5" style="fill:${fill};stroke:${stroke};stroke-width:1"/>`+T(N?x0:X(a),y-6,lab,'t-xs',HALO+`fill:${lc}`);
    s+=row(42,-30,30,'var(--good-soft)','var(--good)',N?'NICE QS164: within 30 min':'NICE QS164: within 30 minutes of the prescribed time','var(--good)');
    s+=row(94,-15,15,'var(--sky-soft)','var(--sky)',N?'Parkinson\'s Foundation: ±15 min':'Parkinson\'s Foundation: within ±15 minutes of the home schedule','var(--sky)');
    s+=`<rect x="${f1(X(30))}" y="146" width="${f1(x1-X(30))}" height="22" rx="5" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1"/>`+T(N?x0:X(-30),140,N?'Parkinson\'s UK: >30 min late = adverse event':'Parkinson\'s UK: more than 30 minutes late, report as an adverse event','t-xs',HALO+'fill:var(--bad)');
    s+=`<line x1="${x0}" y1="190" x2="${x1}" y2="190" class="axis"/>`;
    for(let v=-60;v<=60;v+=15){const mj=v%30===0;s+=`<line x1="${f1(X(v))}" y1="190" x2="${f1(X(v))}" y2="${mj?196:193}" class="axis"/>`;if(mj||!N)s+=T(X(v),210,hm(10+v/60),'t-xs t-mid',v===0?'fill:var(--ink);font-weight:700':'')}
    s+=`<line x1="${f1(X(0))}" y1="36" x2="${f1(X(0))}" y2="190" style="stroke:var(--amber);stroke-width:1.5"/><circle cx="${f1(X(0))}" cy="190" r="5" style="fill:var(--amber)"/>`;
    s+=T(X(0),N?230:228,'prescribed 10:00','t-xs t-mid','fill:var(--amber)');
    const gx=X(d);s+=`<line x1="${f1(gx)}" y1="30" x2="${f1(gx)}" y2="176" style="stroke:var(--ink);stroke-width:2.5"/><circle cx="${f1(gx)}" cy="30" r="5" style="fill:var(--ink)"/>`+T(clamp(gx,x0+40,x1-40),20,`given ${hm(10+d/60)}`,'t-sm t-mid','fill:var(--ink);font-weight:700');
    sv.innerHTML=s;
    const nice=Math.abs(d)<=30,pf=Math.abs(d)<=15,rep=d>30;
    wr.setAttribute('aria-valuetext',d===0?'on time':d>0?`${d} minutes late`:`${-d} minutes early`);
    $('#nuWinRead').innerHTML=`<span>Given <b>${d===0?'on time':d>0?d+' min late':-d+' min early'}</b></span><span>NICE window <b>${nice?'within':'outside'}</b></span><span>Parkinson's Foundation window <b>${pf?'within':'outside'}</b></span><span>Parkinson's UK adverse event <b>${rep?'yes':'no'}</b></span>`;
  }
  wr.addEventListener('input',drawWin);drawWin();

  /* audit bars */
  const AUD=[[2015,50],[2017,58],[2019,53],[2022,58]];let audStop=null;
  function drawAud(p){
    const sv=$('#nuAudSvg'),N=vb(sv,'520 260','400 280'),x0=N?52:64,x1=N?380:500,y0=N?230:214,y1=40,Y=v=>y0-v/100*(y0-y1),bw=N?52:68,gap=(x1-x0)/4;
    let s=BG+T(20,24,N?'Not on time every time':'Not given medication on time every time','t-sm','fill:var(--ink)');
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${x0}" y1="${f1(Y(v))}" x2="${x1}" y2="${f1(Y(v))}" class="grid"/>`+T(x0-8,Y(v)+4,v+'%','t-xs t-end')});
    AUD.forEach(([yr,v],i)=>{const x=x0+gap*i+(gap-bw)/2,vv=v*ease(clamp(p*1.6-i*.2));s+=`<rect x="${f1(x)}" y="${f1(Y(vv))}" width="${bw}" height="${f1(y0-Y(vv))}" rx="4" style="fill:var(--bad)"/>`;
      if(vv>1)s+=T(x+bw/2,Y(vv)-6,Math.round(vv)+'%','t-sm t-mid','fill:var(--ink);font-weight:700');s+=T(x+bw/2,y0+16,yr,'t-xs t-mid')});
    sv.innerHTML=s;
  }
  $('#nuAudPlay').addEventListener('click',()=>{audStop&&audStop();audStop=animate(1200,drawAud)});
  drawAud(1);

  /* =========== nil by mouth =========== */
  let nbm=0;
  $('#nuNbmBtns').innerHTML=NU_NBM.map((x,i)=>`<button class="btn" data-nbm="${i}" aria-pressed="${i===nbm}">${x.b}</button>`).join('');
  function drawNbm(){
    const S=NU_NBM[nbm],sv=$('#nuNbmSvg'),N=vb(sv,'720 380','400 640'),on=k=>S.r[k]!=='no';
    const col=k=>on(k)?NU_RST[S.r[k]][1]:'var(--line)',op=k=>on(k)?1:.45;
    let s=BG;
    /* figure (drawn in a 340 x 360 box) */
    let f=`<g transform="translate(${N?30:20} ${N?6:10})">`;
    f+=`<path d="M120 128 Q100 132 92 160 L84 300 Q84 320 104 322 L236 322 Q256 320 256 300 L248 160 Q240 132 220 128 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    f+=`<rect x="156" y="108" width="28" height="24" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><circle cx="170" cy="66" r="44" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    f+=`<path d="M154 88 Q170 98 186 88" style="fill:none;stroke:${col('mouth')};stroke-width:${on('mouth')?3.5:2};stroke-linecap:round;opacity:${op('mouth')}"/>`;
    f+=`<circle cx="156" cy="58" r="3" style="fill:var(--nuc)"/><circle cx="184" cy="58" r="3" style="fill:var(--nuc)"/><path d="M170 62 L176 76 L168 78" style="fill:none;stroke:var(--cell-line);stroke-width:1.5"/>`;
    /* stomach and gut */
    f+=`<path d="M180 168 Q214 164 218 190 Q220 218 190 222 Q172 224 168 206" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5;opacity:.85"/>`;
    f+=`<path d="M168 206 Q150 214 152 232 Q156 250 178 248 Q200 246 200 262 Q200 280 176 280 Q150 280 150 296" style="fill:none;stroke:var(--rose);stroke-width:5;stroke-linecap:round;opacity:.55"/>`;
    /* NG tube: nose, oesophagus, stomach */
    f+=`<path d="M176 76 Q200 80 196 110 L188 160 Q186 176 196 186" style="fill:none;stroke:${col('ng')};stroke-width:${on('ng')?3.5:2};stroke-dasharray:${on('ng')?'none':'4 3'};opacity:${op('ng')}"/>`;
    /* patch on the upper chest */
    f+=`<rect x="108" y="146" width="34" height="26" rx="5" transform="rotate(-12 125 159)" style="fill:${on('patch')?'var(--warn-soft)':'var(--panel)'};stroke:${col('patch')};stroke-width:${on('patch')?3:1.5};opacity:${op('patch')}"/>`;
    /* apomorphine pump with a line under the skin */
    f+=`<rect x="20" y="236" width="44" height="30" rx="6" style="fill:var(--panel);stroke:${col('sc')};stroke-width:${on('sc')?3:1.5};opacity:${op('sc')}"/><path d="M64 252 Q90 252 108 262" style="fill:none;stroke:${col('sc')};stroke-width:${on('sc')?3:1.5};opacity:${op('sc')}"/><circle cx="110" cy="263" r="4" style="fill:${col('sc')};opacity:${op('sc')}"/>`;
    /* PEJ tube and gel pump */
    f+=`<path d="M200 262 Q240 262 262 286 L290 300" style="fill:none;stroke:${col('pej')};stroke-width:${on('pej')?3.5:2};opacity:${op('pej')}"/><rect x="284" y="290" width="46" height="32" rx="6" style="fill:var(--panel);stroke:${col('pej')};stroke-width:${on('pej')?3:1.5};opacity:${op('pej')}"/>`;
    /* labels */
    const lab=(x,y,k,t,anchor)=>T(x,y,t,'t-xs'+(anchor?' '+anchor:''),on(k)?`fill:${col(k)};font-weight:700`:'');
    f+=lab(222,74,'mouth','mouth')+lab(214,124,'ng','NG tube')+lab(100,138,'patch','patch','t-end')+lab(42,228,'sc','pump','t-mid')+lab(307,284,'pej','PEJ gel pump','t-mid');
    f+='</g>';s+=f;
    /* route list */
    const L=N?{x:20,y:392,dy:48,w:360}:{x:376,y:46,dy:62,w:324};
    s+=T(L.x,L.y-14,S.b,'t-big');
    NU_ROUTES.forEach((r,i)=>{const y=L.y+18+i*L.dy,st=NU_RST[S.r[r.k]];
      s+=`<rect x="${L.x}" y="${y-16}" width="${L.w}" height="${L.dy-10}" rx="8" style="fill:${on(r.k)?'var(--panel)':'transparent'};stroke:${on(r.k)?st[1]:'var(--line)'};stroke-width:${on(r.k)?1.6:1}"/>`;
      s+=T(L.x+12,y+2,r.n,'t-lbl',on(r.k)?'':'fill:var(--muted)')+T(L.x+12,y+(N?18:20),r.d,'t-xs');
      s+=`<rect x="${L.x+L.w-96}" y="${y-12}" width="86" height="18" rx="9" style="fill:${on(r.k)?st[1]:'var(--panel-2)'}"/>`+T(L.x+L.w-53,y+1,st[0],'t-xs t-mid',on(r.k)?'fill:var(--panel);font-weight:700':'')});
    sv.innerHTML=s;
    $('#nuNbmNote').innerHTML=noteHTML({k:'Situation',t:S.t,txt:S.txt,pt:S.pt,hook:S.hook});
  }
  $('#nuNbmBtns').addEventListener('click',e=>{const b=e.target.closest('[data-nbm]');if(!b)return;nbm=+b.dataset.nbm;$$('#nuNbmBtns [data-nbm]').forEach(x=>pr(x,+x.dataset.nbm===nbm));drawNbm()});
  drawNbm();

  /* =========== drug checker =========== */
  let drug='halo',apo=false;
  const grps=[...new Set(NU_DRUGS.map(d=>d.g))];
  $('#nuDrugBtns').innerHTML=grps.map(g=>`<div class="nu-grp"><span class="kicker">${g}</span><div class="ctrls">${NU_DRUGS.filter(d=>d.g===g).map(d=>`<button class="btn" data-drug="${d.k}" aria-pressed="${d.k===drug}">${d.n.split(' (')[0].replace(', other MAO inhibitors','')}</button>`).join('')}</div></div>`).join('');
  const OV={avoid:['Avoid','bad'],contra:['Contraindicated','bad'],caution:['Caution','warn'],consider:['Consider','good'],disagree:['Sources disagree','warn']};
  function verdict(D){if(D.k==='onda')return apo?['Contraindicated for this person','bad']:['Sources disagree','warn'];const o=OV[D.o];return [D.ol||o[0],o[1]]}
  function drawDrug(){
    const D=NU_DRUGS.find(d=>d.k===drug),sv=$('#nuDrugSvg'),N=vb(sv,'720 205','400 350'),V=verdict(D);
    let s=BG;
    const nm=wrap(D.n,N?40:70);s+=lines(20,30,nm,18,'t-big');
    const ty=N?30+nm.length*18+8:30+(nm.length-1)*18+22;
    const vw=V[0].length*6.6+24;
    s+=`<rect x="${N?20:700-vw}" y="${N?ty-14:16}" width="${f1(vw)}" height="22" rx="11" style="fill:var(--${V[1]}-soft);stroke:var(--${V[1]})"/>`+T((N?20:700-vw)+vw/2,(N?ty-14:16)+15,V[0],'t-xs t-mid',`fill:var(--${V[1]});font-weight:700`);
    const tw=N?176:164,th=112,y0=N?ty+18:ty+8;
    D.s.forEach((x,i)=>{const c=N?i%2:i,r=N?Math.floor(i/2):0,tx=20+c*(tw+(N?8:8)),tyy=y0+r*(th+8),v=NU_V[x[0]];
      const hl=D.k==='onda'&&apo&&i===3;
      s+=`<rect x="${tx}" y="${tyy}" width="${tw}" height="${th}" rx="10" style="fill:${v[2]};stroke:${hl?'var(--ink)':v[1]};stroke-width:${hl?2.5:1}"/>`;
      s+=T(tx+12,tyy+20,i===3?D.lab:NU_SRCN[i],'t-xs','fill:var(--ink)');
      s+=T(tx+12,tyy+44,v[0],'t-lbl',`fill:${v[1]}`);
      s+=lines(tx+12,tyy+66,wrap(x[1],N?26:24),14,'t-xs')});
    if(D.k==='onda'){const a=20+2*(tw+8)+tw,b=20+3*(tw+8);if(!N)s+=`<path d="M${a+1} ${y0+th/2} L${b-1} ${y0+th/2}" style="stroke:var(--ink);stroke-width:1.5"/>`+T((a+b)/2,y0+th/2-4,'≠','t-lbl t-mid')}
    sv.innerHTML=s;
    const tag=`<span class="tag ${V[1]}">${V[0]}</span>`;
    $('#nuDrugOut').innerHTML=`<div class="nu-out"><div class="kicker">${D.g}</div><div class="big">${D.n}</div><p>${tag} ${D.sum}${D.k==='onda'?(apo?' This person uses apomorphine, so the label contraindication applies.':' Press "Apomorphine user" to see how the answer changes.'):''}</p></div><dl class="nu-src" style="margin-top:10px">${D.s.map((x,i)=>`<dt>${i===3?D.lab:NU_SRCN[i]}</dt><dd>${x[2]}</dd>`).join('')}</dl>`;
  }
  $('#nuDrugBtns').addEventListener('click',e=>{const b=e.target.closest('[data-drug]');if(!b)return;drug=b.dataset.drug;$$('#nuDrugBtns [data-drug]').forEach(x=>pr(x,x.dataset.drug===drug));drawDrug()});
  $('#nuApo').addEventListener('click',()=>{apo=!apo;pr($('#nuApo'),apo);if(apo&&drug!=='onda'){drug='onda';$$('#nuDrugBtns [data-drug]').forEach(x=>pr(x,x.dataset.drug===drug))}drawDrug()});
  drawDrug();

  /* =========== safety in numbers =========== */
  let riskStop=null;
  function drawRisk(p){
    const sv=$('#nuRiskSvg'),N=vb(sv,'720 440','400 680'),cols=N?2:3,pw=N?184:224,ph=N?210:200,gx=N?10:12,gy=N?10:14;
    let s=BG;
    NU_RISK.forEach((r,i)=>{const c=i%cols,ro=Math.floor(i/cols),x=gx+c*(pw+(N?12:12)),y=gy+ro*(ph+12),bwm=pw-74,q=ease(clamp(p*1.5-i*.08));
      s+=`<rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      const tl=wrap(r.t,N?22:28);s+=lines(x+12,y+22,tl,16,'t-lbl');const yy=y+22+(tl.length-1)*16;
      s+=lines(x+12,yy+16,wrap(r.sub,N?30:36),12,'t-xs');
      r.b.forEach((b,j)=>{const by=yy+(N?52:50)+j*46,w=b[1]/r.max*bwm*q;
        s+=T(x+12,by-6,b[0],'t-xs','fill:var(--ink)');
        s+=`<rect x="${x+12}" y="${by}" width="${f1(bwm)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${x+12}" y="${by}" width="${f1(w)}" height="16" rx="4" style="fill:${(r.cols||['var(--bad)','var(--muted)'])[j]}"/>`;
        if(b[3]&&q>.95)s+=`<path d="M${f1(x+12+b[3][0]/r.max*bwm)} ${by+8} H${f1(x+12+b[3][1]/r.max*bwm)} M${f1(x+12+b[3][0]/r.max*bwm)} ${by+3} v10 M${f1(x+12+b[3][1]/r.max*bwm)} ${by+3} v10" style="stroke:var(--ink);stroke-width:1.4"/>`;
        s+=T(x+12+bwm+6,by+13,b[2],'t-sm','fill:var(--ink);font-weight:700;opacity:'+f1(ramp(q,.4,1)))});
      s+=T(x+12,y+ph-12,r.note,'t-xs','fill:var(--ink)')});
    sv.innerHTML=s;
  }
  $('#nuRiskPlay').addEventListener('click',()=>{riskStop&&riskStop();riskStop=animate(1500,drawRisk)});
  drawRisk(1);
  $('#nuGoOh').addEventListener('click',()=>{showTab('assess');const h=$('#nuOhHead');if(h){h.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});h.focus({preventScroll:true})}});

  /* =========== DBS =========== */
  let dbs=0;
  $('#nuDbsBtns').innerHTML=NU_DBS.map((d,i)=>`<button class="btn" data-dbs="${i}" aria-pressed="${i===dbs}">${d.b}</button>`).join('');
  function drawDbs(){
    const D=NU_DBS[dbs],sv=$('#nuDbsSvg'),N=vb(sv,'720 400','400 590');
    let s=BG,f=`<g transform="translate(${N?40:20} 8)">`;
    /* body */
    f+=`<path d="M100 138 Q80 142 76 170 L70 300 L120 300 L124 380 L150 380 L156 300 L184 300 L190 380 L216 380 L220 300 L270 300 L264 170 Q260 142 240 138 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    f+=`<rect x="156" y="114" width="28" height="28" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><circle cx="170" cy="68" r="50" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    f+=`<path d="M134 62 Q142 30 170 30 Q198 30 206 62 Q206 90 170 94 Q134 90 134 62 Z" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:1.2;opacity:.8"/>`;
    /* leads, extension, IPG */
    [[156,22,160,74],[184,22,180,74]].forEach(([a,b,c,d])=>{f+=`<path d="M${a} ${b} L${c} ${d}" style="stroke:var(--sky);stroke-width:2.5"/>`;for(let k=0;k<4;k++)f+=`<circle cx="${f1(lerp(a,c,.62+k*.11))}" cy="${f1(lerp(b,d,.62+k*.11))}" r="2.2" style="fill:var(--sky)"/>`});
    f+=`<path d="M156 22 Q170 12 184 22 Q214 26 216 60 Q220 100 206 128 Q200 150 214 168" style="fill:none;stroke:var(--sky);stroke-width:2;stroke-dasharray:4 2"/>`;
    const ipgOff=D.k==='off';
    f+=`<rect x="198" y="166" width="40" height="28" rx="8" style="fill:${ipgOff?'var(--bad-soft)':'var(--sky-soft)'};stroke:${ipgOff?'var(--bad)':'var(--sky)'};stroke-width:2"/>`;
    f+=T(218,184,ipgOff?'0%':'IPG','t-xs t-mid',ipgOff?'fill:var(--bad);font-weight:700':'fill:var(--sky)');
    /* procedure overlays */
    const bad='var(--bad)',wn='var(--warn)';
    if(D.k==='mri')f+=`<ellipse cx="170" cy="96" rx="132" ry="96" style="fill:none;stroke:${wn};stroke-width:10;opacity:.35"/><ellipse cx="170" cy="96" rx="132" ry="96" style="fill:none;stroke:${wn};stroke-width:1.5"/>`+T(170,212,'MRI scanner bore','t-xs t-mid',HALO+`fill:${wn};font-weight:700`);
    if(D.k==='dia'){f+=`<rect x="290" y="210" width="40" height="22" rx="5" style="fill:var(--panel);stroke:${bad};stroke-width:2"/>`;for(let k=0;k<3;k++)f+=`<path d="M${284-k*14} ${200+k*4} q-6 11 0 22 q6 11 0 22" style="fill:none;stroke:${bad};stroke-width:2"/>`;f+=`<path d="M300 150 l30 30 m0 -30 l-30 30" style="stroke:${bad};stroke-width:4;stroke-linecap:round"/>`}
    if(D.k==='cau')f+=`<path d="M306 196 L262 236" style="stroke:var(--ink);stroke-width:5;stroke-linecap:round"/><path d="M258 240 l-6 -4 m6 4 l-2 8 m2 -8 l8 -2" style="stroke:${wn};stroke-width:2"/><rect x="186" y="318" width="34" height="40" rx="4" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/>`+T(226,344,'pad on leg','t-xs','fill:var(--sky);font-weight:700');
    if(D.k==='ecg'){[[130,30],[210,30],[118,188],[150,240],[250,226]].forEach(([a,b])=>{f+=`<circle cx="${a}" cy="${b}" r="6" style="fill:var(--panel);stroke:${wn};stroke-width:2.5"/>`});f+=T(218,214,'DBS off','t-xs t-mid',`fill:${wn};font-weight:700`)}
    if(D.k==='ect')f+=`<circle cx="148" cy="8" r="16" style="fill:none;stroke:${bad};stroke-width:3"/><circle cx="192" cy="8" r="16" style="fill:none;stroke:${bad};stroke-width:3"/><path d="M230 -4 l24 24 m0 -24 l-24 24" style="stroke:${bad};stroke-width:4;stroke-linecap:round"/>`;
    if(D.k==='doc')f+=`<rect x="282" y="140" width="44" height="56" rx="5" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/><path d="M290 156 h28 M290 168 h28 M290 180 h18" style="stroke:var(--sky);stroke-width:2"/><rect x="290" y="226" width="30" height="46" rx="6" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/><rect x="295" y="232" width="20" height="14" rx="2" style="fill:var(--sky-soft)"/>`+T(305,288,'programmer','t-xs t-mid','fill:var(--ink)');
    if(D.k==='off')f+=`<path d="M244 150 l-10 18 h10 l-8 18" style="fill:none;stroke:${bad};stroke-width:2.5"/>`;
    f+='</g>';s+=f;
    /* rule panel */
    const L=N?{x:20,y:420,w:360,wr:50}:{x:380,y:60,w:320,wr:46};
    s+=T(L.x,L.y,D.b,'t-big');
    const vw=D.v.length*7.2+26;
    s+=`<rect x="${L.x}" y="${L.y+14}" width="${f1(vw)}" height="26" rx="13" style="fill:${D.c}"/>`+T(L.x+vw/2,L.y+32,D.v,'t-lbl t-mid','fill:var(--panel)');
    s+=lines(L.x,L.y+68,D.s,20,'t-sm','fill:var(--ink)');
    sv.innerHTML=s;
    $('#nuDbsNote').innerHTML=noteHTML({k:'Procedure',t:D.b+': '+D.v.toLowerCase(),txt:D.f,hook:D.k==='dia'?`Diathermy with DBS: not allowed, even with the system off. [[UCDavis2025]]`:D.k==='off'?`A stopped DBS battery can be a life-threatening emergency. [[Grimaldi2023]]`:''});
  }
  $('#nuDbsBtns').addEventListener('click',e=>{const b=e.target.closest('[data-dbs]');if(!b)return;dbs=+b.dataset.dbs;$$('#nuDbsBtns [data-dbs]').forEach(x=>pr(x,+x.dataset.dbs===dbs));drawDbs()});
  drawDbs();

  /* =========== myths =========== */
  let myth=0;
  $('#nuMyths').innerHTML=NU_MYTH.map((x,i)=>`<button data-myth="${i}" aria-pressed="${i===myth}"><small>Myth · ${x.k}</small><b>${x.m}</b></button>`).join('');
  function setMyth(){$$('#nuMyths [data-myth]').forEach(b=>pr(b,+b.dataset.myth===myth));const x=NU_MYTH[myth];$('#nuMythNote').innerHTML=noteHTML({k:'What the sources say',t:x.t,txt:x.txt,pt:x.pt,hook:x.hook})}
  $('#nuMyths').addEventListener('click',e=>{const b=e.target.closest('[data-myth]');if(b){myth=+b.dataset.myth;setMyth()}});
  setMyth();

  /* =========== diary =========== */
  let day=1;
  $('#nuDiaryBtns').innerHTML=NU_DAYS.map((d,i)=>`<button class="btn" data-day="${i}" aria-pressed="${i===day}">${d.b}</button>`).join('');
  function drawDiary(){
    const D=NU_DAYS[day],cells=D.seg.flatMap(([k,n])=>Array(n).fill(k)),sv=$('#nuDiarySvg'),N=vb(sv,'720 240','400 340');
    const st=k=>NU_DST.find(x=>x.k===k);
    let s=BG+T(20,26,'Home diary · '+D.b.toLowerCase(),'t-sm','fill:var(--ink)');
    const per=N?18:36,cw=N?20:18.3,cx0=N?20:40,rowY=r=>N?44+r*70:44,ch=N?34:40;
    cells.forEach((k,i)=>{const r=Math.floor(i/per),c=i%per,S=st(k);s+=`<rect x="${f1(cx0+c*cw+1)}" y="${rowY(r)}" width="${f1(cw-2)}" height="${ch}" rx="3" style="fill:${S.c};stroke:${S.s||'none'}"/>`});
    for(let r=0;r<(N?2:1);r++)for(let c=0;c<=per;c+=N?2:4){const hh=6+(r*per+c)/2;s+=`<line x1="${f1(cx0+c*cw)}" y1="${rowY(r)+ch}" x2="${f1(cx0+c*cw)}" y2="${rowY(r)+ch+5}" class="axis"/>`+T(cx0+c*cw,rowY(r)+ch+17,String(hh).padStart(2,'0')+':00','t-xs t-mid')}
    const ly=N?196:124;
    let lx=20;NU_DST.forEach((S,i)=>{const nm=S.sn||S.n,x=N?20+(i%2)*186:lx,y=N?ly+Math.floor(i/2)*17:ly;lx+=18+nm.length*5.9+26;s+=sw(x,y,S.c,S.s)+T(x+18,y,nm,'t-xs')});
    const cnt=k=>cells.filter(c=>c===k).length/2,good=cnt('O')+cnt('N'),badT=cnt('F')+cnt('T'),sl=cnt('S');
    const by=N?264:156,bx=20,bw=N?360:680,X=v=>bx+v/18*bw;
    s+=T(bx,by-6,'Summary of the day (18 hours)','t-xs','fill:var(--ink)');
    s+=`<rect x="${bx}" y="${by}" width="${f1(X(good)-bx)}" height="20" style="fill:var(--good)"/><rect x="${f1(X(good))}" y="${by}" width="${f1(X(good+badT)-X(good))}" height="20" style="fill:var(--bad)"/><rect x="${f1(X(good+badT))}" y="${by}" width="${f1(X(18)-X(good+badT))}" height="20" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=T(bx,by+38,`Good time ${good} h`,'t-sm','fill:var(--good);font-weight:700')+T(N?bx+130:bx+200,by+38,`Bad time ${badT} h`,'t-sm','fill:var(--bad);font-weight:700')+T(N?bx+250:bx+380,by+38,`Asleep ${sl} h`,'t-sm');
    sv.innerHTML=s;
    $('#nuDiaryRead').innerHTML=`<span>OFF <b>${cnt('F')} h</b></span><span>ON <b>${cnt('O')} h</b></span><span>ON, non-troublesome dyskinesia <b>${cnt('N')} h</b></span><span>ON, troublesome dyskinesia <b>${cnt('T')} h</b></span><span>"Bad time" = OFF + troublesome dyskinesia <b>${badT} h</b></span>`;
  }
  $('#nuDiaryBtns').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;day=+b.dataset.day;$$('#nuDiaryBtns [data-day]').forEach(x=>pr(x,+x.dataset.day===day));drawDiary()});
  drawDiary();

  /* =========== documentation =========== */
  const docOn=new Set(['times','given','motor']);
  $('#nuDocFields').innerHTML=NU_DOC.map(d=>`<label><input type="checkbox" data-doc="${d.k}"${docOn.has(d.k)?' checked':''}><span>${d.l}</span></label>`).join('');
  function docOut(){const ent=NU_DOC.filter(d=>docOn.has(d.k)).map(d=>d.e);
    $('#nuDocOut').textContent=ent.length?'FICTIONAL EXAMPLE · Ward 7 · 09:00 to 15:00\n\n'+ent.join('\n\n'):'Tick an item to add it to the entry.'}
  $('#nuDocFields').addEventListener('change',e=>{const c=e.target.closest('[data-doc]');if(!c)return;c.checked?docOn.add(c.dataset.doc):docOn.delete(c.dataset.doc);docOut()});
  $('#nuDocAll').addEventListener('click',()=>{NU_DOC.forEach(d=>docOn.add(d.k));$$('#nuDocFields [data-doc]').forEach(c=>c.checked=true);docOut()});
  $('#nuDocNone').addEventListener('click',()=>{docOn.clear();$$('#nuDocFields [data-doc]').forEach(c=>c.checked=false);docOut()});
  docOut();

  /* =========== nurse specialist trials =========== */
  function drawPdns(){
    const sv=$('#nuPdnsSvg'),N=vb(sv,'520 300','400 320');
    const ax0=N?30:220,ax1=N?370:490;
    let s=BG+T(20,26,'Jarman 2002 · community nurse specialists, n = 1,859','t-sm','fill:var(--ink)');
    const forest=(y,lab,lo,hi,pt,a,b,ref,note)=>{const X=v=>ax0+(v-a)/(b-a)*(ax1-ax0);let o='';
      o+=T(20,N?y-18:y+4,lab,'t-xs','fill:var(--ink)')+T(N?380:20,N?y-18:y+20,note,'t-xs'+(N?' t-end':''),'fill:var(--sage);font-weight:700');
      o+=`<line x1="${ax0}" y1="${y+16}" x2="${ax1}" y2="${y+16}" class="axis"/><line x1="${f1(X(ref))}" y1="${y-10}" x2="${f1(X(ref))}" y2="${y+16}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      o+=`<line x1="${f1(X(lo))}" y1="${y}" x2="${f1(X(hi))}" y2="${y}" style="stroke:var(--sage);stroke-width:2.5"/><rect x="${f1(X(pt)-6)}" y="${y-6}" width="12" height="12" style="fill:var(--sage)"/>`;
      o+=T(X(a),y+30,a,'t-xs t-mid')+T(X(ref),y+30,ref,'t-xs t-mid')+T(X(b),y+30,b,'t-xs t-mid');
return o};
    s+=forest(N?72:62,'Mortality, hazard ratio',.73,1.13,.91,.6,1.4,1,'0.91 (CI crosses 1)');
    s+=forest(N?140:118,'Self-rated global health',-.4,-.06,-.23,-.6,.2,0,'−0.23, better');
    s+=`<line x1="20" y1="${N?196:168}" x2="${N?380:500}" y2="${N?196:168}" class="grid"/>`;
    const cy=N?222:194;
    s+=T(20,cy,'Connor 2019 · nurse-led care management, n = 328','t-sm','fill:var(--ink)');
    s+=T(20,cy+18,'Adherence to 18 quality-of-care indicators','t-xs');
    const bx=N?130:220,bw=N?220:250;
    [['Usual care',.58,'var(--muted)'],['Nurse-led',.77,'var(--sage)']].forEach(([l,v,c],i)=>{const y=cy+34+i*30;s+=T(20,y+13,l,'t-xs','fill:var(--ink)')+`<rect x="${bx}" y="${y}" width="${bw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y}" width="${f1(v*bw)}" height="18" rx="4" style="fill:${c}"/>`+T(bx+v*bw+6,y+13,v.toFixed(2),'t-sm','fill:var(--ink);font-weight:700')});
    sv.innerHTML=s;
  }
  drawPdns();

  /* redraw the static figures when the layout crosses the phone threshold */
  const prev=redraws.nursing;
  redraws.nursing=()=>{prev&&prev();drawUp();drawMc();drawHy();drawOh();drawCut();drawWin();drawAud(1);drawNbm();drawDrug();drawRisk(1);drawDbs();drawDiary();drawPdns()};
};
