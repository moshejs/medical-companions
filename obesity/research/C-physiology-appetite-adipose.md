# C · Physiology: appetite, adipose tissue & energy balance

Pass date: 2026-11-11. Modules served: appetite, adipose, adaptation, glp.

This pass covers how the brain and gut control hunger and fullness, how fat tissue grows, signals and becomes inflamed, and why the body pushes back after weight loss. Every number below comes from the abstract of the cited paper (PubMed efetch) or from the US label (openFDA). Trial and cohort results are population averages, not predictions for any one person.

Access notes:
- Read from PubMed abstracts only. Several classic papers have no abstract in PubMed: Farooqi 1999 (leptin therapy case), Gibbs 1973 (CCK in rats). For these, only the claim in the title is used, or the fact is carried by a second source that does have an abstract.
- Sumithran 2011 reports the direction and P value of each hormone change in the abstract, but not the size. The animation rows for that study therefore give direction only (above or below baseline), not percentages.
- The openFDA Wegovy record is a repackager listing (A-S Medication Solutions) of Novo Nordisk's NDA215256 label, effective 2024-04-23. It was the only Wegovy record the API returned. The pharmacology sections (12.1-12.3) are the manufacturer's text.
- The often-quoted "GLP-1 half-life of about 2 minutes" is not stated as a number in the abstracts I read. The nearest sourced figure is "over 50% metabolized within 2 min" for infused GLP-1 in rats [[Kieffer1995]]. The bullets use that wording.
- Shared keys checked and used: Sumithran2011 (PMID 22029981), Rubino2025Commission (39824205), FDA-Wegovy, FDA-Zepbound. Wilding2021STEP1 is not cited. The STEP 1 off-treatment extension is cited as Wilding2022STEP1ext, a separate paper.
- Safety note for builders: wherever this material touches dieting or weight loss, the page needs this callout. "If eating or weight causes you distress, or you restrict, binge or purge, talk to a clinician or an eating-disorder service." Diets named here, such as the 600 kcal/day research diet in Lim 2011, describe what a study did. They are not advice.

## Findings

### appetite · The hypothalamic control system
- Energy homeostasis matches energy intake to energy expenditure over time. The brain combines hormone and nerve signals about the body's fuel stores, and when key signalling molecules are lost through mutation, rodents (and, rarely, humans) develop severe obesity [[Schwartz2000]].
- The arcuate nucleus of the hypothalamus contains two opposing neuron groups. Pro-opiomelanocortin (POMC) neurons reduce food intake. Neuropeptide Y/agouti-related protein (NPY/AgRP) neurons increase it. Both groups carry leptin receptors [[Cowley2001,Aponte2011]].
- Leptin speeds the firing of POMC neurons in two ways: it depolarises them through a nonspecific cation channel, and it reduces inhibition from neighbouring NPY/GABA neurons [[Cowley2001]].
- In mice, switching on only about 800 AgRP neurons with light (optogenetics) triggered intense feeding within minutes. Stimulating POMC neurons reduced food intake and body weight, and this effect needed melanocortin receptor signalling [[Aponte2011]].
- Chemogenetic (DREADD) activation of AgRP neurons in mice quickly increased feeding, lowered energy expenditure and in time increased fat stores. Silencing them reduced eating in hungry mice. AgRP activity is therefore both necessary and sufficient for feeding [[Krashes2011]].
- POMC neurons release alpha-MSH, which activates melanocortin-4 receptors (MC4R). Mice lacking MC4R develop a maturity-onset obesity syndrome with hyperphagia (excessive hunger and eating), hyperinsulinaemia and hyperglycaemia [[Huszar1997]].
- Restoring MC4R only in the paraventricular hypothalamus (PVH) and part of the amygdala of MC4R-null mice prevented 60% of their obesity. It fully corrected overeating but not the low energy expenditure. Different melanocortin pathways therefore control intake and expenditure [[Balthasar2005]].
- In people, MC4R deficiency is the most common monogenic form of obesity. Of 500 probands with severe childhood obesity, 29 (5.8%) carried MC4R mutations. Carriers had hyperphagia, increased lean mass, faster linear growth and severe hyperinsulinaemia. Inheritance was codominant [[Farooqi2003MC4R]].
- Setmelanotide, an MC4R agonist, was tested in single-arm phase 3 trials in people aged 6 years and over with POMC or LEPR deficiency. At about 1 year, ≥10% weight loss was reached by 8/10 (80%) in the POMC trial and 5/11 (45%) in the LEPR trial. "Most hunger" scores fell by 27.1% and 43.7% [[Clement2020]].
- The nucleus tractus solitarius (NTS) in the hindbrain combines gut signals carried by the vagus nerve, blood-borne hormone and nutrient signals, and signals coming down from the forebrain. It sends out commands that shape eating, autonomic and endocrine responses. Control of appetite is spread across the brain, not housed in the hypothalamus alone [[Grill2012]].

### appetite · Leptin, the fat-mass signal, and leptin resistance
- Leptin is the product of the obese (*ob*) gene, which was positionally cloned in the mouse together with its human homologue in 1994. Mice with *ob* mutations develop profound obesity and type 2 diabetes [[Zhang1994]].
- Serum leptin rises with fat mass. In 139 people with obesity, mean leptin was 31.3 ± 24.1 ng/mL, against 7.5 ± 9.3 ng/mL in 136 people without obesity. Leptin correlated with percentage body fat (r = 0.85) [[Considine1996]].
- In seven people with obesity who lost weight, serum leptin and adipocyte *ob* mRNA fell, then rose again while the lower weight was held. The authors concluded that most people with obesity are insensitive to their own leptin [[Considine1996]].
- Two severely affected children from one consanguineous family had very low leptin despite high fat mass. Both carried a homozygous frameshift mutation (a single guanine deleted at codon 133) in the leptin gene. This was the first genetic evidence that leptin regulates energy balance in humans [[Montague1997]].
- Giving leptin to people with congenital leptin deficiency, and to leptin-deficient mice, effectively reduces hyperphagia and obesity [[Cowley2001,Farooqi1999]].
- Common obesity is different. In a randomised dose-escalation trial in adults with BMI 27.6-36.0, 24-week weight change ranged from -0.7 kg (0.01 mg/kg leptin, n = 6) to -7.1 kg (0.30 mg/kg, n = 8). Baseline leptin did not predict response [[Heymsfield1999]].
- One proposed mechanism for leptin resistance is limited transport into the brain. Serum leptin was 318% higher in people with obesity (40.2 vs 9.6 ng/mL), but CSF leptin was only about 30% higher (0.337 vs 0.259 ng/mL). The CSF/serum ratio was 4.3-fold lower in obesity (0.011 vs 0.047) [[Caro1996]].
- "Leptin resistance" covers several different phenomena. Obesity itself triggers cellular processes that weaken leptin signalling, which makes it hard to tell which defects cause weight gain and which result from it [[Myers2010]]. (Established, for the concept; mechanisms still debated)
- Leptin may matter most as a starvation signal. In fasting mice, preventing the fall in leptin largely blunted the changes in the gonadal, adrenal and thyroid axes, but had little effect on body weight, glucose or ketones [[Ahima1996]].

### appetite · Ghrelin, the hunger hormone from the stomach
- Ghrelin was identified in 1999 as the natural ligand of the growth-hormone secretagogue receptor. It is a 28-amino-acid peptide from the stomach, and its activity depends on an n-octanoyl group attached at serine 3 [[Kojima1999]].
- In rodents, ghrelin given into the brain increased food intake and body weight in a dose-dependent way. Daily peripheral ghrelin caused weight gain by reducing fat use. Serum ghrelin rose with fasting and fell after re-feeding [[Tschop2000]].
- Ghrelin works on the brain's feeding circuits: injected into the brain, it activated NPY and AgRP neurons, and blocking NPY/AgRP abolished ghrelin-induced feeding. Ghrelin also blocked leptin's suppression of feeding [[Nakazato2001]].
- In a randomised crossover study in nine healthy volunteers, intravenous ghrelin (5.0 pmol/kg/min) raised buffet energy intake by a mean 28 ± 3.9% compared with saline, and every participant ate more. Gastric emptying was unchanged [[Wren2001]].
- Across 24 hours (38 blood samples, 10 healthy adults on fixed meals), plasma ghrelin rose nearly twofold just before each meal and fell to its trough within 1 hour after eating. This pattern was the reverse of insulin's [[Cummings2001]].
- Between meals, ghrelin followed a daily rhythm in phase with leptin: it peaked at 01:00 and was lowest at 09:00 [[Cummings2001]].
- After diet-induced weight loss of 17%, the 24-hour ghrelin area under the curve rose by 24%. After Roux-en-Y gastric bypass with 36% weight loss, ghrelin AUC was 77% lower than in normal-weight controls and 72% lower than in matched controls with obesity, and the meal-related swings disappeared [[Cummings2002]].

### appetite · Gut satiety hormones: PYY, CCK, GLP-1 and GIP
- The gut-brain axis is the core of appetite regulation. It works through stomach stretch, satiety peptides from the intestine and pancreas, and the hunger hormone ghrelin, with gut endocrine cells sensing nutrients [[Cummings2007]].
- PYY(3-36) is released from the gut after meals in proportion to the calories eaten. It acts on Y2 receptors on arcuate NPY neurons, which removes their inhibition of POMC neurons. In humans, infusing normal post-meal concentrations cut food intake by 33% over 24 hours [[Batterham2002]].
- People with obesity responded to PYY normally. Two hours after a PYY infusion, buffet calorie intake fell by 30% in 12 people with obesity and 31% in 12 lean people [[Batterham2003]].
- Endogenous PYY is lower in obesity. Fasting PYY was 10.2 ± 0.7 pmol/L in the obesity group and 16.9 ± 0.8 pmol/L in the lean group, and fasting PYY correlated inversely with BMI (r = -0.84) [[Batterham2003]].
- Cholecystokinin (CCK) reduces food intake in rats [[Gibbs1973]]. In 12 lean men, infusing the C-terminal octapeptide of CCK (4 ng/kg/min) cut intake by an average of 122 g, and they stopped eating sooner [[Kissileff1981]].
- GIP and GLP-1 are the two incretin hormones. Both are secreted within minutes of eating, both are rapidly broken down by dipeptidyl peptidase-4 (DPP-4), and GIP also promotes energy storage through direct actions on fat tissue [[Baggio2007]].
- After Roux-en-Y gastric bypass, post-meal PYY and GLP-1 were higher than in lean controls and controls with obesity, which favours fullness. People who lost the same amount of weight with a gastric band did not show this rise [[leRoux2006]].

