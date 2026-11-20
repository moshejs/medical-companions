# B · Alcohol in the body and brain: metabolism, neurobiology & genetics

Pass date: 2026-11-04. Modules served: drinks, brain, genes.

Access notes:
- Every source was checked against PubMed esummary (authors, title, journal, year, PMID, PMCID, DOI). The one exception is Jones 2019 (WIREs Forensic Science), which is not indexed in PubMed and was checked on Crossref. I read the abstract of every paper I took a number from. Where an abstract had no number, I read the open-access full text from Europe PMC or PMC efetch: Abrahao 2017, Cederbaum 2012, Zakhari 2006, Edenberg 2007, Kumar 2009, Koob & Volkow 2016, Brooks 2009, Terpstra 2020, Zhou 2020, Daviet 2022, Kanny 2015 and Hon 2018.
- The StatPearls chapter "Ethanol Toxicity" (NBK557381) is in PubMed, but the NCBI Bookshelf page was behind a browser check, so I used only its PubMed abstract.
- **BAC effects table.** I could not validate a primary source for the classic tiered table running from 0.02 to 0.40 g/dL. Those tables usually come from NHTSA or NIAAA web pages, which are not in PubMed. The effect ladder below therefore comes from the millimolar thresholds in Abrahao 2017 (Neuron), converted to g/dL. I did the conversion (1 mM ethanol ≈ 4.6 mg/dL; Edenberg 2007 gives 100 mg/100 mL ≈ 22 mM) and label it as mine.
- **US standard drink.** The 14 g US definition is not stated in any abstract I validated. Here a "standard drink" means the 10 g used by GBD and the modal 10 g of Kalinowski 2016. The calculator team should take the US 14 g figure from the pass that validates it (A or C).
- **Safety text to keep next to this content.** Alcohol poisoning is an emergency: call emergency services. Stopping suddenly after long, heavy daily drinking can be dangerous (seizures, delirium tremens), so get medical help to stop safely. Mixing alcohol with opioids, benzodiazepines or other sedatives is dangerous. The research does not support drinking for health [[GBD2016Alcohol,Zhao2023JAMANO,Millwood2019]]. The BAC calculator is a teaching tool. It can never say whether it is safe to drive, and it is not for reading your own results.

## Findings

### drinks · Absorption and distribution
- Ethanol is absorbed quickly from the gut. Peak blood-alcohol concentration (BAC) is usually reached 10–60 min after dosing [[Jones2019WIREs]].
- How fast ethanol is absorbed depends on time of day, drinking pattern, dosage form, the beverage's ethanol concentration and, above all, whether the person has eaten or is fasting [[Norberg2003]].
- Ethanol has low lipid solubility and does not bind to plasma proteins. Its volume of distribution therefore tracks total body water, which helps explain sex- and age-related differences [[Norberg2003]].
- Total body water is about 55–60% of body weight in non-obese men and about 50–55% in women [[Jones2019WIREs]].
- The average volume of distribution of ethanol (Vd, the Widmark "rho" or r factor) is about 0.70 L/kg in healthy men and about 0.60 L/kg in women [[Jones2019WIREs]].
- The fixed Widmark factors most often used in estimated-BAC formulas are 0.68 for men and 0.55 for women, with an elimination rate of 0.15 g/L per hour and a set 0.5 h absorption time [[Terpstra2020]].
- **Women and body composition:**
  - Women generally have a smaller volume of distribution for alcohol than men, because they have a higher percentage of body fat [[Cederbaum2012]].
  - After drinking the same amount, women have higher BACs than men, even after allowing for body size [[Frezza1990]].
- Watson, Watson and Batt derived total-body-water prediction equations from dilution studies in 458 adult men and 265 adult women. The equations use height, weight and age [[Watson1980]].
- Maskell and colleagues compared empirical Vd from drinking studies with anthropometric estimates (173 Caucasian men, 63 Caucasian women from Western Europe):
  - In men, the Watson equation was the most accurate (bias 0.00 L/kg, 95% range ±0.13 L/kg).
  - In women, the BMI-based Forrest equation was best (bias −0.01 L/kg, range ±0.15 L/kg) [[Maskell2019]].
- **Food lowers and shortens the BAC curve.** Ten healthy men drank 0.80 g/kg ethanol, once after an overnight fast and once right after breakfast:
  - Peak BAC was 104 ± 16.5 mg/dL fasting and 67 ± 9.5 mg/dL fed.
  - The 0–6 h area under the curve was 398 versus 241 mg/dL·h.
  - The dose was metabolised about 2 h sooner after the meal [[Jones1994Food]].
- A meal eaten 5 h after drinking, once the post-absorptive phase was established, raised the mean rate at which alcohol disappeared from blood by 36–50% [[Jones1994Food]].
- **First-pass metabolism.** Some ingested alcohol is oxidised in the stomach by gastric ADH isoforms before it reaches the systemic circulation. How much this matters overall is debated [[Cederbaum2012]].
- In 20 men and 23 women given 0.3 g/kg ethanol:
  - In women without alcohol dependence, first-pass metabolism was 23% and gastric ADH activity 59% of the values in comparable men.
  - In women with alcohol dependence, first-pass metabolism was "virtually abolished" [[Frezza1990]].
- First-pass metabolism is lower in the fasted state, because faster gastric emptying reduces gastric oxidation. This is one reason fasted drinking gives higher BACs [[Cederbaum2012]].

### drinks · Elimination kinetics
- Most ingested ethanol (95–98%) is metabolised. The rest is excreted in breath, urine and sweat [[Norberg2003]].
- Jones gives the oxidative share as 92–98% and says only 2–10% is excreted unchanged in urine, breath and sweat. A small fraction (0.1–0.2%) is conjugated to ethyl glucuronide and ethyl sulfate [[Jones2019WIREs]].
- **Why elimination is zero-order.** The rate-limiting step is the oxidation of ethanol to acetaldehyde by cytosolic ADH, which has a low Km (0.05–0.1 g/L). ADH saturates quickly, so elimination is zero-order for much of the time course [[Norberg2003]].
- Class I ADH has a Km of 2–10 mg/100 mL. The enzyme is saturated after the first few drinks, and zero-order kinetics describe the declining BAC phase above about 20 mg/100 mL [[Jones2010]].
- Hepatic ADH saturates at BAC above 15–20 mg/100 mL. Over most of the post-absorptive phase, BAC falls at a constant 10–35 mg/100 mL per hour [[Jones2019WIREs]].
- **Elimination rates from blood (forensic evidence review)** [[Jones2010]]:

  | Group | Rate (mg/100 mL/h) |
  |---|---|
  | Drinking on an empty stomach | 10–15 |
  | Non-fasted | 15–20 |
  | People with alcohol dependence during detoxification (induced CYP2E1) | 25–35 |
  | Good average for moderate drinkers | 15 |
  | Good average for apprehended drivers | 19 |

- In units used elsewhere, these rates are 0.010–0.035 g/dL per hour, with 0.015 g/dL per hour typical for moderate drinkers [[Jones2010,Jones2019WIREs]].
- Average liver capacity is about 7 g of alcohol per hour, roughly one drink per hour [[Cederbaum2012]].
- The BAC decline is slightly steeper in women than in men, apparently because of sex differences in liver weight relative to lean body mass [[Jones2010]].
- **Detoxification cohort.** 20 people with alcohol dependence admitted for detoxification:
  - BEC on admission was 238–489 mg/dL (mean 386 mg/dL).
  - Ethanol disappeared from blood at a mean 23 mg/dL/h (range 13–36), a three-fold spread between individuals [[Jones1992Detox]].
- Among healthy young European Americans, almost all of whom carry the same ADH1B genotype, ethanol elimination rates differ about four-fold [[Edenberg2007]].
- CYP2E1 has a higher Km (0.5–0.8 g/L) and is inducible, so ethanol clearance is higher in people who drink heavily [[Norberg2003]].
- **BAC calculations are uncertain.** Five published Widmark-type models give different BAC estimates for the same scenario, and practitioners should present this variability [[Posey2007]].
- Gullberg proposed a ±21% coefficient of variation for a calculated BAC. Searle argues that the error has to be calculated for each case rather than taken as a fixed percentage [[Searle2015]].

### drinks · Metabolism pathways: ADH, ALDH, CYP2E1, catalase
- Ethanol is oxidised to acetaldehyde, mainly by cytosolic ADH and also by CYP2E1 and catalase. ALDH2 in the mitochondria then oxidises acetaldehyde to acetate. Both steps reduce NAD+ to NADH [[Zakhari2006,Cederbaum2012]].
- In the brain, which has no ADH, ethanol is metabolised by cytochrome P450 and catalase [[Zakhari2006]].
- At low alcohol concentrations, CYP2E1 may account for about 10% of the liver's total alcohol-oxidising capacity [[Cederbaum2012]].
- CYP2E1's Km for ethanol is about 10 mM, ten-fold higher than ADH's but still within social-drinking concentrations [[Cederbaum2012]].
- Zakhari gives the CYP2E1 Km as 8–10 mM [[Zakhari2006]].
- **The microsomal ethanol-oxidising system (MEOS).** After chronic drinking, MEOS activity and CYP2E1 increase. This causes:
  - cross-tolerance to other drugs;
  - more conversion of hepatotoxins and of some drugs (such as acetaminophen) into toxic metabolites;
  - free-radical release [[Lieber2004MEOS]].
