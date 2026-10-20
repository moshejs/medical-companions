
/* =============== 4.3 nursing care =============== */
/* the 4AT guide is cited in several step texts */
const NU4AT='[[4ATguide]]';
const NU_DL=[
 {from:0,at:.06,k:'Step 1 · The baseline',t:'Dementia drifts slowly',
  txt:'Over two weeks, the usual level of a person living with dementia barely moves. Knowing that baseline, from people who know the person and from earlier notes, is what lets a sudden change stand out. NICE NG97 lists delirium, depression, sensory impairment and medicines with anticholinergic burden among reversible causes of cognitive impairment to investigate. [[NICE2018NG97]]',
  pt:'Dementia changes slowly. A change over hours or a day points to something else.'},
 {from:.2,at:.235,k:'Step 2 · Acute onset',t:'A change over hours',
  txt:`The CAM algorithm requires acute onset with a fluctuating course and inattention, plus either disorganised thinking or an altered level of consciousness. [[Inouye1990]] On the 4AT, an acute change or fluctuating course scores 4 on its own. ${NU4AT}`,
  hook:'CAM: (1) acute onset and fluctuating course + (2) inattention + either (3) disorganised thinking or (4) altered level of consciousness.'},
 {from:.33,at:.39,k:'Step 3 · Fluctuation',t:'Worse at night, clearer by day',
  txt:'The dip comes and goes. A check made once a day, at the same clear hour, can land on a lucid interval. In a study of 20 hospitalised older adults, nurses and physicians were less likely to recognise delirium superimposed on dementia than delirium alone. [[FickForeman2000]] Across hospital and community studies, delirium on dementia affected 22% to 89% of people with dementia. [[Fick2002]]',
  pt:'Confusion that comes and goes can look fine at the moment someone checks.'},
 {from:.55,at:.6,k:'Step 4 · Screening',t:'What a screen can and cannot do',
  txt:`In a 2021 meta-analysis, the 4AT had pooled sensitivity and specificity of 0.88 each. [[Tieges2021]] Its user guide warns that in severe dementia, items 2 and 3 alone can reach 4 without delirium; then informant history and observation over time carry the distinction. ${NU4AT} Only 9 studies, with 50 participants who had delirium on dementia, have validated delirium tools in people with dementia. [[Morandi2012]]`,
  hook:'4AT: 4 or more suggests delirium; 1 to 3 suggests cognitive impairment; 0 does not definitively exclude either.'},
 {from:.76,at:.88,k:'Step 5 · Afterwards',t:'Recovery, perhaps to a lower level',
  txt:'Delirium superimposed on dementia was linked to faster cognitive and functional decline. [[Fick2002]] In one small study, 5 of 8 patients with it were readmitted within 30 days, against none with delirium alone. [[FickForeman2000]] Multicomponent, mostly non-drug prevention cut new delirium in hospital (RR 0.69), but the effect in people who already have dementia is uncertain (RR 0.90, one study of 50 people). [[Siddiqi2016]]',
  pt:'After delirium clears, the person may not get all the way back. The lower line here is drawn by hand, not measured.'}
];
const NU_CO=[
 {from:0,at:.03,k:'Reading the chart',t:'One scale, five approaches',
  txt:'Each dot is a standardised mean difference reported by a review, with the sign turned so that right always means benefit. Outcomes differ between rows, so the chart shows what each review found, not a head-to-head contest.',
  pt:'Further right means a bigger benefit was found. An empty row means the trials were too few to say.'},
 {from:.08,at:.14,k:'Cognitive stimulation',t:'A small cognitive benefit',
  txt:'The 2023 Cochrane update (37 RCTs, 2,766 people) found a small cognitive benefit (SMD 0.40; MMSE +1.99) and better communication and social interaction (SMD 0.53). [[Woods2023]] In the 2003 trial (n=201) the number needed to treat was 6 for a 4-point ADAS-Cog gain. [[Spector2003]] NICE NG97 recommends offering group CST for mild to moderate dementia. [[NICE2018NG97]]',
  hook:'NG97: offer group cognitive stimulation; do not offer cognitive training for mild to moderate Alzheimer\'s. [[NICE2018NG97]]'},
 {from:.2,at:.26,k:'Reminiscence',t:'It depends on the setting',
  txt:'Cochrane 2018 (22 studies): no important effect on quality of life overall (SMD 0.11), but probably some benefit in care homes (SMD 0.46). MMSE rose 1.87 points at the end of treatment, and group reminiscence brought small gains in communication. [[Woods2018]] NG97 suggests considering group reminiscence. [[NICE2018NG97]]'},
 {from:.32,at:.38,k:'Music',t:'Mood a little, agitation not',
  txt:'Cochrane 2025 (30 studies): moderate-certainty evidence of a slight improvement in depressive symptoms (SMD 0.23 in the benefit direction) and low-certainty evidence of fewer behaviour problems overall. Agitation or aggression likely did not improve (SMD 0.05), and no benefit was shown beyond 4 weeks after treatment. [[vanderSteen2025]]'},
 {from:.44,at:.52,k:'Two opposite philosophies',t:'Reality orientation and validation',
  txt:'Classroom reality orientation (6 RCTs, 125 people) showed benefits for cognition (SMD 0.59) and behaviour (SMD 0.64), and evolved into CST. [[Spector2000,Spector2003]] Validation therapy instead accepts the person\'s reality. Its Cochrane review found 3 small trials (116 people) that could not be pooled, and judged the evidence insufficient. [[Neal2003]] Neither approach has a large modern head-to-head trial. [[Spector2000]]',
  pt:'One approach gently reorients the person; the other meets them where they are. No big modern trial compares the two.',
  hook:'Insufficient evidence is not evidence of no effect: validation therapy is simply untested at scale.'},
 {from:.66,at:.75,k:'How staff talk',t:'Elderspeak and resistance to care',
  txt:'In videotaped nursing home care, elderspeak (infantilising talk) was followed by resistance to care with a probability of 0.55, against 0.26 after normal talk. [[Williams2009]] A review of 12 trials (831 people with dementia) found that communication skills training improved wellbeing, positive interactions and carers\' skills; none of the trials was set in an acute hospital. [[Eggenberger2013]]',
  pt:'Talking to an adult as if to a child was followed by more refusals of care.',
  hook:'Elderspeak: 0.55 versus 0.26 probability of resistance to care.'},
 {from:.84,at:.94,k:'Person-centred care',t:'The CADRES trial',
  txt:'Person-centred care frames dementia care around personhood (Kitwood, 1997; the book was not accessed for this app, so it is reported as a concept). In the CADRES cluster trial (15 Australian care sites, 289 residents), both person-centred care and dementia care mapping lowered agitation on the CMAI at follow-up compared with usual care. Person-centred care sites recorded more falls; mapping sites recorded fewer. [[Chenoweth2009]]',
  pt:'Organising care around the person lowered agitation in a trial. One version also saw more falls, so the trade-offs were measured too.'}
];