### appetite · Reward and hedonic eating
- Using PET, striatal dopamine D2 receptor availability was lower in 10 people with obesity than in controls (2.47 vs 2.99). Within the obesity group, those with the lowest D2 values had the highest BMI [[Wang2001Lancet]]. (Early evidence: small cross-sectional sample; cause and effect cannot be separated)
- In fMRI studies, a blunted dorsal-striatum response to food related to current and future weight gain, mainly in people carrying the TaqIA A1 allele [[Stice2008]]. (Early evidence)
- The hormones that control energy balance through the hypothalamus also act on dopamine neurons. Reward, conditioning and self-control circuits therefore interact with the homeostatic system in eating [[Volkow2011]]. (Hypothesis, for the proposed reward-deficit mechanism in common obesity)
- After 10% weight loss, food pictures caused more activity in several brain areas, including the brainstem and parahippocampal gyrus, and less in others, including the hypothalamus. Leptin injections reversed many of these changes (fMRI, n = 6) [[Rosenbaum2008]].

### glp · GLP-1 physiology
- GLP-1 is a 30-amino-acid peptide made by intestinal L cells when they process proglucagon, and it is released after meals [[Holst2007]].
- GLP-1 increases insulin secretion and lowers glucagon in a glucose-dependent way. It slows gut motility as part of the "ileal brake" and appears to regulate appetite and food intake [[Holst2007,Drucker2018]].
- DPP-4 inactivates GLP-1 very fast, even before the hormone leaves the gut. This raises the possibility that some GLP-1 actions travel through sensory nerves in the gut wall and liver [[Holst2007]].
- In rats given physiological amounts of labelled GLP-1 and GIP, over 50% was converted to the inactive N-terminally truncated forms within 2 minutes. These forms did not appear in DPP-4-deficient animals [[Kieffer1995]].
- In humans, intact GLP-1 made up only 19.9% (healthy) and 25.0% (type 2 diabetes) of the rise in GLP-1 immunoreactivity during IV infusion. The rest was the truncated metabolite [[Deacon1995]].
- The incretin effect is the extra insulin released after oral glucose compared with matched IV glucose. It provided 72.8% of the insulin response in metabolically healthy controls but only 36.0% in people with type 2 diabetes [[Nauck1986]].
- Intravenous GLP-1 slowed gastric emptying in a dose-dependent way in healthy volunteers, even at a physiological dose (0.4 pmol/kg/min). Its net effect with a meal was to lower, not raise, meal-related insulin responses [[Nauck1997]].
- In a randomised crossover study in 20 healthy men, a GLP-1 infusion increased satiety and fullness and cut ad libitum lunch intake by 12% compared with saline [[Flint1998]].
- In 12 people with type 2 diabetes, GLP-1 infusion cut energy intake by 27% compared with saline and increased satiety and fullness [[Gutzwiller1999]].
- GLP-1 also increases natriuresis, has cardioprotective and neuroprotective effects in experimental work, reduces inflammation, and affects reward behaviour and palatability [[Muller2019GLP1]].

### glp · How GLP-1 medicines reach the brain and change eating
- In rodents, the GLP-1 receptor agonist liraglutide entered the arcuate nucleus and was taken up by POMC/CART neurons. GLP-1 directly excited POMC/CART neurons and indirectly inhibited NPY/AgRP neurons through GABA. Liraglutide's weight loss in rats did not need GLP-1 receptors in the vagus nerve, area postrema or PVN [[Secher2014]].
- Semaglutide did not cross the blood-brain barrier in rodents. It reached the brainstem, septal nucleus and hypothalamus through circumventricular organs, activated c-Fos in 10 brain areas including the area postrema and lateral parabrachial nucleus, and lowered food intake without lowering energy expenditure [[Gabery2020]].
- Semaglutide is a GLP-1 analogue with two amino-acid substitutions (Aib8, Arg34) and a fatty-acid side chain at lysine 26 that binds albumin. Its plasma half-life was 46.1 hours after IV dosing in mini-pigs [[Lau2015]].
- The Wegovy label states that semaglutide has 94% sequence homology to human GLP-1, is more than 99% bound to albumin, and has an elimination half-life of about 1 week. It remains in the circulation for about 5-7 weeks after the last 2.4 mg dose [[FDA-Wegovy]].
- The Wegovy label states that semaglutide lowers body weight with more fat loss than lean loss, lowers calorie intake (likely through appetite), and delays gastric emptying [[FDA-Wegovy]].
- In a 12-week randomised crossover trial in 30 people with obesity, semaglutide (escalated to 1.0 mg weekly) cut total ad libitum energy intake across the day by 24% (-3036 kJ) compared with placebo. It reduced hunger and food cravings and lowered relative preference for high-fat foods. Resting metabolic rate adjusted for lean mass did not change [[Blundell2017]].
- In 72 adults with obesity, 20 weeks of semaglutide 2.4 mg cut ad libitum lunch energy intake by 35% (1736 vs 2676 kJ). Body weight changed by -9.9% vs -0.4% with placebo [[Friedrichsen2021]].
- In the same trial, the paracetamol-absorption measure of gastric emptying (AUC 0-5 h) was 8% higher at week 20. This difference was not significant after correcting for body weight, so the authors found no evidence of delayed gastric emptying at week 20 [[Friedrichsen2021]].
- Tirzepatide is a single molecule that activates both GIP and GLP-1 receptors, with a C20 fatty diacid that binds albumin. Its elimination half-life is about 5-6 days. The label states that gastric-emptying delay is largest after the first dose and lessens over time [[FDA-Zepbound]].
- In mice, the dual agonist (LY3298176, later named tirzepatide) reduced body weight and food intake more than a selective GLP-1 receptor agonist did. Gastrointestinal side effects in phase 1 were dose-dependent [[Coskun2018]].
- The GLP-1 receptor field has moved toward oral agonists, allosteric modulators and single molecules that hit several receptors (multi-agonists) [[Drucker2018]]. Drug results and doses belong to the medicines pass. Nobody should start, stop or change a medicine without a clinician.

### adipose · Types of fat: white, brown and beige
- White fat stores surplus energy. Brown and beige fat are thermogenic: they burn energy as heat through uncoupling protein 1 (UCP1) [[Becher2021,Wu2012]].
- In 3640 PET-CT scans from 1972 adults, substantial brown fat deposits (neck to thorax) were seen in 7.5% of women and 3.1% of men. Detection fell with older age, warmer outdoor temperature, beta-blocker use and, in older people, higher BMI [[Cypess2009]].
- Under mild cold (16 °C), brown fat activity appeared in 23 of 24 young men (96%) but not at 22 °C. Activity was lower in men with overweight or obesity and correlated positively with resting metabolic rate [[vanMarkenLichtenbelt2009]].
- In healthy adults, cold raised glucose uptake 15-fold in neck and supraclavicular fat, and biopsies confirmed UCP1-positive multilocular brown adipocytes [[Virtanen2009]].
- After 2 hours at 19 °C, brown fat activity was seen in 17 of 32 adults aged 23-35 but only 2 of 24 aged 38-65. Activity was higher in winter and inversely related to BMI and visceral fat area [[Saito2009]].
- Beige adipocytes appear within white fat and have very low basal UCP1. Like brown fat, they switch on high UCP1 and respiration when stimulated. Evidence suggests that the brown fat found in adult humans is made of beige cells [[Wu2012]]. (Early evidence, for the human composition)
- Across 134,529 PET-CT scans from 52,487 people, those with detectable brown fat had lower odds of type 2 diabetes, dyslipidaemia, coronary artery disease, cerebrovascular disease, heart failure and hypertension. The association was strongest in people with overweight or obesity [[Becher2021]]. (Early evidence: retrospective, observational)

### adipose · How fat grows: cell size, cell number and turnover
- Adipose tissue can expand through bigger cells (hypertrophy) or more cells (hyperplasia). In 1973, two patterns were described: hyperplastic obesity with early onset and hypertrophic obesity with later onset. Cell number was most likely to rise in the first few years of life and again from about age 9 to 13 [[Salans1973]].
- Adipocyte number is a major determinant of fat mass in adults. It stays constant through adulthood in people with and without obesity, even after marked weight loss, which suggests it is set during childhood and adolescence [[Spalding2008]].
- Carbon-14 from nuclear bomb tests, built into DNA, showed that about 10% of fat cells are renewed each year at all adult ages and BMI levels [[Spalding2008]].
- In 764 adults (BMI 18-60), hypertrophic fat (few large cells) was linked to higher fasting insulin and lower insulin sensitivity, independent of fat mass. People with hypertrophy made 70% fewer new adipocytes per year than people with hyperplasia. Fat cells die at about 10% per year and live about 10 years on average [[Arner2010]].
- Healthy expansion of fat tissue needs blood vessel and immune remodelling. Growing adipocytes can quickly reach the diffusion limit of oxygen, and this hypoxia is an early factor that limits healthy expansion [[Sun2011]].

### adipose · Fat as an endocrine organ
- Adipose tissue contains adipocytes, connective tissue, nerves, stromovascular cells and immune cells. It secretes leptin, adiponectin, other cytokines, complement components, plasminogen activator inhibitor-1, renin-angiotensin proteins and resistin. It is also a major site of sex-steroid and glucocorticoid metabolism [[Kershaw2004]].
- Adiponectin, a protein made only by fat cells, is paradoxically lower in plasma in people with obesity than in people without, even though it comes only from adipose tissue [[Arita1999]].
- The 2025 Lancet Commission defines obesity as excess adiposity "with or without abnormal distribution or function of adipose tissue", with multifactorial causes that are still incompletely understood. Clinical obesity is defined by organ or tissue dysfunction caused by excess adiposity [[Rubino2025Commission]].

### adipose · Inflammation: macrophages and crown-like structures
- TNF-alpha mRNA was induced in fat tissue in four rodent models of obesity and diabetes. Neutralising TNF-alpha in obese fa/fa rats increased insulin-stimulated glucose uptake. This linked fat-tissue inflammation directly to obesity-linked insulin resistance [[Hotamisligil1993]].
- In mouse fat, 1,304 transcripts correlated with body mass, and 30% of the 100 most strongly correlated genes were macrophage genes. Macrophage content rose with adipocyte size and body mass in mice and in human subcutaneous fat (CD68). Adipose tissue macrophages made almost all of the tissue's TNF-alpha [[Weisberg2003]].
- In mouse models of genetic and diet-induced obesity, inflammatory and macrophage genes in white fat rose step by step and came before the sharp rise in blood insulin. The insulin sensitiser rosiglitazone turned these genes down [[Xu2003]].
- More than 90% of macrophages in the white fat of mice and humans with obesity sit around dead adipocytes. They fuse into syncytia that scavenge the leftover lipid droplet, forming "crown-like structures". Adipocyte death was 30-fold higher in obese db/db mice and rose with adipocyte size [[Cinti2005]].

