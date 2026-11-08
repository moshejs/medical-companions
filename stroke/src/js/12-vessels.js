/* =============== 1.2 The brain's blood supply =============== */
/* Widgets: the artery explorer (main scrubber, left or right brain), the circle of Willis with a block and anatomy
   toggle (a reachability model computed here, labelled schematic), the variant icon arrays, and the lateral medulla. */
const VS_SUP=[ [0,112],[30,82],[66,56],[106,38],[150,30],[196,34],[228,46],[250,58],[236,94],[204,95],[190,110],[170,120],[146,128],[120,136],[100,145],[60,160],[0,150] ];
const VS_INF=[ [100,145],[120,136],[146,128],[170,120],[190,110],[204,95],[236,94],[224,128],[192,150],[150,168],[116,196],[60,220],[60,160] ];
const VS_SIDE={L:{title:'Left hemisphere blocked',sub:'Deficits on the person\'s right side',view:'Left hemisphere, seen from the left',body:'R'},
  R:{title:'Right hemisphere blocked',sub:'Deficits on the person\'s left side',view:'Right hemisphere, seen from the right',body:'L'}};
const VS_STEPS=[
 {id:'aca',from:0,at:.1,t:'Anterior cerebral (ACA)',k:'Anterior circulation · medial surface',shade:{aca:1},terr:'aca',body:{f:0,a:.42,l:1},words:['face: none listed','arm: less','leg: most'],field:'none',mark:[58,52,'ACA'],
  tagL:['If left: mutism, transcortical motor aphasia,','leg-predominant hemiparesis'],tagR:['If right: acute confusional state,','motor hemineglect, hemiparesis'],
  txt:`Entire ACA: contralateral hemiplegia, abulia, incontinence, transcortical motor aphasia and limb dyspraxia. Distal ACA: weakness of leg, hip, foot and shoulder with sensory loss in the foot [[Lo2025]]. In 100 Korean patients with ACA infarction, motor deficit occurred in 91, hypobulia or apathy in 43, urinary incontinence in 30 and grasp reflex in 25 [[Kang2008]].`,
  L:`Left-sided lesions in 48 people gave mutism, transcortical motor aphasia and leg-predominant hemiparesis [[Kumral2002]].`,
  R:`Right-sided lesions in 48 people gave acute confusional state, motor hemineglect and hemiparesis [[Kumral2002]].`,
  extra:`Bilateral lesions gave akinetic mutism and severe sphincter dysfunction [[Kumral2002]]. Most of this territory lies on the inner surface, so the side view shows only its upper rim.`,
  hook:`A patient with leg-predominant weakness and abulia points to the ACA [[Stebner2025]].`},
 {id:'sup',from:.167,at:.27,t:'MCA superior division',k:'Anterior circulation · frontal and upper parietal',terr:'sup',wash:VS_SUP,occl:'sup',body:{f:1,a:1,l:.3},words:['face: marked','arm: marked','leg: less'],field:'none',mark:[92,76,'MCA sup'],
  tagL:['If left: Broca aphasia.','Also gaze palsy and neglect'],tagR:['If right: no aphasia is listed.','Gaze palsy and neglect'],
  txt:`Superior division: hemiplegia, hemisensory loss, gaze palsy and neglect [[Lo2025]]. By segment, M2 superior gives face and arm sensorimotor loss [[Stebner2025]].`,
  L:`Broca aphasia is listed if the lesion is on the left [[Lo2025,Stebner2025]].`,
  R:`The source lists Broca aphasia only for left-sided lesions, so it does not appear on this side [[Lo2025]].`,
  extra:`The artery has segments M1 to M4, and the whole MCA is the artery most often involved [[Benjamin2026MCA]].`,
  pt:`Blockage here often means a weak face and arm on the other side. On the left, finding and saying words can be hard [[Lo2025]].`},
 {id:'inf',from:.334,at:.43,t:'MCA inferior division',k:'Anterior circulation · temporal and lower parietal',terr:'inf',wash:VS_INF,occl:'inf',body:{f:0,a:0,l:0},words:['face: none listed','arm: none listed','leg: none listed'],field:'quad',mark:[170,150,'MCA inf'],
  tagL:['If left: Wernicke aphasia'],tagR:['If right: constructional dyspraxia,','hemineglect if non-dominant'],
  txt:`Inferior division: hemianopsia or upper quadrantanopsia [[Lo2025]]. By segment, M2 inferior gives superior quadrantanopia [[Stebner2025]]. These sources list no limb weakness for this division.`,
  L:`Wernicke aphasia is listed if the lesion is on the left [[Lo2025,Stebner2025]].`,
  R:`Constructional dyspraxia is listed if the lesion is on the right [[Lo2025]], and hemineglect if the side is non-dominant [[Stebner2025]].`,
  extra:'',
  hook:`Superior division: Broca. Inferior division: Wernicke [[Lo2025,Stebner2025]].`},
 {id:'pca',from:.5,at:.6,t:'Posterior cerebral (PCA)',k:'Posterior circulation · occipital lobe and thalamus',shade:{pca:1},terr:'pca',body:{f:0,a:0,l:0},words:['face: none listed','arm: none listed','leg: none listed'],field:'hemi',mark:[262,120,'PCA'],
  tagL:['Vision comes first: hemianopia, alexia,','prosopagnosia, memory deficits'],tagR:['Vision comes first: hemianopia, alexia,','prosopagnosia, memory deficits'],
  txt:`Superficial PCA: cortical blindness, homonymous or altitudinal hemianopia, quadrantanopsia, colour vision loss, visual agnosia, pure alexia, prosopagnosia and memory deficits [[Lo2025]]. In 79 people with PCA infarcts, visual abnormality occurred in 84% [[Yamamoto1999]].`,
  L:`The sources used here do not split this list by side.`,R:`The sources used here do not split this list by side.`,
  extra:`Deep, at P1: ipsilateral third nerve palsy with contralateral hemiplegia and thalamic deficits. P2 and P3 can give Anton syndrome [[Stebner2025]]. The field disc draws the hemianopia on the side opposite the lesion.`,
  pt:`This artery feeds the part of the brain that sees. A person may lose one half of what they see in both eyes [[Lo2025]].`},
 {id:'bas',from:.667,at:.76,t:'Basilar artery',k:'Posterior circulation · brainstem, cerebellum, both PCAs',shade:{pca:.9,cerebellum:1,brainstem:1},terr:'bas',both:1,body:{f:1,a:1,l:1},words:['face: both sides','arm: both sides','leg: both sides'],field:'vary',mark:[238,200,'brainstem, cerebellum'],
  tagL:['Midline artery: the side toggle does not apply.','Coma or locked-in state are listed'],tagR:['Midline artery: the side toggle does not apply.','Coma or locked-in state are listed'],
  txt:`Basilar occlusion: often preceding TIAs, headaches, dizziness, confusion, cranial nerve palsies, quadriparesis, locked-in state and coma [[Lo2025]]. Hallmarks are decreased consciousness, quadriparesis, pupillary and oculomotor abnormalities, dysarthria and dysphagia, with prodromal vertigo or headache [[Mattle2011]]. In BASICS (592 people), poor outcome occurred in 68% [[Schonewille2009]].`,
  L:'',R:'',extra:`Top of the basilar: abnormal pupils, abnormal vertical eye movements, hypersomnolence, confusion, hallucinations, memory loss and visual defects [[Lo2025]]. The brainstem and cerebellum lie below this axial slice. Only the PCA part shows on it.`,
  hook:`Locked-in syndrome spares vertical eye movement and blinking [[Das2023]].`},
 {id:'len',from:.834,at:.93,t:'Lenticulostriate branches',k:'Small deep arteries from the M1 segment',terr:'len',vessels:1,body:{f:1,a:1,l:1},words:['one half of the body','in pure motor stroke',''],field:'none',mark:[108,186,'deep branches leave M1'],
  tagL:['Lacune in the internal capsule.','Sensorimotor type: no cortical signs'],tagR:['Lacune in the internal capsule.','Sensorimotor type: no cortical signs'],
  txt:`Lateral lenticulostriate branches leave the MCA [[Benjamin2026MCA]]. Penetrating arteries measure 400-900 micrometres [[Venkataraman2024]] and are end arteries [[Gore2026]]. Pure motor stroke: lenticulostriates to the posterior limb of the internal capsule. Ataxic hemiparesis: to the corona radiata or posterior limb, leg more than arm. Dysarthria-clumsy hand: to the anterior limb or genu [[Lo2025]].`,
  L:'',R:'',extra:`Sensorimotor stroke has no cortical signs [[Lo2025]]. These arteries run deep, so nothing shows on the side view of the surface. The slice shows them best.`,
  pt:`A very small artery deep in the brain can block. The patch of damage is tiny, but in the internal capsule it can still weaken one side of the body [[Lo2025]].`}];
