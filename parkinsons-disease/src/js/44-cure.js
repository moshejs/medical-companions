/* =============== 4.4 cure =============== */
const CU_EV={est:['est','Established'],early:['early','Early evidence'],hyp:['hyp','Hypothesis']};
const CU_RES={met:['good','Met primary'],miss:['bad','Missed primary'],worse:['bad','Worse than placebo'],term:['','Terminated'],open:['warn','Open-label or biomarker'],obs:['warn','Observational'],run:['sky','Running'],event:['sage','Event'],unk:['','Status unknown']};
const CU_RCOL={met:'var(--good)',miss:'var(--bad)',worse:'var(--bad)',term:'var(--muted)',open:'var(--warn)',obs:'var(--warn)',run:'var(--sky)',event:'var(--violet)',unk:'var(--muted)'};
const CU_FILT=[['met','Met primary',['met']],['neg','Missed or worse',['miss','worse','term']],['open','Open-label, biomarker, observational',['open','obs']],['run','Running',['run']],['event','Events',['event']]];
const CU_NODES=[
 {a:'Synuclein',b:'spreads',one:'Synuclein spread',txt:`Misfolded alpha-synuclein outside cells is thought to pass from cell to cell. Antibodies and vaccines aim to catch it there. [[Pagano2022,Eijsvogel2024]] See <a href="#synuclein" data-go="synuclein">Alpha-synuclein and Lewy bodies</a>.`},
 {a:'Lysosome',b:'clearance',one:'Lysosome clearance',txt:`Lysosomes break down worn-out proteins. Overactive LRRK2 kinase affects lysosomal function, and GBA1 makes the lysosomal enzyme glucocerebrosidase. These are the two genes most often found in large testing studies, and the main targets of gene-targeted trials. [[West2005,Sidransky2009,Westenberger2024]] See <a href="#genes" data-go="genes">Genes and inheritance</a>.`},
 {a:'Cell stress:',b:'energy, iron',one:'Cell stress',txt:`Several repurposed drugs aimed at stresses inside dopamine neurons: insulin signalling and mitochondria (GLP-1 drugs, UDCA), iron (deferiprone), calcium entry (isradipine), low urate (inosine) and glycolysis (terazosin). [[Athauda2017,Payne2023,Devos2022,PSG2020STEADY,PSG2021SURE,Cai2019]]`},
 {a:'Dopamine',b:'neurons lost',one:'Neuron loss',txt:`Growth factors such as GDNF and neurturin were delivered by gene therapy to support surviving dopamine neurons. [[VanLaar2025,Marks2010]] See <a href="#circuit" data-go="circuit">The dopamine pathway</a>.`},
 {a:'Striatum short',b:'of dopamine',one:'Dopamine shortfall',txt:`Cell replacement and some gene therapies act at the end of the pathway: new dopamine-making cells, or genes for dopamine-making enzymes, put into the putamen. They aim to restore dopamine, not to stop the disease process. [[Tabar2025,Sawamoto2025,Christine2022]]`}];
const CU_OUT={mixed:{pass:.72,lab:'missed primary; exploratory signal',bar:'var(--sky-soft)',st:'var(--sky)'},bio:{pass:.95,lab:'target engaged; benefit unproven',bar:'var(--sky-soft)',st:'var(--sky)'},
 fail:{pass:1,lab:'target hit; no slowing',bar:'var(--panel-2)',st:'var(--muted)'},worse:{pass:1,lab:'worse than placebo',bar:'var(--bad-soft)',st:'var(--bad)'},
 restore:{pass:1,lab:'grafts make dopamine; open-label',bar:'var(--sky-soft)',st:'var(--sky)'},pending:{pass:1,lab:'phase 3 result awaited',bar:'var(--panel)',st:'var(--sky)'}};