### adipose · Visceral fat, ectopic fat and insulin resistance
- In 3001 Framingham participants, visceral fat (VAT) was more strongly linked to metabolic risk than subcutaneous fat (SAT). The odds ratio for metabolic syndrome per 1-SD increase was 4.7 for VAT vs 3.0 for SAT in women, and 4.2 vs 2.5 in men. Only VAT added information after adjusting for BMI and waist [[Fox2007Framingham]].
- In the same cohort, heritability was 57% for SAT and 36% for VAT [[Fox2007Framingham]].
- A 2019 position statement concluded that visceral fat measured by CT or MRI is an independent risk marker of cardiovascular and metabolic disease and death. Ectopic fat in the liver and around the heart may add to atherosclerosis and cardiometabolic risk [[Neeland2019]].
- Visceral obesity is part of a wider pattern: subcutaneous fat that cannot expand properly, plus triglyceride stored in the wrong places. The result includes high triglycerides, more free fatty acids, liver insulin resistance, small dense LDL and low HDL. Lifestyle weight loss generally mobilises visceral fat preferentially [[Tchernof2013]].
- In obesity, fat tissue releases more non-esterified fatty acids, glycerol, hormones and pro-inflammatory cytokines, which drive insulin resistance. Type 2 diabetes develops when beta-cell dysfunction is added on top [[Kahn2006]].
- Removing subcutaneous fat by liposuction did not reproduce the benefits of weight loss. Large-volume liposuction removed 9.1-10.5 kg of fat (18-19% of total fat) in 15 women with obesity but did not change insulin sensitivity of muscle, liver or fat, inflammatory markers or other risk factors at 10-12 weeks [[Klein2004]].
- In 11 people with type 2 diabetes on a 600 kcal/day research diet, fasting glucose normalised within 1 week (9.2 to 5.9 mmol/L). Liver fat fell from 12.8% to 2.9% by week 8, pancreatic fat fell from 8.0% to 6.2%, and first-phase insulin secretion recovered toward normal [[Lim2011]].
- In a DiRECT trial subgroup, liver fat fell from 16.0% to 3.1% after weight loss. Pancreatic fat fell whether or not glucose control normalised. Return of first-phase insulin secretion separated responders from non-responders, and responders had shorter diabetes duration (2.7 vs 3.8 years) [[Taylor2018CellMetab]].

### adipose · The personal fat threshold
- The personal fat threshold (PFT) hypothesis says each person has their own level of fat beyond which type 2 diabetes becomes likely, and that this level is independent of BMI. In the UKPDS, median BMI at diagnosis was 28 kg/m2 and one in three people had a BMI under 25 [[Taylor2015PFT]]. (Hypothesis, as first proposed)
- Tested in 20 people with type 2 diabetes and BMI under 27, repeated 5% weight-loss cycles lowered BMI from 24.8 to 22.5 kg/m2 and returned liver fat to normal. Remission (HbA1c under 48 mmol/mol off glucose-lowering drugs) was reached by 14/20 (70%) after a median initial weight loss of 6.5% [[Taylor2023PFT]]. (Early evidence: small, uncontrolled; supports the PFT hypothesis)

### adaptation · How the body defends its fat stores
- The Endocrine Society calls obesity a disorder of the energy homeostasis system, not simply passive weight gain. It describes the defended level of fat mass being "reset" upward, and notes that most people who complete behavioural and dietary programmes eventually regain most of the weight lost [[Schwartz2017EndoSoc]].
- Holding body weight 10% or more below usual lowered 24-hour total energy expenditure by a mean 6 ± 3 kcal per kg fat-free mass per day in people who had never had obesity, and by 8 ± 5 in people with obesity. Resting and non-resting expenditure each fell by 3-4 kcal/kg FFM/day [[Leibel1995]].
- Holding weight 10% above usual raised total energy expenditure by 9 ± 7 (never had obesity) and 8 ± 4 (obesity) kcal/kg FFM/day. These changes were unrelated to adiposity or sex, and they oppose any departure from usual weight [[Leibel1995]].
- In the reduced-weight state, energy expenditure falls mainly because skeletal muscle works more efficiently. Sympathetic tone, leptin, thyroxine and triiodothyronine also fall [[Rosenbaum2005]].
- In 10 inpatients holding a 10% weight loss, leptin injections that restored morning leptin to pre-weight-loss levels brought energy expenditure, muscle work efficiency, sympathetic tone and T4/T3 back to pre-weight-loss values. The weight-reduced state behaves like relative leptin deficiency [[Rosenbaum2005]]. (Early evidence: small physiological study)
- Rosenbaum and Leibel report a relapse rate of over 80% to pre-weight-loss body fat after otherwise successful weight loss. They attribute it to coordinated metabolic, behavioural, neuroendocrine and autonomic responses, and call this "adaptive thermogenesis" [[Rosenbaum2010]].
- MacLean and colleagues describe the biological response to weight loss as comprehensive, persistent and redundant across energy homeostasis. They see it as the basis of the high relapse rate in obesity treatment [[MacLean2011]].
- In 95 Southwestern American Indian adults, low adjusted 24-hour energy expenditure (200 kcal/day below predicted) carried a fourfold risk of gaining more than 7.5 kg, compared with high expenditure (200 kcal/day above predicted). Expenditure clustered in families (intraclass correlation 0.48) [[Ravussin1988]].

### adaptation · Hormone and hunger changes that persist after weight loss
- In 50 adults with overweight or obesity (no diabetes), a 10-week very-low-energy diet programme produced a mean 13.5 ± 0.5 kg weight loss [[Sumithran2011]].
- At 10 weeks, leptin, PYY, CCK, insulin and amylin fell. Ghrelin, GIP and pancreatic polypeptide rose, and so did subjective appetite [[Sumithran2011]].
- At 62 weeks, one year after the weight loss, leptin (P<0.001), PYY (P<0.001), CCK (P=0.04), insulin (P=0.01), ghrelin (P<0.001), GIP (P<0.001), pancreatic polypeptide (P=0.002) and hunger (P<0.001) still differed from baseline in the same directions. The hormonal push toward regain had not reverted [[Sumithran2011]].
- Ghrelin's 24-hour area under the curve rose by 24% after 17% diet-induced weight loss [[Cummings2002]].
- Appetite pushes back harder than metabolism. Modelling a 52-week canagliflozin trial (n = 153), where weight loss came from glucose lost in urine without people noticing a deficit, showed that intake rose by about 100 kcal/day per kg of weight lost. That is more than three times the matching energy-expenditure adaptation [[Polidori2016]].
- When semaglutide 2.4 mg and the trial's lifestyle programme stopped after 68 weeks (STEP 1 extension, n = 327), people regained 11.6 percentage points of their 17.3% weight loss by week 120. That left a net loss of 5.6%, against 0.1% with placebo. Most cardiometabolic improvements drifted back toward baseline [[Wilding2022STEP1ext]].

### adaptation · Metabolic adaptation: size and persistence
- In 16 "Biggest Loser" participants (baseline BMI 49.4), weight fell 38 ± 9% by week 30, 83% of it from fat. Resting metabolic rate (RMR) fell more than body-composition change predicted: metabolic adaptation was -244 ± 231 kcal/day at week 6 and -504 ± 171 kcal/day at week 30, despite vigorous exercise [[Johannsen2012]].
- At 6 years (14 of 16 followed), 41.0 ± 31.3 kg of the 58.3 ± 24.9 kg lost had been regained. RMR was still 704 ± 427 kcal/day below baseline, and metabolic adaptation was -499 ± 207 kcal/day [[Fothergill2016]].
- In that cohort, adaptation at the end of the competition did not predict regain (r = -0.1). The people who kept off more weight at 6 years showed more slowing at the same time (r = 0.59). The authors read adaptation as a proportional but incomplete response to ongoing efforts to hold weight down [[Fothergill2016]].
- A contrasting study measured 171 women with overweight under weight-stable conditions. They lost about 12 kg. Adaptation was -54 ± 105 kcal/day after weight loss, and was not significant at 1 and 2 years (-18 and -19 kcal/day, n = 46). It did not predict regain, although they regained 52% and 89% of lost weight at 1 and 2 years [[Martins2020]].

### adaptation · Models of body-weight regulation
- The set-point model says active feedback, presumably encoded in the brain, links fat stores to intake and expenditure. It fits much of the biology but struggles to explain the rise in obesity since the 1980s [[Speakman2011]]. (Hypothesis)
- The settling-point model says body weight settles where passive feedback from the environment and expenditure balances out. It fits social and environmental effects but struggles with the genetics and biology. Gene-environment models, such as the dual intervention point model, try to bridge the two [[Speakman2011]]. (Hypothesis)
- Hall and Guo reviewed static, settling-point and set-point models and judged the set-point model most consistent with current data. They note that weight loss is resisted by counterbalancing physiology, so "eat less, move more" misreads the energy-balance equation [[Hall2017Gastro]]. (Hypothesis, model comparison)
- The energy balance model (EBM) places the brain at the centre of body-weight regulation, mostly below conscious awareness, through endocrine, metabolic and nerve signals that respond to the body's needs and to the environment [[Hall2022EBM]]. (Hypothesis, competing model)
- The carbohydrate-insulin model (CIM) proposes the reverse causal direction: hormonal responses to a high-glycaemic-load diet increase fat storage, and this drives positive energy balance [[Ludwig2021CIM]]. (Hypothesis, competing model)
- In a meta-analysis of 32 controlled feeding studies that swapped carbohydrate for fat at equal calories, energy expenditure was 26 kcal/day higher and fat loss 16 g/day greater on the lower-fat diets. This runs against a large metabolic advantage for low-carbohydrate diets [[Hall2017Gastro]].

### adaptation · The Hall dynamic energy-balance model
- Body weight responds slowly to a lasting change in energy intake, with a half-time of about 1 year. People with more body fat lose more weight for the same intake change and take longer to reach their new steady state [[Hall2011Lancet]].
- At population level, the US weight gain behind the obesity epidemic fits a small, persistent daily imbalance of about 30 kJ/day. Sustaining the higher weight needed an extra intake (the "maintenance energy gap") of about 0.9 MJ/day [[Hall2011Lancet]].
- The "3500 kcal per pound" rule (32.2 MJ/kg) roughly matches the energy content of lost weight in people with initial body fat above 30 kg. It overestimates the deficit needed per unit of weight lost in people with less body fat [[Hall2008]].
- The same paper presents a web-based simulator that predicts how weight changes over time [[Hall2011Lancet]]. Its output is a population model, not a personal prescription.

