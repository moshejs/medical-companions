/* =============== 1.6 Who is at risk =============== */
/* forest rows: label, short label (phones), estimate, lo, hi (null = no CI in the source), note, colour */
const RK_MED=[
 {l:'HIV with TB infection (vs HIV without)',s:'HIV + TB infection',e:24,lo:null,hi:null,n:'rate ratio',c:'var(--bad)'},
 {l:'Anti-TNF antibody therapy',s:'Anti-TNF antibodies',e:12.2,lo:9.7,hi:15.5,n:'SIR',c:'var(--vax)'},
 {l:'Transplant recipients',s:'Transplant',e:11.35,lo:2.97,hi:43.41,n:'RR, unadjusted',c:'var(--vax)'},
 {l:'Prior TB: reinfection after cure',s:'Prior TB (Cape Town)',e:4,lo:null,hi:null,n:'≈4× new TB',c:'var(--warn)'},
 {l:'Silicosis',s:'Silicosis',e:3.96,lo:2.59,hi:6.06,n:'rate ratio',c:'var(--fibro)'},
 {l:'Dialysis (end-stage kidney disease)',s:'Dialysis',e:3.62,lo:1.79,hi:7.33,n:'adj. rate ratio',c:'var(--vax)'},
 {l:'Alcohol use disorders',s:'Alcohol use disorders',e:3.33,lo:2.14,hi:5.19,n:'RR',c:'var(--warn)'},
 {l:'Undernutrition: BMI 17 vs 25 (derived)',s:'BMI 17 vs 25 (derived)',e:3.28,lo:3.16,hi:3.4,n:'derived',c:'var(--gold)',der:1},
 {l:'Diabetes',s:'Diabetes',e:3.11,lo:2.27,hi:4.26,n:'RR',c:'var(--accent)'},
 {l:'Smoking: TB disease',s:'Smoking (disease)',e:2.33,lo:1.97,hi:2.75,n:'RR, to 2.66',c:'var(--muted)'},
 {l:'Smoking: TB infection',s:'Smoking (infection)',e:1.73,lo:1.46,hi:2.04,n:'RR',c:'var(--muted)'},
 {l:'Any alcohol use',s:'Any alcohol use',e:1.35,lo:1.09,hi:1.68,n:'RR',c:'var(--warn)'}];
const RK_DRUG=[
 {l:'Adalimumab (antibody)',s:'Adalimumab',e:29.3,lo:20.3,hi:42.4,n:'SIR',c:'var(--vax)'},
 {l:'Infliximab (antibody)',s:'Infliximab',e:18.6,lo:13.4,hi:25.8,n:'SIR',c:'var(--vax)'},
 {l:'All anti-TNF antibodies',s:'All anti-TNF antibodies',e:12.2,lo:9.7,hi:15.5,n:'SIR',c:'var(--vax)'},
 {l:'Transplant recipients',s:'Transplant',e:11.35,lo:2.97,hi:43.41,n:'RR',c:'var(--vax)'},
 {l:'Dialysis',s:'Dialysis',e:3.62,lo:1.79,hi:7.33,n:'adj. RR',c:'var(--vax)'},
 {l:'Etanercept (soluble receptor)',s:'Etanercept',e:1.8,lo:.7,hi:4.3,n:'SIR',c:'var(--rx)'}];
const RK_PREV=[
 {l:'Food rations for household contacts',s:'Food rations (RATIONS)',e:.61,lo:.43,hi:.85,n:'adj. IRR',c:'var(--gold)'},
 {l:'ART, CD4 above 350',s:'ART, CD4 >350',e:.43,lo:.3,hi:.63,n:'HR',c:'var(--rx)'},
 {l:'TPT, all exposed children',s:'TPT, all exposed children',e:.37,lo:.3,hi:.47,n:'adj. HR',c:'var(--vax)'},
 {l:'ART, any CD4 count',s:'ART, any CD4',e:.35,lo:.28,hi:.44,n:'HR',c:'var(--rx)'},
 {l:'ART, CD4 200–350',s:'ART, CD4 200–350',e:.34,lo:.19,hi:.6,n:'HR',c:'var(--rx)'},
 {l:'Prior infection, then re-exposed',s:'Prior infection, re-exposed',e:.21,lo:.14,hi:.3,n:'adj. IRR',c:'var(--muted)'},
 {l:'ART, CD4 below 200',s:'ART, CD4 <200',e:.16,lo:.07,hi:.36,n:'HR',c:'var(--rx)'},
 {l:'TPT, infection-test-positive children',s:'TPT, infection-positive children',e:.09,lo:.05,hi:.15,n:'adj. HR',c:'var(--vax)'}];
