/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · The condition",2:"Part 2 · Recognising & diagnosing",3:"Part 3 · Medication",4:"Part 4 · Behavioural & psychological care",5:"Part 5 · Living with ADHD",6:"Part 6 · History"};
/* [part, question, answer]: every answer cited; doses and criteria quoted as published, never as instructions */
const RV_FC=[
 [1,`About how many children and adolescents worldwide have ADHD?`,`About 5 in 100: the pooled prevalence across 102 studies (171,756 people aged 18 or under) was 5.29% [[Polanczyk2007]].`],
 [1,`Why do prevalence estimates for ADHD differ so much between studies?`,`Mainly method: the diagnostic criteria, who reports the symptoms and whether impairment is required. Geography and year of study did not explain the variation [[Polanczyk2014]].`],
 [1,`How common is ADHD in adults worldwide?`,`2.58% have persistent adult ADHD (with childhood onset) and 6.76% symptomatic adult ADHD, regardless of childhood onset [[Song2021]]. The WHO World Mental Health surveys found 2.8% [[Fayyad2017]].`],
 [1,`What is the relative-age effect?`,`The youngest children in a school year are more likely to be diagnosed (RR 1.38) and medicated (RR 1.28); the effect appears in teacher ratings but not in parent ratings [[Frisira2025]].`],
 [1,`What is the mean twin heritability of ADHD?`,`74% across 37 twin studies [[Faraone2019]]. Heritability describes differences between people in a population, not how much of one person's ADHD is "caused by genes" [[Faraone2021,Thapar2013]].`],
 [1,`How much higher is ADHD risk in a full sibling of someone with ADHD?`,`HR 8.27 in Swedish registers, against 70.45 for an identical co-twin and 2.24 for a full cousin [[Chen2017JCPP]].`],
 [1,`What did the first ADHD genome-wide association study find?`,`12 genome-wide-significant loci in 20,183 people with ADHD and 35,191 controls, each with a small odds ratio (1.077–1.198) [[Demontis2019]]. The 2023 study found 27 loci [[Demontis2023]].`],
 [1,`Can a polygenic score diagnose ADHD?`,`No. Polygenic scores explain about 3.6–5.5% of variance in ADHD [[Li2021PGS,Demontis2019]]; known genetic risks "cannot be used for prediction, genetic testing or diagnostic purposes" [[Thapar2013]].`],
 [1,`What happens to the prenatal-smoking link with ADHD in sibling comparisons?`,`It disappears: Swedish HRs of about 1.9–2.5 at population level fell to 0.88 and 0.84 between siblings, pointing to familial confounding [[Skoglund2014,Obel2016]].`],
 [1,`What do sibling studies show about acetaminophen (paracetamol) in pregnancy and ADHD?`,`In 2.48 million Swedish children the population HR of 1.07 fell to 0.98 in full siblings [[Ahlqvist2024]]; some reviews still advise precaution [[Bauer2021,Prada2025]].`],
 [1,`Does sugar cause hyperactivity?`,`No: 23 double-blind placebo-controlled challenge studies found no effect on behaviour or cognition [[Wolraich1995]]. Mothers told their son had sugar rated him as more hyperactive even after placebo [[Hoover1994]].`],
 [1,`Is ADHD caused by parenting style?`,`No. Twin, adoption and family studies show that ADHD runs in biological families and shared family environment adds little; a child's behaviour can also shape parenting [[Larsson2014,Sprich2000,Harold2013]].`],
 [1,`How large are the subcortical volume differences in the ENIGMA-ADHD mega-analysis?`,`Small: d from −0.19 (amygdala) to −0.11 (caudate, hippocampus); none in pallidum or thalamus, and not significant in adults [[Hoogman2017]].`],
 [1,`What did Shaw 2007 find about cortical maturation in ADHD?`,`Half of cortical points reached peak thickness at 10.5 years against 7.5 years in controls, a delay of about 3 years, most marked in prefrontal cortex; the order of maturation was the same [[Shaw2007]].`],
 [1,`What is the inverted-U?`,`Too little catecholamine (fatigue, boredom) or too much (stress) impairs prefrontal function; moderate levels are best (Established in animal studies) [[Arnsten2009CNS,Gamo2010]].`],
 [1,`How big are executive function differences in ADHD?`,`Medium (effect sizes 0.46–0.69), strongest for response inhibition, vigilance, working memory and planning; deficits are "neither necessary nor sufficient" for ADHD [[Willcutt2005]].`],
 [2,`Which ADHD presentation is most common in the community, and which in clinics?`,`Predominantly inattentive in the community; combined in clinic-referred children [[Willcutt2012]].`],
 [2,`Which symptoms fade faster with age?`,`Hyperactivity and impulsivity decline faster than inattention [[Biederman2000Decline]], so many children diagnosed with the combined presentation later shift to predominantly inattentive [[Epstein2013]].`],
 [2,`How often does childhood ADHD persist to age 25?`,`About 15% still meet full criteria; about 65% do when partial remission is included [[Faraone2006]].`],
 [2,`How common is emotional dysregulation in ADHD?`,`About 25–45% of children and 30–70% of adults with ADHD. It is not part of the DSM criteria [[Shaw2014Emotion]].`],
 [2,`Why can ADHD be missed in girls and women?`,`More inattentive and internalising symptoms, compensatory strategies that mask impairment, and co-occurring anxiety or depression that can lead to a missed diagnosis or misdiagnosis [[Hinshaw2022,Quinn2014,Young2020Females]].`],
 [2,`How many symptoms does DSM-5-TR list for ADHD?`,`18: 9 inattentive (Criterion A1) and 9 hyperactive-impulsive (Criterion A2) [[APA2022DSM]].`],
 [2,`What is the DSM-5-TR symptom threshold?`,`6 or more symptoms in a domain up to age 16; 5 or more at age 17 and older; present for at least 6 months [[APA2022DSM,Posner2020]].`],
 [2,`What do DSM-5-TR Criteria B to E require?`,`B: several symptoms before age 12. C: several symptoms in two or more settings. D: clear interference with functioning. E: not better explained by another mental disorder [[APA2022DSM]].`],
 [2,`What changed in the onset criterion from DSM-IV to DSM-5?`,`From impairing symptoms before age 7 to several symptoms before age 12 [[Epstein2013]]. In a British cohort this raised prevalence at 12 by only 0.1% [[Polanczyk2010AgeOnset]].`],
 [2,`Can ADHD and autism be diagnosed together?`,`Yes, since DSM-5 removed autism as an exclusion [[Epstein2013,Reiersen2008]]. About 28% of autistic people have co-occurring ADHD [[Lai2019Autism]].`],
 [2,`From what age does the AAP recommend evaluating for ADHD?`,`From age 4 to the 18th birthday, for academic or behavioural problems with inattention, hyperactivity or impulsivity (grade B, strong recommendation) [[Wolraich2019]].`],
 [2,`What did the 6-question ASRS v1.1 screener achieve in its validation sample?`,`Sensitivity 68.7%, specificity 99.5%, accuracy 97.9% against blind clinical interviews [[Kessler2005]]. It is a teaching and case-finding tool, not a diagnosis.`],
 [2,`Why does a positive screen mean less in the community than in a clinic?`,`Positive predictive value depends on prevalence: the ASRS-5 PPV was 67.3% at 8.2% prevalence and 82.8% in a clinic where 57.7% had ADHD [[Ustun2017]].`],
 [2,`What share of people in substance use disorder treatment have ADHD?`,`About 1 in 4: 23.1% across 29 studies [[vanEmmerikvanOortmerssen2012]].`],
 [2,`How is bipolar disorder told apart from ADHD?`,`Bipolar disorder is episodic, with increased activity tied to elevated mood; ADHD is a persistent, trait-like pattern from childhood [[APA2022DSM]].`],
 [2,`How much later are females diagnosed with ADHD than males in Sweden?`,`About 4 years: mean 23.5 against 19.6 years [[Skoglund2024]].`],
 [3,`How does methylphenidate act at the synapse?`,`The labels state it "blocks the reuptake of norepinephrine and dopamine into the presynaptic neuron" [[FDA-RitalinC,FDA-Concerta]]. Its DAT ED50 is 0.25 mg/kg and NET ED50 0.14 mg/kg [[Volkow1998,Hannestad2010]].`],
 [3,`How does amphetamine differ from methylphenidate?`,`Amphetamine is a transporter substrate that releases catecholamines by redistributing them from vesicles (VMAT2) and reversing transporters [[Sulzer2005,Sitte2015]]; methylphenidate mainly blocks DAT and NET [[Volkow1998,Hannestad2010]].`],
 [3,`Where is lisdexamfetamine activated?`,`In blood, by red blood cell hydrolysis to dextroamphetamine and l-lysine; it is not metabolised by cytochrome P450 [[FDA-Vyvanse]].`],
 [3,`Why does oral use differ from snorting or injecting a stimulant?`,`Reinforcing effects follow large, fast dopamine rises; therapeutic effects follow slow, steady rises (Hypothesis) [[Volkow2003MPH,Swanson2003MPH]]. Labels warn of higher risk by routes "such as snorting or injection" [[FDA-RitalinC,FDA-AdderallXR]].`],
 [3,`What boxed warning do all US stimulant labels carry?`,`"Abuse, misuse, and addiction": the drug "has a high potential for abuse and misuse", and risk rises with higher doses or routes "such as snorting or injection" [[FDA-Concerta,FDA-Vyvanse,FDA-AdderallXR]].`],
 [3,`Which ADHD medicines carry a boxed warning on suicidal thoughts and behaviours?`,`The non-stimulants atomoxetine (Strattera) and viloxazine (Qelbree) [[FDA-Strattera,FDA-Qelbree]].`],
 [3,`Which ADHD medicines are not controlled substances?`,`Atomoxetine and guanfacine ER; the Intuniv label says guanfacine ER "has no known potential for abuse or dependence" [[FDA-Strattera,FDA-Intuniv]]. Stimulants are Schedule II [[FDA-Concerta,FDA-Vyvanse]].`],
 [3,`What contraindication do stimulants, atomoxetine and viloxazine share?`,`Use with a monoamine oxidase inhibitor, or within 14 days of stopping one, because of the risk of hypertensive crisis [[FDA-Concerta,FDA-Strattera,FDA-Qelbree]].`],
 [3,`How does CYP2D6 status change atomoxetine?`,`Half-life is 5.2 h in normal metabolisers and 21.6 h in poor metabolisers, with 3.3-fold accumulation [[FDA-Strattera]].`],
 [3,`How fast do stimulants and atomoxetine start working?`,`Stimulants act from the first dose; lisdexamfetamine separated from placebo from week 1 [[Adler2008LDX]]. Atomoxetine may start within 1–2 weeks and keeps improving for months [[Clemow2015]].`],
 [3,`Why must guanfacine ER and clonidine ER be tapered?`,`Abrupt stopping can cause rebound hypertension; the Intuniv label states tapering by no more than 1 mg every 3 to 7 days [[FDA-Intuniv,FDA-ClonidineER]].`],
 [3,`What did the Cortese 2018 network meta-analysis conclude?`,`The evidence "supports methylphenidate in children and adolescents, and amphetamines in adults, as preferred first-choice medications" for short-term treatment [[Cortese2018]].`],
 [3,`What does NICE NG87 offer first for adults and for children aged 5 and over?`,`Adults: lisdexamfetamine or methylphenidate. Children 5 and over: methylphenidate [[NICE2018E]].`],
 [3,`Do stimulants cause tics?`,`In 22 RCTs, new or worsening tics occurred as often on stimulants (5.7%) as on placebo (6.5%), RR 0.99 [[Cohen2015Tics]].`],
 [3,`Which stimulant class carries the higher psychosis risk in young people?`,`Amphetamine: 0.21% vs 0.10% on methylphenidate (HR 1.65) in 13–25-year-olds [[Moran2019NEJM]].`],
 [3,`How common is stimulant misuse among college students, and does it improve grades?`,`About 17% [[Benson2015]]; there is "little evidence" that non-medical use improves academic performance in people without ADHD [[Faraone2020NMU]].`],
 [4,`What is behavioural parent training?`,`Teaching parents techniques that change what happens before a behaviour (antecedents, such as how instructions are given) and that reinforce wanted behaviour [[Dekkers2022]]. It is classed as "well-established" [[Evans2014]].`],
 [4,`Why does blinding matter when judging parent training?`,`On blinded measures it still improves parenting and conduct problems, but its effect on core ADHD symptoms is no longer significant [[Daley2014,SonugaBarke2013]].`],
 [4,`What does the AAP recommend first for preschool children with ADHD?`,`Parent training in behaviour management and/or behavioural classroom interventions (grade A); methylphenidate "may be considered" if these are not enough and moderate-to-severe disturbance continues [[Wolraich2019]].`],
 [4,`What does NICE NG87 offer first for children under 5?`,`An ADHD-focused group parent-training programme; medication under 5 needs a second specialist opinion [[NICE2018F]].`],
 [4,`What is a daily report card?`,`The teacher rates a few individual behaviour goals each day, set up with parents [[Pyle2017,Fabiano2010DRC]]. It was the only school intervention educators consistently viewed positively [[Richardson2015]].`],
 [4,`What did organisational skills training achieve?`,`60% of trained children no longer met criteria for organisational impairment, against 3% of wait-list controls [[Abikoff2013]].`],
 [4,`What were the four arms of the MTA trial?`,`579 children aged 7–9.9 randomised for 14 months to medication management, intensive behavioural treatment, the two combined, or community care [[MTA1999]].`],
 [4,`What were the MTA 14-month "success" rates?`,`Combined 68%, medication management 56%, behavioural 34%, community care 25% [[Swanson2001MTA]].`],
 [4,`What happened to MTA group differences by 36 months?`,`They were no longer significant on any measure [[Jensen2007MTA]], and at 6–8 years the 3-year symptom trajectory, not the assigned treatment, predicted outcomes [[Molina2009]].`],
 [4,`What did the SMART sequencing trial find?`,`Starting with low-intensity behavioural treatment led to fewer classroom rule violations (8.4 vs 12.6 per hour) and cost less ($961 vs $1,669) than starting with medication [[Pelham2016,Page2016]].`],
 [4,`How did adult CBT compare with an attention-matched control?`,`In medication-treated adults, responders were 67% vs 33% (Safren 2010), with gains held at 12 months [[Safren2010]].`],
 [4,`Does neurofeedback reduce ADHD symptoms on blinded ratings?`,`No: probably blinded SMD 0.04 (38 RCTs) [[Westwood2025]], and a double-blind sham-controlled trial was negative [[NFCG2021]].`],
 [4,`Does working-memory training transfer to ADHD symptoms?`,`It improves laboratory working-memory tests but not blinded ADHD symptoms or academic results [[Cortese2015]].`],
 [5,`How much higher is mortality in people with ADHD in the Danish cohort, and from what?`,`Mortality rate ratio 2.07 (5.85 vs 2.21 per 10,000 person-years), mostly from accidents [[Dalsgaard2015]]. These are population statistics, not individual predictions.`],
 [5,`What is the relative crash risk for drivers with ADHD?`,`About 1.36, or 1.23 after controlling for driving exposure; higher risk was tied to co-occurring ODD or conduct disorder [[Vaa2014]].`],
 [5,`How were convictions different during ADHD medication periods in Sweden?`,`32% lower in men and 41% lower in women, comparing the same people's medicated and unmedicated periods [[Lichtenstein2012]].`],
 [5,`Why do within-person designs matter?`,`They compare the same person on and off medication. For suicidal events the naive HR of 1.31 became 0.89 within person [[Chen2014BMJ]]. They remain observational, not causal [[Kozhevnikova2026]].`],
 [5,`Does ADHD medication in childhood raise later substance use in the MTA?`,`No: neither randomised treatment nor cumulative stimulant use was associated with adolescent substance use, in either direction [[Molina2013]].`],
 [5,`What did a Swedish target-trial emulation find about starting medication?`,`Lower 2-year all-cause mortality (HR 0.79), driven by unnatural-cause deaths (HR 0.75) [[Li2024JAMA]].`],
 [5,`What is centanafadine?`,`A noradrenaline, dopamine and serotonin reuptake inhibitor with small effect sizes (0.24–0.40) in adult phase 3 trials [[Adler2022]], approved by the FDA as Simtriyo in July 2026 [[FDA-Simtriyo]].`],
 [5,`What are EndeavorRx and Monarch eTNS?`,`EndeavorRx is a video-game-like digital therapeutic (FDA De Novo 2020) [[FDA-EndeavorRx,Kollins2020]]; Monarch eTNS is a forehead nerve stimulator (2019) [[FDA-MonarchETNS]]. Both are Early evidence.`],
 [5,`Is there high-certainty long-term evidence for any ADHD treatment?`,`No: an umbrella review of 221 meta-analyses found "no high certainty, long term evidence" at 52 weeks [[Gosling2025]].`],
 [5,`Is an ECG needed before starting stimulants, atomoxetine or guanfacine under NICE NG87?`,`Not routinely: NICE states it "is not needed" unless a cardiac risk feature is present or another medicine raises cardiac risk [[NICE2018H]].`],
 [5,`Which family history prompts a cardiology opinion before ADHD medication (NICE)?`,`Sudden death in a first-degree relative under 40 years suggesting cardiac disease, among other features such as fainting on exertion or a murmur [[NICE2018H]].`],
 [5,`How often does NICE measure height, weight and vital signs on ADHD medication?`,`Height every 6 months in children and young people; weight every 3 months at age 10 and under; pulse and blood pressure before and after each dose change and every 6 months [[NICE2018H]].`],
 [5,`What vital-sign findings prompt dose reduction and referral under NICE?`,`On 2 occasions: sustained resting heart rate above 120 per minute, arrhythmia, or systolic blood pressure above the 95th percentile [[NICE2018H]].`],
 [5,`What does the Strattera label say about a missed dose?`,`Take it as soon as possible, but "do not take more than the prescribed total daily amount" in any 24-hour period [[FDA-Strattera]].`],
 [5,`What did a brief sleep intervention achieve in children with ADHD?`,`Two sessions of sleep hygiene and behavioural strategies cut moderate to severe sleep problems from 56% to 30% (NNT 3.9) and eased ADHD symptoms [[Hiscock2015]].`],
 [5,`How often did UK young people on ADHD medication make an optimal transition to adult care?`,`Only 6%; 64% had a referral accepted but 22% attended a first adult appointment [[Eke2020]].`],
 [5,`What do large registers show about ADHD medication in pregnancy and child development?`,`No increase in neurodevelopmental disorders (pooled HR 1.00) [[BangMadsen2025]]; about 60% of Danish women stopped or paused medication around pregnancy [[BangMadsen2024]].`],
 [5,`How does NICE describe the reason for offering parent training?`,`It "does not imply bad parenting"; it meets the "above-average parenting needs" of children with ADHD [[NICE2018H]].`],
 [6,`What is the earliest known description of attention deficits?`,`Melchior Adam Weikard's German medical textbook of 1775 [[Barkley2012Weikard,Faraone2021]].`],
 [6,`Who described "mental restlessness" in 1798?`,`Sir Alexander Crichton, a Scottish physician. He noted it could be present from birth and generally diminished with age [[Lange2010,Palmer2001]].`],
 [6,`What did George Still describe in 1902?`,`In his Goulstonian Lectures, 20 children with a "defect of moral control" without intellectual impairment: 15 boys and 5 girls [[Still1902,Lange2010]].`],
 [6,`What did Charles Bradley notice in 1937?`,`Benzedrine (an amphetamine) given to children at the Bradley Home improved behaviour and school performance [[Strohl2011,Bradley1937]]. The finding was largely ignored for about 25 years [[Strohl2011]].`],
 [6,`What was ADHD called in DSM-II, DSM-III and DSM-III-R?`,`"Hyperkinetic Reaction of Childhood" (1968), "Attention Deficit Disorder (with or without hyperactivity)" (1980) and "Attention-deficit Hyperactivity Disorder" (1987) [[Lange2010]].`],
 [6,`When was methylphenidate synthesised, and when was Ritalin first approved in the US?`,`Synthesised by Leandro Panizzon in 1944 and marketed by Ciba as Ritalin in 1954 [[Lange2010]]. Drugs@FDA dates Ritalin's original US approval to 5 December 1955 [[FDA-Ritalin]].`],
 [6,`What is ADHD's ICD-11 code?`,`6A05: 6A05.0 predominantly inattentive, 6A05.1 predominantly hyperactive-impulsive, 6A05.2 combined (ICD-10 used F90) [[TebartzVanElst2025]].`]
];
/* [mnemonic, 'well known' | 'memory aid', what it holds] */
const RV_MN=[
 ["9 + 9, then 6 or 5","memory aid",`DSM-5-TR lists 9 inattentive and 9 hyperactive-impulsive symptoms. A domain counts with 6 or more up to age 16, and 5 or more at 17 and older [[APA2022DSM,Posner2020]].`],
 ["12 · 2 · 6","memory aid",`Several symptoms before age 12 (Criterion B), in 2 or more settings (Criterion C), lasting at least 6 months [[APA2022DSM]].`],
 ["Methylphenidate blocks, amphetamine releases","memory aid",`Methylphenidate blocks reuptake at DAT and NET [[FDA-RitalinC,Volkow1998]]; amphetamine, a transporter substrate, also empties vesicles via VMAT2 and runs the transporters in reverse [[Sulzer2005,Sitte2015]].`],
 ["Red cells unlock lisdexamfetamine","memory aid",`Lisdexamfetamine is a prodrug: red blood cells split it into dextroamphetamine and l-lysine, and CYP450 is not involved [[FDA-Vyvanse]].`],
 ["Not too little, not too much","memory aid",`The inverted-U: prefrontal function is best at moderate catecholamine levels and worse with fatigue (too little) or stress (too much) [[Arnsten2009CNS,Gamo2010]].`],
 ["Stimulants: misuse box. Atomoxetine and viloxazine: mood box.","memory aid",`Stimulant labels carry a boxed warning on abuse, misuse and addiction; atomoxetine and viloxazine carry one on suicidal thoughts and behaviours [[FDA-Concerta,FDA-Strattera,FDA-Qelbree]].`],
 ["14 days clear of an MAOI","memory aid",`Stimulants, atomoxetine and viloxazine are contraindicated with a monoamine oxidase inhibitor or within 14 days of stopping one: risk of hypertensive crisis [[FDA-Concerta,FDA-Strattera,FDA-Qelbree]].`],
 ["Alphas step down slowly","memory aid",`The labels state guanfacine ER is tapered by no more than 1 mg every 3 to 7 days, and clonidine ER by no more than 0.1 mg every 3 to 7 days, to avoid rebound hypertension [[FDA-Intuniv,FDA-ClonidineER]].`],
 ["6 · 3 · 6, then 120 or 95","memory aid",`NICE as published: height every 6 months, weight every 3 months at age 10 and under, pulse and blood pressure every 6 months and after dose changes; review if resting heart rate stays above 120 or systolic pressure above the 95th percentile [[NICE2018H]].`],
 ["68 · 56 · 34 · 25","memory aid",`MTA "success" rates at 14 months: combined 68%, medication management 56%, behavioural treatment 34%, community care 25% [[Swanson2001MTA]].`]
];
const RV_A1=['careless mistakes','sustaining attention','seems not to listen','does not finish tasks','organising tasks','avoids mental effort','loses things','easily distracted','forgetful'];
const RV_A2=['fidgets, taps, squirms','leaves seat','runs, climbs / restless','not quiet at play','"on the go"','talks excessively','blurts out answers','trouble waiting turn','interrupts, intrudes'];
const RV_ON1=[1,1,1,1,1,0,1,1,0],RV_ON2=[1,1,0,0,1,1,1,0,1];
const RV_STEPS=[
 {from:0,at:.17,k:'18 · symptoms',t:'Nine plus nine',txt:`DSM-5-TR lists 9 inattentive symptoms (Criterion A1) and 9 hyperactive-impulsive symptoms (A2). Each must occur "often", for at least 6 months, beyond what is expected for developmental level [[APA2022DSM]]. This illustrative 9-year-old has 7 inattentive and 6 hyperactive-impulsive symptoms.`,pt:'There are two lists of nine signs: one about attention, one about restlessness and acting without thinking.',hook:'18 symptoms: 9 inattentive (A1) and 9 hyperactive-impulsive (A2) [[APA2022DSM]].'},
 {from:.22,at:.4,k:'6 or 5 · threshold',t:'Six to age 16, five from 17',txt:`Up to age 16, a domain needs 6 or more symptoms; at 17 and older, 5 or more [[APA2022DSM,Posner2020]]. DSM-5 lowered the threshold because 6 of 9 missed impaired adolescents and adults [[Epstein2013]]. Hyperactivity eases faster with age than inattention [[Biederman2000Decline]], so one restless symptom fades here, but 5 still meets the threshold at 19.`,pt:'Children need six signs in a list; older teenagers and adults need five, because restlessness often becomes quieter with age.',hook:'DSM-5: 6 or more per domain to age 16, 5 or more at 17 and older [[Epstein2013]].'},
 {from:.45,at:.58,k:'12 · onset',t:'Several symptoms before 12',txt:`Several symptoms must have been present before age 12 (Criterion B). DSM-IV required impairing symptoms before age 7 [[APA2022DSM,Epstein2013]]. For adults, school records or someone who knew the person well as a child help establish this [[Young2020Females]].`,pt:'The signs need to have started in childhood, before age 12. Old school reports can help show this.',hook:'Onset: several symptoms before 12; DSM-IV required impairment before 7 [[Epstein2013]].'},
 {from:.62,at:.76,k:'2 · settings',t:'Two or more settings',txt:`Several symptoms must be present in two or more settings, such as home and school or work (Criterion C) [[APA2022DSM]]. DSM-5 changed this from impairment to symptoms across settings [[Epstein2013]]. Parent and teacher ratings often differ, and each adds valid information [[Narad2015]].`,pt:'The signs show up in more than one place, for example at home and at school or work.',hook:'Criterion C asks for symptoms, not impairment, in two or more settings [[Epstein2013]].'},
 {from:.8,at:.97,k:'D, E · presentation',t:'Impairment, and nothing explains it better',txt:`Symptoms must clearly interfere with, or reduce the quality of, functioning (D) and not be better explained by another mental disorder (E) [[APA2022DSM]]. With A1 and A2 both met, the presentation is combined [[APA2022DSM]]. Only a licensed clinician can diagnose ADHD; rating scales alone cannot [[Faraone2021]].`,pt:'The signs must make daily life harder, and a clinician checks that something else, such as poor sleep or anxiety, does not explain them better.',hook:'Combined = A1 and A2 met; predominantly inattentive = A1 only; predominantly hyperactive-impulsive = A2 only [[APA2022DSM]].'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=RV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=RV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=RV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag ${m[1]==='well known'?'good':'accent'}">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: 9 + 9, then 6 or 5; 12 · 2 · 6 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const tick=(x,y,c,op)=>`<path d="M${x-6} ${y} L${x-1} ${y+5} L${x+7} ${y-6}" style="fill:none;stroke:var(${c});stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`;
  function draw(t){
    const N=vb(svg,'720 380','400 690');
    const age=lerp(9,19,ease(ramp(t,.24,.38)));
    const thr=lerp(6,5,ramp(age,16.4,17)),thrN=age>=17?5:6;
    const lit=ramp(t,.1,.17),fade=ramp(t,.29,.35);
    const on1=RV_ON1.map(v=>v*lit),on2=RV_ON2.map((v,k)=>v*lit*(k===1?1-fade:1));
    const n1=on1.filter(v=>v>.5).length,n2=on2.filter(v=>v>.5).length;
    const ons=ramp(t,.46,.53),flag=ramp(t,.5,.57),set=ramp(t,.63,.72),dE=ramp(t,.81,.9);
    const met=[t>.17,t>.4,t>.58,t>.76,t>.94];
    /* ---- the two symptom lists ---- */
    const CW=N?190:170,L={x:N?6:10,y:6};
    let s=`<g transform="translate(${L.x} ${L.y})">`;
    [[RV_A1,on1,n1,'--dx','Inattention · A1'],[RV_A2,on2,n2,'--dz','Hyperactive-impulsive · A2']].forEach(([lab,on,n,c,h],col)=>{
      const x=col*(CW+6);
      s+=`<text class="t-lbl" x="${x}" y="16" style="fill:var(${c})">${h}</text>`;
      lab.forEach((nm,k)=>{const y=40+k*24,ap=ramp(t,.005+(col*9+k)*.0055,.03+(col*9+k)*.0055);
        s+=`<g style="opacity:${f1(ap)}"><circle cx="${x+8}" cy="${y}" r="7" style="fill:var(--field);stroke:var(${c});stroke-width:1.5"/>`;
        if(on[k]>0)s+=`<circle cx="${x+8}" cy="${y}" r="7" style="fill:var(${c});opacity:${f1(on[k])}"/>`;
        s+=`<text class="t-sm" x="${x+21}" y="${y+4}" style="${on[k]>.5?'fill:var(--ink)':''}">${nm}</text></g>`});
      /* count bar with the threshold line */
      const by=262,cw=(CW-14)/9;
      for(let k=0;k<9;k++)s+=`<rect x="${f1(x+k*cw)}" y="${by}" width="${f1(cw-2)}" height="14" rx="2" style="fill:var(${k<n?c:'--line'});opacity:${k<n?.9:.6}"/>`;
      const tx=x+thr*cw-1;
      s+=`<line x1="${f1(tx)}" y1="${by-6}" x2="${f1(tx)}" y2="${by+20}" style="stroke:var(--ink);stroke-width:2"/>`;
      const ok=lit>.5&&n>=thrN;
      s+=`<text class="t-sm" x="${x}" y="${by+34}" style="fill:var(${ok?'--good':'--muted'})">${lit>.5?`${n} of 9 · needs ${thrN}`:'counting…'}${ok?' · met':''}</text>`;
    });
    s+='</g>';
    /* ---- age, onset timeline, settings, checklist ---- */
    const P=N?{x:8,y:318,w:384}:{x:372,y:6,w:340};
    s+=`<g transform="translate(${P.x} ${P.y})">`;
    s+=`<text class="t-big" x="0" y="18">Age ${Math.round(age)}</text><text class="t-sm" x="${N?96:84}" y="17">threshold: ${thrN} per list ${thrN===6?'(to age 16)':'(17 and older)'}</text>`;
    /* timeline 0..20 years */
    const X=a=>f1(8+a/20*(P.w-24)),ty=70;
    s+=`<rect x="${X(0)}" y="${ty-12}" width="${f1(X(12)-X(0))}" height="24" rx="5" style="fill:var(--brand-soft);opacity:${f1(ons*.9)}"/>`;
    s+=`<line x1="${X(0)}" y1="${ty}" x2="${X(20)}" y2="${ty}" style="stroke:var(--muted);stroke-width:1.5"/>`;
    [0,5,10,12,15,20].forEach(a=>{s+=`<line x1="${X(a)}" y1="${ty-4}" x2="${X(a)}" y2="${ty+4}" style="stroke:var(--muted)"/><text class="t-xs t-mid" x="${X(a)}" y="${ty+18}">${a}</text>`});
    if(ons>0)s+=`<text class="t-sm" x="${X(6)}" y="${ty-18}" style="fill:var(--brand);opacity:${f1(ons)}" text-anchor="middle">several symptoms before 12</text>`;
    if(flag>0)s+=`<g style="opacity:${f1(flag)}"><line x1="${X(7)}" y1="${ty}" x2="${X(7)}" y2="${ty+28}" style="stroke:var(--gold);stroke-width:2"/><text class="t-xs" x="${X(7)+5}" y="${ty+34}" style="fill:var(--gold)">school report, age 7</text></g>`;
    s+=`<circle cx="${X(age)}" cy="${ty}" r="7" style="fill:var(--ink)"/>`;
    /* settings */
    const sy=126,cwid=(P.w-12)/2;
    [['Home','parent report'],[age>=17?'Work or college':'School',age>=17?'self report':'teacher report']].forEach(([h,sub],k)=>{const x=k*(cwid+12);
      s+=`<rect x="${f1(x)}" y="${sy}" width="${f1(cwid)}" height="58" rx="10" style="fill:var(${set>.5?'--good-soft':'--panel-2'});stroke:var(${set>.5?'--good':'--line'})"/>`;
      s+=`<text class="t-lbl" x="${f1(x+12)}" y="${sy+22}">${h}</text><text class="t-xs" x="${f1(x+12)}" y="${sy+40}">${sub}</text>`;
      for(let d=0;d<3;d++)s+=`<circle cx="${f1(x+cwid-50+d*14)}" cy="${sy+40}" r="4.5" style="fill:var(${d%2?'--dz':'--dx'});opacity:${f1(.15+.85*ramp(set,d*.25,d*.25+.4))}"/>`;
      if(set>.5)s+=tick(x+cwid-16,sy+18,'--good',ramp(set,.5,1))});
    /* checklist badges */
    const B=[['18','symptom lists'],['6/5','threshold'],['12','onset'],['2','settings'],['D·E','impairment']],bw=P.w/5,byy=240;
    B.forEach(([d,l],k)=>{const cx=bw*k+bw/2,h=met[k];
      s+=`<circle cx="${f1(cx)}" cy="${byy}" r="23" style="fill:var(${h?'--good-soft':'--field'});stroke:var(${h?'--good':'--line'});stroke-width:2"/>`;
      s+=`<text class="t-big t-mid" x="${f1(cx)}" y="${byy+6}" style="fill:var(${h?'--good':'--muted'});font-size:${d.length>2?13:16}px">${d}</text><text class="t-xs t-mid" x="${f1(cx)}" y="${byy+40}">${l}</text>`});
    const cnt=met.filter(Boolean).length;
    const v=cnt<5?`Criteria checked: ${cnt} of 5`:'Pattern: combined presentation';
    s+=`<text class="t-big" x="0" y="${byy+76}" style="fill:var(${cnt===5?'--good':'--ink'})">${v}</text>`;
    if(dE>0)s+=`<text class="t-sm" x="0" y="${byy+96}" style="opacity:${f1(dE)}">Illustrative only: a clinician makes the diagnosis</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
/* [part, question, 4 options, correct index, cited explanation] */
const QZ_Q=[
 [1,`The pooled worldwide prevalence of ADHD in children and adolescents (Polanczyk 2007) was about:`,[`1%`,`5.3%`,`12%`,`20%`],1,`5.29% across 102 studies and 171,756 participants [[Polanczyk2007]].`],
 [1,`Variation between childhood ADHD prevalence studies is best explained by:`,[`Geographic region`,`The decade of the study`,`Country income`,`Study methods: criteria, informant and impairment requirement`],3,`Criteria, impairment and information source explained the heterogeneity; location and year did not [[Polanczyk2014]].`],
 [1,`In US survey data from 2023, the share of adults with current ADHD who were diagnosed at 18 or older was about:`,[`10%`,`25%`,`56%`,`90%`],2,`55.9% [[Staley2024]].`],
 [1,`Compared with the oldest children in a school year, the youngest are:`,[`Less likely to be diagnosed with ADHD`,`More likely to be diagnosed (RR about 1.38)`,`Equally likely`,`Only affected in parent ratings`],1,`RR 1.38 for diagnosis and 1.28 for medication; the effect appears in teacher ratings, not parent ratings [[Frisira2025]].`],
 [1,`Mean heritability of ADHD across 37 twin studies is about:`,[`20%`,`74%`,`40%`,`95%`],1,`74% [[Faraone2019]]. Lower adult figures come mostly from self-report and rater effects.`],
 [1,`In Swedish registers, the hazard ratio for ADHD in a full sibling of a person with ADHD was about:`,[`1.5`,`3`,`8`,`70`],2,`HR 8.27; an identical co-twin had HR 70.45 [[Chen2017JCPP]].`],
 [1,`SNP heritability of ADHD from GWAS is about:`,[`0.22`,`0.74`,`0.05`,`0.88`],0,`h²snp about 0.22, roughly one-third of twin heritability [[Demontis2019]].`],
 [1,`The 2023 ADHD GWAS (38,691 cases) identified how many genome-wide-significant loci?`,[`1`,`12`,`108`,`27`],3,`27 loci and 76 candidate risk genes, enriched for early brain development [[Demontis2023]].`],
 [1,`In Swedish sibling comparisons, the hazard ratio linking heavy smoking in pregnancy with ADHD was about:`,[`2.5`,`1.6`,`0.84`,`4.0`],2,`It fell from 2.50 at population level to 0.84 between siblings: familial confounding [[Skoglund2014]].`],
 [1,`Which statement about sugar and ADHD is supported by double-blind trials?`,[`Sugar does not affect children's behaviour or cognition`,`Sugar causes ADHD`,`Sugar worsens symptoms in most children`,`Sugar only affects girls`],0,`No effect in 23 challenge studies [[Wolraich1995]]; expectation shapes ratings [[Hoover1994]].`],
 [1,`Severe childhood traumatic brain injury, more than a year later, was associated with ADHD at an odds ratio of about:`,[`1.0`,`6`,`1.3`,`20`],1,`OR 6.25 against uninjured children; mild TBI showed no significant rise [[Asarnow2021]].`],
 [1,`In the English and Romanian Adoptees study, more than 6 months of severe early deprivation was linked with adult ADHD in about:`,[`3.8%`,`10%`,`29.3%`,`70%`],2,`29.3% in young adulthood, over 7 times the low-deprivation group [[Kennedy2016]].`],
 [1,`In ENIGMA-ADHD, subcortical volume differences were:`,[`Large in adults`,`Small (d under 0.2) and clearest in children`,`Caused by stimulant treatment`,`Largest in the thalamus`],1,`d from −0.11 to −0.19; no differences in pallidum or thalamus; not significant in adults; stimulants did not change them [[Hoogman2017,Posner2020]].`],
 [1,`Shaw 2007 found the age at which half the cortex reached peak thickness was:`,[`Identical in both groups`,`7.5 years in ADHD vs 10.5 in controls`,`About 3 years later in ADHD (10.5 vs 7.5 years)`,`Later only in occipital cortex`],2,`The delay was most marked in prefrontal regions [[Shaw2007]].`],
 [1,`In task fMRI, children with ADHD show over-activation of which network?`,[`Frontoparietal`,`Ventral attention only`,`None`,`Default mode`],3,`Under-activation of frontoparietal and ventral attention networks, over-activation of default, ventral attention and somatomotor networks [[Cortese2012]].`],
 [1,`Arnsten's inverted-U describes prefrontal function as best when catecholamine levels are:`,[`Moderate`,`As low as possible`,`As high as possible`,`Unrelated to function`],0,`Too little (fatigue) or too much (stress) both impair it [[Arnsten2009CNS]].`],
 [1,`The meta-analytic effect size for steeper delay discounting in ADHD is about:`,[`d = 0.05`,`d = 0.43`,`d = 1.5`,`d = 3.0`],1,`d = 0.43 across 25 comparisons (N = 3,913) [[Jackson2016]].`],
 [1,`Rapoport's 1978 study showed that dextroamphetamine in typically developing boys:`,[`Had no effect`,`Caused hyperactivity`,`Reduced motor activity and improved test performance, as in ADHD`,`Worked only in adults`],2,`So a stimulant response does not confirm ADHD [[Rapoport1978]].`],
 [1,`The EEG theta/beta ratio:`,[`Is a reliable stand-alone diagnostic test`,`Showed a large effect in 2006 that shrank to about 0.6–0.75 by 2013`,`Is lower in ADHD`,`Is required by DSM-5-TR`],1,`Arns 2013 concluded it "cannot be considered a reliable diagnostic measure" [[Snyder2006,Arns2013]].`],
 [2,`Which ADHD presentation is most common in community samples?`,[`Predominantly inattentive`,`Combined`,`Predominantly hyperactive-impulsive`,`They are equally common`],0,`Inattentive in the community; combined is most common among clinic referrals [[Willcutt2012]].`],
 [2,`At age 25, roughly what share of children with ADHD still meet full criteria?`,[`About 65%`,`About 50%`,`About 15%`,`Under 1%`],2,`About 15%, rising to about 65% when partial remission is counted [[Faraone2006]].`],
 [2,`In the MTA follow-up to about age 25, the most common course was:`,[`Stable persistence`,`Sustained recovery`,`New onset in adulthood`,`Fluctuating remission and recurrence`],3,`63.8% fluctuating, 9.1% sustained recovery, 10.8% stable persistence [[Sibley2022]].`],
 [2,`The male-to-female ratio in clinic-referred children with ADHD (Biederman 2002) was about:`,[`1:1`,`2:1`,`10:1`,`20:1`],2,`About 10:1 in clinics versus about 3:1 in community samples [[Biederman2002Gender]].`],
 [2,`Compared with boys with ADHD, girls more often show:`,[`More inattention and internalising problems`,`More conduct disorder`,`Earlier referral`,`More hyperactivity`],0,`Girls and women mainly show inattention and internalising problems; boys more hyperactive-impulsive and externalising problems [[Hinshaw2022]].`],
 [2,`Under DSM-5-TR, an adult aged 17 or older needs how many symptoms in a domain?`,[`6`,`4`,`5`,`9`],2,`5 or more at 17 and older; 6 or more up to age 16 [[APA2022DSM,Posner2020]].`],
 [2,`DSM-5 changed the age-of-onset criterion to:`,[`Several symptoms before age 12`,`Impairment before age 7`,`Symptoms before age 5`,`Any age`],0,`From impairing symptoms before 7 to several symptoms before 12 [[Epstein2013]].`],
 [2,`DSM-5 Criterion C requires:`,[`Impairment at school only`,`A positive rating scale`,`Onset before 7`,`Several symptoms in two or more settings`],3,`Pervasiveness moved from impairment to symptoms in two or more settings [[Epstein2013,APA2022DSM]].`],
 [2,`Which DSM-5 change allowed a dual diagnosis for the first time?`,[`ADHD with anxiety`,`ADHD with autism`,`ADHD with ODD`,`ADHD with depression`],1,`Autism was removed as an exclusion [[Epstein2013]].`],
 [2,`In the community, the Vanderbilt parent scale's positive predictive value was:`,[`0.98`,`0.75`,`0.19`,`0.50`],2,`PPV 0.19, NPV 0.98: a positive screen needs full assessment [[Bard2013Parent]].`],
 [2,`The same screener gives a higher positive predictive value when:`,[`Prevalence in the tested group is higher`,`Prevalence is lower`,`Only parents complete it`,`It is shortened`],0,`ASRS-5 PPV was 67.3% at 8.2% prevalence and 82.8% at 57.7% [[Ustun2017]].`],
 [2,`QbTest as a stand-alone diagnostic test is:`,[`Recommended`,`More accurate than interviews`,`Required by DSM-5-TR`,`Not recommended; AUC about 0.72`],3,`It may help as an adjunct but should not be used alone [[Bellato2024QbTest]].`],
 [2,`About what share of autistic people have co-occurring ADHD?`,[`5%`,`28%`,`60%`,`90%`],1,`28% (95% CI 25–32), the most common co-occurring diagnosis in autism [[Lai2019Autism]].`],
 [2,`In the CHAT trial, early adenotonsillectomy for sleep apnoea:`,[`Normalised the primary attention score`,`Worsened behaviour`,`Improved behaviour and sleep studies but not the primary attention score`,`Was abandoned`],2,`7.1 vs 5.1 points, P = 0.16; polysomnography normalised in 79% vs 46% [[Marcus2013CHAT]].`],
 [2,`In MTA comparison participants, how many checklist-positive "late-onset" cases were excluded after full assessment?`,[`About 95%`,`About 10%`,`About 50%`,`None`],0,`Most often because symptoms occurred only during heavy substance use [[Sibley2018LateOnset]].`],
 [2,`Which feature favours bipolar disorder over ADHD?`,[`Onset in childhood`,`A persistent, trait-like pattern`,`Inattention in class`,`Discrete episodes of increased activity with elevated mood`],3,`Bipolar disorder is episodic; ADHD is persistent [[APA2022DSM]].`],
 [2,`In Sweden, females were first recorded with ADHD on average:`,[`At the same age as males`,`About 4 years later than males`,`About 4 years earlier`,`Only after age 40`],1,`23.5 vs 19.6 years [[Skoglund2024]].`],
 [3,`Methylphenidate's main mechanism is:`,[`Reversing transporters to release dopamine`,`Alpha-2A agonism`,`Monoamine oxidase inhibition only`,`Blocking reuptake by DAT and NET`],3,`The labels state it blocks reuptake of noradrenaline and dopamine [[FDA-RitalinC]]; amphetamine is the releaser [[Sulzer2005]].`],
 [3,`Lisdexamfetamine is converted to dextroamphetamine mainly by:`,[`Red blood cells`,`CYP2D6 in the liver`,`Gut bacteria`,`The kidney`],0,`Red blood cell hydrolysis; not CYP450 [[FDA-Vyvanse]].`],
 [3,`In rats, atomoxetine raised dopamine in the:`,[`Striatum and accumbens`,`Prefrontal cortex but not striatum or accumbens`,`Cerebellum only`,`Whole brain equally`],1,`Noradrenaline and dopamine rose about 3-fold in prefrontal cortex only [[Bymaster2002]].`],
 [3,`Guanfacine's selectivity is for which receptor?`,[`D1`,`NET`,`Alpha-2A, with 15–20 times the affinity for 2B/2C`,`5-HT2C`],2,`It stimulates postsynaptic alpha-2A receptors on prefrontal spines [[FDA-Intuniv,Arnsten2010]].`],
 [3,`Every current US stimulant label carries a boxed warning on:`,[`Suicidal thoughts`,`Abuse, misuse and addiction`,`Liver injury`,`Rebound hypertension`],1,`Atomoxetine and viloxazine carry the suicidality warning [[FDA-Concerta,FDA-Strattera]].`],
 [3,`Lisdexamfetamine is best described as:`,[`A prodrug of dextroamphetamine`,`An alpha-2A agonist`,`A selective NET inhibitor`,`An immediate-release methylphenidate`],0,`Red blood cells convert it to dextroamphetamine and l-lysine [[FDA-Vyvanse]].`],
 [3,`In CYP2D6 poor metabolisers, atomoxetine's half-life is about:`,[`2 hours`,`5 hours`,`10 hours`,`21.6 hours`],3,`5.2 h in normal metabolisers; the label suggests a 4-week titration interval for poor metabolisers [[FDA-Strattera]].`],
 [3,`The share of Concerta's methylphenidate available for immediate release is:`,[`50%`,`22%`,`78%`,`100%`],1,`22% immediate, 78% extended release [[FDA-Concerta]].`],
 [3,`Which medicine is labelled for evening dosing, with a median Tmax of 14 hours?`,[`Concerta`,`Vyvanse`,`Jornay PM`,`Focalin XR`],2,`Jornay PM is taken between 6:30 and 9:30 p.m. [[FDA-JornayPM]].`],
 [3,`The Intuniv label states that a high-fat meal raises guanfacine ER Cmax by about:`,[`75%`,`5%`,`Nothing`,`300%`],0,`Cmax about 75% and AUC about 40% higher; it should not be taken with high-fat meals [[FDA-Intuniv]].`],
 [3,`Abruptly stopping guanfacine ER can cause:`,[`Hypoglycaemia`,`Seizures`,`Serotonin syndrome`,`Rebound hypertension`],3,`The label recommends tapering by no more than 1 mg every 3 to 7 days [[FDA-Intuniv]].`],
 [3,`Cortese 2018 judged the preferred first-choice medication for adults to be:`,[`Atomoxetine`,`Amphetamines`,`Modafinil`,`Bupropion`],1,`Methylphenidate for children and adolescents; amphetamines for adults [[Cortese2018]].`],
 [3,`In children, the clinician-rated effect size (SMD) for amphetamines against placebo in Cortese 2018 was about:`,[`−0.2`,`−0.5`,`−1.0`,`−2.5`],2,`−1.02, against −0.78 for methylphenidate and −0.56 for atomoxetine [[Cortese2018]].`],
 [3,`NICE NG87 offers which first-line medicine for children aged 5 and over?`,[`Methylphenidate`,`Atomoxetine`,`Guanfacine`,`Lisdexamfetamine`],0,`Lisdexamfetamine is considered after a 6-week methylphenidate trial without enough benefit [[NICE2018E]].`],
 [3,`In 22 RCTs, the rate of new or worsening tics on stimulants versus placebo was:`,[`Tripled`,`Doubled`,`Similar (RR 0.99)`,`Halved`],2,`5.7% vs 6.5% [[Cohen2015Tics]].`],
 [3,`In 13–25-year-olds, new psychosis was more common with:`,[`Methylphenidate`,`Amphetamine`,`Neither`,`Guanfacine`],1,`0.21% vs 0.10%, HR 1.65 [[Moran2019NEJM]].`],
 [3,`Typical stimulant effects on vital signs are:`,[`Heart rate +3 to 6 bpm, BP +2 to 4 mm Hg`,`Heart rate −10 bpm`,`BP +20 mm Hg`,`No change`],0,`Mean rises as stated on the labels [[FDA-Concerta]]. Guanfacine lowers them [[Farhat2025CV]].`],
 [3,`About what share of college students misuse stimulant medication?`,[`1%`,`50%`,`80%`,`17%`],3,`17%, mostly for academic reasons, usually from peers with prescriptions [[Benson2015]].`],
 [3,`In a discontinuation trial after more than 2 years of methylphenidate, clinician-rated worsening after switching to placebo was:`,[`0%`,`40.4% vs 15.9% when continuing`,`90%`,`Equal in both arms`],1,`The benefit persisted on average [[Matthijssen2019]].`],
 [4,`On probably blinded measures, behavioural parent training reliably improves:`,[`Core ADHD symptoms`,`Parenting and child conduct problems`,`IQ`,`Reading only`],1,`Positive parenting SMD 0.63, conduct problems 0.31; ADHD symptoms were not significant blinded [[Daley2014]].`],
 [4,`The AAP first-line treatment for a 5-year-old with ADHD is:`,[`Parent training and/or classroom behavioural intervention`,`Methylphenidate`,`Atomoxetine`,`Neurofeedback`],0,`Methylphenidate may be considered if these are not enough [[Wolraich2019]].`],
 [4,`In the MTA at 14 months, on core ADHD symptoms combined treatment compared with medication management alone was:`,[`Much better`,`Worse`,`Only better in girls`,`Not significantly different`],3,`Both beat behavioural treatment and community care [[MTA1999]].`],
 [4,`The MTA "success" rate for intensive behavioural treatment at 14 months was:`,[`68%`,`56%`,`34%`,`25%`],2,`Combined 68%, medication 56%, behavioural 34%, community care 25% [[Swanson2001MTA]].`],
 [4,`In the MTA, children with which comorbidity did relatively well with behavioural treatment?`,[`Anxiety disorders`,`Tic disorders`,`Autism`,`Epilepsy`],0,`Behavioural treatment was no longer statistically different from the medication arms [[MTA1999Moderators]].`],
 [4,`By the 36-month MTA follow-up, the randomised groups:`,[`Still differed widely`,`Favoured behavioural treatment`,`No longer differed significantly`,`Had all stopped medication`],2,`Medication use had converged between arms [[Jensen2007MTA]].`],
 [4,`In the SMART trial, starting with behavioural treatment rather than medication:`,[`Increased rule violations`,`Led to fewer rule violations and lower cost`,`Was abandoned for harm`,`Made no difference to cost`],1,`8.4 vs 12.6 violations per hour; $961 vs $1,669 [[Pelham2016,Page2016]].`],
 [4,`When parent training was added after medication in SMART, the share of parents attending no sessions was:`,[`5%`,`20%`,`40%`,`60%`],3,`Only 11% got an adequate dose [[Pelham2016]].`],
 [4,`The Cochrane review of social skills training found its effect on teacher-rated social skills was:`,[`Large`,`Not clinically relevant (SMD 0.11)`,`Harmful`,`Equal to medication`],1,`About 1.22 points on a 0–102 scale [[Storebo2019]].`],
 [4,`In the double-blind sham-controlled neurofeedback trial, neurofeedback at treatment end was:`,[`Superior (d = 1.5)`,`Harmful`,`Superior only at 13 months`,`Not superior to sham (d = 0.01)`],3,`Both groups improved strongly (d = 1.5) [[NFCG2021]].`],
 [4,`In Safren 2010, the CBT response rate on the ADHD rating scale was:`,[`67% vs 33% for the control`,`20% vs 18%`,`95% vs 5%`,`Equal`],0,`OR 4.29; gains held at 6 and 12 months [[Safren2010]].`],
 [4,`Organisational skills training left how many children still meeting organisational-impairment criteria, versus wait list?`,[`60% vs 3%`,`About equal`,`40% vs 97%`,`3% vs 60%`],2,`60% of OST children no longer met criteria against 3% of controls [[Abikoff2013]].`],
 [4,`In the INCA trial, food-challenge relapse among diet responders was:`,[`Predicted by IgG tests`,`0%`,`100%`,`63%, regardless of IgG levels`],3,`The authors discourage IgG-based diets [[Pelsser2011]].`],
 [4,`Cognitive working-memory training:`,[`Improves trained tests but not blinded symptoms or school results`,`Cures ADHD`,`Beats medication`,`Has no effect on any test`],0,`Verbal SMD 0.52 on lab tests [[Cortese2015]].`],
 [5,`The fully adjusted mortality rate ratio for ADHD in the Danish national cohort was about:`,[`1.0`,`2.07`,`10`,`0.5`],1,`Mostly from accidents [[Dalsgaard2015]].`],
 [5,`In Denmark, the ADHD mortality rate ratio was highest for diagnosis:`,[`Before age 6`,`At 6–17`,`At 18 or older`,`It did not differ`],2,`MRR 4.25 for adult diagnosis [[Dalsgaard2015]].`],
 [5,`In a meta-analysis, deaths with the clearest rise in ADHD were from:`,[`Unnatural causes`,`Cancer`,`Heart disease`,`Infection`],0,`Unnatural causes RR 2.81; natural causes not significantly raised [[CatalaLopez2022]].`],
 [5,`In a Swedish within-person study, convictions during medication periods in men were:`,[`Unchanged`,`Doubled`,`90% lower`,`32% lower`],3,`41% lower in women [[Lichtenstein2012]].`],
 [5,`Comparing the same people on and off medication, suicide-related events:`,[`Rose (HR 1.31)`,`Were slightly lower (HR 0.89)`,`Tripled`,`Could not be measured`],1,`The naive between-person HR was 1.31; the within-person HR 0.89 [[Chen2014BMJ]].`],
 [5,`In the MTA by age 17, childhood stimulant treatment and later substance use were:`,[`Strongly linked`,`Linked only in girls`,`Not associated in either direction`,`Linked only at high doses`],2,`MTA participants still had more substance use than classmates [[Molina2013]].`],
 [5,`After controlling for driving exposure, the relative crash risk for drivers with ADHD was about:`,[`1.23`,`4`,`10`,`0.8`],0,`The "almost fourfold" claim was rebutted [[Vaa2014]].`],
 [5,`In US claims, medicated months had what change in crash-related emergency visits for women?`,[`No change`,`42% lower odds`,`50% higher odds`,`90% lower odds`],1,`38% lower in men [[Chang2017Crash]].`],
 [5,`A pooled estimate of ADHD in people in substance use disorder treatment is about:`,[`2%`,`5%`,`50%`,`23%`],3,`23.1% across 29 studies [[vanEmmerikvanOortmerssen2012]].`],
 [5,`Centanafadine's mechanism is:`,[`Alpha-2A agonism`,`Dopamine release via VMAT2`,`Reuptake inhibition of noradrenaline, dopamine and serotonin`,`5-HT2C agonism only`],2,`Small effect sizes 0.24–0.40 in adults [[Adler2022]].`],
 [5,`The STARS-ADHD trial of a digital therapeutic used as its primary outcome:`,[`A computerised attention test (TOVA API)`,`Parent ratings`,`School grades`,`Brain MRI`],0,`Not parent- or clinician-rated ADHD symptoms [[Kollins2020]].`],
 [5,`In UK primary-care data, the estimated life-expectancy reduction for women with diagnosed ADHD was about:`,[`1 year`,`3 years`,`20 years`,`8.6 years`],3,`6.78 years for men; only about 1 in 9 adults with ADHD had a diagnosis, so results may not generalise [[ONions2025]].`],
 [5,`Childhood ADHD was associated with failure to complete high school at an odds ratio of about:`,[`1.0`,`3.7`,`0.5`,`15`],1,`Unemployment OR 2.0 [[Erskine2016]].`],
 [5,`Under NICE NG87, children aged 10 and under on ADHD medication have their weight measured:`,[`Every 3 months`,`Every 12 months`,`Only at diagnosis`,`Weekly`],0,`Height every 6 months; adults' weight every 6 months [[NICE2018H]].`],
 [5,`Which finding on 2 occasions prompts dose reduction and referral under NICE?`,[`Heart rate 90`,`Weight gain`,`Sustained resting heart rate above 120 per minute`,`A normal ECG`],2,`Also arrhythmia or systolic BP above the 95th percentile [[NICE2018H]].`],
 [5,`Before starting ADHD medication, a routine ECG under NICE is:`,[`Always required`,`Required only in adults`,`Required annually`,`Not needed unless cardiac risk features are present`],3,`A cardiology opinion follows features such as sudden cardiac death in a first-degree relative under 40 [[NICE2018H]].`],
 [5,`The Strattera label's advice for a missed dose is:`,[`Double the next dose`,`Take it as soon as possible, but not more than the daily total in 24 hours`,`Skip the whole week`,`Restart titration`],1,`No taper is needed when stopping atomoxetine [[FDA-Strattera]].`],
 [5,`According to its label, Strattera capsules should be:`,[`Opened and sprinkled on food`,`Crushed`,`Taken whole, not opened`,`Chewed`],2,`Adderall XR and Focalin XR capsules, by contrast, may be sprinkled on applesauce [[FDA-Strattera,FDA-AdderallXR]].`],
 [5,`In a UK surveillance study, the share of young people on ADHD medication with an optimal transition to adult care was:`,[`6%`,`50%`,`75%`,`95%`],0,`22% attended a first adult appointment [[Eke2020]].`],
 [5,`The brief sleep intervention in Hiscock 2015 had a number needed to treat of about:`,[`50`,`20`,`1`,`3.9`],3,`Moderate to severe sleep problems 30% vs 56% at 3 months [[Hiscock2015]].`],
 [5,`The commonest school accommodation for ADHD, extended time on tests, has:`,[`Strong ADHD-specific evidence`,`Little ADHD-specific evidence`,`Been banned`,`Proven harm`],1,`Read-aloud accommodations were the exception for younger students [[Lovett2021]].`],
 [6,`In 1902 George Still described children with a:`,[`"Hyperkinetic reaction"`,`"Defect of moral control"`,`"Minimal brain damage"`,`"Mental restlessness"`],1,`20 children, 15 boys and 5 girls, in the Goulstonian Lectures [[Still1902,Lange2010]].`],
 [6,`The name "Attention-deficit Hyperactivity Disorder" first appeared in:`,[`DSM-II (1968)`,`DSM-III (1980)`,`DSM-IV (1994)`,`DSM-III-R (1987)`],3,`DSM-II used "Hyperkinetic Reaction of Childhood" and DSM-III "Attention Deficit Disorder" [[Lange2010]].`],
 [6,`Charles Bradley's 1937 observation in children involved:`,[`Methylphenidate`,`Caffeine`,`Benzedrine`,`Clonidine`],2,`Benzedrine, an amphetamine, improved behaviour and school performance [[Strohl2011,Bradley1937]].`],
 [6,`ICD-11 codes ADHD as:`,[`6A05`,`F90`,`6A02`,`314.01`],0,`6A05; ICD-10 used F90 [[TebartzVanElst2025]].`],
 [6,`"Mental restlessness" was described in 1798 by:`,[`Heinrich Hoffmann`,`Alexander Crichton`,`George Still`,`Virginia Douglas`],1,`Crichton, a Scottish physician [[Lange2010,Palmer2001]].`],
 [6,`"Fidgety Philip" comes from Heinrich Hoffmann's book first published in:`,[`1902`,`1937`,`1845`,`1775`],2,`Struwwelpeter, drawn in 1844 for his 3-year-old son [[Lange2010,Thome2004]].`],
 [6,`Kramer and Pollnow's 1932 description was of a:`,[`"Hyperkinetic disease of infancy"`,`"Defect of moral control"`,`"Minimal brain dysfunction"`,`"Postencephalitic disorder"`],0,`Onset at 3–4 years; "hyperkinetic disorder" was later adopted by the WHO [[Lange2010,Faraone2021]].`],
 [6,`In 1963 the Oxford International Study Group argued that brain damage should not be inferred from behaviour and favoured the term:`,[`Hyperkinetic reaction`,`Attention deficit disorder`,`Defect of moral control`,`Minimal brain dysfunction`],3,`Replacing "minimal brain damage" [[Lange2010]].`],
 [6,`In 1972, Virginia Douglas argued that what mattered more than hyperactivity was:`,[`Sustained attention and impulse control`,`Diet`,`Handwriting`,`Sleep`],0,`DSM-III (1980) then renamed the condition "Attention Deficit Disorder" [[Lange2010]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${RV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='%t:quiz.letters%'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'%t:quiz.correct%':'%t:quiz.wrong%'}</b> %t:quiz.answer_is{l:ansL}% ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'%t:quiz.next%':'%t:quiz.results%'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
/* [term, cited definition, module id] */
const GL_T=[
 ["504 plan",`A US school plan of accommodations for a disability; ADHD qualifies [[Wolraich2019]].`,"parenting"],
 ["95th percentile",`The blood-pressure centile for age and height above which NICE advises referral for children [[NICE2018H]].`,"nursing"],
 ["Absence epilepsy",`Brief staring seizures that can mimic or accompany ADHD; ADHD was diagnosed in 41.5% of affected children vs 7.3% of controls [[Vanderwiel2024]].`,"differential"],
 ["Accommodation",`A change in how a student is taught or tested, such as extended time; most have little ADHD-specific evidence [[Lovett2021]].`,"living"],
 ["ADHD Rating Scale",`A clinician-rated DSM symptom scale, used to validate the ASRS checklist (ICC 0.84) [[Adler2006]].`,"scales"],
 ["Adherence",`Taking medicine as agreed; NICE suggests reminders, routines and written instructions kept with the medicine [[NICE2018H]].`,"nursing"],
 ["Alpha-2A receptor",`A noradrenaline receptor on prefrontal dendritic spines; stimulating it strengthens network firing and is the target of guanfacine [[Arnsten2009CNS,FDA-Intuniv]].`,"nonstim"],
 ["Antecedent",`What happens before a behaviour, such as how an instruction is given; changing it is a parent-training technique [[Dekkers2022]].`,"parenting"],
 ["ASRS v1.1",`The WHO Adult ADHD Self-Report Scale: 18 questions, with a 6-question screener (sensitivity 68.7%, specificity 99.5%) [[Kessler2005]]. A teaching and case-finding tool, not a diagnosis.`,"scales"],
 ["ASRS-5",`A 6-question DSM-5 version of the ASRS; sensitivity 91.4% and specificity 96.0% at 8.2% prevalence [[Ustun2017]].`,"scales"],
 ["Atomoxetine",`A selective noradrenaline reuptake inhibitor, non-stimulant, metabolised by CYP2D6, with a boxed warning on suicidal thoughts in children [[FDA-Strattera]].`,"nonstim"],
 ["Baseline assessment",`Before medication: history, current medicines, height, weight, pulse, blood pressure, cardiovascular and misuse-risk assessment [[NICE2018H]].`,"nursing"],
 ["Behavioural classroom management",`Teacher-led behavioural strategies such as point systems; classed as well-established [[Evans2014]].`,"parenting"],
 ["Behavioural parent training",`Teaching parents antecedent and reinforcement techniques; "well-established" for ADHD [[Evans2014,Dekkers2022]].`,"parenting"],
 ["Bimodal release",`Two plasma peaks about 4 hours apart from bead-based capsules such as Ritalin LA and Focalin XR [[FDA-RitalinLA,FDA-FocalinXR]].`,"release"],
 ["Blinded rating",`An outcome rated by someone who does not know the treatment; behavioural effects on core symptoms shrink when ratings are blinded [[Daley2014,SonugaBarke2013]].`,"parenting"],
 ["Boxed warning",`The strongest US label warning; for stimulants, abuse, misuse and addiction [[FDA-Concerta]].`,"safety"],
 ["Centanafadine",`A noradrenaline-dopamine-serotonin reuptake inhibitor, FDA-approved as Simtriyo in 2026 [[Adler2022,FDA-Simtriyo]].`,"frontiers"],
 ["Clonidine ER",`An extended-release alpha-2 agonist for ADHD alone or with stimulants; tapered to avoid rebound hypertension [[FDA-ClonidineER]].`,"nonstim"],
 ["Cmax",`The highest plasma concentration after a dose; guanfacine ER Cmax rises about 75% with a high-fat meal [[FDA-Intuniv]].`,"release"],
 ["Co-occurring condition",`A second condition alongside ADHD; 77.9% of US children with current ADHD had at least one [[Danielson2024]].`,"differential"],
 ["Coaching",`Practical goal-setting and accountability support; only uncontrolled evidence so far (Early evidence) [[Prevatt2015]].`,"therapy"],
 ["Cognitive behavioural therapy (CBT)",`Structured therapy on planning, distraction and thinking patterns; responders 67% vs 33% in medication-treated adults [[Safren2010]].`,"therapy"],
 ["Cognitive training",`Computer exercises for working memory or attention; gains do not transfer to blinded symptoms [[Cortese2015]].`,"therapy"],
 ["Collateral history",`Information from someone who knew the person well, ideally for 5 years or more, or from school records [[Young2020Females]].`,"scales"],
 ["Combined presentation",`Meeting the symptom threshold for both inattention and hyperactivity-impulsivity; the presentation most often referred to clinics [[Willcutt2012]].`,"signs"],
 ["Community care",`Usual local treatment, the MTA's fourth arm; about two-thirds of its children took medication [[MTA1999]].`,"mta"],
 ["COMPAS trial",`A 433-adult German trial of DBT-based group therapy vs clinical management, with methylphenidate or placebo [[Philipsen2015]].`,"therapy"],
 ["Compensatory strategies",`Behaviours such as social adaptiveness, compliance and perfectionism that can mask impairment and delay referral, especially in girls and women [[Young2020Females]].`,"women"],
 ["Confounding by indication",`When the reason for treatment also affects the outcome; self-controlled designs avoid it [[RuizGoikoetxea2018]].`,"outcomes"],
 ["Contingency management",`Rewarding wanted behaviour with planned consequences, a school strategy with positive effects [[DuPaul2012]].`,"parenting"],
 ["Continuous performance test (CPT)",`A computerised vigilance task; pooled sensitivity 0.75 and specificity 0.71, too weak to diagnose alone [[Arrondo2024]].`,"scales"],
 ["Copy number variant (CNV)",`A deleted or duplicated stretch of DNA. Large rare CNVs were twice as common in children with ADHD (0.156 against 0.075) [[Williams2010Lancet]].`,"genes"],
 ["Cortical surface area",`The area of the cortex; lower in children with ADHD, total surface area d = −0.21 [[Hoogman2019]].`,"brain"],
 ["Cortical thickness",`The depth of the cortex; peak thickness came about 3 years later in ADHD [[Shaw2007]].`,"brain"],
 ["Criterion A",`The symptom lists: A1 nine inattentive and A2 nine hyperactive-impulsive symptoms [[APA2022DSM]].`,"criteria"],
 ["Criterion B",`Several symptoms present before age 12 [[APA2022DSM]].`,"criteria"],
 ["Criterion C",`Several symptoms present in two or more settings [[APA2022DSM]].`,"criteria"],
 ["Criterion D",`Clear evidence that symptoms interfere with or reduce the quality of functioning [[APA2022DSM,Epstein2013]].`,"criteria"],
 ["Criterion E",`Symptoms not better explained by another mental disorder [[APA2022DSM]].`,"criteria"],
 ["CYP2D6",`The liver enzyme that metabolises atomoxetine; poor metabolisers have a 21.6-hour half-life [[FDA-Strattera,Brown2019CPIC]].`,"nonstim"],
 ["D2/D3 receptors",`Dopamine receptors measured by [11C]raclopride PET; lower in the reward pathway of untreated adults with ADHD [[Volkow2009]].`,"dopamine"],
 ["Daily report card (DRC)",`A daily teacher rating of a few behaviour goals shared with parents [[Pyle2017,Fabiano2010DRC]].`,"parenting"],
 ["DALY",`Disability-adjusted life year. ADHD accounted for 0.8% of global mental-disorder DALYs in GBD 2019 [[Cortese2023GBD]].`,"what"],
 ["Default-mode network",`Brain regions active at rest and during mind-wandering; may intrude on focused attention in ADHD (Hypothesis) [[SonugaBarke2007,Posner2020]].`,"brain"],
 ["Defect of moral control",`George Still's 1902 term for the children he described, a concept broader than ADHD [[Still1902,Lange2010]].`,"history"],
 ["Delay aversion",`A preference to escape waiting, linked to the mesolimbic branch in the dual-pathway model (Hypothesis) [[SonugaBarke2002]].`,"dopamine"],
 ["Delay discounting",`Valuing a reward less the longer you must wait; steeper in ADHD, d = 0.43 [[Jackson2016]].`,"dopamine"],
 ["Dexmethylphenidate",`The more active d-enantiomer of methylphenidate (Focalin) [[FDA-Focalin,FDA-RitalinC]].`,"stimulants"],
 ["Dialectical behaviour therapy (DBT) skills",`A structured group skills programme adapted for adult ADHD, tested in COMPAS [[Philipsen2015,Hirvikoski2011]].`,"therapy"],
 ["Difference-in-differences",`A design comparing changes over time between groups; it showed fewer injuries in medicated Danish children [[Dalsgaard2015Injury]].`,"outcomes"],
 ["Digital therapeutic",`Software delivered as treatment, such as the video-game-like intervention in STARS-ADHD (Early evidence) [[Kollins2020]].`,"frontiers"],
 ["Discontinuation trial",`A trial that switches people on long-term medicine to placebo to test whether benefit persists [[Matthijssen2019]].`,"mta"],
 ["DIVA",`A semi-structured adult ADHD interview; DIVA 2.0 agreed 100% with CAADID diagnoses in 40 outpatients [[RamosQuiroga2019]].`,"scales"],
 ["Diversion",`Giving or selling a prescribed medicine to someone else; peers with prescriptions are the commonest source for misusing students [[Benson2015]].`,"safety"],
 ["Dopamine",`A catecholamine messenger for reward and motivation; the dopamine deficit theory links low frontostriatal signalling to ADHD (Hypothesis) [[Swanson2007]].`,"dopamine"],
 ["Dopamine transporter (DAT)",`The protein that recycles dopamine into the neuron; blocked by methylphenidate (ED50 0.25 mg/kg) [[Volkow1998]].`,"stimulants"],
 ["Drug holiday",`A planned break from medication, often over school holidays; NICE suggests one for catch-up growth when height is affected [[NICE2018H,Ibrahim2015]].`,"nursing"],
 ["DSM-5-TR",`The 2022 text revision of DSM-5 by the American Psychiatric Association [[APA2022DSM]].`,"criteria"],
 ["Dual-pathway model",`Two partly independent routes to ADHD: inhibitory control and delay aversion (Hypothesis) [[SonugaBarke2002]].`,"dopamine"],
 ["Elimination diet",`A restricted "few foods" diet; it helped some children in INCA, but most responders relapsed on challenge [[Pelsser2011]].`,"therapy"],
 ["Emotional dysregulation",`Quick, intense, poorly regulated emotion; found in about 25–45% of children and 30–70% of adults with ADHD, but not a DSM criterion [[Shaw2014Emotion]].`,"signs"],
 ["Encephalitis lethargica",`The 1917–1928 epidemic after which many surviving children showed hyperactivity and impulsivity, fuelling the brain-injury idea [[Lange2010]].`,"history"],
 ["EndeavorRx (AKL-T01)",`A video-game-like digital therapeutic granted FDA De Novo authorisation in 2020 (Early evidence) [[FDA-EndeavorRx,Kollins2020]].`,"frontiers"],
 ["English and Romanian Adoptees (ERA) study",`Follow-up of children adopted from depriving institutions; more than 6 months' deprivation was linked to persistent inattention/overactivity [[SonugaBarke2017,Kennedy2016]].`,"risk"],
 ["ENIGMA-ADHD",`An international MRI consortium; its mega-analysis found small subcortical differences, clearest in children [[Hoogman2017]].`,"brain"],
 ["Executive function",`Goal-directed control such as inhibition, working memory and planning; medium-sized weaknesses in ADHD (0.46–0.69) [[Willcutt2005]].`,"brain"],
 ["Extended release (ER)",`A formulation that releases medicine over many hours; Concerta's effects lasted through 12 hours in trials [[FDA-Concerta]].`,"release"],
 ["External trigeminal nerve stimulation (eTNS)",`Nightly forehead nerve stimulation; Monarch eTNS was authorised by the FDA in 2019 after a 62-child pilot; a larger UK sham-controlled trial found no effect on ADHD symptoms (Early evidence) [[FDA-MonarchETNS,McGough2019,Conti2026]].`,"frontiers"],
 ["Externalising problems",`Outward-directed difficulties such as disruptive behaviour; more typical of boys and men with ADHD [[Hinshaw2022]].`,"women"],
 ["Familial confounding",`When a shared family or genetic factor explains a link between an exposure and ADHD; sibling designs remove it, as with smoking in pregnancy [[Skoglund2014,Obel2016]].`,"risk"],
 ["Feigned ADHD",`Symptoms faked, for example to obtain stimulants; most self-report scales are insensitive to it [[Musso2014,Wolraich2019]].`,"scales"],
 ["Fetal alcohol spectrum disorder (FASD)",`Effects of heavy prenatal alcohol; ADHD occurs in 50% of people with FASD, about 10 times the expected rate [[Weyrauch2017]].`,"risk"],
 ["Fluctuating course",`Periods of remission and recurrence over time; the pattern of 63.8% of MTA participants into young adulthood [[Sibley2022]].`,"outcomes"],
 ["Frontoparietal network",`The executive control network; under-activated in ADHD during tasks [[Cortese2012]].`,"brain"],
 ["Genetic correlation (rg)",`The overlap in genetic influences on two traits; ADHD has rg −0.53 with years of schooling and 0.42 with major depression [[Demontis2019]].`,"genes"],
 ["Gene–environment correlation",`When genes shape the environment a child meets; a child's impulsivity can evoke hostile parenting (evocative correlation) [[Harold2013]].`,"genes"],
 ["Genome-wide association study (GWAS)",`A scan of common variants across the genome; the first ADHD GWAS found 12 loci in 20,183 cases [[Demontis2019]].`,"genes"],
 ["Growth chart",`A centile chart on which height and weight are plotted during ADHD medication [[NICE2018H]].`,"nursing"],
 ["Guanfacine ER",`An extended-release alpha-2A agonist, not a stimulant or controlled substance [[FDA-Intuniv]].`,"nonstim"],
 ["Half-life",`The time for plasma levels to halve; d-amphetamine from Adderall XR about 10 hours in adults [[FDA-AdderallXR]].`,"release"],
 ["HCN channels",`Ion channels on prefrontal spines that alpha-2A stimulation closes, strengthening working memory in monkeys [[Wang2007Cell]].`,"nonstim"],
 ["Healthy-user bias",`When people who take a medicine are healthier for other reasons, making it look protective [[Habel2011]].`,"safety"],
 ["Heritability",`The share of differences between people in a population linked to genetic differences; about 74% for ADHD in twin studies [[Faraone2019,Faraone2021]].`,"genes"],
 ["Hyperkinetic disorder",`The older WHO term for ADHD, used in ICD-10 (F90) and replaced by ADHD in ICD-11 [[Posner2020,TebartzVanElst2025]].`,"history"],
 ["Hyperkinetic Reaction of Childhood",`The DSM-II (1968) name, defined in two sentences focused on overactivity [[Lange2010,Epstein2013]].`,"history"],
 ["ICD-11",`The WHO classification in use from 1 January 2022 [[Reed2019ICD11]]; it lists ADHD as a neurodevelopmental disorder, code 6A05 [[Posner2020,TebartzVanElst2025]].`,"criteria"],
 ["IEP",`An Individualised Education Program, for US students whose ADHD impairs learning [[Wolraich2019]].`,"parenting"],
 ["Immediate release (IR)",`A formulation absorbed at once; IR methylphenidate peaks about 2 hours after a dose [[FDA-RitalinE]].`,"release"],
 ["In partial remission",`A DSM-5-TR specifier: full criteria met before, fewer for the past 6 months, with continuing impairment [[APA2022DSM]].`,"criteria"],
 ["Intent-to-treat analysis",`Analysing everyone in the group they were randomised to, as in the MTA [[MTA1999]].`,"mta"],
 ["Internalising problems",`Inward-directed difficulties such as anxiety and low mood; more common in girls with ADHD [[Hinshaw2022,Wolraich2019]].`,"women"],
 ["Inverted-U",`The dose-response shape of prefrontal function: best at moderate catecholamine levels [[Arnsten2009CNS,Gamo2010]].`,"dopamine"],
 ["Late-onset adult ADHD",`ADHD first meeting criteria in adulthood; 90% of adult cases in the Dunedin cohort had no childhood ADHD, and whether it is the same disorder is unresolved [[Moffitt2015,Posner2020]].`,"signs"],
 ["Life expectancy gap",`Estimated years of life lost; 6.78 for men and 8.64 for women with diagnosed ADHD in UK data (population estimates) [[ONions2025]].`,"outcomes"],
 ["Lisdexamfetamine",`A prodrug of dextroamphetamine, converted by red blood cells [[FDA-Vyvanse]].`,"stimulants"],
 ["MAOI",`Monoamine oxidase inhibitor; use within 14 days is a contraindication for stimulants, atomoxetine and viloxazine [[FDA-Concerta,FDA-Strattera,FDA-Qelbree]].`,"safety"],
 ["Masking",`Hiding symptoms through effortful coping; girls' coping strategies may mask ADHD and delay diagnosis [[Quinn2014]].`,"women"],
 ["Medication error",`A wrong or double dose; double dosing was 53.9% of US out-of-hospital ADHD medication errors [[DeCoster2023]].`,"nursing"],
 ["Medication management (MTA)",`Careful titration, usually methylphenidate three times a day, monthly visits and school contact [[MTA1999,Jensen2001MTA]].`,"mta"],
 ["Medication review",`At least once a year by a clinician with ADHD expertise, covering benefit, harms and the need to continue [[NICE2018H]].`,"nursing"],
 ["Melatonin",`A sleep-timing hormone; brought sleep onset about 27 minutes earlier in children with ADHD and insomnia, without changing behaviour [[VanderHeijden2007]].`,"living"],
 ["Mendelian randomisation (MR)",`Using genetic variants as natural experiments to test causation; MR suggests higher BMI raises ADHD risk (Early evidence) [[MartinsSilva2019]].`,"genes"],
 ["Methylphenidate",`A stimulant that blocks dopamine and noradrenaline reuptake; metabolised to inactive ritalinic acid [[FDA-RitalinC,FDA-RitalinE]].`,"stimulants"],
 ["Mindfulness-based cognitive therapy",`Group meditation-based therapy; reduced clinician-rated symptoms in 120 adults (Early evidence) [[Janssen2019]].`,"therapy"],
 ["Minimal brain dysfunction",`A 1960s label for children with problems in "control of attention, impulse or motor function", replacing the idea of minimal brain damage [[Lange2010]].`,"history"],
 ["Mixed amphetamine salts",`d- and l-amphetamine in a 3:1 ratio (Adderall) [[FDA-Adderall,FDA-AdderallXR]].`,"stimulants"],
 ["Mortality rate ratio (MRR)",`Death rate in one group divided by another; 2.07 for ADHD in Denmark [[Dalsgaard2015]].`,"outcomes"],
 ["MTA study",`The Multimodal Treatment Study of ADHD: 579 children, four arms, followed to young adulthood [[MTA1999,Sibley2022]].`,"mta"],
 ["National Pregnancy Registry for ADHD Medications",`A US registry that the labels point to for pregnancies exposed to ADHD medicines [[FDA-Concerta,FDA-Strattera]].`,"living"],
 ["NEBA",`An FDA-authorised EEG theta/beta assessment aid, for use only alongside other diagnostic methods [[FDA-NEBA]].`,"frontiers"],
 ["Negative control",`An exposure that should not matter, used to detect confounding; acetaminophen use before pregnancy was itself linked with ADHD [[Luo2026JAMAIM]].`,"risk"],
 ["Negative predictive value (NPV)",`The share of negative screens that are truly negative; 0.98 for the Vanderbilt parent scale in the community [[Bard2013Parent]].`,"scales"],
 ["Network meta-analysis",`A method comparing many treatments at once through shared comparators, as in Cortese 2018 (133 RCTs) [[Cortese2018]].`,"compare"],
 ["Neurofeedback",`Training brain-wave patterns with real-time feedback; no effect on probably blinded symptoms [[Westwood2025,Cortese2016]].`,"therapy"],
 ["Non-medical use",`Taking a stimulant without a prescription or not as prescribed; serious outcomes are most likely by non-oral routes [[Faraone2020NMU]].`,"safety"],
 ["Non-stimulant",`An ADHD medicine that is not a stimulant: atomoxetine, viloxazine, guanfacine and clonidine [[FDA-Strattera,FDA-Qelbree,FDA-Intuniv,FDA-ClonidineER]].`,"nonstim"],
 ["Noradrenaline (norepinephrine)",`A catecholamine that sharpens prefrontal signals via alpha-2A receptors [[Arnsten2009CNS]].`,"dopamine"],
 ["Noradrenaline transporter (NET)",`The noradrenaline reuptake protein; target of atomoxetine and viloxazine and also blocked by methylphenidate (ED50 0.14 mg/kg) [[Hannestad2010,FDA-Strattera]].`,"nonstim"],
 ["Nucleus accumbens",`The ventral striatum, the hub of the reward pathway; DAT and D2/D3 lower in untreated adults with ADHD [[Volkow2009]].`,"dopamine"],
 ["Obstructive sleep apnoea",`Blocked breathing in sleep; more common in children with ADHD and a look-alike to check for [[Cortese2009Sleep,Marcus2013CHAT]].`,"differential"],
 ["Omega-3 fatty acids",`Supplements with a small effect in children, larger with higher EPA doses and modest compared with medication [[Bloch2011]].`,"therapy"],
 ["Organisational skills training (OST)",`Teaching children to manage materials, assignments and time [[Abikoff2013]].`,"parenting"],
 ["OROS",`The osmotic-release system in Concerta, swallowed whole [[FDA-Concerta]].`,"release"],
 ["Overdiagnosis",`Diagnosing a condition where it brings more harm than benefit; evidence suggests extra cases tend toward milder symptoms [[Kazda2021]].`,"outcomes"],
 ["Parent-child interaction therapy",`A dyadic parent-and-child programme named by the AAP as evidence-based parent training [[Wolraich2019]].`,"parenting"],
 ["Partial remission",`Fewer symptoms than full criteria with continuing impairment; counting it raises persistence at 25 from about 15% to about 65% [[Faraone2006]].`,"outcomes"],
 ["Persistent adult ADHD",`Adult ADHD with childhood onset; 2.58% of adults worldwide in 2020 [[Song2021]].`,"what"],
 ["Polygenic",`Shaped by many variants of small effect; about 7,300 common variants account for 90% of ADHD's SNP heritability [[Demontis2026,Demontis2023]].`,"genes"],
 ["Polygenic score (PGS)",`A sum of many small genetic effects; it explains about 4–5.5% of variance in ADHD and is not a diagnostic test [[Li2021PGS,Demontis2019,Thapar2013]].`,"genes"],
 ["Positive predictive value (PPV)",`The share of positive screens that are true cases; it falls as prevalence falls [[Ustun2017]].`,"scales"],
 ["Predominantly hyperactive-impulsive presentation",`Meeting the threshold for hyperactivity-impulsivity but not inattention [[Posner2020]].`,"signs"],
 ["Predominantly inattentive presentation",`Meeting the threshold for inattention but not hyperactivity-impulsivity; the most common presentation in the community [[Willcutt2012]].`,"signs"],
 ["Prefrontal cortex",`The front of the brain that regulates attention, impulses and emotion; the right side is especially important [[Arnsten2009CNS]].`,"brain"],
 ["Prevalence",`The share of a population with a condition at a time; about 5.29% for children and adolescents worldwide [[Polanczyk2007]].`,"what"],
 ["Prodrug",`An inactive molecule converted to the active drug in the body, as lisdexamfetamine is [[FDA-Vyvanse]].`,"release"],
 ["Protein-truncating variant (PTV)",`A rare variant that cuts a protein short; MAP1A, ANO8 and ANK2 reached significance in ADHD [[Demontis2026]].`,"genes"],
 ["Psychoeducation",`Teaching about ADHD and its management; high doses within parent training went with worse parent outcomes (Early evidence) [[Dekkers2022]].`,"therapy"],
 ["PTBM",`Parent training in behaviour management, the AAP's term for behavioural parent training [[Wolraich2019]].`,"parenting"],
 ["QbTest",`A computerised attention and activity test; AUC 0.72, not for stand-alone diagnosis [[Bellato2024QbTest]].`,"scales"],
 ["Reaction-time variability",`Inconsistent response speed; raised in ADHD (g 0.76 in children) and reduced by stimulants [[Kofler2013]].`,"brain"],
 ["Reasonable adjustments",`The legal duty of employers and higher-education providers to prevent substantial disadvantage to disabled people [[NICE2018H]].`,"living"],
 ["Rebound hypertension",`A rise in blood pressure after abruptly stopping an alpha-2 agonist [[FDA-Intuniv,FDA-ClonidineER]].`,"nonstim"],
 ["Reinforcement",`Following wanted behaviour with something rewarding; more of it in parent training went with less negative parenting [[Dekkers2022]].`,"parenting"],
 ["Relative-age effect",`Higher diagnosis rates in the youngest children of a school year (RR 1.38) [[Frisira2025]].`,"risk"],
 ["Response inhibition",`Stopping an action already under way; measured by stop-signal reaction time, longer in ADHD [[Lijffijt2005,Willcutt2005]].`,"brain"],
 ["Resting tachycardia",`A fast resting heart rate; above 120 per minute on 2 occasions prompts dose reduction and referral under NICE [[NICE2018H]].`,"nursing"],
 ["Schedule II",`The US controlled-substance class of stimulants such as methylphenidate and amphetamine [[FDA-Concerta,FDA-AdderallXR]].`,"safety"],
 ["Self-controlled case series",`A within-person design comparing risk in exposed and unexposed periods of the same people [[Man2015]].`,"outcomes"],
 ["SENCO",`The special educational needs co-ordinator in an English school [[NICE2018H]].`,"living"],
 ["Sensitivity",`The share of people with ADHD whom a test flags; 68.7% for the ASRS 6-question screener [[Kessler2005]].`,"scales"],
 ["Severity specifier",`Mild, moderate or severe, by symptoms beyond the threshold and degree of impairment [[APA2022DSM,Epstein2013]].`,"criteria"],
 ["Sibling comparison design",`Comparing siblings who differ in an exposure, so shared genes and family factors are held constant [[Thapar2013,Ahlqvist2024]].`,"risk"],
 ["Sleep hygiene",`Routines and settings that support sleep; a brief programme gave an NNT of 3.9 in children with ADHD [[Hiscock2015]].`,"living"],
 ["Sluggish cognitive tempo",`A mainly inattentive pattern of daydreaming and mind-wandering, sometimes called a restrictive inattentive pattern [[Posner2020]].`,"differential"],
 ["SMART trial",`A sequential multiple-assignment randomised trial comparing behaviour-first and medication-first treatment [[Pelham2016]].`,"mta"],
 ["SNAP-IV",`A parent and teacher DSM symptom scale; high sensitivity, low specificity, best as a screening and outcome tool [[Hall2020SNAP,Bussing2008]].`,"scales"],
 ["SNP heritability",`Heritability captured by common variants; about 0.22 for ADHD, a third of the twin estimate [[Demontis2019]].`,"genes"],
 ["Social skills training",`Group teaching of peer skills; no clinically relevant effect in the Cochrane review [[Storebo2019]].`,"parenting"],
 ["Solriamfetol",`A wake-promoting agent studied for adult ADHD; a pilot RCT showed 45% vs 6.9% response (Early evidence) [[Surman2023]].`,"frontiers"],
 ["Specificity",`The share of people without ADHD whom a test correctly clears; 99.5% for the ASRS screener in validation [[Kessler2005]].`,"scales"],
 ["STAND",`Supporting Teens' Autonomy Daily, parent-teen skills therapy with motivational interviewing [[Sibley2016STAND,Sibley2021STAND]].`,"parenting"],
 ["Standardised mean difference (SMD)",`An effect size in standard-deviation units; amphetamines −1.02 against placebo in children [[Cortese2018]].`,"compare"],
 ["Stigma",`Negative beliefs about a condition; for ADHD, doubt about the diagnosis and scepticism about medication are main contributors [[Mueller2012]].`,"living"],
 ["Striatum",`The caudate, putamen and accumbens; smaller on average in children with ADHD in ENIGMA [[Hoogman2017]].`,"brain"],
 ["Struwwelpeter",`Heinrich Hoffmann's 1845 picture book, whose "Fidgety Philip" depicts restlessness [[Lange2010,Thome2004]].`,"history"],
 ["Symptomatic adult ADHD",`Adult ADHD symptoms regardless of childhood onset; 6.76% of adults worldwide in 2020 [[Song2021]].`,"what"],
 ["TAAR1",`Trace amine-associated receptor 1, which mediates part of amphetamine's action (Early evidence) [[Miller2011TAAR1]].`,"stimulants"],
 ["Target-trial emulation",`Designing an observational analysis to mimic a randomised trial; used to study starting ADHD medication [[Li2024JAMA,Zhang2025BMJ]].`,"outcomes"],
 ["tDCS",`Transcranial direct current stimulation; the largest sham-controlled adolescent trial showed no benefit (Early evidence) [[Westwood2023tDCS]].`,"frontiers"],
 ["Telehealth",`Remote care; about half of US adults with ADHD had used it for ADHD care [[Staley2024]].`,"frontiers"],
 ["Theta/beta ratio",`An EEG measure once proposed as a diagnostic marker; not reliable for diagnosis [[Arns2013,Saad2018]].`,"frontiers"],
 ["Tmax",`The time to peak plasma level; Adderall XR about 7 hours, IR about 3 hours [[FDA-AdderallXR]].`,"release"],
 ["Transdermal patch",`Daytrana delivers methylphenidate through the skin of the hip for up to 9 hours [[FDA-Daytrana]].`,"release"],
 ["Transition",`The move from child to adult services; NICE says it should usually be complete by 18 [[NICE2018H,Eke2020]].`,"living"],
 ["Twin study",`Comparing identical and non-identical twins to estimate heritability; register-diagnosed ADHD gave 0.88 in Swedish twins [[Larsson2014]].`,"genes"],
 ["Umbrella review",`A review of meta-analyses; one of 221 found no high-certainty long-term evidence for any ADHD intervention [[Gosling2025]].`,"frontiers"],
 ["Vanderbilt scales",`DSM-based parent and teacher rating scales that also screen oppositional, conduct and anxiety/depression problems [[Wolraich2003,Wolraich2013Teacher]].`,"scales"],
 ["Viloxazine ER",`A noradrenaline reuptake inhibitor with serotonin-receptor actions (Qelbree), with a boxed warning on suicidal thoughts [[FDA-Qelbree,Yu2020Viloxazine]].`,"nonstim"],
 ["VMAT2",`The vesicular monoamine transporter; amphetamine redistributes transmitter from vesicles to the cytosol [[Sulzer2005,Faraone2018Pharm]].`,"stimulants"],
 ["Within-person design",`Comparing the same person on and off treatment, removing stable confounders such as genes [[Chen2014BMJ]].`,"outcomes"],
 ["Working memory",`Holding information in mind; effects larger for spatial (0.85–1.06) than verbal tasks in ADHD [[Martinussen2005]].`,"brain"],
 ["World Federation of ADHD consensus",`The 2021 international statement of 208 evidence-based conclusions from 80 authors in 27 countries [[Faraone2021]].`,"what"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold α to a and hyphens away, so 'alpha-2a' and 'a2a' style searches match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/α/g,'a').replace(/[-–]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SR_AREAN={A:'Epidemiology, presentation across the lifespan & history',B:'Causes: genetics & environmental risk',C:'Neurobiology: brain networks, catecholamines & how the medicines act',D:'Diagnosis: criteria, rating scales, assessment & differential',E:'Pharmacological treatment: stimulants and non-stimulants',F:'Non-pharmacological treatment: behavioural, psychological, school & combined',G:'Course, comorbidity, outcomes & research toward better treatment',H:'Living, family, school/work & nursing'};
const SR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SR_svc=s=>s.unverified?[]:SR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SR_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(SR_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SR_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SR_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SR_link(s)?`<a href="${esc(SR_link(s))}" target="_blank" rel="noopener">${esc(SR_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
