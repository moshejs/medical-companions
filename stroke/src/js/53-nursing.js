/* =============== 5.3 Nursing care =============== */
/* Six widgets: the first 72 h as nine 8-hour blocks (lanes, with toggles); swallow-first flow; post-thrombolysis
   observation schedules from OPTIMISTmain with a running count; warning signs on a face; a bedside body map with bars;
   an invented aphasia dialogue and a teaching checklist. Eight-hour blocks and even tick spacing are teaching devices. */
const NRS_STEPS=[
 {from:0,at:.055,k:'Hours 0 to 8',t:'0 to 8 h: swallow first',
  txt:`Swallow screen or assessment within 4 h of admission and before oral food, drink or medications [[Fasugba2023]]. Formal venous glucose on admission, and temperature and glucose charting start [[Fasugba2023]]. After thrombolysis: observations every 15 min for 2 h, then every 30 min for 6 h [[Anderson2025F]]. Watch lips and tongue: orolingual angio-oedema began a median of 65 min after alteplase started [[Hurford2015]].`,
  pt:`You may not be allowed to eat, drink or take tablets until a nurse has checked your swallow [[Martino2005,Fasugba2023]].`},
 {from:1/9,at:.166,k:'Hours 8 to 16',t:'8 to 16 h: thresholds',
  txt:`Temperature and glucose at least four times a day. Protocol triggers as listed: 37.5°C or more, "treat with paracetamol or other anti-pyretic"; above 10 mmol/L, "treat with insulin" [[Fasugba2023]]. Post-thrombolysis observations move to hourly at 8 h [[Anderson2025F]]. Record GCS as its three components [[Teasdale2014]]. Head position: HeadPoST found no outcome difference between flat and 30 degrees or more [[Anderson2017]].`},
 {from:2/9,at:.277,k:'Hours 16 to 24',t:'16 to 24 h: first-day close',
  txt:`The post-thrombolysis schedule runs until 24 h [[Anderson2025F]]. Progressing stroke occurred in 18.4% in the first week of one stroke unit, so a change from the last check matters [[Indredavik2008]]. Can this person walk to the toilet without help? That was the CLOTS 3 test for immobility [[Dennis2013]].`},
 {from:3/9,at:.388,k:'Hours 24 to 32',t:'24 to 32 h: out of bed',
  txt:`Exploratory network analysis suggested first mobilisation at around 24 h had the lowest odds of death or poor outcome [[Langhorne2018]]. The AVERT dose signal favours shorter, more frequent out-of-bed sessions, and nurses recorded session data alongside physiotherapists in the trial [[Bernhardt2016]]. Moving brings falls risk: 25% fell during admission in one cohort, 5% with serious injury [[Langhorne2000]].`,
  pt:`Getting up matters, but more is not always better in the first day. Short and frequent sessions looked better than long ones [[Bernhardt2016]].`},
 {from:4/9,at:.5,k:'Hours 32 to 40',t:'32 to 40 h: watch for swelling',
  txt:`After large infarcts nurses watch for new impaired consciousness and pupil changes; in cerebellar infarction, falling consciousness [[Wijdicks2014]]. The pooled craniectomy trials operated within 48 h, so early recognition has a deadline [[Vahedi2007]]. Keep temperature and glucose going [[Fasugba2023]].`},
 {from:5/9,at:.611,k:'Hours 40 to 48',t:'40 to 48 h: glucose review',
  txt:`The glucose element runs for the first 48 h, continuing for 72 h if unstable [[Fasugba2023]]. Most first-week complications occurred in the first 4 days, and stroke severity was the most important risk factor [[Indredavik2008]].`},
 {from:6/9,at:.722,k:'Hours 48 to 56',t:'48 to 56 h: catheter, bowel, skin',
  txt:`Catheters were placed for output monitoring, retention or continence issues, with no policy or standard tool and poor documentation [[Cowey2012]]. Catheterisation was associated with urinary infection (OR 3.03, 1.41 to 6.52) [[Stott2009]]. New constipation affected 46.3% of 600 people <span class="ev early">Early evidence</span> [[Lv2026]]. Check under devices: leg skin breaks were 3% vs 1% with pneumatic compression [[Dennis2013]].`},
 {from:7/9,at:.833,k:'Hours 56 to 64',t:'56 to 64 h: mood, mind, words',
  txt:`Delirium occurred in 11.8% in the first week of one cohort [[Oldenbeuving2011]]. Standard self-report mood tools may not suit people with aphasia, and two tools use visual prompts [[Burton2015]]. Communication problems raise preventable adverse events (OR 3.00, 1.43 to 6.27) [[Bartlett2008]]. Start teaching with the person and family: active information did better than passive on mood [[Forster2012]].`},
 {from:8/9,at:.944,k:'Hours 64 to 72',t:'64 to 72 h: hand on the plan',
  txt:`The temperature element covers the first 72 h [[Fasugba2023]]. Nurses ensure stroke education through transitions home [[Ashcraft2021]]. Early supported discharge cut stay by about seven days and death or dependency (OR 0.80, 0.67 to 0.97), mainly with a co-ordinated team and mild to moderate disability [[Fearon2012]]. Shoulder pain peaks later, at 4 months, so it belongs in the plan [[AdeyWakeling2015]].`,
  hook:`Standard post-lysis observations: every 15 min for 2 h, every 30 min for 6 h, then hourly until 24 h [[Anderson2025F]].`}];
