/* =============== 1.3 The 13 types (2017) =============== */
/* one row per type; n = rough rarity for sorting (1 in n; reported-case counts sort as rarest) */
const TY_ROWS={
 cEDS:{ab:'cEDS',name:'Classical EDS',genes:'COL5A1, COL5A2 (rarely COL1A1)',inh:'AD',grp:0,tis:'skin',n:2e4,
  maj:`Generalised joint hypermobility; skin hyperextensibility with atrophic scarring. [[VanDijk2024]]`,
  freq:`About 1 in 20,000. [[VanDijk2024]]`,risk:`Arterial complications in 7 of 154 people (4.5%) in a UK cohort, mostly medium-sized vessels. [[Angwin2020]]`},
 vEDS:{ab:'vEDS',name:'Vascular EDS',genes:'COL3A1',inh:'AD',grp:0,tis:'vessels',n:5e4,
  maj:`Arterial aneurysm and/or dissection; sigmoid colon perforation without diverticular or other colon disease; uterine rupture in the third trimester without a previous caesarean or severe perineal tear; carotid-cavernous sinus fistula without trauma. [[VanDijk2024]]`,
  freq:`1 in 50,000 to 1 in 200,000. [[Byers2017]]`,risk:`Arterial, bowel and uterine rupture. Median survival was 51 years in 1,231 people, lower in men: a population figure, not a prediction. [[Pepin2014]] See <a href="#vascular" data-go="vascular">Vascular EDS</a>.`},
 aEDS:{ab:'aEDS',name:'Arthrochalasia EDS',genes:'COL1A1, COL1A2 (exon 6)',inh:'AD',grp:0,tis:'joints',n:1e6,
  maj:`Hallmark: congenital bilateral hip dislocation with severe generalised joint hypermobility and recurrent subluxations. [[VanDijk2024,Ayoub2020]]`,
  freq:`Fewer than 1 in 1,000,000; about 42 people published by 2020. [[VanDijk2024,Ayoub2020]]`,risk:`In 12 UK patients, 9 had fractures and 4 used a wheelchair or could not walk unaided. [[Ayoub2020]]`},
 dEDS:{ab:'dEDS',name:'Dermatosparaxis EDS',genes:'ADAMTS2',inh:'AR',grp:0,tis:'skin',n:1.5e6,
  maj:`An updated set of 9 major criteria; extreme skin fragility with redundant, almost lax skin. [[VanDijk2024,VanDamme2016]]`,
  freq:`Fewer than 1 in 1,000,000; 15 people reported by 2025. [[VanDijk2024,Angwin2025]]`,risk:`Skin injury, redundant skin folds often needing resection, and fractures in 5 adults. [[Angwin2025]]`},
 cvEDS:{ab:'cvEDS',name:'Cardiac-valvular EDS',genes:'COL1A2 (both copies)',inh:'AR',grp:0,tis:'vessels',n:1e8,
  maj:`Heart-valve disease, first affecting the mitral valve. [[Guarnieri2019]]`,
  freq:`7 people reported, aged 6 to 65. [[VanDijk2024,Guarnieri2019]]`,risk:`Valve disease without the bone fragility of other COL1A2 conditions. [[Schwarze2004]]`},
 kEDS:{ab:'kEDS',name:'Kyphoscoliotic EDS',genes:'PLOD1, FKBP14',inh:'AR',grp:1,tis:'muscle',n:1e5,
  maj:`Congenital muscle hypotonia; congenital or early-onset kyphoscoliosis; generalised joint hypermobility with dislocations or subluxations. [[VanDijk2024]]`,
  freq:`About 1 in 100,000. [[VanDijk2024]]`,risk:`PLOD1: rupture or dissection of medium-sized arteries. [[RohrbachGR-kEDS]] FKBP14: hearing loss common, vascular complications rare. [[Baumann2012,Giunta2018]]`},
 clEDS:{ab:'clEDS',name:'Classical-like EDS (type 1)',genes:'TNXB',inh:'AR',grp:2,tis:'skin',n:2e6,
  maj:`Key features (no formal criteria quoted here): hyperextensible skin without atrophic scars, joint hypermobility, easy bruising. [[Schalkwijk2001,Demirdas2017]]`,
  freq:`Fewer than 1 in 1,000,000. [[VanDijk2024]]`,risk:`In the literature, gastrointestinal rupture in 16% and major vascular events in 5%; foot abnormalities in 81%. [[VanDijk2024]]`},
 clEDS2:{ab:'clEDS2',name:'Classical-like EDS type 2 (after 2017)',genes:'AEBP1',inh:'AR',grp:2,tis:'skin',n:1e9,post:1,
  maj:`No formal diagnostic criteria yet. Described with joint laxity, hyperextensible skin, poor wound healing and osteoporosis. [[VanDijk2024,Blackburn2018]]`,
  freq:`About 11 to 15 people described. [[Angwin2023,VanDijk2024]]`,risk:`Arterial aneurysm or dissection in 3 of 15; bowel rupture in 2 of 15. [[VanDijk2024]]`},
 mEDS:{ab:'mEDS',name:'Myopathic EDS',genes:'COL12A1',inh:'AD/AR',grp:2,tis:'muscle',n:3e6,
  maj:`Congenital hypotonia that improves with age. [[VanDijk2024]]`,
  freq:`Fewer than 1 in 1,000,000; 25 people from 16 families. [[VanDijk2024]]`,risk:`Muscle weakness; some argue it is better classed as a congenital myopathy. [[VanDijk2024]]`},
 spEDS:{ab:'spEDS',name:'Spondylodysplastic EDS',genes:'B4GALT7, B3GALT6, SLC39A13',inh:'AR',grp:3,tis:'bones',n:4e6,
  maj:`Short stature; muscle hypotonia; bowing of the limbs. [[VanDijk2024]]`,
  freq:`Fewer than 1 in 1,000,000. [[VanDijk2024]]`,risk:`In 12 people with B3GALT6 variants, some had aortic dilatation or aneurysm, cervical spine instability or respiratory insufficiency. [[VanDamme2018]]`},
 mcEDS:{ab:'mcEDS',name:'Musculocontractural EDS',genes:'CHST14, DSE',inh:'AR',grp:3,tis:'joints',n:5e6,
  maj:`Characteristic craniofacial, skeletal, skin and eye features, present in over 90% of 66 people. [[Minatogawa2022]]`,
  freq:`Fewer than 1 in 1,000,000; 66 people from 48 families with CHST14 variants. [[VanDijk2024,Minatogawa2022]]`,risk:`Median age 6 at the first dislocation and at the first large subcutaneous haematoma. [[Minatogawa2022]]`},
 pEDS:{ab:'pEDS',name:'Periodontal EDS',genes:'C1R, C1S',inh:'AD',grp:4,tis:'teeth',n:1e7,
  maj:`Generalised lack of attached gingiva (pathognomonic); periodontitis starting young. [[KapfererSeebacher2021,VanDijk2024]]`,
  freq:`148 people reported since the 1970s. [[KapfererSeebacherGR-pEDS]]`,risk:`On average, all teeth are lost by about age 20. [[VanDijk2024]]`},
 BCS:{ab:'BCS',name:'Brittle cornea syndrome',genes:'ZNF469, PRDM5',inh:'AR',grp:5,tis:'eyes',n:2e7,
  maj:`Thin cornea with or without rupture; early progressive keratoconus or keratoglobus; blue sclerae. [[VanDijk2024]]`,
  freq:`85 people in a literature review (53 ZNF469, 32 PRDM5). [[Dhooge2021]]`,risk:`Corneal rupture; musculoskeletal signs can come before it. [[Dhooge2021]]`},
 hEDS:{ab:'hEDS',name:'Hypermobile EDS',genes:'no gene known',inh:'AD*',grp:6,tis:'joints',n:0,
  maj:`Clinical diagnosis: Criterion 1 (generalised joint hypermobility), Criterion 2 (two or more of features A, B and C) and Criterion 3 (exclusions) must all be met. [[Malfait2017,Fairweather2025]] See <a href="#criteria" data-go="criteria">The 2017 hEDS criteria</a>.`,
  freq:`No type-specific figure. Diagnosed EDS or joint hypermobility syndrome in Wales: 194.2 per 100,000, mostly hypermobility. Likely the most common heritable connective tissue disorder. [[Demmler2019,Tinkle2017]]`,risk:`Joint instability, pain and fatigue are covered in Part 3. No gene test can confirm it. [[Hakim2024GeneReviews]]`}
};
const TY_GRP=[
 {w:['Collagen','structure and','processing'],n:'Collagen primary structure and processing'},
 {w:['Collagen','folding and','cross-linking'],n:'Collagen folding and cross-linking'},
 {w:['Myomatrix','structure and','function'],n:'Structure and function of myomatrix'},
 {w:['Glycosamino-','glycan','synthesis'],n:'Glycosaminoglycan biosynthesis'},
 {w:['Complement','pathway'],n:'Complement pathway'},
 {w:['Intracellular','processes'],n:'Intracellular processes'},
 {w:['Unresolved'],n:'Unresolved'}
];
/* leaves on the map: spEDS sits in two groups because its genes do */
const TY_LEAF=[
 {k:'cEDS',g:0,gl:['COL5A1','COL5A2']},{k:'vEDS',g:0,gl:['COL3A1']},{k:'aEDS',g:0,gl:['COL1A1/A2','exon 6']},{k:'dEDS',g:0,gl:['ADAMTS2']},{k:'cvEDS',g:0,gl:['COL1A2','both copies']},
 {k:'kEDS',g:1,gl:['PLOD1','FKBP14']},
 {k:'clEDS',g:2,gl:['TNXB']},{k:'mEDS',g:2,gl:['COL12A1']},{k:'clEDS2',g:2,gl:['AEBP1','after 2017']},
 {k:'spEDS',g:3,gl:['B4GALT7','B3GALT6']},{k:'mcEDS',g:3,gl:['CHST14','DSE']},
 {k:'pEDS',g:4,gl:['C1R','C1S']},
 {k:'spEDS',g:5,gl:['SLC39A13'],again:1},{k:'BCS',g:5,gl:['ZNF469','PRDM5']},
 {k:'hEDS',g:6,gl:['no gene','clinical']}
];
const TY_STEPS=[
 {k:'Group 1 of 7',t:'Collagen primary structure and processing',
  txt:`Five types whose gene makes a fibrillar collagen chain, or the enzyme that trims one. Classical EDS is mostly too little type V collagen [[Symoens2012]]; vascular EDS changes type III procollagen [[Byers2017]]; arthrochalasia EDS removes the N-proteinase cut site in exon 6 of COL1A1 or COL1A2 [[Byers1997]]; dermatosparaxis EDS removes the enzyme, ADAMTS2 [[Colige1999]]; and cardiac-valvular EDS makes no proα2(I) chains at all. [[Schwarze2004]] The 2017 scheme groups types whose proteins work in the same pathway. [[Malfait2017]]`,
  pt:`These types all come from a fault in collagen itself, or in the enzyme that finishes it.`,
  hook:`aEDS and dEDS block the same step: aEDS loses the cut site in the substrate (exon 6), dEDS loses the enzyme (ADAMTS2). [[Byers1997,Colige1999]]`},
 {k:'Group 2 of 7',t:'Collagen folding and cross-linking',
  txt:`Kyphoscoliotic EDS has two genes. PLOD1 makes lysyl hydroxylase 1, needed for hydroxylysine and its cross-links [[Yeowell2000]]; FKBP14 is a folding catalyst in the endoplasmic reticulum. The two forms look almost the same, but in FKBP14-kEDS urinary pyridinolines are normal and hearing loss is common. [[Baumann2012]] Both are recessive, with a reported prevalence of about 1 in 100,000. [[VanDijk2024]]`,
  pt:`Here collagen is made but not finished properly: it is folded or tied together badly.`,
  hook:`PLOD1-kEDS: raised urinary deoxypyridinoline-to-pyridinoline ratio. FKBP14-kEDS: normal ratio, often hearing loss. [[RohrbachGR-kEDS,Baumann2012]]`},
 {k:'Group 3 of 7',t:'Structure and function of myomatrix',
  txt:`Tenascin-X (TNXB) regulates how collagen is deposited; its recessive loss causes classical-like EDS, with hyperextensible skin but no atrophic scars. [[Mao2002,Schalkwijk2001]] Myopathic EDS (COL12A1) has been found with both dominant and recessive variants. [[Zou2014COL12A1]] Classical-like EDS type 2 (AEBP1) was described in 2018, after the 2017 classification, which is why a 2020 primer counts 14 types. [[Blackburn2018,Malfait2020]]`,
  pt:`These proteins help organise collagen in the tissue around cells and muscles.`,
  hook:`clEDS (TNXB) is recessive: stretchy skin, easy bruising, no atrophic scars. [[Schalkwijk2001,Demirdas2017]]`},
 {k:'Group 4 of 7',t:'Glycosaminoglycan biosynthesis',
  txt:`Proteoglycans carry long sugar chains called glycosaminoglycans. B4GALT7 and B3GALT6 build the linker that attaches those chains (spondylodysplastic EDS). [[Malfait2013B3GALT6,FaiyazUlHaque2004]] CHST14 and DSE make dermatan sulfate; without them, musculocontractural EDS results. [[Dundar2009,Muller2013]]`,
  pt:`Collagen needs sugar-coated helper proteins to bundle properly. These types break the sugar chains.`,
  hook:`Musculocontractural EDS = a dermatan sulfate defect (CHST14 or DSE). [[Dundar2009,Muller2013]]`},
 {k:'Group 5 of 7',t:'Complement pathway',
  txt:`Periodontal EDS is caused by heterozygous gain-of-function variants in C1R or C1S, subunits of the first complement component: the one type outside the collagen and proteoglycan pathways. [[KapfererSeebacherGR-pEDS,KapfererSeebacher2016]] A generalised lack of attached gingiva was present in all 12 children carrying the familial variant and in none of the 7 who did not. [[KapfererSeebacher2021]]`,
  pt:`A part of the immune system, not collagen, causes this type. It shows first in the gums.`,
  hook:`pEDS: complement genes C1R/C1S; lack of attached gingiva is pathognomonic. [[KapfererSeebacher2016,KapfererSeebacher2021]]`},
 {k:'Group 6 of 7',t:'Intracellular processes',
  txt:`SLC39A13, an ER zinc transporter, is the third spondylodysplastic EDS gene: lysine and proline end up under-hydroxylated. [[Giunta2008]] Brittle cornea syndrome (ZNF469, PRDM5) probably involves transcription factors for matrix components. [[Dhooge2021,BurkittWright2011]] Its genes should be on connective-tissue panels, because people can present with joint findings before any corneal rupture. [[Dhooge2021]]`,
  pt:`These faults are inside the cell, in the machinery that controls or supports collagen making.`,
  hook:`Brittle cornea syndrome: thin cornea, keratoconus or keratoglobus, blue sclerae. [[VanDijk2024]]`},
 {k:'Group 7 of 7',t:'Unresolved: hypermobile EDS',
  txt:`For every type except hEDS, a definite diagnosis needs molecular confirmation: finding the causative variant(s). [[Malfait2017]] hEDS has no known genetic, epigenetic or metabolomic cause and is diagnosed with the 2017 clinical criteria. [[Hakim2024GeneReviews]] It is likely the most common heritable connective tissue disorder. [[Tinkle2017]] At publication the 13 types were linked to 19 genes; by 2020 the count was 20. [[Ritelli2019,Malfait2020]]`,
  pt:`Twelve types can be confirmed with a gene test. Hypermobile EDS cannot yet, so doctors diagnose it from a careful examination.`,
  hook:`13 types, 12 with a known gene. hEDS is the exception: clinical diagnosis, no gene test. [[Malfait2017,Hakim2024GeneReviews]]`}
].map((s,i)=>Object.assign({from:i/7,at:(i+.85)/7},s));
const TY_FLIP=[
 {f:'EDS type I (gravis) and type II (mitis)',b:`Classical EDS (cEDS). Mostly COL5A1 or COL5A2 variants. [[Malek2021,Symoens2012]]`},
 {f:'EDS type III',b:`Hypermobile EDS (hEDS): Berlin type III = Villefranche hypermobility type = 2017 hEDS. [[Malek2021]]`},
 {f:'EDS type IV (arterial-ecchymotic)',b:`Vascular EDS (vEDS), caused by COL3A1. [[Malek2021,Pepin2000]]`},
 {f:'EDS type VI',b:`Kyphoscoliotic EDS, PLOD1 form (lysyl hydroxylase 1 deficiency). [[Yeowell2000]]`},
 {f:'EDS type VIIA and VIIB',b:`Arthrochalasia EDS: exon 6 of COL1A1 or COL1A2. [[Byers1997]]`},
 {f:'EDS type VIIC',b:`Dermatosparaxis EDS: ADAMTS2, the procollagen N-proteinase. [[Colige1999]]`},
 {f:'Types V, IX, X and XI',b:`Dropped from EDS: X-linked type V, occipital horn syndrome (IX), fibronectin-deficient type X and familial hypermobility type XI. [[Malek2021]]`},
 {f:'Joint hypermobility syndrome (Brighton criteria)',b:`Folded with Villefranche hEDS into the 2017 hEDS; people who do not meet the stricter criteria are diagnosed with hypermobility spectrum disorder. [[Tinkle2017,Castori2017,Carroll2023]]`}
];

