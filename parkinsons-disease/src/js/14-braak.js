/* =============== 1.4 braak =============== */
const BK_BODY=[
 {from:0,at:.08,k:'Stage 1 · medulla and smell',t:'Medulla and smell bulb',
  txt:'Lesions start in the dorsal motor nucleus of the glossopharyngeal and vagal nerves (IX/X) in the medulla, and in the anterior olfactory nucleus. [[Braak2003,Burke2008]] In the body-first model, this is where pathology arriving from the gut along the vagus first reaches the brain. [[Borghammer2019]] Lewy bodies were found in the gut wall plexuses of all 7 people with Parkinson\'s examined. [[Wakabayashi1988]]',
  pt:'The first clumps appear low in the brainstem, in the nucleus that sends the vagus nerve to the gut, and in the smell pathway.',
  hook:'Braak stage 1 = dorsal motor nucleus of IX/X in the medulla + anterior olfactory nucleus. [[Braak2003]]'},
 {from:.17,at:.24,k:'Stage 2 · pons',t:'Pons: locus coeruleus and raphe',
  txt:'Stage 2 adds the next structures up the lower brainstem, including the caudal raphe nuclei and the locus coeruleus. [[Burke2008]] Braak\'s lower-brainstem sequence also includes the gigantocellular reticular nucleus; placing it specifically in stage 2 is unverified here, because the 2003 full text could not be checked. [[Visanji2013,Braak2003]] In the body-first model, REM sleep behaviour disorder and autonomic damage come before dopamine loss. [[Borghammer2019]]',
  pt:'The clumps climb into the pons, to small clusters of cells that make noradrenaline and serotonin.',
  hook:'Stages 1–2 are thought to come before movement symptoms (incidental Lewy body disease). [[Jellinger2009,Burke2008]]'},
 {from:.34,at:.4,k:'Stage 3 · midbrain',t:'Midbrain: the substantia nigra',
  txt:'The substantia nigra and other midbrain and forebrain nuclear grey matter become involved. [[Braak2003,Visanji2013]] The central subnucleus of the amygdala is affected at stage 3, then its basolateral parts. [[Braak2017]] The pedunculopontine nucleus belongs to this midbrain step. [[Visanji2013,Burke2008]] Including the basal nucleus of Meynert at stage 3 is unverified. [[Braak2003]]',
  pt:'Now the clumps reach the dopamine cells of the substantia nigra, and movement symptoms tend to appear.',
  hook:'Stage 3 = substantia nigra. Movement symptoms come with stages 3–4. [[Jellinger2009,Burke2008]]'},
 {from:.5,at:.57,k:'Stage 4 · mesocortex',t:'Temporal mesocortex',
  txt:'The cortex is first involved, starting with the anteromedial temporal mesocortex, specifically the transentorhinal region, after the amygdala. [[Braak2003,Braak2017]] Hippocampal CA2 involvement at this stage is unverified: Braak 2017 notes CA2/CA3 Lewy neurites without giving a stage. [[Braak2017]]',
  pt:'The clumps reach the first strip of cortex, on the inner side of the temporal lobe.'},
 {from:.67,at:.73,k:'Stage 5 · neocortex',t:'Association and prefrontal cortex',
  txt:'Pathology enters the neocortex, starting with high-order sensory association areas and prefrontal cortex. [[Braak2003]] Stages 5–6 are often linked to cognitive impairment. [[Jellinger2009,Burke2008]]',
  pt:'The clumps reach the large areas of cortex used for planning, judgement and combining the senses.'},
 {from:.83,at:.9,k:'Stage 6 · primary cortex',t:'Primary sensory and motor areas',
  txt:'Last come first-order sensory association and premotor areas, then the primary sensory and motor fields. [[Braak2003]] Stage is not severity: many older people without neurological signs have stage 4–6 pathology at death, and some people at stages 3–4 had severe Parkinson\'s (Hoehn and Yahr 5). [[Burke2008]]',
  pt:'In the last stage nearly the whole cortex is involved, including the strips for movement and sensation.',
  hook:'Braak: 1 medulla + smell, 2 pons, 3 midbrain (nigra), 4 mesocortex, 5 association cortex, 6 primary fields. Stage does not predict clinical severity. [[Braak2003,Jellinger2009]]'}
];
const BK_BRAIN=[
 {from:0,at:.08,k:'Step 1 · one side',t:'Amygdala or smell bulb, one side',
  txt:'In the brain-first model, pathology starts inside the brain, often on one side, frequently in the amygdala or olfactory bulb. Brain connections run mostly on the same side, so it spreads mostly on that side, which would explain why movement symptoms often start on one side. [[Borghammer2021]]',
  pt:'Here the clumps start inside the brain, often on one side, near the smell and emotion centres.',
  hook:'Brain-first: asymmetric, usually no RBD before diagnosis. Body-first: more symmetric, RBD and autonomic signs first. [[Borghammer2019,Borghammer2021]]'},
 {from:.2,at:.28,k:'Step 2 · nigra early',t:'Dopamine loss comes first',
  txt:'Brain-first Parkinson\'s is usually RBD-negative before diagnosis, with nigrostriatal dysfunction before autonomic involvement. [[Borghammer2019]] In an imaging study of 37 people with new Parkinson\'s and 22 with isolated RBD, the brain-first trajectory began with loss of putaminal FDOPA signal. [[Horsager2020]]',
  pt:'The dopamine cells are hit early, so movement symptoms show up before many of the body symptoms.'},
 {from:.4,at:.48,k:'Step 3 · down the brainstem',t:'Down the brainstem',
  txt:'Autonomic involvement comes after the nigrostriatal damage in this model. [[Borghammer2019]] The order drawn inside the brainstem is schematic: the sources used here do not give a nucleus-by-nucleus sequence for brain-first disease.',
  pt:'The clumps move down the brainstem, the opposite direction to the body-first route.'},
 {from:.6,at:.68,k:'Step 4 · heart and gut',t:'Heart and gut later',
  txt:'In the brain-first trajectory, cardiac MIBG and colonic donepezil signals fall after the putaminal FDOPA loss; body-first runs the other way. RBD-positive patients had lower heart and colon signals, larger colon volume and slower transit than RBD-negative ones. [[Horsager2020]] At Hoehn and Yahr stage I, about 40–50% of people still have normal cardiac MIBG. [[Borghammer2019]]',
  pt:'The nerves of the heart and gut are reached late, so these body symptoms tend to come later.'},
 {from:.8,at:.88,k:'Step 5 · cortex',t:'Cortex, in both types',
  txt:'Cortical involvement is drawn here for comparison; the sources used here give no cortical order for brain-first disease. The SOC model links body-first disease to a larger burden at diagnosis and faster cognitive decline. [[Borghammer2021]]',
  pt:'Both types eventually reach the cortex. The body-first type is thought to arrive with more damage and to affect thinking sooner.'}
];
const BK_FIT=[
 {s:'Kalaitzakis 2008',n:'71 Parkinson\'s brains',v:47,sub:7,big:'47%',l1:'did not fit caudo-rostral spread',l2:'7% had a spared vagal nucleus despite nigral and cortical inclusions',t:'Almost half did not fit',
  txt:'In 71 Parkinson\'s brains the substantia nigra was affected in 100% and the nucleus basalis of Meynert in 98.5%. 53% fitted caudo-rostral spread and 47% did not. In 7% the dorsal motor nucleus of the vagus was spared despite nigral and cortical inclusions, so the vagal nucleus is not an obligatory starting point. [[Kalaitzakis2008]]',
  pt:'Almost half of these brains did not follow the bottom-to-top order.'},
 {s:'Parkkinen 2008',n:'226 assessable of 1,720 autopsies',v:17,big:'17%',l1:'departed from caudo-rostral spread',l2:'about 55% at stages 5–6 had no dementia or parkinsonism',t:'Most fitted, many had no symptoms',
  txt:'Of 1,720 autopsies, 14% (248) had alpha-synuclein lesions. Of 226 assessable subjects, 83% fitted current staging systems and 17% did not. About 55% of those at Braak stages 5–6 had no clinical signs of dementia or extrapyramidal symptoms. [[Parkkinen2008]]',
  pt:'Most brains fitted the order, but many people with widespread clumps had no symptoms in life.'},
 {s:'Zaccai, in Burke 2008',n:'76 brains, population cohorts',v:46,big:'46%',l1:'did not fit the Braak scheme',l2:'29% had amygdala-predominant pathology',t:'Population brains fit less well',
  txt:'In Zaccai and colleagues\' population cohorts, as cited by Burke, 46% of 76 brains with synuclein pathology did not fit the Braak scheme, and 29% had amygdala-predominant pathology. [[Burke2008]] Braak and Del Tredici state that their staging does not apply to amygdala-predominant cases, which were not in the 2003 sample. [[Braak2017]]',
  pt:'In brains from the general population, almost half did not follow the order.'},
 {s:'Beach 2009',n:'417 brains, 10 regions',v:42,big:'42%',l1:'unclassifiable by Braak staging',l2:'50% by the DLB Consortium system; 0% by the unified system',t:'A unified staging system',
  txt:'The Unified Staging System sorts brains into I olfactory bulb only, IIa brainstem predominant, IIb limbic predominant, III brainstem and limbic, and IV neocortical. Every subject could be classified, against 42% unclassifiable by Braak staging and 50% by the DLB Consortium system. Higher stages brought stepwise worse nigral loss, striatal TH, MMSE and UPDRS part 3 scores; limbic-predominant IIb had less nigrostriatal damage than IIa. [[Beach2009]]',
  pt:'A newer system that allows more than one starting point could place every brain.',
  hook:'Unified staging: I olfactory, IIa brainstem, IIb limbic, III brainstem + limbic, IV neocortical. [[Beach2009]]'},
 {s:'Jellinger 2009 review',n:'range across studies',v:6,v2:43,big:'6.3–43%',l1:'of cases did not follow caudo-rostral progression',l2:'7–8.3% at stages 4–5 had spared medullary nuclei',t:'A wide range across studies',
  txt:'Across studies, 6.3% to 43% of cases did not follow caudo-rostral progression, and 7–8.3% of clinical Parkinson\'s cases at stages 4–5 had spared medullary nuclei. 30–55% of older people with widespread pathology (stages 5–6) had no definite neuropsychiatric symptoms. The review found no relationship between Braak stage and clinical severity. [[Jellinger2009]]',
  pt:'Depending on the study, anywhere from a few to almost half of cases break the rule.',
  hook:'Braak stage does not track clinical severity. [[Jellinger2009,Burke2008]]'}
];
const BK_SYS=[
 {id:'lc',b:'Locus coeruleus',c:'noradrenaline',stat:'6.47',u:'effect size of neuron loss, the largest of three nuclei measured',
  txt:'In 19 Parkinson\'s cases, neuron loss was greatest in the locus coeruleus (effect size 6.47), ahead of the substantia nigra (2.58) and the nucleus basalis (0.85). [[Zarow2003]] It is a stage 2 nucleus in Braak\'s scheme. [[Burke2008]]'},
 {id:'raphe',b:'Raphe nuclei',c:'serotonin',stat:'−66%',u:'serotonin in the caudate, −51% in the putamen',
  txt:'Striatal serotonin markers were reduced by 30–66% after death, more in the caudate than the putamen: serotonin −66% versus −51%, and the serotonin transporter −56% versus −30%. Dopamine in the same brains was down 80% in the caudate and 98% in the putamen. [[Kish2008]]'},
 {id:'nbm',b:'Nucleus basalis',c:'acetylcholine',stat:'98.5%',u:'of 71 Parkinson\'s brains had inclusions here',
  txt:'The nucleus basalis of Meynert had inclusions in 98.5% of 71 Parkinson\'s brains. [[Kalaitzakis2008]] Its neuron loss (effect size 0.85) was smaller than in the locus coeruleus or the substantia nigra. [[Zarow2003]]'},
 {id:'ppn',b:'Pedunculopontine nucleus',c:'acetylcholine',stat:'11.8%',u:'lower thalamic cholinergic activity in people who had fallen',
  txt:'Of 44 people with Parkinson\'s without dementia, the 38.6% with falls had 12.3% lower cortical acetylcholinesterase activity (non-fallers 6.6% lower) and 11.8% lower thalamic activity, which partly reflects pedunculopontine output. Nigrostriatal dopamine did not differ between fallers and non-fallers. [[Bohnen2009]]'},
 {id:'sn',b:'Substantia nigra',c:'dopamine',stat:'2.58',u:'effect size of neuron loss, shown for comparison',
  txt:'The dopamine cells of the substantia nigra are the best-known target, yet in the same series their loss (effect size 2.58) was smaller than in the locus coeruleus. [[Zarow2003]] The circuit is in <a href="#circuit" data-go="circuit">The dopamine pathway</a>.'},
 {id:'heart',b:'Heart',c:'sympathetic nerves',stat:'20 of 29',u:'had low cardiac fluorodopamine uptake',
  txt:'20 of 29 people with Parkinson\'s had low cardiac 6-[18F]fluorodopamine uptake, unrelated to disease duration, severity or levodopa, which points to cardiac sympathetic denervation. [[Goldstein2000]] More than 94% of people with isolated RBD have markedly abnormal cardiac MIBG, but about 40–50% at Hoehn and Yahr stage I still have normal scans. [[Borghammer2019]]'},
 {id:'gut',b:'Gut',c:'enteric nerves',stat:'7 of 7',u:'had Lewy bodies in the gut wall plexuses',
  txt:'Lewy bodies were found in Auerbach\'s and Meissner\'s plexuses in all 7 people with Parkinson\'s examined, most often in the lower oesophagus. They were also found, in small numbers, in 8 of 24 age-matched people without Parkinson\'s. [[Wakabayashi1988]]'},
 {id:'skin',b:'Skin',c:'skin nerves',stat:'92.7%',u:'positive skin biopsy for phosphorylated synuclein (controls 3.3%)',
  txt:'In a 30-site blinded study, phosphorylated alpha-synuclein was found on skin biopsy in 92.7% of people with Parkinson\'s, 96.0% with dementia with Lewy bodies, 98.2% with MSA, 100% with pure autonomic failure and 3.3% of controls. The authors note it still needs validation in unselected clinical populations. [[Gibbons2024]]'}
];
inits.braak=()=>{
  /* ---- shared anatomy, in brain coordinates (460 x 345, front to the left) ---- */
  const CER='M36 170 C26 98 92 28 206 20 C318 14 404 64 428 146 C438 180 424 210 398 218 C376 224 354 222 336 216 C318 210 304 206 292 206 L256 206 C244 220 226 232 200 234 C172 236 146 230 128 220 C114 212 104 206 92 204 C68 202 42 194 36 170 Z';
  const MID='M252 168 C266 164 292 164 308 170 L310 210 L252 210 C248 196 248 180 252 168 Z',PONS='M252 210 L310 210 L312 262 L262 262 C240 254 234 222 252 210 Z',
        MED='M262 262 L312 262 C310 286 306 304 302 322 L276 322 C272 304 266 286 262 262 Z',CORD='M276 322 L302 322 L300 344 L278 344 Z',
        CB='M316 224 C336 210 388 208 412 224 C428 248 410 288 368 294 C338 298 318 282 314 262 Z',
        MESO='M134 220 C166 232 212 230 244 214 L242 206 C212 220 168 222 138 212 Z';
  const NUC={olf:[84,210],dmv:[304,288],gig:[284,300],lc:[303,228],raphe:[283,236],sn:[266,193],ppn:[301,205],amy:[196,214],nbm:[208,184]};
  const HALO='paint-order:stroke;stroke:var(--field);stroke-width:3px;stroke-linejoin:round';
  const ON={b:{gut:1,olf:1,dmv:1,lc:2,raphe:2,gig:2,heart:2,sn:3,ppn:3,amy:3,nbm:3,meso:4,assoc:5,prem:6,prim:6.2},
            r:{amy:1,olf:1,sn:2,ppn:2,lc:3,raphe:3,gig:3,nbm:3,dmv:4,gut:4,heart:4,meso:5,assoc:5,prem:5.3,prim:5.6}};
  const SYM=[ ['constip','Constipation'],['smell','Loss of smell'],['rbd','Dream enactment'],['motor','Movement signs'],['cog','Thinking changes'] ];
  const SON={b:{constip:1,smell:1,rbd:2,motor:3,cog:5},r:{smell:1,motor:2,rbd:0,constip:4,cog:5}};
  function brain(V,C,lab,clip){
    let s='';const ov=(d,k)=>{const v=V(k);return v>0?`<path d="${d}" style="fill:${C};opacity:${f1(v*.85)}"/>`:''};
    const nuc=(k,shape,dash)=>{const v=V(k);return shape(`fill:var(--panel);stroke:var(--ink);stroke-width:1${dash?';stroke-dasharray:2.5 2':''}`)+(v>0?shape(`fill:${C};opacity:${f1(.2+.8*v)}`):'')};
    s+=`<path d="${CB}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/><path d="M330 236 C350 228 386 226 404 232 M326 252 C352 246 390 246 410 250 M330 270 C352 266 380 266 400 268" style="fill:none;stroke:var(--cell-line);stroke-width:1;opacity:.45"/>`;
    s+=`<path d="${CER}" style="fill:var(--cell)"/>`+ov(CER,'assoc');
    s+=`<g clip-path="url(#${clip})">`;
    [ ['M224 18 C220 40 216 58 212 76','prim',16],['M180 22 C176 44 172 62 168 82','prem',14],['M372 150 C392 146 412 142 434 140','prim',14] ].forEach(([d,k,w])=>{const v=Math.min(1,V(k)/.7);s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:${w};opacity:${f1(1-v)}"/>`;if(v>0)s+=`<path d="${d}" style="fill:none;stroke:${C};stroke-width:${w};opacity:${f1(v*.85)}"/>`});
    s+=`<path d="${MESO}" style="fill:var(--panel-2)"/>`+ov(MESO,'meso')+`</g><path d="${CER}" style="fill:none;stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M120 128 C136 78 296 70 336 122 M120 128 C116 140 124 148 134 146" style="fill:none;stroke:var(--cell-line);stroke-width:13;stroke-linecap:round"/><path d="M120 128 C136 78 296 70 336 122 M120 128 C116 140 124 148 134 146" style="fill:none;stroke:var(--panel-2);stroke-width:10;stroke-linecap:round"/>`;
    s+=`<ellipse cx="258" cy="148" rx="30" ry="16" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    [MID,PONS,MED,CORD].forEach(d=>s+=`<path d="${d}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`);
    // olfactory bulb and tract
    s+=`<path d="M104 212 C120 216 136 220 150 222" style="fill:none;stroke:var(--cell-line);stroke-width:3;stroke-linecap:round"/>`;
    s+=nuc('olf',st=>`<ellipse cx="84" cy="210" rx="22" ry="6.5" style="${st}"/>`);
    s+=nuc('amy',st=>`<circle cx="196" cy="214" r="8" style="${st}"/>`,1);
    s+=nuc('nbm',st=>`<ellipse cx="208" cy="184" rx="9" ry="4.5" style="${st}"/>`,1);
    s+=nuc('sn',st=>`<ellipse cx="266" cy="193" rx="12" ry="5" transform="rotate(-20 266 193)" style="${st}"/>`);
    [ [-6,1],[-1,-1],[4,1],[8,-1] ].forEach(([dx,dy])=>s+=`<circle cx="${266+dx}" cy="${193+dy}" r="1.2" style="fill:var(--ink);opacity:.6"/>`);
    s+=nuc('ppn',st=>`<circle cx="301" cy="205" r="4.5" style="${st}"/>`);
    s+=nuc('raphe',st=>`<rect x="280" y="216" width="7" height="40" rx="3.5" style="${st}"/>`);
    s+=nuc('lc',st=>`<ellipse cx="303" cy="228" rx="4.5" ry="8" style="${st}"/>`);
    s+=nuc('dmv',st=>`<ellipse cx="304" cy="288" rx="5" ry="10" style="${st}"/>`);
    s+=nuc('gig',st=>`<ellipse cx="284" cy="300" rx="6" ry="7" style="${st}"/>`,1);
    if(lab){const T=(x,y,l,a='',c='var(--ink)')=>`<text x="${x}" y="${y}" class="t-xs${a}" style="fill:${c};${HALO}">${l}</text>`;
      s+=T(84,230,'olfactory bulb',' t-mid')+T(184,207,'amygdala',' t-end')+T(172,252,'temporal mesocortex',' t-mid')+T(200,172,'basal nucleus (unverified)',' t-end');
      s+=T(250,190,'substantia nigra',' t-end')+T(258,151,'thalamus',' t-mid')+T(318,203,'pedunculopontine')+T(318,232,'locus coeruleus')+T(318,250,'raphe nuclei');
      s+=`<path d="M316 247 L288 240" style="stroke:var(--muted);stroke-width:.8"/><path d="M316 314 L290 302" style="stroke:var(--muted);stroke-width:.8"/>`;
      s+=T(318,292,'dorsal motor nucleus X')+T(318,316,'gigantocellular')+T(318,328,'(unverified)','','var(--muted)')+T(400,272,'cerebellum',' t-mid','var(--muted)');
      s+=T(256,246,'pons',' t-mid','var(--muted)')+T(258,304,'medulla',' t-end','var(--muted)')+T(282,180,'midbrain',' t-mid','var(--muted)');
      s+=T(84,116,'prefrontal',' t-mid')+T(166,98,'premotor',' t-mid')+T(224,10,'primary motor and sensory',' t-mid')+T(404,166,'primary visual',' t-mid')+T(330,92,'association cortex',' t-mid')}
    return s}
  /* ---- 1. the staging map ---- */
  const svg=$('#bkSvg'),rg=$('#bkT');let body=true,sym=true;
  const steps=()=>body?BK_BODY:BK_BRAIN;
  const stageAt=t=>{const ST=steps(),pts=[ [0,.3] ].concat(ST.map((s,i)=>[s.at,i+1]),[ [1,ST.length] ]);
    for(let i=0;i<pts.length-1;i++)if(t<=pts[i+1][0])return lerp(pts[i][1],pts[i+1][1],ramp(t,pts[i][0],pts[i+1][0]));return ST.length};
  const lev=(k,s)=>{const o=ON[body?'b':'r'][k];if(o==null)return 0;return ease(clamp((s-(o-1)-.15)/.75))*(.7+.3*clamp((s-o)/2))};
  function draw(t){
    const N=vb(svg,'720 430','400 716');
    const L=N?{b:[6,40,.84],bar:[14,352,372],side:[14,430],chips:[244,424,144,1],gut:[92,560],V:[ [192,584],[192,600],[214,616] ],vl:[188,590,1]}
             :{b:[8,40,1],bar:[500,34,208],side:[500,110],chips:[500,200,102,2],gut:[496,284],V:[ [312,328],[318,380],[346,416],[596,416],[612,364] ],vl:[380,410]};
    const s0=stageAt(t),C='var(--rose)',V=k=>lev(k,s0),[bx,by,bs]=L.b;
    let s=`<defs><clipPath id="bkClip"><path d="${CER}"/></clipPath>${marker('bkA','var(--rose)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<g transform="translate(${bx} ${by}) scale(${bs})">${brain(V,C,true,'bkClip')}</g>`;
    if(N)s+=`<path d="M${f1(bx+304*bs)} ${f1(by+296*bs)} L${f1(bx+290*bs)} ${f1(by+344*bs)}" style="stroke:var(--sage);stroke-width:2"/><text x="${f1(bx+296*bs)}" y="${f1(by+344*bs+12)}" class="t-xs t-mid" style="fill:var(--sage)">vagus nerve: to the gut, below ↓</text>`;
    // the gut, vagus and heart inset
    const [gx,gy]=L.gut,gut=V('gut'),hr=V('heart');
    s+=`<g transform="translate(${gx} ${gy})"><rect width="216" height="140" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="10" y="16" class="t-xs">GUT · VAGUS · HEART</text>`;
    s+=`<path d="M46 86 C24 70 20 54 32 47 C39 43 44 47 46 52 C48 47 53 43 60 47 C72 54 68 70 46 86 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    if(hr>0)s+=`<path d="M46 86 C24 70 20 54 32 47 C39 43 44 47 46 52 C48 47 53 43 60 47 C72 54 68 70 46 86 Z" style="fill:${C};opacity:${f1(hr*.7)}"/>`;
    for(let i=0;i<7;i++){const a=-Math.PI*.95+i*Math.PI*.32,x=46+Math.cos(a)*30,y=64+Math.sin(a)*26;s+=`<path d="M${f1(x)} ${f1(y)} l${f1(Math.cos(a)*7)} ${f1(Math.sin(a)*7)}" style="stroke:var(--sage);stroke-width:2;stroke-linecap:round;opacity:${f1(clamp(1-hr*1.1+(i%3)*.12))}"/>`}
    s+=`<text x="46" y="108" class="t-xs t-mid" style="fill:var(--ink)">heart nerves</text><text x="46" y="120" class="t-xs t-mid">${hr>.4?'fewer (MIBG scan)':'(MIBG scan)'}</text>`;
    s+=`<path d="M128 40 C150 34 172 44 168 62 C164 78 140 80 128 70 C121 64 123 50 128 40 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    const GP='M150 80 C190 80 196 92 160 94 C124 96 124 108 160 108 C196 108 196 120 150 120';
    s+=`<path d="${GP}" style="fill:none;stroke:var(--cell-line);stroke-width:8;stroke-linecap:round"/><path d="${GP}" style="fill:none;stroke:var(--cell);stroke-width:5;stroke-linecap:round"/>`;
    const GD=[ [134,52],[150,44],[162,58],[146,70],[170,82],[186,90],[150,94],[134,101],[170,108],[188,114] ];
    GD.forEach(([x,y],i)=>{const on=clamp(gut*GD.length-i);s+=`<circle cx="${x}" cy="${y}" r="2.6" style="fill:${on>0?C:'var(--panel)'};stroke:${on>0?C:'var(--cell-line)'};stroke-width:1;opacity:${f1(.5+.5*Math.max(on,.4))}"/>`});
    s+=`<text x="160" y="134" class="t-xs t-mid" style="fill:var(--ink)">gut wall nerves</text></g>`;
    // vagus nerve and travelling pulses
    s+=`<path d="M${L.V.map(p=>p.join(' ')).join(' L')}" style="fill:none;stroke:var(--sage);stroke-width:2;stroke-linejoin:round"/><text x="${L.vl[0]}" y="${L.vl[1]}" class="t-xs${L.vl[2]?' t-end':''}" style="fill:var(--sage);${HALO}">vagus nerve</text>`;
    const along=u=>{const P=L.V,n=P.length-1,x=clamp(u)*n,i=Math.min(n-1,Math.floor(x)),f=x-i;return [lerp(P[i][0],P[i+1][0],f),lerp(P[i][1],P[i+1][1],f)]};
    const pw=body?bump(s0,.15,1.9):bump(s0,3.15,4.85);
    if(pw>.02)for(let k=0;k<3;k++){const fr=((t*7+k/3)%1+1)%1,[x,y]=along(body?1-fr:fr);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:${C};opacity:${f1(pw*bump(fr,0,1))}"/>`}
    // stage bar
    const [sx,sy,W]=L.bar,ST=steps(),n=ST.length,gap=5,bw=(W-gap*(n-1))/n,cur=Math.max(1,Math.min(n,Math.floor(s0+.02)));
    s+=`<text x="${sx}" y="${sy}" class="t-sm" style="fill:${C}">${body?'BRAAK STAGE · BODY-FIRST':'BRAIN-FIRST ORDER'}</text>`;
    for(let k=1;k<=n;k++){const x=sx+(k-1)*(bw+gap),reached=k<=cur&&s0>=.6,part=clamp(s0-(k-1));
      s+=`<rect x="${f1(x)}" y="${sy+8}" width="${f1(bw)}" height="26" rx="7" style="fill:var(--panel);stroke:${reached?C:'var(--line)'};stroke-width:${k===cur?2.4:1.2}"/>`;
      if(part>0)s+=`<rect x="${f1(x+2)}" y="${sy+29}" width="${f1((bw-4)*part)}" height="3" rx="1.5" style="fill:${C}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${sy+26}" class="t-lbl t-mid" style="fill:${reached?'var(--ink)':'var(--muted)'}">${k}</text>`}
    if(body)[ ['pre-motor',1],['movement',3],['cortex',5] ].forEach(([l,k])=>{const x1=sx+(k-1)*(bw+gap),x2=x1+2*bw+gap,on=cur>=k&&cur<=k+1;
      s+=`<path d="M${f1(x1+4)} ${sy+40} v4 H${f1(x2-4)} v-4" style="fill:none;stroke:${on?C:'var(--muted)'};stroke-width:1.2"/><text x="${f1((x1+x2)/2)}" y="${sy+56}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`});
    else s+=`<text x="${sx}" y="${sy+52}" class="t-xs">order after step 2 is schematic</text>`;
    // seen from above: one side or both
    const [hx,hy]=L.side,lv=body?[clamp(s0/6),clamp(s0/6)]:[clamp(s0/5),clamp((s0-1.6)/5)];
    s+=`<text x="${hx}" y="${hy}" class="t-xs">SEEN FROM ABOVE</text>`;
    lv.forEach((v,i)=>{const cx=hx+22+i*44;s+=`<ellipse cx="${cx}" cy="${hy+34}" rx="19" ry="26" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
      if(v>0)s+=`<ellipse cx="${cx}" cy="${hy+34}" rx="19" ry="26" style="fill:${C};opacity:${f1(v*.85)}"/>`;
      s+=`<text x="${cx}" y="${hy+72}" class="t-xs t-mid">${i?'right':'left'}</text>`});
    s+=`<text x="${hx+96}" y="${hy+26}" class="t-xs" style="fill:var(--ink)">${body?'both sides alike':'one side first'}</text><text x="${hx+96}" y="${hy+40}" class="t-xs">${body?'more symmetric':'asymmetric'}</text>`;
    // symptom chips
    if(sym){const [cx0,cy0,cw,cols]=L.chips,SO=SON[body?'b':'r'];
      s+=`<text x="${cx0}" y="${cy0}" class="t-xs">SYMPTOMS OFTEN LINKED</text>`;
      SYM.forEach(([k,l],i)=>{const x=cx0+(i%cols)*(cw+4),y=cy0+8+Math.floor(i/cols)*25,o=SO[k],none=o===0,on=none?0:clamp((s0-o+1-.1)/.5);
        s+=`<rect x="${x}" y="${y}" width="${cw}" height="21" rx="10.5" style="fill:${on>.5?'var(--rose-soft)':'var(--panel)'};stroke:${on>.5?C:'var(--line)'};stroke-width:${on>.5?1.6:1}${none?';stroke-dasharray:3 3':''}"/>`;
        s+=`<text x="${x+cw/2}" y="${y+14}" class="t-xs t-mid" style="fill:${on>.5?'var(--ink)':'var(--muted)'}">${none?'No RBD early':l}</text>`})}
    svg.innerHTML=s;
    const p=phaseOf(ST,t);setSt(p);$('#bkNote').innerHTML=noteHTML(ST[p]);
  }
  const stop=playWire(rg,$('#bkPlay'),draw,16000,'Replay','braak');
  const stEl=$('#bkSteps');stEl.setAttribute('role','group');stEl.setAttribute('aria-label','Stages');
  const renderSteps=()=>{stEl.innerHTML=steps().map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${body?'STAGE':'STEP'} ${i+1}</b><span>${s.t}</span></button>`).join('')};
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=s.at;draw(s.at)});
  const setSt=i=>{$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));rg.setAttribute('aria-valuetext',`${body?'Braak stage':'Brain-first step'} ${i+1} of ${steps().length}: ${steps()[i].t}`)};
  const setCap=()=>{$('#bkCap').innerHTML=body
    ?'Schematic midline view; deep and lateral structures are projected onto it, and dashed outlines mark deep or unverified nuclei. Stage assignments after Braak 2003 as summarised by Burke, Visanji and Braak 2017. [[Braak2003,Burke2008,Visanji2013,Braak2017]] Symptom chips show common associations, not rules: stage does not predict clinical severity. [[Jellinger2009,Borghammer2019]]'
    :'Brain-first order after the body-first versus brain-first hypothesis and its imaging tests. [[Borghammer2019,Borghammer2021,Horsager2020]] The start and the early nigral step are from these sources; the order after step 2 is drawn schematically. Symptom chips show common associations, not rules.'};
  const setMode=v=>{body=v;$('#bkBody').setAttribute('aria-pressed',v);$('#bkBrain').setAttribute('aria-pressed',!v);renderSteps();setCap();draw(+rg.value)};
  $('#bkBody').onclick=()=>setMode(true);$('#bkBrain').onclick=()=>setMode(false);
  $('#bkSym').onclick=()=>{sym=!sym;$('#bkSym').setAttribute('aria-pressed',sym);draw(+rg.value)};
  renderSteps();setCap();draw(+rg.value);

  /* ---- 2. where Braak does not fit ---- */
  const fs=$('#bkFit');let fi=0;
  const wrap=(txt,m)=>{const w=txt.split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>m){out.push(l);l=x}else l=(l+' '+x).trim()});if(l)out.push(l);return out};
  function drawFit(){
    const N=vb(fs,'720 300','400 480'),F=BK_FIT[fi],cs=22,g=3,[wx,wy]=N?[76,24]:[30,28],[tx,ty,mc]=N?[20,306,60]:[310,52,64];
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    for(let i=0;i<100;i++){const x=wx+(i%10)*(cs+g),y=wy+Math.floor(i/10)*(cs+g),solid=i<Math.round(F.v),range=F.v2&&i<F.v2&&!solid,sub=F.sub&&i<F.sub;
      s+=`<rect x="${x}" y="${y}" width="${cs}" height="${cs}" rx="4" style="fill:${solid?'var(--rose)':range?'var(--rose-soft)':'var(--panel)'};stroke:${solid||range?'var(--rose)':'var(--line)'};stroke-width:1${range?';stroke-dasharray:3 2':''}"/>`;
      if(sub)s+=`<circle cx="${x+cs/2}" cy="${y+cs/2}" r="4" style="fill:var(--panel)"/>`}
    s+=`<text x="${tx}" y="${ty}" class="t-sm">${F.s.toUpperCase()} · ${F.n}</text>`;
    s+=`<text x="${tx}" y="${ty+48}" style="font:800 ${N?40:46}px var(--display);fill:var(--rose)">${F.big}</text>`;
    let y=ty+74;wrap(F.l1,mc*.8|0).forEach(l=>{s+=`<text x="${tx}" y="${y}" class="t-lbl">${l}</text>`;y+=17});
    y+=4;wrap(F.l2,mc).forEach(l=>{s+=`<text x="${tx}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=14});
    const ly=N?y+18:262;
    s+=`<rect x="${tx}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--rose)"/><text x="${tx+16}" y="${ly}" class="t-xs">${F.v2?'lowest estimate':fi===3?'unclassifiable':'did not fit'}</text>`;
    if(F.v2)s+=`<rect x="${tx+120}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--rose-soft);stroke:var(--rose);stroke-dasharray:3 2"/><text x="${tx+136}" y="${ly}" class="t-xs">up to the highest</text>`;
    else if(F.sub)s+=`<rect x="${tx+100}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--rose)"/><circle cx="${tx+105.5}" cy="${ly-3.5}" r="2.5" style="fill:var(--panel)"/><text x="${tx+116}" y="${ly}" class="t-xs">vagal nucleus spared</text>`;
    else s+=`<rect x="${tx+100}" y="${ly-9}" width="11" height="11" rx="2" style="fill:var(--panel);stroke:var(--line)"/><text x="${tx+116}" y="${ly}" class="t-xs">${fi===3?'classifiable':'fitted'}</text>`;
    fs.innerHTML=s;
    $$('[data-bkf]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.bkf===fi));
    $('#bkFitNote').innerHTML=noteHTML({k:F.s+' · '+F.n,t:F.t,txt:F.txt,pt:F.pt,hook:F.hook});
  }
  $$('[data-bkf]').forEach(b=>b.addEventListener('click',()=>{fi=+b.dataset.bkf;drawFit()}));
  drawFit();

  /* ---- 3. the non-dopaminergic body map ---- */
  const bm=$('#bkBodyMap');let si=0;
  $('#bkSysBtns').innerHTML='<span class="kicker">System</span>'+BK_SYS.map((x,i)=>`<button class="btn" data-bks="${i}" aria-pressed="${i===0}">${x.b}</button>`).join('');
  const ZW=[ ['locus coeruleus',6.47,'lc'],['substantia nigra',2.58,'sn'],['nucleus basalis',.85,'nbm'] ];
  function drawBody(t){
    const N=vb(bm,'720 420','400 760'),S=BK_SYS[si],F=N?{o:[100,0],st:[20,440,46],z:[20,620,250]}:{o:[10,0],st:[300,46,50],z:[300,262,300]};
    const [ox,oy]=F.o,P=(x,y)=>[ox+x,oy+y],pul=.5+.5*Math.sin((t||0)*Math.PI*2);
    let s=`<defs><clipPath id="bkClipB"><path d="${CER}"/></clipPath></defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // figure, in local coordinates (200 x 420)
    s+=`<g transform="translate(${ox} ${oy})">`;
    s+=`<path d="M78 136 L70 300 L86 410 M122 136 L130 300 L114 410" style="fill:none;stroke:var(--cell-line);stroke-width:2;opacity:.6"/>`;
    s+=`<path d="M62 150 C62 132 80 126 100 126 C120 126 138 132 138 150 L142 280 C142 296 58 296 58 280 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<path d="M138 150 C152 170 166 210 176 262" style="fill:none;stroke:var(--cell-line);stroke-width:12;stroke-linecap:round"/><path d="M138 150 C152 170 166 210 176 262" style="fill:none;stroke:var(--cell);stroke-width:9;stroke-linecap:round"/>`;
    s+=`<path d="M62 150 C48 170 34 210 24 262" style="fill:none;stroke:var(--cell-line);stroke-width:12;stroke-linecap:round"/><path d="M62 150 C48 170 34 210 24 262" style="fill:none;stroke:var(--cell);stroke-width:9;stroke-linecap:round"/>`;
    s+=`<rect x="90" y="108" width="20" height="22" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><circle cx="100" cy="62" r="54" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<g transform="translate(48 30) scale(.23)">${brain(()=>0,'var(--rose)',false,'bkClipB')}</g>`;
    s+=`<path d="M86 172 C76 160 76 148 86 146 C92 144 96 148 98 152 C100 148 104 144 110 146 C120 148 120 160 110 172 L98 184 Z" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.4"/>`;
    s+=`<path d="M86 214 C100 208 118 214 116 226 C114 236 98 236 92 230 M84 244 C104 238 120 246 104 252 C88 258 92 266 114 262" style="fill:none;stroke:var(--cell-line);stroke-width:5;stroke-linecap:round"/>`;
    s+=`<path d="M166 222 l10 -3 M168 232 l10 -3 M170 242 l10 -3" style="stroke:var(--rose);stroke-width:1.6;stroke-linecap:round"/>`;
    const HS={lc:[48+303*.23,30+228*.23],raphe:[48+283*.23,30+236*.23],ppn:[48+301*.23,30+205*.23],sn:[48+266*.23,30+193*.23],nbm:[48+208*.23,30+184*.23],heart:[98,163],gut:[100,240],skin:[172,232]};
    Object.entries(HS).forEach(([k,[x,y]])=>{const on=k===S.id,br=['heart','gut','skin'].includes(k);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${br?5:2.6}" style="fill:var(--rose);opacity:${on?1:.55}"/>`;
      if(on)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1((br?14:8)+pul*3)}" style="fill:none;stroke:var(--rose);stroke-width:2"/>`});
    s+='</g>';
    // headline number
    const [tx,ty,mc]=F.st;
    s+=`<text x="${tx}" y="${ty}" class="t-sm">${S.b.toUpperCase()} · ${S.c.toUpperCase()}</text><text x="${tx}" y="${ty+52}" style="font:800 ${N?42:50}px var(--display);fill:var(--rose)">${S.stat}</text>`;
    wrap(S.u,mc).forEach((l,i)=>s+=`<text x="${tx}" y="${ty+78+i*16}" class="t-lbl">${l}</text>`);
    // effect sizes of neuron loss
    const [zx,zy,zw]=F.z;
    s+=`<text x="${zx}" y="${zy}" class="t-xs">NEURON LOSS IN 19 BRAINS · EFFECT SIZE</text>`;
    ZW.forEach(([l,v,k],i)=>{const y=zy+20+i*34,on=k===S.id,w=zw*v/7;
      s+=`<text x="${zx}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${zx}" y="${y+5}" width="${f1(w)}" height="12" rx="4" style="fill:${on?'var(--rose)':'var(--rose-soft)'};stroke:var(--rose);stroke-width:${on?0:1}"/><text x="${f1(zx+w+6)}" y="${y+15}" class="t-xs" style="fill:var(--ink)">${v.toFixed(2)}</text>`});
    bm.innerHTML=s;
    $$('[data-bks]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.bks===si));
    $('#bkSysNote').innerHTML=noteHTML({k:S.c,t:S.b,txt:S.txt});
    $('#bkBodyCap').innerHTML='Schematic body map; the brainstem dots are enlarged. Effect sizes from one post-mortem series of 19 Parkinson\'s cases [[Zarow2003]]. Headline numbers are cited in the note.';
  }
  $('#bkSysBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bks]');if(!b)return;si=+b.dataset.bks;drawBody(0)});
  drawBody(0);

  /* ---- 4. cards ---- */
  $('#bkCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>A common pattern, not a rule</h4><p>In a series of 226 assessable brains, 83% fitted the staging systems. [[Parkkinen2008]] Across studies, though, 6.3% to 43% of cases did not follow bottom-to-top spread. [[Jellinger2009]] The scheme came from a selected, retrospective sample studied in thick sections. [[Braak2017]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Stage is not severity</h4><p>Many older people with no neurological signs have stage 4–6 pathology at death, and some people at stages 3–4 had severe Parkinson's. [[Burke2008]] About 55% of people at stages 5–6 in one series had no dementia or parkinsonism. [[Parkkinen2008]] A review found no relationship between Braak stage and clinical severity. [[Jellinger2009]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Body-first and brain-first</h4><p>More than 94% of people with isolated RBD have markedly abnormal cardiac MIBG, yet they show only a 20–25% average fall in putaminal dopamine markers, against more than 50% in early Parkinson's. About 30% of people at Hoehn and Yahr I–II are expected to be RBD-positive. [[Borghammer2019]] An imaging study found the two predicted orders: heart and colon first in RBD-positive people, putamen first in RBD-negative ones. [[Horsager2020]]</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Amygdala-predominant cases</h4><p>In about 43–60% of late-stage Alzheimer's cases, Lewy pathology is mostly or only in the amygdala. Braak and Del Tredici say their staging does not apply to these cases. [[Braak2017]] In population brains, 29% were amygdala-predominant. [[Burke2008]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>A unified staging system</h4><p>Beach and colleagues allowed two routes, brainstem-first and limbic-first. Their five stages classified all 417 brains and tracked nigral loss, MMSE and motor scores step by step. [[Beach2009]]</p></div>
   <div class="card"><span class="ev hyp">Hypothesis</span><h4>Braak's group replies</h4><p>Braak and Del Tredici argue that the staging shaped research on the peripheral nervous system, defined prodromal cohorts and supported spreading models. They propose the earliest lesions in the olfactory bulb, the vagal nucleus and possibly the gut. [[Braak2017]] The surgical tests of the gut route are plotted in <a href="#synuclein" data-go="synuclein">Alpha-synuclein and Lewy bodies</a>.</p></div>
   <div class="card"><span class="ev early">Early evidence</span><h4>Symptoms before the tremor</h4><p>Timed back from diagnosis, smell loss is predicted to start more than 20 years before, constipation 10–16 years before, and bradykinesia about 5–6 years before. [[Fereshtehnejad2019]] More in <a href="#prodrome" data-go="prodrome">Before the tremor</a>.</p></div>`;

  const prevR=redraws.braak;redraws.braak=()=>{prevR&&prevR();drawFit();drawBody(0)};
};