- In contrast, acute ethanol intake inhibits the metabolism of other drugs [[Lieber2004MEOS]].
- Most acetaldehyde is oxidised to acetate in the liver, so circulating acetaldehyde stays low under normal conditions [[Cederbaum2012]].
- Chronic alcohol consumption reduces acetaldehyde oxidation, either through lower ALDH2 activity or through impaired mitochondrial function [[Cederbaum2012]].
- Oxidising NADH through the mitochondrial respiratory chain yields 7 kcal per gram of ethanol [[Cederbaum2012]].
- Because ADH and ALDH2 both reduce NAD+ to NADH, the hepatic NAD+/NADH ratio falls in both the cytosol and the mitochondria. This disturbs pathways that need NAD+ or are inhibited by NADH [[Cederbaum2012]].
- **NADH and fatty liver.** NADH from ADH-mediated metabolism promotes steatosis by stimulating fatty-acid synthesis and opposing fatty-acid oxidation [[Lieber2004Fatty]].
- Raised NADH also increases lactate, which stimulates collagen synthesis [[Lieber2004Fatty]].
- Acetaldehyde binds to procollagen and glutathione and damages mitochondria. CYP2E1 activity generates free radicals and lipid peroxidation. These steps contribute to progression from steatosis to inflammation and fibrosis (Established) [[Lieber2004Fatty]].
- **Acetaldehyde and cancer.** Acetaldehyde, the first and most toxic metabolite of ethanol, is the main focus of research into how alcohol causes cancer [[Seitz2007]].
- About 3.6% of cancers worldwide derive from chronic alcohol drinking. Sites include the upper aerodigestive tract, liver, colorectum and breast [[Seitz2007]].
- Acetaldehyde is a mutagen and an animal carcinogen that causes DNA damage [[Brooks2009]].
- The 2007 IARC Working Group was the first to conclude that ethanol in alcoholic beverages is carcinogenic to humans. It noted substantial mechanistic evidence linking acetaldehyde to oesophageal cancer, based on studies in ALDH2-deficient people [[Brooks2009]].
- Acetaldehyde levels in saliva are 10–20 times higher than in blood, because oral microorganisms form it locally [[Brooks2009]].

### drinks · Intoxication, BAC and alcohol poisoning
- **Effect ladder** in millimolar, with my conversion to g/dL [[Abrahao2017]]:

  | Blood ethanol | ≈ g/dL (my conversion) | Effect |
  |---|---|---|
  | ~6 mM (28 mg/dL) | 0.03 | Effects reliably distinguishable |
  | ~12 mM | 0.055 | Anxiolytic and euphoric effects |
  | ~18 mM (legal intoxication) | 0.08 | Slowed reactions, poor coordination, impaired thinking |
  | Up to 50 mM | up to 0.23 | Locomotor disruption, cognitive impairment and sedation escalate |
  | Above 50 mM | above 0.23 | Strong sedation and respiratory depression can lead to coma or death |

- A BAC of about 100 mg/100 mL (0.1%) corresponds to about 22 mM ethanol [[Edenberg2007]].
- Ethanol toxicity runs along a continuum from mild behavioural change to severe central nervous system depression, coma and death. Severity depends on how much and how fast alcohol is taken, individual tolerance and metabolism, and other medical conditions [[Parmar2026StatPearls]].
- Ethanol depresses the central nervous system by enhancing inhibitory neurotransmission and suppressing excitatory pathways [[Parmar2026StatPearls]].
- Intoxication occurs when alcohol and its metabolites build up in the blood faster than the liver can metabolise them. Its severity is related to BAC but also depends on other factors [[Jung2014]].
- **Signs of intoxication progress** from minimal impairment, poor judgement, slurred speech, poor coordination and vomiting, to stupor, then to coma and death. Alcohol poisoning is a medical emergency: call emergency services [[Kanny2015MMWR]].
- **Alcohol poisoning deaths, US, 2010–2012** (people aged ≥15) [[Kanny2015MMWR]]:
  - An average of 2,221 deaths a year (8.8 per million), about six a day.
  - 75.7% were aged 35–64 and 76.4% were men.
- Among these alcohol poisoning deaths:
  - Alcohol dependence was listed as a contributing cause in 30.4%, so most occurred in people without a recorded dependence diagnosis.
  - Hypothermia was a contributing cause in 6.0% [[Kanny2015MMWR]].
- Infants and young children are prone to profound hypoglycaemia, coma and hypothermia even after small amounts of ethanol. Household products such as mouthwash, cologne and hand sanitiser contain enough ethanol to cause this [[Hon2018]].
- **Tolerance does not remove danger.** People with alcohol dependence were admitted for detoxification with BECs up to 489 mg/dL (mean 386 mg/dL) [[Jones1992Detox]].
- **Alcohol plus opioids or benzodiazepines** [[Tori2020]]:
  - Among US opioid overdose deaths, alcohol co-involvement rose from 12.4% (1999) to 14.7% (2017), and benzodiazepine co-involvement from 8.7% to 21.0%.
  - Using either with opioids increases overdose risk.
- **Driving risk rises steadily with BAC** in every age and sex group [[Zador2000]]:
  - At a BAC of 0.09% (midpoint of 0.08–0.10%), the relative risk of a fatal single-vehicle crash injury ranged from 11.4 (drivers aged ≥35) to 51.9 (male drivers aged 16–20).
  - In male drivers aged 16–20, each 0.02% rise in BAC more than doubled that relative risk.
- **Standard drinks differ by country.** Among 37 countries with a government definition, the modal standard drink was 10 g pure ethanol, ranging from 8 to 20 g [[Kalinowski2016]].
- GBD defines a standard drink as 10 g of pure ethyl alcohol [[GBD2016Alcohol]].

### drinks · No health-protective amount
- GBD 2016 found that the level of alcohol consumption that minimised harm across health outcomes was zero standard drinks per week (95% UI 0.0–0.8) (Established) [[GBD2016Alcohol]].
- GBD 2020 found that the risk-minimising level depends on age and region. For people aged 15–39, it ranged from 0 to 0.603 standard drinks per day. Of people drinking harmful amounts in 2020, 59.1% were aged 15–39 and 76.9% were male [[GBD2020Alcohol]].
- A 2023 meta-analysis covered 107 cohort studies with 4.8 million participants. After adjustment for biases, occasional and low-volume drinkers (1.3–24.0 g/day) had no significantly lower all-cause mortality than lifetime non-drinkers (RR 0.93, P = .07). Risk was higher at 45–64 g/day (RR 1.19) and ≥65 g/day (RR 1.35) [[Zhao2023JAMANO]].
- **Genetic (Mendelian randomisation) evidence from 161,498 genotyped adults in the China Kadoorie Biobank:**
  - Gene-predicted alcohol intake showed no U-shaped association with risk.
  - It raised ischaemic stroke risk (RR 1.27 per 280 g/week) and intracerebral haemorrhage risk (RR 1.58 per 280 g/week).
  - The authors conclude that the apparent protective effect of moderate drinking against stroke is "largely non-causal" (Established) [[Millwood2019]].
- **ADH1B variant carriers** (261,991 Europeans) [[Holmes2014BMJ]]:
  - Carriers of the ADH1B rs1229984 A-allele drank 17.2% fewer units a week and had lower odds of coronary heart disease (OR 0.90, 95% CI 0.84–0.96).
  - The authors infer that even light-to-moderate drinkers benefit from drinking less.

### brain · Acute actions: GABA-A, NMDA, dopamine, opioids
- Ethanol acts on the brain from the low millimolar range up to about 100 mM. Early stimulant effects are followed by depressant effects [[Abrahao2017]].
- **GABA-A receptors.**
  - Specific GABA-A receptor subtypes respond to ethanol at social-drinking doses, and others only at severe intoxication.
  - Ethanol also increases GABA transmission indirectly, by raising neuroactive steroids, increasing presynaptic GABA release and dephosphorylating receptors [[Kumar2009]].
- **NMDA receptors.** In hippocampal neurons, ethanol inhibited NMDA-activated current in a concentration-dependent way over 5–50 mM, the range that causes intoxication [[Lovinger1989]]:
  - 50 mM cut NMDA current by 61%, against 18% for kainate and 15% for quisqualate currents.
  - The potency of different alcohols at blocking NMDA current tracked their intoxicating potency.
- At concentrations that affect behaviour, ethanol inhibits the NMDA receptor, which carries the post-synaptic excitatory effects of glutamate [[TsaiCoyle1998]].
- **Dopamine.** Six healthy adults had [11C]raclopride PET after oral alcohol (1 mL/kg in orange juice) and after orange juice alone. Raclopride binding fell bilaterally in the ventral striatum and nucleus accumbens after alcohol, which indicates dopamine release [[Boileau2003]].
- In the same study, the size of the dopamine change correlated with the alcohol-induced rise in heart rate and with trait impulsiveness. It was the first report that alcohol releases dopamine in the human brain [[Boileau2003]].
- **Endogenous opioids.** PET with [11C]carfentanil showed that drinking releases endogenous opioids in the nucleus accumbens and orbitofrontal cortex [[Mitchell2012]].
- In heavy drinkers, the orbitofrontal change correlated with problem drinking and subjective "high". This suggests a mechanism for opioid antagonists such as naltrexone (Early evidence) [[Mitchell2012]].
- In the binge/intoxication stage, the rewarding effects of drugs, incentive salience and drug-seeking habits involve dopamine and opioid peptides in the basal ganglia [[KoobVolkow2016]].

