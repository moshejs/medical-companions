/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js */
const SR_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const SR_FC=[
 /* ---- Part 1: understanding sepsis & shock ---- */
 [1,`What is sepsis, in the Sepsis-3 definition?`,`"Life-threatening organ dysfunction caused by a dysregulated host response to infection", shown by an acute rise in SOFA of 2 points or more [[Singer2016Sepsis3]].`],
 [1,`What is septic shock (Sepsis-3)?`,`Sepsis needing vasopressors to keep MAP at 65 mm Hg or more, with lactate above 2 mmol/L despite adequate fluids; hospital mortality above 40% in the derivation data [[Singer2016Sepsis3,ShankarHari2016Shock]].`],
 [1,`How many sepsis cases and deaths did GBD estimate for 2017?`,`About 48.9 million cases and 11.0 million sepsis-related deaths, 19.7% of all global deaths [[Rudd2020GBD]].`],
 [1,`Where is the burden of sepsis highest?`,`Sub-Saharan Africa, Oceania and south, east and southeast Asia; 85% of 2017 cases were in low, low-middle or middle Socio-demographic Index countries [[Rudd2020GBD]].`],
 [1,`How often is sepsis present when a US patient dies in hospital?`,`In 52.8% of hospital deaths or hospice discharges in a 6-hospital record review, and it was the immediate cause in 34.9% [[Rhee2019Mortality]].`],
 [1,`Which receptors sense Gram-negative LPS and Gram-positive wall parts?`,`LPS signals through TLR4; lipoteichoic acid and peptidoglycan through TLR2; both converge on NF-κB [[Poltorak1998,Schwandner1999]].`],
 [1,`What are PAMPs and DAMPs?`,`Pathogen-associated molecular patterns are molecules found on microbes; damage-associated molecular patterns are released from injured host cells. Both are sensed by complement, Toll-like and other receptors [[Hotchkiss2016NRDP]].`],
 [1,`What does the NLRP3 inflammasome do?`,`It activates caspase-1, which produces mature IL-1β and IL-18, and cleaves gasdermin D, causing pyroptosis [[Neumann2026NLRP3]].`],
 [1,`Which marker signals septic immunoparalysis?`,`Low monocyte HLA-DR: below 30% on days 3–4 predicted death (OR 6.48) [[Monneret2006]].`],
 [1,`What are neutrophil extracellular traps (NETs)?`,`Fibres of chromatin and granule proteins thrown out by activated neutrophils that bind and kill bacteria [[Brinkmann2004]].`],
 [1,`What is the glycocalyx, and what does sepsis do to it?`,`A gel-like layer lining blood vessels, about 0.5–5.0 μm thick [[Uchimido2019]]. Sepsis strips it away, so vessels leak and tissues swell [[Uchimido2019]].`],
 [1,`What are the ISTH overt DIC and sepsis-induced coagulopathy (SIC) cut-offs?`,`Overt DIC is 5 points or more; SIC is 4 points or more, from PT-INR, platelets and a 4-item SOFA [[Taylor2001DIC,Iba2017SIC,Iba2023DIC]].`],
 [1,`Does a high lactate always mean the tissues are short of oxygen?`,`No. In sepsis lactate can come from adrenaline-driven aerobic glycolysis in muscle [[Levy2005Lactate]]; it is a warning sign of severity [[GarciaAlvarez2014]].`],
 [1,`What are the four determinants of cardiac output?`,`Heart rate, contractility, preload and afterload; cardiac output = heart rate × stroke volume [[Vincent2008CO]].`],
 [1,`Name the four types of shock.`,`Three low-flow types (hypovolaemic, cardiogenic, obstructive) and one distributive type, of which septic shock is the commonest (62% in SOAP II) [[Cecconi2014ESICM]].`],
 [1,`What happens to the heart in septic shock?`,`Survivors had a low ejection fraction with a dilated left ventricle that recovered in about 10 days [[Parker1984]].`],
 /* ---- Part 2: who is at risk & recognising it ---- */
 [2,`How much does severe sepsis incidence rise with age?`,`More than 100-fold, from 0.2 per 1,000 in children to 26.2 per 1,000 over age 85 (US, 1995) [[Angus2001CCM]].`],
 [2,`What share of US sepsis cases are in people aged 65 or older?`,`64.9%, though they were 12% of the population (RR 13.1) [[Martin2006Age]].`],
 [2,`Which chronic conditions most raised later sepsis risk in REGARDS?`,`Chronic lung disease (aHR 2.43), peripheral artery disease (2.16) and chronic kidney disease (1.99), with risk rising with the number of conditions [[Wang2012Chronic]].`],
 [2,`Where does most sepsis begin?`,`Outside hospital: 90.3% was community-onset, though 60.7% had recent healthcare exposure [[Fay2020Exposures]].`],
 [2,`How does hospital-onset sepsis compare with community-onset?`,`12.1% of cases, with in-hospital mortality of 33% vs 17% (adjusted OR 2.1) [[Rhee2019HospOnset]].`],
 [2,`Is the public "SEPSIS" mnemonic validated?`,`No. It was written by the World Sepsis Day committee for awareness, and 14.9% of Thai emergency patients with sepsis had none of its symptoms [[Wattanapaiboon2020SEPSIS]].`],
 [2,`What are the three bedside "windows" on perfusion?`,`The skin, the kidneys (urine output) and the brain (mental status) [[Cecconi2014ESICM]].`],
 [2,`What is the shock index?`,`Heart rate divided by systolic blood pressure. Normal is about 0.5–0.7; values near 1.0 suggest shock [[Koch2019SI]]. A teaching idea, not a home test.`],
 [2,`How well do common electronic sepsis alerts perform?`,`The Epic Sepsis Model had an external AUC of 0.63 and missed 67% of sepsis [[Wong2021Epic]].`],
 /* ---- Part 3: definitions & tests ---- */
 [3,`What are the SIRS criteria?`,`Two or more of: temperature above 38 or below 36°C; heart rate above 90; breathing rate above 20 or PaCO2 below 32; white count above 12, below 4 ×10⁹/L or more than 10% bands [[Bone1992SIRS,Song2018qSOFA]].`],
 [3,`What are the three qSOFA items?`,`Breathing rate 22/min or more, altered mentation, systolic BP 100 mm Hg or less; positive with 2 of 3 [[Seymour2016qSOFA]].`],
 [3,`Where did qSOFA beat SOFA in the derivation data?`,`Outside the ICU (AUROC 0.81 vs 0.79); inside the ICU SOFA did better (0.74 vs 0.66) [[Seymour2016qSOFA]].`],
 [3,`What does SSC 2021 say about qSOFA for screening?`,`It recommends against qSOFA as a single screening tool, compared with SIRS, NEWS or MEWS [[Evans2021SSC]].`],
 [3,`qSOFA vs SIRS: which is sensitive, which specific?`,`qSOFA: specific, not sensitive. SIRS: sensitive, not specific (pooled 60.8%/72.0% vs 88.1%/25.8%) [[Fernando2018]].`],
 [3,`How is SOFA built?`,`Six systems (respiratory, coagulation, liver, cardiovascular, nervous system, renal), each 0–4, total 0–24 [[Lambden2019SOFA]].`],
 [3,`What did SOFA-2 (2025) change?`,`It kept 6 systems with revised thresholds, from 3.34 million ICU encounters (AUROC 0.79 vs 0.77) [[Ranzani2025SOFA2]]; it adds options such as SpO2/FiO2 and counts non-invasive support [[Lobo2025SOFA2]].`],
 [3,`How much do antibiotics given first reduce blood culture yield?`,`Positive cultures fell from 31.4% to 19.4% when drawn after antibiotics [[Cheng2019Cultures]].`],
 [3,`How many blood culture sets detect most bloodstream infections?`,`Two sets about 90%, three about 98% [[Lee2007Cultures]].`],
 [3,`How does SSC 2021 use procalcitonin?`,`It suggests against procalcitonin to decide to start antibiotics, but suggests procalcitonin plus clinical evaluation to decide when to stop [[Evans2021SSC]].`],
 /* ---- Part 4: treatment ---- */
 [4,`What are the five Hour-1 bundle elements?`,`Measure lactate (remeasure if above 2 mmol/L); blood cultures before antibiotics; broad-spectrum antibiotics; 30 mL/kg crystalloid for hypotension or lactate of 4 or more; vasopressors for MAP of 65 or more, as published [[Wang2021Hour1,Levy2018Bundle]].`],
 [4,`What antibiotic timing does SSC 2021 recommend?`,`Within 1 hour for possible septic shock or a high likelihood of sepsis; for possible sepsis without shock, rapid assessment and antibiotics within 3 hours if concern persists [[Evans2021SSC]].`],
 [4,`What did Kumar 2006 find about antibiotic delay?`,`Each hour of delay after hypotension was associated with an average 7.6% fall in survival over the first 6 hours (retrospective cohort) [[Kumar2006Delay]].`],
 [4,`Did EGDT hold up?`,`Rivers 2001 reported 30.5% vs 46.5% mortality; the PRISM meta-analysis of ProCESS, ARISE and ProMISe found 24.9% vs 25.4% [[Rivers2001EGDT,PRISM2017]].`],
 [4,`What initial fluid do SSC 2021 and 2026 suggest?`,`At least 30 mL/kg IV crystalloid within the first 3 hours for sepsis-induced hypoperfusion or septic shock; a weak (conditional), low-certainty statement, as published [[Evans2021SSC,Prescott2026SSC]].`],
 [4,`What did 6S show about starches?`,`More deaths (51% vs 43%) and more renal replacement therapy (22% vs 16%); SSC strongly recommends against starches [[Perner2012SixS,Evans2021SSC]].`],
 [4,`Does CVP predict fluid responsiveness?`,`No (AUC 0.56). Passive leg raising with cardiac output does (AUC 0.95) [[Marik2008CVP,Monnet2016PLR]].`],
 [4,`Which vasopressor is first-line, and why not dopamine?`,`Noradrenaline (norepinephrine) is first-line [[Evans2021SSC]]; dopamine caused more arrhythmias in SOAP II (24.1% vs 12.4%) [[DeBacker2010SOAPII]].`],
 [4,`What MAP target did SEPSISPAM test, and what happened?`,`80–85 vs 65–70 mm Hg: no survival gain, more atrial fibrillation; SSC recommends an initial target of 65 mm Hg [[Asfar2014SEPSISPAM,Evans2021SSC]].`],
 [4,`ADRENAL vs APROCCHSS: what did steroids do?`,`ADRENAL (hydrocortisone): faster shock reversal, 90-day mortality 27.9% vs 28.8%. APROCCHSS (with fludrocortisone): 43.0% vs 49.1% [[Venkatesh2018ADRENAL,Annane2018APROCCHSS]].`],
 [4,`What is source control?`,`Finding and draining, removing or debriding the source of infection "as soon as medically and logistically practical" (SSC 2021 Best Practice Statement) [[Evans2021SSC]].`],
 [4,`How much does early surgery matter in necrotising soft-tissue infection?`,`Surgery within 6 hours vs later: mortality 19% vs 32% [[Nawijn2020NSTI]].`],
 [4,`Are shorter antibiotic courses enough?`,`7 days was noninferior to 14 for bloodstream infection (BALANCE), and about 4 days after source control matched about 8 for intra-abdominal infection (STOP-IT) [[Daneman2025BALANCE,Sawyer2015STOPIT]].`],
 [4,`What is lung-protective ventilation?`,`About 6 mL/kg predicted body weight with plateau pressure 30 cmH2O or less; in ARDSNet mortality fell from 39.8% to 31.0% [[ARDSNet2000]].`],
 [4,`What did NICE-SUGAR show?`,`Tight glucose control (81–108 mg/dL) increased mortality; SSC starts insulin at 180 mg/dL or more and targets 144–180 [[Finfer2009NICESUGAR,Evans2021SSC]].`],
 /* ---- Part 5: special situations & recovery ---- */
 [5,`How do the Phoenix criteria define sepsis and septic shock in children?`,`Sepsis: suspected infection with a Phoenix Sepsis Score of 2 or more. Septic shock: sepsis with at least 1 cardiovascular point. Systems: respiratory, cardiovascular, coagulation, neurological [[Schlapbach2024Phoenix]].`],
 [5,`What did FEAST show about fluid boluses in African children?`,`Boluses raised 48-hour mortality (10.6% and 10.5% vs 7.3%) [[Maitland2011FEAST]].`],
 [5,`What is early-onset neonatal sepsis?`,`Sepsis within 72 hours of birth, mainly from E. coli and group B streptococcus; late-onset is after 3 days [[Stoll2020EOS,Stoll2002LOS]].`],
 [5,`How is maternal sepsis defined (WHO 2017)?`,`Organ dysfunction from infection during pregnancy, childbirth, post-abortion or the postpartum period [[Bonet2017Maternal]].`],
 [5,`Why can early sepsis be hidden in pregnancy?`,`Heart rate rises 10–20 beats a minute and minute ventilation 40–50% in normal pregnancy [[SomaPillay2016]].`],
 [5,`How much higher is invasive group A strep risk after birth?`,`About 20-fold higher in postpartum women than in non-pregnant women [[Deutscher2011Strep]].`],
 [5,`What is PICS?`,`Post-intensive care syndrome: new or worse physical, cognitive or mental health problems after critical illness that persist beyond hospital; PICS-F affects family [[Needham2012PICS]].`],
 [5,`What happens in the year after a sepsis admission?`,`About half recover, one-third die within a year, and one-sixth have severe persistent impairment (population figures) [[Prescott2018Recovery]].`],
 [5,`How common is readmission after sepsis?`,`About 40% within 90 days, most often for infection [[Prescott2015Readmission,ShankarHari2020Rehospitalisation]].`],
 [5,`What did ICU diaries do?`,`Reduced new PTSD from 13% to 5% [[Jones2010Diaries]].`],
 [5,`What did the Keystone checklist bundle achieve?`,`Central-line infections fell from 7.7 to 1.4 per 1,000 catheter-days [[Pronovost2006CLABSI]].`],
 [5,`What does the noradrenaline label say about extravasation?`,`Infiltrate the area with phentolamine in saline as soon as possible [[FDA-Levophed]].`],
 [5,`When do meningococcal warning signs appear?`,`Leg pain, cold hands and feet and abnormal skin colour at a median of about 8 hours; the rash comes late (13–22 h) [[Thompson2006Meningococcal]].`],
 [5,`What did intrapartum GBS prophylaxis do?`,`Early-onset GBS fell from 1.7 to 0.6 per 1,000 live births (1993–1998) [[Schrag2000GBS]].`],
 [5,`Which Seymour phenotype had the highest mortality?`,`δ (13% of patients), with 40% 28-day mortality (Early evidence) [[Seymour2019Phenotypes]].`],
 [5,`What did LOVIT find for vitamin C?`,`IV vitamin C increased death or persistent organ dysfunction (RR 1.21) [[Lamontagne2022LOVIT]].`],
 /* ---- Part 6: context & review ---- */
 [6,`What did Semmelweis's handwashing do?`,`Chlorine handwashing (May 1847) lowered Clinic 1 puerperal mortality from 18.3% to 2.0% [[Stang2022Semmelweis]].`],
 [6,`When were SIRS and Sepsis-1 defined?`,`At the ACCP/SCCM conference in 1991, published 1992 [[Bone1992SIRS]].`],
 [6,`Which sepsis drug was approved and later withdrawn?`,`Drotrecogin alfa (activated): PROWESS 2001 positive, withdrawn 2011, PROWESS-SHOCK 2012 negative [[Bernard2001PROWESS,MedLett2011Xigris,Ranieri2012PROWESSSHOCK]].`],
 [6,`What did the 2017 World Health Assembly do?`,`Made sepsis a global health priority with a resolution on prevention, diagnosis and management [[Reinhart2017WHA]].`]
];
const SR_MN=[
 ["SEPSIS","public message",`<b>S</b>lurred speech or confusion; <b>E</b>xtreme shivering or muscle pain, fever; <b>P</b>assing no urine all day; <b>S</b>evere breathlessness; <b>I</b>t feels like you are going to die; <b>S</b>kin mottled or discoloured. Not validated, and someone can have sepsis without matching it [[Wattanapaiboon2020SEPSIS]].`],
 ["22, 100, altered","memory aid",`qSOFA: breathing rate <b>22</b>/min or more, systolic BP <b>100</b> mm Hg or less, <b>altered</b> mentation; 2 of 3 is positive [[Seymour2016qSOFA]]. Not a single screening tool (SSC 2021) [[Evans2021SSC]].`],
 ["Plus two","memory aid",`Sepsis-3 organ dysfunction is an acute SOFA rise of <b>2</b> points or more [[Singer2016Sepsis3]].`],
 ["65 and 2","memory aid",`Septic shock: vasopressors to keep MAP <b>65</b> mm Hg or more and lactate above <b>2</b> mmol/L despite adequate fluids [[Singer2016Sepsis3]].`],
 ["Measure, culture, treat, fill, squeeze","memory aid",`The Hour-1 bundle: lactate, blood cultures before antibiotics, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension or lactate of 4 or more, vasopressors for MAP of 65 or more, as published [[Wang2021Hour1,Levy2018Bundle]].`],
 ["One and three","memory aid",`SSC 2021 antibiotic timing: within <b>1</b> hour for possible shock or high likelihood of sepsis; within <b>3</b> hours for possible sepsis without shock if concern persists [[Evans2021SSC]].`],
 ["Pump, tank, pipes","memory aid",`Shock as the heart (pump), the blood volume (tank) and the vessels (pipes) [[Perera2010RUSH]]: cardiogenic, hypovolaemic, distributive, with obstructive blocking the flow [[Cecconi2014ESICM]].`],
 ["Skin, kidneys, brain","memory aid",`The three bedside windows on perfusion: mottled or cold skin, low urine output, altered mental status [[Cecconi2014ESICM]].`],
 ["Six and thirty","memory aid",`Lung-protective ventilation: <b>6</b> mL/kg predicted body weight, plateau <b>30</b> cmH2O or less [[ARDSNet2000]].`],
 ["Seven, not nine","memory aid",`TRISS: a haemoglobin trigger of <b>7</b> g/dL was as safe as <b>9</b> in septic shock [[Holst2014TRISS]].`],
 ["Breathe, beat, clot, think","memory aid",`The four Phoenix systems in children: respiratory, cardiovascular, coagulation, neurological [[Schlapbach2024Phoenix]].`],
 ["A half, a third, a sixth","memory aid",`After a sepsis admission: about half recover, a third die within a year, a sixth have severe lasting impairment (population figures) [[Prescott2018Recovery]].`]
];
/* the five Hour-1 elements, quoted from the 2018 bundle; minutes on the clock are a teaching sketch */
const SR_H1=[
 ['Measure','lactate','remeasure if above 2 mmol/L'],
 ['Culture','blood cultures','before antibiotics'],
 ['Treat','antibiotics','broad-spectrum'],
 ['Fill','crystalloid','30 mL/kg if hypotension or lactate ≥4'],
 ['Squeeze','vasopressor','for MAP ≥65 mm Hg']
];
const SR_STEPS=[
 {from:0,at:.1,k:'Measure',t:'Lactate',txt:`The first element: "measure lactate level and remeasure lactate level if initial lactate is >2 mmol/L" [[Wang2021Hour1,Levy2018Bundle]]. SSC 2021 suggests guiding resuscitation to bring a raised lactate down [[Evans2021SSC]]. A high lactate marks severity but does not always mean oxygen shortage [[GarciaAlvarez2014]].`,pt:'A blood test for lactate shows how hard the body is struggling. It is repeated to see whether treatment is helping.',hook:'Sepsis-3 septic shock needs lactate above 2 mmol/L despite adequate fluids. [[Singer2016Sepsis3]]'},
 {from:.2,at:.3,k:'Culture',t:'Cultures before antibiotics',txt:`Blood cultures are taken before antibiotics [[Wang2021Hour1]]: drawn after antibiotics they were positive 19.4% of the time instead of 31.4% [[Cheng2019Cultures]]. Two sets detect about 90% of bloodstream infections, three about 98% [[Lee2007Cultures]].`,pt:'Blood is taken to grow the germ, so the team can later pick the best antibiotic. It is done first because antibiotics can stop the germ growing in the bottle.',hook:'Cultures after antibiotics: positivity 31.4% → 19.4%. [[Cheng2019Cultures]]'},
 {from:.4,at:.5,k:'Treat',t:'Broad-spectrum antibiotics',txt:`SSC 2021 recommends antimicrobials within 1 hour for possible septic shock or a high likelihood of sepsis, and within 3 hours for possible sepsis without shock if concern persists [[Evans2021SSC]]. In New York data, each hour to antibiotics carried OR 1.04 for risk-adjusted death [[Seymour2017Timing]].`,pt:'Antibiotics are started fast, often within an hour when someone is very unwell. Later they are narrowed to the drug that fits the germ.',hook:'SSC 2021: 1 hour for possible shock or probable sepsis; 3 hours for possible sepsis without shock. [[Evans2021SSC]]'},
 {from:.6,at:.7,k:'Fill',t:'Crystalloid',txt:`"Begin rapid administration of 30 mL/kg crystalloid for hypotension or lactate ≥4 mmol/L" [[Wang2021Hour1]]. SSC 2021 and 2026 keep at least 30 mL/kg in the first 3 hours as a weak (conditional), low-certainty statement [[Evans2021SSC,Prescott2026SSC]]. Time to the fluid bolus was not linked with mortality in New York data (OR 1.01) [[Seymour2017Timing]].`,pt:'A drip of salt-based fluid helps refill the circulation. Doctors then check whether more fluid is still helping before giving more.',hook:'Fluid dose quoted as published: 30 mL/kg crystalloid. [[Wang2021Hour1]]'},
 {from:.8,at:.9,k:'Squeeze',t:'Vasopressors',txt:`"Apply vasopressor if hypotension is present during or after fluid resuscitation to maintain a mean arterial pressure ≥65 mm Hg" [[Wang2021Hour1]]. Noradrenaline (norepinephrine) is first-line, and SSC suggests starting peripherally rather than delaying for a central line [[Evans2021SSC]]. A teaching sketch, never instructions for care.`,pt:'If blood pressure stays low, a medicine given by a pump tightens the blood vessels to push it back up.',hook:'Initial MAP target 65 mm Hg (SSC 2021). [[Evans2021SSC]]'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','%t:cards.all%'],...Object.keys(SR_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=SR_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=SR_PARTN[c[0]]+'%t:cards.question%';$('#fcTagB').textContent=SR_PARTN[c[0]]+'%t:cards.answer%';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=SR_MN.map(m=>`<div class="card"><span class="tag accent">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: the Hour-1 bundle ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  const ph=[0,.2,.4,.6,.8,1.01];
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const L=N?{x:16,y:44,w:368}:{x:16,y:48,w:330},R=N?{x:16,y:300,w:368,h:326}:{x:362,y:20,w:342,h:344};
    const RH=N?48:60,TH=N?40:50;
    const on=k=>ramp(t,ph[k]+.02,ph[k]+.07);
    const vis=k=>ramp(t,ph[k],ph[k]+.035)*(k===4?1:1-ramp(t,ph[k+1]-.02,ph[k+1]+.015));
    const mins=Math.round(lerp(0,60,clamp(t/.95)));
    let s='';
    s+=`<text class="t-lbl" x="${L.x}" y="${L.y-16}">Hour-1 bundle · ${mins} min</text>`;
    s+=`<text class="t-xs t-end" x="${L.x+L.w}" y="${L.y-16}">started within the hour</text>`;
    SR_H1.forEach(([w,what,sub],k)=>{
      const y=L.y+k*RH,o=on(k),hot=o>.5;
      s+=`<g style="opacity:${f1(.3+.7*o)}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${TH}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      s+=`<circle cx="${L.x+22}" cy="${y+TH/2}" r="${N?13:14}" style="fill:var(--brand)"/><text class="t-lbl t-mid" x="${L.x+22}" y="${y+TH/2+5}" style="fill:var(--on-brand)">${k+1}</text>`;
      s+=`<text class="t-sm" x="${L.x+46}" y="${y+(N?17:22)}" style="fill:var(--ink);font-weight:700">${w}: ${what}</text><text class="t-xs" x="${L.x+46}" y="${y+(N?32:39)}">${sub}</text>`;
      s+=`<circle cx="${L.x+L.w-20}" cy="${y+TH/2}" r="8" style="fill:var(${hot?'--good':'--panel-2'});stroke:var(${hot?'--good':'--line'})"/>`;
      s+='</g>'});
    /* explainer panel */
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const W=R.w;
    s+=clock(W-44,44,28,mins,{label:''});
    const v0=vis(0);if(v0>0){const lv=lerp(1,4.2,ease(ramp(t,.03,.14)));
      s+=`<g style="opacity:${f1(v0)}"><text class="t-lbl" x="16" y="30">Measure lactate</text>`+lactateMeter(40,60,26,190,lv,6,{label:'lactate',unit:'mmol/L',val:true,bands:[{from:0,to:2,col:'var(--good-soft)'},{from:2,to:6,col:'var(--lactate-soft)'}]});
      s+=`<text class="t-sm" x="100" y="110" style="fill:var(--ink)">above 2: remeasure</text><text class="t-xs" x="100" y="130">a marker of severity,</text><text class="t-xs" x="100" y="148">not always oxygen debt</text><text class="t-xs" x="100" y="180">4 or more: start fluid</text></g>`}
    const v1=vis(1);if(v1>0){const g=ease(ramp(t,.22,.34));
      s+=`<g style="opacity:${f1(v1)}"><text class="t-lbl" x="16" y="30">Blood cultures first</text>`;
      [0,1].forEach(j=>{const bx=40+j*70;s+=`<rect x="${bx}" y="80" width="44" height="110" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><rect x="${bx+4}" y="${f1(186-80*g)}" width="36" height="${f1(80*g)}" rx="6" style="fill:var(--blood-soft)"/><rect x="${bx+10}" y="68" width="24" height="14" rx="3" style="fill:var(--${j?'dx':'accent'})"/>`});
      s+=bacterium(62,150,14,{op:g})+bacterium(130,140,12,{op:g,ang:40});
      s+=`<text class="t-xs" x="16" y="226">after antibiotics: positive 31.4% → 19.4%</text><text class="t-xs" x="16" y="244">two sets find about 90%, three about 98%</text></g>`}
    const v2=vis(2);if(v2>0){const dr=ramp(t,.42,.58);
      s+=`<g style="opacity:${f1(v2)}"><text class="t-lbl" x="16" y="30">Broad-spectrum antibiotics</text>`+ivBag(80,60,1.3,{fill:1-dr*.6,col:'var(--rx)',ph:t*40,label:'Abx',to:[80,200]}).svg;
      for(let j=0;j<4;j++){const kill=clamp(dr*1.6-j*.25);s+=bacterium(150+j*40,150+(j%2)*26,18,{op:1-kill*.85,div:0,ang:j*35})}
      s+=`<text class="t-xs" x="16" y="244">SSC 2021: within 1 h if shock possible</text><text class="t-xs" x="16" y="262">or sepsis likely; within 3 h otherwise</text></g>`}
    const v3=vis(3);if(v3>0){const fl=ramp(t,.62,.78);
      s+=`<g style="opacity:${f1(v3)}"><text class="t-lbl" x="16" y="30">Crystalloid</text>`+ivBag(80,60,1.3,{fill:1-fl*.8,col:'var(--fluid)',ph:t*40,label:'30 mL/kg',to:[80,200]}).svg;
      s+=`<text class="t-sm" x="150" y="110" style="fill:var(--ink)">for hypotension</text><text class="t-sm" x="150" y="128" style="fill:var(--ink)">or lactate ≥4</text><text class="t-xs" x="150" y="160">SSC 2021 and 2026:</text><text class="t-xs" x="150" y="176">at least 30 mL/kg in 3 h</text><text class="t-xs" x="150" y="192">(weak, low certainty)</text>`;
      s+=`<text class="t-xs" x="16" y="244">then check whether more fluid still helps</text></g>`}
    const v4=vis(4);if(v4>0){const pv=ramp(t,.82,.95),map=lerp(52,68,ease(pv));
      s+=`<g style="opacity:${f1(v4)}"><text class="t-lbl" x="16" y="30">Vasopressor</text>`+pump(16,70,140,70,{v:pv,txt:'NA',on:true}).svg;
      s+=gauge(250,170,56,map,120,{label:'MAP',unit:'mm Hg',big:true,bands:[{to:65,col:'var(--bad-soft)'},{to:120,col:'var(--good-soft)'}]});
      s+=`<text class="t-xs" x="16" y="244">noradrenaline first-line; may start</text><text class="t-xs" x="16" y="262">peripherally rather than wait (SSC 2021)</text></g>`}
    s+=`<text class="t-xs" x="16" y="${R.h-14}" style="fill:var(--muted)">a teaching sketch, not a protocol</text></g>`;
    svg.innerHTML=s;
    const p=phaseOf(SR_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(SR_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${mins} minutes: ${SR_STEPS[p].k}`)}
  const stop=playWire(rg,$('#rvPlay'),draw,18000,'%t:player.replay%','review');
  const setSt=stepWire($('#rvSteps'),SR_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const SQ_Q=[
 [1,`In GBD 2017, sepsis-related deaths made up about what share of all global deaths?`,[`2%`,`8%`,`19.7%`,`45%`],2,`About 11.0 million of them, 19.7% of all deaths [[Rudd2020GBD]].`],
 [1,`More than half of global sepsis cases in 2017 occurred in:`,[`Adults over 65`,`Children`,`ICU patients`,`High-income countries`],1,`20.3 million cases were in children under 5; many were newborns [[Rudd2020GBD]].`],
 [1,`Gram-negative lipopolysaccharide (LPS) is sensed mainly by:`,[`TLR2`,`TLR4`,`TLR9`,`NLRP3`],1,`LPS signals through TLR4; Gram-positive wall parts through TLR2 [[Poltorak1998,Schwandner1999]].`],
 [1,`In pneumonia sepsis (GenIMS), the cytokine pattern with the highest risk of death was:`,[`Low IL-6, low IL-10`,`High IL-6 only`,`High IL-10 only`,`High IL-6 and high IL-10`],3,`Both high: HR 20.5 [[Kellum2007GenIMS]]. The response can be over-active and suppressed at once.`],
 [1,`Non-selective nitric oxide synthase inhibition in septic shock:`,[`Raised blood pressure but increased mortality`,`Lowered mortality`,`Had no effect on pressure`,`Was approved as treatment`],0,`Mortality 59% vs 49% [[Lopez2004NOS]].`],
 [1,`Which shock type is "distributive"?`,[`Haemorrhage`,`Heart attack`,`Septic shock`,`Tension pneumothorax`],2,`Hypovolaemic, cardiogenic and obstructive are low-flow; distributive (like septic) is hyperkinetic [[Cecconi2014ESICM]].`],
 [1,`Shock is defined by:`,[`Systolic BP under 90`,`Inadequate cellular oxygen use`,`Heart rate over 120`,`Fever`],1,`Hypotension is common but not required; lactate is typically above 2 mmol/L [[Cecconi2014ESICM]].`],
 [2,`Adults aged 65 or older make up about what share of US sepsis cases?`,[`12%`,`25%`,`45%`,`65%`],3,`64.9%, though only 12% of the population [[Martin2006Age]].`],
 [2,`What share of Thai emergency patients with sepsis had none of the "SEPSIS" mnemonic symptoms?`,[`0%`,`1.1%`,`14.9%`,`54.9%`],2,`The mnemonic is a reminder, not a test, and it is unvalidated [[Wattanapaiboon2020SEPSIS]].`],
 [2,`Compared with community-onset sepsis, hospital-onset sepsis had in-hospital mortality of:`,[`About the same`,`33% vs 17%`,`Half as high`,`5% vs 17%`],1,`Adjusted OR 2.1 [[Rhee2019HospOnset]].`],
 [3,`Which is NOT a qSOFA item?`,[`Breathing rate 22/min or more`,`Systolic BP 100 mm Hg or less`,`Altered mentation`,`Temperature above 38°C`],3,`qSOFA has no temperature item [[Seymour2016qSOFA]].`],
 [3,`SSC 2021 on qSOFA as a single screening tool:`,[`Recommends it`,`Recommends against it`,`Makes no statement`,`Requires it in children`],1,`Against, compared with SIRS, NEWS or MEWS (strong, moderate) [[Evans2021SSC]].`],
 [3,`Sepsis-3 organ dysfunction is an acute SOFA rise of at least:`,[`1 point`,`2 points`,`4 points`,`6 points`],1,`Carrying in-hospital mortality above 10% [[Singer2016Sepsis3]].`],
 [3,`The term dropped by Sepsis-3 as redundant was:`,[`Septic shock`,`Severe sepsis`,`Infection`,`Organ dysfunction`],1,`[[Singer2016Sepsis3]].`],
 [3,`About what share of ICU patients with infection and organ failure are SIRS-negative?`,[`1 in 2`,`1 in 8`,`1 in 50`,`None`],1,`SIRS misses some sepsis [[Kaukonen2015]].`],
 [3,`Drawing blood cultures after antibiotics changed positivity from 31.4% to:`,[`30.9%`,`28%`,`19.4%`,`2%`],2,`About 40% fewer positives [[Cheng2019Cultures]].`],
 [4,`ANDROMEDA-SHOCK compared targeting capillary refill with targeting lactate. 28-day mortality was:`,[`34.9% vs 43.4%, not significant`,`Equal`,`Higher with capillary refill`,`20% vs 50%`],0,`P = 0.06 [[Hernandez2019ANDROMEDA]]. SSC 2021 suggests capillary refill as an adjunct [[Evans2021SSC]].`],
 [4,`In New York's mandated data, which delay was NOT linked with higher mortality?`,[`Bundle completion`,`Antibiotics`,`Fluid bolus`,`All were linked`],2,`OR 1.04 per hour for bundle and antibiotics, 1.01 for fluid bolus [[Seymour2017Timing]].`],
 [4,`In SAFE, 4% albumin compared with saline for 28-day mortality was:`,[`Better`,`Worse`,`Equivalent (RR 0.99)`,`Not measured`],2,`[[Finfer2004SAFE]].`],
 [4,`Which predicts fluid responsiveness best?`,[`Central venous pressure`,`Passive leg raise with cardiac output`,`Heart rate alone`,`Skin turgor`],1,`AUC 0.95 vs 0.56 for CVP [[Monnet2016PLR,Marik2008CVP]].`],
 [4,`In SOAP II, dopamine compared with noradrenaline caused:`,[`Fewer arrhythmias`,`More arrhythmias (24.1% vs 12.4%)`,`Lower mortality`,`No difference in anything`],1,`Noradrenaline is first-line [[DeBacker2010SOAPII,Evans2021SSC]].`],
 [4,`The initial MAP target recommended by SSC 2021 for septic shock on vasopressors is:`,[`55 mm Hg`,`65 mm Hg`,`80–85 mm Hg`,`100 mm Hg`],1,`SEPSISPAM's higher target gave no survival gain and more atrial fibrillation [[Evans2021SSC,Asfar2014SEPSISPAM]].`],
 [4,`ADRENAL (hydrocortisone 200 mg/day) showed:`,[`Lower 90-day mortality`,`Faster shock reversal, no mortality change`,`More deaths`,`No effect at all`],1,`3 vs 4 days to reversal; 27.9% vs 28.8% mortality [[Venkatesh2018ADRENAL]].`],
 [4,`In BALANCE, 7 days of antibiotics for bloodstream infection compared with 14 was:`,[`Inferior`,`Noninferior`,`Harmful`,`Not tested`],1,`S. aureus was excluded [[Daneman2025BALANCE]].`],
 [4,`PROSEVA prone positioning for severe ARDS gave 28-day mortality of:`,[`16.0% vs 32.8%`,`Equal`,`40% vs 30%`,`5% vs 6%`],0,`SSC suggests prone positioning for more than 12 hours a day [[Guerin2013PROSEVA,Evans2021SSC]].`],
 [4,`Early dialysis without urgent indications (AKIKI, IDEAL-ICU, STARRT-AKI):`,[`Saved lives`,`Did not save lives`,`Was not studied`,`Halved mortality`],1,`[[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]].`],
 [5,`Under the Phoenix criteria, septic shock in a child is sepsis plus:`,[`Fever`,`At least 1 cardiovascular point`,`Positive blood culture`,`qSOFA 2`],1,`Triggers include hypotension for age, lactate above 5 mmol/L or any vasoactive medicine [[Schlapbach2024Phoenix]].`],
 [5,`FEAST found that fluid boluses in African children with severe febrile illness:`,[`Lowered 48-hour mortality`,`Raised 48-hour mortality`,`Had no effect`,`Were not given`],1,`10.6% and 10.5% vs 7.3% [[Maitland2011FEAST]].`],
 [5,`Sepsis became the leading cause of Direct maternal death in the UK in 2006–08, driven by:`,[`E. coli`,`Group A streptococcus`,`Influenza`,`Candida`],1,`[[Cantwell2011CMACE]].`],
 [5,`After sepsis, about what share of survivors are readmitted within 90 days?`,[`5%`,`15%`,`40%`,`80%`],2,`Infection is the commonest reason [[Prescott2015Readmission]].`],
 [5,`In meningococcal disease, the rash typically appears:`,[`First`,`Late, after leg pain and cold hands and feet`,`Never`,`Only in adults`],1,`Early signs at a median of about 8 h, rash at 13–22 h [[Thompson2006Meningococcal]].`],
 [5,`The Epic Sepsis Model in external validation:`,[`AUC 0.63, missed 67% of sepsis`,`AUC 0.95`,`Was perfect`,`Was never validated`],0,`[[Wong2021Epic]].`],
 [6,`Semmelweis introduced handwashing with:`,[`Carbolic acid`,`Chlorine`,`Alcohol gel`,`Soap only`],1,`Vienna, May 1847 [[Stang2022Semmelweis]]. Lister's antiseptic principle followed in 1867 [[Lister1867BMJ]].`],
 [6,`Drotrecogin alfa (Xigris) was withdrawn worldwide in:`,[`2001`,`2006`,`2011`,`2016`],2,`After PROWESS-SHOCK failed [[MedLett2011Xigris,Ranieri2012PROWESSSHOCK]].`],
 [6,`The Phoenix paediatric sepsis criteria were published in:`,[`2005`,`2016`,`2021`,`2024`],3,`Replacing the 2005 SIRS-based criteria [[Schlapbach2024Phoenix,Goldstein2005Paeds]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(SR_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=SQ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">%t:quiz.finished%</div><div class="q">%t:quiz.scored{score:score,total:list.length,pct:pct}%</div><p>${pct>=85?'%t:quiz.excellent%':pct>=65?'%t:quiz.solid%':'%t:quiz.retry%'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">%t:quiz.again%</button><button class="btn" data-go="review">%t:quiz.to_cards%</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>%t:quiz.question{n:i+1,total:list.length}%</span><span>%t:quiz.score% <b>${score}</b></span><span>${SR_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'%t:quiz.letters%'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
const SG_T=[
 ["Acute kidney injury (AKI)",`A sudden fall in kidney function. By KDIGO, urine below 0.5 mL/kg/h for 6 hours is one criterion [[Kellum2013KDIGO]]. Septic shock was the commonest contributor to ICU acute renal failure (47.5%) [[Uchino2005]].`,"icu"],
 ["Adrenaline (epinephrine)",`A hormone and medicine that tightens vessels and stimulates the heart. SSC 2021 suggests adding it when MAP stays low despite noradrenaline and vasopressin [[Evans2021SSC]]. Intramuscular adrenaline is first-line for anaphylaxis [[Dodd2021RCUK]].`,"pressors"],
 ["Albumin",`A blood protein also given as a fluid. In SAFE, 4% albumin matched saline for 28-day mortality (RR 0.99) [[Finfer2004SAFE]]; SSC 2026 suggests crystalloids alone over adding albumin [[Prescott2026SSC]].`,"fluids"],
 ["Anaphylaxis",`A severe allergic reaction that can become life-threatening within minutes. Median time to arrest was 5 minutes for medicines, 15 for venom and 30 for food in fatal cases [[Pumphrey2000]].`,"othershock"],
 ["Angiotensin II",`A vasopressor hormone. In ATHOS-3 it raised MAP response (69.9% vs 23.4%) [[Khanna2017ATHOS3]]; its label warns of thrombosis (12.9% vs 5.1%) [[FDA-Giapreza]].`,"pressors"],
 ["Antimicrobial resistance (AMR)",`When germs survive the medicines meant to kill them. In 2019, 1.27 million deaths were attributable to bacterial AMR [[Murray2022GRAM]].`,"source"],
 ["Antimicrobial stewardship",`Using the right antibiotic, at the right dose, for the shortest effective time. SSC 2021 suggests shorter courses with adequate source control [[Evans2021SSC]].`,"source"],
 ["ARDS (acute respiratory distress syndrome)",`Sudden, widespread lung inflammation with low oxygen. Berlin grades by PaO2/FiO2: mild 200–300, moderate 100–200, severe 100 or less mm Hg [[ARDS2012Berlin]].`,"icu"],
 ["Asplenia",`Having no working spleen. After splenectomy, infection incidence was 3.2% over a median 6.9 years [[Bisharat2001Splenectomy]].`,"risk"],
 ["Asymptomatic bacteriuria",`Bacteria in the urine without symptoms of infection; guidelines advise not treating it in older adults [[Nicolle2019ASB,Mody2014UTI]].`,"prevention"],
 ["Balanced crystalloid",`A salt solution closer to plasma than 0.9% saline. In SMART, major kidney events were 14.3% vs 15.4% with saline [[Semler2018SMART]]; BaSICS and PLUS found no mortality difference [[Zampieri2021BaSICSfluid,Finfer2022PLUS]].`,"fluids"],
 ["Blood culture",`Blood placed in bottles to grow germs. Two sets detect about 90% of bloodstream infections and three about 98% [[Lee2007Cultures]]; an accepted contamination rate has been 3% or less [[Sautter2024Contamination]].`,"tests"],
 ["Bundle",`A small set of steps done together. The Hour-1 bundle has five elements meant to be started within the first hour [[Levy2018Bundle,Wang2021Hour1]].`,"firsthour"],
 ["CAM-ICU",`A 2-minute bedside test for delirium in ventilated patients; nurses using it had 93–100% sensitivity [[Ely2001CAMICU]].`,"nursing"],
 ["Capillary refill time",`How fast colour returns after pressing a fingertip. SSC 2021 suggests it as an adjunct to guide resuscitation [[Evans2021SSC]], tested in ANDROMEDA-SHOCK [[Hernandez2019ANDROMEDA]].`,"fluids"],
 ["Cardiac output",`The blood the heart pumps each minute: heart rate × stroke volume, set by heart rate, contractility, preload and afterload [[Vincent2008CO]].`,"shock"],
 ["Cardiogenic shock",`Shock from the heart failing as a pump. In infarct-related cardiogenic shock, an intra-aortic balloon pump did not lower 30-day mortality (39.7% vs 41.3%) [[Thiele2012IABP]].`,"othershock"],
 ["Central venous pressure (CVP)",`Pressure in the large veins near the heart. It does not predict fluid responsiveness (AUC 0.56) [[Marik2008CVP]].`,"fluids"],
 ["CLABSI",`Central line-associated bloodstream infection. A checklist bundle cut it from 7.7 to 1.4 per 1,000 catheter-days [[Pronovost2006CLABSI]].`,"nursing"],
 ["Clostridioides difficile",`A gut bacterium that can cause severe diarrhoea after antibiotics; clindamycin carried the highest odds of community infection (OR 16.8) [[Brown2013CDI]].`,"source"],
 ["Community-onset sepsis",`Sepsis present on, or within 3 days of, admission: 90.3% of adult cases in a CDC review [[Fay2020Exposures]].`,"risk"],
 ["Complement (C5a)",`A cascade of blood proteins that tags germs and calls in immune cells; C5a is among the most active inflammatory peptides in sepsis [[Hotchkiss2016NRDP]].`,"immune"],
 ["Corticosteroids",`Hormone medicines such as hydrocortisone. SSC 2026 still suggests IV corticosteroids for septic shock [[Prescott2026SSC]]; the SSC threshold is noradrenaline or adrenaline 0.25 µg/kg/min or more for at least 4 hours, as published [[Evans2021SSC]].`,"pressors"],
 ["Culture-negative sepsis",`Sepsis where no germ is grown. It was 41.5% of severe sepsis in a Singapore ICU and 47.1% in US national data [[Phua2013CultureNeg,Gupta2016CultureNeg]].`,"tests"],
 ["Cytokines",`Signalling proteins that immune cells release. In pneumonia sepsis, high IL-6 together with high IL-10 carried the highest risk (HR 20.5) [[Kellum2007GenIMS]].`,"immune"],
 ["DAMPs",`Damage-associated molecular patterns: molecules released from injured host cells that the immune system senses as danger [[Hotchkiss2016NRDP]].`,"immune"],
 ["Delirium",`Acute confusion that comes and goes. It affected 83.3% of evaluable ventilated patients in the CAM-ICU study [[Ely2001CAMICU]].`,"icu"],
 ["DIC (disseminated intravascular coagulation)",`Widespread clotting in small vessels that uses up clotting factors, causing clots and bleeding [[Levi2017Coag]]. ISTH overt DIC is 5 points or more [[Taylor2001DIC]].`,"endothelium"],
 ["Distributive shock",`Shock where vessels relax and leak, so pressure falls even with a high cardiac output; septic shock is the main example [[Cecconi2014ESICM]].`,"shock"],
 ["Dopamine",`A vasopressor no longer first-line: in SOAP II it caused more arrhythmias than noradrenaline (24.1% vs 12.4%) [[DeBacker2010SOAPII]].`,"pressors"],
 ["Drotrecogin alfa (activated)",`Recombinant activated protein C, the one sepsis-specific drug approved and later withdrawn (2011) [[MedLett2011Xigris,Bernard2001PROWESS,Ranieri2012PROWESSSHOCK]].`,"history"],
 ["Dysregulated host response",`The body's own reaction to infection, out of proportion and harmful; the core of the Sepsis-3 definition [[Singer2016Sepsis3]].`,"immune"],
 ["Early goal-directed therapy (EGDT)",`A 6-hour protocol aimed at pressure and oxygen targets. Rivers 2001 reported benefit; PRISM found none over usual care [[Rivers2001EGDT,PRISM2017]].`,"firsthour"],
 ["Early-onset neonatal sepsis",`Sepsis within 72 hours of birth, mainly from E. coli and group B streptococcus [[Stoll2020EOS]]. The Kaiser calculator roughly halved empirical antibiotics [[Achten2019EOS]].`,"children"],
 ["Endotype",`A subgroup of patients sharing an underlying biology, such as the SRS1 and SRS2 gene-expression groups (Early evidence) [[Davenport2016]].`,"frontier"],
 ["Endothelium",`The single layer of cells lining blood vessels, covered by the glycocalyx; in sepsis it leaks [[Uchimido2019]].`,"endothelium"],
 ["Extravasation",`Leaking of an infused medicine out of the vein into tissue. The noradrenaline label advises phentolamine in saline as soon as possible [[FDA-Levophed]]; rates were about 2–3.4% with peripheral vasopressors in cohorts [[Tian2020EMA,CardenasGarcia2015JHM]].`,"nursing"],
 ["Febrile neutropenia",`Fever with very low neutrophils, often after chemotherapy. In-hospital mortality was 9.5% overall [[Kuderer2006FN]]; a MASCC score of 21 or more marks low risk [[Klastersky2000MASCC]].`,"risk"],
 ["Fludrocortisone",`A mineralocorticoid given with hydrocortisone in APROCCHSS, where 90-day mortality was 43.0% vs 49.1% [[Annane2018APROCCHSS]].`,"pressors"],
 ["Fluid responsiveness",`Whether more fluid would raise cardiac output. Passive leg raising with cardiac output predicts it (AUC 0.95) [[Monnet2016PLR]].`,"fluids"],
 ["Frailty",`Reduced strength and reserve. In REGARDS it raised sepsis risk (aHR 1.44) [[Mahalingam2019Frailty]].`,"risk"],
 ["Glycocalyx",`A gel-like layer, about 0.5–5.0 μm thick, lining the inside of blood vessels [[Uchimido2019]].`,"endothelium"],
 ["Group A streptococcus (GAS)",`<i>Streptococcus pyogenes</i>. Postpartum women have about 20-fold higher incidence of invasive GAS [[Deutscher2011Strep]], and it drove UK maternal sepsis deaths in 2006–08 [[Cantwell2011CMACE]].`,"maternal"],
 ["Group B streptococcus (GBS)",`A bacterium that can pass to babies at birth. Intrapartum prophylaxis cut early-onset GBS from 1.7 to 0.6 per 1,000 live births [[Schrag2000GBS]].`,"prevention"],
 ["Hand hygiene",`Cleaning hands between patients and procedures. Semmelweis's chlorine handwashing cut childbed deaths in 1847 [[Stang2022Semmelweis]], and hand hygiene stops germs spreading in hospital and at home [[Pittet2000HandHygiene]].`,"prevention"],
 ["HLA-DR (monocyte)",`A molecule monocytes use to show antigens. Low levels mark immunoparalysis: below 30% on days 3–4 predicted death (OR 6.48) [[Monneret2006]].`,"immune"],
 ["Hospital-onset sepsis",`Sepsis that starts in hospital: 12.1% of cases, with twice the adjusted mortality of community-onset sepsis [[Rhee2019HospOnset]].`,"risk"],
 ["Hour-1 bundle",`Five steps started within the first hour: lactate, blood cultures, broad-spectrum antibiotics, crystalloid and vasopressors, as published [[Levy2018Bundle,Wang2021Hour1]].`,"firsthour"],
 ["Hypovolaemic shock",`Shock from loss of blood or fluid. In trauma bleeding, tranexamic acid works best early; after 3 hours it was linked with more bleeding deaths [[CRASH2-2011]].`,"othershock"],
 ["ICU diary",`A diary of the intensive care stay written by staff and family; it reduced new PTSD from 13% to 5% [[Jones2010Diaries]].`,"after"],
 ["Immunoparalysis",`A worn-out immune state later in sepsis. Post-mortem spleens produced under 10% of normal cytokines [[Boomer2011]].`,"immune"],
 ["Inflammasome (NLRP3)",`A sensor complex that activates caspase-1 to make IL-1β and IL-18 and triggers pyroptosis [[Neumann2026NLRP3]].`,"immune"],
 ["Lactate",`A blood chemical that rises in shock and severe illness, typically above 2 mmol/L in shock [[Cecconi2014ESICM]]. It does not always mean oxygen shortage [[GarciaAlvarez2014]].`,"tests"],
 ["Lung-protective ventilation",`Small breaths of about 6 mL/kg predicted body weight with plateau pressure 30 cmH2O or less; ARDSNet mortality fell from 39.8% to 31.0% [[ARDSNet2000]].`,"icu"],
 ["MAP (mean arterial pressure)",`The average pressure driving blood to organs, estimated as diastolic plus one third of pulse pressure [[Papaioannou2016]]. SSC 2021 recommends an initial target of 65 mm Hg on vasopressors [[Evans2021SSC]].`,"shock"],
 ["Maternal sepsis",`Organ dysfunction from infection during pregnancy, childbirth, after abortion or after birth (WHO 2017) [[Bonet2017Maternal]]. It caused 10.7% of maternal deaths worldwide in 2003–2009 [[Say2014Causes]].`,"maternal"],
 ["Meningococcal disease",`Infection with <i>Neisseria meningitidis</i>. Leg pain, cold hands and feet and abnormal skin colour appear before the rash [[Thompson2006Meningococcal]].`,"prevention"],
 ["Microcirculation",`The smallest vessels. In severe sepsis only 48% of small vessels were perfused, against 90% in volunteers [[DeBacker2002]].`,"endothelium"],
 ["MODS (multiple organ dysfunction syndrome)",`Failure of more than one organ system, defined at the 1992 consensus [[Bone1992SIRS]].`,"endothelium"],
 ["Mottling",`Blotchy, violet-patterned skin, a sign that the small vessels are not perfusing well [[Cecconi2014ESICM]].`,"recognise"],
 ["Necrotising soft-tissue infection",`A fast-spreading infection that kills tissue under the skin. Surgery within 6 hours: mortality 19% vs 32% [[Nawijn2020NSTI]]. The LRINEC score cannot rule it out [[Fernando2019NSTI]].`,"source"],
 ["NETs (neutrophil extracellular traps)",`Webs of DNA and granule proteins thrown out by neutrophils to trap and kill bacteria [[Brinkmann2004]].`,"immune"],
 ["NEWS2",`A UK early warning score used in hospitals to spot deterioration; its SpO2 scale 2 is only for confirmed hypercapnic respiratory failure [[Verma2023NEWS2]]. A tool for trained staff.`,"recognise"],
 ["Nitric oxide",`A gas made by vessel walls that relaxes them. Blocking its production raised pressure but increased mortality (59% vs 49%) [[Lopez2004NOS]].`,"endothelium"],
 ["Noradrenaline (norepinephrine)",`The first-line vasopressor in septic shock (SSC 2021, 2026) [[Evans2021SSC,Prescott2026SSC]].`,"pressors"],
 ["Obstructive shock",`Shock from a blockage to flow, such as tamponade or tension pneumothorax. Pulsus paradoxus is an inspiratory fall in systolic pressure of more than 10 mm Hg [[Adler2015ESC]].`,"othershock"],
 ["PAMPs",`Pathogen-associated molecular patterns: pieces of microbes, such as LPS, that immune sensors recognise [[Hotchkiss2016NRDP]].`,"immune"],
 ["Phoenix Sepsis Score",`The 2024 paediatric score over respiratory, cardiovascular, coagulation and neurological systems; 2 or more with suspected infection is sepsis [[Schlapbach2024Phoenix]].`,"children"],
 ["PICS (post-intensive care syndrome)",`New or worse physical, cognitive or mental health problems after critical illness that persist beyond hospital [[Needham2012PICS]].`,"after"],
 ["PICS-F",`Anxiety, stress, depression or complicated grief in relatives after a loved one's critical illness; it may last more than 4 years [[Davidson2012PICSF]].`,"after"],
 ["Pneumococcal vaccine",`Vaccines against <i>Streptococcus pneumoniae</i>. PCV7 in infants cut invasive disease in under-2s by 69% [[Whitney2003PCV7]]; PCV13 protected adults 65 and over against vaccine-type disease [[Bonten2015CAPiTA]].`,"prevention"],
 ["Post-sepsis syndrome",`The lasting physical, mental and cognitive after-effects of sepsis; having them is not a sign of weakness [[Mostel2019PSS]].`,"after"],
 ["Procalcitonin (PCT)",`A blood protein that rises mainly in bacterial infection. SSC 2021 suggests it, with clinical judgement, to help decide when to stop antibiotics, not to start them [[Evans2021SSC]].`,"tests"],
 ["Prone positioning",`Turning a ventilated patient onto the front. In PROSEVA, 28-day mortality was 16.0% vs 32.8% in severe ARDS [[Guerin2013PROSEVA]].`,"icu"],
 ["Puerperal sepsis",`Sepsis after childbirth ("childbed fever"), the disease Semmelweis fought in Vienna [[Stang2022Semmelweis]].`,"history"],
 ["Purpura fulminans",`Rapid bleeding into the skin from clots in its small vessels, linked to protein C depletion and most often meningococcal sepsis; mortality is over 50% [[Betrosian2006]].`,"endothelium"],
 ["qSOFA",`Quick SOFA: breathing rate 22/min or more, altered mentation, systolic BP 100 mm Hg or less [[Seymour2016qSOFA]]. Not recommended as a single screening tool [[Evans2021SSC]].`,"definitions"],
 ["Readmission",`Going back into hospital. About 40% of sepsis survivors are readmitted within 90 days [[Prescott2015Readmission]].`,"after"],
 ["Renal replacement therapy",`Dialysis or filtration that does the kidneys' work. Starting early without urgent indications did not save lives [[Gaudry2016AKIKI,Barbar2018IDEAL,Bagshaw2020STARRT]].`,"icu"],
 ["Sepsis",`Life-threatening organ dysfunction caused by a dysregulated host response to infection [[Singer2016Sepsis3]]. Any infection can lead to it.`,"what"],
 ["Sepsis-induced coagulopathy (SIC)",`An early clotting disorder of sepsis scored from PT-INR, platelets and SOFA; 4 points or more [[Iba2017SIC]].`,"endothelium"],
 ["Septic cardiomyopathy",`Reversible weakening of the heart in septic shock; in survivors ejection fraction recovered in about 10 days [[Parker1984]].`,"shock"],
 ["Septic shock",`Sepsis with vasopressors needed for MAP of 65 mm Hg or more and lactate above 2 mmol/L despite adequate fluids [[Singer2016Sepsis3]].`,"what"],
 ["Severe sepsis",`A pre-2016 category of sepsis with organ dysfunction, dropped by Sepsis-3 as redundant [[Singer2016Sepsis3]].`,"definitions"],
 ["Shock",`A state in which cells cannot get or use enough oxygen; low blood pressure is common but not required [[Cecconi2014ESICM]].`,"shock"],
 ["Shock index",`Heart rate divided by systolic blood pressure; values near 1.0 suggest shock [[Koch2019SI]]. A teaching tool, not for self-triage.`,"recognise"],
 ["SIRS",`Systemic inflammatory response syndrome: 2 or more of temperature, heart rate, breathing rate and white count criteria [[Bone1992SIRS]]. One in eight ICU patients with infection and organ failure is SIRS-negative [[Kaukonen2015]].`,"definitions"],
 ["SOFA score",`Sepsis-related Organ Failure Assessment (1996): six systems scored 0–4, total 0–24 [[Vincent1996SOFA,Lambden2019SOFA]].`,"definitions"],
 ["SOFA-2",`The 2025 revision of SOFA, built from 3.34 million ICU encounters; it left out gastrointestinal and immune dysfunction [[Ranzani2025SOFA2]].`,"definitions"],
 ["Source control",`Draining, removing or debriding the source of infection as soon as medically and logistically practical (SSC 2021) [[Evans2021SSC]].`,"source"],
 ["Starches (HES)",`Synthetic colloid fluids. In 6S they caused more deaths and kidney replacement; SSC recommends against them [[Perner2012SixS,Evans2021SSC]].`,"fluids"],
 ["Surviving Sepsis Campaign (SSC)",`An international effort launched by the 2002 Barcelona Declaration, publishing guidelines since 2004 [[Slade2003SSC,Dellinger2004SSC]].`,"history"],
 ["Toll-like receptors (TLRs)",`Sensors on immune cells that recognise pieces of germs, such as TLR4 for LPS [[Poltorak1998]].`,"immune"],
 ["Toxic shock syndrome",`A toxin-driven illness from <i>S. aureus</i> or group A streptococcus, whose superantigens trigger a "cytokine avalanche" [[Lappin2009]].`,"othershock"],
 ["Transfusion threshold",`The haemoglobin level at which blood is given. In TRISS, 7 g/dL was as safe as 9 g/dL in septic shock [[Holst2014TRISS]].`,"icu"],
 ["Vasopressin",`A hormone used as the second vasopressor; SSC 2021 says it is usually started at noradrenaline 0.25–0.5 µg/kg/min, as published [[Evans2021SSC]].`,"pressors"],
 ["Vasopressor",`A medicine that tightens blood vessels to raise blood pressure. SSC suggests starting peripherally rather than waiting for a central line [[Evans2021SSC]].`,"pressors"],
 ["Vitamin C (high-dose)",`Tested as a sepsis treatment; in LOVIT it increased death or persistent organ dysfunction (RR 1.21) [[Lamontagne2022LOVIT]].`,"frontier"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'sofa 2' or 'sofa2' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=SG_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:SG_T.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SS_AREAN={A:'Epidemiology, burden, risk factors & history',B:'Immunology, endothelium, coagulation & organ dysfunction; research frontier',C:'Haemodynamics and shock types',D:'Recognising sepsis, early warning scores & definitions',E:'Tests, biomarkers, the first hour & maternal sepsis',F:'Fluids, vasopressors, steroids & MAP targets',G:'Source control, stewardship, ICU organ support & nursing care',H:'After sepsis, survivorship, families & prevention'};
const SS_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SS_svc=s=>s.unverified?[]:SS_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SS_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(SS_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SS_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SS_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SS_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SS_link(s)?`<a href="${esc(SS_link(s))}" target="_blank" rel="noopener">${esc(SS_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SS_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
