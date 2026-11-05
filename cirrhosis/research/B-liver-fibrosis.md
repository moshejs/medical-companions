# B · Liver biology, fibrosis mechanisms & regression

Pass date: 2026-11-04. Modules served: liver, fibrosis, frontier.

This pass covers how a healthy liver is built and what it does, how chronic injury of any cause (MASLD, viral hepatitis, alcohol-related liver disease, autoimmune, cholestatic and genetic disease) turns into scar and then cirrhosis, how fibrosis is staged under the microscope, how fast it progresses, the evidence that fibrosis and even cirrhosis can regress, and the research frontier (antifibrotic and metabolic drugs, cell therapy, liver support devices, machine perfusion, xenotransplantation, statins). Portal hypertension mechanics are only pointed to here; pass F covers them in depth. Non-invasive tests and scores belong to pass E.

Access notes:
- PubMed E-utilities returned HTTP 429 for much of the session (many parallel agents). Searches and abstracts were therefore run through Europe PMC (`resultType=core`), and every PubMed record was then re-checked in one batched PubMed `esummary` call once the rate limit cleared. All 81 journal sources below matched on authors, title, journal, year, volume/pages, PMCID and DOI.
- Anatomy numbers that are not in abstracts (blood-flow split, stellate-cell share of liver cells, vitamin A storage, 6-fold matrix increase, fenestra size) were read from the open full texts on PMC: Eipel 2010 (PMC3012579), Trefts 2017 (PMC5897118), Friedman 2008 (PMC2888531), Bataller 2005 (PMC546435), Garcia-Tsao 2010 (PMC2882065), Schuppan 2008 (PMC2271178).
- Trial registrations were checked on ClinicalTrials.gov API v2 (status and primary completion dates as of 2026-11-04). The resmetirom label was checked on openFDA (effective 2026-07-29).
- Shared canonical keys used: Gines2021Lancet (PMID 34543610), Harrison2024MAESTRO (38324483), Rinella2023MASLD (Hepatology version, 37363821; co-published J Hepatol 37364790). Each was checked. The other canonical keys belong to other passes and are not cited here.
- Older source titles use terms like "alcoholic hepatitis" and "nonalcoholic". They are quoted as published. The prose uses current, non-stigmatising terms (alcohol-related hepatitis, MASLD/MASH).

## Findings

### liver · Size, blood supply and the lobule
- The liver makes up about 2.5% of body weight but receives nearly 25% of cardiac output. Total hepatic blood flow is 800–1200 mL/min, about 100 mL/min per 100 g of liver [[Eipel2010]].
- Dual blood supply: 75–80% of blood entering the liver comes through the portal vein. This is partly deoxygenated venous blood draining the spleen, stomach, intestines, gallbladder and pancreas. The hepatic artery supplies the remaining ~25% as well-oxygenated blood [[Eipel2010]].
- Hepatic arterial oxygen saturation usually exceeds 95%. Fasting portal venous blood reaches up to 85% saturation [[Eipel2010]].
- The portal vein is a valveless, low-pressure, low-resistance circuit. The hepatic artery is a high-pressure, high-resistance system [[Eipel2010]].
- Hepatic arterial buffer response: when portal flow falls, hepatic arterial flow rises and can buffer 25–60% of the lost portal flow. Temporarily occluding the portal vein in patients raised hepatic arterial flow by about 30% [[Eipel2010]].
- Sinusoidal pressure is estimated at only 2–4 mmHg above the pressure in the smallest collecting veins or the inferior vena cava [[Eipel2010]].
- The liver is a blood reservoir. Sinusoids hold up to 60% of hepatic blood volume, and the liver can make up for up to 25% of a haemorrhage by expelling blood from its capacitance vessels [[Eipel2010]].
- The classic structural unit is the hexagonal lobule. Plates (cords) of hepatocytes radiate around a central vein, with portal triads (hepatic artery, portal vein and bile duct branches) at the corners. Arterial and portal blood mix in the sinusoids and flow toward the central vein [[Trefts2017]].
- Blood flowing along the lobule creates gradients of oxygen, nutrients, hormones and waste. Functions split along these gradients ("metabolic zonation"), usually described as three zones, from periportal zone 1 to pericentral zone 3. In reality zonation is a continuum, and zone 2 hepatocytes can take on zone 1 functions after damage [[Trefts2017]].
- In mice, single-cell spatial transcriptomics found that about 50% of liver genes are significantly zonated, including a spatial order of bile acid enzymes that matches their order in the enzymatic pathway [[Halpern2017,BenMoshe2019]].
- The oxygen gradient, β-catenin and hedgehog signalling, and hypoxia-inducible factors interact to set zonation. Zonation is often lost in liver disease [[Kietzmann2017]].
- Bile flows in canaliculi (~1 µm wide) formed between adjacent hepatocytes, countercurrent to portal blood flow, then via the canals of Hering into bile ducts [[Boyer2013]].

### liver · Cell types
- Hepatocytes are the main epithelial cells. They make up most of the liver's volume and do most of its metabolic and synthetic work. Cholangiocytes line the bile ducts and are the second most abundant epithelial cell [[Trefts2017]].
- Liver sinusoidal endothelial cells (LSECs) form fenestrated "sieve plates" with pores of 50–180 nm in humans. They have no tight junctions, so plasma reaches hepatocytes almost directly [[Trefts2017]].
- LSECs combine fenestrae, no diaphragm and no basement membrane, which makes them the most permeable endothelial cells in mammals. They also have the highest endocytic capacity of any human cell [[Poisson2017]].
- In health, LSECs keep portal pressure low despite large post-meal changes in flow, and keep stellate cells quiescent [[Poisson2017]].
- Hepatic stellate cells live in the space of Disse, between hepatocytes and LSECs. They make up about one-third of non-parenchymal cells and ~15% of all resident liver cells [[Friedman2008PhysiolRev]].
- About 50–80% of the body's total retinoid (vitamin A) is stored in the liver, and 80–90% of that is held in stellate cells, mostly as retinyl esters in lipid droplets [[Friedman2008PhysiolRev]].
- Kupffer cells are the liver's resident macrophages and make up 80–90% of all tissue macrophages in the body. They sit inside the sinusoids, where they are constantly exposed to gut-derived bacteria and endotoxin [[Bilzer2006]].
- Kupffer cells are a self-sustaining resident population. They differ from monocyte-derived macrophages, which flood in after injury and can either drive or resolve fibrosis [[Krenkel2017]].

### liver · What the liver does (plain-words teaching anchors)
- Protein synthesis: the liver makes 85–90% of circulating protein volume. Albumin is the most abundant secreted protein, about 55% of total plasma protein [[Trefts2017]].
- Albumin turnover: in healthy people, the liver makes about 10.5 g of albumin per day. The albumin turnover time is about 25 days, and clearance is roughly 84% catabolic, 10% gastrointestinal and 6% renal. Reduced synthesis in liver disease is the best-understood cause of chronic hypoalbuminaemia [[Levitt2016]].
- Glucose: after a meal, the liver stores glucose as glycogen. During fasting, it releases glucose by glycogenolysis and gluconeogenesis, and gluconeogenesis becomes the main source of glucose in prolonged fasting. In fasting it also makes ketone bodies from fatty acids to fuel other tissues [[Rui2014,Trefts2017]].
- Nitrogen disposal: the liver processes amino acids and disposes of nitrogenous waste as urea [[Trefts2017]].
- Drug metabolism: about a dozen cytochrome P450 enzymes (CYP1, 2 and 3 families) metabolise 70–80% of drugs in clinical use. The most abundant hepatic forms are CYP3A4, 2C9, 2C8, 2E1 and 1A2 [[Zanger2013]].
- Bile: about 5% of bile is organic and inorganic solutes. Secretion is driven by ATP-binding cassette export pumps at the hepatocyte's canalicular membrane [[Boyer2013]].
- Regeneration: the liver is the only solid organ that restores itself to 100% of the liver-to-body-weight ratio the body needs (the "hepatostat"). Acute regeneration is beneficial. Chronic hepatocyte loss, by contrast, often leads to fibrosis, cirrhosis and neoplasia [[Michalopoulos2021]].
- Normal hepatocyte turnover is very slow, yet in recolonisation models hepatocytes show unlimited regenerative capacity [[Michalopoulos2021]].

### fibrosis · What fibrosis and cirrhosis are
- Liver fibrosis is the excessive build-up of extracellular matrix (ECM) proteins, including collagen, and occurs in most chronic liver diseases. Advanced fibrosis leads to cirrhosis, liver failure and portal hypertension [[Bataller2005]].
- In advanced fibrosis, the liver contains about 6 times more ECM than normal, including collagens I, III and IV, fibronectin, undulin, elastin, laminin, hyaluronan and proteoglycans [[Bataller2005]].
- ECM accumulates because synthesis rises and degradation falls. Matrix-degrading enzymes (MMPs) are held back mainly by overexpression of their inhibitors, the TIMPs [[Bataller2005]].
- Cirrhosis is defined histologically as regenerative nodules surrounded by fibrous bands in response to chronic injury, which leads to portal hypertension and end-stage liver disease [[Schuppan2008]].
- Cirrhosis develops after a long period of inflammation that replaces healthy parenchyma with fibrotic tissue and regenerative nodules. It moves from an asymptomatic compensated phase to a symptomatic decompensated phase [[Gines2021Lancet]].
- Causes are many: obesity and fatty liver disease, high alcohol intake, hepatitis B or C, autoimmune and cholestatic diseases, and iron or copper overload [[Gines2021Lancet]].
- Fatty liver nomenclature changed in 2023. NAFLD became metabolic dysfunction-associated steatotic liver disease (MASLD), and NASH became metabolic dysfunction-associated steatohepatitis (MASH) [[Rinella2023MASLD]].
- Progressive liver fibrosis from chronic viral and metabolic disease leads to more than one million deaths a year through cirrhosis [[Higashi2017]].

### fibrosis · Stellate-cell activation: the central engine
- Stellate-cell activation means quiescent, vitamin A-storing cells transdifferentiating into proliferative, fibrogenic myofibroblasts. It is well established as the central driver of fibrosis in experimental and human liver injury (Established) [[Tsuchida2017]].
- In mouse models of toxic, cholestatic and fatty liver disease, fate tracing showed that stellate cells give rise to 82–96% of myofibroblasts. A Cre line marked 99% of stellate cells [[Mederacke2013]].
- Other collagen-producing cells include portal fibroblasts and bone marrow-derived myofibroblasts. Fibrogenic signals include TGF-β1, angiotensin II and leptin [[Bataller2005]].
- TGF-β1 is the strongest fibrogenic cytokine. It drives the switch to myofibroblast-like cells, stimulates ECM synthesis and blocks ECM degradation [[Bataller2005]].
- PDGF is the most potent mitogen for stellate cells and is upregulated in fibrotic liver. Blocking it reduces experimental fibrosis [[Bataller2005]].
- Activation is shaped by many pathways and cells:
  - pathways: autophagy, endoplasmic reticulum stress, oxidative stress, retinol and cholesterol metabolism, epigenetics
  - cells: macrophages, hepatocytes, LSECs, NK and NKT cells, platelets and B cells [[Tsuchida2017]]
