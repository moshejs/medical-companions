/* =============== 2.1 Genes & heritability =============== */
const GE_STEPS=[
 {from:0,at:.12,k:'Panel 1 · twins',t:'Twins who share all or half their genes',
  txt:`Identical (monozygotic, MZ) twins share essentially all their DNA; non-identical (dizygotic, DZ) twins share about half, like other siblings. In a California study of 192 twin pairs, if one male twin was autistic the other was too in 77% of MZ pairs (95% CI 65–86%) against 31% of DZ pairs (16–46%); in female twins the figures were 50% and 36%. A meta-analysis of twin studies found an MZ correlation of 0.98 (0.96–0.99) against 0.53 (0.44–0.60) for DZ twins at an assumed 5% prevalence. The first twin study of autism, in 1977, examined 21 pairs. [[Hallmayer2011,Tick2016,Folstein1977]]`,
  pt:`When one identical twin is autistic, the other usually is too. For non-identical twins it happens much less often. That gap points to genes.`,
  hook:`MZ concordance much higher than DZ = genetic influence. Twin meta-analysis: MZ correlation 0.98, heritability 64–91%. [[Tick2016]]`},
 {from:.17,at:.3,k:'Panel 1 · heritability',t:'Heritability: about 80%',
  txt:`<span class="ev est">Established</span> Twin and family studies converge on a high heritability. A Swedish reanalysis gave 0.83 (95% CI 0.79–0.87) with nonshared environment 0.17; a five-country cohort of 2,001,631 people gave a median of 80.8% (73.2–85.5%), ranging from 50.9% in Finland to 86.8% in Israel. The 2014 Swedish analysis of the same data had given 0.50; the 2017 letter attributes the gap to how time-to-event data were modelled. The California study is the main outlier at 38% (14–67%); a UK population twin sample gave 56–95%. Autism has a strong genetic component, and other causes contribute too. [[Sandin2017,Bai2019,Sandin2014,Hallmayer2011,Colvert2015,Lord2018]]`,
  pt:`About 80% of the differences in autism between people in a population line up with genetic differences. That is a statement about groups, not about one person.`,
  hook:`Heritability ≠ inheritance. 80% heritability does not mean 80% of one person's autism is genetic, nor that a parent "passed it on". [[Sandin2017,Bai2019]]`},
 {from:.33,at:.44,k:'Panel 2 · common variants',t:'Many common variants, each tiny',
  txt:`Most genetic risk sits in common variants that many people carry, each with a tiny effect. In a Swedish sample, narrow-sense heritability was about 52.4%, mostly from common variation, while rare de novo mutations explained 2.6% of the variance in liability. The largest GWAS of its time (18,381 autistic people, 27,969 controls) found five genome-wide significant loci; common variants measured on the chip explained 11.8% of liability (SNP heritability). Autism's genetic correlation was 0.41 with major depression, 0.21 with schizophrenia and 0.20 with educational attainment. [[Gaugler2014,Grove2019]]`,
  pt:`Thousands of ordinary DNA differences, each almost harmless alone, can add up. Everyone carries some of them.`,
  hook:`Polygenic: most heritable liability in common variants; SNP heritability 11.8% (Grove 2019). [[Grove2019,Gaugler2014]]`},
 {from:.5,at:.62,k:'Panel 2 · rare variants',t:'Rare de novo variants, each large',
  txt:`A de novo variant is new in the child: it is not found in either parent's blood DNA. Exome studies keep finding more genes where such variants raise the chance of autism: 65 genes within 71 risk loci in 2015, 102 genes in 35,584 samples in 2020, and in 2022, 72 genes at a strict false-discovery threshold (185 at a looser one) in 63,237 people. De novo protein-truncating variants made up 57.5% of the association evidence, damaging missense variants 21.1% and copy-number variants 8.44%. Including CNVs, coding de novo mutations contribute to about 30% of diagnoses in simplex families and 45% in girls. [[Sanders2015Neuron,Satterstrom2020,Fu2022,Iossifov2014]]`,
  pt:`Sometimes one new change in a single important gene plays a big part. It usually happens by chance, and nobody caused it.`,
  hook:`Satterstrom 2020: 102 risk genes. Fu 2022: 72 genes at FDR ≤0.001. Most act in gene-expression regulation or neuronal communication. [[Satterstrom2020,Fu2022]]`},
 {from:.67,at:.78,k:'Panel 2 · CNVs and syndromes',t:'Missing or extra DNA, and syndromes',
  txt:`Copy-number variants delete or duplicate a stretch of DNA. A de novo 593-kb deletion at 16p11.2, and its reciprocal duplication, together appear to account for about 1% of autism. Penetrance is incomplete: across recurrent CNVs, estimates for an abnormal phenotype range from 10.4% (15q11.2 deletion) to 62.4% (distal 16p11.2 deletion), so many carriers are unaffected or mildly affected. In every genetic syndrome studied, autism features were more common than in the general population: 61% of girls with Rett syndrome, 36% with tuberous sclerosis, 34% with Angelman syndrome, 30% of males with fragile X. [[Weiss2008NEJM,Rosenfeld2013,Richards2015]]`,
  pt:`Some children have a small missing or extra piece of a chromosome, or a known genetic condition, that makes autism more likely. Many people with the same change are not autistic.`,
  hook:`16p11.2 deletion/duplication ≈1% of autism. Rett (MECP2, X-linked) shows autism features in about 61%. [[Weiss2008NEJM,Amir1999,Richards2015]]`},
 {from:.83,at:.97,k:'Panel 3 · one family',t:'Three generations, three patterns',
  txt:``,pt:``,hook:``}
];
const GE_FAM={
 poly:{n:'Polygenic',col:'var(--neuro)',
  txt:`In most families autism reflects many common variants, sometimes plus a rare variant of larger effect, and environmental contributions. Relatives share more or fewer of these variants, so autism can appear in an uncle and a grandson without a simple pattern. The bars under each symbol sketch a liability threshold model: autism appears when combined load passes a threshold. In large family samples, rare-variant and polygenic loads were higher in autistic girls than boys, and mothers of autistic children carried slightly more polygenic risk than fathers (0.08 SD), consistent with a higher threshold for girls. <span class="ev early">Early evidence</span> [[Satterstrom2020,Antaki2022,Wigdor2022]]`,
  pt:`Each person carries a different mix of small genetic differences. When enough add up, autism becomes more likely. The bars are a picture of that idea, not a measurement.`,
  hook:`Liability threshold: a higher threshold in girls would explain why siblings of autistic girls are more often autistic (female protective effect). [[Robinson2013,Ozonoff2024]]`},
 denovo:{n:'De novo',col:'var(--gold)',
  txt:`Here the variant is new in the child: neither parent carries it in their blood DNA, and grandparents, uncle and siblings are clear. De novo mutations explain only 2.6% of the population variance in liability but "contribute substantially to individual liability". Parental age effects reflect several mechanisms, including de novo mutations that accumulate in the father's germline. About one-third of apparently new variants also occur as ordinary variation in population adults, which is why laboratories check population reference data before calling a variant causal. <span class="ev early">Early evidence</span> for the parental-age mechanisms. [[Gaugler2014,Antaki2022,Kosmicki2017]]`,
  pt:`The change happened for the first time in this child. The parents did not pass it on and could not have prevented it.`,
  hook:`De novo = absent in both parents. Large effect for the individual, small share of population variance (2.6%). [[Gaugler2014]]`},
 x:{n:'X-linked: fragile X',col:'var(--accent)',
  txt:`Fragile X syndrome is the leading inherited cause of intellectual disability and autism: more than 200 CGG repeats in FMR1 silence the gene, and its protein FMRP is lost. FMR1 lies on the X chromosome at Xq27.3, identified in 1991. In line with X-linkage, autism is more common in males with fragile X than in females: about half of males and nearly 20% of females met DSM-5 criteria in a US registry, and a meta-analysis put the figure for females at 14% (95% CI 13–18%). Here it passes through the mother's side: half-shaded symbols are carriers, a standard pedigree convention. [[Hagerman2017,Verkerk1991,Kaufmann2017,Marlborough2021]]`,
  pt:`The change sits on the X chromosome and passes through the mother's side of the family. Boys are more often strongly affected than girls.`,
  hook:`Fragile X: >200 CGG repeats in FMR1 (Xq27.3). ASD in about half of males and 14–20% of females with fragile X. [[Hagerman2017,Kaufmann2017,Marlborough2021]]`}
};
/* pedigree layout (panel C local coords) and status per scenario: [sex, gen, x, aff by scenario, liability load] */
const GE_PED=[
 {id:'gf',s:'m',g:0,x:62,a:{poly:0,denovo:0,x:0},l:.42},
 {id:'gm',s:'f',g:0,x:132,a:{poly:0,denovo:0,x:.5},l:.55},
 {id:'un',s:'m',g:1,x:36,a:{poly:1,denovo:0,x:1},l:.78},
 {id:'mo',s:'f',g:1,x:106,a:{poly:0,denovo:0,x:.5},l:.66},
 {id:'fa',s:'m',g:1,x:170,a:{poly:0,denovo:0,x:0},l:.5},
 {id:'p',s:'m',g:2,x:104,a:{poly:1,denovo:1,x:1},l:.82,pro:1},
 {id:'da',s:'f',g:2,x:138,a:{poly:0,denovo:0,x:.5},l:.72},
 {id:'so',s:'m',g:2,x:172,a:{poly:0,denovo:0,x:0},l:.4}
];
const GE_GY=[64,138,214];

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let scen='poly',setSt=()=>{};
  const W={A:220,B:262,C:206},H=346;
  const txt=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const frame=(w,title,on)=>`<rect x="0" y="0" width="${w}" height="${H}" rx="12" style="fill:var(--panel);stroke:${on?'var(--neuro)':'var(--line)'};stroke-width:${on?2:1}"/>`+txt(12,20,title,'t-sm',`fill:${on?'var(--neuro)':'var(--muted)'};font-weight:700;letter-spacing:.06em`);

  /* ---- panel A: twins and heritability ---- */
  function pA(p){let s='';
    const g=ease(ramp(p,.04,.42));
    const pair=(x,l1,l2,same)=>{s+=person(x,28,22,'var(--neuro)')+person(x+18,28,22,same?'var(--neuro)':'var(--neuro)',{op:same?1:.55})+txt(x+20,62,l1,'t-xs t-mid','fill:var(--ink)')+txt(x+20,73,l2,'t-xs t-mid')};
    pair(34,'identical','MZ: all genes',1);pair(136,'non-identical','DZ: about half',0);
    const y0=170,hmax=78;
    s+=`<line x1="10" x2="${W.A-10}" y1="${y0}" y2="${y0}" class="axis"/>`;
    [[22,.77,'var(--neuro)'],[54,.50,'var(--gold)'],[124,.31,'var(--neuro)'],[156,.36,'var(--gold)']].forEach(([x,v,c])=>{const h=hmax*v*g;
      s+=`<rect x="${x}" y="${f1(y0-h)}" width="24" height="${f1(h)}" rx="3" style="fill:${c};opacity:.85"/>`;
      if(g>.05)s+=txt(x+12,y0-h-4,Math.round(v*100*g)+'%','t-xs t-mid','fill:var(--ink);font-weight:600')});
    s+=txt(50,y0+12,'MZ','t-xs t-mid','fill:var(--ink);font-weight:600')+txt(152,y0+12,'DZ','t-xs t-mid','fill:var(--ink);font-weight:600');
    s+=txt(12,y0+25,'co-twin also autistic','t-xs')+txt(12,y0+37,'■ boys','t-xs','fill:var(--neuro)')+txt(62,y0+37,'■ girls','t-xs','fill:var(--gold)');
    /* heritability rows */
    const k=ramp(p,.5,1),X=v=>lerp(88,W.A-12,v/100),ax=310;
    s+=txt(12,226,'HERITABILITY ESTIMATES','t-xs','fill:var(--ink);font-weight:600;letter-spacing:.05em');
    const R=[['Hallmayer 11',38,14,67],['Sandin 14',50,45,56],['Tick 16',null,64,91],['Bai 19',80.8,73.2,85.5],['Sandin 17',83,79,87]];
    s+=`<line x1="${f1(X(80))}" x2="${f1(X(80))}" y1="232" y2="${ax}" style="stroke:var(--neuro);stroke-dasharray:3 3;opacity:${f1(ramp(k,.75,1))}"/>`;
    R.forEach(([n,v,lo,hi],i)=>{const kk=ease(ramp(k,i*.14,i*.14+.22)),y=lerp(232,240+i*15,kk);if(kk<=0){s+=txt(12,240+i*15+3,n,'t-xs','opacity:.4');return}
      s+=txt(12,240+i*15+3,n,'t-xs','fill:var(--ink)');
      s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--neuro);stroke-width:${v==null?6:2};opacity:${v==null?.45:.8};stroke-linecap:round"/>`;
      if(v!=null)s+=`<circle cx="${f1(X(v))}" cy="${f1(y)}" r="4" style="fill:${i===0?'var(--gold)':'var(--neuro)'}"/>`});
    s+=`<line x1="88" x2="${W.A-12}" y1="${ax}" y2="${ax}" class="axis" style="stroke:var(--muted)"/>`;
    [0,50,100].forEach(v=>s+=txt(X(v),ax+12,v+'%','t-xs '+(v===100?'t-end':'t-mid')));
    if(k>.8)s+=txt(W.A/2,ax+30,'heritability ≈ 80%','t-sm t-mid',`fill:var(--neuro);font-weight:700;opacity:${f1(ramp(k,.8,.95))}`);
    return s}

  /* ---- panel B: genetic architecture, three scenes ---- */
  const DOTS=(()=>{const r=rng(41),a=[];for(let i=0;i<70;i++)a.push({c:Math.floor(r()*6),u:.08+r()*.84,d:r()});return a})();
  function sceneCommon(q){let s=txt(12,38,'Common variants: many, each tiny','t-xs','fill:var(--ink)');
    for(let i=0;i<6;i++)s+=chrom(32+i*40,50,112,{w:14,seed:7+i,cen:[.38,.45,.3,.42,.35,.48][i]});
    DOTS.forEach((d,i)=>{const kk=ramp(q,d.d*.6,d.d*.6+.25);if(kk<=0)return;const x=32+d.c*40+(i%3-1)*3,y=lerp(40,50+112*d.u,ease(kk));
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.7" style="fill:var(--neuro);opacity:${f1(.35+.4*kk)}"/>`});
    const hits=[[0,.22],[1,.7],[2,.55],[4,.3],[5,.8]],hk=ramp(q,.6,.8);
    if(hk>0)hits.forEach(([c,u])=>{s+=`<circle cx="${32+c*40}" cy="${f1(50+112*u)}" r="${f1(5*hk)}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`});
    if(hk>0)s+=txt(12,180,'○ 5 genome-wide significant loci (GWAS, 2019)','t-xs','fill:var(--ink)');
    /* liability bar */
    const b=ease(ramp(q,.3,.85)),x0=12,bw=W.B-24,y=204;
    s+=txt(12,198,'Variance in liability (Sweden)','t-xs','fill:var(--ink);font-weight:600');
    s+=`<rect x="${x0}" y="${y}" width="${bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${x0}" y="${y}" width="${f1(bw*.524*b)}" height="16" rx="4" style="fill:var(--neuro);opacity:.85"/>`;
    s+=`<rect x="${f1(x0+bw*.524*b)}" y="${y}" width="${f1(bw*.026*b)}" height="16" style="fill:var(--gold)"/>`;
    s+=txt(x0,y+30,'■ heritable, mostly common: 52.4%','t-xs','fill:var(--neuro)')+txt(x0,y+43,'■ rare de novo: 2.6%','t-xs','fill:var(--gold)')+txt(x0,y+56,'□ other and unexplained','t-xs');
    const k2=ramp(q,.7,1);
    s+=txt(12,286,'SNP heritability on the chip: 11.8%','t-xs',`fill:var(--ink);opacity:${f1(k2)}`);
    s+=txt(12,300,'genetic correlation: depression 0.41,','t-xs',`opacity:${f1(k2)}`)+txt(12,313,'schizophrenia 0.21, education 0.20','t-xs',`opacity:${f1(k2)}`);
    return s}
  function sceneRare(q){let s=txt(12,38,'Rare, often de novo: few, each large','t-xs','fill:var(--ink)');
    const C=[{x:12,n:65,y:'2015',l:'65 genes'},{x:96,n:102,y:'2020',l:'102 genes'},{x:180,n:72,m:185,y:'2022',l:'72 · 185'}];
    C.forEach((c,ci)=>{const kk=ramp(q,ci*.22,ci*.22+.32),shown=Math.round(c.n*kk),sm=c.m?Math.round(c.m*ramp(q,.6,.85)):0;
      s+=txt(c.x+35,58,c.y,'t-sm t-mid','fill:var(--ink);font-weight:700');
      const tot=Math.max(shown,sm);for(let i=0;i<tot;i++){const cx=c.x+3.5+(i%10)*7,cy=68+Math.floor(i/10)*6.6;
        s+=i<shown?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--neuro)"/>`:`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.2" style="fill:none;stroke:var(--neuro);stroke-width:.9"/>`}
      s+=txt(c.x+35,206,kk>0?c.l:'','t-xs t-mid','fill:var(--ink)')});
    s+=txt(12,220,'● strict threshold  ○ looser (2022)','t-xs');
    const b=ease(ramp(q,.5,.9)),x0=12,bw=W.B-24,y=246,P=[[.575,'var(--neuro)'],[.211,'var(--gold)'],[.0844,'var(--accent)']];
    s+=txt(12,240,'Share of association evidence (2022)','t-xs','fill:var(--ink);font-weight:600');
    s+=`<rect x="${x0}" y="${y}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/>`;let xx=x0;
    P.forEach(([v,c])=>{s+=`<rect x="${f1(xx)}" y="${y}" width="${f1(bw*v*b)}" height="14" style="fill:${c};opacity:.85"/>`;xx+=bw*v*b});
    s+=txt(x0,y+27,'■ de novo truncating 57.5%','t-xs','fill:var(--neuro)')+txt(x0,y+40,'■ damaging missense 21.1%','t-xs','fill:var(--gold)')+txt(x0,y+53,'■ copy-number variants 8.44%','t-xs','fill:var(--accent)');
    s+=txt(12,322,'high-penetrance genes, e.g. CHD8,','t-xs',`fill:var(--ink);opacity:${f1(ramp(q,.8,1))}`)+txt(12,335,'SCN2A, ADNP, FOXP1, SHANK3','t-xs',`fill:var(--ink);opacity:${f1(ramp(q,.8,1))}`);
    return s}
  function sceneCNV(q){let s=txt(12,38,'Copy-number variants and syndromes','t-xs','fill:var(--ink)');
    const k=ramp(q,.05,.35);
    s+=chrom(34,52,118,{w:18,cen:.45,seed:16})+`<g style="opacity:${f1(k)}">${chrom(34,52,118,{w:18,cen:.45,seed:16,seg:[.25,.33],kind:'del',label:'deletion'})}</g>`;
    s+=chrom(140,52,118,{w:18,cen:.45,seed:16})+`<g style="opacity:${f1(k)}">${chrom(140,52,118,{w:18,cen:.45,seed:16,seg:[.25,.33],kind:'dup',label:'duplication'})}</g>`;
    s+=txt(34,184,'chr 16','t-xs t-mid')+txt(140,184,'chr 16','t-xs t-mid');
    s+=txt(12,198,'16p11.2 (593 kb): deletion + dup.','t-xs',`fill:var(--ink);opacity:${f1(ramp(q,.2,.4))}`)+txt(12,210,'≈ 1% of autism; penetrance','t-xs',`fill:var(--ink);opacity:${f1(ramp(q,.2,.4))}`);
    s+=txt(12,222,'10.4–62.4% across CNVs','t-xs',`opacity:${f1(ramp(q,.25,.45))}`);
    const S=[['Rett (girls)',61],['Tuberous scl.',36],['Angelman',34],['Fragile X (m)',30],['22q11.2 del',11]];
    s+=txt(12,240,'Autistic features in each syndrome','t-xs','fill:var(--ink);font-weight:600');
    S.forEach(([n,v],i)=>{const kk=ease(ramp(q,.4+i*.09,.6+i*.09)),y=248+i*17,bx=100,bw=(W.B-140)*v/100*kk;
      s+=txt(12,y+9,n,'t-xs','fill:var(--ink)')+`<rect x="${bx}" y="${y}" width="${f1(W.B-140)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y}" width="${f1(bw)}" height="11" rx="3" style="fill:var(--neuro);opacity:.85"/>`;
      if(kk>.05)s+=txt(bx+bw+5,y+9,Math.round(v*kk)+'%','t-xs','fill:var(--ink)')});
    return s}
  function pB(t,ph){const sc=ph<=2?2:ph>=4?4:3,q=sc===2?ramp(t,.33,.48):sc===3?ramp(t,.5,.65):ramp(t,.67,.82);
    return sc===2?sceneCommon(q):sc===3?sceneRare(q):sceneCNV(q)}

  /* ---- panel C: pedigree ---- */
  function pC(p){const F=GE_FAM[scen];let s=txt(12,38,F.n,'t-xs',`fill:${F.col};font-weight:700`);
    ['I','II','III'].forEach((r,i)=>s+=txt(10,GE_GY[i]+4,r,'t-xs','font-weight:700'));
    const show=g=>ramp(p,.06+g*.26,.2+g*.26);
    /* lines */
    const ln=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--ink);stroke-width:1.3"/>`;
    s+=ln(73,GE_GY[0],121,GE_GY[0])+ln(97,GE_GY[0],97,100)+ln(36,100,106,100)+ln(36,100,36,GE_GY[1]-11)+ln(106,100,106,GE_GY[1]-11);
    s+=ln(117,GE_GY[1],159,GE_GY[1])+ln(138,GE_GY[1],138,176)+ln(104,176,172,176);
    [104,138,172].forEach(x=>s+=ln(x,176,x,GE_GY[2]-11));
    GE_PED.forEach(P=>{const k=show(P.g),y=GE_GY[P.g],aff=k>.5?P.a[scen]:0;
      s+=ped(P.x,y,P.s,aff,{r:11,proband:P.pro});
      if(scen==='poly'&&k>0){const bw=26,bx=P.x-13,by=y+16,th=P.s==='f'?.8:.7;
        s+=`<rect x="${bx}" y="${by}" width="${bw}" height="4" rx="2" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*P.l*ease(k))}" height="4" rx="2" style="fill:var(--neuro);opacity:.7"/><line x1="${f1(bx+bw*th)}" x2="${f1(bx+bw*th)}" y1="${by-2}" y2="${by+6}" style="stroke:var(--ink);stroke-width:1.2"/>`}
      if(scen==='denovo'&&P.id==='p'&&k>.5)s+=`<circle cx="${P.x+12}" cy="${y-12}" r="5" style="fill:var(--gold);stroke:var(--ink);stroke-width:1"/>`+txt(P.x+20,y-22,'new','t-xs','fill:var(--ink)')});
    if(scen==='poly')s+=txt(196,246,'bar = load · | = threshold','t-xs t-end');
    /* chromosome strip */
    const kc=ramp(p,.75,.95),cy=256;
    if(scen==='poly'){for(let i=0;i<4;i++)s+=chrom(30+i*24,cy,62,{w:11,seed:3+i,cen:.4});
      const r=rng(9);for(let i=0;i<22;i++){const c=Math.floor(r()*4),u=.1+r()*.8;if(r()<kc)s+=`<circle cx="${30+c*24}" cy="${f1(cy+62*u)}" r="1.8" style="fill:var(--neuro)"/>`}
      s+=txt(126,cy+20,'many','t-xs','fill:var(--ink)')+txt(126,cy+33,'small','t-xs','fill:var(--ink)')+txt(126,cy+46,'variants','t-xs','fill:var(--ink)')}
    else if(scen==='denovo'){s+=chrom(46,cy,60,{w:13,seed:21,cen:.35})+`<g style="opacity:${f1(kc)}">${chrom(46,cy,60,{w:13,seed:21,cen:.35,seg:[.62,.66],kind:'var',label:'one new variant'})}</g>`;
      s+=txt(66,cy+56,'in the child only','t-xs','fill:var(--ink)')}
    else{s+=chrom(46,cy,60,{w:14,seed:23,cen:.38})+`<g style="opacity:${f1(kc)}">${chrom(46,cy,60,{w:14,seed:23,cen:.38,seg:[.8,.86],kind:'var',label:'FMR1 · Xq27.3'})}</g>`;
      s+=txt(66,cy+10,'X chromosome','t-xs','fill:var(--ink)');
      s+=txt(66,cy+24,'>200 CGG repeats','t-xs',`opacity:${f1(kc)}`)+txt(66,cy+36,'silence the gene','t-xs',`opacity:${f1(kc)}`)}
    s+=`<g transform="translate(14 ${H-14})">${ped(5,-4,'m',1,{r:5})}${txt(14,0,'autistic','t-xs')}${ped(80,-4,'m',.5,{r:5})}${txt(89,0,'carrier','t-xs')}${ped(148,-4,'m',0,{r:5})}${txt(157,0,'not','t-xs')}</g>`;
    return s}

  function draw(t){const N=NARROW(),ph=phaseOf(GE_STEPS,t),act=ph<=1?'A':ph<=4?'B':'C';
    const pa=ramp(t,0,.33),pc=ramp(t,.83,.98);
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    const body={A:()=>pA(pa),B:()=>pB(t,ph),C:()=>pC(pc)},ttl={A:'1 · TWINS',B:'2 · GENETIC ARCHITECTURE',C:'3 · A FAMILY'};
    if(!N){vb(svg,'720 470','400 600');
      const a=1.3,x0=4+W[act]*a+16;s+=`<g transform="translate(4 8) scale(${a})">${frame(W[act],ttl[act],true)}${body[act]()}</g>`;
      let y=8;['A','B','C'].filter(k=>k!==act).forEach(k=>{const tb=Math.min((716-x0)/W[k],.64),h=H*tb;
        s+=`<g class="clk" data-gepanel="${k}" transform="translate(${f1(x0)} ${f1(y)}) scale(${f1(tb*100)/100})"><g style="opacity:.6">${frame(W[k],ttl[k],false)}${body[k]()}</g><rect width="${W[k]}" height="${H}" style="fill:transparent"/></g>`;y+=h+10});
    }else{const w=W[act],sc=Math.min(380/w,1.6),h=Math.round(52+H*sc+8);vb(svg,'720 380','400 '+h);
      ['A','B','C'].forEach((k,i)=>{const on=k===act,tx=6+i*130;s+=`<rect x="${tx}" y="4" width="124" height="34" rx="9" style="fill:${on?'var(--neuro-soft)':'var(--panel)'};stroke:${on?'var(--neuro)':'var(--line)'};stroke-width:${on?2:1}"/>`+txt(tx+62,26,['1 Twins','2 DNA','3 Family'][i],'t-sm t-mid',`fill:${on?'var(--neuro)':'var(--muted)'};font-weight:700`)});
      s+=`<g transform="translate(${f1((400-w*sc)/2)} 50) scale(${f1(sc*100)/100})">${frame(w,ttl[act],true)}${body[act]()}</g>`}
    svg.innerHTML=s;setSt(ph);
    const P=ph===5?Object.assign({},GE_STEPS[5],GE_FAM[scen],{t:'One family: '+GE_FAM[scen].n.toLowerCase()}):GE_STEPS[ph];
    $('#geNote').innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#gePlay'),draw,30000,'%t:player.replay%','genes');
  setSt=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);
  $$('[data-gesc]').forEach(b=>b.addEventListener('click',()=>{scen=b.dataset.gesc;$$('[data-gesc]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.83){stop();rg.value=.97}draw(+rg.value)}));
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-gepanel]');if(!g)return;stop();rg.value={A:.12,B:.44,C:.97}[g.dataset.gepanel];draw(+rg.value)});
  draw(+rg.value);

  /* ---- sibling recurrence icon array ---- */
  const sv=$('#geSib'),selS=$('#geSibStudy'),selX=$('#geSibSex'),selN=$('#geSibN');let shown=null,stopA=null;
  function est(){const b=selS.value==='2024'?20.2:18.7,sx=selX.value,n=selN.value;
    let v=b*(sx==='m'?1.5:sx==='f'?.5:1)*(n==='2'?2:1);return{b,v:Math.min(v,95),derived:sx!=='any'||n!=='1'}}
  function drawSib(v){const N=vb(sv,'720 250','400 470'),E=est();let s='';
    const gx=N?20:24,gy=N?14:20,cs=N?36:21.5,ps=N?26:17;
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=gx+c*cs+cs/2,y=gy+r*(N?25:21.5);
      const f=clamp(v-i,0,1);s+=person(x,y,ps,f>=.5?'var(--neuro)':'var(--line)')}
    const ox=N?20:270,oy=N?290:30;
    s+=`<text x="${ox}" y="${oy}" class="t-sm" style="fill:var(--ink);font-weight:700">${E.derived?'≈ ':''}${f1(v)} in 100 younger siblings</text>`;
    s+=`<text x="${ox}" y="${oy+16}" class="t-xs">${E.derived?'teaching estimate from the published ratios':'published recurrence by age 3 (Baby Siblings Consortium)'}</text>`;
    /* comparison bars */
    const bars=[['Infant-sibling cohort ('+selS.value+')',E.b,'var(--neuro)'],['US claims: older sibling autistic',6.9,'var(--gold)'],['US claims: older sibling not autistic',0.9,'var(--muted)']];
    const bx=ox,bw=N?360:420;
    bars.forEach(([l,val,c],i)=>{const y=oy+44+i*38;s+=`<text x="${bx}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${bx}" y="${y+6}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1(bw*val/40)}" height="10" rx="3" style="fill:${c}"/><text x="${f1(bx+bw*val/40+6)}" y="${y+15}" class="t-xs" style="fill:var(--ink)">${val}%</text>`});
    s+=`<text x="${bx}" y="${oy+44+3*38}" class="t-xs">bar scale 0–40%</text>`;
    sv.innerHTML=s}
  function out(){const E=est(),sx=selX.value,n=selN.value;
    const why=[];if(sx==='m')why.push('male infants had almost three times the risk of female infants');if(sx==='f')why.push('female infants had about a third of the risk of male infants');if(n==='2')why.push('more than one older autistic sibling roughly doubled the risk again');
    $('#geSibOut').innerHTML=`<div class="kicker">Recurrence by age 3</div><div class="big-num">${E.derived?'≈':''}${Math.round(E.v)}%</div>
      <p>${selS.value==='2011'?'In 664 infants with an older autistic sibling, 18.7% were autistic by 36 months.':'In the 2024 update (1,605 infants, 18 sites), recurrence was 20.2% by age 3, not significantly different from 18.7% in 2011.'} [[Ozonoff2011,Ozonoff2024]]</p>
      ${E.derived?`<p class="geDeriv">How this estimate is made: the study reports that ${why.join(', and that ')}. [[Ozonoff2011]] Assuming equal numbers of boys and girls, ×${sx==='m'?'1.5':sx==='f'?'0.5':'1'} for sex and ×${n==='2'?'2':'1'} for more than one sibling. This is arithmetic for teaching, not a published subgroup figure.</p>`:''}
      <p>The 2024 update also found siblings of autistic <b>girls</b> more likely to be autistic than siblings of autistic boys; race and maternal education also predicted recurrence. [[Ozonoff2024]]</p>
      <div class="pt"><b>%t:note.plain%</b>About 1 in 5 younger siblings is autistic, so about 4 in 5 are not. Families who want a personal estimate can ask for genetic counselling.</div>
      <div class="hook"><b>%t:note.hook%</b>Sibling recurrence ≈ 1 in 5 in prospective cohorts (18.7%, 20.2%); higher if the younger sibling is male, if more than one sibling is autistic, or if the autistic sibling is a girl. [[Ozonoff2011,Ozonoff2024]]</div>`}
  function upd(){const to=est().v,from=shown==null?to:shown;if(stopA)stopA();
    stopA=animate(500,p=>{shown=lerp(from,to,ease(p));drawSib(shown)},()=>{shown=to;stopA=null});out()}
  [selS,selX,selN].forEach(e=>e.addEventListener('change',upd));
  shown=est().v;drawSib(shown);out();
  redraws.genes=(prev=>()=>{prev&&prev();drawSib(shown==null?est().v:shown)})(redraws.genes);
};