### brain · Chronic adaptation, tolerance and withdrawal hyperexcitability
- Chronic ethanol changes GABA-A receptor function, expression, trafficking and location. These changes contribute to tolerance, dependence and withdrawal hyperexcitability (Established) [[Kumar2009]].
- **GABA-A subunit changes with chronic ethanol** [[Kumar2009]]:

  | Subunit | Change | Where / how |
  |---|---|---|
  | α1 | Internalised into clathrin-coated vesicles; less at the cell surface and in synapses | Cerebral cortex |
  | α4, β2, β3 | More expressed (α4 after 14 days of chronic ethanol) | Cerebral cortex; α4 also hypothalamus |
  | α6 | Up | Cerebellum |
  | α1 | Down | Cerebellum |

- α1 is the most abundant GABA-A subunit in the cerebral cortex, so reduced α1 expression likely has substantial functional consequences [[Kumar2009]].
- With tolerance, NMDA receptors are up-regulated. Abrupt withdrawal then produces a hyperexcitable state that leads to seizures, delirium tremens and excitotoxic neuronal death (Established). Get medical help to stop safely [[TsaiCoyle1998]].
- **Kindling.** Withdrawal severity can increase after repeated withdrawal episodes. Kindling may also contribute to relapse risk and alcohol-related cognitive impairment (Early evidence) [[Becker1998]].
- **Lower D2 receptor availability.**
  - In PET with [11C]raclopride, striatal dopamine D2 receptor availability was lower in 10 people with alcohol dependence than in 17 controls (Bmax/Kd 2.1 ± 0.5 versus 2.7 ± 0.6; p < 0.05).
  - It did not correlate with days since last drink.
  - Dopamine transporter availability did not differ [[Volkow1996]].

### brain · The addiction cycle, allostasis and stress systems
- Koob and Volkow describe addiction as three repeating stages, each linked to a brain system [[KoobVolkow2016]]:
  - **Binge/intoxication:** basal ganglia, incentive salience and habit.
  - **Withdrawal/negative affect:** extended amygdala, reward deficit and stress surfeit.
  - **Preoccupation/anticipation:** prefrontal cortex and insula, craving and weakened executive function.
- In the withdrawal/negative affect stage, the dopamine reward component weakens and brain stress transmitters (corticotropin-releasing factor, CRF, and dynorphin) are recruited in the extended amygdala [[KoobVolkow2016]].
- In the preoccupation/anticipation stage, craving and executive deficits involve dysregulated glutamate projections from the prefrontal cortex and insula to the basal ganglia and extended amygdala [[KoobVolkow2016]].
- Neurotransmitters implicated in these neuroadaptations include dopamine, enkephalins, glutamate, GABA, norepinephrine, CRF, dynorphin, neuropeptide Y and endocannabinoids [[KoobVolkow2016]].
- **Allostasis.** Koob and Le Moal define the allostatic state as a chronic shift in the reward set point, kept going by dysregulated reward circuits and by activated brain and hormonal stress responses. In this model it explains lasting vulnerability to relapse after drug use stops (Hypothesis) [[KoobLeMoal2001]].
- **Negative reinforcement.** Koob describes it as drinking to relieve a negative emotional state. It is thought to come from lower dopamine and opioid function in the ventral striatum plus CRF recruitment in the extended amygdala (Early evidence, mainly from animal models) [[Koob2014]].
- **Animal data** [[Koob2014]]:
  - Acute withdrawal from dependence-inducing alcohol raises reward thresholds, increases anxiety-like behaviour, lowers dopamine function and raises CRF in the central amygdala.
  - CRF antagonists block the excessive drinking produced by dependence.
- Other stress-system changes in withdrawal include more norepinephrine, more dynorphin and less neuropeptide Y [[Koob2014]].
- **CRF1 receptors in animals** (Early evidence; not yet established in humans) [[HeiligKoob2007]]:
  - A history of dependence leaves long-term up-regulation of CRF1 receptors in the amygdala.
  - CRF antagonists selectively block emotionality, excessive drinking and stress-induced relapse-like alcohol seeking in post-dependent animals.

### brain · Habit: ventral to dorsal striatum
- Everitt and Robbins propose that addiction moves from voluntary use to habit and then compulsion. At the neural level this is a shift from prefrontal to striatal control, and from ventral to dorsal striatum (Hypothesis, with animal support) [[EverittRobbins2005]].
- **Cue-reactivity fMRI in humans** (21 heavy social drinkers, 13 of them alcohol-dependent, averaging 5.0 drinks a day; 10 light social drinkers averaging 0.4) [[VollstadtKlein2010]]:
  - Heavy drinkers showed more cue activation in the dorsal striatum.
  - Light drinkers showed more activation in the ventral striatum and prefrontal areas.
- Dorsal striatal cue activation correlated positively with obsessive-compulsive craving (Early evidence) [[VollstadtKlein2010]].

### brain · Brain structure and recovery with abstinence
- MRI studies show white-matter volume deficits and damage to selected grey-matter structures in AUD. Some changes are permanent and others are reversible with abstinence [[Zahr2017]].
- **58 men with alcohol dependence, scanned repeatedly** [[Pfefferbaum1995]]:
  - From about day 12 to day 32 of abstinence, cerebrospinal fluid volumes in the lateral ventricles and cortical sulci fell, with a trend towards more anterior cortical grey matter.
  - Over the following 2–12 months, third-ventricle volume fell in those who stayed abstinent, and cortical white matter fell in those who resumed drinking.
- **UK Biobank, 36,678 middle-aged and older adults** [[Daviet2022]]:
  - Alcohol intake was negatively associated with global brain volume, regional grey matter and white-matter microstructure, already at an average of one to two daily units.
  - Going from one to two daily units was "equivalent to the effect of aging 2 years", and from two to three units to 3.5 years.
- **Whitehall II imaging sub-study, 550 adults followed for 30 years** [[Topiwala2017]]:
  - Drinking more than 30 units a week carried an OR of 5.8 (95% CI 1.8–18.6) for hippocampal atrophy versus abstinence.
  - 14–21 units a week carried an OR of 3.4 (1.4–8.1) for right-sided atrophy.
  - Light drinking was not protective.

### genes · Heritability and family risk
- A meta-analysis of 12 twin and 5 adoption studies estimated AUD heritability at 0.49 (95% CI 0.43–0.53), with shared environment 0.10 (0.03–0.16). There was no heterogeneity by sex, study design or assessment method (Established) [[Verhulst2015]].
- **Swedish national adoption study of 18,115 adoptees.** AUD in adoptees was predicted by AUD in [[Kendler2015Adoption]]:

  | Relative | Odds ratio (95% CI) |
  |---|---|
  | Biological parents | 1.46 (1.29–1.66) |
  | Biological siblings | 1.94 (1.55–2.44) |
  | Adoptive parents | 1.40 (1.09–1.80) |

- In the same study, genetic and environmental risk acted additively, so both nature and rearing environment carry risk [[Kendler2015Adoption]].
- Genetic risk for AUD reflects both a specific liability to AUD and a wider liability to externalising disorders [[Kendler2015Adoption]].

### genes · Alcohol-metabolising gene variants
- ADH1B*2 and ADH1B*3 encode β subunits with a 70- to 80-fold higher turnover rate than β1. ADH1B*3 is found mainly in people of African descent [[Edenberg2007]].
- ADH1B*2 is protective against alcohol dependence in East Asian, European and African populations. Among people of Jewish descent it occurs at moderate frequency and is linked to less binge drinking [[Edenberg2007]].
- A meta-analysis of 9,638 cases and 9,517 controls linked ADH1B rs1229984 to alcohol dependence and alcohol-induced liver disease [[Li2011ADH1B]]:
  - Allelic OR (Arg versus His) was 2.06 (1.84–2.31).
  - The OR was 2.24 (1.99–2.51) in Asian groups.
- In the largest DSM-IV alcohol dependence GWAS (14,904 cases, 37,944 controls), different ADH1B variants reached genome-wide significance in European ancestry (rs1229984) and African ancestry (rs2066702) [[Walters2018]].
- ALDH2*2 (ALDH2*504Lys, also called 487Lys) acts as a dominant negative. It greatly reduces ALDH2 activity in heterozygotes and abolishes it in homozygotes [[Li2009ALDH2]].
- ALDH2*2 is essentially absent outside East Asia. Its frequency is highest in Southeast China and declines outwards across China, Japan, Korea, Mongolia and Indochina (80,691 individuals from 366 population samples) [[Li2009ALDH2]].
- About 36% of East Asians (Japanese, Chinese and Korean) have the alcohol flushing response: facial flushing, nausea and tachycardia [[Brooks2009]].
- At least 540 million people worldwide (about 8%) are estimated to be ALDH2-deficient [[Brooks2009]].
- ALDH2 heterozygotes have more than 100-fold lower ALDH2 activity than people with two active copies [[Brooks2009]].
- Inactive ALDH2 is found in 15–40% of East Asian populations [[Cederbaum2012]]:
  - Carriers have 5- to 20-fold higher blood acetaldehyde after drinking.
  - Homozygotes are "virtual abstainers".
