/* =============== 4.2 Drugs that can worsen MG =============== */
/* Sites are only those the labels or sources read actually state. Where a label says
   "neuromuscular blocking activity" or "curare-like" without naming the side of the
   junction, the drug goes to 'nmj' (side not named), not to a guessed side. */
const DR_SITES={
 none:{n:'Normal transmission',c:'var(--achr)',lines:['no drug: the full signal gets through']},
 pre:{n:'Nerve terminal: less ACh out',c:'var(--drug)',lines:['IV magnesium · procainamide','botulinum toxin']},
 post:{n:'Receptor side: AChRs blocked',c:'var(--drug)',lines:['rocuronium and other non-depolarizing','blockers · succinylcholine (resistance)']},
 nmj:{n:'Junction, side not named',c:'var(--warn)',lines:['fluoroquinolones · quinine','aminoglycosides · colistin · quinidine','beta-blockers · verapamil']},
 imm:{n:'Immune: MG set off',c:'var(--ab)',lines:['checkpoint inhibitors · D-penicillamine','interferons · tyrosine kinase inhibitors']},
 unk:{n:'Mechanism not stated',c:'var(--muted)',lines:['telithromycin · macrolides · statins','contrast · steroid start · lithium …']}
};
const DR_RESP={none:1,pre:.35,post:.4,nmj:.5,imm:.45,unk:.75};
const DR_STEPS=[
 {from:0,at:.04,site:'none',k:'Normal',t:'A nerve impulse releases acetylcholine',
  txt:`Each nerve impulse releases packets of acetylcholine (ACh) from vesicles in the nerve terminal. ACh crosses the cleft and opens receptors (AChRs) on the muscle. In MG the antibody attack has already removed many receptors, so there is less reserve, and a drug that trims the signal a little more can tip a muscle into weakness. Sheikh's review splits drugs into those that impair transmission (antibiotics, antiarrhythmics, anaesthetics, neuromuscular blockers) and those that set off MG through the immune system (checkpoint inhibitors, D-penicillamine, tyrosine kinase inhibitors, interferons). [[Sheikh2021]]`,
  pt:`The nerve squirts a chemical messenger at the muscle. In MG there are fewer catchers on the muscle, so anything that weakens the squirt or blocks the catchers matters more.`,
  hook:`Two families: drugs that <b>impair transmission</b> and drugs that <b>induce MG</b> through the immune system (Sheikh 2021).`},
 {from:.14,at:.2,site:'pre',k:'Site 1 · Nerve terminal',t:'Less acetylcholine is released',
  txt:`Three labels place the effect on the nerve side. The magnesium sulfate label says magnesium blocks neuromuscular transmission by "decreasing the amount of acetylcholine liberated at the end plate". The procainamide label describes a "procaine-like effect on diminishing acetylcholine release". The Botox label calls it "an acetylcholine release inhibitor". Hypermagnesaemia gives a Lambert-Eaton-like presynaptic picture. [[FDAMagnesiumSulfate2026,FDAProcainamide2026,FDABotox2026,Krenn2020]]`,
  pt:`These drugs make the nerve let out less messenger, so fewer receptors get the signal.`,
  hook:`Presynaptic in the labels: <b>magnesium</b>, <b>procainamide</b>, <b>botulinum toxin</b>. Magnesium sulfate is <b>not recommended for eclampsia</b> in MG (consensus).`},
 {from:.32,at:.38,site:'post',k:'Site 2 · Receptor side',t:'Receptors are blocked',
  txt:`Non-depolarizing neuromuscular blockers such as rocuronium occupy the receptors. The rocuronium label warns that in MG "small doses of nondepolarizing neuromuscular blocking agents may have profound effects", and a review notes the block can be prolonged and unpredictable. Succinylcholine works the other way round: with fewer receptors, people with MG are more resistant to it (dose needs up to 2.6 times normal), and it is not absolutely contraindicated. [[FDARocuronium2026,Sheikh2021,Bhat2024]]`,
  pt:`Muscle relaxants used in surgery sit on the catchers. With fewer catchers to start with, a small dose has a big effect.`,
  hook:`MG: <b>sensitive</b> to non-depolarizing blockers, <b>resistant</b> to succinylcholine.`},
 {from:.5,at:.56,site:'nmj',k:'Site 3 · The junction',t:'An effect at the junction, side not named',
  txt:`For many drugs the label says the drug acts at the junction without naming the side. Fluoroquinolones and quinine "have neuromuscular blocking activity"; aminoglycosides have "curare-like effects on the neuromuscular junction"; colistimethate can cause "neuromuscular blockade"; verapamil "may potentiate" neuromuscular blockers; the timolol label says beta-adrenergic blockade can "potentiate muscle weakness"; and the quinidine label points to anticholinergic effects. The sources read do not say which side, so the drawing lights both. [[FDACiprofloxacin2026,FDAQualaquin2026,FDAGentamicin2026,FDAColistimethate2026,FDAVerapamil2026,FDATimolol2026,FDAQuinidine2026]]`,
  pt:`Several antibiotics, heart drugs and even some eye drops can weaken the signal at the junction. Exactly where they act is not spelled out in the labels.`,
  hook:`<b>Fluoroquinolones</b>: US boxed warning for MG since <b>February 2011</b>. <b>Quinine</b>: contraindicated on its label.`},
 {from:.68,at:.74,site:'imm',k:'Site 4 · The immune system',t:'MG is set off or unmasked',
  txt:`Some drugs act through immunity rather than at the junction. Checkpoint-inhibitor labels list myasthenic syndrome or MG, including exacerbation, and a myocarditis-myositis-MG overlap; the penicillamine label lists MG among fatal associations, and in most cases the symptoms receded after the drug was stopped. D-penicillamine MG affects about 1-7% of those treated, starting usually 6-7 months in, and 70% remit 6-10 months after stopping. Interferons have case reports of MG triggered or worsened. [[FDAKeytruda2026,FDAPenicillamine2026,Sheikh2021,Krenn2020]]`,
  pt:`A few medicines stir up the immune system, which can start making the antibodies that attack the junction, or make them worse.`,
  hook:`Immune route: <b>checkpoint inhibitors</b> (median onset about 4 weeks, often with myositis or myocarditis) and <b>D-penicillamine</b> (usually remits after stopping).`},
 {from:.86,at:.92,site:'unk',k:'Site 5 · Unknown',t:'Linked to worsening, mechanism not stated',
  txt:`For other drugs the sources record the link but not how it works: telithromycin (contraindicated, often within hours of the first dose), macrolides (label warnings), and starting steroids (42% transient worsening in one series; the prednisone label warns of severe weakness when steroids and anticholinesterases are combined). Two links are debated: statins (new-onset MG in the first 6-12 months, crisis risk raised only in the first 30 days) and iodinated contrast (symptoms after 6.1% of contrast scans vs 3.5% without). [[FDAKetek2007,Perrot2006,FDAZithromax2026,Bae2006,FDAPrednisone2026,Yan2026,Yoo2026,Geenen2024]]`,
  pt:`For some drugs, studies show people with MG got worse after taking them, but nobody has shown exactly why.`,
  hook:`Debated: <b>statins</b> and <b>iodinated contrast</b> (should not be withheld if indicated). Gadolinium: considered safe. <b>Steroid start</b>: transient worsening is common.`}
];
const DR_BADGE={contra:'Contraindicated',boxed:'Boxed warning',label:'Label warning',case:'Case reports or mechanism',debated:'Debated',good:'Reassuring data'};
const DR_BCOL={contra:'var(--bad)',boxed:'var(--bad)',label:'var(--warn)',case:'var(--muted)',debated:'var(--nerve)',good:'var(--good)'};
const DR=[
 {id:'teli',n:'Telithromycin (Ketek)',al:'ketek ketolide',site:'unk',b:'contra',x:'also a boxed warning',sh:'no longer marketed in the US',key:`[[FDAKetek2007]]`,
  q:[{t:`KETEK is contraindicated in patients with myasthenia gravis.`,l:'Ketek (telithromycin) label',k:`[[FDAKetek2007]]`},{t:`There have been reports of fatal and life-threatening respiratory failure in patients with myasthenia gravis associated with the use of Ketek.`,l:'Ketek label, boxed warning text',k:`[[FDAKetek2007]]`}],
  mech:`Not stated in the sources read.`,
  ev:`In French pharmacovigilance, 7 of 10 cases began within 2 hours of the first dose. It is no longer marketed in the US. A UK charity names it as the one drug that must be avoided. [[Perrot2006,Sheikh2021,MyawareDrugs]]`},
 {id:'fq',n:'Fluoroquinolones',al:'ciprofloxacin cipro levofloxacin levaquin moxifloxacin avelox ofloxacin quinolone',site:'nmj',b:'boxed',x:'MG added to the class boxed warning in February 2011',sh:'probable',key:`[[FDACiprofloxacin2026]]`,
  q:[{t:`WARNING: SERIOUS ADVERSE REACTIONS INCLUDING … EXACERBATION OF MYASTHENIA GRAVIS`,l:'Ciprofloxacin tablets label, boxed warning title',k:`[[FDACiprofloxacin2026]]`},{t:`Fluoroquinolones, including Ciprofloxacin, may exacerbate muscle weakness in patients with myasthenia gravis. Avoid Ciprofloxacin in patients with known history of myasthenia gravis.`,l:'Ciprofloxacin tablets label',k:`[[FDACiprofloxacin2026]]`},{t:`Avoid levofloxacin in patients with a known history of myasthenia gravis`,l:'Levofloxacin label',k:`[[FDALevofloxacin2026]]`}],
  mech:`The labels say fluoroquinolones "have neuromuscular blocking activity"; no side is named. [[FDACiprofloxacin2026,FDALevofloxacin2026]]`,
  ev:`FDA added MG to the class boxed warning in February 2011. In 37 FDA adverse-event reports, onset was a median of 1 day after exposure; 30% needed ventilation, 5% died and 16% worsened again on rechallenge. In a real-world cohort, exacerbation followed 2.4% of ciprofloxacin and 1.6% of levofloxacin courses vs 1.3% of amoxicillin courses (p = 0.68). Sheikh rates the link "probable". [[FDAFluoroquinolone2016,Jones2011,Uysal2025,Sheikh2021]]`},
 {id:'mac',n:'Macrolides',al:'azithromycin zithromax z-pak clarithromycin biaxin erythromycin',site:'unk',b:'label',sh:'definite',key:`[[FDAZithromax2026]]`,
  q:[{t:`ZITHROMAX may exacerbate muscle weakness in persons with myasthenia gravis.`,l:'Zithromax (azithromycin) label',k:`[[FDAZithromax2026]]`},{t:`Exacerbation of symptoms of myasthenia gravis and new onset of symptoms of myasthenic syndrome has been reported in patients receiving clarithromycin therapy.`,l:'Clarithromycin label',k:`[[FDAClarithromycin2026]]`},{t:`There have been reports that erythromycin may aggravate the weakness of patients with myasthenia gravis.`,l:'Erythromycin lactobionate injection label',k:`[[FDAErythromycin2026]]`}],
  mech:`The labels report worsening without stating a mechanism.`,
  ev:`Label warnings, not boxed. Sheikh rates the link "definite" and suggests avoiding macrolides when there is an alternative; the MGFA list says "use cautiously, if at all". Exacerbation followed 1.5% of azithromycin courses vs 1.3% of amoxicillin courses in one cohort. [[Sheikh2021,MGFA2024,Uysal2025]]`},
 {id:'amg',n:'Aminoglycosides',al:'gentamicin tobramycin neomycin amikacin streptomycin',site:'nmj',b:'label',sh:'definite',key:`[[FDAGentamicin2026]]`,
  q:[{t:`Aminoglycosides should be used with caution in patients with neuromuscular disorders such as myasthenia gravis … since these drugs may aggravate muscle weakness because of their potential curare-like effects on the neuromuscular junction.`,l:'Gentamicin injection label',k:`[[FDAGentamicin2026]]`}],
  mech:`"Curare-like effects on the neuromuscular junction" (label); the side is not named. [[FDAGentamicin2026]]`,
  ev:`Sheikh rates the link "definite", with the main risk at high doses, in kidney failure, or alongside neuromuscular blockers. MGFA: use only if there is no alternative. [[Sheikh2021,MGFA2024]]`},
 {id:'col',n:'Polymyxins (colistin)',al:'colistimethate coly-mycin polymyxin e colistin',site:'nmj',b:'case',sh:'polymyxin B listed as safe',key:`[[FDAColistimethate2026]]`,
  q:[{t:`Impaired renal function increases the possibility of apnea and neuromuscular blockade following administration of colistimethate sodium.`,l:'Coly-Mycin M (colistimethate) label; it does not name MG',k:`[[FDAColistimethate2026]]`}],
  mech:`The label describes "interference of nerve transmission at neuromuscular junctions", and interaction with aminoglycosides and neuromuscular blockers. [[FDAColistimethate2026]]`,
  ev:`A general label warning only. Sheikh found no clinical reports of MG worsening with polymyxin B, and lists polymyxin B among antibiotics that can be given safely. [[Sheikh2021]]`},
 {id:'mg',n:'Magnesium (IV)',al:'magnesium sulfate mgso4 magnesium sulphate',site:'pre',b:'case',x:'consensus: not recommended for eclampsia in MG',sh:'no rating in the sources read',key:`[[FDAMagnesiumSulfate2026]]`,
  q:[{t:`Magnesium prevents or controls convulsions by blocking neuromuscular transmission and decreasing the amount of acetylcholine liberated at the end plate by the motor nerve impulse.`,l:'Magnesium sulfate injection label; it does not name MG',k:`[[FDAMagnesiumSulfate2026]]`}],
  mech:`Less acetylcholine released at the end plate (label): presynaptic. [[FDAMagnesiumSulfate2026]]`,
  ev:`Case reports include crisis after IV magnesium for atrial fibrillation and after magnesium for pre-eclampsia. All exacerbations after overridden hospital alerts followed IV magnesium or IV labetalol. The consensus says magnesium sulfate is not recommended for eclampsia in MG and suggests barbiturates or phenytoin. MGFA: potentially dangerous IV, use only if necessary with monitoring. [[Jessop2022,Sheikh2021,Petrucelli2024,Sanders2016,MGFA2024]]`},
 {id:'bb',n:'Beta-blockers, including timolol eye drops',al:'timolol timoptic propranolol metoprolol atenolol labetalol bisoprolol carvedilol eye drops glaucoma',site:'nmj',b:'label',sh:'possible',key:`[[FDATimolol2026]]`,
  q:[{t:`Timolol has been reported rarely to increase muscle weakness in some patients with myasthenia gravis or myasthenic symptoms.`,l:'Timolol-containing eye-drop label',k:`[[FDATimolol2026]]`}],
  mech:`"Beta-adrenergic blockade has been reported to potentiate muscle weakness" (label); no site is named. [[FDATimolol2026]]`,
  ev:`A 1985 letter describes MG worsening with timolol eye drops. Sheikh rates beta-blockers "possible": they can be used in stable MG with close monitoring early on. IV labetalol was linked to exacerbations in hospital alert-override data. [[Verkijk1985,Sheikh2021,Petrucelli2024]]`},
 {id:'ccb',n:'Calcium channel blockers',al:'verapamil diltiazem amlodipine nifedipine',site:'nmj',b:'case',sh:'possible (L-type)',key:`[[FDAVerapamil2026]]`,
  q:[{t:`… verapamil may potentiate the activity of depolarizing and nondepolarizing neuromuscular blocking agents.`,l:'Verapamil injection label; it does not name MG',k:`[[FDAVerapamil2026]]`}],
  mech:`Potentiates neuromuscular blockers (label); no site is named.`,
  ev:`Sheikh rates L-type blockers "possible", usable in stable MG with monitoring. Evidence: case reports and mechanism only. [[Sheikh2021]]`},
 {id:'proc',n:'Procainamide',al:'procainamide class ia antiarrhythmic',site:'pre',b:'label',sh:'definite (class Ia)',key:`[[FDAProcainamide2026]]`,
  q:[{t:`Patients with myasthenia gravis may show worsening of symptoms from PA due to its procaine-like effect on diminishing acetylcholine release at skeletal muscle motor nerve endings, so that PA administration may be hazardous without optimal adjustment of anticholinesterase medications and other precautions.`,l:'Procainamide injection label',k:`[[FDAProcainamide2026]]`}],
  mech:`Less acetylcholine released from the motor nerve endings (label): presynaptic. [[FDAProcainamide2026]]`,
  ev:`Sheikh rates class Ia antiarrhythmics "definite" and suggests avoiding them when there is an alternative. [[Sheikh2021]]`},
 {id:'quinid',n:'Quinidine',al:'quinidine nuedexta dextromethorphan class ia antiarrhythmic',site:'nmj',b:'label',sh:'definite (class Ia)',key:`[[FDAQuinidine2026]]`,
  q:[{t:`Monitor for worsening clinical condition in myasthenia gravis and other conditions that may be adversely affected by anticholinergic effects.`,l:'Quinidine-containing label (dextromethorphan with quinidine)',k:`[[FDAQuinidine2026]]`}],
  mech:`The label points to anticholinergic effects; no site at the junction is named.`,
  ev:`Sheikh rates class Ia antiarrhythmics "definite" and suggests avoiding them when there is an alternative. [[Sheikh2021]]`},
 {id:'quinine',n:'Quinine (Qualaquin)',al:'qualaquin quinine tonic cramps malaria',site:'nmj',b:'contra',sh:'no rating in the sources read',key:`[[FDAQualaquin2026]]`,
  q:[{t:`Myasthenia gravis. Quinine has neuromuscular blocking activity, and may exacerbate muscle weakness.`,l:'Qualaquin label, Contraindications',k:`[[FDAQualaquin2026]]`}],
  mech:`"Neuromuscular blocking activity" (label); no side is named. [[FDAQualaquin2026]]`,
  ev:`A label contraindication in MG. MGFA notes that US use of quinine is restricted to malaria. [[FDAQualaquin2026,MGFA2024]]`},
 {id:'hcq',n:'Chloroquine and hydroxychloroquine',al:'plaquenil hydroxychloroquine chloroquine antimalarial lupus',site:'unk',b:'case',sh:'case reports',key:`[[Sheikh2021]]`,
  q:[],noq:`No MG statement was found in the US chloroquine and hydroxychloroquine (Plaquenil) labels read. [[FDAPlaquenil2026]]`,
  mech:`Not stated in the sources read.`,
  ev:`Case reports of both new MG and worsening MG. MGFA: use with caution. [[Sheikh2021,MGFA2024]]`},
 {id:'botox',n:'Botulinum toxin',al:'botox onabotulinumtoxina abobotulinumtoxina dysport xeomin blepharospasm',site:'pre',b:'label',x:'boxed warning for distant spread (all products)',sh:'definite',key:`[[FDABotox2026]]`,
  q:[{t:`Individuals with peripheral motor neuropathic diseases, amyotrophic lateral sclerosis or neuromuscular junction disorders (e.g., myasthenia gravis or Lambert-Eaton syndrome) should be monitored when given botulinum toxin.`,l:'Botox label',k:`[[FDABotox2026]]`},{t:`Focal facial paralysis, syncope, and exacerbation of myasthenia gravis have also been reported after treatment of blepharospasm.`,l:'Botox label',k:`[[FDABotox2026]]`}],
  mech:`The label calls Botox "an acetylcholine release inhibitor": presynaptic. [[FDABotox2026]]`,
  ev:`Sheikh rates it "definite": avoid if possible, though it may be offered with cautious dose titration in mild or stable MG with dystonia or blepharospasm. MGFA: avoid. Jitter on single-fibre EMG can stay abnormal for 6 months or more after injections, even far from the site. [[Sheikh2021,MGFA2024,Sanders2022]]`},
 {id:'ndmb',n:'Non-depolarizing neuromuscular blockers',al:'rocuronium vecuronium cisatracurium atracurium pancuronium muscle relaxant anaesthesia anesthesia surgery',site:'post',b:'label',sh:'more sensitive',key:`[[FDARocuronium2026]]`,
  q:[{t:`In patients with myasthenia gravis or myasthenic (Eaton-Lambert) syndrome, small doses of nondepolarizing neuromuscular blocking agents may have profound effects.`,l:'Rocuronium bromide injection label',k:`[[FDARocuronium2026]]`}],
  mech:`They block the acetylcholine receptors on the muscle side (the class's action; general pharmacology).`,
  ev:`People with MG are more sensitive, and the block can be prolonged and unpredictable. A Danish series: with careful preparation and monitoring most people with MG can be anaesthetised without postoperative ventilation, and blockers, when used, are given in smaller doses with monitoring. [[Sheikh2021,BlichfeldtLauridsen2012]]`},
 {id:'sux',n:'Succinylcholine',al:'suxamethonium succinylcholine quelicin',site:'post',b:'case',x:'resistance, not extra weakness',sh:'not absolutely contraindicated',key:`[[Sheikh2021]]`,
  q:[],noq:`No MG-specific text was found in the US succinylcholine label read. [[FDARocuronium2026]]`,
  mech:`A depolarizing blocker; with fewer receptors, people with MG are more resistant to it.`,
  ev:`Resistance to IV succinylcholine, with dose needs up to 2.6 times normal (cited secondhand from a 1988 study); it is not absolutely contraindicated. [[Sheikh2021,Bhat2024]]`},
 {id:'suga',n:'Sugammadex (reversal)',al:'sugammadex bridion reversal',site:'post',b:'good',sh:'reassuring data',key:`[[Kaye2025]]`,
  q:[],noq:`No MG-specific text was found in the US sugammadex label read. [[FDARocuronium2026]]`,
  mech:`Reverses rocuronium-type block; listed here because people search for it.`,
  ev:`A systematic review of 24 studies found fast reversal (train-of-four recovery 79.7 s to 10 min), low postoperative crisis rates and no deaths; evidence is limited, and reversal failure has been reported. A Japanese study cited by Sheikh: postoperative crisis 4.3% with sugammadex vs 8.7% without. [[Kaye2025,Bhat2024,Sheikh2021]]`},
 {id:'pen',n:'D-penicillamine',al:'penicillamine cuprimine depen wilson cystinuria rheumatoid',site:'imm',b:'label',sh:'listed as inducing MG',key:`[[FDAPenicillamine2026]]`,
  q:[{t:`The use of penicillamine has been associated with fatalities due to certain diseases such as aplastic anemia, agranulocytosis, thrombocytopenia, Goodpasture's syndrome, and myasthenia gravis.`,l:'Penicillamine capsules label',k:`[[FDAPenicillamine2026]]`},{t:`In the majority of cases, symptoms of myasthenia have receded after withdrawal of penicillamine.`,l:'Penicillamine capsules label',k:`[[FDAPenicillamine2026]]`}],
  mech:`Induces MG through the immune system. [[Sheikh2021]]`,
  ev:`D-penicillamine MG affects about 1-7% of those treated; onset is usually 6-7 months after starting (1 month to 8 years), and 70% remit 6-10 months after stopping. A systematic review: onset 2-12 months, mainly ocular. A UK charity calls it best avoided. [[Sheikh2021,Antos2023,MyawareDrugs]]`},
 {id:'ici',n:'Immune checkpoint inhibitors',al:'pembrolizumab keytruda nivolumab opdivo ipilimumab yervoy atezolizumab durvalumab cemiplimab pd-1 pd-l1 ctla-4 immunotherapy',site:'imm',b:'label',sh:'induces MG',key:`[[FDAKeytruda2026]]`,
  q:[{t:`myasthenic syndrome/myasthenia gravis (including exacerbation)`,l:'Keytruda label, immune-mediated adverse reactions',k:`[[FDAKeytruda2026]]`},{t:`Myocarditis-Myositis-Myasthenia Gravis (or Myasthenia-Like) Overlap Syndrome`,l:'Keytruda label (Opdivo and Yervoy carry the same wording)',k:`[[FDAKeytruda2026]]`}],
  mech:`Releases immune brakes, so MG can start or flare. [[Sheikh2021]]`,
  ev:`Incidence 0.12% with nivolumab and 0.24% in another study. In 65 cases: median onset 4 weeks, 45% respiratory failure, 38% died (23% from MG); IVIG or PLEX first did better than steroids alone (95% vs 63%). The 2020 consensus: existing MG is not an absolute contraindication; avoiding anti-CTLA-4 plus anti-PD-1/PD-L1 combinations may be prudent. [[Suzuki2017,Sheikh2021,Safa2019,Narayanaswami2021]]`},
 {id:'ifn',n:'Interferons',al:'interferon alpha beta peginterferon pegylated',site:'imm',b:'case',sh:'possible',key:`[[Sheikh2021]]`,
  q:[],noq:`No interferon label was read for this checker.`,
  mech:`Immune effects (Sheikh's "induce MG" group). [[Sheikh2021]]`,
  ev:`Sheikh rates them "possible", not contraindicated, and rarely reported. Krenn cites cases of MG set off or worsened by interferon alpha, including pegylated interferon. [[Sheikh2021,Krenn2020]]`},
 {id:'tki',n:'Tyrosine kinase inhibitors',al:'imatinib tandutinib tki',site:'imm',b:'case',sh:'doubtful (probable with tandutinib)',key:`[[Sheikh2021]]`,
  q:[],noq:`No tyrosine kinase inhibitor label was read for this checker.`,
  mech:`Listed by Sheikh among drugs that induce MG through immune effects. [[Sheikh2021]]`,
  ev:`Sheikh rates the class "doubtful", but "probable" with tandutinib. [[Sheikh2021]]`},
 {id:'stat',n:'Statins',al:'atorvastatin rosuvastatin simvastatin pravastatin lipitor crestor cholesterol',site:'unk',b:'debated',sh:'probable',key:`[[Yan2026]]`,
  q:[],noq:`No statin label was read for this checker.`,
  mech:`Not stated in the sources read.`,
  ev:`New-onset MG was more likely in the first 6-12 months after starting (pooled IRR 2.66 for days 0-179, 1.41 for days 180-364, about 1.0 after a year), more so with high-intensity statins. Crisis risk was raised only in the first 30 days (IRR 3.60). Oculo-bulbar worsening 1 week to 4 months after starting is described. The French data suggest long-term mortality benefit likely outweighs the short-term MG risk. Sheikh: "probable". [[Yan2026,Yoo2026,Krenn2020,Sole2026,Sheikh2021]]`},
 {id:'cont',n:'Iodinated contrast (and gadolinium)',al:'contrast ct scan iodine iodinated gadolinium mri dye',site:'unk',b:'debated',sh:'no rating in the sources read',key:`[[Geenen2024]]`,
  q:[],noq:`Not a drug label question: the evidence comes from imaging studies and a radiology guideline.`,
  mech:`Not stated in the sources read.`,
  ev:`Pooled data: more symptoms after contrast in 6.1% (23/374) vs 3.5% (11/313) after unenhanced CT; the European guideline estimates a risk under 5% within 24 h and says gadolinium is safe. One study found more exacerbations within a day (6.3% vs 0.6%); another found delayed worsening in 12.3% but more likely from other causes, and says contrast should not be withheld if indicated. MGFA: newer agents appear safer, use cautiously. [[Geenen2024,Somashekar2013,Rath2017,MGFA2024]]`},
 {id:'ster',n:'Corticosteroids, at the start',al:'prednisone prednisolone methylprednisolone steroid steroids dexamethasone',site:'unk',b:'label',x:'with anticholinesterases; also a core MG treatment',sh:'25-75% early worsening',key:`[[FDAPrednisone2026]]`,
  q:[{t:`Concomitant use of anticholinesterase agents (e.g., neostigmine, pyridostigmine) and corticosteroids may produce severe weakness in patients with myasthenia gravis.`,l:'Prednisone tablets label',k:`[[FDAPrednisone2026]]`}],
  mech:`Not stated in the sources read. Steroids are also a core MG treatment.`,
  ev:`42% of 55 people given prednisone 40-80 mg worsened within 4 weeks; published rates range from 25% to 75%, mostly in the first 2 weeks. IVIG first: 2.2% worsened. The consensus suggests letting PLEX or IVIG act for several days before starting steroids in impending crisis. Doses are set by the treating clinician. [[Bae2006,Sheikh2021,DiezPorras2020,Sanders2016]]`},
 {id:'li',n:'Lithium',al:'lithium carbonate bipolar',site:'unk',b:'case',sh:'probable',key:`[[Sheikh2021]]`,
  q:[{t:`Lithium has been shown to increase the duration of neuromuscular block and decrease infusion requirements of neuromuscular blocking agents`,l:'Rocuronium label, drug interactions (not an MG statement)',k:`[[FDARocuronium2026]]`}],
  mech:`Not stated for MG in the sources read.`,
  ev:`Sheikh rates it "probable" but usable, because worsening is rarely reported. A case report describes recurrent acute myasthenia on lithium that resolved after stopping it, twice. [[Sheikh2021,Yao2025]]`},
 {id:'phen',n:'Phenytoin',al:'phenytoin dilantin epilepsy seizure',site:'unk',b:'case',sh:'single case',key:`[[Sheikh2021]]`,
  q:[],noq:`The phenytoin label read for this guide had no MG statement; no label key is cited for it.`,
  mech:`Not stated in the sources read.`,
  ev:`One case of MG on long-term phenytoin. The consensus names phenytoin as an alternative to magnesium for eclampsia in MG. [[Sheikh2021,Sanders2016]]`},
 {id:'peni',n:'Penicillins (amoxicillin)',al:'penicillin amoxicillin ampicillin augmentin',site:'unk',b:'case',sh:'probable, but rare',key:`[[Sheikh2021]]`,
  q:[],noq:`No penicillin label was read for this checker.`,
  mech:`Not stated in the sources read.`,
  ev:`Sheikh rates penicillins "probable", but worsening is rare. Amoxicillin was the comparator in one cohort: exacerbation followed 1.3% of courses. [[Sheikh2021,Uysal2025]]`},
 {id:'antipsy',n:'Antipsychotics',al:'antipsychotic haloperidol olanzapine quetiapine risperidone',site:'unk',b:'case',sh:'possible',key:`[[Sheikh2021]]`,
  q:[],noq:`No antipsychotic label was read for this checker.`,
  mech:`Not stated in the sources read.`,
  ev:`Sheikh rates them "possible". A UK charity advises caution rather than bans for neurology and psychiatry drugs. [[Sheikh2021,MyawareDrugs]]`},
 {id:'dfo',n:'Desferrioxamine',al:'deferoxamine desferal desferrioxamine iron chelation',site:'unk',b:'case',sh:'no rating in the sources read',key:`[[MGFA2024]]`,
  q:[],noq:`No desferrioxamine label was read for this checker.`,
  mech:`Not stated in the sources read.`,
  ev:`On the MGFA cautionary list; no further detail in the sources read. [[MGFA2024]]`},
 {id:'safeab',n:'Antibiotics listed as safe',al:'cephalosporin cefalexin cephalexin ceftriaxone cefuroxime sulfa trimethoprim sulfamethoxazole bactrim clindamycin tetracycline doxycycline nitrofurantoin polymyxin b',site:'none',b:'good',sh:'can be given safely',key:`[[Sheikh2021]]`,
  q:[],noq:`Not a label question.`,
  mech:`No effect on the junction reported in the review.`,
  ev:`Sheikh lists cephalosporins, sulfa drugs, clindamycin, tetracyclines, polymyxin B and nitrofurantoin as antibiotics that can be given safely in MG. [[Sheikh2021]]`}
];
inits.drugs=()=>{
  const svg=$('#drSvg'),rg=$('#drT');let sel='fq';
  const norm=x=>x.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const DRS=Object.fromEntries(DR.map(e=>[e.id,e]));
  /* ---------- the junction ---------- */
  function junction(ox,oy,W,site,a,t){
    const X=f=>ox+W*f,ZS=[.2,.4,.6,.8],u=(t*30)%1;
    const rel=lerp(1,site==='pre'?.3:site==='nmj'?.65:1,a);
    let o='';
    // axon + action potential
    o+=`<rect x="${f1(X(.45))}" y="${oy}" width="${f1(W*.1)}" height="30" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.5"/>`;
    if(u<.3)o+=`<circle cx="${f1(X(.5))}" cy="${f1(oy+4+26*u/.3)}" r="5" style="fill:var(--nerve)"/>`;
    o+=`<text x="${f1(X(.57))}" y="${oy+14}" class="t-sm">motor nerve</text>`;
    // terminal
    const tt=oy+28,tb=oy+140,x0=X(.06),x1=X(.94);
    o+=`<path d="M${f1(x0+30)} ${tt}H${f1(x1-30)}Q${f1(x1)} ${tt} ${f1(x1)} ${tt+30}V${tb}H${f1(x0)}V${tt+30}Q${f1(x0)} ${tt} ${f1(x0+30)} ${tt}Z" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.8"/>`;
    o+=`<text x="${f1(x0+12)}" y="${tt+18}" class="t-sm">nerve terminal</text>`;
    [.16,.3,.44,.58,.72,.86].forEach((f,i)=>{const y=tt+(i%2?62:44);o+=vesicle(X(f),y,11,.9,5)});
    // release at each active zone
    ZS.forEach((f,i)=>{const x=X(f),fire=u>.3&&u<.55&&(i/ZS.length)<rel+.01;
      if(fire){const q=(u-.3)/.25;o+=vesicle(x,tb-12+4*q,10,1-q*.6,5)}
      const n=Math.round(5*rel);
      if(u>.45&&u<.85)for(let k=0;k<n;k++){const q=ramp(u,.45,.8),dx=(k-(n-1)/2)*5;o+=achDot(x+dx*(1+q),lerp(tb+4,oy+176,q),2.6,1-ramp(u,.78,.85))}});
    o+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${tb}" y2="${tb}" style="stroke:var(--nerve);stroke-width:3"/>`;
    // cleft + muscle with folds
    const my=oy+190;
    let fp=`M${f1(X(.03))} ${my}`;
    [.3,.5,.7].forEach(f=>{fp+=`H${f1(X(f)-7)}V${my+40}H${f1(X(f)+7)}V${my}`});
    fp+=`H${f1(X(.97))}V${oy+300}H${f1(X(.03))}Z`;
    o+=`<path d="${fp}" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.8"/>`;
    o+=`<text x="${f1(X(.05))}" y="${oy+290}" class="t-sm">muscle fibre</text>`;
    o+=`<text x="${f1(X(.97))}" y="${tb+13}" class="t-xs t-end">synaptic cleft</text>`;
    // receptors on the crests: 3 per zone
    const open=u>.6&&u<.95;
    ZS.forEach((f,i)=>[-14,0,14].forEach((dx,j)=>{const x=X(f)+dx,y=my+2;
      const blocked=(site==='post'&&j!==1&&a>.3),ab=(site==='imm'&&j!==1&&a>.3);
      const op=open&&!blocked&&!ab&&(site!=='nmj'||j!==2||a<.3);
      o+=achr(x,y,10,op?1:0,1,blocked?'var(--muted)':'var(--achr)');
      if(blocked)o+=`<rect x="${f1(x-4.5)}" y="${f1(y-19)}" width="9" height="9" rx="2" style="fill:var(--drug);opacity:${f1(a)}"/>`;
      if(ab)o+=igg(x,y-20,6.5,Math.PI,a,'var(--ab)')}));
    // site highlights
    const hex=(x,y,r,op)=>{let p='';for(let k=0;k<6;k++){const g=k/6*Math.PI*2;p+=(k?'L':'M')+f1(x+r*Math.cos(g))+' '+f1(y+r*Math.sin(g))}return `<path d="${p}Z" style="fill:var(--drug);opacity:${f1(op)}"/>`};
    if(site==='pre'&&a>0){ZS.forEach(f=>{o+=hex(X(f)-10,tb-6,6,a)+hex(X(f)+10,tb-6,6,a)});
      o+=`<path d="M${f1(x0)} ${tb}H${f1(x1)}" style="stroke:var(--drug);stroke-width:6;opacity:${f1(.35*a)}"/>`}
    if(site==='nmj'&&a>0){o+=`<rect x="${f1(X(.04))}" y="${tb-22}" width="${f1(W*.92)}" height="${my-tb+40}" rx="14" style="fill:var(--warn-soft);opacity:${f1(.45*a)};stroke:var(--warn);stroke-width:2;stroke-dasharray:7 5"/>`;
      [.12,.3,.5,.7,.88].forEach((f,k)=>o+=hex(X(f),tb+20+(k%2)*10,5,a*.9));
      o+=`<rect x="${f1(X(.5)-116)}" y="${tb-41}" width="232" height="16" rx="8" style="fill:var(--panel);opacity:${f1(.9*a)}"/><text x="${f1(X(.5))}" y="${tb-29}" class="t-xs t-mid" style="fill:var(--warn);opacity:${f1(a)}">labels name the junction, not the side</text>`}
    if(site==='unk'&&a>0)[.15,.5,.85].forEach((f,k)=>o+=`<text x="${f1(X(f))}" y="${tb+(k%2?26:20)}" class="t-big t-mid" style="fill:var(--muted);opacity:${f1(a)}">?</text>`);
    // signal meter
    const resp=lerp(1,DR_RESP[site],a),gy=oy+318;
    o+=`<text x="${f1(X(.03))}" y="${gy-5}" class="t-xs">signal reaching the muscle (illustrative)</text>`;
    o+=`<rect x="${f1(X(.03))}" y="${gy}" width="${f1(W*.8)}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(X(.03))}" y="${gy}" width="${f1(W*.8*resp)}" height="12" rx="6" style="fill:${resp>.8?'var(--achr)':resp>.55?'var(--warn)':'var(--bad)'}"/><text x="${f1(X(.86))}" y="${gy+10}" class="t-sm">${Math.round(resp*100)}%</text>`;
    // immune strip
    const iy=oy+352,ia=site==='imm'?a:0;
    o+=`<rect x="${f1(X(.03))}" y="${iy}" width="${f1(W*.94)}" height="54" rx="12" style="fill:${ia>.1?'var(--ab-soft)':'var(--panel-2)'};stroke:${ia>.1?'var(--ab)':'var(--line)'};opacity:${f1(.45+.55*Math.max(ia,.2))}"/>`;
    o+=`<text x="${f1(X(.05))}" y="${iy+15}" class="t-xs">immune system</text>`;
    const cell=(x,lab,r)=>`<circle cx="${f1(x)}" cy="${iy+33}" r="${r}" style="fill:var(--panel);stroke:${ia>.1?'var(--ab)':'var(--muted)'};stroke-width:1.5"/><text x="${f1(x)}" y="${iy+37}" class="t-xs t-mid">${lab}</text>`;
    o+=cell(X(.1),'T',11)+cell(X(.22),'B',11)+`<path d="M${f1(X(.26))} ${iy+33}H${f1(X(.31))}" class="arrow"/>`+cell(X(.37),'plasma',20);
    if(ia>.1)for(let k=0;k<4;k++){const q=((t*8)+k/4)%1;o+=igg(lerp(X(.45),X(.9),q),iy+34-8*Math.sin(q*Math.PI),6,Math.PI/2,ia,'var(--ab)')}
    else o+=`<text x="${f1(X(.45))}" y="${iy+37}" class="t-xs">quiet in this phase</text>`;
    return o;
  }
  function legend(lx,ly,lw,site,N){let o='',y=ly;
    o+=`<text x="${lx}" y="${y}" class="t-sm">SITES IN THE SOURCES</text>`;y+=20;
    Object.keys(DR_SITES).forEach(k=>{const S=DR_SITES[k],on=k===site;
      o+=`<rect x="${lx-6}" y="${y-14}" width="${lw}" height="${22+S.lines.length*12}" rx="8" style="fill:${on?'var(--panel)':'none'};stroke:${on?S.c:'none'};stroke-width:1.5"/>`;
      o+=`<circle cx="${lx+4}" cy="${y-4}" r="5" style="fill:${on?S.c:'var(--panel-2)'};stroke:${S.c}"/><text x="${lx+16}" y="${y}" class="t-lbl" style="${on?'':'fill:var(--muted)'}">${S.n}</text>`;
      S.lines.forEach((l,i)=>{o+=`<text x="${lx+16}" y="${y+13+i*12}" class="t-xs">${l}</text>`});
      y+=24+S.lines.length*12});
    const E=DRS[sel];y+=4;
    o+=`<rect x="${lx-6}" y="${y}" width="${lw}" height="72" rx="10" style="fill:var(--panel);stroke:${DR_BCOL[E.b]};stroke-width:2"/>`;
    o+=`<text x="${lx+4}" y="${y+17}" class="t-xs">checker selection</text><text x="${lx+4}" y="${y+34}" class="t-lbl">${E.n.length>34?E.n.slice(0,33)+'…':E.n}</text>`;
    o+=`<text x="${lx+4}" y="${y+50}" class="t-xs" style="fill:${DR_BCOL[E.b]};font-weight:600">${DR_BADGE[E.b].toUpperCase()}</text><text x="${lx+4}" y="${y+64}" class="t-xs">site: ${DR_SITES[E.site].n.split(':')[0].toLowerCase()}</text>`;
    return o}
  function draw(t){
    const N=vb(svg,'720 440','400 810');
    const p=phaseOf(DR_STEPS,t),P=DR_STEPS[p],a=p?ramp(t,P.from,P.from+.05):0;
    let s=`<rect x="0" y="0" width="${N?400:720}" height="${N?810:440}" style="fill:var(--field)"/>`;
    s+=N?junction(10,14,380,P.site,a,t):junction(14,14,420,P.site,a,t);
    s+=N?legend(22,458,366,P.site,N):legend(466,26,248,P.site,N);
    svg.innerHTML=s;setSt(p);
    $('#drNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#drPlay'),draw,22000,'Replay','drugs');
  const setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);

  /* ---------- checker ---------- */
  const q=$('#drQ'),hits=$('#drHits'),card=$('#drCard');
  const badge=(b,x)=>`<span class="dr-b ${b}">${DR_BADGE[b]}</span>${x?` <span class="dr-b case">${x}</span>`:''}`;
  function drShow(id,jump){sel=id;const E=DRS[id];
    $$('[data-dr]',hits).forEach(b=>b.setAttribute('aria-pressed',b.dataset.dr===id));
    const qs=E.q.length?E.q.map(z=>`<blockquote class="dr-q"><span>"${z.t}"</span><cite>${z.l} ${z.k}</cite></blockquote>`).join(''):`<p class="dr-q none">${E.noq||'No label wording is quoted for this entry.'}</p>`;
    card.innerHTML=`<div class="kicker">Checker</div><h4>${E.n}</h4><div>${badge(E.b,E.x)}</div><p class="dr-al">Also matches: ${E.al.split(' ').slice(0,8).join(', ')}</p>
      <div class="dr-sec">What the label says</div>${qs}
      <div class="dr-sec">Where it acts</div><p>${DR_SITES[E.site].n}. ${E.mech}</p>
      <div class="dr-sec">Evidence</div><p>${E.ev}</p>
      <div class="dr-sec">How guidance frames it</div><p>The MGFA list says listed associations "do not necessarily mean" a drug should not be prescribed, and some drugs may be necessary; the 2021 review's rating or summary for this entry is <b>${E.sh}</b>. Whether to use it, and how closely to monitor, is decided by the prescriber. [[MGFA2024,Sheikh2021]]</p>`;
    if(jump){const i=DR_STEPS.findIndex(z=>z.site===E.site);stop();rg.value=DR_STEPS[i].at;draw(DR_STEPS[i].at)}else draw(+rg.value);
    try{store.set('drSel',id)}catch(e){}
  }
  function filt(){const v=norm(q.value);const list=DR.filter(e=>!v||norm(e.n+' '+e.al).includes(v)||v.split(' ').every(w=>norm(e.n+' '+e.al).includes(w)));
    hits.innerHTML=list.map(e=>`<button class="btn" data-dr="${e.id}" aria-pressed="${e.id===sel}"><i style="background:${DR_BCOL[e.b]}"></i>${e.n}</button>`).join('');
    $('#drCount').innerHTML=list.length?`${list.length} of ${DR.length} entries`:`No entry matches "${q.value.replace(/[<>&"]/g,'')}". Not being in this checker does not mean a drug is safe or unsafe; the MGFA list and the prescriber's review are the references. [[MGFA2024]]`;
    if(list.length===1&&list[0].id!==sel)drShow(list[0].id,true)}
  hits.addEventListener('click',e=>{const b=e.target.closest('[data-dr]');if(b)drShow(b.dataset.dr,true)});
  q.addEventListener('input',filt);
  // table
  $('#drTbl').innerHTML=DR.map(e=>`<tr><th>${e.n}</th><td><span class="dr-b ${e.b}">${DR_BADGE[e.b]}</span></td><td>${DR_SITES[e.site].n}</td><td>${e.sh}</td><td>${e.key}</td></tr>`).join('');
  let st0='fq';try{const v=store.get('drSel','fq');if(DRS[v])st0=v}catch(e){}
  sel=st0;filt();drShow(st0,false);
};