const nrsStd=()=>{const a=[];for(let h=.25;h<=2;h+=.25)a.push(h);for(let h=2.5;h<=8;h+=.5)a.push(h);for(let h=9;h<=24;h++)a.push(h);return a};
const nrsLow=()=>{const a=[];for(let h=.25;h<=2;h+=.25)a.push(h);for(let h=4;h<=10;h+=2)a.push(h);for(let h=14;h<=24;h+=4)a.push(h);return a};

/* ---- swallow-first flow ---- */
const NRS_FL_STEPS=[
 {from:0,at:.06,k:'Step 1',t:'Admission',txt:`The clock starts at admission. The FeSS wording asks for a screen or assessment within 4 h [[Fasugba2023]]. In Ontario, 19.2% of those eligible had no documented screen, and people with mild stroke were less likely to be screened (adjusted OR 0.51, 0.41 to 0.64) [[Joundi2017]].`,
  hook:`Mild stroke is the group most often missed [[Joundi2017]].`},
 {from:.2,at:.26,k:'Step 2',t:'Nothing by mouth yet',txt:`The screen comes "prior to being given oral food, drink, or medications" [[Fasugba2023]]. That includes tablets. If aspirin is due, the Cochrane review states it may be given orally, by nasogastric tube or per rectum in people who cannot swallow [[Minhas2022,Sandercock2014]].`,
  pt:`Food or drink going down the wrong way can cause a chest infection [[Martino2005]].`},
 {from:.4,at:.48,k:'Step 3',t:'The screen',txt:`In the Cochrane review 21 of 37 screens were carried out by nurses. No single tool had high and precisely estimated sensitivity and specificity; water-only tools ranged 46% to 100% sensitivity and 43% to 100% specificity [[Boaden2021]].`},
 {from:.6,at:.72,k:'Step 4',t:'Result and next step',txt:`Those who fail are referred to a speech pathologist [[Fasugba2023]]. Failing was associated with pneumonia (adjusted OR 4.71), severe disability (5.19), long-term care (2.79) and 1-year death (HR 2.42), including in mild stroke [[Joundi2017]]. A pass does not remove all risk: no screening tool is precise [[Boaden2021]].`},
 {from:.85,at:.95,k:'Step 5',t:'Chart it',txt:`Record the time of screen and the result, before any oral intake or medicines. Delay carries pneumonia risk: absolute incidence rose by 1% per day of delay to specialist assessment [[Bray2017,Fasugba2023]].`}];
const NRS_NODES={
 a:{t:'Admission',l:['Stroke suspected.','The 4 h clock starts.']},
 b:{t:'Nothing by mouth',l:['No food, no drink,','no tablets yet.']},
 c:{t:'Swallow screen',l:['Within 4 h, and before','anything by mouth.']},
 d:{t:'Passed',l:['Oral food, drink and','tablets can follow.']},
 e:{t:'Failed',l:['Referral to a','speech pathologist.']},
 f:{t:'Medicines still due?',l:['Aspirin: tube or','rectal route exists.']},
 g:{t:'Chart it',l:['Time of screen, result, anything by mouth.']}};

/* ---- warning signs ---- */
const NRS_SIGNS={
 hemi:{t:'Swollen hemispheric infarct',k:'Large infarct',signs:['New or further impaired consciousness','Cerebral ptosis','Changes in pupil size'],
  txt:`These are the AHA statement's warning signs in swollen hemispheric infarction [[Wijdicks2014]]. Its pooled surgical trials operated within 48 h [[Vahedi2007]].`},
 cereb:{t:'Swollen cerebellar infarct',k:'Back of the brain',signs:['Falling consciousness','Possible early loss of corneal reflexes','Miosis (small pupils)'],
  txt:`Falling consciousness from brainstem compression, possibly with early loss of corneal reflexes and miosis [[Wijdicks2014]].`},
 lysis:{t:'Angio-oedema after thrombolysis',k:'During and after the drip',signs:['Lip or tongue swelling','5 to 189 min after alteplase started','Prior ACE inhibitor: OR 2.3'],
  txt:`Orolingual angio-oedema occurred in 7.9% of 530 people. 12% of those cases were severe (1% of all treated) and needed urgent advanced airway management [[Hurford2015]]. The label says to stop the infusion and treat if anaphylactoid reaction or angioedema develops [[FDA-Activase]].`,
  pt:`After the clot-busting drip, nurses check you often through the first day. Tell them at once if your lips or tongue feel swollen [[Anderson2025F,FDA-Activase]].`}};