- In Asian samples, carrying one ALDH2*2 allele and carrying one ADH1B*2 allele each protected against alcohol dependence, independently of each other. A second copy of either gave no significant additional protection [[Luczak2006]].
- **The protection has weakened in Japan.** The share of Japanese people with alcohol dependence who were ALDH2 heterozygotes rose from 3% (1979) to 8% (1986) and 13% (1992), alongside rising per-capita drinking [[Brooks2009]].
- **ALDH2 and oesophageal cancer** (meta-analysis, versus *1*1) [[Lewis2005]]:
  - Heterozygotes (*1*2), who can still drink, had higher risk (OR 3.19, 95% CI 1.86–5.47).
  - *2*2 homozygotes, who drink very little, had lower risk (OR 0.36, 0.16–0.80).
  - This supports both a causal role for alcohol and a carcinogenic role for acetaldehyde (Established).
- In prospective studies of people with alcohol dependence, low-activity ALDH2 heterozygotes had about 12 times the hazard of upper aerodigestive tract cancer compared with people with active ALDH2 [[Brooks2009]].
- In Japanese and Taiwanese studies, 58–69% of the excess oesophageal cancer risk was attributable to drinking by low-activity ALDH2 heterozygotes [[Brooks2009]].
- After a moderate oral dose of ethanol, ALDH2 heterozygotes had two to three times the salivary acetaldehyde of people with fully active ALDH2 [[Brooks2009]].
- **Flushing questionnaire.** In Japanese men, a simple flushing questionnaire identified ALDH2 deficiency with 90% sensitivity and 88% specificity. In Japanese women it gave 88% sensitivity and 92% specificity [[Brooks2009]].
- Pharmacological ALDH inhibition causes acetaldehyde to build up, with nausea, sweating, vomiting and a fast heart rate if alcohol is taken. This is the basis of the disulfiram reaction; pass E covers the drug [[Cederbaum2012]].

### genes · Genome-wide association studies and polygenic scores
- **Million Veteran Program, multi-ancestry (N = 274,424)** [[Kranzler2019]]:
  - 18 genome-wide significant loci: 5 for both AUDIT-C and AUD diagnosis, 8 for AUDIT-C only and 5 for AUD only.
  - The authors conclude that heavy drinking is a key risk factor for AUD but is not a sufficient cause.
- **Problematic alcohol use (PAU) meta-analysis, 435,563 European-ancestry individuals** [[Zhou2020NatNeurosci]]:
  - 29 independent risk variants (19 novel) and genetic correlations with 138 phenotypes, including substance use and psychiatric traits.
  - SNP-based heritability of PAU was 0.068 (SE 0.004).
- Among psychiatric disorders, major depressive disorder had the highest genetic correlation with PAU (rg = 0.39, SE 0.03). PAU correlated negatively with cognitive traits [[Zhou2020NatNeurosci]].
- **Multi-ancestry meta-analysis of 1,079,947 people** [[Zhou2023NatMed]]:
  - Ancestries: European 903,147; African 122,571; Latin American 38,962; East Asian 13,551; South Asian 1,716.
  - 110 independent risk variants, with high cross-ancestry similarity in genetic architecture.
  - Cross-ancestry polygenic scores performed better than single-ancestry scores.
- AUD genetics only partly overlap with alcohol-consumption genetics. AUD correlates genetically with schizophrenia, ADHD, depression, and cigarette and cannabis use [[Walters2018]].
- **Polygenic scores cannot diagnose AUD** (Established) [[Barr2020]]:
  - Combined scores explained about 2.5–3.5% of the variance in AUD.
  - They added only slightly to the area under the curve beyond age, sex and ancestry.
  - The authors judged their usefulness for identifying higher-risk people "modest, at best".
- Twin heritability (~50%) is far higher than SNP heritability (~7–10%), the "missing heritability" gap [[Verhulst2015,Zhou2020NatNeurosci]].

### genes · Environmental and developmental risk
- **Age at first drink, NESARC 2001–2002 (43,093 adults).** Compared with starting at age 21 or older, starting before 14 was linked to [[Hingson2006]]:
  - lifetime dependence: HR 1.78 (1.51–2.11);
  - dependence within 10 years of first drinking: HR 1.69 (1.38–2.07);
  - multiple dependence episodes: OR 3.09 (2.19–4.35).
  - All estimates were adjusted for family history and other confounders.
- In the 1992 NLAES (27,616 current and former drinkers):
  - Lifetime dependence fell from more than 40% in those who started drinking at 14 or younger to about 10% in those who started at 20 or older.
  - The adjusted odds of dependence fell 14% with each later year of onset [[GrantDawson1997]].
- These age-at-onset links come from observational surveys and may partly reflect shared genetic or family risk rather than a pure causal effect. Pass F covers prevention.
- **Price.** In a meta-analysis of 112 studies (1,003 estimates), higher alcohol prices and taxes were linked to less drinking [[Wagenaar2009]]:
  - Mean price elasticities were −0.46 for beer, −0.69 for wine and −0.80 for spirits.
  - Price also affected heavy drinking (mean elasticity −0.28) (Established).
- A systematic review (50 articles) estimated that doubling alcohol tax would cut alcohol-related mortality by an average of 35% and traffic crash deaths by 11% [[Wagenaar2010]].
- **Availability.** Most of the 44 outlet-density studies and 15 hours-and-days-of-sale studies found effects on drinking or alcohol-related harm. The authors concluded that restricting availability prevents harm [[Popova2009]].
- AUD involves compulsive heavy alcohol use and loss of control over intake. Alcohol control policies that lower overall consumption support clinical treatment [[Carvalho2019Lancet]].

### Exam hooks
- Ethanol follows Michaelis–Menten kinetics. Because ADH (Km 2–10 mg/100 mL) saturates after the first few drinks, BAC falls in a straight line (zero-order) above about 20 mg/100 mL [[Jones2010]].
- Typical BAC fall for moderate drinkers is 15 mg/100 mL/h (0.015 g/dL/h). In people with dependence during detoxification it is 25–35 mg/100 mL/h, because of CYP2E1 induction [[Jones2010]].
- The liver clears about 7 g of alcohol per hour [[Cederbaum2012]].
- Ethanol's Vd is about 0.70 L/kg in men and 0.60 L/kg in women, because it distributes in total body water [[Jones2019WIREs]].
- The Widmark r is classically taken as 0.68 for men and 0.55 for women [[Terpstra2020]].
- Women have lower gastric ADH and first-pass metabolism: 23% of men's first-pass metabolism in the Frezza study [[Frezza1990]].
- Food before drinking lowered peak BAC from 104 to 67 mg/dL after 0.80 g/kg [[Jones1994Food]].
- The ethanol to acetaldehyde step uses ADH, CYP2E1 and catalase; ALDH2 then converts acetaldehyde to acetate. The NADH surplus drives fatty liver and raises lactate [[Zakhari2006,Lieber2004Fatty]].
- Chronic drinking induces CYP2E1 (MEOS). This brings metabolic tolerance, cross-tolerance and more toxic acetaminophen metabolites. Acute drinking inhibits the metabolism of other drugs [[Lieber2004MEOS]].
- Acutely, ethanol potentiates GABA-A and inhibits NMDA receptors (61% NMDA current inhibition at 50 mM) [[Kumar2009,Lovinger1989]].
- Chronically, GABA-A α1 falls, α4 rises and NMDA receptors are up-regulated. The result is withdrawal hyperexcitability (seizures, delirium tremens) [[Kumar2009,TsaiCoyle1998]].
- Alcohol releases dopamine in the human nucleus accumbens (raclopride PET) and endogenous opioids in the nucleus accumbens and orbitofrontal cortex (carfentanil PET), the rationale for naltrexone [[Boileau2003,Mitchell2012]].
- The Koob and Volkow stages and their circuits are binge/intoxication (basal ganglia), withdrawal/negative affect (extended amygdala; CRF, dynorphin) and preoccupation/anticipation (prefrontal cortex, insula) [[KoobVolkow2016]].
- AUD heritability is about 0.49 (twin and adoption meta-analysis) [[Verhulst2015]].
- ALDH2*2 is dominant-negative. Heterozygotes flush and carry about 3-fold higher oesophageal cancer risk if they drink (OR 3.19). Homozygotes rarely drink and have lower risk (OR 0.36) [[Lewis2005,Li2009ALDH2]].
- About 36% of East Asians flush after drinking, and an estimated 540 million people worldwide are ALDH2-deficient [[Brooks2009]].
- ADH1B rs1229984, a fast-metabolising variant, is protective and reaches genome-wide significance in GWAS of alcohol dependence [[Walters2018,Li2011ADH1B]].
- Polygenic scores explain only about 2.5–3.5% of the variance in AUD and cannot diagnose it [[Barr2020]].
- Starting to drink before 14, compared with at 21 or later, carries an adjusted HR of 1.78 for lifetime alcohol dependence [[Hingson2006]].
- Mendelian randomisation shows the apparent stroke protection from moderate drinking is largely non-causal [[Millwood2019]].

