
/* =============== 6.2 flashcards & mnemonics =============== */
const PARTN={1:"Part 1 · The disease",2:"Part 2 · Treating a flare",3:"Part 3 · Lowering urate",4:"Part 4 · Diagnosis & complications",5:"Part 5 · Living, care & the future",6:"Part 6 · History"};
const FC=[
 [1,"How many people had gout worldwide in 2020 (GBD modelled estimate)?","55.8 million, an age-standardised 659.3 per 100,000. The projection for 2050 is 95.8 million."],
 [1,"How common are gout and hyperuricaemia in US adults (NHANES 2015–2016)?","Gout 3.9% (about 9.2 million). Hyperuricaemia about 20% in both men and women."],
 [1,"At what serum urate is plasma saturated?","About 6.8 mg/dL (405 µmol/L) at 37 °C and physiological sodium."],
 [1,"What does a 2 °C drop (37 → 35 °C) do to urate solubility?","It falls from 6.8 to 6.0 mg/dL (in vitro). One reason the cool first MTP is a common first site."],
 [1,"Why do humans carry more urate than most mammals?","Hominoids lost uricase. A nonsense mutation at codon 33 silenced it in human, chimpanzee and orangutan, so urate (not allantoin) is the end product."],
 [1,"Which enzyme makes urate, and at which steps?","Xanthine oxidoreductase: hypoxanthine → xanthine → uric acid. It is the rate-limiting enzyme."],
 [1,"How is urate excretion split between kidney and gut?","About two thirds kidney, one third gut (radio-isotope studies)."],
 [1,"URAT1, GLUT9, ABCG2: what does each do?","URAT1 (SLC22A12): apical reabsorption, the uricosuric target. GLUT9 (SLC2A9): basolateral exit. ABCG2: secretory exporter in kidney and gut."],
 [1,"What does ABCG2 Q141K (rs2231142) do?","Cuts urate transport by 53%; gout OR 1.68 per allele; at least 10% of gout in white people."],
 [1,"What is the main mechanism of primary hyperuricaemia in gout?","Renal under-excretion of urate."],
 [1,"15-year gout incidence by baseline serum urate?","1.1% below 6 mg/dL; 49% at 10 mg/dL or more (18,889 people, four US cohorts)."],
 [1,"Name the four stages of gout (Dalbeth & Stamp 2014).","A: hyperuricaemia, no crystals. B: silent crystal deposition. C: deposition with prior or current flares. D: advanced gout (tophi, chronic arthritis, erosions)."],
 [1,"What signalling chain turns crystals into a flare?","MSU crystals → NLRP3 (NALP3) inflammasome → caspase-1 → active IL-1β (and IL-18) → neutrophil influx."],
 [1,"What helps a flare burn out on its own?","Aggregated neutrophil extracellular traps (NETs) degrade cytokines and chemokines; TGF-β1 rises as the flare resolves."],
 [2,"What is the US-labelled colchicine dose for a flare?","1.2 mg at the first sign, then 0.6 mg 1 hour later. Maximum 1.8 mg over 1 hour."],
 [2,"AGREE: responders at 24 h on low dose, high dose and placebo?","37.8% (1.8 mg), 32.7% (4.8 mg), 15.5% placebo."],
 [2,"AGREE: diarrhoea on low vs high dose colchicine?","23.0% vs 76.9% (severe in 19.2% on high dose, none on low dose)."],
 [2,"Why does the old high-dose colchicine regimen add little?","Peak plasma level barely changes: 6.2 ng/mL (1.8 mg) vs 6.8 ng/mL (4.8 mg)."],
 [2,"What is colchicine's primary mechanism?","It blocks tubulin polymerisation into microtubules, which dampens NLRP3 assembly and neutrophil migration."],
 [2,"Why might colchicine concentrate in neutrophils?","Granulocytes show no P-glycoprotein pump function, so the drug may be trapped (hypothesis). Leukocyte levels peak about 47 h after plasma."],
 [2,"First-line flare treatments in ACR 2020?","Colchicine, an NSAID or a glucocorticoid (oral, intra-articular or intramuscular). None is ranked above another."],
 [2,"CONTACT: naproxen vs low-dose colchicine?","No meaningful difference in pain over 7 days. Diarrhoea 45.9% on colchicine vs 20.0% on naproxen."],
 [2,"How is canakinumab given for gout flares in the US?","150 mg subcutaneously, with at least 12 weeks before re-treatment. Approved 25 August 2023."],
 [2,"Which antibiotic is the classic fatal colchicine interaction?","Clarithromycin (strong CYP3A4 and P-gp inhibitor). In 88 inpatients given both together, 10.2% died."],
 [2,"Should urate-lowering therapy be stopped during a flare?","No. Keep it going and treat the flare."],
 [3,"ACR 2020 strong indications for urate-lowering therapy?","≥1 subcutaneous tophus, radiographic damage from gout, or frequent flares (≥2 a year)."],
 [3,"What is the serum urate target?","Below 6 mg/dL (360 µmol/L) for everyone on ULT (ACR 2020). EULAR: below 5 mg/dL (300 µmol/L) in severe gout."],
 [3,"ACR 2020 starting doses for allopurinol and febuxostat?","Allopurinol ≤100 mg/day (lower in CKD stage ≥3, e.g. ≤50 mg/day). Febuxostat ≤40 mg/day."],
 [3,"What is allopurinol's active metabolite, and how is it cleared?","Oxypurinol (half-life about 23 h), cleared almost entirely by the kidney."],
 [3,"How long does ACR 2020 advise flare prophylaxis when starting ULT?","3–6 months rather than less than 3, continued if flares persist."],
 [3,"Why do flares rise in the first months of ULT?","Urate is mobilised from tissue deposits as crystals dissolve. It does not mean the drug is failing."],
 [3,"Who should be tested for HLA-B*58:01 before allopurinol (ACR 2020)?","People of Southeast Asian descent (e.g. Han Chinese, Korean, Thai) and African American people."],
 [3,"When does allopurinol hypersensitivity syndrome usually start?","About 90% begin within 60 days of starting allopurinol."],
 [3,"CARES (febuxostat vs allopurinol, people with CVD): result?","MACE non-inferior (HR 1.03), but CV death HR 1.34 and all-cause death HR 1.22. FDA boxed warning in 2019."],
 [3,"FAST (febuxostat vs allopurinol): result?","Non-inferior, adjusted HR 0.85. Deaths 7.2% on febuxostat vs 8.6% on allopurinol."],
 [3,"Azathioprine or mercaptopurine with xanthine oxidase inhibitors?","Febuxostat: contraindicated (US). Allopurinol: cut the thiopurine to about one-third to one-quarter of the usual dose."],
 [3,"How does pegloticase lower urate, and how is it given?","PEGylated recombinant uricase: urate → allantoin. 8 mg IV every 2 weeks with oral methotrexate 15 mg weekly (US label)."],
 [3,"What is the pegloticase stopping rule?","Check serum urate before every infusion; stop if it rises above 6 mg/dL, particularly 2 consecutive values."],
 [3,"Nurse-led treat-to-target (Doherty 2018) at 2 years?","Serum urate <360 µmol/L in 95% vs 30% with usual care; £5066 per QALY."],
 [4,"2015 ACR/EULAR criteria: entry, sufficient criterion, threshold?","Entry: ≥1 episode of peripheral joint or bursa swelling, pain or tenderness. Sufficient: MSU crystals. Otherwise ≥8 of 23 points."],
 [4,"Which two items subtract points in the 2015 criteria?","Serum urate <4 mg/dL (−4) and MSU-negative synovial fluid (−2)."],
 [4,"How well do the 2015 criteria perform?","Full criteria: sensitivity 92%, specificity 89% (AUC 0.95). Clinical-only: 85% and 78%."],
 [4,"What do MSU crystals look like under compensated polarised light?","Needle-shaped, strongly negatively birefringent; yellow when parallel to the slow axis of the compensator."],
 [4,"What do CPP crystals look like?","Rhomboid or rod-like, weakly positively birefringent; blue when parallel."],
 [4,"What is the ultrasound double-contour sign?","Hyperechoic, irregular enhancement over the surface of hyaline cartilage that does not depend on the probe angle."],
 [4,"Can serum urate be normal during a flare?","Yes. It was normal in 49% (20 of 41) in one series; 14% had ≤6 mg/dL in another."],
 [4,"Does finding crystals rule out septic arthritis?","No. 1.5–5% of crystal-positive joints are also infected."],
 [4,"Common comorbidities in US adults with gout (NHANES 2007–2008)?","Hypertension 74%, CKD stage ≥2 71%, obesity 53%, diabetes 26%, kidney stones 24%, MI 14%."],
 [4,"Did allopurinol slow kidney decline in CKD-FIX or PERL?","No. Neither trial (people without gout) found a slower fall in kidney function."],
 [4,"How does a gout flare change short-term cardiovascular risk?","Odds of a flare in the prior 0–60 days were higher before MI or stroke (OR 1.93), back to baseline by 121–180 days."],
 [4,"Which antihypertensives raise or lower gout risk?","Lower: losartan (RR 0.81), calcium channel blockers (0.87). Raise: diuretics (2.36), β-blockers, ACE inhibitors, other ARBs."],
 [5,"ACR 2020 lifestyle advice for gout?","All conditional: limit alcohol, purines and high-fructose corn syrup; weight loss if overweight; no vitamin C supplements."],
 [5,"Beer, spirits, wine: incident gout per daily serving (men)?","Beer RR 1.49, spirits 1.15, wine 1.04 (not significant)."],
 [5,"Should low-dose aspirin be stopped because of gout?","No. ACR 2020 advises against stopping it when taken for a valid reason."],
 [5,"How much does a hospital stay raise flare risk?","About tenfold (RR 10.2)."],
 [5,"The validated flare definition for people with known gout?","≥3 of 4: patient says flare; pain at rest >3/10; ≥1 swollen joint; ≥1 warm joint."],
 [5,"How many people take ≥80% of their urate-lowering therapy?","46% (meta-analysis of 13 studies)."],
 [5,"G-CAN clinical remission?","12 months with no flares, no subcutaneous tophi and serum urate <6 mg/dL (0.36 mmol/L)."],
 [5,"How long did crystals take to clear from joint fluid on urate lowering?","3 to 33 months in all 18 joints; longer with longer disease."],
 [5,"Which treatment routes actually remove urate?","Production (xanthine oxidase), excretion (URAT1) and breakdown (uricase). IL-1 and NLRP3 blockade only calm inflammation."],
 [6,"Where does the word 'gout' come from?","Latin gutta, a drop: the medieval idea of a humour dropping into a joint."],
 [6,"Who described the night-time great-toe flare in 1683?","Thomas Sydenham, in Tractatus de Podagra et Hydrope."],
 [6,"Who first saw needle-shaped crystals from a tophus, and when?","Antonie van Leeuwenhoek, 1679."],
 [6,"What did Alfred Baring Garrod show?","Raised uric acid in the blood of people with gout (1848), using his 'thread test'."],
 [6,"Who identified MSU crystals in gouty synovial fluid with polarised light?","McCarty and Hollander, 1961."],
 [6,"Who developed allopurinol?","Hitchings and Elion, who shared the 1988 Nobel Prize. Zyloprim was approved in the US on 19 August 1966."],
 [6,"When was colchicine isolated and named?","Isolated by Pelletier and Caventou in 1819; named colchicine by Geiger in 1833."],
 [6,"What did Martinon and Tschopp show in 2006?","Urate crystals activate the NALP3 (NLRP3) inflammasome, releasing active IL-1β and IL-18."]
];
const MN=[
 [`Six for gout`,`Keep serum urate below 6 mg/dL (360 µmol/L) for everyone on urate-lowering therapy [[FitzGerald2020]]; below 5 mg/dL (300 µmol/L) in severe gout [[Richette2017]].`],
 [`Saturate at 6.8, dissolve below 6`,`Plasma is saturated at about 6.8 mg/dL [[Martillo2014]]. A target under saturation keeps the gradient in favour of crystal dissolution [[Martillo2014,Richette2017]].`],
 [`Negative Needle, Positive rhomboid`,`MSU: needle, strongly negative, yellow when parallel. CPP: rhomboid, weakly positive, blue when parallel [[Zhang2016SciRep,Jokic2020,Rosenthal2016]].`],
 [`Start low, go slow`,`Allopurinol ≤100 mg/day (lower in CKD), raised every 2–5 weeks with a urate check after each step, to target; a lower starting dose means fewer initiation flares [[FitzGerald2020]].`],
 [`Twelve, six, stop`,`The US colchicine label: 1.2 mg, then 0.6 mg an hour later; maximum 1.8 mg in 1 hour [[FDA-Colcrys]]. As effective as 4.8 mg, with far less diarrhoea [[Terkeltaub2010]].`],
 [`Eight of twenty-three`,`2015 ACR/EULAR: ≥8 of 23 points classifies gout; crystals alone are sufficient [[Neogi2015]].`],
 [`Three of four`,`A flare in known gout: says it is a flare, pain at rest >3/10, a swollen joint, a warm joint [[Gaffo2018]].`],
 [`Check before you drip`,`Pegloticase: screen for G6PD first, check urate before every infusion, stop if it rises above 6 mg/dL [[FDA-Krystexxa]].`]
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','All cards'],...Object.keys(PARTN).map(k=>[k,'Part '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=PARTN[c[0]]+' · question';$('#fcTagB').textContent=PARTN[c[0]]+' · answer';
    $('#fcFront').textContent=c[1];$('#fcBack').textContent=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',flip);$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=MN.map(m=>`<div class="card"><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');
};

