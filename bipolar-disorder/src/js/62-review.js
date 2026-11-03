/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding bipolar disorder",2:"Part 2 · Diagnosis",3:"Part 3 · Medicines",4:"Part 4 · Therapy, safety & pregnancy",5:"Part 5 · Course & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding bipolar disorder ---- */
 [1,`How common are bipolar I and bipolar II in the WHO World Mental Health surveys?`,`Lifetime prevalence 0.6% for bipolar I and 0.4% for bipolar II; 1.4% for subthreshold bipolar disorder and 2.4% for the whole spectrum (61,392 adults, 11 countries) [[Merikangas2011]].`],
 [1,`What lifetime prevalence did the US NCS-R find?`,`Bipolar I 1.0%, bipolar II 1.1% and subthreshold bipolar disorder 2.4% (9,282 adults) [[Merikangas2007]].`],
 [1,`When does bipolar disorder usually begin?`,`Usually between ages 15 and 25, and depression is the most frequent first presentation [[Nierenberg2023]]. Mean onset in the WMH surveys was 18.4 years for bipolar I and 20.0 for bipolar II [[Merikangas2011]].`],
 [1,`Is bipolar disorder more common in women or men?`,`About equal overall. Bipolar II, rapid cycling and mixed episodes are more common in women [[Diflorio2010]].`],
 [1,`In bipolar I, how much of the time is spent with symptoms, and of which kind?`,`Symptoms in 47.3% of weeks over 12.8 years: depressive 31.9%, manic or hypomanic 8.9%, cycling or mixed 5.9% [[Judd2002]].`],
 [1,`And in bipolar II?`,`Symptoms in 53.9% of weeks: depressive 50.3%, hypomanic only 1.3% [[Judd2003]]. The lows dominate the long-term course [[McIntyre2020Lancet]].`],
 [1,`Is mania always a happy, euphoric state?`,`No. Among 316 inpatients, motor activation, racing thoughts, pressured speech and less sleep were most frequent, and irritability and dysphoria were prominent: mania is "not a purely euphoric state" [[Cassidy1998]].`],
 [1,`How common are psychotic symptoms over a lifetime?`,`About 63% in bipolar I and 22% in bipolar II (54 studies, N = 23,461) [[Aminoff2022]].`],
 [1,`How often do mood episodes carry DSM-5 mixed features?`,`Pooled 11.6% of major depressive episodes and 26.8% of manic or hypomanic episodes [[Na2021]].`],
 [1,`How much shorter is life expectancy, on average?`,`Pooled life expectancy 66.88 years, about 12.89 years of potential life lost [[Chan2022]], mostly from natural causes such as heart disease [[Kessing2015,Biazus2023]]. These are population statistics.`],
 [1,`What are the all-cause and suicide SMRs?`,`All-cause SMR 2.05; suicide SMR 14.44 [[Hayes2015]]. Population figures, not personal predictions; treatment lowers risk [[Cipriani2013]].`],
 [1,`What heritability do twin studies report?`,`About 60–85%: 85% in UK twins, 93% in Finnish twins and 60% in a large Swedish twin register [[McGuffin2003,Kieseppa2004,Johansson2019]].`],
 [1,`If one identical twin has bipolar I, does the other always develop it?`,`No. Finnish MZ concordance was 0.43 (DZ 0.06), so genes raise risk but do not decide it [[Kieseppa2004]].`],
 [1,`What is a child's risk of bipolar disorder by age 52 by number of affected parents?`,`Danish register: 0.48% with neither parent, 4.4% with one and 24.9% with both [[Gottesman2010]]. Most children of an affected parent never develop it.`],
 [1,`How many risk loci have GWAS found?`,`30 in 2019, 64 in 2021 (41,917 cases) and 298 in 2025 (158,036 multi-ancestry cases) [[Stahl2019,Mullins2021,OConnell2025]].`],
 [1,`Can a polygenic risk score diagnose bipolar disorder?`,`No. It explains about 4.6% of liability (AUC about 0.65–0.70), "insufficient for diagnostic prediction" [[Mullins2021,OConnell2025]].`],
 [1,`Which disorder shares the most genetics with bipolar disorder?`,`Schizophrenia: SNP genetic correlation about 0.68–0.70 [[PGCCDG2013NatGenet,PGCCDG2019]]. Bipolar II correlates more with major depression [[Stahl2019]].`],
 [1,`What is the "final common pathway" idea about sleep?`,`Many triggers may set off mania by causing sleep loss, and mania cuts sleep further, a self-reinforcing loop (Hypothesis with experimental support) [[Wehr1987]].`],
 [1,`What is the most robust early warning sign of mania?`,`Sleep disturbance, in a median 77% of prodromes; at least 80% of people can name an early warning sign [[Jackson2003]].`],
 [1,`What does ENIGMA show in the bipolar brain, and can a scan diagnose it?`,`Thinner frontal, temporal and parietal cortex (largest d about −0.29) and a smaller hippocampus. Effects are small and overlap with healthy people, so a scan cannot diagnose [[Hibar2018,Hibar2016]].`],
 /* ---- Part 2: diagnosis ---- */
 [2,`What is Criterion A for a manic episode in DSM-5-TR?`,`Abnormally and persistently elevated, expansive or irritable mood AND increased activity or energy, for at least 1 week most of the day, nearly every day, or any duration if hospitalisation is needed [[APA2022,Yatham2018]].`],
 [2,`How many Criterion B symptoms are needed?`,`At least 3 of 7, or 4 if the mood is only irritable [[APA2022,Yatham2018]].`],
 [2,`What turns an episode into mania rather than hypomania?`,`Marked impairment in functioning, hospitalisation to prevent harm, or psychotic features [[APA2022,Yatham2018]].`],
 [2,`What are the rules for a hypomanic episode?`,`At least 4 consecutive days, an unequivocal change observable by others, no marked impairment and no hospitalisation. Psychotic features make it mania by definition [[APA2022,Yatham2018]].`],
 [2,`What defines a major depressive episode?`,`5 or more of 9 symptoms over the same 2 weeks, including depressed mood or loss of interest or pleasure [[APA2022,Yatham2018]].`],
 [2,`Bipolar I versus bipolar II?`,`Bipolar I needs at least one manic episode. Bipolar II needs at least one hypomanic and one major depressive episode, and never mania [[APA2022,McIntyre2020Lancet]].`],
 [2,`What is cyclothymic disorder?`,`At least 2 years (1 in youth) of numerous subthreshold hypomanic and depressive periods, never meeting full episode criteria [[APA2022,Yatham2018]].`],
 [2,`Is bipolar II a "milder" form?`,`CANMAT calls that view "long-standing but discredited": disability is comparable, the economic burden can be greater and suicide-attempt rates are similar [[Yatham2018,Novick2010]].`],
 [2,`Does mania that starts on an antidepressant count?`,`Yes, if it persists at a full syndromal level beyond the drug's physiological effect: it counts towards bipolar I [[APA2022,Yatham2018]].`],
 [2,`What is the rapid cycling specifier?`,`At least 4 mood episodes in 12 months, separated by at least 2 months of remission or a switch to the opposite pole [[Strawbridge2022,APA2022]].`],
 [2,`How do DSM-5 and ICD-11 handle mixed states?`,`DSM-5 replaced the mixed episode with a "with mixed features" specifier; ICD-11 keeps a mixed episode of at least 2 weeks [[Yatham2018,Stein2020BMC]].`],
 [2,`What are the ICD-11 bipolar codes?`,`6A60 bipolar type I, 6A61 bipolar type II, 6A62 cyclothymic disorder. One manic or mixed episode is enough for type I [[Harter2025,Stein2020BMC]].`],
 [2,`What counts as a positive MDQ screen?`,`7 or more of 13 items, plus several in the same period, plus a moderate or serious problem [[Hirschfeld2000MDQ,Palmer2021]].`],
 [2,`Why does the MDQ perform so differently in clinics and in the community?`,`Sensitivity 0.73 and specificity 0.90 in mood clinics, but sensitivity 0.28 and specificity 0.97 in the general population [[Hirschfeld2000MDQ,Hirschfeld2003AJP]]. A screen only says "look closer".`],
 [2,`What does NICE say about bipolar questionnaires in primary care?`,`"Do not use questionnaires in primary care to identify bipolar disorder in adults." Ask depressed adults about past overactivity lasting 4 days or more [[NICE2014CG185]].`],
 [2,`What is the most common misdiagnosis, and how long does diagnosis take?`,`Unipolar depression; 69% of surveyed patients had been misdiagnosed [[Hirschfeld2003]]. Median delay to diagnosis 6.7 years [[Scott2022Delay]].`],
 [2,`Which features predict that depression will later turn out to be bipolar?`,`Family history of bipolar disorder (OR 2.89), psychotic symptoms (OR 4.76) and earlier onset [[Ratheesh2017]].`],
 [2,`How do mood shifts differ in BPD and bipolar disorder?`,`In borderline personality disorder they are transient and reactive to interpersonal stress; in bipolar disorder they are sustained episodes with well intervals [[Paris2015,Yatham2018]].`],
 [2,`When should secondary (medical) mania be suspected?`,`A first manic episode after age 40, neurological deficits or a history atypical for bipolar disorder [[Satzer2016]]. Glucocorticoids raise mania risk (HR 4.35) [[Fardet2012]].`],
 /* ---- Part 3: medicines ---- */
 [3,`What is lithium's US label indication?`,`Monotherapy for bipolar I disorder: acute manic and mixed episodes and maintenance, in patients 7 years and older [[FDA-Lithium]].`],
 [3,`Where does NICE place lithium?`,`"Offer lithium as a first-line, long-term pharmacological treatment for bipolar disorder" [[NICE2014CG185E]]. CANMAT calls it "the gold standard for maintenance treatment" [[Yatham2018]].`],
 [3,`How well does lithium prevent relapse versus placebo?`,`RR 0.66 for any mood episode and 0.52 for mania; the effect on depression is smaller [[Severus2014E]].`],
 [3,`What did Cipriani 2013 find for suicide?`,`Lithium reduced suicides versus placebo (OR 0.13) and deaths from any cause (OR 0.38) [[Cipriani2013]].`],
 [3,`What did the BALANCE trial show?`,`Lithium alone or with valproate prevented relapse better than valproate alone (combination vs valproate HR 0.59) [[Geddes2010BALANCE]].`],
 [3,`How does lithium work?`,`The label says the specific mechanism "is unknown" [[FDA-Lithobid]]. It inhibits inositol monophosphatase (50% at 0.8 mM) and GSK-3β (Ki about 2 mM) [[Hallcher1980,Klein1996]].`],
 [3,`How is lithium handled by the body?`,`Not metabolised; excreted by the kidney, with about 80% of filtered lithium reabsorbed in the proximal tubule. Half-life 18–36 hours [[FDA-Lithium]].`],
 [3,`When is a lithium level drawn?`,`As a trough, immediately before the next dose, about 12 hours after the previous one [[FDA-Lithium]].`],
 [3,`Which ranges are published for lithium?`,`NICE: 0.6–0.8 mmol/L for a first prescription [[NICE2014CG185E]]. US labels: toxic at ≥1.5 mEq/L, close to the therapeutic range [[FDA-Lithium]]. Quoted as published, not instructions.`],
 [3,`What are the label's grades of lithium neurotoxicity?`,`Mild: fine tremor, light-headedness, poor coordination. Moderate: drowsiness, ataxia, blurred vision, slurred speech. Severe: clonus, confusion, seizure, coma [[FDA-Lithium]]. Suspected toxicity is an emergency.`],
 [3,`Which medicines raise lithium levels?`,`Thiazides (often 25–40%) [[Finley1995]], ACE inhibitors (36% in one series) [[Finley1996]] and NSAIDs [[FDA-Lithium]].`],
 [3,`Which poisoning pattern causes most severe neurotoxicity?`,`Chronic poisoning during regular use, not acute overdose (OR 136) [[Oakley2001]].`],
 [3,`Does activated charcoal help in lithium toxicity?`,`No, it does not bind lithium. The label calls haemodialysis "the treatment of choice" for severe toxicity [[FDA-Lithium]].`],
 [3,`Which glands does long-term lithium affect?`,`Thyroid (hypothyroidism OR 5.78) and parathyroid (calcium up 0.09 mmol/L), so calcium and thyroid tests are part of monitoring [[McKnight2012]].`],
 [3,`What happens after lithium is stopped?`,`More than 50% of new episodes came within 10 weeks [[Suppes1991]]. NICE advises a gradual reduction over at least 4 weeks [[NICE2014CG185E]].`],
 [3,`What does lamotrigine treat?`,`Maintenance, mainly against depressive relapse; "treatment of acute manic or mixed episodes is not recommended" [[FDA-Lamictal,Calabrese2003Lamotrigine]].`],
 [3,`Why is lamotrigine started slowly?`,`Serious rash (adults 0.08–0.3%), nearly always within 2–8 weeks; valproate raises the risk and halves the label's titration [[FDA-Lamictal]].`],
 [3,`What are valproate's boxed warnings?`,`Hepatotoxicity, fetal risk and pancreatitis [[FDA-Depakote]]. Major malformations about 10% (EURAP 10.3%) [[Tomson2018]].`],
 [3,`Which antipsychotic-type treatments are FDA-approved for bipolar depression?`,`Quetiapine, lurasidone, cariprazine, lumateperone and olanzapine–fluoxetine [[FDA-Seroquel,FDA-Latuda,FDA-Vraylar,FDA-Caplyta,FDA-OlanzapineFluoxetine]].`],
 [3,`Did adding an antidepressant help in STEP-BD?`,`No: durable recovery 23.5% with an added antidepressant vs 27.3% with placebo, and similar switch rates [[Sachs2007STEPBD]].`],
 /* ---- Part 4: therapy, safety & pregnancy ---- */
 [4,`What psychological care does NICE recommend for relapse prevention?`,`A structured intervention (individual, group or family) designed for bipolar disorder with a published evidence-based manual, alongside medicines [[NICE2014CG185]].`],
 [4,`What did Barcelona group psychoeducation achieve at 5 years?`,`Mean recurrences 3.86 vs 8.37, and 154 vs 586 days acutely ill [[Colom2009]].`],
 [4,`How did family-focused therapy do over 2 years?`,`Relapse 35% vs 54% with crisis management (HR 0.38), and better medication adherence [[Miklowitz2003FFT]].`],
 [4,`What does IPSRT add to interpersonal therapy?`,`A social-rhythm component: regular daily routines. Acute-phase IPSRT lengthened time without a new episode [[Frank2005IPSRT]].`],
 [4,`What did the STEP-BD psychosocial trial find?`,`Intensive therapy (FFT, IPSRT or CBT) gave 64.4% year-end recovery vs 51.5% with 3-session collaborative care [[Miklowitz2007]].`],
 [4,`When is suicide-attempt risk highest in bipolar disorder?`,`During mixed states (37-fold) and major depressive phases (18-fold) versus other phases [[Valtonen2008]]. Help in these phases matters most.`],
 [4,`How well does safety planning work?`,`Safety-planning-type interventions cut suicidal behaviour (RR 0.57, NNT 16) [[Nuij2021]].`],
 [4,`When is the highest-risk time after psychiatric discharge?`,`The first 3 months (1,132 per 100,000 person-years), so follow-up is arranged before the person leaves [[Chung2017JAMAPsych,Mann2021Suicide]].`],
 [4,`Can risk scores predict who will die by suicide?`,`Not well: sensitivity 56% and specificity 79%, so care is offered to everyone rather than by risk category [[Large2016,Turecki2016Lancet]].`],
 [4,`What is the postpartum relapse risk in bipolar disorder?`,`66% in women medication-free in pregnancy vs 23% with preventive medication [[Wesseloo2016]]. Population figures for planning with the care team.`],
 [4,`How common is postpartum psychosis, and when does risk peak?`,`About 0.89–2.6 per 1,000 women [[VanderKruik2017]]; admission risk for first-time mothers peaks 10–19 days after birth [[MunkOlsen2006]]. It is an emergency.`],
 [4,`What is the cardiac risk of first-trimester lithium?`,`2.41% vs 1.15% (aRR 1.65); RVOT defects including Ebstein's anomaly 0.60% vs 0.18%, smaller than once thought [[Patorno2017]].`],
 /* ---- Part 5: course & living ---- */
 [5,`How often does bipolar disorder recur after recovery in STEP-BD?`,`48.5% within 2 years, with depressive recurrences more than twice as common as manic ones [[Perlis2006STEPBD]].`],
 [5,`Syndromal versus functional recovery after a first manic admission?`,`98% recovered syndromally by 2 years, but only 43% regained their previous work and living status [[Tohen2003]].`],
 [5,`How common are anxiety disorders in bipolar disorder?`,`Lifetime 45% [[Pavlova2015]], with 34.7% meeting criteria even during euthymia [[Pavlova2017]].`],
 [5,`Which substance use disorder is most common in clinical samples?`,`Alcohol use disorder, 42%; cannabis 20% [[Hunt2016Clinical]].`],
 [5,`How common is metabolic syndrome?`,`37.3%, about twice the general-population odds, and higher with antipsychotics (45.3%) [[Vancampfort2013]].`],
 [5,`What is expressed emotion, and why does it matter?`,`Critical, hostile or over-involved family attitudes; high EE predicts relapse [[Miklowitz1988EE,Butzlaff1998]].`],
 [5,`How heavy is caregiver burden?`,`In STEP-BD, 89% of caregivers reported moderate or higher burden from problem behaviours [[Perlick2007]]. NICE asks services to offer carers education and support [[NICE2014CG185]].`],
 [5,`What does NICE say about the environment in acute mania?`,`Access to calming environments and reduced stimulation, and no important decisions until recovery [[NICE2014CG185]].`],
 [5,`What are the NICE NG10 observation levels?`,`Low-level intermittent (every 30–60 minutes), high-level intermittent (every 15–30 minutes), continuous, and multiprofessional continuous [[NICE-NG10]].`],
 [5,`How does NICE monitor antipsychotic metabolic effects?`,`Weight or BMI weekly for 6 weeks, then at 12 weeks; glucose or HbA1c and lipids at 12 weeks [[NICE2014CG185]].`],
 [5,`What did a bright light trial in bipolar depression show?`,`Remission 68.2% with 7,000-lux midday light vs 22.2% with dim red light, with no polarity switches (n = 46) [[Sit2018]].`],
 /* ---- Part 6: history ---- */
 [6,`Who first described mania and melancholia as two states of one disease?`,`Perhaps Aretaeus of Cappadocia, 1st century AD [[Angst2001]].`],
 [6,`What happened in Paris in 1854?`,`Baillarger presented "folie à double forme" and Falret "folie circulaire"; the printed record supports Falret's priority [[Pichot2004]].`],
 [6,`What did Kraepelin do in 1899?`,`Brought the affective disorders together as "manic-depressive insanity" [[Angst2001]], separating it from dementia praecox [[Pichot2004]].`],
 [6,`Who separated bipolar from unipolar illness in 1966?`,`Jules Angst and Carlo Perris, independently [[Angst1966,Perris1966,Pichot2004]].`],
 [6,`Who reintroduced lithium, and when did it reach the US?`,`John Cade in 1949 [[Cade1949]]; Schou's controlled trial followed in 1954, and the US became the 50th country to allow lithium in 1970 [[Schou1954,Shorter2009]].`],
 [6,`When did "bipolar disorder" enter the DSM?`,`DSM-III in 1980; DSM-IV (1994) added the stand-alone hypomanic episode and DSM-5 (2013) made increased energy a core criterion [[Mason2016]].`]
];
const RV_MN=[
 ["DIGFAST","memory aid",`The 7 manic Criterion B symptoms: <b>D</b>istractibility, <b>I</b>nsomnia (decreased need for sleep), <b>G</b>randiosity, <b>F</b>light of ideas, <b>A</b>ctivity increase, <b>S</b>peech pressure, <b>T</b>houghtlessness (risky activities). 3 needed, or 4 if mood is only irritable [[APA2022,Yatham2018]].`],
 ["Mood AND motor","memory aid",`Since DSM-5, Criterion A needs both a mood change and increased activity or energy [[Mason2016,APA2022]]. Adding energy cut the prevalence of manic or hypomanic episodes by at least a third [[Grunze2021]].`],
 ["Four days, one week","memory aid",`Hypomania lasts at least 4 consecutive days; mania at least 1 week, or any duration if hospitalisation is needed [[APA2022,Yatham2018]].`],
 ["One mania makes I","memory aid",`A single lifetime manic episode is required, and enough, for bipolar I. Bipolar II needs hypomania plus a major depressive episode and never mania [[APA2022,McIntyre2020Lancet]].`],
 ["SIG E CAPS + mood","memory aid",`Depressive episode symptoms: <b>S</b>leep, <b>I</b>nterest, <b>G</b>uilt, <b>E</b>nergy, <b>C</b>oncentration, <b>A</b>ppetite, <b>P</b>sychomotor change, thoughts of death (<b>S</b>), plus depressed mood: 5 of 9 for 2 weeks [[APA2022,Yatham2018]].`],
 ["Trough at twelve","memory aid",`A lithium level is drawn just before the next dose, about 12 hours after the last one [[FDA-Lithium]].`],
 ["Watch the NAT","memory aid",`<b>N</b>SAIDs, <b>A</b>CE inhibitors (and ARBs) and <b>T</b>hiazides can push lithium levels up [[FDA-Lithium,Finley1995,Finley1996]]. Vomiting, diarrhoea, fever and heavy sweating can too [[NICE2014CG185E]].`],
 ["Shaky, unsteady, sick, confused","memory aid",`Worsening tremor, unsteadiness, vomiting or diarrhoea, and confusion can signal lithium toxicity: an emergency [[FDA-Lithium,FDA-Lithobid]].`],
 ["Lamotrigine lifts lows, lithium limits highs","memory aid",`Lamotrigine mainly delays depression and lithium mainly delays mania [[Calabrese2003Lamotrigine,Bowden2003Lamotrigine]].`],
 ["Low and mixed: lean in","memory aid",`Suicide-attempt risk is highest in mixed and depressive phases, not mania [[Valtonen2008,Miller2020Suicide]]. Those are the times for extra support and a safety plan [[Nuij2021]].`]
];
/* the seven Criterion B symptoms on the DIGFAST memory aid */
const RV_B=[
 ['D','Distractibility','distractibility'],
 ['I','Insomnia','decreased need for sleep'],
 ['G','Grandiosity','inflated self-esteem or grandiosity'],
 ['F','Flight of ideas','or the feeling that thoughts race'],
 ['A','Activity','more goal-directed activity, agitation'],
 ['S','Speech','more talkative, pressure to keep talking'],
 ['T','Thoughtlessness','risky acts with painful consequences']
];
const RV_LIT=[2,1,5,3];/* order in which the counter lights rows: G, I, S, F */
const RV_STEPS=[
 {from:0,at:.12,k:'Criterion A',t:'Mood and energy, together',txt:`A manic or hypomanic episode starts with a two-part Criterion A: abnormally and persistently elevated, expansive or irritable mood, and abnormally and persistently increased activity or energy, most of the day, nearly every day [[APA2022,Yatham2018]]. DSM-5 (2013) made energy a required core symptom; before that a mood change alone was enough [[Mason2016]].`,pt:'A high is more than a good mood: energy and activity rise too, and other people notice.',hook:'Since DSM-5: mood change AND increased activity or energy.'},
 {from:.2,at:.33,k:'DIGFAST',t:'Seven B symptoms',txt:`As a memory aid, DIGFAST holds the seven Criterion B symptoms: distractibility, decreased need for sleep, grandiosity, flight of ideas or racing thoughts, increased goal-directed activity or agitation, more talkative or pressured speech, and excessive involvement in risky activities [[APA2022,Yatham2018]]. The letters are a teaching shortcut, not DSM wording. Decreased need for sleep is also the most common early warning sign of mania [[Jackson2003]].`,pt:'Seven letters, seven signs. Sleeping much less without feeling tired is often the first one.',hook:'Sleep disturbance: most robust early sign of mania (median 77%).'},
 {from:.4,at:.53,k:'3 of 7, or 4',t:'Counting the symptoms',txt:`At least 3 of the 7 symptoms must be present to a significant degree, or 4 if the mood is only irritable [[APA2022,Yatham2018]]. Irritability is common in mania, which is "not a purely euphoric state" [[Cassidy1998]].`,pt:'If the high shows up mostly as irritability, one more sign is needed before it counts.',hook:'Irritable mood only: 4 of 7 B symptoms instead of 3.'},
 {from:.6,at:.72,k:'Duration',t:'Four days or one week',txt:`Hypomania needs at least 4 consecutive days; mania at least 1 week, or any duration if hospitalisation is needed [[APA2022,Yatham2018]]. ICD-11 says hypomania lasts "at least several days" [[Stein2020BMC]]. In bipolar II, brief (2–6 day) and longer hypomanias did not differ on any course measure [[Judd2003]].`,pt:'How long a high lasts is one part of how doctors name it.',hook:'Hypomania ≥4 consecutive days; mania ≥1 week (any length if hospitalised).'},
 {from:.8,at:.94,k:'Criterion C',t:'What makes it mania',txt:`Mania needs marked impairment, hospitalisation to prevent harm, or psychotic features; hypomania brings an observable change without these, and psychosis makes an episode manic by definition [[APA2022,Yatham2018]]. One manic episode is enough for bipolar I; hypomania plus a major depressive episode, never mania, is bipolar II [[APA2022,McIntyre2020Lancet]]. These criteria are for learning, not for diagnosing yourself: diagnosis needs a clinician's assessment over time [[Yatham2018]].`,pt:'Most people recover from an episode with treatment: 98% after a first manic admission recovered within 2 years [[Tohen2003]].',hook:'Bipolar II is not "bipolar lite": disability is comparable to bipolar I [[Yatham2018]].'}
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

  /* ---- mnemonic in motion: DIGFAST and the episode gates ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    const L=N?{x:16,y:42,w:368}:{x:16,y:46,w:340},R=N?{x:16,y:350,w:368,h:240}:{x:372,y:20,w:332,h:344};
    const RH=N?41:42,TH=34;
    const ph=[0,.19,.39,.59,.79,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=1-ramp(t,ph[1]-.02,ph[1]+.015);
    const rev=k=>ramp(t,.2+k*.022,.23+k*.022);/* row k revealed */
    const nLit=Math.min(4,Math.floor(ramp(t,.41,.555)*4.999));
    const lit=k=>t>=.4&&RV_LIT.indexOf(k)>-1&&RV_LIT.indexOf(k)<nLit;
    let s='';
    const ttl=t<.2?'First Criterion A, then the B list':t<.4?'D-I-G-F-A-S-T: the seven B symptoms':t<.6?`Symptoms present: ${nLit} of 7`:'Criterion B met: 4 of 7';
    s+=`<text class="t-lbl" x="${L.x}" y="${L.y-14}">${ttl}</text>`;
    RV_B.forEach(([ch,w,gl],k)=>{
      const y=L.y+k*RH,on=t<.2?0:rev(k),hot=lit(k);
      const op=f1(.22+.78*on);
      s+=`<g style="opacity:${op}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${TH}" rx="8" style="fill:var(${hot?'--up-soft':'--panel'});stroke:var(${hot?'--up':'--line'});stroke-width:${hot?2:1.1}"/>`;
      s+=`<circle cx="${L.x+19}" cy="${y+TH/2}" r="12" style="fill:var(${hot?'--up-fill':'--brand'})"/><text class="t-lbl t-mid" x="${L.x+19}" y="${y+TH/2+4.5}" style="fill:var(--on-brand)">${ch}</text>`;
      s+=`<text class="t-sm" x="${L.x+40}" y="${y+14}" style="fill:var(--ink);font-weight:700;font-size:${N?12:11}px">${w}</text><text class="t-xs" x="${L.x+40}" y="${y+27}" style="font-size:${N?10.5:9.5}px">${gl}</text>`;
      if(hot)s+=`<text class="t-lbl t-end" x="${L.x+L.w-10}" y="${y+TH/2+4.5}" style="fill:var(--up)">✓</text>`;
      s+='</g>'});
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const W=R.w;
    /* phase 0: the two-part gate */
    if(v0>0){const bh=N?46:58,y1=N?44:52,y2=N?124:150,c1=ramp(t,.03,.07),c2=ramp(t,.07,.11);
      s+=`<g style="opacity:${f1(v0)}"><text class="t-lbl" x="16" y="28">Criterion A: both parts</text>`;
      [[y1,'Mood','elevated, expansive or irritable',c1,'--up'],[y2,'Activity or energy','abnormally, persistently increased',c2,'--rx']].forEach(([y,h,sub,c,col])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(${col});stroke-width:${f1(1+c*1.4)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+20}">${h}</text><text class="t-xs" x="30" y="${y+36}">${sub}</text>`;
        s+=`<circle cx="${W-40}" cy="${y+bh/2}" r="11" style="fill:var(${col});opacity:${f1(c)}"/><text class="t-lbl t-mid" x="${W-40}" y="${y+bh/2+4.5}" style="fill:var(--on-brand);opacity:${f1(c)}">✓</text>`});
      const ya=(y1+bh+y2)/2;s+=`<text class="t-big t-mid" x="${W/2}" y="${ya+6}" style="fill:var(--brand)">AND</text>`;
      const yf=N?196:240;
      s+=`<text class="t-sm" x="16" y="${yf}" style="fill:var(--ink)">most of the day, nearly every day</text><text class="t-xs" x="16" y="${yf+18}">required together since DSM-5 (2013)</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="${yf+36}">before then, a mood change alone was enough</text>`;
      s+='</g>'}
    /* phase 1: the letters */
    const a1=vis(1);
    if(a1>0){const sp=(W-32)/7,yl=N?78:92;
      s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="28">Memory aid: DIGFAST</text>`;
      RV_B.forEach(([ch],k)=>{s+=`<text class="t-big t-mid" x="${f1(16+sp*(k+.5))}" y="${yl}" style="fill:var(--up);font-size:${N?30:32}px;opacity:${f1(rev(k))}">${ch}</text>`});
      const lines=['7 Criterion B symptoms of mania','and hypomania, one per letter','','a teaching shortcut, not DSM wording','sleep loss is often the first sign'];
      lines.forEach((l,k)=>{if(l)s+=`<text class="${k<2?'t-sm':'t-xs'}" x="16" y="${(N?118:138)+k*(N?20:24)}" style="${k<2?'fill:var(--ink)':''}">${l}</text>`});
      s+='</g>'}
    /* phase 2: the counter */
    const a2=vis(2);
    if(a2>0){const cw=(W-32)/7;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="28">How many are needed?</text><text class="t-big t-end" x="${W-16}" y="30" style="fill:var(--up);font-size:24px">${nLit}</text><text class="t-xs t-end" x="${W-16}" y="44">of 7 present</text>`;
      [['elevated or expansive mood',3,N?70:84],['irritable mood only',4,N?150:184]].forEach(([lab,need,y])=>{const ok=nLit>=need;
        s+=`<text class="t-sm" x="16" y="${y}" style="fill:var(--ink)">${lab}: ${need} of 7</text>`;
        for(let c=0;c<7;c++)s+=`<rect x="${f1(16+c*cw+2)}" y="${y+10}" width="${f1(cw-4)}" height="22" rx="5" style="fill:var(${c<nLit?'--up-fill':'--panel'});stroke:var(--line);opacity:${c<nLit?.85:1}"/>`;
        const mx=16+need*cw;s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${y+4}" y2="${y+38}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/>`;
        s+=`<text class="t-xs" x="16" y="${y+50}" style="fill:var(${ok?'--good':'--muted'})">${ok?'threshold met':'not yet'}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?226:290}">symptoms must be a clear change from usual</text></g>`}
    /* phase 3: the clock */
    const a3=vis(3);
    if(a3>0){const x0=24,x1=W-24,X=d=>x0+(x1-x0)*d/10,ya=N?120:150,d=10*ramp(t,.61,.76);
      s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="28">How long has it lasted?</text><text class="t-big t-end" x="${W-16}" y="30" style="fill:var(--brand);font-size:22px">day ${Math.min(10,Math.floor(d))}</text>`;
      s+=`<rect x="${x0}" y="${ya-26}" width="${f1(X(d)-x0)}" height="20" rx="6" style="fill:var(--up-fill);opacity:.8"/>`;
      s+=`<line x1="${x0}" x2="${x1}" y1="${ya}" y2="${ya}" class="axis"/>`;
      for(let k=0;k<=10;k+=2)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ya}" y2="${ya+5}" class="axis"/><text class="t-xs t-mid" x="${f1(X(k))}" y="${ya+17}">${k}</text>`;
      [[4,'hypomania: 4+ days','--up',ya+40],[7,'mania: 1 week+','--accent',ya+70]].forEach(([k,lab,col,yl])=>{const on=d>=k;
        s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ya-34}" y2="${yl-12}" style="stroke:var(${col});stroke-width:2;opacity:${on?1:.35}"/><text class="t-sm ${k===7?'t-end':''}" x="${f1(X(k)+(k===7?6:-6))}" y="${yl}" style="fill:var(${col});opacity:${on?1:.45};font-weight:700">${lab}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?226:300}">mania: any length if hospitalisation is needed</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="318">ICD-11 hypomania: "at least several days"</text>`;
      s+='</g>'}
    /* phase 4: Criterion C and the diagnosis */
    const a4=vis(4);
    if(a4>0){const chips=['marked impairment in functioning','hospitalisation to prevent harm','psychotic features'],ch=N?24:28,y0=N?40:48;
      s+=`<g style="opacity:${f1(a4)}"><text class="t-lbl" x="16" y="28">Criterion C: any one makes it mania</text>`;
      chips.forEach((c,k)=>{const on=ramp(t,.81+k*.02,.84+k*.02),y=y0+k*(ch+6);
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${ch}" rx="7" style="fill:var(--accent-soft);stroke:var(--accent);opacity:${f1(.25+.75*on)}"/><text class="t-sm" x="28" y="${y+ch/2+4}" style="fill:var(--ink);opacity:${f1(.3+.7*on)}">${c}</text>`});
      const o1=ramp(t,.88,.92),o2=ramp(t,.92,.96),yb=y0+3*(ch+6)+(N?6:14),bh=N?44:56;
      s+=`<g style="opacity:${f1(o1)}"><rect x="16" y="${yb}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--up);stroke-width:2"/><text class="t-lbl" x="28" y="${yb+19}" style="fill:var(--up)">yes: manic episode</text><text class="t-xs" x="28" y="${yb+(N?35:38)}">one is enough for bipolar I</text></g>`;
      const yc=yb+bh+(N?8:12);
      s+=`<g style="opacity:${f1(o2)}"><rect x="16" y="${yc}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--down);stroke-width:2"/><text class="t-lbl" x="28" y="${yc+19}" style="fill:var(--down)">no: hypomanic episode</text><text class="t-xs" x="28" y="${yc+(N?35:38)}">plus major depression, no mania: bipolar II</text></g>`;
      s+='</g>'}
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
 [1,`In the WHO World Mental Health surveys, lifetime prevalence of bipolar I disorder was:`,[`0.6%`,`6%`,`0.06%`,`16%`],0,`0.6% for bipolar I, 0.4% for bipolar II and 2.4% for the whole spectrum [[Merikangas2011]].`],
 [1,`Bipolar disorder most often first presents with:`,[`A manic episode with psychosis`,`A depressive episode`,`A mixed episode in late life`,`Rapid cycling`],1,`Depression is the most frequent first presentation, which is why it is often mistaken for unipolar depression [[Nierenberg2023,Grande2016]].`],
 [1,`Over 12.8 years of follow-up in bipolar I, which symptoms took up the most weeks?`,[`Manic`,`Hypomanic`,`Depressive`,`Psychotic`],2,`Depressive 31.9% vs manic or hypomanic 8.9% of weeks [[Judd2002]].`],
 [1,`The sex ratio for bipolar disorder overall is best described as:`,[`5 women to 1 man`,`3 men to 1 woman`,`Seen only in women after childbirth`,`About equal, with bipolar II and rapid cycling more common in women`],3,`Near-equal overall; women have more bipolar II, rapid cycling and mixed episodes [[Diflorio2010]].`],
 [1,`Among 316 inpatients with mania, which statement fits the findings?`,[`Mania is not purely euphoric: irritability and dysphoria were prominent`,`Every patient was euphoric`,`Sleep was usually increased`,`Speech was usually slowed`],0,`Motor activation, racing thoughts, pressured speech and less sleep were most frequent [[Cassidy1998]].`],
 [1,`Lifetime psychotic symptoms occur in about what share of people with bipolar I?`,[`5%`,`63%`,`99%`,`22%`],1,`About 63% in bipolar I and 22% in bipolar II [[Aminoff2022]].`],
 [1,`Pooled years of potential life lost in bipolar disorder are about:`,[`1`,`40`,`13`,`0`],2,`12.89 years [[Chan2022]], mostly from natural causes such as cardiovascular disease [[Kessing2015,Biazus2023]]. These are population statistics.`],
 [1,`The all-cause standardised mortality ratio for bipolar disorder is about:`,[`0.5`,`1.0`,`50`,`2`],3,`SMR 2.05; the suicide SMR is 14.44 [[Hayes2015]].`],
 [1,`Twin studies put the heritability of bipolar disorder at about:`,[`60–85%`,`5–10%`,`100%`,`25–30%`],0,`85% (UK), 93% (Finland) and 60% (Swedish twins) [[McGuffin2003,Kieseppa2004,Johansson2019]].`],
 [1,`In Finnish twins, the MZ co-twin concordance for bipolar I was 0.43. This shows:`,[`Bipolar disorder is not genetic`,`Genes raise risk but do not decide it`,`Twins never share illness`,`Environment explains everything`],1,`Fewer than half of identical co-twins developed it [[Kieseppa2004]].`],
 [1,`In the Danish register, the risk of bipolar disorder by age 52 with one affected parent was:`,[`0.48%`,`50%`,`4.4%`,`24.9%`],2,`0.48% with neither parent, 4.4% with one and 24.9% with both [[Gottesman2010]].`],
 [1,`The 2025 multi-ancestry GWAS of bipolar disorder found how many loci?`,[`2`,`30`,`64`,`298`],3,`298 loci from 158,036 cases, a fourfold increase over 64 in 2021 [[OConnell2025,Mullins2021]].`],
 [1,`A bipolar polygenic risk score today:`,[`Explains about 4.6% of liability and cannot diagnose an individual`,`Is the main diagnostic test`,`Explains 90% of risk`,`Predicts lithium dose`],0,`AUC about 0.65–0.70; "insufficient for diagnostic prediction" [[Mullins2021,OConnell2025]].`],
 [1,`The psychiatric disorder with the highest genetic correlation with bipolar disorder is:`,[`ADHD`,`Schizophrenia`,`Anorexia nervosa`,`Autism`],1,`rg about 0.68–0.70 [[PGCCDG2013NatGenet,PGCCDG2019]].`],
 [1,`Wehr's "final common pathway" to mania is:`,[`Dopamine excess`,`Inflammation`,`Sleep loss`,`Low lithium intake`],2,`Many triggers may act by reducing sleep, and mania worsens insomnia (Hypothesis) [[Wehr1987]].`],
 [1,`Which is the most robust early warning sign of mania?`,[`Headache`,`Weight loss`,`Low mood`,`Sleep disturbance`],3,`Median 77% of manic prodromes [[Jackson2003]].`],
 [1,`The fMRI pattern most often reported in bipolar disorder is:`,[`Under-active ventrolateral prefrontal cortex with over-active amygdala and limbic areas`,`A fully normal brain`,`Over-active prefrontal cortex with silent amygdala`,`Only cerebellar changes`],0,`From a meta-analysis of 65 studies and the circuit model [[Chen2011fMRI,Phillips2014]].`],
 [1,`Seasonal peaks in bipolar disorder are:`,[`Mania in early winter`,`Mania in spring and summer, depression in early winter`,`No seasonal pattern at all`,`Depression in summer only`],1,`About 15% of manic and 25% of depressive episodes show a seasonal pattern [[Geoffroy2014]].`],
 /* ---- Part 2 ---- */
 [2,`A manic episode must last at least:`,[`1 day`,`4 days`,`1 week, or any duration if hospitalisation is needed`,`2 weeks`],2,`DSM-5-TR Criterion A [[APA2022,Yatham2018]].`],
 [2,`If the mood is only irritable, how many Criterion B symptoms are needed?`,[`2`,`3`,`5`,`4`],3,`3 of 7 normally; 4 if the mood is only irritable [[APA2022,Yatham2018]].`],
 [2,`Since DSM-5, Criterion A for mania requires a mood change plus:`,[`Increased activity or energy`,`Psychosis`,`A family history`,`Weight loss`],0,`DSM-5 (2013) added increased activity or energy [[Mason2016,Yatham2018]].`],
 [2,`An episode with 5 manic symptoms for 5 days, observed by family, with no impairment, hospitalisation or psychosis, is:`,[`A manic episode`,`A hypomanic episode`,`Cyclothymic disorder`,`A mixed episode`],1,`At least 4 days, an observable change and no marked impairment define hypomania [[APA2022,Yatham2018]].`],
 [2,`Which feature makes an elevated-mood episode manic by definition?`,[`Talkativeness`,`Distractibility`,`Psychotic features`,`Decreased need for sleep`],2,`Psychosis, marked impairment or hospitalisation make it mania [[APA2022,Yatham2018]].`],
 [2,`Bipolar II disorder requires:`,[`At least one manic episode`,`Two years of subthreshold symptoms`,`Psychotic depression`,`At least one hypomanic and one major depressive episode, and never mania`],3,`[[APA2022,McIntyre2020Lancet]].`],
 [2,`A major depressive episode requires:`,[`5 of 9 symptoms over 2 weeks, including depressed mood or loss of interest`,`3 of 7 symptoms over 1 week`,`Any 2 symptoms for a month`,`Suicidal thoughts in every case`],0,`[[APA2022,Yatham2018]].`],
 [2,`Cyclothymic disorder in adults requires at least:`,[`1 week`,`2 years of subthreshold highs and lows`,`6 months`,`10 years`],1,`At least 1 year in children and adolescents; full episode criteria are never met [[APA2022,Yatham2018]].`],
 [2,`CANMAT describes the idea that bipolar II is a "less severe form" as:`,[`Proven by trials`,`True only in adolescents`,`Long-standing but discredited`,`An ICD-11 rule`],2,`Disability is comparable and suicide-attempt rates are similar [[Yatham2018,Novick2010]].`],
 [2,`A full manic episode emerges on an antidepressant and persists at full level after the drug's effect has worn off. DSM-5-TR counts it as:`,[`Substance-induced only`,`Not a mood episode`,`Cyclothymia`,`Evidence for bipolar I`],3,`[[APA2022,Yatham2018]].`],
 [2,`The rapid cycling specifier needs at least how many episodes in 12 months?`,[`4`,`2`,`8`,`12`],0,`Separated by at least 2 months of remission or a switch of polarity [[Strawbridge2022,APA2022]].`],
 [2,`How does ICD-11 differ from DSM-5 on mixed states?`,[`It has no mixed category`,`It keeps a mixed episode of at least 2 weeks`,`It requires psychosis`,`It uses a 4-day rule`],1,`DSM-5 uses a "with mixed features" specifier instead [[Stein2020BMC,Yatham2018]].`],
 [2,`In ICD-11, code 6A61 is:`,[`Bipolar type I disorder`,`Cyclothymic disorder`,`Bipolar type II disorder`,`Schizoaffective disorder`],2,`6A60 type I, 6A61 type II, 6A62 cyclothymic disorder [[Harter2025]].`],
 [2,`The standard positive MDQ screen is:`,[`Any 3 items`,`A score above 20`,`A clinician's interview`,`7 or more of 13 items, plus co-occurrence, plus a moderate or serious problem`],3,`[[Hirschfeld2000MDQ,Palmer2021]].`],
 [2,`In the US general population, MDQ sensitivity was about:`,[`0.28`,`0.73`,`0.99`,`0.50`],0,`Specificity 0.97; in mood clinics sensitivity was 0.73 [[Hirschfeld2003AJP,Hirschfeld2000MDQ]].`],
 [2,`NICE advice on bipolar questionnaires in primary care is:`,[`Use the MDQ for every adult`,`Do not use questionnaires in primary care to identify bipolar disorder in adults`,`Use them only for children`,`Use them instead of referral`],1,`Ask depressed adults about past overactivity lasting 4 days or more [[NICE2014CG185]].`],
 [2,`The most common misdiagnosis in people later found to have bipolar disorder is:`,[`ADHD`,`Schizophrenia`,`Unipolar depression`,`Hypothyroidism`],2,`69% had been misdiagnosed, most often with unipolar depression [[Hirschfeld2003]].`],
 [2,`Which predicts that major depression will later convert to bipolar disorder?`,[`Late onset`,`No family history`,`Weight loss`,`Psychotic symptoms (OR 4.76)`],3,`Also family history (OR 2.89) and earlier onset [[Ratheesh2017]].`],
 [2,`Mood shifts lasting hours, triggered by interpersonal stress, with no well-functioning intervals, point most towards:`,[`Borderline personality disorder`,`Bipolar I mania`,`Cyclothymia`,`Seasonal pattern`],0,`Bipolar episodes are sustained; BPD shifts are transient and reactive [[Paris2015,Yatham2018]]. The two can co-occur [[Fornaro2016]].`],
 [2,`A 62-year-old has a first manic episode and new neurological signs. Best next thought:`,[`Typical bipolar I, no tests needed`,`Suspect secondary mania and look for a medical cause`,`Cyclothymia`,`Borderline personality disorder`],1,`First mania after 40 and neurological deficits suggest secondary mania [[Satzer2016,Krauthammer1978]].`],
 [2,`Oral glucocorticoids were associated with mania at a hazard ratio of about:`,[`0.5`,`1.0`,`4.35`,`40`],2,`Compared with untreated people with the same disease; higher doses raised risk [[Fardet2012]].`],
 [2,`The Young Mania Rating Scale has:`,[`10 items scored 0–30`,`17 items`,`13 yes/no items`,`11 items scored 0–60`],3,`[[Young1978,Pigott2016Cochrane]].`],
 /* ---- Part 3 ---- */
 [3,`Lithium's relapse-prevention effect versus placebo is strongest against:`,[`Manic episodes`,`Depressive episodes only`,`Neither`,`Psychosis only`],0,`RR 0.52 for mania and 0.66 overall [[Severus2014E]].`],
 [3,`In Cipriani 2013, lithium versus placebo reduced suicides with an odds ratio of:`,[`1.5`,`0.13`,`0.95`,`3.0`],1,`Deaths from any cause OR 0.38 [[Cipriani2013]].`],
 [3,`In BALANCE, which arm did worst at preventing relapse?`,[`Lithium`,`Lithium plus valproate`,`Valproate alone`,`All were identical`],2,`Events: 54% combination, 59% lithium, 69% valproate [[Geddes2010BALANCE]].`],
 [3,`The lithium label describes its mechanism in mania as:`,[`Pure dopamine blockade`,`Serotonin reuptake inhibition`,`GABA agonism`,`Unknown`],3,`It inhibits IMPase and GSK-3β among other targets [[FDA-Lithobid,Hallcher1980,Klein1996]].`],
 [3,`Lithium is eliminated mainly by:`,[`The kidney, unchanged`,`Liver CYP3A4`,`Faeces`,`Lungs`],0,`Not metabolised; about 80% of filtered lithium is reabsorbed in the proximal tubule [[FDA-Lithium]].`],
 [3,`A lithium level is drawn:`,[`At any time`,`As a trough, about 12 hours after the last dose`,`1 hour after the dose`,`Only when symptoms change`],1,`Immediately before the next dose [[FDA-Lithium]].`],
 [3,`The US labels give the toxic lithium concentration as:`,[`≥0.4 mEq/L`,`≥0.8 mEq/L`,`≥1.5 mEq/L`,`≥5 mEq/L`],2,`Close to the therapeutic range of 0.8–1.2 mEq/L [[FDA-Lithium,FDA-Lithobid]]. Quoted as published.`],
 [3,`Which is a severe sign of lithium neurotoxicity in the label?`,[`Fine tremor`,`Mild thirst`,`Light-headedness`,`Seizure`],3,`Severe: clonus, confusion, seizure, coma [[FDA-Lithium]]. Suspected toxicity is an emergency.`],
 [3,`A thiazide diuretic is started in a person taking lithium. The expected effect is:`,[`Lithium levels often rise by 25–40%`,`Levels fall`,`No change`,`Lithium becomes inactive`],0,`[[Finley1995]].`],
 [3,`In older adults, admission for lithium toxicity rose within a month of starting:`,[`Paracetamol`,`An ACE inhibitor (RR 7.6) or loop diuretic (RR 5.5)`,`Vitamin D`,`An SSRI`],1,`[[Juurlink2004]].`],
 [3,`Most severe lithium neurotoxicity arises from:`,[`Acute overdose`,`Missing a dose`,`Chronic poisoning during regular use`,`Breastfeeding`],2,`Chronic vs acute OR 136 for severe neurotoxicity [[Oakley2001]].`],
 [3,`Which is NOT useful in lithium toxicity according to the label?`,[`Haemodialysis`,`Stopping or lowering the dose`,`Close level monitoring`,`Activated charcoal`],3,`Charcoal does not bind lithium; haemodialysis is "the treatment of choice" for severe toxicity [[FDA-Lithium]].`],
 [3,`Long-term lithium is associated with:`,[`Hypothyroidism and raised calcium`,`Hyperthyroidism in most people`,`Liver failure`,`Hair growth`],0,`Hypothyroidism OR 5.78; calcium up 0.09 mmol/L [[McKnight2012]].`],
 [3,`After stopping lithium, more than half of new episodes came within:`,[`2 years`,`10 weeks`,`1 day`,`5 years`],1,`NICE advises reducing gradually over at least 4 weeks [[Suppes1991,NICE2014CG185E]].`],
 [3,`Lamotrigine in bipolar disorder:`,[`Is first-line for acute mania`,`Works mainly against mania`,`Mainly delays depressive relapse and is not for acute mania`,`Is an antipsychotic`],2,`[[FDA-Lamictal,Calabrese2003Lamotrigine]].`],
 [3,`When lamotrigine is taken with valproate, the label's titration is:`,[`Doubled`,`Unchanged`,`Skipped`,`Halved, because valproate slows lamotrigine clearance`],3,`Serious rash risk rises with valproate [[FDA-Lamictal]].`],
 [3,`Valproate's boxed warning covers:`,[`Hepatotoxicity, fetal risk and pancreatitis`,`QT prolongation only`,`Agranulocytosis only`,`Weight loss`],0,`[[FDA-Depakote]].`],
 [3,`In EURAP, major malformations after valproate monotherapy were about:`,[`1%`,`10%`,`30%`,`0%`],1,`10.3% vs 2.9% for lamotrigine [[Tomson2018]].`],
 [3,`Before carbamazepine in people of Asian ancestry, the label advises testing for:`,[`HLA-B*57:01`,`CYP2D6`,`HLA-B*15:02`,`G6PD`],2,`Carriers have a high risk of SJS/TEN [[FDA-Equetro,Chen2011HLA]].`],
 [3,`Which is FDA-approved for bipolar II depression?`,[`Aripiprazole`,`Lamotrigine`,`Lithium`,`Lumateperone`],3,`Lumateperone covers bipolar I or II depression; quetiapine also covers bipolar II [[FDA-Caplyta,FDA-Seroquel,Calabrese2021Lumateperone]].`],
 [3,`In STEP-BD, adding an antidepressant to a mood stabiliser:`,[`Gave no added durable recovery`,`Doubled recovery`,`Caused mania in most`,`Was not studied`],0,`23.5% vs 27.3% with placebo [[Sachs2007STEPBD]].`],
 [3,`Antidepressant monotherapy in bipolar disorder was linked to:`,[`No change in mania risk`,`Higher mania risk in the first 3 months (HR 2.83)`,`Lower mania risk`,`Lithium toxicity`],1,`With a concurrent mood stabiliser, HR 0.79 [[Viktorin2014]].`],
 [3,`Which three drugs ranked most effective for acute mania in Cipriani 2011?`,[`Lamotrigine, gabapentin, topiramate`,`Lithium, valproate, carbamazepine`,`Haloperidol, risperidone, olanzapine`,`Fluoxetine, sertraline, bupropion`],2,`[[Cipriani2011]].`],
 [3,`In treatment-resistant bipolar depression, ECT versus algorithm medication gave response rates of:`,[`10% vs 50%`,`35% vs 35%`,`100% vs 0%`,`73.9% vs 35.0%`],3,`Remission did not differ [[Schoeyen2015]].`],
 /* ---- Part 4 ---- */
 [4,`Over 5 years, Barcelona group psychoeducation versus control gave:`,[`3.86 vs 8.37 recurrences`,`No difference`,`More hospital days`,`Only a cost increase`],0,`Days acutely ill 154 vs 586 [[Colom2009]].`],
 [4,`Family-focused therapy versus crisis management gave 2-year relapse rates of:`,[`80% vs 20%`,`35% vs 54%`,`50% vs 50%`,`5% vs 95%`],1,`HR 0.38 [[Miklowitz2003FFT]].`],
 [4,`IPSRT's distinctive ingredient is:`,[`Exposure therapy`,`Medication adherence alarms`,`Regular social rhythms (daily routines)`,`Light therapy`],2,`More regular rhythms went with fewer recurrences [[Frank2005IPSRT]].`],
 [4,`In the large pragmatic CBT trial (Scott 2006), CBT:`,[`Prevented all recurrences`,`Worsened outcomes`,`Was not tested`,`Was negative overall but helped people with fewer than 12 prior episodes`],3,`HR 1.05 overall [[Scott2006CBT]].`],
 [4,`Suicide-attempt incidence in bipolar disorder is highest during:`,[`Mixed states`,`Euthymia`,`Pure mania`,`Sleep`],0,`37-fold during mixed states, 18-fold in major depression [[Valtonen2008]]. Suicide is associated with depressed or mixed states, not mania [[Miller2020Suicide]].`],
 [4,`Safety-planning-type interventions reduced suicidal behaviour with an NNT of about:`,[`2`,`16`,`500`,`They had no effect`],1,`RR 0.57 [[Nuij2021]].`],
 [4,`A nurse plans discharge for a person admitted with bipolar depression. The highest-risk window for suicide is:`,[`Years 5–10`,`Only during admission`,`The first 3 months after discharge`,`There is no pattern`],2,`1,132 per 100,000 person-years; arrange follow-up before discharge [[Chung2017JAMAPsych,Mann2021Suicide]].`],
 [4,`The strongest risk factors for suicide death in bipolar disorder are:`,[`Mania and talkativeness`,`Age under 10`,`Being employed`,`A previous attempt and hopelessness`],3,`[[Hawton2005Bipolar]]. Help works and risk can be lowered with care [[Cipriani2013]].`],
 [4,`Postpartum relapse in women with bipolar disorder who were medication-free in pregnancy was about:`,[`66%`,`5%`,`23%`,`100%`],0,`23% with preventive medication. Plans are made with the care team [[Wesseloo2016]].`],
 [4,`Psychiatric admission risk for first-time mothers peaks:`,[`In the 2nd trimester`,`10–19 days after birth`,`At 1 year`,`Before conception`],1,`RR 7.31 [[MunkOlsen2006]]. Postpartum psychosis is an emergency [[Jones2014Lancet]].`],
 [4,`First-trimester lithium was associated with cardiac malformations in:`,[`50% vs 1%`,`0% vs 0%`,`2.41% vs 1.15% unexposed`,`10% vs 3%`],2,`RVOT defects including Ebstein's anomaly 0.60% vs 0.18% [[Patorno2017]].`],
 [4,`NICE CG192 encourages breastfeeding unless the woman is taking:`,[`Quetiapine`,`Sertraline`,`Lamotrigine`,`Carbamazepine, clozapine or lithium`],3,`[[NICE2014CG192]].`],
 /* ---- Part 5 ---- */
 [5,`In STEP-BD, the share of recovered people with a recurrence within 2 years was:`,[`48.5%`,`5%`,`95%`,`20%`],0,`Depressive recurrences outnumbered manic ones more than 2 to 1 [[Perlis2006STEPBD]].`],
 [5,`After a first manic admission, functional recovery (previous work and living) at 2 years was:`,[`98%`,`43%`,`10%`,`72%`],1,`Syndromal recovery 98% [[Tohen2003]].`],
 [5,`Lifetime anxiety disorder in bipolar disorder affects about:`,[`5%`,`95%`,`45%`,`1%`],2,`[[Pavlova2015]].`],
 [5,`The most common substance use disorder in clinical bipolar samples is:`,[`Opioid`,`Cocaine`,`Nicotine only`,`Alcohol use disorder (42%)`],3,`Cannabis 20% [[Hunt2016Clinical]].`],
 [5,`About what share of people with bipolar disorder have metabolic syndrome?`,[`37%`,`3%`,`90%`,`0%`],0,`Odds about twice the general population [[Vancampfort2013]].`],
 [5,`High expressed emotion in a family means:`,[`Warm and calm`,`Critical, hostile or over-involved attitudes that predict relapse`,`Frequent laughter`,`Talking about medicines`],1,`[[Miklowitz1988EE,Butzlaff1998]].`],
 [5,`For a person with acute mania, NICE CG185 advises:`,[`Busy group activities`,`Making major decisions quickly`,`A calming environment with reduced stimulation`,`Withholding contact with carers`],2,`And no important decisions until recovery [[NICE2014CG185]].`],
 [5,`High-level intermittent observation in NICE NG10 means checks every:`,[`2 hours`,`Day`,`30–60 minutes`,`15–30 minutes`],3,`Low-level intermittent is every 30–60 minutes [[NICE-NG10]].`],
 [5,`NICE monitoring after starting an antipsychotic includes weight:`,[`Weekly for 6 weeks, then at 12 weeks`,`Once a year only`,`Never`,`Daily for a year`],0,`Glucose or HbA1c and lipids at 12 weeks [[NICE2014CG185]].`],
 [5,`ADHD is present in about what share of adults with bipolar disorder?`,[`73%`,`17%`,`0%`,`50%`],1,`73% of children and 43% of adolescents [[Sandstrom2021]].`],
 [5,`The ConLiGen GWAS of lithium response found:`,[`A clinical test now in routine use`,`No signal at all`,`One chromosome 21 locus with two long non-coding RNA genes`,`That response is fully genetic`],2,`Early evidence, not yet a clinical test [[Hou2016Lithium]].`],
 [5,`Midday bright light in bipolar depression (Sit 2018) gave remission of:`,[`0% vs 0%`,`100% vs 50%`,`10% vs 40%`,`68.2% vs 22.2% with dim light`],3,`With no mood polarity switches [[Sit2018]].`],
 /* ---- Part 6 ---- */
 [6,`"Folie circulaire" was described in 1854 by:`,[`Jean-Pierre Falret`,`Emil Kraepelin`,`John Cade`,`Karl Leonhard`],0,`Baillarger described "folie à double forme" the same year [[Pichot2004]].`],
 [6,`Kraepelin's 1899 unitary concept was called:`,[`Bipolar II disorder`,`Manic-depressive insanity`,`Cyclothymia`,`Dementia praecox`],1,`[[Angst2001]].`],
 [6,`Bipolar and unipolar illness were separated in 1966 by:`,[`Cade and Schou`,`Falret and Baillarger`,`Angst and Perris`,`Kraepelin and Leonhard`],2,`[[Angst1966,Perris1966,Pichot2004]].`],
 [6,`John Cade reported lithium for mania in:`,[`1899`,`1970`,`1994`,`1949`],3,`The US allowed lithium in 1970 [[Cade1949,Shorter2009]].`],
 [6,`The term "bipolar disorder" entered the DSM in:`,[`DSM-III, 1980`,`DSM-I, 1952`,`DSM-5, 2013`,`DSM-II, 1968`],0,`[[Mason2016]].`],
 [6,`DSM-IV (1994) introduced:`,[`Lithium levels`,`A stand-alone hypomanic episode, the basis of bipolar II`,`The energy criterion`,`ICD-11 codes`],1,`[[Mason2016]].`]
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
 ["6A60 · 6A61 · 6A62 (ICD-11)",`ICD-11 codes for bipolar type I disorder, bipolar type II disorder and cyclothymic disorder [[Harter2025]].`,"types"],
 ["988 Suicide & Crisis Lifeline",`The US crisis line: call or text 988. In the UK and Ireland, Samaritans can be called on 116 123. Help works, and reaching out early matters [[Nuij2021,Stanley2018ED]].`,"crisis"],
 ["Actigraphy",`Wrist-worn movement recording of sleep and activity; between episodes it shows lower mean activity and more variable sleep [[DeCrescenzo2017,Ng2015Sleep]].`,"brain"],
 ["Activated charcoal",`Not recommended in lithium toxicity because it does not bind lithium ions [[FDA-Lithium]].`,"levels"],
 ["Adherence",`Taking treatment as agreed; more than 50% of people with bipolar disorder do not take treatment as prescribed [[Nierenberg2023]]. Psychoeducation reduced non-adherence [[Chatterton2017]].`,"therapy"],
 ["Advance statement",`A plan written when well about care in a future crisis; advance statements reduced compulsory admissions by 23% (RR 0.77) [[deJong2016]].`,"living"],
 ["AKAP11",`The first exome-wide significant risk gene shared by bipolar disorder and schizophrenia (OR 7.06); its protein interacts with GSK3B (Early evidence) [[Palmer2022Exome]].`,"genes"],
 ["Alda scale",`The research scale of long-term lithium response; mixture modelling suggests full, partial and non-responders [[Manchia2013]].`,"lithium"],
 ["Allostatic load",`The idea that repeated episodes and stress cause cumulative "wear and tear" on brain and body (Hypothesis) [[Kapczinski2008]].`,"brain"],
 ["ANK3",`Gene for ankyrin G, one of the first genome-wide bipolar associations (2008) [[Ferreira2008]].`,"genes"],
 ["Antidepressant switch",`A shift into mania, hypomania or a mixed state after starting an antidepressant; monotherapy raised early mania risk (HR 2.83) but not with a mood stabiliser (HR 0.79) [[Viktorin2014]].`,"depression"],
 ["Anxious distress specifier",`A DSM-5-TR specifier for manic or depressive episodes with marked anxiety, such as feeling keyed up or restless [[APA2022,Yatham2018]].`,"types"],
 ["Aretaeus of Cappadocia",`1st-century Greek physician, perhaps the first to describe mania and melancholia as one disease [[Angst2001]].`,"history"],
 ["Aripiprazole once-monthly",`A long-acting injectable; recurrence 26.5% vs 51.1% on placebo over 52 weeks, mainly manic episodes prevented [[Calabrese2017AOM]].`,"antipsychotics"],
 ["Atypical features",`A depressive-episode specifier (for example hypersomnia, increased appetite, leaden paralysis, rejection sensitivity) that points towards bipolar depression [[Mitchell2008,Yatham2018]].`,"types"],
 ["BALANCE trial",`330 people with bipolar I: lithium alone or with valproate prevented relapse better than valproate alone [[Geddes2010BALANCE]].`,"lithium"],
 ["Baillarger, Jules",`French psychiatrist who presented "folie à double forme" in January 1854 [[Pichot2004]].`,"history"],
 ["BDNF",`Brain-derived neurotrophic factor; falls in mania and depression and normalises in euthymia, a possible state marker (Early evidence) [[Fernandes2015]].`,"brain"],
 ["Biphasic course",`An episode followed straight away by one of the opposite polarity; seen in 80% of 206 people with bipolar II [[Benazzi2006]].`,"episodes"],
 ["Bipolar I disorder",`Requires at least one lifetime manic episode; hypomanic or depressive episodes may also occur [[APA2022,McIntyre2020Lancet]].`,"types"],
 ["Bipolar II disorder",`Requires at least one hypomanic and one major depressive episode, and never mania [[APA2022,McIntyre2020Lancet]]. Not a "milder" form [[Yatham2018]].`,"types"],
 ["Bipolar spectrum",`Bipolar I, II and subthreshold forms together; lifetime 2.4% in the WMH surveys [[Merikangas2011]]. Wider "soft spectrum" proposals are research ideas, not criteria [[Angst2003]].`,"types"],
 ["Blue-blocking glasses",`Orange glasses worn in the evening to create "virtual darkness"; a small trial cut YMRS scores in mania (Early evidence) [[Henriksen2016]].`,"frontier"],
 ["Boxed warning",`The strongest US label warning. Lithium's says toxicity "can occur at doses close to therapeutic levels" [[FDA-Lithium]].`,"levels"],
 ["Bright light therapy",`Adjunctive light for bipolar depression; 68.2% vs 22.2% remission with midday light in one trial [[Sit2018]]. ISBD suggests anti-manic cover [[Geoffroy2025]].`,"frontier"],
 ["Brugada syndrome",`An inherited heart rhythm condition that lithium can unmask; the label advises avoiding lithium in it [[FDA-Lithium]].`,"levels"],
 ["CACNA1C",`Gene for an L-type calcium channel subunit; a classic bipolar GWAS hit [[Ferreira2008,PGCBD2011]].`,"genes"],
 ["Cade, John",`Australian psychiatrist who reported "Lithium salts in the treatment of psychotic excitement" in 1949 [[Cade1949]].`,"history"],
 ["CANMAT/ISBD 2018",`Canadian–international guideline grading treatments first-, second- or third-line for mania, depression and maintenance [[Yatham2018]].`,"stabilisers"],
 ["Carbamazepine",`An anticonvulsant for acute mania (second-line in CANMAT for safety reasons); test for HLA-B*15:02 in people of Asian ancestry [[Yatham2018,FDA-Equetro]].`,"stabilisers"],
 ["Cariprazine",`An antipsychotic approved for bipolar I mania and bipolar I depression; akathisia is a common side effect [[FDA-Vraylar,Calabrese2015Cariprazine]].`,"antipsychotics"],
 ["Carer burden",`The strain on family caregivers; 89% reported moderate or higher burden from problem behaviours in STEP-BD [[Perlick2007]].`,"families"],
 ["Catatonia specifier",`Can be added to manic or depressive episodes [[Yatham2018,APA2022]]; ECT is an option in catatonia [[Yatham2018]].`,"types"],
 ["Chronic lithium poisoning",`Toxicity during regular use when intake outstrips elimination; the most common pattern and the main cause of severe neurotoxicity [[BairdGunning2017,Oakley2001]].`,"levels"],
 ["Chronotherapy",`Treatments acting on the body clock, such as sleep deprivation with light; 70% responded within a week in one cohort (Early evidence) [[Benedetti2014]].`,"frontier"],
 ["Chronotype",`A person's preferred timing of sleep and activity; evening chronotype is more common in bipolar disorder [[Melo2017]].`,"brain"],
 ["CIDI",`The WHO Composite International Diagnostic Interview, fully structured and given by lay interviewers [[Kessler2004CIDI]].`,"screening"],
 ["Clock gene",`Genes that run the cellular clock; Clock mutant mice show a mania-like profile reversed by lithium (Early evidence) [[Roybal2007]].`,"brain"],
 ["Collaborative care",`Team-based care with care managers and psychoeducation; it reduced hospital admissions (RR 0.68) [[Oud2016]].`,"therapy"],
 ["ConLiGen",`The international Consortium on Lithium Genetics; its GWAS found a chromosome 21 locus for lithium response [[Hou2016Lithium]].`,"frontier"],
 ["Copy-number variant (CNV)",`A deleted or duplicated stretch of DNA; CNV burden is lower in bipolar disorder than in schizophrenia [[Grozeva2010,Green2016CNV]].`,"genes"],
 ["Criterion A (mania)",`Elevated, expansive or irritable mood plus increased activity or energy, at least 1 week [[APA2022,Yatham2018]].`,"criteria"],
 ["Criterion B (mania)",`At least 3 of 7 symptoms, 4 if mood is only irritable [[APA2022,Yatham2018]].`,"criteria"],
 ["Criterion C (mania)",`Marked impairment, hospitalisation or psychotic features, which separate mania from hypomania [[APA2022,Yatham2018]].`,"criteria"],
 ["Cyclothymic disorder",`At least 2 years (1 in youth) of subthreshold highs and lows without full episodes [[APA2022,Yatham2018]]; ICD-11 code 6A62 [[Harter2025]].`,"types"],
 ["DALY",`Disability-adjusted life-year; bipolar disorder caused 9.9 million DALYs in GBD 2013 [[Ferrari2016]].`,"what"],
 ["De-escalation",`Calming an agitated person by verbal engagement and collaboration, avoiding restraint where possible [[Richmond2012]].`,"nursing"],
 ["Decreased need for sleep",`A manic Criterion B symptom: feeling rested after much less sleep [[APA2022]]; sleep disturbance is the most common early sign of mania [[Jackson2003]].`,"criteria"],
 ["Dementia risk",`Meta-analyses link bipolar disorder to higher odds of dementia (OR 2.36–2.96), with more episodes predicting it; lithium use was associated with lower risk in observational studies (Early evidence) [[Diniz2017,Velosa2020]].`,"course"],
 ["Delay to diagnosis",`Median 6.7 years from onset to diagnosis in a 2022 meta-analysis [[Scott2022Delay]].`,"differential"],
 ["Differential diagnosis",`The other conditions considered: unipolar depression, personality disorders, ADHD, substances and physical illness such as thyroid disease [[NICE2014CG185,Yatham2018]].`,"differential"],
 ["Digital phenotyping",`Using smartphone and sensor data to track mood; promising but not yet reliable enough for clinical use (Early evidence) [[Kutcher2026,Ludwig2025]].`,"frontier"],
 ["DIGFAST",`A memory aid for the seven manic Criterion B symptoms; not DSM wording [[APA2022,Yatham2018]].`,"criteria"],
 ["Divalproex",`A form of valproate; 48% responded in acute mania vs 25% on placebo [[Bowden1994]].`,"stabilisers"],
 ["DMDD",`Disruptive mood dysregulation disorder: a DSM-5 depressive disorder for severe chronic irritability in children, added partly against bipolar overdiagnosis [[Copeland2013DMDD,APA2022]].`,"differential"],
 ["Dopamine hypothesis",`Too much dopamine signalling in mania and too little in depression (model) [[Ashok2017]].`,"brain"],
 ["DSM-5-TR",`The text revision of DSM-5, published by the APA in March 2022 [[APA2022]].`,"criteria"],
 ["Early warning signs",`Personal signs that an episode may be starting; training to spot them cut manic relapses [[Perry1999BMJ,Jackson2003]].`,"living"],
 ["Ebstein's anomaly",`A heart defect once strongly linked to lithium; RVOT defects 0.60% vs 0.18% after first-trimester exposure [[Patorno2017]].`,"pregnancy"],
 ["ECT",`Electroconvulsive therapy; 73.9% vs 35.0% response in treatment-resistant bipolar depression [[Schoeyen2015]]. Second-line in CANMAT [[Yatham2018]].`,"depression"],
 ["eGFR",`Estimated glomerular filtration rate, a kidney test monitored every 6 months on lithium per NICE [[NICE2014CG185E]].`,"levels"],
 ["ENIGMA",`An international imaging consortium showing thinner cortex and smaller hippocampus in bipolar disorder on average [[Ching2022,Hibar2018]].`,"brain"],
 ["Euthymia",`A steady mood between episodes. Even in euthymia, 34.7% meet criteria for a current anxiety disorder [[Pavlova2017]].`,"episodes"],
 ["Expressed emotion (EE)",`Critical, hostile or over-involved family attitudes; high EE predicts relapse [[Miklowitz1988EE,Butzlaff1998]].`,"families"],
 ["EXTRIP",`A workgroup that grades lithium as dialysable and recommends extracorporeal treatment in severe poisoning [[Decker2015]].`,"levels"],
 ["Falret, Jean-Pierre",`French psychiatrist who described "folie circulaire" in 1854 [[Pichot2004]].`,"history"],
 ["Family-focused therapy (FFT)",`Psychoeducation, communication and problem-solving with the family; 2-year relapse 35% vs 54% [[Miklowitz2003FFT]].`,"families"],
 ["Flight of ideas",`Thoughts jumping rapidly from topic to topic, or the feeling that thoughts race; a manic B symptom [[APA2022]].`,"criteria"],
 ["Folie circulaire",`"Circular insanity", Falret's 1854 name for alternating mania and melancholia [[Pichot2004]].`,"history"],
 ["Functional recovery",`Regaining previous work and living status; only 43% at 2 years after a first manic admission [[Tohen2003]].`,"course"],
 ["Glucocorticoid-induced mania",`Mania after oral steroids (HR 4.35 vs untreated people with the same disease) [[Fardet2012]].`,"differential"],
 ["Goal-attainment events",`Exciting successes that predicted rises in manic symptoms [[Johnson2008Mania]].`,"genes"],
 ["GSK-3",`Glycogen synthase kinase-3, an enzyme lithium inhibits (Ki about 2 mM) [[Klein1996,Stambolic1996]].`,"lithium"],
 ["GWAS",`Genome-wide association study; 298 bipolar loci by 2025 [[OConnell2025]].`,"genes"],
 ["Haemodialysis",`"The treatment of choice" for severe lithium toxicity, per the label [[FDA-Lithium]].`,"levels"],
 ["HCL-32",`The 32-item Hypomania Checklist; sensitivity 81%, specificity 67% in psychiatric services [[Carvalho2015]].`,"screening"],
 ["Heritability",`The share of variation in risk explained by genes; about 60–85% in twin studies [[McGuffin2003,Johansson2019]].`,"genes"],
 ["HLA-B*15:02",`An allele that strongly raises carbamazepine SJS/TEN risk in people of Asian ancestry [[Chung2004HLA,Chen2011HLA]].`,"stabilisers"],
 ["Hopelessness",`With a previous attempt, the strongest risk factor for suicide death in bipolar disorder [[Hawton2005Bipolar]].`,"crisis"],
 ["Hypercalcaemia (lithium)",`Raised calcium from lithium-associated hyperparathyroidism; 26% prevalence in one Swedish cohort [[Meehan2018]].`,"levels"],
 ["Hypomanic episode",`At least 4 days of elevated mood and energy with an observable change but no marked impairment, hospitalisation or psychosis [[APA2022,Yatham2018]].`,"criteria"],
 ["Hypothyroidism (lithium)",`An underactive thyroid; more common with lithium (OR 5.78) and treatable with thyroid hormone [[McKnight2012,Kibirige2013]].`,"levels"],
 ["ICD-11",`The WHO classification approved in 2019 and in use from 2022 [[Reed2019]]; it keeps a mixed episode and gives bipolar II equal status [[Stein2020BMC]].`,"types"],
 ["Inositol depletion hypothesis",`Lithium blocks inositol recycling and dampens phosphoinositide signalling (Hypothesis) [[Berridge1989,Harwood2005]].`,"lithium"],
 ["IPSRT",`Interpersonal and social rhythm therapy, which steadies daily routines; it lengthened time without a new episode [[Frank2005IPSRT]].`,"therapy"],
 ["Ketamine",`An anaesthetic studied as a fast-acting add-on for bipolar depression: 71% responded at some point vs 6% on placebo, but the effect faded within days (Early evidence) [[Diazgranados2010]]. Third-line in CANMAT [[Yatham2018]].`,"frontier"],
 ["Kindling",`Post's idea that episodes sensitise the brain so later ones need less trigger (Hypothesis, contested) [[Post1992,Bender2011]].`,"brain"],
 ["Kraepelin, Emil",`Named "manic-depressive insanity" in 1899 [[Angst2001]].`,"history"],
 ["Lamotrigine",`An anticonvulsant for maintenance, mainly against depression; not for acute mania [[FDA-Lamictal,Calabrese2003Lamotrigine]].`,"stabilisers"],
 ["Life chart",`A day-by-day record of mood and functioning; the NIMH Life Chart Method correlates well with clinician ratings [[Denicoff2000]].`,"living"],
 ["Lithium",`The gold-standard maintenance mood stabiliser, with anti-suicide evidence [[Yatham2018,Cipriani2013]].`,"lithium"],
 ["Lithium level",`Serum lithium measured as a trough about 12 hours after the last dose [[FDA-Lithium]]. In 10 breastfeeding pairs, average trough levels were 0.76 mEq/L in the mother, 0.35 in milk and 0.16 in the infant [[Viguera2007Breastmilk]].`,"levels"],
 ["Long-acting injectable (LAI)",`An antipsychotic injection given every 2 weeks or monthly; offered when non-adherence persists [[Yatham2018]].`,"antipsychotics"],
 ["Lumateperone",`An antipsychotic approved for bipolar I or II depression; MADRS 4.6 points better than placebo [[FDA-Caplyta,Calabrese2021Lumateperone]].`,"antipsychotics"],
 ["Lurasidone",`An antipsychotic approved for bipolar I depression, taken with food; NNT about 5 [[FDA-Latuda,Citrome2014Lurasidone]].`,"antipsychotics"],
 ["MADRS",`Montgomery–Åsberg Depression Rating Scale, 10 items [[Montgomery1979]].`,"screening"],
 ["Major depressive episode",`5 of 9 symptoms for 2 weeks including depressed mood or loss of interest [[APA2022,Yatham2018]].`,"criteria"],
 ["Manic episode",`At least 1 week of elevated, expansive or irritable mood and energy with 3+ B symptoms and marked impairment, hospitalisation or psychosis [[APA2022,Yatham2018]].`,"criteria"],
 ["MDQ",`Mood Disorder Questionnaire: 13 yes/no items; a screen that "flags" people for assessment, never a diagnosis [[Hirschfeld2000MDQ,Yatham2018]].`,"screening"],
 ["Means safety",`Restricting access to lethal means, an effective suicide-prevention measure (general principle) [[Zalsman2016,Mann2021Suicide]].`,"crisis"],
 ["Metabolic syndrome",`Clustered weight, glucose, lipid and blood pressure problems; 37.3% in bipolar disorder [[Vancampfort2013]].`,"living"],
 ["Methylphenidate",`A stimulant for ADHD; in bipolar disorder, use without a mood stabiliser was followed by more mania (HR 6.7), but not with one (HR 0.6) [[Viktorin2017]].`,"course"],
 ["Mixed features specifier",`DSM-5 label for an episode with prominent symptoms of the opposite pole; replaced the mixed episode [[Mason2016,Yatham2018]].`,"episodes"],
 ["Mixed states and suicide",`Mixed features in depressive or (hypo)manic phases go with "major increases of risk of suicidal behaviors" [[Tondo2020]]; these are times for extra support.`,"crisis"],
 ["Mood stabiliser",`A medicine that treats or prevents mood episodes, such as lithium, valproate or lamotrigine [[Yatham2018]].`,"stabilisers"],
 ["Mortality gap",`Shorter life expectancy, about 13 years lost on average, mostly from physical illness and suicide (population statistic) [[Chan2022,Biazus2023]].`,"what"],
 ["Nephrogenic diabetes insipidus",`Lithium-related inability to concentrate urine, causing thirst and much urine [[FDA-Lithium]]; a risk factor for chronic toxicity [[Oakley2001]].`,"levels"],
 ["Neurotoxicity (lithium)",`Tremor, ataxia, paraesthesia or cognitive impairment, which "can occur at therapeutic levels" [[NICE2014CG185E]].`,"levels"],
 ["N-acetylcysteine",`An antioxidant tested as an add-on; one 24-week trial improved depression scores, but a maintenance trial was negative (Early evidence) [[Berk2008NAC,Berk2012NAC]].`,"frontier"],
 ["NICE CG185",`The UK guideline on bipolar disorder in adults, children and young people [[NICE2014CG185]].`,"therapy"],
 ["NSAIDs",`Anti-inflammatory painkillers that can raise lithium levels; NICE warns against over-the-counter use with lithium [[FDA-Lithium,NICE2014CG185E]].`,"levels"],
 ["Observation levels",`NICE NG10 levels from intermittent checks to continuous arm's-length observation [[NICE-NG10]].`,"nursing"],
 ["Olanzapine–fluoxetine",`A combination approved for bipolar I depression; NNT about 4, with weight gain [[FDA-OlanzapineFluoxetine,Ketter2014]].`,"antipsychotics"],
 ["Peer support",`Support from people with lived experience; benefits for hope and empowerment but little effect on symptoms (Early evidence) [[LloydEvans2014]].`,"therapy"],
 ["Polygenic risk score (PRS)",`A sum of many small genetic effects; explains about 4.6% of liability and cannot diagnose [[Mullins2021,Murray2021PRS]].`,"genes"],
 ["Postpartum psychosis",`A rare emergency after birth (0.89–2.6 per 1,000 women), closely tied to bipolar disorder [[VanderKruik2017,Kendell1987]].`,"pregnancy"],
 ["Pregnancy recurrence",`71% of 89 women well at conception had a recurrence in pregnancy; stopping a mood stabiliser, especially quickly, was linked to higher risk [[Viguera2007Pregnancy]]. Any change is planned with the care team.`,"pregnancy"],
 ["Predominant polarity",`A tendency for most episodes to be of one pole; about 30% mainly manic and 28.5% mainly depressive [[Bartoli2024]].`,"episodes"],
 ["Pregnancy Prevention Programme",`The UK MHRA framework required for valproate in women and girls who could become pregnant [[Iacobucci2018,NICE2014CG185F]].`,"pregnancy"],
 ["Prodrome",`The early phase before an episode; manic prodromes average more than 20 days [[Jackson2003]].`,"living"],
 ["Proximal tubule",`The kidney segment where about 80% of filtered lithium is reabsorbed [[FDA-Lithium]].`,"levels"],
 ["Psychoeducation",`Structured teaching about the illness and self-management; group programmes cut recurrences over 5 years [[Colom2009]].`,"therapy"],
 ["Psychotic features",`Delusions or hallucinations; in bipolar disorder they occur only within mood episodes [[APA2022]]. Lifetime 63% in bipolar I [[Aminoff2022]].`,"episodes"],
 ["Quetiapine",`An antipsychotic used for mania, bipolar depression and maintenance; the only first-line option for bipolar II depression in CANMAT [[FDA-Seroquel,Yatham2018]].`,"antipsychotics"],
 ["Rapid cycling",`At least 4 mood episodes in 12 months; lifetime prevalence 35.5% [[Strawbridge2022,Miola2023]]. With lithium, 34% of people with rapid cycling had no further recurrences [[Kupka2003]].`,"types"],
 ["Relapse-prevention plan",`A written plan of triggers, warning signs, coping steps and contacts, made jointly with the person and carer [[NICE2014CG185]].`,"living"],
 ["Risperidone LAI",`A two-weekly injection that delayed elevated-mood but not depressive recurrence [[Quiroz2010]].`,"antipsychotics"],
 ["Safety plan",`A written, prioritised list of warning signs, coping strategies and people and services to contact in a crisis [[Stanley2012SPI,Stanley2018ED]].`,"crisis"],
 ["Safewards",`Ten staff–patient relationship interventions that reduced ward conflict by 15% [[Bowers2015]].`,"nursing"],
 ["Schizoaffective disorder",`A primary psychotic disorder in which psychosis also occurs without a mood episode; in bipolar disorder it does not [[Yatham2018,APA2022]].`,"differential"],
 ["Schou, Mogens",`Danish psychiatrist who reported a controlled lithium trial in mania in 1954 and preventive lithium in 1967 [[Schou1954,Baastrup1967]].`,"history"],
 ["Responder neurons",`Stem-cell-derived neurons from people with bipolar disorder were hyperexcitable; lithium reversed this only in cells from clinical lithium responders (Early evidence) [[Mertens2015]].`,"frontier"],
 ["SCID",`Structured Clinical Interview for DSM, semistructured and clinician-administered [[Spitzer1992]].`,"screening"],
 ["Suicide rate (ISBD)",`A pooled 164 per 100,000 person-years, about 1.7 times higher in men (population statistic) [[Schaffer2015Epi]]. Most people with bipolar disorder do not die by suicide, and treatment lowers risk [[Nordentoft2011,Cipriani2013]].`,"crisis"],
 ["Seasonal pattern",`A specifier for episodes tied to seasons; mania peaks in spring and summer, depression in early winter [[Geoffroy2014]].`,"types"],
 ["Secondary mania",`Mania caused by a drug or medical condition, such as a brain lesion [[Krauthammer1978,Satzer2016]].`,"differential"],
 ["Serotonin syndrome",`A drug reaction lithium can precipitate with other serotonergic medicines [[FDA-Lithium]].`,"levels"],
 ["SILENT",`Syndrome of irreversible lithium-effectuated neurotoxicity: sequelae lasting at least 2 months, often cerebellar [[Adityanjee2005]].`,"levels"],
 ["Sleep deprivation (therapeutic)",`Staying awake to treat depression; in rapid cycling one night switched 7 of 9 into mania or hypomania [[Wehr1982]].`,"brain"],
 ["SMR",`Standardised mortality ratio; all-cause 2.05 and suicide 14.44 in bipolar disorder [[Hayes2015]].`,"what"],
 ["SNP-heritability",`Heritability captured by common variants, about 16–23% for bipolar disorder [[Stahl2019,Mullins2021]].`,"genes"],
 ["Social zeitgeber theory",`Losing social time cues disrupts body rhythms and may trigger episodes (Hypothesis) [[Ehlers1988]].`,"brain"],
 ["STEP-BD",`A large US effectiveness programme; 48.5% of recovered people had a recurrence within 2 years [[Perlis2006STEPBD]].`,"course"],
 ["Stevens–Johnson syndrome",`A severe skin reaction; the lamotrigine and carbamazepine labels carry boxed warnings [[FDA-Lamictal,FDA-Equetro]].`,"stabilisers"],
 ["Subthreshold bipolar disorder",`Hypomanic symptoms below full criteria; lifetime 1.4% in WMH surveys [[Merikangas2011]].`,"what"],
 ["Supported employment",`Help to find and keep work, recommended by NICE for people who wish to work [[NICE2014CG185]].`,"living"],
 ["Syndromal recovery",`No longer meeting episode criteria; 98% within 2 years after a first manic admission [[Tohen2003]].`,"course"],
 ["Thiazide diuretics",`Water pills that often raise lithium levels by 25–40% [[Finley1995]].`,"levels"],
 ["Treatment-resistant bipolar depression",`Failure of at least two approved, adequately dosed treatments (ISBD 2025) [[Vieta2025TRBD]].`,"depression"],
 ["Trough level",`A drug level taken just before the next dose [[FDA-Lithium]].`,"levels"],
 ["Valproate",`An anticonvulsant used for mania; boxed warnings for liver, pancreas and fetal harm [[FDA-Depakote]]. About 10% malformations [[Tomson2018]].`,"stabilisers"],
 ["Valproate and IQ",`Mean IQ 97 at age 6 after fetal valproate vs 108 after lamotrigine [[Meador2013NEAD]].`,"pregnancy"],
 ["White matter (fractional anisotropy)",`A diffusion MRI measure; lower in bipolar disorder, most in the corpus callosum and cingulum [[Favre2019]].`,"brain"],
 ["YMRS",`Young Mania Rating Scale: 11 clinician-rated items, total 0–60 [[Young1978,Pigott2016Cochrane]].`,"screening"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'hcl 32' or 'cg185' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, presentation, burden & history',B:'Causes: genetics, family risk & environment',C:'Mechanisms: circadian rhythm, brain networks & how lithium works',D:'Diagnosis: DSM-5-TR & ICD-11, types & specifiers, screening and differential',E:'Lithium: evidence, pharmacokinetics, monitoring, toxicity & interactions',F:'Other medicines: anticonvulsants, antipsychotics, antidepressants, ECT & guidelines',G:'Psychological care, suicide safety, living well, families & nursing',H:'Course, comorbidity, pregnancy & special groups, and research toward better treatment'};
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
