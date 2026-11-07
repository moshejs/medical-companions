/* =============== 1.5 Alpha-1 antitrypsin deficiency =============== */
/* Main scrubber: two lanes side by side, MM above and ZZ below, each running liver cell -> blood -> air sacs.
   Step 1 the gene letter; 2 the protein leaves the liver (M) or chains up inside it (Z); 3 the blood level;
   4 neutrophil elastase met by AAT (M) or unopposed (Z, with smoke); 5 early emphysema and liver injury in Z;
   6 a weekly infusion raising the Z lane's blood level. Molecule counts and bar lengths are schematic; the only
   proportions taken from the research are "15% secreted" (drawn as fewer molecules leaving) and "below 35% of
   normal" (the Z level bar is drawn under that mark). Second widget: a Punnett square for two parents'
   genotypes with the published facts for each child genotype. Third: CT lung-density loss in the trials. */
const AA_STEPS=[
 {from:0,at:.08,k:'Gene',t:'One letter in SERPINA1',sub:'the Z allele swaps glutamate 342 for lysine',
  txt:`Alpha-1 antitrypsin is made mainly in the liver, but its main job is to protect the lung against neutrophil elastase [[Stoller2005]]. The PI locus lies on chromosome 14q32.1 [[WHO1997]]. The most common severe variant is the Z allele of SERPINA1, a Glu342Lys substitution, and Pi*ZZ carriers may develop lung and liver disease [[Hamesch2019,Stoller2005]]. The Prolastin-C label describes AATD as autosomal co-dominant [[FDA-ProlastinC]].`,
  pt:`Alpha-1 antitrypsin deficiency is inherited. One small change in a gene makes the liver build a faulty protein [[Lomas1992,Stoller2005]].`,
  hook:`Z allele = Glu342Lys in SERPINA1, chromosome 14q32.1 [[Hamesch2019,WHO1997]].`},
 {from:.17,at:.25,k:'Stuck',t:'Z protein chains up in the liver',sub:'only 15% of Z protein leaves the liver cell',
  txt:`The Z mutation blocks the final stage of processing in the liver, so a ZZ homozygote secretes only 15% of the protein. The other 85% accumulates in the endoplasmic reticulum, where much is degraded and the rest forms insoluble inclusions. Z antitrypsin polymerises by loop-sheet linkage: the reactive-centre loop of one molecule inserts into the A-sheet of the next <span class="ev est">Established</span> [[Lomas1992]].`,
  pt:`The faulty protein clumps together inside liver cells, so most of it never gets out [[Lomas1992]].`,
  hook:`Loop-sheet polymerisation leaves only 15% of Z protein secreted [[Lomas1992]].`},
 {from:.34,at:.42,k:'Shortfall',t:'Too little reaches the blood',sub:'ZZ levels: typically under 35% of normal',
  txt:`The Prolastin-C label states that PiZZ serum levels are typically below 35% of the average normal level, and that about 95% of severely deficient patients are PiZ homozygotes [[FDA-ProlastinC]]. Serum levels below a protective threshold of 11 µmol/L increase the risk of emphysema [[Stoller2005]]. PiSZ levels run about 9–23 µM and are considered to carry moderately increased risk [[FDA-ProlastinC]].`,
  pt:`Because the protein is stuck in the liver, too little travels in the blood to the lungs [[Lomas1992,Stoller2005]].`,
  hook:`The protective threshold for serum AAT is 11 µmol/L [[Stoller2005]].`},
 {from:.5,at:.58,k:'Unopposed',t:'Neutrophil elastase runs free',sub:'without enough inhibitor, elastase cuts elastin',
  txt:`In the protease–antiprotease model the label describes, α1-PI is the main antiprotease of the lower respiratory tract and inhibits neutrophil elastase; smoking and infection raise elastase by recruiting neutrophils [[FDA-ProlastinC]]. Smoke oxidants also inactivate what inhibitor there is: its anti-elastase capacity was 40% lower in smokers’ lung fluid <span class="ev early">Early evidence</span> [[Carp1982]]. Z protein made in the lung forms polymers that attract neutrophils <span class="ev early">Early evidence</span> [[Mulgrew2004]].`,
  pt:`Without enough of the protective protein, an enzyme from white blood cells eats away the stretchy fibres in the air-sac walls [[FDA-ProlastinC]].`,
  hook:`Smoking adds neutrophils and oxidises the remaining inhibitor [[FDA-ProlastinC,Carp1982]].`},
 {from:.67,at:.75,k:'Early emphysema',t:'Breathless at 32 instead of 51',sub:'emphysema decades early, and liver injury',
  txt:`In 69 ZZ individuals, dyspnoea began at a mean age of 32 in smokers and 51 in non-smokers, and mean age at death (excluding liver deaths) was 48 and 67 years [[Janus1985]]. COPD with a high frequency of panacinar emphysema is the most common clinical disorder in AATD [[WHO1997]]. In 554 Pi*ZZ adults without known liver disease, non-invasive tests suggested significant liver fibrosis in 20–36% [[Hamesch2019]].`,
  pt:`In people with alpha-1, smoking makes lung disease start much earlier, often in their 30s [[Janus1985]].`,
  hook:`ZZ smokers develop dyspnoea about two decades earlier than ZZ non-smokers (32 vs 51 years) [[Janus1985]].`},
 {from:.83,at:.93,k:'Find and slow',t:'Test, stop smoking, consider augmentation',sub:'a weekly infusion raises the blood level',
  txt:`The 2016 Alpha-1 Foundation guidance endorses testing all adults with symptomatic fixed airflow obstruction [[Sandhaus2016]]. Never-smoking PiZZ people found by screening had no clear excess risk of death (HR 1.2) [[Tanash2017]]. Weekly infusions of 60 mg/kg raised trough serum levels from 30 to 126 mg/dL [[Wewers1987]], and in RAPID lung density at TLC fell more slowly with treatment (−1.45 vs −2.19 g/L/yr; p=0.03), although the combined primary end point was missed (p=0.06) [[Chapman2015]].`,
  pt:`A simple blood test can check for alpha-1. Weekly infusions of the missing protein slow the loss of lung tissue seen on scans [[Sandhaus2016,Chapman2015]].`,
  hook:`RAPID: augmentation slowed CT density loss at TLC (p=0.03); the combined primary end point was missed (p=0.06) [[Chapman2015]].`}
];
const AA_TXT={
 laneM:'MM · normal M protein',laneZ:'ZZ · Z protein',laneMn:'MM · normal',laneZn:'ZZ · Z protein',
 st:{M:['M allele: glutamate at 342','folds and leaves the liver','a normal blood level','elastase blocked','air-sac walls intact','no infusion needed'],
     Z:['Z allele: lysine at 342','85% stays stuck in the liver','too little in the blood','elastase runs free','breathless at 32 if smoking, 51 if not','weekly infusion raises the level']},
 gene:'SERPINA1',glu:'Glu 342',lys:'Lys 342',liver:'liver cell',blood:'blood level',lung:'air sacs',
 normal:'normal',under35:'under 35% of normal',raised:'raised by infusion',thr:'risk rises below 11 µmol/L',
 polymer:'Z polymers',inj:'liver injury',drip:'60 mg/kg weekly'
};
/* genotypes: allele colours and the published facts */
const AA_AL={M:'var(--dx)',S:'var(--mucus)',Z:'var(--accent)'};
const AA_GT={
 MM:{n:'MM',rows:[['Level','Normal M protein from both copies of the gene.'],['Lung','The reference group: in a family study PiMM relatives had a post-bronchodilator FEV1/FVC of 0.78. [[Molloy2014]]']]},
 MS:{n:'MS',rows:[['How common','Counted with PiMZ among at least 116 million carriers in surveyed countries totalling 4.4 billion people. [[deSerres2002]]'],['Level and risk','The sources used for this module give no level or risk figure for MS.']]},
 SS:{n:'SS',rows:[['How common','Counted with PiSZ and PiZZ among 3.4 million deficiency-allele combinations in surveyed countries. [[deSerres2002]]'],['Level and risk','The sources used for this module give no level or risk figure for SS.']]},
 MZ:{n:'MZ',rows:[['How common','Some 4% of northern Europeans [[Lomas1992]]; 2–4% of Caucasians carry Pi*Z. [[Strnad2019]]'],
   ['Lung','In a family study, FEV1/FVC was 0.75 vs 0.78 in MM relatives, with an adjusted odds ratio for COPD of 5.18; 10.65 in ever-smokers, and no effect in never-smokers. [[Molloy2014]] White PiMZ smokers in COPDGene had lower FEV1 (68% vs 75% predicted) and more CT emphysema. [[Foreman2017]] GOLD 2023 states there is no increased COPD risk in MZ heterozygotes who do not smoke [[Agusti2023]]; a 2023 workshop concluded a single Z allele confers a modest increased risk in some people. [[Hersh2026]]'],
   ['Liver','A single Pi*Z allele raised the odds of cirrhosis in people with fatty liver disease (adjusted OR 7.3) and with alcohol misuse (5.8). [[Strnad2019]]']]},
 SZ:{n:'SZ',rows:[['Level','About 9–23 µM, considered to carry moderately increased risk (Prolastin-C label). [[FDA-ProlastinC]]'],['Lung','GOLD 2023 states there is no increased COPD risk in SZ heterozygotes who do not smoke. [[Agusti2023]]']]},
 ZZ:{n:'ZZ',rows:[['How common','About 95% of severely deficient patients (label) [[FDA-ProlastinC]]; an estimated 253,404 Pi*ZZ people worldwide. [[Blanco2017]]'],
   ['Level','Typically below 35% of the average normal level (label) [[FDA-ProlastinC]]; levels below 11 µmol/L raise emphysema risk. [[Stoller2005]]'],
   ['Lung','Dyspnoea began at a mean age of 32 in smokers and 51 in non-smokers. [[Janus1985]] Adjusted FEV1 decline was 70 mL/yr in current smokers, 41 in ex-smokers and 47 in never-smokers. [[Piitulainen1999]] Never-smokers found by screening had no clear excess risk of death (HR 1.2, 95% CI 0.6–2.2). [[Tanash2017]]'],
   ['Liver','About 10% of newborn Z homozygotes develop liver disease [[Lomas1992]]; significant fibrosis was suggested in 20–36% of adults without known liver disease. [[Hamesch2019]]']]},
 NN:{n:'Null/null',rows:[['Level','Undetectable protein (Prolastin-C label). [[FDA-ProlastinC]]']]}
};
const AA_PT={pa:'Parent 1',pb:'Parent 2',each:'Chance for each child',of4:n=>`${n} in 4`,pct:n=>`${n*25}%`,eq:'Each pregnancy is a new draw: the chances do not change with earlier children.'};
const AA_DEN={
 rapid:{ttl:'RAPID: CT lung density loss at TLC, g/L a year',rows:[['A1PI 60 mg/kg weekly, 0–24 months',1.45,'var(--dx)'],['Placebo, 0–24 months',2.19,'var(--muted)']],
  note:`180 non-smokers with serum AAT below 11 µM and FEV1 35–70% predicted, randomised for 24 months; p=0.03 for TLC density alone, while the combined TLC plus FRC end point missed significance (−1.50 vs −2.12 g/L/yr; p=0.06). [[Chapman2015]]`},
 ole:{ttl:'RAPID open-label extension: loss, g/L a year',rows:[['Early start, 0–24 months',1.51,'var(--dx)'],['Early start, 24–48 months',1.63,'var(--dx)'],['Delayed start, 0–24 months (placebo)',2.26,'var(--muted)'],['Delayed start, 24–48 months (on A1PI)',1.26,'var(--dx)']],
  note:`Once on treatment, delayed-start patients slowed from −2.26 to −1.26 g/L/yr; lung density already lost was never recovered. [[McElvaney2017]]`},
 pooled:{ttl:'Danish–Dutch trial plus EXACTLE, 119 patients: loss, g/L a year',rows:[['AAT',1.73,'var(--dx)'],['Placebo',2.74,'var(--muted)']],
  note:`Pooled annual density loss, p=0.006. [[Stockley2010]] EXACTLE alone (77 PiZ subjects) showed a trend (p=0.049–0.084 across methods). [[Dirksen2009]]`},
 fmt:v=>`−${v.toFixed(2)}`};
