/* =============== 3.3 bpsd: beyond memory =============== */
const BP_STEPS=[
 {from:0,at:.07,k:'D · Describe',t:'A behaviour appears',
  txt:`Neuropsychiatric symptoms are the rule, not the exception. In a US population study, 75% of people with dementia had one in the past month; the commonest were apathy (36%), depression (32%) and agitation or aggression (30%). In Cache County, 97% had at least one over 5 years. DICE starts by describing the behaviour precisely: what happens, when, where, with whom, and how the person and caregiver experience it. [[Lyketsos2002,Steinberg2008,Kales2014,Kales2015]]`,
  pt:`First, describe exactly what happens and when. "Calls out and pushes away at bath time, late in the afternoon" is more useful than "aggressive".`,
  hook:`DICE = Describe, Investigate, Create, Evaluate. From a 2011 multidisciplinary expert panel. [[Kales2014]]`},
 {from:.2,at:.34,k:'I · Investigate',t:'The view widens: what is behind it?',
  txt:`The approach looks for underlying causes before considering drugs: unmet needs, medical problems such as pain or infection, the environment (noise, boredom, too much or too little going on) and the caregiver's approach and stress. [[Kales2014,Kales2015]]`,
  pt:`Behaviour is often a message. The person may be in pain, unwell, thirsty, bored, overwhelmed by noise, or startled by being rushed.`},
 {from:.47,at:.58,k:'C · Create',t:'A plan matched to each cause',
  txt:`Expert consensus and reviews recommend non-drug approaches first, except in emergencies. Interventions for family caregivers have the strongest non-drug evidence base. The plan is built with the caregiver: treat the cause, change the environment or routine, and adjust how care is offered. [[Kales2014,Kales2015]]`,
  pt:`Fix what can be fixed: treat pain, check for infection, lower the noise, offer something to do, meet the need, slow down.`,
  hook:`Non-drug first, except in emergencies. Caregiver interventions have the strongest non-drug evidence. [[Kales2015]]`},
 {from:.7,at:.8,k:'E · Evaluate',t:'Did it help?',
  txt:`The team checks whether the plan was carried out and whether the behaviour, and the caregiver's distress, improved. If not, the process loops back to investigating. [[Kales2014,Kales2015]]`,
  pt:`Check what changed. If it did not help, look again for another cause.`},
 {from:.87,at:.96,k:'The evidence',t:'What has and has not been tested',
  txt:`No large outcome trial has tested DICE itself. One uncontrolled before-and-after study of a one-day DICE training for 180 caregivers found improved caregiver confidence. Related person-centred approaches have trial evidence: in WHELD, a cluster trial in 69 UK nursing homes (847 residents), person-centred care training improved quality of life (d 0.24), agitation (CMAI −4.27) and overall symptoms (NPI-NH −4.55), and saved costs. [[Kales2020,Ballard2018]]`,
  pt:`DICE is an expert-recommended way of thinking, not a tested treatment. Training care-home staff in person-centred care did help in a large trial.`,
  hook:`DICE: expert consensus with limited direct evidence. WHELD: randomised evidence for person-centred care training in nursing homes.`}
];
const BP_RK=[
 {from:0,at:.12,k:'Step 1 · Placebo',t:'1,000 people on placebo',
  txt:`In the 17 placebo-controlled trials behind the US class warning (modal length 10 weeks), about 2.6% of people with dementia on placebo died. That is about 26 people in 1,000. [[FDARexulti2026,Huntzinger2005]]`,
  pt:`Older people with dementia are frail. Even on a dummy pill, about 26 in every 1,000 died over about 10 weeks.`},
 {from:.2,at:.32,k:'Step 2 · Antipsychotic',t:'1,000 people on an antipsychotic',
  txt:`On the drugs, about 4.5% died: a 1.6- to 1.7-fold risk. Most deaths were cardiovascular (heart failure, sudden death) or infectious (pneumonia). The FDA first issued this warning for atypical antipsychotics in April 2005 and, per secondary reports, extended it to older conventional antipsychotics in June 2008. [[FDARexulti2026,Huntzinger2005,PsychNews2008]]`,
  pt:`On the medicine, about 45 in every 1,000 died over the same time.`,
  hook:`Boxed warning: increased mortality in elderly people with dementia-related psychosis. About 4.5% vs 2.6% over about 10 weeks. [[FDARexulti2026]]`},
 {from:.4,at:.5,k:'Step 3 · The difference',t:'About 19 extra deaths per 1,000',
  txt:`4.5% minus 2.6% is about 19 extra deaths per 1,000 people over about 10 weeks, roughly one extra death for every 50 or so treated (arithmetic from the label rates). A published meta-analysis of 15 trials found 3.5% versus 2.3% (OR 1.54, 95% CI 1.06 to 2.23), with no difference between individual drugs. [[FDARexulti2026,Schneider2005]]`,
  pt:`Out of every 1,000 people, about 19 more died than would have without the medicine.`},
 {from:.6,at:.7,k:'Step 4 · Real-world risk',t:'Number needed to harm, 180 days',
  txt:`In 90,786 US veterans with dementia, one extra death occurred within 180 days for every 26 people started on haloperidol, 27 on risperidone, 40 on olanzapine and 50 on quetiapine. Risk rose with dose. [[Maust2015]]`,
  pt:`In real-world use, for every 26 to 50 people given one of these medicines, one more person died within 6 months.`,
  hook:`NNH for death at 180 days (Maust 2015): haloperidol 26, risperidone 27, olanzapine 40, quetiapine 50.`},
 {from:.8,at:.9,k:'Step 5 · Benefit and stopping',t:'Small benefit, real trade-offs',
  txt:`In CATIE-AD (421 people), improvement on the clinician's global rating was 32%, 26% and 29% with olanzapine, quetiapine and risperidone against 21% on placebo, not significantly different, while stopping for intolerability was 24%, 16% and 18% against 5%. The authors concluded adverse effects offset the advantages. In DART-AD, survival was lower in people who stayed on antipsychotics (36 months: 30% vs 59%). Yet among people who had responded to risperidone, stopping raised relapse (60% vs 33%). Beers 2023 advises avoiding antipsychotics for behaviour unless non-drug options have failed and the person is a danger to self or others. [[Schneider2006,Ballard2009,Devanand2012,AGS2023]]`,
  pt:`The benefit is small and side effects are common. Stopping can bring symptoms back in people who were helped, so decisions are weighed case by case with the clinical team.`}
];
const BP_OPT=[
 {k:'Brexpiprazole',t:'Approved, with a small effect',
  txt:`On 11 May 2023 the FDA approved brexpiprazole for agitation associated with dementia due to Alzheimer's disease, the first drug approved for this. It keeps the class boxed warning on mortality, and the label says it is not for as-needed use. In the pivotal 12-week trial (345 people), CMAI scores fell 22.6 points on the drug against 17.3 on placebo: a difference of 5.32 (95% CI 1.87 to 8.77), Cohen's d 0.35. An earlier flexible-dose trial missed its primary endpoint. [[FDA2023Rexulti,FDARexulti2026,Lee2023,Grossberg2020]] On 30 April 2026 the FDA approved a second drug for this agitation, dextromethorphan–bupropion (Auvelity), which is not an antipsychotic; its boxed warning is the antidepressant one on suicidal thoughts and behaviours. In its 5-week trial (152 people on the drug, 156 on placebo), CMAI scores fell 14.9 points against 11.6 on placebo, a difference of 3.3 (95% CI 0.8 to 5.8). Its label also says it is not for as-needed use. [[FDAAuvelity2026]]`,
  pt:`It is the first medicine approved for agitation in Alzheimer's, but most of the improvement in the trial also happened on the dummy pill.`,
  hook:`Brexpiprazole: CMAI −5.32 vs placebo against a placebo improvement of 17.3; baselines around 80. Boxed warning still applies.`},
 {k:'Citalopram',t:'Less agitation, but at a price',
  txt:`In CitAD (186 people, 9 weeks, everyone also receiving a psychosocial intervention), 40% on citalopram improved moderately or markedly against 26% on placebo. Cognition worsened (MMSE −1.05) and QTc lengthened by 18.1 ms. The trial dose was 30 mg/day; the current label sets 20 mg/day as the maximum for people over 60 because of dose-dependent QT prolongation. [[Porsteinsson2014,FDACelexa2023]]`,
  pt:`It eased agitation in some people but slightly worsened thinking and affected heart rhythm, at a dose above today's label limit for older adults.`,
  hook:`CitAD used a dose above the label maximum for people over 60 (QT prolongation).`},
 {k:'Sleep medicines',t:'Little tested, mostly small',
  txt:`Cochrane 2020: melatonin had little or no effect on sleep in Alzheimer's (+10.68 minutes, 95% CI −16.22 to 37.59, low certainty). Trazodone in one small trial (30 people) may add 42.46 minutes (0.9 to 84.0). There were no randomised trials of benzodiazepines or Z-drugs in people with dementia and sleep problems. Suvorexant added 28 minutes over placebo (11 to 45) in a 4-week trial of 285 people. Beers 2023 advises avoiding benzodiazepines and Z-drugs in dementia. [[McCleery2020,Herring2020,FDABelsomra2025,AGS2023]]`,
  pt:`Few sleep medicines have been tested in dementia. The ones that have added minutes, not hours, and the most widely used sleeping pills have not been tested at all.`,
  hook:`Benzodiazepines and Z-drugs: no RCTs in dementia; Beers 2023 says avoid (falls, fractures, delirium, cognitive impairment).`},
 {k:'Pimavanserin',t:'Turned down twice for dementia psychosis',
  txt:`In the HARMONY withdrawal trial, relapse of dementia-related psychosis was 13% on pimavanserin against 28% on placebo (HR 0.35), and the trial stopped early for efficacy. The FDA declined approval in April 2021, citing subgroups without significant results and too few patients with less common dementias, and again in August 2022, saying the benefit was driven by the Parkinson's disease dementia subgroup. As of the June 2026 label it is approved only for Parkinson's disease psychosis, with the dementia mortality boxed warning. [[Tariot2021,Healio2021,Acadia2022,FDANuplazid2026]]`,
  pt:`A trial looked promising, but regulators judged the evidence not strong enough for Alzheimer's.`,
  hook:`Pimavanserin: approved for Parkinson's disease psychosis only. Two complete response letters (2021, 2022) for dementia-related psychosis.`}
];
inits.bpsd=()=>{
  /* ---------- 1. DICE ---------- */
  const svg=$('#bpSvg'),rg=$('#bpT');
  const CAUSES=[
   {id:'pain',c:'pain',cn:'pain',a:'look for and treat pain',an:'treat pain'},
   {id:'inf',c:'infection, e.g. urinary',cn:'infection',a:'check for infection',an:'check for infection'},
   {id:'noise',c:'noise: TV, alarms',cn:'noise',a:'quieter, calmer room',an:'quieter room'},
   {id:'bored',c:'boredom, nothing to do',cn:'boredom',a:'meaningful activity',an:'something to do'},
   {id:'need',c:'unmet need: thirst, toilet, cold',cn:'unmet need',a:'meet the need first',an:'meet the need'},
   {id:'rush',c:'a rushed approach',cn:'rushed care',a:'slow down and explain',an:'slow down, explain'}
  ];
  function glyph(id,x,y){const st='fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round';
    if(id==='pain')return `<path d="M${x-2} ${y-11} L${x-7} ${y+1} H${x+1} L${x-3} ${y+11} L${x+8} ${y-3} H${x} L${x+4} ${y-11} Z" style="fill:var(--rose);stroke:none"/>`;
    if(id==='inf')return `<rect x="${x-3}" y="${y-12}" width="6" height="17" rx="3" style="${st}"/><circle cx="${x}" cy="${y+7}" r="5" style="fill:var(--rose)"/><path d="M${x} ${y+5} V${y-5}" style="stroke:var(--rose);stroke-width:2.4"/>`;
    if(id==='noise')return `<path d="M${x-10} ${y-4} h5 l6 -6 v20 l-6 -6 h-5 z" style="fill:var(--ink)"/><path d="M${x+4} ${y-4} q4 4 0 8 M${x+7} ${y-8} q8 8 0 16" style="${st}"/>`;
    if(id==='bored')return `<circle cx="${x}" cy="${y}" r="11" style="${st}"/><path d="M${x} ${y} V${y-7} M${x} ${y} L${x+5} ${y+3}" style="${st}"/>`;
    if(id==='need')return `<path d="M${x-8} ${y-10} H${x+8} L${x+5} ${y+11} H${x-5} Z" style="${st}"/><path d="M${x-6} ${y-2} H${x+6}" style="stroke:var(--sky);stroke-width:2"/>`;
    return `<path d="M${x-12} ${y-4} H${x+6} M${x+1} ${y-9} L${x+6} ${y-4} L${x+1} ${y+1} M${x-12} ${y+5} H${x+6} M${x+1} ${y} L${x+6} ${y+5} L${x+1} ${y+10}" style="${st}"/>`}
  function person(x,y,agit,calm){/* seated person, arm raised when agitated */
    let g='';
    g+=`<path d="M${x-30} ${y+56} V${y+10} M${x-30} ${y+30} H${x+18} V${y+56}" style="fill:none;stroke:var(--cell-line);stroke-width:4;stroke-linecap:round"/>`;
    g+=`<path d="M${x-8} ${y-24} Q${x-14} ${y+6} ${x-8} ${y+26} H${x+16} L${x+22} ${y+58}" style="fill:none;stroke:var(--sage);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/>`;
    const ax=lerp(x+24,x+34,agit),ay=lerp(y+12,y-30,agit);
    g+=`<path d="M${x-6} ${y-16} L${f1(lerp(x+14,x+22,agit))} ${f1(lerp(y+2,y-12,agit))} L${f1(ax)} ${f1(ay)}" style="fill:none;stroke:var(--sage);stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/>`;
    g+=`<circle cx="${x-6}" cy="${y-42}" r="14" style="fill:var(--cell);stroke:var(--sage);stroke-width:2.4"/>`;
    g+=agit>.3?`<path d="M${x-11} ${y-38} q5 -4 10 0" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><ellipse cx="${x+2}" cy="${y-37}" rx="3" ry="${f1(2+agit*2)}" style="fill:var(--ink)"/>`
              :`<path d="M${x-11} ${y-37} q5 ${f1(3*calm)} 10 0" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 420','400 600');
    const L=N?{band:{y:26,xs:[52,148,252,348],w:88},cx:200,cy:270,clip:[0,52,400,548],
               nodes:[ [70,150],[70,290],[70,430],[330,150],[330,290],[330,430]],burst:{y:150},ev:{y:356},evW:'n',bn:{y:556}}
             :{band:{y:26,xs:[110,270,450,610],w:140},cx:360,cy:232,clip:[0,52,720,368],
               nodes:[ [130,100],[110,210],[140,320],[590,100],[610,210],[580,320]],burst:{y:122},ev:{y:336},evW:'w',bn:{y:410}};
    let s=`<defs><clipPath id="bpClip"><rect x="${L.clip[0]}" y="${L.clip[1]}" width="${L.clip[2]}" height="${L.clip[3]}"/></clipPath>${marker('bpA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* D I C E band */
    const ph=phaseOf(BP_STEPS,t),names=N?['Describe','Investigate','Create','Evaluate']:['Describe','Investigate','Create','Evaluate'];
    L.band.xs.forEach((x,i)=>{const on=ph===i||(ph===4);const cur=ph===i;
      s+=`<rect x="${x-L.band.w/2}" y="${L.band.y-16}" width="${L.band.w}" height="30" rx="15" style="fill:${cur?'var(--sky-soft)':'var(--panel)'};stroke:${cur?'var(--sky)':'var(--line)'};stroke-width:${cur?2:1}"/>`;
      s+=`<text x="${x}" y="${L.band.y+4}" class="t-lbl t-mid" style="fill:${on||cur?'var(--ink)':'var(--muted)'}"><tspan style="fill:var(--sky)">${'DICE'[i]}</tspan>${N?'':' · '+names[i]}</text>`;
      if(N)s+=`<text x="${x}" y="${L.band.y+30}" class="t-xs t-mid">${names[i]}</text>`;
      if(i<3)s+=`<path d="M${x+L.band.w/2+3} ${L.band.y-1} H${L.band.xs[i+1]-L.band.w/2-5}" class="arrow" marker-end="url(#bpA)"/>`});
    /* loop back during evaluate */
    const loop=ramp(t,.74,.8);if(loop>0){const a=L.band.xs[3],b=L.band.xs[1],yb=L.band.y+(N?36:18);
      s+=`<path d="M${a} ${yb} V${yb+8} H${b} V${yb+2}" class="arrow" style="stroke:var(--sky);opacity:${f1(loop)}" marker-end="url(#bpA)"/><text x="${(a+b)/2}" y="${yb+20}" class="t-xs t-mid" style="fill:var(--sky);opacity:${f1(loop)}">${N?'not better? look again':'not better? investigate again'}</text>`}
    /* scene, zoomed in at Describe and widening at Investigate */
    const z=lerp(1.75,1,ease(ramp(t,.2,.34)));
    s+=`<g clip-path="url(#bpClip)"><g transform="translate(${L.cx} ${L.cy}) scale(${z.toFixed(3)}) translate(${-L.cx} ${-L.cy})">`;
    /* causes */
    const nodeO=i=>ramp(t,.24+i*.025,.32+i*.025),fixO=i=>ramp(t,.5+i*.025,.56+i*.025);
    const fixed=i=>ramp(t,.72+i*.015,.78+i*.015);
    CAUSES.forEach((c,i)=>{const [x,y]=L.nodes[i],o=nodeO(i);if(o<=0)return;
      const right=x>L.cx;
      s+=`<g style="opacity:${f1(o)}"><path d="M${x+(right?-24:24)} ${y} L${f1(L.cx+(right?30:-34))} ${L.cy-10}" style="stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 4"/>`;
      s+=`<circle cx="${x}" cy="${y}" r="23" style="fill:var(--panel);stroke:var(--rose);stroke-width:1.8"/>${glyph(c.id,x,y)}`;
      s+=`<text x="${x}" y="${y+38}" class="t-xs t-mid" style="fill:var(--ink)">${N?c.cn:c.c}</text></g>`;
      const fo=fixO(i);if(fo>0){const w=N?128:180,lab=N?c.an:c.a,ok=fixed(i);
        s+=`<g style="opacity:${f1(fo)}"><rect x="${x-w/2}" y="${y+46}" width="${w}" height="22" rx="11" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.4"/><text x="${x+(ok>0?7:0)}" y="${y+61}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700">${lab}</text>`;
        if(ok>0)s+=`<path d="M${x-w/2+8} ${y+57} l4 4 l7 -8" style="fill:none;stroke:var(--good);stroke-width:2.2;stroke-linecap:round;opacity:${f1(ok)}"/>`;
        s+='</g>'}});
    /* the person and the behaviour */
    const agit=clamp(1-ramp(t,.74,.86)*.9),calm=ramp(t,.78,.9),shake=agit*Math.sin(t*160)*2.2*(t<.2?1:.4);
    s+=person(L.cx+shake,L.cy,agit,calm);let burstTxt='';
    if(agit>.15){const o=f1(agit);for(let k=0;k<5;k++){const a=-Math.PI*.15-k*Math.PI*.17,r1=24,r2=36;
      s+=`<path d="M${f1(L.cx-6+Math.cos(a)*r1)} ${f1(L.cy-42+Math.sin(a)*r1)} L${f1(L.cx-6+Math.cos(a)*r2)} ${f1(L.cy-42+Math.sin(a)*r2)}" style="stroke:var(--rose);stroke-width:2.4;stroke-linecap:round;opacity:${o}"/>`}
      burstTxt=`<text x="${L.cx}" y="${f1(Math.max(N?80:72,L.cy+(L.burst.y-L.cy)*z))}" class="t-sm t-mid" style="fill:var(--rose);opacity:${o}">${N?'calls out, pushes away':'calls out, pushes away at bath time'}</text>`}
    s+='</g></g>'+burstTxt;
    /* evaluate note in the middle */
    const ev=ramp(t,.8,.86);
    if(ev>0&&ph<4)s+=`<text x="${L.cx}" y="${L.ev.y}" class="t-sm t-mid" style="fill:var(--good);opacity:${f1(ev)}">${N?'calmer? keep the plan':'calmer? keep what worked'}</text>`;
    /* evidence banner */
    const bo=ramp(t,.87,.92);
    if(bo>0){const w=N?372:520,h=N?40:26,x=(N?200:360)-w/2,y=L.bn.y-(N?28:18);
      s+=`<g style="opacity:${f1(bo)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      if(N)s+=`<text x="200" y="${y+16}" class="t-sm t-mid" style="fill:var(--warn)">No large trial has tested DICE itself.</text><text x="200" y="${y+31}" class="t-xs t-mid" style="fill:var(--warn)">Evidence: expert consensus, one small study.</text>`;
      else s+=`<text x="360" y="${y+17}" class="t-sm t-mid" style="fill:var(--warn)">No large trial has tested DICE itself: expert consensus, one small study.</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    setSt(ph);$('#bpNote').innerHTML=noteHTML(BP_STEPS[ph]);
  }
  const stop=playWire(rg,$('#bpPlay'),draw,16000,'Replay','bpsd');
  const setSt=stepWire($('#bpSteps'),BP_STEPS,rg,draw,stop);

  /* ---------- 2. antipsychotic risk in 1,000 people ---------- */
  const rs=$('#bpRisk'),rr=$('#bpRkT');
  const ord=(seed)=>{const R=rng(seed),a=Array.from({length:1000},(_,i)=>i);for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const OP=ord(17),OD=ord(17);/* same order: the first 26 are shared, the next 19 are extra */
  const NNH=[ ['Haloperidol',26],['Risperidone',27],['Olanzapine',40],['Quetiapine',50]];
  const CAT=[ ['Olanzapine',32,24],['Quetiapine',26,16],['Risperidone',29,18],['Placebo',21,5]];
  function drawRisk(t){
    const N=vb(rs,'720 470','400 800');
    const L=N?{g:[{x:28,y:62},{x:28,y:332}],sp:8.6,lo:{y:596},w:344}:{g:[{x:24,y:62},{x:376,y:62}],sp:8,lo:{y:300},w:320};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const kP=Math.round(26*ramp(t,.03,.15)),kD=Math.round(45*ramp(t,.21,.33)),diff=ramp(t,.4,.48);
    const wk=Math.round(10*Math.max(ramp(t,.03,.15),ramp(t,.21,.33)));
    [[OP,kP,'PLACEBO',26,'var(--muted)'],[OD,kD,'ANTIPSYCHOTIC',45,'var(--rose)']].forEach(([O,k,name,tot,col],gi)=>{const G=L.g[gi];
      const dead=new Set(O.slice(0,k)),extra=new Set(O.slice(26,45));
      s+=`<text x="${G.x}" y="${G.y-26}" class="t-sm">${name}, 1,000 PEOPLE</text>`;
      s+=`<text x="${G.x+L.w}" y="${G.y-26}" class="t-lbl t-end" style="fill:${k?col:'var(--muted)'}">${k} died</text>`;
      if(gi===0||t>.2)s+=`<text x="${G.x+L.w}" y="${G.y-12}" class="t-xs t-end">week ${gi===0?Math.round(10*ramp(t,.03,.15)):Math.round(10*ramp(t,.21,.33))} of about 10</text>`;
      let dots='',big='';
      for(let i=0;i<1000;i++){const x=G.x+(i%40)*L.sp+L.sp/2,y=G.y+Math.floor(i/40)*L.sp+L.sp/2;
        if(dead.has(i)){const ex=gi===1&&extra.has(i)&&diff>0;
          big+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${col}"/>`;
          if(ex)big+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(5.6)}" style="fill:none;stroke:var(--ink);stroke-width:1.3;opacity:${f1(diff)}"/>`}
        else dots+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.5" style="fill:var(--cell-line);opacity:.55"/>`}
      s+=dots+big;
      if(gi===1&&diff>0)s+=`<text x="${G.x}" y="${G.y+25*L.sp+16}" class="t-sm" style="fill:var(--ink);opacity:${f1(diff)}">○ ringed: about 19 extra deaths per 1,000</text>`});
    /* lower area: NNH then CATIE-AD */
    const lo=L.lo.y,bx0=N?130:170,bx1=N?372:560;
    if(t>=.4&&t<.58){const o=ramp(t,.42,.48),sc=v=>(bx1-bx0)*v/5;
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'DEATHS OVER ABOUT 10 WEEKS (%)':'DEATHS OVER ABOUT 10 WEEKS, LABEL CLASS FIGURES (%)'}</text>`;
      [ ['Placebo',2.6,'var(--muted)'],['Antipsychotic',4.5,'var(--rose)']].forEach(([n,v,col],i)=>{const y=lo+22+i*34;
        s+=`<text x="${bx0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${bx0}" y="${y}" width="${f1(sc(v))}" height="20" rx="4" style="fill:${col}"/><text x="${f1(bx0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      s+=`<path d="M${f1(bx0+sc(2.6))} ${lo+76} V${lo+86} H${f1(bx0+sc(4.5))} V${lo+76}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(bx0+sc(3.55))}" y="${lo+102}" class="t-xs t-mid" style="fill:var(--ink)">1.9 percentage points: about 19 per 1,000</text></g>`}
    if(t>=.58&&t<.8){const o=ramp(t,.58,.64);
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'ONE EXTRA DEATH PER N TREATED, 180 DAYS':'US VETERANS: PEOPLE TREATED FOR 180 DAYS FOR ONE EXTRA DEATH (NNH)'}</text>`;
      NNH.forEach(([n,v],i)=>{const p=ease(ramp(t,.6+i*.03,.68+i*.03)),y=lo+22+i*(N?30:28),cnt=Math.round(v*p);
        s+=`<text x="${bx0-10}" y="${y+12}" class="t-lbl t-end">${n}</text>`;
        const cell=(bx1-bx0)/50;for(let j=0;j<cnt;j++){const fx=bx0+j*cell;s+=`<rect x="${f1(fx+.6)}" y="${y+2}" width="${f1(cell-1.2)}" height="12" rx="1.5" style="fill:${j===cnt-1&&p>.98?'var(--rose)':'var(--panel-2)'};stroke:var(--line);stroke-width:.6"/>`}
        if(p>.98)s+=`<text x="${f1(bx0+v*cell+6)}" y="${y+12}" class="t-lbl" style="fill:var(--rose)">${v}</text>`});
      s+=`<text x="${N?28:24}" y="${lo+22+4*(N?30:28)+8}" class="t-xs">${N?'Each block is one person; fewer = more harm.':'Each block is one person treated; the last one marks one extra death. Fewer blocks = more harm.'}</text></g>`}
    if(t>=.8){const o=ramp(t,.8,.86);const cx0=N?130:170,cx1=N?372:560,sc=v=>(cx1-cx0)*v/40;
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'CATIE-AD: IMPROVED vs STOPPED (%)':'CATIE-AD, UP TO 36 WEEKS: GLOBALLY IMPROVED vs STOPPED FOR INTOLERABILITY (%)'}</text>`;
      s+=`<rect x="${N?28:24}" y="${lo+10}" width="12" height="8" style="fill:var(--sky)"/><text x="${N?44:40}" y="${lo+18}" class="t-xs">improved</text><rect x="${N?110:110}" y="${lo+10}" width="12" height="8" style="fill:var(--rose)"/><text x="${N?126:126}" y="${lo+18}" class="t-xs">stopped: side effects</text>`;
      CAT.forEach(([n,a,b],i)=>{const p=ease(ramp(t,.82+i*.025,.9+i*.025)),y=lo+30+i*(N?34:28);
        s+=`<text x="${cx0-10}" y="${y+14}" class="t-lbl t-end">${n}</text>`;
        s+=`<rect x="${cx0}" y="${y}" width="${f1(sc(a)*p)}" height="10" rx="3" style="fill:var(--sky)"/><rect x="${cx0}" y="${y+12}" width="${f1(sc(b)*p)}" height="10" rx="3" style="fill:var(--rose)"/>`;
        if(p>.9)s+=`<text x="${f1(cx0+sc(a)+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${a}</text><text x="${f1(cx0+sc(b)+5)}" y="${y+21}" class="t-xs" style="fill:var(--ink)">${b}</text>`});
      s+=`<text x="${N?28:24}" y="${lo+30+4*(N?34:28)+6}" class="t-xs">Improvement differences were not statistically significant.</text></g>`}
    rs.innerHTML=s;
    const p=phaseOf(BP_RK,t);setRk(p);$('#bpRkNote').innerHTML=noteHTML(BP_RK[p]);
  }
  const stopRk=playWire(rr,$('#bpRkPlay'),drawRisk,15000,'Replay','bpsd');
  const setRk=stepWire($('#bpRkSteps'),BP_RK,rr,drawRisk,stopRk);

  /* ---------- 3. other options ---------- */
  const os=$('#bpOpt'),or=$('#bpOptT');let opt=0;
  function drawOpt(t){
    const N=vb(os,'720 340','400 '+[470,470,400,410][opt]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const X0=N?20:24;
    if(opt===0){/* CMAI from about 80 */
      const ax0=N?120:200,ax1=N?380:640,sc=v=>ax0+(ax1-ax0)*(v-40)/50;/* axis 40..90 */
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'CMAI AGITATION SCORE, 12 WEEKS':'CMAI AGITATION SCORE, LOWER IS CALMER: 12-WEEK PIVOTAL TRIAL'}</text>`;
      [40,50,60,70,80,90].forEach(v=>{s+=`<path d="M${f1(sc(v))} 44 V${N?236:200}" class="grid"/><text x="${f1(sc(v))}" y="${N?252:216}" class="t-xs t-mid">${v}</text>`});
      const rows=[ ['Start (about)',80,80,'var(--muted)'],['Placebo',80,80-17.3,'var(--muted)'],['Brexpiprazole',80,80-22.6,'var(--sky)']];
      rows.forEach(([n,a,b,col],i)=>{const p=ease(ramp(t,.1+i*.15,.4+i*.15)),y=(N?66:62)+i*(N?56:44),e=lerp(a,b,i?p:1);
        s+=`<text x="${ax0-10}" y="${y+14}" class="t-lbl t-end">${n}</text>`;
        s+=`<rect x="${f1(sc(40))}" y="${y}" width="${f1(sc(e)-sc(40))}" height="20" rx="4" style="fill:${col};opacity:${i?.9:.35}"/>`;
        if(i&&p>.2)s+=`<path d="M${f1(sc(e))} ${y+10} H${f1(sc(80))}" style="stroke:${col};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        if(i&&p>.9)s+=`<text x="${f1(sc(80)+6)}" y="${y+14}" class="t-lbl" style="fill:${col}">−${i===1?'17.3':'22.6'}</text>`});
      const g=ramp(t,.75,.85);if(g>0){const y=N?286:246;
        s+=`<g style="opacity:${f1(g)}"><path d="M${f1(sc(57.4))} ${y} V${y+10} H${f1(sc(62.7))} V${y}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(sc(60))}" y="${y+26}" class="t-lbl t-mid">difference 5.32 points</text><text x="${f1(sc(60))}" y="${y+42}" class="t-xs t-mid">${N?'95% CI 1.87 to 8.77 · d 0.35':'95% CI 1.87 to 8.77 · Cohen\'s d 0.35'}</text></g>`}
      const b=ramp(t,.88,.95);if(b>0)s+=`<text x="${X0}" y="${N?396:318}" class="t-xs" style="opacity:${f1(b)}">${N?'Approved 11 May 2023 · boxed warning kept':'FDA approval 11 May 2023 · class mortality boxed warning kept · not for as-needed use'}</text>${N?`<text x="${X0}" y="412" class="t-xs" style="opacity:${f1(b)}">Label: not for as-needed use</text>`:''}`;
    }else if(opt===1){
      const ax0=N?120:220,ax1=N?370:600,sc=v=>(ax1-ax0)*v/50;
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'CitAD: IMPROVED MODERATELY OR MARKEDLY':'CitAD: PEOPLE MODERATELY OR MARKEDLY IMPROVED (CGIC), 9 WEEKS'}</text>`;
      [ ['Placebo',26,'var(--muted)'],['Citalopram',40,'var(--sky)']].forEach(([n,v,col],i)=>{const p=ease(ramp(t,.05+i*.15,.35+i*.15)),y=50+i*40;
        s+=`<text x="${ax0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${ax0}" y="${y}" width="${f1(sc(v)*p)}" height="20" rx="4" style="fill:${col}"/>`;
        if(p>.9)s+=`<text x="${f1(ax0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      const c=ramp(t,.45,.6);if(c>0){const ty=N?150:146,tw=N?172:220,gap=N?16:20;
        [ ['MMSE −1.05','thinking slightly worse'],['QTc +18.1 ms','heart rhythm interval longer']].forEach(([a,b],i)=>{const x=X0+i*(tw+gap);
          s+=`<g style="opacity:${f1(c)}"><rect x="${x}" y="${ty}" width="${tw}" height="54" rx="10" style="fill:var(--bad-soft);stroke:var(--bad)"/><text x="${x+12}" y="${ty+23}" class="t-lbl" style="fill:var(--bad)">${a}</text><text x="${x+12}" y="${ty+41}" class="t-xs">${N&&i?'QT interval longer':b}</text></g>`})}
      const d=ramp(t,.65,.85);if(d>0){const y=N?262:242,gx0=X0,gx1=N?380:600,gs=v=>gx0+(gx1-gx0)*v/40;
        s+=`<g style="opacity:${f1(ramp(t,.65,.7))}"><text x="${X0}" y="${y-12}" class="t-sm">${N?'DOSE CAVEAT (mg/day)':'THE DOSE CAVEAT (mg/day, as published)'}</text><path d="M${gx0} ${y+10} H${gx1}" class="axis" style="fill:none"/>`;
        [0,10,20,30,40].forEach(v=>{s+=`<path d="M${f1(gs(v))} ${y+6} v8" class="axis"/>`;if(v!==20&&v!==30)s+=`<text x="${f1(gs(v))}" y="${y+30}" class="t-xs t-mid">${v}</text>`});
        s+=`<rect x="${gx0}" y="${y+4}" width="${f1(gs(20)-gx0)}" height="12" rx="3" style="fill:var(--good-soft);stroke:var(--good)"/>`;
        s+=`<path d="M${f1(gs(20))} ${y-2} V${y+18}" style="stroke:var(--good);stroke-width:2"/><text x="${f1(gs(20))}" y="${y+30}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">20</text><text x="${f1(gs(20))}" y="${y+44}" class="t-xs t-mid" style="fill:var(--good)">${N?'label max, over 60':'label maximum, over age 60'}</text>`;
        const tx=gs(lerp(0,30,ease(d)));s+=`<path d="M${f1(tx)} ${y-4} V${y+18}" style="stroke:var(--bad);stroke-width:2.4"/>`;
        if(d>.95)s+=`<text x="${f1(gs(30))}" y="${y+30}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">30</text><text x="${f1(gs(30))}" y="${y+44}" class="t-xs t-mid" style="fill:var(--bad)">CitAD dose</text>`;
        s+='</g>'}
    }else if(opt===2){
      const ax0=N?20:250,ax1=N?380:640,sc=v=>ax0+(ax1-ax0)*(v+20)/110;/* -20..90 minutes */
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'EXTRA NIGHT-TIME SLEEP vs PLACEBO (min)':'EXTRA TOTAL NIGHT-TIME SLEEP vs PLACEBO, MINUTES (95% CI)'}</text>`;
      const rows=[ ['Melatonin','Cochrane, low certainty',10.68,-16.22,37.59],['Trazodone','one trial, 30 people',42.46,.9,84],['Suvorexant','4 weeks, 285 people',28,11,45]];
      const rh=N?78:56,y0=N?66:60;
      [-20,0,30,60,90].forEach(v=>{s+=`<text x="${f1(sc(v))}" y="${y0+3*rh+(N?0:4)}" class="t-xs t-mid">${v}</text>`});
      s+=`<path d="M${f1(sc(0))} ${y0-10} V${y0+3*rh-14}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(sc(0)+4)}" y="${y0-14}" class="t-xs">no extra sleep</text>`;
      rows.forEach(([n,m,e,lo,hi],i)=>{const p=ease(ramp(t,.08+i*.2,.3+i*.2)),y=y0+i*rh+(N?30:16);
        if(N)s+=`<text x="${X0}" y="${y-30}" class="t-lbl">${n}</text><text x="${X0+(n.length*8)+8}" y="${y-30}" class="t-xs">${m}</text>`;
        else s+=`<text x="${ax0-14}" y="${y-2}" class="t-lbl t-end">${n}</text><text x="${ax0-14}" y="${y+12}" class="t-xs t-end">${m}</text>`;
        s+=`<path d="M${ax0} ${y} H${ax1}" class="grid"/>`;
        if(p>0){s+=`<path d="M${f1(sc(lerp(0,lo,p)))} ${y} H${f1(sc(lerp(0,hi,p)))}" style="stroke:var(--sky);stroke-width:2.4"/><circle cx="${f1(sc(lerp(0,e,p)))}" cy="${y}" r="6" style="fill:var(--sky)"/>`;
          if(p>.9)s+=`<text x="${f1(sc(e))}" y="${y-10}" class="t-xs t-mid" style="fill:var(--ink)">+${e}</text>`}});
      const b=ramp(t,.72,.85);if(b>0){const y=N?y0+3*rh+22:y0+3*rh+24;const w=N?360:592;
        s+=`<g style="opacity:${f1(b)}"><rect x="${X0}" y="${y}" width="${w}" height="${N?52:40}" rx="10" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${X0+12}" y="${y+17}" class="t-lbl" style="fill:var(--warn)">Benzodiazepines and Z-drugs</text><text x="${X0+12}" y="${y+33}" class="t-xs">${N?'no trials in dementia; Beers 2023: avoid':'No randomised trials in dementia with sleep problems. Beers 2023: avoid in dementia.'}</text>${N?`<text x="${X0+12}" y="${y+46}" class="t-xs">(falls, fractures, delirium)</text>`:''}</g>`}
    }else{
      const ax0=N?120:200,ax1=N?370:470,sc=v=>(ax1-ax0)*v/40;
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'HARMONY: PSYCHOSIS RELAPSED (%)':'HARMONY WITHDRAWAL TRIAL: PSYCHOSIS RELAPSED (%)'}</text>`;
      [ ['Placebo',28,'var(--muted)'],['Pimavanserin',13,'var(--sky)']].forEach(([n,v,col],i)=>{const p=ease(ramp(t,.05+i*.12,.3+i*.12)),y=46+i*36;
        s+=`<text x="${ax0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${ax0}" y="${y}" width="${f1(sc(v)*p)}" height="20" rx="4" style="fill:${col}"/>`;
        if(p>.9)s+=`<text x="${f1(ax0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      if(!N&&t>.35)s+=`<text x="${ax1+20}" y="70" class="t-xs" style="opacity:${f1(ramp(t,.35,.45))}">HR 0.35; stopped early for efficacy</text>`;
      if(N&&t>.35)s+=`<text x="${X0}" y="134" class="t-xs" style="opacity:${f1(ramp(t,.35,.45))}">HR 0.35; stopped early for efficacy</text>`;
      /* regulatory timeline */
      const ev=[ ['2021','HARMONY published'],['Apr 2021','FDA declines'],['Aug 2022','FDA declines again'],['Jun 2026','label: PD psychosis only']];
      if(N){const x=40,y0=170;s+=`<path d="M${x} ${y0} V${y0+3*68}" class="axis"/>`;
        ev.forEach(([d,l],i)=>{const o=ramp(t,.45+i*.12,.52+i*.12),y=y0+i*68;s+=`<g style="opacity:${f1(o)}"><circle cx="${x}" cy="${y}" r="7" style="fill:${i===0?'var(--sky)':'var(--panel)'};stroke:${i===0?'var(--sky)':'var(--bad)'};stroke-width:2"/><text x="${x+18}" y="${y-2}" class="t-lbl">${d}</text><text x="${x+18}" y="${y+14}" class="t-xs">${l}</text></g>`})}
      else{const y=210,x0=90,x1=620;s+=`<path d="M${x0} ${y} H${x1}" class="axis"/>`;
        ev.forEach(([d,l],i)=>{const o=ramp(t,.45+i*.12,.52+i*.12),x=x0+i*(x1-x0)/3;s+=`<g style="opacity:${f1(o)}"><circle cx="${x}" cy="${y}" r="7" style="fill:${i===0?'var(--sky)':'var(--panel)'};stroke:${i===0?'var(--sky)':'var(--bad)'};stroke-width:2"/><text x="${x}" y="${y-16}" class="t-lbl t-mid">${d}</text><text x="${x}" y="${y+26}" class="t-xs t-mid">${l}</text></g>`})}
    }
    os.innerHTML=s;
    $('#bpOptNote').innerHTML=noteHTML(BP_OPT[opt]);
    $('#bpOptCap').textContent=['CMAI: Cohen-Mansfield Agitation Inventory, 29 items. Bars show the average score falling from a baseline of about 80.','CGIC: clinician global impression of change. Everyone in CitAD also received a psychosocial intervention.','Dots are estimates; lines are 95% confidence intervals. Results come from small, short trials.','Withdrawal design: people who responded first were then randomised to stay on the drug or switch to placebo.'][opt];
    or.setAttribute('aria-valuetext',BP_OPT[opt].k+', '+Math.round(t*100)+'% revealed');
  }
  const stopOpt=playWire(or,$('#bpOptPlay'),drawOpt,8000,'Replay','bpsd');
  $$('[data-bpo]').forEach(b=>b.addEventListener('click',()=>{opt=+b.dataset.bpo;$$('[data-bpo]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopOpt();or.value=0;drawOpt(0);$('#bpOptPlay').click()}));

  $('#bpCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Anticholinergic burden</h4><p>Many common medicines block acetylcholine: older antihistamines such as diphenhydramine and hydroxyzine, bladder antimuscarinics, tricyclic antidepressants and some antipsychotics. In a UK cohort of 13,004 people over 65, 47% used a possible anticholinergic; definite use was linked to 0.33 more MMSE points lost over 2 years and higher 2-year mortality (OR 1.68). [[AGS2023,Fox2011]]</p></div>
   <div class="card"><span class="ev early">Observational</span><h4>Linked to later dementia</h4><p>Heavy 10-year use was linked to incident dementia (HR 1.54) with a dose-response trend. In 58,769 cases, the highest exposure carried an OR of 1.49, driven by bladder antimuscarinics (1.65), antipsychotics (1.70) and anticholinergic antidepressants (1.29). Confounding and reverse causation cannot be fully excluded, though lag windows were used. [[Gray2015,Coupland2019]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>A drug that cancels another</h4><p>An anticholinergic pharmacologically opposes a cholinesterase inhibitor. People started on an inhibitor were more likely to be prescribed an anticholinergic bladder drug next (4.5% vs 3.1%; adjusted HR 1.55), a documented prescribing cascade. [[Gill2005]] See <a href="#synapse" data-go="synapse">the synapse</a>.</p></div>
   <div class="card"><span class="ev est">Guideline</span><h4>The 2023 Beers Criteria</h4><ul><li>Avoid strongly anticholinergic drugs in dementia, cognitive impairment or delirium, and avoid combining two or more.</li><li>Avoid antipsychotics except for approved indications; in dementia avoid chronic or as-needed use (stroke, faster decline, death).</li><li>Avoid benzodiazepines and Z-drugs in dementia.</li><li>Avoid cholinesterase inhibitors when fainting may be due to a slow heart rate.</li></ul><p>[[AGS2023]]</p></div>
   <div class="card"><span class="ev est">Cochrane</span><h4>Memantine is not an agitation drug</h4><p>In the 2019 Cochrane review, memantine was not effective as a treatment for agitation (CMAI +0.50, 95% CI −3.71 to 4.71). [[McShane2019]]</p></div>
   <div class="card"><h4>The short version</h4><div class="pt"><b>In plain words</b>Changes in behaviour are common and usually have a reason. Published guidance looks for that reason first. The medicines studied help a little at best, and several carry serious risks; the Beers Criteria list some of them as medicines to avoid in dementia.</div><div class="hook"><b>Exam hook</b>Beers 2023: avoid anticholinergics, benzodiazepines/Z-drugs and routine antipsychotics in dementia.</div></div>`;
  draw(+rg.value);drawRisk(+rr.value);drawOpt(+or.value);
};
