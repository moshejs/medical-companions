
/* =============== 6.2 flashcards & mnemonics =============== */
const MS_PARTN={1:"Part 1 · The disease",2:"Part 2 · The course",3:"Part 3 · Diagnosis",4:"Part 4 · Treatment",5:"Part 5 · Living with MS",6:"Part 6 · History"};
const MS_FC=[
 [1,"How many people live with MS worldwide?",`About 2.8 million in the 2020 Atlas of MS, a prevalence of 35.9 per 100,000 [[Walton2020]]. The 2024 update estimated about 3.1 million (38.1 per 100,000) [[King2026]].`],
 [1,"How much more common is MS in women?",`About twice as common worldwide; in some countries the female to male ratio reaches 4:1 [[Walton2020]].`],
 [1,"What is the latitude gradient?",`Prevalence rises the further a population lives from the equator: 5.27 per 100,000 per degree of latitude in a 2019 meta-analysis of 880 prevalence points [[Simpson2019]].`],
 [1,"What does myelin do to conduction speed?",`It raises conduction velocity from under 1 m/s (unmyelinated) to 50–100 m/s without making the axon any wider [[Kister2022]].`],
 [1,"What is the main cause of the negative symptoms of a relapse (weakness, blindness, numbness)?",`Conduction block, mainly from demyelination and inflammation. Remission comes from remyelination, resolution of inflammation or restored conduction along demyelinated axons [[Smith1999]].`],
 [1,"Why can a hot bath bring back old symptoms?",`Higher temperature impairs action-potential propagation in demyelinated axons; an estimated 60–80% of people with MS have temporary heat worsening [[Davis2010]]. These Uhthoff phenomena are not relapses [[Frohman2013]].`],
 [1,"How do lymphocytes leave a lymph node, and how does fingolimod stop them?",`They need the S1P1 receptor to exit. Fingolimod-phosphate first activates S1P1 and then makes the cell down-regulate it (functional antagonism), so lymphocytes stay in the node [[Matloubian2004,Chun2010]].`],
 [1,"Which adhesion pair lets lymphocytes into the inflamed brain?",`VLA-4 (α4β1 integrin) on the lymphocyte binding VCAM-1 on activated endothelium. An anti-α4 antibody prevented EAE in rats, the origin of natalizumab [[Yednock1992]].`],
 [1,"Which T cells dominate MS lesions?",`CD8+ T cells, in all disease courses and lesion stages, with a prominent CD20+ B-cell contribution and sparse CD4+ cells [[MachadoSantos2018]].`],
 [1,"Name the three lesion types of the 2017 histological classification.",`Active (macrophages and microglia throughout), mixed active/inactive or chronic active (macrophages only at the border) and inactive (almost free of macrophages) [[Kuhlmann2017]].`],
 [1,"What is the strongest single genetic risk factor for MS?",`HLA-DRB1*15:01, with a per-allele odds ratio of 3.92 in 17,465 cases and 30,385 controls. HLA-A*02:01 is protective [[Moutsianas2015]].`],
 [1,"How often is an identical twin of a person with MS also affected?",`Probandwise concordance was 24% in Denmark and 25.3% in Canada [[Hansen2005,Willer2003]]; the age-adjusted absolute risk was 17.3% in Sweden [[Westerlind2014]].`],
 [1,"What did the US military cohort show about Epstein-Barr virus?",`In more than 10 million young adults, MS risk rose 32-fold after EBV infection but not after other viruses such as cytomegalovirus, and serum NfL rose only after EBV seroconversion [[Bjornevik2022]].`],
 [1,"Which CNS protein does EBNA1 mimic?",`GlialCAM: clonally expanded CSF B cells make antibodies that bind both EBNA1 and GlialCAM [[Lanz2022]]. Anoctamin-2 is a second proposed target [[Tengvall2019]].`],
 [1,"How does smoking interact with HLA genes?",`Smokers carrying DRB1*15 and lacking A*02 had OR 13.5 compared with non-smokers lacking both genetic factors [[Hedstrom2011Smoking]]. Smoking alone gives a pooled OR of about 1.54 [[Degelman2017]].`],
 [1,"Which body-size exposure is linked to MS risk?",`Obesity in adolescence: BMI of 30 or more at age 18 more than doubled risk (RR 2.25) in the Nurses' Health Studies, while adult BMI showed no association [[Munger2009]].`],
 [1,"Is there a genetic test that diagnoses or predicts MS?",`No. Genetic testing for MS is used only in research; a person can carry many risk variants and never develop MS [[MSIF2022]].`],
 [2,"What are the core MS phenotypes after the 2013 revision?",`Relapsing-remitting, secondary progressive and primary progressive, plus clinically isolated syndrome, each qualified as active or not and (for progressive disease) progressing or not. Progressive relapsing MS was eliminated [[Lublin2014]].`],
 [2,"What is a clinically isolated syndrome (CIS)?",`A first clinical presentation suggestive of demyelination that does not yet meet dissemination in time [[Lublin2014]].`],
 [2,"What is radiologically isolated syndrome (RIS)?",`MS-typical MRI lesions found by chance in a person with no symptoms. In 10-year follow-up, 51.2% had a first clinical event [[LebrunFrenay2020]].`],
 [2,"What is PIRA?",`Progression independent of relapse activity. In OPERA I/II it explained 78.0% (interferon arm) and 88.0% (ocrelizumab arm) of 12-week confirmed disability accumulation [[Kappos2020]].`],
 [2,"What is the 15-year MS risk after optic neuritis?",`50% overall in the Optic Neuritis Treatment Trial: 25% with no brain lesions on baseline MRI and 72% with at least one [[ONSG2008]].`],
 [2,"How long must new symptoms last to count as a relapse?",`At least 24 hours, in the absence of fever or infection [[Polman2011]]. NICE adds a stable period of at least 1 month beforehand [[NICE2022]].`],
 [2,"What is a pseudo-relapse?",`A temporary worsening of old symptoms without new inflammation, for example with infection, heat or stress. NICE asks clinicians to rule out urinary and respiratory infection first [[NICE2022]].`],
 [2,"How often does a relapse leave a residual deficit?",`In pooled placebo arms, 42% had at least 0.5 EDSS point and 28% at least 1.0 point of residual deficit, about 64 days after the relapse [[Lublin2003]].`],
 [2,"What does EDSS 4.0 mean?",`Fully ambulatory, able to walk at least 500 m without aid or rest [[Das2019]].`],
 [2,"What does EDSS 6.0 mean?",`Needs unilateral assistance (one cane or crutch) to walk at least 100 m [[Das2019]].`],
 [2,"What does EDSS 7.0 mean?",`Walks no more than about 5 m even with aid; essentially restricted to a wheelchair but wheels self and transfers alone [[Das2019]].`],
 [2,"How do trials define confirmed disability accumulation?",`An EDSS rise of at least 1.0 point if baseline is 5.5 or less, or 0.5 point if above 5.5, confirmed after 12 or 24 weeks [[Kappos2020]].`],
 [2,"How much shorter is life expectancy with MS?",`About 7 years in a 60-year Norwegian cohort: median 74.7 years versus 81.8 in the general population [[Lunde2017]].`],
 [3,"How is dissemination in space shown on MRI under McDonald 2017?",`At least one T2 lesion in at least 2 of 4 areas: periventricular, cortical/juxtacortical, infratentorial and spinal cord [[Thompson2018]].`],
 [3,"What did McDonald 2024 add to dissemination in space?",`The optic nerve as a fifth topography, shown by MRI, VEP or OCT when there is no better explanation [[Montalban2025,Saidha2025]].`],
 [3,"How is dissemination in time shown on MRI under McDonald 2017?",`Gadolinium-enhancing and non-enhancing lesions together on one scan, or a new T2 or enhancing lesion on follow-up MRI [[Filippi2023]].`],
 [3,"In McDonald 2017, what may replace dissemination in time?",`CSF-specific oligoclonal bands, in a typical CIS that already shows dissemination in space [[Thompson2018]].`],
 [3,"What counts as positive CSF in McDonald 2024?",`At least 2 CSF-restricted oligoclonal bands, or a κ-free light chain index of 6.1 or more [[Deisenhammer2025]].`],
 [3,"How is the κ-FLC index calculated?",`(CSF κ-FLC ÷ serum κ-FLC) divided by (CSF albumin ÷ serum albumin) [[Deisenhammer2025]].`],
 [3,"What is Select-6?",`Central vein sign positivity in McDonald 2024: at least 6 lesions with a central vein. If fewer than 10 lesions are seen, CVS-positive lesions must outnumber CVS-negative ones [[Montalban2025,Solomon2026]].`],
 [3,"Where does a paramagnetic rim lesion count in McDonald 2024?",`Only in the single-site branch, paired with positive CSF or dissemination in time. It is not a route in the two-site branch or the RIS pathway [[Montalban2025,Samara2025]].`],
 [3,"What extra evidence is strongly recommended in people aged 50 or more?",`A spinal cord lesion, positive CSF or central vein sign positivity, because these are not expected in healthy ageing, headache disorders or vascular disease [[IACCTMS2025Slides,Solomon2026]].`],
 [3,"What are Dawson's fingers?",`Ovoid periventricular lesions whose long axis runs perpendicular to the lateral ventricles, following the deep medullary veins [[Filippi2019]].`],
 [3,"How does a typical MS cord lesion differ from an NMOSD lesion?",`MS: short (under 2 vertebral segments), under half the cross-section, peripheral [[Filippi2019]]. NMOSD: longitudinally extensive, 3 or more segments, often central [[Wingerchuk2015]].`],
 [3,"Name four red flags that favour NMOSD over MS.",`Longitudinally extensive myelitis, area postrema syndrome (intractable hiccups or vomiting), severe or bilateral optic neuritis, and CSF over 50 cells/μL or absent oligoclonal bands [[Wingerchuk2015]].`],
 [3,"Why does telling NMOSD from MS matter before treatment?",`Interferon-β, natalizumab and fingolimod may worsen NMOSD [[Wingerchuk2015]]; in 5 AQP4-positive patients treated with natalizumab, 9 relapses occurred on treatment [[Kleiter2012]].`],
 [3,"How common is MS misdiagnosis?",`Pooled 15% across studies [[Zurrer2024]]. In one US series the commonest true diagnoses were migraine (22%) and fibromyalgia (15%) [[Solomon2016]].`],
 [4,"What did the 1993 interferon beta-1b trial show?",`8 MIU every other day lowered the annual exacerbation rate from 1.27 on placebo to 0.84 [[IFNB1993]]. The FDA approved Betaseron on 23 July 1993 [[FDA-Betaseron]].`],
 [4,"How is glatiramer acetate thought to work?",`It binds MHC molecules and competes with myelin antigens, and it induces Th2 cells that enter the brain and give bystander suppression [[Arnon2004]].`],
 [4,"How does teriflunomide work, and why can it linger?",`It inhibits dihydro-orotate dehydrogenase (de novo pyrimidine synthesis), slowing proliferating lymphocytes [[BarOr2014]]. Without accelerated elimination, clearance may take up to 2 years [[AubagioLabel2026]].`],
 [4,"What do fumarates act on, and what does the label monitor?",`They activate the Nrf2 antioxidant pathway (and HCAR2) [[Linker2011,Chen2014]]. Labels require a CBC with lymphocytes before starting, at 6 months and every 6–12 months [[TecfideraLabel2025]].`],
 [4,"What does the fingolimod label require at the first dose?",`Observation for at least 6 hours with hourly pulse and blood pressure, and an ECG before dosing and at the end, repeated after an interruption of more than 14 days [[GilenyaLabel2026]].`],
 [4,"Which test is required before siponimod?",`CYP2C9 genotyping: CYP2C9*3/*3 is a contraindication, and *1/*3 or *2/*3 carriers take 1 mg instead of 2 mg [[MayzentLabel2026]].`],
 [4,"Why does cladribine target lymphocytes?",`Lymphocytes have a high ratio of deoxycytidine kinase to 5′-nucleotidase, so they accumulate cladribine phosphates that break DNA [[Leist2011]]. Dose: 3.5 mg/kg over 2 yearly courses [[MavencladLabel2026]].`],
 [4,"Name the three PML risk factors in the natalizumab boxed warning.",`Anti-JCV antibody positivity, longer treatment (especially beyond 2 years) and prior immunosuppressant use [[TyrukoLabel2025]].`],
 [4,"What is the PML risk on natalizumab if anti-JCV antibodies are negative?",`About 1 in 10,000 in the label table, not zero: new infection or a false-negative result (3%) can occur [[TyrukoLabel2025]].`],
 [4,"Which DMT label covers primary progressive MS?",`Only ocrelizumab. In ORATORIO, 12-week confirmed progression was 32.9% versus 39.3% on placebo (HR 0.76) [[OcrevusLabel2026,Montalban2017]].`],
 [4,"What does alemtuzumab need after treatment?",`Monthly CBC, creatinine and urinalysis and 3-monthly thyroid tests until 48 months after the last infusion. Thyroid disorders affected 36.8% [[LemtradaLabel2025]].`],
 [4,"How does AAN 2018 define breakthrough disease?",`In an adherent patient on a DMT long enough to work: one or more relapses, two or more unequivocally new MRI lesions, or increased disability on examination, over one year [[RaeGrant2018]].`],
 [4,"What does NEDA-3 mean?",`No relapses, no sustained disability progression and no new or enlarging T2 or gadolinium-enhancing lesions [[Giovannoni2015,Havrdova2009]].`],
 [4,"Which drugs carry a rebound warning on stopping?",`Natalizumab, which the ECTRIMS/EAN guideline singles out for rebound [[Montalban2018]], and the S1P modulators, whose labels warn of a severe increase in disability after stopping [[GilenyaLabel2026,MayzentLabel2026]]. In one series, 10.9% of people stopping fingolimod had severe rebound relapses 4–16 weeks later [[Hatcher2016]].`],
 [4,"What did HERCULES show for tolebrutinib?",`In non-relapsing SPMS, 6-month confirmed progression was 22.6% versus 30.7% on placebo (HR 0.69), with more liver enzyme rises [[Fox2025]]. The EU authorised it in June 2026; the FDA issued a complete response letter [[EMACenrifki2026,Sanofi2025]].`],
 [4,"What did the MIST trial report for stem cell transplantation?",`Progression in 3 people after aHSCT versus 34 on DMT (HR 0.07), against a DMT arm that excluded alemtuzumab and ocrelizumab [[Burt2019]]. Pooled transplant-related mortality was 2.1% [[Sormani2017]].`],
 [5,"What did PRIMS find about pregnancy?",`Annualised relapse rate 0.7 the year before, 0.2 in the third trimester and 1.2 in the first 3 months postpartum, then back to baseline [[Confavreux1998]].`],
 [5,"Do epidurals or breastfeeding raise relapse risk?",`Not in PRIMS [[Confavreux1998]]. In a Kaiser Permanente cohort, exclusive breastfeeding was linked to lower early postpartum relapse risk (aHR 0.37) [[LangerGould2020]].`],
 [5,"What steroid regimen does NICE NG220 publish for a relapse?",`Oral methylprednisolone 0.5 g daily for 5 days, as early as possible and within 14 days; IV 1 g daily for 3–5 days as an alternative [[NICE2022]].`],
 [5,"Do steroids change the long-term course?",`No evidence that they do: Cochrane found short-term protection within 5 weeks (OR 0.37) but too few data on later relapses or long-term disability [[Filippini2000]].`],
 [5,"Which drugs beat placebo for MS fatigue in TRIUMPHANT-MS?",`None: amantadine, modafinil and methylphenidate were no better than placebo and caused more adverse events [[Nourbakhsh2021]].`],
 [5,"Does exercise cause relapses?",`No: in a Cochrane review relapses were similar with and without exercise (25 vs 26), and exercise reduced fatigue [[Heine2015]].`],
 [5,"How does fampridine help walking, and when is it contraindicated?",`It is a potassium-channel blocker thought to act on channels exposed along demyelinated axons; the label says the mechanism is not fully elucidated [[AmpyraLabel2026]]. 35% versus 8% were timed-walk responders [[Goodman2009]]. Contraindicated with a seizure history or CrCl of 50 mL/min or less [[FDAdalfampridine]].`],
 [5,"What is first-line for spasticity in NICE NG220?",`Oral baclofen, with gabapentin as second-line or combined. NICE asks clinicians first to look for aggravating factors such as infection, pressure ulcers and bladder problems [[NICE2022]].`],
 [5,"How common is depression in MS?",`Lifetime risk 50.3% in one interview study [[Sadovnick1996]]; the suicide rate ratio is 1.72 [[Shen2019]].`],
 [5,"How long is the observation after each IV ocrelizumab infusion?",`At least 1 hour, and people are told reactions can occur up to 24 hours later [[OcrevusLabel2026]].`],
 [5,"How long is the observation after natalizumab infusions?",`1 hour after each of the first 12 infusions, then by clinical judgment if there has been no hypersensitivity [[TyrukoLabel2025]].`],
 [6,"What may be the first personal record of MS?",`The diary of Sir Augustus d'Esté, a grandson of George III, describing onset in 1822 with bilateral optic neuritis [[Landtblom2010]].`],
 [6,"Who first depicted MS lesions?",`Robert Carswell, in an atlas completed by 1838; Cruveilhier's depiction cannot be earlier than 1841 [[Compston1988]].`],
 [6,"What did Charcot do in 1868?",`He lectured on 'sclérose en plaques' at La Salpêtrière and established it as a distinct disease, with the triad of nystagmus, dysarthria and ataxia with intention tremor [[Zalc2018]].`],
 [6,"Where does the EAE model come from?",`Rivers and colleagues (1933, 1935): repeated injections of rabbit brain tissue caused encephalomyelitis with myelin loss in monkeys [[Rivers1933,Rivers1935]].`],
 [6,"What did the first MRI study of MS find?",`In 1981, MRI in 10 patients found 112 lesions in addition to the 19 seen on CT [[Young1981]].`],
 [6,"Where did glatiramer acetate begin?",`As copolymer 1, which suppressed EAE in a 1971 report [[Teitelbaum1971]]. The FDA approved Copaxone on 20 December 1996 [[FDA-Copaxone]].`],
 [6,"Trace the McDonald criteria from 2001 to 2024.",`2001 brought in MRI [[McDonald2001]]; 2010 allowed DIS and DIT on one scan [[Polman2011]]; 2017 let CSF bands replace DIT [[Thompson2018]]; 2024 added the optic nerve, CVS, PRL and κ-FLC [[Montalban2025]].`],
 [6,"What happened to CCSVI?",`It was rejected: blinded venography found it in 2% of people with MS and 3% of controls, and a sham-controlled angioplasty trial showed no benefit [[Traboulsee2014,Zamboni2018]].`]
];
const MS_MN=[
 ["Two places, two times",`Dissemination in space (lesions in 2 or more CNS places) plus dissemination in time (lesions arising at 2 or more times), with no better explanation [[Thompson2018]]. CSF can stand in for the second time: oligoclonal bands in 2017, and bands or κ-FLC in 2024 [[Thompson2018,Deisenhammer2025]].`],
 ["PICS, then O",`The 2017 DIS areas: Periventricular, Infratentorial, Cortical/juxtacortical, Spinal cord. McDonald 2024 adds the Optic nerve as the fifth [[Thompson2018,Montalban2025]].`],
 ["Charcot's NDA",`Charcot's 1868 triad: Nystagmus, Dysarthria, Ataxia with intention tremor [[Zalc2018]].`],
 ["S1P: lock in the node",`S1P modulators lock lymphocytes inside the lymph node, so blood counts fall [[Chun2010]]. Open the lock (stop the drug) and the labels warn of a severe increase in disability, rarely a rebound [[GilenyaLabel2026,MayzentLabel2026]].`],
 ["Breakthrough: 1, 2, or worse, in 1 year",`AAN 2018: 1 or more relapses, 2 or more unequivocally new MRI lesions, or increased disability on examination, within one year, in an adherent patient [[RaeGrant2018]].`],
 ["PML's three Ps",`Positive anti-JCV antibodies, Prolonged natalizumab (beyond 2 years), Prior immunosuppressant [[TyrukoLabel2025]].`],
 ["Point 7, point 2, one point 2",`PRIMS relapse rates: 0.7 before pregnancy, 0.2 in the third trimester, 1.2 in the first 3 months after birth [[Confavreux1998]].`],
 ["500, 300, 200, 100, one stick, two sticks",`EDSS 4.0 to 6.5 walking anchors: 500 m, 300 m, 200 m, 100 m unaided, then 100 m with one aid (6.0) and 20 m with two (6.5) [[Das2019]].`],
 ["A day, no fever, a month of calm",`A relapse lasts at least 24 hours, without fever or infection [[Polman2011]], after at least a month of stability; NICE asks for infection, particularly urinary, to be ruled out first [[NICE2022]].`],
 ["Six-one or two bands",`Positive CSF in 2024: a κ-FLC index of 6.1 or more, or 2 or more CSF-restricted oligoclonal bands [[Deisenhammer2025]].`]
];
const MS_RV_STEPS=[
 {from:0,at:.1,k:'Time 1 · one place',t:'A first attack',txt:`A spinal cord syndrome brings a first attack, and MRI shows the symptomatic cord lesion. One place and one time make a clinically isolated syndrome, not yet MS [[Lublin2014]].`,pt:'One damaged spot, seen once, is not enough to call it MS.',hook:'CIS: a first attack that does not yet meet dissemination in time.'},
 {from:.25,at:.38,k:'Time 1 · two places',t:'Dissemination in space',txt:`The same scan shows a periventricular lesion too. Lesions in 2 of the 4 areas of 2017, or 2 of the 5 topographies of 2024, fulfil dissemination in space, whether or not they cause symptoms [[Thompson2018,Montalban2025]].`,pt:'Damage in two separate parts of the brain and spinal cord.',hook:'2017: 2 of 4 areas. 2024: 2 of 5, adding the optic nerve.'},
 {from:.5,at:.66,k:'Time 2',t:'Dissemination in time',txt:`A follow-up MRI months later shows a new, enhancing juxtacortical lesion. A new T2 or enhancing lesion on follow-up, or enhancing and non-enhancing lesions together on one scan, fulfils dissemination in time [[Filippi2023]].`,pt:'New damage at a later date shows the process is still going on.',hook:'DIT: a new lesion on follow-up, or enhancing plus non-enhancing lesions on one scan.'},
 {from:.78,at:.94,k:'Verdict',t:'Two places, two times',txt:`Dissemination in space plus dissemination in time, with no better explanation, meets the McDonald criteria. CSF can stand in for the second time: oligoclonal bands in 2017 [[Thompson2018]], and in 2024 either 2 or more CSF-restricted bands or a κ-FLC index of 6.1 or more [[Deisenhammer2025]].`,pt:'Two places plus two times, once other causes are ruled out, means MS. A spinal tap can stand in for the second time.',hook:'DIS + DIT, or DIS + positive CSF (OCB, or κ-FLC index ≥6.1), and no better explanation.'}
];
const MS_RV_SITES=[['Optic nerve','added in 2024'],['Cortical / juxtacortical','2017 area'],['Periventricular','2017 area'],['Infratentorial','2017 area'],['Spinal cord','2017 area']];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(MS_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=MS_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=MS_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=MS_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=MS_MN.map(m=>`<div class="card"><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');

  /* ---- mnemonic in motion: two places, two times ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const SITE=[ [62,181],[100,64],[168,98],[238,196],[205,292] ],NUM=[ [-4,27],[15,-9],[15,-9],[15,-9],[15,-9] ];
  function draw(t){
    const N=vb(svg,'720 360','400 720');
    const L=N?{cx:50,cy:0,px:10,py:362}:{cx:10,cy:5,px:330,py:12};
    /* when each lesion appears (0 = never in this case) and when its enhancement fades */
    const on=[0,ramp(t,.55,.64),ramp(t,.28,.37),0,ramp(t,.03,.12)];
    const gd=[0,ramp(t,.55,.64),ramp(t,.28,.37)*(1-ramp(t,.42,.52)),0,ramp(t,.03,.12)*(1-ramp(t,.42,.52))];
    const csf=ramp(t,.8,.88),t2=ease(ramp(t,.5,.6));
    const st='style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"';
    let s=`<g transform="translate(${L.cx} ${L.cy})">`;
    s+=`<text class="t-lbl" x="0" y="16">${t<.5?'MRI at time 1':'Follow-up MRI, months later'}</text>`;
    s+=`<ellipse cx="238" cy="196" rx="40" ry="26" ${st}/>`;
    s+=`<path d="M186 176 L214 176 L215 250 L215 330 Q215 342 205 342 Q195 342 195 330 L195 250 Z" ${st}/>`;
    s+=`<ellipse cx="160" cy="120" rx="120" ry="82" ${st}/>`;
    ['M66 96 Q86 74 112 84','M128 58 Q160 46 194 60','M214 74 Q242 88 252 116','M82 150 Q112 166 142 156','M200 150 Q226 146 246 160'].forEach(d=>{s+=`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:1.6"/>`});
    s+=`<path d="M118 118 Q160 88 208 110 Q200 124 172 116 Q146 112 132 132 Q118 130 118 118 Z" style="fill:var(--csf)"/>`;
    s+=`<path d="M43 188 L100 166" style="stroke:var(--muted);stroke-width:8;stroke-linecap:round"/><path d="M43 188 L100 166" style="stroke:var(--panel-2);stroke-width:4;stroke-linecap:round"/>`;
    s+=`<circle cx="30" cy="190" r="13" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><circle cx="21" cy="190" r="4" style="fill:var(--ink)"/>`;
    SITE.forEach(([x,y],k)=>{
      s+=`<circle cx="${x}" cy="${y}" r="13" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3;opacity:.8"/>`;
      s+=`<text class="t-xs" x="${x+NUM[k][0]}" y="${y+NUM[k][1]}">${k+1}</text>`;
      if(on[k]>0)s+=lesion(x,y,6,k+3,on[k],'var(--attack)');
      if(gd[k]>0)s+=`<circle cx="${x}" cy="${y}" r="9.5" style="fill:none;stroke:var(--gold);stroke-width:2.2;opacity:${gd[k].toFixed(2)}"/>`;
    });
    /* legend */
    s+=`<g transform="translate(0 290)">${lesion(8,0,6,9,1,'var(--attack)')}<text class="t-sm" x="22" y="4">T2 lesion</text>`;
    s+=`<circle cx="8" cy="22" r="8" style="fill:none;stroke:var(--gold);stroke-width:2.2"/><text class="t-sm" x="22" y="26">enhancing</text></g>`;
    /* CSF tube */
    s+=`<rect x="122" y="262" width="18" height="58" rx="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    s+=`<path d="M123.5 290 L138.5 290 L138.5 311 Q138.5 318.5 131 318.5 Q123.5 318.5 123.5 311 Z" style="fill:var(--csf)"/>`;
    [296,302,308].forEach(y=>{s+=`<line x1="126" y1="${y}" x2="136" y2="${y}" style="stroke:var(--brand);stroke-width:2.2;opacity:${csf.toFixed(2)}"/>`});
    s+=`<text class="t-xs t-mid" x="131" y="334">CSF</text>`;
    if(csf>0)s+=`<text class="t-xs t-mid" x="131" y="346" style="opacity:${csf.toFixed(2)}">bands / κ-FLC</text>`;
    s+='</g>';
    /* the checklist panel */
    const nP=on.filter(v=>v>.5).length,nT=(on[4]>.5?1:0)+(on[1]>.5?1:0);
    s+=`<g transform="translate(${L.px} ${L.py})"><text class="t-lbl" x="0" y="16">Places: dissemination in space</text>`;
    MS_RV_SITES.forEach(([nm,tag],k)=>{const y=40+k*26,h=on[k]>.5;
      s+=`<rect x="0" y="${y-12}" width="16" height="16" rx="3" style="fill:${h?'var(--attack-soft)':'none'};stroke:${h?'var(--attack)':'var(--line)'};stroke-width:1.5"/>`;
      if(h)s+=`<path d="M3.5 ${y-4} L7 ${y} L13 ${y-8}" style="fill:none;stroke:var(--attack);stroke-width:2"/>`;
      s+=`<text class="t-lbl" x="26" y="${y+1}" style="${h?'':'fill:var(--muted)'}">${k+1}  ${nm}</text><text class="t-xs t-end" x="380" y="${y}">${tag}</text>`});
    s+=`<text class="t-lbl" x="0" y="172" style="fill:var(${nP>=2?'--good':'--muted'})">Places with lesions: ${nP} → ${nP>=2?'DIS met':'not yet'}</text>`;
    s+=`<text class="t-xs" x="0" y="190">2017: 2 of 4 areas · 2024: 2 of 5 topographies</text>`;
    s+=`<text class="t-lbl" x="0" y="222">Times: dissemination in time</text>`;
    s+=`<line class="axis" x1="10" y1="250" x2="370" y2="250"/>`;
    s+=`<circle cx="40" cy="250" r="7" style="fill:${on[4]>.5?'var(--attack)':'var(--panel)'};stroke:var(--attack);stroke-width:1.5"/>`;
    s+=`<circle cx="300" cy="250" r="7" style="fill:${on[1]>.5?'var(--attack)':'var(--panel)'};stroke:var(--attack);stroke-width:1.5"/>`;
    const cx=lerp(40,300,t2);s+=`<path d="M${f1(cx-6)} 232 L${f1(cx+6)} 232 L${f1(cx)} 240 Z" style="fill:var(--ink)"/>`;
    s+=`<text class="t-xs" x="24" y="272">time 1 · attack, MRI</text><text class="t-xs t-mid" x="300" y="272">time 2 · follow-up MRI</text>`;
    s+=`<text class="t-lbl" x="0" y="296" style="fill:var(${nT>=2?'--good':'--muted'})">Times with new lesions: ${nT} → ${nT>=2?'DIT met':'not yet'}</text>`;
    const v=t<.25?'CIS: one place, one time':t<.5?'Two places, one time: not yet':t<.78?'Two places, two times':'McDonald MS, if no better cause';
    s+=`<text class="t-big" x="0" y="326">${v}</text>`;
    if(csf>0)s+=`<text class="t-sm" x="0" y="346" style="opacity:${csf.toFixed(2)}">Or DIS + positive CSF: OCB, or κ-FLC index ≥6.1</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(MS_RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(MS_RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,14000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),MS_RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const MS_QZ=[
 [1,"The strongest single genetic risk factor for MS is:",["HLA-DRB1*15:01","APOE ε4","HLA-A*02:01","rs10191329"],0,`DRB1*15:01 has a per-allele odds ratio of 3.92 [[Moutsianas2015]]. HLA-A*02:01 is protective, and rs10191329 is linked to severity, not susceptibility [[IMSGC2023]].`],
 [1,"In the US military cohort, MS risk after Epstein-Barr virus seroconversion rose about:",["2-fold","5-fold","32-fold","300-fold"],2,`About 32-fold, with no rise after cytomegalovirus, and serum NfL rose only after seroconversion [[Bjornevik2022]].`],
 [1,"Which statement about EBV and MS do reviews support best?",["Most people infected with EBV develop MS","EBV appears necessary but not sufficient","Cytomegalovirus raises risk just as much","EBV vaccines have already prevented MS"],1,`About 90% or more of adults carry EBV but few develop MS, so genes such as HLA and other exposures decide who does [[Aloisi2023,Robinson2022]]. No EBV vaccine trial yet has MS prevention as an outcome [[Aloisi2023]].`],
 [1,"Probandwise concordance for MS in monozygotic twins (Danish and Canadian studies) is about:",["3%","25%","60%","90%"],1,`24% in Denmark and 25.3% in Canada, against 3% and 5.4% in dizygotic twins [[Hansen2005,Willer2003]].`],
 [1,"Fingolimod lowers blood lymphocyte counts mainly by:",["Killing activated T cells","Blocking VCAM-1 on endothelium","Inhibiting pyrimidine synthesis","Down-regulating S1P1 so cells cannot leave lymph nodes"],3,`Fingolimod-phosphate first activates and then down-regulates S1P1 (functional antagonism), which blocks egress from lymph nodes [[Chun2010,Matloubian2004]].`],
 [1,"Natalizumab keeps lymphocytes out of the CNS by binding:",["CD20","CD52","The S1P5 receptor","α4 integrin (VLA-4)"],3,`It binds the α4 subunit of α4β1 and α4β7 integrins and blocks adhesion to VCAM-1 on activated endothelium [[TyrukoLabel2025,Yednock1992]].`],
 [1,"Which cells dominate MS lesion infiltrates in all disease courses and stages?",["CD8+ T cells","CD4+ T cells","Neutrophils","Eosinophils"],0,`CD8+ T cells dominate, with a prominent CD20+ B-cell contribution and sparse CD4+ cells [[MachadoSantos2018]].`],
 [1,"A mixed active/inactive (chronic active) lesion has:",["Macrophages throughout the lesion","No macrophages and complete remyelination","Macrophages only at the border around a hypocellular centre","A neutrophil abscess"],2,`That is the 2017 consensus definition [[Kuhlmann2017]]. In vivo, paramagnetic rim lesions are a candidate marker: expanding rim lesions examined at autopsy were chronic active [[Absinta2019,Bagnato2024]].`],
 [1,"Why do symptoms worsen temporarily in a hot shower (Uhthoff phenomenon)?",["A new inflammatory lesion forms","Heat activates autoreactive T cells","Heat impairs conduction in already demyelinated axons","Heat dissolves remaining myelin"],2,`Higher temperature slows or blocks conduction in demyelinated axons; it reverses with cooling and is not a relapse [[Davis2010,Frohman2013]].`],
 [1,"4-aminopyridine (fampridine, dalfampridine) is thought to improve conduction by:",["Opening extra sodium channels","Making oligodendrocytes remyelinate","Depleting B cells","Blocking potassium channels exposed along demyelinated axons"],3,`Kv1 channels hidden under myelin are exposed after demyelination; 4-AP restores conduction in blocked fibres [[Sherratt1980,Rasband1998]]. The label says the mechanism is not fully elucidated [[AmpyraLabel2026]].`],
 [1,"Which blood marker is specific to neurons and rises with axonal injury?",["Neurofilament light chain","GFAP","C-reactive protein","Ferritin"],0,`Serum NfL tracks enhancing lesions and predicts relapses [[Disanto2017]]. It should not be used to diagnose MS [[Deisenhammer2025]].`],
 [1,"In chronic MS lesions, remyelination seems to fail mainly because:",["Oligodendrocyte precursors are absent","Precursors are present but fail to differentiate","There is too much myelin debris to clear in every lesion","Axons regrow too quickly"],1,`Olig2+ precursors remain in chronic lesions, but maturing precursors are rare: a differentiation block [[Kuhlmann2008]].`],
 [1,"The published mechanism of interferon-β in MS is best described as:",["B-cell depletion via CD20","S1P1 functional antagonism","Multifactorial and incompletely understood, shifting cytokines toward anti-inflammatory","Purine analogue toxicity in lymphocytes"],2,`Reviews describe cytokine shifts, reduced trafficking and expansion of regulatory NK cells, and call the mechanism incompletely understood [[Kieseier2011]]; the label says it is unknown [[BetaseronLabel2026]].`],
 [2,"Which phenotype did the 2013 revision of MS course definitions eliminate?",["Relapsing-remitting","Secondary progressive","Primary progressive","Progressive relapsing"],3,`With activity as a modifier, PRMS became 'primary progressive, active' [[Lublin2014]].`],
 [2,"EDSS 4.0 is anchored by the ability to walk:",["500 m without aid or rest","100 m with a cane","20 m with two aids","5 m with aid"],0,`EDSS 4.0: at least 500 m without aid or rest. 4.5 is 300 m, 5.0 is 200 m and 5.5 is 100 m [[Das2019]].`],
 [2,"A person needs one cane to walk about 100 m. The EDSS step that matches is:",["4.5","5.5","6.0","7.0"],2,`6.0 is unilateral assistance for at least 100 m; 6.5 is bilateral assistance for at least 20 m [[Das2019]].`],
 [2,"EDSS 7.0 means:",["Walks 300 m without aid","Walks about 5 m at most; essentially restricted to a wheelchair, wheels self and transfers alone","Helpless in bed but can communicate and eat","Normal neurological examination"],1,`7.0 is the first step defined by wheelchair use; 8.0 is restricted to bed or chair [[Das2019]].`],
 [2,"In trials, confirmed disability accumulation from a baseline EDSS of 3.0 needs a rise of at least:",["0.5 point","1.0 point","1.5 points","2.0 points"],1,`1.0 point if baseline is 5.5 or less, 0.5 if above, confirmed after 12 or 24 weeks [[Kappos2020]].`],
 [2,"In OPERA I/II, what share of 12-week confirmed disability accumulation on ocrelizumab was PIRA?",["About 18%","About 50%","88%","100%"],2,`88.0% on ocrelizumab and 78.0% on interferon; relapse-associated worsening explained 17.7% [[Kappos2020]].`],
 [2,"The minimum duration of a relapse under the McDonald definition is:",["1 hour","24 hours","7 days","30 days"],1,`At least 24 hours without fever or infection [[Polman2011]]; NICE adds at least a month of stability before it [[NICE2022]].`],
 [2,"A person with MS has a fever and a urinary infection, and an old leg weakness returns. The likeliest explanation is:",["A new relapse","Conversion to SPMS","PML","A pseudo-relapse"],3,`Infection can transiently worsen old symptoms; NICE asks for urinary and respiratory infection to be ruled out before a relapse is diagnosed [[NICE2022]]. One in 3–5 people screened at a suspected relapse had a possible UTI [[Fitzgerald2019]].`],
 [2,"In the Optic Neuritis Treatment Trial, 15-year MS risk with at least one brain lesion at baseline was:",["25%","50%","72%","95%"],2,`72% with lesions, 25% without, 50% overall [[ONSG2008]].`],
 [2,"About what share of people with RIS have a first clinical event within 10 years?",["10%","25%","51%","90%"],2,`51.2% in 10-year follow-up [[LebrunFrenay2020]]. McDonald 2024 lets some people with RIS be diagnosed with MS [[Montalban2025]].`],
 [2,"In a 60-year Norwegian cohort, median life expectancy with MS compared with the general population was:",["About 7 years shorter","The same","About 20 years shorter","About 2 years longer"],0,`74.7 versus 81.8 years; the mortality ratio fell for people whose MS began in later decades [[Lunde2017]].`],
 [2,"Which idea do Giovannoni and colleagues put forward as a hypothesis?",["Relapses are the only driver of disability","Benign MS can be diagnosed at onset","MS is caused by venous insufficiency","A diffuse smouldering process is the 'real MS'"],3,`On this view, suppressing relapses and new lesions alone cannot prevent disability [[Giovannoni2022]]. A 2024 consensus proposes smouldering-associated worsening (SAW) [[Scalfari2024]].`],
 [3,"Under McDonald 2017, MRI dissemination in space counts lesions in how many areas?",["3","4","5","6"],1,`Four: periventricular, cortical/juxtacortical, infratentorial and spinal cord, with lesions in at least 2 [[Thompson2018]].`],
 [3,"Which fifth location did McDonald 2024 add for dissemination in space?",["Optic nerve","Corpus callosum","Basal ganglia","Peripheral nerve"],0,`The optic nerve, shown by MRI, VEP or OCT, when no better explanation exists [[Montalban2025,Saidha2025]].`],
 [3,"Under McDonald 2017, in a typical CIS with dissemination in space, what can replace dissemination in time?",["A raised IgG index","An abnormal VEP","Raised serum NfL","CSF-specific oligoclonal bands"],3,`CSF-specific oligoclonal bands substitute for DIT [[Thompson2018]].`],
 [3,"In McDonald 2024, 'positive CSF' means:",["2 or more CSF-restricted oligoclonal bands, or a κ-FLC index of 6.1 or more","IgG index above normal","CSF white cells above 50/μL","Raised CSF neurofilament light"],0,`Either test qualifies [[Deisenhammer2025]]. The IgG index is not a sufficient substitute, and NfL should not be used for diagnosis [[Deisenhammer2025]].`],
 [3,"The κ-FLC index cut-off adopted for McDonald 2024 is:",["2.4","6.1","12.5","20"],1,`6.1, the weighted mean cut-off in larger studies; published cut-offs range from 2.4 to 20, and each laboratory is asked to verify it [[Deisenhammer2025,Hegen2023]].`],
 [3,"In a meta-analysis, how did the κ-FLC index compare with oligoclonal bands?",["Far less accurate","κ-FLC was 100% specific","OCB are now obsolete","Similar accuracy: 88% sensitivity and 89% specificity versus 85% and 92%"],3,`No significant difference in diagnostic accuracy [[Hegen2023]]; the two agree in close to 90% of cases [[Deisenhammer2025]].`],
 [3,"'Select-6' in McDonald 2024 refers to:",["At least 6 lesions with a central vein sign","6 paramagnetic rim lesions","6 months of progression","6 spinal cord lesions"],0,`At least 6 CVS-positive lesions; with fewer than 10 lesions, CVS-positive must outnumber CVS-negative [[Montalban2025,Solomon2026]].`],
 [3,"Under McDonald 2024, a typical presentation with lesions in 4 or 5 of the 5 locations:",["Still always needs dissemination in time","Can confirm MS without further evidence","Needs a paramagnetic rim lesion","Needs a brain biopsy"],1,`Lesions in at least 4 of 5 locations are enough in a typical clinical presentation [[Barkhof2025,IACCTMS2025Slides]]. This does not apply in the RIS pathway [[Montalban2025]].`],
 [3,"Where does a paramagnetic rim lesion count in the McDonald 2024 algorithm?",["In every pathway","Only in radiologically isolated syndrome","Only in the single-site branch, paired with positive CSF or DIT","Nowhere; it is research only"],2,`PRL appears only in Branch B (one CNS site) [[Montalban2025,Samara2025]].`],
 [3,"For a 58-year-old with hypertension and migraine, McDonald 2024 strongly recommends adding:",["A brain biopsy","A repeat MRI in 10 years","Serum NfL","A spinal cord lesion, positive CSF or CVS positivity"],3,`These features are not expected with ageing, vascular disease or headache, so they raise specificity [[IACCTMS2025Slides,Solomon2026]].`],
 [3,"Under McDonald 2024, primary progressive MS still requires:",["At least 12 months of disability progression","At least one relapse","A positive MOG-IgG","A paramagnetic rim lesion"],0,`12 months of progression stays; 2 or more spinal cord lesions count as dissemination in space [[Montalban2025,IACCTMS2025Slides]].`],
 [3,"Which MRI finding points away from MS toward NMOSD?",["Dawson's fingers","A cord lesion spanning 3 or more vertebral segments","A short, peripheral cord lesion","A juxtacortical lesion"],1,`Longitudinally extensive transverse myelitis is the most specific imaging feature of NMOSD [[Wingerchuk2015]].`],
 [3,"Intractable hiccups with nausea and vomiting in a person with myelitis suggest:",["Uhthoff phenomenon","Fampridine toxicity","Area postrema syndrome of NMOSD","Migraine"],2,`Area postrema syndrome is one of the six NMOSD core characteristics, seen in 16–43% [[Wingerchuk2015]].`],
 [3,"Why does it matter to exclude NMOSD before starting an MS DMT?",["NMOSD has no treatment","MS DMTs cure NMOSD","NMOSD is always benign","Interferon-β, natalizumab and fingolimod may worsen NMOSD"],3,`The international panel noted possible worsening [[Wingerchuk2015]]; 5 AQP4-positive patients had 9 relapses on natalizumab [[Kleiter2012]].`],
 [3,"A CSF white-cell count above 50 per μL in suspected MS is:",["A red flag for another diagnosis","Typical of MS","Required for diagnosis","The same as positive oligoclonal bands"],0,`CSF red flags include white cells above 50/μL, protein above 100 mg/dL and low glucose [[Solomon2026]].`],
 [3,"In a US series of people misdiagnosed with MS, the commonest true diagnosis was:",["NMOSD","Migraine","Lupus","Vitamin B12 deficiency"],1,`Migraine 22%, then fibromyalgia 15%; 70% had received a DMT [[Solomon2016]].`],
 [4,"Teriflunomide works by:",["Lysing CD20+ B cells","Modulating S1P receptors","Inhibiting dihydro-orotate dehydrogenase","Blocking α4 integrin"],2,`It slows proliferating lymphocytes, which depend on de novo pyrimidine synthesis [[BarOr2014,AubagioLabel2026]].`],
 [4,"Dimethyl fumarate's best-described molecular target pathway is:",["VCAM-1 adhesion","CD52 cytolysis","Deoxycytidine kinase","Nrf2 antioxidant signalling"],3,`Its metabolite monomethyl fumarate stabilises Nrf2, and HCAR2 is a second target [[Linker2011,Chen2014]]. The label says the therapeutic mechanism is unknown [[TecfideraLabel2025]].`],
 [4,"Cladribine is selectively toxic to lymphocytes because they:",["Have a high deoxycytidine kinase to 5′-nucleotidase ratio","Lack P-glycoprotein","Carry CD20","Express S1P5"],0,`They accumulate cladribine phosphates, which break DNA [[Leist2011]]; it also resists adenosine deaminase [[Murphy2010]].`],
 [4,"Glatiramer acetate is thought to act by:",["Depleting B cells","Competing with myelin antigens for MHC and inducing Th2 bystander suppression","Blocking α4 integrin","Inhibiting DHODH"],1,`Mechanism summary from Arnon [[Arnon2004]]; the label calls it not fully understood [[CopaxoneLabel2026]].`],
 [4,"Alemtuzumab binds:",["CD20","CD19","CD52","CD40 ligand"],2,`CD52 on T and B cells, NK cells, monocytes and macrophages [[LemtradaLabel2025]].`],
 [4,"The natalizumab boxed warning names which three PML risk factors?",["Age, sex and EDSS","HLA-DRB1*15:01, female sex and EBV","Smoking, obesity and low vitamin D","Anti-JCV antibodies, treatment beyond 2 years, prior immunosuppressant"],3,`These three [[TyrukoLabel2025]]. The anti-JCV index refines risk further [[Ho2017]].`],
 [4,"For an anti-JCV-negative person on natalizumab, the label table gives a PML incidence of about:",["1 in 10,000","1 in 1,000","1 in 100","Zero"],0,`About 1/10,000. Risk is not zero because of new infection or false-negative tests (3%) [[TyrukoLabel2025]].`],
 [4,"The fingolimod label requires at the first dose:",["No monitoring","At least 6 hours of observation with hourly pulse and blood pressure and an ECG before and after","24-hour inpatient telemetry for everyone","A single blood pressure reading"],1,`Heart rate falls within an hour and bottoms within 6 hours; repeat after an interruption of more than 14 days [[GilenyaLabel2026]].`],
 [4,"Before starting siponimod the label requires:",["HLA typing","Anti-JCV index","CYP2C9 genotyping","TPMT activity"],2,`CYP2C9*3/*3 is a contraindication, and some genotypes take a lower dose [[MayzentLabel2026]].`],
 [4,"Which DMT label includes primary progressive MS?",["Natalizumab","Teriflunomide","Fingolimod","Ocrelizumab"],3,`Only ocrelizumab, on the strength of ORATORIO (HR 0.76) [[OcrevusLabel2026,Montalban2017]].`],
 [4,"AAN 2018 defines breakthrough disease, over one year in an adherent patient, as:",["One or more relapses, two or more new MRI lesions, or increased disability","Three or more relapses only","Any new symptom","Reaching EDSS 6.0"],0,`Switching Recommendation 1 [[RaeGrant2018]].`],
 [4,"NEDA-3 includes every item below EXCEPT:",["No relapses","No sustained disability progression","No new or enlarging MRI lesions","Normal serum neurofilament light"],3,`NEDA-3 is clinical plus MRI only [[Giovannoni2015,Havrdova2009]].`],
 [4,"Which drug carries a label warning of severe disability increase after stopping?",["Glatiramer acetate","Fingolimod","Interferon beta-1a","Ocrelizumab"],1,`All four S1P labels carry it [[GilenyaLabel2026,MayzentLabel2026,ZeposiaLabel2026]]; 10.9% had severe rebound in one fingolimod series [[Hatcher2016]].`],
 [4,"Teriflunomide accelerated elimination per the label uses:",["Haemodialysis","Plasma exchange","Cholestyramine 8 g every 8 hours for 11 days","Vitamin K"],2,`Or activated charcoal 50 g every 12 hours for 11 days; otherwise clearance may take up to 2 years [[AubagioLabel2026]].`],
 [4,"After alemtuzumab, label monitoring continues until:",["48 months after the last infusion","1 week after the course","The next relapse","Age 65"],0,`Monthly CBC, creatinine and urinalysis, and thyroid tests every 3 months, for 48 months [[LemtradaLabel2025]].`],
 [4,"ECTRIMS/EAN 2023 advises live attenuated vaccines before ocrelizumab or alemtuzumab at least:",["2 days before","6 weeks before","1 year before","They are not needed"],1,`At least 4 weeks before most immunosuppressive DMTs, 6 weeks for ocrelizumab and alemtuzumab [[OteroRomero2023]].`],
 [4,"HERCULES tested tolebrutinib in:",["Non-relapsing SPMS against placebo","Relapsing MS against teriflunomide","PPMS against ocrelizumab","CIS against placebo"],0,`6-month confirmed progression 22.6% versus 30.7% (HR 0.69) [[Fox2025]]. The EU authorised it in 2026; the FDA issued a complete response letter [[EMACenrifki2026,Sanofi2025]].`],
 [4,"The sham-controlled Brave Dreams trial of venous angioplasty for CCSVI found:",["A large benefit","A cure in half the patients","No functional benefit","More benefit in PPMS"],2,`41.7% improved after angioplasty versus 48.7% after sham; the idea is rejected [[Zamboni2018,Traboulsee2014]].`],
 [5,"In PRIMS, annualised relapse rates in the third trimester and in the first 3 months after birth were:",["0, then 3.0","1.2, then 0.2","0.7 throughout","0.2, then 1.2"],3,`0.7 the year before, 0.2 in the third trimester, 1.2 postpartum, then back to baseline [[Confavreux1998]].`],
 [5,"In PRIMS, epidural analgesia and breastfeeding:",["Raised relapse rates","Caused faster progression","Required stopping DMTs","Did not adversely affect relapses or disability"],3,`Neither had an adverse effect [[Confavreux1998,Vukusic2004]].`],
 [5,"NICE NG220 publishes which regimen for a relapse that affects usual tasks?",["Oral methylprednisolone 0.5 g daily for 5 days, within 14 days of onset","Oral prednisone 1 mg/kg for 14 days","A home supply of steroids for future relapses","Prednisolone 30 mg daily"],0,`IV 1 g daily for 3–5 days is the alternative; lower doses and home supplies are advised against [[NICE2022]].`],
 [5,"In the Optic Neuritis Treatment Trial, oral prednisone 1 mg/kg alone:",["Beat IV methylprednisolone","Was no better than placebo and raised the risk of new optic neuritis","Cured optic neuritis","Is now standard care"],1,`RR 1.79 for new optic neuritis [[Beck1992]]. The difference from oral high-dose methylprednisolone is dose, not route [[LePage2015]].`],
 [5,"In TRIUMPHANT-MS, which fatigue drug beat placebo?",["Modafinil","Amantadine","Methylphenidate","None of them"],3,`None was superior, and adverse events were more frequent [[Nourbakhsh2021]].`],
 [5,"In a Cochrane review, exercise in MS:",["Triggered relapses","Should be avoided","Reduced fatigue without more relapses","Only helped if done in water"],2,`Fatigue SMD −0.53; relapses 25 versus 26 [[Heine2015]]. NICE says exercise does not harm MS [[NICE2022]].`],
 [5,"Dalfampridine (fampridine) is contraindicated in:",["A history of seizures or CrCl of 50 mL/min or less","Hypertension","Age over 50","Spasticity"],0,`Seizure risk rises with dose [[FDAdalfampridine]].`],
 [5,"NICE NG220's first-line drug for spasticity with treatment goals is:",["Gabapentin","Oral baclofen","Nabiximols","Dantrolene"],1,`Gabapentin is second-line or added; NICE asks clinicians first to look for aggravating factors such as infection or pressure ulcers [[NICE2022]].`],
 [5,"After each IV ocrelizumab infusion, the label calls for observation of at least:",["15 minutes","1 hour","6 hours","No observation"],1,`At least 1 hour, and patients are told reactions can occur up to 24 hours later [[OcrevusLabel2026]].`],
 [5,"Natalizumab post-infusion observation per the label is:",["Never required","6 hours after every infusion","1 hour after each of the first 12 infusions","2 hours after the first infusion only"],2,`Then by clinical judgment if no hypersensitivity has occurred [[TyrukoLabel2025]]. The alemtuzumab label requires 2 hours after each infusion [[LemtradaLabel2025]].`],
 [5,"The fumarate labels ask for a CBC with lymphocyte count:",["Weekly for life","Only if symptoms appear","Before starting, at 6 months and every 6–12 months","Once, before the first dose"],2,`The labels advise considering interruption if lymphocytes stay below 0.5 × 10⁹/L for more than 6 months [[TecfideraLabel2025,VumerityLabel2025]].`],
 [5,"Before diagnosing a relapse, NICE NG220 asks clinicians to rule out in particular:",["Thyroid disease","Migraine","Vitamin B12 deficiency","Urinary and respiratory infection"],3,`NICE asks for this first [[NICE2022]]. In one prospective study, exacerbation risk was 2.1 times higher from 2 weeks before to 5 weeks after a systemic infection [[Buljevac2002]].`],
 [5,"A glatiramer acetate immediate post-injection reaction is:",["Flushing, chest pain or palpitations within seconds to minutes of injection","A rash weeks later","An early sign of PML","A seizure"],0,`At least two of flushing, chest pain, palpitations, tachycardia, anxiety, dyspnoea, throat constriction or urticaria; about 16% on 20 mg/mL [[CopaxoneLabel2026]].`],
 [6,"Who lectured on 'sclérose en plaques' in 1868 and established it as a distinct disease?",["Robert Carswell","Jean-Martin Charcot","James Dawson","Thomas Rivers"],1,`Charcot, at La Salpêtrière, working with Vulpian [[Zalc2018]].`],
 [6,"Charcot's classic triad is:",["Headache, vomiting and papilloedema","Fever, rash and arthritis","Nystagmus, dysarthria and ataxia with intention tremor","Optic neuritis, myelitis and area postrema syndrome"],2,`The triad from his 1868 description [[Zalc2018]].`],
 [6,"Whose pathological atlas depicted MS lesions by 1838?",["Cruveilhier","Kurtzke","Charcot","Carswell"],3,`Carswell's plate predates Cruveilhier's, which cannot be earlier than 1841; Zalc notes some doubt remains [[Compston1988,Zalc2018]].`],
 [6,"Experimental autoimmune encephalomyelitis (EAE) began with:",["Rivers' brain-tissue injections in monkeys (1933 and 1935)","The 1981 NMR study","Dawson's 1916 histology","The 1965 Schumacher criteria"],0,`Repeated injection of rabbit brain tissue caused encephalomyelitis with myelin loss [[Rivers1933,Rivers1935]].`],
 [6,"The first disease-modifying therapy approved by the FDA for MS was:",["Glatiramer acetate (1996)","Interferon beta-1b (1993)","Natalizumab (2004)","Fingolimod (2010)"],1,`Betaseron, 23 July 1993 [[FDA-Betaseron]]; Copaxone followed on 20 December 1996 [[FDA-Copaxone]].`],
 [6,"What did the McDonald 2001 criteria introduce?",["The optic nerve as a fifth location","CSF bands replacing DIT","MRI evidence into the diagnosis","The κ-FLC index"],2,`2001 brought MRI in [[McDonald2001]]; CSF bands for DIT came in 2017 [[Thompson2018]] and the optic nerve and κ-FLC in 2024 [[Montalban2025]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(MS_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=MS_QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${MS_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
const MS_GL=[
 ["9-Hole Peg Test (9HPT)",`Timed test of hand dexterity: placing and removing nine pegs. A 20% change is the commonly used threshold for meaningful worsening [[Feys2017]].`,"edss"],
 ["Accelerated elimination",`Washing teriflunomide out of the body with cholestyramine or activated charcoal over 11 days, for example before a planned pregnancy [[AubagioLabel2026]].`,"safety"],
 ["Activity (course modifier)",`Clinical relapses and/or MRI activity (gadolinium-enhancing or new or enlarging T2 lesions), assessed at least yearly; used to label any phenotype active or not active [[Lublin2014]].`,"course"],
 ["ADEM",`Acute disseminated encephalomyelitis: a demyelinating illness with encephalopathy, commoner in children. In children with ADEM, the 2024 MS criteria apply only after a further typical attack or new typical lesions more than 90 days after onset [[IACCTMS2025Slides]].`,"ddx"],
 ["Adherence",`Taking a medicine as prescribed. Reported adherence to MS DMTs ranges widely, and claims data showed no difference between self-injected and oral drugs [[Menzin2013,Munsell2017]].`,"nursing"],
 ["aHSCT",`Autologous haematopoietic stem cell transplantation: chemotherapy depletes the immune system, which is then rebuilt from the person's own stem cells. Studied mainly in highly active relapsing MS [[Muraro2025]].`,"cure"],
 ["Alemtuzumab",`Anti-CD52 antibody that depletes T and B cells, NK cells and monocytes; given in two yearly courses, with long monitoring for secondary autoimmunity [[LemtradaLabel2025]].`,"dmt"],
 ["Annualised relapse rate (ARR)",`The number of relapses per person per year; the usual primary endpoint in relapsing-MS trials.`,"ladder"],
 ["Anti-CD20 antibodies",`Ocrelizumab, ofatumumab, ublituximab (and off-label rituximab): antibodies that lyse pre-B and mature B cells, sparing stem cells and most plasma cells [[OcrevusLabel2026,Greenfield2018]].`,"dmt"],
 ["Anti-JCV antibody index",`A blood test for antibodies to the JC virus. Positivity and a higher index raise PML risk on natalizumab [[Ho2017]].`,"safety"],
 ["AQP4-IgG",`Antibody against aquaporin-4, the water channel on astrocytes; with at least one core clinical characteristic it defines AQP4-positive NMOSD. Cell-based assays are recommended [[Wingerchuk2015]].`,"ddx"],
 ["Area postrema syndrome",`Intractable hiccups or nausea and vomiting from a lesion in the medulla; an NMOSD core characteristic [[Wingerchuk2015]].`,"ddx"],
 ["Assisted reproductive technology (ART)",`Fertility treatment such as IVF. Pooled case series showed more relapses in the 3 months after ART; the authors' own prospective cohort did not [[Bove2020]].`,"living"],
 ["Attack (relapse)",`Patient-reported symptoms with objective findings typical of an inflammatory demyelinating CNS event, lasting at least 24 hours, without fever or infection [[Solomon2026]].`,"relapse"],
 ["B cell",`Lymphocyte that presents antigen and makes cytokines and antibodies. Benefit from B-cell depletion appears before antibody levels fall, pointing to antigen presentation and cytokines rather than antibody [[Reich2018]].`,"immune"],
 ["Baclofen",`Muscle relaxant and the NICE first-line oral drug for spasticity [[NICE2022]]. It can also be given intrathecally through a pump [[Rizzo2004]].`,"symptoms"],
 ["Benign MS",`A severity label for mild disability after many years. The 2013 revision says it should be used only in hindsight and with caution [[Lublin2014]].`,"course"],
 ["Blood-brain barrier",`The sealed endothelium of CNS vessels. In a new lesion it leaks gadolinium, which is how active lesions are seen on MRI [[Reich2018]].`,"immune"],
 ["Braden Scale",`Six-item nursing tool for pressure-ulcer risk: sensory perception, moisture, activity, mobility, friction and shear, nutrition [[Bergstrom1987]].`,"nursing"],
 ["Breakthrough disease",`Disease activity on an established DMT: in AAN 2018 terms, 1 or more relapses, 2 or more new MRI lesions or increased disability within a year, in an adherent patient [[RaeGrant2018]].`,"ladder"],
 ["BTK inhibitor",`Oral drug blocking Bruton's tyrosine kinase in B cells and microglia; CNS-penetrant ones may reach smouldering inflammation behind the barrier [[Kramer2023]].`,"cure"],
 ["CAR-T cells",`A patient's T cells engineered to kill a target such as CD19 or BCMA on B or plasma cells; early reports exist in progressive MS [[Fischbach2024,Qin2025]].`,"cure"],
 ["CCSVI",`Chronic cerebrospinal venous insufficiency, a proposed venous cause of MS that blinded imaging and a sham-controlled trial rejected [[Traboulsee2014,Zamboni2018]].`,"cure"],
 ["CD8+ T cell",`Cytotoxic T cell; the dominant lymphocyte in MS lesions, often clonally expanded [[MachadoSantos2018,Babbe2000]].`,"immune"],
 ["Central vein sign (CVS)",`A thin dark line or dot through the centre of a white-matter lesion on susceptibility MRI: the vein the lesion formed around. Supportive evidence in McDonald 2024 [[Montalban2025]].`,"dx"],
 ["Charcot's triad",`Nystagmus, dysarthria and ataxia with intention tremor, from Charcot's 1868 lectures [[Zalc2018]].`,"history"],
 ["Chronic active lesion",`A lesion with an inactive centre and an active rim of microglia and macrophages that slowly expands; also called mixed active/inactive or smouldering [[Kuhlmann2017]].`,"immune"],
 ["Cladribine",`Oral purine analogue that builds up in lymphocytes and depletes them; given as two yearly short courses [[MavencladLabel2026]].`,"dmt"],
 ["Clemastine",`An old antihistamine with antimuscarinic action that shortened VEP latency in ReBUILD; a TRAP-MS arm in people with PIRA was stopped for safety [[Green2017,Kocot2025]].`,"cure"],
 ["Clinically isolated syndrome (CIS)",`A first clinical episode suggestive of demyelination that does not yet meet dissemination in time [[Lublin2014]].`,"course"],
 ["Compartmentalised inflammation",`Inflammation trapped inside the CNS behind a closed barrier [[Lassmann2012]], carried by tissue-resident CD8+ T cells and B cells, with activated microglia [[MachadoSantos2018,Kramer2023]].`,"cure"],
 ["Conduction block",`Failure of an impulse to cross a demyelinated segment; the main cause of the negative symptoms of a relapse [[Smith1999]].`,"myelin"],
 ["Confirmed disability accumulation",`A trial endpoint: an EDSS rise (1.0, or 0.5 from above 5.5) confirmed at 12 or 24 weeks [[Kappos2020]].`,"edss"],
 ["Cooling strategies",`Cooling garments, drinks or surroundings used before or during heat or exercise to lessen heat sensitivity [[Silarova2024,Schwid2003]].`,"living"],
 ["CYP2C9 genotyping",`Gene test required before siponimod, because the enzyme clears the drug [[MayzentLabel2026]].`,"safety"],
 ["Dalfampridine (fampridine)",`Prolonged-release 4-aminopyridine, a potassium-channel blocker labelled to improve walking speed [[FDAdalfampridine]].`,"symptoms"],
 ["Dawson's fingers",`Periventricular lesions running perpendicular to the ventricles along the medullary veins [[Filippi2019]].`,"dx"],
 ["Demyelination",`Loss of the myelin sheath, which slows or blocks conduction along the axon [[Smith1999]].`,"myelin"],
 ["Detrusor overactivity",`Involuntary bladder-muscle contractions causing urgency and frequency; found in 42.9% of people with MS on urodynamics in a meta-analysis [[AlDandan2020]].`,"symptoms"],
 ["Disease-modifying therapy (DMT)",`A drug that reduces relapses and MRI activity and may slow disability, as opposed to a symptomatic treatment.`,"dmt"],
 ["Dissemination in space (DIS)",`Evidence of lesions in at least two separate parts of the CNS [[Thompson2018,Montalban2025]].`,"dx"],
 ["Dissemination in time (DIT)",`Evidence that lesions arose at different times: a new lesion on follow-up, enhancing and non-enhancing lesions together, or a second attack [[Filippi2023]].`,"dx"],
 ["Dysphagia",`Difficulty swallowing; common in MS and a risk for aspiration pneumonia [[Mirmosayyeb2023,Fedeli2023]].`,"nursing"],
 ["EAE",`Experimental autoimmune encephalomyelitis, the main animal model of MS, induced by immunisation with CNS antigens [[Constantinescu2011]].`,"immune"],
 ["Early high-efficacy therapy",`Starting with a high-efficacy DMT rather than stepping up; favoured by observational studies, with randomised trials awaited [[He2020,Harding2019]].`,"ladder"],
 ["EBNA1",`Epstein-Barr virus nuclear antigen 1. Antibodies to it cross-react with the CNS proteins GlialCAM and anoctamin-2 [[Lanz2022,Tengvall2019]].`,"risk"],
 ["EDSS",`Expanded Disability Status Scale: 0 (normal) to 10 (death due to MS) in half steps, built on eight Functional Systems and, from 4.0, on walking [[Kurtzke1983]].`,"edss"],
 ["Energy conservation",`Planning, pacing and prioritising activities to manage fatigue; a meta-analysis of 2 trials found short-term benefit [[Blikman2013]], but a later trial found it no better than nurse information on fatigue [[Blikman2017]].`,"living"],
 ["Epstein-Barr virus (EBV)",`Herpesvirus that causes glandular fever; infection appears to precede nearly all MS [[Bjornevik2022]].`,"risk"],
 ["Escalation",`Starting with a moderate-efficacy DMT and switching up when there is breakthrough disease [[Montalban2018]].`,"ladder"],
 ["Extended-interval dosing",`Giving natalizumab every 6 weeks instead of 4 to lower PML risk; NOVA tested it [[Foley2022]], and the US label still states every 4 weeks [[TyrukoLabel2025]].`,"ladder"],
 ["Fatigue",`Overwhelming tiredness, reported by 95% of people in a European survey [[Kobelt2017]]; a meta-analysis put global prevalence at 59.1%, varying with the instrument [[Yi2024]]. Heat and biological, physical or emotional stress can bring it on [[NICE2022]].`,"symptoms"],
 ["First-dose bradycardia",`The fall in heart rate within hours of a first S1P modulator dose. The fingolimod label requires at least 6 hours of observation; siponimod uses titration, with first-dose monitoring for people with some heart conditions [[GilenyaLabel2026,MayzentLabel2026]].`,"safety"],
 ["FLAIR (3D)",`Fluid-attenuated MRI sequence that dims CSF so lesions stand out; the core brain sequence for diagnosis and monitoring [[Wattjes2021]].`,"dx"],
 ["Fumarates",`Dimethyl and diroximel fumarate, oral DMTs that activate the Nrf2 pathway (the label calls the therapeutic mechanism unknown); flushing and gut upset are common early [[TecfideraLabel2025]].`,"dmt"],
 ["Functional Systems",`The eight domains scored for the EDSS: pyramidal, cerebellar, brainstem, sensory, bowel and bladder, visual, cerebral and other [[Kurtzke1983]].`,"edss"],
 ["Gadolinium enhancement",`Contrast leaking through a broken blood-brain barrier, marking a lesion that is currently active; it fades within weeks [[Cotton2003]].`,"relapse"],
 ["GFAP",`Glial fibrillary acidic protein, an astrocyte protein measured in blood as a candidate marker of progression [[Meier2023]].`,"cure"],
 ["Glatiramer acetate",`A mixture of synthetic polypeptides injected under the skin; one of the first DMTs [[CopaxoneLabel2026]].`,"dmt"],
 ["HLA-A*02:01",`A class I HLA allele that protects against MS [[Moutsianas2015]].`,"risk"],
 ["HLA-DRB1*15:01",`The HLA class II allele that is the strongest single genetic risk factor for MS [[Moutsianas2015]].`,"risk"],
 ["IgG index",`Ratio comparing CSF and serum IgG to albumin; not a sufficient substitute for oligoclonal bands or κ-FLC [[Deisenhammer2025]].`,"dx"],
 ["Infratentorial lesion",`A lesion in the brainstem, cerebellar peduncles or cerebellum [[Solomon2026]].`,"dx"],
 ["Infusion reaction",`A reaction during or up to 24 hours after an antibody infusion; premedication and post-infusion observation are label requirements [[OcrevusLabel2026]].`,"nursing"],
 ["Interferon beta",`Injected cytokine DMTs (beta-1a, beta-1b, peginterferon); flu-like symptoms are common at the start [[RebifLabel2025]].`,"dmt"],
 ["Intermittent self-catheterisation",`Passing a catheter several times a day to empty a bladder that does not empty fully [[Fowler2009]].`,"symptoms"],
 ["JC virus",`A common polyomavirus that can reactivate in the brain to cause PML [[TyrukoLabel2025]].`,"safety"],
 ["Juxtacortical lesion",`A lesion touching the cortex with no white matter in between [[Solomon2026]].`,"dx"],
 ["κ-FLC index",`Kappa free light chain index: CSF/serum κ-FLC divided by CSF/serum albumin; a value of 6.1 or more counts as positive CSF in McDonald 2024 [[Deisenhammer2025]].`,"dx"],
 ["LETM",`Longitudinally extensive transverse myelitis: a cord lesion over 3 or more vertebral segments, typical of NMOSD [[Wingerchuk2015]].`,"ddx"],
 ["Lhermitte phenomenon",`An electric sensation down the spine or limbs on bending the neck; a positive symptom of demyelinated axons [[Smith1999]].`,"symptoms"],
 ["Live attenuated vaccine",`A vaccine with weakened live organisms. ECTRIMS/EAN 2023 advises avoiding them on immunosuppressive DMTs and giving them at least 4 weeks before starting (6 for ocrelizumab and alemtuzumab) [[OteroRomero2023]].`,"safety"],
 ["Lymphopenia",`A low lymphocyte count, expected with cladribine and monitored with fumarates and S1P modulators [[MavencladLabel2026,TecfideraLabel2025,GilenyaLabel2026]].`,"safety"],
 ["McDonald criteria",`The international MS diagnostic criteria, first published in 2001 and revised in 2005, 2010, 2017 and 2024 [[McDonald2001,Montalban2025]].`,"dx"],
 ["MFIS",`Modified Fatigue Impact Scale, with physical, cognitive and psychosocial subscales [[Learmonth2013]].`,"nursing"],
 ["Microglia",`Resident immune cells of the CNS; activated, inflamed microglia line the rims of chronic active lesions [[Zrzavy2017,Absinta2021]].`,"immune"],
 ["Misdiagnosis",`Labelling a person with MS who does not have it; pooled about 15%, and migraine was the commonest true diagnosis in US series [[Zurrer2024,Solomon2016,Kaisey2019]].`,"ddx"],
 ["Mitoxantrone",`An older cytotoxic drug for worsening MS, limited by heart damage and leukaemia risk [[MitoxantroneLabel2025]].`,"dmt"],
 ["MOG-IgG",`Antibody against myelin oligodendrocyte glycoprotein; its presence defines MOGAD [[Banwell2023]].`,"ddx"],
 ["MOGAD",`MOG antibody-associated disease, a separate demyelinating disease with optic neuritis, myelitis or ADEM [[Banwell2023]].`,"ddx"],
 ["Molecular mimicry",`A virus protein resembling a self protein, so the immune response cross-reacts; proposed for EBNA1 and GlialCAM [[Lanz2022]].`,"risk"],
 ["MS specialist nurse",`A nurse who supports diagnosis, treatment starts, monitoring, adherence and self-management in MS [[Burke2011,NICE2022]].`,"nursing"],
 ["MSFC",`MS Functional Composite: timed 25-foot walk, 9-hole peg test and a cognitive test, averaged as z-scores [[Cutter1999]].`,"edss"],
 ["Natalizumab",`Anti-α4 integrin antibody infused every 4 weeks that blocks immune-cell entry to the CNS; PML is the main risk [[TyrukoLabel2025]].`,"dmt"],
 ["NEDA-3",`No evident disease activity: no relapses, no confirmed disability progression and no new MRI activity [[Giovannoni2015]].`,"ladder"],
 ["Neurofilament light chain (NfL)",`A neuron-specific protein released when axons are damaged, measured in blood; not a diagnostic test [[Benkert2022,Deisenhammer2025]].`,"myelin"],
 ["NMOSD",`Neuromyelitis optica spectrum disorder, often with AQP4-IgG, which can mimic MS; several MS DMTs may worsen it [[Wingerchuk2015]].`,"ddx"],
 ["No better explanation",`The rule that MS is diagnosed only after other causes have been considered and excluded [[Solomon2026]].`,"dx"],
 ["Node of Ranvier",`The short gap between myelin segments where sodium channels cluster and the impulse is regenerated [[ArancibiaCarcamo2014]].`,"myelin"],
 ["OCT",`Optical coherence tomography: a light scan that measures retinal layer thickness; an inter-eye difference can show optic nerve involvement [[Saidha2025]].`,"dx"],
 ["Oligoclonal bands (OCB)",`Bands of IgG made inside the CNS, seen in CSF but not serum; present in most people with MS [[Dobson2013]].`,"dx"],
 ["Oligodendrocyte",`The CNS cell that makes myelin, wrapping internodes on many axons [[Kister2022]].`,"myelin"],
 ["OPC",`Oligodendrocyte precursor cell; activated, it migrates, multiplies and matures to remyelinate [[Franklin2017]].`,"cure"],
 ["Optic neuritis",`Inflammation of the optic nerve with loss of vision; the site of 34.1% of first attacks in the Barcelona cohort [[Tur2023]].`,"course"],
 ["Paramagnetic rim lesion (PRL)",`A lesion with an iron-laden rim on susceptibility MRI; a candidate marker of a chronic active lesion and supportive evidence in McDonald 2024 [[Absinta2019,Montalban2025]].`,"dx"],
 ["Periventricular lesion",`A lesion touching the lateral ventricles with no white matter in between [[Solomon2026]].`,"dx"],
 ["PHQ-9",`Nine-item depression questionnaire, with high sensitivity for major depression in MS [[Marrie2018]].`,"nursing"],
 ["PIRA",`Progression independent of relapse activity: worsening with no relapse around it, now seen from early in the disease [[Kappos2020,Lublin2022]].`,"course"],
 ["PML",`Progressive multifocal leukoencephalopathy: a brain infection by JC virus, the main risk of natalizumab [[TyrukoLabel2025]].`,"safety"],
 ["Post-void residual",`Urine left in the bladder after voiding, measured by ultrasound to guide bladder management [[NICE2012CG148]].`,"symptoms"],
 ["Postpartum relapse",`A relapse in the months after giving birth. In PRIMS, rates rose for about 3 months before returning to baseline [[Confavreux1998]]; a later cohort found no rise above pre-pregnancy rates [[LangerGould2020]].`,"living"],
 ["PPMS",`Primary progressive MS: gradual worsening from onset without preceding relapses [[Lublin2014]].`,"course"],
 ["PRIMS",`The Pregnancy in Multiple Sclerosis study, which mapped relapse rates before, during and after pregnancy [[Confavreux1998]].`,"living"],
 ["Progressive relapsing MS",`A 1996 phenotype removed in 2013; such people are now called primary progressive, active [[Lublin2014]].`,"history"],
 ["Pseudo-relapse",`Temporary worsening of old symptoms from infection, heat or stress, without new inflammation [[NICE2022]].`,"relapse"],
 ["Radiologically isolated syndrome (RIS)",`MS-like MRI lesions found by chance in someone with no symptoms [[IACCTMS2025Slides]].`,"course"],
 ["Rebound",`Disease activity above pre-treatment levels after stopping natalizumab or an S1P modulator [[Hatcher2016,GilenyaLabel2026]].`,"ladder"],
 ["Red flags",`Features that point away from MS, such as hyperacute onset, severe deficits or a CSF cell count above 50/μL [[Miller2008,Solomon2026]].`,"ddx"],
 ["Relapse-associated worsening (RAW)",`In trials, a disability increase that begins within 90 days of a relapse [[Kappos2020]].`,"course"],
 ["Remyelination",`Formation of new myelin on demyelinated axons; shadow plaques are its trace [[Franklin2017,Prineas1993]].`,"cure"],
 ["RRMS",`Relapsing-remitting MS: attacks followed by full or partial recovery [[Lublin2014]].`,"course"],
 ["S1P receptor modulators",`Fingolimod, siponimod, ozanimod and ponesimod: oral DMTs that keep lymphocytes in lymph nodes [[GilenyaLabel2026,MayzentLabel2026]].`,"dmt"],
 ["Saltatory conduction",`The impulse jumping from node to node along a myelinated axon, which makes it fast [[Kister2022]].`,"myelin"],
 ["Schumacher criteria",`The 1965 criteria for MS therapy trials, the forerunner of later diagnostic criteria [[Schumacher1965]].`,"history"],
 ["Sclérose en plaques",`Charcot's name for MS in his 1868 lectures at La Salpêtrière [[Zalc2018]].`,"history"],
 ["SDMT",`Symbol Digit Modalities Test of processing speed; a change of about 4 points or 10% is considered meaningful [[Benedict2017]].`,"edss"],
 ["Secondary autoimmunity",`New autoimmune disease, mostly thyroid, after immune reconstitution following alemtuzumab [[Ruck2015]].`,"safety"],
 ["Select-6",`The McDonald 2024 central vein sign rule: at least 6 CVS-positive lesions; with fewer than 10 lesions, CVS-positive must outnumber CVS-negative [[Montalban2025,Solomon2026]].`,"dx"],
 ["Shadow plaque",`A lesion that has remyelinated. New lesions normally remyelinate unless new activity interrupts them [[Prineas1993]].`,"myelin"],
 ["Smouldering MS",`A hypothesis: a diffuse, compartmentalised process present from early disease that drives disability beyond relapses [[Giovannoni2022]].`,"course"],
 ["Smouldering-associated worsening (SAW)",`A 2024 consensus term covering physical and cognitive decline from smouldering processes, broader than PIRA [[Scalfari2024]].`,"course"],
 ["Spasticity",`Stiffness and spasms from upper motor neuron damage; NICE lists spasms, stiffness, pain or restriction with movement as signs to look for [[NICE2022]].`,"symptoms"],
 ["SPMS",`Secondary progressive MS: gradual worsening after an initial relapsing course, usually recognised in hindsight [[Lublin2014]].`,"course"],
 ["Th17 cell",`A CD4+ T-cell subset making IL-17 and IL-22, which loosen blood-brain barrier junctions [[Kebir2007]].`,"immune"],
 ["Timed 25-Foot Walk (T25FW)",`The time to walk 25 feet as fast as safely possible; a 20% rise is often used as meaningful change [[Kaufman2000]].`,"edss"],
 ["Trigeminal neuralgia",`Brief stabbing facial pain; about 3.4% of people with MS have it in a meta-analysis [[Houshi2022]].`,"symptoms"],
 ["Uhthoff phenomenon",`Brief, reversible worsening with heat, exercise or fever from conduction failure in demyelinated axons [[Frohman2013]].`,"symptoms"],
 ["VEP",`Visual evoked potential: the delayed P100 wave shows slowed conduction in a demyelinated optic nerve [[Halliday1972,Saidha2025]].`,"dx"],
 ["Vitamin D (25-hydroxyvitamin D)",`The blood marker of vitamin D status; higher levels are linked to lower MS risk [[Munger2006]].`,"risk"],
 ["VLA-4",`α4β1 integrin on lymphocytes that lets them stick to inflamed vessels; natalizumab's target [[Yednock1992]].`,"immune"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup, and fold κ to k and hyphens away, so 'kFLC' finds 'κ-FLC' */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').toLowerCase().replace(/κ/g,'k').replace(/-/g,'');
  function render(){const q=norm(inp.value.trim());const L=MS_GL.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:MS_GL.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const MS_AREAN={A:'Epidemiology, course & history',B:'Genetics & risk factors',C:'Mechanism & pathology',D:'Diagnosis & differential',E:'Disease-modifying therapies',F:'Relapses, symptoms & living',G:'Research & cure',H:'Nursing care'};
const MS_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA','ISRCTN'];
const msSvc=s=>s.unverified?[]:MS_SVC.filter(x=>(s.validated||'').includes(x));
/* a few links in the source list were cut at a parenthesis inside the DOI; rebuild those from the DOI in the citation text */
const msLink=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(MS_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>msSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=MS_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=msSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${msLink(s)?`<a href="${esc(msLink(s))}" target="_blank" rel="noopener">${esc(msLink(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag">${MS_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