/* circle of Willis: a graph of segments between junctions, used only to work out what stays connected */
const VS_E={'VA-R':['s','vb'],'VA-L':['s','vb'],basilar:['vb','top'],'ICA-R':['s','tR'],'ICA-L':['s','tL'],'M1-R':['tR','mR'],'M1-L':['tL','mL'],'A1-R':['tR','aR'],'A1-L':['tL','aL'],ACom:['aR','aL'],'A2-R':['aR','a2R'],'A2-L':['aL','a2L'],'PCom-R':['tR','pR'],'PCom-L':['tL','pL'],'P1-R':['top','pR'],'P1-L':['top','pL'],'P2-R':['pR','p2R'],'P2-L':['pL','p2L']};
const VS_ABS={full:[],noA:['ACom'],noP:['PCom-R','PCom-L'],noAP:['ACom','PCom-R','PCom-L']};
const VS_TER=[{l:'ACA',r:'a2R',e:'a2L'},{l:'MCA',r:'mR',e:'mL'},{l:'PCA',r:'p2R',e:'p2L'}];
const VS_WN={
 none:{t:'No block: the supply as usual',k:'Baseline',txt:`Blood reaches the circle from both internal carotids and the basilar. The communicating arteries are drawn pale here because they are quiet until a pressure difference appears (a simplification).`,pt:`Four arteries in the neck feed a ring at the base of the skull [[Rosner2023]].`},
 'ICA-L':{k:'Left internal carotid',
  full:{t:'Two detours keep the left side fed',txt:`With the left ICA blocked, blood can cross from the right through the anterior communicating artery and run backwards along left A1, and can come forward from the basilar through the left posterior communicating artery. This is the idea behind calling the circle an anastomosis [[Rosner2023]].`},
  noA:{t:'Only the back door remains',txt:`Without an ACom, the left posterior communicating artery has to supply both left ACA and left MCA in this model. An incomplete anterior circle gave a hazard ratio of 2.8 (1.3-6.3) for anterior circulation stroke in people with atherosclerosis [ [vanSeeters2015]].`},
  noP:{t:'Only the front door remains',txt:`This is the commonest pattern in Tromso, seen in 27.8%: both posterior communicating arteries missing [[Hindenes2020]]. In this model, the ACom alone now carries blood to left ACA and left MCA.`},
  noAP:{t:'No detour: left ACA and MCA starve',txt:`With neither connection the left carotid territory is cut off in this model. In people with atherosclerosis, an incomplete anterior circle combined with a one-sided incomplete posterior circle gave a hazard ratio of 7.0 (1.3-38.2) for anterior circulation stroke [ [vanSeeters2015]].`}},
 'A1-L':{k:'Left A1 segment',
  full:{t:'A1 block: often no symptoms',txt:`A1 occlusion is often asymptomatic because of the anterior communicating artery: left A2 fills from the right [[Stebner2025]].`,hook:`A1 occlusion is often asymptomatic, thanks to the ACom [[Stebner2025]].`},
  noP:{t:'A1 block: the ACom still rescues A2',txt:`The posterior communicating arteries are not needed here. Left A2 fills across the ACom from the right [[Stebner2025]].`},
  noA:{t:'A1 block without an ACom',txt:`The reason an A1 block is usually silent has gone, so in this model left A2 is cut off and the ACA territory starves [[Stebner2025]].`},
  noAP:{t:'A1 block without an ACom',txt:`The reason an A1 block is usually silent has gone, so in this model left A2 is cut off and the ACA territory starves [[Stebner2025]].`}},
 'M1-L':{k:'Left M1 segment',all:{t:'The circle cannot help an M1 block',txt:`M1 lies beyond the circle, so no communicating artery can get around the clot. Rescue of this territory depends on collateral vessels over the surface of the brain, one reason people differ so much [[Liebeskind2003,Mangiardi2023,Vagal2018]]. M1 occlusion: contralateral hemiplegia of the face and arm with the leg to a lesser extent, homonymous hemianopia, head and eye deviation to the side of the lesion and global aphasia [[Stebner2025]].`,hook:`The circle protects against blocks before it, not after it.`}},
 basilar:{k:'Basilar artery',
  full:{t:'Carotid blood runs backwards to the PCAs',txt:`Both posterior communicating arteries carry blood back from the carotids to the top of the basilar and the PCAs. In this model the circle does nothing for the brainstem branches below the clot, and basilar occlusion remains severe: poor outcome in 68% in BASICS [[Schonewille2009,Mattle2011]].`},
  noA:{t:'Carotid blood runs backwards to the PCAs',txt:`The ACom is not part of this route. Both posterior communicating arteries carry blood back to the PCAs. Poor outcome occurred in 68% in BASICS [[Schonewille2009]].`},
  noP:{t:'No PComs: both PCAs starve too',txt:`The commonest Tromso pattern, 27.8%, lacked both posterior communicating arteries [[Hindenes2020]]. In this model both PCAs have nothing to fill them when the basilar is blocked.`},
  noAP:{t:'No PComs: both PCAs starve too',txt:`The commonest Tromso pattern, 27.8%, lacked both posterior communicating arteries [[Hindenes2020]]. In this model both PCAs have nothing to fill them when the basilar is blocked.`}}};
