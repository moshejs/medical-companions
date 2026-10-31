/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · The infection",2:"Part 2 · Diagnosis",3:"Part 3 · Treatment",4:"Part 4 · Prevention & control",5:"Part 5 · Living with TB",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: the infection ---- */
 [1,`How many people fell ill with TB, and how many died, in 2024?`,`10.7 million fell ill (131 per 100,000) and 1.23 million died, including 150,000 people with HIV [[WHO-GTR2025]]. These are population estimates.`],
 [1,`What share of the world's population has TB infection?`,`About a quarter: 23.0% (about 1.7 billion people) by modelling, and 24.8% by IGRA meta-analysis [[Houben2016,Cohen2019ERJ]].`],
 [1,`What separates TB infection from TB disease?`,`Macroscopic pathology. The ICE-TB consensus defines disease by visible pathology and splits it into subclinical and clinical states [[Coussens2024]]. TB infection is not contagious [[Drain2018,Coussens2024]].`],
 [1,`How large are the cough particles that carry culturable M. tuberculosis?`,`Small enough to breathe deep into the lung: 0.65–4.7 µm in 96.4% of cases [[Fennelly2012]].`],
 [1,`How many bacilli does it take to start an infection?`,`Very few: usually 1–5 tubercle bacilli [[Balasubramanian1994]].`],
 [1,`Why does TB treatment take months rather than days?`,`Partly because the bacillus grows slowly: a mean generation time of 23.1 hours even in a "fast" chemostat population [[Jeeves2015]], and treatment must reach slow and non-replicating bacilli [[Mitchison2000]].`],
 [1,`What makes the bacillus acid-fast and hard for drugs to enter?`,`Its cell wall: peptidoglycan, arabinogalactan and a thick layer of mycolic acids, "a truly special lipid barrier" [[Brennan2003]] that keeps many compounds out [[Hett2008]].`],
 [1,`Why do IGRAs stay specific after BCG vaccination?`,`Their antigens, ESAT-6 and CFP-10, are encoded in RD1, which is deleted from every BCG strain [[Harboe1996,Mahairas1996,Andersen2000]].`],
 [1,`How does M. tuberculosis survive inside a macrophage?`,`Its phagosome fails to acidify below pH 6.3–6.5 and excludes the proton-ATPase [[SturgillKoszycki1994]]; later, ESX-1 lets it rupture into the cytosol [[vanderWel2007,Simeone2012]].`],
 [1,`Why is there a gap of weeks before a skin or blood test turns positive?`,`T-cell priming begins in the mediastinal lymph node only after about 10 days in mice, and the bacteria spread before T cells arrive [[Reiley2008,Wolf2008,Chackerian2002]].`],
 [1,`Which two cytokines are essential for containing TB in mice?`,`Interferon-γ and TNF. Granulomas still form without them, but necrosis and uncontrolled growth follow [[Flynn1993,Flynn1995]].`],
 [1,`How much oxygen is inside a granuloma?`,`Almost none: 1.6 ± 0.7 mm Hg measured in 3 mm rabbit lesions [[Via2008]].`],
 [1,`When does TB disease usually appear after infection?`,`Early: in Amsterdam contacts, 75% of cases within 1 year and 97% within 2 years [[Behr2018]].`],
 [1,`How much does diabetes raise the risk of TB disease?`,`About threefold (RR 3.11, 95% CI 2.27–4.26) [[Jeon2008]].`],
 [1,`Which anti-TNF drugs carry the highest TB risk?`,`The monoclonal antibodies: SIR 18.6 for infliximab and 29.3 for adalimumab, against 1.8 for the soluble receptor etanercept [[Tubach2009]].`],
 [1,`Does everyone with pulmonary TB spread it equally?`,`No. Only 28% of people with culture-confirmed TB produced culturable cough aerosols [[Fennelly2012]], and only high-aerosol producers predicted household infection (adjusted OR 4.81) [[JonesLopez2013]].`],
 /* ---- Part 2: diagnosis ---- */
 [2,`What is the WHO four-symptom screen for people with HIV?`,`Any one of current cough, fever, night sweats or weight loss: sensitivity 78.9%, specificity 49.6% [[Getahun2011]].`],
 [2,`How well does a cough of 2 weeks or more find TB in community screening?`,`It is specific (94%) but insensitive (42%), so it misses about half [[VantHoog2022]].`],
 [2,`How sensitive is any chest X-ray abnormality for pulmonary TB in screening?`,`About 95% [[VantHoog2022]].`],
 [2,`How is a Mantoux tuberculin skin test given and read?`,`0.1 mL of 5 TU PPD intradermally into the forearm, read at 48–72 hours, measuring induration only [[ATS2000]].`],
 [2,`Who counts as TST-positive at 5 mm?`,`Close contacts, people who are immunosuppressed (including HIV), people taking TNF blockers, and people with current or past TB on X-ray [[Lewinsohn2017]].`],
 [2,`Who counts as TST-positive at 10 mm, and at 15 mm?`,`10 mm: other people at increased risk, such as people born in high-incidence countries or with occupational exposure. 15 mm: everyone else [[Lewinsohn2017]].`],
 [2,`Does infant BCG make a later skin test positive?`,`Rarely after 10 years: only 1% had a TST of 10 mm or more 10 or more years after infant BCG [[Farhat2006]].`],
 [2,`What are the IGRA positive cut-offs?`,`QFT: 0.35 IU/mL or more. T-SPOT.TB: 8 spots or more, borderline at 5–7 [[Mazurek2010]].`],
 [2,`Can a TST or IGRA tell TB infection from TB disease?`,`No. Neither does, and both predict progression poorly: positive predictive values under about 3% [[Lewinsohn2017,Hamada2023]].`],
 [2,`How sensitive are sputum smears?`,`Three smears give about 70% sensitivity; fluorescence microscopy adds about 10% [[Lewinsohn2017]].`],
 [2,`What does a single Xpert MTB/RIF test detect, and how fast?`,`98.2% of smear-positive and 72.5% of smear-negative culture-positive TB, with rifampicin resistance, in under 2 hours [[Boehme2010]].`],
 [2,`Where does most rifampicin resistance lie in the genome?`,`In one short stretch of rpoB, the RRDR: more than 95% of rifampicin-resistant isolates [[Seifert2015,Telenti1993]].`],
 [2,`What are the two commonest isoniazid-resistance mutations?`,`katG315 (64%) and the inhA −15 promoter mutation (19%); inhA mutations can also cause ethionamide cross-resistance [[Seifert2015,Banerjee1994]].`],
 [2,`Who benefits most from the urine LF-LAM test?`,`Very sick inpatients with HIV and low CD4 counts. LAM-guided treatment cut 8-week mortality by 17% (relative) in a trial [[Peter2016,Bjerrum2019]].`],
 [2,`What is the most common site of extrapulmonary TB?`,`Lymph nodes (40.4% of US extrapulmonary cases), then pleura (19.8%) [[Peto2009]].`],
 [2,`Define MDR-TB, pre-XDR-TB and XDR-TB.`,`MDR: rifampicin plus isoniazid resistance. Pre-XDR: rifampicin resistance plus a fluoroquinolone. XDR: pre-XDR plus bedaquiline or linezolid [[WHO-Mod4-2025,Viney2021]].`],
 [2,`Is most MDR-TB acquired during treatment or transmitted?`,`Transmitted: a median 95.9% of incident MDR-TB in a global model [[Kendall2015]].`],
 /* ---- Part 3: treatment ---- */
 [3,`What does 2HRZE/4HR mean?`,`Two months of isoniazid, rifampicin, pyrazinamide and ethambutol, then four months of isoniazid and rifampicin, daily (WHO, strong, high certainty) [[WHO-Mod4-2025]].`],
 [3,`Which drug does the early killing, and which sterilises?`,`Isoniazid kills about 95% of organisms in the first two days [[Mitchison2000]]; rifampicin is the key sterilising drug [[Jindani2003]].`],
 [3,`What does each of R, Z and E target?`,`Rifampicin blocks the RNA polymerase β subunit [[Campbell2001Rif]]; pyrazinamide needs pncA and acid pH [[Zhang2003PZA]]; ethambutol blocks arabinan synthesis via embCAB [[Telenti1997]].`],
 [3,`Who is eligible for the 4-month 2HPMZ/2HPM regimen?`,`WHO: age 12 or over with drug-susceptible pulmonary TB, weight at least 40 kg; not for CD4 below 100, pregnancy, or meningitis, bone or disseminated TB [[WHO-Mod4-2025]].`],
 [3,`What did SHINE show?`,`Four months is enough for children aged 3 months to 16 years with non-severe TB: 3% events in both arms [[Turkova2022,WHO-Mod4-2025]].`],
 [3,`Rifampin and rifapentine: with or without food?`,`The labels say rifampin on an empty stomach (1 hour before or 2 hours after a meal) and rifapentine with food [[FDA-Rifampin,FDA-Priftin]].`],
 [3,`Why does rifampicin cause so many interactions?`,`It strongly induces CYP3A4 and P-glycoprotein, so hormonal contraception, methadone, warfarin and some protease inhibitors lose effect [[Niemi2003,FDA-Rifampin]].`],
 [3,`What ALT level makes ATS advise interrupting TB treatment?`,`More than 3 times the upper limit of normal with symptoms or jaundice, or more than 5 times without symptoms [[Saukkonen2006]].`],
 [3,`Which first-line drug causes the most major adverse events?`,`Pyrazinamide: 1.48 major events per 100 person-months, mainly hepatotoxicity and rash [[Yee2003]].`],
 [3,`What is 3HP, and its typical reaction?`,`12 weekly doses of rifapentine plus isoniazid. A flu-like systemic reaction occurred in 3.5%, and hepatotoxicity was lower than with 9H [[Sterling2011,Sterling2015]].`],
 [3,`How does 4R compare with 9H?`,`Non-inferior for preventing TB, with completion 15.1 points higher and less hepatotoxicity [[Menzies2018]].`],
 [3,`What preventive treatment does WHO recommend for contacts of people with MDR/RR-TB?`,`Six months of daily levofloxacin (WHO 2024, strong) [[WHO-Mod1-2024]].`],
 [3,`What is BPaLM?`,`Bedaquiline, pretomanid, linezolid (600 mg) and moxifloxacin for 6 months, from age 14 [[WHO-Mod4-2025]]. In TB-PRACTECAL unfavourable outcomes were 11% against 48% with standard care [[Nyangwa2022]].`],
 [3,`What did ZeNix show about linezolid?`,`600 mg for 26 weeks kept efficacy (91% favourable) and cut myelosuppression to 2% [[Conradie2022]].`],
 [3,`What is bedaquiline's boxed warning?`,`QTc prolongation; the label calls for ECG monitoring [[FDA-Sirturo]].`],
 [3,`Why were injectable agents dropped from DR-TB treatment?`,`Aminoglycosides caused hearing loss in about 40% [[Dillard2021]]; WHO no longer uses kanamycin or capreomycin [[WHO-Mod4-2025]].`],
 [3,`When should ART start in a person with HIV and TB?`,`Within 2 weeks of TB treatment, whatever the CD4 count, except in TB meningitis [[WHO-Mod4-2025,Torok2011]]. In CAMELIA, ART at 2 rather than 8 weeks cut deaths from 27% to 18% [[Blanc2011]].`],
 [3,`Do steroids help in TB meningitis?`,`Yes: they cut deaths by almost a quarter (RR 0.75) [[Prasad2016]].`],
 [3,`How is isoniazid-resistant, rifampicin-susceptible TB (Hr-TB) treated?`,`WHO: rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months [[WHO-Mod4-2025]].`],
 [3,`Which age group is most likely to progress quickly after infection?`,`Children under 2: in pre-chemotherapy studies infection often progressed to serious disease within 12 months [[Marais2004]].`],
 /* ---- Part 4: prevention & control ---- */
 [4,`What is BCG?`,`A live attenuated M. bovis strain, first given to a baby in 1921, and still the only licensed TB vaccine [[Lange2022]].`],
 [4,`What does BCG protect against best?`,`TB meningitis and miliary TB in young children: about one meningitis case prevented per 3,435 infant vaccinations [[Trunz2006,Mangtani2014]].`],
 [4,`How variable is BCG against adult pulmonary TB?`,`From 78% protection in the UK MRC trial (RR 0.22) to none in Chingleput, India (RR 1.05) [[Abubakar2013]].`],
 [4,`Did BCG revaccination of adolescents work?`,`The 2018 signal (45.4% against sustained QFT conversion) was not confirmed in the 2025 phase 2b trial (efficacy −3.8%) [[Nemes2018,Schmidt2025]].`],
 [4,`Why is BCG risky for infants with HIV?`,`Disseminated BCG disease: a pooled 992 per 100,000 vaccinated infants with HIV [[Hesseling2009BWHO]].`],
 [4,`What did the M72/AS01E phase 2b trial show?`,`49.7% efficacy over 3 years against pulmonary TB in IGRA-positive adults [[Tait2019]]. A phase 3 trial began in 2024 [[NCT06062238]].`],
 [4,`What is the hierarchy of TB infection control?`,`Administrative, then environmental, then respiratory protection. Administrative controls come first and matter most [[WHO-IPC2019,Jensen2005]].`],
 [4,`What does an airborne infection isolation (AII) room need?`,`Negative pressure of at least 0.01 inch water gauge and at least 12 air changes per hour (6 for rooms built before 2001) [[Jensen2005]].`],
 [4,`How much did surgical masks on people with MDR-TB cut transmission?`,`By 56%: guinea-pig infection fell from 76.6% to 40% [[Dharmadhikari2012]].`],
 [4,`What did upper-room UV light do in the Lima ward study?`,`Cut guinea-pig TB infection from 35% to 9.5% [[Escombe2009]].`],
 [4,`How well does opening windows ventilate a room?`,`A median 28 air changes per hour, more than twice the 12 ACH recommended for mechanically ventilated high-risk rooms [[Escombe2007]].`],
 [4,`When does a contact's infectious period start, and how fast is the first assessment?`,`Three months before the diagnosis; first contact assessment within 3 working days [[NTCA2005]].`],
 [4,`What is window prophylaxis?`,`Preventive treatment for contacts under 5 with a negative first test, once TB disease is excluded, until a retest at 8–10 weeks [[NTCA2005]].`],
 [4,`What are the End TB Strategy's 2035 targets?`,`A 90% fall in incidence and 95% fall in deaths against 2015, and no households facing catastrophic costs [[WHO-GTR2025]].`],
 [4,`What did the RATIONS trial show?`,`Food rations for household contacts cut TB incidence by 39–48% [[Bhargava2023Lancet]].`],
 /* ---- Part 5: living with TB ---- */
 [5,`How often do TB-affected households face catastrophic costs?`,`47% overall in national surveys, and 82% for drug-resistant TB, even though treatment itself is usually free [[WHO-GTR2025]].`],
 [5,`Which words replace "TB suspect" and "defaulter"?`,`"Person with presumptive TB" and "person lost to follow-up". The older terms were called coercive and blaming [[Zachariah2012]].`],
 [5,`Does direct observation improve cure over self-administered treatment?`,`Not substantially in a Cochrane review (RR 1.08, 95% CI 0.91–1.27) [[Karumbi2015]].`],
 [5,`How did video-observed treatment do in London?`,`70% completed at least 80% of observations in the first 2 months, against 31% on DOT [[Story2019]].`],
 [5,`Did smart pillboxes improve outcomes?`,`No: the 5-country ASCENT trials found no reduction in poor outcomes [[Jerene2025,Tadesse2025LDH]].`],
 [5,`How common is depression in people with TB?`,`A pooled 45%, and over half in people with MDR-TB [[Duko2020]].`],
 [5,`Can a parent breastfeed during TB treatment?`,`Guidance finds no absolute contraindication, and infection control should not usually separate a parent from their newborn [[Maugans2023]].`],
 [5,`What helps a person cough up a good sputum sample?`,`Instructions: they raised women's smear positivity 1.63-fold in a Pakistani trial [[Khan2007Lancet]].`],
 [5,`How is sputum induced safely?`,`Nebulised 3% hypertonic saline in a ventilated booth or AII room, with the health worker in at least an N95 respirator [[Jensen2005]].`],
 [5,`What eye checks does the ethambutol label ask for?`,`Visual acuity and colour discrimination before starting and periodically; monthly at doses above 15 mg/kg/day [[FDA-Ethambutol]].`],
 [5,`What happens after cure?`,`TB survivors have about 3 times the mortality of the general population (SMR 2.91) [[Romanowski2019]], and past TB is linked to COPD (OR 3.05) [[Byrne2015]].`],
 [5,`Should US health workers be retested every year?`,`No routine serial testing without a known exposure; a baseline test, and an annual symptom screen if TB infection is untreated [[Sosa2019]].`],
 /* ---- Part 6: history ---- */
 [6,`When did Koch announce the tubercle bacillus?`,`24 March 1882, the date now marked as World TB Day [[Barberis2017,CDC2018WTBD]].`],
 [6,`How old is the oldest TB DNA in human bones?`,`About 9,000 years, from Atlit-Yam, a submerged Neolithic village [[Hershkovitz2008]].`],
 [6,`Who showed TB was transmissible, and when?`,`Jean-Antoine Villemin, in 1865 [[Daniel2006,Cambau2014]].`],
 [6,`When and where was BCG first given to a baby?`,`In Paris on 18 July 1921, by mouth, to a newborn whose mother had died of TB [[Luca2013]].`],
 [6,`What happened at Lübeck in 1930?`,`73 of 250 vaccinated infants died; an inquiry blamed contamination with virulent bacilli in the local laboratory, not BCG itself [[Luca2013]].`],
 [6,`What made the 1948 MRC streptomycin trial a landmark?`,`Random allocation by sealed envelopes and blinded X-ray reading. It also showed resistance emerging on a single drug [[Crofton2006,MRC1948]].`],
 [6,`What did the 1959 Madras study show?`,`Treatment at home was as effective as sanatorium treatment [[TCCMadras1959]].`],
 [6,`When did isoniazid and rifampicin arrive?`,`Isoniazid in 1952; rifampicin entered clinical use in 1968 [[Murray2015,Sensi1983]].`],
 [6,`When did WHO declare TB a global emergency?`,`1993 [[John2013]].`],
 [6,`When did bedaquiline receive its first FDA approval?`,`28 December 2012, for MDR-TB [[FDA-NDA204384,Cox2014]].`]
];
const RV_MN=[
 ["RIPE","well known",`The four first-line drugs: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, given as 2HRZE/4HR (WHO letters: R, H, Z, E) [[WHO-Mod4-2025]].`],
 ["R is for red-orange","memory aid",`Rifampin can turn urine, sweat, sputum and tears orange, red or brown and stain soft contact lenses [[FDA-Rifampin]]; it also induces CYP3A4, so other drugs fall [[Niemi2003]].`],
 ["I for injured nerves, so add B6","memory aid",`Isoniazid can cause peripheral neuropathy through pyridoxine deficiency [[FDA-Isoniazid]]; pyridoxine 25–50 mg/day is listed alongside it [[Saukkonen2025]].`],
 ["P for painful toe (and liver)","memory aid",`Pyrazinamide inhibits urate excretion and is contraindicated in acute gout [[FDA-Pyrazinamide]]; it caused the most major adverse events of the four [[Yee2003]].`],
 ["E for eyes","memory aid",`Ethambutol causes optic neuritis; the label asks for acuity and colour testing, monthly above 15 mg/kg/day [[FDA-Ethambutol,Ezer2013]].`],
 ["5 · 10 · 15","well known",`TST cut-offs in mm of induration: 5 for contacts, HIV, immunosuppression and TNF blockers; 10 for other risk groups; 15 for no risk factors [[Lewinsohn2017]].`],
 ["3 with symptoms, 5 without","memory aid",`The ATS stop rule: ALT over 3 times normal with symptoms or jaundice, or over 5 times without [[Saukkonen2006]].`],
 ["FAST","well known",`Find cases Actively, Separate safely, Treat effectively: prompt, effective treatment at the centre of transmission control [[Tierney2022]].`],
 ["Three smears, 8 to 24, one at dawn","memory aid",`Ending precautions for suspected TB: three consecutive negative smears, 8–24 hours apart, at least one early-morning [[Jensen2005]].`],
 ["Rules before rooms before respirators","memory aid",`The hierarchy of controls: administrative first, then environmental, then respiratory protection [[WHO-IPC2019,Jensen2005]].`]
];
const RV_STEPS=[
 {from:0,at:.16,k:'R · rifampicin',t:'R: red-orange fluids',txt:`Rifampin can turn teeth, urine, sweat, sputum and tears yellow, orange, red or brown, and can permanently stain soft contact lenses; people should be told in advance [[FDA-Rifampin]]. It strongly induces CYP3A4, so hormonal contraception, methadone and warfarin lose effect [[Niemi2003,FDA-Rifampin]].`,pt:'Orange pee and tears are expected and harmless. Tell every doctor and pharmacist you take rifampicin, because it changes how other medicines work.',hook:'Rifampicin is a strong CYP3A4 inducer: the pill fails, methadone withdrawal follows, warfarin levels fall.'},
 {from:.2,at:.36,k:'I · isoniazid',t:'I: injured nerves, so add B6',txt:`Isoniazid can cause pyridoxine deficiency by competing with pyridoxal phosphate, which shows up as peripheral neuropathy [[FDA-Isoniazid]]. Pyridoxine (vitamin B6) 25–50 mg/day is listed with isoniazid [[Saukkonen2025]]. The isoniazid label's hepatitis rate rises with age: 3 per 1,000 at 20–34, 23 per 1,000 at 50–64 [[FDA-Isoniazid]].`,pt:'Tingling or burning in the hands or feet is a reason to call your TB team. Vitamin B6 helps protect the nerves.',hook:'Isoniazid neuropathy is prevented with pyridoxine (B6).'},
 {from:.4,at:.56,k:'P · pyrazinamide',t:'P: painful toe and liver',txt:`Pyrazinamide inhibits renal urate excretion and often raises uric acid; it is contraindicated in acute gout [[FDA-Pyrazinamide]]. In a Montreal cohort it caused the most major adverse events of the four drugs: 1.48 per 100 person-months, mostly hepatotoxicity and rash [[Yee2003]].`,pt:'Yellow eyes, dark urine, stomach pain or loss of appetite need a call to the TB team the same day.',hook:'Most hepatotoxic first-line drug: pyrazinamide (1.48 vs 0.49 isoniazid, 0.43 rifampin, 0.07 ethambutol per 100 person-months).'},
 {from:.6,at:.75,k:'E · ethambutol',t:'E: eyes',txt:`Ethambutol causes optic neuritis, usually reversible though irreversible blindness has been reported. The label asks for visual acuity testing before and during treatment, monthly above 15 mg/kg/day, with colour discrimination [[FDA-Ethambutol]]. Any visual impairment occurred in 22.5 per 1,000 people treated, permanent in 4.3 per 1,000 [[Ezer2013]].`,pt:'Blurry vision or trouble telling red from green is a reason to call your TB team straight away.',hook:'Ethambutol: optic neuritis; check acuity and red-green colour vision.'},
 {from:.8,at:.97,k:'2HRZE/4HR',t:'Together: six months',txt:`The four drugs run together for 2 months, then isoniazid and rifampicin continue for 4 months, daily (WHO, strong recommendation, high certainty) [[WHO-Mod4-2025]]. One drug alone lets rare resistant mutants take over; combining drugs makes double resistance vanishingly rare [[David1970]].`,pt:'Most people feel better within weeks, but finishing the full course is what cures TB. Treatment is free in most national programmes.',hook:'2HRZE/4HR: 2 months of four drugs, then 4 months of two.'}
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

  /* ---- mnemonic in motion: RIPE, one drug and one warning sign at a time ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const DR=[
    {l:'R',w:'R',n:'Rifampicin',sub:'orange fluids, CYP3A4',c:'--dR'},
    {l:'I',w:'H',n:'Isoniazid',sub:'nerves (B6), liver',c:'--dH'},
    {l:'P',w:'Z',n:'Pyrazinamide',sub:'liver, uric acid',c:'--dZ'},
    {l:'E',w:'E',n:'Ethambutol',sub:'eyes: acuity, colour',c:'--dE'}];
  /* where each drug lands on the body (local body coordinates) */
  const TGT=[[70,196],[56,262],[55,124],[70,30]];
  const ZONE=[[0,.2],[.2,.4],[.4,.6],[.6,.78]];
  /* the body, drawn in a 140 x 330 local box; fx: effect strengths 0..1 */
  function body(fx){
    let s=`<path d="M30 76Q70 62 110 76L106 206Q70 218 34 206Z" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.4"/>`;
    s+=`<path d="M32 82L14 190M108 82L126 190" style="stroke:var(--skin);stroke-width:15;stroke-linecap:round"/><path d="M32 82L14 190M108 82L126 190" style="fill:none;stroke:var(--skin-line);stroke-width:1;opacity:.5"/>`;
    s+=`<rect x="40" y="204" width="22" height="102" rx="10" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/><rect x="78" y="204" width="22" height="102" rx="10" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/>`;
    s+=`<ellipse cx="46" cy="312" rx="17" ry="7" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/><ellipse cx="94" cy="312" rx="17" ry="7" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.2"/>`;
    s+=`<rect x="62" y="54" width="16" height="16" style="fill:var(--skin)"/><circle cx="70" cy="34" r="26" style="fill:var(--skin);stroke:var(--skin-line);stroke-width:1.4"/>`;
    /* eyes: the irises dim as ethambutol's effect builds */
    [60,80].forEach(x=>{s+=`<ellipse cx="${x}" cy="30" rx="6" ry="4.2" style="fill:var(--panel);stroke:var(--skin-line);stroke-width:.8"/><circle cx="${x}" cy="30" r="2.6" style="fill:var(--ink);opacity:${f1(1-.55*fx.eye)}"/>`;
      if(fx.eye>0)s+=`<circle cx="${x}" cy="30" r="${f1(6+5*fx.eye)}" style="fill:none;stroke:var(${'--dE'});stroke-width:1.6;opacity:${f1(fx.eye)}"/>`});
    /* orange tears from rifampicin */
    if(fx.tear>0)[58,82].forEach((x,k)=>{const d=fx.tear*16;s+=`<path d="M${x} ${f1(36+d)}q-2.4 4 0 5.4q2.4-1.4 0-5.4Z" style="fill:var(--dR);opacity:${f1(Math.min(1,fx.tear*2))}"/>`});
    /* liver: the person's right side, on the viewer's left */
    s+=`<path d="${blob(55,124,17,31,1.35,.72,12,.12)}" style="fill:var(--blood);fill-opacity:${f1(.18+.5*fx.liver)};stroke:var(--vessel);stroke-width:${f1(1+1.6*fx.liver)}"/>`;
    if(fx.liver>.05)s+=`<circle cx="55" cy="124" r="${f1(22+10*fx.liver)}" style="fill:none;stroke:var(--bad);stroke-width:1.5;stroke-dasharray:3 3;opacity:${f1(fx.liver*.9)}"/>`;
    /* bladder fills orange */
    s+=`<ellipse cx="70" cy="196" rx="11" ry="8" style="fill:var(--panel);stroke:var(--skin-line);stroke-width:1"/>`;
    if(fx.urine>0)s+=`<ellipse cx="70" cy="${f1(196+8*(1-fx.urine))}" rx="${f1(11*Math.min(1,.5+fx.urine))}" ry="${f1(8*fx.urine)}" style="fill:var(--dR);opacity:.85"/>`;
    /* nerves in the legs: they fizz with isoniazid, then calm as B6 arrives */
    const nz=fx.nerve*(1-.75*fx.b6);
    [51,89].forEach(x=>{let d=`M${x} 214`;for(let k=1;k<=12;k++){const y=214+k*7.5,j=(k%2?1:-1)*(1+5*nz);d+=`L${f1(x+j)} ${f1(y)}`}
      s+=`<path d="${d}" style="fill:none;stroke:var(${nz>.15?'--dH':'--skin-line'});stroke-width:${f1(1+.8*nz)};opacity:${f1(.35+.65*Math.max(nz,fx.nerve*.4))}"/>`});
    if(fx.b6>0)s+=`<g style="opacity:${f1(fx.b6)}"><circle cx="124" cy="252" r="11" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4"/><text class="t-xs t-mid" x="124" y="255.5" style="fill:var(--good);font-weight:700">B6</text></g>`;
    /* urate crystals at the big toe */
    if(fx.toe>0){s+=`<circle cx="106" cy="311" r="${f1(5+3*fx.toe)}" style="fill:var(--dZ);opacity:${f1(.35*fx.toe)}"/>`;
      for(let k=0;k<5;k++){const a=k*.7-1.3;s+=`<line x1="106" y1="311" x2="${f1(106+Math.cos(a)*11*fx.toe)}" y2="${f1(311+Math.sin(a)*11*fx.toe)}" style="stroke:var(--dZ);stroke-width:1.6;stroke-linecap:round"/>`}}
    /* a red-green colour plate beside the head: the colours drain as optic neuritis builds */
    if(fx.eye>0){const g=fx.eye,rr=rng(7);let p=`<circle cx="128" cy="34" r="18" style="fill:var(--panel);stroke:var(--line)"/>`;
      for(let k=0;k<26;k++){const a=rr()*Math.PI*2,d=Math.sqrt(rr())*14,inner=d<7;
        p+=`<circle cx="${f1(128+Math.cos(a)*d)}" cy="${f1(34+Math.sin(a)*d)}" r="2.4" style="fill:var(${inner?'--bad':'--good'});opacity:${f1(.95-.6*Math.max(0,g-.4)/.6)}"/>`}
      s+=`<g style="opacity:${f1(Math.min(1,g*2))}">${p}</g>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 630');
    /* layout: drug list, body box (translate + scale), info panel */
    const L=N?{rows:DR.map((d,k)=>[12+(k%2)*196,10+Math.floor(k/2)*58])}:{rows:DR.map((d,k)=>[12,26+k*72])};
    const B=N?{x:124,y:136,s:.98}:{x:286,y:24,s:1};
    const P=N?{x:16,y:472}:{x:466,y:20};
    const act=ZONE.map(([a,b])=>ramp(t,a+.01,a+.07)),fly=ZONE.map(([a,b])=>ease(ramp(t,a+.02,a+.1)));
    const step=phaseOf(RV_STEPS,t),fin=ramp(t,.8,.84);
    const fx={tear:ramp(t,.08,.16),urine:ramp(t,.06,.17),nerve:ramp(t,.28,.33),b6:ramp(t,.32,.38),liver:Math.max(.25*ramp(t,.29,.34),ramp(t,.48,.56)),toe:ramp(t,.5,.58),eye:ramp(t,.68,.77)};
    let s='';
    /* drug rows */
    DR.forEach((d,k)=>{const [x,y]=L.rows[k],on=act[k],hot=step===k;
      s+=`<g style="opacity:${f1(.38+.62*Math.max(on,fin))}"><rect x="${x}" y="${y}" width="${N?184:252}" height="${N?52:62}" rx="10" style="fill:var(${hot?'--panel':'--field'});stroke:var(${hot?d.c:'--line'});stroke-width:${hot?2:1}"/>`;
      s+=pill(x+24,y+(N?26:31),28,`var(${d.c})`,{label:d.w,ang:-20});
      s+=`<text class="t-big" x="${x+48}" y="${y+(N?22:26)}" style="fill:var(${d.c})">${d.l}</text><text class="t-lbl" x="${x+64}" y="${y+(N?22:26)}">${d.n} (${d.w})</text>`;
      s+=`<text class="t-sm" x="${x+48}" y="${y+(N?40:46)}">${d.sub}</text></g>`});
    /* body */
    s+=`<g transform="translate(${B.x} ${B.y}) scale(${B.s})">${body(fx)}</g>`;
    /* flying pills: from each row to its target organ */
    DR.forEach((d,k)=>{const f=fly[k];if(act[k]<=0)return;const [x,y]=L.rows[k],sx=x+24,sy=y+(N?26:31);
      const tx=B.x+TGT[k][0]*B.s+(k===3?-30:12),ty=B.y+TGT[k][1]*B.s+(k===3?-4:0);
      const px=lerp(sx,tx,f),py=lerp(sy,ty,f)-Math.sin(f*Math.PI)*30;
      if(f<1)s+=pill(px,py,lerp(28,16,f),`var(${d.c})`,{ang:lerp(-20,0,f),op:.95});
      else s+=pill(tx,ty,16,`var(${d.c})`,{ang:0,op:.9})});
    /* info panel */
    s+=`<g transform="translate(${P.x} ${P.y})">`;
    const W=N?360:236;
    const head=['Rifampicin: levels of other drugs fall','Isoniazid: neuropathy and hepatitis','Pyrazinamide: uric acid and liver','Ethambutol: optic neuritis','2HRZE / 4HR: one regimen'][step];
    s+=`<text class="t-lbl" x="0" y="12">${head}</text>`;
    if(step===0){const items=['hormonal contraception','methadone','warfarin','some HIV protease inhibitors'];
      s+=`<text class="t-sm" x="0" y="32">induces CYP3A4, so these fall:</text>`;
      items.forEach((it,k)=>{const o=ramp(t,.05+k*.025,.08+k*.025);if(o<=0)return;
        s+=`<g style="opacity:${f1(o)}"><path d="M6 ${44+k*20}v9m-4-4l4 4l4-4" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-linecap:round"/><text class="t-sm" x="18" y="${55+k*20}" style="fill:var(--ink)">${it}</text></g>`});
      s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.tear)}">tears, urine, sweat turn orange</text>`}
    if(step===1){s+=`<text class="t-sm" x="0" y="32">hepatitis per 1,000 (label), by age:</text>`;
      [['20–34',3],['35–49',12],['50–64',23]].forEach(([a,v],k)=>{const o=ramp(t,.22+k*.03,.26+k*.03),w=(W-60)*v/23*o;
        s+=`<text class="t-xs" x="0" y="${54+k*20}">${a}</text><rect x="40" y="${45+k*20}" width="${f1(w)}" height="11" rx="3" style="fill:var(--dH);opacity:.8"/><text class="t-xs" x="${f1(44+w)}" y="${54+k*20}" style="fill:var(--ink)">${o>.5?v:''}</text>`});
      s+=`<text class="t-sm" x="0" y="124" style="opacity:${f1(fx.nerve)}">neuropathy: pyridoxine</text><text class="t-sm" x="0" y="140" style="opacity:${f1(fx.b6)}">B6 25–50 mg/day with H</text>`}
    if(step===2||step===3){const bars=[['Z',1.48,'--dZ'],['H',.49,'--dH'],['R',.43,'--dR'],['E',.07,'--dE']];
      s+=`<text class="t-sm" x="0" y="32">major events per 100 person-months</text>`;
      bars.forEach(([l,v,c],k)=>{const o=step===3?1:ramp(t,.43+k*.025,.48+k*.025),w=(W-56)*v/1.48*o;
        s+=`<text class="t-lbl" x="0" y="${56+k*20}" style="fill:var(${c})">${l}</text><rect x="20" y="${45+k*20}" width="${f1(Math.max(1,w))}" height="12" rx="3" style="fill:var(${c})"/><text class="t-xs" x="${f1(24+w)}" y="${55+k*20}" style="fill:var(--ink)">${o>.6?v.toFixed(2):''}</text>`});
      if(step===2)s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.toe)}">urate up: avoid in acute gout</text>`;
      else s+=`<text class="t-sm" x="0" y="140" style="opacity:${f1(fx.eye)}">acuity + colour, monthly &gt;15 mg/kg</text>`}
    if(step===4){const m=6*ramp(t,.84,.97),bx=0,bw=W-6,y0=40;
      s+=`<text class="t-sm" x="0" y="30">month ${f1(m)} of 6</text>`;
      ['--dH','--dR','--dZ','--dE'].forEach((c,k)=>{const on=k<2;
        s+=`<rect x="${bx}" y="${y0+k*11}" width="${f1(on?bw:bw/3)}" height="8" rx="2" style="fill:var(${c});opacity:${f1(.3+.7*fin)}"/>`;
        s+=`<text class="t-xs" x="${f1(on?bw+4:bw/3+4)}" y="${y0+7+k*11}">${'HRZE'[k]}</text>`});
      s+=`<line x1="${f1(bw/3)}" x2="${f1(bw/3)}" y1="${y0-6}" y2="${y0+48}" style="stroke:var(--ink);stroke-dasharray:3 2"/>`;
      s+=`<text class="t-xs" x="2" y="${y0+62}">2 months: HRZE</text><text class="t-xs t-end" x="${f1(bw)}" y="${y0+62}">4 months: HR</text>`;
      const cx=bw*m/6;s+=`<path d="M${f1(cx)} ${y0-10}l-5-7h10Z" style="fill:var(--brand)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${y0-4}" y2="${y0+46}" style="stroke:var(--brand);stroke-width:2"/>`;
      s+=`<text class="t-sm" x="0" y="${y0+86}" style="opacity:${f1(ramp(t,.9,.95))}">finish the course: cure</text>`}
    s+='</g>';
    svg.innerHTML=s;
    setSt(step);$('#rvNote').innerHTML=noteHTML(RV_STEPS[step]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const RV_QZ=[
 /* ---- Part 1 ---- */
 [1,`In 2024, about how many people fell ill with TB worldwide?`,[`3.1 million`,`10.7 million`,`25 million`,`1.7 billion`],1,`10.7 million (131 per 100,000), with 1.23 million deaths [[WHO-GTR2025]]. 1.7 billion is the estimated number with TB infection [[Houben2016]].`],
 [1,`Which statement about TB infection (formerly "latent TB") is correct?`,[`It is not contagious`,`It always progresses to disease`,`It is diagnosed by sputum smear`,`It needs isolation`],0,`TB infection is not contagious; disease is defined by macroscopic pathology [[Drain2018,Coussens2024]].`],
 [1,`Culturable M. tuberculosis in cough aerosols is carried mostly in particles of:`,[`50–100 µm`,`20–40 µm`,`0.65–4.7 µm`,`Over 100 µm`],2,`96.4% of cultivable particles were 0.65–4.7 µm: respirable, not large droplets [[Fennelly2012]].`],
 [1,`The usual infecting dose of M. tuberculosis is:`,[`About 10,000 bacilli`,`About 1,000 bacilli`,`About 100 bacilli`,`1–5 bacilli`],3,`Usually 1–5 tubercle bacilli [[Balasubramanian1994]].`],
 [1,`IGRAs remain specific in people given BCG because ESAT-6 and CFP-10 are encoded in:`,[`RD1, deleted from all BCG strains`,`The katG gene`,`The rpoB gene`,`Plasmids lost in culture`],0,`RD1 is deleted from every BCG substrain, so IGRA antigens are absent from the vaccine [[Mahairas1996,Harboe1996,Pai2008]].`],
 [1,`Mycobacterial phagosomes survive partly because they:`,[`Fuse rapidly with lysosomes`,`Fail to acidify below pH 6.3–6.5`,`Are filled with neutrophil enzymes`,`Never form at all`],1,`They exclude the proton-ATPase and stay above pH 6.3–6.5 [[SturgillKoszycki1994]].`],
 [1,`Mice lacking interferon-γ, given M. tuberculosis:`,[`Clear the infection faster`,`Cannot form any granulomas`,`Form granulomas but cannot restrict growth`,`Are unaffected`],2,`Granulomas still form, but reactive nitrogen fails, necrosis increases and the mice die quickly [[Flynn1993,Cooper1993]].`],
 [1,`A man starting infliximab is screened for TB infection. Why?`,[`Infliximab causes false-positive IGRAs`,`TNF blockade unmasks TB, often extrapulmonary, after few infusions`,`Infliximab is itself a TB drug`,`It is a legal formality only`],1,`In 70 reported cases, 48 followed three or fewer infusions and 40 were extrapulmonary [[Keane2001]].`],
 [1,`Measured oxygen tension inside a 3 mm rabbit granuloma was about:`,[`1.6 mm Hg`,`40 mm Hg`,`100 mm Hg`,`160 mm Hg`],0,`1.6 ± 0.7 mm Hg: severely hypoxic, which is why metronidazole worked in that model [[Via2008]].`],
 [1,`Among infected contacts in Amsterdam, the share of TB cases appearing within 2 years was about:`,[`25%`,`50%`,`75%`,`97%`],3,`75% within 1 year and 97% within 2 [[Behr2018]].`],
 [1,`In national prevalence surveys, the median share of confirmed TB that is subclinical (no symptoms on screening) is about:`,[`5%`,`20%`,`50%`,`90%`],2,`A median 50.4% (range 36.1–79.7%) [[Frascella2021]].`],
 [1,`Diabetes raises the risk of TB disease by about:`,[`3 times`,`10 times`,`1.1 times`,`It lowers it`],0,`RR 3.11 (95% CI 2.27–4.26) in cohort studies [[Jeon2008]].`],
 [1,`Which anti-TNF therapy carries the lowest TB risk?`,[`Infliximab`,`Adalimumab`,`Etanercept`,`They are identical`],2,`SIR 1.8 for etanercept versus 18.6 for infliximab and 29.3 for adalimumab [[Tubach2009]].`],
 [1,`In Kampala, the best predictor of new infection in household contacts was:`,[`Index smear grade alone`,`A high cough-aerosol index case`,`Number of rooms in the house`,`The contact's BCG scar`],1,`High-aerosol index cases were the only predictor (adjusted OR 4.81) [[JonesLopez2013]].`],
 [1,`Antiretroviral therapy lowers TB incidence in people with HIV with an overall hazard ratio of about:`,[`1.35`,`0.95`,`0.65`,`0.35`],3,`HR 0.35 (95% CI 0.28–0.44), at every CD4 stratum [[Suthar2012]].`],
 /* ---- Part 2 ---- */
 [2,`The WHO four-symptom screen for people with HIV includes all EXCEPT:`,[`Haemoptysis`,`Night sweats`,`Fever`,`Weight loss`],0,`It is current cough, fever, night sweats or weight loss: sensitivity 78.9%, specificity 49.6% [[Getahun2011]].`],
 [2,`In community screening, a cough of 2 weeks or more is:`,[`Sensitive but not specific`,`Specific (94%) but insensitive (42%)`,`Both 95%`,`Useless`],1,`Summary sensitivity 42.1% and specificity 94.4% [[VantHoog2022]]. Chest X-ray finds what cough misses [[Frascella2021]].`],
 [2,`Vignette (exam teaching): a household contact of a person with smear-positive TB has a TST of 7 mm. Under ATS/IDSA/CDC cut-offs this is:`,[`Negative: under 10 mm`,`Negative: under 15 mm`,`Positive: close contacts use 5 mm`,`Uninterpretable`],2,`5 mm or more is positive for close contacts, immunosuppression including HIV, TNF blockers and prior TB on X-ray [[Lewinsohn2017]].`],
 [2,`Vignette (exam teaching): a hospital nurse with occupational exposure and no other risk factors has a TST of 12 mm. Under ATS/IDSA/CDC cut-offs this is:`,[`Negative: under 15 mm`,`Positive only at 5 mm`,`Uninterpretable`,`Positive: 10 mm applies`],3,`10 mm applies to other people at increased risk, including occupational exposure; 15 mm to people with no risk factors [[Lewinsohn2017]].`],
 [2,`When reading a TST, the clinician measures:`,[`Induration only`,`Redness only`,`Redness plus induration`,`The bleb on day 0`],0,`Read at 48–72 hours and measure induration, not erythema [[ATS2000]].`],
 [2,`Vignette (exam teaching): an adult given BCG as an infant 25 years ago has a TST of 14 mm. The best reading is:`,[`It is surely due to BCG`,`Infant BCG rarely affects a TST 10 or more years later`,`BCG always gives over 15 mm`,`TST cannot be done after BCG`],1,`Only 1% had a TST of 10 mm or more from BCG 10 or more years after infant vaccination [[Farhat2006]]; IGRA is preferred after BCG [[Lewinsohn2017]].`],
 [2,`A QuantiFERON result is positive at a TB antigen response (minus Nil) of at least:`,[`0.10 IU/mL`,`8.0 IU/mL`,`0.35 IU/mL`,`5 spots`],2,`0.35 IU/mL and at least 25% of Nil, with Nil 8.0 IU/mL or less [[Mazurek2010]].`],
 [2,`For a healthy 3-year-old contact, ATS/IDSA/CDC suggests which test for TB infection?`,[`IGRA only`,`Sputum culture`,`Chest CT`,`TST`],3,`A TST is suggested for healthy children under 5 (conditional, very low-quality evidence) [[Lewinsohn2017]].`],
 [2,`Vignette (exam teaching): a woman has a positive IGRA. What can be concluded?`,[`She has TB disease`,`She is infectious`,`Her body has met the TB germ; disease must be excluded before treatment decisions`,`She needs isolation`],2,`IGRAs cannot separate infection from disease, and their positive predictive value for progression is under about 3% [[Lewinsohn2017,Hamada2023]].`],
 [2,`Most IGRA conversions in serially tested US healthcare workers:`,[`Reverted on retesting`,`Progressed to disease`,`Were from BCG`,`Were missed TSTs`],0,`About 76–77% of converters were negative again 6 months later; retest before acting [[Dorman2014HCW]].`],
 [2,`Three sputum smears detect about what share of culture-confirmed TB?`,[`10%`,`70%`,`99%`,`40%`],1,`About 70%; the first specimen gives 53.8% [[Lewinsohn2017]].`],
 [2,`A single Xpert MTB/RIF detected what share of smear-negative, culture-positive TB?`,[`15%`,`45%`,`72.5%`,`100%`],2,`72.5%, and 98.2% of smear-positive TB, in under 2 hours [[Boehme2010]].`],
 [2,`Compared with Xpert MTB/RIF, Xpert Ultra has:`,[`Higher sensitivity, slightly lower specificity`,`Lower sensitivity, higher specificity`,`Identical accuracy`,`No rifampicin result`],0,`90.9% vs 84.7% sensitivity; 95.6% vs 98.4% specificity [[Zifodya2021]].`],
 [2,`Why can one PCR target stand in for rifampicin susceptibility testing?`,[`Rifampicin resistance is plasmid-borne`,`It is always caused by katG`,`Rifampicin resistance never occurs`,`Over 95% lies in the rpoB RRDR`],3,`Mutations in one rpoB stretch account for more than 95% of resistant isolates [[Seifert2015,Telenti1993]].`],
 [2,`An inhA promoter mutation can cause cross-resistance between isoniazid and:`,[`Rifampicin`,`Ethionamide`,`Bedaquiline`,`Ethambutol`],1,`InhA is a target of both isoniazid and ethionamide [[Banerjee1994]].`],
 [2,`Rv0678 mutations cause cross-resistance between bedaquiline and:`,[`Linezolid`,`Pretomanid`,`Clofazimine`,`Moxifloxacin`],2,`They upregulate the MmpS5–MmpL5 efflux pump [[Hartkoorn2014]].`],
 [2,`Urine LF-LAM is most useful in:`,[`Very sick inpatients with HIV and low CD4`,`Healthy contacts`,`Children with BCG scars`,`Screening health workers`],0,`Sensitivity rises as CD4 falls; LAM-guided treatment cut 8-week mortality by 17% (relative) [[Bjerrum2019,Peter2016]].`],
 [2,`Liquid culture typically detects growth in:`,[`2 hours`,`3–4 months`,`1 day`,`10–14 days`],3,`10–14 days for liquid, 3–4 weeks for solid culture [[Lewinsohn2017]].`],
 [2,`The commonest site of extrapulmonary TB in the US series was:`,[`Meninges`,`Lymph nodes`,`Bone`,`Kidney`],1,`Lymphatic 40.4%, pleural 19.8%, bone or joint 11.3% [[Peto2009]].`],
 [2,`Pre-XDR-TB is rifampicin-resistant TB that is also resistant to:`,[`Isoniazid only`,`Bedaquiline only`,`At least one fluoroquinolone`,`Streptomycin`],2,`Adding bedaquiline or linezolid resistance makes it XDR-TB [[WHO-Mod4-2025,Viney2021]].`],
 [2,`In high-burden settings, most MDR-TB is:`,[`Transmitted from person to person`,`Acquired through poor adherence`,`Caused by BCG`,`Caused by poor-quality isoniazid`],0,`A median 95.9% of incident MDR-TB came from transmission in a global model [[Kendall2015]]. Having it does not mean anyone did something wrong.`],
 [2,`Why is TB never treated with a single drug?`,[`Single drugs are too expensive`,`Resistant mutants arise at random and one drug selects them`,`Single drugs are too toxic`,`Labels forbid it`],1,`Mutation rates per generation are 10⁻⁸ to 10⁻¹⁰, so double resistance is vanishingly rare with combinations [[David1970]].`],
 /* ---- Part 3 ---- */
 [3,`In 2HRZE/4HR, the "4HR" refers to:`,[`4 weeks of high-dose rifampicin`,`4 drugs for 4 months`,`4 months of isoniazid and rifampicin`,`4 doses a week`],2,`Two months of four drugs, then four months of isoniazid and rifampicin, daily [[WHO-Mod4-2025]].`],
 [3,`Which drug is responsible for most of the early bactericidal kill in the first 2 days?`,[`Ethambutol`,`Pyrazinamide`,`Streptomycin`,`Isoniazid`],3,`Isoniazid kills about 95% of organisms in the first two days [[Mitchison2000,Jindani2003]].`],
 [3,`Isoniazid must be activated by:`,[`KatG (catalase-peroxidase)`,`Pyrazinamidase`,`CYP3A4`,`Gastric acid`],0,`It is a prodrug activated by KatG; its target InhA is in mycolic acid synthesis [[Zhang1992,Banerjee1994]].`],
 [3,`Pyrazinamide is most active:`,[`At alkaline pH`,`In acidic conditions against slow-metabolising bacilli`,`Only against growing cultures`,`Only outside cells`],1,`It needs pyrazinamidase (pncA) and acid pH, and acts with rifampicin as a sterilising agent [[Zhang2003PZA]].`],
 [3,`Vignette (exam teaching): a 30-year-old, 62 kg, HIV-negative, with drug-susceptible pulmonary TB, asks about the 4-month option. Which feature would exclude 2HPMZ/2HPM under WHO criteria?`,[`Age over 18`,`Weight over 40 kg`,`TB meningitis`,`Smear-positive sputum`],2,`Excluded: under 40 kg, under 12 years, CD4 below 100, pregnancy, and meningitis, bone or disseminated TB [[WHO-Mod4-2025]].`],
 [3,`SHINE showed that children with non-severe TB can be treated for:`,[`2 months`,`9 months`,`12 months`,`4 months`],3,`16 weeks was non-inferior to 24 weeks: 3% events in both arms [[Turkova2022]].`],
 [3,`The US labels say rifampin should be taken ___ and rifapentine ___:`,[`On an empty stomach; with food`,`With food; on an empty stomach`,`Both with milk`,`Both at night with antacids`],0,`Food lowers rifampin peaks but raises rifapentine exposure by 40–50% [[FDA-Rifampin,FDA-Priftin,Peloquin1999]].`],
 [3,`Vignette (exam teaching): a woman on rifampicin-based treatment uses a combined oral contraceptive. The key teaching point is:`,[`No interaction exists`,`Rifampicin may make hormonal contraception unreliable; consider another method`,`She must stop TB treatment`,`Double the TB dose`],1,`The rifampin label warns of this; rifampicin induces CYP3A4 [[FDA-Rifampin,Niemi2003]].`],
 [3,`Vignette (exam teaching): a man on methadone starts rifampicin. Without adjustment he is likely to experience:`,[`Methadone toxicity`,`No change`,`Opioid withdrawal`,`Hepatitis from methadone`],2,`Rifampicin lowers methadone levels, leading to withdrawal in most patients [[Niemi2003]].`],
 [3,`Vignette (exam teaching): week 5 of 2HRZE. ALT is 4 times the upper limit of normal and she has nausea and dark urine. Under the ATS statement:`,[`Continue and recheck in 3 months`,`Halve the pyrazinamide`,`Add ethambutol`,`Interrupt treatment`],3,`Interrupt when ALT exceeds 3 times normal with symptoms or jaundice, or 5 times without [[Saukkonen2006]].`],
 [3,`The first-line drug with the most major adverse events (Montreal cohort) was:`,[`Pyrazinamide`,`Isoniazid`,`Rifampin`,`Ethambutol`],0,`1.48 per 100 person-months, against 0.49 isoniazid, 0.43 rifampin and 0.07 ethambutol [[Yee2003]].`],
 [3,`Vignette (exam teaching): on treatment, a man reports that red and green look alike. The drug to suspect is:`,[`Isoniazid`,`Ethambutol`,`Pyrazinamide`,`Rifampicin`],1,`Ethambutol causes optic neuritis; the label asks for acuity and colour testing [[FDA-Ethambutol,Ezer2013]].`],
 [3,`Vignette (exam teaching): burning feet on isoniazid. The preventive measure the regimen tables list is:`,[`Vitamin K`,`Vitamin D`,`Pyridoxine (B6)`,`Allopurinol`],2,`Isoniazid causes pyridoxine deficiency; B6 25–50 mg/day is listed with it [[FDA-Isoniazid,Saukkonen2025]].`],
 [3,`Pyrazinamide is contraindicated in:`,[`Contact lens wearers`,`Hypertension`,`Asthma`,`Acute gout`],3,`It inhibits urate excretion and often causes hyperuricaemia [[FDA-Pyrazinamide]].`],
 [3,`3HP for TB infection consists of:`,[`12 weekly doses of rifapentine plus isoniazid`,`3 months of daily rifampicin`,`3 weeks of isoniazid`,`3 drugs for 6 months`],0,`In PREVENT TB completion was 82.1% vs 69.0% for 9H, with less hepatotoxicity [[Sterling2011]]; flu-like reactions in 3.5% [[Sterling2015]].`],
 [3,`Compared with 9 months of isoniazid, 4 months of rifampin (4R):`,[`Was inferior`,`Was non-inferior, with better completion and less hepatotoxicity`,`Caused more liver injury`,`Was only tested in children`],1,`Completion 15.1 points higher; grade 3–5 hepatotoxicity 1.2 points lower [[Menzies2018]].`],
 [3,`Vignette (exam teaching): a household contact of a person with MDR-TB has TB infection and no disease. WHO 2024 recommends:`,[`3HP`,`4R`,`6 months of levofloxacin`,`No treatment`],2,`Strong recommendation, moderate certainty [[WHO-Mod1-2024]].`],
 [3,`The BPaLM regimen consists of bedaquiline, pretomanid, linezolid and:`,[`Clofazimine`,`Amikacin`,`Delamanid`,`Moxifloxacin`],3,`For 6 months, from age 14 [[WHO-Mod4-2025]].`],
 [3,`In TB-PRACTECAL, unfavourable outcomes at 72 weeks were:`,[`11% BPaLM vs 48% standard care`,`48% vs 11%`,`Equal at 30%`,`2% vs 5%`],0,`Grade 3 or higher or serious adverse events were 19% vs 59% [[Nyangwa2022]].`],
 [3,`The three classic linezolid toxicities are:`,[`QT, hearing loss, rash`,`Peripheral neuropathy, optic neuropathy, myelosuppression`,`Gout, hepatitis, orange urine`,`Tendon rupture, hypoglycaemia, seizures`],1,`ZeNix found 600 mg for 26 weeks kept efficacy and cut myelosuppression to 2% [[Conradie2022,FDA-Pretomanid]].`],
 [3,`Before starting bedaquiline, the label calls for:`,[`An audiogram`,`A visual field test`,`An ECG`,`A lumbar puncture`],2,`Its boxed warning is QTc prolongation [[FDA-Sirturo]].`],
 [3,`Aminoglycoside injectables were abandoned in DR-TB regimens mainly because of:`,[`Cost`,`Weekly dosing`,`Orange urine`,`Hearing loss in about 40%`],3,`Pooled prevalence 40.62% [[Dillard2021]]; kanamycin and capreomycin are no longer used [[WHO-Mod4-2025]].`],
 [3,`Vignette (exam teaching): a man with HIV (CD4 40) starts TB treatment for pulmonary TB. WHO recommends ART:`,[`As soon as possible within 2 weeks`,`After TB treatment ends`,`After 8 weeks`,`Only if CD4 falls below 20`],0,`Strong recommendation [[WHO-Mod4-2025]]; in CAMELIA ART at 2 weeks cut deaths from 27% to 18% [[Blanc2011]].`],
 [3,`The exception to early ART in people with HIV and TB is:`,[`Pleural TB`,`TB meningitis`,`Lymph-node TB`,`Smear-negative TB`],1,`Immediate ART did not lower 9-month mortality in TB meningitis and caused more grade 4 events [[Torok2011]]; WHO allows a 4–8-week delay [[WHO-Mod4-2025]].`],
 [3,`Starting ART early raises the risk of TB-IRIS. Prophylactic prednisone (PredART) reduced it by about:`,[`90%`,`5%`,`30%`,`It increased it`],2,`46.7% to 32.5% (RR 0.70) [[Meintjes2018]].`],
 [3,`With rifampicin, dolutegravir is given:`,[`Once weekly`,`Unchanged`,`Not at all`,`Twice daily`],3,`The label adjusts dosing to twice daily with rifampin [[FDA-Tivicay,Dooley2013]].`],
 [3,`Adjuvant steroids in TB meningitis:`,[`Cut deaths by almost a quarter`,`Raise mortality`,`Have no effect`,`Are only for children`],0,`RR 0.75 (95% CI 0.65–0.87) [[Prasad2016]].`],
 [3,`WHO's regimen for Hr-TB (isoniazid-resistant, rifampicin-susceptible) is 6 months of:`,[`BPaLM`,`Rifampicin, ethambutol, pyrazinamide and levofloxacin`,`Isoniazid alone`,`Streptomycin and PAS`],1,`Adding a fluoroquinolone was associated with greater success [[WHO-Mod4-2025,Fregonese2018]].`],
 [3,`The 6-month regimen that WHO 2025 also covers for children and pregnancy is:`,[`BPaLM`,`BPaL`,`BDLLfxC`,`2HPMZ/2HPM`],2,`From BEAT Tuberculosis; BPaLM is not recommended in pregnancy or breastfeeding [[Conradie2026,WHO-Mod4-2025]].`],
 [3,`TB risk is highest in which period around pregnancy?`,[`First trimester`,`Second trimester`,`It is unchanged`,`Postpartum`],3,`Postpartum IRR about 1.9–2 [[Zenner2012,Jonsson2020]].`],
 [1,`Without treatment, about what share of people with smear-positive TB were dead at 10 years?`,[`70%`,`20%`,`5%`,`95%`],0,`About 70%; about 20% for smear-negative TB [[Tiemersma2011]]. These are pre-chemotherapy population figures.`],
 /* ---- Part 4 ---- */
 [4,`BCG's most consistent benefit is against:`,[`Adult pulmonary TB everywhere`,`TB meningitis and miliary TB in young children`,`TB infection in adults`,`Drug-resistant TB`],1,`About one meningitis case prevented per 3,435 infant vaccinations [[Trunz2006,Mangtani2014]].`],
 [4,`BCG efficacy is greater:`,[`Near the equator`,`In people already sensitised to mycobacteria`,`At higher latitudes and in people not previously sensitised`,`With one particular strain`],2,`Latitude and prior sensitisation explain most variation; strain was not associated with efficacy [[Mangtani2014,Colditz1994]].`],
 [4,`Among exposed children, BCG reduced progression from infection to disease by about:`,[`5%`,`20%`,`100%`,`58%`],3,`RR 0.42; it also cut infection (IGRA) by 19–27% [[Roy2014]].`],
 [4,`BCG is a risk in infants with HIV mainly because of:`,[`Disseminated BCG disease`,`Hepatitis`,`QT prolongation`,`Rash`],0,`A pooled 992 per 100,000 vaccinated infants with HIV [[Hesseling2009BWHO]].`],
 [4,`The M72/AS01E phase 2b efficacy against pulmonary TB in IGRA-positive adults was:`,[`99%`,`49.7%`,`10%`,`Negative`],1,`49.7% over 3 years; a phase 3 trial began in 2024 [[Tait2019,NCT06062238]].`],
 [4,`In the hierarchy of TB infection control, the first and most important level is:`,[`Respirators`,`UV lights`,`Administrative controls`,`HEPA filters`],2,`Administrative, then environmental, then respiratory protection [[WHO-IPC2019,Jensen2005]].`],
 [4,`An airborne infection isolation room built since 2001 needs at least:`,[`2 air changes per hour`,`6 air changes per hour`,`50 air changes per hour`,`12 air changes per hour`],3,`With negative pressure of at least 0.01 inch water gauge [[Jensen2005]].`],
 [4,`Who wears a surgical mask and who wears an N95 respirator?`,[`The person with TB wears the surgical mask; health workers wear fit-tested N95s`,`Both wear surgical masks`,`Only visitors wear N95s`,`Neither helps`],0,`Patient masks cut MDR-TB transmission to guinea pigs by 56% [[Dharmadhikari2012,Jensen2005]].`],
 [4,`What most quickly ends a person's infectiousness?`,[`A negative smear`,`Effective treatment against their strain`,`Isolation alone`,`BCG`],1,`Minimal transmission from people on effective MDR-TB therapy; high transmission from unsuspected XDR-TB [[Dharmadhikari2014]].`],
 [4,`Vignette (exam teaching): a man is admitted with suspected TB. Under CDC 2005, airborne precautions can stop when TB is unlikely and he has:`,[`One negative smear`,`A negative chest X-ray`,`Three consecutive negative smears, 8–24 hours apart, one early-morning`,`A negative IGRA`],2,`Three consecutive negative smears with at least one early-morning specimen [[Jensen2005]].`],
 [4,`Vignette (exam teaching): a 3-year-old lives with her grandfather, newly diagnosed with smear-positive TB. Her first TST is negative and TB disease has been excluded. NTCA/CDC guidance is:`,[`Nothing until symptoms appear`,`BCG revaccination`,`Isolation of the child`,`Window prophylaxis, then a retest at 8–10 weeks`],3,`Children under 5 are high-priority contacts [[NTCA2005]]; untreated infected under-5s had a 19.0% 2-year TB risk [[Martinez2020Lancet]].`],
 [4,`The infectious period used for contact tracing usually starts:`,[`3 months before diagnosis`,`On the day of diagnosis`,`2 years before diagnosis`,`At birth`],0,`Earlier if the illness was long; first contact assessment within 3 working days [[NTCA2005]].`],
 [4,`About what share of contacts in high-burden settings have TB disease?`,[`30%`,`3%`,`0.01%`,`50%`],1,`3.1% TB disease and about half with TB infection [[Fox2013]].`],
 [4,`The End TB Strategy targets for 2035, against 2015, are:`,[`50% fewer cases and 75% fewer deaths`,`Elimination`,`90% lower incidence, 95% fewer deaths, no catastrophic costs`,`10% fewer deaths`],2,`By 2024, incidence was down 12.3% and deaths 29% [[WHO-GTR2025]].`],
 [4,`In RATIONS, food rations for household contacts cut TB incidence by about:`,[`5%`,`90%`,`0%`,`39–48%`],3,`Adjusted IRR 0.61 for all forms [[Bhargava2023Lancet]].`],
 [4,`ACT3 in Viet Nam (community-wide Xpert screening) cut pulmonary TB prevalence by:`,[`44%`,`4%`,`90%`,`It rose`],0,`Prevalence ratio 0.56 [[Marks2019]].`],
 /* ---- Part 5 ---- */
 [5,`Which wording follows person-first TB language?`,[`TB suspect`,`Person with presumptive TB`,`Defaulter`,`TB victim`],1,`Also "person lost to follow-up" for "defaulter" [[Zachariah2012]].`],
 [5,`About what share of TB-affected households face catastrophic costs in WHO surveys?`,[`1%`,`10%`,`47%`,`99%`],2,`82% for drug-resistant TB, even where treatment is free [[WHO-GTR2025]].`],
 [5,`In a Cochrane review, direct observation compared with self-administered treatment:`,[`Doubled cure`,`Halved deaths`,`Was harmful`,`Did not substantially improve cure`],3,`RR 1.08 (95% CI 0.91–1.27) [[Karumbi2015]].`],
 [5,`In London, smartphone video-observed treatment compared with DOT:`,[`Doubled the share completing most observations (70% vs 31%)`,`Was worse`,`Was identical`,`Was not tested`],0,`Adjusted OR 5.48 [[Story2019]].`],
 [5,`Pooled depression prevalence among people with TB is about:`,[`5%`,`45%`,`90%`,`15%`],1,`Over half in MDR-TB [[Duko2020]]; depressive symptoms are linked to loss to follow-up [[RuizGrosso2020]].`],
 [5,`Simple instructions on how to cough up sputum mainly raised smear positivity in:`,[`Men`,`Children`,`Women`,`No one`],2,`RR 1.63 in women; men's results did not change [[Khan2007Lancet]].`],
 [5,`During sputum induction the health worker wears at least:`,[`A surgical mask`,`A cloth mask`,`Nothing if windows are open`,`An N95 respirator`],3,`In a ventilated booth or AII room [[Jensen2005]].`],
 [5,`TB survivors' all-cause mortality compared with the general population is about:`,[`3 times higher`,`The same`,`Half`,`30 times higher`],0,`SMR 2.91 [[Romanowski2019]].`],
 /* ---- Part 6 ---- */
 [6,`World TB Day (24 March) marks:`,[`The first BCG dose`,`Koch's 1882 announcement of the tubercle bacillus`,`The 1948 streptomycin trial`,`WHO's 1993 emergency declaration`],1,`Koch presented it in Berlin on 24 March 1882 [[Barberis2017,CDC2018WTBD]].`],
 [6,`The 1948 MRC streptomycin trial is remembered for:`,[`Using no controls`,`Proving BCG works`,`Random allocation and blinded X-ray reading`,`Testing isoniazid`],2,`It also showed resistance on a single drug [[Crofton2006,MRC1948]].`],
 [6,`The 1959 Madras study showed that:`,[`Sanatoria were essential`,`Isoniazid was toxic`,`BCG failed`,`Home treatment was as effective as sanatorium treatment`],3,`India then had about 2.5 million people with active TB and 23,000 TB beds [[TCCMadras1959]].`],
 [6,`BCG was first given to a baby in:`,[`1921`,`1882`,`1952`,`1968`],0,`In Paris, by mouth, on 18 July 1921 [[Luca2013]].`],
 [6,`Rifampicin entered clinical use in:`,[`1944`,`1968`,`1993`,`2012`],1,`From a Dow-Lepetit programme in Milan [[Sensi1983]].`],
 [6,`Who first showed that TB is transmissible?`,[`Koch`,`Pirquet`,`Villemin`,`Waksman`],2,`Jean-Antoine Villemin, in 1865 [[Daniel2006,Cambau2014]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=RV_QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
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
const RV_GL=[
 ["2HRZE/4HR",`Shorthand for the standard 6-month regimen: 2 months of isoniazid (H), rifampicin (R), pyrazinamide (Z) and ethambutol (E), then 4 months of H and R [[WHO-Mod4-2025]].`,"regimen"],
 ["2HPMZ/2HPM",`The 4-month regimen of isoniazid, rifapentine (P), moxifloxacin (M) and pyrazinamide for people aged 12 or over with drug-susceptible pulmonary TB [[WHO-Mod4-2025,Dorman2021]].`,"regimen"],
 ["1HP",`One month of daily rifapentine plus isoniazid for TB infection; non-inferior to 9H in BRIEF TB [[Swindells2019,WHO-Mod1-2024]].`,"tpt"],
 ["3HP",`Twelve weekly doses of rifapentine plus isoniazid for TB infection [[Sterling2011,Sterling2020]].`,"tpt"],
 ["3HR",`Three months of daily isoniazid plus rifampicin for TB infection [[WHO-Mod1-2024]].`,"tpt"],
 ["4R",`Four months of daily rifampicin for TB infection: 120 doses, non-inferior to 9H [[Menzies2018,Sterling2020]].`,"tpt"],
 ["5-10-15 mm rule",`The TST cut-offs for induration by risk group [[Lewinsohn2017]].`,"tests"],
 ["Acid-fast bacilli (AFB)",`Bacteria that show up on the acid-fast stain because of their waxy mycolic acid wall [[Brennan2003,Hobby1973]]; smear microscopy counts them [[Lewinsohn2017]].`,"bacillus"],
 ["Active case finding",`Screening people who have not sought care. Community-wide Xpert screening in ACT3 cut pulmonary TB prevalence by 44% [[Marks2019]].`,"frontier"],
 ["Adherence support",`Education, counselling, material, psychological and digital support to help people finish treatment [[WHO-Mod4-2025]].`,"living"],
 ["Adenosine deaminase (ADA)",`A pleural-fluid marker of TB pleurisy: pooled sensitivity 0.92 and specificity 0.90 [[Liang2008]].`,"symptoms"],
 ["Administrative controls",`The first and most important level of TB infection control: triage, separation and prompt treatment [[WHO-IPC2019,Jensen2005]].`,"control"],
 ["Air changes per hour (ACH)",`How many times a room's air volume is replaced each hour: exhaust airflow divided by room volume, times 60 [[Jensen2005]].`,"control"],
 ["Airborne infection isolation (AII) room",`A single room under negative pressure, at least 0.01 inch water gauge, with at least 12 ACH [[Jensen2005]].`,"control"],
 ["Alveolar macrophage",`The lung's resident phagocyte and the first cell infected [[Cohen2018]].`,"granuloma"],
 ["Aminoglycoside",`Injectable drugs such as kanamycin and amikacin; they caused hearing loss in about 40% of people treated for DR-TB [[Dillard2021]].`,"drtb"],
 ["Antigen-based skin test (TBST)",`A skin test using ESAT-6 and CFP-10 instead of PPD, so BCG does not affect it [[Krutikov2022,WHO-Mod3-2022TBI]].`,"tests"],
 ["Arabinogalactan",`The sugar layer of the cell wall linking peptidoglycan to mycolic acids; ethambutol blocks arabinan synthesis [[Brennan2003,Telenti1997]].`,"bacillus"],
 ["ART (antiretroviral therapy)",`HIV treatment. It lowers TB incidence (HR 0.35) and should start within 2 weeks of TB treatment [[Suthar2012,WHO-Mod4-2025]].`,"special"],
 ["BCG (bacille Calmette-Guérin)",`A live attenuated M. bovis vaccine, first given in 1921, still the only licensed TB vaccine [[Lange2022,Luca2013]].`,"bcg"],
 ["BCG revaccination",`A second BCG dose. The 2025 phase 2b trial in adolescents showed no protection against sustained infection [[Schmidt2025]].`,"bcg"],
 ["BDLLfxC",`A 6-month regimen of bedaquiline, delamanid, linezolid, levofloxacin and clofazimine for MDR/RR-TB, covering children and pregnancy [[WHO-Mod4-2025,Conradie2026]].`,"drtb"],
 ["Bedaquiline",`A diarylquinoline that inhibits mycobacterial ATP synthase; boxed warning for QTc prolongation [[Andries2005,FDA-Sirturo]].`,"drugs"],
 ["BPaL",`Bedaquiline, pretomanid and linezolid for 6 months, used when fluoroquinolone resistance is documented [[WHO-Mod4-2025,Conradie2020]].`,"drtb"],
 ["BPaLM",`BPaL plus moxifloxacin, the 6-month regimen for MDR/RR-TB from age 14 [[WHO-Mod4-2025,Nyangwa2022]].`,"drtb"],
 ["Bronchiectasis",`Damaged, widened airways: one form of post-TB lung disease [[Allwood2021]].`,"living"],
 ["CAD (computer-aided detection)",`Software that scores a chest X-ray for TB; some products meet WHO triage targets [[Qin2021]].`,"diagnose"],
 ["Caseous necrosis",`The soft, cheese-like dead centre of a granuloma, where drugs and oxygen reach poorly [[Via2008,Sarathy2018]].`,"granuloma"],
 ["Catastrophic costs",`TB costs above 20% of annual household income or expenditure; faced by about half of TB-affected households [[WHO-GTR2025]].`,"living"],
 ["Cavity",`A hole left when a granuloma empties into an airway. Cavities hold huge numbers of bacilli and drive transmission [[Kaplan2003,Urbanowski2020]].`,"granuloma"],
 ["CFP-10",`A secreted M. tuberculosis protein encoded in RD1, used with ESAT-6 in IGRAs [[Hsu2003,Andersen2000]].`,"bacillus"],
 ["Clofazimine",`A WHO Group B drug for DR-TB; Rv0678 mutations cause cross-resistance with bedaquiline [[WHO-Mod4-2025,Hartkoorn2014]].`,"drtb"],
 ["Close contact",`A person who shared air with someone with infectious TB, for example in the same household [[NTCA2005]].`,"control"],
 ["Contact investigation",`Finding, assessing and testing people exposed to someone with TB; it raised case notification (RR 2.5) and cut mortality (RR 0.6) [[Velen2021]].`,"control"],
 ["Culture conversion",`When sputum cultures turn negative on treatment. A positive culture at 2 months predicts relapse poorly (sensitivity 40%) [[Horne2010]].`,"regimen"],
 ["CYP3A4 induction",`Rifampicin's speeding-up of drug metabolism, which lowers levels of many other drugs [[Niemi2003]].`,"drugs"],
 ["Delamanid",`A nitroimidazole prodrug that inhibits mycolic acid synthesis [[Matsumoto2006]].`,"drugs"],
 ["Digital adherence technology (DAT)",`Phone-based tools, digital pillboxes or ingestible sensors that record doses [[Subbaraman2018]]. Pillboxes did not improve outcomes in ASCENT [[Jerene2025]].`,"living"],
 ["Directly observed therapy (DOT)",`A health worker or supporter watches each dose, in person or by video. It is support, not suspicion [[Karumbi2015,Story2019]].`,"nursing"],
 ["Disseminated BCG disease",`Spread of the live vaccine through the body, mainly in infants with HIV or other immunodeficiency [[Hesseling2009BWHO]].`,"bcg"],
 ["Droplet nucleus",`The tiny dried residue of a respiratory droplet that floats in air and carries bacilli [[Wells1948,Fennelly2020]].`,"spread"],
 ["Drug-induced liver injury (DILI)",`Liver damage from TB drugs; reported in 2–28% of people treated [[Tostmann2008]].`,"safety"],
 ["Drug-susceptibility testing (DST)",`Testing which drugs work against a person's strain, by molecular or phenotypic methods [[WHO-Mod3-2024,Lewinsohn2017]].`,"resistance"],
 ["Early bactericidal activity",`The rapid early kill of growing bacilli, driven mainly by isoniazid [[Jindani2003,Mitchison2000]].`,"drugs"],
 ["End TB Strategy",`WHO's 2014 strategy: by 2035, 90% lower incidence and 95% fewer deaths than 2015, and no catastrophic costs [[WHO-GTR2025]].`,"frontier"],
 ["Environmental controls",`Ventilation, upper-room UV and filtration: the second level of the hierarchy [[WHO-IPC2019,Jensen2005]].`,"control"],
 ["ESAT-6",`A 6 kDa secreted protein of virulent mycobacteria, absent from BCG [[Harboe1996]].`,"bacillus"],
 ["ESX-1",`A type VII secretion system that exports ESAT-6 and CFP-10 and lets the bacillus breach its phagosome [[Groschel2016,vanderWel2007]].`,"bacillus"],
 ["Ethambutol (E)",`A first-line drug that blocks arabinan synthesis; it can cause optic neuritis [[Telenti1997,FDA-Ethambutol]].`,"drugs"],
 ["Extensively drug-resistant TB (XDR-TB)",`Rifampicin-resistant TB also resistant to a fluoroquinolone and to bedaquiline or linezolid (2021 definition) [[WHO-Mod4-2025,Viney2021]].`,"resistance"],
 ["Extrapulmonary TB",`TB outside the lungs; 16% of notified TB in 2024 [[WHO-GTR2025]], most often in lymph nodes [[Peto2009]].`,"symptoms"],
 ["FAST",`Find cases Actively, Separate safely, Treat effectively [[Tierney2022]].`,"control"],
 ["Fit testing",`Checking that a respirator model and size seals on the wearer's face [[Jensen2005,WHO-IPC2019]].`,"control"],
 ["Fixed-dose combination (FDC)",`Several TB drugs in one tablet; WHO recommends FDCs over separate drugs (conditional) [[WHO-Mod4-2025,Lienhardt2011]].`,"regimen"],
 ["Fluoroquinolone",`Levofloxacin or moxifloxacin; WHO Group A drugs. Resistance arises in gyrA [[WHO-Mod4-2025,Takiff1994]].`,"resistance"],
 ["Foamy macrophage",`A lipid-laden macrophage in granulomas that shelters dormant bacilli and feeds cavitation [[Russell2009,Peyron2008]].`,"granuloma"],
 ["Four-symptom screen",`Cough, fever, night sweats or weight loss: WHO's screen for TB in people with HIV [[Getahun2011]].`,"symptoms"],
 ["Gastric aspirate",`A stomach sample used to find TB in children who cannot cough up sputum [[Lewinsohn2017,Kay2025]].`,"diagnose"],
 ["Granuloma",`An organised ball of macrophages and lymphocytes around bacilli. It contains infection but can also shelter it [[Ramakrishnan2012,Pagan2018]].`,"granuloma"],
 ["Group A drugs",`WHO's most important DR-TB medicines: levofloxacin or moxifloxacin, bedaquiline and linezolid [[WHO-Mod4-2025]].`,"drtb"],
 ["H37Rv",`The M. tuberculosis strain whose genome (4,411,529 bp, about 4,000 genes) was published in 1998 [[Cole1998]].`,"bacillus"],
 ["Hepatotoxicity",`Liver injury. ATS advises interrupting treatment at ALT over 3 times normal with symptoms, or over 5 times without [[Saukkonen2006]].`,"safety"],
 ["Hierarchy of controls",`Administrative, then environmental, then respiratory protection [[WHO-IPC2019,Jensen2005]].`,"control"],
 ["Hr-TB",`Isoniazid-resistant, rifampicin-susceptible TB [[WHO-Mod4-2025]].`,"drtb"],
 ["Hyperuricaemia",`Raised uric acid; pyrazinamide causes it by blocking urate excretion [[FDA-Pyrazinamide]].`,"safety"],
 ["IGRA (interferon-γ release assay)",`A blood test for TB infection measuring interferon-γ released in response to ESAT-6 and CFP-10 [[Mazurek2010,Pai2008]].`,"tests"],
 ["Incipient TB",`A proposed state between infection and disease, with bacterial activity but no disease yet [[Drain2018]].`,"spectrum"],
 ["Indeterminate IGRA",`A result that cannot be read, for example when the Nil or mitogen control fails [[Mazurek2010]].`,"tests"],
 ["Induration",`The firm, raised area of a TST reaction; the only part measured [[ATS2000]].`,"tests"],
 ["Infection control (IPC)",`Measures that stop TB spreading in health care and other settings, worked as a package [[WHO-IPC2019]].`,"control"],
 ["Infectious period",`The time someone may have spread TB; usually taken to start 3 months before diagnosis [[NTCA2005]].`,"control"],
 ["inhA",`The gene for a mycolic acid enzyme targeted by isoniazid and ethionamide [[Banerjee1994]].`,"resistance"],
 ["Interferon-γ",`A T-cell cytokine that activates macrophages; essential for containing TB [[Flynn1993]].`,"granuloma"],
 ["IRIS (immune reconstitution inflammatory syndrome)",`Worsening inflammation after starting ART; paradoxical TB-IRIS affects about 18% [[Namale2015]].`,"special"],
 ["Isoniazid (H)",`A first-line prodrug activated by KatG, the main early killer [[Zhang1992,Mitchison2000]].`,"drugs"],
 ["katG",`The gene for the catalase-peroxidase that activates isoniazid; katG315 is the commonest resistance mutation [[Zhang1992,Seifert2015]].`,"resistance"],
 ["LAM (lipoarabinomannan)",`A mycobacterial cell-wall glycolipid detected in urine by the LF-LAM test [[Bjerrum2019]].`,"diagnose"],
 ["Levofloxacin",`A fluoroquinolone; 6 months is WHO's preventive treatment for contacts of people with MDR/RR-TB [[WHO-Mod1-2024]].`,"tpt"],
 ["Line probe assay",`A strip test that reads resistance mutations: 96.7% sensitive for rifampicin resistance [[Nathavitharana2017LPA]].`,"resistance"],
 ["Linezolid",`An oxazolidinone in BPaL(M); toxicities are neuropathy and myelosuppression, lower at 600 mg [[Conradie2022,FDA-Zyvox]].`,"drtb"],
  ["Lost to follow-up",`Language note: the person-first term replacing "defaulter" [[Zachariah2012]].`,"living"],
 ["M72/AS01E",`A protein-adjuvant vaccine candidate: 49.7% efficacy in a phase 2b trial; phase 3 began in 2024 [[Tait2019,NCT06062238]].`,"frontier"],
 ["Mantoux test",`The intradermal tuberculin skin test: 0.1 mL of 5 TU PPD, read at 48–72 hours [[ATS2000]].`,"tests"],
 ["Material support",`Food or financial help, such as food baskets, vouchers and transport money [[WHO-Mod4-2025]].`,"living"],
 ["Mediastinal lymph node",`The lung-draining node where T cells are first primed against TB [[Wolf2008,Reiley2008]].`,"granuloma"],
 ["MGIT",`Mycobacteria Growth Indicator Tube, an automated liquid culture system [[Chihota2010,Cruciani2004]].`,"diagnose"],
 ["Miliary TB",`TB spread widely through the lymph and blood, with nodules throughout the lungs; more common with impaired cell-mediated immunity [[Sharma2005,Nachiappan2017]].`,"symptoms"],
 ["Moxifloxacin",`A fluoroquinolone in BPaLM and the 4-month regimen; boxed warnings include tendon rupture [[WHO-Mod4-2025,FDA-Moxifloxacin]].`,"drugs"],
 ["MTBC (M. tuberculosis complex)",`The closely related, clonal group of bacteria that cause TB, including M. bovis and M. africanum [[Gagneux2018,Brosch2002]].`,"bacillus"],
 ["MTBVAC",`A live-attenuated M. tuberculosis vaccine candidate in a phase 3 infant trial [[Tameris2025,NCT04975178]].`,"frontier"],
 ["Multidrug-resistant TB (MDR-TB)",`TB resistant to at least rifampicin and isoniazid [[WHO-Mod4-2025]].`,"resistance"],
 ["Mycobacterium bovis",`The cattle TB bacillus; causes zoonotic TB in people and is the parent of BCG [[OleaPopelka2017,Luca2013]].`,"bacillus"],
 ["Mycobacterium tuberculosis",`The bacterium that causes TB, named the year after Koch's 1882 discovery [[Cambau2014]].`,"bacillus"],
 ["Mycolic acids",`Long fatty acids forming the waxy outer layer of the cell wall; isoniazid blocks their synthesis [[Brennan2003,Marrakchi2014]].`,"bacillus"],
 ["N95 respirator",`A fitted respirator that filters respirable particles; worn by health workers caring for people with infectious TB [[Jensen2005]].`,"control"],
 ["NAAT (nucleic acid amplification test)",`A molecular test such as Xpert or Truenat that detects TB DNA [[Lewinsohn2017,WHO-Mod3-2024]].`,"diagnose"],
 ["Negative pressure",`Air flowing into a room from the corridor, so contaminated air does not escape [[Jensen2005]].`,"control"],
 ["Non-severe TB (children)",`Peripheral or uncomplicated intrathoracic node TB, uncomplicated pleural effusion, or limited non-cavitary disease: eligible for 4 months [[WHO-Mod4-2025]].`,"special"],
 ["Non-tuberculous mycobacteria (NTM)",`Over 190 environmental mycobacterial species; some cause TB-like lung disease [[Daley2020]].`,"diagnose"],
 ["Notifiable disease",`TB is notifiable: CDC asks that suspected or confirmed TB be reported to public health at once, so treatment can be tracked and contacts checked [[Jensen2005]].`,"control"],
 ["Optic neuritis",`Inflammation of the optic nerve, ethambutol's key toxicity [[FDA-Ethambutol,Ezer2013]].`,"safety"],
 ["Paradoxical reaction",`Temporary worsening despite effective treatment, seen in about 20% of TB lymphadenitis [[Fontanilla2011]].`,"symptoms"],
 ["Patient-centred care",`Care organised around the person's needs, including education, counselling and support [[WHO-Mod4-2025]].`,"living"],
 ["Peripheral neuropathy",`Nerve damage causing tingling or burning; caused by isoniazid and linezolid [[FDA-Isoniazid,Conradie2022]].`,"safety"],
 ["Person-first language",`Words that name the person before the disease and avoid blame [[Zachariah2012]].`,"living"],
  ["Person with presumptive TB",`Language note: the term replacing "TB suspect" [[Zachariah2012]].`,"living"],
 ["Phagosome",`The membrane bubble a macrophage forms around a microbe; TB stops it maturing and acidifying [[SturgillKoszycki1994,Armstrong1971]].`,"granuloma"],
 ["Phthisis",`The ancient Greek name for TB, which Hippocrates described as a fatal disease of young adults [[Barberis2017]].`,"history"],
 ["Post-TB lung disease",`Lasting lung damage after cure: bronchiectasis, obstruction, fibrosis and vascular disease [[Allwood2021]].`,"living"],
 ["Pott's disease",`TB of the spine; seen in Egyptian remains from about 2400 BC [[Barberis2017]].`,"history"],
 ["PPD (purified protein derivative)",`The tuberculin used in the TST, given as 5 TU [[ATS2000]].`,"tests"],
 ["Pre-XDR-TB",`Rifampicin-resistant TB also resistant to at least one fluoroquinolone [[WHO-Mod4-2025]].`,"resistance"],
 ["Pretomanid",`A nitroimidazooxazine in BPaL(M) that inhibits mycolic acid synthesis [[FDA-Pretomanid,Stover2000]].`,"drugs"],
 ["Primary TB",`Disease shortly after infection, commonest in children and immunocompromised people [[Nachiappan2017]].`,"spectrum"],
 ["Pulmonary rehabilitation",`Supervised exercise and education for people with post-TB lung disease [[Migliori2021PTLD,Silva2025PTLD]].`,"living"],
 ["Pyrazinamide (Z)",`A first-line sterilising prodrug activated by pyrazinamidase in acid conditions [[Zhang2003PZA]].`,"drugs"],
 ["Pyridoxine (vitamin B6)",`Given with isoniazid to prevent neuropathy [[Saukkonen2025,FDA-Isoniazid]].`,"safety"],
 ["QT prolongation",`A delay in heart repolarisation on the ECG; a warning for bedaquiline and moxifloxacin [[FDA-Sirturo,FDA-Moxifloxacin]].`,"safety"],
 ["Quantum (Wells-Riley)",`One infectious dose of airborne TB, used to model infection risk in a room [[Escombe2007,Nardell1991]].`,"spread"],
 ["QuantiFERON",`An IGRA read in IU/mL; positive at 0.35 IU/mL or more [[Mazurek2010]].`,"tests"],
 ["RD1 (region of difference 1)",`A genomic region deleted from all BCG strains, encoding ESAT-6 and CFP-10 [[Mahairas1996]].`,"bacillus"],
 ["Reinfection",`A new TB infection after a previous one or after cure; common where transmission is intense [[Verver2005]].`,"risk"],
 ["Relapse",`Return of TB with the same strain after cure; 70% of recurrences in pooled data [[Vega2021]].`,"spectrum"],
 ["Respiratory hygiene",`Covering the mouth and nose when coughing or sneezing, then hand hygiene; a strong WHO recommendation [[WHO-IPC2019]].`,"control"],
 ["Rifampicin (R, rifampin)",`The key sterilising first-line drug, which blocks RNA polymerase [[Campbell2001Rif,Jindani2003]].`,"drugs"],
 ["Rifampicin-resistant TB (RR-TB)",`TB resistant to rifampicin, with or without isoniazid resistance; reported with MDR as MDR/RR-TB [[WHO-Mod4-2025]].`,"resistance"],
 ["Rifapentine (P)",`A long-acting rifamycin taken with food, used in 3HP, 1HP and the 4-month regimen [[FDA-Priftin,Dorman2021]].`,"drugs"],
 ["rpoB",`The gene for the RNA polymerase β subunit; its RRDR holds over 95% of rifampicin-resistance mutations [[Telenti1993,Seifert2015]].`,"resistance"],
 ["Sanatorium",`A rest-and-fresh-air institution, from Brehmer's 1854 idea; the Madras study showed home treatment works as well [[Barberis2017,TCCMadras1959]].`,"history"],
 ["Smear microscopy",`Staining sputum for acid-fast bacilli; three smears find about 70% of culture-confirmed TB [[Lewinsohn2017]].`,"diagnose"],
 ["Source control",`Reducing what an infectious person releases, for example with a surgical mask [[Dharmadhikari2012]].`,"control"],
 ["Sputum induction",`Inhaling nebulised hypertonic saline to produce sputum [[Jensen2005,Hepple2012]].`,"nursing"],
 ["Sterilising activity",`Killing slow and persisting bacilli so TB does not relapse; rifampicin's key role [[Jindani2003,Mitchison2000]].`,"drugs"],
 ["Stigma",`Negative judgement of people with TB, mostly from fear of infection; it delays care and disrupts treatment [[Courtwright2010,Chang2014IJTLD]].`,"living"],
 ["Streptomycin",`The first anti-TB antibiotic, reported in 1944 [[Schatz1944]] and tested in the 1948 MRC trial [[MRC1948]].`,"history"],
 ["Subclinical TB",`TB disease without reported symptoms; about half of confirmed TB in prevalence surveys [[Frascella2021,Coussens2024]].`,"spectrum"],
 ["T-SPOT.TB",`An IGRA that counts spots; positive at 8 or more, borderline at 5–7 [[Mazurek2010]].`,"tests"],
 ["TB disease",`Infection with macroscopic pathology, with or without symptoms [[Coussens2024]].`,"spectrum"],
 ["TB infection",`Immune evidence of M. tuberculosis without disease; it is not contagious. Formerly called latent TB [[Drain2018,Behr2021]].`,"spectrum"],
 ["TB meningitis",`TB of the brain lining, the most lethal form; 6-month mortality 57% with HIV and 16% without [[Stadelman2020]].`,"symptoms"],
 ["TB preventive treatment (TPT)",`Medicines given for TB infection to stop disease developing [[WHO-Mod1-2024]].`,"tpt"],
 ["Tuberculin skin test (TST)",`An intradermal PPD test read as mm of induration [[ATS2000,Lewinsohn2017]].`,"tests"],
 ["TNF (tumour necrosis factor)",`A cytokine needed to keep granulomas intact; blocking it unmasks TB [[Flynn1995,Keane2001]].`,"risk"],
 ["Trained immunity",`Non-specific boosting of innate immune cells, reported after BCG (Early evidence) [[Kleinnijenhuis2012]].`,"bcg"],
 ["Treatment success",`Cure or treatment completion: 88% for drug-susceptible and 71% for MDR/RR-TB [[WHO-GTR2025]].`,"regimen"],
 ["Truenat",`A chip-based molecular TB test conditionally recommended by WHO for initial diagnosis [[WHO-Mod3-2024,PennNicholson2021]].`,"diagnose"],
 ["Tubercle",`Another word for the granuloma the body builds around TB germs [[Ramakrishnan2012,Ehlers2012]].`,"granuloma"],
 ["Upper-room germicidal UV",`Ultraviolet lamps near the ceiling that kill airborne bacilli; cut guinea-pig infection from 35% to 9.5% [[Escombe2009]].`,"control"],
 ["Video-observed therapy (VOT)",`Watching doses by smartphone video instead of in person [[Story2019]].`,"nursing"],
 ["Window prophylaxis",`Preventive treatment for young contacts after a negative first test, until a retest at 8–10 weeks [[NTCA2005]].`,"control"],
 ["World TB Day",`24 March, marking Koch's 1882 announcement [[CDC2018WTBD]].`,"history"],
 ["Xpert MTB/RIF",`A cartridge PCR that detects TB and rifampicin resistance in under 2 hours [[Boehme2010]].`,"diagnose"],
 ["Xpert Ultra",`A more sensitive Xpert cartridge (90.9% vs 84.7%), with slightly lower specificity [[Zifodya2021]].`,"diagnose"],
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold γ to g and hyphens away, so 'interferon-g' and 'xdr' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/γ/g,'g').replace(/β/g,'b').replace(/[-–]/g,'');
  function render(){const q=norm(inp.value.trim());const L=RV_GL.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:RV_GL.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const RV_AREAN={A:'Epidemiology, global burden & history',B:'Transmission, risk factors & host susceptibility',C:'Microbiology, immunology & pathogenesis',D:'Clinical presentation & diagnosis',E:'Treatment of drug-susceptible TB disease & TB infection',F:'Drug-resistant TB, comorbidity & outcomes',G:'Living with TB, infection control & nursing',H:'Vaccines, the End TB Strategy & research'};
const RV_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const RV_svc=s=>s.unverified?[]:RV_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const RV_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(RV_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>RV_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=RV_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=RV_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${RV_link(s)?`<a href="${esc(RV_link(s))}" target="_blank" rel="noopener">${esc(RV_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${RV_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
