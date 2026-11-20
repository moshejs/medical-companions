/* =============== 2.4 ddx: the differential =============== */
/* ---- decision pathway ---- */
const DDX_STEPS=[
 {k:'Question 1 · tremor and slowness',t:'Is it parkinsonism?',ti:'Parkinsonism?',sub:'slowness + tremor',ex:['Essential tremor','action tremor only'],
  txt:`Parkinsonism needs bradykinesia with rest tremor, rigidity or both. Rest tremor is "4-6 Hz tremor in the fully resting limb which is suppressed during movement initiation"; kinetic and postural tremor do not count. Essential tremor is a bilateral upper-limb action tremor of at least 3 years, often with head tremor, and without parkinsonism. [[PPMI-FEATPD,Bhatia2018]] The tremor chart below plays both.`,
  pt:`A tremor in a hand resting in the lap points one way; a tremor when holding a cup or writing points another. Slowness is what makes it parkinsonism.`,
  hook:`ET = bilateral action (postural and kinetic) tremor; PD = rest tremor suppressed when movement starts. ET with a rest tremor is called "ET plus". [[Bhatia2018,PPMI-FEATPD]]`},
 {k:'Question 2 · medicines',t:'Which medicines?',ti:'Medicines',sub:'dopamine blockers',ex:['Drug-induced','antipsychotics, others'],
  txt:`Drug-induced parkinsonism is the second most common cause of parkinsonism in older people after PD; in one US county it was 20% of new cases. Causes include antipsychotics, prokinetics such as metoclopramide, the calcium-channel blockers flunarizine and cinnarizine, valproate and lithium. It usually resolves within weeks to months after the drug is stopped, but persists or progresses in 10 to 50%. [[Shin2012,Bower1999]]`,
  pt:`Several common medicines can cause parkinsonism, so the medicine list is part of every assessment.`,
  hook:`DIP: classically symmetric without rest tremor, yet 30–50% are asymmetric with rest tremor; DaT imaging is normal in the pure form. MDS exclusion 5. [[Shin2012,Postuma2015]]`},
 {k:'Question 3 · where and how it began',t:'Pattern and onset',ti:'Pattern, onset',sub:'legs, gait, age',ex:['Vascular · NPH','Wilson · functional'],
  txt:`Bilateral, legs-first parkinsonism with a shuffling gait suggests vascular parkinsonism, and parkinsonism confined to the legs for more than 3 years excludes PD. Gait first, with thinking and bladder problems, suggests normal-pressure hydrocephalus. Symptom onset around 20 to 30 is typical of Wilson disease, and an abrupt onset, often after a stressor, is common in functional parkinsonism. [[Zijlmans2004,Postuma2015,Nakajima2021,Czlonkowska2018,AmbarAkkaoui2020]]`,
  pt:`Where it started, how quickly, and at what age give strong clues.`,
  hook:`Lower-body parkinsonism → vascular. Gait + cognition + urine → NPH (full triad in only about 60%). Young with Kayser-Fleischer rings → Wilson. [[Zijlmans2004,Nakajima2021,Czlonkowska2018]]`},
 {k:'Question 4 · levodopa',t:'Does levodopa help?',ti:'Levodopa',sub:'how well it works',ex:['MSA · PSP · CBD','response often poor'],
  txt:`A clear and dramatic response supports PD, and no observable response to high-dose levodopa despite at least moderate disease excludes it. But response is not a clean separator: a beneficial response occurs in 42.5–56.7% of MSA-P, about a quarter of PSP may appear levodopa-responsive, and a sustained response in CBD is rare. [[Postuma2015,Wenning2022,Fox2025,Armstrong2013]]`,
  pt:`Most people with Parkinson's improve clearly on levodopa. Some look-alikes improve a little, or only for a while.`,
  hook:`MSA criteria call a response "poor" below 30% improvement in MDS-UPDRS-III on up to 1000 mg a day. [[Wenning2022]]`},
 {k:'Question 5 · red flags',t:'Any atypical signs?',ti:'Red flags',sub:'falls, gaze, BP',ex:['PSP · MSA · CBD · DLB','early atypical signs'],
  txt:`Early falls and a vertical gaze palsy point to PSP. Early autonomic failure, stridor or cerebellar signs point to MSA. Limb apraxia, cortical sensory loss or aphasia point to CBD. Dementia before or within a year of parkinsonism points to dementia with Lewy bodies. [[Hoglinger2017,Wenning2022,Armstrong2013,McKeith2017]]`,
  pt:`Some signs early in the illness are unusual in Parkinson's and suggest a related condition.`,
  hook:`Under the older NINDS-SPSP criteria, sensitivity for PSP at the first visit had a median of 24%, and 76% of autopsy-confirmed PSP did not present as Richardson syndrome. [[Hoglinger2017]]`},
 {k:'Question 6 · tests',t:'Tests when it is unclear',ti:'Tests',sub:'DaT, MRI, MIBG',ex:['DaT · MRI · MIBG','for specific questions'],
  txt:`NICE suggests DaT-SPECT for tremor when essential tremor cannot be told from parkinsonism clinically. MRI can show the hummingbird sign of PSP (specific but insensitive) or the MSA markers, and cardiac MIBG separates PD from other degenerative parkinsonism where it is available. NICE advises against structural MRI to diagnose PD itself. [[NICE2017,Mueller2018,Wenning2022,Orimo2012]] See <a href="#dx" data-go="dx">Diagnosis and the MDS criteria</a>.`,
  pt:`Scans help with particular questions. None of them is a Parkinson's test on its own.`,
  hook:`DaT-SPECT shows a dopaminergic deficit but "was not designed to distinguish" PD, MSA and PSP. [[FDA-DaTscan]]`},
 {k:'Question 7 · time',t:'Review over time',ti:'Review',sub:'every 6–12 months',ex:['PD, MDS criteria','kept under review'],
  txt:`NICE advises reviewing the diagnosis regularly, at intervals of 6 to 12 months, and reconsidering it if atypical features develop. Accuracy improves with time: movement-disorder experts were right 79.6% of the time at the first assessment and 83.9% after follow-up. [[NICE2017,Rizzo2016]]`,
  pt:`The diagnosis is revisited as the illness unfolds. New signs can change it.`,
  hook:`Pooled accuracy of clinical PD diagnosis 80.6%. UK Brain Bank criteria: sensitivity 90.8%, specificity only 34%. [[Rizzo2016]]`}];