### Exam hooks
- The arcuate nucleus holds POMC/CART neurons, which reduce intake via alpha-MSH acting on MC4R, and NPY/AgRP neurons, which increase intake. Leptin excites POMC and inhibits NPY/GABA input [[Cowley2001]].
- MC4R deficiency is the most common monogenic obesity, found in 5.8% of 500 severe childhood-obesity probands. It is codominant, with hyperphagia and increased linear growth [[Farooqi2003MC4R]].
- Serum leptin rises with body fat (r = 0.85). High leptin in common obesity points to leptin resistance, not deficiency [[Considine1996]].
- The CSF/serum leptin ratio is 4.3-fold lower in obesity, suggesting saturable transport into the brain [[Caro1996]].
- Congenital leptin deficiency (homozygous frameshift at codon 133) causes severe early-onset obesity with very low leptin [[Montague1997]].
- Ghrelin is a 28-amino-acid octanoylated peptide from the stomach. It rises nearly twofold before meals and falls within 1 hour after eating [[Kojima1999,Cummings2001]].
- After diet-induced weight loss, ghrelin AUC rises 24%. After gastric bypass it is 77% below normal-weight controls [[Cummings2002]].
- PYY(3-36) acts on Y2 receptors on arcuate NPY neurons. People with obesity stay sensitive to it (30% less intake) but have lower fasting levels [[Batterham2002,Batterham2003]].
- GLP-1 comes from intestinal L cells, is inactivated by DPP-4 (over 50% within 2 minutes in rats), slows gastric emptying (the "ileal brake") and promotes satiety [[Holst2007,Kieffer1995,Nauck1997]].
- The incretin effect provides 72.8% of the insulin response to oral glucose in controls and 36.0% in type 2 diabetes [[Nauck1986]].
- Semaglutide does not cross the blood-brain barrier. It reaches the brain through circumventricular organs such as the area postrema [[Gabery2020]].
- About 10% of adult fat cells are replaced each year. Total adipocyte number is set by the end of adolescence and does not fall with weight loss [[Spalding2008]].
- Crown-like structures are macrophages surrounding dead hypertrophic adipocytes. More than 90% of fat-tissue macrophages in obesity sit around dead adipocytes [[Cinti2005]].
- Adiponectin is made only by fat cells but is lower in obesity [[Arita1999]].
- Visceral fat outranks subcutaneous fat for metabolic risk: OR for metabolic syndrome 4.7 vs 3.0 per SD in women [[Fox2007Framingham]].
- Liposuction removed about 10 kg of subcutaneous fat with no metabolic benefit [[Klein2004]].
- Holding a 10% lower weight lowers total energy expenditure by about 6-8 kcal/kg fat-free mass/day beyond what body-composition change predicts [[Leibel1995]].
- One year after diet-induced weight loss, leptin, PYY and CCK stay low and ghrelin and hunger stay high [[Sumithran2011]].
- Appetite feedback is about 100 kcal/day per kg lost, more than three times the expenditure adaptation [[Polidori2016]].
- Six years after "The Biggest Loser", metabolic adaptation was still -499 kcal/day [[Fothergill2016]].

### In plain words
- Your brain has a "hunger team" and a "fullness team" of nerve cells. Hormones from your fat and gut tell these teams how much energy you have stored and what you just ate [[Cowley2001,Cummings2007]].
- Leptin is made by fat. More fat usually means more leptin. In most people with obesity the brain hears the leptin signal less well, a bit like a radio turned down [[Considine1996,Caro1996]].
- Ghrelin comes from the stomach. It rises before meals and drops after you eat, which is one reason hunger follows a rhythm [[Cummings2001]].
- After a meal, your gut releases PYY, CCK and GLP-1, which help you feel full. GLP-1 also slows how fast your stomach empties [[Batterham2002,Kissileff1981,Flint1998,Nauck1997]].
- Natural GLP-1 lasts only minutes in the blood. Medicines like semaglutide are built to last about a week [[Kieffer1995,FDA-Wegovy]].
- Fat is not just storage. It is an active organ that sends hormones and, when fat cells get very large, can become inflamed [[Kershaw2004,Cinti2005]].
- Where fat is stored matters. Fat deep in the belly and fat in the liver are more closely linked to diabetes and heart disease than fat under the skin [[Fox2007Framingham,Neeland2019]].
- Some people develop type 2 diabetes at a "normal" BMI. Each person seems to have their own fat limit, and in a small study a modest weight loss led to remission in most participants [[Taylor2023PFT]].
- Adults keep roughly the same number of fat cells. Weight loss makes the cells smaller but does not remove them [[Spalding2008]].
- After weight loss, the body fights back. Hunger hormones rise, fullness hormones fall, and the body burns a little less energy. These changes can last for years [[Sumithran2011,Fothergill2016]].
- Regaining weight is biology at work, not a lack of willpower. It is a main reason obesity is treated as a long-term condition [[Schwartz2017EndoSoc,Wilding2022STEP1ext]].
- If eating or weight causes you distress, or you restrict, binge or purge, please talk to a clinician or an eating-disorder service.

