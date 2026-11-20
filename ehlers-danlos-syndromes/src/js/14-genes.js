/* =============== 1.4 Inheritance & genetic testing =============== */
const GE_STEPS={
 ad:[
  {k:'Step 1 · the family',t:'An affected parent',
   txt:`Vascular, classical and hypermobile EDS are autosomal dominant: one changed copy of the gene is enough. [[Byers2025GeneReviews,Malfait2024GeneReviews]] Here the grandfather (I-1) and two of his three children are affected. The father in generation II (II-2) has one changed copy (V) and one usual copy (+); his partner has two usual copies.`,
   pt:`Everyone has two copies of each gene, one from each parent. In a dominant type, one changed copy causes the condition.`,
   hook:`Autosomal dominant: affected people in every generation, males and females alike, passed on by either sex.`},
  {k:'Step 2 · copies',t:'Each parent passes on one copy',
   txt:`Each egg or sperm carries one of the parent's two copies, chosen by chance. The father's sperm carry V or + equally often; all of the mother's eggs carry +.`,
   pt:`It is like a coin toss for each child: heads, the changed copy; tails, the usual one.`},
  {k:'Step 3 · the children',t:'A 50% chance for each child',
   txt:`Two of the four boxes contain V, so each child of an affected parent has a 50% chance of inheriting the variant. [[MalfaitGR-cEDS,Byers2025GeneReviews]] The chance is the same for every pregnancy; press <b>Draw the children again</b> to see how one family can differ from the odds.`,
   pt:`Each child has a 1-in-2 chance, whatever happened with brothers or sisters before.`,
   hook:`Dominant: 50% per child, every pregnancy. [[Malfait2024GeneReviews]]`},
  {k:'Step 4 · a new variant',t:'When neither parent is affected',
   txt:`About 50% of people with vEDS have an affected parent; in the other 50% the variant is new (de novo), arising in the person or coming from an apparently unaffected parent with mosaicism. [[Byers2025GeneReviews]] The same 50:50 split is reported for cEDS. [[Malfait2024GeneReviews]] So a negative family history does not exclude vEDS.`,
   pt:`Sometimes the change happens for the first time in a child. From then on, that person can pass it on.`,
   hook:`About half of vEDS is de novo: no family history does not mean no vEDS. [[Byers2025GeneReviews]]`},
  {k:'Step 5 · testing relatives',t:'Cascade testing',
   txt:`Once the family's variant is known, relatives can be tested for it. For vEDS, first-degree relatives are evaluated clinically and then, even without signs, tested for the familial COL3A1 variant. [[Byers2025GeneReviews]] In a London cohort of 63 people diagnosed with vEDS before 18, 55% were found through family testing. [[Wilkinson2025]] A known variant also makes prenatal and preimplantation testing possible. [[Byers2025GeneReviews,Malfait2024GeneReviews]]`,
   pt:`Finding the exact change in one person lets the family check who else carries it.`,
   hook:`About 60% of people diagnosed with vEDS before 18 are found through a positive family history. [[Byers2025GeneReviews]]`}],
 ar:[
  {k:'Step 1 · the family',t:'Two healthy carriers',
   txt:`Kyphoscoliotic, dermatosparaxis, spondylodysplastic and most rare types are autosomal recessive: a person is affected only with two changed copies. [[VanDijk2024]] Here both parents in generation II carry one changed copy (v), shown half-shaded; nobody in the family has the condition yet.`,
   pt:`A carrier has one changed copy and one working copy. The working copy is enough, so carriers are not affected.`,
   hook:`Autosomal recessive: affected children usually have unaffected carrier parents; the condition can seem to appear from nowhere.`},
  {k:'Step 2 · copies',t:'Each parent passes on one copy',
   txt:`Each parent's eggs or sperm carry either v or + by chance, so a child can receive two, one or no changed copies.`,
   pt:`Both parents toss a coin. A child is affected only if both coins come up with the changed copy.`},
  {k:'Step 3 · the children',t:'25% affected, 50% carriers',
   txt:`When both parents are carriers, each child has a 25% chance of being affected, a 50% chance of being a carrier and a 25% chance of neither. [[RohrbachGR-kEDS,vanDijkGR-clEDS,KoshoGR-mcEDS]] The chances are the same for every pregnancy.`,
   pt:`One in four children affected, two in four carriers like the parents, one in four with two working copies.`,
   hook:`Recessive: 25% affected, 50% carrier, 25% neither, when both parents are carriers. [[RohrbachGR-kEDS]]`},
  {k:'Step 4 · related parents',t:'Carriers in the same family',
   txt:`Two carriers of the same rare variant are more likely to meet when the parents are related. Van Dijk and colleagues note that recessive types may be more common where consanguinity is more frequent, and that recorded numbers for rare types are probably too low. [[VanDijk2024]]`,
   pt:`Cousins can share the same family gene change, so recessive conditions show up more often when relatives have children together.`},
  {k:'Step 5 · testing relatives',t:'Testing brothers, sisters and partners',
   txt:`Once both variants are known, relatives can learn whether they are carriers. For PLOD1-kEDS, a markedly raised ratio of urinary deoxypyridinoline to pyridinoline cross-links can confirm the diagnosis when genetic testing finds only one variant or a variant of uncertain significance. [[RohrbachGR-kEDS]]`,
   pt:`A sibling who is a carrier will not have the condition, but may want to know before having children.`,
   hook:`PLOD1-kEDS: a raised urinary LP/HP ratio can settle a single-variant or VUS result. [[RohrbachGR-kEDS,Giunta2008]]`}],
 h:[
  {k:'Step 1 · the family',t:'A dominant pattern, no known gene',
   txt:`GeneReviews describes hEDS as autosomal dominant with variable expression, and most people with hEDS have an affected parent. [[Hakim2024GeneReviews]] But no genetic, epigenetic or metabolomic cause has been found, so no test can confirm it. [[Hakim2024GeneReviews,Malfait2020]]`,
   pt:`hEDS tends to run in families like a dominant condition, but the gene or genes behind it are not yet known.`,
   hook:`hEDS is the only one of the 13 types without a known gene; diagnosis is clinical. [[Malfait2017,Hakim2024GeneReviews]]`},
  {k:'Step 2 · copies',t:'Copies we cannot name',
   txt:`Because no gene is known, the copies here are marked "?". Van Dijk and colleagues expect most people with hEDS not to have a single-gene cause and suggest it may be multifactorial. <span class="ev hyp">Hypothesis</span> [[VanDijk2024]]`,
   pt:`We cannot follow a single gene through this family, because nobody knows which gene, or genes, to follow.`},
  {k:'Step 3 · the children',t:'Each child: a 50% chance',
   txt:`Under the autosomal dominant description, each child of an affected parent has a 50% chance of inheriting the condition. [[Hakim2024GeneReviews]] How strongly it shows varies, even within one family.`,
   pt:`Children of a parent with hEDS have about a 1-in-2 chance of having it too, but it can be milder or stronger than in the parent.`,
   hook:`Family history is part of the hEDS criteria: Feature B is a first-degree relative who independently meets them. [[Fairweather2025]]`},
  {k:'Step 4 · subtle signs',t:'Variable expression',
   txt:`Recognising that a parent is affected often needs a detailed history and examination, because the parent's signs may be subtle (ringed). [[Hakim2024GeneReviews]] In one clinic, family history was the only predictor of a good outcome after coordinated physiotherapy. [[Aubry-Rozier2021]]`,
   pt:`A parent may never have been diagnosed. Their signs can be mild and easy to miss.`},
  {k:'Step 5 · relatives',t:'Clinical assessment, not a gene test',
   txt:`Without a gene, relatives are assessed clinically, and prenatal or preimplantation genetic testing is not possible. [[Hakim2024GeneReviews]] At one US clinic, 47 of 178 people meeting the 2017 hEDS criteria (26.4%) had an alternative or additional diagnosis found by genetic testing, though referral bias may inflate this. [[Forghani2025]]`,
   pt:`There is no test to check family members for hEDS; doctors examine them instead. A genetics review can still find another condition.`,
   hook:`No prenatal or preimplantation testing for hEDS: no gene to test. [[Hakim2024GeneReviews]]`}]
};
const GE_PATH={
 a:{t:'Signs of vEDS, cEDS or a rare type',test:['Gene panel','(massively parallel','sequencing)'],
  txt:`For every type except hEDS, a definite diagnosis needs the causative variant. [[Malfait2017]] In 177 unrelated people with EDS tested on a 12-gene panel, 28 pathogenic and 4 likely pathogenic variants were found; 7 were new diagnoses that changed the clinical picture, including aortopathy genes (TGFBR1/2, SMAD3). [[Weerakkody2016]] For vEDS, the consensus recommends confirming a COL3A1 variant before applying the diagnosis. [[Byers2017]]`},
 b:{t:'A typical hEDS picture',test:['2017 clinical','criteria','(no gene test)'],
  txt:`hEDS is diagnosed with the 2017 clinical criteria; there is no gene test. [[Hakim2024GeneReviews]] Of 907 people referred to one clinic for suspected hEDS, 178 (19.6%) met the criteria, and 47 of those (26.4%) had an alternative or additional diagnosis found by genetic testing; the authors note referral bias may inflate this. [[Forghani2025]] Features that suggest another condition send the path to a panel (dashed line).`},
 c:{t:'A relative has a known variant',test:['Test for the','family’s variant'],
  txt:`When the family's variant is known, relatives can be tested for that one variant. For vEDS, first-degree relatives are evaluated clinically and tested for the familial COL3A1 variant even without signs. [[Byers2025GeneReviews]] In a London cohort, 55% of people diagnosed with vEDS before 18 were found through family testing. [[Wilkinson2025]]`}
};
const GE_RES={
 p:{t:'Pathogenic or likely pathogenic',txt:`A pathogenic variant confirms the type and opens cascade testing for relatives and, if wanted, prenatal or preimplantation testing. [[Malfait2017,Byers2025GeneReviews,Malfait2024GeneReviews]] In vEDS, confirming the variant and its nature helps families estimate risk. [[Pepin2014]]`,
  pt:`The test found the cause. That answer also helps relatives.`},
 v:{t:'Variant of uncertain significance (VUS)',txt:`A VUS means "we don't know yet", not "this is the cause". In the 177-person panel study there were 22 VUS, 7 in aortopathy genes needing clinical follow-up. [[Weerakkody2016]] Classifications change: COL3A1 glutamic acid-to-lysine variants moved from VUS to pathogenic. [[Ghali2019GenetMed]] For PLOD1-kEDS, a urine cross-link test can help settle a VUS. [[RohrbachGR-kEDS]]`,
  pt:`An uncertain result is not a diagnosis. It may be looked at again as more is learned.`},
 n:{t:'No variant found',txt:`A negative panel argues against the types it covers but cannot test for hEDS, which has no known gene. [[Hakim2024GeneReviews]] Gene choice matters: brittle cornea genes should be on connective-tissue panels [[Dhooge2021]], and exome sequencing helps when features overlap. [[Yang2022]] Clinical assessment stays central. [[VanDijk2024]]`,
  pt:`Nothing was found in the genes tested. That is not the same as proving there is nothing.`},
 h:{t:'A clinical diagnosis',txt:`hEDS is confirmed or not by the 2017 criteria: Criterion 1, Criterion 2 and Criterion 3 must all be met. [[Malfait2017,Fairweather2025]] People with symptomatic hypermobility who do not meet them are diagnosed with hypermobility spectrum disorder. [[Castori2017]] See <a href="#criteria" data-go="criteria">The 2017 hEDS criteria</a>.`,
  pt:`The checklist is for a specialist assessment, not a home test.`}
};

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let mode='ad',seed=3,setSt=()=>{};
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const AL={ad:{f:['V','+'],m:['+','+']},ar:{f:['v','+'],m:['v','+']},h:{f:['?','+'],m:['+','+']}};
  const FAM={ad:{I1:1,I2:0,II1:0,II4:1,II2:1,II3:0},ar:{I1:.5,I2:0,II1:0,II4:.5,II2:.5,II3:.5},h:{I1:1,I2:0,II1:0,II4:1,II2:1,II3:0}};
  const status=(a,b)=>{const n=(a!=='+')+(b!=='+');return mode==='ar'?(n===2?1:n===1?.5:0):(n>=1?1:0)};
  function kids(){const r=rng(seed*97+(mode==='ar'?5:mode==='h'?9:1)),A=AL[mode];
    return [0,1,2,3].map(i=>{const a=A.f[r()<.5?0:1],b=A.m[r()<.5?0:1];return {a,b,s:status(a,b),sex:i%2?'f':'m'}})}
  function steps(){return GE_STEPS[mode].map((s,i)=>Object.assign({from:i/5,at:(i+.8)/5},s))}
  let ST=steps();
  function draw(t){
    const N=vb(svg,'720 400','400 690'),ph=phaseOf(ST,t),u=clamp((t-ST[ph].from)*5),K=kids(),F=FAM[mode],A=AL[mode];
    const X=x=>N?x-40:x,Y=y=>y;
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    /* pedigree lines */
    const ln=(d)=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    const P={I1:[200,70,'m'],I2:[280,70,'f'],II1:[80,170,'f'],II4:[150,170,'m'],II2:[230,170,'m'],II3:[320,170,'f']};
    const kx=[170,250,330,410];
    s+=ln(`M${X(213)} 70H${X(267)}M${X(240)} 70V120M${X(80)} 120H${X(240)}M${X(80)} 120V157M${X(150)} 120V157M${X(230)} 120V157M${X(243)} 170H${X(307)}`);
    if(mode==='ar'&&ph===3)s+=ln(`M${X(243)} 175H${X(307)}`);
    ['I','II','III'].forEach((g,i)=>s+=T(N?8:24,[74,174,284][i],g,'t-sm','fill:var(--ink);font-weight:700'));
    Object.entries(P).forEach(([k,p])=>{const sub=mode==='h'&&k==='I1'&&ph===3;s+=ped(X(p[0]),p[1],p[2],F[k],{proband:k==='II2'&&ph<2,r:13});
      if(sub)s+=`<circle cx="${X(p[0])}" cy="${p[1]}" r="21" style="fill:none;stroke:var(--variant);stroke-width:2;stroke-dasharray:4 3"/>`+T(X(p[0]),p[1]-26,'subtle signs?','t-xs t-mid','fill:var(--variant)');
      if(k==='II2'||k==='II3'){const al=k==='II2'?A.f:A.m;s+=T(X(p[0]),p[1]+30,al.join(' '),'t-sm t-mid','fill:var(--ink)')}});
    s+=T(X(275),N?150:152,mode==='ar'?'both carriers':mode==='h'?'father affected':'father affected','t-xs t-mid');
    /* children */
    const kA=ph<2?0:ph===2?u:1;
    if(kA>0){s+=ln(`M${X(275)} 170V225M${X(170)} 225H${X(410)}`);
      K.forEach((c,i)=>{const a=clamp(kA*4-i);if(a<=0)return;s+=`<g style="opacity:${f1(a)}">`+ln(`M${X(kx[i])} 225V267`)+ped(X(kx[i]),280,c.sex,c.s,{r:13})+T(X(kx[i]),310,c.a+' '+c.b,'t-sm t-mid','fill:var(--ink)')+'</g>'})}
    else s+=T(X(275),262,'generation III comes at step 3','t-xs t-mid');
    /* cascade testing badges */
    if(ph===4){const who=mode==='h'?['II1','II4','k0','k1','k2','k3']:['II1','II4','k0','k1','k2','k3'];
      who.forEach((w,i)=>{const a=clamp(u*7-i);if(a<=0)return;let x,y,st;
        if(w[0]==='k'){const c=K[+w[1]];x=kx[+w[1]];y=280;st=c.s}else{x=P[w][0];y=P[w][1];st=F[w]}
        const lab=mode==='h'?'exam':mode==='ar'?(st===1?'affected':st===.5?'carrier':'clear'):(st?'variant':'no variant');
        const good=mode==='h'?null:(st===0);
        s+=`<g style="opacity:${f1(a)}"><rect x="${f1(X(x)-26)}" y="${y+(w[0]==='k'?36:-38)}" width="52" height="14" rx="7" style="fill:${good===null?'var(--panel-2)':good?'var(--good-soft)':'var(--warn-soft)'};stroke:var(--line)"/>`+T(X(x),y+(w[0]==='k'?46:-28),lab,'t-xs t-mid','fill:var(--ink)')+'</g>'})}
    /* right panel (below on phones) */
    const px=N?24:490,py=N?350:40,pw=N?352:210;
    s+=`<rect x="${px-10}" y="${py-14}" width="${pw+20}" height="${N?330:350}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=T(px,py+4,['THE PARENTS','EACH PASSES ON ONE COPY','THE ODDS FOR EACH CHILD',mode==='ad'?'A NEW (DE NOVO) VARIANT':mode==='ar'?'RELATED PARENTS':'VARIABLE EXPRESSION','TESTING RELATIVES'][ph],'t-sm','fill:var(--ink);font-weight:600');
    const cs=N?60:58,gx=px+(N?110:56),gy=py+(N?62:58);
    if(ph<=2){
      /* Punnett square: rows = father's copies, columns = mother's */
      const hdr=ph>=1?(ph===1?ease(u):1):0;
      s+=T(gx-14,gy-24,'father ↓  mother →','t-xs t-end');
      for(let j=0;j<2;j++){
        const fx0=X(P.II2[0]),fy0=P.II2[1],tx=gx-18,ty=gy+cs*j+cs/2,mx0=X(P.II3[0]),my0=P.II3[1],tx2=gx+cs*j+cs/2,ty2=gy-12;
        if(hdr>0){s+=`<circle cx="${f1(lerp(fx0,tx,hdr))}" cy="${f1(lerp(fy0,ty,hdr))}" r="10" style="fill:var(--dx-soft);stroke:var(--dx)"/>`+T(lerp(fx0,tx,hdr),lerp(fy0,ty,hdr)+4,A.f[j],'t-sm t-mid','fill:var(--ink);font-weight:700');
          s+=`<circle cx="${f1(lerp(mx0,tx2,hdr))}" cy="${f1(lerp(my0,ty2,hdr))}" r="10" style="fill:var(--vas-soft);stroke:var(--vas)"/>`+T(lerp(mx0,tx2,hdr),lerp(my0,ty2,hdr)+4,A.m[j],'t-sm t-mid','fill:var(--ink);font-weight:700')}}
      for(let i=0;i<2;i++)for(let j=0;j<2;j++){const a=ph===2?clamp(u*5-(i*2+j)*.6):0,st=status(A.f[i],A.m[j]),x=gx+cs*j,y=gy+cs*i;
        s+=`<rect x="${x}" y="${y}" width="${cs}" height="${cs}" style="fill:${a>0?(st===1?'var(--warn-soft)':st===.5?'var(--gold-soft)':'var(--panel)'):'var(--panel)'};stroke:var(--line);stroke-width:1.2"/>`;
        if(a>0)s+=`<g style="opacity:${f1(a)}">`+T(x+cs/2,y+cs/2-2,A.f[i]+' '+A.m[j],'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x+cs/2,y+cs/2+12,mode==='ar'?(st===1?'affected':st===.5?'carrier':'neither'):(st?'affected':'not'),'t-xs t-mid')+'</g>'}
      const oy=gy+cs*2+26;
      if(ph===2){const bars=mode==='ar'?[['affected',25,'var(--warn)'],['carrier',50,'var(--gold)'],['neither',25,'var(--muted)']]:[['inherits',50,'var(--warn)'],['does not',50,'var(--muted)']];
        bars.forEach((b,i)=>{const w=(pw-90)*b[1]/100*ramp(u,.3,.8);s+=T(px,oy+i*20+4,b[0],'t-xs')+`<rect x="${px+66}" y="${oy+i*20-5}" width="${f1(w)}" height="11" rx="2" style="fill:${b[2]}"/>`+(u>.5?T(px+70+w,oy+i*20+4,b[1]+'%','t-xs','fill:var(--ink);font-weight:700'):'')});
        const na=K.filter(c=>c.s===1).length,nc=K.filter(c=>c.s===.5).length;
        if(u>.8)s+=T(px,oy+(mode==='ar'?72:52),`this family: ${na} of 4 affected${mode==='ar'?', '+nc+(nc===1?' carrier':' carriers'):''}`,'t-xs','fill:var(--ink)')+T(px,oy+(mode==='ar'?86:66),'the odds start fresh for each child','t-xs')}
      else if(ph===1)s+=T(px,oy,'one copy from each parent, by chance','t-xs')+(mode==='h'?T(px,oy+15,'? = a gene no one has found yet','t-xs','fill:var(--variant)'):'');
      else s+=T(px,oy,mode==='ar'?'v = changed copy · + = usual copy':mode==='h'?'? = unknown gene(s)':'V = changed copy · + = usual copy','t-xs');
    }else if(ph===3){
      const cx=px+pw/2,cy=py+60;
      if(mode==='ad'){s+=ped(cx-30,cy,'m',0,{r:12})+ped(cx+30,cy,'f',0,{r:12})+ln(`M${cx-18} ${cy}H${cx+18}M${cx} ${cy}V${cy+38}`)+ped(cx,cy+52,'f',ramp(u,.2,.4)>0?1:0,{r:12});
        if(u>.3)s+=T(cx+20,cy+56,'★ new variant','t-xs','fill:var(--variant);font-weight:700');
        ['About 50% of people with vEDS','have an affected parent; in the','other 50% the variant is new, or','comes from a mosaic parent.','cEDS: the same 50:50 split.'].forEach((l,i)=>s+=T(px,cy+92+i*15,l,'t-xs'))}
      else if(mode==='ar'){s+=ped(cx-30,cy,'m',.5,{r:12})+ped(cx+30,cy,'f',.5,{r:12})+ln(`M${cx-18} ${cy-2}H${cx+18}M${cx-18} ${cy+3}H${cx+18}`);
        ['Double line = parents who are','related to each other.','Recessive types may be more','common where this is frequent,','and rare-type counts are','probably too low.'].forEach((l,i)=>s+=T(px,cy+40+i*15,l,'t-xs'))}
      else{['Signs can be subtle in a parent','and found only with a detailed','history and examination.','','Family history counts in the','criteria: a first-degree relative','who independently meets them','(Feature B).'].forEach((l,i)=>s+=T(px,py+34+i*15,l,'t-xs'))}
    }else{
      const L=mode==='ad'?['First-degree relatives: clinical','check, then a test for the','family’s variant, even without','signs.','','London: 55% of childhood vEDS','diagnoses came through','family testing.','','A known variant makes prenatal','and preimplantation testing','possible.']
        :mode==='ar'?['Brothers and sisters can learn','whether they are carriers.','Carriers are not affected.','','Partners can be tested if a','couple wants to know their','own chances.']
        :['No variant to test: relatives','are examined clinically.','','No prenatal or preimplantation','testing for hEDS.','','A genetics review can still find','a different condition.'];
      L.forEach((l,i)=>s+=T(px,py+30+i*15,l,'t-xs'));
    }
    svg.innerHTML=s;setSt(ph);
    $('#geNote').innerHTML=noteHTML(ST[ph]);
    const na=K.filter(c=>c.s===1).length;
    $('#geRead').innerHTML=`<span>pattern <b>${{ad:'autosomal dominant',ar:'autosomal recessive',h:'hEDS (no gene)'}[mode]}</b></span><span>chance per child <b>${mode==='ar'?'25% affected, 50% carrier':'50%'}</b></span>${ph>=2?`<span>this family <b>${na} of 4 affected</b></span>`:''}`;
  }
  const stop=playWire(rg,$('#gePlay'),draw,20000,'Replay','genes');
  function wire(){const o=$('#geSteps'),nu=o.cloneNode(false);o.replaceWith(nu);setSt=stepWire(nu,ST,rg,draw,stop)}
  $$('[data-gemode]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.gemode;$$('[data-gemode]').forEach(x=>x.setAttribute('aria-pressed',x===b));ST=steps();wire();draw(+rg.value)}));
  $('#geReroll').addEventListener('click',()=>{seed++;draw(+rg.value)});
  wire();draw(+rg.value);

  /* ---- decision tree ---- */
  const tr=$('#geTree');let gp='a',gr='p';
  function box(x,y,w,h,lines,on,dash,cls){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="9" style="fill:${on?'var(--accent-soft)':'var(--panel)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2:1.2}${dash?';stroke-dasharray:5 3':''};opacity:${on?1:.75}"/>`;
    lines.forEach((l,i)=>s+=T(x+w/2,y+h/2+4+(i-(lines.length-1)/2)*13,l,(cls||'t-xs')+' t-mid',on?'fill:var(--ink);font-weight:700':''));return s}
  const arw=(x1,y1,x2,y2,on,dash)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2.2:1.3}${dash?';stroke-dasharray:5 3':''}" marker-end="url(#geTA${on?1:0})"/>`;
  const RL={p:['Pathogenic /','likely pathogenic'],v:['Uncertain','(VUS)'],n:['No variant','found']};
  function drawTree(){const N=vb(tr,'720 300','400 300');let s=`<defs>${marker('geTA1','var(--accent)')}${marker('geTA0','var(--line)')}</defs>`;
    const keys=['a','b','c'],OPT={a:['Signs of vEDS, cEDS','or a rare type'],b:['A typical','hEDS picture'],c:['A relative has','a known variant']};
    if(!N){s+=box(250,8,220,34,['Who is being assessed?'],true,false,'t-sm');
      keys.forEach((k,i)=>{const cx=120+i*240,on=gp===k;s+=arw(360,42,cx,72,on)+box(cx-100,74,200,40,OPT[k],on)+arw(cx,114,cx,140,on)+box(cx-100,142,200,48,GE_PATH[k].test,on,k==='b')});
      if(gp==='b')s+=arw(320,166,226,166,true,true)+T(272,158,'other features?','t-xs t-mid','fill:var(--accent)');
      const src=gp==='b'?null:(gp==='a'?120:600);
      ['p','v','n'].forEach((r,i)=>{const cx=170+i*190,on=src!=null&&gr===r;if(src!=null)s+=arw(src,190,cx,232,on);s+=box(cx-80,234,160,44,RL[r],on)});
      if(gp==='b')s+=box(250,234,220,44,['Clinical diagnosis','(criteria met or not)'],true);
    }else{s+=box(100,6,200,30,['Who is being assessed?'],true,false,'t-sm');
      keys.forEach((k,i)=>{const on=gp===k;s+=box(20+i*124,52,112,44,OPT[k],on)+arw(200,36,76+i*124,50,on)});
      const ci=keys.indexOf(gp);s+=arw(76+ci*124,96,200,128,true)+box(100,130,200,52,GE_PATH[gp].test,true,gp==='b');
      if(gp==='b'){s+=box(100,212,200,44,['Clinical diagnosis','(criteria met or not)'],true)+arw(200,182,200,210,true);
        s+=T(200,286,'other features? → gene panel','t-xs t-mid','fill:var(--accent)')}
      else ['p','v','n'].forEach((r,i)=>{const on=gr===r;s+=arw(200,182,76+i*124,222,on)+box(20+i*124,224,112,44,RL[r],on)});
    }
    tr.innerHTML=s;
    const R=gp==='b'?GE_RES.h:GE_RES[gr],Pth=GE_PATH[gp];
    $('#geTreeNote').innerHTML=noteHTML({k:Pth.t,t:R.t,txt:Pth.txt+'</p><p>'+R.txt,pt:R.pt,hook:gp==='b'?`hEDS is the only type diagnosed without molecular confirmation. [[Malfait2017]]`:null});
  }
  $$('[data-gep]').forEach(b=>b.addEventListener('click',()=>{gp=b.dataset.gep;$$('[data-gep]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTree()}));
  $$('[data-ger]').forEach(b=>b.addEventListener('click',()=>{gr=b.dataset.ger;$$('[data-ger]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawTree()}));
  drawTree();

  /* ---- vEDS variant classes ---- */
  const ic=$('#geIcons');let cl='all';
  const CL=[{k:'gly',n:71,l:'glycine substitution',c:'var(--variant)'},{k:'spl',n:36,l:'splice-site or in-frame',c:'var(--vas)'},{k:'hap',n:7,l:'null (haploinsufficient)',c:'var(--accent)'},{k:'oth',n:4,l:'other missense in the helix',c:'var(--gold)'},{k:'oth',n:8,l:'change in an end region',c:'var(--dx)'}];
  const AGE=[{k:'spl',l:'splice / in-frame',m:30,a:21,b:45},{k:'gly',l:'glycine substitution',m:40.5,a:31,b:53.25},{k:'hap',l:'null (haploinsufficient)',m:53,a:43,b:58}];
  function drawIcons(){const N=vb(ic,'720 270','400 500');let s='';
    const cols=N?18:21,cz=N?19:15,x0=N?16:20,y0=30;
    s+=T(x0,16,'126 COL3A1 VARIANTS (FRENCH COHORT)','t-xs','fill:var(--ink);font-weight:600');
    let i=0;CL.forEach(c=>{for(let j=0;j<c.n;j++,i++){const x=x0+(i%cols)*cz,y=y0+Math.floor(i/cols)*cz,on=cl==='all'||cl===c.k;
      s+=`<rect x="${x}" y="${y}" width="${cz-3}" height="${cz-3}" rx="2.5" style="fill:${c.c};opacity:${on?1:.15}"/>`}});
    const ly=y0+Math.ceil(126/cols)*cz+16;
    CL.forEach((c,j)=>{const lx=x0+(N?(j%2)*180:0),yy=ly+(N?Math.floor(j/2):j)*15;s+=`<rect x="${lx}" y="${yy-8}" width="9" height="9" rx="2" style="fill:${c.c}"/>`+T(lx+14,yy,`${c.n} ${c.l}`,'t-xs',cl===c.k?'fill:var(--ink);font-weight:700':'')});
    /* age bars */
    const bx=N?16:380,by=N?ly+64:30,bw=N?300:300,Xa=v=>bx+bw*v/70;
    s+=T(bx,by-14,'MEDIAN AGE AT FIRST MAJOR EVENT (DUTCH COHORT)','t-xs','fill:var(--ink);font-weight:600');
    [0,20,40,60].forEach(v=>s+=`<line x1="${f1(Xa(v))}" x2="${f1(Xa(v))}" y1="${by}" y2="${by+150}" class="grid"/>`+T(Xa(v),by+164,v,'t-xs t-mid'));
    s+=T(bx+bw,by+178,'years','t-xs t-end');
    AGE.forEach((a,j)=>{const y=by+16+j*44,on=cl==='all'||cl===a.k,c=CL.find(q=>q.k===a.k).c;
      s+=T(bx,y,a.l,'t-xs',on?'fill:var(--ink);font-weight:700':'');
      s+=`<g style="opacity:${on?1:.25}"><line x1="${f1(Xa(a.a))}" x2="${f1(Xa(a.b))}" y1="${y+14}" y2="${y+14}" style="stroke:${c};stroke-width:3"/><rect x="${f1(Xa(0))}" y="${y+9}" width="${f1(Xa(a.m)-Xa(0))}" height="10" rx="2" style="fill:${c};opacity:.35"/><circle cx="${f1(Xa(a.m))}" cy="${y+14}" r="5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/></g>`+T(Xa(a.m)+8,y+4,a.m,'t-xs','fill:var(--ink);font-weight:700')});
    s+=`<line x1="${f1(Xa(41))}" x2="${f1(Xa(41))}" y1="${by+4}" y2="${by+144}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`+T(Xa(41)+4,by+150,'all: 41.0','t-xs','fill:var(--ink)');
    ic.innerHTML=s;
    const NT={all:{t:'Two ways a variant can act',txt:`Glycine substitutions were the commonest class (71 of 126), and glycine-substitution and splice-site variants were more severe than the rest; median age at first complication across the cohort was 29 years. [[Frank2015]] In the Dutch cohort, 43 of 56 variants (76.8%) were predicted to act in a dominant-negative way, and men had more major events than women (odds ratio 3.61). [[Demirdas2024]]`},
      gly:{t:'Glycine substitutions',txt:`A bulkier amino acid replaces a glycine in the Gly-X-Y repeat and the faulty chain is built into molecules with normal ones. Median age at first major event: 40.5 years (IQR 31.0–53.25). [[Demirdas2024]] See <a href="#collagen" data-go="collagen">Collagen, gene to fibril</a>.`},
      spl:{t:'Splice-site and in-frame changes',txt:`These remove or alter a stretch of the chain. In the Dutch cohort they had the earliest median age at first major event: 30.0 years (IQR 21.0–45.0). [[Demirdas2024]] In the French cohort they were among the more severe groups. [[Frank2015]]`},
      hap:{t:'Null (haploinsufficient) variants',txt:`Less type III collagen is made, but no faulty chains. Median age at first major event: 53.0 years (IQR 43.0–58.0). [[Demirdas2024]] In 54 people from 19 families, the first complication came almost 15 years later than with missense or exon-skipping variants, and only 28% of relatives had a complication. [[Leistritz2011]]`},
      oth:{t:'Other missense and end-region changes',txt:`Non-glycine changes in the helix (4) and in the N- or C-terminal regions (8) were, with null variants, the milder groups: a less typical appearance and no digestive events. [[Frank2015]] The Dutch study gave no separate age for them.`}};
    $('#geIconNote').innerHTML=noteHTML({k:'vEDS · COL3A1 variant classes',t:NT[cl].t,txt:NT[cl].txt,pt:`The exact spelling mistake in the gene matters: some kinds tend to cause problems earlier than others. These are averages for groups.`,hook:`Null COL3A1 variants delay the first complication by almost 15 years. [[Leistritz2011]]`});
  }
  $$('[data-gecl]').forEach(b=>b.addEventListener('click',()=>{cl=b.dataset.gecl;$$('[data-gecl]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawIcons()}));
  drawIcons();
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawTree();drawIcons()};
};