inits.types=()=>{
  const svg=$('#tySvg'),rg=$('#tyT');let mode='inh',setSt=()=>{};
  const T=(x,y,s,c='t-xs',st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INHC={AD:'var(--dx)',AR:'var(--gold)','AD/AR':'var(--accent)','AD*':'var(--muted)'};
  const TIS={skin:['skin','var(--skin-line)'],joints:['joints','var(--dx)'],vessels:['vessels and heart','var(--vas)'],eyes:['eyes','var(--nerve)'],muscle:['muscle','var(--muscle)'],teeth:['teeth and gums','var(--gold)'],bones:['bones','var(--bone-line)']};
  const col=r=>mode==='inh'?INHC[r.inh]:TIS[r.tis][1];
  function leg(){$('#tyLeg').innerHTML=mode==='inh'
    ?`<span><i style="background:var(--dx)"></i>autosomal dominant (AD)</span><span><i style="background:var(--gold)"></i>autosomal recessive (AR)</span><span><i style="background:var(--accent)"></i>either</span><span><i style="background:var(--muted)"></i>hEDS: dominant pattern, no gene</span>`
    :Object.values(TIS).map(v=>`<span><i style="background:${v[1]}"></i>${v[0]}</span>`).join('')}
  function leaf(x,y,w,h,L,a,hot,N){const r=TY_ROWS[L.k],c=col(r),dash=L.k==='hEDS'||r.post;let s=`<g style="opacity:${f1(.13+.87*a)}">`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="7" style="fill:var(--panel);stroke:${c};stroke-width:${hot?2.2:1.3}${dash?';stroke-dasharray:4 3':''}"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y+4)}" width="4.5" height="${h-8}" rx="2" style="fill:${c}"/>`;
    s+=T(x+10,y+15,r.ab,'t-lbl');
    L.gl.forEach((g,i)=>s+=T(x+10,y+28+i*11,g,'t-xs',i&&(L.k==='hEDS'||r.post||L.k==='cvEDS'||L.k==='aEDS')?'font-style:italic':''));
    const lab=r.inh==='AD*'?'AD?':r.inh,bw=lab.length>3?38:27,bx=N?x+9:x+w-bw-4,by=N?y+h-15:y+4;
    s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${bw}" height="12" rx="3" style="fill:${INHC[r.inh]}"/>`+T(bx+bw/2,by+9,lab,'t-xs t-mid','fill:var(--panel);font-weight:700;font-size:8.5px');
    if(L.k!=='hEDS')s+=`<path d="M${f1(x+w-14)} ${f1(y+h-10)}l3.5 4 6-8" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
    return s+'</g>'}
  function draw(t){
    const N=vb(svg,'720 380','400 670'),ph=phaseOf(TY_STEPS,t);
    const prog=g=>g<ph?1:g>ph?0:ramp(t,TY_STEPS[g].from,TY_STEPS[g].from+(1/7)*.8);
    let s='',shown=new Set();
    if(!N){
      s+=`<rect x="250" y="8" width="220" height="30" rx="9" style="fill:var(--brand);"/>`+T(360,27,'Ehlers-Danlos syndromes · 2017','t-sm t-mid','fill:var(--on-brand);font-weight:600');
      s+=`<path d="M360 38V48M${f1(20+97/2)} 48H${f1(20+6*97+97/2)}" style="fill:none;stroke:var(--line);stroke-width:1.4"/>`;
      TY_GRP.forEach((G,g)=>{const cx=20+g*97+97/2,a=prog(g),hot=g===ph;
        s+=`<path d="M${f1(cx)} 48V56" style="stroke:var(--line);stroke-width:1.4"/>`;
        G.w.forEach((l,i)=>s+=T(cx,66+i*11,l,'t-xs t-mid',hot?'fill:var(--ink);font-weight:700':''));
        TY_LEAF.filter(L=>L.g===g).forEach((L,i,arr)=>{const la=clamp(a*arr.length-i);if(la>0&&!L.again)shown.add(L.k);
          s+=leaf(20+g*97+3.5,104+i*52,90,46,L,la,hot&&la>0,false)})});
    }else{
      s+=`<rect x="110" y="6" width="180" height="26" rx="8" style="fill:var(--brand)"/>`+T(200,23,'EDS · 2017 classification','t-sm t-mid','fill:var(--on-brand);font-weight:600');
      let y=46;
      TY_GRP.forEach((G,g)=>{const a=prog(g),hot=g===ph,lv=TY_LEAF.filter(L=>L.g===g);
        s+=T(14,y+12,`${String.fromCharCode(65+g)} · ${G.n}`,'t-xs',hot?'fill:var(--ink);font-weight:700':'');
        lv.forEach((L,i)=>{const la=clamp(a*lv.length-i);if(la>0&&!L.again)shown.add(L.k);s+=leaf(14+i*75,y+18,70,58,L,la,hot&&la>0,true)});
        y+=86});
    }
    svg.innerHTML=s;setSt(ph);
    $('#tyNote').innerHTML=noteHTML(TY_STEPS[ph]);
    const n13=[...shown].filter(k=>k!=='clEDS2').length;
    rg.setAttribute('aria-valuetext',`${TY_STEPS[ph].t}: ${n13} of 13 types shown`);
  }
  const stop=playWire(rg,$('#tyPlay'),draw,16000,'Replay','types');
  setSt=stepWire($('#tySteps'),TY_STEPS,rg,draw,stop);
  $$('[data-tycol]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.tycol;$$('[data-tycol]').forEach(x=>x.setAttribute('aria-pressed',x===b));leg();draw(+rg.value)}));
  leg();draw(+rg.value);

  /* ---- comparator ---- */
  const KEYS=Object.keys(TY_ROWS),A=$('#tyA'),B=$('#tyB');
  const opt=KEYS.map(k=>`<option value="${k}">${TY_ROWS[k].ab} · ${TY_ROWS[k].name}</option>`).join('');
  A.innerHTML=opt;B.innerHTML=opt;A.value='cEDS';B.value='vEDS';
  const INH={AD:'Autosomal dominant',AR:'Autosomal recessive','AD/AR':'Dominant or recessive','AD*':'Dominant pattern; no gene known'};
  function card(k){const r=TY_ROWS[k];
    return `<div class="card tycard"><div class="tags"><span class="tag ${r.inh==='AR'?'warn':r.inh==='AD'?'dx':''}">${INH[r.inh]}</span>${k==='hEDS'?'<span class="tag">Clinical diagnosis</span>':'<span class="tag good">Molecular confirmation</span>'}${r.post?'<span class="tag">After 2017</span>':''}</div>
      <h4>${r.name}</h4><dl class="kv"><div><dt>Gene(s)</dt><dd>${r.genes}</dd></div><div><dt>Pathway group</dt><dd>${TY_GRP[r.grp].n}</dd></div><div><dt>Main tissue</dt><dd>${TIS[r.tis][0]}</dd></div>
      <div><dt>${k==='clEDS'||r.post||k==='mEDS'||k==='mcEDS'||k==='cvEDS'?'Key features':'Major criteria'}</dt><dd>${r.maj}</dd></div><div><dt>How common</dt><dd>${r.freq}</dd></div><div><dt>Key risk</dt><dd>${r.risk}</dd></div></dl></div>`}
  function cmp(){$('#tyCmp').innerHTML=card(A.value)+card(B.value)}
  A.addEventListener('change',cmp);B.addEventListener('change',cmp);cmp();

  /* ---- sortable table ---- */
  const COLS=[{k:'ab',l:'Type'},{k:'genes',l:'Gene(s)'},{k:'inh',l:'Inheritance'},{k:'grp',l:'Pathway group'},{k:'tis',l:'Main tissue'},{k:'n',l:'How common'}];
  let sk='grp',dir=1;
  function tbl(){const rows=KEYS.map(k=>Object.assign({key:k},TY_ROWS[k])).sort((a,b)=>{const x=a[sk],y=b[sk];return (typeof x==='number'?x-y:String(x).localeCompare(String(y)))*dir||a.grp-b.grp});
    let h='<table><thead><tr>'+COLS.map(c=>`<th scope="col" aria-sort="${c.k===sk?(dir>0?'ascending':'descending'):'none'}"><button data-tysort="${c.k}">${c.l}</button></th>`).join('')+'</tr></thead><tbody>';
    rows.forEach(r=>{h+=`<tr class="${r.post?'post':''}"><th scope="row">${r.ab}<br><small style="font-weight:400;color:var(--muted)">${r.name}</small></th><td>${r.genes}</td><td>${r.inh==='AD*'?'AD pattern, no gene':r.inh}</td><td>${TY_GRP[r.grp].n}</td><td>${TIS[r.tis][0]}</td><td>${r.freq}</td></tr>`});
    $('#tyTbl').innerHTML=h+'</tbody></table>'}
  $('#tyTbl').addEventListener('click',e=>{const b=e.target.closest('[data-tysort]');if(!b)return;const k=b.dataset.tysort;if(k===sk)dir=-dir;else{sk=k;dir=1}tbl()});
  tbl();

  /* ---- old names to new: flip cards ---- */
  $('#tyFlip').innerHTML=TY_FLIP.map((c,i)=>`<div class="fc-wrap"><button class="fc" data-tyfl="${i}" aria-pressed="false" aria-label="${c.f}: turn the card over"><div class="face front"><small>Old name</small><p>${c.f}</p><small>Tap for the 2017 name</small></div><div class="face back"><small>Today</small><p>${c.b}</p></div></button></div>`).join('');
  $('#tyFlip').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('[data-tyfl]');if(!b)return;const on=!b.classList.contains('flip');b.classList.toggle('flip',on);b.setAttribute('aria-pressed',on)});
};