## Numbers for the animations
- leptin_mean_obesity | cross-sectional | 31.3 | ng/mL (SD 24.1; n=139) | [[Considine1996]]
- leptin_mean_no_obesity | cross-sectional | 7.5 | ng/mL (SD 9.3; n=136) | [[Considine1996]]
- leptin_vs_bodyfat_r | cross-sectional | 0.85 | r (serum leptin vs % body fat) | [[Considine1996]]
- leptin_serum_lean | cross-sectional | 9.6 | ng/mL | [[Caro1996]]
- leptin_serum_obesity | cross-sectional | 40.2 | ng/mL | [[Caro1996]]
- leptin_csf_lean | cross-sectional | 0.259 | ng/mL | [[Caro1996]]
- leptin_csf_obesity | cross-sectional | 0.337 | ng/mL | [[Caro1996]]
- leptin_csf_serum_ratio_lean | cross-sectional | 0.047 | ratio | [[Caro1996]]
- leptin_csf_serum_ratio_obesity | cross-sectional | 0.011 | ratio | [[Caro1996]]
- ghrelin_meal_curve | pre-meal peak | ~2 | fold over preceding trough | [[Cummings2001]]
- ghrelin_meal_curve | ≤1 h after eating | 1 | back to trough (relative) | [[Cummings2001]]
- ghrelin_diurnal | 01:00 | peak | zenith of intermeal level | [[Cummings2001]]
- ghrelin_diurnal | 09:00 | nadir | lowest intermeal level | [[Cummings2001]]
- ghrelin_auc_change_after_diet | after 17% weight loss | +24 | % vs pre-diet | [[Cummings2002]]
- ghrelin_auc_after_bypass | after 36% weight loss | -77 | % vs normal-weight controls | [[Cummings2002]]
- ghrelin_auc_after_bypass | after 36% weight loss | -72 | % vs matched controls with obesity | [[Cummings2002]]
- ghrelin_infusion_intake | during infusion | +28 | % energy intake vs saline | [[Wren2001]]
- pyy_infusion_intake_24h | 0-24 h | -33 | % food intake vs saline | [[Batterham2002]]
- pyy_infusion_intake_obesity | buffet 2 h after infusion | -30 | % calories vs saline | [[Batterham2003]]
- pyy_infusion_intake_lean | buffet 2 h after infusion | -31 | % calories vs saline | [[Batterham2003]]
- pyy_fasting_obesity | fasting | 10.2 | pmol/L | [[Batterham2003]]
- pyy_fasting_lean | fasting | 16.9 | pmol/L | [[Batterham2003]]
- cck8_infusion_intake | test meal | -122 | g food vs saline | [[Kissileff1981]]
- glp1_infusion_intake_healthy | ad lib lunch | -12 | % energy intake vs saline | [[Flint1998]]
- glp1_infusion_intake_t2d | test meal | -27 | % energy intake vs saline | [[Gutzwiller1999]]
- glp1_degradation_rat | 2 min | >50 | % converted to inactive form | [[Kieffer1995]]
- glp1_intact_fraction_iv | during infusion | 19.9 | % intact (healthy) | [[Deacon1995]]
- glp1_intact_fraction_iv | during infusion | 25.0 | % intact (type 2 diabetes) | [[Deacon1995]]
- incretin_effect_controls | oral vs IV glucose | 72.8 | % of insulin response | [[Nauck1986]]
- incretin_effect_t2d | oral vs IV glucose | 36.0 | % of insulin response | [[Nauck1986]]
- halflife_native_vs_drug | semaglutide (minipig IV) | 46.1 | h | [[Lau2015]]
- halflife_native_vs_drug | semaglutide (human, label) | ~1 | week | [[FDA-Wegovy]]
- halflife_native_vs_drug | tirzepatide (human, label) | 5-6 | days | [[FDA-Zepbound]]
- semaglutide_washout | after last 2.4 mg dose | 5-7 | weeks present in circulation | [[FDA-Wegovy]]
- semaglutide_energy_intake_1mg | week 12 | -24 | % total ad lib intake vs placebo | [[Blundell2017]]
- semaglutide_energy_intake_2.4mg | week 20 | -35 | % ad lib lunch intake vs placebo | [[Friedrichsen2021]]
- semaglutide_weight_2.4mg | week 20 | -9.9 | % body weight (placebo -0.4) | [[Friedrichsen2021]]
- step1_ext_weight_sema | week 0 | 0 | % change | [[Wilding2022STEP1ext]]
- step1_ext_weight_sema | week 68 | -17.3 | % change (treatment stops) | [[Wilding2022STEP1ext]]
- step1_ext_weight_sema | week 120 | -5.6 | % change | [[Wilding2022STEP1ext]]
- step1_ext_weight_placebo | week 68 | -2.0 | % change | [[Wilding2022STEP1ext]]
- step1_ext_weight_placebo | week 120 | -0.1 | % change | [[Wilding2022STEP1ext]]
- sumithran_weight | week 10 | -13.5 | kg | [[Sumithran2011]]
- sumithran_leptin | week 10 | -1 | direction (below baseline; size not in abstract) | [[Sumithran2011]]
- sumithran_leptin | week 62 | -1 | direction (below baseline, P<0.001) | [[Sumithran2011]]
- sumithran_pyy | week 10 | -1 | direction (below baseline) | [[Sumithran2011]]
- sumithran_pyy | week 62 | -1 | direction (below baseline, P<0.001) | [[Sumithran2011]]
- sumithran_cck | week 10 | -1 | direction (below baseline) | [[Sumithran2011]]
- sumithran_cck | week 62 | -1 | direction (below baseline, P=0.04) | [[Sumithran2011]]
- sumithran_ghrelin | week 10 | +1 | direction (above baseline) | [[Sumithran2011]]
- sumithran_ghrelin | week 62 | +1 | direction (above baseline, P<0.001) | [[Sumithran2011]]
- sumithran_hunger | week 10 | +1 | direction (above baseline) | [[Sumithran2011]]
- sumithran_hunger | week 62 | +1 | direction (above baseline, P<0.001) | [[Sumithran2011]]
- leibel_tee_after_10pct_loss_never_obesity | maintained | -6 | kcal/kg FFM/day | [[Leibel1995]]
- leibel_tee_after_10pct_loss_obesity | maintained | -8 | kcal/kg FFM/day | [[Leibel1995]]
- leibel_tee_after_10pct_gain_never_obesity | maintained | +9 | kcal/kg FFM/day | [[Leibel1995]]
- leibel_tee_after_10pct_gain_obesity | maintained | +8 | kcal/kg FFM/day | [[Leibel1995]]
- biggest_loser_metabolic_adaptation | baseline | 0 | kcal/day | [[Johannsen2012]]
- biggest_loser_metabolic_adaptation | week 6 | -244 | kcal/day | [[Johannsen2012]]
- biggest_loser_metabolic_adaptation | week 30 | -504 | kcal/day | [[Johannsen2012]]
- biggest_loser_metabolic_adaptation | year 6 | -499 | kcal/day | [[Fothergill2016]]
- biggest_loser_rmr_vs_baseline | week 30 | -610 | kcal/day | [[Fothergill2016]]
- biggest_loser_rmr_vs_baseline | year 6 | -704 | kcal/day | [[Fothergill2016]]
- biggest_loser_weight_change | week 30 | -58.3 | kg | [[Fothergill2016]]
- biggest_loser_weight_regained | year 6 | 41.0 | kg regained of 58.3 kg lost | [[Fothergill2016]]
- martins_metabolic_adaptation | after weight loss | -43 | kcal/day (subset n=46) | [[Martins2020]]
- martins_metabolic_adaptation | year 1 | -18 | kcal/day (not significant) | [[Martins2020]]
- martins_metabolic_adaptation | year 2 | -19 | kcal/day (not significant) | [[Martins2020]]
- appetite_feedback | per kg lost | ~100 | kcal/day extra intake | [[Polidori2016]]
- energy_balance_halftime | — | ~1 | year | [[Hall2011Lancet]]
- us_energy_gap_daily | population average | ~30 | kJ/day | [[Hall2011Lancet]]
- us_maintenance_energy_gap | population average | ~0.9 | MJ/day | [[Hall2011Lancet]]
- rule_3500kcal | per lb | 3500 | kcal (=32.2 MJ/kg; fits only if body fat >30 kg) | [[Hall2008]]
- adipocyte_turnover | per year | ~10 | % renewed | [[Spalding2008]]
- adipocyte_mean_age | — | ~10 | years | [[Arner2010]]
- adipocyte_generation_hypertrophy_vs_hyperplasia | per year | -70 | % new adipocytes | [[Arner2010]]
- bat_prevalence_pet_women | incidental PET-CT | 7.5 | % | [[Cypess2009]]
- bat_prevalence_pet_men | incidental PET-CT | 3.1 | % | [[Cypess2009]]
- bat_cold_16C_young_men | cold exposure | 96 | % with active BAT | [[vanMarkenLichtenbelt2009]]
- bat_cold_19C_age23_35 | 2 h cold | 53 | % (17/32) | [[Saito2009]]
- bat_cold_19C_age38_65 | 2 h cold | 8 | % (2/24) | [[Saito2009]]
- macrophages_at_dead_adipocytes | obesity | >90 | % of WAT macrophages | [[Cinti2005]]
- vat_vs_sat_metsyn_or_women | per 1 SD | 4.7 vs 3.0 | OR | [[Fox2007Framingham]]
- vat_vs_sat_metsyn_or_men | per 1 SD | 4.2 vs 2.5 | OR | [[Fox2007Framingham]]
- lim2011_fasting_glucose | baseline | 9.2 | mmol/L | [[Lim2011]]
- lim2011_fasting_glucose | week 1 | 5.9 | mmol/L | [[Lim2011]]
- lim2011_liver_fat | baseline | 12.8 | % | [[Lim2011]]
- lim2011_liver_fat | week 8 | 2.9 | % | [[Lim2011]]
- lim2011_pancreas_fat | baseline | 8.0 | % | [[Lim2011]]
- lim2011_pancreas_fat | week 8 | 6.2 | % | [[Lim2011]]
- direct_liver_fat | baseline | 16.0 | % | [[Taylor2018CellMetab]]
- direct_liver_fat | after weight loss | 3.1 | % | [[Taylor2018CellMetab]]
- pft_bmi | baseline | 24.8 | kg/m2 | [[Taylor2023PFT]]
- pft_bmi | 12 months | 22.5 | kg/m2 | [[Taylor2023PFT]]
- pft_remission | 12 months | 70 | % (14/20) | [[Taylor2023PFT]]
- setmelanotide_10pct_responders | ~1 year | 80 (POMC) / 45 (LEPR) | % | [[Clement2020]]

## Open questions and controversies
- Is common leptin resistance a cause or a consequence of obesity? Myers et al. argue that obesity itself induces cellular leptin resistance, which makes cause and effect hard to separate [[Myers2010]]. Reduced brain transport is one candidate mechanism [[Caro1996]], and high-dose leptin gave only modest, variable weight loss in common obesity [[Heymsfield1999]]. Status: unresolved.
- Does metabolic adaptation matter for regain? Fothergill and Johannsen report large, lasting adaptation of about -500 kcal/day after extreme weight loss [[Fothergill2016,Johannsen2012]]. Martins reports minimal adaptation (-54 kcal/day) when RMR is measured under weight-stable conditions, with no link to regain [[Martins2020]]. Polidori estimates that appetite feedback is more than three times larger than the expenditure effect [[Polidori2016]]. Status: the size depends on how much weight was lost and on energy-balance conditions at measurement. Appetite may be the bigger lever.
- Set point or settling point? The set-point model fits the biological defence of weight but not the obesity epidemic. The settling-point model fits the environment but not the genetics. Hybrid models have been proposed [[Speakman2011]]. Hall and Guo favour the set-point model as most consistent with the data [[Hall2017Gastro]]. Status: theoretical; no single model is accepted.
- Energy balance model vs carbohydrate-insulin model: Ludwig et al. argue that a high-glycaemic-load diet drives fat storage first [[Ludwig2021CIM]]. Hall et al. argue that the brain-centred EBM is more robust and that the CIM is a narrower special case [[Hall2022EBM]]. Controlled feeding data showed slightly more fat loss on lower-fat diets [[Hall2017Gastro]]. Status: active debate.
- How much does brown or beige fat contribute to human energy balance? Brown fat is present and cold-inducible in many adults and is less active with higher BMI [[vanMarkenLichtenbelt2009,Saito2009]]. It is linked to better cardiometabolic health in retrospective data [[Becher2021]], but whether activating it can meaningfully change body weight is unproven. Status: early evidence.
- Is the personal fat threshold a general explanation for type 2 diabetes at "normal" BMI? Supported by one small uncontrolled study (n = 20, 70% remission) [[Taylor2023PFT]]. Status: early evidence; needs larger controlled replication.
- Where do GLP-1 medicines act? Rodent data point to the arcuate POMC/CART neurons for liraglutide [[Secher2014]] and to distributed hindbrain and hypothalamic sites reached through circumventricular organs for semaglutide [[Gabery2020]]. Human brain-site data are limited. The role of delayed gastric emptying in long-term weight loss is uncertain: no significant delay was seen at week 20 after correcting for weight [[Friedrichsen2021]], and the tirzepatide label says the delay is largest after the first dose [[FDA-Zepbound]]. Status: open.
- Dopamine and reward in obesity: lower striatal D2 availability [[Wang2001Lancet]] and blunted striatal response [[Stice2008]] come from small imaging studies. Whether these are causes or consequences of obesity is unresolved [[Volkow2011]]. Status: hypothesis.

