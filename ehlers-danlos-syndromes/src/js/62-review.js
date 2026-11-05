/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · The syndromes",2:"Part 2 · Diagnosis",3:"Part 3 · Body systems",4:"Part 4 · Treatment",5:"Part 5 · Living with EDS"};
const RV_FC=[
 /* ---- Part 1: the syndromes, collagen, genes and history ---- */
 [1,`How many EDS types does the 2017 International Classification recognise, and what does a definite diagnosis need?`,`13 types. For every type except hypermobile EDS, a definite diagnosis needs the causative genetic variant [[Malfait2017]].`],
 [1,`Which EDS type has no known gene?`,`Hypermobile EDS (hEDS). It is a clinical diagnosis made with the 2017 criteria [[Malfait2017,Malfait2020]].`],
 [1,`How common is diagnosed EDS or joint hypermobility syndrome in Wales?`,`194.2 per 100,000 in 2016/17, about 1 in 500, or around 10 people in a GP practice of 5,000 [[Demmler2019]].`],
 [1,`How rare is vascular EDS, and which gene causes it?`,`About 1 in 50,000 to 1 in 200,000; heterozygous pathogenic variants in COL3A1, which encodes type III procollagen [[Byers2017]].`],
 [1,`Classical EDS: how common, and which genes?`,`About 1 in 20,000; autosomal dominant, mostly COL5A1 or COL5A2 (type V collagen) [[VanDijk2024]].`],
 [1,`Why must every third residue of a collagen chain be glycine?`,`Only glycine is small enough to fit in the crowded centre of the triple helix, giving the repeat Xaa-Yaa-Gly [[Shoulders2009]].`],
 [1,`In which direction does the triple helix fold, and what does a glycine substitution do?`,`From the C-terminus toward the N-terminus. A glycine substitution stalls folding at that point, and delayed folding leads to overmodification of the chains [[Shoulders2009]].`],
 [1,`Which enzymes cut the propeptides off procollagen?`,`BMP-1 is the procollagen C-proteinase [[Kessler1996]]; ADAMTS-2 is the procollagen I N-proteinase, and its loss causes dermatosparaxis EDS [[Colige1999]].`],
 [1,`Arthrochalasia and dermatosparaxis EDS block the same step. How do they differ?`,`Arthrochalasia removes the N-proteinase cleavage site in the substrate (exon 6 of COL1A1 or COL1A2); dermatosparaxis removes the enzyme, ADAMTS-2 [[Byers1997,Colige1999]].`],
 [1,`What proportion of people meeting all major classical EDS criteria have a type V collagen defect?`,`Over 90% [[Symoens2012]].`],
 [1,`In vascular EDS, what is the commonest kind of COL3A1 variant?`,`A glycine substitution; vEDS is autosomal dominant [[Frank2015,Demirdas2024]].`],
 [1,`How do COL3A1 null (haploinsufficient) variants change the course of vEDS?`,`The first complication comes almost 15 years later than with missense or exon-skipping variants, and complications are almost all vascular [[Leistritz2011]].`],
 [1,`Which urine test helps confirm PLOD1-kyphoscoliotic EDS?`,`A raised urinary deoxypyridinoline to pyridinoline ratio. FKBP14-kEDS has normal pyridinolines and often hearing loss [[RohrbachGR-kEDS,Baumann2012]].`],
 [1,`Which genes cause periodontal EDS, and what sign is pathognomonic?`,`C1R or C1S, which encode subunits of complement C1; a lack of attached gingiva is pathognomonic [[KapfererSeebacher2016,KapfererSeebacher2021]].`],
 [1,`Classical-like EDS type 1 (TNXB): how is it inherited, and what is missing from the skin?`,`Autosomal recessive; the skin is hyperextensible but has no atrophic scars [[Schalkwijk2001,Demirdas2017]].`],
 [1,`What is the chance that a child inherits a dominant or a recessive type of EDS?`,`Dominant: 1 in 2 for each child of an affected parent. Recessive: 1 in 4 for each child of two carrier parents [[MalfaitGR-cEDS,RohrbachGR-kEDS]].`],
 [1,`Does a negative family history rule out vascular EDS?`,`No. Around half of cases arise from a new (de novo) variant [[Byers2025GeneReviews]].`],
 [1,`Can prenatal or preimplantation testing be offered for hEDS?`,`No: no gene is known. It is possible for vEDS and cEDS once the familial variant is known [[Byers2025GeneReviews,Hakim2024GeneReviews]].`],
 [1,`At one US clinic, how many of 907 people referred for suspected hEDS met the 2017 criteria, and what did genetic testing add?`,`178 (19.6%) met the criteria, and 47 of those 178 (26.4%) had an alternative or additional diagnosis found by genetic testing; referral bias may inflate this [[Forghani2025]].`],
 [1,`Who were Ehlers and Danlos?`,`Edvard Ehlers, a Danish dermatologist (1901), and Henri-Alexandre Danlos, a French dermatologist (1908) [[Parapia2008]].`],
 [1,`Berlin and Villefranche: how many types did each recognise?`,`Berlin (1986, published 1988): 11 Roman-numeral types. Villefranche (1997, published 1998): 6 named types [[Forghani2019,Beighton1998]].`],
 [1,`Why is the zebra the EDS symbol?`,`From the teaching "when you hear hoofbeats, think of horses, not zebras": people with rare diseases use it to say the rare diagnosis is sometimes the right one [[Park2025,Bashe2025]].`],

 /* ---- Part 2: diagnosis ---- */
 [2,`What are the five Beighton manoeuvres?`,`Little finger back to 90° or more, thumb to the forearm, elbow and knee hyperextension of 10° or more (each scored on both sides), and palms flat on the floor with knees straight (1 point): 9 points [[Thwaites2022,Carroll2023]].`],
 [2,`What are the 2017 age cut-offs for generalised joint hypermobility?`,`6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, and 4 or more over 50 [[Tofts2023,Fairweather2025]].`],
 [2,`What is the five-part questionnaire (5PQ), and when is it positive?`,`Five yes/no questions about present and past hypermobility. Two or more "yes" answers gave 84% sensitivity and 89% specificity in its development cohort [[Hakim2003]].`],
 [2,`When can the 5PQ rescue Criterion 1?`,`When the Beighton score is one point below the age- and sex-specific cut-off and the 5PQ is 2 or more [[Thwaites2022,Malfait2017]].`],
 [2,`What does the 2017 hEDS diagnosis require?`,`All three criteria. Criterion 2 needs 2 of 3 features (A, B, C), and Feature A needs 5 of 12 items [[Fairweather2025,Thwaites2022]].`],
 [2,`What are the three options for Feature C?`,`Pain in 2 or more limbs daily for 3 months or more; chronic widespread pain for 3 months or more; or atraumatic recurrent dislocations or frank instability [[Thwaites2022]].`],
 [2,`What does Criterion 3 exclude?`,`Unusual skin fragility; other heritable and acquired connective tissue disorders, including autoimmune rheumatological conditions; and alternative diagnoses that cause hypermobility through hypotonia or laxity [[Fairweather2025,Thwaites2022]].`],
 [2,`Someone with lupus is assessed for hEDS. Which features may count?`,`Only Features A and B, and both are needed; Feature C cannot be counted [[Fairweather2025]].`],
 [2,`Name the four subtypes of hypermobility spectrum disorder.`,`Generalised, peripheral, localised and historical. Each needs joint hypermobility plus at least one secondary musculoskeletal manifestation [[Carroll2023,Castori2017]].`],
 [2,`When can a child be diagnosed with hEDS?`,`Not before biological maturity, according to the paediatric working group; children's GJH uses a Beighton score of 6 or more [[Tofts2023]].`],
 [2,`What are the skin hyperextensibility cut-offs?`,`More than 1.5 cm at the distal forearm and back of the hand; 3 cm at the neck, elbows and knees [[Ritelli2020C,Stembridge2023]].`],
 [2,`What are the four vEDS "minimal criteria" that should prompt testing?`,`Family history of vEDS, arterial rupture or dissection under 40, unexplained sigmoid colon rupture, or spontaneous pneumothorax with other vEDS features [[Wang2026OJRD]].`],
 [2,`Why should vEDS not be diagnosed on clinical grounds alone?`,`In one multi-institution series, nearly 10% of people diagnosed with vEDS had non-pathogenic COL3A1 changes [[Shalhub2020]]; the consensus asks for the causative variant first [[Byers2017]].`],
 [2,`What are the cardinal features of Marfan syndrome?`,`Aortic root aneurysm and ectopia lentis; a systemic score of 7 or more out of 20 is significant [[Loeys2010,Pollock2021]].`],
 [2,`What is the Loeys-Dietz triad?`,`Arterial tortuosity and aneurysms, hypertelorism, and bifid uvula or cleft palate [[Loeys2006]].`],
 [2,`How reliable is the Beighton score between examiners?`,`Reported kappa ranges from about 0.4 to 0.8; a three-phase study found 0.74 for diagnosing GJH [[Malek2021D,Juul-Kristensen2007]].`],
 [2,`Which major joints does the Beighton score leave out?`,`Shoulders, hips and ankles. Two-thirds of the scored joints are in the upper limbs, and the score shows whether hypermobility is present, not how severe it is [[Malek2021D]].`],
 [2,`How common is a Beighton score of 4 or more in UK 14-year-olds?`,`27.5% of girls and 10.6% of boys, so joint hypermobility alone is common and is not a diagnosis [[Clinch2011]].`],

 /* ---- Part 3: body systems ---- */
 [3,`How strong are the knees of women with hEDS?`,`Knee strength and endurance were 30% to 49% lower than in controls, with similar muscle mass [[Rombaut2012Strength]].`],
 [3,`What did pressure-pain thresholds show in hEDS?`,`2.9 vs 5.2 kg/cm² in controls, even at pain-free sites: generalised hyperalgesia [[Rombaut2015]].`],
 [3,`What are the three proposed phases of hEDS natural history?`,`Hypermobility, then pain, then stiffness [[Castori2010]].`],
 [3,`How common is severe fatigue in EDS?`,`More than three-quarters of 273 people with EDS had severe fatigue [[Voermans2010Fatigue]].`],
 [3,`How common is orthostatic intolerance in hEDS?`,`74.4% vs 34.3% in controls; 41.0% of a tilt subsample had postural tachycardia [[DeWandele2016]].`],
 [3,`What did skin biopsy show in a prospective hEDS study?`,`Small-fibre neuropathy in 19 of 31 (61%) [[Igharo2023]]. Another study found no nerve damage and favours central sensitisation, so this is unresolved [[DiStefano2016]].`],
 [3,`What is the skin signature of classical EDS?`,`Hyperextensible skin with widened atrophic scars, present in 92% of molecularly confirmed cases; papyraceous scars in 65.3% [[Ritelli2020C]].`],
 [3,`What does vascular EDS skin look like?`,`Thin and translucent with visible veins, and not markedly hyperextensible [[Stembridge2023]].`],
 [3,`Why do people with EDS bruise easily?`,`Fragile capillaries and perivascular tissue. Clotting tests are usually normal; only the Hess capillary fragility test may be abnormal [[DePaepe2004]].`],
 [3,`How is POTS defined?`,`A sustained heart-rate rise of at least 30 beats/min within 10 minutes of standing (at least 40 at ages 12 to 19), without orthostatic hypotension [[Sheldon2015,Vernino2021]].`],
 [3,`What share of a POTS cohort met the 2017 hEDS criteria?`,`31% of 91, and a further 24% had GJH without meeting them [[Miller2020POTS]].`],
 [3,`What laboratory rise confirms mast-cell activation?`,`An event-related serum tryptase rise of at least 20% + 2 ng/mL over baseline [[Valent2019IAAI]].`],
 [3,`How common is joint hypermobility in functional versus organic GI disorders?`,`39.0% vs 27.5% in clinic patients (adjusted OR 1.51) [[Fikree2015]].`],
 [3,`When do complications start in vascular EDS?`,`25% of index patients had a first complication by age 20, and more than 80% by 40 [[Pepin2000]].`],
 [3,`What was median survival in vEDS in the two Pepin cohorts?`,`48 years (2000) and 51 years (2014), lower in men. These are population statistics, not a personal prognosis [[Pepin2000,Pepin2014]].`],
 [3,`Which arterial bed is most often affected in genetically confirmed vEDS?`,`The mesenteric arteries (31.7%), then cerebrovascular and iliac (16.5% each) [[Shalhub2019]].`],
 [3,`What is the classic vEDS bowel event, and which emergency operation does the review favour?`,`Spontaneous sigmoid colon perforation; Hartmann's procedure, because reperforation was more frequent after anastomosis [[ElMasri2018]].`],
 [3,`What is the evidence for craniocervical instability surgery in EDS?`,`Weak: no validated imaging criteria, 78 surgical patients in 16 articles, evidence levels III to V [[Lohkamp2022]].`],
 [3,`Which neurodevelopmental diagnoses are more common with EDS in Swedish registers?`,`Autism (RR 7.4) and ADHD (RR 5.6); siblings without EDS also had raised ADHD risk [[Cederlof2016]].`],

 /* ---- Part 4: treatment ---- */
 [4,`What is the cornerstone of hEDS/HSD care, and how strong is the evidence?`,`Exercise-based physiotherapy; controlled-trial evidence of benefit over comparators is weak [[Palmer2021]].`],
 [4,`Is there a specific medical or genetic therapy for any EDS type?`,`No. Management is a care team plus integrated rehabilitation [[Malfait2020]].`],
 [4,`Heavy versus light shoulder training in HSD: what happened?`,`HEAVY beat LIGHT at 16 weeks (WOSI −174.5, smaller than the minimal important difference of 252) but not at 1 year [[Liaghat2022BJSM,Liaghat2024BJSM]].`],
 [4,`Did heavy shoulder loading flare pain in HSD?`,`No: exercise-induced pain stayed below 0.5/10 [[Liaghat2025]].`],
 [4,`What did the Bendy Study find in 119 hypermobile children?`,`An 8-week physiotherapy plus occupational therapy programme added no benefit over standard advice at 12 months [[Bale2019]].`],
 [4,`How common is fear of movement in JHS/hEDS?`,`93% of 42 people scored above the Tampa Scale cut-off [[Celletti2013]].`],
 [4,`What did inspiratory muscle training do in women with hEDS?`,`Six weeks raised 6-minute walk distance from 455 to 515 m [[Reychler2019]].`],
 [4,`What did the BBEST trial show?`,`Celiprolol in 53 people with vEDS: arterial events 20% vs 50% at a mean 47 months (HR 0.36). Open-label, stopped early for benefit [[Ong2010]].`],
 [4,`What did ARCADE add to celiprolol?`,`Irbesartan: the composite arterial outcome was 27.6% vs 53.6% at 2 years (HR 0.42) [[Jeunemaitre2025]].`],
 [4,`Is celiprolol FDA-approved?`,`No; the ACC/AHA judged the data insufficient for approval [[Isselbacher2022,openFDA-Celiprolol]].`],
 [4,`Why is diagnostic arteriography avoided in vEDS?`,`A historical series reported a 67% complication rate [[Cikrit1987]]; GeneReviews keeps it for finding life-threatening bleeding before surgery [[Byers2025GeneReviews]].`],
 [4,`What did the lidocaine trial show in EDS?`,`Equal numbness at 5 minutes, but at 30 minutes 53% vs 80% of controls were still numb, suggesting a shorter duration [[Bourne2026RAPM]].`],
 [4,`How often do people with EDS recall dental local anaesthetic failing?`,`88% vs 33% without EDS in a survey [[Schubart2019LA]].`],
 [4,`What does HRS 2015 say about fluid and salt in POTS?`,`Up to 2–3 L of water and 10–12 g NaCl daily "may be considered" (Class IIb) [[Sheldon2015]].`],
 [4,`Why "less is more" for propranolol in POTS?`,`20 mg improved symptoms more than 80 mg, although 80 mg lowered heart rate more [[Raj2009Circ]].`],
 [4,`How many medicines are FDA-approved for POTS?`,`None [[Vernino2021]].`],
 [4,`How are classical EDS wounds closed?`,`In two layers without tension, with skin stitches left in about twice as long as usual [[Malfait2024GeneReviews]].`],
 [4,`How often were opioids prescribed to adults with EDS in US claims?`,`62% vs 34.1% of controls [[Schubart2019Opioid]].`],

 /* ---- Part 5: living with EDS ---- */
 [5,`How long did people wait for an hEDS diagnosis in the Global Registry survey?`,`10.39 years on average, after seeing 15.6 clinicians [[Halverson2023]].`],
 [5,`How much later were women diagnosed than men in Wales?`,`8.5 years later on average [[Demmler2019]].`],
 [5,`What is the pregnancy-related death rate in vEDS pedigrees?`,`30 of 565 deliveries (5.3%), a population figure [[Murray2014]].`],
 [5,`How common is precipitate (3 hours or less) birth in hEDS/HSD perinatal guidance?`,`28–36% [[Pezaro2024]].`],
 [5,`What should someone with vEDS carry, and when should they seek care?`,`A MedicAlert, emergency letter or vEDS "passport"; sudden, unexplained pain means urgent care [[Byers2025GeneReviews,Byers2017]].`],
 [5,`What should a spontaneous bowel perforation in a young person prompt?`,`Genetic testing for vEDS [[Bowen2023]].`],
 [5,`Which activities does GeneReviews advise avoiding in vEDS?`,`Collision sports, heavy lifting and weight training with extreme lifting [[Byers2025GeneReviews]].`],
 [5,`Do hypermobile athletes get more knee injuries?`,`In contact sports, yes: combined OR 4.69; ankle injury risk was not raised [[Pacey2010]].`],
 [5,`Which school task was hardest for children with EDS, according to parents?`,`Keeping up with handwriting (71%) [[Wesley2021]].`],
 [5,`Why does perinatal guidance ask nurses to document early bruising in infants?`,`To avoid false accusations of maltreatment [[Pezaro2024]].`],
 [5,`How can POTS usually be identified at the bedside?`,`By recording heart rate and blood pressure lying down and during a 10-minute stand [[Vernino2021]].`],
 [5,`How many people with EDS came to question the reality of their own pain?`,`73% of survey respondents in a Europe and North America study; the authors recommend "epistemic humility" from clinicians [[Halverson2025]].`]
];
const RV_MN=[
 ["Four pairs and a bow","memory aid",`Beighton: little finger, thumb, elbow and knee on both sides (4 pairs × 2 points) plus one forward bow with palms flat (1 point) = 9 [[Thwaites2022,Carroll2023]].`],
 ["6-5-4, count down with age","memory aid",`Criterion 1 cut-offs: 6 or more before puberty and in adolescents, 5 or more from puberty to 50, 4 or more over 50 [[Tofts2023,Fairweather2025]].`],
 ["3 gates · 2 of 3 · 5 of 12","memory aid",`hEDS needs all 3 criteria; Criterion 2 needs 2 of Features A, B and C; Feature A needs 5 of its 12 items [[Fairweather2025,Thwaites2022]].`],
 ["A body, B blood relative, C complaints","memory aid",`Feature A: systemic signs of a connective tissue disorder. Feature B: a first-degree relative who meets the criteria. Feature C: pain or instability [[Fairweather2025,Thwaites2022]].`],
 ["Horses, not zebras","well known",`The teaching saying the EDS community turned around: sometimes the rare diagnosis is the right one [[Park2025,Bashe2025]].`],
 ["Sudden pain, show the card","memory aid",`In vEDS, sudden unexplained pain needs immediate care, and the person carries a MedicAlert, emergency letter or vEDS passport [[Byers2025GeneReviews,Byers2017]].`],
 ["No pokes, no scopes, no needless knives","memory aid",`vEDS: arteriography only to find life-threatening bleeding before surgery; no routine colonoscopy without a clear reason; elective surgery only for substantial benefit [[Byers2025GeneReviews]].`],
 ["30 standing, 40 if teen","memory aid",`POTS: heart rate up at least 30 beats/min within 10 minutes of standing, at least 40 at ages 12 to 19, without orthostatic hypotension [[Vernino2021]].`],
 ["20% + 2","well known",`The consensus mast-cell activation rule: an event-related tryptase rise of at least 20% plus 2 ng/mL over baseline [[Valent2019IAAI]].`],
 ["Bend, hurt, stiffen","memory aid",`The proposed hEDS natural history: a hypermobility phase, a pain phase, then a stiffness phase [[Castori2010]].`]
];
const RV_STEPS=[
 {from:0,at:.15,k:'Item 1 · 2 points',t:'Little fingers',txt:`Passive dorsiflexion of the little finger at the metacarpophalangeal joint to 90° or more scores 1 point per side [[Thwaites2022,Malek2021D]]. The dashed line marks 90°; both fingers here pass it.`,pt:'Each little finger that bends back to a right angle or further scores 1 point.',hook:'Four pairs and a bow: four paired items at 2 points each, plus 1 for the forward bend, makes 9 [[Thwaites2022,Carroll2023]].'},
 {from:.18,at:.33,k:'Item 2 · 2 points',t:'Thumbs',txt:`Passive apposition of the thumb to the flexor surface of the same-side forearm [[Thwaites2022,Carroll2023]]. Each side is scored separately: here the left thumb touches and scores, the right stops short and does not.`,pt:'Sides are scored one at a time, so a total can be any number from 0 to 9.',hook:`The score was devised in 1973 on 1,083 Tswana Africans, adapted from the 1964 Carter and Wilkinson score [[Beighton1973,Clinch2011]].`},
 {from:.36,at:.51,k:'Item 3 · 2 points',t:'Elbows',txt:`Elbow hyperextension of 10° or more scores 1 point per side [[Thwaites2022,Carroll2023]]. In a three-phase reliability study, item kappas were mostly above 0.80, but the fifth fingers and elbows were lower (0.60 or more) [[Juul-Kristensen2007]].`,pt:'The arm straightens past a straight line by at least 10 degrees.',hook:'Across studies, Beighton kappa between examiners is about 0.4 to 0.8 [[Malek2021D]].'},
 {from:.54,at:.68,k:'Item 4 · 2 points',t:'Knees',txt:`Knee hyperextension of 10° or more [[Thwaites2022,Carroll2023]]. The right knee here reaches about 7°, short of the dashed 10° line: no point. The score does not test shoulders, hips or ankles, and it shows whether hypermobility is present, not how severe it is [[Malek2021D]].`,pt:'Nearly is not enough: the line is 10 degrees.',hook:'Two-thirds of the scored joints are in the upper limbs [[Malek2021D]].'},
 {from:.71,at:.81,k:'Item 5 · 1 point',t:'Forward bend',txt:`Forward flexion of the trunk so that both palms rest flat on the floor, knees locked straight and feet together, scores a single point [[Thwaites2022,Carroll2023]]. It can be trained, as in ballet, and short hamstrings limit it: in one study 84.2% of hypermobile people (Beighton 5 or more) could not do it [[Malek2021D]].`,pt:'The forward bend is the only item worth one point, not two.',hook:'Total here: 2 + 1 + 2 + 1 + 1 = 7 out of 9.'},
 {from:.84,at:.97,k:'Criterion 1',t:'6-5-4 by age',txt:`The 2017 hEDS criteria read the total against age: 6 or more for prepubertal children and adolescents, 5 or more from puberty to 50, 4 or more over 50 [[Tofts2023,Fairweather2025]]. One point short, a 5PQ of 2 or more can count [[Thwaites2022]]. Bendiness is common: a score of 4 or more was found in 27.5% of UK 14-year-old girls and 10.6% of boys [[Clinch2011]].`,pt:'A high score means bendy joints, not EDS. Criterion 1 is only the first of three gates, and only a clinician can put the whole picture together.',hook:'6-5-4, count down with age.'}
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

  /* ---- mnemonic in motion: four pairs and a bow (Beighton) ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  /* the example person: max angle reached per side, the threshold, and the window of t in which the item is examined */
  const IT=[
    {nm:'Little fingers',sh:'fingers',pts:2,a:.02,b:.16,L:100,R:96,lim:90},
    {nm:'Thumbs',sh:'thumbs',pts:2,a:.2,b:.34,L:168,R:122,lim:160},
    {nm:'Elbows',sh:'elbows',pts:2,a:.38,b:.52,L:15,R:12,lim:10},
    {nm:'Knees',sh:'knees',pts:2,a:.56,b:.69,L:13,R:7,lim:10},
    {nm:'Forward bend',sh:'bend',pts:1,a:.72,b:.82}
  ];
  const side=(p,s)=>ease(s?ramp(p,.5,.98):ramp(p,0,.48));
  const pass=(it,s)=>it.pts===1?true:(s?it.R:it.L)>=it.lim;
  const got=(it,p,s)=>(it.pts===1?(s===0&&p>=.98):(side(p,s)>=.999&&pass(it,s)))?1:0;
  const txt=(x,y,c,s,st='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${st?` style="${st}"`:''}>${s}</text>`;
  /* a paired item: two limbs, left above right, each bending back toward its maximum */
  function pairTile(it,p,x,y,w,h){let g='';const big=it.lim>=90;
    if(big){[0,1].forEach(s=>{const u=side(p,s),deg=-(s?it.R:it.L)*u,jy=y+h*.9,jx=x+w*(s?.66:.34),L=limb(jx,jy,w*.24,deg,{len2:Math.min(h*.58,w*.4),w:7,limit:-it.lim,arc:false,flip:!!s});g+=L.svg;
        if(u>.05)g+=txt(L.end[0],L.end[1]-8,'t-sm t-mid',Math.round(-deg)+'°','fill:var(--ink)');
        const ok=got(it,p,s);g+=txt(s?x+w-6:x+6,jy+4,s?'t-lbl t-end':'t-lbl',s?'R':'L',ok?'fill:var(--good)':'');
        if(u>.999)g+=txt(s?x+w-6:x+6,jy-14,s?'t-xs t-end':'t-xs',ok?'+1':'0',ok?'fill:var(--good);font-weight:700':'')});
      return g}
    [0,1].forEach(s=>{const u=side(p,s),deg=-(s?it.R:it.L)*u,jy=y+h*(s?.86:.5),jx=x+w*(big?.52:.6),len=w*(big?.36:.44),l2=w*(big?.3:.34);
      const L=limb(jx,jy,len,deg,{len2:l2,w:big?7:11,limit:-it.lim,arc:big&&u>.05});g+=L.svg;
      if(!big&&u>.05)g+=txt(L.end[0]-4,L.end[1]-12,'t-sm t-end',Math.round(-deg)+'°','fill:var(--ink)');
      const ok=got(it,p,s);g+=txt(x+6,jy+4,'t-lbl',s?'R':'L',ok?'fill:var(--good)':'');
      if(u>.999)g+=txt(x+6,jy+(big?-14:-12),'t-xs',ok?'+1':'0',ok?'fill:var(--good);font-weight:700':'')});
    return g}
  /* thumbs: a forearm with a thumb rotating down and back toward its flexor surface */
  function thumbTile(it,p,x,y,w,h){let g='';
    [0,1].forEach(s=>{const u=side(p,s),th=60+((s?it.R:it.L)-60)*u,fy=y+h*(s?.8:.44),x0=x+w*.12,hx=x+w*.84,tl=w*.42;
      g+=`<path d="M${f1(x0)} ${f1(fy)}L${f1(hx)} ${f1(fy)}" style="fill:none;stroke:var(--skin-line);stroke-width:13.4;stroke-linecap:round"/><path d="M${f1(x0)} ${f1(fy)}L${f1(hx)} ${f1(fy)}" style="fill:none;stroke:var(--skin-epi);stroke-width:11;stroke-linecap:round"/>`;
      const a=th*Math.PI/180,bx=hx-8,by=fy+3,tx=bx+Math.cos(a)*tl,ty=by+Math.sin(a)*tl*.42;
      g+=`<path d="M${f1(bx)} ${f1(by)}L${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--skin-line);stroke-width:8.4;stroke-linecap:round"/><path d="M${f1(bx)} ${f1(by)}L${f1(tx)} ${f1(ty)}" style="fill:none;stroke:var(--skin-epi);stroke-width:6;stroke-linecap:round"/>`;
      const ok=got(it,p,s);
      if(u>.999){g+=ok?`<circle cx="${f1(tx)}" cy="${f1(ty)}" r="5.5" style="fill:none;stroke:var(--good);stroke-width:2"/>`:`<path d="M${f1(tx)} ${f1(ty+3)}L${f1(tx)} ${f1(fy+8)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/>`;
        g+=txt(x+w-6,fy-12,'t-xs t-end',ok?'touches: +1':'gap: 0',ok?'fill:var(--good);font-weight:700':'')}
      g+=txt(x+6,fy+4,'t-lbl',s?'R':'L',ok?'fill:var(--good)':'')});
    return g}
  /* forward bend: straight legs, the trunk folds forward until the palms rest on the floor */
  function bendTile(it,p,x,y,w,h){const u=ease(ramp(p,0,.95)),fl=y+h-8,cx=x+w*.36,leg=Math.min(66,h*.42),hip=fl-leg,tr=leg*.66,a=(-90+130*u)*Math.PI/180;
    const sx=cx+Math.cos(a)*tr,sy=hip+Math.sin(a)*tr,hx=cx+Math.cos(a)*(tr+11),hy=hip+Math.sin(a)*(tr+11),arm=leg*.62,hand=Math.min(sy+arm,fl-2),flat=sy+arm>=fl-2;
    let g=`<line x1="${f1(x+8)}" x2="${f1(x+w-8)}" y1="${f1(fl)}" y2="${f1(fl)}" style="stroke:var(--line);stroke-width:2"/>`;
    const st='fill:none;stroke:var(--ink);stroke-width:4;stroke-linecap:round;stroke-linejoin:round';
    g+=`<path d="M${f1(cx)} ${f1(fl)}L${f1(cx)} ${f1(hip)}L${f1(sx)} ${f1(sy)}" style="${st}"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="6" style="fill:var(--ink)"/>`;
    g+=`<path d="M${f1(sx)} ${f1(sy)}L${f1(sx-4)} ${f1(hand)}" style="${st};stroke-width:3;stroke:var(--muted)"/><path d="M${f1(cx-2)} ${f1(fl)}L${f1(cx+9)} ${f1(fl)}" style="${st};stroke-width:3"/>`;
    if(flat)g+=`<path d="M${f1(sx-6)} ${f1(fl-1.5)}L${f1(sx+12)} ${f1(fl-1.5)}" style="stroke:var(--good);stroke-width:4;stroke-linecap:round"/>`;
    g+=txt(cx-7,fl-14,'t-xs t-end','knees');g+=txt(cx-7,fl-4,'t-xs t-end','straight');
    if(p>=.98)g+=txt(x+w-6,y+34,'t-xs t-end','palms flat: +1','fill:var(--good);font-weight:700');
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 662');
    const P=IT.map(it=>ramp(t,it.a,it.b));
    const pts=IT.map((it,k)=>got(it,P[k],0)+(it.pts===2?got(it,P[k],1):0)),score=pts.reduce((a,b)=>a+b,0);
    const cut=ramp(t,.84,.93);
    let s='';
    /* tiles */
    const TW=N?190:134,TH=N?150:172;
    IT.forEach((it,k)=>{const x=N?6+(k%2)*198:6+k*143,y=N?6+Math.floor(k/2)*158:8,act=P[k]>0&&P[k]<1;
      s+=`<rect x="${x}" y="${y}" width="${TW}" height="${TH}" rx="10" style="fill:var(${act?'--dx-soft':'--panel-2'});stroke:var(${act?'--dx':'--line'});stroke-width:${act?1.8:1}"/>`;
      s+=txt(x+8,y+17,'t-lbl',it.nm)+txt(x+TW-8,y+17,'t-xs t-end',`${pts[k]}/${it.pts}`,pts[k]?'fill:var(--good);font-weight:700':'');
      const sub=it.pts===1?'palms to floor':it.lim>=160?'thumb to forearm':it.lim>=90?`≥ ${it.lim}° back`:`≥ ${it.lim}° past straight`;
      s+=txt(x+8,y+31,'t-xs',sub);
      const iy=y+30,ih=TH-34;
      s+=k===1?thumbTile(it,P[k],x,iy,TW,ih):k===4?bendTile(it,P[k],x,iy,TW,ih):pairTile(it,P[k],x,iy,TW,ih)});
    /* score pips, grouped 2-2-2-2-1 */
    const px0=N?18:14,py=N?506:226,ps=N?21:27,gg=N?14:16,pr=N?8:10.5;let xx=px0;
    s+=txt(px0-4,py-20,'t-lbl','Beighton score');
    IT.forEach((it,k)=>{const x0=xx;for(let j=0;j<it.pts;j++){const on=j<pts[k];s+=`<circle cx="${f1(xx+pr)}" cy="${py}" r="${pr}" style="fill:var(${on?'--good':'--field'});stroke:var(${on?'--good':'--line'});stroke-width:1.6"/>`;xx+=ps}
      s+=txt((x0+xx-ps+2*pr)/2,py+pr+14,'t-xs t-mid',it.sh);xx+=gg});
    if(N){s+=`<rect x="204" y="322" width="190" height="150" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`+txt(299,360,'t-lbl t-mid','Total')+`<text class="t-big t-mid" x="299" y="412" style="font-size:44px">${score}/9</text>`+txt(299,446,'t-xs t-mid','4 pairs × 2 + 1 bow')}
    else s+=`<text class="t-big" x="${f1(xx+6)}" y="${py+12}" style="font-size:34px">${score}/9</text>`;
    if(!N)s+=txt(14,py+50,'t-sm','Four pairs and a bow: 4 × 2 + 1 = 9');
    /* the 6-5-4 ladder */
    const LX=N?14:420,LY=N?562:216,cw=N?20:17,lab=N?120:108;
    s+=`<g style="opacity:${f1(.45+.55*Math.max(cut,ramp(t,.02,.1)*.4))}">`+txt(LX,LY-12,'t-lbl','6-5-4: the Criterion 1 cut-off by age');
    [['Child or teen',6],['Puberty to 50',5],['Over 50',4]].forEach(([nm,th],r)=>{const y=LY+r*(N?30:34),ok=score>=th;
      s+=txt(LX,y+13,'t-sm',nm,cut>.5?'fill:var(--ink)':'');
      for(let j=0;j<9;j++){const on=j<score;s+=`<rect x="${f1(LX+lab+j*cw)}" y="${y}" width="${f1(cw-3)}" height="18" rx="3" style="fill:var(${on?(ok?'--good-soft':'--warn-soft'):'--field'});stroke:var(--line);stroke-width:.8"/>`}
      const tx=LX+lab+th*cw-1.5;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${y-4}" y2="${y+22}" style="stroke:var(--dx);stroke-width:2.4"/>`+txt(tx+4,y-3,'t-xs',`≥${th}`,'fill:var(--dx);font-weight:700');
      if(cut>.5)s+=txt(LX+lab+9*cw+4,y+14,'t-xs',ok?'meets':'below',ok?'fill:var(--good);font-weight:700':'fill:var(--warn);font-weight:700')});
    s+='</g>';
    if(cut>0)s+=`<g style="opacity:${f1(cut)}">`+txt(14,N?654:py+80,'t-sm','Gate 1 of 3: a score alone is never a diagnosis','fill:var(--ink)')+'</g>';
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_LIST=[
 /* ---- Part 1: the syndromes ---- */
 [1,`How many EDS types does the 2017 International Classification recognise?`,[`6`,`11`,`13`,`20`],2,`13. Villefranche (1998) had 6 and Berlin (1988) had 11 [[Malfait2017,Forghani2019]].`],
 [1,`For which EDS type is a definite diagnosis made on clinical criteria, with no molecular confirmation?`,[`Hypermobile EDS`,`Classical EDS`,`Vascular EDS`,`Kyphoscoliotic EDS`],0,`hEDS is the only type without a known gene; all the others need the causative variant [[Malfait2017,Malfait2020]].`],
 [1,`Vascular EDS is caused by variants in:`,[`COL5A1`,`FBN1`,`TNXB`,`COL3A1`],3,`COL3A1, which encodes type III procollagen, a major protein of vessel walls and hollow organs [[Byers2017]].`],
 [1,`Most classical EDS is caused by defects in which collagen?`,[`Type I`,`Type V`,`Type III`,`Type XII`],1,`Type V (COL5A1 or COL5A2). Over 90% of people meeting all major criteria have a type V defect [[Symoens2012]].`],
 [1,`In collagen, every third residue is glycine because:`,[`Glycine carries the sugars`,`Glycine forms the cross-links`,`Only glycine fits in the crowded centre of the triple helix`,`Glycine is the cleavage site for BMP-1`],2,`The triple helix packs so tightly that only glycine fits at its centre, giving the Xaa-Yaa-Gly repeat [[Shoulders2009]].`],
 [1,`The collagen triple helix folds:`,[`From the C-terminus toward the N-terminus`,`From the N-terminus toward the C-terminus`,`From both ends at once`,`Only after secretion`],0,`From C to N. A glycine substitution stalls folding at that point [[Shoulders2009]].`],
 [1,`Loss of ADAMTS-2 causes which EDS type?`,[`Arthrochalasia EDS`,`Dermatosparaxis EDS`,`Classical-like EDS`,`Periodontal EDS`],1,`ADAMTS-2 is the procollagen I N-proteinase; its loss causes dermatosparaxis EDS [[Colige1999]].`],
 [1,`Arthrochalasia EDS is caused by variants that:`,[`Abolish lysyl hydroxylase 1`,`Remove complement C1 regulation`,`Delete exon 6 of COL1A1 or COL1A2, removing the N-proteinase cleavage site`,`Remove tenascin-X`],2,`Exon 6 holds the N-proteinase cleavage site, so aEDS blocks the same step as dEDS, at the substrate rather than the enzyme [[Byers1997]].`],
 [1,`Which EDS type has a raised urinary deoxypyridinoline to pyridinoline ratio?`,[`FKBP14-kyphoscoliotic EDS`,`Classical EDS`,`Vascular EDS`,`PLOD1-kyphoscoliotic EDS`],3,`PLOD1-kEDS (lysyl hydroxylase 1 deficiency); FKBP14-kEDS has normal urinary pyridinolines [[RohrbachGR-kEDS,Baumann2012]].`],
 [1,`Periodontal EDS is caused by variants in genes for:`,[`Complement C1 subunits (C1R, C1S)`,`Type V collagen`,`Dermatan sulfate enzymes`,`Zinc transport`],0,`C1R or C1S; it is the one type outside the collagen and proteoglycan pathways [[KapfererSeebacher2016]].`],
 [1,`A lack of attached gingiva is pathognomonic of:`,[`Classical EDS`,`Periodontal EDS`,`Brittle cornea syndrome`,`Hypermobile EDS`],1,`Periodontal EDS. In children of affected parents it was present in all 12 who carried the familial variant and none of 7 who did not [[KapfererSeebacher2021]].`],
 [1,`A parent has classical EDS. What is the chance that each child inherits it?`,[`50%`,`25%`,`100%`,`It cannot be estimated`],0,`cEDS is autosomal dominant: 50% for each child [[MalfaitGR-cEDS]].`],
 [1,`About what proportion of people with vascular EDS have a new (de novo) variant?`,[`Under 5%`,`About 50%`,`About 90%`,`All of them`],1,`About half, so a negative family history does not exclude vEDS [[Byers2025GeneReviews]].`],
 [1,`Compared with missense or exon-skipping variants, COL3A1 null (haploinsufficient) variants:`,[`Bring the first complication about 15 years earlier`,`Cause mainly bowel rupture`,`Delay the first complication by almost 15 years`,`Make no difference`],2,`The first complication comes almost 15 years later, and complications are almost all vascular [[Leistritz2011]].`],
 [1,`Prenatal or preimplantation genetic testing is NOT possible for:`,[`Vascular EDS`,`Classical EDS`,`Any dominant type`,`Hypermobile EDS`],3,`No gene is known for hEDS. For vEDS and cEDS it is possible once the familial variant is known [[Hakim2024GeneReviews,Byers2025GeneReviews]].`],
 [1,`A COL3A1 result comes back as a "variant of uncertain significance". It means:`,[`We do not know yet whether it causes disease`,`vEDS is confirmed`,`vEDS is excluded`,`The test failed`],0,`A VUS is not a diagnosis; some are later reclassified, as COL3A1 Glu>Lys variants were [[Ghali2019GenetMed]].`],
 [1,`Who first recognised EDS as a distinct entity in 1901?`,[`Henri-Alexandre Danlos`,`Frederick Parkes-Weber`,`Peter Beighton`,`Edvard Ehlers`],3,`Edvard Ehlers, a Danish dermatologist; Danlos followed in 1908 [[Parapia2008]].`],
 [1,`Berlin EDS type III corresponds in 2017 to:`,[`Hypermobile EDS`,`Vascular EDS`,`Classical EDS`,`Arthrochalasia EDS`],0,`Type III (Berlin) = hypermobility type (Villefranche) = hEDS (2017) [[Malek2021]].`],
 [1,`The diagnosed prevalence of EDS or joint hypermobility syndrome in Wales was about:`,[`1 in 50,000`,`1 in 5,000`,`1 in 500`,`1 in 20`],2,`194.2 per 100,000 in 2016/17, about 1 in 500 [[Demmler2019]].`],
 [1,`The HEDGE study aims to:`,[`Test celiprolol in hEDS`,`Whole-genome sequence 1,000 adults meeting the 2017 hEDS criteria`,`Revise the Beighton score`,`Count POTS in children`],1,`HEDGE, begun by the Ehlers-Danlos Society in 2018, is searching for the genetic basis of hEDS [[Douglas2026,VanDijk2024]].`],

 /* ---- Part 2: diagnosis ---- */
 [2,`The Beighton score has a maximum of:`,[`5`,`9`,`10`,`12`],1,`9 points from 5 manoeuvres; 4 are scored on both sides and the forward bend scores 1 [[Thwaites2022,Carroll2023]].`],
 [2,`Which Beighton item scores only 1 point?`,[`Elbow hyperextension`,`Thumb to forearm`,`Palms flat on the floor with knees straight`,`Little finger dorsiflexion`],2,`Forward flexion of the trunk with palms flat scores 1; the other four items score 1 per side [[Thwaites2022,Carroll2023]].`],
 [2,`In the 2017 criteria, the Beighton cut-off for an adult aged 30 is:`,[`4 or more`,`6 or more`,`3 or more`,`5 or more`],3,`5 or more from puberty to 50; 6 or more for children and adolescents; 4 or more over 50 [[Tofts2023,Fairweather2025]].`],
 [2,`A 58-year-old scores 4/9 on the Beighton score. For Criterion 1 of the 2017 hEDS criteria, this:`,[`Meets the cut-off for over-50s`,`Falls short by one point`,`Is irrelevant after 50`,`Proves hEDS`],0,`The over-50 cut-off is 4 or more. Criterion 1 is only one of three criteria, and a score alone is never a diagnosis [[Tofts2023,Fairweather2025]].`],
 [2,`A 35-year-old scores 4/9 and answers "yes" to 3 of the 5PQ questions. Criterion 1:`,[`Cannot be met`,`Can be met, because the score is one point short and the 5PQ is 2 or more`,`Is met only with a genetic test`,`Needs a score of 6`],1,`When the score is one point below the cut-off, a 5PQ of 2 or more counts as evidence of joint hypermobility [[Thwaites2022,Malfait2017]].`],
 [2,`Criterion 2 of the 2017 hEDS criteria requires:`,[`All of Features A, B and C`,`Feature A only`,`Feature C only`,`At least 2 of Features A, B and C`],3,`Two or more of A, B and C [[Thwaites2022,Fairweather2025]].`],
 [2,`Feature A needs how many of its 12 systemic items?`,[`5`,`2`,`8`,`12`],0,`At least 5 of 12 [[Fairweather2025,Thwaites2022]].`],
 [2,`Feature B is:`,[`Chronic widespread pain`,`A first-degree relative who independently meets the hEDS criteria`,`A positive genetic test`,`A Beighton score of 9`],1,`A positive family history in at least one first-degree relative [[Fairweather2025,Thwaites2022]].`],
 [2,`Which is NOT one of the three Feature C options?`,[`Pain in 2 or more limbs daily for 3 months or more`,`Chronic widespread pain for 3 months or more`,`Easy bruising`,`Atraumatic recurrent dislocations or instability`],2,`Feature C is musculoskeletal: limb pain, widespread pain, or recurrent dislocation or instability [[Thwaites2022]].`],
 [2,`A woman with rheumatoid arthritis has GJH. Under the 2017 criteria she can be diagnosed with hEDS only if she has:`,[`Features A and B; Feature C cannot count`,`Feature C alone`,`Any one feature`,`A COL5A1 variant`],0,`With an acquired rheumatic connective tissue disorder, both A and B are needed and Feature C does not count [[Fairweather2025,Thwaites2022]].`],
 [2,`Unusual skin fragility in someone being assessed for hEDS should prompt:`,[`A higher Feature A count`,`Nothing different`,`A diagnosis of HSD`,`Consideration of other EDS types (Criterion 3)`],3,`Criterion 3 requires no unusual skin fragility; its presence points to other types [[Fairweather2025,Thwaites2022]].`],
 [2,`Hypermobility spectrum disorder (HSD) is diagnosed when there is:`,[`Joint hypermobility with no symptoms`,`Joint hypermobility plus at least one secondary musculoskeletal manifestation, not meeting another syndrome`,`A COL3A1 variant`,`A Beighton score of 9 only`],1,`HSD is symptomatic joint hypermobility that does not fit hEDS or another syndrome [[Castori2017,Carroll2023]].`],
 [2,`Historical HSD (H-HSD) is:`,[`HSD in people over 50 only`,`HSD limited to the hands and feet`,`HSD at a single joint`,`Self-reported GJH on the 5PQ with a negative Beighton score, plus a secondary manifestation`],3,`H-HSD uses the 5PQ for past hypermobility when the examination score is negative [[Carroll2023]].`],
 [2,`According to the paediatric working group, a 12-year-old with GJH and joint pain should be:`,[`Diagnosed with hEDS now`,`Given no label at all`,`Assessed in the paediatric framework, with hEDS deferred until biological maturity`,`Tested for KLK15`],2,`Children should not be diagnosed with hEDS before biological maturity; the framework uses a Beighton of 6 or more [[Tofts2023]].`],
 [2,`Case: a 24-year-old man has a spontaneous sigmoid colon perforation, thin translucent skin and a brother with an arterial dissection at 31. The most important next step for the diagnosis is:`,[`A Beighton score`,`COL3A1 genetic testing for vascular EDS`,`The 5PQ`,`A trial of physiotherapy`],1,`Unexplained sigmoid rupture and a family history are vEDS minimal criteria that should prompt testing [[Wang2026OJRD]]; the consensus asks for the variant before the diagnosis is applied [[Byers2017]].`],
 [2,`Case: a 27-year-old woman has Beighton 7/9, daily pain in both knees and shoulders for a year, soft skin, striae, a high palate and dental crowding, and her mother meets the hEDS criteria. Skin heals normally. Which statement fits the 2017 criteria best?`,[`She has vascular EDS`,`She cannot have hEDS without a gene test`,`A clinician could consider hEDS after excluding other conditions under Criterion 3`,`HSD is ruled out by the family history`],2,`Criterion 1 (5 or more under 50), Features B and C, and possibly A, could fit; Criterion 3 still needs other disorders excluded. Only a clinician can make this call [[Fairweather2025,Thwaites2022]].`],
 [2,`Case: a 22-year-old has Beighton 6/9 and recurrent knee pain, but no family history, no systemic Feature A signs, and her assessment excludes other conditions. The likeliest 2017 label is:`,[`Generalised HSD`,`Hypermobile EDS`,`Classical EDS`,`Healthy hypermobility, with no label`],0,`With only Feature C, Criterion 2 is not met; symptomatic GJH that does not meet hEDS is G-HSD, whose main differential is hEDS [[Carroll2023,Castori2017]].`],
 [2,`Case: a 30-year-old has hyperextensible skin with wide, thin, shiny scars over the shins and Beighton 6/9. Which type should be considered and confirmed genetically?`,[`Hypermobile EDS`,`Periodontal EDS`,`Vascular EDS`,`Classical EDS`],3,`Hyperextensible skin with atrophic scarring plus GJH are the cEDS major criteria; papyraceous scars exclude the hEDS scar item [[VanDijk2024,Fairweather2025]].`],
 [2,`The cardinal features of Marfan syndrome in the revised Ghent nosology are:`,[`Skin hyperextensibility and atrophic scars`,`Aortic root aneurysm and ectopia lentis`,`Bifid uvula and hypertelorism`,`Blue sclerae and fractures`],1,`Aortic root aneurysm plus ectopia lentis are enough without a family history [[Loeys2010]].`],
 [2,`The Loeys-Dietz triad does NOT include:`,[`Ectopia lentis`,`Hypertelorism`,`Arterial tortuosity and aneurysms`,`Bifid uvula or cleft palate`],0,`Lens dislocation is absent in LDS, unlike Marfan syndrome [[Loeys2006,MacCarrick2014]].`],
 [2,`In one multi-institution study, how many people diagnosed with vEDS had non-pathogenic COL3A1 changes?`,[`None`,`About 50%`,`Nearly 10%`,`All clinically diagnosed people`],2,`11 of 173 (9.8%), so the authors judged that vEDS diagnosed without confirmatory testing cannot be trusted [[Shalhub2020]].`],
 [2,`In UK 14-year-olds, a Beighton score of 4 or more was found in:`,[`2% of girls`,`64.6% of boys`,`Nobody`,`27.5% of girls and 10.6% of boys`],3,`So GJH alone is common and is not a diagnosis [[Clinch2011]].`],

 /* ---- Part 3: body systems ---- */
 [3,`Women with hEDS had knee strength that was:`,[`Normal`,`30% to 49% lower, with similar muscle mass`,`Higher than controls`,`Lower only because of smaller muscles`],1,`Strength and endurance were 30–49% lower while DXA muscle mass was similar [[Rombaut2012Strength]].`],
 [3,`Pressure-pain thresholds in hEDS were lower than in controls:`,[`Only at painful joints`,`Only in children`,`Even at pain-free sites`,`Not at all`],2,`2.9 vs 5.2 kg/cm² even where patients reported no pain: generalised hyperalgesia [[Rombaut2015]].`],
 [3,`The proposed order of hEDS natural-history phases is:`,[`Pain, stiffness, hypermobility`,`Stiffness, hypermobility, pain`,`Hypermobility only`,`Hypermobility, pain, stiffness`],3,`Hypermobility, then pain, then stiffness [[Castori2010]].`],
 [3,`In EDS, standard clotting tests are usually:`,[`Normal, with fragile capillaries explaining the bruising`,`Prolonged`,`Showing factor VIII deficiency`,`Showing low platelets`],0,`Bruising comes from capillary and perivascular fragility; only the Hess test may be abnormal [[DePaepe2004]].`],
 [3,`Heel piezogenic papules were found in what share of healthy Dutch children?`,[`2%`,`72%`,`20%`,`None`],1,`72% of 322 children, so the sign is common and not specific [[vanStraaten1991]].`],
 [3,`Skin that is thin and translucent with visible veins, but not markedly stretchy, suggests:`,[`Classical EDS`,`Hypermobile EDS`,`Vascular EDS`,`Classical-like EDS`],2,`That is the vEDS skin picture [[Stembridge2023]].`],
 [3,`POTS in an adult is a sustained heart-rate rise within 10 minutes of standing of at least:`,[`20 beats/min`,`40 beats/min`,`10 beats/min`,`30 beats/min`],3,`30 beats/min in adults (40 at ages 12 to 19), without orthostatic hypotension [[Sheldon2015,Vernino2021]].`],
 [3,`In 91 people with POTS, the share meeting the 2017 hEDS criteria was:`,[`31%`,`3%`,`75%`,`100%`],0,`31%, with a further 24% having GJH without meeting the criteria [[Miller2020POTS]].`],
 [3,`The consensus laboratory criterion for mast-cell activation is an event-related tryptase rise of:`,[`Any rise`,`At least 20% + 2 ng/mL over baseline`,`Above 100 ng/mL`,`A fall of 20%`],1,`The "20% + 2" formula [[Valent2019IAAI]]. The AGA does not support universal MCAS testing in hEDS/HSD [[Aziz2025]].`],
 [3,`What is the best current evidence label for the hEDS-MCAS link?`,[`Established`,`Disproved`,`Hypothesis to early evidence`,`Proven by RCT`],2,`No controlled study using consensus MCAS criteria has shown it [[Kucharik2020,Aziz2025,Vazquez2022]].`],
 [3,`Hereditary alpha-tryptasemia in people with HSD or hEDS was:`,[`Ten times more common`,`Present in all`,`The cause of hEDS`,`No more prevalent than in the general population`],3,`About 5–7% in Western populations, and no higher in hypermobility disorders [[Vazquez2022]].`],
 [3,`In vascular EDS, more than 80% of index patients have had a complication by age:`,[`40`,`10`,`20`,`70`],0,`25% by 20 and more than 80% by 40 [[Pepin2000]].`],
 [3,`Most deaths in vascular EDS result from:`,[`Bowel rupture`,`Arterial rupture`,`Pneumothorax`,`Infection`],1,`Arterial rupture; bowel rupture is common but rarely fatal [[Pepin2000]].`],
 [3,`The arterial bed most often affected in genetically confirmed vEDS is:`,[`Coronary`,`Aortic root`,`Mesenteric`,`Radial`],2,`Mesenteric arteries, 31.7% [[Shalhub2019]].`],
 [3,`After spontaneous sigmoid perforation in vEDS, the review favours which emergency operation?`,[`Primary anastomosis`,`Colonoscopic clipping`,`No surgery`,`Hartmann's procedure`],3,`Reperforation was considerably more frequent after partial colectomy with anastomosis [[ElMasri2018]].`],
 [3,`Median survival in vEDS in the 2014 cohort of 1,231 people was:`,[`51 years, lower in men`,`80 years`,`25 years`,`Not different from the general population`],0,`51 years, lower in men and varying with variant type; a population statistic, not an individual prognosis [[Pepin2014]].`],
 [3,`The evidence for craniocervical fusion in EDS is best described as:`,[`Several large RCTs`,`Established standard care`,`Weak: no validated imaging criteria and level III–V studies`,`Disproved`],2,`A systematic review found 78 surgical patients and evidence levels III to V [[Lohkamp2022]].`],
 [3,`In population studies, hypermobility is linked most clearly to which kind of osteoarthritis?`,[`Knee`,`Hip`,`Distal finger`,`Thumb base`],3,`Thumb-base (first carpometacarpal) OA; knee and hand OA are not increased [[Jonsson1996,Dolan2003,Kraus2004]].`],
 [3,`Joint hypermobility syndrome in GI clinic patients was more common in:`,[`Functional than organic GI disorders`,`Organic than functional disorders`,`Neither`,`Coeliac disease only`],0,`39.0% vs 27.5% (adjusted OR 1.51) [[Fikree2015]].`],
 [3,`In Swedish registers, EDS was associated with which relative risk of autism?`,[`1.1`,`7.4`,`0.5`,`50`],1,`RR 7.4; ADHD RR 5.6 [[Cederlof2016]].`],
 [3,`More than three-quarters of people with EDS in a Dutch study reported:`,[`No pain`,`Normal sleep`,`A diagnosis in childhood`,`Severe fatigue`],3,`Severe fatigue, linked to sleep, concentration, social functioning, self-efficacy and pain [[Voermans2010Fatigue]].`],

 /* ---- Part 4: treatment ---- */
 [4,`Which statement about exercise-based physiotherapy in hEDS/HSD is accurate?`,[`It is the cornerstone of care, but controlled-trial evidence of superiority is weak`,`It is proven in large RCTs`,`It is contraindicated`,`It cures hEDS`],0,`It is the cornerstone, yet only 3 small controlled studies showed benefit over a control [[Palmer2021]].`],
 [4,`In the Danish shoulder trial in HSD, heavy versus light training:`,[`Was worse at 16 weeks`,`Was better at 16 weeks but not significantly at 1 year`,`Caused frequent dislocations`,`Made no difference at any time`],1,`WOSI −174.5 at 16 weeks, smaller than the MID of 252; not significant at 1 year [[Liaghat2022BJSM,Liaghat2024BJSM]].`],
 [4,`During heavy shoulder training in HSD, exercise-induced pain:`,[`Rose above 7/10`,`Stopped the trial`,`Stayed below 0.5/10`,`Was not measured`],2,`It stayed below 0.5/10, "challenging previous beliefs" [[Liaghat2025]].`],
 [4,`In the Bendy Study (119 children), a tailored physiotherapy plus occupational therapy programme versus advice:`,[`Doubled the benefit`,`Caused harm`,`Was stopped early`,`Added no benefit at 12 months`],3,`Education and positive messages about exercise gave significant benefit without more complex interventions [[Bale2019]].`],
 [4,`Children's knee pain after 8 weeks of exercise into the hypermobile range versus only to neutral:`,[`Fell similarly in both groups`,`Rose in the hypermobile-range group`,`Fell only with neutral exercise`,`Did not change`],0,`Worst knee pain fell by a mean 14.5 mm on a VAS whichever group the child was in [[Pacey2013]].`],
 [4,`BBEST randomised 53 people with vEDS to celiprolol or no treatment. Arterial events occurred in:`,[`50% vs 20%`,`20% vs 50%`,`5% vs 6%`,`0% vs 100%`],1,`20% on celiprolol vs 50% of controls (HR 0.36); open-label and stopped early for benefit [[Ong2010]].`],
 [4,`Celiprolol is:`,[`A pure β1 blocker`,`An angiotensin receptor blocker`,`A β1 antagonist with β2 agonist action`,`A calcium channel blocker`],2,`A β1 antagonist with β2 agonist action, uptitrated to 400 mg/day in BBEST [[Ong2010]].`],
 [4,`In ARCADE, irbesartan added to celiprolol:`,[`Increased arterial events`,`Was stopped for harm`,`Was not tested in vEDS`,`Reduced the composite arterial outcome, 27.6% vs 53.6%`],3,`HR 0.42 over 2 years [[Jeunemaitre2025]].`],
 [4,`The US regulatory status of celiprolol is:`,[`Not FDA-approved`,`Approved for vEDS in 2010`,`Approved for POTS`,`Withdrawn for safety`],0,`It has no FDA approval; the ACC/AHA judged the data insufficient [[Isselbacher2022,openFDA-Celiprolol]].`],
 [4,`Why is diagnostic arteriography avoided in vEDS?`,[`It is too expensive`,`A historical series reported a 67% complication rate`,`It cannot show arteries`,`It requires general anaesthesia`],1,`Arteriography injured fragile vessels; GeneReviews keeps it for locating life-threatening bleeding before surgery [[Cikrit1987,Byers2025GeneReviews]].`],
 [4,`In vEDS, the ACC/AHA says the aorta and its branches may rupture:`,[`Only above 5.5 cm`,`Only after age 60`,`Even without significant dilation`,`Never during surveillance`],2,`So there is no safe diameter threshold [[Isselbacher2022]].`],
 [4,`In the lidocaine trial, the share of people with EDS still numb at 30 minutes was:`,[`80%, the same as controls`,`100%`,`0%`,`53%, versus 80% of controls`],3,`Equal effect at 5 minutes, but a shorter duration [[Bourne2026RAPM]].`],
 [4,`HRS 2015 grades 2–3 L of water and 10–12 g of salt daily for POTS as:`,[`Class IIb, "may be considered"`,`Class I, mandatory`,`Class III, harmful`,`Not mentioned`],0,`Class IIb, level E [[Sheldon2015]].`],
 [4,`For propranolol in POTS, "less is more" means:`,[`Lower doses cause more side effects`,`20 mg improved symptoms more than 80 mg`,`It should be taken less than weekly`,`No dose helps`],1,`80 mg lowered heart rate more, but 20 mg improved symptoms more [[Raj2009Circ]].`],
 [4,`The midodrine label's boxed warning concerns:`,[`Fetal toxicity`,`Liver failure`,`Supine hypertension`,`Bleeding`],2,`Marked supine hypertension; no doses after the evening meal or within 4 hours of bedtime [[FDA-Midodrine]].`],
 [4,`The ivabradine (Corlanor) label warns of fetal toxicity. Why does that matter in POTS?`,[`POTS only affects men`,`Ivabradine is approved for POTS`,`It does not matter`,`Most people with POTS are women of childbearing age`],3,`The label advises effective contraception; POTS is not a labelled use [[FDA-Corlanor,Vernino2021]].`],
 [4,`Classical EDS skin wounds are closed:`,[`In two layers without tension, with skin stitches left about twice as long`,`With staples removed at 3 days`,`Under tension for strength`,`Only with glue`],0,`GeneReviews' cEDS wound advice [[Malfait2024GeneReviews]].`],
 [4,`In vEDS, Wiesmann 2014 advises about neuraxial anaesthesia and invasive lines:`,[`Use them routinely`,`Avoid them where possible; if a central line is unavoidable, use ultrasound guidance`,`Prefer spinal anaesthesia`,`Use them only in children`],1,`Fragile vessels raise the risk; ultrasound guidance is mandatory for an unavoidable central line [[Wiesmann2014]].`],
 [4,`Desmopressin in children with EDS and bleeding symptoms:`,[`Prolonged bleeding time`,`Had no effect`,`Roughly halved bleeding time`,`Was contraindicated`],2,`11.26 to 5.95 minutes [[Mast2009]].`],
 [4,`How many medicines are FDA-approved specifically for POTS?`,[`Three`,`One`,`Five`,`None`],3,`None; the drugs used are off-label [[Vernino2021]].`],

 /* ---- Part 5: living with EDS ---- */
 [5,`In the Global Registry survey, the mean time to an hEDS diagnosis was about:`,[`10 years`,`6 months`,`2 years`,`40 years`],0,`10.39 years, after an average of 15.6 clinicians [[Halverson2023]].`],
 [5,`In Wales, women were diagnosed with EDS/JHS on average how much later than men?`,[`They were diagnosed earlier`,`8.5 years later`,`No difference`,`20 years later`],1,`8.5 years later; 72% of males but 41% of females were diagnosed in childhood [[Demmler2019]].`],
 [5,`A person with vEDS develops sudden, severe, unexplained abdominal pain. What does published guidance advise?`,[`Wait a day`,`Take a stronger painkiller at home`,`Seek immediate medical attention and show the emergency card`,`Book a routine colonoscopy`],2,`Sudden unexplained pain needs immediate care, with documentation such as a vEDS passport [[Byers2025GeneReviews,Byers2017]].`],
 [5,`Pregnancy-related deaths in vEDS pedigrees were about:`,[`0.01%`,`50%`,`25%`,`5% per delivery`],3,`30 of 565 deliveries (5.3%); GeneReviews summarises about 5% per pregnancy [[Murray2014,Byers2025GeneReviews]].`],
 [5,`Most pregnancies in hypermobile EDS:`,[`Are uncomplicated`,`End in uterine rupture`,`Need caesarean at 30 weeks`,`Are not possible`],0,`Most go well; joint dislocation, pain and POTS are the issues to plan for [[Karthikeyan2018]].`],
 [5,`Hypermobile athletes have higher odds of which injury in contact sport?`,[`Ankle`,`Knee`,`Wrist`,`None`],1,`Knee (combined OR 4.69); ankle injury risk was not raised [[Pacey2010]].`],
 [5,`Which activities does GeneReviews list to avoid in vEDS?`,[`All exercise`,`Walking`,`Collision sports, heavy lifting and extreme weight training`,`Swimming`],2,`Regular low-intensity exercise is encouraged for health and wellbeing [[Byers2025GeneReviews,Bowen2023]].`],
 [5,`A spontaneous bowel perforation in a young person, according to the UK national vEDS service, should prompt:`,[`Reassurance`,`A Beighton score`,`Physiotherapy`,`Genetic testing for vEDS`],3,`74 of 180 patients in that service were diagnosed only after a vascular event or organ rupture [[Bowen2023]].`],
 [5,`Why does perinatal guidance recommend documenting early bruising in infants with hEDS/HSD?`,[`To avoid false accusations of maltreatment`,`To diagnose vEDS`,`For research only`,`It does not`],0,`EDS is on the differential for bruising in suspected abuse, and documentation protects families [[Pezaro2024]].`],
 [5,`According to parents, which school task was hardest for children with EDS?`,[`Reading`,`Keeping up with handwriting`,`Music`,`Lunch`],1,`Handwriting (71%); school participation satisfied only 33% of parents [[Wesley2021]].`],
 [5,`POTS can usually be identified with:`,[`A genetic test`,`A skin biopsy`,`Heart rate and blood pressure lying down and during a 10-minute stand`,`A Beighton score`],2,`The active stand test; tilt testing is an alternative [[Vernino2021]].`],
 [5,`In a UK national survey of 2,002 people with hEDS/HSD, unemployment was reported by:`,[`5%`,`95%`,`20%`,`45.6%`],3,`45.6%, and 47.9% reported dependence on benefits [[Berg2026]].`],
 [5,`Each child of a parent with vascular EDS has what chance of inheriting it?`,[`50%`,`25%`,`10%`,`100%`],0,`vEDS is autosomal dominant [[Byers2025GeneReviews]].`],
 [5,`In a qualitative study, 73% of survey respondents with EDS had come to question:`,[`Their diagnosis code`,`The extent or reality of their own pain`,`Their genetic test`,`Their exercise plan`],1,`Repeated dismissal fed self-doubt; the authors recommend "epistemic humility" from clinicians [[Halverson2025]].`]
];
inits.quiz=()=>{
  const F=[['mix','%t:quiz.mixed%'],...Object.keys(RV_PARTN).map(k=>[k,'%t:part%'+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ_LIST.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
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
const GL_LIST=[
 ["5PQ (five-part questionnaire)",`Five yes/no questions about present and past hypermobility; 2 or more "yes" answers is positive (84% sensitivity, 89% specificity in its development cohort) [[Hakim2003]].`,"beighton"],
 ["Acrogeria",`Fine wrinkling of the face, hands and feet seen with thin, translucent skin in vascular EDS [[Stembridge2023]].`,"skin"],
 ["Active stand test",`Heart rate and blood pressure recorded lying down and then during a 10-minute stand; it usually identifies POTS [[Vernino2021]].`,"autonomic"],
 ["ADAMTS-2",`The procollagen I N-proteinase that trims the N-propeptide; biallelic loss of ADAMTS2 causes dermatosparaxis EDS [[Colige1999]].`,"collagen"],
 ["AEBP1 (ACLP)",`A protein that binds fibrillar collagens and enhances their polymerisation; biallelic variants cause classical-like EDS type 2 [[Blackburn2018]].`,"types"],
 ["Aneurysm",`A localised widening of an artery. In vEDS arteries may rupture or dissect even without significant dilation [[Isselbacher2022]].`,"vascular"],
 ["Arachnodactyly",`Long, slender fingers; in the hEDS criteria (Feature A item 9) it means a positive wrist or thumb sign on both sides [[Fairweather2025]].`,"criteria"],
 ["ARCADE trial",`A double-blind RCT of irbesartan added to celiprolol in vEDS: composite arterial outcome 27.6% vs 53.6% over 2 years (HR 0.42) [[Jeunemaitre2025]].`,"vascular"],
 ["ARFID",`Avoidant/restrictive food intake disorder. In 680 people with hEDS/HSD, an ARFID fear-of-eating screen predicted needing nutrition support [[Topan2024]].`,"gut"],
 ["Arm span-to-height ratio",`A ratio of 1.05 or more is one of the 12 Feature A items of the hEDS criteria [[Fairweather2025]].`,"criteria"],
 ["Arterial dissection",`A tear in an artery's inner lining that lets blood split the wall. Arterial rupture or dissection under 40 is a vEDS minimal criterion [[Wang2026OJRD]].`,"vascular"],
 ["Arteriography",`Imaging by catheter inside the arteries. In vEDS it is discouraged except to find life-threatening bleeding before surgery [[Byers2025GeneReviews]].`,"vascular"],
 ["Arthrochalasia EDS (aEDS)",`Autosomal dominant type caused by COL1A1 or COL1A2 variants that delete exon 6; hallmark congenital bilateral hip dislocation [[VanDijk2024,Byers1997]].`,"types"],
 ["Articaine",`A dental local anaesthetic with the highest reported success rate (30%) among EDS survey respondents who named their agent [[Schubart2019LA]].`,"surgery"],
 ["Atrophic scar",`A thin, depressed scar. hEDS Feature A counts atrophic scars at 2 or more sites without the papyraceous or haemosiderotic scars of classical EDS [[Fairweather2025]].`,"criteria"],
 ["Autosomal dominant",`One changed copy is enough; each child of an affected parent has a 50% chance of inheriting it (cEDS, vEDS, aEDS, pEDS) [[MalfaitGR-cEDS,ByersGR-vEDS,KapfererSeebacherGR-pEDS]].`,"genes"],
 ["Autosomal recessive",`Two changed copies are needed; children of two carriers have a 25% chance of being affected (kEDS, clEDS, mcEDS and others) [[RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS]].`,"genes"],
 ["BBEST trial",`The open, randomised celiprolol trial in 53 people with vEDS: arterial events 20% vs 50% (HR 0.36), stopped early for benefit [[Ong2010]].`,"vascular"],
 ["Beighton score",`A 9-point screen of joint hypermobility from 5 manoeuvres, devised in 1973 on 1,083 Tswana Africans; a screening tool, not a diagnostic test [[Beighton1973,Malek2021D]].`,"beighton"],
 ["Bendy Study",`An RCT in 119 hypermobile children: tailored physiotherapy plus occupational therapy added nothing over standard advice at 12 months [[Bale2019]].`,"physio"],
 ["Berlin nosology",`The 1986 EDS classification (published 1988) with 11 subtypes numbered in Roman numerals [[Beighton1988,Forghani2019]].`,"history"],
 ["Biallelic",`Affecting both copies of a gene, as in recessive types such as dermatosparaxis EDS [[Colige1999]].`,"genes"],
 ["BIoH (Bristol Impact of Hypermobility)",`A 55-item questionnaire developed with people with JHS; its smallest detectable change is 42 points [[Palmer2017BIoH,Palmer2017SDC]].`,"physio"],
 ["BMP-1",`Bone morphogenetic protein-1, the same protein as procollagen C-proteinase, which removes the C-propeptides [[Kessler1996]].`,"collagen"],
 ["Brighton criteria",`The 1998 criteria for benign joint hypermobility syndrome, published in 2000, folded into hEDS and HSD in 2017 [[Grahame2000,Tinkle2017]].`,"history"],
 ["Brittle cornea syndrome (BCS)",`Autosomal recessive type caused by ZNF469 or PRDM5: thin cornea that may rupture, keratoconus or keratoglobus, blue sclerae [[Dhooge2021,VanDijk2024]].`,"types"],
 ["Cardiac-valvular EDS (cvEDS)",`Autosomal recessive type from biallelic COL1A2 null variants: heart valve disease without bone involvement [[Schwarze2004]].`,"types"],
 ["Carotid-cavernous sinus fistula",`An abnormal connection between the carotid artery and the cavernous sinus; without trauma it is a vEDS major criterion [[VanDijk2024]].`,"vascular"],
 ["Carter-Wilkinson score",`The 1964 joint laxity score that Beighton adapted in 1973 [[Carter1964,Malek2021D]].`,"beighton"],
 ["Cascade testing",`Testing relatives for a known familial variant; in vEDS, first-degree relatives can be tested even without clinical signs [[Byers2025GeneReviews]].`,"genes"],
 ["Celiprolol",`A β1 antagonist with β2 agonist action used in vEDS, uptitrated to 400 mg/day in BBEST; not FDA-approved [[Ong2010,Isselbacher2022]].`,"meds"],
 ["Central sensitisation",`An amplified pain response in the central nervous system; signs were found in people with JHS/hEDS without nerve damage (Early evidence) [[DiStefano2016]].`,"pain"],
 ["Chiari malformation type I",`Descent of the cerebellar tonsils. 12.7% of 2,813 people with Chiari I met criteria for EDS or a related disorder in a surgical series (Early evidence) [[Milhorat2007]].`,"pain"],
 ["CHST14",`Dermatan-4-sulfotransferase 1; its loss abolishes dermatan sulfate and causes musculocontractural EDS [[Dundar2009]].`,"types"],
 ["Classical EDS (cEDS)",`Autosomal dominant type, about 1 in 20,000, mostly COL5A1/COL5A2: hyperextensible skin, atrophic scarring and GJH [[VanDijk2024]].`,"types"],
 ["Classical-like EDS (clEDS)",`Type 1 is recessive TNXB deficiency with hyperextensible skin but no atrophic scars; type 2 is caused by AEBP1 [[Schalkwijk2001,Blackburn2018]].`,"types"],
 ["Closed kinetic chain exercise",`Exercise with the foot or hand fixed against a surface; an 8-week home programme improved knee proprioception in 16 of 18 people with JHS [[Ferrell2004]].`,"physio"],
 ["COL1-related overlap disorder",`A proposed EDS-OI overlap phenotype in people with COL1A1/COL1A2 variants; not one of the 13 types [[Morlino2020,VanDijk2024]].`,"types"],
 ["COL3A1",`The gene for type III procollagen; heterozygous pathogenic variants cause vascular EDS [[Byers2017]].`,"genes"],
 ["COL5A1 / COL5A2",`Genes for type V collagen chains; variants cause most classical EDS [[Symoens2012]].`,"genes"],
 ["Collagen",`The main structural protein: about one-third of human protein and three-quarters of the dry weight of skin; 28 types are known [[Shoulders2009]].`,"collagen"],
 ["Compression garments",`Elastic clothing. Added to physiotherapy in hEDS, they improved dynamic balance more, while pain fell equally in both groups [[Benistan2024]].`,"physio"],
 ["Conditioned pain modulation",`The body's ability to dampen one pain with another; it was weaker in classical EDS than in controls (Early evidence) [[Colman2023]].`,"pain"],
 ["Craniocervical instability (CCI)",`Proposed instability between the skull and upper neck; it has no validated imaging criteria, and surgical evidence is level III–V [[Lohkamp2022]].`,"pain"],
 ["Criterion 1",`Generalised joint hypermobility on the Beighton score with age cut-offs of 6, 5 and 4, or one point short with a positive 5PQ [[Tofts2023,Thwaites2022]].`,"criteria"],
 ["Criterion 2",`Two or more of Features A, B and C in the 2017 hEDS criteria [[Thwaites2022,Fairweather2025]].`,"criteria"],
 ["Criterion 3",`No unusual skin fragility, and exclusion of other connective tissue disorders and alternative causes of hypermobility [[Fairweather2025,Thwaites2022]].`,"criteria"],
 ["Cross-link",`A covalent bond between collagen molecules, made possible by lysyl oxidase; it gives fibrils strength [[Lucero2006,Shoulders2009]].`,"collagen"],
 ["Cutis laxa",`Loose, redundant skin from fragmented elastic fibres; unlike classical EDS skin, it does not snap back [[Beyens2021,MalfaitGR-cEDS]].`,"differential"],
 ["D-period",`The 67 nm repeating band of a collagen fibril, from quarter-staggered molecules 4.46 D long [[Shoulders2009]].`,"collagen"],
 ["De novo variant",`A genetic change new in the person, not inherited; about half of vEDS and cEDS cases [[Byers2025GeneReviews,Malfait2024GeneReviews]].`,"genes"],
 ["Decorin",`A proteoglycan whose dermatan sulfate chain helps organise collagen; in CHST14 deficiency collagen bundles form poorly [[Miyake2010]].`,"collagen"],
 ["Dermatosparaxis EDS (dEDS)",`Autosomal recessive type from ADAMTS2 loss: extreme skin fragility and redundant skin; prevalence under 1 in 1,000,000 [[Colige1999,VanDijk2024]].`,"types"],
 ["Desmopressin (DDAVP)",`A drug that roughly halved bleeding time in children with EDS (11.26 to 5.95 minutes) [[Mast2009]].`,"meds"],
 ["DGBI (functional GI disorder)",`Disorders of gut-brain interaction such as functional dyspepsia and IBS; joint hypermobility is more common in them than in organic GI disease [[Fikree2015]].`,"gut"],
 ["DiSCOVER trial",`A recruiting phase 3, double-blind trial of celiprolol (ACER-002) versus placebo in COL3A1-positive vEDS [[NCT05432466]].`,"frontier"],
 ["Dislocation",`A joint fully out of place. In classical EDS, 34.1% of adults vs 3.2% of children had had one [[Ritelli2020C]].`,"joints"],
 ["Dominant-negative",`A variant whose faulty protein disrupts the normal one; 76.8% of variants in a Dutch vEDS cohort were predicted to act this way [[Demirdas2024]].`,"genes"],
 ["Ectopia lentis",`Dislocation of the eye's lens; with aortic root aneurysm it is a cardinal feature of Marfan syndrome [[Loeys2010]].`,"differential"],
 ["Ehlers-Danlos syndromes (EDS)",`A group of heritable connective tissue disorders with joint hypermobility, skin hyperextensibility and tissue fragility; 13 types in 2017 [[Malfait2017]].`,"what"],
 ["Embolisation",`Blocking a bleeding artery from inside; the main endovascular approach when vEDS arteries needed intervention (13.4%) [[Shalhub2019JVS]].`,"vascular"],
 ["Epistemic humility",`Clinicians acknowledging the limits of what is known; recommended after 73% of people with EDS reported doubting their own pain [[Halverson2025]].`,"living"],
 ["Exon skipping",`A splice change that drops an exon from the message; COL1A1/COL1A2 exon 6 skipping causes arthrochalasia EDS [[Klaassens2012]].`,"genes"],
 ["Feature A",`Systemic signs of a more generalised connective tissue disorder: at least 5 of 12 items, such as soft skin, striae and arachnodactyly [[Fairweather2025,Thwaites2022]].`,"criteria"],
 ["Feature B",`A first-degree relative who independently meets the hEDS criteria [[Fairweather2025]].`,"criteria"],
 ["Feature C",`Musculoskeletal complications: limb pain daily for 3 months, chronic widespread pain, or atraumatic recurrent dislocation or instability [[Thwaites2022]].`,"criteria"],
 ["FBN1",`The fibrillin-1 gene; variants cause Marfan syndrome [[Dietz1991]].`,"differential"],
 ["Fibril",`The rope-like assembly of collagen molecules; tendon fibrils reach up to 1 cm long and about 500 nm across [[Shoulders2009]].`,"collagen"],
 ["Fibromyalgia",`A chronic widespread pain condition; since 2016 it can be diagnosed alongside another condition, and pain alone cannot separate it from hEDS [[Wolfe2016,Fairweather2025]].`,"differential"],
 ["FKBP14",`An ER folding catalyst for type III collagen; biallelic variants cause kyphoscoliotic EDS with normal urinary pyridinolines [[Giunta2018,Baumann2012]].`,"collagen"],
 ["Fludrocortisone",`A mineralocorticoid used off-label in POTS; it has not been tested in randomised trials in POTS [[Sheldon2015]].`,"meds"],
 ["G-HSD (generalised HSD)",`GJH on an objective score plus at least one secondary musculoskeletal manifestation; its main differential is hEDS [[Carroll2023,Castori2017]].`,"hsd"],
 ["Generalised joint hypermobility (GJH)",`Hypermobility in 5 or more joints across the limbs and axial skeleton; common, and not a diagnosis on its own [[Carroll2023,Clinch2011]].`,"beighton"],
 ["Glycine substitution",`Replacement of a helix glycine by a bulkier residue, which stalls triple-helix folding; the commonest vEDS variant type [[Shoulders2009,Frank2015]].`,"genes"],
 ["Goniometer",`A protractor for measuring joint angles; Beighton scoring in children is valid "when goniometry is used" [[Smits-Engelsman2011]].`,"beighton"],
 ["H-HSD (historical HSD)",`GJH reported on the 5PQ with a negative Beighton score, plus a secondary musculoskeletal manifestation [[Carroll2023]].`,"hsd"],
 ["Haemosiderotic scar",`A brown, iron-stained scar typical of classical EDS (54.7% of confirmed cases) [[Ritelli2020C]].`,"skin"],
 ["Haploinsufficiency (null allele)",`One gene copy makes no protein, halving the amount; COL3A1 null variants delay vEDS complications by almost 15 years [[Leistritz2011]].`,"genes"],
 ["Hartmann's procedure",`Resection of the bowel with an end colostomy and no join; favoured after vEDS sigmoid perforation because reperforation was rarer [[ElMasri2018]].`,"vascular"],
 ["HEDGE study",`The Hypermobile Ehlers-Danlos Genetic Evaluation, begun in 2018 to whole-genome sequence 1,000 adults meeting the 2017 hEDS criteria [[Douglas2026,VanDijk2024]].`,"frontier"],
 ["Hereditary alpha-tryptasemia (HαT)",`Extra TPSAB1 copies raising basal tryptase; not more prevalent in hypermobility disorders than in the general population [[Vazquez2022]].`,"gut"],
 ["Hess test",`The Rumpel-Leede capillary fragility test; it may be abnormal in EDS when clotting tests are normal [[DePaepe2004]].`,"skin"],
 ["High-load training",`Strength training at high resistance; in HSD shoulders it beat low load at 16 weeks, with exercise pain below 0.5/10 [[Liaghat2022BJSM,Liaghat2025]].`,"physio"],
 ["Hypermobile EDS (hEDS)",`Likely the commonest heritable connective tissue disorder, and the only EDS type with no known gene; diagnosed clinically with the 2017 criteria [[Tinkle2017,Malfait2017]].`,"criteria"],
 ["Hypermobility spectrum disorders (HSD)",`The 2017 labels for symptomatic joint hypermobility that does not fit hEDS or another syndrome [[Castori2017]].`,"hsd"],
 ["Hyperalgesia",`Increased sensitivity to pain; in hEDS pressure-pain thresholds were low even at pain-free sites [[Rombaut2015]].`,"pain"],
 ["Hypertelorism",`Widely spaced eyes; part of the Loeys-Dietz triad [[Loeys2006]].`,"differential"],
 ["Inspiratory muscle training",`Breathing-muscle training; 6 weeks raised 6-minute walk distance from 455 to 515 m in women with hEDS [[Reychler2019]].`,"physio"],
 ["Irbesartan",`An angiotensin receptor blocker that reduced arterial events when added to celiprolol in ARCADE [[Jeunemaitre2025]].`,"meds"],
 ["Ivabradine",`A heart-rate-lowering drug labelled for heart failure, used off-label in POTS; its label warns of fetal toxicity [[FDA-Corlanor]].`,"meds"],
 ["Joint hypermobility syndrome (JHS)",`The pre-2017 label, with benign joint hypermobility syndrome (BJHS), now replaced by hEDS and HSD [[Carroll2023]].`,"hsd"],
 ["Kinesiophobia",`Fear of movement; 93% of 42 people with JHS/EDS-HT scored above the Tampa Scale cut-off [[Celletti2013]].`,"physio"],
 ["KLK15",`A kallikrein gene with a recurrent variant reported in hEDS families; Early evidence from one group and not a clinical test [[Gensemer2025KLK15]].`,"frontier"],
 ["Kyphoscoliotic EDS (kEDS)",`Autosomal recessive type from PLOD1 or FKBP14: congenital hypotonia, early kyphoscoliosis and GJH; about 1 in 100,000 [[VanDijk2024]].`,"types"],
 ["L-HSD (localised HSD)",`Hypermobility at single joints or groups of joints, with a secondary manifestation in the same region [[Carroll2023]].`,"hsd"],
 ["Local anaesthetic failure",`Numbing that fails or wears off early. In a crossover trial, 53% of people with EDS vs 80% of controls were still numb 30 minutes after lidocaine [[Bourne2026RAPM]].`,"surgery"],
 ["Loeys-Dietz syndrome (LDS)",`A dominant TGF-β pathway aortopathy that can mimic vEDS but tolerates vascular surgery well [[Loeys2006,LoeysGR-LDS]].`,"differential"],
 ["Lysyl hydroxylase 1 (PLOD1)",`The enzyme that hydroxylates lysines for cross-links and sugars; its deficiency causes PLOD1-kyphoscoliotic EDS [[Yeowell2000]].`,"collagen"],
 ["Lysyl oxidase (LOX)",`The enzyme that oxidises lysines so collagen and elastin can cross-link [[Lucero2006]].`,"collagen"],
 ["Marfan syndrome",`An FBN1 disorder whose cardinal features are aortic root aneurysm and ectopia lentis; about 1 in 5,000–10,000 [[Loeys2010,Pollock2021]].`,"differential"],
 ["Mast cell activation syndrome (MCAS)",`Episodic mast-cell mediator symptoms confirmed by a tryptase rise; its link with hEDS is Hypothesis to Early evidence [[Valent2019IAAI,Kucharik2020]].`,"gut"],
 ["Mesenteric arteries",`The gut's arteries, the bed most often affected in genetically confirmed vEDS (31.7%) [[Shalhub2019]].`,"vascular"],
 ["Midodrine",`An alpha-agonist labelled for orthostatic hypotension with a boxed warning for supine hypertension; off-label in POTS [[FDA-Midodrine]].`,"meds"],
 ["Mitral valve prolapse",`Billowing of the mitral valve; mild or greater on strict echocardiographic criteria counts as Feature A item 11 [[Fairweather2025]].`,"criteria"],
 ["Molluscoid pseudotumour",`A fleshy, fibrotic nodule up to 3 cm at pressure points such as elbows and knees; highly diagnostic of classical EDS [[Stembridge2023,Ritelli2020C]].`,"skin"],
 ["Multidirectional instability",`Shoulder instability in several directions; common in hEDS/HSD, with altered scapular movement [[Spanhove2022]].`,"joints"],
 ["Musculocontractural EDS (mcEDS)",`Autosomal recessive type from CHST14 or DSE: a dermatan sulfate defect with dislocations and large haematomas [[KoshoGR-mcEDS,Minatogawa2022]].`,"types"],
 ["Myopathic EDS (mEDS)",`Caused by COL12A1 variants, dominant or recessive; congenital hypotonia improves with age [[Zou2014COL12A1,VanDijk2024]].`,"types"],
 ["Neuraxial anaesthesia",`Spinal or epidural anaesthesia; avoided in vEDS where possible [[Wiesmann2014]], while perinatal hEDS/HSD guidance prefers epidural over spinal [[Pezaro2024]].`,"surgery"],
 ["Nociplastic pain",`Pain arising from altered pain processing rather than tissue or nerve damage; one of the mechanisms mixed in hypermobility-related pain [[Castori2026EOP]].`,"pain"],
 ["Obstructive sleep apnoea (OSA)",`Repeated airway collapse in sleep; 32% in EDS vs 6% in controls [[Gaisl2017]].`,"pain"],
 ["Occipitocervical fusion",`Surgery fixing the skull to the upper spine; uncontrolled series only, with a call for a prospective trial [[Henderson2024,Mao2022]].`,"pain"],
 ["Orthostatic intolerance",`Symptoms on standing that ease on lying down; 74.4% in hEDS vs 34.3% in controls [[DeWandele2016]].`,"autonomic"],
 ["Osteogenesis imperfecta (OI)",`A COL1A1/COL1A2 disorder whose hallmark is bone fragility, unlike EDS [[Marini2017]].`,"differential"],
 ["P-HSD (peripheral HSD)",`Hypermobility limited to the hands and/or feet with a secondary manifestation; peripheral JH may be a clue to vEDS [[Carroll2023]].`,"hsd"],
 ["Pacing",`Planning activity to avoid boom-and-bust; recommended by patients and clinicians but untested alone in hEDS/HSD (Hypothesis) [[Bennett2022]].`,"physio"],
 ["Papyraceous scar",`A paper-thin "cigarette paper" scar typical of classical EDS (65.3% of confirmed cases) [[Ritelli2020C]].`,"skin"],
 ["Pelvic organ prolapse",`Descent of pelvic organs; associated with joint hypermobility (pooled OR 2.37) [[VeitRubin2016]].`,"gut"],
 ["Periodontal EDS (pEDS)",`Autosomal dominant type from C1R or C1S: early severe periodontitis and lack of attached gingiva; first tooth loss at a median 21.5 years [[KapfererSeebacher2016,Lepperdinger2022]].`,"types"],
 ["Piezogenic papules",`Fat herniating into the heel skin on standing; common in healthy children (72%), so not specific [[vanStraaten1991]].`,"criteria"],
 ["POTS",`Postural orthostatic tachycardia syndrome: a sustained heart-rate rise of 30 beats/min or more on standing (40 at ages 12–19) without orthostatic hypotension [[Sheldon2015,Vernino2021]].`,"autonomic"],
 ["Precipitate labour",`Birth in 3 hours or less, reported in 28–36% in hEDS/HSD perinatal guidance [[Pezaro2024]].`,"pregnancy"],
 ["Preimplantation genetic diagnosis (PGD)",`Testing embryos for a known familial variant; possible in vEDS and cEDS, not in hEDS [[Byers2025GeneReviews,Hakim2024GeneReviews]].`,"pregnancy"],
 ["PREVEnt trial",`A phase 3 trial of the PKCβ inhibitor enzastaurin in vEDS, suspended on an "indefinite hold by company" [[NCT05463679]].`,"frontier"],
 ["Procollagen",`The precursor of collagen, with propeptides at both ends that keep it soluble until they are cut off [[Shoulders2009,Hulmes2002]].`,"collagen"],
 ["Prolyl 4-hydroxylase",`The ER enzyme that turns proline into 4-hydroxyproline in the Yaa position [[Shoulders2009,Myllyharju2003]].`,"collagen"],
 ["Propranolol (low dose)",`A beta-blocker used off-label in POTS; 20 mg improved symptoms more than 80 mg [[Raj2009Circ]].`,"meds"],
 ["Proprioception",`The sense of joint position and movement; poorer in the lower limbs in benign joint hypermobility syndrome (meta-analysis of 254 people) [[Smith2013BJHS]].`,"joints"],
 ["Pyridinoline ratio",`The urinary deoxypyridinoline to pyridinoline ratio, raised in PLOD1-kEDS [[RohrbachGR-kEDS]].`,"types"],
 ["Pyridostigmine",`An acetylcholinesterase inhibitor labelled for myasthenia gravis, used off-label in POTS [[FDA-Mestinon,Sheldon2015]].`,"meds"],
 ["Revised Ghent nosology",`The 2010 Marfan criteria built on aortic root aneurysm, ectopia lentis, FBN1 testing and a systemic score [[Loeys2010]].`,"differential"],
 ["Skin hyperextensibility",`Skin that stretches beyond 1.5 cm at the forearm and back of the hand, or 3 cm at the neck, elbows and knees [[Ritelli2020C,Stembridge2023]].`,"skin"],
 ["Small-fibre neuropathy",`Damage to thin sensory and autonomic nerve fibres; found on biopsy in 61% of 31 people with hEDS, though findings disagree [[Igharo2023,DiStefano2016]].`,"pain"],
 ["Spondylodysplastic EDS (spEDS)",`Autosomal recessive type from B4GALT7, B3GALT6 or SLC39A13: short stature, hypotonia and bowed limbs [[VanDijk2024]].`,"types"],
 ["Stickler syndrome",`A type II/XI collagenopathy with myopia, retinal detachment, hearing loss and cleft palate [[MortierGR-Stickler]].`,"differential"],
 ["Striae",`Stretch marks; in hEDS Feature A they count only at set sites and without major weight change [[Fairweather2025]].`,"criteria"],
 ["Subcutaneous spheroid",`A hard, pea-sized calcified fat lobule over the ulna or tibia, seen in classical EDS [[Stembridge2023]].`,"skin"],
 ["Subluxation",`A partial dislocation; reported in 29.3% of people with classical EDS [[Ritelli2020C]].`,"joints"],
 ["Systemic score (Ghent)",`A Marfan scoring system with a maximum of 20; 7 or more is significant [[Pollock2021]].`,"differential"],
 ["Tampa Scale for Kinesiophobia",`A questionnaire for fear of movement used in hypermobility trials [[Celletti2013,Spanhove2023]].`,"physio"],
 ["Tenascin-X",`A matrix protein that regulates collagen deposition; its recessive deficiency (TNXB) causes classical-like EDS type 1 [[Mao2002,Schalkwijk2001]].`,"collagen"],
 ["Thumb sign (Steinberg)",`The whole distal phalanx of the thumb sticks out past the clenched fist [[Pollock2021]].`,"criteria"],
 ["Tilt-table test",`Head-up tilt to provoke orthostatic changes; 41.0% of an hEDS subsample had postural tachycardia [[DeWandele2016]].`,"autonomic"],
 ["Tranexamic acid",`An antifibrinolytic that can be considered before surgery in EDS with a bleeding history [[Wiesmann2014]].`,"meds"],
 ["Triple helix",`Three left-handed chains coiled into a right-handed helix, with glycine at every third position [[Shoulders2009]].`,"collagen"],
 ["Tryptase \"20% + 2\" rule",`An event-related tryptase rise of at least 20% plus 2 ng/mL over baseline, the consensus marker of mast-cell activation [[Valent2019IAAI]].`,"gut"],
 ["Type III collagen",`A homotrimer of α1(III) chains found in skin, blood vessels and intestine; its gene is COL3A1 [[Shoulders2009]].`,"collagen"],
 ["Type V collagen",`A minor fibrillar collagen that co-assembles with type I and controls fibril number; too little causes classical EDS [[Wenstrup2004,Wenstrup2006]].`,"collagen"],
 ["ULHAT",`The Upper Limb Hypermobility Assessment Tool: 12 items, cut-point 7 or more [[Nicholson2018]].`,"beighton"],
 ["Variant of uncertain significance (VUS)",`A genetic change whose effect is not yet known; some are later reclassified [[Ghali2019GenetMed,Weerakkody2016]].`,"genes"],
 ["Vascular EDS (vEDS)",`Autosomal dominant COL3A1 type, about 1 in 50,000 to 200,000, with arterial, bowel and uterine rupture [[Byers2017]].`,"vascular"],
 ["vEDS passport",`An individual emergency plan with the diagnosis and management, recommended by the 2017 consensus [[Byers2017]].`,"nursing"],
 ["Villefranche nosology",`The 1997 classification (published 1998) with 6 named types and major and minor criteria [[Beighton1998]].`,"history"],
 ["Wrist sign (Walker-Murdoch)",`Thumb and little finger overlap when wrapped around the opposite wrist [[Pollock2021]].`,"criteria"],
 ["WOSI",`Western Ontario Shoulder Instability Index, 0–2100 with lower better; minimal important difference 252 [[Liaghat2022BJSM]].`,"physio"],
 ["Zebra",`The EDS community symbol, from "think horses, not zebras": the rare answer is sometimes right [[Park2025,Bashe2025]].`,"what"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold Greek letters and hyphens, so 'b1', 'alpha' and 'col3a1' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/α/g,'a').replace(/[-–]/g,'');
  const L0=GL_LIST.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2]).replace('&','&amp;')}</button></div>`).join('')||'<p>%t:glossary.none%</p>';
    $('#glCount').textContent=`%t:glossary.count{n:L.length,total:GL_LIST.length}%`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SR_AREAN={A:'Epidemiology, history & the classification',B:'Genetics, collagen biology & the 13 types',C:'Mechanisms: tissue, joints, skin, pain & fatigue',D:'Diagnosis, criteria, differential & assessment tools',E:'Treatment: physiotherapy, exercise & psychological care',F:'Treatment: medicines, surgery & anaesthesia',G:'Course, comorbidity & outcomes',H:'Living, family, nursing & research toward better care'};
const SR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SR_svc=s=>s.unverified?[]:SR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SR_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','%t:sources.all%']].concat(Object.entries(SR_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l.replace('&','&amp;')}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SR_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`%t:sources.stats{all:nAll,ok:nAll-nChk,svc:svcTxt,chk:nChk}%`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SR_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?'%t:sources.also%'+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SR_link(s)?`<a href="${esc(SR_link(s))}" target="_blank" rel="noopener">${esc(SR_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${esc(SR_AREAN[a]||a)}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">%t:sources.check%</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`%t:sources.count{n:n,total:nAll}%`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
