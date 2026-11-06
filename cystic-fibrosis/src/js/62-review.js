/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js */
const CFRV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const CFRV_FC=[
 /* ---- Part 1: understanding CF ---- */
 [1,`Where is the CFTR gene, and what does it make?`,`On chromosome 7 (7q31.2), with 27 exons. It encodes a 1,480-amino-acid ABC-family protein that works as a chloride and bicarbonate channel [[Deignan2020ACMG,LopesPacheco2019]].`],
 [1,`Two carriers have a child. What are the chances in each pregnancy?`,`25% a child with CF, 50% a carrier child and 25% a child with neither variant (autosomal recessive) [[Deignan2020ACMG]]. Each pregnancy starts fresh.`],
 [1,`Are carriers of one CFTR variant ill?`,`The ACMG standard states that carriers are expected to be asymptomatic [[Deignan2020ACMG]]. In claims data carriers had higher odds of some CF-related conditions, but individual risk stayed low for most [[Miller2020PNAS]].`],
 [1,`How common is carrying a CFTR variant in the US?`,`One laboratory observed 1 in 29 in people who self-identified as white and 1 in 27 in Ashkenazi Jewish people [[Strom2011]]. Panel-based figures depend on which variants are tested [[Gregg2021ACMG]].`],
 [1,`What is F508del?`,`A 3-base-pair deletion (c.1521_1523delCTT) that removes phenylalanine 508 in the first nucleotide-binding domain (NBD1). It is on about 70% of CF alleles worldwide [[Kerem1989,Morral1994,Farrell2018Age]].`],
 [1,`Name the six CFTR variant classes.`,`I no protein (G542X); II misfolding (F508del); III gating (G551D); IV conductance (R117H); V reduced amount; VI unstable at the membrane [[Bell2020Commission,LopesPacheco2019]].`],
 [1,`What are "minimal function" and "residual function"?`,`Genotype groups used in trials and labels: classes I and II are minimal function; classes IV, V and VI are residual function [[LopesPacheco2019]].`],
 [1,`What is a theratype?`,`A way to group variants by the molecular treatment they respond to, rather than by the defect alone [[Cutting2015]].`],
 [1,`How well does genotype predict the pancreas?`,`Closely: more than 95% of people with class I–III variants are pancreatic insufficient, while class IV–V variants are pancreatic sufficient [[Ahmed2003Gut]].`],
 [1,`How well does genotype predict the lungs?`,`Poorly. In twins and siblings, genes explained 50% of lung-function variation, unique environment or chance 36% and shared environment 14% [[Collaco2010Env]].`],
 [1,`What has to happen for CFTR to open?`,`PKA must phosphorylate the R domain; then ATP binding and dimerisation of the two NBDs drive the gate open [[Csanady2019,Vergani2005]].`],
 [1,`How well does CFTR carry bicarbonate?`,`About one-quarter as well as chloride (Cl⁻/HCO₃⁻ permeability ratio 3.8) [[Poulsen1994]].`],
 [1,`Why is CF sweat salty?`,`The sweat duct cannot reabsorb sodium chloride, because chloride permeability is low; in the duct, CF lowers sodium absorption too [[Quinton1983,Reddy1999]].`],
 [1,`What is a CFTR-related disorder?`,`CFTR dysfunction that does not meet CF criteria: CBAVD, acute recurrent or chronic pancreatitis, or disseminated bronchiectasis [[Bombieri2011]].`],
 /* ---- Part 2: how CF affects the body ---- */
 [2,`How early does bronchiectasis appear in CF?`,`In AREST CF it was present in 29.3% of screened infants at 3 months and 61.5% at 3 years [[Sly2013]].`],
 [2,`How fast did FEV1 fall before modulators?`,`About 1.12 points a year at ages 6–8 and 2.39 at ages 9–12 [[Konstan2007]]. A high baseline FEV1 was itself a risk factor for faster decline [[Konstan2007]].`],
 [2,`What is the usual order of airway pathogens?`,`S. aureus and H. influenzae in childhood, then P. aeruginosa, which turns mucoid over years (median age 13 for mucoid) [[Razvi2009,Li2005]].`],
 [2,`Is MRSA linked to survival?`,`Yes: adjusted hazard ratio for death 1.27 (US registry) [[Dasenbrook2010]].`],
 [2,`Which Burkholderia species is most dangerous?`,`B. cenocepacia: 31 of 33 initial infections became chronic, against 8 of 16 for B. multivorans, with shorter survival [[Jones2004]].`],
 [2,`How common are NTM in CF, and which species?`,`About 13% of people aged 10 or older; M. avium complex 72% and M. abscessus 16% [[Olivier2003]].`],
 [2,`How often do massive haemoptysis and pneumothorax occur?`,`About 0.87% and 0.64% of people with CF each year (1990s US registry) [[Flume2005Hemoptysis,Flume2005Pneumothorax]].`],
 [2,`What share of people with CF are pancreatic insufficient?`,`About 85% [[Singh2017PI]].`],
 [2,`Who gets pancreatitis in CF?`,`Pancreatic-sufficient people, especially with mild genotypes (HR 2.4), because it needs surviving acinar tissue [[Ooi2011Pancreatitis]].`],
 [2,`How common is meconium ileus?`,`About 1 in 5 newborns with CF (13–20%), often the first sign [[Sathe2017MI,vanderDoef2011]].`],
 [2,`DIOS or constipation?`,`DIOS is an acute complete or incomplete faecal obstruction in the ileocaecum; constipation is gradual impaction of the whole colon [[Houwen2010]].`],
 [2,`How often does CF cause cirrhosis?`,`About 5–10% develop multilobular cirrhosis, usually in the first decade [[Debray2011]]. Routine ursodeoxycholic acid is not recommended to prevent it [[Sellers2024,Cheng2017]].`],
 [2,`How common is CF-related diabetes by age?`,`About 2% of children, 19% of adolescents and 40–50% of adults (Minnesota cohort) [[Moran2009Trends]].`],
 [2,`What happens before CFRD is diagnosed?`,`Weight, BMI and lung function fall for years beforehand [[Lanng1992]].`],
 [2,`Why are most men with CF infertile?`,`About 97–98% have congenital bilateral absence of the vas deferens (CBAVD); sperm production is usually intact [[Kaltsas2025]].`],
 [2,`How common is osteoporosis in adults with CF?`,`About 1 in 4 (pooled 23.5%), with osteopenia in 38% [[Paccou2010]].`],
 [2,`What is pseudo-Bartter syndrome?`,`Hypochloraemic, hypokalaemic metabolic alkalosis from salt lost in sweat; it can be the first sign of CF in a young child [[Mantoo2020]].`],
 /* ---- Part 3: screening, diagnosis & monitoring ---- */
 [3,`What does newborn screening measure first?`,`Immunoreactive trypsinogen (IRT) on the dried blood spot. It is high in CF but not specific: carriers, prematurity and birth stress can raise it [[McGarry2025NBS]].`],
 [3,`Name the three screening protocols.`,`IRT/IRT, then IRT/DNA after the 1989 gene discovery, then IRT/DNA/SEQ, first used in California [[McGarry2025NBS,Kharrazi2015]].`],
 [3,`What did the Wisconsin screening trial show?`,`Better growth and less malnutrition with screening, but no clear lung function benefit [[Farrell2001,Farrell2003AJRCCM]].`],
 [3,`What are the sweat chloride bands (2017)?`,`60 mmol/L or more: diagnostic; 30–59: intermediate; below 30: CF unlikely, at all ages [[Farrell2017Dx,DeCelieGermana2023]].`],
 [3,`What changed in the 2017 bands?`,`The lower edge of the intermediate band moved from 40 to 30 mmol/L [[Sosnay2017Nonscreened]].`],
 [3,`How much sweat is enough?`,`At least 75 mg by Gibson–Cooke or at least 15 µL by Macroduct [[Farrell2008Dx]].`],
 [3,`When can a screened infant have a sweat test?`,`At 2 weeks or older, over 2 kg and over 36 weeks' gestation; symptomatic newborns from 48 hours [[Farrell2008Dx]].`],
 [3,`Can sweat conductivity diagnose CF?`,`No. Diagnosis rests on sweat chloride; conductivity is a screening test [[Farrell2008Dx]].`],
 [3,`A screen finds two CF-causing variants. Is that the diagnosis?`,`Not yet: CFTR dysfunction must still be shown, usually with a sweat chloride test [[Farrell2017Screened]].`],
 [3,`What is CRMS/CFSPID?`,`A positive newborn screen with inconclusive sweat and genetic results. Most children stay well; 10–20% develop features of concern for CF [[Ren2017CRMS,Barben2021]].`],
 [3,`What does nasal potential difference show in CF?`,`A high baseline potential difference, a large amiloride response and little chloride response [[Knowles1981,Farrell2008Dx]].`],
 [3,`Why measure the lung clearance index?`,`It picks up early disease when FEV1 is normal: 73% of preschool children with CF had an abnormal LCI, but only 5 of 48 an abnormal FEV1 [[Aurora2011,Owens2011]].`],
 [3,`What visit schedule does the CF Foundation target?`,`At least 4 visits a year, with 4 respiratory cultures and 2 lung function tests [[Wooldridge2015]].`],
 [3,`How is CFRD screened for?`,`A yearly 2-hour 75-g OGTT from age 10; HbA1c is not a screening test [[Moran2010CFRD]].`],
 /* ---- Part 4: treatment ---- */
 [4,`Corrector or potentiator: what is the difference?`,`Correctors help CFTR fold and reach the cell surface; potentiators raise the open probability of CFTR already there, as ivacaftor does [[FDA-Kalydeco,VanGoor2009VX770]].`],
 [4,`What is unusual about elexacaftor?`,`It is a next-generation corrector that also has co-potentiator activity [[Fiedorczuk2022Science,Veit2021ELX]].`],
 [4,`What did STRIVE show for ivacaftor?`,`In G551D, age 12 or older: ppFEV1 +10.6 points, sweat chloride −48.1 mmol/L and exacerbations 55% less likely [[Ramsey2011STRIVE]].`],
 [4,`What did ETI do in F508del/minimal function?`,`ppFEV1 +14.3 points, sweat chloride −41.8 mmol/L and exacerbations −63% against placebo [[Middleton2019ETI]].`],
 [4,`What did SKYLINE find?`,`Once-daily vanzacaftor–tezacaftor–deutivacaftor was non-inferior to ETI for ppFEV1 and gave lower sweat chloride [[Keating2025SKYLINE,FDA-Alyftrek]].`],
 [4,`What makes a variant "responsive" in vitro?`,`A net rise in FRT-cell chloride transport of at least 10% of normal [[FDA-Kalydeco]]. The first label expansion on in vitro data alone came in 2017 [[Durmowicz2018]].`],
 [4,`What liver monitoring do the ETI and VTD labels state?`,`A boxed warning for drug-induced liver injury and liver failure, with liver tests monthly for 6 months, every 3 months for the next 12 months, then yearly [[FDA-Trikafta,FDA-Alyftrek]].`],
 [4,`Why do drug interactions matter for modulators?`,`They are CYP3A substrates: rifampin cut ivacaftor exposure by 89%, and the label reduces the dose with strong or moderate inhibitors [[FDA-Trikafta]].`],
 [4,`Does a person's sweat chloride fall predict their FEV1 gain?`,`No. The two correlate across populations, not within an individual [[Fidler2017SwCl]].`],
 [4,`What does dornase alfa do?`,`It cleaves extracellular DNA in purulent sputum. In Fuchs 1994 once-daily use cut exacerbations by 28% and raised FEV1 by about 5.8% [[Fuchs1994Dornase]].`],
 [4,`Hypertonic saline: who benefits?`,`It cut exacerbations by 56% from age 6 [[Elkins2006HS]], but not in children under 6 in ISIS (rate ratio 0.98) [[Rosenfeld2012ISIS]].`],
 [4,`What did azithromycin do in Saiman 2003?`,`Three days a week, it lowered exacerbation risk (HR 0.65) [[Saiman2003Azithro]]. NTM must be considered first, and azithromycin stopped if NTM grows [[Floto2016NTM]].`],
 [4,`How is first P. aeruginosa treated?`,`Inhaled tobramycin for 28 days (grade A); 56 days was no better [[Mogayzel2014Pa,Ratjen2010ELITE]].`],
 [4,`How long should IV antibiotics run for an exacerbation?`,`STOP2: in early responders, 10 days was non-inferior to 14; in slow responders, 21 days was not better than 14 [[Goss2021STOP2]].`],
 [4,`Which airway clearance technique is best?`,`None has been shown superior, so the choice is individualised [[Flume2009ACT,Wilson2019ACT]]. PEP mask beat the vest on exacerbations in a 1-year trial [[McIlwaine2013HFCWO]].`],
 [4,`What enzyme ceiling does the Creon label state?`,`2,500 lipase units/kg/meal, 10,000 units/kg/day or 4,000 units/g fat/day, "without further investigation" [[FDA-Creon]].`],
 [4,`What is fibrosing colonopathy linked to?`,`Very high enzyme doses: above 50,000 units/kg/day carried a relative risk of 199.5 [[FitzSimmons1997]].`],
 [4,`How is CF-related diabetes treated?`,`With insulin; oral agents are not recommended outside research [[Moran2010CFRD]]. The high-calorie, high-salt CF diet continues [[Moran2010CFRD]].`],
 /* ---- Part 5: living & care ---- */
 [5,`When should an adult be referred for transplant?`,`Discuss at FEV1 below 50%, refer by below 40% with markers of shortened survival, and refer by below 30% in all cases [[Ramos2019Referral]].`],
 [5,`How long do adults with CF live after lung transplant?`,`Median 9.5 years in the ISHLT registry, a population statistic [[Ramos2019Referral]].`],
 [5,`When does palliative care start in CF?`,`From diagnosis onwards, as part of usual care, not only at the end of life [[Kavalieratos2021Palliative]].`],
 [5,`How much time does daily CF treatment take?`,`Adults spent a mean of 108 minutes a day on a median of 7 therapies (before modulators) [[Sawicki2009]].`],
 [5,`What is the CFQ-R respiratory MCID?`,`4 points in stable disease and 8.5 points during an exacerbation [[Quittner2009MCID]].`],
 [5,`How common are depression and anxiety in CF (TIDES)?`,`Depression 10% of adolescents and 19% of adults; anxiety 22% and 32%; among mothers 37% depressed and 48% anxious [[Quittner2014TIDES]].`],
 [5,`What mental-health screening is recommended?`,`Annual PHQ-9 and GAD-7 from age 12, and annual screening for a caregiver of children aged 0–17 [[Quittner2016ICMH]].`],
 [5,`What neuropsychiatric warning do modulator labels carry?`,`Assess at baseline and monitor; symptoms may begin within the first 3 months [[FDA-Trikafta]].`],
 [5,`What predicts trouble at transition to adult care?`,`A gap longer than 3 months between the last paediatric and first adult visit predicted lower lung function [[Melton2024Transition]].`],
 [5,`Can men with CF become biological fathers?`,`Usually yes: sperm production is usually present, so sperm retrieval plus ICSI allows biological parenthood [[Kazmerski2022Family]].`],
 [5,`Why can ETI in pregnancy mislead newborn screening?`,`In-utero exposure lowers newborn IRT and can give a false-negative screen [[Patel2023IRT,Fortner2021]].`],
 [5,`What diabetes screening is advised in a CF pregnancy?`,`An OGTT at 12–16 and at 24–28 weeks if there is no known CFRD, and 6–12 weeks after birth after gestational diabetes [[Moran2010CFRD]].`],
 [5,`Once-daily or thrice-daily IV aminoglycoside?`,`Equally effective, with less kidney toxicity in children [[Bhatt2019Cochrane,Smyth2005TOPIC]].`],
 [5,`What is the single most important infection-control practice?`,`Hand hygiene, before and after all patient contact, whether or not gloves are worn [[Haggie2020,Saiman2014IPC]].`],
 [5,`Did ataluren help nonsense variants?`,`No: it failed two phase 3 trials, so nonsense variants remain an unmet need [[Kerem2014Ataluren,Konstan2020ACTCF]].`],
 [5,`What did the UK non-viral gene therapy trial find?`,`Monthly nebulised pGM169/GL67A gave a 3.7% relative ppFEV1 benefit over placebo, reflecting stabilisation (Early evidence) [[Alton2015pGM169]].`],
 /* ---- Part 6: context & history ---- */
 [6,`Who first reported abnormal sweat in CF, and when?`,`Di Sant'Agnese and colleagues, in 1953 [[DiSantAgnese1953]].`],
 [6,`What did Gibson and Cooke standardise in 1959?`,`Sweat collection by pilocarpine iontophoresis [[Gibson1959]].`],
 [6,`Who introduced the newborn IRT screen?`,`Crossley, Elliott and Smith, in New Zealand in 1979, using dried blood spots [[Crossley1979]].`],
 [6,`What did Quinton show in 1983?`,`Isolated CF sweat ducts had abnormally low chloride permeability, so salt stays in the sweat [[Quinton1983]].`],
 [6,`When and how was the CF gene found?`,`In 1989 by positional cloning, in three Science papers by Rommens, Riordan and Kerem [[Rommens1989,Riordan1989,Kerem1989]].`],
 [6,`Who began the functional class system?`,`Welsh and Smith, in 1993 [[Welsh1993]].`],
 [6,`What first did CF achieve in carrier screening?`,`It was the first condition for which pan-ethnic universal carrier screening was recommended (ACMG/ACOG 2001) [[Deignan2020ACMG]].`],
 [6,`When was Trikafta first approved in the US?`,`21 October 2019; Alyftrek followed on 20 December 2024 [[FDA2026Approvals,FDA-Alyftrek]].`],
 [6,`How old is F508del?`,`Estimates differ: over 52,000 years from 1994 haplotypes [[Morral1994]], or 4,600–4,725 years in northwestern Europe from a 2018 family study (both Hypothesis) [[Farrell2018Age]].`],
 [6,`Did carriers once have a survival advantage?`,`Unproven (Hypothesis). Cholera and typhoid ideas come from animal and cell data [[Gabriel1994,Pier1998]]; one model found tuberculosis could fit better [[Poolman2007]].`],
 [6,`How did survival after meconium ileus change?`,`First-year survival rose from 55% (born 1958–1972) to 96% (born 1973–1987) [[vanderDoef2011]].`]
];
/* every mnemonic here is coined for this guide */
const CFRV_MN=[
 ["Make, fold, open, flow, amount, stay",`The six variant classes in order: I no protein, II misfolding, III gating, IV conductance, V reduced amount, VI unstable at the membrane [[Bell2020Commission,LopesPacheco2019]].`],
 ["One, two, one",`Two carrier parents: in each pregnancy 1 in 4 a child with CF, 2 in 4 a carrier, 1 in 4 neither [[Deignan2020ACMG]].`],
 ["Sixty and thirty",`Sweat chloride: <b>60</b> mmol/L or more diagnostic, <b>30</b>–59 intermediate, below 30 CF unlikely, at all ages [[Farrell2017Dx]].`],
 ["A, D, E, K",`The fat-soluble vitamins that CF-specific multivitamins supply, started soon after diagnosis [[Borowitz2009]].`],
 ["Staph first, Pseudomonas later",`Typical order: S. aureus and H. influenzae in childhood, then P. aeruginosa, which turns mucoid over years [[Razvi2009,Li2005]].`],
 ["Fifty, forty, thirty",`Adult transplant referral: discuss at FEV1 below <b>50</b>%, refer by below <b>40</b>% with risk markers, refer by below <b>30</b>% in all cases [[Ramos2019Referral]].`],
 ["Ten for sugar, forty for the bowel",`Yearly OGTT from age <b>10</b> [[Moran2010CFRD]]; colonoscopy from age <b>40</b>, or 30 after transplant [[Hadjiliadis2018]].`],
 ["Six, twelve, then yearly",`ETI and VTD liver tests as labelled: monthly for the first <b>6</b> months, every 3 months for the next <b>12</b>, then at least yearly [[FDA-Trikafta,FDA-Alyftrek]].`],
 ["Twenty-eight on, twenty-eight off",`Inhaled tobramycin (TOBI) as labelled: alternating 28 days on and 28 days off [[FDA-TOBI]].`],
 ["Six feet, one person",`Infection control as published: at least 6 feet (2 m) between people with CF, and only 1 person with CF at a CF Foundation indoor event [[Saiman2014IPC]].`]
];
/* the six classes for the animation: numeral, memory word, what fails, example variants */
const CFRV_CL=[
 ['I','Make','no protein made','G542X, W1282X'],
 ['II','Fold','misfolds, degraded','F508del'],
 ['III','Open','gate stays shut','G551D'],
 ['IV','Flow','opens, little flow','R117H'],
 ['V','Amount','too little CFTR','splicing, promoter'],
 ['VI','Stay','pulled back in','rescued F508del']
];
const CFRV_STEPS=[
 {from:0,at:.07,k:'Class I',t:'Make: no protein',txt:`Nonsense variants (premature stop codons), frameshifts and canonical splice-site changes make no protein or a truncated one, and the faulty transcripts are cleared by nonsense-mediated decay. Examples: G542X, W1282X [[LopesPacheco2019]]. About 10% of people with CF carry a premature stop variant [[LopesPacheco2019,Kerem2014Ataluren]].`,pt:'The gene has a stop sign in the wrong place, so the cell never finishes building the channel.',hook:'No protein means nothing for a modulator to act on; ataluren read-through failed two phase 3 trials. [[Kerem2014Ataluren,Konstan2020ACTCF]]'},
 {from:1/6,at:1/6+.07,k:'Class II',t:'Fold: misfolded and degraded',txt:`The protein misfolds, is held by quality control in the endoplasmic reticulum and is broken down by proteasomes. F508del is the main example; G85E, I507del, R560T and N1303K are others [[LopesPacheco2019,Bell2020Commission]].`,pt:'The channel is built but folds into the wrong shape, so the cell throws it away before it reaches the surface.',hook:'Correctors (lumacaftor, tezacaftor, elexacaftor) help F508del fold and reach the surface. [[Fiedorczuk2022Cell,Fiedorczuk2022Science]]'},
 {from:2/6,at:2/6+.07,k:'Class III',t:'Open: the gate stays shut',txt:`The protein reaches the membrane but does not open properly, even with the R domain phosphorylated and ATP bound. Example: G551D [[Bell2020Commission,LopesPacheco2019]].`,pt:'The channel sits in the right place, but its door is stuck closed.',hook:'Potentiator ivacaftor in G551D (STRIVE): ppFEV1 +10.6 points, sweat chloride −48.1 mmol/L. [[Ramsey2011STRIVE]]'},
 {from:3/6,at:3/6+.07,k:'Class IV',t:'Flow: open, but little gets through',txt:`A conductance defect: ions flow through an open channel, but less than normal. Example: R117H [[Bell2020Commission]]. Classes IV and V keep residual function, often with the pancreas spared early in life [[Bell2020Commission]].`,pt:'The door opens, but the doorway is narrow, so only a trickle of salt gets out.',hook:'Class IV–V variants are pancreatic sufficient; class I–III mean more than 95% insufficient. [[Ahmed2003Gut]]'},
 {from:4/6,at:4/6+.07,k:'Class V',t:'Amount: too little normal CFTR',txt:`Alternative splicing, promoter or missense changes leave a reduced amount of normal CFTR [[LopesPacheco2019,Bell2020Commission]]. 3849+10kbC→T is one splicing example: about 8% of transcripts are spliced normally [[Highsmith1994,Deignan2020ACMG]].`,pt:'Each channel works, but the cell makes too few of them.',hook:'3849+10kbC→T can cause CF-like lung disease with normal sweat chloride. [[Highsmith1994]]'},
 {from:5/6,at:5/6+.07,k:'Class VI',t:'Stay: unstable at the membrane',txt:`The protein reaches the membrane but is unstable there, with faster removal (endocytosis) and less recycling. Corrector-rescued F508del behaves like a class VI protein [[Bell2020Commission,LopesPacheco2019]]. A proposed class VII covers large deletions with no mRNA at all (Hypothesis) [[LopesPacheco2019,DeBoeck2016]].`,pt:'The channel arrives and works, but it does not stay long before the cell pulls it back inside.',hook:'Many variants have more than one defect: F508del "could be assigned to at least three classes". [[Cutting2015]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(CFRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=CFRV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=CFRV_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=CFRV_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=CFRV_MN.map(m=>`<div class="card"><span class="tag accent">memory aid, not from a source</span><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');

  /* ---- mnemonic in motion: the six classes ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const DIAL=[0,.04,.1,.32,.3,.8];
  /* a half dial from 'none' to 'normal': a drawing proportion only */
  const dialG=(x,y,r,v)=>{const P=(u,rr)=>[x-rr*Math.cos(Math.PI*u),y-rr*Math.sin(Math.PI*u)],arc=(u0,u1,rr)=>{const a=P(u0,rr),b=P(u1,rr);return `M${f1(a[0])} ${f1(a[1])}A${rr} ${rr} 0 0 1 ${f1(b[0])} ${f1(b[1])}`};
    const w=r*.24,uv=clamp(v),q=P(uv,r-w-5);
    let g=`<path d="${arc(0,1,r-w/2)}" style="fill:none;stroke:var(--panel);stroke-width:${f1(w)}"/>`;
    if(uv>.005)g+=`<path d="${arc(0,uv,r-w/2)}" style="fill:none;stroke:var(--cl);stroke-width:${f1(w)}"/>`;
    g+=`<line x1="${x}" y1="${y}" x2="${f1(q[0])}" y2="${f1(q[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${x}" cy="${y}" r="4" style="fill:var(--ink)"/>`;
    g+=`<text class="rv-b" text-anchor="middle" x="${f1(x-r+w/2)}" y="${y+16}">none</text><text class="rv-b" text-anchor="middle" x="${f1(x+r-w/2)}" y="${y+16}">normal</text><text class="rv-c" text-anchor="middle" x="${x}" y="${f1(y-r-8)}" style="font-weight:700">chloride out</text>`;
    return g};
  const HINT=[['no protein for a drug','to act on'],['correctors help it fold','and reach the surface'],['a potentiator holds','the gate open'],['some function remains:','often milder disease'],['some function remains:','often pancreas spared'],['it works while it stays:','then it is removed']];
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const p=phaseOf(CFRV_STEPS,t),u=clamp((t-CFRV_STEPS[p].from)*6),ph=t*40;
    const L=N?{x:12,y:40,w:376,rh:40,th:34}:{x:16,y:48,w:300,rh:54,th:46};
    const R=N?{x:12,y:296,w:376,h:336}:{x:332,y:16,w:372,h:348};
    let s=`<text class="rv-a" x="${L.x}" y="${L.y-16}">Make, fold, open, flow, amount, stay</text>`;
    CFRV_CL.forEach(([num,word,what,ex],k)=>{
      const y=L.y+k*L.rh,hot=k===p,done=k<p;
      s+=`<g style="opacity:${hot?1:done?.8:.5}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?13:15;
      s+=`<circle cx="${L.x+cr+8}" cy="${y+L.th/2}" r="${cr}" style="fill:var(${hot?'--brand':'--muted'})"/><text class="rv-n" x="${L.x+cr+8}" y="${y+L.th/2+4.5}" text-anchor="middle"${num.length>2?' style="font-size:10.5px"':''}>${num}</text>`;
      const tx=L.x+cr*2+18;
      if(N)s+=`<text class="rv-c" x="${tx}" y="${y+L.th/2+5}"><tspan style="font-weight:700">${word}</tspan> · ${what}</text>`;
      else s+=`<text class="rv-c" x="${tx}" y="${y+20}" style="font-weight:700">${word}: ${what}</text><text class="rv-b" x="${tx}" y="${y+37}">e.g. ${ex}</text>`;
      s+='</g>'});
    /* explainer panel */
    const W=R.w,S=N?88:92,cx=W/2+22,cy=N?136:134;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=`<text class="rv-a" x="16" y="28">Class ${CFRV_CL[p][0]}: ${CFRV_CL[p][1].toLowerCase()} fails</text>`;
    if(N)s+=`<text class="rv-b" x="16" y="48">e.g. ${CFRV_CL[p][3]}</text>`;
    s+=`<text class="rv-b" x="14" y="${cy-20}">outside</text><text class="rv-b" x="14" y="${cy+30}">inside</text>`;
    const cap=(txt,o=1)=>`<text class="rv-b" x="${cx}" y="${f1(cy+S*1.0)}" text-anchor="middle" style="opacity:${f1(o)}">${txt}</text>`;
    let dial=DIAL[p];
    if(p===0){
      s+=cftr(cx,cy,S,{state:'absent'}).svg;
      s+=geneStrip(cx-S*1.2,cy+S*.66,S*2.4,{n:9,mark:5,label:'stop',zoom:ease(ramp(u,.1,.5))}).svg;
      s+=cap('a stop signal: the protein is never finished');
    }else if(p===1){
      s+=cftr(cx,cy,S,{state:'misfold',fold:.15*Math.sin(u*Math.PI*3)**2}).svg;
      s+=cap('held in the cell and broken down',.4+.6*ease(ramp(u,.3,.8)));
    }else if(p===2){
      s+=cftr(cx,cy,S,{state:'closed',open:.06+.05*Math.sin(u*Math.PI*4),p:ramp(u,0,.25),atp:ramp(u,.2,.45)}).svg;
      s+=cap('phosphorylated, ATP bound, still shut');
    }else if(p===3){
      s+=cftr(cx,cy,S,{state:'open',flow:.32*ramp(u,0,.3),ph}).svg;
      s+=cap('open, but only a trickle of chloride');
    }else if(p===4){
      const gp=S*.1,hw=S*.22,mw=S*3.1,c5=W/2+14;
      s+=membrane(c5-mw/2,cy,mw,{h:S*.26,gap:[c5-gp/2-hw,c5+gp/2+hw]});
      [-1,1].forEach(d=>{s+=cftr(c5+d*S*1.0,cy,S,{state:'absent',membrane:false}).svg});
      s+=cftr(c5,cy,S,{state:'open',flow:ramp(u,0,.3),ph,membrane:false}).svg;
      s+=`<text class="rv-b" x="${c5}" y="${f1(cy+S*1.0)}" text-anchor="middle">each channel works, but too few are made</text>`;
    }else{
      const sink=ease(ramp(u,.35,.9)),mw=S*2.6,gp=S*.1,hw=S*.22;
      s+=membrane(cx-mw/2,cy,mw,{h:S*.26,gap:sink<.25?[cx-gp/2-hw,cx+gp/2+hw]:null});
      s+=`<g style="opacity:${f1(1-sink*.55)}">`+cftr(cx,cy+sink*S*.5,S,{state:'open',open:1-sink,flow:.85*(1-sink),ph,membrane:false}).svg+'</g>';
      dial=lerp(.8,.12,sink);
      s+=`<text class="rv-b" x="${cx}" y="${f1(cy+S*1.15)}" text-anchor="middle">${sink<.3?'working at the surface':'pulled back into the cell'}</text>`;
    }
    const gy=R.h-30,gr=40;
    s+=dialG(66,gy,gr,dial);
    const hx=136;
    s+=`<text class="rv-c" x="${hx}" y="${gy-40}" style="font-weight:700">${HINT[p][0]}</text><text class="rv-c" x="${hx}" y="${gy-20}">${HINT[p][1]}</text>`;
    s+=`<text class="rv-b" x="${hx}" y="${gy+4}">dial: a schematic, not a measure</text></g>`;
    svg.innerHTML=s;
    setSt(p);$('#rvNote').innerHTML=noteHTML(CFRV_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${CFRV_STEPS[p].k}: ${CFRV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#rvPlay'),draw,24000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),CFRV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const CFQZ_Q=[
 /* ---- Part 1 ---- */
 [1,`The CFTR gene sits on which chromosome?`,[`5`,`7`,`12`,`17`],1,`CFTR is at 7q31.2, with 27 exons [[Deignan2020ACMG]].`],
 [1,`Two carriers of a CF-causing variant start a pregnancy. What is the chance the child has CF?`,[`1 in 2`,`1 in 4`,`1 in 8`,`3 in 4`],1,`Autosomal recessive: 25% affected, 50% carrier, 25% neither, in each pregnancy [[Deignan2020ACMG]].`],
 [1,`F508del belongs mainly to which variant class?`,[`Class I (no protein)`,`Class II (misfolding)`,`Class III (gating)`,`Class IV (conductance)`],1,`F508del misfolds and is degraded in the endoplasmic reticulum, the main class II example [[LopesPacheco2019,Bell2020Commission]].`],
 [1,`G551D causes which defect?`,[`No protein`,`Misfolding`,`Gating: the channel reaches the membrane but does not open`,`Reduced amount`],2,`G551D is the classic class III gating variant [[Bell2020Commission,LopesPacheco2019]].`],
 [1,`R117H is the classic example of which class?`,[`Class I`,`Class II`,`Class III`,`Class IV`],3,`R117H reduces ion flow through an open channel: a class IV conductance defect [[Bell2020Commission]].`],
 [1,`What has to happen before CFTR can open?`,[`Calcium binds the R domain`,`PKA phosphorylates the R domain, then ATP binds and the NBDs dimerise`,`The membrane depolarises`,`ENaC is cleaved by proteases`],1,`Opening needs R-domain phosphorylation by PKA, then ATP-driven NBD dimerisation [[Csanady2019,Vergani2005]].`],
 [1,`CF sweat is salty because:`,[`The sweat coil secretes extra salt`,`The sweat duct fails to reabsorb sodium chloride`,`The kidneys waste salt`,`Sweat glands are enlarged`],1,`Low chloride permeability in the duct stops NaCl reabsorption [[Quinton1983,Reddy1999]].`],
 [1,`How strongly does CFTR genotype predict lung disease?`,[`Almost perfectly`,`Poorly: about half the variation is genetic modifiers, half environment or chance`,`Not at all, it is entirely environmental`,`Only in adults`],1,`Genes explained 50% of lung-function variation, unique environment or chance 36% and shared environment 14% [[Collaco2010Env]]; no genotype predicted lung course [[CFGPC1993]].`],
 [1,`The pulmonary ionocyte is marked by which transcription factor?`,[`FOXJ1`,`FOXI1`,`SOX2`,`NKX2-1`],1,`A rare FOXI1-positive cell with high CFTR expression [[Montoro2018,Plasschaert2018]].`],
 [1,`The commonest cause of CBAVD is:`,[`Two F508del copies`,`A CF-causing variant on one copy plus 5T on the other`,`Two R117H copies`,`A large deletion`],1,`Chillon 1995 found this combination the most common cause [[Chillon1995]].`],
 [1,`W1282X is the most common CF variant in which group?`,[`Ashkenazi Jewish people`,`East Asian people`,`Northern Europeans`,`African American people`],0,`W1282X was on 60% of Ashkenazi CF chromosomes in Israel [[Shoshani1992]]; 3120+1G>T is common in African American people with CF [[Watson2004ACMG]].`],
 [1,`Class I–III variants mean what for the pancreas?`,[`Usually sufficient`,`More than 95% pancreatic insufficient`,`Pancreatitis in most`,`No pancreatic effect`],1,`Class I–III: more than 95% insufficient; class IV–V: pancreatic sufficient [[Ahmed2003Gut]].`],
 /* ---- Part 2 ---- */
 [2,`In AREST CF, how many screened children had bronchiectasis by age 3?`,[`About 5%`,`About 29%`,`About 61.5%`,`About 95%`],2,`29.3% at 3 months, 61.5% at 3 years [[Sly2013]].`],
 [2,`Before modulators, FEV1 fell by about how much a year at ages 9–12?`,[`0.2 points`,`1 point`,`2.4 points`,`8 points`],2,`2.39 points a year at 9–12; 1.12 at 6–8 [[Konstan2007]].`],
 [2,`In the Wisconsin cohort, mucoid P. aeruginosa was first acquired at a median age of:`,[`1 year`,`5 years`,`13 years`,`30 years`],2,`Non-mucoid at a median 1.0 year, mucoid at 13.0 years [[Li2005]].`],
 [2,`About what share of people with CF are pancreatic insufficient?`,[`15%`,`50%`,`85%`,`100%`],2,`About 85% [[Singh2017PI]].`],
 [2,`Pancreatitis in CF happens mainly in people who are:`,[`Pancreatic insufficient`,`Pancreatic sufficient`,`On high-dose enzymes`,`Newborns with meconium ileus`],1,`It needs surviving acinar tissue; mild genotypes carried more risk (HR 2.4) [[Ooi2011Pancreatitis]].`],
 [2,`Which definition fits DIOS?`,[`Acute complete or incomplete faecal obstruction in the ileocaecum`,`Gradual impaction of the whole colon`,`Reflux into the oesophagus`,`Bowel obstruction at birth`],0,`ESPGHAN definition; constipation is gradual impaction of the whole colon [[Houwen2010]].`],
 [2,`CF-related diabetes affects about how many adults with CF (Minnesota)?`,[`2%`,`19%`,`40–50%`,`90%`],2,`2% of children, 19% of adolescents, 40–50% of adults [[Moran2009Trends]].`],
 [2,`About what share of men with CF have CBAVD?`,[`25%`,`50%`,`97–98%`,`All, with no sperm production`],2,`About 97–98%; sperm production itself is usually intact [[Kaltsas2025]].`],
 [2,`Pseudo-Bartter syndrome in CF is:`,[`Hyperchloraemic metabolic acidosis`,`Hypochloraemic, hypokalaemic metabolic alkalosis from sweat salt loss`,`Respiratory acidosis`,`Hyperkalaemia from kidney failure`],1,`Salt lost in sweat; it can be the first sign of CF [[Mantoo2020]].`],
 [2,`Fibrosing colonopathy is linked to:`,[`Very high pancreatic enzyme doses`,`Low enzyme doses`,`Ursodeoxycholic acid`,`Azithromycin`],0,`Above 50,000 lipase units/kg/day carried RR 199.5 [[FitzSimmons1997]].`],
 [2,`MRSA in the airway was associated with an adjusted hazard ratio for death of about:`,[`0.8`,`1.27`,`3.5`,`10`],1,`aHR 1.27 (95% CI 1.11–1.45) [[Dasenbrook2010]].`],
 [2,`Which Burkholderia species is linked to "cepacia syndrome" and worse survival?`,[`B. multivorans only`,`B. cenocepacia`,`B. pseudomallei`,`None`],1,`B. cenocepacia became chronic more often and carried shorter survival; cepacia syndrome deaths occurred with both species [[Jones2004]].`],
 /* ---- Part 3 ---- */
 [3,`What sweat chloride is diagnostic of CF (2017)?`,[`30 mmol/L or more`,`40 mmol/L or more`,`60 mmol/L or more`,`100 mmol/L or more`],2,`60 or more diagnostic; 30–59 intermediate; below 30 unlikely [[Farrell2017Dx]].`],
 [3,`The 2017 update set the intermediate sweat chloride band at:`,[`30–59 mmol/L`,`40–59 mmol/L`,`20–39 mmol/L`,`60–79 mmol/L`],0,`The lower edge moved from 40 to 30 mmol/L [[Sosnay2017Nonscreened]].`],
 [3,`Every US newborn screening protocol starts with:`,[`A sweat test`,`IRT on the dried blood spot`,`Full CFTR sequencing`,`Faecal elastase`],1,`IRT first, then molecular testing if high [[McGarry2025NBS]]; dried-spot IRT dates from Crossley 1979 [[Crossley1979]].`],
 [3,`The Wisconsin randomised screening trial showed:`,[`Better lung function by school age`,`Better growth and nutrition, but no clear lung benefit`,`Lower mortality`,`No difference in anything`],1,`Growth improved; lung outcomes did not clearly differ [[Farrell2001,Farrell2003AJRCCM]].`],
 [3,`Sweat conductivity is:`,[`The preferred diagnostic test`,`A screening test; diagnosis rests on sweat chloride`,`Equivalent to sweat chloride`,`Used only after transplant`],1,`Sweat chloride is "the only analyte on which a diagnosis of CF should be based" [[Farrell2008Dx]].`],
 [3,`The minimum sweat volume by the Macroduct method is:`,[`5 µL`,`15 µL`,`75 µL`,`150 µL`],1,`At least 15 µL (Macroduct) or 75 mg (Gibson–Cooke) [[Farrell2008Dx]].`],
 [3,`Of infants with CRMS/CFSPID, how many develop features of concern for CF?`,[`Under 1%`,`10–20%`,`About half`,`Nearly all`],1,`Most stay well; 10–20% develop features of concern [[Ren2017CRMS]].`],
 [3,`Which test picks up early lung disease when FEV1 is still normal?`,[`Peak flow`,`Lung clearance index`,`Sweat test`,`Pulse oximetry`],1,`73% of preschoolers with CF had an abnormal LCI, only 5 of 48 an abnormal FEV1 [[Aurora2011]].`],
 [3,`The recommended CFRD screening test is:`,[`Yearly HbA1c`,`A yearly 2-hour 75-g OGTT from age 10`,`Fasting glucose alone`,`Urine glucose`],1,`HbA1c is not sensitive enough to screen [[Moran2010CFRD]].`],
 [3,`Nasal potential difference in CF shows:`,[`Low baseline, large chloride response`,`High baseline, large amiloride response, little chloride response`,`Normal values`,`No amiloride response`],1,`The CF pattern [[Knowles1981,Farrell2008Dx]].`],
 [3,`A screened baby has two CF-causing variants. What else confirms the diagnosis?`,[`Nothing more is needed`,`Evidence of CFTR dysfunction, usually a sweat test`,`A chest CT`,`A lung biopsy`],1,`Two variants still need CFTR dysfunction shown [[Farrell2017Screened]].`],
 [3,`The CF Foundation visit target is:`,[`One visit a year`,`At least 4 visits, 4 respiratory cultures and 2 lung function tests a year`,`Weekly visits`,`Visits only when unwell`],1,`In 2012 only 57.4% of US patients met it [[Wooldridge2015]].`],
 /* ---- Part 4 ---- */
 [4,`Ivacaftor is a:`,[`Corrector`,`Potentiator`,`Read-through agent`,`ENaC blocker`],1,`It raises the open probability of CFTR already at the surface [[FDA-Kalydeco,VanGoor2009VX770]].`],
 [4,`In STRIVE (G551D), ivacaftor raised ppFEV1 by about:`,[`2.6 points`,`4.0 points`,`10.6 points`,`25 points`],2,`+10.6 points through week 24 [[Ramsey2011STRIVE]].`],
 [4,`ETI against placebo in F508del/minimal function raised ppFEV1 by:`,[`4.0 points`,`10.0 points`,`14.3 points`,`30 points`],2,`+14.3 points, sweat chloride −41.8 mmol/L, exacerbations −63% [[Middleton2019ETI]].`],
 [4,`Heijerman 2019 compared ETI with:`,[`Placebo`,`Tezacaftor–ivacaftor`,`Ivacaftor alone`,`Hypertonic saline`],1,`An active comparator: +10.0 points with ETI [[Heijerman2019ETI]].`],
 [4,`Lumacaftor–ivacaftor in F508del homozygotes gave what size of FEV1 effect?`,[`Modest: +2.6 to 4.0 points`,`Large: +14 points`,`None`,`A fall in FEV1`],0,`TRAFFIC/TRANSPORT [[Wainwright2015TRAFFIC]].`],
 [4,`The FDA in vitro threshold for a "responsive" variant is a rise in FRT chloride transport of at least:`,[`1% of normal`,`10% of normal`,`50% of normal`,`100% of normal`],1,`At least 10% of normal over baseline [[FDA-Kalydeco]].`],
 [4,`The ETI label's liver test schedule is:`,[`Baseline only`,`Monthly for 6 months, every 3 months for 12 months, then yearly`,`Weekly for a year`,`Not required`],1,`With a boxed warning for drug-induced liver injury and liver failure [[FDA-Trikafta]].`],
 [4,`Rifampin given with ivacaftor:`,[`Raises ivacaftor exposure`,`Cuts ivacaftor exposure (AUC) by 89%`,`Has no effect`,`Prevents cataracts`],1,`Strong CYP3A inducers are not recommended [[FDA-Trikafta]].`],
 [4,`In children under 6 (ISIS), hypertonic saline:`,[`Cut exacerbations by 56%`,`Did not reduce exacerbations (rate ratio 0.98)`,`Doubled exacerbations`,`Was never tested`],1,`The 56% reduction was in people aged 6 or older [[Rosenfeld2012ISIS,Elkins2006HS]].`],
 [4,`Dornase alfa works by:`,[`Drawing water osmotically`,`Cleaving extracellular DNA in purulent sputum`,`Killing Pseudomonas`,`Opening CFTR`],1,`It turns DNA-rich sputum from gel to liquid [[Shak1990,Fuchs1994Dornase]].`],
 [4,`TOBI (inhaled tobramycin) is labelled as:`,[`Continuous daily use`,`28 days on, 28 days off`,`7 days a month`,`Once weekly`],1,`Alternating 28-day periods [[FDA-TOBI,Ramsey1999TOBI]].`],
 [4,`Before starting chronic azithromycin, which infection must be considered?`,[`MRSA`,`Nontuberculous mycobacteria`,`Influenza`,`Candida`],1,`Stop azithromycin if NTM grows, to avoid macrolide resistance [[Floto2016NTM]].`],
 [4,`In STOP2, for early responders, 10 days of IV antibiotics was:`,[`Non-inferior to 14 days`,`Worse than 14 days`,`Better than 21 days`,`Not tested`],0,`And 21 days was not better than 14 for slow responders [[Goss2021STOP2]].`],
 [4,`Which airway clearance technique has been shown superior?`,[`The vest (HFCWO)`,`None; the choice is individualised`,`Postural drainage`,`Oscillating devices`],1,`No technique has been shown superior [[Flume2009ACT,Wilson2019ACT]].`],
 [4,`The Creon label ceiling per meal is:`,[`500 lipase units/kg`,`2,500 lipase units/kg`,`10,000 lipase units/kg`,`50,000 lipase units/kg`],1,`Also 10,000 units/kg/day or 4,000 units/g fat/day [[FDA-Creon]].`],
 [4,`Routine inhaled or oral corticosteroids, without asthma or ABPA, are graded by the CF Foundation as:`,[`A (strongly recommend)`,`B`,`C`,`D (recommend against)`],3,`Grade D [[Mogayzel2013Pulm]].`],
 [4,`SKYLINE showed once-daily vanzacaftor–tezacaftor–deutivacaftor against ETI to be:`,[`Inferior for ppFEV1`,`Non-inferior for ppFEV1, with lower sweat chloride`,`Superior for ppFEV1 by 10 points`,`Stopped for harm`],1,`Non-inferior (margin −3.0 points) with lower sweat chloride [[Keating2025SKYLINE,FDA-Alyftrek]].`],
 /* ---- Part 5 ---- */
 [5,`By what FEV1 should every adult with CF be referred for transplant, regardless of other markers?`,[`Below 70%`,`Below 50%`,`Below 40%`,`Below 30%`],3,`Discuss below 50%, refer below 40% with risk markers, refer below 30% in all cases [[Ramos2019Referral]].`],
 [5,`Median survival after lung transplant for adults with CF (ISHLT) is about:`,[`2.5 years`,`5 years`,`9.5 years`,`20 years`],2,`9.5 years, a population statistic [[Ramos2019Referral]].`],
 [5,`When does the CF Foundation recommend palliative care begins?`,[`In the last weeks of life`,`From diagnosis and throughout the disease course`,`Only after transplant is declined`,`Only in adults`],1,`Primary palliative care as part of usual care [[Kavalieratos2021Palliative]].`],
 [5,`Mean daily treatment time for adults with CF before modulators was about:`,[`15 minutes`,`45 minutes`,`108 minutes`,`4 hours`],2,`Median 7 therapies [[Sawicki2009]].`],
 [5,`Nebuliser adherence by device download versus self-report was:`,[`36% versus 80%`,`80% versus 36%`,`Equal at 60%`,`95% versus 99%`],0,`Electronic monitoring shows far lower adherence [[Daniels2011Adherence]].`],
 [5,`The CFQ-R respiratory MCID in stable disease is:`,[`1 point`,`4 points`,`8.5 points`,`20 points`],1,`8.5 points during an exacerbation [[Quittner2009MCID]].`],
 [5,`The ICMH recommends mental-health screening:`,[`Yearly with PHQ-9 and GAD-7 from age 12`,`Only if symptoms appear`,`Every 5 years from 18`,`Only for caregivers`],0,`Plus yearly screening for a caregiver of children aged 0–17 [[Quittner2016ICMH]].`],
 [5,`ETI taken in pregnancy can affect the baby's newborn screen by:`,[`Raising IRT, giving false positives`,`Lowering IRT, risking a false negative`,`Having no effect`,`Raising sweat chloride`],1,`Exposed infants had lower IRT [[Patel2023IRT,Fortner2021]].`],
 [5,`In a pregnant woman with CF and no known CFRD, gestational diabetes screening is at:`,[`24–28 weeks only`,`12–16 and 24–28 weeks`,`Only after birth`,`Not needed`],1,`2-hour 75-g OGTT at both times [[Moran2010CFRD]].`],
 [5,`A gap between paediatric and adult care longer than what predicted lower lung function?`,[`3 months`,`2 years`,`5 years`,`No gap length mattered`],0,`Median gap 7.6 months; over 3 months predicted lower lung function [[Melton2024Transition]].`],
 [5,`Once-daily IV aminoglycoside, compared with thrice daily, is:`,[`Equally effective, with less kidney toxicity in children`,`Less effective`,`More toxic`,`Never used`],0,`[[Bhatt2019Cochrane,Smyth2005TOPIC]]`],
 [5,`Ataluren, a read-through drug for nonsense variants:`,[`Was approved after STRIVE`,`Failed two phase 3 trials`,`Is a gene therapy`,`Is a potentiator`],1,`Nonsense variants remain an unmet need [[Kerem2014Ataluren,Konstan2020ACTCF]].`],
 [5,`For men with CF, biological parenthood usually needs:`,[`Nothing special`,`Sperm retrieval plus ICSI`,`Testosterone alone`,`It is impossible`],1,`Sperm production is usually present [[Kazmerski2022Family]].`],
 /* ---- Part 6 ---- */
 [6,`In which year was the CF gene identified?`,[`1953`,`1979`,`1989`,`2012`],2,`Three Science papers by Rommens, Riordan and Kerem [[Rommens1989,Riordan1989,Kerem1989]].`],
 [6,`Who standardised sweat collection by pilocarpine iontophoresis in 1959?`,[`Crossley and Elliott`,`Gibson and Cooke`,`Quinton`,`Riordan`],1,`[[Gibson1959]]`],
 [6,`What did Crossley and colleagues introduce in 1979?`,[`The sweat test`,`A dried blood-spot IRT newborn screen`,`Ivacaftor`,`Lung transplant`],1,`In New Zealand [[Crossley1979]].`],
 [6,`Which was the first condition for which pan-ethnic universal carrier screening was recommended?`,[`Spinal muscular atrophy`,`Cystic fibrosis`,`Tay–Sachs disease`,`Sickle cell disease`],1,`ACMG/ACOG, 2001 [[Deignan2020ACMG]].`],
 [6,`In 2017 the FDA first expanded a CF drug label on the basis of:`,[`A phase 3 trial`,`In vitro FRT-cell data`,`Registry data`,`Animal data`],1,`Ivacaftor, rare variants [[Durmowicz2018]].`],
 [6,`Trikafta was first approved in the US in:`,[`2012`,`2015`,`2019`,`2024`],2,`21 October 2019 [[FDA2026Approvals]].`],
 [6,`Quinton's 1983 sweat duct experiments showed:`,[`High chloride permeability`,`Abnormally low chloride permeability`,`Extra sweat production`,`Bacteria in sweat`],1,`[[Quinton1983]]`],
 [6,`The idea that CF carriers once had a survival advantage is:`,[`Proven`,`An unproven hypothesis`,`Disproved for every infection`,`Recorded in the drug labels`],1,`Heterozygote advantage remains unproven [[Farrell2018Age,Poolman2007]].`],
 [6,`Universal CF newborn screening began in the US in:`,[`1979`,`1989`,`2010`,`2019`],2,`And in the UK in 2007 [[McGarry2025NBS,Schluter2020]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(CFRV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=CFQZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${CFRV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
const CFGL_T=[
 ["ABC transporter",`The ATP-binding cassette family of membrane proteins. CFTR belongs to it but works as an anion channel rather than a pump [[Csanady2019]].`,"cftr"],
 ["ABPA (allergic bronchopulmonary aspergillosis)",`An allergic reaction to Aspergillus in the airways. Pooled prevalence in CF 8.9%, with Aspergillus sensitisation in 39.1% [[Maturu2015]]; a CF Foundation conference set its diagnostic criteria [[Stevens2003]].`,"lungs"],
 ["Adherence",`How much of a prescribed treatment is actually taken. For nebulisers, device downloads showed 36% against 80% by self-report [[Daniels2011Adherence]]; mean adherence to pulmonary medicines was 48% in US claims data [[Quittner2014Adherence]].`,"living"],
 ["Advanced CF liver disease (aCFLD)",`Nodular liver, advanced fibrosis, multilobular cirrhosis or non-cirrhotic portal hypertension, as defined by the CF Foundation 2024 guideline [[Sellers2024]].`,"digestive"],
 ["Airway clearance techniques (ACTs)",`Methods for moving mucus out of the lungs, such as PEP, oscillating devices, the vest and postural drainage. Recommended regularly for everyone; no technique has been shown superior [[Flume2009ACT,Wilson2019ACT]].`,"clearance"],
 ["Airway surface liquid (ASL)",`The thin liquid lining the airways: a mucus layer on top of the periciliary layer, kept at about 7 µm by ion transport [[Tarran2001JGP]].`,"cftr"],
 ["Alyftrek (vanzacaftor–tezacaftor–deutivacaftor)",`A once-daily triple modulator approved on 20 December 2024 for ages 6 and older, with a boxed liver warning [[FDA-Alyftrek]]. Non-inferior to ETI for ppFEV1 in SKYLINE [[Keating2025SKYLINE]].`,"trials"],
 ["Amiloride",`A blocker of the epithelial sodium channel (ENaC). It abolishes the benefit of hypertonic saline [[Donaldson2006]], and the nasal potential difference in CF shows a large amiloride response [[Knowles1981]].`,"cftr"],
 ["Aminoglycosides",`Antibiotics such as tobramycin and amikacin. Once-daily IV dosing works as well as thrice daily, with less kidney toxicity in children [[Smyth2005TOPIC,Bhatt2019Cochrane]]; repeated courses can harm hearing [[AlMalky2015]].`,"infection"],
 ["Annual review",`A yearly assessment including at minimum a full medical, dietetic, physiotherapy and psychosocial review and surveillance blood tests (ECFS) [[Conway2014ECFS]].`,"nursing"],
 ["AREST CF",`An Australian study following infants diagnosed by screening with CT and lavage; bronchiectasis rose from 29.3% at 3 months to 61.5% at 3 years [[Sly2013]].`,"lungs"],
 ["Arthropathy",`Joint disease linked to CF: 4.9% in the German registry, 8.4% of adults and 0.7% of under-18s [[Grehn2021]].`,"organs"],
 ["Ataluren",`A read-through drug meant to let ribosomes skip premature stop codons. It failed two phase 3 trials in nonsense-variant CF [[Kerem2014Ataluren,Konstan2020ACTCF]].`,"frontier"],
 ["Autosomal recessive",`Inheritance that needs a disease-causing variant on both copies of a gene. Two carrier parents have a 25% chance of an affected child in each pregnancy [[Deignan2020ACMG]].`,"gene"],
 ["Azithromycin",`A macrolide antibiotic used 3 days a week for its anti-inflammatory effect; HR for exacerbation 0.65 in Saiman 2003 [[Saiman2003Azithro]]. NTM must be considered before starting [[Floto2016NTM]].`,"clearance"],
 ["Aztreonam lysine (Cayston)",`An inhaled antibiotic for P. aeruginosa, labelled three times daily for a 28-day course followed by 28 days off [[FDA-Cayston]]; it improved CFQ-R respiratory score by 9.7 points in AIR-CF1 [[RetschBogart2009AZLI]].`,"infection"],
 ["Base editing",`A gene-editing method that changes a single DNA letter without cutting both strands. About 20% of people in an organoid biobank had variants it could in theory correct (Early evidence) [[Geurts2020ABE]].`,"frontier"],
 ["Bicarbonate (HCO₃⁻)",`An anion CFTR carries about one-quarter as well as chloride [[Poulsen1994]]. Variants linked to pancreatic insufficiency did not support bicarbonate transport [[Choi2001Nature]].`,"cftr"],
 ["Biofilm",`A community of bacteria living in a slime matrix. Sputum signals in CF match P. aeruginosa grown as biofilm, which helps explain why infection persists [[Singh2000]].`,"lungs"],
 ["BMI goals",`CF Foundation targets: BMI at or above the 50th percentile for ages 2–20; at least 22 kg/m² for women and 23 for men [[Moran2010CFRD,Stallings2008]].`,"nutrition"],
 ["Bronchiectasis",`Permanent widening of the airways from infection and inflammation. In CF it can be seen in infants as young as 10 weeks [[Sly2013]].`,"lungs"],
 ["Burkholderia cepacia complex",`A group of bacteria that can spread between people with CF. B. cenocepacia is linked to worse survival and higher post-transplant mortality [[Jones2004,Aris2001Bcc]].`,"infection"],
 ["Carrier",`Someone with one disease-causing CFTR variant and one working copy, expected to be asymptomatic [[Deignan2020ACMG]].`,"gene"],
 ["Carrier screening",`Testing to find carriers before or during pregnancy. ACMG 2021 recommends Tier 3 screening, which includes CFTR, for all pregnant patients and those planning pregnancy [[Gregg2021ACMG]]; anyone may decline [[ACOG2017CO691]].`,"variants"],
 ["Cataracts",`Clouding of the lens. Labels of ivacaftor-containing drugs recommend eye examinations at baseline and follow-up in children [[FDA-Trikafta]].`,"modulators"],
 ["CBAVD",`Congenital bilateral absence of the vas deferens: the cause of infertility in about 97–98% of men with CF [[Kaltsas2025]]. It is also a CFTR-related disorder in men without CF [[Bombieri2011]].`,"organs"],
 ["Cepacia syndrome",`A rapid, often fatal decline with Burkholderia infection; deaths occurred with both B. cenocepacia and B. multivorans [[Jones2004]].`,"lungs"],
 ["CF liver disease (CFLD)",`Liver involvement in CF. About 5–10% develop multilobular cirrhosis, usually in the first decade [[Debray2011]]; routine ursodeoxycholic acid is not recommended to prevent advanced disease [[Sellers2024]].`,"digestive"],
 ["CF nurse specialist",`A core member of the CF team who teaches, advocates and supports at key moments: diagnosis, first IV course, transition, pregnancy, transplant and end of life [[Conway2014ECFS]].`,"nursing"],
 ["CF-related diabetes (CFRD)",`A distinct type of diabetes, different from type 1 and type 2 [[Kelly2013]]. It affects about 2% of children, 19% of adolescents and 40–50% of adults [[Moran2009Trends]]; insulin is the recommended treatment [[Moran2010CFRD]].`,"organs"],
 ["CFQ-R",`The Cystic Fibrosis Questionnaire–Revised, a quality-of-life measure [[Quittner2005CFQ]]. Its respiratory MCID is 4 points in stable disease [[Quittner2009MCID]].`,"living"],
 ["CFTR",`Cystic fibrosis transmembrane conductance regulator: the gene on chromosome 7 and the anion channel it encodes [[Deignan2020ACMG,LopesPacheco2019]].`,"cftr"],
 ["CFTR2",`A project collecting genotype and phenotype data to classify CFTR variants as CF-causing, varying clinical consequence or non-CF-causing [[Sosnay2013CFTR2,Deignan2020ACMG]].`,"variants"],
 ["CFTR-related disorder (CFTR-RD)",`CFTR dysfunction that does not meet CF criteria: CBAVD, pancreatitis or disseminated bronchiectasis [[Bombieri2011]].`,"variants"],
 ["Chloride (Cl⁻)",`The main anion CFTR conducts. Changing pore residues changed its selectivity, which proved CFTR is itself the channel [[Anderson1991]].`,"cftr"],
 ["Chronic rhinosinusitis",`Long-lasting inflammation of the sinuses, highly prevalent in CF [[Hamilos2016]]. Nasal polyps were seen in 37% of adults on endoscopy [[Hadfield2000]].`,"lungs"],
 ["Colonoscopy screening",`CF Foundation 2018: colonoscopy from age 40, or from 30 within 2 years of transplant [[Hadjiliadis2018]].`,"digestive"],
 ["Constipation",`Gradual faecal impaction of the whole colon [[Houwen2010]]; it affects 26–47% of children with CF over their lifetime [[vanderDoef2011]].`,"digestive"],
 ["Contact precautions",`Gown and gloves for staff with all people with CF, in clinic and hospital, as published in the 2013 guideline [[Saiman2014IPC]].`,"nursing"],
 ["Corrector",`A modulator that helps CFTR fold and traffic to the cell surface, such as lumacaftor, tezacaftor and elexacaftor [[Fiedorczuk2022Cell,FDA-Trikafta]].`,"modulators"],
 ["CRMS/CFSPID",`CFTR-related metabolic syndrome / CF screen positive, inconclusive diagnosis: a positive newborn screen with inconclusive sweat and genetic tests. Most children stay well [[Ren2017CRMS,Barben2021]].`,"screening"],
 ["Cross-infection",`Spread of germs between people with CF. The guideline asks for at least 6 feet (2 m) between them in all settings [[Saiman2014IPC]].`,"living"],
 ["CYP3A",`Liver enzymes that break down all three ETI components; strong inducers such as rifampin cut ivacaftor exposure by 89% [[FDA-Trikafta]].`,"modulators"],
 ["Deutivacaftor",`A once-daily potentiator, the third component of Alyftrek [[FDA-Alyftrek]].`,"trials"],
 ["DIOS",`Distal intestinal obstruction syndrome: an acute complete or incomplete faecal obstruction in the ileocaecum [[Houwen2010]]. Lifetime prevalence about 8% in children and 16% in adults [[vanderDoef2011]].`,"digestive"],
 ["Dornase alfa (rhDNase)",`An inhaled enzyme that cleaves extracellular DNA in sputum. Once-daily use cut exacerbations by 28% [[Fuchs1994Dornase]]; the label dose is 2.5 mg once daily [[FDA-Pulmozyme]].`,"clearance"],
 ["Elexacaftor",`A next-generation corrector with co-potentiator activity, the "E" in ETI [[Fiedorczuk2022Science,Veit2021ELX]].`,"modulators"],
 ["ENaC",`The epithelial sodium channel. βENaC-overexpressing mice develop CF-like lung disease [[Mall2004]], but newborn CF pigs showed no extra sodium absorption [[Chen2010Cell]]; the debate is open.`,"cftr"],
 ["Enteral tube feeding",`Feeding through a tube into the gut, recommended after oral supplements when growth stays impaired [[Turck2016Nutrition,Schwarzenberg2016Tube]].`,"nutrition"],
 ["ETI (elexacaftor–tezacaftor–ivacaftor, Trikafta)",`The triple modulator first approved on 21 October 2019 [[FDA2026Approvals]]. In F508del/minimal function, ppFEV1 rose 14.3 points against placebo [[Middleton2019ETI]].`,"trials"],
 ["Exacerbation (pulmonary)",`A flare of lung symptoms, often treated with antibiotics. About 1 in 4 IV-treated exacerbations ends without recovery to baseline FEV1 [[Sanders2010]].`,"lungs"],
 ["F508del",`The commonest CF variant: a 3-bp deletion that removes phenylalanine 508 in NBD1, on about 70% of CF alleles [[Kerem1989,Morral1994]].`,"variants"],
 ["Faecal elastase-1",`A stool test of pancreatic function: below 200 µg/g supports insufficiency, below 100 µg/g is severe [[Borowitz2009,Green2026PROMISEPeds]].`,"digestive"],
 ["Fat-soluble vitamins",`Vitamins A, D, E and K, poorly absorbed with pancreatic insufficiency; CF-specific multivitamins start soon after diagnosis, with levels checked yearly [[Borowitz2009]].`,"nutrition"],
 ["FEV1 (ppFEV1)",`Forced expiratory volume in 1 second, usually as percent predicted (ppFEV1): the established marker of CF lung disease and the key trial endpoint [[Szczesniak2017]].`,"monitoring"],
 ["Fibrosing colonopathy",`Scarring and narrowing of the colon linked to very high enzyme doses (above 50,000 lipase units/kg/day, RR 199.5) [[FitzSimmons1997]].`,"nutrition"],
 ["Founder effect",`A variant common in one population because it traces back to a shared ancestor, such as W1282X in Ashkenazi Jewish people [[Shoshani1992]] or CFTRdele2,3 in Slavic populations [[Dork2000]].`,"variants"],
 ["FRT assay",`A test in Fischer rat thyroid cells. A rise in chloride transport of at least 10% of normal makes a variant "responsive" on the labels [[FDA-Kalydeco]].`,"trials"],
 ["Gating",`The opening and closing of the CFTR pore. Class III variants such as G551D reach the membrane but do not open properly [[Bell2020Commission]].`,"variants"],
 ["Gene therapy",`Delivering a working CFTR gene to airway cells. A non-viral nebulised product gave a 3.7% relative ppFEV1 benefit (Early evidence) [[Alton2015pGM169]]; AAV products are in early trials [[NCT05248230]].`,"frontier"],
 ["Genetic counselling",`Advice on inheritance and options. ACOG says it should be offered when both partners are carriers [[ACOG2017CO691]].`,"pregnancy"],
 ["Gestational diabetes",`Diabetes first found in pregnancy: 10–36% of pregnancies in women with CF [[Montemayor2022Pregnancy]]. OGTT at 12–16 and 24–28 weeks is recommended [[Moran2010CFRD]].`,"pregnancy"],
 ["GLI equations",`Global Lung Function Initiative reference equations for spirometry [[Quanjer2012]]. The ATS now recommends the race-neutral GLI Global [[Bhakta2023]].`,"monitoring"],
 ["Haemoptysis",`Coughing up blood. Massive haemoptysis affects about 0.87% of people with CF each year [[Flume2005Hemoptysis]].`,"transplant"],
 ["Hand hygiene",`The single most important infection-control practice, before and after all patient contact [[Haggie2020,Saiman2014IPC]].`,"nursing"],
 ["Heterozygote advantage",`The idea that carriers once survived infections better (cholera, typhoid, tuberculosis). It remains unproven (Hypothesis) [[Farrell2018Age,Poolman2007]].`,"history"],
 ["HGVS nomenclature",`The standard way to name variants, using cDNA numbering: F508del is c.1521_1523delCTT (p.Phe508del) [[denDunnen2016,Deignan2020ACMG]].`,"variants"],
 ["Hypertonic saline",`Inhaled 7% salt water that rehydrates the airway surface osmotically [[Donaldson2006]]. It cut exacerbations by 56% from age 6 [[Elkins2006HS]].`,"clearance"],
 ["Ibuprofen (high-dose)",`An anti-inflammatory that slowed FEV1 decline in a 4-year trial (−2.17% versus −3.60% a year) [[Konstan1995Ibuprofen]].`,"clearance"],
 ["ICSI",`Intracytoplasmic sperm injection: with sperm retrieval it lets most men with CF become biological fathers [[Kazmerski2022Family]].`,"pregnancy"],
 ["Infection prevention and control (IP&C)",`The CF Foundation 2013 guideline: masks in healthcare settings, contact precautions, single rooms and the 6-foot rule, applied to everyone with CF [[Saiman2014IPC]].`,"nursing"],
 ["Intermediate sweat chloride",`30–59 mmol/L since 2017; CFTR testing then continues [[Farrell2017Dx,Sosnay2017Nonscreened]].`,"sweattest"],
 ["Intestinal current measurement (ICM)",`A test of CFTR function on rectal biopsies, used when the diagnosis is unclear [[Derichs2010]].`,"sweattest"],
 ["IPOS",`The Integrated Palliative Care Outcome Scale, recommended yearly from age 12 to screen for unmet palliative-care needs [[Kavalieratos2021Palliative]].`,"transplant"],
 ["IRT (immunoreactive trypsinogen)",`A pancreatic protein measured on the newborn blood spot. High in CF but not specific [[McGarry2025NBS]]; first used for screening in 1979 [[Crossley1979]].`,"screening"],
 ["Ivacaftor (Kalydeco)",`The first potentiator; it raises CFTR open probability [[FDA-Kalydeco,VanGoor2009VX770]]. Labelled from age 1 month for responsive variants [[FDA-Kalydeco]].`,"modulators"],
 ["Kidney stones",`More common in CF; one US adult cohort found a lifetime prevalence of 32% [[Ryoo2026]].`,"organs"],
 ["Leeds criteria",`Chronic P. aeruginosa means more than 50% of the previous 12 months' cultures positive [[Lee2003]].`,"lungs"],
 ["Lumacaftor",`A type I corrector, combined with ivacaftor as Orkambi for F508del homozygotes [[VanGoor2011VX809,FDA-Orkambi]].`,"modulators"],
 ["Lung clearance index (LCI)",`A multiple-breath washout measure of uneven ventilation that detects early disease when FEV1 is normal [[Aurora2011,Robinson2013]].`,"monitoring"],
 ["Lung transplant",`Replacement of both lungs for advanced disease. Median survival after transplant for adults with CF is 9.5 years (ISHLT) [[Ramos2019Referral]].`,"transplant"],
 ["Macroduct",`A coil device for collecting sweat; at least 15 µL is needed [[Farrell2008Dx]].`,"sweattest"],
 ["Mannitol (inhaled)",`A dry-powder osmotic agent that raised FEV1 by about 93 mL over control [[Bilton2011Mannitol]].`,"clearance"],
 ["Meconium ileus",`Bowel blockage at birth by thick meconium, in about 1 in 5 newborns with CF [[Sathe2017MI,vanderDoef2011]].`,"digestive"],
 ["Minimal function",`Genotype group with little or no CFTR function (classes I and II) [[LopesPacheco2019]].`,"variants"],
 ["Modifier genes",`Genes other than CFTR that shape disease; five lung-disease loci were found in 6,365 people [[Corvol2015]].`,"variants"],
 ["MRSA",`Methicillin-resistant Staphylococcus aureus, rising from 0.1% to 17.2% of US people with CF between 1995 and 2005 [[Razvi2009]], with higher mortality (aHR 1.27) [[Dasenbrook2010]].`,"infection"],
 ["mRNA therapy",`Delivering CFTR instructions as mRNA. Inhaled MRT5005 left FEV1 stable but showed no benefit (Early evidence) [[Rowe2023MRT5005]].`,"frontier"],
 ["Mucins",`The gel-forming proteins of mucus. CF sputum mucins are hyperconcentrated, with high osmotic pressure [[Henderson2014]].`,"cftr"],
 ["Mucociliary clearance",`Cilia sweeping mucus out of the airways; it fails when the periciliary layer collapses [[Matsui1998,Button2012]].`,"cftr"],
 ["Mucoid P. aeruginosa",`The slimy, alginate-making form of Pseudomonas, acquired at a median age of 13 in one cohort [[Li2005]].`,"lungs"],
 ["Multidisciplinary team (MDT)",`Consultants, nurse specialist, microbiologist, physiotherapist, dietitian, pharmacist, psychologist, social worker and geneticist (ECFS) [[Conway2014ECFS]].`,"nursing"],
 ["Mycobacterium abscessus",`A fast-growing NTM that can pass between people with CF, shown by whole-genome sequencing [[Bryant2013Lancet,Bryant2016]].`,"infection"],
 ["Nasal potential difference (NPD)",`A voltage measured on the nasal lining; in CF a high baseline, a large amiloride response and little chloride response [[Knowles1981,Farrell2008Dx]].`,"sweattest"],
 ["Neuropsychiatric events",`A modulator label warning for anxiety, depression, suicidal thoughts and sleep problems, which may begin within the first 3 months [[FDA-Trikafta]].`,"living"],
 ["Neutrophil elastase",`An enzyme released by neutrophils; in infant BAL it predicted bronchiectasis (OR 3.02) [[Sly2013]].`,"lungs"],
 ["Newborn screening",`Testing every baby's heel-prick blood spot; universal in the UK since 2007 and the US since 2010 [[Schluter2020,McGarry2025NBS]].`,"screening"],
 ["Nonsense variant",`A change creating a premature stop codon, so no full protein is made (class I). About 10% of people with CF carry one [[LopesPacheco2019,Kerem2014Ataluren]].`,"variants"],
 ["NTM (nontuberculous mycobacteria)",`Environmental mycobacteria found in about 13% of people with CF aged 10 or older [[Olivier2003]]; annual cultures are advised in people who expectorate [[Floto2016NTM]].`,"infection"],
 ["Nucleotide-binding domains (NBD1, NBD2)",`The two parts of CFTR that bind ATP and drive gating; F508 sits in NBD1 [[Csanady2019,Riordan1989]].`,"cftr"],
 ["OGTT",`Oral glucose tolerance test: a 2-hour 75-g test, yearly from age 10 to screen for CFRD [[Moran2010CFRD]].`,"organs"],
 ["Organoids",`Mini-guts grown from rectal biopsies; forskolin-induced swelling measures CFTR function and drug response (Early evidence) [[Dekkers2013FIS,Dekkers2016Organoids]].`,"frontier"],
 ["Osteoporosis",`Low bone density; pooled prevalence 23.5% in adults with CF [[Paccou2010]].`,"organs"],
 ["Palliative care",`Care for comfort and quality of life, recommended from diagnosis throughout the disease course [[Kavalieratos2021Palliative]].`,"transplant"],
 ["Pancreatic insufficiency (PI)",`Too few digestive enzymes reach the gut; about 85% of people with CF [[Singh2017PI]].`,"digestive"],
 ["Pancreatic sufficiency (PS)",`Enough pancreatic function to digest food without enzymes; linked to one or two mild alleles such as R117H [[Kristidis1992]].`,"digestive"],
 ["Pancreatitis",`Inflammation of the pancreas, seen in pancreatic-sufficient people with CF (22% in one study) [[Ooi2011Pancreatitis]].`,"digestive"],
 ["PEP (positive expiratory pressure)",`Breathing out against resistance to move mucus; PEP mask beat the vest on exacerbations in a 1-year trial [[McIlwaine2013HFCWO]].`,"clearance"],
 ["PERT",`Pancreatic enzyme replacement therapy, taken with meals; the Creon label sets a ceiling of 2,500 lipase units/kg/meal [[FDA-Creon]].`,"nutrition"],
 ["Periciliary layer (PCL)",`The liquid layer around the cilia, about 7 µm deep, that lets them beat [[Tarran2001JGP]].`,"cftr"],
 ["PHQ-9 and GAD-7",`Questionnaires for depression and anxiety, recommended yearly from age 12 [[Quittner2016ICMH]].`,"living"],
 ["Pilocarpine iontophoresis",`Using a small current to drive pilocarpine into the skin to make it sweat for the test, standardised in 1959 [[Gibson1959]].`,"sweattest"],
 ["Pneumothorax",`Collapsed lung from air leaking into the chest, in about 0.64% of people with CF each year [[Flume2005Pneumothorax]].`,"transplant"],
 ["PolyT/TG tract (5T)",`Repeats in intron 9 that change CFTR splicing. 5T with 12 or 13 TG repeats carries more risk than with 11 [[Groman2004,Deignan2020ACMG]].`,"variants"],
 ["Potentiator",`A modulator that raises the open probability of CFTR already at the cell surface, such as ivacaftor [[FDA-Kalydeco]].`,"modulators"],
 ["Prime editing",`A precise gene-editing method that corrected F508del in patient airway cells in the laboratory (Early evidence) [[Sousa2025Prime]].`,"frontier"],
 ["PROMISE",`A US study of 487 people starting ETI: ppFEV1 +9.76 points and sweat chloride −41.7 mmol/L at 6 months [[Nichols2022PROMISE]].`,"trials"],
 ["Pseudo-Bartter syndrome",`Hypochloraemic, hypokalaemic metabolic alkalosis from sweat salt loss [[Mantoo2020]].`,"organs"],
 ["Pseudomonas aeruginosa",`The classic CF airway bacterium; in young children a positive culture carried 2.6 times the 8-year risk of death [[Emerson2002]].`,"lungs"],
 ["Pulmonary ionocyte",`A rare FOXI1-positive airway cell that makes most of the airway's CFTR transcripts [[Montoro2018,Plasschaert2018]].`,"cftr"],
 ["R domain",`The regulatory domain of CFTR. PKA phosphorylation of it is needed before the channel can open [[Csanady2019,Cheng1991]].`,"cftr"],
 ["Read-through",`A drug approach to skip premature stop codons; ataluren failed and ELX-02 has no posted results (Hypothesis) [[Kerem2014Ataluren,NCT04135495]].`,"frontier"],
 ["Residual function",`Genotype group keeping some CFTR function (classes IV, V, VI) [[LopesPacheco2019]].`,"variants"],
 ["Salt supplementation",`Infants with CF need extra salt: the CF Foundation infant guideline recommends 1/8 teaspoon a day from diagnosis, 1/4 from 6 months, as published [[Borowitz2009]].`,"nutrition"],
 ["SIMPLIFY",`Trials in which people on ETI with good lung function stopped hypertonic saline or dornase for 6 weeks without losing ppFEV1 [[MayerHamblett2023SIMPLIFY]].`,"clearance"],
 ["SKYLINE",`Two phase 3 trials showing once-daily VTD non-inferior to ETI for ppFEV1 [[Keating2025SKYLINE]].`,"trials"],
 ["Staphylococcus aureus",`Often the first CF airway pathogen in childhood; MSSA prevalence rose from 37.0% to 52.4% (1995–2005) [[Razvi2009]].`,"lungs"],
 ["STRIVE",`The pivotal ivacaftor trial in G551D: ppFEV1 +10.6 points, sweat chloride −48.1 mmol/L [[Ramsey2011STRIVE]].`,"trials"],
 ["Sweat chloride test",`The diagnostic test for CF: 60 mmol/L or more is diagnostic [[Farrell2017Dx]].`,"sweattest"],
 ["Sweat duct",`The tube that carries sweat to the skin and normally takes salt back; in CF it cannot [[Quinton1983]].`,"cftr"],
 ["Tezacaftor",`A type I corrector; with ivacaftor (Symdeko) it raised ppFEV1 by 4.0 points in EVOLVE [[TaylorCousar2017EVOLVE,FDA-Symdeko]].`,"modulators"],
 ["Theratype",`A grouping of variants by the molecular treatment they respond to [[Cutting2015]].`,"variants"],
 ["TIDES",`An international study of 6,088 people with CF and 4,102 parents: depression in 19% of adults, anxiety in 32% [[Quittner2014TIDES]].`,"living"],
 ["Tobramycin (inhaled)",`An antibiotic for P. aeruginosa: 28 days for first infection [[Mogayzel2014Pa]]; TOBI labelled 28 days on, 28 days off [[FDA-TOBI]].`,"infection"],
 ["Totally implantable venous access device (port)",`A device under the skin for repeated IV courses; median device survival 1,441 days in one CF series [[Royle2008]].`,"nursing"],
 ["Transition",`The planned move from paediatric to adult care; gaps over 3 months predicted lower lung function [[Melton2024Transition]].`,"living"],
 ["Treatment burden",`The daily load of CF care: a mean of 108 minutes a day for adults before modulators [[Sawicki2009]].`,"living"],
 ["Ursodeoxycholic acid (UDCA)",`A bile acid once used for CF liver disease; evidence is insufficient for routine use [[Cheng2017]], and CF Foundation 2024 recommends against it to prevent advanced disease [[Sellers2024]].`,"digestive"],
 ["Variant classes",`Six classes by molecular defect: I no protein, II misfolding, III gating, IV conductance, V reduced amount, VI instability [[Bell2020Commission,LopesPacheco2019]].`,"variants"],
 ["Very high IRT (failsafe)",`Referral of infants with IRT above about the 99th percentile even when no variant is found, to catch variants a panel misses [[McGarry2025NBS]].`,"screening"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'f508 del' or 'f508del' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  function render(){const q=norm(inp.value.trim());const L=CFGL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:CFGL_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const CFSR_AREAN={A:'Epidemiology, survival, presentation & history',B:'CFTR gene, inheritance, variant classes & genotype',C:'CFTR physiology and the lungs',D:'Digestive system, other organs & nutrition',E:'Newborn screening, diagnosis & monitoring',F:'CFTR modulators & the research frontier',G:'Airway clearance, infection & transplant',H:'Living with CF, fertility, pregnancy & nursing care'};
const CFSR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const cfsrSvc=s=>s.unverified?[]:CFSR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const cfsrLink=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(CFSR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(used.map(a=>[a,CFSR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>cfsrSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=CFSR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=cfsrSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=cfsrLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${CFSR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
