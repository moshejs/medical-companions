/* =============== 1.3 Genes & family risk =============== */
/* The family scrubber: each step changes who in the tree is affected and what the
   panel beside it shows (an icon array for absolute risks, bars for relative risks
   and heritability). Every number is a published population figure. */
const GE_STEPS=[
 {from:0,at:.08,k:'Step 1 · no one affected',t:'The general population',aff:{},mode:'pct',val:.48,cap:'child of two unaffected parents',sub:'by age 52 · Danish register',
  txt:`In the WHO World Mental Health surveys of 61,392 adults in 11 countries, lifetime prevalence was 0.6% for bipolar I, 0.4% for bipolar II and 2.4% for the whole bipolar spectrum, including subthreshold forms. In the Danish register of 2.7 million people, children with neither parent admitted with bipolar disorder had a cumulative incidence of 0.48% by age 52: about 1 in 200. [[Merikangas2011,Gottesman2010]]`,
  pt:`About 1 adult in 100 has bipolar I or II at some point in life. In a family where no one is affected, a child's risk is lower still.`,
  hook:`Population baseline (WMH surveys): bipolar I 0.6%, bipolar II 0.4%, whole spectrum 2.4%. [[Merikangas2011]]`},
 {from:.17,at:.25,k:'Step 2 · a brother has it',t:'One first-degree relative',aff:{sib:1},pro:'sib',mode:'rr',
  txt:`Risk rises several-fold when a brother or sister has bipolar disorder, and falls with genetic distance. In the Swedish multi-generation register (40,487 probands), the relative risk was 7.9 for full siblings, 4.5 for maternal half-siblings and 2.4 for paternal half-siblings; shared family environment explained only 3.4% of liability. A Danish cohort of 2.1 million found a 13.63-fold risk with any affected first-degree relative. A relative risk multiplies a small baseline, so the absolute risk stays well below one in two. [[Lichtenstein2009,Mortensen2003]]`,
  pt:`A brother or sister with bipolar disorder raises your risk several times over, but from a low starting point.`,
  hook:`First-degree relatives: relative risk about 6–14 (Sweden 5.8–7.9; Denmark 13.63). [[Song2015Family,Mortensen2003]]`},
 {from:.34,at:.42,k:'Step 3 · a parent has it',t:'A parent with bipolar disorder',aff:{f:1},pro:'f',mode:'pct',val:4.4,cap:'child of one affected parent',sub:'by age 52 · 23,152 offspring · Denmark',
  txt:`In Danish registers, cumulative incidence of bipolar disorder by age 52 was 4.4% in 23,152 people with one parent admitted with bipolar disorder, against 0.48% with neither. A meta-analysis of 211 family high-risk and registry studies gave a relative risk of 5.1 and a lifetime risk of 5% for bipolar disorder itself, but 55% for any mental disorder; 96% of its studies were at high risk of bias. In Sweden, a mother's and a father's illness predicted offspring bipolar disorder equally. [[Gottesman2010,Uher2023,Kendler2026Mating]]`,
  pt:`If one parent has bipolar disorder, about 4 or 5 children in 100 develop it. Most stay well, though other mood and anxiety problems are more common, so it is worth knowing the early signs.`,
  hook:`One affected parent: 4.4% by age 52 in Denmark; about 5% lifetime in a 2023 meta-analysis. [[Gottesman2010,Uher2023]]`},
 {from:.5,at:.58,k:'Step 4 · both parents',t:'Both parents affected',aff:{f:1,m:1},pro:'f',mode:'pct',val:24.9,cap:'child of two affected parents',sub:'by age 52 · 146 offspring · Denmark',
  txt:`With both parents admitted with bipolar disorder (146 offspring of 83 couples), cumulative incidence by age 52 was 24.9%, or 36.0% if unipolar depression is counted, and 44.2% had some psychiatric disorder. In Sweden, the hazard ratio for offspring bipolar I rose from 5.59 with one affected parent to 13.61 with two. [[Gottesman2010,Kendler2026Mating]]`,
  pt:`When both parents are affected the risk is about 1 in 4. Three children in four still do not develop bipolar disorder.`,
  hook:`Two affected parents: 24.9% by age 52 (36.0% counting unipolar depression). [[Gottesman2010]]`},
 {from:.67,at:.75,k:'Step 5 · an identical twin',t:'An identical co-twin',aff:{sib:1},pro:'sib',twin:1,mode:'pct',val:43,cap:'identical (MZ) co-twin, bipolar I',sub:'non-identical (DZ) co-twin: 6% · Finland',
  txt:`Identical (monozygotic) twins share all their DNA. In a nationwide Finnish twin sample, probandwise concordance for bipolar I was 0.43 in monozygotic and 0.06 in dizygotic twins (heritability 0.93). An older Danish study, which grouped unipolar and bipolar forms together, found 0.67 and 0.20. A concordance well below 1 in identical twins means that non-genetic factors matter too. [[Kieseppa2004,Bertelsen1977]]`,
  pt:`Even an identical twin, with the very same genes, more often than not does not develop bipolar I.`,
  hook:`Bipolar I concordance: MZ 0.43 vs DZ 0.06 (Finland). [[Kieseppa2004]]`},
 {from:.84,at:.93,k:'Step 6 · the whole picture',t:'Risk, not destiny',aff:{gf:1,au:.5},pro:'gf',mode:'h2',
  txt:`Twin studies put heritability at about 60–85%; whole-population Swedish registers at 58–59%; common variants measured in GWAS explain about 16–23%. Illness can appear to skip a generation, and an aunt's depression shares part of the same liability: the genetic correlation with major depression is about 0.44–0.47. In Swedish registers, family genetic risk and environmental exposures each added to risk rather than one explaining the other. [[Mullins2021,Lichtenstein2009,Song2015Family,Stahl2019,PGCCDG2013NatGenet,Robinson2026FGRS]]`,
  pt:`Genes raise the odds; they do not settle the outcome. Many people with an affected relative never develop bipolar disorder.`,
  hook:`Heritability about 60–85%, but shared family environment only about 3–4% of liability. [[Mullins2021,Lichtenstein2009]]`}
];
const GE_RR=[['Paternal half-sibling',2.4],['Maternal half-sibling',4.5],['Full sibling',7.9],['Any first-degree relative (Denmark)',13.63]];
const GE_H2=[['UK twins 2003',85,'h'],['Finnish twins 2004',93,'h'],['Norwegian twins 2008',73,'h'],['Swedish twins 2019',60.4,'h'],['Swedish families 2009',59,'h'],['Common SNPs (GWAS) 2021',18.6,'s'],['Shared family environment',3.4,'e']];
const GE_LAD=[[0,.48,'0.48%','no affected parent'],[2,4.4,'4.4%','one parent'],[3,24.9,'24.9%','both parents'],[4,43,'43%','MZ co-twin']];

