/* =============== 5.1 Cardiac rehabilitation =============== */
const RH_STEPS=[
 {from:0,at:.04,k:'Week 0 · Referral',t:'Referral and assessment',
  txt:`Rehab starts with a referral and a baseline assessment, the first of the AHA/AACVPR core components. [[Balady2007]] Referral is not automatic: across 1.4 million US PCI patients, 59.2% were referred, and more than a quarter of hospitals referred fewer than 20% of their patients. People treated for a STEMI (OR 2.99) or NSTEMI (OR 1.99) were more likely to be referred than those having a planned PCI. [[Aragam2015]]`,
  pt:`Cardiac rehab is a programme of exercise, teaching and support after a heart attack. It begins with someone checking how you are and what you need.`,
  hook:`Core components (AHA/AACVPR): assessment, nutrition, risk-factor management, psychosocial care, physical activity and exercise training.`},
 {from:.12,at:.22,k:'Weeks 1–12 · Exercise',t:'Supervised exercise',
  txt:`Supervised sessions build fitness step by step. In a French registry of 743,471 patient-hours of supervised training there was 1 severe cardiac event per 49,565 patient-hours and no deaths. [[Pavy2006]] Interval training improved fitness more than steady moderate exercise (SMD 0.34), and programmes of 7–12 weeks gave the largest gains in coronary artery disease. [[Hannan2018]]`,
  pt:`Exercising with the rehab team watching is very safe: serious heart problems happened about once in every 50,000 hours of exercise.`,
  hook:`Pavy 2006: 1 severe event per 49,565 patient-hours of supervised training; no deaths.`},
 {from:.36,at:.44,k:'Weeks 1–12 · Teaching',t:'Education and risk factors',
  txt:`Teaching covers food, blood pressure, cholesterol, weight, diabetes and smoking. [[Balady2007,Brown2024]] In EUROACTION, a nurse-coordinated, family-based programme, more coronary patients met the fruit and vegetable target (72% vs 35%) and blood pressure below 140/90 mmHg (65% vs 55%) at 1 year; smoking abstinence was 58% vs 47% (p=0.06). [[Wood2008EUROACTION]] Education alone within CR did not clearly lower total mortality (RR 0.80, 0.60–1.05). [[Anderson2017Edu]]`,
  pt:`Rehab helps with the everyday things that protect the heart: food, blood pressure, cholesterol and stopping smoking.`,
  hook:`Teaching on its own: RR 0.80 for death, confidence interval crossing 1 (Cochrane 2017).`},
 {from:.55,at:.62,k:'Weeks 1–12 · Support',t:'Psychosocial support',
  txt:`Psychosocial care is a core component. [[Balady2007]] Across 35 trials of psychological interventions in coronary heart disease, symptoms improved (depression SMD −0.27, anxiety −0.24, stress −0.56) and cardiac mortality fell (RR 0.79, low quality), but total mortality did not (RR 0.90, 0.77–1.05). [[Richards2017]]`,
  pt:`Feeling low or worried after a heart attack is common, and rehab teams can help with it as much as with fitness.`,
  hook:`Psychological interventions: mood improves; total mortality RR 0.90 (not significant).`},
 {from:.76,at:.82,k:'After week 12',t:'Maintenance and dose',
  txt:`After the programme, the habits have to last. In 30,161 older Medicare beneficiaries who attended at least one session, more sessions went with lower 4-year mortality: 36 vs 24 sessions HR 0.86, 36 vs 12 HR 0.78, and 36 vs 1 HR 0.53, with HR 0.69 for MI against 1 session. These are observational associations. [[Hammill2010]] The 2024 core components add programme quality as a core component. [[Brown2024]]`,
  pt:`People who came to more sessions did better, though part of that may be because healthier people can come more often.`,
  hook:`Hammill 2010: 36 vs 1 session, HR 0.53 for death at 4 years (observational, dose-response).`},
 {from:.9,at:.96,k:'Outcomes',t:'What the trials show',
  txt:`In the 2026 Cochrane review (107 trials, 26,886 adults), exercise-based CR lowered MI (RR 0.72; NNTB 71) and all-cause hospital admission (RR 0.65; NNTB 17) at 6–12 months, with a small, borderline effect on all-cause mortality (RR 0.86, 0.74–1.00). [[Dibben2026]] Cardiovascular mortality fell over longer follow-up in the 2021 review (RR 0.58 beyond 3 years). [[Dibben2021]] These are population results from trials. <span class="ev est">Established</span>`,
  pt:`In studies, rehab lowered the chance of another heart attack and of going back into hospital.`,
  hook:`NNTB: 71 people through CR prevents 1 MI; 17 prevents 1 hospital admission (6–12 months).`}
];
const RH_FOREST={
 c26:{h:'Cochrane 2026 · 107 trials, 26,886 adults · 6–12 months',rows:[['All-cause mortality',.86,.74,1.00],['Cardiovascular mortality',.87,.68,1.11],['Myocardial infarction',.72,.54,.95],['All-cause hospital admission',.65,.51,.82]],
  note:`At 6–12 months, MI (RR 0.72, high certainty) and hospital admission (RR 0.65) clearly fell; all-cause mortality touched 1.00 at its upper limit (moderate certainty), and cardiovascular mortality was not clearly changed. [[Dibben2026]]`,hook:`The newest Cochrane review: MI and admissions down, mortality borderline.`},
 c21:{h:'Cochrane 2021 · 85 trials, 23,430 people · by follow-up',rows:[['All-cause mortality, 6–12 mo',.87,.73,1.04],['CV mortality, 6–12 mo',.88,.68,1.14],['MI, 6–12 mo',.72,.55,.93],['All-cause hospitalisation, 6–12 mo',.58,.43,.77],['CV mortality, >12–36 mo',.77,.63,.93],['CV mortality, >3 years',.58,.43,.78],['MI, >3 years',.67,.50,.90]],
  note:`Cardiovascular mortality showed little change at 6–12 months but fell with longer follow-up (RR 0.77 at 12–36 months, 5 trials; 0.58 beyond 3 years, 8 trials). Women made up fewer than 15% of trial participants. [[Dibben2021]]`,hook:`The long-term benefit shows in cardiovascular mortality: RR 0.58 at more than 3 years.`},
 ipd:{h:'CaReMATCH · 8 trials since 2010, 4,975 people (hazard ratios)',rows:[['All-cause hospitalisation',.68,.53,.87],['CVD hospitalisation',.62,.47,.83],['All-cause mortality',.99,.74,1.32],['CVD mortality',.80,.32,2.04]],
  note:`Using individual participant data from modern trials (93.5% after MI), CR cut hospital admissions but showed no difference in mortality. [[Stens2026]] <span class="ev est">Established</span> for hospitalisation; the mortality effect in current care is uncertain.`,hook:`In trials published since 2010: fewer admissions (HR 0.68), mortality unchanged (HR 0.99).`},
 home:{h:'Home-based vs centre-based · Cochrane 2023, 24 trials, 3,046 people',rows:[['Mortality up to 12 months',1.19,.65,2.16],['Completion of the programme',1.03,.99,1.08]],
  note:`Home and centre programmes gave similar results: mortality RR 1.19 with a wide interval crossing 1, exercise capacity SMD −0.10 (−0.24 to 0.04), and completion RR 1.03. Here a ratio above 1 means more often at home. [[McDonagh2023]]`,hook:`Home-based and centre-based CR give similar outcomes (mortality CI 0.65–2.16).`}
};
const RH_GROUPS={all:['Everyone',24.4],men:['Men',28.6],women:['Women',18.9],white:['Non-Hispanic White',25.8],black:['Non-Hispanic Black',13.6],hisp:['Hispanic',13.2],ami:['Heart attack without a procedure',7.1],cabg:['Bypass surgery (CABG) only',55.3]};
inits.rehab=()=>{
  const svg=$('#rhSvg'),rg=$('#rhT');
  const LANES=[['Assessment','assess','var(--accent)'],['Supervised exercise','exercise','var(--rec)'],['Education & risk factors','teach','var(--rx)'],['Psychosocial support','support','var(--isch)'],['Maintenance','keep','var(--gold)']];
  const LANE_OF=[0,1,2,3,4,4];
  const wk=t=>t<=.76?t/.76*12:12,mt=t=>ramp(t,.76,1);
  /* a walking person on a treadmill, or outdoors in maintenance */
  function walker(cx,g,ph,outdoor,sc){const a=Math.sin(ph)*.5,hp=g-26*sc,sh=g-44*sc,ink='stroke:var(--ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;fill:none';
    let r='';
    if(!outdoor){r+=`<rect x="${f1(cx-50*sc)}" y="${f1(g)}" width="${f1(100*sc)}" height="${f1(8*sc)}" rx="${f1(4*sc)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
      for(let i=0;i<6;i++){const u=((i/6)+ph*.04)%1;r+=`<line x1="${f1(cx-46*sc+u*92*sc)}" x2="${f1(cx-46*sc+u*92*sc)}" y1="${f1(g+2*sc)}" y2="${f1(g+6*sc)}" style="stroke:var(--muted);stroke-width:1"/>`}
      r+=`<path d="M${f1(cx+44*sc)} ${f1(g)}L${f1(cx+38*sc)} ${f1(g-46*sc)}L${f1(cx+20*sc)} ${f1(g-46*sc)}" style="fill:none;stroke:var(--muted);stroke-width:2.4;stroke-linecap:round"/><rect x="${f1(cx+30*sc)}" y="${f1(g-58*sc)}" width="${f1(16*sc)}" height="${f1(10*sc)}" rx="2" style="fill:var(--field);stroke:var(--muted)"/>`}
    else{r+=`<line x1="${f1(cx-60*sc)}" x2="${f1(cx+60*sc)}" y1="${f1(g)}" y2="${f1(g)}" style="stroke:var(--rec);stroke-width:2"/><path d="M${f1(cx+46*sc)} ${f1(g)}V${f1(g-22*sc)}" style="stroke:var(--gold);stroke-width:3"/><circle cx="${f1(cx+46*sc)}" cy="${f1(g-32*sc)}" r="${f1(13*sc)}" style="fill:var(--rec-soft);stroke:var(--rec)"/>`}
    r+=`<circle cx="${f1(cx)}" cy="${f1(g-53*sc)}" r="${f1(6.5*sc)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.2"/><path d="M${f1(cx)} ${f1(sh-3*sc)}L${f1(cx)} ${f1(hp)}" style="${ink}"/>`;
    r+=`<path d="M${f1(cx)} ${f1(hp)}L${f1(cx+Math.sin(a)*24*sc)} ${f1(g)}M${f1(cx)} ${f1(hp)}L${f1(cx-Math.sin(a)*24*sc)} ${f1(g)}" style="${ink}"/>`;
    r+=`<path d="M${f1(cx)} ${f1(sh)}L${f1(cx-Math.sin(a)*14*sc)} ${f1(sh+15*sc)}M${f1(cx)} ${f1(sh)}L${f1(cx+Math.sin(a)*14*sc)} ${f1(sh+15*sc)}" style="${ink}"/>`;
    return r}
  function heartIcon(x,y,s,beat){const k=s*(1+beat*.14);return `<path d="M${f1(x)} ${f1(y+k*.9)}C${f1(x-k*1.3)} ${f1(y+k*.1)} ${f1(x-k*1.1)} ${f1(y-k*.9)} ${f1(x)} ${f1(y-k*.3)}C${f1(x+k*1.1)} ${f1(y-k*.9)} ${f1(x+k*1.3)} ${f1(y+k*.1)} ${f1(x)} ${f1(y+k*.9)}Z" style="fill:var(--brand)"/>`}
  /* paired or single horizontal bars */
  function bars(x,y,w,rows,o){let s='';const rh=o.rh||30;rows.forEach((r,i)=>{const yy=y+i*rh;
      s+=`<text x="${f1(x)}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
      r.slice(1).forEach((v,j)=>{const by=yy+5+j*9,bw=w*clamp(v/o.max)*o.p;
        s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(w)}" height="7" rx="2" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(by)}" width="${f1(bw)}" height="7" rx="2" style="fill:${o.cols[j]}"/>`;
        if(o.p>.6)s+=`<text x="${f1(x+bw+4)}" y="${f1(by+7)}" class="t-xs" style="fill:${o.cols[j]};font-weight:600">${o.fmt(v)}</text>`})});
    return s}
  function panel(p,lp,x,y,w,h,N){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const px=x+12,pw=w-24,ty=y+20;
    const head=(a,b)=>`<text x="${f1(px)}" y="${f1(ty)}" class="t-sm" style="fill:var(--ink);font-weight:600">${a}</text>`+(b?`<text x="${f1(px)}" y="${f1(ty+14)}" class="t-xs">${b}</text>`:'');
    if(p===0){s+=head('REFERRAL AFTER PCI','US registry, 2009–2012');const v=59.2*ease(lp);
      s+=`<rect x="${f1(px)}" y="${f1(ty+30)}" width="${f1(pw)}" height="22" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(px)}" y="${f1(ty+30)}" width="${f1(pw*v/100)}" height="22" rx="4" style="fill:var(--accent)"/>`;
      s+=`<text x="${f1(px+6)}" y="${f1(ty+45)}" class="t-lbl" style="fill:var(--panel)">${v.toFixed(1)}%</text><text x="${f1(px+pw)}" y="${f1(ty+66)}" class="t-xs t-end">referred</text>`;
      s+=`<text x="${f1(px)}" y="${f1(ty+90)}" class="t-xs" style="fill:var(--ink)">Odds of referral vs planned PCI:</text>`;
      s+=bars(px,ty+108,pw*.7,[['STEMI',2.99],['NSTEMI',1.99]],{max:3.2,p:ease(lp),cols:['var(--brand)'],fmt:v=>'OR '+v.toFixed(2),rh:24});
      s+=`<text x="${f1(px)}" y="${f1(y+h-12)}" class="t-xs">&gt;1 in 4 hospitals referred &lt;20%</text>`}
    else if(p===1){s+=head('EXERCISE SAFETY','French registry, 25,420 people');const hrs=Math.round(49565*clamp(lp*1.15));
      s+=`<text x="${f1(px)}" y="${f1(ty+50)}" style="font:800 ${N?26:24}px var(--display);fill:var(--rec)">${hrs.toLocaleString('en-US')}</text><text x="${f1(px)}" y="${f1(ty+66)}" class="t-xs">patient-hours of exercise</text>`;
      const done=hrs>=49565;s+=`<rect x="${f1(px)}" y="${f1(ty+78)}" width="${f1(pw)}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(px)}" y="${f1(ty+78)}" width="${f1(pw*hrs/49565)}" height="10" rx="5" style="fill:var(--rec)"/>`;
      if(done)s+=`<circle cx="${f1(px+pw-5)}" cy="${f1(ty+83)}" r="7" style="fill:var(--bad)"/><text x="${f1(px+pw)}" y="${f1(ty+106)}" class="t-xs t-end" style="fill:var(--bad)">1 severe cardiac event</text>`;
      s+=`<text x="${f1(px)}" y="${f1(ty+128)}" class="t-xs" style="fill:var(--ink)">1 per 8,484 exercise tests</text><text x="${f1(px)}" y="${f1(ty+144)}" class="t-xs" style="fill:var(--ink)">Arrests: 1.3 per million hours</text><text x="${f1(px)}" y="${f1(ty+160)}" class="t-xs" style="fill:var(--ink)">Deaths: none</text>`}
    else if(p===2){s+=head('RISK FACTORS AT 1 YEAR','EUROACTION, coronary patients');
      s+=bars(px,ty+34,pw*.72,[['Fruit & veg target met',72,35],['BP below 140/90 mmHg',65,55],['Not smoking (p=0.06)',58,47]],{max:100,p:ease(lp),cols:['var(--rx)','var(--muted)'],fmt:v=>v+'%',rh:36});
      s+=`<rect x="${f1(px)}" y="${f1(y+h-24)}" width="10" height="6" style="fill:var(--rx)"/><text x="${f1(px+14)}" y="${f1(y+h-18)}" class="t-xs">programme</text><rect x="${f1(px+90)}" y="${f1(y+h-24)}" width="10" height="6" style="fill:var(--muted)"/><text x="${f1(px+104)}" y="${f1(y+h-18)}" class="t-xs">usual care</text>`}
    else if(p===3){s+=head('MOOD SYMPTOMS (SMD)','35 trials; left = better');const zx=px+pw-30,sc=(pw-60)/.6;
      s+=`<line x1="${f1(zx)}" x2="${f1(zx)}" y1="${f1(ty+26)}" y2="${f1(ty+140)}" class="axis"/><text x="${f1(zx)}" y="${f1(ty+152)}" class="t-xs t-mid">0</text>`;
      [['Depression',-.27],['Anxiety',-.24],['Stress',-.56]].forEach((r,i)=>{const yy=ty+40+i*34,bw=-r[1]*sc*ease(lp);
        s+=`<text x="${f1(px)}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${f1(zx-bw)}" y="${f1(yy+4)}" width="${f1(bw)}" height="9" rx="2" style="fill:var(--isch)"/>`;
        if(lp>.6)s+=`<text x="${f1(zx-bw-4)}" y="${f1(yy+12)}" class="t-xs t-end" style="fill:var(--isch);font-weight:600">${r[1].toFixed(2).replace('-','−')}</text>`});
      s+=`<text x="${f1(px)}" y="${f1(y+h-12)}" class="t-xs">Total deaths: RR 0.90 (n.s.)</text>`}
    else if(p===4){s+=head('DEATH AT 4 YEARS (HR)','36 sessions vs fewer; observational');const zx=px+pw*.86,sc=pw*.86;
      s+=`<line x1="${f1(zx)}" x2="${f1(zx)}" y1="${f1(ty+26)}" y2="${f1(ty+130)}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(zx)}" y="${f1(ty+142)}" class="t-xs t-mid">HR 1</text>`;
      [['vs 24 sessions',.86],['vs 12 sessions',.78],['vs 1 session',.53]].forEach((r,i)=>{const yy=ty+40+i*32,bw=r[1]*sc*clamp(lp*1.6-i*.2);
        s+=`<text x="${f1(px)}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${f1(px)}" y="${f1(yy+4)}" width="${f1(Math.max(0,bw))}" height="9" rx="2" style="fill:var(--gold)"/>`;
        if(bw>=r[1]*sc*.98)s+=`<text x="${f1(px+bw+4)}" y="${f1(yy+12)}" class="t-xs" style="fill:var(--gold);font-weight:600">${r[1].toFixed(2)}</text>`});
      s+=`<text x="${f1(px)}" y="${f1(y+h-12)}" class="t-xs">Shorter = lower risk with 36</text>`}
    else{s+=head('NNTB AT 6–12 MONTHS','Cochrane 2026');const k=lp>.25?1:0,sz=N?16:11;
      const A=icons(px,ty+30,{n:71,cols:N?12:12,k,size:sz,gap:2,col:'var(--brand)',shape:'person'});
      s+=A.svg+`<text x="${f1(px)}" y="${f1(ty+30+A.h+12)}" class="t-xs" style="fill:var(--ink)">1 fewer MI per 71 treated</text>`;
      const y2=ty+30+A.h+26,B=icons(px,y2,{n:17,cols:N?17:9,k:lp>.55?1:0,size:sz,gap:2,col:'var(--rx)',shape:'person'});
      s+=B.svg+`<text x="${f1(px)}" y="${f1(y2+B.h+12)}" class="t-xs" style="fill:var(--ink)">1 fewer admission per 17 treated</text>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 440','400 660');const w=wk(t),m=mt(t),p=phaseOf(RH_STEPS,t),L=LANE_OF[p];
    const nx=lp=>lp;void nx;
    const G=N?{x0:96,x1:300,mx:388,ly:76,lh:26,lab:10,big:[12,28]}:{x0:200,x1:590,mx:704,ly:76,lh:26,lab:14,big:[14,28]};
    const X=v=>G.x0+(G.x1-G.x0)*v/12,px=t<=.76?X(w):G.x1+(G.mx-G.x1)*m;
    let s=`<defs>${marker('rhA','var(--muted)')}</defs>`;
    s+=`<text x="${G.big[0]}" y="${G.big[1]}" style="font:800 ${N?20:22}px var(--display);fill:var(--rec)">${t<=.76?'Week '+Math.max(0,Math.min(12,Math.floor(w)+(w<1?0:0))).toString():'After the programme'}</text>`;
    s+=`<text x="${N?388:704}" y="${G.big[1]}" class="t-sm t-end">${RH_STEPS[p].t.toUpperCase()}</text>`;
    /* time axis */
    const ay=G.ly-12;s+=`<line x1="${G.x0}" x2="${G.mx}" y1="${ay}" y2="${ay}" class="axis"/>`;
    for(let k=0;k<=12;k+=N?4:2)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ay-3}" y2="${ay+3}" class="axis"/><text x="${f1(X(k))}" y="${ay-6}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${G.mx}" y="${ay-6}" class="t-xs t-end">${N?'after':'after week 12'}</text>`;
    /* lanes */
    LANES.forEach((ln,i)=>{const y=G.ly+i*G.lh,on=i===L,col=ln[2],op=on?1:.55;
      s+=`<text x="${G.lab}" y="${y+12}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${N?['Assess','Exercise','Teaching','Support','Maintain'][i]:ln[0]}</text>`;
      s+=`<rect x="${G.x0}" y="${y}" width="${G.mx-G.x0}" height="16" rx="4" style="fill:var(--panel-2);opacity:.6"/>`;
      if(i===0){const e=X(1),f=Math.min(px,e);s+=`<rect x="${G.x0}" y="${y}" width="${f1(e-G.x0)}" height="16" rx="4" style="fill:none;stroke:${col};opacity:${op}"/>`;if(f>G.x0)s+=`<rect x="${G.x0}" y="${y}" width="${f1(f-G.x0)}" height="16" rx="4" style="fill:${col};opacity:${op}"/>`}
      else if(i===1){for(let k=0;k<36;k++){const v=1+k*11/35,xx=X(v),dn=xx<=px;s+=`<rect x="${f1(xx-1.6)}" y="${y+3}" width="3.2" height="10" rx="1" style="fill:${dn?col:'var(--line)'};opacity:${dn?op:1}"/>`}}
      else if(i===2||i===3){for(let k=1;k<12;k++){const a=X(k+.15),b=X(k+(i===2?.75:.55)),dn=a<=px;s+=`<rect x="${f1(a)}" y="${y+3}" width="${f1(Math.max(1,Math.min(b,Math.max(a,px))-a))}" height="10" rx="2" style="fill:${col};opacity:${dn?op:0}"/><rect x="${f1(a)}" y="${y+3}" width="${f1(b-a)}" height="10" rx="2" style="fill:none;stroke:${col};stroke-width:.8;opacity:.5"/>`}}
      else{const f=Math.max(G.x1,px);s+=`<rect x="${G.x1}" y="${y}" width="${G.mx-G.x1}" height="16" rx="4" style="fill:none;stroke:${col};opacity:${op}"/>`;if(f>G.x1)s+=`<rect x="${G.x1}" y="${y}" width="${f1(f-G.x1)}" height="16" rx="4" style="fill:${col};opacity:${op}"/>`}
      if(on)s+=`<rect x="${G.x0-3}" y="${y-3}" width="${G.mx-G.x0+6}" height="22" rx="6" style="fill:none;stroke:${col};stroke-width:1.6"/>`;
    });
    const ly1=G.ly+5*G.lh;s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${ay}" y2="${ly1}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(px-5)} ${ay-1}L${f1(px+5)} ${ay-1}L${f1(px)} ${ay+6}Z" style="fill:var(--ink)"/>`;
    /* lower area: treadmill, fitness curve, evidence panel */
    const fit=v=>.12+.7*(1-Math.exp(-v/4.2)),cur=t<=.76?fit(w):fit(12)+.02*m;
    const B=N?{wx:88,g:364,sc:.95,cx:206,cy:226,cw:182,ch:156,pX:12,pY:398,pW:376,pH:250}:{wx:100,g:404,sc:1.1,cx:236,cy:232,cw:212,ch:182,pX:466,pY:214,pW:242,pH:220};
    const ph=t*190*(1+w/10),beat=Math.max(0,Math.sin(t*620*(1+w/14)));
    s+=`<rect x="${N?12:14}" y="214" width="${N?180:206}" height="${N?172:220}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${N?22:26}" y="234" class="t-xs" style="fill:var(--ink);font-weight:600">${t<=.76?(w<1?'BASELINE CHECK':'SUPERVISED SESSION'):'ACTIVE AT HOME'}</text>`;
    if(w<1&&t<=.76){/* assessment: clipboard and person standing */
      const cx=B.wx;s+=walker(cx-20,B.g,0,true,B.sc*.9)+`<rect x="${cx+18}" y="${B.g-80}" width="44" height="56" rx="5" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.6"/>`;
      for(let i=0;i<4;i++){const on=lpOf(t)>i*.22;s+=`<path d="M${cx+24} ${B.g-66+i*12}l3 3l5 -6" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:1.8"/><line x1="${cx+36}" x2="${cx+56}" y1="${B.g-65+i*12}" y2="${B.g-65+i*12}" style="stroke:var(--line);stroke-width:2"/>`}}
    else s+=walker(B.wx-6,B.g,ph,t>.76,B.sc);
    s+=heartIcon(N?168:190,258,8,beat);
    s+=`<text x="${N?160:180}" y="282" class="t-xs t-mid">${t<=.76&&w>=1?'pace ×'+(1+w/12*.9).toFixed(1):''}</text>`;
    /* fitness curve */
    const C=curve(B.cx,B.cy+16,B.cw,B.ch-30,v=>v<=12?fit(v):fit(12)+.02*(v-12)/3,{x0:0,x1:15,y0:0,y1:1,upto:t<=.76?w:12+3*m,col:'var(--rec)',fill:true,dot:true,lw:2.4});
    s+=`<text x="${B.cx}" y="${B.cy+6}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?'FITNESS (SCHEMATIC)':'EXERCISE CAPACITY (SCHEMATIC)'}</text>`+C.svg;
    s+=`<text x="${B.cx}" y="${B.cy+B.ch}" class="t-xs">start</text><text x="${f1(C.X(12))}" y="${B.cy+B.ch}" class="t-xs t-mid">wk 12</text>`;
    s+=`<line x1="${f1(C.X(12))}" x2="${f1(C.X(12))}" y1="${B.cy+16}" y2="${B.cy+B.ch-14}" class="grid"/>`;
    void cur;
    s+=panel(p,lpOf(t),B.pX,B.pY,B.pW,B.pH,N);
    svg.innerHTML=s;
    setSt(p);
    const wtxt=t<=.76?`week ${w.toFixed(1)} of 12`:'after week 12';
    rg.setAttribute('aria-valuetext',`${wtxt}: ${RH_STEPS[p].t}`);
    $('#rhRead').innerHTML=`<span>time <b>${wtxt}</b></span><span>lane <b>${LANES[L][0]}</b></span><span>sessions passed <b>${t<=.76?Math.max(0,Math.min(36,Math.floor((w-1)/11*35)+1)):36} of 36 marks</b></span>`;
    $('#rhNote').innerHTML=noteHTML(RH_STEPS[p]);
  }
  function lpOf(t){const p=phaseOf(RH_STEPS,t),a=RH_STEPS[p].from,b=p<RH_STEPS.length-1?RH_STEPS[p+1].from:1.0001;return ramp(t,a,Math.max(a+.01,RH_STEPS[p].at))}
  const stop=playWire(rg,$('#rhPlay'),draw,26000,'%t:player.replay%','rehab');
  const setSt=stepWire($('#rhSteps'),RH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- forest plot ---- */
  const fs=$('#rhForest');let fk='c26';
  function drawF(){const D=RH_FOREST[fk],n=D.rows.length,NF=NARROW();const rh=NF?46:34,top=NF?58:52,H=top+n*rh+44;
    vb(fs,`720 ${H}`,`400 ${H+10}`);
    const lx0=NF?16:258,lx1=NF?270:572,lo=Math.log(.25),hi=Math.log(2.5),X=v=>lx0+(lx1-lx0)*(Math.log(v)-lo)/(hi-lo);
    let s=`<text x="${NF?14:16}" y="24" class="t-sm" style="fill:var(--ink);font-weight:600">${NF?D.h.split(' · ')[0]:D.h}</text>`;
    if(NF)s+=`<text x="14" y="38" class="t-xs">${D.h.split(' · ').slice(1).join(' · ')}</text>`;
    const by=top+n*rh;
    s+=`<rect x="${f1(lx0)}" y="${top-8}" width="${f1(X(1)-lx0)}" height="${by-top+8}" style="fill:var(--good-soft);opacity:.55"/>`;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${top-10}" y2="${by}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    [.25,.5,1,2].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${by}" y2="${by+4}" class="axis"/><text x="${f1(X(v))}" y="${by+16}" class="t-xs t-mid">${v}</text>`);
    s+=`<line x1="${f1(lx0)}" x2="${f1(lx1)}" y1="${by}" y2="${by}" class="axis"/>`;
    s+=`<text x="${f1(X(1)-6)}" y="${by+32}" class="t-xs t-end" style="fill:var(--good)">← ${fk==='home'?'less often at home':'favours rehab'}</text><text x="${f1(X(1)+6)}" y="${by+32}" class="t-xs">${fk==='home'?'more often at home':'favours no rehab'} →</text>`;
    D.rows.forEach((r,i)=>{const y=top+i*rh+(NF?24:12),sig=r[3]<1||r[2]>1,col=sig?'var(--rec)':'var(--muted)';
      if(NF)s+=`<text x="16" y="${y-12}" class="t-xs" style="fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:4px">${r[0]}</text>`;
      else s+=`<text x="${lx0-12}" y="${y+4}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${r[0]}</text>`;
      s+=`<line x1="${f1(X(Math.max(r[2],.25)))}" x2="${f1(X(Math.min(r[3],2.5)))}" y1="${y}" y2="${y}" style="stroke:${col};stroke-width:2.4"/>`;
      if(r[3]>2.5)s+=`<path d="M${f1(X(2.5))} ${y-4}l6 4l-6 4" style="fill:${col}"/>`;
      s+=`<rect x="${f1(X(r[1])-5.5)}" y="${y-5.5}" width="11" height="11" style="fill:${col}" transform="rotate(45 ${f1(X(r[1]))} ${y})"/>`;
      s+=`<text x="${NF?384:704}" y="${y+4}" class="t-xs t-end" style="fill:${col};font-weight:600">${r[1].toFixed(2)} (${r[2].toFixed(2)}–${r[3].toFixed(2)})</text>`});
    fs.innerHTML=s;
    $('#rhForestNote').innerHTML=`<div class="kicker">${D.h.split(' · ')[0]}</div><h4>${{c26:'MI and admissions fall',c21:'The benefit grows with time',ipd:'Modern trials: fewer admissions',home:'Home or centre: similar'}[fk]}</h4><p>${D.note}</p><div class="hook"><b>%t:note.hook%</b>${D.hook}</div>`;
  }
  $$('[data-rf]').forEach(b=>b.addEventListener('click',()=>{fk=b.dataset.rf;$$('[data-rf]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawF()}));
  drawF();

  /* ---- participation funnel ---- */
  const fu=$('#rhFunnel');let gk='all',gv=24.4,stopG=null;
  function drawG(v){const NG=vb(fu,'720 340','400 630');const all=gk==='all',comp=all?24.4*.269:null;
    const L=NG?{x:16,w:300,y:48,ix:50,iy:330,isz:20,ig:6}:{x:16,w:360,y:52,ix:430,iy:70,isz:20,ig:6};
    let s=`<text x="${L.x}" y="22" class="t-sm" style="fill:var(--ink);font-weight:600">${RH_GROUPS[gk][0].toUpperCase()}</text>`;
    const rows=[['Eligible',100,'var(--muted)'],['Attended at least 1 session',v,'var(--rec)'],['Completed 36 or more sessions',comp,'var(--gold)']];
    rows.forEach((r,i)=>{const y=L.y+i*62,bw=r[1]==null?0:L.w*r[1]/100;
      s+=`<text x="${L.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
      s+=`<rect x="${L.x}" y="${y+6}" width="${L.w}" height="26" rx="5" style="fill:var(--panel-2)"/>`;
      if(r[1]!=null){s+=`<rect x="${L.x}" y="${y+6}" width="${f1(Math.max(2,bw))}" height="26" rx="5" style="fill:${r[2]}"/><text x="${f1(Math.min(L.x+bw+6,L.x+L.w-40))}" y="${y+24}" class="t-lbl" style="fill:${bw>L.w-46?'var(--panel)':'var(--ink)'}">${r[1]===100?'100':r[1].toFixed(1)}%</text>`}
      else s+=`<text x="${L.x+8}" y="${y+24}" class="t-xs">not reported by group here</text>`});
    const gx=L.x+L.w*.7;s+=`<line x1="${f1(gx)}" x2="${f1(gx)}" y1="${L.y-8}" y2="${L.y+180}" style="stroke:var(--brand);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${f1(NG?L.x+L.w:gx+4)}" y="${L.y+194}" class="t-xs${NG?' t-end':''}" style="fill:var(--brand)">70% goal (Million Hearts, 2022)</text>`;
    if(all)s+=`<text x="${L.x}" y="${L.y+214}" class="t-xs">Of attenders: 24.3% started within 21 days;</text><text x="${L.x}" y="${L.y+228}" class="t-xs">26.9% completed 36 or more sessions.</text>`;
    else s+=`<text x="${L.x}" y="${L.y+214}" class="t-xs">Everyone: 24.4%. Gap to the goal: ${f1(70-RH_GROUPS[gk][1])} points.</text>`;
    /* icon array of 100 */
    const k=Math.round(v),A=icons(L.ix,L.iy,{n:100,cols:10,k,size:L.isz,gap:L.ig,col:'var(--rec)',shape:'person'});s+=A.svg;
    if(all){const B=icons(L.ix,L.iy,{n:7,cols:10,k:7,size:L.isz,gap:L.ig,col:'var(--gold)',shape:'person'});s+=B.svg}
    s+=`<text x="${L.ix}" y="${f1(L.iy-24)}" class="t-xs" style="fill:var(--ink)">Of 100 eligible: about ${k} attended</text>`+(all?`<text x="${L.ix}" y="${f1(L.iy-10)}" class="t-xs" style="fill:var(--gold)">about 7 completed 36 sessions</text>`:'');
    fu.innerHTML=s;
    $('#rhFunnelNote').innerHTML=`<div class="kicker">Medicare 2016 · ${RH_GROUPS[gk][0]}</div><h4>${RH_GROUPS[gk][1].toFixed(1)}% attended</h4><p>${{all:'About 1 in 4 eligible beneficiaries attended at least one session. Participation ranged from 18.6% to 39.1% across US regions.',men:'Men attended more often than women.',women:'Women attended less often than men even after adjustment (prevalence ratio 0.91).',white:'Non-Hispanic White beneficiaries attended about twice as often as Black or Hispanic beneficiaries.',black:'Non-Hispanic Black beneficiaries attended about half as often as non-Hispanic White beneficiaries.',hisp:'Hispanic beneficiaries had the lowest participation of the ethnic groups reported.',ami:'After a heart attack treated without a procedure, only 7.1% attended: the lowest of the qualifying events.',cabg:'After bypass surgery alone, 55.3% attended: the highest of the qualifying events, still short of the goal.'}[gk]} [[Ritchey2020]]</p><div class="pt"><b>%t:note.plain%</b>If you have had a heart attack, ask your team about a rehab referral, even if you did not have a stent or surgery.</div><div class="hook"><b>%t:note.hook%</b>Only about 1 in 4 eligible US Medicare beneficiaries attends CR (24.4%); women 18.9%, Black and Hispanic patients about 13%.</div>`;
  }
  $$('[data-rg]').forEach(b=>b.addEventListener('click',()=>{gk=b.dataset.rg;$$('[data-rg]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const a=gv,z=RH_GROUPS[gk][1];if(stopG)stopG();stopG=animate(500,p=>{gv=lerp(a,z,ease(p));drawG(gv)},()=>{gv=z;drawG(gv)})}));
  drawG(gv);
  const prevR=redraws.rehab;redraws.rehab=()=>{prevR&&prevR();drawF();drawG(gv)};
};
