/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding BPD",2:"Part 2 · Diagnosis",3:"Part 3 · Psychotherapies",4:"Part 4 · Medication, safety & research",5:"Part 5 · Course & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding BPD ---- */
 [1,`How common is BPD in the general population?`,`Roughly 1–3% of adults; the median point prevalence across studies is about 1% [[Ellison2018,Tomko2014]].`],
 [1,`How common is BPD in psychiatric services?`,`About 10–12% of psychiatric outpatients and about 20–22% of psychiatric inpatients [[Ellison2018]].`],
 [1,`Why are clinical samples about 75% female?`,`Mainly sampling (referral) bias: community samples show near-equal rates in men and women [[Skodol2003,Grant2008]].`],
 [1,`When does BPD usually begin?`,`In adolescence, after about age 12. It can be diagnosed from about age 11 and affects about 3% of adolescents in the community [[Bohus2021,Guile2018]].`],
 [1,`What are the three parts of emotional vulnerability in Linehan's model?`,`High sensitivity, high intensity (reactivity) and a slow return to baseline [[Crowell2009,Kuo2009]].`],
 [1,`What does daily-life (EMA) mood data typically show in BPD?`,`Sudden large drops from positive mood: 48% of drops from a very positive mood reached negative mood, against 9% in controls [[EbnerPriemer2007PsycholMed]].`],
 [1,`Is affective instability specific to BPD?`,`No. It is also heightened in PTSD and bulimia nervosa, so it is transdiagnostic [[Santangelo2014]]. Self-esteem instability may be more BPD-specific [[Kockler2022]].`],
 [1,`In the lab, is the body's stress response much bigger in BPD?`,`Physiological hyperreactivity is null to small in meta-analysis; the big difference is how negatively stimuli are rated [[Bortolla2020]]. Baseline negative emotion is high and resting RSA low [[Kuo2009]].`],
 [1,`How strongly is rejection sensitivity linked to BPD?`,`Pooled r = 0.326, and r = 0.655 for clinical vs control comparisons [[Foxhall2019]]. In the Cyberball game, people with BPD feel excluded even when included [[Renneberg2012,Staebler2011PsycholMed]].`],
 [1,`Why does self-injury so often become a habit?`,`Its most common function is short-lived relief from intense negative emotion. Daily-life data show the negative emotion rising again over the following hours [[Klonsky2007,Houben2017]].`],
 [1,`What heritability did the two classic twin studies of BPD report?`,`About .69 in Torgersen 2000 (interview, 221 pairs) and 42% in Distel 2008 (self-report, 5,496 twins, three countries) [[Torgersen2000,Distel2008]].`],
 [1,`Which environment matters more in twin studies: shared or unique?`,`Unique (non-shared) environment explains most of the non-genetic variance, not the family environment siblings share [[Distel2008,Skoglund2021]].`],
 [1,`What did the largest BPD GWAS find?`,`Streit 2026: 12,339 cases and 11 loci. SNP heritability is about 17%, and polygenic scores explain 4.6% of the variance, too little to predict for an individual [[Streit2026]].`],
 [1,`How strong is the link between childhood adversity and BPD?`,`OR 13.91 against non-clinical controls, with the largest effects for emotional abuse and neglect [[Porter2020]]. Most children who are hurt do not develop BPD [[Porter2020,Zanarini1997]].`],
 [1,`Is childhood sexual abuse necessary for BPD?`,`No: it is "neither necessary nor sufficient". Caretaker neglect is a key risk factor [[Zanarini1997]].`],
 [1,`What does the biosocial model say?`,`BPD grows from emotional vulnerability interacting over time with an invalidating environment, one that is intolerant of a child's private emotional experience [[Crowell2009]].`],
 [1,`What volume differences did a meta-analysis find in the BPD brain?`,`Hippocampus about 11% and amygdala about 13% smaller on average [[Ruocco2012]]. Scans cannot diagnose BPD; small samples limit replication [[Marek2022,Button2013]].`],
 [1,`Is the mentalizing difficulty in BPD large or small?`,`Very large for reflective functioning (d = 1.68) but modest for theory of mind (d = 0.36) [[Bora2021]].`],
 /* ---- Part 2: diagnosis ---- */
 [2,`How many DSM-5-TR criteria are needed for BPD, and how many combinations are possible?`,`5 or more of 9, which gives 256 possible combinations, 126 of them with exactly 5 [[APA2022,Mulay2019]].`],
 [2,`Under which criterion is suicidal or self-harming behaviour scored?`,`Only criterion 5. It is never counted under criterion 1 (abandonment) or 4 (impulsivity) [[APA2022,Kaess2025]].`],
 [2,`How long do the mood shifts of criterion 6 usually last?`,`Usually a few hours and only rarely more than a few days [[APA2022,Kaess2025]]. Sustained mood episodes point to bipolar disorder [[Paris2015]].`],
 [2,`What is criterion 9?`,`Transient, stress-related paranoid ideation or severe dissociative symptoms [[APA2022]].`],
 [2,`Which criterion has the highest sensitivity?`,`Affective instability: sensitivity 92.8% and negative predictive value 99%, so its absence nearly rules BPD out [[Zimmerman2017BJP]].`],
 [2,`Which features best separate BPD from bipolar disorder?`,`Abandonment fears and identity disturbance. Affective instability is transdiagnostic [[Bayes2020]].`],
 [2,`What are the numbers for the MSI-BPD?`,`10 yes/no items, cut-off 7, sensitivity 0.81, specificity 0.85 [[Zanarini2003MSI]].`],
 [2,`What does the ZAN-BPD measure?`,`Change in BPD: 9 criteria each rated 0–4 by a clinician, total 0–36, over a 1-week window [[Zanarini2003ZAN]].`],
 [2,`Which BSL-23 mean score best separated BPD from other patients?`,`1.50, on a scale whose mean item score runs from 0 to 4 [[Kleindienst2020]].`],
 [2,`What are the ICD-11 personality codes?`,`6D10 personality disorder (.0 mild, .1 moderate, .2 severe), 6D11.0–6D11.4 trait domains, 6D11.5 borderline pattern, and QE50.7 personality difficulty [[Sharan2023]].`],
 [2,`Name the five ICD-11 trait domains.`,`Negative Affectivity, Detachment, Dissociality, Disinhibition and Anankastia. There is no psychoticism domain [[Bach2018BMC,Bach2018ANZJP]].`],
 [2,`What extra rule applies to diagnosing BPD under 18?`,`The features must have lasted at least 1 year [[APA2022,Kaess2025]].`],
 [2,`What are Cloitre's four features that separate BPD from complex PTSD?`,`Abandonment fears, unstable self, unstable relationships and impulsiveness [[Cloitre2014]]. In complex PTSD the self-concept is stably negative; in BPD it alternates [[Frost2020]].`],
 [2,`How often do hallucinations occur in BPD?`,`In about 43% of outpatients, without the negative symptoms or disorganisation typical of primary psychosis [[Niemantsverdriet2017]].`],
 [2,`How often have psychiatrists withheld a BPD diagnosis?`,`57% of 134 surveyed US psychiatrists had at some point not disclosed it, mostly because of stigma or uncertainty [[Sisti2016]]. Withholding is now generally seen as unethical [[Sims2022]].`],
 /* ---- Part 3: psychotherapies ---- */
 [3,`Name the four DBT skills modules.`,`Mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness [[Chapman2006DBT]].`],
 [3,`What are the four parts of standard DBT?`,`Individual therapy, a skills group, between-session phone coaching and a therapist consultation team [[LinehanWilks2015]].`],
 [3,`What is the DBT target hierarchy?`,`Life-threatening behaviour first, then therapy-interfering behaviour, then quality-of-life-interfering behaviour [[Chapman2006DBT]].`],
 [3,`What is a chain analysis?`,`Working out, step by step, what led up to a target behaviour and which consequences may keep it going, then finding more skilful alternatives [[Chapman2006DBT,Lynch2006DBT]].`],
 [3,`What did Linehan 2006 show?`,`DBT halved the likelihood of a suicide attempt compared with expert community therapy (HR 2.66) over 2 years [[Linehan2006]].`],
 [3,`Which DBT component drives the extra fall in self-injury?`,`Skills training, in the Linehan 2015 component trial [[Linehan2015]].`],
 [3,`How did DBT compare with general psychiatric management in McMain 2009?`,`Equal outcomes over 1 year: "No significant differences across any outcomes" [[McMain2009]].`],
 [3,`Does DBT have to last 12 months?`,`Not for self-harm: in McMain 2022, 6 months of DBT was non-inferior to 12 months [[McMain2022]].`],
 [3,`Does DBT help suicidal adolescents?`,`Yes: McCauley 2018 found fewer suicide attempts after DBT than supportive therapy (OR 0.30) [[McCauley2018]].`],
 [3,`What are MBT's three pre-mentalizing modes?`,`Psychic equivalence, pretend mode and teleological mode [[Chung2026]].`],
 [3,`What did Bateman 2008 report at 8 years?`,`13% vs 87% still met BPD criteria after MBT by partial hospitalisation vs usual care [[Bateman2008]].`],
 [3,`Which schema modes characterise BPD?`,`Detached protector, punitive parent, abandoned/abused (vulnerable) child and angry/impulsive child, with a weak healthy adult [[Arntz2005Modes]].`],
 [3,`Schema therapy or TFP: which did better in Giesen-Bloo 2006?`,`Schema therapy, on recovery over 3 years (RR 2.18) and with less dropout [[GiesenBloo2006]].`],
 [3,`Which outcome reached the clinically meaningful threshold in Cochrane 2020?`,`Only BPD severity (SMD −0.52; moderate certainty) for BPD-tailored psychotherapy vs usual care [[Storebo2020]].`],
 [3,`Is one psychotherapy for BPD best?`,`None has been shown superior to another. APA 2024 recommends (1B) a structured, evidence-supported psychotherapy [[APA2024Guideline,Leichsenring2024WP]].`],
 [3,`How common is dropout from BPD psychotherapy, and when?`,`About 1 in 4 (22.3–28.2%), peaking early in treatment [[Iliakis2021,Arntz2023Dropout]].`],
 [3,`What is STEPPS?`,`A 20-week add-on group programme with a "systems" component that involves the person's support network [[Blum2008STEPPS]].`],
 /* ---- Part 4: medication, safety & research ---- */
 [4,`Is any medicine approved for BPD?`,`No. No FDA label lists BPD, and all drug use for BPD is off-label [[FDA-LabelSearch2026,StoffersWinterling2022]].`],
 [4,`What did the 2022 Cochrane review of medicines find?`,`46 RCTs: no medicine beat placebo on BPD severity, self-harm, suicide-related outcomes or functioning; evidence mostly very low certainty [[StoffersWinterling2022]].`],
 [4,`What does NICE CG78 say about drugs for BPD?`,`Do not use drugs specifically for BPD or its individual symptoms, and do not use antipsychotics medium- or long-term [[NICE2009]].`],
 [4,`How long does NICE CG78 allow crisis sedation?`,`Short-term only, usually stopped within 1 week [[NICE2009]].`],
 [4,`What does APA 2024 say about medicines in BPD?`,`(2C) Time-limited, aimed at a measurable target symptom and adjunctive to psychotherapy; (1C) reviewed and reconciled at least every 6 months [[APA2024Guideline]].`],
 [4,`What did the LABILE trial find?`,`Lamotrigine was no better than placebo at 52 weeks (ZAN-BPD 11.3 vs 11.5) [[Crawford2018LABILE]].`],
 [4,`What was the trade-off with olanzapine 5–10 mg/day?`,`A modest ZAN-BPD advantage, with about 3 kg weight gain in 12 weeks [[Zanarini2011Olanzapine]].`],
 [4,`How common is polypharmacy in inpatients with BPD?`,`About 90% receive psychotropics and over half receive three or more [[Bridler2015]].`],
 [4,`Why is valproate a particular concern?`,`About 10% major malformation risk in exposed pregnancies and lower child IQ; the label says avoid in people who could become pregnant unless alternatives fail [[Battino2024EURAP,FDA-Depakote]].`],
 [4,`Why are benzodiazepines not generally recommended in BPD?`,`Disinhibition, misuse and dependence [[APA2024Guideline]]; in Swedish register data they had the highest hazard for suicidal behaviour (HR 1.61) [[Lieslehto2023Suicide]].`],
 [4,`About what share of people with BPD die by suicide (population statistics)?`,`The meta-analytic estimate is 6%; long cohorts report 5.9–10.3% [[Lak2025,Temes2019,Paris2001]]. Suicidal behaviour declines markedly over time [[Soloff2019Suicidal,Zanarini2008SelfHarm]].`],
 [4,`Why does NICE NG225 advise against suicide risk scales?`,`They cannot predict suicide: pooled positive predictive value only 5.5% [[Carter2017PPV]]. Do not use them, or low/medium/high stratification, to decide treatment [[NICE2022NG225]].`],
 [4,`How much does safety planning reduce suicidal behaviour?`,`By about 43% (RR 0.57; number needed to treat 16) [[Nuij2021]].`],
 [4,`Did brief admission by self-referral reduce hospital days?`,`No, compared with usual care in its RCT [[Westling2019BA]].`],
 [4,`What is the Papageno effect?`,`Stories of people coping with suicidal thoughts without acting on them are linked with fewer suicides (Early evidence) [[Niederkrotenthaler2010]].`],
 [4,`How did brexpiprazole do in its multicentre phase 2 trial?`,`It missed its primary endpoint, and akathisia was 14.0% vs 1.2% on placebo [[Rothman2024Brexpiprazole]].`],
 [4,`What did the EPADIP-BPD trial of a digital programme find?`,`The schema-therapy-based app priovi improved BSL-23 scores more than self-help material at 3 months (d = 0.24) (Early evidence) [[Assmann2025]].`],
 /* ---- Part 5: course & living ---- */
 [5,`What were the MSAD remission rates over 6 years?`,`34.5% at 2 years, 49.4% at 4 and 68.6% at 6; only 5.9% of remitters had a recurrence [[Zanarini2003Course]].`],
 [5,`Remission vs recovery at 16 years in MSAD?`,`99% had a 2-year remission, but only 60% had a 2-year recovery (remission plus good social and vocational functioning) [[Zanarini2012]].`],
 [5,`Is recovery stable once reached?`,`Less so than remission: 50% recovered by 10 years, and 34% of them lost it [[Zanarini2010Recovery]].`],
 [5,`What did CLPS find over 10 years?`,`85% remitted and 12% relapsed, but social functioning stayed severely impaired [[Gunderson2011]].`],
 [5,`Which symptoms fade first, and which last longest?`,`Impulsive (acute) symptoms such as self-harm fade fastest; affective (temperamental) symptoms such as chronic anger and emptiness persist longest [[Zanarini2007Subsyndromal,Zanarini2016Fluidity]].`],
 [5,`Which comorbidity best predicts remission and recovery?`,`The absence of a substance use disorder [[Zanarini2004AxisI,Zanarini2024Comorbid]].`],
 [5,`What happens to comorbid disorders when BPD remits?`,`They decline too; when BPD does not remit, they persist [[Zanarini2004AxisI]].`],
 [5,`What physical health problems are linked with not remitting?`,`Obesity, diabetes, osteoarthritis, chronic pain conditions and costly medical care [[Frankenburg2004Medical,Keuroghlian2013Medical]].`],
 [5,`How heavy is the burden on carers?`,`About half a standard deviation higher than for carers of people with other serious mental illnesses [[Bailey2013]].`],
 [5,`What is Family Connections, and how strong is its evidence?`,`A 12-week DBT-based programme led by trained family members. It reduced burden and grief in uncontrolled and controlled studies but was not superior to active usual care in its one RCT [[Hoffman2005,Flynn2017,Guillen2024]].`],
 [5,`Does more knowledge about BPD always help families?`,`Not alone: in one study it went with more burden and hostility, so the source and accuracy of information matter [[Hoffman2003]].`],
 [5,`Which profession holds the poorest attitudes toward BPD, and what does training change?`,`Nurses; training effects are largest for knowledge, not feelings [[Dickens2016Interventions]].`],
 [5,`What did Safewards achieve?`,`15% fewer conflict events and 23.2% fewer containment events on acute wards [[Bowers2015]].`],
 [5,`What does NICE CG78 advise before an acute admission?`,`Offer a crisis resolution or home treatment team first, and agree the length and purpose of any admission in advance [[NICE2009]].`],
 [5,`What did the MOBY trial show in young people?`,`A dedicated early-intervention service (HYPE) improved attendance and completion, but specialist psychotherapy added no functional benefit [[Chanen2022MOBY]].`],
 [5,`What should a clinician ask about intimate partner violence in BPD?`,`Safety in both directions: BPD and antisocial personality disorder show the most robust links with both perpetration and victimisation [[Collison2021]].`],
 /* ---- Part 6: history ---- */
 [6,`Who first described a "border line" group?`,`Adolph Stern, in 1938, between neurosis and psychosis [[Stern1938]].`],
 [6,`What did Kernberg describe in 1967?`,`Borderline personality organisation: primitive defences such as splitting, identity diffusion and lapses in reality testing [[Kernberg1967,Gunderson2009Ontogeny]].`],
 [6,`When did BPD enter DSM, and what made it possible?`,`DSM-III in 1980, after Spitzer's 1979 study split borderline personality from schizotypal ("borderline schizophrenia") [[Spitzer1979,Leichsenring2024WP]].`],
 [6,`What study began the "recovery era"?`,`MSAD's 2003 report: 68.6% remitted by 6 years, with few recurrences [[Zanarini2003Course]].`],
 [6,`What did ICD-11 change for personality disorder in 2022?`,`It replaced the named types with one severity spectrum plus trait domains, "the most radical change" in the classification's history, with an optional borderline pattern [[Tyrer2019]].`]
];
const RV_MN=[
 ["R-S-A-I + 9","memory aid",`The DSM-5-TR definition names instability in <b>R</b>elationships, <b>S</b>elf-image and <b>A</b>ffects, plus marked <b>I</b>mpulsivity [[APA2022,Kaess2025]]. Hang the criteria on it: R = 1, 2; S = 3, 7; A = 6, 8; I = 4, 5; and 9 for stress-related paranoia or dissociation.`],
 ["5 of 9 makes 256","memory aid",`126 + 84 + 36 + 9 + 1 = 256 ways to meet 5 or more of 9 criteria, so two people can share only one criterion [[Mulay2019]].`],
 ["Self-harm lives at 5","memory aid",`Suicidal or self-harming behaviour is scored only under criterion 5, never under 1 or 4 [[APA2022,Kaess2025]].`],
 ["Sensitive, strong, slow","memory aid",`The three parts of emotional vulnerability in the biosocial model: high sensitivity, high intensity and a slow return to baseline [[Crowell2009,Kuo2009]].`],
 ["My Emotions Deserve Interest","memory aid",`The four DBT skills modules: <b>M</b>indfulness, <b>E</b>motion regulation, <b>D</b>istress tolerance, <b>I</b>nterpersonal effectiveness [[Chapman2006DBT]].`],
 ["Life, therapy, quality","memory aid",`DBT's target hierarchy: life-threatening behaviour, then therapy-interfering, then quality-of-life-interfering behaviour [[Chapman2006DBT]].`],
 ["PET the modes","memory aid",`MBT's three pre-mentalizing modes: <b>P</b>sychic equivalence, pr<b>E</b>tend mode, <b>T</b>eleological mode [[Chung2026]].`],
 ["One protector, one parent, two children, a weak adult","memory aid",`Schema modes in BPD: detached protector, punitive parent, vulnerable child and angry/impulsive child; the healthy adult is weak [[Arntz2005Modes]].`],
 ["Negative, three Ds, A","memory aid",`ICD-11 trait domains: <b>N</b>egative Affectivity, <b>D</b>etachment, <b>D</b>issociality, <b>D</b>isinhibition, <b>A</b>nankastia [[Bach2018BMC]].`],
 ["Signs, skills, people, numbers","memory aid",`A crisis or safety plan names warning signs and triggers, coping strategies that work, people to contact and how to reach services out of hours [[NICE2009,Stanley2018ED]].`]
];
const RV_CRIT=[
 /* n, two-line label, row in the grouped layout (0 R,1 S,2 A,3 I,4 stress), slot */
 [1,['Abandonment','fears'],0,0],[2,['Unstable','relationships'],0,1],[3,['Identity','disturbance'],1,0],
 [4,['Impulsivity','2+ areas'],3,0],[5,['Suicidal or','self-harming'],3,1],[6,['Affective','instability'],2,0],
 [7,['Chronic','emptiness'],1,1],[8,['Intense','anger'],2,1],[9,['Paranoia or','dissociation'],4,0]
];
const RV_ROWS=[['R','Relationships','--other'],['S','Self-image','--self'],['A','Affects','--storm'],['I','Impulsivity','--med'],['9','Stress','--dx']];
const RV_STEPS=[
 {from:0,at:.13,k:'Definition',t:'Four instabilities',txt:`DSM-5-TR defines BPD as a pervasive pattern of instability of interpersonal relationships, self-image and affects, and marked impulsivity, beginning by early adulthood and present in a variety of contexts, shown by 5 or more of 9 criteria [[APA2022,Kaess2025]].`,pt:'BPD is about things that keep shifting: relationships, how you see yourself, feelings, and acting on impulse.',hook:'Instability of relationships, self-image and affects, plus marked impulsivity; onset by early adulthood.'},
 {from:.2,at:.33,k:'R-S-A-I + 9',t:'Sort the nine',txt:`As a memory aid, hang the nine criteria on the four words: relationships (1 abandonment, 2 unstable relationships), self (3 identity, 7 emptiness), affects (6 affective instability, 8 anger), impulsivity (4 impulsivity, 5 suicidal or self-harming behaviour), and criterion 9, transient stress-related paranoid ideation or severe dissociation [[APA2022,Kaess2025]]. The grouping is for study only: statistically the nine criteria form one coherent construct [[Sanislow2002]].`,pt:'Five short words can help you remember all nine criteria.',hook:'Criterion 9 = transient, stress-related paranoid ideation or severe dissociative symptoms.'},
 {from:.4,at:.53,k:'5 of 9',t:'256 ways in',txt:`Any 5 of 9 can be met in 256 combinations: 126 with exactly 5 criteria, 84 with 6, 36 with 7, 9 with 8 and 1 with all 9 [[Mulay2019]]. Even so, affective instability and identity disturbance were the most central symptoms in network analyses of three samples [[Peters2023]].`,pt:'There are many different ways to have BPD, so no two people look exactly alike.',hook:'5 of 9 = 256 combinations; 126 of them use exactly 5 criteria.'},
 {from:.6,at:.72,k:'Two people',t:'Sharing one criterion',txt:`Two people can both meet the threshold yet share only one criterion: one meets criteria 1–5, the other 5–9 [[Mulay2019]]. This heterogeneity is one reason ICD-11 grades personality disorder by severity first and adds an optional borderline pattern [[Tyrer2019,Bach2018BMC]].`,pt:'Two people with the same diagnosis may have very different struggles, so care is planned around the person.',hook:'Polythetic criteria mean heterogeneity: criteria 1–5 and 5–9 overlap only at 5.'},
 {from:.79,at:.94,k:'Count once',t:'Where self-harm counts',txt:`Suicidal or self-harming behaviour is scored only under criterion 5, never under criterion 1 or 4 [[APA2022,Kaess2025]]. Affective instability has the highest sensitivity of the nine (92.8%) and a negative predictive value of 99%, so asking about it works as a one-question screen [[Zimmerman2017BJP]]. A screen is not a diagnosis: that needs a careful interview [[Chanen2008,Zanarini2003MSI]].`,pt:'Self-harm is a sign that someone needs support now. Help works, and recovery is common [[Zanarini2012]].',hook:'Absent affective instability nearly rules out BPD (NPV 99%).'}
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
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag accent">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: R-S-A-I + 9 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const COMB=[[5,126],[6,84],[7,36],[8,9],[9,1]];
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    /* layout: L = the tile panel, R = the explainer panel */
    const L=N?{x:10,y:8,w:380}:{x:10,y:10,w:356},R=N?{x:16,y:352,w:368,h:240}:{x:384,y:24,w:322,h:340};
    const TW0=N?118:112,TW1=N?164:150,TH0=N?52:58,TH1=40,lblW=40,FS=N?11:9.8;
    const gridPos=k=>{const c=k%3,r=Math.floor(k/3);return [L.x+6+c*(TW0+(N?6:4)),L.y+50+r*(TH0+14)]};
    const grpPos=(row,slot)=>[L.x+lblW+slot*(TW1+6),L.y+40+row*(TH1+18)];
    /* phase visibilities */
    const ph=[0,.17,.37,.57,.76,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=k=>k===0?1-ramp(t,ph[1]-.02,ph[1]+.015):vis(k);
    const sort=ease(ramp(t,.19,.33));
    const pA=ramp(t,.6,.66),pB=ramp(t,.65,.71),fin=ramp(t,.79,.86),fin2=ramp(t,.86,.93);
    let s='';
    /* row labels for the grouped layout */
    RV_ROWS.forEach(([ch,nm,col],r)=>{const y=L.y+40+r*(TH1+18),op=sort,TH=TH1;
      if(op>0)s+=`<g style="opacity:${f1(op)}"><circle cx="${L.x+18}" cy="${y+TH/2}" r="15" style="fill:var(${col});opacity:.16"/><text class="t-big t-mid" x="${L.x+18}" y="${y+TH/2+6}" style="fill:var(${col})">${ch}</text></g>`});
    /* tiles */
    RV_CRIT.forEach(([n,lab,row,slot],k)=>{
      const g0=gridPos(k),g1=grpPos(row,slot),x=lerp(g0[0],g1[0],sort),y=lerp(g0[1],g1[1],sort),TW=lerp(TW0,TW1,sort),TH=lerp(TH0,TH1,sort);
      const col=RV_ROWS[row][2];
      const inA=n<=5,inB=n>=5;
      let fill='var(--panel)',stroke='var(--line)',sw=1.2;
      if(sort>.5){fill='var(--panel)';stroke=`var(${col})`}
      const aOn=inA?pA:0,bOn=inB?pB:0;
      const hot5=n===5?fin:0,hot6=n===6?fin2:0;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:${fill};stroke:${stroke};stroke-width:${sw}"/>`;
      if(hot5>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:var(--storm-soft);stroke:var(--storm);stroke-width:2.4;opacity:${f1(hot5)}"/>`;
      if(hot6>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(TW)}" height="${f1(TH)}" rx="8" style="fill:var(--calm-soft);stroke:var(--calm);stroke-width:2.4;opacity:${f1(hot6)}"/>`;
      s+=`<circle cx="${f1(x+14)}" cy="${f1(y+TH/2)}" r="10" style="fill:var(${sort>.5?col:'--brand'});opacity:.9"/><text class="t-lbl t-mid" x="${f1(x+14)}" y="${f1(y+TH/2+4.5)}" style="fill:var(--on-brand);font-size:12px">${n}</text>`;
      s+=`<text class="t-xs" x="${f1(x+29)}" y="${f1(y+TH/2-2)}" style="fill:var(--ink);font-size:${FS}px">${lab[0]}</text><text class="t-xs" x="${f1(x+29)}" y="${f1(y+TH/2+10)}" style="font-size:${FS}px">${lab[1]}</text>`;
      /* person markers: A in --self, B in --other */
      if(aOn>0)s+=`<circle cx="${f1(x+TW-10)}" cy="${f1(y+10)}" r="6" style="fill:var(--self);opacity:${f1(aOn*(1-fin))}"/><text class="t-xs t-mid" x="${f1(x+TW-10)}" y="${f1(y+13)}" style="fill:var(--on-brand);font-size:8px;opacity:${f1(aOn*(1-fin))}">A</text>`;
      if(bOn>0)s+=`<circle cx="${f1(x+TW-10)}" cy="${f1(y+TH-10)}" r="6" style="fill:var(--other);opacity:${f1(bOn*(1-fin))}"/><text class="t-xs t-mid" x="${f1(x+TW-10)}" y="${f1(y+TH-7)}" style="fill:var(--on-brand);font-size:8px;opacity:${f1(bOn*(1-fin))}">B</text>`;
    });
    /* title over the tile panel */
    const ttl=sort<.5?'The nine DSM-5-TR criteria':'Sorted with the memory aid R-S-A-I + 9';
    s+=`<text class="t-lbl" x="${L.x+6}" y="${L.y+22}">${ttl}</text>`;
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})">`;
    s+=`<rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    /* phase 0: the four words */
    const a0=v0(0);
    if(a0>0){s+=`<g style="opacity:${f1(a0)}"><text class="t-sm" x="16" y="28">A pervasive pattern of instability in</text>`;
      RV_ROWS.slice(0,4).forEach(([ch,nm,col],k)=>{const on=ramp(t,.02+k*.025,.05+k*.025),y=(N?54:62)+k*(N?32:44);
        s+=`<g style="opacity:${f1(.2+.8*on)}"><circle cx="30" cy="${y}" r="${N?13:15}" style="fill:var(${col});opacity:.18"/><text class="t-big t-mid" x="30" y="${y+6}" style="fill:var(${col})">${ch}</text><text class="t-big" x="54" y="${y+6}">${k===3?'marked Impulsivity':nm}</text></g>`});
      s+=`<text class="t-sm" x="16" y="${N?190:256}">begins by early adulthood,</text><text class="t-sm" x="16" y="${N?206:274}">across contexts: 5 or more of 9</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="${300}">criterion wording shortened for study</text>`;s+='</g>'}
    /* phase 1: memory aid */
    const a1=vis(1);
    if(a1>0){s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="30">Memory aid</text>`;
      RV_ROWS.forEach(([ch,nm,col],k)=>{const x=16+k*(N?46:44);s+=`<text class="t-big" x="${x}" y="${N?66:72}" style="fill:var(${col});font-size:26px">${ch}${k<3?' -':k===3?' +':''}</text>`});
      const lines=N?['R relationships: 1, 2','S self: 3, 7','A affects: 6, 8','I impulsivity: 4, 5','9 stress: paranoia, dissociation']:['R  relationships: criteria 1 and 2','S  self: criteria 3 and 7','A  affects: criteria 6 and 8','I  impulsivity: criteria 4 and 5','9  stress-related paranoia','    or dissociation'];
      lines.forEach((l,k)=>{s+=`<text class="t-sm" x="16" y="${(N?96:110)+k*(N?22:26)}" style="fill:var(--ink)">${l}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?224:300}">a study grouping, not a DSM category</text></g>`}
    /* phase 2: combinations bar chart */
    const a2=vis(2);
    if(a2>0){const bx=N?40:44,by=N?186:262,bw=N?54:46,maxH=N?120:170,grow=ramp(t,.4,.53);let tot=0;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="28">Ways to meet 5 or more of 9</text>`;
      s+=`<line x1="${bx-8}" x2="${bx+5*(bw+8)}" y1="${by}" y2="${by}" class="axis"/>`;
      COMB.forEach(([k,n],j)=>{const g=clamp(grow*5-j),h=maxH*n/126*g,x=bx+j*(bw+8);tot+=Math.round(n*g);
        s+=`<rect x="${x}" y="${f1(by-h)}" width="${bw}" height="${f1(h)}" rx="4" style="fill:var(--brand);opacity:${f1(.35+.5*(j===0?1:.7))}"/>`;
        s+=`<text class="t-xs t-mid" x="${x+bw/2}" y="${by+14}">${k} of 9</text>`;
        if(g>0)s+=`<text class="t-sm t-mid" x="${x+bw/2}" y="${f1(by-h-5)}" style="fill:var(--ink)">${Math.round(n*g)}</text>`});
      s+=`<text class="t-big t-end" x="${R.w-16}" y="28" style="fill:var(--brand);font-size:22px">${tot}</text><text class="t-xs t-end" x="${R.w-16}" y="44">combinations</text>`;
      s+=`<text class="t-xs" x="16" y="${by+32}">126 + 84 + 36 + 9 + 1 = 256</text></g>`}
    /* phase 3: two people */
    const a3=vis(3);
    if(a3>0){const y0=N?40:52;s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="28">Two people, one diagnosis</text>`;
      [['A','--self',[1,2,3,4,5],pA],['B','--other',[5,6,7,8,9],pB]].forEach(([nm,col,cs,on],j)=>{const y=y0+j*(N?78:96);
        s+=`<g style="opacity:${f1(.15+.85*on)}">`+person(30,y,40,`var(${col})`)+`<text class="t-lbl" x="56" y="${y+16}">Person ${nm}</text>`;
        cs.forEach((c,q)=>{const cx=62+q*(N?30:34);s+=`<circle cx="${cx}" cy="${y+38}" r="12" style="fill:var(${c===5?'--storm-soft':'--panel'});stroke:var(${col});stroke-width:1.8"/><text class="t-lbl t-mid" x="${cx}" y="${y+42.5}">${c}</text>`});
        s+=`</g>`});
      s+=`<text class="t-sm" x="16" y="${N?210:262}" style="fill:var(--ink);opacity:${f1(pB)}">Shared: only criterion 5</text><text class="t-xs" x="16" y="${N?226:282}" style="opacity:${f1(pB)}">both meet 5 of 9</text></g>`}
    /* phase 4: count once, one-question screen */
    const a4=vis(4);
    if(a4>0){s+=`<g style="opacity:${f1(a4)}">`;
      s+=`<g style="opacity:${f1(.2+.8*fin)}"><text class="t-lbl" x="16" y="30" style="fill:var(--storm)">Criterion 5 only</text><text class="t-sm" x="16" y="50" style="fill:var(--ink)">Suicidal or self-harming behaviour</text><text class="t-sm" x="16" y="66" style="fill:var(--ink)">is not counted again under 1 or 4</text></g>`;
      const sens=92.8*fin2,yb=N?118:128,bw=R.w-32;
      s+=`<g style="opacity:${f1(.2+.8*fin2)}"><text class="t-lbl" x="16" y="${yb-14}" style="fill:var(--calm)">Criterion 6 as a one-question screen</text>`;
      s+=`<rect x="16" y="${yb}" width="${bw}" height="14" rx="7" style="fill:var(--panel)"/><rect x="16" y="${yb}" width="${f1(bw*sens/100)}" height="14" rx="7" style="fill:var(--calm)"/>`;
      s+=`<text class="t-sm" x="16" y="${yb+32}" style="fill:var(--ink)">sensitivity ${f1(sens)}%</text><text class="t-sm" x="16" y="${yb+50}" style="fill:var(--ink)">NPV ${Math.round(99*fin2)}%: if absent, BPD unlikely</text>`;
      s+=`<text class="t-xs" x="16" y="${yb+(N?72:80)}">a screen flags; an interview diagnoses</text></g></g>`}
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 /* ---- Part 1 ---- */
 [1,`The median point prevalence of BPD in the general population is closest to:`,[`1%`,`0.01%`,`10%`,`25%`],0,`About 1%, with community estimates of roughly 1–3% [[Ellison2018,Tomko2014]].`],
 [1,`Among psychiatric inpatients, BPD affects about:`,[`1–2%`,`20–22%`,`50–60%`,`80%`],1,`About 20–22% of inpatients and 10–12% of outpatients [[Ellison2018]].`],
 [1,`Clinical samples with BPD are about 75% female. The best explanation is:`,[`BPD is X-linked`,`Men cannot meet criterion 5`,`Mainly referral and sampling bias; community rates are near-equal`,`Oestrogen causes BPD`],2,`Community samples show near-equal rates in men and women [[Skodol2003,Grant2008]].`],
 [1,`BPD usually begins:`,[`After age 60`,`In early childhood, before age 5`,`Only after a first psychiatric admission`,`In adolescence, after about age 12`],3,`It can be diagnosed from about age 11 and affects about 3% of adolescents in the community [[Bohus2021,Guile2018]].`],
 [1,`Which is NOT one of the three components of emotional vulnerability in Linehan's biosocial model?`,[`Low intelligence`,`High sensitivity`,`High intensity`,`Slow return to baseline`],0,`The three are sensitivity, intensity (reactivity) and a slow return to baseline [[Crowell2009,Kuo2009]].`],
 [1,`In daily-life (EMA) studies, a typical BPD mood pattern is:`,[`Mood never changes`,`Sudden large drops from positive mood`,`Week-long manic highs`,`Mood rises only at night`],1,`48% of drops from a very positive mood reached negative mood, against 9% in controls [[EbnerPriemer2007PsycholMed]].`],
 [1,`Affective instability is heightened in BPD and also in:`,[`No other condition`,`Only schizophrenia`,`PTSD and bulimia nervosa`,`Only in healthy adolescents`],2,`It is transdiagnostic [[Santangelo2014]]; self-esteem instability may be more BPD-specific [[Kockler2022]].`],
 [1,`A lab meta-analysis found that, compared with controls, people with BPD show:`,[`Huge heart-rate surges to every stimulus`,`No difference in how they rate stimuli`,`Lower emotional ratings`,`Null to small physiological hyperreactivity but more negative ratings`],3,`The big difference is how negatively stimuli are rated [[Bortolla2020]].`],
 [1,`The most common function people report for self-injury is:`,[`Boredom`,`Short-term relief from intense negative emotion`,`Pleasure-seeking`,`No reason`],1,`Relief is short-lived, and daily-life data show negative emotion rising again over hours [[Klonsky2007,Houben2017]].`],
 [1,`Twin heritability estimates for BPD range from about:`,[`0–5%`,`95–100%`,`42% to .69`,`Exactly 50% in every study`],2,`42% in Distel 2008 (self-report) and about .69 in Torgersen 2000 (interview) [[Distel2008,Torgersen2000]].`],
 [1,`In twin studies, most of the non-genetic variance in BPD comes from:`,[`Shared family environment`,`Birth order`,`Diet`,`Unique (non-shared) environment`],3,`Unique environment, not shared family environment [[Distel2008,Skoglund2021]].`],
 [1,`In the largest BPD GWAS (Streit 2026), polygenic scores explained about:`,[`4.6% of the variance`,`46% of the variance`,`90% of the variance`,`0%`],0,`Too little for individual prediction; SNP heritability was about 17% and 11 loci were found [[Streit2026]].`],
 [1,`Childhood adversity raises the odds of BPD (OR 13.91 vs non-clinical controls). The largest effects were for:`,[`Moving house`,`Being an only child`,`Emotional abuse and neglect`,`Parental divorce alone`],2,`Emotional abuse and neglect showed the largest effects [[Porter2020]].`],
 [1,`Zanarini 1997 concluded that childhood sexual abuse in BPD is:`,[`Present in every case`,`Necessary but not sufficient`,`Sufficient but not necessary`,`Neither necessary nor sufficient`],3,`Caretaker neglect was a key risk factor [[Zanarini1997]].`],
 [1,`In the biosocial model, an "invalidating environment" is one that:`,[`Is intolerant of a child's expression of private emotional experience`,`Has no rules`,`Is always physically abusive`,`Provides too much praise`],0,`Especially of emotions not backed by observable events [[Crowell2009]].`],
 [1,`A meta-analysis found that, on average, people with BPD have:`,[`Larger hippocampal volume`,`About 11% smaller hippocampus and 13% smaller amygdala`,`No brain differences at all`,`A diagnostic scan signature`],1,`These are group averages; neuroimaging is not used to diagnose BPD [[Ruocco2012,Marek2022]].`],
 [1,`Hypermentalizing means:`,[`Being unable to think`,`A deficit in memory`,`Excellent accuracy in reading others`,`Excessive, inaccurate attribution of mental states`],3,`It is not specific to BPD [[Sharp2011,McLaren2022]].`],
 /* ---- Part 2 ---- */
 [2,`How many DSM-5-TR criteria are needed for BPD?`,[`5 or more of 9`,`3 or more of 9`,`All 9`,`4 or more of 7`],0,`Giving 256 possible combinations [[APA2022,Mulay2019]].`],
 [2,`Two people can both have BPD yet share only:`,[`No criteria`,`One criterion`,`Four criteria`,`Every criterion`],1,`For example, one meets criteria 1–5 and another 5–9 [[Mulay2019]].`],
 [2,`Recurrent suicidal or self-harming behaviour is scored under:`,[`Criterion 1 and criterion 5`,`Criterion 4 only`,`Criterion 5 only`,`Criterion 9`],2,`Never under criteria 1 or 4 [[APA2022,Kaess2025]].`],
 [2,`Case: a 24-year-old describes intense dysphoria and irritability after arguments that settle within a few hours. This best fits:`,[`A manic episode`,`A depressive episode`,`Cyclothymia by definition`,`BPD criterion 6, affective instability`],3,`Criterion 6 mood shifts usually last hours and rarely more than a few days; sustained episodes point to bipolar disorder [[APA2022,Paris2015]].`],
 [2,`Which criterion has the highest sensitivity (92.8%) and NPV (99%)?`,[`Affective instability`,`Inappropriate anger`,`Paranoia or dissociation`,`Impulsivity`],0,`Asking about it works as a one-question screen [[Zimmerman2017BJP]].`],
 [2,`Which features best separate BPD from bipolar disorder?`,[`Affective instability and anger`,`Abandonment fears and identity disturbance`,`Sleep and appetite`,`Age and sex`],1,`Affective instability is transdiagnostic [[Bayes2020]].`],
 [2,`The MSI-BPD uses a cut-off of:`,[`2 of 23`,`15 of 36`,`7 of 10`,`1.50`],2,`Sensitivity 0.81, specificity 0.85 [[Zanarini2003MSI]].`],
 [2,`Case: a screen with sensitivity 0.81 and specificity 0.85 is used where BPD prevalence is 1%. A positive result means BPD is likely in about:`,[`95% of positives`,`81% of positives`,`50% of positives`,`5% of positives`],3,`A calculated PPV of about 5% at 1%, rising to about 38% at 10% prevalence; screens flag, interviews diagnose [[Zanarini2003MSI,Ellison2018]].`],
 [2,`The ZAN-BPD is:`,[`A clinician-rated change measure, 9 items 0–4, total 0–36, over 1 week`,`A blood test`,`A 10-item yes/no screen`,`A self-rated 23-item list`],0,`It measures change over a 1-week window [[Zanarini2003ZAN]].`],
 [2,`On the BSL-23, the mean score that best separated BPD from other patients was:`,[`0.10`,`1.50`,`3.90`,`7`],1,`Scores run 0–4 in six severity grades [[Kleindienst2020]].`],
 [2,`In ICD-11, the code 6D11.5 is:`,[`Severe personality disorder`,`Personality difficulty`,`The borderline pattern specifier`,`Negative Affectivity`],2,`6D10 is personality disorder (.0–.2 severity); QE50.7 is personality difficulty [[Sharan2023]].`],
 [2,`Which is NOT an ICD-11 personality trait domain?`,[`Negative Affectivity`,`Anankastia`,`Dissociality`,`Psychoticism`],3,`ICD-11 has no psychoticism domain; DSM-5's trait model does [[Bach2018BMC,Bach2018ANZJP]].`],
 [2,`ICD-11 first grades personality disorder by:`,[`Severity: mild, moderate or severe`,`Type: borderline, antisocial, etc.`,`Age at onset`,`Number of hospital admissions`],0,`Then trait domains and an optional borderline pattern can be added [[Tyrer2019,Bach2018BMC]].`],
 [2,`AMPD Criterion B for BPD requires 4 or more of 7 traits, including at least one of:`,[`Anxiousness, depressivity or separation insecurity`,`Impulsivity, risk taking or hostility`,`Grandiosity, callousness or deceit`,`Eccentricity, unusual beliefs or withdrawal`],1,`Criterion A needs impairment in 2 or more of identity, self-direction, empathy and intimacy [[Kaess2025]].`],
 [2,`Case: a 15-year-old meets 6 criteria, present for 8 months. Under DSM-5-TR:`,[`BPD can never be diagnosed under 18`,`BPD can be diagnosed now`,`Features must have lasted at least 1 year before diagnosing BPD`,`Only ICD-11 applies to adolescents`],2,`Under 18 the features must have lasted at least 1 year [[APA2022,Kaess2025]]. Early assessment and help are encouraged [[Fonagy2015]].`],
 [2,`In complex PTSD, compared with BPD, the self-concept is typically:`,[`Alternating between idealised and devalued`,`Grandiose`,`Absent`,`Stably negative`],3,`In BPD it alternates [[Frost2020]]. Cloitre's discriminators are abandonment fears, unstable self, unstable relationships and impulsiveness [[Cloitre2014]].`],
 [2,`About what share of people with BPD have a current substance use disorder?`,[`About half`,`Fewer than 1%`,`Nearly 100%`,`About 5%`],0,`And about a quarter of people with an SUD have BPD [[Trull2018]].`],
 [2,`Case: an outpatient with BPD hears a critical voice when under stress, with no negative symptoms or disorganisation. The best interpretation is:`,[`This always means schizophrenia`,`Hallucinations occur in about 43% of outpatients with BPD and need careful assessment`,`Hallucinations rule out BPD`,`This is always a medicine side effect`],1,`Without the features typical of primary psychosis [[Niemantsverdriet2017]]; "pseudo-psychotic" is a misleading label [[Schroeder2013]].`],
 [2,`Withholding a BPD diagnosis "to protect the patient" is now generally seen as:`,[`Best practice`,`Required by law`,`Recommended for adolescents`,`Unethical, and harmful to integrated care`],3,`Therapeutic privilege is no longer accepted [[Sims2022]]; psychoeducation right after disclosure helped in one trial [[Zanarini2008Psychoed]].`],
 /* ---- Part 3 ---- */
 [3,`Which is NOT one of the four DBT skills modules?`,[`Free association`,`Mindfulness`,`Distress tolerance`,`Interpersonal effectiveness`],0,`The fourth is emotion regulation [[Chapman2006DBT]].`],
 [3,`Standard DBT includes individual therapy, a skills group, phone coaching and:`,[`Inpatient admission`,`A therapist consultation team`,`Daily medication`,`Family therapy every week`],1,`The consultation team supports therapists and reduces burnout [[LinehanWilks2015,Chapman2006DBT]].`],
 [3,`In DBT's target hierarchy, what comes first?`,[`Quality-of-life-interfering behaviour`,`Therapy-interfering behaviour`,`Life-threatening behaviour`,`Homework`],2,`Then therapy-interfering, then quality-of-life-interfering behaviour [[Chapman2006DBT]].`],
 [3,`The weekly self-monitoring form in DBT is called the:`,[`Thought record`,`Mood chart`,`Fear ladder`,`Diary card`],3,`The therapist uses it to set the session agenda [[Chapman2006DBT]].`],
 [3,`The first RCT of DBT was published in:`,[`1991`,`1975`,`2006`,`2015`],0,`Linehan 1991, in chronically parasuicidal women with BPD [[Linehan1991]].`],
 [3,`Linehan 2006 found that DBT, compared with expert community therapy:`,[`Had no effect on suicide attempts`,`Halved the likelihood of a suicide attempt`,`Doubled dropout`,`Worked only with medication`],1,`HR 2.66; the control arm matched therapist expertise and allegiance [[Linehan2006]].`],
 [3,`In the Linehan 2015 component trial, the extra fall in self-injury came from:`,[`Phone coaching alone`,`Medication`,`Skills training`,`Group activities without skills`],2,`"Interventions that include DBT skills training are more effective than DBT without skills training" [[Linehan2015]].`],
 [3,`McMain 2009 compared DBT with general psychiatric management for 1 year and found:`,[`DBT far superior`,`GPM far superior`,`Both harmful`,`No significant differences on any outcome`],3,`Both groups improved [[McMain2009]].`],
 [3,`McMain 2022 showed that for self-harm, 6 months of DBT was:`,[`Non-inferior to 12 months`,`Worse than 12 months`,`Not tested`,`Worse than no treatment`],0,`It also gave faster falls in BPD symptoms [[McMain2022]].`],
 [3,`In high-risk adolescents, McCauley 2018 found DBT vs supportive therapy:`,[`Increased suicide attempts`,`Reduced suicide attempts (OR 0.30)`,`Made no difference to anything`,`Was not tolerated`],1,`The advantage narrowed between 6 and 12 months [[McCauley2018]].`],
 [3,`"Psychic equivalence" in MBT means:`,[`Acting only on physical proof`,`Talking about feelings while cut off from them`,`Treating inner experience as if it were outer reality`,`Accurate mentalizing`],2,`The other pre-mentalizing modes are pretend and teleological [[Chung2026]].`],
 [3,`Bateman 2008 reported that 8 years after entry, the share still meeting BPD criteria was:`,[`50% vs 50%`,`87% vs 13%`,`0% vs 100%`,`13% after MBT vs 87% after usual care`],3,`Though "general social function remains impaired" [[Bateman2008]].`],
 [3,`Which is NOT one of the schema modes linked with BPD?`,[`Narcissistic self-aggrandiser`,`Detached protector`,`Punitive parent`,`Angry/impulsive child`],0,`The fourth is the vulnerable (abandoned/abused) child; the healthy adult is weak [[Arntz2005Modes]].`],
 [3,`Giesen-Bloo 2006 compared schema therapy with TFP over 3 years and found:`,[`TFP better on recovery`,`Schema therapy better on recovery (RR 2.18), with less dropout`,`No one improved`,`Both worse than usual care`],1,`Both therapies helped on all measures [[GiesenBloo2006]].`],
 [3,`Arntz 2022 found that schema therapy worked best when delivered:`,[`Only as a group`,`Only online`,`As combined individual and group therapy`,`Without a therapist`],2,`Mainly-group schema therapy alone did not beat usual care [[Arntz2022GST]].`],
 [3,`In Doering 2010, dropout from TFP vs experienced community therapists was:`,[`Equal`,`67.3% vs 38.5%`,`5% vs 95%`,`38.5% vs 67.3%`],3,`TFP also improved BPD symptoms (d 1.6) [[Doering2010]].`],
 [3,`Cochrane 2020 found BPD-tailored psychotherapy reduced BPD severity vs usual care by:`,[`SMD −0.52, moderate certainty`,`SMD −3.0, high certainty`,`No effect`,`SMD +0.52`],0,`Only BPD severity reached the clinically meaningful threshold [[Storebo2020]].`],
 [3,`Which statement about BPD psychotherapies is best supported?`,[`DBT is proven superior to all others`,`No psychotherapy has been shown superior to another`,`Only psychoanalysis works`,`Psychotherapy is not recommended`],1,`APA 2024 recommends (1B) a structured, evidence-supported psychotherapy [[APA2024Guideline,Leichsenring2024WP]].`],
 [3,`Dropout from BPD psychotherapy is about:`,[`0%`,`75%`,`1 in 4, peaking early`,`1 in 100`],2,`22.3–28.2% [[Iliakis2021,Arntz2023Dropout]].`],
 [3,`NICE CG78 advises against brief BPD-specific psychological interventions of less than:`,[`3 months, outside a structured service`,`3 days`,`3 years`,`1 week`],0,`Brief interventions should sit within a structured service [[NICE2009]].`],
 /* ---- Part 4 ---- */
 [4,`How many medicines does the FDA approve for BPD itself?`,[`Three`,`None`,`One, quetiapine`,`All antipsychotics`],1,`All drug use for BPD is off-label [[FDA-LabelSearch2026,StoffersWinterling2022]].`],
 [4,`Cochrane 2022 (46 RCTs) concluded that, compared with placebo, medicines:`,[`Cured BPD`,`Reduced suicide by half`,`Showed no difference on BPD severity, self-harm, suicide-related outcomes or functioning`,`Were all harmful`],2,`Evidence was mostly very low certainty [[StoffersWinterling2022]].`],
 [4,`NICE CG78 states that antipsychotics should:`,[`Be first-line for all patients`,`Be given lifelong`,`Replace psychotherapy`,`Not be used for medium- or long-term treatment of BPD`],3,`Drugs may be considered for comorbid conditions [[NICE2009]].`],
 [4,`Case: a person with BPD in crisis is offered a sedative. NICE CG78 says it should usually be stopped within:`,[`1 week`,`6 months`,`1 year`,`Never`],0,`Short-term only, a single drug, and "fewer tablets more frequently" if overdose risk is significant [[NICE2009]].`],
 [4,`APA 2024 suggests (2C) that any psychotropic medicine in BPD be:`,[`Started at the first visit`,`Time-limited, aimed at a measurable target symptom and adjunctive to psychotherapy`,`Increased with every crisis`,`Combined with a benzodiazepine`],1,`And reviewed at least every 6 months (1C) [[APA2024Guideline]].`],
 [4,`Case: a patient with BPD and no comorbid illness takes four psychotropics started during past crises. The guideline-based next step is:`,[`Add a fifth`,`Stop all at once today`,`Review and reconcile medicines, aiming to reduce unnecessary drugs`,`Never discuss medicines`],2,`APA 2024 (1C) and NICE CG78 both ask for regular review [[APA2024Guideline,NICE2009]].`],
 [4,`In the LABILE trial, lamotrigine vs placebo at 52 weeks:`,[`Halved ZAN-BPD`,`Caused remission`,`Was better for self-harm`,`Made no difference (ZAN-BPD 11.3 vs 11.5)`],3,`Not clinically effective or cost-effective [[Crawford2018LABILE]].`],
 [4,`About what share of inpatients with BPD receive psychotropic medicines?`,[`10%`,`90%`,`50%`,`1%`],1,`Over half receive three or more [[Bridler2015]].`],
 [4,`The US valproate label states that valproate should not be given to a woman of childbearing potential:`,[`Under any circumstances`,`If she is over 40`,`Unless other medications have failed or are otherwise unacceptable`,`Without food`],2,`Major malformations in about 10% of exposed pregnancies [[FDA-Depakote,Battino2024EURAP]].`],
 [4,`Benzodiazepines are not generally recommended in BPD because of:`,[`Weight gain`,`Hair loss`,`Neutropenia`,`Disinhibition, misuse and dependence`],3,`And the highest suicidal-behaviour hazard in Swedish registry data (HR 1.61) [[APA2024Guideline,Lieslehto2023Suicide]].`],
 [4,`The 2025 meta-analytic estimate of suicide in BPD (a population statistic) is about:`,[`6%`,`0.1%`,`50%`,`25%`],0,`Suicidal behaviour declines markedly over time, and treatment helps [[Lak2025,Soloff2019Suicidal]].`],
 [4,`Case: an ED nurse is asked to score a suicide risk scale to decide whether to discharge. NICE NG225 advises:`,[`Discharge if the score is low`,`Do not use risk scales or low/medium/high stratification to decide treatment; use a risk formulation`,`Use two scales instead of one`,`Admit everyone`],1,`Risk scales have a positive predictive value for suicide of only 5.5% [[NICE2022NG225,Carter2017PPV]].`],
 [4,`Safety planning-type interventions reduce suicidal behaviour by about:`,[`0%`,`90%`,`43% (RR 0.57; NNT 16)`,`They increase it`],2,`No effect on suicidal ideation was found [[Nuij2021]].`],
 [4,`Case: a person attends the ED after self-harm and has been drinking. NICE NG225 says the psychosocial assessment should:`,[`Wait until the next day`,`Wait until blood alcohol is zero`,`Be skipped`,`Not be delayed because of alcohol levels, and happen alongside physical care`],3,`Hold it in a private area where the person cannot be overheard [[NICE2022NG225,NICE2022SelfHarm]].`],
 [4,`Brief admission by self-referral, compared with usual care, in its RCT:`,[`Did not reduce hospital days`,`Halved hospital days`,`Increased compulsory admission`,`Was never tested`],0,`Within-group falls in compulsory admission days and NSSI were seen only in the brief-admission group [[Westling2019BA]].`],
 [4,`The "Papageno effect" refers to:`,[`More suicides after celebrity reports`,`Fewer suicides linked to stories of coping with suicidal thoughts`,`A drug side effect`,`A DBT skill`],1,`Reporting methods, in contrast, is linked to higher risk [[Niederkrotenthaler2010,Niederkrotenthaler2020]].`],
 [4,`NICE NG225 states that drug treatment as a specific intervention to reduce self-harm should:`,[`Be first-line`,`Be lifelong`,`Not be offered`,`Use clozapine`],2,`Specialist psychotherapies reduce self-harm [[NICE2022NG225,Storebo2020]].`],
 [4,`The multicentre phase 2 trial of brexpiprazole in BPD:`,[`Led to FDA approval`,`Showed large benefit`,`Was never run`,`Missed its primary endpoint, with more akathisia`],3,`Akathisia 14.0% vs 1.2% [[Rothman2024Brexpiprazole]].`],
 [4,`Ketamine, psilocybin and brain stimulation for BPD are best described as:`,[`Early and unproven`,`Approved first-line treatments`,`Proven harmful`,`Proven cures`],0,`Small trials only; none is an established treatment [[Konstantinou2021rTMS,Fineberg2023Ketamine,Grant2026Psilocybin]].`],
 [4,`In the US, a person in suicidal crisis can call or text:`,[`411`,`988`,`116 123`,`999 only`],1,`The 988 Suicide & Crisis Lifeline; in the UK and Ireland, Samaritans on 116 123 [[SAMHSA988,Samaritans116123]].`],
 /* ---- Part 5 ---- */
 [5,`In MSAD, how many people with BPD had remitted by 6 years?`,[`5.9%`,`20%`,`68.6%`,`100%`],2,`34.5% at 2 years and 49.4% at 4; only 5.9% of remitters had a recurrence [[Zanarini2003Course]].`],
 [5,`At 16 years in MSAD, 2-year remission vs 2-year recovery was:`,[`10% vs 90%`,`50% vs 50%`,`60% vs 99%`,`99% vs 60%`],3,`Recovery adds good social and vocational functioning [[Zanarini2012]].`],
 [5,`Which symptoms of BPD typically fade fastest?`,[`Impulsive symptoms such as self-harm`,`Chronic emptiness`,`Chronic anger`,`Abandonment worries`],0,`Affective (temperamental) symptoms persist longest [[Zanarini2007Subsyndromal,Zanarini2016Fluidity]].`],
 [5,`The strongest comorbidity predictor of BPD remission and recovery is the absence of:`,[`Anxiety`,`A substance use disorder`,`Insomnia`,`Asthma`],1,`Getting help for alcohol or drug use is one of the most useful steps toward recovery [[Zanarini2004AxisI,Zanarini2024Comorbid]].`],
 [5,`In CLPS over 10 years:`,[`No one remitted`,`Everyone recovered fully`,`85% remitted, 12% relapsed, social functioning stayed impaired`,`Remission required medication`],2,`Remission and recovery are different things [[Gunderson2011]].`],
 [5,`Failure to remit or recover from BPD is associated with:`,[`Better physical health`,`Lower medical costs`,`No physical differences`,`Obesity, diabetes, osteoarthritis and chronic pain`],3,`Physical health is part of recovery [[Frankenburg2004Medical,Keuroghlian2013Medical]].`],
 [5,`Carers of people with BPD report burden about how much higher than carers of people with other serious mental illnesses?`,[`Half a standard deviation`,`No difference`,`Lower`,`Ten times`],0,`A common reaction, not a failure [[Bailey2013,Bailey2014]].`],
 [5,`Case: a parent asks what might help them as a carer. Which programme has the most family-specific evidence?`,[`Brief admission`,`Family Connections, a 12-week DBT-based programme`,`Lamotrigine`,`A risk scale`],1,`It reduced burden and grief in controlled and uncontrolled studies, though not superior to active usual care in its RCT [[Hoffman2005,Flynn2017,Guillen2024]].`],
 [5,`More knowledge about BPD alone, in one family study, went with:`,[`Less burden`,`No change`,`More burden and hostility`,`Recovery`],2,`The source and accuracy of information matter [[Hoffman2003]].`],
 [5,`Case: a ward manager wants a simple, evidence-based way to reduce conflict and containment. Which has RCT evidence?`,[`Removing all activities`,`Longer observation periods`,`Seclusion protocols`,`Safewards`],3,`15% fewer conflict and 23.2% fewer containment events [[Bowers2015]].`],
 [5,`Training for nurses about BPD changes which outcome most?`,[`Knowledge`,`Feelings`,`Salary`,`Nothing`],0,`Effects were largest for knowledge, smaller for feelings [[Dickens2016Interventions]].`],
 [5,`Case: a community nurse is planning a person's move between services. NICE CG78 advises:`,[`Ending contact without notice`,`Discussing and structuring the change beforehand, keeping access to crisis services`,`Discharging during a crisis`,`Avoiding the topic`],1,`Endings and transitions may evoke strong emotions [[NICE2009]].`],
 [5,`Before considering an acute admission, NICE CG78 advises first:`,[`Prescribing antipsychotics`,`A risk scale`,`Referral to a crisis resolution and home treatment team`,`Discharge`],2,`Agree the length and purpose of any admission in advance [[NICE2009]].`],
 [5,`In MOBY, which helped young people with BPD most clearly?`,[`Specialist psychotherapy added to everything`,`Medication`,`Longer admissions`,`A dedicated youth service (HYPE) improving attendance and completion`],3,`Completion 47.8% vs 19.2% in general youth services; added psychotherapy gave no extra functional benefit [[Chanen2022MOBY]].`],
 [5,`In BPD, intimate partner violence should be assessed:`,[`In both directions: perpetration and victimisation`,`Only as victimisation`,`Only as perpetration`,`Never`],0,`BPD and antisocial personality disorder show the most robust links with both [[Collison2021]].`],
 [5,`People with BPD receiving US disability income (SSDI):`,[`Never come off it`,`Often do: 40% came off it`,`Cannot work`,`Are rare`],1,`Disability status was fluid [[Zanarini2009]].`],
 [5,`In clinical perinatal samples, the pooled prevalence of BPD was about:`,[`0.1%`,`50%`,`14%`,`90%`],2,`0.7–1.7% in non-clinical perinatal samples [[Prasad2022]].`],
 [5,`Who should professionals working with people with BPD have routine access to, according to NICE CG78?`,[`Legal counsel`,`Security staff`,`Pharmaceutical representatives`,`Supervision and staff support`],3,`NG225 adds reflective practice for staff working with self-harm [[NICE2009,NICE2022SelfHarm]].`],
 /* ---- Part 6 ---- */
 [6,`Who described the "border line group of neuroses" in 1938?`,[`Adolph Stern`,`Otto Kernberg`,`Marsha Linehan`,`John Gunderson`],0,`Between neurosis and psychosis [[Stern1938]].`],
 [6,`Kernberg's 1967 concept was:`,[`Dialectical behaviour therapy`,`Borderline personality organisation`,`Mentalizing`,`Schema modes`],1,`With primitive defences such as splitting and identity diffusion [[Kernberg1967,Gunderson2009Ontogeny]].`],
 [6,`BPD entered the DSM in:`,[`DSM-I, 1952`,`DSM-5, 2013`,`DSM-III, 1980`,`DSM-5-TR, 2022`],2,`After Spitzer's 1979 criteria study [[Spitzer1979,Leichsenring2024WP]].`],
 [6,`Bateman and Fonagy's 1999 partial-hospitalisation trial was the forerunner of:`,[`DBT`,`STEPPS`,`Schema therapy`,`Mentalization-based treatment`],3,`It cut suicidal acts, self-harm and inpatient days vs standard care [[Bateman1999]].`]
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
const GL_T=[
 ["6D10 · personality disorder (ICD-11)",`The single ICD-11 personality disorder code, graded mild (6D10.0), moderate (6D10.1) or severe (6D10.2) [[Sharan2023]].`,"icd"],
 ["988 Suicide & Crisis Lifeline",`The US line offering free, confidential support 24/7 by call, text or chat to 988 [[SAMHSA988]].`,"crisis"],
 ["Abandonment fears (criterion 1)",`Frantic efforts to avoid real or imagined abandonment. Suicidal or self-harming behaviour is not counted here [[APA2022,Kaess2025]].`,"criteria"],
 ["Acute vs temperamental symptoms",`MSAD's split between symptoms such as self-injury, which resolve faster, and chronic anger or abandonment concerns, which resolve slowly [[Zanarini2005MSAD]].`,"course"],
 ["Affective instability (criterion 6)",`Marked reactivity of mood, usually lasting a few hours and only rarely more than a few days [[APA2022,Kaess2025]]; the most sensitive criterion (92.8%) [[Zimmerman2017BJP]].`,"criteria"],
 ["Aftercare",`Follow-up after self-harm; NICE NG225 asks for initial aftercare within 48 hours if there are ongoing safety concerns [[NICE2022SelfHarm]].`,"crisis"],
 ["Akathisia",`An inner restlessness caused by some antipsychotics; 14.0% vs 1.2% on placebo in the brexpiprazole phase 2 trial [[Rothman2024Brexpiprazole]].`,"meds"],
 ["ALSPAC",`A UK birth cohort; in it, chronic peer victimisation gave OR 5.44 for BPD symptoms at age 11 [[Wolke2012]].`,"causes"],
 ["Alternative Model for Personality Disorders (AMPD)",`DSM-5-TR Section III model: impairment in personality functioning (Criterion A) plus pathological traits (Criterion B) [[APA2022,Kaess2025]].`,"icd"],
 ["Amygdala",`A threat-detection region; meta-analytic volume about 13% smaller in BPD [[Ruocco2012]], with hyperactivity to negative stimuli in unmedicated samples [[Schulze2016]].`,"brain"],
 ["Anankastia",`The ICD-11 trait domain of perfectionism and rigid control; only weakly linked with BPD symptoms [[Bach2018BMC,Mulder2020]].`,"icd"],
 ["Anterior cingulate cortex",`A frontal region involved in regulating emotion and pain; reduced activity during heat pain in BPD supports an attentional-shift account (Early evidence) [[Niedtfeld2010]].`,"brain"],
 ["APA 2024 practice guideline",`The American Psychiatric Association's guideline for BPD; it recommends (1B) structured, evidence-supported psychotherapy [[APA2024Guideline]].`,"compare"],
 ["Attachment, insecure",`Every study in a 13-study review linked BPD with insecure attachment, especially unresolved, preoccupied and fearful types [[Agrawal2004]].`,"causes"],
 ["Benzodiazepines",`Sedatives not generally recommended in BPD because of disinhibition, misuse and dependence [[APA2024Guideline]]; HR 1.61 for suicidal behaviour in Swedish registry data [[Lieslehto2023Suicide]].`,"meds"],
 ["Biosocial model",`Linehan's theory: BPD arises when an emotionally vulnerable child grows up in an invalidating environment [[Crowell2009]].`,"causes"],
 ["Bipolar disorder",`Mood episodes lasting days to weeks; BPD occurs in 21.6% of people with bipolar disorder, and bipolar in 18.5% of people with BPD [[Fornaro2016,Paris2015]].`,"differential"],
 ["BOOTS trial",`A Dutch RCT of DBT vs schema therapy in 204 outpatients: no significant difference in BPD severity at 3 years [[Wibbelink2026BOOTS]].`,"compare"],
 ["Borderline pattern (6D11.5)",`An optional ICD-11 specifier, defined by 5 of 9 features adapted from DSM BPD criteria [[Sharan2023,Bach2018BMC]].`,"icd"],
 ["Borderline personality disorder (BPD)",`A pervasive pattern of instability in relationships, self-image and affects, with marked impulsivity, beginning by early adulthood [[APA2022,Kaess2025]].`,"what"],
 ["Borderline personality organisation",`Kernberg's 1967 concept: a middle level of organisation with primitive defences, identity diffusion and lapses in reality testing [[Kernberg1967]].`,"history"],
 ["BPQ (Borderline Personality Questionnaire)",`A youth screen: sensitivity 0.68, specificity 0.90 in 15–25-year-olds; it "is not a replacement for clinical diagnosis" [[Chanen2008]].`,"assess"],
 ["Brain stimulation (rTMS)",`Repetitive transcranial magnetic stimulation; 8 small studies (63 patients) found it tolerated but not proven effective in BPD (Early evidence) [[Konstantinou2021rTMS]].`,"frontier"],
 ["Brexpiprazole",`An antipsychotic whose multicentre phase 2 trial in BPD missed its primary endpoint [[Rothman2024Brexpiprazole]].`,"meds"],
 ["Brief admission by self-referral",`A contract-based stay of up to 3 days that the person can request; its RCT did not reduce hospital days [[Liljedahl2017BA,Westling2019BA]].`,"crisis"],
 ["BSL-23 (Borderline Symptom List)",`A 23-item self-rated severity scale; mean scores run 0–4, and 1.50 best separated BPD from other disorders [[Bohus2009,Kleindienst2020]].`,"assess"],
 ["Candidate gene",`A gene studied because of a biological hunch; 5-HTTLPR and other serotonin candidates showed no association with BPD [[Calati2013,Amad2014]].`,"genes"],
 ["Carer burden",`The practical and emotional load of caring; about half an SD higher in carers of people with BPD than of people with other serious mental illnesses [[Bailey2013]].`,"families"],
 ["Chain analysis",`A DBT method that traces what led to a target behaviour and what keeps it going, then finds more skilful alternatives [[Chapman2006DBT,Lynch2006DBT]].`,"dbt"],
 ["Childhood adversity",`Abuse, neglect or bullying in childhood; OR 13.91 for BPD vs non-clinical controls, largest for emotional abuse and neglect [[Porter2020]].`,"causes"],
 ["Chronic emptiness (criterion 7)",`Chronic feelings of emptiness [[APA2022]]; among the most persistent symptoms over time [[Zanarini2007Subsyndromal]].`,"criteria"],
 ["Chronic vs acute suicide risk",`Paris distinguishes chronic suicidality, often a way of communicating distress, from acute risk [[Paris2002Chronic]].`,"crisis"],
 ["CLPS",`The Collaborative Longitudinal Personality Disorders Study; 85% of people with BPD remitted and 12% relapsed over 10 years [[Gunderson2000CLPS,Gunderson2011]].`,"course"],
 ["Clozapine",`An antipsychotic whose BPD trial (CALMED) closed early with 29 participants, so its main question went unanswered [[Crawford2022CALMED]].`,"meds"],
 ["Cochrane review",`A systematic review using Cochrane methods; 2020 for psychotherapy (SMD −0.52 on severity) and 2022 for medicines (no benefit over placebo) [[Storebo2020,StoffersWinterling2022]].`,"compare"],
 ["Comorbidity",`Co-occurring conditions; in NESARC, lifetime anxiety 84.8%, mood 82.7% and substance use 78.2% in BPD [[Tomko2014]].`,"differential"],
 ["Complex comorbidity",`A disorder of affect plus a disorder of impulse: a strong marker of BPD [[Zanarini1998AxisI]].`,"differential"],
 ["Complex PTSD",`A trauma diagnosis with a stably negative self-concept; BPD is separated by abandonment fears, unstable self, unstable relationships and impulsiveness [[Cloitre2014,Frost2020]].`,"differential"],
 ["Consultation team (DBT)",`The weekly therapists' meeting that keeps a compassionate stance and reduces burnout [[Chapman2006DBT]].`,"dbt"],
 ["Cortisol",`The main stress hormone; continuous output is elevated but the response to social stress blunted in BPD [[Drews2019]].`,"brain"],
 ["Crisis plan",`A written plan naming triggers, self-management strategies and how to reach services out of hours [[NICE2009]].`,"crisis"],
 ["Crisis resolution and home treatment team",`A community team NICE CG78 asks to be offered before an acute admission [[NICE2009]].`,"nursing"],
 ["Cyberball",`A virtual ball-tossing game that studies social exclusion; people with BPD feel excluded even when included [[Renneberg2012,Staebler2011PsycholMed]].`,"emotion"],
 ["DBT-A",`DBT adapted for adolescents; it reduced self-harm and suicidal ideation vs controls in meta-analysis [[Kothgassner2021,Mehlum2014]].`,"dbt"],
 ["DBT-PTSD",`DBT adapted for childhood-abuse PTSD; small advantage over cognitive processing therapy, with less early dropout [[Bohus2020DBTPTSD]].`,"dbt"],
 ["De-escalation",`Staff-delivered communication, self-regulation, assessment, actions and safety maintenance to reduce aggression with minimal coercion [[Hallett2017]].`,"nursing"],
 ["Detached protector",`A schema mode of emotional shutting-down; raised more by stress in BPD than in controls [[Arntz2005Modes]].`,"schema"],
 ["Detachment",`An ICD-11 trait domain of social and emotional distance [[Bach2018BMC]].`,"icd"],
 ["Diary card",`DBT's weekly self-monitoring form of targets such as self-harm and emotional misery; it sets the session agenda [[Chapman2006DBT]].`,"dbt"],
 ["Dialectical behaviour therapy (DBT)",`A modular, hierarchical treatment of individual therapy, skills group, phone coaching and a consultation team [[LinehanWilks2015]].`,"dbt"],
 ["Dialectics",`DBT's philosophy of balancing acceptance and change, one of its essential elements [[Chapman2006DBT]].`,"dbt"],
 ["DIB-R",`The Revised Diagnostic Interview for Borderlines; kappas above 0.75 for the diagnosis [[Zanarini2002DIBR]].`,"assess"],
 ["Disclosure of diagnosis",`Telling the person their diagnosis; 57% of surveyed psychiatrists had at some point not done so [[Sisti2016]], now seen as unethical to withhold [[Sims2022]].`,"assess"],
 ["Disinhibition",`An ICD-11 trait domain: acting rashly on immediate stimuli without considering consequences [[Bach2018BMC]].`,"icd"],
 ["Dissociality",`An ICD-11 trait domain of disregard for others' rights and feelings; BPD symptoms map partly onto it [[Bach2018BMC,Mulder2020]].`,"icd"],
 ["Dissociation",`Feeling unreal, numb or cut off; it rises with stress, more steeply in BPD [[Stiglmayr2008]], and predicts poorer DBT response [[Kleindienst2011]].`,"brain"],
 ["Distress tolerance",`DBT skills for surviving crises without making things worse [[Chapman2006DBT]].`,"dbt"],
 ["Dropout",`Leaving therapy early; about 1 in 4 in BPD psychotherapy, highest in the first quarter of treatment [[Iliakis2021,Arntz2023Dropout]].`,"compare"],
 ["DSM-5-TR",`The 2022 revision of the APA's manual; it keeps BPD as a categorical diagnosis [[APA2022]].`,"criteria"],
 ["DSM-III",`The 1980 manual that introduced BPD, after Spitzer's 1979 study [[Spitzer1979,Leichsenring2024WP]].`,"history"],
 ["Early intervention",`Recognising and helping BPD in young people; justified because BPD is common, disabling and treatable [[Chanen2013,Fonagy2015]].`,"frontier"],
 ["Ecological momentary assessment (EMA)",`Repeated phone or e-diary ratings in daily life, which show mood shifts in BPD clearly [[Trull2008,Santangelo2014]].`,"emotion"],
 ["Emotion dysregulation",`Difficulty regulating intense emotion; a path from invalidation through dysregulation explained 38% of BPD features in one cross-sectional study (Early evidence) [[Sturrock2014]].`,"emotion"],
 ["Emotion regulation (DBT module)",`DBT skills for understanding and changing intense emotions [[Chapman2006DBT]].`,"dbt"],
 ["Emotion regulation group therapy (ERGT)",`A 14-week add-on group that reduced self-harm and emotion dysregulation in women with BPD [[Gratz2014ERGT]].`,"gpm"],
 ["Emotional overinvolvement",`A component of expressed emotion; 69.6% of carers reported it high, linked with more burden [[Bailey2015]].`,"families"],
 ["Emotional vulnerability",`High sensitivity, high intensity and a slow return to baseline [[Crowell2009,Kuo2009]].`,"emotion"],
 ["Epistemic trust",`Openness to trusting knowledge from others; Fonagy proposes epistemic hypervigilance can follow adverse social learning (Hypothesis) [[Fonagy2017b]].`,"causes"],
 ["EURAP",`An international pregnancy registry; major malformations in 9.9% with valproate vs 3.1% with lamotrigine [[Battino2024EURAP]].`,"meds"],
 ["Expressed emotion",`Criticism and emotional overinvolvement in families; 82.9% of carers reported high criticism [[Bailey2015]].`,"families"],
 ["Family Connections",`A 12-week DBT-based programme for relatives, led by trained family members [[Hoffman2005,Flynn2017]].`,"families"],
 ["General psychiatric management (GPM)",`A once-weekly generalist model emphasising psychoeducation and social adaptation; equal to DBT in McMain 2009 [[Gunderson2018GPM,McMain2009]].`,"gpm"],
 ["Genetic correlation",`Shared genetic influence between traits; BPD's strongest are with PTSD, depression and ADHD [[Streit2026]].`,"genes"],
 ["GWAS",`A genome-wide association study; the largest in BPD found 11 loci in 12,339 cases [[Streit2026]].`,"genes"],
 ["Hallucinations in BPD",`Reported by about 43% of outpatients, without the negative symptoms of primary psychosis [[Niemantsverdriet2017]].`,"differential"],
 ["Healthy adult mode",`The schema mode therapy aims to strengthen; weak in BPD [[Arntz2005Modes,Lobbestael2005]].`,"schema"],
 ["Heritability",`The share of differences between people linked to genes; estimates for BPD run from 42% to about .69 [[Distel2008,Torgersen2000]].`,"genes"],
 ["Hippocampus",`A memory region; meta-analytic volume about 11% smaller in BPD [[Ruocco2012]].`,"brain"],
 ["HPA axis",`The hypothalamic–pituitary–adrenal stress system; continuous cortisol raised, stress response blunted in BPD [[Drews2019]].`,"brain"],
 ["HYPE",`Helping Young People Early, an Australian youth BPD service that improved attendance and completion in MOBY [[Chanen2022MOBY]].`,"gpm"],
 ["Hypermentalizing",`Excessive, inaccurate attribution of mental states to others; not specific to BPD [[Sharp2011,McLaren2022]].`,"brain"],
 ["ICD-10 F60.31",`Emotionally unstable personality disorder, borderline type, the ICD-10 code used in Danish register studies [[Kjaer2020]].`,"icd"],
 ["ICD-11",`The WHO classification in use since 2022; one personality disorder graded by severity, with trait domains [[Reed2019,Tyrer2019]].`,"icd"],
 ["Idealisation and devaluation (criterion 2)",`Unstable, intense relationships alternating between extremes [[APA2022,Kaess2025]].`,"criteria"],
 ["Identity disturbance (criterion 3)",`A markedly and persistently unstable self-image or sense of self [[APA2022]]; one of the most central symptoms in networks [[Peters2023]].`,"criteria"],
 ["Impulsivity (criterion 4)",`In at least two potentially self-damaging areas, such as spending, sex, substances, reckless driving or binge eating [[APA2022,Kaess2025]].`,"criteria"],
 ["Inappropriate anger (criterion 8)",`Intense anger or difficulty controlling anger [[APA2022]]; among the most persistent symptoms [[Zanarini2016Fluidity]].`,"criteria"],
 ["Interpersonal effectiveness",`DBT skills for asking for what you need and keeping relationships and self-respect [[Chapman2006DBT]].`,"dbt"],
 ["Intimate partner violence",`BPD shows robust links with both perpetration and victimisation; assess safety in both directions [[Collison2021]].`,"living"],
 ["Invalidating environment",`One intolerant of a child's private emotional experience, especially emotions not backed by observable events [[Crowell2009]].`,"causes"],
 ["IPDE",`The International Personality Disorder Examination, a semi-structured interview tested in a WHO field trial [[Loranger1994]].`,"assess"],
 ["Joint crisis plan",`A crisis plan agreed with the team; no difference in self-harm at 6 months in its RCT [[Borschmann2013JCP]].`,"crisis"],
 ["Ketamine",`An anaesthetic tested in one small BPD RCT (n = 22) with no significant effect on suicidal ideation vs midazolam (Early evidence) [[Fineberg2023Ketamine]].`,"frontier"],
 ["LABILE trial",`A UK RCT of lamotrigine in 276 adults with BPD: no better than placebo at 52 weeks [[Crawford2018LABILE]].`,"meds"],
 ["Lamotrigine",`An anticonvulsant; no benefit in LABILE, and a boxed warning for serious rash [[Crawford2018LABILE,FDA-Lamictal]].`,"meds"],
 ["Lifetime prevalence",`The share who have had a condition at any point; 5.9% for BPD in NESARC Wave 2, or 2.7% when distress or impairment was required [[Grant2008,Tomko2014]].`,"what"],
 ["MBT-A",`MBT for adolescents; it reduced self-harm and depression more than usual care [[Rossouw2012MBTA]].`,"mbt"],
 ["McLean Screening Instrument (MSI-BPD)",`A 10-item yes/no screen; cut-off 7, sensitivity 0.81, specificity 0.85 [[Zanarini2003MSI]].`,"assess"],
 ["Medication reconciliation",`Reviewing every medicine; APA 2024 recommends (1C) at least every 6 months in BPD [[APA2024Guideline]].`,"meds"],
 ["Memantine",`An NMDA antagonist; one 8-week exploratory RCT (33 people) reduced ZAN-BPD vs placebo (Early evidence) [[Kulkarni2018Memantine]].`,"frontier"],
 ["Mentalization-based treatment (MBT)",`A time-limited therapy structured to strengthen mentalizing [[Bateman2010WP]].`,"mbt"],
 ["Mentalizing",`Understanding oneself and others in terms of internal mental states [[Luyten2020]].`,"mbt"],
 ["Mindfulness",`DBT's core skill of attention to the present moment [[Chapman2006DBT]].`,"dbt"],
 ["MOBY trial",`An Australian trial in 139 young people; a dedicated service improved engagement, but added psychotherapy did not improve functioning [[Chanen2022MOBY]].`,"frontier"],
 ["Mother–Infant DBT",`A 25-week group in which mothers learn skills; depression, anxiety and BPD symptoms improved [[SvedWilliams2021]].`,"families"],
 ["MSAD",`The McLean Study of Adult Development: 290 inpatients with BPD followed every 2 years from 1992–1995 [[Temes2019,Zanarini2005MSAD]].`,"course"],
 ["MSSD",`Mean squared successive difference, a preferred EMA index of instability because it captures temporal order [[Jahng2008]].`,"emotion"],
 ["NESARC",`A large US population survey; BPD lifetime prevalence 5.9% in Wave 2 [[Grant2008]].`,"what"],
 ["Negative affectivity",`The ICD-11 trait domain of frequent, intense negative emotions out of proportion to the situation [[Bach2018BMC]].`,"icd"],
 ["Negative predictive value (NPV)",`The chance someone with a negative result does not have the condition; 99% for absent affective instability [[Zimmerman2017BJP]].`,"assess"],
 ["Neuroticism",`A normal personality trait; BPD's genetic liability is shared with high neuroticism and low agreeableness [[Distel2009]].`,"genes"],
 ["NICE CG78",`The 2009 English guideline on BPD, the first national guideline [[NICE2009]].`,"nursing"],
 ["NICE NG225",`The 2022 English self-harm guideline; it advises against risk scales for predicting suicide [[NICE2022NG225]].`,"crisis"],
 ["Non-inferiority trial",`A trial testing whether a new option is not meaningfully worse; McMain 2022 showed 6 months of DBT non-inferior to 12 [[McMain2022]].`,"compare"],
 ["Non-suicidal self-injury (NSSI)",`Self-injury without suicidal intent; its main function is short-term relief from intense negative emotion [[Klonsky2007,Kleindienst2008]].`,"crisis"],
 ["Off-label",`Use of a medicine for a condition not on its label; all drug use for BPD is off-label [[StoffersWinterling2022]].`,"meds"],
 ["Olanzapine",`An antipsychotic with a modest ZAN-BPD advantage at 5–10 mg/day and about 3 kg weight gain in 12 weeks [[Zanarini2011Olanzapine]].`,"meds"],
 ["Opioid hypothesis",`The proposal that altered endogenous opioid signalling underlies part of BPD (Hypothesis) [[Bandelow2010]].`,"brain"],
 ["Oxytocin",`A social hormone; single-dose lab studies show mixed effects in BPD, and no clinical benefit is shown (Early evidence) [[Bertsch2013Oxytocin,Bartz2011Oxytocin]].`,"frontier"],
 ["PAI-BOR",`The Personality Assessment Inventory Borderline Features scale; a T-score of 70 or more classified 73% correctly [[Stein2007PAI]].`,"assess"],
 ["Papageno effect",`Fewer suicides linked to stories of people coping with suicidal thoughts (Early evidence) [[Niederkrotenthaler2010]].`,"crisis"],
 ["Paranoid ideation, stress-related (criterion 9)",`Transient, stress-related paranoid ideation or severe dissociative symptoms [[APA2022]].`,"criteria"],
 ["Partial hospitalisation",`Day-hospital treatment; the setting of Bateman and Fonagy's 1999 trial, forerunner of MBT [[Bateman1999]].`,"mbt"],
 ["Peer support worker",`A worker with lived experience who supports people with BPD or carers [[Barr2020]].`,"living"],
 ["Person-first language",`Saying "people with BPD" and describing behaviour, not character; stigmatising language hurts [[vanSchie2024,Sheehan2016]].`,"what"],
 ["Personality difficulty (QE50.7)",`An ICD-11 code below the disorder threshold, not classified as a mental disorder [[Sharan2023,Bach2018BMC]].`,"icd"],
 ["Phone coaching",`Between-session calls to the DBT therapist to apply skills when they are most needed [[Chapman2006DBT]].`,"dbt"],
 ["Polygenic score",`A sum of many small genetic effects; for BPD it explains 4.6% of variance, too little to predict for individuals [[Streit2026]].`,"genes"],
 ["Polypharmacy",`Taking several medicines at once; 54% of European inpatients with BPD took three or more [[Bridler2015]].`,"meds"],
 ["Polythetic criteria",`A rule met by any subset (5 of 9), giving 256 combinations [[Mulay2019]].`,"criteria"],
 ["Positive predictive value (PPV)",`The chance a positive result is a true case; it falls with prevalence, about 5% for MSI-BPD at 1% prevalence [[Zanarini2003MSI,Ellison2018]].`,"assess"],
 ["Pretend mode",`Appearing to mentalize while cut off from real inner states and reality [[Chung2026]].`,"mbt"],
 ["Psilocybin",`A psychedelic; one open-label study of 9 adults lowered depression but not BPD scores (Hypothesis-generating) [[Grant2026Psilocybin]].`,"frontier"],
 ["Psychic equivalence",`Treating inner experience as if it were outer reality [[Chung2026]].`,"mbt"],
 ["Psychoeducation",`Learning about BPD; a workshop within a week of diagnosis reduced impulsivity and stormy relationships [[Zanarini2008Psychoed]].`,"assess"],
 ["Psychosocial assessment",`A needs-focused assessment after self-harm, not delayed by medical treatment or alcohol levels [[NICE2022NG225]].`,"nursing"],
 ["Punitive parent",`A harsh, self-critical schema mode characteristic of BPD [[Arntz2005Modes]].`,"schema"],
 ["Recovery",`Remission plus good social and vocational functioning; reached by 60% at 16 years in MSAD [[Zanarini2012]].`,"course"],
 ["Recurrence",`Return of the diagnosis after remission; only 5.9% of MSAD remitters at 6 years [[Zanarini2003Course]].`,"course"],
 ["Referral bias",`Distortion from who reaches clinics; it explains much of the female excess in clinical samples [[Skodol2003]].`,"what"],
 ["Reflective functioning",`A measure of mentalizing; very large deficit in BPD (d = 1.68) [[Bora2021]].`,"brain"],
 ["Rejection sensitivity",`Anxious expectation of rejection; pooled r = 0.326 with BPD [[Foxhall2019]].`,"emotion"],
 ["Remission",`No longer meeting the criteria; 99% reached a 2-year remission by 16 years in MSAD [[Zanarini2012]].`,"course"],
 ["Respiratory sinus arrhythmia (RSA)",`Heart-rate variability with breathing, a marker of regulation; low at rest in BPD [[Kuo2009]].`,"emotion"],
 ["Risk formulation",`An individual understanding of risk within every psychosocial assessment, which NICE NG225 prefers to risk scales [[NICE2022NG225]].`,"crisis"],
 ["Risk scales",`Checklists scoring suicide risk; pooled PPV for suicide only 5.5% [[Carter2017PPV]], not to be used to predict suicide [[NICE2022NG225]].`,"crisis"],
 ["Safe messaging",`Talking and writing about suicide without describing methods, with hope and support sources; method reporting raises risk [[Niederkrotenthaler2020,SamaritansMedia]].`,"crisis"],
 ["Safety planning",`A prioritised written list of coping strategies and contacts; it cut suicidal behaviour by about 43% [[Stanley2018ED,Nuij2021]].`,"crisis"],
 ["Safewards",`Simple ward interventions that cut conflict by 15% and containment by 23.2% [[Bowers2015]].`,"nursing"],
 ["Samaritans 116 123",`Free support in the UK and Ireland, any time, from any phone [[Samaritans116123]].`,"crisis"],
 ["Schema mode",`A momentary emotional state and coping style; BPD has four maladaptive modes and a weak healthy adult [[Arntz2005Modes]].`,"schema"],
 ["Schema therapy",`A therapy that maps modes and builds a healthy adult; best as combined individual and group therapy [[Arntz2022GST]].`,"schema"],
 ["SCID-5-PD",`The Structured Clinical Interview for DSM-5 Personality Disorders; reliable for BPD in a single-country study (Early evidence) [[Gharraee2022]].`,"assess"],
 ["Self-esteem instability",`Fluctuating self-worth; possibly more specific to BPD than affective instability [[Kockler2022]].`,"emotion"],
 ["Self-harm",`Any intentional self-injury or self-poisoning; specialist psychotherapies reduce it [[Storebo2020]], and no one should be excluded from care because of it [[NICE2009]].`,"crisis"],
 ["Sensitivity and specificity",`The share of true cases a test detects, and of non-cases it correctly clears [[Zanarini2003MSI]].`,"assess"],
 ["Severity (ICD-11)",`Mild, moderate or severe, marked by harm and impairment: mild "typically not", severe "often" associated with harm [[Bach2018BMC]].`,"icd"],
 ["Skills group",`DBT's weekly class of about 4–10 people, with teaching, practice and homework [[Chapman2006DBT]].`,"dbt"],
 ["SNP heritability",`Heritability captured by common genetic variants; about 17% for BPD [[Streit2026]].`,"genes"],
 ["Splitting",`A primitive defence in Kernberg's model, seeing people as all good or all bad [[Kernberg1967,Gunderson2009Ontogeny]].`,"history"],
 ["Standardised mortality ratio (SMR)",`Observed over expected deaths; 8.3 for hospital-treated BPD in Denmark [[Kjaer2020]].`,"what"],
 ["Standardised mean difference (SMD)",`An effect size in SD units; −0.52 for psychotherapy on BPD severity in Cochrane 2020 [[Storebo2020]].`,"compare"],
 ["STEPPS",`Systems Training for Emotional Predictability and Problem Solving, a 20-week add-on group involving the support network [[Blum2008STEPPS]].`,"gpm"],
 ["Stepped care",`Starting brief and stepping up as needed; a whole-service model cut bed days per admission from 13.46 to 4.28 [[Grenyer2018Stepped]].`,"gpm"],
 ["Stigma",`Unfair negative views; nearly half of 706 clinicians preferred to avoid patients with BPD [[Black2011Attitudes]].`,"what"],
 ["Structural stigma",`Policies, norms and service design that limit access to care for people with BPD and families [[Klein2022]].`,"what"],
 ["Structured clinical management (SCM)",`A generalist comparator; both SCM and MBT improved substantially in Bateman 2009 [[Bateman2009]].`,"mbt"],
 ["Substance use disorder",`Present in about half of people with BPD; its absence best predicts remission [[Trull2018,Zanarini2024Comorbid]].`,"differential"],
 ["Supervision",`Routine staff support NICE CG78 asks for; NG225 adds reflective practice [[NICE2009,NICE2022SelfHarm]].`,"nursing"],
 ["Supported employment",`Help into work; it helps people with personality disorders find jobs about as often as people with other mental illnesses [[Juurlink2022]].`,"living"],
 ["Target hierarchy",`DBT's order: life-threatening, then therapy-interfering, then quality-of-life-interfering behaviour [[Chapman2006DBT]].`,"dbt"],
 ["Teleological mode",`Accepting only physical, goal-directed actions as proof of what someone feels or intends [[Chung2026]].`,"mbt"],
 ["Theory of mind",`Inferring others' beliefs and intentions; only modestly reduced in BPD (d = 0.36) [[Bora2021]].`,"brain"],
 ["Therapeutic relationship",`Trust, learning about the disorder and validation were the parts people with BPD valued with community nurses [[RomeuLabayen2020]].`,"nursing"],
 ["Transactional model",`Fruzzetti's model of child vulnerability and family invalidation shaping each other; it blames no one [[Fruzzetti2005]].`,"causes"],
 ["Transference-focused psychotherapy (TFP)",`A psychodynamic therapy; it beat experienced community therapists on symptoms and dropout [[Doering2010,Clarkin2007]].`,"schema"],
 ["Treatment as usual (TAU)",`The comparator in many trials; small-to-moderate symptom improvement but no change in self-harm in meta-analysis [[Finch2019TAU]].`,"compare"],
 ["Twin study",`Comparing identical (MZ) and fraternal (DZ) twins to estimate heritability [[Torgersen2000,Distel2008]].`,"genes"],
 ["Unique environment",`Experiences not shared by siblings; most of the non-genetic variance in BPD [[Distel2008]].`,"genes"],
 ["Validation",`Communicating that a person's experience makes sense; a core DBT and nursing skill [[Lynch2006DBT,RomeuLabayen2020]].`,"families"],
 ["Valproate",`An anticonvulsant with a boxed warning for malformations and lower IQ after exposure in pregnancy [[FDA-Depakote,Meador2013NEAD]].`,"meds"],
 ["Vulnerable child",`The abandoned/abused child schema mode in BPD [[Arntz2005Modes]].`,"schema"],
 ["ZAN-BPD",`The Zanarini Rating Scale: 9 criteria rated 0–4 by a clinician, total 0–36, over 1 week [[Zanarini2003ZAN]].`,"assess"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'msi bpd' or 'zan-bpd' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, presentation, stigma & history',B:'Causes: genes, temperament, adversity & the biosocial model',C:'Mechanisms: emotion dysregulation, neurobiology & mentalizing',D:'Diagnosis: DSM-5-TR, ICD-11, assessment & differential',E:'Psychological treatments: DBT, MBT, schema therapy, TFP, GPM & their evidence',F:'Medication evidence, crisis care & suicide and self-harm safety',G:'Course, comorbidity, recovery & research toward better treatment',H:'Living, families, work and school & nursing care'};
const SO_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SO_svc=s=>s.unverified?[]:SO_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SO_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(SO_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SO_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SO_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SO_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SO_link(s)?`<a href="${esc(SO_link(s))}" target="_blank" rel="noopener">${esc(SO_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SO_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
