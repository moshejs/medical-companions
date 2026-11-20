/* =============== 1.2 circuit =============== */
const CI_STEPS=[
 {from:0,at:.06,k:'Step 1 · The source',t:'Where dopamine is made',
  txt:`Dopamine for the movement loop comes from the substantia nigra pars compacta (SNc) in the midbrain. Its neurons carry a dark pigment, neuromelanin. In 7 control brains counted with unbiased stereology, the substantia nigra held on average 550,000 pigmented and 260,000 non-pigmented neurons. [[Pakkenberg1991]] Fearnley and Lees divide the pars compacta into a dorsal and a ventral tier, and the ventral tier into medial and lateral parts. [[Fearnley1991]]`,
  pt:`A thin dark strip deep in the midbrain makes the dopamine. Its cells look dark because they hold a pigment.`,
  hook:`The pigmented neurons are the ones Parkinson's takes: in 7 people with Parkinson's, pigmented nigral neurons were down 66% and non-pigmented ones 24%. Across cell groups, loss tracked how many neurons were pigmented (r = 0.97). [[Pakkenberg1991,Hirsch1988]]`},
 {from:.16,at:.22,k:'Step 2 · The pathway',t:'Travelling to the striatum',
  txt:`Nigral axons run up to the striatum: the caudate and the putamen. The motor part of the loop passes through the post-commissural putamen. [[Galvan2008]] There, dopamine reaches two kinds of striatal projection neuron: those with D1 receptors, which form the direct pathway, and those with D2 receptors, which form the indirect pathway. [[Galvan2008]]`,
  pt:`Long fibres carry dopamine from the midbrain up to the striatum, a pair of structures deep in each hemisphere that help start and scale movements.`,
  hook:`Nigrostriatal means from the substantia nigra to the striatum. The putamen is hit hardest: post-mortem dopamine was down 98% in the putamen and 80% in the caudate. [[Kish2008]]`},
 {from:.32,at:.38,k:'Step 3 · The direct pathway',t:'The direct loop: go',
  txt:`The cortex excites the striatum with glutamate. D1 neurons of the direct pathway inhibit the output nuclei, GPi and SNr, in one step. GPi and SNr project mainly to the VA and VL nuclei of the thalamus, which project back to the cortex. So activating the direct pathway inhibits GPi/SNr and disinhibits the thalamus and cortex. [[Galvan2008]]`,
  pt:`The output nuclei normally hold the thalamus back. The direct loop quietens them, which lets the thalamus push the cortex on: go.`,
  hook:`Two inhibitions make a release: cortex → striatum (D1) ⊣ GPi/SNr ⊣ thalamus → cortex. Net effect: more movement.`},
 {from:.48,at:.54,k:'Step 4 · The indirect pathway',t:'The indirect loop: brake',
  txt:`D2 neurons of the indirect pathway reach the output nuclei by way of the external globus pallidus (GPe) and the subthalamic nucleus (STN). They inhibit GPe, GPe inhibits the STN, and the STN excites GPi/SNr. Activating this pathway does the opposite of the direct one. The STN also receives glutamate input from the cortex. [[Galvan2008]]`,
  pt:`The indirect loop takes a longer route and ends by pressing harder on the brake.`,
  hook:`Indirect: striatum (D2) ⊣ GPe ⊣ STN → GPi/SNr ⊣ thalamus. Net effect: less movement.`},
 {from:.64,at:.7,k:'Step 5 · The balance',t:'Dopamine tips the balance toward go',
  txt:`Dopamine makes corticostriatal transmission easier onto direct-pathway (D1) neurons and harder onto indirect-pathway (D2) neurons. Both effects lower GPi/SNr activity, so dopamine favours movement. [[Galvan2008]] This box-and-arrow "rate model" was built from firing-rate and metabolic data in MPTP-treated monkeys by Albin, Young and Penney (1989) and DeLong (1990). [[Albin1989,DeLong1990,Galvan2008]]`,
  pt:`Dopamine presses the accelerator and eases the brake at the same time.`,
  hook:`Dopamine excites the direct (D1) pathway and inhibits the indirect (D2) pathway. Both effects favour movement. [[Galvan2008]]`},
 {from:.8,at:.92,k:'Step 6 · Parkinson\'s',t:'Dopamine lost: the brake wins',
  txt:`With less dopamine, less D2 activation lets indirect neurons inhibit GPe more. That releases the STN, which drives GPi/SNr harder. Less D1 activation releases GPi/SNr as well. The thalamus is over-inhibited and the cortex less activated. [[Galvan2008]] MPTP monkeys show more STN and GPi activity and less GPe activity, as the model predicts, and lesioning or inactivating the overactive STN or GPi reverses parkinsonian signs in monkeys and in people. [[Galvan2008]] Drag "neurons left" to set how much is lost.`,
  pt:`Dopamine is the oil that lets the brain's movement switch turn on easily. Without it, the brake is stuck on.`,
  hook:`Loss of dopamine leaves the STN and GPi overactive, and they over-inhibit the thalamus. [[Galvan2008]]`}
];
const CI_DBS=`<div class="callout"><b>Where DBS acts.</b> The two Parkinson's targets for deep-brain stimulation are the nuclei this model makes overactive, the STN and the GPi; a randomised comparison found similar motor benefit from either. [[Galvan2008,Follett2010]] See <a href="#dbs" data-go="dbs">Deep-brain stimulation</a>.</div>`;
const CI_DRUGS=`<div class="callout"><b>Where drugs act.</b> Dopamine cannot cross the blood-brain barrier; levodopa can, and is converted to dopamine in the brain. [[LevodopaLabels2026]] Dopamine agonists act on the receptors themselves; tavapadon, approved in the US in September 2026, is a selective D1/D5 partial agonist. [[DrugsFDA2026,AgonistLabels2026]] MAO-B inhibitors block monoamine oxidase B; for rasagiline the IC50 in rat brain was 4.43 nM for MAO-B against 412 nM for MAO-A. [[Youdim2001]] COMT inhibitors block the route that takes over levodopa breakdown when carbidopa blocks decarboxylation; with entacapone, levodopa's half-life rises from 1.3 to 2.4 hours. [[Jenner2026,EnzymeInhibitorLabels2026]] See <a href="#levodopa" data-go="levodopa">Levodopa and carbidopa</a> and <a href="#drugs" data-go="drugs">The other medicines</a>.</div>`;
const CI_RES=[
 {from:0,at:.06,k:'Before the disease',t:'Normal ageing',
  txt:`In 36 controls, pigmented neurons in the caudal nigra fell linearly with age, at 4.7% per decade. The lateral ventral tier was relatively spared (2.1% per decade), compared with the medial ventral tier (5.4%) and the dorsal tier (6.9%). [[Fearnley1991]]`,
  pt:`Everyone loses a few of these cells with age, slowly, and mostly not the ones Parkinson's takes first.`},
 {from:.15,at:.26,k:'Silent loss',t:'About five years without motor signs',
  txt:`Fearnley and Lees estimated a presymptomatic phase of about 5 years from the onset of neuronal loss. In Parkinson's the loss was exponential and ran in the opposite pattern to ageing, lateral ventral tier first. In 7 people with incidental Lewy bodies, loss was confined to the lateral ventral tier (52% on average). [[Fearnley1991]] Incidental Lewy body cases showed a 27% age-adjusted neuron loss without motor signs, and their putamen TH protein was down 50%. [[Cheng2010]]`,
  pt:`The disease is removing cells for years before anyone notices a change in movement.`},
 {from:.37,at:.4,k:'At diagnosis',t:'About 30% of neurons, 50–60% of terminals',
  txt:`Cheng, Ulane and Burke estimate that at first diagnosis only about 30% of nigral dopamine neurons, but 50–60% of their axon terminals, have been lost: "axons first". Back-extrapolating Fearnley and Lees' regression gives a 31% age-adjusted loss at symptom onset. [[Cheng2010]] Fearnley and Lees' own figures at onset were 68% loss in the lateral ventral tier and 48% in the caudal nigra as a whole. [[Fearnley1991]]`,
  pt:`When movement first changes, about half or more of the dopamine nerve endings may be gone, while most of the cell bodies are still alive.`,
  hook:`The often-quoted "80% of striatal dopamine lost at onset" traces to Bernheimer 1973, which analysed only 13 brains biochemically, with no regression. Cheng and colleagues say it "does not provide useful information for this estimate". [[Cheng2010]]`},
 {from:.44,at:.52,k:'Years 1 to 4',t:'The dorsal putamen empties',
  txt:`In 28 brains taken 1 to 27 years after diagnosis, dorsal putamen dopamine markers (TH, DAT) showed modest loss at 1 year (a single case), variable moderate-to-marked loss at 3 years and virtually complete loss from 4 years on. Melanized neuron loss was about 10% at 1 year (one case) and 30–60% over the first several years. [[Kordower2013]]`,
  pt:`Within a few years of diagnosis, the dopamine endings in the movement part of the striatum are almost all gone.`,
  hook:`TH-positive nigral neurons were already down 50–90% at the earliest time points, while melanized neurons fell more slowly: loss of the dopamine marker runs ahead of cell death. [[Kordower2013]]`},
 {from:.6,at:.75,k:'Later years',t:'Cell bodies go more slowly',
  txt:`Melanized neuron loss became more gradual in the second decade, with only marginal further loss of TH-positive neurons. [[Kordower2013]] Dopamine is not the only system involved: in 19 cases, neuron loss was greatest in the noradrenergic locus coeruleus. [[Zarow2003]] See <a href="#braak" data-go="braak">How it spreads: Braak stages</a>.`,
  pt:`Later on, the remaining cell bodies are lost more slowly, and other brain systems matter more.`}
];
/* the box diagram, in its own 380 x 400 frame; 3.4 dbs draws it small */
const CI_BX={ctx:[20,6,355,40],d1:[30,82,110,40],snc:[157,82,66,40],d2:[240,82,110,40],gpe:[250,166,90,36],stn:[250,246,90,36],gpi:[30,246,110,36],th:[30,326,110,36]};
const CI_ED=[
 {p:[[85,46],[85,82]],k:'ex',a:'ctx',g:['dir']},
 {p:[[295,46],[295,82]],k:'ex',a:'ctx',g:['ind']},
 {p:[[366,46],[366,264],[340,264]],k:'ex',a:'ctx',g:['ind']},
 {p:[[85,122],[85,246]],k:'in',a:'d1',g:['dir']},
 {p:[[295,122],[295,166]],k:'in',a:'d2',g:['ind']},
 {p:[[295,202],[295,246]],k:'in',a:'gpe',g:['ind']},
 {p:[[250,264],[140,264]],k:'ex',a:'stn',g:['ind']},
 {p:[[85,282],[85,326]],k:'in',a:'gpi',g:['dir','ind']},
 {p:[[30,344],[12,344],[12,26],[20,26]],k:'ex',a:'th',g:['dir','ind']},
 {p:[[157,102],[140,102]],k:'da',a:'da',g:['da'],s:'+'},
 {p:[[223,102],[240,102]],k:'da',a:'da',g:['da'],s:'−'}
];
const CI_BG={ctx:['dir','ind'],d1:['dir','da'],d2:['ind','da'],snc:['da'],gpe:['ind'],stn:['ind'],gpi:['dir','ind'],th:['dir','ind']};
const CI_H={ctx:.6,d1:.62,d2:.34,gpe:.66,stn:.34,gpi:.4,th:.66,da:.75};
const CI_P={ctx:.6,d1:.3,d2:.78,gpe:.3,stn:.86,gpi:.9,th:.2,da:.06};
const ciAct=s=>{const o={};for(const k in CI_H)o[k]=lerp(CI_H[k],CI_P[k],clamp(s));return o};
const ciGo=a=>clamp(ramp(a.th,.12,.76));
function ciPoly(p){const seg=[];let L=0;for(let i=1;i<p.length;i++){const l=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);seg.push(l);L+=l}
  return u=>{let d=clamp(u)*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const f=seg[i]?clamp(d/seg[i]):0;return [lerp(p[i][0],p[i+1][0],f),lerp(p[i][1],p[i+1][1],f)]}d-=seg[i]}return p[0]}}