const RK_PAF=[
 {l:'Undernutrition (global)',s:'Undernutrition',v:20,ext:33,el:'>⅓ in India',c:'var(--gold)'},
 {l:'Smoking (32 high-burden countries)',s:'Smoking',v:17.6,lo:8.4,hi:21.4,ext:30.3,el:'men 30.3%',c:'var(--muted)'},
 {l:'Alcohol (global)',s:'Alcohol',v:10,c:'var(--warn)'},
 {l:'HIV (adults, 2000)',s:'HIV',v:9,lo:7,hi:12,ext:31,el:'WHO Africa 31%',c:'var(--bad)'},
 {l:'Transmission inside prisons',s:'Prisons',v:6.3,ext:8.5,el:'high-income 8.5%',c:'var(--accent)'}];
const RK_ABS=[
 {l:'Under-5 child contacts, infected, untreated (2 y)',s:'Under-5 infected contacts, 2 y',v:19,lo:8.4,hi:37.4},
 {l:'Infected contacts, Amsterdam (5 y, all TB)',s:'Infected contacts, 5 y',v:9.5,lo:7.5,hi:11.9},
 {l:'…of which incident after 180 days (5 y)',s:'…incident after 180 days',v:2.4,lo:1.2,hi:4.7},
 {l:'Close contacts, US and Canada (year 1)',s:'Close contacts, year 1',v:2.644,lo:null,hi:null}];
