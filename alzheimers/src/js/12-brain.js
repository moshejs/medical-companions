
/* =============== 1.2 brain =============== */
const BR_B=[
 {k:'Stage 0',t:'No tangles yet',txt:'Braak and Braak staged 83 brains. Plaque distribution varied too much to stage, but tangles and neuropil threads followed a stereotyped sequence of six stages. [[Braak1991]]',
  pt:'Press play to watch tau tangles appear and spread, one region at a time.'},
 {k:'Braak I · transentorhinal',t:'Stage I: a small strip first',txt:'Stages I and II: tangles in projection neurons of the transentorhinal cortex, on the inner surface of the temporal lobe, with occasional tangles in CA1 of the hippocampus. [[Braak1991,DeTure2019]]',
  pt:'Tau tangles first appear in a small strip of cortex beside the brain\'s memory centre.'},
 {k:'Braak II · transentorhinal',t:'Stage II: next to the memory gateway',txt:'Tangles become denser in the transentorhinal region. The neighbouring entorhinal cortex is the gateway whose layer II feeds the hippocampus, which is why early tangles here matter for memory. [[Braak1991,GomezIsla1996]]',
  pt:'The tangles are still confined to a small area, right at the entrance to the memory circuit.'},
 {k:'Braak III · limbic',t:'Stage III: the limbic stages',txt:'In stages III and IV the entorhinal cortex is fully involved, CA1 and the subiculum are affected, basal forebrain tangles become more prominent and ghost tangles appear. The isocortex is still largely spared. [[DeTure2019]]',
  pt:'Tangles fill the memory areas deep in the temporal lobe. The outer cortex is still mostly clear.'},
 {k:'Braak IV · limbic',t:'Stage IV: limbic, more severe',txt:'The limbic pattern becomes more severe. In a clinicopathological series, tangles appeared early in the entorhinal cortex, CA1/subiculum and amygdala. [[Arriagada1992,DeTure2019]]',
  hook:'Braak I–II transentorhinal, III–IV limbic, V–VI isocortical. In the ABC score these become B1, B2 and B3. [[Montine2012]]'},
 {k:'Braak V · isocortical',t:'Stage V: into association cortex',txt:'Tangles spread extensively through the association isocortex, the large areas that combine information. [[DeTure2019,Braak1991]]',
  pt:'Now the tangles reach the outer cortex used for language, planning and finding your way.'},
 {k:'Braak VI · isocortical',t:'Stage VI: nearly everywhere',txt:'All association areas are severely affected, and even primary sensory cortex is involved: virtually all association cortex is destroyed. Primary motor and sensory cortex stay relatively spared in gross atrophy. [[Braak1991,DeTure2019]]',
  pt:'In the last stage almost all of the thinking cortex is affected. Areas for movement are among the last.',
  hook:'Tangles spread in a predictable order, and neocortical tangle burden tracks cognitive severity better than plaque counts do. [[Arriagada1992,Nelson2012]]'}
].map((s,k)=>({...s,from:k?.04+.15*k-.09:0,at:k?.04+.15*k:.02}));
const BR_T=[
 {k:'Phase 0',t:'No amyloid deposits',txt:'Thal phases come from 47 brains and describe how amyloid deposits spread. Switch back to tau at any time to compare. [[Thal2002]]',
  pt:'Press play to watch amyloid plaques appear and spread.'},
 {k:'Thal 1 · neocortex',t:'Phase 1: the outer cortex first',txt:'Amyloid deposits start in the neocortex, the opposite end of the brain from where tangles start. [[Thal2002]]',
  pt:'Amyloid plaques start in the outer cortex, not in the memory region.',
  hook:'Amyloid starts in the neocortex and spreads inward and downward. Tau starts in the medial temporal lobe and spreads outward.'},
 {k:'Thal 2 · allocortex',t:'Phase 2: the hippocampus joins',txt:'The allocortex, including the hippocampus and entorhinal cortex, is added. Phases 1 to 3 are not unusual in neurologically normal people. [[Thal2002,DeTure2019]]',
  pt:'Plaques reach the memory region, often in people who still think and remember normally.'},
 {k:'Thal 3 · deep grey matter',t:'Phase 3: deep nuclei',txt:'Diencephalon, striatum and the basal forebrain cholinergic nuclei are added. Non-demented people with Alzheimer-type amyloid were in phases 1 to 3. [[Thal2002]]',
  pt:'Plaques reach structures deep inside the brain.'},
 {k:'Thal 4 · brainstem',t:'Phase 4: the brainstem',txt:'Brainstem nuclei are added. Clinically proven Alzheimer\'s cases were in phases 3 to 5. [[Thal2002]]'},
 {k:'Thal 5 · cerebellum',t:'Phase 5: the cerebellum',txt:'The cerebellum is added last. In the ABC score, phases 1–2 are A1, phase 3 is A2 and phases 4–5 are A3. [[Montine2012,Thal2002]]',
  hook:'Thal: 1 neocortex, 2 allocortex, 3 diencephalon/striatum/basal forebrain, 4 brainstem, 5 cerebellum.'}
].map((s,k)=>({...s,from:k?.04+.18*k-.1:0,at:k?.04+.18*k:.02}));
const BR_CI=[
 {from:0,at:.06,k:'Step 1 · The loop',t:'A circuit for new memories',
  txt:'Entorhinal layer II gives rise to the perforant path, the main excitatory input to the hippocampus. Signals pass to the dentate gyrus, CA3, CA1 and the subiculum, and the subiculum and entorhinal cortex connect the hippocampus back to association cortex, basal forebrain, thalamus and hypothalamus. [[GomezIsla1996,Hyman1984]]',
  pt:'New memories travel around a loop deep in the temporal lobe before they are stored.'},
 {from:.15,at:.27,k:'Step 2 · First tangles',t:'Tangles start at the entrance and the exit',
  txt:'The first tangles form where the circuit begins: transentorhinal and entorhinal cortex, then CA1 and the subiculum. Pathology hits the subiculum and entorhinal layers II and IV, the cells that link the hippocampus to the rest of the brain, so the hippocampus is cut off from its input and output. [[Braak1991,Hyman1984]]',
  pt:'The disease first damages the doors in and out of the memory loop.',
  hook:'Alzheimer\'s pathology isolates the hippocampal formation by hitting entorhinal layers II and IV and the subiculum (Hyman 1984). [[Hyman1984]]'},
 {from:.35,at:.49,k:'Step 3 · Very mild Alzheimer\'s',t:'Entorhinal layer II loses 60%',
  txt:'In very mild Alzheimer\'s (CDR 0.5) the entorhinal cortex had 32% fewer neurons than controls: 60% fewer in layer II and 40% fewer in layer IV. [[GomezIsla1996]] In familial Alzheimer\'s, episodic memory impairment appears about 10 years before expected onset. [[Bateman2012]]',
  pt:'Even when symptoms are very mild, more than half of the cells at the entrance to the memory loop are already gone.'},
 {from:.55,at:.68,k:'Step 4 · The output',t:'CA1 empties out',
  txt:'Normal ageing caused almost no CA1 neuron loss. Alzheimer\'s cases had about 4.4 million CA1 neurons, against 14.1 million in normal ageing. [[West1994]]',
  pt:'The main output station of the hippocampus loses about two thirds of its cells. This does not happen in normal ageing.',
  hook:'CA1 neuron loss marks Alzheimer\'s, not normal ageing (West 1994).'},
 {from:.72,at:.84,k:'Step 5 · Acetylcholine',t:'The basal forebrain fades',
  txt:'Neurons of the nucleus basalis of Meynert, the main cholinergic input to the cortex, undergo profound and selective degeneration of more than 75%. This is the basis of the cortical cholinergic deficit. [[Whitehouse1982]] The drugs that act on it are in <a href="#synapse" data-go="synapse">Cholinesterase inhibitors and memantine</a>.',
  pt:'A small cluster of cells that supplies the cortex with acetylcholine, a messenger for attention and memory, is mostly lost.'},
 {from:.86,at:.98,k:'Step 6 · On MRI',t:'The hippocampus shrinks',
  txt:'In severe Alzheimer\'s, entorhinal layer II was down about 90%. [[GomezIsla1996]] On MRI, medial temporal atrophy is accepted as a diagnostic marker at the MCI stage. [[Frisoni2010]] A meta-analysis of 595 people with Alzheimer\'s and 212 controls found hippocampal atrophy of 4.66% a year, against 1.41% in controls. [[Barnes2009]] The temporal horns of the lateral ventricles enlarge, though no gross change is specific to Alzheimer\'s. [[DeTure2019]]',
  pt:'Brain scans show the memory centre shrinking about three times faster than in people of the same age without Alzheimer\'s.',
  hook:'Hippocampal atrophy: 4.66% a year in Alzheimer\'s vs 1.41% in controls (Barnes 2009).'}
];
inits.brain=()=>{
  /* ---- 1. staging maps ---- */
  const svg=$('#brSvg'),rg=$('#brT');let tau=true;
  const LAT='M30 130 C28 70 90 22 170 20 C250 18 305 60 312 125 C316 150 305 170 285 175 C250 195 190 205 150 200 C115 196 98 182 100 165 C90 158 60 160 45 155 C35 150 30 140 30 130 Z';
  const MED='M30 130 C28 70 90 22 170 20 C250 18 305 60 312 125 C316 150 306 172 286 180 C262 190 238 204 220 208 C180 214 140 214 118 206 C106 200 104 186 96 176 C80 166 52 162 40 154 C32 148 30 140 30 130 Z';
  const BK={trans:[0,.6,.85,1,1,1,1],ent:[0,0,.35,.85,1,1,1],hip:[0,.15,.25,.6,.85,1,1],amy:[0,0,0,.45,.75,.9,1],bf:[0,0,0,.45,.7,.85,1],assoc:[0,0,0,0,0,.55,.95],prim:[0,0,0,0,0,0,.6]};
  const BMAP={trans:'trans',ent:'ent',hip:'hip',amy:'amy',bf:'bf',assoc:'assoc',cing:'assoc',parahip:'assoc',sens:'prim',vis:'prim'};
  const TK={neo:[0,.55,.7,.8,.9,1],allo:[0,0,.6,.8,.9,1],deep:[0,0,0,.65,.85,1],bs:[0,0,0,0,.7,1],cb:[0,0,0,0,0,.75]};
  const TMAP={assoc:'neo',cing:'neo',parahip:'neo',sens:'neo',vis:'neo',motor:'neo',hip:'allo',ent:'allo',trans:'allo',bf:'deep',thal:'deep',str:'deep',bs:'bs',cb:'cb'};
  const kv=(arr,s)=>{const i=Math.floor(s),f=s-i;return lerp(arr[Math.min(i,arr.length-1)],arr[Math.min(i+1,arr.length-1)],ease(f))};
  const steps=()=>tau?BR_B:BR_T;
  const stageOf=t=>tau?clamp((t-.04)/.15,0,6):clamp((t-.04)/.18,0,5);
  function view(kind,ox,oy,V,C){
    const sh=(k,base='var(--cell)')=>{const v=V(k);return v>0?`style="fill:${C};opacity:${f1(v*.85)}"`:`style="fill:none"`};
    const ov=(d,k)=>{const v=V(k);return v>0?`<path d="${d}" style="fill:${C};opacity:${f1(v*.85)}"/>`:''};
    let s=`<g transform="translate(${ox} ${oy})">`;
    if(kind==='L'){
      s+=`<defs><clipPath id="brClipL"><path d="${LAT}"/></clipPath></defs><text x="0" y="-12" class="t-sm">LATERAL VIEW · left side</text>`;
      const BS='M184 192 C188 214 190 236 192 256 L214 256 C212 236 214 214 222 194 Z',CB='M222 196 C245 184 290 178 304 186 C316 205 292 232 255 232 C230 232 214 215 222 196 Z';
      s+=`<path d="${BS}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(BS,'bs');
      s+=`<path d="${CB}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(CB,'cb');
      s+=`<path d="M232 208 C255 199 285 195 303 199 M234 219 C258 213 284 211 299 213" style="fill:none;stroke:var(--cell-line);stroke-width:1;opacity:.7"/>`;
      s+=`<path d="${LAT}" style="fill:var(--cell)"/>`+ov(LAT,'assoc');
      s+=`<g clip-path="url(#brClipL)">`;
      [['M164 18 C158 55 150 92 140 136','motor'],['M189 18 C183 55 175 92 165 130','sens']].forEach(([d,k])=>{s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:14"/>`;const v=V(k);if(v>0)s+=`<path d="${d}" style="fill:none;stroke:${C};stroke-width:14;opacity:${f1(v*.85)}"/>`});
      s+=`<circle cx="306" cy="140" r="21" style="fill:var(--panel-2)"/>`;if(V('vis')>0)s+=`<circle cx="306" cy="140" r="21" style="fill:${C};opacity:${f1(V('vis')*.85)}"/>`;
      s+=`</g><path d="${LAT}" style="fill:none;stroke:var(--cell-line);stroke-width:2"/>`;
      s+=`<path d="M100 160 C130 148 170 138 210 122 C220 118 226 112 228 104 M176 21 C170 55 162 92 152 132" style="fill:none;stroke:var(--cell-line);stroke-width:1.8;stroke-linecap:round"/>`;
      s+=`<path d="M270 36 C266 90 266 140 268 182 M228 104 C240 120 255 132 268 140" style="fill:none;stroke:var(--cell-line);stroke-width:1;stroke-dasharray:3 4"/>`;
      s+=`<ellipse cx="125" cy="112" rx="30" ry="15" ${sh('str')}/><ellipse cx="125" cy="112" rx="30" ry="15" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="125" y="110" class="t-xs t-mid" style="fill:var(--ink)">striatum</text><text x="125" y="121" class="t-xs t-mid">(deep)</text>`;
      s+=`<text x="76" y="76" class="t-xs t-mid" style="fill:var(--ink)">frontal</text><text x="226" y="64" class="t-xs t-mid" style="fill:var(--ink)">parietal</text><text x="196" y="182" class="t-xs t-mid" style="fill:var(--ink)">temporal</text>`;
      s+=`<text x="330" y="22" class="t-xs t-end" style="fill:var(--ink)">occipital</text><path d="M304 26 L296 58" style="stroke:var(--muted);stroke-width:1"/>`;
      s+=`<text x="176" y="9" class="t-xs t-mid">primary motor · sensory</text>`;
      s+=`<text x="182" y="250" class="t-xs t-end" style="fill:var(--ink)">brainstem</text><text x="262" y="250" class="t-xs t-mid" style="fill:var(--ink)">cerebellum</text>`;
    } else {
      s+=`<defs><clipPath id="brClipM"><path d="${MED}"/></clipPath></defs><text x="0" y="-12" class="t-sm">MEDIAL VIEW · brainstem removed</text>`;
      const CB='M238 212 C256 200 292 194 304 204 C314 226 290 252 258 252 C238 252 228 230 238 212 Z';
      s+=`<path d="${CB}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(CB,'cb');
      s+=`<path d="${MED}" style="fill:var(--cell)"/>`+ov(MED,'assoc');
      s+=`<g clip-path="url(#brClipM)">`;
      const CING='M92 112 C104 60 236 48 268 104';
      s+=`<path d="${CING}" style="fill:none;stroke:var(--cell);stroke-width:16"/>`;if(V('cing')>0)s+=`<path d="${CING}" style="fill:none;stroke:${C};stroke-width:16;opacity:${f1(V('cing')*.85)}"/>`;
      const CAL='M252 150 C272 146 292 140 316 136';
      s+=`<path d="${CAL}" style="fill:none;stroke:var(--panel-2);stroke-width:16"/>`;if(V('vis')>0)s+=`<path d="${CAL}" style="fill:none;stroke:${C};stroke-width:16;opacity:${f1(V('vis')*.85)}"/>`;
      const PH='M106 189 C140 188 190 190 228 193 L228 220 L104 220 Z',ENT='M110 188 C125 187 150 187 166 189 L166 197 L112 197 Z',TR='M112 197 L170 197 L172 212 L114 212 Z';
      s+=`<path d="${PH}" style="fill:var(--cell)"/>`+ov(PH,'parahip');
      s+=`<path d="${ENT}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:.9"/>`+ov(ENT,'ent');
      s+=`<path d="${TR}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:.9"/>`+ov(TR,'trans');
      s+=`</g><path d="${MED}" style="fill:none;stroke:var(--cell-line);stroke-width:2"/>`;
      s+=`<path d="M84 104 C98 46 240 34 276 100" style="fill:none;stroke:var(--cell-line);stroke-width:1.2"/>`;
      s+=`<path d="M104 118 C116 80 226 72 252 108 M104 118 C100 128 108 136 118 134" style="fill:none;stroke:var(--cell-line);stroke-width:13;stroke-linecap:round"/><path d="M104 118 C116 80 226 72 252 108 M104 118 C100 128 108 136 118 134" style="fill:none;stroke:var(--panel-2);stroke-width:10;stroke-linecap:round"/>`;
      s+=`<ellipse cx="175" cy="133" rx="30" ry="16" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><ellipse cx="175" cy="133" rx="30" ry="16" ${sh('thal')}/>`;
      s+=`<ellipse cx="110" cy="150" rx="9" ry="6" style="fill:var(--cell);stroke:var(--ink);stroke-width:1.2"/><ellipse cx="110" cy="150" rx="9" ry="6" ${sh('bf')}/>`;
      const HIP='M138 178 C160 170 196 169 222 176 C218 184 190 187 160 187 C148 187 138 184 138 178 Z';
      s+=`<path d="${HIP}" ${sh('hip')}/><path d="${HIP}" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<circle cx="126" cy="176" r="7" ${sh('amy')}/><circle cx="126" cy="176" r="7" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 2"/>`;
      s+=`<text x="180" y="71" class="t-xs t-mid" style="fill:var(--ink)">cingulate</text><text x="182" y="108" class="t-xs t-mid" style="fill:var(--ink)">corpus callosum</text><text x="175" y="136" class="t-xs t-mid" style="fill:var(--ink)">thalamus</text>`;
      s+=`<text x="282" y="164" class="t-xs t-mid" style="fill:var(--ink)">primary</text><text x="282" y="175" class="t-xs t-mid" style="fill:var(--ink)">visual</text><text x="272" y="234" class="t-xs t-mid" style="fill:var(--ink)">cerebellum</text>`;
      [['basal forebrain',196,106,155],['amygdala (deep)',212,120,180],['entorhinal',228,122,193],['transentorhinal',244,132,206]].forEach(([l,y,ax,ay])=>{
        s+=`<text x="94" y="${y}" class="t-xs t-end" style="fill:var(--ink)">${l}</text><path d="M97 ${y-3} L${ax} ${ay}" style="stroke:var(--muted);stroke-width:1"/><circle cx="${ax}" cy="${ay}" r="1.8" style="fill:var(--ink)"/>`});
      s+=`<text x="172" y="238" class="t-xs t-mid" style="fill:var(--ink)">hippocampus (deep)</text><path d="M182 229 L182 186" style="stroke:var(--muted);stroke-width:1"/>`;
    }
    return s+'</g>';
  }
  function draw(t){
    const N=vb(svg,'720 430','400 690');
    const L=N?{lat:[35,44],med:[35,340],bar:[12,618,376]}:{lat:[15,44],med:[375,44],bar:[20,326,680]};
    const sg=stageOf(t),C=tau?'var(--rose)':'var(--amber)';
    const V=k=>{if(tau){const m=BMAP[k];return m?kv(BK[m],sg):0}const m=TMAP[k];return m?kv(TK[m],sg):0};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=view('L',L.lat[0],L.lat[1],V,C)+view('M',L.med[0],L.med[1],V,C);
    // stage bar
    const [bx,by,W]=L.bar,n=tau?6:5,gap=6,bw=(W-gap*(n-1))/n,cur=Math.floor(sg+.02);
    const RO=['I','II','III','IV','V','VI'],abc=tau?['B0','B1','B1','B2','B2','B3','B3'][cur]:['A0','A1','A1','A2','A3','A3'][cur];
    s+=`<text x="${bx}" y="${by}" class="t-sm" style="fill:${C}">${tau?'BRAAK STAGE · TAU TANGLES':'THAL PHASE · AMYLOID'}</text><text x="${bx+W}" y="${by}" class="t-sm t-end" style="fill:var(--ink)">ABC: ${abc}</text>`;
    for(let k=1;k<=n;k++){const x=bx+(k-1)*(bw+gap),reached=k<=cur,isCur=k===cur,part=clamp(sg-(k-1));
      s+=`<rect x="${f1(x)}" y="${by+8}" width="${f1(bw)}" height="28" rx="7" style="fill:var(--panel);stroke:${reached?C:'var(--line)'};stroke-width:${isCur?2.4:1.2}"/>`;
      if(part>0)s+=`<rect x="${f1(x+2)}" y="${by+31}" width="${f1((bw-4)*part)}" height="3" rx="1.5" style="fill:${C}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${by+27}" class="t-lbl t-mid" style="fill:${reached?'var(--ink)':'var(--muted)'}">${tau?RO[k-1]:k}</text>`}
    if(tau){[['transentorhinal',1],['limbic',3],['isocortical',5]].forEach(([l,k])=>{const x1=bx+(k-1)*(bw+gap),x2=x1+2*bw+gap,on=cur>=k&&cur<=k+1;
      s+=`<path d="M${f1(x1+4)} ${by+42} v4 H${f1(x2-4)} v-4" style="fill:none;stroke:${on?C:'var(--muted)'};stroke-width:1.2"/><text x="${f1((x1+x2)/2)}" y="${by+60}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`})}
    else if(!N){const TL=[['neocortex'],['+ hippocampus','+ entorhinal'],['+ thalamus','+ striatum','+ basal forebrain'],['+ brainstem'],['+ cerebellum']];
      TL.forEach((ls,i)=>{const x=bx+i*(bw+gap)+bw/2,on=i+1<=cur;ls.forEach((l,j)=>s+=`<text x="${f1(x)}" y="${by+54+j*13}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`)})}
    else{const TN=['No amyloid deposits yet','Phase 1: neocortex','Phase 2 adds hippocampus, entorhinal','Phase 3 adds thalamus, striatum,','Phase 4 adds the brainstem','Phase 5 adds the cerebellum'];
      s+=`<text x="${bx}" y="${by+54}" class="t-xs" style="fill:var(--ink)">${TN[cur]}</text>`;if(cur===3)s+=`<text x="${bx}" y="${by+67}" class="t-xs" style="fill:var(--ink)">and basal forebrain</text>`}
    svg.innerHTML=s;
    const ST=steps(),p=phaseOf(ST,t);setSt(p);$('#brNote').innerHTML=noteHTML(ST[p]);
  }
  const stop=playWire(rg,$('#brPlay'),draw,15000,'Replay','brain');
  const stEl=$('#brSteps');stEl.setAttribute('role','group');stEl.setAttribute('aria-label','Steps');
  const renderSteps=()=>{stEl.innerHTML=steps().map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i).padStart(2,'0')}</b><span>${s.k}</span></button>`).join('')};
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=s.at;draw(s.at)});
  const setSt=i=>{$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const s=steps()[i];rg.setAttribute('aria-valuetext',`${tau?'Braak stage':'Thal phase'} ${i} of ${steps().length-1}: ${s.t}`)};
  const setMode=v=>{tau=v;$('#brTau').setAttribute('aria-pressed',v);$('#brAmy').setAttribute('aria-pressed',!v);renderSteps();draw(+rg.value)};
  $('#brTau').onclick=()=>setMode(true);$('#brAmy').onclick=()=>setMode(false);
  renderSteps();draw(+rg.value);

  /* ---- 2. the memory circuit ---- */
  const ci=$('#brCi'),cr=$('#brCiT');
  const bz=(P,u)=>{const a=(1-u)**3,b=3*(1-u)**2*u,c=3*(1-u)*u*u,d=u**3;return [a*P[0]+b*P[2]+c*P[4]+d*P[6],a*P[1]+b*P[3]+c*P[5]+d*P[7]]};
  const pd=P=>`M${P[0]} ${P[1]} C${P[2]} ${P[3]} ${P[4]} ${P[5]} ${P[6]} ${P[7]}`;
  const LOOP=[[118,256,160,300,200,312,236,302],[322,296,350,280,352,230,342,200],[338,112,340,90,332,72,324,64],[198,72,186,88,178,104,172,120],[150,134,134,116,120,96,112,84]];
  const G={
   ec4:{cells:[0,1,2,3,4].map(i=>[28+i*20,70,7]),ord:[2,0,4,1,3]},
   ec2:{cells:[...Array(10)].map((_,i)=>[28+(i%5)*20,236+Math.floor(i/5)*26,7]),ord:[3,7,0,5,9,2,6,1,8,4]},
   ca1:{cells:[...Array(10)].map((_,i)=>[196+i*14,62-8*Math.sin(Math.PI*i/9),6]),ord:[4,1,7,9,2,5,0,8,3,6]},
   sub:{cells:[[150,140,7],[168,128,7],[186,140,7]],ord:[0,1,2]},
   ca3:{cells:[0,1,2,3].map(i=>[340,120+i*22,7]),ord:[0,1,2,3]},
   dg:{cells:[...Array(6)].map((_,i)=>[240+i*16,300+6*Math.sin(Math.PI*i/5),5]),ord:[0,1,2,3,4,5]}};
  function group(g,loss,tg,col){let s='';const lc=loss*g.cells.length;
    g.cells.forEach((c,i)=>{const r=g.ord.indexOf(i),dead=clamp(lc-r),[x,y,rr]=c;
      if(dead<1)s+=neuron(x,y,rr,1-dead*.8,{axon:-Math.PI/2,axonLen:0,dendrites:3,col,fill:'var(--cell)'});
      if(dead>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${rr}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(dead*.7)}"/>`;
      if(tg&&tg(i)>0)s+=tangle(x,y,rr*.85,tg(i)*(dead>0?.5:1))});
    return s}
  function drawCi(t){
    const N=vb(ci,'720 410','400 750');
    const L=N?{c:[8,8],nb:[60,372],mr:[60,566]}:{c:[20,24],nb:[430,30],mr:[430,228]};
    const ec2=.6*ease(ramp(t,.35,.5))+.3*ease(ramp(t,.86,.96)),ec4=.4*ease(ramp(t,.35,.5)),ca1=.69*ease(ramp(t,.55,.68)),nbm=.75*ease(ramp(t,.72,.84));
    const tgE=ramp(t,.15,.3),tgC=ramp(t,.2,.35);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><defs>${marker('brCiA','var(--violet)')}</defs>`;
    s+=`<g transform="translate(${L.c[0]} ${L.c[1]})">`;
    // pathways, dimmed by upstream loss
    const up=[1-ec2,1-ec2,1-ec2,(1-ec2)*(1-ca1),(1-ec2)*(1-ca1)];
    LOOP.forEach((P,i)=>s+=`<path d="${pd(P)}" style="fill:none;stroke:var(--violet);stroke-width:2.2;opacity:${f1(.25+.6*up[i])}" marker-end="url(#brCiA)"/>`);
    s+=`<text x="16" y="30" class="t-sm">ENTORHINAL CORTEX</text>`;
    s+=group(G.ec4,ec4,()=>tgE*.8,'var(--cell-line)')+group(G.ec2,ec2,i=>i%2?tgE:0,'var(--cell-line)');
    s+=group(G.sub,0,()=>ramp(t,.22,.36),'var(--cell-line)')+group(G.ca1,ca1,i=>i%3===1?tgC:0,'var(--cell-line)');
    s+=group(G.ca3,0,null,'var(--cell-line)')+group(G.dg,0,null,'var(--cell-line)');
    s+=`<text x="16" y="102" class="t-xs" style="fill:var(--ink)">layer IV${ec4>.01?` · <tspan style="fill:var(--rose)">−${Math.round(ec4*100)}%</tspan>`:''}</text>`;
    s+=`<text x="16" y="294" class="t-xs" style="fill:var(--ink)">layer II${ec2>.01?` · <tspan style="fill:var(--rose)">−${Math.round(ec2*100)}%</tspan>`:''}</text>`;
    s+=`<text x="168" y="168" class="t-xs t-mid" style="fill:var(--ink)">subiculum</text><text x="259" y="26" class="t-lbl t-mid">CA1</text>`;
    if(ca1>.01)s+=`<text x="259" y="41" class="t-xs t-mid" style="fill:var(--rose)">${ca1>.68?'14.1 → 4.4 million neurons':'neurons being lost'}</text>`;
    s+=`<text x="326" y="164" class="t-lbl t-end">CA3</text><text x="280" y="336" class="t-xs t-mid" style="fill:var(--ink)">dentate gyrus</text>`;
    s+=`<text x="112" y="322" class="t-xs">perforant path</text><text x="334" y="252" class="t-xs t-end">mossy fibres</text><text x="330" y="104" class="t-xs t-end">Schaffer collaterals</text>`;
    // signals travelling round the loop
    [0,2.5].forEach(off=>{const u=((t*28+off)%5+5)%5,seg=Math.floor(u),f=u-seg,[x,y]=bz(LOOP[seg],f);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--violet);opacity:${f1(.15+.85*up[seg])}"/>`});
    s+='</g>';
    // basal forebrain panel
    s+=`<g transform="translate(${L.nb[0]} ${L.nb[1]})"><text x="0" y="12" class="t-sm">BASAL FOREBRAIN → CORTEX</text>`;
    s+=`<rect x="0" y="24" width="280" height="28" rx="6" style="fill:var(--panel-2)"/><text x="8" y="42" class="t-xs" style="fill:var(--ink)">cortex</text>`;
    for(let i=0;i<12;i++){const vis=clamp((1-nbm)*12-i);s+=`<circle cx="${70+i*17}" cy="38" r="3.5" style="fill:var(--sage);opacity:${f1(.12+.88*vis)}"/>`}
    s+=`<text x="276" y="20" class="t-xs t-end">acetylcholine</text>`;
    const nord=[1,3,0,2],lc=nbm*4;
    for(let i=0;i<4;i++){const dead=clamp(lc-nord.indexOf(i)),x=50+i*60;
      s+=neuron(x,128,10,1-dead*.75,{axon:-Math.PI/2,axonLen:74,dendrites:4,dead,col:dead>.5?'var(--muted)':'var(--sage)'})}
    s+=`<text x="140" y="168" class="t-xs t-mid" style="fill:var(--ink)">nucleus basalis of Meynert</text>`;
    if(nbm>.01)s+=`<text x="140" y="182" class="t-xs t-mid" style="fill:var(--rose)">${nbm>.74?'more than 75% of neurons lost':'cholinergic neurons dying'}</text>`;
    s+='</g>';
    // MRI panel
    const yrs=5*ramp(t,.86,1),va=Math.pow(1-.0466,yrs),vc=Math.pow(1-.0141,yrs);
    const HS='M-40 10 C-40 -14 -14 -24 6 -18 C26 -12 40 -20 44 -8 C48 4 32 6 22 4 C8 2 -2 14 -14 18 C-28 22 -40 22 -40 10 Z';
    s+=`<g transform="translate(${L.mr[0]} ${L.mr[1]})"><text x="0" y="12" class="t-sm">MRI: HIPPOCAMPAL VOLUME</text><text x="280" y="12" class="t-xs t-end" style="fill:var(--ink)">year ${f1(yrs)}</text>`;
    [[70,va,'var(--violet)','var(--violet-soft)','Alzheimer\'s','−4.66% a year'],[210,vc,'var(--sage)','var(--sage-soft)','controls','−1.41% a year']].forEach(([x,v,c,cs,l1,l2])=>{
      s+=`<path d="${HS}" transform="translate(${x} 70) scale(1.18)" style="fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:3 3"/>`;
      s+=`<path d="${HS}" transform="translate(${x} 70) scale(${(1.18*Math.sqrt(v)).toFixed(3)})" style="fill:${cs};stroke:${c};stroke-width:1.6"/>`;
      s+=`<text x="${x}" y="122" class="t-lbl t-mid">${l1}</text><text x="${x}" y="138" class="t-xs t-mid">${l2}</text>`});
    s+=`<text x="140" y="164" class="t-xs t-mid" style="fill:var(--ink)">${yrs<.05?'press play: 5 years at the published rates':`${Math.round(va*100)}% vs ${Math.round(vc*100)}% of starting volume`}</text></g>`;
    ci.innerHTML=s;
    const p=phaseOf(BR_CI,t);setCi(p);$('#brCiNote').innerHTML=noteHTML(BR_CI[p]);
  }
  const stopC=playWire(cr,$('#brCiPlay'),drawCi,18000,'Replay','brain');
  const setCi=stepWire($('#brCiSteps'),BR_CI,cr,drawCi,stopC);
  drawCi(+cr.value);

  /* ---- 3. ABC score ---- */
  const abc={a:2,b:2,c:2};
  const level=(a,b,c)=>a===0?'Not':b<=1?'Low':a===1?(c<=1?'Low':'Intermediate'):a===2?'Intermediate':(b===3&&c>=2?'High':'Intermediate');
  const ROWS=[['A0','any C',0,[0,1,2,3]],['A1','C0 or C1',1,[0,1]],['A1','C2 or C3',1,[2,3]],['A2','any C',2,[0,1,2,3]],['A3','C0 or C1',3,[0,1]],['A3','C2 or C3',3,[2,3]]];
  function drawAbc(){
    const L=level(abc.a,abc.b,abc.c),lv=['Not','Low','Intermediate','High'];
    $$('[data-abc]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.v===abc[b.dataset.abc]));
    $('#brAbcOut').innerHTML=`<span class="kicker">A${abc.a} + B${abc.b} + C${abc.c}</span><span class="br-res">${L}</span>
      <div class="br-scale" aria-hidden="true">${lv.map(x=>`<span class="${x===L?'on':''}">${x}</span>`).join('')}</div>
      <p>${L==='Intermediate'||L==='High'?'Considered a sufficient explanation for dementia.':L==='Low'?'Not considered a sufficient explanation for dementia on its own.':'No Alzheimer\'s neuropathologic change.'}</p>`;
    const col=abc.b<=1?0:abc.b-1;
    let h='<thead><tr><th>A (Thal)</th><th>C (CERAD)</th><th>B0 or B1</th><th>B2</th><th>B3</th></tr></thead><tbody>';
    ROWS.forEach(([a,c,ai,cs])=>{const hit=ai===abc.a&&cs.includes(abc.c);
      h+=`<tr><th>${a}</th><td>${c}</td>`+[1,2,3].map((b,j)=>`<td class="${hit&&j===col?'on':''}">${level(ai,b,cs[cs.length-1])}</td>`).join('')+'</tr>'});
    $('#brAbcTbl').innerHTML=h+'</tbody>';
  }
  $$('[data-abc]').forEach(b=>b.addEventListener('click',()=>{abc[b.dataset.abc]=+b.dataset.v;drawAbc()}));
  drawAbc();
};
