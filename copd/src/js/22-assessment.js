/* =============== 2.2 Symptoms, exacerbations & GOLD groups =============== */
/* Main scrubber: five assessment rows fill in for one illustrative person (made-up values, published
   thresholds) while a dot moves through the GOLD 2023 ABE grid. Interactives: an mMRC picker
   (grades paraphrased), eight CAT-domain sliders (item wording NOT reproduced: the CAT is licensed),
   the ABE group from those two, an eosinophil band explainer and a BODE explainer. */
const AS_STEPS=[
 {from:0,at:.1,k:'Confirm',t:'Spirometry first',
  txt:`The assessment starts only after spirometry has confirmed COPD: a post-bronchodilator FEV1/FVC below 0.7 [[Agusti2023]]. GOLD 2023 then lists four goals: the GOLD grade, current symptoms, past exacerbations and other conditions [[Agusti2023]].`,
  pt:`First the breathing test has to show narrowed airways. Only then does the team grade how much COPD affects you.`,
  hook:`Assessment = grade + symptoms + exacerbation history + multimorbidity, after a post-BD ratio < 0.7 [[Agusti2023]].`},
 {from:.16,at:.26,k:'Grade',t:'How blocked: GOLD 1–4',
  txt:`FEV1 ≥ 80%, 50–79%, 30–49% and &lt; 30% predicted give GOLD grades 1 to 4: mild, moderate, severe and very severe [[Lin2025,Agusti2023]]. The grade describes airflow only; since 2017 it has been reported separately from the symptom-and-exacerbation group [[Vogelmeier2017]].`,
  pt:`The grade from 1 to 4 says how narrowed the airways are, from mild to very severe.`,
  hook:`GOLD 1 ≥ 80%, GOLD 2 50–79%, GOLD 3 30–49%, GOLD 4 < 30% predicted FEV1 [[Lin2025]].`},
 {from:.32,at:.44,k:'Symptoms',t:'mMRC or CAT',
  txt:`mMRC 0–1 or CAT below 10 counts as "less symptomatic"; mMRC 2 or more, or CAT 10 or more, as "more symptomatic" [[Han2013,Cheng2023]]. The two measures are used interchangeably but do not always agree: in ERICA, 57% of people in group B by the CAAT were in group A by the mMRC [[Adesoye2026]].`,
  pt:`You rate your breathlessness on a 0 to 4 scale, or fill in an 8-question form scored 0 to 40.`,
  hook:`Symptom split: mMRC ≥ 2 or CAT ≥ 10 = more symptomatic [[Cheng2023]].`},
 {from:.48,at:.63,k:'History',t:'Count last year’s flare-ups',
  txt:`Two or more moderate exacerbations, or one or more leading to hospital admission, in the previous year place a person in group E whatever their symptoms [[Cheng2023,Agusti2023]]. GOLD calls past exacerbations "the best estimate of the risk of future exacerbations" [[Agusti2023]]. Here, one moderate flare-up keeps the person in B; the hospital admission moves them to E.`,
  pt:`The team asks how many flare-ups you had last year, and whether any put you in hospital.`,
  hook:`Group E = ≥ 2 moderate or ≥ 1 hospitalised exacerbation in the past year [[Cheng2023]].`},
 {from:.66,at:.78,k:'Group',t:'A, B or E',
  txt:`With fewer flare-ups, low symptoms give group A and high symptoms group B. GOLD 2023 merged the old groups C and D into E and says the change "needs to be validated" [[Agusti2023]]. A grade and a group combine into 12 subgroups, 1A to 4E, replacing the 16 ABCD subgroups [[Cheng2023]]. This person is 3E.`,
  pt:`Putting it together gives a letter: A, B or E. E means a higher risk of flare-ups.`,
  hook:`ABE (2023): C and D merged into E; 12 subgroups 1A–4E [[Agusti2023,Cheng2023]].`},
 {from:.83,at:.96,k:'Biomarker',t:'Eosinophils',
  txt:`Blood eosinophils below 100 cells/µL predict little or no benefit from adding an inhaled corticosteroid, and 300 cells/µL or more a strong likelihood of benefit, with a continuous gradation in between [[Agusti2023]]. GOLD 2023 says triple therapy "can be considered" for group E at first presentation if eosinophils are ≥ 300 cells/µL [[Agusti2023]].`,
  pt:`A blood test counts eosinophils, a type of white blood cell. A high count makes an inhaled steroid more likely to help.`,
  hook:`Eosinophils < 100/µL: little ICS benefit; ≥ 300/µL: strong likelihood of benefit [[Agusti2023]].`}
];
const AS_EX={ratio:.52,pct:48,mmrc:2,cat:18,eos:320,modM:3,hospM:9};
const AS_TXT={
  rows:['Spirometry, after inhaler','GOLD grade (FEV1 % predicted)','Symptoms','Flare-ups, past 12 months','Blood eosinophils'],
  r0:v=>`${v} < 0.70`,r1:g=>`GOLD ${g}`,r2lo:'fewer symptoms',r2hi:'more symptoms',r3a:n=>n?'1 moderate':'none yet',r3b:'1 in hospital',
  r4:v=>`${v} cells/µL`,mmrcL:'mMRC',catL:'CAT 0–40',months:'month 1 to 12',
  gridT:'GOLD 2023: groups A, B and E',
  rowE:'Flare-ups: ≥ 2 moderate or ≥ 1 in hospital',rowAB:'Flare-ups: 0–1 moderate, none in hospital',
  colA:['mMRC 0–1 or','CAT < 10'],colB:['mMRC ≥ 2 or','CAT ≥ 10'],
  old:'GOLD 2017: C and D',oldCell:{C:'GOLD 2017: group C',D:'GOLD 2017: group D'},merged:'merged into E in 2023',  /* mMRC picker */
  mm:{0:'Grade 0',1:'Grade 1',2:'Grade 2',3:'Grade 3',4:'Grade 4'},
  mmLo:'Less symptomatic in GOLD’s terms (mMRC 0–1) [[Han2013,Cheng2023]].',
  mmHi:'More symptomatic in GOLD’s terms (mMRC 2 or more) [[Han2013,Cheng2023]].',
  mmBode:p=>`BODE points for this grade: ${p} of a possible 3 [[Kamath2020,Celli2004]].`,
  mmMrc:'The mMRC numbers the original MRC scale’s steps from 0 instead of 1, so mMRC grade 2 corresponds to MRC grade 3. This mapping is inferred from the two numbering schemes, not stated by the sources.',
  /* CAT domains: domain, what the 0 end and the 5 end describe (paraphrased, not the licensed wording) */
  cat:[['Cough','never coughs','coughs all the time'],['Phlegm','no phlegm in the chest','chest full of phlegm'],
       ['Chest tightness','chest not tight','chest very tight'],['Breathlessness on a hill or one flight of stairs','not breathless','very breathless'],
       ['Activities at home','not limited','very limited'],['Confidence leaving home','confident','not at all confident'],
       ['Sleep','sleeps soundly','does not sleep soundly'],['Energy','lots of energy','no energy at all']],
  catHead:v=>`<span class="kicker">Domain total, 0–40</span><div class="big-num">${v}</div>`,
  band:{low:'Low impact (below 10)',med:'Medium impact (10–20)',high:'High impact (above 20)',vhigh:'Very high impact (above 30)'},
  bandSrc:'Impact bands as reported with the CAT; a score of 5 is the upper limit of normal in healthy non-smokers [[Minov2015]].',
  catLo:'Below 10: "less symptomatic" for the GOLD groups [[Han2013,Cheng2023]].',
  catHi:'10 or more: "more symptomatic" for the GOLD groups [[Han2013,Cheng2023]].',
  catDelta:(d,prev)=>`Compared with the earlier total of ${prev}, the change is ${d>0?'+':''}${d} points.`,
  catMcidYes:'That is at least the 2-point minimum clinically important difference [[Kon2014]].',
  catMcidNo:'That is smaller than the 2-point minimum clinically important difference [[Kon2014]].',
  /* ABE */
  abeHead:g=>`<span class="kicker">GOLD 2023 group</span><div class="big-num">${g}</div>`,
  abeWhy:{A:'Fewer than two moderate exacerbations and none leading to hospital, with low symptoms [[Cheng2023,Agusti2023]].',
          B:'Fewer than two moderate exacerbations and none leading to hospital, with high symptoms [[Cheng2023,Agusti2023]].',
          E:'Two or more moderate exacerbations, or at least one leading to hospital admission, whatever the symptom level [[Cheng2023,Agusti2023]].'},
  abeSym:{cat:v=>`Symptom measure: CAT domain total ${v} (threshold 10).`,mmrc:v=>`Symptom measure: mMRC grade ${v} (threshold 2).`},
  abeOld:g=>`Under GOLD 2017 ABCD this would have been group ${g} [[Cheng2023,Vogelmeier2017]].`,
  abeSub:(n,g)=>`With FEV1 at this level (GOLD ${n}), the combined subgroup is <b>${n}${g}</b>, one of the 12 subgroups 1A–4E [[Cheng2023]].`,
  abeSubNote:'The combined label assumes spirometry has already confirmed COPD (post-bronchodilator ratio below 0.70).',
  abeBad:'Enter whole numbers of 0 or more for the exacerbation counts.',
  abe26:'GOLD 2026 changed the tool again (exacerbations assessed separately from symptoms, per the ERICA analysis); its exact thresholds were not verified, so they are not applied [[Adesoye2026]].',
  /* eosinophils */
  eosV:v=>`${v} cells/µL`,
  eosBand:{lo:'Below 100 cells/µL: GOLD 2023 says adding an ICS has little or no effect [[Agusti2023]].',
           mid:'100 to below 300 cells/µL: GOLD 2023 describes a continuous gradation of effect in this range [[Agusti2023]].',
           hi:'300 cells/µL or more: GOLD 2023 says this identifies a strong likelihood of benefit from an ICS [[Agusti2023]].'},
  eosLbl:['below 100: little or no ICS effect','100–300: graded effect','300 or more: strong likelihood'],
  eosImp:{lo:'IMPACT, eosinophils below 90 cells/µL: rate ratio 0.88 for triple therapy versus umeclidinium–vilanterol [[Pascoe2019]].',
          hi:'IMPACT, eosinophils 310 cells/µL or more: rate ratio 0.56 for triple therapy versus umeclidinium–vilanterol [[Pascoe2019]].'},
  eosEsc:'In GOLD 2023’s follow-up algorithm, persistent exacerbations on LABA + LAMA lead to escalation to LABA + LAMA + ICS if eosinophils are ≥ 100 cells/µL [[Agusti2023]].',
  impLo:'< 90: RR 0.88',impHi:'≥ 310: RR 0.56',
  /* BODE */
  bodeHead:v=>`<span class="kicker">BODE index, 0–10</span><div class="big-num">${v}</div>`,
  bodeParts:(a,b,c,d)=>`FEV1 ${a} · walk ${b} · mMRC ${c} · BMI ${d}`,
  bodeQ:q=>`Quartile ${q} of 4 (quartiles: 0–2, 3–4, 5–6, 7–10) [[Kamath2020,Celli2004]].`,
  bodeHr:'In the validation cohort, each 1-point rise carried a hazard ratio of 1.34 for death from any cause and 1.62 for respiratory death [[Celli2004]].',
  bodeNeed:'Enter all four values to add up the index.',
  bodeLeg:['FEV1','6-minute walk','mMRC','BMI'],qLbl:['0–2','3–4','5–6','7–10'],
  dist:[{n:'Chinese outpatients',v:[8.4,44.8,46.8]},{n:'Taiwanese registry',v:[30.2,46.4,23.5]},{n:'ERICA, by CAAT',v:[7,27,66]},{n:'ERICA, by mMRC',v:[22,12,66]}],
  distLeg:['Group A','Group B','Group E']
};
const AS_COL={A:['var(--good-soft)','var(--good)'],B:['var(--warn-soft)','var(--warn)'],E:['var(--bad-soft)','var(--bad)']};
/* the ABE grid, drawn by the animation and the calculator: highlight one of 'A','B','E'; ghost = old C/D (0..1) */
function asGrid(G,o={}){const gx=G.x,gw=G.w,y1=G.top,h=G.h,gap=8,y2=y1+h+gap,half=(gw-gap)/2;let s='';
  const cell=(x,y,w,k)=>{const on=o.hi===k,c=AS_COL[k];return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?c[0]:'var(--panel-2)'};stroke:${on?c[1]:'var(--line)'};stroke-width:${on?2.4:1}"/>`};
  s+=cell(gx,y1,gw,'E')+cell(gx,y2,half,'A')+cell(gx+half+gap,y2,half,'B');
  const big=(x,y,k,op)=>`<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" style="font:700 34px var(--display);fill:${o.hi===k?AS_COL[k][1]:'var(--muted)'};opacity:${f1(op)}">${k}</text>`;
  const gh=clamp(o.ghost||0);
  s+=big(gx+gw/2,y1+h/2+12,'E',1-gh)+big(gx+half/2,y2+h/2+12,'A',1)+big(gx+half+gap+half/2,y2+h/2+12,'B',1);
  if(gh>0){s+=`<line x1="${f1(gx+gw/2)}" x2="${f1(gx+gw/2)}" y1="${f1(y1+8)}" y2="${f1(y1+h-8)}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(gh)}"/>`;
    s+=`<text x="${f1(gx+gw/4)}" y="${f1(y1+h/2+12)}" text-anchor="middle" style="font:700 30px var(--display);fill:var(--muted);opacity:${f1(gh)}">C</text><text x="${f1(gx+3*gw/4)}" y="${f1(y1+h/2+12)}" text-anchor="middle" style="font:700 30px var(--display);fill:var(--muted);opacity:${f1(gh)}">D</text>`;
    s+=`<text x="${f1(gx+gw-8)}" y="${f1(y1+16)}" class="t-xs t-end" style="opacity:${f1(gh)}">${AS_TXT.old}</text>`}
  if(o.merged)s+=`<text x="${f1(gx+gw-8)}" y="${f1(y1+16)}" class="t-xs t-end" style="opacity:${f1(o.merged)}">${AS_TXT.merged}</text>`;
  if(o.oldCell){const ox=o.oldCell==='C'?gx:gx+gw/2;s+=`<rect x="${f1(ox+4)}" y="${f1(y1+4)}" width="${f1(gw/2-8)}" height="${f1(h-8)}" rx="8" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${f1(ox+12)}" y="${f1(y1+h-12)}" class="t-xs">${AS_TXT.oldCell[o.oldCell]}</text>`}
  /* axis labels */
  const lw=G.lx2-G.lx;const wr=(y,t)=>wrapT(G.lx,y,t,Math.max(10,Math.floor(lw/5.8)),{cls:'t-xs',lh:12}).svg;
  s+=wr(y1+18,AS_TXT.rowE)+wr(y2+18,AS_TXT.rowAB);
  [[AS_TXT.colA,gx+half/2],[AS_TXT.colB,gx+half+gap+half/2]].forEach(c=>c[0].forEach((l,i)=>s+=`<text x="${f1(c[1])}" y="${f1(y2+h+18+i*13)}" class="t-xs t-mid">${l}</text>`));
  return {svg:s,pos:{A:[gx+half/2,y2+h/2],B:[gx+half+gap+half/2,y2+h/2],E:[gx+half+gap+half/2,y1+h/2]}};
}
inits.assessment=()=>{
  const svg=$('#asSvg'),rg=$('#asT'),note=$('#asNote');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 664'),p=phaseOf(AS_STEPS,t),S=AS_STEPS[p];
    const L=N?{rx:16,rw:368,r0:56,rdy:66,rh:58,bx:28,bw:240,vx:380,grid:{x:104,w:280,top:430,h:86,lx:16,lx2:96},gt:410}
             :{rx:16,rw:344,r0:56,rdy:66,rh:58,bx:28,bw:212,vx:350,grid:{x:476,w:228,top:96,h:104,lx:376,lx2:466},gt:76};
    let s='';
    /* values for the example person */
    const r=lerp(1,AS_EX.ratio,ease(ramp(t,.03,.12))),pc=lerp(100,AS_EX.pct,ease(ramp(t,.19,.28))),
      mm=AS_EX.mmrc*ease(ramp(t,.35,.43)),ct=AS_EX.cat*ease(ramp(t,.35,.44)),mon=12*ramp(t,.5,.62),eo=AS_EX.eos*ease(ramp(t,.86,.95));
    const rowOn=[1,ramp(t,.15,.19),ramp(t,.31,.35),ramp(t,.47,.51),ramp(t,.82,.86)],act=[0,1,2,3,-1,4][p];
    for(let k=0;k<5;k++){const y=L.r0+k*L.rdy,o=.28+.72*rowOn[k];
      s+=`<g style="opacity:${f1(o)}"><rect x="${L.rx}" y="${y}" width="${L.rw}" height="${L.rh}" rx="10" style="fill:var(--panel);stroke:${act===k?'var(--dx)':'var(--line)'};stroke-width:${act===k?2:1}"/>`;
      s+=`<text x="${L.bx}" y="${y+17}" class="t-lbl">${AS_TXT.rows[k]}</text>`;
      const by=y+26,bx=L.bx,bw=L.bw;
      if(k===0){const R=v=>bx+bw*(clamp(v,.3,1)-.3)/.7;
        s+=`<rect x="${bx}" y="${by}" width="${f1(R(.7)-bx)}" height="10" style="fill:var(--bad-soft)"/><rect x="${f1(R(.7))}" y="${by}" width="${f1(bx+bw-R(.7))}" height="10" style="fill:var(--good-soft)"/><line x1="${f1(R(.7))}" x2="${f1(R(.7))}" y1="${by-4}" y2="${by+14}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        s+=`<text x="${f1(R(.7))}" y="${by+25}" class="t-xs t-mid">0.70</text><path d="M${f1(R(r))} ${by+11}l-5 8h10z" style="fill:var(--bad)"/>`;
        if(rowOn[0]&&t>.12)s+=`<text x="${L.vx}" y="${y+40}" class="t-sm t-end" style="fill:var(--bad);font-weight:600">${AS_TXT.r0(AS_EX.ratio.toFixed(2))}</text>`}
      if(k===1){const P=v=>bx+bw*clamp(v,0,100)/100;
        [[0,30,'var(--bad-soft)','4'],[30,50,'var(--fl-soft)','3'],[50,80,'var(--warn-soft)','2'],[80,100,'var(--good-soft)','1']].forEach(b=>s+=`<rect x="${f1(P(b[0]))}" y="${by}" width="${f1(P(b[1])-P(b[0]))}" height="10" style="fill:${b[2]};stroke:var(--panel)"/><text x="${f1((P(b[0])+P(b[1]))/2)}" y="${by+25}" class="t-xs t-mid">${b[3]}</text>`);
        s+=`<path d="M${f1(P(pc))} ${by+11}l-5 8h10z" style="fill:var(--ink)"/>`;
        if(t>=.28)s+=`<text x="${L.vx}" y="${y+40}" class="t-lbl t-end" style="fill:var(--fl)">${AS_TXT.r1(3)}</text>`}
      if(k===2){const cw=N?24:20;for(let i=0;i<5;i++){const on=i<=Math.round(mm)&&rowOn[2]>0&&t>=.34;
          s+=`<rect x="${bx+i*cw}" y="${by-3}" width="${cw-2}" height="16" rx="3" style="fill:${on?(i>=2?'var(--warn)':'var(--dx-soft)'):'var(--panel-2)'};stroke:var(--line)"/><text x="${bx+i*cw+cw/2-1}" y="${by+9}" class="t-xs t-mid" style="fill:${on&&i>=2?'var(--panel)':'var(--ink)'}">${i}</text>`}
        const cx=bx+5*cw+12,cwid=bx+bw-cx,C=v=>cx+cwid*v/40;
        s+=`<rect x="${f1(cx)}" y="${by}" width="${f1(cwid)}" height="10" style="fill:var(--panel-2)"/><rect x="${f1(cx)}" y="${by}" width="${f1(C(ct)-cx)}" height="10" style="fill:${ct>=10?'var(--warn)':'var(--dx-soft)'}"/><line x1="${f1(C(10))}" x2="${f1(C(10))}" y1="${by-4}" y2="${by+14}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        s+=`<text x="${bx}" y="${by+25}" class="t-xs">${AS_TXT.mmrcL}</text><text x="${f1(cx)}" y="${by+25}" class="t-xs">${AS_TXT.catL}</text>`;
        if(t>=.44)s+=`<text x="${L.vx}" y="${y+40}" class="t-sm t-end" style="fill:var(--warn);font-weight:600">${AS_TXT.r2hi}</text>`}
      if(k===3){const mw=bw/12;for(let i=0;i<12;i++)s+=`<rect x="${f1(bx+i*mw)}" y="${by-3}" width="${f1(mw-2)}" height="16" rx="3" style="fill:${i<mon?'var(--panel-2)':'var(--panel)'};stroke:var(--line)"/>`;
        if(mon>0&&mon<12)s+=`<line x1="${f1(bx+mon*mw)}" x2="${f1(bx+mon*mw)}" y1="${by-6}" y2="${by+16}" style="stroke:var(--brand);stroke-width:2"/>`;
        if(mon>=AS_EX.modM)s+=`<circle cx="${f1(bx+(AS_EX.modM-.5)*mw)}" cy="${by+5}" r="5.5" style="fill:var(--warn)"/>`;
        if(mon>=AS_EX.hospM){const hx=bx+(AS_EX.hospM-.5)*mw;s+=`<rect x="${f1(hx-6)}" y="${by-1}" width="12" height="12" rx="2" style="fill:var(--bad)"/><path d="M${f1(hx)} ${by+1}v8M${f1(hx-4)} ${by+5}h8" style="stroke:var(--panel);stroke-width:2"/>`}
        s+=`<text x="${bx}" y="${by+25}" class="t-xs">${AS_TXT.months}</text>`;
        if(mon>=AS_EX.modM)s+=`<text x="${L.vx}" y="${y+33}" class="t-sm t-end" style="fill:var(--warn);font-weight:600">${AS_TXT.r3a(1)}</text>`;
        if(mon>=AS_EX.hospM)s+=`<text x="${L.vx}" y="${y+48}" class="t-sm t-end" style="fill:var(--bad);font-weight:600">${AS_TXT.r3b}</text>`}
      if(k===4){const E=v=>bx+bw*clamp(v,0,500)/500;
        s+=`<rect x="${bx}" y="${by}" width="${f1(E(100)-bx)}" height="10" style="fill:var(--panel-2)"/><rect x="${f1(E(100))}" y="${by}" width="${f1(E(300)-E(100))}" height="10" style="fill:var(--ics-soft)"/><rect x="${f1(E(300))}" y="${by}" width="${f1(E(500)-E(300))}" height="10" style="fill:var(--ics)"/>`;
        [0,100,300,500].forEach(v=>s+=`<text x="${f1(E(v))}" y="${by+25}" class="t-xs t-mid">${v}</text>`);
        s+=`<path d="M${f1(E(eo))} ${by+11}l-5 8h10z" style="fill:var(--ink)"/>`;
        if(t>=.95)s+=`<text x="${L.vx}" y="${y+40}" class="t-sm t-end" style="fill:var(--ics-ink);font-weight:600">${AS_TXT.r4(AS_EX.eos)}</text>`}
      s+='</g>'}
    /* ABE grid */
    const grp=t<.43?null:(t<.6?'B':'E'),gh=bump(t,.67,.79),G=asGrid(L.grid,{hi:grp,ghost:gh,merged:p>=4?ramp(t,.78,.81):0});
    s+=`<text x="${N?16:L.grid.lx}" y="${L.gt}" class="t-lbl" style="fill:${p===4?'var(--dx)':'var(--ink)'}">${AS_TXT.gridT}</text>`+G.svg;
    if(t>=.43){const a=G.pos.B,b=G.pos.E,k=ease(ramp(t,.595,.635)),x=lerp(a[0],b[0],k),y=lerp(a[1],b[1],k)+(N?24:26),op=ramp(t,.43,.46);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:var(--brand);stroke:var(--panel);stroke-width:2.5;opacity:${f1(op)}"/>`;
      if(p>=4)s+=chip(x+34,y,'3E',{col:'var(--bad)',anchor:'middle',w:40});}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#asPlay'),draw,15000,'%t:player.replay%','assessment');
  setSt=stepWire($('#asSteps'),AS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- shared symptom state ---- */
  let mmrc=2;const catVals=[2,2,2,3,2,1,2,2];
  const bodeMm=g=>g<=1?0:g-1;
  /* mMRC picker */
  const mmEl=$('#asMm'),mmOut=$('#asMmOut');
  function mmShow(){$$('[data-asmm]',mmEl).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.asmm===mmrc?'true':'false'));
    const txt=$(`[data-asmm="${mmrc}"] span`,mmEl).textContent;
    mmOut.innerHTML=`<span class="kicker">mMRC</span><div class="big-num">${AS_TXT.mm[mmrc]}</div><p>${txt}.</p><div class="verdict ${mmrc>=2?'maybe':'yes'}">${mmrc>=2?AS_TXT.mmHi:AS_TXT.mmLo}</div><p>${AS_TXT.mmBode(bodeMm(mmrc))}</p><p>${AS_TXT.mmMrc}</p>`}
  mmEl.addEventListener('click',e=>{const b=e.target.closest('[data-asmm]');if(!b)return;mmrc=+b.dataset.asmm;mmShow();$('#asBMm').value=String(mmrc);abe();bode()});
  /* CAT domains */
  const catEl=$('#asCat'),catOut=$('#asCatOut'),prevEl=$('#asCatPrev');
  catEl.innerHTML=AS_TXT.cat.map((c,i)=>`<label for="asCat${i}"><span><b>${i+1}. ${c[0]}</b> <output id="asCatV${i}">${catVals[i]}</output></span><input type="range" id="asCat${i}" data-ascat="${i}" min="0" max="5" step="1" value="${catVals[i]}"><span class="ends"><span>0: ${c[1]}</span><span>5: ${c[2]}</span></span></label>`).join('');
  const catTotal=()=>catVals.reduce((a,b)=>a+b,0);
  function catShow(){const v=catTotal(),b=v>30?'vhigh':v>20?'high':v>=10?'med':'low';
    let h=AS_TXT.catHead(v)+`<div class="verdict ${v>=10?'maybe':'yes'}">${AS_TXT.band[b]}</div><p>${AS_TXT.bandSrc}</p><p>${v>=10?AS_TXT.catHi:AS_TXT.catLo}</p>`;
    const pv=parseFloat(prevEl.value);if(isFinite(pv)&&pv>=0&&pv<=40){const d=v-Math.round(pv);h+=`<p>${AS_TXT.catDelta(d,Math.round(pv))} ${Math.abs(d)>=2?AS_TXT.catMcidYes:AS_TXT.catMcidNo}</p>`}
    catOut.innerHTML=h}
  catEl.addEventListener('input',e=>{const r=e.target.closest('[data-ascat]');if(!r)return;const i=+r.dataset.ascat;catVals[i]=+r.value;$('#asCatV'+i).textContent=r.value;catShow();abe()});
  prevEl.addEventListener('input',catShow);
  /* ABE */
  const abeSvg=$('#asAbeSvg'),abeOut=$('#asAbeOut'),inst=$('#asAbeInst'),modEl=$('#asAbeMod'),hosEl=$('#asAbeHosp'),pctEl=$('#asAbePct');
  let abeG='B',abeOld='';
  function abeDraw(){const N=vb(abeSvg,'520 290','400 290');
    const G=asGrid(N?{x:100,w:288,top:16,h:96,lx:8,lx2:92}:{x:120,w:384,top:16,h:96,lx:12,lx2:110},{hi:abeG,oldCell:abeG==='E'?abeOld:null});
    abeSvg.innerHTML=G.svg}
  function abe(){const m=parseInt(modEl.value,10),hz=parseInt(hosEl.value,10);
    if(!(m>=0)||!(hz>=0)){abeOut.innerHTML=`<p>${AS_TXT.abeBad}</p>`;return}
    const useCat=inst.value==='cat',sv=useCat?catTotal():mmrc,hiSym=useCat?sv>=10:sv>=2,hiRisk=m>=2||hz>=1;
    abeG=hiRisk?'E':hiSym?'B':'A';abeOld=hiRisk?(hiSym?'D':'C'):'';
    let h=AS_TXT.abeHead(abeG)+`<div class="verdict ${abeG==='E'?'no':abeG==='B'?'maybe':'yes'}">${AS_TXT.abeWhy[abeG]}</div><p>${AS_TXT.abeSym[useCat?'cat':'mmrc'](sv)}</p>`;
    h+=`<p>${AS_TXT.abeOld(hiRisk?abeOld:abeG)}</p>`;
    const pc=parseFloat(pctEl.value);if(isFinite(pc)&&pc>0){const n=pc>=80?1:pc>=50?2:pc>=30?3:4;h+=`<p>${AS_TXT.abeSub(n,abeG)} ${AS_TXT.abeSubNote}</p>`}
    h+=`<p>${AS_TXT.abe26}</p>`;abeOut.innerHTML=h;abeDraw()}
  [inst,modEl,hosEl,pctEl].forEach(el=>{el.addEventListener('input',abe);el.addEventListener('change',abe)});
  /* ABE distributions */
  const dSvg=$('#asDistSvg');
  function distDraw(){const N=vb(dSvg,'720 230','400 300');let s='';
    const L=N?{lx:16,bx:16,bw:368,y0:52,dy:60,lab:-6}:{lx:16,bx:200,bw:500,y0:44,dy:44,lab:18};
    const cols=['A','B','E'];
    cols.forEach((k,i)=>{const x=(N?16:200)+i*110;s+=`<rect x="${x}" y="10" width="14" height="12" rx="2" style="fill:${AS_COL[k][0]};stroke:${AS_COL[k][1]}"/><text x="${x+20}" y="20" class="t-xs" style="fill:var(--ink)">${AS_TXT.distLeg[i]}</text>`});
    AS_TXT.dist.forEach((d,j)=>{const y=L.y0+j*L.dy;let x=L.bx;
      s+=`<text x="${L.lx}" y="${y+L.lab}" class="t-sm" style="fill:var(--ink)">${d.n}</text>`;
      const tot=d.v.reduce((a,b)=>a+b,0);
      d.v.forEach((v,i)=>{const w=L.bw*v/tot,k=cols[i];s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="26" style="fill:${AS_COL[k][0]};stroke:${AS_COL[k][1]};stroke-width:1"/>`;
        if(w>26)s+=`<text x="${f1(x+w/2)}" y="${y+17}" class="t-xs t-mid" style="fill:var(--ink)">${v}%</text>`;x+=w})});
    dSvg.innerHTML=s}
  /* eosinophils */
  const eSvg=$('#asEosSvg'),eIn=$('#asEos'),eOut=$('#asEosOut');
  function eos(){const N=vb(eSvg,'720 140','400 180'),v=+eIn.value,L=N?{x:20,w:360}:{x:30,w:660},E=c=>L.x+L.w*clamp(c,0,600)/600,by=52;let s='';
    s+=`<rect x="${L.x}" y="${by}" width="${f1(E(100)-L.x)}" height="20" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(E(100))}" y="${by}" width="${f1(E(300)-E(100))}" height="20" style="fill:var(--ics-soft);stroke:var(--line)"/><rect x="${f1(E(300))}" y="${by}" width="${f1(E(600)-E(300))}" height="20" style="fill:var(--ics);stroke:var(--line)"/>`;
    [[90,AS_TXT.impLo],[310,AS_TXT.impHi]].forEach(m=>s+=`<line x1="${f1(E(m[0]))}" x2="${f1(E(m[0]))}" y1="28" y2="${by}" style="stroke:var(--ics-ink);stroke-width:1.4;stroke-dasharray:3 2"/><text x="${f1(E(m[0]))}" y="22" class="t-xs t-mid" style="fill:var(--ics-ink);font-weight:600">${m[1]}</text>`);
    s+=`<path d="M${f1(E(v))} ${by+22}l-6 10h12z" style="fill:var(--ink)"/><text x="${f1(clamp(E(v),L.x+40,L.x+L.w-40))}" y="${by+46}" class="t-lbl t-mid">${AS_TXT.eosV(v)}</text>`;
    const sw=['var(--panel-2)','var(--ics-soft)','var(--ics)'];
    AS_TXT.eosLbl.forEach((l,i)=>{const lx=N?L.x:[30,260,440][i],ly=N?by+62+i*18:by+66;s+=`<rect x="${lx}" y="${ly}" width="12" height="12" rx="2" style="fill:${sw[i]};stroke:var(--line)"/><text x="${lx+18}" y="${ly+10}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    eSvg.innerHTML=s;$('#asEosV').textContent=AS_TXT.eosV(v);
    const b=v<100?'lo':v<300?'mid':'hi';
    let h=`<span class="kicker">GOLD 2023 band</span><div class="big-num">${AS_TXT.eosV(v)}</div><div class="verdict ${b==='hi'?'yes':b==='mid'?'maybe':'no'}">${AS_TXT.eosBand[b]}</div>`;
    if(v<90)h+=`<p>${AS_TXT.eosImp.lo}</p>`;if(v>=310)h+=`<p>${AS_TXT.eosImp.hi}</p>`;
    if(v>=100)h+=`<p>${AS_TXT.eosEsc}</p>`;eOut.innerHTML=h}
  eIn.addEventListener('input',eos);
  /* BODE */
  const bSvg=$('#asBodeSvg'),bOut=$('#asBodeOut'),bI={p:$('#asBPct'),w:$('#asBWalk'),m:$('#asBMm'),b:$('#asBBmi')};
  let bodePts=null;
  function bodeDraw(){const N=vb(bSvg,'720 130','400 150'),L=N?{x:16,w:368,y:34,lg:14}:{x:20,w:680,y:34,lg:14};let s='';
    const cw=L.w/10,cols=['var(--dx)','var(--rec)','var(--warn)','var(--rx)'];
    AS_TXT.bodeLeg.forEach((l,i)=>{const x=L.x+i*(N?94:150);s+=`<rect x="${x}" y="${L.lg-9}" width="12" height="12" rx="2" style="fill:${cols[i]}"/><text x="${x+18}" y="${L.lg+1}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    let k=0;const parts=bodePts||[0,0,0,0];
    for(let i=0;i<10;i++)s+=`<rect x="${f1(L.x+i*cw)}" y="${L.y}" width="${f1(cw-3)}" height="26" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    parts.forEach((n,ci)=>{for(let j=0;j<n;j++){s+=`<rect x="${f1(L.x+k*cw)}" y="${L.y}" width="${f1(cw-3)}" height="26" rx="4" style="fill:${cols[ci]}"/>`;k++}});
    const tot=parts.reduce((a,b)=>a+b,0),qi=tot<=2?0:tot<=4?1:tot<=6?2:3,Q=[[0,3],[3,5],[5,7],[7,10]];
    Q.forEach((q,i)=>{const x0=L.x+q[0]*cw,x1=L.x+q[1]*cw-3,on=bodePts&&i===qi,y=L.y+38;
      s+=`<path d="M${f1(x0)} ${y}v6H${f1(x1)}v-6" style="fill:none;stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2.2:1.2}"/><text x="${f1((x0+x1)/2)}" y="${y+20}" class="t-xs t-mid" style="fill:${on?'var(--brand)':'var(--muted)'};font-weight:${on?700:500}">${AS_TXT.qLbl[i]}</text>`});
    bSvg.innerHTML=s}
  function bode(){const p=parseFloat(bI.p.value),w=parseFloat(bI.w.value),m=+bI.m.value,b=parseFloat(bI.b.value);
    if(![p,w,b].every(isFinite)){bodePts=null;bOut.innerHTML=`<p>${AS_TXT.bodeNeed}</p>`;bodeDraw();return}
    const a=p>=65?0:p>=50?1:p>=36?2:3,c=w>=350?0:w>=250?1:w>=150?2:3,d=bodeMm(m),e=b>21?0:1;bodePts=[a,c,d,e];
    const tot=a+c+d+e,q=tot<=2?1:tot<=4?2:tot<=6?3:4;
    bOut.innerHTML=AS_TXT.bodeHead(tot)+`<p>${AS_TXT.bodeParts(a,c,d,e)}</p><div class="verdict ${q>=3?'no':q===2?'maybe':'yes'}">${AS_TXT.bodeQ(q)}</div><p>${AS_TXT.bodeHr}</p>`;bodeDraw()}
  Object.values(bI).forEach(el=>{el.addEventListener('input',bode);el.addEventListener('change',bode)});
  mmShow();catShow();abe();distDraw();eos();bode();
  const prev=redraws.assessment;redraws.assessment=()=>{prev&&prev();abeDraw();distDraw();eos();bodeDraw()};
};
