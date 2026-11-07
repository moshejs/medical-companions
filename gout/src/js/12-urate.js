/* =============== 1.2 where urate comes from =============== */
const UR_STEPS=[
 {from:0,at:.12,k:'Scene 1 · Purines in',t:'Purines from cells, synthesis and food',
  txt:'Purine nucleotides (AMP, GMP, IMP) come from cell turnover, new synthesis and diet. Building one IMP from scratch takes four amino acids, one PRPP, two folates and three ATP, and PRPP amidotransferase is the rate-limiting step. [[Torres2007]] Nucleotides are broken down through nucleosides (inosine, guanosine) to the free bases hypoxanthine and guanine; guanine feeds into xanthine. [[Maiuolo2016]] The salvage enzyme HPRT puts hypoxanthine and guanine back into nucleotides, away from urate. [[Torres2007]]',
  pt:'Purines are building blocks found in every cell and in food. When cells break them down, the leftovers head toward urate, unless the cell recycles them.',
  hook:'<b>HPRT salvage</b> keeps purines from becoming urate. Every patient with HPRT deficiency overproduces uric acid; the severe form is Lesch–Nyhan syndrome. [[Torres2007]]'},
 {from:.2,at:.32,k:'Scene 2 · Xanthine oxidase',t:'One enzyme, two steps, makes urate',
  txt:'Xanthine oxidoreductase (XOR) works at two steps in a row, hypoxanthine → xanthine → uric acid, and makes reactive oxygen species at each. [[Chen2016]] It is the rate-limiting enzyme of urate production. [[Furuhashi2020]] The liver is the main production site. [[HalperinKuhns2021]] Most liver XOR is the dehydrogenase form, which becomes the oxidase form by reversible oxidation or by proteolysis. [[Chen2016,Furuhashi2020]] At pH 7.4 and 37 °C, urate circulates mostly as an anion that pairs with sodium: monosodium urate. [[Martillo2014]] The first new estimate in over 50 years put daily production at 591 mg (men 648, women 489). [[Ohashi2023]]',
  pt:'One enzyme does the last two steps that turn purine leftovers into urate. Allopurinol and febuxostat work by blocking it. [[FDA-Zyloprim,Becker2005]]',
  hook:'Xanthine oxidase acts <b>twice</b>: hypoxanthine → xanthine and xanthine → urate. [[Chen2016]]'},
 {from:.4,at:.52,k:'Scene 3 · No uricase',t:'Why humans run high',
  txt:'In most mammals, uricase turns uric acid into allantoin, which is about 100 times more water-soluble. In humans and higher primates, uric acid is the end product. [[Chen2016,So2010]] Rats and mice run 1–2 mg/dL (≈ 59–119 µmol/L). The human reference range is 3.5–7.0 mg/dL (208–416 µmol/L) in men and postmenopausal women and 2.6–5.7 mg/dL (155–339 µmol/L) in premenopausal women. [[Chen2016]] Human, chimpanzee and orangutan share one nonsense mutation in exon 2 (codon 33, CGA→TGA); the gibbon lost the gene separately. [[Wu1992,Oda2002]] Activity had already been falling down the primate line before the gene was silenced. [[Kratzer2014]]',
  pt:'Most animals have an enzyme that breaks urate down. Humans and great apes lost it millions of years ago, so we carry much more urate in our blood.',
  hook:'Hominoids lack <b>uricase</b>, so <b>urate is the end product</b> of purine breakdown in humans. [[Chen2016,Oda2002]]'},
 {from:.6,at:.72,k:'Scene 4 · Kidney and gut',t:'The kidney takes back about 90%',
  txt:'About two thirds of urate leaves through the kidney and one third through the gut, mostly from radio-isotope studies; other sources give 70% renal. [[Ohashi2023,HalperinKuhns2021]] At least 90% of filtered urate is reabsorbed [[Chen2016]], so fractional excretion of urate (FEUA) in health is only 5–15%. [[HalperinKuhns2021]] In the proximal tubule, apical OAT4 and OAT10 probably do the bulk reabsorption and basolateral GLUT9 lets urate out to the blood. OAT1 and OAT3 take urate up from the blood and apical ABCG2 secretes it. URAT1, coupled to GLUT9, then reabsorbs urate again after secretion. [[HalperinKuhns2021]] ABCG2 also exports urate into the gut. [[HalperinKuhns2021]] When the kidneys fail, the gut can excrete up to about 60% of daily urate turnover. [[Ohashi2023]]',
  pt:'The kidneys filter urate out of the blood, then pull most of it back in. The gut gets rid of the rest.',
  hook:'<b>URAT1</b> (SLC22A12): apical reabsorption, the uricosuric drug target. <b>GLUT9</b> (SLC2A9): basolateral exit. <b>ABCG2</b>: secretion in kidney and gut. [[Enomoto2002,Vitart2008,Woodward2009]]'},
 {from:.8,at:.92,k:'Scene 5 · Balance',t:'Under-excretion, not overproduction',
  txt:'In 100 people with primary gout and 72 controls, the people with gout had lower urate clearance and FEUA, even the "high output" patients, and even after allopurinol had matched the filtered load. The authors call renal under-excretion the main mechanism. [[PerezRuiz2002Renal]] In 644 men with hyperuricaemia, ABCG2 dysfunction <i>raised</i> urinary urate: the gut was under-excreting and the kidney was clearing the overload. Ichida et al. proposed renaming the "overproduction type" the "renal overload type". <span class="ev early">Early evidence</span> [[Ichida2012]] Genuine overproduction is rare: HPRT deficiency, PRPS1 superactivity. [[Torres2007,deBrouwer2010]]',
  pt:'In most people with gout, the body makes a normal amount of urate. The kidneys and gut just do not get rid of enough of it. Genes play a large part in that. [[Major2018,Tin2019]]',
  hook:'Most people with primary gout are <b>renal under-excreters</b>. [[PerezRuiz2002Renal]] Many apparent overproducers are <b>gut under-excreters</b> (ABCG2). [[Ichida2012]]'}
];
const UR_BAL={healthy:{n:'Healthy balance',prod:1,kid:.67,txt:'Made and removed in balance; urate stays below saturation.'},
 under:{n:'Kidney under-excretes',prod:1,kid:.3,txt:'Normal production, too little leaves in the urine. The main mechanism in primary gout.'},
 over:{n:'Overproduction',prod:1.7,kid:.75,txt:'More made than usual; urine urate is high. Rare as a primary cause.'}};
