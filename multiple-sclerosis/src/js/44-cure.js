/* =============== 4.4 toward a cure =============== */
const CURE_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>',rej:'<span class="ev rej">Rejected</span>'};
const CURE_STEPS=[
 {from:0,at:.06,k:'The starting point',t:'Four things go wrong at once',
  txt:`The drawing is one schematic lesion with the four processes a cure would have to stop or reverse: (1) immune cells crossing a leaky blood-brain barrier, (2) a smouldering rim of activated microglia, with B and T cells trapped behind the barrier, (3) an axon stripped of myelin, so its signal fails, and (4) a bare axon under stress, next to one already cut. The Lancet seminar on MS names adding neuroprotection and remyelination as the biggest remaining challenge [[Thompson2018Lancet]]. An expert group led by Kuhlmann proposes treating MS as one continuum, in which apparent progression reflects a shift from focal acute injury toward widespread inflammation and neurodegeneration, with failing repair [[Kuhlmann2023]]. <span class="ev early">Early evidence</span> Taken together, these reviews mean a cure would have four parts [[Kuhlmann2023,Giovannoni2022,Thompson2018Lancet]].`,
  pt:'MS is not one problem but four: an attack from outside the brain, a slow fire inside it, missing insulation on the nerve fibres, and fibres that wear out. Today\'s drugs mostly deal with the first.',
  hook:'A cure = stop relapsing inflammation + stop smouldering inflammation + repair myelin + protect axons. Only the first is <b>established</b>.'},
 {from:.18,at:.27,k:'Job 1 · Established',t:'Stop relapsing inflammation',
  txt:`<span class="ev est">Established</span> Disease-modifying therapies close much of the door. The International Progressive MS Alliance states that infiltrative inflammation can now be treated well [[Dangond2021]]. Closing the door is not the same as stopping disability. In the pooled OPERA I and II trials, progression independent of relapse activity (PIRA) caused 78.0% of 12-week composite confirmed disability events on interferon beta-1a and 88.0% on ocrelizumab; relapse-associated worsening explained about 17.7% [[Kappos2020]]. And a higher, bodyweight-adjusted dose of ocrelizumab was no better than 600 mg in MUSETTE and GAVOTTE: more peripheral anti-CD20 did not reach the progressive process [[Hauser2026]].`,
  pt:'Current drugs are good at keeping new waves of immune cells out of the brain. In the OPERA trials, most worsening happened anyway, without any relapse.',
  hook:'In OPERA I/II, PIRA, not relapses, caused most disability accumulation: <b>78.0%</b> of events on interferon and <b>88.0%</b> on ocrelizumab. [[Kappos2020]]'},
 {from:.36,at:.45,k:'Job 2 · Early evidence',t:'Stop smouldering inflammation',
  txt:`<span class="ev early">Early evidence</span> Behind a closed barrier, tissue-resident CD8+ T cells and B cells, some becoming plasma cells, lose the molecules they need to leave (S1P1, CCR7) and gain CD103, which may trap the inflammation in the lesion [[MachadoSantos2018]]. On MRI, paramagnetic rim lesions mark chronic active lesions; they expanded by 2.2% a year while rimless lesions shrank [[Absinta2019]]. Antibodies reach this compartment poorly: intravenous plus intrathecal rituximab killed CSF B cells but depleted only about 10–20% in CNS tissue [[Komori2016]]. CNS-penetrant BTK inhibitors are being tested because they could reach B cells and microglia on both sides of the barrier [[Kramer2023]]. <span class="ev est">Established</span> In HERCULES, tolebrutinib reduced 6-month confirmed disability progression in non-relapsing SPMS (22.6% vs 30.7%; HR 0.69) [[Fox2025]]; in primary progressive MS, PERSEUS did not meet its primary endpoint (company press release) [[Sanofi2025PERSEUS]].`,
  pt:'Some of the inflammation hides inside the brain, behind the barrier that today\'s drugs guard. The first drug aimed at it slowed disability in one large trial and failed in another.',
  hook:'"Smouldering" = compartmentalised inflammation: trapped B and T cells plus activated microglia at the rim of a chronic active lesion (a paramagnetic rim on MRI). BTK inhibitors are the first class aimed at it.'},
 {from:.54,at:.63,k:'Job 3 · Early evidence',t:'Repair myelin',
  txt:`<span class="ev early">Early evidence</span> Oligodendrocyte precursors are still present in chronic lesions, but maturing ones are rare, which points to a block in differentiation rather than a lack of cells [[Kuhlmann2008]]. In ReBUILD, clemastine shortened the VEP P100 latency delay by 1.7 ms per eye (95% CI 0.5–2.9), the first randomised trial to show a remyelinating drug effect [[Green2017]]. No remyelination trial has yet improved disability [[Brown2021,Cambridge2025,Calabresi2026]], and in TRAP-MS the clemastine arm for people with PIRA was stopped by protocol for safety [[Kocot2025]]. The drawing shows new sheaths thinner than the old ones, as a schematic of repair.`,
  pt:'The insulation can regrow on its own, but often the repair stalls. One antihistamine sped up signals in the optic nerve a little. No drug has yet made people measurably better.',
  hook:'<b>ReBUILD</b> (clemastine) gave the first randomised evidence of remyelination, measured as a shorter VEP latency: 1.7 ms per eye. [[Green2017]]'},
 {from:.72,at:.81,k:'Job 4 · Trials mostly negative',t:'Protect axons',
  txt:`Axons are cut where inflammation is: 11,236 transected axons per mm³ were counted in active lesions and 3,138 at the edges of chronic active lesions [[Trapp1998]]. A lost axon is not regrown, so this job is about keeping the rest. Trials so far are mostly negative: simvastatin in MS-STAT2 (40% vs 36% progressed; adjusted HR 1.13) [[Chataway2025]], amiloride, fluoxetine and riluzole in MS-SMART [[Chataway2020]], high-dose biotin in MS-SPI2 [[Cree2020]] and lipoic acid in a phase 2 trial [[Spain2026]]. <span class="ev early">Early evidence</span> Ibudilast slowed brain atrophy in the phase 2 SPRINT-MS trial [[Fox2018]]. The dashed shield in the drawing is a goal, not a result.`,
  pt:'A nerve fibre that is cut stays cut. Researchers have tried many drugs to shield the fibres that remain, and the large trials have not worked so far.',
  hook:'Phase 2 MS-STAT showed 43% slower brain atrophy on simvastatin, but phase 3 MS-STAT2 found no disability benefit (adjusted HR 1.13). A good imaging signal in phase 2 does not guarantee phase 3 success. [[Chataway2025]]'},
 {from:.88,at:.96,k:'The scorecard',t:'Where that leaves a cure',
  txt:`One job is largely done, two have early evidence and one has mostly negative trials. The Progressive MS Alliance describes neurodegeneration and compartmentalised inflammation as "virtually untargeted" [[Dangond2021]]. A 2024 consensus proposes the term smouldering-associated worsening (SAW), broader than PIRA, with candidate clinical, MRI and fluid biomarkers to track it [[Scalfari2024]]. The routes and every trial result are below.`,
  pt:'No treatment cures MS today. Drugs control the immune attacks well; stopping the slow damage and repairing it are still research.',
  hook:'Exam framing: DMTs treat <b>relapsing</b> (peripheral) inflammation. The unmet needs are <b>smouldering</b> inflammation, <b>remyelination</b> and <b>neuroprotection</b>. [[Thompson2018Lancet,Dangond2021]]'}
];
const CURE_JOBS=[
 {n:'Stop relapsing inflammation',prob:'cells cross a leaky barrier',s:'Disease-modifying therapies',lab:'ESTABLISHED',st:'largely achieved for relapses',c:'var(--good)',at:.18},
 {n:'Stop smouldering inflammation',prob:'trapped cells, active microglia',s:'BTK inhibitors and others',lab:'EARLY EVIDENCE',st:'HERCULES positive; PERSEUS failed',c:'var(--warn)',at:.36},
 {n:'Repair myelin',prob:'bare axon, signal blocked',s:'Remyelinating drugs',lab:'EARLY EVIDENCE',st:'VEP signals; no disability benefit yet',c:'var(--warn)',at:.54},
 {n:'Protect axons',prob:'bare axon under stress',s:'Neuroprotection trials',lab:'MOSTLY NEGATIVE',st:'large trials negative so far',c:'var(--bad)',at:.72}
];
/* forest plot, set A: hazard ratios for confirmed disability progression (log axis, below 1 favours the first-named treatment) */
const CURE_FA=[
 {n:'ORATORIO',d:'ocrelizumab vs placebo',p:'PPMS',hr:.76,lo:.59,hi:.98,val:'HR 0.76 (95% CI 0.59–0.98)',m:'12-week CDP: 32.9% vs 39.3%',v:'met',vc:'good',id:'NCT01194570',cite:'[[Montalban2017]]'},
 {n:'EXPAND',d:'siponimod vs placebo',p:'SPMS',hr:.79,lo:.65,hi:.95,val:'HR 0.79 (95% CI 0.65–0.95)',m:'3-month CDP: 26% vs 32%',v:'met',vc:'good',id:'NCT01665144',cite:'[[Kappos2018]]'},
 {n:'HERCULES',d:'tolebrutinib vs placebo',p:'non-relapsing SPMS',hr:.69,lo:.55,hi:.88,val:'HR 0.69 (95% CI 0.55–0.88)',m:'6-month CDP: 22.6% vs 30.7%',v:'met',vc:'good',id:'NCT04411641',cite:'[[Fox2025]]'},
 {n:'PERSEUS',d:'tolebrutinib vs placebo',p:'PPMS',txt:'did not meet its primary endpoint; no effect size released',m:'6-month composite CDP',v:'missed',vc:'bad',pr:1,id:'NCT04458051',cite:'[[Sanofi2025PERSEUS,Maxwell2026]]'},
 {n:'FENtrepid',d:'fenebrutinib vs ocrelizumab',p:'PPMS',hr:.88,lo:.75,hi:1.03,val:'HR 0.88 (95% CI 0.75–1.03)',m:'12-week composite CDP, non-inferiority',v:'non-inferior',vc:'warn',pr:1,id:'NCT04544449',cite:'[[Roche2026FENtrepid]]'},
 {n:'GAVOTTE',d:'higher vs standard ocrelizumab dose',p:'PPMS',hr:.95,val:'HR 0.95 (CI not in abstract)',m:'12-week composite CDP: 47% vs 49%',v:'no better',vc:'bad',noci:1,id:'NCT04548999',cite:'[[Hauser2026]]'},
 {n:'MS-STAT2',d:'simvastatin vs placebo',p:'SPMS',hr:1.13,lo:.91,hi:1.39,val:'adjusted HR 1.13 (95% CI 0.91–1.39)',m:'6-month CDP: 40% vs 36%',v:'missed',vc:'bad',id:'NCT03387670',cite:'[[Chataway2025]]'},
 {n:'MIST',d:'aHSCT vs disease-modifying drugs',p:'RRMS',hr:.07,lo:.02,hi:.24,off:1,val:'HR 0.07 (95% CI 0.02–0.24)',m:'progression: 3 vs 34 patients',v:'met',vc:'good',id:'NCT00273364',cite:'[[Burt2019]]'}
];
/* set B: repair and neuroprotection. Each plotted row has its own scale. px/plo/phi are the published
   estimate and interval re-signed (and logged for odds ratios) so that left always means "favours the
   treatment"; the text on each row gives the numbers exactly as published. */