/* a Z polymer chain: n linked beads along a gentle curve */
function aaChain(x,y,n,step,ph){let s='',d='';for(let i=0;i<n;i++){const cx=x+i*step,cy=y+Math.sin(i*1.3+ph)*step*.45;d+=(i?'L':'M')+f1(cx)+' '+f1(cy);s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(step*.42)}" style="fill:var(--accent);stroke:var(--panel);stroke-width:1"/>`}
  return `<path d="${d}" style="stroke:var(--accent);stroke-width:2;fill:none"/>`+s}
/* one AAT molecule (open circle when oxidised) */
function aaMol(x,y,r,o={}){return o.ox?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:none;stroke:var(--dx);stroke-width:1.6;opacity:${f1(o.op==null?1:o.op)}"/>`
  :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${o.col||'var(--dx)'};opacity:${f1(o.op==null?1:o.op)}"/><path d="M${f1(x-r*.5)} ${f1(y-r*.8)}q${f1(r*.5)} ${f1(-r*.8)} ${f1(r)} 0" style="fill:none;stroke:${o.col||'var(--dx)'};stroke-width:1.4;opacity:${f1(o.op==null?1:o.op)}"/>`}
inits.aatd=()=>{
  const svg=$('#aaSvg'),rg=$('#aaT');
  function lane(Z,y0,N,t,p){
    const T=AA_TXT;let s='';
    const Lv=N?{liv:{x:16,y:y0+36,w:180,h:120},bl:{x:206,y:y0+36,w:178},al:[262,y0+226,110],ne:[124,y0+226],st:[16,y0+30,'start'],lb:[16,y0+14]}
              :{liv:{x:16,y:y0+24,w:190,h:132},bl:{x:226,y:y0+24,w:220},al:[600,y0+92,128],ne:[498,y0+118],st:[704,y0+14,'end'],lb:[16,y0+14]};
    const lv=Lv.liv,bl=Lv.bl,[ax,ay,as]=Lv.al,[nx,ny]=Lv.ne;
    s+=`<text x="${Lv.lb[0]}" y="${Lv.lb[1]}" class="t-lbl" style="fill:${Z?'var(--accent)':'var(--dx)'}">${N?(Z?T.laneZn:T.laneMn):(Z?T.laneZ:T.laneM)}</text>`;
    s+=`<text x="${Lv.st[0]}" y="${Lv.st[1]}" class="t-xs" text-anchor="${Lv.st[2]}" style="fill:var(--ink);font-weight:700">${T.st[Z?'Z':'M'][p]}</text>`;
    /* liver cell */
    s+=`<rect x="${lv.x}" y="${lv.y}" width="${lv.w}" height="${lv.h}" rx="18" style="fill:var(--tissue);stroke:var(--membrane);stroke-width:2"/><text x="${lv.x+10}" y="${lv.y+lv.h-8}" class="t-xs">${T.liver}</text>`;
    const nuX=lv.x+40,nuY=lv.y+lv.h*.42;
    s+=`<circle cx="${nuX}" cy="${f1(nuY)}" r="22" style="fill:var(--nucleus);stroke:var(--membrane)"/><text x="${nuX}" y="${f1(nuY-3)}" class="t-xs" text-anchor="middle" style="fill:var(--ink)">${T.gene}</text>`;
    const g0=p===0;s+=chip(nuX,nuY+12,Z?T.lys:T.glu,{anchor:'middle',size:g0?11:10,col:Z?'var(--accent)':'var(--dx)',fill:g0?(Z?'var(--accent-soft)':'var(--dx-soft)'):'var(--panel)',tcol:'var(--ink)'});
    let er='';for(let i=0;i<3;i++){const yy=lv.y+22+i*24;er+=`M${lv.x+76} ${yy}q10 -8 20 0t20 0t20 0t20 0t20 0`}
    s+=`<path d="${er}" style="fill:none;stroke:var(--membrane);stroke-width:1.6"/>`;
    const prod=ramp(t,.17,.26),fill=ramp(t,.28,.4),aug=ramp(t,.85,.95);
    if(!Z){for(let i=0;i<6;i++){const u=(t*8+i/6)%1;if(prod<=0)break;s+=aaMol(lerp(lv.x+90,lv.x+lv.w+6,u),lv.y+30+(i%3)*24,3.6,{op:prod})}}
    else if(prod>0){const nL=Math.round(2+7*ramp(t,.2,.75));for(let i=0;i<3;i++)s+=aaChain(lv.x+84,lv.y+30+i*24,Math.min(nL,8-i),10,i);
      const u=(t*8)%1;s+=aaMol(lerp(lv.x+170,lv.x+lv.w+6,u),lv.y+lv.h*.82,3.6,{op:prod});
      const inc=ramp(t,.67,.8);if(inc>0){s+=`<circle cx="${lv.x+lv.w-30}" cy="${f1(lv.y+lv.h*.78)}" r="${f1(14*inc)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.5"/>`;
        s+=chip(lv.x+lv.w-30,lv.y+lv.h+14,T.inj,{anchor:'middle',size:10,col:'var(--accent)',tcol:'var(--ink)'})}}
    /* blood: a level bar and a vessel */
    const lvl=Z?(.27+.45*aug)*fill:.92*fill,vy=bl.y+48,vh=40;
    s+=`<text x="${bl.x}" y="${bl.y+6}" class="t-xs">${T.blood}</text><text x="${bl.x+bl.w}" y="${bl.y+6}" class="t-xs" text-anchor="end" style="fill:var(--ink)">${fill>0?(Z?(aug>.5?T.raised:T.under35):T.normal):''}</text>`;
    s+=`<rect x="${bl.x}" y="${bl.y+12}" width="${bl.w}" height="10" rx="4" style="fill:var(--panel-2)"/><rect x="${bl.x}" y="${bl.y+12}" width="${f1(bl.w*lvl)}" height="10" rx="4" style="fill:var(--dx)"/>`;
    if(Z)s+=`<line x1="${f1(bl.x+bl.w*.92*.35)}" x2="${f1(bl.x+bl.w*.92*.35)}" y1="${bl.y+9}" y2="${bl.y+25}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:2 2"/>`;
    s+=`<rect x="${bl.x}" y="${vy}" width="${bl.w}" height="${vh}" rx="${vh/2}" style="fill:var(--o2-soft);stroke:var(--blood);stroke-width:1.5"/>`;
    const nMol=Math.round(Z?(2+9*aug)*fill:12*fill);for(let i=0;i<nMol;i++){const u=(t*5+i/Math.max(nMol,1))%1;s+=aaMol(lerp(bl.x+12,bl.x+bl.w-12,u),vy+vh/2+Math.sin(i*2.1)*vh*.25,3.4,{col:Z&&i>=2?'var(--dx)':undefined})}
    for(let i=0;i<5;i++){const u=(t*5+i/5+.1)%1;s+=`<ellipse cx="${f1(lerp(bl.x+10,bl.x+bl.w-10,u))}" cy="${f1(vy+vh/2+Math.cos(i*2.7)*vh*.22)}" rx="5" ry="3" style="fill:var(--blood);opacity:.55"/>`}
    if(Z&&p>=2&&p<5)s+=chip(bl.x+bl.w/2,vy+vh+16,T.thr,{anchor:'middle',size:10,col:'var(--bad)',tcol:'var(--ink)'});
    if(Z&&aug>0){const dx=bl.x+bl.w*.3;s+=`<path d="M${f1(dx)} ${vy}V${vy-12}" style="stroke:var(--dx);stroke-width:2"/><rect x="${f1(dx-7)}" y="${vy-26}" width="14" height="16" rx="3" style="fill:var(--dx-soft);stroke:var(--dx);opacity:${f1(aug)}"/>`;
      s+=chip(bl.x+bl.w/2,vy+vh+16,T.drip,{anchor:'middle',size:10,col:'var(--dx)',tcol:'var(--ink)'})}
    /* air sacs, neutrophil, elastase and AAT */
    const el=ramp(t,.5,.56),de=Z?ramp(t,.56,.8)*.75:0,smk=Z?bump(t,.5,.67):0;
    s+=alveoli(ax,ay,as,{destroy:de,elastin:true,cap:true,o2:.6*(1-de*.5),ph:t*20,seed:Z?6:7}).svg;
    if(smk>0)s+=smoke(ax-as*.4,ay-as*.45,as*.8,as*.4,{amt:smk,ph:t*6,seed:5});
    if(el>0){s+=luCell('neut',nx,ny,8,el);if(Z&&smk>.2)s+=luCell('neut',nx+16,ny-22,7,el*smk);
      const blocked=Z?(aug>.5?.5:.1):1;
      for(let j=0;j<5;j++){const u=(t*10+j/5)%1,tx=lerp(nx,ax-as*.12,u),ty=lerp(ny,ay+(j-2)*as*.08,u),caught=(j/5)<blocked;
        if(caught&&u>.45){const mu=clamp((u-.45)/.2);s+=luNE(lerp(nx,ax,.45)+6,ty,3,el*(1-mu))+aaMol(lerp(nx,ax,.45)+6,ty-6,3.4,{op:el*(1-mu)})}
        else s+=luNE(tx,ty,3,el*(1-u*.3))}
      if(!Z||aug>0)for(let j=0;j<(Z?2:4);j++){const u=(t*6+j/4)%1;s+=aaMol(lerp(nx-14,nx+30,u),ny-18-j*5,3.2,{op:el*.9})}
      if(Z&&smk>.3)s+=aaMol(nx+28,ny+16,3.4,{ox:true,op:smk})}
    s+=`<text x="${ax}" y="${f1(ay+as*.5+(N?8:6))}" class="t-xs" text-anchor="middle">${T.lung}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 420','400 680'),p=phaseOf(AA_STEPS,t),S=AA_STEPS[p];
    let s=`<text x="16" y="26" class="t-big">${S.t}</text><text x="16" y="44" class="t-sm">${S.sub}</text>`;
    const yM=N?58:58,yZ=N?368:240;
    s+=`<line x1="16" x2="${N?384:704}" y1="${yZ-8}" y2="${yZ-8}" style="stroke:var(--line)"/>`;
    s+=lane(false,yM,N,t,p)+lane(true,yZ,N,t,p);
    svg.innerHTML=s;setSt(p);$('#aaNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#aaPlay'),draw,18000,'%t:player.replay%','aatd');
  const setSt=stepWire($('#aaSteps'),AA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- inheritance: Punnett square ---- */
  const pa=$('#aaPa'),pb=$('#aaPb'),ps=$('#aaPunSvg'),pl=$('#aaPunList'),gb=$('#aaGtBtns'),gc=$('#aaGtCard');let gt='ZZ';
  const norm=g=>{const o='MSZ';return g.split('').sort((a,b)=>o.indexOf(a)-o.indexOf(b)).join('')};
  function drawPun(){const N=vb(ps,'720 230','400 380'),A=pa.value,B=pb.value,cells=[],cnt={};
    for(let i=0;i<2;i++)for(let j=0;j<2;j++){const g=norm(A[j]+B[i]);cells.push([i,j,g]);cnt[g]=(cnt[g]||0)+1}
    const G=N?{x:110,y:44,c:84,h:56}:{x:110,y:56,c:90,h:64};let s='';
    s+=`<text x="${G.x+G.c}" y="${G.y-30}" class="t-xs" text-anchor="middle" style="fill:var(--ink);font-weight:700">${AA_PT.pa}: ${A}</text><text x="${G.x-60}" y="${G.y+G.h+4}" class="t-xs" text-anchor="middle" style="fill:var(--ink);font-weight:700">${AA_PT.pb}: ${B}</text>`;
    [0,1].forEach(j=>s+=`<text x="${G.x+G.c*j+G.c/2}" y="${G.y-10}" class="t-lbl" text-anchor="middle" style="fill:${AA_AL[A[j]]}">${A[j]}</text>`);
    [0,1].forEach(i=>s+=`<text x="${G.x-14}" y="${G.y+G.h*i+G.h/2+5}" class="t-lbl" text-anchor="middle" style="fill:${AA_AL[B[i]]}">${B[i]}</text>`);
    cells.forEach(([i,j,g])=>{const x=G.x+G.c*j,y=G.y+G.h*i;
      s+=`<rect x="${x}" y="${y}" width="${G.c/2}" height="${G.h}" style="fill:${AA_AL[g[0]]};opacity:.28"/><rect x="${x+G.c/2}" y="${y}" width="${G.c/2}" height="${G.h}" style="fill:${AA_AL[g[1]]};opacity:.28"/><rect x="${x}" y="${y}" width="${G.c}" height="${G.h}" style="fill:none;stroke:var(--line);stroke-width:1.5"/>`;
      s+=`<text x="${x+G.c/2}" y="${y+G.h/2+6}" class="t-big" text-anchor="middle">${g}</text>`});
    const keys=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]),S0=N?{x:16,y:G.y+G.h*2+44,w:300}:{x:380,y:56,w:240};
    s+=`<text x="${S0.x}" y="${S0.y-14}" class="t-xs" style="fill:var(--ink);font-weight:700">${AA_PT.each}</text>`;
    keys.forEach((g,k)=>{const y=S0.y+k*34;s+=`<text x="${S0.x}" y="${y+14}" class="t-lbl">${g}</text><rect x="${S0.x+44}" y="${y}" width="${S0.w-44}" height="20" rx="4" style="fill:var(--panel-2)"/><rect x="${S0.x+44}" y="${y}" width="${f1((S0.w-44)*cnt[g]/4)}" height="20" rx="4" style="fill:${AA_AL[g[1]]};opacity:.75"/><text x="${S0.x+S0.w+8}" y="${y+15}" class="t-sm" style="fill:var(--ink)">${AA_PT.of4(cnt[g])} · ${AA_PT.pct(cnt[g])}</text>`});
    ps.innerHTML=s;
    pl.innerHTML=keys.map(g=>`<button class="btn" data-gt="${g}" aria-pressed="${g===gt}">${g}</button>`).join('');}
  function drawCard(){const G=AA_GT[gt];gc.innerHTML=`<div class="kicker">${AA_GTK}</div><h4>${G.n}</h4><dl class="kv">${G.rows.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`;
    $$('[data-gt]').forEach(b=>{if(b.closest('#m-aatd'))b.setAttribute('aria-pressed',b.dataset.gt===gt)})}
  [pa,pb].forEach(el=>el.addEventListener('change',()=>{drawPun();drawCard()}));
  $('#m-aatd').addEventListener('click',e=>{const b=e.target.closest('[data-gt]');if(!b)return;gt=b.dataset.gt;drawCard()});
  drawPun();drawCard();

  /* ---- augmentation: CT density loss ---- */
  const ds=$('#aaDenSvg'),db=$('#aaDenBtns'),dn=$('#aaDenNote');let dk='rapid';
  function drawDen(){const D=AA_DEN[dk],N=NARROW(),n=D.rows.length,T=wrapT(16,22,D.ttl,N?52:96,{cls:'t-sm',style:'fill:var(--ink)'}),oy=T.h-15,H=(N?40+n*46:44+n*32)+oy;vb(ds,'720 '+H,'400 '+H);
    let s=T.svg;D.rows.forEach(([lb,v,cl],i)=>{const w=v/3;
      if(N){const y=48+oy+i*46;s+=`<text x="16" y="${y}" class="t-xs" style="fill:var(--ink)">${lb}</text><rect x="16" y="${y+7}" width="280" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="16" y="${y+7}" width="${f1(280*w)}" height="18" rx="4" style="fill:${cl}"/><text x="${f1(22+280*w)}" y="${y+21}" class="t-sm" style="fill:var(--ink)">${AA_DEN.fmt(v)}</text>`}
      else{const y=44+oy+i*32;s+=`<text x="16" y="${y+13}" class="t-xs" style="fill:var(--ink)">${lb}</text><rect x="300" y="${y}" width="330" height="20" rx="4" style="fill:var(--panel-2)"/><rect x="300" y="${y}" width="${f1(330*w)}" height="20" rx="4" style="fill:${cl}"/><text x="${f1(306+330*w)}" y="${y+15}" class="t-sm" style="fill:var(--ink)">${AA_DEN.fmt(v)}</text>`}});
    ds.innerHTML=s;dn.innerHTML=D.note;$$('[data-dk]',db).forEach(b=>b.setAttribute('aria-pressed',b.dataset.dk===dk))}
  db.addEventListener('click',e=>{const b=e.target.closest('[data-dk]');if(!b)return;dk=b.dataset.dk;drawDen()});
  drawDen();
  const prev=redraws.aatd;redraws.aatd=()=>{prev&&prev();drawPun();drawDen()};
};
const AA_GTK='Genotype';
