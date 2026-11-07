/* =============== 2.3 dx: diagnosis and the MDS criteria =============== */
/* MDS 2015 clinical diagnostic criteria. Item wording as published (Postuma 2015, reproduced in Marsili 2018);
   bradykinesia, rest tremor and rigidity definitions as reproduced in the PPMI form. */
const DXC_PK=[
 {id:'b',h:'Bradykinesia (required)',q:'slowness of movement AND decrement in amplitude or speed or progressive hesitations / halts as movements are continued.'},
 {id:'t',h:'Rest tremor',q:'4-6 Hz tremor in the fully resting limb which is suppressed during movement initiation. Kinetic and postural tremor do not qualify for parkinsonism criteria.'},
 {id:'r',h:'Rigidity',q:'Judged on slow passive movement of major joints with the patient in a relaxed position. Rigidity refers to ‘lead-pipe’ resistance that is velocity-independent resistance to passive movement not solely reflecting failure to relax. Isolated cogwheeling without lead-pipe rigidity does not fulfill minimum requirements for rigidity.'}];
const DXC_EX=[
 {h:'Cerebellar signs',q:'Unequivocal cerebellar abnormalities, such as cerebellar gait, limb ataxia, or cerebellar oculomotor abnormalities (e.g., sustained gaze evoked nystagmus, macro square wave jerks, hypermetric saccades)'},
 {h:'Downgaze palsy',q:'Downward vertical supranuclear gaze palsy or selective slowing of downward vertical saccades'},
 {h:'bvFTD or progressive aphasia',q:'Diagnosis of probable behavioral variant frontotemporal dementia or primary progressive aphasia, defined according to consensus criteria within the first 5 years of disease'},
 {h:'Legs only',q:'Parkinsonian features restricted to the lower limbs for more than 3 years'},
 {h:'Dopamine-blocking drug',q:'Treatment with a dopamine receptor blocker or a dopamine-depleting agent in a dose/time-course consistent with drug-induced parkinsonism'},
 {h:'No levodopa response',q:'Absence of observable response to high-dose levodopa despite at least moderate severity of disease'},
 {h:'Cortical signs',q:'Unequivocal cortical sensory loss (graphesthesia, stereognosis with intact primary sensory modalities), clear limb ideomotor apraxia, or progressive aphasia'},
 {h:'Normal dopamine scan',q:'Normal functional neuroimaging of the presynaptic dopaminergic system',d:'Counts only if a scan was done; imaging is not required.'},
 {h:'Another cause',q:'Documentation of an alternative condition known to produce parkinsonism and plausibly connected to the patient’s symptoms, or, the expert evaluating physician, based on the full diagnostic assessment feels that an alternative syndrome is more likely than PD'}];
const DXC_RF=[
 {h:'Wheelchair within 5 years',q:'Rapid progression of gait impairment requiring regular use of wheelchair within 5 years of onset',w:'weak'},
 {h:'No progression',q:'A complete absence of progression of motor symptoms or signs over 5 or more years unless stability is related to treatment'},
 {h:'Early bulbar dysfunction',q:'Early bulbar dysfunction: severe dysphonia or dysarthria (speech unintelligible most of the time) or severe dysphagia (requiring soft food, NG tube, or gastrostomy) within first 5 years',w:'strong'},
 {h:'Inspiratory breathing problems',q:'Inspiratory respiratory dysfunction: either diurnal or nocturnal inspiratory stridor or frequent inspiratory sighs',w:'strong'},
 {h:'Severe early autonomic failure',q:'Severe autonomic failure in the first 5 years of disease. This can include: (a) orthostatic hypotension—orthostatic decrease of blood pressure within 3 min of standing by at least 30 mmHg systolic or 15 mmHg diastolic, in the absence of dehydration, medication, or other diseases that could plausibly explain autonomic dysfunction, or (b) severe urinary retention or urinary incontinence in the first 5 years of disease (excluding long-standing or small amount stress incontinence in women), that is not simply functional incontinence. In men, urinary retention must not be attributable to prostate disease, and must be associated with erectile dysfunction',w:'strong',wn:'urinary part'},
 {h:'Early recurrent falls',q:'Recurrent (>1/year) falls because of impaired balance within 3 years of onset',w:'weak'},
 {h:'Anterocollis or contractures',q:'Disproportionate anterocollis (dystonic) or contractures of hand or feet within the first 10 years'},
 {h:'No non-motor features',q:'Absence of any of the common non-motor features of disease despite 5 years disease duration. These include sleep dysfunction (sleep-maintenance insomnia, excessive daytime somnolence, symptoms of REM sleep behavior disorder), autonomic dysfunction (constipation, daytime urinary urgency, symptomatic orthostasis), hyposmia, or psychiatric dysfunction (depression, anxiety, or hallucinations)'},
 {h:'Pyramidal signs',q:'Otherwise-unexplained pyramidal tract signs, defined as pyramidal weakness or clear pathologic hyperreflexia (excluding mild reflex asymmetry and isolated extensor plantar response)'},
 {h:'Symmetric onset',q:'Bilateral symmetric parkinsonism. The patient or caregiver reports bilateral symptom onset with no side predominance, and no side predominance is observed on objective examination',w:'weak'}];
const DXC_SU=[
 {h:'Clear, dramatic levodopa response',q:'Clear and dramatic beneficial response to dopaminergic therapy. During initial treatment, patient returned to normal or near-normal level of function. In the absence of clear documentation of initial response a dramatic response can be classified as: (a) marked improvement with dose increases or marked worsening with dose decreases. Mild changes do not qualify. Document this either objectively (>30% in UPDRS III with change in treatment), or subjectively (clearly documented history of marked changes from a reliable patient or caregiver) (b) unequivocal and marked on/off fluctuations, which must have at some point included predictable end-of-dose wearing off'},
 {h:'Levodopa-induced dyskinesia',q:'Presence of levodopa-induced dyskinesia'},
 {h:'Rest tremor on examination',q:'Rest tremor of a limb, documented on clinical examination (in past, or on current examination)'},
 {h:'Smell loss or abnormal MIBG',q:'The presence of either olfactory loss or cardiac sympathetic denervation on MIBG scintigraphy'}];