function ciPill(x,y,txt,fs=1){const w=txt.length*5.9*fs+12*fs,h=15*fs;
  return `<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.2"/><text x="${f1(x)}" y="${f1(y+3.4*fs)}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700;font-size:${f1(9.5*fs)}px">${txt}</text>`}
/* o: act (activity 0..1 per box), em(group) and bem(box) emphasis, t for travelling pulses,
   dbs / drugs overlays, mini for the small copy (short names, fs = font scale), dbsOn = which targets glow */
function ciBoxes(o){
  const A=o.act,fs=o.fs||1,mini=!!o.mini,E=o.em||(()=>1),BE=o.bem||(()=>1);
  const COL={ex:'var(--good)',in:'var(--bad)',da:'var(--amber)'};
  let s='';
  CI_ED.forEach(e=>{
    if(mini&&e.k==='da')return;
    const a=A[e.a],em=Math.max(...e.g.map(E)),w=(1.3+6.2*a)*(mini?1.25:1),c=COL[e.k],op=f1(.14+.86*em);
    const P=e.p,n=P.length,[x1,y1]=P[n-1],[x0,y0]=P[n-2],len=Math.hypot(x1-x0,y1-y0),ux=(x1-x0)/len,uy=(y1-y0)/len;
    const hl=e.k==='ex'?6+w*.7:e.k==='in'?1:2;
    const Q=P.slice(0,-1).concat([[x1-ux*hl,y1-uy*hl]]);
    s+=`<path d="M${Q.map(q=>f1(q[0])+' '+f1(q[1])).join(' L')}" style="fill:none;stroke:${c};stroke-width:${f1(w)};stroke-linejoin:round;opacity:${op}"/>`;
    if(e.k==='ex'){const hw=3.5+w*.55;s+=`<path d="M${f1(x1)} ${f1(y1)} L${f1(x1-ux*hl-uy*hw)} ${f1(y1-uy*hl+ux*hw)} L${f1(x1-ux*hl+uy*hw)} ${f1(y1-uy*hl-ux*hw)} Z" style="fill:${c};opacity:${op}"/>`}
    else if(e.k==='in'){const hw=5+w*.6;s+=`<path d="M${f1(x1-uy*hw)} ${f1(y1+ux*hw)} L${f1(x1+uy*hw)} ${f1(y1-ux*hw)}" style="stroke:${c};stroke-width:3.6;stroke-linecap:round;opacity:${op}"/>`}
    else{s+=`<circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(2.4+w*.32)}" style="fill:${c};opacity:${op}"/><text x="${f1((x0+x1)/2)}" y="${f1(y1-9)}" class="t-lbl t-mid" style="fill:var(--amber);opacity:${op}">${e.s}</text>`}
    if(o.t!=null&&e.k!=='da'&&em>.5&&a>.05){const at=ciPoly(P),sp=.5+1.6*a;
      for(let k=0;k<2;k++){const [px,py]=at(((o.t*sp*26)+k/2)%1);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.8+w*.3)}" style="fill:var(--panel);stroke:${c};stroke-width:1.6;opacity:${f1(em*(.45+.55*a))}"/>`}}
  });
  const NM=mini?{ctx:['Cortex'],d1:['D1'],d2:['D2'],snc:['SNc'],gpe:['GPe'],stn:['STN'],gpi:['GPi'],th:['Thal.']}
    :{ctx:['Cortex','motor areas'],d1:['Striatum D1','direct pathway'],d2:['Striatum D2','indirect pathway'],snc:['SNc','dopamine'],gpe:['GPe',''],stn:['STN','subthalamic'],gpi:['GPi / SNr','output'],th:['Thalamus','VA / VL']};
  for(const k in CI_BX){
    if(mini&&k==='snc')continue;
    const [x,y,w,h]=CI_BX[k],a=k==='snc'?A.da:A[k],em=BE(k),hot=(k==='stn'||k==='gpi')&&a>.68,low=k==='th'&&a<.35;
    s+=`<g style="opacity:${f1(.28+.72*em)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:${k==='snc'?'var(--amber-soft)':hot?'var(--bad-soft)':'var(--panel)'};stroke:${hot?'var(--bad)':k==='snc'?'var(--amber)':'var(--cell-line)'};stroke-width:${hot?2.6:1.4}"/>`;
    const tx=k==='ctx'?x+12:x+w/2,an=k==='ctx'?'':' t-mid',two=NM[k][1];
    s+=`<text x="${tx}" y="${f1(y+(two?h*.42:h/2+4*fs))}" class="t-lbl${an}" style="font-size:${f1(13*fs)}px">${NM[k][0]}</text>`;
    if(two)s+=`<text x="${tx}" y="${f1(y+h*.75)}" class="t-xs${an}">${two}</text>`;
    if(k!=='ctx')s+=`<rect x="${x+8}" y="${f1(y+h-4.5)}" width="${f1((w-16)*a)}" height="2.6" rx="1.3" style="fill:${hot?'var(--bad)':k==='snc'?'var(--amber)':low?'var(--warn)':'var(--muted)'}"/>`;
    if(k==='ctx'){const g=ciGo(A),mx=mini?150:200,mw=mini?212:162,gc=g>.55?'var(--good)':g>.3?'var(--warn)':'var(--bad)';
      if(!mini)s+=`<text x="${mx}" y="${y+15}" class="t-xs">MOVEMENT "GO"</text>`;
      s+=`<rect x="${mx}" y="${y+(mini?14:20)}" width="${mw}" height="${mini?12:11}" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${y+(mini?14:20)}" width="${f1(mw*g)}" height="${mini?12:11}" rx="5" style="fill:${gc}"/>`;
      if(!mini)s+=`<text x="${mx+mw}" y="${y+15}" class="t-xs t-end" style="fill:${gc};font-weight:700">${g>.55?'easy':g>.3?'harder':'hard'}</text>`}
    s+='</g>';
  }
  if(o.dbs){const pu=o.t!=null?.55+.45*Math.sin(o.t*90):1;
    (o.dbsOn||['stn','gpi']).forEach(k=>{const [x,y,w,h]=CI_BX[k];
      s+=`<rect x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}" rx="13" style="fill:none;stroke:var(--sky);stroke-width:${mini?7:3};stroke-dasharray:${mini?'12 6':'6 4'};opacity:${f1(pu)}"/>`;
      if(!mini)s+=ciPill(x+w-18,y-9,'DBS')});}
  if(o.drugs&&!mini){s+=ciPill(190,66,'levodopa')+ciPill(122,138,'agonists')+ciPill(332,138,'agonists')+ciPill(192,162,'MAO-B inhibitors')+ciPill(192,186,'COMT inhibitors')}
  return s;
}
/* monotone cubic through anchor points, for the reserve curves */
function ciMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],m=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){m[i]=0;m[i+1]=0;continue}const a=m[i]/d[i],b=m[i+1]/d[i],h=a*a+b*b;if(h>9){const q=3/Math.sqrt(h);m[i]=q*a*d[i];m[i+1]=q*b*d[i]}}
  return X=>{if(X<=x[0])return y[0];if(X>=x[n-1])return y[n-1];let i=0;while(X>x[i+1])i++;const h=x[i+1]-x[i],u=(X-x[i])/h;
    return (2*u**3-3*u*u+1)*y[i]+(u**3-2*u*u+u)*h*m[i]+(-2*u**3+3*u*u)*y[i+1]+(u**3-u*u)*h*m[i+1]}}
