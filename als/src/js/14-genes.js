/* =============== 1.4 genes: C9orf72, SOD1 and more =============== */
const GE_TXT={
  genes:[ ['c9','C9orf72'],['sod1','SOD1'],['tardbp','TARDBP'],['fus','FUS'] ],
  aria:{
    c9:`Animation: the GGGGCC repeat in intron 1 of C9orf72 grows from a few units to about a thousand while a dial shows the usual, disputed and expanded ranges; then a neuron shows three proposed routes to damage (less C9orf72 protein, RNA foci, dipeptide repeat proteins) converging on TDP-43 pathology.`,
    sod1:`Animation: the SOD1 copper-zinc dimer converts superoxide; an ALS variant makes the metal-free dimer split into monomers that misfold and clump into ubiquitin-tagged aggregates without TDP-43.`,
    tardbp:`Animation: TARDBP makes TDP-43; variants in its C-terminal region are marked, then TDP-43 leaves the nucleus and clumps in the cytoplasm.`,
    fus:`Animation: FUS, an RNA-binding protein of the nucleus, carries variants at its C-terminal end; the changed protein builds up in the cytoplasm as FUS inclusions, without TDP-43 clumps.`},
  c9:{title:`C9orf72 gene, chromosome 9`,band:`9p21`,unit:`GGGGCC`,unitLbl:`one repeat unit`,exon1:`exon 1`,intron:`intron 1`,later:`later exons`,more:`more units than drawn`},
  dial:{title:`Repeat units in one copy`,units:`repeat units`,zone:{good:`usual range`,warn:`disputed range`,bad:`expanded`},
    leg:{good:`under 20: usual`,warn:`20–29: disputed`,bad:`30 or more: expanded`,pt:`700–1600: first patients`,ia:`24–30: linked to ALS in one meta-analysis`,brk:`even steps up to 40, compressed above`}},
  cell:{cell:`one neuron (schematic)`,nuc:`nucleus`,cyt:`cytoplasm`,usual:`usual copy`,exp:`expanded copy`,prot1:`C9orf72 protein:`,prot2:`less is made`,foci:`RNA foci`,ribo:`ribosome`,agg:`DPR clumps`,tdp:`TDP-43`},
  routes:{title:`Three proposed routes`,r:[ [`Less C9orf72 protein`,`loss of function`],[`RNA foci`,`toxic repeat RNA, both strands`],[`Dipeptide repeat proteins`,`sense GA GP GR · antisense PR PA GP`],[`TDP-43 pathology`,`ALS, FTD or both`] ]},
  sod1:{title:`SOD1 gene, chromosome 21`,band:`21q`,a5v:`p.A5V (A4V)`,d91a:`p.D91A (D90A)`,g93a:`G93A (mouse model)`,n180:`over 180 variants reported`,
    head:[`SOD1 dimer: a copper-zinc enzyme`,`Variant: the metal-free dimer splits`,`Misfolded monomers clump`,`Clumps without TDP-43`],
    cu:`Cu`,zn:`Zn`,rx1:`superoxide`,rx2:`O₂ + H₂O₂`,variant:`variant`,apo:`metals lost (apo state)`,agg:`aggregate`,ub:`Ub`,noTdp:`no TDP-43`,target:`a separate route: SOD1 itself is the target`,
    pan:{h1:`Why a gain of function?`,ev:[ [`Knockout mice: no ALS`,`losing the enzyme is not enough`],[`G93A mice: paralysis`,`enzyme activity barely changed`],[`More or less normal SOD1`,`no change in mutant mice`],[`Homozygous p.D91A (D90A)`,`red-cell activity essentially normal`] ],
      h2:`Median survival by variant`,a5v:`p.A5V (A4V)`,oth:`other variants`,yrs:n=>`${n} years`,h3:`Pathology`,p1:`ubiquitin-positive inclusions`,p2:`no TDP-43 inclusions`}},
  pct:v=>`${v}%`,scale10:`bar scale: 0 to 10%`,
  ps:{prot:`protein`,variant:`changed protein`},
  ped:{title:`An example family with a C9orf72 expansion`,gen:[`I`,`II`,`III`],gf1:`carrier,`,gf2:`no symptoms`,aff:`ALS`,
    kids1:`each child: 50% chance of carrying it`,kids2:a=>`now aged ${a}`,
    iconsT:a=>`100 children of carrier parents, at age ${a}`,
    non:n=>`${n} without the expansion`,car:n=>`${n} carry it, no ALS or FTD yet`,aff2:n=>`${n} carry it and have ALS or FTD`,
    noPop:`UK Biobank gives a figure for age 80 only`,basisF:`family-based curve`,basisP:`UK Biobank, ALS or dementia by 80`,
    chart:`Penetrance: share of carriers affected`,ageAx:`age (years)`,p35:`none before 35`,p58:`50% by 58`,p83:`99.5% by 83`,
    ukb1:`66%`,ukb2:`58%`,legF:`family-based: dots published, line interpolated`,legP:`UK Biobank: by 80, and allowing for other deaths`,
    r1:`chance a child inherits the expansion`,r2:a=>`share of carriers affected by age ${a}`,r3:a=>`chance of ALS or FTD by age ${a}`,
    about:n=>`about ${n}%`,exact:n=>`${n}%`,none:`no figure`,
    nPub:`published point`,nInt:`interpolated between published points`,nPop80:`29% if deaths from other causes are allowed for`,nPopNo:`UK Biobank reports age 80 only`,
    eq:`child's chance = 50% × penetrance at that age`,
    vt:(a,st)=>`Age ${a}: ${st}`},
  anc:{opts:[ ['eu','Europe'],['as','Asia'] ],fam:v=>`familial ALS: ${v}%`,spo:v=>`sporadic ALS: ${v}%`}
};
const GE_STEPS={
 c9:[
  {from:0,at:.06,k:`Step 1 · Normal`,t:`A short GGGGCC repeat`,
   txt:`<i>C9orf72</i> sits on chromosome 9p21. Its first intron carries a run of the six DNA letters GGGGCC. In the discovery paper controls had 2 to 23 units; the second discovery paper split alleles into wild-type (fewer than 20) and expanded (more than 30), with controls averaging 2. [[DeJesusHernandez2011,Renton2011]]`,
   pt:`Everyone has this short stutter of six DNA letters in the <i>C9orf72</i> gene. In most people it repeats only a few times.`,
   hook:`The <i>C9orf72</i> expansion is a <b>noncoding GGGGCC hexanucleotide repeat in intron 1</b>, on 9p21. [[DeJesusHernandez2011,Renton2011]]`},
  {from:.2,at:.36,k:`Step 2 · Expansion`,t:`Hundreds to thousands of repeats`,
   txt:`In carriers the repeat has grown to hundreds or thousands of units: Southern blotting estimated about 700–1600 in the first patients measured. All 262 carriers haplotyped in a 2012 screen shared the Finnish founder haplotype, pointing to one expansion event about 1500 years ago. Repeat size varies between tissues and over time, yet blood DNA is judged enough for testing. [[DeJesusHernandez2011,Majounie2012,Roggenbuck2023]] <span class="tag warn">Controversy</span> Alleles of 20–29 have contradictory evidence, and the 2023 consensus says no validated cut-off exists; a meta-analysis linked 24–30 to ALS and proposed 24 or more as pathogenic. [[Roggenbuck2023,Iacoangeli2019]]`,
   pt:`In people with the expansion, the stutter repeats hundreds or thousands of times. The middle range, 20 to 29, is a grey zone that experts still disagree about.`,
   hook:`Commonest genetic cause of ALS and FTD in European ancestry: in white patients, 39.3% of familial and 7.0% of sporadic ALS; none of 360 sporadic cases from Asia and the Pacific. [[Majounie2012]]`},
  {from:.4,at:.48,k:`Step 3 · Route 1`,t:`Less C9orf72 protein`,
   txt:`The expanded copy yields less of one <i>C9orf72</i> transcript, so less C9orf72 protein is made: loss of function through haploinsufficiency. [[DeJesusHernandez2011,Balendra2018]] <span class="ev est">Established</span> finding: the reduced transcript. <span class="ev hyp">Hypothesis</span> how much this loss drives disease; it is one of three proposed mechanisms, and processes inside and outside the neuron probably both contribute. [[Balendra2018]]`,
   pt:`The long repeat gets in the way, so the cell makes less of the normal C9orf72 protein.`,
   hook:`Three proposed <i>C9orf72</i> mechanisms: <b>loss of function</b>, <b>toxic repeat RNA</b>, <b>toxic dipeptide repeat proteins</b>. [[Balendra2018]]`},
  {from:.55,at:.63,k:`Step 4 · Route 2`,t:`RNA foci in the nucleus`,
   txt:`The repeat is read in both directions, and repeat RNA from each strand (GGGGCC sense, GGCCCC antisense) gathers into nuclear foci: a toxic gain of function by RNA. [[DeJesusHernandez2011,Zu2013,Balendra2018]] <span class="ev est">Established</span> foci are seen in patient tissue. <span class="ev hyp">Hypothesis</span> one proposed way they harm the cell, drawn here, is by holding RNA-binding proteins away from their normal work.`,
   pt:`Copies of the repeat message pile up in the nucleus as little clumps, which may soak up proteins the cell needs.`,
   hook:`RNA foci come from <b>both</b> strands: sense GGGGCC and antisense GGCCCC. [[Zu2013]]`},
  {from:.68,at:.78,k:`Step 5 · Route 3`,t:`Dipeptide repeat proteins`,
   txt:`Repeat RNA is translated without a start codon (repeat-associated non-ATG, or RAN, translation) in every reading frame. The sense strand gives poly-GA, poly-GP and poly-GR; the antisense strand gives poly-PR, poly-PA and poly-GP. They aggregate in frontal and motor cortex, hippocampus and spinal cord, and most inclusions contain poly-GA. [[Mori2013,Zu2013]] <span class="ev est">Established</span> in patient tissue; <span class="ev hyp">Hypothesis</span> how much each one contributes.`,
   pt:`The cell's protein-making machinery reads the repeat even though it should not, and makes short, sticky two-letter protein chains that clump.`,
   hook:`RAN translation: protein made <b>without a start codon</b>, giving <b>six</b> dipeptide repeat proteins from the two strands. [[Zu2013,Mori2013]]`},
  {from:.84,at:.94,k:`Step 6 · Where the routes meet`,t:`TDP-43 pathology: ALS, FTD or both`,
   txt:`<i>C9orf72</i> cases, like most ALS, show TDP-43 pathology. [[DeJesusHernandez2011,Neumann2006]] Carriers can develop ALS, FTD or both. In an Irish population cohort, carriers had earlier onset (mean 56.3 vs 61.3 years), more FTD (50% vs 12%) and shorter survival (20 vs 26 months; hazard ratio 1.9), and 86% had a family history of ALS or FTD. [[Byrne2012]] Psychotic and other psychiatric symptoms are more common in carriers, though the expansion "does not appear to directly cause" primary psychiatric disorders. [[Silverman2019]] More in <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>.`,
   pt:`All three routes end in the same protein trouble seen in most ALS. The same gene change can affect movement, thinking and behaviour, or both.`,
   hook:`<i>C9orf72</i> joins ALS and FTD: 24.8% of white Europeans with familial FTD carried the expansion. [[Majounie2012]]`}
 ],
 sod1:[
  {from:0,at:.08,k:`Step 1 · The normal enzyme`,t:`A copper-zinc dimer`,
   txt:`<i>SOD1</i> was the first ALS gene: in 1993, linkage to chromosome 21q led to 11 different <i>SOD1</i> missense mutations in 13 families. The enzyme is a cytosolic copper-zinc homodimer that converts superoxide into oxygen and hydrogen peroxide. [[Rosen1993]] Over 180 variants have now been reported across the gene; reliable evidence of pathogenicity exists for only some. [[OpieMartin2022]]`,
   pt:`SOD1 is a clean-up enzyme made of two matching halves. It holds copper and zinc and neutralises a harmful form of oxygen.`,
   hook:`<i>SOD1</i>: the <b>first ALS gene (1993)</b>, on chromosome 21q. [[Rosen1993]]`},
  {from:.25,at:.4,k:`Step 2 · A variant`,t:`The metal-free dimer comes apart`,
   txt:`Five ALS-linked mutants (A4V, C6F, D90A, G93A, G93C) all made the metal-free (apo) protein much less stable, and the greater the loss of stability, the shorter the survival of people carrying it. Oxidised normal and mutant SOD1 both split from dimers into monomers before aggregating. [[Lindberg2002,Rakhit2004]] <span class="ev early">Early evidence</span> from laboratory protein studies. Names: modern numbering counts the first methionine, so legacy A4V is p.A5V and D90A is p.D91A. [[OpieMartin2022]]`,
   pt:`A changed SOD1 is wobbly, especially before it picks up its metals, and the two halves fall apart.`,
   hook:`Legacy and HGVS names: <b>A4V = p.A5V</b>, <b>D90A = p.D91A</b>. Same variants, different counting. [[OpieMartin2022]]`},
  {from:.5,at:.66,k:`Step 3 · Misfolding`,t:`Misfolded monomers clump: a toxic gain`,
   txt:`Mice carrying human G93A SOD1, a change with little effect on enzyme activity, lost motor neurons and died by 5–6 months. [[Gurney1994]] Mice with no SOD1 at all developed normally, with no overt motor deficit by 6 months. [[Reaume1996]] Adding or removing normal SOD1 did not change disease in mutant mice, and SOD1 aggregates were common to different mutants. [[Bruijn1998]] People homozygous for D90A had essentially normal red-cell enzyme activity. [[Andersen1995]] <span class="ev est">Established</span> in animal models.`,
   pt:`The problem is not too little enzyme. The bent protein itself does harm.`,
   hook:`<i>SOD1</i>-ALS is a <b>toxic gain of function</b>, not a loss of enzyme activity. [[Bruijn1998,Reaume1996]]`},
  {from:.75,at:.9,k:`Step 4 · A separate path`,t:`Inclusions without TDP-43`,
   txt:`None of 15 <i>SOD1</i> cases had TDP-43 inclusions, although they had ubiquitin-positive ones, so <i>SOD1</i>-ALS "may not be the familial counterpart of sporadic ALS". [[Mackenzie2007]] Survival depends on the variant: median 1.2 years with A4V against 6.8 years with other variants in North America. [[Bali2017]] Homozygous D90A starts in the legs and spreads slowly (mean survival 13 years in 11 people who had died, which the authors call probably biased low). [[Andersen1996]] Onset and duration are "decoupled": mean onset 48.9 vs 61.1 years, median duration 27.7 vs 35.1 months, or 45 months without p.A5V. [[OpieMartin2022]] Because the pathway is gene-defined, SOD1 itself is a target: tofersen lowered CSF SOD1 and neurofilament light in VALOR but missed its primary end point. [[Miller2022]] See <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>.`,
   pt:`In SOD1-ALS the clumps are made of SOD1, not TDP-43. That is why a drug that lowers SOD1 could be tested.`,
   hook:`<i>SOD1</i>-ALS: <b>no TDP-43 inclusions</b>, unlike most ALS. p.A5V (A4V): median survival <b>1.2 years</b> against 6.8 with other variants. [[Mackenzie2007,Bali2017]]`}
 ],
 tardbp:[
  {from:0,at:.08,k:`Step 1 · The protein`,t:`TARDBP makes TDP-43`,
   txt:`TDP-43 is the protein found in the inclusions of most ALS, identified in 2006. [[Neumann2006]] In 2008, mutations in its gene, <i>TARDBP</i>, were found in sporadic and familial ALS, in a conserved region of the protein. [[Sreedharan2008]]`,
   pt:`This gene makes TDP-43, the same protein that clumps in most people with ALS, with or without a gene change.`,
   hook:`<i>TARDBP</i> encodes <b>TDP-43</b>: the gene behind the protein seen in most ALS. [[Sreedharan2008,Neumann2006]]`},
  {from:.33,at:.45,k:`Step 2 · Variants`,t:`Changes in the C-terminal region`,
   txt:`M337V segregated with disease in a family linked to chromosome 1p36. [[Sreedharan2008]] Variants cluster in the C-terminal region, and A382T is frequent in Sardinia because of a founder effect; <i>TARDBP</i> families can have ALS or FTD. [[Renton2014]] In Europe, 4.2% of familial and 0.8% of sporadic ALS carry a <i>TARDBP</i> variant, and the 2023 consensus gives about 1% overall. [[Zou2017,Roggenbuck2023]]`,
   pt:`Most changes sit in the tail end of the protein.`,
   hook:`Founder variant: <b>A382T</b> in Sardinia. [[Renton2014]]`},
  {from:.66,at:.85,k:`Step 3 · Pathology`,t:`TDP-43 leaves the nucleus and clumps`,
   txt:`As in most ALS, TDP-43 builds up outside the nucleus as inclusions; all <i>SOD1</i>-negative familial cases in one pathology series had TDP-43-positive inclusions. [[Mackenzie2007]] ClinGen rates <i>TARDBP</i> as definitively linked to ALS. [[ClinGen2026]] The step-by-step story is in <a href="#tdp43" data-go="tdp43">TDP-43 and what goes wrong</a>.`,
   pt:`The changed protein moves out of the cell's control centre and sticks together in the rest of the cell.`,
   hook:`Every minimum test panel includes four genes: <i>C9orf72</i>, <i>SOD1</i>, <i>FUS</i> and <i>TARDBP</i>. [[Roggenbuck2023]]`}
 ],
 fus:[
  {from:0,at:.08,k:`Step 1 · The protein`,t:`FUS, an RNA-binding protein`,
   txt:`<i>FUS</i> lies on chromosome 16; 13 mutations specific to familial ALS were reported in 2009. [[Kwiatkowski2009]] FUS normally works mostly in the nucleus, handling RNA.`,
   pt:`FUS is a helper protein that works with the cell's messages, mostly inside the nucleus.`,
   hook:`<i>FUS</i>: chromosome 16, reported as an ALS gene in 2009. [[Kwiatkowski2009]]`},
  {from:.33,at:.45,k:`Step 2 · Variants`,t:`Changes at the C-terminal end`,
   txt:`In a genotype-phenotype meta-analysis, 90% of <i>FUS</i> mutations lay in the C-terminal domain and median onset was 39 years (range 11–80). P525L and truncating or frameshift variants most often caused juvenile onset and rapid progression, often without a family history; R521 variants were linked to later onset and a pure spinal form. [[Naumann2019]] An 11-year-old with a de novo P525L variant needed a tracheostomy 14 months after onset. [[Conte2012]]`,
   pt:`Most changes sit at the very end of the protein. Some cause ALS in teenagers and young adults.`,
   hook:`Young person, no family history, fast course: <b><i>FUS</i></b> (P525L, often de novo). [[Naumann2019,Hubers2015]]`},
  {from:.66,at:.85,k:`Step 3 · Pathology`,t:`FUS builds up in the cytoplasm`,
   txt:`Mutant FUS accumulated in the cytoplasm of neurons. [[Kwiatkowski2009]] <i>FUS</i> cases show FUS-positive inclusions without TDP-43-positive aggregates, though "some debate remains". [[Renton2014]] Share of ALS: Europe 2.8% of familial and 0.3% of sporadic; Asia 6.4% and 0.9%. [[Zou2017]] Among 14 people with sporadic ALS starting before 35, 6 carried a <i>FUS</i> variant, and in all 5 families tested it was new in the child. [[Hubers2015]]`,
   pt:`The changed FUS stays outside the nucleus and clumps. Here the clumps are FUS, not TDP-43.`,
   hook:`<i>FUS</i>-ALS: <b>FUS inclusions, not TDP-43</b> (some debate). [[Renton2014]]`}
 ]
};
/* TARDBP and FUS share one drawing: a protein bar with variant pins, a neuron, a facts panel */
const GE_PS={
 tardbp:{title:`TARDBP (chromosome 1p36) makes TDP-43`,glyph:'tdp',
  seg:[ [0,.2,`N-terminal`,'var(--panel-2)'],[.24,.42,`RRM1`,'var(--steel-soft)'],[.45,.63,`RRM2`,'var(--steel-soft)'],[.67,1,`C-terminal region`,'var(--tdp-soft)'] ],
  pins:[ [.81,`M337V`,-1],[.92,`A382T`,-1] ],note:`variants cluster in the C-terminal region`,
  prot:`TDP-43`,agg:`TDP-43 clumps`,
  pan:{h1:`Share of ALS, 2017 meta-analysis`,bars:[ [`Europe, familial`,4.2],[`Europe, sporadic`,.8] ],h2:`Notes`,
   lines:[`about 1% of ALS overall`,`(2023 US consensus)`,`seen in ALS and FTD families`,`A382T: Sardinian founder`,`ClinGen: Definitive`]}},
 fus:{title:`FUS (chromosome 16) makes FUS`,glyph:'fus',
  seg:[ [0,.38,`N-terminal region`,'var(--panel-2)'],[.42,.66,`RNA-binding`,'var(--steel-soft)'],[.7,1,`C-terminal end`,'var(--tdp-soft)'] ],
  pins:[ [.99,`R521`,-1],[.998,`P525L`,1] ],note:`C-terminal domain: 90% of variants`,
  prot:`FUS`,agg:`FUS inclusions`,noTdp:`no TDP-43`,
  pan:{h1:`Share of ALS, 2017 meta-analysis`,bars:[ [`Europe, familial`,2.8],[`Europe, sporadic`,.3],[`Asia, familial`,6.4],[`Asia, sporadic`,.9] ],h2:`Notes`,
   lines:[`median onset 39 years`,`(range 11–80)`,`P525L: juvenile, rapid,`,`often new in the child (de novo)`,`R521: later onset, spinal`,`FUS inclusions, no TDP-43`,`(some debate remains)`]}}
};
/* the age slider runs 30 to 85; steps sit on the published ages */
const GE_PDS=[
 {from:0,at:0,k:`Age 30 · Inheritance`,t:`A 50:50 chance for each child`,
  txt:`"Each child of an individual with C9orf72-FTD/ALS has a 50% chance of inheriting" the expansion. Almost everyone with <i>C9orf72</i> disease inherited it from a parent, who may be unaffected because penetrance is age-dependent and reduced, as with the grandfather here. [[GossyeGeneReviews]]`,
  pt:`Each child has a 1 in 2 chance of getting the changed copy. Getting it is not the same as getting ALS.`,
  hook:`A child of a carrier has a <b>50% chance of inheriting</b> the expansion, but a lower chance of ALS or FTD: <b>50% × penetrance</b> at that age. By 80 that is close to 50% with family-based figures and about 29–33% with UK Biobank figures (arithmetic from the cited numbers, not a published risk). [[GossyeGeneReviews,Majounie2012,Gao2025]]`},
 {from:.07,at:.0909,k:`Age 35 · Early adulthood`,t:`Before 35: no carriers affected`,
  txt:`In a Kaplan-Meier analysis of 603 carriers, the expansion was non-penetrant before age 35. [[Majounie2012]] The family-based curve stays flat until then.`,
  pt:`In the big family studies, nobody with the expansion became ill before 35.`,
  hook:`<i>C9orf72</i> penetrance: <b>0 before 35, 50% by 58</b>, almost complete by 80 in family-based data. [[Majounie2012]]`},
 {from:.4,at:.5091,k:`Age 58 · Midlife`,t:`By 58: half of carriers`,
  txt:`The same analysis found 50% penetrance by 58. A 2017 pooled analysis of 1,170 carriers gave a median onset of 58.0 years (95% CI 57.0–59.0), the same in familial and sporadic cases; women, especially with bulbar onset, started later. [[Majounie2012,Murphy2017]] So at 58, about 1 child in 4 of a carrier parent would be affected on these figures.`,
  pt:`By about 58, half of the people who carry the expansion have developed symptoms in these studies.`,
  hook:`Median onset with <i>C9orf72</i>: <b>58 years</b>. [[Murphy2017]]`},
 {from:.8,at:.9091,k:`Age 80 · The controversy`,t:`By 80: nearly all, or about two-thirds?`,
  txt:`<span class="tag warn">Controversy</span> Family and clinic data give near-complete penetrance: "almost fully penetrant by 80", or 99.5% by 83 in the pooled analysis (90.9% if 20% of carriers are assumed never to show symptoms). [[Majounie2012,Murphy2017]] In UK Biobank, 701 of 490,331 people had more than 100 repeats; by 80, 66% (95% CI 57–73%) had ALS or dementia against 5.8% of matched controls, or 58% (50–64%) allowing for death from other causes. [[Gao2025]] The authors name family-based cohorts as a possible source of bias; the 2023 consensus describes <i>C9orf72</i> as carrying "much lower disease risk" than some <i>SOD1</i> and <i>FUS</i> variants. [[Gao2025,Roggenbuck2023]]`,
  pt:`Studies of affected families say nearly every carrier becomes ill by 80. A study of half a million ordinary volunteers says about two in three. Families with many cases may make the gene look stronger than it is.`,
  hook:`Penetrance estimates depend on how carriers were found: <b>families</b> (near 100% by 80–83) versus a <b>population cohort</b> (58–66% by 80). [[Murphy2017,Gao2025]]`}
];
const GE_ANC={
 eu:{rows:[ ['C9orf72',33.7,5.1],['SOD1',14.8,1.2],['TARDBP',4.2,.8],['FUS',2.8,.3] ],
  k:`Europe`,t:`C9orf72 leads`,
  txt:`In European studies <i>C9orf72</i> is the largest single cause, then <i>SOD1</i>. [[Zou2017]] In Finland the expansion explained 46.0% of familial and 21.1% of sporadic ALS; together with <i>SOD1</i> D90A, 87% of Finnish familial ALS had a single-gene cause. [[Renton2011]] In an Irish DNA bank it was 41% of familial and 5% of sporadic ALS. [[Byrne2012]]`},
 as:{rows:[ ['C9orf72',2.3,.3],['SOD1',30.0,1.5],['TARDBP',1.5,.2],['FUS',6.4,.9] ],
  k:`Asia`,t:`SOD1 leads`,
  txt:`In Asian studies <i>SOD1</i> is the commonest cause, followed by <i>FUS</i>, <i>C9orf72</i> and <i>TARDBP</i>; the authors call the genetic architecture "distinct". [[Zou2017]] None of 360 people with sporadic ALS from Asia or the Pacific Islands carried the <i>C9orf72</i> expansion in one screen. [[Majounie2012]] <i>C9orf72</i> is rarer in Japan than in Europe, while <i>OPTN</i> variants show the reverse pattern. [[Renton2014]]`}
};
const GE_RES=[
 {id:'p',n:`Pathogenic`,tag:'bad',h:`Pathogenic variant`,
  d:[ [`What the consensus says`,`People should be told that results may be "positive, negative, or uncertain". A pathogenic or likely pathogenic result usually does not predict how the illness will run. Counselling should convey the variable and uncertain penetrance of most ALS variants: high for some <i>SOD1</i> variants (the consensus cites A5V) and some <i>FUS</i> variants, lower for others, including <i>C9orf72</i>. [[Roggenbuck2023]]`],
   [`For relatives`,`Relatives' risks should be discussed, and adult relatives are candidates for presymptomatic testing, "a personal choice" made with genetic counselling. [[Roggenbuck2023]] For a dominant variant such as the <i>C9orf72</i> expansion, each child of a carrier has a 50% chance of inheriting it. [[GossyeGeneReviews]]`],
   [`Follow-up as published`,`People should be told about gene-targeted trials, observational studies and approved therapies. [[Roggenbuck2023]] For <i>SOD1</i> that includes tofersen; see <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>. [[Miller2022]]`] ]},
 {id:'lp',n:`Likely pathogenic`,tag:'tdp',h:`Likely pathogenic variant`,
  d:[ [`What the consensus says`,`The consensus groups likely pathogenic with pathogenic: either result usually does not predict the course of the illness, and the same discussion of penetrance applies. [[Roggenbuck2023]] In standard variant classification, "likely pathogenic" means strong evidence that stops short of the level needed for "pathogenic".`],
   [`For relatives`,`As after a pathogenic result, relatives' risks should be discussed, and adult relatives may consider presymptomatic testing with counselling. [[Roggenbuck2023]]`],
   [`Follow-up as published`,`Interpretations can change over time, so periodic reevaluation may be appropriate. [[Roggenbuck2023]]`] ]},
 {id:'vus',n:`Variant of uncertain significance (VUS)`,tag:'warn',h:`Variant of uncertain significance`,
  d:[ [`What the consensus says`,`A VUS "may or may not be contributing" to the person's ALS. Interpretations can change over time, so periodic reevaluation may be appropriate. [[Roggenbuck2023]] In one UK clinic, 21 of 100 consecutive people with ALS carried only a VUS on a 44-gene panel. [[Shepheard2021]]`],
   [`For relatives`,`The consensus ties presymptomatic testing of relatives to a pathogenic or likely pathogenic result, not to a VUS. [[Roggenbuck2023]]`],
   [`Follow-up as published`,`As evidence accumulates a VUS can be reclassified, so the result is worth revisiting rather than treating as final. [[Roggenbuck2023]]`] ]},
 {id:'int',n:`Intermediate C9orf72 repeat`,tag:'warn',h:`Intermediate C9orf72 repeat`,
  d:[ [`What the consensus says`,`No validated cut-off separates pathogenic from non-pathogenic alleles, and the clinical meaning of intermediate alleles is unknown. Alleles of 20–29 repeats have contradictory evidence of association with ALS, and any risk they carry is likely lower than with long expansions. [[Roggenbuck2023]]`],
   [`The other side`,`<span class="tag warn">Controversy</span> A 2019 meta-analysis (5071 cases, 3747 controls) linked 24–30 repeats to ALS (odds ratio 4.2, 95% CI 1.23–14.35) and proposed that 24 or more should be considered pathogenic. [[Iacoangeli2019]]`],
   [`Laboratory notes`,`Reports should state the sizes of the non-expanded alleles and the largest repeat number the assay can detect. Southern blot is the gold standard for sizing large expansions; repeat-primed PCR detects only about 60 repeats at most. [[Roggenbuck2023,Renton2011]] When 14 laboratories tested the same 78 samples blind, only 50 got the same result from all of them. [[Akimoto2014]]`] ]},
 {id:'neg',n:`Negative`,tag:'steel',h:`No pathogenic variant found`,
  d:[ [`What the consensus says`,`A negative result "does not exclude a genetic form of ALS". [[Roggenbuck2023]] About 70% of familial cases carry a variant in a known gene, so some familial ALS still has no identified cause. [[Feldman2022]]`],
   [`For relatives`,`In European populations, first-degree relatives of people with apparently sporadic ALS have a lifetime risk of about 1–3%, according to the consensus. [[Roggenbuck2023]] An Irish population study found 1.4%, against 0.3% in the general population. [[Ryan2019]]`],
   [`Follow-up as published`,`More than 40 genes had been reported by 2022 and interpretations change, so reevaluation may be appropriate. [[Feldman2022,Roggenbuck2023]]`] ]}
];
inits.genes=()=>{
  const T=(x,y,c,txt,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
  const G=(x,y,inner)=>`<g transform="translate(${f1(x)} ${f1(y)})">${inner}</g>`;
  const op=o=>`style="opacity:${f1(clamp(o))}"`;

  /* ---------- shared: a neuron with its nucleus (376 x 220 local frame) ---------- */
  function cellBody(){const C=GE_TXT.cell;
    return `<rect x="0" y="4" width="376" height="212" rx="36" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5"/>`+
      `<ellipse cx="112" cy="116" rx="96" ry="80" style="fill:var(--panel);stroke:var(--nuc);stroke-width:2"/>`+
      T(22,24,'t-xs',C.cell)+T(112,52,'t-xs t-mid',C.nuc)+T(300,24,'t-xs t-mid',C.cyt)}

  /* ---------- C9orf72: gene with the repeat (376 x 165) ---------- */
  const reps=t=>t<.2?5:Math.round(Math.exp(lerp(Math.log(5),Math.log(1000),ease(ramp(t,.2,.38)))));
  const zcol=n=>n<20?'var(--good)':n<30?'var(--warn)':'var(--tdp)';
  function c9Gene(n,t){const X=GE_TXT.c9;let s=T(0,18,'t-lbl',X.title);
    s+=`<rect x="250" y="8" width="38" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/><rect x="292" y="8" width="80" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<rect x="268" y="8" width="5" height="12" style="fill:var(--tdp)"/>`+T(270.5,34,'t-xs t-mid',X.band,'fill:var(--tdp);font-weight:700');
    s+=`<line x1="0" y1="140" x2="376" y2="140" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="4" y="131" width="24" height="18" rx="3" style="fill:var(--steel)"/>`;
    [296,316,336,356].forEach(x=>s+=`<rect x="${x}" y="131" width="14" height="18" rx="3" style="fill:var(--steel);opacity:.75"/>`);
    s+=T(16,164,'t-xs t-mid',X.exon1)+T(160,164,'t-xs t-mid',X.intron)+T(333,164,'t-xs t-mid',X.later);
    const col=n<20?'var(--steel)':zcol(n),R=31,dr=Math.min(n,R*5),rows=Math.ceil(dr/R);
    if(rows>1)s+=`<rect x="32" y="${130-(rows-1)*14}" width="256" height="${(rows-1)*14+20}" rx="6" style="fill:none;stroke:var(--tdp);stroke-dasharray:3 3;opacity:.6"/>`;
    for(let i=0;i<dr;i++){const r=Math.floor(i/R),c=i%R;s+=`<rect x="${36+c*8}" y="${134-r*14}" width="6" height="12" rx="1.5" style="fill:${col}"/>`}
    if(n>R*5)s+=T(36,70,'t-xs',X.more,'fill:var(--tdp);font-weight:700');
    const co=1-ramp(t,.18,.24);
    if(co>0)s+=`<g ${op(co)}><rect x="36" y="86" width="96" height="24" rx="4" style="fill:var(--panel);stroke:${col};stroke-width:1.5"/>`+T(84,103,'t-lbl t-mid',X.unit,'font-family:var(--mono);fill:'+col)+T(140,102,'t-xs',X.unitLbl)+`<path d="M40 110L39 133" style="stroke:${col};stroke-width:1.2"/></g>`;
    return s}

  /* ---------- the repeat-count dial (300 x 205) ---------- */
  const DX=100,DY=118,DR=66;
  const dv=n=>n<=40?.6*n/40:.6+.4*Math.log(n/40)/Math.log(2500/40);
  const dpt=(n,r)=>{const a=Math.PI*(1-clamp(dv(n)));return [DX+r*Math.cos(a),DY-r*Math.sin(a)]};
  const darc=(n0,n1,r)=>{const p=dpt(n0,r),q=dpt(n1,r);return `M${f1(p[0])} ${f1(p[1])}A${r} ${r} 0 0 1 ${f1(q[0])} ${f1(q[1])}`};
  function dial(n){const D=GE_TXT.dial,L=D.leg;let s=T(0,14,'t-lbl',D.title);
    s+=`<path d="${darc(0,20,DR)}" style="fill:none;stroke:var(--good);stroke-width:14;opacity:.8"/>`;
    s+=`<path d="${darc(20,30,DR)}" style="fill:none;stroke:var(--warn);stroke-width:14;opacity:.8"/><path d="${darc(20,30,DR)}" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-dasharray:2 3"/>`;
    s+=`<path d="${darc(30,2500,DR)}" style="fill:none;stroke:var(--tdp);stroke-width:14;opacity:.8"/>`;
    s+=`<path d="${darc(700,1600,DR-14)}" style="fill:none;stroke:var(--tdp);stroke-width:5"/><path d="${darc(24,30,DR-14)}" style="fill:none;stroke:var(--warn);stroke-width:4;stroke-dasharray:3 2"/>`;
    [0,20,30,100,1000].forEach(v=>{const a=dpt(v,DR+8),b=dpt(v,DR+12),c=dpt(v,DR+20),an=c[0]<DX-20?' t-end':c[0]>DX+20?'':' t-mid';
      s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:1.2"/>`+T(c[0],c[1]+3,'t-xs'+an,v)});
    [-1,1].forEach(k=>{const an=Math.PI*.4+k*.025,x0=DX+(DR-8)*Math.cos(an),y0=DY-(DR-8)*Math.sin(an),x1=DX+(DR+8)*Math.cos(an),y1=DY-(DR+8)*Math.sin(an);
      s+=`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" style="stroke:var(--panel);stroke-width:2"/>`});
    const nd=dpt(n,DR-10);
    s+=`<line x1="${DX}" y1="${DY}" x2="${f1(nd[0])}" y2="${f1(nd[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${DX}" cy="${DY}" r="6" style="fill:var(--ink)"/>`;
    const zk=n<20?'good':n<30?'warn':'bad';
    s+=T(214,66,'t-big',n,'font-size:22px')+T(214,82,'t-xs',D.units)+T(214,98,'t-xs',D.zone[zk],'font-weight:700;fill:'+zcol(n));
    const sw=(x,y,c,dash)=>`<rect x="${x}" y="${y-7}" width="12" height="${dash?4:8}" rx="2" style="fill:${c}${dash?';opacity:.9':''}"/>`;
    s+=sw(0,150,'var(--good)')+T(16,151,'t-xs',L.good)+sw(150,150,'var(--warn)')+T(166,151,'t-xs',L.warn);
    s+=sw(0,166,'var(--tdp)')+T(16,167,'t-xs',L.bad)+`<rect x="150" y="161" width="12" height="4" rx="2" style="fill:var(--tdp)"/>`+T(166,167,'t-xs',L.pt);
    s+=`<line x1="0" y1="181" x2="12" y2="181" style="stroke:var(--warn);stroke-width:4;stroke-dasharray:3 2"/>`+T(16,183,'t-xs',L.ia);
    s+=T(16,199,'t-xs',L.brk);
    return s}

  /* ---------- C9orf72: the neuron and its three routes ---------- */
  function c9Cell(t){const C=GE_TXT.cell;let s=cellBody();
    const r1=ramp(t,.4,.48),r2=ease(ramp(t,.55,.64)),r3=ramp(t,.68,.8),r4=t>=.84;
    /* the two copies */
    s+=`<line x1="30" y1="84" x2="110" y2="84" style="stroke:var(--steel);stroke-width:2"/>`;
    [50,57,64].forEach(x=>s+=`<rect x="${x}" y="80" width="5" height="8" rx="1" style="fill:var(--steel)"/>`);
    s+=`<line x1="30" y1="116" x2="110" y2="116" style="stroke:var(--tdp);stroke-width:2"/>`;
    for(let r=0;r<3;r++)for(let c=0;c<8;c++)s+=`<rect x="${44+c*6}" y="${112-r*7}" width="5" height="6" rx="1" style="fill:var(--tdp)"/>`;
    s+=T(116,88,'t-xs',C.usual,'fill:var(--steel)')+T(116,120,'t-xs',C.exp,'fill:var(--tdp)');
    /* route 1: messages leave; fewer from the expanded copy, so less protein */
    if(t>=.4&&t<.6){const mo=bump(t,.4,.6);
      [[110,84,0],[110,84,.33],[110,84,.66],[110,116,.2]].forEach(([x0,y0,ph])=>{const u=((t-.4)/.2*1.6+ph)%1,x=lerp(x0,224,u),y=lerp(y0,42,u);
        s+=`<path d="M${f1(x)} ${f1(y)}q3 -4 6 0t6 0t6 0" style="fill:none;stroke:${y0>100?'var(--tdp)':'var(--steel)'};stroke-width:1.6;opacity:${f1(mo)}"/>`})}
    if(r1>0){for(let i=0;i<8;i++){const x=236+i*16,on=i<Math.round(5*r1);
        s+=i<5?`<circle cx="${x}" cy="40" r="5" style="fill:${on?'var(--steel)':'none'};stroke:var(--steel);stroke-width:1.4;opacity:${on?1:.25}"/>`:`<circle cx="${x}" cy="40" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:2 2;opacity:${f1(r1)}"/>`}
      s+=`<g ${op(r1)}>`+T(292,58,'t-xs t-mid',C.prot1)+T(292,70,'t-xs t-mid',C.prot2,'fill:var(--ink);font-weight:700')+'</g>'}
    /* route 2: RNA foci hold RNA-binding proteins */
    if(r2>0){[[58,150],[150,156],[150,64]].forEach(([fx,fy])=>{
        [ [0,0],[5,-3],[-4,4],[3,5] ].forEach(([dx,dy])=>s+=`<circle cx="${fx+dx}" cy="${fy+dy}" r="3.4" style="fill:var(--tdp);opacity:${f1(r2)}"/>`);
        [ [-18,-10,-8,-4],[16,-14,8,-5],[4,18,1,9] ].forEach(([a,b,c,d])=>s+=`<circle cx="${f1(fx+lerp(a,c,r2))}" cy="${f1(fy+lerp(b,d,r2))}" r="2.6" style="fill:var(--warn);opacity:${f1(Math.min(1,r2*1.5))}"/>`)});
      s+=T(104,182,'t-xs t-mid',C.foci,'fill:var(--tdp);font-weight:700;opacity:'+f1(r2))}
    /* route 3: repeat RNA meets a ribosome; dipeptide chains come off and clump */
    if(r3>0){const ro=ramp(t,.68,.71);
      s+=`<path d="M200 128q5 -5 10 0t10 0t10 0t10 4" style="fill:none;stroke:var(--tdp);stroke-width:1.8;opacity:${f1(ro)}"/>`;
      s+=`<g ${op(ro)}><ellipse cx="252" cy="145" rx="15" ry="10" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/><ellipse cx="252" cy="160" rx="12" ry="6" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`+T(244,184,'t-xs t-end',C.ribo)+'</g>';
      [ ['GA',282,122],['GP',322,122],['PR',282,196],['GR',282,160] ].forEach(([l,fx,fy],i)=>{const u=ease(ramp(t,.71+i*.02,.77+i*.02));if(u<=0)return;
        const x=lerp(270,fx,u),y=lerp(146,fy,u);let g='';
        for(let b=0;b<4;b++)g+=`<circle cx="${f1(x+b*7)}" cy="${f1(y)}" r="3.2" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.2"/>`;
        s+=`<g ${op(u)}>${g}`+T(x+10.5,y-7,'t-xs t-mid',l,'fill:var(--tdp);font-weight:700')+'</g>'});
      const ag=ease(ramp(t,.74,.84));
      if(ag>0){const R=rng(3);for(let k=0;k<Math.round(18*ag);k++){const a=R()*Math.PI*2,rr=4+R()*10;s+=`<circle cx="${f1(344+Math.cos(a)*rr)}" cy="${f1(178+Math.sin(a)*rr*.8)}" r="3.4" style="fill:var(--tdp);stroke:var(--panel);stroke-width:.8"/>`}
        s+=T(344,154,'t-xs t-mid',C.agg,'fill:var(--tdp);font-weight:700;opacity:'+f1(ag))}}
    /* where the routes meet: TDP-43 leaves the nucleus and clumps */
    if(r4){[ [70,64,228,96],[120,138,220,204],[184,100,356,96] ].forEach(([x0,y0,x1,y1],i)=>{const u=ease(ramp(t,.86+i*.02,.95+i*.02)),x=lerp(x0,x1,u),y=lerp(y0,y1,u);
        s+=tdp(x,y,1,Math.min(1,ramp(t,.84,.87)),u>.6?1:0)});
      s+=T(228,82,'t-xs t-mid',C.tdp,'fill:var(--tdp);font-weight:700;opacity:'+f1(ramp(t,.93,.96)))}
    return s}
  function c9Routes(t){const R=GE_TXT.routes;let s=T(0,14,'t-lbl',R.title);
    const act=t<.4?-1:t<.55?0:t<.68?1:t<.84?2:3;
    R.r.forEach(([a,b],i)=>{const y=24+i*42,on=i<=act;
      if(i===act)s+=`<rect x="0" y="${y}" width="300" height="38" rx="8" style="fill:var(--tdp-soft)"/>`;
      s+=`<g style="opacity:${on?1:.4}"><circle cx="17" cy="${y+19}" r="11" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:var(--tdp);stroke-width:1.5"/>`+
        T(17,y+23,'t-xs t-mid',i<3?i+1:'→','font-weight:700;fill:'+(on?'var(--panel)':'var(--tdp)'))+T(36,y+16,'t-lbl',a)+T(36,y+31,'t-xs',b)+'</g>'});
    return s}

  /* ---------- SOD1 ---------- */
  function sodGene(t){const S=GE_TXT.sod1;let s=T(0,18,'t-lbl',S.title);
    s+=`<rect x="250" y="8" width="10" height="12" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/><rect x="264" y="8" width="108" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<rect x="348" y="8" width="5" height="12" style="fill:var(--tdp)"/>`+T(350.5,34,'t-xs t-mid',S.band,'fill:var(--tdp);font-weight:700');
    s+=`<line x1="0" y1="82" x2="376" y2="82" style="stroke:var(--muted);stroke-width:2"/>`;
    [ [8,40],[96,22],[166,20],[236,40],[318,50] ].forEach(([x,w])=>s+=`<rect x="${x}" y="73" width="${w}" height="18" rx="3" style="fill:var(--steel);opacity:.8"/>`);
    const hi=ramp(t,.25,.3);
    const pin=(x,y0,y1,c)=>`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" style="stroke:${c};stroke-width:1.6"/><circle cx="${x}" cy="${y1}" r="${f1(4.5+1.5*hi)}" style="fill:${c}"/>`;
    s+=pin(18,73,50,'var(--tdp)')+T(8,42,'t-xs',S.a5v,'fill:var(--tdp);font-weight:700');
    s+=pin(248,73,50,'var(--tdp)')+T(248,42,'t-xs t-mid',S.d91a,'fill:var(--tdp);font-weight:700');
    s+=pin(258,91,104,'var(--muted)')+T(258,120,'t-xs t-mid',S.g93a);
    s+=T(0,112,'t-sm',S.n180);
    return s}
  const NZ=a=>.22*Math.sin(3*a+1)+.15*Math.sin(5*a+2)+.1*Math.sin(2*a+.5);
  function sub(x,y,rot,m,sc,o){const bad=m>.5,col=bad?'var(--tdp)':'var(--steel)',fill=bad?'var(--tdp-soft)':'var(--steel-soft)';
    let d='';for(let k=0;k<=36;k++){const a=k/36*Math.PI*2,rr=1+m*NZ(a);d+=(k?'L':'M')+f1(Math.cos(a)*30*rr*sc)+' '+f1(Math.sin(a)*40*rr*sc)}
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" style="opacity:${f1(o)}"><path d="${d}Z" style="fill:${fill};stroke:${col};stroke-width:2;stroke-linejoin:round"/>`;
    if(m<1)[-12,0,12].forEach(sx=>g+=`<path d="M${f1(sx*sc)} ${f1(-24*sc)}l0 ${f1(48*sc)}" style="stroke:${col};stroke-width:2.4;stroke-linecap:round;opacity:${f1(.55*(1-m))}"/>`);
    return g+'</g>'}
  const metal=(x,y,l,c,o)=>`<g ${op(o)}><circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${c}"/>`+T(x,y+3.3,'t-xs t-mid',l,'fill:var(--panel);font-weight:700')+'</g>';
  function sodProt(t){const S=GE_TXT.sod1;let s='';
    const hd=t<.25?0:t<.5?1:t<.75?2:3;s+=T(188,20,'t-lbl t-mid',S.head[hd]);
    const vr=ramp(t,.25,.3),met=ease(ramp(t,.3,.4)),sp=ease(ramp(t,.38,.48)),mf=ease(ramp(t,.5,.6)),ag=ease(ramp(t,.58,.7));
    const wob=Math.sin(t*140)*5*bump(t,.3,.44),cx=188,cy=118,d=31+sp*70,sc=lerp(1,.7,ag);
    /* superoxide in, products out (step 1) */
    const rx=1-ramp(t,.2,.26);
    if(rx>0){const u=(t*7)%1;
      s+=`<g ${op(rx)}>`+T(8,114,'t-xs',S.rx1)+`<path d="M70 110L112 114" class="arrow" marker-end="url(#geAr)"/><path d="M262 114L300 110" class="arrow" marker-end="url(#geAr)"/>`+T(306,114,'t-xs',S.rx2)+
        `<circle cx="${f1(lerp(70,112,u))}" cy="${f1(lerp(110,114,u))}" r="3" style="fill:var(--tdp)"/><circle cx="${f1(lerp(262,300,u))}" cy="${f1(lerp(114,110,u))}" r="3" style="fill:var(--steel)"/></g>`}
    const P=[0,1].map(i=>{const sg=i?1:-1;return [lerp(cx+sg*d,cx+sg*16,ag),lerp(cy,150-sg*6,ag)]});
    /* extra misfolded monomers join the clump */
    const EX=[ [-50,-18,-140,-70],[50,-20,140,-70],[-36,34,-140,70],[40,32,140,66] ];
    EX.forEach(([ox,oy,sx,sy],i)=>{const u=ease(ramp(t,.62+i*.02,.72+i*.02));if(u>0)s+=sub(lerp(cx+sx,cx+ox,u),lerp(150+sy,150+oy,u),i*40,1,.5,u)});
    P.forEach(([x,y],i)=>{s+=sub(x,y,(i?1:-1)*wob+ag*(i?30:-25),mf,sc,1)});
    /* metals leave (step 2) */
    P.forEach(([x,y],i)=>{const sg=i?1:-1,o=1-met;if(o<=0)return;
      s+=metal(x+sg*met*58,y-12-met*44,GE_TXT.sod1.cu,'var(--lmn)',o)+metal(x+sg*met*70,y+14-met*20,GE_TXT.sod1.zn,'var(--muted)',o)});
    if(vr>0&&mf<1){const [x,y]=P[1],o=vr*(1-mf);
      s+=`<g ${op(o)}><path d="M${f1(x+20)} ${f1(y-38)}l2.4 5 5.5 .8 -4 3.9 1 5.5 -4.9 -2.6 -4.9 2.6 1 -5.5 -4 -3.9 5.5 -.8z" style="fill:var(--warn)"/>`+T(x+30,y-36,'t-xs',S.variant,'fill:var(--warn);font-weight:700')+'</g>'}
    s+=T(188,200,'t-xs t-mid',S.apo,'opacity:'+f1(bump(t,.3,.52)));
    if(ag>0)s+=T(188,226,'t-xs t-mid',S.agg,'font-weight:700;fill:var(--tdp);opacity:'+f1(ag));
    /* step 4: ubiquitin tags, no TDP-43, the target */
    const ub=ramp(t,.76,.84);
    if(ub>0){[ [-80,-44],[82,-42],[-76,50],[78,48] ].forEach(([ox,oy],i)=>{const o=ramp(t,.76+i*.015,.8+i*.015);
        s+=`<g ${op(o)}><circle cx="${cx+ox}" cy="${150+oy}" r="9" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.4"/>`+T(cx+ox,153+oy,'t-xs t-mid',S.ub,'fill:var(--warn);font-weight:700')+'</g>'});
      const o=ramp(t,.82,.88);
      s+=`<g ${op(o)}>${tdp(326,150,1.4,.8,0)}<line x1="314" y1="138" x2="346" y2="162" style="stroke:var(--bad);stroke-width:2.4"/>`+T(330,180,'t-xs t-mid',S.noTdp,'font-weight:700')+'</g>';
      s+=T(188,256,'t-sm t-mid',S.target,'fill:var(--ink);opacity:'+f1(ramp(t,.86,.92)))}
    return s}
  function sodPanel(t){const Pn=GE_TXT.sod1.pan;let s=T(0,18,'t-lbl',Pn.h1);
    Pn.ev.forEach(([a,b],i)=>{const y=34+i*44,o=ramp(t,.55+i*.04,.6+i*.04);
      s+=`<g style="opacity:${f1(.35+.65*o)}"><circle cx="10" cy="${y+12}" r="8" style="fill:${o>.5?'var(--good)':'var(--panel)'};stroke:var(--good);stroke-width:1.5"/>`+(o>.5?`<path d="M6 ${y+12}l3 3 5 -6" style="fill:none;stroke:var(--panel);stroke-width:2"/>`:'')+T(26,y+10,'t-lbl',a)+T(26,y+25,'t-xs',b)+'</g>'});
    const o4=t>=.75?1:.35;
    s+=`<g style="opacity:${o4}">`+T(0,232,'t-lbl',Pn.h2);
    [ [Pn.a5v,1.2,'var(--tdp)'],[Pn.oth,6.8,'var(--steel)'] ].forEach(([l,v,c],i)=>{const y=252+i*36,w=v/6.8*210;
      s+=T(0,y,'t-xs',l)+`<rect x="0" y="${y+5}" width="${f1(w)}" height="14" rx="7" style="fill:${c}"/>`+T(w+6,y+16,'t-xs',Pn.yrs(v),'fill:var(--ink);font-weight:700')});
    s+=T(0,342,'t-lbl',Pn.h3);
    s+=`<circle cx="7" cy="357" r="6" style="fill:var(--warn-soft);stroke:var(--warn)"/>`+T(20,361,'t-xs',Pn.p1);
    s+=tdp(4,377,1,.8,0)+`<line x1="-1" y1="371" x2="17" y2="383" style="stroke:var(--bad);stroke-width:2"/>`+T(20,381,'t-xs',Pn.p2)+'</g>';
    return s}

  /* ---------- TARDBP and FUS ---------- */
  function psBar(C,t){let s=T(0,18,'t-lbl',C.title);const BY=62,pv=ramp(t,.33,.42);
    s+=`<rect x="0" y="${BY}" width="376" height="22" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    C.seg.forEach(([a,b,l,c])=>{const x=a*376,w=(b-a)*376;s+=`<rect x="${f1(x)}" y="${BY}" width="${f1(w)}" height="22" rx="4" style="fill:${c};stroke:var(--line)"/>`+T(x+w/2,BY+15,'t-xs t-mid',l,'fill:var(--ink)')});
    C.pins.forEach(([p,l,dir])=>{const x=Math.min(p*376,374),y0=dir<0?BY:BY+22,y1=dir<0?BY-16:BY+38,ly=dir<0?BY-26:BY+56,an=x>350?' t-end':' t-mid',lx=x>350?376:x;
      s+=`<g style="opacity:${f1(.25+.75*pv)}"><line x1="${f1(x)}" y1="${y0}" x2="${f1(x)}" y2="${y1}" style="stroke:var(--tdp);stroke-width:1.6"/><circle cx="${f1(x)}" cy="${y1}" r="${f1(4+1.5*pv)}" style="fill:var(--tdp)"/>`+T(lx,ly,'t-xs'+an,l,'fill:var(--tdp);font-weight:700')+'</g>'});
    s+=T(C.glyph==='fus'?336:376,BY+44,'t-xs t-end',C.note,'opacity:'+f1(.4+.6*pv));
    return s}
  const fusG=(x,y,agg,o)=>`<rect x="${f1(x-5)}" y="${f1(y-5)}" width="10" height="10" rx="2.5" style="fill:${agg?'var(--tdp)':'var(--steel-soft)'};stroke:${agg?'var(--tdp)':'var(--steel)'};stroke-width:1.4;opacity:${f1(o)}"/>`;
  const NP=[ [64,90],[150,96],[70,146],[132,150],[96,70],[170,140] ];
  const CP=[ [262,96],[282,112],[302,94],[262,170],[284,182],[304,166] ];
  function psCell(C,t){let s=cellBody();const fus=C.glyph==='fus',vr=ramp(t,.38,.45);
    NP.forEach(([x0,y0],i)=>{const mv=i<4,u=mv?ease(ramp(t,.66+i*.03,.8+i*.03)):0,x=lerp(x0,CP[i][0],u),y=lerp(y0,CP[i][1],u),agg=u>.7;
      if(u<.3)s+=`<path d="M${f1(x-7)} ${f1(y+7)}q3.5 3 7 0t7 0" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:${f1(1-u/.3)}"/>`;
      s+=fus?fusG(x,y,agg,1):tdp(x,y,1,1,agg?1:0);
      if(mv&&vr>0&&!agg)s+=`<circle cx="${f1(x)}" cy="${f1(y-8)}" r="2.6" style="fill:var(--warn);opacity:${f1(vr)}"/>`});
    s+=T(100,177,'t-xs t-mid',C.prot,'font-weight:700');
    if(vr>0)s+=`<g ${op(vr*(1-ramp(t,.78,.84)))}><circle cx="214" cy="200" r="2.6" style="fill:var(--warn)"/>`+T(221,203,'t-xs',GE_TXT.ps.variant)+'</g>';
    const ao=ramp(t,.78,.84);
    if(ao>0){s+=T(282,143,'t-xs t-mid',C.agg,'fill:var(--tdp);font-weight:700;opacity:'+f1(ao));
      if(fus)s+=`<g ${op(ao)}>${tdp(330,56,1,.8,0)}<line x1="322" y1="49" x2="346" y2="63" style="stroke:var(--bad);stroke-width:2"/>`+T(336,78,'t-xs t-mid',C.noTdp,'font-weight:700')+'</g>'}
    return s}
  function psPanel(C){const Pn=C.pan;let s=T(0,18,'t-lbl',Pn.h1);
    Pn.bars.forEach(([l,v],i)=>{const y=40+i*34,w=v/10*220;
      s+=T(0,y,'t-xs',l)+`<rect x="0" y="${y+5}" width="220" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="${y+5}" width="${f1(Math.max(3,w))}" height="12" rx="6" style="fill:${l.indexOf('familial')>=0?'var(--tdp)':'var(--steel)'}"/>`+T(228,y+15,'t-xs',GE_TXT.pct(v),'fill:var(--ink);font-weight:700')});
    const y0=40+Pn.bars.length*34;s+=T(0,y0,'t-xs',GE_TXT.scale10);
    s+=T(0,y0+30,'t-lbl',Pn.h2);Pn.lines.forEach((l,i)=>s+=T(0,y0+50+i*16,'t-xs',l));
    return s}

  /* ---------- the main player ---------- */
  const svg=$('#geSvg'),rg=$('#geT');let GN='c9';
  const ST=GE_STEPS.c9.slice();
  const DIMS={c9:['720 410','400 815'],sod1:['720 410','400 800'],tardbp:['720 410','400 600'],fus:['720 410','400 700']};
  function draw(t){
    const N=vb(svg,DIMS[GN][0],DIMS[GN][1]);
    svg.setAttribute('aria-label',GE_TXT.aria[GN]);
    let s=`<defs>${marker('geAr')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(GN==='c9'){const n=reps(t),L=N?{g:[12,2],d:[50,176],c:[12,390],p:[50,616]}:{g:[16,2],d:[410,2],c:[16,184],p:[410,216]};
      s+=G(...L.g,c9Gene(n,t))+G(...L.d,dial(n))+G(...L.c,c9Cell(t))+G(...L.p,c9Routes(t))}
    else if(GN==='sod1'){const L=N?{g:[12,2],c:[12,128],p:[50,410]}:{g:[16,2],c:[16,132],p:[410,4]};
      s+=G(...L.g,sodGene(t))+G(...L.c,sodProt(t))+G(...L.p,sodPanel(t))}
    else{const C=GE_PS[GN],L=N?{g:[12,2],c:[12,132],p:[50,362]}:{g:[16,2],c:[16,160],p:[410,4]};
      s+=G(...L.g,psBar(C,t))+G(...L.c,psCell(C,t))+G(...L.p,psPanel(C))}
    svg.innerHTML=s;
    const p=phaseOf(ST,t);setSt(p);$('#geNote').innerHTML=noteHTML(ST[p]);
  }
  const stop=playWire(rg,$('#gePlay'),draw,16000,UI.replay,'genes');
  const stEl=$('#geSteps');
  const setSt=stepWire(stEl,ST,rg,draw,stop);
  toggleRow($('#geGene'),GE_TXT.genes,'c9',v=>{stop();GN=v;ST.length=0;GE_STEPS[v].forEach(x=>ST.push(x));
    stEl.innerHTML=ST.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
    rg.value=ST[0].at;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- 2. dominant pedigree with age-dependent penetrance ---------- */
  const ps=$('#gpSvg'),rp=$('#gpT');let EST='fam';
  /* a logistic through the published points: 0 before 35, 50% at 58, 99.5% at 83 */
  const PEN=a=>a<35?0:1/(1+Math.exp(-(a-58)/4.72));
  const AGE=t=>Math.round(30+55*t);
  const RANK=(()=>{const r=rng(14),a=[];for(let i=0;i<100;i++)a.push(i);
    for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1)),tmp=a[i];a[i]=a[j];a[j]=tmp}
    const rk=[];a.forEach((idx,pos)=>{rk[idx]=pos});return rk})();
  function pedSym(x,y,sq,st){const r=13,dash=st==='risk',fill=st==='aff'?'var(--tdp)':'var(--panel)',stk=dash?'var(--muted)':'var(--ink)';
    const sty=`fill:${fill};stroke:${stk};stroke-width:1.6${dash?';stroke-dasharray:3 2':''}`;
    let g=sq?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" style="${sty}"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="${sty}"/>`;
    if(st==='car')g+=`<circle cx="${x}" cy="${y}" r="3.5" style="fill:var(--ink)"/>`;
    if(dash)g+=T(x,y+3.5,'t-xs t-mid','50%','fill:var(--ink);font-weight:700');
    return g}
  function ped(a){const D=GE_TXT.ped;let s=T(0,14,'t-lbl',D.title);const ln=d=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s+=T(4,48,'t-sm',D.gen[0])+T(4,114,'t-sm',D.gen[1])+T(4,180,'t-sm',D.gen[2]);
    s+=ln('M133 44H207M170 44V84M100 84H200M100 84V97M200 84V97M213 110H267M240 110V150M60 150H300M60 150V163M140 150V163M220 150V163M300 150V163');
    s+=pedSym(120,44,1,'car')+pedSym(220,44,0,'none')+T(104,42,'t-xs t-end',D.gf1)+T(104,53,'t-xs t-end',D.gf2);
    s+=pedSym(100,110,1,'none')+pedSym(200,110,0,'aff')+pedSym(280,110,1,'none')+T(200,138,'t-xs t-mid',D.aff,'fill:var(--tdp);font-weight:700');
    [60,140,220,300].forEach((x,i)=>s+=pedSym(x,176,i%2===0,'risk'));
    s+=T(180,206,'t-xs t-mid',D.kids1)+T(180,220,'t-xs t-mid',D.kids2(a),'fill:var(--ink);font-weight:700');
    return s}
  function icons(a,k,popNo){const D=GE_TXT.ped;let s=T(0,14,'t-lbl',D.iconsT(a));
    for(let i=0;i<100;i++){const x=8+(i%20)*16.4,y=34+Math.floor(i/20)*16.4,pos=RANK[i];
      if(pos>=50)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
      else if(pos<k)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--tdp);stroke:var(--tdp);stroke-width:1.2"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2" style="fill:var(--steel)"/>`}
    s+=`<circle cx="7" cy="130" r="6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`+T(20,134,'t-xs',D.non(50));
    s+=`<circle cx="7" cy="148" r="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/><circle cx="7" cy="148" r="2" style="fill:var(--steel)"/>`+T(20,152,'t-xs',D.car(50-k));
    s+=`<circle cx="7" cy="166" r="6" style="fill:var(--tdp)"/>`+T(20,170,'t-xs',popNo?D.noPop:D.aff2(k),popNo?'':'fill:var(--ink);font-weight:700');
    s+=T(20,188,'t-xs',EST==='fam'?D.basisF:D.basisP);
    return s}
  const CX0=40,CX1=310,CY0=240,CY1=40,ax=a=>CX0+(a-30)/55*(CX1-CX0),ay=p=>CY0-p*(CY0-CY1);
  function chart(a){const D=GE_TXT.ped;let s=T(0,16,'t-lbl',D.chart);const fo=EST==='fam'?1:.3,po=EST==='pop'?1:.35;
    [0,.25,.5,.75,1].forEach(p=>s+=`<line x1="${CX0}" x2="${CX1}" y1="${f1(ay(p))}" y2="${f1(ay(p))}" class="grid"/>`+T(CX0-6,ay(p)+3,'t-xs t-end',GE_TXT.pct(Math.round(p*100))));
    [30,40,50,60,70,80].forEach(v=>s+=T(ax(v),CY0+16,'t-xs t-mid',v));
    s+=`<line x1="${CX0}" x2="${CX1}" y1="${CY0}" y2="${CY0}" class="axis"/><line x1="${CX0}" x2="${CX0}" y1="${CY1}" y2="${CY0}" class="axis"/>`+T((CX0+CX1)/2,CY0+34,'t-xs t-mid',D.ageAx);
    let d='';for(let v=30;v<=85;v+=.5)d+=(v>30?'L':'M')+f1(ax(v))+' '+f1(ay(PEN(v)));
    s+=`<g style="opacity:${fo}"><path d="${d}" style="fill:none;stroke:var(--steel);stroke-width:2.6"/>`;
    [ [35,0],[58,.5],[83,.995] ].forEach(([v,p])=>s+=`<circle cx="${f1(ax(v))}" cy="${f1(ay(p))}" r="4.5" style="fill:var(--steel);stroke:var(--panel);stroke-width:1.5"/>`);
    s+=T(44,215,'t-xs',D.p35)+T(184,152,'t-xs',D.p58)+T(294,29,'t-xs t-end',D.p83)+'</g>';
    s+=`<g style="opacity:${po}">`;
    [ [279,.66,.57,.73,D.ukb1,111],[291,.58,.50,.64,D.ukb2,128] ].forEach(([x,p,lo,hi,l,ly])=>{const y=ay(p);
      s+=`<line x1="${x}" x2="${x}" y1="${f1(ay(lo))}" y2="${f1(ay(hi))}" style="stroke:var(--warn);stroke-width:1.6"/><path d="M${x} ${f1(y-6)}l6 6 -6 6 -6 -6z" style="fill:var(--warn)"/>`});
    s+=T(272,111,'t-xs t-end',D.ukb1,'fill:var(--warn);font-weight:700')+T(272,128,'t-xs t-end',D.ukb2,'fill:var(--warn);font-weight:700')+'</g>';
    const x=ax(a);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${CY1}" y2="${CY0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    if(EST==='fam')s+=`<circle cx="${f1(x)}" cy="${f1(ay(PEN(a)))}" r="6" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    s+=`<line x1="0" y1="290" x2="16" y2="290" style="stroke:var(--steel);stroke-width:2.6"/><circle cx="8" cy="290" r="3.5" style="fill:var(--steel)"/>`+T(24,293,'t-xs',D.legF);
    s+=`<path d="M8 302l6 6 -6 6 -6 -6z" style="fill:var(--warn)"/>`+T(24,312,'t-xs',D.legP);
    return s}
  function readout(a){const D=GE_TXT.ped;let pen,kid,note;
    if(EST==='fam'){const P=PEN(a),pub=a<=35||a===58||a===83;
      pen=a<=35?D.exact(0):a===58?D.exact(50):a===83?D.exact(99.5):D.about(Math.round(P*100));
      kid=a<=35?D.exact(0):a===58?D.exact(25):D.about(Math.round(P*50));note=pub?D.nPub:D.nInt}
    else if(a>=80){pen=D.exact(66);kid=D.about(33);note=D.nPop80}
    else{pen=D.none;kid=D.none;note=D.nPopNo}
    let s=T(0,14,'t-xs',D.r1)+T(320,16,'t-big t-end','50%');
    const ra=EST==='pop'&&a>=80?80:a;
    s+=T(0,40,'t-xs',D.r2(ra))+T(320,42,'t-big t-end',pen);
    s+=T(0,66,'t-xs',D.r3(ra))+T(320,68,'t-big t-end',kid,'fill:var(--tdp)');
    s+=T(0,86,'t-xs',D.eq)+T(0,100,'t-xs',note,'fill:var(--ink)');
    return s}
  function drawP(t){
    const N=vb(ps,'720 440','400 896');const a=AGE(t);
    const popNo=EST==='pop'&&a<80,k=EST==='fam'?Math.round(50*PEN(a)):(a>=80?33:0);
    const L=N?{a:[30,0],b:[30,236],c:[40,446],d:[40,786]}:{a:[14,0],b:[14,236],c:[390,0],d:[390,334]};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=G(...L.a,ped(a))+G(...L.b,icons(a,k,popNo))+G(...L.c,chart(a))+G(...L.d,readout(a));
    ps.innerHTML=s;
    const p=phaseOf(GE_PDS,t);setP(p);$('#gpNote').innerHTML=noteHTML(GE_PDS[p]);
    rp.setAttribute('aria-valuetext',GE_TXT.ped.vt(a,GE_PDS[p].t));
  }
  const stopP=playWire(rp,$('#gpPlay'),drawP,14000,UI.replay,'genes');
  const setP=stepWire($('#gpSteps'),GE_PDS,rp,drawP,stopP);
  toggleRow($('#gpEst'),[ ['fam',`Family-based studies`],['pop',`Population cohort (UK Biobank)`] ],'fam',v=>{EST=v;drawP(+rp.value)});
  drawP(+rp.value);

  /* ---------- 3. share by ancestry ---------- */
  function bars(k){const A=GE_ANC[k],X=GE_TXT.anc,sc=v=>f1(v/35*100)+'%';
    $('#geBars').innerHTML=A.rows.map(([g,f,sp])=>`<div class="ge-bar"><b>${g}</b><div class="ge-trk"><div class="fam"><span>${X.fam(`<b>${f}</b>`)}</span><i style="width:${sc(f)}"></i></div><div class="spo"><span>${X.spo(`<b>${sp}</b>`)}</span><i style="width:${sc(sp)}"></i></div></div></div>`).join('');
    $('#geAncNote').innerHTML=`<div class="kicker">${A.k}</div><h4>${A.t}</h4><p>${A.txt}</p>`}
  toggleRow($('#geAnc'),GE_TXT.anc.opts,'eu',bars);bars('eu');

  /* ---------- 4. result reader ---------- */
  function res(id){const R=GE_RES.find(r=>r.id===id);
    $('#geOut').innerHTML=`<span class="tag ${R.tag}" style="align-self:flex-start">${R.n}</span><h4>${R.h}</h4><dl>${R.d.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`}
  toggleRow($('#geRes'),GE_RES.map(r=>[r.id,r.n]),'p',res);res('p');
};
