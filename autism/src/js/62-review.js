/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding autism",2:"Part 2 · Causes & the brain",3:"Part 3 · Signs & diagnosis",4:"Part 4 · Supports & interventions",5:"Part 5 · Living & lifespan",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding autism ---- */
 [1,`How many people worldwide were autistic in 2021?`,`About 61.8 million, or 1 in every 127 people, in the Global Burden of Disease Study 2021 [[Santomauro2025]].`],
 [1,`What did the US ADDM Network find for 8-year-olds in 2022?`,`32.2 per 1,000 (about 1 in 31) across 16 sites, with boys identified 3.4 times as often as girls (49.2 vs 14.3 per 1,000) [[Shaw2025]].`],
 [1,`How far has ADDM prevalence moved since 2000?`,`From 6.7 per 1,000 (about 1 in 150) in 2000 to 32.2 per 1,000 in 2022 [[ADDM2007SY2000,Shaw2025]]. ADDM is not a nationally representative sample [[Baio2018]].`],
 [1,`Why have recorded autism rates risen?`,`Mostly better recognition. In Denmark, two reporting changes explained 60% of the rise [[Hansen2015Reporting]]; in Sweden the symptom phenotype in twins stayed stable while registered diagnoses rose [[Lundstrom2015]].`],
 [1,`What is the true male-to-female ratio?`,`Closer to 3:1 than 4:1. High-quality studies give 3.32; studies counting only existing diagnoses give 4.56, because girls who meet criteria are missed [[Loomes2017]].`],
 [1,`What changed in ADDM 2020 by race and ethnicity?`,`For the first time, prevalence was lower in White 8-year-olds (24.3 per 1,000) than in Black, Hispanic and Asian/Pacific Islander children [[Maenner2023]].`],
 [1,`Is autism lifelong? What does adult prevalence show?`,`Yes. Adult prevalence in England is about 1.1% and does not fall with age [[Brugha2016,Brugha2011]].`],
 [1,`"Autistic person" or "person with autism"?`,`Both are used. Many autistic adults prefer identity-first terms and professionals more often use person-first ones [[Kenny2016,Taboas2023]]. A 19-study review found no consensus and advises respecting each person's preference [[Schuck2025]].`],
 [1,`Why are "high-functioning" and "low-functioning" labels criticised?`,`In 2,225 children, IQ was "a weak predictor" of adaptive behaviour [[Alvares2020]], and few UK autistic adults endorse these labels: about 20% for "high-functioning" and under 10% for "low-functioning" [[BottemaBeutel2021Ableist,Keating2023]].`],
 [1,`What is the double empathy problem?`,`Milton's 2012 idea that social difficulty is a two-way mismatch between autistic and non-autistic people, not a one-sided deficit [[Milton2012]]. Mixed chains passed on fewer story details in 2020 [[Crompton2020]], but a larger 2025 replication found no difference [[Crompton2025]].`],
 [1,`What are the three stages of camouflaging?`,`Motivations (fitting in, connecting), techniques (masking and compensation) and consequences (exhaustion, threats to self-perception), from interviews with 92 autistic adults [[Hull2017]].`],
 [1,`What is "profound autism"?`,`An administrative term proposed by the 2021 Lancet Commission for autistic people who need 24-hour access to an adult to stay safe [[Lord2022Lancet]]. A working definition applied to ADDM data gave 26.7% of autistic 8-year-olds [[Hughes2023]].`],
 [1,`How common are sensory differences in autism?`,`Over 90% of autistic children and 94.4% of autistic adults report them [[Leekam2007,Crane2009]]. DSM-5 placed them in criterion B4 [[APA2022]].`],
 [1,`What are Dunn's four sensory patterns?`,`Low registration, sensation seeking, sensory sensitivity and sensation avoiding, from crossing neurological threshold with self-regulation strategy. Everyone has some of each [[Dunn2001]].`],
 [1,`Meltdown or shutdown: what is the difference?`,`A meltdown is being overwhelmed by sensory, social and emotional load, "feeling out of control"; a shutdown is more inward, "feeling frozen" and withdrawn [[Lewis2023Meltdown,Phung2021]].`],
 /* ---- Part 2: causes & the brain ---- */
 [2,`How heritable is autism?`,`About 80%: a five-country median of 80.8% [[Bai2019]] and 0.83 in a Swedish reanalysis [[Sandin2017]].`],
 [2,`What is the recurrence for a younger sibling of an autistic child?`,`About 1 in 5: 18.7% (2011) and 20.2% (2024) in prospective infant-sibling cohorts [[Ozonoff2011,Ozonoff2024]]. Most younger siblings are not autistic.`],
 [2,`How does relative recurrence risk fall with relatedness?`,`Identical twin 153, full sibling 10.3, half-sibling about 3, cousin 2.0 [[Sandin2014]].`],
 [2,`Common or rare variants: which carry most heritable liability?`,`Common variants. De novo mutations explain only 2.6% of population variance but can matter greatly for an individual [[Gaugler2014]].`],
 [2,`How many autism risk genes have exome studies identified?`,`102 in Satterstrom 2020 and 72 at FDR ≤0.001 in Fu 2022 [[Satterstrom2020,Fu2022]].`],
 [2,`How much autism do 16p11.2 changes account for?`,`About 1%, counting the deletion and the duplication together [[Weiss2008NEJM]].`],
 [2,`What causes fragile X syndrome, and how often is autism present?`,`More than 200 CGG repeats in FMR1 silence the gene [[Hagerman2017]]. About half of males and nearly 20% of females with fragile X meet autism criteria [[Kaufmann2017]].`],
 [2,`Which gene causes Rett syndrome?`,`MECP2, X-linked; it occurs almost only in females [[Amir1999]], and about 61% show autism features [[Richards2015]].`],
 [2,`When is PTEN testing considered?`,`In autism with extreme macrocephaly [[Butler2005PTEN]]. About 25% of PTEN carriers have autism features [[Cummings2022PTEN]].`],
 [2,`What are the yields of first-tier genetic tests?`,`Chromosomal microarray 15–20% (karyotype about 3%) [[Miller2010CMA]]; exome sequencing 36% across neurodevelopmental disorders [[Srivastava2019]].`],
 [2,`What is the absolute autism risk after prenatal valproate?`,`4.42% vs 1.53% in all children (adjusted HR 2.9) [[Christensen2013]]. Anyone taking it is advised to talk with their doctor before pregnancy, not to stop on their own [[FDA-Depakote]].`],
 [2,`Does the MMR vaccine cause autism?`,`No. In 657,461 Danish children the adjusted HR was 0.93 (0.85–1.02) [[Hviid2019]]; a meta-analysis of 1,256,407 children found OR 0.99 [[Taylor2014Vaccine]].`],
 [2,`What happened to the 1998 Wakefield paper?`,`The Lancet retracted it in 2010 [[Lancet2010Retraction]] and the BMJ concluded it was fraudulent in 2011 [[Godlee2011]].`],
 [2,`Does acetaminophen (paracetamol) in pregnancy cause autism?`,`Not shown. In sibling comparisons the HR was 0.98 (0.93–1.04): the population association reflects familial confounding [[Ahlqvist2024]].`],
 [2,`What did infant-sibling MRI show before diagnosis?`,`Cortical surface-area hyperexpansion at 6–12 months came before brain-volume overgrowth at 12–24 months [[Hazlett2017]]. Group averages only: no scan diagnoses autism [[Lord2018]].`],
 [2,`Is eye contact absent from birth in infants later diagnosed?`,`No. Fixation on eyes is typical at 2 months and then declines [[Jones2013Eyes]].`],
 [2,`What is the excitation/inhibition (E/I) hypothesis?`,`Rubenstein and Merzenich (2003) proposed increased excitation relative to inhibition [[Rubenstein2003]]; mouse data suggest the shift may be compensatory [[Antoine2019]].`],
 /* ---- Part 3: signs & diagnosis ---- */
 [3,`How were the CDC milestones set in 2022?`,`At the age by which at least 75% of children reach each one. Missing a milestone means screen, not diagnose [[Zubler2022]].`],
 [3,`Which two language red flags are most consistent?`,`No single words by 16 months and no spontaneous two-word phrases by 24 months, more predictive alongside social differences [[Araujo2026]].`],
 [3,`When does the AAP recommend autism-specific screening?`,`At 18 and 24 months, alongside developmental surveillance at every visit [[Hyman2020]].`],
 [3,`What did the USPSTF say in 2016?`,`An "I statement": insufficient evidence on screening children aged 18–30 months with no concerns raised. It is not a recommendation against screening [[Siu2016]].`],
 [3,`What are the M-CHAT-R score bands?`,`0–2 low likelihood; 3–7 follow-up interview; 8 or more screen-positive without the interview [[Robins2014,Sturner2022]]. A teaching example here, never a self-test.`],
 [3,`What is the PPV of a positive M-CHAT-R/F?`,`47.5% for autism and 94.6% for any developmental concern: most screen-positive children need some support [[Robins2014]].`],
 [3,`How did the M-CHAT/F perform in universal real-world screening?`,`Sensitivity 38.8% and PPV 14.6% in 25,999 toddlers. A negative screen does not rule out autism [[Guthrie2019]].`],
 [3,`How common is regression (loss of skills)?`,`About one third: 32.1%, at a mean of 1.78 years [[Barger2013]].`],
 [3,`What is the DSM-5-TR rule for autism spectrum disorder?`,`All 3 social-communication criteria (A1–A3) plus at least 2 of 4 restricted or repetitive criteria (B1–B4), with criteria C–E [[APA2022,Fuentes2021ESCAP]].`],
 [3,`What do DSM-5 severity levels describe?`,`Support needed, rated separately for each domain: Level 1 "requiring support", Level 2 "requiring substantial support", Level 3 "requiring very substantial support" [[APA2022]].`],
 [3,`How does ICD-11 subdivide 6A02?`,`By intellectual development and functional language, giving 6A02.0 to 6A02.5, plus .Y and .Z [[Fuentes2021ESCAP]].`],
 [3,`What is social (pragmatic) communication disorder?`,`Social communication difficulties without restricted or repetitive behaviours, now or in the past [[Norbury2014]].`],
 [3,`ADOS and ADI-R: what are they?`,`The ADOS is a standardised observation [[Lord2000]]; the ADI-R is a caregiver interview [[Lord1994]]. Neither alone makes the diagnosis [[Fuentes2021ESCAP]].`],
 [3,`How accurate are the ADOS and ADI-R in preschool children?`,`Cochrane: ADOS sensitivity 0.94 and specificity 0.80; ADI-R sensitivity 0.52 and specificity 0.84 [[Randall2018]].`],
 [3,`Why can an AQ score mislead an adult?`,`In 476 referred adults the AQ did not predict diagnosis (specificity 0.29), 64% below the cut-off were autistic, and anxiety raised scores [[Ashwood2016]].`],
 [3,`What is the median age at diagnosis in ADDM 2022?`,`47 months, ranging from 36 months in California to 69.5 months in Laredo [[Shaw2025]].`],
 [3,`Which co-occurring conditions are most common?`,`Pooled: ADHD 28%, anxiety 20%, sleep-wake disorders 13%, depression 11%, OCD 9% [[Lai2019]].`],
 [3,`Does learning two languages cause extra delay?`,`No. Bilingual autistic children's language levels did not differ from monolingual peers [[Hambly2012]].`],
 /* ---- Part 4: supports & interventions ---- */
 [4,`What did Project AIM find when it kept only rigorous trials?`,`Restricting to RCTs with outcomes free of detection bias left no significant effects (2020), or only NDBI on diagnostic characteristics, g 0.30 (2023) [[Sandbank2020,Sandbank2023BMJ]].`],
 [4,`Do more intervention hours mean bigger effects?`,`No association between amount and effect size across 144 studies [[Sandbank2024JAMAPed]].`],
 [4,`What did Cochrane 2018 conclude about EIBI?`,`Only 5 studies, 1 of them an RCT (219 children); certainty low or very low [[Reichow2018Cochrane]].`],
 [4,`What did Lovaas 1987 claim, and what is its main weakness?`,`47% reached "normal functioning" at about 40 hours a week [[Lovaas1987]], but there was no random assignment [[Gresham1998]].`],
 [4,`What do autistic adults who had childhood ABA report?`,`Qualitative studies describe "hidden harms", traumatic memories and rejection of being made to behave like peers [[McGill2020,Anderson2023]]. Behaviour analysts are split between reform and rebuttal [[Mathur2024,Travers2025]].`],
 [4,`What are the limits of the Kupferstein 2018 PTSD survey?`,`Self-selected online sample, self-diagnosis allowed, a non-validated survey and a correlational design; it cannot show causation [[Kupferstein2018,Leaf2018AiA]].`],
 [4,`What is an NDBI?`,`A naturalistic developmental behavioural intervention: natural settings, shared control, natural contingencies; ESDM and JASPER are examples [[Schreibman2015]].`],
 [4,`What did PACT show?`,`No significant effect at 13 months (ES −0.24) [[Green2010]], but symptom reduction over about 6 years of follow-up (ES 0.55) [[Pickles2016]].`],
 [4,`Does AAC stop children learning to speak?`,`No. AAC interventions "do not impede speech production"; most studies report modest gains in speech [[Schlosser2008]].`],
 [4,`Who authors facilitated communication messages?`,`The facilitator: there is "unequivocal evidence for facilitator control" [[Schlosser2014FC]]. No evidence supports RPM either [[Schlosser2019RPM]].`],
 [4,`How well did CBT adapted for autism work for anxiety?`,`Response 92.4% vs 81.0% for standard CBT and 11.1% for treatment as usual, in children aged 7–13 [[Wood2020]].`],
 [4,`Is there a medicine for the core features of autism?`,`No. Medicines target co-occurring problems such as irritability, ADHD symptoms and insomnia [[Pandina2026,Hyman2020]].`],
 [4,`Which two drugs carry an FDA label for autism?`,`Risperidone and aripiprazole, both for "irritability associated with autistic disorder" [[FDA-Risperdal,FDA-Abilify]].`],
 [4,`What did the RUPP risperidone trial find?`,`Response 69% vs 12% on placebo over 8 weeks, with weight gain of 2.7 vs 0.8 kg [[McCracken2002]].`],
 [4,`What comes first for sleep problems?`,`Behavioural strategies [[WilliamsBuckley2020]]. Prolonged-release melatonin then added about 32 minutes of sleep vs placebo at 13 weeks [[Gringras2017]].`],
 [4,`Secretin: what does the evidence say?`,`16 RCTs and more than 900 children: no benefit; it "should not be recommended" [[Williams2012Secretin]].`],
 [4,`Why is chelation dangerous?`,`It has no trial evidence of benefit [[James2015]], and deaths from hypocalcaemia have followed edetate disodium [[Brown2006]].`],
 [4,`How large is the placebo response in autism drug trials?`,`About 1 in 5 (19%) on placebo are rated "much improved" [[Siafis2020]].`],
 /* ---- Part 5: living & lifespan ---- */
 [5,`What did RUBI parent training show?`,`Against parent education, ABC-Irritability fell 47.7% vs 31.8% and response was 68.5% vs 39.6% in children aged 3–7 [[Bearss2015]].`],
 [5,`How common are depression and anxiety in parents of autistic children?`,`About 31% meet criteria for a depressive disorder and 33% for an anxiety disorder [[Schnabel2020]].`],
 [5,`How common is bullying of autistic youth?`,`Pooled 44% [[Maiano2016]]; 46.3% in US national data [[Sterzing2012]].`],
 [5,`Visual schedules and Social Stories: how strong is the evidence?`,`Visual activity schedules meet criteria as an evidence-based practice [[Knight2015]]; Social Stories have "low to questionable" overall effect [[Kokina2010]].`],
 [5,`What is the "services cliff"?`,`The drop in services at school exit: 39.1% of US autistic young adults received no services after high school [[Shattuck2011Services]].`],
 [5,`What did Project SEARCH plus ASD Supports achieve?`,`90% vs 6% in competitive jobs 3 months after graduation [[Wehman2017]].`],
 [5,`How many autistic adults find it hard to visit a GP?`,`80%, against 37% of non-autistic adults [[Doherty2022]].`],
 [5,`Which pain scales help when a child cannot self-report?`,`NCCPC-R, where 7 or more suggests pain (sensitivity 84%) [[Breau2002]], and FLACC (Face, Legs, Activity, Cry, Consolability) [[Merkel1997]].`],
 [5,`How much higher is all-cause mortality in autism?`,`About 2.4 times: RR 2.37 in a 12-study meta-analysis [[CatalaLopez2022]]. A population statistic, not a forecast for one person.`],
 [5,`What is the leading injury cause of death by proportionate mortality?`,`Drowning (PMR 39.89) [[Guan2017AJPH]]; 49% of autistic children had tried to wander off after age 4 [[Anderson2012Elopement]].`],
 [5,`How common is epilepsy in autism?`,`Median 12.1% overall [[Lukmanji2019]]; about 21.5% with intellectual disability vs 8% without [[Amiet2008]].`],
 [5,`What is autistic burnout?`,`Chronic exhaustion, loss of skills and reduced tolerance to stimuli, from a cumulative load; acceptance and unmasking aided recovery [[Raymaker2020]].`],
 [5,`What predicts adult outcome most strongly?`,`Childhood IQ and early language [[Magiati2014]]. About 30% of autistic children remain minimally verbal [[TagerFlusberg2013]].`],
 /* ---- Part 6: history ---- */
 [6,`Who coined "autism", and when?`,`Eugen Bleuler, in 1911, for a symptom of schizophrenia [[Gundel1993]]; it was one of his "4 A's" [[Moskowitz2011]].`],
 [6,`Who described autistic children in 1926?`,`Grunya Sukhareva in Kyiv, almost two decades before Kanner and Asperger [[Manouilenko2015,Ssucharewa1996]].`],
 [6,`What did Kanner publish in 1943?`,`"Autistic disturbances of affective contact", describing 11 children [[Kanner1971,Harris2018Kanner]].`],
 [6,`What did Czech 2018 find about Hans Asperger?`,`He accommodated himself to the Nazi regime and on several occasions actively cooperated with the child "euthanasia" programme [[Czech2018]].`],
 [6,`What was the "refrigerator mother" theory?`,`Bettelheim's claim that cold mothering caused autism [[vanRosmalen2020]]. It is rejected: heritability is about 83% [[Sandin2017]].`],
 [6,`What did Wing and Gould show in 1979?`,`In the Camberwell study, children with Kanner's autism shared many features with other socially impaired children, laying the groundwork for the spectrum [[WingGould1979]].`],
 [6,`DSM-III, DSM-IV, DSM-5: what changed?`,`DSM-III (1980) first official category; DSM-IV (1994) added Asperger syndrome; DSM-5 (2013) merged the subtypes into autism spectrum disorder [[Rosen2021,BarahonaCorrea2015]].`],
 [6,`When did ICD-11 come into use?`,`Approved in May 2019; health reporting under it began on 1 January 2022 [[Reed2019ICD11]].`]
];
const RV_MN=[
 ["All 3, any 2 of 4","memory aid",`DSM-5-TR: all three social-communication criteria (A1 reciprocity, A2 nonverbal communication, A3 relationships) and at least two of four restricted or repetitive criteria (B1–B4) [[APA2022,Fuentes2021ESCAP]].`],
 ["0–2 · 3–7 · 8+","memory aid",`M-CHAT-R: 0–2 low likelihood, 3–7 follow-up interview, 8 or more screen-positive without the interview [[Robins2014,Sturner2022]]. A teaching tool for clinicians, never a self-test.`],
 ["12 · 16 · 24","memory aid",`Red flags: no "goodbye" gesture at 12 months, no single words by 16 months, no two-word phrases by 24 months [[Araujo2026]]. A missed milestone means screen, not diagnose [[Zubler2022]].`],
 ["FLACC","well known",`Face, Legs, Activity, Cry, Consolability: five behaviours scored for pain [[Merkel1997]]. In the revised r-FLACC, parents add the child's own pain behaviours [[Malviya2006]].`],
 ["One in five, four in five not","memory aid",`Younger siblings of an autistic child: about 20% are autistic (20.2%), so most are not [[Ozonoff2024]].`],
 ["Fragile at 200","memory aid",`More than 200 CGG repeats in FMR1 silence the gene in fragile X syndrome [[Hagerman2017]].`],
 ["Threshold × strategy","memory aid",`Dunn's 2 × 2: high threshold gives low registration (passive) or seeking (active); low threshold gives sensitivity (passive) or avoiding (active) [[Dunn2001]].`],
 ["Two drugs, one target","memory aid",`Risperidone and aripiprazole are the only FDA-labelled autism indications, both for irritability; no drug treats core features [[FDA-Risperdal,FDA-Abilify,Pandina2026]].`],
 ["Two axes, six codes","memory aid",`ICD-11 6A02.0–6A02.5: intellectual development (with or without) × functional language (mild or none, impaired, absent) [[Fuentes2021ESCAP]].`],
 ["Three to one, not four","memory aid",`The male-to-female ratio is about 3:1 in well-designed studies; 4:1 reflects missed girls [[Loomes2017]].`]
];
const RV_STEPS=[
 {from:0,at:.18,k:'A · all 3',t:'Domain A: all three',txt:`Criterion A needs persistent differences in social communication and social interaction across contexts, with all three present, currently or by history: A1 social-emotional reciprocity, A2 nonverbal communication, A3 developing, maintaining and understanding relationships [[APA2022,Fuentes2021ESCAP]]. DSM-5-TR clarified the wording to "all of the following"; the intended rule did not change [[APA2022]].`,pt:'All three social-communication areas must be affected, now or earlier in life.',hook:'A means all: 3 of 3 [[APA2022]].'},
 {from:.2,at:.4,k:'B · any 2 of 4',t:'Domain B: any two of four',txt:`Criterion B needs at least two of four restricted or repetitive patterns. In this teaching example B2 (insistence on sameness) and B4 (sensory reactivity) are present, so B1 and B3 are not needed [[APA2022,Fuentes2021ESCAP]]. DSM-5 moved sensory hyper- or hyporeactivity into criterion B [[APA2022,Lord2020NRDP]]; over 90% of autistic children report sensory differences [[Leekam2007]].`,pt:'Two of the four repetitive or sensory areas are enough, and which two differs from person to person.',hook:'B means any 2 of 4; B4 is sensory [[APA2022]].'},
 {from:.42,at:.59,k:'C · D · E',t:'Three more gates',txt:`C: present in the early developmental period, though it may not show fully until social demands exceed capacities, or may be masked by learned strategies. D: clinically significant impairment. E: not better explained by intellectual developmental disorder or global developmental delay [[APA2022,Fuentes2021ESCAP]]. If restricted, repetitive behaviours are absent now and in the past, social (pragmatic) communication disorder is considered instead [[Norbury2014]].`,pt:'The signs began in early childhood, even if they were noticed late or hidden by coping strategies.',hook:'No B criteria, ever? Think social (pragmatic) communication disorder [[Norbury2014]].'},
 {from:.61,at:.79,k:'Levels 1–3',t:'Support levels, per domain',txt:`Severity is rated separately for social communication and for restricted, repetitive behaviours: Level 1 "requiring support", Level 2 "requiring substantial support", Level 3 "requiring very substantial support" [[APA2022]]. Specifiers add intellectual or language impairment, a known genetic or medical condition, another neurodevelopmental or mental condition, and catatonia [[APA2022,Fuentes2021ESCAP]]. ESCAP notes that DSM-5 does not define how much support each level means [[Fuentes2021ESCAP]].`,pt:'Levels describe how much support someone needs, and the two areas can differ.',hook:'Levels are per domain, for example social communication 2 and repetitive behaviour 1 [[APA2022]].'},
 {from:.81,at:.97,k:'ICD-11 6A02',t:'ICD-11: two axes, six codes',txt:`ICD-11 code 6A02 has no severity levels. It subdivides autism by intellectual development and functional language, giving 6A02.0 to 6A02.5, plus 6A02.Y (other specified) and 6A02.Z (unspecified) [[Fuentes2021ESCAP,Chahboun2022]]. ICD-11 came into effect on 1 January 2022 [[Fuentes2021ESCAP]]. These criteria are for trained clinicians: a teaching tool here, not a self-test [[Hyman2020,Hirota2023]].`,pt:'Only a full assessment by trained professionals can say whether someone is autistic.',hook:'6A02: intellectual development × functional language = 6 codes [[Fuentes2021ESCAP]].'}
];
const RV_A=[['A1','Social-emotional reciprocity','back-and-forth, sharing interests'],['A2','Nonverbal communication','eye contact, gesture, facial expression'],['A3','Relationships: make, keep, understand','developing, maintaining, understanding']];
const RV_B=[['B1','Repetitive movements or speech','movements, use of objects or speech'],['B2','Insistence on sameness, routines','inflexible routines, ritualised behaviour'],['B3','Intense, highly focused interests','unusual in intensity or focus'],['B4','Sensory hyper- or hyporeactivity','or unusual sensory interests']];
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

  /* ---- mnemonic in motion: DSM-5-TR, all 3 A + any 2 of 4 B ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const tick=(x,y,c)=>`<path d="M${x-7} ${y} L${x-2} ${y+5} L${x+8} ${y-6}" style="fill:none;stroke:var(${c||'--good'});stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`;
  /* one criterion tile; st: 'on' (p = fill progress) or 'off' (shown absent, not needed) */
  function tile(x,y,w,it,st,p,col,N){
    let s=`<rect x="${x}" y="${y}" width="${w}" height="36" rx="8" style="fill:var(--field);stroke:var(--line);stroke-width:1.2"/>`;
    if(st==='on'&&p>0)s+=`<rect x="${x}" y="${y}" width="${f1(w*ease(p))}" height="36" rx="8" style="fill:var(${col}-soft);opacity:.95"/><rect x="${x}" y="${y}" width="${w}" height="36" rx="8" style="fill:none;stroke:var(${col});stroke-width:1.6;opacity:${f1(p)}"/>`;
    const on=st==='on'&&p>.5,off=st==='off'&&p>.5;
    s+=`<circle cx="${x+20}" cy="${y+18}" r="13" style="fill:var(${on?col:'--panel'});stroke:var(${on?col:'--line'});stroke-width:1.4"/><text class="t-xs t-mid" x="${x+20}" y="${y+21.5}" style="font-weight:700;fill:var(${on?'--on-brand':'--ink'})">${it[0]}</text>`;
    s+=`<text class="t-lbl" x="${x+40}" y="${y+15}" style="font-size:${N?13:12}px;${off?'fill:var(--muted)':''}">${it[1]}</text><text class="t-xs" x="${x+40}" y="${y+29}" style="font-size:${N?10.5:9.5}px">${off?'not present: not needed here':it[2]}</text>`;
    if(on)s+=tick(x+w-18,y+18);
    if(off)s+=`<line x1="${x+w-25}" y1="${y+18}" x2="${x+w-11}" y2="${y+18}" style="stroke:var(--muted);stroke-width:2.4;stroke-linecap:round"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 650');
    const L=N?{A:[10,30,380],B:[10,182,380],G:{x:10,y:390,w:380,h:30,dx:0,dy:36},P:[10,506,380,136]}
             :{A:[10,30,345],B:[365,30,345],G:{x:10,y:236,w:226,h:30,dx:237,dy:0},P:[10,278,700,96]};
    const aT=[ramp(t,.03,.08),ramp(t,.08,.13),ramp(t,.13,.18)];
    const bT=[ramp(t,.23,.26),ramp(t,.26,.31),ramp(t,.31,.34),ramp(t,.34,.39)],bOn=[0,1,0,1];
    const gT=[ramp(t,.44,.49),ramp(t,.49,.54),ramp(t,.54,.59)];
    const nA=aT.filter(v=>v>.5).length,nB=bT.filter((v,k)=>bOn[k]&&v>.5).length,nG=gT.filter(v=>v>.5).length;
    let s='';
    /* domain A */
    {const [x,y,w]=L.A;const done=nA===3;
      s+=`<text class="t-lbl" x="${x}" y="${y+4}" style="fill:var(--accent)">A · Social communication: all 3</text><text class="t-lbl t-end" x="${x+w}" y="${y+4}" style="fill:var(${done?'--good':'--muted'})">${nA} / 3${done?' ✓':''}</text>`;
      RV_A.forEach((it,k)=>{s+=tile(x,y+14+k*44,w,it,'on',aT[k],'--accent',N)});
      if(!N)s+=`<text class="t-xs" x="${x}" y="${y+158}">Each may be present now or by history (criterion A)</text>`}
    /* domain B */
    {const [x,y,w]=L.B;const done=nB>=2,b4=bump(t,.35,.6);
      s+=`<text class="t-lbl" x="${x}" y="${y+4}" style="fill:var(--neuro)">B · Restricted, repetitive: any 2 of 4</text><text class="t-lbl t-end" x="${x+w}" y="${y+4}" style="fill:var(${done?'--good':'--muted'})">${nB} / 2${done?' ✓':''}</text>`;
      RV_B.forEach((it,k)=>{s+=tile(x,y+14+k*44,w,it,bOn[k]?'on':'off',bT[k],'--neuro',N)});
      /* sensory waves pulse beside B4 while it is discussed */
      if(b4>0){const yy=y+14+4*44+3;s+=`<g style="opacity:${f1(b4)}">${wave(x+40,yy,w-150,3.5,{freq:9,phase:t*6,sw:1.6})}<text class="t-xs t-end" x="${x+w}" y="${yy+3}" style="fill:var(--sense)">sensory input</text></g>`}}
    /* gates C, D, E */
    {const G=L.G,lab=['C · Early developmental period','D · Significant impairment','E · Not explained by ID/GDD'];
      lab.forEach((l,k)=>{const x=G.x+k*G.dx,y=G.y+k*G.dy,p=gT[k],on=p>.5;
        s+=`<rect x="${x}" y="${y}" width="${G.w}" height="${G.h}" rx="15" style="fill:var(${on?'--good-soft':'--field'});stroke:var(${on?'--good':'--line'});stroke-width:1.4"/>`;
        s+=`<text class="t-lbl" x="${x+14}" y="${y+19.5}" style="font-size:${N?13:11}px;${on?'':'fill:var(--muted)'}">${l}</text>`;
        if(on)s+=tick(x+G.w-18,y+15)})}
    /* bottom panel: verdict, then levels, then ICD-11 */
    {const [x,y,w,h]=L.P;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(t<.605){const met=nA===3&&nB>=2&&nG===3;
        const v=met?'Criteria met: 3 of 3 A, 2 of 4 B, then C, D and E':nB<2?`Counting: A ${nA} of 3 · B ${nB} of 2 needed`:`Gates: ${nG} of 3 checked`;
        s+=`<text class="t-big" x="${x+14}" y="${y+28}" style="font-size:${N?14:16}px;fill:var(${met?'--good':'--ink'})">${v}</text>`;
        const lines=N?['A teaching example, not a person’s assessment.','Only a trained clinician, using history and','observation together, can make a diagnosis.']:['A teaching example, not a person’s assessment. Only a trained clinician, using history','and observation together, can make a diagnosis.'];
        lines.forEach((l,k)=>{s+=`<text class="t-sm" x="${x+14}" y="${y+52+k*16}">${l}</text>`})}
      else if(t<.805){const lv=[2*ramp(t,.63,.71),ramp(t,.7,.77)],nm=['Social communication','Restricted, repetitive'],mean=['requiring support','requiring substantial support','requiring very substantial support'];
        const bx=N?x+168:x+190,bw=N?66:72,ry=N?[y+16,y+52]:[y+14,y+52];
        nm.forEach((n,r)=>{const L1=Math.round(lv[r]);
          s+=`<text class="t-lbl" x="${x+12}" y="${ry[r]+18}" style="font-size:12px">${n}</text>`;
          for(let k=0;k<3;k++){const on=lv[r]>=k+.5;s+=`<rect x="${bx+k*(bw+4)}" y="${ry[r]}" width="${bw}" height="28" rx="6" style="fill:var(${on?(r?'--neuro':'--accent'):'--field'});stroke:var(--line);opacity:${on?.9:1}"/><text class="t-xs t-mid" x="${bx+k*(bw+4)+bw/2}" y="${ry[r]+18}" style="font-weight:700;fill:var(${on?'--on-brand':'--muted'})">Level ${k+1}</text>`}
          const mx=N?x+12:bx+3*(bw+4)+10,my=N?y+100+r*16:ry[r]+18;
          if(L1>0)s+=`<text class="t-sm" x="${mx}" y="${my}">${N?(r?'Repetitive: ':'Social: '):''}L${L1} = ${mean[L1-1]}</text>`})}
      else{const cols=N?['mild/none','impaired','absent']:['language mild or none','impaired language','no functional language'],rows=N?['No ID','With ID']:['No intellectual disorder','With intellectual disorder'];
        const cx=N?x+92:x+190,cw=N?94:164,hdr=N?['ICD-11 6A02: intellectual development','× functional language (+ .Y, .Z)']:['ICD-11 6A02: intellectual development × functional language (plus 6A02.Y and 6A02.Z)'];
        hdr.forEach((l,k)=>{s+=`<text class="t-lbl" x="${x+12}" y="${y+16+k*15}" style="font-size:12px">${l}</text>`});
        const hy=y+16+hdr.length*15+(N?4:0);
        cols.forEach((c,k)=>{s+=`<text class="t-xs t-mid" x="${cx+k*(cw+4)+cw/2}" y="${hy}">${c}</text>`});
        rows.forEach((r,ri)=>{const yy=hy+6+ri*28;s+=`<text class="t-xs" x="${x+12}" y="${yy+15}" style="fill:var(--ink)">${r}</text>`;
          for(let k=0;k<3;k++){const code=k*2+ri,p=ramp(t,.83+code*.02,.86+code*.02);
            s+=`<rect x="${cx+k*(cw+4)}" y="${yy}" width="${cw}" height="22" rx="5" style="fill:var(--field);stroke:var(--line)"/><rect x="${cx+k*(cw+4)}" y="${yy}" width="${cw}" height="22" rx="5" style="fill:var(--accent);opacity:${f1(p*.85)}"/><text class="t-xs t-mid" x="${cx+k*(cw+4)+cw/2}" y="${yy+15}" style="font-weight:700;fill:var(${p>.5?'--on-brand':'--muted'})">6A02.${code}</text>`}});
        if(N)s+=`<text class="t-xs" x="${x+12}" y="${y+h-8}">No severity levels; in use from 1 Jan 2022</text>`}}
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
 [1,`In the Global Burden of Disease Study 2021, about how many people worldwide were autistic?`,`1 in 31|1 in 127|1 in 500|1 in 2,000`,1,`About 1 in 127, or 61.8 million people [[Santomauro2025]]. 1 in 31 is the ADDM 2022 figure for US 8-year-olds [[Shaw2025]].`],
 [1,`ADDM 2022 prevalence among US 8-year-olds was:`,`6.7 per 1,000|14.7 per 1,000|23.0 per 1,000|32.2 per 1,000`,3,`32.2 per 1,000 (1 in 31) across 16 sites [[Shaw2025]]; 6.7 was the 2000 figure [[ADDM2007SY2000]].`],
 [1,`In high-quality prevalence studies, the male-to-female ratio is closest to:`,`3:1|1:1|7:1|10:1`,0,`3.32 in high-quality studies; studies of existing diagnoses give 4.56 because girls are missed [[Loomes2017]].`],
 [1,`In the Danish register study, what share of the rise in recorded autism was explained by reporting changes?`,`5%|25%|60%|100%`,2,`60%, from the 1994 criteria change and the 1995 inclusion of outpatients [[Hansen2015Reporting]].`],
 [1,`Which statement best fits the surveys on "autistic person" versus "person with autism"?`,`Professionals overwhelmingly prefer identity-first terms|Both terms are rejected by most autistic adults|All autistic adults prefer person-first terms|There is no consensus, so personal preference should be respected`,3,`Many autistic adults prefer identity-first terms and professionals more often use person-first ones, but a 19-study review found no consensus [[Taboas2023,Schuck2025]].`],
 [1,`The "double empathy problem" was described in 2012 by:`,`Damian Milton|Lorna Wing|Bernard Rimland|Leo Kanner`,0,`Milton, an autistic sociologist, framed social difficulty as a two-way mismatch [[Milton2012]].`],
 [1,`In Crompton 2020's diffusion chains, which chains passed on the fewest story details?`,`Autistic chains|Non-autistic chains|All chains were identical|Mixed autistic and non-autistic chains`,3,`Mixed chains recalled 8.92 of 30 details vs 12.96 and 12.40 [[Crompton2020]]. A larger 2025 replication found no difference in transfer [[Crompton2025]].`],
 [1,`The CAT-Q is best described as:`,`A 10-item toddler screen|A diagnostic interview for adults|A sensory profile|A 25-item research measure of camouflaging`,3,`25 items in three factors; a research measure, not a diagnostic test [[Hull2019CATQ]].`],
 [1,`The Lancet Commission's term "profound autism" describes autistic people who:`,`Have an IQ above 100|Were diagnosed after age 18|Have no co-occurring conditions|Need 24-hour access to an adult to stay safe`,3,`It was proposed as an administrative term [[Lord2022Lancet]]; 26.7% of autistic 8-year-olds met a working definition in ADDM data [[Hughes2023]].`],
 [1,`In DSM-5, sensory hyper- or hyporeactivity appears as:`,`Criterion A2|Criterion B4|Criterion C|A specifier only`,1,`DSM-5 moved sensory reactivity into criterion B [[APA2022,Lord2020NRDP]].`],
 [1,`Current hyperacusis (decreased sound tolerance) in autistic people is about:`,`5%|15%|41%|90%`,2,`About 41% currently and 61% over a lifetime [[Williams2021Hyperacusis]].`],
 [1,`Dunn's sensory model crosses neurological threshold with:`,`Self-regulation strategy|IQ|Age|Language level`,0,`Giving low registration, seeking, sensitivity and avoiding [[Dunn2001]].`],
 [1,`In Alvares 2020, how well did IQ predict adaptive behaviour?`,`Perfectly|Weakly|Better than any other measure|It was not measured`,1,`IQ was "a weak predictor" of Vineland adaptive scores, so IQ-based "high functioning" labels can hide real needs [[Alvares2020]].`],
 [1,`About what share of autistic people have alexithymia?`,`5%|20%|35%|50%`,3,`49.93%, against 4.89% of controls [[Kinnaird2019]].`],
 /* ---- Part 2 ---- */
 [2,`Twin and family studies put the heritability of autism at about:`,`20%|50%|80%|100%`,2,`About 80%: five-country median 80.8% and a Swedish estimate of 0.83 [[Bai2019,Sandin2017]].`],
 [2,`In prospective infant-sibling cohorts, recurrence in younger siblings is about:`,`1 in 100|1 in 5|1 in 2|9 in 10`,1,`18.7% in 2011 and 20.2% in 2024 [[Ozonoff2011,Ozonoff2024]].`],
 [2,`De novo mutations explain what share of population variance in autism liability?`,`2.6%|26%|52%|80%`,0,`2.6%: common variants carry most of the heritable liability [[Gaugler2014]].`],
 [2,`The 16p11.2 deletion and duplication together account for about:`,`25% of autism|50% of autism|10% of autism|1% of autism`,3,`About 1% [[Weiss2008NEJM]].`],
 [2,`Fragile X syndrome is caused by:`,`An MECP2 deletion|More than 200 CGG repeats in FMR1|Loss of TSC2|A PTEN variant`,1,`The repeats silence FMR1 and its protein FMRP is lost [[Hagerman2017]].`],
 [2,`Rett syndrome is caused by variants in:`,`FMR1|PTEN|MECP2|UBE3A`,2,`MECP2, X-linked [[Amir1999]]. UBE3A loss causes Angelman syndrome [[Hipp2025]].`],
 [2,`The diagnostic yield of chromosomal microarray in unexplained DD, ID or autism is about:`,`3%|15–20%|50%|90%`,1,`15–20%, against about 3% for a karyotype [[Miller2010CMA]].`],
 [2,`After prenatal valproate, the absolute autism risk was:`,`44%|20%|4.42%|0.1%`,2,`4.42% vs 1.53% in all children (adjusted HR 2.9) [[Christensen2013]].`],
 [2,`In 657,461 Danish children, the adjusted hazard ratio for autism after MMR was:`,`0.93 (0.85–1.02)|1.93|3.2|7.5`,0,`No increased risk [[Hviid2019]].`],
 [2,`The 1998 Wakefield paper linking MMR and regression was:`,`Replicated in 2010|Never published|Confirmed by the Danish cohort|Retracted in 2010 and judged fraudulent in 2011`,3,`Retracted by The Lancet [[Lancet2010Retraction]] and judged fraudulent by the BMJ [[Godlee2011]].`],
 [2,`In sibling-control analysis, prenatal acetaminophen (paracetamol) had an autism HR of:`,`2.5|1.5|0.98|0.5`,2,`0.98 (0.93–1.04): familial confounding explains the population association [[Ahlqvist2024]].`],
 [2,`Autism prevalence after extremely preterm birth (22–27 weeks) was:`,`61%|30%|1.4%|6.1%`,3,`6.1%, against 1.4% at term; most children born preterm are not autistic [[Crump2021Preterm]].`],
 [2,`In infant-sibling MRI, which change came first?`,`Brain-volume overgrowth at birth|No change before 36 months|Cerebellar shrinkage at 3 years|Cortical surface-area hyperexpansion at 6–12 months`,3,`Surface-area hyperexpansion at 6–12 months preceded volume overgrowth at 12–24 months [[Hazlett2017]].`],
 [2,`Early head-circumference "overgrowth" in autism is now thought to be:`,`Largely an artefact of biased population norms|Present in every autistic child|A diagnostic test|Caused by vaccines`,0,`Biased norms explained much of it [[Raznahan2013]].`],
 [2,`Gut microbiome differences in autistic children largely track:`,`Vaccination status|Diagnosis itself|Diet diversity|IQ`,2,`They track dietary preferences, not diagnosis [[Yap2021]].`],
 [2,`In humans, maternal infection in pregnancy is associated with autism with an odds ratio of about:`,`5.0|1.13|0.5|20`,1,`A modest OR of 1.13; most children whose mothers had an infection are not autistic [[Jiang2016Infection]].`],
 [2,`Postmortem autistic cortex shows:`,`Fewer dendritic spines|Absent synapses|No neurons in layer 4|More dendritic spines and reduced pruning`,3,`Linked to overactive mTOR signalling [[Tang2014]].`],
 /* ---- Part 3 ---- */
 [3,`The CDC's 2022 milestones are set at the age by which this share of children reach them:`,`50%|75%|90%|99%`,1,`At least 75%, to discourage "wait and see"; missing one means screen, not diagnose [[Zubler2022]].`],
 [3,`Which pair are among the most consistent language red flags?`,`No single words by 16 months; no two-word phrases by 24 months|No sentences by 12 months|No reading by 3 years|No babbling by 2 months`,0,`More predictive when combined with social differences [[Araujo2026]].`],
 [3,`The AAP recommends autism-specific screening at:`,`9 and 12 months|18 and 24 months|3 and 5 years|Only when parents are worried`,1,`At 18 and 24 months, with surveillance at every visit [[Hyman2020]].`],
 [3,`The USPSTF 2016 statement on screening children aged 18–30 months with no concerns was:`,`A recommendation against screening|Grade A|An I statement (insufficient evidence)|Grade B`,2,`Insufficient evidence on the balance of benefits and harms; not a recommendation against [[Siu2016]].`],
 [3,`A toddler's M-CHAT-R total is 5. The published algorithm says:`,`Low likelihood, no action|This is a diagnosis of autism|Refer without the interview|Do the follow-up interview`,3,`3–7 means the follow-up interview; 8 or more refers directly [[Robins2014,Sturner2022]].`],
 [3,`After a positive M-CHAT-R/F, what share had any developmental delay or concern?`,`14.6%|47.5%|94.6%|38.8%`,2,`94.6%; 47.5% had autism [[Robins2014]].`],
 [3,`In universal real-world screening at CHOP, M-CHAT/F sensitivity was:`,`38.8%|83%|94%|100%`,0,`With a PPV of 14.6%: a negative screen does not rule out autism [[Guthrie2019]].`],
 [3,`Regression (loss of skills) is reported in about:`,`3% of autistic children|One third (32.1%)|Three quarters|All autistic children`,1,`32.1%, at a mean onset of 1.78 years [[Barger2013]].`],
 [3,`DSM-5-TR autism spectrum disorder requires:`,`2 of 3 A and 1 of 4 B|Any 3 of 7 criteria|All 7 criteria|All 3 A and at least 2 of 4 B`,3,`Plus criteria C–E [[APA2022,Fuentes2021ESCAP]].`],
 [3,`Social (pragmatic) communication disorder is distinguished from autism by:`,`The absence of restricted, repetitive behaviours, now and in the past|Normal hearing|Onset after 18|A positive genetic test`,0,`If RRBs were ever present, autism must be considered first [[Norbury2014,APA2022]].`],
 [3,`ICD-11 subdivides 6A02 by:`,`Severity levels 1–3|Intellectual development and functional language|Age at onset|Sex`,1,`Giving 6A02.0 to 6A02.5 [[Fuentes2021ESCAP]].`],
 [3,`In the Cochrane review, ADOS sensitivity and specificity in preschool children were:`,`0.52 and 0.84|0.38 and 0.15|0.94 and 0.80|1.00 and 1.00`,2,`0.52 and 0.84 belong to the ADI-R [[Randall2018]].`],
 [3,`The ADI-R is:`,`A semistructured caregiver interview|A play-based observation|A blood test|A self-report questionnaire`,0,`Suitable from a mental age of about 18 months [[Lord1994]]; the ADOS is the observation [[Lord2000]].`],
 [3,`Median age at earliest known diagnosis in ADDM 2022 was:`,`18 months|24 months|47 months|8 years`,2,`47 months [[Shaw2025]].`],
 [3,`In adults referred to a UK diagnostic service, the AQ:`,`Perfectly separated autistic from non-autistic adults|Was replaced by a blood test|Could be used for self-diagnosis|Did not significantly predict diagnosis, and anxiety raised scores`,3,`Specificity 0.29; 64% below the cut-off were autistic [[Ashwood2016]].`],
 [3,`For toddlers first evaluated at 12–36 months, overall diagnostic stability of autism was:`,`0.25|0.50|0.84|1.00`,2,`0.84, higher than any other diagnostic group [[Pierce2019]].`],
 [3,`Bilingual exposure in autistic children:`,`Did not cause additional language delay|Doubled language delay|Causes autism|Must be stopped`,0,`Language levels did not differ from monolingual peers [[Hambly2012]].`],
 [3,`The most common co-occurring condition in Lai 2019's pooled estimates is:`,`Depression|ADHD|Bipolar disorder|Schizophrenia`,1,`ADHD 28%, then anxiety 20% [[Lai2019]].`],
 /* ---- Part 4 ---- */
 [4,`How many medicines are approved for the core features of autism?`,`None|One|Two|Five`,0,`None; medicines target co-occurring problems [[Pandina2026,Hyman2020]].`],
 [4,`Risperidone and aripiprazole carry FDA autism labels for:`,`Social communication|Repetitive behaviour|Irritability associated with autistic disorder|Sleep`,2,`Both for irritability [[FDA-Risperdal,FDA-Abilify]].`],
 [4,`In the RUPP risperidone trial, response was:`,`12% vs 69% on placebo|50% vs 50%|69% vs 12% on placebo|100% vs 0%`,2,`With weight gain of 2.7 vs 0.8 kg over 8 weeks [[McCracken2002]].`],
 [4,`The most common side effect of risperidone in the paediatric autism trials on the label is:`,`Sedation|Hair loss|Hypertension|Cough`,0,`Sedation 63% vs 15%, then increased appetite 44% vs 15% [[FDA-Risperdal]].`],
 [4,`After 6 months on risperidone, switching to placebo led to relapse in:`,`5%|12.5%|33%|62.5%`,3,`62.5% vs 12.5% on continued risperidone [[RUPP2005Risperidone]].`],
 [4,`Methylphenidate for hyperactivity in autistic children:`,`Works better than in non-autistic ADHD|Has no effect|Helps, but response (49%) is lower and side effects more frequent|Is banned`,2,`[[RUPP2005Methylphenidate]]`],
 [4,`Citalopram for repetitive behaviour in children:`,`Did not beat placebo and caused more activation side effects|Doubled response|Is FDA-labelled for autism|Was never tested`,0,`Response 32.9% vs 34.2% [[King2009F]].`],
 [4,`Prolonged-release melatonin, after behavioural strategies, added about this much sleep:`,`2 minutes|32 minutes|3 hours|6 hours`,1,`About 32 minutes vs placebo at 13 weeks [[Gringras2017]].`],
 [4,`Secretin for autism:`,`Is first-line|Helped in 16 RCTs|Was never trialled|Showed no benefit in 16 RCTs with more than 900 children`,3,`It "should not be recommended" [[Williams2012Secretin]].`],
 [4,`Deaths during chelation have been caused by:`,`Hypercalcaemia|Hyponatraemia|Hyperkalaemia|Hypocalcaemia with edetate disodium`,3,`Three deaths reported to CDC, two children [[Brown2006]]; no trial evidence of benefit [[James2015]].`],
 [4,`In autism drug trials, the share of placebo participants rated "much improved" is about:`,`1%|19%|50%|80%`,1,`About 1 in 5 [[Siafis2020]].`],
 [4,`Project AIM, restricting to RCTs with outcomes free of detection bias, found:`,`Large effects for every approach|That more hours always help|That every approach works equally well|No significant effects, or only NDBI on diagnostic characteristics`,3,`[[Sandbank2020,Sandbank2023BMJ]]`],
 [4,`Across 144 early-intervention studies, intervention amount (hours):`,`Was not associated with effect size|Strongly predicted effect size|Was always 40 hours|Predicted harm`,0,`[[Sandbank2024JAMAPed]]`],
 [4,`The main design weakness of Lovaas 1987 was:`,`Too many participants|No random assignment|Using a placebo pill|Testing adults`,1,`[[Gresham1998]]`],
 [4,`Which is a recognised limitation of Kupferstein 2018?`,`It was a large RCT|It confirmed every diagnosis|It allowed self-diagnosis and used a non-validated survey|It measured outcomes blind`,2,`It cannot show that ABA causes PTSD [[Kupferstein2018,Leaf2018AiA]].`],
 [4,`PACT's effect on symptom severity over about 6 years of follow-up was:`,`ES 0.55|ES 0|ES −1.2|ES 3.0`,0,`Despite no significant effect at 13 months [[Green2010,Pickles2016]].`],
 [4,`In the iBASIS-VIPP trial, the share meeting autism criteria at age 3 was:`,`20.5% vs 6.7%|50% vs 50%|0% vs 100%|6.7% vs 20.5% with usual care`,3,`OR 0.18, NNT 7.2; preregistered one-tailed tests [[Whitehouse2021]].`],
 [4,`AAC (augmentative and alternative communication):`,`Stops children learning to speak|Does not impede speech, and modest gains are common|Is only for adults|Has been banned`,1,`[[Schlosser2008]]`],
 [4,`Facilitated communication messages are authored by:`,`The person typing, always|The facilitator|A computer|Nobody knows`,1,`"Unequivocal evidence for facilitator control" [[Schlosser2014FC]].`],
 [4,`In children with autism and anxiety, adapted CBT (BIACA) response was:`,`11.1%|50%|81.0%|92.4%`,3,`Against 81.0% for standard CBT and 11.1% for treatment as usual [[Wood2020]].`],
 [4,`The SenITA trial of sensory integration therapy found:`,`No significant effect on its primary outcome and no cost-effectiveness|A large effect|Harm|That it removes sensory differences`,0,`Carers still reported improved daily functioning [[Randell2022]].`],
 [4,`The 2026 US leucovorin label indication is:`,`Autism in all children|Irritability|FOLR1 cerebral folate transport deficiency|Sleep problems`,2,`Not autism [[FDA-Wellcovorin]].`],
 [4,`The phase 3 SIGN trials of bumetanide were:`,`Stopped early for lack of efficacy|Positive|Not started|Cut short for benefit`,0,`[[Fuentes2023]]`],
 /* ---- Part 5 ---- */
 [5,`Against parent education, RUBI parent training in children aged 3–7 gave a clinician-rated response of:`,`39.6%|68.5%|10%|100%`,1,`68.5% vs 39.6% [[Bearss2015]].`],
 [5,`About what share of parents of autistic children meet criteria for a depressive disorder?`,`5%|31%|60%|90%`,1,`About 31%, and 33% for an anxiety disorder [[Schnabel2020]].`],
 [5,`Pooled bullying victimisation in autistic youth is about:`,`4%|14%|44%|94%`,2,`44% [[Maiano2016]].`],
 [5,`In a UK survey, the commonest reason for persistent absence in autistic students was:`,`Illness|School refusal|Holidays|Exclusion`,1,`43% had persistent absence [[Totsika2020]].`],
 [5,`The US "services cliff": after high school, the share of autistic young adults receiving no services was:`,`9%|20%|39.1%|90%`,2,`[[Shattuck2011Services]]`],
 [5,`Project SEARCH plus ASD Supports: employment 3 months after graduation was:`,`6% vs 90%|50% vs 50%|20% vs 15%|90% vs 6%`,3,`[[Wehman2017]]`],
 [5,`In an international survey, difficulty visiting a GP was reported by:`,`80% of autistic vs 37% of non-autistic adults|10% vs 10%|37% vs 80%|100% vs 0%`,0,`[[Doherty2022]]`],
 [5,`On the NCCPC-R, a score suggesting pain is:`,`1 or more|3 or more|7 or more|20 or more`,2,`Sensitivity 84% [[Breau2002]].`],
 [5,`In FLACC, the "C"s stand for:`,`Cry and Consolability|Colour and Cough|Calm and Comfort|Crying and Cooling`,0,`Face, Legs, Activity, Cry, Consolability [[Merkel1997]].`],
 [5,`In one paediatric emergency department, restraint was used in:`,`6.0% of autistic vs 14.1% of non-autistic children|Equal shares|0% of autistic children|14.1% of autistic vs 6.0% of non-autistic children`,3,`[[McGaughey2026]]`],
 [5,`A 12-study meta-analysis put all-cause mortality in autism, relative to others, at about:`,`RR 1.0|RR 2.37|RR 10|RR 50`,1,`A population statistic, not a forecast for one person [[CatalaLopez2022]].`],
 [5,`Among leading injury causes of death in autism, the highest proportionate mortality ratio was for:`,`Falls|Poisoning|Drowning|Burns`,2,`PMR 39.89 [[Guan2017AJPH]].`],
 [5,`Epilepsy in autistic people with intellectual disability is about:`,`1%|8%|21.5%|80%`,2,`Against 8% without [[Amiet2008]].`],
 [5,`Catatonia affects about this share of autistic people:`,`1 in 10|1 in 2|1 in 1,000|None`,0,`10.4%, usually emerging in adolescence or early adulthood [[VaquerizoSerrano2021,Wing2000]].`],
 [5,`In Denmark, the share of autistic people who died by suicide who had another psychiatric diagnosis was:`,`About 10%|About 50%|About 25%|More than 90%`,3,`90.6% [[Kolves2021]].`],
 [5,`Which describes autistic burnout in Raymaker 2020?`,`A sudden onset of autism in adulthood|Chronic exhaustion, loss of skills and reduced tolerance to stimuli|The same as occupational burnout|A type of epilepsy`,1,`It appeared distinct from occupational burnout and depression [[Raymaker2020]].`],
 [5,`A sensory-adapted dental environment in autistic children:`,`Lowered physiological stress and behavioural distress|Raised stress|Had no measurable effect|Required general anaesthesia`,0,`[[SteinDuker2023]]`],
 /* ---- Part 6 ---- */
 [6,`Who coined "autism" in 1911?`,`Leo Kanner|Hans Asperger|Eugen Bleuler|Lorna Wing`,2,`For a symptom of schizophrenia [[Gundel1993]].`],
 [6,`Who described autistic children in 1926, before Kanner and Asperger?`,`Grunya Sukhareva|Bruno Bettelheim|Michael Rutter|Judith Gould`,0,`In Kyiv [[Manouilenko2015,Ssucharewa1996]].`],
 [6,`Kanner's 1943 paper was based on:`,`1 child|11 children|100 children|1,000 children`,1,`[[Kanner1971]]`],
 [6,`Autism first entered the DSM as an official category in:`,`DSM-I (1952)|DSM-II (1968)|DSM-IV (1994)|DSM-III (1980)`,3,`[[Rosen2021]]`],
 [6,`DSM-5 (2013) changed autism diagnosis by:`,`Adding Asperger syndrome|Merging the subtypes into autism spectrum disorder|Removing autism|Adding severity in IQ points`,1,`[[BarahonaCorrea2015,APA2013]]`],
 [6,`The 1979 Camberwell study that laid the groundwork for the spectrum was by:`,`Wing and Gould|Lovaas and Simmons|Kanner and Eisenberg|Bleuler and Jung`,0,`[[WingGould1979]]`],
 [6,`The "refrigerator mother" theory, promoted by Bettelheim, held that autism was caused by:`,`Vaccines|Genes|Cold mothering|Diet`,2,`Now rejected [[vanRosmalen2020,Sandin2017]].`],
 [6,`Czech 2018 concluded that Asperger:`,`Opposed the Nazi regime throughout|Never saw patients|Actively cooperated with the child "euthanasia" programme on several occasions|Coined the word autism`,2,`[[Czech2018]]`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  const Q4=QZ_Q.map(q=>[q[0],q[1],q[2].split('|'),q[3],q[4]]);
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=Q4.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
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
 ["16p11.2 deletion and duplication",`Copy-number changes on chromosome 16 that together account for about 1% of autism [[Weiss2008NEJM]].`,"genes"],
 ["22q11.2 deletion syndrome",`A deletion syndrome in which about 11% of people show autism features [[Richards2015]].`,"genes"],
 ["AAC (augmentative and alternative communication)",`Pictures, symbol systems or speech-generating devices that add to or replace speech; they do not impede speech [[Schlosser2008,Ganz2012]].`,"therapies"],
 ["ABA (applied behaviour analysis)",`Behavioural approaches built on learning principles; early intensive forms (EIBI) run 20–40 hours a week. Evidence and ethics are debated [[Reichow2018Cochrane,Kirkham2017]].`,"aba"],
 ["Ableist language",`Language that "assumes disabled people are inferior to nondisabled people" [[BottemaBeutel2021Ableist]].`,"words"],
 ["ABC-Irritability",`The Aberrant Behavior Checklist irritability subscale, the main outcome in risperidone and aripiprazole trials [[McCracken2002,Owen2009]].`,"meds"],
 ["ADDM Network",`CDC's Autism and Developmental Disabilities Monitoring Network, reviewing records of 8-year-olds at selected US sites; not nationally representative [[Baio2018]].`,"what"],
 ["ADHD",`Attention deficit hyperactivity disorder, the most common co-occurring condition (pooled 28%) [[Lai2019]].`,"cooccur"],
 ["ADI-R",`Autism Diagnostic Interview–Revised, a semistructured caregiver interview [[Lord1994]].`,"assessment"],
 ["ADOS",`Autism Diagnostic Observation Schedule: a standardised observation in four modules chosen by language level [[Lord2000]]; a Toddler Module covers under 30 months [[Luyster2009]].`,"assessment"],
 ["ADOS calibrated severity score",`A score that standardises ADOS totals across modules and ages, so severity can be compared over time [[Gotham2009]].`,"assessment"],
 ["Adverse events reporting",`Only 11 of 150 early-intervention reports mentioned adverse events [[BottemaBeutel2021AE]].`,"supports"],
 ["Alexithymia",`Difficulty identifying and describing one's own emotions; about half of autistic people (49.93%) vs 4.89% of controls [[Kinnaird2019]].`,"senses"],
 ["Angelman syndrome",`A single-gene condition (loss of maternal UBE3A) in which many children meet autism criteria; antisense oligonucleotide trials are under way [[Hipp2025]].`,"frontier"],
 ["Antisense oligonucleotide (ASO)",`A short synthetic strand that alters gene expression; in Angelman syndrome it aims to switch on the silent paternal UBE3A [[Hipp2025]].`,"frontier"],
 ["Aripiprazole",`An antipsychotic FDA-labelled for irritability associated with autistic disorder, ages 6–17 [[FDA-Abilify]].`,"meds"],
 ["ARFID",`Avoidant/restrictive food intake disorder; 11.41% of autistic groups in a meta-analysis, with a very wide interval [[Sader2025]].`,"cooccur"],
 ["Asperger syndrome",`A category introduced to English readers by Wing in 1981 [[Wing1981]], added to DSM-IV in 1994 and merged into autism spectrum disorder in DSM-5 [[BarahonaCorrea2015]].`,"history"],
 ["AQ (Autism-Spectrum Quotient)",`A 50-item self-report trait scale [[BaronCohen2001]]. In referred adults it did not predict diagnosis [[Ashwood2016]]; not for self-diagnosis.`,"screening"],
 ["AQ-10",`A 10-item short form; case-control accuracy at a cut-point of 6 overstates real-clinic accuracy [[Allison2012,Ashwood2016]].`,"screening"],
 ["Autism alert card",`A card explaining a person's autism to others; about half of 272 users used it, mostly on transport and in healthcare [[Edwards2025AlertCard]].`,"nursing"],
 ["Autism spectrum disorder",`The single DSM-5 diagnosis that replaced autistic disorder, Asperger's disorder and PDD-NOS in 2013 [[BarahonaCorrea2015,APA2013]].`,"criteria"],
 ["Autistic burnout",`Chronic exhaustion, loss of skills and reduced tolerance to stimuli from cumulative load [[Raymaker2020]].`,"adult"],
 ["Balovaptan",`A vasopressin V1a antagonist; negative phase 3 trials in adults and children [[Jacob2022,Hollander2022]].`,"frontier"],
 ["Bumetanide",`An NKCC1 chloride-importer blocker; phase 3 SIGN trials stopped for lack of efficacy [[Fuentes2023]].`,"frontier"],
 ["Bullying",`Pooled victimisation of 44% in autistic youth [[Maiano2016]].`,"school"],
 ["Camouflaging (masking)",`Masking and compensating for autistic traits to fit in; exhausting and linked to poorer mental health [[Hull2017,Cook2021Camouflaging]].`,"words"],
 ["Canvas Dx",`An FDA-authorised AI diagnosis aid for clinicians; it gave a determinate result in 31.8% of children tested [[Megerian2022,FDA-DEN200069]].`,"frontier"],
 ["CARS",`Childhood Autism Rating Scale; Cochrane sensitivity 0.80 and specificity 0.88 [[Randall2018]].`,"assessment"],
 ["CAT-Q",`Camouflaging Autistic Traits Questionnaire: 25 items, three factors; a research measure [[Hull2019CATQ]].`,"words"],
 ["Catatonia",`A movement and behaviour syndrome affecting about 10.4% of autistic people, usually from adolescence [[VaquerizoSerrano2021]].`,"health"],
 ["Cerebral folate deficiency",`Low folate in the brain; a 2021 meta-analysis estimated 38% prevalence in autism (Early evidence) [[Rossignol2021]].`,"frontier"],
 ["Chelation",`Drugs that bind metals; no trial evidence of benefit in autism and deaths from hypocalcaemia [[James2015,Brown2006]].`,"unproven"],
 ["Chromosomal microarray (CMA)",`A first-tier test for copy-number changes; yield 15–20% in unexplained DD, ID or autism [[Miller2010CMA]].`,"genes"],
 ["Co-occurring",`Suggested in place of "comorbid": conditions that occur alongside autism [[BottemaBeutel2021Ableist]]. More than 70% have at least one [[Lai2014]].`,"cooccur"],
 ["Complementary and alternative medicine (CAM)",`Non-mainstream treatments; used by a median 54% of autistic people across studies [[Hofer2017]].`,"unproven"],
 ["Conflict of interest",`About 70% of early-intervention reports had one, but only about 6% fully disclosed it [[BottemaBeutel2021COI]].`,"supports"],
 ["Copy-number variant (CNV)",`A deleted or duplicated stretch of DNA; six de novo CNV loci were confirmed in the Simons Simplex Collection [[Sanders2015Neuron]].`,"genes"],
 ["Cord blood infusion",`An unproven treatment; a 180-child RCT found no benefit on socialisation [[Dawson2020]].`,"unproven"],
 ["Criterion A (DSM-5-TR)",`Social communication and interaction: all three of A1–A3 required [[APA2022]].`,"criteria"],
 ["Criterion B (DSM-5-TR)",`Restricted, repetitive patterns: at least two of B1–B4 required [[APA2022]].`,"criteria"],
 ["DALY",`Disability-adjusted life-year, a measure of health loss; it does not judge the worth of autistic lives [[Santomauro2025]].`,"what"],
 ["De novo mutation",`A new variant not inherited from either parent; explains 2.6% of population variance [[Gaugler2014]].`,"genes"],
 ["Dementia in autistic adults",`More frequent than in the general population in US claims data (aHR 1.96 for autism only) [[Vivanti2021]].`,"adult"],
 ["Developmental surveillance",`Ongoing monitoring of development at every health visit, with screening at set ages [[Lipkin2020]].`,"milestones"],
 ["Diagnostic overshadowing",`A new symptom being put down to autism itself and not assessed (Hypothesis) [[Nicolaidis2013]].`,"cooccur"],
 ["Double empathy problem",`Milton's account of social difficulty as a two-way mismatch [[Milton2012]].`,"words"],
 ["DSM-5-TR",`The 2022 text revision of DSM-5 [[APA2022]].`,"criteria"],
 ["Dunn's model",`Four sensory patterns from threshold × strategy: low registration, seeking, sensitivity, avoiding [[Dunn2001]].`,"senses"],
 ["EarliPoint",`An FDA-cleared eye-tracking diagnosis aid; sensitivity 71.0% and specificity 80.7% vs expert diagnosis [[FDA-K213882,Jones2023]].`,"frontier"],
 ["EHCP",`Education, Health and Care Plan, the legal framework for extra school support in England [[Keville2025]].`,"school"],
 ["EIBI",`Early intensive behavioural intervention: ABA-based, 20–40 hours a week for years; evidence low or very low certainty [[Reichow2018Cochrane]].`,"aba"],
 ["Elopement (wandering)",`Leaving a safe place; 49% of autistic children tried at least once after age 4 [[Anderson2012Elopement]].`,"health"],
 ["Epilepsy",`Seizure disorder; median 12.1% in autism [[Lukmanji2019]], 21.5% with intellectual disability [[Amiet2008]].`,"health"],
 ["Equality Act 2010",`In Great Britain, autism may count as a disability and bring an entitlement to reasonable adjustments [[Smith2025Adjustments]].`,"adult"],
 ["ESDM",`Early Start Denver Model, an NDBI; in a 2010 RCT IQ rose 17.6 vs 7.0 points [[Dawson2010]], with a partial replication [[Rogers2019]].`,"therapies"],
 ["Excitation/inhibition (E/I) balance",`The hypothesis that excitation is raised relative to inhibition [[Rubenstein2003]]; the shift may be compensatory [[Antoine2019]].`,"brain"],
 ["Exome sequencing",`Sequencing all protein-coding genes; yield 36% in neurodevelopmental disorders [[Srivastava2019]].`,"genes"],
 ["Facilitated communication (FC)",`Physical support while a person types; messages are authored by the facilitator [[Schlosser2014FC]].`,"therapies"],
 ["Female protective effect",`The idea that girls need a higher genetic load to be autistic; siblings of high-trait girls had more traits (Early evidence) [[Robinson2013,Antaki2022]].`,"genes"],
 ["FLACC",`A pain scale: Face, Legs, Activity, Cry, Consolability [[Merkel1997]].`,"nursing"],
 ["Folic acid",`Already advised around conception; some studies link it with a lower chance of autism [[Suren2013,Levine2018]].`,"risk"],
 ["Fragile X syndrome",`More than 200 CGG repeats silence FMR1 [[Hagerman2017]]; about half of males meet autism criteria [[Kaufmann2017]].`,"genes"],
 ["Functional analysis",`Testing which environmental events maintain a behaviour by varying conditions [[Iwata1994,Hanley2003]].`,"aba"],
 ["Functioning labels",`"High-" and "low-functioning"; IQ-based labels can hide real needs [[Alvares2020]].`,"words"],
 ["GBD (Global Burden of Disease)",`The study estimating 61.8 million autistic people worldwide in 2021 [[Santomauro2025]].`,"what"],
 ["GFCF diet",`Gluten-free, casein-free diet; "little evidence" of benefit in 6 RCTs [[Piwowarczyk2018]].`,"unproven"],
 ["GI symptoms",`Gastrointestinal symptoms are more common in autistic children (OR 4.42; constipation OR 3.86) [[McElhanon2014]].`,"health"],
 ["Grandfather clause",`DSM-5 says a well-established DSM-IV diagnosis should become autism spectrum disorder [[Fuentes2021ESCAP]].`,"criteria"],
 ["Guanfacine extended release",`An ADHD medicine; 50% vs 9.4% responders for hyperactivity in autistic children [[Scahill2015]].`,"meds"],
 ["Heritability",`The share of variation in liability due to genetic differences; about 80% for autism [[Bai2019]].`,"genes"],
 ["Hospital passport",`A document recording a person's communication, sensory and care needs; formats vary widely [[Northway2017,Heifetz2018]].`,"nursing"],
 ["Hyperacusis",`Decreased sound tolerance; about 41% of autistic people currently [[Williams2021Hyperacusis]].`,"senses"],
 ["Hyperbaric oxygen",`Pressurised oxygen; one RCT reported gains, a controlled study found no consistent effects [[Rossignol2009,Jepson2011]].`,"unproven"],
 ["Hypo-priors",`Pellicano and Burr's account: perception less shaped by prior expectations [[Pellicano2012]].`,"brain"],
 ["iBASIS-VIPP",`A video-feedback parenting programme for infants showing early signs [[Green2017iBASIS,Whitehouse2021]].`,"therapies"],
 ["I statement (USPSTF)",`A finding of insufficient evidence, as for screening children with no concerns raised [[Siu2016]].`,"screening"],
 ["ICD-11 6A02",`The ICD-11 code for autism spectrum disorder, subdivided by intellectual development and functional language [[Fuentes2021ESCAP]].`,"criteria"],
 ["IDEA",`The US Individuals with Disabilities Education Act, providing special education to eligible students up to age 21 [[McLean2026]].`,"school"],
 ["Identity-first language",`"Autistic person"; preferred by many autistic adults [[Taboas2023,Keating2023]].`,"words"],
 ["IEP",`Individualised Education Program; school-based IEP services varied widely across ADDM sites [[Hughes2024IEP]].`,"school"],
 ["Inclusion",`The school adapting to the student, as opposed to "integration", where the student adapts [[Perrelet2025]].`,"school"],
 ["Infant-sibling study",`A prospective study of younger siblings of autistic children, followed from infancy [[Ozonoff2011,Hazlett2017]].`,"brain"],
 ["Intellectual disability",`Recorded in 39.6% of autistic 8-year-olds with IQ data in ADDM 2022 [[Shaw2025]].`,"cooccur"],
 ["Interoception",`Sensing internal body signals; a meta-analysis found no clear difference in adult cardiac interoceptive accuracy [[Klein2025]].`,"senses"],
 ["Interpregnancy interval",`Time between pregnancies; under 12 months was associated with autism (OR 1.90) [[CondeAgudelo2016]].`,"risk"],
 ["JASPER",`A joint-attention and symbolic-play NDBI; targeted skills improved [[Kasari2006,Kasari2008]].`,"therapies"],
 ["Judge Rotenberg Center",`The US school whose use of skin-shock devices was the main target of campaigns against painful aversives [[Kirkham2017]].`,"aba"],
 ["Landau–Kleffner syndrome",`An acquired epileptic aphasia: sudden language loss with EEG abnormalities after typical development [[Fuentes2021ESCAP]].`,"milestones"],
 ["Lancet Commission (2021)",`A 32-author commission calling for personalised, stepped care; it proposed "profound autism" [[Lord2022Lancet]].`,"words"],
 ["Late diagnosis",`Diagnosis in adolescence or adulthood; in England 59–72% of autistic people may be undiagnosed [[ONions2023]].`,"adult"],
 ["Leucovorin (folinic acid)",`Its 2026 US label indication is FOLR1 cerebral folate transport deficiency, not autism [[FDA-Wellcovorin]].`,"frontier"],
 ["Loss of autism diagnosis",`Proposed replacement for "optimal outcome"; 9% by age 19 in one cohort [[Eigsti2023,Anderson2014Outcome]].`,"adult"],
 ["M-CHAT-R/F",`A 20-item toddler screen with a follow-up interview; 0–2 low, 3–7 interview, 8+ positive [[Robins2014]]. For clinicians, not self-diagnosis.`,"screening"],
 ["Maternal immune activation",`Infection or inflammation in pregnancy; in humans only modestly linked to autism (OR 1.13) [[Jiang2016Infection]].`,"brain"],
 ["Meltdown",`An involuntary response to overload, "feeling out of control" [[Lewis2023Meltdown,Phung2021]].`,"senses"],
 ["Melatonin",`A sleep hormone; after behavioural strategies, prolonged-release melatonin added about 32 minutes of sleep [[Gringras2017]].`,"meds"],
 ["Methylphenidate",`A stimulant; helps hyperactivity in autism, with 49% response and more side effects [[RUPP2005Methylphenidate]].`,"meds"],
 ["Microbiota transfer therapy",`Faecal transplant after antibiotics and bowel cleanse; open-label gains, no placebo arm yet reported [[Kang2017,Kang2019]].`,"frontier"],
 ["Minimally verbal",`Using few or no spoken words; about 30% of autistic children [[TagerFlusberg2013]].`,"cooccur"],
 ["MMR vaccine",`Measles, mumps and rubella vaccine; it does not cause autism (HR 0.93) [[Hviid2019]].`,"risk"],
 ["mTOR",`A growth-signalling pathway; overactive in TSC [[Henske2016]] and linked to reduced spine pruning in autistic cortex [[Tang2014]].`,"brain"],
 ["Music therapy",`Cochrane: global improvement RR 1.22 [[Geretsegger2022]]; TIME-A found no ADOS difference [[Bieleninik2017]].`,"therapies"],
 ["NCCPC-R",`Non-communicating Children's Pain Checklist–Revised; 7 or more suggests pain [[Breau2002]].`,"nursing"],
 ["NDBI",`Naturalistic developmental behavioural intervention, such as ESDM or JASPER [[Schreibman2015]].`,"therapies"],
 ["Neurodiversity",`Autism as one form of variation in a diversity of minds [[Pellicano2022]]; the concept was "collectively developed by neurodivergent people" [[Botha2024]].`,"words"],
 ["Neurogenesis",`The birth of neurons; in humans from about embryonic day 42, largely complete by midgestation [[Stiles2010]].`,"brain"],
 ["Oxytocin",`A hormone tested intranasally; the 290-child SOARS-B trial was negative [[Sikich2021]].`,"frontier"],
 ["PACT",`Preschool Autism Communication Trial of parent-mediated therapy; long-term symptom reduction ES 0.55 [[Green2010,Pickles2016]].`,"therapies"],
 ["Parent-mediated intervention",`Therapy delivered through coached parents; it changes parent–child interaction [[Oono2013,Nevill2018]].`,"therapies"],
 ["Paternal age",`Fathers aged 50 or older vs 20–29: RR 1.66 for autism [[Sandin2016]].`,"risk"],
 ["PECS",`Picture Exchange Communication System, taught in six phases [[Tamanaha2023]]; "promising but not yet established" [[Flippin2010]].`,"therapies"],
 ["PEERS",`A manualised, parent-assisted social skills programme for teens and young adults [[Laugeson2009,Laugeson2015]].`,"therapies"],
 ["Person-first language",`"Person with autism"; used more often by professionals [[Kenny2016,Taboas2023]].`,"words"],
 ["Placebo response",`19% of placebo participants rated "much improved" in autism drug trials [[Siafis2020]].`,"meds"],
 ["Positive behaviour support (PBS)",`Educational and systems-change methods to improve quality of life and reduce problem behaviour [[Carr2002PBS]].`,"aba"],
 ["Positive predictive value (PPV)",`The chance that a positive screen is a true case; 47.5% for M-CHAT-R/F in validation [[Robins2014]] but 14.6% in universal screening [[Guthrie2019]].`,"screening"],
 ["Premedication",`Medicine before a procedure; options include alpha-2 agonists, midazolam and ketamine [[Taghizadeh2015]].`,"nursing"],
 ["Preterm birth",`Birth at 22–27 weeks: 6.1% autism prevalence vs 1.4% at term [[Crump2021Preterm]].`,"risk"],
 ["Profound autism",`An administrative term for autistic people needing 24-hour access to an adult to stay safe [[Lord2022Lancet,Hughes2023]].`,"words"],
 ["Project AIM",`Meta-analysis of early-intervention trials by quality; few effects survive rigorous filters [[Sandbank2020,Sandbank2023BMJ]].`,"supports"],
 ["Project SEARCH",`Supported internships; with ASD Supports, 90% vs 6% employed [[Wehman2017]].`,"adult"],
 ["Prolactin",`A pituitary hormone raised by risperidone (49% vs 2%) [[FDA-Risperdal]].`,"meds"],
 ["Psychotropic polypharmacy",`Using several psychiatric drug classes at once; 35% of insured US autistic children [[Spencer2013]].`,"meds"],
 ["PTEN",`A gene to test in autism with extreme macrocephaly [[Butler2005PTEN]].`,"genes"],
 ["Puzzle-piece symbol",`An autism logo that evoked negative implicit associations in the public [[Gernsbacher2018Puzzle]].`,"words"],
 ["Q-CHAT",`Quantitative Checklist for Autism in Toddlers, a 25-item trait score [[Allison2008]].`,"screening"],
 ["Quality of life",`Lower in autistic people (d −0.96), at all ages [[vanHeijst2015]].`,"adult"],
 ["Refrigerator mother",`Bettelheim's discredited claim that cold mothering causes autism [[vanRosmalen2020]].`,"history"],
 ["Regression",`Loss of acquired skills, in about 32.1% of autistic children [[Barger2013]].`,"milestones"],
 ["Respite care",`Short breaks for carers; more hours linked to higher marital quality (cross-sectional) [[Harper2013]].`,"school"],
 ["Response to name",`Fails in only about half of infants later diagnosed at 12 months (sensitivity 0.50) [[Nadig2007]].`,"milestones"],
 ["Restraint",`Physical holding or restriction; used more often for autistic children in one ED (14.1% vs 6.0%) [[McGaughey2026]].`,"nursing"],
 ["Rett syndrome",`An MECP2 condition, almost only in girls, with autism features in about 61% [[Amir1999,Richards2015]].`,"genes"],
 ["Risperidone",`An antipsychotic FDA-labelled for irritability associated with autistic disorder [[FDA-Risperdal]].`,"meds"],
 ["RPM (Rapid Prompting Method)",`A letter-board method; no evidence supports it [[Schlosser2019RPM,Schlosser2026RPM]].`,"therapies"],
 ["RUBI parent training",`A parent training programme that beat parent education for disruptive behaviour [[Bearss2015]].`,"school"],
 ["School refusal",`The commonest reason for persistent absence in a UK survey of autistic students [[Totsika2020]].`,"school"],
 ["SCQ",`Social Communication Questionnaire, a parent questionnaire derived from the ADI [[Chandler2007]].`,"screening"],
 ["Secretin",`A gut hormone once promoted for autism; no benefit in 16 RCTs [[Williams2012Secretin]].`,"unproven"],
 ["Section 504",`A US law giving school accommodations to students who may not qualify for an IEP [[Lindsay2026]].`,"school"],
 ["Self-injury",`Self-injurious behaviour, in about 42% of autistic people [[SteenfeldtKristensen2020]].`,"cooccur"],
 ["Sensitivity",`The share of true cases a test finds; M-CHAT/F 38.8% in universal screening [[Guthrie2019]].`,"screening"],
 ["Sensory integration therapy",`An OT approach; the SenITA RCT was negative on its primary outcome [[Randell2022]].`,"therapies"],
 ["Sensory-adapted environment",`Changed light, sound and touch; lowered stress during dental care [[SteinDuker2023]].`,"nursing"],
 ["Services cliff",`The fall in services at school exit [[Shattuck2011Services]].`,"adult"],
 ["Severity levels",`DSM-5 Levels 1–3, rated per domain, describing support needed [[APA2022]].`,"criteria"],
 ["Shutdown",`A quieter overload response, "feeling frozen" and withdrawn [[Phung2021]].`,"senses"],
 ["Sibling recurrence",`The chance a younger sibling is autistic: about 20% [[Ozonoff2024]].`,"genes"],
 ["Social (pragmatic) communication disorder",`Social communication difficulties without restricted or repetitive behaviours [[Norbury2014]].`,"criteria"],
 ["Social skills groups",`Group programmes improving social competence (ES 0.47) [[Reichow2012Cochrane]].`,"therapies"],
 ["Social Stories",`Short individualised stories about situations; "low to questionable" overall effect [[Kokina2010]].`,"school"],
 ["Specificity",`The share of non-cases a test correctly clears; AQ specificity was 0.29 in referred adults [[Ashwood2016]].`,"screening"],
 ["Specifiers",`DSM-5-TR add-ons for intellectual or language impairment, known conditions and catatonia [[APA2022]].`,"criteria"],
 ["Spectrum 10K",`A UK genetic study postponed in 2021 after community backlash [[Ellis2023]].`,"frontier"],
 ["Stimming",`Repetitive movements or sounds used to self-regulate or express emotion [[Kapp2019]].`,"senses"],
 ["Supported employment",`Job support in real workplaces, as in Project SEARCH [[Wehman2017]].`,"adult"],
 ["Synaptic pruning",`Removal of unused synapses, running into adolescence in prefrontal cortex [[Huttenlocher1997,Petanjek2011]].`,"brain"],
 ["TEACCH",`A structured-teaching approach; a 13-study meta-analysis found exploratory gains [[ViruesOrtega2013]].`,"therapies"],
 ["Thimerosal",`A mercury-containing preservative; its removal did not lower autism rates [[Schechter2008,Hviid2003]].`,"risk"],
 ["Tuberous sclerosis complex (TSC)",`An autosomal dominant mTOR condition (TSC1 or TSC2) [[Henske2016]]; 56% of a 50-child cohort were autistic [[Mitchell2025TSC]].`,"genes"],
 ["Valproate",`An antiseizure drug; prenatal exposure raised absolute autism risk to 4.42% [[Christensen2013]].`,"risk"],
 ["Vineland",`An adaptive behaviour scale; IQ predicted it only weakly [[Alvares2020]].`,"words"],
 ["Visual activity schedule",`A picture sequence of tasks; an evidence-based practice [[Knight2015]].`,"school"],
 ["Wakefield 1998",`The retracted, fraudulent MMR paper [[Lancet2010Retraction,Godlee2011]].`,"history"],
 ["Weighted blanket",`Did not lengthen sleep in an RCT, though families preferred it [[Gringras2014]].`,"therapies"],
 ["Weighted vest",`"On balance" ineffective [[Stephenson2009]].`,"therapies"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'mchat' and 'm-chat' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–\/]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SR_AREAN={A:'Epidemiology, identity, language & history',B:'Genetics, causes & risk factors',C:'Neuroscience, brain development & sensory processing',D:'Early signs, screening, criteria & assessment',E:'Supports & non-pharmacological interventions',F:'Medication, unproven treatments & research',G:'Co-occurring conditions, physical health & outcomes',H:'Family, school, work, adulthood & nursing'};
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