### In plain words
- Alcohol passes from your stomach and gut into your blood within minutes and spreads through the water in your body [[Jones2019WIREs]].
- Your liver removes alcohol at a fairly steady rate, roughly one drink an hour. Coffee, a cold shower or sleep do not speed this up much; time does [[Cederbaum2012,Jones2010]].
- Eating before you drink lowers the peak level of alcohol in your blood, but it does not make heavy drinking safe [[Jones1994Food]].
- After the same drinks, women usually reach a higher blood alcohol level than men, partly because of differences in body water and stomach enzymes [[Frezza1990,Jones2019WIREs]].
- The body turns alcohol into acetaldehyde, a substance that damages DNA and is linked to cancer [[Brooks2009,Seitz2007]].
- If your face turns red when you drink, your body may be slow to clear acetaldehyde. Drinking then raises your risk of cancer of the food pipe even more [[Brooks2009,Lewis2005]].
- At first alcohol feels rewarding because it releases dopamine and the brain's own opioids [[Boileau2003,Mitchell2012]].
- With long, heavy drinking, the brain adjusts to alcohol always being there. Suddenly stopping can then cause shaking, seizures or confusion. Get medical help to stop safely [[TsaiCoyle1998,Kumar2009]].
- Over time, drinking can shift from seeking a good feeling to drinking to escape feeling bad. This is a change in the brain, not a lack of willpower [[KoobVolkow2016,Koob2014]].
- Some brain shrinkage seen in heavy drinking can partly recover when a person stops drinking [[Pfefferbaum1995,Zahr2017]].
- About half of the risk for alcohol use disorder comes from genes, but genes are not destiny. Family environment and life events matter too [[Verhulst2015,Kendler2015Adoption]].
- A genetic test or "risk score" cannot tell you whether you have, or will get, alcohol use disorder [[Barr2020]].
- Research does not show that drinking is good for your health [[GBD2016Alcohol,Zhao2023JAMANO]].
- Very high alcohol levels can stop breathing. If someone cannot be woken, is breathing slowly or is having a seizure, call emergency services [[Kanny2015MMWR,Abrahao2017]].
- Mixing alcohol with opioids, sleeping pills or anxiety pills such as benzodiazepines is dangerous [[Tori2020]].

## Numbers for the animations

Elimination-curve anchors from Jones 2010:
- elim_rate_fasted | low | 10 | mg/100 mL/h | [[Jones2010]]
- elim_rate_fasted | high | 15 | mg/100 mL/h | [[Jones2010]]
- elim_rate_fed | low | 15 | mg/100 mL/h | [[Jones2010]]
- elim_rate_fed | high | 20 | mg/100 mL/h | [[Jones2010]]
- elim_rate_detox_dependence | low | 25 | mg/100 mL/h | [[Jones2010]]
- elim_rate_detox_dependence | high | 35 | mg/100 mL/h | [[Jones2010]]
- elim_rate_population_average | moderate drinkers | 15 | mg/100 mL/h | [[Jones2010]]
- elim_rate_population_average | apprehended drivers | 19 | mg/100 mL/h | [[Jones2010]]
- elim_rate_detox_cohort | mean | 23 | mg/dL/h | [[Jones1992Detox]]
- elim_rate_detox_cohort | min | 13 | mg/dL/h | [[Jones1992Detox]]
- elim_rate_detox_cohort | max | 36 | mg/dL/h | [[Jones1992Detox]]
- detox_admission_BEC | mean | 386 | mg/dL | [[Jones1992Detox]]
- detox_admission_BEC | max | 489 | mg/dL | [[Jones1992Detox]]
- liver_capacity | per hour | 7 | g ethanol | [[Cederbaum2012]]

Fasted versus fed, after 0.80 g/kg in 10 men:
- peak_BAC_fasted | 0.80 g/kg dose | 104 | mg/dL | [[Jones1994Food]]
- peak_BAC_fed | 0.80 g/kg dose | 67 | mg/dL | [[Jones1994Food]]
- AUC_0_6h_fasted | 6 h | 398 | mg/dL·h | [[Jones1994Food]]
- AUC_0_6h_fed | 6 h | 241 | mg/dL·h | [[Jones1994Food]]
- time_saved_fed | metabolising the dose | 2 | h | [[Jones1994Food]]

Body-water and Widmark parameters:
- Vd_men | average | 0.70 | L/kg | [[Jones2019WIREs]]
- Vd_women | average | 0.60 | L/kg | [[Jones2019WIREs]]
- widmark_r_men | fixed | 0.68 | dimensionless | [[Terpstra2020]]
- widmark_r_women | fixed | 0.55 | dimensionless | [[Terpstra2020]]
- TBW_fraction_men | non-obese | 55–60 | % body weight | [[Jones2019WIREs]]
- TBW_fraction_women | non-obese | 50–55 | % body weight | [[Jones2019WIREs]]
- time_to_peak | range | 10–60 | min | [[Jones2019WIREs]]
- BAC_calc_uncertainty | Gullberg CV | 21 | % | [[Searle2015]]

Illustrative Widmark curve, my calculation with the r and β above. It assumes instant absorption: BAC = A/(r × W) − 0.015 × t. It is a teaching example, not a prediction.
- widmark_example_man_70kg_40g | 0 h | 0.084 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 1 h | 0.069 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 2 h | 0.054 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 3 h | 0.039 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 4 h | 0.024 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 5 h | 0.009 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_man_70kg_40g | 6 h | 0 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_woman_60kg_40g | 0 h | 0.121 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_woman_60kg_40g | 2 h | 0.091 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_woman_60kg_40g | 4 h | 0.061 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_woman_60kg_40g | 6 h | 0.031 | g/dL | [[Terpstra2020,Jones2010]]
- widmark_example_woman_60kg_40g | 8 h | 0.001 | g/dL | [[Terpstra2020,Jones2010]]

Gastric first-pass metabolism, women versus men without dependence:
- first_pass_women_vs_men | non-dependent | 23 | % of men | [[Frezza1990]]
- gastric_ADH_women_vs_men | non-dependent | 59 | % of men | [[Frezza1990]]

BAC effect ladder; the g/dL values are my conversion:
- BAC_effect_ladder | distinguishable effects | 6 | mM (≈0.03 g/dL) | [[Abrahao2017]]
- BAC_effect_ladder | anxiolysis/euphoria | 12 | mM (≈0.055 g/dL) | [[Abrahao2017]]
- BAC_effect_ladder | legal intoxication, slowed reactions | 18 | mM (≈0.08 g/dL) | [[Abrahao2017]]
- BAC_effect_ladder | escalating sedation | 50 | mM (≈0.23 g/dL) | [[Abrahao2017]]
- BAC_effect_ladder | coma/respiratory depression risk | >50 | mM (>0.23 g/dL) | [[Abrahao2017]]

Fatal crash relative risk at BAC 0.09%:
- crash_RR_at_BAC_0.09 | drivers ≥35 | 11.4 | relative risk | [[Zador2000]]
- crash_RR_at_BAC_0.09 | male drivers 16–20 | 51.9 | relative risk | [[Zador2000]]

Alcohol poisoning deaths, US, 2010–2012:
- alcohol_poisoning_deaths_US | per year 2010–2012 | 2221 | deaths | [[Kanny2015MMWR]]
- alcohol_poisoning_deaths_US | per day | 6 | deaths | [[Kanny2015MMWR]]

Opioid overdose deaths with co-involvement:
- opioid_OD_alcohol_coinvolvement | 1999 | 12.4 | % | [[Tori2020]]
- opioid_OD_alcohol_coinvolvement | 2017 | 14.7 | % | [[Tori2020]]
- opioid_OD_benzo_coinvolvement | 1999 | 8.7 | % | [[Tori2020]]
- opioid_OD_benzo_coinvolvement | 2017 | 21.0 | % | [[Tori2020]]

Receptor and PET anchors for the up/down-regulation animation:
- NMDA_current_inhibition | 50 mM ethanol | 61 | % reduction | [[Lovinger1989]]
- kainate_current_inhibition | 50 mM ethanol | 18 | % reduction | [[Lovinger1989]]
- quisqualate_current_inhibition | 50 mM ethanol | 15 | % reduction | [[Lovinger1989]]
- GABAA_alpha1_surface | chronic ethanol | down | direction | [[Kumar2009]]
- GABAA_alpha4_expression | chronic ethanol (14 days) | up | direction | [[Kumar2009]]
- NMDA_receptor | chronic ethanol (tolerance) | up | direction | [[TsaiCoyle1998]]
- D2_availability | controls | 2.7 | Bmax/Kd | [[Volkow1996]]
- D2_availability | AUD | 2.1 | Bmax/Kd | [[Volkow1996]]

Genetics icon arrays:
- heritability_AUD | twin/adoption | 49 | % | [[Verhulst2015]]
- shared_environment_AUD | twin/adoption | 10 | % | [[Verhulst2015]]
- SNP_heritability_PAU | European GWAS | 6.8 | % | [[Zhou2020NatNeurosci]]
- PRS_variance_explained_AUD | combined PRS | 2.5–3.5 | % | [[Barr2020]]
- GWAS_risk_variants | 2019 (N=274,424) | 18 | loci | [[Kranzler2019]]
- GWAS_risk_variants | 2020 (N=435,563) | 29 | variants | [[Zhou2020NatNeurosci]]
- GWAS_risk_variants | 2023 (N=1,079,947) | 110 | variants | [[Zhou2023NatMed]]
- East_Asians_flushing | population | 36 | % | [[Brooks2009]]
- ALDH2_deficient_world | population | 8 | % | [[Brooks2009]]
- esophageal_cancer_OR_ALDH2 | *1*2 vs *1*1 | 3.19 | OR | [[Lewis2005]]
- esophageal_cancer_OR_ALDH2 | *2*2 vs *1*1 | 0.36 | OR | [[Lewis2005]]
- ALDH2_heterozygotes_in_Japanese_AUD | 1979 | 3 | % | [[Brooks2009]]
- ALDH2_heterozygotes_in_Japanese_AUD | 1986 | 8 | % | [[Brooks2009]]
- ALDH2_heterozygotes_in_Japanese_AUD | 1992 | 13 | % | [[Brooks2009]]