## Sources
- [Considine1996] Considine RV, Sinha MK, Heiman ML, Kriauciunas A, Stephens TW, Nyce MR, et al. Serum immunoreactive-leptin concentrations in normal-weight and obese humans. N Engl J Med. 1996;334(5):292-5. PMID 8532024; doi:10.1056/NEJM199602013340503. (validated: PubMed)
- [Cummings2001] Cummings DE, Purnell JQ, Frayo RS, Schmidova K, Wisse BE, Weigle DS. A preprandial rise in plasma ghrelin levels suggests a role in meal initiation in humans. Diabetes. 2001;50(8):1714-9. PMID 11473029; doi:10.2337/diabetes.50.8.1714. (validated: PubMed)
- [Cummings2002] Cummings DE, Weigle DS, Frayo RS, Breen PA, Ma MK, Dellinger EP, et al. Plasma ghrelin levels after diet-induced weight loss or gastric bypass surgery. N Engl J Med. 2002;346(21):1623-30. PMID 12023994; doi:10.1056/NEJMoa012908. (validated: PubMed)
- [Zhang1994] Zhang Y, Proenca R, Maffei M, Barone M, Leopold L, Friedman JM. Positional cloning of the mouse obese gene and its human homologue. Nature. 1994;372(6505):425-32. PMID 7984236; doi:10.1038/372425a0. (validated: PubMed)
- [Montague1997] Montague CT, Farooqi IS, Whitehead JP, Soos MA, Rau H, Wareham NJ, et al. Congenital leptin deficiency is associated with severe early-onset obesity in humans. Nature. 1997;387(6636):903-8. PMID 9202122; doi:10.1038/43185. (validated: PubMed)
- [Farooqi1999] Farooqi IS, Jebb SA, Langmack G, Lawrence E, Cheetham CH, Prentice AM, et al. Effects of recombinant leptin therapy in a child with congenital leptin deficiency. N Engl J Med. 1999;341(12):879-84. PMID 10486419; doi:10.1056/NEJM199909163411204. (validated: PubMed)
- [Farooqi2003MC4R] Farooqi IS, Keogh JM, Yeo GS, Lank EJ, Cheetham T, O'Rahilly S. Clinical spectrum of obesity and mutations in the melanocortin 4 receptor gene. N Engl J Med. 2003;348(12):1085-95. PMID 12646665; doi:10.1056/NEJMoa022050. (validated: PubMed)
- [Batterham2002] Batterham RL, Cowley MA, Small CJ, Herzog H, Cohen MA, Dakin CL, et al. Gut hormone PYY(3-36) physiologically inhibits food intake. Nature. 2002;418(6898):650-4. PMID 12167864; doi:10.1038/nature00887. (validated: PubMed)
- [Batterham2003] Batterham RL, Cohen MA, Ellis SM, Le Roux CW, Withers DJ, Frost GS, et al. Inhibition of food intake in obese subjects by peptide YY3-36. N Engl J Med. 2003;349(10):941-8. PMID 12954742; doi:10.1056/NEJMoa030204. (validated: PubMed)
- [Schwartz2000] Schwartz MW, Woods SC, Porte D Jr, Seeley RJ, Baskin DG. Central nervous system control of food intake. Nature. 2000;404(6778):661-71. PMID 10766253; doi:10.1038/35007534. (validated: PubMed)
- [Kojima1999] Kojima M, Hosoda H, Date Y, Nakazato M, Matsuo H, Kangawa K. Ghrelin is a growth-hormone-releasing acylated peptide from stomach. Nature. 1999;402(6762):656-60. PMID 10604470; doi:10.1038/45230. (validated: PubMed)
- [Wren2001] Wren AM, Seal LJ, Cohen MA, Brynes AE, Frost GS, Murphy KG, et al. Ghrelin enhances appetite and increases food intake in humans. J Clin Endocrinol Metab. 2001;86(12):5992. PMID 11739476; doi:10.1210/jcem.86.12.8111. (validated: PubMed)
- [Caro1996] Caro JF, Kolaczynski JW, Nyce MR, Ohannesian JP, Opentanova I, Goldman WH, et al. Decreased cerebrospinal-fluid/serum leptin ratio in obesity: a possible mechanism for leptin resistance. Lancet. 1996;348(9021):159-61. PMID 8684156; doi:10.1016/s0140-6736(96)03173-x. (validated: PubMed)
- [Heymsfield1999] Heymsfield SB, Greenberg AS, Fujioka K, Dixon RM, Kushner R, Hunt T, et al. Recombinant leptin for weight loss in obese and lean adults: a randomized, controlled, dose-escalation trial. JAMA. 1999;282(16):1568-75. PMID 10546697; doi:10.1001/jama.282.16.1568. (validated: PubMed)
- [Huszar1997] Huszar D, Lynch CA, Fairchild-Huntress V, Dunmore JH, Fang Q, Berkemeier LR, et al. Targeted disruption of the melanocortin-4 receptor results in obesity in mice. Cell. 1997;88(1):131-41. PMID 9019399; doi:10.1016/s0092-8674(00)81865-6. (validated: PubMed)
- [Krashes2011] Krashes MJ, Koda S, Ye C, Rogan SC, Adams AC, Cusher DS, et al. Rapid, reversible activation of AgRP neurons drives feeding behavior in mice. J Clin Invest. 2011;121(4):1424-8. PMID 21364278; PMCID PMC3069789; doi:10.1172/JCI46229. (validated: PubMed)
- [Aponte2011] Aponte Y, Atasoy D, Sternson SM. AGRP neurons are sufficient to orchestrate feeding behavior rapidly and without training. Nat Neurosci. 2011;14(3):351-5. PMID 21209617; PMCID PMC3049940; doi:10.1038/nn.2739. (validated: PubMed)
- [Wang2001Lancet] Wang GJ, Volkow ND, Logan J, Pappas NR, Wong CT, Zhu W, et al. Brain dopamine and obesity. Lancet. 2001;357(9253):354-7. PMID 11210998; doi:10.1016/s0140-6736(00)03643-6. (validated: PubMed)
- [Stice2008] Stice E, Spoor S, Bohon C, Small DM. Relation between obesity and blunted striatal response to food is moderated by TaqIA A1 allele. Science. 2008;322(5900):449-52. PMID 18927395; PMCID PMC2681095; doi:10.1126/science.1161550. (validated: PubMed)
- [Volkow2011] Volkow ND, Wang GJ, Baler RD. Reward, dopamine and the control of food intake: implications for obesity. Trends Cogn Sci. 2011;15(1):37-46. PMID 21109477; PMCID PMC3124340; doi:10.1016/j.tics.2010.11.001. (validated: PubMed)
- [Cummings2007] Cummings DE, Overduin J. Gastrointestinal regulation of food intake. J Clin Invest. 2007;117(1):13-23. PMID 17200702; PMCID PMC1716217; doi:10.1172/JCI30227. (validated: PubMed)
- [Gibbs1973] Gibbs J, Young RC, Smith GP. Cholecystokinin decreases food intake in rats. J Comp Physiol Psychol. 1973;84(3):488-95. PMID 4745816; doi:10.1037/h0034870. (validated: PubMed)
- [Kissileff1981] Kissileff HR, Pi-Sunyer FX, Thornton J, Smith GP. C-terminal octapeptide of cholecystokinin decreases food intake in man. Am J Clin Nutr. 1981;34(2):154-60. PMID 6259918; doi:10.1093/ajcn/34.2.154. (validated: PubMed)
- [Myers2010] Myers MG Jr, Leibel RL, Seeley RJ, Schwartz MW. Obesity and leptin resistance: distinguishing cause from effect. Trends Endocrinol Metab. 2010;21(11):643-51. PMID 20846876; PMCID PMC2967652; doi:10.1016/j.tem.2010.08.002. (validated: PubMed)
- [Cowley2001] Cowley MA, Smart JL, Rubinstein M, Cerdán MG, Diano S, Horvath TL, et al. Leptin activates anorexigenic POMC neurons through a neural network in the arcuate nucleus. Nature. 2001;411(6836):480-4. PMID 11373681; doi:10.1038/35078085. (validated: PubMed)
- [Balthasar2005] Balthasar N, Dalgaard LT, Lee CE, Yu J, Funahashi H, Williams T, et al. Divergence of melanocortin pathways in the control of food intake and energy expenditure. Cell. 2005;123(3):493-505. PMID 16269339; doi:10.1016/j.cell.2005.08.035. (validated: PubMed)
- [Tschop2000] Tschöp M, Smiley DL, Heiman ML. Ghrelin induces adiposity in rodents. Nature. 2000;407(6806):908-13. PMID 11057670; doi:10.1038/35038090. (validated: PubMed)
- [Nakazato2001] Nakazato M, Murakami N, Date Y, Kojima M, Matsuo H, Kangawa K, et al. A role for ghrelin in the central regulation of feeding. Nature. 2001;409(6817):194-8. PMID 11196643; doi:10.1038/35051587. (validated: PubMed)
- [Ahima1996] Ahima RS, Prabakaran D, Mantzoros C, Qu D, Lowell B, Maratos-Flier E, et al. Role of leptin in the neuroendocrine response to fasting. Nature. 1996;382(6588):250-2. PMID 8717038; doi:10.1038/382250a0. (validated: PubMed)
- [Grill2012] Grill HJ, Hayes MR. Hindbrain neurons as an essential hub in the neuroanatomically distributed control of energy balance. Cell Metab. 2012;16(3):296-309. PMID 22902836; PMCID PMC4862653; doi:10.1016/j.cmet.2012.06.015. (validated: PubMed)
- [Clement2020] Clément K, van den Akker E, Argente J, Bahm A, Chung WK, Connors H, et al. Efficacy and safety of setmelanotide, an MC4R agonist, in individuals with severe obesity due to LEPR or POMC deficiency: single-arm, open-label, multicentre, phase 3 trials. Lancet Diabetes Endocrinol. 2020;8(12):960-970. PMID 33137293; doi:10.1016/S2213-8587(20)30364-8. (validated: PubMed)
- [leRoux2006] le Roux CW, Aylwin SJ, Batterham RL, Borg CM, Coyle F, Prasad V, et al. Gut hormone profiles following bariatric surgery favor an anorectic state, facilitate weight loss, and improve metabolic parameters. Ann Surg. 2006;243(1):108-14. PMID 16371744; PMCID PMC1449984; doi:10.1097/01.sla.0000183349.16877.84. (validated: PubMed)
- [Holst2007] Holst JJ. The physiology of glucagon-like peptide 1. Physiol Rev. 2007;87(4):1409-39. PMID 17928588; doi:10.1152/physrev.00034.2006. (validated: PubMed)
- [Deacon1995] Deacon CF, Nauck MA, Toft-Nielsen M, Pridal L, Willms B, Holst JJ. Both subcutaneously and intravenously administered glucagon-like peptide I are rapidly degraded from the NH2-terminus in type II diabetic patients and in healthy subjects. Diabetes. 1995;44(9):1126-31. PMID 7657039; doi:10.2337/diab.44.9.1126. (validated: PubMed)
- [Kieffer1995] Kieffer TJ, McIntosh CH, Pederson RA. Degradation of glucose-dependent insulinotropic polypeptide and truncated glucagon-like peptide 1 in vitro and in vivo by dipeptidyl peptidase IV. Endocrinology. 1995;136(8):3585-96. PMID 7628397; doi:10.1210/endo.136.8.7628397. (validated: PubMed)
- [Nauck1986] Nauck M, Stöckmann F, Ebert R, Creutzfeldt W. Reduced incretin effect in type 2 (non-insulin-dependent) diabetes. Diabetologia. 1986;29(1):46-52. PMID 3514343; doi:10.1007/BF02427280. (validated: PubMed)
- [Flint1998] Flint A, Raben A, Astrup A, Holst JJ. Glucagon-like peptide 1 promotes satiety and suppresses energy intake in humans. J Clin Invest. 1998;101(3):515-20. PMID 9449682; PMCID PMC508592; doi:10.1172/JCI990. (validated: PubMed)
- [Drucker2018] Drucker DJ. Mechanisms of Action and Therapeutic Application of Glucagon-like Peptide-1. Cell Metab. 2018;27(4):740-756. PMID 29617641; doi:10.1016/j.cmet.2018.03.001. (validated: PubMed)
- [Muller2019GLP1] Müller TD, Finan B, Bloom SR, D'Alessio D, Drucker DJ, Flatt PR, et al. Glucagon-like peptide 1 (GLP-1). Mol Metab. 2019;30:72-130. PMID 31767182; PMCID PMC6812410; doi:10.1016/j.molmet.2019.09.010. (validated: PubMed)
- [Secher2014] Secher A, Jelsing J, Baquero AF, Hecksher-Sørensen J, Cowley MA, Dalbøge LS, et al. The arcuate nucleus mediates GLP-1 receptor agonist liraglutide-dependent weight loss. J Clin Invest. 2014;124(10):4473-88. PMID 25202980; PMCID PMC4215190; doi:10.1172/JCI75276. (validated: PubMed)
- [Gabery2020] Gabery S, Salinas CG, Paulsen SJ, Ahnfelt-Rønne J, Alanentalo T, Baquero AF, et al. Semaglutide lowers body weight in rodents via distributed neural pathways. JCI Insight. 2020;5(6):e133429. PMID 32213703; PMCID PMC7213778; doi:10.1172/jci.insight.133429. (validated: PubMed)
- [Blundell2017] Blundell J, Finlayson G, Axelsen M, Flint A, Gibbons C, Kvist T, et al. Effects of once-weekly semaglutide on appetite, energy intake, control of eating, food preference and body weight in subjects with obesity. Diabetes Obes Metab. 2017;19(9):1242-1251. PMID 28266779; PMCID PMC5573908; doi:10.1111/dom.12932. (validated: PubMed)
- [Friedrichsen2021] Friedrichsen M, Breitschaft A, Tadayon S, Wizert A, Skovgaard D. The effect of semaglutide 2.4 mg once weekly on energy intake, appetite, control of eating, and gastric emptying in adults with obesity. Diabetes Obes Metab. 2021;23(3):754-762. PMID 33269530; PMCID PMC7898914; doi:10.1111/dom.14280. (validated: PubMed)
- [Nauck1997] Nauck MA, Niedereichholz U, Ettler R, Holst JJ, Orskov C, Ritzel R, et al. Glucagon-like peptide 1 inhibition of gastric emptying outweighs its insulinotropic effects in healthy humans. Am J Physiol. 1997;273(5):E981-8. PMID 9374685; doi:10.1152/ajpendo.1997.273.5.E981. (validated: PubMed)
- [Baggio2007] Baggio LL, Drucker DJ. Biology of incretins: GLP-1 and GIP. Gastroenterology. 2007;132(6):2131-57. PMID 17498508; doi:10.1053/j.gastro.2007.03.054. (validated: PubMed)
- [Coskun2018] Coskun T, Sloop KW, Loghin C, Alsina-Fernandez J, Urva S, Bokvist KB, et al. LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: From discovery to clinical proof of concept. Mol Metab. 2018;18:3-14. PMID 30473097; PMCID PMC6308032; doi:10.1016/j.molmet.2018.09.009. (validated: PubMed)
- [Lau2015] Lau J, Bloch P, Schäffer L, Pettersson I, Spetzler J, Kofoed J, et al. Discovery of the Once-Weekly Glucagon-Like Peptide-1 (GLP-1) Analogue Semaglutide. J Med Chem. 2015;58(18):7370-80. PMID 26308095; doi:10.1021/acs.jmedchem.5b00726. (validated: PubMed)
- [Gutzwiller1999] Gutzwiller JP, Drewe J, Göke B, Schmidt H, Rohrer B, Lareida J, et al. Glucagon-like peptide-1 promotes satiety and reduces food intake in patients with diabetes mellitus type 2. Am J Physiol. 1999;276(5):R1541-4. PMID 10233049; doi:10.1152/ajpregu.1999.276.5.R1541. (validated: PubMed)
- [Cypess2009] Cypess AM, Lehman S, Williams G, Tal I, Rodman D, Goldfine AB, et al. Identification and importance of brown adipose tissue in adult humans. N Engl J Med. 2009;360(15):1509-17. PMID 19357406; PMCID PMC2859951; doi:10.1056/NEJMoa0810780. (validated: PubMed)
- [vanMarkenLichtenbelt2009] van Marken Lichtenbelt WD, Vanhommerig JW, Smulders NM, Drossaerts JM, Kemerink GJ, Bouvy ND, et al. Cold-activated brown adipose tissue in healthy men. N Engl J Med. 2009;360(15):1500-8. PMID 19357405; doi:10.1056/NEJMoa0808718. (validated: PubMed)
- [Virtanen2009] Virtanen KA, Lidell ME, Orava J, Heglind M, Westergren R, Niemi T, et al. Functional brown adipose tissue in healthy adults. N Engl J Med. 2009;360(15):1518-25. PMID 19357407; doi:10.1056/NEJMoa0808949. (validated: PubMed)
- [Spalding2008] Spalding KL, Arner E, Westermark PO, Bernard S, Buchholz BA, Bergmann O, et al. Dynamics of fat cell turnover in humans. Nature. 2008;453(7196):783-7. PMID 18454136; doi:10.1038/nature06902. (validated: PubMed)
- [Arner2010] Arner E, Westermark PO, Spalding KL, Britton T, Rydén M, Frisén J, et al. Adipocyte turnover: relevance to human adipose tissue morphology. Diabetes. 2010;59(1):105-9. PMID 19846802; PMCID PMC2797910; doi:10.2337/db09-0942. (validated: PubMed)
- [Weisberg2003] Weisberg SP, McCann D, Desai M, Rosenbaum M, Leibel RL, Ferrante AW Jr. Obesity is associated with macrophage accumulation in adipose tissue. J Clin Invest. 2003;112(12):1796-808. PMID 14679176; PMCID PMC296995; doi:10.1172/JCI19246. (validated: PubMed)
- [Xu2003] Xu H, Barnes GT, Yang Q, Tan G, Yang D, Chou CJ, et al. Chronic inflammation in fat plays a crucial role in the development of obesity-related insulin resistance. J Clin Invest. 2003;112(12):1821-30. PMID 14679177; PMCID PMC296998; doi:10.1172/JCI19451. (validated: PubMed)
- [Cinti2005] Cinti S, Mitchell G, Barbatelli G, Murano I, Ceresi E, Faloia E, et al. Adipocyte death defines macrophage localization and function in adipose tissue of obese mice and humans. J Lipid Res. 2005;46(11):2347-55. PMID 16150820; doi:10.1194/jlr.M500294-JLR200. (validated: PubMed)
- [Arita1999] Arita Y, Kihara S, Ouchi N, Takahashi M, Maeda K, Miyagawa J, et al. Paradoxical decrease of an adipose-specific protein, adiponectin, in obesity. Biochem Biophys Res Commun. 1999;257(1):79-83. PMID 10092513; doi:10.1006/bbrc.1999.0255. (validated: PubMed)
- [Hotamisligil1993] Hotamisligil GS, Shargill NS, Spiegelman BM. Adipose expression of tumor necrosis factor-alpha: direct role in obesity-linked insulin resistance. Science. 1993;259(5091):87-91. PMID 7678183; doi:10.1126/science.7678183. (validated: PubMed)
- [Neeland2019] Neeland IJ, Ross R, Després JP, Matsuzawa Y, Yamashita S, Shai I, et al. Visceral and ectopic fat, atherosclerosis, and cardiometabolic disease: a position statement. Lancet Diabetes Endocrinol. 2019;7(9):715-725. PMID 31301983; doi:10.1016/S2213-8587(19)30084-1. (validated: PubMed)
- [Taylor2015PFT] Taylor R, Holman RR. Normal weight individuals who develop type 2 diabetes: the personal fat threshold. Clin Sci (Lond). 2015;128(7):405-10. PMID 25515001; doi:10.1042/CS20140553. (validated: PubMed)
- [Taylor2023PFT] Taylor R, Barnes AC, Hollingsworth KG, Irvine KM, Solovyova AS, Clark L, et al. Aetiology of Type 2 diabetes in people with a 'normal' body mass index: testing the personal fat threshold hypothesis. Clin Sci (Lond). 2023;137(16):1333-1346. PMID 37593846; PMCID PMC10472166; doi:10.1042/CS20230586. (validated: PubMed)
- [Kahn2006] Kahn SE, Hull RL, Utzschneider KM. Mechanisms linking obesity to insulin resistance and type 2 diabetes. Nature. 2006;444(7121):840-6. PMID 17167471; doi:10.1038/nature05482. (validated: PubMed)
- [Becher2021] Becher T, Palanisamy S, Kramer DJ, Eljalby M, Marx SJ, Wibmer AG, et al. Brown adipose tissue is associated with cardiometabolic health. Nat Med. 2021;27(1):58-65. PMID 33398160; PMCID PMC8461455; doi:10.1038/s41591-020-1126-7. (validated: PubMed)
- [Fox2007Framingham] Fox CS, Massaro JM, Hoffmann U, Pou KM, Maurovich-Horvat P, Liu CY, et al. Abdominal visceral and subcutaneous adipose tissue compartments: association with metabolic risk factors in the Framingham Heart Study. Circulation. 2007;116(1):39-48. PMID 17576866; doi:10.1161/CIRCULATIONAHA.106.675355. (validated: PubMed)
- [Wu2012] Wu J, Boström P, Sparks LM, Ye L, Choi JH, Giang AH, et al. Beige adipocytes are a distinct type of thermogenic fat cell in mouse and human. Cell. 2012;150(2):366-76. PMID 22796012; PMCID PMC3402601; doi:10.1016/j.cell.2012.05.016. (validated: PubMed)
- [Lim2011] Lim EL, Hollingsworth KG, Aribisala BS, Chen MJ, Mathers JC, Taylor R. Reversal of type 2 diabetes: normalisation of beta cell function in association with decreased pancreas and liver triacylglycerol. Diabetologia. 2011;54(10):2506-14. PMID 21656330; PMCID PMC3168743; doi:10.1007/s00125-011-2204-7. (validated: PubMed)
- [Taylor2018CellMetab] Taylor R, Al-Mrabeh A, Zhyzhneuskaya S, Peters C, Barnes AC, Aribisala BS, et al. Remission of Human Type 2 Diabetes Requires Decrease in Liver and Pancreas Fat Content but Is Dependent upon Capacity for β Cell Recovery. Cell Metab. 2018;28(4):547-556.e3. PMID 30078554; doi:10.1016/j.cmet.2018.07.003. (validated: PubMed)
- [Saito2009] Saito M, Okamatsu-Ogura Y, Matsushita M, Watanabe K, Yoneshiro T, Nio-Kobayashi J, et al. High incidence of metabolically active brown adipose tissue in healthy adult humans: effects of cold exposure and adiposity. Diabetes. 2009;58(7):1526-31. PMID 19401428; PMCID PMC2699872; doi:10.2337/db09-0530. (validated: PubMed)
- [Sun2011] Sun K, Kusminski CM, Scherer PE. Adipose tissue remodeling and obesity. J Clin Invest. 2011;121(6):2094-101. PMID 21633177; PMCID PMC3104761; doi:10.1172/JCI45887. (validated: PubMed)
- [Kershaw2004] Kershaw EE, Flier JS. Adipose tissue as an endocrine organ. J Clin Endocrinol Metab. 2004;89(6):2548-56. PMID 15181022; doi:10.1210/jc.2004-0395. (validated: PubMed)
- [Tchernof2013] Tchernof A, Després JP. Pathophysiology of human visceral obesity: an update. Physiol Rev. 2013;93(1):359-404. PMID 23303913; doi:10.1152/physrev.00033.2011. (validated: PubMed)
- [Salans1973] Salans LB, Cushman SW, Weismann RE. Studies of human adipose tissue. Adipose cell size and number in nonobese and obese patients. J Clin Invest. 1973;52(4):929-41. PMID 4693656; PMCID PMC302341; doi:10.1172/JCI107258. (validated: PubMed)
- [Klein2004] Klein S, Fontana L, Young VL, Coggan AR, Kilo C, Patterson BW, et al. Absence of an effect of liposuction on insulin action and risk factors for coronary heart disease. N Engl J Med. 2004;350(25):2549-57. PMID 15201411; doi:10.1056/NEJMoa033179. (validated: PubMed)
- [Leibel1995] Leibel RL, Rosenbaum M, Hirsch J. Changes in energy expenditure resulting from altered body weight. N Engl J Med. 1995;332(10):621-8. PMID 7632212; doi:10.1056/NEJM199503093321001. (validated: PubMed)
- [Rosenbaum2005] Rosenbaum M, Goldsmith R, Bloomfield D, Magnano A, Weimer L, Heymsfield S, et al. Low-dose leptin reverses skeletal muscle, autonomic, and neuroendocrine adaptations to maintenance of reduced weight. J Clin Invest. 2005;115(12):3579-86. PMID 16322796; PMCID PMC1297250; doi:10.1172/JCI25977. (validated: PubMed)
- [Fothergill2016] Fothergill E, Guo J, Howard L, Kerns JC, Knuth ND, Brychta R, et al. Persistent metabolic adaptation 6 years after "The Biggest Loser" competition. Obesity (Silver Spring). 2016;24(8):1612-9. PMID 27136388; PMCID PMC4989512; doi:10.1002/oby.21538. (validated: PubMed)
- [Sumithran2011] Sumithran P, Prendergast LA, Delbridge E, Purcell K, Shulkes A, Kriketos A, et al. Long-term persistence of hormonal adaptations to weight loss. N Engl J Med. 2011;365(17):1597-604. PMID 22029981; doi:10.1056/NEJMoa1105816. (validated: PubMed)
- [Hall2011Lancet] Hall KD, Sacks G, Chandramohan D, Chow CC, Wang YC, Gortmaker SL, et al. Quantification of the effect of energy imbalance on bodyweight. Lancet. 2011;378(9793):826-37. PMID 21872751; PMCID PMC3880593; doi:10.1016/S0140-6736(11)60812-X. (validated: PubMed)
- [Speakman2011] Speakman JR, Levitsky DA, Allison DB, Bray MS, de Castro JM, Clegg DJ, et al. Set points, settling points and some alternative models: theoretical options to understand how genes and environments combine to regulate body adiposity. Dis Model Mech. 2011;4(6):733-45. PMID 22065844; PMCID PMC3209643; doi:10.1242/dmm.008698. (validated: PubMed)
- [Rosenbaum2010] Rosenbaum M, Leibel RL. Adaptive thermogenesis in humans. Int J Obes (Lond). 2010;34 Suppl 1:S47-55. PMID 20935667; PMCID PMC3673773; doi:10.1038/ijo.2010.184. (validated: PubMed)
- [Johannsen2012] Johannsen DL, Knuth ND, Huizenga R, Rood JC, Ravussin E, Hall KD. Metabolic slowing with massive weight loss despite preservation of fat-free mass. J Clin Endocrinol Metab. 2012;97(7):2489-96. PMID 22535969; PMCID PMC3387402; doi:10.1210/jc.2012-1444. (validated: PubMed)
- [Polidori2016] Polidori D, Sanghvi A, Seeley RJ, Hall KD. How Strongly Does Appetite Counter Weight Loss? Quantification of the Feedback Control of Human Energy Intake. Obesity (Silver Spring). 2016;24(11):2289-2295. PMID 27804272; PMCID PMC5108589; doi:10.1002/oby.21653. (validated: PubMed)
- [Hall2008] Hall KD. What is the required energy deficit per unit weight loss? Int J Obes (Lond). 2008;32(3):573-6. PMID 17848938; PMCID PMC2376744; doi:10.1038/sj.ijo.0803720. (validated: PubMed)
- [Schwartz2017EndoSoc] Schwartz MW, Seeley RJ, Zeltser LM, Drewnowski A, Ravussin E, Redman LM, et al. Obesity Pathogenesis: An Endocrine Society Scientific Statement. Endocr Rev. 2017;38(4):267-296. PMID 28898979; PMCID PMC5546881; doi:10.1210/er.2017-00111. (validated: PubMed)
- [Ludwig2021CIM] Ludwig DS, Aronne LJ, Astrup A, de Cabo R, Cantley LC, Friedman MI, et al. The carbohydrate-insulin model: a physiological perspective on the obesity pandemic. Am J Clin Nutr. 2021;114(6):1873-1885. PMID 34515299; PMCID PMC8634575; doi:10.1093/ajcn/nqab270. (validated: PubMed)
- [Hall2022EBM] Hall KD, Farooqi IS, Friedman JM, Klein S, Loos RJF, Mangelsdorf DJ, et al. The energy balance model of obesity: beyond calories in, calories out. Am J Clin Nutr. 2022;115(5):1243-1254. PMID 35134825; PMCID PMC9071483; doi:10.1093/ajcn/nqac031. (validated: PubMed)
- [Ravussin1988] Ravussin E, Lillioja S, Knowler WC, Christin L, Freymond D, Abbott WG, et al. Reduced rate of energy expenditure as a risk factor for body-weight gain. N Engl J Med. 1988;318(8):467-72. PMID 3340128; doi:10.1056/NEJM198802253180802. (validated: PubMed)
- [Rosenbaum2008] Rosenbaum M, Sy M, Pavlovich K, Leibel RL, Hirsch J. Leptin reverses weight loss-induced changes in regional neural activity responses to visual food stimuli. J Clin Invest. 2008;118(7):2583-91. PMID 18568078; PMCID PMC2430499; doi:10.1172/JCI35055. (validated: PubMed)
- [Martins2020] Martins C, Gower BA, Hill JO, Hunter GR. Metabolic adaptation is not a major barrier to weight-loss maintenance. Am J Clin Nutr. 2020;112(3):558-565. PMID 32386226; PMCID PMC7458773; doi:10.1093/ajcn/nqaa086. (validated: PubMed)
- [Hall2017Gastro] Hall KD, Guo J. Obesity Energetics: Body Weight Regulation and the Effects of Diet Composition. Gastroenterology. 2017;152(7):1718-1727.e3. PMID 28193517; PMCID PMC5568065; doi:10.1053/j.gastro.2017.01.052. (validated: PubMed)
- [MacLean2011] Maclean PS, Bergouignan A, Cornier MA, Jackman MR. Biology's response to dieting: the impetus for weight regain. Am J Physiol Regul Integr Comp Physiol. 2011;301(3):R581-600. PMID 21677272; PMCID PMC3174765; doi:10.1152/ajpregu.00755.2010. (validated: PubMed)
- [Wilding2022STEP1ext] Wilding JPH, Batterham RL, Davies M, Van Gaal LF, Kandler K, Konakli K, et al. Weight regain and cardiometabolic effects after withdrawal of semaglutide: The STEP 1 trial extension. Diabetes Obes Metab. 2022;24(8):1553-1564. PMID 35441470; PMCID PMC9542252; doi:10.1111/dom.14725. (validated: PubMed)
- [Rubino2025Commission] Rubino F, Cummings DE, Eckel RH, Cohen RV, Wilding JPH, Brown WA, et al. Definition and diagnostic criteria of clinical obesity. Lancet Diabetes Endocrinol. 2025;13(3):221-262. PMID 39824205; PMCID PMC11870235; doi:10.1016/S2213-8587(24)00316-4. (validated: PubMed)
- [FDA-Wegovy] Novo Nordisk. WEGOVY (semaglutide) injection and tablets. US prescribing information. openFDA drug label set_id ee06186f-2aa3-4990-a760-757579d8f77b, effective 2026-06-18. Sections 1, 2, 4, 5, 6, 8, 12 and boxed warning read; Recent Major Changes record removal of Suicidal Behavior and Ideation warning 02/2026. (validated: openFDA)
- [FDA-Zepbound] Eli Lilly and Company. ZEPBOUND (tirzepatide) injection. US prescribing information. openFDA drug label set_id 487cd7e7-434c-4925-99fa-aa80b1cc776b, effective 2026-08-28; NDA217806. Sections 1, 2, 5, 6, 7, 8, 12 and boxed warning read. (validated: openFDA)