/* ---- bedside body map ---- */
const NRS_BODY=[
 {id:'head',n:'1',b:'Head position',at:[-.035,-.44],
  bars:{h:'HeadPoST, lying flat vs head up',max:100,r:[{l:'Kept to lying flat for 24 h',v:87,s:'87%'},{l:'Kept to head up for 24 h',v:95,s:'95%'},{l:'Died, lying flat',v:7.3,s:'7.3%'},{l:'Died, head up',v:7.4,s:'7.4%'}]},
  txt:`Lying flat for 24 h did not improve outcome over sitting up with the head at 30 degrees or more, and fewer people kept to it. Serious adverse events including pneumonia did not differ [[Anderson2017]].`,
  pt:`Lying flat does not help more than sitting up with your head raised [[Anderson2017]].`},
 {id:'mouth',n:'2',b:'Mouth care',at:[.04,-.395],
  bars:{h:'Pneumonia in the one trial reporting it',max:10,r:[{l:'Oral care programme',v:5.05,s:'5 of 99'},{l:'Comparison',v:.95,s:'1 of 105'}]},
  txt:`Oral care is widely taught as pneumonia prevention, but the trial evidence specifically in stroke is thin. Cochrane 2020 found less denture plaque and better knowledge, and no difference in pneumonia in the one trial reporting it (OR 4.17, 0.82 to 21.11; low quality) [[Campbell2020]]. A European review finds only weak evidence [[Lyons2018]]. ESO/ESSD lists oral health care among dysphagia treatment options [[Dziewas2021]]. Status: unresolved.`},
 {id:'shoulder',n:'3',b:'Shoulder',at:[.125,-.285],
  bars:{h:'Shoulder pain, population study',max:30,r:[{l:'Baseline',v:10,s:'10%'},{l:'4 months',v:21,s:'21%'},{l:'12 months',v:21,s:'21%'},{l:'At some point in 12 months',v:29,s:'29%'}]},
  txt:`Peak onset and severity were at 4 months, after most rehabilitation ends. Passive range-of-motion testing elicited more pain than self-report and predicted later pain (crude RR 3.22, 1.01 to 10.27) [[AdeyWakeling2015]]. Cochrane found insufficient evidence on slings and wheelchair attachments; strapping delayed onset by 14 days without reducing severity [[Ada2005]].`,
  pt:`Shoulder pain often starts some months after a stroke, so keep mentioning it after you go home [[AdeyWakeling2015]].`},
 {id:'bladder',n:'4',b:'Bladder',at:[0,-.03],
  bars:{h:'Urinary incontinence over time',max:50,r:[{l:'At first',v:40,s:'40%'},{l:'3 months',v:19,s:'19%'},{l:'1 year',v:15,s:'15%'},{l:'2 years',v:10,s:'10%'}]},
  txt:`Urinary infection affected 15.8% of 412 people, at a median of 14 days, and was associated with catheterisation (OR 3.03) [[Stott2009]]. A programme in three Japanese hospitals cut inappropriate catheter use from 50.1% to 22.5% and symptomatic infection from 9.5% to 4.9%, without more retention [[IkedaSakai2022]]. Cochrane found insufficient evidence to guide continence care in rehabilitation [[Thomas2019]]. Bars from [[Patel2001]].`,
  pt:`Trouble passing urine or holding it is common and often gets better over time. A catheter can raise the chance of infection, so it should be there only if needed [[Patel2001,Stott2009]].`},
 {id:'bowel',n:'5',b:'Bowel',at:[-.1,.03],
  bars:{h:'New-onset faecal incontinence',max:50,r:[{l:'7 to 10 days',v:30,s:'30%'},{l:'3 months',v:11,s:'11%'},{l:'1 year',v:11,s:'11%'},{l:'3 years',v:15,s:'15%'}]},
  txt:`At 3 months it was tied to anticholinergic drugs (OR 3.1) and needing help with the toilet (OR 3.5), both potentially changeable [[Harari2003]]. In 600 people, 46.3% had constipation, with risk factors including bedpan use, depression, poor sleep and NIHSS <span class="ev early">Early evidence</span> [[Lv2026]].`},
 {id:'skin',n:'6',b:'Skin',at:[.09,.1],
  bars:{h:'Pressure sores: three different groups',max:30,r:[{l:'Inpatients, 2000 cohort',v:21,s:'21%'},{l:'First week, one stroke unit',v:2.5,s:'2.5% or fewer'},{l:'Year after severely disabling stroke',v:22,s:'22%'}]},
  txt:`These are not one rate: the people and time frames differ [[Langhorne2000,Indredavik2008,Sackley2008]]. Devices harm skin too: leg skin breaks 3% vs 1% with pneumatic compression [[Dennis2013]] and 5% vs 1% with stockings [[Dennis2009]]. Nutrition supplements were associated with fewer pressure sores (OR 0.56, 0.32 to 0.96) [[Geeganage2012]].`},
 {id:'legs',n:'7',b:'Legs and clots',at:[-.08,.26],
  bars:{h:'Proximal DVT in the CLOTS trials',max:15,r:[{l:'CLOTS 3: pneumatic compression',v:8.5,s:'8.5%'},{l:'CLOTS 3: none',v:12.1,s:'12.1%'},{l:'CLOTS 1: thigh stockings',v:10,s:'10.0%'},{l:'CLOTS 1: none',v:10.5,s:'10.5%'}]},
  txt:`Immobile in CLOTS 3 meant unable to walk to the toilet without another person's help [[Dennis2013]]. Stockings did not help against none, and caused more skin problems [[Dennis2009]].`,
  pt:`Machines that gently squeeze your legs can lower the risk of clots in people who cannot walk alone [[Dennis2013]].`},
 {id:'falls',n:'8',b:'Falls',at:[.08,.42],
  bars:{h:'People who fell, in four settings',max:100,r:[{l:'In hospital, one cohort',v:25,s:'25%'},{l:'Community, Auckland',v:37,s:'37%'},{l:'Within 6 months of discharge',v:73,s:'73%'},{l:'12 months, severely disabling',v:73,s:'73%'}]},
  txt:`Falls occur at all stages: acute, rehabilitative and chronic [[Batchelor2012]]. Bars from [[Langhorne2000,Kerse2008,Forster1995,Sackley2008]]. A fall in hospital combined with poor balance predicted recurrent falls in a small study of 55 people [[Mackintosh2006]]. Exercise may reduce the rate of falls (rate ratio 0.72, 0.54 to 0.94; low quality) but not the number of fallers [[Denissen2019]].`,
  pt:`Many people fall after a stroke, even at home. A fall in hospital is a warning sign to plan for [[Forster1995,Kerse2008]].`}];

