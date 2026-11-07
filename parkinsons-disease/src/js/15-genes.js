/* =============== 1.5 genes =============== */
const GE_INH={D:['DOMINANT','var(--rose)','var(--rose-soft)'],R:['RECESSIVE','var(--sky)','var(--sky-soft)'],K:['RISK FACTOR','var(--warn)','var(--warn-soft)']};
const GE_GENES=[
 {g:'SNCA',y:1997,yl:'1997',inh:'D',l:['A53T: Italian','and Greek'],n:'A53T families'},
 {g:'PRKN',y:1998,yl:'1998',inh:'R',l:['Juvenile','parkinsonism'],n:'juvenile onset'},
 {g:'DJ-1',y:2003,yl:'2003',inh:'R',l:['Early-onset','families'],n:'early onset'},
 {g:'PINK1',y:2004,yl:'2004',inh:'R',l:['Mitochondrial','kinase'],n:'mitochondrial'},
 {g:'LRRK2',y:2004,yl:'2004',inh:'D',l:['Kinase gain','of function'],n:'kinase gain'},
 {g:'GBA1',y:2009,yl:'2009 study',inh:'K',l:['Lysosomal','enzyme'],n:'lysosomal enzyme'},
 {g:'VPS35',y:2011,yl:'2011',inh:'D',l:['D620N,','retromer'],n:'D620N, retromer'}];
const GE_SHARE=[
 {l:'Family history of Parkinson\'s',a:15,v:'about 15%'},
 {l:'Single-gene (monogenic) form',a:5,b:10,v:'5–10%'},
 {l:'Positive test, PD GENEration',a:13,v:'13%'},
 {l:'Positive test, ROPAD (16 countries)',a:14.8,v:'14.8%'}];
const GE_OR=[
 {l:'GBA1 severe variants',s:'worldwide meta-analysis, by model',a:9.92,b:21.29,v:'9.92–21.29',c:'var(--violet)'},
 {l:'GBA1, any variant',s:'16 centres, 2009',a:5.43,v:'5.43',c:'var(--violet)'},
 {l:'GBA1 mild variants',s:'worldwide meta-analysis, by model',a:2.84,b:4.94,v:'2.84–4.94',c:'var(--violet)'},
 {l:'Polygenic score',s:'top vs bottom quarter',a:3.74,ci:[3.35,4.18],v:'3.74',c:'var(--sage)'},
 {l:'A parent, sibling or child with PD',s:'meta-analysis of risk factors',a:3.23,ci:[2.65,3.93],v:'3.23',c:'var(--sage)'},
 {l:'GBA1 E326K (E365K)',s:'risk variant, 15 studies',a:1.99,ci:[1.57,2.51],v:'1.99',c:'var(--violet)'},
 {l:'SNCA REP1 263-bp allele',s:'common promoter variant',a:1.43,ci:[1.22,1.69],v:'1.43',c:'var(--rose)'}];
const GE_WAF=[
 {g:'LRRK2 G2019S',col:'var(--rose)',soft:'var(--rose-soft)',lay:[[26,'26% by 80: kin-cohort, Ashkenazi'],[42.5,'42.5% by 80: kin-cohort, non-Ashkenazi'],[80,'80% by 79: family-based']]},
 {g:'GBA1 variants',col:'var(--violet)',soft:'var(--violet-soft)',lay:[[7.7,'7.7% by 80: Gaucher families'],[19,'19% by 80: relatives of unselected PD'],[29.7,'29.7% by 80: familial PD']]}];
const GE_STEPS=[
 {from:0,at:.22,k:'Step 1 · Monogenic',t:'Rare genes that cause it',
  txt:`Seven genes have been formally adjudicated as causal contributors to Parkinson's: LRRK2, GBA1, PRKN, SNCA, PINK1, PARK7 (DJ-1) and VPS35. [[Cook2024]] The first, SNCA, was found in 1997 in an Italian kindred and three Greek families with dominantly inherited Parkinson's. [[Polymeropoulos1997]] Parkin followed in 1998, DJ-1 in 2003, PINK1 and LRRK2 in 2004, and VPS35 in 2011. [[Kitada1998,Bonifati2003,Valente2004,PaisanRuiz2004,Zimprich2004,VilarinoGuell2011]] GBA1 is different: one copy is a risk factor rather than a cause, shown most clearly in a 16-centre study in 2009. [[Sidransky2009]]`,
  pt:'A few genes can cause Parkinson\'s on their own. Some need only one changed copy (dominant); others need both copies changed (recessive).',
  hook:'Dominant: SNCA, LRRK2, VPS35. Recessive, early onset: PRKN, PINK1, DJ-1. GBA1: one copy is a risk factor; two copies cause Gaucher disease.'},
 {from:.28,at:.37,k:'Step 2 · How many',t:'How many people carry one',
  txt:`About 15% of people with Parkinson's have a family history, and 5–10% have a monogenic form, according to a 2018 review. [[Deng2018]] Panel-testing studies find more because they also count GBA1 risk variants: 13% of 8,301 people in PD GENEration and 14.8% of 12,580 in ROPAD. [[Cook2024,Westenberger2024]] The two figures are not in conflict; they count different things.`,
  pt:'In large testing studies, about 13 to 15 in every 100 people with Parkinson\'s carried a relevant gene change, mostly in GBA1. Most did not carry one.'},
 {from:.4,at:.68,k:'Step 3 · Risk',t:'Common variants that shift the odds',
  txt:`Common variants each nudge the odds. The 2019 genome-wide study found 90 independent risk signals in 78 regions; together they explain 16–36% of the heritable risk, and common variation accounts for about 22% of liability. [[Nalls2019]] The bars are odds ratios on a log scale: GBA1 severe variants 9.92–21.29 and mild variants 2.84–4.94 depending on the model, [[GanOr2015]] any GBA1 variant 5.43, [[Sidransky2009]] the top against the bottom quarter of a polygenic score 3.74, [[Nalls2019]] a first-degree relative 3.23, [[Noyce2012]] E326K 1.99 [[Huang2018]] and the SNCA REP1 allele 1.43. [[Maraganore2006]]`,
  pt:'Many common gene differences each change the odds a little. Added together, they still explain only part of who gets Parkinson\'s.',
  hook:'GWAS 2019: 90 risk signals in 78 regions; SNP heritability about 22%. Odds ratios compare groups; they are not one person\'s chance.'},
 {from:.75,at:.97,k:'Step 4 · Penetrance',t:'Most carriers never develop PD',
  txt:`Penetrance is the share of carriers who develop the disease. For LRRK2 G2019S it was 26% by 80 in an Ashkenazi kin-cohort and 42.5% in non-Ashkenazi carriers, [[Marder2015,Lee2017LRRK2]] but 74–80% by 79 in families with many affected members. [[Healy2008]] For GBA1 it was 7.7% by 80 in heterozygous parents in Gaucher families, 19% in relatives of unselected patients and 29.7% in familial Parkinson's. [[Alcalay2014,Balestrino2020,Anheim2012]]`,
  pt:'Even with LRRK2 G2019S, most carriers in families found through unselected patients had not developed Parkinson\'s by 80. For GBA1 the share was smaller still.',
  hook:'LRRK2 G2019S: autosomal dominant with reduced, age-dependent penetrance. GBA1: heterozygous risk factor; homozygous causes Gaucher disease.'}];
const GE_DOSE={
 2:{t:'Two copies: the usual dose',txt:`Most people carry one SNCA copy on each chromosome 4. Common variation in the gene's promoter still shifts risk a little: the REP1 263-bp allele had an odds ratio of 1.43 and did not change age at onset. [[Maraganore2006]]`,
  pt:'Two copies of the synuclein gene is the usual number.'},
 3:{m:46.9,sd:10.5,t:'Three copies: a duplication',txt:`Duplication of the SNCA locus causes a picture close to idiopathic Parkinson's, with later onset, slow progression and no prominent dementia. [[ChartierHarlin2004]] In a meta-analysis of 59 families, mean onset with three copies was 46.9 ± 10.5 years. [[Book2018]]`,
  pt:'One extra copy of the synuclein gene was enough to cause Parkinson\'s, starting on average in the mid-40s.'},
 4:{m:34.5,sd:7.4,t:'Four copies: a triplication',txt:`Triplication of the SNCA locus was shown to cause Parkinson's in 2003. [[Singleton2003]] With four copies (a triplication, or a duplication on both chromosomes), mean onset was 34.5 ± 7.4 years in the 59-family meta-analysis, and dementia was noted in 50.9% of probands across the families. [[Book2018]] The authors of the duplication report suggest that SNCA dose relates to severity. [[ChartierHarlin2004]]`,
  pt:'Two extra copies of the synuclein gene went with an onset about 12 years earlier than one extra copy.'}};