const RK_STEPS=[
 {from:0,at:.07,k:'Exposure → infection → disease',t:'Most infected people stay well',view:'abs',
  txt:`About a quarter of the world has immune evidence of TB infection, yet in 2024 about 10.7 million people developed TB disease. Among 739 infected contacts in Amsterdam the 5-year risk was 9.5%, but most of it was disease already present at screening: incident TB after 180 days was 2.4%. Risk is front-loaded: among close contacts in the US and Canada, the TB rate was 2644 per 100,000 in year 1 and 115 in year 2. The highest absolute risk is in young children. [[Houben2016,Zenner2027,Sloot2014,Reichler2018,Martinez2020Lancet]]`,
  pt:`Being infected is common. Getting sick is not, and when it happens it is usually within the first year or two.`,
  hook:`Under-5 child contacts with a positive infection test and no preventive treatment: 19.0% developed TB within 2 years; 83% were diagnosed within 90 days. [[Martinez2020Lancet]]`},
 {from:.15,at:.4,k:'Medical risk factors',t:'What weakens the defence',view:'med',
  txt:`HIV is the strongest known risk factor. In the founding cohort, people with HIV and a positive tuberculin test developed TB at 7.9 per 100 person-years against 0.3 without one; HIV raised the risk of disease, not of becoming infected. Diabetes roughly triples risk, as do silicosis, dialysis and alcohol use disorders. Undernutrition follows a steady gradient: about 13.8% lower incidence per BMI unit, which makes BMI 17 about 3.3 times BMI 25 (derived). [[Suthar2012,Selwyn1989,Jeon2008,Hnizdo1998,AlEfraij2015,Imtiaz2017,Lonnroth2010BMI]]`,
  pt:`HIV, diabetes, being underweight, heavy drinking, smoking, dust disease of the lungs and kidney failure all make TB more likely.`,
  hook:`Diabetes RR 3.11 · silicosis 3.96 · dialysis 3.62 · alcohol use disorders 3.33 · smoking 2.33–2.66 for disease. [[Jeon2008,Hnizdo1998,AlEfraij2015,Imtiaz2017,Bates2007]]`},
 {from:.45,at:.53,k:'Medicines that block TNF',t:'Not all biologics are equal',view:'drug',
  txt:`TNF holds granulomas together. In the French RATIO registry, TB incidence on anti-TNF monoclonal antibodies was 116.7 per 100,000 patient-years, 12.2 times the general population; for adalimumab it was 29.3 and infliximab 18.6, against 1.8 for etanercept, a soluble receptor whose interval crosses 1. Transplant recipients carried a pooled unadjusted risk ratio of 11.35. [[Tubach2009,AlEfraij2015,Keane2001]]`,
  pt:`Some arthritis and bowel-disease medicines can wake up a sleeping TB infection. Doctors test for TB infection before starting them.`,
  hook:`Anti-TNF SIR: adalimumab 29.3, infliximab 18.6, etanercept 1.8. Median onset after infliximab: 12 weeks; 40 of 70 cases extrapulmonary. [[Tubach2009,Keane2001]]`},
 {from:.6,at:.68,k:'Population view',t:'Cases attributable worldwide',view:'paf',
  txt:`A modest risk ratio applied to many people causes many cases. About 20% of global TB incidence is attributed to undernutrition (more than a third in India), 17.6% to smoking in 32 high-burden countries (30.3% in men, 4.3% in women), about 10% to alcohol, and 9% of adult cases in 2000 to HIV (31% in the WHO African region). WHO tracks five such factors each year: undernutrition, HIV, alcohol use disorders, smoking and diabetes. These shares come from different years and methods and overlap in the same people, so they are never added up. [[McQuaid2025,Amere2018,Rehm2009,Corbett2003,WHO-GTR2025,Lonnroth2009]]`,
  pt:`Hunger and smoking cause more TB worldwide than any rare condition, because so many people are affected by them.`,
  hook:`Attributable fractions overlap and are not additive: undernutrition ~20%, smoking 17.6%, alcohol ~10%, HIV 9% (2000). [[Lonnroth2009]]`},
 {from:.78,at:.92,k:'What lowers risk',t:'Prevention works',view:'prev',
  txt:`Antiretroviral therapy cut TB incidence at every CD4 level (HR 0.35 overall). Preventive treatment was 91% effective in child contacts with a positive infection test (HR 0.09) and 63% in all exposed children. Food rations for household contacts in RATIONS cut incidence by 39–48%. Prior infection gave partial protection after re-exposure (IRR 0.21), but in high-transmission Cape Town reinfection after cure still ran at 2.2 per 100 person-years. [[Suthar2012,Martinez2020Lancet,Bhargava2023Lancet,Andrews2012Reinfection,Verver2005]]`,
  pt:`HIV treatment, TB preventive medicine and enough food all lower the chance of getting TB.`,
  hook:`ART lowers TB risk by about two thirds at any CD4 count (HR 0.35, 95% CI 0.28–0.44). [[Suthar2012]]`}
];
inits.risk=()=>{
  const svg=$('#rkSvg'),rg=$('#rkT');let view='med',lastPh=-1,setSt=()=>{};
  const sync=()=>$$('[data-rkv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.rkv===(view==='paf'?'paf':'rr')));
  const LG=v=>Math.log10(v),A=.05,B=50;
  function forest(rows,N,k,title,sub){
    const L=N?{x0:18,x1:300,v:312,top:58,rh:38,lab:-7}:{lab0:12,x0:296,x1:598,v:608,top:62,rh:Math.min(30,330/rows.length)};
    const X=v=>lerp(L.x0,L.x1,(LG(clamp(v,A,B))-LG(A))/(LG(B)-LG(A)));let s='';
    const H=L.top+rows.length*L.rh+6;
    s+=`<text x="${N?18:12}" y="22" class="t-sm" style="fill:var(--tb)">${title}</text><text x="${N?18:12}" y="38" class="t-xs">${sub}</text>`;
    (N?[.1,.5,1,2,5,10,50]:[.05,.1,.25,.5,1,2,5,10,25,50]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-8}" y2="${H}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);stroke-width:1.4;opacity:.6"':''}/><text x="${f1(X(v))}" y="${H+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-6)}" y="${H+28}" class="t-xs t-end" style="fill:var(--rx)">◀ lower risk</text><text x="${f1(X(1)+6)}" y="${H+28}" class="t-xs" style="fill:var(--bad)">higher risk ▶</text>`;
    rows.forEach((r,i)=>{const a=ramp(k,i/rows.length*.75,i/rows.length*.75+.25);if(a<=0)return;const y=L.top+i*L.rh+L.rh/2+(N?6:0),e=Math.exp(lerp(0,Math.log(r.e),ease(a)));
      if(i%2===0)s+=`<rect x="${N?14:6}" y="${f1(y-L.rh/2-(N?8:0))}" width="${N?372:708}" height="${L.rh}" style="fill:var(--panel-2);opacity:.45"/>`;
      s+=N?`<text x="${L.x0}" y="${f1(y+L.lab)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">${r.s}</text>`:`<text x="${L.x0-12}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink);font-size:10.5px;opacity:${f1(a)}">${r.l}</text>`;
      if(r.lo!=null){const lo=Math.exp(lerp(Math.log(r.e),Math.log(r.lo),a)),hi=Math.exp(lerp(Math.log(r.e),Math.log(r.hi),a));
        s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${r.c};stroke-width:2;${r.der?'stroke-dasharray:3 2':''}"/>`;
        if(r.hi>B)s+=`<path d="M${f1(X(B))} ${f1(y-4)}l6 4l-6 4" style="fill:${r.c}"/>`}
      s+=r.lo==null?`<circle cx="${f1(X(e))}" cy="${f1(y)}" r="5" style="fill:var(--panel);stroke:${r.c};stroke-width:2"/>`:`<rect x="${f1(X(e)-4.5)}" y="${f1(y-4.5)}" width="9" height="9" style="fill:${r.c}"/>`;
      s+=`<text x="${L.v}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}"><tspan style="font-weight:700">${r.e<1?r.e.toFixed(2):String(+r.e.toFixed(2))}</tspan>${N?'':' '+r.n}</text>`});
    return {s,h:H+34}}
  function bars(rows,N,k,title,sub,max,unit,abs){
    const L=N?{x0:18,x1:360,top:62,rh:52}:{x0:330,x1:650,top:66,rh:Math.min(56,320/rows.length)};
    const X=v=>lerp(L.x0,L.x1,v/max);let s=`<text x="${N?18:12}" y="22" class="t-sm" style="fill:var(--tb)">${title}</text><text x="${N?18:12}" y="38" class="t-xs">${sub}</text>`;
    const H=L.top+rows.length*L.rh;
    (max>30?[0,10,20,30,40]:[0,5,10,15,20,25]).filter(v=>v<=max).forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-6}" y2="${H}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${H+14}" class="t-xs t-mid">${v}%</text>`);
    rows.forEach((r,i)=>{const a=ramp(k,i/rows.length*.7,i/rows.length*.7+.3);const y=L.top+i*L.rh+L.rh*(N?.62:.5),bh=N?14:16;
      s+=N?`<text x="${L.x0}" y="${f1(y-bh/2-5)}" class="t-xs" style="fill:var(--ink)">${r.s}</text>`:`<text x="${L.x0-12}" y="${f1(y+4)}" class="t-xs t-end" style="fill:var(--ink);font-size:10.5px">${r.l}</text>`;
      const v=r.v*ease(a);s+=`<rect x="${L.x0}" y="${f1(y-bh/2)}" width="${f1(X(v)-L.x0)}" height="${bh}" rx="3" style="fill:${r.c||'var(--tb)'};opacity:.85"/>`;
      if(r.ext&&a>=1)s+=`<line x1="${f1(X(r.v))}" x2="${f1(X(r.ext))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${r.c};stroke-width:2;stroke-dasharray:3 3"/><circle cx="${f1(X(r.ext))}" cy="${f1(y)}" r="3.5" style="fill:var(--panel);stroke:${r.c};stroke-width:1.6"/><text x="${f1(X(r.ext)+6)}" y="${f1(y+(N?16:-6))}" class="t-xs${N&&X(r.ext)>250?' t-end':''}" ${N&&X(r.ext)>250?`x="${f1(X(r.ext))}"`:''}>${r.el}</text>`;
      if(r.lo!=null&&a>=1)s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(Math.min(r.hi,max)))}" y1="${f1(y+bh/2+3)}" y2="${f1(y+bh/2+3)}" style="stroke:var(--ink);stroke-width:1.2;opacity:.6"/>`;
      s+=`<text x="${f1(X(v)+5)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${a>0?(abs&&r.v<3?f1(v):r.v%1?f1(v):Math.round(v))+unit:''}</text>`});
    return {s,h:H+30}}
  function draw(t){
    const ph=phaseOf(RK_STEPS,t);if(ph!==lastPh){lastPh=ph;view=RK_STEPS[ph].view;sync()}
    const st=RK_STEPS[ph],nx=ph<RK_STEPS.length-1?RK_STEPS[ph+1].from:1.0001,k=ramp(t,st.from,lerp(st.from,nx,.75));
    const N=NARROW();let out;
    const v=view==='paf'?'paf':view;
    if(v==='abs')out=bars(RK_ABS,N,k,N?'ABSOLUTE RISK AFTER EXPOSURE':'ABSOLUTE RISK AFTER EXPOSURE · % who develop TB disease',N?'% who develop TB disease, published cohorts':'Published cohorts of contacts; bars show 95% CI where given',25,'%',1);
    else if(v==='paf')out=bars(RK_PAF,N,k,N?'SHARE OF TB CASES ATTRIBUTABLE':'SHARE OF TB CASES ATTRIBUTABLE TO EACH FACTOR',N?'overlapping estimates · never add them up':'Separate studies, years and populations · they overlap · never add them up',40,'%');
    else if(v==='drug')out=forest(RK_DRUG,N,k,N?'IMMUNE-SUPPRESSING TREATMENT':'IMMUNE-SUPPRESSING TREATMENT · risk of TB vs the general population',N?'log scale · line at 1 = no difference':'Standardised incidence or risk ratios · log scale');
    else if(v==='prev')out=forest(RK_PREV,N,k,N?'WHAT LOWERS RISK':'WHAT LOWERS RISK · hazard or incidence rate ratios',N?'left of 1 = fewer TB cases':'Left of the line = fewer TB cases · log scale');
    else out=forest(RK_MED,N,k,N?'RISK FACTORS FOR TB DISEASE':'RISK FACTORS FOR TB DISEASE · relative risk',N?'log scale · line at 1 = no difference':'Each from its own study and comparison · log scale · line at 1 = no difference');
    svg.setAttribute('viewBox',`0 0 ${N?400:720} ${Math.max(N?300:300,Math.ceil(out.h))}`);svg.dataset.mode=N?'n':'w';
    svg.innerHTML=out.s;setSt(ph);
    $('#rkNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#rkPlay'),draw,22000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  $$('[data-rkv]').forEach(b=>b.addEventListener('click',()=>{const w=b.dataset.rkv;view=w==='paf'?'paf':(RK_STEPS[phaseOf(RK_STEPS,+rg.value)].view==='paf'?'med':RK_STEPS[phaseOf(RK_STEPS,+rg.value)].view);sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- BMI dose-response ---- */
  const bs=$('#rkBmiSvg'),br=$('#rkBmi'),rel=b=>Math.pow(1-.138,b-25);
  function drawB(){const N=vb(bs,'720 280','400 300'),b=+br.value,C=N?{x0:44,x1:384,y0:30,y1:240}:{x0:60,x1:690,y0:30,y1:228},ym=5;
    const X=v=>lerp(C.x0,C.x1,(v-16)/16),Y=v=>lerp(C.y1,C.y0,v/ym);let s='';
    s+=`<rect x="${f1(X(16))}" y="${C.y0}" width="${f1(X(18.5)-X(16))}" height="${C.y1-C.y0}" style="fill:var(--warn-soft);opacity:.6"/><rect x="${f1(X(30))}" y="${C.y0}" width="${f1(X(32)-X(30))}" height="${C.y1-C.y0}" style="fill:var(--warn-soft);opacity:.6"/>`;
    s+=`<text x="${f1((X(16)+X(18.5))/2)}" y="${C.y0+12}" class="t-xs t-mid" style="fill:var(--warn)">sparse data</text><text x="${f1((X(30)+X(32))/2)}" y="${C.y0+12}" class="t-xs t-mid" style="fill:var(--warn)">sparse</text>`;
    [0,1,2,3,4,5].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}×</text>`);
    (N?[16,20,24,28,32]:[16,18,20,22,24,26,28,30,32]).forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+14}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">body-mass index, kg/m²</text><text x="${C.x0}" y="${C.y0-12}" class="t-sm">TB INCIDENCE RELATIVE TO BMI 25</text>`;
    const seg=(a,c,dash)=>`<path d="${pathFn(u=>rel(lerp(a,c,u))/ym,X(a),X(c),C.y1,C.y0,40)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;${dash?'stroke-dasharray:5 4;opacity:.7':''}"/>`;
    s+=seg(16,18.5,1)+seg(18.5,30)+seg(30,32,1);
    s+=`<line x1="${f1(X(25))}" x2="${f1(X(25))}" y1="${f1(Y(1))}" y2="${C.y1}" style="stroke:var(--muted);stroke-dasharray:2 3"/><circle cx="${f1(X(25))}" cy="${f1(Y(1))}" r="3.5" style="fill:var(--muted)"/>`;
    const r=rel(b);s+=`<line x1="${f1(X(b))}" x2="${f1(X(b))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(b))}" cy="${f1(Y(Math.min(r,ym)))}" r="6.5" style="fill:var(--tb);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${f1(X(b)+(b>27?-10:10))}" y="${f1(Y(Math.min(r,ym))-10)}" class="t-lbl${b>27?' t-end':''}">${r.toFixed(2)}×</text>`;
    bs.innerHTML=s;
    const cat=b<18.5?'below 18.5: underweight range, where the published curve is less certain':b<25?'18.5–25':b<30?'25–30':'30 or more: data sparse';
    $('#rkBmiOut').innerHTML=`<div><div class="big-num">${r.toFixed(2)}×</div><small>TB incidence vs BMI 25</small></div><div><b>BMI ${b}</b><small>${cat}</small></div><div><b>13.8% per unit</b><small>published gradient</small></div>`}
  br.addEventListener('input',drawB);drawB();

  /* ---- RATIONS icon arrays ---- */
  const ra=$('#rkRat');
  function drawR(){const N=vb(ra,'720 316','400 420');let s='';
    const grids=N?[{x:20,y:46,lab:'Control contacts',n:13,c:'var(--bad)'},{x:20,y:240,lab:'Contacts given food rations',n:8,c:'var(--gold)'}]:[{x:20,y:56,lab:'Control contacts',n:13,c:'var(--bad)'},{x:370,y:56,lab:'Contacts given food rations',n:8,c:'var(--gold)'}];
    const cols=N?50:40,rows=N?20:25,sz=N?6:7,gp=N?1.2:1.4,R=rng(616);
    grids.forEach(g=>{const pick=new Set();while(pick.size<g.n)pick.add(Math.floor(R()*cols*rows));
      s+=`<text x="${g.x}" y="${g.y-22}" class="t-lbl">${g.lab}</text><text x="${g.x}" y="${g.y-8}" class="t-xs">${g.n} TB cases per 1,000 person-years</text><g>`;
      for(let i=0;i<cols*rows;i++){const x=g.x+(i%cols)*(sz+gp),y=g.y+Math.floor(i/cols)*(sz+gp),hit=pick.has(i);
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${sz}" height="${sz}" style="fill:${hit?g.c:'var(--panel-2)'}"/>`}
      s+='</g>'});
    s+=`<text x="${N?20:20}" y="${N?400:286}" class="t-xs">one square = one person-year of follow-up · filled = a TB case</text><text x="20" y="${N?414:302}" class="t-xs" style="fill:var(--gold)">adjusted IRR 0.61: a 39% lower rate</text>`;
    ra.innerHTML=s}
  drawR();
  redraws.risk=(f=>()=>{f&&f();draw(+rg.value);drawB();drawR()})(redraws.risk);
};
