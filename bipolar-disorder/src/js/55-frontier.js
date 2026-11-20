/* ================= 5.5 RESEARCH TOWARD BETTER TREATMENT ================= */
const FR_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const FR_STAGE=['Idea','Lab','Early trials','Large trials','Guidelines'],FR_STAGE_N=['Idea','Lab','Early','Large','Guideline'];
/* pos: 0 idea … 4 guidelines; st: go = moving, mix = mixed results, neg = stalled after negative larger trials */
const FR_P=[
 {n:'Gene-based targets',s:'64, then 298 loci; no drug trial yet',pos:1,ev:'hyp',st:'go'},
 {n:'Lithium-response prediction',s:'one locus; small check in 73 people',pos:1.6,ev:'early',st:'go'},
 {n:'Phone monitoring',s:'accurate, not yet shown to help',pos:2.1,ev:'early',st:'mix'},
 {n:'Ketamine & esketamine',s:'fast but short-lived; small trials',pos:2.4,ev:'early',st:'go'},
 {n:'Anti-inflammatory add-ons',s:'larger trials negative',pos:3,ev:'early',st:'neg'},
 {n:'Chronotherapy & light',s:'task force: light likely helps',pos:2.75,ev:'early',st:'go'},
 {n:'Newer antipsychotics, maintenance',s:'relapse trial negative',pos:3,ev:'early',st:'neg',ghost:{pos:4,txt:'lumateperone: depression label'}}
];
const FR_STEPS=[
 {k:'Programme 1 · genes to drugs',t:'Gene-based targets',
  txt:`${FR_EV.est} A GWAS of 41,917 people with bipolar disorder and 371,549 controls found 64 loci, with risk genes enriched in synaptic signalling. [[Mullins2021]] A 2025 multi-ancestry study raised the count to 298 loci. [[OConnell2025]] ${FR_EV.hyp} The 2021 signal was enriched in genes targeted by antipsychotics, calcium-channel blockers and antiepileptics, and it named druggable genes such as HTR6, MCHR1, DCLK3 and FURIN as possible new leads. [[Mullins2021]] Calcium-channel genes such as CACNA1C renewed interest in calcium-channel blockers as treatments. [[Stahl2019]] None of these leads has reached a bipolar trial in our sources.`,
  hook:`GWAS loci for bipolar disorder: 64 (Mullins 2021), then 298 (O'Connell 2025). [[Mullins2021,OConnell2025]]`},
 {k:'Programme 2 · who will respond?',t:'Predicting lithium response',
  txt:`${FR_EV.early} ConLiGen's GWAS of lithium response in 2,563 patients found one locus on chromosome 21. In an independent sample of 73 people on lithium alone, carriers of the other alleles relapsed more (HR 3.8, 95% CI 1.1–13.0). [[Hou2016Lithium]] A higher schizophrenia polygenic score went with poorer lithium response in 2,586 patients. [[Amare2018]] ${FR_EV.early} Nerve cells grown from patients' stem cells were hyperexcitable, and lithium reversed this only in cells from people who had responded to it clinically. [[Mertens2015]] Neurons from non-responders had weakened daily rhythms that lithium did not lengthen. [[Mishra2021]] Response also runs in families: 67% of relatives with bipolar disorder of lithium responders responded, against 35% of a comparison group. [[Grof2002]]`,
  pt:`No gene or cell test can yet tell in advance who will respond to lithium. [[Hou2016Lithium,Mertens2015]]`,
  hook:`Lithium response: a chromosome 21 locus (ConLiGen, Hou 2016) and responder-only rescue in stem-cell neurons (Mertens 2015). [[Hou2016Lithium,Mertens2015]]`},
 {k:'Programme 3 · digital phenotyping',t:'Phones as mood sensors',
  txt:`${FR_EV.early} In 28 outpatients, voice features from everyday phone calls classified manic or mixed states with an AUC of 0.89 and depressive states with 0.78. [[FaurholtJepsen2016]] A 2026 review of machine learning reported AUCs of 0.75–0.85 for predicting episodes 1–2 weeks ahead, and called for larger studies with external validation. [[Fang2026ML]] Of 57 studies of passive digital markers, 60% had 50 participants or fewer. [[Kutcher2026]] But in the MONARCA I trial (78 patients), daily smartphone self-monitoring with feedback did not reduce symptoms, [[FaurholtJepsen2015]] and in the 12-month BipoSense study passive sensing did not reliably detect emerging episodes, with too many false alarms for clinical use. [[Ludwig2025]]`,
  pt:`Phone apps can pick up patterns, but none has yet been shown to keep people well. In one study, people's own daily mood ratings did better than passive sensing. [[FaurholtJepsen2015,Ludwig2025]]`},
 {k:'Programme 4 · fast-acting treatment',t:'Ketamine and esketamine',
  txt:`${FR_EV.early} In 18 people with treatment-resistant bipolar depression on lithium or valproate, a single ketamine infusion (published dose 0.5 mg/kg) improved depression within 40 minutes; 71% responded at some point vs 6% on placebo, and the benefit lasted through day 3. [[Diazgranados2010]] A replication in 15 people found 79% vs 0%. [[Zarate2012]] A network meta-analysis gave IV ketamine the largest response ratio of any add-on, RR 12.49 (95% CI 3.06–50.93), wide because the trials were few and small. [[Bahji2021]] A 2026 umbrella review lists ketamine augmentation among effective treatments for adult bipolar depression. [[DePrisco2026]] ${FR_EV.hyp} An inhaled esketamine trial (88 participants) finished in 2021 with no results posted. [[NCT03965871]]`,
  pt:`Ketamine can lift depression within hours, but the effect fades within days, and longer-term and mood-switch safety in bipolar disorder still need larger trials. [[Diazgranados2010,Bahji2021]]`,
  hook:`Ketamine in bipolar depression: 71% vs 6% response, onset in 40 minutes, lasting about 3 days (Diazgranados 2010). [[Diazgranados2010]]`},
 {k:'Programme 5 · inflammation',t:'Anti-inflammatory add-ons',
  txt:`${FR_EV.early} A 2016 meta-analysis of 8 small trials (312 people; NSAIDs, omega-3, N-acetylcysteine, pioglitazone) found a moderate antidepressant effect, SMD −0.40, with no mood switches. [[Rosenblat2016]] Larger trials then disappointed: in 266 adults, neither minocycline nor celecoxib beat placebo, [[Husain2020,NCT02703363]] and in 250 people newly diagnosed, low-dose aspirin did not reduce mood instability. [[Bruun2026,NCT05035316]] N-acetylcysteine helped depression in one 24-week trial but not in a maintenance trial. [[Berk2008NAC,Berk2012NAC]] Status: not supported for routine use.`,
  pt:`Early small studies looked hopeful, but bigger trials did not confirm a benefit, so these are not routine treatments. [[Husain2020,Bruun2026]]`,
  hook:`Minocycline and celecoxib (Husain 2020) and low-dose aspirin (A-Bipolar, Bruun 2026): negative trials. [[Husain2020,Bruun2026]]`},
 {k:'Programme 6 · the body clock',t:'Chronotherapy and light',
  txt:`${FR_EV.early} In 60 inpatients with bipolar I depression, a week of repeated sleep deprivation plus light therapy (with antidepressants and lithium) brought response in 70% without and 44% with a history of drug resistance. [[Benedetti2005]] In 141 inpatients, 70% responded within a week and 55% still responded at a month. [[Benedetti2014]] Midday bright light gave 68.2% remission vs 22.2% with dim red light in 46 adults, [[Sit2018]] and a meta-analysis of 7 trials found SMD 0.43. [[Lam2020Light]] The 2025 ISBD task force judged bright light likely efficacious, with anti-manic cover. [[Geoffroy2025]] In mania, blue-blocking glasses cut YMRS scores by 14.1 points vs 1.7 in 23 people. [[Henriksen2016]] Shorter hospital stays across three decades come from one observational centre. [[Dallaspezia2026]]`,
  hook:`Bright light for bipolar depression: 68.2% vs 22.2% remission (Sit 2018). [[Sit2018]]`},
 {k:'Programme 7 · newer medicines',t:'Newer antipsychotics in maintenance',
  txt:`${FR_EV.est} For acute depression, lumateperone has reached the label: in a 6-week trial of 377 people it improved MADRS by 4.6 points more than placebo, [[Calabrese2021Lumateperone,NCT03249376]] and its label lists bipolar I or II depression in adults. [[FDA-Caplyta]] ${FR_EV.early} Maintenance is different. In a randomised-withdrawal trial of cariprazine in 901 people with bipolar I, time to relapse did not differ from placebo (HR 0.83 and 0.89; registry results). [[NCT03573297]] Maintenance is not a labelled indication for cariprazine. [[FDA-Vraylar]] ${FR_EV.hyp} A paediatric lumateperone trial for depression is recruiting, with primary completion estimated for 2031. [[NCT06372964]]`,
  pt:`A medicine that treats an episode does not automatically prevent the next one; that needs its own long trial. [[NCT03573297,FDA-Vraylar]]`,
  hook:`Cariprazine relapse-prevention trial (NCT03573297): negative for both doses. [[NCT03573297]]`}
].map((s,i)=>Object.assign(s,{from:i/7,at:i/7+.115}));
const FR_TR=[
 {id:'NCT03249376',n:'Lumateperone for bipolar depression',tg:'depression',ev:'est',r:'pos',rt:'Positive',
  who:'377 adults with bipolar I or II depression, 6 weeks',
  f:`MADRS change −16.70 vs −12.12 on placebo: a difference of −4.6 (95% CI −6.34 to −2.83). Now on the label. [[NCT03249376,Calabrese2021Lumateperone,FDA-Caplyta]]`},
 {id:'NCT03573297',n:'Cariprazine to prevent relapse',tg:'relapse',ev:'early',r:'neg',rt:'No difference',
  who:'901 enrolled with bipolar I; randomised withdrawal',
  f:`Time to first relapse: HR 0.83 (1.5 mg) and 0.89 (3.0 mg), both intervals crossing 1. Registry results; no journal paper found. [[NCT03573297]]`},
 {id:'NCT03965871',n:'Inhaled esketamine',tg:'depression',ev:'hyp',r:'none',rt:'No results posted',
  who:'88 participants with treatment-resistant bipolar depression; phase 2',
  f:`Completed in 2021; no results posted and no publication found. [[NCT03965871]]`},
 {id:'NCT02703363',n:'Minocycline and celecoxib',tg:'depression',ev:'early',r:'neg',rt:'No difference',
  who:'266 adults with bipolar depression, 12 weeks, Pakistan',
  f:`Neither beat placebo on HAMD-17: minocycline 1.48 (95% CI −0.41 to 3.36), celecoxib −0.74 (−2.61 to 1.14). [[Husain2020,NCT02703363]]`},
 {id:'NCT05035316',n:'Low-dose aspirin (A-Bipolar)',tg:'relapse',ev:'early',r:'neg',rt:'No difference',
  who:'250 people newly diagnosed with bipolar disorder',
  f:`Aspirin did not reduce mood instability at 6 months or any secondary outcome. [[Bruun2026,NCT05035316]]`},
 {id:'NCT06372964',n:'Lumateperone in children and teenagers',tg:'depression',ev:'hyp',r:'none',rt:'Recruiting',
  who:'Estimated 384 young people with bipolar I or II depression',
  f:`Primary outcome CDRS-R at week 6; primary completion estimated for 2031-10-31. [[NCT06372964]]`},
 {id:'NCT01166425',n:'Lithium for mania in children and teenagers',tg:'mania',ev:'early',r:'pos',rt:'Positive',
  who:'Ages 7–17: lithium 53, placebo 28; 8 weeks',
  f:`YMRS fell 5.51 points more than with placebo (95% CI 0.51–10.50); no significant weight gain, but TSH rose. [[Findling2015,NCT01166425]]`},
 {id:'NCT01928446',n:'Lithium after a suicide-related event',tg:'relapse',ev:'early',r:'neg',rt:'Stopped for futility',
  who:'519 veterans with depression or bipolar disorder',
  f:`No difference in repeat suicide-related events (HR 1.10, 0.77–1.55); mean lithium levels were low, about 0.5 mEq/L. [[Katz2022,NCT01928446]]`}
];
const FR_TG={relapse:'Relapse prevention',depression:'Depression',mania:'Mania',prediction:'Prediction'};

inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT');
  function chip(x,y,kind,anchor){const L={est:['Established','var(--good)','var(--good-soft)'],early:['Early evidence','var(--warn)','var(--warn-soft)'],hyp:['Hypothesis','var(--rx)','var(--rx-soft)']}[kind];
    const w=L[0].length*5.6+10,x0=anchor==='end'?x-w:anchor==='mid'?x-w/2:x;
    return `<rect x="${f1(x0)}" y="${f1(y-9)}" width="${f1(w)}" height="13" rx="3" style="fill:${L[2]}"/><text x="${f1(x0+5)}" y="${f1(y+1)}" style="font:600 8.5px var(--mono);fill:${L[1]};letter-spacing:.04em">${L[0].toUpperCase()}</text>`}
  const COL={go:'var(--brand)',mix:'var(--warn)',neg:'var(--bad)'};
  function draw(t){
    const N=vb(svg,'720 440','400 600'),ph=phaseOf(FR_STEPS,t),S=FR_STEPS[ph];
    const x0=N?40:268,x1=N?372:676,X=p=>lerp(x0,x1,p/4),top=N?26:40;
    const laneY=j=>N?top+40+j*72:top+42+j*50;
    let s='';
    /* stage bands and headers */
    for(let k=0;k<5;k++){const cx=X(k),bw=(x1-x0)/4;
      if(k%2===0)s+=`<rect x="${f1(cx-bw/2)}" y="${top+8}" width="${f1(bw)}" height="${f1(laneY(6)-top+(N?34:22))}" style="fill:var(--panel-2);opacity:.55"/>`;
      s+=`<text x="${f1(cx)}" y="${top}" class="t-sm t-mid" style="fill:var(--ink)">${(N?FR_STAGE_N:FR_STAGE)[k]}</text>`}
    FR_P.forEach((P,j)=>{
      const y=laneY(j),ty=N?y+26:y;
      const p=j<ph?1:j>ph?0:ease(ramp(t,S.from,S.from+.085)),pos=P.pos*p,cx=X(pos),focus=j===ph,arrived=p>.98;
      const op=j>ph?.45:1;
      if(focus)s+=`<rect x="${N?6:8}" y="${f1(N?y-16:y-19)}" width="${N?388:704}" height="${N?62:38}" rx="9" style="fill:var(--brand-soft);opacity:.55"/>`;
      s+=`<g style="opacity:${op}">`;
      /* label column */
      if(N){s+=`<text x="14" y="${y}" class="t-lbl">${j+1}. ${P.n}</text>`;
        if(arrived)s+=`<text x="14" y="${y+44}" class="t-xs">${P.s}</text>`}
      else{s+=`<text x="18" y="${y-2}" class="t-lbl">${j+1}. ${P.n}</text>`;
        if(arrived)s+=`<text x="18" y="${y+12}" class="t-xs">${P.s}</text>`}
      /* track */
      s+=`<line x1="${x0}" y1="${ty}" x2="${x1}" y2="${ty}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:2 4"/>`;
      for(let k=0;k<5;k++)s+=`<circle cx="${f1(X(k))}" cy="${ty}" r="2.5" style="fill:var(--line)"/>`;
      const col=arrived?COL[P.st]:'var(--brand)';
      s+=`<line x1="${x0}" y1="${ty}" x2="${f1(cx)}" y2="${ty}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/>`;
      if(P.ghost&&arrived){const gx=X(P.ghost.pos);
        s+=`<line x1="${f1(cx)}" y1="${ty}" x2="${f1(gx)}" y2="${ty}" style="stroke:var(--good);stroke-width:2;stroke-dasharray:4 3"/><circle cx="${f1(gx)}" cy="${ty}" r="6" style="fill:var(--good)"/>`;
        s+=`<text x="${f1(gx-(N?0:10))}" y="${N?ty-10:ty+16}" class="t-xs t-end" style="fill:var(--good)">${P.ghost.txt}</text>`}
      /* marker: a small programme card */
      if(arrived&&P.st==='neg'){s+=`<g transform="translate(${f1(cx)} ${ty})"><circle r="9" style="fill:var(--bad)"/><path d="M-4 -4L4 4M4 -4L-4 4" style="stroke:var(--panel);stroke-width:2.2;stroke-linecap:round"/></g>`}
      else s+=`<rect x="${f1(cx-9)}" y="${ty-9}" width="18" height="18" rx="5" style="fill:${col}"/><text x="${f1(cx)}" y="${ty+4}" class="t-mid" style="font:700 10px var(--mono);fill:var(--panel)">${j+1}</text>`;
      /* evidence chip */
      if(arrived){if(N)s+=chip(386,y,P.ev,'end');else s+=chip(cx+14,ty-12,P.ev,'')}
      s+=`</g>`});
    s+=`<text x="${N?14:18}" y="${N?laneY(6)+66:laneY(6)+44}" class="t-xs">${N?'✖ = stalled after negative larger trials':'✖ = stalled after negative larger trials · line colour: green moving, amber mixed, red stalled'}</text>`;
    if(N)s+=`<text x="14" y="${laneY(6)+80}" class="t-xs">line: green moving · amber mixed · red stalled</text>`;
    svg.innerHTML=s;setA(ph);$('#frNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#frPlay'),draw,21000,'Replay','frontier');
  const setA=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= trial filter ================= */
  let tg='all',ev='all';
  const lab={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
  function render(){
    const list=FR_TR.filter(T=>(tg==='all'||T.tg===tg)&&(ev==='all'||T.ev===ev));
    $('#frCount').textContent=`Showing ${list.length} of ${FR_TR.length} registered trials`;
    let h=list.map(T=>`<div class="card trial"><div class="row"><span class="ev ${T.ev}">${lab[T.ev]}</span><span class="res ${T.r}">${T.rt}</span></div><span class="tid">${T.id} · ${FR_TG[T.tg]}</span><h4>${T.n}</h4><dl><dt>Who</dt><dd>${T.who}</dd><dt>Found</dt><dd>${T.f}</dd></dl><a href="https://clinicaltrials.gov/study/${T.id}" target="_blank" rel="noopener">Registry record</a></div>`).join('');
    if(!list.length)h=tg==='prediction'
      ?`<div class="empty"><h4>No registered prediction trial in our sources</h4><p>None of the trials with a checked NCT number tests prediction. That work is still in cohorts and lab models: ConLiGen's lithium-response GWAS, phone-sensing studies such as BipoSense and stem-cell neurons. [[Hou2016Lithium,Ludwig2025,Mertens2015]] See the pipeline above, programmes 2 and 3.</p></div>`
      :`<div class="empty"><h4>No trials match both filters</h4><p>Try another evidence level, or choose All.</p></div>`;
    $('#frTrials').innerHTML=h;
  }
  $$('[data-frt]').forEach(b=>b.addEventListener('click',()=>{tg=b.dataset.frt;$$('[data-frt]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}));
  $$('[data-fre]').forEach(b=>b.addEventListener('click',()=>{ev=b.dataset.fre;$$('[data-fre]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}));
  render();
};
