/* =============== 2.1 diagnosis & criteria =============== */
/* regions in rostral-to-caudal order: the index is what the "rostral" rules compare */
const DX_R=['bulbar','cervical','thoracic','lumbosacral'];
const DX_LIMB={cervical:true,lumbosacral:true};
const DX_TXT={
 reg:{bulbar:'Bulbar',cervical:'Cervical',thoracic:'Thoracic',lumbosacral:'Lumbosacral'},
 regLow:{bulbar:'bulbar',cervical:'cervical',thoracic:'thoracic',lumbosacral:'lumbosacral'},
 regEx:{bulbar:'Jaw, face, palate, tongue, larynx',cervical:'Neck, arms, hands, diaphragm',thoracic:'Back and abdomen',lumbosacral:'Back, abdomen, legs, feet'},
 list:a=>a.join(', '),
 /* calculator form */
 umnTag:'UMN',lmnTag:'LMN',
 umnBtn:'signs on examination',lmnBtn:'signs on examination',
 umnHint:{bulbar:'e.g. brisk jaw jerk, snout reflex, pseudobulbar features',cervical:'e.g. Hoffmann sign, spastic tone, a brisk reflex in a weak, wasted arm',thoracic:'e.g. loss of superficial abdominal reflexes',lumbosacral:'e.g. extensor plantar response, spastic tone'},
 lmnHint:{bulbar:'weakness and wasting, e.g. of the tongue (1 muscle is enough)',cervical:'weakness and wasting in 2 muscles with different roots and nerves',thoracic:'weakness and wasting of back or abdominal muscles (1 muscle is enough)',lumbosacral:'weakness and wasting in 2 muscles with different roots and nerves'},
 emgLbl:'Needle EMG: chronic neurogenic change, plus',
 emgGroup:r=>`Needle EMG findings, ${r} region`,
 emgOpt:['Nothing (normal or not done)','Fasciculation potentials only','Fibrillations or sharp waves'],
 two:'EMG change in 2 muscles with different roots and nerves',twoSub:'Needed for a limb region to count',
 both:'Both sides affected on EMG',bothSub:'Counts as 2 limbs for the laboratory-supported rule',
 ex:{arm:'UMN + LMN in the arm, EMG in arm and leg',caseEnd:'Composite case, month 14',pma:'LMN signs only, 2 regions',pls:'UMN signs only, 2 regions',fasc:'EMG shows fasciculations only',rost:'LMN in the arm, UMN in the leg',clr:'Clear all'},
 /* calculator results */
 gcName:'Gold Coast 2020',eecName:'Revised El Escorial 2000',awName:'Awaji 2008',
 gcMet:'Met: classified as ALS',gcNot:'Not met',
 r1ok:'R1 met: progressive motor impairment, preceded by normal motor function.',
 r1noP:'R1 not met: progression has not been documented by history or repeated examination.',
 r1noN:'R1 not met: the impairment has to follow a period of normal motor function.',
 r2same:rs=>`R2 met: UMN and LMN signs in the same region (${rs}).`,
 r2two:(n,rs)=>`R2 met: LMN signs in ${n} regions (${rs}).`,
 r2split:(u,l)=>`R2 met on the literal wording: UMN signs (${u}) and LMN signs (${l}) in different regions. See the note below.`,
 r2no:'R2 not met: needs UMN and LMN signs in 1 region, or LMN signs in at least 2 regions.',
 r3ok:'R3 met: investigations have excluded other disease processes.',
 r3no:'R3 not met yet: other disease processes still have to be excluded.',
 cat:{none:'No category',poss:'Clinically possible',lab:'Clinically probable, laboratory-supported',prob:'Clinically probable',def:'Clinically definite'},
 catAw:{none:'No category',poss:'Possible',prob:'Probable',def:'Definite'},
 catShort:{none:'No category',poss:'Possible',lab:'Probable (lab)',prob:'Probable',def:'Definite'},
 notYet:'Not classified yet',
 pend:c=>`The signs reach "${c}", but every category also needs progressive spread and other causes excluded.`,
 why:{
  def:rs=>`UMN and LMN signs together in 3 or more regions (${rs}).`,
  prob:(a,b)=>`UMN and LMN signs across at least 2 regions, with UMN signs (${a}) rostral to LMN signs (${b}).`,
  lab:()=>'Clinical UMN signs in 1 region, with or without LMN signs there, plus LMN signs on EMG in at least 2 limbs.',
  possUL:rs=>`UMN and LMN signs together in only 1 region (${rs}).`,
  possU2:rs=>`UMN signs alone in 2 or more regions (${rs}).`,
  possRost:(l,u)=>`LMN signs (${l}) are rostral to the UMN signs (${u}), so the rostral rule for "probable" is not met.`,
  noneU:()=>'The findings do not reach "possible".',
  noneNoU:()=>'Every category needs clinical UMN signs somewhere. LMN signs alone give no category.'
 },
 eecClin:'Only clinical signs count for these levels; EMG is used for the laboratory-supported level.',
 awEmg:rs=>`EMG counted as LMN evidence in: ${rs}.`,
 sum:(g,e,a)=>`Gold Coast: ${g} · Revised El Escorial: ${e} · Awaji: ${a}`,
 sumG:{met:'met (ALS)',not:'not met'},
 sumPend:c=>`${c} (pending)`,
 tagDiffer:'Readers differ',tagNote:'Note',
 n:{
  pma:'LMN signs only, in 2 or more regions: the progressive muscular atrophy (PMA) pattern. Gold Coast counts this as ALS for the first time, while revised El Escorial and Awaji give no category. El Escorial 1994 called it "suspected"; the 2000 revision removed that level. Much of the extra sensitivity of Gold Coast comes from such cases. [[deCarvalhoSwash2024,Pugdahl2021,Vidovic2023]]',
  pls:'UMN signs only: the primary lateral sclerosis (PLS) pattern. Not enough for Gold Coast, while revised El Escorial and Awaji call UMN signs in 2 or more regions "possible". The 2020 PLS consensus criteria apply instead: progressive UMN symptoms for at least 2 years and no active LMN degeneration. [[Turner2022,Turner2020PLS,CENTAURprotocol2019]]',
  fasc:rs=>`EMG shows fasciculation potentials but no fibrillations here: ${rs}. With chronic neurogenic change, Gold Coast and Awaji count this as denervation; the El Escorial EMG rules did not. [[Shefner2020,deCarvalho2008,deCarvalhoSwash2024]]`,
  two:rs=>`EMG in the ${rs} region is not counted: a limb region needs changes in 2 muscles supplied by different roots and different nerves. The bulbar and thoracic regions need 1 muscle. [[Shefner2020,deCarvalhoSwash2024]]`,
  limbs:'Laboratory-supported, "2 limbs" or "2 regions"? The WFN text asks for EMG signs in at least 2 limbs, which is met here. A summary by de Carvalho and Swash says at least 2 regions, which is not met. This tool follows the WFN text. [[CENTAURprotocol2019,deCarvalhoSwash2024]]',
  regs:'Laboratory-supported, "2 limbs" or "2 regions"? EMG signs are in at least 2 regions but not in 2 limbs. On the "2 regions" wording of de Carvalho and Swash this would be "probable, laboratory-supported"; this tool follows the WFN text ("at least 2 limbs"). [[CENTAURprotocol2019,deCarvalhoSwash2024,Vidovic2023]]',
  labU:'The WFN text describes UMN signs in 1 region for the laboratory-supported level. Here UMN signs are in more than 1 region; this tool still applies the level, which the text does not address. [[CENTAURprotocol2019]]',
  strict:'Awaji "probable" is applied as worded: LMN and UMN signs in at least 2 regions, with some UMN signs rostral to the LMN signs. Some studies read it as needing UMN signs in 2 regions; on that reading this would be "possible". This is one reason Awaji moved 20% of laboratory-supported cases down to possible in a meta-analysis. [[Finsterer2013,JangBae2015]]',
  split:'Gold Coast asks for UMN and LMN signs in the same region only "if only one body region is involved". It does not say what happens when they are in different regions. This tool follows that literal wording and counts it; a stricter reading would not. [[Shefner2020,Turner2022,Shrestha2026]]'
 },
 /* animation */
 view:{gc:'Gold Coast',eec:'Revised El Escorial',aw:'Awaji'},
 mk:{u:'U',l:'L',e:'E'},
 legend:{u:'U: UMN signs on examination',l:'L: LMN signs on examination',e:'E: LMN signs on EMG'},
 month:m=>`Month ${m}`,
 caseTag:'Illustrative composite case',
 chipName:{gc:'Gold Coast',eec:'Revised El Escorial',aw:'Awaji'},
 chipGc:{met:'ALS',pend:'R3 pending',no:'Not met'},
 panelTitle:{gc:'GOLD COAST 2020: ALL 3 NEEDED',eec:'REVISED EL ESCORIAL 2000',aw:'AWAJI 2008'},
 pendTag:'causes not yet excluded',
 rung:{eec:['No category','Possible','Probable, lab-supported','Probable','Definite'],aw:['No category','Possible','Lab-supported','Probable','Definite']},
 rungDef:{eec:[ ['Findings do not reach','"possible"'],['UMN + LMN in 1 region,','or UMN alone in 2'],['UMN in 1 region, plus','EMG LMN in 2 limbs'],['2 regions, with UMN','signs rostral to LMN'],['UMN + LMN','in 3 regions'] ],
          aw:[ ['Findings do not reach','"possible"'],['UMN + LMN in 1 region,','or UMN alone in 2'],['Deleted in 2008:','EMG now counts directly'],['2 regions, with UMN','signs rostral to LMN'],['UMN + LMN','in 3 regions'] ]},
 strictLines:['A stricter reading','would stop here'],
 paceLines:['The ladder counts regions;','it does not predict pace.','Decline per month in one','register: rEEC 0.84,','Gold Coast 0.81 points'],
 gcReq:[ ['R1','Progressive motor impairment','after normal motor function'],['R2','UMN + LMN in 1 region,','or LMN signs in 2 regions'],['R3','Other causes excluded','by tests chosen for the case'] ],
 st:{met:'met',pend:'pending',no:'not yet'},
 gcRes:{met:'Result: ALS',not:'Result: not met yet'},
 gcResSub:{met:'No grades: ALS or not ALS',not:'All three are needed'},
 bar1:'US centre: median 11.5 months to diagnosis',bar2:'Irish register: median 12.9 months to trial entry',
 barN1:'Median to diagnosis: 11.5 months',barN2:'Median to trial entry: 12.9 months',
 axis:'months from first symptom',
 now:(g,e,a)=>`Gold Coast: ${g} · Revised El Escorial: ${e} · Awaji: ${a}`,
 nowG:{met:'met (ALS)',pend:'R1 and R2 met, R3 pending',no:'not met'},
 /* accuracy and delay */
 sets:['Gold Coast','Awaji','Revised El Escorial'],
 ci:(v,lo,hi)=>`${v}% (${lo}–${hi})`,
 ciAria:(n,v,lo,hi)=>`${n}: ${v}%, 95% confidence interval ${lo} to ${hi}%`,
 months:v=>`${v} months`,
 mAria:(n,v)=>`${n}: ${v} months`,
 delay:['US centre, median','Six countries, mean','Of these, 5 in Europe','Of these, the US','After a misdiagnosis','No misdiagnosis']
};
const DX_STEPS=[
 {from:0,at:.04,k:'Month 0',t:'First symptom, one region',
  txt:`Right-hand clumsiness from weakness and wasting of the first dorsal interosseous: clinical LMN signs in the cervical region only, with no UMN signs. Revised El Escorial gives no category, because the 2000 criteria have no "suspected" level (the 1994 "suspected" needed LMN signs in at least 2 regions). Gold Coast is not met: it needs documented progression, and UMN plus LMN signs in 1 region or LMN signs in 2. [[CENTAURprotocol2019,deCarvalhoSwash2024,Shefner2020,Turner2022]]`,
  pt:'One weak hand is not enough for any of the criteria. Doctors need to see two kinds of nerve signs, and see them get worse or spread.'},
 {from:.12,at:.17,k:'Month 4',t:'First neurology visit',
  txt:`Progression is documented by history, and the examination adds UMN signs in the same arm: brisk reflexes in a weak, wasted arm and a Hoffmann sign. With UMN and LMN signs in 1 region, revised El Escorial and Awaji both give "possible". Gold Coast R1 and R2 are met; R3, the exclusion of other causes, is still pending. [[CENTAURprotocol2019,Finsterer2013,Turner2022]]`,
  hook:`A brisk or preserved reflex in a <b>weak, wasted</b> limb is an upper motor neuron sign: LMN loss alone would make that reflex weak. [[CENTAURprotocol2019,Shefner2020]]`},
 {from:.26,at:.31,k:'Month 5',t:'EMG in arm and leg',
  txt:`Needle EMG shows chronic neurogenic change with fibrillation potentials in the weak arm and in 2 right-leg muscles with different roots and nerves, so the lumbosacral region shows LMN signs on EMG. Nerve conduction is normal, with no conduction block. Revised El Escorial: "probable, laboratory-supported" (UMN and LMN signs in 1 region plus EMG signs in 2 limbs). Awaji has no laboratory-supported level, but counts EMG like a clinical sign: read as worded this reaches "probable"; on a stricter reading used in some studies it stays "possible". Gold Coast R2 is now met two ways. [[CENTAURprotocol2019,deCarvalho2008,Finsterer2013,JangBae2015,Johnsen2019,Turner2022]]`,
  hook:`Awaji 2008: with chronic neurogenic change, <b>fasciculation potentials count like fibrillations</b>, and EMG evidence counts the same as clinical LMN signs. That made "probable laboratory-supported" obsolete. [[deCarvalho2008,Vidovic2023]]`},
 {from:.38,at:.43,k:'Months 5 to 6',t:'Other causes excluded',
  txt:`Cervical and brain MRI, the blood panel (thyroid tests, calcium, B12, protein electrophoresis, creatine kinase and others) and, where relevant, anti-GM1 antibodies and CSF show no mimic. All three Gold Coast requirements are now met, so by Gold Coast the diagnosis is ALS. The revised El Escorial and Awaji levels do not change. [[Garnier2024,Andersen2012EFNS,Shefner2020]]`,
  pt:'Gold Coast gives a yes-or-no answer: here, yes. The older systems still say "probable" or "possible", which many people found confusing and upsetting.'},
 {from:.51,at:.56,k:'Month 9',t:'Spread to the leg',
  txt:`Brisk knee jerks and an extensor plantar response appear in the weaker leg, now also weak and wasted: UMN and LMN signs in the lumbosacral region as well as the cervical. Revised El Escorial: "clinically probable" (2 regions, with UMN signs rostral to LMN signs). Awaji: "probable" on either reading. Gold Coast: still ALS. [[CENTAURprotocol2019,Finsterer2013]]`},
 {from:.64,at:.69,k:'Month 14',t:'Bulbar signs',
  txt:`Tongue fasciculation and wasting with a brisk jaw jerk add UMN and LMN signs in the bulbar region. Revised El Escorial: "clinically definite" (bulbar plus 2 spinal regions, 3 in all). Awaji: "definite". Gold Coast: unchanged, because it has no grades. [[CENTAURprotocol2019,Finsterer2013]]`,
  pt:'By now the signs are in three body regions. The older systems finally call it "definite", more than a year after the first symptom.'},
 {from:.78,at:.83,k:'Context',t:'How long this usually takes',
  txt:`In the Irish register, the median time from first symptom to trial eligibility (definite or probable) was about 12.9 months, and 10% of the people who died never left the trial-ineligible levels. In a US centre, the median time from first symptom to diagnosis was 11.5 months. [[Traynor2000criteria,Paganoni2014]]`},
 {from:.9,at:.95,k:'Keep in mind',t:'Levels count regions, not pace',
  txt:`The ladder from possible to definite reflects how many regions are involved, not prognosis. In the Irish register the level at diagnosis did not predict prognosis, and in the Dutch and Belgian registers decline was 0.84 ALSFRS-R points a month in the revised El Escorial group against 0.81 in the Gold Coast group, with wide spread in each. [[Traynor2000criteria,deJongh2022,Turner2022]]`,
  pt:'A higher level does not mean a faster or worse course. It only means the signs have been found in more places.',
  hook:`Gold Coast = progressive motor impairment + (UMN and LMN signs in 1 region, or LMN signs in 2 regions) + other causes excluded. It removed the El Escorial certainty levels. [[Shefner2020,Turner2022]]`}
];
/* the case, one event per step 1 to 6; each adds findings to what came before */
const DX_CASE=[
 {l:['cervical'],normal:1},
 {u:['cervical'],prog:1},
 {emg:['cervical','lumbosacral']},
 {excl:1},
 {u:['lumbosacral'],l:['lumbosacral']},
 {u:['bulbar'],l:['bulbar']}
];
const DX_EVM=[0,4,5,6,9,14];
const DX_MON=[ [0,0],[.04,0],[.12,3.4],[.17,4],[.26,4.7],[.31,5],[.38,5.6],[.43,6],[.51,8.5],[.56,9],[.64,13.4],[.69,14],[1,16] ];
/* calculator examples: u, l = regions with clinical signs; e = {region: 0 none, 1 fasciculations, 2 fibrillations} */
const DX_EX={
 arm:{u:['cervical'],l:['cervical'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 caseEnd:{u:['bulbar','cervical','lumbosacral'],l:['bulbar','cervical','lumbosacral'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 pma:{u:[],l:['cervical','lumbosacral'],e:{cervical:2,lumbosacral:2},prog:1,normal:1,excl:1},
 pls:{u:['bulbar','cervical','lumbosacral'],l:[],e:{},prog:1,normal:1,excl:1},
 fasc:{u:['cervical'],l:['cervical'],e:{cervical:1,lumbosacral:1},prog:1,normal:1,excl:1},
 rost:{u:['lumbosacral'],l:['cervical'],e:{},prog:1,normal:1,excl:1},
 clr:{u:[],l:[],e:{},prog:0,normal:0,excl:0}
};
const DX_ACC={
 sens:[{v:96,lo:93,hi:98},{v:87,lo:78,hi:93},{v:87,lo:78,hi:92}],
 spec:[{v:68,lo:53,hi:81},{v:72,lo:57,hi:83},{v:73,lo:59,hi:83}]
};
const DX_DELAY=[11.5,8.2,9.6,5.0,10.4,6.9];

function dxBlank(){const o={u:{},l:{},emg:{},two:{},both:{},prog:false,normal:false,excl:false};
  DX_R.forEach(r=>{o.u[r]=false;o.l[r]=false;o.emg[r]=0;o.two[r]=true;o.both[r]=false});return o}
function dxClone(S){return JSON.parse(JSON.stringify(S))}
/* The three rule sets, as the research file states them (GC.*, rEEC.*, AW.*). */
function dxClassify(S){
  const R=DX_R,ix=r=>R.indexOf(r),limb=r=>!!DX_LIMB[r];
  const emgOK=(r,min)=>S.emg[r]>=min&&(!limb(r)||S.two[r]);
  const U=R.filter(r=>S.u[r]);
  const Lc=R.filter(r=>S.l[r]);                          /* clinical LMN signs */
  const Le=R.filter(r=>S.l[r]||emgOK(r,1));              /* clinical or EMG (fasciculation or fibrillation potentials) */
  const both=Ls=>U.filter(r=>Ls.includes(r));
  const rost=Ls=>{for(const a of U)for(const b of Ls)if(ix(a)<ix(b))return[a,b];return null};
  const lmnUp=Ls=>{for(const a of Ls)for(const b of U)if(ix(a)<ix(b))return[a,b];return null};
  const ok=!!(S.prog&&S.excl);
  function ladder(Ls,lab){
    const UL=both(Ls),rp=rost(Ls),lu=lmnUp(Ls);
    if(UL.length>=3)return{cat:'def',why:'def',a:[UL]};
    if(rp)return{cat:'prob',why:'prob',a:rp};
    if(lab&&lab())return{cat:'lab',why:'lab',a:[]};
    if(UL.length>=1)return{cat:'poss',why:'possUL',a:[UL]};
    if(U.length>=2)return{cat:'poss',why:'possU2',a:[U]};
    if(lu)return{cat:'poss',why:'possRost',a:lu};
    return{cat:'none',why:U.length?'noneU':'noneNoU',a:[]};
  }
  /* revised El Escorial: clinical signs for the ladder; EMG denervation must be fibrillations or sharp waves */
  const emgE=R.filter(r=>emgOK(r,2));
  const limbs=(emgE.includes('cervical')?(S.both.cervical?2:1):0)+(emgE.includes('lumbosacral')?(S.both.lumbosacral?2:1):0);
  const eec=ladder(Lc,()=>U.length>=1&&limbs>=2);eec.ok=ok;
  /* Awaji: EMG counts as clinical LMN evidence; no laboratory-supported level */
  const aw=ladder(Le,null);aw.ok=ok;
  aw.emg=Le.filter(r=>!Lc.includes(r));
  aw.strict=aw.cat==='prob'&&U.length<2;
  /* Gold Coast */
  const ULg=both(Le);
  let r2=null;
  if(ULg.length)r2={how:'same',a:ULg};
  else if(Le.length>=2)r2={how:'two',a:Le};
  else if(U.length&&Le.length)r2={how:'split',u:U,l:Le};
  const gc={r1:!!(S.prog&&S.normal),r2,r3:!!S.excl};gc.met=gc.r1&&!!gc.r2&&gc.r3;
  /* notes where the rules or their readers diverge */
  const notes=[];
  if(Le.length>=2&&!U.length)notes.push(['note','pma']);
  if(U.length>=2&&!Le.length)notes.push(['note','pls']);
  const fasc=R.filter(r=>S.emg[r]===1&&emgOK(r,1));
  if(fasc.length)notes.push(['note','fasc',fasc]);
  const bad2=R.filter(r=>limb(r)&&S.emg[r]>=1&&!S.two[r]);
  if(bad2.length)notes.push(['note','two',bad2]);
  if(eec.cat==='lab'&&emgE.length<2)notes.push(['differ','limbs']);
  if(U.length>=1&&limbs<2&&emgE.length>=2&&(eec.cat==='poss'||eec.cat==='none'))notes.push(['differ','regs']);
  if(eec.cat==='lab'&&U.length>=2)notes.push(['differ','labU']);
  if(aw.strict)notes.push(['differ','strict']);
  if(r2&&r2.how==='split')notes.push(['differ','split']);
  return{gc,eec,aw,notes,U,Lc,Le};
}
/* marker shapes: UMN a triangle, LMN a hexagon, EMG a rounded square, each with its letter */
function dxMk(k,x,y,o,on,R=8){
  const col=k==='u'?'var(--umn)':'var(--lmn)',fill=on?col:'var(--panel)',st=`style="fill:${fill};stroke:${col};stroke-width:1.6;${on?'':'stroke-dasharray:2.5 2;'}"`;
  let p;
  if(k==='u')p=`<path d="M${f1(x)} ${f1(y-R*1.05)} L${f1(x+R*1.05)} ${f1(y+R*.75)} L${f1(x-R*1.05)} ${f1(y+R*.75)}Z" ${st}/>`;
  else if(k==='l')p=`<polygon points="${[0,1,2,3,4,5].map(i=>{const a=i/6*Math.PI*2+Math.PI/6;return f1(x+Math.cos(a)*R)+','+f1(y+Math.sin(a)*R)}).join(' ')}" ${st}/>`;
  else p=`<rect x="${f1(x-R*.85)}" y="${f1(y-R*.85)}" width="${f1(R*1.7)}" height="${f1(R*1.7)}" rx="3" ${st}/>`;
  const ty=k==='u'?y+R*.55:y+R*.4;
  return `<g style="opacity:${f1(o)}">${p}<text x="${f1(x)}" y="${f1(ty)}" class="t-xs t-mid" style="fill:${on?'var(--panel)':col};font-weight:700">${DX_TXT.mk[k]}</text></g>`;
}
inits.dx=()=>{
  const T=DX_TXT,svg=$('#dxSvg'),rg=$('#dxT');
  let view=store.get('dxView','eec');if(!T.view[view])view='eec';
  /* ---------- the composite case ---------- */
  const ST=[],FIRST={u:{},l:{},e:{}};
  {let S=dxBlank();ST.push(dxClone(S));
   DX_CASE.forEach((ev,k)=>{(ev.u||[]).forEach(r=>{S.u[r]=true;FIRST.u[r]=k});(ev.l||[]).forEach(r=>{S.l[r]=true;FIRST.l[r]=k});
     (ev.emg||[]).forEach(r=>{S.emg[r]=2;FIRST.e[r]=k});if(ev.prog)S.prog=true;if(ev.normal)S.normal=true;if(ev.excl)S.excl=true;ST.push(dxClone(S))})}
  const RES=ST.map(dxClassify);
  const IDX={eec:{none:0,poss:1,lab:2,prob:3,def:4},aw:{none:0,poss:1,prob:3,def:4}};
  /* where each region's markers sit on the figure, and where its leader line ends (figure units) */
  const ANC={bulbar:{u:[-8,-137],l:[8,-137],e:[0,-121],end:[17,-131]},cervical:{u:[-41,-44],l:[-46,-26],e:[-51,-8],end:[46,-34]},
    thoracic:{u:[-10,-42],l:[10,-42],e:[0,-24],end:[24,-44]},lumbosacral:{u:[-13,22],l:[-13,46],e:[-13,70],end:[20,52]}};
  function gcState(r){return r.gc.met?'met':(r.gc.r1&&r.gc.r2)?'pend':'no'}
  function catTxt(set,r){const c=r[set];return set==='aw'?T.catAw[c.cat]:T.cat[c.cat]}
  function draw(t){
    const N=vb(svg,'720 400','400 742');
    const L=N?{fig:{cx:80,cy:172,s:.92},rx:166,ry:{bulbar:48,cervical:116,thoracic:176,lumbosacral:244},
               mx:8,my:16,chip:{x:8,y:290,w:384,h:30,dx:0,dy:36},px0:8,px1:392,ty:418,
               rung:{x:30,w:200,h:30,y0:600,dy:38},defX:240,gcY:[430,482,534],gcH:44,resY:590,
               tl:{x0:20,x1:380,l1:660,b1:664,l2:684,b2:688,ax:708,tk:722},bar1:T.barN1,bar2:T.barN2}
             :{fig:{cx:92,cy:226,s:1.25},rx:180,ry:{bulbar:60,cervical:142,thoracic:212,lumbosacral:292},
               mx:300,my:22,chip:{x:300,y:34,w:132,h:44,dx:138,dy:0},px0:300,px1:708,ty:104,
               rung:{x:320,w:226,h:30,y0:272,dy:38},defX:556,gcY:[114,166,218],gcH:44,resY:270,
               tl:{x0:304,x1:700,l1:326,b1:330,l2:348,b2:352,ax:372,tk:386},bar1:T.bar1,bar2:T.bar2};
    const e=DX_CASE.map((_,k)=>ramp(t,DX_STEPS[k].from,DX_STEPS[k].at));
    let n=0;while(n<e.length&&e[n]>=.5)n++;
    const res=RES[n],S=ST[n];
    const F=L.fig,X=fx=>F.cx+fx*F.s,Y=fy=>F.cy+fy*F.s;
    const op=(k,r)=>FIRST[k][r]==null?0:e[FIRST[k][r]];
    let s='';
    /* ---- body map with region shading ---- */
    const fill={};DX_R.forEach(r=>{fill[r]=.08+.3*op('u',r)+.36*op('l',r)+.18*op('e',r)});
    s+=bodyMap(F.cx,F.cy,F.s,fill,{hide:true});
    /* a soft pulse where the first symptom starts */
    if(e[0]>0&&e[0]<1&&!RM){const[ax,ay]=ANC.cervical.l;s+=`<circle cx="${f1(X(ax))}" cy="${f1(Y(ay))}" r="${f1(8+18*e[0])}" style="fill:none;stroke:var(--lmn);stroke-width:2;opacity:${f1(1-e[0])}"/>`}
    DX_R.forEach(r=>{const A=ANC[r],ry=L.ry[r];
      ['u','l','e'].forEach(k=>{const o=op(k,r);if(o>.02){const[ax,ay]=A[k];s+=dxMk(k,X(ax),Y(ay),o,true,7.5)}});
      /* region row: name, three slots, leader line */
      const[ex,ey]=A.end;s+=`<path d="M${L.rx-6} ${ry-4} L${f1(X(ex))} ${f1(Y(ey))}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;opacity:.7"/>`;
      s+=`<text x="${L.rx}" y="${ry}" class="t-lbl">${T.reg[r]}</text>`;
      ['u','l','e'].forEach((k,i)=>{const o=op(k,r);s+=dxMk(k,L.rx+10+i*26,ry+17,1,o>=.5,9)});
    });
    /* ---- month and case tag ---- */
    const mo=interp(DX_MON,t);
    s+=`<text x="${L.mx}" y="${L.my}" class="t-big">${T.month(Math.floor(mo+.001))}</text><text x="${L.px1}" y="${L.my}" class="t-xs t-end">${T.caseTag}</text>`;
    /* ---- summary chips ---- */
    const chipV={gc:T.chipGc[gcState(res)],eec:T.catShort[res.eec.cat],aw:T.catShort[res.aw.cat]};
    ['gc','eec','aw'].forEach((k,i)=>{const C=L.chip,x=C.x+i*C.dx,y=C.y+i*C.dy,sel=k===view;
      const good=k==='gc'?res.gc.met:res[k].cat!=='none';
      s+=`<rect x="${x}" y="${y}" width="${C.w}" height="${C.h}" rx="9" style="fill:${good?(k==='gc'?'var(--good-soft)':'var(--steel-soft)'):'var(--panel-2)'};stroke:${sel?'var(--ink)':'var(--line)'};stroke-width:${sel?2.2:1}"/>`;
      if(N)s+=`<text x="${x+10}" y="${y+19}" class="t-sm">${T.chipName[k]}</text><text x="${x+C.w-10}" y="${y+20}" class="t-lbl t-end">${chipV[k]}</text>`;
      else s+=`<text x="${x+10}" y="${y+16}" class="t-xs">${T.chipName[k]}</text><text x="${x+10}" y="${y+34}" class="t-lbl">${chipV[k]}</text>`});
    /* ---- detail panel for the chosen view ---- */
    const o8=ramp(t,DX_STEPS[7].from,DX_STEPS[7].at);
    s+=`<text x="${L.px0}" y="${L.ty}" class="t-sm" style="fill:var(--ink)">${T.panelTitle[view]}</text>`;
    if(view==='gc'){
      const st=[res.gc.r1?'met':'no',res.gc.r2?'met':'no',res.gc.r3?'met':(res.gc.r1&&res.gc.r2?'pend':'no')];
      T.gcReq.forEach((q,i)=>{const y=L.gcY[i],x0=L.px0,x1=L.px1,S0=st[i];
        const pc=S0==='met'?['var(--good-soft)','var(--good)']:S0==='pend'?['var(--warn-soft)','var(--warn)']:['var(--panel-2)','var(--muted)'];
        s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="${L.gcH}" rx="9" style="fill:var(--panel);stroke:${S0==='met'?'var(--good)':'var(--line)'};stroke-width:${S0==='met'?1.8:1}"/>`;
        s+=`<text x="${x0+12}" y="${y+28}" class="t-big">${q[0]}</text><text x="${x0+50}" y="${y+19}" class="t-lbl">${q[1]}</text><text x="${x0+50}" y="${y+35}" class="t-xs">${q[2]}</text>`;
        s+=`<rect x="${x1-82}" y="${y+12}" width="72" height="20" rx="10" style="fill:${pc[0]}"/><text x="${x1-46}" y="${y+26}" class="t-xs t-mid" style="fill:${pc[1]};font-weight:700">${T.st[S0]}</text>`});
      const m=res.gc.met,y=L.resY;
      s+=`<rect x="${L.px0}" y="${y}" width="${L.px1-L.px0}" height="36" rx="9" style="fill:${m?'var(--good-soft)':'var(--panel-2)'};stroke:${m?'var(--good)':'var(--line)'};stroke-width:${m?2:1}"/>`;
      s+=`<text x="${L.px0+12}" y="${y+23}" class="t-lbl" style="fill:${m?'var(--good)':'var(--muted)'}">${m?T.gcRes.met:T.gcRes.not}</text><text x="${L.px1-12}" y="${y+23}" class="t-xs t-end">${m?T.gcResSub.met:T.gcResSub.not}</text>`;
    }else{
      const I=IDX[view],R=L.rung,ry=i=>R.y0-i*R.dy;
      if(res[view].cat!=='none'&&!res[view].ok)s+=`<text x="${L.px1}" y="${L.ty}" class="t-xs t-end" style="fill:var(--warn);font-weight:700">${T.pendTag}</text>`;
      let k=-1;e.forEach((v,i)=>{if(v>0)k=i});
      const pos=k<0?I[RES[0][view].cat]:lerp(I[RES[k][view].cat],I[RES[k+1][view].cat],ease(e[k]));
      const curI=I[res[view].cat];
      for(let i=0;i<5;i++){const y=ry(i),del=view==='aw'&&i===2,cur=i===curI;
        s+=`<rect x="${R.x}" y="${y}" width="${R.w}" height="${R.h}" rx="8" style="fill:${cur?'var(--steel-soft)':i<curI?'var(--panel-2)':'var(--panel)'};stroke:${cur?'var(--steel)':'var(--line)'};stroke-width:${cur?2.4:1};${del?'stroke-dasharray:4 3;':''}opacity:${del?.6:1}"/>`;
        s+=`<text x="${R.x+12}" y="${y+20}" class="t-lbl" style="fill:${cur?'var(--steel)':del?'var(--muted)':'var(--ink)'}">${T.rung[view][i]}</text>`;
        if(del)s+=`<line x1="${R.x+10}" x2="${R.x+R.w-10}" y1="${y+15}" y2="${y+15}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        let lines=T.rungDef[view][i];
        if(view==='aw'&&i===1&&res.aw.strict)lines=T.strictLines;
        if(o8<.5)s+=`<text x="${L.defX}" y="${y+12}" class="t-xs" style="opacity:${f1(1-o8*2)};${view==='aw'&&i===1&&res.aw.strict?'fill:var(--warn);font-weight:700':''}"><tspan x="${L.defX}">${lines[0]}</tspan><tspan x="${L.defX}" dy="12">${lines[1]}</tspan></text>`;
        if(view==='aw'&&i===1&&res.aw.strict)s+=`<rect x="${R.x-4}" y="${y-4}" width="${R.w+8}" height="${R.h+8}" rx="10" style="fill:none;stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 3"/>`;
      }
      if(o8>0){s+=`<g style="opacity:${f1(o8)}">`;T.paceLines.forEach((ln,j)=>{s+=`<text x="${L.defX}" y="${ry(4)+12+j*16}" class="t-xs" style="${j<2?'fill:var(--ink);font-weight:700':''}">${ln}</text>`});s+='</g>'}
      const py=ry(pos)+R.h/2;
      s+=`<path d="M${R.x-16} ${f1(py-8)} L${R.x-4} ${f1(py)} L${R.x-16} ${f1(py+8)}Z" style="fill:var(--steel)"/>`;
    }
    /* ---- month timeline with the context bars ---- */
    const TL=L.tl,xm=m=>TL.x0+m/16*(TL.x1-TL.x0),o7=ramp(t,DX_STEPS[6].from,DX_STEPS[6].at);
    if(o7>0){s+=`<g style="opacity:${f1(o7)}">`;
      s+=`<text x="${TL.x0}" y="${TL.l1}" class="t-xs" style="fill:var(--ink)">${L.bar1}</text><rect x="${TL.x0}" y="${TL.b1}" width="${f1((xm(11.5)-TL.x0)*ease(o7))}" height="8" rx="4" style="fill:var(--steel);opacity:.8"/>`;
      s+=`<text x="${TL.x0}" y="${TL.l2}" class="t-xs" style="fill:var(--ink)">${L.bar2}</text><rect x="${TL.x0}" y="${TL.b2}" width="${f1((xm(12.9)-TL.x0)*ease(o7))}" height="8" rx="4" style="fill:var(--umn);opacity:.7"/>`;
      s+='</g>'}
    s+=`<line x1="${TL.x0}" x2="${TL.x1}" y1="${TL.ax}" y2="${TL.ax}" class="axis" style="stroke:var(--muted)"/>`;
    for(let m=0;m<=16;m+=2)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${TL.ax-3}" y2="${TL.ax+3}" style="stroke:var(--muted)"/><text x="${f1(xm(m))}" y="${TL.tk}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${TL.x1}" y="${TL.tk+13}" class="t-xs t-end">${T.axis}</text>`;
    DX_EVM.forEach((m,i)=>{const on=e[i]>=.5;s+=`<circle cx="${f1(xm(m))}" cy="${TL.ax}" r="5" style="fill:${on?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/>`});
    s+=`<path d="M${f1(xm(mo)-6)} ${TL.ax-14} L${f1(xm(mo)+6)} ${TL.ax-14} L${f1(xm(mo))} ${TL.ax-5}Z" style="fill:var(--tdp)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DX_STEPS,t);setSt(p);
    const nowLine=T.now(T.nowG[gcState(res)],catTxt('eec',res),catTxt('aw',res));
    $('#dxNote').innerHTML=noteHTML(DX_STEPS[p])+`<p class="readout"><b>${nowLine}</b></p>`;
  }
  const stop=playWire(rg,$('#dxPlay'),draw,22000,UI.replay,'dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  toggleRow($('#dxView'),[['gc',T.view.gc],['eec',T.view.eec],['aw',T.view.aw]],view,v=>{view=v;store.set('dxView',v);draw(+rg.value)});
  $('#dxLegend').innerHTML=['u','l','e'].map(k=>`<span class="lg"><svg viewBox="0 0 20 20" aria-hidden="true">${dxMk(k,10,10,1,true,8)}</svg>${T.legend[k]}</span>`).join('');
  draw(+rg.value);

  /* ---------- calculator ---------- */
  const C=dxBlank();
  $('#dxRegs').innerHTML=DX_R.map(r=>`<fieldset data-r="${r}"><legend>${T.reg[r]}</legend><p class="dx-def">${T.regEx[r]}</p>
    <button class="btn dx-tg" data-k="u" aria-pressed="false"><span class="tag umn">${T.umnTag}</span><span>${T.umnBtn}<small>${T.umnHint[r]}</small></span></button>
    <button class="btn dx-tg" data-k="l" aria-pressed="false"><span class="tag lmn">${T.lmnTag}</span><span>${T.lmnBtn}<small>${T.lmnHint[r]}</small></span></button>
    <div role="group" aria-label="${T.emgGroup(T.regLow[r])}"><p class="dx-def">${T.emgLbl}</p><div class="dx-seg">${T.emgOpt.map((o,i)=>`<button class="btn" data-k="e" data-v="${i}" aria-pressed="${i===0}">${o}</button>`).join('')}</div></div>
    ${DX_LIMB[r]?`<label class="dx-ck"><input type="checkbox" data-k="two" checked><span>${T.two}<small>${T.twoSub}</small></span></label><label class="dx-ck"><input type="checkbox" data-k="both"><span>${T.both}<small>${T.bothSub}</small></span></label>`:''}
  </fieldset>`).join('');
  function sync(){
    $$('#dxRegs fieldset').forEach(fs=>{const r=fs.dataset.r;
      $('[data-k="u"]',fs).setAttribute('aria-pressed',C.u[r]);$('[data-k="l"]',fs).setAttribute('aria-pressed',C.l[r]);
      $$('[data-k="e"]',fs).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.v===C.emg[r]));
      const tw=$('[data-k="two"]',fs),bo=$('[data-k="both"]',fs);if(tw)tw.checked=C.two[r];if(bo)bo.checked=C.both[r]});
    $('#dxProg').checked=C.prog;$('#dxNorm').checked=C.normal;$('#dxExcl').checked=C.excl;
  }
  function verdict(set,R){const c=R[set],nm=set==='eec'?T.eecName:T.awName,names=set==='aw'?T.catAw:T.cat;
    const cls=c.cat==='none'?'':c.ok?'yes':'pend';
    const args=c.a.map(x=>Array.isArray(x)?T.list(x.map(r=>T.regLow[r])):T.regLow[x]);
    let h=`<div class="dx-v ${cls}"><span class="kicker">${nm}</span><strong>${c.cat==='none'||c.ok?names[c.cat]:T.notYet}</strong>`;
    if(c.cat!=='none'&&!c.ok)h+=`<p>${T.pend(names[c.cat])}</p>`;
    h+=`<p>${T.why[c.why](...args)}</p>`;
    if(set==='eec'&&(c.cat==='poss'||c.cat==='prob'||c.cat==='def'))h+=`<p class="dx-def">${T.eecClin}</p>`;
    if(set==='aw'&&c.emg.length)h+=`<p class="dx-def">${T.awEmg(T.list(c.emg.map(r=>T.regLow[r])))}</p>`;
    return h+'</div>'}
  function render(){
    const R=dxClassify(C),g=R.gc,rl=a=>T.list(a.map(r=>T.regLow[r]));
    let h=`<div class="dx-v ${g.met?'yes':''}"><span class="kicker">${T.gcName}</span><strong>${g.met?T.gcMet:T.gcNot}</strong><ul>`;
    h+=`<li>${g.r1?T.r1ok:!C.prog?T.r1noP:T.r1noN}</li>`;
    h+=`<li>${!g.r2?T.r2no:g.r2.how==='same'?T.r2same(rl(g.r2.a)):g.r2.how==='two'?T.r2two(g.r2.a.length,rl(g.r2.a)):T.r2split(rl(g.r2.u),rl(g.r2.l))}</li>`;
    h+=`<li>${g.r3?T.r3ok:T.r3no}</li></ul></div>`;
    h+=verdict('eec',R)+verdict('aw',R);
    if(R.notes.length)h+=`<div class="dx-notes">${R.notes.map(([kind,id,arg])=>{const v=T.n[id];
      return `<p><span class="tag ${kind==='differ'?'warn':'steel'}">${kind==='differ'?T.tagDiffer:T.tagNote}</span>${typeof v==='function'?v(rl(arg)):v}</p>`}).join('')}</div>`;
    $('#dxOut').innerHTML=h;
    const sh=set=>{const c=R[set],v=T.catShort[c.cat];return c.cat!=='none'&&!c.ok?T.sumPend(v):v};
    $('#dxSum').innerHTML=T.sum(g.met?T.sumG.met:T.sumG.not,sh('eec'),sh('aw'));
  }
  function load(id){const E=DX_EX[id];Object.assign(C,dxBlank());
    E.u.forEach(r=>C.u[r]=true);E.l.forEach(r=>C.l[r]=true);Object.keys(E.e).forEach(r=>C.emg[r]=E.e[r]);
    C.prog=!!E.prog;C.normal=!!E.normal;C.excl=!!E.excl;sync();render()}
  $('#dxEx').insertAdjacentHTML('beforeend',Object.keys(DX_EX).map(k=>`<button class="btn" data-dxex="${k}">${T.ex[k]}</button>`).join(''));
  $('#dxEx').addEventListener('click',ev=>{const b=ev.target.closest('[data-dxex]');if(b)load(b.dataset.dxex)});
  $('#dxRegs').addEventListener('click',ev=>{const b=ev.target.closest('button[data-k]');if(!b)return;const r=b.closest('fieldset').dataset.r,k=b.dataset.k;
    if(k==='u')C.u[r]=!C.u[r];else if(k==='l')C.l[r]=!C.l[r];else if(k==='e')C.emg[r]=+b.dataset.v;sync();render()});
  $('#dxRegs').addEventListener('change',ev=>{const i=ev.target.closest('input[data-k]');if(!i)return;const r=i.closest('fieldset').dataset.r;C[i.dataset.k][r]=i.checked;render()});
  [['dxProg','prog'],['dxNorm','normal'],['dxExcl','excl']].forEach(([id,k])=>$('#'+id).addEventListener('change',()=>{C[k]=$('#'+id).checked;render()}));
  load('arm');

  /* ---------- accuracy and delay bars ---------- */
  const fr=(nm,v,lo,hi)=>`<div class="dx-fr"><span class="nm">${nm}</span><span class="trk" role="img" aria-label="${T.ciAria(nm,v,lo,hi)}"><i style="width:${v}%;background:var(--steel)"></i><s style="left:${lo}%;width:${hi-lo}%"></s><b style="left:${v}%;background:var(--steel)"></b></span><span class="val">${T.ci(v,lo,hi)}</span></div>`;
  $('#dxSens').innerHTML=DX_ACC.sens.map((d,i)=>fr(T.sets[i],d.v,d.lo,d.hi)).join('');
  $('#dxSpec').innerHTML=DX_ACC.spec.map((d,i)=>fr(T.sets[i],d.v,d.lo,d.hi)).join('');
  $('#dxDelay').innerHTML=DX_DELAY.map((v,i)=>`<div class="dx-fr"><span class="nm">${T.delay[i]}</span><span class="trk" role="img" aria-label="${T.mAria(T.delay[i],v)}"><i style="width:${f1(v/12*100)}%;background:${i<2?'var(--steel)':'var(--muted)'};opacity:.75"></i></span><span class="val">${T.months(v)}</span></div>`).join('');
};