const CU_R=[
 {id:'abs',b:'Synuclein antibodies',s:'Antibodies',name:'Anti-synuclein antibodies',node:0,ev:'early',out:'mixed',
  res:['Two phase 2 trials missed their primary','endpoints; a phase 3 is recruiting'],key:'Exploratory motor signal in both prasinezumab trials',
  mech:`Monoclonal antibodies given by infusion bind aggregated alpha-synuclein outside cells, aiming to stop its cell-to-cell spread. [[Pagano2022,Lang2022]]`,
  txt:`Prasinezumab missed its primary endpoint in PASADENA (316 people) and in PADOVA (586 people; hazard ratio for motor progression 0.84, p=0.066), with a consistent exploratory signal on motor scores. [[Pagano2022,Nikolcheva2026]] Cinpanemab showed no effect and was discontinued. [[Lang2022]] PADOVA's authors call the subgroup findings "prespecified exploratory" evidence; the sponsor and the publication both frame the phase 3, PARAISO, as the confirmatory test. [[Nikolcheva2026,Roche2025]]`,
  pt:'Antibodies against synuclein have not yet clearly slowed Parkinson\'s. One gave hints on secondary measures, and a larger trial is now testing it properly.',
  hook:'Prasinezumab: PASADENA and PADOVA missed primary endpoints; PARAISO phase 3 recruiting. Cinpanemab (SPARK): negative, discontinued.',
  trials:[
   {n:'PASADENA · prasinezumab',id:'NCT03100149',ph:'Phase 2',num:'316',r:'miss',y:2022,d:`Primary (MDS-UPDRS I–III at 52 weeks) not met: change 9.4 on placebo, 7.4 on 1500 mg, 8.8 on 4500 mg; DaT-SPECT no different. Posted results: Part III worsened 5.57 versus 3.69 points (p=0.135). [[Pagano2022,CTgov2026I]]`},
   {n:'SPARK · cinpanemab',id:'NCT03318523',ph:'Phase 2',num:'357',r:'miss',y:2022,d:`Stopped after the week-72 interim for lack of efficacy: MDS-UPDRS total 10.8 on placebo versus 10.5–11.3 on drug (all P≥0.80). Development discontinued. [[Lang2022]]`},
   {n:'PADOVA · prasinezumab',id:'NCT04777331',ph:'Phase 2b',num:'586',r:'miss',y:2026,d:`Time to confirmed motor progression: hazard ratio 0.84 (0.69–1.01), p=0.066; median 61.1 versus 49.7 weeks. In the levodopa-treated subgroup (about 75%) the sponsor reported 0.79, nominal p=0.0431. Serious adverse events 12% in each arm. [[Nikolcheva2026,Roche2025]]`},
   {n:'PARAISO · prasinezumab',id:'NCT07174310',ph:'Phase 3',num:'900 (est.)',r:'run',y:2029.5,d:`Recruiting since November 2025; primary completion estimated 30 June 2029; primary endpoint time to confirmed motor progression. [[CTgov2026I]]`}]},
 {id:'vac',b:'Synuclein vaccines',s:'Vaccines',name:'Active synuclein vaccines',node:0,ev:'hyp',out:'bio',
  res:['Antibodies were made; no clinical','benefit has been shown yet'],key:'Immunogenicity and target engagement only',
  mech:`An active vaccine trains the immune system to make its own antibodies against pathological alpha-synuclein. [[Eijsvogel2024]]`,
  txt:`UB-312 produced serum antibodies in 12 of 13 and spinal-fluid antibodies in 5 of 13 people with Parkinson's given three doses; clinical scales did not differ. [[Eijsvogel2024]] ACI-7104.056 produced antibodies more than 20-fold above placebo at interim, with no drug-related serious adverse events reported; the company did not report efficacy. [[ACImmune2025]]`,
  pt:'Vaccines can make the body produce synuclein antibodies. Whether that helps people is not yet known.',
  hook:'Synuclein vaccines (UB-312, ACI-7104.056): immunogenic, efficacy untested. Hypothesis.',
  trials:[
   {n:'UB-312',id:'NCT04075318',ph:'Phase 1',num:'70 (20 with PD)',r:'open',y:2024,d:`Antibodies in serum (12 of 13) and spinal fluid (5 of 13) after three doses; clinical scales no different; spinal-fluid synuclein seeds fell in a subset (exploratory). [[Eijsvogel2024]]`},
   {n:'VacSYn · ACI-7104.056',id:'NCT06015841',ph:'Phase 2',num:'150 (est.)',r:'open',y:2025.25,d:`Interim, April 2025 (company release): antibodies more than 20-fold above placebo after 4 doses; no efficacy data. [[ACImmune2025]]`},
   {n:'VacSYn completion',id:'NCT06015841',ph:'Phase 2',num:'150 (est.)',r:'run',y:2028.45,d:`Active, not recruiting; primary completion estimated June 2028. [[CTgov2026I]]`}]},
 {id:'glp',b:'GLP-1 drugs',s:'GLP-1',name:'GLP-1 receptor agonists',node:2,ev:'early',out:'mixed',
  res:['Two small trials positive on motor scores;','a phase 3 and another phase 2 negative'],key:'Symptomatic or disease-modifying? Unresolved',
  mech:`GLP-1 receptor agonists, used for diabetes, act on insulin signalling, neuroinflammation and mitochondrial pathways, with a proposed neurotrophic action. [[Athauda2017,Meissner2024]]`,
  txt:`Exenatide (62 people) and lixisenatide (156) improved motor scores in phase 2. [[Athauda2017,Meissner2024]] The phase 3 Exenatide-PD3 (194 people) and NLY01 (255) were negative. [[Vijiaratnam2025,McGarry2024]] In June 2026 The Lancet placed an Expression of Concern on the Exenatide-PD3 paper after an inspection at one site raised trial-conduct concerns, with investigations pending (site details from news coverage, unverified against the notice). [[Vijiaratnam2025]] Whether the positive effects were symptomatic or disease-modifying is unresolved. [[Athauda2017]]`,
  pt:'Diabetes drugs of this family gave mixed results: two small trials looked promising, two others, including the largest, did not.',
  hook:'Exenatide phase 2 and lixisenatide (LIXIPARK) positive; Exenatide-PD3 phase 3 negative (Expression of Concern, 2026); NLY01 negative.',
  trials:[
   {n:'Exenatide phase 2',id:'NCT01971242',ph:'Phase 2',num:'62',r:'met',y:2017,d:`OFF-medication Part III at 60 weeks, after a 12-week washout: adjusted difference −3.5 points (−6.7 to −0.3), p=0.0318. The authors could not separate disease modification from a long-lasting symptomatic effect. [[Athauda2017]]`},
   {n:'LIXIPARK · lixisenatide',id:'NCT03439943',ph:'Phase 2',num:'156',r:'met',y:2024,d:`Part III (ON) at 12 months: −0.04 versus +3.04 (difference 3.08, P=0.007); other secondary endpoints no different; nausea in 46%, vomiting in 13%. [[Meissner2024]]`},
   {n:'NLY01 · pegylated exenatide',id:'NCT04154072',ph:'Phase 2',num:'255',r:'miss',y:2024,d:`MDS-UPDRS II+III no different at 36 weeks (p=0.77 and 0.79); gastrointestinal effects 61–75% versus 36% on placebo. [[McGarry2024]]`},
   {n:'Exenatide-PD3',id:'NCT04232969',ph:'Phase 3',num:'194',r:'miss',y:2025,d:`OFF Part III worsened 5.7 versus 4.5 points over 96 weeks (p=0.47); serious adverse events 9% versus 11%. [[Vijiaratnam2025]]`},
   {n:'Expression of Concern',id:'Exenatide-PD3 paper',ph:'Editorial notice',num:'',r:'event',y:2026.45,d:`The Lancet placed an Expression of Concern on the Exenatide-PD3 paper in June 2026 after a regulatory inspection at one site; investigations were pending (details from news coverage, unverified). [[Vijiaratnam2025]]`},
   {n:'Scandinavian registry cohort',id:'observational',ph:'Cohort',num:'158,961 + 188,065',r:'obs',y:2026.3,d:`Parkinson's incidence 5.2 versus 8.0 per 10,000 person-years in new GLP-1 users versus sulfonylurea users (adjusted HR 0.81); confounding cannot be excluded. [[Engstrom2026]]`},
   {n:'GIPD · semaglutide',id:'NCT03659682',ph:'—',num:'120 (est.)',r:'unk',d:`Status "Unknown"; record last updated 2018; no results posted. [[CTgov2026I]]`}]},
 {id:'lrrk',b:'LRRK2',s:'LRRK2',name:'LRRK2 inhibitors and lowering',node:1,ev:'hyp',out:'fail',
  res:['Largest kinase-inhibitor trial: no slowing,','despite hitting its target'],key:'Results in LRRK2 carriers still pending',
  mech:`LRRK2 mutations raise the enzyme's kinase activity, which affects lysosomes. Inhibitors block the kinase; antisense drugs lower how much LRRK2 is made. [[West2005,Mabrouk2026]]`,
  txt:`In LUMA (648 people with early Parkinson's), BIIB122 did not delay worsening (hazard ratio 1.04) despite more than 90% lowering of a blood LRRK2 marker; the companies discontinued it in idiopathic Parkinson's (conference report, not yet peer reviewed). [[NeurologyLive2026]] The antisense drug BIIB094 lowered spinal-fluid LRRK2 by up to 59% in phase 1. [[Mabrouk2026]] The hypothesis has weakened for idiopathic Parkinson's; results in variant carriers are pending. [[NeurologyLive2026,CTgov2026I]]`,
  pt:'A drug that switched down LRRK2 very effectively did not slow Parkinson\'s in people without the gene change. Trials in carriers continue.',
  hook:'LUMA (BIIB122, 2026): negative despite >90% target engagement. LRRK2 targeting is now a Hypothesis for idiopathic PD.',
  trials:[
   {n:'LUMA · BIIB122',id:'NCT05348785',ph:'Phase 2b',num:'648',r:'miss',y:2026.4,d:`Time to confirmed worsening: HR 1.04 (0.85–1.28), P=.4538; headache 17.1% versus 9.2%; withdrawal for adverse events 11.2% versus 4.6% (MDS 2026 late-breaking abstract, news report). [[NeurologyLive2026]]`},
   {n:'LIGHTHOUSE · BIIB122 in carriers',id:'NCT05418673',ph:'Phase 3',num:'7',r:'term',d:`Terminated after 7 participants; reason given "Sponsor Decision". [[CTgov2026I]]`},
   {n:'REASON · BIIB094 antisense',id:'NCT03976349',ph:'Phase 1',num:'82',r:'open',y:2026.25,d:`No drug-related serious adverse events; spinal-fluid LRRK2 down up to 59% and pRab10 up to 50%; efficacy not assessed. [[Mabrouk2026]]`},
   {n:'LRRK2-associated PD trial',id:'NCT06602193',ph:'Phase 2',num:'50 (est.)',r:'run',y:2027.2,d:`Active, not recruiting; primary completion estimated March 2027. [[CTgov2026I]]`}]},
 {id:'gba',b:'GBA1',s:'GBA1',name:'GBA1 and glucocerebrosidase',node:1,ev:'hyp',out:'fail',
  res:['Two randomised trials of different drugs','were negative'],key:'Ambroxol phase 3 under way',
  mech:`GBA1 makes the lysosomal enzyme glucocerebrosidase (GCase). Drugs try to boost the enzyme (ambroxol, activators, gene therapy) or to reduce its fatty substrates (venglustat). [[Sidransky2009,Mullin2020,Giladi2023]]`,
  txt:`Venglustat did not help GBA1 carriers (221 people) and its follow-up was halted. [[Giladi2023]] The GCase activator BIA 28-6156 showed progression similar to placebo in 273 people, and Bial will not continue it for GBA1 Parkinson's (foundation news, no peer-reviewed data yet). [[MJFF2026]] Ambroxol rests on open-label data without a placebo arm; its phase 3 runs to 2029. [[Mullin2020,CTgov2026I]]`,
  pt:'Drugs aimed at the GBA1 enzyme have not slowed Parkinson\'s so far. A larger trial of ambroxol, an old cough medicine, is under way.',
  hook:'GBA1 route: venglustat (MOVES-PD) and BIA 28-6156 (ACTIVATE) negative; ambroxol phase 3 (ASPro-PD) recruiting.',
  trials:[
   {n:'AiM-PD · ambroxol',id:'NCT02941822',ph:'Open-label',num:'23 (17 analysed)',r:'open',y:2020,d:`Spinal-fluid GCase protein +35% but activity −19%; alpha-synuclein +13%; Part III improved 6.8 points with no placebo arm. [[Mullin2020]]`},
   {n:'MOVES-PD · venglustat',id:'NCT02906020',ph:'Phase 2',num:'221',r:'miss',y:2023,d:`MDS-UPDRS II+III worsened 7.29 versus 4.71 points over 52 weeks (difference 2.58, p=0.17); long-term follow-up halted. [[Giladi2023,CTgov2026I]]`},
   {n:'ACTIVATE · BIA 28-6156',id:'NCT05819359',ph:'Phase 2',num:'273',r:'miss',y:2026.45,d:`Progression similar to placebo over 18 months, no safety concerns; not continued for GBA1 Parkinson's (June 2026 news, no peer-reviewed data). [[MJFF2026]]`},
   {n:'ASPro-PD · ambroxol',id:'NCT05778617',ph:'Phase 3',num:'330 (est.)',r:'run',y:2029.1,d:`Recruiting; primary completion estimated February 2029; primary endpoint MDS-UPDRS I–III change at week 104. [[CTgov2026I]]`},
   {n:'LY3884961 · AAV9-GBA1',id:'NCT04127578',ph:'Phase 1/2a',num:'32 (est.)',r:'run',y:2031.6,d:`Gene therapy; safety endpoints only; primary completion estimated August 2031. [[CTgov2026I]]`}]},
 {id:'cell',b:'Cell replacement',s:'Cells',name:'Cell replacement',node:4,ev:'early',out:'restore',
  res:['Grafts survive and make dopamine; the','controlled fetal-tissue trials missed'],key:'No randomised stem-cell trial has reported',
  mech:`Dopamine-cell precursors, from fetal tissue or now from stem cells, are placed in the putamen to replace lost neurons. This aims to restore dopamine, not to stop the disease. [[Barker2025,Tabar2025]]`,
  txt:`Two sham- or placebo-controlled fetal-tissue trials missed their primary endpoints, with dyskinesia that persisted off medication. [[Freed2001,Olanow2003]] Stem-cell grafts survived and made dopamine on PET, with open-label motor improvement and no graft-induced dyskinesia in 12 and 7 people. [[Tabar2025,Sawamoto2025]] Japan's conditional approval rests on 7 uncontrolled patients, which is not the same as established efficacy. [[ParkinsonCanada2026]]`,
  pt:'Transplanted cells can survive and make dopamine. Whether they help more than a sham operation is being tested now.',
  hook:'Fetal transplants (2001, 2003): negative sham-controlled trials. Stem-cell grafts: open-label signals; exPDite-2 sham-controlled phase 3 running.',
  trials:[
   {n:'Fetal transplant, US',id:'sham-controlled',ph:'Controlled',num:'40',r:'miss',y:2001,d:`Global rating at 1 year 0.0 versus −0.4 with sham, not significantly different; people 60 or younger improved on UPDRS; dyskinesia recurred in 15%. [[Freed2001]]`},
   {n:'Fetal transplant, double-blind',id:'placebo procedure',ph:'Controlled',num:'34',r:'miss',y:2003,d:`No overall effect on OFF motor score (p=0.244); dyskinesia persisted off medication in 56% of transplanted patients. [[Olanow2003]]`},
   {n:'Autologous iPSC case',id:'single patient',ph:'Case',num:'1',r:'open',y:2020,d:`Patient-derived cells without immunosuppression; PET suggested graft survival; symptoms stable or improved at 18–24 months (single uncontrolled case). [[Schweitzer2020]]`},
   {n:'TRANSEURO · fetal tissue',id:'NCT01898390',ph:'Open-label',num:'11',r:'miss',y:2025.3,d:`No overall clinical effect at 3 years; 18F-DOPA uptake improved in 7, near-normal in 1; no major graft-induced dyskinesia. The authors conclude a stem-cell source is needed. [[Barker2025]]`},
   {n:'Bemdaneprocel · hESC',id:'NCT04802733',ph:'Phase 1',num:'12',r:'open',y:2025.3,d:`No product-related adverse events or graft-induced dyskinesia; 18F-DOPA uptake rose at 18 months; OFF Part III improved about 23 points in the high-dose group (open-label). [[Tabar2025]]`},
   {n:'Kyoto · iPSC',id:'jRCT2090220384',ph:'Phase 1/2',num:'7',r:'open',y:2025.3,d:`No serious adverse events; OFF Part III improved in 4 of 6 evaluable patients by a mean 9.5 points; putaminal 18F-DOPA uptake +44.7%; no graft overgrowth. [[Sawamoto2025]]`},
   {n:'Japan: conditional approval',id:'raguneprocel (AMCHEPRY)',ph:'Regulatory',num:'',r:'event',y:2026.2,d:`Conditional, time-limited approval in early March 2026, valid in Japan only, on the 7-patient trial; 7 years to collect confirmatory data. [[ParkinsonCanada2026]]`},
   {n:'exPDite-2 · bemdaneprocel',id:'NCT06944522',ph:'Phase 3',num:'102 (est.)',r:'run',y:2027.2,d:`Randomised 2:1 to cells or sham surgery, triple-masked; primary endpoint ON time without troublesome dyskinesia; primary completion estimated March 2027. [[CTgov2026I]]`}]},
 {id:'gene',b:'Gene therapy',s:'Gene therapy',name:'Gene therapy',node:3,ev:'early',out:'mixed',
  res:['One small sham-controlled trial positive','(GAD); the neurturin trial negative'],key:'GDNF slowing: open-label data only',
  mech:`Viral vectors deliver genes for growth factors (GDNF, neurturin), for dopamine-making enzymes (AADC, ProSavin) or for GAD, which changes signalling in the subthalamic nucleus. [[VanLaar2025,Christine2022,Palfi2014,LeWitt2011]]`,
  txt:`AAV2-GAD beat sham surgery on motor scores at 6 months, a symptomatic effect. [[LeWitt2011]] The sham-controlled neurturin trial was negative. [[Marks2010]] GDNF, AADC and ProSavin have open-label data only, and the GDNF trial's moderate group had no control arm. [[VanLaar2025,Christine2022,Palfi2014]] A randomised GDNF trial runs to 2028. [[CTgov2026I]]`,
  pt:'Gene therapy has eased symptoms in one small controlled trial. Whether it can protect neurons is not known.',
  hook:'AAV2-GAD: positive sham-controlled phase 2 (symptomatic). AAV2-neurturin: negative. GDNF: Hypothesis for disease modification.',
  trials:[
   {n:'AAV2-neurturin · CERE-120',id:'NCT00400634',ph:'Phase 2',num:'58',r:'miss',y:2010,d:`Sham-controlled: UPDRS III OFF difference −0.31 (−5.58 to 4.97), p=0.91 at 12 months; serious adverse events 13 of 38 versus 4 of 20. [[Marks2010]]`},
   {n:'AAV2-GAD',id:'NCT00643890',ph:'Phase 2',num:'45',r:'met',y:2011,d:`Sham-controlled: UPDRS III OFF improved 8.1 points (23.1%) versus 4.7 (12.7%) at 6 months (p=0.04); later listed as terminated for financial reasons. [[LeWitt2011,CTgov2026I]]`},
   {n:'ProSavin',id:'open-label',ph:'Phase 1/2',num:'15',r:'open',y:2014,d:`UPDRS III OFF 38 to 26 at 6 months; on-medication dyskinesia the commonest drug-related event; its successor was terminated after 6 participants. [[Palfi2014,CTgov2026I]]`},
   {n:'VY-AADC01',id:'PD-1101',ph:'Phase 1',num:'15',r:'open',y:2022,d:`No vector-related serious adverse events over 3 years; medication needs fell 21–30% in the higher-dose cohorts; the randomised follow-on enrolled only 14. [[Christine2022,CTgov2026I]]`},
   {n:'AB-1005 · AAV2-GDNF',id:'NCT04167540',ph:'Phase 1b',num:'11',r:'open',y:2025.4,d:`Moderate cohort at 18 months: OFF Part III −20.4 points, OFF time −1.7 h a day, no control arm; mild cohort numerically stable. [[VanLaar2025]]`},
   {n:'REGENERATE-PD · AB-1005',id:'NCT06285643',ph:'Phase 2',num:'127 (est.)',r:'run',y:2028.6,d:`Randomised; primary endpoint motor diary at month 18; completion estimated August 2028. [[CTgov2026I]]`}]},
 {id:'rep',b:'Repurposed drugs',s:'Repurposed',name:'Repurposed drugs that failed',node:2,ev:'est',neg:1,out:'worse',
  res:['Isradipine and inosine: negative phase 3;','deferiprone did worse than placebo'],key:'Terazosin and telmisartan now in a phase 3 platform',
  mech:`Drugs approved for other conditions were tested against iron build-up (deferiprone), calcium entry (isradipine), low urate (inosine), c-Abl kinase (nilotinib, risvodetinib) and mitochondrial function (UDCA). [[Devos2022,PSG2020STEADY,PSG2021SURE,Simuni2021,Payne2023]]`,
  txt:`Negative, stated plainly: isradipine and inosine failed in phase 3, and deferiprone made people worse than placebo while lowering iron in the substantia nigra. [[PSG2020STEADY,PSG2021SURE,Devos2022]] Nilotinib barely entered the brain, and its authors said it "should not be further tested in PD". [[Simuni2021]] Terazosin's rationale comes from animal models and records data; it is now in a phase 3 platform. [[Cai2019,CTgov2026I]]`,
  pt:'Several medicines already used for other illnesses were tested properly and did not slow Parkinson\'s. One, an iron remover, made people worse.',
  hook:'Established negative: isradipine (STEADY-PD III), inosine (SURE-PD3); deferiprone (FAIRPARK-II) worse than placebo.',
  trials:[
   {n:'STEADY-PD III · isradipine',id:'NCT02168842',ph:'Phase 3',num:'336',r:'miss',y:2020,d:`Effect on UPDRS I–III −0.27 points (−3.02 to 2.48), P=0.85 over 36 months; the dose may not have engaged the target. [[PSG2020STEADY]]`},
   {n:'SURE-PD3 · inosine',id:'NCT02642393',ph:'Phase 3',num:'298',r:'miss',y:2021,d:`Stopped for futility: urate rose 44% but progression was 11.1 versus 9.9 points a year (P=.18); kidney stones 7.0 versus 1.4 per 100 patient-years. [[PSG2021SURE]]`},
   {n:'NILO-PD · nilotinib',id:'NCT03205488',ph:'Phase 2',num:'76',r:'miss',y:2021,d:`Spinal-fluid to serum ratio only 0.2–0.3%; Part III ON worse at 300 mg at month 1. [[Simuni2021]]`},
   {n:'FAIRPARK-II · deferiprone',id:'NCT02655315',ph:'Phase 2',num:'372',r:'worse',y:2022,d:`MDS-UPDRS total worsened 15.6 versus 6.3 (difference 9.3, P<0.001); dopaminergic therapy needed by 22.0% versus 2.7%; agranulocytosis in 2. [[Devos2022]]`},
   {n:'UP study · UDCA',id:'NCT03840005',ph:'Phase 2',num:'30',r:'miss',y:2023,d:`Safe, with signs of midbrain target engagement on 31P-MRS; Part III no different. [[Payne2023]]`},
   {n:'201 Trial · risvodetinib',id:'NCT05424276',ph:'Phase 2a',num:'137',r:'open',y:2026.2,d:`Met its safety and tolerability primary endpoints; the lead secondary endpoint, MDS-UPDRS II+III, was not significant. [[Werner2026]]`},
   {n:'EJS ACT-PD · terazosin, telmisartan',id:'NCT07207057',ph:'Phase 3',num:'1,200 (est.)',r:'run',d:`Multi-arm platform against placebo for 36 months; primary endpoint MDS-UPDRS I+II. [[CTgov2026I]]`}]},
 {id:'ex',b:'Exercise',s:'Exercise',name:'Exercise as disease modification',node:2,ev:'hyp',out:'pending',
  res:['Phase 3 result expected after mid-2027;','symptom benefit is a separate question'],key:'Exercise as therapy: see Living with Parkinson\'s',
  mech:`High-intensity aerobic exercise is being tested for whether it slows the disease, as distinct from easing symptoms. [[Schenkman2018,SPARX3]]`,
  txt:`In SPARX, 128 people with untreated early Parkinson's who did high-intensity treadmill exercise changed by +0.3 motor points over 6 months, against +3.2 in wait-list controls (P=.03). [[Schenkman2018]] SPARX3 (370 people) compares high and moderate intensity, with results expected after its estimated July 2027 primary completion. [[SPARX3,CTgov2026I]] As disease modification this is a Hypothesis; the symptomatic benefits of exercise are covered in <a href="#living" data-go="living">Living with Parkinson's</a>.`,
  pt:'Exercise helps symptoms. Whether it also slows Parkinson\'s is being tested in a large trial.',
  hook:'SPARX (phase 2): high-intensity treadmill exercise passed non-futility. SPARX3 (phase 3) running.',
  trials:[
   {n:'SPARX · treadmill',id:'phase 2',ph:'Phase 2',num:'128',r:'met',y:2018,d:`High-intensity arm +0.3 versus +3.2 points in controls over 6 months (P=.03); only the high-intensity arm passed the non-futility threshold. [[Schenkman2018]]`},
   {n:'SPARX3 · treadmill',id:'NCT04284436',ph:'Phase 3',num:'370',r:'run',y:2027.55,d:`High versus moderate intensity, 4 times a week; active, not recruiting; primary outcome MDS-UPDRS III change at 12 months; completion estimated July 2027. [[SPARX3,CTgov2026I]]`}]}];