/* ---- aphasia ---- */
const NRS_DIAL={
 off:[{w:'Nurse',s:`Do you want the blue one or the white one, and did your daughter bring your glasses, or are they still at home?`},{w:'Person',s:`(Tries to answer. Words will not come.)`},{w:'Nurse',s:`Never mind. I will ask your daughter.`}],
 on:[{w:'Nurse',s:`I know you know what you want to say. Take your time. Is it about your glasses?`},{w:'Person',s:`(Nods.)`},{w:'Nurse',s:`Here is a pen. Show me: at home, or in the bag? (Holds up two written words.)`},{w:'Person',s:`(Points to "home".)`},{w:'Nurse',s:`At home. Have I got that right? I will ask your daughter to bring them.`}]};
/* ---- teaching checklist ---- */
const NRS_TEACH=[
 `FAST: Face, Arm, Speech, Time. Call emergency services for sudden symptoms. FAST catches most strokes but not all: it missed 30.6% of haemorrhages [[Kleindorfer2007]].`,
 `Which stroke type and cause, and what the risk factors are. Information improves patient knowledge (SMD 0.29) and carer knowledge (SMD 0.74) [[Forster2012]].`,
 `Medicines: what each is for. Knowledge alone does not guarantee control: educational interventions showed no clear difference in adherence or recurrent events [[Bridgwood2018]].`,
 `Blood pressure at home. COMPASS raised home monitoring from 64% to 72% (aOR 1.43) [[Duncan2020]].`,
 `Swallow plan: what is safe to eat, drink and swallow, and who assessed it [[Fasugba2023]].`,
 `Falls: what happened in hospital, and the plan at home. 73% of older people with residual disability fell within 6 months of discharge [[Forster1995]].`,
 `Bladder and bowel: common, and often improves [[Patel2001,Harari2003]].`,
 `Mood: about 3 in 10 people feel low after a stroke. Tell someone [[Hackett2014,Towfighi2017]].`,
 `Shoulder pain may start later. Keep mentioning it [[AdeyWakeling2015]].`,
 `Communication: how this person shows yes and no, and what helps [[Kagan2001]].`,
 `Carers: burden is real, and evidence on support is limited [[Bakas2022]]. Follow-up: who to call, and when [[Duncan2020]].`];