- Apoptosis of damaged hepatocytes stimulates the fibrogenic actions of stellate cells [[Bataller2005]].
- Gut–liver axis (Early evidence, mouse): intestinal bacteria and TLR4 are required for fibrogenesis in mice. Lipopolysaccharide acting on TLR4 in quiescent stellate cells lowers the TGF-β pseudoreceptor Bambi and sensitises the cells to TGF-β [[Seki2007]].
- Single-cell atlas of human cirrhosis (more than 100,000 cells): it identified a scar-associated TREM2+CD9+ macrophage subset that comes from circulating monocytes and is pro-fibrogenic. It also found ACKR1+ and PLVAP+ endothelial cells confined to the fibrotic niche, and PDGFRα+ collagen-producing mesenchymal cells, with TNFRSF12A, PDGFR and NOTCH signalling active inside the scar [[Ramachandran2019]].
- Stellate cells can be cleared or switched off in three ways: apoptosis, senescence, or reversion to an inactivated state [[Tsuchida2017]].

### fibrosis · Sinusoids, nodules and the road to portal hypertension (pointer to F)
- Capillarisation comes before fibrosis and allows stellate-cell activation and fibrosis to proceed. In capillarisation, LSECs lose their fenestrae and an organised basement membrane forms [[DeLeve2015]].
- Restoring LSEC differentiation in vivo (via VEGF/nitric oxide pathways) promotes stellate-cell quiescence, enhances fibrosis regression and prevents progression to cirrhosis (Early evidence, animal) [[DeLeve2015]].
- In chronic disease, LSECs become capillarised, lose their protective properties, and promote angiogenesis and vasoconstriction [[Poisson2017]].
- Dysfunction of the liver microcirculation (LSECs, stellate cells and macrophages) is a key mechanism of progressive chronic liver disease and of portal hypertension [[GraciaSancho2019]].
- Cirrhosis raises intrahepatic resistance through architectural distortion (scar plus nodules) and through active contraction. Activated stellate cells contract and raise resistance to sinusoidal blood flow [[Bataller2005,Schuppan2008]].
- A hepatic venous pressure gradient (HVPG) above 10 mmHg defines clinically significant portal hypertension. Recurrent variceal bleeding and ascites do not occur when HVPG is lowered below 12 mmHg (details in pass F) [[GarciaTsao2010]].
- Fibrous septal thickness on biopsy correlates with HVPG and independently predicts clinically significant portal hypertension and decompensation. Digital septal thickness predicts decompensation, but total fibrosis area does not [[GarciaTsao2010]].
- Some patients without histological cirrhosis already have an HVPG above 6 mmHg (portal hypertension). On follow-up, HVPG predicted decompensation better than fibrosis stage did [[GarciaTsao2010]].

### fibrosis · Staging under the microscope
- METAVIR stages fibrosis from F0 (no fibrosis) to F4 (cirrhosis) on a five-point scale and grades activity from A0 to A3 [[Poynard1997,Bedossa1996]].
- The METAVIR activity algorithm combines piecemeal and lobular necrosis. It agreed with the panel's reference grading in 84% of 363 hepatitis C biopsies (kappa 0.75) [[Bedossa1996]].
- The Ishak system stages fibrosis from 0 to 6. In the tenofovir regression study, cirrhosis was defined as Ishak 5 or 6 [[Ishak1995,Marcellin2013]].
- The NASH CRN (Kleiner) system scores fibrosis 0–4. Its NAFLD activity score (NAS) is the unweighted sum of steatosis (0–3), lobular inflammation (0–2) and ballooning (0–2). Inter-rater kappa for fibrosis was 0.84 [[Kleiner2005]].
- Laennec substages cirrhosis into 4A, 4B and 4C. In 175 people with stage 3–4 fibrosis, liver-related events occurred in 8.7% (stage 3), 12.5% (4A), 20.7% (4B) and 29.0% (4C). Versus stage 3, the hazard ratios were 6.16 for 4B and 8.95 for 4C [[Kim2012Laennec]].
- The Beijing classification adds a "quality of fibrosis" score, P-I-R: predominantly progressive, indeterminate or predominantly regressive [[Theise2018Beijing]].
- In 646 people with hepatitis B on entecavir-based therapy:
  - P-I-R before treatment: 70% progressive, 17% indeterminate, 13% regressive
  - P-I-R at week 72: 20% progressive, 14% indeterminate, 64% regressive
  - 7-year HCC incidence by P-I-R class: 1.5% regressive, 4.3% indeterminate, 22.8% progressive [[Chang2024PIR]]
- Sampling error: in 124 people with hepatitis C who had simultaneous right- and left-lobe biopsies, 33.1% differed by at least one stage. In 14.5%, one lobe read as cirrhosis and the other as stage 3 [[Regev2002]].
- With a 15 mm biopsy, 65% of specimens were staged correctly against the whole-section reference. At 25 mm this rose to 75%. The authors suggest at least 25 mm for semiquantitative staging [[Bedossa2003]].
- Staging systems were built for progressing disease and are limited by their categorical nature. The clinical significance of regressive features remains largely unstudied [[Burt2026]].

### fibrosis · How fast fibrosis progresses (decades, not months)
- Untreated hepatitis C (2235 patients): the median fibrosis progression rate was 0.133 METAVIR units per year (95% CI 0.125–0.143) [[Poynard1997]].
- In the same cohort, the median estimated time to cirrhosis was 30 years (28–32). It ranged from 13 years in men infected after age 40 to 42 years in women who did not drink alcohol and were infected before age 40 [[Poynard1997]].
- In the same cohort, 33% had an expected median time to cirrhosis of under 20 years, and 31% would never progress or would take at least 50 years [[Poynard1997]].
- Three factors independently sped progression: infection after age 40, drinking 50 g of alcohol or more daily, and male sex. HCV genotype had no effect [[Poynard1997]].
- Meta-analysis of 111 hepatitis C studies (n=33,121): annual stage transition probabilities were F0→F1 0.117, F1→F2 0.085, F2→F3 0.120 and F3→F4 0.116 [[Thein2008]].
- In the same meta-analysis, estimated cirrhosis prevalence 20 years after infection was 16% (14–19%) [[Thein2008]].
- MASLD paired-biopsy meta-analysis (411 people): annual progression was 0.07 stages for steatosis alone (NAFL) and 0.14 for steatohepatitis (NASH). That is one stage per 14.3 years (NAFL) or 7.1 years (NASH) [[Singh2015]].
- Over follow-up in the same meta-analysis, 33.6% progressed, 43.1% stayed stable and 22.3% improved [[Singh2015]].

### fibrosis · Why stage matters: fibrosis drives outcomes
- In MASLD with a median 12.6 years of follow-up, fibrosis stage was the only histologic feature linked to death or transplant. Hazard ratios versus stage 0 were 1.88 (F1), 2.89 (F2), 3.76 (F3) and 10.9 (F4) [[Angulo2015]].
- Meta-analysis of 1495 people with MASLD: all-cause mortality rate ratio by fibrosis stage versus F0 was 1.58 (F1), 2.52 (F2), 3.48 (F3) and 6.40 (F4) [[Dulai2017]].
- In the same meta-analysis, liver-related mortality rose steeply: rate ratios of 1.41 (F1), 9.57 (F2), 16.69 (F3) and 42.30 (F4) [[Dulai2017]].
- In a prospective MASLD cohort (n=1773, median 4 years), all-cause deaths per 100 person-years were 0.32 for F0–F2, 0.89 for F3 and 1.76 for F4 [[Sanyal2021NAFLD]].
- In a 33-year MASLD cohort, fibrosis stage 3–4 raised mortality regardless of NAS (HR 3.3). NAS did not predict overall mortality [[Ekstedt2015]].

### fibrosis · Regression: the scar can shrink
- Clinical and experimental fibrosis regresses when the cause is removed. Activated myofibroblasts are eliminated and the scar is resorbed (Established) [[Kisseleva2021]].
- Rat model: after toxin withdrawal, advanced septal fibrosis was remodelled to near-normal over 28 days. Activated stellate cells fell 12-fold through apoptosis, and TIMP-1 and TIMP-2 expression dropped quickly while collagenase activity rose [[Iredale1998]].
- In mouse CCl4 and alcohol-induced models, about half of myofibroblasts escape apoptosis during regression. They revert to an inactive phenotype, but one that reactivates more quickly with new injury [[Kisseleva2012]].
- During resolution, interstitial MMPs degrade fibrillar collagens I and III (MMP-1, -8 and -13 in humans), as TIMP-1 expression falls quickly [[Bataller2005]].
- Hepatitis B on tenofovir for 5 years: of 348 patients with paired biopsies, 87% improved histologically and 51% had fibrosis regression [[Marcellin2013]].
- In the same tenofovir study, 71 of the 96 patients with cirrhosis at baseline (Ishak 5–6), or 74%, no longer had cirrhosis at year 5 [[Marcellin2013]].
- Hepatitis B on entecavir (median biopsy at 6 years): Ishak fibrosis improved by at least one point in 88%, including all 10 patients with advanced fibrosis or cirrhosis at baseline [[Chang2010Entecavir]].
- Hepatitis C cirrhosis with sustained virological response (n=38, paired biopsies, 61 months): cirrhosis regressed in 61% and collagen content fell in 89% [[DAmbrosio2012]].
- In the same SVR study, metabolic zonation recovered in 73–79%, but sinusoidal capillarisation did not change [[DAmbrosio2012]].
- Hepatitis C cirrhosis after interferon therapy (96 patients, median 118 months): 18 regressed to METAVIR ≤F2. Their liver-related event rate was 0 per 100 patient-years, versus 4 without regression [[Mallet2008]].
- In the same cohort, 10-year transplant-free survival was 100% with regression versus 74.2% without. Population statistics from a small retrospective cohort [[Mallet2008]].
- Alcohol-related hepatitis without cirrhosis (26 patients, repeat biopsies over ~1.7 years): liver lesions improved in 9 of 13 people who stopped drinking and in 3 who markedly cut down. Five of 9 who kept drinking heavily developed cirrhosis [[Pares1986]].
- In the same study, 4 of 7 women progressed to cirrhosis despite abstinence, versus 0 of 6 men [[Pares1986]].
- MASLD, lifestyle (293 people, 52 weeks): fibrosis regressed in 19% overall. Among those who lost 10% or more of body weight, 90% had NASH resolution and 45% had fibrosis regression [[VilarGomez2015]].
- MASLD, bariatric surgery (5 years): NASH resolved without worsening fibrosis in 84%. Fibrosis decreased in 70.2% and disappeared in 56% [[Lassailly2020]].
- Wanless described the morphology of regressing cirrhosis, which he called the "hepatic repair complex": delicate perforated septa, isolated thick collagen fibres, minute regenerative nodules and similar features. He argued that many cases of incomplete septal cirrhosis are regressed cirrhosis [[Wanless2000]].
- Since then, cirrhosis regression has been documented after successful therapy of hepatitis B, hepatitis C, autoimmune hepatitis and haemochromatosis. Many vascular lesions are thought not to regress [[Hytiroglou2018]].
- Cirrhosis that has regressed still carries molecular changes that can lead to liver cancer, so HCC surveillance continues (details in pass E) [[Hytiroglou2018]].

