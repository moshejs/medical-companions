/* =============== 3.5 Side effects, safety & misuse =============== */
/* main scrubber: t 0..1 = 0..16 years on a stimulant, starting at about age 8 (the MTA children were 7 to 9) */
const SF_YEARS=16,SF_AGE0=8;
const SF_STEPS=[
 {from:0,at:0,k:'Year 0',t:'Before the first dose',
  txt:`Labels ask for a careful history, a family history of sudden death or ventricular arrhythmia, a physical examination, and a check for tics or Tourette's syndrome before a stimulant starts. NICE adds height and weight against the normal range for age, and pulse and blood pressure with an appropriately sized cuff, so that every later reading has something to be compared with. [[FDA-Concerta,NICE2018F]]`,
  pt:`Before the medicine starts, the team measures height, weight, pulse and blood pressure and asks about heart problems in the family. Those first numbers are the yardstick for later visits.`,
  hook:`Baseline: height, weight, BP, HR, cardiac history, family history of sudden death, tics.`},
 {from:.03,at:.0625,k:'Year 1',t:'Appetite and weight come first',
  txt:`Decreased appetite is the commonest side effect in the label tables: 39% versus 4% on placebo for lisdexamfetamine in children. In a meta-analysis of 18 studies (4,868 children), the weight effect of methylphenidate was concentrated in the first 12 months. In the PATS preschool study, children who stayed on methylphenidate gained 55.2% less weight than expected (1.07 versus 2.39 kg per year) and grew 20.3% more slowly (5.41 versus 6.79 cm per year). [[FDA-Vyvanse,Carucci2021,Swanson2006PATS]]`,
  pt:`In the first months many children are less hungry at lunch, and weight gain slows. Meals early in the morning or in the evening can help, and the team keeps an eye on it.`,
  hook:`The weight effect is greatest in the first 12 months; the height effect in the first 24 to 30 months.`},
 {from:.12,at:.1875,k:'Year 3',t:'What the label reports',
  txt:`Children aged 7 to 13 taking methylphenidate 7 days a week for 14 to 36 months had a temporary slowing of growth: on average about 2 cm less height and 2.7 kg less weight over 3 years, "without evidence of growth rebound" during that time. Labels warn of "long-term suppression of growth" and say children who are not growing or gaining weight as expected "may need to have their treatment interrupted". [[FDA-Concerta,FDA-Vyvanse]]`,
  pt:`On average, after 3 years a child on a stimulant is about 2 cm shorter and 2.7 kg lighter than expected. Measuring every 6 months shows who is affected more.`,
  hook:`Label: about 2 cm and 2.7 kg less over 3 years of daily methylphenidate.`},
 {from:.25,at:.375,k:'Years 3 to 6',t:'Pulse, pressure and cumulative years',
  txt:`Stimulants raise blood pressure by about 2 to 4 mm Hg and heart rate by about 3 to 6 beats per minute on average, with larger rises in some people. The AAP gives 1 to 2 bpm and 1 to 4 mm Hg, with larger increases in 5% to 15%. In a Swedish case-control study, cardiovascular odds rose with cumulative years of use, from 0.99 in the first year to 1.27 at 3 to 5 years, about 4% per extra year, mostly hypertension. [[FDA-Concerta,Wolraich2019,Zhang2024JAMAPsych]] <span class="ev early">Early evidence</span>`,
  pt:`The medicine nudges pulse and blood pressure up a little. That is why they are checked after every dose change and every 6 months, for as long as the medicine is taken.`,
  hook:`Usual stimulant effect: BP +2 to 4 mm Hg, HR +3 to 6 bpm. Monitor all ADHD medicines, not only stimulants.`},
 {from:.6,at:1,k:'Adulthood',t:'The MTA follow-up at about age 25',
  txt:`In the MTA follow-up, people who took stimulants consistently or inconsistently through childhood were 2.55 ± 0.73 cm shorter as adults than those with negligible use; consistent users were 2.36 ± 1.13 cm shorter than inconsistent users. Other cohorts are more reassuring: ADDUCE (1,410 children) found "little evidence of an effect on growth" after 24 months (height velocity SD score difference −0.07), and a meta-analysis judged the effects small (height SMD 0.27, weight SMD 0.33). [[Swanson2017MTA,Man2023ADDUCE,Carucci2021]]`,
  pt:`Across studies the average height effect is small, about 2 to 2.5 cm, but a few children are affected more. Plotting height on a growth chart is how they are found.`,
  hook:`MTA: consistent childhood stimulant use was associated with about 2.5 cm shorter adult height.`}
];
/* label adverse-event tables: [name, % on drug, % on placebo] */
const SF_AE=[
 {id:'vyv',n:'Lisdexamfetamine (Vyvanse), children',trial:'4-week trial, 218 on medicine vs 72 on placebo',c:`[[FDA-Vyvanse]]`,
  e:[['Decreased appetite',39,4],['Insomnia',22,3],['Upper abdominal pain',12,6],['Irritability',10,0],['Weight decrease',9,1]]},
 {id:'axr',n:'Mixed amphetamine salts XR (Adderall XR), children 6–12',trial:'374 on medicine vs 210 on placebo',c:`[[FDA-AdderallXR]]`,
  e:[['Loss of appetite',22,2],['Insomnia',17,2],['Abdominal pain',14,10]]},
 {id:'cona',n:'OROS methylphenidate (Concerta), adults',trial:'415 on medicine vs 212 on placebo',c:`[[FDA-Concerta]]`,
  e:[['Decreased appetite',25,7],['Headache',22,16],['Dry mouth',14,4],['Nausea',13,3],['Insomnia',12,6],['Anxiety',8,2],['Tachycardia',5,0]]},
 {id:'conc',n:'OROS methylphenidate (Concerta), children',trial:'321 on medicine vs 318 on placebo; the only reaction at 5% or more was upper abdominal pain',c:`[[FDA-Concerta]]`,
  e:[['Upper abdominal pain',6,4],['Insomnia',3,1]]},
 {id:'atx',n:'Atomoxetine (Strattera), children',trial:'1,597 on medicine vs 934 on placebo',c:`[[FDA-Strattera]]`,
  e:[['Headache',19,15],['Abdominal pain',18,10],['Decreased appetite',16,4],['Somnolence',11,4],['Vomiting',11,6]]},
 {id:'vlx',n:'Viloxazine ER (Qelbree), adults',trial:'adult trials, medicine vs placebo',c:`[[FDA-Qelbree]]`,
  e:[['Insomnia',23,7],['Headache',17,7],['Nausea',12,3],['Fatigue',12,3],['Dry mouth',10,2],['Decreased appetite',10,3]]},
 {id:'gxr',n:'Guanfacine ER (Intuniv), children and adolescents',trial:'fixed-dose trials; somnolence at the 4 mg dose, hypotension across doses',c:`[[FDA-Intuniv]]`,
  e:[['Somnolence (4 mg)',51,11],['Somnolence (1 mg)',28,11],['Hypotension',7,3]]}
];
inits.safety=()=>{
  const svg=$('#sfSvg'),rg=$('#sfT');let mode='h';
  /* schematic reference curves: only the GAPS come from the sources */
  const hRef=a=>176-48*Math.exp(-Math.pow(Math.max(0,a-SF_AGE0)/5.5,1.6));
  const wRef=a=>72-46*Math.exp(-Math.pow(Math.max(0,a-SF_AGE0)/6,1.5));
  /* height gap: front-loaded to -2 cm at 3 y (label), drifting to -2.55 cm by the MTA adult visit */
  const gH=y=>y<=3?-2*(1-Math.pow(1-y/3,2)):-2-.55*clamp((y-3)/13);
  /* weight gap: mostly in year 1, -2.7 kg at 3 y (label); no later point in these sources */
  const gW=y=>-2.7*(1-Math.exp(-Math.min(y,3)/.8))/(1-Math.exp(-3.75));
  const AOR=[[0,1,.99,'0–1 y'],[1,2,1.09,'1–2'],[2,3,1.15,'2–3'],[3,5,1.27,'3–5'],[5,16,1.23,'>5 y']];
  const VB=[ /* label, unit, lo, hi, colour */
    ['Stimulants (label): heart rate','bpm',3,6,'var(--drug)'],
    ['Stimulants (AAP): heart rate','bpm',1,2,'var(--drug)'],
    ['Atomoxetine vs placebo: pulse, children','bpm',5.58,5.58,'var(--ne)'],
    ['Viloxazine vs placebo: pulse, children','bpm',2.79,2.79,'var(--ne)'],
    ['Guanfacine vs placebo: pulse, children','bpm',-4.06,-4.06,'var(--rx)'],
    ['Stimulants (label): blood pressure','mm Hg',2,4,'var(--dz)'],
    ['Stimulants (AAP): blood pressure','mm Hg',1,4,'var(--dz)'],
    ['Guanfacine vs placebo: systolic BP, children','mm Hg',-2.83,-2.83,'var(--rx)']];
  const CAP={h:`Grey dashed: a schematic growth curve, not a growth standard. Teal: the same curve minus the published average gap. The second chart magnifies the gap. Points: label (about 2 cm over 3 years), PATS preschoolers (5.41 vs 6.79 cm per year, so about 1.4 cm in a year), MTA at about age 25 (−2.55 ± 0.73 cm versus negligible use). The line between the points is drawn, not measured, and the points come from different studies and comparators. [[FDA-Concerta,Swanson2006PATS,Swanson2017MTA]]`,
    w:`Grey dashed: a schematic weight curve. Teal: minus the published average gap, which is largest in year 1 and about 2.7 kg at 3 years in the label; the PATS point is 1.07 vs 2.39 kg per year in preschoolers. These sources give no later weight point, so the line goes dashed after 3 years. [[FDA-Concerta,Swanson2006PATS,Carucci2021]]`,
    v:`Bars: mean changes as published. Label and AAP figures are ranges for stimulants; atomoxetine, viloxazine and guanfacine are differences from placebo in children from a network meta-analysis of 102 short-term trials. Step chart: adjusted odds of cardiovascular disease by cumulative years of ADHD medication in a Swedish case-control study; population statistics, not one person's risk. [[FDA-Concerta,Wolraich2019,Farhat2025CV,Zhang2024JAMAPsych]]`};
  function gapPanel(s,P,y,H){
    const A=axes(P.x,P.y,P.w,P.h,{x0:0,x1:SF_YEARS,y0:-3.5,y1:.5,xt:[0,3,6,10,16],yt:[-3,-2,-1,0],fy:v=>v?String(v).replace('-','−'):'0',xl:'years on a stimulant',yl:H?'GAP IN HEIGHT (cm)':'GAP IN WEIGHT (kg)'});
    s+=A.svg+`<line x1="${f1(A.X(0))}" x2="${f1(A.X(SF_YEARS))}" y1="${f1(A.Y(0))}" y2="${f1(A.Y(0))}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    const g=H?gH:gW,pts=[];for(let u=0;u<=SF_YEARS+.001;u+=.1)pts.push([u,g(u)]);
    const end=H?SF_YEARS:3;
    s+=trace(pts.filter(p=>p[0]<=end),A.X,A.Y,{c:'var(--rx)',w:2.6,area:true,upto:y});
    if(!H&&y>3)s+=trace(pts.filter(p=>p[0]>=3),A.X,A.Y,{c:'var(--rx)',w:1.6,dash:'3 5',upto:y});
    const pin=(px,pv,lab,lab2,right,eb)=>{if(y<px-.02)return '';const cx=A.X(px),cy=A.Y(pv);let r='';
      if(eb)r+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${f1(A.Y(pv-eb))}" y2="${f1(A.Y(pv+eb))}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${f1(cx-4)}" x2="${f1(cx+4)}" y1="${f1(A.Y(pv-eb))}" y2="${f1(A.Y(pv-eb))}" style="stroke:var(--ink)"/><line x1="${f1(cx-4)}" x2="${f1(cx+4)}" y1="${f1(A.Y(pv+eb))}" y2="${f1(A.Y(pv+eb))}" style="stroke:var(--ink)"/>`;
      r+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.8"/>`;
      const tx=right?cx+9:cx-9,cls=right?'t-xs':'t-xs t-end';
      r+=`<text x="${f1(tx)}" y="${f1(cy+16)}" class="${cls}" style="fill:var(--ink)">${lab}</text><text x="${f1(tx)}" y="${f1(cy+27)}" class="${cls}">${lab2}</text>`;return r};
    if(H){s+=pin(1,-1.38,'PATS, preschool','≈1.4 cm in 1 y',true);s+=pin(3,-2,'Label','≈2 cm by 3 y',true);s+=pin(16,-2.55,'MTA, age ≈25','−2.55 cm',false,.73)}
    else{s+=pin(1,-1.32,'PATS, preschool','≈1.3 kg in 1 y',true);s+=pin(3,-2.7,'Label','≈2.7 kg by 3 y',true)}
    const gy=g(Math.min(y,H?SF_YEARS:3));
    s+=`<line x1="${f1(A.X(y))}" x2="${f1(A.X(y))}" y1="${P.y}" y2="${P.y+P.h}" style="stroke:var(--ink);opacity:.28"/>`;
    return {s,gy}}
  function growthPanel(s,P,age,H){
    const ref=H?hRef:wRef,g=H?gH:gW;
    const A=axes(P.x,P.y,P.w,P.h,{x0:SF_AGE0,x1:SF_AGE0+SF_YEARS,y0:H?120:20,y1:H?180:80,xt:[8,12,16,20,24],yt:H?[120,135,150,165,180]:[20,35,50,65,80],xl:'age (years)',yl:H?'HEIGHT (cm), SCHEMATIC CURVE':'WEIGHT (kg), SCHEMATIC CURVE'});
    s+=A.svg;const R=[],M=[];for(let a=SF_AGE0;a<=SF_AGE0+SF_YEARS+.001;a+=.2){R.push([a,ref(a)]);M.push([a,ref(a)+g(a-SF_AGE0)])}
    s+=trace(R,A.X,A.Y,{c:'var(--muted)',w:2,dash:'6 4'});
    const cut=H?99:SF_AGE0+3;
    s+=trace(M.filter(p=>p[0]<=cut),A.X,A.Y,{c:'var(--rx)',w:2.6,upto:age});
    if(!H&&age>cut)s+=trace(M.filter(p=>p[0]>=cut),A.X,A.Y,{c:'var(--rx)',w:1.6,dash:'3 5',upto:age});
    const cx=A.X(age),r1=A.Y(ref(age)),r2=A.Y(ref(age)+g(age-SF_AGE0));
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${P.y}" y2="${P.y+P.h}" style="stroke:var(--ink);opacity:.28"/><circle cx="${f1(cx)}" cy="${f1(r1)}" r="4" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.8"/><circle cx="${f1(cx)}" cy="${f1(r2)}" r="4.5" style="fill:var(--rx)"/>`;
    /* magnifier ring: the two curves are a pen-width apart at this scale */
    const lx=cx>P.x+P.w*.6?cx-14:cx+14,anc=cx>P.x+P.w*.6?'t-xs t-end':'t-xs';
    s+=`<circle cx="${f1(cx)}" cy="${f1((r1+r2)/2)}" r="11" style="fill:none;stroke:var(--brand);stroke-width:1.4;stroke-dasharray:3 2"/><text x="${f1(lx)}" y="${f1(r2+26)}" class="${anc}" style="fill:var(--brand)">curves almost touch here</text>`;
    /* legend */
    const ly=P.y+P.h-34,lx0=P.x+P.w-150;
    s+=`<line x1="${lx0}" x2="${lx0+22}" y1="${ly}" y2="${ly}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:6 4"/><text x="${lx0+28}" y="${ly+3.5}" class="t-xs">expected</text><line x1="${lx0}" x2="${lx0+22}" y1="${ly+15}" y2="${ly+15}" style="stroke:var(--rx);stroke-width:2.6"/><text x="${lx0+28}" y="${ly+18.5}" class="t-xs">on a stimulant</text>`;
    return s}
  function vitalsPanel(s,P,t){
    const k=ease(ramp(t,0,.14)),A={X:v=>P.x+(v+6)/14*P.w},yb=P.y+P.h;
    s+=`<text x="${P.x}" y="${P.y+4}" class="t-sm">MEAN CHANGE IN PULSE AND BLOOD PRESSURE</text>`;
    s+=`<line x1="${P.x}" x2="${P.x+P.w}" y1="${yb}" y2="${yb}" class="axis"/>`;
    [-6,-4,-2,0,2,4,6,8].forEach(v=>{s+=`<line x1="${f1(A.X(v))}" x2="${f1(A.X(v))}" y1="${yb}" y2="${yb+4}" class="axis"/><text x="${f1(A.X(v))}" y="${yb+15}" class="t-xs t-mid">${v>0?'+'+v:String(v).replace('-','−')}</text>`});
    s+=`<text x="${P.x+P.w}" y="${yb+29}" class="t-xs t-end">mean change (bpm or mm Hg)</text>`;
    const rowH=(P.h-34)/VB.length;
    VB.forEach(([lab,u,lo,hi,c],i)=>{const yy=P.y+30+i*rowH,bh=Math.min(9,rowH*.34),x0=A.X(0),xl=A.X(lo*k),xh=A.X(hi*k);
      s+=`<text x="${P.x+2}" y="${f1(yy)}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;
      const by=yy+4;
      s+=`<line x1="${f1(x0)}" x2="${f1(x0)}" y1="${f1(by-3)}" y2="${f1(by+bh+3)}" style="stroke:var(--ink);stroke-width:1.2"/>`;
      s+=`<rect x="${f1(Math.min(x0,xl))}" y="${f1(by)}" width="${f1(Math.abs(xl-x0))}" height="${f1(bh)}" rx="2" style="fill:${c}"/>`;
      if(hi!==lo)s+=`<rect x="${f1(Math.min(xl,xh))}" y="${f1(by)}" width="${f1(Math.abs(xh-xl))}" height="${f1(bh)}" rx="2" style="fill:${c};opacity:.35"/>`;
      const v=hi!==lo?`+${lo} to ${hi} ${u}`:`${hi>0?'+':'−'}${Math.abs(hi)} ${u}`,tx=hi>=0?A.X(hi*k)+5:A.X(lo*k)-5;
      if(k>.5)s+=`<text x="${f1(tx)}" y="${f1(by+bh-1)}" class="t-xs ${hi>=0?'':'t-end'}" style="fill:var(--ink)">${v}</text>`});
    return s}
  function aorPanel(s,P,y){
    const A=axes(P.x,P.y,P.w,P.h,{x0:0,x1:SF_YEARS,y0:.9,y1:1.4,xt:[0,1,2,3,5,10,16],yt:[.9,1,1.1,1.2,1.3,1.4],fy:v=>v.toFixed(1),xl:'cumulative years of use',yl:'ODDS OF CVD vs NON-USE (AOR)'});
    s+=A.svg+`<line x1="${f1(A.X(0))}" x2="${f1(A.X(SF_YEARS))}" y1="${f1(A.Y(1))}" y2="${f1(A.Y(1))}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${f1(A.X(SF_YEARS)-2)}" y="${f1(A.Y(1)+12)}" class="t-xs t-end">no difference</text>`;
    AOR.forEach(([a,b,v,l],i)=>{if(y<a)return;const e=Math.min(y,b),x0=A.X(a),x1=A.X(e),yy=A.Y(v);
      s+=`<rect x="${f1(x0)}" y="${f1(Math.min(yy,A.Y(1)))}" width="${f1(Math.max(0,x1-x0-1))}" height="${f1(Math.abs(A.Y(1)-yy))}" style="fill:var(--dz);opacity:.16"/><line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--dz);stroke-width:2.6"/>`;
      if(y>=Math.min(b,a+.6))s+=`<text x="${f1((x0+A.X(Math.min(b,a+(i===4?3:b-a)))) /2)}" y="${f1(yy-6)}" class="t-xs t-mid" style="fill:var(--ink)">${v.toFixed(2)}</text>`});
    if(y>=3)s+=`<text x="${f1(A.X(5)+4)}" y="${f1(A.Y(1.4)+14)}" class="t-xs" style="fill:var(--dz)">hypertension: AOR 1.72 at 3–5 y,</text><text x="${f1(A.X(5)+4)}" y="${f1(A.Y(1.4)+26)}" class="t-xs" style="fill:var(--dz)">1.80 beyond 5 y</text>`;
    s+=`<line x1="${f1(A.X(y))}" x2="${f1(A.X(y))}" y1="${P.y}" y2="${P.y+P.h}" style="stroke:var(--ink);opacity:.28"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 660'),y=t*SF_YEARS,age=SF_AGE0+y;
    const P1=N?{x:48,y:34,w:334,h:236}:{x:52,y:36,w:338,h:286};
    const P2=N?{x:48,y:376,w:334,h:224}:{x:452,y:36,w:246,h:286};
    let s='',read='';
    if(mode==='v'){
      s=vitalsPanel(s,N?{x:12,y:16,w:370,h:300}:{x:12,y:18,w:380,h:316},t);
      s=aorPanel(s,N?{x:48,y:400,w:334,h:200}:P2,y);
      const bin=AOR.find(b=>y>=b[0]&&y<b[1])||AOR[4];
      read=`<span>years of use <b>${f1(y)}</b></span><span>stimulant mean rise <b>BP +2–4 mm Hg · HR +3–6 bpm</b></span><span>CVD odds at this duration <b>AOR ${bin[2].toFixed(2)}</b></span>`;
    }else{
      const H=mode==='h';
      s=growthPanel(s,P1,age,H);
      const G=gapPanel('',P2,y,H);s+=G.s;
      s+=`<text x="${P2.x+P2.w}" y="${P2.y+14}" class="t-big t-end" style="fill:var(--rx)">${G.gy<-.005?'−':''}${Math.abs(G.gy).toFixed(1)} ${H?'cm':'kg'}</text><text x="${P2.x+P2.w}" y="${P2.y+28}" class="t-xs t-end">average gap ${!H&&y>3?'(last point: 3 y)':'at this point'}</text>`;
      read=`<span>years on a stimulant <b>${f1(y)}</b></span><span>age about <b>${Math.round(age)}</b></span><span>average ${H?'height':'weight'} gap <b>${G.gy<-.005?'−':''}${Math.abs(G.gy).toFixed(1)} ${H?'cm':'kg'}</b>${!H&&y>3?' (no later point)':''}</span>`;
    }
    svg.innerHTML=s;
    const p=phaseOf(SF_STEPS,t);setSt(p);
    $('#sfRead').innerHTML=read;
    $('#sfNote').innerHTML=noteHTML(SF_STEPS[p]);
  }
  const stop=playWire(rg,$('#sfPlay'),draw,22000,'Replay','safety');
  const setSt=stepWire($('#sfSteps'),SF_STEPS,rg,draw,stop);
  function setMode(m){mode=m;$$('[data-sfm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sfm===m));$('#sfCap').innerHTML=CAP[m];draw(+rg.value)}
  $$('[data-sfm]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.sfm)));
  setMode('h');

  /* ---- icon arrays: medicine vs placebo per 100 ---- */
  const ae=$('#sfAeSvg'),sel=$('#sfMed'),bx=$('#sfAeBtns');let med=SF_AE[0],eff=0,stopAE=null;
  sel.innerHTML=SF_AE.map(m=>`<option value="${m.id}">${m.n}</option>`).join('');
  function drawAE(k){
    const N=vb(ae,'720 290','400 560'),[nm,d,p]=med.e[eff],dd=Math.round(d*k),pp=Math.round(p*k);
    const pitch=N?20:19,s0=N?15:14.5,G=N?[{x:100,y:56,lab:'Placebo'},{x:100,y:330,lab:'On the medicine'}]:[{x:50,y:62,lab:'Placebo'},{x:470,y:62,lab:'On the medicine'}];
    let s='';
    G.forEach((g,gi)=>{const n=gi?dd:pp;
      s+=`<text x="${g.x}" y="${g.y-30}" class="t-sm">${g.lab.toUpperCase()}</text><text x="${g.x+pitch*10-4}" y="${g.y-28}" class="t-big t-end" style="fill:${gi?'var(--drug)':'var(--muted)'}">${n} in 100</text>`;
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=g.x+c*pitch+pitch/2-2,yy=g.y-16+r*pitch+2;
        let fill='var(--line)';if(gi){if(i<Math.min(pp,dd))fill='var(--muted)';else if(i<dd)fill='var(--drug)'}else if(i<pp)fill='var(--muted)';
        s+=person(x,yy,s0,fill)}});
    /* the extra people bracket */
    const ex=d-p;
    const mx=N?200:355,my=N?300:150;
    s+=`<text x="${mx}" y="${my}" class="t-lbl t-mid">${nm}</text><text x="${mx}" y="${my+16}" class="t-sm t-mid" style="fill:${ex>0?'var(--drug)':'var(--muted)'}">${ex>0?'+'+Math.round(ex*k)+' per 100':'no excess'}</text>`;
    if(!N)s+=`<path d="M${mx-28} ${my+30}H${mx+28}" style="stroke:var(--drug);stroke-width:2" marker-end="url(#sfAeAr)"/>`;
    s+=`<defs>${marker('sfAeAr','var(--drug)')}</defs>`;
    s+=N?`<g transform="translate(100 548)"><rect width="10" height="10" rx="2" y="-9" style="fill:var(--muted)"/><text x="14" class="t-xs">also on placebo</text><rect x="118" width="10" height="10" rx="2" y="-9" style="fill:var(--drug)"/><text x="132" class="t-xs">extra on medicine</text></g>`
         :`<g transform="translate(50 284)"><rect width="10" height="10" rx="2" y="-9" style="fill:var(--muted)"/><text x="14" class="t-xs">reported it on placebo (or the same rate on the medicine)</text><rect x="350" width="10" height="10" rx="2" y="-9" style="fill:var(--drug)"/><text x="364" class="t-xs">extra people above the placebo rate</text></g>`;
    ae.innerHTML=s;
  }
  function noteAE(){const [nm,d,p]=med.e[eff],ex=d-p,nn=ex>0?Math.round(100/ex):0;
    $('#sfAeCap').innerHTML=`${med.n}: ${med.trial}. Percentages from the label table, rounded to whole people per 100. ${med.c}`;
    $('#sfAeNote').innerHTML=noteHTML({k:med.n,t:`${nm}: ${d}% vs ${p}%`,
      txt:ex>0?`Out of 100 people, ${d} on the medicine and ${p} on placebo reported ${nm.toLowerCase()}. So about ${ex} in 100 had it because of the medicine, roughly 1 in ${nn} (simple arithmetic from the label percentages). ${med.c}`:`The rates are the same on the medicine and on placebo. ${med.c}`,
      pt:`Some people feel these things on a dummy pill too. The coral figures are the extra people, the part the medicine adds.`,
      hook:med.id==='vyv'||med.id==='axr'||med.id==='cona'?`Decreased appetite and insomnia are the commonest stimulant side effects in label tables.`:med.id==='gxr'?`Guanfacine ER somnolence rises with dose: 11% placebo, 28% at 1 mg, 51% at 4 mg.`:`Compare against placebo: the difference, not the raw rate, is the medicine's effect.`})}
  function buttons(){bx.innerHTML=`<span class="kicker">Side effect</span>`+med.e.map((e,i)=>`<button class="btn" data-sfae="${i}" aria-pressed="${i===eff}">${e[0]}</button>`).join('')}
  function run(){if(stopAE)stopAE();noteAE();stopAE=animate(700,p=>drawAE(ease(p)),()=>{stopAE=null})}
  bx.addEventListener('click',e=>{const b=e.target.closest('[data-sfae]');if(!b)return;eff=+b.dataset.sfae;$$('[data-sfae]',bx).forEach(x=>x.setAttribute('aria-pressed',x===b));run()});
  const onSel=()=>{const nm=med.e[eff][0];med=SF_AE.find(m=>m.id===sel.value)||SF_AE[0];const j=med.e.findIndex(e=>e[0]===nm);eff=j<0?0:j;buttons();run()};
  sel.addEventListener('change',onSel);
  buttons();noteAE();drawAE(1);
  const prevR=redraws.safety;redraws.safety=()=>{prevR&&prevR();drawAE(1)};
};