const GE_CROSS=[
 {id:'dom',a:['V','+'],b:['+','+'],la:'G2019S carrier',lb:'no variant',
  par:`One parent carries LRRK2 G2019S on one of their two copies; the other parent has no variant. LRRK2 mutations cause autosomal dominant parkinsonism: one changed copy can be enough. [[Zimprich2004]]`,
  odds:`Two of the four boxes carry the variant, so each child has a 1-in-2 chance of inheriting it, whatever happened to brothers and sisters. Inheriting it is not the same as developing Parkinson's: turn on the penetrance layer.`,
  lay:`The layer shades each carrier box by published penetrance by about 80: 26% in an Ashkenazi kin-cohort (solid) and 42.5% in non-Ashkenazi carriers (pale), against 80% by 79 in families with many affected members (dashed line). [[Marder2015,Lee2017LRRK2,Healy2008]] Half of 26–42.5% is about 13–21 in every 100 children of a carrier parent, using the kin-cohort figures (our arithmetic).`},
 {id:'rec',a:['V','+'],b:['V','+'],la:'PRKN carrier',lb:'PRKN carrier',
  par:`Both parents carry one PRKN variant. Parkin mutations cause autosomal recessive juvenile parkinsonism, and in 2000 they were found in 49% of early-onset families whose parents were unaffected. [[Kitada1998,Lucking2000]]`,
  odds:`One box has two variants, two boxes are carriers like the parents, and one has neither: per child, 1 in 4, 2 in 4 and 1 in 4. In isolated cases, parkin mutations were found in 77% with onset at 20 or younger but in only 3% with onset after 30. [[Lucking2000]]`,
  lay:`No penetrance figure for two PRKN variants was found in the sources used here, so the box is not shaded. Across more than 1,100 people with two PRKN, PINK1 or DJ-1 variants, median onset was about 30, the illness was clinically typical, and treatment response was excellent. [[Kasten2018]] Lewy bodies can be absent in parkin Parkinson's. [[Schneider2017]]`}];
const GE_P=[
 {from:0,at:.1,k:'Step 1 · Parents',t:'Two copies each',txt:'',pt:'Everyone has two copies of each of these genes, one from each parent.'},
 {from:.15,at:.34,k:'Step 2 · Egg and sperm',t:'Each parent passes one copy',
  txt:'Egg and sperm cells carry only one copy of each chromosome, so each parent passes on one of their two copies, at random, again at every pregnancy.',
  pt:'Each parent hands down one of their two copies, like a coin toss.',hook:'Each pregnancy is a fresh draw: one affected child does not change the chances for the next.'},
 {from:.38,at:.64,k:'Step 3 · Children',t:'Four equally likely boxes',
  txt:'Each box pairs one copy from each parent. The four boxes are equally likely, so each is a quarter of the outcomes for any one child.',
  pt:'There are four equally likely ways the copies can combine.'},
 {from:.8,at:.98,k:'Step 4 · The odds',t:'What the square predicts',txt:'',pt:'The fractions are chances for each child, not a count of how many children will be affected.'}];
const GE_PEN={
 L:{n:'LRRK2 G2019S',max:100,tk:20,
  S:[{n:'Family-based, Kaplan-Meier',sh:'Family, K-M',src:'consortium 2008',pts:[[59,36],[69,59],[79,80]],c:'var(--rose)'},
     {n:'Family-based, likelihood',sh:'Family, likelihood',src:'consortium 2008',pts:[[59,28],[69,51],[79,74]],c:'var(--rose)',dash:1},
     {n:'Kin-cohort, non-Ashkenazi',sh:'Kin, non-Ashkenazi',src:'2017, 474 relatives',pts:[[80,42.5]],ci:[26.3,65.8],c:'var(--violet)'},
     {n:'Kin-cohort, Ashkenazi',sh:'Kin, Ashkenazi',src:'2015, 2,270 relatives',pts:[[80,26]],ci:[18,36],c:'var(--sky)'}],
  dis:[26,80,'Published range 24–100%'],
  txt:`Family-based estimates from the LRRK2 consortium reached 28%, 51% and 74% at 59, 69 and 79 by the likelihood method, or 36%, 59% and 80% by Kaplan-Meier with index cases excluded. [[Healy2008]] Kin-cohort studies, which start from the relatives of unselected patients, found 26% by 80 in Ashkenazi Jewish carriers (95% CI 18–36%) and 42.5% in non-Ashkenazi carriers (26.3–65.8%), not significantly different. [[Marder2015,Lee2017LRRK2]] The other proven LRRK2 mutations combined reached 84% by 79. [[Healy2008]]`,
  dtxt:`The bracket spans 26% to 80% around age 80. Published G2019S estimates range from 24% to 100%; family-based figures far exceed kin-cohort figures because families with many affected members are found first. [[Marder2015,Healy2008,Lee2017LRRK2]]`,
  pt:'Older carriers are more likely to have Parkinson\'s, but how likely depends a great deal on how the families were found.',
  hook:'LRRK2 G2019S penetrance: about 26–42.5% by 80 in kin-cohorts, 74–80% by 79 in family-based studies.'},
 G:{n:'GBA1',max:40,tk:10,
  S:[{n:'Familial PD, France',sh:'Familial PD',src:'dominant model, 2012',pts:[[50,7.6],[60,13.7],[70,21.4],[80,29.7]],c:'var(--violet)'},
     {n:'Relatives of unselected PD, Italy',sh:'Unselected PD',src:'kin-cohort, 2020',pts:[[60,10],[70,16],[80,19]],c:'var(--violet)',dash:1},
     {n:'Parents of Gaucher patients, New York',sh:'Gaucher parents, NY',src:'obligate carriers, 2013',pts:[[65,2.2],[85,10.9]],c:'var(--sky)'},
     {n:'Heterozygous parents, Ashkenazi',sh:'Gaucher parents, AJ',src:'Gaucher families, 2014',pts:[[60,1.5],[80,7.7]],c:'var(--sky)',dash:1},
     {n:'Non-carriers, same families',sh:'Non-carriers',src:'Gaucher families, 2014',pts:[[60,.7],[80,2.1]],c:'var(--muted)'}],
  dis:[7.7,29.7,'About threefold by ascertainment'],
  txt:`In familial Parkinson's (French families, dominant model) penetrance was 7.6% at 50, 13.7% at 60, 21.4% at 70 and 29.7% at 80, and did not differ between N370S, L444P and rarer mutations at 70. [[Anheim2012]] In relatives of unselected Italian patients it was 10%, 16% and 19% at 60, 70 and 80. [[Balestrino2020]] In parents of Gaucher patients it was 2.2% at 65 and 10.9% at 85 in New York, [[Rana2013]] and 1.5% at 60 and 7.7% at 80 in Ashkenazi families, against 0.7% and 2.1% in non-carriers. People with Gaucher disease itself reached 9.1% by 80. [[Alcalay2014]]`,
  dtxt:`The bracket spans 7.7% to 29.7% at 80. Gaucher-family cohorts give about 8–11% by 80–85, relatives of unselected patients about 19%, and familial Parkinson's cohorts about 30%. [[Anheim2012,Balestrino2020,Rana2013,Alcalay2014]]`,
  pt:'Most people with one GBA1 variant do not develop Parkinson\'s, even at 80.',
  hook:'GBA1 penetrance is low to moderate, about 8–30% by 80, roughly threefold apart by ascertainment.'}};
