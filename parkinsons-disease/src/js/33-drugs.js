/* =============== 3.3 drugs: the other medicines =============== */
/* class colours, shared by the ladder chips and the synapse markers */
const DG_CC={L:'var(--amber)',A:'var(--sky)',M:'var(--violet)',C:'var(--sage)',I:'var(--good)',N:'var(--warn)',D:'var(--ink)',X:'var(--bad)'};
const DG_RUNGS=[
 {t:'Start · symptoms affect quality of life',c:[['levodopa','L']]},
 {t:'Start · symptoms do not affect it',c:[['dopamine agonist','A'],['levodopa','L'],['MAO-B inhibitor','M']]},
 {t:'Fluctuations · first add-ons',c:[['agonist','A'],['MAO-B inhibitor','M'],['COMT inhibitor','C']]},
 {t:'Fluctuations · other add-ons',c:[['istradefylline','I'],['apomorphine injection','A'],['tavapadon','A']]},
 {t:'Dyskinesia · amantadine',c:[['amantadine','N'],['amantadine ER','N'],['no anticholinergics','X']]},
 {t:'Advanced · pumps and surgery',c:[['apomorphine pump','A'],['levodopa pump','L'],['DBS','D']]}
];
/* which classes the synapse shows at each rung, and its one-line caption */
const DG_ACT=[['L'],['L','A','M'],['A','M','C'],['I','A'],['N'],['L','A','D']];
const DG_SYNCAP=['Levodopa becomes dopamine inside the terminal','Agonists act on receptors; MAO-B is blocked','COMT blocked outside the brain; MAO-B inside','Istradefylline blocks the adenosine A2A receptor','Amantadine blocks the NMDA glutamate channel','A pump keeps the level steady; DBS: see 3.4'];
const DG_STEPS=[
 {from:0,at:.06,k:'Rung 1 · Starting',t:'Levodopa when symptoms affect quality of life',
  txt:`As first-line treatment, NICE NG71 (1.3.5) offers levodopa when motor symptoms affect quality of life. Its comparison table sets out the trade-off: levodopa gives more improvement in motor symptoms and daily activities, and more motor complications. In the PD MED trial (1,620 people), starting with levodopa gave slightly better mobility on the PDQ-39 than starting with a levodopa-sparing drug: 1.8 points, against a minimally important difference of 6. How levodopa itself works is in <a href="#levodopa" data-go="levodopa">Levodopa and carbidopa</a>. [[NICE2017,PDMED2014]]`,
  pt:`When symptoms are getting in the way of daily life, NICE starts with levodopa, the medicine with the biggest effect on movement.`,
  hook:`NICE 1.3.5: motor symptoms affect quality of life → <b>offer levodopa</b>. NICE 1.3.6: they do not → <b>consider a choice</b> of agonist, levodopa or MAO-B inhibitor. [[NICE2017]]`},
 {from:.16,at:.22,k:'Rung 2 · Starting',t:'A choice of three when they do not',
  txt:`When motor symptoms do not affect quality of life, NICE (1.3.6) suggests considering a choice of dopamine agonist, levodopa or MAO-B inhibitor. Its table: agonists give less motor improvement, fewer motor complications and more excessive sleepiness, hallucinations and impulse-control disorders; MAO-B inhibitors give less motor improvement, fewer motor complications and fewer of those adverse events. The 2018 MDS evidence review rates non-ergot agonists, oral levodopa, selegiline and rasagiline "clinically useful" as early monotherapy, and does not rank them. NICE advises against ergot-derived agonists as first-line treatment (1.3.7). [[NICE2017,Fox2018]]`,
  pt:`If symptoms are mild, there is a choice. Agonists and MAO-B inhibitors help movement less than levodopa and cause fewer motor complications; agonists bring more sleepiness, hallucinations and impulse problems.`,
  hook:`MDS 2018 "clinically useful" early monotherapy: <b>non-ergot agonists, levodopa, selegiline, rasagiline</b>. NICE frames the first choice by quality of life, not by age. [[Fox2018,NICE2017]]`},
 {from:.33,at:.39,k:'Rung 3 · Fluctuations',t:'Add-ons that stretch each dose',
  txt:`For dyskinesia or motor fluctuations despite optimal levodopa, NICE (1.3.10) offers a choice of dopamine agonist, MAO-B inhibitor or COMT inhibitor. Its evidence table: agonists give more off-time reduction with more risk of hallucinations, MAO-B inhibitors have fewer adverse events, COMT inhibitors more. In LARGO, rasagiline 1 mg cut daily off-time by 1.18 hours against 0.4 on placebo, similar to entacapone's 1.2 hours. In BIPARK-I, opicapone 50 mg cut off-time by 116.8 minutes against 56.0 on placebo and was non-inferior to entacapone. Entacapone "has no antiparkinsonian effect of its own": it lengthens levodopa's half-life from 1.3 to 2.4 hours. Why doses wear off is in <a href="#wearing" data-go="wearing">Levodopa over time</a>. [[NICE2017,Rascol2005,Ferreira2016,EnzymeInhibitorLabels2026]]`,
  pt:`When each dose wears off too early, a second medicine is added: one that copies dopamine, or one that slows the breakdown of dopamine or levodopa so each dose lasts longer.`,
  hook:`COMT inhibitors work only alongside levodopa. Entacapone: one 200 mg tablet <b>with each levodopa dose</b>. Opicapone: <b>once daily at bedtime</b>. [[EnzymeInhibitorLabels2026]]`},
 {from:.5,at:.56,k:'Rung 4 · Fluctuations',t:'More add-ons, and the newest',
  txt:`The 2018 MDS review lists many treatments as clinically useful for fluctuations, among them most non-ergot agonists, levodopa ER, entacapone, opicapone, rasagiline, zonisamide and safinamide, without ranking them. In SETTLE, safinamide added 0.96 hours of good on time over placebo. Istradefylline works outside the dopamine system as an adenosine A2A antagonist (US approval 27 Aug 2019); across 8 pooled trials it cut off-time by 0.38 to 0.45 hours more than placebo. Tavapadon (Juvmo), a selective D1/D5 partial agonist, was approved on 25 Sep 2026; in TEMPO-3, off-time fell 0.94 hours more than on placebo. An apomorphine injection under the skin is started under medical supervision. [[Fox2018,Schapira2017,Hauser2021,DrugsFDA2026,AgonistLabels2026,Fernandez2026]]`,
  pt:`There are several more add-ons. For these, the extra benefit over a dummy pill was about an hour of off-time a day or less.`,
  hook:`Istradefylline acts at the <b>adenosine A2A receptor</b>, not a dopamine receptor. Tavapadon is a selective <b>D1/D5</b> partial agonist. [[Hauser2021,AgonistLabels2026]]`},
 {from:.66,at:.72,k:'Rung 5 · Dyskinesia',t:'Amantadine for extra movements',
  txt:`If dyskinesia is not managed by modifying existing therapy, NICE (1.3.13) suggests considering amantadine. The MDS review lists amantadine, clozapine and bilateral STN or GPi DBS as clinically useful for dyskinesia. Amantadine is a weak NMDA antagonist. In EASE LID, extended-release amantadine improved the dyskinesia rating (UDysRS) by 15.9 points against 8.0 and cut off-time by 0.9 hours, but visual hallucinations (23.8% vs 1.7%), peripheral oedema (23.8% vs 0%) and dizziness (22.2% vs 0%) were more common. NICE: "Do not offer anticholinergics to people with Parkinson's disease who have developed dyskinesia and/or motor fluctuations" (1.3.14). [[NICE2017,Fox2018,AmantadineLabels2026,Pahwa2017]]`,
  pt:`Amantadine can calm the extra, writhing movements, at the cost of side effects such as hallucinations and ankle swelling in some people.`,
  hook:`Dyskinesia → <b>amantadine</b> (NICE 1.3.13). Fluctuations or dyskinesia → <b>no anticholinergics</b> (NICE 1.3.14). [[NICE2017]]`},
 {from:.82,at:.9,k:'Rung 6 · Advanced',t:'Pumps and surgery',
  txt:`When tablets no longer give steady control, device-aided options deliver medicine continuously or act on the circuit itself. A continuous apomorphine infusion (Onapgo, approved 3 Feb 2025) cut off-time by 2.55 hours against 0.90 on placebo. Subcutaneous foslevodopa/foscarbidopa (Vyalev, approved 16 Oct 2024) bypasses the gut, so food does not change absorption; against oral levodopa it cut off-time by 2.75 against 0.96 hours. The MDS review rates levodopa intestinal infusion and bilateral STN or GPi DBS clinically useful for fluctuations. More in <a href="#wearing" data-go="wearing">Levodopa over time</a> and <a href="#dbs" data-go="dbs">Deep-brain stimulation</a>. [[AgonistLabels2026,DrugsFDA2026,LevodopaLabels2026,Fox2018]]`,
  pt:`Later on, a small pump can give medicine all day under the skin or into the gut, or electrodes can be placed in the brain.`,
  hook:`Continuous delivery smooths the peaks and troughs of tablets. Vyalev: <b>24-hour subcutaneous</b> infusion. Onapgo: apomorphine for <b>up to 16 hours a day</b>. [[LevodopaLabels2026,AgonistLabels2026]]`}
];
/* effect sizes: [value, colour, label, dashed, lower end of a range] */
const DG_BEN=[
 {cap:'Hours of off-time saved per day, as each trial reported it. Grey bars are placebo unless the row names another comparator. Bars start at zero.',ax:[-.5,3],tk:[-.5,0,1,2,3],u:' h',
  rows:[
   {n:'Rasagiline 1 mg',tr:'LARGO, adjunct',v:[[1.18,'A'],[0.4,'P']]},
   {n:'Entacapone 200 mg',tr:'LARGO, adjunct',v:[[1.2,'A'],[0.4,'P']]},
   {n:'Opicapone 50 mg',tr:'BIPARK-I · 116.8 vs 56.0 min',v:[[1.95,'A'],[0.93,'P']]},
   {n:'Rotigotine 8 mg/24 h',tr:'PD-4, advanced Parkinson\'s',v:[[2.7,'A'],[0.9,'P']]},
   {n:'Amantadine ER',tr:'EASE LID · placebo off-time rose',v:[[0.6,'A'],[-0.3,'P']]},
   {n:'Istradefylline 40 mg',tr:'8 pooled trials · difference only',v:[[0.45,'D']]},
   {n:'Tavapadon',tr:'TEMPO-3, adjunct · difference only',v:[[0.94,'D']]},
   {n:'Apomorphine infusion',tr:'Onapgo 12-week trial',v:[[2.55,'A'],[0.9,'P']]},
   {n:'Foslevodopa infusion',tr:'Vyalev · comparator: oral levodopa',v:[[2.75,'A'],[0.96,'P','oral levodopa']]}
  ]},
 {cap:'Points of improvement on each trial\'s own scale; a bar left of zero means the score got worse. Scales differ, so rows are not comparable with each other.',ax:[-2,16],tk:[0,4,8,12,16],u:'',
  rows:[
   {n:'Tavapadon 5 mg',tr:'TEMPO-1, early · MDS-UPDRS II+III',v:[[9.7,'A'],[-1.8,'P']]},
   {n:'Tavapadon 15 mg',tr:'TEMPO-1, early · MDS-UPDRS II+III',v:[[10.2,'A'],[-1.8,'P']]},
   {n:'Pramipexole',tr:'CALM-PD · UPDRS · comparator: levodopa',v:[[4.5,'A'],[9.2,'P','levodopa']]},
   {n:'Apomorphine film',tr:'30 min after a dose · MDS-UPDRS III',v:[[11.1,'A'],[3.5,'P']]},
   {n:'Inhaled levodopa',tr:'SPAN-PD, 30 min · UPDRS III',v:[[9.83,'A'],[5.91,'P']]},
   {n:'Amantadine ER',tr:'EASE LID · dyskinesia scale (UDysRS)',v:[[15.9,'A'],[8.0,'P']]}
  ]},
 {cap:'Percent of people with each effect, medicine against comparator, as published. DOMINION is cross-sectional; DIGPD is a 5-year cohort; the withdrawal row counts agonist tapers.',ax:[0,60],tk:[0,20,40,60],u:'%',
  rows:[
   {n:'Impulse-control disorder',tr:'DOMINION · on an agonist vs not',v:[[17.1,'A'],[6.9,'P','no agonist']]},
   {n:'Impulse-control disorder',tr:'DIGPD, 5 years · agonist ever vs never',v:[[51.5,'A'],[12.4,'P','never']]},
   {n:'Somnolence',tr:'CALM-PD · pramipexole vs levodopa',v:[[32.4,'A'],[17.3,'P','levodopa']]},
   {n:'Visual hallucinations',tr:'EASE LID · amantadine ER',v:[[23.8,'A'],[1.7,'P']]},
   {n:'Peripheral oedema',tr:'EASE LID · amantadine ER',v:[[23.8,'A'],[0,'P']]},
   {n:'Dyskinesia',tr:'SETTLE · safinamide',v:[[14.6,'A'],[5.5,'P']]},
   {n:'Dyskinesia',tr:'istradefylline, 8 pooled trials',v:[[17.7,'A',null,16.1],[9.6,'P']]},
   {n:'Valve regurgitation',tr:'cabergoline · comparator: controls',v:[[28.6,'A'],[5.6,'P','controls']]},
   {n:'Agonist withdrawal syndrome',tr:'5 of 26 tapers',v:[[19,'W']]}
  ]}
];
const DG_BEN_N=[
 {k:'Off-time',t:'Hours of off-time saved per day',
  txt:`Off-time is the part of the waking day when medicines are not working well, recorded in home diaries. Placebo also cut off-time, by up to 0.93 hours, so the difference from placebo is what counts. Rasagiline about 0.8 hours (arithmetic from 1.18 and 0.4), opicapone 60.8 minutes, rotigotine 8 mg 1.8 hours, amantadine ER 0.9 hours, istradefylline 0.38 to 0.45 hours in pooled trials (0.75 to 0.82 in the 4 trials behind US approval), tavapadon 0.94 hours, apomorphine infusion 1.65 hours. The foslevodopa trial compared the pump with oral levodopa, not with placebo (difference 1.79 hours). [[Rascol2005,Ferreira2016,AgonistLabels2026,Pahwa2017,Hauser2021,Fernandez2026,LevodopaLabels2026]]`,
  pt:`Most add-ons gave back between about half an hour and two hours a day of better movement than a dummy pill.`,
  hook:`Read the <b>difference from placebo</b>, not the medicine bar alone.`},
 {k:'Scores',t:'Motor and dyskinesia scales',
  txt:`TEMPO-1 (529 people with early Parkinson's) measured MDS-UPDRS parts II and III together: 9.7 and 10.2 points better on 5 and 15 mg, against 1.8 points worse on placebo (differences 11.5 and 12.1); nausea affected 25.4%. CALM-PD compared pramipexole with levodopa directly: UPDRS improved 4.5 against 9.2 points, in favour of levodopa. The on-demand rescues were scored 30 minutes after a dose: sublingual apomorphine film 11.1 against 3.5 points (it is now listed as discontinued), inhaled levodopa 9.83 against 5.91. EASE LID used a dyskinesia scale, where a fall means fewer extra movements. [[Pahwa2026,PSG2000CALM,Olanow2020,DrugsFDA2026,LeWitt2019,Pahwa2017]]`,
  pt:`A bigger bar is a bigger improvement on that trial's own scale. The scales are different, so a long bar in one row does not beat a shorter bar in another.`,
  hook:`CALM-PD: pramipexole helped movement <b>less than levodopa</b> (4.5 vs 9.2 UPDRS points) but caused fewer motor complications. [[PSG2000CALM]]`},
 {k:'Harms',t:'Side effects with their rates',
  txt:`DOMINION (3,090 people) found an impulse-control disorder in 17.1% of people on a dopamine agonist against 6.9% of those not on one (odds ratio 2.72), with similar rates on pramipexole and ropinirole. In the DIGPD cohort, 5-year cumulative incidence was 46.1% overall, 51.5% in agonist ever-users and 12.4% in never-users, and the disorders gradually resolved after agonists were stopped. Moderate-to-severe valve regurgitation was found in 28.6% on cabergoline and 23.4% on pergolide, 0% on non-ergot agonists and 5.6% in controls. In one series, 5 of 26 agonist tapers (19%) produced a withdrawal syndrome; all 5 people had had an agonist-related impulse-control disorder. [[Weintraub2010,Corvol2018,PSG2000CALM,Pahwa2017,Schapira2017,Hauser2021,Zanettini2007,Rabinak2010]]`,
  pt:`Some side effects are common enough that guidelines ask about them at every visit, above all impulse-control problems on agonists.`,
  hook:`DOMINION <b>17.1% vs 6.9%</b>. DIGPD <b>46.1%</b> at 5 years. Agonist withdrawal syndrome <b>19%</b> of tapers. [[Weintraub2010,Corvol2018,Rabinak2010]]`}
];
/* drug cards: fx = side-effect flags the sources support for that card */
const DG_CARDS=[
 {n:'Levodopa (for comparison)',cl:'Dopamine precursor',fx:'hall sleep',fda:'Larodopa 4 Jun 1970 · Sinemet 2 May 1975',
  m:`Crosses into the brain and is converted to dopamine; carbidopa blocks that conversion outside the brain. Full story in <a href="#levodopa" data-go="levodopa">Levodopa and carbidopa</a>. [[LevodopaLabels2026]]`,
  e:`The largest motor benefit of any class, with more motor complications (NICE Table 1). [[NICE2017]]`,
  a:`Sudden sleep onset without warning, including while driving, has been reported as late as a year after starting. A higher baseline levodopa-equivalent dose was an independent risk factor for new psychosis in a 12-year cohort. [[LevodopaLabels2026,Forsaa2010]]`},
 {n:'Pramipexole and ropinirole',cl:'Dopamine agonists, oral',fx:'icd hall sleep',fda:'Mirapex 1 Jul 1997 · Requip 19 Sep 1997',
  m:`Non-ergot dopamine agonists: they stimulate dopamine receptors directly, without needing conversion. [[AgonistLabels2026]]`,
  e:`CALM-PD: motor complications 28% against 51% on levodopa at 23.5 months, with less UPDRS improvement (4.5 vs 9.2 points). In the 056 study, 34% of ropinirole completers needed no levodopa at 5 years. [[PSG2000CALM,Rascol2000]]`,
  a:`Impulse-control disorders 17.7% on pramipexole and 15.5% on ropinirole (DOMINION). Somnolence 32.4% against 17.3% on levodopa (CALM-PD). The first case series of falling asleep at the wheel described 8 people on pramipexole and 1 on ropinirole, 5 with no warning. Withdrawal syndrome in 19% of tapers. NICE: more hallucinations than the other classes. [[Weintraub2010,PSG2000CALM,Frucht1999,Rabinak2010,NICE2017]]`},
 {n:'Rotigotine',cl:'Dopamine agonist, skin patch',fx:'icd hall sleep',fda:'Neupro 9 May 2007',
  m:`A non-ergot agonist delivered through the skin over 24 hours; the site is rotated daily and not reused within 14 days. [[AgonistLabels2026]]`,
  e:`Trial PD-4 (351 people with advanced Parkinson's): off-time fell 2.7 hours on 8 mg/24 h against 0.9 on placebo. [[AgonistLabels2026]]`,
  a:`As an agonist it falls under NICE's class statement of more sleepiness, hallucinations and impulse-control disorders. Large doses can cause confusion, hallucinations or delirium. The label carries a withdrawal-symptoms warning. [[NICE2017,PUKCalc2025,AgonistLabels2026]]`},
 {n:'Apomorphine',cl:'Dopamine agonist: injection, film or pump',fx:'oh',fda:'Injection 20 Apr 2004 · film 21 May 2020 (discontinued) · pump 3 Feb 2025',
  m:`A dopamine agonist given under the skin, as a single injection or a continuous infusion, or under the tongue as a film. [[AgonistLabels2026,DrugsFDA2026]]`,
  e:`Sublingual film: MDS-UPDRS III improved 11.1 against 3.5 points at 30 minutes. Continuous infusion: off-time down 2.55 against 0.90 hours. [[Olanow2020,AgonistLabels2026]]`,
  a:`5-HT3 antagonists such as ondansetron are contraindicated: profound hypotension and loss of consciousness. With the film, mouth and throat effects affected 31% against 7% and led 17% to stop; nausea 28%; one person with cardiac risk factors had a fatal cardiac arrest. [[AgonistLabels2026,Olanow2020]]`},
 {n:'Tavapadon (Juvmo)',cl:'D1/D5 partial agonist',fx:'icd',fda:'25 Sep 2026 (NDA 220415)',
  m:`A selective partial agonist at D1 and D5 dopamine receptors, taken once a day; half-life about 25.5 hours. [[AgonistLabels2026]]`,
  e:`TEMPO-1 (early Parkinson's, 529 people): MDS-UPDRS II+III 11.5 and 12.1 points better than placebo. TEMPO-3 (adjunct, 507 people): good on time 1.10 hours more, off-time 0.94 hours less. [[Pahwa2026,Fernandez2026]]`,
  a:`Impulse-control disorders 1% against 0% in the early studies and 2% against 1% in the adjunct study. Nausea 25.4% (TEMPO-1) and 14.3% (TEMPO-3); dyskinesia 10.0% in TEMPO-3. [[AgonistLabels2026,Pahwa2026,Fernandez2026]]`},
 {n:'Pergolide and cabergoline',cl:'Ergot-derived agonists',fx:'',fda:'NICE: not first line',
  m:`Older dopamine agonists derived from ergot. [[Zanettini2007]]`,
  e:`The MDS review still lists pergolide as clinically useful for fluctuations. NICE keeps ergots for people not controlled by a non-ergot agonist, because of the monitoring they require. [[Fox2018,NICE2017]]`,
  a:`Moderate-to-severe heart-valve regurgitation in 23.4% on pergolide and 28.6% on cabergoline, against 0% on non-ergot agonists and 5.6% in controls. [[Zanettini2007]]`},
 {n:'Selegiline',cl:'MAO-B inhibitor',fx:'oh',fda:'5 Jun 1989 (NDA 019334)',
  m:`Blocks monoamine oxidase B, one of the enzymes that break down dopamine. 10 mg a day as 5 mg at breakfast and lunch; higher doses add no benefit. [[EnzymeInhibitorLabels2026]]`,
  e:`DATATOP: delayed the need for levodopa (HR 0.50, a median of about 9 months), but a symptomatic effect could not be excluded. [[PSG1993DATATOP]]`,
  a:`Taken with carbidopa-levodopa it may cause severe orthostatic hypotension. [[LevodopaLabels2026]]`},
 {n:'Rasagiline',cl:'MAO-B inhibitor',fx:'',fda:'16 May 2006 · Israel 3 Jan 2005',
  m:`Selective for MAO-B (rat brain IC50 4.43 nM against 412 nM for MAO-A), 3 to 15 times more potent than selegiline in vivo, with no amphetamine-like metabolites. [[Youdim2001]]`,
  e:`LARGO: off-time down 1.18 against 0.4 hours. ADAGIO: 1 mg met its delayed-start endpoints, 2 mg did not, and no progression claim was accepted. [[Rascol2005,Olanow2009,Mechcatie2011]]`,
  a:`Significant blood-pressure rise in 4% against 3% in one adjunct study. Serious interactions with pethidine, tramadol and other drugs (see the table below). [[EnzymeInhibitorLabels2026]]`,
  x:`Origin, as each institution tells it: Teva calls rasagiline "a joint development of Teva and the Technion"; the Technion credits its professors Moussa Youdim and John Finberg with developing it in the 1970s. Both are institutional accounts. [[Teva2005,Technion2016]]`},
 {n:'Safinamide',cl:'MAO-B inhibitor',fx:'',fda:'21 Mar 2017',
  m:`An MAO-B inhibitor used as a levodopa add-on: 50 mg once daily, increasable to 100 mg after two weeks; higher doses added nothing. [[EnzymeInhibitorLabels2026]]`,
  e:`SETTLE (549 people): good on time up 1.42 against 0.57 hours (difference 0.96). [[Schapira2017]]`,
  a:`Dyskinesia was the most frequent adverse event (14.6% vs 5.5%). A long list of contraindicated drugs, including linezolid and several opioids (see the table below). [[Schapira2017,EnzymeInhibitorLabels2026]]`},
 {n:'Entacapone',cl:'COMT inhibitor',fx:'',fda:'Comtan 19 Oct 1999 · Stalevo 11 Jun 2003',
  m:`Blocks COMT, which takes over levodopa breakdown when carbidopa blocks decarboxylation. Levodopa AUC rises about 35% and its half-life lengthens from 1.3 to 2.4 hours. [[Jenner2026,EnzymeInhibitorLabels2026]]`,
  e:`LARGO: off-time down 1.2 hours. BIPARK-I: −96.3 minutes, against −56.0 on placebo. [[Rascol2005,Ferreira2016]]`,
  a:`When levodopa was started with entacapone in STRIDE-PD, dyskinesia came sooner (HR 1.29) and was more frequent at week 134 (42% vs 32%), on higher levodopa-equivalent doses. [[Stocchi2010]]`},
 {n:'Opicapone',cl:'COMT inhibitor',fx:'',fda:'24 Apr 2020',
  m:`Once-daily COMT inhibitor: up to 84% inhibition of red-cell COMT, more than 35% still present 5 days after the last dose. [[EnzymeInhibitorLabels2026]]`,
  e:`BIPARK-I (600 people): off-time −116.8 minutes against −56.0 on placebo; non-inferior to entacapone. [[Ferreira2016]]`,
  a:`Dyskinesia was the most common adverse event. [[Ferreira2016]]`},
 {n:'Tolcapone',cl:'COMT inhibitor',fx:'',fda:'29 Jan 1998 (Tasmar brand discontinued)',
  m:`A COMT inhibitor taken as 100 mg three times daily (200 mg three times daily only if justified). [[EnzymeInhibitorLabels2026]]`,
  e:`The label says people without substantial benefit within 3 weeks should be withdrawn. [[EnzymeInhibitorLabels2026]]`,
  a:`Boxed warning: 3 fatal fulminant liver failures in more than 40,000 patient-years by May 2005, possibly 10 to 100 times background. Liver tests every 2 to 4 weeks for the first 6 months. [[EnzymeInhibitorLabels2026]]`},
 {n:'Amantadine',cl:'NMDA antagonist',fx:'hall',fda:'Gocovri (ER) 24 Aug 2017',
  m:`A weak, non-competitive NMDA antagonist (Ki 10 µM) with anticholinergic-like side effects. Gocovri is labelled for dyskinesia and for off episodes. [[AmantadineLabels2026]]`,
  e:`EASE LID: dyskinesia rating down 15.9 against 8.0 points; off-time down 0.9 hours more than placebo. [[Pahwa2017]]`,
  a:`Visual hallucinations 23.8% vs 1.7%, peripheral oedema 23.8% vs 0%, dizziness 22.2% vs 0%; 20.6% vs 6.9% stopped. Abrupt discontinuation has caused parkinsonian crisis. Doses fall with kidney function. [[Pahwa2017,AmantadineLabels2026]]`},
 {n:'Istradefylline',cl:'Adenosine A2A antagonist',fx:'',fda:'Nourianz 27 Aug 2019',
  m:`Blocks the adenosine A2A receptor on striatal neurons, outside the dopamine system. [[Hauser2021]]`,
  e:`8 pooled trials (2,719 people): off-time 0.38 h (20 mg) and 0.45 h (40 mg) less than placebo; 0.75 and 0.82 h in the 4 trials behind US approval. [[Hauser2021]]`,
  a:`Dyskinesia in 16.1 to 17.7% against 9.6% on placebo. [[Hauser2021]]`},
 {n:'Anticholinergics',cl:'Anticholinergic',fx:'oh hall',fda:'NICE 1.3.14: not once fluctuations start',
  m:`Medicines that block acetylcholine; NICE treats them as a class. [[NICE2017]]`,
  e:`NICE: "Do not offer anticholinergics to people with Parkinson's disease who have developed dyskinesia and/or motor fluctuations." [[NICE2017]]`,
  a:`NICE lists them among medicines to review when orthostatic hypotension appears. The Parkinson's Foundation warns that bladder-control drugs, among others, may cause confusion, hallucinations and falls. [[NICE2017,PF2023]]`}
];
const DG_FX={
 all:{l:'all medicines',n:''},
 icd:{l:'impulse-control disorders',n:`Impulse-control disorders include compulsive gambling, buying, binge eating and sexual behaviour; DOMINION found 13.6% overall. NICE asks for oral and written information on the risk when any dopaminergic medicine starts, more so with agonists, and for the subject to be raised at reviews. The QUIP questionnaire detected any disorder with 96% sensitivity. [[Weintraub2010,NICE2017,Weintraub2009]]`},
 hall:{l:'hallucinations',n:`In NICE's evidence tables agonists carry more risk of hallucinations than the other add-ons; amantadine's trial rate was 23.8%. How psychosis is approached is in <a href="#nonmotor" data-go="nonmotor">Beyond movement</a>. [[NICE2017,Pahwa2017]]`},
 sleep:{l:'sleepiness and sudden sleep',n:`Sudden sleep without warning, including while driving, is on the carbidopa-levodopa and pramipexole labels, as late as a year after starting. NICE says people with daytime sleepiness or sudden onset of sleep should not drive. [[LevodopaLabels2026,AgonistLabels2026,NICE2017]]`},
 oh:{l:'orthostatic hypotension',n:`NICE lists dopaminergic medicines as a group, with antihypertensives, anticholinergics and antidepressants, among those to review when orthostatic hypotension appears. The cards shown are the ones with a specific label or guideline statement. [[NICE2017]]`}
};
const DG_TRN=[
 {k:'PD MED · 2014',t:'Levodopa first, by a small margin',
  txt:`PD MED randomised 1,620 people with early Parkinson's to start with levodopa or with a levodopa-sparing drug (an agonist or an MAO-B inhibitor), open-label, in routine practice. Mobility on the PDQ-39 was 1.8 points better with levodopa first (p=0.005), against a minimally important difference of 6 points, and 1.4 points better with MAO-B inhibitors than with agonists. Stopping a drug because of side effects: 28% on agonists, 23% on MAO-B inhibitors, 2% on levodopa. [[PDMED2014]]`,
  pt:`Starting with levodopa gave a small, lasting edge in everyday mobility, and far fewer people stopped it because of side effects.`,
  hook:`PD MED: stopped for side effects <b>28% agonist, 23% MAO-B, 2% levodopa</b>. [[PDMED2014]]`},
 {k:'CALM-PD · 2000 and 2009',t:'Fewer complications, less benefit',
  txt:`CALM-PD randomised 301 people to pramipexole 0.5 mg or carbidopa-levodopa 25/100 three times daily. At 23.5 months motor complications had appeared in 28% on pramipexole against 51% on levodopa (HR 0.45), but levodopa improved the UPDRS more (9.2 vs 4.5 points) and somnolence was more common on pramipexole (32.4% vs 17.3%). Imaging decline (beta-CIT) did not differ significantly (20.0% vs 24.8%, p=0.15). At about 6 years: any motor complication 50.0% against 68.4%, Epworth sleepiness 11.3 against 8.6, daily-living scores similar (79.9 vs 82.5), and disabling dyskinesia uncommon in both groups. [[PSG2000CALM,PSG2009CALM]]`,
  pt:`Starting with the agonist meant fewer movement swings later, but less help with movement and more sleepiness. Six years on, daily living was about the same.`,
  hook:`Agonist first: <b>fewer motor complications, less motor benefit, more sleepiness</b>. [[PSG2000CALM]]`},
 {k:'056 study · 2000',t:'Ropinirole for 5 years',
  txt:`The 056 study followed 268 people for 5 years on ropinirole or levodopa, with open-label levodopa allowed when needed. Cumulative dyskinesia at 5 years was 20% with initial ropinirole against 45% with initial levodopa, and 34% of ropinirole completers never needed levodopa. Final doses: ropinirole 16.5 mg (plus 427 mg of levodopa in those who needed it) against 753 mg of levodopa. [[Rascol2000]]`,
  pt:`One in three people who stayed on ropinirole for five years never needed levodopa, and dyskinesia was less than half as common.`,
  hook:`056: dyskinesia at 5 years <b>20% ropinirole vs 45% levodopa</b>. [[Rascol2000]]`},
 {k:'DATATOP · 1993',t:'A delay is not proof of slowing',
  txt:`DATATOP (800 people, a 2×2 factorial trial) tested deprenyl (selegiline) 10 mg a day and tocopherol (vitamin E) 2,000 IU a day in early Parkinson's. Deprenyl delayed the point at which disability needed levodopa (HR 0.50), by a median of about 9 months, with the benefit concentrated in the first 12 months. Tocopherol had no effect. Ratings improved in the first 3 months on deprenyl and worsened after it was withdrawn, so a symptomatic effect could not be excluded: the delay may reflect symptom relief rather than slower disease. [[PSG1993DATATOP]]`,
  pt:`Selegiline put off the need for levodopa by months, but that may be because it eased symptoms, not because it slowed the disease.`,
  hook:`DATATOP: <b>HR 0.50</b> for needing levodopa; vitamin E no effect; <b>a symptomatic effect could not be excluded</b>. [[PSG1993DATATOP]]`},
 {k:'ADAGIO · 2009',t:'Rasagiline and the delayed-start design',
  txt:`ADAGIO (1,176 people) used a delayed-start design: one group took rasagiline for 72 weeks, the other took placebo for 36 weeks and then rasagiline. If the early starters stay ahead once both groups are on the drug, that suggests more than symptom relief. At 1 mg all three hierarchical endpoints were met: the UPDRS worsened 0.09 against 0.14 points a week over weeks 12 to 36, and by 2.82 against 4.52 points at week 72. At 2 mg the week-72 difference was not significant (3.47 vs 3.11, p=0.60), and the authors advised caution because the doses diverged. An FDA advisory committee voted 17 to 0 that the sponsor had not provided substantial evidence that rasagiline delays clinical progression, and no such claim was granted. Both facts come from trade-press reports, not from an FDA document read for this guide. [[Olanow2009,Mechcatie2011]]`,
  pt:`One dose looked as if it might slow the disease and the higher dose did not, so regulators did not accept a slowing claim.`,
  hook:`ADAGIO: <b>1 mg met</b> all endpoints, <b>2 mg did not</b> (p=0.60). Advisory committee <b>17–0</b> against a progression claim (trade press). [[Olanow2009,Mechcatie2011]]`}
];
const DG_TRCAP=['PD MED, open-label pragmatic trial. Bars start at zero; the dashed bar is the minimally important difference for comparison.','CALM-PD. Blue: initial pramipexole; gold: initial levodopa. Bars start at zero.','056 study. Each square is one of 100 ropinirole completers; filled squares never needed levodopa.','Schematic: the curves are drawn from the published hazard ratio (0.50) and median delay (about 9 months). Real curves differ, with most of the benefit in the first 12 months.','Schematic paths: only the week-72 values are published; the lines between are drawn to show the design.'];
inits.drugs=()=>{
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* ---------- 1. the ladder and the synapse ---------- */
  const svg=$('#dgSvg'),rg=$('#dgT');
  const chipW=s=>s.length*5.7+14;
  /* the synapse, drawn in a 280 x 350 box whose top-left is (ox,oy) */
  function drawSyn(ox,oy,t,p){
    const X=x=>f1(ox+x),Y=y=>f1(oy+y),act=DG_ACT[p],on=k=>act.includes(k);
    const u=(t*22)%1,steady=p===5,amp=steady?.85:.5+.5*Math.cos(t*Math.PI*14);
    let s=`<text x="${X(0)}" y="${Y(12)}" class="t-sm">WHERE EACH CLASS ACTS</text>`;
    /* blood, with COMT */
    s+=`<rect x="${X(0)}" y="${Y(20)}" width="280" height="36" rx="8" style="fill:var(--vessel);fill-opacity:.1;stroke:var(--vessel);stroke-opacity:.55"/>`;
    s+=`<text x="${X(8)}" y="${Y(31)}" class="t-xs">BLOOD · levodopa with carbidopa</text>`;
    s+=`<text x="${X(228)}" y="${Y(31)}" class="t-xs t-mid" style="fill:var(--sage);font-weight:700">COMT</text>`;
    for(let k=0;k<9;k++){const ph=(u+k/9)%1,x=10+ph*258,o=f1(clamp(steady?.85:.25+.75*amp));
      const omd=x>236&&!on('C')&&k%3===0;
      s+=omd?`<rect x="${X(x-2.6)}" y="${Y(43)}" width="5.2" height="5.2" style="fill:var(--muted);opacity:${o}"/>`
            :`<circle cx="${X(x)}" cy="${Y(46)}" r="3.2" style="fill:none;stroke:var(--amber);stroke-width:1.6;opacity:${o}"/>`}
    const enz=(x,y,col,blk,bcol)=>{let g=`<path d="M${X(x)} ${Y(y)} L${X(x-6)} ${Y(y-8)} A10 10 0 1 0 ${X(x+6)} ${Y(y-8)} Z" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`;
      if(blk)g+=`<rect x="${X(x-4.5)}" y="${Y(y-9)}" width="9" height="9" transform="rotate(45 ${X(x)} ${Y(y-4.5)})" style="fill:${bcol};stroke:var(--panel);stroke-width:1"/>`;return g};
    s+=enz(228,52,'var(--sage)',on('C'),DG_CC.C);
    if(on('C'))s+=`<circle cx="${X(228)}" cy="${Y(45)}" r="13" style="fill:none;stroke:${DG_CC.C};stroke-width:1.6;stroke-dasharray:3 3"/>`;
    /* blood-brain barrier */
    s+=`<path d="M${X(0)} ${Y(64)} H${X(280)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:4 3"/><text x="${X(278)}" y="${Y(76)}" class="t-xs t-end">blood-brain barrier</text>`;
    /* dopamine terminal */
    s+=`<path d="M${X(8)} ${Y(72)} H${X(168)} V${Y(140)} Q${X(168)} ${Y(166)} ${X(142)} ${Y(166)} H${X(34)} Q${X(8)} ${Y(166)} ${X(8)} ${Y(140)} Z" style="fill:var(--cell);stroke:${on('L')?'var(--amber)':'var(--cell-line)'};stroke-width:${on('L')?2.6:1.6}"/>`;
    s+=`<text x="${X(16)}" y="${Y(86)}" class="t-xs">DOPAMINE TERMINAL</text>`;
    for(let k=0;k<3;k++){const ph=(u*1.4+k/3)%1,y=50+ph*70,o=f1(clamp((steady?.85:.3+.7*amp)*(1-ramp(ph,.85,1))));
      s+=y<100?`<circle cx="${X(146)}" cy="${Y(y)}" r="3.2" style="fill:none;stroke:var(--amber);stroke-width:1.6;opacity:${o}"/>`
              :`<circle cx="${X(146)}" cy="${Y(y)}" r="3.2" style="fill:var(--amber);opacity:${o}"/>`}
    [[40,132],[72,144],[104,132]].forEach(([x,y])=>{s+=vesicle(ox+x,oy+y,9,1,1)});
    /* cortical glutamate terminal */
    s+=`<path d="M${X(192)} ${Y(92)} H${X(272)} V${Y(146)} Q${X(272)} ${Y(166)} ${X(252)} ${Y(166)} H${X(212)} Q${X(192)} ${Y(166)} ${X(192)} ${Y(146)} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<text x="${X(232)}" y="${Y(110)}" class="t-xs t-mid">from cortex:</text><text x="${X(232)}" y="${Y(123)}" class="t-xs t-mid" style="fill:var(--violet)">glutamate</text>`;
    /* cleft traffic: dopamine and glutamate */
    for(let k=0;k<7;k++){const ph=(u+k*.137)%1,x=22+k*20+4*Math.sin(u*Math.PI*2+k),y=172+ph*20;
      s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="2.7" style="fill:var(--amber);opacity:${f1(clamp(steady?.9:.2+.8*amp))}"/>`}
    for(let k=0;k<4;k++){const ph=(u*1.2+k*.25)%1,x=210+k*13,y=170+ph*22;
      s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="2.4" style="fill:var(--violet);opacity:${on('N')?.95:.45}"/>`}
    /* MAO-B, and the breakdown it does when not blocked */
    s+=`<text x="${X(178)}" y="${Y(178)}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">MAO-B</text>`;
    s+=enz(178,196,'var(--violet)',on('M'),DG_CC.M);
    if(!on('M')){const b=bump(u,.2,.7);s+=`<rect x="${X(162-2.4)}" y="${Y(190)}" width="4.8" height="4.8" style="fill:var(--muted);opacity:${f1(b)}"/>`}
    else s+=`<circle cx="${X(178)}" cy="${Y(190)}" r="13" style="fill:none;stroke:${DG_CC.M};stroke-width:1.6;stroke-dasharray:3 3"/>`;
    /* striatal neuron and its receptors */
    s+=`<rect x="${X(4)}" y="${Y(204)}" width="272" height="84" rx="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<text x="${X(12)}" y="${Y(282)}" class="t-xs">STRIATAL NEURON</text>`;
    const dLit=on('A')||amp>.55||steady;
    [[30,'D1'],[64,'D2'],[98,'D2']].forEach(([x,lab],k)=>{const col=on('A')?'var(--sky)':(dLit?'var(--amber)':'var(--cell-line)'),fill=on('A')?'var(--sky-soft)':(dLit?'var(--amber-soft)':'var(--panel)');
      s+=`<rect x="${X(x-8)}" y="${Y(196)}" width="7" height="20" rx="2.5" style="fill:${fill};stroke:${col};stroke-width:1.4"/><rect x="${X(x+1)}" y="${Y(196)}" width="7" height="20" rx="2.5" style="fill:${fill};stroke:${col};stroke-width:1.4"/>`;
      s+=`<text x="${X(x)}" y="${Y(229)}" class="t-xs t-mid" style="font-weight:700">${lab}</text>`;
      if(on('A')){const yy=186+1.6*Math.sin(u*Math.PI*4+k);s+=`<path d="M${X(x-5)} ${Y(yy-5)} L${X(x+5)} ${Y(yy-5)} L${X(x)} ${Y(yy+3)} Z" style="fill:var(--sky)"/>`}});
    if(on('A'))s+=`<rect x="${X(16)}" y="${Y(174)}" width="96" height="62" rx="9" style="fill:none;stroke:var(--sky);stroke-width:1.6;stroke-dasharray:3 3"/>`;
    if(p===3)s+=`<text x="${X(14)}" y="${Y(246)}" class="t-xs" style="fill:var(--sky);font-weight:700">tavapadon: D1/D5</text>`;
    /* A2A */
    s+=`<rect x="${X(134)}" y="${Y(196)}" width="12" height="20" rx="4" style="fill:var(--panel);stroke:var(--good);stroke-width:1.4"/><text x="${X(140)}" y="${Y(229)}" class="t-xs t-mid" style="font-weight:700">A2A</text>`;
    if(on('I'))s+=`<rect x="${X(135.5)}" y="${Y(189)}" width="9" height="9" transform="rotate(45 ${X(140)} ${Y(193.5)})" style="fill:${DG_CC.I};stroke:var(--panel);stroke-width:1"/><rect x="${X(124)}" y="${Y(180)}" width="32" height="56" rx="9" style="fill:none;stroke:${DG_CC.I};stroke-width:1.6;stroke-dasharray:3 3"/>`;
    /* NMDA channel */
    s+=`<rect x="${X(221)}" y="${Y(196)}" width="8" height="22" rx="2.5" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.4"/><rect x="${X(235)}" y="${Y(196)}" width="8" height="22" rx="2.5" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.4"/><text x="${X(232)}" y="${Y(229)}" class="t-xs t-mid" style="font-weight:700">NMDA</text>`;
    if(on('N'))s+=`<rect x="${X(228)}" y="${Y(199)}" width="8" height="8" transform="rotate(45 ${X(232)} ${Y(203)})" style="fill:${DG_CC.N};stroke:var(--panel);stroke-width:1"/><rect x="${X(212)}" y="${Y(180)}" width="40" height="56" rx="9" style="fill:none;stroke:${DG_CC.N};stroke-width:1.6;stroke-dasharray:3 3"/>`;
    else{const b=bump(u,.3,.8);s+=`<circle cx="${X(232)}" cy="${Y(206+b*14)}" r="2.2" style="fill:var(--ink);opacity:${f1(.55*b)}"/>`}
    if(on('D'))s+=`<text x="${X(140)}" y="${Y(264)}" class="t-xs t-mid" style="fill:var(--ink)">DBS acts on the circuit, not at this synapse</text>`;
    /* legend */
    const lg=[[0,302,'lev','levodopa'],[92,302,'da','dopamine'],[184,302,'ag','agonist'],[0,318,'bk','blocker (class colour)'],[150,318,'gl','glutamate']];
    lg.forEach(([x,y,g,lab])=>{const cx=ox+x+5,cy=oy+y-3;
      if(g==='lev')s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="3.2" style="fill:none;stroke:var(--amber);stroke-width:1.6"/>`;
      if(g==='da')s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="3" style="fill:var(--amber)"/>`;
      if(g==='ag')s+=`<path d="M${f1(cx-5)} ${f1(cy-4)} L${f1(cx+5)} ${f1(cy-4)} L${f1(cx)} ${f1(cy+4)} Z" style="fill:var(--sky)"/>`;
      if(g==='bk')s+=`<rect x="${f1(cx-3.5)}" y="${f1(cy-3.5)}" width="7" height="7" transform="rotate(45 ${f1(cx)} ${f1(cy)})" style="fill:var(--violet)"/>`;
      if(g==='gl')s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--violet)"/>`;
      s+=`<text x="${X(x+14)}" y="${Y(y)}" class="t-xs">${lab}</text>`});
    s+=`<text x="${X(0)}" y="${Y(338)}" class="t-xs">${steady?'Pump: the level stays steady.':'Tablets: the level rises and falls.'}</text>`;
    s+=`<text x="${X(0)}" y="${Y(354)}" class="t-xs" style="fill:var(--ink);font-weight:700">${DG_SYNCAP[p]}</text>`;
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 800');
    const L=N?{X0:14,X1:372,BX:26,BW:334,TX:42,RY0:392,P:64,BH:52,CLX:387,SX:60,SY:440}
             :{X0:28,X1:402,BX:42,BW:348,TX:58,RY0:380,P:62,BH:50,CLX:414,SX:432,SY:30};
    const RY=i=>L.RY0-i*L.P;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const lit=DG_RUNGS.map((r,i)=>ease(ramp(t,DG_STEPS[i].from+.005,DG_STEPS[i].from+.075)));
    const topY=RY(5)-L.BH/2-6,botY=RY(0)+L.BH/2+8;
    [L.X0,L.X1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${topY}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`;
      const h=(botY-topY)*clamp(lit.reduce((a,b)=>a+b,0)/6);
      s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${f1(botY-h)}" style="stroke:var(--sky);stroke-width:5;stroke-linecap:round"/>`});
    s+=`<text x="${L.X0}" y="${topY-10}" class="t-sm" style="fill:var(--sky)">MORE ADVANCED ↑</text>`;
    const p=phaseOf(DG_STEPS,t);
    DG_RUNGS.forEach((r,i)=>{const cy=RY(i),o=lit[i],cur=i===p;
      s+=`<g class="clk" data-rung="${i}">`;
      s+=`<rect x="${L.BX}" y="${f1(cy-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${o>.5?'var(--sky-soft)':'var(--panel-2)'};stroke:${cur?'var(--sky)':(o>.5?'var(--sky)':'var(--line)')};stroke-width:${f1(cur?2.6:1+.8*o)}"/>`;
      s+=`<text x="${L.TX}" y="${f1(cy-7)}" class="t-lbl" style="fill:${o>.5?'var(--ink)':'var(--muted)'}">${r.t}</text>`;
      let cx=L.TX;r.c.forEach(([lab,k],j)=>{const w=chipW(lab),oo=f1(.3+.7*ease(ramp(t,DG_STEPS[i].from+.01+j*.012,DG_STEPS[i].from+.05+j*.012))),col=DG_CC[k];
        s+=`<g style="opacity:${oo}"><rect x="${f1(cx)}" y="${f1(cy+4)}" width="${f1(w)}" height="15" rx="7.5" style="fill:var(--panel);stroke:${col};stroke-width:1.5${k==='X'?';stroke-dasharray:3 2':''}"/>`;
        s+=`<text x="${f1(cx+w/2)}" y="${f1(cy+14.5)}" class="t-xs t-mid" style="fill:${k==='X'?'var(--bad)':'var(--ink)'}${k==='X'?';text-decoration:line-through':''}">${lab}</text></g>`;cx+=w+6});
      s+=`<circle cx="${L.X0}" cy="${cy}" r="12" style="fill:${o>.5?'var(--sky)':'var(--panel)'};stroke:${o>.5?'var(--sky)':'var(--line)'};stroke-width:2"/>`;
      s+=`<text x="${L.X0}" y="${cy+4}" class="t-xs t-mid" style="fill:${o>.5?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+='</g>'});
    /* the levodopa thread: add-ons sit on top of levodopa, they do not replace it */
    const th=lit[2];
    if(th>0){const x=L.BX+L.BW-14;s+=`<g style="opacity:${f1(.2+.8*th)}"><line x1="${x}" x2="${x}" y1="${f1(RY(2)+L.BH/2-4)}" y2="${f1(RY(4)-L.BH/2+4)}" style="stroke:var(--amber);stroke-width:3;stroke-linecap:round;opacity:.55"/>`;
      [2,3,4].forEach(i=>{s+=`<circle cx="${x}" cy="${f1(RY(i)-L.BH/2+8)}" r="4" style="fill:var(--amber)"/>`});
      s+=`<text x="${x+6}" y="${f1(RY(4)-L.BH/2-3)}" class="t-xs t-end" style="fill:var(--amber)">levodopa continues ↑</text></g>`}
    /* climber */
    const pos=clamp((t-.06)/.84)*5,cyC=RY(0)-pos*L.P;
    s+=`<g transform="translate(${L.CLX} ${f1(cyC)})"><circle r="9" style="fill:var(--sky);opacity:.22"/><circle r="5" style="fill:var(--sky)"/></g>`;
    /* synapse panel */
    if(N)s+=`<line x1="14" x2="386" y1="${L.SY-8}" y2="${L.SY-8}" class="grid"/>`;
    s+=drawSyn(L.SX,L.SY,t,p);
    svg.innerHTML=s;
    setSt(p);
    $('#dgNote').innerHTML=noteHTML(DG_STEPS[p]);
    $('#dgCap').textContent=`Rung ${p+1} of 6. Click a rung to jump to it. Ladder and synapse are schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#dgPlay'),draw,18000,'Replay','drugs');
  const setSt=stepWire($('#dgSteps'),DG_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rung]');if(!g)return;stop();const a=DG_STEPS[+g.dataset.rung].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---------- 2. effect sizes ---------- */
  const bs=$('#dgBen'),br=$('#dgBenT');let view=0;
  const colOf=k=>k==='P'?'var(--muted)':k==='W'?'var(--warn)':'var(--sky)';
  function drawB(t){
    const V=DG_BEN[view],nr=V.rows.length;
    const N=vb(bs,'720 '+(view===1?330:430),'400 '+(64+nr*64+30));
    const X0=N?20:250,X1=N?280:590,sc=(X1-X0)/(V.ax[1]-V.ax[0]),zx=X0-V.ax[0]*sc,top=N?54:58,rh=N?64:38;
    const yEnd=top+nr*rh-6;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<text x="20" y="26" class="t-sm">${['OFF-TIME SAVED PER DAY (HOURS)','IMPROVEMENT ON EACH TRIAL\'S SCALE (POINTS)','PEOPLE WITH THE EFFECT (%)'][view]}</text>`;
    if(!N)s+=`<text x="20" y="42" class="t-xs">${['higher = more off-time saved','higher = more improvement','higher = more common'][view]}</text>`;
    V.tk.forEach(v=>{const x=zx+v*sc;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-8}" y2="${yEnd}" class="${v===0?'axis':'grid'}"/><text x="${f1(x)}" y="${yEnd+14}" class="t-xs t-mid">${v}${V.u.trim()}</text>`});
    V.rows.forEach((r,i)=>{const k=ease(ramp(t,.04+i*.075,.34+i*.075)),y=top+i*rh,two=r.v.length>1;
      if(N){s+=`<text x="20" y="${y}" class="t-lbl">${r.n}</text><text x="20" y="${y+13}" class="t-xs">${r.tr}</text>`}
      else{s+=`<text x="20" y="${y+(two?9:11)}" class="t-lbl">${r.n}</text><text x="20" y="${y+(two?22:24)}" class="t-xs">${r.tr}</text>`}
      const by0=N?y+19:y;
      r.v.forEach((b,j)=>{const [v,kind,cmp,lo]=b,h=two?12:(kind==='D'?24:16),by=by0+j*15+(two?0:(kind==='D'?0:4)),vv=v*k,x=Math.min(zx,zx+vv*sc),w=Math.abs(vv*sc),col=colOf(kind);
        if(kind==='D')s+=`<rect x="${f1(x)}" y="${by}" width="${f1(w)}" height="${h}" rx="3" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.4;stroke-dasharray:4 3"/>`;
        else s+=`<rect x="${f1(x)}" y="${by}" width="${f1(Math.max(w,v===0?0:1))}" height="${h}" rx="3" style="fill:${col}"/>`;
        if(lo!=null&&k>.9)s+=`<line x1="${f1(zx+lo*sc)}" x2="${f1(zx+lo*sc)}" y1="${by-2}" y2="${by+h+2}" style="stroke:var(--panel);stroke-width:1.6"/>`;
        const lab=(lo!=null?f1(lo)+'–':'')+(view===0?(+v).toFixed(2).replace(/0$/,''):String(v)).replace('-','−')+V.u+(kind==='D'?' vs placebo':'')+(cmp&&!N?' '+cmp:'');
        const lx=v<0?zx+6:zx+v*sc+6;
        s+=`<text x="${f1(lx)}" y="${by+h-2}" class="t-xs" style="fill:${kind==='P'?'var(--muted)':'var(--ink)'};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${lab}</text>`})});
    bs.innerHTML=s;
    br.setAttribute('aria-valuetext',`${Math.round(t*100)}% of the bars grown`);
  }
  function setView(v){view=v;$$('[data-dgb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.dgb===v));
    $('#dgBenNote').innerHTML=noteHTML(DG_BEN_N[v]);$('#dgBenCap').textContent=DG_BEN[v].cap;drawB(+br.value)}
  $$('[data-dgb]').forEach(b=>b.addEventListener('click',()=>{stopB();br.value=0;setView(+b.dataset.dgb);$('#dgBenPlay').click()}));
  const stopB=playWire(br,$('#dgBenPlay'),drawB,7000,'Replay','drugs');
  setView(0);
  {const prev=redraws.drugs;redraws.drugs=()=>{prev&&prev();drawB(+br.value);drawTr(+tr.value)}}

  /* ---------- 3. drug cards with a side-effect filter ---------- */
  const FXN={icd:'impulse control',hall:'hallucinations',sleep:'sleepiness',oh:'orthostatic hypotension'};
  $('#dgCards').innerHTML=DG_CARDS.map(c=>`<div class="card" data-fx="${c.fx}"><div class="chips"><span class="tag sky">${c.cl}</span>${c.fx.split(' ').filter(Boolean).map(f=>`<span class="tag warn">${FXN[f]}</span>`).join('')}</div>
     <h4>${c.n}</h4><p><b>How it acts.</b> ${c.m}</p><p><b>What trials found.</b> ${c.e}</p><p><b>Key harms.</b> ${c.a}</p>${c.x?`<p><b>Origin.</b> ${c.x}</p>`:''}<p class="stage-cap" style="margin:0"><b>First US approval:</b> ${c.fda}</p></div>`).join('');
  function setFx(f){$$('[data-dgf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dgf===f));
    let n=0;$$('#dgCards .card').forEach(c=>{const ok=f==='all'||c.dataset.fx.split(' ').includes(f);c.style.display=ok?'':'none';if(ok)n++});
    $('#dgFxOut').innerHTML=`<span>Showing <b>${n}</b> of ${DG_CARDS.length} cards</span><span>Filter: <b>${DG_FX[f].l}</b></span>`;
    $('#dgFxNote').innerHTML=DG_FX[f].n;$('#dgFxNote').style.display=DG_FX[f].n?'':'none'}
  $$('[data-dgf]').forEach(b=>b.addEventListener('click',()=>setFx(b.dataset.dgf)));
  setFx('all');

  /* ---------- 4. the trials ---------- */
  const ts=$('#dgTr'),tr=$('#dgTrT');let tv=0;
  function hbar(x0,y,w,h,col,dash){return dash?`<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="3" style="fill:none;stroke:${col};stroke-width:1.6;stroke-dasharray:4 3"/>`
    :`<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="3" style="fill:${col}"/>`}
  /* rows of one or two bars with an axis; used by three of the trials */
  function rowsC(rows,o,t,ts0,te){let s='';const sc=(o.x1-o.x0)/o.max,yEnd=o.y+rows.length*o.rh-8;
    o.tk.forEach(v=>{const x=o.x0+v*sc;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${o.y-6}" y2="${yEnd}" class="${v?'grid':'axis'}"/><text x="${f1(x)}" y="${yEnd+13}" class="t-xs t-mid">${v}${o.u}</text>`});
    rows.forEach((r,i)=>{const k=ease(ramp(t,ts0+i*(te-ts0)/rows.length*.6,ts0+(i+1)*(te-ts0)/rows.length*.6+.15)),y=o.y+i*o.rh;
      if(o.N)s+=`<text x="${o.x0}" y="${y}" class="t-lbl">${r.n}</text>${r.tr?`<text x="${o.x0}" y="${y+13}" class="t-xs">${r.tr}</text>`:''}`;
      else s+=`<text x="${o.lx}" y="${y+10}" class="t-lbl">${r.n}</text>${r.tr?`<text x="${o.lx}" y="${y+23}" class="t-xs">${r.tr}</text>`:''}`;
      const by0=o.N?y+(r.tr?19:6):y;
      r.v.forEach(([v,col,lab,dash],j)=>{const by=by0+j*15,w=v*sc*k;s+=hbar(o.x0,by,w,12,col,dash);
        s+=`<text x="${f1(o.x0+v*sc+6)}" y="${by+10}" class="t-xs" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${lab}</text>`})});
    return s}
  function drawTr(t){
    const H=[[380,600],[400,640],[380,580],[380,560],[400,640]][tv];
    const N=vb(ts,'720 '+H[0],'400 '+H[1]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const LX=20,W0=N?20:260,W1=N?320:620;
    if(tv===0){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'PDQ-39 MOBILITY ADVANTAGE (POINTS)':'PDQ-39 MOBILITY: HOW BIG IS THE ADVANTAGE? (POINTS)'}</text>`;
      s+=rowsC([{n:'Levodopa first',tr:'vs levodopa-sparing start',v:[[1.8,'var(--amber)','1.8']]},{n:'MAO-B first',tr:'vs agonist first',v:[[1.4,'var(--violet)','1.4']]},{n:'Important difference',tr:'minimally important, for scale',v:[[6,'var(--ink)','6',1]]}],
        {N,x0:W0,x1:W1,lx:LX,y:N?52:48,rh:N?50:36,max:8,tk:[0,2,4,6,8],u:''},t,0,.5);
      const y2=N?260:204;
      s+=`<text x="${LX}" y="${y2}" class="t-sm">${N?'STOPPED FOR SIDE EFFECTS (%)':'STOPPED THE FIRST DRUG BECAUSE OF SIDE EFFECTS (%)'}</text>`;
      s+=rowsC([{n:'Dopamine agonist',v:[[28,'var(--sky)','28%']]},{n:'MAO-B inhibitor',v:[[23,'var(--violet)','23%']]},{n:'Levodopa',v:[[2,'var(--amber)','2%']]}],
        {N,x0:W0,x1:W1,lx:LX,y:y2+(N?24:22),rh:N?44:32,max:40,tk:[0,10,20,30,40],u:'%'},t,.45,1);
      if(N)s+=`<text x="${LX}" y="${H[1]-46}" class="t-xs">1,620 people, open-label, routine practice</text>`;
      else s+=`<text x="${LX}" y="${H[0]-16}" class="t-xs">1,620 people with early Parkinson's, randomised open-label in routine practice, followed for years</text>`;
      if(N)s+=`<text x="${LX}" y="${H[1]-30}" class="t-xs">p=0.005 for the mobility difference</text>`;
    }else if(tv===1){
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'CALM-PD: PRAMIPEXOLE vs LEVODOPA FIRST':'CALM-PD: INITIAL PRAMIPEXOLE vs INITIAL LEVODOPA (% OF PEOPLE)'}</text>`;
      s+=rowsC([{n:'Motor complications',tr:'at 23.5 months · HR 0.45',v:[[28,'var(--sky)','28%'],[51,'var(--amber)','51%']]},{n:'Any motor complication',tr:'at about 6 years',v:[[50,'var(--sky)','50.0%'],[68.4,'var(--amber)','68.4%']]},{n:'Somnolence',tr:'first 23.5 months',v:[[32.4,'var(--sky)','32.4%'],[17.3,'var(--amber)','17.3%']]}],
        {N,x0:W0,x1:W1,lx:LX,y:N?52:48,rh:N?60:44,max:80,tk:[0,20,40,60,80],u:'%'},t,0,.55);
      const y2=N?300:212;
      s+=`<text x="${LX}" y="${y2}" class="t-sm">${N?'SCORES (POINTS)':'SCORES (POINTS) · READ EACH ROW\'S DIRECTION'}</text>`;
      s+=rowsC([{n:'UPDRS improvement',tr:'higher = more benefit',v:[[4.5,'var(--sky)','4.5'],[9.2,'var(--amber)','9.2']]},{n:'Epworth at 6 years',tr:'higher = sleepier',v:[[11.3,'var(--sky)','11.3'],[8.6,'var(--amber)','8.6']]}],
        {N,x0:W0,x1:W1,lx:LX,y:y2+(N?24:22),rh:N?60:44,max:12,tk:[0,4,8,12],u:''},t,.5,1);
      const ly=N?H[1]-40:H[0]-22;
      s+=`<rect x="${LX}" y="${ly-8}" width="12" height="8" style="fill:var(--sky)"/><text x="${LX+18}" y="${ly}" class="t-xs">pramipexole first</text><rect x="${LX+140}" y="${ly-8}" width="12" height="8" style="fill:var(--amber)"/><text x="${LX+158}" y="${ly}" class="t-xs">levodopa first</text>`;
      s+=`<text x="${LX}" y="${ly+16}" class="t-xs">${N?'301 people · ADL similar at 6 years (79.9 vs 82.5)':'301 people · daily-living scores similar at 6 years (79.9 vs 82.5) · disabling dyskinesia uncommon in both'}</text>`;
    }else if(tv===2){
      s+=`<text x="${LX}" y="26" class="t-sm">056 STUDY: ROPINIROLE vs LEVODOPA, 5 YEARS</text>`;
      const gx=N?40:420,gy=N?190:56,cs=N?30:22;
      s+=rowsC([{n:'Dyskinesia by 5 years',tr:'cumulative',v:[[20,'var(--sky)','20% ropinirole'],[45,'var(--amber)','45% levodopa']]}],
        {N:true,x0:20,x1:N?270:250,lx:LX,y:N?54:70,rh:60,max:50,tk:[0,25,50],u:'%'},t,0,.35);
      s+=`<text x="${gx}" y="${gy-12}" class="t-sm">${N?'100 ROPINIROLE COMPLETERS':'100 COMPLETERS · 34 NEVER NEEDED LEVODOPA'}</text>`;
      const fill=Math.round(34*ease(ramp(t,.4,.8)));
      for(let i=0;i<100;i++){const x=gx+(i%10)*cs,y=gy+Math.floor(i/10)*cs*.82,on=i<fill;
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cs*.72)}" height="${f1(cs*.6)}" rx="2.5" style="fill:${on?'var(--sky)':'var(--panel)'};stroke:${on?'var(--sky)':'var(--line)'};stroke-width:1"/>`}
      if(N)s+=`<text x="${gx}" y="${f1(gy+10*cs*.82+14)}" class="t-lbl" style="fill:var(--sky)">${fill} never needed levodopa</text>`;
      const o=ramp(t,.82,.95),ty=N?470:236;
      s+=`<g style="opacity:${f1(o)}"><text x="${LX}" y="${ty}" class="t-sm">FINAL DOSES</text>`;
      s+=`<text x="${LX}" y="${ty+20}" class="t-lbl" style="fill:var(--sky)">ropinirole 16.5 mg</text><text x="${LX}" y="${ty+34}" class="t-xs">plus 427 mg levodopa in those supplemented</text>`;
      s+=`<text x="${LX}" y="${ty+56}" class="t-lbl" style="fill:var(--amber)">levodopa 753 mg</text></g>`;
      if(!N)s+=`<text x="${LX}" y="${H[0]-16}" class="t-xs">268 people · open-label levodopa allowed when needed</text>`;
    }else if(tv===3){
      const P=N?{x0:54,x1:372,y0:52,y1:292}:{x0:70,x1:440,y0:50,y1:300};
      const mx=m=>P.x0+(P.x1-P.x0)*m/24,py=v=>P.y1-(P.y1-P.y0)*v;
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'NOT YET NEEDING LEVODOPA (SCHEMATIC)':'DATATOP: STILL NOT NEEDING LEVODOPA · SCHEMATIC'}</text>`;
      [0,.25,.5,.75,1].forEach(v=>{s+=`<line x1="${P.x0}" x2="${P.x1}" y1="${f1(py(v))}" y2="${f1(py(v))}" class="grid"/><text x="${P.x0-6}" y="${f1(py(v)+3)}" class="t-xs t-end">${v*100}%</text>`});
      [0,6,12,18,24].forEach(m=>{s+=`<text x="${f1(mx(m))}" y="${P.y1+14}" class="t-xs t-mid">${m}</text>`});
      s+=`<text x="${P.x1}" y="${P.y1+28}" class="t-xs t-end">months</text>`;
      const lam=Math.LN2/9,mEnd=24*ease(ramp(t,.04,.6));
      const curve=hr=>{let d='';for(let i=0;i<=60;i++){const m=mEnd*i/60;d+=(i?'L':'M')+f1(mx(m))+' '+f1(py(Math.exp(-hr*lam*m)))}return d};
      s+=`<path d="${curve(1)}" style="fill:none;stroke:var(--muted);stroke-width:2.6"/><path d="${curve(.5)}" style="fill:none;stroke:var(--violet);stroke-width:2.8"/>`;
      const tc=ramp(t,.8,.9);if(tc>0)s+=`<path d="${curve(1)}" style="fill:none;stroke:var(--good);stroke-width:2;stroke-dasharray:2 4;opacity:${f1(tc)}"/>`;
      const md=ramp(t,.62,.76);
      if(md>0){s+=`<g style="opacity:${f1(md)}"><path d="M${P.x0} ${f1(py(.5))} H${f1(mx(18))}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
        [9,18].forEach(m=>{s+=`<path d="M${f1(mx(m))} ${f1(py(.5))} V${P.y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`});
        s+=`<path d="M${f1(mx(9))} ${f1(py(.5)-10)} H${f1(mx(18))}" style="stroke:var(--ink);stroke-width:1.6"/><text x="${f1(mx(13.5))}" y="${f1(py(.5)-16)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">about 9 months</text></g>`}
      const B=N?{x:20,y:344}:{x:470,y:62};
      s+=`<g><rect x="${B.x}" y="${B.y-12}" width="12" height="4" style="fill:var(--violet)"/><text x="${B.x+18}" y="${B.y-7}" class="t-xs" style="fill:var(--ink)">deprenyl (selegiline) 10 mg/day</text>`;
      s+=`<rect x="${B.x}" y="${B.y+4}" width="12" height="4" style="fill:var(--muted)"/><text x="${B.x+18}" y="${B.y+9}" class="t-xs" style="fill:var(--ink)">placebo</text>`;
      s+=`<rect x="${B.x}" y="${B.y+20}" width="12" height="4" style="fill:var(--good)"/><text x="${B.x+18}" y="${B.y+25}" class="t-xs" style="fill:var(--ink)">tocopherol 2,000 IU: no effect</text></g>`;
      const hb=ramp(t,.6,.7);s+=`<text x="${B.x}" y="${B.y+56}" class="t-big" style="fill:var(--violet);opacity:${f1(hb)}">HR 0.50</text><text x="${B.x}" y="${B.y+72}" class="t-xs" style="opacity:${f1(hb)}">for reaching disability needing levodopa</text>`;
      const cv=ramp(t,.9,.98),cw=N?360:230;
      s+=`<g style="opacity:${f1(cv)}"><rect x="${B.x}" y="${B.y+88}" width="${cw}" height="${N?52:66}" rx="9" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      wrapT('Ratings improved in the first 3 months and worsened after withdrawal: a symptomatic effect could not be excluded.',N?58:36).forEach((l,i)=>{s+=`<text x="${B.x+10}" y="${B.y+106+i*13}" class="t-xs" style="fill:var(--warn)">${l}</text>`});
      s+='</g>';
    }else{
      s+=`<text x="${LX}" y="26" class="t-sm">${N?'ADAGIO: DELAYED START (SCHEMATIC)':'ADAGIO: EARLY START vs DELAYED START · UPDRS WORSENING (SCHEMATIC PATHS)'}</text>`;
      const PN=[{d:'1 mg',e:2.82,a:3.4,z:4.52,ok:1,res:'all 3 endpoints met'},{d:'2 mg',e:3.47,a:2.9,z:3.11,ok:0,res:'week 72: p=0.60, not met'}];
      PN.forEach((P,i)=>{const B=N?{x0:54,x1:372,y0:80+i*250,y1:250+i*250}:{x0:64+i*336,x1:352+i*336,y0:70,y1:286};
        const wx=w=>B.x0+(B.x1-B.x0)*w/72,uy=v=>B.y1-(B.y1-B.y0)*v/6;
        s+=`<text x="${B.x0}" y="${B.y0-14}" class="t-lbl">Rasagiline ${P.d}</text>`;
        s+=`<rect x="${f1(wx(0))}" y="${B.y0}" width="${f1(wx(36)-wx(0))}" height="${B.y1-B.y0}" style="fill:var(--panel-2);opacity:.7"/>`;
        s+=`<text x="${f1(wx(18))}" y="${B.y0+12}" class="t-xs t-mid">delayed group on placebo</text>`;
        [0,2,4,6].forEach(v=>{s+=`<line x1="${B.x0}" x2="${B.x1}" y1="${f1(uy(v))}" y2="${f1(uy(v))}" class="grid"/><text x="${B.x0-6}" y="${f1(uy(v)+3)}" class="t-xs t-end">${v}</text>`});
        [0,36,72].forEach(w=>{s+=`<text x="${f1(wx(w))}" y="${B.y1+14}" class="t-xs t-mid">${w}</text>`});
        s+=`<text x="${B.x1}" y="${B.y1+28}" class="t-xs t-end">weeks</text>`;
        const wEnd=72*ease(ramp(t,.05,.6));
        const path=fn=>{let d='';for(let k=0;k<=48;k++){const w=wEnd*k/48;d+=(k?'L':'M')+f1(wx(w))+' '+f1(uy(fn(w)))}return d};
        const early=w=>P.e*Math.pow(w/72,.85),delayed=w=>w<=36?P.a*w/36:P.a+(P.z-P.a)*(w-36)/36;
        s+=`<path d="${path(delayed)}" style="fill:none;stroke:var(--muted);stroke-width:2.6"/><path d="${path(early)}" style="fill:none;stroke:var(--violet);stroke-width:2.8"/>`;
        const eo=ramp(t,.6,.7);
        if(eo>0){s+=`<g style="opacity:${f1(eo)}"><circle cx="${f1(wx(72))}" cy="${f1(uy(P.e))}" r="4" style="fill:var(--violet)"/><circle cx="${f1(wx(72))}" cy="${f1(uy(P.z))}" r="4" style="fill:var(--muted)"/>`;
          s+=`<text x="${B.x0}" y="${B.y1+28}" class="t-xs" style="font-weight:700"><tspan style="fill:var(--muted)">week 72:</tspan> <tspan style="fill:var(--violet)">early ${P.e}</tspan> · <tspan style="fill:var(--ink)">delayed ${P.z}</tspan></text></g>`}
        const vo=ramp(t,.72,.82);
        if(vo>0){const w=P.res.length*5.7+20;s+=`<g style="opacity:${f1(vo)}"><rect x="${B.x0+6}" y="${B.y0+22}" width="${f1(w)}" height="20" rx="10" style="fill:${P.ok?'var(--good-soft)':'var(--bad-soft)'};stroke:${P.ok?'var(--good)':'var(--bad)'}"/><text x="${f1(B.x0+6+w/2)}" y="${B.y0+36}" class="t-xs t-mid" style="fill:${P.ok?'var(--good)':'var(--bad)'};font-weight:700">${P.res}</text></g>`}});
      const fo=ramp(t,.86,.96),fy=N?H[1]-58:H[0]-56,fw=N?372:680;
      s+=`<g style="opacity:${f1(fo)}"><rect x="14" y="${fy}" width="${fw}" height="${N?48:34}" rx="9" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      wrapT('FDA advisory committee, 17 to 0: no substantial evidence that rasagiline delays progression. Reported in trade press; no slowing claim was granted.',N?62:112).forEach((l,i)=>{s+=`<text x="26" y="${fy+15+i*13}" class="t-xs" style="fill:var(--warn)">${l}</text>`});
      s+='</g>';
      if(!N)s+=`<text x="${LX}" y="${H[0]-10}" class="t-xs">Violet: early start (rasagiline from week 0). Grey: delayed start (placebo, then rasagiline from week 36).</text>`;
      else s+=`<text x="${LX}" y="44" class="t-xs">violet: early start · grey: delayed start</text>`;
    }
    ts.innerHTML=s;
    tr.setAttribute('aria-valuetext',`${Math.round(t*100)}% revealed`);
  }
  function setTr(v){tv=v;$$('[data-dgt]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.dgt===v));
    $('#dgTrNote').innerHTML=noteHTML(DG_TRN[v]);$('#dgTrCap').textContent=DG_TRCAP[v];drawTr(+tr.value)}
  $$('[data-dgt]').forEach(b=>b.addEventListener('click',()=>{stopT();tr.value=0;setTr(+b.dataset.dgt);$('#dgTrPlay').click()}));
  const stopT=playWire(tr,$('#dgTrPlay'),drawTr,8000,'Replay','drugs');
  setTr(0);

  /* ---------- 5. reading the evidence ---------- */
  $('#dgEv').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Ask about impulse control at every visit</h4><p>DOMINION found an impulse-control disorder in 13.6% of 3,090 people overall: buying 5.7%, gambling 5.0%, binge eating 4.3% and compulsive sexual behaviour 3.5%. NICE asks for oral and written information when dopaminergic treatment starts, including that affected people may hide it, and for the subject to be raised at reviews. If a problem develops, NICE says to seek specialist advice and reduce any agonist gradually first, watching for withdrawal. [[Weintraub2010,NICE2017]]</p>
     <div class="pt"><b>In plain words</b>New urges to gamble, shop, eat or for sex can come from the medicine. They are common, often hidden, and can improve when the medicine is adjusted with the specialist.</div></div>
   <div class="card"><span class="ev est">Established</span><h4>No medicine has been shown to slow Parkinson's</h4><p>The 2018 MDS review found no intervention clinically useful to prevent or delay disease progression. DATATOP's delay could have been symptom relief; ADAGIO's two doses disagreed; and in LEAP, levodopa started 40 weeks earlier made no difference at 80 weeks (UPDRS difference 1.0, p=0.44). [[Fox2018,PSG1993DATATOP,Olanow2009,Verschuur2019]]</p></div>
   <div class="card"><span class="tag warn">Debated</span><h4>Which medicine first?</h4><p>Agonist-first trials (CALM-PD, 056) found fewer motor complications but less motor benefit and more sleepiness. PD MED, a larger pragmatic trial, found small persistent mobility and quality-of-life benefits from starting with levodopa, and far fewer people stopping it. NICE frames the choice around whether symptoms affect quality of life rather than around age, and MDS does not rank the options. [[PSG2000CALM,Rascol2000,PDMED2014,NICE2017,Fox2018]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Sleep attacks and driving</h4><p>The first case series described 9 people who fell asleep at the wheel on pramipexole or ropinirole and had accidents, 5 of them with no warning. The labels now carry the warning, as late as a year after starting, and levodopa's label does too. NICE: people with daytime sleepiness or sudden onset of sleep should not drive. [[Frucht1999,AgonistLabels2026,LevodopaLabels2026,NICE2017]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Why ergot agonists fell out of use</h4><p>Moderate-to-severe heart-valve regurgitation in 23.4% on pergolide and 28.6% on cabergoline, against 0% on non-ergot agonists. NICE advises against ergot-derived agonists first line and keeps them for people not controlled by a non-ergot agonist, because of the monitoring they need. [[Zanettini2007,NICE2017]]</p></div>
   <div class="card"><span class="tag sky">New in 2026</span><h4>Tavapadon (Juvmo)</h4><p>Approved by the FDA on 25 Sep 2026 for Parkinson's disease in adults. It is a selective D1/D5 partial agonist; the label's maintenance dose is 5 mg once daily, maximum 15 mg. Its impulse-control rates in trials were low (1% vs 0% early, 2% vs 1% adjunct). With the older agonists, DIGPD found that risk rose with lifetime dose and treatment duration. [[DrugsFDA2026,AgonistLabels2026,Corvol2018]]</p></div>
   <div class="card"><h4>Rasagiline and Israel</h4><p>Israel's Ministry of Health licensed rasagiline on 3 Jan 2005 for early monotherapy and for adjunct use in moderate-to-advanced disease, according to Teva's press release; the FDA approved it on 16 May 2006. Teva calls it a joint development with the Technion, and the Technion credits Youdim and Finberg's work in the 1970s. Current Israeli registry entries could not be checked for this guide. [[Teva2005,DrugsFDA2026,Technion2016]]</p></div>`;
};