DDX_STEPS.forEach((s,i)=>{s.from=i/7;s.at=i/7+.05});
function ddxGlyph(k,x,y,lp,on){
  const c=on?'var(--rose)':'var(--muted)',S=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})">`;
  switch(k){
    case 0:{let d='M-13 0';for(let i=1;i<=26;i++)d+=` L${f1(-13+i)} ${f1(Math.sin(i*1.4+(on?lp*20:0))*6*(i<13?1:.35))}`;g+=`<path d="${d}" ${S}/>`;break}
    case 1:g+=`<rect x="-12" y="-6" width="24" height="12" rx="6" ${S}/><path d="M0 -6 V6" ${S}/>`;break;
    case 2:g+=`<path d="M-8 -12 q-4 8 0 14 q2 4 -2 8M6 -12 q-4 8 0 14 q2 4 -2 8" ${S}/>`;break;
    case 3:g+=`<path d="M0 12 V-10 M-7 -3 L0 -11 L7 -3" ${S}/>`;break;
    case 4:g+=`<path d="M-8 13 V-12 M-8 -12 h15 l-4 6 l4 6 h-15" ${S}/>`;break;
    case 5:g+=`<circle r="12" ${S}/><circle r="5" style="fill:${on?'var(--amber)':'none'};stroke:${c};stroke-width:2"/>`;break;
    case 6:g+=`<circle r="12" ${S}/><path d="M0 -7 V0 L5 4" ${S}/>`;break;
  }
  return g+'</g>'}
/* ---- tremor task: scenario seconds 0..10 ---- */
const DDX_SEG=[[0,2.2,'Rest'],[2.2,3.6,'Lift'],[3.6,6.2,'Hold out'],[6.2,8.6,'Finger to nose'],[8.6,10,'Rest']];
const DDX_TRS=[
 {from:0,at:.08,k:'Arm resting in the lap',t:'At rest',
  txt:`The parkinsonian rest tremor is a "4-6 Hz tremor in the fully resting limb", so it shows best with the hand relaxed in the lap. Essential tremor is an action tremor; when a rest tremor is added to it, the consensus calls it "ET plus". [[PPMI-FEATPD,Bhatia2018]]`,
  pt:`A shaking hand that settles when the person reaches for something is typical of Parkinson's.`,
  hook:`Rest tremor at 4–6 Hz in the fully resting limb is one of the two partners of bradykinesia in MDS parkinsonism. [[PPMI-FEATPD]]`},
 {from:.22,at:.28,k:'Lifting the arm',t:'Starting to move',
  txt:`The MDS definition says the rest tremor "is suppressed during movement initiation". In essential tremor the opposite happens: the tremor appears as the arm starts to work. [[PPMI-FEATPD,Bhatia2018]]`,
  pt:`Starting a movement quietens a Parkinson's tremor and brings out an essential tremor.`},
 {from:.36,at:.48,k:'Arms held out',t:'Holding a posture',
  txt:`Holding the arms out brings out the postural part of essential tremor, which is bilateral and in the upper limbs; head tremor is common and voice tremor occurs only with hand tremor. A person with PD can also have some postural tremor, drawn faintly here, but "kinetic and postural tremor do not qualify for parkinsonism criteria". [[Bhatia2018,PPMI-FEATPD]]`,
  pt:`A tremor of both hands when holding them out, sometimes with a nodding head, is typical of essential tremor.`,
  hook:`ET: bilateral upper-limb action tremor, at least 3 years, with or without head, voice or leg tremor, and no dystonia, ataxia or parkinsonism. [[Bhatia2018]]`},
 {from:.62,at:.72,k:'A kinetic task',t:'Finger to nose',
  txt:`The core feature of essential tremor is "a 4 to 12 Hz simple kinetic tremor of the arms", seen during tasks like this one. Small doses of alcohol may reduce it: a quantitative home test found alcohol sensitivity in 46% of 104 people, but the 2018 consensus judged the effect not consistent enough to include in the definition. Use the toggle to see it. [[Louis2026,Hopfner2015,Bhatia2018]]`,
  pt:`Essential tremor gets in the way of drinking, writing and pointing. In some people a small drink of alcohol eases it for a while.`,
  hook:`Alcohol responsiveness supports ET but is not part of its definition: 46% in one quantitative study. [[Hopfner2015,Bhatia2018]]`},
 {from:.86,at:.94,k:'Back at rest · frequencies',t:'Back at rest',
  txt:`Back at rest, the parkinsonian tremor returns and the essential tremor fades. Frequency is a weak separator: the MDS criteria give 4 to 6 Hz for rest tremor, the tremor consensus 4 to 7 Hz with higher frequencies described, and essential tremor spans 4 to 12 Hz. When the two cannot be told apart clinically, NICE suggests a DaT scan. [[PPMI-FEATPD,Bhatia2018,Louis2026,NICE2017]]`,
  pt:`What the hand is doing when it shakes matters more than how fast it shakes.`,
  hook:`Rest vs action, not Hz: the published ranges overlap at 4 to 6 or 7 Hz. [[PPMI-FEATPD,Louis2026]]`}];
const DDX_ampPD=u=>u<2.2?1:u<2.6?lerp(1,.08,ease((u-2.2)/.4)):u<3.6?.08:u<6.2?lerp(.08,.16,ramp(u,3.6,4)):u<8.6?.1:u<9?.1:lerp(.1,1,ease(ramp(u,9,9.7)));
const DDX_ampET=u=>u<2.2?.04:u<3.6?lerp(.04,.55,ramp(u,2.2,3.6)):u<6.2?lerp(.55,1,ramp(u,3.6,4)):u<8.6?.85:lerp(.85,.04,ramp(u,8.6,9.2));
const DDX_pose=u=>{const R=[75,5],P=[0,0],Nn=[-25,-140],mix=(a,b,k)=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];
  if(u<2.2)return R;if(u<3.6)return mix(R,P,ease((u-2.2)/1.4));if(u<6.2)return P;
  if(u<8.6)return mix(P,Nn,.5-.5*Math.cos(2*Math.PI*(u-6.2)/1.2));if(u<9.4)return mix(P,R,ease((u-8.6)/.8));return R};