const VS_MS=[
 {from:0,at:.08,t:'Trigeminal',n:'Trigeminal nucleus and tract',s:'Same side: face pain and temperature loss',p:[222,105],face:1},
 {from:.167,at:.25,t:'Sympathetics',n:'Descending sympathetic fibres',s:'Same side: Horner syndrome',p:[196,120],eye:1},
 {from:.334,at:.42,t:'N. ambiguus',n:'Nucleus ambiguus',s:'Hoarseness and dysphagia',p:[176,100]},
 {from:.5,at:.58,t:'Peduncle, vestibular',n:'Cerebellar peduncle, vestibular nuclei',s:'Same side: ataxia, vertigo, nystagmus, nausea',p:[208,66]},
 {from:.667,at:.75,t:'Spinothalamic',n:'Spinothalamic tract',s:'Opposite side: body pain and temperature loss',p:[206,152],body:1},
 {from:.834,at:.95,t:'N. solitarius',n:'Nucleus solitarius',s:'Same side: taste loss',p:[168,60]}];
function vsBody(x,y,s,map){const k=s/146,id=kid('vsb');let g=bodyHemi(x,y,s,{labels:true});
  g+=`<g transform="translate(${f1(x)} ${f1(y-23*k)}) scale(${k.toFixed(3)})"><clipPath id="${id}"><path d="${BODY_PATH}"/></clipPath><g clip-path="url(#${id})">`;
  Object.keys(map).forEach(q=>{const x0=q==='R'?-40:0,b=map[q];[ ['f',-60,35],['a',-25,57],['l',32,70]].forEach(([n,yy,h])=>{if(b[n]>0)g+=`<rect x="${x0}" y="${yy}" width="40" height="${h}" style="fill:var(--accent);opacity:${f1(b[n]*.72)}"/>`})});
  return g+`</g><path d="${BODY_PATH}" style="fill:none;stroke:var(--ink);stroke-width:${f1(1.3/k)};stroke-linejoin:round"/></g>`}
