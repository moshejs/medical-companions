/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js. Scope: triggers, molecular mimicry and vaccines are not covered here. */
const GBRV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const GBRV_FC=[
 /* ---- Part 1: what, subtypes, mfs, course ---- */
 [1,`How does the 2023 EAN/PNS guideline define GBS?`,`As an acute polyradiculoneuropathy. Besides weakness and sensory disturbance, people may have cranial nerve involvement, respiratory insufficiency, autonomic dysfunction and pain [[vanDoorn2023]].`],
 [1,`What is the commonest cause of acute flaccid paralysis worldwide?`,`GBS [[Shahrizaila2021]]. About 100,000 people develop it each year worldwide [[Willison2016]].`],
 [1,`How common is GBS in Western countries?`,`Median 1.11 per 100,000 person-years (range 0.81 to 1.89), rising 20% for every 10 years of age [[Sejvar2011]].`],
 [1,`What share need ventilation, and what share die?`,`About 20% need mechanical ventilation, and 3 to 10% die even with the best care [[Leonhard2019]]. These are population figures.`],
 [1,`When do most deaths in GBS happen?`,`Up to two-thirds come in the recovery phase [[Leonhard2019]]. In the Dutch cohort, 67% of deaths were in recovery and only 47% in intensive care [[vanDenBerg2013]].`],
 [1,`What does AIDP attack, and what does AMAN attack?`,`AIDP: the Schwann cell surface and myelin. AMAN: the axon membrane (axolemma) at the node of Ranvier [[HaferMacko1996AIDP,HaferMacko1996AMAN]].`],
 [1,`What is the earliest change seen in AMAN?`,`Lengthening of the node of Ranvier. Macrophages then enter at the node and move into the periaxonal space, under myelin that stays intact [[Griffin1996Nodal]].`],
 [1,`How common is the axonal subtype in Bangladesh and in Europe/Americas in IGOS?`,`36% in Bangladesh against 6% in Europe/Americas. Demyelinating was still the commonest subtype in every region [[Doets2018]].`],
 [1,`What is reversible conduction failure?`,`A block or a low motor response that recovers quickly, with no sign of remyelination. It is attributed to impaired conduction at the nodes [[Kuwabara1998GM1,Kokubun2010]].`],
 [1,`Does AMAN always recover slowly?`,`No. In northern China, median time to walk 5 m with help was 31 days in AMAN and 32 days in AIDP [[Ho1997Recovery]].`],
 [1,`What is the Miller Fisher syndrome triad?`,`Ophthalmoplegia, ataxia and areflexia [[Mori2001MFS]]. Its antibody is anti-GQ1b, which cross-reacts with GT1a [[Chiba1993]].`],
 [1,`How long should someone with Miller Fisher syndrome be watched for spread?`,`At least 7 days. In 60 people every overlap began within 7 days [[Sekiguchi2016]], and in a Dutch cohort 43% developed limb weakness, all in week 1 [[Verboon2017MFS]].`],
 [1,`What separates Bickerstaff brainstem encephalitis from Miller Fisher syndrome?`,`Disturbed consciousness or hyperreflexia, on top of ophthalmoplegia and ataxia [[Odaka2003]].`],
 [1,`Which antibody goes with the pharyngeal-cervical-brachial variant?`,`IgG anti-GT1a, in 51% of 100 people [[Nagashima2007]].`],
 [1,`How fast do adults reach the nadir?`,`Within 2 weeks in 80%, 4 weeks in 97% and 6 weeks in all, in 494 Dutch adults [[Fokke2014]].`],

 /* ---- Part 2: signs, criteria, csf, ncs, ddx ---- */
 [2,`What two features are required by the NINDS criteria, as adapted?`,`Progressive bilateral weakness of arms and legs, and absent or decreased reflexes in affected limbs [[Leonhard2019]].`],
 [2,`Which timings make GBS doubtful?`,`A nadir within 24 hours, or progression beyond 4 weeks [[Leonhard2019]].`],
 [2,`How often does pain come before weakness?`,`In about one-third: 36% in the 2 weeks before weakness [[Ruts2010Pain]].`],
 [2,`What separates Brighton level 1 from level 3?`,`Level 1 needs both CSF and nerve conduction support. Level 3 is clinical features only [[LopezHernandez2022]].`],
 [2,`How does CSF protein change with time?`,`Raised in 49% on the first day and 88% after 2 weeks [[Fokke2014]]. In IGOS: 50% within 3 days, 84% after 7 days [[Doets2018]].`],
 [2,`What CSF cell count should prompt a search for another diagnosis?`,`More than 50 cells/µl [[Leonhard2019,vanDoorn2023]].`],
 [2,`Is albuminocytological dissociation specific to GBS?`,`No. Among 2,627 samples with raised protein and few cells, a diagnosis explained it in only 57% [[Brooks2019]].`],
 [2,`Which antibody is tested in suspected Miller Fisher syndrome?`,`Anti-GQ1b, sensitivity 88 to 100% [[vanDoorn2023]]. Treatment should not wait for antibody results [[Leonhard2019]].`],
 [2,`What are the earliest nerve conduction signs in week 1?`,`Late responses: absent H reflex in 97% and abnormal F waves in 84% [[Gordon2001]].`],
 [2,`What is sural sparing?`,`Abnormal median or ulnar sensory responses with a normal sural response [[vanDoorn2023]]. It is specific but insensitive [[Derksen2014]].`],
 [2,`Which nerve conduction finding predicted poor outcome in the North American trial?`,`A mean distal CMAP of 0 to 20% of the lower limit of normal [[Cornblath1988]].`],
 [2,`How does botulism differ from GBS?`,`It descends from the cranial nerves, without fever (afebrile in 99%), in a person who stays alert [[Rao2021]].`],
 [2,`What should be searched for before a GBS diagnosis is final?`,`A tick, over the whole body [[Edlow2010]]. Removal brings rapid improvement, though Australian cases can worsen for 24 to 48 hours first [[GrattanSmith1997]].`],
 [2,`Abdominal pain, psychological features and a neuropathy: what test is named?`,`Urinary porphobilinogen, for acute porphyria [[Albers2004,Anderson2005]].`],
 [2,`When should acute-onset CIDP (A-CIDP) be suspected?`,`With worsening 8 weeks or more after onset, or 3 or more fluctuations [[Ruts2010,vanDoorn2023]].`],

 /* ---- Part 3: breathing, ivig, plex, whatnot, autonomic, icu ---- */
 [3,`What is the 20/30/40 rule?`,`Risk of respiratory failure with vital capacity below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% [[Lawn2001]].`],
 [3,`Why measure breathing when the person says they feel fine?`,`Distress signs come late and breathlessness can be absent, so serial vital capacity comes first [[Orlikowski2004,Leonhard2019]].`],
 [3,`What three items make up EGRIS?`,`Days from onset to admission, facial or bulbar weakness, and MRC sum score; range 0 to 7 [[Doets2022]]. A score of 5 or more means about 65% risk of ventilation within a week [[Leonhard2019]].`],
 [3,`Which single sign had the highest odds ratio for ventilation in the French model?`,`Inability to cough: odds ratio 9.09 [[Sharshar2003]].`],
 [3,`What is the published IVIg regimen?`,`0.4 g/kg/day for 5 days, 2 g/kg in total [[vanDoorn2023]].`],
 [3,`What are the treatment windows tested in trials?`,`IVIg within 2 weeks of onset; plasma exchange within 4 weeks [[Leonhard2019,vanDoorn2023]].`],
 [3,`Which is better, IVIg or plasma exchange?`,`Neither. They are equally effective, so the choice is driven by access and the person's circumstances [[vanDoorn2023,Hughes2014]].`],
 [3,`What does plasma exchange do to the need for ventilation?`,`Risk ratio 0.53 against supportive care; improvement by a grade or more at 4 weeks, risk ratio 1.64 [[Chevret2017]].`],
 [3,`How many exchanges? (French trial, 1997)`,`Mild: two beat none. Moderate: four beat two. Ventilated: six were no better than four [[FrenchCooperative1997]].`],
 [3,`Do corticosteroids help GBS?`,`No. Steroids alone do not help, and oral steroids may slow recovery [[Hughes2016]].`],
 [3,`Does a second IVIg course help a poor prognosis?`,`No. In SID-GBS there was no benefit and more serious adverse events, 35% against 16% [[Walgaard2021]].`],
 [3,`What is a treatment-related fluctuation?`,`Worsening within 2 months after first improving or stabilising on treatment. It affects 6 to 10% [[Leonhard2019]].`],
 [3,`Which blood pressure pattern warned of bradycardia in ventilated people?`,`A daily systolic range above 85 mmHg [[Pfeiffer1999]].`],
 [3,`Why is succinylcholine a concern after GBS?`,`It can cause hyperkalaemic cardiac arrest after denervation [[FDA-Quelicin]], even within a month of apparent recovery [[Feldman1990]].`],
 [3,`At 1 week of ventilation, what predicts at least 14 days on the ventilator?`,`Being unable to lift the arms from the bed: 87% chance [[Walgaard2017]].`],
 [3,`What does the EAN/PNS guideline say about pain drugs?`,`Gabapentinoids or tricyclics first, then carbamazepine; opioids with care [[vanDoorn2023]]. Methylprednisolone does not treat GBS pain [[Liu2015]].`],
 [3,`Does no improvement in 4 weeks mean treatment failed?`,`Not necessarily. About 40% do not improve in the first 4 weeks despite treatment [[Leonhard2019]].`],

 /* ---- Part 4: prognosis, rehab, after ---- */
 [4,`How many people walk independently 6 months after GBS?`,`About 80%. About 20% cannot walk unaided, despite treatment [[Leonhard2019,vanDoorn2008]].`],
 [4,`What are the inputs of EGOS?`,`Age, preceding diarrhoea and the GBS disability score at 2 weeks; range 1 to 7 [[vanKoningsveld2007,Busl2023]].`],
 [4,`What are the inputs of mEGOS?`,`Age, preceding diarrhoea and MRC sum score. Range 0 to 9 at admission and 0 to 12 at day 7 [[Papri2022mEGOS,Busl2023]].`],
 [4,`What outcome do EGOS and mEGOS predict?`,`Inability to walk unaided, not death or ventilation [[vanKoningsveld2007,Walgaard2011]].`],
 [4,`Is mEGOS more accurate at admission or at day 7?`,`At day 7: AUC 0.84 to 0.87, against 0.73 to 0.77 at admission [[Walgaard2011]].`],
 [4,`Do people who needed a ventilator walk again?`,`Often. 79% of survivors in one ICU series walked independently [[Fletcher2000]].`],
 [4,`What about ventilation beyond 2 months?`,`At 6 months, 18% walked unaided against 76% with shorter ventilation [[vanDenBerg2018]]. Some walked after more than a year.`],
 [4,`Can recovery continue after the first year?`,`Yes. Most recovery is in the first year, but gains can still come more than 5 years after onset [[Leonhard2019]].`],
 [4,`What does serum neurofilament light add?`,`High levels early go with poorer walking outcome and add to mEGOS, but not to breathing prediction [[vanTilburg2024,Thomma2025]].`],
 [4,`How common is fatigue after GBS, and what helps?`,`60 to 80%, not explained by weakness [[Leonhard2019]]. Amantadine failed [[Garssen2006Amantadine]]; 12 weeks of cycling cut fatigue by 20% [[Garssen2004Training]].`],
 [4,`What did the largest rehabilitation RCT show?`,`High-intensity rehabilitation over 12 months improved FIM function in 68% against 32% [[Khan2011RCT]].`],
 [4,`When is the risk of depression highest after GBS?`,`In the first 3 months (hazard ratio 20.5). After 2 years it matched the general population [[Levison2023Depression]].`],
 [4,`How does GBS affect work?`,`3 to 6 years on, 38% of those with jobs had to change them [[Bernsen2002Work]].`],

 /* ---- Part 5: children, nursing, frontier ---- */
 [5,`How do children under 6 often present?`,`With pain, refusal to walk or irritability rather than weakness [[Leonhard2019]]. 68% of preschool children were first misdiagnosed in one series [[Roodbol2011]].`],
 [5,`How many children with GBS need ventilation?`,`About 1 in 5: 19% of 421 in European cohorts [[Roodbol2023]].`],
 [5,`Which feature strongly predicted ventilation in children in one Chinese cohort?`,`Autonomic dysfunction, odds ratio 70.4 [[Wu2016]].`],
 [5,`What did the German paediatric IVIg trial find about the 2-day regimen?`,`No difference in recovery, but more early transient deterioration than the 5-day regimen (5 of 23 against 0 of 23) [[Korinthenberg2005]].`],
 [5,`Does pregnancy raise the risk of GBS?`,`Not during pregnancy, but it rises after delivery: rate ratio 2.93 in the first 30 days [[Cheng1998]].`],
 [5,`Are IVIg and plasma exchange allowed in pregnancy?`,`Neither is contraindicated; IVIg might be preferred because plasma exchange needs more monitoring [[Leonhard2019]].`],
 [5,`Can a fully paralysed person with GBS hear?`,`Usually yes: consciousness, vision and hearing are intact, so bedside talk matters [[Leonhard2019]].`],
 [5,`What did severely affected people find hardest in the ICU?`,`Losing communication. 90% named contact with relatives as most helpful [[Weiss2002]].`],
 [5,`Why do venous clot rates vary so much between studies?`,`Method: 7% on clinical diagnosis, 52% on ultrasound screening, 9% in claims data [[Gaber2002,Ryabinkina2016,Wright2026]].`],
 [5,`What happened in the eculizumab trials?`,`Both JET-GBS and the phase 3 trial missed their primary endpoints, despite near-complete C5 blockade [[Misawa2018,Kuwabara2024]].`],
 [5,`Where do tanruprubart and eculizumab act?`,`Tanruprubart blocks C1q, the first step of the classical complement pathway; eculizumab blocks C5, the last step before the membrane attack complex [[Freiha2026]].`],
 [5,`What is the key limit of the tanruprubart phase 3 trial?`,`Its control arm had no IVIg or plasma exchange, so it compared drug with placebo, not with standard care [[Freiha2026,Wiegers2025]].`],
 [5,`How do imlifidase and efgartigimod lower IgG?`,`Imlifidase cleaves IgG; efgartigimod blocks FcRn so IgG is broken down faster. Neither has a randomised GBS result [[Freiha2026]].`],

 /* ---- Part 6: history ---- */
 [6,`What did Guillain, Barré and Strohl report in 1916?`,`Two soldiers with acute flaccid paralysis, high CSF protein and normal cell counts [[Guillain1916,Goodfellow2016,Waclawik2018]].`],
 [6,`Who described "ascending paralysis" in 1859?`,`Octave Landry, in ten patients [[Afifi1994]].`],
 [6,`What was André Strohl's contribution?`,`The myographic studies of tendon reflexes, an early step towards electrodiagnosis. Later papers dropped his name [[Waclawik2018,Afifi1994]].`],
 [6,`What did Waksman and Adams show in 1955?`,`Experimental allergic neuritis in rabbits, a model pointing to an immune cause [[Waksman1955,Afifi1994]].`],
 [6,`When were plasma exchange and IVIg proved?`,`Plasma exchange: first report 1978, US trial 1985 [[Brettle1978,GBSStudyGroup1985]]. IVIg: Dutch trial 1992 [[vanDerMeche1992]].`],
 [6,`Who proposed an acute axonal form, and when?`,`Feasby and colleagues in 1986: five quadriplegic people with inexcitable motor nerves [[Feasby1986]]. AMAN was named in 1993 [[McKhann1993]].`],
 [6,`What did the 1978 prednisolone trial conclude?`,`That steroid treatment is not beneficial and can be detrimental [[Hughes1978]].`]
];
/* the 20/30/40 rule, EGRIS and mEGOS are published names; every other phrase here is written for this guide */
const GBRV_MN=[
 ["20/30/40",1,`Vital capacity below <b>20</b> mL/kg, maximal inspiratory pressure below <b>30</b> cmH2O, maximal expiratory pressure below <b>40</b> cmH2O, or a fall of more than 30% in any of them [[Lawn2001]]. Played below.`],
 ["EGRIS",1,`A published ventilation risk score with three items: days from onset to admission, facial or bulbar weakness, and MRC sum score, 0 to 7 points [[Doets2022]]. A score of 5 or more carries about 65% risk of ventilation within a week [[Leonhard2019]].`],
 ["mEGOS",1,`A published walking-outcome score: age, preceding diarrhoea and MRC sum score, 0 to 9 at admission or 0 to 12 at day 7 [[Papri2022mEGOS,Busl2023]].`],
 ["Two weeks, four weeks",0,`The trial windows: IVIg started within <b>2</b> weeks of onset, plasma exchange within <b>4</b> weeks [[Leonhard2019,vanDoorn2023]]. Four weeks is also when nearly everyone has reached the nadir: 97% [[Fokke2014]].`],
 ["Point four for five",0,`IVIg as published: <b>0.4</b> g/kg a day for <b>5</b> days, 2 g/kg in total [[vanDoorn2023]].`],
 ["Eyes, balance, reflexes",0,`Miller Fisher syndrome: ophthalmoplegia (eyes), ataxia (balance) and areflexia (reflexes) [[Mori2001MFS]]. Its antibody, anti-GQ1b, is on the eye-movement nerves [[Chiba1993]].`],
 ["Myelin or node",0,`AIDP attacks the Schwann cell surface and <b>myelin</b>; AMAN attacks the axon membrane at the <b>node</b> of Ranvier [[HaferMacko1996AIDP,HaferMacko1996AMAN]].`],
 ["Over fifty, think again",0,`CSF with more than <b>50</b> cells/µl points away from GBS and prompts a search for another cause [[Leonhard2019,vanDoorn2023]].`],
 ["Eight weeks or three strikes",0,`Suspect acute-onset CIDP with worsening <b>8</b> weeks or more after onset, or <b>3</b> or more fluctuations [[Ruts2010,vanDoorn2023]].`],
 ["Two-thirds after the worst",0,`Up to <b>two-thirds</b> of deaths come in the recovery phase, after the weakest point, often after leaving intensive care [[Leonhard2019,vanDenBerg2013]].`]
];
/* the four tiles: the number, the measure, the rule as published, and the schematic start and end readings drawn */
const GBRV_RULE=[
 ['20','Vital capacity (VC)','below 20 mL/kg'],
 ['30','Inspiratory pressure (MIP)','below 30 cmH2O'],
 ['40','Expiratory pressure (MEP)','below 40 cmH2O'],
 ['30%','Any of the three','falls by more than 30%']
];
/* EAN/PNS vital capacity triggers, quoted as published */
const GBRV_FVC=[
 {v:20,t:'20 mL/kg or less',d:'consider elective ventilation'},
 {v:10,t:'10 mL/kg or less',d:'ventilation almost inevitable'}
];
const GBRV_HEAD=['20: vital capacity','30: breathing in','40: breathing out','Or a fall of more than 30%','The single breath count','EAN/PNS: vital capacity triggers'];
const GBRV_CAP=[
 ['Below 20 mL/kg flags a risk','of respiratory failure'],
 ['Below 30 cmH2O flags a risk',''],
 ['Below 40 cmH2O flags a risk',''],
 ['A 30% drop counts,','even above the lines'],
 ['Count aloud from 1','in a single breath'],
 ['Thresholds quoted as published,','never as instructions']
];
const GBRV_STEPS=[
 {from:0,at:.05,k:'20',t:'Vital capacity below 20 mL/kg',txt:`Vital capacity below 20 mL/kg flags a risk of respiratory failure [[Lawn2001]]. In a small serial study, vital capacity fell over the 48 hours before failure, and intubation came at 15.2 mL/kg on average, while people who were not intubated stayed above 40 mL/kg [[Chevrolet1991]].`,pt:'Vital capacity is the most air you can blow out after the deepest breath. When it drops below 20 for each kilogram of body weight, breathing may be about to fail.',hook:'20/30/40: VC below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30%. [[Lawn2001]]'},
 {from:1/6,at:1/6+.05,k:'30',t:'Inspiratory pressure below 30 cmH2O',txt:`A maximal inspiratory pressure below 30 cmH2O is the second flag [[Lawn2001]]. Breathing fails because both the breathing-in and breathing-out muscles weaken [[Orlikowski2004]].`,pt:'This measures how hard you can suck in. A weak pull means the breathing-in muscles, such as the diaphragm, are tiring.'},
 {from:2/6,at:2/6+.05,k:'40',t:'Expiratory pressure below 40 cmH2O',txt:`A maximal expiratory pressure below 40 cmH2O is the third [[Lawn2001]]. A poor cough and bulbar weakness lead to aspiration pneumonia and collapsed lung segments [[Orlikowski2004]]. Inability to cough had the highest odds ratio, 9.09, in the French model [[Sharshar2003]].`,pt:'This measures how hard you can blow out, which is what a cough needs. A weak cough cannot clear the chest.',hook:'Inability to cough carried the highest odds ratio for ventilation (9.09) in the French model. [[Sharshar2003]]'},
 {from:3/6,at:3/6+.05,k:'30%',t:'Or a fall of more than 30%',txt:`A fall of more than 30% in any of the three also counts [[Lawn2001]]. No clinical feature predicted the pattern of decline in that series, but serial testing found those at risk. The source was 114 consecutive ICU patients with severe GBS at one centre [[Lawn2001]].`,pt:'The trend matters as much as the number. A big drop is a warning even if the reading is still above the line.'},
 {from:4/6,at:4/6+.05,k:'Count',t:'The single breath count',txt:`Not being able to count to 15 in one breath is one sign of imminent respiratory insufficiency in the ten-steps guideline, which also gives a count of 19 or less as predicting ventilation [[Leonhard2019]]. The EAN/PNS guideline calls a count under 20 a useful bedside tool for ICU transfer [[vanDoorn2023]].`,pt:'Taking one deep breath and counting out loud is a quick bedside check. Signs of distress come late, and a person may not feel breathless at all, so the numbers are checked again and again [[Orlikowski2004,Leonhard2019]].',hook:'Respiratory failure in GBS can come without breathlessness: measure, do not wait for distress. [[Leonhard2019]]'},
 {from:5/6,at:5/6+.05,k:'Triggers',t:'What the 2023 guideline adds',txt:`EAN/PNS, as published: a fall of more than 30% in 24 hours likely means immediate ICU transfer, and a 50% fall in under 24 hours likely means ventilation. Elective ventilation is considered at a vital capacity of 20 mL/kg or less, and at 10 mL/kg or less it is almost inevitable [[vanDoorn2023]].`,pt:'These are the guideline\'s published triggers, quoted for learning. Anyone with GBS who has trouble breathing or swallowing needs emergency care [[Leonhard2019,vanDoorn2023]].',hook:'EAN/PNS: elective ventilation considered at FVC 20 mL/kg or less; almost inevitable at 10 mL/kg or less. [[vanDoorn2023]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(GBRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=GBRV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=GBRV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=GBRV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=GBRV_MN.map(m=>`<div class="card"><span class="tag ${m[1]?'good':'accent'}">${m[1]?'published name':'memory aid written for this guide'}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: the 20/30/40 rule ---- */
  const svg=$('#gbrvSvg'),rg=$('#gbrvT');
  const tx=(x,y,c,txt,st='',a='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${a?` text-anchor="${a}"`:''}${st?` style="${st}"`:''}>${txt}</text>`;
  /* schematic readings for each measure: start and end of the fall drawn in that phase (not data) */
  const RD=[[44,17],[72,25],[88,34]];
  /* how far each reading has fallen at time t, 0..1, so earlier tiles stay at their end value */
  const fallK=(k,p,u)=>k<p?1:k>p?0:ease(ramp(u,.05,.75));
  function draw(t){
    const N=vb(svg,'720 410','400 690');
    const p=phaseOf(GBRV_STEPS,t),u=clamp((t-GBRV_STEPS[p].from)*6);
    const L=N?{x:12,y:34,w:376,rh:43,th:37,ty:228}:{x:16,y:44,w:300,rh:56,th:48,ty:300};
    const R=N?{x:12,y:282,w:376,h:398}:{x:332,y:14,w:372,h:382};
    let s=tx(L.x,L.y-13,'rv-a','20/30/40: three numbers and a fall');
    let lit=0;
    GBRV_RULE.forEach(([n,word,rule],k)=>{
      const y=L.y+k*L.rh,hot=k===p,on=k<3?fallK(k,p,u)>.82||p>=4:(p>3||(p===3&&u>.6));
      if(on)lit++;
      s+=`<g style="opacity:${hot?1:on?.9:.55}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?15:17,cy=y+L.th/2;
      s+=`<circle cx="${L.x+cr+6}" cy="${cy}" r="${cr}" style="fill:var(${hot?'--brand':'--muted'})"/>`+tx(L.x+cr+6,cy+5,n.length>2?'rv-m':'rv-n',n,'','middle');
      const x2=L.x+cr*2+14;
      s+=tx(x2,y+(N?15:20),'rv-c',word,'font-weight:700')+tx(x2,y+(N?31:38),'rv-b',rule);
      s+=tx(L.x+L.w-10,cy+5,'rv-c',on?'flag':'',on?'font-weight:700;fill:var(--rx)':'','end');
      s+='</g>'});
    s+=tx(L.x,L.ty,'rv-b',`Flags raised so far: ${lit} of 4`);
    const bw=(L.w-3*8)/4;
    for(let k=0;k<4;k++){const on=k<lit;s+=`<rect x="${f1(L.x+k*(bw+8))}" y="${L.ty+8}" width="${f1(bw)}" height="22" rx="5" style="fill:var(${on?'--rx':'--panel-2'});stroke:var(--line)"/>`+tx(L.x+k*(bw+8)+bw/2,L.ty+24,on?'rv-m':'rv-b',GBRV_RULE[k][0],'','middle')}
    if(!N)s+=tx(L.x,L.ty+58,'rv-b','Any one flag counts. Readings drawn are schematic.')+tx(L.x,L.ty+76,'rv-b','The rule comes from one ICU series of 114 people.');
    /* explainer panel */
    const W=R.w,cx=W/2,H=R.h;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=tx(16,30,'rv-a',GBRV_HEAD[p]);
    const cp=GBRV_CAP[p];s+=tx(cx,H-(cp[1]?44:24),'rv-c',cp[0],'','middle')+(cp[1]?tx(cx,H-22,'rv-c',cp[1],'','middle'):'');
    if(p===0){
      const v=lerp(RD[0][0],RD[0][1],fallK(0,0,u)),on=v<20;
      const lg=lungs(18,78,1.15,{fill:clamp((v-8)/38),weak:on?1:clamp((32-v)/12)});
      s+=lg.svg+tx(18+lg.w/2,78+lg.h+30,'rv-c',`VC ${Math.round(v)} mL/kg`,'font-weight:700','middle');
      const mx=W-128,my=66,mh=210,mw=40,Y=val=>my+mh-mh*val/50;
      s+=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<rect x="${mx+3}" y="${f1(Y(v))}" width="${mw-6}" height="${f1(my+mh-3-Y(v))}" rx="4" style="fill:var(${on?'--rx':'--brand'});opacity:.8"/>`;
      [0,10,20,30,40,50].forEach(g=>{s+=`<line class="axis" x1="${mx+mw}" x2="${mx+mw+6}" y1="${f1(Y(g))}" y2="${f1(Y(g))}"/>`+tx(mx+mw+10,Y(g)+4,'rv-b',String(g),g===20?'font-weight:700;fill:var(--ink)':'')});
      s+=`<line x1="${mx-10}" x2="${mx+mw}" y1="${f1(Y(20))}" y2="${f1(Y(20))}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:5 3"/>`;
      s+=tx(mx+mw/2,my+mh+20,'rv-b','mL/kg','','middle');
      s+=tx(mx+mw/2,my-10,'rv-a',on?'flag':'','fill:var(--rx)','middle');
    }else if(p===1||p===2){
      const k=p,mx=k===1?80:100,thr=k===1?30:40,v=lerp(RD[k][0],RD[k][1],fallK(k,p,u)),on=v<thr,gy=212,gr=N?118:112;
      s+=gauge(cx,gy,gr,v,mx,{bands:[{to:thr,col:'var(--rx)'},{to:mx,col:'var(--panel-2)'}],big:true});
      s+=tx(cx,gy+32,'rv-b',k===1?'cmH2O, sucking in hard':'cmH2O, blowing out hard','','middle');
      s+=tx(cx,gy+52,'rv-b',`red arc: below ${thr}`,'','middle');
      s+=tx(cx,gy+80,'rv-a',on?'flag':'','fill:var(--rx)','middle');
      s+=tx(cx,72,'rv-b','schematic reading','','middle');
    }else if(p===3){
      const k=ease(ramp(u,.05,.85)),f=x=>1-.38*ease(clamp(x/.85));
      const c=curve(54,70,W-84,196,f,{upto:k,y0:.4,y1:1.05,col:'var(--brand)',dot:true,bands:[{from:.4,to:.7,col:'var(--rx)'}]});
      s+=c.svg;
      s+=tx(48,c.Y(1)+4,'rv-b','100%','','end')+tx(48,c.Y(.7)+4,'rv-b','70%','font-weight:700;fill:var(--ink)','end');
      s+=`<line x1="54" x2="${W-30}" y1="${f1(c.Y(.7))}" y2="${f1(c.Y(.7))}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:5 3"/>`;
      s+=kitLabel(62,c.Y(.47),'more than 30% down',{});
      s+=tx(54,286,'rv-b','share of the first reading, over days (schematic)');
      const cur2=f(k);s+=tx(W-30,62,'rv-c',`now ${Math.round(cur2*100)}%`,cur2<.7?'font-weight:700;fill:var(--rx)':'font-weight:700','end');
    }else if(p===4){
      const c=Math.max(1,Math.round(lerp(1,13,ease(ramp(u,.05,.8))))),n=20,x0=16,cw=(W-32)/n,cy=168;
      s+=person(46,58,86,'var(--brand)');
      const bx=96,by=60,bwid=W-bx-16;
      s+=`<path d="M${bx+10} ${by}H${bx+bwid-10}Q${bx+bwid} ${by} ${bx+bwid} ${by+10}V${by+46}Q${bx+bwid} ${by+56} ${bx+bwid-10} ${by+56}H${bx+22}L${bx+4} ${by+70}V${by+56}Q${bx} ${by+56} ${bx} ${by+46}V${by+10}Q${bx} ${by} ${bx+10} ${by}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
      s+=tx(bx+bwid/2,by+34,'rv-a',`"... ${c}"`,'','middle');
      for(let q=1;q<=n;q++){const x=x0+(q-1)*cw,on=q<=c,mark=q===15||q===20;
        s+=`<rect x="${f1(x+1)}" y="${cy}" width="${f1(cw-2)}" height="26" rx="4" style="fill:var(${on?'--brand':'--panel'});stroke:var(${mark?'--rx':'--line'});stroke-width:${mark?2:1}"/>`;
        s+=tx(x+cw/2,cy+17,on?'rv-m':'rv-q',String(q),'','middle')}
      const m15=x0+14.5*cw,m20=x0+19.5*cw;
      s+=`<line x1="${f1(m15)}" x2="${f1(m15)}" y1="${cy+28}" y2="${cy+52}" style="stroke:var(--rx);stroke-width:1.6"/><line x1="${f1(m20)}" x2="${f1(m20)}" y1="${cy+28}" y2="${cy+92}" style="stroke:var(--rx);stroke-width:1.6"/>`;
      s+=tx(m15-6,cy+66,'rv-c','Cannot reach 15:','font-weight:700','end')+tx(m15-6,cy+82,'rv-b','imminent failure (ten steps)','','end');
      s+=tx(m20-6,cy+106,'rv-c','Under 20:','font-weight:700','end')+tx(m20-6,cy+122,'rv-b','ICU-transfer tool (EAN/PNS)','','end');
    }else{
      const x0=28,x1=W-28,ay=96,X=v=>x0+(x1-x0)*(40-v)/40,v=lerp(36,8,ease(ramp(u,.05,.85)));
      s+=`<rect x="${f1(X(20))}" y="${ay-10}" width="${f1(X(0)-X(20))}" height="20" rx="4" style="fill:var(--rx-soft);stroke:var(--rx)"/>`;
      s+=`<line class="axis" x1="${x0}" y1="${ay}" x2="${x1}" y2="${ay}"/>`;
      [40,30,20,10,0].forEach(g=>{s+=`<line class="axis" x1="${f1(X(g))}" y1="${ay-6}" x2="${f1(X(g))}" y2="${ay+6}"/>`+tx(X(g),ay+28,'rv-b',String(g),g===20||g===10?'font-weight:700;fill:var(--ink)':'','middle')});
      s+=tx(cx,ay+48,'rv-b','vital capacity, mL/kg (falling to the right)','','middle');
      s+=`<circle cx="${f1(X(v))}" cy="${ay}" r="8" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`+tx(X(v),ay-18,'rv-c',`${Math.round(v)}`,'font-weight:700','middle');
      GBRV_FVC.forEach((r,j)=>{const y=164+j*50,hit=v<=r.v;
        s+=`<rect x="16" y="${y}" width="${W-32}" height="42" rx="8" style="fill:var(${hit?'--rx-soft':'--panel'});stroke:var(${hit?'--rx':'--line'});stroke-width:${hit?1.8:1}"/>`;
        s+=tx(28,y+18,'rv-c',r.t,'font-weight:700')+tx(28,y+34,'rv-b',r.d)});
      s+=tx(16,282,'rv-b','Also: a fall of more than 30% in 24 hours')+tx(16,298,'rv-b','likely means immediate ICU transfer.');
    }
    s+='</g>';svg.innerHTML=s;
    setSt(p);$('#gbrvNote').innerHTML=noteHTML(GBRV_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${GBRV_STEPS[p].k}: ${GBRV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#gbrvPlay'),draw,26000,'%t:player.replay%','review');
  const setSt=stepWire($('#gbrvSteps'),GBRV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
/* [part, question, options, index of the right option, cited explanation] */
const GBQZ_Q=[
 /* Part 1 */
 [1,`The EAN/PNS guideline describes GBS as an acute:`,[`Myopathy`,`Polyradiculoneuropathy`,`Myelopathy`,`Encephalitis`],1,`"An acute polyradiculoneuropathy", affecting nerve roots and peripheral nerves [[vanDoorn2023]].`],
 [1,`Worldwide, GBS is the commonest cause of:`,[`Acute flaccid paralysis`,`Stroke in the young`,`Chronic neuropathy`,`Spinal cord compression`],0,`It is described as the commonest cause of acute flaccid paralysis worldwide [[Shahrizaila2021]].`],
 [1,`In the Western meta-analysis, GBS incidence rises with each 10 years of age by about:`,[`2%`,`50%`,`20%`,`It falls with age`],2,`20% per decade, from 0.62 at 0-9 years to 2.66 at 80-89 years per 100,000 person-years [[Sejvar2011]].`],
 [1,`What share of people with GBS need mechanical ventilation, by the consensus guideline?`,[`About 2%`,`About 20%`,`About 50%`,`About 75%`],1,`About 20%, up to 22% in the first week of admission [[Leonhard2019]].`],
 [1,`In the Dutch cohort, most deaths came in which phase?`,[`Progressive`,`Plateau`,`Recovery`,`Before admission`],2,`67% were in the recovery phase, 20% progressive and 13% plateau [[vanDenBerg2013]].`],
 [1,`In the Dhaka cohort, the strongest risk factor for death was:`,[`Female sex`,`Pure motor variant`,`Age under 20`,`No ventilator when one was needed`],3,`Hazard ratio 11.9 [[Ishaque2017]].`],
 [1,`In AMAN, antibodies and complement bind mainly to:`,[`The axon membrane at the node of Ranvier`,`The Schwann cell surface`,`Muscle fibres`,`The spinal cord`],0,`IgG and C3d were bound to the motor axolemma, most often at the node [[HaferMacko1996AMAN]].`],
 [1,`In IGOS, which subtype was commonest in every region, including Bangladesh?`,[`Axonal`,`Demyelinating`,`Inexcitable`,`Equivocal`],1,`Demyelinating: 55% in Europe/Americas, 45% in Asia and 40% in Bangladesh [[Doets2018]].`],
 [1,`The axonal share in Bangladesh in IGOS was about:`,[`6%`,`90%`,`36%`,`1%`],2,`36%, against 6% in Europe/Americas [[Doets2018]].`],
 [1,`Reversible conduction failure is best described as:`,[`Permanent axon loss`,`Slow remyelination over months`,`A block that resolves fast without signs of remyelination`,`A muscle disease`],2,`Fast resolution without remyelinating slow components [[Kuwabara1998GM1,Kokubun2010]].`],
 [1,`Median time to walk 5 m with help in AMAN against AIDP in northern China was:`,[`31 against 32 days`,`90 against 30 days`,`1 year against 1 month`,`7 against 70 days`],0,`About the same: 31 and 32 days [[Ho1997Recovery]].`],
 [1,`The Miller Fisher syndrome triad is:`,[`Fever, rash, headache`,`Ophthalmoplegia, ataxia, areflexia`,`Weakness, sensory level, incontinence`,`Ptosis, dysphagia, hyperreflexia`],1,`Ophthalmoplegia, ataxia and areflexia [[Mori2001MFS]].`],
 [1,`In 60 people with Fisher syndrome, overlap with other forms began within:`,[`7 days`,`4 weeks`,`3 months`,`It never overlapped`],0,`Every overlap occurred within 7 days, so monitoring for at least a week is advised [[Sekiguchi2016,Verboon2017MFS]].`],
 [1,`Bickerstaff brainstem encephalitis adds which feature to ophthalmoplegia and ataxia?`,[`Sural sparing`,`Pure sensory loss`,`Disturbed consciousness or hyperreflexia`,`Fever above 40 °C`],2,`Disturbed consciousness or hyperreflexia [[Odaka2003]].`],
 [1,`In 494 Dutch adults, what share had reached the nadir within 4 weeks?`,[`50%`,`80%`,`65%`,`97%`],3,`80% by 2 weeks, 97% by 4 weeks, all by 6 weeks [[Fokke2014]].`],
 [1,`The pharyngeal-cervical-brachial variant is most linked to IgG against:`,[`GT1a`,`Acetylcholine receptor`,`Aquaporin-4`,`NMDA receptor`],0,`Anti-GT1a IgG in 51% of 100 people [[Nagashima2007]].`],
 /* Part 2 */
 [2,`Which pair is required by the NINDS criteria, as adapted?`,[`Fever and rash`,`Progressive bilateral limb weakness and reduced reflexes`,`Raised CSF cells and a sensory level`,`Ptosis and diplopia`],1,`Progressive bilateral weakness and absent or decreased reflexes in affected limbs [[Leonhard2019]].`],
 [2,`Which makes GBS doubtful?`,[`Pain before weakness`,`Bilateral facial palsy`,`A nadir reached within 24 hours`,`Raised CSF protein`],2,`A nadir under 24 hours, or progression beyond 4 weeks [[Leonhard2019]].`],
 [2,`Normal or brisk reflexes occur in about what share of people with GBS?`,[`None`,`10%`,`50%`,`90%`],1,`About 10%, mostly with pure motor AMAN [[Yuki2012JNeurol]].`],
 [2,`Pain came before weakness in about what share in the Dutch prospective study?`,[`5%`,`36%`,`80%`,`100%`],1,`36% in the 2 weeks before weakness; 66% in the acute phase [[Ruts2010Pain]].`],
 [2,`Brighton level 1 needs:`,[`Clinical features only`,`A positive antibody test`,`Both CSF and nerve conduction support`,`Brain MRI`],2,`Level 1 adds CSF and nerve conduction support; level 3 is clinical only [[LopezHernandez2022]].`],
 [2,`A normal CSF protein in week 1:`,[`Excludes GBS`,`Does not exclude GBS`,`Proves Miller Fisher syndrome`,`Means the sample was wrong`],1,`About 50% are raised within 3 days and 84% after 7 days [[Doets2018]].`],
 [2,`A CSF white cell count above which level should prompt a search for another diagnosis?`,[`5 cells/µl`,`1 cell/µl`,`500 cells/µl`,`50 cells/µl`],3,`More than 50 cells/µl [[Leonhard2019,vanDoorn2023]].`],
 [2,`In 2,627 samples with raised protein and few cells, a diagnosis explained it in:`,[`57%`,`100%`,`5%`,`99%`],0,`57%, so albuminocytological dissociation is not specific [[Brooks2019]].`],
 [2,`In suspected Miller Fisher syndrome, which antibody is requested?`,[`Anti-AChR`,`Anti-GM1`,`Anti-GQ1b`,`Anti-MOG`],2,`Anti-GQ1b, with sensitivity of 88-100% [[vanDoorn2023]].`],
 [2,`Should treatment wait for anti-ganglioside antibody results?`,[`Yes, always`,`No`,`Only in children`,`Only for plasma exchange`],1,`Do not wait for antibody results before treating [[Leonhard2019]].`],
 [2,`In the first week, the commonest abnormal nerve conduction finding was:`,[`Conduction block`,`Slowed velocity`,`Absent H reflex`,`Normal study`],2,`Absent H reflex 97%, abnormal F waves 84%, conduction block only 13% [[Gordon2001]].`],
 [2,`The sural sparing pattern is:`,[`Sensitive but not specific`,`Specific but not sensitive`,`Neither`,`Only seen in AMAN`],1,`Specificity about 0.9, sensitivity about 0.3 to 0.4 [[Derksen2014]].`],
 [2,`Applied to the same IGOS studies, Hadden and Rajabally criteria:`,[`Agree completely`,`Give very different axonal shares`,`Cannot be compared`,`Both find no axonal cases`],1,`Axonal 9.8% by Hadden and 30.0% by Rajabally; they agreed in 68.3% [[Arends2024]].`],
 [2,`Botulism differs from GBS because it usually:`,[`Ascends from the feet`,`Causes high fever`,`Descends from the cranial nerves in an alert person`,`Raises CSF cells above 500`],2,`Descending paralysis, afebrile in 99%, with alertness kept [[Rao2021]].`],
 [2,`Before finalising a GBS diagnosis, one expert advises searching the body for:`,[`A tick`,`A rash`,`Needle marks`,`Lymph nodes`],0,`Tick paralysis improves rapidly after removal [[Edlow2010]].`],
 [2,`Abdominal pain, psychological features and neuropathy should prompt testing for:`,[`Thyroid antibodies`,`Urinary porphobilinogen`,`Blood cultures`,`Lyme serology only`],1,`Acute porphyria is confirmed by a markedly raised urinary porphobilinogen [[Albers2004,Anderson2005]].`],
 [2,`Asymmetric flaccid weakness with fever and marked pleocytosis suggests:`,[`Classic GBS`,`Miller Fisher syndrome`,`Functional weakness`,`An anterior horn cell infection such as West Nile virus`],3,`Fever in 91% and median CSF white cells 108/mm³ in West Nile paralysis [[Sejvar2005]].`],
 [2,`A-CIDP is suspected after worsening at or beyond:`,[`8 weeks from onset`,`3 days from onset`,`1 year from onset`,`2 weeks from onset`],0,`8 weeks or more, or 3 or more fluctuations [[Ruts2010,vanDoorn2023]].`],
 /* Part 3 */
 [3,`In the 20/30/40 rule, the "20" refers to:`,[`Breaths per minute`,`Vital capacity in mL/kg`,`Days from onset`,`MRC sum score`],1,`VC below 20 mL/kg; MIP below 30 and MEP below 40 cmH2O [[Lawn2001]].`],
 [3,`Why is breathing measured even when the person does not feel breathless?`,[`Breathlessness can be absent and distress signs come late`,`To prove the diagnosis`,`Because it predicts walking`,`Because it is quicker than asking`],0,`Respiratory failure can occur without breathlessness [[Leonhard2019,Orlikowski2004]].`],
 [3,`EGRIS scores which three items?`,[`Age, diarrhoea, disability score`,`Onset-to-admission days, facial or bulbar weakness, MRC sum score`,`CSF protein, cells, glucose`,`Heart rate, blood pressure, sodium`],1,`Range 0 to 7 [[Doets2022]].`],
 [3,`An EGRIS of 5 or more carries about what risk of ventilation within a week?`,[`4%`,`24%`,`99%`,`65%`],3,`0-2: 4%, 3-4: 24%, 5 or more: 65% [[Leonhard2019]].`],
 [3,`In the French model, the single sign with the highest odds ratio for ventilation was:`,[`Cannot stand`,`Raised liver enzymes`,`Cannot cough`,`Cannot lift elbows`],2,`Odds ratio 9.09 [[Sharshar2003]].`],
 [3,`The published IVIg regimen for GBS is:`,[`2 g/kg as one 1-hour dose`,`0.4 g/kg/day for 5 days`,`1 g/kg weekly for a year`,`0.1 g/kg/day for 20 days`],1,`0.4 g/kg/day for 5 days, 2 g/kg in total [[vanDoorn2023]].`],
 [3,`In trials, IVIg was started within ___ and plasma exchange within ___ of onset.`,[`4 weeks; 2 weeks`,`2 days; 2 weeks`,`2 weeks; 4 weeks`,`6 months; 1 year`],2,`IVIg within 2 weeks; plasma exchange within 4 weeks [[Leonhard2019,vanDoorn2023]].`],
 [3,`IVIg against plasma exchange, by Cochrane and the guideline:`,[`IVIg clearly better`,`Plasma exchange clearly better`,`Equally effective`,`Neither works`],2,`Equally effective; the choice is driven by access and the person's circumstances [[vanDoorn2023,Hughes2014]].`],
 [3,`Plasma exchange against supportive care: risk ratio for needing ventilation?`,[`0.53`,`1.64`,`2.89`,`1.00`],0,`0.53 (95% CI 0.39-0.74) [[Chevret2017]].`],
 [3,`In ventilated people in the 1997 French trial, six exchanges compared with four were:`,[`Much better`,`No better`,`Harmful to everyone`,`Never tested`],1,`Six were no better than four [[FrenchCooperative1997]].`],
 [3,`Corticosteroids alone in GBS:`,[`Speed recovery`,`Do not help, and oral steroids may delay recovery`,`Prevent recurrence`,`Replace IVIg`],1,`Cochrane, six trials and 587 participants [[Hughes2016]].`],
 [3,`Plasma exchange followed straight away by IVIg:`,[`Doubles the benefit`,`Adds no significant benefit`,`Is recommended for everyone`,`Is the zipper method`],1,`No significant advantage in the 1997 trial [[PSGBS1997,Hughes2014]].`],
 [3,`In SID-GBS, a second IVIg course for a poor prognosis gave:`,[`Faster walking`,`No benefit and more serious adverse events`,`Fewer deaths`,`Cure in half`],1,`Serious adverse events 35% against 16% [[Walgaard2021]].`],
 [3,`Treatment-related fluctuations affect about:`,[`50%`,`0.1%`,`6-10%`,`30%`],2,`6 to 10%, within 2 months of treatment [[Leonhard2019]].`],
 [3,`The IVIg class boxed warning covers:`,[`Thrombosis and kidney failure`,`Hair loss`,`Hearing loss`,`Liver failure`],0,`Thrombosis, renal dysfunction and acute renal failure [[FDA-Bivigam]].`],
 [3,`In ventilated people, bradycardia episodes were preceded by a daily systolic range above:`,[`20 mmHg`,`200 mmHg`,`5 mmHg`,`85 mmHg`],3,`Above 85 mmHg in all but one person [[Pfeiffer1999]].`],
 [3,`Succinylcholine is a concern after GBS because of:`,[`Hypoglycaemia`,`Hyperkalaemic cardiac arrest`,`Seizures`,`Allergy to eggs`],1,`Severe hyperkalaemia after denervation [[FDA-Quelicin,Feldman1990]].`],
 [3,`Unable to lift the arms at 1 week of ventilation: chance of 14 days or more on the ventilator?`,[`87%`,`10%`,`50%`,`2%`],0,`87%, rising to 96% with axonal or inexcitable nerves [[Walgaard2017]].`],
 [3,`Early tracheostomy in a Japanese national cohort:`,[`Halved mortality`,`Did not lower mortality`,`Doubled mortality`,`Was never done`],1,`Risk difference 0.4% for in-hospital mortality [[Yonezawa2020]].`],
 [3,`Methylprednisolone for pain in GBS:`,[`Prevents pain`,`Is first-line`,`Did not reduce pain`,`Was never studied`],2,`No difference in developing pain (RR 0.89) [[Liu2015]].`],
 [3,`Hallucinations in GBS are linked to:`,[`Brain tumours`,`Autonomic dysfunction and REM sleep abnormality`,`Low IQ`,`Plasma exchange only`],1,`Risk factors included autonomic dysfunction and ventilation [[Cochen2005]].`],
 /* Part 4 */
 [4,`About what share walk independently 6 months after GBS?`,[`20%`,`50%`,`80%`,`100%`],2,`About 80%; about 20% cannot, despite treatment [[Leonhard2019,vanDoorn2008]].`],
 [4,`EGOS and mEGOS predict:`,[`Death`,`Need for ventilation`,`Recurrence`,`Inability to walk unaided`],3,`Their endpoint is inability to walk unaided [[vanKoningsveld2007,Walgaard2011]].`],
 [4,`Which is NOT an mEGOS input?`,[`Age`,`Preceding diarrhoea`,`CSF protein`,`MRC sum score`],2,`Age, preceding diarrhoea and MRC sum score [[Papri2022mEGOS,Busl2023]].`],
 [4,`mEGOS discriminates best when scored:`,[`At admission`,`At day 7`,`At 1 year`,`Before symptoms`],1,`AUC 0.84-0.87 at day 7 against 0.73-0.77 at admission [[Walgaard2011]].`],
 [4,`In a 20-year ICU series, what share of ventilated survivors walked independently?`,[`79%`,`9%`,`29%`,`100%`],0,`79% [[Fletcher2000]].`],
 [4,`In 281 trial patients, high serum neurofilament light early was linked to:`,[`Better walking`,`Poorer walking outcome`,`More breathing failure`,`Nothing`],1,`It predicted inability to walk, but not respiratory failure [[vanTilburg2024,Thomma2025]].`],
 [4,`Fatigue after GBS:`,[`Is rare`,`Is explained by weakness`,`Is found in 60-80% and not explained by weakness`,`Is cured by amantadine`],2,`60-80% [[Leonhard2019]]; amantadine was not better than placebo [[Garssen2006Amantadine]].`],
 [4,`The largest rehabilitation RCT (79 people) found that high-intensity rehabilitation improved function in:`,[`68% against 32%`,`5% against 4%`,`100% against 0%`,`32% against 68%`],0,`FIM function over 12 months [[Khan2011RCT]].`],
 [4,`In the Danish study, the risk of depression after GBS was highest:`,[`After 10 years`,`In the first 3 months`,`Only in children`,`It was never raised`],1,`Hazard ratio 20.5 in the first 3 months; normal after 2 years [[Levison2023Depression]].`],
 [4,`3 to 6 years after GBS, what share of people with jobs had to change them?`,[`3%`,`38%`,`90%`,`None`],1,`38% [[Bernsen2002Work]].`],
 [4,`Recurrent GBS is more common in:`,[`Older people`,`Younger people and Miller Fisher syndrome`,`People treated with IVIg`,`Nobody: it never recurs`],1,`Mean age 34.2 against 46.9 years [[Kuitwaard2009JNNP]].`],
 [4,`Heterotopic ossification in a rehabilitation cohort affected:`,[`6%`,`60%`,`0%`,`96%`],0,`4 of 65, all with reduced hip movement [[Zeilig2006]].`],
 /* Part 5 */
 [5,`Preschool children with GBS were first misdiagnosed in about:`,[`68%`,`5%`,`21%`,`100%`],0,`68% against 21% of older children [[Roodbol2011]].`],
 [5,`About what share of children with GBS in European cohorts needed ventilation?`,[`1%`,`19%`,`50%`,`90%`],1,`79 of 421 (19%) [[Roodbol2023]].`],
 [5,`In the German paediatric trial, the 2-day IVIg regimen caused more:`,[`Deaths`,`Early transient deterioration`,`Kidney failure`,`Recurrence`],1,`5 of 23 against 0 of 23 [[Korinthenberg2005]].`],
 [5,`GBS risk around pregnancy is highest:`,[`In the first trimester`,`Throughout pregnancy`,`In the first 30 days after delivery`,`It is unchanged`],2,`Rate ratio 2.93 in the first 30 days postpartum [[Cheng1998]].`],
 [5,`A fully paralysed person with GBS:`,[`Usually cannot hear`,`Is usually unconscious`,`Usually hears and sees normally`,`Cannot feel pain`],2,`Consciousness, vision and hearing are usually intact [[Leonhard2019]].`],
 [5,`What did 49 severely affected people find hardest in intensive care?`,[`The food`,`Losing communication`,`Noise`,`Visiting hours`],1,`Loss of communication; 90% found contact with relatives most helpful [[Weiss2002]].`],
 [5,`Urinary dysfunction is commoner in:`,[`AMAN`,`AIDP`,`Miller Fisher syndrome only`,`Neither`],1,`39% in AIDP against 19% in AMAN [[Sakakibara2009]].`],
 [5,`Eculizumab in GBS trials:`,[`Met its endpoints`,`Missed its primary endpoints`,`Was never tested`,`Is now first-line`],1,`JET-GBS and the phase 3 trial both missed [[Misawa2018,Kuwabara2024]].`],
 [5,`Tanruprubart blocks:`,[`C5`,`FcRn`,`C1q`,`IgG cleavage`],2,`C1q, the first step of the classical pathway [[Freiha2026]].`],
 [5,`The tanruprubart phase 3 control arm received:`,[`IVIg`,`Plasma exchange`,`Eculizumab`,`Placebo, without IVIg or plasma exchange`],3,`So it cannot show how the drug compares with standard care [[Freiha2026,Wiegers2025]].`],
 /* Part 6 */
 [6,`Guillain, Barré and Strohl's 1916 report described:`,[`Two soldiers with paralysis, high CSF protein and normal cells`,`A vaccine reaction`,`A brain tumour`,`Polio in children`],0,`Two French soldiers [[Guillain1916,Goodfellow2016,Waclawik2018]].`],
 [6,`Who described "ascending paralysis" in 1859?`,[`Miller Fisher`,`Octave Landry`,`Guillain`,`Bickerstaff`],1,`Landry, in ten patients [[Afifi1994]].`],
 [6,`The 1955 experimental allergic neuritis model, by Waksman and Adams, pointed to:`,[`A genetic cause`,`A toxic cause`,`An immune cause`,`A vascular cause`],2,`An immune cause [[Waksman1955,Afifi1994]].`],
 [6,`IVIg was first shown at least as effective as plasma exchange in:`,[`1916`,`1955`,`1978`,`1992`],3,`The Dutch trial of 150 people [[vanDerMeche1992]].`],
 [6,`An acute axonal form of GBS was proposed by Feasby and colleagues in:`,[`1986`,`1916`,`2012`,`1859`],0,`Five quadriplegic people with inexcitable motor nerves [[Feasby1986]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(GBRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=GBQZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${GBRV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
/* [term, cited definition, module id] */
const GBGL_T=[
 ["20/30/40 rule",`Risk of respiratory failure with vital capacity below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% [[Lawn2001]].`,"breathing"],
 ["A-CIDP (acute-onset CIDP)",`Chronic inflammatory demyelinating polyradiculoneuropathy that starts like GBS. Suspected with worsening 8 weeks or more after onset or 3 or more fluctuations; about 5% of people first diagnosed with GBS [[Ruts2010,vanDoorn2023]].`,"whatnot"],
 ["A waves",`Late motor responses of identical latency and shape. Multiple A waves were seen in 13 of 14 people in the first week [[Kornhuber1999]].`,"ncs"],
 ["Acute flaccid myelitis",`An anterior horn cell disease of children. Against GBS: faster nadir (3 against 8 days), asymmetric weakness and cord lesions on MRI [[Helfferich2022]].`,"ddx"],
 ["Acute flaccid paralysis (AFP)",`Sudden floppy weakness. GBS is its commonest cause worldwide [[Shahrizaila2021]], and AFP surveillance, built for polio, covers children under 15 [[Papri2021]].`,"what"],
 ["Adynamic ileus",`A paralysed bowel. 15% of 114 people with severe GBS; only some cases were autonomic, others followed ventilation, surgery or rising opioid doses [[Burns2001]].`,"autonomic"],
 ["AIDP",`Acute inflammatory demyelinating polyradiculoneuropathy. Complement lies along the outer Schwann cell surface, and macrophages strip myelin [[HaferMacko1996AIDP]].`,"subtypes"],
 ["Albumin replacement",`The replacement fluid favoured over fresh frozen plasma in plasma exchange, after the French trial found more complications with plasma [[FrenchPE1987]].`,"plex"],
 ["Albuminocytological dissociation",`Raised CSF protein with a normal cell count, first reported in 1916 [[Goodfellow2016]]. Not specific: a diagnosis explained raised protein in only 57% of 2,627 samples [[Brooks2019]].`,"csf"],
 ["Amantadine",`A drug tried for fatigue after GBS. It was not better than placebo in a crossover RCT of 80 people [[Garssen2006Amantadine]].`,"after"],
 ["AMAN",`Acute motor axonal neuropathy. IgG and complement bind the motor axon membrane, mostly at the node of Ranvier, with little demyelination [[HaferMacko1996AMAN]]. Named in 1993 [[McKhann1993]].`,"subtypes"],
 ["AMSAN",`Acute motor and sensory axonal neuropathy: Wallerian-like degeneration of motor and sensory fibres, the severe end of the axonal spectrum [[Griffin1996AMSAN]].`,"subtypes"],
 ["Anti-ganglioside antibodies",`Antibodies against nerve gangliosides. Routine testing is not advised in typical motor-sensory GBS; a negative result does not exclude GBS [[vanDoorn2023,Leonhard2019]].`,"csf"],
 ["Anti-GM1",`An antibody linked to AMAN. IgG anti-GM1 sensitivity for all GBS ranges 20-69%, with specificity 94-98% [[vanDoorn2023]].`,"csf"],
 ["Anti-GQ1b",`The Miller Fisher syndrome antibody, cross-reacting with GT1a [[Chiba1993]]. Sensitivity 88-100% [[vanDoorn2023]].`,"mfs"],
 ["Anti-GT1a",`The antibody most linked to pharyngeal-cervical-brachial weakness: 51% of 100 people [[Nagashima2007]].`,"mfs"],
 ["Areflexia",`Absent tendon reflexes. Reduced in paretic limbs in 91% at first and in all during follow-up in a Dutch cohort [[Fokke2014]].`,"signs"],
 ["Autonomic dysfunction (dysautonomia)",`Unstable blood pressure and heart rate, pupil changes, and bowel or bladder dysfunction [[Leonhard2019]]. 25% at entry in IGOS [[Doets2018]].`,"autonomic"],
 ["Axolemma",`The axon's outer membrane. In AMAN it is the site where IgG and complement bind [[HaferMacko1996AMAN]].`,"subtypes"],
 ["Bickerstaff brainstem encephalitis",`Ophthalmoplegia and ataxia with disturbed consciousness or hyperreflexia; anti-GQ1b in 66% [[Odaka2003]].`,"mfs"],
 ["Bifacial weakness with paraesthesias",`A localised GBS variant, under 5% of the spectrum, which does not meet commonly used criteria [[Leonhard2019,Wakerley2014]].`,"mfs"],
 ["Botulism",`A mimic with descending paralysis from the cranial nerves, afebrile in 99%, in an alert person [[Rao2021]].`,"ddx"],
 ["Brighton criteria",`Levels of diagnostic certainty, 1 to 4, first written for vaccine safety data [[Sejvar2011Brighton]]. Level 1 needs CSF and nerve conduction support; level 3 is clinical only [[LopezHernandez2022]].`,"criteria"],
 ["Bulbar weakness",`Weakness of swallowing and speech muscles. Odds ratio 9.0 for ventilation in a meta-analysis [[Green2018]].`,"breathing"],
 ["C1q",`The first protein of the classical complement pathway, the target of tanruprubart [[Freiha2026]].`,"frontier"],
 ["C5",`A late complement protein, the target of eculizumab; blocking it did not improve function in trials [[Kuwabara2024]].`,"frontier"],
 ["Carbamazepine",`An anticonvulsant used for neuropathic pain. EAN/PNS weakly recommends it after gabapentinoids or tricyclics [[vanDoorn2023]].`,"icu"],
 ["Cauda equina enhancement",`Contrast uptake by lumbar nerve roots on MRI, often anterior; sensitive but not specific [[Gorson1996,Byun1998,Leonhard2019]].`,"ncs"],
 ["CMAP (compound muscle action potential)",`The muscle response to nerve stimulation. A distal CMAP of 0-20% of the lower limit of normal predicted poor outcome [[Cornblath1988]].`,"ncs"],
 ["Complement",`An immune protein cascade that punches pores in membranes. Complement products were found on the axon in AMAN and on the Schwann cell in AIDP [[HaferMacko1996AMAN,HaferMacko1996AIDP]].`,"frontier"],
 ["Conduction block",`Failure of an impulse to pass a nerve segment. It can be axonal in mechanism, so it does not prove AIDP [[Kokubun2010,Uncini2010]].`,"ncs"],
 ["Corticosteroids",`Steroid drugs. Alone they do not help GBS, and oral steroids may delay recovery [[Hughes2016]].`,"whatnot"],
 ["CSF (cerebrospinal fluid)",`The fluid around the brain and spinal cord, sampled by lumbar puncture. Raised protein in 49% on day 1 and 88% after 2 weeks [[Fokke2014]].`,"csf"],
 ["Demyelination",`Loss of the myelin sheath. The pattern of AIDP, still the commonest subtype in all IGOS regions [[Doets2018]].`,"subtypes"],
 ["Diaphragm",`The main breathing-in muscle. Breathing fails as both inspiratory and expiratory muscles weaken [[Orlikowski2004]].`,"breathing"],
 ["Dysphagia",`Difficulty swallowing. Swallowing impairment was found in over 80% early after ICU admission, often not clinically obvious [[Ogna2017]].`,"nursing"],
 ["EAN/PNS guideline",`The 2023 evidence-graded GBS guideline of the European Academy of Neurology and Peripheral Nerve Society [[vanDoorn2023]].`,"ivig"],
 ["Eculizumab",`An anti-C5 antibody. It missed its primary endpoint in JET-GBS and in a 57-person phase 3 trial [[Misawa2018,Kuwabara2024]].`,"frontier"],
 ["Efgartigimod",`An FcRn blocker that speeds IgG breakdown. No randomised GBS result yet [[Freiha2026]].`,"frontier"],
 ["EGOS",`A score of age, preceding diarrhoea and disability at 2 weeks, 1 to 7, predicting inability to walk at 6 months [[vanKoningsveld2007]].`,"prognosis"],
 ["EGRIS",`A ventilation risk score: onset-to-admission days, facial or bulbar weakness, MRC sum score; 0 to 7 [[Doets2022]]. 5 or more means about 65% risk in a week [[Leonhard2019]].`,"breathing"],
 ["Electrodiagnosis",`Nerve conduction and related studies. Not required for diagnosis but recommended where possible [[Leonhard2019]].`,"ncs"],
 ["Experimental allergic neuritis",`An animal model of immune nerve inflammation, made by Waksman and Adams in 1955 [[Waksman1955]].`,"history"],
 ["F wave",`A late motor response that travels up to the spinal cord and back. Abnormal in 84% in the first week [[Gordon2001]].`,"ncs"],
 ["Fatigue",`Tiredness found in 60-80% after GBS, not explained by residual weakness [[Leonhard2019]].`,"after"],
 ["FcRn (neonatal Fc receptor)",`A receptor that recycles IgG. Blocking it, as efgartigimod does, speeds IgG breakdown [[Freiha2026]].`,"frontier"],
 ["Fluctuation (treatment-related)",`Worsening within 2 months after first improving or stabilising on treatment, in 6-10% [[Leonhard2019]].`,"whatnot"],
 ["FVC (forced vital capacity)",`The air blown out forcefully after a full breath. EAN/PNS: elective ventilation is considered at 20 mL/kg or less [[vanDoorn2023]].`,"breathing"],
 ["Gabapentin",`A drug for neuropathic pain. In 18 ventilated people, pain fell from 7.22 to 2.33 on day 2 against placebo [[Pandey2002]].`,"icu"],
 ["Ganglioside",`A sugar-bearing lipid on nerve membranes, the target of anti-ganglioside antibodies. Anti-GQ1b stained the paranodes of eye-movement nerves [[Chiba1993]].`,"subtypes"],
 ["GBS disability score",`A 0 (no disability) to 6 (death) scale [[vanTilburg2024]]. A score above 2 defines being unable to walk independently [[Papri2022mEGOS]].`,"prognosis"],
 ["GBS|CIDP Foundation International",`The international patient association for GBS, offering support, education, research funding and advocacy [[Leonhard2019]].`,"after"],
 ["Guillain-Barré syndrome",`An acute, usually monophasic, immune-mediated polyradiculoneuropathy [[vanDoorn2023,Shahrizaila2021]]. Also written Guillain-Barre, without the accent.`,"what"],
 ["H reflex",`A spinal reflex recorded electrically. Absent in 97% in the first week [[Gordon2001]]; present H reflexes make GBS less likely [[vanDoorn2023]].`,"ncs"],
 ["Hadden criteria",`Nerve conduction criteria for subtypes, needing a feature in at least two nerves [[Arends2024]].`,"ncs"],
 ["Hallucinations",`Vivid, often hypnagogic experiences in 31% of 139 people, linked to autonomic dysfunction and REM sleep change [[Cochen2005]].`,"nursing"],
 ["Heterotopic ossification",`Bone forming in soft tissue. 4 of 65 people (6%) in rehabilitation, all with reduced hip movement [[Zeilig2006]].`,"rehab"],
 ["Hyponatraemia",`Low blood sodium. SIADH in 48% of 50 people [[Saifudheen2011]]; IVIg can cause pseudohyponatraemia [[Colls2003]].`,"autonomic"],
 ["IGOS",`The International GBS Outcome Study, a prospective cohort started in May 2012 [[Jacobs2017]].`,"history"],
 ["Imlifidase",`An enzyme that cleaves IgG. A single-arm phase 2 study gave it before IVIg; no randomised result yet [[NCT03943589,Freiha2026]].`,"frontier"],
 ["Inexcitable nerve",`A nerve that gives no motor response. Dead or unable to walk unaided at 48 weeks: 50% with inexcitable nerves against 15% in the rest [[Hadden1998]].`,"ncs"],
 ["IVIg (intravenous immunoglobulin)",`Pooled IgG from at least 1,000 donors [[FDA-Bivigam]]. Published regimen 0.4 g/kg/day for 5 days [[vanDoorn2023]].`,"ivig"],
 ["IVIg boxed warning",`Thrombosis, renal dysfunction and acute renal failure [[FDA-Bivigam]].`,"ivig"],
 ["Landry's paralysis",`"Ascending paralysis" described by Octave Landry in 1859 [[Afifi1994]].`,"history"],
 ["Lumbar puncture",`A needle sample of CSF from the lower back, done mainly to exclude other causes [[Leonhard2019]].`,"csf"],
 ["Membrane attack complex",`The complement pore that damages membranes; eculizumab blocks the step just before it [[Freiha2026]].`,"frontier"],
 ["mEGOS",`Modified EGOS: age, preceding diarrhoea and MRC sum score; 0-9 at admission, 0-12 at day 7 [[Papri2022mEGOS,Busl2023]].`,"prognosis"],
 ["mEGRIS",`Modified EGRIS using bulbar weakness, onset-to-admission days, neck flexion and hip flexion; 0 to 32 [[Luijten2023]].`,"breathing"],
 ["MEP (maximal expiratory pressure)",`Peak blowing-out pressure. Below 40 cmH2O is the "40" of the 20/30/40 rule [[Lawn2001]].`,"breathing"],
 ["Miller Fisher syndrome",`Ophthalmoplegia, ataxia and areflexia [[Mori2001MFS]], described by Fisher in 1956 [[Fisher1956]].`,"mfs"],
 ["MIP (maximal inspiratory pressure)",`Peak sucking-in pressure. Below 30 cmH2O is the "30" of the 20/30/40 rule [[Lawn2001]].`,"breathing"],
 ["Monophasic course",`One episode that does not return. 95% of 494 Dutch adults had a monophasic course [[Fokke2014]].`,"course"],
 ["MRC sum score",`Strength of 12 muscle groups, 0 (quadriplegic) to 60 (normal) [[vanTilburg2024]]; near-perfect interobserver agreement [[Kleyweg1991MRC]].`,"prognosis"],
 ["Myelin",`The insulating sheath around fast-conducting nerve fibres, attacked in AIDP [[HaferMacko1996AIDP]].`,"subtypes"],
 ["Nadir",`The weakest point. Reached within 2 weeks in 80% and 4 weeks in 97% [[Fokke2014]].`,"course"],
 ["Nerve conduction study (NCS)",`Electrical tests of nerve speed and response size. May be normal in the first week [[Leonhard2019]].`,"ncs"],
 ["Nerve ultrasound",`Imaging that shows enlarged nerves early, including the vagus and cervical spinal nerves [[Grimm2016]]. Not routine [[vanDoorn2023]].`,"ncs"],
 ["Neurofilament light chain (NfL)",`A blood marker of axonal damage. High levels early go with poorer walking outcome (Early evidence) [[vanTilburg2024]].`,"frontier"],
 ["NINDS criteria",`Diagnostic criteria first published in 1978 and reaffirmed in 1990 [[NINCDS1978,Asbury1990]].`,"criteria"],
 ["Node of Ranvier",`The gap between myelin segments where sodium channels sit. The earliest AMAN change is nodal lengthening [[Griffin1996Nodal]].`,"subtypes"],
 ["Nodal-paranodal antibodies",`Antibodies to NF155, Caspr1 or contactin-1, considered with poor response, continued worsening or relapse [[vanDoorn2023]].`,"csf"],
 ["Ophthalmoplegia",`Paralysis of eye movements, closely tied to anti-GQ1b [[Chiba1993]].`,"mfs"],
 ["Pain",`Present before weakness in 36%, in the acute phase in 66% and at 1 year in 38% [[Ruts2010Pain]].`,"icu"],
 ["Paraparetic GBS",`Leg weakness and areflexia without arm, cranial or breathing involvement [[Kimachi2017]]. Leg-only weakness in 6% of a Dutch cohort [[Fokke2014]].`,"mfs"],
 ["Periaxonal space",`The space between axon and myelin, which macrophages enter in AMAN [[Griffin1996Nodal]].`,"subtypes"],
 ["Pharyngeal-cervical-brachial weakness",`A localised variant affecting throat, neck and arms, with anti-GT1a in 51% [[Nagashima2007]].`,"mfs"],
 ["Plasma exchange",`Removing plasma and its antibodies. Within 4 weeks; 200-250 mL/kg over five sessions [[Leonhard2019,vanDoorn2023]].`,"plex"],
 ["Plateau",`The phase after the nadir: no worse, not yet better, lasting days to weeks or months [[Leonhard2019]].`,"course"],
 ["Porphobilinogen",`A urine test that confirms acute porphyria, a GBS mimic [[Anderson2005]].`,"ddx"],
 ["Pressure ulcer",`Skin breakdown from immobility, prevented with standard care for any bed-bound person [[Leonhard2019]].`,"nursing"],
 ["Pseudohyponatraemia",`A falsely low sodium reading, which can follow IVIg [[Colls2003,Gagliardi2021]].`,"autonomic"],
 ["Pure motor GBS",`Weakness with normal sensory studies and examination: 16% of a trial cohort [[Hadden1998]]; about 70% in Bangladesh [[Leonhard2019]].`,"subtypes"],
 ["Rajabally criteria",`Stricter nerve conduction criteria that classify more people as axonal from a single study [[Rajabally2015,Arends2024]].`,"ncs"],
 ["Recurrence",`A new episode of GBS after recovery, in 2-5% [[Leonhard2019]], more often in younger people and Miller Fisher syndrome [[Kuitwaard2009JNNP]].`,"after"],
 ["Red flags",`Features that cast doubt on GBS, such as a sensory level, fever at onset, nadir under 24 hours or CSF cells above 50 [[Leonhard2019]].`,"signs"],
 ["Reversible conduction failure",`A block or low response that recovers within days or weeks without remyelination [[Kuwabara1998GM1,Kokubun2010]].`,"subtypes"],
 ["Schwann cell",`The cell that makes myelin in peripheral nerves. In AIDP, complement lies along its outer surface [[HaferMacko1996AIDP]].`,"subtypes"],
 ["SID-GBS",`The Dutch trial of a second IVIg course for a poor prognosis: no benefit, more serious adverse events [[Walgaard2021]].`,"whatnot"],
 ["Single breath count",`Counting aloud in one breath. Under 20 is a useful ICU-transfer tool per EAN/PNS [[vanDoorn2023]]; not reaching 15 signals imminent failure [[Leonhard2019]].`,"nursing"],
 ["Small-volume plasma exchange",`A low-cost method that separates plasma by sedimentation in a blood bag, studied in Bangladesh; not endorsed until efficacy is shown [[Islam2018,vanDoorn2023]].`,"plex"],
 ["SNAP (sensory nerve action potential)",`The sensory nerve response. Abnormal in 85% of AIDP and 6% of AMAN in one series [[Kuwabara2004Sensory]].`,"ncs"],
 ["Succinylcholine",`A muscle relaxant that can cause hyperkalaemic cardiac arrest after denervation [[FDA-Quelicin,Feldman1990]].`,"autonomic"],
 ["Sural sparing",`Abnormal median or ulnar sensory responses with a normal sural response; specific but insensitive [[vanDoorn2023,Derksen2014]].`,"ncs"],
 ["Takotsubo cardiomyopathy",`A reversible stress-related weakness of the heart muscle reported in GBS, mean onset 6.5 days after GBS onset in 8 cases [[Terayama2024]].`,"autonomic"],
 ["Tanruprubart (ANX005)",`An anti-C1q antibody. A phase 3 trial against placebo in Bangladesh and the Philippines enrolled 242 [[NCT04701164,Freiha2026]].`,"frontier"],
 ["Tick paralysis",`A mimic with ascending paralysis that improves rapidly once the tick is removed [[Edlow2010,GrattanSmith1997]].`,"ddx"],
 ["Tracheostomy",`A breathing tube through the neck. Early tracheostomy did not lower mortality in a Japanese cohort [[Yonezawa2020]].`,"icu"],
 ["Transverse myelitis",`An inflammatory cord disorder: sensory level, extensor plantars and hyperreflexia point to it [[TMCWG2002,vanDoorn2023]].`,"ddx"],
 ["Venous thromboembolism",`Clots in deep veins or lungs. Rates vary by method: 7% clinical, 52% on screening [[Gaber2002,Ryabinkina2016]].`,"nursing"],
 ["Vital capacity",`The largest breath that can be blown out. Below 20 mL/kg is the "20" of the 20/30/40 rule [[Lawn2001]].`,"breathing"],
 ["Wallerian degeneration",`Breakdown of the axon beyond an injury. Wallerian-like degeneration of motor fibres was seen in AMAN autopsies [[McKhann1993,Griffin1995]].`,"subtypes"],
 ["Zipper method",`Alternating plasma exchange and IVIg, reported in nine ventilated children (Early evidence); EAN/PNS wants an RCT first [[Kesici2019,vanDoorn2023]].`,"plex"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so '20/30/40', 'a-cidp' or 'a cidp' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  const L0=GBGL_T.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GBGL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const GBSR_AREAN={A:'Epidemiology, burden, presentation & history',B:'Triggers, vaccines & molecular mimicry',C:'Subtypes, nerve pathology & electrophysiology',D:'Clinical course, diagnostic criteria, CSF & differential',E:'Immunotherapy: IVIg, plasma exchange, steroids & fluctuations',F:'Respiratory failure, autonomic dysfunction, pain & intensive care',G:'Prognosis, recovery, rehabilitation & long-term outcomes',H:'Children, pregnancy, nursing care & living with GBS',I:'Research frontier'};
const GBSR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const gbsrSvc=s=>s.unverified?[]:GBSR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text; a trailing comma is dropped */
const gbsrLink=s=>{let l=(s.link||'').replace(/[,.;]+$/,'');if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(GBSR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[ ['all','%t:sources.all%'] ].concat(used.map(a=>[a,GBSR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>gbsrSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=GBSR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=gbsrSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=gbsrLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${GBSR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