### fibrosis · The "point of no return" debate
- The point at which cirrhosis becomes truly irreversible has not been established, either morphologically or functionally [[GarciaTsao2010]].
- Septal features linked to irreversibility in experimental models are matrix cross-linking, elastin-rich scars, septal neovascularisation, and loss of the cells that drive matrix turnover [[GarciaTsao2010]].
- Rat model (12 weeks of CCl4, up to 366 days of recovery): micronodular cirrhosis remodelled to macronodular cirrhosis. The residual septa were hypocellular and cross-linked by tissue transglutaminase, which suggests resolution is limited by cross-linking and failed stellate-cell apoptosis [[Issa2004]].
- Cirrhosis of recent onset, with thin septa and mild vascular change, is considered more likely to improve [[Hytiroglou2018]].
- Pathologists in 2026 call for better tools, possibly AI-assisted, to define the "point of no return" in advanced fibrosis [[Burt2026]].
- With current treatment, "for many patients, cirrhosis is not an end-stage condition anymore" (Hytiroglou and Theise) [[Hytiroglou2018]].

### frontier · Approved and late-stage drugs for MASH fibrosis
- Resmetirom, an oral thyroid hormone receptor-β agonist, was tested in the phase 3 MAESTRO-NASH trial (966 people, F1B–F3, 52 weeks):
  - NASH resolution without fibrosis worsening: 25.9% on 80 mg and 29.9% on 100 mg, versus 9.7% on placebo
  - fibrosis improvement of at least 1 stage: 24.2% and 25.9%, versus 14.2% (Established) [[Harrison2024MAESTRO]]
- US label for resmetirom: indicated with diet and exercise for adults with noncirrhotic MASH and moderate to advanced fibrosis (F2–F3) under accelerated approval. The label says to avoid use in decompensated cirrhosis. Doses as published: 80 mg daily under 100 kg, 100 mg daily at 100 kg or more [[FDA-Rezdiffra]].
- Resmetirom outcomes trial: MAESTRO-NASH-OUTCOMES is testing resmetirom on liver-related outcomes in well-compensated (Child–Pugh A) MASH cirrhosis (n=845). It is active, not recruiting, with primary completion listed as 2026-12 [[NCT05500222]].
- Semaglutide 2.4 mg weekly, a GLP-1 receptor agonist, was tested in phase 3 ESSENCE (800 people, F2–F3, week 72):
  - steatohepatitis resolution: 62.9% versus 34.3% on placebo
  - fibrosis reduction: 36.8% versus 22.4% (difference 14.4 points; 95% CI 7.5–21.3)
  - mean weight change: −10.5% versus −2.0% (Established) [[Sanyal2025ESSENCE]]
- ESSENCE part 2 (cirrhosis-free survival) continues, with primary completion listed as 2029-04 [[NCT04822181]].
- Earlier phase 2 semaglutide trial (NASH, 72 weeks): NASH resolution was 59% on 0.4 mg daily versus 17% on placebo. Fibrosis improvement did not differ (43% vs 33%, P=0.48) [[Newsome2021Sema]].
- Semaglutide in compensated MASH cirrhosis (phase 2, 71 people, 48 weeks): there was no significant fibrosis benefit (11% vs 29% on placebo). There were no decompensating events or deaths (Early evidence) [[Loomba2023SemaCirrhosis]].
- Tirzepatide, a dual GIP/GLP-1 agonist (phase 2 SYNERGY-NASH, 52 weeks), at 5/10/15 mg:
  - MASH resolution: 44%, 56% and 62%, versus 10% on placebo
  - fibrosis improvement of at least 1 stage: 55%, 51% and 51%, versus 30% (Early evidence) [[Loomba2024SYNERGY]]
- Lanifibranor, a pan-PPAR agonist (phase 2b NATIVE, 247 people, 24 weeks), at 1200 mg and 800 mg:
  - SAF-A drop of at least 2 points: 55% on 1200 mg versus 33% on placebo
  - fibrosis improvement of at least 1 stage: 48% and 34%, versus 29%
  - side effects included weight gain, oedema and anaemia (Early evidence) [[Francque2021NATIVE]]
- The phase 3 NATiV3 trial (F2–F3, n=1000) is active, not recruiting, with primary completion listed as 2026-09-29 [[NCT04849728]].
- Efruxifermin, an FGF21 analogue (phase 2b HARMONY, F2–F3, 24 weeks): fibrosis improved by at least 1 stage in 39% (28 mg) and 41% (50 mg), versus 20% on placebo (Early evidence) [[Harrison2023HARMONY]].
- Efruxifermin in compensated MASH cirrhosis (SYMMETRY, 181 people):
  - week 36 (primary endpoint, not met): fibrosis reduction in 19% on 50 mg versus 13% on placebo
  - week 96: 29% versus 11% (difference 16 points; 95% CI 2–30) (Early evidence) [[Noureddin2025SYMMETRY]]
- A phase 3 efruxifermin outcomes trial in compensated MASH cirrhosis (n=2150) is recruiting [[NCT06528314]].
- Pegozafermin, an FGF21 analogue (phase 2b ENLIVEN), at 30 and 44 mg: fibrosis improved in 26% and 27%, versus 7% on pooled placebo (Early evidence) [[Loomba2023ENLIVEN]].
- A phase 3 pegozafermin trial in compensated MASH cirrhosis (ENLIGHTEN-Cirrhosis, n=1800, now sponsored by Hoffmann-La Roche) is recruiting [[NCT06419374]].
- Survodutide, a glucagon/GLP-1 dual agonist, is in a phase 3 outcomes trial in compensated MASH cirrhosis (LIVERAGE-Cirrhosis, n=1590), which is recruiting [[NCT06632457]].
- Pattern across trials: drugs that clearly reverse fibrosis at F2–F3 have so far shown smaller or delayed effects once cirrhosis is established (semaglutide; efruxifermin at 36 weeks). Outcome trials in cirrhosis report from about 2026 to 2030 (Early evidence) [[Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY,NCT05500222,NCT06528314]].
- Antifibrotic strategies are classed in four groups: (1) cure or control the primary disease, (2) target receptor–ligand signalling, (3) inhibit fibrogenesis, and (4) promote resolution [[Lee2015Gut]].
- Validating non-invasive markers that could replace biopsy and shorten trials remains a key unmet need [[Lee2015Gut]].

### frontier · Statins in cirrhosis
- BLEPS: adding simvastatin 40 mg/day to standard care after variceal bleeding (147 people) did not reduce rebleeding [[Abraldes2016BLEPS]].
- In BLEPS, deaths were 9% with simvastatin versus 22% with placebo (HR 0.39; 95% CI 0.15–0.99). Survival was not the primary endpoint, there was no benefit in Child–Pugh C, and 2 people with advanced disease developed rhabdomyolysis (Early evidence) [[Abraldes2016BLEPS]].
- LIVERHOPE-SAFETY: simvastatin 40 mg/day plus rifaximin was stopped early in decompensated cirrhosis. Three of 16 people (19%) developed liver and muscle toxicity consistent with rhabdomyolysis. The 20 mg/day dose was not associated with these changes [[Pose2020LIVERHOPESafety]].
- LIVERHOPE-EFFICACY (237 people with Child–Pugh B/C cirrhosis): simvastatin 20 mg/day plus rifaximin did not reduce ACLF (17.9% vs 14.2%), transplant or death (18.8% vs 24.2%), or complications. Three people (2.6%) developed rhabdomyolysis (Established negative) [[Pose2025LIVERHOPE]].
- SACRED: a VA phase 3 RCT of simvastatin 40 mg/day versus placebo for up to 24 months in compensated cirrhosis with clinically significant portal hypertension. The primary endpoint is decompensation-free survival [[Kaplan2021SACRED]].
- SACRED is listed as active, not recruiting (n=142), with primary completion 2026-12-31. No results were published as of 2026-11-04 [[NCT03654053]].
- LCN RESCU, a phase 2 trial of rosuvastatin in cirrhosis (n=260), is recruiting. Its primary outcome is change in liver stiffness [[NCT05832229]].

### frontier · Cell therapy, liver support and hepatocyte transplantation
- REALISTIC (81 people with compensated cirrhosis): G-CSF, with or without autologous CD133+ stem-cell infusion, did not improve MELD at day 90 versus standard care [[Newsome2018REALISTIC]].
- In REALISTIC, serious adverse events were more frequent with G-CSF plus stem cells (43%) than with standard care (12%) [[Newsome2018REALISTIC]].
- MATCH (phase 2, 51 people with compensated cirrhosis and MELD 10–17): autologous monocyte-derived macrophages missed the primary endpoint (ΔΔMELD −0.87; 95% CI −1.79 to 0.0; P=0.06) [[Brennan2025MATCH]].
- In MATCH, there were no liver-related severe adverse events or deaths in the treated group, versus 3 deaths (2 liver-related) among 24 controls (Early evidence) [[Brennan2025MATCH]].
- MATCH long-term follow-up (up to 4 years): death or transplant occurred in 30.8% of macrophage-treated patients versus 58.3% with standard care, with 252 days more restricted mean survival time. This was a small open-label trial (Early evidence) [[Brennan2026MATCHLTFU]].
- Hepatocyte transplantation was first reported as a treatment for Crigler–Najjar syndrome type I in 1998 [[Fox1998]].
- Hepatocyte transplantation is still limited by tissue shortage, early cell loss and poor engraftment. Uses are mainly liver-based metabolic disease and acute liver failure, including alginate-encapsulated hepatocytes in children (Early evidence) [[Nguyen2020]].
- Bioartificial cell-based support (ELAD, C3A cells) in severe alcohol-related hepatitis (203 people): overall survival did not differ (51.0% vs 49.5%) [[Thompson2018ELAD]].
- Albumin dialysis (MARS) in acute-on-chronic liver failure (189 people, RELIEF): 28-day survival did not differ (60.7% vs 58.9%) [[Banares2013RELIEF]].

