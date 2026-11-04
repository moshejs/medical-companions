/* =============== 5.6 Research frontier: GLP-1, psilocybin and beyond =============== */
/* Pipeline board: each card sits at the highest stage its evidence has reached by the year on the
   slider. Event years are publication or registry dates from the research pass; card text is short,
   the cited detail is in the note panel. */
const FR_Y0=2013,FR_Y1=2026.9,frY=y=>(y-FR_Y0)/(FR_Y1-FR_Y0);
const FR_ST=['Lab & animal','Observational','Phase 2 RCTs','Phase 3','Approved for AUD'],FR_STN=['Lab','Obs.','Phase 2','Phase 3','Approved'];
const FR_IT=[
 {n:'GLP-1 receptor agonists',ev:'early',e:[
  {y:2022.7,st:2,c:'RCT n=127',m:'2022 exenatide RCT, n=127: heavy drinking days not reduced'},
  {y:2024.4,st:1,m:'2024 cohort of 83,825 with obesity: 50–56% fewer AUD diagnoses'},
  {y:2024.9,st:1,m:'2025 Sweden, 227,866 with AUD: semaglutide aHR 0.64'},
  {y:2025.1,st:2,c:'RCT n=48',m:'2025 semaglutide RCT, n=48, 9 weeks: less lab drinking'},
  {y:2026.25,st:2,c:'RCT n=108',m:'2026 RCT, n=108 with obesity: heavy drinking days −13.7 pts'},
  {y:2026.57,st:3,c:'ph 3 n≈622',m:'July 2026: VA phase 3 (n≈622) starts recruiting'}]},
 {n:'Psilocybin + therapy',ev:'early',e:[
  {y:2022.6,st:2,c:'RCT n=95',m:'2022 RCT, n=95: heavy drinking days 9.7% vs 23.6%'},
  {y:2026.2,st:2,c:'OLE n=59',m:'2026 open-label extension: the extra benefit faded after month 1'},
  {y:2026.45,st:2,c:'meta N=202',m:'2026 meta-analysis of 6 trials: evidence "mixed"'}]},
 {n:'Ketamine + therapy',ev:'early',e:[
  {y:2020,st:2,c:'pilot n=40',m:'2020 pilot RCT, n=40: more abstinence over 21 days'},
  {y:2022.05,st:2,c:'RCT n=96',m:'2022 KARE, n=96: +10.1% days abstinent at 6 months'}]},
 {n:'Deep TMS',ev:'early',e:[
  {y:2022.3,st:2,c:'RCT n=51',m:'2022 sham-controlled RCT, n=51: heavy drinking days 2.9% vs 10.6%'},
  {y:2025.4,st:2,c:'meta 20 RCTs',m:'2025 meta of 20 stimulation RCTs: small fall in craving'}]},
 {n:'Mifepristone',ev:'early',e:[
  {y:2015.5,st:0,c:'rats',m:'2015 dependent rats drank less'},
  {y:2015.65,st:2,c:'RCT n=56',m:'2015 RCT, n=56, 1 week: less craving and drinking'},
  {y:2023.5,st:2,c:'lab n=32',m:'2023 lab study, n=32: stress craving down, drinking unchanged'}]},
 {n:'OPRM1-guided naltrexone',ev:'hyp',stall:2015.3,e:[
  {y:2013,st:2,c:'secondary',m:'2008 COMBINE secondary analysis: an Asp40 signal'},
  {y:2015.3,st:2,c:'RCT n=221 ✕',m:'2015 genotype-stratified RCT, n=221: no interaction'},
  {y:2020.4,st:2,c:'meta 7 RCTs ✕',m:'2020 meta of 7 RCTs: not significant after correction'}]},
 {n:'Alcohol hepatitis drugs',ev:'early',e:[
  {y:2020.1,st:2,c:'open n=18',m:'2020 IL-22 agonist F-652, open-label, n=18 (no control)'},
  {y:2023.7,st:2,c:'ph 2b n=307',m:'2023 larsucosterol phase 2b, n=307: completed, no results posted'},
  {y:2026.08,st:3,c:'ph 3 n≈350',m:'Jan 2026: larsucosterol phase 3 recruiting (n≈350)'}]}
];
const FR_STEPS=[
 {from:0,at:frY(2013.6),k:'2013 · the starting line',t:'How to read the board',
  txt:`Treatments move from lab and animal work, through observational studies and small randomised trials (phase 2), to large confirmatory trials (phase 3) and, only then, approval. In 2013 one idea was already on the board: in COMBINE, people with an OPRM1 Asp40 allele who received medical management had fewer heavy drinking days on naltrexone than on placebo (P = .04), a secondary analysis. <span class="ev hyp">Hypothesis</span> [[Anton2008OPRM1]] GLP-1 receptor agonists are not approved for AUD in the US. [[Klausen2026Lancet,Wang2024]]`,
  pt:`A treatment has to pass several kinds of study before it is shown to work. Being "under study" is not the same as working.`,
  hook:`Secondary (post hoc) analyses generate hypotheses; prospective trials test them.`},
 {from:frY(2015.2),at:frY(2015.8),k:'2015',t:'One signal fades, another appears',
  txt:`The prospective genotype-stratified RCT (n = 221, naltrexone 50 mg) found no genotype × treatment interaction (P = .32); the authors called using Asn40Asp as a biomarker "premature". A 2020 meta-analysis of seven RCTs found only a nominal effect on drinks per day that did not survive correction. <span class="ev hyp">Hypothesis; not supported</span> [[Oslin2015JAMAPsych,Hartwell2020]] The same year, mifepristone (a glucocorticoid receptor antagonist) reduced drinking in dependent rats and, at 600 mg daily for 1 week, reduced cued craving and drinking in 56 people. <span class="ev early">Early evidence</span> [[Vendruscolo2015]]`,
  pt:`An early clue that a gene test could pick who benefits from naltrexone did not hold up in a proper trial.`,
  hook:`OPRM1 Asn40Asp: post hoc signal (COMBINE), negative prospective RCT (Oslin 2015). Not ready for clinical use. [[Anton2008OPRM1,Oslin2015JAMAPsych]]`},
 {from:frY(2019.8),at:frY(2022.2),k:'2020–2022',t:'Ketamine, brain stimulation, a liver drug',
  txt:`A pilot RCT (n = 40) of one ketamine infusion during motivational enhancement therapy increased abstinence over 21 days compared with midazolam. In KARE (n = 96, severe AUD), three weekly ketamine infusions gave 10.1% more days abstinent at 6 months (95% CI 1.1–19.0), with no difference in relapse rate. [[Dakwar2020,Grabski2022]] Deep TMS to medial prefrontal and anterior cingulate cortex (n = 51) cut heavy drinking days to 2.9% vs 10.6% with sham. [[Harel2022]] For alcohol-associated hepatitis, the IL-22 agonist F-652 lowered MELD in an open-label study of 18 people with no control group. [[Arab2020]] <span class="ev early">Early evidence</span>`,
  pt:`Small trials of ketamine and magnetic brain stimulation showed some benefit. They need bigger trials before anyone can say they work.`,
  hook:`KARE: ketamine +10.1% days abstinent at 6 months but no difference in relapse rate. [[Grabski2022]]`},
 {from:frY(2022.5),at:frY(2023.8),k:'2022–2023',t:'Psilocybin, exenatide, larsucosterol',
  txt:`Psilocybin with psychotherapy vs active placebo (diphenhydramine), n = 95: heavy drinking days over 32 weeks were 9.7% vs 23.6% (mean difference 13.9%, 95% CI 3.0–24.7), with no serious adverse events on psilocybin. The trial excluded people with major psychiatric and drug use disorders, which limits how far it applies. [[Bogenschutz2022]] Exenatide (n = 127, 26 weeks) did <i>not</i> reduce heavy drinking days, though it reduced ventral-striatal cue reactivity. [[Klausen2022Exenatide]] Mifepristone reduced stress craving but not drinking in a lab study (N = 32). [[HaassKoffler2023]] Larsucosterol's phase 2b trial (n = 307) completed in 2023 with no results posted. [[NCT04563026]]`,
  pt:`One careful trial found people given psilocybin with therapy had fewer heavy drinking days. A similar-looking diabetes drug, exenatide, did not help in its trial.`,
  hook:`Bogenschutz 2022: heavy drinking days 9.7% vs 23.6% over 32 weeks; n = 95. [[Bogenschutz2022]]`},
 {from:frY(2024.2),at:frY(2025.3),k:'2024–2025',t:'GLP-1: the observational signal',
  txt:`In electronic records of 83,825 people with obesity, semaglutide was associated with a 50–56% lower risk of new and recurrent AUD diagnoses over 12 months, replicated in 598,803 people with type 2 diabetes. In a Swedish within-person cohort of 227,866 people with AUD, periods on semaglutide (aHR 0.64) and liraglutide (aHR 0.72) had fewer AUD hospitalisations. [[Wang2024,Lahteenvuo2025]] The first semaglutide RCT (n = 48, 9 weeks, low doses) reduced laboratory drinking and drinks per drinking day, but not drinking days. [[Hendershot2025Semaglutide]] Observational data cannot rule out confounding. <span class="ev early">Early evidence</span>`,
  pt:`People who happened to be prescribed these weight-loss and diabetes medicines had fewer alcohol problems on record. That is a clue, not proof.`,
  hook:`Cohort associations (aHR 0.64) generate the question; only RCTs answer it. [[Lahteenvuo2025]]`},
 {from:frY(2025.9),at:frY(2026.75),k:'2026',t:'A positive RCT, and phase 3 begins',
  txt:`Semaglutide 2.4 mg weekly for 26 weeks vs placebo (n = 108, moderate to severe AUD with obesity, plus CBT): heavy drinking days fell 41.1 vs 26.4 percentage points, a difference of −13.7 (95% CI −22.0 to −5.4), with more gastrointestinal side effects. [[Klausen2026Lancet]] Oral semaglutide (n = 50) missed its craving endpoint but reduced heavy drinking days. [[Schacht2026]] A VA phase 3 trial (estimated n = 622) started on 28 July 2026, and NIDA's phase 2 STAR trial (n = 63) is due to complete in 2027. [[NCT07218354,NCT06015893]] Psilocybin's benefit faded after an open-label dose, and a 2026 meta-analysis calls the evidence "mixed". [[Pagni2026,Florineth2026]] Larsucosterol entered phase 3 in January 2026. [[NCT07428538]]`,
  pt:`The best trial so far found semaglutide helped people with AUD and obesity drink heavily on fewer days. Bigger trials are now under way. None of these is approved for AUD yet.`,
  hook:`Klausen 2026: heavy drinking days −13.7 percentage points vs placebo, in people with obesity. Does it work without obesity? Unknown. [[Klausen2026Lancet]]`}
];
const FR_FLIP=[
 {h:`"Weight-loss jab halves alcohol problems"`,d:'Observational cohort (electronic health records)',n:'83,825 people with obesity',l:'12 months',ep:'New or recurrent AUD diagnoses in the records',r:'50–56% lower risk with semaglutide vs other anti-obesity medicines',cv:'Not randomised: people prescribed semaglutide may differ in other ways. Cannot show cause.',c:'[[Wang2024]]'},
 {h:`"Ozempic-type drug proven to treat alcohol use disorder"`,d:'Double-blind RCT',n:'108, all with obesity, plus CBT',l:'26 weeks',ep:'Heavy drinking days',r:'−41.1 vs −26.4 percentage points; difference −13.7',cv:'Only people with obesity; short; more gastrointestinal side effects. Phase 3 pending.',c:'[[Klausen2026Lancet,NCT07218354]]'},
 {h:`"Diabetes drug fails for alcohol"`,d:'Placebo-controlled RCT of exenatide (not semaglutide)',n:'127 treatment-seeking adults, plus CBT',l:'26 weeks',ep:'Heavy drinking days',r:'No reduction; less cue reactivity in the ventral striatum; exploratory benefit with BMI >30',cv:'One drug in the class. Oral semaglutide later missed a craving endpoint but cut heavy drinking days.',c:'[[Klausen2022Exenatide,Schacht2026]]'},
 {h:`"Psilocybin cures alcohol use disorder"`,d:'Double-blind RCT vs active placebo (diphenhydramine)',n:'95 adults aged 25–65',l:'32 weeks',ep:'Percentage of heavy drinking days',r:'9.7% vs 23.6% (difference 13.9%)',cv:'Excluded major psychiatric and drug use disorders; blinding is hard; later benefit faded and a meta-analysis calls the evidence "mixed". Nobody was "cured".',c:'[[Bogenschutz2022,Pagni2026,Florineth2026]]'},
 {h:`"Ketamine keeps people sober"`,d:'Phase 2 RCT (KARE), 2×2 with therapy or education',n:'96 with severe AUD',l:'6 months',ep:'Days abstinent; relapse',r:'10.1% more days abstinent (95% CI 1.1–19.0)',cv:'No difference in relapse rate. Infusions given in a research setting.',c:'[[Grabski2022]]'},
 {h:`"A gene test shows who naltrexone will help"`,d:'Secondary analysis (COMBINE), then a prospective RCT and a meta-analysis',n:'221 in the prospective RCT; 7 RCTs pooled',l:'Trial periods',ep:'Heavy drinking days by OPRM1 genotype',r:'Prospective RCT: no interaction (P = .32); meta-analysis: not significant after correction',cv:'The original signal was post hoc. The authors called the biomarker "premature".',c:'[[Anton2008OPRM1,Oslin2015JAMAPsych,Hartwell2020]]'}
];
inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT');let setSt=()=>{};
  const EVC={early:'var(--warn)',hyp:'var(--rx)',est:'var(--good)'},EVL={early:'Early evidence',hyp:'Hypothesis',est:'Established'};
  function draw(t){
    const N=vb(svg,'720 440','400 614'),yr=lerp(FR_Y0,FR_Y1,t);
    const L=N?{sx:i=>40+i*80,cw:74,ch:22,r0:66,rh:76,hy:50,ft:604}:{sx:i=>250+i*102.5,cw:96,ch:26,r0:64,rh:50,hy:48,ft:432};
    let s='';
    s+=`<text x="${N?12:16}" y="22" class="t-sm" style="fill:var(--brand)">${N?'PIPELINE · not recommendations':'TREATMENTS UNDER STUDY FOR AUD · not recommendations'}</text>`;
    s+=`<text x="${N?388:704}" y="${N?26:28}" class="t-big t-end" style="font-size:${N?22:26}px">${Math.floor(yr)}</text>`;
    /* column headers and the approved column */
    FR_ST.forEach((st,i)=>{const x=L.sx(i);s+=`<text x="${f1(x)}" y="${L.hy}" class="t-xs t-mid" style="fill:${i===4?'var(--good)':'var(--ink)'};font-weight:700">${N?FR_STN[i]:st}</text>`;
      if(i===4)s+=`<rect x="${f1(x-L.cw/2-2)}" y="${L.hy+6}" width="${L.cw+4}" height="${L.rh*FR_IT.length-4}" rx="8" style="fill:var(--good-soft);opacity:.5;stroke:var(--good);stroke-dasharray:3 4"/>`});
    const xa=L.sx(4);s+=`<text x="${f1(xa)}" y="${f1(L.hy+(N?11:22))}" class="t-xs t-mid" style="fill:var(--good)">none yet</text>`;
    let onBoard=0,latest=null;
    FR_IT.forEach((it,ri)=>{const y=L.r0+ri*L.rh,ty=N?y+30:y+18,past=it.e.filter(e=>e.y<=yr);
      s+=`<text x="${N?12:16}" y="${N?y+12:y+16}" class="t-lbl"${N?' style="font-size:12.5px"':''}>${it.n}</text>`;
      s+=`<text x="${N?316:16}" y="${N?y+12:y+31}" class="t-xs${N?' t-end':''}" style="fill:${EVC[it.ev]};font-weight:700">${EVL[it.ev]}${it.stall&&yr>=it.stall?(N?' ✕':' · not supported'):''}</text>`;
      s+=`<line x1="${f1(L.sx(0))}" x2="${f1(L.sx(4))}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:2"/>`;
      FR_ST.forEach((_,i)=>{const has=past.some(e=>e.st===i);s+=`<circle cx="${f1(L.sx(i))}" cy="${ty}" r="4" style="fill:${has?EVC[it.ev]:'var(--panel)'};stroke:${has?EVC[it.ev]:'var(--line)'};stroke-width:1.4"/>`});
      if(!past.length){s+=`<text x="${f1(L.sx(0))}" y="${N?y+62:y+44}" class="t-xs" style="opacity:.7">${N?'':''}not yet on the board in ${Math.floor(yr)}</text>`;return}
      onBoard++;
      /* stage reached, with a short slide when it changes */
      let st=-1,from=-1,when=0,lab='';past.forEach(e=>{if(e.c)lab=e.c;if(e.st>st){from=st;st=e.st;when=e.y}});
      const k=ease(clamp((yr-when)/.45)),x=from<0?L.sx(st):lerp(L.sx(from),L.sx(st),k),op=from<0?clamp((yr-when)/.3):1;
      const stalled=it.stall&&yr>=it.stall,col=EVC[it.ev];
      s+=`<g style="opacity:${f1(.25+.75*op)}"><rect x="${f1(x-L.cw/2)}" y="${f1(ty-L.ch/2)}" width="${L.cw}" height="${L.ch}" rx="7" style="fill:var(--panel);stroke:${stalled?'var(--bad)':col};stroke-width:1.8${stalled?';stroke-dasharray:4 3':''}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(ty+3.5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lab}</text></g>`;
      const last=past[past.length-1];if(!latest||last.y>latest.y)latest=Object.assign({n:it.n},last);
      const fresh=yr-last.y<1;
      s+=`<text x="${f1(N?12:L.sx(0)-L.cw/2)}" y="${N?y+62:y+44}" class="t-xs" style="fill:${fresh?'var(--ink)':'var(--muted)'}">${last.m}</text>`});
    s+=`<text x="${N?12:16}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">Card = highest stage reached. A later column is not a better result.</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(FR_STEPS,t);setSt(ph);
    $('#frRead').innerHTML=`<span>year <b>${yr.toFixed(1)}</b></span><span>on the board <b>${onBoard}/${FR_IT.length}</b></span><span>in phase 3 <b>${FR_IT.filter(it=>it.e.some(e=>e.y<=yr&&e.st===3)).length}</b></span><span>approved for AUD <b>0</b></span>${latest?`<span>latest: <b>${latest.n}</b></span>`:''}`;
    $('#frNote').innerHTML=noteHTML(FR_STEPS[ph]);
  }
  const stop=playWire(rg,$('#frPlay'),draw,26000,'%t:player.replay%','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- read the trial ---- */
  const fl=$('#frFlips');
  fl.innerHTML=FR_FLIP.map((c,i)=>`<div class="fr-flip" data-fr="${i}"><div class="fr-in">
    <div class="fr-face"><span class="kicker">Invented headline · card ${i+1}</span><p class="hl">${c.h}</p><p>What would you want to know before believing it?</p><button class="btn" data-frf="${i}" aria-pressed="false">Show what was measured</button></div>
    <div class="fr-face fr-back" aria-hidden="true"><span class="kicker">What the study measured</span><dl><dt>Design</dt><dd>${c.d}</dd><dt>n</dt><dd>${c.n}</dd><dt>Length</dt><dd>${c.l}</dd><dt>Endpoint</dt><dd>${c.ep}</dd><dt>Result</dt><dd>${c.r}</dd><dt>Caveat</dt><dd>${c.cv} ${c.c}</dd></dl><button class="btn" data-frb="${i}" aria-pressed="true" tabindex="-1">Back to the headline</button></div></div></div>`).join('');
  function flip(i,on){const w=$(`[data-fr="${i}"]`,fl);w.classList.toggle('on',on);const f=$$('.fr-face',w);f[0].setAttribute('aria-hidden',on);f[1].setAttribute('aria-hidden',!on);
    $(`[data-frf="${i}"]`,fl).setAttribute('aria-pressed',on);$(`[data-frf="${i}"]`,fl).tabIndex=on?-1:0;$(`[data-frb="${i}"]`,fl).tabIndex=on?0:-1}
  fl.addEventListener('click',e=>{const a=e.target.closest('[data-frf]'),b=e.target.closest('[data-frb]');if(a)flip(+a.dataset.frf,true);else if(b)flip(+b.dataset.frb,false)});

  /* ---- policy chart ---- */
  const ps=$('#frPol'),pr=$('#frPr');
  const EL=[['beer',-.46],['wine',-.69],['spirits',-.80],['heavy drinking',-.28]];
  function drawP(){const N=vb(ps,'720 330','400 600'),pc=Math.round(+pr.value*30);let s='';
    /* left: observed changes */
    const A=N?{x0:20,x1:380,y0:40}:{x0:20,x1:340,y0:40},sc=v=>A.x0+130+(A.x1-A.x0-140)*(-v/20);
    s+=`<text x="${A.x0}" y="24" class="t-sm" style="fill:var(--brand)">${N?'OBSERVED POLICY EFFECTS':'OBSERVED POLICY EFFECTS (% change)'}</text>`;
    const OB=[{l:'Scotland MUP:',l2:'deaths wholly due to alcohol',v:-13.4,ci:[-18.4,-8.3]},{l:'Scotland MUP:',l2:'hospitalisations',v:-4.1,ns:1},{l:'Yukon warning',l2:'labels: sales per capita',v:-6.31}];
    [0,-5,-10,-15,-20].forEach(v=>s+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${A.y0}" y2="${A.y0+OB.length*56}" class="${v?'grid':'axis'}"/><text x="${f1(sc(v))}" y="${A.y0+OB.length*56+14}" class="t-xs t-mid">${v}%</text>`);
    OB.forEach((o,i)=>{const y=A.y0+10+i*56;s+=`<text x="${A.x0}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${o.l}</text><text x="${A.x0}" y="${y+23}" class="t-xs">${o.l2}</text>`;
      s+=`<rect x="${f1(sc(o.v))}" y="${y+2}" width="${f1(sc(0)-sc(o.v))}" height="18" rx="4" style="fill:${o.ns?'var(--muted)':'var(--brand)'};opacity:${o.ns?.45:.8}"/>`;
      if(o.ci)s+=`<line x1="${f1(sc(o.ci[0]))}" x2="${f1(sc(o.ci[1]))}" y1="${y+11}" y2="${y+11}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${f1(sc(o.ci[0]))}" x2="${f1(sc(o.ci[0]))}" y1="${y+5}" y2="${y+17}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${f1(sc(o.ci[1]))}" x2="${f1(sc(o.ci[1]))}" y1="${y+5}" y2="${y+17}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      s+=`<text x="${f1(sc(0))}" y="${y+34}" class="t-xs" style="fill:var(--ink)">${o.v}%${o.ns?' (not significant)':o.ci?' (95% CI −18.4 to −8.3)':''}</text>`});
    /* right: elasticity arithmetic */
    const B=N?{x0:20,x1:380,y0:270}:{x0:390,x1:704,y0:40},bx=v=>B.x0+100+(B.x1-B.x0-110)*(-v/30);
    s+=`<text x="${B.x0}" y="${B.y0-16}" class="t-sm" style="fill:var(--accent)">${N?`IF PRICES ROSE ${pc}%: ARITHMETIC`:`IF PRICES ROSE ${pc}%: ELASTICITY ARITHMETIC`}</text>`;
    [0,-10,-20,-30].forEach(v=>s+=`<line x1="${f1(bx(v))}" x2="${f1(bx(v))}" y1="${B.y0}" y2="${B.y0+EL.length*44}" class="${v?'grid':'axis'}"/><text x="${f1(bx(v))}" y="${B.y0+EL.length*44+14}" class="t-xs t-mid">${v}%</text>`);
    EL.forEach(([n,e],i)=>{const y=B.y0+10+i*44,v=e*pc;s+=`<text x="${B.x0}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${n}</text><text x="${B.x0}" y="${y+25}" class="t-xs">elasticity ${e.toFixed(2)}</text>`;
      s+=`<rect x="${f1(bx(v))}" y="${y+2}" width="${f1(Math.max(1,bx(0)-bx(v)))}" height="16" rx="4" style="fill:var(--accent);opacity:.75"/><text x="${f1(bx(v)+5)}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${v.toFixed(1)}%</text>`});
    s+=`<text x="${B.x0}" y="${B.y0+EL.length*44+32}" class="t-xs" style="fill:var(--warn)">${N?'simple mean elasticities × price: not a forecast':'simple mean elasticity × price change: a sketch, not a forecast'}</text>`;
    ps.innerHTML=s;
    $('#frPolCap').innerHTML=`Left: Scotland's minimum unit price (£0.50 per unit, from 1 May 2018) compared with England, and alcohol sales during Yukon's warning-label study. Right: mean price elasticities from a meta-analysis of 1,003 estimates, multiplied by a ${pc}% price rise; real responses are not this simple. [[Wyper2023,Zhao2020Labels,Wagenaar2009]]`;
    $('#frPolNote').innerHTML=noteHTML({k:'Population policy',t:pc<8?'Price is a lever':'Bigger price rises, bigger cuts',txt:`Scotland's minimum unit pricing was associated with a 13.4% fall (95% CI −18.4 to −8.3) in deaths wholly attributable to alcohol and a non-significant 4.1% fall in such hospitalisations, driven by chronic conditions, especially alcohol-related liver disease, and largest in the four most deprived deciles. [[Wyper2023]] A synthesis of 40 evaluation reports found no strong evidence of population-level harm, but some qualitative evidence that financially vulnerable people with alcohol dependence fared worse. [[Patterson2023]] Raising excise taxes cost less than I$100 per healthy life year gained in a global model. [[Chisholm2018]]`,
      pt:`When alcohol costs more, people drink less, and fewer die of alcohol-related illness. People with dependence may need extra support when prices rise.`,
      hook:`Scotland MUP: deaths wholly attributable to alcohol −13.4%. Mean price elasticity: beer −0.46, wine −0.69, spirits −0.80. [[Wyper2023,Wagenaar2009]]`});
  }
  pr.addEventListener('input',drawP);drawP();
  const prv=redraws.frontier;redraws.frontier=()=>{prv&&prv();drawP()};
};