const CI_TA=[[-8,0],[-5,0],[-3,13],[-1.5,32],[0,55],[1,68],[2,80],[3,90],[4,97],[12,99]];
const CI_NA=[[-8,0],[-5,0],[-3,9],[-1.5,18],[0,30],[2,40],[4,47],[7,54],[12,61]];
const CI_EST=[['SN neurons (age-adj.)',31,31,'n'],['Incidental Lewy body',27,27,'n'],['Caudate VMAT2',49,49,'t'],['Putamen TH (incidental)',50,50,'t'],
  ['Caudate DA, onset ~60 y',68,68,'t'],['Caudate DA, onset ~73 y',82,82,'t'],['F-dopa PET, putamen',20,50,'t'],['DAT/VMAT2 imaging',50,70,'t']];
/* nigral neurons: local midbrain frame; tier, death rank (lateral ventral tier first), striatal target */
const CI_SN=(()=>{const q=u=>[(1-u)*(1-u)*58+2*u*(1-u)*130+u*u*206,(1-u)*(1-u)*64+2*u*(1-u)*84+u*u*58];
  const out=[];const add=(us,dy,tier,ranks)=>us.forEach((u,i)=>{const [x,y]=q(u);out.push({x,y:y+dy,tier,rank:ranks[i],seed:7+out.length*3})});
  add([.6,.72,.84,.96],9,'vl',[1,0,2,3]);
  add([.06,.19,.32,.45],10,'vm',[6,4,7,5]);
  add([.16,.38,.6,.8],-11,'dt',[10,8,11,9]);
  /* medial cells project to the caudate, lateral cells to the putamen, in order, so the bundle does not cross itself */
  const TG=[[48,86],[60,64],[50,40],[70,30],[146,150],[160,128],[176,160],[152,90],[170,62],[196,120],[204,88],[188,50]];
  out.map((n,i)=>i).sort((a,b)=>out[a].x-out[b].x).forEach((i,k)=>{out[i].tg=TG[k];out[i].ox=k});
  return out})();