### frontier · Organ perfusion and xenotransplantation
- Normothermic machine perfusion (220 liver transplants) versus static cold storage:
  - 50% lower graft injury (hepatocellular enzyme release)
  - 50% lower organ discard
  - 54% longer mean preservation
  - no difference in bile duct complications, graft or patient survival [[Nasralla2018]]
- OCS Liver PROTECT (293 per-protocol recipients): portable normothermic perfusion versus ice storage:
  - early allograft dysfunction: 18% versus 31%
  - ischaemic biliary complications at 12 months: 2.6% versus 9.9%
  - livers used from donors after cardiac death: 51% versus 26% [[Markmann2022OCS]]
- Hypothermic oxygenated perfusion of livers from donors after circulatory death (160 people): non-anastomotic biliary strictures fell to 6% versus 18% (risk ratio 0.36) [[vanRijn2021DHOPE]].
- First gene-edited pig liver in a human (Nature 2025): a 6-gene-edited pig liver was placed as an auxiliary graft in a brain-dead recipient. It made bile (66.5 mL by day 10) and pig albumin, showed no signs of rejection, and stayed functional through the 10-day study (Hypothesis-stage) [[Tao2025Xeno]].
- First living recipient (J Hepatol 2026): a 10-gene-edited auxiliary pig liver showed no rejection for 31 days. It was removed on day 38 for xenotransplantation-associated thrombotic microangiopathy, and the patient died on day 171 after repeated upper GI bleeding (Hypothesis-stage) [[Zhang2026Xeno]].

### Exam hooks
- Portal vein about 75%, hepatic artery about 25% of liver blood inflow; the liver gets about 25% of cardiac output at about 2.5% of body weight [[Eipel2010]].
- Zone 1 is periportal (most oxygen); zone 3 is pericentral (least oxygen) [[Trefts2017,Kietzmann2017]].
- Stellate cells live in the space of Disse and store 80–90% of hepatic vitamin A [[Friedman2008PhysiolRev]].
- Activated stellate cells (myofibroblasts) are the main collagen source, 82–96% of myofibroblasts in mouse fate tracing [[Mederacke2013]].
- TGF-β1 is the key fibrogenic cytokine; PDGF is the key stellate-cell mitogen [[Bataller2005]].
- Fibrotic matrix is rich in collagens I and III, at about 6 times normal ECM in advanced fibrosis [[Bataller2005]].
- TIMPs block MMPs; a fall in TIMP-1 permits regression [[Bataller2005,Iredale1998]].
- Kupffer cells are 80–90% of the body's tissue macrophages [[Bilzer2006]].
- LSEC capillarisation (loss of fenestrae plus a basement membrane) precedes fibrosis [[DeLeve2015]].
- METAVIR F0–F4; Ishak 0–6 (cirrhosis is 5–6); NASH CRN 0–4 [[Poynard1997,Marcellin2013,Kleiner2005]].
- Hepatitis C fibrosis progresses at about 0.13 METAVIR units per year, a median of about 30 years to cirrhosis [[Poynard1997]].
- NASH progresses about one stage per 7 years; steatosis alone about one stage per 14 years [[Singh2015]].
- In MASLD, fibrosis stage, not NAS, predicts mortality [[Angulo2015,Ekstedt2015]].
- Tenofovir for 5 years: 74% of people with cirrhosis no longer had cirrhosis on biopsy [[Marcellin2013]].
- After SVR in hepatitis C cirrhosis, regression occurred in 61%, but sinusoidal capillarisation persisted [[DAmbrosio2012]].
- Matrix cross-linking (tissue transglutaminase) limits regression [[Issa2004]].
- Resmetirom is approved for noncirrhotic MASH F2–F3; avoid in decompensated cirrhosis [[FDA-Rezdiffra]].
- HVPG above 10 mmHg means clinically significant portal hypertension [[GarciaTsao2010]].

### In plain words
- Your liver sits under your right ribs. It gets blood from two pipes: most comes from your gut through the portal vein, and the rest from an artery.
- The liver makes albumin (a protein that keeps fluid in your blood vessels) and clotting proteins. It stores sugar for when you are not eating, makes bile to digest fat, and clears drugs and waste.
- When the liver is hurt again and again, by fat, a virus, alcohol, an immune attack or an inherited condition, it tries to heal by making scar tissue. This scar is called fibrosis.
- Special cells called stellate cells normally store vitamin A. When the liver keeps getting hurt, they switch into scar-making cells.
- Cirrhosis means the scar has spread and the liver has broken into lumps (nodules). Blood cannot flow through easily, so pressure builds up behind the liver.
- Scarring usually builds up slowly, over many years or decades. Many people feel well until it is advanced.
- The good news: when the cause is treated or removed, scar can shrink. In one study of hepatitis B treatment, about 3 in 4 people with cirrhosis no longer had cirrhosis on biopsy after 5 years.
- Not every scar goes away. Older, "hardened" scar is harder to remove, and doctors still check for liver cancer even when things improve.
- Losing weight, stopping alcohol and treating viral hepatitis are some of the best-proven ways to help a scarred liver.
- New medicines for fatty-liver scarring now exist or are being tested. Most proof so far is in people who do not yet have cirrhosis.
- Numbers from studies describe groups of people, not what will happen to you. Your care team can explain what they mean for you.
- Vomiting blood, black or tarry stools, new confusion or drowsiness, or fever or belly pain with a swollen abdomen need urgent care: call your local emergency number or go to an emergency department.

## Numbers for the animations
- blood_inflow_share_portal | healthy | 75 | % of liver inflow (75–80%) | [[Eipel2010]]
- blood_inflow_share_artery | healthy | 25 | % of liver inflow | [[Eipel2010]]
- liver_share_body_weight | healthy | 2.5 | % body weight | [[Eipel2010]]
- liver_share_cardiac_output | healthy | 25 | % cardiac output | [[Eipel2010]]
- hepatic_blood_flow | healthy | 800–1200 | mL/min | [[Eipel2010]]
- habr_buffer | portal flow falls | 25–60 | % of lost portal flow buffered by artery | [[Eipel2010]]
- lsec_fenestra_size | human | 50–180 | nm | [[Trefts2017]]
- stellate_share_resident_cells | healthy | 15 | % of resident liver cells | [[Friedman2008PhysiolRev]]
- vitaminA_in_liver | healthy | 50–80 | % of body retinoid | [[Friedman2008PhysiolRev]]
- vitaminA_in_stellate | healthy | 80–90 | % of hepatic retinoid | [[Friedman2008PhysiolRev]]
- kupffer_share_tissue_macrophages | healthy | 80–90 | % | [[Bilzer2006]]
- liver_share_plasma_protein | healthy | 85–90 | % of circulating protein | [[Trefts2017]]
- albumin_synthesis | healthy | 10.5 | g/day | [[Levitt2016]]
- albumin_turnover | healthy | 25 | days | [[Levitt2016]]
- cyp_share_drugs | — | 70–80 | % of clinical drugs metabolised by ~12 CYPs | [[Zanger2013]]
- zonated_genes | mouse | 50 | % of liver genes | [[Halpern2017]]
- ecm_fold_increase | advanced fibrosis | 6 | × normal | [[Bataller2005]]
- myofibroblast_from_HSC | mouse models | 82–96 | % | [[Mederacke2013]]
- hcv_fibrosis_rate | untreated | 0.133 | METAVIR units/yr | [[Poynard1997]]
- hcv_time_to_cirrhosis_median | untreated | 30 | years | [[Poynard1997]]
- hcv_time_to_cirrhosis_fast | men infected >40 y | 13 | years | [[Poynard1997]]
- hcv_time_to_cirrhosis_slow | women <40 y, no alcohol | 42 | years | [[Poynard1997]]
- hcv_cirrhosis_prevalence | 20 y after infection | 16 | % | [[Thein2008]]
- hcv_transition_F0F1 | per year | 0.117 | probability | [[Thein2008]]
- hcv_transition_F1F2 | per year | 0.085 | probability | [[Thein2008]]
- hcv_transition_F2F3 | per year | 0.120 | probability | [[Thein2008]]
- hcv_transition_F3F4 | per year | 0.116 | probability | [[Thein2008]]
- masld_years_per_stage_NAFL | — | 14.3 | years | [[Singh2015]]
- masld_years_per_stage_NASH | — | 7.1 | years | [[Singh2015]]
- masld_allcause_MRR | F0 | 1.00 | rate ratio | [[Dulai2017]]
- masld_allcause_MRR | F1 | 1.58 | rate ratio | [[Dulai2017]]
- masld_allcause_MRR | F2 | 2.52 | rate ratio | [[Dulai2017]]
- masld_allcause_MRR | F3 | 3.48 | rate ratio | [[Dulai2017]]
- masld_allcause_MRR | F4 | 6.40 | rate ratio | [[Dulai2017]]
- masld_liver_MRR | F1 | 1.41 | rate ratio | [[Dulai2017]]
- masld_liver_MRR | F2 | 9.57 | rate ratio | [[Dulai2017]]
- masld_liver_MRR | F3 | 16.69 | rate ratio | [[Dulai2017]]
- masld_liver_MRR | F4 | 42.30 | rate ratio | [[Dulai2017]]
- masld_deaths | F0–F2 | 0.32 | per 100 person-years | [[Sanyal2021NAFLD]]
- masld_deaths | F3 | 0.89 | per 100 person-years | [[Sanyal2021NAFLD]]
- masld_deaths | F4 | 1.76 | per 100 person-years | [[Sanyal2021NAFLD]]
- laennec_LRE | stage 3 | 8.7 | % with liver-related event | [[Kim2012Laennec]]
- laennec_LRE | 4A | 12.5 | % | [[Kim2012Laennec]]
- laennec_LRE | 4B | 20.7 | % | [[Kim2012Laennec]]
- laennec_LRE | 4C | 29.0 | % | [[Kim2012Laennec]]
- rat_regression_HSC | day 0 → day 28 | 12 | fold fall in activated HSC | [[Iredale1998]]
- tdf_cirrhosis_regressed | 5 years | 74 | % of baseline cirrhosis (71/96) | [[Marcellin2013]]
- tdf_fibrosis_regression_all | 5 years | 51 | % of 348 | [[Marcellin2013]]
- entecavir_fibrosis_improved | median 6 y | 88 | % | [[Chang2010Entecavir]]
- hcv_svr_cirrhosis_regressed | 61 months | 61 | % | [[DAmbrosio2012]]
- hcv_svr_collagen_down | 61 months | 89 | % | [[DAmbrosio2012]]
- hcv_10y_tx_free_survival | regression | 100 | % | [[Mallet2008]]
- hcv_10y_tx_free_survival | no regression | 74.2 | % | [[Mallet2008]]
- pir_progressive | before HBV therapy | 70 | % | [[Chang2024PIR]]
- pir_progressive | week 72 | 20 | % | [[Chang2024PIR]]
- pir_regressive | before HBV therapy | 13 | % | [[Chang2024PIR]]
- pir_regressive | week 72 | 64 | % | [[Chang2024PIR]]
- weightloss_fibrosis_regression | ≥10% weight loss, 52 wk | 45 | % | [[VilarGomez2015]]
- weightloss_fibrosis_regression | all lifestyle, 52 wk | 19 | % | [[VilarGomez2015]]
- bariatric_fibrosis_decrease | 5 years | 70.2 | % | [[Lassailly2020]]
- bariatric_fibrosis_disappeared | 5 years | 56 | % | [[Lassailly2020]]
- biopsy_correct_stage | 15 mm | 65 | % | [[Bedossa2003]]
- biopsy_correct_stage | 25 mm | 75 | % | [[Bedossa2003]]
- maestro_fibrosis_improve | placebo, wk 52 | 14.2 | % | [[Harrison2024MAESTRO]]
- maestro_fibrosis_improve | resmetirom 80 mg | 24.2 | % | [[Harrison2024MAESTRO]]
- maestro_fibrosis_improve | resmetirom 100 mg | 25.9 | % | [[Harrison2024MAESTRO]]
- essence_fibrosis_reduction | placebo, wk 72 | 22.4 | % | [[Sanyal2025ESSENCE]]
- essence_fibrosis_reduction | semaglutide 2.4 mg | 36.8 | % | [[Sanyal2025ESSENCE]]
- synergy_fibrosis_improve | placebo, wk 52 | 30 | % | [[Loomba2024SYNERGY]]
- synergy_fibrosis_improve | tirzepatide 5 mg | 55 | % | [[Loomba2024SYNERGY]]
- native_fibrosis_improve | placebo, wk 24 | 29 | % | [[Francque2021NATIVE]]
- native_fibrosis_improve | lanifibranor 1200 mg | 48 | % | [[Francque2021NATIVE]]
- harmony_fibrosis_improve | placebo, wk 24 | 20 | % | [[Harrison2023HARMONY]]
- harmony_fibrosis_improve | efruxifermin 50 mg | 41 | % | [[Harrison2023HARMONY]]
- enliven_fibrosis_improve | placebo | 7 | % | [[Loomba2023ENLIVEN]]
- enliven_fibrosis_improve | pegozafermin 44 mg | 27 | % | [[Loomba2023ENLIVEN]]
- symmetry_cirrhosis_fibrosis | placebo, wk 36 | 13 | % | [[Noureddin2025SYMMETRY]]
- symmetry_cirrhosis_fibrosis | efruxifermin 50 mg, wk 36 | 19 | % | [[Noureddin2025SYMMETRY]]
- symmetry_cirrhosis_fibrosis | placebo, wk 96 | 11 | % | [[Noureddin2025SYMMETRY]]
- symmetry_cirrhosis_fibrosis | efruxifermin 50 mg, wk 96 | 29 | % | [[Noureddin2025SYMMETRY]]
- sema_cirrhosis_fibrosis | placebo, wk 48 | 29 | % | [[Loomba2023SemaCirrhosis]]
- sema_cirrhosis_fibrosis | semaglutide, wk 48 | 11 | % | [[Loomba2023SemaCirrhosis]]
- match_death_or_tx | standard care, ≤4 y | 58.3 | % | [[Brennan2026MATCHLTFU]]
- match_death_or_tx | macrophage therapy, ≤4 y | 30.8 | % | [[Brennan2026MATCHLTFU]]
- nmp_graft_injury | vs cold storage | −50 | % | [[Nasralla2018]]
- nmp_discard | vs cold storage | −50 | % | [[Nasralla2018]]
- nmp_preservation_time | vs cold storage | +54 | % | [[Nasralla2018]]
- xeno_bile | brain-dead recipient, day 10 | 66.5 | mL | [[Tao2025Xeno]]