const CURE_FB=[
 {n:'ReBUILD',d:'clemastine vs placebo, crossover',p:'RMS, chronic optic neuropathy',px:-1.7,plo:-2.9,phi:-.5,val:'1.7 ms shorter (95% CI 0.5–2.9)',m:'VEP latency per eye',v:'met',vc:'good',id:'NCT02040298',cite:'[[Green2017]]'},
 {n:'RENEW',d:'opicinumab vs placebo',p:'acute optic neuritis',txt:'VEP latency difference −3.5 ms, p=0.33',m:'VEP latency (ITT)',v:'missed',vc:'bad',id:'NCT01721161',cite:'[[Cadavid2017]]'},
 {n:'AFFINITY Part 1',d:'opicinumab vs placebo',p:'RMS',px:-.15,plo:-.35,phi:.05,val:'0.15 (95% CI −0.05 to 0.35)',m:'disability response score',v:'missed',vc:'bad',id:'NCT03222973',cite:'[[Calabresi2026]]'},
 {n:'CCMR One',d:'bexarotene vs placebo',p:'RRMS on dimethyl fumarate',px:-.16,plo:-.71,phi:.39,val:'0.16 pu (95% CI −0.39 to 0.71)',m:'lesional MTR',v:'missed',vc:'bad',id:'ISRCTN14265371',cite:'[[Brown2021]]'},
 {n:'CCMR One follow-up',d:'bexarotene vs placebo, ~27 months on',p:'n=20',px:-7.79,plo:-14.76,phi:-.82,val:'−7.79 ms (95% CI −14.76 to −0.82)',m:'VEP latency',v:'signal',vc:'warn',id:'ISRCTN14265371',cite:'[[McMurran2024]]'},
 {n:'CCMR Two',d:'metformin + clemastine vs placebo',p:'RRMS on a DMT',txt:'preliminary: VEP held steady vs slowing on placebo; no numbers',m:'VEP latency',v:'preliminary',vc:'warn',pr:2,id:'NCT05131828',cite:'[[Cambridge2025,RiboniVerri2025]]'},
 {n:'SPRINT-MS',d:'ibudilast vs placebo',p:'PPMS or SPMS',px:-.0009,plo:-.0017,phi:-.00004,val:'0.0009/yr (95% CI 0.00004–0.0017)',m:'slower brain atrophy',v:'met',vc:'good',id:'NCT01982942',cite:'[[Fox2018]]'},
 {n:'LAPMS',d:'lipoic acid vs placebo',p:'PPMS or SPMS',px:.08,plo:-.17,phi:.33,val:'−0.08 ft/s (95% CI −0.33 to 0.17)',m:'walking speed',v:'missed',vc:'bad',id:'NCT03161028',cite:'[[Spain2026]]'},
 {n:'MS-SPI2',d:'high-dose biotin vs placebo',p:'progressive MS',px:-Math.log(1.35),plo:-Math.log(2.26),phi:-Math.log(.81),val:'OR 1.35 (95% CI 0.81–2.26)',m:'confirmed improvement: 12% vs 9%',v:'missed',vc:'bad',id:'NCT02936037',cite:'[[Cree2020]]'},
 {n:'ASCEND',d:'natalizumab vs placebo',p:'SPMS',px:Math.log(.86),plo:Math.log(.66),phi:Math.log(1.13),val:'OR 0.86 (95% CI 0.66–1.13)',m:'progressed: 44% vs 48%',v:'missed',vc:'bad',id:'NCT01416181',cite:'[[Kapoor2018]]'},
 {n:'Masitinib',d:'masitinib 4.5 mg/kg vs placebo (AB07002)',p:'PPMS or non-active SPMS',px:-.097,plo:-.192,phi:-.002,val:'−0.097 (97% CI −0.192 to −0.002)',m:'EDSS change; phase 3 suspended',v:'met',vc:'warn',id:'NCT01433497',cite:'[[Vermersch2022]]'},
 {n:'MS-SMART',d:'amiloride, fluoxetine, riluzole',p:'SPMS',txt:'no drug changed brain volume at 96 weeks',m:'percentage brain volume change',v:'missed',vc:'bad',id:'NCT01910259',cite:'[[Chataway2020]]'},
 {n:'PIPE-307 VISTA',d:'PIPE-307 vs placebo',p:'RRMS',txt:'missed primary and all secondary efficacy endpoints',m:'low-contrast letter acuity',v:'missed',vc:'bad',pr:1,id:'NCT06083753',cite:'[[Contineum2025]]'},
 {n:'TRAP-MS',d:'clemastine arm',p:'people with PIRA',txt:'arm stopped: 3 of 9 met safety stopping criteria',m:'safety stopping rule',v:'stopped',vc:'bad',id:'NCT03109288',cite:'[[Kocot2025]]'},
 {n:'EMBOLD',d:'ATA188 EBV-targeted T cells vs placebo',p:'non-active progressive MS',txt:'EDSS improvement about 6% vs about 16% on placebo',m:'confirmed EDSS improvement',v:'missed',vc:'bad',pr:1,id:'NCT03283826',cite:'[[Atara2023]]'}
];
const CURE_ROUTES=[
 {h:'BTK inhibitors',job:'Job 2 · smouldering inflammation',sum:'Small oral drugs. CNS-penetrant ones are being tested because they could reach B cells and microglia on both sides of the blood-brain barrier [[Kramer2023]]. Two positive peer-reviewed phase 3 reports (HERCULES; REMODEL, remibrutinib against teriflunomide), several negative ones, other relapse-trial successes so far reported only by sponsors, and a liver signal.',items:[
  ['est',`HERCULES (tolebrutinib 60 mg vs placebo, non-relapsing SPMS, n=1131; NCT04411641): 6-month confirmed disability progression 22.6% vs 30.7% (HR 0.69, 95% CI 0.55–0.88; p=0.003). [[Fox2025]]`],
  ['est',`Liver: in HERCULES, ALT rose above 3× the upper limit of normal in 4.0% vs 1.6%, and serious adverse events occurred in 15.0% vs 10.4% [[Fox2025]]. Across 2958 people given tolebrutinib in phase 3, six (0.20%) met Hy's Law criteria, all within 90 days; one needed a liver transplant and died of postoperative complications. Weekly liver tests for 12 weeks picked up rises earlier (40 vs 60 days). [[Maxwell2026]]`],
  ['est',`GEMINI 1 and 2 (tolebrutinib vs teriflunomide, relapsing MS; NCT04410978, NCT04410991) were not superior on relapse rate: 0.13 vs 0.12 and 0.11 vs 0.11. Pooled 6-month disability worsening was 8.3% vs 11.3% (HR 0.71), but this was not formally tested. [[Oh2025]]`],
  ['est',`PERSEUS (tolebrutinib vs placebo, PPMS, n=767; NCT04458051) did not meet its primary endpoint. This is from a company press release: no effect sizes were released, and Sanofi will not seek approval in PPMS. [[Sanofi2025PERSEUS,Maxwell2026]]`],
  ['est',`Regulators split: the FDA issued a complete response letter in non-relapsing SPMS [[Sanofi2025CRL]], while the EMA lists tolebrutinib (Cenrifki) as authorised on 19 June 2026 for SPMS without relapses in the last 2 years, with mandatory liver testing [[EMA2026Cenrifki]]. Details below the cards.`],
  ['est',`Evobrutinib (evolutionRMS 1 and 2, n=2290; NCT04338022, NCT04338061) was not superior to teriflunomide (relapse rates 0.15 vs 0.14 and 0.11 vs 0.11), and liver enzymes above 5× normal were more common on it (5.0%). [[Montalban2024]]`],
  ['early',`Fenebrutinib: 69% fewer new gadolinium-enhancing lesions in the phase 2 FENopta trial [[BarOr2025]]. In FENtrepid (PPMS, n=985; NCT04544449) it was non-inferior to ocrelizumab (HR 0.88, 95% CI 0.75–1.03), with liver enzyme rises in 13.3% vs 2.9% and deaths in 1.4% vs 0.2%, judged unrelated by investigators. Unverified: sponsor release only, no peer-reviewed paper. [[Roche2026FENtrepid]]`],
  ['early',`FENhance 1 and 2 (fenebrutinib vs teriflunomide, relapsing MS; NCT04586010, NCT04586023) cut relapse rates by 51.1% and 58.5%; disability endpoints were not significant, and 7 deaths (0.9%) occurred on fenebrutinib vs 1 (0.1%). Unverified sponsor release. [[Roche2026FENhance]]`],
  ['est',`REMODEL-1 and 2 (remibrutinib 100 mg twice daily vs teriflunomide, relapsing MS, n=2007; NCT05147220, NCT05156281): annualised relapse rate 0.073 vs 0.112 (RR 0.648, 95% CI 0.453–0.927) and 0.080 vs 0.116 (RR 0.688, 0.487–0.972). Stopping for adverse events 3.1% vs 5.8%; the authors report no liver safety concerns. Disability results are so far sponsor-reported only. [[Wiendl2026,Novartis2026REMODEL]]`]]},
 {h:'Remyelination',job:'Job 3 · repair myelin',sum:'Drugs meant to help precursor cells mature and rewrap bare axons. Signals on visual evoked potentials, no disability benefit yet, and one safety stop.',items:[
  ['early',`ReBUILD (clemastine, relapsing MS with chronic optic neuropathy, n=50, crossover; NCT02040298): VEP P100 latency delay shortened by 1.7 ms per eye (95% CI 0.5–2.9; p=0.0048), the first randomised trial to show a remyelinating drug effect. Fatigue was the main side effect. [[Green2017]]`],
  ['early',`TRAP-MS (NIH platform trial; NCT03109288): the clemastine arm for people with PIRA was stopped by protocol when 3 of 9 patients triggered safety stopping criteria. Disability slopes were steeper than in other participants, and CSF proteomics showed more purinergic signalling and pyroptosis. [[Kocot2025]]`],
  ['hyp',`In the same report's laboratory work, clemastine plus extracellular ATP triggered pyroptotic death of macrophages and of human oligodendrocytes made from stem cells, and a P2RX7 antagonist blocked it. [[Kocot2025]]`],
  ['est',`Opicinumab (anti-LINGO-1) failed in three phase 2 trials: RENEW (NCT01721161; VEP difference −3.5 ms, p=0.33), SYNERGY (NCT01864148; no dose-response, 49% on placebo vs 40–65% across doses) and AFFINITY Part 1 (NCT03222973; difference 0.15, 95% CI −0.05 to 0.35). [[Cadavid2017,Cadavid2019,Calabresi2026]]`],
  ['est',`CCMR One (bexarotene, n=52; ISRCTN14265371) missed its MRI endpoint (0.16 pu, 95% CI −0.39 to 0.71). Everyone on bexarotene had an adverse event, including central hypothyroidism in all 26, and the authors do not recommend it. [[Brown2021]]`],
  ['early',`A follow-up of 20 CCMR One participants about 27 months later found a lasting VEP latency difference of −7.79 ms (95% CI −14.76 to −0.82) favouring bexarotene. [[McMurran2024]]`],
  ['early',`CCMR Two (metformin plus clemastine, n=70; NCT05131828) has VEP latency as its primary outcome [[RiboniVerri2025]]. Preliminary results in a University of Cambridge news release: VEP speed held steady on the combination and slowed on placebo; participants did not feel better; no peer-reviewed numbers yet. [[Cambridge2025]]`],
  ['est',`PIPE-307 VISTA (M1 muscarinic antagonist, RRMS, n=182; NCT06083753) missed its primary and all secondary efficacy endpoints, according to the sponsor as reported in trade press [[Contineum2025]]. The mouse paper behind it [[Poon2024]] carries a PNAS Editorial Expression of Concern [[PNAS2025EoC]].`]]},
 {h:'Stem-cell transplant (aHSCT)',job:'Job 1 · reset the immune system',sum:'Chemotherapy depletes the immune system, and the person\'s own stem cells rebuild it. Strong effect on inflammatory activity, real treatment-related risk.',items:[
  ['early',`MIST (non-myeloablative aHSCT vs higher-efficacy or different-class DMT, RRMS, n=110; NCT00273364): progression in 3 patients after aHSCT vs 34 on DMT (HR 0.07, 95% CI 0.02–0.24). The authors call it preliminary, and the comparator arm excluded alemtuzumab and ocrelizumab-era options. [[Burt2019]]`],
  ['early',`Risk of death: pooled transplant-related mortality was 2.1% (95% CI 1.3–3.4%) across 15 studies, higher in older studies [[Sormani2017]]; 2.8% within 100 days in the 1995–2006 EBMT cohort [[Muraro2017]]; no treatment-related deaths among 174 Swedish patients, though febrile neutropenia occurred in 68% [[Silfverberg2024]].`],
  ['early',`How long it lasts: no evident disease activity in 73% at 5 years and 65% at 10 years in the Swedish cohort [[Silfverberg2024]]; 5-year progression-free survival of 46% in the older EBMT cohort, 78% of whom had progressive MS [[Muraro2017]].`],
  ['est',`The 2025 ECTRIMS–EBMT consensus calls aHSCT after failure of high-efficacy DMT in aggressive RRMS a "generally accepted indication"; use in treatment-naive aggressive MS, progressive MS and NMOSD remains uncertain [[Muraro2025]]. EBMT guidelines state it should take place in accredited centres [[Sharrack2020]].`],
  ['early',`Head-to-head trials against high-efficacy drugs: BEAT-MS (NCT04047628, recruiting, primary completion 2030), RAM-MS (NCT03477500, Norway, primary completion November 2026) and StarMS (ISRCTN88667898, UK, 94 enrolled). COAST (NCT04971005) was terminated after enrolling 1 participant. [[Muraro2025,CTgov2026]]`]]},
 {h:'Targeting Epstein-Barr virus',job:'Cause · prevention and treatment',sum:'EBV is the leading candidate cause of MS. Vaccines aim at prevention; antivirals and EBV-targeted cells have not worked so far.',items:[
  ['est',`In more than 10 million young adults on US military duty (955 MS cases), MS risk rose 32-fold after EBV infection but not after other viruses, and serum NfL rose only after EBV seroconversion. [[Bjornevik2022]]`],
  ['hyp',`Molecular mimicry: clonally expanded CSF B cells in MS bind both the EBV protein EBNA1 and the CNS protein GlialCAM. [[Lanz2022]]`],
  ['early',`EMBOLD (ATA188, EBV-targeted T cells, non-active progressive MS, n=134; NCT03283826) missed its primary endpoint: about 6% improved vs about 16% on placebo. Unverified: sponsor press release only. [[Atara2023]]`],
  ['early',`Vaccines: mRNA-1189 is in phase 1/2 in healthy 10–30-year-olds (NCT05164094); mRNA-1195 is in phase 1 (NCT05831111) and in a phase 2 safety trial in early relapsing MS, CIS or RIS (NCT06735248); the NIAID gp350-ferritin nanoparticle vaccine completed phase 1 (NCT04645147). A preventive vaccine would take years to show any effect on MS. [[CTgov2026]]`],
  ['early',`Antivirals: raltegravir had no effect on gadolinium-enhancing lesions in the 20-person INSPIRE trial [[Gold2018]]. STOP-MS (spironolactone and famciclovir in progressive MS; ACTRN12623000849695) began enrolling in April 2025 [[Ward2025]].`],
  ['hyp',`Tenofovir: a single case report describes no relapses for nearly 5 years in a person with MS and HIV on a tenofovir regimen [[Torkildsen2024]]; a planned trial (NCT04880577) was withdrawn [[CTgov2026]].`]]},
 {h:'CAR-T, tolerance and reaching the CNS',job:'Jobs 1–2 · deep immune reset',sum:'Engineered T cells that wipe out B cells or plasma cells, and attempts to teach the immune system to tolerate myelin. First-in-human and animal work.',items:[
  ['early',`CD19 CAR-T (KYV-101) in 2 people with progressive MS: acceptable safety and no neurotoxicity, although CAR-T cells reached the CSF [[Fischbach2024]]. Anti-BCMA CAR-T (CT103A; NCT04561557) in 5 people: only grade 1 cytokine release syndrome, with plasma cells depleted in CNS compartments [[Qin2025]].`],
  ['early',`Registered CD19 CAR-T trials include KYSA-7 (NCT06384976, phase 2, n=120), a UCSF study (NCT06451159), a Stanford study (NCT06138132) and a Novartis YTB323 study in relapsing MS (NCT06617793). [[CTgov2026]]`],
  ['early',`Frexalimab (anti-CD40L) cut new gadolinium-enhancing lesions in phase 2 (rate ratio 0.11 at 1200 mg IV) [[Vermersch2024]]; phase 3 trials are under way in non-relapsing SPMS (FREVIVA, NCT06141486) and relapsing MS (FREXALT, NCT06141473) [[CTgov2026]].`],
  ['early',`Tolerance: ATX-MS-1467, a myelin-peptide immunotherapy, reduced gadolinium-enhancing lesions in open-label studies (NCT01973491). This is Class IV evidence, and no randomised efficacy trial followed. [[Chataway2018]]`],
  ['hyp',`In mice, a non-inflammatory mRNA vaccine encoding autoantigens suppressed several MS models by inducing regulatory T cells; there is no human trial yet. [[Krienke2021]]`],
  ['est',`RIVITaLISe (intravenous plus intrathecal rituximab; NCT01212094) killed CSF B cells (median −79.7%) but depleted only about 10–20% of B cells in CNS tissue, which shows why antibody drugs struggle to reach compartmentalised inflammation. [[Komori2016]]`]]},
 {h:'Neuroprotection in progressive MS',job:'Job 4 · protect axons',sum:'Repurposed and new drugs meant to keep nerve fibres alive. Phase 2 imaging signals, then negative phase 3 trials.',items:[
  ['est',`MS-STAT2 (simvastatin 80 mg vs placebo, SPMS, n=964; NCT03387670): 6-month confirmed progression 40% vs 36% (adjusted HR 1.13, 95% CI 0.91–1.39). The authors conclude simvastatin use in MS should be limited to existing vascular indications. [[Chataway2025]]`],
  ['est',`MS-SMART (amiloride, fluoxetine or riluzole vs placebo, SPMS, n=445; NCT01910259): no drug changed brain volume at 96 weeks. Its multi-arm design is a template for testing several drugs at once. [[Chataway2020]]`],
  ['est',`MS-SPI2 (high-dose biotin MD1003, n=642; NCT02936037): confirmed improvement in 12% vs 9% (OR 1.35, 95% CI 0.81–2.26), not significant. Biotin also interferes with laboratory tests. [[Cree2020]]`],
  ['early',`Lipoic acid 1200 mg/day cut annualised brain atrophy by 68% in a 51-person pilot in SPMS (NCT01188811). [[Spain2017]]`],
  ['est',`The larger phase 2 LAPMS trial (n=115; NCT03161028) was negative on walking speed (difference −0.08 ft/s, 95% CI −0.33 to 0.17), with more discontinuations on lipoic acid (37% vs 17%). [[Spain2026]]`],
  ['early',`SPRINT-MS (ibudilast, PPMS or SPMS, n=255; NCT01982942): brain tissue loss slowed by 0.0009 a year (95% CI 0.00004–0.0017), about 2.5 mL less over 96 weeks. Gastrointestinal effects, headache and depression were more common on ibudilast. [[Fox2018]]`],
  ['est',`ASCEND (natalizumab vs placebo, SPMS, n=889; NCT01416181): primary endpoint negative (44% vs 48% progressed; OR 0.86, 95% CI 0.66–1.13), although the 9-Hole Peg Test component favoured natalizumab. [[Kapoor2018]]`],
  ['early',`Masitinib (n=611; NCT01433497): EDSS change 0.001 vs 0.098 on placebo at 4.5 mg/kg (difference −0.097). The confirmatory MAXIMS trial (NCT05441488) is listed as suspended. [[Vermersch2022]]`]]},
 {h:'Biomarkers for faster trials',job:'Tools · measuring smouldering MS',sum:'Blood and MRI markers that could show an effect sooner than disability scores. None is yet a validated trial endpoint.',items:[
  ['est',`Serum neurofilament light: a reference database of 10,133 control samples allows age-adjusted Z scores; a Z score above 1.5 was linked to future clinical or MRI activity (OR 3.15, 95% CI 2.35–4.23). [[Benkert2022]]`],
  ['early',`The Progressive MS Alliance panel found sNfL reliable and predictive, but active inflammation drives much of it, so it separates smouldering progression from focal activity poorly. [[Kapoor2020]]`],
  ['early',`Serum GFAP (Swiss MS Cohort, n=355) was prognostic for future PIRA and complements sNfL. [[Meier2023]]`],
  ['early',`Paramagnetic rim lesions were seen in 56% of 192 patients; people with 4 or more rims reached disability earlier [[Absinta2019]]. Slowly expanding lesions were more frequent in PPMS than in relapsing MS [[Elliott2019]]. A 2024 consensus notes these measures overlap but are not equivalent [[Bagnato2024]].`]]},
 {h:'CCSVI and venous angioplasty',job:'Rejected idea',sum:'The claim that narrowed neck veins cause MS. Blinded and sham-controlled studies did not support it.',items:[
  ['rej',`In 2009, Zamboni reported a strong association between MS and "chronic cerebrospinal venous insufficiency" on Doppler ultrasound (65 patients vs 235 controls; OR 43). [[Zamboni2009]]`],
  ['rej',`Blinded catheter venography found CCSVI criteria in 2% of people with MS, 2% of their siblings and 3% of unrelated controls. [[Traboulsee2014]]`],
  ['rej',`Brave Dreams (sham-controlled venous angioplasty, RRMS, n=115; NCT01371760): improvement in 41.7% after angioplasty vs 48.7% after sham (OR 0.75, 95% CI 0.34–1.68). The original investigators concluded angioplasty is not recommended. [[Zamboni2018]]`]]}
];
const CURE_QA=[
 ['Is tolebrutinib\'s benefit in non-relapsing SPMS real progression control?',`Yes: HERCULES met its primary endpoint (HR 0.69) [[Fox2025]], and the EMA approved it for SPMS without relapses in the last 2 years [[EMA2026Cenrifki]]. Doubtful: the FDA issued a complete response letter [[Sanofi2025CRL]], and tolebrutinib showed no meaningful benefit in PPMS [[Maxwell2026,Sanofi2025PERSEUS]]. Status: the US and EU disagree as of October 2026, and liver injury (6 Hy's Law cases, 1 death after transplant) shapes the benefit-risk debate [[Maxwell2026]].`],
 ['Do BTK inhibitors work through the brain (microglia) or only in the blood?',`For a class effect inside the CNS: tolebrutinib slowed disability with no relapse-rate advantage over teriflunomide [[Oh2025]], and fenebrutinib was non-inferior to ocrelizumab in PPMS [[Roche2026FENtrepid]]. Against: evobrutinib failed [[Montalban2024]] and tolebrutinib failed in PPMS [[Sanofi2025PERSEUS]]. Status: unresolved; differences in CNS penetration, selectivity and dosing are proposed explanations.`],
 ['Is clemastine a remyelinating drug or a harmful one in progressive MS?',`Remyelinating: ReBUILD showed shorter VEP latency (1.7 ms per eye) in relapsing MS [[Green2017]]. Harmful: the TRAP-MS arm in people with PIRA was stopped for faster disability accumulation and signs of pyroptosis [[Kocot2025]]. Status: the CCMR Two combination trial has completed, but full peer-reviewed results are not yet out [[RiboniVerri2025,Cambridge2025]].`],
 ['Does a remyelination signal on VEP mean clinical benefit?',`Possibly: the bexarotene VEP effect lasted about 27 months [[McMurran2024]]. Not shown: no remyelination trial has yet improved disability, and CCMR Two participants did not feel better [[Brown2021,Cambridge2025,Calabresi2026]].`],
 ['Should aHSCT be standard care for highly active relapsing MS?',`For: Swedish authors recommend it as standard of care for highly active RRMS [[Silfverberg2024]], and ECTRIMS–EBMT calls it generally accepted after high-efficacy DMT fails [[Muraro2025]]. Caution: MIST's comparator excluded today's high-efficacy antibodies, and pooled transplant-related mortality was 2.1% [[Burt2019,Sormani2017]]. Status: BEAT-MS, RAM-MS and StarMS, head-to-head against high-efficacy DMT, are still awaited.`],
 ['Are brain-atrophy signals in phase 2 reliable stepping stones?',`Supportive: ibudilast and lipoic acid slowed atrophy in phase 2 [[Fox2018,Spain2017]]. Against: simvastatin's 43% atrophy reduction did not lead to a disability benefit in phase 3, and lipoic acid failed on walking speed [[Chataway2025,Spain2026]]. Status: imaging is being joined by sNfL, GFAP, rim lesions and slowly expanding lesions, none yet validated as trial endpoints [[Kapoor2020,Bagnato2024]].`],
 ['Can targeting EBV treat MS that is already established?',`Plausible: causal epidemiology and EBNA1–GlialCAM mimicry support the idea [[Bjornevik2022,Lanz2022]]. Not yet: EBV-specific T cells (ATA188) and raltegravir failed [[Atara2023,Gold2018]]. Status: vaccines may matter more for prevention, and antiviral trials are under way (STOP-MS) [[Ward2025]].`],
 ['Was CCSVI ever a real MS mechanism?',`The original report claimed it [[Zamboni2009]]. Blinded venography [[Traboulsee2014]] and a sham-controlled trial by the original investigators [[Zamboni2018]] did not support it. Status: rejected.`]
];
inits.cure=()=>{
  /* ---------- 1. what a cure would have to do ---------- */
  const svg=$('#cuSvg'),rg=$('#cuT');
  const MAC_A=[-112,-68,-12,192,160,20,112,68];
  function badge(x,y,k,on,col){return `<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${on?col:'var(--panel)'};stroke:${col};stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3.3)}" class="t-xs t-mid" style="fill:${on?'var(--panel)':col};font-weight:700">${k}</text>`}
  function scene(t,j){
    const [j1,j2,j3,j4]=j;let s='';
    s+=`<rect x="0" y="0" width="380" height="360" rx="14" style="fill:var(--panel);stroke:var(--line)"/>`;
    /* the lesion and its smouldering rim */
    s+=`<ellipse cx="196" cy="225" rx="172" ry="118" style="fill:var(--attack-soft);opacity:${(.9-.4*j2).toFixed(2)}"/>`;
    s+=`<ellipse cx="196" cy="225" rx="172" ry="118" style="fill:none;stroke:var(--attack);stroke-width:7;opacity:${((.12+.1*Math.sin(t*60))*(1-j2)).toFixed(2)}"/>`;
    s+=`<ellipse cx="196" cy="225" rx="172" ry="118" style="fill:none;stroke:var(--attack);stroke-width:2.2;stroke-dasharray:5 4;opacity:${(.9-.65*j2).toFixed(2)}"/>`;
    /* blood vessel and the barrier */
    s+=`<rect x="6" y="6" width="368" height="40" rx="20" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.5"/>`;
    s+=`<text x="364" y="29.5" class="t-xs t-end" style="fill:var(--vessel);font-weight:700">BLOOD</text>`;
    for(let i=0;i<6;i++){const u=(i/6+t*1.3)%1,x=20+u*270,o=Math.min(1,u*8,(1-u)*8);s+=i%2?bcell(x,26,6.5,o):tcell(x,26,6.5,o,'')}
    for(let k=0;k<10;k++){if(k===6)continue;s+=`<rect x="${f1(7+k*36.8)}" y="48" width="34.8" height="8" rx="4" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1"/>`}
    if(j1>0){s+=`<rect x="6" y="46" width="368" height="12" rx="6" style="fill:var(--rx);opacity:${(.3*j1).toFixed(2)}"/>`;
      s+=`<rect x="${f1(7+6*36.8)}" y="48" width="34.8" height="8" rx="4" style="fill:var(--rx);opacity:${j1.toFixed(2)}"/>`}
    for(let k=0;k<3;k++){const u=(t*2.2+k/3)%1,x=233+k*12;let y=lerp(26,100,u);y=lerp(y,Math.min(y,38),j1);
      const o=j1>.5?1:Math.min(1,u*8,(1-u)*5);s+=k===1?bcell(x,y,6,o):tcell(x,y,6,o,'')}
    s+=badge(16,72,1,j1>.5,'var(--good)')+`<text x="30" y="75.5" class="t-xs" style="fill:${j1>.5?'var(--rx)':'var(--ink)'}">${j1>.5?'DMTs keep most cells out':'cells cross a leaky barrier'}</text>`;
    /* microglia on the rim, and cells trapped inside */
    MAC_A.forEach((a,i)=>{const r=a*Math.PI/180;s+=mac(196+172*Math.cos(r),225+118*Math.sin(r),lerp(10,7.5,j2),lerp(1,.6,j2),j2<.5?1:0,11+i)});
    const l2=j2>.5?'calmer rim: what BTK inhibitors aim for':'smouldering rim';
    s+=`<text x="372" y="96" class="t-xs t-end" style="fill:${j2>.5?'var(--warn)':'var(--attack)'}">${l2}</text>`+badge(372-l2.length*5.75-12,92.5,2,j2>.5,'var(--warn)');
    const to=lerp(1,.45,j2);s+=plasma(178,142,8,to)+bcell(210,144,7,to)+tcell(242,141,8.5,to,'CD8');
    /* fibre A: demyelinated, then thinly remyelinated; the signal stops or passes */
    const xa=8+364*.36;
    s+=fiber(8,372,172,{demy:[ [.36,.64] ],seg:38,gap:6,h:14}).svg;
    if(j3>0)s+=`<g style="opacity:${j3.toFixed(2)}">${fiber(8,372,172,{thin:[ [.36,.64] ],seg:38,gap:6,h:14}).svg}</g>`;
    const u=(t*6)%1,px=8+u*364;
    if(j3<.5&&px>xa){s+=`<circle cx="${f1(xa-1)}" cy="172" r="${f1(5+3*(1-ramp(px,xa,xa+60)))}" style="fill:var(--pulse);opacity:${(.9*(1-ramp(px,xa,xa+60))).toFixed(2)}"/>`}
    else{s+=`<circle cx="${f1(px)}" cy="172" r="9" style="fill:var(--pulse);opacity:.25"/><circle cx="${f1(px)}" cy="172" r="4.5" style="fill:var(--pulse)"/>`}
    if(j3<.5)s+=`<text x="${f1(xa+14)}" y="176" class="t-sm t-mid" style="fill:var(--bad);font-weight:700;opacity:${(1-2*j3).toFixed(2)}">✕</text>`;
    s+=badge(66,188,3,j3>.5,'var(--warn)')+`<text x="80" y="191.5" class="t-xs" style="fill:${j3>.5?'var(--repair)':'var(--ink)'}">${j3>.5?'thin new myelin: the signal passes':'bare axon: the signal is blocked'}</text>`;
    /* fibre B: bare and under stress; a tentative shield */
    const ba=8+364*.38,bb=8+364*.62;
    if(j4>0)s+=`<rect x="${f1(ba-4)}" y="223" width="${f1(bb-ba+8)}" height="26" rx="13" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;stroke-dasharray:5 4;opacity:${(.95*j4).toFixed(2)}"/>`;
    s+=fiber(8,372,236,{demy:[ [.38,.62] ],seg:38,gap:6,h:14}).svg;
    for(let k=0;k<6;k++){const x=ba+10+k*(bb-ba-20)/5,up=k%2?-1:1,fl=.55+.45*Math.sin(t*70+k*1.9);
      s+=`<circle cx="${f1(x)}" cy="${f1(236+up*8)}" r="2.3" style="fill:var(--bad);opacity:${((1-.45*j4)*fl).toFixed(2)}"/>`}
    s+=badge(66,254,4,j4>.5,'var(--bad)')+`<text x="80" y="257.5" class="t-xs" style="fill:${j4>.5?'var(--rx)':'var(--ink)'}">${j4>.5?'shield attempted: no proven drug yet':'bare axon under stress'}</text>`;
    /* fibre C: already cut */
    s+=fiber(8,372,296,{demy:[ [.4,.62] ],cut:.5,seg:38,gap:6,h:14}).svg;
    s+=`<text x="80" y="318" class="t-xs">axon already lost</text>`;
    s+=`<text x="372" y="355" class="t-xs t-end" style="fill:var(--attack)">chronic active lesion (schematic)</text>`;
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 776');
    const L=N?{hx:10,hy:22,sx:10,sy:32,cx:10,cy:408,cw:380}:{hx:10,hy:22,sx:10,sy:32,cx:410,cy:32,cw:300};
    const p=phaseOf(CURE_STEPS,t);
    const j=CURE_JOBS.map(J=>ease(ramp(t,J.at,J.at+.1)));
    let s=`<rect x="0" y="0" width="${N?400:720}" height="${N?776:400}" style="fill:var(--field)"/>`;
    s+=`<text x="${L.hx}" y="${L.hy}" class="t-sm" style="fill:var(--rx);font-weight:600">ONE LESION, FOUR JOBS FOR A CURE</text>`;
    if(!N)s+=`<text x="710" y="${L.hy}" class="t-xs t-end">the evidence for each job</text>`;
    s+=`<g transform="translate(${L.sx} ${L.sy})">${scene(t,j)}</g>`;
    CURE_JOBS.forEach((J,k)=>{const Y=L.cy+k*90,on=t>=J.at,cur=p===k+1||p===5,X=L.cx;
      s+=`<rect x="${X}" y="${Y}" width="${L.cw}" height="84" rx="12" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?J.c:'var(--line)'};stroke-width:${cur?2.4:1.2}"/>`;
      if(on)s+=`<rect x="${X}" y="${Y+10}" width="5" height="64" rx="2.5" style="fill:${J.c};opacity:${j[k].toFixed(2)}"/>`;
      s+=`<circle cx="${X+24}" cy="${Y+21}" r="11" style="fill:${on?J.c:'var(--panel)'};stroke:${J.c};stroke-width:1.6"/><text x="${X+24}" y="${Y+25}" class="t-xs t-mid" style="fill:${on?'var(--panel)':J.c};font-weight:700">${k+1}</text>`;
      s+=`<text x="${X+44}" y="${Y+26}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${J.n}</text>`;
      if(!on){s+=`<text x="${X+44}" y="${Y+44}" class="t-xs">${J.prob}</text><text x="${X+44}" y="${Y+62}" class="t-xs">not reached on the timeline yet</text>`;return}
      const w=J.lab.length*6.3+16,o=j[k].toFixed(2);
      s+=`<text x="${X+44}" y="${Y+43}" class="t-xs" style="fill:var(--ink)">${J.s}</text>`;
      s+=`<g style="opacity:${o}"><rect x="${X+44}" y="${Y+50}" width="${f1(w)}" height="18" rx="6" style="fill:var(--panel);stroke:${J.c};stroke-width:1.5"/><text x="${f1(X+44+w/2)}" y="${Y+62.5}" class="t-xs t-mid" style="fill:${J.c};font-weight:700">${J.lab}</text>`;
      s+=`<text x="${X+44}" y="${Y+80}" class="t-xs">${J.st}</text></g>`});
    svg.innerHTML=s;
    setSt(p);$('#cuNote').innerHTML=noteHTML(CURE_STEPS[p]);
  }
  const stop=playWire(rg,$('#cuPlay'),draw,16000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CURE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. route cards with an evidence filter ---------- */
  const lblName={all:'all labels',est:'Established',early:'Early evidence',hyp:'Hypothesis',rej:'Rejected'};
  /* on a phone the findings start folded, so the eight routes can be scanned first */
  const fold=NARROW();
  $('#cuCards').innerHTML=CURE_ROUTES.map(R=>{const evs=['est','early','hyp','rej'].filter(e=>R.items.some(i=>i[0]===e));
    return `<article class="card cu-card"><span class="job">${R.job}</span><h4>${R.h}</h4><p class="sum">${R.sum}</p><div class="chips">${evs.map(e=>CURE_EV[e]).join('')}</div><details${fold?'':' open'}><summary>${R.items.length} findings</summary><ul>${R.items.map(i=>`<li data-ev="${i[0]}">${CURE_EV[i[0]]}<span>${i[1]}</span></li>`).join('')}</ul></details></article>`}).join('');
  function filt(f){
    let nf=0,nc=0;
    $$('.cu-card',$('#cuCards')).forEach(c=>{let k=0;$$('li[data-ev]',c).forEach(li=>{const ok=f==='all'||li.dataset.ev===f;li.hidden=!ok;if(ok)k++});c.hidden=!k;nf+=k;if(k)nc++;
      const dt=$('details',c);$('summary',c).textContent=f==='all'?`${k} findings`:`${k} of ${$$('li',c).length} findings: ${lblName[f]}`;if(f!=='all'&&k)dt.open=true});
    $$('[data-cuev]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cuev===f));
    $('#cuCount').textContent=`Showing ${nf} finding${nf===1?'':'s'} in ${nc} route${nc===1?'':'s'} (${lblName[f]}).`;
  }
  $$('[data-cuev]').forEach(b=>b.addEventListener('click',()=>filt(b.dataset.cuev)));
  filt('all');

  /* ---------- 3. forest plot ---------- */
  const fp=$('#cuFp'),fr=$('#cuFpT');let view='a';
  const LN0=Math.log(.4),LN1=Math.log(1.6),TICKS=[.5,.75,1,1.25,1.5];
  const vcol=c=>`var(--${c})`;
  function rowsOf(){return view==='a'?CURE_FA:CURE_FB}
  function drawFp(t){
    const R=rowsOf(),n=R.length,N=NARROW();
    const plotted=r=>view==='a'?r.hr!=null:r.px!=null;
    /* wide: one line per trial; narrow: a block per trial with the plot track at the bottom */
    const rh=r=>N?(plotted(r)?78:58):36;
    const TOP=N?(view==='a'?104:80):84;let tot=0;R.forEach(r=>tot+=rh(r));
    const Hw=TOP+n*36+64,Hn=TOP+tot+(view==='a'?64:44);
    vb(fp,`720 ${Hw}`,`400 ${Hn}`);const H=N?Hn:Hw,W=N?400:720;
    const X0=N?36:262,X1=N?364:470,CX=(X0+X1)/2,HW=(X1-X0)/2-8;
    const xHR=v=>lerp(X0,X1,(Math.log(v)-LN0)/(LN1-LN0));
    let s=`<rect x="0" y="0" width="${W}" height="${H}" style="fill:var(--field)"/>`;
    s+=`<text x="10" y="22" class="t-sm" style="fill:var(--rx);font-weight:600">${view==='a'?(N?'DISABILITY PROGRESSION':'DISABILITY PROGRESSION · HAZARD RATIOS'):(N?'REPAIR & NEUROPROTECTION':'REPAIR AND NEUROPROTECTION TRIALS')}</text>`;
    const sub=view==='a'
      ?(N?['Hazard ratio, log scale. Below 1 favours the','first-named treatment.']:['Hazard ratio on a log scale: below 1 favours the first-named treatment. Timepoints differ by trial.'])
      :(N?['Left of the line favours the treatment. Each','row has its own scale and its own measure.']:['Left of the line favours the treatment. Each row has its own scale and measure:','compare only the side of the line and whether the bar crosses it.']);
    sub.forEach((l,i)=>s+=`<text x="10" y="${40+i*14}" class="t-xs">${l}</text>`);
    if(!N){s+=`<text x="10" y="${TOP-8}" class="t-xs" style="font-weight:700">TRIAL · COMPARISON</text><text x="482" y="${TOP-8}" class="t-xs" style="font-weight:700">RESULT · VERDICT</text>`}
    /* axis furniture */
    const yEnd=N?TOP+tot:TOP+n*36;
    if(view==='a'){
      TICKS.forEach(v=>{const x=xHR(v);
        s+=`<text x="${f1(x)}" y="${N?TOP-8:yEnd+14}" class="t-xs t-mid">${v}</text>`});
      const fy=N?yEnd+20:yEnd+30;
      const x1=xHR(1);s+=`<text x="${f1(x1-6)}" y="${fy}" class="t-xs t-end" style="fill:var(--good)">← favours treatment</text><text x="${f1(x1+6)}" y="${fy}" class="t-xs">favours comparator →</text>`;
      if(N)s+=`<text x="10" y="${fy+16}" class="t-xs">The ticks above give the hazard-ratio scale.</text>`;
    }else{
      const fy=N?yEnd+20:yEnd+16;
      s+=`<text x="${CX-6}" y="${fy}" class="t-xs t-end" style="fill:var(--good)">← favours treatment</text><text x="${CX+6}" y="${fy}" class="t-xs">favours control →</text>`;
      if(!N)s+=`<text x="${CX}" y="${fy+16}" class="t-xs t-mid">no effect</text>`;
    }
    /* rows */
    let y=TOP,shown=0,last=-1;
    R.forEach((r,i)=>{const a=.03+i*(.86/n),d=.86/n*1.7,ro=ease(ramp(t,a,a+d*.4)),ci=ease(ramp(t,a+d*.25,a+d)),h=rh(r);
      if(ro>0){shown++;last=i}
      const pl=plotted(r);
      s+=`<g style="opacity:${ro.toFixed(2)}">`;
      if(!N&&i%2===0)s+=`<rect x="4" y="${y}" width="712" height="36" rx="6" style="fill:var(--panel);opacity:.7"/>`;
      if(N&&i%2===0)s+=`<rect x="4" y="${y+2}" width="392" height="${h-4}" rx="8" style="fill:var(--panel);opacity:.7"/>`;
      const prT=r.pr===2?'university release':r.pr?'press release':'';
      const vtxt=r.v+(prT?' · '+prT:'');
      if(!N){
        s+=`<text x="10" y="${y+15}" class="t-lbl">${r.n}<tspan class="t-xs" dx="6">${r.p}</tspan></text>`;
        s+=`<text x="10" y="${y+29}" class="t-xs">${r.d}</text>`;
        if(pl){s+=`<text x="482" y="${y+15}" class="t-xs" style="fill:var(--ink)">${r.val}</text><text x="482" y="${y+29}" class="t-xs" style="fill:${vcol(r.vc)};font-weight:700">${vtxt}</text>`}
        else{s+=`<text x="${X0}" y="${y+15}" class="t-xs" style="fill:var(--ink)">${r.txt}</text><text x="${X0}" y="${y+29}" class="t-xs" style="fill:${vcol(r.vc)};font-weight:700">${vtxt}<tspan style="fill:var(--muted);font-weight:500"> · no interval to plot</tspan></text>`}
      }else{
        const one=(r.d+' · '+r.p).length<=62;
        s+=`<text x="12" y="${y+18}" class="t-lbl">${r.n}${one?'':`<tspan class="t-xs" dx="6">${r.p}</tspan>`}</text><text x="388" y="${y+18}" class="t-xs t-end" style="fill:${vcol(r.vc)};font-weight:700">${r.v}${prT?`<tspan style="fill:var(--warn);font-weight:500"> · ${prT}</tspan>`:''}</text>`;
        s+=`<text x="12" y="${y+33}" class="t-xs">${one?r.d+' · '+r.p:r.d}</text>`;
        s+=`<text x="12" y="${y+47}" class="t-xs" style="fill:var(--ink)">${pl?r.val:r.txt}</text>`;
      }
      if(pl){const ty=N?y+64:y+18;
        if(!N){if(view==='a')TICKS.forEach(v=>{const x=xHR(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${y}" y2="${y+36}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--muted);stroke-width:1.4':''}"/>`});
          else s+=`<line x1="${CX}" x2="${CX}" y1="${y}" y2="${y+36}" style="stroke:var(--muted);stroke-width:1.4"/>`}
        if(N){s+=`<line x1="${X0}" x2="${X1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:1"/>`;
          const nx=view==='a'?xHR(1):CX;s+=`<line x1="${f1(nx)}" x2="${f1(nx)}" y1="${ty-8}" y2="${ty+8}" style="stroke:var(--muted);stroke-width:1.4"/>`}
        let xp,xl,xh;
        if(view==='a'){
          if(r.off){xp=X0;s+=`<path d="M${X0+14} ${ty} H${X0-10}" style="stroke:${vcol(r.vc)};stroke-width:2.4;opacity:${ci.toFixed(2)}"/><path d="M${X0-14} ${ty} l7 -5 v10 z" style="fill:${vcol(r.vc)};opacity:${ci.toFixed(2)}"/>`;
            s+=`<text x="${X0+18}" y="${ty+3.5}" class="t-xs" style="fill:var(--ink)">off scale</text>`}
          else{xp=xHR(r.hr);if(r.lo!=null){xl=xHR(Math.max(r.lo,.4));xh=xHR(Math.min(r.hi,1.6))}}
        }else{const sc=HW*.92/Math.max(Math.abs(r.plo),Math.abs(r.phi),Math.abs(r.px));xp=CX+r.px*sc;xl=CX+r.plo*sc;xh=CX+r.phi*sc}
        if(xl!=null){s+=`<line x1="${f1(lerp(xp,xl,ci))}" x2="${f1(lerp(xp,xh,ci))}" y1="${ty}" y2="${ty}" style="stroke:${vcol(r.vc)};stroke-width:2.4;stroke-linecap:round"/>`;
          if(ci>.98)s+=`<line x1="${f1(xl)}" x2="${f1(xl)}" y1="${ty-4}" y2="${ty+4}" style="stroke:${vcol(r.vc)};stroke-width:1.6"/><line x1="${f1(xh)}" x2="${f1(xh)}" y1="${ty-4}" y2="${ty+4}" style="stroke:${vcol(r.vc)};stroke-width:1.6"/>`}
        if(!r.off){const sz=r.noci?5:6;s+=`<rect x="${f1(xp-sz)}" y="${f1(ty-sz)}" width="${sz*2}" height="${sz*2}" style="fill:${r.noci?'var(--panel)':vcol(r.vc)};stroke:${vcol(r.vc)};stroke-width:1.6"/>`}
      }
      s+='</g>';y+=h});
    fp.innerHTML=s;
    const nt={k:view==='a'?'Disability progression':'Repair and neuroprotection',t:`Showing ${shown} of ${n} trials`};
    if(last>=0){const r=R[last];nt.txt=`<b>${r.n}</b> (${r.id}) · ${r.d}, ${r.p}. ${r.val||r.txt}; ${r.m}. Verdict: ${r.v}.${r.pr===2?' Source: a university news release; no peer-reviewed numbers yet.':r.pr?' Source: a company press release; no peer-reviewed paper yet (unverified).':''} ${r.cite}`}
    else nt.txt='Press Play to bring the trials in one at a time.';
    if(view==='a'){nt.hook='Only three placebo-controlled trials here met their endpoint in progressive MS: ORATORIO (PPMS), EXPAND (SPMS) and HERCULES (non-relapsing SPMS), with hazard ratios of 0.76, 0.79 and 0.69. All three drugs act on the immune system. [[Montalban2017,Kappos2018,Fox2025]]';
      nt.pt='A hazard ratio of 0.69 means the event happened at about two-thirds the rate seen with the comparator over the trial. A bar that crosses 1 means the trial could not rule out no difference.'}
    else{nt.hook='Clemastine in ReBUILD gave the first randomised evidence of remyelination, a shorter VEP latency. (In the disability set, aHSCT beat continued drug treatment in MIST, HR 0.07.) Most repair and neuroprotection trials missed their main endpoint. [[Green2017,Burt2019]]';
      nt.pt='Most bars here cross the middle line: the drugs did not clearly help. Most of the few that did helped on a scan or a nerve-signal test; the one small disability-score effect (masitinib) awaits a confirmatory trial.'}
    $('#cuFpNote').innerHTML=noteHTML(nt);
  }
  const stopF=playWire(fr,$('#cuFpPlay'),drawFp,14000,'Replay','cure');
  $$('[data-cufp]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.cufp;$$('[data-cufp]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopF();drawFp(+fr.value)}));
  drawFp(+fr.value);
  /* the same results as a table, with sources */
  $('#cuFpTbl').innerHTML=[...CURE_FA,...CURE_FB].map(r=>`<tr><th>${r.n}<br><small>${r.id}</small></th><td>${r.d}</td><td>${r.p}</td><td>${r.val||r.txt}; ${r.m}</td><td><span class="tag ${r.vc}">${r.v}</span></td><td>${r.pr===2?'University news release (preliminary)':r.pr?'Company press release (unverified)':'Peer-reviewed paper'} ${r.cite}</td></tr>`).join('');

  /* ---------- 4. controversies ---------- */
  $('#cuQA').innerHTML=CURE_QA.map((q,i)=>`<details><summary>${String(i+1).padStart(2,'0')} · ${q[0]}</summary><p>${q[1]}</p></details>`).join('');
};
