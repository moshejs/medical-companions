/* =============== 5.4 Research frontiers =============== */
/* Board columns (stops): 0 phase 1 / early studies, 1 phase 2 / pilot RCT, 2 phase 3 / large RCTs, 3 FDA authorised or in the label.
   Each piece: g = step group, to = final stop, kind drug|dev|tool, chip = text on the piece. */
const RS_COLS=[['Phase 1','early studies'],['Phase 2','pilot RCTs'],['Phase 3','large RCTs'],['FDA authorised','or in the label']];
const RS_ITEMS=[
 {id:'cen',n:'Centanafadine',g:0,to:3,kind:'drug',chip:'FDA approved 2026',ev:'est',
  what:`A norepinephrine, dopamine and serotonin reuptake inhibitor. In two adult phase 3 trials it lowered the AISRS score more than placebo at day 42 (by 2.74 to 4.47 points; effect sizes −0.24 to −0.40, small). [[Adler2022]] In adolescents, 328.8 mg beat placebo at week 6 (−18.50 v −14.15) while 164.4 mg did not. [[Ward2026Adolesc]] Approved by the FDA as Simtriyo, status date 24 July 2026. [[FDA-Simtriyo]]`,
  nct:'NCT03605680, NCT03605836 (adults); NCT05257265 (adolescents); NCT05428033 (children 6–12, completed 2025) [[NCT03605680,NCT03605836,NCT05257265,NCT05428033]]',
  open:`A review of 90 phase 2/3 adult trials found no pipeline candidate matching stimulants or atomoxetine for efficacy with better tolerability; centanafadine was the only one with replicated efficacy. [[Veronesi2024]] In a 52-week open-label study, 12.3% stopped because of adverse events. [[Mattingly2025]]`},
 {id:'sol',n:'Solriamfetol',g:0,to:2,kind:'drug',chip:'phase 3 running',ev:'early',
  what:`A wake-promoting agent. In a 6-week pilot RCT in 60 adults, 45% met the response definition versus 6.9% on placebo (AISRS effect size 1.09), with no significant change in mean heart rate or blood pressure. [[Surman2023]]`,
  nct:'NCT04839562 (pilot); FOCUS NCT05972044 (516 enrolled, completed, no posted results); FOCUS-2 NCT07717879 (recruiting from July 2026) [[NCT04839562,NCT05972044,NCT07717879]]',
  open:`Will the large effect in a 60-person pilot hold up in phase 3? The FOCUS results are not yet posted. [[NCT05972044]]`},
 {id:'maz',n:'Mazindol CR',g:0,to:1,kind:'drug',chip:'phase 2 result',ev:'early',
  what:`Controlled-release mazindol in a phase 2 adult trial (85 people, 6 weeks) reduced ADHD-RS-DSM5 by 13.2 points more than placebo (effect size 1.09); 42.9% versus 11.9% had at least a 50% reduction. [[Wigal2018Mazindol]]`,
  nct:'NCT02808104 [[NCT02808104]]',
  open:`A single small phase 2 trial; no phase 3 result is reported in this guide's research.`},
 {id:'end',n:'EndeavorRx (AKL-T01)',g:1,to:3,kind:'dev',chip:'FDA De Novo 2020',ev:'early',
  what:`Video-game-like attention training played 25 minutes a day, 5 days a week, for 4 weeks. In STARS-ADHD (348 unmedicated children aged 8–12) it improved the TOVA Attention Performance Index more than a digital control (median difference 0.88). [[Kollins2020]] FDA De Novo DEN200026, 15 June 2020, as an adjunct to clinician-supervised treatment. [[FDA-EndeavorRx]]`,
  nct:'STARS-ADHD, NCT02674633 [[NCT02674633]]',
  open:`The primary outcome was a computerised attention test, not parent- or clinician-rated ADHD symptoms. [[Kollins2020]]`},
 {id:'tns',n:'Monarch eTNS',g:1,to:3,kind:'dev',chip:'FDA De Novo 2019',ev:'early',
  what:`External trigeminal nerve stimulation through forehead electrodes, nightly for 4 weeks. In a double-blind, sham-controlled pilot in 62 children aged 8–12, ADHD-RS improved (week 4 Cohen d 0.5) with a number needed to treat of 3 on CGI-I. [[McGough2019]] FDA De Novo DEN180041, 19 April 2019. [[FDA-MonarchETNS]]`,
  nct:'Pilot NCT02155608; larger trial NCT05374187 (218 enrolled, completed April 2026, no posted results) [[NCT02155608,NCT05374187]]',
  open:`Will the larger trial replicate the pilot? Responders had lower baseline working memory and right-frontal EEG power (a Hypothesis about who benefits). [[Loo2021]]`},
 {id:'neba',n:'NEBA EEG aid',g:2,to:3,kind:'tool',chip:'De Novo 2013 · aid only',ev:'early',
  what:`An EEG theta/beta ratio assessment aid, authorised by De Novo DEN110019 on 15 July 2013 for use only alongside other valid diagnostic methods. [[FDA-NEBA]] A sponsor-linked 13-site study reported accuracy rising from 61% to 88% when the ratio was added to clinician evaluation. [[Snyder2015]]`,
  nct:'No NCT number in this guide\'s research.',
  open:`A meta-analysis concluded the ratio "cannot be considered a reliable diagnostic measure"; [[Arns2013]] in two multicentre datasets, none of five processing methods separated children with and without ADHD. [[vanDijk2020]]`},
 {id:'nf',n:'Neurofeedback',g:2,to:2,kind:'tool',chip:'no specific effect, blinded',ev:'est',
  what:`Training people to change their own EEG patterns. A 2025 meta-analysis of 38 RCTs (2,472 participants) found no improvement on probably blinded ratings (SMD 0.04). [[Westwood2025]] In a double-blind sham-controlled trial of 144 children, both groups improved strongly but neurofeedback was not superior (d = 0.01). [[NFCG2021]]`,
  nct:'Sham-controlled trial reported by the Neurofeedback Collaborative Group [[NFCG2021,NFCG2023]]',
  open:`A small effect remained for standard protocols (SMD 0.21). [[Westwood2025]] Brain stimulation (rTMS, tDCS) also shows little clinical benefit so far. [[Westwood2021NIBS,Westwood2023tDCS]]`},
 {id:'pgs',n:'Polygenic scores',g:3,to:0,kind:'tool',chip:'research tool',ev:'hyp',
  what:`A score adding up many common genetic variants. The 2023 GWAS (38,691 people with ADHD) found 27 loci, with 84–98% of ADHD-influencing variants shared with other psychiatric disorders. [[Demontis2023]] Adding a polygenic score to the ASRS raised variance explained by only 0.58 percentage points. [[Hoberg2024]]`,
  nct:'Not a treatment trial.',
  open:`"Currently not a clinically useful diagnostic aid" (Hypothesis for future use). [[Hoberg2024]] More in <a href="#genes" data-go="genes">Genes &amp; heritability</a>.`},
 {id:'cyp',n:'CYP2D6 dosing',g:3,to:3,kind:'tool',chip:'label + CPIC guideline',ev:'est',
  what:`Precision dosing that exists today: the CPIC guideline gives atomoxetine recommendations by CYP2D6 genotype. [[Brown2019CPIC]] The Strattera label states that exposure (AUC) is about 10-fold higher in CYP2D6 poor metabolisers, about 7% of White and 2% of Asian and Black populations, and describes a longer titration interval for them, quoted as published. [[FDA-StratteraG]]`,
  nct:'Guideline and label, not a trial.',
  open:`Whether genotype-guided dosing of other ADHD medicines adds value is not shown in this guide's research.`}
];
const RS_STEPS=[
 {k:'Medicines',t:'New medicines',txt:`Three medicines in the adult pipeline. A review of 90 phase 2/3 trials found centanafadine the only candidate with replicated efficacy, with small effect sizes (0.28–0.40). [[Veronesi2024]] It was approved in July 2026. [[FDA-Simtriyo]] Solriamfetol and mazindol had large effects in small early trials. [[Surman2023,Wigal2018Mazindol]]`,
  pt:`One new medicine has made it to approval. Two more look promising in small trials, which often shrink when larger trials are done.`,
  hook:`Centanafadine: a norepinephrine-dopamine-serotonin reuptake inhibitor, small effect sizes in adult phase 3 trials, FDA approval 2026. [[Adler2022,FDA-Simtriyo]]`},
 {k:'Devices',t:'An app and a nerve stimulator',txt:`Two devices reached FDA authorisation through the De Novo route: the Monarch external trigeminal nerve stimulator (2019) and EndeavorRx, a prescription video game (2020). [[FDA-MonarchETNS,FDA-EndeavorRx]] Both rest on one main trial each. [[McGough2019,Kollins2020]]`,
  pt:`A game and a forehead stimulator are allowed to be sold for ADHD in the US. That does not mean they work as well as medicine.`,
  hook:`eTNS 2019, EndeavorRx 2020: De Novo authorisations, Early evidence. [[FDA-MonarchETNS,FDA-EndeavorRx]]`},
 {k:'EEG',t:'Brain-wave tests and training',txt:`The NEBA aid was authorised in 2013 as an assessment aid only. [[FDA-NEBA]] Since then, the theta/beta ratio has been shown not to separate ADHD from controls reliably. [[Arns2013,vanDijk2020]] Neurofeedback reached many randomised trials, but blinded and sham-controlled ones show no specific effect. [[Westwood2025,NFCG2021]]`,
  pt:`Brain-wave tests cannot diagnose ADHD, and brain-wave training has not beaten a fake version in careful trials.`,
  hook:`Neurofeedback: least-blinded SMD 0.35 versus probably-blinded SMD 0.04. [[Cortese2016,Westwood2025]]`},
 {k:'Genetics',t:'Genes and precision dosing',txt:`Polygenic scores stay at the research stage: they add under 1 percentage point to what a rating scale explains. [[Hoberg2024]] The one form of precision dosing already in use is CYP2D6 genotype for atomoxetine, set out in a CPIC guideline and the label. [[Brown2019CPIC,FDA-StratteraG]]`,
  pt:`A gene test cannot tell whether someone has ADHD. For one medicine, atomoxetine, a gene test can show who breaks it down slowly.`,
  hook:`CYP2D6 poor metabolisers: about 10-fold higher atomoxetine exposure. [[FDA-StratteraG]]`},
 {k:'The board',t:'Reading the whole board',txt:`Long-term evidence remains the biggest gap: an umbrella review found no high-certainty evidence at 52 weeks for any ADHD intervention. [[Gosling2025]] In adults, only stimulants and atomoxetine reduced core symptoms on both self- and clinician-rated scales at about 12 weeks. [[Ostinelli2025]]`,
  pt:`Being new does not make a treatment better. Most new options are still being compared with the medicines we already have.`,
  hook:`No ADHD treatment has high-certainty evidence at 52 weeks (umbrella review of 221 meta-analyses). [[Gosling2025]]`}
];
const RC_EX={
 nf:{claim:'"Brain-wave training improves ADHD"',d:[.35,.04],dl:['least blinded ratings','probably blinded ratings'],
  checks:[['fail',`In a double-blind, sham-controlled trial of 144 children, both groups improved strongly (d = 1.5), but neurofeedback was not better than sham (d = 0.01 at the end of treatment). [[NFCG2021]]`,'sham did as well'],
   ['fail',`Across 38 RCTs, ratings by probably blinded raters showed no improvement (SMD 0.04, −0.10 to 0.18). [[Westwood2025]]`,'blinded: no effect'],
   ['weak',`The effect looks moderate only on the least-blinded ratings, usually parents who knew the treatment (SMD 0.35). A small effect remained for standard protocols (SMD 0.21). [[Cortese2016,Westwood2025]]`,'0.35 unblinded, 0.04 blinded'],
   ['fail',`At 25 months, the sham-controlled trial still found no difference on parent-rated inattention (58.6% v 66% responders). [[NFCG2023]]`,'repeated: still no difference']],
  pts:[0,0,.05,0],start:.25,verdict:'Low confidence in a specific effect'},
 tns:{claim:'"Nightly forehead stimulation eases ADHD symptoms"',d:[.5,.5],dl:['ADHD-RS, week 4','ADHD-RS, week 4'],
  checks:[['pass',`The pilot compared real stimulation with a sham device in 62 children aged 8–12. [[McGough2019]]`,'sham-controlled'],
   ['pass',`It was a double-blind trial, so knowing who had the real device could not colour the ratings. [[McGough2019]]`,'double-blind'],
   ['pass',`ADHD-RS improved with Cohen d 0.5 at week 4, and the number needed to treat on CGI-I was 3; a moderate effect in a small sample. [[McGough2019]]`,'d 0.5, NNT 3'],
   ['wait',`A larger trial (218 enrolled) completed in April 2026 without posted results, so the finding has not yet been replicated. [[NCT05374187]]`,'larger trial: results pending']],
  pts:[.2,.2,.12,0],start:.15,verdict:'Promising; waiting for replication'}
};
const RC_GATES=['Sham control?','Blind raters?','How big?','Repeated?'];
inits.frontiers=()=>{
  const svg=$('#rsSvg'),rg=$('#rsT');
  const T=(x,y,c,v,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const KC={drug:'var(--rx)',dev:'var(--dx)',tool:'var(--gold)'};
  const EVT={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
  const EVC={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'};
  const steps=RS_STEPS.map((S,i)=>({from:i/5,at:Math.min(1,i/5+.19),t:S.t}));
  /* the cards */
  $('#rsCards').innerHTML=RS_ITEMS.map(I=>`<div class="card" data-rsid="${I.id}"><span class="ev ${I.ev}">${EVT[I.ev]}</span><h4>${I.n}</h4><p>${I.what}</p><p class="rs-nct"><b>Key trial:</b> ${I.nct}</p><p class="rs-open"><b>Open question:</b> ${I.open}</p></div>`).join('');
  let setStep=null,lastG=-2;
  function draw(t){const N=vb(svg,'720 440','400 640'),k=phaseOf(steps,t);let s='';
    const L=N?{cx0:20,cx1:384,top:58,rh:62,nameDy:0,trackDy:30,pw:84,ph:24}:{cx0:178,cx1:712,top:62,rh:41,nameDy:16,trackDy:7,pw:124,ph:26};
    const cw=(L.cx1-L.cx0)/4,CX=c=>L.cx0+cw*(c+.5);
    /* column headers and lanes */
    RS_COLS.forEach(([a,b],c)=>{const x=L.cx0+cw*c;s+=`<rect x="${f1(x+2)}" y="${L.top-8}" width="${f1(cw-4)}" height="${f1(RS_ITEMS.length*L.rh+8)}" rx="8" style="fill:${c===3?'var(--good-soft)':'var(--panel-2)'};opacity:${c===3?.7:.55}"/>`;
      s+=T(CX(c),N?22:24,'t-sm t-mid',N?['Ph 1','Ph 2','Ph 3','FDA'][c]:a,`fill:${c===3?'var(--good)':'var(--ink)'};font-weight:600`)+T(CX(c),N?36:38,'t-xs t-mid',N?['early','pilot','large','or label'][c]:b)});
    RS_ITEMS.forEach((I,i)=>{const y=L.top+i*L.rh,on=I.g===k||k===4,gS=I.g/5+.015,gE=I.g/5+.16;
      const p=k===4?1:ease(ramp(t,gS,gE)),vis=t>=gS-.001||k===4;
      if(on&&k<4)s+=`<rect x="${N?14:8}" y="${y-(N?4:1)}" width="${N?372:706}" height="${L.rh-3}" rx="8" style="fill:none;stroke:var(--brand);stroke-width:1.4;opacity:.7"/>`;
      s+=T(N?L.cx0:12,y+L.nameDy+(N?12:0),N?'t-lbl':'t-lbl',I.n,`fill:var(--ink);opacity:${vis?1:.45};${N?'font-size:12px':''}`);
      if(!N)s+=T(12,y+L.nameDy+13,'t-xs',EVT[I.ev],`fill:${EVC[I.ev]};opacity:${vis?1:.4}`);
      else s+=T(L.cx1,y+12,'t-xs t-end',EVT[I.ev],`fill:${EVC[I.ev]};opacity:${vis?1:.4}`);
      const ty=y+L.trackDy;s+=`<line x1="${f1(CX(0))}" x2="${f1(CX(3))}" y1="${f1(ty+L.ph/2)}" y2="${f1(ty+L.ph/2)}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:2 4"/>`;
      if(!vis)return;
      const px=lerp(CX(0),CX(I.to),p),c=KC[I.kind];
      if(p>.02&&I.to>0)s+=`<line x1="${f1(CX(0))}" x2="${f1(px)}" y1="${f1(ty+L.ph/2)}" y2="${f1(ty+L.ph/2)}" style="stroke:${c};stroke-width:3;opacity:.5"/>`;
      const done=p>.98,lab=done?I.chip:['early studies','pilot trial','large trials','authorised'][Math.min(3,Math.floor(p*I.to+.001))];
      s+=`<rect x="${f1(px-L.pw/2)}" y="${f1(ty)}" width="${L.pw}" height="${L.ph}" rx="${L.ph/2}" style="fill:${done?c:'var(--panel)'};stroke:${c};stroke-width:2"/>`;
      s+=T(px,ty+L.ph/2+3.5,'t-xs t-mid',lab,`fill:${done?'var(--panel)':'var(--ink)'};font-weight:600;${N&&lab.length>15?'font-size:7.6px':''}`);
      if(done&&I.to===3)s+=`<circle cx="${f1(px+L.pw/2-2)}" cy="${f1(ty+2)}" r="7" style="fill:var(--good);stroke:var(--panel);stroke-width:1.5"/><path d="M${f1(px+L.pw/2-5.5)} ${f1(ty+2)}l2.5 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
    });
    svg.innerHTML=s;
    $('#rsNote').innerHTML=noteHTML(RS_STEPS[k]);
    if(k!==lastG){lastG=k;$$('#rsCards [data-rsid]').forEach(el=>{const I=RS_ITEMS.find(x=>x.id===el.dataset.rsid);el.classList.toggle('rs-on',k<4&&I.g===k)})}
    setStep&&setStep(k)}
  const stop=playWire(rg,$('#rsPlay'),draw,22000,'Replay','frontiers');
  setStep=stepWire($('#rsSteps'),steps,rg,draw,stop);
  draw(+rg.value);

  /* ---- how to read a new claim ---- */
  const csvg=$('#rcSvg'),cr=$('#rcT');let ex='nf';
  const csteps=[{from:0,at:.08,t:'The claim'},{from:.18,at:.27,t:'Sham control'},{from:.36,at:.45,t:'Blinding'},{from:.54,at:.63,t:'Effect size'},{from:.72,at:.81,t:'Replication'},{from:.9,at:1,t:'Verdict'}];
  const ST={pass:['var(--good)','✓'],fail:['var(--bad)','✗'],weak:['var(--warn)','~'],wait:['var(--warn)','…']};
  const npdf=x=>Math.exp(-x*x/2);
  let setC=null;
  function drawC(t){const N=vb(csvg,'720 330','400 560'),E=RC_EX[ex],k=phaseOf(csteps,t);let s='';
    /* claim */
    const cw=N?368:470,cx0=N?16:20;
    s+=`<rect x="${cx0}" y="14" width="${cw}" height="42" rx="12" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.4"/>`+T(cx0+cw/2,40,'t-lbl t-mid',E.claim,N?'font-size:11.5px':'');
    s+=T(cx0+cw/2,72,'t-xs t-mid','headline claim · how much should we trust it?');
    /* gates */
    const gw=N?176:128,gh=74;
    E.checks.forEach(([st,tx,short],i)=>{const gx=N?16+(i%2)*192:20+i*(gw+6),gy=N?92+Math.floor(i/2)*86:94,act=t>=csteps[i+1].from,cur=k===i+1;
      const [c,mk]=act?ST[st]:['var(--line)',String(i+1)];
      s+=`<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="10" style="fill:${act?'var(--panel)':'var(--panel-2)'};stroke:${c};stroke-width:${cur?2.6:1.4}"/>`;
      s+=`<circle cx="${gx+18}" cy="${gy+20}" r="11" style="fill:${act?c:'var(--panel)'};stroke:${c};stroke-width:1.4"/>`+T(gx+18,gy+24.5,'t-sm t-mid',mk,`fill:${act?'var(--panel)':'var(--muted)'};font-weight:700`);
      s+=T(gx+36,gy+24,'t-lbl',RC_GATES[i],'font-size:12px');
      if(act){const words=short.split(' '),lines=[''];words.forEach(w=>{if((lines[lines.length-1]+' '+w).length>(N?26:17))lines.push(w);else lines[lines.length-1]=(lines[lines.length-1]+' '+w).trim()});
        lines.slice(0,3).forEach((l,j)=>{s+=T(gx+10,gy+44+j*12,'t-xs',l,`fill:${c}`)})}});
    /* effect-size curves */
    const ex0=N?20:20,ex1=N?380:470,ey=N?420:300,eh=N?90:66,eT=N?300:190;
    const show=ramp(t,.54,.62),d=lerp(0,E.d[1],show),dg=lerp(0,E.d[0],show);
    s+=T(ex0,eT,'t-sm',`EFFECT SIZE: ${show>.01?E.dl[1]+' '+E.d[1].toFixed(2):'not shown yet'}`,'fill:var(--brand)');
    const X=v=>lerp(ex0,ex1,(v+3.2)/(6.4+.6)),Yc=v=>ey-v*eh;
    const curve=(m,st)=>{let p='';for(let i=0;i<=80;i++){const v=-3.2+i/80*(6.4+.6);p+=(i?'L':'M')+f1(X(v))+' '+f1(Yc(npdf(v-m)))}return `<path d="${p}" style="${st}"/>`};
    s+=`<line x1="${ex0}" x2="${ex1}" y1="${ey}" y2="${ey}" class="axis"/>`;
    s+=curve(0,'fill:var(--muted);fill-opacity:.15;stroke:var(--muted);stroke-width:1.8');
    if(E.d[0]!==E.d[1]&&show>0)s+=curve(dg,'fill:none;stroke:var(--warn);stroke-width:1.6;stroke-dasharray:4 3');
    s+=curve(d,`fill:var(--rx);fill-opacity:.18;stroke:var(--rx);stroke-width:2`);
    s+=T(X(0),ey+14,'t-xs t-mid','comparison')+T(X(d)+(N?30:40),ey-eh-6,'t-xs t-mid',ex==='nf'?'neurofeedback':'active device','fill:var(--rx)');
    if(E.d[0]!==E.d[1]&&show>0)s+=T(X(dg)+(N?70:110),ey-eh*.55,'t-xs t-mid',`${E.dl[0]} ${E.d[0]}`,'fill:var(--warn)');
    /* meter */
    let conf=E.start*ramp(t,0,.1);E.pts.forEach((p,i)=>{conf+=p*ramp(t,csteps[i+1].from,csteps[i+1].from+.06)});
    const pending=ex==='tns'?.25*ramp(t,.72,.78):0;
    if(N){const mx0=20,mx1=380,my=520;s+=T(mx0,my-10,'t-sm','CONFIDENCE (TEACHING METER)','fill:var(--brand)');
      s+=`<rect x="${mx0}" y="${my}" width="${mx1-mx0}" height="18" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(pending)s+=`<rect x="${f1(mx0+(mx1-mx0)*conf)}" y="${my}" width="${f1((mx1-mx0)*pending)}" height="18" rx="9" style="fill:none;stroke:var(--warn);stroke-dasharray:4 3"/>`;
      s+=`<rect x="${mx0}" y="${my}" width="${f1(Math.max(4,(mx1-mx0)*conf))}" height="18" rx="9" style="fill:var(--brand)"/>`;
      if(k===5)s+=T(mx1,my+36,'t-sm t-end',E.verdict,'fill:var(--ink);font-weight:700')}
    else{const mx=600,my0=40,my1=290,mw=40;s+=T(mx+mw/2,my0-14,'t-xs t-mid','CONFIDENCE','fill:var(--brand)');
      s+=`<rect x="${mx}" y="${my0}" width="${mw}" height="${my1-my0}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const H=(my1-my0),hc=H*conf;
      if(pending)s+=`<rect x="${mx}" y="${f1(my1-hc-H*pending)}" width="${mw}" height="${f1(H*pending)}" rx="10" style="fill:none;stroke:var(--warn);stroke-dasharray:4 3"/>`+T(mx-6,my1-hc-H*pending/2,'t-xs t-end','if replicated','fill:var(--warn)');
      s+=`<rect x="${mx}" y="${f1(my1-Math.max(6,hc))}" width="${mw}" height="${f1(Math.max(6,hc))}" rx="12" style="fill:var(--brand)"/>`;
      s+=T(mx+mw/2,my1+16,'t-xs t-mid','teaching only');
      if(k===5){const words=E.verdict.split('; ');words.forEach((w,j)=>{s+=T(mx-10,my1-24+j*14,'t-xs t-end',w,'fill:var(--ink);font-weight:600')})}}
    csvg.innerHTML=s;
    let P;if(k===0)P={k:'Step 1 · The claim',t:E.claim.replace(/"/g,''),txt:ex==='nf'?`Neurofeedback trains people to change their own EEG patterns. Early meta-analyses looked encouraging, mostly because of ratings by people who knew which treatment a child had. [[Cortese2016]]`:`External trigeminal nerve stimulation sends a mild current through forehead electrodes overnight. The FDA authorised one device, Monarch eTNS, in 2019. [[FDA-MonarchETNS]]`,pt:`Start every headline with: compared with what, and who was measuring?`};
    else if(k<5){const [st,tx]=E.checks[k-1];P={k:`Step ${k+1} · ${RC_GATES[k-1]}`,t:{pass:'Passed',fail:'Not passed',weak:'Weak',wait:'Not yet known'}[st]+': '+csteps[k].t.toLowerCase(),txt:tx,
      pt:[`A sham is a fake version that looks and feels the same. Without one, hope and attention alone can make people better.`,`If the person rating symptoms knows who got the real treatment, the ratings drift toward what they expect.`,`Effect size says how far apart the group averages are, in units of spread. The bigger it is, the less the two groups overlap.`,`One trial can be a fluke. A finding counts more when a different team gets the same answer.`][k-1],
      hook:[`Sham-controlled neurofeedback trial: both arms improved by d = 1.5; difference d = 0.01. [[NFCG2021]]`,`Neurofeedback: SMD 0.35 on least-blinded ratings versus 0.04 on probably blinded ratings. [[Cortese2016,Westwood2025]]`,`Effect sizes of new adult medicines: centanafadine 0.28–0.40 (small). [[Veronesi2024]]`,`Centanafadine was the only adult pipeline treatment with replicated efficacy. [[Veronesi2024]]`][k-1]}}
    else P={k:'Step 6 · Verdict',t:E.verdict,txt:ex==='nf'?`Neurofeedback is not recommended as a core treatment on current evidence: blinded and sham-controlled trials show no specific effect. [[Westwood2025,NFCG2021]]`:`Early evidence from one double-blind pilot, with a moderate effect; the larger trial's results will decide how far confidence rises. FDA authorisation through De Novo does not mean equivalence with medication. [[McGough2019,NCT05374187,FDA-MonarchETNS]]`,
      pt:`The same four questions work for any new claim: a supplement, an app, a diet or a new pill.`};
    $('#rcNote').innerHTML=noteHTML(P);setC&&setC(k)}
  const stopC=playWire(cr,$('#rcPlay'),drawC,16000,'Replay','frontiers');
  setC=stepWire($('#rcSteps'),csteps,cr,drawC,stopC);
  $$('[data-rcex]').forEach(b=>b.addEventListener('click',()=>{ex=b.dataset.rcex;$$('[data-rcex]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC(+cr.value)}));
  drawC(+cr.value);
};