## Open questions and controversies
- Is there a "point of no return"? Position A: cirrhosis, including established cirrhosis, can regress after cure of the cause, with 74% of people with hepatitis B cirrhosis losing cirrhosis on biopsy at 5 years [[Marcellin2013,Hytiroglou2018]]. Position B: cross-linked, elastin-rich, vascularised septa and vascular lesions persist, and capillarisation does not reverse after SVR [[Issa2004,GarciaTsao2010,DAmbrosio2012]]. Status: unresolved. Pathologists (2026) call for better histological and AI tools to define it [[Burt2026]].
- Does histological regression translate into fewer clinical events? Small cohorts suggest yes (zero events per 100 patient-years with regression after hepatitis C therapy; lower HCC with "regressive" P-I-R in hepatitis B) [[Mallet2008,Chang2024PIR]]. However, the clinical significance of regressive features "remains largely unstudied" and staging systems were built for progression [[Burt2026]]. Status: Early evidence.
- Are fibrosis endpoints at F2–F3 a valid surrogate for drugs in cirrhosis? Resmetirom, semaglutide, tirzepatide, lanifibranor and FGF21 analogues improve fibrosis in noncirrhotic MASH [[Harrison2024MAESTRO,Sanyal2025ESSENCE,Loomba2024SYNERGY,Francque2021NATIVE,Harrison2023HARMONY,Loomba2023ENLIVEN]]. In compensated cirrhosis, semaglutide showed no benefit at 48 weeks and efruxifermin missed its week-36 endpoint but separated at week 96 [[Loomba2023SemaCirrhosis,Noureddin2025SYMMETRY]]. Status: outcome trials in cirrhosis report about 2026–2030 [[NCT05500222,NCT06528314,NCT06419374,NCT06632457]].
- Statins: help or harm? BLEPS suggested lower mortality with simvastatin after variceal bleeding (secondary endpoint) [[Abraldes2016BLEPS]]. LIVERHOPE-EFFICACY found no benefit of simvastatin plus rifaximin in decompensated cirrhosis, and simvastatin 40 mg caused rhabdomyolysis in decompensated disease [[Pose2025LIVERHOPE,Pose2020LIVERHOPESafety]]. Status: compensated-cirrhosis trials (SACRED; rosuvastatin RESCU) pending [[NCT03654053,NCT05832229]].
- Cell therapy: G-CSF with or without stem cells failed and may cause harm [[Newsome2018REALISTIC]]. Macrophage therapy missed its primary endpoint but showed a long-term survival signal in a small open-label trial [[Brennan2025MATCH,Brennan2026MATCHLTFU]]. Status: needs a larger blinded trial.
- Liver support devices: neither cell-based (ELAD) nor albumin dialysis (MARS) improved survival in randomised trials [[Thompson2018ELAD,Banares2013RELIEF]]. Status: no proven survival benefit.
- Xenotransplantation: an auxiliary pig liver can make bile and albumin in humans. However, thrombotic microangiopathy ended the first living-recipient graft at day 38 [[Tao2025Xeno,Zhang2026Xeno]]. Status: experimental (Hypothesis-stage).
- Women and alcohol: a small 1980s biopsy series found progression to cirrhosis despite abstinence in 4 of 7 women versus 0 of 6 men [[Pares1986]]. Status: small and old; this needs confirmation and should not be over-read.