Age at first drink, lifetime dependence (NLAES):
- lifetime_dependence_by_onset_age | ≤14 y | 40 | % (more than) | [[GrantDawson1997]]
- lifetime_dependence_by_onset_age | ≥20 y | 10 | % (about) | [[GrantDawson1997]]

Price elasticities:
- price_elasticity | beer | −0.46 | elasticity | [[Wagenaar2009]]
- price_elasticity | wine | −0.69 | elasticity | [[Wagenaar2009]]
- price_elasticity | spirits | −0.80 | elasticity | [[Wagenaar2009]]

Brain-ageing equivalents (UK Biobank):
- brain_aging_equivalent | 1→2 daily units | 2 | years | [[Daviet2022]]
- brain_aging_equivalent | 2→3 daily units | 3.5 | years | [[Daviet2022]]

## Open questions and controversies
- **How much does gastric first-pass metabolism matter?** Frezza found that women's first-pass metabolism was 23% of men's and argued it explains part of women's higher BAC [[Frezza1990]]. Cederbaum calls its overall significance "controversial" and stresses dose-, time- and flow-dependence [[Cederbaum2012,Norberg2003]]. Status: unresolved; body water is the better-established factor.
- **One-compartment zero-order model versus more complex models.** Forensic practice uses Widmark-type zero-order calculations [[Jones2010,Posey2007]]. Norberg and colleagues argue that multi-compartment models describe ethanol disposition better [[Norberg2003]]. Searle disputes a fixed ±21% error band [[Searle2015]]. Status: any BAC estimate is approximate. That is why the companion's calculator must never judge fitness to drive.
- **Is there any health-protective dose?** GBD 2016 put the harm-minimising level at zero [[GBD2016Alcohol]]. GBD 2020 found a J-shaped curve after age 40, with region-dependent minimum-risk levels above zero [[GBD2020Alcohol]]. Bias-adjusted cohort meta-analysis and Mendelian randomisation do not support a protective effect for mortality or stroke [[Zhao2023JAMANO,Millwood2019,Holmes2014BMJ]]. Status: the research does not support drinking for health. Teaching should not present any amount as beneficial.
- **CRF as a treatment target.** Animal data make CRF1 receptors central to dependence-driven drinking [[HeiligKoob2007,Koob2014]]. The CRF antagonist trials belong to pass H (research frontier) and are not reviewed here. Status: mechanism (Early evidence); translation to humans not established.
- **Habit versus goal-directed drinking.** The ventral-to-dorsal striatum shift is well supported in animals [[EverittRobbins2005]]. Human evidence is still mostly cross-sectional fMRI, such as 31 participants in Vollstädt-Klein 2010 [[VollstadtKlein2010]]. Status: (Early evidence) in humans.
- **Age at first drink: cause or marker?** The links hold after adjusting for family history [[Hingson2006,GrantDawson1997]]. Twin and adoption data show shared genetic and environmental risk [[Verhulst2015,Kendler2015Adoption]]. Status: the association is established; a purely causal role is not.
- **Clinical value of polygenic scores.** Cross-ancestry scores are improving [[Zhou2023NatMed]], but current predictive value is "modest, at best" [[Barr2020]]. Status: research tools only; no diagnostic or screening use.
- **Gene–environment interaction for ALDH2.** ALDH2*2 protection weakened in Japan as drinking norms changed [[Brooks2009]]. Diagnostic criteria, recruitment and ethnicity also moderate its effect [[Luczak2006]]. Status: protection is environment-dependent.

