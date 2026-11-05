
/* =============== 1.2 upper and lower motor neurons =============== */
const NE_STEPS=[
 {from:0,at:.05,k:'Step 1 · Healthy',t:'Cortex to cord to muscle',
  txt:'The upper motor neuron (UMN) is a Betz cell in layer 5 of the primary motor cortex. Its axon runs down the corticospinal tract, through the internal capsule and the brainstem. Most of these axons cross the midline at the pyramidal decussation, where the brainstem meets the spinal cord. [[Feldman2022,Welniarz2017]] They contact lower motor neurons (LMN) in the anterior horn, directly or through interneurons. [[Lemon2008]] Each LMN and all the muscle fibres it supplies form one motor unit; the impulse crosses the neuromuscular junction to contract them. [[Moloney2014]]',
  pt:'Two nerve cells carry each command. The first runs from the brain to the spinal cord. The second runs from the spinal cord to the muscle.',
  hook:'UMN = Betz cell in the motor cortex and its corticospinal or corticobulbar axon. LMN = anterior horn cell or brainstem motor nucleus, with its axon. Motor unit = one LMN plus all the fibres it supplies.'},
 {from:.14,at:.28,k:'Step 2 · Upper neuron fails',t:'Losing the upper neuron: spasticity and brisk reflexes',
  txt:'When upper motor neurons degenerate, examination shows brisk reflexes that spread to nearby muscles, pathological reflexes such as Hoffmann and Babinski signs, a reflex kept in a weak limb, and spasticity: tone that rises with the speed of stretch. [[Feldman2022,Shefner2020]] In the bulbar system, UMN loss can bring pseudobulbar affect, uncontrollable laughing or crying; one imaging study also found disrupted pathways to the cerebellum in people with it. [[Feldman2022,Floeter2014]] Around symptom onset, brain stimulation (TMS) can already show an over-excitable motor cortex. [[Vucic2006,Vucic2008]]',
  pt:'The command from the brain gets through less cleanly. Muscles feel stiff, and reflexes jump more than usual.',
  hook:'UMN signs: spasticity, brisk and spreading reflexes, Hoffmann, Babinski (extensor plantar), jaw jerk, pseudobulbar affect. UMN assessment is still clinical. [[Huynh2016]]'},
 {from:.34,at:.47,k:'Step 3 · Lower neuron fails',t:'Losing the lower neuron: weakness, wasting, fasciculations',
  txt:'Lower motor neuron loss shows as weakness, wasting and fasciculations, visible twitches of muscle. [[Feldman2022]] Fast-fatigable units (unit B here) are lost first. [[Moloney2014,Kanning2010]] In SOD1 mice the nerve terminals let go of the muscle before the cell bodies die, so loss may begin at the far end (mouse evidence). [[Fischer2004]] Orphaned fibres fire on their own: needle EMG records fibrillations and positive sharp waves, and unstable motor axons produce fasciculation potentials. [[Joyce2013,deCarvalho2013]]',
  pt:'When a lower nerve cell dies, its muscle fibres lose their nerve. They twitch on their own, and the muscle gets weaker.',
  hook:'EMG ongoing denervation = fibrillations and positive sharp waves. Under Awaji, fasciculation potentials count the same in suspected ALS. [[deCarvalho2008]]'},
 {from:.52,at:.66,k:'Step 4 · Reinnervation',t:'Surviving neurons adopt orphaned fibres',
  txt:'Surviving motor neurons sprout new branches and adopt the orphaned fibres, so each surviving unit grows. Needle EMG sees large, long-duration, polyphasic motor unit potentials, with fewer units firing (reduced recruitment). [[Joyce2013,Garnier2024]] This can keep strength near normal even when up to half the motor units are lost. [[Joyce2013]] The new terminals are immature, so transmission is unstable (jitter and blocking on single-fibre EMG). [[Joyce2013]] Slow units compensate for a while, then degenerate too. [[Nijssen2017]]',
  pt:'Healthy nerve cells nearby grow new branches and take over the abandoned fibres. Strength can hold up for a while, even though nerve cells are being lost.',
  hook:'Chronic neurogenic change = large, long, polyphasic MUPs with reduced recruitment. A Gold Coast EMG LMN sign needs chronic neurogenic change AND ongoing denervation in the same muscle. [[Shefner2020,Turner2022]]'},
 {from:.70,at:.84,k:'Step 5 · Both',t:'ALS: the mixture of both sets of signs',
  txt:'In ALS, UMN and LMN signs appear together and spread from the region where they began to neighbouring regions. [[Ravits2009,Feldman2022]] When reinnervation can no longer keep up, weakness and wasting become clear. In 2 of 19 SOD1 carriers followed with motor unit counts, the count fell suddenly a few months before weakness began. [[Aggarwal2002]] A reflex that stays brisk in a weak, wasted limb is itself a UMN sign, although UMN signs get harder to elicit as a limb wastes. [[Feldman2022,Swash2012]]',
  pt:'ALS damages both nerve cells. A person can have stiff, jumpy muscles and weak, thin, twitching muscles, sometimes in the same limb.',
  hook:'ALS = UMN plus LMN signs that progress and spread, with other causes excluded. Pure LMN (PMA) in 2 or more regions counts as ALS under Gold Coast; pure UMN (PLS) does not. [[Shefner2020,deCarvalhoSwash2024]]'},
 {from:.86,at:.96,k:'Step 6 · Split hand',t:'Why some muscles go first',
  txt:'In ALS the thumb side of the hand wastes first: abductor pollicis brevis (APB) and first dorsal interosseous (FDI). Abductor digiti minimi (ADM), on the little-finger side, is relatively spared, although all three are supplied from C8-T1 and FDI and ADM share the ulnar nerve. [[Eisen2012]] Explanations are cortical (smaller motor evoked potentials from thenar muscles) and peripheral (more excitable APB and FDI axons). The sign is reported to have high specificity in early ALS. [[Eisen2012]]',
  pt:'The muscles at the base of the thumb thin out early, while the muscle on the little-finger side stays fuller. Doctors look for this pattern.',
  hook:'Split hand: APB and FDI wasted, ADM relatively spared, although FDI and ADM share the ulnar nerve, so no single nerve or root explains it.'}
];
const NE_TXT={
  modeBtn:{als:'Both (ALS)',pls:'UMN only (PLS pattern)',pma:'LMN only (PMA pattern)'},
  arcBtn:{on:'Show',off:'Hide'},
  modeName:{als:['Both neurons fail','(ALS)'],pls:['Upper neurons only','(PLS pattern)'],pma:['Lower neurons only','(PMA pattern)']},
  pattern:'PATTERN SHOWN',
  modeLine:{als:'Pattern shown: both neurons fail, as in ALS.',pls:'Pattern shown: upper motor neurons only, as in primary lateral sclerosis (PLS).',pma:'Pattern shown: lower motor neurons only, as in progressive muscular atrophy (PMA).'},
  spared:{
    plsLow:'In this pattern the lower motor neurons survive, so the muscle keeps its nerve supply and EMG stays essentially normal. PLS consensus criteria allow only minimal EMG changes. [[Turner2020PLS]]',
    plsLate:'No wasting or fasciculations in a UMN-only pattern. In one series, 13 of 29 people with pure UMN onset later developed EMG denervation and LMN signs, at an average of 3-4 years. [[Turner2020PLS]]',
    pmaUp:'In this pattern the upper motor neurons stay, so there is no spasticity and no Babinski sign. In a New York series of 91 people with PMA, UMN signs appeared in 22% within 61 months of diagnosis. [[Kim2009]]',
    pmaLate:'Reflexes are not brisk here, because the upper neurons are spared. Under the Gold Coast criteria a pure LMN syndrome in 2 or more regions counts as ALS. [[Shefner2020,Pugdahl2021]]'
  },
  now:list=>`Signs shown now: ${list}.`,none:'No signs: every part of the circuit is working.',sep:', ',
  cortex:'MOTOR CORTEX',umnName:'UMN: Betz cell',layer:'layer 5',capsule:'internal capsule',
  stem:'BRAINSTEM',ocular:['eye-movement nuclei','III, IV, VI'],ocularSpared:'III, IV, VI: spared',bulbar:['bulbar nuclei','V, VII, X-XII'],
  pyr:['pyramids:','most fibres cross'],cord:'SPINAL CORD',lmnName:'LMN',horn:'anterior horn',
  muscle:'MUSCLE FIBRES',unit:u=>`unit ${u}`,
  leg:{umn:['upper motor','neuron (UMN)'],lmn:['lower motor','neuron (LMN)'],fib:['fibres lettered','by motor unit']},
  emgTitle:'NEEDLE EMG',
  emg:{normal:'small, brief units',fib:'fibrillations, sharp waves',big:'large, long, polyphasic units',bigFib:'large units + fibrillations'},
  hand:{title:'SPLIT HAND',apb:'APB',fdi:'FDI',adm:'ADM',wasting:'wasting',kept:'kept',none:'no wasting',thumb:'thumb side',little:'little-finger side'},
  spindle:'spindle',sensory:'sensory fibre',tap:'tap',
  reflex:{normal:'reflex: normal',brisk:'reflex: brisk',notBrisk:'reflex: not brisk',briskWeak:'brisk in a weak limb'},
  plantar:'plantar reflex',foot:{down:['toes curl','down'],up:['big toe up:','Babinski']},
  sgTitle:'Signs at this point',
  sg:{umnH:'UMN SIGNS',lmnH:'LMN SIGNS',emgH:'NEEDLE EMG',
    spas:'Spasticity',brisk:'Brisk reflexes',bab:'Babinski, Hoffmann',weakRef:'Reflex in a|weak limb',
    weak:'Weakness',waste:'Wasting',fasc:'Fasciculations',
    fib:'Fibrillations,|sharp waves',fp:'Fasciculation|potentials',big:'Large, long|units',rec:'Reduced|recruitment'},
  signLong:{spas:'spasticity',brisk:'brisk reflexes',bab:'Babinski and Hoffmann signs',weakRef:'a brisk reflex in a weak limb',
    weak:'weakness',waste:'wasting',fasc:'fasciculations',
    fib:'EMG fibrillations and positive sharp waves',fp:'EMG fasciculation potentials',big:'EMG large, long-duration, polyphasic motor unit potentials',rec:'EMG reduced recruitment'},
  units:(n,m)=>`Motor units: ${n} of ${m}`,
  largest:n=>`Largest unit: ${n} fibres`,
  strength:{normal:'Strength: normal',kept:'Strength: kept by reinnervation',reduced:'Strength: reduced'},
  on:'present',off:'absent'
};
inits.neurons=()=>{
  const svg=$('#neSvg'),rg=$('#neT'),T=NE_TXT;let mode='als',arc=true;
  const frac=x=>x-Math.floor(x);
  const OWN=['A','B','C','A','B','C','A','B','C'],ADOPT={1:'A',4:'A',7:'C'};
  const UCOL={A:'var(--lmn)',B:'var(--steel)',C:'var(--good)'};
  const LMNY={A:305,B:355,C:405},LX=158;
  const FY=i=>290+18*i;
  /* point at fraction f along a polyline */
  function along(P,f){let tot=0;const seg=[];for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(d);tot+=d}
    let r=clamp(f)*tot;for(let i=0;i<seg.length;i++){if(r<=seg[i]||i===seg.length-1){const u=seg[i]?clamp(r/seg[i]):0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]}r-=seg[i]}return P[P.length-1]}
  const poly=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
  const lines=(arr,x,y,cls,dy,st='')=>arr.map((l,i)=>`<text x="${f1(x)}" y="${f1(y+i*dy)}" class="${cls}"${st?` style="${st}"`:''}>${l}</text>`).join('');
  /* disease state at time t, for the chosen pattern */
  function state(t){
    const U=mode!=='pma',Lm=mode!=='pls';
    const u=U?ease(ramp(t,.15,.25)):0;
    const bN=Lm?ramp(t,.35,.40):0,bA=Lm?ramp(t,.38,.44):0,bS=Lm?ramp(t,.41,.47):0;
    const r=Lm?ease(ramp(t,.53,.63)):0;
    const cD=Lm?ease(ramp(t,.71,.78)):0,cW=Lm?ramp(t,.75,.83):0;
    const hand=Lm?ease(ramp(t,.87,.94)):0;
    /* each fibre: who supplies it, how denervated, how wasted */
    const F=OWN.map((o,i)=>{let own=o,den=0,at=0,sprout=0;
      if(o==='B'){den=bN*(1-r);sprout=r;if(r>.5)own=ADOPT[i]}
      if(own==='C'||(o==='B'&&ADOPT[i]==='C')){const d=cD*(o==='B'?r:1);den=Math.max(den,d);at=cW*(o==='B'?r:1)}
      return {o,own,den,at,sprout,adopter:o==='B'?ADOPT[i]:null}});
    const alive={A:1,B:1-bS,C:1-cD};
    const unitsN=1+(bS<.5?1:0)+(cD<.5?1:0);
    const sizes={A:0,B:0,C:0};F.forEach(f=>{if(f.den<.5)sizes[f.own]++});
    const strength=F.reduce((a,f)=>a+(1-f.den)*(1-.5*f.at),0)/F.length;
    const S={
      spas:u>.5,brisk:u>.5,bab:u>.6,weakRef:u>.5&&strength<.8,
      weak:strength<.8,waste:cW>.4,fasc:Lm&&bN>.5,
      fib:F.some(f=>f.den>.5),fp:Lm&&bN>.5,big:r>.5,rec:bS>.5};
    return {U,Lm,u,bN,bA,bS,r,cD,cW,hand,F,alive,unitsN,sizes,strength,S};
  }
  /* EMG trace: unit potentials (biphasic, wider and taller when enlarged), fibrillations, sharp waves */
  function emgPath(x0,w,y0,st,t){
    const sh=frac(t*7),N=180;let d='';
    const units=[];
    const bigA=lerp(1,2.3,st.r),wid=lerp(.012,.026,st.r);
    [['A',.12],['B',.45],['C',.76]].forEach(([k,c])=>{if(st.alive[k]>.5)units.push(c)});
    const den=st.F.reduce((a,f)=>Math.max(a,f.den),0);
    for(let k=0;k<=N;k++){const x=k/N;let v=0;
      units.forEach((c0,j)=>{const c=frac(c0-sh);const z=(x-c)/wid;v+=-z*Math.exp(-z*z)*2.2*bigA;
        if(st.r>.05)v+=st.r*.9*Math.sin(z*7)*Math.exp(-z*z*.35)*bigA*.5});
      if(den>.3){[.3,.58,.9].forEach((c0,j)=>{const c=frac(c0-sh*1.7);const z=(x-c)/.0035;v+=-z*Math.exp(-z*z)*.55*den});
        const c=frac(.66-sh*1.3),dz=x-c;if(dz>0&&dz<.08)v-=den*1.1*(dz<.004?dz/.004:Math.exp(-(dz-.004)/.018))}
      d+=(k?'L':'M')+f1(x0+x*w)+' '+f1(y0-clamp(v,-2.6,2.6)*13)}
    return d;
  }
  /* a schematic open hand, palm up, thumb on the left; w: wasting 0..1 of APB and FDI */
  function handG(x,y,s,w,o){
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" style="opacity:${f1(o)}">`;
    const st='fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6;stroke-linejoin:round';
    [[24,6],[39,0],[54,4],[69,14]].forEach(([fx,fy])=>{g+=`<rect x="${fx}" y="${fy}" width="13" height="${46-fy}" rx="6.5" style="${st}"/>`});
    g+=`<g transform="translate(30 96) rotate(-42)"><rect x="-8" y="-50" width="16" height="54" rx="8" style="${st}"/></g>`;
    g+=`<path d="M22 44 L84 44 Q88 44 88 52 L88 98 Q88 112 72 112 L40 112 Q24 112 22 98 Z" style="${st}"/>`;
    const m='fill:var(--muscle);stroke:var(--muscle-line);stroke-width:1.4';
    g+=`<ellipse cx="36" cy="88" rx="${f1(11*(1-.55*w))}" ry="${f1(17*(1-.35*w))}" transform="rotate(-18 36 88)" style="${m}"/>`;
    g+=`<ellipse cx="18" cy="62" rx="${f1(6*(1-.55*w))}" ry="${f1(12*(1-.35*w))}" transform="rotate(-40 18 62)" style="${m}"/>`;
    g+=`<ellipse cx="78" cy="86" rx="8" ry="17" style="${m}"/>`;
    return g+'</g>';
  }
  function draw(t){
    const N=vb(svg,'720 470','400 836');
    const L=N?{fx:240,fw:116,bx:204,box:{x:10,y:488,w:380,h:118},sg:{x:12,y:626,colW:194,two:true},leg:{x:250,y:20,two:true},refX:240}
             :{fx:318,fw:130,bx:262,box:{x:270,y:140,w:226,h:120},sg:{x:514,y:22,colW:200,two:false},leg:{x:254,y:24,two:false},refX:320};
    const st=state(t),P=phaseOf(NE_STEPS,t);
    const tx=L.fx+L.fw+14,ty=362;
    const cyc=frac(t*16);
    let s=`<rect x="0" y="0" width="100%" height="100%" rx="10" style="fill:var(--field)"/>`;
    /* ---- brain, brainstem, cord ---- */
    s+=`<ellipse cx="125" cy="80" rx="110" ry="60" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<path d="M125 20 Q122 28 125 34" style="fill:none;stroke:var(--cell-line);stroke-width:1.4"/>`;
    s+=`<text x="16" y="13" class="t-xs">${T.cortex}</text>`;
    s+=`<rect x="105" y="126" width="40" height="130" rx="14" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<rect x="96" y="250" width="90" height="192" rx="24" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<line x1="125" y1="132" x2="125" y2="436" style="stroke:var(--cell-line);stroke-width:1;stroke-dasharray:3 4;opacity:.7"/>`;
    s+=`<text x="152" y="145" class="t-xs">${T.stem}</text>`;
    s+=`<text x="90" y="264" class="t-xs t-end">${T.cord}</text>`;
    /* ---- UMN and corticospinal tract ---- */
    const u=st.u,tw=lerp(3.4,1.4,u);
    const TP=[ [74,68],[82,98],[100,116],[113,134],[113,224],[118,236],[132,244],[137,256],[137,412] ];
    s+=`<path d="${poly(TP)}" style="fill:none;stroke:var(--umn);stroke-width:${f1(tw)};stroke-linejoin:round;opacity:${f1(1-.45*u)};${u>.02?`stroke-dasharray:${f1(10-4*u)} ${f1(1+6*u)}`:''}"/>`;
    /* branches: to the bulbar nucleus and to each LMN */
    s+=`<path d="M113 198 H128" style="stroke:var(--umn);stroke-width:${f1(tw*.6)};opacity:${f1(1-.6*u)}"/>`;
    ['A','B','C'].forEach(k=>{const y=LMNY[k];s+=`<path d="M137 ${y} H${LX-14}" style="stroke:var(--umn);stroke-width:${f1(tw*.6)};opacity:${f1(1-.6*u)}"/><circle cx="${LX-14}" cy="${y}" r="2.4" style="fill:var(--umn);opacity:${f1(1-.6*u)}"/>`});
    /* lipofuscin left where Betz cells were lost */
    if(u>.6)[[56,72],[92,78],[64,84],[86,66]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="1.8" style="fill:var(--muted);opacity:${f1((u-.6)*2)}"/>`});
    s+=umn(74,60,11,1,{dead:u,axonLen:0});
    s+=`<text x="92" y="58" class="t-lbl" style="fill:var(--umn)">${T.umnName}</text><text x="92" y="71" class="t-xs">${T.layer}</text>`;
    s+=`<text x="118" y="110" class="t-xs">${T.capsule}</text>`;
    /* signals descending */
    for(let k=0;k<3;k++){const f=frac(t*9+k/3);if(u>.3&&k>=3*(1-u))continue;const [px,py]=along(TP,f);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--umn);opacity:${f1(1-.6*u)}"/>`}
    /* brainstem nuclei */
    const bul=st.Lm?.5*st.bS+.5*st.cD:0;
    s+=lmn(133,160,5,1,{axonLen:0,dead:0});
    s+=lmn(133,198,5,1,{axonLen:0,dead:bul});
    s+=`<text x="152" y="158" class="t-xs">${T.ocular[0]}</text><text x="152" y="169" class="t-xs">${t>=.7&&st.Lm?T.ocularSpared:T.ocular[1]}</text>`;
    s+=`<text x="152" y="196" class="t-xs">${T.bulbar[0]}</text><text x="152" y="207" class="t-xs">${T.bulbar[1]}</text>`;
    s+=lines(T.pyr,152,236,'t-xs',11);
    /* ---- LMNs, axons, branches ---- */
    s+=`<text x="90" y="292" class="t-lbl t-end" style="fill:var(--lmn)">${T.lmnName}</text><text x="90" y="304" class="t-xs t-end">${T.horn}</text>`;
    const jerk=arc?bump(cyc,.6,.85)*(st.u>.5?6:3):0;
    ['A','B','C'].forEach(k=>{const y=LMNY[k],dead=k==='B'?st.bS:k==='C'?st.cD:0,ax=k==='B'?st.bA:dead,col=UCOL[k];
      s+=`<path d="M${LX+11} ${y} H${L.bx}" style="fill:none;stroke:${col};stroke-width:3;stroke-linecap:round;opacity:${f1(1-.75*ax)};${ax>.02?`stroke-dasharray:${f1(8-3*ax)} ${f1(2+7*ax)}`:''}"/>`;
      s+=lmn(LX,y,10,1,{axonLen:0,dead});
      s+=`<text x="${LX+16}" y="${y-8}" class="t-lbl">${k}</text>`;
      if(1-ax>.5){const f=frac(t*11+(k==='A'?0:k==='B'?.33:.66));s+=`<circle cx="${f1(lerp(LX+12,L.bx,f))}" cy="${y}" r="3" style="fill:${col}"/>`}
    });
    /* branches to fibres */
    st.F.forEach((f,i)=>{const yF=FY(i),ex=L.fx+5;
      const br=(k,frac0,op,dash)=>{const y0=LMNY[k],x1=lerp(L.bx,ex,frac0),y1=lerp(y0,yF,frac0);
        return `<path d="M${L.bx} ${y0} C${f1(L.bx+18*frac0)} ${y0} ${f1(x1-18*frac0)} ${f1(y1)} ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:${UCOL[k]};stroke-width:1.7;opacity:${f1(op)};${dash?'stroke-dasharray:3 3':''}"/>`};
      if(f.o==='B'){const keep=1-.75*st.bN;if(st.bN<1)s+=br('B',keep,1-st.bN,false);
        if(f.sprout>0){const adopterDead=f.adopter==='C'?st.cD:0;s+=br(f.adopter,f.sprout,1-adopterDead,f.sprout<1||adopterDead>0)}}
      else{const dead=f.o==='C'?st.cD:0;s+=br(f.o,1-.75*dead,1-dead,dead>0)}
    });
    /* ---- muscle fibres ---- */
    s+=`<text x="${L.fx}" y="${FY(8)+26}" class="t-xs">${T.muscle}</text>`;
    s+=`<g transform="translate(${f1(-jerk)} 0)">`;
    st.F.forEach((f,i)=>{const yF=FY(i);
      const fl=f.den>.3?f.den*Math.pow(Math.max(0,Math.sin(t*240+i*2.7)),6):0;
      const innerv=f.den<.5;
      s+=fibre(L.fx,yF,L.fw,12,1,{col:innerv?UCOL[f.own]:'var(--muted)',atrophy:f.at,flick:fl});
      s+=`<ellipse cx="${L.fx+6}" cy="${yF}" rx="3.2" ry="4.4" style="fill:${innerv?UCOL[f.own]:'var(--panel)'};stroke:${innerv?UCOL[f.own]:'var(--muted)'};stroke-width:1.2"/>`;
      if(innerv)s+=`<text x="${L.fx+L.fw-11}" y="${yF+3.5}" class="t-xs" style="fill:var(--ink);font-weight:700">${f.own}</text>`;
    });
    /* tendon */
    st.F.forEach((f,i)=>{s+=`<path d="M${L.fx+L.fw} ${FY(i)} L${tx} ${ty}" style="stroke:var(--cell-line);stroke-width:1.2;opacity:.8"/>`});
    s+=`</g>`;
    s+=`<circle cx="${f1(tx-jerk)}" cy="${ty}" r="3.4" style="fill:var(--cell-line)"/>`;
    /* ---- reflex arc ---- */
    if(arc){
      const sx=L.fx+L.fw*.5,sy=278;
      const AP=[ [sx-16,sy],[L.fx-6,270],[222,270],[186,270],[172,280],[LX+6,LMNY.A-10] ];
      s+=`<ellipse cx="${f1(sx)}" cy="${sy}" rx="16" ry="3.6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.4"/>`;
      s+=`<path d="${poly(AP)}" style="fill:none;stroke:var(--steel);stroke-width:1.8;stroke-linejoin:round"/>`;
      s+=`<circle cx="222" cy="270" r="5" style="fill:var(--steel-soft);stroke:var(--steel);stroke-width:1.4"/>`;
      if(!N)s+=`<text x="${f1(sx+20)}" y="${sy+3}" class="t-xs" style="fill:var(--steel)">${T.spindle}</text>`;
      s+=`<text x="${N?200:194}" y="${N?264:285}" class="t-xs" style="fill:var(--steel)">${T.sensory}</text>`;
      const pa=ramp(cyc,.1,.4);if(pa>0&&pa<1){const [px,py]=along(AP,pa);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--steel)"/>`}
      const pe=ramp(cyc,.4,.6);if(pe>0&&pe<1)s+=`<circle cx="${f1(lerp(LX+12,L.bx,pe))}" cy="${LMNY.A}" r="4.2" style="fill:var(--lmn);stroke:var(--panel);stroke-width:1"/>`;
      /* hammer */
      const hit=1-bump(cyc,0,.16),hx=tx+5+9*hit;
      s+=`<g><path d="M${f1(hx+5)} ${ty-6} L${f1(hx+12)} ${ty-34}" style="stroke:var(--muted);stroke-width:2.6;stroke-linecap:round"/><rect x="${f1(hx)}" y="${ty-12}" width="9" height="20" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/></g>`;
      if(!N)s+=`<text x="${f1(tx+10)}" y="${ty+24}" class="t-xs">${T.tap}</text>`;
      const weakLimb=st.u>.5&&st.strength<.8;
      const rf=st.u>.5?(weakLimb?T.reflex.briskWeak:T.reflex.brisk):(st.Lm&&st.bN>.5?T.reflex.notBrisk:T.reflex.normal);
      s+=`<text x="${L.refX+(N?0:96)}" y="${FY(8)+(N?42:26)}" class="t-sm" style="fill:var(--ink)">${rf}</text>`;
      /* plantar response */
      const fx=14,fy=436,up=st.u>.6,tg=bump(cyc,.4,.95)*(up?-34:22);
      s+=`<text x="${fx}" y="372" class="t-xs">${T.plantar}</text>`;
      s+=`<path d="M${fx} ${fy} L${fx} ${fy-16} Q${fx+2} ${fy-30} ${fx+14} ${fy-30} L${fx+22} ${fy-27} Q${fx+38} ${fy-12} ${fx+56} ${fy-8} L${fx+58} ${fy} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5;stroke-linejoin:round"/>`;
      s+=`<g transform="rotate(${f1(tg)} ${fx+56} ${fy-4})"><rect x="${fx+55}" y="${fy-9}" width="15" height="8" rx="4" style="fill:var(--cell);stroke:${up?'var(--umn)':'var(--cell-line)'};stroke-width:1.6"/></g>`;
      const so=ramp(cyc,.1,.4);if(so>0&&so<1)s+=`<circle cx="${f1(lerp(fx+4,fx+50,so))}" cy="${fy+3}" r="2.6" style="fill:var(--muted)"/>`;
      s+=lines(up?T.foot.up:T.foot.down,fx,fy+18,'t-xs',11,up?'fill:var(--umn)':'');
    }
    /* ---- EMG or split-hand box ---- */
    const B=L.box,hf=ramp(t,.86,.88);
    s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`;
    if(hf<1){
      const y0=B.y+B.h*.52;
      s+=`<g style="opacity:${f1(1-hf)}"><text x="${B.x+10}" y="${B.y+16}" class="t-xs">${T.emgTitle}</text>`;
      s+=`<line x1="${B.x+10}" x2="${B.x+B.w-10}" y1="${f1(y0)}" y2="${f1(y0)}" class="grid"/>`;
      s+=`<path d="${emgPath(B.x+10,B.w-20,y0,st,t)}" style="fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linejoin:round"/>`;
      const anyDen=st.S.fib,em=st.S.big?(anyDen?T.emg.bigFib:T.emg.big):(anyDen?T.emg.fib:T.emg.normal);
      s+=`<text x="${B.x+10}" y="${B.y+B.h-10}" class="t-sm" style="fill:var(--ink)">${em}</text></g>`;
    }
    if(hf>0){
      const w=st.hand,hs=.8,hx=B.x+(N?60:36),hy=B.y+22;
      s+=`<text x="${B.x+10}" y="${B.y+16}" class="t-xs" style="opacity:${f1(hf)}">${T.hand.title}</text>`;
      s+=handG(hx,hy,hs,w,hf);
      const lx=N?B.x+150:B.x+126,stat=st.Lm?(w>.5?T.hand.wasting:''):T.hand.none;
      const LB=[['apb',36,88,stat],['fdi',18,62,stat],['adm',78,86,st.Lm?(w>.5?T.hand.kept:''):T.hand.none]];
      const ly=N?[B.y+40,B.y+70,B.y+100]:[B.y+44,B.y+72,B.y+100];
      LB.forEach(([k,mx,my,txt],j)=>{const px=hx+mx*hs,py=hy+my*hs,yy=ly[[1,0,2][j]];
        s+=`<g style="opacity:${f1(hf)}"><path d="M${f1(px)} ${f1(py)} L${lx-6} ${yy-4}" style="stroke:var(--muted);stroke-width:1;fill:none"/><text x="${lx}" y="${yy}" class="t-sm" style="fill:var(--ink)">${T.hand[k]}</text>`;
        if(txt)s+=`<text x="${lx+(N?34:30)}" y="${yy}" class="t-xs" style="fill:${k==='adm'||!st.Lm?'var(--muted)':'var(--tdp)'}">${txt}</text>`;
        if(N)s+=`<text x="${lx+110}" y="${yy}" class="t-xs">${k==='adm'?T.hand.little:T.hand.thumb}</text>`;
        s+='</g>'});
    }
    /* ---- legend ---- */
    {const G=L.leg;let y=G.y;
      s+=`<text x="${G.x}" y="${y}" class="t-xs">${T.pattern}</text>`;y+=16;
      const mn=T.modeName[mode];
      if(G.two){s+=lines(mn,G.x,y,'t-lbl',15);y+=36}else{s+=`<text x="${G.x}" y="${y}" class="t-lbl">${mn.join(' ')}</text>`;y+=24}
      [['umn','var(--umn)'],['lmn','var(--lmn)'],['fib','var(--muscle-line)']].forEach(([k,c])=>{
        s+=`<line x1="${G.x}" x2="${G.x+18}" y1="${y-4}" y2="${y-4}" style="stroke:${c};stroke-width:3.2;stroke-linecap:round"/>`;
        if(G.two){s+=lines(T.leg[k],G.x+26,y,'t-xs',11);y+=28}else{s+=`<text x="${G.x+26}" y="${y}" class="t-xs">${T.leg[k].join(' ')}</text>`;y+=16}});
    }
    /* ---- signs panel ---- */
    const G=L.sg,SGR=[['umnH','var(--umn)',['spas','brisk','bab','weakRef']],['lmnH','var(--lmn)',['weak','waste','fasc']],['emgH','var(--steel)',['fib','fp','big','rec']]];
    let gx=G.x,gy=G.y;
    const sgAt=s.length;let col1end=0;
    s+=`<text x="${gx}" y="${gy+2}" class="t-lbl">${T.sgTitle}</text>`;gy+=24;
    const col2y=gy;
    SGR.forEach(([h,c,rows],gi)=>{
      if(G.two&&gi===2){col1end=gy;gx=G.x+G.colW;gy=col2y}
      const allowed=h==='umnH'?st.U:st.Lm;
      s+=`<rect x="${gx}" y="${gy-9}" width="4" height="11" style="fill:${c}"/><text x="${gx+9}" y="${gy}" class="t-xs" style="fill:${c};font-weight:600">${T.sg[h]}</text>`;gy+=18;
      rows.forEach(k=>{const on=st.S[k],ls=T.sg[k].split('|');
        s+=`<rect x="${gx}" y="${gy-10}" width="13" height="13" rx="3" style="fill:${on?c:'var(--panel)'};stroke:${on?c:'var(--muted)'};stroke-width:1.4;opacity:${allowed||on?1:.55}"/>`;
        if(on)s+=`<path d="M${gx+3} ${gy-3.5} l3 3 l5 -6.5" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
        s+=lines(ls,gx+21,gy,'t-sm',13,on?'fill:var(--ink);font-weight:600':'');
        gy+=ls.length*13+(N?6:7)});
      gy+=8});
    /* readouts */
    gy+=2;
    const big=Math.max(st.sizes.A,st.sizes.B,st.sizes.C);
    const strTxt=st.strength>.95?(st.unitsN<3?T.strength.kept:T.strength.normal):T.strength.reduced;
    const rd=[T.units(st.unitsN,3),T.largest(big),strTxt];
    if(G.two){rd.forEach(r=>{s+=lines(r.length>24?wrap2(r):[r],gx,gy,'t-xs',11,'fill:var(--ink)');gy+=r.length>24?24:14})}
    else rd.forEach(r=>{s+=`<text x="${gx}" y="${gy}" class="t-xs" style="fill:var(--ink)">${r}</text>`;gy+=15});
    const sgEnd=Math.max(gy,col1end)-4;
    s=s.slice(0,sgAt)+`<rect x="${G.x-8}" y="${G.y-16}" width="${G.two?380:G.colW+4}" height="${f1(N?sgEnd-G.y+16:440)}" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`+s.slice(sgAt);
    if(N)svg.setAttribute('viewBox','0 0 400 '+Math.ceil(sgEnd+10));
    svg.innerHTML=s;
    /* ---- note ---- */
    setSt(P);
    const on=Object.keys(T.signLong).filter(k=>st.S[k]).map(k=>T.signLong[k]);
    let extra='';
    if(mode==='pls'&&(P===2||P===3))extra=T.spared.plsLow;
    else if(mode==='pls'&&P>=4)extra=T.spared.plsLate;
    else if(mode==='pma'&&P===1)extra=T.spared.pmaUp;
    else if(mode==='pma'&&P===4)extra=T.spared.pmaLate;
    const S0=NE_STEPS[P];
    const txt=`${S0.txt}</p><p class="ne-now"><b>${T.modeLine[mode]}</b>${extra?' '+extra:''}</p><p class="ne-now sm">${on.length?T.now(on.join(T.sep)):T.none} ${rd.join(' · ')}.`;
    $('#neNote').innerHTML=noteHTML({k:S0.k,t:S0.t,txt,pt:S0.pt,hook:S0.hook});
  }
  /* split a long readout into two lines at the space nearest the middle */
  function wrap2(r){const m=r.length/2;let best=-1;for(let i=0;i<r.length;i++)if(r[i]===' '&&(best<0||Math.abs(i-m)<Math.abs(best-m)))best=i;return best<0?[r]:[r.slice(0,best),r.slice(best+1)]}
  const stop=playWire(rg,$('#nePlay'),draw,26000,UI.replay,'neurons');
  const setSt=stepWire($('#neSteps'),NE_STEPS,rg,draw,stop);
  toggleRow($('#neMode'),[['als',T.modeBtn.als],['pls',T.modeBtn.pls],['pma',T.modeBtn.pma]],'als',v=>{mode=v;draw(+rg.value)});
  toggleRow($('#neArc'),[['on',T.arcBtn.on],['off',T.arcBtn.off]],'on',v=>{arc=v==='on';draw(+rg.value)});
  draw(+rg.value);
};
