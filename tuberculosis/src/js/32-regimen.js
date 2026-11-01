/* =============== 3.2 Treating TB disease =============== */
const RG_DC={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)',P:'var(--dR)',M:'var(--dNew)'};
const RG_REG={
 std:{n:'6 months · 2HRZE/4HR',W:26,conv:{k:-Math.log(1-.634)/8,a:63.4,lbl:'63.4% at 8 wk'},
  ph:[{n:'Intensive',w:8,d:['H','R','Z','E'],c:'var(--rx)'},{n:'Continuation',w:18,d:['H','R'],c:'var(--accent)'}]},
 hpzm:{n:'4 months · 2HPMZ/2HPM',W:17,conv:{k:-Math.log(1-.785)/8,a:78.5,lbl:'78.5% at 8 wk'},
  ph:[{n:'Intensive',w:8,d:['H','P','M','Z'],c:'var(--rx)'},{n:'Continuation',w:9,d:['H','P','M'],c:'var(--accent)'}]},
 shine:{n:'4 months · 2HRZ(E)/2HR',W:16,conv:null,
  ph:[{n:'Intensive',w:8,d:['H','R','Z','E'],c:'var(--rx)',opt:'E'},{n:'Continuation',w:8,d:['H','R'],c:'var(--accent)'}]}
};
const RG_ST={
 std:[
  {from:0,at:.3/26,k:'Week 0',t:'Starting treatment',
   txt:`WHO recommends that new patients with pulmonary TB receive a regimen with 6 months of rifampicin, 2HRZE/4HR (strong recommendation, high certainty), given daily. It also applies to most extrapulmonary TB. ATS/CDC/IDSA recommends starting empiric multidrug treatment in almost all situations where active TB is suspected. People with HIV should start antiretroviral therapy as soon as possible, within 2 weeks of starting TB treatment, whatever the CD4 count. [[WHO-Mod4-2025,Nahid2016]]`,
   pt:`Treatment starts with four medicines every day, often combined into a few tablets. In most countries it is free through the national TB programme.`,
   hook:`2HRZE/4HR: numbers are months, letters are drugs. 2 months of H, R, Z and E, then 4 months of H and R. [[WHO-Mod4-2025]]`},
  {from:1/26,at:4/26,k:'Weeks 1–8',t:'Intensive phase: four drugs',
   txt:`The intensive phase kills most bacilli and protects against resistance while the bacterial load is high (see <a href="#drugs" data-go="drugs">How TB drugs work</a>). Daily dosing matters: WHO advises against thrice-weekly dosing, and in Union Study A, 85% of people were culture-negative at 2 months with daily dosing against 77% with a thrice-weekly intensive phase. [[WHO-Mod4-2025,Jindani2004]]`,
   pt:`Most people start to feel better within a few weeks. That is the medicine working, not a sign that it can stop.`,
   hook:`WHO: daily dosing throughout (strong, high certainty). Thrice-weekly throughout carried 3.3 times the acquired-resistance rate. [[WHO-Mod4-2025]]`},
  {from:7.5/26,at:8.2/26,k:'Week 8',t:'The two-month check',
   txt:`Sputum is checked again around the end of the intensive phase. On the 6-month control in Study 31, 63.4% had a negative liquid culture by 8 weeks; on solid media with daily dosing in Union Study A, 85% did at 2 months. A positive 2-month culture predicts relapse poorly: pooled sensitivity 40%, specificity 85%. WHO recommends against extending the intensive phase when the smear is still positive at its end (strong, high certainty). [[Dorman2021,Jindani2004,Horne2010,WHO-Mod4-2025]]`,
   pt:`A sputum test at about two months shows whether the germs are clearing. A positive result is a reason to look closer, not proof that treatment is failing.`,
   hook:`2-month culture: specific but insensitive for relapse (sensitivity 40%, specificity 85%). [[Horne2010]]`},
  {from:9/26,at:17/26,k:'Weeks 9–26',t:'Continuation: isoniazid and rifampicin',
   txt:`Pyrazinamide and ethambutol stop. Isoniazid and rifampicin continue for 4 months to kill the slow persisters. Across 57 trials (21,472 people), using rifampicin only for the first 1 to 2 months meant more failure, relapse and acquired resistance. Relapse with fully susceptible TB was 8.2% after 2-month rifampicin regimens and 3.1% after 6-month ones. In Union Study A, 2EHRZ/6HE (no rifampicin after month 2) had 10% unfavourable outcomes against 5% with 2EHRZ/4HR. [[Menzies2009,WHO-Mod4-2025,Jindani2004]]`,
   pt:`Feeling well is not the same as being cured. The last months clear the germs that are still hiding; stopping early can bring TB back.`,
   hook:`Rifampicin for the full 6 months: about 112 relapses averted per 1,000 people treated. [[WHO-Mod4-2025]]`},
  {from:25.6/26,at:1,k:'Week 26',t:'Treatment completed',
   txt:`Worldwide, treatment success for drug-susceptible TB on first-line regimens was 88% in the 2023 cohort, up from 81% in 2016. In Union Study A, 5% of people on 2EHRZ/4HR had an unfavourable outcome 12 months after treatment ended. These are population figures, not a prediction for any one person. [[WHO-GTR2025,Jindani2004]]`,
   pt:`About 9 in 10 people treated for TB finish treatment successfully. Finishing the full course is what cures it.`,
   hook:`Global treatment success: 88% for drug-susceptible TB, 71% for MDR/RR-TB. [[WHO-GTR2025]]`}],
 hpzm:[
  {from:0,at:.3/17,k:'Week 0',t:'Who can take 4 months',
   txt:`WHO recommendation 2.1: people aged 12 years or older with drug-susceptible pulmonary TB may receive 2HPMZ/2HPM (conditional, moderate certainty), and ATS/CDC/ERS/IDSA adopted it in 2025. Not covered, because Study 31 did not include them: people under 40 kg; TB meningitis, disseminated, osteoarticular or abdominal TB; HIV with CD4 below 100 cells/mm³; children under 12; and pregnant, breastfeeding or postpartum women. Fluoroquinolone susceptibility testing should come first. A baseline ECG is not required unless clinically indicated. [[WHO-Mod4-2025,Saukkonen2025]]`,
   pt:`Some people aged 12 and over can take a 4-month treatment instead of 6. The team first checks that the germ is not resistant to moxifloxacin.`,
   hook:`2HPMZ/2HPM: age ≥12, weight ≥40 kg; not for CD4 &lt;100, pregnancy, or meningitis, bone or disseminated TB. [[WHO-Mod4-2025]]`},
  {from:1/17,at:4/17,k:'Weeks 1–8',t:'Intensive phase: H, P, M and Z',
   txt:`As tabulated by ATS/CDC/ERS/IDSA for adults: isoniazid 300 mg, rifapentine 1,200 mg and moxifloxacin 400 mg daily for 17 weeks, and pyrazinamide daily for 8 weeks by weight (1,000 mg at 40 to &lt;55 kg, 1,500 mg at ≥55 to 75 kg, 2,000 mg above 75 kg), 7 days a week with food, avoiding milk, antacids and other cations. Pyridoxine 25 to 50 mg/day is listed with isoniazid. WHO explains the flat 1,200 mg rifapentine dose: weight does not significantly change its clearance, and food raises absorption. [[Saukkonen2025,WHO-Mod4-2025]]`,
   pt:`Rifapentine is a long-acting cousin of rifampicin and is taken with food. Rifampicin and rifapentine are different medicines and are not swapped for each other.`,
   hook:`Rifapentine with food; rifampin on an empty stomach. Rifapentine half-life 13.19 h, rifampin 3.35 h. [[FDA-Priftin,FDA-Rifampin]]`},
  {from:7.5/17,at:8.2/17,k:'Week 8',t:'Faster culture conversion',
   txt:`By 8 weeks, liquid cultures were negative in 78.5% on rifapentine-moxifloxacin, 74.2% on rifapentine without moxifloxacin and 63.4% on the 6-month control. Faster conversion did not guarantee cure: both rifapentine arms converted faster, but only the one with moxifloxacin was non-inferior. In REMoxTB, moxifloxacin regimens also cut bacterial load faster yet failed non-inferiority at 4 months. [[Dorman2021,Gillespie2014]]`,
   pt:`The germs disappeared from sputum faster with this treatment. But a quick early result is not enough on its own: what counts is whether TB stays away.`,
   hook:`Culture conversion is a surrogate. Study 31's rifapentine-only arm converted faster but was not non-inferior. [[Dorman2021]]`},
  {from:9/17,at:13/17,k:'Weeks 9–17',t:'Continuation: H, P and M',
   txt:`Pyrazinamide stops at week 8; isoniazid, rifapentine and moxifloxacin continue for 9 more weeks. Grade 3 or higher adverse events were similar: 18.8% against 19.3% on control. Grade 3 or higher bilirubin rises were more frequent (3.3% vs 1.0%), while cases meeting Hy's law were spread evenly. About 90% of the medicine cost is rifapentine, and with no fixed-dose combination the daily pill count is higher than with the 6-month regimen. [[Dorman2021,WHO-Mod4-2025]]`,
   pt:`Shorter treatment means more tablets each day and a more expensive medicine, which is one reason it is not yet used everywhere.`,
   hook:`WHO's recommendation is conditional because of cost, pill burden, the need for fluoroquinolone testing and untested groups. [[WHO-Mod4-2025]]`},
  {from:16.6/17,at:1,k:'Week 17',t:'Treatment completed: 9 weeks sooner',
   txt:`Study 31 randomised 2,516 people in 13 countries. Unfavourable outcomes were 15.5% with rifapentine-moxifloxacin against 14.6% with the 6-month control: a difference of 1.0 point (95% CI −2.6 to 4.5), inside the 6.6-point non-inferiority margin. WHO's review found cure in 84.5% against 85.4% (RR 0.99). The trial used in-person DOT at least 5 days a week. [[Dorman2021,WHO-Mod4-2025]]`,
   pt:`For people who can take it, the 4-month treatment worked about as well as the 6-month one.`,
   hook:`Study 31: 15.5% vs 14.6% unfavourable; margin 6.6 points. Non-inferior. [[Dorman2021]]`}],
 shine:[
  {from:0,at:.3/16,k:'Week 0',t:'Non-severe TB in children',
   txt:`WHO recommendation 2.2: children and adolescents aged 3 months to 16 years with non-severe TB, without suspected or confirmed drug resistance, should receive 2HRZ(E)/2HR (strong, moderate certainty); ATS/CDC/ERS/IDSA made the same strong recommendation. Non-severe means peripheral lymph node TB, intrathoracic lymph node TB without airway obstruction, uncomplicated pleural effusion, or paucibacillary non-cavitary disease confined to one lobe without a miliary pattern. Other children receive 2HRZE/4HR or the regimens for severe extrapulmonary TB. [[WHO-Mod4-2025,Saukkonen2025]]`,
   pt:`Many children with mild TB need only 4 months of treatment instead of 6.`,
   hook:`SHINE regimen: 3 months to 16 years, non-severe TB only. [[WHO-Mod4-2025]]`},
  {from:1/16,at:4/16,k:'Weeks 1–8',t:'Intensive phase: H, R, Z (± E)',
   txt:`As tabulated by ATS/CDC/ERS/IDSA for children: isoniazid 10 to 15 mg/kg and rifampin 10 to 20 mg/kg for 16 weeks, with pyrazinamide 35 (30 to 40) mg/kg and ethambutol 20 (15 to 25) mg/kg for the first 8 weeks, ethambutol included or not according to local guidelines. WHO recommends it in settings with high HIV prevalence or high isoniazid resistance. The US ethambutol label does not recommend it under 13 years; WHO and ATS/CDC/ERS/IDSA dose it for children. [[Saukkonen2025,WHO-Mod4-2025,FDA-Ethambutol]]`,
   pt:`Children take child-friendly combined tablets, dosed by weight.`,
   hook:`Ethambutol in young children: label says not under 13; guidelines include it where HIV or isoniazid resistance is common. [[FDA-Ethambutol,WHO-Mod4-2025]]`},
  {from:7.5/16,at:8.2/16,k:'Week 8',t:'Most side effects come early',
   txt:`In SHINE, 95 children (8%) had a grade 3 or higher adverse event, including 15 adverse drug reactions, 11 of them affecting the liver. All but 2 of the liver events happened in the first 8 weeks, when both groups were on the same treatment. [[Turkova2022]]`,
   pt:`If a medicine upsets a child's liver, it is usually in the first two months. Yellow eyes, dark urine or tummy pain should be reported straight away.`,
   hook:`SHINE: 11 of 15 adverse drug reactions were hepatic, almost all in the first 8 weeks. [[Turkova2022]]`},
  {from:9/16,at:12/16,k:'Weeks 9–16',t:'Continuation: H and R',
   txt:`SHINE randomised 1,204 children under 16 (median age 3.5 years; 11% with HIV) in African countries and India to 16 or 24 weeks of standard first-line treatment, using WHO paediatric fixed-dose combinations. The 4-month group stops here, at 16 weeks. [[Turkova2022]]`,
   pt:`Two more months of two medicines, then the course is complete.`,
   hook:`SHINE: 16 vs 24 weeks, 1,204 children, median age 3.5 years. [[Turkova2022]]`},
  {from:15.6/16,at:1,k:'Week 16',t:'Treatment completed',
   txt:`Primary events (an unfavourable outcome) occurred in 16 children (3%) in the 4-month group and 18 (3%) in the 6-month group: an adjusted difference of −0.4 points (95% CI −2.2 to 1.5). Four months was as good as six for non-severe TB. [[Turkova2022]]`,
   pt:`Children with mild TB did as well with 4 months as with 6.`,
   hook:`SHINE: 3% events in both arms. [[Turkova2022]]`}]
};
const RG_SUP={
 sat:`<p><b>Self-administered treatment.</b> In a Cochrane review of 11 trials (5,662 people), cure with self-administered treatment ranged from 41% to 67%, and direct observation did not substantially improve cure (RR 1.08, 95% CI 0.91 to 1.27) or completion (RR 1.07). A broader meta-analysis of 129 studies, including cohort studies, linked self-administration with lower treatment success (randomised trials: RR 0.94) and, in cohort studies, with more acquired drug resistance (RR 4.19). [[Karumbi2015,Alipanah2018]]</p><p class="stage-cap">Status: unresolved. Practice is moving toward person-centred support chosen with the person.</p>`,
 dot:`<p><b>Directly observed treatment (DOT).</b> ATS/CDC/ERS/IDSA says DOT and integrated case management remain the standard of care, and Study 31 used in-person DOT at least 5 of 7 days a week. WHO conditionally recommends community- or home-based treatment support over facility-based or unsupported treatment. [[Saukkonen2025,Dorman2021,WHO-Mod4-2025]]</p><p class="stage-cap">A health worker may watch the doses being taken. This is support, not suspicion.</p>`,
 vot:`<p><b>Video-observed treatment (VOT).</b> In an English trial of 226 people (58% with a history of homelessness, prison, drug or alcohol use or mental illness), 70% on smartphone VOT completed at least 80% of scheduled observations in the first 2 months, against 31% on DOT (adjusted OR 5.48). WHO says video-supported treatment can replace in-person support when the technology can be run well. [[Story2019,WHO-Mod4-2025]]</p><p class="stage-cap">Doses are recorded on a phone at a time that suits the person, without a daily trip to a clinic.</p>`
};
const RG_TR={
 s31:{t:'Study 31 / A5349',sub:'2,516 randomised in 13 countries; microbiologically eligible population',ci:'95% CI',mg:6.6,mx:25,
  arms:[{n:'6-month control (2HRZE/4HR)',v:14.6},{n:'4-month rifapentine + moxifloxacin',v:15.5,d:1.0,lo:-2.6,hi:4.5},{n:'4-month rifapentine, no moxifloxacin',v:17.7,d:3.0,lo:-.6,hi:6.6}],
  note:{k:'Dorman 2021, NEJM',t:'Non-inferior with moxifloxacin',txt:`Unfavourable outcomes were 15.5% with rifapentine-moxifloxacin against 14.6% with control: 1.0 point (95% CI −2.6 to 4.5), entirely below the 6.6-point margin. Without moxifloxacin, 17.7%: 3.0 points (−0.6 to 6.6), with the upper limit touching the margin, so non-inferiority was not shown. Grade 3 or higher adverse events were 18.8%, 19.3% and 14.3%. [[Dorman2021]]`,
   pt:`Adding moxifloxacin made the difference between a 4-month treatment that worked as well as 6 months and one that did not.`,hook:`Non-inferiority needs the <b>upper</b> limit of the CI below the margin. [[Dorman2021]]`}},
 shine:{t:'SHINE',sub:'1,204 children under 16 with non-severe TB',ci:'95% CI',mg:null,mx:25,
  arms:[{n:'6 months (24 weeks)',v:18/6.02,l:'18 children (3%)'},{n:'4 months (16 weeks)',v:16/6.02,l:'16 children (3%)',d:-.4,lo:-2.2,hi:1.5}],
  note:{k:'Turkova 2022, NEJM',t:'Four months for mild TB in children',txt:`Primary events: 16 children (3%) with 4 months and 18 (3%) with 6 months, an adjusted difference of −0.4 points (95% CI −2.2 to 1.5). The trial used WHO paediatric fixed-dose combinations; median age was 3.5 years and 11% had HIV. The margin is not drawn because the sources used for this guide do not quote it. [[Turkova2022]]`,
   pt:`In children with mild TB, the shorter course gave the same results.`,hook:`SHINE: 2HRZ(E)/2HR, WHO strong recommendation for 3 months to 16 years. [[WHO-Mod4-2025,Turkova2022]]`}},
 trunc:{t:'TRUNCATE-TB',sub:'674 participants; a strategy of 8 weeks first, then extend or retreat as needed',ci:'97.5% CI',mg:12,mx:25,
  arms:[{n:'Standard 24 weeks',v:3.9,l:'3.9% · mean 180 days'},{n:'Bedaquiline-linezolid strategy',v:5.8,l:'5.8% · mean 85 days',d:.8,lo:-3.4,hi:5.1},{n:'High-dose rifampin-linezolid strategy',v:11.4,l:'11.4% · mean 106 days',d:7.4,lo:1.7,hi:13.2}],
  note:{k:'Paton 2023, NEJM',t:'Shorter on average, more retreatment',txt:`Primary events (death, ongoing treatment or active disease at week 96) were 3.9% with standard treatment and 5.8% with the bedaquiline-linezolid strategy, which met non-inferiority (0.8 points, 97.5% CI −3.4 to 5.1; margin 12). The rifampin-linezolid strategy did not (7.4 points, 1.7 to 13.2). Across the strategy groups, 17.0% needed retreatment, against 3.3% with standard treatment. <span class="ev early">Early evidence</span> [[Paton2023]]`,
   pt:`Most people did well with about 3 months, but some needed a second course. It is a research strategy, not a standard regimen.`,hook:`TRUNCATE-TB tests a strategy, not a fixed regimen; not in WHO Module 4 (2025). [[Paton2023]]`}},
 fail:{t:'Earlier 4-month trials',sub:'REMoxTB, OFLOTUB and RIFAQUIN: per-protocol or primary results',ci:'95% CI',mg:null,mx:25,
  arms:[{n:'REMoxTB · control',v:8},{n:'REMoxTB · moxifloxacin for ethambutol',v:15},{n:'REMoxTB · moxifloxacin for isoniazid',v:20},{n:'OFLOTUB · control',v:17.2},{n:'OFLOTUB · 4-month gatifloxacin',v:21.0,d:3.5,lo:-.7,hi:7.7},{n:'RIFAQUIN · control',v:4.9},{n:'RIFAQUIN · 4-month moxifloxacin + rifapentine',v:18.2}],
  note:{k:'The background to Study 31',t:'Why 4 months took so long',txt:`REMoxTB (1,931 people): favourable outcomes were 85% and 80% in the moxifloxacin arms against 92% with control, so the bars show 15%, 20% and 8% unfavourable; non-inferiority was not shown. OFLOTUB (1,836): 21.0% vs 17.2% unfavourable, with recurrence 14.6% vs 7.1%. RIFAQUIN (827): 18.2% vs 4.9%, although a 6-month weekly rifapentine-moxifloxacin arm was non-inferior at 3.2%. [[Gillespie2014,Merle2014,Jindani2014]]`,
   pt:`Several earlier attempts to shorten treatment to 4 months failed before Study 31 succeeded.`,hook:`REMoxTB: moxifloxacin sped up bacterial kill but did not allow 4 months. Moxifloxacin reaches caseum poorly. [[Gillespie2014,Prideaux2015]]`}}
};

