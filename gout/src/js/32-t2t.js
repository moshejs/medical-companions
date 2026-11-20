/* =============== 3.2 treat to target =============== */
const TT_STEPS=[
 {from:0,at:.015,k:'Week 0',t:'Decide, test, start low',
  txt:'ACR 2020 strongly recommends urate-lowering therapy with ≥1 tophus, radiographic damage from gout, or ≥2 flares a year. Before allopurinol it conditionally recommends an HLA-B*58:01 test for people of Southeast Asian descent (for example Han Chinese, Korean or Thai) and for African American people, and it starts allopurinol at ≤100 mg/day, lower in CKD, and febuxostat at ≤40 mg/day. [[FitzGerald2020]] The starting dose matters for safety: a high starting dose for the kidney function is a risk factor for allopurinol hypersensitivity. [[Stamp2012,Keller2018]]',
  pt:'Before the first tablet: decide the medicine is needed, do a gene test if your family background calls for it, and start with a small dose.',
  hook:'ACR 2020 (strong): allopurinol <b>first line</b>, also in CKD stage ≥3; start <b>≤100 mg/day</b>. [[FitzGerald2020]]'},
 {from:.03,at:.1,k:'Weeks 2–16',t:'Titrate and recheck',
  txt:'ACR 2020 strongly prefers treat-to-target dosing guided by serial serum urate over fixed dosing. Titration should take "weeks to months, not years"; it cites the 2012 advice of a step every 2–5 weeks, with a urate check after each one. [[FitzGerald2020]] The US label raises allopurinol by 100 mg a week to a maximum of 800 mg/day; the UK SmPC goes to 900 mg. [[FDA-Zyloprim,SmPC-Allopurinol-UK]] For febuxostat the US label goes from 40 to 80 mg if urate is still ≥6 mg/dL after 2 weeks. [[FDA-Uloric]] The label says urate usually normalises "in 1 to 3 weeks" after a change. [[FDA-Zyloprim]]',
  pt:'Every few weeks: a blood test, and if the number is still too high, a slightly bigger dose.',
  hook:'Allopurinol 300 mg reached &lt;6 mg/dL in only 21–53% of people across trials, so most need more. [[Becker2005,Schumacher2008,Becker2010,PerezRuiz1998]]'},
 {from:.19,at:.24,k:'Months 0–6',t:'Why flares rise, and prophylaxis',
  txt:'The allopurinol label puts early flares down to "mobilization of urates from tissue deposits". [[FDA-Zyloprim]] They are expected and do not mean the drug is failing. [[FDA-Uloric]] In Borstad 2004 (43 people starting allopurinol), colchicine 0.6 mg twice daily cut flares to 0.57 against 1.91 on placebo in months 0–3, and to 0 against 1.05 in months 3–6. [[Borstad2004]] ACR 2020 strongly recommends 3–6 months of prophylaxis with colchicine, an NSAID or a glucocorticoid, rather than less than 3 months. [[FitzGerald2020]]',
  pt:'Extra flares early on mean the crystals are loosening. A small daily dose of colchicine covers this stretch.',
  hook:'Flares on starting are <b>not failure</b>: do not stop urate-lowering therapy during a flare. Give prophylaxis for <b>3–6 months</b>. [[FitzGerald2020,FDA-Uloric]]'},
 {from:.33,at:.42,k:'Target reached',t:'Below 6, then monitor',
  txt:'ACR 2020 sets a target of &lt;6 mg/dL [360 µmol/L] for everyone on therapy (strong, high certainty). EULAR 2016 uses &lt;6 mg/dL, or &lt;5 mg/dL [300 µmol/L] in severe gout. [[FitzGerald2020,Richette2017]] Once at target, the 2012 ACR guideline checked urate every 6 months, partly as a check on adherence. [[Khanna2012P1]] In the nurse-led arm of Doherty 2018, mean urate fell from 443 to 251 µmol/L on a mean allopurinol dose of 460 mg/day. [[Doherty2018]]',
  pt:'Once the number is below 6, the blood test drops back to about twice a year, and the crystals keep dissolving slowly.',
  hook:'Target: <b>&lt;6 mg/dL</b> [360 µmol/L] for all; EULAR <b>&lt;5 mg/dL</b> [300 µmol/L] in severe gout. [[FitzGerald2020,Richette2017]]'},
 {from:.7,at:.95,k:'Years',t:'Stay on it',
  txt:'In Doherty 2018 the nurse-led group had more people with ≥2 flares in year 1 (54% vs 40%) but far fewer in year 2 (8% vs 24%), and tophi fell to 2.9% against 11.3%. [[Doherty2018]] ACR 2020 conditionally recommends continuing therapy indefinitely (very low certainty); in the withdrawal series it cites, only 13% stayed flare-free over 5 years off treatment. [[FitzGerald2020]]',
  pt:'Flares become rare in the second year. Treatment usually continues for life, because people who stop often get flares again.',
  hook:'Nurse-led treat-to-target: <b>95% vs 30%</b> at &lt;6 mg/dL at 2 years. [[Doherty2018]]'}
];
const TT_DOH={
 target:{n:'serum urate &lt;6 mg/dL [360 µmol/L]',a:[22,95,95],b:[21,26,30],mx:100,
  txt:'At 1 year 94.75% vs 26.22% were below 360 µmol/L (RR 3.59); at 2 years 95% vs 30% (RR 3.18, 95% CI 2.42–4.18). Below 300 µmol/L [5 mg/dL] at 2 years: 88% vs 17%. [[Doherty2018]]',
  pt:'With regular nurse visits and a dose raised step by step, almost everyone reached the number. With usual care, fewer than a third did.'},
 flares:{n:'≥2 flares in the past year',a:[80,54,8],b:[80,40,24],mx:100,
  txt:'Year 1 was worse with nurse-led care (54% vs 40%, RR 1.36), as crystals mobilised. Year 2 was much better (8% vs 24%, RR 0.33). Four or more flares went 28% → 1% vs 21% → 12%. Only 3 nurse-led patients chose colchicine prophylaxis. [[Doherty2018]]',
  pt:'Lowering urate briefly brings more flares, then far fewer. The second year is the payoff.'},
 tophi:{n:'tophi present',a:[13.7,7.1,2.9],b:[8.8,10.2,11.3],mx:20,
  txt:'Tophi fell from 13.7% to 2.9% with nurse-led care and rose from 8.8% to 11.3% with usual care (year-2 RR 0.21). The largest tophus shrank from 16.89 to 3.29 mm against 20.09 to 13.61 mm. [[Doherty2018]]',
  pt:'Lumps of crystal under the skin shrink and disappear when urate stays low long enough.'}
};
const TT_DAYS=730,TT_BASE=9.0,TT_TAU=40;
function ttDrop(drug,D){if(drug==='febu')return D>=80?3.9:D>=40?2.8:0;return D<=300?D/100:3+0.55*(D-300)/100}
function ttSim(cfg,M){
  const R=rng(Math.round(cfg.adh*1000)+7),FR=rng(4242),out={su:[],dose:[],h:[],checks:[],flares:[],first:null,max:cfg.drug==='febu'?80:800};
  let dose=cfg.drug==='febu'?40:(cfg.ckd?50:100),E=0,SU=TT_BASE,S30=TT_BASE,tat=0,nc=cfg.drug==='febu'?14:28,reached=false,mobInt=0,bgInt=0,lastF=-99;
  const step=cfg.drug==='febu'?28:28;
  for(let d=0;d<=TT_DAYS;d++){
    const taken=R()<cfg.adh;E+=((taken?ttDrop(cfg.drug,dose):0)-E)*.45;SU+=(TT_BASE-E-SU)/6;S30+=(SU-S30)/30;
    if(d===nc){const v=Math.round(SU*10)/10;let act;
      if(v>=6){if(dose<out.max){dose=cfg.drug==='febu'?80:(cfg.ckd&&dose<100?100:dose+100);dose=Math.min(dose,out.max);act='up';nc=d+step}else{act='max';nc=d+56}}
      else{if(!reached){reached=true;out.first=d}act='ok';nc=d+182}
      out.checks.push({d,v,act,dose})}
    out.su.push(SU);out.dose.push(dose);
    const fall=clamp((TT_BASE-S30)/3,0,1.3),mob=fall*Math.exp(-d/TT_TAU);
    tat=SU<6?tat+1:Math.max(0,tat-.5);const bg=2/365*Math.exp(-tat/240);
    const pf=cfg.proph?(d<91?.30:d<182?.03:1):1;
    if(d<91){mobInt+=mob;bgInt+=bg}
    const h=((M||0)*mob+bg)*pf;out.h.push(h);
    if(FR()<h&&d-lastF>10){out.flares.push(d);lastF=d}
  }
  out.mobInt=mobInt;out.bgInt=bgInt;return out;
}
inits.t2t=()=>{
  const svg=$('#ttSvg'),rg=$('#ttT');const cfg={drug:'allo',adh:1,ckd:false,proph:true};
  /* calibrate the mobilisation term so the default, unprotected case gives Borstad's 1.91 flares in months 0–3 */
  const cal=ttSim({drug:'allo',adh:1,ckd:false,proph:false},0),TT_M=(1.91-cal.bgInt)/cal.mobInt;
  const cache={};const get=c=>{const k=JSON.stringify(c);return cache[k]||(cache[k]=ttSim(c,TT_M))};
  const sum=(a,i,j)=>{let s=0;for(let k=i;k<j&&k<a.length;k++)s+=a[k];return s};
  function draw(t){
    const N=vb(svg,'720 480','400 500');
    const X0=N?40:64,X1=N?388:704,xd=d=>lerp(X0,X1,d/TT_DAYS);
    const yS0=N?36:34,yS1=N?170:170,yD0=N?204:204,yD1=N?256:262,yP=N?276:284,yF0=N?310:318,yF1=N?396:410,axY=N?414:430;
    const S=get(cfg),C={...cfg,proph:!cfg.proph},G=get(C),dNow=Math.round(t*TT_DAYS);
    const ys=v=>lerp(yS1,yS0,(clamp(v,2,10)-2)/8),mxD=cfg.drug==='febu'?100:900,ydz=v=>lerp(yD1,yD0,v/mxD),FM=1.1,yf=v=>lerp(yF1,yF0,clamp(v/FM));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // month grid
    (N?[0,6,12,18,24]:[0,3,6,9,12,15,18,21,24]).forEach(m=>{const x=xd(m*30.42);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yS0-6}" y2="${yF1}" class="grid"/><text x="${f1(x)}" y="${axY}" class="t-xs t-mid">${m}</text>`});
    s+=`<text x="${X1}" y="${axY+16}" class="t-xs t-end">months since starting</text><text x="${X0-(N?34:58)}" y="${axY+16}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one simulated person</text>`;
    // urate lane
    s+=`<text x="${X0}" y="${yS0-12}" class="t-sm" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    s+=`<rect x="${X0}" y="${f1(ys(6))}" width="${X1-X0}" height="${f1(ys(2)-ys(6))}" style="fill:var(--sea-soft);opacity:.75"/>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(6))}" y2="${f1(ys(6))}" style="stroke:var(--sea);stroke-width:1.6"/><text x="${X1-4}" y="${f1(ys(6)-4)}" class="t-xs t-end" style="fill:var(--sea)">target &lt;6 (ACR, EULAR)</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(5))}" y2="${f1(ys(5))}" style="stroke:var(--sea);stroke-width:1;stroke-dasharray:5 4"/><text x="${X1-4}" y="${f1(ys(5)+11)}" class="t-xs t-end" style="fill:var(--sea)">&lt;5 severe gout (EULAR)</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ys(3))}" y2="${f1(ys(3))}" style="stroke:var(--warn);stroke-width:1;stroke-dasharray:2 4"/><text x="${X1-4}" y="${f1(ys(3)-3)}" class="t-xs t-end" style="fill:var(--warn)">EULAR: not &lt;3 long term · unverified</text>`;
    [2,4,6,8,10].forEach(v=>s+=`<text x="${X0-6}" y="${f1(ys(v)+3)}" class="t-xs t-end">${v}</text>`);
    let p='';for(let d=0;d<=dNow;d+=2)p+=(d?'L':'M')+f1(xd(d))+' '+f1(ys(S.su[d]));s+=`<path d="${p}" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-linejoin:round"/>`;
    S.checks.filter(c=>c.d<=dNow).forEach((c,i,arr)=>{const x=xd(c.d),y=ys(c.v),ok=c.v<6;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" style="fill:${ok?'var(--sea)':'var(--panel)'};stroke:var(--sea);stroke-width:1.8"/>`;
      if(!N)s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs t-mid" style="fill:var(--ink)">${f1(c.v)}</text>`});
    s+=`<circle cx="${f1(xd(dNow))}" cy="${f1(ys(S.su[dNow]))}" r="3.4" style="fill:var(--gold)"/>`;
    // HLA gate
    if(cfg.drug==='allo'){const gx=N?X0+150:X0+170,gy=yS0-26,on=dNow<30;s+=`<g style="opacity:${on?1:.55}"><rect x="${gx}" y="${gy}" width="${N?132:150}" height="20" rx="6" style="fill:var(--panel);stroke:var(--warn);stroke-width:${on?1.8:1.2}"/><text x="${gx+8}" y="${gy+14}" class="t-xs" style="fill:var(--warn);font-weight:700">HLA-B*58:01 test first?</text></g>`}
    // dose lane
    s+=`<text x="${X0}" y="${yD0-8}" class="t-sm" style="fill:var(--sea)">${cfg.drug==='febu'?'FEBUXOSTAT':'ALLOPURINOL'} DOSE, mg/day</text><line x1="${X0}" x2="${X1}" y1="${yD1}" y2="${yD1}" class="axis"/>`;
    const mx=S.max;s+=`<line x1="${X0}" x2="${X1}" y1="${f1(ydz(mx))}" y2="${f1(ydz(mx))}" style="stroke:var(--muted);stroke-dasharray:4 4"/><text x="${X1-4}" y="${f1(ydz(mx)-3)}" class="t-xs t-end">${cfg.drug==='febu'?'US maximum 80':'US maximum 800 · UK 900'}</text>`;
    let dp=`M${X0} ${f1(ydz(S.dose[0]))}`;for(let d=1;d<=dNow;d++){if(S.dose[d]!==S.dose[d-1])dp+=`H${f1(xd(d))}V${f1(ydz(S.dose[d]))}`}dp+=`H${f1(xd(dNow))}`;
    s+=`<path d="${dp}" style="fill:none;stroke:var(--sea);stroke-width:2.6"/><text x="${f1(Math.min(xd(dNow)+5,X1-30))}" y="${f1(ydz(S.dose[dNow])-5)}" class="t-xs" style="fill:var(--sea);font-weight:700">${S.dose[dNow]}</text>`;
    // prophylaxis
    if(cfg.proph){const e=Math.min(dNow,182);if(e>0)s+=`<rect x="${X0}" y="${yP-6}" width="${f1(xd(e)-X0)}" height="11" rx="5" style="fill:var(--crocus);opacity:.75"/>`;
      s+=`<text x="${f1(xd(182)+6)}" y="${yP+3}" class="t-xs" style="fill:var(--crocus)">${N?'prophylaxis 6 mo':'colchicine prophylaxis, 6 months'}</text>`}
    else s+=`<text x="${X0}" y="${yP+3}" class="t-xs" style="fill:var(--crocus)">no prophylaxis</text>`;
    // flare lane
    s+=`<text x="${X0}" y="${yF0-8}" class="t-sm" style="fill:var(--terra)">${N?'FLARES / MONTH':'FLARE RATE, per month · ▲ flares'}</text><line x1="${X0}" x2="${X1}" y1="${yF1}" y2="${yF1}" class="axis"/>`;
    [0,.5,1].forEach(v=>s+=`<text x="${X0-6}" y="${f1(yf(v)+3)}" class="t-xs t-end">${v}</text>`);
    let gp='';for(let d=0;d<=TT_DAYS;d+=4)gp+=(d?'L':'M')+f1(xd(d))+' '+f1(yf(G.h[d]*30.42));s+=`<path d="${gp}" style="fill:none;stroke:var(--muted);stroke-width:1.3;stroke-dasharray:4 4"/>`;
    let hp='';for(let d=0;d<=dNow;d+=2)hp+=(d?'L':'M')+f1(xd(d))+' '+f1(yf(S.h[d]*30.42));s+=`<path d="${hp}" style="fill:none;stroke:var(--terra);stroke-width:2.4"/>`;
    // Borstad 2004 averages, per month
    const bs=(a,b,v,c,l,dy)=>{const y=yf(v/3);return `<line x1="${f1(xd(a))}" x2="${f1(xd(b))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:3.4;opacity:.85"/><line x1="${f1(xd(a))}" x2="${f1(xd(a))}" y1="${f1(y-5)}" y2="${f1(y+5)}" style="stroke:${c};stroke-width:1.4"/><line x1="${f1(xd(b))}" x2="${f1(xd(b))}" y1="${f1(y-5)}" y2="${f1(y+5)}" style="stroke:${c};stroke-width:1.4"/>`+(l?`<text x="${f1(xd(b)+4)}" y="${f1(y+dy)}" class="t-xs" style="fill:${c}">${l}</text>`:'')};
    s+=bs(0,91,1.91,'var(--terra)','',0)+bs(91,182,1.05,'var(--terra)','',0)+bs(0,91,.57,'var(--crocus)','',0)+bs(91,182,0.012,'var(--crocus)','',0);
    s+=`<text x="${X1}" y="${yF0-8}" class="t-xs t-end">${N?'':'bracketed bars: '}Borstad 2004 averages · <tspan style="fill:var(--terra)">placebo</tspan> · <tspan style="fill:var(--crocus)">colchicine</tspan></text>`;
    S.flares.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${yF1} L${f1(x)} ${yF1-11} L${f1(x+4)} ${yF1}z" style="fill:var(--terra)"/>`});
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="${yS0-6}" y2="${yF1+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${X1}" y="${axY+30}" class="t-xs t-end">dashed: same person ${cfg.proph?'without':'with'} prophylaxis</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(TT_STEPS,t);setSt(ph);
    const fl=S.flares.filter(d=>d<=dNow).length,e03=sum(S.h,0,91),e36=sum(S.h,91,182);
    $('#ttRead').innerHTML=`<span>month <b>${(dNow/30.42).toFixed(1)}</b></span><span>dose <b>${S.dose[dNow]} mg/day</b></span><span>serum urate <b>${f1(S.su[dNow])} mg/dL</b> [${Math.round(S.su[dNow]*59.5)} µmol/L]</span><span>first at target <b>${S.first==null?'not reached':'month '+(S.first/30.42).toFixed(1)}</b></span><span>flares so far <b>${fl}</b></span><span>model, months 0–3 / 3–6 <b>${e03.toFixed(2)} / ${e36.toFixed(2)}</b> (Borstad: ${cfg.proph?'0.57 / 0 on colchicine':'1.91 / 1.05 on placebo'})</span>`;
    let x='';
    if(cfg.drug==='febu')x+=`<p><b>Febuxostat.</b> The US label starts at 40 mg and moves to 80 mg if urate is still ≥6 mg/dL after 2 weeks; the EU SmPC starts at 80 mg. [[FDA-Uloric,EMA-Adenuric]] Since 2019 the US label limits it to people for whom allopurinol has failed or is not advisable. [[FDA-Uloric]] No HLA-B*58:01 test is needed for febuxostat; the gate is an allopurinol step.</p>`;
    if(cfg.ckd)x+=`<p><b>CKD stage 3.</b> ACR 2020 starts lower in CKD and says ≤50 mg/day "should be considered". [[FitzGerald2020]] Stamp 2012 proposed a starting dose of ≤1.5 mg per mL/min of eGFR; at an eGFR of 30 that arithmetic gives 45 mg. [[Stamp2012]] Escalating above the creatinine-clearance dose reached target and was well tolerated, including in renal impairment. [[Stamp2011,Stamp2017RCT]] The simulator starts at 50 mg${cfg.drug==='febu'?' for allopurinol only':''}, then uses the usual 100 mg steps, a simplification.</p>`;
    if(cfg.adh<1)x+=`<p><b>${Math.round(cfg.adh*100)}% of tablets taken.</b> Missed doses blunt the fall, so the dose keeps climbing${cfg.adh<.5?' to the ceiling while urate stays above target':''}. In a meta-analysis only 46% took ≥80% of their therapy. [[Scheepers2018SAR]] Regular urate checks are partly a check on adherence. [[Khanna2012P1]] In Doherty 2018, 95% were still taking it at 2 years with nurse-led care. [[Doherty2018]]</p>`;
    if(!cfg.proph)x+=`<p><b>No prophylaxis.</b> Pooled febuxostat trials saw flares rise to as much as 40% when 8 weeks of prophylaxis stopped, against 3–5% after 6 months of it. [[Wortmann2010]] A slower start also lowers flares: a lower starting dose of any urate-lowering drug reduces flares at initiation. [[FitzGerald2020,Yamanaka2018]]</p>`;
    $('#ttNote').innerHTML=noteHTML(TT_STEPS[ph])+(x?`<div class="tt-x"><div class="kicker">This scenario</div>${x}</div>`:'');
  }
  const stop=playWire(rg,$('#ttPlay'),draw,24000,'Replay','t2t');
  const setSt=stepWire($('#ttSteps'),TT_STEPS,rg,draw,stop);
  $$('[data-ttd]').forEach(b=>b.onclick=()=>{cfg.drug=b.dataset.ttd;$$('[data-ttd]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)});
  $$('[data-tta]').forEach(b=>b.onclick=()=>{cfg.adh=+b.dataset.tta;$$('[data-tta]').forEach(q=>q.setAttribute('aria-pressed',q===b));draw(+rg.value)});
  $('#ttCkd').onclick=e=>{cfg.ckd=!cfg.ckd;e.currentTarget.setAttribute('aria-pressed',cfg.ckd);draw(+rg.value)};
  $('#ttPro').onclick=e=>{cfg.proph=!cfg.proph;e.currentTarget.setAttribute('aria-pressed',cfg.proph);draw(+rg.value)};
  draw(+rg.value);

  /* Doherty 2018: real points at 0, 12 and 24 months */
  const ds=$('#ttDoh');let met='target',stopD=null;
  function drawD(k){
    const N=vb(ds,'720 300','400 320'),M=TT_DOH[met];
    const X0=N?52:90,X1=N?330:520,Y0=34,Y1=N?250:240,xm=m=>lerp(X0,X1,m/24),yv=v=>lerp(Y1,Y0,v/M.mx);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${X0}" y="20" class="t-sm" style="fill:var(--sea)">% with ${M.n}</text>`;
    for(let i=0;i<=4;i++){const v=M.mx*i/4,y=yv(v);s+=`<line x1="${X0}" x2="${X1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${X0-8}" y="${f1(y+3)}" class="t-xs t-end">${Math.round(v)}%</text>`}
    [0,12,24].forEach(m=>s+=`<text x="${f1(xm(m))}" y="${Y1+18}" class="t-xs t-mid">${m===0?'baseline':m===12?'1 year':'2 years'}</text>`);
    const ser=(arr,c,lbl,dash)=>{let d='';const n=k*2;arr.forEach((v,i)=>{if(i>0&&i-1>=n)return;if(i===0)d+=`M${f1(xm(0))} ${f1(yv(v))}`;else{const px=lerp(xm((i-1)*12),xm(i*12),Math.min(1,n-(i-1))),py=lerp(yv(arr[i-1]),yv(v),Math.min(1,n-(i-1)));d+=`L${f1(px)} ${f1(py)}`}});
      let o=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;${dash?'stroke-dasharray:6 5':''}"/>`;
      arr.forEach((v,i)=>{if(i<=n+1e-6){o+=`<circle cx="${f1(xm(i*12))}" cy="${f1(yv(v))}" r="5" style="fill:${c}"/><text x="${f1(xm(i*12)+(i===2?10:0))}" y="${f1(yv(v)+(i===2?4:dash?17:-10))}" class="t-xs ${i===2?'':'t-mid'}" style="fill:${c};font-weight:700">${v}%</text>`}});
      if(k>=1)o+=`<text x="${f1(xm(24)+(N?10:46))}" y="${f1(yv(arr[2])+4)}" class="t-xs" style="fill:${c}">${N?'':lbl}</text>`;return o};
    s+=ser(M.b,'var(--muted)','usual care',true)+ser(M.a,'var(--sea)','nurse-led',false);
    const lx=N?X0:560,ly=N?Y1+40:80;
    s+=`<line x1="${lx}" x2="${lx+22}" y1="${ly}" y2="${ly}" style="stroke:var(--sea);stroke-width:2.6"/><text x="${lx+28}" y="${ly+4}" class="t-xs" style="fill:var(--ink)">nurse-led (n = 255)</text>`;
    s+=`<line x1="${lx+(N?170:0)}" x2="${lx+(N?192:22)}" y1="${ly+(N?0:20)}" y2="${ly+(N?0:20)}" style="stroke:var(--muted);stroke-width:2.6;stroke-dasharray:6 5"/><text x="${lx+(N?198:28)}" y="${ly+(N?4:24)}" class="t-xs" style="fill:var(--ink)">usual care (n = 262)</text>`;
    if(!N)s+=`<text x="560" y="${130}" class="t-xs">Doherty 2018</text><text x="560" y="144" class="t-xs">real data points</text>`;
    ds.innerHTML=s;
    $('#ttDohNote').innerHTML=`<div class="kicker">Doherty 2018 · Nottingham, 56 practices</div><h4>${met==='target'?'Nearly everyone reached target':met==='flares'?'More flares first, then far fewer':'Tophi melt away'}</h4><p>${M.txt}</p><div class="pt"><b>In plain words</b>${M.pt}</div><div class="hook"><b>Exam hook</b>Nurse-led care used allopurinol at a mean 460 vs 230 mg/day, with 79–80% above 300 mg/day; it cost £5066 per QALY. [[Doherty2018]]</div>`;
  }
  $$('[data-dh]').forEach(b=>b.onclick=()=>{met=b.dataset.dh;$$('[data-dh]').forEach(q=>q.setAttribute('aria-pressed',q===b));if(stopD)stopD();stopD=animate(900,drawD,()=>{stopD=null})});
  onHide.t2t=(f=>()=>{f&&f();if(stopD)stopD()})(onHide.t2t);
  redraws.t2t=(f=>()=>{f&&f();drawD(1)})(redraws.t2t);
  drawD(1);
};
