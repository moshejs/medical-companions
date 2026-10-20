
/* =============== 5.2 flashcards & mnemonics =============== */
const PARTN={1:"Part 1 · The disease",2:"Part 2 · Colchicine",3:"Part 3 · Complications & diagnosis",4:"Part 4 · Treatment & future",5:"Part 5 · History"};
const FC=[
 [1,"Which gene causes FMF, and where is it?","MEFV, on the short arm of chromosome 16 (16p13.3). It has 10 exons and encodes pyrin, a 781-amino-acid protein also called marenostrin."],
 [1,"Which domain of pyrin carries most FMF variants?","The C-terminal B30.2 (PRY/SPRY) domain, encoded by exon 10. Hot spot around residues 680–726: M680I, M694V, M694I, V726A."],
 [1,"What is the classic inheritance of FMF?","Autosomal recessive. Exceptions: dominant-acting variants (M694del, T577 variants), and many clinically typical patients with only one detectable variant."],
 [1,"Which variant genotype is linked to the most severe disease?","M694V homozygosity: earlier onset, more arthritis and erysipelas-like erythema, higher colchicine needs. Whether it also raises amyloidosis risk is disputed: an Armenian study found a link, the 2,838-patient Turkish registry did not, and the largest international study put country of residence ahead of it."],
 [1,"How is E148Q classified today?","As a variant of uncertain significance in Infevers, read in October 2026. Classes are revised over time. Alone it does not support an FMF diagnosis, and it is common in Ashkenazi Jews and in about 29% of East Asian alleles."],
 [1,"What does pyrin 'guard'?","RhoA activity. Active RhoA keeps pyrin switched off; when RhoA is inactivated (for example by certain bacterial toxins), pyrin fires."],
 [1,"What keeps pyrin inactive at rest?","RhoA-activated kinases PKN1 and PKN2 phosphorylate pyrin at Ser208 and Ser242; 14-3-3 proteins bind those phosphates and hold pyrin off."],
 [1,"What three proteins make the pyrin inflammasome?","Pyrin (sensor), ASC (adaptor, forms the 'speck') and caspase-1 (effector)."],
 [1,"What does caspase-1 cut?","Pro-IL-1β and pro-IL-18 into active cytokines, and gasdermin D, whose N-terminal fragment forms membrane pores."],
 [1,"What is pyroptosis?","Inflammatory, lytic cell death through gasdermin D pores, releasing IL-1β and cell contents."],
 [1,"Are FMF variants gain or loss of function?","Gain of function (hypermorphic): they lower the activation threshold. Pyrin-knockout mice are healthy; B30.2 knock-in mice get IL-1-driven inflammation."],
 [1,"What is PAAND?","Pyrin-associated autoinflammation with neutrophilic dermatosis: a dominant pyrin disease from S242R (or E244K) that destroys a 14-3-3 binding site. Distinct from FMF."],
 [1,"How long does a typical FMF attack last?","12 to 72 hours, then it resolves on its own. Livneh criteria: febrile (≥38 °C), recurrent (≥3 of the same type), 12 h to 3 days."],
 [1,"Most common attack features?","Fever and peritonitis (each >90%), then arthritis (~half), myalgia, pleuritis (~a third) and erysipelas-like erythema."],
 [1,"Where does erysipelas-like erythema appear?","Lower leg, ankle or top of the foot: a tender red plaque that mimics cellulitis and clears in 1–3 days."],
 [1,"What is protracted febrile myalgia?","A rare manifestation with severe muscle pain, fever and very high ESR lasting weeks; it responds to corticosteroids."],
 [1,"What fraction of patients start before age 20?","About 80–90%; more than half in the first decade."],
 [1,"What is phenotype II?","AA amyloidosis as the first or only sign of FMF, without prior attacks. Rare, and estimates differ: at most 0.3% of the Turkish registry, about 0.6% in a later review whose authors doubt it is a separate entity."],
 [1,"Best-documented attack trigger?","Emotional stress (case-crossover study: each stressful event raised attack odds ~70% two days later). Exercise and fatty meals did not."],
 [1,"Heterozygote advantage hypothesis for FMF?","Carriers may have resisted plague: Yersinia pestis YopM suppresses wild-type pyrin less well when pyrin carries FMF variants. Evidence of positive selection, not proof."],
 [2,"Where does colchicine come from?","The autumn crocus (Colchicum autumnale)."],
 [2,"Why does colchicine accumulate in neutrophils?","Granulocytes lack functional P-glycoprotein efflux, so the drug is trapped; leukocyte levels peak ~2 days after a dose and can exceed peak plasma >16-fold."],
 [2,"What does colchicine bind?","Free β-tubulin. The tubulin–colchicine complex caps microtubule ends; higher concentrations depolymerize microtubules."],
 [2,"Two proposed ways colchicine quiets pyrin?","(1) Microtubule loss frees GEF-H1 → RhoA on → PKN re-phosphorylates pyrin. (2) Pyrin's microtubule-dependent second activation step cannot complete. Still debated."],
 [2,"Effects on neutrophils beyond pyrin?","Less chemotaxis, altered adhesion (E-selectin redistribution on endothelium, L-selectin shedding), less superoxide, dampened NLRP3 assembly."],
 [2,"Which enzymes and pumps matter for colchicine interactions?","CYP3A4 and P-glycoprotein (ABCB1). Strong inhibitors such as clarithromycin, ketoconazole, ritonavir and cyclosporine raise exposure 2–4-fold."],
 [2,"EULAR 2016 starting doses?","≤0.5 mg/day under 5 years; 0.5–1.0 mg/day at 5–10 years; 1.0–1.5 mg/day over 10 years and adults. Maximum 2 mg/day children, 3 mg/day adults."],
 [2,"Why does colchicine's benefit appear slowly?","It must build up in leukocytes, attacks were weeks apart to begin with, doses are titrated over months, and its biggest benefit (amyloid prevention) accrues over years."],
 [2,"EULAR 2016 definition suggesting colchicine resistance?","≥1 attack per month despite ≥6 months at the maximum tolerated dose in an adherent patient."],
 [2,"How common is colchicine resistance?","Roughly 5–10%, plus 2–5% who cannot tolerate it. Non-adherence inflates apparent resistance."],
 [2,"Most common colchicine side effect?","Gastrointestinal: diarrhea, cramping, nausea, often early in treatment. Long-term use can reduce intestinal lactase."],
 [2,"Serious colchicine toxicities?","Neuromyopathy (with raised CK, especially in renal impairment or with statins), bone marrow suppression, and fatal overdose. Narrow therapeutic index."],
 [2,"Colchicine in pregnancy per EULAR?","Do not stop it during conception, pregnancy or breastfeeding; amniocentesis is not justified because of colchicine."],
 [2,"What did Zemer 1986 show?","Cumulative proteinuria 1.7% at 11 years in adherent patients vs 48.9% at 9 years in non-adherent ones: colchicine prevents amyloidosis."],
 [3,"What protein is AA amyloid made from?","Serum amyloid A (SAA), an acute-phase protein from the liver, cleaved from 122 to 76 amino acids and misfolded into β-sheet fibrils."],
 [3,"First sign of renal amyloidosis?","Proteinuria, progressing to nephrotic syndrome and kidney failure."],
 [3,"How is amyloid confirmed on biopsy?","Congo red staining with apple-green birefringence under polarized light; anti-SAA immunohistochemistry confirms the AA type."],
 [3,"SAA target in AA amyloidosis?","Below 10 mg/L (EULAR 2016). Lachmann 2007: deposits regressed in 60% with median SAA <10; death risk 17.7× higher in the top SAA octile vs <4 mg/L."],
 [3,"Strongest amyloidosis risk factor in the 2007 international study?","Country of residence (OR 3.2), then M694V homozygosity, proband status and disease duration."],
 [3,"Eurofever/PRINTO 2019: confirmatory genotype needs how many clinical items?","At least 1 of 4 (episodes 1–3 days, arthritis, chest pain, abdominal pain). Non-confirmatory genotype needs at least 2."],
 [3,"Eurofever/PRINTO clinical-only criteria?","At least 6 of 9: present Eastern Mediterranean ethnicity, 1–3-day episodes, chest pain, abdominal pain, arthritis; absent aphthous stomatitis, urticarial rash, maculopapular rash, painful lymph nodes."],
 [3,"Tel Hashomer criteria rule?","2 major, or 1 major + 2 minor. Major: recurrent febrile serositis, AA amyloidosis without other cause, colchicine response."],
 [3,"Lab clue that separates an FMF attack from Still's disease?","Ferritin and platelets do not rise in FMF attacks, while CRP rises in every attack. Still's disease has very high ferritin."],
 [3,"Which periodic fever comes like clockwork?","PFAPA: 3–6-day episodes about every 4 weeks, with pharyngitis, aphthae and cervical adenitis; one prednisone dose aborts the attack."],
 [3,"TRAPS versus FMF attack length?","TRAPS episodes often last 7 days or more, with migratory rash over myalgia and periorbital edema; FMF lasts 12–72 hours."],
 [3,"Urine test for MKD (HIDS)?","Urinary mevalonic acid during attacks (sensitivity ~92%)."],
 [3,"Appendectomy in FMF?","In one series 40% had an appendectomy, and 80% of those appendices were not inflamed."],
 [4,"First-line treatment of FMF?","Lifelong daily colchicine, started as soon as a clinical diagnosis is made."],
 [4,"What do guidelines advise during an acute attack?","Continue the usual colchicine dose, use NSAIDs for symptoms, and consider other causes such as appendicitis."],
 [4,"CLUSTER trial headline?","Canakinumab 150 mg every 4 weeks: complete response in 61% of colchicine-resistant FMF vs 6% on placebo; 71% with 300 mg."],
 [4,"Is colchicine stopped when an IL-1 blocker is added?","No. Guidelines continue colchicine alongside biologics because it may still lower amyloid risk."],
 [4,"Anakinra RCT in colchicine-resistant FMF?","1.7 vs 3.5 attacks per month on anakinra vs placebo (25 patients)."],
 [4,"Recommended monitoring (EULAR 2016)?","Every 6 months: attacks, CRP and/or SAA, blood count, liver and kidney tests, CK, and urinalysis for protein (at every visit)."],
 [4,"Live vaccines on canakinumab?","The label advises avoiding live vaccines during treatment and updating vaccinations beforehand."],
 [4,"Life expectancy in treated FMF?","Close to normal in a Turkish cohort; amyloidosis is the leading cause of excess death."],
 [4,"What would a cure have to do?","Correct or silence variant MEFV in myeloid cells (from bone-marrow stem cells), or durably block the pyrin inflammasome. No approved therapy does this today."],
 [4,"Only published human transplant case relevant to FMF?","Milledge 2002 (Blood): a child transplanted for another disease whose FMF resolved; n=1, ~2 years of follow-up."],
 [4,"Why are statins discussed in the cure research?","In cells, statins activate the pyrin inflammasome by depleting geranylgeranyl pyrophosphate (Park 2016). Clinical relevance is unknown."],
 [4,"Which approved drugs inhibit gasdermin D in the lab?","Disulfiram and dimethyl fumarate (both modify GSDMD Cys191). Neither has been tested in FMF."],
 [4,"What does the 2024 guideline say about colchicine during an attack?","Recommendation 11: do not increase the dose. Continue the usual dose and use NSAIDs for symptoms. The patient-information source says plainly that raising the dose during an attack does not help."],
 [4,"Before calling someone colchicine-resistant, what must be confirmed?","Adherence. The consensus definition requires recurrent attacks, on average one or more a month over three months, or persistent laboratory inflammation between attacks, after adherence has been confirmed."],
 [4,"What is AIDAI, and what score means active disease?","A patient or parent diary kept for a month, scoring 12 items 0 or 1 each day. A total of 9 or more means active disease: sensitivity 89%, specificity 92%. The 2024 guideline calls it the only validated activity score in FMF, with problems reflecting activity."],
 [4,"Which IL-1 blocker carries FMF in its US label?","Canakinumab. Anakinra's US indications are rheumatoid arthritis, NOMID and DIRA, and rilonacept's are CAPS, maintenance of remission of DIRA and recurrent pericarditis, so both are off-label for FMF in the US."],
 [4,"How do injection-site reaction rates compare between the IL-1 blockers?","Anakinra 71% in the rheumatoid arthritis trials, rilonacept 48% in the CAPS placebo-controlled phase against 13% on placebo, and canakinumab 10.1% in the TRAPS, HIDS/MKD and FMF study, all mild or moderate."],
 [4,"What is amyloid storm?","Sudden severe proteinuria with rapidly progressive renal failure and markedly raised acute-phase reactants, over days to weeks. Infection triggered 17 of the original 20 cases, and a 2025 review put mortality at 33 to 67%."],
 [4,"What does the 2024 minimum outcome set include?","Clinical disease activity such as attacks per 3 months and physician assessment, patient-reported outcome and experience measures, and biochemical markers such as CRP and SAA."],
 [4,"How often is urinalysis checked, per the 2024 guideline?","At least yearly, and more often if the disease is poorly controlled. The 2016 version was stricter, asking for one at every clinic visit."],
 [4,"Which FMF guideline is the current one?","The EULAR/PReS 2024 update, published in Annals of the Rheumatic Diseases in 2025. It has 4 overarching principles and 12 recommendations, and it supersedes the 18 recommendations of EULAR 2016."],
 [4,"How strong is the randomized evidence for IL-1 blockers in FMF?","Moderate certainty, and uneven. In the Cochrane re-analysis only canakinumab clearly reduced the number of patients with attacks (RR 0.41, 95% CI 0.26 to 0.65). The anakinra and rilonacept intervals crossed 1. All the trials were small."],
 [5,"Who described \'benign paroxysmal peritonitis\' in 1945?","Sheppard Siegal, a New York physician."],
 [5,"Who named it 'familial Mediterranean fever'?","Heller, Sohar and Sherf at Tel Hashomer, Israel, in 1958."],
 [5,"When was colchicine introduced for FMF?","1972, by Goldfinger in an NEJM letter; controlled trials followed in 1974."],
 [5,"When and how was MEFV found?","Mapped to 16p in 1992; cloned in 1997 by two consortia (French: 'marenostrin'; International: 'pyrin')."],
 [5,"What did Xu et al. show in 2014?","Pyrin is an innate immune sensor that assembles an inflammasome when bacterial toxins modify Rho GTPases."]
];
const MN=[
 ["Pyrin guards the Rho-d","Pyrin is a guard of RhoA: RhoA on → pyrin off; RhoA off → pyrin on."],
 ["P-P-14","Two Phosphates (S208, S242) let 14-3-3 hold pyrin."],
 ["Sensor · Adaptor · Effector","Pyrin · ASC · caspase-1: the inflammasome in three words."],
 ["1–3–72","1 site at a time, 3 days at most, 72 hours: the typical FMF attack."],
 ["PAPE","Main attack types: Peritonitis, Arthritis, Pleuritis, Erythema (erysipelas-like)."],
 ["M694V = Very bad","M694V homozygotes have the most severe phenotype."],
 ["Crocus traps in neutrophils","Colchicine (from the autumn crocus) is trapped in neutrophils because they lack the P-gp pump."],
 ["CYP-P Clarithromycin Danger","CYP3A4 + P-gp inhibitors (clarithromycin, cyclosporine, ketoconazole, ritonavir) are the dangerous partners."],
 ["Start ½, 1, 1½","EULAR starting doses: ≤0.5 mg (<5 y), 0.5–1 mg (5–10 y), 1–1.5 mg (>10 y and adults)."],
 ["2 for kids, 3 for adults","Published maximum daily colchicine doses."],
 ["Ten keeps the kidneys","SAA below 10 mg/L is the published target in AA amyloidosis."],
 ["Congo turns green","Congo red + polarized light = apple-green birefringence."],
 ["One for sure, two if unsure","Eurofever/PRINTO: a confirmatory genotype needs ≥1 clinical item; non-confirmatory needs ≥2."],
 ["Continue, cool, check","During an attack: continue colchicine, NSAIDs to cool symptoms, check for other causes."],
 ["Colchicine first, IL-1 next, colchicine always","The treatment ladder: biologics are added, not substituted."]
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

/* =============== 5.3 quiz =============== */
const QZ=[
 [1,"Pyrin is held inactive in resting cells mainly because:",["It is bound to ASC","PKN1/2 phosphorylate it and 14-3-3 proteins bind it","Colchicine is present","It lacks a PYD domain"],1,"RhoA-activated PKN1/PKN2 phosphorylate Ser208/Ser242; 14-3-3 binds and holds pyrin off."],
 [1,"Pyrin senses:",["Bacterial DNA","Potassium efflux","Loss of RhoA activity","Uric acid crystals"],2,"It guards RhoA. Toxins that modify Rho GTPases switch RhoA off and pyrin on. Potassium efflux and crystals are NLRP3 triggers."],
 [1,"FMF variants in the B30.2 domain:",["Abolish pyrin function","Lower the threshold for pyrin activation","Only affect liver cells","Block ASC binding"],1,"They are hypermorphic: patient cells fire in response to stimuli too weak to move normal cells."],
 [1,"The final executioner of pyroptosis is:",["Caspase-3","Gasdermin D pores","Perforin","BAX/BAK"],1,"Caspase-1 cleaves gasdermin D; the N-terminal fragment forms membrane pores."],
 [1,"Most common attack manifestation in large registries:",["Pericarditis","Peritonitis","Scrotal swelling","Erysipelas-like erythema"],1,"Peritonitis and fever each exceed 90% in the Turkish registry."],
 [1,"A typical FMF attack lasts:",["Less than 6 hours","12–72 hours","7–14 days","Continuously"],1,"Livneh criteria: 12 h to 3 days, febrile, recurrent."],
 [1,"Which genotype predicts the most severe disease?",["E148Q heterozygote","V726A homozygote","M694V homozygote","K695R heterozygote"],2,"M694V homozygosity: earlier onset, more arthritis and ELE, higher colchicine needs."],
 [1,"Two carriers of pathogenic MEFV variants have a child. Chance the child has two variants:",["0%","25%","50%","100%"],1,"Autosomal recessive: 1 in 4 biallelic, 1 in 2 carriers, 1 in 4 non-carriers."],
 [1,"An FMF patient with two variants marries a carrier. Chance each child has two variants:",["25%","50%","75%","100%"],1,"Half the children get two variants. Because carriers are common, this 'pseudodominance' can make FMF look dominant in a pedigree."],
 [1,"Erysipelas-like erythema typically appears on the:",["Face","Trunk","Lower leg, ankle or dorsum of the foot","Palms"],2,"A tender red plaque that mimics cellulitis and clears in 1–3 days."],
 [1,"Which trigger had the strongest evidence in a case-crossover study?",["Fatty meals","Strenuous exercise","Emotional stress","Cold drinks"],2,"Each stressful event raised the odds of an attack 2 days later by about 70%; exercise and fatty meals did not."],
 [1,"Protracted febrile myalgia usually responds to:",["Antibiotics","Corticosteroids","Higher colchicine alone","Surgery"],1,"PFM responds promptly to corticosteroids; anakinra helped steroid-refractory children."],
 [2,"Colchicine's direct molecular target is:",["IL-1β","Tubulin","Caspase-1","COX-2"],1,"It binds free tubulin; tubulin–colchicine caps microtubules."],
 [2,"Colchicine concentrates in neutrophils because:",["They have more tubulin than other cells","They lack functional P-glycoprotein efflux","It is actively secreted into them by the liver","It binds hemoglobin"],1,"Granulocytes show no P-gp efflux function, so the drug is trapped; a well-supported hypothesis."],
 [2,"Which drug combination with colchicine is most dangerous?",["Azithromycin","Clarithromycin","Amoxicillin","Paracetamol"],1,"Clarithromycin, a strong CYP3A4/P-gp inhibitor, raised colchicine AUC ~282%; deaths were reported with co-prescription. Azithromycin raises it much less."],
 [2,"EULAR 2016 published starting dose for a 7-year-old:",["≤0.5 mg/day","0.5–1.0 mg/day","1.0–1.5 mg/day","3 mg/day"],1,"Ages 5–10: 0.5–1.0 mg/day. Doses for a person are set by their clinician."],
 [2,"Published maximum daily colchicine dose for adults (EULAR):",["1 mg","2 mg","3 mg","5 mg"],2,"3 mg/day in adults; 2 mg/day in children. Unchanged in the 2024 update."],
 [2,"Why does the full benefit of colchicine take months to show?",["It must be converted to an active metabolite","Attacks were weeks apart, doses are titrated, and amyloid protection accrues over years","It only works after puberty","It needs vitamin D"],1,"Leukocyte levels build within days to weeks, but response can only be judged over months; amyloid prevention takes years."],
 [2,"During pregnancy, EULAR advises that colchicine:",["Be stopped at conception","Be continued; amniocentesis is not justified for colchicine alone","Be replaced by anakinra","Be doubled"],1,"Cohorts and a meta-analysis found no increase in miscarriage or major malformations."],
 [2,"The most common side effect of colchicine is:",["Hair loss","Diarrhea and GI upset","Hypertension","Weight gain"],1,"GI effects are reported in up to 20% at the start of treatment."],
 [3,"AA amyloid is derived from:",["Immunoglobulin light chains","Transthyretin","Serum amyloid A","β2-microglobulin"],2,"SAA, a hepatic acute-phase protein driven by IL-1, IL-6 and TNF."],
 [3,"Under polarized light, Congo red–stained amyloid shows:",["Blue fluorescence","Apple-green birefringence","Black granules","Red birefringence"],1,"Classic exam fact."],
 [3,"Published SAA target in AA amyloidosis:",["< 10 mg/L","< 100 mg/L","< 500 mg/L","Any level if no attacks"],0,"Lachmann 2007: deposits regressed in 60% with median SAA <10 mg/L."],
 [3,"In Touitou 2007, the strongest risk factor for amyloidosis was:",["Female sex","Country of residence","E148Q","Age at onset"],1,"OR 3.2, tracking infant mortality rates, which suggests an environmental factor."],
 [3,"Eurofever/PRINTO 2019: a non-confirmatory genotype needs at least:",["1 clinical item","2 clinical items","4 clinical items","6 of 9 items"],1,"Confirmatory genotype ≥1 of 4; non-confirmatory ≥2 of 4; clinical-only ≥6 of 9."],
 [3,"The Eurofever/PRINTO criteria are intended as:",["A diagnostic test for individual patients","Classification criteria for research","A treatment algorithm","A genetic screening test"],1,"They classify patients for studies; diagnosis remains clinical."],
 [3,"Which lab result argues against Still's disease and for an FMF attack?",["High CRP","Normal ferritin and platelets despite high CRP","Leukocytosis","High ESR"],1,"In FMF attacks CRP rises but ferritin and platelets do not; Still's disease has very high ferritin."],
 [3,"A child has 4-day fevers every 28 days with pharyngitis and neck nodes. Most likely:",["FMF","PFAPA","TRAPS","CAPS"],1,"Clockwork periodicity with pharyngitis, aphthae and adenitis; one prednisone dose aborts the episode."],
 [3,"Fevers lasting 2–3 weeks with migratory rash over painful muscles and periorbital edema suggest:",["FMF","TRAPS","PFAPA","MKD"],1,"TRAPS (TNFRSF1A, dominant): episodes often ≥7 days."],
 [3,"Urinary mevalonic acid during attacks points to:",["MKD/HIDS","CAPS","Behçet","FMF"],0,"MKD: onset in infancy, 3–7-day flares, often triggered by vaccines."],
 [3,"Tel Hashomer major criteria include:",["Family history","Response to continuous colchicine","Erysipelas-like erythema","Exertional leg pain"],1,"Majors: recurrent febrile serositis, AA amyloidosis without other cause, colchicine response. ELE and family history are minor."],
 [4,"During an acute FMF attack, guidelines advise:",["Stop colchicine","Continue the usual colchicine dose and use NSAIDs","Start antibiotics","Double colchicine for a week"],1,"And consider other causes such as appendicitis."],
 [4,"In CLUSTER, complete response with canakinumab in colchicine-resistant FMF was:",["21%","45%","61%","95%"],2,"61% vs 6% on placebo; 71% with dose escalation to 300 mg."],
 [4,"When an IL-1 blocker is added, colchicine is usually:",["Stopped","Continued","Halved permanently","Switched to IV"],1,"Continued, because it may still lower amyloid risk."],
 [4,"Which monitoring test detects early amyloid nephropathy?",["Chest X-ray","Urinalysis for protein","Serum ferritin","ECG"],1,"EULAR 2016 recommends urinalysis at every visit."],
 [4,"Which statement about curing FMF is accurate today?",["Gene editing of MEFV is approved","No approved therapy cures FMF; colchicine and IL-1 blockade control it","HSCT is routine for FMF","IL-1 blockers correct the gene"],1,"Cure routes are research ideas; the only human transplant report is a single case."],
 [4,"In mice, which genetic change abolished FMF-like inflammation from B30.2 knock-in pyrin?",["Removing NLRP3","Removing ASC or the IL-1 receptor","Removing caspase-3","Removing TNF"],1,"The pyrin inflammasome is ASC-dependent and NLRP3-independent; IL-1R loss also rescued it."],
 [4,"Disulfiram and dimethyl fumarate share which lab action relevant to inflammasomes?",["They inhibit gasdermin D","They block IL-1 receptors","They bind tubulin","They activate RhoA"],0,"Both modify gasdermin D Cys191; neither has been tested in FMF."],
 [4,"Guidelines say that during a characteristic FMF attack the colchicine dose should be:",["Doubled","Continued unchanged, with NSAIDs for symptoms","Stopped until the attack passes","Replaced by a steroid"],1,"Recommendation 11 of the 2024 update. Raising the dose during an attack does not help, and other causes such as appendicitis must always be considered."],
 [4,"An AIDAI diary total of 9 or more over one month indicates:",["Colchicine toxicity","Active disease","Amyloidosis","Non-adherence"],1,"At that cut-off, sensitivity was 89% and specificity 92% against blinded expert consensus."],
 [4,"Which of these is NOT how an ordinary FMF peritonitis behaves?",["Guarding and rebound tenderness","Resolution within 24 to 72 hours","Pain shifting to the right lower quadrant","Diffuse abdominal pain"],2,"Guarding and rebound are ordinary in FMF, so they do not separate it from a surgical abdomen. The published discriminator for appendicitis is the shift to the right lower quadrant."],
 [4,"Which IL-1 blocker has FMF in its US label?",["Anakinra","Canakinumab","Rilonacept","All three"],1,"Anakinra and rilonacept are used off-label for FMF in the US."],
 [4,"Before a patient can be called colchicine-resistant, the definition requires:",["A genetic test","Confirmed adherence","A kidney biopsy","Six attacks"],1,"The consensus definition requires attacks or persistent inflammation after adherence has been confirmed, and the 2024 guideline added the words 'in adherent patients' to stress it."],
 [4,"Sudden severe proteinuria with rapidly rising creatinine in FMF amyloidosis, often after an infection, describes:",["Colchicine toxicity","Amyloid storm","Protracted febrile myalgia","An ordinary attack"],1,"In the original series infection triggered 17 of 20, and 16 reached end-stage renal disease or death within a year."],
 [5,"Colchicine for FMF was first reported in:",["1908","1945","1972","1997"],2,"Goldfinger's NEJM letter; controlled trials followed in 1974."],
 [5,"MEFV was cloned in 1997 by:",["One NIH group","Two independent consortia","A Japanese team","Infevers"],1,"The French FMF Consortium (marenostrin) and the International FMF Consortium (pyrin)."]
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

/* =============== 5.4 glossary =============== */
const GL=[
 ["14-3-3 proteins","Scaffold proteins that bind phosphorylated Ser208/Ser242 of pyrin and hold it inactive.","mech"],
 ["AA amyloidosis","Deposition of fibrils made from serum amyloid A in organs, especially the kidney; the main long-term danger of uncontrolled FMF.","amyloid"],
 ["Acute-phase reactants","Blood proteins that rise with inflammation: CRP, SAA, fibrinogen; ESR rises too.","dx"],
 ["Anakinra","Recombinant IL-1 receptor antagonist injected daily; used in colchicine-resistant FMF.","ladder"],
 ["Apple-green birefringence","The color Congo red–stained amyloid shows between crossed polarizers.","amyloid"],
 ["ASC","Adaptor protein that links pyrin's PYD to caspase-1 and polymerizes into a single 'speck'.","mech"],
 ["Autosomal recessive","Inheritance in which disease needs two variant copies, one from each parent.","gene"],
 ["B30.2 (PRY/SPRY) domain","The C-terminal pyrin domain encoded by exon 10, where most FMF variants cluster.","gene"],
 ["Base editing","Gene editing that changes a single DNA letter without cutting both strands; in the clinic for sickle cell disease, untested for MEFV.","cure"],
 ["Behçet disease","Systemic vasculitis with recurrent oral and genital ulcers, uveitis and pathergy; part of the differential.","ddx"],
 ["Canakinumab","Monoclonal antibody against IL-1β given every 4 weeks; tested in the CLUSTER trial.","ladder"],
 ["CAPS","Cryopyrin-associated periodic syndromes from NLRP3 variants: urticarial rash, cold triggers, deafness.","ddx"],
 ["Carrier","A person with one variant copy of a recessive gene; usually healthy.","gene"],
 ["Caspase-1","The protease activated in the inflammasome; cleaves pro-IL-1β, pro-IL-18 and gasdermin D.","mech"],
 ["CLUSTER trial","Phase 3 randomized trial of canakinumab in colchicine-resistant FMF, MKD and TRAPS (2018).","ladder"],
 ["Colchicine","Alkaloid from the autumn crocus that binds tubulin; lifelong first-line FMF treatment.","colin"],
 ["Colchicine resistance","Ongoing attacks or inflammation despite the maximum tolerated dose in an adherent patient.","colmonths"],
 ["Compound heterozygote","Two different variants of the same gene, one on each copy (for example M694V/V726A).","gene"],
 ["Congo red","Dye used to detect amyloid in biopsy tissue.","amyloid"],
 ["CRP","C-reactive protein, an acute-phase protein made in the liver.","dx"],
 ["CYP3A4","Liver and gut enzyme that metabolizes colchicine; its inhibitors raise colchicine levels.","coldose"],
 ["E148Q","Common exon 2 MEFV variant, classed as of uncertain significance in Infevers as of October 2026; low penetrance.","gene"],
 ["Enterohepatic recycling","Drug excreted in bile and reabsorbed from the gut, prolonging its stay in the body.","colin"],
 ["Erysipelas-like erythema","Tender red plaque on the lower leg or foot during FMF attacks.","attack"],
 ["Eurofever/PRINTO criteria","2019 evidence-based classification criteria for FMF and other periodic fevers.","dx"],
 ["Exon 10","The MEFV exon encoding the B30.2 domain; home of M694V, M680I, M694I and V726A.","gene"],
 ["Founder mutation","A variant inherited from a common ancestor and spread in a population.","what"],
 ["Gasdermin D","Protein cut by caspase-1; its N-terminal fragment forms membrane pores that cause pyroptosis.","mech"],
 ["GEF-H1","RhoA activator held on microtubules and released when colchicine disrupts them.","colin"],
 ["Gene dosage effect","More variant copies give stronger effects: two-variant cells respond more than one-variant cells.","gene"],
 ["Heterozygote advantage","The idea that carriers of one variant gained a survival benefit, which would explain why the variants stayed common. For FMF the proposed benefit is resistance to plague. The evidence is suggestive, not settled, and drift in isolated populations is the competing explanation.","what"],
 ["HSCT","Hematopoietic stem cell transplantation; replaces the blood-forming system.","cure"],
 ["IL-1β","Key inflammatory cytokine and endogenous pyrogen released by the inflammasome.","mech"],
 ["IL-18","Inflammasome-processed cytokine of the IL-1 family.","mech"],
 ["Inflammasome","Multiprotein complex that activates caspase-1; pyrin forms one.","mech"],
 ["Infevers","Online registry of variants in autoinflammatory disease genes, with consensus pathogenicity classes.","gene"],
 ["Livneh criteria","1997 Tel Hashomer diagnostic criteria with major, minor and supportive items.","dx"],
 ["M694V","The most frequent and most severe MEFV variant in many populations.","gene"],
 ["Marenostrin","The French consortium's name for pyrin, from mare nostrum.","history"],
 ["MEFV","The FMF gene on chromosome 16p13.3.","gene"],
 ["Microtubule","Hollow polymer of tubulin forming the cell's scaffold; disrupted by colchicine.","colin"],
 ["MKD (HIDS)","Mevalonate kinase deficiency: infant-onset periodic fever; RhoA is functionally off, releasing pyrin.","ddx"],
 ["NLRP3","A different inflammasome sensor responding to many stress signals; mutated in CAPS.","mech"],
 ["NSAIDs","Non-steroidal anti-inflammatory drugs, used for symptoms during attacks.","ladder"],
 ["P-glycoprotein (P-gp, ABCB1)","Efflux pump that pushes colchicine out of cells; low in neutrophils.","colin"],
 ["PAAND","Dominant pyrin disease from S242R/E244K with neutrophilic dermatosis; not FMF.","mech"],
 ["Penetrance","The share of people with a genotype who actually show the disease.","what"],
 ["Peritonitis","Inflammation of the peritoneum; the most common FMF attack.","attack"],
 ["PFAPA","Periodic fever, aphthous stomatitis, pharyngitis, adenitis; clockwork fevers in young children.","ddx"],
 ["Phenotype II","AA amyloidosis as the first sign of FMF without prior attacks.","gene"],
 ["Phenotype III","Two MEFV variants without any disease.","what"],
 ["PKN1/PKN2","RhoA-activated kinases that phosphorylate pyrin to keep it off.","mech"],
 ["Pleuritis","Inflammation of the pleura causing one-sided chest pain on breathing.","attack"],
 ["Prodrome","Warning phase before an attack, felt by about half of patients.","attack"],
 ["Protracted febrile myalgia","Rare weeks-long fever with severe muscle pain; responds to steroids.","attack"],
 ["Proteinuria","Protein in the urine; the first sign of renal amyloidosis.","amyloid"],
 ["Pseudodominance","A recessive disease looking dominant because carriers are common in the population.","gene"],
 ["Punnett square","Grid showing the possible allele combinations of offspring.","gene"],
 ["PYD (pyrin domain)","N-terminal domain of pyrin that binds ASC.","mech"],
 ["Pyrin","The MEFV protein: an innate immune sensor of RhoA inactivation.","mech"],
 ["Pyroptosis","Inflammatory lytic cell death through gasdermin D pores.","mech"],
 ["RhoA","Small GTPase switch; GTP-bound = on. Its inactivation releases pyrin.","mech"],
 ["Rilonacept","IL-1 trap given weekly; tested in a small randomized trial in FMF.","ladder"],
 ["SAA","Serum amyloid A, an acute-phase protein and the precursor of AA amyloid.","amyloid"],
 ["Serosa","Smooth membranes lining body cavities: peritoneum, pleura, pericardium, tunica vaginalis. FMF also inflames the synovium of joints.","attack"],
  ["AIDAI","Autoinflammatory Diseases Activity Index: a one-month patient or parent diary scoring 12 items a day. Nine or more means active disease.","nursing"],
 ["Amyloid storm","A rapid deterioration in AA amyloidosis, usually triggered by infection, with proteinuria and creatinine climbing over days to weeks.","nursing"],
 ["FMF50","A response score: at least 50% improvement in 5 of 6 items with none worsening, judged after 3 to 6 months.","nursing"],
 ["ISSF","International Severity Scoring System for FMF: nine domains, maximum 10, with bands for mild, intermediate and severe.","nursing"],
 ["MASIF","An 18-item scale measuring how closely colchicine is actually taken, developed in children.","nursing"],
 ["Minimum outcome set","The 2024 guideline's list of what every FMF service should record: attack frequency, patient-reported measures, and CRP or SAA.","nursing"],
 ["Teach-back","Asking someone to say back in their own words what they will do, to check understanding rather than agreement.","nursing"],
 ["Adherence","How closely someone takes a medicine as prescribed. Poor adherence is a common reason attacks continue and is measured in studies by prescription refills or questionnaires.","colmonths"],
 ["Amyloid storm","A rapid deterioration in AA amyloidosis, often set off by infection, with creatinine and proteinuria at least doubling and CRP rising more than tenfold within two weeks.","amyloid"],
 ["ASC speck","The single large clump of ASC protein that forms in a cell when an inflammasome assembles. One per cell, visible under a microscope.","mech"],
 ["Birefringence","Splitting of light by an ordered material. Congo red-stained amyloid turns apple-green between crossed polarizers.","amyloid"],
 ["Busulfan","A chemotherapy drug used to clear bone marrow before a stem cell transplant. Its toxicity is the main obstacle to gene-corrected stem cell routes.","cure"],
 ["Chimerism","The proportion of a person\u2019s blood cells that come from donor or gene-corrected stem cells after a transplant.","cure"],
 ["Eprodisate","A drug designed to interfere with amyloid fibril formation. A phase 3 trial did not meet its primary endpoint.","amyloid"],
 ["Myeloablation","Destroying the bone marrow with drugs or radiation to make room for transplanted stem cells.","cure"],
 ["Nephrotic syndrome","Heavy protein loss in the urine with low blood albumin and swelling. A stage of renal amyloidosis.","amyloid"],
 ["Odds ratio (OR)","A measure of how much more likely an outcome is in one group than another. An OR of 3.2 means about three times the odds, not three times the risk.","amyloid"],
 ["Prenylation","Attaching a lipid tail to a protein so it can anchor to a membrane. RhoA needs it to work, which links mevalonate kinase deficiency to pyrin.","mech"],
 ["Presenteeism","Being at work or school but working below normal capacity because of illness.","living"],
 ["SAA1 genotype","A variation in the gene for serum amyloid A. The alpha/alpha form is associated with higher amyloidosis risk.","amyloid"],
 ["Subclinical inflammation","Raised CRP/SAA between attacks without symptoms; drives amyloid risk.","colmonths"],
 ["Tel Hashomer criteria","Classic clinical FMF criteria from the Israeli Tel Hashomer hospital.","dx"],
 ["TRAPS","TNF receptor-associated periodic syndrome: long attacks, migratory rash, periorbital edema.","ddx"],
 ["Tubulin","Protein building block of microtubules; colchicine's binding target.","colin"],
 ["VUS","Variant of uncertain significance: not enough evidence to call it pathogenic or benign.","gene"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 5.5 sources =============== */
const AREAN={A:'Epidemiology, attacks & history',B:'Genetics & diagnosis',C:'Mechanism',D:'Colchicine',E:'Amyloidosis, treatment & living',F:'Research & cure'};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag sea">${AREAN[a]}</span>`).join('')}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} of ${SOURCES.length} sources`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