inits.nursing=()=>{
  /* ---- 1. 72-hour scrubber ---- */
  (function(){const svg=$('#nrsSvg'),rg=$('#nrsT');const tg={lys:true,imm:true,fail:false};
    function draw(t){const N=vb(svg,'720 470','400 556'),h=t*72,px=N?14:164,pw=N?372:542,X=v=>px+pw*v/72,top=N?60:62,lh=N?58:46,bh=N?22:24;let s='',lab='';
      /* blocks */
      for(let i=0;i<9;i++){const a=X(i*8),on=h>=i*8&&h<(i+1)*8||(i===8&&h>=72);
        s+=`<rect x="${f1(a+1)}" y="14" width="${f1(pw/9-2)}" height="24" rx="5" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(a+pw/18)}" y="30" class="t-sm t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${i+1}</text>`}
      if(!N)s+=`<text x="14" y="30" class="t-lbl">8-hour block</text>`;
      [0,24,48,72].forEach(v=>{s+=`<text x="${f1(clamp(X(v),px+7,px+pw-10))}" y="52" class="t-xs t-mid">${v} h</text><line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-4}" y2="${top+lh*8-4}" class="grid"/>`});
      const tick=(x,y,seen,o={})=>`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y}" y2="${y+bh}" style="stroke:var(--brand);stroke-width:${o.w||2};opacity:${seen?1:.35}${o.dash?';stroke-dasharray:2 3':''}"/>`;
      const band=(a,b,y,fill,txt,o={})=>{let g=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${bh}" rx="4" style="fill:${fill}${o.dash?';stroke:var(--muted);stroke-dasharray:4 3':''}"/>`;if(txt)lab+=`<text x="${f1(X(a)+6+(o.off||0))}" y="${y+bh/2+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${txt}</text>`;return g};
      const lanes=['Swallow','Temperature',N?'Glucose (dashed after 48 h: if unstable)':'Glucose','Post-lysis checks','GCS, NIHSS','Legs','Out of bed','Bladder, skin, falls'];
      lanes.forEach((L,i)=>{const y=top+i*lh,by=N?y+18:y+6;
        s+=N?`<text x="14" y="${y+12}" class="t-lbl">${L}</text>`:(i===2?`<text x="14" y="${by+9}" class="t-lbl">${L}</text><text x="14" y="${by+24}" class="t-sm">dashed: if unstable</text>`:`<text x="14" y="${by+bh/2+4}" class="t-lbl">${L}</text>`);
        if(i===0){s+=band(0,3,by,'var(--accent)','');
          if(tg.fail)s+=band(3,72,by,'var(--warn-soft)',N?'failed: speech pathologist referral':'failed the screen: referral to a speech pathologist',{dash:1,off:N?6:10});
          else s+=band(3,72,by,'var(--rec-soft)',N?'passed at 3 h: oral intake can follow':'passed at 3 h in this example: oral food, drink and tablets can follow',{off:N?6:10});
          s+=`<line x1="${f1(X(4))}" x2="${f1(X(4))}" y1="${by-3}" y2="${by+bh+3}" style="stroke:var(--accent);stroke-width:1.5;stroke-dasharray:3 2"/>`}
        if(i===1){for(let v=0;v<=72;v+=6)s+=tick(clamp(X(v),px+1,px+pw-1),by,v<=h)}
        if(i===2){for(let v=0;v<=72;v+=6)s+=tick(clamp(X(v),px+1,px+pw-1),by,v<=h,{dash:v>48})}
        if(i===3){if(tg.lys){nrsStd().forEach(v=>{s+=tick(X(v),by,v<=h,{w:1.1})});lab+=`<text x="${f1(X(25))}" y="${by+bh/2+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${N?'15 min, 30 min, hourly':'every 15 min, 30 min, then hourly, to 24 h'}</text>`}
          else s+=band(0,72,by,'var(--panel-2)','no thrombolysis: this schedule does not apply')}
        if(i===4)s+=band(0,72,by,'var(--panel-2)',N?'serial checks; no schedule in sources':'serial checks; no general schedule in the sources read',{dash:1});
        if(i===5){if(tg.imm)s+=band(0,72,by,'var(--brand-soft)',N?'cannot walk alone: CLOTS 3 group':'cannot walk to the toilet alone: the CLOTS 3 group');else s+=band(0,72,by,'var(--panel-2)','walks alone: outside the CLOTS 3 entry test')}
        if(i===6){s+=`<circle cx="${f1(X(24))}" cy="${by+bh/2}" r="5" style="fill:var(--rec)"/>`;for(let v=28;v<=70;v+=4.8)s+=`<rect x="${f1(X(v))}" y="${by+5}" width="5" height="${bh-10}" rx="2" style="fill:var(--rec);opacity:${v<=h?1:.35}"/>`;
          lab+=`<text x="${f1(X(1))}" y="${by+bh/2+4}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${N?'around 24 h':'first time: around 24 h'}</text>`}
        if(i===7)s+=band(0,72,by,'var(--panel-2)',N?'each block: catheter, skin, falls, mood':'each block: catheter need, skin, falls risk, mood and communication tools',{dash:1})});
      const b=top+lh*8-4,cx=X(h);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="40" y2="${b}" style="stroke:var(--accent);stroke-width:2"/>`;
      const pw2=60,plx=clamp(cx-pw2/2,N?2:px-pw2/2,(N?398:718)-pw2);s+=`<rect x="${f1(plx)}" y="${b}" width="${pw2}" height="20" rx="10" style="fill:var(--accent)"/><text x="${f1(plx+pw2/2)}" y="${b+14}" class="t-sm t-mid" style="fill:var(--bg);font-weight:700">${Math.round(h)} h</text>`+lab;
      svg.innerHTML=s;const p=phaseOf(NRS_STEPS,t);setSt(p);$('#nrsNote').innerHTML=noteHTML(NRS_STEPS[p])}
    const stop=playWire(rg,$('#nrsPlay'),draw,24000,'%t:player.replay%','nursing');
    const setSt=stepWire($('#nrsSteps'),NRS_STEPS,rg,draw,stop);
    $$('[data-nrstg]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.nrstg;tg[k]=!tg[k];b.setAttribute('aria-pressed',tg[k]);draw(+rg.value)}));
    draw(+rg.value)})();

  /* ---- 2. swallow-first flow ---- */
  (function(){const svg=$('#nrsFlSvg'),rg=$('#nrsFlT'),bs=$$('[data-nrsfl]');let res='pass';
    function draw(t){const N=vb(svg,'720 340','400 640');const G=N?{a:[110,8,180,76],b:[110,104,180,76],c:[110,200,180,76],d:[8,312,180,76],e:[212,312,180,76],f:[212,420,180,76],g:[8,540,384,76]}:{a:[12,24,150,86],b:[176,24,150,86],c:[340,24,150,86],d:[552,8,156,86],e:[552,122,156,86],f:[552,236,156,86],g:[176,236,314,86]};
      const p=phaseOf(NRS_FL_STEPS,t),lit={a:p>=0,b:p>=1,c:p>=2,d:p>=3&&res==='pass',e:p>=3&&res==='fail',f:p>=3&&res==='fail',g:p>=4};
      const C=k=>[G[k][0]+G[k][2]/2,G[k][1]+G[k][3]/2];
      const line=(pts,on)=>`<path d="${ptsD(pts)}" marker-end="url(#nrsAr)" style="fill:none;stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2:1.5}"/>`;
      let s=`<defs>${marker('nrsAr','var(--muted)')}</defs>`;
      const [ax,ay,aw,ah]=G.a,[bx,by,bw,bh]=G.b,[cx,cy,cw,ch]=G.c,[dx,dy,dw,dh]=G.d,[ex,ey,ew,eh]=G.e,[fx,fy,fw,fh]=G.f,[gx,gy,gw,gh]=G.g;
      if(N){s+=line([ [C('a')[0],ay+ah],[C('b')[0],by-2] ],p>=1)+line([ [C('b')[0],by+bh],[C('c')[0],cy-2] ],p>=2);
        s+=line([ [C('c')[0]-40,cy+ch],[C('c')[0]-40,cy+ch+18],[C('d')[0],cy+ch+18],[C('d')[0],dy-2] ],lit.d)+line([ [C('c')[0]+40,cy+ch],[C('c')[0]+40,cy+ch+18],[C('e')[0],cy+ch+18],[C('e')[0],ey-2] ],lit.e);
        s+=line([ [C('e')[0],ey+eh],[C('e')[0],fy-2] ],lit.f)+line([ [C('d')[0],dy+dh],[C('d')[0],gy-2] ],lit.g&&res==='pass')+line([ [C('f')[0],fy+fh],[C('f')[0],gy-2] ],lit.g&&res==='fail');
        s+=`<text x="${f1(C('d')[0]+6)}" y="${cy+ch+33}" class="t-sm" style="fill:var(--ink)">pass</text><text x="${f1(C('e')[0]+6)}" y="${cy+ch+33}" class="t-sm" style="fill:var(--ink)">fail</text>`}
      else{s+=line([ [ax+aw,C('a')[1]],[bx-2,C('b')[1]] ],p>=1)+line([ [bx+bw,C('b')[1]],[cx-2,C('c')[1]] ],p>=2);
        s+=line([ [cx+cw,C('c')[1]-14],[522,C('c')[1]-14],[522,C('d')[1]],[dx-2,C('d')[1]] ],lit.d)+line([ [cx+cw,C('c')[1]+14],[522,C('c')[1]+14],[522,C('e')[1]],[ex-2,C('e')[1]] ],lit.e);
        s+=line([ [C('e')[0],ey+eh],[C('f')[0],fy-2] ],lit.f)+line([ [fx,C('f')[1]],[gx+gw+2,C('g')[1]] ],lit.g&&res==='fail')+line([ [C('c')[0],cy+ch],[C('c')[0],gy-2] ],lit.g&&res==='pass');
        s+=`<text x="494" y="${f1(C('c')[1]-19)}" class="t-sm" style="fill:var(--ink)">pass</text><text x="494" y="${f1(C('c')[1]+28)}" class="t-sm" style="fill:var(--ink)">fail</text>`}
      Object.keys(G).forEach(k=>{const [x,y,w,h]=G[k],N0=NRS_NODES[k],on=lit[k];
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${on?'var(--brand-soft)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        s+=`<text x="${x+10}" y="${y+24}" class="t-lbl">${N0.t}</text>`;N0.l.forEach((l,i)=>{s+=`<text x="${x+10}" y="${y+44+i*17}" class="t-sm" style="fill:var(--ink)">${l}</text>`})});
      /* travelling token */
      const route=[C('a'),C('b'),C('c'),C(res==='pass'?'d':'e')],q=clamp(t/.72)*(route.length-1),i=Math.min(route.length-2,Math.floor(q)),u=ease(q-i),tx=lerp(route[i][0],route[i+1][0],u),ty=lerp(route[i][1],route[i+1][1],u);
      const tp=t>.72&&res==='fail'?[C('e')[0],lerp(C('e')[1],C('f')[1],ramp(t,.74,.84))]:[tx,ty];
      s+=`<circle cx="${f1(tp[0]+ (N?78:64))}" cy="${f1(tp[1]-28)}" r="7" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
      svg.innerHTML=s;setSt(p);$('#nrsFlNote').innerHTML=noteHTML(NRS_FL_STEPS[p])}
    const stop=playWire(rg,$('#nrsFlPlay'),draw,14000,'%t:player.replay%','nursing');
    const setSt=stepWire($('#nrsFlSteps'),NRS_FL_STEPS,rg,draw,stop);
    bs.forEach(b=>b.addEventListener('click',()=>{res=b.dataset.nrsfl;bs.forEach(o=>o.setAttribute('aria-pressed',o===b));draw(+rg.value)}));
    draw(+rg.value)})();

  /* ---- 3. monitoring after thrombolysis ---- */
  (function(){const svg=$('#nrsMoSvg'),rg=$('#nrsMoT'),bs=$$('[data-nrsmo]');let mx=24;const A=nrsStd(),B=nrsLow();
    function draw(t){const N=vb(svg,'720 270','400 350'),h=t*mx,px=N?14:152,pw=N?372:554,X=v=>px+pw*v/mx,lh=N?104:72,top=N?30:34,bh=30;let s='';
      const step=mx===24?4:1;for(let v=0;v<=mx+1e-9;v+=step){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top}" y2="${top+lh*3-12}" class="grid"/><text x="${f1(clamp(X(v),px+8,px+pw-10))}" y="${top-8}" class="t-sm t-mid">${v} h</text>`}
      s+='<!--c-->';const rows=[{l:'Standard',ar:A,c:'var(--brand)',bars:[ [0,2,'15 min'],[2,8,'30 min'],[8,24,'hourly'] ]},{l:'Low-intensity',ar:B,c:'var(--rx)',bars:[ [0,2,'15 min'],[2,10,'2-hourly'],[10,24,'4-hourly'] ]}];
      rows.forEach((R,i)=>{const y=top+i*lh,by=N?y+24:y+4,n=R.ar.filter(v=>v<=h+1e-6).length;
        if(N){s+=`<text x="14" y="${y+16}" class="t-lbl">${R.l}</text><text x="386" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${n} checks so far</text>`}
        else{s+=`<text x="14" y="${by+13}" class="t-lbl">${R.l}</text><text x="14" y="${by+29}" class="t-sm" style="fill:var(--ink)">${n} so far</text>`}
        R.bars.forEach(b=>{const a=X(b[0]),e=X(Math.min(b[1],mx));if(a>=px+pw)return;const tw=b[2].length*6+10;
          s+=`<rect x="${f1(a+1)}" y="${by+bh+3}" width="${f1(Math.max(0,e-a-2))}" height="16" rx="3" style="fill:var(--panel-2)"/>`;if(e-a>=tw)s+=`<text x="${f1((a+e)/2)}" y="${by+bh+15}" class="t-xs t-mid" style="fill:var(--ink)">${b[2]}</text>`});
        R.ar.forEach(v=>{if(v>mx)return;const on=v<=h+1e-6,x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${by}" y2="${by+bh}" style="stroke:${R.c};stroke-width:${mx===24?1.6:3};opacity:${on?1:.28}"/>`})});
      const y=top+2*lh,by=N?y+24:y+4,a=X(5/60),e=X(189/60),m=X(65/60);
      if(N)s+=`<text x="14" y="${y+16}" class="t-lbl">Tongue and lip swelling: onset</text>`;else{s+=`<text x="14" y="${by+13}" class="t-lbl">Tongue, lip</text><text x="14" y="${by+29}" class="t-lbl">swelling onset</text>`}
      s+=`<rect x="${f1(a)}" y="${by+4}" width="${f1(e-a)}" height="20" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><line x1="${f1(m)}" x2="${f1(m)}" y1="${by}" y2="${by+28}" style="stroke:var(--ink);stroke-width:2"/>`;
      s+=mx===24&&!N?`<text x="${f1(e+8)}" y="${by+18}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">5 to 189 min from the start of alteplase, median 65 (UK series)</text>`:`<text x="${f1(N&&mx===24?e+8:px)}" y="${by+(N&&mx===24?18:44)}" class="t-sm" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px">${N&&mx===24?'5 to 189 min, median 65':'5 to 189 min from the start of alteplase, median 65'}</text>`;
      const cx=X(h);s=s.replace('<!--c-->',`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${top}" y2="${top+lh*3-12}" style="stroke:var(--accent);stroke-width:2"/>`);
      svg.innerHTML=s;
      const low=B.filter(v=>v<=h+1e-6).length,ends=h>=24-1e-6;
      $('#nrsMoRead').innerHTML=`<span>Time <b>${h<10?h.toFixed(1):Math.round(h)} h</b></span><span>Standard <b>${A.filter(v=>v<=h+1e-6).length}</b></span><span>Low-intensity <b>${ends?'about 15 to 16':low}</b></span><span>Totals derived from the published intervals, not stated in the paper</span>`}
    playWire(rg,$('#nrsMoPlay'),draw,14000,'%t:player.replay%','nursing');
    bs.forEach(b=>b.addEventListener('click',()=>{mx=+b.dataset.nrsmo;bs.forEach(o=>o.setAttribute('aria-pressed',o===b));draw(+rg.value)}));
    draw(+rg.value)})();

  /* ---- 4. warning signs on a face ---- */
  (function(){const svg=$('#nrsFaSvg'),rg=$('#nrsFaT'),bs=$$('[data-nrsfa]');let mode='hemi';
    function eye(cx,cy,pr,lid){let g=`<ellipse cx="${cx}" cy="${cy}" rx="24" ry="14" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.4"/><circle cx="${cx}" cy="${cy}" r="11" style="fill:var(--glia)"/><circle cx="${f1(cx)}" cy="${cy}" r="${f1(pr)}" style="fill:var(--ink)"/>`;
      g+=`<path d="M${cx-25} ${cy-1}Q${cx} ${f1(cy-17)} ${cx+25} ${cy-1}L${cx+25} ${f1(cy-1)}Q${cx} ${f1(cy-17+lid*30)} ${cx-25} ${cy-1}Z" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.2"/>`;return g}
    function draw(t){const N=vb(svg,'720 330','400 530'),S=NRS_SIGNS[mode],u=ease(t);const cx=N?200:166,cy=N?126:140,lx=N?14:340,lw=N?372:366,ly=N?322:40;let s='';
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="94" ry="114" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:2"/>`;
      const hemi=mode==='hemi',cer=mode==='cereb',lys=mode==='lysis';
      const lid=hemi?u*.72:cer?u*.3:0,pL=hemi?lerp(4.5,8.6,u):cer?lerp(4.5,1.8,u):4.5,pR=hemi?4.5:cer?lerp(4.5,1.8,u):4.5;
      s+=eye(cx-38,cy-26,pR,lid)+eye(cx+38,cy-26,pL,lid);
      s+=`<path d="M${cx} ${cy-14}V${cy+18}l-8 5" style="fill:none;stroke:var(--brain-line);stroke-width:1.6;stroke-linecap:round"/>`;
      const sw=lys?u:0,mh=5+sw*17,mw=32+sw*10;
      s+=`<path d="M${cx-mw} ${cy+56}Q${cx} ${f1(cy+56-mh)} ${cx+mw} ${cy+56}Q${cx} ${f1(cy+56+mh+3)} ${cx-mw} ${cy+56}Z" style="fill:var(--heart);stroke:var(--brain-line);stroke-width:1.3"/>`;
      if(lys&&sw>.3)s+=`<ellipse cx="${cx}" cy="${f1(cy+58)}" rx="${f1(10+sw*14)}" ry="${f1(sw*7)}" style="fill:var(--core);opacity:.55"/>`;
      /* alertness track */
      const tx=N?60:66,ty=N?276:290,tw=N?280:200,al=hemi?u*.8:cer?u*.85:.04;
      s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="8" rx="4" style="fill:var(--panel-2)"/><circle cx="${f1(tx+tw*al)}" cy="${ty+4}" r="7" style="fill:var(--accent)"/><text x="${tx}" y="${ty-6}" class="t-sm">alert</text><text x="${tx+tw}" y="${ty-6}" class="t-sm t-end">hard to rouse</text>`;
      s+=`<text x="${lx}" y="${ly-14+ (N?0:0)}" class="t-big">${S.t}</text>`;
      S.signs.forEach((tx2,i)=>{const on=clamp(u*3.2-i*.8),yy=ly+6+i*56;
        s+=`<rect x="${lx}" y="${yy}" width="${lw}" height="46" rx="10" style="fill:${on>.5?'var(--warn-soft)':'var(--panel-2)'}"/><text x="${lx+14}" y="${yy+28}" class="t-lbl">${tx2}</text>`});
      s+=`<text x="${lx}" y="${ly+186}" class="t-sm">${lys?'Schematic face.':'Schematic face. Which pupil changes is not a claim.'}</text>`;
      svg.innerHTML=s}
    function note(){const S=NRS_SIGNS[mode];$('#nrsFaNote').innerHTML=noteHTML({k:S.k,t:S.t,txt:S.txt,pt:S.pt})}
    bs.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.nrsfa;bs.forEach(o=>o.setAttribute('aria-pressed',o===b));note();draw(+rg.value)}));
    playWire(rg,$('#nrsFaPlay'),draw,8000,'%t:player.replay%','nursing');note();draw(+rg.value)})();

  /* ---- 5. bedside body map ---- */
  (function(){const svg=$('#nrsBoSvg'),row=$('#nrsBoBtns');let sel='bladder';
    row.innerHTML=NRS_BODY.map(b=>`<button class="btn" data-nrsb="${b.id}" aria-pressed="${b.id===sel}">${b.n} ${b.b}</button>`).join('');
    function draw(){const N=vb(svg,'720 400','400 690'),B=NRS_BODY.find(b=>b.id===sel),cx=N?200:160,cy=N?190:200,H=N?350:370;let s='';
      s+=bodyHemi(cx,cy,H,{left:.45,labels:false});
      s+=`<text x="${cx-90}" y="${N?26:24}" class="t-sm t-mid">person's right</text><text x="${cx+90}" y="${N?26:24}" class="t-sm t-mid">person's left</text>`;
      NRS_BODY.forEach(b=>{const x=cx+b.at[0]*H,y=cy+b.at[1]*H,on=b.id===sel;
        s+=`<g class="clk" tabindex="0" role="button" aria-pressed="${on}" aria-label="${b.b}" data-nrsb="${b.id}"><circle cx="${f1(x)}" cy="${f1(y)}" r="20" style="fill:transparent"/><circle cx="${f1(x)}" cy="${f1(y)}" r="13" style="fill:${on?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:2"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:${on?'var(--bg)':'var(--ink)'}">${b.n}</text></g>`});
      const X=N?14:330,Y=N?392:30,W=N?372:376,D=B.bars;
      s+=`<text x="${X}" y="${Y+10}" class="t-big">${D.h}</text>`;
      D.r.forEach((r,i)=>{const y=Y+38+i*58,w=(W-6)*r.v/D.max;
        s+=`<text x="${X}" y="${y}" class="t-lbl">${r.l}</text><rect x="${X}" y="${y+7}" width="${W-6}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${X}" y="${y+7}" width="${f1(w)}" height="18" rx="4" style="fill:var(--brand)"/>`;
        const lblIn=w>W*.5;s+=`<text x="${f1(lblIn?X+w-6:X+w+6)}" y="${y+21}" class="t-sm${lblIn?' t-end':''}" style="fill:${lblIn?'var(--on-brand)':'var(--ink)'};font-weight:700">${r.s}</text>`});
      s+=`<text x="${X}" y="${Y+38+D.r.length*58+2}" class="t-sm">Bar lengths use one scale per panel, up to ${D.max===10?'10%':D.max+'%'}.</text>`;
      svg.innerHTML=s;
      $('#nrsBoNote').innerHTML=noteHTML({k:'Bedside round',t:B.b,txt:B.txt,pt:B.pt});
      $$('[data-nrsb]',row).forEach(o=>o.setAttribute('aria-pressed',o.dataset.nrsb===sel))}
    const pick=e=>{const c=e.target.closest('[data-nrsb]');if(!c)return;sel=c.dataset.nrsb;draw();const again=svg.querySelector(`[data-nrsb="${sel}"]`);if(e.type==='keydown'&&again)again.focus()};
    row.addEventListener('click',pick);svg.addEventListener('click',pick);
    svg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(e)}});
    draw();const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();draw()}})();

  /* ---- 6. aphasia dialogue and checklist ---- */
  (function(){const box=$('#nrsDial'),bs=$$('[data-nrsdi]');
    function show(k){box.innerHTML=NRS_DIAL[k].map(l=>`<div class="nrs-bub ${l.w==='Nurse'?'a':'b'}"><b>${l.w}</b><span>${l.s}</span></div>`).join('')}
    bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(o=>o.setAttribute('aria-pressed',o===b));show(b.dataset.nrsdi)}));show('on');
    const list=$('#nrsTeach'),rd=$('#nrsTeachRead');let ok=store.get('nrsTeach',[]);if(!Array.isArray(ok))ok=[];
    list.innerHTML=NRS_TEACH.map((tx,i)=>`<li><label><input type="checkbox" data-nrst="${i}"${ok.includes(i)?' checked':''}><span>${tx}</span></label></li>`).join('');
    function rc(){rd.textContent=`${ok.length} of ${NRS_TEACH.length} covered`}
    list.addEventListener('change',e=>{const c=e.target.closest('[data-nrst]');if(!c)return;const i=+c.dataset.nrst;ok=ok.filter(v=>v!==i);if(c.checked)ok.push(i);store.set('nrsTeach',ok);rc()});rc()})();
};
