/* =============== 4.4 toward a cure =============== */
const CU_EV={est:['est','Established'],early:['early','Early evidence'],hyp:['hyp','Hypothesis']};
const CU_NODES=[
 {a:'APP',b:'processing',one:'APP processing',
  txt:`Amyloid beta is cut out of a larger membrane protein, APP, first by beta-secretase (BACE1) and then by gamma-secretase. Blocking either cut should, in principle, make less amyloid. [[Haass2012]]`},
 {a:'Amyloid',b:'aggregation',one:'Amyloid aggregation',
  txt:`Amyloid beta clumps into oligomers, fibrils and plaques. Antibodies that remove plaque are so far the only disease-targeted drugs shown to slow decline in symptomatic Alzheimer's. [[vanDyck2023,Sims2023]]`},
 {a:'Tau',b:'spread',one:'Tau spread',
  txt:`Tau tangles spread from region to region, and the severity of cognitive impairment correlates best with the burden of neocortical tangles. Tau is the fourth-largest target group in the 2025 pipeline, with 15 drugs. [[Nelson2012,Cummings2025Pipeline]]`},
 {a:'Microglia and',b:'inflammation',one:'Microglia and inflammation',
  txt:`Microglia, the brain's immune cells, gather around plaques. Inflammation and immunity are the third-largest target group in the 2025 pipeline, with 24 drugs (17%). [[Cummings2025Pipeline]]`},
 {a:'Synapse',b:'loss',one:'Synapse loss',
  txt:`Loss of synapses and then neurons is what people experience as decline. Synaptic plasticity and neuroprotection drugs made up 9 drugs (6%) of the 2025 pipeline. [[Cummings2025Pipeline]]`}
];
const CU_R=[
 {id:'ab',b:'Anti-amyloid antibodies',name:'Anti-amyloid antibodies',node:1,ev:'est',out:'slow',
  res:['Slowed decline by a quarter to a third in','early disease; did not stop it'],key:'ARIA-E: 12.6% lecanemab, 24.0% donanemab',
  mech:`Lecanemab and donanemab bind aggregated amyloid and help clear plaque from the brain. [[vanDyck2023,Sims2023]]`,
  txt:`In CLARITY AD, CDR-SB worsened 1.21 points with lecanemab against 1.66 with placebo at 18 months, about 27% less decline; ARIA with oedema occurred in 12.6%. [[vanDyck2023]] In TRAILBLAZER-ALZ 2, donanemab slowed CDR-SB worsening by 0.70 points in the combined group at 76 weeks; ARIA-E occurred in 24.0%, and 3 deaths were considered treatment-related. [[Sims2023]] Antibodies that do not clear plaque well, solanezumab and crenezumab, have not worked at any stage tested. [[Sperling2023,Tariot2026]]`,
  pt:'Removing plaque slows the decline a little in early disease. It does not stop it, and brain swelling or bleeding (ARIA) is a real risk.',
  hook:'Only plaque-clearing antibodies have slowed symptomatic decline. Antibodies that do not clear plaque (solanezumab, crenezumab) failed.',cit:'[[vanDyck2023,Sims2023]]'},
 {id:'shuttle',b:'Brain shuttle (trontinemab)',name:'Brain-shuttle antibody: trontinemab',node:1,ev:'early',out:'bio',
  res:['91% below the amyloid-positive cut-off in','28 weeks; benefit to people not yet tested'],key:'ARIA-E under 5%, a cross-trial comparison',
  mech:`Trontinemab is an anti-amyloid antibody fused to a transferrin-receptor "Brainshuttle" module that carries it across the blood-brain barrier. [[Kulic2025]]`,
  txt:`At 3.6 mg/kg, 91% (49 of 54) fell below 24 centiloids after 28 weeks and 72% below 11. ARIA-E occurred in 4 of 149 participants across the 1.8 and 3.6 mg/kg cohorts (under 5%), all radiographically mild, against 12.6% in CLARITY AD and 24.0% in TRAILBLAZER-ALZ 2; that is a cross-trial comparison, not head to head, and these are company data. [[Roche2025I,Kulic2025,vanDyck2023,Sims2023]] Phase 3 trials TRONTIER 1 and 2 have estimated primary completion in February 2028, and the PrevenTRON prevention trial in 2032. [[CTgovTRONTIER,NeurologyLive2026]]`,
  pt:'A shuttle carries the antibody into the brain, and plaque cleared fast with less swelling so far. Whether people do better is still being tested.',
  hook:'Brain shuttle = anti-amyloid antibody + transferrin-receptor module to cross the blood-brain barrier (trontinemab). Early evidence.',cit:'[[Roche2025I,Kulic2025]]'},
 {id:'tauab',b:'Tau antibodies',name:'Tau antibodies',node:2,ev:'est',out:'fail',
  res:['Three N-terminal antibodies: no benefit;','mid-region bepranemab missed its primary'],key:'Reached tau in CSF without clinical effect',
  mech:`Antibodies aim to catch tau as it passes between neurons. The first ones bound the N-terminal end of tau; one explanation offered for their failure is that the seeds that spread tau lack that region. Later antibodies bind the mid-region or the microtubule-binding region. [[Monteiro2023,Eisai2025]]`,
  txt:`Semorinemab (TAURIEL, 422 people), gosuranemab (TANGO, 650) and tilavonemab (AWARE, 453) did not slow CDR-SB worsening. Gosuranemab lowered unbound tau in CSF, so it reached its target without clinical effect. [[Teng2022,Shulman2023,Florian2023]] Bepranemab (TOGETHER, 466) missed its CDR-SB primary endpoint; the company reported slower tau PET accumulation and benefit confined to subgroups. [[UCB2024,Maguire2025]] Etalanetug lowered a tangle-related CSF marker by 89% at 9 months in 7 people and is now being added to lecanemab in two trials. [[Eisai2025,CTgovTauNexGen]]`,
  pt:'Antibodies against tau have so far reached tau without helping memory or daily function. Newer ones aim at a different part of the protein.',
  hook:'N-terminal tau antibodies (semorinemab, gosuranemab, tilavonemab) failed in phase 2.',cit:'[[Teng2022,Shulman2023,Florian2023,UCB2024]]'},
 {id:'aso',b:'Tau antisense (diranersen)',name:'Tau antisense: BIIB080, diranersen',node:2,ev:'early',out:'bio',
  res:['Tau fell in spinal fluid and on PET; phase 2','missed its primary endpoint'],key:'Company plans registrational trials anyway',
  mech:`An antisense oligonucleotide, given into the spinal fluid, lowers how much tau protein neurons make in the first place. [[Mummery2023]]`,
  txt:`In phase 1b (46 people with mild AD), CSF total tau fell by more than 50% in the 60 mg and 115 mg groups, with no serious adverse events in treated patients. [[Mummery2023]] In the extension, tau PET fell from baseline at week 100 in 12 people: the first tau-lowering drug to reduce tau PET signal, in a very small sample. [[Edwards2023]] The phase 2 CELIA trial (416 people) missed its primary endpoint, a dose-response on CDR-SB. Biogen reported tau reductions at all doses, the strongest clinical signal at the lowest dose and more serious adverse events at the highest; effect sizes are not yet peer-reviewed. [[Biogen2026]]`,
  pt:'This drug lowers how much tau the brain makes. The tau numbers went down, but the main trial did not show that people did better.',
  hook:'BIIB080 (diranersen) was the first drug to lower tau PET; phase 2 CELIA missed its primary endpoint (company topline, May 2026).',cit:'[[Mummery2023,Edwards2023,Biogen2026]]'},
 {id:'bace',b:'BACE and gamma inhibitors',name:'BACE and gamma-secretase inhibitors',node:0,ev:'est',out:'worse',
  res:['Cognition or function got worse on','verubecestat, semagacestat, umibecestat'],key:'Umibecestat worsening reversed after washout',
  mech:`These drugs block one of the two enzyme cuts that release amyloid beta from APP, so less amyloid is made. [[Haass2012]]`,
  txt:`Verubecestat (1,454 people with prodromal AD) was stopped for futility; CDR-SB worsened more on 40 mg than placebo (2.02 vs 1.58) and progression to dementia was higher (HR 1.38). [[Egan2019]] Semagacestat (1,537 people) worsened function at the higher dose and caused more skin cancers, infections and weight loss. [[Doody2013]] In 1,556 unimpaired APOE4 carriers, umibecestat caused small cognitive worsening that reversed after washout. One explanation offered is that BACE1 also cuts many non-amyloid proteins, including synaptic ones. [[Tariot2024]] Gamma-secretase modulators, which shift production toward shorter peptides without blocking the enzyme, are in a phase 2a trial. [[Tortelli2025]]`,
  pt:'Stopping amyloid being made sounded ideal, but these enzymes do other jobs too. People taking the blockers did slightly worse.',
  hook:'BACE inhibitors worsened cognition (verubecestat: HR 1.38 for progression to dementia). Semagacestat worsened function.',cit:'[[Egan2019,Doody2013,Tariot2024]]'},
 {id:'trem2',b:'TREM2 (AL002)',name:'TREM2 agonist antibody: AL002',node:3,ev:'early',out:'fail',
  res:['Missed its primary endpoint; no benefit','on biomarkers; ARIA seen in treated people'],key:'Company topline; extension study ended',
  mech:`TREM2 is a receptor on microglia. An agonist antibody was meant to push microglia into a more protective state. Reviewers propose a "therapeutic window" in which microglial activation helps only while amyloid is still being contained. [[Ma2025]]`,
  txt:`AL002 missed its CDR-SB primary endpoint in the phase 2 INVOKE-2 trial (up to 96 weeks). There was no benefit on secondary or biomarker endpoints and no amyloid reduction, and ARIA occurred mainly in treated participants. Alector ended the extension study. [[Alector2024]] Proposed reasons include treating too late, the wrong dose and genetic differences between people. [[Ma2025]]`,
  pt:'Trying to switch the brain\'s immune cells into a helpful mode did not slow the disease in this trial.',
  hook:'TREM2 agonism (AL002, INVOKE-2): negative. Inflammation is still an unproven target.',cit:'[[Alector2024]]'},
 {id:'glp1',b:'GLP-1 (semaglutide)',name:'GLP-1 drug: semaglutide',node:3,ev:'est',out:'fail',
  res:['Two phase 3 trials, 3,808 people: no','slowing of decline at 2 years'],key:'CDR-SB difference −0.08 and 0.10',
  mech:`Semaglutide, a diabetes and weight-loss drug, lowers inflammation outside the brain. Observational data linked GLP-1 drugs to fewer dementia diagnoses in people with diabetes. [[CummingsScheltens2026]]`,
  txt:`The phase 3 evoke and evoke+ trials gave oral semaglutide up to 14 mg daily to 3,808 people with amyloid-confirmed MCI or mild dementia. At week 104 the CDR-SB differences from placebo were −0.08 (p=0.57) and 0.10 (p=0.46), and both trials were discontinued. [[Cummings2026Evoke]] Semaglutide clearly lowered hs-CRP, but brain inflammation markers fell only 7% to 10%. The lead authors suggest lowering inflammation outside the brain may not be enough; brain-penetrant GLP-1 drugs remain untested. [[CummingsScheltens2026]]`,
  pt:'A popular diabetes and weight-loss medicine was tested properly in thousands of people with early Alzheimer\'s, and it did not slow the disease.',
  hook:'Semaglutide evoke and evoke+ (topline November 2025): two negative phase 3 trials.',cit:'[[Cummings2026Evoke]]'},
 {id:'antiviral',b:'Antivirals (valacyclovir)',name:'Antiviral: valacyclovir',node:3,ev:'est',out:'worse',
  res:['Cognition worsened more on the drug than','on placebo; no benefit on amyloid or tau'],key:'VALAD, 120 people, 78 weeks',
  mech:`One hypothesis holds that herpes viruses in the brain help drive Alzheimer's. Valacyclovir suppresses herpes simplex virus. [[Devanand2026]]`,
  txt:`VALAD gave valacyclovir 4 g a day or placebo to 120 HSV-seropositive people with early symptomatic AD for 78 weeks. ADAS-Cog11 worsened more on valacyclovir (10.86 vs 6.92; P=0.01), amyloid and tau PET showed no benefit, and the authors do not recommend this treatment. [[Devanand2026]] A smaller trial in MCI (50 people) also found no effect. [[Devanand2026VALMCI]] The negative antiviral trial and the positive shingles-vaccine natural experiments are not yet reconciled. [[Devanand2026,Eyting2025]]`,
  pt:'An anti-herpes drug was tested in people with early Alzheimer\'s and a past herpes infection. Their thinking declined more than on placebo.',
  hook:'VALAD (2026): valacyclovir worsened cognition in early AD. The herpes hypothesis remains a hypothesis.',cit:'[[Devanand2026]]'},
 {id:'vaccine',b:'Vaccines (shingles)',name:'Shingles vaccination',node:3,ev:'early',out:'obs',
  res:['About 20% fewer new dementia diagnoses in','a natural experiment; no randomized trial'],key:'Mechanism unknown',
  mech:`The shingles vaccine protects against the varicella-zoster virus. Whether any effect on dementia comes from the antiviral effect or from wider immune effects is unknown. [[Xie2025]]`,
  txt:`In Wales, eligibility for the live zoster vaccine depended on exact date of birth. Comparing people just either side of the cutoff, vaccination reduced new dementia diagnoses over 7 years by 3.5 percentage points, a 20.0% relative reduction. [[Eyting2025]] Similar studies in Australia and Canada found that eligibility reduced new diagnoses by 1.8 and 2.0 percentage points. [[Pomirchy2025,Pomirchy2026]] These are quasi-experiments using routine diagnoses, less prone to confounding than ordinary cohorts, but no randomized trial has tested zoster vaccination for dementia. [[Eyting2025,Xie2025]]`,
  pt:'People who happened to be just old enough to get the shingles vaccine were diagnosed with dementia less often. That is a strong clue, not proof.',
  hook:'Zoster vaccine and dementia: regression-discontinuity natural experiments (Wales, Australia, Canada). Early evidence, no RCT.',cit:'[[Eyting2025,Pomirchy2025]]'},
 {id:'lithium',b:'Lithium',name:'Lithium',node:2,ev:'early',out:'obs',
  res:['Mouse data, water studies and one small','trial of 61 people; no large trial'],key:'Lithium was low in the brains of people with MCI',
  mech:`In mice, halving brain lithium increased amyloid, phospho-tau, synapse loss and memory decline, partly through the enzyme GSK3β; lithium orotate, a salt that binds amyloid less, prevented these changes. These are mouse findings only. [[Aron2025]]`,
  txt:`Lithium was the only metal measured that was significantly reduced in the brains of people with MCI, and amyloid plaques bound it. [[Aron2025]] In Danish national data, drinking-water lithium above 15 µg/L was linked to lower dementia incidence (IRR 0.83), but 5.1 to 10 µg/L to higher incidence. [[Kessing2017]] Lithium users had lower dementia risk in a UK records cohort (HR 0.56), which is open to confounding. [[Chen2022]] A 2-year trial of low-dose lithium in 61 people with amnestic MCI reported stable cognition against decline on placebo; no large trial has confirmed it. [[Forlenza2019]]`,
  pt:'Lithium is a natural element found in water and also a psychiatric medicine. Several kinds of clue point the same way, but no large trial has tested it.',
  hook:'Lithium: early evidence only (mouse, ecological, observational and one small RCT).',cit:'[[Aron2025,Kessing2017,Forlenza2019]]'},
 {id:'gene',b:'Gene therapy for APOE',name:'Gene therapy for APOE: LX1001',node:1,ev:'early',out:'bio',
  res:['APOE2 made in the brain; tau PET fell in','5 of 6 at 6 months (company data, 15 people)'],key:'No ARIA; no trend in amyloid',
  mech:`LX1001 uses a virus vector (AAVrh10) to deliver the protective APOE2 gene into the spinal fluid of people with two copies of APOE4. [[Lexeo2024]]`,
  txt:`Interim phase 1/2 data from 15 people (company release, October 2024) showed dose-dependent APOE2 expression, CSF tau falls in most participants and tau PET reduction in 5 of 6 at 6 months, with no ARIA and no trend in amyloid. Exact denominators are unverified. [[Lexeo2024]] In APOE4 mice, delivering APOE2 with the protective Christchurch variant suppressed both amyloid and tau; plain APOE2 suppressed amyloid only. [[Gunaydin2024]]`,
  pt:'A harmless virus carries a protective version of the APOE gene into the brain. Only a handful of people have had it so far.',
  hook:'LX1001: AAV vector delivering APOE2 to APOE4 homozygotes. Early evidence from 15 people.',cit:'[[Lexeo2024,Gunaydin2024]]'},
 {id:'simu',b:'Simufilam',name:'Simufilam (filamin A binder)',node:4,ev:'est',out:'fail',
  res:['Both phase 3 trials missed every','primary, secondary and biomarker endpoint'],key:'SEC settlement; a co-developer indicted (allegation)',
  mech:`Simufilam is an oral small molecule that binds the scaffolding protein filamin A. It is placed at the synapse here only as shorthand for its proposed protective effect, which was never established. [[Kupiec2026]]`,
  txt:`Simufilam failed both phase 3 trials, RETHINK (52 weeks) and REFOCUS (76 weeks, ended early). Co-primary, secondary and biomarker endpoints were all missed, and a signal in a mild subgroup did not hold or replicate. [[Kupiec2026]] In 2024 Cassava Sciences settled SEC charges over statements about its phase 2b data with a $40 million penalty, neither admitting nor denying them, and a co-developer was indicted on allegations of fabricated research results; an indictment is an allegation, not a conviction. [[Cassava2025]]`,
  pt:'This drug was tested in two large trials and did nothing measurable. Its earlier promising data are now under legal question.',
  hook:'Simufilam: two negative phase 3 trials (RETHINK, REFOCUS).',cit:'[[Kupiec2026]]'}
];
const CU_OUT={slow:{pass:.7,lab:'flow slowed',bar:'var(--sky)'},fail:{pass:1,lab:'no benefit',bar:'var(--muted)'},worse:{pass:1,lab:'worse',bar:'var(--bad)'},bio:{pass:1,lab:'biomarker down',bar:'var(--sky)'},obs:{pass:1,lab:'no RCT yet',bar:'none'}};
const CU_PH=[{from:0,at:.18,t:'The flow'},{from:.3,at:.44,t:'The barrier drops'},{from:.55,at:.8,t:'The result'}];
const CU_PV=[
 {from:0,at:.12,yr:2023,pub:1,n:'A4',d:'solanezumab · 1,169 unimpaired, amyloid-positive',res:'No slowing; plaque not removed',
  k:'<span class="ev est">Established</span> · phase 3, published 2023',t:'A4: no slowing',
  txt:`A4 randomized 1,169 cognitively unimpaired people aged 65 to 85 with elevated amyloid. At 240 weeks, PACC change was −1.43 with solanezumab and −1.13 with placebo (difference −0.30; P=0.26). Amyloid PET rose by 11.6 centiloids on the drug and 19.3 on placebo, so plaque was not removed. ARIA-E occurred in under 1% of each group. [[Sperling2023]]`,
  pt:'An antibody that does not clear plaque did not help, even when given years before any symptoms.',hook:'A4 (solanezumab in preclinical AD): negative.'},
 {from:.268,at:.3,yr:2025,pub:1,n:'DIAN-TU extension',d:'gantenerumab · 73 treated, inherited AD',res:'Possible delay; interval includes no effect',
  k:'<span class="ev early">Early evidence</span> · open-label, published 2025',t:'DIAN-TU: a possible delay',
  txt:`In the open-label extension of DIAN-TU, 73 people with dominantly inherited AD received gantenerumab up to 1,500 mg every 2 weeks. At the interim analysis, the hazard ratio for CDR-SB decline in carriers without symptoms was 0.79 (95% CI 0.47 to 1.32), and 0.53 (0.27 to 1.03) in the 22 treated longest; neither interval excludes no effect. Amyloid PET fell clearly. ARIA occurred in 53%, with no macrohaemorrhages or deaths. The sponsor stopped the study early, only 13 people completed 3 years, and the controls were external. [[Bateman2025]] At autopsy in 10 treated people, amyloid was lower but tangles and glial activation did not differ from controls. [[Chen2025]]`,
  pt:'Years of plaque removal in people born with a disease-causing gene may have delayed symptoms. The study was small and stopped early, so this is a hint, not proof.',
  hook:'DIAN-TU authors: long-term full amyloid removal "potentially delayed symptom onset". Needs confirmation.'},
 {from:.359,at:.39,yr:2026,pub:1,n:'API Colombia',d:'crenezumab · PSEN1 E280A carriers, 5–8 years',res:'No effect on either primary outcome',
  k:'<span class="ev est">Established</span> · phase 2, published 2026',t:'API Colombia: no effect',
  txt:`Crenezumab was given for 5 to 8 years to cognitively unimpaired carriers of the PSEN1 E280A mutation (85 on drug, 84 carriers on placebo, plus 83 non-carriers on placebo). Neither primary outcome differed (API composite difference 0.33, p=0.43; FCSRT-CI p=0.16), and plaque and other biomarkers did not change. The authors concluded that robust removal of fibrillar amyloid appears necessary for clinical efficacy. [[Tariot2026]]`,
  pt:'In a large Colombian family with an inherited form of Alzheimer\'s, an antibody that barely touched plaque did not delay the disease.',
  hook:'Solanezumab and crenezumab, which clear plaque poorly, have failed at every stage tested.'},
 {from:.527,at:.56,yr:2027.85,pub:0,n:'TRAILBLAZER-ALZ 3',d:'donanemab · 2,196 enrolled by blood test',res:'Running; est. completion Nov 2027',
  k:'<span class="tag sky">Running</span> · registry estimate',t:'TRAILBLAZER-ALZ 3: running',
  txt:`TRAILBLAZER-ALZ 3 tests donanemab in preclinical AD with a decentralized design and a plasma p-tau217 test for eligibility. It screened 63,124 people in the US and Japan and enrolled 2,196; the primary outcome is time to clinical progression after 9 monthly infusions. The share eligible by p-tau217 rose with age and differed across racial and ethnic groups. [[Yaari2025]] Estimated primary completion is November 2027. [[CTgovTB3]]`,
  pt:'A blood test found the volunteers, and most of the trial runs from home. Results are expected after late 2027.'},
 {from:.627,at:.66,yr:2028.95,pub:0,n:'AHEAD 3-45',d:'lecanemab · ages 55–80, two linked trials',res:'Running; est. completion Dec 2028',
  k:'<span class="tag sky">Running</span> · registry estimate',t:'AHEAD 3-45: running',
  txt:`AHEAD 3-45 tests lecanemab in two linked trials of cognitively unimpaired people aged 55 to 80: A3 (amyloid about 20 to 40 centiloids, amyloid PET endpoint) and A45 (above 40 centiloids, cognitive endpoint). Treatment lasts 4 years, and a plasma Aβ42/40 test screens out people unlikely to be amyloid positive. [[Rafii2023]] The trial is active and not recruiting, with an estimated 1,400 participants and estimated primary completion in December 2028. [[CTgovAHEAD]] Recruitment through nursing and community organizations enrolled 25 Filipino, Hispanic or Latino and Korean American adults out of 654 reached. [[Salazar2024]]`,
  pt:'This trial treats people with only a little amyloid, earlier than any before it. Results are expected after 2028.'},
 {from:.905,at:.94,yr:2032,pub:0,n:'PrevenTRON',d:'trontinemab · about 1,600, blood-test selected',res:'Running; est. completion 2032',
  k:'<span class="tag sky">Running</span> · registry estimate',t:'PrevenTRON: just starting',
  txt:`PrevenTRON will test trontinemab in about 1,600 cognitively unimpaired people aged 55 to 80, selected by an elevated plasma p-tau217 blood test, with no amyloid PET needed to enter. Its primary outcome is time to a CDR global score above 0, and estimated primary completion is 2032. [[CTgovTRONTIER,NeurologyLive2026]]`,
  pt:'A blood test alone will decide who can join. Results are years away.',
  hook:'Blood tests (plasma Aβ42/40, p-tau217) now screen people into prevention trials. [[Rafii2023,Yaari2025,NeurologyLive2026]]'}
];