/* =============== 6.3 quiz =============== */
const QZ=[
 [1,"In 2020, about how many people worldwide had gout (GBD modelled estimate)?",["12 million","55.8 million","120 million","27 million"],1,`55.8 million, an age-standardised 659.3 per 100,000; 95.8 million are projected for 2050 [[GBD2024Gout]].`],
 [1,"Plasma is saturated with urate at about:",["4.0 mg/dL","5.0 mg/dL","9.0 mg/dL","6.8 mg/dL (405 µmol/L)"],3,`About 6.8 mg/dL at 37 °C and physiological sodium [[Martillo2014,Loeb1972]].`],
 [1,"Cooling from 37 °C to 35 °C changes urate solubility from 6.8 mg/dL to about:",["6.0 mg/dL","7.6 mg/dL","4.0 mg/dL","No change"],0,`A 2 °C drop lowers solubility to 6.0 mg/dL in vitro, one reason the cool first MTP is a common site [[Martillo2014,Loeb1972]].`],
 [1,"Humans carry more urate than most mammals because:",["They eat more purines","Their kidneys filter less urate","Hominoids lost a working uricase gene","They lack xanthine oxidoreductase"],2,`A nonsense mutation at codon 33 silenced uricase in human, chimpanzee and orangutan, so urate is the end product instead of allantoin [[Oda2002,Chen2016]].`],
 [1,"About what share of urate leaves the body through the kidney?",["Two thirds","One tenth","One third","All of it"],0,`About two thirds through the kidney and one third through the gut [[Ohashi2023]].`],
 [1,"Which transporter reabsorbs urate at the apical membrane and is the target of uricosurics?",["ABCG2","GLUT9","OAT1","URAT1 (SLC22A12)"],3,`URAT1 was identified in 2002 as the renal urate–anion exchanger and is the target of uricosuric drugs [[Enomoto2002]].`],
 [1,"The ABCG2 Q141K variant:",["Doubles urate secretion","Causes Lesch–Nyhan syndrome","Cuts urate transport by 53%","Has no link with gout"],2,`It cuts urate transport by 53%, gives a gout OR of 1.68 per allele, and accounts for at least 10% of gout in white people [[Woodward2009]].`],
 [1,"Over 15 years, what share of people with baseline serum urate ≥10 mg/dL developed gout?",["About 5%","About 49%","About 20%","About 95%"],1,`1.1% at <6 mg/dL and 49% at ≥10 mg/dL, in 18,889 people from four US cohorts [[Dalbeth2018ARD]].`],
 [1,"Which chain is essential for a crystal-driven flare?",["NLRP3 inflammasome → caspase-1 → IL-1β","Pyrin → IL-6","TNF alone","Complement deficiency"],0,`MSU crystals activate NALP3 (NLRP3); caspase-1 releases active IL-1β and IL-18 [[Martinon2006]]. IL-1R/MyD88 signalling on non-haematopoietic cells is essential [[Chen2006]].`],
 [1,"How much of the variance in serum urate do diet scores explain?",["About 25%","Over 50%","About 10%","≤0.3% each"],3,`Each diet score explained ≤0.3%, against 23.9% for common genome-wide variation [[Major2018]].`],
 [2,"The US-labelled colchicine dose for a gout flare is:",["0.6 mg hourly for 6 hours","2 mg once","1.2 mg, then 0.6 mg 1 hour later","0.5 mg three times daily for 10 days"],2,`Maximum 1.8 mg over 1 hour; "higher doses have not been found to be more effective" [[FDA-Colcrys]].`],
 [2,"In AGREE, ≥50% pain reduction at 24 h without rescue was reached by:",["37.8% low dose, 32.7% high dose, 15.5% placebo","80% in every arm","15% low dose, 38% high dose","No difference from placebo"],0,`Low dose 28/74, high dose 17/52, placebo 9/58 [[Terkeltaub2010]].`],
 [2,"The main advantage of low-dose over high-dose colchicine in AGREE was:",["Faster onset","It can be given IV","Lower cost","Much less diarrhoea (23.0% vs 76.9%)"],3,`Low dose had an adverse-event profile similar to placebo; high dose caused severe diarrhoea in 19.2% [[Terkeltaub2010]].`],
 [2,"Colchicine's primary mechanism is:",["Blocking microtubule (tubulin) polymerisation","COX-2 inhibition","IL-1 receptor blockade","Xanthine oxidase inhibition"],0,`Tubulin disruption then dampens several pathways, including the NLRP3 inflammasome and neutrophil migration [[Leung2015,FDA-Colcrys]].`],
 [2,"CONTACT compared naproxen with low-dose colchicine in UK primary care. It found:",["Colchicine much better for pain","Naproxen caused more diarrhoea","Similar pain relief, more diarrhoea on colchicine","Neither helped"],2,`Pain difference −0.18 over days 1–7; diarrhoea 45.9% on colchicine vs 20.0% on naproxen [[Roddy2020]].`],
 [2,"Prednisolone 35 mg daily for 5 days vs naproxen 500 mg twice daily:",["Prednisolone inferior","Equivalent pain relief","Naproxen inferior","Both no better than placebo"],1,`Pain fell 44.7 vs 46.0 mm after 90 h, meeting the equivalence margin [[Janssens2008]].`],
 [2,"For a person who cannot take anything by mouth during a flare, ACR 2020 strongly recommends:",["An IL-1 inhibitor","ACTH","No treatment","A glucocorticoid by IM, IV or intra-articular route"],3,`Glucocorticoids are strongly recommended over IL-1 inhibitors or ACTH in this setting (high certainty) [[FitzGerald2020]].`],
 [2,"In the US, canakinumab for gout flares is given as:",["Daily oral tablets","150 mg SC, at least 12 weeks before re-treatment","Weekly IV infusion","100 mg SC daily for 3 days"],1,`Approved in August 2023 for adults in whom NSAIDs and colchicine are unsuitable and repeated steroid courses are not appropriate [[IlarisPIG,FDA-IlarisGout2023]].`],
 [2,"Which drug is the classic dangerous colchicine interaction?",["Clarithromycin","Azithromycin","Paracetamol","Amoxicillin"],0,`Clarithromycin raised colchicine AUC by 282%, and 10.2% of inpatients given both together died [[FDA-Colcrys,Hung2005]]. Azithromycin needs no dose adjustment [[Terkeltaub2011]].`],
 [2,"During a flare, a person already taking allopurinol should:",["Stop it until the flare settles","Double the dose","Keep taking it","Switch to febuxostat"],2,`Continue established urate-lowering therapy without interruption during a flare [[Khanna2012P2,FDA-Allopurinol]].`],
 [3,"ACR 2020 strongly recommends starting urate-lowering therapy for:",["A first flare with normal kidneys","Asymptomatic hyperuricaemia","Anyone over 60","≥1 tophus, radiographic damage or ≥2 flares a year"],3,`These are the three strong indications [[FitzGerald2020]].`],
 [3,"The ACR 2020 serum urate target for everyone on ULT is:",["<6 mg/dL (360 µmol/L)","<7 mg/dL","<4 mg/dL","There is no target"],0,`Treat-to-target with a target <6 mg/dL is strongly recommended (high certainty) [[FitzGerald2020]]. EULAR adds <5 mg/dL in severe gout [[Richette2017]].`],
 [3,"ACR 2020 advises starting allopurinol at:",["300 mg/day","≤100 mg/day, lower in CKD stage ≥3","600 mg/day","The full target dose at once"],1,`Start ≤100 mg/day, with ≤50 mg/day considered in CKD; febuxostat ≤40 mg/day [[FitzGerald2020]].`],
 [3,"Kidney disease raises allopurinol exposure mainly because:",["Allopurinol is cleared by the liver","Food blocks its absorption","It binds albumin tightly","Its active metabolite oxypurinol is cleared by the kidney"],3,`Oxypurinol has a half-life of about 23 h and is cleared almost entirely in the urine [[Day2007,Hande1984]].`],
 [3,"ACR 2020 recommends anti-inflammatory prophylaxis when starting ULT for:",["1 week","Lifelong","3–6 months","Not at all"],2,`3–6 months rather than less than 3 months, continued if flares persist [[FitzGerald2020]].`],
 [3,"ACR 2020 advises HLA-B*58:01 testing before allopurinol in:",["People of Southeast Asian descent and African American people","Everyone","White Europeans only","Children only"],0,`Carriage is about 7.4% in Han Chinese, Korean and Thai people and 3.8% in African Americans [[FitzGerald2020]]. CPIC contraindicates allopurinol in carriers [[CPIC-HLAB-Allopurinol]].`],
 [3,"About what share of allopurinol hypersensitivity syndrome begins within 60 days of starting?",["10%","50%","90%","Almost none"],2,`About 90% (489 of 538) in a series of 901 cases [[Ramasamy2013]].`],
 [3,"In CARES (febuxostat vs allopurinol in gout with CVD):",["Febuxostat was inferior for MACE","MACE was non-inferior, but CV death was higher (HR 1.34)","Febuxostat reduced deaths","The trial stopped early for benefit"],1,`All-cause death HR 1.22; the FDA added a boxed warning in 2019 [[White2018,FDA-Uloric]].`],
 [3,"FAST (febuxostat vs allopurinol, age ≥60 with CV risk) found:",["Febuxostat doubled CV death","Allopurinol was inferior","No primary result","Non-inferiority, adjusted HR 0.85"],3,`Deaths were 7.2% on febuxostat vs 8.6% on allopurinol [[Mackenzie2020]].`],
 [3,"Azathioprine with febuxostat is, per the US label:",["Contraindicated","Safe at usual doses","Recommended","Fine if the dose is doubled"],0,`Xanthine oxidase inactivates thiopurines; with allopurinol the US label cuts them to one-third to one-quarter [[FDA-Uloric,FDA-Zyloprim]].`],
 [3,"The pegloticase stopping rule is:",["Stop after 3 infusions","Stop if serum urate falls below 2 mg/dL","Stop if pre-infusion serum urate rises above 6 mg/dL, especially twice in a row","Never stop"],2,`Loss of response comes before most infusion reactions, so pre-infusion urate is the warning sign [[FDA-Krystexxa,Lipsky2014]].`],
 [3,"Nurse-led treat-to-target (Doherty 2018): serum urate <360 µmol/L at 2 years?",["50% vs 45%","95% vs 30%","30% vs 95%","100% vs 0%"],1,`95% with nurse-led care vs 30% with usual GP care (RR 3.18), at £5066 per QALY [[Doherty2018]].`],
 [4,"The sufficient criterion in the 2015 ACR/EULAR gout criteria is:",["Serum urate ≥10 mg/dL","Podagra","MSU crystals in a symptomatic joint, bursa or tophus","A double-contour sign"],2,`Crystals classify as gout with no scoring needed [[Neogi2015]].`],
 [4,"Without crystals, gout is classified at a score of:",["≥8 of 23","≥4 of 10","≥6 of 15","≥10 of 30"],0,`Maximum 23; ≥8 classifies as gout [[Neogi2015]].`],
 [4,"Which item subtracts 4 points?",["MSU-negative synovial fluid","Serum urate <4 mg/dL","No imaging done","Polyarticular onset"],1,`Urate <4 mg/dL scores −4 and MSU-negative fluid −2; imaging not done scores 0 [[Neogi2015]].`],
 [4,"The full 2015 criteria had sensitivity and specificity of:",["100% and 51%","70% and 95%","85% and 78%","92% and 89%"],3,`AUC 0.95 in the SUGAR validation set; 85% and 78% is the clinical-only version [[Neogi2015]].`],
 [4,"Under compensated polarised light, MSU crystals parallel to the slow axis look:",["Yellow and needle-shaped","Blue and rhomboid","Green and round","Invisible"],0,`MSU crystals are strongly negatively birefringent; CPP crystals are weakly positive and blue when parallel [[Zhang2016SciRep,Jokic2020]].`],
 [4,"In one series, serum urate was normal during the flare in:",["None","About 10%","49%","All"],2,`20 of 41 people; mean 7.5 mg/dL during flares vs 8.5 between flares [[Urano2002]].`],
 [4,"Joint-level DECT sensitivity in gout of 6 weeks or less was:",["0.95","0.55","0.85","0.25"],1,`DECT can miss early gout [[Gamala2019]].`],
 [4,"Crystals are seen in a hot joint aspirate. Infection:",["Is excluded","Can coexist in about 1.5–5% of crystal-positive joints","Is always present","Only occurs in CPPD"],1,`Crystals do not exclude infection; culture the fluid [[Shah2007,Papanicolas2012]].`],
 [4,"In NHANES 2007–2008, the most common comorbidity in people with gout was:",["Stroke (10%)","Heart failure (11%)","Diabetes (26%)","Hypertension (74%)"],3,`CKD stage ≥2 was 71% and obesity 53% [[Zhu2012]].`],
 [4,"In CKD-FIX (stage 3–4 CKD without gout), allopurinol:",["Halved eGFR decline","Did not slow eGFR decline","Caused kidney failure","Was not tested"],1,`eGFR change −3.33 vs −3.23 mL/min/1.73 m² per year (P = 0.85) [[Badve2020]].`],
 [4,"Which antihypertensive is linked to lower gout risk?",["Thiazide diuretic","β-blocker","Losartan","ACE inhibitor"],2,`Losartan RR 0.81 and calcium channel blockers 0.87; diuretics 2.36 [[Choi2012BMJ]].`],
 [5,"ACR 2020 on vitamin C supplements for gout:",["Strongly recommends them","Conditionally recommends against them","Recommends 2 g daily","Makes no statement"],1,`Two small RCTs showed clinically insignificant urate changes [[FitzGerald2020]].`],
 [5,"Per daily serving, which drink had the highest risk of incident gout in men?",["Wine","Spirits","Diet soda","Beer"],3,`Beer RR 1.49, spirits 1.15, wine 1.04 (not significant) [[Choi2004Lancet]].`],
 [5,"Low-dose aspirin taken for a valid reason should, per ACR 2020:",["Not be stopped because of gout","Be stopped at once","Be doubled","Be swapped for fenofibrate"],0,`It is linked to flares (OR 1.81), but ACR 2020 advises against stopping it [[Zhang2014Aspirin,FitzGerald2020]].`],
 [5,"Being in hospital raises flare risk about:",["Twofold","Tenfold","Not at all","Halves it"],1,`RR 10.2; an in-hospital flare lengthened the stay by 1.8 days [[Zleik2018]].`],
 [5,"The validated flare definition needs how many of its 4 items?",["1","2","3","4"],2,`Patient says flare, pain at rest >3/10, a swollen joint, a warm joint: sensitivity 85%, specificity 95% [[Gaffo2018]].`],
 [5,"Across 13 studies, what share took at least 80% of their urate-lowering therapy?",["46%","90%","20%","75%"],0,`Non-persistence ranged from 54% to 87% [[Scheepers2018]].`],
 [5,"G-CAN clinical remission requires, over 12 months:",["Normal kidney function","No crystals on DECT","Serum urate <4 mg/dL only","No flares, no tophi and serum urate <6 mg/dL"],3,`It is "clinical" because no domain measures complete crystal dissolution [[TabiAmponsah2026]].`],
 [5,"Which approach treats flares but does not remove urate crystals?",["Xanthine oxidase inhibition","URAT1 inhibition","IL-1 or NLRP3 blockade","Uricase"],2,`Only lowering urate dissolves the deposit [[Dalbeth2019NRDP,Dalbeth2021]].`],
 [5,"In the UK, what share of people newly diagnosed with gout started ULT within 12 months?",["About 90%","27.3%","60%","5%"],1,`18.6% within 6 months and 27.3% within 12 months [[Kuo2015ARD]].`],
 [6,"The word 'gout' comes from Latin gutta, meaning:",["A drop","A stone","The foot","A king"],0,`After the medieval idea of a humour dropping into a joint [[Nuki2006]].`],
 [6,"Who identified MSU crystals in gouty synovial fluid with compensated polarised light in 1961?",["Garrod","Sydenham","McCarty and Hollander","Hitchings and Elion"],2,`Freudweiler's 1899 crystal-injection work had been overlooked until then [[McCarty1961,Nuki2006]].`],
 [6,"Allopurinol came out of the purine research of:",["Pelletier and Caventou","Hitchings and Elion","Martinon and Tschopp","Scheele and Wollaston"],1,`They shared the 1988 Nobel Prize; Zyloprim was approved in the US in 1966 [[Elion1989,DrugsFDA-Zyloprim]].`],
 [6,"Garrod's 1848 work showed:",["Crystals under polarised light","Colchicine's structure","The NLRP3 inflammasome","Raised uric acid in the blood of people with gout"],3,`He devised the "thread test", called the first clinical chemistry test [[Garrod1848,Nuki2006]].`],
 [6,"Who described needle-shaped crystals from a tophus in 1679?",["Galen","Hippocrates","Antonie van Leeuwenhoek","Thomas Sydenham"],2,`He did not know what they were made of [[McCarty1970,Nuki2006]].`],
 [6,"Martinon and Tschopp (2006) showed that urate crystals:",["Activate the NALP3 inflammasome","Are dissolved by colchicine","Block xanthine oxidase","Are positively birefringent"],0,`Releasing active IL-1β and IL-18 [[Martinon2006]].`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">Finished</div><div class="q">You scored ${score} / ${list.length} (${pct}%)</div><p>${pct>=85?'Excellent work.':pct>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">Try again</button><button class="btn" data-go="review">Go to flashcards</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>question <b>${i+1} / ${list.length}</b></span><span>score <b>${score}</b></span><span>${PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'Correct.':'Not quite.'}</b> ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'Next question →':'See results'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const GL=[
 ["ABCG2","A high-capacity urate exporter in the kidney's proximal tubule, the gut wall and the liver. Common variants that weaken it (such as Q141K) raise urate and gout risk.","urate"],
 ["ACR/EULAR 2015 criteria","Gout classification criteria: an entry criterion, MSU crystals as a sufficient criterion, otherwise a score of ≥8 of 23 points across clinical, laboratory and imaging domains.","dx"],
 ["Adherence","Taking a medicine as prescribed. Often measured as taking ≥80% of doses; low for urate-lowering therapy.","nursing"],
 ["AGREE trial","The randomised trial showing low-dose colchicine (1.8 mg over 1 hour) works as well as high-dose (4.8 mg over 6 hours) with far less diarrhoea.","flarerx"],
 ["Allantoin","The product of urate breakdown by uricase; about 100 times more water-soluble than uric acid.","urate"],
 ["Allopurinol","A purine-analogue xanthine oxidase inhibitor; first-line urate-lowering therapy, started low and titrated to target.","ult"],
 ["Allopurinol hypersensitivity syndrome (AHS)","A rare, severe reaction to allopurinol with rash, fever and organ involvement; about 90% begin within 60 days.","ultsafety"],
 ["Anakinra","An IL-1 receptor antagonist injected daily; used off-label for flares when standard treatments are unsuitable.","flarerx"],
 ["Anti-drug antibodies","Antibodies the body makes against a biologic drug, such as pegloticase; they speed clearance and cause loss of response and infusion reactions.","ultsafety"],
 ["Asymptomatic hyperuricaemia","High serum urate with no flare or tophus. ACR 2020 advises against urate-lowering drugs for it.","what"],
 ["Benzbromarone","A potent uricosuric that blocks URAT1; withdrawn by its original maker in 2003 over liver toxicity, still marketed in some countries.","ult"],
 ["Canakinumab","A monoclonal antibody against IL-1β; given as a single 150 mg injection for flares when other treatments are unsuitable.","flarerx"],
 ["CARES trial","A trial of febuxostat vs allopurinol in people with gout and cardiovascular disease; MACE was non-inferior but CV death was higher on febuxostat.","ultsafety"],
 ["Caspase-1","The enzyme activated by the inflammasome that cuts pro-IL-1β into its active form.","flare"],
 ["Chondrocalcinosis","Calcification of cartilage seen on imaging; a hallmark of CPP crystal deposition.","ddx"],
 ["Chronic gouty arthritis","Persistent joint inflammation caused by MSU crystals. G-CAN advises against the vaguer term \"chronic gout\".","what"],
 ["CKD","Chronic kidney disease: lasting loss of kidney function, graded in stages 1–5 by eGFR. It raises urate and travels with gout.","links"],
 ["Clinical remission","For gout (G-CAN): 12 months with no flares, no subcutaneous tophi and serum urate <6 mg/dL.","cure"],
 ["Colchicine","An anti-inflammatory drug from the autumn crocus that blocks microtubule assembly; used to treat and prevent flares.","colin"],
 ["Colchicine myopathy","Muscle weakness with a raised CK from colchicine build-up, usually when kidney function is reduced or with interacting drugs.","coldose"],
 ["Colchicum autumnale","The autumn crocus, the plant source of colchicine.","history"],
 ["Compensated polarised light microscopy","Microscopy with a red retardation plate that shows crystal birefringence and colour; the reference test for gout.","dx"],
 ["CPP crystals","Calcium pyrophosphate crystals: rhomboid or rod-like and weakly positively birefringent; they cause CPPD.","ddx"],
 ["CPPD","Calcium pyrophosphate deposition disease, which can cause acute arthritis (formerly pseudogout), often in the knee or wrist of older people.","ddx"],
 ["Crowned dens syndrome","CPP deposition around the top of the spine (the dens) causing acute neck pain; a sufficient criterion for CPPD.","ddx"],
 ["CYP3A4","A liver and gut enzyme that breaks down colchicine and many other drugs; strong inhibitors raise colchicine levels sharply.","coldose"],
 ["DASH diet","Dietary Approaches to Stop Hypertension: fruit, vegetables, low-fat dairy, less red meat and sugar. Linked with lower urate and less gout.","living"],
 ["DECT","Dual-energy CT, which colour-codes urate deposits by their X-ray behaviour at two energies; can miss very early gout.","dx"],
 ["Dotinurad","A selective URAT1 inhibitor approved in Japan in 2020 and in trials elsewhere.","cure"],
 ["Double-contour sign","On ultrasound, a bright irregular line over the cartilage surface from urate crystals, independent of probe angle.","dx"],
 ["FAST trial","A European trial of febuxostat vs allopurinol in people aged 60 or more with CV risk; febuxostat was non-inferior with no excess deaths.","ultsafety"],
 ["Febuxostat","A non-purine selective xanthine oxidase inhibitor; in the US now used after allopurinol fails or is unsuitable.","ult"],
 ["FEUA","Fractional excretion of urate: the share of filtered urate that ends up in urine, normally 5–15%.","urate"],
 ["G-CAN","The Gout, Hyperuricemia and Crystal-Associated Disease Network, which sets shared definitions such as flare and remission.","cure"],
 ["G6PD deficiency","An inherited red-cell enzyme deficiency; pegloticase can cause haemolysis and methaemoglobinaemia in it, so screening comes first.","ultsafety"],
 ["Gasdermin D","A protein cut by caspase-1 whose fragment forms membrane pores, letting IL-1β out and driving pyroptosis.","flare"],
 ["Glucocorticoid","A steroid medicine such as prednisolone; given by mouth, into a joint or by injection to treat flares.","flarerx"],
 ["GLUT9 (SLC2A9)","A urate transporter that carries reabsorbed urate out of kidney tubule cells into the blood; common variants affect serum urate.","urate"],
 ["Gout","A chronic disease of monosodium urate crystal deposition that shows itself as flares, tophi and joint damage.","what"],
 ["Gout flare","A clinically evident episode of acute inflammation induced by MSU crystals.","flare"],
 ["Gout Impact Scale","A gout-specific questionnaire with five 0–100 scales (higher is worse) for patient-reported impact.","nursing"],
 ["HAQ-DI","Health Assessment Questionnaire Disability Index, a measure of physical function used in gout studies.","nursing"],
 ["High-fructose corn syrup","A sweetener in many soft drinks; fructose raises serum urate within hours.","living"],
 ["HLA-B*58:01","A tissue-type gene variant that strongly predicts severe allergic reactions to allopurinol; commoner in some Asian and African populations.","ultsafety"],
 ["HPRT deficiency","Loss of the purine-recycling enzyme hypoxanthine-guanine phosphoribosyltransferase; causes urate overproduction, and in its severe form Lesch–Nyhan syndrome.","urate"],
 ["Hyperuricaemia","Serum urate above the saturation point (about 6.8 mg/dL [405 µmol/L]); necessary for gout but not enough on its own.","what"],
 ["IL-1β","Interleukin-1 beta, the main inflammatory signal of a gout flare, released after inflammasome activation.","flare"],
 ["Inflammasome","A protein complex inside immune cells that senses danger and activates caspase-1; NLRP3 is the one triggered by urate crystals.","flare"],
 ["Initiation flare","A flare in the first months of urate-lowering therapy, as falling urate mobilises crystals; prevented by prophylaxis.","t2t"],
 ["Intercritical gout","The symptom-free period between gout flares; crystals are often still present in the joint.","what"],
 ["Janssens rule","A primary-care score (also called the Nijmegen rule) using seven items to estimate the chance that a monoarthritis is gout.","dx"],
 ["Lesinurad","A URAT1 inhibitor approved in 2015 for use with a xanthine oxidase inhibitor; later withdrawn from the market.","ult"],
 ["Losartan","An angiotensin-receptor blocker that also increases urate excretion; preferred for blood pressure in gout when feasible.","links"],
 ["MACE","Major adverse cardiovascular events: a combined trial end point that usually includes CV death, MI and stroke.","links"],
 ["Medication-in-pocket","Keeping flare treatment at home to take at the first warning signs, as the ACR 2020 Patient Panel preferred.","living"],
 ["Mendelian randomisation","A genetic method that uses inherited variants to test whether a risk factor causes an outcome; it does not support urate causing CKD or heart disease.","links"],
 ["Metabolic syndrome","A cluster of central obesity, high blood pressure, high glucose and abnormal lipids; present in 62.8% of US adults with gout in one survey.","links"],
 ["Monosodium urate (MSU)","The salt urate forms with sodium; it crystallises as the needle-shaped crystals of gout.","crystals"],
 ["Nephrolithiasis","Kidney stones. Gout raises the risk of both uric acid and calcium stones.","links"],
 ["NETs","Neutrophil extracellular traps: webs of DNA and proteins released by neutrophils; when aggregated they degrade cytokines and help end a flare.","flare"],
 ["Neutrophil","The white blood cell that floods a gouty joint; colchicine dampens its migration.","flare"],
 ["NLRP3","The inflammasome sensor (also called NALP3) activated by urate crystals.","flare"],
 ["NSAID","Non-steroidal anti-inflammatory drug, such as naproxen; first-line for flares when no contraindication applies.","flarerx"],
 ["Nucleation","The first step of crystal formation, when dissolved urate begins to form a solid seed.","crystals"],
 ["Nurse-led care","Care in which trained nurses educate, share decisions and titrate urate-lowering therapy to target.","nursing"],
 ["Oxypurinol","Allopurinol's active metabolite (also oxipurinol); long-lived and cleared by the kidney.","ult"],
 ["P-glycoprotein (P-gp)","A pump that pushes drugs such as colchicine out of cells; drugs that block it raise colchicine levels.","colin"],
 ["Pegloticase","A PEGylated recombinant uricase given by IV infusion; converts urate to allantoin in refractory gout.","ult"],
 ["Podagra","A gout flare at the first metatarsophalangeal (big-toe) joint.","what"],
 ["Probenecid","An older uricosuric drug that increases urate excretion in the urine.","ult"],
 ["Prophylaxis","Low-dose anti-inflammatory treatment (colchicine, an NSAID or prednisone) given to prevent flares when starting urate-lowering therapy.","t2t"],
 ["Purines","Building blocks of DNA, RNA and energy molecules, from cell turnover and food; their breakdown makes urate.","urate"],
 ["Saturation","The concentration above which urate can no longer stay dissolved: about 6.8 mg/dL (405 µmol/L) in plasma at 37 °C.","crystals"],
 ["Septic arthritis","A bacterial joint infection that can mimic, or coexist with, a gout flare; joint aspiration and culture are key.","ddx"],
 ["SGLT2 inhibitors","Diabetes and heart-failure drugs that increase urinary urate loss; linked with lower urate and fewer gout flares.","links"],
 ["SJS/TEN","Stevens–Johnson syndrome and toxic epidermal necrolysis, severe skin reactions; allopurinol is a leading cause.","ultsafety"],
 ["Synovial fluid","The fluid inside a joint; aspirated to look for crystals, count white cells and culture for infection.","dx"],
 ["Thiazide diuretic","A water pill such as hydrochlorothiazide that raises urate; ACR 2020 suggests switching it when feasible.","links"],
 ["Thread test","Garrod's 1848 test in which uric acid crystallised on a thread in acidified serum; called the first clinical chemistry test.","history"],
 ["Tophus","A deposit of MSU crystals with surrounding inflammatory tissue, felt as a firm, chalky lump under the skin or in bone.","what"],
 ["Treat to target","Raising the urate-lowering dose step by step, with blood tests, until serum urate is below the target.","t2t"],
 ["Tubulin","The protein building block of microtubules; colchicine binds it and stops microtubule assembly.","colin"],
 ["URAT1 (SLC22A12)","The main apical transporter that reabsorbs urate from the kidney tubule; the target of uricosurics.","urate"],
 ["Urate-lowering therapy (ULT)","Long-term medicine that lowers serum urate so crystals dissolve: xanthine oxidase inhibitors, uricosurics or uricase.","ult"],
 ["Uricase","Urate oxidase, the enzyme most mammals use to break urate down to allantoin; humans lack a working copy.","urate"],
 ["Uricosuric","A drug that increases urate excretion in the urine, usually by blocking URAT1.","ult"],
 ["Xanthine oxidase inhibitor","A drug, such as allopurinol or febuxostat, that blocks urate production.","ult"],
 ["Xanthine oxidoreductase","The enzyme that converts hypoxanthine to xanthine and xanthine to uric acid; xanthine oxidase is one of its forms.","urate"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const AREAN={A:'Epidemiology, risk factors & history',B:'Diagnosis, classification & imaging',C:'Urate biology & crystal inflammation',D:'Treating a flare & colchicine',E:'Urate-lowering therapy & treat-to-target',F:'Kidney & cardiovascular links',G:'Living with gout & nursing care',H:'Research & toward a cure'};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l.replace(/&/g,'&amp;')}</button>`).join('');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag sea">${esc(AREAN[a]||a)}</span>`).join('')}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} of ${SOURCES.length} sources`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