const UR_TX=[
 {id:'URAT1',g:'SLC22A12',hl:'URAT1',to:.72,where:'Apical membrane of the proximal tubule (urine side).',
  does:'Reabsorbs urate in exchange for anions such as lactate, α-ketoglutarate and β-hydroxybutyrate, mainly after secretion, coupled to GLUT9. [[HalperinKuhns2021]] Identified in 2002 as the renal urate–anion exchanger. [[Enomoto2002]]',
  wrong:'Loss-of-function mutations cause renal hypouricaemia: plasma uric acid below 60 µM (< 1 mg/dL) and FEUA near 100%. [[So2010,Enomoto2002]] URAT1 affinity for uric acid rose during primate evolution, alongside the fall in uricase activity. <span class="ev early">Early evidence</span> [[Tan2016]]',
  drug:'The target of uricosuric and antiuricosuric drugs. [[Enomoto2002]] Dotinurad, a selective URAT1 inhibitor approved in Japan in 2020, barely inhibits ABCG2 or OAT1/3. [[Taniguchi2020]]'},
 {id:'GLUT9',g:'SLC2A9',hl:'GLUT9',to:.72,where:'Basolateral membrane of the proximal tubule (blood side).',
  does:'The exit door: urate taken up from the lumen leaves the cell for the blood through GLUT9. [[HalperinKuhns2021]] It has strong urate transport activity. [[Vitart2008]]',
  wrong:'Common variants explain 1.7–5.3% of the variance in serum uric acid and go with low FEUA and with gout. [[Vitart2008]] People homozygous for L75R have serum uric acid of 0.17 ± 0.2 mg/dL (≈ 10 µmol/L) and FEUA of about 150%. [[So2010]]',
  drug:'No approved drug acts on it in the sources used here.'},
 {id:'ABCG2',g:'BCRP',hl:'ABCG2',to:.72,where:'Apical brush border of the proximal tubule, the apical side of gut cells, and the liver\'s bile canaliculi. [[HalperinKuhns2021,Woodward2009]]',
  does:'A high-capacity urate exporter [[Matsuo2009]]: it secretes urate into the urine and into the gut. Secretion and URAT1 reabsorption can happen in the same tubule cell. [[HalperinKuhns2021]] HNF4A drives its transcription. [[Tin2019]]',
  wrong:'Q141K (rs2231142) cuts transport by 53%; it is carried by 11% of alleles in white people and 3% in Black people, raises gout odds 1.68-fold per allele and accounts for at least 10% of gout in white people. [[Woodward2009]] In UK Biobank, ABCG2 had the largest per-locus gout odds ratio, 2.04. [[Tin2019]] In Japan, genotypes cutting function by more than 75% gave OR 25.8. [[Matsuo2009]] Use the Q141K toggle above.',
  drug:'Loop diuretics inhibit ABCG2 directly, which reduces secretion. [[HalperinKuhns2021]]'},
 {id:'OAT1/3',g:'SLC22A6 / SLC22A8',hl:'OAT13',to:.72,where:'Basolateral membrane of the proximal tubule.',
  does:'Take urate up from the blood into the tubule cell, the first step of secretion. [[HalperinKuhns2021]]',
  wrong:'Part of the secretory route whose weakness lets urate build up. [[HalperinKuhns2021]]',
  drug:'Diuretics compete with urate here, so less is secreted. [[HalperinKuhns2021]] Diuretic use carried RR 1.77 for incident gout in men. [[Choi2005]]'},
 {id:'OAT4/10',g:'SLC22A11 / SLC22A13',hl:'OAT410',to:.72,where:'Apical membrane of the early proximal tubule.',
  does:'Probably do the first, bulk reabsorption of filtered urate from the lumen. [[HalperinKuhns2021]]',
  wrong:'Together with URAT1 and GLUT9 they bring back at least 90% of filtered urate. [[Chen2016]]',
  drug:'None named in the sources used here.'},
 {id:'NPT1/4',g:'SLC17A1 / SLC17A3',hl:'NPT',to:.72,where:'Apical membrane of the proximal tubule.',
  does:'Possible extra help for ABCG2 in secreting urate into the urine. [[HalperinKuhns2021]]',
  wrong:'Drawn dashed in the animation: their role is less certain than ABCG2\'s. [[HalperinKuhns2021]]',
  drug:'Loop diuretics inhibit NPT4. [[HalperinKuhns2021]]'},
 {id:'XOR',g:'XDH',hl:'XOR',to:.3,where:'Mostly liver; also gut, mammary gland, heart, skeletal muscle and vessel lining. [[Chen2016,HalperinKuhns2021]]',
  does:'Makes urate in two steps and is the rate-limiting enzyme. [[Chen2016,Furuhashi2020]]',
  wrong:'Each step makes reactive oxygen species. [[Chen2016]]',
  drug:'Allopurinol, a hypoxanthine analogue, and its metabolite oxipurinol inhibit xanthine oxidase. [[FDA-Zyloprim]] Febuxostat is a non-purine selective xanthine oxidase inhibitor. [[Becker2005]]'},
 {id:'Uricase',g:'UOX, silenced',hl:'UOX',to:.5,where:'Liver, in most mammals. A pseudogene in humans and apes. [[Oda2002]]',
  does:'Oxidises uric acid to allantoin, about 100 times more soluble. [[Chen2016]]',
  wrong:'Silenced in hominoids by a shared nonsense mutation, and separately in gibbons. [[Wu1992,Oda2002]]',
  drug:'Pegloticase is a PEGylated recombinant uricase. About 24 hours after the first 8 mg dose, the US label reports mean plasma uric acid of 0.7 mg/dL against 8.2 mg/dL on placebo. [[FDA-Krystexxa]]'},
 {id:'HPRT1',g:'X-linked',hl:'HPRT',to:.12,where:'Every cell: the purine salvage pathway.',
  does:'Puts hypoxanthine and guanine back into IMP and GMP. [[Torres2007]]',
  wrong:'Deficiency is X-linked recessive, with more than 300 mutations. Every patient overproduces uric acid, with stones and gout. About 1 in 380,000 live births in Canada and 1 in 235,000 in Spain. [[Torres2007]]',
  drug:'None specific.'},
 {id:'PRPS1',g:'X-linked',hl:'PRPS',to:.12,where:'Every cell: makes PRPP for purine synthesis.',
  does:'Supplies PRPP, which de novo synthesis and salvage both use. [[Torres2007]]',
  wrong:'Superactivity causes uric acid overproduction, often with hearing impairment and neurological features. [[deBrouwer2010]]',
  drug:'None specific.'},
 {id:'UMOD',g:'uromodulin',hl:'UMOD',to:.72,where:'Kidney tubule.',
  does:'Mutations cause a kidney disease, not a transporter defect. [[Eckardt2015]]',
  wrong:'Autosomal dominant tubulointerstitial kidney disease (ADTKD-UMOD), formerly "familial juvenile hyperuricaemic nephropathy". [[Eckardt2015]]',
  drug:'None specific.'}
];
inits.urate=()=>{
  const svg=$('#urSvg'),rg=$('#urT');let q=false,bal='healthy',hl=null;
  const ph=(t,k,n)=>((t*n+k)%1+1)%1;
  /* point at fraction u along a polyline */
  const along=(P,u)=>{let L=0;const seg=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);L+=d}
    let r=u*L;for(let i=0;i<seg.length;i++){if(r<=seg[i]){const f=seg[i]?r/seg[i]:0;return [lerp(P[i][0],P[i+1][0],f),lerp(P[i][1],P[i+1][1],f)]}r-=seg[i]}return P[P.length-1]};
  const dot=(x,y,o=1,r=3.4)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--gold);stroke:var(--panel);stroke-width:.8;opacity:${f1(o)}"/>`;
  function level(t){const gut=q?.33*.47:.33,B=UR_BAL[bal];
    let lv=lerp(5,5/(.67+gut),ease(ramp(t,.62,.72)));
    return lerp(lv,clamp(5*B.prod/(B.kid+gut),0,9.6),ease(ramp(t,.82,.92)))}
  /* ---- pathway column (same coordinates in both layouts) ---- */
  function pathway(t){
    let s='';const o1=ramp(t,0,.06),o2=ramp(t,.2,.27),o3=ramp(t,.4,.47);
    /* flowing purine → urate, drawn first so the boxes cover it: dots show in the arrow gaps */
    if(t>.03){const yMax=t<.2?150:300;for(let k=0;k<8;k++){const u=ph(t,k/8,7),y=lerp(46,yMax,u),c=y>262?'var(--gold)':'var(--muted)';
      s+=`<circle cx="118" cy="${f1(y)}" r="4" style="fill:${c};opacity:${f1(o1*(1-ramp(u,.92,1)))}"/>`}}
    const box=(y,a,b,st,o=1)=>`<g style="opacity:${f1(o)}"><rect x="30" y="${y-17}" width="176" height="34" rx="9" style="${st}"/><text x="118" y="${y-1}" class="t-lbl t-mid">${a}</text>${b?`<text x="118" y="${y+11}" class="t-xs t-mid">${b}</text>`:''}</g>`;
    const nst='fill:var(--panel);stroke:var(--line);stroke-width:1.5';
    /* sources */
    [['diet',52],['cell turnover',118],['de novo',184]].forEach(([l,x],i)=>{s+=`<g style="opacity:${f1(o1)}"><text x="${x}" y="18" class="t-xs t-mid" style="font-weight:700${hl==='PRPS'&&i===2?';fill:var(--terra)':''}">${l}</text><path d="M${x} 24 L${lerp(x,118,.6)} 48" class="arrow" marker-end="url(#urA)"/></g>`});
    s+=box(70,'Purine nucleotides','AMP · GMP · IMP',hl==='PRPS'?'fill:var(--terra-soft);stroke:var(--terra);stroke-width:2':nst);
    s+=`<path d="M118 87 V129" class="arrow" marker-end="url(#urA)"/><text x="126" y="113" class="t-xs">via inosine</text>`;
    s+=box(150,'Hypoxanthine','',nst);
    /* HPRT salvage arc */
    const hs=hl==='HPRT';
    s+=`<path d="M30 150 C6 150 6 70 26 70" style="fill:none;stroke:var(--good);stroke-width:${hs?3:1.8};stroke-dasharray:5 3" marker-end="url(#urG)"/><text x="12" y="${hs?106:106}" class="t-xs" transform="rotate(-90 12 110)" style="fill:var(--good);font-weight:700;text-anchor:middle">HPRT salvage</text>`;
    if(hs)s+=`<circle cx="10" cy="110" r="18" style="fill:var(--good);opacity:.15"/>`;
    /* XO steps */
    const xs=hl==='XOR',xo=(y)=>{let g=`<g style="opacity:${f1(Math.max(o2,.25))}"><rect x="140" y="${y-11}" width="52" height="22" rx="11" style="fill:${xs?'var(--warn-soft)':'var(--panel)'};stroke:var(--warn);stroke-width:${xs?2.5:1.5}"/><text x="166" y="${y+4}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XO</text>`;
      if(o2>0)for(let k=0;k<3;k++){const a=t*40+k*2.1,r=16+4*Math.sin(t*30+k);g+=`<circle cx="${f1(198+r*Math.cos(a)*.6)}" cy="${f1(y-8+r*Math.sin(a)*.5)}" r="2" style="fill:var(--warn);opacity:${f1(o2*.8)}"/>`}
      return g+'</g>'};
    s+=`<path d="M118 167 V208" class="arrow" marker-end="url(#urA)"/>`+xo(188);
    s+=`<text x="36" y="196" class="t-xs">guanine</text><path d="M58 200 L74 207" class="arrow" marker-end="url(#urA)"/>`;
    s+=box(225,'Xanthine','',nst);
    s+=`<path d="M118 242 V283" class="arrow" marker-end="url(#urA)"/>`+xo(263);
    s+=box(300,'Urate','monosodium urate at pH 7.4','fill:var(--gold-soft);stroke:var(--gold);stroke-width:2');
    if(o2>0)s+=`<text x="210" y="${xs?226:226}" class="t-xs" style="fill:var(--warn);opacity:${f1(o2)}">ROS</text>`;
    /* uricase, lost */
    const us=hl==='UOX',o3v=Math.max(o3,us?1:.0);
    if(o3v>0){s+=`<g style="opacity:${f1(o3v)}"><path d="M118 317 V363" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<rect x="140" y="329" width="66" height="22" rx="11" style="fill:${us?'var(--bad-soft)':'var(--panel)'};stroke:var(--bad);stroke-width:${us?2.5:1.5}"/><text x="173" y="344" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">uricase</text>`;
      s+=`<path d="M108 330l20 20M128 330l-20 20" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=box(380,'Allantoin','≈ 100× more soluble','fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3',.6)+'</g>'}
    return s;
  }
  /* ---- serum urate gauge ---- */
  function gauge(t,x,top,bot){
    const Y=v=>lerp(bot,top,v/10),lv=level(t);let s='';
    s+=`<text x="${x+20}" y="${top-24}" class="t-sm t-mid">serum</text><text x="${x+20}" y="${top-12}" class="t-sm t-mid">urate</text>`;
    s+=`<rect x="${x}" y="${top}" width="40" height="${bot-top}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${x+4}" y="${f1(Y(lv))}" width="32" height="${f1(bot-4-Y(lv))}" rx="9" style="fill:var(--gold);opacity:.9"/>`;
    [0,2,4,8,10].forEach(v=>s+=`<line x1="${x+40}" x2="${x+45}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="axis"/><text x="${x+48}" y="${f1(Y(v)+3)}" class="t-xs">${v}</text>`);
    const sy=Y(6.8);s+=`<line x1="${x-6}" x2="${x+46}" y1="${f1(sy)}" y2="${f1(sy)}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="${x+48}" y="${f1(sy+3)}" class="t-xs" style="fill:var(--xtal);font-weight:700">6.8</text>`;
    s+=`<text x="${x+20}" y="${bot+14}" class="t-xs t-mid">mg/dL</text>`;
    const o3=bump(t,.4,.62);
    if(o3>0)s+=`<g style="opacity:${f1(o3)}"><rect x="${x+2}" y="${f1(Y(2))}" width="36" height="${f1(Y(1)-Y(2))}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 2"/><text x="${x-4}" y="${f1(Y(1.5)+3)}" class="t-xs t-end" style="font-weight:700">mice</text></g>`;
    return s;
  }
  /* ---- scene panels, local 350 × 370 ---- */
  function p1(t){let s=`<text x="0" y="14" class="t-lbl">Where urate is made</text>`;
    s+=`<path d="M8 52 Q14 26 52 28 Q92 28 96 46 Q98 66 70 78 Q42 90 22 82 Q4 74 8 52 Z" style="fill:var(--memb);opacity:.35;stroke:var(--memb);stroke-width:1.5"/><text x="52" y="58" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">liver</text>`;
    s+=`<text x="110" y="44" class="t-lbl">Liver: main site</text><text x="110" y="60" class="t-xs">XOR also in gut, muscle, heart,</text><text x="110" y="72" class="t-xs">mammary gland and vessel lining</text>`;
    const o=ramp(t,.2,.28);
    s+=`<g style="opacity:${f1(Math.max(o,.3))}"><rect x="0" y="100" width="56" height="24" rx="12" style="fill:var(--panel);stroke:var(--warn)"/><text x="28" y="116" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XDH</text>`;
    s+=`<path d="M62 112 H124" class="arrow" marker-end="url(#urA)"/><rect x="130" y="100" width="56" height="24" rx="12" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="158" y="116" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">XO</text>`;
    s+=`<text x="196" y="110" class="t-xs">oxidation (reversible)</text><text x="196" y="122" class="t-xs">or proteolysis</text></g>`;
    const g=ease(ramp(t,.04,.18)),BX=86,BW=200;
    s+=`<text x="0" y="158" class="t-sm" style="fill:var(--ink)">Urate made per day · 2023 estimate</text>`;
    [['men',648],['women',489],['all',591]].forEach(([l,v],i)=>{const y=168+i*20;s+=`<text x="0" y="${y+11}" class="t-xs">${l}</text><rect x="${BX-30}" y="${y}" width="${f1(BW*v/700*g)}" height="13" rx="4" style="fill:var(--gold);opacity:${i===2?1:.7}"/><text x="${f1(BX-30+BW*v/700*g+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${v} mg</text>`});
    s+=`<text x="0" y="248" class="t-sm" style="fill:var(--ink)">Urate pool · isotope studies</text>`;
    [['men',1200,'1,200 mg'],['women',600,'600 mg']].forEach(([l,v,lb],i)=>{const y=258+i*20;s+=`<text x="0" y="${y+11}" class="t-xs">${l}</text><rect x="${BX-30}" y="${y}" width="${f1(BW*v/1400*g)}" height="13" rx="4" style="fill:var(--gold);opacity:.55"/><text x="${f1(BX-30+BW*v/1400*g+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${lb}</text>`});
    s+=`<text x="0" y="320" class="t-xs">Production: 123 anuric dialysis patients.</text><text x="0" y="334" class="t-xs">Pools: radio-isotope studies over 50 years old.</text>`;
    return s}
  function p2(t){let s=`<text x="0" y="14" class="t-lbl">Uricase: lost in apes</text>`;
    const X=v=>lerp(118,340,v/8),g=ease(ramp(t,.42,.5));
    s+=`<line x1="${f1(X(6.8))}" x2="${f1(X(6.8))}" y1="34" y2="110" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="${f1(X(6.8))}" y="30" class="t-xs t-mid" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    [['Rats, mice',1,2,'var(--muted)'],['Men (reference)',3.5,7,'var(--gold)'],['Women, premenop.',2.6,5.7,'var(--gold)']].forEach(([l,a,b,c],i)=>{const y=44+i*24;
      s+=`<text x="0" y="${y+10}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${f1(X(a))}" y="${y}" width="${f1((X(b)-X(a))*g)}" height="13" rx="6" style="fill:${c};opacity:${i===2?.55:.9}"/>`});
    s+=`<line x1="118" x2="340" y1="116" y2="116" class="axis"/>`;[0,2,4,6,8].forEach(v=>s+=`<text x="${f1(X(v))}" y="130" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="340" y="144" class="t-xs t-end">mg/dL</text>`;
    /* cladogram */
    const o=ramp(t,.44,.52),ln='stroke:var(--muted);stroke-width:2;fill:none';
    s+=`<g style="opacity:${f1(o)}"><text x="0" y="170" class="t-sm" style="fill:var(--ink)">Who lost it</text>`;
    s+=`<path d="M10 270 H50 M50 200 V300 M50 200 H200 M50 300 H90 M90 236 V330 M90 236 H200 M90 330 H130 M130 300 V350 M130 300 H200 M130 350 H200" style="${ln}"/>`;
    s+=`<text x="10" y="290" class="t-xs">apes</text>`;
    [['Gibbon',200],['Orangutan',236],['Chimpanzee',300],['Human',350]].forEach(([l,y])=>s+=`<text x="206" y="${y+4}" class="t-lbl">${l}</text>`);
    const X2=(x,y)=>`<path d="M${x-6} ${y-6}l12 12M${x+6} ${y-6}l-12 12" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
    s+=X2(150,200)+`<text x="150" y="190" class="t-xs t-mid" style="fill:var(--bad)">separate loss</text>`;
    s+=X2(70,300)+`<text x="4" y="336" class="t-xs" style="fill:var(--bad)">shared: codon 33</text><text x="4" y="348" class="t-xs" style="fill:var(--bad)">CGA→TGA, exon 2</text>`;
    s+=`<text x="96" y="170" class="t-xs">· two independent losses</text></g>`;
    return s}
  function p3(t){let s=`<text x="0" y="14" class="t-lbl">Kidney tubule</text>`;
    s+=`<rect x="0" y="24" width="350" height="34" rx="6" style="fill:var(--panel-2)"/><text x="6" y="36" class="t-xs">tubule lumen → urine</text>`;
    s+=`<rect x="0" y="62" width="350" height="88" rx="4" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="6" y="108" class="t-xs">tubule cell</text>`;
    s+=`<rect x="0" y="154" width="350" height="32" rx="6" style="fill:var(--terra-soft);opacity:.7"/><text x="6" y="180" class="t-xs">blood</text>`;
    const T=(id,x,y,lab,col,dash)=>{const on=hl===id,bad=q&&id==='ABCG2';
      return `<g>${on?`<rect x="${x-30}" y="${y-15}" width="60" height="30" rx="15" style="fill:${col};opacity:.2"/>`:''}<rect x="${x-24}" y="${y-9}" width="48" height="18" rx="9" style="fill:var(--panel);stroke:${bad?'var(--bad)':col};stroke-width:${on?3:1.8};${dash?'stroke-dasharray:3 2':''}"/><text x="${x}" y="${y+4}" class="t-xs t-mid" style="fill:${bad?'var(--bad)':col};font-weight:700">${lab}</text></g>`};
    const RE='var(--warn)',SE='var(--sea)';
    /* dots first, transporters on top */
    const reab=[[20,42],[120,42],[120,62],[110,106],[85,150],[85,170],[20,170]];
    const bulk=[[0,46],[50,46],[50,62],[70,106],[85,150],[85,170],[0,170]];
    const sec=[[340,170],[250,170],[250,150],[230,106],[210,62],[210,42],[350,42]];
    const pl=(P,c,dash)=>`<path d="M${P.map(p=>p.join(' ')).join('L')}" style="fill:none;stroke:${c};stroke-width:2;opacity:.45;stroke-linejoin:round${dash?';stroke-dasharray:4 3':''}"/>`;
    s+=pl(reab,'var(--warn)')+pl(bulk,'var(--warn)',1)+pl(sec,'var(--sea)');
    s+=`<text x="350" y="14" class="t-xs t-end"><tspan style="fill:var(--warn);font-weight:700">— back to blood</tspan>  <tspan style="fill:var(--sea);font-weight:700">— into urine</tspan></text>`;
    for(let k=0;k<5;k++){const [x,y]=along(reab,ph(t,k/5,5));s+=dot(x,y)}
    for(let k=0;k<3;k++){const [x,y]=along(bulk,ph(t,k/3+.1,5));s+=dot(x,y,.85)}
    const nS=q?2:4;for(let k=0;k<nS;k++){const [x,y]=along(sec,ph(t,k/nS,4));s+=dot(x,y)}
    s+=T('OAT410',50,62,'OAT4/10',RE)+T('URAT1',122,62,'URAT1',RE)+T('ABCG2',210,62,'ABCG2',SE)+T('NPT',290,62,'NPT1/4',SE,1);
    s+=T('GLUT9',85,150,'GLUT9',RE)+T('OAT13',250,150,'OAT1/3',SE);
    if(q)s+=`<text x="210" y="88" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">Q141K −53%</text>`;
    if(hl==='UMOD')s+=`<rect x="1" y="25" width="348" height="160" rx="6" style="fill:none;stroke:var(--terra);stroke-width:2.5;stroke-dasharray:6 4"/>`;
    s+=`<text x="0" y="204" class="t-sm" style="fill:var(--ink)">≥ 90% of filtered urate comes back · FEUA 5–15%</text>`;
    /* gut */
    s+=`<text x="0" y="230" class="t-lbl">Gut</text>`;
    s+=`<rect x="40" y="238" width="310" height="22" rx="6" style="fill:var(--terra-soft);opacity:.7"/><text x="46" y="253" class="t-xs">blood</text>`;
    s+=`<rect x="40" y="262" width="310" height="34" rx="4" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><text x="46" y="283" class="t-xs">gut cell</text>`;
    s+=`<rect x="40" y="300" width="310" height="22" rx="6" style="fill:var(--panel-2)"/><text x="46" y="315" class="t-xs">gut lumen → stool</text>`;
    const gp=[[150,249],[190,249],[200,279],[210,296],[230,311],[350,311]];const nG=q?1:3;
    for(let k=0;k<nG;k++){const [x,y]=along(gp,ph(t,k/nG+.2,4));s+=dot(x,y)}
    s+=T('ABCG2',210,296,'ABCG2',SE);
    /* split */
    const kw=q?.78:.67;const W=350;
    s+=`<rect x="0" y="336" width="${f1(W*kw)}" height="14" rx="4" style="fill:var(--sea)"/><rect x="${f1(W*kw+2)}" y="336" width="${f1(W*(1-kw)-2)}" height="14" rx="4" style="fill:var(--sea);opacity:.45"/>`;
    s+=`<text x="4" y="364" class="t-xs" style="fill:var(--ink);font-weight:700">kidney ≈ 2/3</text><text x="346" y="364" class="t-xs t-end" style="fill:var(--ink);font-weight:700">${q?'gut export ↓':'gut ≈ 1/3'}</text>`;
    return s}
  function p4(t){const B=UR_BAL[bal],gut=q?.33*.47:.33,lv=level(t);
    let s=`<text x="0" y="14" class="t-lbl">In vs out · ${B.n}</text>`;
    const pw=v=>f1(Math.max(2,v*16));
    /* inflow */
    s+=`<path d="M10 44 H175 V82" style="fill:none;stroke:var(--gold);stroke-width:${pw(B.prod*.6)};stroke-linejoin:round;opacity:.75"/>`;
    s+=`<text x="10" y="34" class="t-xs" style="fill:var(--ink);font-weight:700">${bal==='over'?'more made':'made: ≈ 591 mg/day'}</text>`;
    /* tank */
    const T0=82,T1=262,lvY=lerp(T1,T0,lv/10);
    s+=`<rect x="120" y="${T0}" width="110" height="${T1-T0}" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="122" y="${f1(lvY)}" width="106" height="${f1(T1-2-lvY)}" rx="4" style="fill:var(--gold);opacity:.8"/>`;
    const sy=lerp(T1,T0,.68);s+=`<line x1="114" x2="236" y1="${f1(sy)}" y2="${f1(sy)}" style="stroke:var(--xtal);stroke-width:2;stroke-dasharray:4 2"/><text x="112" y="${f1(sy+4)}" class="t-xs t-end" style="fill:var(--xtal);font-weight:700">6.8 saturation</text>`;
    s+=`<text x="175" y="${T0+14}" class="t-xs t-mid">body urate</text>`;
    /* outflows */
    s+=`<path d="M230 236 H300 V330" style="fill:none;stroke:var(--sea);stroke-width:${pw(B.kid)};stroke-linejoin:round"/>`;
    if(bal==='under')s+=`<path d="M262 ${236-14} l6 10 6-10 M262 ${236+14} l6 -10 6 10" style="fill:none;stroke:var(--bad);stroke-width:2.2"/>`;
    s+=`<text x="304" y="346" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">kidney</text>`;
    s+=`<path d="M150 262 V330" style="fill:none;stroke:var(--sea);stroke-width:${pw(gut)};opacity:.6"/><text x="150" y="346" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">gut${q?' (Q141K)':''}</text>`;
    /* moving urate */
    for(let k=0;k<4;k++){const [x,y]=along([[10,44],[175,44],[175,82]],ph(t,k/4,5));s+=dot(x,y,1,3.2*Math.sqrt(B.prod))}
    const nk=Math.max(1,Math.round(4*B.kid/.67));for(let k=0;k<nk;k++){const [x,y]=along([[230,236],[300,236],[300,330]],ph(t,k/nk,5));s+=dot(x,y)}
    const ng=Math.max(1,Math.round(3*gut/.33));for(let k=0;k<ng;k++){const [x,y]=along([[150,262],[150,330]],ph(t,k/ng+.3,5));s+=dot(x,y,.8)}
    const words=B.txt.split(' '),lines=[''];words.forEach(w=>{if((lines[lines.length-1]+' '+w).trim().length>19)lines.push(w);else lines[lines.length-1]=(lines[lines.length-1]+' '+w).trim()});
    lines.forEach((l,i)=>s+=`<text x="246" y="${96+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    s+=`<text x="350" y="364" class="t-xs t-end">pipe widths and level: schematic</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 420','400 800');
    const L=N?{gx:262,gt:58,gb:392,px:25,py:418}:{gx:252,gt:58,gb:392,px:358,py:30};
    let s=`<defs>${marker('urA')}${marker('urG','var(--good)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=pathway(t);
    s+=gauge(t,L.gx,L.gt,L.gb);
    /* urate leaves the pathway into the blood */
    s+=`<path d="M206 300 H${L.gx-8}" class="arrow" marker-end="url(#urA)" style="opacity:${f1(ramp(t,.22,.3))}"/>`;
    const pi=t<.4?0:t<.6?1:t<.8?2:3,st=[0,.4,.6,.8][pi],o=ramp(t,st,st+.05);
    const body=[p1,p2,p3,p4][pi](t);
    s+=`<g transform="translate(${L.px} ${L.py})" style="opacity:${f1(pi?o:1)}">${N?`<line x1="0" x2="350" y1="-10" y2="-10" class="axis"/>`:`<line x1="-12" x2="-12" y1="0" y2="370" class="axis"/>`}${body}</g>`;
    svg.innerHTML=s;
    const p=phaseOf(UR_STEPS,t);setSt(p);
    let extra='';
    if(q&&p>=3)extra+=`<div class="hook"><b>ABCG2 Q141K is on</b>This common variant (rs2231142) cut urate transport by 53%, raised gout odds 1.68-fold per allele, and accounts for at least 10% of gout in white people. [[Woodward2009]]</div>`;
    if(p===4)extra+=`<div class="pt"><b>Balance shown: ${UR_BAL[bal].n}</b>${UR_BAL[bal].txt}</div>`;
    $('#urNote').innerHTML=noteHTML(UR_STEPS[p])+extra;
    $('#urCap').textContent=`${q?'ABCG2 Q141K':'Usual ABCG2'} · balance: ${UR_BAL[bal].n.toLowerCase()}. Schematic, not to scale; the gauge level, pipe widths and dot counts are illustrative.`;
  }
  const stop=playWire(rg,$('#urPlay'),draw,20000,'Replay','urate');
  const setSt=stepWire($('#urSteps'),UR_STEPS,rg,draw,stop);
  const tog=v=>{q=v;$('#urWT').setAttribute('aria-pressed',!v);$('#urQK').setAttribute('aria-pressed',v);if(+rg.value<.6){stop();rg.value=.72}draw(+rg.value)};
  $('#urWT').onclick=()=>tog(false);$('#urQK').onclick=()=>tog(true);
  $('#urBal').innerHTML=Object.keys(UR_BAL).map(k=>`<button class="btn" data-bal="${k}" aria-pressed="${k==='healthy'}">${UR_BAL[k].n}</button>`).join('');
  $('#urBal').addEventListener('click',e=>{const b=e.target.closest('[data-bal]');if(!b)return;bal=b.dataset.bal;
    $$('[data-bal]',$('#urBal')).forEach(x=>x.setAttribute('aria-pressed',x===b));if(+rg.value<.8){stop();rg.value=.92}draw(+rg.value)});
  /* transporter chips: highlight in the scene, jump to where it lives */
  function pick(id,jump){const X=UR_TX.find(x=>x.id===id);hl=X.hl;
    $$('[data-tx]',$('#urChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tx===id));
    $('#urTx').innerHTML=`<span class="kicker">${X.g}</span><h4>${X.id}</h4><dl><dt>Where</dt><dd>${X.where}</dd><dt>What it does</dt><dd>${X.does}</dd><dt>When it goes wrong</dt><dd>${X.wrong}</dd><dt>Drugs that act here</dt><dd>${X.drug}</dd></dl>`;
    if(jump){const sc=phaseOf(UR_STEPS,+rg.value),want=phaseOf(UR_STEPS,X.to);if(sc!==want){stop();rg.value=X.to}draw(+rg.value)}}
  $('#urChips').innerHTML=UR_TX.map(x=>`<button class="btn" data-tx="${x.id}" aria-pressed="false">${x.id}</button>`).join('');
  $('#urChips').addEventListener('click',e=>{const b=e.target.closest('[data-tx]');if(b)pick(b.dataset.tx,true)});
  pick('URAT1',false);
  draw(+rg.value);

  $('#urGenes').innerHTML=`
   <div class="card"><span class="kicker">Urate variance explained</span><span class="big">23.9% vs ≤ 0.3%</span><p>In 16,760 US adults of European ancestry, common genetic variation explained 23.9% of the variation in serum urate; each diet score explained 0.3% or less. <span class="ev est">Established</span> [[Major2018]]</p></div>
   <div class="card"><span class="kicker">Heritability</span><span class="big">30–60%</span><p>Serum urate heritability as given by Tin et al.; one pedigree study estimated 37% (95% credible interval 29–45%). [[Tin2019]] Another review gives 40–70% for gout risk and serum urate. [[HalperinKuhns2021]]</p></div>
   <div class="card"><span class="kicker">GWAS loci</span><span class="big">28 → 183 → 377</span><p>28 urate loci in 2013 [[Kottgen2013]]; 183 in 457,690 people in 2019, explaining 7.7% of urate variance and pointing to kidney and liver [[Tin2019]]; 377 gout loci in 2.6 million people in 2024, including NLRP3 inflammasome genes. <span class="ev early">Early evidence</span> [[Major2024]]</p></div>
   <div class="card"><span class="kicker">Genetic risk score</span><span class="big">0.1% → 12.9%</span><p>Gout prevalence from the lowest to the highest urate genetic-risk category in 334,880 UK Biobank participants (adjusted OR 0.09 to 13.6). With age and sex the score gave an AUC of 0.84. [[Tin2019]]</p></div>
   <div class="card"><span class="kicker">From urate to gout</span><p>Excretion by kidney and gut dominates the genetic control of serum urate. Inflammasome-pathway genes help decide who goes on from high urate to gout. [[Major2018Genet]]</p></div>
   <div class="card"><span class="kicker">Genes meet medicines</span><p>In 3,524 people with hypertension, thiazide or loop diuretics went with gout (OR 2.13) only in those with a high genetic urate score; OR 0.40 (not significant) with a low score. [[McAdamsDeMarco2013]]</p></div>
   <div class="card"><span class="kicker">So is diet irrelevant?</span><p>No, but it answers a different question. In US men, body weight, alcohol, diet and diuretics together accounted for 77% of new gout. [[McCormick2020]] The ACR 2020 panel asked clinicians to be mindful when asking about diet, given the strong genetic contribution. [[FitzGerald2020]] More in <a href="#living" data-go="living">Living with gout</a>.</p></div>`;
  $('#urWhy').innerHTML=`
   <div class="card"><h4>An antioxidant <span class="ev hyp">Hypothesis</span></h4><p>In vitro, urate is about as effective an antioxidant as ascorbate, and plasma urate (about 300 µM, ≈ 5.0 mg/dL) far exceeds plasma ascorbate. Perhaps it helped longer lives. [[Ames1981]] Inside cells urate may act as a pro-oxidant instead. [[Sautin2008]]</p></div>
   <div class="card"><h4>A stand-in for vitamin C <span class="ev hyp">Hypothesis</span></h4><p>Urate may have risen to make up for the lost ability to make ascorbic acid. [[Furuhashi2020]]</p></div>
   <div class="card"><h4>Blood pressure on a low-salt diet <span class="ev hyp">Hypothesis</span></h4><p>In rats, mild hyperuricaemia raised blood pressure by a renin-dependent route, most clearly on low salt. The proposed advantage dates to the Miocene. [[Watanabe2002]]</p></div>
   <div class="card"><h4>Fructose to fat <span class="ev hyp">Hypothesis</span></h4><p>Resurrected ancestral uricases in liver cells support the idea that losing uricase helped fruit-eating apes turn fructose into fat when forests changed. [[Kratzer2014]]</p></div>
   <div class="card"><h4>Kidney and enzyme changed together <span class="ev early">Early evidence</span></h4><p>URAT1's grip on uric acid tightened during primate evolution as uricase activity fell, 27–77 million years ago. [[Tan2016]]</p></div>
   <div class="card"><h4>The drug that puts it back</h4><p>Pegloticase is a PEGylated recombinant uricase: it turns uric acid into allantoin, which the kidneys clear. [[FDA-Krystexxa]] See <a href="#ult" data-go="ult">How urate-lowering drugs work</a>.</p></div>`;
  $('#urTypes').innerHTML=`
   <tr class="hl"><th>Renal under-excretion</th><td>The kidney clears too little for the load: low urate clearance and FEUA.</td><td>The main mechanism in primary gout, even in "high output" patients. [[PerezRuiz2002Renal,So2010]]</td><td>Common variants in GLUT9, URAT1 and ABCG2 [[Vitart2008,Woodward2009]]; diuretics [[HalperinKuhns2021]]; ADTKD-UMOD [[Eckardt2015]]</td></tr>
   <tr><th>Renal overload: gut under-excretion</th><td>ABCG2 dysfunction cuts export into the gut; urinary urate rises.</td><td>Proposed for many people once called overproducers. <span class="ev early">Early evidence</span> [[Ichida2012]]</td><td>ABCG2 Q141K, Q126X [[Woodward2009,Matsuo2009]]</td></tr>
   <tr><th>Renal overload: true overproduction</th><td>More urate is made than usual.</td><td>Rare.</td><td>HPRT deficiency, about 1 in 380,000 live births in Canada [[Torres2007]]; PRPS1 superactivity [[deBrouwer2010]]</td></tr>`;
};