/* ---- conditions: [short for the chart, tone, sourced text] ; tone p = similar to PD, d = points away, n = not covered ---- */
const DDX_F=['Onset and age','Pattern','Tremor and movement','Levodopa','Gait and falls','Eye movements','Autonomic','Thinking','Tests'];
const DDX_NA=['—','n',''];
const DDX_PD={n:'Parkinson\'s disease (reference)',f:[
 ['usually later life; median onset 73','p',`Median age at onset was 73 in Olmsted County, Minnesota. [[Savica2016]]`],
 ['asymmetric; symmetric onset a red flag','p',`Bilateral symmetric parkinsonism is an MDS red flag, so asymmetry is typical. [[Postuma2015]]`],
 ['rest tremor 4–6 Hz, suppressed by moving','p',`Bradykinesia with rest tremor (4–6 Hz, suppressed when movement starts), rigidity or both. [[PPMI-FEATPD,Postuma2015]]`],
 ['clear, dramatic response','p',`A clear and dramatic response is a supportive criterion; no response to high-dose levodopa is an exclusion. [[Postuma2015]]`],
 ['falls within 3 y are a red flag','p',`Recurrent falls within 3 years of onset are a red flag. [[Postuma2015]]`],
 ['downgaze palsy is an exclusion','p',`Downward vertical supranuclear gaze palsy is an absolute exclusion. [[Postuma2015]]`],
 ['non-motor features expected','p',`No common non-motor features after 5 years is a red flag, and so is severe autonomic failure in the first 5 years. [[Postuma2015]]`],
 ['dementia later in many','p',`Dementia is not an exclusion; in one incident cohort 46% had dementia at 10 years. [[Fox2025,WilliamsGray2013]]`],
 ['DaT abnormal; smell loss, MIBG low','p',`Normal dopaminergic imaging is an exclusion; smell loss or cardiac denervation on MIBG is supportive. [[Postuma2015]]`]],
 more:`Even so, the clinical diagnosis is right about 80% of the time. [[Rizzo2016]]`};