const DXC_CASES=[
 {n:'Typical Parkinson\'s',p:'btr',ex:[],rf:[],su:[0,2,3],why:`Asymmetric rest tremor, slowness and stiffness, a dramatic levodopa response and smell loss: no exclusions, no red flags and three supportive criteria.`},
 {n:'Early, one red flag',p:'bt',ex:[],rf:[9],su:[2],why:`Symmetric onset is a red flag, but one supportive criterion, rest tremor on examination, counterbalances it. At autopsy, bilateral symmetric parkinsonism was one of the less discriminating red flags, seen in 3.8–17.6% of PD. [[Fox2025]]`},
 {n:'MSA-like',p:'br',ex:[],rf:[3,4,9],su:[0],why:`Stridor, severe early autonomic failure and symmetric onset make three red flags, more than the probable category allows, even with a good levodopa response. A beneficial response occurs in 42.5–56.7% of MSA-P, so a response does not rule MSA out. [[Wenning2022]]`},
 {n:'PSP-like',p:'br',ex:[1],rf:[5,9],su:[],why:`A downward vertical supranuclear gaze palsy is an absolute exclusion. Probable PSP-Richardson syndrome combines a vertical gaze sign with repeated falls or a fall tendency within 3 years. [[Hoglinger2017]]`},
 {n:'Drug-induced',p:'btr',ex:[4],rf:[],su:[2],why:`A dopamine receptor blocker in a dose and time-course consistent with drug-induced parkinsonism is an absolute exclusion, even with an asymmetric rest tremor: 30–50% of people with drug-induced parkinsonism have both. [[Shin2012]]`},
 {n:'Clear all',p:'',ex:[],rf:[],su:[],why:''}];
const DXC_STEPS=[
 {from:0,at:.04,k:'Step 1 · the gate',t:'Is it parkinsonism?',
  txt:`Parkinsonism is "bradykinesia, in combination with at least one between rest tremor (4-6 Hz) and rigidity", examined as in the MDS-UPDRS. Without it, the criteria stop here. [[Postuma2015,Marsili2018]]`,
  pt:`First the doctor checks that movements really are slow and shrink as they repeat, and that there is a resting tremor, stiffness, or both.`,
  hook:`Bradykinesia is required. Postural instability is not part of MDS parkinsonism, though it is one of the options in step 1 of the UK Brain Bank criteria. [[Marsili2018]]`},
 {from:.22,at:.26,k:'Step 2 · exclusions',t:'Any absolute exclusion?',
  txt:`Nine features rule PD out. They were chosen as highly specific for another diagnosis and seen in fewer than 3% of true PD. Normal dopaminergic imaging counts only if a scan was done; the criteria do not require one. [[Fox2025,Postuma2015,Marsili2018]]`,
  pt:`Some findings point so strongly elsewhere that Parkinson's disease is off the table, such as a downward-gaze palsy or a drug known to cause parkinsonism.`,
  hook:`Dementia is not an exclusion in MDS 2015. A normal DaT scan is. [[Fox2025,Marsili2018]]`},
 {from:.44,at:.48,k:'Step 3 · red flags',t:'Count the red flags',
  txt:`Ten red flags are features of lower or uncertain specificity. "No more than two red flags are allowed" for clinically probable PD. At autopsy, inspiratory stridor, severe urinary retention or incontinence and early bulbar dysfunction separated PD from atypical parkinsonism best, each seen in under 2.5% of PD. [[Postuma2015,Fox2025]]`,
  pt:`A warning sign does not rule Parkinson's out on its own, but three of them do, and each one needs a weight on the other side of the scale.`,
  hook:`Best red flags at autopsy: stridor, severe urinary dysfunction, early bulbar dysfunction. Weaker: rapid gait decline, early falls, symmetric onset (3.8–17.6% of PD). [[Fox2025]]`},
 {from:.66,at:.7,k:'Step 4 · counterbalance',t:'Weigh the supportive criteria',
  txt:`One red flag needs at least one supportive criterion; two need at least two. The four supportive criteria are a clear and dramatic response to dopaminergic therapy, levodopa-induced dyskinesia, rest tremor on examination, and smell loss or cardiac sympathetic denervation on MIBG. An ancillary test qualified only if it had shown over 80% specificity in at least three positive studies from different centres. [[Postuma2015,Marsili2018]]`,
  pt:`Features typical of Parkinson's, such as a dramatic response to levodopa, can balance a warning sign.`,
  hook:`Probable = no exclusions, red flags ≤ 2, supportive ≥ red flags. [[Postuma2015,Fox2025]]`},
 {from:.86,at:.92,k:'Result',t:'Established or probable',
  txt:`Clinically established PD needs no exclusions, no red flags and at least two supportive criteria, aiming for at least 90% of people meeting it truly having PD. Clinically probable PD aimed for at least 80% sensitivity and positive predictive value. In validation, 94.5% of people with PD met probable; 59.3% of PD but only 1.6% of non-PD met established. [[Postuma2015,Postuma2018,Fox2025]]`,
  pt:`"Established" is the stricter level. Many people who truly have Parkinson's do not reach it, especially early on.`,
  hook:`Probable: sensitivity 94.5%, specificity 88.5% against experts; 92.5% accuracy against autopsy. [[Postuma2018,Virameteekul2023]]`}];
const DXC_T=[.04,.26,.48,.70,.90];
const DXC_VAL={ex:[
  ['MDS probable · sensitivity',94.5,'var(--good)'],['MDS probable · specificity',88.5,'var(--good)'],['MDS probable · accuracy',92.6,'var(--good)'],
  ['MDS established · PD meeting it',59.3,'var(--sage)'],['MDS established · non-PD meeting it',1.6,'var(--bad)'],
  ['UK Brain Bank · sensitivity',89.2,'var(--muted)'],['UK Brain Bank · specificity',79.2,'var(--muted)'],['UK Brain Bank · accuracy',86.4,'var(--muted)']],
 au:[['Movement-disorder experts',97.2,91.5,'var(--sage)'],['MDS clinically probable',92.5,89.5,'var(--good)'],['Other clinicians',90.3,84.2,'var(--muted)'],['"Established early PD" · specificity',98.4,null,'var(--good)']]};