function vsField(cx,cy,r,mode,side,a){const sg=side==='L'?1:-1;let g=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.2"/>`;
  if(mode==='hemi'||mode==='quad'){const yb=mode==='quad'?cy:cy+r,xe=cx+sg*r;
    g+=mode==='hemi'?`<path d="M${cx} ${cy-r}A${r} ${r} 0 0 ${sg>0?1:0} ${cx} ${cy+r}Z" style="fill:var(--ink);opacity:${f1(.72*a)}"/>`:`<path d="M${cx} ${cy}V${cy-r}A${r} ${r} 0 0 ${sg>0?1:0} ${xe} ${cy}Z" style="fill:var(--ink);opacity:${f1(.72*a)}"/>`}
  if(mode==='vary')g+=`<circle cx="${cx}" cy="${cy}" r="${r-7}" style="fill:none;stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 4;opacity:${f1(a)}"/>`;
  g+=`<line x1="${cx}" x2="${cx}" y1="${cy-r}" y2="${cy+r}" style="stroke:var(--ink);stroke-width:.8;stroke-dasharray:2 3"/>`;
  g+=`<text x="${cx-r+2}" y="${cy+r+13}" class="t-xs">right</text><text x="${cx+r-2}" y="${cy+r+13}" class="t-xs t-end">left</text>`;
  const cap={none:'field: no loss listed',hemi:'field: half lost',quad:'field: upper quarter',vary:'field: defects vary'}[mode];
  return g+`<text x="${cx}" y="${cy-r-6}" class="t-xs t-mid">${cap}</text>`}