## Provenance
- Every PubMed record was retrieved by PMID with E-utilities esummary (authors, title, journal, year, volume, issue, pages, PMCID, DOI). These fields were copied into the Sources lines programmatically, not from memory. Abstracts were read with efetch, and every number above is taken from them.
- The two labels were retrieved from the openFDA drug label endpoint (`openfda.brand_name`). Only the mechanism (12.1), pharmacodynamics (12.2) and pharmacokinetics (12.3) sections were used. The Wegovy record is a repackager listing of the Novo Nordisk NDA215256 label, effective 2024-04-23. A newer manufacturer-listed version may exist outside openFDA.
- No abstract in PubMed: Farooqi 1999 (used only together with Cowley 2001, whose abstract states the leptin-replacement effect) and Gibbs 1973 (used only for the finding stated in its title).
- Considered and dropped: Vaisse 1998 (Nat Genet; no abstract), Taylor 2013 (Diabetes Care; no abstract), Shulman 2014 NEJM review (no abstract, so no numbers could be checked), Woods 1998 and Rosen & Spiegelman 2014 (redundant reviews). I found no PubMed record for a "Biggest Loser" figure larger than the ones given, and none was invented.
- Not sourced to a number: the textbook "GLP-1 half-life ≈ 2 min". It is replaced by the sourced rat figure (over 50% degraded within 2 min) and the human intact-fraction data.
- Sumithran 2011 hormone magnitudes (percent changes) are in the full text, which is behind the NEJM paywall. Only directions and P values from the abstract are used.
- No source carries an (unverified) mark. Sources validated: 93 by PubMed and 2 by openFDA.