const DDX_C=[
 {id:'et',s:'Essential tremor',n:'Essential tremor',f:[
  ['tremor for at least 3 years','d',`Defined as lasting at least 3 years. [[Bhatia2018]]`],
  ['both arms; head and voice too','d',`"Bilateral upper limb action tremor", with or without head, voice or leg tremor; voice tremor only with hand tremor. [[Bhatia2018]]`],
  ['action tremor 4–12 Hz; no slowness','d',`A 4 to 12 Hz kinetic tremor of the arms, with no parkinsonism, dystonia or ataxia by definition. A rest tremor makes it "ET plus". [[Louis2026,Bhatia2018]]`],
  DDX_NA,DDX_NA,DDX_NA,DDX_NA,DDX_NA,
  ['DaT scan when unsure; alcohol may help','d',`In the DaTscan studies essential tremor was in the group without a parkinsonian syndrome, and NICE suggests DaT-SPECT when ET cannot be told from parkinsonism clinically. Alcohol reduced tremor in 46% of 104 people tested. [[FDA-DaTscan,NICE2017,Hopfner2015]]`]],
  more:`Head tremor is common in ET, while isolated focal head or voice tremor excludes it. The alcohol effect was judged not consistent enough to include in the definition. [[Bhatia2018]]`,
  pt:`Essential tremor shakes with action, usually in both hands, and does not cause the slowness of Parkinson's.`,hook:`ET: bilateral action tremor ≥ 3 years, no parkinsonism. ET plus: ET with, for example, a rest tremor. [[Bhatia2018]]`},
 {id:'dip',s:'Drug-induced',n:'Drug-induced parkinsonism',f:[
  ['after a dopamine blocker','d',`Caused by typical and atypical antipsychotics, prokinetics (metoclopramide, levosulpiride, clebopride, itopride, domperidone), flunarizine and cinnarizine, valproate (about 5% of long-term users) and lithium. [[Shin2012]]`],
  ['classically symmetric, often not','d',`Classically symmetric and without rest tremor, but 30–50% have asymmetric parkinsonism and rest tremor. [[Shin2012]]`],
  ['rest tremor in 30–50%','p',`30–50% of people with drug-induced parkinsonism have rest tremor. [[Shin2012]]`],
  DDX_NA,DDX_NA,DDX_NA,DDX_NA,DDX_NA,
  ['DaT normal in the pure form','d',`DaT imaging is normal in pure drug-induced parkinsonism because the presynaptic terminals are intact, which helps separate it from PD. [[Shin2012]]`]],
  more:`It usually resolves within weeks to months after the drug is stopped, but may persist or progress in 10–50%, who may have preclinical PD unmasked by the drug. In one US county it caused 20% of new parkinsonism, and was the one type not more common in men. [[Shin2012,Bower1999]]`,
  pt:`Some medicines block dopamine and can cause Parkinson's-like symptoms that usually settle after the medicine is stopped.`,hook:`MDS exclusion 5: a dopamine receptor blocker or depleter in a dose and time-course consistent with DIP. [[Postuma2015]]`},
 {id:'vasc',s:'Vascular',n:'Vascular parkinsonism',f:[
  ['gradual; a minority after a stroke','d',`Most of 17 autopsy-confirmed patients had a gradual course; a minority began acutely after a lacunar infarct. [[Zijlmans2004]]`],
  ['both sides, lower body','d',`Bilateral bradykinesia and rigidity with a predominantly shuffling gait, "lower-body" parkinsonism. Parkinsonism restricted to the legs for more than 3 years is an MDS absolute exclusion for PD. [[Zijlmans2004,Postuma2015]]`],
  DDX_NA,DDX_NA,
  ['shuffling gait predominates','d',`A predominantly shuffling gait. [[Zijlmans2004]]`],
  DDX_NA,DDX_NA,DDX_NA,DDX_NA],
  more:`Vascular disease was among the conditions found at autopsy in people diagnosed with PD in life. [[Hughes1992]]`,
  pt:`Disease of the brain's small blood vessels can cause slowness, stiffness and shuffling, mainly in the legs.`,hook:`Legs only for more than 3 years = MDS exclusion. Think vascular parkinsonism. [[Postuma2015,Zijlmans2004]]`},
 {id:'msa',s:'MSA',n:'Multiple system atrophy (MSA)',f:[
  ['adult onset after 30, sporadic','d',`Prerequisites: onset after 30 years, a negative family history and progression. [[Wenning2022]]`],
  DDX_NA,
  ['parkinsonism or cerebellar ataxia','d',`Poorly levodopa-responsive parkinsonism (MSA-P) and/or a cerebellar syndrome (MSA-C). [[Wenning2022]]`],
  ['often poor, yet 43–57% of MSA-P respond','d',`"Poorly responsive" means under 30% MDS-UPDRS-III improvement on up to 1000 mg a day, yet a beneficial response occurs in 42.5–56.7% of MSA-P and 12.9–25% of MSA-C. [[Wenning2022]]`],
  ['postural instability within 3 y','d',`Postural instability within 3 years had 88.7% specificity for MSA against PD. [[Wenning2022]]`],
  ['cerebellar eye signs in MSA-C','d',`Unequivocal cerebellar abnormalities, including cerebellar oculomotor signs, are an MDS absolute exclusion for PD. [[Postuma2015]]`],
  ['core: bladder, blood-pressure drop','d',`Clinically established MSA needs an autonomic core feature: post-void residual above 100 mL, urinary urge incontinence, or neurogenic orthostatic hypotension (at least 20 mmHg systolic drop) within 3 minutes. Stridor is distinctive. [[Wenning2022]]`],
  DDX_NA,
  ['MRI markers such as hot cross bun','d',`At least one MRI marker is required for clinically established MSA: the hot-cross-bun sign, atrophy of the putamen, pons, middle cerebellar peduncle or cerebellum, or raised putaminal or MCP diffusivity. Putaminal diffusivity separated MSA from PD with 90% sensitivity and 93% specificity. [[Wenning2022]]`]],
  more:`MDS 2022 has four levels: neuropathologically established, clinically established, clinically probable and possible prodromal. Under the 2008 criteria, sensitivity at the first visit was only 41% for possible and 18% for probable MSA. Skin biopsy found phosphorylated synuclein in 98.2% of MSA, so a synuclein test does not separate it from PD. [[Wenning2022,Gibbons2024]]`,
  pt:`MSA affects movement, balance and the automatic systems that control blood pressure and the bladder.`,hook:`MSA clues: early severe autonomic failure, stridor, cerebellar signs, poor levodopa response, MRI hot cross bun. [[Wenning2022]]`},
 {id:'psp',s:'PSP',n:'Progressive supranuclear palsy (PSP)',f:[
  ['age 40 or older, sporadic','d',`Requires sporadic occurrence, onset at 40 or older and gradual progression. [[Hoglinger2017]]`],
  DDX_NA,DDX_NA,
  ['absent in 75%; 15% respond well','d',`At autopsy, absent levodopa response was noted in 75% of PSP; 15% had a marked response and 36% unequivocal fluctuations, so about a quarter may appear responsive, partly through Lewy co-pathology. [[Fox2025]]`],
  ['repeated falls within 3 years','d',`P1 "Repeated unprovoked falls within 3 years" and P2 "Tendency to fall on the pull-test within 3 years". [[Hoglinger2017]]`],
  ['vertical gaze palsy, slow saccades','d',`O1 "Vertical supranuclear gaze palsy" and O2 "Slow velocity of vertical saccades"; probable PSP-Richardson syndrome is (O1 or O2) plus (P1 or P2). Downward gaze palsy is an MDS exclusion for PD. [[Hoglinger2017,Postuma2015]]`],
  DDX_NA,DDX_NA,
  ['hummingbird sign: specific, insensitive','d',`The MRI hummingbird sign had 99.5% specificity and 96.1% positive predictive value for PSP, but only 51.6% sensitivity. [[Mueller2018]]`]],
  more:`Under the older NINDS-SPSP criteria, first-visit sensitivity had a median of 24%, and in one series 76% of autopsy-confirmed PSP presented as something other than Richardson syndrome. [[Hoglinger2017]]`,
  pt:`PSP causes early falls and trouble moving the eyes up and down.`,hook:`Probable PSP-RS = vertical gaze sign (O1 or O2) + falls within 3 years (P1 or P2). [[Hoglinger2017]]`},
 {id:'cbd',s:'CBD',n:'Corticobasal degeneration (CBD)',f:[
  ['age 50 or older, ≥ 1 year of progression','d',`Probable CBD requires insidious onset with at least 1 year of progression, onset at 50 or older and no family history or tau mutation. [[Armstrong2013]]`],
  ['four phenotypes','d',`Four phenotypes: corticobasal syndrome, frontal behavioural-spatial syndrome, nonfluent/agrammatic aphasia and a PSP syndrome. Corticobasal syndrome was the most common final diagnosis (37.1%). [[Armstrong2013]]`],
  DDX_NA,
  ['a sustained response is rare','d',`A sustained levodopa response "is rare". [[Armstrong2013]]`],
  DDX_NA,DDX_NA,DDX_NA,
  ['apraxia, cortical sensory loss, aphasia','d',`Unequivocal cortical sensory loss, clear limb ideomotor apraxia or progressive aphasia are MDS absolute exclusions for PD. [[Postuma2015]]`],
  ['DaT scan can be normal','d',`At autopsy, a few MSA, PSP and especially CBD cases had a normal DaT scan, while no PD case did. [[Fox2025]]`]],
  more:`CBD is defined by its pathology, and the same pathology can produce several clinical pictures, so the clinical criteria name phenotypes rather than one syndrome. [[Armstrong2013]]`,
  pt:`CBD can take several forms, often with problems that come from the brain's outer layer, such as using a hand for skilled tasks or finding words.`,hook:`Cortical signs (apraxia, cortical sensory loss, aphasia) are PD exclusions and point to CBD. [[Postuma2015,Armstrong2013]]`},
 {id:'dlb',s:'DLB',n:'Dementia with Lewy bodies (DLB)',f:[
  ['dementia before or within 1 year','d',`The DLB consortium "remains supportive of the 1-year rule distinguishing DLB from PD dementia", while calling the cutoff arbitrary and based on expert opinion. [[McKeith2017]]`],
  DDX_NA,
  ['parkinsonism; one sign is enough','p',`Parkinsonism eventually develops in over 85%, and only one cardinal sign is needed. [[McKeith2017]]`],
  DDX_NA,DDX_NA,DDX_NA,DDX_NA,
  ['dementia required; fluctuations','d',`Dementia is required. Core features: fluctuating cognition, recurrent well-formed visual hallucinations (up to 80%), REM sleep behaviour disorder and parkinsonism. [[McKeith2017]]`],
  ['DaT reduced; RBD in 76%','p',`Reduced DaT uptake separates DLB from Alzheimer's disease with 78% sensitivity and 90% specificity. RBD occurred in 76% of autopsy-confirmed DLB against 4% of non-DLB. [[McKeith2017]]`]],
  more:`The consortium calls the 1-year cutoff arbitrary and based on expert opinion, so it may not reflect distinct biology. Among people with isolated RBD who converted, 43.5% developed dementia first. [[McKeith2017,Postuma2019RBD]] See <a href="#prodrome" data-go="prodrome">Before the tremor</a>.`,
  pt:`In DLB, thinking problems, vivid visual hallucinations and fluctuating alertness come first or at the same time as the movement problems.`,hook:`1-year rule: dementia before or within 1 year of parkinsonism = DLB; later = PD dementia. [[McKeith2017]]`},
 {id:'nph',s:'NPH',n:'Normal-pressure hydrocephalus (NPH)',f:[
  DDX_NA,
  ['gait first','d',`Gait disturbance is present in 94–100%, and is usually the first sign. [[Nakajima2021]]`],
  DDX_NA,DDX_NA,
  ['gait disturbance in 94–100%','d',`Unlike PD, external cues do little for the gait. [[Nakajima2021]]`],
  DDX_NA,
  ['urinary dysfunction in 60–92%','d',`Urinary dysfunction is present in 60–92%; the full triad in about 60%. [[Nakajima2021]]`],
  ['cognitive impairment in 78–98%','d',`Cognitive impairment is present in 78–98%. [[Nakajima2021]]`],
  ['big ventricles with DESH; tap test','d',`Ventriculomegaly (Evans index 0.3 or more) with DESH on imaging; a CSF tap test supports the diagnosis. [[Nakajima2021]]`]],
  more:`The classic triad of gait, cognition and bladder is complete in only about 60%, so NPH is considered when gait leads, even without the other two. [[Nakajima2021]]`,
  pt:`Enlarged fluid spaces in the brain go with a walking problem first, then slowed thinking and bladder trouble.`,hook:`NPH: gait (94–100%) > cognition (78–98%) > urine (60–92%); Evans index ≥ 0.3 with DESH. [[Nakajima2021]]`},
 {id:'wil',s:'Wilson disease',n:'Wilson disease',f:[
  ['young: symptoms at 20–30','d',`Symptomatic prevalence is about 1 in 30,000, with mean symptom onset at 20 to 30 years. [[Czlonkowska2018]]`],
  DDX_NA,
  ['parkinsonism in 19–62%','p',`Parkinsonism occurs in 19–62% of patients. [[Czlonkowska2018]]`],
  DDX_NA,DDX_NA,
  ['Kayser-Fleischer rings','d',`Kayser-Fleischer rings occur in "almost 100%" of neurological cases. [[Czlonkowska2018]]`],
  DDX_NA,DDX_NA,DDX_NA],
  more:`With a symptomatic prevalence of about 1 in 30,000 it is rare, but it belongs in the differential of young-onset parkinsonism. Early-onset PD is defined as onset after 21 and before 50. [[Czlonkowska2018,Mehanna2022]]`,
  pt:`A rare condition that can cause parkinsonism in young people; rings in the eyes are a clue.`,hook:`Young parkinsonism → look for Kayser-Fleischer rings (almost 100% of neurological Wilson). [[Czlonkowska2018]]`},
 {id:'fun',s:'Functional',n:'Functional parkinsonism',f:[
  ['abrupt onset in half; mean age 51','d',`In a review of 16 studies (120 patients), onset was abrupt in half and the mean age was 50.7. [[AmbarAkkaoui2020]]`],
  ['62% women','d',`62% were women. [[AmbarAkkaoui2020]]`],
  DDX_NA,DDX_NA,DDX_NA,DDX_NA,DDX_NA,
  ['psychiatric history in 67.6%','d',`67.6% had a psychiatric history and 46.8% a triggering stressor. [[AmbarAkkaoui2020]]`],
  DDX_NA],
  more:`Functional symptoms can coexist with PD, so finding one does not rule out the other. [[AmbarAkkaoui2020]]`,
  pt:`In functional parkinsonism, symptoms often begin suddenly, sometimes after a stressful event.`,hook:`Functional parkinsonism: abrupt onset, psychiatric history and stressors are common, and it can coexist with PD. [[AmbarAkkaoui2020]]`}];
