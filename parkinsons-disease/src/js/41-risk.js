/* =============== 4.1 risk =============== */
const RK_GEN='These are observational associations. They may be affected by reverse causation, where early Parkinson\'s changes behaviour such as smoking, activity or diet, and by confounding. [[Ritz2014]]';
const RK_F=[
 {n:'Paraquat',g:0,m:'OR',e:2.5,lo:1.4,hi:4.7,s:.03,src:'Agricultural Health Study',
  txt:'In the Agricultural Health Study (110 cases and 358 controls), paraquat use was linked to Parkinson\'s with OR 2.5 (95% CI 1.4 to 4.7). Paraquat belongs to the pesticides that cause oxidative stress. [[Tanner2011]]',cav:'One case-control study with 110 cases.'},
 {n:'Rotenone',g:0,m:'OR',e:2.5,lo:1.3,hi:4.7,s:.05,src:'Agricultural Health Study',
  txt:'Rotenone, a mitochondrial complex I inhibitor, was linked to Parkinson\'s with OR 2.5 (1.3 to 4.7) in the same study. [[Tanner2011]]',cav:'One case-control study with 110 cases.'},
 {n:'Oxidative-stress pesticides',g:0,m:'OR',e:2,lo:1.2,hi:3.6,s:.07,src:'group, same study',
  txt:'Pesticides that cause oxidative stress, taken as a group, gave OR 2.0 (1.2 to 3.6). A meta-analysis also found significant positive associations with pesticide exposure, farming, rural living and drinking well water. [[Tanner2011,Noyce2012]]',cav:''},
 {n:'Complex I inhibitors',g:0,m:'OR',e:1.7,lo:1,hi:2.8,s:.09,src:'group, same study',
  txt:'Mitochondrial complex I inhibitors as a group gave OR 1.7 (1.0 to 2.8); the lower end of the interval touches 1. [[Tanner2011]]',cav:'The interval reaches 1, so it is borderline.'},
 {n:'Trichloroethylene (TCE)',g:0,m:'OR',e:6.1,lo:1.2,hi:33,s:.12,src:'99 twin pairs',
  txt:'In 99 twin pairs where one twin had Parkinson\'s, ever exposure to the solvent TCE gave OR 6.1 (1.2 to 33). Perchloroethylene (OR 10.5, 0.97 to 113) and carbon tetrachloride (OR 2.3, 0.9 to 6.1) were borderline. [[Goldman2012]]',cav:'The very wide interval reflects the small sample.'},
 {n:'Camp Lejeune water',g:0,m:'OR',e:1.7,lo:1.39,hi:2.07,s:.15,src:'about 158,000 veterans',
  txt:'Water at Marine Corps Base Camp Lejeune had monthly median TCE levels more than 70 times the permissible amount. Compared with veterans at Camp Pendleton, Parkinson\'s prevalence was 0.33% against 0.21%, OR 1.70 (1.39 to 2.07). There was no excess of other neurodegenerative parkinsonism, and prodromal features were more common at Camp Lejeune. [[Goldman2023]]',cav:''},
 {n:'Head injury',g:0,m:'OR',e:1.57,lo:1.35,hi:1.83,s:.23,src:'22 studies',
  txt:'A meta-analysis of 22 studies gave a pooled OR of 1.57 (1.35 to 1.83) for head trauma with concussion. [[Jafari2013]]',cav:''},
 {n:'Low-fat dairy, 3+ a day',g:0,m:'HR',e:1.34,lo:1.01,hi:1.79,s:.26,src:'two US cohorts',
  txt:'In the Nurses\' Health Study and the Health Professionals Follow-up Study (1,036 cases), at least 3 servings a day of low-fat dairy gave HR 1.34 (1.01 to 1.79), and skim or low-fat milk HR 1.39 (1.12 to 1.73). [[Hughes2017]]',cav:'Total dairy intake was not significantly associated.'},
 {n:'Methamphetamine use',g:0,m:'HR',e:2.8,lo:1.6,hi:4.8,s:.29,src:'Utah records',
  txt:'People with a methamphetamine or amphetamine use disorder in Utah records had HR 2.8 (1.6 to 4.8) for Parkinson\'s against matched controls. Cocaine users had no excess risk. [[Curtin2015]]',cav:''},
 {n:'Melanoma',g:0,m:'OR',e:2.11,lo:1.26,hi:3.54,s:.32,src:'meta-analysis',
  txt:'Pooled OR 2.11 (1.26 to 3.54) for the link between melanoma and Parkinson\'s. Melanoma was significantly more common after a Parkinson\'s diagnosis (OR 3.61, 1.49 to 8.77) than before it (OR 1.07, 0.62 to 1.84, or 1.44 after excluding one study). [[Liu2011]]',cav:'The link is stronger after diagnosis than before, so the direction is unclear.'},
 {n:'Family history',g:0,m:'OR',e:3.23,lo:2.65,hi:3.93,s:.35,src:'first-degree relative',
  txt:'A first-degree relative with Parkinson\'s gave OR 3.23 (2.65 to 3.93), any relative OR 4.45 (3.39 to 5.83) and any relative with tremor OR 2.74 (2.10 to 3.57). [[Noyce2012]] See <a href="#genes" data-go="genes">Genes and inheritance</a>.'},
 {n:'Ever smoked',g:1,m:'RR',e:.59,lo:.54,hi:.63,s:.43,src:'48 studies',
  txt:'Against never smokers: ever smokers RR 0.59 (0.54 to 0.63), past smokers 0.80 (0.69 to 0.93), current smokers 0.39 (0.32 to 0.47); risk was lower per 10 pack-years (0.84 in case-control, 0.78 in cohort studies). [[Hernan2002]] A later meta-analysis gave current against never RR 0.44 (0.39 to 0.50). [[Noyce2012]]',cav:'Reverse causation: in a Danish study, people who found quitting easier were more likely to develop Parkinson\'s, which the authors read as an early sign of the disease. [[Ritz2014]] Not advice.'},
 {n:'Coffee',g:1,m:'RR',e:.69,lo:.59,hi:.8,s:.47,src:'meta-analysis',
  txt:'Coffee drinkers RR 0.69 (0.59 to 0.80) against non-drinkers. Per 3 cups a day, RR 0.75 in case-control and 0.68 (0.46 to 1.00) in cohort studies. [[Hernan2002]] A 2016 review lists caffeine with smoking, higher urate, physical activity and ibuprofen as linked to lower risk. [[Ascherio2016]]',cav:'An association, not advice.'},
 {n:'Highest urate (men)',g:1,m:'RR',e:.43,lo:.18,hi:1.02,s:.59,src:'Health Professionals cohort',
  txt:'In men, the highest against the lowest urate quartile gave RR 0.43 (0.18 to 1.02). Leaving out cases diagnosed within about 4 years of the blood draw gave RR 0.17 (0.04 to 0.69), which argues somewhat against reverse causation. [[Weisskopf2007]] Raising urate with inosine did not slow the disease in SURE-PD3. [[Schwarzschild2021]]',cav:'The main interval crosses 1.'},
 {n:'Moderate-to-vigorous activity',g:1,m:'RR',e:.71,lo:.58,hi:.87,s:.63,src:'8 prospective studies',
  txt:'Across 8 prospective studies (544,336 people, 2,192 cases), the most moderate-to-vigorous activity gave RR 0.71 (0.58 to 0.87) and the most total activity RR 0.79 (0.68 to 0.91); light activity was not linked (0.86, 0.60 to 1.23). Each extra 10 MET-hours a week was linked to 10% lower risk (total) and 17% (moderate-to-vigorous) in men, with no linear dose-response in women. [[Fang2018]]',cav:'Observational; the trials are below.'}
];
const RK_STEPS=[
 {from:0,at:.18,k:'Step 1 · Raises risk',t:'Pesticides and solvents',
  txt:'In the Agricultural Health Study, paraquat and rotenone were each linked to about two and a half times the odds of Parkinson\'s (OR 2.5). [[Tanner2011]] Exposure to the solvent trichloroethylene gave OR 6.1 in twins, with a very wide interval [[Goldman2012]], and veterans at Camp Lejeune, whose water held high TCE levels, had more Parkinson\'s than those at Camp Pendleton (OR 1.70). [[Goldman2023]]',
  pt:'Some farm chemicals and industrial solvents are linked to a higher chance of Parkinson\'s.',
  hook:'Paraquat (oxidative stress) and rotenone (complex I inhibitor): OR 2.5 each. TCE: OR 6.1 in twins. [[Tanner2011,Goldman2012]]'},
 {from:.21,at:.37,k:'Step 2 · Raises risk',t:'Head injury, dairy, drugs, melanoma, family',
  txt:'Head trauma with concussion OR 1.57 [[Jafari2013]]; low-fat dairy HR 1.34, though total dairy was not linked [[Hughes2017]]; methamphetamine or amphetamine use disorder HR 2.8 [[Curtin2015]]; melanoma OR 2.11 [[Liu2011]]; a first-degree relative with Parkinson\'s OR 3.23. [[Noyce2012]] A 2016 review lists pesticides, dairy, melanoma and traumatic brain injury as linked to higher risk. [[Ascherio2016]]',
  pt:'Concussion, some drugs, a family history and a few other things are linked to a higher chance. None of these makes Parkinson\'s certain.',
  hook:'Family history of Parkinson\'s in a first-degree relative: OR 3.23, the strongest factor in the Noyce meta-analysis. [[Noyce2012]]'},
 {from:.41,at:.5,k:'Step 3 · Linked to lower risk',t:'Smoking and coffee: association, not advice',
  txt:'Ever smokers had RR 0.59 and current smokers 0.39 against never smokers; coffee drinkers RR 0.69. [[Hernan2002]] These are associations from observational studies. They are not reasons to smoke or to drink coffee: the same 2016 review names promoting physical activity as the only intervention that currently seems justifiable for primary prevention. [[Ascherio2016]]',
  pt:'Smokers and coffee drinkers get Parkinson\'s less often in studies. That does not show that smoking or coffee protects the brain.',
  hook:'Smoking and caffeine are inversely associated with Parkinson\'s; reverse causation and confounding are possible.'},
 {from:.56,at:.68,k:'Step 4 · Linked to lower risk',t:'Urate and physical activity',
  txt:'Men with the highest urate had RR 0.43 (0.18 to 1.02) against the lowest. [[Weisskopf2007]] People with the most moderate-to-vigorous activity had RR 0.71 (0.58 to 0.87); light activity was not linked. [[Fang2018]] Both observations were later tested in trials, below.',
  pt:'Higher urate in the blood and regular vigorous exercise both go with a lower chance of Parkinson\'s in studies.'},
 {from:.76,at:.9,k:'Step 5 · Reading it carefully',t:'Association is not causation',
  txt:'Parkinson\'s starts years before diagnosis, and early disease can change behaviour. In a Danish study of 1,808 patients, former smokers who found quitting harder, or used nicotine substitutes, were less likely to develop Parkinson\'s; the authors interpret "ease of quitting" as an early sign of the disease. [[Ritz2014]] Constipation, anxiety and depression are linked to later Parkinson\'s but may be early features rather than causes. [[Noyce2012]] Trials of urate elevation and of isradipine, both chosen because of observational associations, showed no slowing. [[Schwarzschild2021,PSG2020STEADY]]',
  pt:'A link in a study can run backwards: the early, hidden disease may change what people do, rather than what they do changing the disease.',
  hook:'Reverse causation: prodromal Parkinson\'s may make quitting smoking easier (Ritz 2014).'}
];
const RK_TR=[
 {n:'SURE-PD3',obs:{l:'Highest against lowest urate quartile, men',m:'RR',e:.43,lo:.18,hi:1.02},inter:'inosine to raise urate',
  des:['298 people with early, untreated Parkinson\'s','and urate below 5.8 mg/dL; 58 US sites'],arms:[ ['Inosine',11.1,'var(--sky)'],['Placebo',9.9,'var(--muted)'] ],max:12,unit:'MDS-UPDRS I–III points a year (higher = faster worsening)',v:'Stopped early for futility',vc:'bad',
  note:{k:'Urate · SURE-PD3',t:'Raising urate did not slow it',txt:'Inosine raised urate by 2.03 mg/dL (44%), but MDS-UPDRS I to III worsened by 11.1 points a year on inosine and 9.9 on placebo (difference 1.26, 95% CI −0.59 to 3.11), and the trial stopped early for futility. Kidney stones occurred at 7.0 against 1.4 per 100 patient-years. [[Schwarzschild2021]] The idea came from cohort data in which higher urate went with lower risk. [[Weisskopf2007]]',pt:'Raising urate with a supplement did not slow Parkinson\'s, and it caused more kidney stones.',hook:'SURE-PD3 (inosine to raise urate): futile.'}},
 {n:'STEADY-PD III',obs:{l:'Calcium-channel blocker use',text:'inversely associated in a meta-analysis'},inter:'isradipine 5 mg twice a day',
  des:['336 people with early Parkinson\'s,','57 sites, 36 months'],arms:[ ['Isradipine',2.99,'var(--sky)'],['Placebo',3.26,'var(--muted)'] ],max:4,unit:'change in total UPDRS over 36 months (higher = worse)',v:'No effect (P = 0.85)',vc:'bad',
  note:{k:'Calcium-channel blockers · STEADY-PD III',t:'Isradipine had no effect',txt:'A meta-analysis found calcium-channel blockers inversely associated with Parkinson\'s. [[Noyce2012]] In STEADY-PD III, total UPDRS changed by 2.99 points on isradipine and 3.26 on placebo over 36 months (treatment effect −0.27, 95% CI −3.02 to 2.48, P = 0.85). Secondary outcomes showed no effect; oedema and dizziness were the commonest adverse effects. The authors note that the dose may not have engaged the target. [[PSG2020STEADY]]',pt:'A blood pressure medicine that looked promising in observational data did not slow Parkinson\'s in a trial.',hook:'STEADY-PD III (isradipine): negative.'}},
 {n:'SPARX',obs:{l:'Most moderate-to-vigorous activity',m:'RR',e:.71,lo:.58,hi:.87},inter:'treadmill 4 days a week, 80–85% of maximum heart rate',
  des:['128 people with untreated, newly diagnosed','Parkinson\'s, Hoehn and Yahr 1 to 2, phase 2'],arms:[ ['High intensity',.3,'var(--good)'],['Wait-list',3.2,'var(--muted)'] ],max:4,unit:'change in UPDRS motor score at 6 months (higher = worse)',v:'Only high intensity passed non-futility',vc:'good',
  note:{k:'Exercise · SPARX',t:'High-intensity treadmill',txt:'Over 6 months, the UPDRS motor score changed by 0.3 with high-intensity treadmill exercise (4 days a week at 80 to 85% of maximum heart rate) against 3.2 in wait-list controls (P = .03). Only the high-intensity arm met the non-futility threshold. [[Schenkman2018]] SPARX3 is now comparing 80–85% with 60–65% of maximum heart rate in 370 people; its status was "Active, not recruiting" with primary completion estimated for July 2027. [[SPARX3]]',pt:'People who did hard treadmill exercise four days a week had almost no worsening of movement scores over six months.',hook:'SPARX: only high-intensity treadmill exercise (80–85% HRmax) passed non-futility.'}},
 {n:'Park-in-Shape',obs:{l:'Most moderate-to-vigorous activity',m:'RR',e:.71,lo:.58,hi:.87},inter:'home aerobic cycling with gaming, 3 times a week',
  des:['130 sedentary people, Hoehn and Yahr 2 or lower,','on medication; against stretching, 6 months'],diff:{e:4.2,lo:1.6,hi:6.9,thr:3.5},unit:'off-medication MDS-UPDRS motor difference, points in favour of cycling',v:'Above the 3.5-point threshold',vc:'good',
  note:{k:'Exercise · Park-in-Shape',t:'Home cycling beat stretching',txt:'Home-based, remotely supervised aerobic cycling with gaming, 30 to 45 minutes 3 times a week for 6 months, improved the off-medication MDS-UPDRS motor score by 4.2 points (95% CI 1.6 to 6.9) compared with stretching. The pre-set clinically relevant threshold was 3.5. [[vanderKolk2019]]',pt:'Regular cycling at home, with a game to keep it going, helped movement more than stretching did.',hook:'Park-in-Shape: aerobic exercise beat stretching by 4.2 MDS-UPDRS motor points.'}}
];
inits.risk=()=>{
  /* ---------- 1. forest plot ---------- */
  const svg=$('#rkSvg'),rg=$('#rkT');let sel=-1;
  const LMIN=Math.log(.15),LMAX=Math.log(12);
  function draw(t){
    const N=vb(svg,'720 516','400 800');
    const P=N?{x0:26,x1:384,top:30,rh:44,hd:28,lx:16}:{x0:290,x1:578,top:30,rh:24.5,hd:26,lx:20};
    const X=v=>P.x0+(P.x1-P.x0)*(Math.log(clamp(v,.15,12))-LMIN)/(LMAX-LMIN);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* row positions */
    const Y=[];let y=P.top+P.hd;RK_F.forEach((f,i)=>{if(i===11)y+=P.hd+(N?6:4);Y.push(y);y+=P.rh});
    const yb=y+(N?-8:2);
    /* grid */
    const ticks=[.2,.5,1,2,5,10];
    if(!N)ticks.forEach(v=>{s+=`<path d="M${f1(X(v))} ${P.top+8}V${yb}" class="grid"/>`});
    ticks.forEach(v=>{s+=`<text x="${f1(X(v))}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
    if(!N)s+=`<path d="M${f1(X(1))} ${P.top+4}V${yb}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(1)-8)}" y="${yb+30}" class="t-xs t-end" style="fill:var(--sage);font-weight:700">← lower risk</text><text x="${f1(X(1)+8)}" y="${yb+30}" class="t-xs" style="fill:var(--bad);font-weight:700">higher risk →</text>`;
    /* section headers */
    const h1=ramp(t,0,.03),h2=ramp(t,.4,.44);
    s+=`<text x="${P.lx}" y="${P.top+8}" class="t-sm" style="fill:var(--bad);font-weight:700;opacity:${f1(.3+.7*h1)}">LINKED TO HIGHER RISK</text>`;
    s+=`<text x="${P.lx}" y="${f1(Y[11]-P.hd+(N?14:12))}" class="t-sm" style="fill:var(--sage);font-weight:700;opacity:${f1(.3+.7*h2)}">LINKED TO LOWER RISK</text>`;
    if(!N)s+=`<text x="700" y="${P.top+8}" class="t-xs t-end">ratio, 95% CI</text>`;
    /* rows */
    const rev=ramp(t,.78,.86);
    RK_F.forEach((f,i)=>{const p=ease(ramp(t,f.s,f.s+.06)),o=.18+.82*ramp(t,f.s-.01,f.s+.02),yy=Y[i],py=N?yy+24:yy,on=sel===i,col=f.g?'var(--sage)':'var(--bad)';
      s+=`<g data-rk="${i}" class="clk" style="opacity:${f1(o)}">`;
      s+=`<rect x="${P.lx-6}" y="${f1(N?yy-14:yy-13)}" width="${N?372:688}" height="${f1(N?P.rh-4:P.rh-2)}" rx="6" style="fill:${on?'var(--panel-2)':'transparent'};stroke:${on?'var(--ink)':'none'}"/>`;
      if(N){s+=`<text x="${P.lx}" y="${yy}" class="t-lbl" style="font-size:12.5px">${f.n}</text>`;
        [.2,.5,2,5,10].forEach(v=>{s+=`<path d="M${f1(X(v))} ${py-6}V${py+6}" class="grid"/>`});s+=`<path d="M${f1(X(1))} ${py-9}V${py+9}" style="stroke:var(--ink);stroke-width:1.3;stroke-dasharray:3 3"/>`}
      else s+=`<text x="${P.lx}" y="${yy+4}" class="t-lbl" style="font-size:12.5px">${f.n}</text><text x="${P.x0-14}" y="${yy+4}" class="t-xs t-end">${f.m}</text>`;
      if(p>0){const e=Math.exp(lerp(0,Math.log(f.e),p)),lo=Math.exp(lerp(0,Math.log(f.lo),p)),hi=Math.exp(lerp(0,Math.log(f.hi),p));
        s+=`<path d="M${f1(X(lo))} ${py}H${f1(X(hi))}M${f1(X(lo))} ${py-4}v8" style="stroke:${col};stroke-width:2.2"/>`;
        if(hi>12)s+=`<path d="M${f1(X(12))} ${py}l-7 -5v10z" style="fill:${col}"/>`;else s+=`<path d="M${f1(X(hi))} ${py-4}v8" style="stroke:${col};stroke-width:2.2"/>`;
        s+=`<rect x="${f1(X(e)-5)}" y="${py-5}" width="10" height="10" transform="rotate(45 ${f1(X(e))} ${py})" style="fill:${col};stroke:var(--panel);stroke-width:1"/>`;
        if(p>.9){const lab=`${f.e} (${f.lo}–${f.hi})`;s+=N?`<text x="384" y="${yy}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${f.m} ${lab}</text>`:`<text x="590" y="${yy+4}" class="t-xs" style="fill:var(--ink)">${lab}</text>`}}
      /* caveat badge */
      const cb=f.cav?ramp(t,f.s+.05,f.s+.08):0;
      if(cb>0&&!N)s+=`<g style="opacity:${f1(cb)}"><circle cx="700" cy="${yy}" r="7" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="700" y="${yy+3.5}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">!</text></g>`;
      s+='</g>'});
    /* reverse-causation overlay */
    if(rev>0){const ys=Y[11],py=N?ys+24:ys,xs=X(.59);
      const bx=X(1)+14;s+=`<g style="opacity:${f1(rev)}"><path d="M${f1(bx)} ${py}H${f1(xs+10)}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:4 3"/><path d="M${f1(xs+9)} ${py}l8 -5v10z" style="fill:var(--warn)"/>`;
      s+=`<rect x="${f1(bx)}" y="${py-10}" width="128" height="20" rx="6" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${f1(bx+8)}" y="${py+4}" class="t-xs" style="fill:var(--warn);font-weight:700">reverse causation?</text>`;
      s+=`<text x="${N?P.lx:P.lx}" y="${yb+(N?46:46)}" class="t-xs" style="fill:var(--ink);font-weight:700">Every row: an association, not proof of cause.</text></g>`}
    svg.innerHTML=s;
    const ph=phaseOf(RK_STEPS,t);setSt(ph);$('#rkNote').innerHTML=noteHTML(RK_STEPS[ph]);
  }
  function showFx(){
    const fx=$('#rkFx');
    if(sel<0){fx.innerHTML=`<div class="kicker">Pick a factor</div><h4>The evidence behind each row</h4><p>Choose a row in the plot or a button above to see the study, the numbers and the caveats.</p><div class="callout">${RK_GEN}</div>`;return}
    const f=RK_F[sel];
    fx.innerHTML=`<div class="kicker">${f.g?'Linked to lower risk':'Linked to higher risk'} · ${f.m} ${f.e} (95% CI ${f.lo} to ${f.hi}) · ${f.src}</div><h4>${f.n}</h4><p><span class="tag warn">Association, not causation</span></p><p>${f.txt}</p><div class="callout">${f.cav?'<b>Caveat.</b> '+f.cav+' ':''}${RK_GEN}</div>`;
  }
  function select(i){sel=sel===i?-1:i;$$('#rkBtns [data-rkb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.rkb===sel));draw(+rg.value);showFx()}
  $('#rkBtns').innerHTML='<span class="kicker">Evidence for</span>'+RK_F.map((f,i)=>`<button class="btn" data-rkb="${i}" aria-pressed="false">${f.n}</button>`).join('');
  $('#rkBtns').addEventListener('click',e=>{const b=e.target.closest('[data-rkb]');if(b)select(+b.dataset.rkb)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rk]');if(g)select(+g.dataset.rk)});
  const stop=playWire(rg,$('#rkPlay'),draw,16000,'Replay','risk');
  const setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);

  /* ---------- 2. association to trial ---------- */
  const tv=$('#rkTr'),tr=$('#rkTrT');let tri=0;
  function drawTr(t){
    const D=RK_TR[tri];
    const N=vb(tv,'720 300','400 520');
    const L=N?{ox:16,oy:16,ow:368,oh:150,ax:200,ay0:176,ay1:224,tx:16,ty:236,tw:368,th:270}:{ox:16,oy:20,ow:236,oh:258,ax0:262,ax1:316,ay:150,tx:322,ty:20,tw:382,th:258};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* observation */
    const oo=ease(ramp(t,0,.18));
    s+=`<g style="opacity:${f1(.25+.75*oo)}"><rect x="${L.ox}" y="${L.oy}" width="${L.ow}" height="${L.oh}" rx="12" style="fill:var(--panel);stroke:var(--line)"/><text x="${L.ox+14}" y="${L.oy+22}" class="t-xs" style="fill:var(--muted);font-weight:700">OBSERVATIONAL STUDIES</text>`;
    const lw=rkWrap(D.obs.l,N?44:30);lw.forEach((ln,j)=>{s+=`<text x="${L.ox+14}" y="${L.oy+42+j*16}" class="t-lbl" style="font-size:12.5px">${ln}</text>`});
    const by=L.oy+(N?100:150),bx0=L.ox+20,bx1=L.ox+L.ow-20,BX=v=>bx0+(bx1-bx0)*(Math.log(v)-Math.log(.15))/(Math.log(1.5)-Math.log(.15));
    if(D.obs.e){[.2,.5,1].forEach(v=>{s+=`<path d="M${f1(BX(v))} ${by-12}V${by+12}" class="grid"/><text x="${f1(BX(v))}" y="${by+26}" class="t-xs t-mid">${v}</text>`});
      s+=`<path d="M${f1(BX(1))} ${by-14}V${by+14}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`;
      const p=ease(ramp(t,.04,.18));if(p>0){const e=Math.exp(lerp(0,Math.log(D.obs.e),p)),lo=Math.exp(lerp(0,Math.log(D.obs.lo),p)),hi=Math.exp(lerp(0,Math.log(D.obs.hi),p));
        s+=`<path d="M${f1(BX(lo))} ${by}H${f1(BX(hi))}" style="stroke:var(--sage);stroke-width:2.4"/><circle cx="${f1(BX(e))}" cy="${by}" r="6" style="fill:var(--sage)"/>`;
        if(p>.9)s+=`<text x="${f1(BX(e))}" y="${by-16}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${D.obs.m} ${D.obs.e}</text>`}
      s+=`<text x="${L.ox+14}" y="${by+(N?44:48)}" class="t-xs">lower risk ← 1 → higher</text>`}
    else{s+=`<text x="${L.ox+14}" y="${by-4}" class="t-sm" style="fill:var(--sage);font-weight:700">${D.obs.text}</text><text x="${L.ox+14}" y="${by+14}" class="t-xs">no effect size given in the research</text>`}
    s+='</g>';
    /* arrow */
    const ar=ease(ramp(t,.2,.36));
    if(N){s+=`<path d="M${L.ax} ${L.ay0}V${f1(lerp(L.ay0,L.ay1,ar))}" style="stroke:var(--sky);stroke-width:3"/>`;if(ar>.9)s+=`<path d="M${L.ax-7} ${L.ay1-8}l7 9l7 -9z" style="fill:var(--sky)"/>`;s+=`<text x="${L.ax+14}" y="${(L.ay0+L.ay1)/2+4}" class="t-xs" style="fill:var(--sky);opacity:${f1(ar)}">tested in a randomised trial</text>`}
    else{s+=`<path d="M${L.ax0} ${L.ay}H${f1(lerp(L.ax0,L.ax1,ar))}" style="stroke:var(--sky);stroke-width:3"/>`;if(ar>.9)s+=`<path d="M${L.ax1-6} ${L.ay-7}l8 7l-8 7z" style="fill:var(--sky)"/>`;s+=`<text x="${(L.ax0+L.ax1)/2}" y="${L.ay-12}" class="t-xs t-mid" style="fill:var(--sky);opacity:${f1(ar)}">trial</text>`}
    /* trial */
    const to=ease(ramp(t,.3,.42));
    s+=`<g style="opacity:${f1(.25+.75*to)}"><rect x="${L.tx}" y="${L.ty}" width="${L.tw}" height="${L.th}" rx="12" style="fill:var(--panel);stroke:var(--sky)"/><text x="${L.tx+14}" y="${L.ty+22}" class="t-xs" style="fill:var(--sky);font-weight:700">RANDOMISED TRIAL · ${D.n.toUpperCase()}</text>`;
    s+=`<text x="${L.tx+14}" y="${L.ty+42}" class="t-lbl" style="font-size:12.5px">${D.inter.length>(N?48:54)?D.inter.slice(0,D.inter.indexOf(',')):D.inter}</text>`;
    D.des.forEach((ln,j)=>{s+=`<text x="${L.tx+14}" y="${L.ty+60+j*14}" class="t-xs">${ln}</text>`});
    const gy=L.ty+(N?112:110),gx0=L.tx+(N?126:120),gx1=L.tx+L.tw-50,gw=gx1-gx0,g=ease(ramp(t,.42,.78));
    if(D.arms){D.arms.forEach(([lab,v,col],j)=>{const y=gy+j*34,w=gw*v/D.max*g;
        s+=`<text x="${L.tx+14}" y="${y+13}" class="t-sm" style="fill:var(--ink);font-weight:600">${lab}</text><rect x="${gx0}" y="${y}" width="${gw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${gx0}" y="${y}" width="${f1(Math.max(1.5,w))}" height="18" rx="4" style="fill:${col}"/>`;
        if(g>.05)s+=`<text x="${f1(gx0+Math.max(1.5,w)+6)}" y="${y+13}" class="t-sm" style="fill:var(--ink);font-weight:700">${(v*g).toFixed(v<10?2:1).replace(/0$/,'')}</text>`});
      s+=`<text x="${L.tx+14}" y="${gy+86}" class="t-xs">${D.unit}</text>`}
    else{const d=D.diff,DX=v=>gx0+gw*v/8,y=gy+22;
      [0,2,4,6,8].forEach(v=>{s+=`<path d="M${f1(DX(v))} ${y-16}V${y+16}" class="grid"/><text x="${f1(DX(v))}" y="${y+30}" class="t-xs t-mid">${v}</text>`});
      s+=`<path d="M${f1(DX(d.thr))} ${y-20}V${y+18}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(DX(d.thr))}" y="${y-24}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">threshold 3.5</text>`;
      s+=`<text x="${L.tx+14}" y="${y+4}" class="t-sm" style="fill:var(--ink);font-weight:600">Cycling vs stretching</text>`;
      if(g>0){s+=`<path d="M${f1(DX(d.lo*g))} ${y}H${f1(DX(d.hi*g))}" style="stroke:var(--good);stroke-width:2.4"/><rect x="${f1(DX(d.e*g)-6)}" y="${y-6}" width="12" height="12" transform="rotate(45 ${f1(DX(d.e*g))} ${y})" style="fill:var(--good)"/>`;
        if(g>.9)s+=`<text x="${L.tx+14}" y="${y+22}" class="t-sm" style="fill:var(--good);font-weight:700">${d.e} (${d.lo}–${d.hi})</text>`}
      s+=`<text x="${L.tx+14}" y="${gy+86}" class="t-xs">${N?'MDS-UPDRS motor points in favour of cycling':'MDS-UPDRS motor points (off medication) in favour of cycling'}</text>`}
    const vo=ramp(t,.8,.9);
    if(vo>0){const vw=D.v.length*6.8+24,vx=L.tx+14,vy=L.ty+L.th-(N?40:36);
      s+=`<g style="opacity:${f1(vo)}" transform="rotate(-2 ${vx} ${vy})"><rect x="${vx}" y="${vy}" width="${f1(vw)}" height="24" rx="5" style="fill:var(--${D.vc}-soft);stroke:var(--${D.vc});stroke-width:1.6"/><text x="${f1(vx+12)}" y="${vy+16}" class="t-sm" style="fill:var(--${D.vc});font-weight:700">${D.v}</text></g>`}
    s+='</g>';
    tv.innerHTML=s;
    $('#rkTrNote').innerHTML=noteHTML(D.note);
    tv.setAttribute('aria-label',`${D.obs.l}: ${D.obs.e?D.obs.m+' '+D.obs.e:D.obs.text}. Tested in ${D.n} (${D.inter}). Result: ${D.v}.`);
    tr.setAttribute('aria-valuetext',`${D.n}: ${t<.3?'observation':t<.8?'trial result':'verdict, '+D.v}`);
  }
  playWire(tr,$('#rkTrPlay'),drawTr,7000,'Replay','risk');
  $('#rkTrBtns').addEventListener('click',e=>{const b=e.target.closest('[data-rktr]');if(!b)return;tri=+b.dataset.rktr;
    $$('[data-rktr]',$('#rkTrBtns')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    $('#rkTrCap').textContent=RK_TR[tri].diff?'Diamond: difference between groups; line: 95% CI; dashed line: the pre-set clinically relevant threshold.':'Bars are trial results as published. Higher scores mean more symptoms.';
    drawTr(+tr.value)});

  draw(+rg.value);showFx();drawTr(+tr.value);
};
function rkWrap(txt,n){const out=[];let ln='';txt.split(' ').forEach(w=>{if((ln+' '+w).trim().length>n){out.push(ln);ln=w}else ln=(ln+' '+w).trim()});if(ln)out.push(ln);return out}
