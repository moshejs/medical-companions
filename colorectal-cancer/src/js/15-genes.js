/* =============== 1.5 Lynch syndrome & FAP =============== */
/* ---- the pedigree: one illustrative family drawn three ways ----
   x,y in the wide layout; p = parents (couple key) for transmission paths.
   per mode: a (0 unaffected, 1 affected), l (label lines), g ('+' carrier, '−' tested negative, 'c' recessive carrier,
   '' not tested), o (order of cascade testing), dead, odds (label shown during transmission) */
const GN_NODES=[
 {id:'I1',sex:'m',x:165,y:70},{id:'I2',sex:'f',x:245,y:70},
 {id:'II1',sex:'f',x:80,y:190,p:'I'},{id:'IIs',sex:'m',x:170,y:190},{id:'II2',sex:'m',x:330,y:190,p:'I'},{id:'IIt',sex:'f',x:415,y:190},
 {id:'III1',sex:'f',x:42,y:310,p:'II1',pro:1},{id:'III2',sex:'m',x:125,y:310,p:'II1'},{id:'III3',sex:'f',x:208,y:310,p:'II1'},
 {id:'III4',sex:'m',x:330,y:310,p:'II2'},{id:'III5',sex:'f',x:415,y:310,p:'II2'}];
const GN_COUPLES={I:['I1','I2'],II1:['II1','IIs'],II2:['II2','IIt']};
const GN_FAM={
 lynch:{name:'Lynch syndrome',
  I1:{a:1,l:['CRC 52','died 60'],g:'+',dead:1,inf:1},I2:{a:0,l:['age 78'],g:''},
  II1:{a:1,l:['endometrial','cancer 49'],g:'+',o:1},IIs:{a:0,l:['age 58'],g:''},II2:{a:0,l:['age 50'],g:'+',o:2},IIt:{a:0,l:['age 49'],g:''},
  III1:{a:1,l:['CRC 44'],g:'+',o:0},III2:{a:0,l:['age 41'],g:'+',o:3},III3:{a:0,l:['age 37'],g:'−',o:4},III4:{a:0,l:['age 24'],g:'+',o:5},III5:{a:0,l:['age 20'],g:'−',o:6},
  odds:{II1:'1 in 2',II2:'1 in 2',III1:'1 in 2',III2:'1 in 2',III3:'1 in 2',III4:'1 in 2',III5:'1 in 2'},
  plan:{'+':'colonoscopy','−':'usual risk'}},
 fap:{name:'FAP',
  I1:{a:1,l:['CRC 39','died 41'],g:'+',dead:1,inf:1},I2:{a:0,l:['age 70'],g:''},
  II1:{a:1,l:['colectomy','at 21'],g:'+',o:1},IIs:{a:0,l:['age 50'],g:''},II2:{a:0,l:['age 47'],g:'−',o:2},IIt:{a:0,l:['age 45'],g:''},
  III1:{a:1,l:['polyposis','at 19'],g:'+',o:0},III2:{a:0,l:['age 15'],g:'+',o:3},III3:{a:0,l:['age 12'],g:'−',o:4},III4:{a:0,l:['age 18'],g:'',na:1},III5:{a:0,l:['age 16'],g:'',na:1},
  odds:{II1:'1 in 2',II2:'1 in 2',III1:'1 in 2',III2:'1 in 2',III3:'1 in 2'},
  plan:{'+':'scope from 12','−':'usual risk'}},
 map:{name:'MUTYH-associated polyposis',
  I1:{a:0,l:['age 80'],g:''},I2:{a:0,l:['age 77'],g:''},
  II1:{a:0,l:['age 70'],g:'c',o:1},IIs:{a:0,l:['age 72'],g:'c',o:2},II2:{a:0,l:['age 66'],g:'c',o:3},IIt:{a:0,l:['age 64'],g:''},
  III1:{a:1,l:['polyps, CRC','at 47'],g:'aa',o:0},III2:{a:0,l:['age 44'],g:'c',o:4},III3:{a:0,l:['age 40'],g:'−',o:5},III4:{a:0,l:['age 38'],g:'c',o:6},III5:{a:0,l:['age 35'],g:'−',o:7},
  odds:{III1:'1 in 4',III2:'1 in 4',III3:'1 in 4',III4:'carrier 1 in 2',III5:'carrier 1 in 2'},
  plan:{aa:'yearly scope',c:'no extra','−':'usual risk'}}
};
/* step timing, shared by the three modes */
const GN_T=[0,.2,.42,.62,.82];
const GN_STEPS={
 lynch:[
  {k:'Step 1 · the proband',t:'A woman of 44 with colorectal cancer',
   txt:`The arrow marks the proband: the first person in the family to come to medical attention. Her tumour is tested for mismatch repair deficiency, as guidelines now advise for every new colorectal cancer, and shows loss of MSH2 and MSH6. [[Syngal2015,Seppala2021]] Lynch syndrome is autosomal dominant, caused by a germline variant in MLH1, MSH2, MSH6, PMS2 or EPCAM. [[Syngal2015]]`,
   pt:`Many hospitals now test every bowel cancer for signs of Lynch syndrome, so relatives can be warned. [[Syngal2015,Seppala2021]]`,
   hook:`Universal MMR tumour testing: sensitivity 100% vs 87.8% for the Bethesda guidelines. [[Moreira2012]]`},
  {k:'Step 2 · the family history',t:'Three cancers, two generations, one before 50',
   txt:`Her mother had endometrial cancer at 49 and her grandfather colorectal cancer at 52. That fits Amsterdam II: at least three relatives with a Lynch-associated cancer (here counting the proband), one a first-degree relative of the other two, two successive generations, one diagnosed before 50, FAP excluded. [[Vasen1999,Syngal2015]] Family criteria miss many families: 28% of Lynch cases in one cohort did not meet the revised Bethesda guidelines. [[Hampel2008]]`,
   pt:`Bowel and womb cancer in the same family, some at young ages, is a pattern doctors look for.`,
   hook:`Amsterdam II = "3-2-1-0": 3 relatives, 2 generations, 1 before 50, 0 FAP. [[Vasen1999,Syngal2015]]`},
  {k:'Step 3 · transmission',t:'Each child: a 1 in 2 chance',
   txt:`A carrier passes either the variant copy or the normal copy to each child, so every child has a 50% chance of inheriting it, whatever happened to the brothers and sisters. [[Syngal2015]] Grandfather is an obligate carrier: he links the affected mother to the variant. The variant can pass through people who never develop cancer, like the uncle here.`,
   pt:`Each child of a parent with Lynch syndrome has a 1 in 2 chance of inheriting it. It is a coin toss for every child, not a quota per family. [[Syngal2015]]`,
   hook:`Autosomal dominant: 50% per child, both sexes, vertical transmission.`},
  {k:'Step 4 · cascade testing',t:'Testing relatives for the family variant',
   txt:`Once the proband's variant is known, relatives can have a targeted test. In a population study each Lynch proband had on average three relatives who also carried the variant. [[Hampel2008]] Here four relatives carry it: the mother, who already had cancer, and three who have not: the uncle, a brother and a cousin. Relatives who test negative return to population risk. EGAPP found sufficient evidence to offer Lynch testing to everyone with newly diagnosed colorectal cancer, to benefit their relatives. [[EGAPP2009]]`,
   pt:`About 1 in 300 people carry a Lynch syndrome gene change, and most do not know it. [[Win2017,DominguezValentin2020]]`,
   hook:`About 3% of colorectal cancer patients have Lynch syndrome. [[Hampel2008,Moreira2012]]`},
  {k:'Step 5 · surveillance',t:'What carriers are offered',
   txt:`ACG 2015: colonoscopy "at least every 2 years, beginning between ages 20 and 25 years", considering annual colonoscopy. The UK advises every 2 years until 75, from 25 for MLH1/MSH2 and from 35 for MSH6/PMS2. [[Syngal2015,Monahan2020]] In a 15-year trial, colonoscopy every 3 years cut colorectal cancer from 16% to 6%, with no colorectal cancer deaths in the screened group. [[Jarvinen2000]] European and UK guidelines also discuss daily aspirin (CAPP2: 9% vs 13%). [[Burn2020,Seppala2021,Monahan2020]]`,
   pt:`If you have Lynch syndrome, regular colonoscopy greatly lowers your chance of dying from bowel cancer. [[Jarvinen2000]]`,
   hook:`Järvinen 2000: CRC 6% vs 16% (−62%) with 3-yearly colonoscopy in Lynch families.`}],
 fap:[
  {k:'Step 1 · the proband',t:'A woman of 19 with hundreds of polyps',
   txt:`FAP is autosomal dominant, caused by germline APC variants on chromosome 5q21. Carriers develop hundreds of adenomas, and without treatment cancer follows at an average age of 35–40. [[Galiatsatos2006]] It occurs in about 1 in 8,300 births and causes less than 1% of colorectal cancer. [[Half2009]]`,
   pt:`FAP causes hundreds of polyps. Without surgery to remove the large bowel, cancer is almost certain. [[Zaffaroni2024]]`,
   hook:`FAP: APC, 5q21, dominant; CRC risk "virtually 100% by 60 years" untreated. [[Zaffaroni2024]]`},
  {k:'Step 2 · the family history',t:'A grandfather who died at 41',
   txt:`Her grandfather died of colorectal cancer at 41 and her mother had her colon removed at 21. About 70% of people with FAP have a family history; 15–30% of APC variants arise de novo, so a child can be the first in the family. [[Half2009,Zaffaroni2024]] In the St Mark's series the average age at cancer was 39, with 87% affected by 45. [[Syngal2015]]`,
   pt:`Some people with FAP are the first in their family: the gene change started with them.`,
   hook:`15–30% of APC variants are de novo: no family history does not exclude FAP. [[Zaffaroni2024]]`},
  {k:'Step 3 · transmission',t:'Each child: a 1 in 2 chance',
   txt:`As in Lynch syndrome, each child of a carrier has a 50% chance of inheriting the variant. [[Galiatsatos2006]] Unlike Lynch syndrome, carriers develop hundreds of adenomas, and without treatment cancer almost inevitably follows. [[Galiatsatos2006]]`,
   pt:`Each child of a parent with FAP has a 1 in 2 chance of inheriting it. [[Syngal2015]]`,
   hook:`Autosomal dominant: 50% per child.`},
  {k:'Step 4 · cascade testing',t:'Children are tested young',
   txt:`Her younger brother (15) carries the variant; her sister (12) does not. Her uncle tests negative, so his children are not at risk and need no testing. Registry data show why this matters: colorectal cancer was present in 3–10% of people found by registry surveillance against 50–70% of those who came with symptoms. [[Monahan2020]] If no APC variant has been found in a family, UK guidance advises colonoscopy from 12–14, then every 5 years, for at-risk relatives. [[Monahan2020]]`,
   pt:`Testing a family early means polyps are found before they turn into cancer.`,
   hook:`Children of a relative who tested negative are not at risk.`},
  {k:'Step 5 · surveillance and surgery',t:'From 12, then a colectomy',
   txt:`Europe 2024: colonoscopy from age 12 in classic FAP, by 18–20 in attenuated FAP. UK 2020: from 12–14, then every 1–3 years, with upper GI surveillance from 25. [[Zaffaroni2024,Monahan2020]] Prophylactic colectomy is usually advised by the late teens or early twenties. [[Half2009]] After colectomy, duodenal cancer and desmoid tumours are the two main causes of death. [[Half2009]]`,
   pt:`People with FAP have their large bowel removed as young adults, then keep having checks of the upper gut.`,
   hook:`After colectomy, duodenal cancer and desmoids are the leading causes of death in FAP. [[Half2009]]`}],
 map:[
  {k:'Step 1 · the proband',t:'A woman of 47 with polyps and cancer',
   txt:`MUTYH-associated polyposis (MAP) is autosomal recessive: both copies of MUTYH carry a variant. It causes about 7% of adenomatous polyposis and 0.7% of colorectal cancer, and 77.4% of patients have fewer than 100 adenomas. Mean age at colorectal cancer is 47.85 years. [[Zaffaroni2024]]`,
   pt:`In MAP a person inherits one faulty copy from each parent.`,
   hook:`MAP: biallelic MUTYH, recessive, often fewer than 100 adenomas. [[Zaffaroni2024]]`},
  {k:'Step 2 · the family history',t:'Nobody else is affected',
   txt:`The parents and grandparents had no polyposis. A recessive condition typically shows up in one generation, among brothers and sisters, not down a line of parents and children. One in 45 people carries a MUTYH variant, mostly in one copy. [[Win2017]]`,
   pt:`No family history does not rule out an inherited cause.`,
   hook:`Recessive pattern: affected siblings, unaffected carrier parents.`},
  {k:'Step 3 · transmission',t:'Two carrier parents: 1 in 4',
   txt:`When both parents carry one MUTYH variant, each child has a 25% chance of being affected (two copies), 50% of being a carrier (one copy) and 25% of inheriting neither. [[Galiatsatos2006,Zaffaroni2024]] Her uncle's children can be carriers, but not affected, because their mother carries no variant.`,
   pt:`If both parents carry one copy, each child has a 1 in 4 chance of MAP.`,
   hook:`Autosomal recessive: 25% affected, 50% carriers, 25% unaffected non-carriers.`},
  {k:'Step 4 · cascade testing',t:'Carriers shown half-shaded',
   txt:`Both parents, the uncle, a brother and a cousin carry one copy. Single-copy carriers have a colorectal cancer risk to 70 of 7.2% (men) and 5.6% (women), against 2.9% and 2.1% in the general population; with a first-degree relative diagnosed by 50, 12.5% and 10%. [[Win2014]]`,
   pt:`Carrying one copy raises risk a little. It does not cause polyposis.`,
   hook:`Monoallelic MUTYH: about 2–3 times population risk. [[Win2014]]`},
  {k:'Step 5 · surveillance',t:'Yearly for MAP, not for carriers',
   txt:`UK 2020 advises colonoscopy from 18–20, then yearly, for MAP, and does not recommend routine colonoscopy for single-copy carriers. [[Monahan2020]] ACG gives a MAP colorectal cancer risk of 19% by 50 and 43% by 60. [[Syngal2015]] Whether single-copy carriers need more screening is debated. [[Win2014,Monahan2020]]`,
   pt:`People with MAP have a colonoscopy every year. Carriers of one copy usually follow normal screening.`,
   hook:`MAP: colonoscopy yearly from 18–20 (UK 2020). [[Monahan2020]]`}]
};
GN_STEPS.lynch.forEach((s,i)=>{['lynch','fap','map'].forEach(m=>{GN_STEPS[m][i].from=GN_T[i];GN_STEPS[m][i].at=GN_T[i]+(i?.1:.08)})});