## Sources
- [Jones2010] Jones AW. Evidence-based survey of the elimination rates of ethanol from blood with applications in forensic casework. Forensic Sci Int. 2010;200(1-3):1-20. PMID 20304569; doi:10.1016/j.forsciint.2010.02.021. (validated: PubMed)
- [Jones2019WIREs] Jones AW. Alcohol, its absorption, distribution, metabolism, and excretion in the body and pharmacokinetic calculations. WIREs Forensic Sci. 2019;1(5):e1340. doi:10.1002/wfs2.1340. Not indexed in PubMed. (validated: Crossref)
- [Searle2015] Searle J. Alcohol calculations and their uncertainty. Med Sci Law. 2015;55(1):58-64. PMID 24644224; PMCID PMC4361698; doi:10.1177/0025802414524385. (validated: PubMed)
- [Posey2007] Posey D, Mozayani A. The estimation of blood alcohol concentration: Widmark revisited. Forensic Sci Med Pathol. 2007;3(1):33-9. PMID 25868887; doi:10.1385/FSMP:3:1:33. (validated: PubMed)
- [Frezza1990] Frezza M, di Padova C, Pozzato G, Terpin M, Baraona E, Lieber CS. High blood alcohol levels in women. The role of decreased gastric alcohol dehydrogenase activity and first-pass metabolism. N Engl J Med. 1990;322(2):95-9. PMID 2248624; doi:10.1056/NEJM199001113220205. (validated: PubMed)
- [Norberg2003] Norberg A, Jones AW, Hahn RG, Gabrielsson JL. Role of variability in explaining ethanol pharmacokinetics: research and forensic applications. Clin Pharmacokinet. 2003;42(1):1-31. PMID 12489977; doi:10.2165/00003088-200342010-00001. (validated: PubMed)
- [Jones1994Food] Jones AW, Jönsson KA. Food-induced lowering of blood-ethanol profiles and increased rate of elimination immediately after a meal. J Forensic Sci. 1994;39(4):1084-93. PMID 8064267; doi:10.1520/JFS13687J. (validated: PubMed)
- [Jones1992Detox] Jones AW, Sternebring B. Kinetics of ethanol and methanol in alcoholics during detoxification. Alcohol Alcohol. 1992;27(6):641-7. PMID 1292437; doi:10.1093/oxfordjournals.alcalc.a045315. (validated: PubMed)
- [Maskell2019] Maskell PD, Jones AW, Savage A, Scott-Ham M. Evidence based survey of the distribution volume of ethanol: Comparison of empirically determined values with anthropometric measures. Forensic Sci Int. 2019;294:124-131. PMID 30553124; doi:10.1016/j.forsciint.2018.10.033. (validated: PubMed)
- [Terpstra2020] Terpstra C, Scholey A, Verster JC, Benson S. Prevalence of Hangover Resistance According to Two Methods for Calculating Estimated Blood Alcohol Concentration (eBAC). J Clin Med. 2020;9(9):2823. PMID 32878265; PMCID PMC7564564; doi:10.3390/jcm9092823. (validated: PubMed)
- [Cederbaum2012] Cederbaum AI. Alcohol metabolism. Clin Liver Dis. 2012;16(4):667-85. PMID 23101976; PMCID PMC3484320; doi:10.1016/j.cld.2012.08.002. (validated: PubMed)
- [Zakhari2006] Zakhari S. Overview: how is alcohol metabolized by the body? Alcohol Res Health. 2006;29(4):245-54. PMID 17718403; PMCID PMC6527027. (validated: PubMed)
- [Watson1980] Watson PE, Watson ID, Batt RD. Total body water volumes for adult males and females estimated from simple anthropometric measurements. Am J Clin Nutr. 1980;33(1):27-39. PMID 6986753; doi:10.1093/ajcn/33.1.27. (validated: PubMed)
- [Jung2014] Jung YC, Namkoong K. Alcohol: intoxication and poisoning - diagnosis and treatment. Handb Clin Neurol. 2014;125:115-21. PMID 25307571; doi:10.1016/B978-0-444-62619-6.00007-0. (validated: PubMed)
- [Parmar2026StatPearls] Parmar P, Schaffer DH, Kok SJ. Ethanol Toxicity. In: StatPearls. Treasure Island (FL): StatPearls Publishing; 2026 Jan. NCBI Bookshelf NBK557381. PMID 32491313. (validated: PubMed)
- [Kanny2015MMWR] Kanny D, Brewer RD, Mesnick JB, Paulozzi LJ, Naimi TS, Lu H. Vital signs: alcohol poisoning deaths - United States, 2010-2012. MMWR Morb Mortal Wkly Rep. 2015;63(53):1238-42. PMID 25577989; PMCID PMC4646044. (validated: PubMed)
- [Hon2018] Hon KL, Leung AK, Cheung E, Lee B, Tsang MM, Torres AR. An overview of exposure to ethanol-containing substances and ethanol intoxication in children based on three illustrated cases. Drugs Context. 2018;7:212512. PMID 29344053; PMCID PMC5764489; doi:10.7573/dic.212512. (validated: PubMed)
- [Tori2020] Tori ME, Larochelle MR, Naimi TS. Alcohol or Benzodiazepine Co-involvement With Opioid Overdose Deaths in the United States, 1999-2017. JAMA Netw Open. 2020;3(4):e202361. PMID 32271389; PMCID PMC7146101; doi:10.1001/jamanetworkopen.2020.2361. (validated: PubMed)
- [Zador2000] Zador PL, Krawchuk SA, Voas RB. Alcohol-related relative risk of driver fatalities and driver involvement in fatal crashes in relation to driver age and gender: an update using 1996 data. J Stud Alcohol. 2000;61(3):387-95. PMID 10807209; doi:10.15288/jsa.2000.61.387. (validated: PubMed)
- [Kalinowski2016] Kalinowski A, Humphreys K. Governmental standard drink definitions and low-risk alcohol consumption guidelines in 37 countries. Addiction. 2016;111(7):1293-8. PMID 27073140; doi:10.1111/add.13341. (validated: PubMed)
- [Lieber2004MEOS] Lieber CS. The discovery of the microsomal ethanol oxidizing system and its physiologic and pathologic role. Drug Metab Rev. 2004;36(3-4):511-29. PMID 15554233; doi:10.1081/dmr-200033441. (validated: PubMed)
- [Lieber2004Fatty] Lieber CS. Alcoholic fatty liver: its pathogenesis and mechanism of progression to inflammation and fibrosis. Alcohol. 2004;34(1):9-19. PMID 15670660; doi:10.1016/j.alcohol.2004.07.008. (validated: PubMed)
- [Seitz2007] Seitz HK, Stickel F. Molecular mechanisms of alcohol-mediated carcinogenesis. Nat Rev Cancer. 2007;7(8):599-612. PMID 17646865; doi:10.1038/nrc2191. (validated: PubMed)
- [Brooks2009] Brooks PJ, Enoch MA, Goldman D, Li TK, Yokoyama A. The alcohol flushing response: an unrecognized risk factor for esophageal cancer from alcohol consumption. PLoS Med. 2009;6(3):e50. PMID 19320537; PMCID PMC2659709; doi:10.1371/journal.pmed.1000050. (validated: PubMed)
- [Edenberg2007] Edenberg HJ. The genetics of alcohol metabolism: role of alcohol dehydrogenase and aldehyde dehydrogenase variants. Alcohol Res Health. 2007;30(1):5-13. PMID 17718394; PMCID PMC3860432. (validated: PubMed)
- [Li2009ALDH2] Li H, Borinskaya S, Yoshimura K, Kal'ina N, Marusin A, Stepanov VA, et al. Refined geographic distribution of the oriental ALDH2*504Lys (nee 487Lys) variant. Ann Hum Genet. 2009;73(Pt 3):335-45. PMID 19456322; PMCID PMC2846302; doi:10.1111/j.1469-1809.2009.00517.x. (validated: PubMed)
- [Luczak2006] Luczak SE, Glatt SJ, Wall TL. Meta-analyses of ALDH2 and ADH1B with alcohol dependence in Asians. Psychol Bull. 2006;132(4):607-21. PMID 16822169; doi:10.1037/0033-2909.132.4.607. (validated: PubMed)
- [Li2011ADH1B] Li D, Zhao H, Gelernter J. Strong association of the alcohol dehydrogenase 1B gene (ADH1B) with alcohol dependence and alcohol-induced medical diseases. Biol Psychiatry. 2011;70(6):504-12. PMID 21497796; PMCID PMC3142297; doi:10.1016/j.biopsych.2011.02.024. (validated: PubMed)
- [Lewis2005] Lewis SJ, Smith GD. Alcohol, ALDH2, and esophageal cancer: a meta-analysis which illustrates the potentials and limitations of a Mendelian randomization approach. Cancer Epidemiol Biomarkers Prev. 2005;14(8):1967-71. PMID 16103445; doi:10.1158/1055-9965.EPI-05-0196. (validated: PubMed)
- [Millwood2019] Millwood IY, Walters RG, Mei XW, Guo Y, Yang L, Bian Z, et al. Conventional and genetic evidence on alcohol and vascular disease aetiology: a prospective study of 500 000 men and women in China. Lancet. 2019;393(10183):1831-1842. PMID 30955975; PMCID PMC6497989; doi:10.1016/S0140-6736(18)31772-0. (validated: PubMed)
- [Holmes2014BMJ] Holmes MV, Dale CE, Zuccolo L, Silverwood RJ, Guo Y, Ye Z, et al. Association between alcohol and cardiovascular disease: Mendelian randomisation analysis based on individual participant data. BMJ. 2014;349:g4164. PMID 25011450; PMCID PMC4091648; doi:10.1136/bmj.g4164. (validated: PubMed)
- [Verhulst2015] Verhulst B, Neale MC, Kendler KS. The heritability of alcohol use disorders: a meta-analysis of twin and adoption studies. Psychol Med. 2015;45(5):1061-72. PMID 25171596; PMCID PMC4345133; doi:10.1017/S0033291714002165. (validated: PubMed)
- [Kendler2015Adoption] Kendler KS, Ji J, Edwards AC, Ohlsson H, Sundquist J, Sundquist K. An extended Swedish national adoption study of alcohol use disorder. JAMA Psychiatry. 2015;72(3):211-8. PMID 25565339; PMCID PMC4351126; doi:10.1001/jamapsychiatry.2014.2138. (validated: PubMed)
- [Zhou2020NatNeurosci] Zhou H, Sealock JM, Sanchez-Roige S, Clarke TK, Levey DF, Cheng Z, et al. Genome-wide meta-analysis of problematic alcohol use in 435,563 individuals yields insights into biology and relationships with other traits. Nat Neurosci. 2020;23(7):809-818. PMID 32451486; PMCID PMC7485556; doi:10.1038/s41593-020-0643-5. (validated: PubMed)
- [Zhou2023NatMed] Zhou H, Kember RL, Deak JD, Xu H, Toikumo S, Yuan K, et al. Multi-ancestry study of the genetics of problematic alcohol use in over 1 million individuals. Nat Med. 2023;29(12):3184-3192. PMID 38062264; PMCID PMC10719093; doi:10.1038/s41591-023-02653-5. (validated: PubMed)
- [Kranzler2019] Kranzler HR, Zhou H, Kember RL, Vickers Smith R, Justice AC, Damrauer S, et al. Genome-wide association study of alcohol consumption and use disorder in 274,424 individuals from multiple populations. Nat Commun. 2019;10(1):1499. PMID 30940813; PMCID PMC6445072; doi:10.1038/s41467-019-09480-8. (validated: PubMed)
- [Walters2018] Walters RK, Polimanti R, Johnson EC, McClintick JN, Adams MJ, Adkins AE, et al. Transancestral GWAS of alcohol dependence reveals common genetic underpinnings with psychiatric disorders. Nat Neurosci. 2018;21(12):1656-1669. PMID 30482948; PMCID PMC6430207; doi:10.1038/s41593-018-0275-1. (validated: PubMed)
- [Barr2020] Barr PB, Ksinan A, Su J, Johnson EC, Meyers JL, Wetherill L, et al. Using polygenic scores for identifying individuals at increased risk of substance use disorders in clinical and population samples. Transl Psychiatry. 2020;10(1):196. PMID 32555147; PMCID PMC7303212; doi:10.1038/s41398-020-00865-8. (validated: PubMed)
- [Hingson2006] Hingson RW, Heeren T, Winter MR. Age at drinking onset and alcohol dependence: age at onset, duration, and severity. Arch Pediatr Adolesc Med. 2006;160(7):739-46. PMID 16818840; doi:10.1001/archpedi.160.7.739. (validated: PubMed)
- [GrantDawson1997] Grant BF, Dawson DA. Age at onset of alcohol use and its association with DSM-IV alcohol abuse and dependence: results from the National Longitudinal Alcohol Epidemiologic Survey. J Subst Abuse. 1997;9:103-10. PMID 9494942; doi:10.1016/s0899-3289(97)90009-2. (validated: PubMed)
- [Wagenaar2009] Wagenaar AC, Salois MJ, Komro KA. Effects of beverage alcohol price and tax levels on drinking: a meta-analysis of 1003 estimates from 112 studies. Addiction. 2009;104(2):179-90. PMID 19149811; doi:10.1111/j.1360-0443.2008.02438.x. (validated: PubMed)
- [Wagenaar2010] Wagenaar AC, Tobler AL, Komro KA. Effects of alcohol tax and price policies on morbidity and mortality: a systematic review. Am J Public Health. 2010;100(11):2270-8. PMID 20864710; PMCID PMC2951962; doi:10.2105/AJPH.2009.186007. (validated: PubMed)
- [Popova2009] Popova S, Giesbrecht N, Bekmuradov D, Patra J. Hours and days of sale and density of alcohol outlets: impacts on alcohol consumption and damage: a systematic review. Alcohol Alcohol. 2009;44(5):500-16. PMID 19734159; doi:10.1093/alcalc/agp054. (validated: PubMed)
- [Boileau2003] Boileau I, Assaad JM, Pihl RO, Benkelfat C, Leyton M, Diksic M, et al. Alcohol promotes dopamine release in the human nucleus accumbens. Synapse. 2003;49(4):226-31. PMID 12827641; doi:10.1002/syn.10226. (validated: PubMed)
- [Mitchell2012] Mitchell JM, O'Neil JP, Janabi M, Marks SM, Jagust WJ, Fields HL. Alcohol consumption induces endogenous opioid release in the human orbitofrontal cortex and nucleus accumbens. Sci Transl Med. 2012;4(116):116ra6. PMID 22238334; doi:10.1126/scitranslmed.3002902. (validated: PubMed)
- [KoobLeMoal2001] Koob GF, Le Moal M. Drug addiction, dysregulation of reward, and allostasis. Neuropsychopharmacology. 2001;24(2):97-129. PMID 11120394; doi:10.1016/S0893-133X(00)00195-0. (validated: PubMed)
- [HeiligKoob2007] Heilig M, Koob GF. A key role for corticotropin-releasing factor in alcohol dependence. Trends Neurosci. 2007;30(8):399-406. PMID 17629579; PMCID PMC2747092; doi:10.1016/j.tins.2007.06.006. (validated: PubMed)
- [EverittRobbins2005] Everitt BJ, Robbins TW. Neural systems of reinforcement for drug addiction: from actions to habits to compulsion. Nat Neurosci. 2005;8(11):1481-9. PMID 16251991; doi:10.1038/nn1579. (validated: PubMed)
- [VollstadtKlein2010] Vollstädt-Klein S, Wichert S, Rabinstein J, Bühler M, Klein O, Ende G, et al. Initial, habitual and compulsive alcohol use is characterized by a shift of cue processing from ventral to dorsal striatum. Addiction. 2010;105(10):1741-9. PMID 20670348; doi:10.1111/j.1360-0443.2010.03022.x. (validated: PubMed)
- [Volkow1996] Volkow ND, Wang GJ, Fowler JS, Logan J, Hitzemann R, Ding YS, et al. Decreases in dopamine receptors but not in dopamine transporters in alcoholics. Alcohol Clin Exp Res. 1996;20(9):1594-8. PMID 8986209; doi:10.1111/j.1530-0277.1996.tb05936.x. (validated: PubMed)
- [Abrahao2017] Abrahao KP, Salinas AG, Lovinger DM. Alcohol and the Brain: Neuronal Molecular Targets, Synapses, and Circuits. Neuron. 2017;96(6):1223-1238. PMID 29268093; PMCID PMC6566861; doi:10.1016/j.neuron.2017.10.032. (validated: PubMed)
- [Lovinger1989] Lovinger DM, White G, Weight FF. Ethanol inhibits NMDA-activated ion current in hippocampal neurons. Science. 1989;243(4899):1721-4. PMID 2467382; doi:10.1126/science.2467382. (validated: PubMed)
- [Kumar2009] Kumar S, Porcu P, Werner DF, Matthews DB, Diaz-Granados JL, Helfand RS, et al. The role of GABA(A) receptors in the acute and chronic effects of ethanol: a decade of progress. Psychopharmacology (Berl). 2009;205(4):529-64. PMID 19455309; PMCID PMC2814770; doi:10.1007/s00213-009-1562-z. (validated: PubMed)
- [TsaiCoyle1998] Tsai G, Coyle JT. The role of glutamatergic neurotransmission in the pathophysiology of alcoholism. Annu Rev Med. 1998;49:173-84. PMID 9509257; doi:10.1146/annurev.med.49.1.173. (validated: PubMed)
- [Becker1998] Becker HC. Kindling in alcohol withdrawal. Alcohol Health Res World. 1998;22(1):25-33. PMID 15706729; PMCID PMC6761822. (validated: PubMed)
- [Koob2014] Koob GF. Neurocircuitry of alcohol addiction: synthesis from animal models. Handb Clin Neurol. 2014;125:33-54. PMID 25307567; doi:10.1016/B978-0-444-62619-6.00003-3. (validated: PubMed)
- [KoobVolkow2016] Koob GF, Volkow ND. Neurobiology of addiction: a neurocircuitry analysis. Lancet Psychiatry. 2016;3(8):760-773. PMID 27475769; PMCID PMC6135092; doi:10.1016/S2215-0366(16)00104-8. (validated: PubMed)
- [Carvalho2019Lancet] Carvalho AF, Heilig M, Perez A, Probst C, Rehm J. Alcohol use disorders. Lancet. 2019;394(10200):781-792. PMID 31478502; doi:10.1016/S0140-6736(19)31775-1. (validated: PubMed)
- [GBD2016Alcohol] GBD 2016 Alcohol Collaborators. Alcohol use and burden for 195 countries and territories, 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet. 2018;392(10152):1015-1035. PMID 30146330; PMCID PMC6148333; doi:10.1016/S0140-6736(18)31310-2. (validated: PubMed)
- [GBD2020Alcohol] GBD 2020 Alcohol Collaborators. Population-level risks of alcohol consumption by amount, geography, age, sex, and year: a systematic analysis for the Global Burden of Disease Study 2020. Lancet. 2022;400(10347):185-235. PMID 35843246; PMCID PMC9289789; doi:10.1016/S0140-6736(22)00847-9. (validated: PubMed)
- [Zahr2017] Zahr NM, Pfefferbaum A. Alcohol's Effects on the Brain: Neuroimaging Results in Humans and Animal Models. Alcohol Res. 2017;38(2):183-206. PMID 28988573; PMCID PMC5513685; doi:10.35946/arcr.v38.2.04. (validated: PubMed)
- [Topiwala2017] Topiwala A, Allan CL, Valkanova V, Zsoldos E, Filippini N, Sexton C, et al. Moderate alcohol consumption as risk factor for adverse brain outcomes and cognitive decline: longitudinal cohort study. BMJ. 2017;357:j2353. PMID 28588063; PMCID PMC5460586; doi:10.1136/bmj.j2353. (validated: PubMed)
- [Daviet2022] Daviet R, Aydogan G, Jagannathan K, Spilka N, Koellinger PD, Kranzler HR, et al. Associations between alcohol consumption and gray and white matter volumes in the UK Biobank. Nat Commun. 2022;13(1):1175. PMID 35246521; PMCID PMC8897479; doi:10.1038/s41467-022-28735-5. (validated: PubMed)
- [Pfefferbaum1995] Pfefferbaum A, Sullivan EV, Mathalon DH, Shear PK, Rosenbloom MJ, Lim KO. Longitudinal changes in magnetic resonance imaging brain volumes in abstinent and relapsed alcoholics. Alcohol Clin Exp Res. 1995;19(5):1177-91. PMID 8561288; doi:10.1111/j.1530-0277.1995.tb01598.x. (validated: PubMed)
- [Zhao2023JAMANO] Zhao J, Stockwell T, Naimi T, Churchill S, Clay J, Sherk A. Association Between Daily Alcohol Intake and Risk of All-Cause Mortality: A Systematic Review and Meta-analyses. JAMA Netw Open. 2023;6(3):e236185. PMID 37000449; PMCID PMC10066463; doi:10.1001/jamanetworkopen.2023.6185. (validated: PubMed)

