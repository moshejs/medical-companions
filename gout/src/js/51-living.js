/* =============== 5.1 living with gout =============== */
const LV_STEPS=[
 {from:0,at:.03,k:'Months 0–2 · starting',t:'Start low, check often',
  txt:'ACR 2020 strongly recommends treating to a serum urate below 6 mg/dL [360 µmol/L] for everyone on urate-lowering therapy. It repeats the 2012 interval of a urate check every 2–5 weeks while the dose is raised, plus a check after each dose change, and says titration should take "weeks to months, not years". [[FitzGerald2020,Khanna2012P1]] The allopurinol label lists baseline tests (urate, blood count, chemistry, liver and kidney function) and suggests raising the dose by 100 mg weekly to a urate of 6 mg/dL or less, up to 800 mg/day. [[FDA-Allopurinol]]',
  pt:'In the first months the dose goes up step by step, with a blood test every few weeks to see how far urate has fallen.',
  hook:'Urate every <b>2–5 weeks</b> while titrating; target <b>&lt; 6 mg/dL [360 µmol/L]</b> for everyone on urate-lowering therapy.'},
 {from:.2,at:.25,k:'Months 2–5 · cover',t:'Flares are expected, and planned for',
  txt:'Dissolving crystals can set off flares early on, so ACR 2020 strongly recommends anti-inflammatory prophylaxis for 3–6 months when urate-lowering therapy starts, longer if flares continue. [[FitzGerald2020]] In a US survey only 12% of people on urate-lowering therapy knew flares can get worse when it starts. [[Harrold2012]] The ACR patient panel asked for a "medication-in-pocket" plan for flares at home, and the allopurinol label says to keep taking it during a flare. [[FitzGerald2020,FDA-Allopurinol]]',
  pt:'Flares in the first months are normal: crystals loosen as they dissolve. A plan at home means treating at the first twinge without stopping the daily pill.',
  hook:'Keep urate-lowering therapy going through a flare. Prophylaxis for <b>3–6 months</b> (ACR 2020, strong).'},
 {from:.42,at:.47,k:'Months 5–8 · daily life',t:'Food, drink and weight: a little, not a lot',
  txt:'In 16,760 adults, each diet score explained 0.3% or less of the variation in serum urate, against 23.9% for common genetic variation. [[Major2018]] ACR 2020 still conditionally recommends limiting alcohol, purines and high-fructose corn syrup, and losing weight if overweight. [[FitzGerald2020]] Short-term triggers are real: the top fifth of purine intake over 2 days carried OR 4.76 for a flare, and more than 2–4 drinks in 24 hours OR 1.51. [[Zhang2012,Neogi2014]]',
  pt:'Food and drink matter a little; the medicine matters most. A very big meal or a night of drinking can still set off a flare within a day or two.',
  hook:'Diet explains <b>≤ 0.3%</b> of urate variance; common genetic variation <b>23.9%</b> (Major 2018).'},
 {from:.62,at:.67,k:'Months 8–10 · other medicines',t:'Other medicines: reviewed, not simply stopped',
  txt:'ACR 2020 conditionally recommends switching hydrochlorothiazide to another antihypertensive when feasible, choosing losartan when feasible, not stopping low-dose aspirin taken for an appropriate reason, and not adding or switching to fenofibrate. [[FitzGerald2020]] Among people with hypertension, diuretics carried RR 2.36 for new gout and losartan RR 0.81. [[Choi2012BMJ]] Low-dose aspirin raised flare odds (OR 1.91 at 100 mg or less), and taking allopurinol at the same time removed the effect. [[Zhang2014]]',
  pt:'Some medicines for other conditions nudge urate up or down. Changes are made with the prescriber, and some, like low-dose aspirin for the heart, are kept.',
  hook:'ACR 2020: <b>do not stop low-dose aspirin</b>; switch hydrochlorothiazide where feasible; prefer <b>losartan</b>; no fenofibrate.'},
 {from:.8,at:.92,k:'Months 10–12 · at target',t:'At target, and staying there',
  txt:'Once at target, the 2012 ACR guideline checks urate every 6 months, partly as a check on adherence. [[Khanna2012P1]] ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely: in one series only 13% (27 of 211) stayed flare-free for 5 years after stopping. [[FitzGerald2020]] Adherence is the weak point: a meta-analysis pooled 46% adherent. [[Scheepers2018SAR]] With nurse-led education and titration, 95% reached urate below 6 mg/dL at 2 years, against 30% with usual care. [[Doherty2018]]',
  pt:'Once urate is at target, a check every six months is usually enough. Stopping the pill lets urate climb and crystals come back.',
  hook:'Only <b>13%</b> (27/211) stayed flare-free over 5 years off treatment, even with urate under 7 mg/dL.'}
];
const LV_CHK=`<div class="kv"><div><dt>A urate check and a dose step</dt><dd>Urate is checked every 2–5 weeks while the dose is raised and after each change, aiming below 6 mg/dL [360 µmol/L]. [[FitzGerald2020]] In the Nottingham nurse-led trial, allopurinol rose by 100 mg every 3–4 weeks, and 79% ended on more than 300 mg/day, against 10% with usual care. [[Doherty2018]]</dd></div></div>`;
const LV_EV=[
 {m:.2,key:0,t:'Baseline tests',c:'var(--sea)',d:`<div class="kv"><div><dt>Before starting</dt><dd>The allopurinol label lists serum urate, a full blood count, a chemistry panel, liver tests and kidney function. [[FDA-Allopurinol]] ACR 2020 conditionally recommends HLA-B*58:01 testing before allopurinol for people of Southeast Asian descent and African American people, but not for everyone. [[FitzGerald2020]]</dd></div></div>`},
 {m:1,key:0,t:'Urate check, dose step',c:'var(--sea)',d:LV_CHK},
 {m:1.6,key:'flare',t:'A flare at home',c:'var(--terra)',d:`<div class="kv"><div><dt>The flare plan</dt><dd>ACR 2020 strongly recommends colchicine, an NSAID or a glucocorticoid first line, low-dose rather than high-dose colchicine, and conditionally recommends ice as an add-on. [[FitzGerald2020]] The US colchicine label gives 1.2 mg at the first sign and 0.6 mg one hour later; someone already on prophylaxis takes the same flare dose, waits 12 hours, then restarts prophylaxis. [[FDA-Colcrys]] EULAR 2016 asks for people to be taught to self-medicate at the first warning symptoms. [[Richette2017]] The allopurinol label says to stay on it during a flare. [[FDA-Allopurinol]]</dd></div></div>`},
 {m:2,key:0,t:'Urate check, dose step',c:'var(--sea)',d:LV_CHK},
 {m:3.2,key:0,t:'Urate check: at target?',c:'var(--sea)',d:`<div class="kv"><div><dt>Reaching target</dt><dd>In the Nottingham trial, mean urate fell by 183 µmol/L [about 3.1 mg/dL] in the first 3 months of nurse-led titration, and 94.75% were below 360 µmol/L [6 mg/dL] at 1 year. [[Doherty2018]] For contrast, 8 weeks of vitamin C lowered urate by 0.23 mg/dL, and starting or raising allopurinol by 1.9 mg/dL. [[Stamp2013]]</dd></div></div>`},
 {m:4.5,key:'meal',t:'A celebration meal and drinks',c:'var(--terra)',d:`<div class="kv"><div><dt>Short-term triggers</dt><dd>In case-crossover studies, each person is compared with themselves. The top fifth of purine intake over 2 days carried OR 4.76 for a flare (animal sources 2.41, plants 1.39). [[Zhang2012]] More than 2–4 drinks in 24 hours carried OR 1.51, and wine, beer and spirits each raised the risk. [[Neogi2014]] Cherry intake went the other way (OR 0.65), early evidence from the same design. [[Zhang2012Cherry]]</dd></div></div>`},
 {m:5.5,key:0,t:'Prophylaxis review',c:'var(--crocus)',d:`<div class="kv"><div><dt>How long the cover lasts</dt><dd>ACR 2020 strongly recommends prophylaxis for 3–6 months rather than less than 3, extended if flares continue. [[FitzGerald2020]] In the nurse-led trial only 3 of 255 people chose colchicine prophylaxis; flares were higher in year 1 and far lower in year 2 (≥ 2 flares: 8.00% vs 24.29%). [[Doherty2018]]</dd></div></div>`},
 {m:6.5,key:'bp',t:'A new blood-pressure pill',c:'var(--gold)',d:`<div class="kv"><div><dt>Blood-pressure medicines and urate</dt><dd>Among 29,138 people with hypertension, RR for new gout was 2.36 with diuretics, 1.48 with β-blockers, 1.29 with non-losartan ARBs, 1.24 with ACE inhibitors, 0.87 with calcium-channel blockers and 0.81 with losartan, deepening to 0.71 after 2 years. [[Choi2012BMJ]] ACR 2020 conditionally recommends switching hydrochlorothiazide when feasible and choosing losartan when feasible. [[FitzGerald2020]] The allopurinol label notes that thiazides may raise the risk of severe rash, more so with kidney impairment. [[FDA-Allopurinol]]</dd></div></div>`},
 {m:8,key:'surg',t:'Planned surgery',c:'var(--warn)',d:`<div class="kv"><div><dt>Surgery and hospital</dt><dd>The flare rate rose about tenfold during hospital stays (RR 10.2). [[Zleik2018]] After surgery, 44.3% of people with gout flared, a mean 3.7 days after the operation, often not in the big toe; taking allopurinol carried OR 0.15. [[Jeong2019]] Pre-admission urate-lowering therapy went with fewer inpatient flares and shorter stays, observationally. [[Jatuworapruk2022Rheum,Jatuworapruk2022IJRD]]</dd></div></div>`},
 {m:9.2,key:0,t:'Six-month urate check',c:'var(--sea)',d:`<div class="kv"><div><dt>At target</dt><dd>Every 6 months once at target, in the 2012 ACR guideline. [[Khanna2012P1]] Among 48,280 UK people starting allopurinol, 38.5% had stopped for 90 days or more by 1 year. [[Scheepers2018Rheum]] Poor health literacy went with 2 or more flares a year (adjusted OR 4.10). [[Watson2024]]</dd></div></div>`},
 {m:10.2,key:'preg',t:'Planning a pregnancy',c:'var(--crocus)',d:`<div class="kv"><div><dt>Pregnancy</dt><dd>BSR 2023: colchicine "may be considered during pregnancy" (1B) and may be used in breastfeeding (2C); NSAIDs only intermittently, weaned from 26 weeks and stopped by 30. It asks for the risks and benefits to be discussed and documented. [[Schreiber2023]] The allopurinol label reports 2 major malformations among about 50 published pregnancies and advises against breastfeeding on it. [[FDA-Allopurinol]]</dd></div></div>`},
 {m:11.8,key:0,t:'Annual review',c:'var(--sea)',d:`<div class="kv"><div><dt>The long view</dt><dd>ACR 2020 conditionally recommends continuing urate-lowering therapy indefinitely. [[FitzGerald2020]] In a nurse-led pilot, 90.7% were still on treatment 5 years later, with a mean urate of 292.8 µmol/L [4.9 mg/dL]. [[Abhishek2017]]</dd></div></div>`}
];
const LV_DIET=[
 {l:'One beer a day',v:.16,u:'+9.5',s:'ACR 2020 evidence summary · Major 2018'},
 {l:'Vitamin C 500 mg/day, people with gout',v:-.23,u:'−14',s:'Stamp 2013 · 40 people, 8 weeks'},
 {l:'DASH diet, everyone',v:-.35,u:'−21',s:'Juraschek 2016 · 103 adults, 30 days'},
 {l:'Vitamin C, 13 trials pooled',v:-.35,u:'−20.8',s:'Juraschek 2011 · mostly without gout'},
 {l:'Coffee, 6 or more cups a day',v:-.43,u:'−26',s:'Choi 2007 · NHANES III, cross-sectional'},
 {l:'5 kg weight loss',v:-1.1,u:'−65',s:'ACR 2020 · 11 obese people'},
 {l:'DASH diet, urate ≥ 7 mg/dL at start',v:-1.29,u:'−77',s:'Juraschek 2016 · 8 people'},
 {l:'Limiting or stopping alcohol',v:-1.6,u:'−95',s:'ACR 2020 evidence summary'},
 {l:'Bariatric surgery, 34.3 kg lost',v:-2.0,u:'−119',s:'ACR 2020 · 12 people'},
 {l:'Starting or raising allopurinol',v:-1.9,u:'−118',s:'Stamp 2013 · same trial, 8 weeks',med:1}
];
const LV_RISK={
 trig:{h:'FLARES IN PEOPLE WITH GOUT · case-crossover, each person vs themselves',x:'odds ratio of a flare, log scale (1 = no difference)',
  cap:'Case-crossover studies compare the same person before flares and at other times. The purine figures compare the top with the bottom fifth of intake over 2 days. Cherries are early evidence: observational, and ACR 2020 judged the evidence too weak to recommend them. [[Zhang2012,Neogi2014,Zhang2014,Zhang2012Cherry,FitzGerald2020]]',
  r:[{n:'Purines, top fifth over 2 days',s:'Zhang 2012 · 633 people',v:4.76},{n:'Animal purines, top fifth',s:'same study',v:2.41},{n:'Wine, more than 1–2 servings',s:'Neogi 2014 · 724 people',v:2.38,lo:1.57,hi:3.62},{n:'Low-dose aspirin ≤ 100 mg, 2 days',s:'Zhang 2014 · 724 people',v:1.91,lo:1.32,hi:2.85},{n:'More than 2–4 drinks in 24 h',s:'Neogi 2014',v:1.51,lo:1.09,hi:2.09},{n:'Cherries over 2 days',s:'Zhang 2012 · early evidence',v:.65,lo:.5,hi:.85,e:1},{n:'Cherries plus allopurinol',s:'same study · early evidence',v:.25,lo:.15,hi:.42,e:1}]},
 new:{h:'GETTING GOUT IN THE FIRST PLACE · prospective cohorts',x:'relative risk of new gout, log scale (1 = no difference)',
  cap:'Separate cohorts, mostly US men, each with its own comparison: alcohol per daily serving; meat, seafood, dairy and DASH top versus bottom fifth; sugary drinks 2 or more a day; coffee 6 or more cups a day; blood-pressure drugs among people with hypertension. Wine was not significant. Not comparable with each other, and not a personal risk. [[Choi2004Lancet,Choi2004NEJM,Rai2017BMJ,Choi2008BMJ,Choi2007Incident,Choi2012BMJ]]',
  r:[{n:'Diuretics',s:'Choi 2012 · people with hypertension',v:2.36},{n:'Sugary soft drinks, 2+ a day',s:'Choi 2008 · 46,393 men',v:1.85,lo:1.08,hi:3.16},{n:'Seafood, top fifth',s:'Choi 2004 · 47,150 men',v:1.51,lo:1.17,hi:1.95},{n:'Beer, per daily serving',s:'Choi 2004',v:1.49,lo:1.32,hi:1.70},{n:'Meat, top fifth',s:'Choi 2004',v:1.41,lo:1.07,hi:1.86},{n:'Spirits, per daily drink',s:'Choi 2004',v:1.15,lo:1.04,hi:1.28},{n:'Wine, per daily glass (NS)',s:'Choi 2004',v:1.04,lo:.88,hi:1.22},{n:'Losartan',s:'Choi 2012',v:.81,lo:.70,hi:.94},{n:'DASH diet, top fifth',s:'Rai 2017 · 44,444 men',v:.68,lo:.57,hi:.80},{n:'Dairy, top fifth',s:'Choi 2004',v:.56,lo:.42,hi:.74},{n:'Coffee, 6+ cups a day',s:'Choi 2007 · 45,869 men',v:.41,lo:.19,hi:.88}]}
};
inits.living=()=>{
  /* ---------- the year ring (adapted from the FMF year) ---------- */
  const svg=$('#lvSvg'),rg=$('#lvT');const on={flare:false,meal:false,bp:false,surg:false,preg:false};
  const vis=()=>LV_EV.filter(e=>e.key===0||on[e.key]);
  const ang=m=>-Math.PI/2+m/12*Math.PI*2;
  function draw(t){
    const mNow=t*12,E=vis();
    /* narrow: the ring keeps its size, the event labels move into a list underneath,
       and the event the year has just reached is highlighted in both */
    const N=vb(svg,'720 440','400 '+(384+E.length*27+(E.length<9?36:22)));
    const CX=N?200:232, CY=N?196:226, R=N?136:148;
    const LX=N?16:432, LY=N?384:62, LST=N?27:E.length>9?29:31, LTX=N?52:456, LRX=N?386:712, LHD=N?366:38, LHX=LX;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* the flare-prophylaxis window: months 0.2 to 5.5 */
    {const a0=ang(.2),a1=ang(Math.min(mNow,5.5));let d='';
      for(let i=0;i<=60;i++){const a=lerp(a0,a1,i/60);d+=(i?'L':'M')+f1(CX+Math.cos(a)*(R+14))+' '+f1(CY+Math.sin(a)*(R+14))}
      if(mNow>.2)s+=`<path d="${d}" style="fill:none;stroke:var(--crocus);stroke-width:7;opacity:.45;stroke-linecap:round"/>`;
      if(N){if(mNow>.2)s+=`<line x1="250" x2="266" y1="13" y2="13" style="stroke:var(--crocus);stroke-width:5;opacity:.5;stroke-linecap:round"/><text x="272" y="17" class="t-xs" style="fill:var(--crocus)">prophylaxis</text>`}
      else if(mNow>.2)s+=`<text x="${CX+34}" y="${CY-R-26}" class="t-xs" style="fill:var(--crocus)">flare prophylaxis, 3–6 months →</text>`;}
    s+=`<circle cx="${CX}" cy="${CY}" r="${R}" style="fill:none;stroke:var(--line);stroke-width:9"/>`;
    let pd='';const NS=Math.max(1,Math.round(t*180));
    for(let i=0;i<=NS;i++){const a=ang(t*12*i/NS);pd+=(i?'L':'M')+f1(CX+Math.cos(a)*R)+' '+f1(CY+Math.sin(a)*R)}
    s+=`<path d="${pd}" style="fill:none;stroke:var(--sea);stroke-width:9;stroke-linecap:round"/>`;
    for(let m=0;m<12;m++){const a=ang(m);
      s+=`<line x1="${f1(CX+Math.cos(a)*(R-6))}" x2="${f1(CX+Math.cos(a)*(R+6))}" y1="${f1(CY+Math.sin(a)*(R-6))}" y2="${f1(CY+Math.sin(a)*(R+6))}" style="stroke:var(--panel);stroke-width:2"/>`;
      const ai=ang(m+.5);
      s+=`<text x="${f1(CX+Math.cos(ai)*(R-24))}" y="${f1(CY+Math.sin(ai)*(R-20))}" class="t-xs t-mid" style="fill:${mNow>=m?'var(--ink)':'var(--muted)'}">${m+1}</text>`}
    let curI=-1;E.forEach((e,i)=>{if(mNow>=e.m)curI=i});
    E.forEach((e,i)=>{const a=ang(e.m),x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:${e.c};opacity:.18"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${hit?(N&&now?11:9):6}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:${N&&now?3:2}"/>`;
      if(hit)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9+9*bump(mNow,e.m,e.m+.6))}" style="fill:none;stroke:${e.c};stroke-width:1.5;opacity:${f1(.8*bump(mNow,e.m,e.m+.6))}"/>`;
      if(N){const xo=CX+Math.cos(a)*(R+19),yo=CY+Math.sin(a)*(R+19);
        s+=`<text x="${f1(xo)}" y="${f1(yo+3.5)}" class="t-xs t-mid" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`}});
    const a=ang(mNow);
    s+=`<line x1="${CX}" x2="${f1(CX+Math.cos(a)*(R-34))}" y1="${CY}" y2="${f1(CY+Math.sin(a)*(R-34))}" style="stroke:var(--terra);stroke-width:2.4"/>`;
    s+=`<circle cx="${CX}" cy="${CY}" r="4" style="fill:var(--terra)"/>`;
    s+=`<text x="${CX}" y="${CY-8}" class="t-sm t-mid">MONTH</text>`;
    s+=`<text x="${CX}" y="${CY+22}" class="t-big t-mid" style="font-size:28px">${(mNow+.0001).toFixed(1)}</text>`;
    s+=`<text x="${CX}" y="${CY+42}" class="t-xs t-mid">${E.filter(e=>mNow>=e.m).length} of ${E.length} events reached</text>`;
    s+=`<text x="${LHX}" y="${LHD}" class="t-sm" style="fill:var(--sea)">THIS YEAR, IN ORDER</text>`;
    E.forEach((e,i)=>{const y=LY+i*LST,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<rect x="${LX-6}" y="${y-18}" width="${LRX-LX+12}" height="24" rx="7" style="fill:${e.c};opacity:.14"/>`;
      if(N)s+=`<text x="${LX+10}" y="${y}" class="t-xs t-end" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<circle cx="${N?LX+24:LX+10}" cy="${y-4}" r="${now&&N?6:5}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:1.8"/>`;
      s+=`<text x="${LTX}" y="${y}" class="t-lbl" style="fill:${hit?'var(--ink)':'var(--muted)'};font-size:12.5px">${e.t}</text>`;
      s+=`<text x="${LRX}" y="${y}" class="t-xs t-end">m${e.m.toFixed(1)}</text>`});
    if(E.length<9)s+=`<text x="${LTX}" y="${LY+E.length*LST+16}" class="t-xs">use the toggles to add more</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);
    const past=E.filter(e=>mNow>=e.m);const last=past[past.length-1];
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+(last?last.d:'');
    $('#lvCap').textContent=`Month ${(mNow).toFixed(1)} of 12 · ${past.length} events reached${last?' · last: '+last.t:''}. Schematic year; intervals follow published guidance, not any one clinic.`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,20000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  [['lvFlare','flare'],['lvMeal','meal'],['lvBp','bp'],['lvSurg','surg'],['lvPreg','preg']].forEach(([id,k])=>{
    const b=$('#'+id);b.onclick=()=>{on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}});
  draw(+rg.value);

  /* ---------- diet effects in mg/dL ---------- */
  const ds=$('#lvDiet'),dr=$('#lvDR');let med=true;
  function drawD(t){
    const R=LV_DIET.filter(r=>med||!r.med),n=R.length;
    /* narrow: each row's label sits on its own line above a full-width bar */
    const N=vb(ds,'720 '+(70+n*36),'400 '+(84+n*52));
    const Z=N?300:590,PX=N?115:118,Y0=N?60:44,RH=N?52:36;
    const xv=v=>Z+PX*v;
    let s=`<text x="14" y="20" class="t-sm" style="fill:var(--sea)">CHANGE IN SERUM URATE, mg/dL</text>`;
    s+=N?`<text x="14" y="36" class="t-xs">bars to the left lower urate · µmol/L in brackets</text>`:`<text x="706" y="20" class="t-xs t-end">bars to the left lower urate · µmol/L in brackets</text>`;
    const top=Y0-12,bot=Y0+n*RH-10;
    [-2,-1,0].forEach(v=>s+=`<line x1="${f1(xv(v))}" x2="${f1(xv(v))}" y1="${top}" y2="${bot}" class="${v===0?'axis':'grid'}"/><text x="${f1(xv(v))}" y="${bot+14}" class="t-xs t-mid">${v===0?'0':'−'+(-v)}</text>`);
    s+=`<line x1="${f1(xv(0))}" x2="${f1(xv(0))}" y1="${top}" y2="${bot}" style="stroke:var(--ink);opacity:.5"/>`;
    R.forEach((r,i)=>{const y=Y0+i*RH,k=ease(ramp(t,i*.06,i*.06+.4)),v=r.v*k,x0=Math.min(xv(0),xv(v)),w=Math.abs(xv(v)-xv(0));
      const col=r.med?'var(--sea)':r.v>0?'var(--terra)':'var(--gold)',by=N?y+18:y-10;
      if(r.med)s+=`<rect x="6" y="${N?y-15:y-16}" width="${N?388:708}" height="${N?52:34}" rx="8" style="fill:var(--sea-soft);opacity:.6"/>`;
      s+=`<text x="14" y="${N?y:y-1}" class="t-lbl" style="font-size:12.5px">${r.l}</text>`;
      s+=`<text x="14" y="${N?y+12:y+12}" class="t-xs">${r.s}</text>`;
      s+=`<rect x="${f1(x0)}" y="${by}" width="${f1(w)}" height="16" rx="4" style="fill:${col};opacity:${r.med?1:.85}"/>`;
      const lab=`${r.v>0?'+':'−'}${Math.abs(r.v).toFixed(2).replace(/0$/,'').replace(/\.$/,'')} [${r.u}]`;
      const inside=w>(N?110:150),vo=ramp(k,.5,1);
      if(r.v>0)s+=`<text x="${f1(xv(v)+6)}" y="${by+12}" class="t-xs" style="fill:${col};font-weight:700;opacity:${f1(vo)}">${lab}</text>`;
      else if(inside)s+=`<text x="${f1(x0+6)}" y="${by+12}" class="t-xs" style="fill:var(--panel);font-weight:700;opacity:${f1(vo)}">${lab}</text>`;
      else s+=`<text x="${f1(x0-6)}" y="${by+12}" class="t-xs t-end" style="fill:${col};font-weight:700;opacity:${f1(vo)}">${lab}</text>`});
    ds.innerHTML=s;
  }
  playWire(dr,$('#lvDPlay'),drawD,7000,'Replay','living');drawD(+dr.value);
  $('#lvMed').onclick=()=>{med=!med;$('#lvMed').setAttribute('aria-pressed',med);drawD(+dr.value)};

  /* ---------- genes vs diet: 100 squares, each 1% of urate variance ---------- */
  const gs=$('#lvGenes');let gp=1,stopG=null;
  function drawG(p){gp=p;
    const N=vb(gs,'720 300','400 500');
    const C=N?24:22,GX=N?80:30,GY=N?50:46;
    let s=`<text x="${N?16:30}" y="22" class="t-sm" style="fill:var(--sea)">WHAT EXPLAINS THE VARIATION IN SERUM URATE · Major 2018</text>`;
    const gn=23.9*ease(ramp(p,0,.75)),dn=.3*ease(ramp(p,.75,1));
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=GX+c*C,y=GY+r*C,fg=clamp(gn-i),fd=i===24?clamp(dn/1):0;
      s+=`<rect x="${x}" y="${y}" width="${C-3}" height="${C-3}" rx="3" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(fg>0)s+=`<rect x="${x}" y="${y}" width="${f1((C-3)*fg)}" height="${C-3}" rx="3" style="fill:var(--gold)"/>`;
      if(i===24&&dn>0)s+=`<rect x="${f1(x+(C-3)*.9)}" y="${y}" width="${f1((C-3)*dn)}" height="${C-3}" style="fill:var(--terra)"/>`}
    const TX=N?16:290,TY=N?GY+10*C+30:70;
    s+=`<text x="${TX}" y="${TY}" class="t-big" style="fill:var(--gold);font-size:30px">${gn.toFixed(1)}%</text>`;
    s+=`<text x="${TX+(N?110:110)}" y="${TY-6}" class="t-lbl">common genetic variation</text>`;
    s+=`<text x="${TX+110}" y="${TY+9}" class="t-xs">genome-wide, in 16,760 adults</text>`;
    s+=`<text x="${TX}" y="${TY+50}" class="t-big" style="fill:var(--terra);font-size:30px">≤${dn.toFixed(1)}%</text>`;
    s+=`<text x="${TX+110}" y="${TY+44}" class="t-lbl">any one diet score</text>`;
    s+=`<text x="${TX+110}" y="${TY+59}" class="t-xs">a sliver of one square</text>`;
    const L=N?['Each square is 1% of the variation.','The rest (about 76%) is not explained','by either: age, sex, weight, kidney','function and medicines sit there.']:['Each square is 1% of the variation in serum urate.','The rest, about 76%, is explained by neither:','age, sex, body weight, kidney function and','medicines sit there, which is why weight and','diuretics still matter for who gets gout.'];
    L.forEach((l,i)=>s+=`<text x="${TX}" y="${TY+98+i*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    gs.innerHTML=s}
  function runG(){if(stopG)stopG();stopG=animate(2600,drawG,()=>{stopG=null})}
  $('#lvGPlay').onclick=runG;drawG(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runG()}},{threshold:.35});io.observe(gs)}else drawG(1);

  /* ---------- risk factors and triggers, log scale ---------- */
  const rs=$('#lvRisk');let rm='trig',ci=true,rp=1,stopR=null;
  function drawR(p){rp=p;const D=LV_RISK[rm],n=D.r.length;
    const N=vb(rs,'720 '+(74+n*30+30),'400 '+(84+n*54+40));
    const LX0=N?16:300,LX1=N?384:690,lo=.2,hi=6,lx=v=>LX0+(LX1-LX0)*Math.log(v/lo)/Math.log(hi/lo),Y0=N?62:52,RH=N?54:30;
    let s=`<text x="${N?16:10}" y="18" class="t-sm" style="fill:var(--sea)">${N?D.h.split(' · ')[0]:D.h}</text>`;
    if(N)s+=`<text x="16" y="34" class="t-xs">${D.h.split(' · ')[1]}</text>`;
    const ax=Y0+n*RH+(N?-8:4);
    if(!N)[.25,.5,1,2,4].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${Y0-16}" y2="${ax-10}" class="${v===1?'axis':'grid'}"/>`);
    [.25,.5,1,2,4].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${ax+4}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${LX1}" y="${ax+20}" class="t-xs t-end">${D.x}</text>`;
    D.r.forEach((R,i)=>{const y=Y0+i*RH,q=ease(clamp(p*1.6-i*.07)),v1=Math.exp(lerp(0,Math.log(R.v),q)),x1=lx(1),xe=lx(v1),by=N?y+18:y-10,col=R.v>=1?'var(--terra)':'var(--good)';
      s+=`<text x="${N?16:10}" y="${N?y:y-1}" class="t-lbl" style="font-size:12.5px">${R.n}</text><text x="${N?16:10}" y="${N?y+13:y+12}" class="t-xs">${R.s}</text>`;
      if(N)[.25,.5,1,2,4].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${by-3}" y2="${by+21}" class="${v===1?'axis':'grid'}"/>`);
      s+=`<rect x="${f1(Math.min(x1,xe))}" y="${by}" width="${f1(Math.abs(xe-x1))}" height="16" rx="3" style="fill:${col};opacity:${R.e?.55:.85}"/>`;
      const tx=R.v>=1?xe+6:xe-6;s+=`<text x="${f1(tx)}" y="${by+12}" class="t-xs${R.v>=1?'':' t-end'}" style="fill:${col};font-weight:700;opacity:${f1(ramp(q,.6,1))}">${R.v}</text>`;
      if(ci&&R.lo)s+=`<path d="M${f1(lx(R.lo))} ${by+20}H${f1(lx(R.hi))}M${f1(lx(R.lo))} ${by+17}v6M${f1(lx(R.hi))} ${by+17}v6" style="stroke:var(--ink);stroke-width:1.4;opacity:${f1(q)}"/>`});
    rs.innerHTML=s;$('#lvRCap').innerHTML=D.cap}
  function runR(){if(stopR)stopR();stopR=animate(1500,drawR,()=>{stopR=null})}
  $('#lvRPlay').onclick=runR;
  $('#lvCI').onclick=()=>{ci=!ci;$('#lvCI').setAttribute('aria-pressed',ci);drawR(rp)};
  $$('[data-lvr]').forEach(b=>b.onclick=()=>{rm=b.dataset.lvr;$$('[data-lvr]').forEach(x=>x.setAttribute('aria-pressed',x===b));runR()});
  drawR(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runR()}},{threshold:.3});io.observe(rs)}else drawR(1);
  onHide.living=(prev=>()=>{prev&&prev();if(stopR){stopR();stopR=null;drawR(1)}if(stopG){stopG();stopG=null;drawG(1)}})(onHide.living);
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawG(gp);drawR(rp)};
};