const GE_COL={l:['var(--rose)','var(--rose-soft)'],g:['var(--violet)','var(--violet-soft)'],o:['var(--sage)','var(--sage-soft)'],c:['var(--muted)','var(--panel-2)']};
const GE_POP=[
 {id:'eu',b:'Europe',h:['LRRK2 G2019S AND GBA1 IN PEOPLE WITH PD, EUROPE AND BEYOND','G2019S AND GBA1, EUROPE'],max:16,
  leg:[['l',0,'G2019S, sporadic PD'],['l',1,'G2019S, hereditary PD'],['g',0,'GBA1']],
  rows:[{l:'Portugal',s:'LRRK2 G2019S',k:'l',v:[[4,'4%'],[14,'14%']]},{l:'Spain',s:'LRRK2 G2019S',k:'l',v:[[3,'3%'],[4,'4%']]},
        {l:'Britain',s:'LRRK2 G2019S',k:'l',v:[[1,'1%'],[2,'2%']]},{l:'Germany and Austria',s:'LRRK2 G2019S',k:'l',v:[[.5,'<1%'],[1,'1%']]},
        {l:'Asia',s:'LRRK2 G2019S, 4 of 4,172 patients',k:'l',v:[[.1,'<0.1%']]},
        {l:'Non-Ashkenazi, 16 centres',s:'GBA1 L444P or N370S',k:'g',v:[[3,'3%']]},{l:'Non-Ashkenazi, sequenced',s:'any GBA1 mutation, 1,883 patients',k:'g',v:[[7,'7%']]}],
  read:'<b>Europe</b> · G2019S 1% of sporadic, 4% of hereditary PD worldwide · higher in the south',
  t:'G2019S is rare in northern Europe',
  txt:`Worldwide, G2019S was found in 1% of sporadic and 4% of hereditary Parkinson's and in fewer than 1% of controls (11 of 14,886). It was more common in southern than northern Europe: 4% and 14% in Portugal against under 1% and 1% in Germany and Austria. [[Healy2008]] Among non-Ashkenazi patients in 16 centres, the two common GBA1 mutations were found in 3%, under 1% of controls; full sequencing found mutations in 7%, so screening for only those two missed about half. [[Sidransky2009]]`},
 {id:'aj',b:'Ashkenazi Jewish',h:['LRRK2 G2019S AND GBA1 IN ASHKENAZI JEWISH PEOPLE WITH PD','ASHKENAZI JEWISH, WITH PD'],max:32,
  leg:[['l',0,'G2019S, all or sporadic'],['l',1,'G2019S, familial'],['g',0,'GBA1'],['c',0,'controls']],
  rows:[{l:'Letter, 2006',s:'G2019S, all PD (as reported)',k:'l',v:[[18.3,'18.3%']]},{l:'Consortium, 2008',s:'G2019S',k:'l',v:[[10,'10%'],[28,'28%']]},
        {l:'Tel Aviv, 2007',s:'G2019S',k:'l',v:[[10.6,'10.6%'],[26,'26%']]},{l:'16 centres, 2009',s:'GBA1 L444P or N370S',k:'g',v:[[15,'15%']]},
        {l:'Tel Aviv, 2008',s:'any of 8 GBA founder mutations',k:'g',v:[[17.9,'17.9%']]},{l:'Controls',s:'G2019S, 2006 letter; GBA, Tel Aviv elderly',k:'c',v:[[1.3,'1.3%'],[4.2,'4.2%']]}],
  read:'<b>Ashkenazi Jewish</b> · G2019S 10–28% · GBA1 15–17.9% · more than a third carry one of the two',
  t:'Ashkenazi Jewish: high for both genes',
  txt:`G2019S was found in 18.3% of Ashkenazi patients against 1.3% of Ashkenazi controls in a 2006 letter (figures taken from secondary reports), [[Ozelius2006]] in 10% of sporadic and 28% of hereditary Ashkenazi patients in the consortium data, [[Healy2008]] and in 10.6% of sporadic and 26% of familial cases in Tel Aviv. [[OrrUrtreger2007]] For GBA1, 15% of Ashkenazi patients carried L444P or N370S against 3% of controls, [[Sidransky2009]] and 17.9% carried one of eight founder mutations in Tel Aviv against 4.2% of elderly controls. More than a third of that population carried a GBA or LRRK2 mutation. [[GanOr2008]]`},
 {id:'na',b:'North African',h:['LRRK2 G2019S IN NORTH AFRICAN ARAB PEOPLE WITH PD','NORTH AFRICAN ARAB, WITH PD'],max:48,
  leg:[['l',0,'sporadic PD'],['l',1,'hereditary or familial PD'],['c',0,'controls']],
  rows:[{l:'Consortium, 2008',s:'G2019S, North African Arabs',k:'l',v:[[39,'39%'],[36,'36%']]},{l:'Letter, 2006',s:'G2019S, 104 patients (as reported)',k:'l',v:[[41,'41%'],[37,'37%']]},
        {l:'Controls',s:'G2019S, 4 of 739',k:'c',v:[[.5,'<1%']]}],
  read:'<b>North African Arab</b> · G2019S in about 4 in 10 people with PD · under 1% of controls',
  t:'North African: the highest G2019S share',
  txt:`In the consortium data, G2019S was found in 39% of sporadic and 36% of hereditary Parkinson's in North African Arabs, but in fewer than 1% of controls (4 of 739). [[Healy2008]] A 2006 letter on 104 North African Arab patients reported 41% of sporadic and 37% of familial cases (figures from a secondary report). [[Lesage2006]] PD GENEration counts North African Berber ancestry, with Ashkenazi Jewish and Basque, as high-risk ancestry; 23.9% of that group tested positive. [[Cook2024]] No GBA1 share for North African patients was found in the sources used here.`},
 {id:'il',b:'Israel 2025',h:['ISRAEL, ROPAD 2025: 2,699 PATIENTS TESTED','ISRAEL 2025 · 2,699 TESTED · 19.0% POSITIVE'],max:20,
  read:'<b>Israel 2025</b> · 512 of 2,699 (19.0%) positive · LRRK2 only 6.9% · GBA1 only 10.5% · both 0.6% · other genes 1.0%',
  t:'Israel 2025: one in five tested positive',
  txt:`The Israeli arm of ROPAD tested 2,699 patients from all participating movement-disorder clinics for 8 Parkinson's genes and 37 related genes. 512 (19.0%) had a relevant result: LRRK2 only 187 (6.9%), GBA1 only 283 (10.5%), both 15 (0.6%), and PRKN, PINK1, PARK7, SNCA or VPS35 26 (1.0%). Without LRRK2 and GBA1 the yield was 1.2%. [[Anis2025]] The 19.0% is higher than ROPAD's international 14.8%. [[Westenberger2024]]`,
  hook:`Why 6.9% and 7.1% are both right: "LRRK2 only" leaves out the 15 people who also carry GBA1, while "G2019S in 191 (7.1%)" counts every carrier of that variant. All LRRK2 carriers: 187 + 15 = 202 (7.5%). All GBA1 carriers: 283 + 15 + 1 (with SNCA) = 299 (11.1%), 173 of them N409S. Our arithmetic from the abstract counts. [[Anis2025]] Older Israeli figures are higher because they counted Ashkenazi patients only, for example G2019S in 14.8% of Ashkenazi versus 2.7% of non-Ashkenazi Jewish patients. [[OrrUrtreger2007]]`},
 {id:'ww',b:'Testing programmes',h:['POSITIVE RESULTS BY GENE IN TWO INTERNATIONAL TESTING PROGRAMMES','POSITIVE RESULTS BY GENE'],max:12,
  leg:[['o',0,'ROPAD, 16 countries'],['o',1,'PD GENEration, North America']],
  rows:[{l:'GBA1',s:'risk and other variants',k:'g',v:[[10.4,'10.4%'],[7.7,'7.7%']]},{l:'LRRK2',s:'pathogenic variants',k:'l',v:[[2.9,'2.9%'],[2.4,'2.4%']]},
        {l:'PRKN',s:'two variants',k:'o',v:[[.9,'0.9%'],[2.1,'2.1%']]},{l:'SNCA',s:'',k:'o',v:[[.2,'0.2%'],[.1,'0.1%']]},
        {l:'PINK1',s:'2nd bar: PINK1, PARK7 and VPS35',k:'o',v:[[.1,'0.1%'],[.2,'0.2%']]},{l:'More than one gene',s:'',k:'o',v:[[.2,'0.2%'],[.4,'0.4%']]}],
  read:'<b>Testing programmes</b> · ROPAD 14.8% of 12,580 · PD GENEration 13% of 8,301',
  t:'International testing programmes',
  txt:`ROPAD (12,580 patients, 16 countries) found GBA1 risk variants in 10.4%, LRRK2 in 2.9%, PRKN 0.9%, SNCA 0.2% and PINK1 0.1%, with about 0.2% positive in two genes. [[Westenberger2024]] PD GENEration (8,301 North American participants) found GBA1 in 7.7%, LRRK2 2.4%, PRKN 2.1%, SNCA 0.1%, and PINK1, PARK7 and VPS35 together 0.2%, with 0.4% in more than one gene. [[Cook2024]]`}];
const GE_ORS=[
 {v:7.7,l:'Heterozygous parents, Ashkenazi Gaucher families',sh:'Gaucher-family carriers',c:'same study as the non-carriers',k:'[[Alcalay2014]]'},
 {v:19,l:'Relatives of unselected patients, Italy (kin-cohort)',sh:'Relatives of unselected PD',c:'different study, cross-study comparison',k:'[[Balestrino2020]]'},
 {v:29.7,l:'Familial Parkinson\'s, France (dominant model)',sh:'Familial PD carriers',c:'different study, cross-study comparison',k:'[[Anheim2012]]'}];