/* predictive values: tests and settings */
const DXP_TESTS=[
 {k:'dat',n:'DaT-SPECT, early parkinsonism',se:78,sp:96,has:'a dopaminergic deficit (by the clinical diagnosis 36 months later)',src:'FDA-DaTscan'},
 {k:'datd',n:'DaT-SPECT, DLB vs autopsy',se:80,sp:92,has:'dementia with Lewy bodies at autopsy',src:'FDA-DaTscan'},
 {k:'saa',n:'CSF synuclein SAA',se:88,sp:96,has:'Parkinson\'s (PPMI, against healthy controls)',src:'Siderowf2023'},
 {k:'skin',n:'Skin biopsy, p-synuclein',se:93,sp:97,has:'Parkinson\'s (SYN-ONE, against controls)',src:'Gibbons2024'},
 {k:'mibg',n:'Cardiac MIBG, delayed',se:90,sp:83,has:'Parkinson\'s rather than other degenerative parkinsonism',src:'Orimo2012'},
 {k:'nig',n:'MRI nigrosome-1 loss',se:94,sp:90,has:'Parkinson\'s (against healthy adults only)',src:'Chau2020'}];
const DXP_SETS=[[2,'Age 65–69, no symptoms: 2%'],[30,'Tremor, cause unclear: 30% (example)'],[42,'New parkinsonism, community: 42%'],[76,'Diagnosed PD, 1992 autopsy series: 76%']];
const DXP_GSTEPS=[{from:0,k:'Step 1',t:'1,000 people are tested'},{from:.32,k:'Step 2',t:'Who truly has the condition'},{from:.6,k:'Step 3',t:'What the test says'}];
/* biological definitions */
const DXB_PROF=['SAA positive, no symptoms','SAA positive, abnormal DaT, no symptoms','Typical PD, SAA negative, LRRK2 carrier','Parkinsonism with stridor and autonomic failure (MSA)','Pathogenic SNCA variant, no signs'];
const DXB_FW=[
 {n:'MDS 2015',h:'Clinical diagnostic criteria',ev:'<span class="ev est">In use</span>',d:`Diagnosis starts from parkinsonism on examination, then exclusions, red flags and supportive criteria. Biomarkers enter only as an exclusion (a normal dopamine scan) or as support (MIBG). [[Postuma2015,Marsili2018]]`,
  v:[`No diagnosis: the criteria start from parkinsonism, and this person has none.`,`No diagnosis: without parkinsonism the criteria do not apply, whatever the scan shows.`,`Parkinson's disease, if the clinical criteria are met. A negative SAA is not an exclusion; only a normal dopamine scan is. [[Marsili2018]]`,`Not Parkinson's: stridor and severe early autonomic failure are red flags, and three or more break the counterbalance. MSA has its own 2022 MDS criteria. [[Postuma2015,Wenning2022]]`,`No diagnosis: no parkinsonism.`]},
 {n:'NSD-ISS 2024',h:'Neuronal α-synuclein disease',ev:'<span class="ev early">Research only</span>',d:`Defines disease by pathological neuronal α-synuclein (S, currently CSF SAA) and dopaminergic dysfunction (D), "regardless of the presence of any specific clinical syndrome", with stages 0 to 6. Its authors say clinical use "is premature and inappropriate". [[Simuni2024]]`,
  v:[`Stage 1A: S alone, without signs.`,`Stage 1B: S plus D, still without signs.`,`Not classified on this result: the system is anchored first on S, and this SAA is negative. About a third of LRRK2 PD is SAA-negative. [[Siderowf2023]]`,`Not covered: NSD includes SAA-positive conditions with a dopamine deficit, such as PD, DLB and RBD, but not MSA. [[Cardoso2024]]`,`Stage 0: a pathogenic SNCA variant.`]},
 {n:'SynNeurGe 2024',h:'Biological classification',ev:'<span class="ev early">Research only</span>',d:`Classifies on three components: S (pathological α-synuclein in tissue or CSF), N (neurodegeneration on imaging) and G (pathogenic gene variants), linked to a clinical component C. [[Hoglinger2024]]`,
  v:[`S is present. The abstract used here does not say what label applies without a clinical component.`,`S present with abnormal imaging. The abstract used here does not say what label applies without a clinical component.`,`Classifiable: unlike NSD, SynNeurGe can describe synuclein-negative, gene-defined disease. [[Cardoso2024]]`,`Kept separate: SynNeurGe separates PD from MSA. [[Cardoso2024]]`,`G is present. The abstract used here does not say how a carrier without signs is labelled.`]},
 {n:'MDS statement 2024',h:'A call for caution',ev:'<span class="ev est">Position</span>',d:`With no consensus on a biological definition, biologically based staging is "not yet logically possible", and Hoehn and Yahr should not be "prematurely" abandoned. [[Cardoso2024]]`,
  v:[`SAA amplifies abnormal synuclein in the laboratory; it "does not necessarily reflect any seeding or aggregation of α-syn in the brain" and cannot predict "if, when, and which clinical syndrome" will follow. In PPMI, 4% of healthy controls were positive. [[Cardoso2024,Siderowf2023]]`,`The test is binary, not quantitative, and staging people without symptoms needs an agreed definition first. [[Cardoso2024]]`,`In LRRK2-PD, synuclein pathology is found in under 50% of cases after death and SAA is often negative. Critics add that SAA-negative and SAA-positive PD progressed alike in PPMI. [[Cardoso2024,Espay2026]]`,`Clinical diagnosis stays the reference. Synuclein tests alone do not separate the synucleinopathies: skin biopsy was positive in 98.2% of MSA as well as 92.7% of PD. [[Cardoso2024,Gibbons2024]]`,`A gene variant without signs cannot be staged until a biological definition is agreed. [[Cardoso2024]]`]}];