inits.regimen=()=>{
  const svg=$('#rgSvg'),rg=$('#rgT');let reg='std',sup='dot',setSt=()=>{};
  function phone(x,y,s){return `<rect x="${f1(x-s*.3)}" y="${f1(y-s*.5)}" width="${f1(s*.6)}" height="${f1(s)}" rx="${f1(s*.08)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/><rect x="${f1(x-s*.24)}" y="${f1(y-s*.4)}" width="${f1(s*.48)}" height="${f1(s*.7)}" style="fill:var(--accent-soft)"/><circle cx="${f1(x)}" cy="${f1(y-s*.08)}" r="${f1(s*.1)}" style="fill:var(--accent)"/>`}
  function draw(t){
    const N=vb(svg,'720 410','400 386');const R=RG_REG[reg],W=R.W,w=t*W;let s='';
    const L=N?{x0:36,P:13.4,ty:18,by:28,cy:58,Y:186,ax:198,c0:216,c1:356,ry:388}:{x0:60,P:16.4,ty:22,by:32,cy:64,Y:204,ax:218,c0:236,c1:388,ry:0};
    const X=wk=>L.x0+wk*L.P;
    s+=`<text x="${L.x0}" y="${L.ty}" class="t-big">${R.n}</text>`;
    /* ghost of the 6-month length, for comparison */
    if(reg!=='std')s+=`<rect x="${f1(X(W))}" y="${L.by}" width="${f1(X(26)-X(W))}" height="${f1(L.Y-L.by+4)}" rx="6" style="fill:none;stroke:var(--line);stroke-dasharray:4 4"/><text x="${f1((X(W)+X(26))/2)}" y="${f1(L.Y-50)}" class="t-xs t-mid">${N?'':'6-month '}standard</text><text x="${f1((X(W)+X(26))/2)}" y="${f1(L.Y-38)}" class="t-xs t-mid">ends wk 26</text>`;
    let w0=0;R.ph.forEach((p,pi)=>{const xa=X(w0),xb=X(w0+p.w),act=w>=w0&&w<w0+p.w;
      s+=`<rect x="${f1(xa)}" y="${L.by}" width="${f1(xb-xa-2)}" height="14" rx="4" style="fill:${p.c};opacity:${act||w>=W?1:.45}"/><text x="${f1(xa+6)}" y="${L.by+10.5}" class="t-xs" style="fill:#fff;font-weight:700">${(p.n+' · '+p.w+' wk').toUpperCase()}</text>`;
      p.d.forEach((d,i)=>{s+=pill(xa+11+i*(N?19:22),L.cy-4,N?16:19,RG_DC[d],{label:d,op:(p.opt===d?.55:1)*(act?1:.5)})});
      if(p.opt)s+=`<text x="${f1(xa+11+p.d.length*(N?19:22))}" y="${L.cy}" class="t-xs">(E: local policy)</text>`;
      const taken=clamp(Math.floor((w-w0)*7+1e-6),0,p.w*7),s2=L.P/1.28;
      s+=`<g transform="translate(${f1(xa+2)} ${L.Y}) rotate(-90)">${blister(0,0,7,p.w,taken,{s:s2,col:p.c})}</g>`;
      w0+=p.w});
    s+=`<text x="${L.x0-6}" y="${L.Y-4}" class="t-xs t-end">Mon</text><text x="${L.x0-6}" y="${f1(L.Y-6.5*L.P)}" class="t-xs t-end">Sun</text>`;
    for(let k=0;k<=26;k+=2){if(k>W&&k!==26)continue;s+=`<text x="${f1(X(k))}" y="${L.ax}" class="t-xs t-mid" style="${k>W?'opacity:.5':''}">${k}</text>`}
    s+=`<text x="${f1(X(26))}" y="${L.ax+12}" class="t-xs t-end">weeks</text>`;
    /* chart */
    const V=v=>lerp(L.c1,L.c0,v/100);
    [0,50,100].forEach(v=>s+=`<line x1="${L.x0}" x2="${f1(X(26))}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    const sym=u=>100*Math.exp(-u/3.2)*(u<W?1:0)+(u<W?0:0);
    const pth=(f,end)=>{let p='';const n=Math.max(2,Math.round(end*4));for(let i=0;i<=n;i++){const u=end*i/n;p+=(i?'L':'M')+f1(X(u))+' '+f1(V(f(u)))}return p};
    s+=`<path d="${pth(u=>100*Math.exp(-u/3.2),Math.min(w,W))}" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
    if(R.conv){const cf=u=>100*(1-Math.exp(-R.conv.k*u));s+=`<path d="${pth(cf,Math.min(w,W))}" style="fill:none;stroke:var(--rx);stroke-width:2.8"/>`;
      if(w>=8)s+=`<circle cx="${f1(X(8))}" cy="${f1(V(R.conv.a))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(8)+9)}" y="${f1(V(R.conv.a)+12)}" class="t-xs" style="fill:var(--ink)">${R.conv.lbl}</text>`;
      if(reg==='hpzm'&&w>=8){const k0=-Math.log(1-.634)/8;s+=`<path d="${pth(u=>100*(1-Math.exp(-k0*u)),Math.min(w,W))}" style="fill:none;stroke:var(--rx);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7"/><circle cx="${f1(X(8))}" cy="${f1(V(63.4))}" r="4" style="fill:none;stroke:var(--muted);stroke-width:1.2"/><text x="${f1(X(8)+9)}" y="${f1(V(63.4)+12)}" class="t-xs">control 63.4%</text>`}}
    else s+=`<text x="${f1(X(1))}" y="${f1(V(72))}" class="t-xs">${N?'few bacilli: no culture curve':'paucibacillary disease: no culture curve drawn'}</text>`;
    s+=`<line x1="${f1(X(Math.min(w,W)))}" x2="${f1(X(Math.min(w,W)))}" y1="${L.by}" y2="${L.c1}" style="stroke:var(--ink);opacity:.3"/>`;
    /* legend */
    const lgy=N?L.c1+16:L.c1+18;
    s+=`<line x1="${L.x0}" x2="${L.x0+16}" y1="${lgy-3}" y2="${lgy-3}" style="stroke:var(--brand);stroke-width:2.4"/><text x="${L.x0+22}" y="${lgy}" class="t-xs">symptoms (schematic)</text>`;
    s+=`<line x1="${L.x0+(N?160:170)}" x2="${L.x0+(N?176:186)}" y1="${lgy-3}" y2="${lgy-3}" style="stroke:var(--rx);stroke-width:2.8"/><text x="${L.x0+(N?182:192)}" y="${lgy}" class="t-xs">culture-negative (Study 31)</text>`;
    /* side panel: progress, support */
    const done=w>=W-.001,days=Math.min(W*7,Math.floor(w*7+1e-6));
    const PX=N?18:500,PY=N?L.ry+8:250;
    if(!N){s+=`<rect x="${PX}" y="${L.by}" width="208" height="${L.Y-L.by+4}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${PX+14}" y="${L.by+24}" class="t-sm">WEEK</text><text x="${PX+14}" y="${L.by+58}" style="font:800 34px var(--display);fill:var(--ink)">${Math.min(W,Math.floor(w)+(done?0:1))}<tspan class="t-sm" dx="6">of ${W}</tspan></text>`;
      s+=`<text x="${PX+14}" y="${L.by+84}" class="t-sm">daily doses taken: <tspan style="fill:var(--ink);font-weight:700">${days}</tspan> / ${W*7}</text>`;
      if(R.conv)s+=`<text x="${PX+14}" y="${L.by+102}" class="t-sm">culture-negative: <tspan style="fill:var(--rx);font-weight:700">${Math.round(100*(1-Math.exp(-R.conv.k*Math.min(w,W))))}%</tspan></text>`;
      const sx=PX+40,sy=L.by+118;s+=person(sx,sy,40,'var(--brand)');
      if(sup==='dot')s+=person(sx+46,sy,40,'var(--rx)',{face:-1})+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">health worker watches</text>`;
      else if(sup==='vot')s+=phone(sx+46,sy+18,30)+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">dose filmed on a phone</text>`;
      else s+=pill(sx+40,sy+22,20,'var(--rx)',{ang:-30})+`<text x="${sx+23}" y="${sy+54}" class="t-xs t-mid">takes doses at home</text>`}
    if(done){const bx=N?200:X(W/2),by=N?L.Y-58:L.Y-60;
      s+=`<g transform="rotate(-6 ${f1(bx)} ${f1(by)})"><rect x="${f1(bx-(N?120:132))}" y="${f1(by-20)}" width="${N?240:264}" height="40" rx="8" style="fill:var(--panel);stroke:var(--good);stroke-width:3;opacity:.95"/><text x="${f1(bx)}" y="${f1(by+7)}" class="t-big t-mid" style="fill:var(--good)">TREATMENT COMPLETED</text></g>`}
    svg.innerHTML=s;
    const ph=phaseOf(RG_ST[reg],t);setSt(ph);$('#rgNote').innerHTML=noteHTML(RG_ST[reg][ph]);
    const cur=R.ph[w<R.ph[0].w?0:1];
    $('#rgRead').innerHTML=`<span>week <b>${f1(Math.min(w,W))}</b> of ${W}</span><span>phase <b>${done?'completed':cur.n.toLowerCase()}</b></span><span>drugs <b>${done?'none':cur.d.join(' ')}</b></span><span>doses taken <b>${days}</b> / ${W*7}</span>${N&&R.conv?`<span>culture-negative <b>${Math.round(100*(1-Math.exp(-R.conv.k*Math.min(w,W))))}%</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#rgPlay'),draw,20000,'%t:player.replay%','regimen');
  function wire(){const old=$('#rgSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,RG_ST[reg],rg,draw,stop)}
  $$('[data-rgr]').forEach(b=>b.addEventListener('click',()=>{stop();reg=b.dataset.rgr;$$('[data-rgr]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  const supW=()=>{$('#rgSup').innerHTML=RG_SUP[sup]};
  $$('[data-rgs]').forEach(b=>b.addEventListener('click',()=>{sup=b.dataset.rgs;$$('[data-rgs]').forEach(x=>x.setAttribute('aria-pressed',x===b));supW();draw(+rg.value)}));
  wire();supW();draw(+rg.value);

  /* ---- trial comparator ---- */
  const ts=$('#rgTrial');let tr='s31';
  function drawT(){const N=vb(ts,'720 300','400 560');const T=RG_TR[tr],n=T.arms.length;let s='';
    const B=N?{x0:16,x1:384,y0:44,y1:290}:{x0:16,x1:350,y0:44,y1:288};
    const F=N?{x0:40,x1:370,y0:338,y1:530}:{x0:400,x1:700,y0:44,y1:258};
    s+=`<text x="${B.x0}" y="18" class="t-lbl">${T.t}</text><text x="${B.x0}" y="33" class="t-xs">${T.sub}</text>`;
    const rh=Math.min(66,(B.y1-B.y0)/n),bx=v=>B.x0+(B.x1-B.x0-60)*v/T.mx;
    T.arms.forEach((a,i)=>{const y=B.y0+i*rh+12,ctl=a.d==null;
      s+=`<text x="${B.x0}" y="${f1(y)}" class="t-xs" style="fill:var(--ink)">${a.n}</text>`;
      s+=`<rect x="${B.x0}" y="${f1(y+5)}" width="${f1(bx(a.v)-B.x0)}" height="${f1(Math.min(16,rh-24))}" rx="3" style="fill:${ctl?'var(--muted)':'var(--rx)'};opacity:${ctl?.55:.9}"/>`;
      s+=`<text x="${f1(bx(a.v)+6)}" y="${f1(y+5+Math.min(16,rh-24)/2+3.5)}" class="t-xs" style="fill:var(--ink)">${a.l||f1(a.v)+'%'}</text>`});
    s+=`<text x="${B.x0}" y="${N?B.y1+8:B.y1+8}" class="t-xs">unfavourable outcome, % of arm</text>`;
    /* forest */
    const fx=v=>lerp(F.x0,F.x1,(v+5)/20);
    s+=`<text x="${F.x0}" y="${F.y0-24}" class="t-sm">DIFFERENCE vs STANDARD · ${T.ci}</text>`;
    [-5,0,5,10,15].forEach(v=>s+=`<line x1="${f1(fx(v))}" x2="${f1(fx(v))}" y1="${F.y0-6}" y2="${F.y1}" class="${v?'grid':'axis'}"/><text x="${f1(fx(v))}" y="${F.y1+14}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
    s+=`<text x="${f1(fx(-5))}" y="${F.y1+28}" class="t-xs">← better</text><text x="${f1(fx(15))}" y="${F.y1+28}" class="t-xs t-end">worse →  percentage points</text>`;
    if(T.mg!=null)s+=`<line x1="${f1(fx(T.mg))}" x2="${f1(fx(T.mg))}" y1="${F.y0-10}" y2="${F.y1}" style="stroke:var(--bad);stroke-width:1.8;stroke-dasharray:6 4"/><text x="${f1(fx(T.mg)+4)}" y="${F.y0-12}" class="t-xs" style="fill:var(--bad)">margin +${T.mg}</text>`;
    else s+=`<text x="${f1(F.x1)}" y="${F.y0-12}" class="t-xs t-end">margin not quoted in sources</text>`;
    const cmp=T.arms.filter(a=>a.d!=null),fr=(F.y1-F.y0)/Math.max(2,cmp.length);
    cmp.forEach((a,i)=>{const y=F.y0+fr*(i+.5),ok=T.mg!=null?a.hi<T.mg:null,col=ok===null?'var(--accent)':ok?'var(--good)':'var(--bad)';
      s+=`<line x1="${f1(fx(a.lo))}" x2="${f1(fx(a.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/><rect x="${f1(fx(a.d)-5)}" y="${f1(y-5)}" width="10" height="10" style="fill:${col}"/>`;
      s+=`<text x="${f1(F.x0)}" y="${f1(y-12)}" class="t-xs" style="fill:var(--ink)">${a.n}</text><text x="${f1(fx(a.hi)+8)}" y="${f1(y+4)}" class="t-xs" style="fill:${col}">${a.d>0?'+':''}${a.d} (${a.lo} to ${a.hi})</text>`;
      if(ok!==null)s+=`<text x="${f1(F.x0)}" y="${f1(y+18)}" class="t-xs" style="fill:${col};font-weight:700">${ok?'NON-INFERIOR':'NOT SHOWN'}</text>`});
    if(!cmp.length)s+=`<text x="${f1((F.x0+F.x1)/2)}" y="${f1((F.y0+F.y1)/2)}" class="t-xs t-mid">no difference with CI quoted</text>`;
    ts.innerHTML=s;
    $('#rgTrialNote').innerHTML=noteHTML(T.note);
    $('#rgTrialCap').innerHTML=`Outcome definitions and populations differ between trials, so compare arms within a trial, not across trials. Population statistics, not predictions for one person.`;
  }
  $$('[data-rgt]').forEach(b=>b.addEventListener('click',()=>{tr=b.dataset.rgt;$$('[data-rgt]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawT()}));
  drawT();
  redraws.regimen=(()=>{const p=redraws.regimen;return()=>{p&&p();drawT()}})();
};