/* 10 x 10 grid: lay lists the layers as (upTo, label); prog is the reveal 0..1 of each layer */
function geWaffle(x,y,c,gap,lay,prog,col,soft){let s='',start=0;const ends=lay.map(l=>Math.round(l[0]));
  for(let i=0;i<100;i++){const cx=x+(i%10)*(c+gap),cy=y+Math.floor(i/10)*(c+gap);let j=ends.findIndex(e=>i<e);
    if(j>=0){const st=j?ends[j-1]:0,on=(i-st)<prog[j]*(ends[j]-st);
      if(on&&j===0)s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${c}" height="${c}" rx="2" style="fill:${col}"/>`;
      else if(on&&j===1)s+=`<rect x="${f1(cx+.75)}" y="${f1(cy+.75)}" width="${c-1.5}" height="${c-1.5}" rx="2" style="fill:${soft};stroke:${col};stroke-width:1.5"/>`;
      else if(on&&j===2)s+=`<rect x="${f1(cx+.75)}" y="${f1(cy+.75)}" width="${c-1.5}" height="${c-1.5}" rx="2" style="fill:var(--panel);stroke:${col};stroke-width:1.3;stroke-dasharray:3 2"/>`;
      else s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${c}" height="${c}" rx="2" style="fill:var(--panel-2)"/>`}
    else s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${c}" height="${c}" rx="2" style="fill:var(--panel-2)"/>`}
  return s}
function geSwatch(x,y,j,col,soft){return j===0?`<rect x="${x}" y="${y-9}" width="11" height="11" rx="2" style="fill:${col}"/>`:j===1?`<rect x="${x}" y="${y-9}" width="11" height="11" rx="2" style="fill:${soft};stroke:${col};stroke-width:1.5"/>`:`<rect x="${x}" y="${y-9}" width="11" height="11" rx="2" style="fill:var(--panel);stroke:${col};stroke-width:1.3;stroke-dasharray:3 2"/>`}
const geBg=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
const geHalo='stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round';
inits.genes=()=>{
  /* ---------------- 1. architecture ---------------- */
  const svg=$('#geArch'),rg=$('#geT');let lastN='';
  function sc1(N,t){
    let s=`<text x="${N?16:20}" y="24" class="t-xs">${N?'THE SEVEN GENES COUNTED AS CAUSES':'THE SEVEN GENES ADJUDICATED AS CAUSES, BY YEAR FIRST REPORTED'}</text>`;
    if(!N){const X=y=>40+(y-1996)/16*640,cy=lerp(1996,2012,ramp(t,.02,.29));
      s+=`<path d="M40 62H680" class="axis" style="stroke:var(--muted);stroke-width:1.5"/><path d="M40 62H${f1(X(cy))}" style="stroke:var(--rose);stroke-width:3;stroke-linecap:round"/>`;
      for(let y=1996;y<=2012;y+=2)s+=`<path d="M${f1(X(y))} 58v8" class="axis"/><text x="${f1(X(y))}" y="48" class="t-xs t-mid">${y}</text>`;
      GE_GENES.forEach((G,i)=>{const k=ramp(t,.03+i*.035,.07+i*.035),x=28+i*96,y=108,w=88,h=118,I=GE_INH[G.inh];
        s+=`<g style="opacity:${f1(.15+.85*k)}"><path d="M${x+w/2} ${y} L${f1(X(G.y))} 66" style="stroke:${I[1]};stroke-width:1.2;fill:none;${k<1?'stroke-dasharray:3 3':''}"/><circle cx="${f1(X(G.y))}" cy="62" r="4" style="fill:${k>=1?I[1]:'var(--panel)'};stroke:${I[1]};stroke-width:1.5"/>`;
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:${k>=1?I[1]:'var(--line)'};stroke-width:${k>=1?2:1}"/>`;
        s+=`<text x="${x+10}" y="${y+26}" class="t-big">${G.g}</text><rect x="${x+8}" y="${y+36}" width="${w-16}" height="16" rx="4" style="fill:${I[2]}"/><text x="${x+w/2}" y="${y+48}" class="t-xs t-mid" style="fill:${I[1]};font-weight:600">${I[0]}</text>`;
        s+=`<text x="${x+10}" y="${y+72}" class="t-xs" style="fill:var(--ink)">${G.l[0]}</text><text x="${x+10}" y="${y+85}" class="t-xs" style="fill:var(--ink)">${G.l[1]}</text><text x="${x+10}" y="${y+108}" class="t-sm">${G.yl}</text></g>`});
    }else{
      GE_GENES.forEach((G,i)=>{const k=ramp(t,.03+i*.035,.07+i*.035),x=i%2?206:16,y=40+Math.floor(i/2)*74,w=178,h=64,I=GE_INH[G.inh];
        s+=`<g style="opacity:${f1(.15+.85*k)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:${k>=1?I[1]:'var(--line)'};stroke-width:${k>=1?2:1}"/>`;
        s+=`<text x="${x+12}" y="${y+26}" class="t-big">${G.g}</text><rect x="${x+w-84}" y="${y+12}" width="72" height="16" rx="4" style="fill:${I[2]}"/><text x="${x+w-48}" y="${y+24}" class="t-xs t-mid" style="fill:${I[1]};font-weight:600">${I[0]}</text>`;
        s+=`<text x="${x+12}" y="${y+50}" class="t-sm" style="fill:var(--ink)">${G.y}</text><text x="${x+56}" y="${y+50}" class="t-xs">${G.n}</text></g>`});
    }
    const B=N?{t:354,tk:372,y0:394,dy:56,x0:16,x1:300}:{t:250,tk:264,y0:280,dy:28,x0:330,x1:650},k2=ramp(t,.27,.33);
    const XS=v=>B.x0+v/20*(B.x1-B.x0),gy1=B.y0+3*B.dy+(N?24:14);
    s+=`<g style="opacity:${f1(.25+.75*k2)}"><text x="${N?16:20}" y="${B.t}" class="t-xs">SHARE OF PEOPLE WITH PARKINSON'S${N?'':' · 0–20%'}</text>`;
    [0,5,10,15,20].forEach(v=>{s+=`<text x="${f1(XS(v))}" y="${B.tk}" class="t-xs t-mid">${v}%</text><path d="M${f1(XS(v))} ${B.tk+5}V${gy1}" class="grid"/>`});
    GE_SHARE.forEach((r,i)=>{const y=B.y0+i*B.dy,g=ease(ramp(t,.28+i*.022,.34+i*.022)),by=N?y+8:y;
      s+=N?`<text x="16" y="${y}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`:`<text x="20" y="${y+10}" class="t-sm" style="fill:var(--ink)">${r.l}</text>`;
      const col=i>1?'var(--violet)':i?'var(--rose)':'var(--sage)';
      s+=`<rect x="${B.x0}" y="${by}" width="${f1((XS(r.a)-B.x0)*g)}" height="13" rx="3" style="fill:${col}"/>`;
      if(r.b)s+=`<rect x="${f1(XS(r.a))}" y="${by}" width="${f1((XS(r.b)-XS(r.a))*ramp(g,.6,1))}" height="13" rx="3" style="fill:${col};opacity:.35"/>`;
      if(g>.05)s+=`<text x="${f1(XS(r.b||r.a)*1+6)}" y="${by+11}" class="t-sm" style="fill:var(--ink);opacity:${f1(g)}">${r.v}</text>`});
    return s+'</g>'}
  function sc2(N,t){
    const L=N?{x0:16,x1:384,tk:50,y0:74,dy:60}:{x0:300,x1:676,tk:48,y0:68,dy:36};
    const X=v=>L.x0+Math.log(v)/Math.log(30)*(L.x1-L.x0),gy1=L.y0+6*L.dy+(N?38:16);
    let s=`<text x="${N?16:20}" y="24" class="t-xs">${N?'ODDS RATIOS · LOG SCALE':'ODDS RATIOS FOR PARKINSON\'S · LOG SCALE · 1 = NO DIFFERENCE'}</text>`;
    [1,2,5,10,20,30].forEach(v=>{const x=f1(X(v));s+=`<text x="${x}" y="${L.tk}" class="t-xs ${v===30&&N?'t-end':'t-mid'}">${v}</text><path d="M${x} ${L.tk+5}V${gy1}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--ink);stroke-width:1.5':''}"/>`});
    GE_OR.forEach((r,i)=>{const y=L.y0+i*L.dy,g=ease(ramp(t,.44+i*.03,.5+i*.03)),by=N?y+20:y-1,x1=X(1);
      if(N)s+=`<text x="16" y="${y}" class="t-sm" style="fill:var(--ink)">${r.l}</text><text x="16" y="${y+13}" class="t-xs">${r.s}</text><text x="384" y="${y}" class="t-lbl t-end" style="opacity:${f1(g)}">${r.v}</text>`;
      else s+=`<text x="20" y="${y+8}" class="t-sm" style="fill:var(--ink)">${r.l}</text><text x="20" y="${y+21}" class="t-xs">${r.s}</text>`;
      s+=`<rect x="${f1(x1)}" y="${by}" width="${f1(Math.max(1.5,(X(r.a)-x1)*g))}" height="14" rx="3" style="fill:${r.c}"/>`;
      let end=X(r.a);
      if(r.b&&g>.6){s+=`<rect x="${f1(X(r.a))}" y="${by}" width="${f1((X(r.b)-X(r.a))*ramp(g,.6,1))}" height="14" rx="3" style="fill:${r.c};opacity:.35"/>`;end=X(r.b)}
      if(r.ci&&g>.98){const a=X(r.ci[0]),b=X(r.ci[1]),cy=by+7;s+=`<path d="M${f1(a)} ${cy}H${f1(b)} M${f1(a)} ${cy-5}v10 M${f1(b)} ${cy-5}v10" style="stroke:var(--ink);stroke-width:1.4"/>`;end=b}
      if(!N&&g>.05)s+=`<text x="${f1(end+6)}" y="${by+11}" class="t-sm" style="fill:var(--ink);opacity:${f1(g)}">${r.v}</text>`});
    const k=ramp(t,.64,.7),fy=N?520:342;
    s+=`<g style="opacity:${f1(k)}"><path d="M16 ${fy-18}H${N?384:704}" class="axis"/>`;
    const F=N?[['90','risk signals in 78 genome regions (2019)'],['16–36%','of heritable risk explained by them'],['≈22%','of liability from common variants']]
             :[['90','risk signals in 78 regions (2019 GWAS)'],['16–36%','of heritable risk explained by them'],['≈22%','of liability: common variants']];
    F.forEach(([b,l],i)=>{const x=N?16:20+i*240,y=N?fy+i*36:fy;
      s+=N?`<text x="${x}" y="${y+6}" class="t-big" style="font-size:20px;fill:var(--sage)">${b}</text><text x="${x+b.length*11+12}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${l}</text>`
          :`<text x="${x}" y="${y+6}" class="t-big" style="font-size:20px;fill:var(--sage)">${b}</text><text x="${x}" y="${y+24}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    return s+'</g>'}
  function sc3(N,t){
    const P=[ramp(t,.79,.85),ramp(t,.85,.89),ramp(t,.89,.93)];
    let s=`<text x="${N?16:20}" y="24" class="t-xs">${N?'OF 100 CARRIERS, PD BY ABOUT 80':'OF 100 CARRIERS, HOW MANY HAVE PARKINSON\'S BY ABOUT AGE 80? THREE STUDY TYPES EACH'}</text>`;
    GE_WAF.forEach((W,w)=>{const L=N?{x:120,y:w?346:62,c:14,tx:200,ty:w?334:50,lx:34,ly:w?530:246}:{x:w?420:60,y:70,c:15,tx:w?505:145,ty:56,lx:w?400:40,ly:268};
      s+=`<text x="${L.tx}" y="${L.ty}" class="t-lbl t-mid">${W.g}</text>`;
      s+=geWaffle(L.x,L.y,L.c,2,W.lay,P,W.col,W.soft);
      W.lay.forEach((l,j)=>{const y=L.ly+j*18;s+=`<g style="opacity:${f1(.2+.8*P[j])}">${geSwatch(L.lx,y,j,W.col,W.soft)}<text x="${L.lx+17}" y="${y}" class="t-xs" style="fill:var(--ink)">${l[1]}</text></g>`})});
    const k=ramp(t,.93,.97);
    s+=N?`<text x="200" y="618" class="t-lbl t-mid" style="opacity:${f1(k)}">Penetrance depends on how families were found</text>`
        :`<text x="360" y="352" class="t-lbl t-mid" style="opacity:${f1(k)}">Penetrance is incomplete for both genes, and the estimate depends on how families were found.</text><text x="360" y="372" class="t-xs t-mid" style="opacity:${f1(k)}">Squares rounded to whole people.</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const o1=1-ramp(t,.37,.41),o2=ramp(t,.39,.43)*(1-ramp(t,.72,.76)),o3=ramp(t,.74,.78);
    let s=geBg;
    if(o1>0)s+=`<g style="opacity:${f1(o1)}">${sc1(N,t)}</g>`;
    if(o2>0)s+=`<g style="opacity:${f1(o2)}">${sc2(N,t)}</g>`;
    if(o3>0)s+=`<g style="opacity:${f1(o3)}">${sc3(N,t)}</g>`;
    svg.innerHTML=s;
    const p=phaseOf(GE_STEPS,t);setSt(p);
    const h=noteHTML(GE_STEPS[p]);if(h!==lastN){$('#geNote').innerHTML=h;lastN=h}
  }
  const stop=playWire(rg,$('#gePlay'),draw,22000,'Replay','genes');
  const setSt=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);

  /* ---------------- 2. SNCA dose ---------------- */
  const dv=$('#geDose');let dose=3,dm={m:46.9,sd:10.5,o:1},stopD=null;
  function drawD(){
    const N=vb(dv,'720 260','400 440'),D=GE_DOSE[dose];
    const L=N?{cx:[70,140],top:30,bot:186,cen:66,sn:112,big:[200,62],sub:[200,84],ax0:30,ax1:370,ay:300,dem:[200,404]}
             :{cx:[80,150],top:34,bot:226,cen:72,sn:124,big:[205,70],sub:[205,92],ax0:420,ax1:690,ay:150,dem:[540,226]};
    let s=geBg;
    s+=`<text x="${N?16:20}" y="20" class="t-xs">CHROMOSOME 4 · BOTH COPIES</text>`;
    L.cx.forEach((x,c)=>{const n=c===0?(dose===2?1:dose-1):1;
      s+=`<rect x="${x-13}" y="${L.top}" width="26" height="${L.cen-L.top-4}" rx="11" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><rect x="${x-13}" y="${L.cen+4}" width="26" height="${L.bot-L.cen-4}" rx="11" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M${x} ${L.cen-4}V${L.cen+4}" style="stroke:var(--cell-line);stroke-width:5"/>`;
      for(let k=0;k<n;k++){const y=L.sn+k*14;s+=`<rect x="${x-13}" y="${y}" width="26" height="11" style="fill:var(--rose);opacity:${k?.85:1}"/>`}
      s+=`<text x="${x}" y="${L.bot+16}" class="t-xs t-mid">copy ${c+1}</text>`});
    s+=`<path d="M${L.cx[1]+16} ${L.sn+5}h14" style="stroke:var(--rose);stroke-width:1.5"/><text x="${L.cx[1]+34}" y="${L.sn+9}" class="t-sm" style="fill:var(--rose)">SNCA</text>`;
    s+=`<text x="${L.big[0]}" y="${L.big[1]}" class="t-big" style="font-size:24px">${dose} SNCA copies</text><text x="${L.sub[0]}" y="${L.sub[1]}" class="t-xs">${dose===2?'the usual dose':dose===3?'duplication on one chromosome':'triplication, or duplication on both'}</text>`;
    const A=a=>L.ax0+(a-20)/60*(L.ax1-L.ax0);
    s+=`<text x="${L.ax0}" y="${L.ay-62}" class="t-xs">MEAN AGE AT ONSET ± 1 SD (59 FAMILIES)</text>`;
    s+=`<path d="M${L.ax0} ${L.ay}H${L.ax1}" class="axis" style="stroke:var(--muted);stroke-width:2"/>`;
    for(let a=20;a<=80;a+=10)s+=`<path d="M${f1(A(a))} ${L.ay-4}v8" class="axis"/><text x="${f1(A(a))}" y="${L.ay+20}" class="t-xs t-mid">${a}</text>`;
    [3,4].forEach(d=>{if(d===dose)return;const G=GE_DOSE[d];s+=`<g style="opacity:.28"><rect x="${f1(A(G.m-G.sd))}" y="${L.ay-6}" width="${f1(A(G.m+G.sd)-A(G.m-G.sd))}" height="12" rx="6" style="fill:var(--rose-soft);stroke:var(--rose)"/><circle cx="${f1(A(G.m))}" cy="${L.ay}" r="5" style="fill:var(--rose)"/><text x="${f1(A(G.m))}" y="${L.ay+36}" class="t-xs t-mid">${d} copies</text></g>`});
    if(dm.o>0){const x=A(dm.m),a=A(dm.m-dm.sd),b=A(dm.m+dm.sd);
      s+=`<g style="opacity:${f1(dm.o)}"><rect x="${f1(a)}" y="${L.ay-9}" width="${f1(b-a)}" height="18" rx="9" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5"/><circle cx="${f1(x)}" cy="${L.ay}" r="8" style="fill:var(--rose);stroke:var(--panel);stroke-width:2"/>`;
      s+=`<path d="M${f1(x)} ${L.ay-12}V${L.ay-30}" style="stroke:var(--rose);stroke-width:1.2"/><text x="${f1(x)}" y="${L.ay-36}" class="t-lbl t-mid">${f1(dm.m)} ± ${f1(dm.sd)} years</text></g>`}
    if(dose===2)s+=`<text x="${f1((L.ax0+L.ax1)/2)}" y="${L.ay-36}" class="t-sm t-mid" style="fill:var(--ink)">No SNCA multiplication: no onset marker</text>`;
    s+=`<text x="${L.dem[0]}" y="${L.dem[1]}" class="t-xs t-mid">${dose===2?'':'Dementia in 50.9% of probands (all families)'}</text>`;
    dv.innerHTML=s;
    $('#geDoseNote').innerHTML=noteHTML({k:'SNCA · '+dose+' copies',t:D.t,txt:D.txt,pt:D.pt,hook:'SNCA dose effect: duplication (3 copies) mean onset about 47; triplication (4 copies) about 35. [[Book2018]]'});
  }
  function setDose(d){const from={...dm},to=d===2?{m:from.m,sd:from.sd,o:0}:{m:GE_DOSE[d].m,sd:GE_DOSE[d].sd,o:1};dose=d;
    [[2,'#geD2'],[3,'#geD3'],[4,'#geD4']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===d));
    if(from.o===0){from.m=to.m;from.sd=to.sd}
    if(stopD)stopD();stopD=animate(650,p=>{const e=ease(p);dm={m:lerp(from.m,to.m,e),sd:lerp(from.sd,to.sd,e),o:lerp(from.o,to.o,e)};drawD()},()=>{stopD=null;dm=to;drawD()})}
  $('#geD2').onclick=()=>setDose(2);$('#geD3').onclick=()=>setDose(3);$('#geD4').onclick=()=>setDose(4);

  /* ---------------- 3. Punnett ---------------- */
  const ps=$('#gePun'),rp=$('#gePT');let X=GE_CROSS[0],layer=false,lastP='';
  const KN={dom:['carries the variant','var(--rose-soft)','var(--rose)','has variant'],two:['two variants','var(--rose-soft)','var(--rose)','two variants'],car:['carrier, one copy','var(--warn-soft)','var(--warn)','carrier'],none:['no variant','var(--sage-soft)','var(--sage)','no variant']};
  const kind=(a,b)=>X.id==='dom'?((a==='V'||b==='V')?'dom':'none'):(a==='V'&&b==='V')?'two':(a==='V'||b==='V')?'car':'none';
  const chip=(x,y,a,r=14)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${a==='V'?'var(--rose)':'var(--sage)'}"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:var(--panel)">${a}</text>`;
  function drawP(t){
    const N=vb(ps,'720 400','400 690');
    const CX=N?[205,315]:[290,410],RY=N?[265,375]:[197,292],HX=N?118:190,HY=N?188:128;
    const GX0=N?150:230,GY0=N?210:150,CW=N?110:120,CH=N?110:95;
    const P1=N?[[175,48],[225,48]]:[[325,52],[375,52]],P2=N?[[175,114],[225,114]]:[[55,245],[105,245]];
    const B1=N?[140,30]:[290,34],B2=N?[140,96]:[20,227];
    let s=geBg;
    s+=`<rect x="${B1[0]}" y="${B1[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B1[0]+60}" y="${B1[1]-9}" class="t-sm t-mid">Parent 1: ${X.la}</text>`;
    s+=`<rect x="${B2[0]}" y="${B2[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B2[0]+60}" y="${B2[1]-9}" class="t-sm t-mid">Parent 2: ${X.lb}</text>`;
    const g=ease(ramp(t,.15,.34)),go=ramp(t,.1,.18);
    s+=`<g style="opacity:${f1(go)}">${N?`<text x="18" y="192" class="t-xs">from parent 1</text><text x="${HX}" y="316" class="t-xs t-mid">from</text><text x="${HX}" y="328" class="t-xs t-mid">parent 2</text>`:`<text x="350" y="104" class="t-xs t-mid">egg or sperm from parent 1</text><text x="${HX}" y="160" class="t-xs t-mid">from</text><text x="${HX}" y="171" class="t-xs t-mid">parent 2</text>`}`;
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]),fo=ramp(t,.64+(r*2+c)*.03,.72+(r*2+c)*.03),bx=GX0+c*CW,by=GY0+r*CH;
      s+=`<rect x="${bx}" y="${by}" width="${CW}" height="${CH}" style="fill:${fo>0?KN[k][1]:'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
      if(fo>0){s+=`<rect x="${bx+2}" y="${by+2}" width="${CW-4}" height="${CH-4}" style="fill:none;stroke:${KN[k][2]};stroke-width:2;opacity:${f1(fo)}"/><text x="${f1(layer&&(k==='dom'||k==='two')?CX[c]-8:CX[c])}" y="${RY[r]+(N?36:34)}" class="t-xs t-mid" style="fill:${KN[k][2]};font-weight:700;opacity:${f1(fo)}">${KN[k][3]}</text>`;
        if(layer&&(k==='dom'||k==='two')){const gx=bx+CW-15,gy0=by+8,gh=CH-16,lo=ramp(fo,.3,1);
          s+=`<g style="opacity:${f1(lo)}"><rect x="${gx}" y="${gy0}" width="9" height="${gh}" rx="3" style="fill:var(--panel);stroke:var(--rose);stroke-width:1"/>`;
          if(k==='dom'){const hA=gh*.26,hB=gh*.425,hC=gh*.8;
            s+=`<rect x="${gx}" y="${f1(gy0+gh-hB)}" width="9" height="${f1(hB)}" rx="3" style="fill:var(--rose);opacity:.35"/><rect x="${gx}" y="${f1(gy0+gh-hA)}" width="9" height="${f1(hA)}" rx="3" style="fill:var(--rose)"/><path d="M${gx-4} ${f1(gy0+gh-hC)}h17" style="stroke:var(--ink);stroke-width:1.5;stroke-dasharray:3 2"/>`}
          else s+=`<text x="${gx+4.5}" y="${f1(gy0+gh/2+4)}" class="t-xs t-mid" style="fill:var(--rose)">?</text>`;
          s+='</g>'}}}
    s+='</g>';
    P1.forEach(([x,y],i)=>{s+=chip(x,y,X.a[i],12);if(g>0){const hx=lerp(x,CX[i],g),hy=lerp(y,HY,g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.a[i])}});
    P2.forEach(([x,y],i)=>{s+=chip(x,y,X.b[i],12);if(g>0){const hx=lerp(x,HX,g),hy=lerp(y,RY[i],g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.b[i])}});
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ease(ramp(t,.38+k*.06,.5+k*.06));if(f<=0)continue;
      s+=chip(lerp(CX[c],CX[c]-18,f),lerp(HY,RY[r]-4,f),X.a[c],13)+chip(lerp(HX,CX[c]+18,f),lerp(RY[r],RY[r]-4,f),X.b[r],13)}
    const op=ramp(t,.8,.88);
    if(op>0){const cnt={};for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]);cnt[k]=(cnt[k]||0)+1}
      const ox=N?18:496,ks=['dom','two','car','none'].filter(k=>cnt[k]);
      s+=`<g style="opacity:${f1(op)}"><text x="${ox}" y="${N?462:160}" class="t-sm">PER CHILD</text>`;
      ks.forEach((k,i)=>{const y=N?494+i*42:194+i*52,e=ease(ramp(t,.84,.97));
        s+=`<text x="${ox}" y="${y}" class="t-big" style="fill:${KN[k][2]};font-size:24px">${cnt[k]} in 4</text><text x="${N?110:ox+86}" y="${y-2}" class="t-xs" style="fill:var(--ink)">${KN[k][0]}</text>`;
        const bx=N?250:ox+86,bw=N?120:110;
        s+=`<rect x="${bx}" y="${y+(N?-14:6)}" width="${bw}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+(N?-14:6)}" width="${f1(bw*cnt[k]/4*e)}" height="9" rx="4.5" style="fill:${KN[k][2]}"/>`});
      if(layer){const y=N?494+ks.length*42+4:194+ks.length*52+6;
        if(X.id==='dom')s+=`<text x="${ox}" y="${y}" class="t-sm" style="fill:var(--ink)">PD by about 80 in carriers:</text><text x="${ox}" y="${y+18}" class="t-lbl" style="fill:var(--rose)">26–42.5% (kin-cohort)</text><text x="${ox}" y="${y+34}" class="t-xs">80% by 79 in family-based data</text>`;
        else s+=`<text x="${ox}" y="${y}" class="t-sm" style="fill:var(--ink)">Penetrance of two variants:</text><text x="${ox}" y="${y+18}" class="t-lbl" style="fill:var(--rose)">no figure in these sources</text><text x="${ox}" y="${y+34}" class="t-xs">median onset about 30 (MDSGene)</text>`}
      s+='</g>'}
    const ly=N?676:384,lx0=N?26:40;
    s+=chip(lx0,ly,'V',9)+`<text x="${lx0+14}" y="${ly+4}" class="t-xs">${X.id==='dom'?'LRRK2 G2019S':'PRKN variant'}</text>`+chip(N?170:180,ly,'+',9)+`<text x="${(N?170:180)+14}" y="${ly+4}" class="t-xs">usual copy</text>`;
    if(layer&&!N)s+=`<rect x="300" y="${ly-6}" width="9" height="11" rx="3" style="fill:var(--rose)"/><text x="315" y="${ly+4}" class="t-xs">shaded gauge: share of carriers with PD by about 80</text>`;
    ps.innerHTML=s;
    const p=phaseOf(GE_P,t);setP(p);const P=Object.assign({},GE_P[p]);
    if(p===0)P.txt=X.par;if(p===3){P.txt=X.odds+(layer?' '+X.lay:'');P.hook=X.id==='dom'?'Autosomal dominant: one copy is enough; each child of a carrier has a 1-in-2 chance of inheriting it. LRRK2 penetrance is reduced and age-dependent.':'Autosomal recessive: two carrier parents, 1-in-4 chance per child of two variants. PRKN is the classic recessive early-onset gene.'}
    const h=noteHTML(P);if(h!==lastP){$('#gePNote').innerHTML=h;lastP=h}
    $('#gePRead').innerHTML=`<span><b>${X.id==='dom'?'LRRK2 · dominant':'PRKN · recessive'}</b></span><span>Parents: ${X.la} × ${X.lb}</span><span>Penetrance layer <b>${layer?'on':'off'}</b></span>`;
  }
  const stopP=playWire(rp,$('#gePPlay'),drawP,12000,'Replay','genes');
  const setP=stepWire($('#gePSteps'),GE_P,rp,drawP,stopP);
  const setX=i=>{X=GE_CROSS[i];$('#gePDom').setAttribute('aria-pressed',i===0);$('#gePRec').setAttribute('aria-pressed',i===1);drawP(+rp.value)};
  $('#gePDom').onclick=()=>setX(0);$('#gePRec').onclick=()=>setX(1);
  $('#gePLay').onclick=()=>{layer=!layer;$('#gePLay').setAttribute('aria-pressed',layer);if(layer&&+rp.value<.9){stopP();rp.value=.98}drawP(+rp.value)};

  /* ---------------- 4. penetrance by age ---------------- */
  const pv=$('#gePen'),ra=$('#geAge');let gk='L',dis=false,lastPen='';
  function drawPen(t){
    const N=vb(pv,'720 380','400 620'),G=GE_PEN[gk],age=30+60*t,ar=Math.round(age);
    const L=N?{x0:48,x1:380,y0:318,y1:46,rx:16,ry:394,rdy:48}:{x0:64,x1:500,y0:330,y1:46,rx:530,ry:64,rdy:56};
    const X=a=>L.x0+(a-30)/60*(L.x1-L.x0),Y=v=>L.y0-(v/G.max)*(L.y0-L.y1);
    let s=geBg+`<text x="${N?16:20}" y="22" class="t-xs">${G.n.toUpperCase()} · % OF CARRIERS WITH PARKINSON'S</text>`;
    for(let v=0;v<=G.max;v+=G.tk)s+=`<path d="M${L.x0} ${f1(Y(v))}H${L.x1}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Y(v)+4)}" class="t-xs t-end">${v}%</text>`;
    for(let a=30;a<=90;a+=10)s+=`<text x="${f1(X(a))}" y="${L.y0+18}" class="t-xs t-mid">${a}</text>`;
    s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${L.y0+34}" class="t-xs t-mid">age</text>`;
    if(dis){const [a,b,l]=G.dis,x=X(80)+(N?10:14);
      s+=`<rect x="${f1(X(78))}" y="${f1(Y(b))}" width="${f1(X(82)-X(78))}" height="${f1(Y(a)-Y(b))}" rx="4" style="fill:var(--warn-soft)"/><path d="M${f1(x)} ${f1(Y(a))}h6V${f1(Y(b))}h-6" style="fill:none;stroke:var(--warn);stroke-width:2"/>`;
      s+=`<text x="${f1(N?X(78)-6:x+10)}" y="${f1((Y(a)+Y(b))/2-4)}" class="t-sm${N?' t-end':''}" style="fill:var(--warn);font-weight:600;${geHalo}">${a}–${b}%</text><text x="${f1(N?L.x1:x+10)}" y="${f1(N?Y(b)-12:(Y(a)+Y(b))/2+12)}" class="t-xs${N?' t-end':''}" style="fill:var(--warn);${geHalo}">${l}</text>`}
    s+=`<path d="M${f1(X(age))} ${L.y1-6}V${L.y0}" style="stroke:var(--ink);stroke-width:1.3;stroke-dasharray:4 3"/><text x="${f1(X(age))}" y="${L.y1-10}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${Math.round(age)}</text>`;
    G.S.forEach(S=>{const pts=S.pts;
      if(pts.length>1){const d=pts.map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))).join('');
        s+=`<path d="${d}" style="fill:none;stroke:${S.c};stroke-width:2;opacity:.25;${S.dash?'stroke-dasharray:6 4':''}"/>`;
        let dd='';for(let i=0;i<pts.length;i++){const p=pts[i];if(p[0]<=age){dd+=(dd?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))}
          else if(i&&pts[i-1][0]<age){const q=pts[i-1],u=(age-q[0])/(p[0]-q[0]);dd+='L'+f1(X(age))+' '+f1(Y(lerp(q[1],p[1],u)));break}else break}
        if(dd)s+=`<path d="${dd}" style="fill:none;stroke:${S.c};stroke-width:2.6;stroke-linecap:round;${S.dash?'stroke-dasharray:6 4':''}"/>`}
      if(S.ci){const x=X(pts[0][0]),on=pts[0][0]<=ar;s+=`<path d="M${f1(x)} ${f1(Y(S.ci[0]))}V${f1(Y(S.ci[1]))} M${f1(x-5)} ${f1(Y(S.ci[0]))}h10 M${f1(x-5)} ${f1(Y(S.ci[1]))}h10" style="stroke:${S.c};stroke-width:1.5;opacity:${on?1:.3}"/>`}
      pts.forEach(p=>{const on=p[0]<=ar;s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="${on?5:4}" style="fill:${on?S.c:'var(--panel)'};stroke:${S.c};stroke-width:1.8;opacity:${on?1:.45}"/>`})});
    // readout
    s+=`<text x="${L.rx}" y="${L.ry-(N?18:22)}" class="t-xs">${N?'LATEST PUBLISHED POINT AT OR BELOW '+Math.round(age):'AT OR BELOW AGE '+Math.round(age)}</text>`;
    G.S.forEach((S,i)=>{const y=L.ry+i*L.rdy,last=S.pts.filter(p=>p[0]<=ar).pop();
      const val=last?`${last[1]}% by ${last[0]}`:`first estimate at ${S.pts[0][0]}`;
      s+=`<path d="M${L.rx} ${y-4}h16" style="stroke:${S.c};stroke-width:3;${S.dash?'stroke-dasharray:5 3':''}"/>`;
      if(N)s+=`<text x="${L.rx+22}" y="${y}" class="t-sm" style="fill:var(--ink)">${S.sh}</text><text x="${L.rx+22}" y="${y+14}" class="t-xs">${S.src}</text><text x="384" y="${y}" class="t-lbl t-end" style="fill:${last?'var(--ink)':'var(--muted)'};font-weight:${last?700:400}">${val}</text>`;
      else s+=`<text x="${L.rx+22}" y="${y}" class="t-sm" style="fill:var(--ink)">${S.sh}</text><text x="${L.rx+22}" y="${y+14}" class="t-xs">${S.src}</text><text x="${L.rx+22}" y="${y+32}" class="t-lbl" style="fill:${last?'var(--ink)':'var(--muted)'}">${val}</text>`});
    pv.innerHTML=s;
    ra.setAttribute('aria-valuetext','Age '+Math.round(age));
    const h=noteHTML({k:G.n+' · age '+Math.round(age),t:gk==='L'?'Penetrance rises with age, and the studies disagree':'GBA1: low to moderate penetrance',txt:G.txt+(dis?' '+G.dtxt:''),pt:G.pt,hook:G.hook});
    if(h!==lastPen){$('#gePenNote').innerHTML=h;lastPen=h}
  }
  playWire(ra,$('#gePenPlay'),drawPen,12000,'Replay','genes');
  const setG=k=>{gk=k;$('#geGL').setAttribute('aria-pressed',k==='L');$('#geGG').setAttribute('aria-pressed',k==='G');drawPen(+ra.value)};
  $('#geGL').onclick=()=>setG('L');$('#geGG').onclick=()=>setG('G');
  $('#geDis').onclick=()=>{dis=!dis;$('#geDis').setAttribute('aria-pressed',dis);drawPen(+ra.value)};

  /* ---------------- 5. populations ---------------- */
  const pp=$('#gePop');let pi=0,pa=1,stopPop=null,lastPop='';
  $('#gePopBtns').insertAdjacentHTML('beforeend',GE_POP.map((V,i)=>`<button class="btn" data-gp="${i}" aria-pressed="${i===0}">${V.b}</button>`).join(''));
  function popIsrael(N,a){
    const e=ease(a);let s='';
    const B=N?{x0:16,y:60,h:24,u:18.4}:{x0:20,y:58,h:28,u:34};
    const segs=[[6.9,'var(--rose)','6.9% LRRK2 only',0],[.6,'var(--warn)','0.6% both',1],[10.5,'var(--violet)','10.5% GBA1 only',0],[1,'var(--sage)','1.0% other genes',1]];
    let x=B.x0;
    segs.forEach(([v,c,l,up],i)=>{const w=v*B.u*ramp(e,i*.15,.4+i*.15),cx=x+v*B.u/2;
      s+=`<rect x="${f1(x)}" y="${B.y}" width="${f1(w)}" height="${B.h}" style="fill:${c}"/>`;
      if(up)s+=`<path d="M${f1(cx)} ${B.y-2}v-6" style="stroke:${c};stroke-width:1.2;opacity:${f1(e)}"/><text x="${f1(i===3&&N?cx+12:cx)}" y="${B.y-12}" class="t-xs ${i===3&&N?'t-end':'t-mid'}" style="fill:var(--ink);opacity:${f1(e)}">${l}</text>`;
      else s+=`<text x="${f1(cx)}" y="${B.y+B.h+16}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(e)}">${l}</text>`;
      x+=v*B.u});
    if(!N)s+=`<text x="${f1(x+8)}" y="${B.y+B.h/2+5}" class="t-lbl" style="opacity:${f1(e)}">19.0%</text><text x="${B.x0}" y="${B.y+B.h+34}" class="t-xs">bar scale 0–20% of patients tested</text>`;
    const V=N?{cy:236,r1:60,r2:72,d:lerp(200,122,e),cx:200,ly:330}:{cy:236,r1:74,r2:90,d:lerp(260,152,e),cx:255,ly:350};
    const c1=V.cx-V.d/2,c2=V.cx+V.d/2;
    s+=`<circle cx="${f1(c1)}" cy="${V.cy}" r="${V.r1}" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:2;opacity:.9"/><circle cx="${f1(c2)}" cy="${V.cy}" r="${V.r2}" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:2;opacity:.75"/>`;
    s+=`<circle cx="${f1(c1)}" cy="${V.cy}" r="${f1(V.r1*Math.sqrt(191/202))}" style="fill:none;stroke:var(--rose);stroke-width:1;stroke-dasharray:3 3"/><circle cx="${f1(c2+V.r2*.12)}" cy="${V.cy}" r="${f1(V.r2*Math.sqrt(173/299))}" style="fill:none;stroke:var(--violet);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<text x="${f1(c1-V.r1*.25)}" y="${V.cy-10}" class="t-lbl t-mid">LRRK2</text><text x="${f1(c1-V.r1*.25)}" y="${V.cy+6}" class="t-xs t-mid" style="fill:var(--ink)">202 people</text><text x="${f1(c1-V.r1*.25)}" y="${V.cy+19}" class="t-xs t-mid">7.5%</text>`;
    s+=`<text x="${f1(c2+V.r2*.2)}" y="${V.cy-10}" class="t-lbl t-mid">GBA1</text><text x="${f1(c2+V.r2*.2)}" y="${V.cy+6}" class="t-xs t-mid" style="fill:var(--ink)">299 people</text><text x="${f1(c2+V.r2*.2)}" y="${V.cy+19}" class="t-xs t-mid">11.1%</text>`;
    const ov=(c2-V.r2+c1+V.r1)/2;
    s+=`<g style="opacity:${f1(ramp(e,.7,1))}"><path d="M${f1(ov)} ${V.cy+8}V${V.cy+V.r2+8}" style="stroke:var(--warn);stroke-width:1.4"/><circle cx="${f1(ov)}" cy="${V.cy}" r="4" style="fill:var(--warn)"/><text x="${f1(ov)}" y="${V.cy+V.r2+22}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">15 carry both</text></g>`;
    s+=`<circle cx="${f1(c2+V.r2*.5)}" cy="${f1(V.cy-V.r2*.87)}" r="4" style="fill:var(--sage)"/><text x="${f1(c2+V.r2*.5-8)}" y="${f1(V.cy-V.r2*.87-6)}" class="t-xs t-end" style="fill:var(--ink);${geHalo}">1 with GBA1 + SNCA</text>`;
    s+=`<text x="${f1(c1)}" y="${V.cy-V.r1-8}" class="t-xs t-mid">dashed: G2019S, 191</text><text x="${f1(c2+V.r2*.12)}" y="${V.cy+V.r2-8}" class="t-xs t-mid" style="${geHalo}">dashed: N409S, 173</text>`;
    const T=['GENE LEVEL VS VARIANT LEVEL','"LRRK2 only" 6.9% = 187 people','+ 15 who also carry GBA1','= 202 LRRK2 carriers (7.5%)','"G2019S" 7.1% = 191 of them','','"GBA1 only" 10.5% = 283 people','+ 15 both + 1 with SNCA','= 299 GBA1 carriers (11.1%)','"N409S" 6.4% = 173 of them','Arithmetic ours, from the abstract'];
    T.forEach((l,i)=>{const x=N?16:478,y=N?400+i*19:118+i*22;if(l)s+=`<text x="${x}" y="${y}" class="${i===0?'t-sm':'t-xs'}" style="fill:${i===0||i===10?'var(--muted)':'var(--ink)'};${i===3||i===8?'font-weight:700':''}">${l}</text>`});
    return s}
  function drawPop(){
    const N=vb(pp,'720 400','400 620'),V=GE_POP[pi];
    let s=geBg+`<text x="${N?16:20}" y="24" class="t-xs">${V.h[N?1:0]}</text>`;
    if(V.id==='il')s+=popIsrael(N,pa);
    else{const L=N?{x0:16,x1:330,y0:96,dy:V.rows.length>6?70:76,lgx:16,lgy:44}:{x0:270,x1:676,y0:82,dy:V.rows.length>6?44:50,lgx:20,lgy:46};
      const X=v=>L.x0+v/V.max*(L.x1-L.x0);
      V.leg.forEach(([k,j,l],i)=>{const x=N?L.lgx+(i%2)*190:L.lgx+i*168,y=N?L.lgy+Math.floor(i/2)*16:L.lgy,C=GE_COL[k];
        s+=`<rect x="${x}" y="${y-8}" width="12" height="9" rx="2" style="fill:${C[j]};${j?'stroke:'+C[0]+';stroke-width:1.2':''}"/><text x="${x+17}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      const gy0=L.y0-(N?10:18),gy1=L.y0+(V.rows.length-1)*L.dy+(N?44:22);
      for(let k=0;k<=4;k++){const v=V.max*k/4,x=X(v);s+=`<path d="M${f1(x)} ${gy0}V${gy1}" class="grid"/><text x="${f1(x)}" y="${gy0-4}" class="t-xs t-mid">${v}%</text>`}
      V.rows.forEach((r,i)=>{const y=L.y0+i*L.dy,C=GE_COL[r.k],e=ease(ramp(pa,i*.06,.5+i*.06));
        if(N)s+=`<text x="16" y="${y}" class="t-sm" style="fill:var(--ink)">${r.l}</text>${r.s?`<text x="16" y="${y+13}" class="t-xs">${r.s}</text>`:''}`;
        else s+=`<text x="20" y="${y+2}" class="t-sm" style="fill:var(--ink)">${r.l}</text>${r.s?`<text x="20" y="${y+15}" class="t-xs">${r.s}</text>`:''}`;
        r.v.forEach(([v,lab],j)=>{const by=N?y+20+j*14:y-8+j*14,w=Math.max(2,(X(v)-L.x0)*e);
          s+=`<rect x="${L.x0}" y="${by}" width="${f1(w)}" height="11" rx="3" style="fill:${C[j]};${j?'stroke:'+C[0]+';stroke-width:1.2':''}"/><text x="${f1(L.x0+w+5)}" y="${by+9.5}" class="t-xs" style="fill:var(--ink);opacity:${f1(e)}">${lab}</text>`})});
    }
    pp.innerHTML=s;
    $('#gePopRead').innerHTML=V.read;
    const h=noteHTML({k:'Population · '+V.b,t:V.t,txt:V.txt,pt:V.id==='il'?'In Israel, about 1 in 5 people with Parkinson\'s who were tested carried a relevant gene change, mostly LRRK2 or GBA1.':'These are shares of people who already have Parkinson\'s. Most carriers in the general population never develop it.',hook:V.hook||'LRRK2 G2019S is commonest in North African Arab and Ashkenazi Jewish people with Parkinson\'s; GBA1 variants are the commonest genetic finding overall.'});
    if(h!==lastPop){$('#gePopNote').innerHTML=h;lastPop=h}
  }
  $('#gePopBtns').addEventListener('click',e=>{const b=e.target.closest('[data-gp]');if(!b)return;pi=+b.dataset.gp;
    $$('[data-gp]',$('#gePopBtns')).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopPop)stopPop();stopPop=animate(900,p=>{pa=p;drawPop()},()=>{stopPop=null;pa=1;drawPop()})});

  /* ---------------- 6. odds ratio vs lifetime risk ---------------- */
  const ov=$('#geOr');let oi=0,oc=GE_ORS[0].v,stopO=null;
  function drawOr(){
    const N=vb(ov,'720 300','400 560'),E=GE_ORS[oi];
    const L=N?{g:[[24,70],[216,70]],c:14,tl:[[104,40],[296,40]],bl:250,col:[24,312]}:{g:[[40,70],[280,70]],c:15,tl:[[125,40],[365,40]],bl:262,col:[490,40]};
    let s=geBg;
    const lab=[['No GBA1 variant','non-carriers, Gaucher families'],['GBA1 carriers',E.sh]];
    [2.1,oc].forEach((v,w)=>{const [x,y]=L.g[w],col=w?'var(--violet)':'var(--muted)';
      s+=`<text x="${L.tl[w][0]}" y="${L.tl[w][1]}" class="t-lbl t-mid">${lab[w][0]}</text><text x="${L.tl[w][0]}" y="${L.tl[w][1]+14}" class="t-xs t-mid">${lab[w][1]}</text>`;
      s+=geWaffle(x,y,L.c,2,[[v,'']],[1],col,col);
      s+=`<text x="${L.tl[w][0]}" y="${L.bl}" class="t-sm t-mid" style="fill:var(--ink)">${w?f1(v).replace('.0',''):'2.1'} in 100 by about 80</text>`});
    const [cx,cy]=L.col;
    const T=N?[[0,'t-sm','ODDS RATIO, ANY GBA1 VARIANT'],[34,'big','5.43'],[52,'t-xs','16 centres, 5,691 patients, 4,898 controls'],[86,'t-sm','PARKINSON\'S BY ABOUT 80'],[118,'big2','2.1% vs '+f1(oc).replace('.0','')+'%'],[136,'t-xs',E.c],[166,'t-sm','CARRIERS WITHOUT PARKINSON\'S AT 80'],[198,'big2','about '+Math.round(100-oc)+' in 100'],[216,'t-xs','100 minus the carrier estimate (our arithmetic)']]
             :[[24,'t-sm','ODDS RATIO, ANY GBA1 VARIANT'],[62,'big','5.43'],[80,'t-xs','16 centres, 5,691 patients'],[114,'t-sm','PARKINSON\'S BY ABOUT 80'],[146,'big2','2.1% vs '+f1(oc).replace('.0','')+'%'],[164,'t-xs',E.c.replace('different study, ','')],[196,'t-sm','CARRIERS STILL WITHOUT PD'],[226,'big2','about '+Math.round(100-oc)+' in 100'],[244,'t-xs','100 minus the estimate']];
    T.forEach(([dy,c,l])=>{s+=c==='big'?`<text x="${cx}" y="${cy+dy}" class="t-big" style="font-size:34px;fill:var(--violet)">${l}</text>`:c==='big2'?`<text x="${cx}" y="${cy+dy}" class="t-big" style="font-size:22px">${l}</text>`:`<text x="${cx}" y="${cy+dy}" class="${c}"${c==='t-sm'?'':' style="fill:var(--ink)"'}>${l}</text>`});
    ov.innerHTML=s;
    $('#geOrNote').innerHTML=noteHTML({k:'Relative versus absolute',t:'A ratio is not a lifetime chance',
      txt:`An odds ratio compares carriers with non-carriers; it does not say how many carriers become ill. In the Gaucher-family study, Parkinson's by 80 was 2.1% in non-carriers and 7.7% in heterozygous parents, [[Alcalay2014]] while carrier estimates from other study types reach 19% and 29.7%. [[Balestrino2020,Anheim2012]] Chosen: ${E.l}, ${E.v}% by 80. ${E.k}`,
      pt:'A gene change can multiply the odds several times and still leave most carriers unaffected, because the starting chance is small.',
      hook:'Odds ratio = relative measure between groups. Penetrance = absolute share of carriers affected by a given age. GBA1: OR about 5 (any variant), penetrance about 8–30% by 80. [[Sidransky2009,Alcalay2014,Anheim2012]]'});
  }
  const setO=i=>{oi=i;[['#geOrA',0],['#geOrB',1],['#geOrC',2]].forEach(([id,k])=>$(id).setAttribute('aria-pressed',k===i));const from=oc,to=GE_ORS[i].v;
    if(stopO)stopO();stopO=animate(700,p=>{oc=lerp(from,to,ease(p));drawOr()},()=>{stopO=null;oc=to;drawOr()})};
  $('#geOrA').onclick=()=>setO(0);$('#geOrB').onclick=()=>setO(1);$('#geOrC').onclick=()=>setO(2);

  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawD();drawPop();drawOr()};
  draw(+rg.value);drawD();drawP(+rp.value);drawPen(+ra.value);drawPop();drawOr();
};
