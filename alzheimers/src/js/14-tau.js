
/* =============== 1.4 tau =============== */
const TA_STEPS=[
 {from:0,at:.06,k:'Step 1 · Normal tau',t:'Tau holds the rails together',
  txt:'Tau was identified in 1975 as a protein needed for tubulin to assemble into microtubules. [[Weingarten1975]] In the brain it is made by neurons and concentrated in axons. [[Binder1985]] It is encoded by MAPT on chromosome 17, and the adult brain makes six isoforms of 352 to 441 amino acids: three with three microtubule-binding repeats (3R) and three with four (4R), normally in roughly equal amounts. [[MedlinePlusMAPT,Goedert1989]]',
  pt:'Inside every nerve fibre run long tracks that carry supplies. Tau is the protein that ties the tracks together, like the rungs of a ladder.',
  hook:'Tau = microtubule-associated protein, gene MAPT on chromosome 17, six isoforms, 3R and 4R.'},
 {from:.15,at:.27,k:'Step 2 · Too much phosphate',t:'Kinases add phosphate',
  txt:'Tau in Alzheimer tangles is abnormally phosphorylated. [[GrundkeIqbal1986]] Even a soluble pool of tau that had not yet formed filaments carried about 3 to 4 times more phosphate than normal tau (about 8 mol per mol), which suggests hyperphosphorylation begins before filaments form. [[Kopke1993]]',
  pt:'Enzymes called kinases stick extra phosphate tags onto tau, three to four times the usual amount.'},
 {from:.32,at:.43,k:'Step 3 · Letting go',t:'Tau lets go and the tracks fall apart',
  txt:'Hyperphosphorylated tau from Alzheimer brain disassembled microtubules in vitro and pulled normal tau into tangles of filaments. Removing the phosphate abolished both effects. [[Alonso1996]] With the tracks gone, transport along the axon stalls.',
  pt:'Over-tagged tau falls off the tracks. Without it the tracks break up, and supplies stop moving along the nerve fibre.',
  hook:'Loss of function (microtubules collapse) plus gain of toxic function (tau recruits normal tau). [[Alonso1996]]'},
 {from:.46,at:.58,k:'Step 4 · Pretangle',t:'Tau gathers in the cell body',
  txt:'Tangles mature in three stages. First come pretangles: misfolded tau that has not yet polymerised, spread through the cell body and dendrites. [[DeTure2019]]',
  pt:'The loose tau drifts into the main body of the nerve cell and starts to clump.'},
 {from:.62,at:.72,k:'Step 5 · Filaments',t:'Paired helical filaments',
  txt:'Tau stacks into paired helical filaments: two filaments, each about 10 nm wide, twisted around each other with a crossover every 65 to 80 nm. In Alzheimer\'s they contain both 3R and 4R tau, and the repeat domain forms the core. [[DeTure2019]] Cryo-EM showed that paired helical and straight filaments share a core of two identical protofilaments made of tau residues 306 to 378, packed in different ways. [[Fitzpatrick2017]]',
  pt:'The clumps line up into pairs of twisted threads, far too small to see with an ordinary microscope.'},
 {from:.76,at:.86,k:'Step 6 · The tangle',t:'A neurofibrillary tangle',
  txt:'Filaments bundle into a fibrillar tangle inside the neuron, flame-shaped in pyramidal neurons. [[DeTure2019]] All six tau isoforms are incorporated into Alzheimer tangles. [[Goedert1989]]',
  pt:'The threads bundle into a tangle that fills much of the cell.',
  hook:'Tangle = intracellular, hyperphosphorylated tau in paired helical filaments. Plaque = extracellular amyloid beta.'},
 {from:.9,at:.99,k:'Step 7 · Ghost tangle',t:'The neuron dies, the tangle stays',
  txt:'When the neuron dies, an extracellular "ghost tangle" is left behind. [[DeTure2019]] In one cortical area, Alzheimer brains lost more than half of their neurons; the loss tracked tangles but exceeded tangle counts many times over. [[GomezIsla1997]]',
  pt:'The nerve cell dies, but the tangle remains like a tombstone. Many more cells die than leave tangles behind.'}
];
const TA_SP=[
 {from:0,at:.08,k:'Seed',t:'Misfolded tau starts in the entorhinal cortex',
  txt:'In people, tangles first appear in the transentorhinal and entorhinal region. [[Braak1991]] In mice that made mutant human tau only in entorhinal layer II, tau pathology spread to downstream neurons in the circuit (dentate gyrus, CA fields, cingulate) that did not make the mutant protein, followed by synapse and neuron loss. [[deCalignon2012]]',
  pt:'Abnormal tau seems to start in one small area and then pass to the cells it is wired to.'},
 {from:.2,at:.3,k:'Along connections',t:'Seeds pass across synapses',
  txt:'<span class="ev early">Early evidence</span> Brain extract from tau-mutant mice, injected into mice making normal human tau, made the normal tau form filaments, and the pathology spread to neighbouring regions. This is why tau spread is called prion-like. [[Clavaguera2009]]',
  pt:'In animal experiments, a little abnormal tau can make normal tau fold the wrong way, and the problem then travels.'},
 {from:.4,at:.52,k:'Human tau-PET',t:'Connectivity explains the pattern',
  txt:'In 312 people imaged with tau PET, a spreading model built on brain connectivity explained up to 70% of the variance in where tau sat. [[Vogel2020]]',
  pt:'In real patients, the way brain areas are wired together predicts most of where tau shows up on scans.',
  hook:'Tau spread follows connections: brain connectivity explained up to 70% of the tau-PET pattern (Vogel 2020). [[Vogel2020]]'},
 {from:.6,at:.7,k:'Amyloid\'s role',t:'Amyloid may speed it up',
  txt:'<span class="ev hyp">Hypothesis</span> Regions rich in amyloid had more tau than connectivity alone predicted, consistent with amyloid accelerating tau spread. [[Vogel2020]] Turn on "Show amyloid-rich regions" to see the idea. The toggle illustrates the reported association; it is not a measured speed.',
  pt:'Where amyloid is plentiful, tau seems to spread faster.'},
 {from:.8,at:.95,k:'Last stop',t:'Primary areas come last',
  txt:'The spread ends in primary areas, mirroring Braak stage VI, when even primary sensory cortex is involved. [[Braak1991,DeTure2019]] The order of spread is in <a href="#brain" data-go="brain">The brain that forgets</a>.',
  pt:'Areas for basic sensation, such as vision and touch, are reached last.'}
];
const TA_CMP=[
 {from:0,at:.12,k:'Test 1 · Autopsy',t:'Which tracks dementia severity?',
  txt:'In 10 patients examined across 13 regions, dementia severity tracked neocortical tangle counts but not plaque counts. [[Arriagada1992]] A multicentre review concluded that, although plaques may be key to how the disease starts, cognitive severity correlates best with neocortical tangles. [[Nelson2012]]',
  pt:'Counting tangles after death tells you more about how severe the dementia was than counting plaques.',
  hook:'Tangles correlate with cognition better than plaques. Synapse loss correlates best of all.'},
 {from:.2,at:.32,k:'Test 2 · Pattern',t:'Which matches the symptoms?',
  txt:'Tau PET followed the clinical picture, for example tau at the back of the brain in posterior cortical atrophy, while amyloid PET bound diffusely across the neocortex. [[Ossenkoppele2016]] Amyloid is also common without symptoms: 10% of cognitively normal people at 50 and 44% at 90 were amyloid positive. [[Jansen2015]]',
  pt:'Tau sits where the symptoms come from. Amyloid is spread more evenly, and many people with amyloid have normal memory.'},
 {from:.4,at:.52,k:'Test 3 · Prediction',t:'Which predicts the next atrophy?',
  txt:'In 32 people with early symptoms, baseline tau-PET intensity and location, but not amyloid PET, predicted where and how fast the brain shrank over the next 15 months or so. [[LaJoie2020]]',
  pt:'A tau scan today points to where the brain will shrink next. An amyloid scan does not.'},
 {from:.6,at:.72,k:'Test 4 · Neurons',t:'Which tracks neuron loss?',
  txt:'In the superior temporal sulcus, Alzheimer brains lost more than 50% of neurons. The loss tracked tangles, far exceeded tangle counts, and was unrelated to plaque counts or amyloid burden. [[GomezIsla1997]]',
  pt:'Where tangles are, nerve cells are lost, and more cells die than the tangles alone would suggest.'},
 {from:.8,at:.92,k:'And synapses',t:'Synapse loss correlates best',
  txt:'In 15 people with Alzheimer\'s and 9 controls, neocortical synapse density correlated strongly with cognition, while plaques and tangles correlated only weakly. A model with midfrontal and inferior parietal synapse density reached r = 0.96 with the Mattis Dementia Rating Scale; plaques contributed only 26% of that. [[Terry1991]] In CA1, mild Alzheimer\'s had 55% fewer synapses and MCI 18% fewer. [[Scheff2007]] The next module, <a href="#glia" data-go="glia">Microglia and the lost synapse</a>, shows how synapses are lost.',
  pt:'What matters most for thinking is how many connections between nerve cells survive.'}
];
inits.tau=()=>{
  /* ---- 1. from rungs to a tangle ---- */
  const svg=$('#taSvg'),rg=$('#taT');
  const R=rng(14),BEAD=[...Array(90)].map(()=>({dx:R()*2-1,dy:R()*2-1,rot:R()*2-1,k:R()})),RUNG=[...Array(12)].map(()=>({dx:R()*2-1,dy:R()*2-1,ox:R()*2-1,oy:R()*2-1}));
  const HZ=[...Array(16)].map(()=>[R()*2-1,R()*2-1]);
  const POFF=[[-9,-12],[9,-3],[-9,6],[9,14]];
  function rung(x,y,rot,nP,o){let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" style="opacity:${f1(o)}"><path d="M0 -18 q7 9 0 18 q-7 9 0 18" style="fill:none;stroke:var(--rose);stroke-width:3.2;stroke-linecap:round"/>`;
    for(let j=0;j<4;j++){const a=clamp(nP-j);if(a<=0)break;const [px,py]=POFF[j];
      g+=`<g style="opacity:${f1(a)}"><circle cx="${px}" cy="${py}" r="5.6" style="fill:var(--warn)"/><text x="${px}" y="${py+2.7}" text-anchor="middle" style="font:700 7.5px var(--mono);fill:var(--panel)">P</text></g>`}
    return g+'</g>'}
  function draw(t){
    const N=vb(svg,'720 400','400 700');
    const L=N?{ax:10,ay:20,aw:380,sx:85,sy:300,px:10,py:556,pw:380}:{ax:10,ay:24,aw:440,sx:470,sy:24,px:10,py:300,pw:700};
    const phos=ramp(t,.15,.3),det=ease(ramp(t,.32,.46)),mv=ease(ramp(t,.46,.6)),phf=ease(ramp(t,.62,.76)),nft=ease(ramp(t,.76,.88)),die=ease(ramp(t,.9,.98));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* axon panel */
    const AW=L.aw;
    s+=`<g transform="translate(${L.ax} ${L.ay})"><text x="0" y="12" class="t-sm">AXON, ZOOMED IN</text>`;
    s+=`<rect x="0" y="30" width="${AW}" height="200" rx="10" style="fill:var(--cell);opacity:.6"/><path d="M0 30 H${AW} M0 230 H${AW}" style="stroke:var(--cell-line);stroke-width:2"/>`;
    const nb=Math.floor((AW-16)/11);
    [100,160].forEach((ry,r)=>{for(let j=0;j<nb;j++){const b=BEAD[r*45+j],x=8+j*11+5+b.dx*26*det,y=ry+b.dy*52*det+det*det*18,o=1-det*(b.k<.45?.95:.65);
      if(o<=.02)continue;s+=`<rect x="${f1(x-5)}" y="${f1(y-6)}" width="10" height="12" rx="3" transform="rotate(${f1(b.rot*70*det)} ${f1(x)} ${f1(y)})" style="fill:${j%2?'var(--sage)':'var(--sage-soft)'};stroke:var(--sage);stroke-width:1;opacity:${f1(o)}"/>`}});
    if(det<.05)s+=`<text x="${AW-6}" y="184" class="t-xs t-end" style="opacity:${f1(1-det*20)}">microtubule</text>`;
    // cargo: moves while the rails hold, stalls when they break
    const cx=AW-20-(((t<.33?t:.33)*5)%1)*(AW-40);
    s+=`<circle cx="${f1(cx)}" cy="${f1(82+det*14)}" r="9" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.6;opacity:${f1(1-det*.5)}"/>`;
    // kinases sweep along
    const kx=lerp(-30,AW+30,phos),ko=bump(t,.14,.31);
    if(ko>0)[[kx,50],[kx-70,210]].forEach(([x,y])=>s+=`<g style="opacity:${f1(ko)}"><ellipse cx="${f1(x)}" cy="${y}" rx="24" ry="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/><text x="${f1(x)}" y="${y+3}" class="t-xs t-mid" style="fill:var(--warn)">kinase</text></g>`);
    const ST=['tau binds the microtubules; cargo moves along them','kinases add phosphate: tau carries 3–4× normal','tau lets go, rails fall apart, transport stalls','the axon is left without working tau'];
    const si=t<.15?0:t<.32?1:t<.46?2:3;
    s+=`<text x="0" y="252" class="t-xs" style="fill:var(--ink)">${ST[si]}</text></g>`;
    /* cell body panel */
    const so=1-die*.8;
    s+=`<g transform="translate(${L.sx} ${L.sy})"><text x="0" y="12" class="t-sm">CELL BODY</text>`;
    s+=`<path d="M48 132 H-20 M48 148 H-20" style="stroke:var(--cell-line);stroke-width:2;opacity:${f1(so)}"/><text x="-14" y="126" class="t-xs" style="opacity:${f1(so)}">axon</text>`;
    s+=`<path d="M170 100 Q195 80 220 70 M175 150 Q200 160 226 168 M120 70 Q125 45 140 30 M110 210 Q105 235 92 250" style="fill:none;stroke:var(--cell-line);stroke-width:4;stroke-linecap:round;opacity:${f1(1-die)}"/>`;
    s+=`<circle cx="115" cy="140" r="70" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2.5;opacity:${f1(so)};${die>0?'stroke-dasharray:6 5':''}"/>`;
    s+=`<circle cx="142" cy="160" r="20" style="fill:var(--nuc);opacity:${f1(.8*(1-die))}"/>`;
    const pre=mv*(1-phf);
    if(pre>0)HZ.forEach(([a,b])=>s+=`<circle cx="${f1(95+a*36)}" cy="${f1(128+b*36)}" r="2.6" style="fill:var(--rose);opacity:${f1(pre*.55)}"/>`);
    if(phf>0)s+=tangle(92,126,lerp(5,20,phf)+10*nft,Math.min(1,phf*1.4));
    const lab=die>.3?'ghost tangle: the neuron is gone':nft>.3?'neurofibrillary tangle':phf>.2?'filaments assembling':mv>.5?'pretangle: misfolded tau':'';
    if(lab)s+=`<text x="115" y="236" class="t-xs t-mid" style="fill:var(--rose)">${lab}</text>`;
    s+='</g>';
    /* rungs: drawn in whole-svg coordinates so they can travel between panels */
    const nR=Math.floor((AW-40)/40)+1;
    for(let i=0;i<nR;i++){const r=RUNG[i],xi=30+i*40;
      const nP=1+3*clamp((kx-xi)/40);
      const x0=L.ax+xi+r.dx*30*det,y0=L.ay+130+r.dy*40*det;
      const x1=L.sx+95+r.ox*30,y1=L.sy+128+r.oy*30;
      let x=lerp(x0,x1,mv),y=lerp(y0,y1,mv)-Math.sin(Math.PI*mv)*30;
      x=lerp(x,L.sx+92,phf);y=lerp(y,L.sy+126,phf);
      const o=1-phf,sc=1-.35*mv;
      if(o<=.02)continue;
      s+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)}) translate(${f1(-x)} ${f1(-y)})">${rung(x,y,r.dx*80*det+mv*r.oy*60,nP,o)}</g>`}
    /* PHF strip */
    s+=`<g transform="translate(${L.px} ${L.py})"><text x="0" y="12" class="t-sm">PAIRED HELICAL FILAMENT, ZOOMED FURTHER</text>`;
    const fx1=N?L.pw-10:400,len=phf*(fx1-10),cy=44,A=11;
    if(len>2){[[-1,.5],[1,1]].forEach(([sg,o])=>{let d='';for(let x=0;x<=len;x+=3)d+=(x?'L':'M')+f1(10+x)+' '+f1(cy+sg*A*Math.sin(2*Math.PI*x/100));
      s+=`<path d="${d}" style="fill:none;stroke:var(--rose);stroke-width:8;stroke-linecap:round;opacity:${o}"/>`});
      if(len>110)s+=`<path d="M60 62 v5 H110 v-5" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="85" y="78" class="t-xs t-mid" style="fill:var(--ink)">65–80 nm</text>`}
    else s+=`<text x="10" y="48" class="t-xs">forms at step 5</text>`;
    const TX=['two protofilaments wound together','each strand about 10 nm wide','crossover every 65–80 nm','core: tau residues 306–378 (cryo-EM)'];
    TX.forEach((l,i)=>s+=`<text x="${N?10:420}" y="${N?96+i*14:34+i*16}" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*phf)}">${l}</text>`);
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(TA_STEPS,t);setSt(p);$('#taNote').innerHTML=noteHTML(TA_STEPS[p]);
  }
  const stop=playWire(rg,$('#taPlay'),draw,17000,'Replay','tau');
  const setSt=stepWire($('#taSteps'),TA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. prion-like spread ---- */
  const sp=$('#taSp'),sr=$('#taSpT');let amy=false;
  const NODES=[['entorhinal',.02,.78],['hippocampus',.24,.93],['inferior temporal',.27,.58],['cingulate',.5,.82],['temporal cortex',.52,.45],['parietal cortex',.78,.62],['frontal cortex',.62,.12],['primary visual',.98,.88],['primary sensory',.95,.22]];
  const EDGES=[ [0,1],[0,2],[1,3],[1,2],[2,4],[3,5],[3,6],[4,5],[4,6],[5,7],[5,8],[6,8] ];
  const DIST=[0,1,1,2,2,3,3,4,4],RICH=[4,5,6];
  const halo='paint-order:stroke;stroke:var(--field);stroke-width:4px;stroke-linejoin:round;fill:var(--ink)';
  function drawSp(t){
    const N=vb(sp,'720 360','400 500');
    const L=N?{w:380,ox:10,oy:0,px:24,py:356}:{w:440,ox:10,oy:0,px:480,py:40};
    const P=NODES.map(([,nx,ny])=>[L.ox+30+nx*(L.w-60),L.oy+40+ny*270]);
    const on=NODES.map((_,i)=>.06+DIST[i]*.19-(amy&&RICH.includes(i)?.06:0));
    const lvl=NODES.map((_,i)=>i===0?Math.max(.35,ease(ramp(t,0,.12))):ease(ramp(t,on[i],on[i]+.14))*(amy&&RICH.includes(i)?1:.78));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    EDGES.forEach(([a,b])=>{const [x1,y1]=P[a],[x2,y2]=P[b];s+=`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--axon);stroke-width:2;opacity:.7"/>`;
      let src=a,dst=b;if(DIST[a]>DIST[b]){src=b;dst=a}if(DIST[dst]!==DIST[src]+1)return;
      const g=ramp(t,on[dst]-.13,on[dst]);if(g<=0)return;
      const [sx,sy]=P[src],[dx,dy]=P[dst],ex=lerp(sx,dx,g),ey=lerp(sy,dy,g);
      s+=`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(ex)}" y2="${f1(ey)}" style="stroke:var(--rose);stroke-width:2.6"/>`;
      if(g<1)s+=`<circle cx="${f1(ex)}" cy="${f1(ey)}" r="7" style="fill:var(--rose-soft)"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="3.6" style="fill:var(--rose)"/>`});
    NODES.forEach(([l],i)=>{const [x,y]=P[i],v=lvl[i];
      if(amy&&RICH.includes(i))s+=plaque(x+17,y-15,9,i+2,.95);
      s+=neuron(x,y,12,1,{axonLen:0,dendrites:4,fill:v>.05?'var(--rose-soft)':'var(--cell)',col:v>.05?'var(--rose)':'var(--cell-line)'});
      if(v>.02)s+=tangle(x,y+1,4+7*v,Math.min(1,v*1.3));
      s+=`<text x="${f1(x)}" y="${f1(y+30)}" class="t-xs t-mid" style="${halo}">${l}</text>`});
    s+=`<text x="${f1(P[0][0]-8)}" y="${f1(P[0][1]-24)}" class="t-xs" style="paint-order:stroke;stroke:var(--field);stroke-width:4px;fill:var(--rose)">start</text>`;
    // tau-PET panel
    const ap=ease(ramp(t,.4,.55));
    s+=`<g transform="translate(${L.px} ${L.py})"><text x="0" y="14" class="t-sm">TAU-PET, 312 PEOPLE</text>`;
    s+=`<rect x="0" y="26" width="220" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="0" y="26" width="${f1(154*ap)}" height="14" rx="4" style="fill:var(--rose)"/>`;
    s+=`<line x1="154" x2="154" y1="22" y2="44" class="grid"/>`;
    if(ap>.95)s+=`<text x="160" y="38" class="t-sm" style="fill:var(--ink)">up to 70%</text>`;
    s+=`<text x="0" y="62" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*ap)}">of the spatial pattern of tau was</text><text x="0" y="78" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*ap)}">explained by brain connectivity</text>`;
    s+=amy?`<text x="0" y="106" class="t-xs" style="fill:var(--amber)">amyloid-rich regions: more tau than</text><text x="0" y="122" class="t-xs" style="fill:var(--amber)">connectivity alone predicted</text>`
          :`<text x="0" y="106" class="t-xs">turn on amyloid-rich regions</text><text x="0" y="122" class="t-xs">to compare</text>`;
    s+='</g>';
    sp.innerHTML=s;
    const p=phaseOf(TA_SP,t);setSp(p);$('#taSpNote').innerHTML=noteHTML(TA_SP[p]);
    $('#taSpCap').textContent=`Schematic network. Each node stands for a region, each line for a connection.${amy?' Amber plaques mark amyloid-rich association cortex, drawn to illustrate the reported association.':''}`;
  }
  const stopS=playWire(sr,$('#taSpPlay'),drawSp,14000,'Replay','tau');
  const setSp=stepWire($('#taSpSteps'),TA_SP,sr,drawSp,stopS);
  $('#taAmy').onclick=()=>{amy=!amy;$('#taAmy').setAttribute('aria-pressed',amy);drawSp(+sr.value)};
  drawSp(+sr.value);

  /* ---- 3. tau vs amyloid against cognition ---- */
  const cm=$('#taCmp'),cr=$('#taCmpT');
  const ROWS=[
   {q:['Tracks how severe','the dementia was'],a:['plaque counts did not','follow severity'],t:['neocortical tangle','counts did']},
   {q:['Matches the type','of symptoms'],a:['spread diffusely','across the neocortex'],t:['followed the clinical','picture, e.g. posterior','in PCA']},
   {q:['Predicts where the','brain shrinks next'],a:['baseline amyloid PET','did not'],t:['baseline tau PET did,','over ~15 months','(32 patients)']},
   {q:['Tracks the loss','of neurons'],a:['unrelated to plaques','or amyloid burden'],t:['loss tracked tangles','and far exceeded them']}];
  function cell(x,y,isTau,lines,o,k,N){let s=`<g style="opacity:${f1(o)}" transform="translate(${f1((1-o)*16)} 0)">`;
    if(N)s+=`<text x="${x}" y="${y-12}" class="t-xs" style="fill:${isTau?'var(--rose)':'var(--amber)'}">${isTau?'TAU':'AMYLOID'}</text>`;
    s+=isTau?tangle(x+12,y+14,11,1):plaque(x+12,y+14,11,k+3,1);
    s+=`<rect x="${x+32}" y="${y}" width="64" height="20" rx="10" style="fill:${isTau?'var(--rose-soft)':'var(--panel-2)'};stroke:${isTau?'var(--rose)':'var(--line)'};stroke-width:1.2"/><text x="${x+64}" y="${y+14}" class="t-xs t-mid" style="fill:${isTau?'var(--rose)':'var(--muted)'};font-weight:700">${isTau?'strong':'weak'}</text>`;
    lines.forEach((l,i)=>s+=`<text x="${N?x:x+32}" y="${y+(N?44:30)+i*12}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    return s+'</g>'}
  function drawCmp(t){
    const N=vb(cm,'720 410','400 730');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(!N)s+=`<text x="330" y="24" class="t-lbl" style="fill:var(--amber)">AMYLOID</text><text x="330" y="38" class="t-xs">plaques, amyloid PET</text><text x="550" y="24" class="t-lbl" style="fill:var(--rose)">TAU</text><text x="550" y="38" class="t-xs">tangles, tau PET</text>`;
    ROWS.forEach((R,k)=>{const o=ease(ramp(t,.02+k*.2,.12+k*.2)),y0=N?24+k*150:50+k*74;
      if(k)s+=`<line x1="10" x2="${N?390:710}" y1="${y0-(N?10:6)}" y2="${y0-(N?10:6)}" class="grid"/>`;
      R.q.forEach((l,i)=>s+=`<text x="${N?12:16}" y="${y0+(N?16:22)+i*16}" class="t-lbl" style="opacity:${f1(.35+.65*o)}">${l}</text>`);
      if(o<=0)return;
      if(N){s+=cell(12,y0+62,false,R.a,o,k,N)+cell(206,y0+62,true,R.t,o,k,N)}
      else{s+=cell(330,y0+8,false,R.a,o,k,N)+cell(550,y0+8,true,R.t,o,k,N)}});
    const sy=ease(ramp(t,.82,.92));
    if(sy>0){if(N){s+=`<g style="opacity:${f1(sy)}"><rect x="8" y="626" width="384" height="96" rx="10" style="fill:var(--sage-soft)"/><text x="20" y="650" class="t-lbl">Strongest in one study:</text><text x="20" y="668" class="t-lbl">synapse density, r = 0.96</text><text x="20" y="690" class="t-xs" style="fill:var(--ink)">with a dementia rating scale;</text><text x="20" y="706" class="t-xs" style="fill:var(--ink)">plaques added only 26% of that</text></g>`}
      else s+=`<g style="opacity:${f1(sy)}"><rect x="10" y="350" width="700" height="52" rx="10" style="fill:var(--sage-soft)"/><text x="24" y="372" class="t-lbl">Strongest of all in one autopsy study: synapse density</text><text x="24" y="390" class="t-xs" style="fill:var(--ink)">r = 0.96 with a dementia rating scale; plaques added only 26% of that</text></g>`}
    cm.innerHTML=s;
    const p=phaseOf(TA_CMP,t);setCm(p);$('#taCmpNote').innerHTML=noteHTML(TA_CMP[p]);
  }
  const stopM=playWire(cr,$('#taCmpPlay'),drawCmp,12000,'Replay','tau');
  const setCm=stepWire($('#taCmpSteps'),TA_CMP,cr,drawCmp,stopM);
  drawCmp(+cr.value);
};