const DDX_wrap=(s,n)=>{const L=[''];s.split(' ').forEach(w=>{const c=(L[L.length-1]+' '+w).trim();if(c.length>n&&L[L.length-1])L.push(w);else L[L.length-1]=c});return L.slice(0,2)};

inits.ddx=()=>{
  /* ---------- 1. decision pathway ---------- */
  const svg=$('#ddxSvg'),rg=$('#ddxT');
  function draw(t){
    const N=vb(svg,'720 350','400 790');
    const L=N?{P:DDX_STEPS.map((_,i)=>[124,52+i*112]),bw:216,pill:i=>[324,52+i*112],pw:136}
             :{P:[[95,104],[270,104],[445,104],[620,104],[620,254],[370,254],[110,254]],bw:150,pill:i=>i<4?[[95,104],[270,104],[445,104],[620,104]][i].map((v,k)=>k?40:v):[[620,318],[370,318],[110,318]][i-4],pw:150};
    const pos=t*7,cur=Math.min(6,Math.floor(pos)),lp=clamp(pos-cur);
    let s=`<defs>${marker('ddxA')}${marker('ddxAr','var(--rose)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    for(let i=0;i<6;i++){const[x0,y0]=L.P[i],[x1,y1]=L.P[i+1],done=i<cur;let d;
      if(N||x0===x1)d=`M${x0} ${y0+29}V${y1-31}`;else d=x1>x0?`M${x0+L.bw/2} ${y0}H${x1-L.bw/2-2}`:`M${x0-L.bw/2} ${y0}H${x1+L.bw/2+2}`;
      s+=`<path d="${d}" style="fill:none;stroke:${done?'var(--rose)':'var(--muted)'};stroke-width:${done?2.4:1.6};${done?'':'stroke-dasharray:4 4'}" marker-end="url(#${done?'ddxAr':'ddxA'})"/>`}
    DDX_STEPS.forEach((S,i)=>{const[px,py]=L.pill(i),[nx,ny]=L.P[i],lit=i<cur||(i===cur&&lp>.3),fin=i===6;
      if(N)s+=`<path d="M${nx+L.bw/2} ${ny} H${px-L.pw/2}" style="stroke:${lit?'var(--rose)':'var(--line)'};stroke-dasharray:3 3"/>`;
      else s+=`<path d="M${nx} ${i<4?ny-29:ny+29} V${i<4?py+17:py-17}" style="stroke:${lit?'var(--rose)':'var(--line)'};stroke-dasharray:3 3"/>`;
      s+=`<rect x="${px-L.pw/2}" y="${py-17}" width="${L.pw}" height="34" rx="17" style="fill:${lit?(fin?'var(--good-soft)':'var(--rose-soft)'):'var(--panel)'};stroke:${lit?(fin?'var(--good)':'var(--rose)'):'var(--line)'}"/>`;
      s+=`<text x="${px}" y="${py-2}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:700">${S.ex[0]}</text><text x="${px}" y="${py+10}" class="t-xs t-mid">${S.ex[1]}</text>`});
    L.P.forEach(([x,y],i)=>{const on=i===cur,done=i<cur,S=DDX_STEPS[i];
      s+=`<g class="clk" data-node="${i}" tabindex="0" role="button" aria-label="Question ${i+1}: ${S.t}${done?', done':''}" aria-pressed="${on}">`;
      s+=`<rect x="${x-L.bw/2}" y="${y-29}" width="${L.bw}" height="58" rx="12" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':done?'var(--sage)':'var(--line)'};stroke-width:${on?2.4:1.4}"/>`;
      s+=ddxGlyph(i,x-L.bw/2+24,y,on?lp:1,on||done);
      s+=`<text x="${x-L.bw/2+46}" y="${y-3}" class="t-lbl">${S.ti}</text><text x="${x-L.bw/2+46}" y="${y+13}" class="t-xs">${S.sub}</text>`;
      if(done)s+=`<circle cx="${x+L.bw/2-4}" cy="${y-25}" r="8" style="fill:var(--sage)"/><path d="M${x+L.bw/2-8} ${y-25}l3 3 5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`</g>`});
    const[ax,ay]=L.P[cur],[bx,by]=L.P[Math.min(6,cur+1)],m=cur<6?ease(ramp(lp,.72,1)):0;
    const ox=N?-L.bw/2-2:0,oy=N?0:(cur<4?32:-32);
    s+=`<circle cx="${f1(lerp(ax,bx,m)+(m>0&&m<1?0:ox))}" cy="${f1(lerp(ay,by,m)+(m>0&&m<1?0:oy))}" r="8" style="fill:var(--rose);stroke:var(--panel);stroke-width:3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DDX_STEPS,t);setSt(p);$('#ddxNote').innerHTML=noteHTML(DDX_STEPS[p]);
  }
  const stop=playWire(rg,$('#ddxPlay'),draw,21000,'Replay','ddx');
  const setSt=stepWire($('#ddxSteps'),DDX_STEPS,rg,draw,stop);
  const go=i=>{stop();rg.value=DDX_STEPS[i].at;draw(DDX_STEPS[i].at)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-node]');if(g)go(+g.dataset.node)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-node]');if(!g||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();const i=+g.dataset.node;go(i);const ng=svg.querySelector(`[data-node="${i}"]`);ng&&ng.focus()});

  /* ---------- 2. tremor oscillogram ---------- */
  const ts=$('#ddxTr'),tr=$('#ddxTrT');let alc=false,lastT='';
  function drawT(t){
    const N=vb(ts,'720 420','400 580'),u=10*t;
    const L=N?{fig:[52,62],x0:16,x1:384,seg:160,pd:[222,222],et:[306,306],H:24,ax:352,band:{t:400,x0:16,x1:384,rows:[428,466,504],lab:-6,tk:540},cur:[150,52]}
             :{fig:[64,72],x0:160,x1:704,seg:26,pd:[66,104],et:[150,188],H:26,ax:238,band:{t:274,x0:230,x1:704,rows:[296,322,348],lab:0,tk:380},cur:null};
    const X=v=>lerp(L.x0,L.x1,v/10);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // seated figure
    const[fx,fy]=L.fig,[a1,a2]=DDX_pose(u),rad=Math.PI/180,ex=fx+20*Math.cos(a1*rad),ey=fy+20*Math.sin(a1*rad),hx=ex+18*Math.cos(a2*rad),hy=ey+18*Math.sin(a2*rad);
    s+=`<g aria-hidden="true"><path d="M${fx-22} ${fy+44} H${fx+30} M${fx-20} ${fy+44} V${fy+74} M${fx+26} ${fy+44} V${fy+74} M${fx-20} ${fy+44} V${fy+6}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<circle cx="${fx-2}" cy="${fy-18}" r="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M${fx-2} ${fy-8} L${fx-6} ${fy+38} L${fx+24} ${fy+40} L${fx+26} ${fy+70}" style="fill:none;stroke:var(--cell-line);stroke-width:5;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<path d="M${fx} ${fy} L${f1(ex)} ${f1(ey)} L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:var(--ink);stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="3.5" style="fill:var(--ink)"/></g>`;
    // task strip
    const segI=DDX_SEG.findIndex(g=>u>=g[0]&&u<g[1]),si=segI<0?4:segI;
    DDX_SEG.forEach(([a,b,l],i)=>{const on=i===si,y=L.seg;s+=`<rect x="${f1(X(a)+1)}" y="${y-12}" width="${f1(X(b)-X(a)-2)}" height="22" rx="6" style="fill:${on?'var(--sage-soft)':'var(--panel)'};stroke:${on?'var(--sage)':'var(--line)'}"/><text x="${f1((X(a)+X(b))/2)}" y="${y+3}" class="t-xs t-mid" style="fill:${on?'var(--sage)':'var(--muted)'};font-weight:${on?700:500}">${N&&l==='Finger to nose'?'Finger–nose':l}</text>`});
    if(N&&L.cur)s+=`<text x="${L.cur[0]}" y="${L.cur[1]}" class="t-big">${DDX_SEG[si][2]}</text><text x="${L.cur[0]}" y="${L.cur[1]+18}" class="t-xs" style="fill:var(--ink)">${f1(u)} s of a 10 s task</text><text x="${L.cur[0]}" y="${L.cur[1]+34}" class="t-xs">schematic traces</text>`;
    // traces
    const trace=(yl,yc,amp,f,ph,col,label)=>{let q=`<text x="${L.x0}" y="${yl-L.H-10}" class="t-lbl" style="font-size:12.5px;fill:${col}">${label}</text>`;
      q+=`<path d="M${L.x0} ${yc} H${L.x1}" style="stroke:var(--line);stroke-width:1"/>`;
      const M=Math.max(2,Math.round(900*t));let d='',dd='',prev=null;
      for(let k=0;k<=M;k++){const v=u*k/M,A=amp(v),y=yc-L.H*A*Math.sin(2*Math.PI*f*v+ph)*(1+.12*Math.sin(2*Math.PI*.6*v)),P=f1(X(v))+' '+f1(y);
        const faint=col==='var(--rose)'&&v>=2.4&&v<9;if(faint)dd+=(prev===true?'L':'M')+P;else d+=(prev===false?'L':'M')+P;prev=faint}
      q+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:1.5;stroke-linejoin:round"/>`;if(dd)q+=`<path d="${dd}" style="fill:none;stroke:${col};stroke-width:1.2;opacity:.45"/>`;
      const A=amp(u);q+=`<circle cx="${f1(X(u))}" cy="${f1(yc-L.H*A*Math.sin(2*Math.PI*f*u+ph))}" r="3.5" style="fill:${col}"/>`;return q};
    const etA=v=>DDX_ampET(v)*(alc?.5:1);
    s+=trace(L.pd[1],L.pd[1],DDX_ampPD,5,0,'var(--rose)',N?'Parkinson\'s · rest tremor':'Parkinson\'s disease · rest tremor (5 Hz)');
    s+=trace(L.et[1],L.et[1],etA,7,.8,'var(--ink)',N?`Essential tremor${alc?' · after alcohol':''}`:`Essential tremor · action tremor (7 Hz)${alc?' · after alcohol (schematic)':''}`);
    if(u>=3.6&&u<8.6)s+=`<text x="${L.x1}" y="${L.pd[1]-L.H-10}" class="t-xs t-end" style="fill:var(--rose)">${N?'postural: does not count':'postural tremor: does not count'}</text>`;
    s+=`<path d="M${f1(X(u))} ${L.pd[1]-L.H-4} V${L.et[1]+L.H+4}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    for(let k=0;k<=10;k+=2)s+=`<text x="${f1(X(k))}" y="${L.ax}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${L.x1}" y="${L.ax+14}" class="t-xs t-end">seconds into the examination</text>`;
    // frequency bands
    const B=L.band,FX=hz=>lerp(B.x0,B.x1,hz/14);
    s+=`<text x="16" y="${B.t}" class="t-sm" style="fill:var(--ink)">${N?'FREQUENCY RANGES AS PUBLISHED':'FREQUENCY RANGES AS PUBLISHED · THEY OVERLAP'}</text>`;
    if(N)B.rows.forEach(y=>{s+=`<rect x="${f1(FX(4))}" y="${y-9}" width="${f1(FX(7)-FX(4))}" height="18" style="fill:var(--warn-soft);opacity:.8"/>`});
    else s+=`<rect x="${f1(FX(4))}" y="${B.rows[0]-12}" width="${f1(FX(7)-FX(4))}" height="${B.rows[2]-B.rows[0]+24}" style="fill:var(--warn-soft);opacity:.7"/>`;
    [['PD rest tremor · MDS criteria',4,6,'var(--rose)',0],['PD rest tremor · tremor consensus',4,7,'var(--rose)',1],['Essential tremor',4,12,'var(--ink)',0]].forEach(([l,a,b,c,more],i)=>{const y=B.rows[i];
      s+=N?`<text x="16" y="${y-8}" class="t-xs" style="fill:var(--ink)">${l} · ${a}–${b} Hz${more?', higher described':''}</text>`:`<text x="16" y="${y+4}" class="t-xs" style="fill:var(--ink)">${l}</text>`;
      s+=`<rect x="${f1(FX(a))}" y="${y-6}" width="${f1(FX(b)-FX(a))}" height="12" rx="6" style="fill:${c};opacity:${c==='var(--ink)'?.55:.8}"/>`;
      if(!N)s+=`<text x="${f1(FX(b)+(more?22:6))}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${a}–${b} Hz${more?' (higher described)':''}</text>`;
      if(more)s+=`<path d="M${f1(FX(b))} ${y} h${N?16:12}" style="stroke:${c};stroke-width:2;stroke-dasharray:2 2"/>`});
    for(let hz=0;hz<=14;hz+=2)s+=`<text x="${f1(FX(hz))}" y="${B.tk}" class="t-xs t-mid">${hz}</text>`;
    s+=`<text x="${B.x1}" y="${B.tk+14}" class="t-xs t-end">Hz · shaded: where the ranges overlap</text>`;
    ts.innerHTML=s;
    const p=phaseOf(DDX_TRS,t);setTr(p);
    const w=a=>a>.7?'large':a>.3?'moderate':a>.12?'small':'barely any';
    $('#ddxTrRead').innerHTML=`<span>Task <b>${DDX_SEG[si][2].toLowerCase()}</b></span><span>Parkinson's tremor <b>${w(DDX_ampPD(u))}</b>${u>=3.6&&u<8.6?' (does not count)':''}</span><span>Essential tremor <b>${w(etA(u))}</b></span>`;
    tr.setAttribute('aria-valuetext',`${f1(u)} seconds, ${DDX_SEG[si][2]}: Parkinson's tremor ${w(DDX_ampPD(u))}, essential tremor ${w(etA(u))}`);
    const html=noteHTML(DDX_TRS[p])+(alc?`<p class="readout"><span><b>After alcohol:</b> the essential-tremor trace is drawn at half size, a schematic effect seen in 46% of people tested. [[Hopfner2015]]</span></p>`:'');
    if(html!==lastT){$('#ddxTrNote').innerHTML=html;lastT=html}
  }
  const stopT=playWire(tr,$('#ddxTrPlay'),drawT,14000,'Replay','ddx');
  const setTr=stepWire($('#ddxTrSteps'),DDX_TRS,tr,drawT,stopT);
  const setAlc=v=>{alc=v;$('#ddxAlc0').setAttribute('aria-pressed',!v);$('#ddxAlc1').setAttribute('aria-pressed',v);drawT(+tr.value)};
  $('#ddxAlc0').onclick=()=>setAlc(false);$('#ddxAlc1').onclick=()=>setAlc(true);

  /* ---------- 3. side by side ---------- */
  const cs=$('#ddxCmp');let sel=0,k0=1,stopC=null;
  $('#ddxPick').innerHTML=DDX_C.map((c,i)=>`<button class="btn" data-pick="${i}" aria-pressed="${i===sel}">${c.n.replace(/ \(.*\)/,'')}</button>`).join('');
  function drawC(k){
    const N=vb(cs,'720 424','400 640'),C=DDX_C[sel];
    const L=N?{lab:16,c1:16,c2:206,cw:178,top:66,rh:63,ch:38,wrap:27}:{lab:16,c1:176,c2:452,cw:256,top:56,rh:40,ch:34,wrap:40};
    let s=`<defs><pattern id="ddxHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V6" style="stroke:var(--line);stroke-width:1.5"/></pattern></defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${L.c1}" y="${N?26:34}" class="t-sm" style="fill:var(--sage);font-weight:700">PARKINSON'S DISEASE</text><text x="${L.c2}" y="${N?26:34}" class="t-sm" style="fill:var(--rose);font-weight:700">${(N?C.s:C.n).toUpperCase()}</text>`;
    DDX_F.forEach((fn,i)=>{const y0=L.top+i*L.rh,yc=N?y0+16:y0,cy=N?y0+7:yc-L.ch/2+4,g=ease(clamp(k*1.6-i*.07)),P=DDX_PD.f[i],V=C.f[i];
      s+=N?`<text x="${L.lab}" y="${y0}" class="t-xs" style="fill:var(--ink);font-weight:700">${fn.toUpperCase()}</text>`:`<text x="${L.lab}" y="${yc+3}" class="t-lbl" style="font-size:12px">${fn}</text>`;
      const cell=(x,v,isPD,o,dx)=>{const tone=isPD?'pd':v[1],fill=tone==='pd'?'var(--sage-soft)':tone==='p'?'var(--good-soft)':tone==='d'?'var(--warn-soft)':'url(#ddxHatch)',stroke=tone==='d'?'var(--warn)':tone==='p'?'var(--good)':'var(--line)';
        let q=`<g style="opacity:${f1(o)}" transform="translate(${f1(dx)} 0)"><rect x="${x}" y="${f1(cy)}" width="${L.cw}" height="${L.ch}" rx="7" style="fill:${fill};stroke:${stroke}"/>`;
        const lines=DDX_wrap(v[0],L.wrap);lines.forEach((ln,j)=>{q+=`<text x="${x+8}" y="${f1(cy+L.ch/2+4+(j-(lines.length-1)/2)*12)}" class="t-xs" style="fill:${tone==='n'?'var(--muted)':'var(--ink)'}">${ln}</text>`});
        return q+`</g>`};
      s+=cell(L.c1,P,true,1,0)+cell(L.c2,V,false,g,(1-g)*14)});
    cs.innerHTML=s}
  function noteC(){const C=DDX_C[sel],pts=C.f.map((v,i)=>v[1]==='d'&&v[2]?`<li><b>${DDX_F[i]}:</b> ${v[2]}</li>`:'').join('');
    const sim=C.f.map((v,i)=>v[1]==='p'?DDX_F[i].toLowerCase():'').filter(Boolean);
    $('#ddxCmpNote').innerHTML=`<div class="kicker">Compared with Parkinson's disease</div><h4>${C.n}</h4>${pts?`<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;font-size:15px">${pts}</ul>`:''}${sim.length?`<p>Looks like PD for: ${sim.join(', ')}.</p>`:''}<p>${C.more}</p><div class="pt"><b>In plain words</b>${C.pt}</div><div class="hook"><b>Exam hook</b>${C.hook}</div>`;
    $$('#ddxPick [data-pick]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pick===sel));
    $$('#ddxTable tbody tr[data-row]').forEach(r=>r.classList.toggle('hl',+r.dataset.row===sel))}
  function pick(i){sel=i;noteC();if(stopC)stopC();stopC=animate(520,drawC,()=>{stopC=null})}
  $('#ddxPick').addEventListener('click',e=>{const b=e.target.closest('[data-pick]');if(b)pick(+b.dataset.pick)});

  /* ---------- 4. table ---------- */
  const uniq=a=>[...new Set(a.filter(Boolean))];
  $('#ddxTable tbody').innerHTML=[DDX_PD,...DDX_C].map((c,j)=>{const i=j-1;const pts=uniq(c.f.slice(0,8).map(v=>v[2])).join(' '),tst=c.f[8][2]||'Not covered by the sources behind this module.';
    return `<tr data-row="${i}"><th scope="row"><button class="ddb" data-more="${i}" aria-expanded="false" aria-controls="ddxMore${i}">${c.n}</button></th><td>${pts}</td><td>${tst}</td></tr><tr class="ddmore" id="ddxMore${i}" hidden><td colspan="3">${c.more}</td></tr>`}).join('');
  $('#ddxTable').addEventListener('click',e=>{const b=e.target.closest('[data-more]');if(!b)return;const i=+b.dataset.more,r=$('#ddxMore'+i),open=b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded',!open);r.hidden=open;if(!open&&i>=0)pick(i)});

  const prevR=redraws.ddx;redraws.ddx=()=>{prevR&&prevR();drawC(1)};
  onHide.ddx=(h=>()=>{h&&h();if(stopC){stopC();stopC=null}})(onHide.ddx);
  noteC();drawC(1);drawT(+tr.value);draw(+rg.value);
};