const CI_TERM=(()=>{const R=rng(41),out=[];
  const inE=(x,y,cx,cy,rx,ry)=>((x-cx)/rx)**2+((y-cy)/ry)**2<1;
  while(out.length<34){const x=30+R()*60,y=12+R()*92;if(inE(x,y,58,58,24,40))out.push({x,y,r:R(),cau:1})}
  while(out.length<34+62){const x=140+R()*82,y=36+R()*136;if(inE(x,y,180,104,32,56))out.push({x,y,r:R(),cau:0})}
  return out})();
const CI_BZ=(P,u)=>{const a=(1-u)**3,b=3*(1-u)**2*u,c=3*(1-u)*u*u,d=u**3;return [a*P[0]+b*P[2]+c*P[4]+d*P[6],a*P[1]+b*P[3]+c*P[5]+d*P[7]]};

inits.circuit=()=>{
  /* ---- 1. the pathway and the loop ---- */
  const svg=$('#ciSvg'),rg=$('#ciT'),nr=$('#ciN');
  let pd=false,dbs=false,drugs=false;
  const EM={da:[.2,1,.3,.3,1,1],dir:[.18,.25,1,.3,1,1],ind:[.18,.25,.3,1,1,1]};
  function striatum(ox,oy,lossP,lossC,hi){
    let s=`<g transform="translate(${ox} ${oy})">`;
    s+=`<path d="M14 8 C30 6 36 30 30 70 C26 86 18 92 12 90 C18 60 18 30 14 8 Z" style="fill:var(--csf);stroke:var(--cell-line);stroke-width:1"/>`;
    s+=`<path d="M92 16 L112 12 L142 168 L122 174 Z" style="fill:var(--panel-2)"/>`;
    for(let i=0;i<6;i++)s+=`<path d="M${96+i*3.4} ${15+i*.2} L${126+i*3.4} ${171}" style="stroke:var(--cell-line);stroke-width:.6;opacity:.5"/>`;
    s+=`<path d="M132 92 C146 90 152 120 148 150 C140 158 128 142 128 118 Z" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1"/>`;
    const sty=`fill:var(--cell);stroke:${hi?'var(--amber)':'var(--cell-line)'};stroke-width:${hi?2:1.4}`;
    s+=`<path d="M30 10 C64 0 92 22 88 56 C84 92 58 112 34 104 C30 80 34 40 30 10 Z" style="${sty}"/>`;
    s+=`<path d="M150 40 C190 30 222 70 220 116 C218 156 190 178 160 170 C136 160 132 96 150 40 Z" style="${sty}"/>`;
    CI_TERM.forEach(d=>{const L=d.cau?lossC:lossP,o=clamp((d.r-L)*7);if(o>0)s+=`<circle cx="${f1(d.x)}" cy="${f1(d.y)}" r="2" style="fill:var(--amber);opacity:${f1(.85*o)}"/>`});
    return s+'</g>';
  }
  function midbrain(ox,oy,glow,pig){
    let s=`<g transform="translate(${ox} ${oy})">`;
    s+=`<path d="M0 0 C70 -6 160 4 214 30 C236 44 238 76 216 92 C188 108 128 108 86 100 C54 94 24 100 0 104 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`;
    s+=`<path d="M0 6 A8 8 0 0 1 0 22 Z" style="fill:var(--csf);stroke:var(--cell-line);stroke-width:1"/><path d="M0 -6 V110" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<circle cx="44" cy="38" r="13" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1"/><text x="44" y="41" class="t-xs t-mid" style="font-size:8.5px">RN</text>`;
    s+=`<path d="M70 96 C120 106 186 98 224 72" style="fill:none;stroke:var(--panel-2);stroke-width:12;stroke-linecap:round"/>`;
    if(glow>0)s+=`<path d="M58 64 Q130 84 206 58" style="fill:none;stroke:var(--amber);stroke-width:34;stroke-linecap:round;opacity:${f1(.28*glow)}"/>`;
    s+=`<path d="M58 64 Q130 84 206 58" style="fill:none;stroke:var(--ink);stroke-width:26;stroke-linecap:round;opacity:${f1(.05+.13*pig)}"/>`;
    return s+'</g>';
  }
  function synapse(cx,cy,R,lossP,t,dr){
    let s=`<defs><clipPath id="ciSyClip"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${R+2}" style="fill:var(--field);stroke:var(--line);stroke-width:1.4"/><g clip-path="url(#ciSyClip)">`;
    s+=`<path d="M${cx-R} ${f1(cy-R*.16)} C${f1(cx-R*.7)} ${f1(cy-R*1.2)} ${f1(cx+R*.7)} ${f1(cy-R*1.2)} ${cx+R} ${f1(cy-R*.16)} Z" style="fill:var(--cell);stroke:var(--amber);stroke-width:1.8"/>`;
    s+=`<path d="M${cx-R} ${f1(cy+R*.34)} C${f1(cx-R*.4)} ${f1(cy+R*.22)} ${f1(cx+R*.4)} ${f1(cy+R*.22)} ${cx+R} ${f1(cy+R*.34)} L${cx+R} ${cy+R} L${cx-R} ${cy+R} Z" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:1.4"/>`;
    const VS=[[-.5,-.5],[-.18,-.68],[.16,-.62],[.48,-.46],[-.28,-.38],[.1,-.38]],nv=Math.round(6*(1-lossP));
    VS.forEach(([a,b],i)=>{s+=i<nv?vesicle(cx+a*R,cy+b*R,R*.1,1,1):vesicle(cx+a*R,cy+b*R,R*.1,.35,0)});
    const RX=[-.52,-.22,.22,.52];
    RX.forEach((a,i)=>{const x=cx+a*R,y=cy+R*.3;s+=`<path d="M${f1(x-4)} ${f1(y-5)} v6 q4 4 8 0 v-6" style="fill:none;stroke:${i<2?'var(--sage)':'var(--violet)'};stroke-width:2.2;stroke-linecap:round"/>`;
      if(dr)s+=`<path d="M${f1(x)} ${f1(y-11)} l3.5 3.5 l-3.5 3.5 l-3.5 -3.5 Z" style="fill:var(--sky)"/>`});
    const rel=ramp(t,.17,.25),nd=Math.round(8*(1-lossP)*rel);
    for(let i=0;i<nd;i++){const cyc=(t*7+i*.137)%1,x0=cx+(-.42+.84*(i/7))*R,x1=cx+RX[i%4]*R,y0=cy-R*.2,y1=cy+R*.2;
      s+=`<circle cx="${f1(lerp(x0,x1,cyc))}" cy="${f1(lerp(y0,y1,cyc))}" r="${f1(R*.075)}" style="fill:var(--amber);opacity:${f1(bump(cyc,0,1))}"/>`}
    if(dr){for(let i=0;i<2;i++){const cyc=(t*5+i*.5)%1;s+=`<circle cx="${f1(cx-R*.1+i*R*.25)}" cy="${f1(lerp(cy-R*1.05,cy-R*.75,cyc))}" r="${f1(R*.06)}" style="fill:var(--sky);opacity:${f1(bump(cyc,0,1))}"/>`}
      s+=`<rect x="${f1(cx+R*.6)}" y="${f1(cy-R*.06)}" width="${f1(R*.26)}" height="${f1(R*.17)}" rx="3" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.2"/><path d="M${f1(cx+R*.62)} ${f1(cy-R*.04)} l${f1(R*.22)} ${f1(R*.13)}" style="stroke:var(--sky);stroke-width:1.4"/>`}
    s+=`</g><text x="${f1(cx-R*.37)}" y="${f1(cy+R*.72)}" class="t-xs t-mid" style="fill:var(--sage);font-weight:700">D1</text><text x="${f1(cx+R*.37)}" y="${f1(cy+R*.72)}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">D2</text>`;
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 766');
    const L=N?{str:[14,30],mb:[24,242],ins:[322,94,54],bx:[10,358],rd:[272,190],bnd:[104,214],tA:[14,18],tB:[24,232],ttl:[322,30],sep:'M10 350 H390',dl:[322,162]}
             :{str:[12,34],mb:[24,300],ins:[274,92,44],bx:[330,10],rd:[246,182],bnd:[100,258],tA:[12,18],tB:[24,286],ttl:[274,38],sep:'M324 14 V406',dl:[274,150]};
    const p=phaseOf(CI_STEPS,t),nU=+nr.value/100;
    const k6=ease(ramp(t,.8,.93)),nEff=pd?nU:(t>=.8?lerp(1,nU,k6):1),loss=1-nEff;
    const sev=Math.pow(clamp(ramp(loss,.05,.8)),.8),tL=Math.pow(clamp(loss/.55),.85);
    const A=ciAct(sev),dirB=bump(t,.32,.48)*.22*(1-.6*sev),indB=bump(t,.48,.64)*.2;
    A.d1+=dirB;A.gpi=clamp(A.gpi-dirB*.9+indB*.6);A.th=clamp(A.th+dirB*.9-indB*.7);A.d2+=indB;A.gpe=clamp(A.gpe-indB*.8);A.stn=clamp(A.stn+indB*.7);
    const em=g=>{const a=EM[g];if(p===0)return a[0];const S=CI_STEPS[p];return lerp(a[p-1],a[p],ease(ramp(t,S.from,S.from+.05)))};
    const bem=k=>k==='snc'&&p===0?1:Math.max(k==='ctx'?.45:0,...CI_BG[k].map(em));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><path d="${L.sep}" style="stroke:var(--line);stroke-width:1"/>`;
    const glow=p===0?1-ramp(t,.12,.16):0,hiStr=p===1;
    s+=striatum(L.str[0],L.str[1],tL,tL*.8,hiStr);
    s+=midbrain(L.mb[0],L.mb[1],glow,nEff);
    // axons, dying back from the striatum before the cell body goes (Cheng 2010)
    const ax=[];
    const by=L.bnd[1];
    CI_SN.forEach(n=>{const nx=L.mb[0]+n.x,ny=L.mb[1]+n.y,tx=L.str[0]+n.tg[0],ty=L.str[1]+n.tg[1],bx=L.bnd[0]+n.ox*4.2;
      const P1=[nx,ny,nx,ny-(N?22:34),bx,by+(N?26:40),bx,by],P2=[bx,by,bx,by-(N?24:34),tx,ty+(N?30:44),tx,ty];
      const at=u=>u<.5?CI_BZ(P1,u*2):CI_BZ(P2,u*2-1);
      const dead=clamp(loss*12-n.rank),ret=clamp(tL*12-n.rank);
      ax.push({n,nx,ny,at,dead,f:1-ret});
      if(ret<1){let d='';for(let i=0;i<=36;i++){const [x,y]=at(i/36*(1-ret));d+=(i?'L':'M')+f1(x)+' '+f1(y)}
        s+=`<path d="${d}" style="fill:none;stroke:var(--amber);stroke-width:1.5;opacity:${f1((.3+.45*(p>=1?1:.4))*(1-dead*.6))}"/>`}});
    if(t>.16)ax.forEach((a,i)=>{if(a.f<.05)return;const u=(t*13+i*.29)%1;if(u>a.f)return;const [x,y]=a.at(u);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--amber);opacity:${f1(ramp(t,.16,.2)*bump(u,0,a.f))}"/>`});
    ax.forEach(a=>{const {n,nx,ny,dead}=a;
      if(dead<1)s+=neuron(nx,ny,5.6,1-dead*.75,{axon:-Math.PI/2,axonLen:0,dendrites:4,pig:1-dead,seed:n.seed,col:dead>.5?'var(--muted)':'var(--amber)'});
      if(dead>0)s+=`<circle cx="${f1(nx)}" cy="${f1(ny)}" r="5.6" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(dead*.8)}"/>`});
    const H='paint-order:stroke;stroke:var(--field);stroke-width:3.5px;stroke-linejoin:round;',so=L.str,mo=L.mb;
    s+=`<text x="${L.tA[0]}" y="${L.tA[1]}" class="t-sm" style="${H}">STRIATUM · coronal, one side</text><text x="${L.tB[0]}" y="${L.tB[1]}" class="t-sm" style="${H}">MIDBRAIN · half section</text>`;
    s+=`<text x="${so[0]+58}" y="${so[1]+122}" class="t-xs t-mid" style="${H}fill:var(--ink)">caudate</text><text x="${so[0]+184}" y="${so[1]+188}" class="t-xs t-mid" style="${H}fill:var(--ink)">putamen</text>`;
    s+=`<text x="${so[0]+138}" y="${so[1]+84}" class="t-xs t-mid" style="${H}">GP</text><text x="${so[0]+92}" y="${so[1]+186}" class="t-xs t-mid" style="${H}">internal capsule</text>`;
    s+=`<text x="${mo[0]+150}" y="${mo[1]+24}" class="t-xs t-mid" style="${H}fill:var(--ink)">substantia nigra (SNc)</text>`;
    // synapse inset
    const [ix,iy,iR]=L.ins;
    s+=`<text x="${L.ttl[0]}" y="${L.ttl[1]}" class="t-xs t-mid">A STRIATAL SYNAPSE</text>`;
    s+=`<path d="M${L.str[0]+204} ${L.str[1]+80} L${f1(ix-iR*.92)} ${f1(iy+iR*.3)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<g style="opacity:${f1(.45+.55*ramp(t,.14,.2))}">`+synapse(ix,iy,iR,tL,t,drugs)+'</g>';
    if(drugs)s+=`<text x="${L.dl[0]}" y="${L.dl[1]}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700">levodopa · agonists</text><text x="${L.dl[0]}" y="${L.dl[1]+12}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700">MAO-B inhibitor</text>`;
    // neurons-left readout
    const pct=Math.round(nEff*100);
    s+=`<text x="${L.rd[0]}" y="${L.rd[1]}" class="t-xs">NIGRAL NEURONS</text><text x="${L.rd[0]}" y="${L.rd[1]+30}" style="font:800 28px var(--display);fill:${pct<70?'var(--bad)':'var(--ink)'}">${pct}%</text><text x="${L.rd[0]}" y="${L.rd[1]+44}" class="t-xs">left</text>`;
    s+=`<rect x="${L.rd[0]}" y="${L.rd[1]+52}" width="70" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="${L.rd[0]}" y="${L.rd[1]+52}" width="${f1(70*nEff)}" height="5" rx="2.5" style="fill:var(--amber)"/>`;
    // box diagram
    s+=`<g transform="translate(${L.bx[0]} ${L.bx[1]})">`+ciBoxes({act:A,em,bem,t,dbs,drugs})+
      `<text x="164" y="316" class="t-sm">RATE MODEL · SCHEMATIC</text>`+
      `<path d="M164 334 h30" style="stroke:var(--good);stroke-width:4"/><path d="M194 329 l8 5 l-8 5 z" style="fill:var(--good)"/><text x="210" y="338" class="t-xs">excitatory (glutamate)</text>`+
      `<path d="M164 354 h34" style="stroke:var(--bad);stroke-width:4"/><path d="M199 347 v14" style="stroke:var(--bad);stroke-width:3.4"/><text x="210" y="358" class="t-xs">inhibitory (GABA)</text>`+
      `<path d="M164 374 h30" style="stroke:var(--amber);stroke-width:4"/><circle cx="197" cy="374" r="4" style="fill:var(--amber)"/><text x="210" y="378" class="t-xs">dopamine (+ D1, − D2)</text>`+
      `<text x="164" y="396" class="t-xs">width = activity · bar = firing</text></g>`;
    svg.innerHTML=s;
    setSt(p);
    $('#ciNote').innerHTML=noteHTML(CI_STEPS[p])+(dbs?CI_DBS:'')+(drugs?CI_DRUGS:'');
    const g=ciGo(A);
    $('#ciRead').innerHTML=`Neurons left <b>${pct}%</b> · Go signal <b>${g>.55?'easy':g>.3?'harder':'hard'}</b> · STN <b>${A.stn>.68?'overactive':'normal'}</b>`;
    $('#ciCap').innerHTML=`${pd?`Parkinson's mode: ${Math.round(nU*100)}% of nigral neurons left, applied at every step.`:'Healthy mode: step 6 removes neurons down to the "neurons left" value.'} Schematic: arrow width shows relative activity in the rate model, not measured firing. Neurons fade in the order Fearnley and Lees reported, lateral ventral tier first (91% lost on average, against 71% medial ventral and 56% dorsal) [[Fearnley1991]], and striatal terminals fade ahead of the cell bodies [[Cheng2010]].`;
  }
  const stop=playWire(rg,$('#ciPlay'),draw,20000,'Replay','circuit');
  const setSt=stepWire($('#ciSteps'),CI_STEPS,rg,draw,stop);
  const setPd=v=>{pd=v;$('#ciHealthy').setAttribute('aria-pressed',!v);$('#ciPD').setAttribute('aria-pressed',v)};
  const nText=()=>nr.setAttribute('aria-valuetext',`${nr.value}% of nigral dopamine neurons left`);
  $('#ciHealthy').onclick=()=>{setPd(false);draw(+rg.value)};
  $('#ciPD').onclick=()=>{setPd(true);if(+nr.value>=95){nr.value=20;nText()}draw(+rg.value)};
  nr.addEventListener('input',()=>{setPd(true);nText();draw(+rg.value)});
  $('#ciDbs').onclick=()=>{dbs=!dbs;$('#ciDbs').setAttribute('aria-pressed',dbs);draw(+rg.value)};
  $('#ciDrugs').onclick=()=>{drugs=!drugs;$('#ciDrugs').setAttribute('aria-pressed',drugs);draw(+rg.value)};
  nText();draw(+rg.value);

  /* ---- 2. the dopamine reserve ---- */
  const rs=$('#ciRes'),rr=$('#ciResT');let est=false,b80=false;
  const fT=ciMono(CI_TA),fN=ciMono(CI_NA);
  const PUT='M20 6 C52 -2 80 34 78 74 C76 110 52 128 26 122 C6 112 2 52 20 6 Z';
  const PT=(()=>{const R=rng(77),o=[];while(o.length<44){const x=6+R()*70,y=4+R()*118;if(((x-41)/31)**2+((y-64)/56)**2<.82)o.push({x,y,r:R()})}return o})();
  const ORD=CI_SN.map((n,i)=>i).sort((a,b)=>CI_SN[a].rank-CI_SN[b].rank);
  function drawR(t){
    const N=vb(rs,'720 330',est?'400 760':'400 620');
    const C=N?{x0:46,x1:386,y0:40,y1:320,key:[14,364,14],est:[14,424,372],pic:[14,est?572:428],pw:372}
             :{x0:56,x1:526,y0:34,y1:290,key:[64,0,0],est:[296,166,230],pic:[556,22],pw:156};
    const Y=lerp(-8,12,t),X=y=>lerp(C.x0,C.x1,(y+8)/20),V=v=>lerp(C.y1,C.y0,v/100);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<rect x="${f1(X(-5))}" y="${C.y0}" width="${f1(X(0)-X(-5))}" height="${C.y1-C.y0}" style="fill:var(--amber-soft);opacity:.55"/>`;
    [0,25,50,75,100].forEach(v=>{s+=`<path d="M${C.x0} ${f1(V(v))} H${C.x1}" class="grid"/><text x="${C.x0-6}" y="${f1(V(v)+3.5)}" class="t-xs t-end">${v}%</text>`});
    for(let y=-8;y<=12;y+=2)s+=`<text x="${f1(X(y))}" y="${C.y1+15}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y===0?'0':y>0?'+'+y:'−'+(-y)}</text>`;
    s+=`<text x="${f1((C.x0+C.x1)/2)}" y="${C.y1+30}" class="t-xs t-mid">years from diagnosis (0)</text><text x="${C.x0}" y="${C.y0-14}" class="t-sm">% LOST</text>`;
    s+=`<path d="M${C.x0} ${C.y1} H${C.x1}" class="axis"/><path d="M${f1(X(0))} ${C.y0} V${C.y1}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(-2.5))}" y="${f1(V(N?62:66))}" class="t-xs t-mid" style="fill:var(--amber);font-weight:700;paint-order:stroke;stroke:var(--field);stroke-width:4px">~5 years</text><text x="${f1(X(-2.5))}" y="${f1(V(N?62:66)+12)}" class="t-xs t-mid" style="fill:var(--amber);paint-order:stroke;stroke:var(--field);stroke-width:4px">presymptomatic</text>`;
    // normal ageing, 4.7% per decade
    s+=`<path d="M${f1(X(-8))} ${f1(V(0))} L${f1(X(12))} ${f1(V(9.4))}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:2 3;fill:none"/><text x="${f1(X(12)-2)}" y="${f1(V(9.4)-6)}" class="t-xs t-end">normal ageing</text>`;
    const cur=(f,col,lbl,ly)=>{s+=`<path d="${pathFn(u=>f(lerp(-8,12,u))/100,C.x0,C.x1,C.y1,C.y0,160)}" style="fill:none;stroke:${col};stroke-width:3;stroke-linejoin:round"/>`;
      s+=`<text x="${f1(C.x1-2)}" y="${f1(ly)}" class="t-xs t-end" style="fill:${col};font-weight:700">${lbl}</text>`};
    cur(fT,'var(--amber)','putamen dopamine terminals',V(99)+14);
    cur(fN,'var(--sage)','nigral neurons (melanized)',V(fN(12))-8);
    if(b80){s+=`<path d="M${C.x0} ${f1(V(80))} H${C.x1}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:7 5"/><text x="${f1(C.x1-2)}" y="${f1(V(80)-5)}" class="t-xs t-end" style="fill:var(--bad)">the often-quoted 80% (Bernheimer 1973)</text>`}
    // onset markers, with a lettered key
    const MK=[['a',55,'var(--amber)','terminals 50–60%',1],['b',68,'var(--sage)','lateral ventral tier 68%',0],['c',48,'var(--sage)','caudal nigra 48% (raw)',0],['d',30,'var(--sage)','neurons ~30% (age-adjusted)',1]];
    s+=`<path d="M${f1(X(0))} ${f1(V(50))} V${f1(V(60))}" style="stroke:var(--amber);stroke-width:7;opacity:.4;stroke-linecap:round"/>`;
    MK.forEach(([l,v,c,txt,fill],i)=>{const x=X(0),y=V(v),ky=N?C.key[1]+i*C.key[2]:V(96-i*7)+3.5;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:${fill?c:'var(--field)'};stroke:${c};stroke-width:2"/><text x="${f1(x+8)}" y="${f1(y+3.5)}" class="t-xs" style="fill:${c};font-weight:700">${l}</text>`;
      s+=`<text x="${C.key[0]}" y="${f1(ky)}" class="t-xs" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:4px;stroke-linejoin:round"><tspan style="fill:${c};font-weight:700">${l}</tspan>  ${txt}${N?'':''}</text>`});
    if(N)s+=`<text x="${C.key[0]+200}" y="${C.key[1]}" class="t-xs" style="fill:var(--ink)">at diagnosis, from</text><text x="${C.key[0]+200}" y="${C.key[1]+14}" class="t-xs" style="fill:var(--ink)">a, d: Cheng 2010</text><text x="${C.key[0]+200}" y="${C.key[1]+28}" class="t-xs" style="fill:var(--ink)">b, c: Fearnley 1991</text>`;
    // cursor
    const tv=fT(Y),nv=fN(Y);
    s+=`<path d="M${f1(X(Y))} ${C.y0} V${C.y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.55"/><circle cx="${f1(X(Y))}" cy="${f1(V(tv))}" r="5.5" style="fill:var(--amber);stroke:var(--panel);stroke-width:2"/><circle cx="${f1(X(Y))}" cy="${f1(V(nv))}" r="5.5" style="fill:var(--sage);stroke:var(--panel);stroke-width:2"/>`;
    // other estimates at onset (the reanalyses in Cheng 2010)
    if(est){const [ex,ey,ew]=C.est,lw=N?190:140,bw=ew-lw-40;
      s+=`<rect x="${ex}" y="${ey}" width="${ew}" height="${16+CI_EST.length*13+8}" rx="8" style="fill:var(--panel);stroke:var(--line);opacity:.97"/><text x="${ex+8}" y="${ey+14}" class="t-xs" style="fill:var(--ink);font-weight:700">OTHER ESTIMATES OF LOSS AT ONSET</text>`;
      CI_EST.forEach(([l,lo,hi,k],i)=>{const y=ey+30+i*13,bx=ex+lw,c=k==='n'?'var(--sage)':'var(--amber)';
        s+=`<text x="${ex+8}" y="${y}" class="t-xs" style="font-size:9px">${l}</text><rect x="${bx}" y="${y-6}" width="${f1(bw)}" height="5" rx="2.5" style="fill:var(--panel-2)"/>`;
        s+=lo===hi?`<rect x="${bx}" y="${y-6}" width="${f1(bw*lo/100)}" height="5" rx="2.5" style="fill:${c}"/>`:`<rect x="${f1(bx+bw*lo/100)}" y="${y-7}" width="${f1(bw*(hi-lo)/100)}" height="7" rx="3" style="fill:${c}"/>`;
        s+=`<text x="${f1(ex+ew-6)}" y="${y}" class="t-xs t-end" style="fill:var(--ink);font-size:9px">${lo===hi?lo:lo+'–'+hi}%</text>`})}
    // what the chosen year looks like
    const [px,py]=C.pic,pw=C.pw,G=N?{cols:6,sp:30,ox:16,oy:40,rs:32,nl:110,pu:[232,6,.9],pl:[312,58,'']}:{cols:4,sp:34,ox:16,oy:44,rs:30,nl:142,pu:[50,152,.68],pl:[78,256,' t-mid']};
    s+=`<g transform="translate(${px} ${py})"><text x="0" y="12" class="t-sm">${Math.abs(Y)<.25?'AT DIAGNOSIS':Y<0?'YEAR '+f1(Y).replace('-','−'):'YEAR +'+f1(Y)}</text>`;
    const dN=nv/100*12;
    ORD.forEach((idx,i)=>{const x=G.ox+(i%G.cols)*G.sp,y=G.oy+Math.floor(i/G.cols)*G.rs,dead=clamp(dN-i);
      if(dead<1)s+=neuron(x,y,8,1-dead*.75,{axon:-Math.PI/2,axonLen:0,dendrites:4,pig:1-dead,seed:CI_SN[idx].seed,col:'var(--sage)'});
      if(dead>0)s+=`<circle cx="${x}" cy="${y}" r="8" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(dead)}"/>`});
    s+=`<text x="0" y="${G.nl}" class="t-xs" style="fill:var(--sage);font-weight:700">nigral neurons</text>`;
    s+=`<g transform="translate(${G.pu[0]} ${G.pu[1]}) scale(${G.pu[2]})"><path d="${PUT}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/>`;
    PT.forEach(d=>{const o=clamp((d.r-tv/100)*8);if(o>0)s+=`<circle cx="${f1(d.x)}" cy="${f1(d.y)}" r="2.4" style="fill:var(--amber);opacity:${f1(o)}"/>`});
    s+=`</g><text x="${G.pl[0]}" y="${G.pl[1]}" class="t-xs${G.pl[2]}" style="fill:var(--amber);font-weight:700">putamen</text><text x="${G.pl[0]}" y="${G.pl[1]+12}" class="t-xs${G.pl[2]}" style="fill:var(--amber);font-weight:700">terminals</text>`;
    const sy=N?132:278,sw=N?pw:146,sg=Y>=0;
    s+=`<rect x="0" y="${sy}" width="${sw}" height="24" rx="12" style="fill:${sg?'var(--warn-soft)':'var(--good-soft)'}"/><text x="${sw/2}" y="${sy+16}" class="t-xs t-mid" style="fill:${sg?'var(--warn)':'var(--good)'};font-weight:700">${sg?'motor signs present':'no motor signs yet'}</text></g>`;
    rs.innerHTML=s;
    const p=phaseOf(CI_RES,t);setRs(p);$('#ciResNote').innerHTML=noteHTML(CI_RES[p]);
    rr.setAttribute('aria-valuetext',`${Math.abs(Y)<.25?'At diagnosis':Y<0?f1(-Y)+' years before diagnosis':f1(Y)+' years after diagnosis'}: ${CI_RES[p].t}`);
    $('#ciResCap').innerHTML=`Schematic curves drawn through cited anchor points and interpolated between them: about 30% of neurons and 50–60% of terminals lost at diagnosis [[Cheng2010]]; dorsal putamen terminals virtually gone by year 4 and 30–60% of melanized neurons lost over the first several years [[Kordower2013]]; a presymptomatic phase of about 5 years, onset figures b and c, and normal ageing at 4.7% per decade [[Fearnley1991]].${est?' Other estimates are the reanalyses collected by Cheng and colleagues; imaging gives 20–50% putaminal loss with F-dopa PET and 50–70% with DAT and VMAT2 ligands. [[Cheng2010]]':''}${b80?' The 80% line is the figure Cheng and colleagues argue is weakly supported. [[Cheng2010]]':''}`;
  }
  const stopR=playWire(rr,$('#ciResPlay'),drawR,16000,'Replay','circuit');
  const setRs=stepWire($('#ciResSteps'),CI_RES,rr,drawR,stopR);
  $('#ciResEst').onclick=()=>{est=!est;$('#ciResEst').setAttribute('aria-pressed',est);drawR(+rr.value)};
  $('#ciRes80').onclick=()=>{b80=!b80;$('#ciRes80').setAttribute('aria-pressed',b80);drawR(+rr.value)};
  const prev=redraws.circuit;redraws.circuit=()=>{prev&&prev();drawR(+rr.value)};
  drawR(+rr.value);

  /* ---- 3. cards ---- */
  $('#ciCards').innerHTML=`
   <div class="card"><span class="ev est">Established</span><h4>Pigmented neurons are the vulnerable ones</h4><p>Pigmented nigral neurons fell by 66% in Parkinson's, non-pigmented neighbours by 24%. [[Pakkenberg1991]] Across midbrain dopamine groups, how much a group lost tracked its share of pigmented cells (r = 0.97). [[Hirsch1988]] Iron in the Parkinson's nigra was 31–35% higher than in controls, which the authors suggested may promote toxic oxygen radicals. [[Dexter1989]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>A drug that copied the lesion</h4><p>In 1983, four people who injected an illicit pethidine (meperidine) analogue preparation containing MPTP developed marked, lasting parkinsonism; the authors proposed that MPTP selectively damages nigral cells. [[Langston1983]] MPTP-treated monkeys later supplied the firing-rate data behind the box-and-arrow model. [[Galvan2008,DeLong1990]]</p></div>
   <div class="card"><span class="ev early">Debated</span><h4>The paradox of surgery</h4><p>If the model were the whole story, lesioning the globus pallidus or motor thalamus should worsen slowness. Instead such lesions improve rigidity and tremor, apparently without worsening bradykinesia, and do not regularly cause dyskinesia. Marsden and Obeso concluded that the basal ganglia motor circuits are part of a distributed system that can work, imperfectly, without this feedback loop. They proposed that a pause in GPi/SNr firing permits a movement, while increases mainly suppress unwanted ones. [[Marsden1994]]</p></div>
   <div class="card"><span class="ev early">Debated</span><h4>More holes in the rate model</h4><p>Global rises or falls in GPi activity from local drug injections do not necessarily produce parkinsonism or involuntary movements. GPe and VA/VL lesions, which the model predicts should cause parkinsonism, do not do so consistently. Galvan and Wichmann wrote that it seems "increasingly doubtful" that firing-rate changes or bursting are strongly pro-parkinsonian. [[Galvan2008]]</p></div>
   <div class="card"><span class="ev early">Lead suspect</span><h4>The beta rhythm, 13–30 Hz</h4><p>Synchronised oscillations are now the "lead suspect". [[Galvan2008]] Recorded off medication after surgery, activity between GPi and STN was dominated by frequencies below 30 Hz; levodopa reduced it and produced a new peak near 70 Hz. [[Brown2001]] Exaggerated beta synchrony is associated with bradykinesia, and STN stimulation kept beta low for 12 s after it stopped. [[Kuhn2008]] Whether treatment helps because it lowers beta, or the two only go together, is not known. [[Galvan2008]] See <a href="#dbs" data-go="dbs">Deep-brain stimulation</a>.</p></div>
   <div class="card"><span class="ev est">Established</span><h4>Not only dopamine</h4><p>In 19 cases, neuron loss was greatest in the locus coeruleus (noradrenaline), then the substantia nigra, then the nucleus basalis (acetylcholine). [[Zarow2003]] Serotonin markers fell less than dopamine, by 30–66%. [[Kish2008]] People with falls had lower cortical and thalamic cholinergic activity, while nigrostriatal dopamine did not differ from non-fallers. [[Bohnen2009]] See <a href="#nonmotor" data-go="nonmotor">Beyond movement</a>.</p></div>
   <div class="card"><span class="tag">History</span><h4>Where the dopamine idea began</h4><p>In 1960 Ehringer and Hornykiewicz first reported dopamine deficiency in the striatum in Parkinson's. The German original has no abstract and was not read for this guide, so no figures from it are given here. [[Ehringer1960]] See <a href="#history" data-go="history">History and people</a>.</p></div>`;
};