## Sources
- [Gines2021Lancet] Ginès P, Krag A, Abraldes JG, Solà E, Fabrellas N, Kamath PS. Liver cirrhosis. Lancet. 2021;398(10308):1359-1376. PMID 34543610; doi:10.1016/S0140-6736(21)01374-X. (validated: PubMed)
- [Tsuchida2017] Tsuchida T, Friedman SL. Mechanisms of hepatic stellate cell activation. Nat Rev Gastroenterol Hepatol. 2017;14(7):397-411. PMID 28487545; doi:10.1038/nrgastro.2017.38. (validated: PubMed)
- [Friedman2008PhysiolRev] Friedman SL. Hepatic stellate cells: protean, multifunctional, and enigmatic cells of the liver. Physiol Rev. 2008;88(1):125-72. PMID 18195085; PMCID PMC2888531; doi:10.1152/physrev.00013.2007. (validated: PubMed)
- [Bataller2005] Bataller R, Brenner DA. Liver fibrosis. J Clin Invest. 2005;115(2):209-18. PMID 15690074; PMCID PMC546435; doi:10.1172/JCI24282. (validated: PubMed)
- [Trefts2017] Trefts E, Gannon M, Wasserman DH. The liver. Curr Biol. 2017;27(21):R1147-R1151. PMID 29112863; PMCID PMC5897118; doi:10.1016/j.cub.2017.09.019. (validated: PubMed)
- [Eipel2010] Eipel C, Abshagen K, Vollmar B. Regulation of hepatic blood flow: the hepatic arterial buffer response revisited. World J Gastroenterol. 2010;16(48):6046-57. PMID 21182219; PMCID PMC3012579; doi:10.3748/wjg.v16.i48.6046. (validated: PubMed)
- [Kietzmann2017] Kietzmann T. Metabolic zonation of the liver: The oxygen gradient revisited. Redox Biol. 2017;11:622-630. PMID 28126520; PMCID PMC5257182; doi:10.1016/j.redox.2017.01.012. (validated: PubMed)
- [BenMoshe2019] Ben-Moshe S, Itzkovitz S. Spatial heterogeneity in the mammalian liver. Nat Rev Gastroenterol Hepatol. 2019;16(7):395-410. PMID 30936469; doi:10.1038/s41575-019-0134-x. (validated: PubMed)
- [Halpern2017] Halpern KB, Shenhav R, Matcovitch-Natan O, Toth B, Lemze D, Golan M, et al. Single-cell spatial reconstruction reveals global division of labour in the mammalian liver. Nature. 2017;542(7641):352-356. PMID 28166538; PMCID PMC5321580; doi:10.1038/nature21065. (validated: PubMed)
- [Poisson2017] Poisson J, Lemoinne S, Boulanger C, Durand F, Moreau R, Valla D, et al. Liver sinusoidal endothelial cells: Physiology and role in liver diseases. J Hepatol. 2017;66(1):212-227. PMID 27423426; doi:10.1016/j.jhep.2016.07.009. (validated: PubMed)
- [Krenkel2017] Krenkel O, Tacke F. Liver macrophages in tissue homeostasis and disease. Nat Rev Immunol. 2017;17(5):306-321. PMID 28317925; doi:10.1038/nri.2017.11. (validated: PubMed)
- [Bilzer2006] Bilzer M, Roggel F, Gerbes AL. Role of Kupffer cells in host defense and liver disease. Liver Int. 2006;26(10):1175-86. PMID 17105582; doi:10.1111/j.1478-3231.2006.01342.x. (validated: PubMed)
- [Michalopoulos2021] Michalopoulos GK, Bhushan B. Liver regeneration: biological and pathological mechanisms and implications. Nat Rev Gastroenterol Hepatol. 2021;18(1):40-55. PMID 32764740; doi:10.1038/s41575-020-0342-4. (validated: PubMed)
- [Levitt2016] Levitt DG, Levitt MD. Human serum albumin homeostasis: a new look at the roles of synthesis, catabolism, renal and gastrointestinal excretion, and the clinical value of serum albumin measurements. Int J Gen Med. 2016;9:229-55. PMID 27486341; PMCID PMC4956071; doi:10.2147/IJGM.S102819. (validated: PubMed)
- [Rui2014] Rui L. Energy metabolism in the liver. Compr Physiol. 2014;4(1):177-97. PMID 24692138; PMCID PMC4050641; doi:10.1002/cphy.c130024. (validated: PubMed)
- [Boyer2013] Boyer JL. Bile formation and secretion. Compr Physiol. 2013;3(3):1035-78. PMID 23897680; PMCID PMC4091928; doi:10.1002/cphy.c120027. (validated: PubMed)
- [Zanger2013] Zanger UM, Schwab M. Cytochrome P450 enzymes in drug metabolism: regulation of gene expression, enzyme activities, and impact of genetic variation. Pharmacol Ther. 2013;138(1):103-41. PMID 23333322; doi:10.1016/j.pharmthera.2012.12.007. (validated: PubMed)
- [Schuppan2008] Schuppan D, Afdhal NH. Liver cirrhosis. Lancet. 2008;371(9615):838-51. PMID 18328931; PMCID PMC2271178; doi:10.1016/S0140-6736(08)60383-9. (validated: PubMed)
- [Rinella2023MASLD] Rinella ME, Lazarus JV, Ratziu V, Francque SM, Sanyal AJ, Kanwal F, et al. A multisociety Delphi consensus statement on new fatty liver disease nomenclature. Hepatology. 2023;78(6):1966-1986. PMID 37363821; PMCID PMC10653297; doi:10.1097/HEP.0000000000000520. Co-published in J Hepatol (PMID 37364790). (validated: PubMed)
- [Higashi2017] Higashi T, Friedman SL, Hoshida Y. Hepatic stellate cells as key target in liver fibrosis. Adv Drug Deliv Rev. 2017;121:27-42. PMID 28506744; PMCID PMC5682243; doi:10.1016/j.addr.2017.05.007. (validated: PubMed)
- [Mederacke2013] Mederacke I, Hsu CC, Troeger JS, Huebener P, Mu X, Dapito DH, et al. Fate tracing reveals hepatic stellate cells as dominant contributors to liver fibrosis independent of its aetiology. Nat Commun. 2013;4:2823. PMID 24264436; PMCID PMC4059406; doi:10.1038/ncomms3823. (validated: PubMed)
- [Seki2007] Seki E, De Minicis S, Osterreicher CH, Kluwe J, Osawa Y, Brenner DA, et al. TLR4 enhances TGF-beta signaling and hepatic fibrosis. Nat Med. 2007;13(11):1324-32. PMID 17952090; doi:10.1038/nm1663. (validated: PubMed)
- [Ramachandran2019] Ramachandran P, Dobie R, Wilson-Kanamori JR, Dora EF, Henderson BEP, Luu NT, et al. Resolving the fibrotic niche of human liver cirrhosis at single-cell level. Nature. 2019;575(7783):512-518. PMID 31597160; PMCID PMC6876711; doi:10.1038/s41586-019-1631-3. (validated: PubMed)
- [DeLeve2015] DeLeve LD. Liver sinusoidal endothelial cells in hepatic fibrosis. Hepatology. 2015;61(5):1740-6. PMID 25131509; PMCID PMC4333127; doi:10.1002/hep.27376. (validated: PubMed)
- [GraciaSancho2019] Gracia-Sancho J, Marrone G, Fernández-Iglesias A. Hepatic microcirculation and mechanisms of portal hypertension. Nat Rev Gastroenterol Hepatol. 2019;16(4):221-234. PMID 30568278; doi:10.1038/s41575-018-0097-3. (validated: PubMed)
- [GarciaTsao2010] Garcia-Tsao G, Friedman S, Iredale J, Pinzani M. Now there are many (stages) where before there was one: In search of a pathophysiological classification of cirrhosis. Hepatology. 2010;51(4):1445-9. PMID 20077563; PMCID PMC2882065; doi:10.1002/hep.23478. (validated: PubMed)
- [Bedossa1996] Bedossa P, Poynard T. An algorithm for the grading of activity in chronic hepatitis C. The METAVIR Cooperative Study Group. Hepatology. 1996;24(2):289-93. PMID 8690394; doi:10.1002/hep.510240201. (validated: PubMed)
- [Ishak1995] Ishak K, Baptista A, Bianchi L, Callea F, De Groote J, Gudat F, et al. Histological grading and staging of chronic hepatitis. J Hepatol. 1995;22(6):696-9. PMID 7560864; doi:10.1016/0168-8278(95)80226-6. (validated: PubMed)
- [Kleiner2005] Kleiner DE, Brunt EM, Van Natta M, Behling C, Contos MJ, Cummings OW, et al. Design and validation of a histological scoring system for nonalcoholic fatty liver disease. Hepatology. 2005;41(6):1313-21. PMID 15915461; doi:10.1002/hep.20701. (validated: PubMed)
- [Kim2012Laennec] Kim SU, Oh HJ, Wanless IR, Lee S, Han KH, Park YN. The Laennec staging system for histological sub-classification of cirrhosis is useful for stratification of prognosis in patients with liver cirrhosis. J Hepatol. 2012;57(3):556-63. PMID 22617153; doi:10.1016/j.jhep.2012.04.029. (validated: PubMed)
- [Theise2018Beijing] Theise ND, Jia J, Sun Y, Wee A, You H. Progression and regression of fibrosis in viral hepatitis in the treatment era: the Beijing classification. Mod Pathol. 2018;31(8):1191-1200. PMID 29700417; doi:10.1038/s41379-018-0048-0. (validated: PubMed)
- [Chang2024PIR] Chang X, Lv C, Wang B, Wang J, Song Z, An L, et al. The utility of P-I-R classification in predicting the on-treatment histological and clinical outcomes of patients with hepatitis B and advanced liver fibrosis. Hepatology. 2024;79(2):425-437. PMID 37611260; PMCID PMC10789381; doi:10.1097/HEP.0000000000000563. (validated: PubMed)
- [Regev2002] Regev A, Berho M, Jeffers LJ, Milikowski C, Molina EG, Pyrsopoulos NT, et al. Sampling error and intraobserver variation in liver biopsy in patients with chronic HCV infection. Am J Gastroenterol. 2002;97(10):2614-8. PMID 12385448; doi:10.1111/j.1572-0241.2002.06038.x. (validated: PubMed)
- [Bedossa2003] Bedossa P, Dargère D, Paradis V. Sampling variability of liver fibrosis in chronic hepatitis C. Hepatology. 2003;38(6):1449-57. PMID 14647056; doi:10.1016/j.hep.2003.09.022. (validated: PubMed)
- [Burt2026] Burt AD, Behling C, Gouw ASH, Hytiroglou P, Lackner C, Alves VAF, et al. Fibrosis regression in chronic liver disease: The pathologist's view. J Hepatol. 2026;85(5):1033-1039. PMID 42497924; doi:10.1016/j.jhep.2026.07.018. (validated: PubMed)
- [Poynard1997] Poynard T, Bedossa P, Opolon P. Natural history of liver fibrosis progression in patients with chronic hepatitis C. The OBSVIRC, METAVIR, CLINIVIR, and DOSVIRC groups. Lancet. 1997;349(9055):825-32. PMID 9121257; doi:10.1016/s0140-6736(96)07642-8. (validated: PubMed)
- [Thein2008] Thein HH, Yi Q, Dore GJ, Krahn MD. Estimation of stage-specific fibrosis progression rates in chronic hepatitis C virus infection: a meta-analysis and meta-regression. Hepatology. 2008;48(2):418-31. PMID 18563841; doi:10.1002/hep.22375. (validated: PubMed)
- [Singh2015] Singh S, Allen AM, Wang Z, Prokop LJ, Murad MH, Loomba R. Fibrosis progression in nonalcoholic fatty liver vs nonalcoholic steatohepatitis: a systematic review and meta-analysis of paired-biopsy studies. Clin Gastroenterol Hepatol. 2015;13(4):643-54.e1-9. PMID 24768810; PMCID PMC4208976; doi:10.1016/j.cgh.2014.04.014. (validated: PubMed)
- [Angulo2015] Angulo P, Kleiner DE, Dam-Larsen S, Adams LA, Bjornsson ES, Charatcharoenwitthaya P, et al. Liver Fibrosis, but No Other Histologic Features, Is Associated With Long-term Outcomes of Patients With Nonalcoholic Fatty Liver Disease. Gastroenterology. 2015;149(2):389-97.e10. PMID 25935633; PMCID PMC4516664; doi:10.1053/j.gastro.2015.04.043. (validated: PubMed)
- [Dulai2017] Dulai PS, Singh S, Patel J, Soni M, Prokop LJ, Younossi Z, et al. Increased risk of mortality by fibrosis stage in nonalcoholic fatty liver disease: Systematic review and meta-analysis. Hepatology. 2017;65(5):1557-1565. PMID 28130788; PMCID PMC5397356; doi:10.1002/hep.29085. (validated: PubMed)
- [Sanyal2021NAFLD] Sanyal AJ, Van Natta ML, Clark J, Neuschwander-Tetri BA, Diehl A, Dasarathy S, et al. Prospective Study of Outcomes in Adults with Nonalcoholic Fatty Liver Disease. N Engl J Med. 2021;385(17):1559-1569. PMID 34670043; PMCID PMC8881985; doi:10.1056/NEJMoa2029349. (validated: PubMed)
- [Ekstedt2015] Ekstedt M, Hagström H, Nasr P, Fredrikson M, Stål P, Kechagias S, et al. Fibrosis stage is the strongest predictor for disease-specific mortality in NAFLD after up to 33 years of follow-up. Hepatology. 2015;61(5):1547-54. PMID 25125077; doi:10.1002/hep.27368. (validated: PubMed)
- [Kisseleva2021] Kisseleva T, Brenner D. Molecular and cellular mechanisms of liver fibrosis and its regression. Nat Rev Gastroenterol Hepatol. 2021;18(3):151-166. PMID 33128017; doi:10.1038/s41575-020-00372-7. (validated: PubMed)
- [Iredale1998] Iredale JP, Benyon RC, Pickering J, McCullen M, Northrop M, Pawley S, et al. Mechanisms of spontaneous resolution of rat liver fibrosis. Hepatic stellate cell apoptosis and reduced hepatic expression of metalloproteinase inhibitors. J Clin Invest. 1998;102(3):538-49. PMID 9691091; PMCID PMC508915; doi:10.1172/JCI1018. (validated: PubMed)
- [Kisseleva2012] Kisseleva T, Cong M, Paik Y, Scholten D, Jiang C, Benner C, et al. Myofibroblasts revert to an inactive phenotype during regression of liver fibrosis. Proc Natl Acad Sci U S A. 2012;109(24):9448-53. PMID 22566629; PMCID PMC3386114; doi:10.1073/pnas.1201840109. (validated: PubMed)
- [Marcellin2013] Marcellin P, Gane E, Buti M, Afdhal N, Sievert W, Jacobson IM, et al. Regression of cirrhosis during treatment with tenofovir disoproxil fumarate for chronic hepatitis B: a 5-year open-label follow-up study. Lancet. 2013;381(9865):468-75. PMID 23234725; doi:10.1016/S0140-6736(12)61425-1. (validated: PubMed)
- [Chang2010Entecavir] Chang TT, Liaw YF, Wu SS, Schiff E, Han KH, Lai CL, et al. Long-term entecavir therapy results in the reversal of fibrosis/cirrhosis and continued histological improvement in patients with chronic hepatitis B. Hepatology. 2010;52(3):886-93. PMID 20683932; doi:10.1002/hep.23785. (validated: PubMed)
- [DAmbrosio2012] D'Ambrosio R, Aghemo A, Rumi MG, Ronchi G, Donato MF, Paradis V, et al. A morphometric and immunohistochemical study to assess the benefit of a sustained virological response in hepatitis C virus patients with cirrhosis. Hepatology. 2012;56(2):532-43. PMID 22271347; doi:10.1002/hep.25606. (validated: PubMed)
- [Mallet2008] Mallet V, Gilgenkrantz H, Serpaggi J, Verkarre V, Vallet-Pichard A, Fontaine H, et al. Brief communication: the relationship of regression of cirrhosis to outcome in chronic hepatitis C. Ann Intern Med. 2008;149(6):399-403. PMID 18794559; doi:10.7326/0003-4819-149-6-200809160-00006. (validated: PubMed)
- [Pares1986] Parés A, Caballería J, Bruguera M, Torres M, Rodés J. Histological course of alcoholic hepatitis. Influence of abstinence, sex and extent of hepatic damage. J Hepatol. 1986;2(1):33-42. PMID 3950362; doi:10.1016/s0168-8278(86)80006-x. (validated: PubMed)
- [VilarGomez2015] Vilar-Gomez E, Martinez-Perez Y, Calzadilla-Bertot L, Torres-Gonzalez A, Gra-Oramas B, Gonzalez-Fabian L, et al. Weight Loss Through Lifestyle Modification Significantly Reduces Features of Nonalcoholic Steatohepatitis. Gastroenterology. 2015;149(2):367-78.e5. PMID 25865049; doi:10.1053/j.gastro.2015.04.005. (validated: PubMed)
- [Lassailly2020] Lassailly G, Caiazzo R, Ntandja-Wandji LC, Gnemmi V, Baud G, Verkindt H, et al. Bariatric Surgery Provides Long-term Resolution of Nonalcoholic Steatohepatitis and Regression of Fibrosis. Gastroenterology. 2020;159(4):1290-1301.e5. PMID 32553765; doi:10.1053/j.gastro.2020.06.006. (validated: PubMed)
- [Wanless2000] Wanless IR, Nakashima E, Sherman M. Regression of human cirrhosis. Morphologic features and the genesis of incomplete septal cirrhosis. Arch Pathol Lab Med. 2000;124(11):1599-607. PMID 11079009; doi:10.5858/2000-124-1599-ROHC. (validated: PubMed)
- [Hytiroglou2018] Hytiroglou P, Theise ND. Regression of human cirrhosis: an update, 18 years after the pioneering article by Wanless et al. Virchows Arch. 2018;473(1):15-22. PMID 29589101; doi:10.1007/s00428-018-2340-2. (validated: PubMed)
- [Issa2004] Issa R, Zhou X, Constandinou CM, Fallowfield J, Millward-Sadler H, Gaca MD, et al. Spontaneous recovery from micronodular cirrhosis: evidence for incomplete resolution associated with matrix cross-linking. Gastroenterology. 2004;126(7):1795-808. PMID 15188175; doi:10.1053/j.gastro.2004.03.009. (validated: PubMed)
- [Harrison2024MAESTRO] Harrison SA, Bedossa P, Guy CD, Schattenberg JM, Loomba R, Taub R, et al. A Phase 3, Randomized, Controlled Trial of Resmetirom in NASH with Liver Fibrosis. N Engl J Med. 2024;390(6):497-509. PMID 38324483; doi:10.1056/NEJMoa2309000. (validated: PubMed)
- [FDA-Rezdiffra] Madrigal Pharmaceuticals. REZDIFFRA (resmetirom) tablets prescribing information, NDA217785, effective 2026-07-29, set id e67ea09f-a840-439c-86c8-f98585f978b2. (validated: openFDA)
- [NCT05500222] Madrigal Pharmaceuticals. A Randomized Double-blind Placebo-controlled Phase 3 Study to Evaluate the Effect of Resmetirom on Liver-related Outcomes in Patients With Well-compensated (Child-Pugh A) NASH Cirrhosis (MAESTRO-NASH-OUTCOMES). ClinicalTrials.gov NCT05500222; active, not recruiting; n=845; primary completion 2026-12. (validated: ClinicalTrials.gov)
- [Sanyal2025ESSENCE] Sanyal AJ, Newsome PN, Kliers I, Østergaard LH, Long MT, Kjær MS, et al. Phase 3 Trial of Semaglutide in Metabolic Dysfunction-Associated Steatohepatitis. N Engl J Med. 2025;392(21):2089-2099. PMID 40305708; doi:10.1056/NEJMoa2413258. (validated: PubMed)
- [NCT04822181] Novo Nordisk A/S. The Effect of Semaglutide in Subjects With Non-cirrhotic Non-alcoholic Steatohepatitis (ESSENCE). ClinicalTrials.gov NCT04822181; active, not recruiting; n=1205; part 2 primary outcome cirrhosis-free survival; primary completion 2029-04-25. (validated: ClinicalTrials.gov)
- [Newsome2021Sema] Newsome PN, Buchholtz K, Cusi K, Linder M, Okanoue T, Ratziu V, et al. A Placebo-Controlled Trial of Subcutaneous Semaglutide in Nonalcoholic Steatohepatitis. N Engl J Med. 2021;384(12):1113-1124. PMID 33185364; doi:10.1056/NEJMoa2028395. (validated: PubMed)
- [Loomba2023SemaCirrhosis] Loomba R, Abdelmalek MF, Armstrong MJ, Jara M, Kjær MS, Krarup N, et al. Semaglutide 2·4 mg once weekly in patients with non-alcoholic steatohepatitis-related cirrhosis: a randomised, placebo-controlled phase 2 trial. Lancet Gastroenterol Hepatol. 2023;8(6):511-522. PMID 36934740; PMCID PMC10792518; doi:10.1016/S2468-1253(23)00068-7. (validated: PubMed)
- [Loomba2024SYNERGY] Loomba R, Hartman ML, Lawitz EJ, Vuppalanchi R, Boursier J, Bugianesi E, et al. Tirzepatide for Metabolic Dysfunction-Associated Steatohepatitis with Liver Fibrosis. N Engl J Med. 2024;391(4):299-310. PMID 38856224; doi:10.1056/NEJMoa2401943. (validated: PubMed)
- [Francque2021NATIVE] Francque SM, Bedossa P, Ratziu V, Anstee QM, Bugianesi E, Sanyal AJ, et al. A Randomized, Controlled Trial of the Pan-PPAR Agonist Lanifibranor in NASH. N Engl J Med. 2021;385(17):1547-1558. PMID 34670042; doi:10.1056/NEJMoa2036205. (validated: PubMed)
- [NCT04849728] Inventiva Pharma. A Randomised, Double-blind, Placebo-controlled, Multicentre, Phase 3 Study Evaluating Efficacy and Safety of Lanifibranor Followed by an Active Treatment Extension in Adult Patients With Non-cirrhotic NASH and Fibrosis Stages F2 and F3 (NATiV3). ClinicalTrials.gov NCT04849728; active, not recruiting; n=1000; primary completion 2026-09-29. (validated: ClinicalTrials.gov)
- [Harrison2023HARMONY] Harrison SA, Frias JP, Neff G, Abrams GA, Lucas KJ, Sanchez W, et al. Safety and efficacy of once-weekly efruxifermin versus placebo in non-alcoholic steatohepatitis (HARMONY): a multicentre, randomised, double-blind, placebo-controlled, phase 2b trial. Lancet Gastroenterol Hepatol. 2023;8(12):1080-1093. PMID 37802088; doi:10.1016/S2468-1253(23)00272-8. (validated: PubMed)
- [Noureddin2025SYMMETRY] Noureddin M, Rinella ME, Chalasani NP, Neff GW, Lucas KJ, Rodriguez ME, et al. Efruxifermin in Compensated Liver Cirrhosis Caused by MASH. N Engl J Med. 2025;392(24):2413-2424. PMID 40341827; doi:10.1056/NEJMoa2502242. (validated: PubMed)
- [NCT06528314] Akero Therapeutics. A Phase 3, Randomized, Double-Blind, Placebo-Controlled Study Evaluating the Safety and Efficacy of Efruxifermin in Subjects With Compensated Cirrhosis Due to NASH/MASH. ClinicalTrials.gov NCT06528314; recruiting; n=2150; primary completion 2030-02. (validated: ClinicalTrials.gov)
- [Loomba2023ENLIVEN] Loomba R, Sanyal AJ, Kowdley KV, Bhatt DL, Alkhouri N, Frias JP, et al. Randomized, Controlled Trial of the FGF21 Analogue Pegozafermin in NASH. N Engl J Med. 2023;389(11):998-1008. PMID 37356033; PMCID PMC10718287; doi:10.1056/NEJMoa2304286. (validated: PubMed)
- [NCT06419374] Hoffmann-La Roche. A Phase 3 Study to Evaluate the Efficacy and Safety of Pegozafermin in Subjects With Compensated Cirrhosis Due to MASH (ENLIGHTEN-Cirrhosis). ClinicalTrials.gov NCT06419374; recruiting; n=1800; primary completion 2028-06-30. (validated: ClinicalTrials.gov)
- [NCT06632457] Boehringer Ingelheim. A Phase III Double-blind, Randomised, Placebo-controlled Trial to Evaluate Liver-related Clinical Outcomes and Safety of Once Weekly Injected Survodutide in Participants With Compensated NASH/MASH Cirrhosis (LIVERAGE-Cirrhosis). ClinicalTrials.gov NCT06632457; recruiting; n=1590; primary completion 2029-06-05. (validated: ClinicalTrials.gov)
- [Lee2015Gut] Lee YA, Wallace MC, Friedman SL. Pathobiology of liver fibrosis: a translational success story. Gut. 2015;64(5):830-41. PMID 25681399; PMCID PMC4477794; doi:10.1136/gutjnl-2014-306842. (validated: PubMed)
- [Abraldes2016BLEPS] Abraldes JG, Villanueva C, Aracil C, Turnes J, Hernandez-Guerra M, Genesca J, et al. Addition of Simvastatin to Standard Therapy for the Prevention of Variceal Rebleeding Does Not Reduce Rebleeding but Increases Survival in Patients With Cirrhosis. Gastroenterology. 2016;150(5):1160-1170.e3. PMID 26774179; doi:10.1053/j.gastro.2016.01.004. (validated: PubMed)
- [Pose2020LIVERHOPESafety] Pose E, Napoleone L, Amin A, Campion D, Jimenez C, Piano S, et al. Safety of two different doses of simvastatin plus rifaximin in decompensated cirrhosis (LIVERHOPE-SAFETY): a randomised, double-blind, placebo-controlled, phase 2 trial. Lancet Gastroenterol Hepatol. 2020;5(1):31-41. PMID 31607677; doi:10.1016/S2468-1253(19)30320-6. (validated: PubMed)
- [Pose2025LIVERHOPE] Pose E, Jiménez C, Zaccherini G, Campion D, Piano S, Uschner FE, et al. Simvastatin and Rifaximin in Decompensated Cirrhosis: A Randomized Clinical Trial. JAMA. 2025;333(10):864-874. PMID 39908052; PMCID PMC11800124; doi:10.1001/jama.2024.27441. (validated: PubMed)
- [Kaplan2021SACRED] Kaplan DE, Mehta R, Garcia-Tsao G, Albrecht J, Aytaman A, Baffy G, et al. SACRED: Effect of simvastatin on hepatic decompensation and death in subjects with high-risk compensated cirrhosis: Statins and Cirrhosis: Reducing Events of Decompensation. Contemp Clin Trials. 2021;104:106367. PMID 33771685; PMCID PMC8422958; doi:10.1016/j.cct.2021.106367. (validated: PubMed)
- [NCT03654053] VA Office of Research and Development. Effect of Simvastatin on Hepatic Decompensation and Death in Subjects With High-risk Compensated Cirrhosis (SACRED). ClinicalTrials.gov NCT03654053; active, not recruiting; n=142; primary completion 2026-12-31. (validated: ClinicalTrials.gov)
- [NCT05832229] National Institute of Diabetes and Digestive and Kidney Diseases. Liver Cirrhosis Network Rosuvastatin Efficacy and Safety for Cirrhosis in the United States (LCN RESCU): a phase 2 study. ClinicalTrials.gov NCT05832229; recruiting; n=260; primary completion 2029-08-31. (validated: ClinicalTrials.gov)
- [Newsome2018REALISTIC] Newsome PN, Fox R, King AL, Barton D, Than NN, Moore J, et al. Granulocyte colony-stimulating factor and autologous CD133-positive stem-cell therapy in liver cirrhosis (REALISTIC): an open-label, randomised, controlled phase 2 trial. Lancet Gastroenterol Hepatol. 2018;3(1):25-36. PMID 29127060; PMCID PMC5738975; doi:10.1016/S2468-1253(17)30326-6. (validated: PubMed)
- [Brennan2025MATCH] Brennan PN, MacMillan M, Manship T, Moroni F, Glover A, Troland D, et al. Autologous macrophage therapy for liver cirrhosis: a phase 2 open-label randomized controlled trial. Nat Med. 2025;31(3):979-987. PMID 39794616; PMCID PMC11922741; doi:10.1038/s41591-024-03406-8. (validated: PubMed)
- [Brennan2026MATCHLTFU] Brennan PN, Kilpatrick AM, Glover A, Campana L, Turner ML, Elliott A, et al. Autologous macrophage therapy increases transplant-free survival in cirrhosis: Long-term follow-up of a phase 2 clinical trial. Cell Stem Cell. 2026;33(7):1098-1109.e3. PMID 42184827; doi:10.1016/j.stem.2026.04.016. (validated: PubMed)
- [Fox1998] Fox IJ, Chowdhury JR, Kaufman SS, Goertzen TC, Chowdhury NR, Warkentin PI, et al. Treatment of the Crigler-Najjar syndrome type I with hepatocyte transplantation. N Engl J Med. 1998;338(20):1422-6. PMID 9580649; doi:10.1056/NEJM199805143382004. (validated: PubMed)
- [Nguyen2020] Nguyen MP, Jain V, Iansante V, Mitry RR, Filippi C, Dhawan A. Clinical application of hepatocyte transplantation: current status, applicability, limitations, and future outlook. Expert Rev Gastroenterol Hepatol. 2020;14(3):185-196. PMID 32098516; doi:10.1080/17474124.2020.1733975. (validated: PubMed)
- [Thompson2018ELAD] Thompson J, Jones N, Al-Khafaji A, Malik S, Reich D, Munoz S, et al. Extracorporeal cellular therapy (ELAD) in severe alcoholic hepatitis: A multinational, prospective, controlled, randomized trial. Liver Transpl. 2018;24(3):380-393. PMID 29171941; PMCID PMC5873437; doi:10.1002/lt.24986. (validated: PubMed)
- [Banares2013RELIEF] Bañares R, Nevens F, Larsen FS, Jalan R, Albillos A, Dollinger M, et al. Extracorporeal albumin dialysis with the molecular adsorbent recirculating system in acute-on-chronic liver failure: the RELIEF trial. Hepatology. 2013;57(3):1153-62. PMID 23213075; doi:10.1002/hep.26185. (validated: PubMed)
- [Nasralla2018] Nasralla D, Coussios CC, Mergental H, Akhtar MZ, Butler AJ, Ceresa CDL, et al. A randomized trial of normothermic preservation in liver transplantation. Nature. 2018;557(7703):50-56. PMID 29670285; doi:10.1038/s41586-018-0047-9. (validated: PubMed)
- [Markmann2022OCS] Markmann JF, Abouljoud MS, Ghobrial RM, Bhati CS, Pelletier SJ, Lu AD, et al. Impact of Portable Normothermic Blood-Based Machine Perfusion on Outcomes of Liver Transplant: The OCS Liver PROTECT Randomized Clinical Trial. JAMA Surg. 2022;157(3):189-198. PMID 34985503; PMCID PMC8733869; doi:10.1001/jamasurg.2021.6781. (validated: PubMed)
- [vanRijn2021DHOPE] van Rijn R, Schurink IJ, de Vries Y, van den Berg AP, Cortes Cerisuelo M, Darwish Murad S, et al. Hypothermic Machine Perfusion in Liver Transplantation - A Randomized Trial. N Engl J Med. 2021;384(15):1391-1401. PMID 33626248; doi:10.1056/NEJMoa2031532. (validated: PubMed)
- [Tao2025Xeno] Tao KS, Yang ZX, Zhang X, Zhang HT, Yue SQ, Yang YL, et al. Gene-modified pig-to-human liver xenotransplantation. Nature. 2025;641(8064):1029-1036. PMID 40140580; PMCID PMC12095057; doi:10.1038/s41586-025-08799-1. (validated: PubMed)
- [Zhang2026Xeno] Zhang W, Xu Q, Xu K, Jiang R, Wang S, Zheng M, et al. Genetically engineered pig-to-human liver xenotransplantation. J Hepatol. 2026;84(3):587-598. PMID 41076089; doi:10.1016/j.jhep.2025.08.044. (validated: PubMed)