/* ---- mismatch repair ---- */
const GN_MMR_T=[0,.12,.25,.45,.6,.8];
const GN_MMR={
 p:[
  {k:'Replication',t:'Copying a microsatellite',txt:`DNA polymerase copies the template strand. Here it reaches a microsatellite, a run of ten A·T pairs. Short repeats like (A)n or (CA)n are especially error-prone. Mismatch repair corrects base–base mismatches and insertion/deletion mispairs that escape the polymerase's own proofreading, improving replication fidelity by several orders of magnitude. [[Vilar2010,Jiricny2006,Kunkel2005]]`,
   pt:`Repeats like AAAAAAAAAA are where the cell's DNA copier most easily stutters.`},
  {k:'Slippage',t:'The new strand slips',txt:`Inside the repeat the new strand dissociates and re-anneals out of register, leaving an extra A looped out: an insertion–deletion loop. [[Vilar2010]]`,
   pt:`The copier loses its place in a stretch of identical letters and adds one too many.`,hook:`Microsatellite slippage creates insertion–deletion loops, the lesion that MMR fixes and MSI reveals.`},
  {k:'Recognition',t:'MutSα finds the loop',txt:`MSH2 pairs with MSH6 to form MutSα, best at single-base mismatches; MSH2 with MSH3 forms MutSβ, for larger loops. The complex clamps onto the error. [[Vilar2010,Boland2010,Li2008]]`,
   hook:`MutSα = MSH2 + MSH6 (recognition). MutSβ = MSH2 + MSH3 (larger loops). [[Vilar2010,Boland2010]]`},
  {k:'Recruitment',t:'MutLα joins',txt:`MLH1 pairs with PMS2 to form MutLα. The MutS–MutL sliding clamp interacts with replication factor C and PCNA, the ring that marks the newly made strand. [[Vilar2010,Boland2010,Li2008]]`,
   hook:`MutLα = MLH1 + PMS2, recruited after MutSα recognises the error. [[Vilar2010,Boland2010]]`},
  {k:'Excision',t:'Exonuclease 1 removes the error',txt:`Exonuclease 1 removes the stretch of the new strand that contains the error, loop and all. [[Vilar2010,Li2008]]`,
   pt:`The spell-checker cuts out the badly copied section of the new strand.`},
  {k:'Resynthesis',t:'Refilled and sealed: ten repeats',txt:`DNA polymerase δ fills the gap and DNA ligase seals it. The repeat is back to ten. [[Vilar2010,Li2008]]`,
   pt:`The section is copied again, correctly, and the cell's DNA stays the same length.`}],
 d:[
  {k:'Replication',t:'Copying a microsatellite',txt:`Same copying, but this cell has lost mismatch repair: in Lynch syndrome the story starts with an inherited faulty MMR gene; in about 12% of colorectal cancers MLH1 is silenced by promoter methylation instead. [[Boland2010,Herman1998]]`,
   pt:`In about 15 in 100 bowel cancers, the cell's spell-checker for DNA is broken. [[Boland2010]]`},
  {k:'Slippage',t:'The same slip happens',txt:`The new strand slips in the repeat and an extra A loops out, exactly as in a normal cell. Slippage itself is not the problem; leaving it unrepaired is. [[Vilar2010]]`},
  {k:'Recognition',t:'Nothing comes',txt:`No working MutSα (MSH2–MSH6) or MutLα (MLH1–PMS2): the loop is not recognised. Losing mismatch repair creates a mutator phenotype. [[Jiricny2006,Kunkel2005]]`,
   hook:`MSI in about 15% of CRC: about 3% Lynch, about 12% sporadic MLH1 methylation. [[Boland2010]]`},
  {k:'Next division',t:'The error is copied in',txt:`At the next division the looped strand becomes a template, and one daughter cell carries eleven repeats instead of ten. Inside a gene, such insertions and deletions cause frameshifts that truncate proteins: targets include TGFβR2, ACVR2, BAX and caspase-5. [[Vilar2010,Boland2010]]`,
   hook:`Coding microsatellites hit by MSI: TGFBR2, ACVR2, BAX, caspase-5. [[Boland2010]]`},
  {k:'Instability',t:'Repeat lengths drift: MSI',txt:`Every microsatellite in the genome drifts like this: microsatellite instability. Every human MMR gene except MLH1 has its own mononucleotide repeat of at least A7, so repair can decay further. [[Boland2010]] TCGA found 16% of colorectal cancers hypermutated, three-quarters of them MSI-high. [[TCGA2012]]`},
  {k:'Consequence',t:'A tumour full of mutations',txt:`Whole-exome sequencing found a mean of 1,782 somatic mutations in dMMR tumours against 73 in pMMR tumours. [[Le2015]] The resulting neoantigens help explain why dMMR cancers respond to PD-1 blockade: see <a href="#biomarkers" data-go="biomarkers">Tumour biomarkers</a>. [[Le2017]]`,
   pt:`A broken spell-checker means thousands of typos. The immune system can spot the odd proteins they make, which is why immunotherapy works well here.`,
   hook:`dMMR ≈ 1,782 mutations vs pMMR ≈ 73 (Le 2015).`}]
};
['p','d'].forEach(m=>GN_MMR[m].forEach((s,i)=>{s.from=GN_MMR_T[i];s.at=GN_MMR_T[i]+(i===5?.12:.08)}));