inits.vessels=()=>{
  /* ---------- explorer ---------- */
  const svg=$('#vsSvg'),rg=$('#vsT');let side='L',setSt=()=>{},stop=()=>{};
  function draw(t){const N=vb(svg,'720 340','400 656'),p=phaseOf(VS_STEPS,t),A=VS_STEPS[p],nx=p<VS_STEPS.length-1?VS_STEPS[p+1].from:1,w=ease(ramp(t,A.from+.005,lerp(A.from,nx,.42))),S=VS_SIDE[side],G=bsGeom(),AG=axGeom();
    const L=N?{sx:65,sy:42,ss:.9,sc:286,ax:8,ay:298,as:.72,ac:526,bx:300,by:412,bs:172,wx:216,wy:0,fx:338,fy:592,fr:38,tx:8,ty:560,rx:8,ry:542,inl:1}:{sx:6,sy:46,ss:.8,sc:262,ax:258,ay:42,as:.72,ac:272,bx:525,by:150,bs:188,fx:654,fy:190,fr:40,tx:8,ty:298,rx:596,ry:62};
    const hemi=side==='L'?1:0,bodySide=A.both?'L':S.body;let g='';
    g+=`<text x="8" y="19" class="t-big">${A.t}</text><text x="8" y="35" class="t-xs">${A.both?'Midline artery: both sides can be affected':S.sub}</text>`;
    /* side view, mirrored for the right hemisphere */
    const sw=300*L.ss,mir=side==='R',wrapA=mir?`<g transform="translate(${f1(2*L.sx+sw)} 0) scale(-1 1)">`:'<g>';
    const vess=A.occl?{occl:A.occl,ph:t*40,flow:1}:A.vessels?{ph:t*40,flow:1,op:.8}:null;
    g+=wrapA+brainSide(L.sx,L.sy,L.ss,{shade:A.shade?Object.fromEntries(Object.entries(A.shade).map(([k,v])=>[k,v*w])):{},vessels:vess,id:'vs'}).svg;
    const cid=kid('vsc');g+=`<g transform="translate(${f1(L.sx)} ${f1(L.sy)}) scale(${L.ss})"><clipPath id="${cid}"><path d="${G.cer}"/></clipPath><g clip-path="url(#${cid})">`;
    if(A.wash)g+=`<path d="${ptsD(A.wash)}Z" style="fill:var(--mca);opacity:${f1(w*.55)}"/>`;
    g+=`<path d="${G.aca}" data-va="aca" class="clk" style="fill:transparent"/><path d="${ptsD(VS_SUP)}Z" data-va="sup" class="clk" style="fill:transparent"/><path d="${ptsD(VS_INF)}Z" data-va="inf" class="clk" style="fill:transparent"/><path d="${G.pca}" data-va="pca" class="clk" style="fill:transparent"/></g>`;
    g+=`<path d="${G.cb}" data-va="bas" class="clk" style="fill:transparent"/><path d="${G.stem}" data-va="bas" class="clk" style="fill:transparent"/></g></g>`;
    /* the name on the territory, never mirrored text */
    const mkx=mir?L.sx+sw-A.mark[0]*L.ss:L.sx+A.mark[0]*L.ss,mky=L.sy+A.mark[1]*L.ss;
    g+=`<g style="opacity:${f1(w)}">`+kitLabel(clamp(mkx,L.sx+40,L.sx+sw-40),mky,A.mark[2],{a:'m'})+'</g>';
    g+=`<text x="${f1(L.sx+sw/2)}" y="${L.sc}" class="t-xs t-mid">${S.view}</text>`;
    /* axial slice */
    const ax=brainAxial(L.ax,L.ay,L.as,{orient:true,terr:A.terr==='aca'?{aca:w,side}:A.terr==='pca'?{pca:w,side}:A.terr==='bas'?{pca:w*.9,side:'both'}:null});
    g+=ax.svg;
    const axc=kid('vsa'),H=hemi?AG.R:AG.L;
    g+=`<g transform="translate(${f1(L.ax)} ${f1(L.ay)}) scale(${L.as})"><defs><clipPath id="${axc}"><path d="${H.o}"/></clipPath><clipPath id="${axc}m"><path d="${AG.terr.mca[hemi]}"/></clipPath></defs>`;
    if(A.terr==='sup'||A.terr==='inf')g+=`<g clip-path="url(#${axc})"><g clip-path="url(#${axc}m)"><rect x="0" y="${A.terr==='sup'?0:142}" width="240" height="${A.terr==='sup'?142:158}" style="fill:var(--mca);opacity:${f1(w*.6)}"/></g></g>`;
    if(A.terr==='len'){g+=`<path d="${AG.lent[hemi]}" style="fill:var(--mca);opacity:${f1(w*.62)}"/><path d="${AG.ic[hemi]}" style="fill:var(--mca);opacity:${f1(w*.62)}"/><path d="${blob(120+(hemi?1:-1)*31,172,7*w+.1,4,{n:10,rough:.16})}" style="fill:var(--core);opacity:${f1(w)}"/>`}
    [0,1].forEach(i=>{const X=i?AG.R:AG.L;g+=`<g data-vh="${i?'L':'R'}"><path d="${X.o}" data-vt="mca" class="clk" style="fill:transparent"/><path d="${AG.terr.aca[i]}" data-vt="aca" class="clk" style="fill:transparent;clip-path:ellipse(103px 133px at 120px 150px)"/><path d="${AG.terr.pca[i]}" data-vt="pca" class="clk" style="fill:transparent;clip-path:ellipse(103px 133px at 120px 150px)"/><path d="${AG.lent[i]}" data-vt="len" class="clk" style="fill:transparent"/><path d="${AG.ic[i]}" data-vt="len" class="clk" style="fill:transparent"/></g>`});
    g+='</g>';
    g+=`<text x="${f1(L.ax+86)}" y="${L.ac}" class="t-xs t-mid">Axial slice, basal ganglia level</text>`;
    /* body */
    const bw={f:A.body.f*w,a:A.body.a*w,l:A.body.l*w};g+=vsBody(L.bx,L.by,L.bs,A.both?{L:bw,R:bw}:{[bodySide]:bw});
    /* words: what the wash means, always spelled out */
    if(N){A.words.forEach((u,i)=>{if(u)g+=`<text x="${L.rx}" y="${L.ry+i*14}" class="t-sm" style="fill:var(--ink)">${u}</text>`})}
    else{g+=`<text x="${L.rx}" y="${L.ry-14}" class="t-xs" style="letter-spacing:.08em">BODY WASH</text>`;A.words.forEach((u,i)=>{if(u)g+=`<text x="${L.rx}" y="${L.ry+i*15}" class="t-xs" style="fill:var(--ink)">${u}</text>`})}
    g+=vsField(L.fx,L.fy,L.fr,A.field,bodySide,w);
    /* the side-specific line */
    const tag=A[side==='L'?'tagL':'tagR'];
    tag.forEach((u,i)=>{g+=`<text x="${L.tx}" y="${(N?L.ry+50:L.ty)+i*16}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(w)}">${u}</text>`});
    svg.innerHTML=g;
    const sl=A[side];$('#vsNote').innerHTML=noteHTML({k:A.k,t:A.t,txt:[A.txt,sl,A.extra].filter(Boolean).join(' '),pt:A.pt,hook:A.hook});setSt(p)}
  stop=playWire(rg,$('#vsPlay'),draw,30000,'%t:player.replay%','vessels');
  setSt=stepWire($('#vsSteps'),VS_STEPS,rg,draw,stop);
  const goTo=id=>{const s=VS_STEPS.find(a=>a.id===id);if(!s)return;stop();rg.value=s.at;draw(s.at)};
  svg.addEventListener('click',e=>{const a=e.target.closest('[data-va]');if(a){goTo(a.dataset.va);return}
    const b=e.target.closest('[data-vt]');if(!b)return;const h=b.parentNode.dataset.vh;if(h&&h!==side)setSide(h);let id=b.dataset.vt;
    if(id==='mca')id=VS_STEPS[phaseOf(VS_STEPS,+rg.value)].id==='inf'?'inf':'sup';goTo(id)});
  function setSide(v){side=v;$$('[data-vsside]').forEach(c=>c.setAttribute('aria-pressed',c.dataset.vsside===v))}
  $$('[data-vsside]').forEach(b=>b.addEventListener('click',()=>{stop();setSide(b.dataset.vsside);draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- circle of Willis ---------- */
  const ws=$('#vsW'),wr=$('#vsWT');let bk='ICA-L',va='full';
  function reach(block,abs){const open=Object.keys(VS_E).filter(n=>n!==block&&!abs.includes(n)),seen=new Set(['s']);let ch=true;
    while(ch){ch=false;open.forEach(n=>{const [a,b]=VS_E[n];if(seen.has(a)!==seen.has(b)){seen.add(a);seen.add(b);ch=true}})}return seen}
  function collat(){const abs=VS_ABS[va],A=!abs.includes('ACom'),Pc=!abs.includes('PCom-L');const act=[],rev={};
    if(bk==='ICA-L'){if(A){act.push('ACom');rev['A1-L']=true}if(Pc){act.push('PCom-L');rev['PCom-L']=true}}
    if(bk==='A1-L'&&A)act.push('ACom');
    if(bk==='basilar'&&Pc){act.push('PCom-R','PCom-L');rev['P1-R']=true;rev['P1-L']=true}
    return {act,rev}}
  function drawW(t){const N=vb(ws,'720 330','400 560'),L=N?{wx:9,wy:6,ws:1.27,rx:10,ry:366,ax:274,ay:356,as:.5}:{wx:6,wy:4,ws:1.22,rx:392,ry:40,ax:592,ay:26,as:.5};
    const abs=VS_ABS[va],c=ease(ramp(t,.08,.4)),o=ease(ramp(t,.35,.7)),block=bk==='none'?null:bk,R=reach(block,abs),col=collat();
    const dim={},bl={};if(block)bl[block]=c;
    Object.keys(VS_E).forEach(n=>{const [a,b]=VS_E[n];if(abs.includes(n))dim[n]=1;else if(!R.has(a)||!R.has(b))dim[n]=Math.max(c,0);});
    ['ACom','PCom-R','PCom-L'].forEach(n=>{if(!abs.includes(n)&&!col.act.includes(n)&&dim[n]===undefined)dim[n]=.55;else if(col.act.includes(n))dim[n]=.55*(1-o)});
    const rev={};if(o>.5)Object.assign(rev,col.rev);
    const W=willis(L.wx,L.wy,L.ws,{block:bl,dim,flow:1,ph:t*14,rev,hl:o>.3?col.act:[],labels:true});let g=W.svg;
    abs.forEach(n=>{const q=W.at[n];g+=kitLabel(q[0]+(n==='PCom-R'?9:n==='PCom-L'?-9:0),q[1]+(n==='ACom'?24:14),'absent',{a:'m'})});
    /* territory table */
    const cw=N?78:72,cx=L.rx+44;g+=`<text x="${cx+cw/2}" y="${L.ry-18}" class="t-xs t-mid">their right</text><text x="${cx+cw+4+cw/2}" y="${L.ry-18}" class="t-xs t-mid">their left</text>`;
    const star={aca:0,mca:0,pca:0,sd:'L'};
    VS_TER.forEach((r,i)=>{const yy=L.ry-10+i*30;g+=`<text x="${L.rx}" y="${yy+18}" class="t-lbl">${r.l}</text>`;
      [ [r.r,cx,'R'],[r.e,cx+cw+4,'L']].forEach(([k,xx,sd])=>{const ok=R.has(k)||c<.6;g+=`<rect x="${xx}" y="${yy}" width="${cw}" height="26" rx="6" style="fill:var(--${ok?'good':'bad'}-soft)"/><text x="${xx+cw/2}" y="${yy+17}" class="t-sm t-mid" style="fill:var(--${ok?'good':'bad'});font-weight:700">${ok?'fed':'starved'}</text>`;
        if(!ok){star[r.l.toLowerCase()]=1;star.sd=star.any&&star.sd!==sd?'both':sd;star.any=1}})});
    if(bk==='basilar'&&c>=.6)g+=`<text x="${L.rx}" y="${L.ry+94}" class="t-xs">brainstem branches below the clot:</text><text x="${L.rx}" y="${L.ry+108}" class="t-xs">not reached by the circle in this model</text>`;
    if(bk==='M1-L'&&c>=.6)g+=`<text x="${L.rx}" y="${L.ry+94}" class="t-xs">the clot lies beyond the circle:</text><text x="${L.rx}" y="${L.ry+108}" class="t-xs">surface collaterals are the only rescue</text>`;
    g+=brainAxial(L.ax,L.ay,L.as,{terr:star.any?{aca:star.aca,mca:star.mca,pca:star.pca,side:star.sd}:null}).svg;
    g+=`<text x="${L.ax+60}" y="${L.ay+162}" class="t-xs t-mid">${star.any?'starved area':'nothing starved'}</text>`;
    ws.innerHTML=g;
    const D=VS_WN[bk],E=D.all||D[va]||D;$('#vsWNote').innerHTML=noteHTML({k:D.k,t:E.t,txt:E.txt,pt:E.pt||D.pt,hook:E.hook})}
  const wstop=playWire(wr,$('#vsWPlay'),drawW,9000,'%t:player.replay%','vessels');
  const pick=(attr,fn)=>$$('['+attr+']').forEach(b=>b.addEventListener('click',()=>{wstop();fn(b.getAttribute(attr));$$('['+attr+']').forEach(c=>c.setAttribute('aria-pressed',c===b));drawW(+wr.value)}));
  pick('data-vsb',v=>{bk=v});pick('data-vsv',v=>{va=v});
  drawW(+wr.value);

  /* ---------- how often it is complete ---------- */
  const vv=$('#vsVar');let vStop=null;
  function drawVar(p){const N=vb(vv,'720 210','400 340'),S=[{n:'1998 · 150 volunteers · 1.5T',k:42,v:'42%'},{n:'2020 · Tromso, N=1,864 · 3T',k:12,v:'11.9%'}];let g='';
    S.forEach((s,i)=>{const x=N?14:20+i*350,y=N?10+i*165:12,I=icons(x,y+34,{n:100,cols:20,k:Math.round(s.k*p),size:N?15:14.5,gap:N?3.2:1.8,col:'var(--brand)'});
      g+=`<text x="${x}" y="${y+12}" class="t-sm">${s.n}</text><text x="${x}" y="${y+28}" class="t-lbl">${s.v} complete circle</text>`+I.svg});
    vv.innerHTML=g}
  $('#vsVarPlay').addEventListener('click',()=>{if(vStop)vStop();vStop=animate(1100,drawVar,()=>{vStop=null})});
  drawVar(1);
  const pr=redraws.vessels;redraws.vessels=()=>{pr&&pr();drawVar(1)};

  /* ---------- lateral medulla ---------- */
  const ms=$('#vsM'),mr=$('#vsMT');let setM=()=>{};
  const VS_MD=smoothPath([ [30,92],[60,42],[140,24],[220,42],[250,92],[236,160],[190,202],[140,216],[90,202],[44,160] ]);
  function drawM(t){const N=vb(ms,'720 300','400 716'),L=N?{mx:60,my:6,bx:200,by:610,bs:150,lx:12,ly:252,lh:50}:{mx:6,my:30,bx:340,by:160,bs:190,lx:412,ly:24,lh:46};
    const p=phaseOf(VS_MS,t),rad=14+58*ramp(t,0,.95),id=kid('vsm');let g=`<g transform="translate(${L.mx} ${L.my})"><defs><clipPath id="${id}"><path d="${VS_MD}"/></clipPath></defs><path d="${VS_MD}" style="fill:var(--brainstem);stroke:var(--brain-line);stroke-width:1.5"/>`;
    g+=`<path d="M140 30V60" style="stroke:var(--sulcus);stroke-width:2"/><path d="M140 180V214" style="stroke:var(--sulcus);stroke-width:2"/>`;
    g+=`<g clip-path="url(#${id})"><path d="${blob(218,108,rad,5,{n:14,rough:.08})}" style="fill:var(--core);opacity:.42"/></g>`;
    VS_MS.forEach((s,i)=>{const on=i<=p,here=i===p;g+=`<g data-vm="${i}" class="clk"><circle cx="${s.p[0]}" cy="${s.p[1]}" r="${here?12:10}" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${here?'var(--accent)':'var(--ink)'};stroke-width:${here?2.4:1}"/><text x="${s.p[0]}" y="${s.p[1]+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${i+1}</text></g>`});
    g+=`<text x="140" y="16" class="t-xs t-mid">back of the brainstem</text><text x="140" y="234" class="t-xs t-mid">front</text></g>`;
    const on=VS_MS.slice(0,p+1),fc=on.some(s=>s.face),bd=on.some(s=>s.body),ey=on.some(s=>s.eye);
    /* person's left lesion: it sits on the viewer's right in this section */
    g+=vsBody(L.bx,L.by,L.bs,{L:{f:fc?1:0,a:0,l:0},R:{f:0,a:bd?1:0,l:bd?1:0}});
    const k=L.bs/146,fy=L.by-23*k-39*k;if(ey)g+=`<circle cx="${f1(L.bx+5*k)}" cy="${f1(fy)}" r="${f1(2.2*k)}" style="fill:var(--ink)"/>`;
    g+=`<text x="${L.bx}" y="${f1(L.by-73*k-6)}" class="t-xs t-mid">lesion on their left</text>`;
    VS_MS.forEach((s,i)=>{const y=L.ly+i*L.lh,a=i<=p,here=i===p;
      if(here)g+=`<rect x="${L.lx-6}" y="${y-13}" width="${(N?388:312)}" height="${L.lh-6}" rx="7" style="fill:var(--warn-soft)"/>`;
      g+=`<text x="${L.lx}" y="${y+3}" class="t-lbl" style="opacity:${a?1:.55}">${i+1}. ${s.n}</text><text x="${L.lx+16}" y="${y+20}" class="t-sm" style="fill:${a?'var(--ink)':'var(--muted)'}">${a?s.s:'not yet reached'}</text>`});
    ms.innerHTML=g;setM(p)}
  const mstop=playWire(mr,$('#vsMPlay'),drawM,12000,'%t:player.replay%','vessels');
  setM=stepWire($('#vsMSteps'),VS_MS,mr,drawM,mstop);
  ms.addEventListener('click',e=>{const g=e.target.closest('[data-vm]');if(!g)return;mstop();const s=VS_MS[+g.dataset.vm];mr.value=s.at;drawM(s.at)});
  drawM(+mr.value);
};