/* ---- medicine situations ---- */
const NU_MED={
 crush:{b:'Tablet that must not be crushed',vb:['720 400','400 640'],cap:'Drawn from the US labels for donepezil and memantine XR. Schematic.',
  aria:'Three panels: a pestle stopped over a donepezil 23 mg tablet, an orally disintegrating tablet dissolving on the tongue, and a memantine XR capsule opened and sprinkled onto a spoon of applesauce.',
  steps:[
   {from:0,at:.14,k:'Modified release',t:'A tablet that must not be crushed',txt:'The donepezil label says the 23 mg tablet should not be split, crushed or chewed. [[AriceptLabel]]',hook:'Labels: donepezil 23 mg is not split, crushed or chewed; memantine XR is swallowed whole or opened and sprinkled, never crushed.'},
   {from:.3,at:.46,k:'Another form',t:'An orally disintegrating tablet',txt:'The same label describes an orally disintegrating tablet (5 and 10 mg) that dissolves on the tongue. [[AriceptLabel]]',pt:'Some medicines come in forms that melt in the mouth, which can matter when swallowing is hard.'},
   {from:.55,at:.78,k:'Capsule',t:'Opened and sprinkled, not crushed',txt:'The memantine XR label says the capsules may be swallowed whole or opened and sprinkled on applesauce, but should not be divided, chewed or crushed. [[MemantineXRLabel]]'},
   {from:.84,at:.95,k:'Everything else',t:'Crushing changes the licence',txt:'NHS trust policies state that crushing tablets or opening capsules usually makes the use unlicensed and moves liability to the prescriber. No dementia-specific trial of crushing practice was identified, so this rests on local policy, not trial evidence. [[LPFT2022]]'}],
  checks:['Product checked against its label: donepezil 23 mg is not split, crushed or chewed [[AriceptLabel]]','Memantine XR: whole, or opened onto applesauce; not divided, chewed or crushed [[MemantineXRLabel]]','Other forms exist, such as the donepezil orally disintegrating tablet [[AriceptLabel]]','Crushing anything else: usually unlicensed, so a prescriber decision under trust policies [[LPFT2022]]']},
 patch:{b:'Rivastigmine patch',vb:['720 400','400 600'],cap:'Teaching sequence over 16 days. The exposure bar is schematic, not a dose model.',
  aria:'Back and front body outlines with fourteen patch sites. Each day the old patch is removed before a new one goes on at the next site, and no site is reused within fourteen days; with the error switched on, old patches pile up and the exposure bar climbs.',
  steps:[
   {from:0,at:.03,k:'Day 1',t:'One patch, on clean, dry, hairless, intact skin',txt:'The Exelon patch label describes applying it to clean, dry, hairless, intact skin, preferably the upper or lower back, where the person is less likely to remove it, otherwise the upper arm or chest. [[ExelonLabel]]',pt:'One patch a day, on the back if possible, where it is hard to pick off.'},
   {from:.0625,at:.07,k:'Day 2 onward',t:'Yesterday\'s patch comes off first',txt:'The label describes replacing the patch every 24 hours, wearing only one patch at a time, and removing the previous day\'s patch first. [[ExelonLabel]] After removal, the plasma half-life is about 3 hours. [[FDAExelonPatch2024]]',hook:'One off, then one on: the old patch is removed before the new one is applied.'},
   {from:.3,at:.35,k:'Rotation',t:'A new spot each day, none reused for 14 days',txt:'The label says the same spot is not reused for 14 days and the patch is not cut. The abdomen and thigh give 20 to 30% lower exposure. [[ExelonLabel,FDAExelonPatch2024]] UK and Canadian regulators also listed reusing the same skin area and cutting patches among reported errors. [[MHRA2010,HealthCanada2010]]',pt:'Moving the patch around gives each patch of skin time to recover.'},
   {from:.875,at:.9,k:'Day 15',t:'The first spot is free again',txt:'Fourteen days after it was used, the first spot comes back into the rotation. The patch can cause allergic contact dermatitis; the label says to stop it if the reaction spreads beyond the patch or does not improve within 48 hours of removal. [[FDAExelonPatch2024]] If doses are missed for more than 3 days, the label restarts treatment at the lowest dose. [[FDAExelonPatch2024]]'}],
  err:{k:'Error switched on',t:'Old patches left on',txt:'The label\'s Warnings section reports that patch errors caused serious adverse reactions, some needing hospital care and rarely death; most involved not removing the old patch or wearing several at once. [[ExelonLabel]] In a published fatal case, staff applied six 9.5 mg/24 h patches on two consecutive days. [[Lovborg2012]] Overdose signs listed by regulators include nausea, vomiting, diarrhoea, high blood pressure, hallucinations, slow heart rate and fainting. [[MHRA2010,HealthCanada2010]]',
   hook:'In US and Canadian reporting databases, death reports were disproportionately frequent for rivastigmine (FAERS ROR 3.42). That is a reporting signal, not a rate, and no verified FDA or ISMP count of patch overdoses was found. [[Ali2015]]'},
  checks:['Previous patch found and removed before the new one [[ExelonLabel]]','Only one patch on the skin at any time [[ExelonLabel]]','Site: upper or lower back preferred, otherwise upper arm or chest [[ExelonLabel]]','Spot not used in the last 14 days; patch not cut [[ExelonLabel,FDAExelonPatch2024]]','More than 3 days missed: the label restarts at the lowest dose [[FDAExelonPatch2024]]']},
 covert:{b:'Covert administration',vb:['720 400','400 620'],cap:'The process described in NICE SC1 (care homes, England). Other countries and settings differ.',
  aria:'A capacity question gates a five-step process: capacity assessed, best-interests meeting, reasons documented, administration plan, regular review; then bars show how often drugs were hidden in food in Norwegian nursing homes and how often it was documented.',
  steps:[
   {from:0,at:.12,k:'Capacity first',t:'Not for a person who has capacity',txt:'NICE SC1 (care homes, 2014) states that medicines should not be given covertly to a resident who has capacity. [[NICE2014SC1]]',pt:'Hiding medicine in food is only considered when the person cannot make the decision, and never as a shortcut.'},
   {from:.22,at:.42,k:'The process',t:'A best-interests decision, written down',txt:'SC1 describes a capacity assessment, a best-interests meeting (care home staff, prescriber, pharmacist, family or advocate), documented reasons, an administration plan and regular review (recs 1.15.1 to 1.15.3). [[NICE2014SC1]] Part 4 below sets out the Mental Capacity Act principles behind this.',hook:'NICE SC1: capacity assessment, best-interests meeting with the pharmacist, documented reasons, administration plan, regular review.'},
   {from:.5,at:.62,k:'Professional guidance',t:'Who says what',txt:'The NMC withdrew its Standards for Medicines Management on 28 January 2019, and guidance moved to Royal Pharmaceutical Society documents developed with the RCN and RCM (reported in trade press). NHS trust policies cite the NMC as accepting covert administration only in "exceptional circumstances"; this is secondary and was not checked against current NMC text. [[RCNi2019,LPFT2022]]'},
   {from:.72,at:.92,k:'What an audit found',t:'Often done, rarely written down',txt:'In 250 Norwegian nursing home units, 11% of residents in regular units and 17% in dementia special care units received drugs hidden in food or drink at least once in 7 days. It was documented in only 40% of cases, and antiepileptics, antipsychotics and anxiolytics were over-represented. [[Kirkevold2005]]'}],
  checks:['Capacity for this decision assessed and recorded [[NICE2014SC1]]','Best-interests meeting with prescriber, pharmacist and family or advocate [[NICE2014SC1]]','Reasons and an administration plan documented [[NICE2014SC1]]','If a medicine would be crushed or mixed: trust policies note this usually makes its use unlicensed [[LPFT2022]]','A date for regular review [[NICE2014SC1]]']},
 swallow:{b:'Swallowing difficulty',vb:['720 400','400 480'],cap:'Figures from the studies cited in the note. Bars are drawn to scale within each panel.',
  aria:'Swallowing difficulty prevalence range of 13 to 57 percent, administration error rates of 21.1 percent with dysphagia and 5.9 percent without, and three medicine forms that avoid crushing.',
  steps:[
   {from:0,at:.12,k:'How common',t:'Swallowing difficulty in dementia',txt:'Reported prevalence ranged from 13% to 57%. Dysphagia appeared early in Alzheimer\'s disease but late in frontotemporal dementia. [[Alagiakrishnan2013]]'},
   {from:.28,at:.42,k:'Errors',t:'More administration errors',txt:'In observed hospital medicine rounds, the administration error rate (excluding timing) was 21.1% for patients with dysphagia and 5.9% for those without. [[Kelly2012]]',hook:'Dysphagia: 21.1% versus 5.9% medicine administration errors.'},
   {from:.56,at:.75,k:'Changing the form',t:'Other forms, not crushing',txt:'The labels describe forms that avoid crushing: an orally disintegrating donepezil tablet, a memantine XR capsule that may be opened onto applesauce, and a rivastigmine skin patch. [[AriceptLabel,MemantineXRLabel,ExelonLabel]] Trust policies note that crushing usually makes use unlicensed; no dementia-specific trial of crushing was found. [[LPFT2022]]'},
   {from:.82,at:.95,k:'What is not known',t:'Thin evidence',txt:'The review found limited evidence on texture modification, posture changes and diagnostic tests in dementia. [[Alagiakrishnan2013]]',pt:'Swallowing problems are common in dementia, and the research on how best to help is still thin.'}],
  checks:['Each medicine checked: may it be crushed, opened or dispersed? [[LPFT2022,AriceptLabel,MemantineXRLabel]]','Other forms considered by the prescriber or pharmacist [[AriceptLabel,MemantineXRLabel,ExelonLabel]]','Texture modification and posture: limited evidence [[Alagiakrishnan2013]]']},
 acb:{b:'High anticholinergic burden',vb:['720 400','400 600'],cap:'Cascade diagram from the cited study; bars drawn to scale.',
  aria:'A prescribing cascade loop from a cholinesterase inhibitor to urinary incontinence to a bladder antimuscarinic that opposes the first drug, with bars for how common anticholinergic use, polypharmacy and inappropriate medicines are.',
  steps:[
   {from:0,at:.2,k:'A prescribing cascade',t:'One drug treats another drug\'s side effect',txt:'People with dementia given a cholinesterase inhibitor were more likely to then be prescribed an anticholinergic for urinary incontinence (4.5% vs 3.1%; adjusted HR 1.55). An anticholinergic pharmacologically opposes a cholinesterase inhibitor. [[Gill2005]]',hook:'Cholinesterase inhibitor, then incontinence, then a bladder antimuscarinic that works against the first drug.'},
   {from:.3,at:.4,k:'Cognition',t:'Burden and the brain',txt:'In MRC CFAS, definite anticholinergic use was linked to a 0.33-point greater MMSE decline over 2 years and higher 2-year mortality (OR 1.68). [[Fox2011]] The highest cumulative strong-anticholinergic exposure was associated with an adjusted OR of 1.49 for dementia. [[Coupland2019]] NG97 lists anticholinergic burden among reversible causes to investigate (rec 1.2.6). [[NICE2018NG97]]'},
   {from:.52,at:.66,k:'How common',t:'Many medicines, many risks',txt:'In MRC CFAS (13,004 people aged 65 or over), 47% used a possible anticholinergic and 4% a definite one. [[Fox2011]] Among older people with dementia, pooled prevalence was 62% for polypharmacy and 43% for potentially inappropriate medication (62 studies). [[Zhao2023]]'},
   {from:.8,at:.92,k:'Tools',t:'Counting the burden',txt:'The Anticholinergic Cognitive Burden scale (2008) groups drugs by anticholinergic effect on cognition. [[Boustani2008]] NG97 notes several validated tools, with insufficient evidence to prefer one (rec 1.6.3). [[NICE2018NG97]] Beers 2023 recommends avoiding strongly anticholinergic drugs in dementia and avoiding combinations of two or more. [[AGS2023]]',pt:'Some common medicines for sleep, allergies or the bladder can make thinking worse. Prescribers can count this load with a scale.'}],
  checks:['Medicine list reviewed with a validated burden scale [[NICE2018NG97,Boustani2008]]','New confusion: anticholinergic burden is on NG97\'s list of reversible causes [[NICE2018NG97]]','A new bladder drug after a cholinesterase inhibitor: a known cascade [[Gill2005]]','Any change is the prescriber\'s decision']},
 infusion:{b:'Anti-amyloid infusion day',vb:['720 400','400 460'],cap:'Schedules from the current US labels. MRI timing has changed between label versions, and local protocols may differ.',
  aria:'A 30-week timeline: lecanemab infusions every 2 weeks with MRIs at baseline and months 1, 2, 3 and 6; donanemab infusions every 4 weeks with titrated doses and MRIs before the 2nd, 3rd, 4th and 7th infusions; then the ARIA symptoms observers may see.',
  steps:[
   {from:0,at:.08,k:'Two schedules',t:'Every 2 weeks or every 4',txt:'Lecanemab IV is 10 mg/kg over about one hour every 2 weeks, with an IV or subcutaneous maintenance option after 18 months and a weekly subcutaneous autoinjector option. [[LeqembiLabel]] Since July 2026 the label also allows treatment to start with weekly subcutaneous injections. [[LeqembiLabel2026]] Donanemab is given IV over about 30 minutes every 4 weeks, titrated 350, 700, 1,050 then 1,400 mg. [[KisunlaLabel]]'},
   {from:.18,at:.24,k:'Infusion reactions',t:'Most with the first infusion',txt:'With lecanemab, infusion-related reactions occurred in 26% against 7% on placebo, 75% of them with the first infusion, mostly mild or moderate. [[LeqembiLabel]] With donanemab they occurred in 9% in one study and 16% in another. [[KisunlaLabel]]'},
   {from:.4,at:.47,k:'MRI checkpoints',t:'Scans on a set schedule',txt:'The current US lecanemab label calls for a baseline MRI and MRIs after 1, 2, 3 and 6 months, each within about a week before the next dose, with enhanced vigilance in the first 14 weeks. [[LeqembiLabel2026]] Earlier versions tied MRIs to infusion numbers (before the 5th, 7th and 14th; not re-read), so local protocols may differ. [[LeqembiLabel]] The 2023 appropriate use recommendations and the EU conditions also use the 5th, 7th and 14th doses. [[Cummings2023,EMA2025Leqembi]] Donanemab MRIs come before the 2nd, 3rd, 4th and 7th infusions, with enhanced vigilance for the first 24 weeks. [[KisunlaLabel]]',hook:'Current US labels: lecanemab MRIs follow months on treatment; donanemab MRIs follow infusion numbers.'},
   {from:.62,at:.74,k:'ARIA',t:'What observers may see',txt:'Both labels list ARIA symptoms that observers may notice: headache, confusion, visual changes, dizziness, nausea and gait difficulty, plus seizures in serious cases. ARIA is usually without symptoms and can be fatal. [[LeqembiLabel,KisunlaLabel]]',pt:'Most brain swelling from these drugs causes no symptoms and shows only on a scan. New headache, confusion or unsteadiness are among the signs the labels list.'},
   {from:.84,at:.95,k:'Stroke mimic',t:'ARIA-E can look like a stroke',txt:'The lecanemab label notes that ARIA-E can mimic ischaemic stroke, which matters before thrombolysis. [[LeqembiLabel]] Fatal haemorrhages have followed thrombolysis in antibody-treated patients. [[LeqembiLabel2026,KisunlaLabel2025]] No nursing-specific outcome studies of infusion workflows were identified. [[LeqembiLabel,KisunlaLabel]]',hook:'ARIA-E can mimic stroke: the label flags it before thrombolysis.'}],
  checks:['Which antibody, which dose step, which infusion number [[LeqembiLabel,KisunlaLabel]]','Is an MRI due before this infusion? Schedules differ by drug and label version [[LeqembiLabel,KisunlaLabel]]','Infusion reactions, most often with the first lecanemab infusion [[LeqembiLabel]]','Headache, confusion, visual change, dizziness, nausea or gait change reported or seen [[LeqembiLabel,KisunlaLabel]]','Anticoagulants: the lecanemab appropriate-use recommendations advise against combining them [[Cummings2023]]']}
};