const CU_PH=[
 {from:0,at:.15,k:'Step 1',t:'The pathway'},
 {from:.3,at:.48,k:'Step 2',t:'How the route works'},
 {from:.55,at:.8,k:'Step 3',t:'Best evidence so far'}];
const CU_PIPE={
 23:{l:'2023 snapshot · 139 trials',sym:55,dm:45,ph:[34,52,14],c:'[[McFarthing2023]]',x:'42% of trials tested novel agents and 35% repurposed drugs.'},
 24:{l:'2024 snapshot · 136 trials',sym:56,dm:44,ph:[30,58,12],c:'[[McFarthing2024]]',x:'Only three phase 3 studies were testing treatments to slow progression.'},
 10:{l:'2015–2024 · 444 trials, 281 drugs',sym:63,dm:37,ph:[42,46,12],c:'[[Buff2026]]',x:'52% of trials tested novel drugs and about a third repurposed drugs; 133 were still ongoing at the end of 2024.'}};
function cuIcon(i,x,y){
  if(i===0)return syn(x-9,y-7,7,1,1)+syn(x+8,y+6,7,1,1)+syn(x+6,y-10,5,1,0)+syn(x-8,y+9,5,1,1);
  if(i===1){let s=`<circle cx="${x}" cy="${y}" r="15" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:2"/>`;[[-5,-4],[4,-6],[6,5],[-4,6],[0,0]].forEach(([a,b])=>{s+=`<circle cx="${x+a}" cy="${y+b}" r="2.6" style="fill:var(--violet)"/>`});return s}
  if(i===2)return `<ellipse cx="${x}" cy="${y}" rx="18" ry="10" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/><path d="M${x-11} ${y+6}q3 -12 6 0q3 -12 6 0q3 -12 6 0" style="fill:none;stroke:var(--warn);stroke-width:1.5"/>`;
  if(i===3)return neuron(x+2,y,8,1,{pig:1,axonLen:0,dendrites:4,seed:5});
  return vesicle(x-8,y+4,6.5,1,1)+vesicle(x+8,y+4,6.5,1,0)+vesicle(x,y-8,6.5,1,1)}
