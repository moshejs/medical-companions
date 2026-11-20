/* =============== 5.4 Research toward better treatment =============== */
/* A research pipeline: programme rows, stage columns, a year slider. Each cited trial is an
   event (year, stage, result); the programme's marker slides to the stage of its latest event.
   Then a headline reader (absolute vs relative) and a filterable trial table.
   All numbers come from research pass F (frontier) and G (inclisiran); citations live in HTML text only. */
const FR_Y0=2015,FR_Y1=2028.5;
const frT2Y=t=>FR_Y0+t*(FR_Y1-FR_Y0),frY2T=y=>(y-FR_Y0)/(FR_Y1-FR_Y0);
const FR_STAGES=[['Idea & lab','Idea'],['Early trials','Early'],['Outcome trials','Outcome'],['Guidelines','Guide']];
/* result kinds: pos = met primary outcome, neu = did not, bio = biomarker or accuracy result only,
   due = registered and awaited, gd = in a guideline */
const FR_RES={pos:['met its primary outcome','var(--good)'],neu:['did not meet its primary outcome','var(--muted)'],
  bio:['biomarker or accuracy result','var(--plt)'],due:['awaited (registry date)','var(--warn)'],gd:['in a guideline','var(--brand)']};
const FR_EVL={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
const FR_PROGS=[
 {n:'Colchicine',s:'Colchicine',tg:'infl',ev:'early',e:[[2019.9,2,'pos','COLCOT'],[2020.7,2,'pos','LoDoCo2*'],[2025.1,2,'neu','CLEAR SYNERGY']]},
 {n:'Canakinumab (IL-1β)',s:'Canakinumab',tg:'infl',ev:'est',e:[[2017.7,2,'pos','CANTOS']]},
 {n:'Ziltivekimab (IL-6)',s:'Ziltivekimab',tg:'infl',ev:'hyp',e:[[2021.4,1,'bio','RESCUE'],[2026.84,2,'neu','ZEUS'],[2027.05,2,'due','ARTEMIS']]},
 {n:'Lp(a) lowering',s:'Lp(a)',tg:'lipid',ev:'early',e:[[2022.9,1,'bio','OCEAN(a)-DOSE'],[2026.84,2,'neu','Lp(a)HORIZON'],[2028.2,2,'due','OCEAN(a)-Out.']]},
 {n:'Inclisiran',s:'Inclisiran',tg:'lipid',ev:'early',e:[[2020.3,1,'bio','ORION-10/11'],[2025.2,3,'gd','LDL option'],[2026.8,2,'due','ORION-4'],[2027.4,2,'due','VICTORION-2P']]},
 {n:'Reperfusion injury',s:'Reperfusion',tg:'muscle',ev:'hyp',e:[[2015.7,2,'neu','CIRCUS'],[2019.7,2,'neu','CONDI-2']]},
 {n:'Cell therapy',s:'Cells',tg:'muscle',ev:'hyp',e:[[2016.0,1,'neu','Cochrane'],[2020.6,2,'neu','BAMI']]},
 {n:'Polypill',s:'Polypill',tg:'pill',ev:'early',e:[[2022.7,2,'pos','SECURE']]},
 {n:'AI ECG for occlusion MI',s:'AI ECG',tg:'dx',ev:'early',e:[[2023.5,1,'bio','Al-Zaiti'],[2024.4,1,'bio','Herman']]},
 {n:'Heart failure prevention',s:'HF drugs',tg:'prev',ev:'hyp',e:[[2021.8,2,'neu','PARADISE-MI'],[2024.3,2,'neu','EMPACT-MI'],[2024.35,2,'neu','DAPA-MI']]},
 {n:'Defibrillator timing',s:'ICD timing',tg:'prev',ev:'early',e:[[2018.7,2,'neu','VEST'],[2026.0,1,'bio','PROFID registry'],[2027.9,2,'due','PROFID EHRA']]}
];
const FR_STEPS=[
 {from:0,at:frY2T(2017.95),k:'Step 1 · 2015–2017',t:'Lessons and a proof of concept',
  txt:`CIRCUS gave cyclosporine before PCI to 970 people with anterior STEMI: the 1-year composite was 59.0% versus 58.1%, no better. [[Cung2015CIRCUS]] A Cochrane review of 41 trials found bone marrow cell therapy after MI did not change long-term mortality (RR 0.93). [[Fisher2015Cochrane]] Then CANTOS, in 10,061 people with prior MI and raised CRP, showed that canakinumab, an antibody against the inflammatory signal IL-1β, cut MI, stroke or cardiovascular death (HR 0.85) without lowering cholesterol. Fatal infections were more common and all-cause mortality did not differ. <span class="ev est">Established proof of concept</span> [[Ridker2017CANTOS]]`,
  pt:`Scientists showed that calming inflammation can prevent some heart attacks, even without lowering cholesterol. Two ideas for protecting or regrowing heart muscle did not work in large trials.`,
  hook:`CANTOS: canakinumab (IL-1β) HR 0.85 for MACE in prior MI with hsCRP ≥2 mg/L; no lipid lowering; more fatal infections. [[Ridker2017CANTOS]]`},
 {from:frY2T(2018.3),at:frY2T(2021.95),k:'Step 2 · 2018–2021',t:'Colchicine works, then conditioning fails',
  txt:`COLCOT gave the old gout drug colchicine to 4,745 people within 30 days of MI: ischaemic events were 5.5% versus 7.1% (HR 0.77). [[Tardif2019COLCOT]] LoDoCo2 found a benefit in chronic coronary disease (HR 0.69). [[Nidorf2020LoDoCo2]] Remote ischaemic conditioning with an arm cuff did not help 5,401 people having primary PCI (9.4% vs 8.6%). [[Hausenloy2019CONDI2]] VEST's wearable defibrillator missed its primary outcome. [[Olgin2018VEST]] Sacubitril-valsartan was not superior to ramipril after MI (HR 0.90). [[Pfeffer2021PARADISE]] Ziltivekimab cut CRP by up to 92% in a phase 2 trial, a biomarker result only. <span class="ev early">Early evidence</span> [[Ridker2021RESCUE]]`,
  pt:`A cheap anti-inflammatory pill, colchicine, reduced repeat problems in one large trial. Other ideas tested at the same time did not.`,
  hook:`COLCOT: colchicine 0.5 mg within 30 days of MI, 5.5% vs 7.1%, HR 0.77. LoDoCo2 (chronic CAD): HR 0.69. [[Tardif2019COLCOT,Nidorf2020LoDoCo2]]`},
 {from:frY2T(2022.3),at:frY2T(2024.95),k:'Step 3 · 2022–2024',t:'A polypill, new targets, and AI',
  txt:`SECURE gave 2,499 people within 6 months of MI one pill of aspirin, ramipril and atorvastatin: major cardiovascular events were 9.5% versus 12.7% with usual care (HR 0.76). It is a single positive trial. <span class="ev early">Early evidence</span> [[Castellano2022SECURE]] Olpasiran lowered Lp(a) by 70.5% to 101.1% in a phase 2 trial. [[ODonoghue2022]] Empagliflozin (EMPACT-MI) and dapagliflozin (DAPA-MI) did not reduce heart failure admission or death after MI. [[Butler2024EMPACT,James2024DAPAMI]] AI models read the ECG for occlusion MI more sensitively than STEMI criteria, in accuracy studies. <span class="ev early">Early evidence</span> [[AlZaiti2023,Herman2024]]`,
  pt:`Putting several heart medicines into one pill helped people take them and reduced events in one trial. Computers are learning to spot blocked arteries on the heart tracing, but this is still being tested.`,
  hook:`SECURE polypill (aspirin + ramipril + atorvastatin) within 6 months of MI: MACE 9.5% vs 12.7%, HR 0.76. [[Castellano2022SECURE]]`},
 {from:frY2T(2025.0),at:frY2T(2026.84),k:'Step 4 · 2025 to November 2026',t:'Colchicine contested, Lp(a) and IL-6 setbacks',
  txt:`CLEAR SYNERGY gave colchicine to 7,062 people soon after MI and found no difference over a median 3 years: 9.1% versus 9.3% (HR 0.99). Its role early after MI is now contested. <span class="ev early">Early evidence</span> [[Jolly2025]] The 2025 ACC/AHA guideline lists inclisiran among non-statin options for lowering LDL cholesterol, as summarised in two 2026 papers; its outcome trials are still running. [[Rao2025ACC,Wong2026JACCAdv,Goel2026,Ray2020ORION]] Lp(a)HORIZON, published in November 2026, gave pelacarsen or placebo to 8,322 people with cardiovascular disease and high Lp(a). Lp(a) at 12 months was 64.4 versus 233.4 nmol/L, but major cardiovascular events over a median 4.7 years were 12.3% versus 12.1% (HR 1.02). <span class="ev early">Early evidence</span> [[Cho2026HORIZON]] ZEUS, published the same week, gave ziltivekimab or placebo to 6,376 people with atherosclerotic disease, chronic kidney disease and raised CRP. CRP fell, but events over a median 33 months were 17.6% versus 17.7% (HR 0.99), and serious infections were 20.4% versus 17.9%. <span class="ev hyp">Hypothesis</span> [[Ridker2026ZEUS]]`,
  pt:`A second, bigger colchicine trial did not find a benefit, so experts now disagree. A medicine that lowers a fat called Lp(a) did not reduce heart events in its first big trial. A medicine that blocks an inflammation signal called IL-6 did not reduce them either.`,
  hook:`CLEAR SYNERGY: colchicine early after MI, 9.1% vs 9.3%, HR 0.99 (7,062 people). [[Jolly2025]]`},
 {from:frY2T(2026.9),at:0.995,k:'Step 5 · due from 2027',t:'Results still to come',
  txt:`Registered outcome trials, with the dates their records give: ARTEMIS, ziltivekimab in about 10,000 people with an acute heart attack, primary completion January 2027. [[NCT06118281]] ORION-4 (16,124 people; listed October 2026) and VICTORION-2P (17,004; May 2027) test whether inclisiran prevents events. [[NCT03705234,NCT05030428]] OCEAN(a)-Outcomes tests olpasiran in 7,297 people, due March 2028. [[NCT05581303]] PROFID EHRA tests whether people with low LVEF after MI can safely go without an ICD, due November 2027. [[NCT05665608,Dagres2026PROFID]] All are <span class="ev hyp">Hypothesis</span> until they report. Registry dates often slip.`,
  hook:`Awaited: ARTEMIS (ziltivekimab, acute MI), ORION-4 and VICTORION-2P (inclisiran), OCEAN(a)-Outcomes (olpasiran), PROFID EHRA (ICD vs no ICD). [[NCT06118281,NCT03705234,NCT05030428,NCT05581303,NCT05665608]]`}
];
/* trial table rows: n name, w what, r result, ev, tg target, reg registered & running/awaiting, nct */
const FR_TRIALS=[
 {n:'CANTOS',w:'Canakinumab (IL-1β antibody) in 10,061 people with prior MI and CRP ≥2 mg/L',r:'MI, stroke or CV death HR 0.85; more fatal infections; no all-cause mortality difference [[Ridker2017CANTOS]]',ev:'est',tg:'infl'},
 {n:'COLCOT',w:'Colchicine 0.5 mg daily within 30 days of MI (4,745 people)',r:'5.5% vs 7.1%, HR 0.77 [[Tardif2019COLCOT]]',ev:'early',tg:'infl'},
 {n:'LoDoCo2',w:'Colchicine in chronic coronary disease (5,522 people)',r:'6.8% vs 9.6%, HR 0.69 [[Nidorf2020LoDoCo2]]',ev:'early',tg:'infl'},
 {n:'CLEAR SYNERGY',w:'Colchicine started soon after MI (7,062 people)',r:'9.1% vs 9.3%, HR 0.99: no difference [[Jolly2025]]',ev:'early',tg:'infl'},
 {n:'RESCUE',w:'Ziltivekimab (IL-6) phase 2, chronic kidney disease and raised CRP',r:'CRP down 77–92% vs 4%: biomarker only [[Ridker2021RESCUE]]',ev:'early',tg:'infl'},
 {n:'ZEUS',w:'Ziltivekimab in 6,376 people with cardiovascular disease, kidney disease and inflammation',r:'17.6% vs 17.7%, HR 0.99: no difference; serious infections 20.4% vs 17.9% [[Ridker2026ZEUS]]',ev:'hyp',tg:'infl'},
 {n:'ARTEMIS',w:'Ziltivekimab in about 10,000 people with acute MI',r:'Active; primary completion est. January 2027 [[NCT06118281]]',ev:'hyp',tg:'infl',reg:1,nct:'NCT06118281'},
 {n:'OCEAN(a)-DOSE',w:'Olpasiran (siRNA) phase 2, Lp(a) >150 nmol/L',r:'Lp(a) down 70.5% to 101.1%: biomarker only [[ODonoghue2022]]',ev:'early',tg:'lipid'},
 {n:'Lp(a)HORIZON',w:'Pelacarsen (antisense) in 8,322 people with cardiovascular disease and Lp(a) ≥70 mg/dL',r:'Lp(a) lowered; 12.3% vs 12.1%, HR 1.02: no difference [[Cho2026HORIZON]]',ev:'early',tg:'lipid'},
 {n:'OCEAN(a)-Outcomes',w:'Olpasiran in 7,297 people',r:'Active; primary completion est. March 2028 [[NCT05581303]]',ev:'hyp',tg:'lipid',reg:1,nct:'NCT05581303'},
 {n:'ORION-10 and -11',w:'Inclisiran injections on top of statins (3,178 people)',r:'LDL down 52.3% and 49.9% at day 510: biomarker only [[Ray2020ORION]]',ev:'early',tg:'lipid'},
 {n:'ORION-4',w:'Inclisiran outcomes in 16,124 people with cardiovascular disease',r:'Active; primary completion listed October 2026 [[NCT03705234]]',ev:'hyp',tg:'lipid',reg:1,nct:'NCT03705234'},
 {n:'VICTORION-2P',w:'Inclisiran outcomes in 17,004 people with cardiovascular disease',r:'Active; primary completion est. May 2027 [[NCT05030428]]',ev:'hyp',tg:'lipid',reg:1,nct:'NCT05030428'},
 {n:'CIRCUS',w:'Cyclosporine before PCI in 970 people with anterior STEMI',r:'59.0% vs 58.1%: no benefit [[Cung2015CIRCUS]]',ev:'hyp',tg:'muscle'},
 {n:'CONDI-2/ERIC-PPCI',w:'Remote ischaemic conditioning (arm cuff) before primary PCI, 5,401 people',r:'9.4% vs 8.6%, HR 1.10: no benefit [[Hausenloy2019CONDI2]]',ev:'hyp',tg:'muscle'},
 {n:'Cochrane review',w:'Bone marrow cells after MI, 41 trials, 2,732 people',r:'Long-term mortality RR 0.93 (0.58–1.50) [[Fisher2015Cochrane]]',ev:'hyp',tg:'muscle'},
 {n:'BAMI',w:'Intracoronary bone marrow cells, LVEF ≤45% after primary PCI',r:'Under-recruited (375 people); could not test its hypothesis [[Mathur2020BAMI]]',ev:'hyp',tg:'muscle'},
 {n:'SECURE',w:'Polypill (aspirin, ramipril, atorvastatin) within 6 months of MI, 2,499 people',r:'9.5% vs 12.7%, HR 0.76 [[Castellano2022SECURE]]',ev:'early',tg:'pill'},
 {n:'PARADISE-MI',w:'Sacubitril-valsartan vs ramipril after MI, 5,661 people',r:'11.9% vs 13.2%, HR 0.90: not superior [[Pfeffer2021PARADISE]]',ev:'hyp',tg:'prev'},
 {n:'EMPACT-MI',w:'Empagliflozin after MI, 6,522 people',r:'8.2% vs 9.1%, HR 0.90: not reduced [[Butler2024EMPACT]]',ev:'hyp',tg:'prev'},
 {n:'DAPA-MI',w:'Dapagliflozin after MI, 4,017 people',r:'Win ratio 1.34 on a cardiometabolic outcome; CV death or HF admission 2.5% vs 2.6% [[James2024DAPAMI]]',ev:'hyp',tg:'prev'},
 {n:'VEST',w:'Wearable defibrillator for 90 days, LVEF ≤35% after MI, 2,302 people',r:'Arrhythmic death 1.6% vs 2.4%, P=0.18: not significant [[Olgin2018VEST]]',ev:'hyp',tg:'prev'},
 {n:'PROFID registry',w:'Observational, 32,214 people with LVEF ≤35% after MI',r:'ICD-linked mortality benefit shrank: HR 0.54 (1995–2004) to 0.89, not significant (2015–2020) [[SepehriShamloo2026]]',ev:'early',tg:'prev'},
 {n:'PROFID EHRA',w:'Medical therapy without vs with an ICD, about 3,595 people',r:'Recruiting; primary completion est. November 2027 [[NCT05665608,Dagres2026PROFID]]',ev:'hyp',tg:'prev',reg:1,nct:'NCT05665608'},
 {n:'Herman et al.',w:'AI ECG model tested on 3,254 ECGs for occlusion MI',r:'Sensitivity 80.6% vs 32.5% (STEMI criteria); specificity 93.7% vs 97.7% [[Herman2024]]',ev:'early',tg:'dx'},
 {n:'Al-Zaiti et al.',w:'Machine-learning ECG model in 7,313 consecutive patients',r:'Outperformed clinicians and commercial software for occlusion MI [[AlZaiti2023]]',ev:'early',tg:'dx'}
];
/* headline reader: c = control %, x = treatment %, eff = HR/RR as reported, sig = met primary outcome */
const FR_CMP=[
 {n:'COLCOT (colchicine after MI)',c:7.1,x:5.5,eff:'HR 0.77',fu:'median 22.6 months',sig:1,cl:'placebo',ct:'[[Tardif2019COLCOT]]',o:'ischaemic cardiovascular events'},
 {n:'CLEAR SYNERGY (colchicine after MI)',c:9.3,x:9.1,eff:'HR 0.99',fu:'median 3 years',sig:0,cl:'placebo',ct:'[[Jolly2025]]',o:'CV death, MI, stroke or ischaemia-driven revascularisation'},
 {n:'SECURE (polypill)',c:12.7,x:9.5,eff:'HR 0.76',fu:'median 36 months',sig:1,cl:'usual care',ct:'[[Castellano2022SECURE]]',o:'major adverse cardiovascular events'},
 {n:'LoDoCo2 (colchicine, chronic disease)',c:9.6,x:6.8,eff:'HR 0.69',fu:'median 28.6 months',sig:1,cl:'placebo',ct:'[[Nidorf2020LoDoCo2]]',o:'the composite cardiovascular endpoint'},
 {n:'EMPACT-MI (empagliflozin)',c:9.1,x:8.2,eff:'HR 0.90',fu:'the trial period',sig:0,cl:'placebo',ct:'[[Butler2024EMPACT]]',o:'heart failure admission or death'},
 {n:'CONDI-2/ERIC-PPCI (arm cuff)',c:8.6,x:9.4,eff:'HR 1.10',fu:'12 months',sig:0,cl:'standard PCI',ct:'[[Hausenloy2019CONDI2]]',o:'cardiac death or heart failure admission'},
 {n:'VEST (wearable defibrillator)',c:2.4,x:1.6,eff:'RR 0.67',fu:'90 days',sig:0,cl:'medical therapy alone',ct:'[[Olgin2018VEST]]',o:'arrhythmic death'}
];
inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT'),note=$('#frNote'),read=$('#frRead');
  let setSt=()=>{};
  /* where a programme's marker sits at year y: stage position, plus a short slide after each event */
  function pos(P,y){
    const ev=P.e.filter(e=>e[0]<=y);if(!ev.length)return null;
    const L=ev[ev.length-1],prev=ev.length>1?ev[ev.length-2][1]:L[1];
    const u=ease(clamp((y-L[0])/.55));return {st:lerp(prev,L[1],u),L,u,ev};
  }
  function draw(t){
    const NR=vb(svg,'720 500','400 576'),y=frT2Y(t),p=phaseOf(FR_STEPS,t),S=FR_STEPS[p];
    const W=NR?400:720,lx=NR?8:12,cx0=NR?118:178,cw=NR?(392-118)/4:(708-178)/4,top=NR?74:80,rh=NR?40:34;
    const sx=s=>cx0+cw*(s+.5);
    /* step window: rows with events inside it are emphasised */
    const y0=frT2Y(S.from),y1=p<FR_STEPS.length-1?frT2Y(FR_STEPS[p+1].from):99;
    let h='';
    /* stage columns */
    FR_STAGES.forEach((s,i)=>{const x=cx0+cw*i;
      h+=`<rect x="${x+2}" y="${top-34}" width="${cw-4}" height="${rh*FR_PROGS.length+34}" rx="8" fill="${i===3?'var(--brand-soft)':'var(--panel-2)'}" opacity="${i===3?.55:.8}"/>`;
      h+=`<text x="${x+cw/2}" y="${top-14}" class="t-sm t-mid" font-weight="700">${NR?s[1]:s[0]}</text>`;
      if(i<3)h+=`<path d="M${x+cw-6} ${top-18}l8 0" stroke="var(--muted)" stroke-width="1.4" marker-end="url(#frArr)"/>`;});
    h+=`<text x="${sx(0)}" y="${top+rh*FR_PROGS.length-10}" class="t-xs t-mid" fill="var(--muted)">${NR?'':'most ideas stop here'}</text>`;
    /* rows */
    FR_PROGS.forEach((P,i)=>{
      const ry=top+i*rh,cy=ry+rh/2,q=pos(P,y),act=P.e.some(e=>e[0]>=y0&&e[0]<y1&&e[0]<=y+.001);
      const op=q?(act?1:.62):.28;
      h+=`<g opacity="${op}">`;
      if(i%2===0)h+=`<rect x="${lx-4}" y="${ry}" width="${W-lx-4}" height="${rh}" fill="var(--ink)" opacity=".035"/>`;
      h+=`<text x="${lx}" y="${cy-(NR?3:2)}" class="t-sm" font-weight="${act?700:500}">${NR?P.s:P.n}</text>`;
      h+=`<text x="${lx}" y="${cy+(NR?11:11)}" class="t-xs" fill="var(--${P.ev==='est'?'good':P.ev==='early'?'warn':'rx'})" font-weight="700">${FR_EVL[P.ev].toUpperCase()}</text>`;
      if(q){
        /* ghost dots for earlier events */
        q.ev.slice(0,-1).forEach((e,k)=>{h+=`<circle cx="${sx(e[1])-12+k*7}" cy="${cy+(NR?9:8)}" r="3" fill="${FR_RES[e[2]][1]}" opacity=".7"/>`});
        const x=sx(q.st),R=FR_RES[q.L[2]],due=q.L[2]==='due';
        h+=`<line x1="${sx(q.ev[0][1])}" y1="${cy}" x2="${x}" y2="${cy}" stroke="${R[1]}" stroke-width="2" opacity=".35"/>`;
        h+=`<circle cx="${x}" cy="${cy}" r="${NR?7:8}" fill="${due?'var(--panel)':R[1]}" stroke="${R[1]}" stroke-width="${due?2.4:1.5}" ${due?'stroke-dasharray="3 2"':''}/>`;
        if(q.u<1)h+=`<circle cx="${x}" cy="${cy}" r="${8+10*q.u}" fill="none" stroke="${R[1]}" opacity="${1-q.u}"/>`;
        if(!NR){const tx=x+13,anchor=q.st>2.4?' t-end':'',X=q.st>2.4?x-13:tx;
          h+=`<text x="${X}" y="${cy+4}" class="t-xs${anchor}" font-weight="600">${q.L[3]}</text>`;}
      }
      h+='</g>';
    });
    /* legend + year */
    const ly=top+rh*FR_PROGS.length+(NR?22:22);
    const lg=Object.entries(FR_RES);let lxx=lx;
    lg.forEach(([k,v],i)=>{const lab=(NR?{pos:'met primary',neu:'missed primary',bio:'biomarker only',due:'awaited',gd:'guideline'}:{pos:'met primary outcome',neu:'missed primary outcome',bio:'biomarker or accuracy only',due:'awaited',gd:'in a guideline'})[k];
      let X=lxx,Y=ly;if(NR){X=lx+(i%3)*130;Y=ly+Math.floor(i/3)*18}
      h+=`<circle cx="${X+5}" cy="${Y-4}" r="5" fill="${k==='due'?'var(--panel)':v[1]}" stroke="${v[1]}" stroke-width="${k==='due'?2:1}" ${k==='due'?'stroke-dasharray="3 2"':''}/><text x="${X+14}" y="${Y}" class="t-xs">${lab}</text>`;
      if(!NR)lxx+=lab.length*6.3+26;});
    const yr=Math.floor(y),fut=y>2026.84;
    h+=`<text x="${W-(NR?8:12)}" y="${NR?22:20}" class="t-big t-end" font-weight="800" fill="${fut?'var(--warn)':'var(--ink)'}">${yr}</text>`;
    h+=`<text x="${W-(NR?8:12)}" y="${NR?36:34}" class="t-xs t-end" fill="var(--muted)">${fut?'future: registry dates only':'results reported by now'}</text>`;
    h+=`<text x="${lx}" y="${NR?22:20}" class="t-lbl">${NR?'Research pipeline':'The research pipeline after a heart attack'}</text>`;
    svg.innerHTML=`<defs>${marker('frArr','var(--muted)')}</defs>`+h;
    /* readout: events reported in this step window up to now */
    const evs=[];FR_PROGS.forEach(P=>P.e.forEach(e=>{if(e[0]>=y0&&e[0]<y1&&e[0]<=y+.001)evs.push([e[0],P.n,e[3].replace('*',''),e[2]])}));
    evs.sort((a,b)=>a[0]-b[0]);
    read.innerHTML=evs.length?`<b>${fut?'Due':'Reported'} in this period:</b> `+evs.map(e=>`${e[2]} (${e[1].toLowerCase()}): ${FR_RES[e[3]][0]}`).join('; ')+'.'
      :`Move the year forward to see results arrive.`;
    if(y>=2020.7)read.innerHTML+=' <span class="stage-cap">*LoDoCo2 was in chronic coronary disease, not just after MI.</span>';
    note.innerHTML=noteHTML(S);setSt(p);
  }
  const stop=playWire(rg,$('#frPlay'),draw,26000,'%t:player.replay%','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- headline reader: two grids of 1,000 ---------- */
  const csvg=$('#frCmp'),sel=$('#frCmpSel'),ccap=$('#frCmpCap'),cnote=$('#frCmpNote');
  sel.innerHTML=FR_CMP.map((c,i)=>`<option value="${i}">${c.n}</option>`).join('');
  let cA=null,cur=FR_CMP[0],shown={c:0,x:0};
  function cdraw(){
    const NR=vb(csvg,'720 272','400 290'),C=cur;
    const cols=40,rows=25,dp=NR?4.4:5.6,gw=cols*dp,gh=rows*dp;
    const gx=NR?[16,16+gw+16]:[20,20+gw+28],gy=NR?44:58;
    const nc=Math.round(shown.c*10),nx=Math.round(shown.x*10);
    let h=`<symbol id="frDot" viewBox="0 0 2 2"><circle cx="1" cy="1" r="1"/></symbol>`;
    [[C.cl,nc,'var(--muted)'],['treatment',nx,'var(--brand)']].forEach(([lab,n,col],g)=>{
      h+=`<text x="${gx[g]}" y="${gy-22}" class="t-sm" font-weight="700">${g?'Treatment':'Control: '+lab}</text>`;
      h+=`<text x="${gx[g]}" y="${gy-8}" class="t-xs" fill="var(--muted)">${(g?C.x:C.c).toFixed(1)}% = ${n} in 1,000${NR?'':' had the outcome'}</text>`;
      let d='';for(let i=0;i<1000;i++){const r=Math.floor(i/cols),c=i%cols,on=i>=1000-n;
        d+=`<use href="#frDot" x="${gx[g]+c*dp+.5}" y="${gy+r*dp+.5}" width="${dp-1.2}" height="${dp-1.2}" fill="${on?col:'var(--line)'}"/>`}
      h+=d;
    });
    const ar=(C.c-C.x)*10,rel=(1-C.x/C.c)*100,sx=NR?16:gx[1]+gw+28,sy=NR?gy+gh+30:gy+4;
    const lines=[[`${Math.abs(ar).toFixed(0)} per 1,000`,ar>=0?'fewer with treatment (absolute)':'more with treatment (absolute)'],
      [`${Math.abs(rel).toFixed(0)}%`,ar>=0?'relative reduction (crude)':'relative increase (crude)'],
      [C.sig?`about ${Math.round(1000/ar)}`:'—',C.sig?`treated for one fewer event (${C.fu})`:'no NNT: primary outcome not met']];
    lines.forEach((L,i)=>{const X=NR?sx+(i%3)*124:sx,Y=NR?sy:sy+i*64;
      h+=`<text x="${X}" y="${Y+18}" class="t-big" font-weight="800" fill="${i===2&&!C.sig?'var(--muted)':C.sig?'var(--good)':'var(--ink)'}">${L[0]}</text>`;
      const wds=L[1].split(' '),mx=NR?17:26;let ln='',ly=Y+34;
      wds.forEach(w=>{if((ln+' '+w).trim().length>mx){h+=`<text x="${X}" y="${ly}" class="t-xs" fill="var(--muted)">${ln.trim()}</text>`;ly+=12;ln=w}else ln+=' '+w});
      h+=`<text x="${X}" y="${ly}" class="t-xs" fill="var(--muted)">${ln.trim()}</text>`;});
    h+=`<text x="${NR?16:gx[0]}" y="${NR?282:264}" class="t-xs" fill="var(--muted)">Reported as ${C.eff}. Teaching tool${NR?'':': crude figures from the trial abstract'}.</text>`;
    csvg.innerHTML=h;
  }
  function cset(i){cur=FR_CMP[i];const C=cur,from={...shown};cA&&cA();
    cA=animate(700,p=>{const e=ease(p);shown={c:lerp(from.c,C.c,e),x:lerp(from.x,C.x,e)};cdraw()},()=>{cA=null;shown={c:C.c,x:C.x};cdraw()});
    const ar=(C.c-C.x)*10;
    ccap.innerHTML=`${C.n}: ${C.o}, ${C.x}% with treatment versus ${C.c}% with ${C.cl} over ${C.fu} (${C.eff}). ${C.ct} Dot positions are illustrative; each grid is 1,000 people scaled from the trial's percentages.`;
    cnote.innerHTML=noteHTML({k:'Reading the headline',t:C.sig?'A real effect, in absolute terms':'No proven effect',
      txt:C.sig?`The relative figure (${Math.round((1-C.x/C.c)*100)}%) sounds large; the absolute difference is ${ar.toFixed(0)} people per 1,000 over ${C.fu}. Both are true. Absolute numbers depend on how common the event is in the people studied, so they change from one group to another. ${C.ct}`
        :`The difference of ${Math.abs(ar).toFixed(0)} per 1,000 is within what chance alone could produce, so the trial did not show that the treatment works for ${C.o}. "No proven effect" is not the same as proof of no effect. ${C.ct}`,
      pt:C.sig?`"${Math.round((1-C.x/C.c)*100)}% fewer" and "${ar.toFixed(0)} fewer people in every 1,000" describe the same result. Ask for both.`:'',
      hook:C.sig?`Absolute risk reduction = control rate − treatment rate; NNT = 1 / ARR (for the trial's follow-up). ${C.ct}`:''});
  }
  sel.addEventListener('change',()=>cset(+sel.value));
  cset(0);
  const prevR=redraws.frontier;redraws.frontier=()=>{prevR&&prevR();cdraw()};

  /* ---------- trial finder ---------- */
  const rows=$('#frRows'),tgt=$('#frTgt'),reg=$('#frReg'),cnt=$('#frCount');let fe='all';
  function ft(){
    const L=FR_TRIALS.filter(T=>(fe==='all'||T.ev===fe)&&(tgt.value==='all'||T.tg===tgt.value)&&(!reg.checked||T.reg));
    rows.innerHTML=L.length?L.map(T=>`<tr><th>${T.n}</th><td>${T.w}</td><td>${T.r}</td><td><span class="ev ${T.ev}">${FR_EVL[T.ev]}</span></td><td class="nct">${T.nct?`<a href="https://clinicaltrials.gov/study/${T.nct}" rel="noopener" target="_blank">${T.nct}</a>`:'Published'}</td></tr>`).join('')
      :`<tr><td colspan="5">No trials match these filters.</td></tr>`;
    cnt.textContent=`${L.length} of ${FR_TRIALS.length} trials shown. Registry statuses as listed on ClinicalTrials.gov on 4 November 2026.`;
  }
  $$('[data-fe]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.fe;$$('[data-fe]').forEach(x=>x.setAttribute('aria-pressed',x===b));ft()}));
  tgt.addEventListener('change',ft);reg.addEventListener('change',ft);
  ft();
};
