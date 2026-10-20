/* =============== 1.3 TDP-43 and what goes wrong =============== */
/* Three step lists share one timeline grid, so the slider means the same moment in each pathology. */
const TD_STEPS={
 tdp:[
  {from:0,at:.06,k:'Normal',t:'TDP-43 works in the nucleus',
   txt:'TDP-43 is a 414-amino-acid RNA-binding protein made from the TARDBP gene on chromosome 1. At steady state most of it is in the nucleus, probably as a dimer held together head to head by its N-terminal domain. It shuttles out to the cytoplasm and back, and the shuttling depends on ongoing transcription. [[Prasad2019,Ling2013,Ayala2008]]',
   pt:'TDP-43 is a helper protein that mostly stays in the cell\'s control centre, the nucleus. It slips out now and then and comes back.',
   hook:'TDP-43: TARDBP gene, chromosome 1, 414 amino acids, normally <b>nuclear</b>. TDP-43 is essential: mice cannot live without the gene. [[Prasad2019,Ling2013]]'},
  {from:.16,at:.24,k:'Splicing',t:'It keeps cryptic exons out',
   txt:'In the nucleus TDP-43 binds UG/TG-rich RNA. In mouse brain it bound RNA from 6,304 genes, and removing it altered 965 splicing events; the hardest-hit RNAs came from long-intron genes for synapse proteins. It also limits its own production. A key job is keeping "cryptic" exons out of mature mRNA. Bound in STMN2 intron 1, it stops cryptic exon 2a and its early polyadenylation site from being used. [[Buratti2001,Polymenidou2011,Ling2015,Melamed2019]]',
   pt:'A gene is first copied as a rough draft. TDP-43 acts like an editor that makes sure a piece of the STMN2 draft that should never be kept is left out.',
   hook:'Repressing cryptic exons is a core TDP-43 job. STMN2 cryptic exon 2a is the best-known example. [[Ling2015,Melamed2019]]'},
  {from:.32,at:.40,k:'Stress',t:'It moves into stress granules',
   txt:'Under stress, TDP-43 joins stress granules: droplets without a membrane that form by phase separation, driven by low-complexity domains such as its C-terminal tail. In cultured cells most TDP-43 inclusions overlapped stress granules, and inclusions in patient tissue carried the stress granule markers TIA-1 and eIF3. ALS mutations often fall in these low-complexity domains. [[LiuYesucevitz2010,Taylor2016]]',
   pt:'When the cell is under strain, TDP-43 gathers with other proteins into temporary blobs in the cell fluid.',
   hook:'Low-complexity (prion-like) domains drive phase separation of TDP-43, FUS and hnRNPA1. [[Taylor2016]]'},
  {from:.48,at:.56,k:'Mislocalised',t:'It fails to return and clumps',
   txt:'With lasting stress or too much TDP-43 in the cytoplasm, its droplets can harden into gels and solids. In one cell study this happened without conventional stress granules, so whether stress granules are the seed is debated (see Open questions below). The nucleus empties, and TDP-43 builds up in cytoplasmic inclusions. These are hyperphosphorylated by casein kinases 1 and 2 at C-terminal sites, ubiquitinated, and cut into C-terminal fragments of 18-26 kDa. [[GassetRosa2019,LiuYesucevitz2010,Neumann2006,Hasegawa2008]]',
   pt:'The protein leaks out of the nucleus, does not come back, and sticks together in clumps.',
   hook:'ALS inclusions hold TDP-43 that is <b>phosphorylated, ubiquitinated and cleaved</b>, and the nucleus is cleared. About 97% of ALS in Feldman 2022; "over 90%" in Ling 2013. [[Feldman2022,Ling2013]]'},
  {from:.64,at:.72,k:'Loss of function',t:'Cryptic exons slip in: STMN2 falls',
   txt:'Without nuclear TDP-43, cryptic exon 2a enters the STMN2 transcript and its early polyadenylation site cuts the mRNA short, so stathmin-2 protein falls. Klim 2019 describes this as cryptic-exon splicing and Melamed 2019 as premature polyadenylation; both describe the same truncated transcript. It was seen in stem-cell-derived motor neurons and in motor cortex and spinal cord from people with sporadic and C9orf72 ALS. Stathmin-2 is needed for axon outgrowth and repair, and restoring it rescued regrowth in cell models. UNC13A, a synapse gene, also gains a cryptic exon and its mRNA is destroyed. Common ALS and FTD risk variants in that intron make this worse. [[Klim2019,Melamed2019,Ma2022,Brown2022]]',
   pt:'With the editor gone, a wrong piece is kept in the copy. The cell stops making stathmin-2, which the nerve fibre needs to grow and repair itself.',
   hook:'Loss of nuclear TDP-43 lets cryptic exons into <b>STMN2</b> (axon growth and repair) and <b>UNC13A</b> (synapse function). [[Klim2019,Ma2022,Brown2022]]'},
  {from:.80,at:.88,k:'Gain of toxicity',t:'Aggregates harm the cell',
   txt:'Hardened cytoplasmic TDP-43 pulled in nuclear transport factors (importin-α and Nup62) and displaced others (RanGap1, Ran and Nup107). Import into the nucleus was blocked, more nuclear TDP-43 was lost, and the cells died. Ling and colleagues conclude that loss of nuclear function and toxic gain of function both probably contribute. Not every model fits: some mutant TDP-43 mice lost motor neurons without clumps or nuclear loss. [[GassetRosa2019,Ling2013]]',
   pt:'The clumps also do harm of their own. They catch the cell\'s transport helpers, so even less of the protein gets back into the nucleus.',
   hook:'Loss of function <b>and</b> gain of toxicity: both are thought to contribute. [[Ling2013]]'}
 ],
 sod1:[
  {from:0,at:.06,k:'SOD1-ALS · Normal',t:'SOD1 is a copper-zinc enzyme',
   txt:'SOD1 is an enzyme in the cytoplasm made of two subunits that bind copper and zinc. It turns superoxide into oxygen and hydrogen peroxide. Its gene is on chromosome 21q, and it was the first ALS gene, found in 1993. TDP-43 does its normal work in the nucleus. [[Rosen1993,Taylor2016]]',
   pt:'SOD1 is a cleaning enzyme in the cell fluid. In this form of ALS, a change in its gene makes the enzyme fold badly.'},
  {from:.16,at:.24,k:'SOD1-ALS · Unstable',t:'A variant destabilises it',
   txt:'Five ALS-linked SOD1 variants all made the metal-free (apo) protein much less stable, and the less stable the variant, the shorter the mean survival of people carrying it. Oxidised normal and mutant SOD1 both come apart from dimers into monomers before they aggregate. [[Lindberg2002,Rakhit2004]]',
   pt:'The two halves of the enzyme lose their metal and fall apart.'},
  {from:.32,at:.40,k:'SOD1-ALS · Misfolding',t:'Misfolded SOD1 clumps',
   txt:'The misfolded monomers aggregate. SOD1-containing aggregates were common to different mutants in mice, and SOD1-ALS shows inclusions of abnormal SOD1. [[Bruijn1998,Taylor2016]]',
   pt:'The broken halves stick together into clumps.'},
  {from:.48,at:.56,k:'SOD1-ALS · No TDP-43 clumps',t:'TDP-43 stays in the nucleus',
   txt:'In an autopsy series of 111 cases, all sporadic, dementia-associated and SOD1-negative familial cases had TDP-43-positive inclusions. None of the 15 SOD1 cases did, although they had ubiquitin-positive inclusions. The authors suggest SOD1-ALS "may not be the familial counterpart of sporadic ALS". So the drawing keeps TDP-43 in the nucleus and its STMN2 job intact. [[Mackenzie2007]]',
   pt:'In this form of ALS, TDP-43 stays where it belongs. A different protein is the problem.',
   hook:'SOD1-ALS: ubiquitin-positive inclusions <b>without TDP-43</b>. [[Mackenzie2007,Taylor2016]]'},
  {from:.64,at:.72,k:'SOD1-ALS · Toxic gain',t:'A new, harmful property',
   txt:'Mice carrying human G93A SOD1, a change with little effect on enzyme activity, became paralysed. SOD1 knockout mice do not get ALS, and adding or removing normal SOD1 did not change disease in mutant mice. The harm comes from a new property of the mutant protein, not from too little enzyme. Large aggregates alone are not enough: removing them did not change disease in mice. [[Gurney1994,Reaume1996,Bruijn1998,Taylor2016]]',
   pt:'The problem is not that the enzyme stops cleaning. The badly folded protein itself does damage.',
   hook:'SOD1-ALS is a <b>toxic gain of function</b>, independent of dismutase activity. [[Taylor2016]]'},
  {from:.80,at:.88,k:'SOD1-ALS · Axon and glia',t:'The axon, and the cells around it',
   txt:'In SOD1 models, axonal transport slows months before neurons die, and in SOD1 mice the nerve endings on muscle disconnect before cell bodies are lost (dying-back). Mutant SOD1 in microglia and astrocytes speeds progression or kills motor neurons in models. Because this route depends on the SOD1 protein itself, lowering SOD1 is a treatment target: see <a href="#tofersen" data-go="tofersen">Tofersen, gene-targeted</a>. [[Taylor2016,Fischer2004,Boillee2006,Nagai2007,Miller2022]]',
   pt:'Supplies stop moving down the nerve fibre, its far end pulls back from the muscle, and nearby support cells add to the damage.'}
 ],
 fus:[
  {from:0,at:.06,k:'FUS-ALS · Normal',t:'FUS, another RNA-binding protein',
   txt:'FUS, like TDP-43, is an RNA-binding protein with a low-complexity, prion-like domain. FUS mutations on chromosome 16 were found in familial ALS in 2009. Both proteins are drawn mainly in the nucleus here. [[Taylor2016,Kwiatkowski2009]]',
   pt:'FUS is a second helper protein of the same kind as TDP-43.'},
  {from:.16,at:.24,k:'FUS-ALS · Mutations',t:'Mutations cluster in two places',
   txt:'FUS mutations cluster in its low-complexity domain and in its C-terminal nuclear localisation signal (NLS), the tag that brings it into the nucleus. In a meta-analysis, 90% of FUS mutations were in the C-terminal domain. NLS mutations increase cytoplasmic FUS. [[Ling2013,Naumann2019]]',
   pt:'Most changes hit the part of FUS that works as its entry ticket to the nucleus.'},
  {from:.32,at:.40,k:'FUS-ALS · Stress',t:'Phase separation under stress',
   txt:'Like TDP-43, FUS phase-separates into stress granules through its low-complexity domain, and ALS mutations are frequent in that domain. [[Taylor2016]]',
   pt:'Under strain, FUS also gathers into temporary blobs in the cell fluid.'},
  {from:.48,at:.56,k:'FUS-ALS · Mislocalised',t:'FUS builds up in the cytoplasm',
   txt:'Mutant FUS accumulated in the cytoplasm of neurons. FUS-ALS shows FUS-positive cytoplasmic inclusions without TDP-43-positive aggregates, though one review notes that "some debate remains". [[Kwiatkowski2009,Renton2014,Taylor2016]]',
   pt:'FUS leaks out of the nucleus and clumps, while TDP-43 stays put.',
   hook:'FUS-ALS: FUS inclusions, not TDP-43 inclusions. [[Taylor2016,Renton2014]]'},
  {from:.64,at:.72,k:'FUS-ALS · TDP-43 intact',t:'TDP-43 stays in the nucleus',
   txt:'With no TDP-43 inclusions, the drawing keeps TDP-43 bound to STMN2 and the cryptic exon out. This follows from the drawing\'s logic; the sources used here did not measure STMN2 in FUS-ALS. [[Taylor2016]]',
   pt:'Here TDP-43 is still doing its editing job.'},
  {from:.80,at:.88,k:'FUS-ALS · Who it affects',t:'Often young, often new',
   txt:'Among 14 people with sporadic ALS that began before age 35, 6 (43%) carried a FUS mutation, and in all 5 families where parents were tested it had arisen new (de novo). P525L and truncating variants most often caused juvenile onset and rapid progression. How FUS inclusions damage the axon is not drawn here. [[Hubers2015,Naumann2019,Conte2012]]',
   pt:'FUS-ALS often starts young, and the gene change is often new in the person rather than inherited.',
   hook:'Young-onset sporadic ALS: think <b>FUS</b>, often de novo (P525L). [[Hubers2015,Conte2012]]'}
 ]
};
const TD_TXT={
 modes:[ ['tdp','TDP-43 (most ALS)'],['sod1','SOD1-ALS'],['fus','FUS-ALS'] ],
 cap:{tdp:'Schematic, not to scale. Shares in the bars are drawn, not measured.',
      sod1:'Schematic. In SOD1-ALS TDP-43 stays in the nucleus, so its STMN2 job is drawn as normal.',
      fus:'Schematic. In FUS-ALS TDP-43 stays in the nucleus; the drawing stops at the FUS inclusions.'},
 tdpLoc:'TDP-43 location',fusLoc:'FUS location',stmnBar:'stathmin-2 protein',sodBar:'misfolded SOD1',
 nucW:'nucleus',cytW:'cytoplasm',
 loc:{hi:'mostly in the nucleus',mid:'leaving the nucleus',lo:'mostly in the cytoplasm'},
 lvl:{normal:'normal',falling:'falling',low:'low',none:'none',rising:'rising',high:'high'},
 NUC:'NUCLEUS',CYT:'CYTOPLASM',pore:'nuclear pore',sg:'stress granule',
 incl:{tdp:'pTDP-43 inclusion',sod1:'SOD1 inclusion',fus:'FUS inclusion'},
 tox:'blocks nuclear import',
 axon:'axon',axonSlow:'axon: transport slows',cone:'growth cone',coneOk:'extending',coneR:'retracting',
 strip:'STMN2 pre-mRNA',stripSub:'made in the nucleus',tdpB:'TDP-43',tdpGone:'no TDP-43',ce:'cryptic exon',
 mature:'mature mRNA',full:'full length: stathmin-2 made',cut:'cut short: no stathmin-2',polyA:'AAAA',
 ex1:'1',ex2a:'2a',ex2:'2',more:'…',unc:'UNC13A protein (synapse)',
 key:{tdp:'TDP-43',sg:'stress granule',P:'phosphate',Ub:'ubiquitin',imp:'import factor',sodN:'SOD1',sodM:'misfolded SOD1',fus:'FUS'},
 sodState:{native:'folded dimer',split:'coming apart',mis:'misfolded',agg:'in inclusions'},
 stmnState:{full:'full length',cut:'cryptic exon in'},
 state:{
  tdp:(loc,stmn,cone)=>`TDP-43: <b>${loc}</b> · STMN2 mRNA: <b>${stmn}</b> · growth cone: <b>${cone}</b>`,
  sod1:(loc,sod,cone)=>`TDP-43: <b>${loc}</b> · SOD1: <b>${sod}</b> · growth cone: <b>${cone}</b>`,
  fus:(loc,fus)=>`TDP-43: <b>${loc}</b> · FUS: <b>${fus}</b>`
 },
 dom:{title:'TDP-43, 414 amino acids',ntd:'N-terminal',rrm1:'RRM1',rrm2:'RRM2',ctd:'C-terminal low-complexity',ctdS:'C-terminal',
  nls:'NLS 82–98',nes:'NES 239–250',r1:'1–102',r2:'104–176',r3:'192–262',r4:'274–414',qn:'Q/N-rich 345–366',gly:'Gly-rich 366–414',
  mut:'over 40 ALS mutations in this domain',P:'P',
  role:['Highlighted: N-terminal domain (dimer) and NLS (the signal for entry into the nucleus)',
        'Highlighted: RRM1 and RRM2, the motifs that bind RNA',
        'Highlighted: the low-complexity tail, which drives phase separation',
        'Highlighted: the NLS, and the C-terminal tail where phosphorylation sites cluster',
        'Highlighted: RRM1 and RRM2, whose nuclear job is lost',
        'Highlighted: the C-terminal tail, cut into 18–26 kDa fragments in inclusions'],
  ref:'TDP-43 shown for reference: it keeps its normal domains and place in this form.'}
};
const TD_SPR={
 btn:n=>`Stage ${n}`,code:(n,i)=>`${n}${'abcd'[i]}`,kick:(n,m)=>`Stage ${n} of ${m}`,head:n=>`Stage ${n}`,
 regions:[
  {s:1,n:'Agranular motor cortex',p:[175,54]},
  {s:1,n:'Brainstem motor nuclei (V, VII, X–XII)',p:[222,252]},
  {s:1,n:'Spinal alpha-motor neurons',p:[224,300]},
  {s:2,n:'Prefrontal cortex (middle frontal gyrus)',p:[95,78]},
  {s:2,n:'Reticular formation',p:[220,228]},
  {s:2,n:'Precerebellar nuclei',p:[230,276]},
  {s:2,n:'Red nucleus',p:[216,204]},
  {s:3,n:'Prefrontal cortex (gyrus rectus, orbital gyri)',p:[64,170]},
  {s:3,n:'Postcentral cortex',p:[209,60]},
  {s:3,n:'Striatum',p:[150,135]},
  {s:4,n:'Anteromedial temporal lobe, with hippocampus',p:[135,204]}
 ],
 stages:[
  {t:'Motor system first',txt:'The 6 stage-1 cases had pTDP-43 in the agranular motor cortex, the brainstem motor nuclei of cranial nerves V, VII and X–XII, and spinal alpha-motor neurons: the upper and lower motor neurons of ALS. [[Brettschneider2013]]',
   pt:'The clumps show up first in the nerve cells that control movement.'},
  {t:'Prefrontal cortex and brainstem',txt:'Stage 2 adds the prefrontal neocortex (middle frontal gyrus), the reticular formation, the precerebellar nuclei and the red nucleus. [[Brettschneider2013]]',
   pt:'Next, parts of the front of the brain and more of the brainstem are involved.'},
  {t:'Orbital prefrontal, postcentral and striatum',txt:'Stage 3 adds prefrontal cortex in the gyrus rectus and orbital gyri, then the postcentral neocortex and the striatum. The authors suggest the frontal spread could underlie difficulties with planning and judgement (executive function). [[Brettschneider2013]]',
   pt:'Areas that help with planning and judgement can now be affected.'},
  {t:'Temporal lobe and hippocampus',txt:'Stage 4 adds the anteromedial temporal lobe, including the hippocampus. The authors read the sequence as consistent with spread along axonal pathways; that reading is a hypothesis. In the clinic, weakness also usually starts in one place and spreads to neighbouring regions. [[Brettschneider2013,Ravits2009,Feldman2022]]',
   pt:'Last, a memory area deep in the side of the brain is reached.',
   hook:'Brettschneider stages: 1 motor cortex, brainstem and spinal motor neurons; 2 prefrontal and brainstem; 3 orbital, postcentral, striatum; 4 temporal lobe and hippocampus. [[Brettschneider2013]]'}
 ]
};
inits.tdp43=()=>{
  const svg=$('#tdSvg'),dom=$('#tdDom'),rg=$('#tdT');let mode='tdp';
  const P2=(a,b,c,u)=>u<.5?[lerp(a[0],b[0],u*2),lerp(a[1],b[1],u*2)]:[lerp(b[0],c[0],u*2-1),lerp(b[1],c[1],u*2-1)];
  const EP=(e,a,k=1)=>[e.cx+e.rx*k*Math.cos(a),e.cy+e.ry*k*Math.sin(a)];
  const CW={xs:5.8,sm:6.7,lbl:7.8};
  const tw=(s,c='xs')=>String(s).length*CW[c];
  /* wrap a label into tspans no wider than w (approximate widths, so translations rewrap themselves) */
  function wrapLines(s,w,c='xs'){const max=Math.max(8,Math.floor(w/CW[c]));const out=[];let line='';
    String(s).split(' ').forEach(wd=>{if(line&&(line+' '+wd).length>max){out.push(line);line=wd}else line=line?line+' '+wd:wd});if(line)out.push(line);return out}
  function wrapT(x,y,s,w,c,anchor,lh,style=''){const ls=wrapLines(s,w,c);return {n:ls.length,svg:`<text x="${f1(x)}" y="${f1(y)}" class="t-${c}${anchor?' '+anchor:''}" style="${style}">${ls.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?lh:0}">${l}</tspan>`).join('')}</text>`}}
  /* glyphs: SOD1 (two diamonds, metal dots) and FUS (capsule with a wavy tail); TDP-43 comes from the kit */
  function sodG(x,y,s,split,mis,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}">`;const d=5+split*5;
    [-1,1].forEach(k=>{const c=k*d;
      if(mis>.5)g+=`<path d="M${f1(c-5)} -3 l4 -3.5 l5.5 2 l.5 5 l-4.5 4 l-5 -1.5z" transform="rotate(${f1(k*25*mis)} ${f1(c)} 0)" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.3;stroke-linejoin:round"/>`;
      else g+=`<rect x="${f1(c-4.2)}" y="-4.2" width="8.4" height="8.4" rx="1.6" transform="rotate(45 ${f1(c)} 0)" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.3"/>`;
      if(split<1)g+=`<circle cx="${f1(c)}" cy="0" r="1.7" style="fill:var(--warn);opacity:${f1(1-split)}"/>`});
    return g+'</g>'}
  function fusG(x,y,s,mis,o=1){const c=mis?'var(--tdp)':'var(--steel)',f=mis?'var(--tdp-soft)':'var(--steel-soft)';
    return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}"><rect x="-7" y="-3.8" width="13" height="7.6" rx="3.8" style="fill:${f};stroke:${c};stroke-width:1.3"/><path d="M6 0 q2.5 -3.4 5 0 t5 0" style="fill:none;stroke:${c};stroke-width:1.3"/></g>`}
  const pTag=(x,y,o=1)=>`<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" style="fill:var(--warn);stroke:var(--panel);stroke-width:1"/><text x="${f1(x)}" y="${f1(y+3.3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text></g>`;
  const ubTag=(x,y,o=1)=>`<g style="opacity:${f1(o)}"><rect x="${f1(x-9)}" y="${f1(y-6)}" width="18" height="12" rx="3.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1"/><text x="${f1(x)}" y="${f1(y+3.3)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">Ub</text></g>`;
  const impG=(x,y,o=1)=>`<rect x="${f1(x-4)}" y="${f1(y-4)}" width="8" height="8" rx="1.5" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:var(--steel);opacity:${f1(o)}"/>`;
  const sgG=(x,y,r,o=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--steel-soft);fill-opacity:.75;stroke:var(--steel);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(o)}"/>`;
  /* the 14 TDP-43 slots in the nucleus, as fractions of its radii */
  const SLOT=[ [-.55,-.22],[-.18,-.22],[.2,-.22],[.52,-.22],[-.72,.12],[-.36,.12],[0,.12],[.36,.12],[-.55,.45],[-.18,.45],[.2,.45],[.52,.45],[-.25,.75],[.12,.75] ];
  const GA=[3,7,11],GB=[0,1,2,5,6,8,9,10,12],GC=[4,13],LOOP=7;          /* stress granule group, drained group, faint remainder */
  const FUS_SLOT=[1,3,5,9,11],FUS_A=[0,1,2],FUS_B=[3,4];
  const SG_OFF=[ [-10,-8],[-2,4],[-13,11] ];
  const PTAG=[-2.5,-.35,1.95],UBTAG=[-1.25,.85,2.85],IMP=[.1,.75,-.25];
  /* integral of ramp(x,a,b) from 0 to t: lets cargo slow smoothly as t moves */
  const iramp=(t,a,b)=>t<a?0:t<b?(t-a)*(t-a)/(2*(b-a)):(b-a)/2+(t-b);
  function keyItems(m){const K=TD_TXT.key;
    return m==='tdp'?[ ['tdp',K.tdp],['sg',K.sg],['P',K.P],['Ub',K.Ub],['imp',K.imp] ]
         :m==='sod1'?[ ['tdp',K.tdp],['sodN',K.sodN],['sodM',K.sodM],['Ub',K.Ub] ]
         :[ ['tdp',K.tdp],['fus',K.fus],['sg',K.sg] ]}
  function keyLayout(m,w){let x=0,row=0;const out=[];keyItems(m).forEach(([k,l])=>{const iw=26+tw(l,'xs');if(x>0&&x+iw>w){row++;x=0}out.push({k,l,x,row});x+=iw+14});return {items:out,rows:row+1}}
  function draw(t){
    const N0=NARROW(),KL=keyLayout(mode,N0?360:330);
    const keyY=N0?452:378,keyEnd=keyY+(KL.rows-1)*18+8;
    const nH=Math.round(keyEnd+64+8+232+12);
    const N=vb(svg,'720 460',`400 ${nH}`);
    const L=N?{bar:{x:20,y:26,w:360},cell:{cx:200,cy:215,rx:180,ry:136},nuc:{cx:135,cy:205,rx:80,ry:66},
               lNuc:[135,160],lCyt:[215,103],sg:[300,142],sgL:[300,184],inc:[292,242],incL:[255,301],
               pool:[ [50,252],[110,322] ],sod:[ [245,120],[305,128],[252,182],[335,190],[85,298] ],
               dend:[ [Math.PI+.25,18],[Math.PI-.55,16],[-1.9,14],[-1.15,14] ],
               axon:'M265 342 C265 372 250 392 220 392',ax0:220,ay:392,gF:42,gR:132,dir:-1,axL:[220,378,'t-end'],coneY:414,
               key:{x:20,y:keyY},mb:{x:20,y:keyEnd+24,w:360},st:{x:20,y:keyEnd+72,w:360,h:232}}
            :{bar:{x:24,y:26,w:360},cell:{cx:205,cy:215,rx:185,ry:140},nuc:{cx:145,cy:205,rx:80,ry:66},
               lNuc:[145,160],lCyt:[215,100],sg:[300,140],sgL:[300,182],inc:[298,245],incL:[265,304],
               pool:[ [60,250],[150,330] ],sod:[ [250,120],[312,130],[258,182],[338,190],[92,300] ],
               dend:[ [Math.PI+.25,20],[Math.PI-.5,18],[-1.9,14],[-1.2,14] ],
               axon:'M371 276 C400 320 405 395 440 395',ax0:440,ay:395,gF:688,gR:566,dir:1,axL:[448,381,''],coneY:420,
               key:{x:24,y:keyY},mb:{x:420,y:18,w:290},st:{x:420,y:75,w:290,h:232}};
    const T=TD_TXT,isT=mode==='tdp',isS=mode==='sod1',isF=mode==='fus';
    /* ---- timeline quantities ---- */
    const sgRise=ramp(t,.32,.37),sgFall=ramp(t,.52,.60);
    const harden=ramp(t,.50,.60),tox=isT?ease(ramp(t,.80,.92)):0;
    const ce=isT?ease(ramp(t,.64,.72)):0,bound=isT?1-ramp(t,.56,.66):1;
    const stmn=isT?1-.82*ramp(t,.66,.78):1,unc=isT?1-.7*ramp(t,.68,.80):1;
    const retract=isT?ease(ramp(t,.68,.86)):isS?ease(ramp(t,.84,.97)):0;
    const split=isS?ease(ramp(t,.17,.28)):0,mis=isS?ramp(t,.30,.42):0;
    const nuc=L.nuc,cell=L.cell,poreA=EP(nuc,-.45),poreB=EP(nuc,.5);
    const home=i=>[nuc.cx+SLOT[i][0]*nuc.rx,nuc.cy+SLOT[i][1]*nuc.ry];
    let s=`<defs>${marker('tdAr')}</defs>`;
    /* ---- the cell ---- */
    L.dend.forEach(([a,len])=>{const p=EP(cell,a),q=EP(cell,a,1+len/Math.max(cell.rx,cell.ry)*1.4);
      s+=`<path d="M${f1(p[0])} ${f1(p[1])} L${f1(q[0])} ${f1(q[1])}" style="stroke:var(--cell-line);stroke-width:7;stroke-linecap:round"/>`});
    s+=`<path d="${L.axon} L${f1(lerp(L.gF,L.gR,retract))} ${L.ay}" style="fill:none;stroke:var(--cell-line);stroke-width:8;stroke-linecap:round"/><path d="${L.axon} L${f1(lerp(L.gF,L.gR,retract))} ${L.ay}" style="fill:none;stroke:var(--cell);stroke-width:5;stroke-linecap:round"/>`;
    s+=`<ellipse cx="${cell.cx}" cy="${cell.cy}" rx="${cell.rx}" ry="${cell.ry}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2.2"/>`;
    const nGlow=isS?bump(t,.48,.64):isF?bump(t,.64,.80):0;
    s+=`<ellipse cx="${nuc.cx}" cy="${nuc.cy}" rx="${nuc.rx}" ry="${nuc.ry}" style="fill:var(--steel-soft);stroke:var(--nuc);stroke-width:${f1(2+2.5*nGlow)}"/>`;
    [-.45,.5,1.6,2.6,-2.1].forEach(a=>{const p=EP(nuc,a);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.6" style="fill:var(--cell);stroke:var(--nuc);stroke-width:1.4"/>`;
      if(tox>.5)s+=`<path d="M${f1(p[0]-4)} ${f1(p[1]-4)} l8 8 m0 -8 l-8 8" style="stroke:var(--tdp);stroke-width:1.8;opacity:${f1(ramp(tox,.5,.8))}"/>`});
    s+=`<text x="${L.lNuc[0]}" y="${L.lNuc[1]}" class="t-sm t-mid" style="fill:var(--nuc);font-weight:600">${T.NUC}</text><text x="${L.lCyt[0]}" y="${L.lCyt[1]}" class="t-sm t-mid">${T.CYT}</text>`;
    const pb=EP(nuc,1.6);s+=`<text x="${f1(pb[0])}" y="${f1(pb[1]+18)}" class="t-xs t-mid">${T.pore}</text>`;
    /* ---- stress granule ---- */
    const sgO=(isT||isF)?sgRise*(1-sgFall):0;
    if(sgO>0){s+=sgG(L.sg[0],L.sg[1],24,sgO);s+=`<text x="${L.sgL[0]}" y="${L.sgL[1]}" class="t-xs t-mid" style="fill:var(--steel);opacity:${f1(sgRise*(1-ramp(t,.46,.50)))}">${T.sg}</text>`}
    /* ---- inclusion (drawn under the molecules that join it) ---- */
    const incR=isS?6+16*ramp(t,.44,.6)+10*ramp(t,.6,.85):isT?6+14*harden+8*ramp(t,.60,.75)+8*tox:6+14*ramp(t,.50,.62)+10*ramp(t,.62,.85);
    const incO=isS?ramp(t,.42,.47):ramp(t,.49,.54);
    const ic=L.inc;
    if(incO>0){let d='';for(let k=0;k<11;k++){const a=k/11*Math.PI*2,rr=incR*(1+.16*Math.sin(k*2.3+1));d+=(k?'L':'M')+f1(ic[0]+Math.cos(a)*rr)+' '+f1(ic[1]+Math.sin(a)*rr)}
      s+=`<path d="${d}Z" style="fill:var(--tdp);fill-opacity:.82;stroke:var(--tdp);stroke-width:2;stroke-linejoin:round;opacity:${f1(incO)}"/>`;
      const tagO=isT?ramp(t,.61,.66):isS?ramp(t,.58,.64):0;
      if(isT)PTAG.forEach(a=>{s+=pTag(ic[0]+Math.cos(a)*(incR+2),ic[1]+Math.sin(a)*(incR+2),tagO)});
      if(isT||isS)UBTAG.forEach(a=>{s+=ubTag(ic[0]+Math.cos(a)*(incR+3),ic[1]+Math.sin(a)*(incR+3),tagO)});
      s+=`<text x="${L.incL[0]}" y="${L.incL[1]}" class="t-xs t-mid" style="fill:var(--tdp);font-weight:700;opacity:${f1(incO)}">${T.incl[mode]}</text>`;
      if(tox>0)s+=`<text x="${L.incL[0]}" y="${L.incL[1]+13}" class="t-xs t-mid" style="fill:var(--tdp);opacity:${f1(ramp(tox,.3,.7))}">${T.tox}</text>`}
    /* ---- import factors pulled into the inclusion (gain of toxicity) ---- */
    if(isT&&t>.78)IMP.forEach((a,j)=>{const p0=EP(nuc,a,1.13),u=ease(ramp(t,.82+.02*j,.9+.02*j)),ang=Math.PI+.6-j*.6,p1=[ic[0]+Math.cos(ang)*incR*.4,ic[1]+Math.sin(ang)*incR*.4];
      s+=impG(lerp(p0[0],p1[0],u),lerp(p0[1],p1[1],u),ramp(t,.78,.82))});
    /* ---- TDP-43 molecules ---- */
    let nucSum=0,tdpN=0;
    const showT=i=>!(isF&&FUS_SLOT.includes(i));
    SLOT.forEach((_,i)=>{if(!showT(i))return;tdpN++;
      const h=home(i);let p=h,o=1,w=1,agg=0;
      if(i===LOOP&&(!isT||t<.32)){const q=(t*6.25)%1,out=[poreB[0]+26,poreB[1]+16];p=P2(h,poreB,out,q<.5?q*2:2-q*2);w=1-ramp(q<.5?q*2:2-q*2,.4,.6)}
      if(isT){
        const ja=GA.indexOf(i),jb=GB.indexOf(i);
        if(ja>=0&&(i!==LOOP||t>=.32)){const u=ease(ramp(t,.33+.025*ja,.40+.025*ja)),sgp=[L.sg[0]+SG_OFF[ja][0],L.sg[1]+SG_OFF[ja][1]];
          p=P2(h,poreA,sgp,u);w=1-ramp(u,.4,.6);
          const v=ease(ramp(t,.50+.02*ja,.58+.02*ja));if(v>0){p=[lerp(sgp[0],ic[0],v),lerp(sgp[1],ic[1],v)];o=1-ramp(v,.7,1)}}
        if(jb>=0){const u=ease(ramp(t,.48+.012*jb,.54+.012*jb)),dst=[ic[0]-6+(jb%3)*5,ic[1]-5+(jb%2)*8];p=P2(h,poreB,dst,u);w=1-ramp(u,.4,.6);o=1-ramp(u,.8,1)}
        if(GC.includes(i)){o=1-.6*ramp(t,.55,.66);w=o}
      }
      nucSum+=w;
      if(o>.02)s+=tdp(p[0],p[1],1.15,o,agg)});
    /* cytoplasmic pool, always there: TDP-43 shuttles */
    L.pool.forEach(p=>{s+=tdp(p[0],p[1],1.15,1,0)});
    const share=nucSum/(tdpN+L.pool.length);
    /* ---- FUS molecules ---- */
    let fusSum=0;
    if(isF)FUS_SLOT.forEach((si,j)=>{const h=home(si);let p=h,o=1,w=1,m=0;
      const ja=FUS_A.indexOf(j),jb=FUS_B.indexOf(j);
      if(ja>=0){const sgp=[L.sg[0]+SG_OFF[ja][0],L.sg[1]+SG_OFF[ja][1]],u=ease(ramp(t,.30+.03*ja,.38+.03*ja));p=P2(h,poreA,sgp,u);w=1-ramp(u,.4,.6);m=u>.6?1:0;
        const v=ease(ramp(t,.50+.025*ja,.58+.025*ja));if(v>0){p=[lerp(sgp[0],ic[0],v),lerp(sgp[1],ic[1],v)];o=1-ramp(v,.7,1)}}
      if(jb>=0){const u=ease(ramp(t,.50+.04*jb,.60+.04*jb));p=P2(h,poreB,[ic[0]-4,ic[1]+2],u);w=1-ramp(u,.4,.6);o=1-ramp(u,.8,1);m=u>.5?1:0}
      fusSum+=w;if(o>.02)s+=fusG(p[0],p[1],1.1,m,o)});
    const fusShare=fusSum/5.6;
    /* ---- SOD1 dimers ---- */
    if(isS)L.sod.forEach((q,j)=>{const u=ease(ramp(t,.44+.03*j,.52+.03*j));const p=[lerp(q[0],ic[0],u),lerp(q[1],ic[1],u)];
      s+=sodG(p[0],p[1],1.15,split,mis,1-ramp(u,.75,1))});
    /* ---- growth cone and cargo ---- */
    const gx=lerp(L.gF,L.gR,retract),d=L.dir;
    const slowA=isS?.80:.82,slowK=isS?.75:isT?.5:0;
    const ph=(t-slowK*iramp(t,slowA,slowA+.08))*9;
    for(let k=0;k<5;k++){const q=((ph+k/5)%1+1)%1,x=lerp(L.ax0,gx-d*12,q);if((x-L.ax0)*d<6)continue;
      s+=`<circle cx="${f1(x)}" cy="${L.ay}" r="2.4" style="fill:var(--axon)"/>`}
    const fl=16*(1-.75*retract);
    [-.75,-.38,0,.38,.75].forEach(a=>{s+=`<path d="M${f1(gx)} ${L.ay} L${f1(gx+d*fl*Math.cos(a))} ${f1(L.ay+fl*Math.sin(a))}" style="stroke:var(--cell-line);stroke-width:2;stroke-linecap:round"/>`});
    s+=`<ellipse cx="${f1(gx+d*2)}" cy="${L.ay}" rx="${f1(6+3*retract)}" ry="${f1(7+2*retract)}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.8"/>`;
    const slowNow=slowK>0&&t>slowA+.04;
    s+=`<text x="${L.axL[0]}" y="${L.axL[1]}" class="t-xs ${L.axL[2]}">${slowNow?T.axonSlow:T.axon}</text>`;
    const cx=clamp(gx,N?40:0,N?400:670);
    s+=`<text x="${f1(cx)}" y="${L.coneY}" class="t-xs t-mid">${T.cone}</text><text x="${f1(cx)}" y="${L.coneY+13}" class="t-xs t-mid" style="${retract>.5?'fill:var(--tdp);font-weight:700':''}">${retract>.5?T.coneR:T.coneOk}</text>`;
    /* ---- TDP-43 location bar ---- */
    const bar=(B,title,stTxt,val,share2)=>{let g=`<text x="${B.x}" y="${B.y}" class="t-sm" style="fill:var(--ink);font-weight:600">${title}</text><text x="${B.x+B.w}" y="${B.y}" class="t-sm t-end">${stTxt}</text>`;
      g+=`<rect x="${B.x}" y="${B.y+8}" width="${B.w}" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(share2){g+=`<rect x="${B.x}" y="${B.y+8}" width="${f1(B.w*val)}" height="14" rx="7" style="fill:var(--steel)"/><rect x="${f1(B.x+B.w*val)}" y="${B.y+8}" width="${f1(B.w*(1-val))}" height="14" rx="7" style="fill:var(--tdp)"/>`;
        g+=`<text x="${B.x}" y="${B.y+36}" class="t-xs" style="fill:var(--steel)">${T.nucW}</text><text x="${B.x+B.w}" y="${B.y+36}" class="t-xs t-end" style="fill:var(--tdp)">${T.cytW}</text>`}
      else g+=`<rect x="${B.x}" y="${B.y+8}" width="${f1(B.w*val)}" height="14" rx="7" style="fill:${share2===false?'var(--steel)':'var(--tdp)'}"/>`;
      return g};
    const locK=v=>v>.7?'hi':v>.35?'mid':'lo';
    s+=bar({x:L.bar.x,y:L.bar.y-8,w:L.bar.w},T.tdpLoc,T.loc[locK(share)],share,true);
    let mbS,mbV,mbShare;
    if(isT){mbV=stmn;mbS=stmn>.95?T.lvl.normal:stmn>.45?T.lvl.falling:T.lvl.low;mbShare=false}
    else if(isS){mbV=ramp(t,.30,.6);mbS=mbV<.05?T.lvl.none:mbV<.95?T.lvl.rising:T.lvl.high;mbShare=0}
    else{mbV=fusShare;mbS=T.loc[locK(fusShare)];mbShare=true}
    s+=bar({x:L.mb.x,y:L.mb.y,w:L.mb.w},isT?T.stmnBar:isS?T.sodBar:T.fusLoc,mbS,mbV,mbShare);
    /* ---- key ---- */
    KL.items.forEach(it=>{const x=L.key.x+it.x,y=L.key.y+it.row*18;let ic2='';
      if(it.k==='tdp')ic2=tdp(x+8,y-3,1,1,0);else if(it.k==='sg')ic2=sgG(x+10,y-3,7);else if(it.k==='P')ic2=pTag(x+10,y-3);else if(it.k==='Ub')ic2=ubTag(x+10,y-3);
      else if(it.k==='imp')ic2=impG(x+10,y-3);else if(it.k==='sodN')ic2=sodG(x+10,y-3,.85,0,0);else if(it.k==='sodM')ic2=sodG(x+10,y-3,.85,.6,1);else if(it.k==='fus')ic2=fusG(x+8,y-3,1,0);
      s+=ic2+`<text x="${f1(x+26)}" y="${y}" class="t-xs">${it.l}</text>`});
    /* ---- STMN2 transcript strip ---- */
    const S=L.st,X=u=>S.x+u*S.w,ry=S.y+84,my=S.y+150;
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${X(.04)}" y="${S.y+20}" class="t-lbl">${T.strip}</text><text x="${X(.04)}" y="${S.y+34}" class="t-xs">${T.stripSub}</text>`;
    const ex=(u0,u1,y,lbl,fill,stroke,dash)=>`<rect x="${f1(X(u0))}" y="${y-9}" width="${f1(X(u1)-X(u0))}" height="18" rx="3" style="fill:${fill};stroke:${stroke};stroke-width:1.5;${dash?'stroke-dasharray:3 2':''}"/><text x="${f1((X(u0)+X(u1))/2)}" y="${y+3.5}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lbl}</text>`;
    s+=`<line x1="${f1(X(.17))}" x2="${f1(X(.79))}" y1="${ry}" y2="${ry}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=ex(.04,.17,ry,T.ex1,'var(--steel-soft)','var(--steel)');
    s+=ex(.36,.50,ry,T.ex2a,ce>.5?'var(--tdp-soft)':'var(--panel)','var(--tdp)',ce<=.5);
    s+=ex(.79,.88,ry,T.ex2,'var(--steel-soft)','var(--steel)');
    s+=`<text x="${f1(X(.94))}" y="${ry+4}" class="t-sm t-mid">${T.more}</text>`;
    const hl=isT?ramp(t,.18,.28):1,arcN=`M${f1(X(.17))} ${ry-9} C${f1(X(.17))} ${ry-46} ${f1(X(.79))} ${ry-46} ${f1(X(.79))} ${ry-9}`;
    s+=`<path d="${arcN}" style="fill:none;stroke:var(--steel);stroke-width:1.6;opacity:${f1(.3*(1-ce))}"/>`;
    s+=`<path d="${arcN}" pathLength="1" style="fill:none;stroke:var(--steel);stroke-width:2.4;stroke-dasharray:${f1(hl)} 1;opacity:${f1(1-ce)}"/>`;
    if(ce>0){s+=`<path d="M${f1(X(.17))} ${ry-9} C${f1(X(.17))} ${ry-32} ${f1(X(.36))} ${ry-32} ${f1(X(.36))} ${ry-9}" style="fill:none;stroke:var(--tdp);stroke-width:2.4;opacity:${f1(ce)}"/>`;
      s+=`<g style="opacity:${f1(ce)}"><line x1="${f1(X(.52))}" x2="${f1(X(.52))}" y1="${ry-12}" y2="${ry+12}" style="stroke:var(--tdp);stroke-width:2"/><text x="${f1(X(.54))}" y="${ry-12}" class="t-xs" style="fill:var(--tdp)">${T.polyA}</text></g>`}
    const tx=X(.23);
    s+=tdp(tx-3,ry-8,1.15,isT?.15+.85*bound:1,0);
    s+=`<text x="${f1(X(.21))}" y="${ry+24}" class="t-xs t-mid" style="${bound<.5?'fill:var(--tdp);font-weight:700':''}">${bound<.5?T.tdpGone:T.tdpB}</text>`;
    s+=`<text x="${f1(X(.36))}" y="${ry+24}" class="t-xs" style="fill:var(--tdp)">${T.ce}</text>`;
    s+=`<text x="${f1(X(.04))}" y="${my-22}" class="t-sm">${T.mature}</text>`;
    s+=`<g style="opacity:${f1(1-ce)}">${ex(.04,.17,my,T.ex1,'var(--steel-soft)','var(--steel)')}${ex(.17,.26,my,T.ex2,'var(--steel-soft)','var(--steel)')}<text x="${f1(X(.285))}" y="${my+4}" class="t-sm t-mid">${T.more}</text><text x="${f1(X(.34))}" y="${my+4}" class="t-xs" style="fill:var(--steel)">${T.full}</text></g>`;
    if(ce>0)s+=`<g style="opacity:${f1(ce)}">${ex(.04,.17,my,T.ex1,'var(--steel-soft)','var(--steel)')}${ex(.17,.31,my,T.ex2a,'var(--tdp-soft)','var(--tdp)')}<text x="${f1(X(.32))}" y="${my+4}" class="t-xs" style="fill:var(--tdp)">${T.polyA}</text><text x="${f1(X(.44))}" y="${my+4}" class="t-xs" style="fill:var(--tdp);font-weight:700">${T.cut}</text></g>`;
    const uy=S.y+192;
    s+=`<text x="${f1(X(.04))}" y="${uy}" class="t-sm">${T.unc}</text>`;
    s+=`<rect x="${f1(X(.04))}" y="${uy+10}" width="${f1(S.w*.6)}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(X(.04))}" y="${uy+10}" width="${f1(S.w*.6*unc)}" height="12" rx="6" style="fill:var(--steel)"/>`;
    s+=`<text x="${f1(X(.68))}" y="${uy+20}" class="t-xs">${unc>.95?T.lvl.normal:unc>.5?T.lvl.falling:T.lvl.low}</text>`;
    svg.innerHTML=s;
    /* ---- domain map ---- */
    drawDom(t);
    /* ---- note ---- */
    const p=phaseOf(TD_STEPS[mode],t);setSt(p);
    const coneS=retract>.5?T.coneR:T.coneOk;
    let st;
    if(isT)st=T.state.tdp(T.loc[locK(share)],ce>.5?T.stmnState.cut:T.stmnState.full,coneS);
    else if(isS){const sk=t<.17?'native':t<.30?'split':t<.5?'mis':'agg';st=T.state.sod1(T.loc[locK(share)],T.sodState[sk],coneS)}
    else st=T.state.fus(T.loc[locK(share)],T.loc[locK(fusShare)]);
    $('#tdNote').innerHTML=noteHTML(TD_STEPS[mode][p])+`<p class="tdstate">${st}</p>`;
  }
  function drawDom(t){
    const N=NARROW(),W=N?400:720,x0=N?20:50,x1=N?380:690,A=a=>x0+(a-1)/(413)*(x1-x0);
    const D=TD_TXT.dom,isT=mode==='tdp',p=phaseOf(TD_STEPS[mode],t);
    const H={ntd:isT&&p===0,nls:isT&&(p===0||p===3),rrm:isT&&(p===1||p===4),ctd:isT&&(p===2||p===3||p===5)};
    const by=N?60:50,bh=22;
    const role=wrapLines(isT?D.role[p]:D.ref,N?360:620,'xs');
    const h=Math.round(by+bh+68+role.length*13);
    vb(dom,`720 ${h}`,`400 ${h}`);
    const box=(a,b,lbl,fill,on,extra='')=>`<rect x="${f1(A(a))}" y="${by}" width="${f1(A(b)-A(a))}" height="${bh}" rx="4" style="fill:${fill};stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:${on?2.6:1.2};${extra}"/>`+(lbl?`<text x="${f1((A(a)+A(b))/2)}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lbl}</text>`:'');
    let s=`<line x1="${x0}" x2="${x1}" y1="${by+bh/2}" y2="${by+bh/2}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=box(1,102,'','var(--panel-2)',H.ntd);
    s+=`<text x="${f1(A(N?42:46))}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${D.ntd}</text>`;
    s+=box(104,176,D.rrm1,'var(--steel-soft)',H.rrm);
    s+=box(192,262,D.rrm2,'var(--steel-soft)',H.rrm);
    s+=box(274,414,'','var(--tdp-soft)',H.ctd);
    s+=`<rect x="${f1(A(345))}" y="${by+1}" width="${f1(A(366)-A(345))}" height="${bh-2}" style="fill:var(--tdp);opacity:.35"/><rect x="${f1(A(366))}" y="${by+1}" width="${f1(A(414)-A(366)-1)}" height="${bh-2}" style="fill:var(--tdp);opacity:.6"/>`;
    s+=`<text x="${f1(A(N?312:330))}" y="${by+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${N?D.ctdS:D.ctd}</text>`;
    s+=`<rect x="${f1(A(82))}" y="${by-3}" width="${f1(A(98)-A(82))}" height="${bh+6}" rx="2" style="fill:var(--steel);opacity:${H.nls?.95:.6};stroke:${H.nls?'var(--ink)':'none'};stroke-width:2"/>`;
    s+=`<rect x="${f1(A(239))}" y="${by-3}" width="${f1(A(250)-A(239))}" height="${bh+6}" rx="2" style="fill:var(--muted);opacity:.7"/>`;
    s+=`<path d="M${f1(A(90))} ${by-4} V${by-12}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(A(90))}" y="${by-16}" class="t-xs t-mid" style="${H.nls?'fill:var(--ink);font-weight:700':''}">${D.nls}</text>`;
    s+=`<path d="M${f1(A(244))} ${by-4} V${by-12}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(A(244))}" y="${by-16}" class="t-xs t-mid">${D.nes}</text>`;
    if(N)s+=wrapT(x1,by-44,D.mut,x1-A(262),'xs','t-end',12,'fill:var(--tdp)').svg;
    else s+=wrapT(A(344),by-16,D.mut,A(414)-A(274)+40,'xs','t-mid',12,'fill:var(--tdp)').svg;
    if(isT&&(p===3||p===5))[380,396,410].forEach(a=>{s+=pTag(A(a),by+bh/2)});
    s+=`<text x="${f1((A(1)+A(102))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r1}</text><text x="${f1((A(104)+A(176))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r2}</text><text x="${f1((A(192)+A(262))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r3}</text><text x="${f1((A(274)+A(414))/2)}" y="${by+bh+16}" class="t-xs t-mid">${D.r4}</text>`;
    s+=`<text x="${x1}" y="${by+bh+31}" class="t-xs t-end">${D.qn}</text><text x="${x1}" y="${by+bh+44}" class="t-xs t-end">${D.gly}</text>`;
    s+=`<text x="${x0}" y="${by+bh+31}" class="t-sm" style="fill:var(--ink);font-weight:600">${D.title}</text>`;
    s+=`<text x="${x0}" y="${by+bh+62}" class="t-xs" style="fill:${isT?'var(--ink)':'var(--muted)'}">${role.map((l,i)=>`<tspan x="${x0}" dy="${i?13:0}">${l}</tspan>`).join('')}</text>`;
    dom.innerHTML=s;
  }
  const stop=playWire(rg,$('#tdPlay'),draw,18000,UI.replay,'tdp43');
  let setSt=()=>{};
  function buildSteps(){const old=$('#tdSteps'),el=old.cloneNode(false);old.replaceWith(el);setSt=stepWire(el,TD_STEPS[mode],rg,draw,stop)}
  toggleRow($('#tdTog'),TD_TXT.modes,mode,v=>{mode=v;stop();buildSteps();$('#tdCap').textContent=TD_TXT.cap[mode];draw(+rg.value)});
  buildSteps();
  $('#tdCap').textContent=TD_TXT.cap[mode];
  draw(+rg.value);

  /* ---- Brettschneider staged spread ---- */
  const spr=$('#tdSpr');let stage=1;
  function drawSpread(){
    const R=TD_SPR.regions,n4=TD_SPR.stages.length;
    const N=NARROW();
    const sc=N?.98:1,ox=N?28:30,oy=N?4:4;
    const lx=N?20:380,ly0=N?332:28,lw=N?360:320;
    /* legend rows first, so the narrow height fits them */
    let rows=[],y=ly0;
    for(let st=1;st<=n4;st++){rows.push({h:true,st,y});y+=20;R.filter(r=>r.s===st).forEach(r=>{const ls=wrapLines(r.n,lw-28,'sm');rows.push({r,y,ls});y+=15*ls.length+5});y+=6}
    const H=Math.max(N?0:320,Math.round(y+4));
    const code=r=>{const same=R.filter(q=>q.s===r.s);return TD_SPR.code(r.s,same.indexOf(r))};
    vb(spr,`720 ${H}`,`400 ${H}`);
    const P=(p)=>[ox+p[0]*sc,oy+p[1]*sc];
    let s=`<g transform="translate(${ox} ${oy}) scale(${sc})">`;
    s+=`<path d="M40 150 C30 90 80 40 160 35 C240 30 300 70 310 130 C318 175 290 200 250 205 C230 230 190 235 160 225 C120 240 70 220 50 190 C40 178 40 165 40 150Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<ellipse cx="276" cy="232" rx="40" ry="25" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M204 196 C208 228 210 258 212 286 L236 286 C236 258 238 228 242 200 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<rect x="214" y="284" width="20" height="28" rx="6" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M175 37 C178 70 190 100 205 120" style="fill:none;stroke:var(--cell-line);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    s+='</g>';
    R.forEach(r=>{const [x,y2]=P(r.p),on=r.s<=stage,nw=r.s===stage;
      s+=`<circle cx="${f1(x)}" cy="${f1(y2)}" r="11" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:${nw?'var(--ink)':on?'var(--tdp)':'var(--muted)'};stroke-width:${nw?2.6:1.3}"/><text x="${f1(x)}" y="${f1(y2+3.4)}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${code(r)}</text>`});
    rows.forEach(o=>{
      if(o.h){const on=o.st<=stage;s+=`<text x="${lx}" y="${o.y+12}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${TD_SPR.head(o.st)}</text>`;return}
      const on=o.r.s<=stage,cy=o.y+8;
      s+=`<circle cx="${lx+10}" cy="${cy}" r="9" style="fill:${on?'var(--tdp)':'var(--panel)'};stroke:${on?'var(--tdp)':'var(--muted)'};stroke-width:1.2"/><text x="${lx+10}" y="${cy+3.2}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${code(o.r)}</text>`;
      s+=`<text x="${lx+26}" y="${cy+4}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}">${o.ls.map((l,i)=>`<tspan x="${lx+26}" dy="${i?15:0}">${l}</tspan>`).join('')}</text>`});
    spr.innerHTML=s;
    const S=TD_SPR.stages[stage-1];
    $('#tdSprNote').innerHTML=noteHTML({k:TD_SPR.kick(stage,n4),t:S.t,txt:S.txt,pt:S.pt,hook:S.hook});
  }
  toggleRow($('#tdSprTog'),TD_SPR.stages.map((_,i)=>[String(i+1),TD_SPR.btn(i+1)]),'1',v=>{stage=+v;drawSpread()});
  drawSpread();
  const prevR=redraws.tdp43;redraws.tdp43=()=>{prevR&&prevR();drawSpread()};
};