/* GWAS waves */
const GE_GW=[
 {y:2008,cases:4387,loci:1,k:'2008 · 4,387 cases',t:'The first hits: ANK3 and CACNA1C',
  txt:`The first collaborative genome-wide association study (4,387 cases, 6,209 controls) found genome-wide association at <b>ANK3</b>, which encodes ankyrin G (P = 9.1 × 10⁻⁹), and support for <b>CACNA1C</b>, an L-type calcium-channel subunit (P = 7.0 × 10⁻⁸, just short of the 5 × 10⁻⁸ line). The authors suggested a role for ion-channel dysfunction. [[Ferreira2008]]`,
  pt:`Scientists scan the whole genome for spots where people with bipolar disorder differ slightly, on average, from people without it. A dot above the dashed line is a confident finding.`,
  hook:`ANK3 (ankyrin G) and CACNA1C (L-type calcium channel α1C): the classic first bipolar GWAS genes. [[Ferreira2008]]`},
 {y:2011,cases:11974,loci:null,k:'2011 · 11,974 cases',t:'Calcium channels confirmed',
  txt:`The first Psychiatric GWAS Consortium analysis (11,974 cases, 51,792 controls) confirmed CACNA1C and found a new variant in <b>ODZ4</b> (now called TENM4); a pathway of calcium-channel subunits was enriched. A five-disorder study then found CACNA1C and CACNB2 with effects shared across psychiatric disorders. [[PGCBD2011,PGCCDG2013Lancet]]`,
  pt:`With more people in the study, weaker signals rise above the line.`,
  hook:`ODZ4 (TENM4) joined CACNA1C in 2011; calcium-channel signalling recurs across psychiatric disorders. [[PGCBD2011,PGCCDG2013Lancet]]`},
 {y:2019,cases:29764,loci:30,k:'2019 · PGC2',t:'30 loci',
  txt:`Stahl and colleagues studied 20,352 cases and 31,358 controls, with follow-up in 9,412 cases and 137,760 controls: 30 genome-wide significant loci, 20 of them new. Implicated genes encode ion channels such as <b>SCN2A</b>, neurotransmitter receptors such as <b>GRIN2A</b>, transporters and synaptic components. SNP-heritability was 0.17–0.23, and about twice as high for bipolar I (0.25) as bipolar II (0.11). <span class="ev hyp">Hypothesis</span> The calcium-channel findings renewed interest in calcium-channel blockers as treatments. [[Stahl2019]]`,
  pt:`Each spot nudges risk up only a tiny amount. It takes very large studies to find them.`,
  hook:`PGC2 (2019): 30 loci; SNP-heritability 17–23%; bipolar I about twice bipolar II. [[Stahl2019]]`},
 {y:2021,cases:41917,loci:64,k:'2021 · PGC3',t:'64 loci and drug targets',
  txt:`Mullins and colleagues studied 41,917 cases and 371,549 controls of European ancestry and found 64 loci, including CACNA1C, ANK3, ODZ4, SCN2A and <b>SHANK2</b>. Risk alleles were enriched in synaptic-signalling genes and in neurons of the prefrontal cortex and hippocampus, and in genes encoding targets of antipsychotics, calcium-channel blockers, antiepileptics and anaesthetics. <span class="ev hyp">Hypothesis</span> Fifteen expression-linked genes, such as HTR6, MCHR1, DCLK3 and FURIN, are offered as new treatment leads. Bipolar I and II correlated genetically at 0.85. [[Mullins2021]]`,
  pt:`The genes point at the connections between nerve cells, and at the targets of medicines already in use.`,
  hook:`PGC3 (2021): 64 loci from 41,917 cases; enriched for synaptic signalling and existing drug targets. [[Mullins2021]]`},
 {y:2025,cases:158036,loci:298,k:'2025 · four ancestries',t:'298 loci',
  txt:`O'Connell and colleagues studied 158,036 cases and about 2.8 million controls of European, East Asian, African American and Latino ancestry from 79 cohorts: 298 loci, a fourfold increase, one specific to East Asian ancestry. Fine-mapping gave 36 credible genes, 8 with synaptic roles, such as <b>CACNA1B</b>, SHANK2, <b>ERBB4</b> and <b>SORCS3</b>, and implicated GABAergic interneurons and medium spiny neurons. Even so, the 298 loci hold only 18.5% of the SNP-heritability (8.3% for the earlier 64). Self-reported diagnosis correlated only 0.47 with clinical cases. [[OConnell2025]]`,
  pt:`Hundreds of spots are now known. Together they still explain only a small part of the genetic risk.`,
  hook:`2025: 298 loci from 158,036 multi-ancestry cases, holding 18.5% of SNP-heritability. [[OConnell2025]]`},
 {y:2025,cases:158036,loci:298,prs:1,k:'Polygenic scores',t:'Why a score cannot diagnose',
  txt:`A polygenic score adds up a person's risk alleles. In 2021 it explained about 4.57% of liability (AUC 65%), and the top decile had an odds ratio of 3.5 against the middle decile. In 2025 the top quintile had an odds ratio of 7.06 against the middle, with a median AUC of 0.70; the authors judged the liability explained "insufficient for diagnostic prediction in the general population". <span class="ev early">Early evidence</span> In 227 high-risk offspring, adding the score to a clinical risk calculator raised the AUC to 0.81. Evidence is weaker in non-European ancestries. [[Mullins2021,OConnell2025,Hafeman2025,LewisVassos2020]]`,
  pt:`The two groups' scores overlap so much that a score cannot tell whether one person has, or will get, bipolar disorder.`,
  hook:`PRS: AUC about 0.65–0.70. A research tool, never a diagnosis on its own. [[OConnell2025,Murray2021PRS]]`}
];
GE_GW.forEach((s,i)=>{s.from=[0,.16,.32,.48,.64,.82][i];s.at=s.from+.12});
/* approximate chromosome lengths (Mb), for a proportional x axis */
const GE_CHR=[248,242,198,190,181,171,159,145,138,134,135,133,114,107,102,90,83,80,59,64,47,51];
/* named loci: chromosome, position along it (approximate), first wave above the line, label row */
const GE_NAMED=[{g:'ANK3',c:10,p:.45,w:0},{g:'CACNA1C',c:12,p:.04,w:1,pre:7.15},{g:'ODZ4',c:11,p:.72,w:1},{g:'SCN2A',c:2,p:.68,w:2},{g:'GRIN2A',c:16,p:.12,w:2},{g:'SHANK2',c:11,p:.52,w:3},{g:'ERBB4',c:2,p:.86,w:4},{g:'CACNA1B',c:9,p:.97,w:4},{g:'SORCS3',c:10,p:.78,w:4}];
const GE_FX={
 fam:{n:'Parent with bipolar disorder',s:'parent',d:.62,ev:'est',
  txt:`Children of one parent with bipolar disorder: 4.4% by age 52 in Denmark; a relative risk of 5.1 in a meta-analysis. Genes set where a person starts on the scale. [[Gottesman2010,Uher2023]]`},
 adv:{n:'Childhood adversity',s:'adversity',d:.36,ev:'est',
  txt:`Childhood adversity was 2.63 times more likely in people with bipolar disorder than in non-clinical controls (emotional abuse OR 4.04), but similar to other psychiatric patients, so it is not specific. In people with bipolar disorder, maltreatment goes with earlier onset (OR 1.85) and rapid cycling (OR 1.89), one reason trauma-informed care matters. [[PalmierClaus2016,AgnewBlais2016Lancet]]`},
 can:{n:'Cannabis use',s:'cannabis',d:.3,ev:'early',
  txt:`Cannabis use was associated with about 3-fold odds of new-onset manic symptoms (OR 2.97; 2 studies, called preliminary), and cannabis use disorder with later bipolar disorder (HR 2.96 in men, 2.54 in women). Mendelian randomisation suggests genetic liability to bipolar disorder raises cannabis use, so the direction is unresolved. [[Gibbs2015,Jefsen2023,Jefsen2021]]`},
 slp:{n:'Sleep loss',s:'sleep loss',d:.42,ev:'hyp',
  txt:`Sleep loss has been proposed as a "final common pathway" to mania, and mania cuts sleep further, so the loop can feed itself. In 3,140 people with bipolar disorder, sleep loss triggering a high mood was reported more often in bipolar I (OR 2.81) and by women (OR 1.43); the authors flag shift work and international travel as times to plan for. [[Wehr1987,Lewis2017Sleep]]`},
 pp:{n:'The weeks after birth',s:'postpartum',d:.52,ev:'est',
  txt:`First-time mothers' risk of psychiatric admission peaked 10–19 days after birth (RR 7.31); fathers had no increase. About half of pregnancies in women with bipolar I were followed by a perinatal mood episode. These are population figures for planning with a care team: see <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; the postpartum period</a>. [[MunkOlsen2006,DiFlorio2013]]`}
};
const GE_EVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};