## Provenance
- **Validation.** 64 of 65 sources were validated by PubMed E-utilities esummary (authors, title, journal, year, volume, pages, PMID, PMCID, DOI). One (Jones2019WIREs) was validated on Crossref, because the journal is not indexed in PubMed; its abstract came from the Crossref record. Searches used Europe PMC.
- **Full texts read** (open access, via Europe PMC fullTextXML or PMC efetch): Abrahao2017 (mM effect ladder), Cederbaum2012 (7 g/h, NADH, CYP2E1 share, ALDH2 15–40%), Zakhari2006, Edenberg2007 (ADH1B turnover, 22 mM equivalence, four-fold elimination variation), Kumar2009 (subunit changes), KoobVolkow2016, Brooks2009 (36%, 540 million, 12-fold, 58–69%, questionnaire accuracy, Japanese trend), Terpstra2020 (Widmark 0.68/0.55), Zhou2020NatNeurosci (h2 0.068, rg MDD 0.39), Daviet2022 (ageing equivalents), Kanny2015MMWR (signs, contributing causes) and Hon2018. All other numbers come from PubMed or Europe PMC abstracts.
- **Not accessible:** the StatPearls Bookshelf page (browser check; only its abstract was used); the Posey2007, Jones2010 and Hingson2006 full texts (paywalled; only abstract numbers used). The commonly quoted Hingson figure of 47% dependence with onset before 14 versus 9% at 21 or later is not in the abstract, so I left it out.
- **Dropped for lack of a validated primary source:**
  - A tiered 0.02–0.40 g/dL BAC effects table (the NHTSA/NIAAA web tables).
  - The US 14 g standard drink.
  - The IARC Monograph 100E/Secretan 2009 summary: no abstract to read. Brooks2009's account of the 2007 IARC conclusions is cited instead.
  - Cotton 1979 family-incidence review: no abstract.
- **My own calculations, labelled in the text:** the mM to g/dL conversions (1 mM ≈ 4.6 mg/dL, consistent with Edenberg's 100 mg/100 mL ≈ 22 mM) and the illustrative Widmark curves (40 g ethanol; 70 kg man, r 0.68; 60 kg woman, r 0.55; β 0.015 g/dL/h; instant absorption).
- **Shared canonical keys used:** KoobVolkow2016, Carvalho2019Lancet, GBD2016Alcohol and GBD2020Alcohol, each validated on PubMed. No PMIDs here match entries in other companions' sources.json files, so all other keys are new.
- **Not covered, per scope:** withdrawal management (D), medicines (E), organ harms (G) and research-frontier drug trials (H) are left to those passes. Here they appear only as mechanism.