const cuBg=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
inits.cure=()=>{
  /* ---------------- 1. pathway ---------------- */
  const svg=$('#cuSvg'),rg=$('#cuT');let R=CU_R[0],lastN='';
  $('#cuRoutes').innerHTML='<span class="kicker">Route</span>'+CU_R.map((r,i)=>`<button class="btn" data-r="${i}" aria-pressed="${i===0}">${r.b}</button>`).join('');
  const P=Array.from({length:46},(_,i)=>{const q=rng(211+i);return{ph:i/46+q()*.02,w:q()*6.28,h:q()}});
  function draw(t){
    const N=vb(svg,'720 400','400 722');
    const L=N?{st:[80,185,290,395,500],s0:40,s1:540,cx:110,ix:44,lx:146,box:[16,556,368,150]}
             :{st:[90,230,370,510,650],s0:24,s1:696,cy:150,iy:70,ly:196,box:[16,244,688,146]};
    const O=CU_OUT[R.out],node=R.node,drop=ease(ramp(t,.3,.5)),eff=ramp(t,.5,.64),res=ramp(t,.55,.7);
    const sPos=v=>(v-L.s0)/(L.s1-L.s0),bs=sPos(L.st[node]);
    const XY=(sv,w)=>N?[L.cx+11*Math.sin(w+sv*14),lerp(L.s0,L.s1,sv)]:[lerp(L.s0,L.s1,sv),L.cy+11*Math.sin(w+sv*14)];
    let s=cuBg+(N?`<text x="20" y="24" class="t-xs">A SIMPLIFIED PATHWAY, TOP TO BOTTOM</text>`:`<text x="16" y="22" class="t-xs">A SIMPLIFIED PATHWAY, LEFT TO RIGHT</text>`);
    s+=N?`<rect x="${L.cx-24}" y="${L.s0}" width="48" height="${L.s1-L.s0}" rx="24" style="fill:var(--panel-2)"/>`:`<rect x="${L.s0}" y="${L.cy-24}" width="${L.s1-L.s0}" height="48" rx="24" style="fill:var(--panel-2)"/>`;
    CU_NODES.forEach((nd,i)=>{const c=L.st[i],sel=i===node,col=sel?'var(--ink)':'var(--muted)',fw=sel?600:500;
      if(N){s+=`<path d="M${L.ix+27} ${c}H${L.cx-26}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 3"/><circle cx="${L.ix}" cy="${c}" r="26" style="fill:var(--panel);stroke:${sel?'var(--sky)':'var(--line)'};stroke-width:${sel?2:1}"/>`+cuIcon(i,L.ix,c);
        s+=`<text x="${L.lx}" y="${c+2}" class="t-sm" style="fill:${col};font-weight:${fw}">${nd.one}</text>`}
      else{s+=`<path d="M${c} ${L.iy+28}V${L.cy-26}" style="stroke:var(--line);stroke-width:1.5;stroke-dasharray:3 3"/><circle cx="${c}" cy="${L.iy}" r="28" style="fill:var(--panel);stroke:${sel?'var(--sky)':'var(--line)'};stroke-width:${sel?2:1}"/>`+cuIcon(i,c,L.iy);
        s+=`<text x="${c}" y="${L.ly}" class="t-sm t-mid" style="fill:${col};font-weight:${fw}">${nd.a}</text><text x="${c}" y="${L.ly+14}" class="t-sm t-mid" style="fill:${col};font-weight:${fw}">${nd.b}</text>`}});
    const restore=R.out==='restore'&&eff>0,s4=sPos(L.st[4]);
    const segCol=sv=>{const x=lerp(L.s0,L.s1,sv);return restore&&sv>s4?'var(--amber)':x<L.st[2]?'var(--rose)':x<L.st[3]?'var(--warn)':'var(--muted)'};
    const blocked=(1-O.pass)*eff;
    P.forEach((p,i)=>{const sv=(p.ph+t*1.6)%1;
      if(sv>bs&&p.h<blocked){const pl=bs-.012-(i%5)*.008,[x,y]=XY(pl,p.w);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:${segCol(pl)};opacity:.5"/>`;return}
      const [x,y]=XY(sv,p.w);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${restore&&sv>s4?3.8:3.2}" style="fill:${segCol(sv)}"/>`});
    if(R.out==='worse'&&eff>0)for(let j=0;j<12;j++){const sv=bs+((j/12+t*1.6)%1)*(1-bs),[x,y]=XY(sv,j*1.3);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--bad);opacity:${f1(eff*.9)}"/>`}
    if(drop>0){const c=L.st[node];
      if(R.out==='restore'){for(let k=0;k<3;k++){const off=(k-1)*(N?18:20),yy=lerp(-40,0,drop);
          s+=N?neuron(L.cx+off+30,c+30+yy,6,drop,{axonLen:0,dendrites:3,fill:'var(--sky-soft)',col:'var(--sky)'}):neuron(c+off+8,L.cy+34+yy,6,drop,{axonLen:0,dendrites:3,fill:'var(--sky-soft)',col:'var(--sky)'})}}
      else{const hl=(N?26:32)*drop,dash=R.out==='pending'||R.out==='bio';
        const st=`fill:${dash?'var(--panel)':O.bar};stroke:${O.st};stroke-width:2;${dash?'stroke-dasharray:4 3;':''}opacity:${f1(.4+.6*drop)}`;
        s+=N?`<rect x="${f1(L.cx-hl)}" y="${c-6}" width="${f1(hl*2)}" height="12" rx="4" style="${st}"/>`:`<rect x="${c-6}" y="${f1(L.cy-hl)}" width="12" height="${f1(hl*2)}" rx="4" style="${st}"/>`;
        if(R.out==='fail'&&eff>0)s+=N?`<path d="M${L.cx-7} ${c-7}l14 14m0 -14l-14 14" style="stroke:var(--bad);stroke-width:2.2;opacity:${f1(eff)}"/>`:`<path d="M${c-7} ${L.cy-7}l14 14m0 -14l-14 14" style="stroke:var(--bad);stroke-width:2.2;opacity:${f1(eff)}"/>`}
      if(eff>0)s+=N?`<text x="${L.lx}" y="${c+18}" class="t-xs" style="fill:${R.out==='worse'?'var(--bad)':'var(--ink)'};opacity:${f1(eff)}">▲ ${O.lab}</text>`
                   :`<text x="${clamp(c,120,600)}" y="${L.ly+32}" class="t-xs t-mid" style="fill:${R.out==='worse'?'var(--bad)':'var(--ink)'};opacity:${f1(eff)}">${O.lab}</text>`}
    const [bx,by,bw,bh]=L.box,EV=CU_EV[R.ev];
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${bx+16}" y="${by+28}" class="t-big">${R.name}</text>`;
    const tw=EV[1].length*6.4+16,tc=R.ev==='est'?'good':R.ev==='early'?'warn':'sky';
    s+=`<rect x="${bx+16}" y="${by+40}" width="${f1(tw)}" height="19" rx="5" style="fill:var(--${tc}-soft)"/><text x="${bx+24}" y="${by+53.5}" class="t-xs" style="fill:var(--${tc});font-weight:600">${EV[1].toUpperCase()}</text>`;
    let tx=bx+28+tw;
    if(R.neg){s+=`<rect x="${f1(tx-6)}" y="${by+40}" width="70" height="19" rx="5" style="fill:var(--bad-soft)"/><text x="${f1(tx+2)}" y="${by+53.5}" class="t-xs" style="fill:var(--bad);font-weight:600">NEGATIVE</text>`;tx+=74}
    if(!N)s+=`<text x="${f1(tx)}" y="${by+53.5}" class="t-xs">target: ${CU_NODES[node].one}</text>`;
    if(res>0)s+=`<g style="opacity:${f1(res)}"><text x="${bx+16}" y="${by+(N?86:84)}" class="t-lbl">${R.res[0]}</text><text x="${bx+16}" y="${by+(N?104:102)}" class="t-lbl">${R.res[1]}</text><text x="${bx+16}" y="${by+(N?130:126)}" class="t-xs" style="fill:var(--ink)">${R.key}</text></g>`;
    else s+=`<text x="${bx+16}" y="${by+(N?86:84)}" class="t-sm">${t<.3?'Watch the flow, then the marker drops.':'The marker is in place…'}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(CU_PH,t);setSt(ph);
    const ev=`<span class="ev ${EV[0]}">${EV[1]}</span>${R.neg?' <span class="tag bad">Negative</span>':''}`;
    const NP=[{k:'The pathway · '+CU_NODES[node].one,t:CU_NODES[node].one,txt:CU_NODES[node].txt,pt:'Each step is a possible place to intervene. Press play to see the marker drop here.'},
              {k:ev+' · how it works',t:R.name,txt:R.mech,pt:R.pt},
              {k:ev+' · best evidence',t:R.res.join(' '),txt:R.txt,pt:R.pt,hook:R.hook}][ph];
    const h=noteHTML(NP);if(h!==lastN){$('#cuNote').innerHTML=h;lastN=h}
    $('#cuCap').textContent=`Route: ${R.name} (${EV[1]}${R.neg?', negative':''}). Schematic, not to scale; the flow beyond the marker is a picture of the trial result, not a measurement.`;
  }
  const stop=playWire(rg,$('#cuPlay'),draw,13000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_PH,rg,draw,stop);
  $('#cuRoutes').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;stop();R=CU_R[+b.dataset.r];
    $$('[data-r]',$('#cuRoutes')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    rg.value=0;draw(0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)$('#cuPlay').click();else{rg.value=.8;draw(.8)}});

  /* ---------------- 2. route cards ---------------- */
  $('#cuCards').innerHTML=CU_R.map(r=>{const E=CU_EV[r.ev];
    return `<div class="card"><div class="chips"><span class="ev ${E[0]}">${E[1]}</span>${r.neg?'<span class="tag bad">Negative</span>':''}<span class="tag">Target: ${CU_NODES[r.node].one}</span></div><h4>${r.name}</h4><p>${r.mech}</p><ul style="padding-left:0;list-style:none;gap:10px">`
      +r.trials.map(T=>{const RS=CU_RES[T.r];return `<li style="border-top:1px solid var(--line);padding-top:8px"><b>${T.n}</b> <span class="tag ${RS[0]}">${RS[1]}</span><br><span style="font:500 12px var(--mono);color:var(--muted)">${T.id} · ${T.ph}${T.num?' · n = '+T.num:''}</span><br>${T.d}</li>`}).join('')+'</ul></div>'}).join('');

  /* ---------------- 3. timeline ---------------- */
  const tl=$('#cuTl'),tr=$('#cuTlT'),Y0=2000,Y1=2032,TODAY=2026.8;let rf=-1,on={met:1,neg:1,open:1,run:1,event:1},sel=null,lastT='';
  const TL=[];CU_R.forEach((r,ri)=>r.trials.forEach(T=>{if(T.y)TL.push({...T,ri})}));
  const grp=r=>CU_FILT.find(f=>f[2].includes(r))[0];
  $('#cuTlRoutes').insertAdjacentHTML('beforeend',`<button class="btn" data-rf="-1" aria-pressed="true">All</button>`+CU_R.map((r,i)=>`<button class="btn" data-rf="${i}" aria-pressed="false">${r.s}</button>`).join(''));
  $('#cuTlRes').insertAdjacentHTML('beforeend',CU_FILT.map(f=>`<button class="btn" data-ff="${f[0]}" aria-pressed="true">${f[1]}</button>`).join(''));
  const vis=T=>(rf<0||T.ri===rf)&&on[grp(T.r)];
  function drawTl(t){
    const N=vb(tl,'720 380','400 600'),cy=lerp(Y0,Y1,t);
    const L=N?{x0:20,x1:380,y0:84,dy:54,ty:44,lg:556}:{x0:178,x1:700,y0:62,dy:31,ty:38,lg:350};
    const X=y=>L.x0+(y-Y0)/(Y1-Y0)*(L.x1-L.x0),H=N?600:380,yEnd=L.y0+8*L.dy+14;
    let s=cuBg+`<text x="${N?16:16}" y="20" class="t-xs">${N?'TRIAL RESULTS BY YEAR':'TRIAL RESULTS BY YEAR · ONE ROW PER ROUTE'}</text>`;
    for(let y=Y0;y<=Y1;y+=N?8:4)s+=`<text x="${f1(X(y))}" y="${L.ty}" class="t-xs t-mid">${y}</text>`+(N?'':`<path d="M${f1(X(y))} ${L.ty+6}V${yEnd}" class="grid" style="opacity:.6"/>`);
    s+=`<path d="M${f1(X(TODAY))} ${L.ty+6}V${yEnd}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${f1(X(TODAY))}" y="${yEnd+12}" class="t-xs t-mid" style="fill:var(--ink)">Oct 2026</text>`;
    s+=`<path d="M${f1(X(cy))} ${L.ty+6}V${yEnd}" style="stroke:var(--sky);stroke-width:2.5;opacity:.85"/><circle cx="${f1(X(cy))}" cy="${L.ty+6}" r="4" style="fill:var(--sky)"/>`;
    CU_R.forEach((r,i)=>{const y=L.y0+i*L.dy,fade=rf>=0&&rf!==i;
      if(rf===i)s+=`<rect x="6" y="${y-(N?30:14)}" width="${N?388:708}" height="${N?46:28}" rx="8" style="fill:var(--sky-soft)"/>`;
      s+=N?`<text x="16" y="${y-14}" class="t-sm" style="fill:var(--ink);opacity:${fade?.35:1}">${r.b}</text>`:`<text x="16" y="${y+4}" class="t-sm" style="fill:var(--ink);opacity:${fade?.35:1}">${r.b}</text>`;
      s+=`<path d="M${L.x0} ${y}H${L.x1}" class="axis" style="opacity:${fade?.3:1}"/>`});
    const lev={};
    TL.forEach((T,k)=>{const y0=L.y0+T.ri*L.dy,x=X(T.y),key=T.ri+':'+Math.round(x/10);const lv=lev[key]=(lev[key]??-1)+1,y=y0+[0,-8,8,-14][lv%4];
      T._x=x;T._y=y;const v=vis(T),past=T.y<=cy+.01,c=CU_RCOL[T.r],o=v?(past?1:.35):.08,r=sel===k?8:6;
      if(T.r==='run')s+=`<circle class="clk" data-k="${k}" cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:${c};stroke-width:2;stroke-dasharray:3 2;opacity:${o}"/>`;
      else if(T.r==='event')s+=`<path class="clk" data-k="${k}" d="M${f1(x)} ${f1(y-r)}l${r} ${r}l${-r} ${r}l${-r} ${-r}z" style="fill:${c};opacity:${o}"/>`;
      else s+=`<circle class="clk" data-k="${k}" cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${past?c:'var(--panel)'};stroke:${T.r==='worse'?'var(--ink)':c};stroke-width:${T.r==='worse'?2:1.6};opacity:${o}"/>`;
      if(sel===k)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="12" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`});
    const LG=[['met','Met primary'],['miss','Missed'],['worse','Worse'],['open','Open-label, biomarker'],['event','Event'],['run','Running']];
    const LX=N?[16,146,256,16,196,276]:[16,136,236,326,506,596];
    LG.forEach(([k,l],i)=>{const x=LX[i],y=N?L.lg+Math.floor(i/3)*20:L.lg+16,c=CU_RCOL[k];
      s+=k==='run'?`<circle cx="${x+5}" cy="${y-4}" r="5" style="fill:var(--panel);stroke:${c};stroke-width:2;stroke-dasharray:3 2"/>`:k==='event'?`<path d="M${x+5} ${y-10}l6 6l-6 6l-6 -6z" style="fill:${c}"/>`:`<circle cx="${x+5}" cy="${y-4}" r="5" style="fill:${c};${k==='worse'?'stroke:var(--ink);stroke-width:2':''}"/>`;
      s+=`<text x="${x+15}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    tl.innerHTML=s;
    let k=sel;if(k==null||!vis(TL[k])){const cand=TL.map((T,i)=>[T,i]).filter(([T])=>vis(T)&&T.y<=cy+.01).sort((a,b)=>a[0].y-b[0].y);k=cand.length?cand[cand.length-1][1]:null}
    let h;
    if(k==null)h=noteHTML({k:'Timeline',t:'No result yet with these filters',txt:'Move the years further on, or turn more filters back on.'});
    else{const T=TL[k],RT=CU_R[T.ri],RS=CU_RES[T.r];
      h=noteHTML({k:`${RT.name} · <span class="tag ${RS[0]}">${RS[1]}</span>`,t:`${T.n}, ${Math.floor(T.y)}`,txt:`<b>${T.id} · ${T.ph}${T.num?' · n = '+T.num:''}.</b> ${T.d}`,pt:RT.pt})}
    if(h!==lastT){$('#cuTlNote').innerHTML=h;lastT=h}
    const vv=TL.filter(vis);
    $('#cuTlRead').innerHTML=`<span>Year <b>${Math.floor(cy)}</b></span><span>Shown <b>${vv.filter(T=>T.r!=='run').length}</b> results</span><span><b>${vv.filter(T=>T.r==='run').length}</b> still running</span><span><b>${vv.filter(T=>T.r==='met').length}</b> met their primary endpoint</span>`;
    tr.setAttribute('aria-valuetext',`Year ${Math.floor(cy)}`);
  }
  const stopT=playWire(tr,$('#cuTlPlay'),drawTl,16000,'Replay','cure');
  tr.addEventListener('input',()=>{if(sel!=null){sel=null;drawTl(+tr.value)}});
  tl.addEventListener('click',e=>{const d=e.target.closest('[data-k]');if(!d)return;stopT();sel=+d.dataset.k;const T=TL[sel];if(T.y>lerp(Y0,Y1,+tr.value))tr.value=clamp((T.y-Y0)/(Y1-Y0)+.002);drawTl(+tr.value)});
  $('#cuTlRoutes').addEventListener('click',e=>{const b=e.target.closest('[data-rf]');if(!b)return;rf=+b.dataset.rf;sel=null;$$('[data-rf]',$('#cuTlRoutes')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawTl(+tr.value)});
  $('#cuTlRes').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;const f=b.dataset.ff;on[f]=on[f]?0:1;b.setAttribute('aria-pressed',!!on[f]);sel=null;drawTl(+tr.value)});

  /* ---------------- 4. pipeline ---------------- */
  const pp=$('#cuPipe');let pk=24,pv={...CU_PIPE[24],ph:[...CU_PIPE[24].ph]},stopP=null;
  function drawPipe(){
    const N=vb(pp,'720 230','400 290'),D=CU_PIPE[pk];
    const A=N?{x0:16,x1:384,y:62}:{x0:20,x1:330,y:66},B=N?{x0:90,x1:340,y:170,dy:36}:{x0:460,x1:660,y:62,dy:40};
    let s=cuBg+`<text x="${N?16:20}" y="24" class="t-xs">${D.l.toUpperCase()}</text>`;
    s+=`<text x="${A.x0}" y="${A.y-10}" class="t-sm" style="fill:var(--ink)">What the trials test</text>`;
    const w=A.x1-A.x0,ws=w*pv.sym/100;
    s+=`<rect x="${A.x0}" y="${A.y}" width="${f1(ws)}" height="30" rx="4" style="fill:var(--sky-soft);stroke:var(--sky)"/><rect x="${f1(A.x0+ws)}" y="${A.y}" width="${f1(w-ws)}" height="30" rx="4" style="fill:var(--sky)"/>`;
    s+=`<text x="${A.x0+8}" y="${A.y+20}" class="t-lbl" style="fill:var(--ink)">${Math.round(pv.sym)}%</text><text x="${A.x1-8}" y="${A.y+20}" class="t-lbl t-end" style="fill:var(--on-sage)">${Math.round(pv.dm)}%</text>`;
    s+=`<text x="${A.x0}" y="${A.y+48}" class="t-xs">symptomatic</text><text x="${A.x1}" y="${A.y+48}" class="t-xs t-end">disease-modifying</text>`;
    s+=`<text x="${N?16:B.x0-50}" y="${B.y-12}" class="t-sm" style="fill:var(--ink)">Trials by phase <tspan class="t-xs">(bars 0–60%)</tspan></text>`;
    ['Phase 1','Phase 2','Phase 3'].forEach((l,i)=>{const y=B.y+i*B.dy+(N?8:4),v=pv.ph[i];
      s+=`<text x="${B.x0-10}" y="${y+12}" class="t-xs t-end" style="fill:var(--ink)">${l}</text><rect x="${B.x0}" y="${y}" width="${B.x1-B.x0}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x0}" y="${y}" width="${f1((B.x1-B.x0)*v/60)}" height="16" rx="4" style="fill:var(--violet)"/><text x="${f1(B.x0+(B.x1-B.x0)*v/60+6)}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${Math.round(v)}%</text>`});
    s+=`<text x="${N?16:20}" y="${N?318:198}" class="t-xs" style="fill:var(--ink)">${N?'':D.x}</text>`;
    pp.innerHTML=s;
    $('#cuPipeCap').innerHTML=`${D.l}: ${D.sym}% symptomatic and ${D.dm}% disease-modifying; phases ${D.ph.join('%, ')}%. ${D.x} ${D.c}`;
  }
  const setPipe=k=>{pk=k;[[23,'#cuP23'],[24,'#cuP24'],[10,'#cuP10']].forEach(([a,id])=>$(id).setAttribute('aria-pressed',a===k));
    const from={...pv,ph:[...pv.ph]},to=CU_PIPE[k];if(stopP)stopP();
    stopP=animate(700,p=>{const e=ease(p);pv={sym:lerp(from.sym,to.sym,e),dm:lerp(from.dm,to.dm,e),ph:from.ph.map((v,i)=>lerp(v,to.ph[i],e))};drawPipe()},()=>{stopP=null;pv={sym:to.sym,dm:to.dm,ph:[...to.ph]};drawPipe()})};
  $('#cuP23').onclick=()=>setPipe(23);$('#cuP24').onclick=()=>setPipe(24);$('#cuP10').onclick=()=>setPipe(10);

  /* ---------------- 5. delayed start ---------------- */
  const ds=$('#cuDs'),dr=$('#cuDsT');let dm=false,lastD='';
  const base=u=>.15+.6*u,S=.08;
  const early=u=>(dm?.15+.36*u:base(u))-S*ramp(u,0,.06);
  const late=u=>(u<.5?base(u):(dm?base(.5)+.36*(u-.5):base(u)))-S*ramp(u,.5,.56);
  function drawDs(t){
    const N=vb(ds,'720 300','400 420');
    const L=N?{x0:44,x1:380,y0:250,y1:40,lx:16,ly:300}:{x0:60,x1:440,y0:250,y1:40,lx:466,ly:70};
    const X=u=>L.x0+u*(L.x1-L.x0),Y=v=>L.y0-v*(L.y0-L.y1)/.85;
    let s=cuBg;
    s+=`<rect x="${X(0)}" y="${L.y1}" width="${f1(X(.5)-X(0))}" height="${L.y0-L.y1}" style="fill:var(--panel-2);opacity:.6"/>`;
    s+=`<text x="${f1(X(.25))}" y="${L.y1+16}" class="t-xs t-mid">PHASE 1: DRUG VS PLACEBO</text><text x="${f1(X(.75))}" y="${L.y1+16}" class="t-xs t-mid">PHASE 2: BOTH GROUPS ON DRUG</text>`;
    s+=`<path d="M${L.x0} ${L.y0}H${L.x1}M${L.x0} ${L.y0}V${L.y1}" class="axis" style="stroke:var(--muted)"/><text x="${f1((L.x0+L.x1)/2)}" y="${L.y0+18}" class="t-xs t-mid">time in the trial →</text>`;
    s+=`<text x="${L.x0-8}" y="${L.y1+30}" class="t-xs t-end" transform="rotate(-90 ${L.x0-8} ${L.y1+30})">worse ↑</text>`;
    s+=`<path d="M${f1(X(.5))} ${L.y1}V${L.y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    const u1=Math.max(.001,t);
    s+=`<path d="${pathFn(u=>1-early(u*u1)/.85,L.x0,X(u1),L.y1,L.y0,80)}" style="fill:none;stroke:var(--sky);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<path d="${pathFn(u=>1-late(u*u1)/.85,L.x0,X(u1),L.y1,L.y0,80)}" style="fill:none;stroke:var(--warn);stroke-width:3;stroke-linecap:round;stroke-dasharray:${t<.5?'7 5':'none'}"/>`;
    s+=`<circle cx="${f1(X(u1))}" cy="${f1(Y(early(u1)))}" r="5" style="fill:var(--sky)"/><circle cx="${f1(X(u1))}" cy="${f1(Y(late(u1)))}" r="5" style="fill:var(--warn)"/>`;
    if(t>.95){const g=late(1)-early(1),x=X(1)+8;s+=g>.02?`<path d="M${f1(x)} ${f1(Y(early(1)))}V${f1(Y(late(1)))}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(x-4)}" y="${f1(Y(late(1))-8)}" class="t-xs t-end" style="fill:var(--ink)">gap remains</text>`:`<text x="${f1(X(1)-4)}" y="${f1(Y(early(1))-12)}" class="t-xs t-end" style="fill:var(--ink)">lines meet</text>`}
    const LG=[['var(--sky)','','Early start','drug from the start'],['var(--warn)','7 5','Delayed start','placebo, then drug']];
    LG.forEach(([c,d,l,l2],i)=>{const y=N?L.ly+i*24:L.ly+i*40;s+=`<path d="M${L.lx} ${y-4}h22" style="stroke:${c};stroke-width:3;stroke-dasharray:${d||'none'}"/><text x="${L.lx+30}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}${N?': '+l2:''}</text>`+(N?'':`<text x="${L.lx+30}" y="${y+14}" class="t-xs">${l2}</text>`)});
    const vy=L.ly+(N?62:100);
    s+=`<text x="${L.lx}" y="${vy}" class="t-sm">IF THE DRUG ${dm?'SLOWS THE DISEASE':'ONLY EASES SYMPTOMS'}</text><text x="${L.lx}" y="${vy+22}" class="t-lbl">${dm?'The early group keeps its lead.':'The delayed group catches up.'}</text>`;
    ds.innerHTML=s;dr.setAttribute('aria-valuetext',t<.5?'Phase 1, drug versus placebo':'Phase 2, both groups on drug');
    const h=noteHTML({k:'Delayed-start design · schematic',t:dm?'A lasting gap suggests slowing':'Catching up suggests a symptomatic effect',
      txt:`In phase 1 one group takes the drug and the other placebo; in phase 2 both take the drug. If the delayed group catches up, the benefit looks symptomatic; if a gap persists, that is consistent with slowing. In ADAGIO (1,176 people), early-start rasagiline 1 mg met all three hierarchical end points but 2 mg did not, so the authors advised caution: delayed-start results can be hard to interpret. [[Olanow2009]]`,
      pt:'Starting a drug earlier should leave a lasting advantage only if it changes the course of the disease.',
      hook:'Delayed start: persistent gap after both arms are on drug = consistent with disease modification. ADAGIO: rasagiline 1 mg positive, 2 mg not. [[Olanow2009]]'});
    if(h!==lastD){$('#cuDsNote').innerHTML=h;lastD=h}
  }
  playWire(dr,$('#cuDsPlay'),drawDs,9000,'Replay','cure');
  const setDm=v=>{dm=v;$('#cuDsSym').setAttribute('aria-pressed',!v);$('#cuDsDm').setAttribute('aria-pressed',v);drawDs(+dr.value)};
  $('#cuDsSym').onclick=()=>setDm(false);$('#cuDsDm').onclick=()=>setDm(true);

  const prevR=redraws.cure;redraws.cure=()=>{prevR&&prevR();drawPipe()};
  draw(+rg.value);drawTl(+tr.value);drawPipe();drawDs(+dr.value);
};
