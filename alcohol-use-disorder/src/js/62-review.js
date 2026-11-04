/* =============== 6.2 flashcards & memory aids =============== */
const RV_PARTN={1:"Part 1 · Understanding AUD",2:"Part 2 · Screening & diagnosis",3:"Part 3 · Withdrawal & acute care",4:"Part 4 · Treatment & recovery",5:"Part 5 · Body, family & care",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding AUD ---- */
 [1,`How common is DSM-5 alcohol use disorder in US adults?`,`13.9% in the past 12 months and 29.1% at some point in life (NESARC-III, 2012–2013; population estimates) [[Grant2015NESARC]].`],
 [1,`At what age is AUD most common in the US?`,`At 18–29 years (26.7% in the past year), falling to 2.3% at 65 and older. Mean age at onset was 26.2 years [[Grant2015NESARC]].`],
 [1,`How many people with AUD ever get treatment or help?`,`In NESARC-III, 19.8% of people with lifetime AUD [[Grant2015NESARC]]. Worldwide about 1 in 6 (17.3%), and 9.3% in low and lower-middle-income countries [[Mekonen2021]].`],
 [1,`How much shorter is life expectancy after a hospital stay with AUD?`,`24–28 years shorter than in the general population, in Nordic registers (a population statistic) [[Westman2015]].`],
 [1,`Do most people who drink excessively have alcohol dependence?`,`No. About 90% of excessive drinkers did not meet dependence criteria in NSDUH 2009–2011 [[Esser2014PCD]].`],
 [1,`What is a US standard drink?`,`0.6 oz of ethanol: 12 oz of 5% beer, 5 oz of 12% wine or 1.5 oz of 40% spirits [[Kranzler2018JAMA]]. Elsewhere definitions run from 8 to 20 g, most often 10 g [[Kalinowski2016]].`],
 [1,`Why does blood alcohol fall in a straight line?`,`ADH (Km 2–10 mg/100 mL) saturates after the first few drinks, so elimination is zero-order above about 20 mg/100 mL [[Jones2010]].`],
 [1,`How fast does BAC usually fall?`,`About 0.015 g/dL an hour in moderate drinkers; 25–35 mg/100 mL an hour in people with dependence during detoxification, from CYP2E1 induction [[Jones2010]]. The liver clears about 7 g an hour [[Cederbaum2012]].`],
 [1,`What are the two steps of ethanol metabolism?`,`Ethanol → acetaldehyde (ADH, also CYP2E1 and catalase), then acetaldehyde → acetate (ALDH2). Both steps make NADH [[Zakhari2006,Cederbaum2012]].`],
 [1,`Why does the same dose give women a higher BAC?`,`Ethanol spreads in body water: Vd is about 0.60 L/kg in women vs 0.70 in men [[Jones2019WIREs]]. Women's first-pass metabolism was 23% of men's in the Frezza study [[Frezza1990]].`],
 [1,`What does ethanol do at GABA-A and NMDA receptors, acutely?`,`It potentiates GABA-A and inhibits NMDA receptors: 61% NMDA current inhibition at 50 mM [[Kumar2009,Lovinger1989]].`],
 [1,`Why is withdrawal a state of over-excitation?`,`With chronic drinking GABA-A α1 falls, α4 rises and NMDA receptors are up-regulated. Stopping suddenly unmasks the excitation: seizures and delirium tremens [[Kumar2009,TsaiCoyle1998]].`],
 [1,`Name the three Koob–Volkow stages of addiction.`,`Binge/intoxication (basal ganglia), withdrawal/negative affect (extended amygdala; CRF, dynorphin) and preoccupation/anticipation (prefrontal cortex, insula) [[KoobVolkow2016]].`],
 [1,`What did PET show alcohol releases in the human brain?`,`Dopamine in the ventral striatum and nucleus accumbens (raclopride PET) [[Boileau2003]], and endogenous opioids in the nucleus accumbens and orbitofrontal cortex (carfentanil PET), the rationale for naltrexone [[Mitchell2012]].`],
 [1,`How heritable is AUD?`,`About 0.49 in a meta-analysis of twin and adoption studies, with shared environment 0.10 [[Verhulst2015]]. Risk is not destiny.`],
 [1,`What does ALDH2*2 do?`,`It is dominant-negative. Heterozygotes flush and, if they drink, carry about 3 times the oesophageal cancer risk (OR 3.19). Homozygotes rarely drink (OR 0.36) [[Lewis2005,Li2009ALDH2]].`],
 [1,`Can a polygenic score diagnose AUD?`,`No. Polygenic scores explain only about 2.5–3.5% of the variance in AUD [[Barr2020]].`],
 [1,`Does first drinking early matter?`,`Starting before 14, vs at 21 or later, carried an adjusted HR of 1.78 for lifetime dependence [[Hingson2006]]. Survey links may partly reflect shared family risk.`],
 [1,`Is there a level of drinking that protects health?`,`GBD 2016 found the level that minimised health loss was zero drinks a week (95% UI 0.0–0.8) [[GBD2016Alcohol]]. After bias adjustment, low-volume drinkers did not live longer than lifetime non-drinkers [[Zhao2023JAMANO]]. The research does not support drinking for health.`],
 /* ---- Part 2: screening & diagnosis ---- */
 [2,`How is the AUDIT scored?`,`10 items scored 0–4, maximum 40. A score of 8 or more flags hazardous or harmful use [[Saunders1993AUDIT]].`],
 [2,`What are the WHO AUDIT zones?`,`Zone I 0–7, II 8–15, III 16–19, IV 20–40, as published [[Babor2016AUDITZones]]. A high score signals the need for assessment, not a diagnosis [[HigginsBiddle2018USAUDIT]].`],
 [2,`When is the AUDIT-C positive?`,`At 4 or more in men (sensitivity 0.86, specificity 0.89) and 3 or more in women (0.73, 0.91) [[Bradley2007AUDITC]].`],
 [2,`What is the NIAAA single screening question?`,`"How many times in the past year have you had 5 (men) / 4 (women) or more drinks in a day?" One or more is positive: 81.8% sensitive, 79.3% specific [[Smith2009JGIM]].`],
 [2,`What does USPSTF 2018 recommend?`,`Screen adults 18 and older, including pregnant people, and give brief counselling for risky drinking (grade B). For ages 12–17: I statement [[USPSTF2018Alcohol]].`],
 [2,`How much does a brief intervention help?`,`About 20 g a week less drinking at one year (Cochrane) [[Kaner2018Cochrane]], or about −1.6 drinks a week (USPSTF review) [[OConnor2018JAMA]]. It does not reliably increase specialty treatment uptake [[Glass2015Referral]].`],
 [2,`What do the CAGE letters stand for?`,`Cut down, Annoyed, Guilty, Eye-opener [[Ewing1984CAGE]]. It asks about problems, not amounts, and has limited value for screening [[Aertgeerts2004CAGE,Dhalla2007CAGE]].`],
 [2,`What is CRAFFT, and its usual cut-off?`,`Car, Relax, Alone, Forget, Friends, Trouble [[Shenoi2019CRAFFT]]; 2 or more is the usual adolescent cut-off [[Knight2002CRAFFT]].`],
 [2,`How does DSM-5 diagnose and grade AUD?`,`2 or more of 11 criteria in 12 months. Mild 2–3, moderate 4–5, severe 6 or more [[Hasin2013DSM5,APA2022]].`],
 [2,`What changed from DSM-IV to DSM-5?`,`Abuse and dependence merged into one disorder, legal problems were dropped and craving was added [[Hasin2013DSM5]].`],
 [2,`Early vs sustained remission?`,`Early: 3 to under 12 months with no criteria except craving. Sustained: 12 months or more. Craving may persist in both [[Hasin2013DSM5]].`],
 [2,`How does ICD-11 define alcohol dependence?`,`2 of 3 features: impaired control, increasing priority, and physiological features (tolerance, withdrawal) [[Degenhardt2019ICD11]].`],
 [2,`How long does urine EtG stay positive after heavy drinking?`,`A median of about 78 hours (range 40–130 h) above 0.5 mg/L in people in detoxification [[Helander2009EtG]].`],
 [2,`What is PEth, and how long does it last?`,`A phospholipid formed in red cell membranes only when ethanol is present. Average half-life about 4 days, up to 12 [[Hahn2016PEth]]; still detectable in the fourth week of abstinence [[deBejczy2026PEth]].`],
 [2,`How fast do GGT and MCV return to normal?`,`GGT in 2–3 weeks; MCV in 2–4 months [[Niemela2016Biomarkers]].`],
 [2,`What does an AST:ALT ratio above 2 suggest?`,`Advanced alcohol-related liver disease, not heavy drinking itself [[Cohen1979SGOTSGPT,Nyblom2004ASTALT]].`],
 /* ---- Part 3: withdrawal & acute care ---- */
 [3,`When does alcohol withdrawal usually start?`,`6–24 h after stopping or cutting down [[ASAM2020Withdrawal]]. After long, heavy daily drinking, get medical help to stop safely.`],
 [3,`When do withdrawal seizures happen?`,`As early as 8 h, up to 48 h, peaking at about 24 h after the last drink [[ASAM2020Withdrawal]].`],
 [3,`What is withdrawal hallucinosis?`,`Hallucinations starting at 12–24 h with a clear sensorium; it is distinct from delirium tremens [[ASAM2020Withdrawal,Saitz1998AHRW]].`],
 [3,`When does delirium tremens begin?`,`Sources differ: 48–72 h (Mirijello; Jesse) or 72–96 h (ASAM). It brings fluctuating attention plus autonomic overactivity [[Mirijello2015,Jesse2017,ASAM2020Withdrawal]].`],
 [3,`What best predicts complicated withdrawal?`,`A past DT or withdrawal seizure (OR 2.58 and 2.8) [[Goodson2014]]. Low platelets and low potassium at admission also predict DT [[Goodson2014,Eyer2011]].`],
 [3,`What does a PAWSS of 4 or more mean?`,`High risk of complicated withdrawal (sensitivity 93.1%, specificity 99.5%) [[Maldonado2015]]. PAWSS predicts risk before symptoms; CIWA-Ar measures severity once they start [[ASAM2020Withdrawal]].`],
 [3,`How is the CIWA-Ar built?`,`10 items: nine scored 0–7 and orientation 0–4, for a maximum of 67 [[Mirijello2015]].`],
 [3,`What are the ASAM 2020 CIWA-Ar bands?`,`Mild <10, moderate 10–18, severe ≥19, as published [[ASAM2020Withdrawal]].`],
 [3,`When is CIWA-Ar the wrong tool?`,`In delirium or when the person cannot communicate; RASS or CAM-ICU are used instead [[ASAM2020Withdrawal,Hecksel2008]].`],
 [3,`Symptom-triggered vs fixed dosing?`,`Saitz 1994: 100 vs 425 mg chlordiazepoxide and 9 vs 68 h of treatment, with no rise in seizures or DT [[Saitz1994JAMA]].`],
 [3,`Why are benzodiazepines first line in withdrawal?`,`They reduce both seizures and delirium: by 7.7 and 4.9 per 100 patients in Mayo-Smith 1997 [[MayoSmith1997]].`],
 [3,`Why not antipsychotics alone in DT?`,`Neuroleptics carried a relative risk of death of 6.6 compared with sedative-hypnotics [[MayoSmith2004Delirium]].`],
 [3,`What is kindling?`,`Repeated withdrawals make later ones worse: 48% of people with withdrawal seizures had 5 or more prior detoxifications, vs 12% without [[Brown1988Kindling]].`],
 [3,`How often is the full Wernicke triad seen?`,`Confusion, ataxia and ophthalmoplegia were all present in only 16% at autopsy, and 80% of cases had not been diagnosed in life [[Harper1986JNNP]].`],
 [3,`What are the Caine criteria?`,`2 of 4: dietary deficiency, oculomotor abnormalities, cerebellar dysfunction, and altered mental state or mild memory impairment [[Caine1997,Galvin2010EFNS]].`],
 [3,`Thiamine before glucose?`,`EFNS 2010: thiamine before any carbohydrate, "200 mg thrice daily, preferably intravenously" for suspected WE, as published. ASAM 2020: thiamine and glucose in any order or together [[Galvin2010EFNS,ASAM2020Withdrawal]].`],
 [3,`What is Korsakoff syndrome?`,`Severe anterograde memory loss with confabulation, a residual syndrome after Wernicke encephalopathy, linked to the mammillary bodies and anterior thalamus [[Kopelman2009,Arts2017]].`],
 /* ---- Part 4: treatment & recovery ---- */
 [4,`What must be checked before naltrexone?`,`Opioid use: naltrexone is a mu-opioid antagonist and precipitates opioid withdrawal. The label advises 7–10 opioid-free days [[FDA-Naltrexone,FDA-Vivitrol]].`],
 [4,`How does kidney function affect acamprosate?`,`It is excreted unchanged: the dose is cut at creatinine clearance 30–50 mL/min and it is contraindicated at 30 or less [[FDA-Campral]].`],
 [4,`How does disulfiram work?`,`It inhibits aldehyde dehydrogenase, so acetaldehyde rises 5–10-fold after drinking [[FDA-Antabuse,KranzlerSoyka2018]].`],
 [4,`What does the disulfiram boxed warning say?`,`Never give it during intoxication or without the person's full knowledge [[FDA-Antabuse]]. Reactions can occur up to 14 days after the last dose.`],
 [4,`What are the NNTs for acamprosate and naltrexone?`,`To prevent return to any drinking: acamprosate 12, oral naltrexone 20. Naltrexone to prevent heavy drinking: 12 [[Jonas2014JAMA]].`],
 [4,`Acamprosate or naltrexone: which goal?`,`Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving [[Maisel2013]].`],
 [4,`What did COMBINE show?`,`Naltrexone with medical management worked; acamprosate did not, alone or combined [[Anton2006COMBINE]].`],
 [4,`How is extended-release naltrexone given?`,`380 mg deep intramuscular gluteal injection every 4 weeks, by a healthcare provider (label) [[FDA-Vivitrol]]. It cut the heavy drinking day rate by 25% [[Garbutt2005JAMA]].`],
 [4,`Does gabapentin show a dose-response?`,`Yes: complete abstinence 4.1% on placebo, 11.1% on 900 mg and 17.0% on 1,800 mg [[Mason2014Gabapentin]].`],
 [4,`Which medicine has an RCT in cirrhosis?`,`Baclofen: 71% vs 29% kept abstinence, with no hepatic side effects recorded [[Addolorato2007Lancet]].`],
 [4,`What did Project MATCH find?`,`CBT, MET and twelve-step facilitation gave similar outcomes, and the matching hypotheses were largely unsupported [[ProjectMATCH1997]].`],
 [4,`What did Cochrane 2020 find for AA/TSF?`,`Manualised AA/TSF beat other treatments for 12-month continuous abstinence: RR 1.21 (95% CI 1.03–1.42), high certainty [[Kelly2020Cochrane]].`],
 [4,`How does AA seem to work?`,`Mainly by changing a person's social network [[Kelly2012AAMech,Kelly2011AANetwork]].`],
 [4,`What is CRAFT, and how well does it work?`,`Community reinforcement and family training: it engaged 64% of loved ones in treatment, vs 30% (Johnson intervention) and 13% (Al-Anon facilitation) [[Miller1999]].`],
 [4,`How common is recovery?`,`9.1% of US adults have resolved an alcohol or drug problem; the median number of serious attempts was 2 [[Kelly2017NRS,Kelly2019Attempts]]. These are group statistics, not a promise.`],
 [4,`How does NIAAA (2022) define recovery?`,`Remission from DSM-5 AUD plus cessation of heavy drinking; abstinence is not required [[Hagman2022]].`],
 /* ---- Part 5: body, family & care ---- */
 [5,`How common is fatty liver in heavy drinking?`,`About 90%; it reverses with abstinence. Steatohepatitis leads to cirrhosis in 8–20% [[Singal2018ACG]].`],
 [5,`What is the Maddrey discriminant function?`,`4.6 × (PT − control) + bilirubin (mg/dL); 32 or more marks severe alcohol-associated hepatitis [[Carithers1989,Louvet2007Lille]].`],
 [5,`What does a Lille score of 0.45 or more mean?`,`Nonresponse at day 7 of steroids: 6-month survival 25% vs 85% (population statistics) [[Louvet2007Lille]].`],
 [5,`What did STOPAH show?`,`Prednisolone: 28-day OR 0.72 (P = 0.06), no 90-day or 1-year benefit, more infections (13% vs 7%); pentoxifylline no benefit [[Thursz2015STOPAH]].`],
 [5,`Name the seven cancers alcohol causes.`,`Mouth, pharynx, larynx, oesophagus, liver, colorectum and female breast. Alcohol is an IARC Group 1 carcinogen [[Baan2007IARC,Bagnardi2015BJC]].`],
 [5,`What is "abstainer bias"?`,`Counting former drinkers (often ill) as non-drinkers makes light drinkers look healthier: the J-curve RR 0.86 became 0.97 after adjustment [[Stockwell2016JSAD]].`],
 [5,`Does stopping drinking help atrial fibrillation?`,`Yes: in an RCT, abstinence cut AF recurrence from 73% to 53% [[Voskoboinik2020NEJM]]. AF risk rises about 8% per drink a day [[Larsson2014JACC]].`],
 [5,`How strongly is AUD linked to dementia?`,`It was the strongest modifiable risk factor in a French cohort (adjusted HR about 3.3) [[Schwarzinger2018LPH]].`],
 [5,`What are the three FAS facial features?`,`Short palpebral fissures, smooth philtrum and thin upper-lip vermilion; 2 of 3 are needed [[Hoyme2016Pediatrics]].`],
 [5,`Is any amount of alcohol safe in pregnancy?`,`There is no known safe amount and no safe time [[Gosdin2022MMWR,Williams2015AAP]]. Support is planned with the care team, without blame.`],
 [5,`How common is FASD?`,`About 7.7 per 1,000 children and youth worldwide [[Lange2017JAMAPediatr]]; 1.1–5.0% of US first-graders in 4 communities [[May2018JAMA]].`],
 [5,`Why is alcohol with opioids or benzodiazepines dangerous?`,`FDA boxed warnings: "profound sedation, respiratory depression, coma, and death" [[FDA-OxyContin,FDA-Xanax]].`],
 [5,`How common is AUD among hospital inpatients?`,`About 1 in 5 UK inpatients use alcohol harmfully and about 1 in 10 are dependent [[Roberts2019]].`],
 [5,`What did the semaglutide 2.4 mg trial show?`,`Heavy drinking days fell 13.7 percentage points more than with placebo in AUD with obesity <span class="ev early">Early evidence</span> [[Klausen2026Lancet]].`],
 /* ---- Part 6: history ---- */
 [6,`What did Benjamin Rush describe?`,`Near the end of the 18th century, loss of control over alcohol [[Witkiewitz2019]]; he saw habitual heavy drinking as a disease caused by alcohol itself [[Tabakoff2013]].`],
 [6,`Who coined "alcoholism"?`,`Magnus Huss in Sweden (cited as 1849), describing "alcoholismus chronicus". It is the older, lay name for AUD [[Tabakoff2013,Martin2014]].`],
 [6,`When and where was AA founded?`,`10 June 1935, Akron, Ohio [[Gross2010AA]].`],
 [6,`Who discovered disulfiram?`,`Hald and Jacobsen (Lancet, 1948); the FDA approved it in 1951 [[Hald1948,Witkiewitz2019]].`],
 [6,`What did Edwards and Gross describe in 1976?`,`The alcohol dependence syndrome, not defined by consequences [[Edwards1976,Martin2014]].`],
 [6,`When were naltrexone, acamprosate and injectable naltrexone approved?`,`FDA approvals for AUD: naltrexone 1994, acamprosate 2004, extended-release naltrexone 2006 [[Witkiewitz2019,FDA-DrugsFDA-AUD]].`]
];
const RV_MN=[
 ["6 · 12 · 24 · 48","memory aid",`The withdrawal clock: shakes from 6 h, hallucinosis from 12 h, seizures peaking near 24 h [[ASAM2020Withdrawal]], delirium tremens from 48 h (48–72 h Mirijello; 72–96 h ASAM) [[Mirijello2015,ASAM2020Withdrawal]]. Get medical help to stop safely.`],
 ["CAGE","well known",`Cut down, Annoyed, Guilty, Eye-opener [[Ewing1984CAGE]]. It asks about problems, not amounts, and misses less severe risky drinking [[Dhalla2007CAGE]].`],
 ["CRAFFT","well known",`Car, Relax, Alone, Forget, Friends, Trouble: the adolescent screen, positive at 2 or more [[Shenoi2019CRAFFT,Knight2002CRAFFT]].`],
 ["T-ACE","well known",`Tolerance (2 points), Annoyed, Cut down, Eye-opener (1 each); 2 or more is positive in pregnancy screening [[Sokol1989TACE]].`],
 ["2 · 4 · 6","memory aid",`DSM-5 severity starts at 2 criteria (mild), 4 (moderate) and 6 (severe), out of 11 [[Hasin2013DSM5,APA2022]].`],
 ["Under 10, up to 18, 19 and over","memory aid",`ASAM 2020 CIWA-Ar bands as published: mild <10, moderate 10–18, severe ≥19, from a maximum of 67 [[ASAM2020Withdrawal,Mirijello2015]].`],
 ["Diet, eyes, balance, mind: any two","memory aid",`The Caine criteria for Wernicke encephalopathy: dietary deficiency, oculomotor signs, cerebellar dysfunction, altered mental state; 2 of 4 [[Caine1997,Galvin2010EFNS]]. The full triad was seen in only 16% [[Harper1986JNNP]].`],
 ["A for abstinence, N for no heavy days","memory aid",`Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving [[Maisel2013]]. Check opioids before naltrexone [[FDA-Naltrexone]].`],
 ["Kidney A, liver D","memory aid",`Acamprosate depends on the kidneys (contraindicated at CrCl ≤30 mL/min) [[FDA-Campral]]; disulfiram is contraindicated in liver disease (ACG) [[Jophlin2024ACG]].`]
];
const RV_STEPS=[
 {from:0,at:.07,k:'6 h · shakes',t:'Minor withdrawal: from about 6 hours',txt:`Withdrawal happens in people who are physically dependent on alcohol when they stop or cut down: alcohol's depressant effect on the brain reverses suddenly [[ASAM2020Withdrawal]]. Symptoms usually begin 6–24 h after the last drink: tremor, sweating, anxiety, nausea, insomnia and a fast pulse [[ASAM2020Withdrawal]]. Get medical help to stop safely.`,pt:'Shaking, sweating and feeling anxious can start within hours of the last drink.',hook:'6 is for shakes: minor withdrawal starts 6–24 h after the last drink.'},
 {from:.1,at:.13,k:'12 h · sees',t:'Hallucinosis: from about 12 hours',txt:`Hallucinations can develop within 12–24 h and usually resolve within 24–48 h unless delirium appears [[ASAM2020Withdrawal]]. Consciousness stays clear, which separates hallucinosis from delirium tremens [[Saitz1998AHRW]].`,pt:'Some people see or hear things that are not there, while still knowing where they are.',hook:'Hallucinosis = hallucinations with a clear sensorium, at 12–24 h. It is not DT.'},
 {from:.18,at:.2,k:'24 h · seizures',t:'Seizures: peaking near 24 hours',txt:`Withdrawal seizures may begin as early as 8 h after the last drink, can continue up to 48 h and peak at about 24 h [[ASAM2020Withdrawal]]. About 10% of people with withdrawal symptoms have one, usually generalised tonic-clonic [[Mirijello2015]]. Repeated withdrawals make later ones worse: kindling [[Brown1988Kindling]].`,pt:'A seizure can happen even without other strong signs. It is an emergency.',hook:'Seizure window 8–48 h, peak about 24 h. Benzodiazepines prevent them; phenytoin is not used [[ASAM2020Withdrawal,Hillbom2003]].'},
 {from:.4,at:.5,k:'48 h · delirium',t:'Delirium tremens: from 48 hours',txt:`DT is the late complication, with fluctuating attention and autonomic overactivity. Sources disagree on onset: 48–72 h (Mirijello; Jesse) or 72–96 h (ASAM) [[Mirijello2015,Jesse2017,ASAM2020Withdrawal]]. It occurs in about 5% of people with withdrawal, often after no treatment or undertreatment [[Mirijello2015]].`,pt:'Delirium tremens means severe confusion with a racing heart, fever and sweating. It needs hospital care.',hook:'DT onset: 48–72 h (Mirijello, Jesse) vs 72–96 h (ASAM). Know both.'},
 {from:.8,at:.9,k:'Get help',t:'Most withdrawal is mild, and it is treatable',txt:`Mild to moderate withdrawal often settles within 2–7 days of the last drink [[Mirijello2015]]. Benzodiazepines are first line because they reduce both seizures and delirium [[MayoSmith1997]]; alcohol should never be used to treat withdrawal [[ASAM2020Withdrawal]]. Withdrawal management is a way into AUD treatment, not a treatment on its own [[ASAM2020Withdrawal]].`,pt:'Stopping after long, heavy daily drinking is safest with medical help. Afterwards, treatment for the drinking itself can start.',hook:'6 · 12 · 24 · 48: shakes, sees, seizures, delirium.'}
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

  /* ---- mnemonic in motion: the withdrawal clock, 6 · 12 · 24 · 48 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT'),HMAX=120;
  /* one row per number: [big number, title, sub-label, window start h, window end h, stroke colour, soft colour] */
  const ROWS=[
    ['6','Shakes','minor withdrawal, begins 6–24 h',6,48,'--accent','--accent-soft'],
    ['12','Sees','hallucinosis, clear mind, 12–48 h',12,48,'--dx','--dx-soft'],
    ['24','Seizures','window 8–48 h, peak about 24 h',8,48,'--bad','--bad-soft'],
    ['48','Delirium tremens','48–72 h (Mirijello, Jesse) · 72–96 h (ASAM)',48,96,'--glu','--glu-soft']];
  const status=h=>h<6?'Before symptoms usually start':h<12?'Tremor, sweats and anxiety may begin':h<20?'Hallucinosis may appear; the mind stays clear':h<30?'Seizure risk peaks near 24 hours':h<48?'The seizure window runs to about 48 hours':h<=96?'The window for delirium tremens':'Mild withdrawal often settles in 2–7 days';
  function draw(t){
    const N=vb(svg,'720 380','400 620'),h=t*HMAX;
    /* layout: person panel P, rows R, timeline axis T */
    const L=N?{px:70,py:24,ps:96,hx:150,hy:58,rx:16,rw:368,ry0:178,rdy:84,tx:44,tw:334,ty:522,safe:[574,594]}
             :{px:96,py:52,ps:118,hx:20,hy:248,rx:236,rw:470,ry0:46,rdy:66,tx:310,tw:390,ty:316,safe:[368]};
    const T=tline(L.tx,L.ty,L.tw,{min:0,max:HMAX,step:24,fmt:v=>v+' h',label:'hours since the last drink'});
    let s=`<defs><pattern id="rvHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--glu-soft)"/><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--glu-fill);stroke-width:2.2"/></pattern></defs>`;
    /* the person, with schematic signs that follow the clock */
    const tr=ramp(h,6,14)*(1-.6*ramp(h,60,110)),sw=ramp(h,8,18)*(1-.5*ramp(h,100,118)),hal=ramp(h,12,16)*(1-ramp(h,40,48)),sz=bump(h,16,32),cf=ramp(h,48,58)*(1-ramp(h,100,118));
    s+=`<circle cx="${L.px}" cy="${f1(L.py+L.ps*.5)}" r="${f1(L.ps*.62)}" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=person(L.px,L.py+4,L.ps,'var(--muted)');
    s+=symptoms(L.px,L.py+4,L.ps,{tremor:tr,sweat:sw,conf:cf,seize:sz});
    if(hal>0){const hx=L.px,hy=L.py+4+L.ps*.17;[[-34,-6],[30,-12],[36,16]].forEach(([dx,dy],k)=>{s+=`<g style="opacity:${f1(hal*(1-k*.15))}"><ellipse cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" rx="7" ry="4.5" style="fill:none;stroke:var(--dx);stroke-width:1.5;stroke-dasharray:2 2"/><circle cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" r="1.8" style="fill:var(--dx)"/></g>`})}
    /* hour readout and status */
    s+=`<text class="t-big" x="${L.hx}" y="${L.hy}" style="fill:var(--ink)">Hour ${Math.round(h)}</text>`;
    const st=status(h),words=st.split(' ');let l1='',l2='';words.forEach(w=>{if((l1+' '+w).trim().length<=26&&!l2)l1=(l1+' '+w).trim();else l2=(l2+' '+w).trim()});
    s+=`<text class="t-lbl" x="${L.hx}" y="${L.hy+22}">${l1}</text>`+(l2?`<text class="t-lbl" x="${L.hx}" y="${L.hy+40}">${l2}</text>`:'');
    s+=`<text class="t-xs" x="${L.hx}" y="${L.hy+(l2?60:42)}" style="fill:var(--muted)">schematic signs, not a real patient</text>`;
    /* rows: the four numbers of the clock */
    ROWS.forEach(([n,ti,sub,a,b,c,cs],k)=>{const y=L.ry0+k*L.rdy,on=h>=a,bx=L.rx+44,bw=L.rw-44,X=v=>L.tx+L.tw*v/HMAX;
      s+=`<circle cx="${L.rx+17}" cy="${y+8}" r="17" style="fill:var(${on?cs:'--field'});stroke:var(${on?c:'--line'});stroke-width:1.8"/><text class="t-big t-mid" x="${L.rx+17}" y="${y+15}" style="fill:var(${on?c:'--muted'})">${n}</text>`;
      s+=`<text class="t-lbl" x="${bx}" y="${y+2}" style="${on?'':'fill:var(--muted)'}">${ti}</text><text class="${N?'t-xs':'t-sm'}" x="${bx}" y="${y+18}">${sub}</text>`;
      /* the window on the shared time scale */
      const by=y+28;
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(HMAX))}" y1="${by+5}" y2="${by+5}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:2 3"/>`;
      if(k===3){s+=`<rect x="${f1(X(48))}" y="${by}" width="${f1(X(72)-X(48))}" height="10" rx="3" style="fill:var(${cs});stroke:var(--glu-fill)"/><rect x="${f1(X(72))}" y="${by}" width="${f1(X(96)-X(72))}" height="10" rx="3" style="fill:url(#rvHatch);stroke:var(--glu-fill)"/>`}
      else s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a))}" height="10" rx="3" style="fill:var(${cs});stroke:var(${c});stroke-width:1"/>`;
      const fe=Math.min(h,k===3?72:b);if(h>a)s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(fe)-X(a))}" height="10" rx="3" style="fill:var(${k===3?'--glu-fill':c});opacity:.85"/>`;
      if(k===3&&h>72)s+=`<rect x="${f1(X(72))}" y="${by+3}" width="${f1(X(Math.min(h,96))-X(72))}" height="4" rx="2" style="fill:var(--glu)"/>`;
      if(k===2)s+=`<path d="M${f1(X(24))} ${by-4}v18" style="stroke:var(--bad);stroke-width:2"/>`;
    });
    /* the clock hand */
    const cx=L.tx+L.tw*h/HMAX;
    /* drawn in pieces between the rows' labels, so it never crosses text */
    s+=T.svg;ROWS.forEach((r,k)=>{const by=L.ry0+k*L.rdy+28;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${by-5}" y2="${k===3?L.ty:by+15}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`});
    s+=`<circle cx="${f1(cx)}" cy="${L.ty}" r="5" style="fill:var(--ink)"/>`;
    /* the safety line, always on screen */
    const sf=N?['After long, heavy daily drinking, stopping suddenly can be','dangerous. Get medical help to stop safely.']:['After long, heavy daily drinking, stopping suddenly can be dangerous. Get medical help to stop safely.'];
    sf.forEach((txt,k)=>{s+=`<text class="t-sm" x="${N?16:20}" y="${L.safe[0]+k*20}" style="fill:var(--bad);font-weight:700">${txt}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 [1,`In NESARC-III (2012–2013), the 12-month prevalence of DSM-5 alcohol use disorder in US adults was:`,[`3.9%`,`13.9%`,`45.0%`,`29.1%`],1,`13.9% in the past year and 29.1% over a lifetime (population estimates) [[Grant2015NESARC]]. 3.9% was the 12-month figure for drug use disorder [[Grant2016DUD]].`],
 [1,`In NESARC-III, 12-month AUD was most common at ages:`,[`18–29`,`30–44`,`45–64`,`65 and older`],0,`26.7% at 18–29, falling to 2.3% at 65 and older; mean age at onset was 26.2 years [[Grant2015NESARC]].`],
 [1,`About what share of people with AUD worldwide receive any treatment?`,[`About 1 in 3`,`About 1 in 50`,`About 1 in 6`,`About 1 in 2`],2,`17.3% pooled across 32 studies, and 9.3% in low and lower-middle-income countries [[Mekonen2021]].`],
 [1,`In US adults aged 20–64 (2015–2019), excessive drinking caused about:`,[`1 in 40 deaths`,`1 in 3 deaths`,`1 in 100 deaths`,`1 in 8 deaths`],3,`12.9% of deaths, about 89,697 a year, and 1 in 5 deaths at ages 20–49 [[Esser2022JNO]].`],
 [1,`People hospitalised with AUD in Nordic registers had a life expectancy shorter than the general population by:`,[`5–8 years`,`40–45 years`,`24–28 years`,`2–3 years`],2,`Average life expectancy was 47–53 years in men and 50–58 years in women (population statistics) [[Westman2015]].`],
 [1,`Among US adults who drink excessively, the share who meet alcohol dependence criteria is about:`,[`50%`,`90%`,`75%`,`10%`],3,`About 10%: roughly 90% of excessive drinkers did not meet dependence criteria in NSDUH 2009–2011 [[Esser2014PCD]].`],
 [1,`Above about 20 mg/100 mL, blood alcohol usually falls:`,[`In a straight line, because ADH is saturated`,`Not at all for the first 24 hours`,`Exponentially, halving every hour`,`Only once the person sleeps`],0,`Class I ADH (Km 2–10 mg/100 mL) saturates after the first few drinks, so elimination is zero-order [[Jones2010]].`],
 [1,`The typical rate of fall in BAC in moderate drinkers is about:`,[`0.08 g/dL per hour`,`0.015 g/dL per hour`,`0.15 g/dL per hour`,`0.0015 g/dL per hour`],1,`15 mg/100 mL/h. In people with dependence during detoxification it is 25–35 mg/100 mL/h, because CYP2E1 is induced [[Jones2010]].`],
 [1,`Which enzyme converts acetaldehyde to acetate?`,[`ADH`,`ALDH2`,`Catalase`,`CYP2E1`],1,`ADH, CYP2E1 and catalase make acetaldehyde; mitochondrial ALDH2 oxidises it to acetate. Both steps produce NADH [[Zakhari2006,Cederbaum2012]].`],
 [1,`Acutely, ethanol:`,[`Stops all dopamine release`,`Blocks GABA-A and activates NMDA receptors`,`Potentiates GABA-A and inhibits NMDA receptors`,`Has no action on receptors`],2,`At 50 mM ethanol inhibited NMDA current by 61% [[Lovinger1989]], and it enhances GABA-A function [[Kumar2009]].`],
 [1,`In the Koob–Volkow model, the withdrawal/negative affect stage centres on:`,[`The extended amygdala`,`The cerebellum`,`The mammillary bodies`,`The visual cortex`],0,`With CRF and dynorphin recruited. Binge/intoxication is basal ganglia; preoccupation/anticipation is prefrontal cortex and insula [[KoobVolkow2016]].`],
 [1,`The heritability of AUD from twin and adoption studies is about:`,[`0.05`,`0.25`,`0.90`,`0.49`],3,`0.49 (95% CI 0.43–0.53), with shared environment 0.10. Risk is not destiny [[Verhulst2015]].`],
 [1,`A person heterozygous for ALDH2*2 who drinks has an oesophageal cancer risk:`,[`Unchanged`,`About 100 times higher`,`About 3 times higher (OR 3.19)`,`About half (OR 0.5)`],2,`ALDH2*2 acts as a dominant negative. Homozygotes rarely drink and had OR 0.36 [[Lewis2005,Li2009ALDH2]].`],
 [1,`Compared with first drinking at 21 or later, first drinking before 14 carried an adjusted hazard ratio for lifetime dependence of:`,[`0.78`,`1.78`,`7.8`,`1.00`],1,`HR 1.78 (1.51–2.11), adjusted for family history [[Hingson2006]]. Such survey links may partly reflect shared family risk.`],
 [1,`GBD 2016 put the level of drinking that minimised overall health loss at:`,[`Zero standard drinks a week`,`Seven drinks a week`,`Two drinks a day`,`One drink a day`],0,`Zero (95% UI 0.0–0.8) standard drinks a week [[GBD2016Alcohol]]. The research does not support drinking for health.`],
 [1,`After adjusting for biases, low-volume drinkers' all-cause mortality compared with lifetime non-drinkers was:`,[`Half as high`,`Twice as high`,`40% lower`,`Not significantly lower`],3,`RR 0.93 (P = 0.07) across 107 cohorts with 4.8 million people [[Zhao2023JAMANO]].`],
 [2,`The AUDIT has 10 items and a maximum score of:`,[`40`,`12`,`67`,`10`],0,`Each item scores 0–4; a score of 8 or more flags hazardous or harmful use [[Saunders1993AUDIT]].`],
 [2,`An AUDIT score of 16–19 falls in WHO zone:`,[`II`,`IV`,`III`,`I`],2,`Zones as published: I 0–7, II 8–15, III 16–19, IV 20–40 [[Babor2016AUDITZones]].`],
 [2,`The AUDIT-C thresholds that best balanced sensitivity and specificity in primary care were:`,[`≥10 in men, ≥8 in women`,`≥2 in men, ≥1 in women`,`≥8 for everyone`,`≥4 in men, ≥3 in women`],3,`Sensitivity and specificity 0.86 and 0.89 in men, 0.73 and 0.91 in women [[Bradley2007AUDITC]].`],
 [2,`The NIAAA single screening question is positive when the answer is:`,[`5 or more heavy days in a month`,`1 or more heavy days in the past year`,`Drinking alone at least once`,`Any drink in the past week`],1,`"How many times in the past year have you had 5 (men) / 4 (women) or more drinks in a day?" 81.8% sensitive, 79.3% specific [[Smith2009JGIM]].`],
 [2,`USPSTF 2018 recommends alcohol screening plus brief counselling (grade B) for:`,[`Adolescents 12–17 only`,`Only adults over 65`,`Adults 18 and older, including pregnant people`,`Only people who ask for help`],2,`For adolescents aged 12–17 it issued an I statement: insufficient evidence [[USPSTF2018Alcohol]].`],
 [2,`In the 2018 Cochrane review, brief intervention reduced drinking at one year by about:`,[`20 g a week`,`Half of all drinking`,`200 g a week`,`2 g a week`],0,`Moderate-quality evidence, from a mean baseline of 244 g a week [[Kaner2018Cochrane]].`],
 [2,`The "E" in CAGE stands for:`,[`Excess`,`Eye-opener`,`Ethanol`,`Emergency`],1,`Cut down, Annoyed, Guilty, Eye-opener [[Ewing1984CAGE]]. At the usual cut-off it has limited value for screening [[Aertgeerts2004CAGE]].`],
 [2,`In adolescents, the usual CRAFFT cut-off is:`,[`4 or more`,`Any single yes`,`8 or more`,`2 or more`],3,`CRAFFT ≥2: sensitivity 0.76 and specificity 0.94 for any problem in 14–18-year-olds [[Knight2002CRAFFT]].`],
 [2,`DSM-5 AUD requires at least how many of the 11 criteria within 12 months?`,[`3`,`1`,`6`,`2`],3,`Mild 2–3, moderate 4–5, severe 6 or more [[Hasin2013DSM5,APA2022]].`],
 [2,`Which criterion did DSM-5 remove?`,[`Recurrent legal problems`,`Tolerance`,`Withdrawal`,`Craving`],0,`Legal problems were dropped (low prevalence, poor fit) and craving was added [[Hasin2013DSM5]].`],
 [2,`DSM-5 sustained remission means no criteria (except craving) for:`,[`1 month`,`12 months or more`,`3 months`,`5 years`],1,`Early remission is 3 to under 12 months; craving may persist in both [[Hasin2013DSM5]].`],
 [2,`DSM-IV alcohol dependence agrees best with DSM-5 AUD at:`,[`6 or more criteria`,`All 11 criteria`,`4 or more criteria`,`2 or more criteria`],2,`The moderate threshold, with sensitivity, specificity, PPV and NPV generally above 85% [[Compton2013Crosswalk]].`],
 [2,`ICD-11 alcohol dependence needs:`,[`One positive blood test`,`3 of 7 criteria`,`2 of 3 essential features`,`2 of 11 criteria`],2,`Impaired control, increasing priority, and physiological features; at least two are needed [[Degenhardt2019ICD11]].`],
 [2,`After heavy drinking, urinary EtG stayed above 0.5 mg/L for a median of about:`,[`6 hours`,`78 hours`,`3 weeks`,`3 months`],1,`Range about 40–130 hours in 32 people in detoxification [[Helander2009EtG]].`],
 [2,`PEth is formed:`,[`In red cell membranes, only when ethanol is present`,`From glucose during fasting`,`In hair follicles`,`From acetaldehyde in the liver`],0,`Phospholipase D makes it from phosphatidylcholine; average half-life about 4 days, up to 12 [[Hahn2016PEth]].`],
 [2,`After stopping heavy drinking, MCV may take how long to normalise?`,[`2–3 days`,`It never normalises`,`2–3 weeks`,`2–4 months`],3,`GGT usually returns to normal in 2–3 weeks, MCV in 2–4 months [[Niemela2016Biomarkers]].`],
 [2,`An AST:ALT ratio of 2 or more most suggests:`,[`A normal liver`,`Acute viral hepatitis`,`Recent light drinking`,`Advanced alcohol-related liver disease`],3,`In withdrawal admissions the ratio was usually 1.0 or less; in alcohol-related cirrhosis 69% had 2 or more [[Nyblom2004ASTALT,Cohen1979SGOTSGPT]].`],
 [2,`Can a laboratory test diagnose alcohol use disorder?`,[`Yes: a positive urine EtG`,`Yes: a raised GGT`,`No: AUD is a clinical diagnosis based on criteria`,`Yes: PEth above 20 ng/mL`],2,`Tests can confirm recent or heavy drinking; biomarkers were not included in the DSM-5 criteria [[Hasin2013DSM5,Niemela2016Biomarkers]].`],
 [3,`ASAM 2020 says withdrawal symptoms usually begin:`,[`Within 30 minutes`,`6–24 h after stopping or cutting down`,`5–7 days later`,`Only after 2 weeks`],1,`After long, heavy daily drinking, get medical help to stop safely [[ASAM2020Withdrawal]].`],
 [3,`Alcohol withdrawal seizures peak at about:`,[`24 hours`,`2 hours`,`2 weeks`,`5 days`],0,`They may begin as early as 8 h and continue up to 48 h [[ASAM2020Withdrawal]].`],
 [3,`Withdrawal hallucinosis differs from delirium tremens because:`,[`It needs a fever`,`Consciousness stays clear`,`It begins only after 7 days`,`It always follows a seizure`],1,`Hallucinations develop at 12–24 h with a clear sensorium [[ASAM2020Withdrawal,Saitz1998AHRW]].`],
 [3,`Sources disagree on when delirium tremens begins. Which pair is published?`,[`6–12 h and 12–24 h`,`Day 10 and day 20`,`48–72 h (Mirijello) and 72–96 h (ASAM)`,`1–2 h and 3–4 h`],2,`DT combines fluctuating attention with autonomic overactivity [[Mirijello2015,Jesse2017,ASAM2020Withdrawal]].`],
 [3,`The strongest predictor of delirium tremens or seizures in withdrawal is:`,[`A past episode of DT or seizure`,`Female sex`,`A high income`,`Drinking beer rather than spirits`],0,`OR 2.58 and 2.8 in a meta-analysis of 15 studies [[Goodson2014]].`],
 [3,`PAWSS flags a high risk of complicated withdrawal at a score of:`,[`10 or more`,`1 or more`,`19 or more`,`4 or more`],3,`Sensitivity 93.1% and specificity 99.5% in 403 medically ill inpatients [[Maldonado2015]].`],
 [3,`The maximum CIWA-Ar score is:`,[`100`,`67`,`10`,`40`],1,`Nine items score 0–7 and orientation scores 0–4 [[Mirijello2015,Sullivan1989CIWA]].`],
 [3,`The ASAM 2020 example CIWA-Ar bands are:`,[`<10 mild, 10–18 moderate, ≥19 severe`,`<20 mild, 20–40 moderate, >40 severe`,`<4 mild, 4–6 moderate, >6 severe`,`<8 mild, 8–15 moderate, >15 severe`],0,`Bands as published by ASAM 2020 [[ASAM2020Withdrawal]].`],
 [3,`CIWA-Ar is not suitable for a patient who:`,[`Has a tremor`,`Drank in the past day`,`Is delirious or cannot communicate`,`Is sweating`],2,`It relies on reported symptoms; RASS or CAM-ICU are used instead [[ASAM2020Withdrawal,Hecksel2008]].`],
 [3,`In Saitz 1994, symptom-triggered dosing compared with a fixed schedule used:`,[`No benzodiazepine at all`,`More drug for longer`,`The same dose and time`,`Less drug for a shorter time`],3,`100 vs 425 mg chlordiazepoxide and 9 vs 68 h, with no difference in seizures or DT [[Saitz1994JAMA]].`],
 [3,`In Mayo-Smith 1997, benzodiazepines reduced withdrawal seizures by:`,[`They increased seizures`,`7.7 per 100 patients`,`50 per 100 patients`,`0.1 per 100 patients`],1,`And delirium by 4.9 per 100 patients [[MayoSmith1997]].`],
 [3,`For alcohol withdrawal seizures, phenytoin:`,[`Is first line`,`Prevents DT`,`Is not used, unless there is a separate seizure disorder`,`Replaces benzodiazepines`],2,`Lorazepam was effective for secondary prevention and phenytoin was not [[Hillbom2003,ASAM2020Withdrawal]].`],
 [3,`In delirium tremens, neuroleptics compared with sedative-hypnotics carried a relative risk of death of:`,[`0.5`,`1.0`,`66`,`6.6`],3,`No deaths were reported in 217 people treated with benzodiazepines or barbiturates [[MayoSmith2004Delirium]].`],
 [3,`In Harper's 1986 autopsy series, the full Wernicke triad was present in:`,[`16% of cases`,`90% of cases`,`Every case`,`50% of cases`],0,`80% had not been diagnosed in life [[Harper1986JNNP]].`],
 [3,`The Caine criteria diagnose Wernicke encephalopathy with:`,[`All 3 triad signs`,`1 of 2 signs`,`2 of 4 signs`,`An MRI alone`],2,`Dietary deficiency, oculomotor abnormality, cerebellar dysfunction, and altered mental state or mild memory impairment [[Caine1997,Galvin2010EFNS]].`],
 [3,`On thiamine and glucose, ASAM 2020 says:`,[`They may be given in any order or together`,`Glucose must always come first`,`Glucose must be withheld for 24 h`,`Thiamine must never be given IV`],0,`EFNS 2010 still advises thiamine before carbohydrate: a real difference between guidelines [[ASAM2020Withdrawal,Galvin2010EFNS]].`],
 [3,`Korsakoff syndrome is mainly:`,[`A seizure disorder`,`Severe anterograde memory loss with confabulation`,`A type of liver failure`,`A late form of delirium tremens`],1,`A residual syndrome after Wernicke encephalopathy, linked to the mammillary bodies and anterior thalamus [[Kopelman2009,Arts2017]].`],
 [3,`What does ASAM 2020 say about using alcohol to treat withdrawal?`,[`It is used for DT`,`It is first line`,`It is used in the ICU`,`It should not be used`],3,`"Oral or intravenous alcohol should not be used for the prevention or treatment of alcohol withdrawal" [[ASAM2020Withdrawal]].`],
 [4,`Before starting naltrexone, the label advises an opioid-free interval of at least:`,[`No interval is needed`,`7–10 days`,`6 months`,`1 day`],1,`Naltrexone is an opioid antagonist and can precipitate opioid withdrawal [[FDA-Naltrexone,FDA-Vivitrol]].`],
 [4,`Acamprosate is contraindicated at a creatinine clearance of:`,[`Any value`,`60 mL/min or less`,`30 mL/min or less`,`90 mL/min or less`],2,`It is excreted unchanged by the kidneys; the starting dose is cut at 30–50 mL/min [[FDA-Campral]].`],
 [4,`Disulfiram works by inhibiting:`,[`Alcohol dehydrogenase`,`Mu-opioid receptors`,`NMDA receptors`,`Aldehyde dehydrogenase`],3,`After drinking, blood acetaldehyde can rise 5–10-fold [[FDA-Antabuse,KranzlerSoyka2018]].`],
 [4,`A disulfiram–alcohol reaction can occur up to how long after the last dose?`,[`14 days`,`6 months`,`1 hour`,`Never after stopping`],0,`The label also warns about hidden alcohol in sauces, vinegars and cough mixtures [[FDA-Antabuse]].`],
 [4,`Disulfiram beat controls mainly in:`,[`Trials in cirrhosis`,`Blinded trials`,`Trials with no counselling`,`Open-label or supervised trials`],3,`Blinded trials showed no superiority [[Skinner2014Disulfiram]].`],
 [4,`In Jonas 2014, the NNT to prevent return to any drinking was:`,[`2 for both`,`100 for acamprosate, 5 for naltrexone`,`12 for acamprosate, 20 for naltrexone`,`3 for naltrexone only`],2,`Naltrexone's NNT to prevent return to heavy drinking was 12 [[Jonas2014JAMA]].`],
 [4,`In COMBINE, which medicine worked alongside medical management?`,[`Acamprosate`,`Naltrexone`,`Only the combination of both`,`Neither`],1,`Acamprosate showed no significant effect, alone or combined [[Anton2006COMBINE]].`],
 [4,`The Vivitrol label dose is:`,[`380 mg by deep gluteal injection every 4 weeks`,`666 mg three times daily`,`50 mg by mouth daily`,`250 mg daily`],0,`Prepared and given by a healthcare provider [[FDA-Vivitrol]]. Its main trial showed a 25% fall in the heavy drinking day rate [[Garbutt2005JAMA]].`],
 [4,`Maisel 2013 found acamprosate had the larger effect on ___, and naltrexone on ___.`,[`Craving; abstinence`,`Liver enzymes; sleep`,`Abstinence; heavy drinking and craving`,`Withdrawal; seizures`],2,`A meta-analysis of 64 trials [[Maisel2013]].`],
 [4,`Topiramate's signature side effect in the multisite trial was:`,[`Weight gain`,`Hypertension`,`Hair loss`,`Paresthesia`],3,`50.8% vs 10.6% on placebo [[Johnson2007Topiramate]].`],
 [4,`Gabapentin 1,800 mg/day gave complete abstinence in:`,[`17.0%, vs 4.1% on placebo`,`50%, vs 49% on placebo`,`1%, vs 0% on placebo`,`90%, vs 10% on placebo`],0,`A dose-response: 11.1% on 900 mg/day [[Mason2014Gabapentin]].`],
 [4,`In people with cirrhosis (Addolorato 2007), baclofen achieved abstinence in:`,[`20%, vs 19% on placebo`,`71%, vs 29% on placebo`,`29%, vs 71% on placebo`,`100%, vs 0% on placebo`],1,`No hepatic side effects were recorded [[Addolorato2007Lancet]].`],
 [4,`Nalmefene, approved in the EU, is taken:`,[`To treat withdrawal`,`As needed, with reduced drinking as the goal`,`Only in hospital`,`Monthly by injection`],1,`In ESENSE 1, 18 mg as needed cut heavy drinking days by 2.3 a month more than placebo [[vandenBrink2013Nalmefene,Mann2013ESENSE1]].`],
 [4,`Project MATCH found that CBT, MET and twelve-step facilitation:`,[`Differed greatly`,`Worked only when matched to the person`,`Gave similar outcomes`,`Helped no one`],2,`The matching hypotheses were largely unsupported [[ProjectMATCH1997]].`],
 [4,`Cochrane 2020: manualised AA/TSF improved 12-month continuous abstinence compared with other treatments with a risk ratio of:`,[`1.21 (95% CI 1.03–1.42)`,`1.00, no difference`,`3.0`,`0.50`],0,`High-certainty evidence [[Kelly2020Cochrane]].`],
 [4,`Research suggests AA helps mainly by:`,[`Spiritual change in most members`,`Lowering blood pressure`,`Blocking opioid receptors`,`Changing a person's social network`],3,`Spiritual change mattered mainly for a minority with high addiction severity [[Kelly2012AAMech,Kelly2017AASpiritual]].`],
 [4,`In Miller 1999, CRAFT engaged what share of initially unmotivated loved ones in treatment?`,[`95%`,`64%`,`13%`,`30%`],1,`Versus 30% with the Johnson intervention and 13% with Al-Anon facilitation [[Miller1999]].`],
 [4,`In the US National Recovery Survey, the median number of serious attempts before resolving a problem was:`,[`20`,`0`,`2`,`10`],2,`The mean was 5.35; the authors recommend sharing the median. 9.1% of US adults had resolved a problem [[Kelly2019Attempts,Kelly2017NRS]].`],
 [4,`The NIAAA 2022 research definition of recovery requires:`,[`AA attendance`,`A negative PEth test`,`Lifelong abstinence`,`Remission from AUD plus cessation of heavy drinking`],3,`It does not require abstinence [[Hagman2022]].`],
 [5,`Fatty liver (steatosis) develops in about what share of people who drink heavily?`,[`90%`,`5%`,`30%`,`50%`],0,`It reverses with abstinence; steatohepatitis progresses to cirrhosis in 8–20% [[Singal2018ACG]].`],
 [5,`The Maddrey discriminant function threshold used for severe alcohol-associated hepatitis is:`,[`20`,`0.45`,`10`,`32`],3,`4.6 × (PT − control) + bilirubin in mg/dL [[Carithers1989,Louvet2007Lille]].`],
 [5,`A Lille score of 0.45 or more at day 7 of steroids means:`,[`Mild disease`,`Nonresponse`,`Cure`,`A need for alcohol testing`],1,`Six-month survival was 25%, vs 85% in responders [[Louvet2007Lille]].`],
 [5,`In STOPAH, prednisolone:`,[`Gave no significant mortality benefit at 90 days or 1 year`,`Halved 1-year mortality`,`Did worse than pentoxifylline`,`Caused fewer infections`],0,`28-day OR 0.72 (P = 0.06); serious infections 13% vs 7% [[Thursz2015STOPAH]].`],
 [5,`Early liver transplantation for nonresponding severe alcohol-associated hepatitis gave 6-month survival of:`,[`23%, vs 77% in matched controls`,`50%, vs 49% in matched controls`,`77%, vs 23% in matched controls`,`100%, vs 0% in matched controls`],2,`26 highly selected patients in France and Belgium [[Mathurin2011NEJM]].`],
 [5,`In alcohol-related cirrhosis, stopping drinking improved survival significantly from about:`,[`It never did`,`1 week`,`1.5 years`,`10 years`],2,`HR 0.51 at 1.5 years in 7 cohorts [[Xie2014HepatolRes]].`],
 [5,`Which is NOT one of the seven cancer sites causally linked to alcohol?`,[`Female breast`,`Prostate`,`Oesophagus`,`Colorectum`],1,`The seven: mouth, pharynx, larynx, oesophagus, liver, colorectum and female breast [[Baan2007IARC,Bagnardi2015BJC]].`],
 [5,`Breast cancer risk rises by about how much for each extra 10 g of alcohol a day?`,[`7%`,`0.1%`,`50%`,`It falls`],0,`7.1% (95% CI 5.5–8.7%), the same in women who did and did not smoke [[Hamajima2002BJC]].`],
 [5,`"Abstainer bias" helps explain the J-curve because:`,[`Non-drinkers under-report illness`,`It does not explain it`,`Light drinking protects the heart`,`Former drinkers in poor health are counted as non-drinkers`],3,`Adjusted RR for low-volume drinkers 0.97; former drinkers had RR 1.22 [[Stockwell2016JSAD]].`],
 [5,`Mendelian randomisation in the China Kadoorie Biobank found that the protective U-shape for stroke:`,[`Applied only to spirits`,`Disappeared for genotype-predicted intake`,`Was strongly confirmed`,`Applied only to women`],1,`The apparent stroke protection of moderate drinking is "largely non-causal" [[Millwood2019Lancet]].`],
 [5,`In an RCT of people with atrial fibrillation, abstinence cut 6-month recurrence from:`,[`20% to 10%`,`90% to 89%`,`53% to 73%`,`73% to 53%`],3,`HR 0.55 [[Voskoboinik2020NEJM]].`],
 [5,`In a French national cohort, alcohol use disorders were associated with dementia with an adjusted HR of about:`,[`30`,`1.1`,`3.3`,`0.5`],2,`The strongest modifiable risk factor in that cohort [[Schwarzinger2018LPH]].`],
 [5,`The FAS facial criteria need at least two of:`,[`Short palpebral fissures, smooth philtrum, thin upper lip`,`Small eyes, curly hair, freckles`,`High forehead, long chin, dimples`,`Cleft palate, large ears, wide nose`],0,`Hoyme 2016 criteria [[Hoyme2016Pediatrics]].`],
 [5,`CDC and AAP state that the safe amount of alcohol in pregnancy is:`,[`There is no known safe amount, and no safe time`,`Wine only`,`Any amount after the first trimester`,`One drink a week`],0,`No known safe amount and no safe trimester [[Gosdin2022MMWR,Williams2015AAP]]. Support in pregnancy is planned with the care team.`],
 [5,`Estimated global FASD prevalence among children and youth is:`,[`0.7 per 1,000`,`7.7 per 1,000`,`1 per million`,`77 per 1,000`],1,`In US first-graders the conservative range was 1.1–5.0% [[Lange2017JAMAPediatr,May2018JAMA]].`],
 [5,`The FDA boxed warning on combining opioids with alcohol or benzodiazepines warns of:`,[`Hair loss`,`Mild headache`,`Weight gain`,`Profound sedation, respiratory depression, coma and death`],3,`Mixing alcohol with opioids, benzodiazepines or other sedatives is dangerous [[FDA-OxyContin,FDA-Xanax]].`],
 [5,`In a UK meta-analysis, what share of hospital inpatients had alcohol dependence?`,[`About 1 in 1,000`,`About 1 in 2`,`About 1 in 10`,`About 1 in 100`],2,`And about 1 in 5 used alcohol harmfully [[Roberts2019]].`],
 [5,`In the semaglutide 2.4 mg RCT in AUD with obesity, heavy drinking days fell by how much more than with placebo?`,[`Not at all`,`50 percentage points`,`13.7 percentage points`,`1 percentage point`],2,`Early evidence; GLP-1 receptor agonists are not approved for AUD [[Klausen2026Lancet]].`],
 [5,`Scotland's minimum unit pricing was associated with how many fewer deaths wholly attributable to alcohol?`,[`50%`,`1%`,`None`,`13.4%`],3,`Effects were largest in the most deprived areas [[Wyper2023]].`],
 [6,`Who introduced the term "alcoholism"?`,[`Benjamin Rush`,`Magnus Huss`,`Bill Wilson`,`Griffith Edwards`],1,`Cited as Huss 1849, describing "alcoholismus chronicus" [[Tabakoff2013,Martin2014]].`],
 [6,`Alcoholics Anonymous dates its founding to 1935 in:`,[`Akron, Ohio`,`London`,`Stockholm`,`New York City`],0,`10 June 1935, the sobriety date of Dr Bob Smith [[Gross2010AA]].`],
 [6,`Disulfiram was first reported in the Lancet in 1948 by:`,[`Koob and Volkow`,`Hald and Jacobsen`,`Marlatt and Gordon`,`Edwards and Gross`],1,`The FDA approved it in 1951 [[Hald1948,Witkiewitz2019]].`],
 [6,`Edwards and Gross described the alcohol dependence syndrome in:`,[`1935`,`1849`,`2013`,`1976`],3,`A syndrome not defined by its consequences [[Edwards1976,Martin2014]].`],
 [6,`In which year did the FDA approve extended-release injectable naltrexone for AUD?`,[`2006`,`2004`,`1994`,`1951`],0,`Naltrexone followed in 1994 and acamprosate in 2004 [[Witkiewitz2019,FDA-DrugsFDA-AUD]].`],
 [6,`DSM-IV "diagnostic orphans" were people who:`,[`Had no symptoms at all`,`Had only legal problems`,`Had two dependence criteria and no abuse criteria`,`Were under 18`],2,`They received no diagnosis; DSM-5's single disorder closed the gap [[Hasin2013]].`],
 [6,`Benjamin Rush, near the end of the 18th century, described:`,[`The ALDH2 gene`,`The CIWA-Ar`,`PEth testing`,`Loss of control over alcohol`],3,`He saw habitual heavy drinking as a disease caused by alcohol itself [[Witkiewitz2019,Tabakoff2013]].`]
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
 ["Abstainer bias",`Counting former drinkers, who are often ill, as "non-drinkers", which makes light drinkers look healthier; after adjustment the J-curve's benefit disappeared (RR 0.97) [[Stockwell2016JSAD]].`,"body"],
 ["Acamprosate",`An approved AUD medicine for "maintenance of abstinence" in people abstinent at the start. It is excreted unchanged by the kidneys and does not treat withdrawal (label) [[FDA-Campral]].`,"medicines"],
 ["Acetaldehyde",`The first and most toxic product of ethanol metabolism; a mutagen and the main focus of research on how alcohol causes cancer [[Seitz2007,Brooks2009]].`,"drinks"],
 ["Acetaminophen and alcohol",`The US OTC label warns that severe liver damage may occur with 3 or more alcoholic drinks every day [[FDA-Tylenol]]. Chronic drinking induces CYP2E1, which makes more toxic acetaminophen metabolites [[Lieber2004MEOS]].`,"body"],
 ["ADH (alcohol dehydrogenase)",`The cytosolic enzyme that oxidises ethanol to acetaldehyde. Its low Km means it saturates after a few drinks, so BAC falls at a constant rate [[Jones2010,Zakhari2006]].`,"drinks"],
 ["ADH1B",`A gene for a fast alcohol dehydrogenase. The rs1229984 variant protects against alcohol dependence and reaches genome-wide significance [[Walters2018,Li2011ADH1B]].`,"genes"],
 ["Adverse childhood experiences (ACEs)",`Childhood adversities that were 2 to 13 times more likely when a parent had alcohol problems (retrospective reports) [[Dube2001]].`,"families"],
 ["Al-Anon",`The most widely used mutual-help group for people concerned about someone else's drinking [[Timko2013]].`,"families"],
 ["ALDH2",`Mitochondrial aldehyde dehydrogenase, which turns acetaldehyde into acetate [[Zakhari2006]].`,"genes"],
 ["ALDH2*2",`A dominant-negative variant that causes flushing. Heterozygotes who drink have about 3 times the oesophageal cancer risk (OR 3.19) [[Lewis2005,Li2009ALDH2]].`,"genes"],
 ["Alcohol dependence syndrome",`Edwards and Gross's 1976 description of dependence as a syndrome not defined by its consequences [[Edwards1976,Martin2014]].`,"history"],
 ["Alcohol poisoning",`A medical emergency: call emergency services. Signs progress from slurred speech and vomiting to stupor, coma and death [[Kanny2015MMWR]].`,"drinks"],
 ["Alcohol use disorder (AUD)",`A problematic pattern of alcohol use causing clinically significant impairment or distress, shown by 2 or more of 11 criteria in 12 months [[APA2022,Hasin2013DSM5]]. A treatable medical condition [[Carvalho2019Lancet]].`,"what"],
 ["Alcohol withdrawal",`Symptoms when a physically dependent person stops or cuts down, from a sudden reversal of alcohol's depressant effects; the most severe results are seizures and delirium [[ASAM2020Withdrawal]].`,"withdrawal"],
 ["Alcohol-associated hepatitis (AH)",`Rapid onset or worsening of jaundice in heavy drinking; 1-month mortality can reach 20–50% in severe cases (population statistics) [[Singal2018ACG]].`,"liver"],
 ["Alcohol-associated liver disease (ALD)",`The spectrum of steatosis, alcohol-associated hepatitis and cirrhosis; the AASLD term replacing "alcoholic liver disease" [[Crabb2020AASLD,Singal2018ACG]].`,"liver"],
 ["Alcohol-related brain damage",`An umbrella term covering alcohol-related dementia and Wernicke–Korsakoff syndrome; partial recovery is possible with abstinence [[Ridley2013AlzResTher]].`,"body"],
 ["Alcoholics Anonymous (AA)",`A mutual-help fellowship founded in 1935 in Akron, Ohio [[Gross2010AA]]. Its effect works mainly through social-network change [[Kelly2012AAMech]].`,"recovery"],
 ["\"Alcoholism\"",`The older, lay name for alcohol use disorder, introduced by Magnus Huss [[Tabakoff2013]].`,"history"],
 ["Allostasis",`In Koob's model, a chronic shift in the reward set point kept going by stress systems, which may explain lasting relapse risk <span class="ev hyp">Hypothesis</span> [[KoobLeMoal2001]].`,"brain"],
 ["Alpha-2 agonists",`Clonidine and dexmedetomidine: adjuncts for autonomic signs in withdrawal, never used alone, because they do not prevent seizures or DT [[ASAM2020Withdrawal]].`,"detox"],
 ["ARND",`Alcohol-related neurodevelopmental disorder, one of the four Institute of Medicine FASD categories [[Hoyme2016Pediatrics]].`,"pregnancy"],
 ["AST:ALT ratio",`A ratio above 2 suggests advanced alcohol-related liver disease rather than heavy drinking itself [[Cohen1979SGOTSGPT,Nyblom2004ASTALT]].`,"biomarkers"],
 ["Atrial fibrillation (AF)",`The commonest alcohol-triggered arrhythmia. Risk rises about 8% per drink a day, and abstinence cut recurrence from 73% to 53% [[Larsson2014JACC,Voskoboinik2020NEJM]].`,"body"],
 ["AUDIT",`The WHO 10-item Alcohol Use Disorders Identification Test, scored 0–40; 8 or more flags hazardous or harmful use [[Saunders1993AUDIT]].`,"screening"],
 ["AUDIT-C",`The first three AUDIT questions, scored 0–12; positive at 4 or more in men and 3 or more in women [[Bradley2007AUDITC]].`,"screening"],
 ["Baclofen",`A GABA-B agonist used off-label; approved for AUD in France in 2018 [[Witkiewitz2019]]. It has a cirrhosis RCT (71% vs 29% abstinent) [[Addolorato2007Lancet]].`,"offlabel"],
 ["Behavioural couples therapy (BCT)",`Treatment with the partner; it beat individual treatment (d = 0.54) [[Powers2008]].`,"therapy"],
 ["Benzodiazepines",`First-line medicines for alcohol withdrawal, reducing both seizures and delirium [[MayoSmith1997,ASAM2020Withdrawal]].`,"detox"],
 ["Binge drinking",`In US surveys, 5 or more drinks (males) or 4 or more (females) on one occasion [[Kranzler2018JAMA]]; it reflects drinking to a BAC of about 0.08 g% [[Corbin2014]].`,"drinks"],
 ["Blood alcohol concentration (BAC)",`The amount of ethanol in the blood, often in g/dL. It peaks 10–60 minutes after a dose [[Jones2019WIREs]]. A BAC calculation is a teaching estimate with real uncertainty [[Posey2007Widmark]].`,"drinks"],
 ["Brief intervention",`Five or fewer sessions totalling under 60 minutes, for hazardous and harmful drinkers who are not seeking help; about 20 g a week less drinking at one year [[Kaner2018Cochrane]].`,"screening"],
 ["CAGE",`Four questions: Cut down, Annoyed, Guilty, Eye-opener [[Ewing1984CAGE]]; of limited value for screening [[Aertgeerts2004CAGE]].`,"screening"],
 ["Caine criteria",`Wernicke encephalopathy in people who drink heavily: 2 of dietary deficiency, oculomotor abnormality, cerebellar dysfunction, altered mental state [[Caine1997,Galvin2010EFNS]].`,"wernicke"],
 ["CAM (Confusion Assessment Method)",`Delirium = acute onset with fluctuating course, plus inattention, plus disorganised thinking or an altered level of consciousness [[Inouye1990]].`,"nursing"],
 ["CAM-ICU",`A delirium tool for ventilated ICU patients (sensitivity 93–100%, about 2 minutes) [[Ely2001CAMICU]], used where CIWA-Ar cannot be [[ASAM2020Withdrawal]].`,"ciwa"],
 ["Carbamazepine",`An anticonvulsant that ASAM 2020 lists as appropriate for mild withdrawal and an alternative for moderate withdrawal [[ASAM2020Withdrawal]].`,"detox"],
 ["Carbohydrate-deficient transferrin (CDT)",`A specific marker of chronic heavy drinking that needs about 50–80 g a day for weeks to rise [[Niemela2016Biomarkers]]; half-life about 15 days [[Arnts2021LiverBiomarkers]].`,"biomarkers"],
 ["Chlordiazepoxide",`A long-acting benzodiazepine labelled for "withdrawal symptoms of acute alcoholism" (label wording) [[FDA-Chlordiazepoxide]].`,"detox"],
 ["CIWA-Ar",`The 10-item Clinical Institute Withdrawal Assessment for Alcohol, revised; maximum 67 [[Sullivan1989CIWA,Mirijello2015]]. ASAM bands: <10, 10–18, ≥19 [[ASAM2020Withdrawal]].`,"ciwa"],
 ["Cirrhosis",`Advanced scarring of the liver. It follows steatohepatitis in 8–20% [[Singal2018ACG]]; stopping drinking improves survival [[Xie2014HepatolRes]].`,"liver"],
 ["COMBINE",`A 1,383-person US trial: naltrexone with medical management helped; acamprosate did not [[Anton2006COMBINE]].`,"medicines"],
 ["Community reinforcement approach (CRA)",`A behavioural treatment that makes sober life more rewarding; first described by Hunt and Azrin in 1973 [[Hunt1973,Roozen2004CRA]].`,"therapy"],
 ["Confabulation",`A feature of Korsakoff syndrome, alongside severe anterograde episodic memory loss [[Kopelman2009]].`,"wernicke"],
 ["Contingency management (CM)",`Rewards for verified abstinence, for example EtG-negative urine; 3.1 times more negative samples in one trial [[McDonell2017]].`,"therapy"],
 ["Corticotropin-releasing factor (CRF)",`A brain stress transmitter recruited in the extended amygdala during the withdrawal/negative affect stage [[KoobVolkow2016]].`,"brain"],
 ["CRAFFT",`An adolescent screen: Car, Relax, Alone, Forget, Friends, Trouble; positive at 2 or more [[Shenoi2019CRAFFT,Knight2002CRAFFT]].`,"screening"],
 ["CRAFT",`Community reinforcement and family training: it helps family members get a loved one into treatment, about three times as often as Al-Anon [[Roozen2010CRAFT]].`,"families"],
 ["Craving",`A strong desire to drink; added as a DSM-5 criterion [[Hasin2013DSM5]].`,"criteria"],
 ["CYP2E1",`An inducible liver enzyme (part of the MEOS) with a higher Km than ADH; it raises clearance in heavy drinkers [[Norberg2003,Cederbaum2012]].`,"drinks"],
 ["Delirium tremens (DT)",`Withdrawal delirium with fluctuating attention and autonomic overactivity, beginning 48–72 h (Mirijello) or 72–96 h (ASAM) after the last drink [[Mirijello2015,ASAM2020Withdrawal]].`,"withdrawal"],
 ["Diagnostic orphans",`People with two DSM-IV dependence criteria and no abuse criteria, who received no diagnosis [[Hasin2013DSM5]].`,"criteria"],
 ["Disulfiram",`An ALDH inhibitor (Antabuse) that causes an aversive reaction to alcohol [[FDA-Antabuse]]. It works in supervised or open-label trials [[Skinner2014Disulfiram]].`,"medicines"],
 ["Disulfiram–alcohol reaction",`Flushing, throbbing headache, nausea, vomiting, palpitations and hypotension after alcohol on disulfiram, possible up to 14 days after the last dose [[FDA-Antabuse]].`,"medicines"],
 ["Dopamine",`A reward transmitter released by alcohol in the human ventral striatum [[Boileau2003]].`,"brain"],
 ["DSM-5-TR",`The 2022 text revision of DSM-5, which defines AUD by 11 criteria [[APA2022]].`,"criteria"],
 ["Dynorphin",`A stress-related opioid peptide recruited in the extended amygdala in withdrawal [[KoobVolkow2016]].`,"brain"],
 ["Early liver transplantation",`Transplant for a first episode of severe AH not responding to treatment, in highly selected people: 6-month survival 77% vs 23% [[Mathurin2011NEJM]].`,"liver"],
 ["Early remission",`3 to under 12 months with no AUD criteria except craving [[Hasin2013DSM5]].`,"criteria"],
 ["Ethyl glucuronide (EtG)",`A minor ethanol metabolite in urine, detectable for a median of about 78 h after heavy drinking [[Helander2009EtG]]. Incidental exposure can make it positive [[Thierauf2009TraceEtG]].`,"biomarkers"],
 ["Ethyl sulfate (EtS)",`A minor ethanol metabolite with a urinary time course similar to EtG [[Helander2009EtG]].`,"biomarkers"],
 ["Extended amygdala",`The brain hub of the withdrawal/negative affect stage [[KoobVolkow2016]].`,"brain"],
 ["Extended-release naltrexone",`Vivitrol: 380 mg by deep gluteal injection every 4 weeks, given by a healthcare provider (label) [[FDA-Vivitrol]].`,"medicines"],
 ["Fetal alcohol spectrum disorder (FASD)",`The umbrella term for the effects of prenatal alcohol exposure [[Williams2015AAP]]; about 7.7 per 1,000 children and youth worldwide [[Lange2017JAMAPediatr]].`,"pregnancy"],
 ["Fetal alcohol syndrome (FAS)",`The most severe FASD form, first described in 1973 [[Williams2015AAP]]: facial features, growth deficiency, brain effects and neurobehavioural impairment [[Hoyme2016Pediatrics]].`,"pregnancy"],
 ["First-pass metabolism",`Oxidation of some alcohol in the stomach before it reaches the blood; lower in women and when fasting [[Frezza1990,Cederbaum2012]].`,"drinks"],
 ["Front loading",`Giving large early doses of a long-acting benzodiazepine; ASAM 2020 recommends it for severe withdrawal (CIWA-Ar ≥19) [[ASAM2020Withdrawal]].`,"detox"],
 ["GABA-A receptor",`The main inhibitory receptor; ethanol enhances it acutely, and chronic drinking changes its subunits [[Kumar2009]].`,"brain"],
 ["Gabapentin",`An anticonvulsant used off-label, with a dose-response for abstinence (17.0% at 1,800 mg vs 4.1% placebo) [[Mason2014Gabapentin]].`,"offlabel"],
 ["Gamma-glutamyltransferase (GGT)",`A liver enzyme that rises with drinking but is not specific; it normalises 2–3 weeks after stopping [[Niemela2016Biomarkers]].`,"biomarkers"],
 ["Genome-wide association study (GWAS)",`A scan of the genome for common variants; in AUD, ADH1B variants reach genome-wide significance [[Walters2018]].`,"genes"],
 ["GLP-1 receptor agonists",`Diabetes and obesity medicines under study for AUD, not approved for it <span class="ev early">Early evidence</span> [[Klausen2026Lancet,Wang2024]].`,"frontier"],
 ["Hair EtG",`EtG in hair, reflecting months of drinking; 30 pg/mg or more strongly suggests chronic excessive drinking (SoHT 2026) [[Favretto2026SoHT]].`,"biomarkers"],
 ["Hallucinosis (withdrawal)",`Hallucinations with a clear sensorium at 12–24 h, distinct from delirium tremens; the older name is alcoholic hallucinosis [[ASAM2020Withdrawal,Saitz1998AHRW]].`,"withdrawal"],
 ["Harm reduction",`Approaches that lower harm without requiring abstinence, such as cutting down by WHO risk levels or managed alcohol programmes [[Hasin2017WHO,Carver2026]].`,"recovery"],
 ["Harmful pattern of use (ICD-11)",`Drinking that has damaged physical or mental health without reaching dependence [[Degenhardt2019ICD11]].`,"criteria"],
 ["Harmful use",`WHO term used with the AUDIT for a drinking pattern already damaging health [[HigginsBiddle2018USAUDIT]].`,"screening"],
 ["Hazardous use",`WHO term for a drinking pattern that raises the risk of harm, even without a current disorder [[HigginsBiddle2018USAUDIT]].`,"screening"],
 ["Heavy alcohol use",`In US surveys, binge drinking on 5 or more days in the past month [[Kranzler2018JAMA]].`,"drinks"],
 ["Heritability",`The share of variation in a trait due to genes; about 0.49 for AUD [[Verhulst2015]].`,"genes"],
 ["High-intensity drinking",`8 or more drinks for women and 10 or more for men, at least twice the binge thresholds [[Patrick2023HID]].`,"drinks"],
 ["Holiday heart",`Alcohol-triggered heart rhythm disorder, classically AF after binge drinking, named in 1978 [[Ettinger1978,Day2019Addiction]].`,"body"],
 ["Hypomagnesaemia",`Low magnesium, found in 44% of one small withdrawal cohort [[Manning2014]]; it can keep potassium low through renal wasting [[Elisaf2002]].`,"nursing"],
 ["ICD-11 alcohol dependence",`2 of 3 features: impaired control, increasing priority, physiological features [[Degenhardt2019ICD11]].`,"criteria"],
 ["Ignition interlock",`Interlocks cut re-arrest for alcohol-impaired driving while installed; re-arrest returned to comparison levels once removed [[Elder2011]].`,"recovery"],
 ["J-curve",`The apparent lower mortality of light drinkers in cohort studies, largely explained by bias [[Stockwell2016JSAD,Zhao2023JAMANO]].`,"body"],
 ["Ketamine",`An anaesthetic under study with therapy for AUD <span class="ev early">Early evidence</span> [[Dakwar2020]].`,"frontier"],
 ["Kindling",`Repeated withdrawals making later withdrawal worse <span class="ev early">Early evidence</span> [[Becker1998Kindling,Brown1988Kindling]].`,"withdrawal"],
 ["Korsakoff syndrome",`Severe anterograde episodic memory loss with confabulation, usually after Wernicke encephalopathy [[Kopelman2009,Arts2017]].`,"wernicke"],
 ["Lille model",`A day-7 steroid-response score; 0.45 or more means nonresponse (6-month survival 25% vs 85%) [[Louvet2007Lille]].`,"liver"],
 ["Maddrey discriminant function",`4.6 × (PT − control) + bilirubin (mg/dL); 32 or more marks severe AH [[Carithers1989,Singal2018ACG]].`,"liver"],
 ["Mammillary bodies",`Small brain structures damaged in Wernicke–Korsakoff syndrome [[Kopelman2009]].`,"wernicke"],
 ["Managed alcohol programme (MAP)",`Regulated doses of alcohol with housing and health support for people with alcohol dependence who are homeless <span class="ev early">Early evidence</span> [[Carver2026,Stockwell2021]].`,"recovery"],
 ["Mean corpuscular volume (MCV)",`Red cell size; it rises with drinking and takes 2–4 months to normalise [[Niemela2016Biomarkers]].`,"biomarkers"],
 ["MELD",`A score from bilirubin, creatinine and INR; above 20 flags severe AH [[Kamath2001MELD,Singal2018ACG]].`,"liver"],
 ["Mendelian randomisation",`Using gene variants as natural experiments; ALDH2/ADH1B studies show no protective U-shape for stroke [[Millwood2019Lancet]].`,"body"],
 ["MEOS",`The microsomal ethanol-oxidising system (CYP2E1), induced by chronic drinking [[Lieber2004MEOS]].`,"drinks"],
 ["Minimum unit pricing (MUP)",`A floor price per unit of alcohol; Scotland's £0.50 MUP was associated with 13.4% fewer wholly attributable deaths [[Wyper2023]].`,"recovery"],
 ["Motivational interviewing (MI)",`A counselling approach tested in 93 studies: a small-to-moderate effect vs no intervention right afterwards, shrinking at later follow-up [[Schwenker2023]].`,"therapy"],
 ["Mutual-help groups",`Peer groups such as AA, SMART Recovery, LifeRing and Women for Sobriety; deeper involvement in each was linked with similar outcomes [[Zemore2018]].`,"recovery"],
 ["NADH",`A reduced coenzyme made by ADH and ALDH2; its surplus drives fatty liver [[Cederbaum2012,Lieber2004Fatty]].`,"drinks"],
 ["Nalmefene",`A mu- and delta-opioid antagonist and kappa partial agonist [[KranzlerSoyka2018]], approved in the EU and taken as needed to reduce drinking [[vandenBrink2013Nalmefene]].`,"offlabel"],
 ["Naltrexone",`A mu-opioid antagonist approved for AUD; it reduces heavy drinking and craving [[FDA-Naltrexone,Maisel2013]]. Opioids must be stopped 7–10 days first (label) [[FDA-Naltrexone]].`,"medicines"],
 ["Negative reinforcement",`Drinking to relieve a negative emotional state [[Koob2014]].`,"brain"],
 ["NMDA receptor",`A glutamate receptor that ethanol inhibits acutely and that is up-regulated with tolerance [[Lovinger1989,TsaiCoyle1998]].`,"brain"],
 ["Number needed to treat (NNT)",`How many people must be treated for one to benefit; acamprosate 12 and naltrexone 20 to prevent any drinking [[Jonas2014JAMA]].`,"medicines"],
 ["Nucleus accumbens",`A reward hub in the ventral striatum where alcohol releases dopamine and endogenous opioids [[Boileau2003,Mitchell2012]].`,"brain"],
 ["Ondansetron",`Studied in early-onset AUD (70.1% vs 50.2% days abstinent) and by genotype <span class="ev early">Early evidence</span> [[Johnson2000JAMA,Johnson2011Ondansetron]].`,"offlabel"],
 ["OPRM1 Asn40Asp",`A mu-opioid receptor variant once thought to predict naltrexone response; a prospective RCT found no interaction [[Oslin2015JAMAPsych]].`,"frontier"],
 ["PAWSS",`The Prediction of Alcohol Withdrawal Severity Scale: 10 items, 4 or more flags high risk of complicated withdrawal [[Maldonado2014,Maldonado2015]].`,"withdrawal"],
 ["Phenobarbital",`A barbiturate for withdrawal, used only by experienced clinicians "given its narrow therapeutic window" [[ASAM2020Withdrawal]].`,"detox"],
 ["Phosphatidylethanol (PEth)",`A blood marker formed only when ethanol is present; average half-life about 4 days [[Hahn2016PEth]].`,"biomarkers"],
 ["Polygenic score",`A sum of many small genetic effects; for AUD it explains about 2.5–3.5% of the variance and cannot diagnose [[Barr2020]].`,"genes"],
 ["Prefrontal cortex",`Front of the brain; with the insula, the hub of the preoccupation/anticipation stage [[KoobVolkow2016]].`,"brain"],
 ["Project MATCH",`A large trial in which CBT, MET and twelve-step facilitation gave similar outcomes [[ProjectMATCH1997]].`,"therapy"],
 ["Psilocybin-assisted therapy",`Psilocybin sessions with psychotherapy; heavy drinking days 9.7% vs 23.6% in one RCT <span class="ev early">Early evidence</span> [[Bogenschutz2022]].`,"frontier"],
 ["RASS",`The Richmond Agitation-Sedation Scale, from +4 combative to −5 unarousable [[Sessler2002RASS]].`,"ciwa"],
 ["Recompensation",`Recovery from decompensated cirrhosis; 31.1% of people who stopped drinking achieved it in one cohort [[Hofer2026JHep]].`,"liver"],
 ["Recovery (NIAAA 2022)",`Remission from DSM-5 AUD plus cessation of heavy drinking; abstinence is not required [[Hagman2022]].`,"recovery"],
 ["Recovery capital",`The personal, social and community resources that support recovery [[Laudet2008]].`,"recovery"],
 ["Refeeding syndrome",`Dangerous shifts in electrolytes when feeding restarts after malnutrition; prior alcohol misuse is a reported risk factor [[Zheng2025]].`,"nursing"],
 ["Relapse prevention",`Marlatt's model built on high-risk situations, coping, self-efficacy, outcome expectancies and the abstinence violation effect [[Larimer1999]].`,"therapy"],
 ["Resistant alcohol withdrawal",`Withdrawal uncontrolled despite large benzodiazepine doses; ASAM 2020 notes it "is not well defined" [[ASAM2020Withdrawal]].`,"detox"],
 ["SBIRT",`Screening, Brief Intervention, and Referral to Treatment: a public-health approach built on universal screening [[Babor2007SBIRT]].`,"screening"],
 ["Semaglutide",`A GLP-1 receptor agonist; in AUD with obesity it cut heavy drinking days 13.7 percentage points more than placebo <span class="ev early">Early evidence</span> [[Klausen2026Lancet]].`,"frontier"],
 ["SMART Recovery",`A mutual-help alternative to AA; deeper involvement was linked with similar outcomes [[Zemore2018]].`,"recovery"],
 ["Sodium oxybate (GHB)",`Approved in Italy and Austria for alcohol withdrawal and abstinence; it carries misuse risk and is dangerous with alcohol or other sedatives [[Guiraud2022SMO,Leone2010Cochrane]].`,"offlabel"],
 ["Standard drink",`A set amount of ethanol: 0.6 oz in the US [[Kranzler2018JAMA]]; 10 g in GBD, and 8–20 g across countries [[Kalinowski2016]].`,"drinks"],
 ["Steatohepatitis (ASH)",`Fatty liver with inflammation; about one-third of people with steatosis who keep drinking heavily [[Singal2018ACG]].`,"liver"],
 ["Steatosis",`Fatty liver; seen in about 90% of people who drink heavily and reversible with abstinence [[Singal2018ACG]].`,"liver"],
 ["Stigma",`Negative labels and treatment. "Substance abuser" made clinicians more likely to favour punishment [[Kelly2010Language]]; stigma towards AUD stays high [[Kilian2021]].`,"families"],
 ["STOPAH",`A 1,103-person trial: prednisolone gave no significant mortality benefit and pentoxifylline none [[Thursz2015STOPAH]].`,"liver"],
 ["Sustained remission",`12 months or more with no AUD criteria except craving [[Hasin2013DSM5]].`,"criteria"],
 ["Symptom-triggered dosing",`Giving withdrawal medicine only when a CIWA-Ar score calls for it; less drug for a shorter time [[Saitz1994JAMA]]. ASAM 2020's preferred inpatient method [[ASAM2020Withdrawal]].`,"ciwa"],
 ["T-ACE",`A pregnancy screen: Tolerance, Annoyed, Cut down, Eye-opener; 2 or more is positive [[Sokol1989TACE]].`,"screening"],
 ["Telescoping",`Women's apparently faster progression to AUD and its health consequences [[Kirsch2025]].`,"nursing"],
 ["Thiamine",`Vitamin B1; deficiency causes Wernicke encephalopathy [[Sechi2007]]. Regimens are quoted as published by EFNS and ASAM [[Galvin2010EFNS,ASAM2020Withdrawal]].`,"wernicke"],
 ["Tolerance",`Needing more alcohol for the same effect; a DSM-5 criterion [[APA2022]], driven partly by receptor adaptation [[Kumar2009]].`,"brain"],
 ["Topiramate",`An anticonvulsant used off-label; it reduced heavy drinking days, with paresthesia in 50.8% [[Johnson2007Topiramate]].`,"offlabel"],
 ["Twelve-step facilitation (TSF)",`Manualised therapy that encourages AA involvement; it beat other treatments for 12-month continuous abstinence [[Kelly2020Cochrane]].`,"recovery"],
 ["UKATT",`A UK trial in which social behaviour and network therapy matched MET; both saved about five times their cost [[UKATT2005,UKATT2005Cost]].`,"therapy"],
 ["Unhealthy alcohol use",`The USPSTF term for a spectrum from risky drinking to AUD [[USPSTF2018Alcohol]].`,"screening"],
 ["USPSTF",`The US Preventive Services Task Force; it recommends alcohol screening and brief counselling for adults (B) [[USPSTF2018Alcohol]].`,"screening"],
 ["Volume of distribution (Widmark r)",`The body water ethanol spreads in: about 0.70 L/kg in men and 0.60 in women [[Jones2019WIREs]]; fixed Widmark factors 0.68 and 0.55 [[Terpstra2020]].`,"drinks"],
 ["Warm handoff",`A direct, personal link from withdrawal care to AUD treatment providers (ASAM 2020) [[ASAM2020Withdrawal]].`,"nursing"],
 ["Wernicke encephalopathy (WE)",`An acute neuropsychiatric syndrome caused by thiamine deficiency, greatly underdiagnosed [[Sechi2007,Harper1986JNNP]].`,"wernicke"],
 ["WHO risk drinking levels",`Four levels of average daily intake; dropping 1–2 levels is linked with less dependence and liver disease [[Hasin2017WHO,Knox2018Liver]].`,"recovery"],
 ["Withdrawal management",`The term that replaced "detoxification"; on its own "not an effective treatment for alcohol use disorder" [[ASAM2020Withdrawal]].`,"detox"],
 ["Zero-order kinetics",`Elimination at a constant amount per hour, because ADH is saturated; BAC falls in a straight line [[Jones2010]].`,"drinks"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation and tag markup, fold Greek letters and hyphens away, so 'b-blocker' or 'cdt' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/α/g,'a').replace(/[-–"]/g,'');
  const L0=GL_T.slice().sort((a,b)=>norm(a[0]).localeCompare(norm(b[0])));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, drinking patterns, burden & history',B:'Alcohol in the body and brain: metabolism, neurobiology & genetics',C:'Screening, diagnosis & biomarkers',D:'Alcohol withdrawal: syndrome, CIWA-Ar, management & Wernicke',E:'Medicines for AUD: approved and off-label',F:'Psychosocial treatment, mutual help, course & recovery',G:'Medical harms: liver, cancer, heart, brain, pregnancy & FASD',H:'Nursing, harm reduction, special groups & the research frontier'};
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