inits.dx=()=>{
  /* ---------- 1. criteria calculator ---------- */
  const S={p:{b:false,t:false,r:false},ex:new Set(),rf:new Set(),su:new Set()};let caseI=-1;
  const ck=(grp,i,it,extra='')=>`<label class="dxc-ck"><input type="checkbox" data-g="${grp}" data-i="${i}"><span><b>${it.h}</b><span class="q">${it.q}</span>${it.d?` <i class="q">${it.d}</i>`:''}${extra}</span></label>`;
  let h=`<fieldset><legend>Step 1 · Parkinsonism</legend><p class="dxc-def">Bradykinesia plus rest tremor, rigidity or both. Definitions as published. [[PPMI-FEATPD,Postuma2015]]</p>`+DXC_PK.map((it,i)=>ck('p',it.id,it)).join('')+`</fieldset>`;
  h+=`<fieldset><legend>Step 2 · Absolute exclusions (9)</legend><p class="dxc-def">Any one rules out PD by these criteria. [[Postuma2015,Marsili2018]]</p>`+DXC_EX.map((it,i)=>ck('ex',i,it)).join('')+`</fieldset>`;
  h+=`<fieldset><legend>Step 3 · Red flags (10)</legend><p class="dxc-def">At autopsy, three were seen in under 2.5% of PD and separated it best (marked strong); three others appeared in 3.8–17.6% of PD (marked weaker). [[Fox2025]]</p>`+DXC_RF.map((it,i)=>ck('rf',i,it,it.w?`<br><span class="tag ${it.w==='strong'?'good':'warn'}">${it.w==='strong'?'strong at autopsy':'weaker at autopsy'}${it.wn?' · '+it.wn:''}</span>`:'')).join('')+`</fieldset>`;
  h+=`<fieldset><legend>Step 4 · Supportive criteria (4)</legend>`+DXC_SU.map((it,i)=>ck('su',i,it)).join('')+`</fieldset>`;
  $('#dxcForm').insertAdjacentHTML('beforeend',h);
  $('#dxcPre').insertAdjacentHTML('beforeend',DXC_CASES.map((c,i)=>`<button class="btn" data-case="${i}" aria-pressed="false">${c.n}</button>`).join(''));
  const cnt=()=>({park:S.p.b&&(S.p.t||S.p.r),ex:S.ex.size,rf:S.rf.size,sp:S.su.size});
  function judge(){const c=cnt();
    if(!c.park)return{...c,k:'np',cls:'na',t:'Not parkinsonism',fail:0};
    if(c.ex)return{...c,k:'ex',cls:'no',t:'Not PD by the criteria',fail:1};
    if(c.rf===0&&c.sp>=2)return{...c,k:'est',cls:'yes',t:'Clinically established PD',fail:-1};
    if(c.rf<=2&&c.sp>=c.rf)return{...c,k:'prob',cls:'yes',t:'Clinically probable PD',fail:-1};
    return{...c,k:'nm',cls:'no',t:'Criteria not met',fail:c.rf>2?2:3}}
  function explain(J){
    if(J.k==='np')return `Step 1 is not met. ${S.p.b?'Bradykinesia needs rest tremor or rigidity with it.':'Bradykinesia is required.'} The criteria apply only once parkinsonism is present. [[Postuma2015]]`;
    if(J.k==='ex'){let x=`Absolute exclusions are features highly specific for another diagnosis, occurring in fewer than 3% of true PD. [[Fox2025,Marsili2018]]`;
      if(S.ex.has(7))x+=` No autopsy-confirmed PD case had a normal DaT scan, but a few MSA, PSP and especially CBD cases did. [[Fox2025]]`;
      if(S.ex.has(5))x+=` An absent levodopa response was noted in 75% of pathologically proven PSP. [[Fox2025]]`;
      if(S.ex.has(3))x+=` Lower-body parkinsonism with a shuffling gait is typical of vascular parkinsonism. [[Zijlmans2004]]`;
      return x+` See <a href="#ddx" data-go="ddx">The differential</a>.`}
    if(J.k==='nm')return J.rf>2?`${J.rf} red flags: "No more than two red flags are allowed" for clinically probable PD. [[Postuma2015,Marsili2018]]`:`${J.rf} red flag${J.rf>1?'s':''} but only ${J.sp} supportive criteri${J.sp===1?'on':'a'}: each red flag needs one to counterbalance it. [[Postuma2015,Marsili2018]]`;
    if(J.k==='prob')return `${J.rf?`${J.rf} red flag${J.rf>1?'s':''}, counterbalanced by ${J.sp} supportive. `:''}In 626 patients, 94.5% of PD met clinically probable and 88.5% of non-PD were correctly excluded (accuracy 92.6%). Against autopsy its accuracy was 92.5%, or 89.5% within 5 years of onset. [[Postuma2018,Virameteekul2023]]`;
    return `No red flags and ${J.sp} supportive criteria. Met by 59.3% of PD but only 1.6% of non-PD in validation; the design target was at least 90% truly PD. [[Postuma2018,Postuma2015]]`}
  let ang=0,stopS=null;
  function drawScale(a){
    vb($('#dxcScale'),'400 250','400 250');const J=judge(),cx=200,py=84,Lb=138,r=a*Math.PI/180;
    const lx=cx-Lb*Math.cos(r),ly=py+Lb*Math.sin(r),rx=cx+Lb*Math.cos(r),ry=py-Lb*Math.sin(r);
    const dim=J.k==='np'||J.k==='ex';
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><g style="opacity:${dim?.35:1}">`;
    s+=`<path d="M${cx} ${py} V212" style="stroke:var(--ink);stroke-width:5"/><path d="M${cx-46} 226 L${cx-18} 210 H${cx+18} L${cx+46} 226Z" style="fill:var(--ink)"/>`;
    s+=`<path d="M${f1(lx)} ${f1(ly)} L${f1(rx)} ${f1(ry)}" style="stroke:${J.rf>2?'var(--bad)':'var(--ink)'};stroke-width:5;stroke-linecap:round"/><circle cx="${cx}" cy="${py}" r="7" style="fill:var(--panel);stroke:var(--ink);stroke-width:3"/>`;
    const pan=(x,y,n,col,lab,max)=>{let q=`<path d="M${f1(x)} ${f1(y)} L${f1(x-50)} ${f1(y+50)} M${f1(x)} ${f1(y)} L${f1(x+50)} ${f1(y+50)}" style="stroke:var(--muted);stroke-width:1.2"/><path d="M${f1(x-56)} ${f1(y+50)} Q${f1(x)} ${f1(y+70)} ${f1(x+56)} ${f1(y+50)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`;
      for(let j=0;j<n;j++){const bx=x-45+(j%5)*18,by=y+34-Math.floor(j/5)*16;q+=`<rect x="${f1(bx)}" y="${f1(by)}" width="16" height="14" rx="3" style="fill:${col}"/><text x="${f1(bx+8)}" y="${f1(by+10.5)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${j+1}</text>`}
      return q+`<text x="${f1(x)}" y="${f1(y+86)}" class="t-lbl t-mid">${lab} ${n}<tspan class="t-xs"> / ${max}</tspan></text>`};
    s+=pan(lx,ly,J.rf,'var(--bad)','Red flags',10)+pan(rx,ry,J.sp,'var(--good)','Supportive',4)+`</g>`;
    const msg=J.k==='np'?'Step 1 not met: no parkinsonism':J.k==='ex'?'':J.k==='est'?'No red flags, ≥ 2 supportive: established':J.k==='prob'?(J.rf?'Balanced: probable':'No red flags: probable'):J.rf>2?'More than 2 red flags: not probable':'Unbalanced: criteria not met';
    s+=`<text x="200" y="18" class="t-sm t-mid" style="fill:${J.cls==='yes'?'var(--good)':J.cls==='no'?'var(--bad)':'var(--warn)'};font-weight:700">${msg.toUpperCase()}</text>`;
    s+=`<text x="200" y="244" class="t-xs t-mid">each red flag needs a supportive criterion · at most 2 red flags</text>`;
    if(J.k==='ex')s+=`<g transform="rotate(-8 200 120)"><rect x="70" y="92" width="260" height="54" rx="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:3"/><text x="200" y="117" class="t-big t-mid" style="fill:var(--bad)">ABSOLUTE EXCLUSION</text><text x="200" y="135" class="t-xs t-mid" style="fill:var(--bad)">${J.ex} ticked · the counterbalance is never reached</text></g>`;
    $('#dxcScale').innerHTML=s}
  function update(){
    const J=judge(),o=$('#dxcOut');o.className='dxc-out '+J.cls;
    const C=caseI>=0?DXC_CASES[caseI]:null;
    o.innerHTML=`<span class="kicker">MDS 2015 · teaching calculator</span><strong>${J.t}</strong><span>${explain(J)}</span>${C&&C.why?`<span><b>This example:</b> ${C.why}</span>`:''}`;
    const m=$('#dxcMini');m.className='dxc-mini'+(J.cls==='yes'?' yes':J.cls==='no'?' no':'');
    m.innerHTML=`<span>${J.t}</span><span style="font-weight:500">exclusions ${J.ex} · red flags ${J.rf} · supportive ${J.sp}</span>`;
    $$('#dxcForm input[type=checkbox]').forEach(x=>{const g=x.dataset.g,i=x.dataset.i;x.checked=g==='p'?S.p[i]:S[g].has(+i)});
    $$('#dxcPre [data-case]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.case===caseI));
    const tgt=(J.k==='np'||J.k==='ex')?0:clamp((J.rf-J.sp)*7,-21,21);
    if(stopS)stopS();const a0=ang;stopS=animate(520,p=>{ang=lerp(a0,tgt,ease(p));drawScale(ang)},()=>{stopS=null});
    if(flowReady){stop();rg.value=.04;draw(.04)}
  }
  $('#dxcForm').addEventListener('change',e=>{const x=e.target.closest('input[data-g]');if(!x)return;const g=x.dataset.g,i=x.dataset.i;
    if(g==='p')S.p[i]=x.checked;else{x.checked?S[g].add(+i):S[g].delete(+i)}caseI=-1;update()});
  $('#dxcPre').addEventListener('click',e=>{const b=e.target.closest('[data-case]');if(!b)return;const C=DXC_CASES[+b.dataset.case];caseI=+b.dataset.case;
    S.p={b:C.p.includes('b'),t:C.p.includes('t'),r:C.p.includes('r')};S.ex=new Set(C.ex);S.rf=new Set(C.rf);S.su=new Set(C.su);update();
    if(flowReady&&C.p){$('#dxcPlay').click()}});
  /* validation bars */
  let vmode='ex',stopV=null;
  function drawVal(k){
    const sv=$('#dxcVal');vb(sv,'400 262','400 262');let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const x0=16,x1=340,W=x1-x0,e=ease(k);
    if(vmode==='ex'){s+=`<text x="16" y="20" class="t-sm" style="fill:var(--ink)">626 PATIENTS, AGAINST EXPERT DIAGNOSIS</text>`;
      DXC_VAL.ex.forEach(([l,v,c],i)=>{const y=40+i*27;s+=`<text x="${x0}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${x0}" y="${y+4}" width="${W}" height="10" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y+4}" width="${f1(W*v/100*e)}" height="10" rx="4" style="fill:${c}"/><text x="${x1+8}" y="${y+13}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`})}
    else{s+=`<text x="16" y="20" class="t-sm" style="fill:var(--ink)">QUEEN SQUARE BRAIN BANK, ACCURACY</text>`;
      s+=`<rect x="200" y="30" width="12" height="8" rx="2" style="fill:var(--ink)"/><text x="216" y="37" class="t-xs">all stages</text><rect x="290" y="30" width="12" height="8" rx="2" style="fill:var(--ink);opacity:.4"/><text x="306" y="37" class="t-xs">within 5 y</text>`;
      DXC_VAL.au.forEach(([l,a,b,c],i)=>{const y=58+i*50;s+=`<text x="${x0}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`;
        s+=`<rect x="${x0}" y="${y+5}" width="${W}" height="11" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y+5}" width="${f1(W*a/100*e)}" height="11" rx="4" style="fill:${c}"/><text x="${x1+8}" y="${y+14}" class="t-xs" style="fill:var(--ink);font-weight:700">${a}%</text>`;
        if(b!=null)s+=`<rect x="${x0}" y="${y+20}" width="${W}" height="9" rx="4" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y+20}" width="${f1(W*b/100*e)}" height="9" rx="4" style="fill:${c};opacity:.45"/><text x="${x1+8}" y="${y+28}" class="t-xs">${b}%</text>`;
        else s+=`<text x="${x0}" y="${y+30}" class="t-xs">a stricter variant for early disease</text>`})}
    sv.innerHTML=s;
    $('#dxcValCap').innerHTML=vmode==='ex'?'8 centres, 434 people with PD and 192 without, against expert diagnosis. The UK Brain Bank criteria scored lower on the same patients. [[Postuma2018]]':'141 PD and 126 non-PD parkinsonism, 2009–2019, against pathology. "Established early PD" had 95.4% specificity and 69.8% sensitivity in its derivation study. [[Virameteekul2023,Fox2025]]';
  }
  const setV=m=>{vmode=m;$('#dxcVex').setAttribute('aria-pressed',m==='ex');$('#dxcVau').setAttribute('aria-pressed',m==='au');if(stopV)stopV();stopV=animate(600,drawVal,()=>{stopV=null})};
  $('#dxcVex').onclick=()=>setV('ex');$('#dxcVau').onclick=()=>setV('au');

  /* ---------- 2. walk-through flow ---------- */
  const svg=$('#dxcFlow'),rg=$('#dxcT');let flowReady=false;
  function draw(t){
    const N=vb(svg,'720 270','400 640'),J=judge();
    const L=N?{C:[[128,60],[128,180],[128,300],[128,420],[128,546]],w:232,h:96,E:i=>[326,60+i*120],ew:128,eh:74}
             :{C:[[80,92],[220,92],[360,92],[500,92],[640,92]],w:128,h:104,E:i=>[80+i*140,222],ew:128,eh:52};
    let u=0;for(let i=0;i<4;i++)if(t>DXC_T[i]+.08)u=i+ease(ramp(t,DXC_T[i]+.08,DXC_T[i+1]-.01));
    if(J.fail>=0)u=Math.min(u,J.fail);
    const drop=J.fail>=0?ease(ramp(t,DXC_T[J.fail]+.08,DXC_T[J.fail]+.18)):0;
    const reach=i=>t>=DXC_T[i]&&(J.fail<0||i<=J.fail);
    let s=`<defs>${marker('dxcA')}${marker('dxcB','var(--bad)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // connectors and exits
    for(let i=0;i<4;i++){const[a,b]=[L.C[i],L.C[i+1]],on=reach(i+1);
      s+=N?`<path d="M${a[0]} ${a[1]+L.h/2} V${b[1]-L.h/2-3}" class="arrow" style="${on?'stroke:var(--good);stroke-width:2.2':''}" marker-end="url(#dxcA)"/>`
          :`<path d="M${a[0]+L.w/2} ${a[1]} H${b[0]-L.w/2-3}" class="arrow" style="${on?'stroke:var(--good);stroke-width:2.2':''}" marker-end="url(#dxcA)"/>`;
      const[ex,ey]=L.E(i),hit=J.fail===i&&drop>.5,lab=['Not parkinsonism','Not PD: exclusion','Not met: > 2 flags','Not met: unbalanced'][i];
      s+=N?`<path d="M${a[0]+L.w/2} ${a[1]} H${ex-L.ew/2-3}" class="arrow" style="stroke-dasharray:3 3;${hit?'stroke:var(--bad);stroke-width:2':''}" marker-end="url(#${hit?'dxcB':'dxcA'})"/>`
          :`<path d="M${a[0]} ${a[1]+L.h/2} V${ey-L.eh/2-3}" class="arrow" style="stroke-dasharray:3 3;${hit?'stroke:var(--bad);stroke-width:2':''}" marker-end="url(#${hit?'dxcB':'dxcA'})"/>`;
      s+=`<rect x="${ex-L.ew/2}" y="${ey-L.eh/2}" width="${L.ew}" height="${L.eh}" rx="10" style="fill:${hit?'var(--bad-soft)':'var(--panel)'};stroke:${hit?'var(--bad)':'var(--line)'};stroke-width:${hit?2:1}"/><text x="${ex}" y="${ey+4}" class="t-xs t-mid" style="fill:${hit?'var(--bad)':'var(--muted)'};font-weight:700">${lab}</text>`}
    // gates
    const st=[`B ${S.p.b?'✓':'✗'} · T ${S.p.t?'✓':'–'} · R ${S.p.r?'✓':'–'}`,`${J.ex} of 9 ticked`,`${J.rf} of 10 · max 2`,`${J.sp} for ${J.rf} flag${J.rf===1?'':'s'}`,J.fail<0?(J.k==='est'?'Established':'Probable'):'not reached'];
    const nm=['Parkinsonism','Exclusions','Red flags','Supportive','Result'],ok=[J.park,J.ex===0,J.rf<=2,J.sp>=J.rf,J.fail<0];
    L.C.forEach(([x,y],i)=>{const r=reach(i),pass=r&&ok[i]&&(J.fail<0||i<J.fail),fail=r&&J.fail===i,cur=i===phaseOf(DXC_STEPS,t);
      const col=fail?'var(--bad)':pass?'var(--good)':'var(--line)';
      s+=`<rect x="${x-L.w/2}" y="${y-L.h/2}" width="${L.w}" height="${L.h}" rx="12" style="fill:${pass?'var(--good-soft)':fail?'var(--bad-soft)':'var(--panel)'};stroke:${cur?'var(--ink)':col};stroke-width:${cur?2.6:1.5}"/>`;
      s+=`<text x="${x}" y="${y-L.h/2+20}" class="t-xs t-mid">${i<4?'STEP '+(i+1):'RESULT'}</text><text x="${x}" y="${y+2}" class="t-lbl t-mid">${nm[i]}</text>`;
      s+=`<text x="${x}" y="${y+22}" class="t-xs t-mid" style="fill:${r?'var(--ink)':'var(--muted)'};font-weight:${r?700:500}">${r?st[i]:'?'}</text>`;
      if(r&&(pass||fail))s+=`<circle cx="${x+L.w/2-10}" cy="${y-L.h/2+10}" r="9" style="fill:${col}"/><path d="${pass?`M${x+L.w/2-14} ${y-L.h/2+10} l3 3.5 5 -6.5`:`M${x+L.w/2-13.5} ${y-L.h/2+6.5} l7 7 M${x+L.w/2-6.5} ${y-L.h/2+6.5} l-7 7`}" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-linecap:round"/>`});
    // the case marker
    const i0=Math.floor(u),i1=Math.min(4,i0+1),fu=u-i0,oX=N?-L.w/2+16:0,oY=N?-L.h/2+18:-L.h/2-12;
    let tx=lerp(L.C[i0][0],L.C[i1][0],fu)+oX,ty=lerp(L.C[i0][1],L.C[i1][1],fu)+oY;
    if(drop>0){const[ex,ey]=L.E(J.fail);tx=lerp(L.C[J.fail][0]+oX,ex,drop);ty=lerp(L.C[J.fail][1]+oY,ey-L.eh/2,drop)}
    s+=`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="8" style="fill:var(--rose);stroke:var(--panel);stroke-width:3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DXC_STEPS,t);setSt(p);
    const line=J.k==='np'?'stops at step 1':J.k==='ex'?'stops at step 2, an absolute exclusion':J.k==='nm'?`stops at step ${J.fail+1}`:`passes every gate: ${J.t.charAt(0).toLowerCase()+J.t.slice(1)}`;
    $('#dxcNote').innerHTML=noteHTML(DXC_STEPS[p])+`<p class="readout"><span>This case <b>${line}</b></span></p>`;
  }
  const stop=playWire(rg,$('#dxcPlay'),draw,11000,'Replay','dx');
  const setSt=stepWire($('#dxcSteps'),DXC_STEPS,rg,draw,stop);
  flowReady=true;

  /* ---------- 3. predictive values ---------- */
  const gs=$('#dxpGrid'),gr=$('#dxpT'),se=$('#dxpSens'),sp=$('#dxpSpec'),pr=$('#dxpPre');let test=DXP_TESTS[2];
  $('#dxpTests').insertAdjacentHTML('beforeend',DXP_TESTS.map((x,i)=>`<button class="btn" data-tst="${i}" aria-pressed="${x===test}">${x.n}, ${x.se}/${x.sp}</button>`).join(''));
  $('#dxpSets').insertAdjacentHTML('beforeend',DXP_SETS.map(([v,l])=>`<button class="btn" data-pre="${v}" aria-pressed="${v===42}">${l}</button>`).join(''));
  $('#dxpCap').innerHTML=`Tests: DaT-SPECT percent agreement in early parkinsonism (77–79% and 96%) and DLB against autopsy [[FDA-DaTscan]]; CSF SAA 87.7% and 96.3% [[Siderowf2023]]; skin biopsy 92.7% of PD positive, 3.3% of controls [[Gibbons2024]]; MIBG delayed ratio 89.7% and 82.6% [[Orimo2012]]; nigrosome MRI 0.94 and 0.90 against healthy adults [[Chau2020]]. Values rounded. Settings: the prodromal prior at 65–69 [[Heinzel2019]]; an example value with no measured source; PD among 364 incident cases of parkinsonism in Olmsted County [[Bower1999]]; PD confirmed in 76 of 100 brains diagnosed by neurologists [[Hughes1992]].`;
  function nums(){const sens=+se.value/100,spec=+sp.value/100,pre=+pr.value/100,D=Math.round(1000*pre),TP=Math.round(D*sens),FN=D-TP,H=1000-D,TN=Math.round(H*spec),FP=H-TN;
    return {sens,spec,pre,D,TP,FN,H,TN,FP,ppv:TP+FP?TP/(TP+FP):0,npv:TN+FN?TN/(TN+FN):0}}
  function drawGrid(t){
    const N=vb(gs,'720 340','400 800');
    const L=N?{cols:25,cell:13,gx:37,gy:48,px:24,py:600,bw:250}:{cols:40,cell:11,gx:20,gy:48,px:496,py:60,bw:170};
    const n=nums(),c=L.cell,app=ramp(t,0,.3),o1=ramp(t,.32,.5),o2=ramp(t,.6,.8),o3=ramp(t,.82,1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const head=t<.32?'1,000 people tested':t<.6?`${n.D} truly have it (${Math.round(n.pre*100)}%)`:`${n.TP+n.FP} positive results, ${n.TN+n.FN} negative`;
    s+=`<text x="${L.gx}" y="30" class="t-lbl">${head}</text>`;
    for(let i=0;i<1000;i++){if(i/1000>=app)break;
      const x=L.gx+(i%L.cols)*c+c/2,y=L.gy+Math.floor(i/L.cols)*c+c/2,dis=i<n.D,tp=i<n.TP,fp=!dis&&i<n.D+n.FP;
      if(dis){if(o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o1)}"/>`;
        if(o1>0){if(!tp||o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.32)}" style="fill:none;stroke:var(--rose);stroke-width:1.5;opacity:${f1(tp?o1*(1-o2):o1)}"/>`;
          if(tp&&o2>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.38)}" style="fill:var(--rose);opacity:${f1(o2)}"/>`}}
      else if(fp){if(o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o2)}"/>`;
        if(o2>0)s+=`<rect x="${f1(x-c*.32)}" y="${f1(y-c*.32)}" width="${f1(c*.64)}" height="${f1(c*.64)}" rx="1.5" style="fill:var(--amber);opacity:${f1(o2)}"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted)"/>`}
    const LG=[['tp','True positive',n.TP,'has it, test positive'],['fn','False negative',n.FN,'has it, test negative'],['fp','False positive',n.FP,'does not, test positive'],['tn','True negative',n.TN,'does not, test negative']];
    LG.forEach(([k,l,v,d],i)=>{const x=N?L.px+(i%2)*186:L.px,y=N?L.py+Math.floor(i/2)*42:L.py+i*42;
      const mk=k==='tp'?`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:var(--rose)"/>`:k==='fn'?`<circle cx="${x+6}" cy="${y-4}" r="5" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`:k==='fp'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--amber)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="2.5" style="fill:var(--muted)"/>`;
      s+=`<g style="opacity:${f1(.25+.75*o2)}">${mk}<text x="${x+20}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l} <tspan style="font-weight:700">${o2>0?v:'–'}</tspan></text><text x="${x+20}" y="${y+14}" class="t-xs">${d}</text></g>`});
    if(o3>0){const by=N?L.py+88:L.py+176;
      [['Positive predictive value',n.ppv,'var(--rose)',`${n.TP} of ${n.TP+n.FP} positives are true`],['Negative predictive value',n.npv,'var(--sage)',`${n.TN} of ${n.TN+n.FN} negatives are true`]].forEach(([l,v,col,d],i)=>{const y=by+i*(N?58:56);
        s+=`<g style="opacity:${f1(o3)}"><text x="${L.px}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text><rect x="${L.px}" y="${y+6}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${y+6}" width="${f1(L.bw*v*ease(o3))}" height="14" rx="4" style="fill:${col}"/><text x="${L.px+L.bw+(N?-4:6)}" y="${y+(N?0:18)}" class="t-lbl ${N?'t-end':''}">${Math.round(v*100)}%</text><text x="${L.px}" y="${y+33}" class="t-xs">${d}</text></g>`})}
    gs.innerHTML=s;
    const p=phaseOf(DXP_GSTEPS,t),P=DXP_GSTEPS[p];let txt;
    const has=test?test.has:'the condition (custom test)';
    if(p===0)txt=`Imagine 1,000 people like the person being tested, all given the same test (${test?test.n:'custom values'}).`;
    else if(p===1)txt=`With a pre-test probability of ${Math.round(n.pre*100)}%, ${n.D} of the 1,000 truly have ${has} (rings) and ${n.H} do not.`;
    else txt=`Sensitivity ${Math.round(n.sens*100)}% finds ${n.TP} of the ${n.D} and misses ${n.FN}. Specificity ${Math.round(n.spec*100)}% clears ${n.TN} of the ${n.H}, but ${n.FP} test positive anyway. A positive result is right ${Math.round(n.ppv*100)}% of the time (PPV), a negative result ${Math.round(n.npv*100)}% of the time (NPV).`;
    $('#dxpNote').innerHTML=noteHTML({k:P.k+' · teaching tool',t:P.t,txt:txt+` Each test's figures come from its own comparison group: DaT-SPECT from agreement with the clinical diagnosis 36 months later, SAA and skin biopsy against healthy controls, nigrosome MRI against healthy adults only. Against other synucleinopathies, synuclein tests are not specific: skin biopsy was positive in 98.2% of MSA. [[FDA-DaTscan,Siderowf2023,Chau2020,Gibbons2024]]`,
      pt:`The same test gives more false alarms when the condition is rarer in the people tested. A synuclein test says synuclein is there, not which disease it is.`,
      hook:`Sensitivity and specificity belong to the test; PPV and NPV also depend on pre-test probability. DaT-SPECT confirms a dopaminergic deficit but cannot separate PD from MSA or PSP. [[FDA-DaTscan]]`});
    gr.setAttribute('aria-valuetext',`${P.t}. PPV ${Math.round(n.ppv*100)}%, NPV ${Math.round(n.npv*100)}%`);
  }
  const gstop=playWire(gr,$('#dxpPlay'),drawGrid,9000,'Replay','dx');
  const sync=()=>{$('#dxpSensV').textContent=se.value+'%';$('#dxpSpecV').textContent=sp.value+'%';$('#dxpPreV').textContent=pr.value+'%';
    if(test&&(test.se!==+se.value||test.sp!==+sp.value))test=null;
    $$('#dxpTests [data-tst]').forEach(b=>b.setAttribute('aria-pressed',DXP_TESTS[+b.dataset.tst]===test));
    $$('#dxpSets [data-pre]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre===pr.value));
    gstop();if(+gr.value<.82)gr.value=1;drawGrid(+gr.value)};
  [se,sp,pr].forEach(r=>r.addEventListener('input',sync));
  $$('#dxpTests [data-tst]').forEach(b=>b.onclick=()=>{test=DXP_TESTS[+b.dataset.tst];se.value=test.se;sp.value=test.sp;sync()});
  $$('#dxpSets [data-pre]').forEach(b=>b.onclick=()=>{pr.value=b.dataset.pre;sync()});

  /* ---------- 4. biological definitions ---------- */
  let prof=0;
  $('#dxbProf').insertAdjacentHTML('beforeend',DXB_PROF.map((p,i)=>`<button class="btn" data-prof="${i}" aria-pressed="${i===prof}">${p}</button>`).join(''));
  function drawCrit(){
    $('#dxbCrit').innerHTML=DXB_FW.map(c=>`<div class="card">${c.ev}<div class="kicker">${c.n}</div><h4>${c.h}</h4><p>${c.d}</p><div class="verdict"><b>For this person</b>${c.v[prof]}</div></div>`).join('')+
      `<div class="card"><div class="pt"><b>In plain words</b>Everyone agrees the synuclein test finds something real. They disagree on whether a positive test, without symptoms, should be called a disease, and on what to call Parkinson's without it.</div><div class="hook"><b>Exam hook</b>NSD-ISS: S (synuclein) + D (dopamine deficit), stages 0–6, excludes MSA. SynNeurGe: S, N, G + clinical C, includes synuclein-negative genetic PD. MDS 2024: no biological definition yet; both are research tools. [[Simuni2024,Hoglinger2024,Cardoso2024]]</div></div>`;
    $$('#dxbProf [data-prof]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.prof===prof))}
  $('#dxbProf').addEventListener('click',e=>{const b=e.target.closest('[data-prof]');if(!b)return;prof=+b.dataset.prof;drawCrit()});

  const prevR=redraws.dx;redraws.dx=()=>{prevR&&prevR();drawScale(ang);drawVal(1)};
  onHide.dx=(h=>()=>{h&&h();if(stopS){stopS();stopS=null}if(stopV){stopV();stopV=null}})(onHide.dx);
  caseI=0;{const C=DXC_CASES[0];S.p={b:true,t:true,r:true};S.ex=new Set(C.ex);S.rf=new Set(C.rf);S.su=new Set(C.su)}
  update();drawScale(0);drawVal(1);drawCrit();sync();draw(+rg.value);
};
