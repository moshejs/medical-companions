/* =============== 4.3 toward a cure =============== */
const CU_STEPS=[
 {from:0,at:.04,k:'Gene (DNA)',t:'Silence or edit the faulty gene',
  txt:`A gene therapy can deliver a microRNA that silences SOD1 from inside cells. In a first-in-human report, two people with SOD1-ALS received one intrathecal AAV infusion. In the first, spinal cord SOD1 at autopsy was lower than in untreated SOD1-ALS and meningoradiculitis occurred; the second, pretreated with immunosuppression, had stable function over 12 months [[Mueller2020]]. AMT-162 uses the same idea and is in a phase 1/2 safety stage with no efficacy data [[NCT06100276]]. Targeting the C9orf72 DNA repeat itself is a hypothesis [[Mizielinska2025]].`,
  pt:`The first point of attack is the faulty gene itself: switch it off before it makes anything harmful.`,
  hook:`Gene-level routes so far rest on a <b>two-patient report</b> and a safety-stage trial: early evidence at most [[Mueller2020,NCT06100276]].`},
 {from:.14,at:.18,k:'RNA',t:'Destroy the toxic message',
  txt:`Antisense oligonucleotides (ASOs) are given into the spinal fluid and lead to the breakdown of a target RNA. Tofersen lowers SOD1 and plasma NfL, and its US accelerated approval is based on that NfL reduction [[Miller2022,FDA2023Qalsody]]. Ulefnersen for FUS-ALS has a positive phase 3 topline reported in the news on 22 September 2026, not yet peer reviewed [[NeurologyLive2026]]. Two C9orf72 ASOs, BIIB078 and WVE-004, lowered their targets without clinical benefit [[vandenBerg2024,NCT04931862]]. A 2024 review notes that ASOs in ALS have often shown proof of mechanism without proof of clinical benefit [[Ito2024]].`,
  pt:`Instead of fixing the gene, these drugs shred its message so less harmful protein is made. So far this has worked best for rarer genetic forms.`,
  hook:`Targeted therapy has worked first in <b>gene-specific ALS (SOD1, FUS)</b>. About 97% of ALS has TDP-43 accumulation, and routes for that majority are unproven [[EstevezFraga2026]].`},
 {from:.28,at:.32,k:'RNA splicing',t:'Repair what TDP-43 loss breaks',
  txt:`When TDP-43 is lost from the nucleus, some RNAs are spliced wrongly. STMN2, needed for axon growth and repair, falls [[Klim2019]], and a cryptic exon enters UNC13A [[Ma2022,Brown2022]]. ASOs that block the faulty STMN2 splice site restored the protein in human motor neurons and in mice [[Baughn2023]]. QRL-201, an STMN2-restoring ASO, has company interim data: a significant result only in a post hoc subgroup, with no numbers released [[QurAlis2026]]. Lowering ataxin-2 helped TDP-43 mice [[Becker2017]], but BIIB105 lowered ATXN2 in people without improving NfL or function [[Biogen2024]]. Lithium in UNC13A C/C carriers stopped when an interim analysis showed no survival benefit [[NCT06008249]].`,
  pt:`TDP-43 normally keeps some messages edited correctly. These routes try to repair the edits that go wrong when it is lost.`,
  hook:`Silencing TDP-43 itself is probably not appropriate given its cellular functions, so researchers target what it controls: <b>STMN2, UNC13A, ATXN2</b> [[Becker2017]].`},
 {from:.42,at:.46,k:'Protein and aggregation',t:'Clear misfolded protein',
  txt:`VTx-002, an AAV-delivered antibody against TDP-43, is in a first-in-human phase 1/2 [[NCT07287397]]. ACI-5891.9 neutralised seeding-competent TDP-43 from patient CSF in the laboratory [[Audrain2023]]. PIKFYVE inhibition helped cells expel aggregation-prone proteins and extended survival in several ALS models [[Hung2023]]; one human phase 1b was terminated "due to lack of risk-benefit data" [[NCT06215755]]. Drugs aimed at the integrated stress response (DNL343, fosigotifator) and trehalose did not slow disease in the HEALEY platform [[Paganoni2026,LongevityTech2025,HEALEY2025Trehalose]].`,
  pt:`Misfolded protein clumps inside motor neurons. These routes try to clear the clumps or help the cell cope; none has worked in people yet.`,
  hook:`HEALEY Regimen G: DNL343 gave a disease rate ratio of <b>1.04</b>, no evidence of slowing [[Paganoni2026]].`},
 {from:.56,at:.60,k:'Neurons and glia',t:'Protect neurons, calm glia',
  txt:`Many trials aim at inflammation and cell survival. Masitinib, low-dose IL-2 and ultra-high-dose methylcobalamin each have a positive analysis that is contested or limited to a selected group [[Mora2020,Bensimon2025,Oki2022]]. Zilucoplan, verdiperstat, CNM-Au8, pridopidine, the RIPK1 inhibitor SAR443820, rapamycin, TUDCA, memantine and trazodone were negative on their primary endpoints [[Paganoni2025,HEALEY2025Verdiperstat,HEALEY2025CNMAu8,HEALEY2025Pridopidine,Cudkowicz2026,Mandrioli2023,NeurologyLive2024,Pal2024]]. The cell therapy NurOwn missed its phase 3 primary endpoint [[Cudkowicz2022]]. GDNF-secreting progenitor cells met a safety endpoint in a phase 1/2a [[Baloh2022]].`,
  pt:`Most drugs tried at this level have not slowed ALS in good trials. A few have mixed results that still need confirming.`,
  hook:`A recurring pattern: a <b>negative primary result</b> next to a positive subgroup or adjusted analysis that is used to justify further trials [[Benatar2025e]].`},
 {from:.70,at:.74,k:'Circuit and muscle',t:'Measuring the effect',
  txt:`Trials read out function (ALSFRS-R), breathing (vital capacity, now also coached at home), strength and survival, together with neurofilament light (NfL), a blood marker of nerve damage. At-home vital capacity agreed well with clinic values (Lin's rc 0.82) [[Macklin2026]]. Wrist-worn accelerometry declined more slowly than ALSFRS-R and predicted smaller samples for trials longer than 12 months [[Holdom2025]]. NfL is established as a prognostic marker [[Benatar2018]]; as a surrogate endpoint it has supported approval only in SOD1-ALS [[FDA2023Qalsody]], and a 2026 review found NfL changes did not always match clinical change [[Zheng2026]].`,
  pt:`To know whether a drug works, trials measure daily function, breathing, strength, survival and a nerve-damage marker in the blood.`,
  hook:`<b>NfL</b>: an established prognostic marker, and an accepted surrogate only for SOD1-ALS (tofersen accelerated approval) [[FDA2023Qalsody]].`},
 {from:.84,at:.88,k:'Before symptoms',t:'Treat carriers early',
  txt:`In carriers who later developed ALS, NfL was raised as far back as about 12 months before the first symptoms [[Benatar2018]]. ATLAS monitors plasma NfL in presymptomatic carriers of high-penetrance, rapidly progressive SOD1 variants and randomises them to tofersen or placebo when NfL reaches at least 44 pg/mL and has risen by at least 10 pg/mL from baseline. Its primary endpoint is the proportion who develop clinically manifest ALS within 12 months [[Benatar2022a]]. It has 158 people enrolled and no results yet [[NCT04856982]]. Mild motor impairment and a 19-protein plasma panel are being developed to time treatment [[Benatar2025a,Ran2026]].`,
  pt:`Some people carry an ALS gene for years before any symptom. The idea is to treat when blood tests show the disease starting, before weakness.`,
  hook:`<b>ATLAS</b> (NCT04856982) is described by its designers as the first interventional trial in presymptomatic ALS [[Benatar2022a]].`}
];
const CU_TXT={
 head:'WHERE RESEARCH INTERVENES',stepOf:(i,n)=>`Step ${i} of ${n}`,
 nodesW:['gene (DNA)','RNA','protein','aggregation','neuron, glia','circuit','muscle'],
 nodesN:['Gene (DNA)','RNA','Protein','Aggregation','Neurons and glia','Circuit','Muscle'],
 splice:'splicing',
 listHead:['Routes acting on the gene','Routes acting on RNA','Routes repairing splicing','Routes acting on protein','Routes protecting cells','What trials measure','Treating before symptoms'],
 none:'No route in this step carries the chosen label.',
 evShort:{est:'established',early:'early evidence',hyp:'hypothesis',neg:'tested, negative',none:'measure'},
 evLong:{est:'Established',early:'Early evidence',hyp:'Hypothesis',neg:'Tested and negative',none:'Measure, no label'},
 filters:[ ['all','All routes'],['est','Established'],['early','Early evidence'],['hyp','Hypothesis'],['neg','Tested and negative'] ],
 st:{COMPLETED:'Completed',ACTIVE_NOT_RECRUITING:'Active, not recruiting',RECRUITING:'Recruiting',TERMINATED:'Terminated',NOT_YET_RECRUITING:'Not yet recruiting',UNKNOWN:'Unknown status',AVAILABLE:'Available (expanded access)'},
 reg:(n,id,s,d)=>`${n} · ${id} · ${s} · last update ${d}`,
 plot:{y:'plasma NfL',x:'time',onset:'symptoms begin',thr:'ATLAS threshold',rand:'randomised here'},
 foot:'Shape and word both give the evidence label. Schematic, not to scale.',
 footN:['Shape and word both give the','evidence label. Schematic.'],
 cap:(i,n,f)=>`Step ${i} of ${n}. Showing: ${f}. Schematic pathway, not to scale.`,
 noCards:'No route on this page carries the chosen label.'
};
/* route markers: n name, ev label, node (index on the pathway; 1.5 = the splicing step), step */
const CU_MK=[
 {n:'AAV microRNA (SOD1)',ev:'early',node:0,step:0},{n:'AMT-162 (SOD1)',ev:'hyp',node:0,step:0},{n:'C9orf72 DNA repeat',ev:'hyp',node:0,step:0},
 {n:'Tofersen (SOD1)',ev:'est',node:1,step:1},{n:'Ulefnersen (FUS)',ev:'early',node:1,step:1},{n:'BIIB078 (C9orf72)',ev:'neg',node:1,step:1},
 {n:'WVE-004 (C9orf72)',ev:'neg',node:1,step:1},{n:'C9orf72 ASO, 1 person',ev:'early',node:1,step:1},{n:'CHCHD10 ASO, 1 person',ev:'early',node:1,step:1},
 {n:'G-quadruplex binders',ev:'hyp',node:1,step:1},
 {n:'QRL-201 (STMN2)',ev:'early',node:1.5,step:2},{n:'UNC13A target',ev:'hyp',node:1.5,step:2},{n:'Lithium, UNC13A C/C',ev:'neg',node:1.5,step:2},{n:'BIIB105 (ATXN2)',ev:'neg',node:1.5,step:2},
 {n:'Poly-GA antibodies',ev:'hyp',node:2,step:3},{n:'DNL343',ev:'neg',node:2,step:3},{n:'Fosigotifator',ev:'neg',node:2,step:3},
 {n:'VTx-002 (TDP-43)',ev:'hyp',node:3,step:3},{n:'ACI-5891.9 (TDP-43)',ev:'hyp',node:3,step:3},{n:'PIKFYVE inhibition',ev:'hyp',node:3,step:3},
 {n:'Apilimod (C9orf72)',ev:'early',node:3,step:3},{n:'Trehalose',ev:'neg',node:3,step:3},
 {n:'Masitinib',ev:'early',node:4,step:4},{n:'Low-dose IL-2',ev:'early',node:4,step:4},{n:'Methylcobalamin',ev:'early',node:4,step:4},
 {n:'GDNF progenitor cells',ev:'early',node:4,step:4},{n:'Ibudilast',ev:'hyp',node:4,step:4},{n:'Zilucoplan',ev:'neg',node:4,step:4},
 {n:'Verdiperstat',ev:'neg',node:4,step:4},{n:'CNM-Au8',ev:'neg',node:4,step:4},{n:'Pridopidine',ev:'neg',node:4,step:4},
 {n:'RIPK1 inhibitor',ev:'neg',node:4,step:4},{n:'Rapamycin',ev:'neg',node:4,step:4},{n:'NurOwn (cells)',ev:'neg',node:4,step:4},
 {n:'TUDCA',ev:'neg',node:4,step:4},{n:'Memantine',ev:'neg',node:4,step:4},{n:'Trazodone',ev:'neg',node:4,step:4},
 {n:'Metformin, nifedipine',ev:'neg',node:4,step:4},
 {n:'NfL, prognosis',ev:'est',node:5,step:5},{n:'NfL surrogate, SOD1',ev:'est',node:5,step:5},{n:'NfL beyond SOD1',ev:'hyp',node:5,step:5},
 {n:'ALSFRS-R, survival',ev:'none',node:6,step:5},{n:'At-home vital capacity',ev:'early',node:6,step:5},{n:'Wrist accelerometry',ev:'early',node:6,step:5},
 {n:'ATLAS (presymptomatic)',ev:'early',node:null,step:6},{n:'Mild motor impairment',ev:'early',node:null,step:6},{n:'Plasma protein panel',ev:'early',node:null,step:6}
];
/* route cards: each item has an evidence label (ev), an optional label wording (w), a title (h), text, and registry records */
const CU_CARDS=[
 {t:'SOD1: tofersen, ATLAS and gene therapy',items:[
  {ev:'est',h:'Tofersen (Qalsody), intrathecal antisense',
   txt:`In VALOR, 108 adults with SOD1-ALS were randomised 2:1 to tofersen or placebo. In the faster-progression group the week-28 ALSFRS-R difference was 1.2 points (95% CI -3.2 to 5.5, P = 0.97), so the primary endpoint was not met, while CSF SOD1 and plasma NfL fell more with tofersen [[Miller2022,NCT02623699]]. Over 148 weeks, early start was associated with numerically less decline than delayed start (ALSFRS-R -9.9 vs -13.5 points); survival was compared with natural history, not with a concurrent placebo group [[Miller2026,NCT03070119]]. The US approval is accelerated, based on reduction in plasma NfL, and the EU authorisation of 29 May 2024 is under exceptional circumstances [[FDA2023Qalsody,EMA2024Qalsody]].`,
   reg:[{n:'VALOR',id:'NCT02623699',s:'COMPLETED',d:'2023-07-28'},{n:'Open-label extension',id:'NCT03070119',s:'COMPLETED',d:'2025-08-29'}]},
  {ev:'early',w:'Early evidence: design, no results',h:'ATLAS: tofersen before symptoms',
   txt:`A phase 3 trial in clinically presymptomatic adult carriers of high-penetrance, rapidly progressive SOD1 variants. Part A measures plasma NfL monthly. A carrier is randomised 1:1 to tofersen or placebo (Part B, about 28 planned) when NfL is at least 44 pg/mL and has risen by at least 10 pg/mL from baseline while still presymptomatic. The primary endpoint is the proportion who develop clinically manifest ALS within 12 months, and anyone who does receives open-label tofersen [[Benatar2022a]]. 158 people are enrolled, estimated completion is 30 April 2028, and no efficacy results were found in any published or press source as of 20 October 2026 [[NCT04856982]].`,
   reg:[{n:'ATLAS',id:'NCT04856982',s:'ACTIVE_NOT_RECRUITING',d:'2026-10-20'}]},
  {ev:'early',h:'AAV microRNA against SOD1 (two patients)',
   txt:`Two people with SOD1-ALS received one intrathecal infusion of an AAV encoding a microRNA against SOD1. In patient 1, spinal cord SOD1 at autopsy was lower than in untreated SOD1-ALS, CSF SOD1 fell only slightly and briefly, and meningoradiculitis occurred. Patient 2, pretreated with immunosuppression, had stable function over 12 months [[Mueller2020]].`},
  {ev:'hyp',w:'Hypothesis to early evidence: safety stage',h:'AMT-162 (AAVrh10 microRNA)',
   txt:`EPISOD1 is a phase 1/2 single ascending dose study with 20 participants, started on 1 August 2024. No efficacy data were found [[NCT06100276]].`,
   reg:[{n:'EPISOD1',id:'NCT06100276',s:'ACTIVE_NOT_RECRUITING',d:'2025-10-22'}]}
 ]},
 {t:'C9orf72: the most common genetic cause',lede:`Why it has been hard: the G4C2 repeat is read in both directions, makes several dipeptide repeat proteins and causes a mix of loss and gain of function. A 2025 review suggests ASO trials may have failed because they targeted a single gain-of-function mechanism [[Mizielinska2025]].`,items:[
  {ev:'neg',h:'BIIB078 (sense-strand antisense)',
   txt:`106 adults with C9orf72-ALS received intrathecal BIIB078 (5-90 mg) or placebo. Serious adverse events occurred in 18% on BIIB078 and 33% on placebo. There was no reduction in neurofilament levels and no benefit on clinical outcomes, and development was discontinued [[vandenBerg2024,NCT03626012]]. In tissue from treated people, CSF dipeptide repeat proteins fell, but these proteins and phosphorylated TDP-43 remained abundant in the brain [[McEachin2025]].`,
   reg:[{n:'BIIB078 phase 1',id:'NCT03626012',s:'COMPLETED',d:'2022-01-14'}]},
  {ev:'neg',h:'WVE-004 (FOCUS-C9)',
   txt:`Terminated with 35 enrolled. The registry reason reads "Despite robust, sustained reductions in poly(GP), no clinical benefit was seen at 24 weeks"; the company reported maximal mean poly(GP) reductions of 48-51% [[NCT04931862,Wave2023]].`,
   reg:[{n:'FOCUS-C9',id:'NCT04931862',s:'TERMINATED',d:'2023-10-23'}]},
  {ev:'early',w:'Early evidence: one person, biomarker only',h:'An optimised C9orf72 antisense in one person',
   txt:`Repeated intrathecal dosing was well tolerated with significant falls in CSF poly(GP). The authors state that further trials are needed to show safety and efficacy [[Tran2022]].`},
  {ev:'early',w:'Early evidence, pending',h:'Apilimod (PIKFYVE inhibitor) in C9orf72-ALS',
   txt:`A phase 2a with 15 enrolled; results are posted to the registry, and no peer-reviewed report was found [[NCT05163886]].`,
   reg:[{n:'LAM-002A',id:'NCT05163886',s:'COMPLETED',d:'2026-09-29'}]},
  {ev:'hyp',h:'Other C9 approaches',
   txt:`Targeting the DNA repeat itself, several repeat-derived RNAs at once, or downstream TDP-43 dysfunction are described as "on the horizon" [[Mizielinska2025]]. Small molecules that stabilise the repeat RNA reduced RNA foci and repeat proteins in patient-derived neurons and flies [[Simone2018]], and antibodies against poly-GA improved behaviour and survival in mice [[Nguyen2020]].`}
 ]},
 {t:'ATXN2: lowering ataxin-2',items:[
  {ev:'hyp',h:'The idea, in mice',
   txt:`Reducing ataxin-2, by knockout or a single CNS dose of ASO, reduced TDP-43 aggregation and markedly extended survival in TDP-43 transgenic mice [[Becker2017]].`},
  {ev:'neg',h:'BIIB105 (ION541), ALSpire',
   txt:`In the companies' 16 May 2024 release, CSF ATXN2 fell significantly, but plasma NfL, function, breathing and strength did not improve, including in people with an ATXN2 poly-CAG expansion. Discontinuation for adverse events was 8.3% vs 3.6% on placebo. The trial was terminated by sponsor decision with 99 enrolled [[NCT04494256,Biogen2024]].`,
   reg:[{n:'ALSpire',id:'NCT04494256',s:'TERMINATED',d:'2025-10-09'}]}
 ]},
 {t:'FUS: ulefnersen',lede:`The same antisense drug appears as ION363, jacifusen and ulefnersen, depending on date and source [[Korben2022,Shneider2025,NCT07862959]].`,items:[
  {ev:'early',h:'From mice to a case series',
   txt:`In FUS knock-in mice the ASO silenced Fus and delayed motor neuron degeneration, and in one person with a FUS P525L variant repeated intrathecal dosing lowered FUS and markedly reduced aggregate burden [[Korben2022]]. In an expanded-access series of 12 participants (median age 26), CSF NfL fell by up to 82.8% after 6 months. Most kept declining on ALSFRS-R, one showed objective functional recovery after 10 months and another stayed without symptoms; two deaths were judged unrelated [[Shneider2025]].`},
  {ev:'early',w:'Early evidence: topline from a news report, not peer reviewed',h:'FUSION phase 1-3',
   txt:`Randomised, double-blind and placebo-controlled for 72 weeks, then open-label, with 89 enrolled [[NCT04768972]]. On 22 September 2026, a news report of the companies' announcement said the primary joint-rank endpoint (death or permanent ventilation, time to rescue, ALSFRS-R change through day 505) favoured ulefnersen over placebo (P = .0005), and that serum NfL and a time-to-event composite also favoured treatment. Effect sizes were not disclosed, the result is not peer reviewed, and the drug is not approved anywhere [[NeurologyLive2026]]. An early access programme is listed for the period from the trial results until commercial availability [[NCT07862959]].`,
   reg:[{n:'FUSION',id:'NCT04768972',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-21'},{n:'Early access',id:'NCT07862959',s:'AVAILABLE',d:'2026-10-07'}]}
 ]},
 {t:'STMN2: restoring a repair protein',items:[
  {ev:'hyp',h:'The target',
   txt:`Loss of nuclear TDP-43 causes mis-splicing that lowers STMN2, needed for axon outgrowth and regeneration; restoring it rescued these deficits in human motor neurons [[Klim2019]]. ASOs that block the cryptic splice site restored stathmin-2 in human motor neurons and in gene-edited mice [[Baughn2023]].`},
  {ev:'early',w:'Early evidence: interim, post hoc, not peer reviewed',h:'QRL-201 (ANQUR)',
   txt:`A February 2026 company release reported a reduction in pNfH in the low-dose group, an ALSFRS-R "trend", and a significant result only in a post hoc subgroup. No numbers were released. The company plans a phase 3 in 2027. 69 are enrolled [[NCT05633459,QurAlis2026]].`,
   reg:[{n:'ANQUR',id:'NCT05633459',s:'ACTIVE_NOT_RECRUITING',d:'2026-05-15'}]}
 ]},
 {t:'Other TDP-43 routes: UNC13A, antibodies, PIKFYVE',lede:`Silencing TDP-43 itself is probably not appropriate given its critical cellular functions, which is why indirect routes were pursued [[Becker2017]].`,items:[
  {ev:'hyp',h:'UNC13A',
   txt:`TDP-43 loss lets a cryptic exon into UNC13A RNA and lowers the protein; the ALS and FTD risk variants sit in that intron and increase cryptic exon inclusion. Both 2022 papers name it a therapeutic target [[Ma2022,Brown2022]].`},
  {ev:'neg',w:'Tested and negative (interim analysis)',h:'Lithium in UNC13A C/C carriers (TRICALS)',
   txt:`The registry reason reads "The planned interim analysis showed no survival benefit", with 88 enrolled of a planned 171 selected by genotype and TRICALS risk score [[NCT06008249,Willemse2022]].`,
   reg:[{n:'Lithium, UNC13A',id:'NCT06008249',s:'TERMINATED',d:'2026-05-13'}]},
  {ev:'hyp',w:'Hypothesis: first-in-human safety stage',h:'VTx-002 (AAV-delivered antibody against TDP-43)',
   txt:`An open-label phase 1/2 given intracisternally, about 36 participants, started 19 December 2025. No results [[NCT07287397]].`,
   reg:[{n:'PIONEER-ALS',id:'NCT07287397',s:'RECRUITING',d:'2026-10-16'}]},
  {ev:'hyp',h:'ACI-5891.9',
   txt:`Neutralised seeding-competent TDP-43 from the CSF of people with sporadic ALS in a laboratory assay. No ClinicalTrials.gov entry in ALS was found [[Audrain2023]].`},
  {ev:'hyp',h:'PIKFYVE inhibition',
   txt:`Activated the expulsion of aggregation-prone proteins and extended survival in C9ORF72, TARDBP, FUS and sporadic ALS models [[Hung2023]]. A phase 1b of VRG50635 was terminated "due to lack of risk-benefit data" with 54 enrolled [[NCT06215755]].`,
   reg:[{n:'VRG50635',id:'NCT06215755',s:'TERMINATED',d:'2025-12-15'}]}
 ]},
 {t:'Cell therapy',items:[
  {ev:'neg',h:'NurOwn (MSC-NTF), phase 3',
   txt:`196 enrolled. 33% on NurOwn and 28% on placebo met the responder definition at 28 weeks (OR 1.33, P = .45), so the primary endpoint was not met; a prespecified subgroup showed 35% vs 16% (P = .29) [[Cudkowicz2022,NCT03280056]]. An FDA advisory committee voted 17 no, 1 yes and 1 abstention on 27 September 2023 on whether the data showed substantial evidence of effectiveness [[CGTLive2023]]. A new phase 3b is registered but not yet recruiting [[NCT06973629]].`,
   reg:[{n:'NurOwn phase 3',id:'NCT03280056',s:'COMPLETED',d:'2024-02-29'},{n:'NurOwn phase 3b',id:'NCT06973629',s:'NOT_YET_RECRUITING',d:'2025-05-22'}]},
  {ev:'early',w:'Early evidence: safety and delivery only',h:'Neural progenitor cells secreting GDNF',
   txt:`18 people received one-sided lumbar spinal cord transplants. The 1-year safety endpoint was met, grafts survived and made GDNF for up to 42 months, and benign neuromas near delivery sites were common at post-mortem. The trial was not designed to show efficacy [[Baloh2022,NCT02943850]].`,
   reg:[{n:'CNS10-NPC-GDNF',id:'NCT02943850',s:'COMPLETED',d:'2020-07-15'}]}
 ]},
 {t:'Platform trials',lede:`A platform tests several drugs under one protocol, sharing placebo participants to save time.`,items:[
  {ev:'none',w:'Design',h:'HEALEY ALS Platform',
   txt:`Each regimen randomises 3:1 to drug or placebo and shares placebo participants across regimens. The primary endpoint, a joint model of ALSFRS-R and survival, is reported as a disease rate ratio (DRR), where below 1 favours the drug [[Paganoni2025,NCT04297683]]. Regimen I (NUZ-001) started in February 2026 [[NCT07410806]].`,
   reg:[{n:'HEALEY master protocol',id:'NCT04297683',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-21'},{n:'Regimen I, NUZ-001',id:'NCT07410806',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-20'}]},
  {ev:'neg',h:'HEALEY regimens A to G',
   txt:`<ul><li>A, zilucoplan: DRR 1.08 (95% CrI 0.87-1.31), stopped early for futility [[Paganoni2025]]</li><li>B, verdiperstat: DRR 0.98 (0.77-1.24) [[HEALEY2025Verdiperstat]]</li><li>C, CNM-Au8: DRR 0.97 (0.783-1.175) [[HEALEY2025CNMAu8]]; an earlier phase 2 missed its primary endpoint but reported an exploratory fall in deaths [[Vucic2023,NCT04098406]]</li><li>D, pridopidine: DRR 0.99 (0.80-1.21) [[HEALEY2025Pridopidine]]</li><li>E, trehalose: DRR 0.87 (0.665-1.102), serious adverse events 16% vs 7% [[HEALEY2025Trehalose]]</li><li>F, fosigotifator: primary endpoint not met at either dose, as reported in January 2025, no peer-reviewed report [[LongevityTech2025,NCT05740813]]</li><li>G, DNL343: DRR 1.04 (0.83-1.32) [[Paganoni2026,NCT05842941]]</li></ul>`,
   reg:[{n:'Regimen A',id:'NCT04436497',s:'COMPLETED',d:'2023-07-25'},{n:'Regimen B',id:'NCT04436510',s:'COMPLETED',d:'2023-06-12'},{n:'Regimen C',id:'NCT04414345',s:'COMPLETED',d:'2023-07-25'},{n:'Regimen D',id:'NCT04615923',s:'COMPLETED',d:'2023-08-23'},{n:'Regimen E',id:'NCT05136885',s:'COMPLETED',d:'2025-05-14'},{n:'Regimen F',id:'NCT05740813',s:'COMPLETED',d:'2025-11-14'},{n:'Regimen G',id:'NCT05842941',s:'COMPLETED',d:'2026-01-28'}]},
  {ev:'hyp',w:'Hypothesis: post hoc subgroup',h:'Pridopidine after HEALEY',
   txt:`A sponsor-authored post hoc subgroup of 72 participants reported slower ALSFRS-R decline (difference 2.90, nominal p = 0.03), and a 48-week phase 3, PREVAiLS, has started [[Geva2026,NCT07322003]].`,
   reg:[{n:'PREVAiLS',id:'NCT07322003',s:'RECRUITING',d:'2026-10-06'}]},
  {ev:'neg',h:'MND-SMART (UK): memantine and trazodone',
   txt:`At interim analysis 2 (530 analysed), monthly ALSFRS-R decline was -0.650 on memantine, -0.625 on trazodone and -0.655 on placebo; both arms were dropped [[Pal2024]]. Amantadine and tacrolimus arms were added later, and no amantadine result was found [[NCT04302870]].`,
   reg:[{n:'MND-SMART',id:'NCT04302870',s:'RECRUITING',d:'2026-03-04'}]},
  {ev:'neg',w:'Tested and negative: screening stage, news report',h:'EXPERTS-ALS (UK): metformin and nifedipine',
   txt:`An NfL-based screening platform in which each participant takes one drug for about 18-24 weeks. The first two drugs did not lower NfL in about 30 participants, according to a University of Sheffield news item of 11 August 2026 (not peer reviewed). Its ISRCTN record (ISRCTN15525855) could not be read [[Sheffield2026]].`}
 ]},
 {t:'Other routes with trial results',items:[
  {ev:'early',w:'Early evidence, contested',h:'Masitinib',
   txt:`In the prespecified primary population (4.5 mg/kg/day), ALSFRS-R decline differed by 3.4 points (95% CI 0.65-6.13, P = 0.016); the broader cohort and the lower dose showed no significant effect, and serious adverse events were 31% vs 18% [[Mora2020,NCT02588677]]. EU and Canadian conditional applications reportedly received negative opinions, and the confirmatory trial is being replaced by a new protocol [[ALSNewsToday2025,NCT03127267,NCT07174492]].`,
   reg:[{n:'AB10015',id:'NCT02588677',s:'COMPLETED',d:'2023-09-29'},{n:'AB19001',id:'NCT03127267',s:'RECRUITING',d:'2025-09-12'},{n:'AB23005',id:'NCT07174492',s:'NOT_YET_RECRUITING',d:'2025-10-03'}]},
  {ev:'early',w:'Early evidence, contested',h:'Low-dose IL-2 (MIROCALS)',
   txt:`220 randomised. The unadjusted primary analysis showed a non-significant 19% lower risk of death (HR 0.81, 95% CI 0.54-1.22, P = 0.33); the covariate-adjusted analysis was significant (HR 0.32), and in the 70% with low CSF pNFH the HR was 0.52 [[Bensimon2025]]. A reanalysis found the TRICALS risk score cannot replace CSF pNFH for stratification [[AlKhleifat2026]].`,
   reg:[{n:'MIROCALS',id:'NCT03039673',s:'COMPLETED',d:'2025-12-04'}]},
  {ev:'early',w:'Early evidence: one trial, selected group',h:'Ultra-high-dose methylcobalamin (JETALS)',
   txt:`130 people with early-stage ALS and moderate progression in Japan. At week 16, ALSFRS-R decline was 1.97 points smaller than with placebo (-2.66 vs -4.63; 95% CI 0.44-3.50; P = .01) [[Oki2022,NCT03548311]].`,
   reg:[{n:'JETALS',id:'NCT03548311',s:'COMPLETED',d:'2025-03-26'}]},
  {ev:'neg',h:'TUDCA alone (TUDCA-ALS)',
   txt:`March 2024 topline results showed no separation from placebo on ALSFRS-R over 18 months and no difference in survival or NfL, with 337 enrolled of a planned 440. No peer-reviewed paper was found, and the registry still shows unknown status [[NeurologyLive2024,Albanese2022,NCT03800524]].`,
   reg:[{n:'TUDCA-ALS',id:'NCT03800524',s:'UNKNOWN',d:'2023-07-10'}]},
  {ev:'neg',h:'RIPK1 inhibitor SAR443820 (HIMALAYA)',
   txt:`305 randomised. Week-24 ALSFRS-R change was -6.73 vs -6.32 (difference -0.41, 95% CI -1.71 to 0.88), with more liver enzyme rises on the drug [[Cudkowicz2026,NCT05237284]].`,
   reg:[{n:'HIMALAYA',id:'NCT05237284',s:'TERMINATED',d:'2025-03-21'}]},
  {ev:'hyp',w:'Hypothesis to early evidence: result pending',h:'Ibudilast (COMBAT-ALS)',
   txt:`234 enrolled, 12 months double-blind then 6 months open-label, with a combined function-and-survival score (CAFS) as primary endpoint. No topline result had been reported as of 20 October 2026 [[Oskarsson2021,NCT04057898]].`,
   reg:[{n:'COMBAT-ALS',id:'NCT04057898',s:'ACTIVE_NOT_RECRUITING',d:'2026-03-06'}]},
  {ev:'neg',w:'Tested and negative on its biological endpoint',h:'Rapamycin (RAP-ALS)',
   txt:`63 randomised; the primary regulatory T-cell endpoint was not reached, and safety findings were reassuring [[Mandrioli2023]].`,
   reg:[{n:'RAP-ALS',id:'NCT03359538',s:'COMPLETED',d:'2024-09-19'}]},
  {ev:'early',w:'Early evidence: one person',h:'An individual antisense for CHCHD10-ALS',
   txt:`In one person, plasma NfL fell about 50% and ALSFRS-R rose from 33 to 36 over 12 months [[Cousin2026,NCT06392126]].`,
   reg:[{n:'CHCHD10 ASO',id:'NCT06392126',s:'ACTIVE_NOT_RECRUITING',d:'2026-07-13'}]}
 ]},
 {t:'Biomarkers and NfL as a surrogate',items:[
  {ev:'est',h:'NfL as a prognostic and early marker',
   txt:`In people carrying an ALS gene who later developed the disease, serum and CSF NfL were raised as far back as about 12 months before the first symptoms [[Benatar2018]]. A 2025 review of SOD1-ALS calls NfL a risk biomarker that predicts phenoconversion [[Benatar2025b]].`},
  {ev:'est',w:'Established for SOD1-ALS only',h:'NfL as a surrogate endpoint',
   txt:`Tofersen lowered plasma NfL in VALOR, and the FDA based accelerated approval on that reduction, the first ALS indication where an NfL change supported approval [[Miller2022,FDA2023Qalsody]].`},
  {ev:'hyp',w:'Unresolved',h:'Limits of NfL',
   txt:`A 2026 scoping review of 49 trials (8 in ALS) found that NfL reductions often paralleled clinical benefit, but several studies showed a lack of concordance, and it calls for validation specific to each disease and intervention [[Zheng2026]]. BIIB105 lowered its target but not NfL [[Biogen2024]], and in NurOwn the advisory committee reportedly linked greater NfL reduction with worse outcomes [[CGTLive2023]].`},
  {ev:'early',h:'Beyond NfL: a plasma protein panel',
   txt:`In 516 longitudinal samples, a 19-protein panel predicted conversion to clinical ALS over 0.5-5 years (cross-validated AUC 0.80-0.89) and outperformed NfL alone [[Ran2026]].`},
  {ev:'early',h:'Remote and digital measures',
   txt:`Video-coached at-home vital capacity agreed well with clinic measurement (Lin's rc 0.82) in 233 HEALEY participants [[Macklin2026]]. Wrist-worn accelerometry in 95 people declined more slowly than ALSFRS-R and predicted smaller samples for trials longer than 12 months [[Holdom2025]].`},
  {ev:'none',w:'Trial design',h:'Stratification and phase 2 reform',
   txt:`The ENCALS model uses 8 predictors, including bulbar onset, age, progression rate, FTD and C9orf72, and was built for counselling and future trial design [[Westeneng2018]]. In MIROCALS the unadjusted and prognosis-adjusted analyses of the same endpoint gave different conclusions [[Bensimon2025]]. Experts propose NfL reduction as a better phase 2 go or no-go marker than short function-based outcomes [[Benatar2025e]].`}
 ]},
 {t:'Prevention in gene carriers',items:[
  {ev:'none',w:'Natural history study',h:'Pre-fALS',
   txt:`A natural-history and biomarker study of unaffected carriers of any ALS gene variant, about 500 planned and running to 2037; its data informed ATLAS [[NCT00317616,Benatar2022a]].`,
   reg:[{n:'Pre-fALS',id:'NCT00317616',s:'RECRUITING',d:'2026-03-20'}]},
  {ev:'early',h:'Mild motor impairment before diagnosis',
   txt:`Among 20 phenoconverters in Pre-fALS, 11 had a prodrome of mild motor signs [[Benatar2022b]]. In the 2025 proposed research criteria, mild motor impairment was seen before diagnosis in 55% of phenoconverters, 43% of presymptomatic carriers and 14% of controls, and was linked with faster conversion (HR 5.1); the authors note it is nonspecific [[Benatar2025a]].`},
  {ev:'none',w:'Context',h:'Penetrance and planning',
   txt:`In UK Biobank exomes, 93.4% of the 122 people with SOD1 coding variants had no symptoms, and the estimated genetic prevalence of SOD1-ALS was four times the clinically reported figure [[Gagliardi2026]]. Workshop guidance for at-risk carriers acknowledges that the evidence base is limited [[Benatar2025c]], and a 2024 workshop set out designs for C9orf72 prevention trials [[Benatar2025d]].`}
 ]}
];
const CU_QA=[
 {q:'Why are some motor neurons spared?',a:`Eye-movement nuclei, Onuf's nucleus and dorsal column pathways stay relatively preserved. A 2026 review calls their resilience mechanisms (antioxidant defence, calcium handling, glutamate receptor make-up, glial support) under-studied and a possible therapeutic avenue [[Inoue2026]].`},
 {q:'Can sporadic ALS be treated through TDP-43 itself?',a:`Silencing TDP-43 is probably not appropriate given its critical functions [[Becker2017]], and translating gain-of-function strategies into the clinic "has been challenging" [[EstevezFraga2026]].`},
 {q:'Is lowering a toxic product enough once nerve cells are dying?',a:`A review points to irreversible downstream cascades [[Ito2024]], and after BIIB078 the pathology "remained abundant" despite the drug reaching the tissue [[McEachin2025]].`},
 {q:'Is NfL a valid surrogate beyond SOD1-ALS?',a:`Unresolved. It supported approval only for tofersen, and NfL changes have not always matched clinical change [[FDA2023Qalsody,Zheng2026]].`},
 {q:'How should trials handle how differently ALS progresses?',a:`Heterogeneity still complicates trial design, and the field is moving toward biomarker-based stratification and markers of TDP-43 loss of function [[EstevezFraga2026,Westeneng2018]].`},
 {q:'Why do phase 2 signals so often fail in phase 3?',a:`A 2025 viewpoint names 6-month studies with function-based outcomes, multiplicity and over-interpretation of exploratory analyses as sources of "false hope" [[Benatar2025e]].`},
 {q:'When should a carrier start treatment, and who?',a:`Most SOD1 variant carriers in a population sample had no symptoms [[Gagliardi2026]], so prevention trials need markers of imminent onset such as rising NfL or mild motor impairment [[Benatar2022a,Benatar2025a]]. ATLAS is designed to test this and has no results yet [[NCT04856982]].`}
];
inits.cure=()=>{
  const svg=$('#cuSvg'),rg=$('#cuT'),T=CU_TXT,S=CU_STEPS,FR=S.map(s=>s.from),NS=S.length;
  const HL=[ [0],[1],[1,2],[2,3],[4],[5,6],[0,1,2,3,4,5,6] ];
  const ACT=[0,1,1.5,3,4,5,null];
  let filter='all';
  const match=ev=>filter==='all'||ev===filter;
  const P=(x,y)=>`${f1(x)} ${f1(y)}`;
  function mk(x,y,ev,r,o){const st=`opacity:${f1(o)}`;
    if(ev==='est')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--good);${st}"/>`;
    if(ev==='early')return `<path d="M${P(x,y-r*1.25)} L${P(x+r*1.25,y)} L${P(x,y+r*1.25)} L${P(x-r*1.25,y)}Z" style="fill:var(--warn);${st}"/>`;
    if(ev==='hyp')return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.85)}" style="fill:none;stroke:var(--umn);stroke-width:2;${st}"/>`;
    if(ev==='neg')return `<path d="M${P(x-r*.9,y-r*.9)} L${P(x+r*.9,y+r*.9)} M${P(x+r*.9,y-r*.9)} L${P(x-r*.9,y+r*.9)}" style="stroke:var(--bad);stroke-width:2.2;stroke-linecap:round;${st}"/>`;
    return `<rect x="${f1(x-r*.8)}" y="${f1(y-r*.8)}" width="${f1(r*1.6)}" height="${f1(r*1.6)}" style="fill:var(--muted);${st}"/>`}
  /* small pictures inside each pathway box, drawn around (0,0) */
  function glyph(k){
    if(k===0){let a='',b='',r='';for(let x=-24;x<=24;x+=2){const y=Math.sin(x/6)*9;a+=(x>-24?'L':'M')+P(x,y);b+=(x>-24?'L':'M')+P(x,-y)}
      for(let x=-21;x<=21;x+=6){const y=Math.sin(x/6)*9;r+=`M${P(x,y)}L${P(x,-y)}`}
      return `<path d="${r}" style="stroke:var(--muted);stroke-width:1.2"/><path d="${a}" style="fill:none;stroke:var(--steel);stroke-width:2.2"/><path d="${b}" style="fill:none;stroke:var(--tdp);stroke-width:2.2"/>`}
    if(k===1){let a='',r='';for(let x=-24;x<=24;x+=2){const y=Math.sin(x/5)*6;a+=(x>-24?'L':'M')+P(x,y)}
      for(let x=-22;x<=22;x+=5){const y=Math.sin(x/5)*6;r+=`M${P(x,y)}l0 8`}
      return `<path d="${r}" style="stroke:var(--muted);stroke-width:1.4"/><path d="${a}" style="fill:none;stroke:var(--tdp);stroke-width:2.2"/>`}
    if(k===2)return tdp(-3,0,1.8,1,0);
    if(k===3)return tdp(-5,-2,1.5,1,1)+tdp(10,7,.9,1,1);
    if(k===4)return lmn(-8,0,6.5,1,{axonLen:0})+`<g style="fill:none;stroke:var(--cell-line);stroke-width:1.4"><circle cx="15" cy="7" r="4" style="fill:var(--cell)"/><path d="M15 3 v-6 M19 7 h6 M15 11 v6 M11 7 h-5 M18 4 l4 -4 M18 10 l4 4"/></g>`;
    if(k===5)return umn(-15,5,5,1,{axonLen:0})+`<path d="M-15 9 Q-2 16 9 4" style="fill:none;stroke:var(--umn);stroke-width:1.8"/>`+lmn(14,3,5,1,{axonLen:0});
    return fibre(-24,-6,48,10,1)+fibre(-24,7,48,10,1);
  }
  function draw(t){
    const N=vb(svg,'720 400','400 760');
    const p=phaseOf(S,t),hl=HL[p];
    /* layout tables */
    const rowY=N?[40,90,176,226,276,326,376]:null;
    const L=N?{W:400,bw:60,bh:36,node:i=>({x:46,y:rowY[i]+18}),splice:{x:46,y:153},
               mkPos:(k,j)=>k===1.5?{x:236+j*12,y:153}:{x:236+(j%12)*12,y:rowY[k]+(j<12?11:25)},
               lh:438,lr:458,lc:1,colW:368,rows:16,foot:742}
             :{W:720,bw:70,bh:56,node:i=>({x:62+i*99.3,y:92}),splice:{x:(62+99.3+62+2*99.3)/2,y:52},
               mkPos:(k,j)=>k===1.5?{x:(62+99.3+62+2*99.3)/2-18+j*12,y:52}:{x:62+k*99.3-18+(j%4)*12,y:160+Math.floor(j/4)*12},
               lh:226,lr:248,lc:2,colW:352,rows:8,foot:390};
    let s=`<defs>${marker('cuA','var(--muted)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="22" class="t-sm" style="fill:var(--treat)">${T.head}</text><text x="${L.W-16}" y="22" class="t-sm t-end">${T.stepOf(p+1,NS)}</text>`;
    /* arrows between boxes, with a moving dash for the flow of disease */
    const off=f1(-t*260);
    for(let i=0;i<6;i++){const a=L.node(i),b=L.node(i+1);
      const d=N?`M${a.x} ${a.y+L.bh/2+2} V${b.y-L.bh/2-5}`:`M${a.x+L.bw/2+3} ${a.y} H${b.x-L.bw/2-6}`;
      s+=`<path d="${d}" class="arrow" marker-end="url(#cuA)" style="stroke-dasharray:5 4;stroke-dashoffset:${off}"/>`}
    /* the splicing point between RNA and protein */
    const spOn=p===2;
    if(N)s+=`<text x="88" y="157" class="t-xs" style="fill:${spOn?'var(--treat)':'var(--muted)'};font-weight:${spOn?700:500}">${T.splice}</text><circle cx="${L.splice.x}" cy="${L.splice.y}" r="${spOn?6:4}" style="fill:${spOn?'var(--treat)':'var(--panel)'};stroke:var(--treat);stroke-width:1.6"/>`;
    else s+=`<text x="${f1(L.splice.x)}" y="40" class="t-xs t-mid" style="fill:${spOn?'var(--treat)':'var(--muted)'};font-weight:${spOn?700:500}">${T.splice}</text><path d="M${f1(L.splice.x)} 60 V80" style="stroke:var(--treat);stroke-width:1.4;stroke-dasharray:2 3;opacity:${spOn?1:.5}"/>`;
    /* boxes */
    for(let i=0;i<7;i++){const c=L.node(i),on=hl.includes(i),pu=on?.5+.5*Math.sin(t*70):0;
      if(on)s+=`<rect x="${f1(c.x-L.bw/2-4)}" y="${f1(c.y-L.bh/2-4)}" width="${L.bw+8}" height="${L.bh+8}" rx="14" style="fill:none;stroke:var(--treat);stroke-width:2;opacity:${f1(.3+.5*pu)}"/>`;
      s+=`<rect x="${f1(c.x-L.bw/2)}" y="${f1(c.y-L.bh/2)}" width="${L.bw}" height="${L.bh}" rx="10" style="fill:${on?'var(--treat-soft)':'var(--panel)'};stroke:${on?'var(--treat)':'var(--line)'};stroke-width:${on?2.2:1.3}"/>`;
      s+=`<g transform="translate(${f1(c.x)} ${f1(c.y)}) scale(${N?.72:1})">${glyph(i)}</g>`;
      if(N)s+=`<text x="88" y="${f1(c.y+4.5)}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${T.nodesN[i]}</text>`;
      else s+=`<text x="${f1(c.x)}" y="${f1(c.y+L.bh/2+16)}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${T.nodesW[i]}</text>`}
    /* route markers drop in as their step is reached */
    const cnt={};
    CU_MK.forEach(m=>{if(m.node===null)return;const j=cnt[m.node]=(cnt[m.node]??-1)+1;
      const a=ramp(t,FR[m.step],FR[m.step]+.03);if(a<=0)return;
      const q=L.mkPos(m.node,j),cur=m.step===p;
      s+=mk(q.x,q.y-8*(1-a),m.ev,cur?5:4,a*(match(m.ev)?1:.15))});
    /* lower area: the routes of this step */
    s+=`<line x1="16" x2="${L.W-16}" y1="${L.lh-16}" y2="${L.lh-16}" class="axis"/>`;
    s+=`<text x="16" y="${L.lh}" class="t-sm" style="fill:var(--treat)">${T.listHead[p]}</text>`;
    const items=CU_MK.filter(m=>m.step===p&&match(m.ev));
    const listCols=p===6&&!N?1:L.lc;
    if(!items.length)s+=`<text x="16" y="${L.lr}" class="t-xs" style="fill:var(--ink)">${T.none}</text>`;
    items.forEach((m,j)=>{const c=Math.floor(j/L.rows)%listCols,r=j%L.rows,x=16+c*L.colW,y=L.lr+r*16,a=ramp(t,FR[p],FR[p]+.03+j*.002);
      s+=`<g style="opacity:${f1(.2+.8*a)}">${mk(x+5,y-3.5,m.ev,4.5,1)}<text x="${x+18}" y="${y}" class="t-xs" style="fill:var(--ink)">${m.n}</text><text x="${x+L.colW-14}" y="${y}" class="t-xs t-end">${T.evShort[m.ev]}</text></g>`});
    if(p===6){
      const G=N?{x0:44,x1:384,y0:704,y1:534}:{x0:400,x1:700,y0:372,y1:244};
      const u=ramp(t,FR[6],.98),xm=lerp(.05,1,u);
      const nf=x=>.12+(x>.45?.8*Math.pow((x-.45)/.55,2):0),thr=.4,xc=.45+.55*Math.sqrt((thr-.12)/.8),on=.86;
      const X=x=>lerp(G.x0,G.x1,x),Y=v=>lerp(G.y0,G.y1,v);
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.y0}" y2="${G.y0}" class="axis"/><line x1="${G.x0}" x2="${G.x0}" y1="${G.y0}" y2="${G.y1-6}" class="axis"/>`;
      s+=`<text x="${G.x0+4}" y="${G.y1-10}" class="t-xs">${T.plot.y}</text><text x="${G.x1}" y="${G.y0+14}" class="t-xs t-end">${T.plot.x} →</text>`;
      s+=`<line x1="${f1(X(on))}" x2="${f1(X(on))}" y1="${G.y0}" y2="${G.y1}" class="grid"/><text x="${f1(X(on))}" y="${G.y1-10}" class="t-xs t-mid" style="fill:var(--ink)">${T.plot.onset}</text>`;
      s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(thr))}" y2="${f1(Y(thr))}" style="stroke:var(--tdp);stroke-width:1.4;stroke-dasharray:6 4"/><text x="${G.x0+6}" y="${f1(Y(thr)-5)}" class="t-xs" style="fill:var(--tdp)">${T.plot.thr}</text>`;
      s+=`<path d="${pathFn(x=>nf(x*xm),G.x0,X(xm),G.y0,G.y1,80)}" style="fill:none;stroke:var(--steel);stroke-width:2.6"/>`;
      if(xm>=xc){s+=`<circle cx="${f1(X(xc))}" cy="${f1(Y(thr))}" r="6" style="fill:var(--treat)"/><text x="${f1(X(xc)-10)}" y="${f1(Y(thr)-16)}" class="t-xs t-end" style="fill:var(--treat);font-weight:700">${T.plot.rand}</text>`}
    }
    if(N)T.footN.forEach((l,q)=>{s+=`<text x="16" y="${L.foot+q*13}" class="t-xs">${l}</text>`});
    else s+=`<text x="16" y="${L.foot}" class="t-xs">${T.foot}</text>`;
    svg.innerHTML=s;
    setSt(p);
    const fl=T.filters.find(f=>f[0]===filter)[1];
    const li=items.length?'<ul>'+items.map(m=>`<li>${m.n}: ${T.evShort[m.ev]}</li>`).join('')+'</ul>':`<p>${T.none}</p>`;
    $('#cuNote').innerHTML=noteHTML(S[p])+`<div class="kv"><div><dt>${T.listHead[p]}</dt><dd>${li}</dd></div></div>`;
    $('#cuCap').textContent=T.cap(p+1,NS,fl);
  }
  function cards(){
    let h='';
    CU_CARDS.forEach(c=>{const its=c.items.filter(it=>filter==='all'||it.ev===filter);if(!its.length)return;
      h+=`<article class="card"><h4>${c.t}</h4>${c.lede?`<p>${c.lede}</p>`:''}`;
      its.forEach(it=>{h+=`<div class="cu-it"><p class="cu-h"><span class="ev ${it.ev}">${it.w||T.evLong[it.ev]}</span><b>${it.h}</b></p><p>${it.txt}</p>`+
        (it.reg||[]).map(r=>`<p class="cu-reg">${T.reg(r.n,r.id,T.st[r.s],r.d)}</p>`).join('')+'</div>'});
      h+='</article>'});
    $('#cuCards').innerHTML=h||`<p>${T.noCards}</p>`;
  }
  $('#cuQA').innerHTML=CU_QA.map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join('');
  const stop=playWire(rg,$('#cuPlay'),draw,21000,UI.replay,'cure');
  const setSt=stepWire($('#cuSteps'),S,rg,draw,stop);
  toggleRow($('#cuFilter'),T.filters,'all',v=>{filter=v;draw(+rg.value);cards()});
  draw(+rg.value);cards();
};