inits.nursing=()=>{
  const W=(s,c)=>s.length*(c==='lbl'?7.3:c==='sm'?6.7:5.8);
  const txt=(x,y,s,cls,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  $$('[data-nu-jump]').forEach(b=>b.addEventListener('click',()=>{const el=$('#'+b.dataset.nuJump);if(el)el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}));

  /* =========== 1a delirium on dementia =========== */
  const dl=$('#nuDlSvg'),dr=$('#nuDlT');let hypo=false,checks=true;
  const nb=d=>{const h=(((d%1)+1)%1)*24;return .5+.5*Math.cos(2*Math.PI*(h-3)/24)};
  const env=d=>d<3?0:d<3.25?ease((d-3)/.25):d<9?1:d<12?1-ease((d-9)/3):0;
  const usual=d=>.8-.003*d;
  const level=d=>usual(d)-.05*ramp(d,9,12)-env(d)*(.04+.46*nb(d)*nb(d)+.012*Math.sin(d*23.7));
  function drawDl(t){
    const N=vb(dl,'720 400','400 440');
    const L=N?{x0:46,x1:388,y0:100,y1:320,tick:338,every:2,axT:354,sLab:384,sY:394,sH:22,yl:[18,210],leg:[ [46,22],[220,22],[46,42],[220,42] ]}
             :{x0:74,x1:700,y0:58,y1:262,tick:280,every:1,axT:298,sLab:326,sY:334,sH:24,yl:[30,160],leg:[ [74,26],[270,26],[400,26],[520,26] ]};
    const X=d=>L.x0+d/14*(L.x1-L.x0),Y=v=>L.y1-(v-.1)/.85*(L.y1-L.y0),dc=t*14;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    for(let k=0;k<=14;k++){const a=Math.max(0,k-2/24),b=Math.min(14,k+6/24);if(b>a)s+=`<rect x="${f1(X(a))}" y="${L.y0}" width="${f1(X(b)-X(a))}" height="${L.y1-L.y0}" style="fill:var(--panel-2)"/>`}
    s+=`<line x1="${L.x0}" y1="${L.y1}" x2="${L.x1}" y2="${L.y1}" class="axis"/><line x1="${L.x0}" y1="${L.y0}" x2="${L.x0}" y2="${L.y1}" class="axis"/>`;
    for(let k=0;k<=14;k++){s+=`<line x1="${f1(X(k))}" y1="${L.y1}" x2="${f1(X(k))}" y2="${L.y1+4}" class="axis"/>`;if(k%L.every===0)s+=txt(X(k),L.tick,k,'t-xs t-mid')}
    s+=txt((L.x0+L.x1)/2,L.axT,'Days','t-xs t-mid');
    s+=`<text transform="translate(${L.yl[0]} ${L.yl[1]}) rotate(-90)" class="t-xs t-mid">${N?'Attention →':'Attention and alertness →'}</text>`;
    // legend: symbol + words, so nothing depends on colour alone
    const lg=L.leg;
    s+=`<line x1="${lg[0][0]}" y1="${lg[0][1]-4}" x2="${lg[0][0]+18}" y2="${lg[0][1]-4}" style="stroke:var(--sage);stroke-width:2;stroke-dasharray:5 3"/>`+txt(lg[0][0]+24,lg[0][1],N?'Usual baseline':'Usual baseline (dementia)','t-xs');
    s+=`<line x1="${lg[1][0]}" y1="${lg[1][1]-4}" x2="${lg[1][0]+18}" y2="${lg[1][1]-4}" style="stroke:var(--rose);stroke-width:2.4"/>`+txt(lg[1][0]+24,lg[1][1],'Observed level','t-xs');
    s+=`<circle cx="${lg[2][0]+9}" cy="${lg[2][1]-4}" r="4" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/>`+txt(lg[2][0]+24,lg[2][1],'10:00 check','t-xs');
    s+=`<rect x="${lg[3][0]}" y="${lg[3][1]-10}" width="18" height="10" style="fill:var(--panel-2);stroke:var(--line)"/>`+txt(lg[3][0]+24,lg[3][1],'Night, 22:00 to 06:00','t-xs');
    // usual baseline, whole fortnight
    let ub='';for(let i=0;i<=56;i++){const d=i/4;ub+=(i?'L':'M')+f1(X(d))+' '+f1(Y(usual(d)))}
    s+=`<path d="${ub}" style="fill:none;stroke:var(--sage);stroke-width:2;stroke-dasharray:6 4"/>`;
    // observed, up to the cursor
    const pts=[];for(let d=0;d<=dc+1e-9;d+=1/48)pts.push([d,level(d)]);pts.push([dc,level(dc)]);
    if(dc>3){let a='';const seg=pts.filter(p=>p[0]>=3);seg.forEach((p,i)=>{a+=(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))});for(let i=seg.length-1;i>=0;i--)a+='L'+f1(X(seg[i][0]))+' '+f1(Y(usual(seg[i][0])));
      s+=`<path d="${a}Z" style="fill:var(--rose-soft);opacity:.85"/>`}
    s+=`<path d="${pts.map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))).join('')}" style="fill:none;stroke:var(--rose);stroke-width:2.4;stroke-linejoin:round"/>`;
    if(dc>3.1)s+=txt(X(3)-6,Y(usual(3))+28,N?'onset →':'delirium begins →','t-xs t-end','fill:var(--rose);opacity:'+f1(ramp(dc,3.1,3.6)));
    if(checks){for(let k=0;k<14;k++){const d=k+10/24;if(d>dc)break;s+=`<circle cx="${f1(X(d))}" cy="${f1(Y(level(d)))}" r="4.5" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/>`}
      if(dc>6.5)s+=txt(X(6.42),Y(usual(6))-12,N?'10:00 checks: clearer hours':'Daily 10:00 checks land on the clearer hours','t-xs t-mid','fill:var(--sky);opacity:'+f1(ramp(dc,6.5,7.2)))}
    // cursor
    const hh=String(Math.floor((((dc%1)+1)%1)*24+1e-6)%24).padStart(2,'0');
    s+=`<line x1="${f1(X(dc))}" y1="${L.y0}" x2="${f1(X(dc))}" y2="${L.y1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/><circle cx="${f1(X(dc))}" cy="${f1(Y(level(dc)))}" r="5" style="fill:var(--rose)"/>`;
    s+=txt(clamp(X(dc),L.x0+75,L.x1-75),L.y0-8,`Day ${Math.floor(dc+1e-6)} · ${hh}:00${nb(dc)>.75?' (night)':''}`,'t-sm t-mid','fill:var(--ink)');
    // what staff see
    s+=txt(L.x0,L.sLab,hypo?(N?'Seen: quiet, drowsy':'What staff see: quiet and drowsy, easy to overlook'):(N?'Seen: restless, calling out':'What staff see: restlessness and calling out, worst at night'),'t-xs');
    s+=`<rect x="${L.x0}" y="${L.sY}" width="${L.x1-L.x0}" height="${L.sH}" rx="5" style="fill:var(--panel-2)"/>`;
    for(let d=0;d<=dc;d+=hypo?1/6:1/12){const e=env(d),n=nb(d);if(e<.3||n<.5)continue;
      if(hypo)s+=`<circle cx="${f1(X(d))}" cy="${L.sY+L.sH/2}" r="2.6" style="fill:var(--muted);opacity:.55"/>`;
      else{const hgt=L.sH*(.35+.55*n*e);s+=`<line x1="${f1(X(d))}" y1="${f1(L.sY+(L.sH-hgt)/2)}" x2="${f1(X(d))}" y2="${f1(L.sY+(L.sH+hgt)/2)}" style="stroke:var(--rose);stroke-width:2;stroke-linecap:round"/>`}}
    dl.innerHTML=s;
    const p=phaseOf(NU_DL,t);setDl(p);let P=NU_DL[p];
    if(hypo&&p>=1)P={...P,txt:P.txt+' In this view the delirium is hypoactive: quiet and drowsy rather than restless. NICE notes that hypoactive delirium is often missed. [[NICE2023CG103]]'};
    $('#nuDlNote').innerHTML=noteHTML(P);
  }
  const stopDl=playWire(dr,$('#nuDlPlay'),drawDl,16000,'Replay','nursing');
  const setDl=stepWire($('#nuDlSteps'),NU_DL,dr,drawDl,stopDl);
  const pr=(id,v)=>$(id).setAttribute('aria-pressed',v);
  $('#nuDlHyper').onclick=()=>{hypo=false;pr('#nuDlHyper',true);pr('#nuDlHypo',false);drawDl(+dr.value)};
  $('#nuDlHypo').onclick=()=>{hypo=true;pr('#nuDlHyper',false);pr('#nuDlHypo',true);drawDl(+dr.value)};
  $('#nuDlChecks').onclick=()=>{checks=!checks;pr('#nuDlChecks',checks);drawDl(+dr.value)};

  /* =========== 1b 4AT calculator =========== */
  const FOUR=[
   {n:'1 · Alertness',o:[ ['Normal',0],['Clearly abnormal',4] ]},
   {n:'2 · AMT4: age, date of birth, place, current year',o:[ ['No mistakes',0],['1 mistake',1],['2 or more, or untestable',2] ]},
   {n:'3 · Attention: months of the year backwards',o:[ ['7 or more correct',0],['Starts, fewer than 7, or refuses',1],['Untestable',2] ]},
   {n:'4 · Acute change or fluctuating course',o:[ ['No',0],['Yes',4] ]}];
  const fsel=[0,0,0,0];let fShown=0,fStop=null;
  $('#nuFour').insertAdjacentHTML('beforeend',FOUR.map((it,i)=>`<div class="nu-item"><span id="nuF${i}">${it.n}</span><div class="nu-opts" role="group" aria-labelledby="nuF${i}">${it.o.map((o,j)=>`<button class="btn" data-f="${i}" data-j="${j}" aria-pressed="${j===0}"><b>${o[1]}</b>${o[0]}</button>`).join('')}</div></div>`).join('')+
    `<div class="ctrls"><button class="btn" id="nuFourEx">Example: severe dementia, no acute change</button><button class="btn" id="nuFourReset">Reset</button></div><p class="stage-cap">Item wording shortened from the 4AT; scoring as in its user guide. ${NU4AT}</p>`);
  const fScore=()=>fsel.reduce((a,j,i)=>a+FOUR[i].o[j][1],0);
  function drawFourG(v){
    const sv=$('#nuFourSvg'),N=vb(sv,'520 150','400 160');
    const x0=N?10:20,x1=N?390:500,cw=(x1-x0)/13,sc=fScore();
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`+txt(x0,30,`4AT total: ${sc} / 12`,'t-big');
    for(let i=0;i<=12;i++){const bg=i===0?'var(--sage-soft)':i<4?'var(--warn-soft)':'var(--rose-soft)',st=i===0?'var(--sage)':i<4?'var(--warn)':'var(--rose)',on=i===sc;
      s+=`<rect x="${f1(x0+i*cw+1)}" y="52" width="${f1(cw-2)}" height="28" rx="5" style="fill:${bg};stroke:${on?st:'none'};stroke-width:2"/>`+txt(x0+i*cw+cw/2,70,i,'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')}
    const mx=x0+v*cw+cw/2;s+=`<path d="M${f1(mx-7)} 38 L${f1(mx+7)} 38 L${f1(mx)} 48 Z" style="fill:var(--ink)"/>`;
    const lg=[ ['var(--sage-soft)','var(--sage)',N?'0: does not exclude either':'0: does not definitively exclude delirium or impairment'],['var(--warn-soft)','var(--warn)',N?'1 to 3: suggests cognitive impairment':'1 to 3: suggests cognitive impairment'],['var(--rose-soft)','var(--rose)',N?'4 to 12: suggests delirium':'4 to 12: suggests delirium'] ];
    lg.forEach((g,i)=>{const y=N?108+i*17:104+i*16;s+=`<rect x="${x0}" y="${y-9}" width="12" height="10" rx="2" style="fill:${g[0]};stroke:${g[1]}"/>`+txt(x0+18,y,g[2],'t-xs')});
    sv.innerHTML=s;
  }
  function fourOut(){
    const sc=fScore();
    let h=`<div class="kicker">4AT total</div><div class="big">${sc} / 12</div><p>${sc===0?'A score of 0 does not definitively exclude delirium or cognitive impairment.':sc<4?'A score of 1 to 3 suggests cognitive impairment.':'A score of 4 or more suggests delirium.'} ${NU4AT}</p>`;
    if(fsel[0]===0&&fsel[3]===0&&FOUR[1].o[fsel[1]][1]+FOUR[2].o[fsel[2]][1]>=4)h+=`<p><b>Severe dementia caveat.</b> Items 2 and 3 alone reached 4. The user guide notes that a person with severe dementia can score this without delirium, which lowers specificity; the distinction then rests on informant history and observation over time. ${NU4AT}</p>`;
    $('#nuFourOut').innerHTML=h;
  }
  function setFour(){
    $$('#nuFour [data-f]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.j===fsel[+b.dataset.f]));
    const to=fScore(),from=fShown;fStop&&fStop();fStop=animate(450,p=>{fShown=lerp(from,to,ease(p));drawFourG(fShown)});fourOut();
  }
  $('#nuFour').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b){fsel[+b.dataset.f]=+b.dataset.j;setFour()}});
  $('#nuFourEx').onclick=()=>{fsel.splice(0,4,0,2,2,0);setFour()};
  $('#nuFourReset').onclick=()=>{fsel.fill(0);setFour()};

  /* =========== 1c PAINAD =========== */
  const PAIN=[
   {n:'Breathing, independent of vocalisation',o:['Normal','Occasional laboured breathing, short hyperventilation','Noisy laboured breathing, long hyperventilation, Cheyne-Stokes']},
   {n:'Negative vocalisation',o:['None','Occasional moan or groan, low-level negative speech','Repeated troubled calling out, loud moaning, crying']},
   {n:'Facial expression',o:['Smiling or inexpressive','Sad, frightened, frown','Facial grimacing']},
   {n:'Body language',o:['Relaxed','Tense, distressed pacing, fidgeting','Rigid, fists clenched, knees pulled up, pushing away, striking out']},
   {n:'Consolability',o:['No need to console','Distracted or reassured by voice or touch','Unable to console, distract or reassure']}];
  const psel=[0,0,0,0,0];let pShown=0,pStop=null,barP=0;
  $('#nuPain').insertAdjacentHTML('beforeend',PAIN.map((it,i)=>`<div class="nu-item"><span id="nuPn${i}">${i+1} · ${it.n}</span><div class="nu-opts" role="group" aria-labelledby="nuPn${i}">${it.o.map((o,j)=>`<button class="btn" data-p="${i}" data-j="${j}" aria-pressed="${j===0}"><b>${j}</b>${o}</button>`).join('')}</div></div>`).join('')+
    `<div class="ctrls"><button class="btn" id="nuPainReset">Reset</button></div><p class="stage-cap">Item descriptors shortened from the published tool. [[Warden2003]]</p>`);
  const pScore=()=>psel.reduce((a,b)=>a+b,0);
  function drawPainG(v){
    const sv=$('#nuPainSvg'),N=vb(sv,'520 330','400 316');
    const L=N?{fx:56,fy:84,fr:40,fl:152,x0:112,x1:390,tot:'PAINAD: ',bandY:96,cav:[116,130],div:164,tt:186,st:202,b1l:228,b1:234,b2l:278,b2:284,bw:360,bx:20}
             :{fx:72,fy:90,fr:46,fl:166,x0:150,x1:500,tot:'PAINAD total: ',bandY:104,cav:[124],div:170,tt:194,st:210,b1l:236,b1:242,b2l:286,b2:292,bw:460,bx:20};
    const sc=pScore(),cw=(L.x1-L.x0)/11,fc=psel[2];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // face: drawn from the facial-expression item, with breath and voice marks
    const r=L.fr,fx=L.fx,fy=L.fy;
    s+=`<circle cx="${fx}" cy="${fy}" r="${r}" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:2"/>`;
    const ex=r*.36,ey=fy-r*.18;
    if(fc<2)[-1,1].forEach(k=>{s+=`<circle cx="${f1(fx+k*ex)}" cy="${f1(ey)}" r="${f1(r*.07)}" style="fill:var(--ink)"/>`;if(fc===1)s+=`<path d="M${f1(fx+k*ex-k*r*.16)} ${f1(ey-r*.2)} L${f1(fx+k*ex+k*r*.12)} ${f1(ey-r*.3)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`});
    else [-1,1].forEach(k=>{const e0=fx+k*ex,q=-k*r*.12;s+=`<path d="M${f1(e0-q)} ${f1(ey-r*.08)} L${f1(e0+q)} ${f1(ey)} L${f1(e0-q)} ${f1(ey+r*.08)}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/><path d="M${f1(e0-k*r*.18)} ${f1(ey-r*.32)} L${f1(e0+k*r*.1)} ${f1(ey-r*.2)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`});
    const my=fy+r*.38;
    s+=fc===0?`<path d="M${f1(fx-r*.32)} ${f1(my)} Q${fx} ${f1(my+r*.14)} ${f1(fx+r*.32)} ${f1(my)}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`
      :fc===1?`<path d="M${f1(fx-r*.3)} ${f1(my+r*.08)} Q${fx} ${f1(my-r*.16)} ${f1(fx+r*.3)} ${f1(my+r*.08)}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round"/>`
      :`<path d="M${f1(fx-r*.34)} ${f1(my)} l${f1(r*.11)} ${f1(-r*.08)} l${f1(r*.11)} ${f1(r*.08)} l${f1(r*.11)} ${f1(-r*.08)} l${f1(r*.11)} ${f1(r*.08)} l${f1(r*.11)} ${f1(-r*.08)} l${f1(r*.11)} ${f1(r*.08)}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>`;
    for(let i=0;i<psel[1];i++)s+=`<path d="M${f1(fx+r*1.08+i*6)} ${f1(my-r*.3-i*3)} q${f1(5+i*2)} ${f1(r*.25)} 0 ${f1(r*.5+i*6)}" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`;
    for(let i=0;i<psel[0];i++)s+=`<path d="M${f1(fx-14)} ${f1(fy+r+8+i*6)} q3.5 -4 7 0 t7 0 t7 0 t7 0" style="fill:none;stroke:var(--sky);stroke-width:1.6"/>`;
    s+=txt(fx,L.fl,`face scores ${fc}`,'t-xs t-mid');
    // total and scale
    s+=txt(L.x0,30,`${L.tot}${sc} / 10`,'t-big');
    for(let i=0;i<=10;i++){const on=i===sc;s+=`<rect x="${f1(L.x0+i*cw+1)}" y="44" width="${f1(cw-2)}" height="26" rx="4" style="fill:${i===0?'var(--panel-2)':i<4?'var(--warn-soft)':i<7?'var(--amber-soft)':'var(--rose-soft)'};stroke:${on?'var(--ink)':'none'};stroke-width:2"/>`+txt(L.x0+i*cw+cw/2,61,i,'t-xs t-mid',on?'fill:var(--ink);font-weight:700':'')}
    const mx=L.x0+v*cw+cw/2;s+=`<path d="M${f1(mx-6)} 36 L${f1(mx+6)} 36 L${f1(mx)} 43 Z" style="fill:var(--ink)"/>`;
    [ [1,3,'mild'],[4,6,'moderate'],[7,10,'severe'] ].forEach(([a,b,l])=>{const xa=L.x0+a*cw+2,xb=L.x0+(b+1)*cw-2;s+=`<path d="M${f1(xa)} 76 v5 H${f1(xb)} v-5" style="fill:none;stroke:var(--muted);stroke-width:1"/>`+txt((xa+xb)/2,L.bandY-4,l,'t-xs t-mid')});
    if(L.cav.length>1){s+=txt(L.x0,L.cav[0],'Bands widely reproduced,','t-xs','fill:var(--warn)')+txt(L.x0,L.cav[1],'not validated for PAINAD','t-xs','fill:var(--warn)')}
    else s+=txt(L.x0,L.cav[0],'Bands widely reproduced; not validated for PAINAD','t-xs','fill:var(--warn)');
    // under-treatment after hip fracture
    s+=`<line x1="20" y1="${L.div}" x2="${N?380:500}" y2="${L.div}" class="grid"/>`;
    s+=txt(20,L.tt,'After hip fracture: opioid received','t-sm','fill:var(--ink)')+txt(20,L.st,N?'relative to cognitively intact patients':'morphine equivalents, relative to cognitively intact patients','t-xs');
    s+=txt(20,L.b1l,'Cognitively intact (n=59)','t-xs')+`<rect x="${L.bx}" y="${L.b1}" width="${f1(L.bw*barP)}" height="18" rx="4" style="fill:var(--sage)"/>`;
    s+=txt(20,L.b2l,'Advanced dementia (n=38)','t-xs')+`<rect x="${L.bx}" y="${L.b2}" width="${f1(L.bw/3*barP)}" height="18" rx="4" style="fill:var(--rose)"/>`;
    if(barP>.6)s+=txt(L.bx+L.bw/3*barP+8,L.b2+14,'one third','t-sm','fill:var(--ink);opacity:'+f1(ramp(barP,.6,1)));
    sv.innerHTML=s;
  }
  function painOut(){
    const sc=pScore();const band=sc===0?'No pain behaviours scored.':sc<4?'In the widely reproduced bands, 1 to 3 is called mild.':sc<7?'In the widely reproduced bands, 4 to 6 is called moderate.':'In the widely reproduced bands, 7 to 10 is called severe.';
    $('#nuPainOut').innerHTML=`<div class="kicker">PAINAD total</div><div class="big">${sc} / 10</div><p>${band}${sc?' Those bands come from secondary reproductions and have not been validated for this tool. [[Warden2003]]':''}</p>`;
  }
  $('#nuPainOut').insertAdjacentHTML('afterend',`<p style="font-size:14.5px">PAINAD was developed with 19 residents with advanced dementia, and scores fell significantly after analgesia. [[Warden2003]] After hip fracture, patients with advanced dementia received one third of the morphine-equivalent analgesia given to cognitively intact patients. Of the intact patients, 44% reported severe pain before surgery and 42% after. [[MorrisonSiu2000]] In 18 Norwegian nursing homes, stepwise pain treatment reduced agitation (CMAI) by 17% over 8 weeks compared with usual care. [[Husebo2011]] NICE NG97 recommends considering a structured observational pain tool when self-report is not possible, and repeating the assessment when behaviour changes and after any pain intervention. [[NICE2018NG97]] A review of reviews covering 28 tools could recommend no single one. [[Lichtner2014]]</p>`);
  function setPain(){
    $$('#nuPain [data-p]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.j===psel[+b.dataset.p]));
    const to=pScore(),from=pShown;pStop&&pStop();pStop=animate(450,p=>{pShown=lerp(from,to,ease(p));drawPainG(pShown)});painOut();
  }
  $('#nuPain').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(b){psel[+b.dataset.p]=+b.dataset.j;setPain()}});
  $('#nuPainReset').onclick=()=>{psel.fill(0);setPain()};

  /* =========== 1d assessment cards =========== */
  $('#nuAssessCards').innerHTML=`
   <div class="card"><span class="ev early">Cutoff disputed</span><h4>Cognitive screening</h4><p>The Mini-Cog (three-word recall plus clock drawing) had 99% sensitivity in its 2000 development sample and took about 3 minutes against 7 for the MMSE; education and language did not affect it. [[Borson2000]] At a cutoff of 26, the MoCA detected 90% of MCI and 100% of mild Alzheimer's, against 18% and 78% for the MMSE, with specificity 87% against 100%. [[Nasreddine2005]] A 2018 meta-analysis found 23/30 gave better accuracy than 26. [[Carson2018]]</p><p>NICE NG97 lists brief tools for non-specialist settings (10-point cognitive screener, 6CIT, 6-item screener, Memory Impairment Screen, Mini-Cog, Test Your Memory) and says dementia should not be ruled out on a normal score alone. [[NICE2018NG97]] On screening people without symptoms, the USPSTF found insufficient evidence, while the Medicare Annual Wellness Visit requires a cognitive assessment. [[Owens2020,Cordell2013]]</p></div>
   <div class="card"><h4>NPI and CMAI</h4><p>The Neuropsychiatric Inventory takes caregiver report on 10 domains, scoring frequency and severity, with screening questions to shorten it. [[Cummings1994]] The Cohen-Mansfield Agitation Inventory was developed with 408 nursing home residents: nurses on each shift rated 29 agitated behaviours on a 7-point frequency scale, and agitation peaked on the day shift. [[CohenMansfield1989]]</p><div class="hook"><b>Exam hook</b>NPI = caregiver interview, 10 domains, frequency × severity. CMAI = staff-rated, 29 behaviours.</div></div>
   <div class="card"><span class="ev early">One RCT</span><h4>The unmet-needs model</h4><p>Agitation is read as communicating a need such as pain, boredom or discomfort. In a trial of the TREA approach, which hypothesises the unmet need and matches an intervention to it (89 intervention residents, 36 placebo), total, physical non-aggressive and verbal agitation fell significantly, and pleasure and interest rose. [[CohenMansfield2012]] NG97 recommends a structured assessment of causes of distress, including pain, delirium and inappropriate care, before any drug or non-drug treatment, with psychosocial and environmental approaches first. [[NICE2018NG97]]</p><div class="pt"><b>In plain words</b>Behaviour that looks difficult is often the only way a person can say "I hurt", "I'm bored" or "this frightens me".</div></div>
   <div class="card"><h4>Function</h4><p>The Katz Index of ADL (1963) and the Lawton-Brody IADL scale (1969) are the original functional measures. Secondary summaries describe Katz as 6 self-care items (bathing, dressing, toileting, transferring, continence, feeding) and Lawton as 8 instrumental domains (telephone, shopping, food preparation, housekeeping, laundry, transport, medicines, finances). Those counts were not checked against the originals. [[Katz1963,Lawton1969]]</p></div>
   <div class="card"><h4>Nutrition and swallowing</h4><p>The MNA short form uses six questions and allows calf circumference in place of BMI; it was validated against the full MNA in 2,032 people. [[Kaiser2009]] In 395 people with Alzheimer's, 33.4% had progressive weight loss and 10.2% severe loss; hospitalisation, acute illness or a move raised the odds of severe loss (OR 6.8). [[Guerin2005]] Swallowing difficulty affected 13% to 57%. [[Alagiakrishnan2013]]</p></div>
   <div class="card"><h4>Falls</h4><p>People with dementia had nearly 8 times the fall incidence of controls (9,118 against 1,023 per 1,000 person-years); Lewy body disorders, orthostatic hypotension, autonomic symptoms and depression predicted falls. [[Allan2009]] A multifactorial intervention after an emergency visit for a fall did not reduce falls in 274 cognitively impaired people (74% against 80% fell). [[Shaw2003]] NICE NG249 (2025) advises against falls risk prediction tools, favouring multifactorial assessment. No falls risk tool validated specifically for dementia was found. [[NICE2025NG249]]</p><div class="hook"><b>Exam hook</b>NG249: multifactorial assessment, not a risk-prediction score.</div></div>
   <div class="card"><h4>Cornell Scale for Depression in Dementia</h4><p>19 items, rated by a clinician from interviews with both the person and nursing staff. In the 1988 paper, interrater kappa was 0.67 and internal consistency 0.84. The commonly quoted cutoffs could not be verified from the source. [[Alexopoulos1988]]</p></div>
   <div class="card"><h4>Other pain tools</h4><p>The Abbey Pain Scale, from Australian residential care, takes about a minute, and mean scores fell by more than half after pain relief. Reproduced forms describe six items scored 0 to 3 (total 0 to 18); those details were not checked against the paper. [[Abbey2004]] PACSLAC, from interviews with caregivers, has four subscales (alpha 0.92) and separated painful events from non-painful distress. [[FuchsLacelle2004]]</p></div>`;

  /* =========== 2 medicines player =========== */
  const ms=$('#nuMedSvg'),mr=$('#nuMedT');let sit='crush',patchErr=false,setMed=()=>{};
  $('#nuMedBtns').innerHTML=Object.keys(NU_MED).map(k=>`<button class="btn" data-sit="${k}" aria-pressed="${k===sit}">${NU_MED[k].b}</button>`).join('');
  // geometry helpers
  const trim=(p,q,hw,hh)=>{const dx=q[0]-p[0],dy=q[1]-p[1];const k=Math.min(hw/Math.max(Math.abs(dx),1e-6),hh/Math.max(Math.abs(dy),1e-6));return[p[0]+dx*k,p[1]+dy*k]};
  function chips(list,x0,y0,Wd,on,cls='t-xs'){let x=x0,y=y0,s='';list.forEach((c,i)=>{const w=W(c,'xs')+20;if(x+w>x0+Wd){x=x0;y+=34}
    const o=on[i];s+=`<g style="opacity:${f1(.25+.75*o)}"><rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="26" rx="13" style="fill:${o>.5?'var(--rose-soft)':'var(--panel)'};stroke:${o>.5?'var(--rose)':'var(--line)'}"/>${txt(x+w/2,y+17,c,cls+' t-mid',o>.5?'fill:var(--ink)':'')}</g>`;x+=w+8});return s}
  function bar(x,y,w,h,col){return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${h}" rx="4" style="fill:${col}"/>`}

  function scCrush(t,N){
    const P=N?[ [200,16],[200,196],[200,376] ]:[ [125,24],[360,24],[595,24] ];
    const w=N?368:222,h=N?168:296,sc=N?.72:1,mid=N?84:146,vy=N?140:252,sy=N?157:272;
    const show=[ramp(t,0,.05),ramp(t,.3,.35),ramp(t,.55,.6)];
    const head=['Donepezil 23 mg tablet','Donepezil ODT, 5 or 10 mg','Memantine XR capsule'];
    const verd=[ ['✕ Not split, crushed or chewed','var(--bad)',ramp(t,.18,.24)],['✓ Dissolves on the tongue','var(--good)',ramp(t,.44,.5)],['✓ May be opened onto applesauce','var(--good)',ramp(t,.76,.82)] ];
    const sub=['US label','US label','Not divided, chewed or crushed'];
    let s='';
    P.forEach(([cx,top],i)=>{const o=show[i];if(o<=0)return;const cy=top+mid;
      s+=`<g style="opacity:${f1(o)}"><rect x="${cx-w/2}" y="${top}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`+txt(cx,top+24,head[i],'t-lbl t-mid');
      if(i===0){const pd=ease(ramp(t,.06,.18)),st=verd[0][2];
        s+=`<ellipse cx="${cx}" cy="${f1(cy+20*sc)}" rx="${f1(34*sc)}" ry="${f1(15*sc)}" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/>`+txt(cx,cy+24*sc,'23 mg','t-xs t-mid','fill:var(--ink)');
        s+=`<g transform="translate(${f1(cx+10*sc)} ${f1(cy-24*sc+22*sc*pd)}) rotate(18)"><rect x="${f1(-9*sc)}" y="${f1(-40*sc)}" width="${f1(18*sc)}" height="${f1(40*sc)}" rx="${f1(8*sc)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/></g>`;
        if(st>0)s+=`<g style="opacity:${f1(st)}"><circle cx="${cx}" cy="${f1(cy)}" r="${f1(52*sc)}" style="fill:none;stroke:var(--bad);stroke-width:4"/><path d="M${f1(cx-36*sc)} ${f1(cy-36*sc)} L${f1(cx+36*sc)} ${f1(cy+36*sc)}" style="stroke:var(--bad);stroke-width:4"/></g>`}
      if(i===1){const dv=ramp(t,.36,.5);
        s+=`<ellipse cx="${cx}" cy="${f1(cy+16*sc)}" rx="${f1(60*sc)}" ry="${f1(30*sc)}" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5"/><path d="M${cx} ${f1(cy-6*sc)} V${f1(cy+40*sc)}" style="stroke:var(--rose);stroke-width:1;opacity:.5"/>`;
        s+=`<circle cx="${cx}" cy="${f1(cy+12*sc)}" r="${f1(14*sc*(1-dv*.75))}" style="fill:var(--panel);stroke:var(--sky);stroke-width:2;opacity:${f1(1-dv*.6)}"/>`;
        for(let k=0;k<9;k++){const a=k/9*Math.PI*2,rr=(8+30*dv)*sc;s+=`<circle cx="${f1(cx+Math.cos(a)*rr)}" cy="${f1(cy+12*sc+Math.sin(a)*rr*.5)}" r="${f1(3*sc*(1-dv*.6))}" style="fill:var(--sky);opacity:${f1(dv*(1-dv)*3)}"/>`}}
      if(i===2){const op=ease(ramp(t,.61,.7)),gp=ramp(t,.68,.82),ccy=cy-30*sc;
        s+=`<ellipse cx="${f1(cx-10*sc)}" cy="${f1(cy+40*sc)}" rx="${f1(36*sc)}" ry="${f1(12*sc)}" style="fill:var(--amber-soft);stroke:var(--muted);stroke-width:1.5"/><path d="M${f1(cx+24*sc)} ${f1(cy+38*sc)} L${f1(cx+70*sc)} ${f1(cy+28*sc)}" style="stroke:var(--muted);stroke-width:${f1(5*sc)};stroke-linecap:round"/>`;
        s+=`<rect x="${f1(cx-32*sc-16*sc*op)}" y="${f1(ccy-9*sc)}" width="${f1(32*sc)}" height="${f1(18*sc)}" rx="${f1(9*sc)}" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.5"/><rect x="${f1(cx+16*sc*op)}" y="${f1(ccy-9*sc)}" width="${f1(32*sc)}" height="${f1(18*sc)}" rx="${f1(9*sc)}" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/>`;
        const R=rng(5);for(let k=0;k<12;k++){const jx=(R()-.5)*44*sc,jy=(R()-.5)*8*sc,gx=lerp(cx,cx-10*sc+jx,gp),gy=lerp(ccy,cy+38*sc+jy,gp);if(op>.5)s+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="${f1(2.6*sc)}" style="fill:var(--amber)"/>`}
        if(!N&&gp>.5)s+=txt(cx-10*sc,cy+70*sc,'applesauce','t-xs t-mid')}
      const v=verd[i];if(v[2]>0)s+=txt(cx,top+vy,v[0],'t-sm t-mid',`fill:${v[1]};font-weight:600;opacity:${f1(v[2])}`)+txt(cx,top+sy,sub[i],'t-xs t-mid',`opacity:${f1(v[2])}`);
      s+='</g>'});
    const bo=ramp(t,.85,.93);
    if(bo>0){const by=N?560:336,bh=N?70:52;s+=`<g style="opacity:${f1(bo)}"><rect x="16" y="${by}" width="${N?368:688}" height="${bh}" rx="10" style="fill:var(--warn-soft)"/>`;
      const lines=N?['Crushing other tablets or opening capsules','usually makes the use unlicensed (NHS trust','policies). No dementia-specific trial found.']:['Crushing other tablets or opening capsules usually makes the use unlicensed (NHS trust policies).','No dementia-specific trial of crushing practice was found; this rests on local policy.'];
      lines.forEach((l,i)=>{s+=txt(30,by+20+i*17,l,'t-xs','fill:var(--ink)')});s+='</g>'}
    return s}

  const SITES=[ [0,-17,64,'UB-L','upper back, left'],[0,17,64,'UB-R','upper back, right'],[0,-17,122,'LB-L','lower back, left'],[0,17,122,'LB-R','lower back, right'],
    [0,-17,88,'UB-L2','upper back, left (2)'],[0,17,88,'UB-R2','upper back, right (2)'],[0,-17,146,'LB-L2','lower back, left (2)'],[0,17,146,'LB-R2','lower back, right (2)'],
    [0,-46,76,'Arm-L','left upper arm'],[0,46,76,'Arm-R','right upper arm'],[1,-17,66,'Ch-R','chest, right'],[1,17,66,'Ch-L','chest, left'],[1,-17,90,'Ch-R2','chest, right (2)'],[1,17,90,'Ch-L2','chest, left (2)'] ];
  function body(back){let g=`<circle cx="0" cy="16" r="15" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><rect x="-6" y="30" width="12" height="8" style="fill:var(--cell)"/>`;
    g+=`<rect x="-54" y="38" width="17" height="112" rx="8" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><rect x="37" y="38" width="17" height="112" rx="8" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    g+=`<rect x="-34" y="34" width="68" height="136" rx="14" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    g+=`<rect x="-30" y="170" width="26" height="80" rx="9" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><rect x="4" y="170" width="26" height="80" rx="9" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    if(back)g+=`<path d="M0 40 V166" style="stroke:var(--cell-line);stroke-width:1.2;stroke-dasharray:3 4"/>`;else g+=`<path d="M-14 104 q14 8 28 0" style="fill:none;stroke:var(--cell-line);stroke-width:1.2"/>`;
    return g}
  function scPatch(t,N){
    const F=N?{s:.82,cx:[105,295],top:36,lab:258}:{s:1,cx:[150,370],top:40,lab:305};
    const S=N?{x:20,day:300,cnt:326,mY:338,mW:360,mL:372,site:396,free:414,e1:438,e2:454}:{x:480,day:72,cnt:102,mY:116,mW:220,mL:150,site:180,free:198,e1:236,e2:252};
    const d=Math.min(t*16,15.999),k=Math.floor(d),f=d-k;
    let s='';
    [1,0].forEach(v=>{const cx=F.cx[v?0:1];s+=`<g transform="translate(${cx} ${F.top}) scale(${F.s})">${body(v===1)}</g>`});
    s+=txt(F.cx[0],F.lab,N?'Back':'Back (preferred)','t-sm t-mid','fill:var(--ink)')+txt(F.cx[1],F.lab,'Front','t-sm t-mid','fill:var(--ink)');
    const pos=i=>{const st=SITES[i%14],cx=F.cx[st[0]?1:0];return[cx+st[1]*F.s,F.top+st[2]*F.s]};
    const ps=13*F.s;
    // resting sites (used in the last 13 days, not today)
    for(let j=Math.max(0,k-13);j<k;j++){if(j%14===k%14)continue;const [x,y]=pos(j);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(ps*.5)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 2;opacity:${f1(.3+.6*(1-(k-j)/14))}"/>`}
    const patch=(x,y,o,col,dx=0,dy=0)=>`<g style="opacity:${f1(o)}"><rect x="${f1(x-ps/2+dx)}" y="${f1(y-ps/2+dy)}" width="${f1(ps)}" height="${f1(ps)}" rx="3" style="fill:${col==='bad'?'var(--bad-soft)':'var(--sky-soft)'};stroke:${col==='bad'?'var(--bad)':'var(--sky)'};stroke-width:2"/></g>`;
    let count=1;
    if(patchErr){for(let j=0;j<k;j++){const [x,y]=pos(j);s+=patch(x,y,1,'bad')}count=k+(f>.3?1:0)||1}
    else if(k>0&&f<.3){const [x,y]=pos(k-1),u=ease(ramp(f,.04,.26));s+=patch(x,y,1-u,'ok',-8*u,-10*u);if(u<.9)s+=txt(x,y-ps-4,'off first','t-xs t-mid','fill:var(--ink);opacity:'+f1(1-u))}
    const ap=ease(ramp(f,k===0?0:.3,k===0?.15:.45));
    {const [x,y]=pos(k);if(ap>0)s+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.4+.6*ap)})">${patch(0,0,ap,'ok')}</g>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(ps*.95)}" style="fill:none;stroke:var(--sky);stroke-width:1.5;opacity:${f1(.5*(1-ap))}"/>`}
    // status panel
    const st=SITES[k%14];
    s+=txt(S.x,S.day,`Day ${k+1}`,'t-big');
    s+=txt(S.x,S.cnt,`Patches on the skin: ${count}`,'t-lbl',count>1?'fill:var(--bad)':'');
    s+=`<rect x="${S.x}" y="${S.mY}" width="${S.mW}" height="16" rx="8" style="fill:var(--panel-2)"/>`+bar(S.x,S.mY,S.mW*Math.min(1,count/8),16,count>1?'var(--bad)':'var(--sky)');
    s+=txt(S.x,S.mL,count>1?'Exposure (schematic): stacked doses':'Exposure (schematic): one patch','t-xs');
    s+=txt(S.x,S.site,`Today: ${st[4]}`,'t-sm','fill:var(--ink)');
    s+=txt(S.x,S.free,k<14?`This spot is free again on day ${k+15}`:`Day ${k-13}'s spot, 14 days on`,'t-xs');
    if(patchErr&&count>1){s+=txt(S.x,S.e1,'Label: errors like this caused','t-xs','fill:var(--bad)')+txt(S.x,S.e2,'hospital care and, rarely, death','t-xs','fill:var(--bad)')}
    // calendar
    for(let j=0;j<16;j++){const r=N?Math.floor(j/8):0,c=N?j%8:j,bw=N?42:40,x=N?20+c*45:30+c*42,y=N?490+r*52:330;
      const cur=j===k,past=j<k;
      s+=`<rect x="${x}" y="${y}" width="${bw}" height="44" rx="6" style="fill:${cur?'var(--sky-soft)':past?'var(--panel-2)':'var(--panel)'};stroke:${cur?'var(--sky)':'var(--line)'};stroke-width:${cur?2:1};${!past&&!cur?'stroke-dasharray:3 3':''}"/>`;
      s+=txt(x+bw/2,y+17,`D${j+1}`,'t-xs t-mid',cur?'fill:var(--ink);font-weight:700':'')+txt(x+bw/2,y+34,SITES[j%14][3],'t-xs t-mid',cur?'fill:var(--ink)':'')}
    if(!N)s+=txt(30,323,'Rotation calendar: site used each day','t-xs');else s+=txt(20,482,'Rotation calendar','t-xs');
    return s}

  function scCovert(t,N){
    let s='';const go=ramp(t,0,.08),yes=ramp(t,.08,.16);
    const G=N?{x:20,y:16,w:360,h:66}:{x:180,y:16,w:360,h:60};
    s+=`<g style="opacity:${f1(go)}"><rect x="${G.x}" y="${G.y}" width="${G.w}" height="${G.h}" rx="10" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.5"/>`+txt(G.x+G.w/2,G.y+24,'Does the person have capacity','t-lbl t-mid')+txt(G.x+G.w/2,G.y+42,'for this decision?','t-lbl t-mid')+'</g>';
    if(N)s+=txt(G.x+G.w/2,G.y+G.h-8,'Yes: not given covertly · No: process below','t-xs t-mid','opacity:'+f1(yes));
    else s+=`<g style="opacity:${f1(yes)}">`+txt(G.x+G.w+12,G.y+26,'Yes: not given','t-sm','fill:var(--ink)')+txt(G.x+G.w+12,G.y+42,'covertly','t-sm','fill:var(--ink)')+txt(G.x-12,G.y+34,'No: the process','t-sm t-end','fill:var(--ink)')+'</g>';
    const B=[ ['Capacity','assessed','for this decision'],['Best-interests','meeting','staff, prescriber,','pharmacist, family'],['Reasons','documented'],['Administration','plan'],['Regular','review'] ];
    const BN=[ ['Capacity assessed','for this decision'],['Best-interests meeting','staff, prescriber, pharmacist, family'],['Reasons documented',''],['Administration plan','how each medicine is given'],['Regular review','is it still needed?'] ];
    B.forEach((b,i)=>{const o=ramp(t,.22+i*.07,.28+i*.07);if(o<=0)return;
      if(N){const y=110+i*70,x=40,w=320,h=56;s+=`<g style="opacity:${f1(o)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:var(--sage);stroke-width:1.5"/>`+txt(200,y+24,`${i+1}. ${BN[i][0]}`,'t-lbl t-mid')+(BN[i][1]?txt(200,y+42,BN[i][1],'t-xs t-mid'):'');
        if(i<4)s+=`<path d="M200 ${y+h} V${y+68}" class="arrow" marker-end="url(#nuMA)"/>`;s+='</g>'}
      else{const x=20+i*138,y=110,w=126,h=104;s+=`<g style="opacity:${f1(o)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:var(--sage);stroke-width:1.5"/>`+txt(x+w/2,y+20,i+1,'t-xs t-mid')+txt(x+w/2,y+40,b[0],'t-lbl t-mid')+txt(x+w/2,y+56,b[1],'t-lbl t-mid');
        if(b[2])s+=txt(x+w/2,y+76,b[2],'t-xs t-mid');if(b[3])s+=txt(x+w/2,y+90,b[3],'t-xs t-mid');
        if(i<4)s+=`<path d="M${x+w} ${y+h/2} H${x+136}" class="arrow" marker-end="url(#nuMA)"/>`;s+='</g>'}});
    if(!N&&ramp(t,.22,.28)>0)s+=`<path d="M${G.x+G.w/2} ${G.y+G.h} V100 H83 V108" class="arrow" marker-end="url(#nuMA)" style="opacity:${f1(ramp(t,.22,.28))}"/>`;
    if(N&&ramp(t,.22,.28)>0)s+=`<path d="M200 ${G.y+G.h} V106" class="arrow" marker-end="url(#nuMA)" style="opacity:${f1(ramp(t,.22,.28))}"/>`;
    const so=ramp(t,.72,.78),g=ease(ramp(t,.74,.9));
    if(so>0){const rows=[ ['Regular units',11],['Dementia special care units',17],['Of those, documented',40] ];
      s+=`<g style="opacity:${f1(so)}">`;
      if(N){s+=txt(20,486,'Hidden drugs, Norwegian nursing homes','t-sm','fill:var(--ink)')+txt(20,500,'residents, at least once in 7 days','t-xs');
        rows.forEach((r,i)=>{const y=520+i*32;s+=txt(20,y,r[0],'t-xs')+`<rect x="20" y="${y+5}" width="360" height="12" rx="6" style="fill:var(--panel-2)"/>`+bar(20,y+5,360*r[1]/100*g,12,i===2?'var(--warn)':'var(--rose)')+txt(26+360*r[1]/100*g,y+15,`${r[1]}%`,'t-xs','fill:var(--ink)')})}
      else{s+=txt(20,256,'Drugs hidden in food or drink, Norwegian nursing homes: residents, at least once in 7 days','t-sm','fill:var(--ink)');
        rows.forEach((r,i)=>{const y=282+i*34;s+=txt(20,y+12,r[0],'t-sm')+`<rect x="230" y="${y}" width="440" height="16" rx="8" style="fill:var(--panel-2)"/>`+bar(230,y,440*r[1]/100*g,16,i===2?'var(--warn)':'var(--rose)')+txt(238+440*r[1]/100*g,y+13,`${r[1]}%`,'t-sm','fill:var(--ink)')})}
      s+='</g>'}
    return `<defs>${marker('nuMA')}</defs>`+s}

  function scSwallow(t,N){
    let s='';const x0=N?20:30,x1=N?380:690;const X=v=>x0+v/100*(x1-x0);
    const a=ramp(t,0,.06),ab=ease(ramp(t,.02,.15));
    s+=`<g style="opacity:${f1(a)}">`+txt(x0,34,N?'Swallowing difficulty: prevalence':'Swallowing difficulty in dementia: reported prevalence','t-sm','fill:var(--ink)');
    s+=`<rect x="${x0}" y="48" width="${x1-x0}" height="18" rx="9" style="fill:var(--panel-2)"/><rect x="${f1(X(13))}" y="48" width="${f1((X(57)-X(13))*ab)}" height="18" rx="6" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5"/>`;
    s+=txt(X(0),84,'0%','t-xs')+txt(X(100),84,'100%','t-xs t-end');
    if(ab>.9)s+=txt(X(13),84,'13%','t-xs t-mid','fill:var(--ink)')+txt(X(57),84,'57%','t-xs t-mid','fill:var(--ink)');
    s+=txt(x0,104,N?'Early in Alzheimer\'s, late in FTD':'Appears early in Alzheimer\'s disease, late in frontotemporal dementia','t-xs','opacity:'+f1(ramp(t,.1,.2)))+'</g>';
    const b=ramp(t,.28,.34),bg=ease(ramp(t,.3,.45));
    if(b>0){s+=`<g style="opacity:${f1(b)}">`+txt(x0,146,N?'Administration errors (excl. timing)':'Medicine administration errors, excluding timing','t-sm','fill:var(--ink)');
      const bx=N?x0:180,bw=(N?360:500),sx=v=>bx+v/25*bw;
      const R=[ ['With dysphagia',21.1,'var(--rose)'],['Without',5.9,'var(--sage)'] ];
      R.forEach((r,i)=>{const y=N?172+i*44:160+i*36;if(N)s+=txt(x0,y-6,r[0],'t-xs');else s+=txt(x0,y+14,r[0],'t-sm');
        s+=bar(bx,y,(sx(r[1])-bx)*bg,18,r[2])+txt(bx+(sx(r[1])-bx)*bg+6,y+14,`${r[1]}%`,'t-sm','fill:var(--ink)')});
      const ay=N?246:232;s+=`<line x1="${bx}" y1="${ay}" x2="${bx+bw}" y2="${ay}" class="axis"/>`;[0,10,20].forEach(v=>{s+=`<line x1="${f1(sx(v))}" y1="${ay}" x2="${f1(sx(v))}" y2="${ay+4}" class="axis"/>`+txt(sx(v),ay+16,`${v}%`,'t-xs t-mid')});
      s+='</g>'}
    const c=ramp(t,.56,.6);
    if(c>0){const cy=N?300:280;s+=`<g style="opacity:${f1(c)}">`+txt(x0,cy,N?'Forms that avoid crushing':'Forms that avoid crushing, per the labels','t-sm','fill:var(--ink)');
      s+=chips(['Orally disintegrating tablet: donepezil 5 or 10 mg','Capsule opened onto applesauce: memantine XR','Skin patch: rivastigmine'],x0,cy+12,x1-x0,[0,1,2].map(i=>ramp(t,.6+i*.05,.64+i*.05)))+'</g>'}
    const d=ramp(t,.82,.88);
    if(d>0){if(N)s+=txt(x0,440,'Texture, posture, diagnostic tests:','t-xs','fill:var(--warn);opacity:'+f1(d))+txt(x0,456,'limited evidence','t-xs','fill:var(--warn);opacity:'+f1(d));
      else s+=txt(x0,384,'Texture modification, posture and diagnostic tests in dementia: limited evidence','t-xs','fill:var(--warn);opacity:'+f1(d))}
    return s}

  function scAcb(t,N){
    let s='';const C=N?[200,170]:[215,190];
    const nodes=N?[ [200,50],[300,170],[200,290],[100,170] ]:[ [215,64],[345,190],[215,316],[85,190] ];
    const lab=[ ['Cholinesterase','inhibitor'],['Urinary','incontinence'],['Bladder','antimuscarinic'],['Effects','opposed'] ];
    const hw=75,hh=22;
    nodes.forEach((p,i)=>{const o=ramp(t,.02+i*.06,.08+i*.06);if(o<=0)return;
      s+=`<g style="opacity:${f1(o)}"><rect x="${p[0]-hw}" y="${p[1]-hh}" width="${hw*2}" height="${hh*2}" rx="10" style="fill:${i===2?'var(--rose-soft)':'var(--panel)'};stroke:${i===2?'var(--rose)':'var(--sage)'};stroke-width:1.5"/>`+txt(p[0],p[1]-3,lab[i][0],'t-lbl t-mid')+txt(p[0],p[1]+13,lab[i][1],'t-lbl t-mid')+'</g>';
      if(i===2)s+=txt(p[0],p[1]+hh+14,'an anticholinergic','t-xs t-mid','opacity:'+f1(o))});
    const segs=nodes.map((p,i)=>{const q=nodes[(i+1)%4];return[trim(p,q,hw+4,hh+4),trim(q,p,hw+8,hh+8)]});
    segs.forEach(([a,b],i)=>{const o=ramp(t,.06+i*.06,.12+i*.06);if(o>0)s+=`<path d="M${f1(a[0])} ${f1(a[1])} L${f1(b[0])} ${f1(b[1])}" class="arrow" marker-end="url(#nuMB)" style="opacity:${f1(o)}"/>`});
    if(t>.28){const u=(t*3)%1,si=Math.floor(u*4),lu=u*4-si,[a,b]=segs[si];s+=`<circle cx="${f1(lerp(a[0],b[0],lu))}" cy="${f1(lerp(a[1],b[1],lu))}" r="5" style="fill:var(--rose)"/>`}
    const go=ramp(t,.22,.28);
    if(go>0){if(N)s+=txt(200,350,'4.5% vs 3.1%, adjusted HR 1.55','t-xs t-mid','fill:var(--ink);opacity:'+f1(go));
      else s+=txt(C[0],C[1]-2,'4.5% vs 3.1%','t-lbl t-mid','opacity:'+f1(go))+txt(C[0],C[1]+14,'adjusted HR 1.55','t-xs t-mid','opacity:'+f1(go))}
    // stats
    const R=N?{x:20,bx:150,bw:230,h1:384,r1:[394,414],h2:452,r2:[462,482],ln:[518,534,552],tl:586}:{x:450,bx:450,bw:240,h1:50,r1:[72,112],h2:168,r2:[190,230],ln:[300,316,336],tl:384};
    const sg=ease(ramp(t,.52,.66)),so=ramp(t,.5,.54);
    const row=(y,l,v,col)=>N?txt(R.x,y+11,l,'t-xs')+`<rect x="${R.bx}" y="${y}" width="${R.bw}" height="14" rx="7" style="fill:var(--panel-2)"/>`+bar(R.bx,y,R.bw*v/100*sg,14,col)+txt(R.bx+R.bw*v/100*sg+6,y+11,`${v}%`,'t-xs','fill:var(--ink)')
      :txt(R.x,y,l,'t-xs')+`<rect x="${R.bx}" y="${y+6}" width="${R.bw}" height="14" rx="7" style="fill:var(--panel-2)"/>`+bar(R.bx,y+6,R.bw*v/100*sg,14,col)+txt(R.bx+R.bw*v/100*sg+6,y+17,`${v}%`,'t-xs','fill:var(--ink)');
    if(so>0){s+=`<g style="opacity:${f1(so)}">`+txt(R.x,R.h1,N?'MRC CFAS, age 65+':'MRC CFAS, people aged 65 and over','t-sm','fill:var(--ink)')+row(R.r1[0],N?'Possible anticholin.':'Possible anticholinergic',47,'var(--warn)')+row(R.r1[1],N?'Definite':'Definite anticholinergic',4,'var(--rose)');
      s+=txt(R.x,R.h2,N?'Older people with dementia':'Older people with dementia','t-sm','fill:var(--ink)')+row(R.r2[0],'Polypharmacy',62,'var(--warn)')+row(R.r2[1],N?'Inappropriate meds':'Potentially inappropriate',43,'var(--rose)')+'</g>'}
    const lo=ramp(t,.3,.36);
    if(lo>0){const L2=N?['Definite use: 0.33 more MMSE points lost','in 2 years; 2-year mortality OR 1.68','Highest exposure: dementia OR 1.49']:['Definite use: 0.33 more MMSE points lost','over 2 years; 2-year mortality OR 1.68','Highest strong exposure: dementia OR 1.49'];
      s+=`<g style="opacity:${f1(lo)}">`+(N?'':txt(R.x,R.ln[0]-22,'Linked outcomes','t-sm','fill:var(--ink)'))+L2.map((l,i)=>txt(R.x,R.ln[i],l,'t-xs')).join('')+'</g>'}
    const to=ramp(t,.8,.86);
    if(to>0)s+=txt(20,R.tl,N?'ACB scale: drugs grouped by effect':'ACB scale: drugs grouped by anticholinergic effect','t-xs','fill:var(--sky);opacity:'+f1(to));
    return `<defs>${marker('nuMB')}</defs>`+s}

  function scInf(t,N){
    const x0=N?30:120,x1=N?385:700,wx=w=>x0+w/30*(x1-x0),cw=t*30;
    const R=N?{l1:40,m1:62,i1:86,l2:136,m2:158,i2:182,ti:202,ax:224,axl:238,axt:254,leg:270,ch:286,chY:296,ft:[392,408,428,444]}
             :{l1:74,m1:56,i1:84,l2:174,m2:156,i2:184,ti:206,ax:236,axl:250,axt:266,leg:266,ch:298,chY:308,ft:[364,382]};
    let s='';
    if(N){s+=txt(x0,R.l1,'Lecanemab IV · every 2 weeks','t-sm','fill:var(--ink)')+txt(x0,R.l2,'Donanemab IV · every 4 weeks','t-sm','fill:var(--ink)')}
    else{s+=txt(10,R.l1,'Lecanemab IV','t-lbl')+txt(10,R.l1+16,'every 2 weeks','t-xs')+txt(10,R.l2,'Donanemab IV','t-lbl')+txt(10,R.l2+16,'every 4 weeks','t-xs')+txt(10,R.ti,'dose, mg','t-xs')}
    [R.i1,R.i2].forEach(y=>{s+=`<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" class="grid"/>`});
    const inf=(w,y)=>{const done=w<=cw+1e-6,dd=cw-w;let g=`<circle cx="${f1(wx(w))}" cy="${y}" r="6" style="fill:${done?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:2"/>`;
      if(dd>=0&&dd<.7)g+=`<circle cx="${f1(wx(w))}" cy="${y}" r="${f1(6+10*dd/.7)}" style="fill:none;stroke:var(--sky);stroke-width:1.5;opacity:${f1(1-dd/.7)}"/>`;return g};
    const mri=(w,y)=>{const done=w<=cw+1e-6;return `<rect x="${f1(wx(w)-5)}" y="${y-5}" width="10" height="10" rx="2" style="fill:${done?'var(--violet)':'var(--panel)'};stroke:var(--violet);stroke-width:2"/>`};
    for(let w=0;w<=30;w+=2)s+=inf(w,R.i1);
    [0,4.35,8.7,13.05,26.1].forEach((w,i)=>{s+=mri(Math.max(0,w-(i?0:0)),R.m1)});
    for(let w=0;w<=28;w+=4)s+=inf(w,R.i2);
    [4,8,12,24].forEach(w=>{s+=mri(w-.4,R.m2)});
    ['350','700','1050','1400 mg'].forEach((d,i)=>{s+=txt(wx(i*4),R.ti,d,'t-xs t-mid')});
    s+=`<line x1="${x0}" y1="${R.ax}" x2="${x1}" y2="${R.ax}" class="axis"/>`;
    for(let m=0;m<=6;m++){const x=wx(m*4.35);s+=`<line x1="${f1(x)}" y1="${R.ax}" x2="${f1(x)}" y2="${R.ax+4}" class="axis"/>`+txt(x,R.axl,m,'t-xs t-mid')}
    s+=txt((x0+x1)/2-(N?0:40),R.axt,'Months from first infusion','t-xs t-mid');
    const lx=N?x0:540;s+=`<circle cx="${lx+5}" cy="${R.leg-4}" r="5" style="fill:var(--sky)"/>`+txt(lx+14,R.leg,'infusion','t-xs')+`<rect x="${lx+80}" y="${R.leg-9}" width="10" height="10" rx="2" style="fill:var(--violet)"/>`+txt(lx+96,R.leg,'MRI','t-xs');
    // cursor and readout
    s+=`<line x1="${f1(wx(cw))}" y1="${N?R.m1-12:R.m1-14}" x2="${f1(wx(cw))}" y2="${R.ax}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    s+=txt(x1,N?22:30,`Week ${Math.floor(cw+1e-6)}`,'t-sm t-end','fill:var(--ink)');
    // ARIA chips
    const co=ramp(t,.6,.66);
    if(co>0){s+=`<g style="opacity:${f1(co)}">`+txt(N?x0:10,R.ch,N?'What observers may see with ARIA':'What observers may see with ARIA (both labels)','t-sm','fill:var(--ink)');
      const list=['Headache','Confusion','Visual changes','Dizziness','Nausea','Gait difficulty','Seizures (serious cases)'];
      s+=chips(list,N?x0-10:10,R.chY,N?370:700,list.map((_,i)=>ramp(t,.64+i*.02,.67+i*.02)))+'</g>'}
    const fo=ramp(t,.84,.9);
    if(fo>0){const F=N?['ARIA is usually without symptoms;','ARIA-E can mimic a stroke.','MRI times follow each current US label;','local protocols may differ.']:['ARIA is usually without symptoms, and ARIA-E can mimic a stroke (relevant before thrombolysis).','MRI times follow each current US label; local protocols may differ.'];
      F.forEach((l,i)=>{s+=txt(N?x0-10:10,R.ft[i],l,'t-xs',(i<(N?2:1)?'fill:var(--bad);':'')+'opacity:'+f1(fo))})}
    return s}

  const SCN={crush:scCrush,patch:scPatch,covert:scCovert,swallow:scSwallow,acb:scAcb,infusion:scInf};
  function drawMed(t){
    const M=NU_MED[sit],N=vb(ms,M.vb[0],M.vb[1]);
    ms.innerHTML=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`+SCN[sit](t,N);
    const p=phaseOf(M.steps,t);setMed(p);
    let P=M.steps[p];if(sit==='patch'&&patchErr&&t>=.0625)P=M.err;
    $('#nuMedNote').innerHTML=noteHTML(P)+`<div class="kicker">Checks the sources describe</div><ul class="nu-checks">${M.checks.map(c=>`<li>${c}</li>`).join('')}</ul>`;
  }
  const stopMed=playWire(mr,$('#nuMedPlay'),drawMed,15000,'Replay','nursing');
  function useSit(k){
    sit=k;stopMed();const M=NU_MED[k];
    $$('#nuMedBtns [data-sit]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sit===k));
    const old=$('#nuMedSteps'),nw=old.cloneNode(false);old.replaceWith(nw);setMed=stepWire(nw,M.steps,mr,drawMed,stopMed);
    $('#nuPatchErrRow').hidden=k!=='patch';ms.setAttribute('aria-label',M.aria);$('#nuMedCap').textContent=M.cap;
    mr.value=M.steps[0].at;drawMed(+mr.value);
  }
  $('#nuMedBtns').addEventListener('click',e=>{const b=e.target.closest('[data-sit]');if(b)useSit(b.dataset.sit)});
  $('#nuPatchErr').onclick=()=>{patchErr=!patchErr;pr('#nuPatchErr',patchErr);drawMed(+mr.value)};

  /* =========== 2b antipsychotic bars =========== */
  let apP=0;
  const AP=[ {l:'Deaths, atypical antipsychotic vs placebo',a:['Antipsychotic',3.5,'var(--rose)','3.5%'],b:['Placebo',2.3,'var(--sage)','2.3%']},
    {l:'Alive at 36 months, DART-AD withdrawal trial',a:['Continued',30,'var(--rose)','30%'],b:['Switched to placebo',59,'var(--sage)','59%']},
    {l:'Neuroleptic use after person-centred training',a:['Usual care',42.1,'var(--rose)','42.1%'],b:['Training',23,'var(--sage)','23.0%']},
    {l:'US long-stay nursing home antipsychotic use',a:['2011',23.9,'var(--rose)','23.9%'],b:['Q2 2019',14.3,'var(--sage)','14.3%']} ];
  function drawAp(){
    const sv=$('#nuApSvg'),N=vb(sv,'720 340','400 340');
    const bx=N?122:200,bw=N?236:440,lx=N?10:20,sx=v=>v/70*bw;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    AP.forEach((r,i)=>{const y=26+i*76;s+=txt(lx,y,r.l,'t-lbl');
      [r.a,r.b].forEach((q,j)=>{const yy=y+12+j*22;s+=txt(N?lx:bx-10,yy+12,q[0],N?'t-xs':'t-sm t-end')+bar(bx,yy,sx(q[1])*apP,16,q[2])+txt(bx+sx(q[1])*apP+6,yy+12,q[3],'t-xs','fill:var(--ink)')})});
    s+=txt(lx,330,N?'One 0 to 70% scale; read each pair on its own.':'Bars share one 0 to 70% scale. Different studies and denominators: read each pair on its own.','t-xs');
    sv.innerHTML=s;
  }
  const growAp=()=>animate(1200,p=>{apP=ease(p);drawAp()});
  $('#nuApReplay').onclick=()=>{apP=0;growAp()};
  $('#nuApCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>The death risk</h4><p>A meta-analysis of 15 trials found atypical antipsychotics in dementia increased deaths (3.5% against 2.3%; OR 1.54). [[Schneider2005]] In the DART-AD withdrawal trial, survival on continued treatment against placebo was 46% against 71% at 24 months and 30% against 59% at 36 months. [[Ballard2009]]</p></div>
   <div class="card"><h4>What NICE NG97 allows</h4><p>Antipsychotics only for people at risk of harming themselves or others, or in severe distress from agitation, hallucinations or delusions; then the lowest dose for the shortest time, reassessed at least every 6 weeks (recs 1.7.3 to 1.7.7). [[NICE2018NG97]]</p><div class="hook"><b>Exam hook</b>NG97: antipsychotic reassessment at least every 6 weeks.</div></div>
   <div class="card"><span class="ev est">Cluster RCT</span><h4>Training, not just stopping</h4><p>In 12 UK nursing homes, staff training in person-centred care cut neuroleptic use to 23.0% against 42.1% (a 19.1-point difference) with no increase in agitation. [[Fossey2006]]</p></div>
   <div class="card"><span class="tag warn">Secondary sources</span><h4>UK: the Banerjee report</h4><p>The 2009 report is widely cited as estimating 180,000 people with dementia on antipsychotics and up to 1,800 excess deaths a year, and as setting a two-thirds reduction target. The 2012 national audit is reported to show a 52% fall from 2008 to 2011. An independent local study found 15.3% use against 10.5% in the audit, where only 48.9% of practices took part. The primary reports were not accessed. [[Banerjee2009,SciDaily2012]]</p></div>
   <div class="card"><h4>US: the National Partnership</h4><p>CMS launched the National Partnership to Improve Dementia Care in Nursing Homes in 2012. Long-stay antipsychotic use fell 40.1%, from 23.9% (2011) to 14.3% (Q2 2019). [[Crystal2020]] From 2015, two antipsychotic quality measures that exclude schizophrenia, Huntington's disease and Tourette syndrome entered Five-Star ratings. [[CMS2015]]</p></div>
   <div class="card"><span class="ev early">Contested</span><h4>The critique</h4><p>Use was already falling before the Partnership, and the decline slowed afterward, while mood-stabiliser use rose and accelerated, suggesting substitution. [[Maust2018]] The HHS OIG found 5% of long-stay enrollees with antipsychotic claims (12,091 people) were not recorded as receiving them in the MDS, and nearly one third of residents recorded with schizophrenia had no Medicare claims for it. [[OIG2021]]</p><div class="pt"><b>In plain words</b>The numbers fell, but some of the fall may be other sedating drugs, or labels, taking their place.</div></div>`;

  /* =========== 3 communication comparison =========== */
  const co=$('#nuCoSvg'),cr=$('#nuCoT');
  const ROWS=[ {n:'Cognitive stimulation',i:'Cochrane 2023 · 37 RCTs',a:['cognition',.4],b:['communication, social',.53]},
    {n:'Reminiscence',i:'Cochrane 2018 · 22 studies',a:['quality of life, overall',.11],b:['care homes',.46]},
    {n:'Music',i:'Cochrane 2025 · 30 studies',a:['depression',.23],b:['agitation',.05]},
    {n:'Reality orientation',i:'2000 review · 6 RCTs',a:['cognition',.59],b:['behaviour',.64]},
    {n:'Validation therapy',i:'Cochrane 2003 · 3 trials',none:true} ];
  function drawCo(t){
    const N=vb(co,'720 420','400 500');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const Wd=N?400:720;
    if(t<.66){const fo=1-ramp(t,.6,.66);
      const A=N?{x0:30,x1:380,top:34,rh:76,ax:430}:{x0:250,x1:690,top:60,rh:62,ax:378};
      const X=v=>A.x0+v/.8*(A.x1-A.x0);
      s+=`<g style="opacity:${f1(fo)}">`+txt(N?10:20,N?20:28,N?'Benefit reported by each review':'Size of benefit reported by each review','t-sm','fill:var(--ink)');
      s+=`<line x1="${X(0)}" y1="${A.top-6}" x2="${X(0)}" y2="${A.ax}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      [0,.2,.4,.6,.8].forEach(v=>{s+=`<line x1="${f1(X(v))}" y1="${A.ax}" x2="${f1(X(v))}" y2="${A.ax+4}" class="axis"/>`+txt(X(v),A.ax+16,v.toFixed(1),'t-xs t-mid')});
      s+=`<line x1="${A.x0}" y1="${A.ax}" x2="${A.x1}" y2="${A.ax}" class="axis"/>`+txt((A.x0+A.x1)/2,A.ax+32,N?'SMD, right = benefit':'Standardised mean difference, sign turned so right = benefit','t-xs t-mid');
      ROWS.forEach((r,i)=>{const o=ramp(t,.08+i*.12,.12+i*.12),g=ease(ramp(t,.1+i*.12,.18+i*.12));if(o<=0)return;
        const y=A.top+i*A.rh;s+=`<g style="opacity:${f1(o)}">`;
        if(N){s+=txt(10,y,r.n,'t-lbl')+txt(10+W(r.n,'lbl')+8,y,r.i,'t-xs')}else{s+=txt(20,y+22,r.n,'t-lbl')+txt(20,y+38,r.i,'t-xs')}
        const dy=N?y+30:y+28;
        s+=`<line x1="${A.x0}" y1="${dy}" x2="${A.x1}" y2="${dy}" class="grid"/>`;
        if(r.none){const bw=A.x1-A.x0;s+=`<rect x="${A.x0+4}" y="${dy-14}" width="${f1(bw-8)}" height="28" rx="8" style="fill:var(--panel);stroke:var(--warn);stroke-dasharray:4 3"/>`+txt((A.x0+A.x1)/2,dy+4,N?'No pooled estimate: too few trials':'No pooled estimate: 3 small trials (116 people) could not be combined','t-xs t-mid','fill:var(--warn)')}
        else{[ [r.a,true,-1],[r.b,false,1] ].forEach(([q,fill,side])=>{const x=X(q[1]*g),lb=`${q[0]} ${q[1].toFixed(2)}`,w=W(lb,'xs');
            s+=`<circle cx="${f1(x)}" cy="${dy}" r="6" style="fill:${fill?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:2"/>`;
            if(g>.95){const right=x+8+w<=Wd-8;s+=txt(right?x+8:x-8,dy+(side<0?-9:17),lb,'t-xs'+(right?'':' t-end'),'fill:var(--ink)')}})}
        s+='</g>'});
      s+='</g>'}
    else{const B=N?{gx:[40,230],gy:60,cs:13,gl:212,ct:262,cy:300}:{gx:[30,200],gy:66,cs:14,gl:228,ct:40,cy:80};
      const o5=ramp(t,.66,.7),fp=ease(ramp(t,.68,.8));
      s+=`<g style="opacity:${f1(o5)}">`+txt(N?10:20,N?28:34,N?'Resistance to care after each kind of talk':'Resistance to care after each kind of talk','t-sm','fill:var(--ink)');
      [ [55,'Elderspeak','var(--rose)'],[26,'Normal talk','var(--sage)'] ].forEach(([n,l,c],gi)=>{const x0=B.gx[gi],k=Math.round(n*fp);
        for(let j=0;j<100;j++){const cx=x0+(j%10)*B.cs+B.cs/2,cy=B.gy+Math.floor(j/10)*B.cs+B.cs/2,on=j<k;s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(B.cs*.34)}" style="fill:${on?c:'var(--panel)'};stroke:${on?c:'var(--line)'};stroke-width:1"/>`}
        s+=txt(x0,B.gl,`${l}:`,'t-lbl')+txt(x0,B.gl+16,`${k} in 100: resistance`,'t-xs')});
      const tr=N?['Communication skills training (12 trials,','831 people) improved wellbeing and','interactions; no trial in an acute hospital.']:['Communication skills training (12 trials, 831 people) improved wellbeing','and positive interactions; none of the trials was in an acute hospital.'];
      tr.forEach((l,i)=>{s+=txt(N?10:20,(N?430:300)+i*16,l,'t-xs','opacity:'+f1(ramp(t,.74,.8)))});
      s+='</g>';
      const o6=ramp(t,.84,.9);
      if(o6>0){const x0=N?10:400,cw=N?95:100,lw=N?100:0;
        s+=`<g style="opacity:${f1(o6)}">`;
        if(N){s+=txt(x0,B.ct,'CADRES: 15 Australian care sites,','t-sm','fill:var(--ink)')+txt(x0,B.ct+16,'289 residents, against usual care','t-xs')}
        else{s+=txt(x0,B.ct,'CADRES: 15 Australian care sites, 289 residents','t-sm','fill:var(--ink)')+txt(x0,B.ct+16,'Compared with usual care at follow-up','t-xs')}
        const cols=[ ['Person-','centred care'],['Dementia','care mapping'] ];
        const tx=N?[lw+60+x0,lw+60+x0+cw+50]:[x0+150,x0+250];
        const hy=B.cy;cols.forEach((c,i)=>{s+=txt(tx[i],hy,c[0],'t-xs t-mid','fill:var(--ink)')+txt(tx[i],hy+13,c[1],'t-xs t-mid','fill:var(--ink)')});
        [ ['Agitation (CMAI)',['↓ lower','↓ lower'],['var(--good)','var(--good)']],['Falls',['↑ more','↓ fewer'],['var(--bad)','var(--good)']] ].forEach((r,i)=>{const y=hy+44+i*38;
          s+=`<line x1="${x0}" y1="${y-22}" x2="${N?390:700}" y2="${y-22}" class="grid"/>`+txt(x0,y,r[0],'t-sm','fill:var(--ink)');
          r[1].forEach((v,j)=>{s+=txt(tx[j],y,v,'t-lbl t-mid',`fill:${r[2][j]}`)})});
        s+='</g>'}}
    co.innerHTML=s;
    const p=phaseOf(NU_CO,t);setCo(p);$('#nuCoNote').innerHTML=noteHTML(NU_CO[p]);
  }
  const stopCo=playWire(cr,$('#nuCoPlay'),drawCo,16000,'Replay','nursing');
  const setCo=stepWire($('#nuCoSteps'),NU_CO,cr,drawCo,stopCo);
  $('#nuCoCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Restraint minimisation</h4><p>A guideline-based programme in 36 German nursing homes reduced physical restraint at 6 months (22.6% against 29.1%; OR 0.71) with no increase in falls, fractures or psychotropic use. [[Kopke2012]] The 2023 Cochrane review of long-term care (11 studies, 19,003 participants) found least-restraint programmes probably reduce restraint (RR 0.86) and belt use (RR 0.54), with little or no effect on falls. [[Mohler2023]] In general hospitals the evidence is very low certainty. [[Abraham2022]]</p></div>
   <div class="card"><h4>Harms of restraint</h4><p>Among 27,353 forensic autopsies in Munich (1997 to 2010), 22 deaths were caused solely by physical restraint: strangulation 11, chest compression 8, head-down suspension 3. All occurred in patients who were not continuously observed, and 19 involved incorrectly applied restraints. [[Berzlanovich2012]] Antipsychotics used as chemical restraint carry the death risk shown in part 2. [[Schneider2005,Ballard2009]]</p><div class="hook"><b>Exam hook</b>Restraint reduction did not increase falls in the trials.</div></div>
   <div class="card"><h4>Hospital outcomes</h4><p>Of 617 people over 70 with emergency medical admissions, 42.4% had dementia, and only half had been diagnosed before admission. Among those with severe cognitive impairment, 24.0% died during the admission. [[Sampson2009BJP]] 52 of 60 studies found longer stays for people with dementia. [[Mollers2019]] A review of 104 papers found higher risks of death, care home admission, delirium, falls, dehydration and functional decline. [[Fogg2018]] NG97 lists these harms to weigh before admitting someone with severe dementia. [[NICE2018NG97]]</p></div>
   <div class="card"><h4>John's Campaign and visiting</h4><p>John's Campaign was founded by Nicci Gerrard and Julia Jones after Dr John Gerrard declined during five weeks in hospital in 2014, cut off from his family. Its site lists 677 hospital pledges. [[JohnsCampaign]] In England, Regulation 9A, in force since 6 April 2024, requires care homes, hospitals and hospices to facilitate visits "unless there are exceptional circumstances", and lets people attending hospital without an overnight stay be accompanied. [[UKReg9A2024]]</p></div>
   <div class="card"><span class="tag warn">No outcome trial</span><h4>"This is me" and routines</h4><p>"This is me" is an Alzheimer's Society leaflet recording background, important people and places, preferences and routines; the RCN has endorsed it since 2010. No outcome trial of it was identified. [[AlzSocThisIsMe]] No dementia-specific trial was found for "maintaining routine" on its own; NG97 recommends considering a structured tool to record likes, dislikes, routines and personal history (rec 1.1.3). [[NICE2018NG97]]</p></div>
   <div class="card"><h4>Environment</h4><p>A review of 169 studies of building design in long-term care found specific design features helped behaviour, function, wellbeing and orientation, but not cognition. [[Marquardt2014]]</p><div class="pt"><b>In plain words</b>A familiar, readable place can make the day easier, even if it does not improve memory.</div></div>`;

  /* =========== 4 ABC builder =========== */
  const ABC={
   a:[{l:'Morning wash offered by two staff she does not know',s:['Wash offered by','two unfamiliar staff'],time:'07:20 · bedroom',need:'Fear or discomfort during personal care'},
      {l:'Lounge television loud, several people talking at once',s:['Loud TV, several','people talking'],time:'15:00 · lounge',need:'Too much noise and stimulation'},
      {l:'Helped from bed to chair; healing hip fracture',s:['Moved bed to chair;','healing hip fracture'],time:'10:30 · bedside',need:'Pain'},
      {l:'Two hours seated with nothing to do',s:['Two hours seated,','nothing to do'],time:'14:00 · corridor',need:'Boredom'}],
   b:[{l:'Pushed the carer\'s arm away and shouted "no".',s:['Pushed arm away,','shouted "no"']},
      {l:'Walked to the exit door repeatedly and tried the handle.',s:['Walked to exit door,','tried the handle']},
      {l:'Called out "help me" repeatedly.',s:['Called out','"help me" repeatedly']},
      {l:'Grimaced, held her right hip, would not stand.',s:['Grimaced, held hip,','would not stand']}],
   c:[{l:'Care paused. One familiar carer returned later and explained each step; wash accepted.',s:['Paused; familiar carer','later: wash accepted']},
      {l:'Moved to a quiet room with music she knows; calmer.',s:['Quiet room, familiar','music: calmer']},
      {l:'Pain reassessed with PAINAD; prescribed analgesia given; settled.',s:['PAINAD; prescribed','analgesia: settled']},
      {l:'Offered a folding task she enjoys; walked less.',s:['Folding task she','enjoys: walked less']}],
   w:[{l:'Described as seen and heard'},{l:'Label only: "aggressive"'}]};
  const asel={a:0,b:0,c:0,w:0};let abcP=1;
  const grp=(k,title)=>`<div class="nu-item"><span id="nuAb${k}">${title}</span><div class="nu-opts" role="group" aria-labelledby="nuAb${k}">${ABC[k].map((o,j)=>`<button class="btn" data-abc="${k}" data-j="${j}" aria-pressed="${j===0}">${o.l}</button>`).join('')}</div></div>`;
  $('#nuAbc').innerHTML=`<p class="nu-teach">Worked example, fictional person</p>`+grp('a','A · Antecedent: what came just before')+grp('b','B · Behaviour: what was seen and heard')+grp('c','C · Consequence: what happened next')+grp('w','Wording of the behaviour');
  function drawAbc(){
    const sv=$('#nuAbcSvg'),N=vb(sv,'520 230','400 370');
    const bxs=N?[ [40,16],[40,128],[40,240] ]:[ [16,30],[186,30],[356,30] ],bw=N?300:148,bh=N?76:96;
    const T=[ ['A · Antecedent',ABC.a[asel.a].s],['B · Behaviour',asel.w?['"Aggressive"','(a label)']:ABC.b[asel.b].s],['C · Consequence',ABC.c[asel.c].s] ];
    let s=`<defs>${marker('nuAA','var(--ink)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    bxs.forEach(([x,y],i)=>{const bad=i===1&&asel.w;s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" style="fill:${bad?'var(--bad-soft)':'var(--panel)'};stroke:${bad?'var(--bad)':['var(--sky)','var(--rose)','var(--sage)'][i]};stroke-width:2"/>`;
      s+=txt(x+bw/2,y+(N?22:26),T[i][0],'t-sm t-mid','fill:var(--ink);font-weight:600')+txt(x+bw/2,y+(N?42:52),T[i][1][0],'t-xs t-mid','fill:var(--ink)')+txt(x+bw/2,y+(N?58:68),T[i][1][1],'t-xs t-mid','fill:var(--ink)')});
    const p1=ramp(abcP,0,.4),p2=ramp(abcP,.3,.7),p3=ramp(abcP,.6,1);
    const ar=(x1,y1,x2,y2,p)=>p>0?`<path d="M${x1} ${y1} L${f1(lerp(x1,x2,p))} ${f1(lerp(y1,y2,p))}" style="stroke:var(--ink);stroke-width:1.6;fill:none" ${p>.98?'marker-end="url(#nuAA)"':''}/>`:'';
    if(N){s+=ar(190,92,190,126,p1)+ar(190,204,190,238,p2);
      if(p3>0)s+=`<path d="M340 278 H372 V54 H344" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(p3)}" marker-end="url(#nuAA)"/>`+txt(200,348,'Patterns across many entries','t-xs t-mid','opacity:'+f1(p3))+txt(200,362,'suggest a need to test','t-xs t-mid','opacity:'+f1(p3))}
    else{s+=ar(164,78,184,78,p1)+ar(334,78,354,78,p2);
      if(p3>0)s+=`<path d="M430 126 V160 H90 V128" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(p3)}" marker-end="url(#nuAA)"/>`+txt(260,184,'Patterns across many entries suggest a need to test','t-xs t-mid','opacity:'+f1(p3))+txt(260,204,'One entry alone proves nothing','t-xs t-mid','opacity:'+f1(p3))}
    sv.innerHTML=s;
  }
  function abcEntry(){
    const a=ABC.a[asel.a],b=ABC.b[asel.b],c=ABC.c[asel.c];
    let h=`<dt>Worked example · fictional</dt><dd>${a.time}</dd><dt>A · Antecedent</dt><dd>${a.l}.</dd><dt>B · Behaviour</dt><dd>${asel.w?'Aggressive and uncooperative.<div class="flag">A label records a judgement, not what was seen or heard. It hides the antecedent, and entries like this cannot show a pattern.</div>':b.l}</dd><dt>C · Consequence</dt><dd>${c.l}</dd>`;
    h+=`<dt>Possible need to test</dt><dd>${a.need}. The unmet-needs model reads behaviour as communicating a need such as pain, boredom or discomfort. [[CohenMansfield2012]]${asel.a===2||asel.b===3?' NICE NG97 recommends considering a structured observational pain tool when self-report is not possible. [[NICE2018NG97]]':''}</dd>`;
    $('#nuAbcEntry').innerHTML=h;
  }
  let abcStop=null;
  $('#nuAbc').addEventListener('click',e=>{const b=e.target.closest('[data-abc]');if(!b)return;const k=b.dataset.abc;asel[k]=+b.dataset.j;
    $$(`#nuAbc [data-abc="${k}"]`).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.j===asel[k]));
    abcEntry();abcStop&&abcStop();abcStop=animate(800,p=>{abcP=p;drawAbc()})});

  /* =========== 4b capacity, safety, feeding, gaps =========== */
  const nb2=(rows,max=100,col='var(--rose)')=>`<div class="nu-bars">${rows.map(([l,v,show])=>`<div><span>${l}</span><s><i style="width:${(v/max*100).toFixed(1)}%;background:${col}"></i></s><b>${show||v+'%'}</b></div>`).join('')}</div>`;
  $('#nuCap').innerHTML=`
   <div class="card"><h4>England and Wales: Mental Capacity Act 2005</h4><p>Section 1 sets five principles: [[MCA2005]]</p><ol><li>Capacity is presumed.</li><li>All practicable steps to support the person's own decision come first.</li><li>An unwise decision does not show incapacity.</li><li>Acts must be in the person's best interests.</li><li>The less restrictive option must be considered.</li></ol><p>NICE NG97 recommends early and repeated offers of advance care planning: lasting power of attorney, advance statements, advance decisions to refuse treatment, and preferred place of care and death. [[NICE2018NG97]]</p><div class="hook"><b>Exam hook</b>MCA s.1: presume capacity, support the decision, unwise is not incapable, best interests, least restrictive.</div></div>
   <div class="card"><h4>United States: default surrogates</h4><p>When no agent was named in advance, state law decides who may speak for a person. In a 2017 review of 51 jurisdictions: [[DeMartino2017]]</p>${nb2([ ['Default-surrogate statute',41,'41 of 51'],['Priority order set',35,'35 of 51'],['Close friend may serve',23,'23 of 51'],['No provision',4,'4 states'] ],51,'var(--sky)')}<div class="pt"><b>In plain words</b>Naming someone in advance avoids leaving the choice to a state's default list, which differs from state to state.</div></div>`;
  $('#nuSafeCards').innerHTML=`
   <div class="card"><h4>Elder abuse in the community</h4><p>Pooled past-year prevalence among older people generally, not only people with dementia (52 studies): [[Yon2017]]</p>${nb2([ ['Any',15.7],['Psychological',11.6],['Financial',6.8],['Neglect',4.2],['Physical',2.6],['Sexual',0.9] ],20)}<p class="stage-cap">Bars on a 0 to 20% scale.</p></div>
   <div class="card"><h4>In institutions and at home</h4><p>In institutional settings, 64.2% of staff reported having committed some form of abuse in the past year; residents reported psychological abuse at 33.4% and physical at 14.1%. [[Yon2019]] Among 220 family carers of people with dementia, 52% reported some abusive behaviour, mostly verbal, 34% at important levels, and physical abuse was rare (1.4%). [[Cooper2009]]</p><div class="pt"><b>In plain words</b>Most harm reported by family carers was shouting or harsh words, often under strain. Support for carers is part of safeguarding.</div></div>
   <div class="card"><span class="ev early">Sources disagree</span><h4>Mouth care and pneumonia</h4><p>A Japanese trial in 417 nursing home residents reported fewer pneumonia episodes, febrile days and pneumonia deaths with intensive oral care. [[Yoneyama2002]] The 2022 Cochrane review (6 RCTs, 6,244 participants, all at high risk of bias) found insufficient evidence that professional oral care reduces pneumonia, with low-certainty evidence of lower pneumonia mortality at 24 months (RR 0.43). [[Cao2022]] Resistance to mouth care is a known barrier; a 7-resident pilot of a threat-reduction approach (MOUTh) improved oral health scores from 7.29 to 1.00. [[Jablonski2011]]</p></div>
   <div class="card"><h4>The course of advanced dementia</h4><p>In nursing home residents with advanced dementia followed for 18 months, 54.8% died. Eating problems affected 85.8%, febrile episodes 52.6%, dyspnoea 46.0%, pneumonia 41.1% and pain 39.1%. When proxies understood the prognosis, burdensome interventions were much less likely (adjusted OR 0.12). [[Mitchell2009]]</p></div>
   <div class="card"><h4>Nursing home quality measures (US)</h4><p>Five-Star quality measures are calculated from MDS 3.0 data and include pressure ulcers, restraint use, falls with major injury and, since February 2015, short- and long-stay antipsychotic use. [[CMS2015]] The MDS is reported by the facilities themselves, which the HHS OIG judged insufficiently validated. [[OIG2021]]</p></div>`;
  $('#nuFeedTbl').innerHTML=`<thead><tr><th>Question</th><th>Careful hand feeding</th><th>Tube feeding</th></tr></thead><tbody>
   <tr><th>Survival</th><td>No separate survival figure in these sources; the AGS reports overall outcomes as good as tube feeding. [[AGS2014]]</td><td>No difference (AHR 1.03) among 36,492 US residents with advanced dementia and new eating problems; timing made no difference. [[Teno2012surv]]</td></tr>
   <tr><th>Aspiration and function</th><td>Not separately measured in these sources.</td><td>No evidence it prevents aspiration, prevents pressure sores or improves function (1999 review). [[Finucane1999]]</td></tr>
   <tr><th>Pressure ulcers</th><td>Not separately measured in these sources.</td><td>A PEG tube was associated with 2.27 times the odds of a new pressure ulcer and less healing (OR 0.70). [[Teno2012PU]]</td></tr>
   <tr><th>Trials</th><td colspan="2">The Cochrane review found no randomised trials and, in observational studies, no survival benefit from tubes. [[Sampson2009Cochrane]]</td></tr>
   <tr><th>Guidance</th><td>Supported by the American Geriatrics Society (2014). [[AGS2014]]</td><td>AGS recommends against tubes in advanced dementia, citing tube-related agitation and restraint. NICE NG97 recommends against routine enteral feeding in severe dementia unless a comorbidity is potentially reversible. [[AGS2014,NICE2018NG97]]</td></tr>
   <tr><th>Deciding</th><td colspan="2">A decision aid for surrogates reduced decisional conflict (1.65 against 1.90) and increased discussion with providers (46% against 33%). [[Hanson2011]]</td></tr></tbody>`;
  $('#nuGaps').innerHTML=[
   'No dementia-specific trial of crushing practice; it rests on local policy. [[LPFT2022]]',
   'No verified FDA or ISMP count of rivastigmine patch overdoses. [[Ali2015]]',
   'PAINAD severity bands are not validated for the tool, and no single pain tool could be recommended. [[Warden2003,Lichtner2014]]',
   'Cornell scale cutoffs could not be verified from the source. [[Alexopoulos1988]]',
   'No falls risk tool validated specifically for dementia was found. [[NICE2025NG249]]',
   'Only 9 studies (50 participants) validate delirium tools in dementia, and none tested severity or subtype; prevention in people with dementia is uncertain. [[Morandi2012,Siddiqi2016]]',
   'No dementia-specific trial of "maintaining routine", and no outcome trial of "This is me". [[NICE2018NG97,AlzSocThisIsMe]]',
   'No validation study of the ABC chart as a nursing documentation tool. [[MonizCook2012]]',
   'No nursing-specific outcome studies of anti-amyloid infusion workflows. [[LeqembiLabel,KisunlaLabel]]',
   'The NMC\'s current text on covert administration was not checked; it is reported from trade press and trust policy. [[RCNi2019,LPFT2022]]',
   'No communication-training trials in acute hospitals, and very low-certainty evidence on restraint reduction there. [[Eggenberger2013,Abraham2022]]'
  ].map(x=>`<li>${x}</li>`).join('');

  /* ---- first paint, and redraws when the layout flips ---- */
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawFourG(fShown);drawPainG(pShown);drawAbc();drawAp()};
  drawDl(+dr.value);drawFourG(0);fourOut();drawPainG(0);painOut();useSit('crush');drawCo(+cr.value);abcEntry();drawAbc();drawAp();
  /* bars grow the first time they scroll into view */
  const onSeen=(el,fn)=>{let done=false,io=null;const go=()=>{if(done)return;done=true;io&&io.disconnect();removeEventListener('scroll',chk);fn()};
    const chk=()=>{const r=el.getBoundingClientRect();if(r.height&&r.top<innerHeight*.85&&r.bottom>innerHeight*.15)go()};
    if('IntersectionObserver' in window){io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))go()},{threshold:.3});io.observe(el)}
    addEventListener('scroll',chk,{passive:true});chk()};
  onSeen($('#nuPainSvg'),()=>animate(900,p=>{barP=ease(p);drawPainG(pShown)}));onSeen($('#nuApSvg'),growAp);
};