inits.genes=()=>{
  /* ================= family tree ================= */
  const svg=$('#geSvg'),rg=$('#geT');let stop=()=>{};
  const ink='var(--ink)';
  function tree(ox,oy,S,P,lp){
    const r=11,X=x=>f1(ox+x),Y=y=>f1(oy+y),ln=(a,b,c,d)=>`<line x1="${X(a)}" y1="${Y(b)}" x2="${X(c)}" y2="${Y(d)}" style="stroke:${ink};stroke-width:1.4"/>`;
    const tw=!!S.twin;let s='';
    /* generation labels */
    [['I',60],['II',150],['III',250]].forEach(([g,y])=>{s+=`<text x="${X(14)}" y="${Y(y+4)}" class="t-xs">${g}</text>`});
    s+=ln(111,60,179,60)+ln(145,60,145,108)+ln(70,108,190,108)+ln(70,108,70,139)+ln(190,108,190,139);
    s+=ln(201,150,259,150)+ln(230,150,230,205);
    if(tw){s+=ln(230,205,190,239)+ln(230,205,270,239)+ln(211,222,249,222)}
    else s+=ln(190,205,270,205)+ln(190,205,190,239)+ln(270,205,270,239);
    const who=[['gf',100,60,'m','grandfather'],['gm',190,60,'f','grandmother'],['au',70,150,'f','aunt'],['f',190,150,'m','father'],['m',270,150,'f','mother'],['sib',270,250,tw?'f':'m',tw?'identical twin':'brother']];
    who.forEach(([id,x,y,sx,lab])=>{const a1=S.aff[id]||0,a0=P.aff[id]||0,pro=S.pro===id;
      s+=ped(ox+x,oy+y,sx,a0,{r});
      if(a1!==a0)s+=`<g style="opacity:${f1(lp)}">${ped(ox+x,oy+y,sx,a1,{r})}</g>`;
      if(pro)s+=`<g style="opacity:${f1(ramp(lp,.3,.9))}">${ped(ox+x,oy+y,sx,a1,{r,proband:1})}</g>`;
      s+=`<text x="${X(x+6)}" y="${Y(y+32)}" class="t-xs t-mid">${lab}</text>`});
    /* the person whose risk the panel shows */
    s+=`<circle cx="${X(190)}" cy="${Y(250)}" r="17" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:3 3"/>`+ped(ox+190,oy+250,'f',0,{r})+`<text x="${X(190)}" y="${Y(255)}" class="t-lbl t-mid" style="fill:var(--accent)">?</text><text x="${X(190)}" y="${Y(278)}" class="t-xs t-mid" style="fill:var(--accent)">you</text>`;
    return s}
  function legend(ox,oy,w){const items=[['full','bipolar disorder'],['half','another mood disorder'],['q','the person asking'],['arr','first affected relative']];
    let s='',x=ox,y=oy;items.forEach(([k,l],i)=>{const cw=l.length*5.9+34;if(x+cw>ox+w){x=ox;y+=20}
      if(k==='full')s+=ped(x+7,y,'m',1,{r:6});else if(k==='half')s+=ped(x+7,y,'f',.5,{r:6});
      else if(k==='q')s+=`<circle cx="${f1(x+7)}" cy="${f1(y)}" r="7" style="fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/><text x="${f1(x+7)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">?</text>`;
      else s+=`<path d="M${f1(x)} ${f1(y+6)}L${f1(x+12)} ${f1(y-5)}" style="stroke:${ink};stroke-width:1.5" marker-end="url(#pedArrow)"/>`;
      s+=`<text x="${f1(x+19)}" y="${f1(y+3.5)}" class="t-xs">${l}</text>`;x+=cw});return s}
  function icons(x,y,v,cell){let s='';const n=Math.floor(v),fr=v-n;
    for(let i=0;i<100;i++){const cx=x+(i%10)*cell,cy=y+Math.floor(i/10)*cell*1.08;
      s+=person(cx+cell/2,cy,cell*.82,i<n?'var(--brand)':'var(--muted)',{op:i<n?1:.3});
      if(i===n&&fr>.02)s+=`<g style="opacity:${f1(.25+fr*.75)}">${person(cx+cell/2,cy,cell*.82,'var(--brand)')}</g>`}
    return s}
  function panel(ox,oy,W,S,i,lp,t,N){
    let s=`<text x="${f1(ox)}" y="${f1(oy+14)}" class="t-sm" style="fill:var(--accent)">${S.mode==='pct'?'RISK FOR THE PERSON MARKED ?':S.mode==='rr'?'RISK COMPARED WITH THE POPULATION':'HOW MUCH IS GENETIC?'}</text>`;
    const g=ease(lp);
    if(S.mode==='pct'){const v=S.val*g,txt=S.val<1?v.toFixed(2):S.val<30?f1(v):Math.round(v);
      s+=`<text x="${f1(ox)}" y="${f1(oy+54)}" style="font:800 36px var(--display);fill:var(--brand)">${txt}%</text>`;
      s+=`<text x="${f1(ox)}" y="${f1(oy+74)}" class="t-lbl">${S.cap}</text><text x="${f1(ox)}" y="${f1(oy+88)}" class="t-xs">${S.sub}</text>`;
      const cell=N?15:13;s+=icons(ox,oy+100,v,cell);
      const lx=ox+cell*10+20,ly=oy+112;
      s+=person(lx+5,ly-8,12,'var(--brand)')+`<text x="${f1(lx+16)}" y="${f1(ly+1)}" class="t-xs">developed it</text>`+person(lx+5,ly+12,12,'var(--muted)',{op:.3})+`<text x="${f1(lx+16)}" y="${f1(ly+21)}" class="t-xs">did not</text>`;
      const notN=100-S.val;s+=`<text x="${f1(lx)}" y="${f1(ly+52)}" class="t-lbl" style="fill:var(--good)">${notN<99.6?Math.round(notN*10)/10:'99.5'} in 100</text><text x="${f1(lx)}" y="${f1(ly+66)}" class="t-xs">did not develop it</text>`;
      /* the ladder of absolute figures met so far */
      const L0=ox,L1=ox+W-10,LY=oy+(N?286:276),XX=v=>lerp(L0,L1,v/50);
      s+=`<line x1="${f1(L0)}" x2="${f1(L1)}" y1="${f1(LY)}" y2="${f1(LY)}" class="axis"/>`;
      [0,10,20,30,40,50].forEach(v=>{s+=`<line x1="${f1(XX(v))}" x2="${f1(XX(v))}" y1="${f1(LY-3)}" y2="${f1(LY+3)}" class="axis"/><text x="${f1(XX(v))}" y="${f1(LY+14)}" class="t-xs t-mid">${v}%</text>`});
      GE_LAD.forEach(([si,v,lab,d],j)=>{if(si>i)return;const on=si===i,op=on?ramp(lp,.2,.8):1,x=XX(v),up=j%2===0;
        s+=`<g style="opacity:${f1(op)}"><circle cx="${f1(x)}" cy="${f1(LY)}" r="${on?5:4}" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/>`;
        const ty=j===0||j===3?LY-10:LY+28,anc=j===3?' t-end':'',tx=j===3?L1:j===0?L0:x-6;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs${anc}" style="fill:${on?'var(--ink)':'var(--muted)'}">${lab} · ${d}</text></g>`});
    } else {
      const rows=S.mode==='rr'?GE_RR:GE_H2,mx=S.mode==='rr'?14:100,lw=N?0:150,bx=ox+lw,bw=W-lw-34,rh=N?34:30,y0=oy+40;
      rows.forEach(([l,v,c],j)=>{const yy=y0+j*rh,gv=v*ramp(lp,j*.08,.45+j*.08),w=bw*gv/mx;
        const col=c==='s'?'var(--down-fill)':c==='e'?'var(--up-fill)':'var(--brand)';
        if(N)s+=`<text x="${f1(ox)}" y="${f1(yy+2)}" class="t-xs">${l}</text>`;else s+=`<text x="${f1(bx-8)}" y="${f1(yy+12)}" class="t-xs t-end">${l}</text>`;
        const by=N?yy+6:yy+2;
        s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(Math.max(1,w))}" height="16" rx="3" style="fill:${col};opacity:.85"/><text x="${f1(bx+w+5)}" y="${f1(by+11)}" class="t-xs" style="fill:var(--ink)">${S.mode==='rr'?'×'+(gv>=10?f1(gv):gv.toFixed(1)):f1(gv)+'%'}</text>`});
      const yb=y0+rows.length*rh+(N?8:6);
      if(S.mode==='rr'){const xb=bx+bw/mx;s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${f1(y0-4)}" y2="${f1(yb-6)}" style="stroke:var(--accent);stroke-dasharray:3 3"/><text x="${f1(xb+3)}" y="${f1(yb+6)}" class="t-xs" style="fill:var(--accent)">×1 = population risk</text>`;
        s+=`<text x="${f1(ox)}" y="${f1(yb+26)}" class="t-xs">Relative risks from Sweden and Denmark, not absolute</text><text x="${f1(ox)}" y="${f1(yb+40)}" class="t-xs">risks. Risk falls with genetic distance.</text>`}
      else s+=N?`<text x="${f1(ox)}" y="${f1(yb+8)}" class="t-xs"><tspan style="fill:var(--brand)">■ twin and family heritability</tspan>  <tspan style="fill:var(--down-fill)">■ measured common SNPs</tspan></text><text x="${f1(ox)}" y="${f1(yb+22)}" class="t-xs"><tspan style="fill:var(--up-fill)">■ shared family environment</tspan></text>`:`<text x="${f1(ox)}" y="${f1(yb+10)}" class="t-xs"><tspan style="fill:var(--brand)">■ twin and family heritability</tspan>  <tspan style="fill:var(--down-fill)">■ measured common SNPs</tspan>  <tspan style="fill:var(--up-fill)">■ shared environment</tspan></text>`;
    }
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const i=phaseOf(GE_STEPS,t),S=GE_STEPS[i],P=GE_STEPS[Math.max(0,i-1)],lp=i===0?1:ramp(t,S.from,S.from+.08);
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    if(N){s+=tree(24,6,S,i?P:S,lp)+legend(20,318,370)+`<line x1="16" x2="384" y1="352" y2="352" class="grid"/>`+panel(20,364,360,S,i,lp,t,1)}
    else{s+=`<text x="16" y="18" class="t-sm" style="fill:var(--brand)">ONE ILLUSTRATIVE FAMILY</text>`+tree(6,28,S,i?P:S,lp)+legend(16,350,330)+`<line x1="356" x2="356" y1="10" y2="390" class="grid"/>`+panel(378,6,330,S,i,lp,t,0)}
    svg.innerHTML=s;setA(i);$('#geNote').innerHTML=noteHTML(S);
  }
  stop=playWire(rg,$('#gePlay'),draw,16000,'Replay','genes');
  const setA=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= GWAS sketch ================= */
  const gs=$('#geGw'),gr=$('#geGwT');const R=rng(1303);
  const TOT=GE_CHR.reduce((a,b)=>a+b,0),CUM=[];GE_CHR.reduce((a,b,i)=>(CUM[i]=a,a+b),0);
  const gpos=(c,p)=>(CUM[c-1]+p*GE_CHR[c-1])/TOT;
  const pickChr=()=>{let u=R()*TOT;for(let c=0;c<22;c++){if(u<GE_CHR[c])return c+1;u-=GE_CHR[c]}return 22};
  const NOISE=[];for(let k=0;k<520;k++){const c=pickChr(),p=R();NOISE.push({x:gpos(c,p),c,v:-Math.log10(Math.max(1e-6,R()))*.95})}
  /* anonymous peaks appear wave by wave so that the drawn total matches 1, 2, 30, 64, then 150 drawn of 298 */
  const named=GE_NAMED.map(n=>Object.assign({x:gpos(n.c,n.p),s:.8,c:n.c},n));
  const tgt=[1,2,30,64,150],ANON=[];
  for(let w=0;w<5;w++){const have=named.filter(n=>n.w<=w).length+ANON.length;for(let k=have;k<tgt[w];k++){const c=pickChr();ANON.push({x:gpos(c,R()),c,s:.25+R()*.75,w})}}
  const GROW=[1.6,2.6,4.2,6,9.5];
  function hAt(pk,wf){/* -log10 P of a peak at continuous wave index wf */
    const at=w=>{if(w<pk.w-1)return 2.2+pk.s*1.2;if(w<pk.w)return(pk.pre&&w>=0?pk.pre:4.6+pk.s*1.8);return 7.6+pk.s*GROW[Math.min(4,w)]*(1+(w-pk.w)*.15)};
    if(pk.g==='ANK3'&&wf<=0)return lerp(3,8.04,clamp(wf+1));
    if(pk.g==='CACNA1C'&&wf<=0)return lerp(3,7.15,clamp(wf+1));
    const a=Math.floor(wf),b=Math.min(4,a+1),f=wf-a;return lerp(at(Math.max(a,0)),at(b),ease(clamp(f)))}
  function drawG(t){
    const N=vb(gs,'720 430','400 640');
    const i=phaseOf(GE_GW,t),S=GE_GW[i],lp=ramp(t,S.from,S.from+.1);
    const wf=i===0?lerp(-1,0,lp):i>=4?4:i-1+lp;
    const L=N?{x0:36,x1:390,yT:24,l1:44,l2:58,p0:76,p1:262,ax:278}:{x0:56,x1:704,yT:16,l1:38,l2:52,p0:70,p1:232,ax:248};
    const Ymax=24,X=u=>lerp(L.x0,L.x1,u),Y=v=>lerp(L.p1,L.p0,clamp(v/Ymax,0,1.02));
    let s=`<text x="${L.x0}" y="${L.yT}" class="t-sm" style="fill:var(--brand)">${N?'GWAS SKETCH · ':'MANHATTAN PLOT SKETCH · '}${S.prs?'2025':S.y} · ${S.cases.toLocaleString('en-US')} CASES</text>`;
    /* chromosome bands */
    for(let c=1;c<=22;c++){const a=X(CUM[c-1]/TOT),b=X((CUM[c-1]+GE_CHR[c-1])/TOT);
      if(c%2)s+=`<rect x="${f1(a)}" y="${L.p0}" width="${f1(b-a)}" height="${L.p1-L.p0}" style="fill:var(--panel-2);opacity:.55"/>`;
      if(N?(c<=12&&c%2||c>12&&c%4===0):(c<=16||c%2))s+=`<text x="${f1((a+b)/2)}" y="${L.ax}" class="t-xs t-mid">${c}</text>`}
    s+=`<text x="${L.x1}" y="${L.ax+14}" class="t-xs t-end">chromosome</text>`;
    [0,5,10,15,20].forEach(v=>{s+=`<text x="${L.x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.x0-24}" y="${f1((L.p0+L.p1)/2)}" class="t-xs t-mid" transform="rotate(-90 ${L.x0-24} ${f1((L.p0+L.p1)/2)})">−log10 P</text>`;
    const nf=i===0?.6+.4*lp:1;
    NOISE.forEach(d=>{s+=`<circle cx="${f1(X(d.x))}" cy="${f1(Y(d.v*nf))}" r="1.3" style="fill:${d.c%2?'var(--muted)':'var(--down-fill)'};opacity:.5"/>`});
    const tower=(pk,col,r0)=>{const h=hAt(pk,wf),x=X(pk.x);let o=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y(1.5))}" y2="${f1(Y(h))}" style="stroke:${col};stroke-width:1.3;opacity:.75"/>`;for(let k=2;k<=4;k++){const v=h*k/5;o+=`<circle cx="${f1(x+(k%2?-1.2:1.2))}" cy="${f1(Y(v))}" r="1.4" style="fill:${col};opacity:.7"/>`}o+=`<circle cx="${f1(x)}" cy="${f1(Y(h))}" r="${r0}" style="fill:${col}"/>`;return {o,h,x}};
    ANON.forEach(pk=>{if(pk.w>Math.ceil(wf)+1)return;s+=tower(pk,'var(--brand)',2).o});
    const lab=[];named.forEach(pk=>{const T=tower(pk,'var(--accent)',2.8);s+=T.o;if(T.h>=7.3)lab.push({g:pk.g,x:T.x,y:Y(T.h)})});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(7.3))}" y2="${f1(Y(7.3))}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${L.x1}" y="${f1(Y(7.3)-4)}" class="t-xs t-end" style="fill:var(--accent);paint-order:stroke;stroke:var(--panel);stroke-width:3px">P = 5 × 10⁻⁸</text>`;
    /* labels in two rows above the plot, spread so they never overlap, with leader lines */
    lab.sort((a,b)=>a.x-b.x);const gap=N?48:60;
    [0,1].forEach(row=>{const R=lab.filter((l,k)=>k%2===row);R.forEach(l=>l.row=row);
      R.forEach((l,k)=>{l.lx=Math.max(l.x,k?R[k-1].lx+gap:L.x0+18)});
      for(let k=R.length-1;k>=0;k--)R[k].lx=Math.min(R[k].lx,k<R.length-1?R[k+1].lx-gap:L.x1-22)});
    lab.forEach(l=>{const ly=l.row?L.l2:L.l1;s+=`<path d="M${f1(l.lx)} ${ly+3}L${f1(l.x)} ${f1(l.y-4)}" style="stroke:var(--accent);stroke-width:.8;opacity:.6;fill:none"/><text x="${f1(l.lx)}" y="${ly}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">${l.g}</text>`});
    /* lower panel */
    const B=N?{y0:304,y1:430,y2:476,y3:600,x0:20,x1:390}:{y0:300,y1:410,x0:30,xm:380,x1:704};
    if(!S.prs){
      const bars=(x0,x1,yT,yB,title,data,mx,fmt)=>{let o=`<text x="${x0}" y="${yT}" class="t-sm">${title}</text>`;const bw=(x1-x0)/data.length;
        data.forEach((d,k)=>{const on=k<=wf+.001,g=k<=Math.floor(wf)?1:k===Math.ceil(wf)?ease(clamp(wf-k+1)):0,v=d.v==null?0:d.v*g,h=(yB-yT-34)*v/mx,x=x0+k*bw+bw*.18,w=bw*.64;
          o+=`<rect x="${f1(x)}" y="${f1(yB-h)}" width="${f1(w)}" height="${f1(Math.max(h,on&&d.v?1:0))}" rx="3" style="fill:${k===i&&!S.prs?'var(--brand)':'var(--brand-soft)'};stroke:var(--brand);stroke-width:1"/>`;
          o+=`<text x="${f1(x+w/2)}" y="${yB+13}" class="t-xs t-mid">${d.y}</text>`;
          if(g>0)o+=`<text x="${f1(x+w/2)}" y="${f1(yB-h-4)}" class="t-xs t-mid" style="fill:var(--ink)">${d.v==null?'n/r':fmt(v)}</text>`});
        return o+`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/>`};
      const cd=GE_GW.slice(0,5).map(d=>({y:d.y,v:d.cases})),ld=GE_GW.slice(0,5).map(d=>({y:d.y,v:d.loci}));
      const fk=v=>v>=1000?Math.round(v/1000)+'k':Math.round(v);
      if(N)s+=bars(B.x0,B.x1,B.y0,B.y1,'CASES',cd,160000,fk)+bars(B.x0,B.x1,B.y2,B.y3,'GENOME-WIDE LOCI',ld,300,v=>Math.round(v));
      else s+=bars(B.x0,B.xm-20,B.y0,B.y1,'CASES',cd,160000,fk)+bars(B.xm+20,B.x1,B.y0,B.y1,'GENOME-WIDE LOCI (n/r: not reported)',ld,300,v=>Math.round(v));
    } else {
      /* two overlapping score curves, drawn so that AUC is about 0.70 (separation d = 0.74 SD) */
      const d=.74*ease(lp),x0=B.x0+10,x1=B.x1-10,yB=N?560:404,hh=N?190:96,Xs=z=>lerp(x0,x1,(z+3.4)/7.6);
      const pdf=z=>Math.exp(-z*z/2);
      const curve=(m,col,lbl,lx)=>{let p='';for(let k=0;k<=120;k++){const z=-3.4+7.6*k/120;p+=(k?'L':'M')+f1(Xs(z))+' '+f1(yB-hh*pdf(z-m))}
        return `<path d="${p}L${f1(x1)} ${yB}L${f1(x0)} ${yB}Z" style="fill:${col};opacity:.22"/><path d="${p}" style="fill:none;stroke:${col};stroke-width:2.2"/>`};
      s+=`<text x="${B.x0}" y="${N?B.y0:B.y0}" class="t-sm">${N?'POLYGENIC SCORES OVERLAP':'POLYGENIC SCORES IN TWO GROUPS OVERLAP'}</text>`;
      s+=curve(-d/2,'var(--muted)')+curve(d/2,'var(--accent)');
      s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+14}" class="t-xs t-end">polygenic score →</text>`;
      s+=`<text x="${f1(Xs(-d/2-1.3))}" y="${f1(yB-hh*.72)}" class="t-xs t-end" style="fill:var(--muted)">without</text><text x="${f1(Xs(d/2+1.3))}" y="${f1(yB-hh*.72)}" class="t-xs" style="fill:var(--accent)">with bipolar disorder</text>`;
      const ty=N?B.y0+22:B.y0+18,au=(.5+.2*ease(lp)).toFixed(2),pc=Math.round(50+20*ease(lp));
      const LN=N?[`AUC ≈ ${au}: pick one person with and one without`,`bipolar disorder at random; the one with it has`,`the higher score about ${pc}% of the time (a coin toss: 50%).`]
               :[`AUC ≈ ${au}: pick one person with and one without bipolar disorder at random; the one with it has the higher`,`score about ${pc}% of the time (a coin toss: 50%). Curves drawn to give AUC ≈ 0.70, as in the 2025 GWAS.`];
      LN.forEach((l,k)=>{s+=`<text x="${B.x0}" y="${ty+k*13}" class="t-xs">${l}</text>`});
    }
    gs.innerHTML=s;setG(i);$('#geGwNote').innerHTML=noteHTML(S);
  }
  const stopG=playWire(gr,$('#geGwPlay'),drawG,15000,'Replay','genes');
  const setG=stepWire($('#geGwSteps'),GE_GW,gr,drawG,stopG);
  drawG(+gr.value);

  /* ================= liability threshold board ================= */
  const lb=$('#geLb'),on={};let shift=0,stopL=null;
  const target=()=>Object.keys(on).filter(k=>on[k]).reduce((a,k)=>a+GE_FX[k].d,0);
  function info(){$('#geLbInfo').innerHTML=`<div class="kicker">Factors switched on: ${Object.values(on).filter(Boolean).length} of 5</div><h4>What each factor adds</h4>`+
    Object.keys(GE_FX).map(k=>{const F=GE_FX[k];return `<div class="fx${on[k]?'':' off'}"><b>${F.n} ${GE_EVL[F.ev]}</b>${F.txt}</div>`}).join('')+
    `<div class="pt"><b>%t:note.plain%</b>None of these makes bipolar disorder certain, and avoiding them does not rule it out. Some, like sleep and substance use, are things a person can work on with support.</div>`}
  function drawL(){
    const N=vb(lb,'720 300','400 380');
    const x0=N?18:40,x1=N?386:690,yB=N?300:250,hh=N?170:160,zl=-3.6,zr=4.6,X=z=>lerp(x0,x1,(z-zl)/(zr-zl)),thr=2.1;
    const pdf=z=>Math.exp(-z*z/2);let s='';
    const curve=(m,ghost)=>{let p='';for(let k=0;k<=140;k++){const z=zl+(zr-zl)*k/140;p+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-m))}return p};
    s+=`<path d="${curve(0)}" style="fill:none;stroke:var(--muted);stroke-width:1.3;stroke-dasharray:4 4;opacity:${shift>.01?.8:0}"/>`;
    const main=curve(shift);s+=`<path d="${main}L${f1(x1)} ${yB}L${f1(x0)} ${yB}Z" style="fill:var(--brand-soft);opacity:.7"/>`;
    let tail='';for(let k=0;k<=60;k++){const z=thr+(zr-thr)*k/60;tail+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-shift))}
    s+=`<path d="${tail}L${f1(X(zr))} ${yB}L${f1(X(thr))} ${yB}Z" style="fill:var(--accent);opacity:.45"/>`;
    s+=`<path d="${main}" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
    s+=`<line x1="${f1(X(thr))}" x2="${f1(X(thr))}" y1="${f1(yB-hh-20)}" y2="${yB}" style="stroke:var(--accent);stroke-width:2"/><text x="${f1(X(thr)+5)}" y="${f1(yB-hh-10)}" class="t-xs" style="fill:var(--accent);font-weight:700">threshold</text>`;
    s+=`<text x="${f1(X(thr)+5)}" y="${f1(yB-hh+4)}" class="t-xs" style="fill:var(--accent)">past it: onset or</text><text x="${f1(X(thr)+5)}" y="${f1(yB-hh+16)}" class="t-xs" style="fill:var(--accent)">an episode</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x0}" y="${yB+16}" class="t-xs">lower liability</text><text x="${x1}" y="${yB+16}" class="t-xs t-end">higher liability →</text>`;
    /* stacked arrows for the factors switched on */
    let acc=0,row=0;const ks=Object.keys(GE_FX).filter(k=>on[k]),tot=target()||1,sc=shift/tot;
    ks.forEach(k=>{const F=GE_FX[k],a=X(acc*sc)-X(0)+X(0),b=X((acc+F.d)*sc),y=(N?22:16)+row*13;
      if(b-a>2)s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#geArr)"/><text x="${f1(b+6)}" y="${y+3.5}" class="t-xs" style="fill:var(--ink)">+ ${F.s}</text>`;
      acc+=F.d;row++});
    if(!ks.length)s+=`<text x="${f1(X(0))}" y="${N?30:28}" class="t-xs t-mid">Switch a factor on to see the curve move</text>`;
    s+=`<text x="${f1(X(0))}" y="${f1(yB-hh-6)}" class="t-xs t-mid">${shift>.01?'shifted population':'population'}</text>`;
    lb.innerHTML=`<defs>${marker('geArr','var(--accent)')}</defs>`+s;
  }
  function go(){const to=target(),fr=shift;if(stopL)stopL();stopL=animate(500,p=>{shift=lerp(fr,to,ease(p));drawL()},()=>{stopL=null})}
  $$('[data-gef]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.gef;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);info();go()}));
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawL()};
  info();drawL();
};
