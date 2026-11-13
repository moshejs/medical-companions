/* =============== 5.5 Research toward better treatment =============== */
const FR_COLS=['Lab & animal','First in humans','Phase 2 / small RCT','Phase 3 / outcomes','Approved'];
const FR_EV={est:['Established','est'],early:['Early evidence','early'],hyp:['Hypothesis','hyp']};
/* s: pipeline step, c: furthest stage reached, fail: did not meet its main goal */
const FR_P=[
 {s:1,c:4,n:'Resmetirom',sub:'THR-β agonist',ev:'est',tgt:'mash',nct:'NCT03900429',st:'Approved (accelerated), noncirrhotic MASH F2–F3; MAESTRO-NASH continues to outcomes, primary completion January 2028',
  txt:'MAESTRO-NASH (966 people, F1B–F3, 52 weeks): fibrosis improved by ≥1 stage in 24.2% (80 mg) and 25.9% (100 mg) vs 14.2% on placebo. [[Harrison2024MAESTRO,FDA-Rezdiffra,NCT03900429]]'},
 {s:1,c:4,n:'Semaglutide',sub:'GLP-1 agonist',ev:'est',tgt:'mash',nct:'NCT04822181',st:'Wegovy label includes noncirrhotic MASH F2–F3 (accelerated approval); ESSENCE part 2 primary completion April 2029',
  txt:'ESSENCE (800 people, F2–F3, week 72): fibrosis reduction 36.8% vs 22.4%; steatohepatitis resolution 62.9% vs 34.3%; weight −10.5% vs −2.0%. [[Sanyal2025ESSENCE,FDA-Wegovy,NCT04822181]]'},
 {s:1,c:2,n:'Tirzepatide',sub:'GIP/GLP-1 agonist',ev:'early',tgt:'mash',
  st:'Phase 2 (SYNERGY-NASH)',txt:'At 52 weeks, fibrosis improved by ≥1 stage in 55%, 51% and 51% (5, 10, 15 mg) vs 30% on placebo. [[Loomba2024SYNERGY]]'},
 {s:1,c:3,n:'Lanifibranor',sub:'pan-PPAR agonist',ev:'early',tgt:'mash',nct:'NCT04849728',st:'Phase 3 NATiV3 (F2–F3, n=1000): active, not recruiting; primary completion listed 2026-09-29',
  txt:'Phase 2b NATIVE: fibrosis improved by ≥1 stage in 48% (1200 mg) vs 29%; side effects included weight gain, oedema and anaemia. [[Francque2021NATIVE,NCT04849728]]'},
 {s:1,c:2,n:'Efruxifermin',sub:'FGF21 analogue',ev:'early',tgt:'mash',st:'Phase 2b (HARMONY, F2–F3)',
  txt:'At 24 weeks, fibrosis improved by ≥1 stage in 39% (28 mg) and 41% (50 mg) vs 20% on placebo. [[Harrison2023HARMONY]]'},
 {s:1,c:2,n:'Pegozafermin',sub:'FGF21 analogue',ev:'early',tgt:'mash',st:'Phase 2b (ENLIVEN)',
  txt:'Fibrosis improved in 26% (30 mg) and 27% (44 mg) vs 7% on pooled placebo. [[Loomba2023ENLIVEN]]'},
 {s:2,c:3,n:'Resmetirom (F4)',sub:'Child–Pugh A cirrhosis',ev:'early',tgt:'cirr',nct:'NCT05500222',st:'MAESTRO-NASH-OUTCOMES (n=845): active, not recruiting; primary completion listed 2026-12',
  txt:'Tests resmetirom on liver-related outcomes in well-compensated MASH cirrhosis. No results yet. [[NCT05500222]]'},
 {s:2,c:2,n:'Semaglutide (F4)',sub:'phase 2, 48 weeks',ev:'early',fail:1,tgt:'cirr',st:'Phase 2, did not improve fibrosis',
  txt:'71 people with compensated MASH cirrhosis: fibrosis improved in 11% vs 29% on placebo, not significant; no decompensating events or deaths. [[Loomba2023SemaCirrhosis]]'},
 {s:2,c:3,n:'Efruxifermin (F4)',sub:'SYMMETRY → phase 3',ev:'early',tgt:'cirr',nct:'NCT06528314',st:'Phase 3 outcomes trial (n=2150): recruiting; primary completion listed 2030-02',
  txt:'SYMMETRY (181 people): week 36 missed (19% vs 13%), week 96 29% vs 11% (difference 16 points; 95% CI 2–30). [[Noureddin2025SYMMETRY,NCT06528314]]'},
 {s:2,c:3,n:'Pegozafermin (F4)',sub:'ENLIGHTEN-Cirrhosis',ev:'early',tgt:'cirr',nct:'NCT06419374',st:'Phase 3 (n=1800, sponsor Hoffmann-La Roche): recruiting; primary completion listed 2028-06-30',
  txt:'Phase 3 in compensated MASH cirrhosis, building on ENLIVEN. [[NCT06419374,Loomba2023ENLIVEN]]'},
 {s:2,c:3,n:'Survodutide',sub:'glucagon/GLP-1 agonist',ev:'early',tgt:'cirr',nct:'NCT06632457',st:'Phase 3 LIVERAGE-Cirrhosis (n=1590): recruiting; primary completion listed 2029-06-05',
  txt:'Outcomes trial of a weekly injection in compensated MASH cirrhosis. [[NCT06632457]]'},
 {s:2,c:0,n:'LSEC restoration',sub:'VEGF / nitric oxide',ev:'early',tgt:'cirr',st:'Animal studies',
  txt:'In animals, restoring LSEC differentiation promoted stellate-cell quiescence, enhanced regression and prevented progression to cirrhosis. [[DeLeve2015]]'},
 {s:3,c:2,n:'Simvastatin, BLEPS',sub:'after a variceal bleed',ev:'early',tgt:'statin',st:'RCT: missed main goal, survival signal secondary',
  txt:'147 people: no reduction in rebleeding; deaths 9% vs 22% (HR 0.39), a secondary endpoint, with no benefit in Child–Pugh C and 2 cases of rhabdomyolysis. [[Abraldes2016BLEPS]]'},
 {s:3,c:2,n:'LIVERHOPE',sub:'simvastatin + rifaximin',ev:'est',fail:1,tgt:'statin',st:'RCT in Child–Pugh B/C: no benefit',
  txt:'237 people: no reduction in ACLF (17.9% vs 14.2%) or transplant or death (18.8% vs 24.2%); 2.6% rhabdomyolysis. The 40 mg arm of the safety trial was stopped early for toxicity. [[Pose2025LIVERHOPE,Pose2020LIVERHOPESafety]]'},
 {s:3,c:3,n:'Simvastatin, SACRED',sub:'compensated + CSPH',ev:'early',tgt:'statin',nct:'NCT03654053',st:'VA phase 3 (n=142): active, not recruiting; primary completion 2026-12-31; no results yet',
  txt:'Simvastatin 40 mg/day vs placebo for up to 24 months; primary endpoint decompensation-free survival. [[Kaplan2021SACRED,NCT03654053]]'},
 {s:3,c:2,n:'Rosuvastatin, RESCU',sub:'phase 2, stiffness',ev:'early',tgt:'statin',nct:'NCT05832229',st:'Phase 2 (n=260): recruiting; primary completion listed 2029-08-31',
  txt:'Primary outcome: change in liver stiffness. [[NCT05832229]]'},
 {s:4,c:2,n:'G-CSF ± stem cells',sub:'REALISTIC',ev:'est',fail:1,tgt:'cell',st:'Phase 2 RCT: no MELD benefit, more harm',
  txt:'81 people with compensated cirrhosis: no MELD improvement at day 90; serious adverse events 43% with G-CSF plus stem cells vs 12% with standard care. [[Newsome2018REALISTIC]]'},
 {s:4,c:2,n:'Macrophage therapy',sub:'MATCH',ev:'early',tgt:'cell',st:'Phase 2, open-label: missed primary endpoint; long-term signal',
  txt:'51 people: ΔΔMELD −0.87 (P=0.06). Up to 4 years: death or transplant 30.8% vs 58.3%, in a small open-label trial. [[Brennan2025MATCH,Brennan2026MATCHLTFU]]'},
 {s:4,c:1,n:'Hepatocyte transplant',sub:'cells, not organs',ev:'early',tgt:'cell',st:'Small series, mainly metabolic disease and acute liver failure',
  txt:'First reported for Crigler–Najjar type I in 1998; limited by tissue shortage, early cell loss and poor engraftment. [[Fox1998,Nguyen2020]]'},
 {s:4,c:3,n:'ELAD device',sub:'C3A cell support',ev:'est',fail:1,tgt:'cell',st:'Randomised trial: no survival benefit',
  txt:'203 people with severe alcohol-related hepatitis: overall survival 51.0% vs 49.5%. [[Thompson2018ELAD]]'},
 {s:4,c:3,n:'MARS dialysis',sub:'RELIEF',ev:'est',fail:1,tgt:'cell',st:'Randomised trial: no survival benefit',
  txt:'189 people with acute-on-chronic liver failure: 28-day survival 60.7% vs 58.9%. [[Banares2013RELIEF]]'},
 {s:4,c:0,n:'Scar macrophages',sub:'TREM2+CD9+ cells',ev:'hyp',tgt:'cell',st:'Human tissue atlas; no treatment yet',
  txt:'A single-cell atlas of human cirrhosis identified pro-fibrogenic scar-associated macrophages and scar-confined endothelial and collagen-producing cells. [[Ramachandran2019]]'},
 {s:5,c:3,n:'Warm perfusion (NMP)',sub:'normothermic machine',ev:'est',tgt:'organ',st:'Randomised trials',
  txt:'220 transplants: 50% lower graft injury and discard, 54% longer preservation, no difference in graft or patient survival. OCS PROTECT: early allograft dysfunction 18% vs 31%. [[Nasralla2018,Markmann2022OCS]]'},
 {s:5,c:3,n:'Cold perfusion (HOPE)',sub:'DHOPE, DCD livers',ev:'est',tgt:'organ',st:'Randomised trial',
  txt:'160 people: non-anastomotic biliary strictures 6% vs 18% (risk ratio 0.36). [[vanRijn2021DHOPE]]'},
 {s:5,c:1,n:'Gene-edited pig liver',sub:'auxiliary xenograft',ev:'hyp',tgt:'organ',st:'First human experiments',
  txt:'In a brain-dead recipient it made bile and pig albumin for 10 days; in the first living recipient it was removed on day 38 for thrombotic microangiopathy. [[Tao2025Xeno,Zhang2026Xeno]]'}
];
const FR_STEPS=[
 {k:'The pipeline',t:'From idea to approval',
  txt:`Antifibrotic strategies fall into four groups: cure or control the primary disease, target receptor–ligand signalling, inhibit fibrogenesis, and promote resolution. [[Lee2015Gut]] Validating non-invasive markers that could replace biopsy and shorten trials remains a key unmet need. [[Lee2015Gut]] Each card sits at the furthest stage its programme has reached by November 2026. A crossed card did not meet its main goal: negative results are results too.`,
  pt:`New treatments go step by step: lab, a few volunteers, bigger trials, then approval. Many ideas stop along the way.`,
  hook:`Strategies: (1) treat the cause, (2) block signalling, (3) inhibit fibrogenesis, (4) promote resolution. [[Lee2015Gut]]`},
 {k:'Step 2 · before cirrhosis',t:'Drugs for MASH scarring',
  txt:`<span class="ev est">Established</span> Resmetirom improved fibrosis by at least one stage in 24.2–25.9% vs 14.2% on placebo; the US label covers adults with noncirrhotic MASH and F2–F3 fibrosis under accelerated approval, at 80 mg daily under 100 kg and 100 mg at 100 kg or more, as published. [[Harrison2024MAESTRO,FDA-Rezdiffra]] Semaglutide 2.4 mg reduced fibrosis in 36.8% vs 22.4% (ESSENCE), and the Wegovy label now includes noncirrhotic MASH F2–F3. [[Sanyal2025ESSENCE,FDA-Wegovy]] <span class="ev early">Early evidence</span> Tirzepatide, lanifibranor and the FGF21 analogues efruxifermin and pegozafermin improved fibrosis in phase 2. [[Loomba2024SYNERGY,Francque2021NATIVE,Harrison2023HARMONY,Loomba2023ENLIVEN]] In a phase 2b trial of efinopegdutide, a weekly GLP-1–glucagon co-agonist, in 381 people with F2–F3, fibrosis improved by at least one stage at week 52 in 43% (4 mg), 52% (7 mg) and 34% (10 mg, not significant) vs 21% on placebo. [[Lawitz2026Efinopegdutide]]`,
  pt:`Two medicines are now approved in the US for fatty-liver scarring before cirrhosis. Several more are in large trials.`,
  hook:`Resmetirom: noncirrhotic MASH F2–F3 only; the label says to avoid it in decompensated cirrhosis. [[FDA-Rezdiffra]]`},
 {k:'Step 3 · in cirrhosis',t:'Cirrhosis is a harder target',
  txt:`<span class="ev early">Early evidence</span> Drugs that clearly reverse fibrosis at F2–F3 have so far shown smaller or delayed effects once cirrhosis is established. [[Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY]] Semaglutide did not improve fibrosis in compensated MASH cirrhosis at 48 weeks (11% vs 29%). Efruxifermin missed its week-36 goal (19% vs 13%) but separated at week 96 (29% vs 11%). [[Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY]] Outcome trials of resmetirom, efruxifermin, pegozafermin and survodutide report from about 2026 to 2030. [[NCT05500222,NCT06528314,NCT06419374,NCT06632457]] EASL–EASD–EASO 2024: "No MASH-targeted pharmacotherapy can currently be recommended for the cirrhotic stage." [[EASL2024MASLD]]`,
  pt:`Most proof so far is in people who do not yet have cirrhosis. Trials in people with cirrhosis are under way and will report over the next few years.`,
  hook:`F2–F3 biopsy gains ≠ benefit in cirrhosis: semaglutide 48 weeks, no fibrosis benefit; efruxifermin week 36 missed. [[Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY]]`},
 {k:'Step 4 · statins',t:'Statins: help or harm?',
  txt:`<span class="ev early">Early evidence</span> In BLEPS (147 people after variceal bleeding), simvastatin did not reduce rebleeding, but deaths were 9% vs 22%, a secondary endpoint, with no benefit in Child–Pugh C. [[Abraldes2016BLEPS]] <span class="ev est">Established</span> In decompensated cirrhosis, simvastatin 40 mg plus rifaximin caused muscle and liver toxicity in 3 of 16 people, and LIVERHOPE-EFFICACY (20 mg plus rifaximin, 237 people) found no benefit. [[Pose2020LIVERHOPESafety,Pose2025LIVERHOPE]] Trials in compensated cirrhosis are pending: SACRED (simvastatin, no results as of 4 November 2026) and RESCU (rosuvastatin). [[Kaplan2021SACRED,NCT03654053,NCT05832229]] See <a href="#portal" data-go="portal">Portal hypertension &amp; varices</a>.`,
  pt:`Cholesterol pills (statins) were hoped to protect the liver. In advanced cirrhosis they did not help and could harm muscle; trials in earlier cirrhosis are still running.`,
  hook:`LIVERHOPE: simvastatin + rifaximin, no benefit in decompensated cirrhosis; 40 mg arm stopped for rhabdomyolysis. [[Pose2025LIVERHOPE,Pose2020LIVERHOPESafety]]`},
 {k:'Step 5 · cells & devices',t:'Cell therapy and liver support',
  txt:`G-CSF with or without stem cells did not improve MELD and had more serious adverse events (43% vs 12%). [[Newsome2018REALISTIC]] <span class="ev early">Early evidence</span> Autologous macrophages missed their primary endpoint (P=0.06), but at up to 4 years death or transplant was 30.8% vs 58.3% in a small open-label trial. [[Brennan2025MATCH,Brennan2026MATCHLTFU]] Neither cell-based support (ELAD) nor albumin dialysis (MARS) improved survival in randomised trials. [[Thompson2018ELAD,Banares2013RELIEF]] Hepatocyte transplantation is used mainly in metabolic disease and acute liver failure. [[Nguyen2020]] <span class="ev hyp">Hypothesis</span> Scar-associated macrophages are a possible future target. [[Ramachandran2019]]`,
  pt:`Putting cells or machines in place of a failing liver has mostly not worked yet. One small trial of a person's own immune cells looks hopeful and needs a bigger test.`,
  hook:`REALISTIC: stem cells failed and harmed. ELAD and MARS: no survival benefit. [[Newsome2018REALISTIC,Thompson2018ELAD,Banares2013RELIEF]]`},
 {k:'Step 6 · donor livers',t:'Better donor livers, and pig livers',
  txt:`<span class="ev est">Established</span> Warm (normothermic) machine perfusion halved graft injury and organ discard and lengthened preservation by 54%, with no difference in graft or patient survival. Portable perfusion cut early allograft dysfunction to 18% vs 31%. [[Nasralla2018,Markmann2022OCS]] Cold oxygenated perfusion of livers donated after circulatory death cut non-anastomotic strictures to 6% vs 18%. [[vanRijn2021DHOPE]] <span class="ev hyp">Hypothesis</span> A gene-edited pig liver, attached as an auxiliary graft, made bile (66.5 mL by day 10) and pig albumin in a brain-dead recipient; in the first living recipient it was removed on day 38 for thrombotic microangiopathy, and the patient died on day 171. [[Tao2025Xeno,Zhang2026Xeno]] See <a href="#transplant" data-go="transplant">Liver transplant</a>.`,
  pt:`Machines that keep a donor liver warm and fed help more livers be used safely. Pig livers are at the earliest experimental stage.`,
  hook:`Normothermic perfusion: −50% graft injury, −50% discard, +54% preservation time. [[Nasralla2018]]`}
].map((s,i,a)=>Object.assign(s,{from:i/a.length,at:i/a.length+.62/a.length}));

inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT'),N=FR_STEPS.length,seg=1/N;
  const T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const EVC={est:'var(--good)',early:'var(--warn)',hyp:'var(--rx)'},EVS={est:'var(--good-soft)',early:'var(--warn-soft)',hyp:'var(--rx-soft)'};
  let setSt=()=>{};
  function card(x,y,w,h,P,a,arrived,nr){const col=EVC[P.ev];let s=`<g style="opacity:${f1(a)}">`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="8" style="fill:var(--panel);stroke:${P.fail&&arrived?'var(--bad)':col};stroke-width:1.6${P.fail&&arrived?';stroke-dasharray:4 3':''}"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="5" height="${h}" rx="2" style="fill:${col}"/>`;
    s+=T(x+10,y+(nr?15:16),P.n,'t-lbl',`font-size:${nr?11:11.5}px`);
    if(!nr)s+=T(x+10,y+29,P.sub,'t-xs','font-size:8.8px');
    s+=`<rect x="${f1(x+10)}" y="${f1(y+h-15)}" width="${nr?78:84}" height="11" rx="3" style="fill:${EVS[P.ev]}"/>`+T(x+14,y+h-6.5,FR_EV[P.ev][0].toUpperCase(),'t-xs',`font-size:8px;font-weight:700;fill:${col};letter-spacing:.04em`);
    if(P.fail&&arrived)s+=`<path d="M${f1(x+w-20)} ${f1(y+h-18)}l12 12m0 -12l-12 12" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`;
    return s+'</g>'}
  function draw(t){
    const nr=vb(svg,'720 420','400 590'),ph=phaseOf(FR_STEPS,t),u=clamp((t-FR_STEPS[ph].from)/seg);let s='';
    const W=nr?{x0:8,w:384}:{x0:10,w:700},cw=W.w/5;
    if(!nr){FR_COLS.forEach((c,i)=>{const x=W.x0+i*cw;s+=`<rect x="${f1(x+2)}" y="10" width="${f1(cw-4)}" height="${nr?0:404}" rx="10" style="fill:${i===4?'var(--rx-soft)':'var(--panel-2)'};opacity:${i===4?.55:.45}"/>`+T(x+cw/2,30,c,'t-sm t-mid','fill:var(--ink);font-weight:700')+(i<4?`<path d="M${f1(x+cw-3)} 21l6 5l-6 5z" style="fill:var(--muted)"/>`:'')})}
    else{FR_COLS.forEach((c,i)=>{const y=34+i*112;s+=`<rect x="4" y="${y-22}" width="392" height="108" rx="10" style="fill:${i===4?'var(--rx-soft)':'var(--panel-2)'};opacity:${i===4?.55:.45}"/>`+T(14,y-7,`${i+1} · ${c}`,'t-sm','fill:var(--ink);font-weight:700')})}
    if(ph===0){/* overview: every programme as a chip in its column */
      const cnt=[0,0,0,0,0];
      FR_P.forEach((P,i)=>{const k=cnt[P.c]++,p=ease(clamp(u*2.2-i*.03)),col=EVC[P.ev];
        if(!nr){const x=W.x0+P.c*cw+6,y=46+k*30;s+=`<g style="opacity:${f1(.25+.75*p)}"><rect x="${f1(x)}" y="${y}" width="${f1(cw-12)}" height="24" rx="6" style="fill:var(--panel);stroke:${col};stroke-width:1.2${P.fail&&p>.98?';stroke-dasharray:3 3':''}"/><circle cx="${f1(x+9)}" cy="${y+12}" r="3.5" style="fill:${col}"/>${T(x+17,y+15.5,P.n.length>20?P.n.slice(0,19)+'…':P.n,'t-xs','fill:var(--ink)')}${P.fail&&p>.98?`<path d="M${f1(x+cw-24)} ${y+7}l9 10m0 -10l-9 10" style="stroke:var(--bad);stroke-width:1.8"/>`:''}</g>`}
        else{const y=34+P.c*112,x=12+(k%3)*128,yy=y+2+Math.floor(k/3)*21;s+=`<g style="opacity:${f1(.25+.75*p)}"><rect x="${x}" y="${f1(yy)}" width="122" height="20" rx="5" style="fill:var(--panel);stroke:${col};stroke-width:1.1"/><circle cx="${x+8}" cy="${f1(yy+10)}" r="3" style="fill:${col}"/>${T(x+15,yy+13.5,P.n.length>17?P.n.slice(0,16)+'…':P.n,'t-xs','fill:var(--ink);font-size:9.5px')}</g>`}});
    }else{
      const L=FR_P.filter(P=>P.s===ph),cnt=[0,0,0,0,0];
      L.forEach((P,i)=>{const k=cnt[P.c]++,p=ease(clamp((u-i*.06)/.3)),pos=p*P.c,arrived=p>.99;
        if(!nr){const w=cw-10,h=48,x=W.x0+pos*cw+5,y=48+i*60;s+=card(x,y,w,h,P,.35+.65*clamp(p*3),arrived,nr)}
        else{const w=124,h=36,y=34+pos*112+4+Math.floor(k/3)*40,x=8+(k%3)*128;s+=card(x,y,w,h,P,.35+.65*clamp(p*3),arrived,nr)}});
    }
    svg.innerHTML=s;setSt(ph);
    $('#frNote').innerHTML=noteHTML(FR_STEPS[ph]);
  }
  const stop=playWire(rg,$('#frPlay'),draw,36000,'Replay','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- filterable programme list ---------- */
  let fe='all';const tg=$('#frTgt'),nc=$('#frNct');
  const TG={mash:'MASH scarring, before cirrhosis',cirr:'Compensated cirrhosis',statin:'Statins & portal hypertension',cell:'Cell therapy & liver support',organ:'Donor livers & xenotransplant'};
  function list(){const L=FR_P.filter(P=>(fe==='all'||P.ev===fe)&&(tg.value==='all'||P.tgt===tg.value)&&(!nc.checked||P.nct));
    $('#frCount').textContent=`${L.length} of ${FR_P.length} programmes`;
    $('#frList').innerHTML=L.length?L.map(P=>`<div class="card"><div class="meta"><span class="ev ${FR_EV[P.ev][1]}">${FR_EV[P.ev][0]}</span>${P.fail?'<span class="tag bad">Did not meet goal</span>':''}<span class="tag">${FR_COLS[P.c]}</span></div><h4>${P.n} <small style="font:500 13px var(--body);color:var(--muted)">${P.sub}</small></h4><p class="st">${TG[P.tgt]} · ${P.st}</p><p>${P.txt}</p>${P.nct?`<p><a class="nct" href="https://clinicaltrials.gov/study/${P.nct}" target="_blank" rel="noopener">${P.nct} ↗</a></p>`:''}</div>`).join(''):`<div class="card"><h4>No programme matches</h4><p>Try another evidence level or target.</p></div>`}
  $$('[data-fe]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.fe;$$('[data-fe]').forEach(x=>x.setAttribute('aria-pressed',x===b));list()}));
  tg.addEventListener('change',list);tg.addEventListener('input',list);nc.addEventListener('change',list);
  list();
};
