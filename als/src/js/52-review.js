
/* =============== 5.2–5.5 review: flashcards, mnemonics, quiz, glossary, sources ===============
   Data first (PARTN, FC, MN, QZ, GL, AREAN), then the four widgets. Interface text the
   widgets write is in RV, as whole phrases, so a translation replaces the data and RV only. */
const RV={
  allCards:'All cards',mixed:'Mixed (20)',all:'All',question:'question',answer:'answer',
  qOf:(i,n)=>`question <b>${i} / ${n}</b>`,scoreIs:s=>`score <b>${s}</b>`,
  finished:'Finished',scored:(s,n,p)=>`You scored ${s} / ${n} (${p}%)`,
  verdict:p=>p>=85?'Excellent work.':p>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.',
  again:'Try again',toCards:'Go to flashcards',right:'Correct.',wrong:'Not quite.',nextQ:'Next question →',results:'See results',
  noTerms:'No matching terms.',termsOf:(n,m)=>`${n} of ${m} terms`,srcOf:(n,m)=>`${n} of ${m} sources`,also:'also',check:'check'
};
/*%%REVIEW-DATA%%*/
const PARTN={1:'Part 1 · The disease',2:'Part 2 · Diagnosis & course',3:'Part 3 · Treatment & care',4:'Part 4 · Living & the future',5:'Part 5 · History'};
const FC=[
 [1,'Which two sets of neurons degenerate in ALS?','Upper motor neurons (Betz cells in layer 5 of the primary motor cortex) and lower motor neurons (brainstem motor nuclei and anterior horn cells of the spinal cord).'],
 [1,'Which signs point to upper motor neuron loss?','Brisk and spreading reflexes, pathological reflexes such as Hoffmann, Babinski and snout, reflexes kept in a weak limb, and spasticity.'],
 [1,'Which signs point to lower motor neuron loss?','Muscle weakness, atrophy (wasting) and fasciculations.'],
 [1,'What is the split hand?','Wasting of the thenar side of the hand (abductor pollicis brevis and first dorsal interosseous) with relative sparing of the hypothenar abductor digiti minimi. It is reported to be highly specific in early ALS.'],
 [1,'Which motor neurons are relatively spared in ALS?','The eye-movement neurons (cranial nerves III, IV and VI) and Onuf\'s nucleus, which controls the sphincters. This is why eye-tracking can support communication late in the disease.'],
 [1,'In what share of ALS is TDP-43 pathology found?','About 97%. The main exceptions are ALS caused by SOD1 or FUS variants, which show SOD1 or FUS inclusions instead.'],
 [1,'What does TDP-43 normally do?','It is a mostly nuclear RNA-binding protein that regulates splicing, RNA stability and RNA transport. It keeps cryptic exons out of mRNA and controls its own level.'],
 [1,'How does loss of nuclear TDP-43 harm motor neurons?','Cryptic exons enter transcripts. STMN2 mRNA is truncated, so stathmin-2, which axons need to grow and repair, falls. UNC13A, a synapse protein, is lost as well.'],
 [1,'What is the C9orf72 expansion?','A non-coding GGGGCC repeat in intron 1 of C9orf72 on chromosome 9p21. It is the most common genetic cause of familial ALS and familial FTD in European populations.'],
 [1,'How often is ALS familial?','About 5% in prospective population registers (5.1% in a meta-analysis). Other sources say 10-15%; part of the gap is how familial is defined.'],
 [1,'What does SOD1 do, and how do its variants cause ALS?','SOD1 is a copper-zinc enzyme that converts superoxide to oxygen and hydrogen peroxide. ALS variants make the protein misfold and act through a toxic gain of function, not through loss of enzyme activity.'],
 [1,'What are the dying-forward and dying-back hypotheses?','Dying-forward: overactive cortical neurons drive the death of lower motor neurons through glutamate. Dying-back: degeneration starts at the neuromuscular junction and moves back to the cell body. The evidence does not yet settle which comes first.'],
 [2,'What are the three Gold Coast requirements?','Progressive motor impairment after normal motor function; UMN and LMN dysfunction in 1 region, or LMN dysfunction in at least 2 regions; and investigations that exclude other diseases.'],
 [2,'Which four body regions do the diagnostic criteria use?','Bulbar, cervical, thoracic and lumbosacral.'],
 [2,'What is clinically definite ALS under the revised El Escorial criteria?','UMN and LMN signs, on clinical evidence alone, in 3 regions.'],
 [2,'What did the Awaji-shima criteria change?','EMG chronic neurogenic change counts the same as clinical LMN signs, and fasciculation potentials count as denervation when ALS is suspected. The probable laboratory-supported category was dropped.'],
 [2,'Which EMG findings support ALS?','Chronic neurogenic change (large, long-duration motor unit potentials with reduced recruitment) plus ongoing denervation (fibrillations, positive sharp waves or fasciculation potentials), with normal sensory conduction and no conduction block.'],
 [2,'Name red flags for a diagnosis other than ALS.','Prominent sensory features; sphincter, visual or autonomic problems; abnormal eye movements; fluctuating or fatigable weakness; conduction block on nerve studies; and no progression over time.'],
 [2,'How is multifocal motor neuropathy told apart from ALS?','It is pure motor, asymmetric and arm-predominant, with weakness greater than wasting. The key test is conduction block on nerve conduction studies, and it responds to IVIG.'],
 [2,'What points to Kennedy disease (SBMA)?','A man with slow LMN-only bulbar and limb weakness, chin fasciculations, gynaecomastia and low sensory potentials. The key test is a CAG expansion in the androgen receptor gene.'],
 [2,'How is the ALSFRS-R built?','12 items in four domains (bulbar, fine motor, gross motor, respiratory), each scored 0-4. The total runs from 0 to 48, and 48 is normal function.'],
 [2,'How is the progression rate ΔFS calculated?','(48 minus the ALSFRS-R score at diagnosis) divided by the months from onset to diagnosis. Below 0.5 points a month is usually called slower and above 1.0 faster.'],
 [2,'What are the King\'s stages?','1: first region involved; 2A: diagnosis; 2B: second region; 3: third region; 4A: need for gastrostomy; 4B: need for non-invasive ventilation.'],
 [2,'What range of survival do studies report?','Median survival from onset is about 2-4 years (20-48 months in a systematic review). In that review 10-20% lived more than 10 years; registries report 7-12% alive at 10 years.'],
 [3,'How much does riluzole extend survival in trials?','The Cochrane review estimates about 2-3 months of median survival (11.8 to 14.8 months). Observational studies report more, but they are prone to bias.'],
 [3,'What liver monitoring does the US riluzole label describe?','Aminotransferases before and during treatment, monthly for the first 3 months and periodically after that. Use is not recommended if they exceed 5 times the upper limit of normal.'],
 [3,'What is the evidence for edaravone?','One trial of 137 selected early-stage people (MCI186-19): ALSFRS-R fell 5.01 against 7.50 points over 24 weeks. The EU application was withdrawn, later studies found no added benefit, and EAN 2024 recommends against it outside trials.'],
 [3,'What happened to AMX0035 (sodium phenylbutyrate-taurursodiol)?','The phase 2 CENTAUR trial was positive, but the phase 3 PHOENIX trial (664 people) missed its endpoints. Withdrawal began in 2024 in the US and Canada, and the EU refused it.'],
 [3,'How does tofersen work?','It is an antisense oligonucleotide that binds SOD1 mRNA. RNase H then cuts the mRNA, so less SOD1 protein is made. It is for SOD1-ALS only.'],
 [3,'What did the VALOR trial of tofersen show?','The 28-week clinical primary endpoint was not met (difference 1.2 points, P = 0.97), but CSF SOD1 and plasma NfL fell. The FDA granted accelerated approval on 25 April 2023 based on the NfL reduction.'],
 [3,'What is the label schedule for tofersen?','100 mg in 15 mL by lumbar puncture: three loading doses 14 days apart, then one dose every 28 days.'],
 [3,'What did the Bourke 2006 NIV trial find?','In people with normal to moderately impaired bulbar function, NIV gave a median survival benefit of 205 days with quality of life maintained. With poor bulbar function it improved sleep symptoms but not survival.'],
 [3,'Which NIV triggers recur across guidelines?','FVC below 50% predicted and SNIP around 40 cmH2O. Several guidelines also use FVC below 80% with symptoms such as orthopnoea.'],
 [3,'Which peak cough flows does AAN 2009 cite?','Above 160 L/min is needed to clear secretions, and assistive devices are recommended below 270 L/min.'],
 [3,'What did the ProGas study report about gastrostomy?','30-day mortality was 4% overall and similar after PEG and RIG. Weight loss of more than 10% before the procedure was linked to shorter survival (7.7 against 12 months).'],
 [3,'Is diaphragm pacing recommended in ALS?','No. In DiPALS, median survival was 11.0 months with pacing plus NIV against 22.5 months with NIV alone, and EAN 2024 recommends against it.'],
 [4,'How common are cognitive and behavioural changes in ALS?','About half of people with ALS show some change, and about 14-15% meet criteria for frontotemporal dementia. The figures depend on the tests used.'],
 [4,'What is the ECAS?','A 15-20 minute cognitive and behavioural screen designed for people with physical disability. It scores ALS-specific functions (executive, social cognition, fluency, language) and non-specific ones (memory, visuospatial), with a carer interview on behaviour.'],
 [4,'What is pseudobulbar affect?','Uncontrollable episodes of laughing or crying that are excessive for the feeling behind them. A CNS-LS score of 13 or more is the threshold used, and dextromethorphan-quinidine is labelled for it.'],
 [4,'What does NICE say about communication aids?','Speech and language therapy assessment and AAC without delay, from low-tech alphabet or picture boards to voice-output aids, with referral to a specialised hub for eye-gaze access.'],
 [4,'How common is a totally locked-in state?','It developed in 11-13% of people on long-term tracheostomy ventilation in Japanese studies. No study read gives a figure for all people with ALS.'],
 [4,'How do most people with ALS die?','Most die peacefully: 88% in a German series and 98% in a UK series, and no patient choked to death. Respiratory failure is the most common cause.'],
 [4,'Can ventilation be stopped?','Yes. NICE says NIV can be stopped at any time. UK guidance says a person with capacity may refuse or withdraw ventilation, that this is not assisted suicide, and that symptoms are controlled with titrated medicines.'],
 [4,'Why is oxygen used with extreme caution in ALS?','With weak breathing muscles, oxygen can raise CO2 and cause acidaemic respiratory failure. MND Association guidance accepts saturations of 88-92% and uses the person\'s own NIV.'],
 [4,'How does ESPEN describe giving medicines through a feeding tube?','One medicine at a time, with 30 mL of water flushed before, between and after each. Crushing should be avoided whenever possible.'],
 [4,'What is the ATLAS trial?','A phase 3 trial of tofersen in presymptomatic SOD1 carriers, randomised when plasma NfL starts to rise. The primary endpoint is clinically manifest ALS within 12 months, and no results are out yet.'],
 [4,'What is a platform trial?','A trial that tests several drugs under one protocol with shared placebo participants. In the HEALEY platform, zilucoplan, verdiperstat, CNM-Au8, pridopidine and trehalose did not slow ALS.'],
 [4,'What is ulefnersen?','An antisense drug for FUS-ALS, also called ION363 or jacifusen. A phase 3 topline result announced in September 2026 favoured it, but it is not yet peer reviewed or approved.'],
 [5,'Who named amyotrophic lateral sclerosis?','Charcot offered the term in 1874. ALS is still called Charcot\'s disease in many countries.'],
 [5,'What did Charcot and Joffroy show in 1865-1869?','Lateral column lesions went with paralysis and contractures, and anterior horn lesions went with paralysis and atrophy.'],
 [5,'What did Aran describe in 1850?','He described and named progressive muscular atrophy.'],
 [5,'When did Lou Gehrig stop playing?','He ended his streak of 2130 consecutive games on 2 May 1939, and he died on 2 June 1941.'],
 [5,'Why is Guam important in ALS history?','From the 1950s Guam had a far higher incidence of ALS and parkinsonism-dementia than anywhere else. A registry began in 1958, incidence then fell, and the cycad toxin (BMAA) hypothesis remains contested.'],
 [5,'What happened in 1993?','SOD1 mutations were found in familial ALS: 11 missense mutations in 13 families. SOD1 became the first ALS gene.'],
 [5,'What happened in 1994?','The El Escorial criteria were published, and a riluzole trial reported 1-year survival of 74% against 58% with placebo.'],
 [5,'When did the FDA approve riluzole?','On 12 December 1995.'],
 [5,'What was found in 2006?','TDP-43 was identified as the major disease protein in the inclusions of both ALS and FTLD-U.'],
 [5,'What was found in 2011?','The C9orf72 GGGGCC repeat expansion, now known as the most common genetic cause of familial ALS in European populations.'],
 [5,'What did the 2014 Ice Bucket Challenge achieve?','It brought the ALS Association more than $100 million, part of which funded Project MinE. In 2016 Project MinE reported NEK1 risk variants in nearly 3% of ALS cases.'],
 [5,'Which US approvals followed riluzole?','Edaravone on 5 May 2017; sodium phenylbutyrate-taurursodiol on 29 September 2022, later withdrawn (formally in 2025); and tofersen for SOD1-ALS on 25 April 2023.']
];
const MN=[
 ['Amyotrophic + lateral sclerosis','Amyotrophic: muscle wasting, the lower motor neuron. Lateral sclerosis: scarring of the lateral columns, the upper motor neuron.'],
 ['UMN turns it up, LMN brings it low','Upper motor neuron loss turns things up: brisk reflexes, spasticity, Babinski and Hoffmann signs. Lower motor neuron loss brings muscle bulk low: weakness, wasting and fasciculations.'],
 ['B-C-T-L, head to tail','The four regions the diagnostic criteria count, from the top down: Bulbar, Cervical, Thoracic, Lumbosacral.'],
 ['Gold Coast: Progress, Pattern, Proof','Progress: motor impairment that worsens after normal function. Pattern: UMN and LMN signs in 1 region, or LMN signs in 2. Proof: tests exclude other diseases. When all three are met, the answer is ALS; there are no grades.'],
 ['12 x 4 = 48','The ALSFRS-R has 12 items, each scored 0 to 4, so the total runs to 48, which means normal function.'],
 ['King\'s 4A and 4B: A for alimentation, B for breathing','Stages 1 to 3 count the regions involved. Stage 4A is need for a feeding tube (gastrostomy) and 4B is need for non-invasive ventilation.'],
 ['Can Some Tests Find it?','The four genes the 2023 consensus puts on every ALS gene panel: C9orf72, SOD1, TARDBP and FUS.'],
 ['Eyes and sphincters last','Eye-movement neurons (cranial nerves III, IV and VI) and Onuf\'s nucleus (bladder and bowel) are relatively spared, which is why eye-gaze communication often works late in ALS.']
];
const QZ=[
 [1,'ALS damages:',['Sensory neurons only','Upper and lower motor neurons','The neuromuscular junction only','Muscle fibres directly'],1,'Upper motor neurons in the motor cortex and lower motor neurons in the brainstem and spinal cord both degenerate.'],
 [1,'Which of these is a lower motor neuron sign?',['Babinski sign','Spasticity','Hoffmann sign','Fasciculations'],3,'Weakness, wasting and fasciculations are lower motor neuron signs. Babinski, Hoffmann and spasticity point to the upper motor neuron.'],
 [1,'In the split hand of ALS, which muscle is relatively spared?',['Abductor pollicis brevis','First dorsal interosseous','Abductor digiti minimi','None; all hand muscles waste equally'],2,'Wasting favours the thenar side (APB and FDI) and relatively spares the hypothenar ADM, although all three are supplied from C8-T1.'],
 [1,'Which motor neurons usually persist late in ALS, so that eye-tracking can support communication?',['Oculomotor, trochlear and abducens neurons','Hypoglossal neurons','Phrenic neurons at C3-C5','Betz cells of the motor cortex'],0,'The eye-movement nuclei (cranial nerves III, IV and VI) persist throughout the disease, along with Onuf\'s nucleus.'],
 [1,'TDP-43 pathology is present in about what share of ALS?',['About 97%','About 50%','About 20%','About 5%'],0,'The Lancet seminar gives about 97%. The main exceptions are ALS caused by SOD1 or FUS variants.'],
 [1,'Which genetic form of ALS has no TDP-43 inclusions?',['C9orf72 ALS','TARDBP ALS','TBK1 ALS','SOD1 ALS'],3,'In an autopsy series, none of 15 SOD1 cases had TDP-43-positive inclusions. SOD1-ALS shows abnormal SOD1 instead.'],
 [1,'What happens to STMN2 when nuclear TDP-43 is lost?',['Stathmin-2 protein rises','A cryptic exon enters STMN2 mRNA and stathmin-2 falls','The STMN2 gene is deleted','STMN2 forms the main inclusions'],1,'TDP-43 normally keeps cryptic exon 2a out. Without it the mRNA is truncated, and stathmin-2, needed for axon growth and repair, falls.'],
 [1,'The C9orf72 expansion is:',['A CAG repeat in the coding region','A point mutation on chromosome 21','A GGGGCC repeat in intron 1','A deletion of the whole gene'],2,'It is a non-coding GGGGCC hexanucleotide repeat in the first intron of C9orf72 on chromosome 9p21.'],
 [1,'In prospective population registers, about what share of ALS is familial?',['About 1%','About 5%','About 25%','About 50%'],1,'A meta-analysis found 5.1% in population registers. Other sources give 10-15%, partly because definitions of familial ALS differ.'],
 [1,'The lifetime risk of ALS is roughly:',['1 in 35','1 in 3,500','1 in 35,000','1 in 350'],3,'UK data give 1 in 350 men and 1 in 472 women, and the Lancet seminar gives about 1 in 350.'],
 [1,'Mouse studies suggest mutant SOD1 harms motor neurons mainly through:',['A toxic gain of function','Loss of enzyme activity','Too little normal SOD1','An immune attack on SOD1'],0,'SOD1 knockout mice do not develop ALS, and adding or removing normal SOD1 does not change disease caused by mutant SOD1.'],
 [1,'In SOD1(G93A) mice, what was seen first?',['Loss of motor neuron cell bodies','Microglial activation around motor neurons','Denervation of neuromuscular junctions','Loss of cortical neurons'],2,'At 47 days, 40% of end-plates were denervated with no cell body loss, which supports the dying-back hypothesis. This does not settle the debate in humans.'],
 [2,'Under the Gold Coast criteria, which pattern counts as motor neuron dysfunction?',['UMN signs alone in 2 regions','Sensory loss in 1 region','LMN dysfunction in at least 2 regions','Fasciculations without weakness'],2,'Gold Coast needs UMN and LMN dysfunction in 1 region, or LMN dysfunction in at least 2 regions. A pure UMN syndrome does not meet it.'],
 [2,'How many certainty grades do the Gold Coast criteria have?',['None; the result is ALS or not ALS','Two','Three','Four'],0,'Gold Coast dropped possible, probable and definite. A UK group argued that the older grades implied a distressing doubt.'],
 [2,'Under the revised El Escorial criteria, clinically definite ALS needs UMN and LMN signs in:',['1 region','2 regions','1 region plus abnormal EMG','3 regions'],3,'Definite needs clinical UMN and LMN signs in 3 regions. Probable needs 2 regions with some UMN signs above the LMN signs.'],
 [2,'What did the Awaji-shima criteria change?',['They added a sensory region','EMG evidence counts the same as clinical LMN signs','They required MRI of the whole spine','They removed the bulbar region'],1,'Awaji counts EMG chronic neurogenic change like clinical findings, and counts fasciculation potentials as denervation when ALS is suspected.'],
 [2,'Which nerve conduction finding argues against ALS?',['Normal sensory conduction','Normal motor conduction velocity','Reduced motor amplitude','Motor conduction block'],3,'Conduction block or demyelination points to another condition, such as multifocal motor neuropathy. Reduced motor amplitude can occur in ALS.'],
 [2,'Which test best separates multifocal motor neuropathy from ALS?',['Brain MRI','Serum creatine kinase','Nerve conduction studies looking for conduction block','Muscle biopsy'],2,'MMN shows conduction block, which is diagnostic though not always found. It is pure motor, arm-predominant and responds to IVIG.'],
 [2,'A man has slow LMN-only bulbar and limb weakness, gynaecomastia and low sensory potentials. Which test is key?',['CAG repeat length in the androgen receptor gene','Anti-GM1 antibodies','Muscle biopsy','Hexosaminidase A assay'],0,'This picture suggests Kennedy disease (SBMA), an X-linked condition confirmed by a CAG expansion in the androgen receptor gene.'],
 [2,'In a US centre, the median time from first symptom to confirmed diagnosis was about:',['3 months','11.5 months','24 months','36 months'],1,'Half of the people received another diagnosis first, and people saw about three physicians on average.'],
 [2,'The ALSFRS-R total score ranges from:',['0 to 10','0 to 100','0 to 48, where 48 is normal function','1 to 5'],2,'It has 12 items in four domains, and each item is scored 0 to 4.'],
 [2,'How is the progression rate ΔFS calculated?',['(48 minus ALSFRS-R at diagnosis) divided by months from onset to diagnosis','ALSFRS-R divided by age','FVC divided by months since onset','The number of regions involved'],0,'Below 0.5 points a month is usually called slower and above 1.0 faster. In a French cohort the median was 1.0.'],
 [2,'In King\'s staging, what marks stage 4A?',['Diagnosis','Need for gastrostomy','Need for non-invasive ventilation','Involvement of a third region'],1,'Stage 4A is need for gastrostomy and 4B is need for NIV. Stages 1 to 3 count the regions involved.'],
 [2,'Across cohorts, median survival from symptom onset is usually about:',['6 months','1 year','10 years','2 to 4 years'],3,'A systematic review gives 20 to 48 months. In that review 10-20% lived more than 10 years, and registries report 7-12% alive at 10 years.'],
 [3,'The Cochrane review estimates that riluzole prolongs median survival by about:',['2 to 3 months','2 to 3 years','10 years','It has no effect on survival'],0,'Median survival rose from 11.8 to 14.8 months. Observational studies report more, but they are prone to bias.'],
 [3,'What does the US riluzole label say about liver tests?',['No monitoring is needed','Check them once a year','Check aminotransferases before and during treatment, monthly for the first 3 months','Check them only if jaundice appears'],2,'Monitoring continues periodically after 3 months. Use is not recommended if transaminases exceed 5 times the upper limit of normal.'],
 [3,'Which trial supported edaravone approval in the US?',['ADORE','MCI186-19, in a selected early-stage group','PHOENIX','VALOR'],1,'MCI186-19 randomised 137 people chosen by criteria from a post hoc analysis. ALSFRS-R fell 5.01 against 7.50 points over 24 weeks.'],
 [3,'What happened to sodium phenylbutyrate-taurursodiol (AMX0035)?',['It was approved in Europe in 2024','It showed clear benefit in PHOENIX','It became first-line in EAN 2024','Its phase 3 trial was negative and it was withdrawn'],3,'CENTAUR was positive, but PHOENIX (664 people) missed all its endpoints, and withdrawal began in April 2024.'],
 [3,'How does tofersen work?',['It blocks glutamate release','It binds SOD1 mRNA so that RNase H degrades it','It replaces the SOD1 gene','It scavenges free radicals'],1,'Tofersen is an antisense oligonucleotide. Destroying SOD1 mRNA means less SOD1 protein is made.'],
 [3,'Tofersen is indicated for adults with ALS who:',['Carry a SOD1 mutation','Have any form of ALS','Carry a C9orf72 expansion','Have bulbar onset'],0,'The US label limits it to adults with a SOD1 mutation, under accelerated approval.'],
 [3,'In VALOR, what happened to the primary clinical endpoint at 28 weeks?',['It improved significantly','Tofersen did clearly worse than placebo','It was not met (difference 1.2 points, P = 0.97)','It was not measured'],2,'CSF SOD1 and plasma NfL fell, and the FDA gave accelerated approval based on the NfL reduction.'],
 [3,'The label schedule for tofersen is:',['A daily tablet','A weekly IV infusion','A single lifetime injection','Three intrathecal loading doses 14 days apart, then one every 28 days'],3,'Each dose is 100 mg in 15 mL, given by lumbar puncture after about 10 mL of CSF is removed.'],
 [3,'In the Bourke 2006 trial, who gained the most survival from NIV?',['People with severe bulbar weakness','People who used it only in the daytime','People without symptoms','People with normal to moderately impaired bulbar function'],3,'The median benefit was 205 days with quality of life maintained. With poor bulbar function NIV helped sleep symptoms but not survival.'],
 [3,'Which threshold is shared by most published NIV guidance?',['FVC below 95%','FVC below 50% predicted','SpO2 below 99%','Peak cough flow above 400 L/min'],1,'FVC below 50% and SNIP around 40 cmH2O recur, and several guidelines also use FVC below 80% with symptoms.'],
 [3,'According to AAN 2009, clinicians recommend cough assist devices when peak cough flow falls below:',['270 L/min','600 L/min','50 L/min','1000 L/min'],0,'Flows above 160 L/min are needed to clear secretions.'],
 [3,'In ProGas, what was linked to shorter survival after gastrostomy?',['Choosing RIG rather than PEG','A family history of ALS','Weight loss of more than 10% before the procedure','Age under 50'],2,'Median survival was 7.7 against 12 months. 30-day mortality was 4% overall and similar for PEG and RIG.'],
 [4,'About what share of people with ALS meet criteria for frontotemporal dementia?',['About 1%','About 50%','About 80%','About 14-15%'],3,'About 14-15% meet FTD criteria, while about half show some cognitive or behavioural change.'],
 [4,'The ECAS is:',['A breathing test','A 15-20 minute cognitive and behavioural screen designed for people with physical disability','A genetic panel','A swallowing scale'],1,'It scores ALS-specific and non-specific functions and includes a carer interview about behaviour.'],
 [4,'Pseudobulbar affect is:',['Uncontrollable laughing or crying that is excessive for the feeling behind it','Weakness of the tongue','A form of depression','Loss of eye movements'],0,'It is distinguished from depression. A CNS-LS score of 13 or more is the threshold used.'],
 [4,'What does NICE NG42 say about communication aids?',['Wait until speech is lost','Only high-tech aids should be offered','Assess and provide AAC without delay, with referral for eye-gaze access when needed','Communication is not part of MND care'],2,'NICE covers low-tech boards, voice-output aids and referral to a specialised AAC hub, with review as needs change.'],
 [4,'In Japanese studies, about what share of people on long-term tracheostomy ventilation developed a totally locked-in state?',['11-13%','50-60%','About 90%','Under 1%'],0,'No source gives a figure for all people with ALS; these figures apply only to long-term tracheostomy ventilation.'],
 [4,'What did a German and UK study of deaths in ALS find?',['Most people choked to death','Most died in intensive care','Morphine was never used','Most died peacefully and no one choked to death'],3,'88% (Germany) and 98% (UK) died peacefully. Breathlessness, cough, anxiety and restlessness were most common in the last 24 hours.'],
 [4,'Under UK guidance, withdrawing ventilation at the request of a person with capacity is:',['Assisted suicide','Illegal','The refusal of a medical treatment, which must be respected','Allowed only for tracheostomy ventilation'],2,'The APM guidance says the cause of death remains the advanced neurological disease.'],
 [4,'Why is supplemental oxygen used with extreme caution in ALS?',['It is a fire risk at home','It can raise CO2 in people with weak breathing muscles','It causes muscle cramps','It interacts with riluzole'],1,'In one study low-flow oxygen raised PaCO2 sharply. MND Association guidance accepts saturations of 88-92%.'],
 [4,'ESPEN describes flushing a feeding tube around medicines with:',['5 mL of milk','30 mL of water before, between and after each medicine','Cola','No flush at all'],1,'Medicines are given one at a time, and crushing is avoided whenever possible.'],
 [4,'The ATLAS trial tests tofersen in:',['People with C9orf72 ALS','People with late-stage ALS','Presymptomatic SOD1 carriers whose NfL starts rising','Healthy volunteers without variants'],2,'Its primary endpoint is clinically manifest ALS within 12 months. No results were available as of October 2026.'],
 [4,'What is a key feature of the HEALEY ALS Platform Trial?',['Each drug is tested for 10 years','It enrols only SOD1 carriers','It has no placebo group','Its regimens share placebo participants'],3,'Each regimen randomises 3:1 to drug or placebo. Zilucoplan, verdiperstat, CNM-Au8, pridopidine and trehalose were negative on its primary endpoint.'],
 [4,'Which statement fits stem cell clinics that sell unproven procedures for ALS?',['Professional bodies warn about them','They are approved for ALS in the EU','NurOwn showed clear benefit in phase 3','NICE requires them'],0,'The ISSCR and a JAMA Neurology viewpoint warn about untested treatments marketed by clinics. NurOwn missed its phase 3 primary endpoint.'],
 [5,'Who offered the term amyotrophic lateral sclerosis, in 1874?',['Aran','Duchenne','Charcot','Gehrig'],2,'ALS is still called Charcot\'s disease in many countries.'],
 [5,'In 1850, Aran described and named:',['Kennedy disease','Primary lateral sclerosis','Multiple sclerosis','Progressive muscular atrophy'],3,'A historian credits Aran with the clinical description and the name, although Duchenne later claimed priority.'],
 [5,'What did Charcot and Joffroy link to paralysis with atrophy?',['Lateral column lesions','Anterior horn lesions','Cerebellar lesions','Peripheral nerve lesions'],1,'Lateral column lesions went with paralysis and contractures, and anterior horn lesions with paralysis and atrophy.'],
 [5,'On 2 May 1939, Lou Gehrig:',['Ended his streak of 2130 consecutive games','Played his first professional game','Died','Became a team coach'],0,'He died on 2 June 1941. Film analysis suggests visible signs only after May 1938.'],
 [5,'Where was a very high incidence of ALS with parkinsonism-dementia recognised in the 1950s?',['Iceland','Guam','Sardinia','Finland'],1,'A registry began in 1958, and incidence fell over the next 40 years. The cycad toxin (BMAA) hypothesis remains contested.'],
 [5,'What was found in familial ALS in 1993?',['C9orf72 expansions','TDP-43 inclusions','SOD1 mutations','FUS mutations'],2,'11 SOD1 missense mutations were found in 13 families, making SOD1 the first ALS gene.'],
 [5,'Which ALS criteria were published in 1994?',['Gold Coast','Awaji-shima','ALS-FTSD','El Escorial'],3,'They were revised in 2000. Awaji followed in 2008, ALS-FTSD in 2017 and Gold Coast in 2020.'],
 [5,'When did the FDA approve riluzole?',['12 December 1995','1 January 1980','5 May 2017','25 April 2023'],0,'It was the first ALS drug approved in the US. 5 May 2017 is edaravone and 25 April 2023 is tofersen.'],
 [5,'Which protein was identified in 2006 as the major disease protein of ALS inclusions?',['SOD1','Tau','Amyloid beta','TDP-43'],3,'Neumann and colleagues found it in the ubiquitinated inclusions of both FTLD-U and ALS.'],
 [5,'What was discovered in 2011?',['The C9orf72 repeat expansion','The SOD1 gene','The ALSFRS-R','Riluzole'],0,'It explained 23.5% of familial ALS in one series and 46.0% of familial ALS in Finland.'],
 [5,'The 2014 Ice Bucket Challenge raised more than $100 million for the ALS Association. Part of it funded:',['The first riluzole trial','The El Escorial meeting','Project MinE','The Guam registry'],2,'In 2016 Project MinE investigators reported NEK1 risk variants in nearly 3% of ALS cases.'],
 [5,'Stephen Hawking lived about 55 years after his diagnosis in 1963. What does his course show?',['That ALS is usually slow','That a minority of people with ALS live much longer than the median','That tracheostomy cures ALS','That ALS is not progressive'],1,'Median survival is about 2 to 4 years, but 10-20% lived more than 10 years in a systematic review. His course sits at the far end of that range.']
];
const GL=[
 ['AAC (augmentative and alternative communication)','Any way of communicating that adds to or replaces speech, from alphabet and picture boards to tablets with voice output and eye-gaze systems.','living'],
 ['Accelerated approval','A US FDA pathway that approves a drug on a surrogate endpoint thought reasonably likely to predict clinical benefit. Continued approval may depend on confirmatory trials.','tofersen'],
 ['Advance care planning','Discussing and recording in advance the care a person wants or does not want, such as ventilation, feeding tubes and place of death, while they can still communicate their wishes.','living'],
 ['ALS-FTD','ALS together with frontotemporal dementia. About 14-15% of people with ALS meet criteria for FTD.','what'],
 ['ALS-FTSD','ALS-frontotemporal spectrum disorder: the 2017 consensus framework that classifies cognitive and behavioural change in ALS, from ALS with cognitive or behavioural impairment to ALS-FTD.','dx'],
 ['ALSFRS-R','The revised ALS Functional Rating Scale: 12 everyday-function items scored 0-4, with a total from 0 to 48, where 48 is normal function.','course'],
 ['AMX0035','Sodium phenylbutyrate-taurursodiol (Relyvrio, Albrioza). It was approved in Canada and the US in 2022, then withdrawn after the phase 3 PHOENIX trial was negative.','drugs'],
 ['Amyotrophic lateral sclerosis (ALS)','A disease in which upper and lower motor neurons degenerate. Amyotrophic means muscle wasting, and lateral sclerosis means scarring of the lateral columns of the spinal cord. It is also called motor neurone disease (MND) and Charcot\'s disease.','what'],
 ['Anterior horn cell','A lower motor neuron in the front (anterior) grey matter of the spinal cord. Its axon runs out to skeletal muscle.','neurons'],
 ['Antisense oligonucleotide (ASO)','A short synthetic strand that pairs with a specific mRNA. Tofersen is one: it binds SOD1 mRNA so that the cell destroys it.','tofersen'],
 ['Aspiration','Food, drink or saliva going into the airway instead of the gullet. It can cause choking and pneumonia.','nutrition'],
 ['Awaji-shima criteria','A 2008 update of the El Escorial rules in which EMG findings count the same as clinical LMN signs, and fasciculation potentials count as denervation.','dx'],
 ['Babinski sign','An upward movement of the big toe when the sole of the foot is stroked; a sign of upper motor neuron damage.','neurons'],
 ['Betz cell','A large pyramidal neuron in layer 5 of the primary motor cortex; the classic upper motor neuron.','neurons'],
 ['BMAA','Beta-N-methylamino-L-alanine, an amino acid from cycad seeds proposed as a cause of ALS on Guam. The hypothesis is contested.','history'],
 ['Brain-computer interface (BCI)','A device that reads brain signals to control a computer or to produce speech. In ALS it is still research, mostly in single participants.','living'],
 ['Bulbar','Relating to the brainstem-controlled muscles of speech, chewing and swallowing. Bulbar-onset ALS starts with slurred speech or difficulty swallowing.','what'],
 ['C9orf72','A gene on chromosome 9 whose GGGGCC repeat expansion is the most common genetic cause of familial ALS and familial FTD in European populations.','genes'],
 ['Caregiver burden','The physical, emotional and financial strain on family carers. Studies link it to the person\'s behavioural change and to physical disability.','living'],
 ['CNS-LS','Center for Neurologic Study-Lability Scale: a 7-item self-report scale of laughing and crying lability. A score of 13 or more is the threshold used for pseudobulbar affect.','nursing'],
 ['Conduction block','A failure of nerve impulses to pass a point along a motor nerve. It argues against ALS and is the key finding in multifocal motor neuropathy.','ddx'],
 ['Corticospinal tract','The main pathway for voluntary movement, from the motor cortex to the spinal cord. Most of its fibres cross the midline at the pyramidal decussation.','neurons'],
 ['Cryptic exon','A hidden stretch of an intron that TDP-43 normally keeps out of mRNA. When TDP-43 leaves the nucleus, the cryptic exon is spliced in and can disrupt the message.','tdp43'],
 ['Delta-FS (ΔFS)','A progression rate at diagnosis: 48 minus the ALSFRS-R score, divided by the months since onset. Below 0.5 is usually called slower and above 1.0 faster.','course'],
 ['Diagnostic delay','The time from first symptom to diagnosis. In one US centre the median was 11.5 months.','dx'],
 ['Dipeptide repeat proteins','Short repeating protein chains, such as poly-GA, made from C9orf72 repeat RNA without a start codon. They form aggregates in neurons.','genes'],
 ['Dying-back hypothesis','The idea that motor neuron degeneration starts at the nerve terminal and neuromuscular junction and moves back toward the cell body. It rests mainly on mouse studies.','neurons'],
 ['Dying-forward hypothesis','The idea that overactive cortical neurons drive the death of lower motor neurons through glutamate. It rests mainly on human brain stimulation studies.','neurons'],
 ['Dysphagia','Difficulty swallowing. In one study that followed people for about 2 years, it reached 85% of people with ALS.','nutrition'],
 ['ECAS','Edinburgh Cognitive and Behavioural ALS Screen: a 15-20 minute screen of thinking and behaviour designed for people with physical disability.','living'],
 ['Edaravone','A free-radical scavenger given in cycles by IV infusion or as an oral suspension. It is approved in Japan, the US and Canada; the EU application was withdrawn.','drugs'],
 ['El Escorial criteria','Criteria published in 1994 and revised in 2000 that grade ALS as possible, probable or definite by the number of regions with UMN and LMN signs. They were designed for clinical trials.','dx'],
 ['EMG (electromyography)','A needle test of the electrical activity of muscle. In ALS it shows ongoing denervation and chronic reinnervation.','dx'],
 ['ENCALS model','A European prediction model that combines 8 factors, such as onset site, age, progression rate and C9orf72 status, to predict the time to long-term ventilation or death.','course'],
 ['Excitotoxicity','Damage to neurons from overstimulation by glutamate. It is one proposed mechanism in ALS and part of the rationale for riluzole.','neurons'],
 ['Familial ALS','ALS that runs in a family. It makes up about 5% of ALS in population registers and 10-15% in other sources, depending on the definition.','genes'],
 ['Fasciculation','A visible twitch of a group of muscle fibres. It is common in ALS but also occurs in healthy people; in benign fasciculation syndrome, people followed for years did not develop ALS.','neurons'],
 ['Fibrillation potential','A small spontaneous EMG discharge from a single denervated muscle fibre; a sign of ongoing denervation.','dx'],
 ['Flail arm','An ALS phenotype with weakness concentrated in the arms. In a London cohort it carried longer survival than typical limb onset.','what'],
 ['Frontotemporal dementia (FTD)','A dementia that changes behaviour, language or executive function. It shares TDP-43 pathology and genes such as C9orf72 with ALS.','living'],
 ['FUS','An RNA-binding protein gene. FUS variants can cause young-onset and often rapid ALS, sometimes arising new (de novo) in the person.','genes'],
 ['FVC (forced vital capacity)','The most air a person can blow out after a full breath, given as a percentage of the predicted value. A falling FVC tracks breathing muscle weakness.','breathing'],
 ['Gastrostomy','A feeding tube placed through the abdominal wall into the stomach (PEG, RIG or PIG). It does not stop a person eating by mouth.','nutrition'],
 ['Genetic counselling','A discussion before and after a genetic test about inheritance, penetrance, what results can mean and their effects on the family. The 2023 consensus says it should be offered to everyone with ALS.','genes'],
 ['Gold Coast criteria','Diagnostic criteria proposed in 2020: progressive motor impairment, UMN and LMN signs in 1 region or LMN signs in 2, and exclusion of other diseases. The result is ALS or not ALS.','dx'],
 ['Guam ALS-PDC','A cluster of ALS and parkinsonism-dementia complex on the island of Guam, very common from the 1950s and declining since.','history'],
 ['HEALEY ALS Platform Trial','A US platform trial: one master protocol that tests several drugs, with shared placebo participants and a combined function-and-survival endpoint.','cure'],
 ['Hoffmann sign','Flicking the tip of a finger makes the thumb flex; a sign of upper motor neuron damage.','neurons'],
 ['Hypermetabolism','Burning more energy at rest than predicted. About 41-50% of people with ALS were hypermetabolic in studies.','nutrition'],
 ['IDDSI','International Dysphagia Diet Standardisation Initiative: an 8-level scale (0 to 7) for the texture of food and drink.','nutrition'],
 ['Inclusion body myositis (IBM)','A slow muscle disease of older adults that weakens the quadriceps and finger flexors. It can mimic ALS, and muscle biopsy is the key test.','ddx'],
 ['Intrathecal','Into the cerebrospinal fluid, usually by lumbar puncture. Tofersen is given this way.','tofersen'],
 ['Kennedy disease (SBMA)','Spinal and bulbar muscular atrophy: an X-linked condition in men with lower motor neuron signs only, confirmed by a CAG expansion in the androgen receptor gene.','ddx'],
 ['King\'s staging','A staging system that counts the regions involved (stages 1 to 3), then the need for gastrostomy (4A) or non-invasive ventilation (4B).','course'],
 ['Locked-in state','Being aware but having lost almost all voluntary movement; in a totally locked-in state eye movements are lost too. It occurs in a minority of people on long-term tracheostomy ventilation.','living'],
 ['Lou Gehrig\'s disease','A common US name for ALS, after the baseball player who ended his playing streak in 1939 and died in 1941.','history'],
 ['Lower motor neuron (LMN)','A motor neuron in the brainstem or the anterior horn of the spinal cord whose axon reaches the muscle. Its loss causes weakness, wasting and fasciculations.','neurons'],
 ['MI-E (mechanical insufflation-exsufflation)','A cough assist machine that blows air into the lungs and then pulls it out quickly to clear secretions.','breathing'],
 ['Mimic','Another condition that looks like ALS. In population registers, about 7-10% of people first registered with ALS turned out to have another condition.','ddx'],
 ['MiToS staging','Milano-Torino staging: counts how many of four functional domains (movement, swallowing, communicating, breathing) have lost independence, from stage 0 to stage 5 (death).','course'],
 ['Motor unit','One lower motor neuron and all the muscle fibres its axon supplies.','neurons'],
 ['Multidisciplinary clinic','A clinic where neurologists, nurses, therapists, dietitians and others see the person together. Attendance is linked to longer survival in observational studies.','nursing'],
 ['Multifocal motor neuropathy (MMN)','A treatable pure motor nerve disorder with conduction block and weakness greater than wasting. It responds to IVIG.','ddx'],
 ['Neurofilament light (NfL)','A structural nerve protein released into body fluids when axons are damaged. Levels are high in ALS but not specific to it, and tofersen lowered them.','dx'],
 ['Neuromuscular junction','The synapse where a motor nerve terminal meets a muscle fibre.','neurons'],
 ['NIV (non-invasive ventilation)','Breathing support through a mask, usually started at night. NICE says it can be stopped at any time.','breathing'],
 ['Onuf\'s nucleus','The sacral motor neurons that control the bladder and bowel sphincters. They are well preserved in ALS.','neurons'],
 ['Orthopnoea','Breathlessness when lying flat; a sign of diaphragm weakness.','breathing'],
 ['Palliative care','Care that focuses on comfort, symptoms and quality of life. International guidelines describe a palliative approach in ALS from diagnosis.','living'],
 ['Peak cough flow','How fast air leaves the lungs during a cough. AAN 2009 cites more than 160 L/min as needed to clear secretions.','breathing'],
 ['PEG (percutaneous endoscopic gastrostomy)','A gastrostomy placed with the help of an endoscope passed through the mouth. In ProGas, 30-day mortality after PEG was 3%.','nutrition'],
 ['Penetrance','The chance that a person who carries a disease variant develops the disease. For C9orf72, family-based and population-based studies give different estimates.','genes'],
 ['Phenoconversion','The change from carrying an ALS gene variant without symptoms to having clinically manifest disease.','cure'],
 ['Primary lateral sclerosis (PLS)','A rare, slowly progressive disease of the upper motor neurons only. It does not meet the Gold Coast criteria for ALS.','ddx'],
 ['Progressive muscular atrophy (PMA)','Motor neuron disease with only lower motor neuron signs. It counts as ALS under the Gold Coast criteria.','what'],
 ['Project MinE','An international ALS genetics research project, part-funded by the 2014 Ice Bucket Challenge. In 2016 its investigators reported NEK1 risk variants.','history'],
 ['Pseudobulbar affect','Uncontrollable laughing or crying that is excessive for the feeling behind it. It is classically linked to corticobulbar (upper motor neuron) damage.','living'],
 ['RIG (radiologically inserted gastrostomy)','A gastrostomy placed under X-ray guidance. In ProGas its 30-day mortality was similar to PEG.','nutrition'],
 ['Riluzole','A tablet, suspension or film taken twice daily that is thought to reduce glutamate release. Trials show it extends median survival by about 2-3 months.','drugs'],
 ['Sialorrhoea','Drooling. In MND it comes from poor clearance of saliva due to swallowing difficulty, not from making extra saliva.','nursing'],
 ['SNIP (sniff nasal inspiratory pressure)','The pressure measured in the nose during a sharp sniff, a test of diaphragm strength. Around 40 cmH2O is a common NIV trigger.','breathing'],
 ['SOD1','The gene for copper-zinc superoxide dismutase, the first ALS gene found (1993). Its variants act through a toxic gain of function.','genes'],
 ['Spasticity','A velocity-dependent increase in muscle tone (stiffness) from upper motor neuron damage.','neurons'],
 ['Split hand','Wasting of the thumb-side (lateral) hand muscles with relative sparing of the little-finger side, typical of ALS.','neurons'],
 ['Sporadic ALS','ALS with no known affected relative. Some people with sporadic ALS still carry a pathogenic variant in an ALS gene.','what'],
 ['STMN2','The gene for stathmin-2, a microtubule protein that axons need to grow and repair. Loss of nuclear TDP-43 truncates its mRNA.','tdp43'],
 ['Surrogate endpoint','A laboratory or imaging measure used in place of a clinical outcome. The US approval of tofersen rested on lower plasma NfL.','tofersen'],
 ['TDP-43','An RNA-binding protein encoded by TARDBP. It is lost from the nucleus and builds up in cytoplasmic inclusions in about 97% of ALS.','tdp43'],
 ['Tofersen','An intrathecal antisense drug (Qalsody) for adults with SOD1-ALS that lowers SOD1 protein.','tofersen'],
 ['Tracheostomy ventilation','Long-term ventilation through a tube placed in the windpipe. Its use varies widely between countries.','breathing'],
 ['UNC13A','A gene for a synapse protein. Loss of nuclear TDP-43 lets a cryptic exon into its mRNA, and common ALS risk variants make this worse.','tdp43'],
 ['Upper motor neuron (UMN)','A motor neuron whose cell body is in the motor cortex and whose axon runs in the corticospinal or corticobulbar tract.','neurons'],
 ['Variant of uncertain significance (VUS)','A genetic change whose link to disease is not yet known. It may or may not contribute, and its interpretation can change over time.','genes'],
 ['Voice banking','Recording one\'s own speech so that a synthetic version of the voice can be used later in a speech-generating device.','living']
];
/*%%/REVIEW-DATA%%*/
const AREAN={A:'Epidemiology, course & history',B:'Mechanism',C:'Genetics',D:'Diagnosis',E:'Drugs',F:'Breathing & nutrition',G:'Living & end of life',H:'Nursing care',I:'Research & cure'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all',RV.allCards],...Object.keys(PARTN).map(k=>[k,UI.part(k)])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');if(!c)return;
    $('#fcTagF').textContent=PARTN[c[0]]+' · '+RV.question;$('#fcTagB').textContent=PARTN[c[0]]+' · '+RV.answer;
    $('#fcFront').textContent=c[1];$('#fcBack').textContent=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',flip);$('#fcFlip').onclick=flip;
  const next=()=>{if(!deck.length)return;i=(i+1)%deck.length;render()},prev=()=>{if(!deck.length)return;i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=MN.map(m=>`<div class="card"><b class="big">${m[0]}</b><p>${m[1]}</p></div>`).join('');
};
inits.quiz=()=>{
  const F=[['mix',RV.mixed],...Object.keys(PARTN).map(k=>[k,UI.part(k)])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">${RV.finished}</div><div class="q">${RV.scored(score,list.length,pct)}</div><p>${RV.verdict(pct)}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">${RV.again}</button><button class="btn" data-go="review">${RV.toCards}</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>${RV.qOf(i+1,list.length)}</span><span>${RV.scoreIs(score)}</span><span>${PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?RV.right:RV.wrong}</b> ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?RV.nextQ:RV.results}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  function render(){const q=inp.value.trim().toLowerCase();const L=GL.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${amp(tname(g[2]))}</button></div>`).join('')||`<p>${RV.noTerms}</p>`;
    $('#glCount').textContent=RV.termsOf(L.length,GL.length)}
  inp.addEventListener('input',render);render();
};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all',RV.all]].concat(Object.entries(AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||s.areas.includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q));if(!show)return'';n++;
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · '+RV.also+' '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${s.link?`<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${s.areas.map(a=>`<span class="tag steel">${AREAN[a]||a}</span>`).join('')}${s.unverified?`<span class="tag warn">${RV.check}</span>`:''}</span></li>`}).join('');
    $('#srcCount').textContent=RV.srcOf(n,SOURCES.length)}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};
