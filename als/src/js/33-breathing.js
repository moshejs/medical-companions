/* =============== 3.3 breathing and NIV =============== */
const BR_STEPS=[
 {from:0,at:.04,k:'Healthy',t:'The diaphragm does most of the work',
  txt:`The diaphragm, described as the major muscle of breathing, is supplied by the phrenic nerve, whose motor neurons sit in the spinal cord at C3 to C5. When it weakens, accessory muscles in the neck and chest are recruited. NICE NG42 sets baseline tests at or soon after diagnosis: a resting room-air oxygen saturation (SpO2) plus FVC or VC and/or SNIP and/or MIP. [[Fusco2019,NICE2016]]`,
  pt:'Breathing depends mostly on one muscle under the lungs, the diaphragm. Its nerve comes from the neck part of the spinal cord.',
  hook:`Phrenic motor neurons (C3-C5) are lower motor neurons and are lost in ALS like the others. Respiratory failure is described as the leading cause of death in ALS. [[Fusco2019,Niedermeyer2019,Radunovic2017]]`},
 {from:.1,at:.14,k:'Gradual decline',t:'Tests repeated every few months',
  txt:`NICE repeats the tests every 2-3 months, more or less often depending on symptoms, rate of progression and the person\'s preference; the Canadian recommendations say every 3 months. In 893 placebo-treated trial participants, slow vital capacity fell on average 2.7 percentage points a month, and 3.6 after age 65. In one clinic of 1034 people, median survival was 2.91 years with a baseline FVC below 75% and 4.08 years above it. [[NICE2016,Shoesmith2020,Andrews2018,Czaplinski2006]]`,
  pt:'Breathing tests are repeated every few months to see how fast the muscles are changing.'},
 {from:.22,at:.26,k:'Diaphragm weakness',t:'Breathless lying flat',
  txt:`As the diaphragm weakens, lying flat becomes hard (orthopnoea), the belly can move the wrong way on breathing in (abdominal paradox) and neck muscles join in. In 25 people whose diaphragm pressure was measured, supine FVC matched it best, and a supine FVC below 75% predicted was 100% sensitive and specific for a low pressure. [[NICE2016,Lechtzin2002]]`,
  pt:'Lying flat lets the belly push up on a weak diaphragm, so people feel short of breath in bed and prop themselves up on pillows.',
  hook:'Orthopnoea is a diaphragm sign. AAN 2009 lists it on its own as a reason to consider NIV. [[Miller2009AAN]]'},
 {from:.36,at:.4,k:'At night',t:'Hypoventilation during sleep',
  txt:`Breathing is weakest in sleep: CO2 rises and oxygen dips. People notice disturbed or unrefreshing sleep, nightmares, morning headaches, daytime sleepiness and poor concentration. In a cohort of 98 people, SNIP below 40 cmH2O went with night-time low oxygen, a hazard ratio for death of 9.1 and a median survival of 6 months. [[NICE2016,Miller2009AAN,Morgan2005]]`,
  pt:'At night, weak breathing lets carbon dioxide build up. People wake tired, with headaches, and feel sleepy in the day.',
  hook:'Morning headache plus daytime sleepiness in a person with ALS points to hypoventilation during sleep.'},
 {from:.5,at:.55,k:'Triggers',t:'Published NIV thresholds crossed',
  txt:`FVC below 50% and SNIP of about 40 cmH2O are thresholds the documents share. EFNS, NICE, Canada and the US panel also count FVC below 80% with symptoms; AAN 2009 does not. NICE asks for urgent referral, to be seen within 1 week, if PaCO2 is above 6 kPa. All frame these as triggers for discussion and referral, not automatic treatment: try the checker below. [[Miller2009AAN,Dorst2019,NICE2016,Shoesmith2020,Wolfe2021ONMAP]]`,
  pt:'Each guideline lists test results that mean it is time to talk about a breathing machine. The lists overlap but are not the same.',
  hook:'Shared triggers: FVC below 50% and SNIP about 40 cmH2O. AAN 2009 also counts orthopnoea on its own.'},
 {from:.64,at:.68,k:'NIV',t:'Support at night, then more',
  txt:`NICE describes getting used to NIV in the daytime, then regular use at night before and during sleep, building up hours as needed, and notes that NIV can be stopped at any time. In the Bourke 2006 trial (41 people), NIV improved survival and quality of life. With normal to moderately impaired bulbar function, the median survival benefit was 205 days (Cochrane medians 216 against 11 days); with poor bulbar function it improved some sleep-related quality of life but not survival. In that cohort FVC fell about 2.2% a month before NIV and 1.1% after. [[NICE2016,Bourke2006,Radunovic2017,Miller2009AAN]]`,
  pt:'A mask and a small machine push air in with each breath, first at night. It helps people sleep, and for many it adds months of life.',
  hook:'Bourke 2006: NIV added a median 205 days of survival, with quality of life maintained, in people with normal to moderately impaired bulbar function. [[Bourke2006]]'},
 {from:.78,at:.82,k:'Cough',t:'Cough assistance and secretions',
  txt:`A cough needs a deep breath in, brief closure of the glottis and a strong push out. AAN 2009 states that peak cough flow above 160 L/min is needed to clear secretions and that clinicians recommend assistive devices below 270 L/min. NICE lists breath stacking and manually assisted cough first, then assisted breath stacking, then a mechanical cough assist device. Diaphragm pacing shortened survival in DiPALS (11.0 against 22.5 months), and EAN 2024 recommends against it. [[Berlowitz2023,Miller2009AAN,NICE2016,DiPALS2015,VanDamme2024EAN]]`,
  pt:'When the cough gets weak, breathing techniques and a machine that blows air in and then pulls it out help clear phlegm.',
  hook:'Peak cough flow: assistance is recommended below 270 L/min; more than 160 L/min is needed to clear secretions (AAN 2009). [[Miller2009AAN]]'},
 {from:.9,at:.94,k:'Choices',t:'Tracheostomy or a palliative route',
  txt:`As NIV use extends toward the whole day, people and families talk about tracheostomy ventilation or a palliative route. In a German register 9.5% had tracheostomy ventilation, and most US neurologists reported it in fewer than 10% of their patients. In UK law a person with capacity can refuse or ask to withdraw ventilation, and the APM 2015 guidance states that this is not assisted suicide; in 95 UK accounts the median time from removal to death was 30 minutes, with titrated medication beforehand in 94%. [[Spittel2021,Rabkin2013,APM2015,Bleazard2025]]`,
  pt:'Later, some people choose a breathing tube in the neck and others choose comfort care. A person can ask to stop a breathing machine, with medicines to keep them comfortable.',
  hook:'Withdrawing ventilation at the request of a person with capacity is lawful in the UK; the cause of death remains the motor neurone disease (APM 2015). [[APM2015]]'}
];
const BR_TXT={
 niv:[ ['on','NIV on'],['off','NIV off'] ],
 bulb:[ ['mod','Bulbar function: normal to moderate'],['sev','Bulbar function: severe'] ],
 cord:'spinal cord',phrenic:['phrenic','nerve'],diaphragm:'diaphragm',acc:'neck muscles help',orth:'breathless lying flat',
 nivBox:'NIV',snip:'SNIP',pcf:'Peak cough flow',
 snipV:v=>`${Math.round(v)} cmH2O`,pcfV:v=>`${Math.round(v)} L/min`,below:n=>`below ${n}`,
 fvcTitle:'FVC, % predicted',months:'months',nivStart:'NIV starts',without:'without NIV',
 th:[ {v:80,l1:'80% · EFNS',l2:'others if symptoms'},{v:65,l1:'65% · Canada',l2:'upright FVC'},{v:50,l1:'50% · AAN, NICE',l2:'US panel'} ],
 night:m=>`One night asleep at month ${m}`,onNiv:'on NIV',spo2:'SpO2 %',co2:'CO2 mmHg',hours:'hours asleep',
 spoTh:['90%','US panel'],co2Th:['45 mmHg','EFNS, Canada'],hr:h=>`${h} h`,
 sv:{title:'Bourke 2006 RCT: median survival',mod:['normal to moderate','bulbar function (n=20)'],sev:['poor bulbar function','(n=21)'],
   niv:'with NIV',std:'standard care',days:d=>`${d} days`,diff:'difference 205 days, p=0.006',
   none:'No survival benefit',qol:['sleep-related quality of life','improved (p=0.018)'],all:'whole trial: 219 against 171 days'},
 read:(m,f,s,p,h)=>`<span>month <b>${m}</b></span><span>FVC <b>${f}%</b></span><span>SNIP <b>${s} cmH2O</b></span><span>peak cough flow <b>${p} L/min</b></span><span>NIV <b>${h}</b></span>`,
 hrs:{none:'not started',off:'switched off',night:'at night',more:'night and part of the day',most:'most of the day'},
 crossed:l=>`<b>Lines crossed so far:</b> ${l}.`,noneCrossed:'<b>No threshold line crossed yet.</b>',
 lines:{f80:'FVC 80%',f65:'FVC 65%',f50:'FVC 50%',s40:'SNIP 40 cmH2O',spo:'night SpO2 90%',p270:'peak cough flow 270 L/min',p160:'peak cough flow 160 L/min'},
 stateOn:'<b>NIV on:</b> the night traces settle and the FVC slope halves, as in the Bourke cohort. [[Miller2009AAN,Bourke2006]]',
 stateOff:'<b>NIV off:</b> the night traces keep worsening and the FVC slope stays the same.',
 bulbNote:{mod:'<b>Normal to moderate bulbar function:</b> in Bourke 2006 the survival gain with NIV was 205 days. [[Bourke2006,Radunovic2017]]',
   sev:'<b>Severe bulbar function:</b> in Bourke 2006 NIV improved some sleep-related quality of life but not survival; a full-face mask is drawn because nasal masks can leak through the mouth. EAN 2024 asks that every effort be made to allow NIV regardless of bulbar function. [[Bourke2006,Dorst2019,VanDamme2024EAN]]'}
};
/* calculator: each guideline's published triggers, with a test that returns true, false, null (not entered) or 'dep' */
const BR_ST={met:'met',no:'not met',na:'not entered',dep:'depends on sex',pres:'entered',abs:'none entered'};
const BR_GL=[
 {id:'aan',n:'AAN 2009',d:'United States practice parameter. NIV is considered if any one is present.',
  r:[ {l:'Orthopnoea',f:S=>S.orth},
      {x:1,l:'SNP (sniff) below 40 cmH2O',f:S=>S.snip==null?null:S.snip<40},
      {x:1,l:'MIP weaker than −60 cmH2O',f:S=>S.mip==null?null:S.mip<60},
      {x:1,l:'Abnormal nocturnal oximetry (legend: "pO2 <4% from baseline")',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'},
      {x:1,l:'FVC below 50% (supine or erect)',f:S=>S.fvc==null?null:S.fvc<50} ],
  flag:'CO2 is not a trigger here; on NIV the stated target is pCO2 below 50 mmHg. [[Miller2009AAN]]'},
 {id:'efns',n:'EFNS 2012',d:'European guideline. NIV with at least one of these.',
  r:[ {l:'At least one respiratory symptom',f:S=>S.orth||S.noct},
      {x:1,l:'FVC below 80%',f:S=>S.fvc==null?null:S.fvc<80},
      {x:1,l:'SNIP below 40 cmH2O',f:S=>S.snip==null?null:S.snip<40},
      {x:1,l:'MIP below 60 cmH2O',f:S=>S.mip==null?null:S.mip<60},
      {x:1,l:'Significant nocturnal desaturation',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'},
      {x:1,l:'Morning pCO2 above 45 mmHg (blood gas)',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2>45} ],
  flag:'Second-hand: the EFNS full text could not be read, so these thresholds are as tabulated by Dorst and Ludolph 2019, who note they rest on expert opinion. [[Andersen2012EFNS,Dorst2019]]'},
 {id:'nice',n:'NICE NG42 (2016)',d:'England and Wales. Results that should prompt a discussion and possible referral to a respiratory ventilation service.',
  r:[ {x:1,l:'FVC or VC below 50% predicted',f:S=>S.fvc==null?null:S.fvc<50},
      {l:'FVC or VC below 80% with symptoms or signs, particularly orthopnoea',f:S=>S.fvc==null?null:S.fvc<80&&S.any},
      {x:1,l:'SNIP or MIP below 40 cmH2O',f:S=>S.pmin==null?null:S.pmin<40},
      {l:'SNIP or MIP below 65 cmH2O (men) or 55 cmH2O (women) with symptoms or signs',f:S=>{if(S.pmin==null)return null;if(!S.any)return false;if(S.sex==='m')return S.pmin<65;if(S.sex==='f')return S.pmin<55;return S.pmin<55?true:S.pmin<65?'dep':false}},
      {x:1,l:'A fall in SNIP or MIP of more than 10 cmH2O per 3 months',f:S=>S.fall},
      {x:1,l:'PaCO2 above 6 kPa: urgent referral, to be seen within 1 week',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2/7.50062>6} ],
  flag:'NICE also measures blood gases if resting SpO2 is 94% or lower, and uses overnight oximetry as a further test rather than a listed threshold. [[NICE2016]]'},
 {id:'can',n:'Canada 2020',d:'Canadian best practice recommendations. Any one of these.',
  r:[ {l:'Symptoms of respiratory insufficiency, including orthopnoea',f:S=>S.orth||S.noct},
      {x:1,l:'SNIP or MIP 40 cmH2O or less',f:S=>S.pmin==null?null:S.pmin<=40},
      {x:1,l:'Reliable upright FVC below 65%',f:S=>S.fvc==null||S.pos!=='up'?null:S.fvc<65},
      {l:'Sitting or supine FVC below 80% with symptoms or signs',f:S=>S.fvc==null?null:S.fvc<80&&S.any},
      {x:1,l:'Daytime pCO2 above 45 mmHg (blood gas)',f:S=>S.co2==null||S.ct!=='bg'?null:S.co2>45},
      {x:1,l:'Abnormal nocturnal oximetry or symptomatic sleep-disordered breathing',f:S=>S.ox==='nd'?null:S.ox==='abn'||S.ox==='us'} ],
  flag:'[[Shoesmith2020]]'},
 {id:'us',n:'US panel 2021 (ONMAP)',d:'Proposed bilevel NIV criteria for neuromuscular and other thoracic restrictive disorders. Any one of these.',
  r:[ {l:'Symptoms with VC below 80%',f:S=>S.fvc==null?null:S.fvc<80&&(S.orth||S.noct)},
      {x:1,l:'Awake PaCO2 45 mmHg or more, or end-tidal, transcutaneous or venous CO2 50 mmHg or more',f:S=>S.co2==null?null:S.ct==='bg'?S.co2>=45:S.co2>=50},
      {x:1,l:'Sleep SpO2 90% or less for 5% of the night, or 88% or less for 5 minutes',f:S=>S.ox==='nd'?null:S.ox==='us'},
      {x:1,l:'VC 50% predicted or less',f:S=>S.fvc==null?null:S.fvc<=50},
      {x:1,l:'MIP 60 or SNIP 40 cmH2O or less (size)',f:S=>S.mip==null&&S.snip==null?null:(S.mip!=null&&S.mip<=60)||(S.snip!=null&&S.snip<=40)} ],
  flag:'Proposals for US reimbursement criteria, with no ALS-specific cut-offs. [[Wolfe2021ONMAP]]'},
 {id:'ean',n:'EAN 2024',d:'European Academy of Neurology (GRADE). Offers NIV to all people with ALS with symptoms, signs or investigations supportive of respiratory insufficiency, and asks that every effort be made to allow NIV regardless of bulbar function. It gives no numeric thresholds, so the checker only lists what was entered.',
  ean:true,
  r:[ {l:'Symptoms',f:S=>S.orth||S.noct},{l:'Signs',f:S=>S.signs},{l:'A test result that another guideline here lists',f:S=>S.otherTest} ],
  flag:'[[VanDamme2024EAN]]'}
];
const BR_CALC={
 pos:[ ['up','Upright or sitting'],['sup','Supine'] ],
 sex:[ ['','Sex not given'],['m','Man'],['f','Woman'] ],
 unit:[ ['mmHg','mmHg'],['kPa','kPa'] ],
 ct:[ ['bg','Blood gas (arterial or capillary)'],['tc','Transcutaneous, end-tidal or venous'] ],
 sum:(n,m)=>`${n} of ${m} listed triggers met`,eanSum:n=>n?'Findings of the kind EAN describes were entered':'No supportive finding entered',
 empty:'Enter values on the left, or load an example.',
 ex:{a:{fvc:72,pos:'up',orth:1},b:{fvc:58,pos:'up',snip:60,sex:'f'},c:{fvc:85,pos:'up',snip:50,sex:'f',noct:1,co2:46,unit:'mmHg',ct:'bg'},clr:{}}
};
inits.breathing=()=>{
  const svg=$('#brSvg'),rg=$('#brT'),T=BR_TXT;let niv='on',bulb='mod';
  const NIV0=.64,MON=t=>t*30;
  const fvcOff=t=>97-2.2*Math.max(0,MON(t)-3);
  const fvc=t=>niv!=='on'||t<=NIV0?fvcOff(t):fvcOff(NIV0)-1.1*(MON(t)-MON(NIV0));
  const snip=t=>interp([ [0,96],[.12,90],[.55,40],[1,18] ],t);
  const pcf=t=>interp([ [0,430],[.3,390],[.78,266],[1,172] ],t);
  const hyp=t=>{let h=.75*ramp(t,.3,.62)+.25*ramp(t,.62,1);if(niv==='on')h*=1-.85*ramp(t,NIV0,NIV0+.06);return h};
  const tl=(x,y,arr,cls,dy,st)=>arr.map((s,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`).join('');
  const REM=[1.5,3.1,4.7,6.2,7.4];
  const g=(hh,h)=>REM.reduce((a,c)=>a+Math.exp(-Math.pow((hh-c)/(.16+.14*h),2)),0);
  const spo=(hh,h)=>96.5-1.5*h-h*(3+8*h)*g(hh,h)+.35*Math.sin(hh*9.1)+.25*Math.sin(hh*23.7);
  const co2=(hh,h)=>39+h*(3+hh)+h*4*g(hh,h)+.3*Math.sin(hh*7.3);
  function chest(t){
    const ph=(t*24)%1,b=(1-Math.cos(2*Math.PI*ph))/2,dead=ramp(t,.12,1)*.8;
    const on=niv==='on'&&t>=NIV0;let amp=clamp((fvc(t)-15)/82,.15,1);if(on)amp=lerp(amp,.85,ramp(t,NIV0,NIV0+.04));
    const dd=13*b*amp,acc=ramp(t,.22,.4)*(on?.5:1);
    let s='';
    // head, neck, accessory muscles
    s+=`<rect x="120" y="46" width="20" height="30" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.2"/>`;
    s+=`<circle cx="130" cy="28" r="20" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<path d="M122 42 L127 76 M138 42 L133 76" style="stroke:var(--warn);stroke-width:${f1(1.5+3*acc)};opacity:${f1(.25+.75*acc)};stroke-linecap:round"/>`;
    if(acc>.1)s+=`<text x="146" y="62" class="t-xs" style="fill:var(--warn);opacity:${f1(acc)}">${T.acc}</text>`;
    // torso, ribs, lungs, diaphragm
    s+=`<path d="M84 72 Q130 64 176 72 L190 232 Q130 248 70 232 Z" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    [0,1,2,3].forEach(i=>{s+=`<path d="M${80+i*2} ${94+i*24} Q130 ${82+i*24} ${180-i*2} ${94+i*24}" style="fill:none;stroke:var(--cell-line);stroke-width:1.4;opacity:.45"/>`});
    [106,154].forEach(cx=>{s+=`<ellipse cx="${cx}" cy="${f1(134+dd*.5)}" rx="${f1(20+3*b*amp)}" ry="${f1(46+5*b*amp)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.5"/>`});
    s+=`<path d="M74 ${f1(206+dd*.3)} Q130 ${f1(160+2*dd)} 186 ${f1(206+dd*.3)}" style="fill:none;stroke:var(--muscle-line);stroke-width:${f1(5-3*dead)};stroke-linecap:round"/>`;
    s+=`<text x="130" y="226" class="t-xs t-mid">${T.diaphragm}</text>`;
    // spinal cord C3-C5 and phrenic nerve
    s+=`<rect x="8" y="76" width="44" height="90" rx="12" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.2"/><text x="30" y="70" class="t-xs t-mid">${T.cord}</text>`;
    ['C3','C4','C5'].forEach((c,i)=>{const y=98+i*20;s+=`<text x="12" y="${y+3}" class="t-xs">${c}</text>`+lmn(38,y,5.5,1,{dead:dead*(.7+.15*i),axonLen:16})});
    s+=`<path d="M54 98 Q60 104 62 118 M54 118 L62 118 M54 138 Q60 132 62 118 M62 118 Q66 178 96 ${f1(193+dd*.6)}" style="fill:none;stroke:var(--lmn);stroke-width:2;opacity:${f1(1-.6*dead)}"/>`;
    s+=tl(56,184,T.phrenic,'t-xs t-end',11);
    if(ph<.5){const u=ph*2,x=(1-u)*(1-u)*62+2*u*(1-u)*66+u*u*96,y=(1-u)*(1-u)*118+2*u*(1-u)*178+u*u*(193+dd*.6);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:var(--lmn);opacity:${f1(1-.75*dead)}"/>`}
    // NIV mask and machine
    if(on){const full=bulb==='sev';
      s+=full?`<ellipse cx="130" cy="34" rx="13" ry="12" style="fill:var(--air);fill-opacity:.3;stroke:var(--air);stroke-width:1.6"/>`:`<ellipse cx="130" cy="31" rx="7" ry="7" style="fill:var(--air);fill-opacity:.3;stroke:var(--air);stroke-width:1.6"/>`;
      s+=`<path d="M${full?143:137} 36 Q170 50 202 24" style="fill:none;stroke:var(--air);stroke-width:3;stroke-linecap:round"/><rect x="200" y="6" width="40" height="22" rx="5" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4"/><text x="220" y="21" class="t-sm t-mid" style="fill:var(--air)">${T.nivBox}</text>`;
      if(ph<.5)for(let k=0;k<3;k++){const u=clamp(1-((ph*2+k/3)%1)),x=(1-u)*(1-u)*(full?143:137)+2*u*(1-u)*170+u*u*202,y=(1-u)*(1-u)*36+2*u*(1-u)*50+u*u*24;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.2" style="fill:var(--air)"/>`}}
    if(t>=.22)s+=`<text x="130" y="254" class="t-sm t-mid" style="fill:var(--warn)">${T.orth}</text>`;
    // SNIP and peak cough flow bars
    const bar=(y,lbl,v,max,ticks,val,thr)=>{const w=230*clamp(v/max),low=v<thr;let r=`<text x="10" y="${y}" class="t-sm">${lbl}</text><text x="240" y="${y}" class="t-sm t-end"${low?' style="fill:var(--warn)"':''}>${val}</text>`+(low?`<text x="240" y="${y+30}" class="t-xs t-end" style="fill:var(--warn)">${T.below(thr)}</text>`:'');
      r+=`<rect x="10" y="${y+6}" width="230" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="10" y="${y+6}" width="${f1(w)}" height="10" rx="5" style="fill:${low?'var(--warn)':'var(--air)'}"/>`;
      ticks.forEach(k=>{const x=10+230*k/max;r+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y+2}" y2="${y+20}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x)}" y="${y+30}" class="t-xs t-mid">${k}</text>`});return r};
    s+=bar(274,T.snip,snip(t),120,[40],T.snipV(snip(t)),40);
    s+=bar(320,T.pcf,pcf(t),500,[160,270],T.pcfV(pcf(t)),270);
    return s;
  }
  function survival(x,y,w){const S=T.sv,on=niv==='on';let s=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${S.title}</text>`;
    s+=tl(x,y+14,S[bulb],'t-xs',11);
    if(bulb==='mod'){const W=w-70,r=(yy,l,d,a,c)=>`<text x="${x}" y="${yy}" class="t-xs">${l}</text><rect x="${x}" y="${yy+4}" width="${f1(Math.max(3,W*d/216))}" height="12" rx="3" style="fill:${c};opacity:${a?1:.45}"/><text x="${f1(x+Math.max(3,W*d/216)+6)}" y="${yy+14}" class="t-sm"${a?' style="fill:var(--ink)"':''}>${S.days(d)}</text>`;
      s+=r(y+42,S.niv,216,on,'var(--air)')+r(y+72,S.std,11,!on,'var(--muted)');
      s+=`<text x="${x}" y="${y+104}" class="t-xs">${S.diff}</text>`;
    }else{s+=`<text x="${x}" y="${y+50}" class="t-lbl">${S.none}</text>`+tl(x,y+68,S.qol,'t-xs',11)+`<text x="${x}" y="${y+104}" class="t-xs">${S.all}</text>`}
    return s}
  function fvcChart(t,X0,X1,Y0,Y1,LX){const on=niv==='on',yv=v=>lerp(Y1,Y0,(v-20)/80),xt=u=>lerp(X0,X1,u);
    let s=`<text x="${X0}" y="${Y0-12}" class="t-sm" style="fill:var(--ink)">${T.fvcTitle}</text>`;
    [20,40,60,80,100].forEach(v=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-5}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/>`;
    [0,6,12,18,24,30].forEach(m=>{s+=`<text x="${f1(xt(m/30))}" y="${Y1+14}" class="t-xs ${m===30?'t-end':m?'t-mid':''}">${m}</text>`});
    s+=`<text x="${LX}" y="${Y1+14}" class="t-xs">${T.months}</text>`;
    const cur=fvc(t);
    T.th.forEach(h=>{const c=cur<h.v,y=yv(h.v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c?'var(--warn)':'var(--muted)'};stroke-width:${c?1.8:1};${c?'':'stroke-dasharray:4 4'}"/>`;
      s+=`<text x="${LX}" y="${f1(y-1)}" class="t-sm"${c?' style="fill:var(--warn);font-weight:700"':''}>${h.l1}</text><text x="${LX}" y="${f1(y+10)}" class="t-xs">${h.l2}</text>`});
    if(on){const x=xt(NIV0);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${Y0}" y2="${Y1}" style="stroke:var(--air);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(x+4)}" y="${Y0+10}" class="t-xs" style="fill:var(--air)">${T.nivStart}</text>`;
      if(t>NIV0)s+=`<path d="${pathFn(u=>u<NIV0||u>t?NaN:(fvcOff(u)-20)/80,X0,X1,Y1,Y0).replace(/[ML][^ML]*NaN[^ML]*/g,'').replace(/^L/,'M')}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4"/>`;
      if(t>.9)s+=`<text x="${f1(xt(t)-4)}" y="${f1(yv(fvcOff(t))+13)}" class="t-xs t-end">${T.without}</text>`}
    s+=`<path d="${pathFn(u=>(fvc(u)-20)/80,X0,X1,Y1,Y0)}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:.28"/>`;
    s+=`<path d="${pathFn(u=>u<=t?(fvc(u)-20)/80:NaN,X0,X1,Y1,Y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--air);stroke-width:3"/>`;
    s+=`<circle cx="${f1(xt(t))}" cy="${f1(yv(cur))}" r="5" style="fill:var(--air);stroke:var(--panel);stroke-width:1.5"/>`;
    return s}
  function nightChart(t,X0,X1,Y0,LX){const h=hyp(t),on=niv==='on'&&t>=NIV0,S0=Y0+14,S1=S0+80,C0=S1+24,C1=C0+80,xh=hh=>lerp(X0,X1,hh/8);
    let s=`<text x="${X0}" y="${Y0}" class="t-sm" style="fill:var(--ink)">${T.night(Math.round(MON(t)))}</text>`;
    if(on)s+=`<text x="${LX}" y="${Y0}" class="t-lbl" style="fill:var(--air)">${T.onNiv}</text>`;
    const ys=v=>lerp(S1,S0,(v-80)/20),yc=v=>lerp(C1,C0,(v-35)/25);
    [100,90,80].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(ys(v)+3)}" class="t-xs t-end">${v}</text>`});
    [60,45,35].forEach(v=>{s+=`<text x="${X0-5}" y="${f1(yc(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<rect x="${X0}" y="${S0}" width="${X1-X0}" height="80" style="fill:var(--field);stroke:var(--line)"/><rect x="${X0}" y="${C0}" width="${X1-X0}" height="80" style="fill:var(--field);stroke:var(--line)"/>`;
    const below=REM.some(c=>spo(c,h)<90),high=co2(8,h)>45;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(90))}" y2="${f1(ys(90))}" style="stroke:${below?'var(--warn)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yc(45))}" y2="${f1(yc(45))}" style="stroke:${high?'var(--warn)':'var(--muted)'};stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<text x="${LX}" y="${S0+11}" class="t-lbl">${T.spo2}</text>`+tl(LX,ys(90)-1,T.spoTh,'t-xs',10,below?'fill:var(--warn)':'');
    s+=`<text x="${LX}" y="${C0+11}" class="t-lbl">${T.co2}</text>`+tl(LX,yc(45)-1,T.co2Th,'t-xs',10,high?'fill:var(--warn)':'');
    let ps='',pc='';for(let i=0;i<=160;i++){const hh=i/20;ps+=(i?'L':'M')+f1(xh(hh))+' '+f1(ys(clamp(spo(hh,h),80,100)));pc+=(i?'L':'M')+f1(xh(hh))+' '+f1(yc(clamp(co2(hh,h),35,60)))}
    s+=`<path d="${ps}" style="fill:none;stroke:var(--air);stroke-width:2"/><path d="${pc}" style="fill:none;stroke:var(--tdp);stroke-width:2"/>`;
    const cx=xh(((t*12)%1)*8);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${S0}" y2="${C1}" style="stroke:var(--ink);stroke-width:1;opacity:.18"/>`;
    [0,2,4,6,8].forEach(hh=>{s+=`<text x="${f1(xh(hh))}" y="${C1+14}" class="t-xs ${hh===8?'t-end':hh?'t-mid':''}">${T.hr(hh)}</text>`});
    s+=`<text x="${LX}" y="${C1+14}" class="t-xs">${T.hours}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 510','400 1090');
    let s='';
    if(N){s+=`<g transform="translate(48 6) scale(1.2)">${chest(t)}</g>`+survival(14,472,372)+fvcChart(t,40,262,612,790,270)+nightChart(t,40,262,846,270)}
    else{s+=`<g transform="translate(8 6)">${chest(t)}</g>`+survival(14,396,236)+fvcChart(t,300,580,30,212,590)+nightChart(t,300,580,256,590)}
    svg.innerHTML=s;
    const p=phaseOf(BR_STEPS,t);setSt(p);
    const on=niv==='on',f=fvc(t),sn=snip(t),pc=pcf(t),h=hyp(t);
    const hrs=t<NIV0?T.hrs.none:!on?T.hrs.off:t<.78?T.hrs.night:t<.9?T.hrs.more:T.hrs.most;
    $('#brRead').innerHTML=T.read(Math.round(MON(t)),Math.round(f),Math.round(sn),Math.round(pc),hrs);
    const L=T.lines,cr=[];if(f<80)cr.push(L.f80);if(f<65)cr.push(L.f65);if(f<50)cr.push(L.f50);if(sn<40)cr.push(L.s40);if(REM.some(c=>spo(c,h)<90))cr.push(L.spo);if(pc<270)cr.push(L.p270);if(pc<160)cr.push(L.p160);
    let ex=`<p>${cr.length?T.crossed(cr.join(', ')):T.noneCrossed}</p>`;
    if(t>=NIV0)ex+=`<p>${on?T.stateOn:T.stateOff}</p><p>${T.bulbNote[bulb]}</p>`;
    $('#brNote').innerHTML=noteHTML(BR_STEPS[p])+ex;
  }
  const stop=playWire(rg,$('#brPlay'),draw,24000,UI.replay,'breathing');
  const setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  toggleRow($('#brNiv'),T.niv,niv,v=>{niv=v;draw(+rg.value)});
  toggleRow($('#brBulb'),T.bulb,bulb,v=>{bulb=v;draw(+rg.value)});
  draw(+rg.value);

  /* ---- NIV trigger checker ---- */
  const C=BR_CALC;let pos='up',sex='',unit='mmHg',ct='bg';
  const num=id=>{const v=$(id).value.trim();if(v==='')return null;const n=+v;return isFinite(n)?n:null};
  const rows={};
  function calc(){
    const co=num('#brCo2');
    const S={fvc:num('#brFvc'),pos,snip:num('#brSnip'),mip:num('#brMip'),fall:$('#brFall').checked,sex,
      orth:$('#brOrth').checked,noct:$('#brNoct').checked,signs:$('#brSigns').checked,ox:$('#brOx').value,
      co2:co==null?null:unit==='kPa'?co*7.50062:co,ct};
    S.any=S.orth||S.noct||S.signs;
    const ps=[S.snip,S.mip].filter(v=>v!=null);S.pmin=ps.length?Math.min(...ps):null;
    S.otherTest=BR_GL.some(G=>!G.ean&&G.r.some(R=>R.x&&R.f(S)===true));
    const entered=S.fvc!=null||S.snip!=null||S.mip!=null||S.co2!=null||S.fall||S.any||S.ox!=='nd';
    let h='';
    BR_GL.forEach(G=>{const res=G.r.map(R=>R.f(S));const n=res.filter(v=>v===true).length;
      const lab=v=>G.ean?(v?`<span class="st met">${BR_ST.pres}</span>`:`<span class="st na">${BR_ST.abs}</span>`):v===true?`<span class="st met">${BR_ST.met}</span>`:v==='dep'?`<span class="st dep">${BR_ST.dep}</span>`:v===false?`<span class="st no">${BR_ST.no}</span>`:`<span class="st na">${BR_ST.na}</span>`;
      h+=`<div class="br-g${n?' hit':''}"><h4>${G.n}</h4><p style="font-size:13px;color:var(--muted)">${G.d}</p><p class="sum">${G.ean?C.eanSum(n):C.sum(n,G.r.length)}</p><ul>${G.r.map((R,i)=>`<li><span>${R.l}</span>${lab(res[i])}</li>`).join('')}</ul><p class="flag">${G.flag}</p></div>`});
    $('#brRes').innerHTML=(entered?'':`<p class="stage-cap" style="grid-column:1/-1">${C.empty}</p>`)+h;
  }
  const prs=(el,opts,val,set)=>toggleRow($(el),opts,val,v=>{set(v);calc()});
  prs('#brPos',C.pos,pos,v=>pos=v);prs('#brSex',C.sex,sex,v=>sex=v);prs('#brUnit',C.unit,unit,v=>unit=v);prs('#brCt',C.ct,ct,v=>ct=v);
  $$('#m-breathing .br-form input,#m-breathing .br-form select').forEach(el=>el.addEventListener(el.tagName==='SELECT'||el.type==='checkbox'?'change':'input',calc));
  const press=(el,v)=>$$('[data-v]',$(el)).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  $$('[data-brex]').forEach(b=>b.addEventListener('click',()=>{const E=C.ex[b.dataset.brex];
    $('#brFvc').value=E.fvc??'';$('#brSnip').value=E.snip??'';$('#brMip').value=E.mip??'';$('#brCo2').value=E.co2??'';
    $('#brOrth').checked=!!E.orth;$('#brNoct').checked=!!E.noct;$('#brSigns').checked=!!E.signs;$('#brFall').checked=!!E.fall;$('#brOx').value=E.ox||'nd';
    pos=E.pos||'up';sex=E.sex||'';unit=E.unit||'mmHg';ct=E.ct||'bg';press('#brPos',pos);press('#brSex',sex);press('#brUnit',unit);press('#brCt',ct);calc()}));
  calc();
};