## Provenance
- Validation: all 81 journal sources were matched in a single batched PubMed `esummary` call (authors, title, journal, year, volume/issue/pages, PMCID, DOI), after first being located and read through Europe PMC core records. The 8 trial registrations were checked on ClinicalTrials.gov API v2 (status, enrolment and primary completion dates as of 2026-11-04). The REZDIFFRA label was checked on openFDA (indication, limitation of use and dose wording quoted as published).
- Abstracts were read for every source that supplies a number. For anatomy numbers not in abstracts, the open full text on PMC was read: Eipel 2010 (blood flow 75–80%/25%, 2.5% body weight, 25% cardiac output, arterial buffer 25–60%); Trefts 2017 (85–90% of plasma protein, albumin 55%, fenestrae 50–180 nm, zones); Friedman 2008 (stellate cells ~15% of resident cells, retinoid 50–80% and 80–90%); Bataller 2005 (~6-fold ECM, TGF-β1/PDGF, MMP-1/-8/-13); Garcia-Tsao 2010 (HVPG thresholds, septal thickness, irreversibility features); Schuppan 2008 (definition of cirrhosis).
- Ishak 1995 and Fox 1998 have no PubMed abstract. They are cited only for the existence of the 0–6 Ishak scale (with the cirrhosis cut-off of 5–6 taken from the Marcellin 2013 abstract) and for the first report of hepatocyte transplantation in Crigler–Najjar type I (from the title).
- Dropped as unverifiable through the listed services: the US FDA accelerated approval of semaglutide (Wegovy) for MASH. The openFDA label endpoint still returns an earlier Wegovy label with no MASH indication, so no regulatory statement on semaglutide for MASH is made here. Builders should check the current label before adding one.
- Dropped for lack of an abstract to quote from: Tripodi and Mannucci 2011 (coagulopathy review) and Rockey 2009 (AASLD biopsy position paper).
- SACRED (NCT03654053) has no published results as of 2026-11-04. Only its design paper and registry entry are cited.
- Not covered here, to avoid duplicating other passes: non-invasive fibrosis tests, FIB-4 and elastography cut-offs (E); portal hypertension haemodynamics and beta-blockers (F); transplant allocation and outcomes (G); epidemiology (A); cause-specific management (C, D).
- No unverified sources are listed. All survival and outcome figures are population statistics from the cited studies.