/* ---- PLSD 2020 cumulative incidence (age, %) ---- */
const GN_PLSD={
 MLH1:{F:[ [30,0],[40,11.8],[50,20.8],[60,32.2],[70,44.1],[75,48.3] ],M:[ [30,4.5],[40,16.4],[50,33.6],[60,45.2],[70,52.8],[75,57.1] ],c:'var(--tumour)'},
 MSH2:{F:[ [30,1.9],[40,6.9],[50,16.9],[60,26.2],[70,41.9],[75,46.6] ],M:[ [30,2.6],[40,9.9],[50,18.1],[60,34.1],[70,46.3],[75,51.4] ],c:'var(--brand)'},
 MSH6:{F:[ [40,2.5],[50,4.4],[60,8.9],[70,20.3],[75,20.3] ],M:[ [40,6.3],[50,6.3],[60,8.9],[70,11.7],[75,18.2] ],c:'var(--accent)'},
 PMS2:{F:[ [50,0],[60,0],[70,3.4],[75,10.4] ],M:[ [50,0],[60,0],[70,3.4],[75,10.4] ],c:'var(--rx)'}
};

inits.genes=()=>{
  /* ================= pedigree ================= */
  const svg=$('#gnSvg'),rg=$('#gnT');let fam='lynch',setSt=()=>{};
  const byId={};GN_NODES.forEach(n=>byId[n.id]=n);
  function draw(t){const N=vb(svg,'720 420','400 600');const F=GN_FAM[fam];
    const P=n=>N?[n.x*.84+16,n.y]:[n.x+10,n.y];
    const ph=phaseOf(GN_STEPS[fam],t);
    const pHist=ramp(t,GN_T[1],GN_T[1]+.12),pTr=ramp(t,GN_T[2],GN_T[2]+.14),pCas=ramp(t,GN_T[3],GN_T[3]+.16),pPlan=ramp(t,GN_T[4],GN_T[4]+.08);
    const r=N?10:11;
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    s+=`<text x="${N?8:10}" y="22" class="t-sm" style="fill:var(--tumour)">${F.name.toUpperCase()}</text>`;
    ['I','II','III'].forEach((g,i)=>s+=`<text x="${N?4:2}" y="${74+i*120}" class="t-sm" style="font-weight:700">${g}</text>`);
    /* lines */
    const line=(a,b,c,d)=>`<line x1="${f1(a)}" y1="${f1(b)}" x2="${f1(c)}" y2="${f1(d)}" style="stroke:var(--ink);stroke-width:1.3"/>`;
    Object.entries(GN_COUPLES).forEach(([k,[a,b]])=>{const A=P(byId[a]),B=P(byId[b]);s+=line(A[0]+r,A[1],B[0]-r,B[1]);
      const kids=GN_NODES.filter(n=>n.p===k);if(!kids.length)return;const mx=(A[0]+B[0])/2,sy=A[1]+60;
      s+=line(mx,A[1],mx,sy);const xs=kids.map(n=>P(n)[0]);s+=line(Math.min(...xs,mx),sy,Math.max(...xs,mx),sy);
      kids.forEach(n=>{const C=P(n);s+=line(C[0],sy,C[0],C[1]-r)})});
    /* transmission: a dot runs from the couple to each child, with the odds */
    if(pTr>0){Object.entries(GN_COUPLES).forEach(([k,[a,b]])=>{const A=P(byId[a]),B=P(byId[b]),mx=(A[0]+B[0])/2,sy=A[1]+60;
      GN_NODES.filter(n=>n.p===k&&F.odds[n.id]).forEach((n,j)=>{const C=P(n),u=clamp(pTr*1.4-j*.08);if(u<=0)return;
        const pts=[[mx,A[1]],[mx,sy],[C[0],sy],[C[0],C[1]-r]],L1=sy-A[1],L2=Math.abs(C[0]-mx),L3=C[1]-r-sy,tot=L1+L2+L3;let d=u*tot,x,y;
        if(d<L1){x=mx;y=A[1]+d}else if(d<L1+L2){x=lerp(mx,C[0],(d-L1)/L2);y=sy}else{x=C[0];y=sy+(d-L1-L2)}
        const live=t<GN_T[3]+.1;
        if(live)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--gold)"/>`;
        if(u>=1&&live)s+=`<rect x="${f1(C[0]-(N?26:28))}" y="${f1(C[1]-r-30)}" width="${N?52:56}" height="15" rx="7" style="fill:var(--gold-soft);stroke:var(--gold)"/><text x="${f1(C[0])}" y="${f1(C[1]-r-19.5)}" class="t-xs t-mid" style="fill:var(--ink)">${F.odds[n.id].replace('carrier ','c ')}</text>`})})}
    /* symbols */
    let carriers=0,tested=0;
    GN_NODES.forEach(n=>{const d=F[n.id],[x,y]=P(n);
      let aff=n.pro?1:(pHist>0?(d.a?1:0):0);
      const shown=n.pro||pHist*12>GN_NODES.indexOf(n)*.6;if(!n.pro&&!shown)aff=0;
      const order=d.o==null?99:d.o,known=pCas>0&&order<99&&pCas*8>order;
      if(fam==='map'&&known&&d.g==='c')aff=.5;
      if(fam!=='map'&&d.inf&&pCas>.5)aff=d.a?1:aff;
      s+=`<g style="opacity:${n.pro||shown?1:.45}">${ped(x,y,n.sex,aff,{r,dead:d.dead&&shown,proband:n.pro})}</g>`;
      if(fam!=='map'&&known&&d.g==='+'&&!d.a)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--ink)"/>`;
      if(n.pro||shown)d.l.forEach((l,i)=>s+=`<text x="${f1(x+(n.pro?9:0))}" y="${f1(y+r+12+i*11)}" class="t-xs t-mid" style="fill:${d.a?'var(--tumour)':'var(--muted)'}">${l}</text>`);
      /* genotype badge */
      let badge='',bc='var(--muted)';
      if(known){badge=d.g==='+'?'+':d.g==='−'?'−':d.g==='c'?'carrier':d.g==='aa'?'2 copies':'';bc=d.g==='−'?'var(--good)':d.g==='c'?'var(--polyp-line)':'var(--tumour)';tested++;if(d.g==='+'||d.g==='c')carriers++}
      else if(d.inf&&pCas>.5){badge='obligate +';bc='var(--tumour)'}
      else if(d.na&&pCas>.5){badge='not at risk';bc='var(--good)'}
      if(badge){const w=badge.length*5.8+10;s+=`<rect x="${f1(x-w/2)}" y="${f1(y-r-18)}" width="${f1(w)}" height="14" rx="7" style="fill:var(--panel);stroke:${bc}"/><text x="${f1(x)}" y="${f1(y-r-8)}" class="t-xs t-mid" style="fill:${bc};font-weight:700">${badge}</text>`}
      if(pPlan>0&&known&&F.plan[d.g]){const pl=F.plan[d.g],good=d.g==='−';
        s+=`<text x="${f1(x+(n.pro?9:0))}" y="${f1(y+r+12+d.l.length*11+2)}" class="t-xs t-mid" style="fill:${good?'var(--good)':'var(--accent)'};font-weight:700;opacity:${pPlan}">${pl}</text>`}
    });
    /* side panel */
    const Q=N?{x:8,y:398,w:384,h:194}:{x:486,y:36,w:226,h:370};
    s+=`<rect x="${Q.x}" y="${Q.y}" width="${Q.w}" height="${Q.h}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const qx=Q.x+12;let qy=Q.y+22;const T=(txt,cls='t-sm',st='')=>{s+=`<text x="${qx}" y="${f1(qy)}" class="${cls}" style="${st}">${txt}</text>`;qy+=cls==='t-lbl'?20:15};
    if(ph===0){T('THE PROBAND','t-xs');T(fam==='lynch'?'Tumour: MSH2/MSH6 lost':fam==='fap'?'Hundreds of adenomas':'Polyps + cancer at 47','t-lbl');
      T(fam==='lynch'?'dMMR → germline test':fam==='fap'?'APC germline test':'MUTYH germline test');
      T(fam==='lynch'?'Lynch: MLH1, MSH2, MSH6,':fam==='fap'?'APC on chromosome 5q21':'Biallelic MUTYH','t-sm','fill:var(--ink)');if(fam==='lynch')T('PMS2 or EPCAM','t-sm','fill:var(--ink)');
      T('Legend','t-xs');qy+=4;s+=ped(qx+10,qy,'f',1,{r:8})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">affected</text>`+ped(qx+110,qy,'m',0,{r:8})+`<text x="${qx+126}" y="${qy+4}" class="t-xs">unaffected</text>`;qy+=24;
      s+=ped(qx+10,qy,'f',.5,{r:8})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">carrier (recessive)</text>`;qy+=24;
      s+=ped(qx+10,qy,'m',0,{r:8,dead:1})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">died</text>`;}
    else if(ph===1){T('FAMILY HISTORY','t-xs');
      if(fam==='lynch'){T('Amsterdam II check','t-lbl');
        [['3 relatives, Lynch cancers',.15],['1 is FDR of the other 2',.35],['2 successive generations',.55],['1 diagnosed before 50',.75],['FAP excluded',.92]].forEach(([l,k])=>{const ok=pHist>=k;s+=`<text x="${qx}" y="${f1(qy)}" class="t-sm" style="fill:${ok?'var(--good)':'var(--muted)'}">${ok?'✓':'·'} ${l}</text>`;qy+=17});
        qy+=6;T(pHist>=.92?'Criteria met: "3-2-1-0"':'checking…','t-sm','fill:var(--ink);font-weight:700')}
      else if(fam==='fap'){T('Polyposis, two generations','t-lbl');T('Grandfather: CRC 39');T('Mother: colectomy at 21');T('~70% have a family history');T('15–30% of APC variants');T('arise de novo')}
      else{T('One generation only','t-lbl');T('Parents: no polyps');T('Grandparents: no polyps');T('1 in 45 people carry');T('a MUTYH variant');T('(mostly one copy)')}}
    else if(ph===2){T('INHERITANCE','t-xs');T(fam==='map'?'Carrier × carrier':'Carrier × non-carrier','t-lbl');
      /* Punnett square */
      const cs=N?42:46,px=qx+30,py=qy+16,A=fam==='map'?['M','m']:['V','n'],B=fam==='map'?['M','m']:['n','n'];
      s+=`<text x="${px+cs}" y="${py-4}" class="t-xs t-mid">${A[0]}</text><text x="${px+cs*2}" y="${py-4}" class="t-xs t-mid">${A[1]}</text>`;
      for(let i=0;i<2;i++){s+=`<text x="${px+cs*.5-6}" y="${f1(py+cs*(i+.5)+4)}" class="t-xs t-mid">${B[i]}</text>`;
        for(let j=0;j<2;j++){const k=i*2+j,shown=pTr*4>k;let fill='var(--panel)',lab='';
          if(fam==='map'){const nv=(A[j]==='m')+(B[i]==='m');fill=nv===2?'var(--tumour)':nv===1?'var(--polyp)':'var(--good-soft)';lab=nv===2?'MAP':nv===1?'carrier':'clear'}
          else{const v=A[j]==='V';fill=v?'var(--tumour)':'var(--good-soft)';lab=v?'carrier':'clear'}
          s+=`<rect x="${px+cs*(j+.5)}" y="${f1(py+cs*i)}" width="${cs}" height="${cs}" style="fill:${shown?fill:'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`;
          if(shown)s+=`<text x="${f1(px+cs*(j+1))}" y="${f1(py+cs*(i+.5)+3)}" class="t-xs t-mid" style="fill:${lab==='clear'?'var(--good)':'#fff'};font-weight:700">${lab}</text>`}}
      qy=py+cs*2+20;
      if(N){/* narrow: text to the right of the square */qy=Q.y+60;const rx=px+cs*3;[fam==='map'?'1 in 4 affected':'1 in 2 inherit it',fam==='map'?'2 in 4 carriers':'every child, every time',fam==='map'?'1 in 4 clear':'both sexes alike'].forEach((l,i)=>s+=`<text x="${rx}" y="${qy+i*18}" class="t-sm" style="fill:var(--ink)">${l}</text>`)}
      else{T(fam==='map'?'1 in 4 affected (MAP)':'1 in 2 inherit the variant','t-sm','fill:var(--ink);font-weight:700');T(fam==='map'?'2 in 4 carriers':'for every child,');T(fam==='map'?'1 in 4 inherit neither':'regardless of siblings')}}
    else if(ph===3){T('CASCADE TESTING','t-xs');T(`${tested} tested`,'t-lbl');T(`${Math.max(0,carriers-1)} relatives carry it`,'t-sm','fill:var(--ink);font-weight:700');
      T(fam==='lynch'?'Typical: about 3 relatives':fam==='fap'?'Uncle negative: his':'Carriers half-shaded');T(fam==='lynch'?'per proband (Hampel 2008)':fam==='fap'?'children not at risk':'Single copy: risk to 70');if(fam==='map')T('7.2% men, 5.6% women');}
    else{T('SURVEILLANCE, AS PUBLISHED','t-xs');
      const L={lynch:['Carriers: colonoscopy','every 1–2 y from 20–25 (ACG)','every 2 y to 75 (UK)','Aspirin discussed (CAPP2)','Negative relatives:','population screening'],
        fap:['Carriers: colonoscopy','from 12 (Europe 2024)','12–14, every 1–3 y (UK)','Colectomy by late teens','or early twenties','Upper GI checks from 25'],
        map:['MAP: colonoscopy','from 18–20, then yearly','(UK 2020)','Single-copy carriers:','no routine extra','colonoscopy (UK 2020)']}[fam];
      L.forEach((l,i)=>T(l,i===0||i===3?'t-lbl':'t-sm',i===0||i===3?'font-size:12.5px':''))}
    svg.innerHTML=s;
    setSt(ph);
    $('#gnNote').innerHTML=noteHTML(GN_STEPS[fam][ph]);
    const aff=GN_NODES.filter(n=>F[n.id].a).length;
    $('#gnRead').innerHTML=`<span>syndrome <b>${F.name}</b></span><span>inheritance <b>${fam==='map'?'autosomal recessive':'autosomal dominant'}</b></span><span>affected <b>${pHist>0?aff:1}</b></span><span>carriers found by testing <b>${pCas>0?Math.max(0,carriers-1):'–'}</b></span>`;
  }
  const stop=playWire(rg,$('#gnPlay'),draw,22000,'Replay','genes');
  function wire(){const old=$('#gnSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,GN_STEPS[fam],rg,draw,stop)}
  $$('[data-gnm]').forEach(b=>b.addEventListener('click',()=>{stop();fam=b.dataset.gnm;$$('[data-gnm]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ================= mismatch repair ================= */
  const ms=$('#gnMmr'),mr=$('#gnMmrT');let mm='p',setM=()=>{};
  function drawM(t){const N=vb(ms,'720 330','400 470');const dm=mm==='d';
    const nB=N?14:22,bw=N?26:28,x0=N?18:52,r0=N?2:6,r1=r0+9,yN=N?120:96,yT=yN+34;
    const tmpl=(N?'GC':'GCATCG')+'TTTTTTTTTT'+(N?'AG':'GACTCG'),comp={A:'T',T:'A',G:'C',C:'G'};
    const bx=i=>x0+i*bw+bw/2;
    const pSyn=ramp(t,0,.24),pSlip=ramp(t,.12,.2),pS=ramp(t,.25,.4),pL=ramp(t,.45,.56),pX=ramp(t,.6,.76),pR=ramp(t,.8,.92);
    const loopI=r0+5;let s=`<defs>${marker('gnArr','var(--muted)')}</defs>`;
    const base=(x,y,ch,col,op=1,hl)=>`<g style="opacity:${f1(op)}"><rect x="${f1(x-bw/2+2)}" y="${f1(y-11)}" width="${bw-4}" height="22" rx="4" style="fill:${hl?'var(--polyp)':col};stroke:var(--line)"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-sm t-mid" style="fill:${hl?'#fff':'var(--ink)'};font-weight:700">${ch}</text></g>`;
    s+=`<text x="${x0}" y="${yN-34}" class="t-xs">NEW STRAND (5′→3′)</text><text x="${x0}" y="${yT+30}" class="t-xs">TEMPLATE STRAND</text>`;
    s+=`<rect x="${f1(x0+r0*bw)}" y="${yN-20}" width="${(r1-r0+1)*bw}" height="${yT-yN+40}" rx="8" style="fill:none;stroke:var(--gold);stroke-dasharray:4 3"/><text x="${f1(x0+(r0+r1+1)/2*bw)}" y="${yT+30}" class="t-xs t-mid" style="fill:var(--gold)">microsatellite (A)10</text>`;
    /* template */
    [...tmpl].forEach((c,i)=>s+=base(bx(i),yT,c,'var(--panel-2)'));
    /* new strand: synthesised up to k bases; excised range fades; resynthesis restores */
    const k=pSyn*nB,exL=r0-1,exR=r1+1,dmLate=false;
    for(let i=0;i<nB;i++){if(i+1>k+.001&&i>=k)continue;let op=clamp(k-i);
      if(!dm&&i>=exL&&i<=exR){const cut=clamp(pX*(exR-exL+2)-(i-exL));op*=1-cut;if(pR>0)op=Math.max(op,clamp(pR*(exR-exL+2)-(i-exL)))}
      s+=base(bx(i),yN,comp[tmpl[i]],'var(--mucosa)',op,dmLate&&i>=r0&&i<=r1&&false)}
    /* hydrogen bonds */
    for(let i=0;i<Math.floor(k);i++)s+=`<line x1="${f1(bx(i))}" x2="${f1(bx(i))}" y1="${yN+11}" y2="${yT-11}" style="stroke:var(--muted);stroke-width:1;opacity:.5"/>`;
    /* the loop */
    const loopOp=dm?pSlip:pSlip*(1-ramp(pX,.35,.6));
    if(pSlip>0&&loopOp>0){const lx=(bx(loopI)+bx(loopI+1))/2,ly=yN-20-14*pSlip;
      s+=`<path d="M${f1(lx-bw/2)} ${yN-11}Q${f1(lx)} ${f1(ly-6)} ${f1(lx+bw/2)} ${yN-11}" style="fill:none;stroke:var(--tumour);stroke-width:2;opacity:${f1(loopOp)}"/>`;
      s+=`<g style="opacity:${f1(loopOp)}">${base(lx,ly-6,'A','var(--tumour-soft)')}</g>${pS<.15?`<text x="${f1(lx+bw/2+4)}" y="${f1(ly-14)}" class="t-xs" style="fill:var(--tumour);opacity:${f1(loopOp)}">extra A looped out</text>`:''}`}
    /* polymerase */
    if(pSyn<1||(!dm&&pR>0&&pR<1)){const px=pSyn<1?bx(Math.min(nB-1,k)):bx(lerp(exL,exR,pR));
      s+=`<ellipse cx="${f1(px+6)}" cy="${f1((yN+yT)/2)}" rx="${N?22:26}" ry="34" style="fill:var(--accent);opacity:.22;stroke:var(--accent)"/><text x="${f1(px+6)}" y="${f1(yT+52)}" class="t-xs t-mid" style="fill:var(--accent)">${pSyn<1?'DNA polymerase':'polymerase δ'}</text>`}
    const lx=(bx(loopI)+bx(loopI+1))/2;
    if(!dm){
      /* MutS alpha slides in and clamps */
      if(pS>0&&pX<.7){const x=lerp(x0-30,lx,ease(pS)),op=1-ramp(pX,.4,.7);
        s+=`<g style="opacity:${f1(op)}"><path d="M${f1(x-30)} ${yN-46}Q${f1(x-34)} ${yN+10} ${f1(x-12)} ${yN+18}L${f1(x-12)} ${yN-2}Q${f1(x-18)} ${yN-26} ${f1(x)} ${yN-30}Q${f1(x+18)} ${yN-26} ${f1(x+12)} ${yN-2}L${f1(x+12)} ${yN+18}Q${f1(x+34)} ${yN+10} ${f1(x+30)} ${yN-46}Z" style="fill:var(--rx);opacity:.75"/><text x="${f1(x)}" y="${yN-52}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">MutSα · MSH2–MSH6</text></g>`}
      if(pL>0&&pX<.7){const op=(1-ramp(pX,.4,.7))*pL,yy=lerp(yN-110,yN-74,ease(pL));
        s+=`<g style="opacity:${f1(op)}"><rect x="${f1(lx-38)}" y="${f1(yy-14)}" width="76" height="22" rx="11" style="fill:var(--lymph)"/><text x="${f1(lx)}" y="${f1(yy+1)}" class="t-xs t-mid" style="fill:#fff;font-weight:700">MutLα</text><text x="${f1(lx+44)}" y="${f1(yy+1)}" class="t-xs" style="fill:var(--lymph)">MLH1–PMS2</text></g>`;
        s+=`<g style="opacity:${f1(op)}"><ellipse cx="${f1(bx(exL-1))}" cy="${yN}" rx="10" ry="20" style="fill:none;stroke:var(--gold);stroke-width:3"/><text x="${f1(bx(exL-1))}" y="${yN-26}" class="t-xs t-mid" style="fill:var(--gold)">PCNA</text></g>`}
      if(pX>0&&pR<.2){const x=bx(lerp(exL,exR,pX)),op=1-ramp(pR,0,.2);
        s+=`<g style="opacity:${f1(op)}"><path d="M${f1(x+16)} ${yN-14}A16 16 0 1 0 ${f1(x+16)} ${yN+14}L${f1(x)} ${yN}Z" style="fill:var(--warn)"/><text x="${f1(x)}" y="${yN-24}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">EXO1</text></g>`}
      if(pR>=1){s+=`<text x="${f1(lx)}" y="${yN-30}" class="t-sm t-mid" style="fill:var(--good);font-weight:700">✓ ten repeats, sealed by ligase</text>`}
      const pD=ramp(t,.9,.98),yD=yT+(N?100:72);
      if(pD>0){s+=`<text x="${x0}" y="${yD-24}" class="t-xs" style="opacity:${f1(pD)}">NEXT DIVISION: THE DAUGHTER CELL'S TEMPLATE</text>`;
        [...tmpl].forEach((c,i)=>{const op=clamp(pD*nB-i);s+=`<g style="opacity:${f1(op)}">${base(bx(i),yD,c,i>=r0&&i<=r1?'var(--good-soft)':'var(--panel-2)')}</g>`});
        if(pD>=1)s+=`<text x="${f1(x0+(r0+r1+1)/2*bw)}" y="${yD+30}" class="t-sm t-mid" style="fill:var(--good);font-weight:700">(T)10: unchanged, microsatellite stable</text>`}
    }else{
      if(pS>0){s+=`<text x="${f1(lx)}" y="${yN-50}" class="t-sm t-mid" style="fill:var(--bad);font-weight:700;opacity:${f1(pS)}">✕ no MutSα / MutLα</text>`}
      /* daughter duplex with 11 repeats */
      const pD=ramp(t,.45,.6),yD=yT+(N?100:72);
      if(pD>0){const seq=(N?'GC':'GCATCG')+'TTTTTTTTTTT'+(N?'AG':'GACTCG');
        s+=`<text x="${x0}" y="${yD-24}" class="t-xs" style="opacity:${f1(pD)}">NEXT DIVISION: THE DAUGHTER CELL'S TEMPLATE</text>`;
        const w2=bw*nB/(nB+1);
        [...seq].forEach((c,i)=>{const op=clamp(pD*(nB+1)-i);s+=`<g style="opacity:${f1(op)}"><rect x="${f1(x0+i*w2+2)}" y="${yD-11}" width="${f1(w2-4)}" height="22" rx="4" style="fill:${i>=r0&&i<=r1+1?'var(--tumour-soft)':'var(--panel-2)'};stroke:var(--line)"/><text x="${f1(x0+i*w2+w2/2)}" y="${yD+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${c}</text></g>`});
        if(pD>=1)s+=`<text x="${f1(x0+(r0+r1+2)/2*w2)}" y="${yD+30}" class="t-sm t-mid" style="fill:var(--tumour);font-weight:700">(T)11: one repeat longer</text>`}
      const pI=ramp(t,.6,.78);
      if(pI>0){/* fragment-length peaks: normal vs tumour */
        const gy=N?yD+70:yD+48,gx=N?x0+20:x0+340,gw=N?300:300;
        s+=`<text x="${gx}" y="${gy-4}" class="t-xs" style="opacity:${f1(pI)}">MICROSATELLITE LENGTHS, NORMAL vs TUMOUR</text>`;
        [ [0,'var(--accent)','normal'],[1,'var(--tumour)','tumour'] ].forEach(([j,c,l])=>{const yb=gy+22+j*26;
          s+=`<line x1="${gx}" x2="${gx+gw}" y1="${yb}" y2="${yb}" class="axis" style="opacity:${f1(pI)}"/><text x="${gx-4}" y="${yb}" class="t-xs t-end" style="opacity:${f1(pI)}">${l}</text>`;
          const pk=j?[ [-2,.5],[-1,.8],[0,.45],[1,.9],[2,.35] ]:[ [0,1] ];pk.forEach(([o,h])=>{const xx=gx+gw/2+o*24*pI;s+=`<path d="M${f1(xx-7)} ${yb}Q${f1(xx)} ${f1(yb-20*h*pI)} ${f1(xx+7)} ${yb}" style="fill:${c};opacity:.8"/>`})})}
    }
    ms.innerHTML=s;
    const ph=phaseOf(GN_MMR[mm],t);setM(ph);$('#gnMmrNote').innerHTML=noteHTML(GN_MMR[mm][ph]);
  }
  const stopM=playWire(mr,$('#gnMmrPlay'),drawM,16000,'Replay','genes');
  function wireM(){const old=$('#gnMmrSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setM=stepWire(nu,GN_MMR[mm],mr,drawM,stopM)}
  $$('[data-gnr]').forEach(b=>b.addEventListener('click',()=>{stopM();mm=b.dataset.gnr;$$('[data-gnr]').forEach(x=>x.setAttribute('aria-pressed',x===b));wireM();drawM(+mr.value)}));
  wireM();drawM(+mr.value);

  /* ================= risk curves ================= */
  const cv=$('#gnCurve'),cr=$('#gnCurveT');let sex='F';const on={MLH1:1,MSH2:1,MSH6:1,PMS2:1};
  const interp=(pts,a)=>{if(a<pts[0][0])return null;for(let i=1;i<pts.length;i++)if(a<=pts[i][0]){const p=pts[i-1],q=pts[i];return p[1]+(q[1]-p[1])*(a-p[0])/(q[0]-p[0])}return pts[pts.length-1][1]};
  function drawC(t){const N=vb(cv,'720 360','400 420');const age=lerp(30,75,t);
    const C=N?{x0:44,x1:300,y0:34,y1:370}:{x0:56,x1:510,y0:34,y1:320};
    const X=a=>lerp(C.x0,C.x1,(a-30)/45),Y=v=>lerp(C.y1,C.y0,v/60);
    let s='';
    [0,10,20,30,40,50,60].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [30,40,50,60,70,75].forEach(a=>s+=`<text x="${f1(X(a))}" y="${C.y1+15}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+30}" class="t-xs t-end">age</text><text x="${C.x0}" y="${C.y0-12}" class="t-xs">cumulative colorectal cancer incidence, ${sex==='F'?'women':'men'}</text>`;
    /* population reference at 70 */
    const pop=sex==='F'?2.1:2.9;
    s+=`<circle cx="${f1(X(70))}" cy="${f1(Y(pop))}" r="4" style="fill:var(--muted)"/><text x="${f1(X(70)-6)}" y="${f1(Y(pop)-7)}" class="t-xs t-end">general population ${pop}%</text>`;
    const labs=[];
    Object.entries(GN_PLSD).forEach(([g,D])=>{if(!on[g])return;const pts=D[sex];if(age<pts[0][0])return;
      const vis=pts.filter(p=>p[0]<=age);const cur=interp(pts,age);let d='';vis.concat([ [age,cur] ]).forEach((p,i)=>d+=(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1])));
      s+=`<path d="${d}" style="fill:none;stroke:${D.c};stroke-width:2.6;stroke-linejoin:round"/>`;
      vis.forEach(p=>s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="3.6" style="fill:var(--panel);stroke:${D.c};stroke-width:2"/>`);
      labs.push({g,c:D.c,v:cur,y:Y(cur)})});
    /* end labels, de-overlapped */
    labs.sort((a,b)=>a.y-b.y);for(let i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<14)labs[i].y=labs[i-1].y+14;
    labs.forEach(l=>s+=`<text x="${f1(X(age)+8)}" y="${f1(l.y+4)}" class="t-sm" style="fill:${l.c};font-weight:700">${l.g} ${f1(l.v)}%</text>`);
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    if(!N){const bx=636;s+=`<text x="${bx}" y="50" class="t-xs">CARRIERS IN THE</text><text x="${bx}" y="62" class="t-xs">POPULATION</text>`;
      [ ['MLH1','1 in 1,946'],['MSH2','1 in 2,841'],['MSH6','1 in 758'],['PMS2','1 in 714'],['any','1 in 279'] ].forEach(([g,v],i)=>s+=`<text x="${bx}" y="${88+i*30}" class="t-sm" style="fill:${GN_PLSD[g]?GN_PLSD[g].c:'var(--ink)'};font-weight:700">${g}</text><text x="${bx}" y="${101+i*30}" class="t-xs">${v}</text>`)}
    cv.innerHTML=s;
    $('#gnCurveRead').innerHTML=`<span>age <b>${Math.round(age)}</b></span>`+Object.entries(GN_PLSD).filter(([g])=>on[g]).map(([g,D])=>{const v=interp(D[sex],age);return `<span>${g} <b>${v==null?'no data':f1(v)+'%'}</b></span>`}).join('')+`<span>carrier frequency: any MMR gene <b>1 in 279</b> [[Win2017]]</span>`;
    $('#gnCurveNote').innerHTML=noteHTML({k:'PLSD 2020 · 6,350 carriers',t:age<50?'Little risk before 50 for MSH6 and PMS2':'By 75: about half for MLH1 and MSH2',
      txt:`Cumulative colorectal cancer incidence to 75: MLH1 48.3% (women) and 57.1% (men); MSH2 46.6% and 51.4%; MSH6 20.3% and 18.2%; PMS2 10.4%. PMS2 carriers had no increased cancer risk before 50, and ten-year crude survival after colon, endometrial or ovarian cancer was over 80%. These carriers were under colonoscopy surveillance, so the curves describe cancers that still occurred despite it. [[DominguezValentin2020]]`,
      pt:`A Lynch gene change raises the chance of bowel cancer a lot, but by how much depends on which gene. Regular colonoscopy is offered to find problems early.`,
      hook:`MLH1/MSH2 high (≈45–57% to 75), MSH6 moderate, PMS2 low; MSH6 has a high endometrial but modest CRC risk. [[DominguezValentin2020]]`});
  }
  playWire(cr,$('#gnCurvePlay'),drawC,9000,'Replay','genes');
  $$('[data-gng]').forEach(b=>b.addEventListener('click',()=>{on[b.dataset.gng]=!on[b.dataset.gng];b.setAttribute('aria-pressed',!!on[b.dataset.gng]);drawC(+cr.value)}));
  $$('[data-gns]').forEach(b=>b.addEventListener('click',()=>{sex=b.dataset.gns;$$('[data-gns]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC(+cr.value)}));
  drawC(+cr.value);
};