/* station icons for the pathway, drawn around (x,y) inside a circle of radius about 26 */
function cuIcon(i,x,y,shr){let s='';
  if(i===0){s+=`<path d="M${x-18} ${y+4}h36M${x-18} ${y+12}h36" style="stroke:var(--cell-line);stroke-width:3;stroke-dasharray:3 2"/><rect x="${x-3}" y="${y-10}" width="6" height="26" rx="2" style="fill:var(--sage)"/><circle cx="${x}" cy="${y-13}" r="7" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/><rect x="${x-3}" y="${y-2}" width="6" height="9" style="fill:var(--amber)"/>`}
  else if(i===1)s+=plaque(x,y,17*(1-.55*shr),5,1);
  else if(i===2)s+=neuron(x,y+4,8,1,{axonLen:0,dendrites:4})+tangle(x,y-2,10*(1-.6*shr),1);
  else if(i===3)s+=microglia(x,y,7,1,1);
  else s+=`<circle cx="${x-8}" cy="${y}" r="9" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M${x+6} ${y-11} v22" style="stroke:var(--cell-line);stroke-width:3;stroke-linecap:round"/><circle cx="${x-1}" cy="${y-5}" r="1.8" style="fill:var(--sky)"/><circle cx="${x+2}" cy="${y+3}" r="1.8" style="fill:var(--sky)"/>`;
  return s}

inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT');let R=CU_R[0];
  $('#cuRoutes').innerHTML=CU_R.map((r,i)=>`<button class="btn" data-r="${i}" aria-pressed="${i===0}">${r.b}</button>`).join('');
  const P=Array.from({length:46},(_,i)=>{const q=rng(101+i);return{ph:i/46+q()*.02,w:q()*6.28,h:q()}});
  function draw(t){
    const N=vb(svg,'720 400','400 722');
    const L=N?{st:[80,185,290,395,500],s0:40,s1:540,cx:110,ix:44,lx:146,box:[16,556,368,150]}
             :{st:[90,230,370,510,650],s0:24,s1:696,cy:150,iy:70,ly:196,box:[16,244,688,146]};
    const O=CU_OUT[R.out],node=R.node;
    const drop=ease(ramp(t,.3,.5)),eff=ramp(t,.5,.64),res=ramp(t,.55,.7);
    const sPos=v=>(v-L.s0)/(L.s1-L.s0),bs=sPos(L.st[node]);
    const XY=(sv,w)=>N?[L.cx+11*Math.sin(w+sv*14),lerp(L.s0,L.s1,sv)]:[lerp(L.s0,L.s1,sv),L.cy+11*Math.sin(w+sv*14)];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=N?`<text x="20" y="22" class="t-xs">THE DISEASE PATHWAY, TOP TO BOTTOM</text>`:`<text x="16" y="22" class="t-xs">THE DISEASE PATHWAY, LEFT TO RIGHT</text>`;
    // channel
    s+=N?`<rect x="${L.cx-24}" y="${L.s0}" width="48" height="${L.s1-L.s0}" rx="24" style="fill:var(--panel-2)"/>`
        :`<rect x="${L.s0}" y="${L.cy-24}" width="${L.s1-L.s0}" height="48" rx="24" style="fill:var(--panel-2)"/>`;
    // stations
    CU_NODES.forEach((nd,i)=>{const c=L.st[i],sel=i===node,shr=(sel&&(R.out==='slow'||R.out==='bio'))?ease(ramp(t,.55,.85)):0;
      if(N){s+=`<path d="M${L.ix+26} ${c}H${L.cx-26}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 3"/><circle cx="${L.ix}" cy="${c}" r="25" style="fill:var(--panel);stroke:${sel?'var(--sky)':'var(--line)'};stroke-width:${sel?2:1}"/>`+cuIcon(i,L.ix,c,shr);
        s+=`<text x="${L.lx}" y="${c+2}" class="t-sm" style="fill:${sel?'var(--ink)':'var(--muted)'};font-weight:${sel?600:500}">${nd.one}</text>`}
      else{s+=`<path d="M${c} ${L.iy+27}V${L.cy-26}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 3"/><circle cx="${c}" cy="${L.iy}" r="27" style="fill:var(--panel);stroke:${sel?'var(--sky)':'var(--line)'};stroke-width:${sel?2:1}"/>`+cuIcon(i,c,L.iy,shr);
        s+=`<text x="${c}" y="${L.ly}" class="t-sm t-mid" style="fill:${sel?'var(--ink)':'var(--muted)'};font-weight:${sel?600:500}">${nd.a}</text><text x="${c}" y="${L.ly+14}" class="t-sm t-mid" style="fill:${sel?'var(--ink)':'var(--muted)'};font-weight:${sel?600:500}">${nd.b}</text>`}});
    // particles
    const segCol=sv=>{const x=lerp(L.s0,L.s1,sv);return x<L.st[1]?'var(--amber)':x<L.st[2]?'var(--amber)':x<L.st[3]?'var(--rose)':x<L.st[4]?'var(--glia)':'var(--muted)'};
    const blockedFrac=(1-O.pass)*eff;
    P.forEach((p,i)=>{let sv=(p.ph+t*1.6)%1;
      if(sv>bs&&p.h<blockedFrac){const piled=bs-.012-(i%5)*.008;const [x,y]=XY(piled,p.w);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:${segCol(piled)};opacity:.5"/>`;return}
      const [x,y]=XY(sv,p.w),r=lerp(L.s0,L.s1,sv)<L.st[1]?2.4:3.4;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${segCol(sv)}"/>`});
    if(R.out==='worse'&&eff>0)for(let j=0;j<12;j++){const sv=bs+((j/12+t*1.6)%1)*(1-bs);const [x,y]=XY(sv,j*1.3);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--bad);opacity:${f1(eff*.9)}"/>`}
    // the barrier
    if(drop>0){const c=L.st[node],hl=(N?26:32)*drop,dash=R.out==='obs';
      const st=`fill:${dash?'var(--panel)':O.bar};stroke:${R.out==='worse'?'var(--bad)':R.out==='fail'?'var(--muted)':'var(--sky)'};stroke-width:2;${dash?'stroke-dasharray:4 3;':''}opacity:${f1(.4+.6*drop)}`;
      if(N)s+=`<rect x="${f1(L.cx-hl)}" y="${c-6}" width="${f1(hl*2)}" height="12" rx="4" style="${st}"/>`;
      else s+=`<rect x="${c-6}" y="${f1(L.cy-hl)}" width="12" height="${f1(hl*2)}" rx="4" style="${st}"/>`;
      if(R.out==='fail'&&eff>0)s+=N?`<path d="M${L.cx-6} ${c-6} l6 12 l6 -12" style="fill:none;stroke:var(--field);stroke-width:2.5;opacity:${f1(eff)}"/>`:`<path d="M${c-6} ${L.cy-6} l12 6 l-12 6" style="fill:none;stroke:var(--field);stroke-width:2.5;opacity:${f1(eff)}"/>`;
      if(eff>0){const lab=O.lab+(R.out==='bio'?', benefit unproven':'');
        s+=N?`<text x="${L.lx}" y="${c+18}" class="t-xs" style="fill:${R.out==='worse'?'var(--bad)':'var(--ink)'};opacity:${f1(eff)}">▲ ${lab}</text>`
            :`<text x="${c}" y="${L.ly+32}" class="t-xs t-mid" style="fill:${R.out==='worse'?'var(--bad)':'var(--ink)'};opacity:${f1(eff)}">${lab}</text>`}}
    // result box
    const [bx,by,bw,bh]=L.box,EV=CU_EV[R.ev];
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${bx+16}" y="${by+28}" class="t-big">${R.name}</text>`;
    const tw=EV[1].length*6.4+16,tc=R.ev==='est'?'good':R.ev==='early'?'warn':'sky';
    s+=`<rect x="${bx+16}" y="${by+40}" width="${f1(tw)}" height="19" rx="5" style="fill:var(--${tc}-soft)"/><text x="${bx+24}" y="${by+53.5}" class="t-xs" style="fill:var(--${tc});font-weight:600">${EV[1].toUpperCase()}</text>`;
    s+=`<text x="${f1(bx+28+tw)}" y="${by+53.5}" class="t-xs">target: ${CU_NODES[node].one}</text>`;
    if(res>0){s+=`<g style="opacity:${f1(res)}"><text x="${bx+16}" y="${by+(N?88:84)}" class="t-lbl">${R.res[0]}</text><text x="${bx+16}" y="${by+(N?106:102)}" class="t-lbl">${R.res[1]}</text><text x="${bx+16}" y="${by+(N?132:126)}" class="t-sm">${R.key}</text></g>`}
    else s+=`<text x="${bx+16}" y="${by+(N?88:84)}" class="t-sm">${t<.3?'Watch the flow, then the barrier drops.':'The barrier is in place…'}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(CU_PH,t);setSt(ph);
    const ev=`<span class="ev ${EV[0]}">${EV[1]}</span>`;
    const NP=[{k:'The pathway · '+CU_NODES[node].one,t:CU_NODES[node].one,txt:CU_NODES[node].txt,pt:'Each step of the disease is a possible place to intervene. Press play to see a barrier drop here.'},
              {k:ev+' · how it works',t:R.name,txt:R.mech,pt:R.pt},
              {k:ev+' · best evidence',t:R.res.join(' '),txt:R.txt,pt:R.pt,hook:R.hook}][ph];
    $('#cuNote').innerHTML=noteHTML(NP);
    $('#cuCap').textContent=`Route: ${R.name} (${EV[1]}). Schematic, not to scale; the flow beyond the barrier is a picture of the trial result, not a measurement.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,13000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_PH,rg,draw,stop);
  $('#cuRoutes').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;stop();R=CU_R[+b.dataset.r];
    $$('[data-r]',$('#cuRoutes')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    rg.value=0;draw(0);if(!RM)$('#cuPlay').click();else{rg.value=.8;draw(.8)}});
  $('#cuTbl').innerHTML=CU_R.map(r=>`<tr><th>${r.name}</th><td>${CU_NODES[r.node].one}</td><td><span class="ev ${CU_EV[r.ev][0]}">${CU_EV[r.ev][1]}</span></td><td>${r.res.join(' ')}. ${r.key}. ${r.cit}</td></tr>`).join('');

  /* ---- prevention trials timeline ---- */
  const pv=$('#cuPv'),pr=$('#cuPvT'),Y0=2022,Y1=2033,TODAY=2026.8;
  function drawPv(t){
    const N=vb(pv,'720 432','400 616');
    const L=N?{ax0:20,ax1:380,ay:40,y0:62,rh:88,nx:20,step:2}:{ax0:340,ax1:700,ay:40,y0:58,rh:60,nx:16,step:1};
    const X=y=>L.ax0+(y-Y0)/(Y1-Y0)*(L.ax1-L.ax0),cy=lerp(Y0,Y1,t),cx=X(cy),H=N?616:432;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="${N?20:16}" y="20" class="t-xs">${N?'PREVENTION TRIALS, BY READOUT YEAR':'TRIAL · DRUG · WHO'}</text>`;
    const cur=phaseOf(CU_PV,t);
    {const y=L.y0+cur*L.rh;s+=`<rect x="6" y="${y-2}" width="${N?388:708}" height="${L.rh-6}" rx="9" style="fill:var(--sky-soft)"/>`}
    if(!N)s+=`<path d="M${f1(cx)} ${L.ay+6}V${H-24}" style="stroke:var(--sky);stroke-width:2.5"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${L.ay+6}" r="4" style="fill:var(--sky)"/>`;
    for(let y=Y0;y<=Y1;y+=L.step)s+=(N?'':`<path d="M${f1(X(y))} ${L.ay+6}V${H-24}" class="grid" style="opacity:.6"/>`)+`<text x="${f1(X(y))}" y="${L.ay}" class="t-xs t-mid">${y}</text>`;
    const tx=X(TODAY);s+=(N?'':`<path d="M${f1(tx)} ${L.ay+6}V${H-22}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:5 4"/>`)+`<text x="${f1(tx)}" y="${H-8}" class="t-xs t-mid" style="fill:var(--ink)">today, Oct 2026</text>`;
    CU_PV.forEach((T,i)=>{const y=L.y0+i*L.rh,mx=X(T.yr),pass=cy>=T.yr-.05,k=ramp(cy,T.yr-.05,T.yr+.5),on=i===cur;
      
      s+=`<g style="opacity:${pass?1:.45}"><text x="${L.nx}" y="${y+15}" class="t-lbl">${T.n}</text><text x="${L.nx}" y="${y+30}" class="t-xs">${T.d}</text></g>`;
      s+=`<text x="${L.nx}" y="${y+46}" class="t-sm" style="fill:${T.pub?'var(--ink)':'var(--sky)'};opacity:${f1(k)}">${T.res}</text>`;
      const my=N?y+66:y+24;
      if(N)s+=`<path d="M${L.ax0} ${my}H${L.ax1}" class="axis"/><path d="M${f1(tx)} ${my-9}v18" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 2"/><path d="M${f1(cx)} ${my-10}v20" style="stroke:var(--sky);stroke-width:2.5"/>`;
      s+=`<circle cx="${f1(mx)}" cy="${my}" r="${pass?7:5}" style="fill:${T.pub?(pass?'var(--sky)':'var(--panel)'):'var(--panel)'};stroke:var(--sky);stroke-width:2;${T.pub?'':'stroke-dasharray:3 2'}"/>`;
      const lab=T.pub?String(T.yr):(T.yr===2032?'2032 est.':T.yr<2028?'Nov 2027 est.':'Dec 2028 est.'),right=mx<L.ax1-70;
      const lw=lab.length*5.75+6,lx=right?mx+8:mx-8-lw;
      s+=`<rect x="${f1(lx)}" y="${my-8}" width="${f1(lw)}" height="15" rx="3" style="fill:${on?'var(--sky-soft)':'var(--field)'}"/><text x="${f1(right?mx+11:mx-11)}" y="${my+4}" class="t-xs ${right?'':'t-end'}" style="fill:var(--ink);opacity:${pass?1:.5}">${lab}</text>`});
    pv.innerHTML=s;setPv(cur);$('#cuPvNote').innerHTML=noteHTML(CU_PV[cur]);
    pr.setAttribute('aria-valuetext',`${Math.floor(cy)}: ${CU_PV[cur].t}`);
  }
  const stopPv=playWire(pr,$('#cuPvPlay'),drawPv,16000,'Replay','cure');
  const setPv=stepWire($('#cuPvSteps'),CU_PV,pr,drawPv,stopPv);

  /* ---- pipeline numbers ---- */
  $('#cuNums').innerHTML=[
   ['138','drugs in 182 trials on 1 January 2025','[[Cummings2025Pipeline]]'],
   ['74%','of drugs (102) were disease-targeted therapies','[[Cummings2025Pipeline]]'],
   ['33%','of drugs (46) were repurposed from other conditions','[[Cummings2025Pipeline]]'],
   ['4%','of trials (8) enrolled cognitively normal people at risk','[[Cummings2025Pipeline]]'],
   ['≈8 years','for a phase 3 prevention programme, start to readout','[[Cummings2025Pipeline]]'],
   ['50,109','participants needed to fill all active trials','[[Cummings2025Pipeline]]'],
   ['158','drugs in 192 trials on 1 January 2026','[[Cummings2026Pipeline]]']
  ].map(([b,t,c])=>`<div class="cu-num"><b>${b}</b><span>${t} ${c}</span></div>`).join('');
  const pp=$('#cuPipe');let yr=2025,from=[43,30,14,11],to=[43,30,14,11],cur2=[43,30,14,11],stopA=null;
  const TYPES=['Small-molecule disease-targeted','Biologic disease-targeted','Cognitive enhancers','Neuropsychiatric symptoms'];
  const VAL={2025:[43,30,14,11],2026:[39,34,18,10]};
  const PH=[['Phase 1',48,45],['Phase 2',86,75],['Phase 3',48,31]];
  const CAD=[['Neurotransmitter receptors',30],['Amyloid beta',25],['Inflammation, immunity',24],['Tau',15],['Synapses, neuroprotection',9],['Metabolism, bioenergetics',8],['Growth factors, hormones',5],['Proteostasis',3],['Oxidative stress',3],['Vasculature',3]];
  function drawPipe(){
    const N=vb(pp,'720 392','400 760');
    const A=N?{x:20,y:24,bw:230}:{x:16,y:24,bw:220},B=N?{x:20,y:206,bw:200}:{x:16,y:216,bw:200},C=N?{x:20,y:372,bw:230}:{x:376,y:24,bw:220};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const row=(x,y,l,v,max,bw,vs,col)=>`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}</text><rect x="${x}" y="${y+5}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${x}" y="${y+5}" width="${f1(Math.max(0,bw*v/max))}" height="12" rx="3" style="fill:${col}"/><text x="${f1(x+bw*v/max+6)}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${vs}</text>`;
    s+=`<text x="${A.x}" y="${A.y}" class="t-xs">SHARE OF DRUGS BY TYPE, ${yr}</text>`;
    TYPES.forEach((l,i)=>{s+=row(A.x,A.y+24+i*34,l,cur2[i],50,A.bw,Math.round(cur2[i])+'%',i<2?'var(--sky)':'var(--sage)')});
    s+=`<text x="${B.x}" y="${B.y}" class="t-xs">TRIALS BY PHASE, 2025</text>`;
    PH.forEach(([l,tr,dr],i)=>{const v=tr;s+=row(B.x,B.y+24+i*34,`${l}: ${dr} drugs`,v,90,B.bw,Math.round(v)+' trials','var(--sky)')});
    s+=`<text x="${C.x}" y="${C.y}" class="t-xs">DRUGS BY MECHANISM, 2025</text>`;
    CAD.forEach(([l,v],i)=>{const vv=v;s+=row(C.x,C.y+24+i*35,l,vv,32,C.bw,String(Math.round(vv)),l==='Amyloid beta'?'var(--amber)':l==='Tau'?'var(--rose)':'var(--sky)')});
    pp.innerHTML=s;
  }
  function setYear(y){yr=y;$('#cuY25').setAttribute('aria-pressed',y===2025);$('#cuY26').setAttribute('aria-pressed',y===2026);
    from=cur2.slice();to=VAL[y];stopA&&stopA();
    stopA=animate(700,p=>{const e=ease(p);cur2=from.map((f,i)=>lerp(f,to[i],e));drawPipe()});
    $('#cuPipeCap').innerHTML=y===2025?'Counts from the 2025 pipeline review of clinicaltrials.gov; shares do not sum to exactly 100 because of rounding. [[Cummings2025Pipeline]]':'Drug-type shares from the 2026 review (158 drugs); phases and mechanisms are still the 2025 counts. [[Cummings2026Pipeline,Cummings2025Pipeline]]'}
  $('#cuY25').addEventListener('click',()=>setYear(2025));$('#cuY26').addEventListener('click',()=>setYear(2026));
  const prevR=redraws.cure;redraws.cure=()=>{prevR&&prevR();drawPipe()};

  /* ---- open questions and next trials ---- */
  const card=(ev,h,p)=>`<div class="card"><span class="ev ${CU_EV[ev][0]}">${CU_EV[ev][1]}</span><h4>${h}</h4><p>${p}</p></div>`;
  $('#cuOpen').innerHTML=[
   card('early','Is removing amyloid enough?',`Antibodies that clear plaque slow decline by about a quarter to a third in early symptomatic AD; antibodies that do not clear plaque failed even before symptoms. In inherited AD, plaque removal did not visibly change tangles or glial activation at autopsy. [[vanDyck2023,Sims2023,Tariot2026,Chen2025]]`),
   card('hyp','Amyloid first, then tau?',`Many investigators expect combination or sequential therapy: amyloid clearance plus a tau-directed drug. The first randomized tests add etalanetug to lecanemab, in DIAN-TU Tau NexGen and Eisai study 202. [[Eisai2025,CTgovTauNexGen]]`),
   card('early','Is tau a workable target?',`N-terminal tau antibodies failed. Mid-region antibodies and tau antisense lowered tau biomarkers or tau PET but missed primary clinical endpoints in phase 2. [[Teng2022,Shulman2023,Florian2023,UCB2024,Biogen2026]]`),
   card('early','Is inflammation a workable target?',`TREM2 agonism (AL002) and peripheral anti-inflammatory effects (semaglutide) did not slow decline. A positive phase 2b/3 signal for masitinib, an oral mast-cell and microglia inhibitor, awaits a confirmatory trial. [[Alector2024,CummingsScheltens2026,Dubois2023]]`),
   card('est','Rescue by subgroup',`Many claims rest on subgroups after a missed primary endpoint (valiltramiprosate in MCI, bepranemab in low tau, blarcamesine, HMTM delayed start). Regulators have been sceptical: the EMA recommended refusing blarcamesine, and the application was withdrawn in March 2026. [[Power2025,UCB2024,EMA2026,Wischik2026]]`),
   card('est','Who can actually receive treatment?',`Applying CLARITY AD criteria to a population cohort of 237 amyloid-positive people left only 8% eligible for lecanemab. That cohort was 97.5% White, so equity remains a concern. [[Pittock2023]]`),
   card('est','Blood tests are changing trials',`The FDA cleared the first blood test to aid AD diagnosis on 16 May 2025. In primary care, clinicians' diagnostic accuracy rose from 61% to 91% with a p-tau217 blood test. Blood tests now screen people into AHEAD 3-45, TRAILBLAZER-ALZ 3 and PrevenTRON. [[FDA2025,Palmqvist2024,Rafii2023,Yaari2025,NeurologyLive2026]]`)
  ].join('');
  $('#cuNext').innerHTML=[
   ['Does clearing amyloid before symptoms delay onset?','AHEAD 3-45, TRAILBLAZER-ALZ 3, PrevenTRON','Dec 2028, Nov 2027 and 2032 (registry estimates) [[CTgovAHEAD,CTgovTB3,CTgovTRONTIER]]'],
   ['Can plaque clear faster with less ARIA?','TRONTIER 1 and 2 (trontinemab, early symptomatic AD)','Feb 2028 (registry estimate) [[CTgovTRONTIER]]'],
   ['Does adding an anti-tau drug help?','DIAN-TU Tau NexGen and study 202 (etalanetug plus lecanemab)','Running [[Eisai2025,CTgovTauNexGen]]'],
   ['Can lowering tau show clinical benefit?','Diranersen registrational trials','Planned by the company [[Biogen2026]]'],
   ['Can oral, non-antibody drugs work?','GABriella (nivegacetor), valiltramiprosate, masitinib confirmatory trial','Phase 2a and later-stage trials [[Tortelli2025,Power2025,Dubois2023]]']
  ].map(([q,t,e])=>`<tr><th>${q}</th><td>${t}</td><td>${e}</td></tr>`).join('');

  draw(+rg.value);drawPv(+pr.value);drawPipe();setYear(2025);
};
