/* ===== 4.5 Organ support in intensive care ===== */
/* The organ support panel: one step per organ system. Each panel shows the two arms of its key trial as bars,
   drawn from the published percentages (cited in the step notes); the person is illustrative. */
const ICU_PANELS={
 lung:{t:'Lungs · ventilation',sub:'6 mL/kg PBW, plateau ≤30',org:'lung',
   bars:[['6 mL/kg',31.0],['12 mL/kg',39.8]],cap:'mortality, ARDSNet',max:50},
 prone:{t:'Lungs · prone',sub:'face down >12 h a day (SSC)',org:'lung',
   bars:[['prone',16.0],['supine',32.8]],cap:'28-day mortality, PROSEVA',max:50},
 oxy:{t:'Oxygen',sub:'conservative: SpO2 88–92%',org:'lung',
   bars:[['SpO2 90%',35.4],['usual',34.9]],cap:'90-day mortality, UK-ROX',max:50},
 kidney:{t:'Kidneys',sub:'no early dialysis by default',org:'kidney',
   bars:[['accelerated',43.9],['standard',43.7]],cap:'90-day mortality, STARRT-AKI',max:50},
 blood:{t:'Blood · glucose, Hb, clots',sub:'insulin from 180 mg/dL',org:'heart',
   bars:[['81–108 mg/dL',27.5],['≤180 mg/dL',24.9]],cap:'90-day mortality, NICE-SUGAR',max:50},
 gut:{t:'Gut · feeding, stomach',sub:'enteral feed within 72 h',org:'gut',
   bars:[['pantoprazole',1.0],['placebo',3.5]],cap:'GI bleeding, REVISE',max:5},
 brain:{t:'Brain · sedation',sub:'light, daily wake-up, move',org:'brain',
   bars:[['early PT/OT',59],['control',35]],cap:'independent at discharge',max:70,good:true,dp:0},
 family:{t:'Family',sub:'goals of care within 72 h',org:null,
   bars:[['conference',45],['usual',69]],cap:'family PTSD-related symptoms',max:80,dp:0}
};
/* which panel each step lights, and the panels' places (left column, right column, bottom) */
const ICU_SLOT={lung:['L',0],prone:['L',0],oxy:['L',1],kidney:['L',2],brain:['R',0],blood:['R',1],gut:['R',2],family:['B',0]};
const ICU_STEPS=[
 {from:0,at:.04,p:null,k:'Admission',t:'Arriving in intensive care',
  txt:`SSC 2021 suggests ICU admission within 6 h for adults with sepsis who need intensive care (weak, low quality). [[Evans2021SSC]] In the ICON audit, sepsis occurred in 29.5% of ICU patients, with ICU mortality 25.8% and hospital mortality 35.3%. [[Sakr2018ICON]] In EPIC III, gram-negative organisms were found in 67% of culture-positive infected patients, and ICU-acquired infection carried higher odds of death (OR 1.32). [[Vincent2020EPICIII]]`,
  pt:`Intensive care gives one-to-one nursing and machines that support the lungs, heart and kidneys while the infection is treated.`,
  hook:`ICU mortality figures are population statistics: ICON 25.8% ICU, 35.3% hospital. [[Sakr2018ICON]]`},
 {from:.1,at:.15,p:'lung',k:'Lungs',t:'Small breaths protect the lungs',
  txt:`ARDSNet (861 patients): 6 mL/kg predicted body weight with plateau pressure ≤30 cmH2O cut mortality from 39.8% to 31.0% vs 12 mL/kg. [[ARDSNet2000]] SSC 2021 recommends a low tidal volume strategy (6 mL/kg) over >10 mL/kg (strong, high quality), an upper plateau pressure goal of 30 cmH2O in severe ARDS, and suggests higher PEEP in moderate-severe ARDS. [[Evans2021SSC]]`,
  pt:`The breathing machine is set to give small, gentle breaths. Bigger breaths can stretch and damage inflamed lungs.`,
  hook:`ARDSNet: 6 mL/kg PBW, plateau ≤30 cmH2O; mortality 31.0% vs 39.8%. [[ARDSNet2000]]`},
 {from:.21,at:.26,p:'prone',k:'Lungs',t:'Turning face down (prone)',
  txt:`PROSEVA (466 with severe ARDS, PaO2:FiO2 <150): prone sessions of at least 16 hours cut 28-day mortality from 32.8% to 16.0% (HR 0.39) and 90-day mortality from 41.0% to 23.6%. [[Guerin2013PROSEVA]] SSC 2021 recommends prone ventilation for more than 12 h daily in moderate-severe sepsis-induced ARDS (strong). [[Evans2021SSC]] Turning needs a team and careful protection of the face, tubes and pressure points (see <a href="#nursing" data-go="nursing">nursing care</a>).`,
  pt:`Some people are turned onto their front for many hours a day. It helps oxygen get into the lungs.`,
  hook:`PROSEVA: prone ≥16 h, 28-day mortality 16.0% vs 32.8%. SSC: prone >12 h daily. [[Guerin2013PROSEVA,Evans2021SSC]]`},
 {from:.32,at:.36,p:'oxy',k:'Oxygen',t:'Oxygen: enough, not more',
  txt:`SSC 2021 found insufficient evidence for conservative targets (generally PaO2 55–70 mmHg or SpO2 88–92%). [[Evans2021SSC]] UK-ROX (16,500 ventilated adults): an SpO2 target of 90% cut oxygen exposure by 29% with no change in 90-day mortality (35.4% vs 34.9%). HOT-ICU and ICU-ROX also found no difference. [[Martin2025UKROX,Schjorring2021HOTICU,Mackle2020ICUROX]]`,
  pt:`More oxygen is not always better. Large trials found that aiming a little lower was just as safe.`,
  hook:`Three oxygen-target trials, no mortality difference: ICU-ROX, HOT-ICU, UK-ROX. [[Mackle2020ICUROX,Schjorring2021HOTICU,Martin2025UKROX]]`},
 {from:.42,at:.47,p:'kidney',k:'Kidneys',t:'Kidneys: watchful waiting',
  txt:`KDIGO AKI includes urine below 0.5 mL/kg/hour for 6 hours. [[Kellum2013KDIGO]] Early dialysis without an urgent indication did not lower mortality in AKIKI (48.5% vs 49.7%), IDEAL-ICU (58% vs 54%) or STARRT-AKI (43.9% vs 43.7%). In AKIKI, 49% of the delayed group never needed dialysis; STARRT-AKI found more dialysis dependence with an accelerated start (10.4% vs 6.0%). [[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]] SSC 2021 suggests against KRT without a definitive indication. [[Evans2021SSC]]`,
  pt:`If the kidneys slow down, the team often waits, because many recover on their own. Dialysis is started when there is a clear need.`,
  hook:`Early dialysis without urgent indications does not save lives (AKIKI, IDEAL-ICU, STARRT-AKI). [[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]]`},
 {from:.52,at:.57,p:'blood',k:'Blood',t:'Glucose, haemoglobin and clots',
  txt:`NICE-SUGAR (6,104): tight glucose (81–108 mg/dL, 4.5–6.0 mmol/L) raised 90-day mortality vs ≤180 mg/dL (27.5% vs 24.9%), with severe hypoglycaemia in 6.8% vs 0.5%. [[Finfer2009NICESUGAR]] SSC 2021 recommends starting insulin at ≥180 mg/dL (10 mmol/L), typical target 144–180 mg/dL, a restrictive transfusion strategy (typically a 70 g/L trigger), and drug VTE prophylaxis with LMWH over unfractionated heparin. [[Evans2021SSC]] TRISS: Hb ≤7 vs ≤9 g/dL, 43.0% vs 45.0% mortality with fewer units. [[Holst2014TRISS]]`,
  pt:`Blood sugar is kept in a moderate range, not too tight. Blood transfusions are given only when the level is quite low, and injections help prevent clots.`,
  hook:`NICE-SUGAR: tight glucose harmed. SSC: insulin from ≥180 mg/dL, target 144–180. TRISS: Hb 7 as safe as 9. [[Finfer2009NICESUGAR,Evans2021SSC,Holst2014TRISS]]`},
 {from:.62,at:.67,p:'gut',k:'Gut',t:'Feeding and stomach protection',
  txt:`SSC 2021 suggests early enteral nutrition (within 72 h) where possible, and stress ulcer prophylaxis for those with GI bleeding risk factors (both weak). [[Evans2021SSC]] NUTRIREA-3: low calorie targets in week one were not worse than standard (90-day mortality 41.3% vs 42.8%). [[Reignier2023NUTRIREA3]] REVISE (4,821 ventilated adults): pantoprazole cut clinically important upper GI bleeding (1.0% vs 3.5%) with no significant mortality effect (29.1% vs 30.9%). [[Cook2024REVISE]]`,
  pt:`Feeding through a tube into the stomach usually starts within a few days, and a medicine may be given to protect the stomach from bleeding.`,
  hook:`Stomach protection lowers bleeding without a clear mortality effect (SUP-ICU, REVISE); PEPTIC P = .054 for PPI vs H2 blocker. [[Krag2018SUPICU,Cook2024REVISE,Young2020PEPTIC]]`},
 {from:.72,at:.77,p:'brain',k:'Brain',t:'Light sedation, wake up, get moving',
  txt:`ABC trial: daily sedation interruption paired with a breathing trial gave more ventilator-free days (14.7 vs 11.6), shorter ICU stay and lower one-year mortality (HR 0.68). [[Girard2008ABC]] Early physical and occupational therapy raised independence at discharge (59% vs 35%). [[Schweickert2009Mobility]] Choice of sedative mattered less: SPICE III and MENDS2 found no mortality difference. [[Shehabi2019SPICE3,Hughes2021MENDS2]] Full ABCDEF bundle performance went with lower 7-day hospital death (aHR 0.32, observational). [[Pun2019ABCDEF]]`,
  pt:`People are woken each day to see if they can breathe on their own, and helped to sit, stand and move as early as possible.`,
  hook:`ABC trial: wake-up plus breathing trial, NNT 7.4 for one-year survival. [[Girard2008ABC]]`},
 {from:.82,at:.9,p:'family',k:'Family',t:'Goals of care and the family',
  txt:`SSC 2021 recommends discussing goals of care and prognosis with patients and families (Best Practice Statement), early, within 72 h (weak). [[Evans2021SSC]] A proactive end-of-life family conference with a bereavement brochure lowered relatives' PTSD-related symptoms at 90 days (45% vs 69%), anxiety (45% vs 67%) and depression (29% vs 56%). [[Lautrette2007Brochure]]`,
  pt:`Families should expect regular, honest talks with the team about what is happening and what matters most to their loved one.`,
  hook:`SSC 2021: goals-of-care discussion early, within 72 h. [[Evans2021SSC]]`}
];
/* the trial explorer: arms as published, outcome named */
const ICU_TR=[
 {g:'Lungs',n:'ARDSNet',a:['6 mL/kg',31.0],b:['12 mL/kg',39.8],o:'deaths',v:'benefit',w:`Lower tidal volumes cut mortality (P = 0.007). [[ARDSNet2000]]`},
 {g:'Lungs',n:'PROSEVA',a:['Prone',16.0],b:['Supine',32.8],o:'deaths by day 28',v:'benefit',w:`Prone sessions of at least 16 h in severe ARDS (HR 0.39). [[Guerin2013PROSEVA]]`},
 {g:'Lungs',n:'EOLIA',a:['Early ECMO',35],b:['Conventional',46],o:'deaths by day 60',v:'uncertain',dp:0,w:`Not statistically significant (RR 0.76, 95% CI 0.55–1.04; P = 0.09), and 28% of controls crossed over to ECMO. [[Combes2018EOLIA]]`},
 {g:'Oxygen',n:'UK-ROX',a:['SpO2 90%',35.4],b:['Usual',34.9],o:'deaths by day 90',v:'none',w:`Less oxygen (29% lower exposure), the same mortality. [[Martin2025UKROX]]`},
 {g:'Kidneys',n:'STARRT-AKI',a:['Accelerated',43.9],b:['Standard',43.7],o:'deaths by day 90',v:'none',w:`No benefit, and more dialysis dependence among survivors (10.4% vs 6.0%). [[Bagshaw2020STARRT]]`},
 {g:'Kidneys',n:'AKIKI',a:['Early',48.5],b:['Delayed',49.7],o:'deaths by day 60',v:'none',w:`49% of the delayed group never needed dialysis. [[Gaudry2016AKIKI]]`},
 {g:'Blood',n:'NICE-SUGAR',a:['81–108 mg/dL',27.5],b:['≤180 mg/dL',24.9],o:'deaths by day 90',v:'harm',w:`Tight glucose control raised mortality (OR 1.14, 95% CI 1.02–1.28). [[Finfer2009NICESUGAR]]`},
 {g:'Blood',n:'TRISS',a:['Hb ≤7 g/dL',43.0],b:['Hb ≤9 g/dL',45.0],o:'deaths by day 90',v:'none',w:`Similar mortality with fewer transfusions (median 1 vs 4 units). [[Holst2014TRISS]]`},
 {g:'Gut',n:'REVISE',a:['Pantoprazole',29.1],b:['Placebo',30.9],o:'deaths by day 90',v:'none',w:`No significant mortality effect, but less upper GI bleeding (1.0% vs 3.5%). [[Cook2024REVISE]]`},
 {g:'Gut',n:'NUTRIREA-3',a:['Low calorie',41.3],b:['Standard',42.8],o:'deaths by day 90',v:'none',w:`Low early targets were not worse and readiness for discharge came slightly sooner. [[Reignier2023NUTRIREA3]]`},
 {g:'Brain',n:'SPICE III',a:['Dexmedetomidine',29.1],b:['Usual care',29.1],o:'deaths by day 90',v:'none',w:`Identical mortality; slow heart rate and low blood pressure were more common. [[Shehabi2019SPICE3]]`},
 {g:'Fever',n:'HEAT',a:['Paracetamol',15.9],b:['Placebo',16.6],o:'deaths by day 90',v:'none',w:`Treating fever with IV paracetamol did not change ICU-free days or mortality. [[Young2015HEAT]]`}
];
const ICU_V={benefit:['yes','Lower with the first strategy'],none:['maybe','No meaningful difference'],harm:['no','Higher with the first strategy: harm'],uncertain:['maybe','Lower, but not statistically significant']};
inits.icu=()=>{
  const svg=$('#icSvg'),rg=$('#icT'),note=$('#icNote'),rd=$('#icRead');let setSt=()=>{};
  function panel(id,x,y,w,h,on,seen,u){const P=ICU_PANELS[id];let s='';
    s+=`<g style="opacity:${on?1:seen?.85:.45}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${on?'var(--rx-soft)':'var(--panel)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?2:1}"/>`;
    s+=`<text x="${x+10}" y="${y+18}" class="t-lbl" style="font-size:12.5px">${P.t}</text><text x="${x+10}" y="${y+31}" class="t-xs">${P.sub}</text>`;
    const g=seen?(on?ease(u):1):0,lx=x+10,bx=x+w*.46,bw=w*.54-42;
    P.bars.forEach(([lab,v],i)=>{const yy=y+44+i*18,good=P.good?i===0:i===0&&v<P.bars[1][1];
      s+=`<text x="${lx}" y="${yy+8}" class="t-xs" style="fill:var(--ink)">${lab}</text><rect x="${f1(bx)}" y="${yy}" width="${f1(bw)}" height="9" rx="3" style="fill:var(--panel-2)"/>`;
      if(g>0)s+=`<rect x="${f1(bx)}" y="${yy}" width="${f1(bw*v/P.max*g)}" height="9" rx="3" style="fill:${i===0?'var(--rx)':'var(--muted)'}"/><text x="${f1(x+w-8)}" y="${yy+8}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${seen?v.toFixed(P.dp==null?1:P.dp)+'%':''}</text>`});
    s+=`<text x="${x+10}" y="${y+h-8}" class="t-xs" style="font-size:8.8px">${P.cap}</text></g>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 652'),p=phaseOf(ICU_STEPS,t),S=ICU_STEPS[p],act=S.p,u=ramp(t,S.from,S.from+.06);
    const L=N?{bx:200,by:30,bs:.6,pw:186,ph:100,lx:10,rx:204,py:[210,318,426],fx:10,fy:534,fw:380}
             :{bx:360,by:34,bs:.9,pw:222,ph:104,lx:14,rx:484,py:[30,146,262],fx:249,fy:290,fw:222};
    let s='';
    /* the person in bed: a bed outline under the body */
    const bh=260*L.bs;s+=`<rect x="${f1(L.bx-78*L.bs)}" y="${f1(L.by+34*L.bs)}" width="${f1(156*L.bs)}" height="${f1(bh-24*L.bs)}" rx="12" style="fill:var(--panel-2);opacity:.6"/>`;
    const kfail=act==='kidney'?.6*ramp(t,.42,.47)*(1-ramp(t,.48,.52)*.5):0;
    const B=body(L.bx,L.by,L.bs,{id:'icB',organs:true,fail:{kidney:kfail}});s+=B.svg;
    /* the active organ glows; lungs breathe small breaths, with a dashed ghost of a 12 mL/kg breath */
    const P=act&&ICU_PANELS[act],org=P&&P.org;
    if(org){const k=org==='gut'?'abdomen':org,at=B.at[k],z={lung:30,heart:14,kidney:18,brain:17,gut:22}[org]*L.bs;
      const br=org==='lung'?1+.05*Math.sin(t*260):1;
      s+=organ(org,at[0],at[1],z*br,{glow:.9});
      if(org==='lung'&&act==='lung')s+=`<ellipse cx="${f1(at[0])}" cy="${f1(at[1])}" rx="${f1(z*.78)}" ry="${f1(z*.62)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:3 3;opacity:.8"/><text x="${f1(at[0])}" y="${f1(at[1]-z*.7)}" class="t-xs t-mid" style="fill:var(--bad)">12 mL/kg</text>`}
    if(act==='prone'&&!N){s+=`<text x="${f1(L.bx)}" y="${f1(L.by+bh+(N?14:16))}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">${Math.sin(t*40)>0?'turned face down':'turning…'}</text>`}
    /* the panels and their leader lines */
    const seenUpTo=p;Object.keys(ICU_SLOT).forEach(id=>{const[col,r]=ICU_SLOT[id];if(id==='lung'&&act==='prone'||id==='prone'&&act!=='prone')return;
      const idx=ICU_STEPS.findIndex(x=>x.p===id),seen=idx<=seenUpTo&&idx>=0,on=act===id;
      const x=col==='L'?L.lx:col==='R'?L.rx:L.fx,y=col==='B'?L.fy:L.py[r],w=col==='B'?L.fw:L.pw;
      const Pn=ICU_PANELS[id];if(Pn.org&&!N){const k=Pn.org==='gut'?'abdomen':Pn.org,at=B.at[k],ex=col==='L'?x+w:x;
        s+=`<path d="M${f1(ex)} ${f1(y+L.ph/2)}L${f1(at[0])} ${f1(at[1])}" style="stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?1.6:1};fill:none;stroke-dasharray:${on?'none':'3 4'}"/>`}
      s+=panel(id,x,y,w,L.ph,on,seen,u)});
    if(N&&act){s+=`<text x="200" y="${L.py[0]-8}" class="t-sm t-mid" style="fill:var(--rx)">${p+1} · ${S.t}</text>`}
    else if(!N&&!act){s+=`<text x="${L.bx}" y="20" class="t-sm t-mid" style="fill:var(--rx)">${S.t}</text>`}
    svg.innerHTML=s;
    rd.innerHTML=`<span>Step <b>${p+1} of ${ICU_STEPS.length}</b></span><span>Panel <b>${P?P.t:'overview'}</b></span>${P?`<span>Trial <b>${P.cap}</b>: ${P.bars.map(b=>b[0]+' '+b[1].toFixed(P.dp==null?1:P.dp)+'%').join(' vs ')}</span>`:''}`;
    note.innerHTML=noteHTML(S);setSt(p);
    svg.setAttribute('aria-label',`Organ support panel, step ${p+1}: ${S.t}.`+(P?` ${P.t}: ${P.cap}, ${P.bars.map(b=>b[0]+' '+b[1].toFixed(P.dp==null?1:P.dp)+'%').join(' versus ')}.`:''));
  }
  const stop=playWire(rg,$('#icPlay'),draw,30000,'%t:player.replay%','icu');
  setSt=stepWire($('#icSteps'),ICU_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- trial explorer: two icon arrays ---------- */
  const pk=$('#icPick'),ts=$('#icTrSvg'),tn=$('#icTrNote');let cur=0;
  let lastG='';pk.innerHTML=ICU_TR.map((x,i)=>{const h=x.g!==lastG?`<span class="ic-grp">${x.g}</span>`:'';lastG=x.g;return h+`<button class="btn" data-ictr="${i}" aria-pressed="false">${x.n}</button>`}).join('');
  function tr(){const T=ICU_TR[cur],N=vb(ts,'720 250','400 250'),sz=N?11:12,gp=N?2:3,ax=N?14:70,bxx=N?210:410,y0=56;
    let s=`<text x="${N?14:20}" y="22" class="t-big">${T.n}</text><text x="${N?14:20}" y="38" class="t-sm">${T.o} per 100 people in each arm (rounded)</text>`;
    [[T.a,ax,'var(--rx)'],[T.b,bxx,'var(--muted)']].forEach(([arm,x,col])=>{const k=Math.round(arm[1]),I=icons(x,y0+14,{n:100,cols:10,k,size:sz,gap:gp,col,base:'var(--line)'});
      s+=`<text x="${x}" y="${y0+4}" class="t-lbl" style="font-size:12.5px">${arm[0]}: <tspan style="fill:${col==='var(--muted)'?'var(--ink)':'var(--rx)'}">${arm[1].toFixed(T.dp==null?1:T.dp)}%</tspan></text>`+I.svg});
    ts.innerHTML=s;ts.setAttribute('aria-label',`${T.n}: ${T.o}. ${T.a[0]} ${T.a[1].toFixed(T.dp==null?1:T.dp)}%, ${T.b[0]} ${T.b[1].toFixed(T.dp==null?1:T.dp)}%. ${ICU_V[T.v][1]}.`);
    const V=ICU_V[T.v];tn.innerHTML=`<p class="verdict ${V[0]}">${V[1]}</p><p class="stage-cap">${T.w}</p>`;
    $$('[data-ictr]',pk).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ictr===cur))}
  pk.addEventListener('click',e=>{const b=e.target.closest('[data-ictr]');if(!b)return;cur=+b.dataset.ictr;tr()});
  tr();redraws.icu=(()=>{const prev=redraws.icu;return()=>{prev&&prev();tr()}})();
};
