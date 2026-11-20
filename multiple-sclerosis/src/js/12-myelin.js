
/* =============== 1.2 myelin & demyelination =============== */
const MY_STEPS=[
 {from:0,at:.06,k:'Step 1 · Healthy',t:'Saltatory conduction',
  txt:'Compact myelin lets the signal jump from one node of Ranvier to the next. It raises conduction velocity from under 1 m/s (unmyelinated) to 50–100 m/s without a thicker axon. [[Kister2022]] Each node is a gap of about 1 μm where voltage-gated sodium channels (Nav1.6 and Nav1.1 in the CNS) let Na+ in. Beside it the paranode glues the myelin loops to the axon and seals the gap, and under the myelin the juxtaparanode holds Kv1.1/Kv1.2 potassium channels, hidden from the current. [[ArancibiaCarcamo2014,Rasband1998]] One oligodendrocyte myelinates 40–60 different axons, one internode on each. [[Kister2022]]',
  pt:'Myelin is insulation. It lets the signal skip along the wire in jumps instead of crawling.',
  hook:'Along the axon: <b>node (Nav) → paranode (Caspr, neurofascin-155) → juxtaparanode (Kv1) → internode</b>. CNS myelin: oligodendrocyte. PNS myelin: Schwann cell. [[ArancibiaCarcamo2014,Kister2022]]'},
 {from:.15,at:.25,k:'Step 2 · Attack',t:'Myelin stripped',
  txt:'In MS lesions CD8+ T cells dominate the infiltrate, with B cells, while macrophages and activated microglia strip and swallow the myelin. [[MachadoSantos2018,Reich2018]] On average 45% of the macrophage-like cells in active lesions come from resident microglia. [[Zrzavy2017]] Myelin debris inside macrophages is how pathologists recognise ongoing demyelination, [[Kuhlmann2017]] and antibody and complement sit with those macrophages in established MS. [[Breij2008]] Oligodendrocytes can die too. [[Barnett2004]] How the immune cells get here is in <a href="#immune" data-go="immune">The immune attack</a>.',
  pt:'Immune cells get into the brain or spinal cord and eat away the insulation around nerve fibres. The fibre itself is still there, for now.',
  hook:'Demyelination = loss of myelin with the axon at first preserved. Active lesion: macrophages full of myelin debris throughout. [[Kuhlmann2017]]'},
 {from:.31,at:.37,k:'Step 3 · Block',t:'Conduction fails',
  txt:'Without myelin, current leaks away before it can fire the next stretch. Sodium channels were concentrated at the old nodes, so the bare membrane has few. The paranodes come apart, nodes lengthen and Kv1 channels that were hidden under the myelin are exposed and leak repolarising K+ current. [[ArancibiaCarcamo2014]] Conduction block, from demyelination and inflammation, is the main cause of the negative symptoms of a relapse: weakness, loss of vision, numbness. [[Smith1999]]',
  pt:'Where the insulation is gone the signal fizzles out. The person notices something missing: sight, strength or feeling.',
  hook:'Negative symptoms (paralysis, blindness, numbness) = <b>conduction block</b>. Positive symptoms (tingling, Lhermitte\'s, pain) = ectopic impulses and cross-talk between axons. [[Smith1999]]'},
 {from:.43,at:.5,k:'Step 4 · Adapt',t:'Sodium channels spread',
  txt:'In acute MS plaques, Nav1.2 and Nav1.6 spread out along long stretches of demyelinated axon. [[Craner2004]] Some axons then conduct again, continuously and slowly, like an unmyelinated fibre. In rat central axons this worked across bare stretches longer than 2,500 μm, with a refractory period typically 2–5 times normal. [[Felts1997]] There is a cost: Nav1.6 carries a persistent Na+ current and sits with the Na+/Ca2+ exchanger, which can run in reverse and load the axon with damaging calcium. [[Craner2004,Waxman2006]]',
  pt:'The bare fibre adds new channels along its length, so the signal can creep across again, slowly. This helps symptoms recover, but it may wear the fibre out.',
  hook:'Sodium channels in MS are <b>double-edged</b>: they restore conduction and they contribute to axon degeneration. [[Waxman2006]] Remission can come from remyelination, from resolving inflammation, or from conduction along axons that stay bare. [[Smith1999]]'},
 {from:.56,at:.64,k:'Step 5 · Repair',t:'Partial remyelination',
  txt:'Oligodendrocyte precursor cells are activated, migrate, multiply and become new myelinating cells. [[Franklin2017]] The new sheaths are thinner and the internodes shorter, and the remyelinated area is a pale "shadow plaque". More than 10% of the plaque area was remyelinated in 3 of 82 plaques within 10 weeks of onset and in 38 of 105 at 3–10 months. [[Prineas1993]] In 20% of 51 autopsies remyelination was extensive. [[Patrikios2006]] In chronic lesions precursors are present but often fail to mature. [[Kuhlmann2008]] <span class="ev hyp">Debated</span> Who makes the new myelin in people is unresolved: carbon-14 dating found only old oligodendrocytes in shadow plaques, [[Yeung2019]] and in large-animal models surviving mature oligodendrocytes can re-ensheath axons. [[Duncan2018]] Here axon A gets two thin repairs; its middle stretch stays bare. Axon B gets none.',
  pt:'The body can rebuild some insulation. The new layer is thinner, but signals jump again where it returns.',
  hook:'Shadow plaque = remyelinated lesion: thin myelin, short internodes. Repair failure in chronic MS is mainly a <b>differentiation block</b> of precursor cells. [[Kuhlmann2008]]'},
 {from:.71,at:.79,k:'Step 6 · Loss',t:'Axons transected',
  txt:'Axons are cut in MS lesions. Trapp and colleagues counted terminal axonal ovoids, the swollen ends of cut axons, and found them in all 47 lesions examined: 11,236 per mm³ in active lesions, 3,138 at the edges of chronic active lesions, 875 in their centres and fewer than 1 in control white matter. Transection was related to inflammation. [[Trapp1998]] Losing oligodendrocytes also removes metabolic support for the axon. [[Kister2022]] Damaged axons release neurofilament light into the blood; serum levels were higher with gadolinium-enhancing lesions. [[Disanto2017]]',
  pt:'Some nerve fibres are cut through. A cut fibre cannot be insulated again, which is one reason disability can become permanent.',
  hook:'Trapp 1998: <b>11,236 transected axons per mm³</b> in active lesions vs fewer than 1 in control white matter. Axon loss starts in active, inflamed lesions. [[Trapp1998]]'},
 {from:.86,at:.95,k:'Step 7 · Heat',t:'Uhthoff: warmth blocks a marginal fibre',
  txt:'An estimated 60–80% of people with MS have temporary worsening with heat: warmth impairs propagation in demyelinated axons, causing slowing or block. [[Davis2010]] Cooling works the other way, like a drug that prolongs the action potential, and can overcome conduction failure. [[Sherratt1980]] These brief, reversible episodes are Uhthoff\'s phenomena, first described in optic neuritis. Triggers include exercise, fever, infection, hot surroundings and stress. They come from ion-channel changes, not new inflammation, so they are not relapses. [[Frohman2013]] Move the temperature slider.',
  pt:'A fibre that barely works can stop working when the body warms up, and work again once it cools. Old symptoms return for a while; it is not a new attack.',
  hook:'Uhthoff = temporary, heat-triggered return of old symptoms in a demyelinated pathway. <b>Not a relapse.</b> [[Frohman2013]]'}
];
const MY_TEMP=[{n:'cool',f:1.25},{n:'normal',f:1},{n:'warm',f:.65}];
const MY_H=.05,MY_C=.2,MY_TH=.055,MY_R=20;
/* layouts: wide 720 x 452, narrow 400 x 616 */
function myGeom(N){
  const G=N
    ?{W:400,H:616,x0:12,x1:388,n:7,les:[2,3,4],gap:7,h:18,aw:3.5,yA:150,yB:212,cr:9,
      ves:{x0:200,x1:400,y:26,h:20},oli:{x:62,y:80,to:[1],stubs:[ [14,56,44] ],lbl:[12,16]},oliL:{x:200,y:88},
      above:[ {x:128,t:'mac'},{x:272,t:'T'} ],btw:[ {x:150,t:'T'},{x:200,t:'mac'},{x:250,t:'T'} ],
      th:{x:150,y:34},lblA:'AXON A',inset:{x:12,y:266,w:376,h:170},rec:{x:12,y:450,w:376,h:150}}
    :{W:720,H:452,x0:24,x1:696,n:9,les:[3,4,5],gap:8,h:22,aw:4,yA:170,yB:236,cr:11,
      ves:{x0:250,x1:720,y:30,h:24},oli:{x:175,y:98,to:[1],stubs:[ [30,118,50],[30,104,76] ],lbl:[24,24]},oliL:{x:360,y:100},
      above:[ {x:268,t:'mac'},{x:452,t:'T'} ],btw:[ {x:300,t:'T'},{x:360,t:'mac'},{x:425,t:'T'} ],
      th:{x:680,y:72},lblA:'AXON A · recorded',inset:{x:24,y:292,w:330,h:150},rec:{x:368,y:292,w:328,h:150}};
  const seg=(G.x1-G.x0-G.gap*(G.n+1))/G.n;G.seg=seg;
  G.a=i=>G.x0+G.gap+i*(seg+G.gap);G.b=i=>G.a(i)+seg;G.mid=i=>G.a(i)+seg/2;
  G.node=i=>i>=G.n?G.x1:i<=0?G.x0:G.a(i)-G.gap/2;
  G.cutX=G.mid(G.les[1]);
  return G;
}
/* state of the story at time t */
function myState(t){return{
  strip:k=>ease(ramp(t,.17+.02*k,.26+.02*k)),
  inflam:ramp(t,.16,.22)*(1-ramp(t,.5,.58)),
  nav:ease(ramp(t,.44,.52)),
  remy:ease(ramp(t,.58,.67)),
  od:ramp(t,.17,.27),newO:ease(ramp(t,.55,.62)),
  cut:ramp(t,.72,.76),deg:ramp(t,.75,.84)}}
/* the route a signal takes along one axon: hops, crawls, a block or a cut */
function myRoute(G,S,which,tf){
  const segs=[];let blocked=null,thin=false,crawl=false;
  for(let i=0;i<G.n;i++){const xa=G.node(i),xb=G.node(i+1),k=G.les.indexOf(i);
    if(k<0){segs.push({xa,xb,c:MY_H,k:'hop'});continue}
    if(which==='B'&&k===1&&S.cut>=.5){segs.push({xa,xb:G.cutX,c:0,k:'cut'});blocked='cut';break}
    const s=S.strip(k),r=which==='A'&&k!==1?S.remy:0,bare=.6+.8*S.nav;
    const sf=lerp(lerp(5,bare,s),2.2,r)*tf;
    if(sf<1){segs.push({xa,xb,c:0,k:'block'});blocked='block';break}
    if(r>.5){const xm=(xa+xb)/2;segs.push({xa,xb:xm,c:MY_TH,k:'hop'},{xa:xm,xb,c:MY_TH,k:'hop'});thin=true}
    else{const c=lerp(MY_H,MY_C,s);segs.push({xa,xb,c,k:s>.5?'crawl':'hop'});if(s>.5)crawl=true}}
  const total=segs.reduce((a,g)=>a+g.c,0),ref=G.n*MY_H;
  const status=blocked==='cut'||(which==='B'&&S.cut>=.5)?'cut':blocked?'blocked':total>ref*1.12?'delayed':'arrives';
  return{segs,total,ref,status,thin,crawl}}
/* where the impulse is at tau (0..1 of one stimulus cycle) */
function myPulse(R,tau){let acc=0;
  for(const g of R.segs){
    if(g.k==='block'||g.k==='cut'){const x=g.k==='cut'?g.xb-6:g.xa;if(tau<acc+.1)return{x,fade:1-(tau-acc)/.1,stop:g.k};return{x,fade:0,stop:g.k}}
    if(tau<acc+g.c){const u=(tau-acc)/g.c;return{x:lerp(g.xa,g.xb,g.k==='hop'?ease(u):u),lift:g.k==='hop'?Math.sin(Math.PI*u):0,k:g.k,xa:g.xa,xb:g.xb,u}}
    acc+=g.c}
  const last=R.segs[R.segs.length-1];return{x:last?last.xb:0,done:true,fade:1-clamp((tau-acc)/.06)}}
function myOligo(x,y,r,o,col='var(--myelin)',line='var(--myelin-line)'){
  return `<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${col};stroke:${line};stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.45)}" style="fill:var(--nuc)"/></g>`}
inits.myelin=()=>{
  const svg=$('#mySvg'),rg=$('#myT'),tp=$('#myTemp');let touched=false;
  const setTemp=v=>{tp.value=v;tp.setAttribute('aria-valuetext',MY_TEMP[v].n);$('#myTempV').textContent=MY_TEMP[v].n};
  function draw(t){
    const N=vb(svg,'720 452','400 616'),G=myGeom(N),S=myState(t);
    if(!touched)setTemp(t>=.885?2:1);
    const ti=+tp.value,tf=MY_TEMP[ti].f;
    const RA=myRoute(G,S,'A',tf),RB=myRoute(G,S,'B',tf),tau=(t*MY_R)%1;
    const h=G.h,L0=G.a(G.les[0]),L1=G.b(G.les[2]);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* blood vessel with red cells */
    const V=G.ves;
    s+=`<rect x="${V.x0}" y="${V.y}" width="${V.x1-V.x0+20}" height="${V.h}" rx="${V.h/2}" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/>`;
    for(let k=0;k<6;k++){const x=V.x0+12+((k*83+t*1400)%(V.x1-V.x0-20));s+=`<ellipse cx="${f1(x)}" cy="${V.y+V.h/2}" rx="7" ry="4" style="fill:var(--vessel);opacity:.55"/>`}
    s+=`<text x="${V.x0+6}" y="${V.y+V.h+13}" class="t-xs">blood vessel</text>`;
    /* lesion field: inflamed, then a pale shadow plaque */
    if(S.inflam>0)s+=`<rect x="${f1(L0-8)}" y="${G.yA-h/2-16}" width="${f1(L1-L0+16)}" height="${G.yB-G.yA+h+28}" rx="14" style="fill:var(--attack-soft);opacity:${f1(.8*S.inflam)}"/>`;
    const pal=ramp(t,.56,.66);
    if(pal>0)s+=`<rect x="${f1(L0-8)}" y="${G.yA-h/2-16}" width="${f1(L1-L0+16)}" height="${G.yB-G.yA+h+28}" rx="14" style="fill:var(--panel-2);opacity:${f1(.9*pal)}"/>`;
    /* the healthy oligodendrocyte: processes to two internodes on A and to other axons */
    const O=G.oli;
    O.stubs.forEach(([xa,xb,y])=>{s+=`<line x1="${xa}" x2="${xb}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:2.4;opacity:.5"/><rect x="${f1(xa+(xb-xa)*.2)}" y="${y-5}" width="${f1((xb-xa)*.6)}" height="10" rx="5" style="fill:var(--myelin);stroke:var(--myelin-line);opacity:.75"/>`;
      s+=`<path d="M${O.x} ${O.y}Q${f1((O.x+(xa+xb)/2)/2)} ${f1(y+6)} ${f1((xa+xb)/2)} ${y+5}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.4"/>`});
    O.to.forEach(i=>{s+=`<path d="M${O.x} ${O.y}Q${f1((O.x+G.mid(i))/2)} ${f1(O.y+20)} ${f1(G.mid(i))} ${G.yA-h/2}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.4"/>`});
    s+=myOligo(O.x,O.y,9,1);
    s+=`<text x="${O.lbl[0]}" y="${O.lbl[1]}" class="t-xs">1 oligodendrocyte → many axons</text>`;
    /* the lesion's oligodendrocyte dies; a new one forms from a precursor */
    const OL=G.oliL;
    /* one internode per axon: one process down to A, the others leave for axons out of view */
    const away=(x,y,o,col)=>[-1,1].map(d=>`<path d="M${x} ${y}Q${x+d*16} ${y-4} ${x+d*30} ${y-16}" style="fill:none;stroke:${col};stroke-width:1.4;stroke-dasharray:3 2;opacity:${f1(o*.8)}"/>`).join('');
    if(S.od<1){const i=G.les[1];s+=`<path d="M${OL.x} ${OL.y}V${G.yA-h/2}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.4;opacity:${f1(1-S.od)}"/>`+away(OL.x,OL.y,1-S.od,'var(--myelin-line)');s+=myOligo(OL.x,OL.y,9,1-S.od)}
    const lostO=Math.min(ramp(t,.2,.26),1-ramp(t,.4,.46));
    if(lostO>0)s+=`<g style="opacity:${f1(lostO)}"><path d="M${OL.x-6} ${OL.y-6}l12 12M${OL.x+6} ${OL.y-6}l-12 12" style="stroke:var(--bad);stroke-width:2"/><text x="${OL.x+20}" y="${OL.y+4}" class="t-xs" style="fill:var(--bad)">oligodendrocyte lost</text></g>`;
    const opc=ramp(t,.53,.56);
    if(opc>0){const px=lerp(OL.x-44,OL.x,S.newO),py=lerp(OL.y+12,OL.y,S.newO);
      if(S.remy>0){const x=G.a(G.les[0])+G.seg*.75;s+=`<path d="M${f1(px)} ${f1(py)}Q${f1((px+x)/2)} ${f1(py+16)} ${f1(x)} ${f1(G.yA-h*.28)}" style="fill:none;stroke:var(--repair);stroke-width:1.2;opacity:${f1(S.remy)}"/>`+away(px,py,S.remy,'var(--repair)')}
      s+=`<g style="opacity:${f1(opc)}"><circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(lerp(5,9,S.newO))}" style="fill:var(--good-soft);stroke:var(--repair);stroke-width:1.6"/><circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(lerp(2.4,4,S.newO))}" style="fill:var(--nuc)"/></g>`;
      const lo=Math.min(ramp(t,.55,.58),1-ramp(t,.68,.71));
      if(lo>0)s+=`<text x="${OL.x+20}" y="${OL.y+4}" class="t-xs" style="fill:var(--repair);opacity:${f1(lo)}">${S.newO<.6?'precursor cell (OPC)':'new myelinating cell'}</text>`}
    /* the two axons */
    const axon=(y,which)=>{let a='';const cut=which==='B'&&S.cut>0,aw=G.aw;
      if(!cut)a+=`<line x1="${G.x0}" x2="${G.x1}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/>`;
      else{const cx=G.cutX,sp=4+8*S.cut;
        a+=`<line x1="${G.x0}" x2="${f1(cx-sp)}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/><circle cx="${f1(cx-sp)}" cy="${y}" r="${f1(aw*.6+aw*.9*S.cut)}" style="fill:var(--axon)"/>`;
        a+=`<line x1="${f1(cx+sp)}" x2="${G.x1}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round;opacity:${f1(1-.65*S.deg)};${S.deg>0?'stroke-dasharray:5 4':''}"/>`}
      for(let i=0;i<G.n;i++){const ax=G.a(i),w=G.seg,k=G.les.indexOf(i),fade=which==='B'&&i>G.les[1]?1-.55*S.deg:1;
        const sheath=(x,ww,hh,o,stroke)=>`<rect x="${f1(x)}" y="${f1(y-hh/2)}" width="${f1(ww)}" height="${f1(hh)}" rx="${f1(hh/2)}" style="fill:var(--myelin);stroke:${stroke||'var(--myelin-line)'};stroke-width:1;opacity:${f1(o)}"/>`
          +(hh>12&&ww>hh?`<path d="M${f1(x+hh/2)} ${f1(y-hh/4)}H${f1(x+ww-hh/2)}M${f1(x+hh/2)} ${f1(y+hh/4)}H${f1(x+ww-hh/2)}" style="stroke:var(--myelin-line);stroke-width:.8;opacity:${f1(.45*o)}"/>`:'');
        if(k<0){a+=sheath(ax,w,h,fade);continue}
        const sk=S.strip(k);
        if(sk<.97){const ww=w*(1-sk);a+=sheath(ax+(w-ww)/2,ww,h,1-.4*sk);
          if(sk>.05)for(let d=0;d<3;d++){const dx=ax+(w-ww)/2+(d%2?ww+4+d*3:-4-d*3),dy=y+(d-1)*h*.55;a+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="2.2" style="fill:var(--myelin);opacity:${f1(sk*(1-sk)*3)}"/>`}}
        if(which==='A'&&k!==1&&S.remy>0){const gw=4,pw=(w-gw)/2*S.remy;
          a+=sheath(ax+(w-gw)/4-pw/2,pw,h*.55,1,'var(--repair)')+sheath(ax+w-(w-gw)/4-pw/2,pw,h*.55,1,'var(--repair)')}
        /* Nav channels spread along the bare stretch */
        const bareNow=sk>.5&&!(which==='A'&&k!==1&&S.remy>.5)&&!(which==='B'&&k===1&&S.cut>0);
        if(bareNow&&S.nav>0&&!(which==='B'&&i>G.les[1]&&S.deg>0)){const nn=Math.round(2+S.nav*5);for(let q=1;q<=nn;q++){const x=ax+w*q/(nn+1);a+=`<rect x="${f1(x-1.2)}" y="${f1(y-aw/2-4.5)}" width="2.4" height="4" style="fill:var(--rx);opacity:${f1(S.nav)}"/><rect x="${f1(x-1.2)}" y="${f1(y+aw/2+.5)}" width="2.4" height="4" style="fill:var(--rx);opacity:${f1(S.nav)}"/>`}}
        if(which==='A'&&k!==1&&S.remy>.5){const x=ax+w/2;a+=`<rect x="${f1(x-1.4)}" y="${f1(y-aw/2-5)}" width="2.8" height="4.5" style="fill:var(--rx)"/><rect x="${f1(x-1.4)}" y="${f1(y+aw/2+.5)}" width="2.8" height="4.5" style="fill:var(--rx)"/>`}}
      /* Nav clusters at the nodes */
      for(let i=1;i<G.n;i++){const x=G.node(i);if(which==='B'&&S.cut>0&&x>G.cutX)continue;a+=`<rect x="${f1(x-1.6)}" y="${f1(y-aw/2-5)}" width="3.2" height="4.5" style="fill:var(--rx)"/><rect x="${f1(x-1.6)}" y="${f1(y+aw/2+.5)}" width="3.2" height="4.5" style="fill:var(--rx)"/>`}
      return a};
    s+=axon(G.yA,'A')+axon(G.yB,'B');
    /* immune cells */
    const ci=S.inflam;
    if(ci>0){const dr=(1-ramp(t,.16,.24))*16;
      G.above.forEach((c,i)=>{const y=G.yA-h/2-G.cr-6-dr;s+=c.t==='mac'?mac(c.x,y,G.cr+1,ci,1,7+i):tcell(c.x,y,G.cr,ci,c.l||'T')});
      G.btw.forEach((c,i)=>{const y=(G.yA+G.yB)/2;s+=c.t==='mac'?mac(c.x,y-dr*.4,G.cr+1,ci,1,3+i):tcell(c.x,y-dr*.4,G.cr,ci,c.l||'T')})}
    /* labels */
    s+=`<text x="${G.x0}" y="${G.yA+h/2+16}" class="t-xs" style="fill:var(--ink)">${G.lblA}</text><text x="${G.x0}" y="${G.yB+h/2+16}" class="t-xs" style="fill:var(--ink)">AXON B</text>`;
    if(t>=.16){const by=G.yB+h/2+10,lt=t<.56?'lesion: myelin stripped':'partly remyelinated: shadow plaque';
      s+=`<path d="M${f1(L0)} ${by-4}V${by}H${f1(L1)}V${by-4}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/><text x="${f1(L0)}" y="${by+13}" class="t-xs">${lt}</text>`}
    if(S.cut>0)s+=`<text x="${f1(G.cutX+10)}" y="${G.yB-h/2-6}" class="t-xs" style="fill:var(--bad);opacity:${f1(S.cut)}">${N?'terminal ovoid':'cut axon: terminal ovoid'}</text>`;
    /* status at the far end */
    const stCol={arrives:'var(--good)',delayed:'var(--warn)',blocked:'var(--bad)',cut:'var(--bad)'};
    const stTxt={arrives:'arrives',delayed:'delayed',blocked:'blocked',cut:'cut'};
    s+=`<text x="${G.x1}" y="${G.yA-h/2-8}" class="t-sm t-end" style="fill:${stCol[RA.status]};font-weight:700">A: ${stTxt[RA.status]}</text>`;
    s+=`<text x="${G.x1}" y="${G.yB-h/2-8}" class="t-sm t-end" style="fill:${stCol[RB.status]};font-weight:700">B: ${stTxt[RB.status]}</text>`;
    /* the impulses */
    const glow=(R,y)=>{const P=myPulse(R,tau);let g='';
      if(P.stop){if(P.fade>0){const rr=6+14*(1-P.fade);g+=`<circle cx="${f1(P.x)}" cy="${y}" r="${f1(rr)}" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(P.fade)}"/><circle cx="${f1(P.x)}" cy="${y}" r="4" style="fill:var(--pulse);opacity:${f1(P.fade)}"/>`}
        g=`<line x1="${G.x0}" x2="${f1(P.x)}" y1="${y}" y2="${y}" style="stroke:var(--pulse);stroke-width:2;opacity:${f1(.15+.3*P.fade)}"/>`+g;return g}
      if(P.done){if(P.fade>0)g+=`<circle cx="${G.x1}" cy="${y}" r="${f1(5+10*(1-P.fade))}" style="fill:var(--pulse);opacity:${f1(.5*P.fade)}"/>`;return g}
      g+=`<line x1="${G.x0}" x2="${f1(P.x)}" y1="${y}" y2="${y}" style="stroke:var(--pulse);stroke-width:2;opacity:.45"/>`;
      if(P.k==='hop'){const mx=(P.xa+P.xb)/2;g+=`<path d="M${f1(P.xa)} ${y-h/2-2}Q${f1(mx)} ${y-h/2-18} ${f1(P.xb)} ${y-h/2-2}" style="fill:none;stroke:var(--pulse);stroke-width:1.4;stroke-dasharray:3 3;opacity:.6"/>`;
        g+=`<circle cx="${f1(P.x)}" cy="${f1(y-P.lift*(h/2+8))}" r="9" style="fill:var(--pulse);opacity:.25"/><circle cx="${f1(P.x)}" cy="${f1(y-P.lift*(h/2+8))}" r="4.5" style="fill:var(--pulse)"/>`}
      else g+=`<ellipse cx="${f1(P.x)}" cy="${y}" rx="12" ry="5" style="fill:var(--pulse);opacity:.35"/><circle cx="${f1(P.x)}" cy="${y}" r="3.5" style="fill:var(--pulse)"/>`;
      return g};
    s+=glow(RA,G.yA)+glow(RB,G.yB);
    /* thermometer */
    const T=G.th,lv=[14,26,42][ti],tc=['var(--pulse)','var(--warn)','var(--bad)'][ti];
    s+=`<rect x="${T.x-5}" y="${T.y}" width="10" height="50" rx="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2"/><rect x="${T.x-2.5}" y="${T.y+50-lv}" width="5" height="${lv+2}" style="fill:${tc}"/><circle cx="${T.x}" cy="${T.y+56}" r="8" style="fill:${tc};stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${T.x}" y="${T.y-6}" class="t-xs t-mid" style="fill:${tc};font-weight:700">${MY_TEMP[ti].n}</text>`;
    /* lower panels */
    s+=myInset(G,S,t,ti)+myRec(G,RA,tau);
    svg.innerHTML=s;
    const p=phaseOf(MY_STEPS,t);setSt(p);
    let extra='';
    if(p===6)extra=`<div class="callout"><b>Now, ${MY_TEMP[ti].n}:</b> axon A is ${RA.status==='blocked'?'blocked at its bare middle stretch. Cool it to see the signal cross again.':'conducting'+(RA.status==='delayed'?', late. Warm it to see the marginal stretch block.':'.')}</div>`;
    $('#myNote').innerHTML=noteHTML(MY_STEPS[p])+extra;
    const cond=RA.status==='blocked'?'fails at the bare stretch':RA.crawl&&RA.thin?'mixed: jumps on thin sheaths, creeps across bare axon':RA.crawl?'continuous, creeping across the bare stretch':RA.thin?'saltatory, on thin new sheaths':'saltatory, node to node';
    const spd=RA.status==='blocked'?'none past the lesion':RA.crawl?'slow across the bare stretch (bare axons can fall below 1 m/s)':RA.thin?'faster again, still below normal':'myelinated range, 50–100 m/s';
    const stW={arrives:'arrives on time',delayed:'delayed',blocked:'blocked',cut:'cut, no signal beyond'};
    $('#myRead').innerHTML=`<span>Axon A conduction <b>${cond}</b></span><span>Speed <b>${spd}</b></span><span>Axon A <b>${stW[RA.status]}</b></span><span>Axon B <b>${stW[RB.status]}</b></span><span>Temperature <b>${MY_TEMP[ti].n}</b></span>`;
  }
  /* zoom on one node (stages 1-5), Trapp's counts (stage 6), the safety margin (stage 7) */
  function myInset(G,S,t,ti){const I=G.inset,{x,y,w,h}=I;
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const oN=1-ramp(t,.695,.71),oT=Math.min(ramp(t,.71,.725),1-ramp(t,.84,.855)),oH=ramp(t,.855,.87);
    if(oN>0){const cy=y+h*.6,cx=x+w/2,sk=S.strip(1),r=S.remy,nv=S.nav;
      s+=`<g style="opacity:${f1(oN)}"><text x="${x+12}" y="${y+18}" class="t-sm">ZOOM · ONE NODE OF RANVIER</text>`;
      s+=`<rect x="${x+w-96}" y="${y+10}" width="7" height="9" style="fill:var(--rx)"/><text x="${x+w-85}" y="${y+18}" class="t-xs">Nav</text><circle cx="${x+w-50}" cy="${y+14.5}" r="3.5" style="fill:var(--brand)"/><text x="${x+w-43}" y="${y+18}" class="t-xs">Kv1</text>`;
      s+=`<rect x="${x+12}" y="${cy-5}" width="${w-24}" height="10" rx="5" style="fill:var(--axon-soft);stroke:var(--axon);stroke-width:1.2"/>`;
      /* Kv1 at the juxtaparanodes, drawn first so intact myelin hides them */
      const expo=ramp(sk,.55,.85)*(1-r);
      [-1,1].forEach(d=>[36,46,56].forEach(o=>{[-1,1].forEach(v=>{s+=`<circle cx="${f1(cx+d*o)}" cy="${f1(cy+v*7)}" r="2.6" style="fill:var(--brand)"/>`})}));
      if(expo>0)[-1,1].forEach(d=>{const xx=cx+d*46;s+=`<g style="opacity:${f1(expo)}"><path d="M${f1(xx)} ${cy-12}V${cy-28}" style="stroke:var(--brand);stroke-width:1.4" marker-end="url(#myK)"/><text x="${f1(xx+(d>0?6:-6))}" y="${cy-22}" class="t-xs ${d>0?'':'t-end'}" style="fill:var(--brand)">K+</text></g>`});
      /* Caspr at the paranodes */
      [-1,1].forEach(d=>[14,20,26].forEach(o=>{s+=`<rect x="${f1(cx+d*o-1)}" y="${cy-8}" width="2" height="16" style="fill:var(--muted);opacity:${f1(clamp(1-sk+r))}"/>`}));
      /* myelin lamellae, stepping down to the paranodal loops */
      [-1,1].forEach(d=>{for(let j=0;j<4;j++){const xi=cx+d*(10+j*5),xo=d<0?x+16:x+w-16,o=clamp(1-sk*1.25+j*.08),off=sk*(j+1)*4;
        if(o<=0)continue;[-1,1].forEach(v=>{const yy=v<0?cy-5-(j+1)*4.6-off:cy+5+j*4.6+.6+off;s+=`<rect x="${f1(Math.min(xi,xo))}" y="${f1(yy)}" width="${f1(Math.abs(xo-xi))}" height="4.2" rx="2.1" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:.7;opacity:${f1(o)}"/>`})}});
      if(r>0)[-1,1].forEach(d=>{for(let j=0;j<2;j++){const xi=cx+d*(10+j*5),xo=d<0?x+16:x+w-16;[-1,1].forEach(v=>{const yy=v<0?cy-5-(j+1)*4.6:cy+5+j*4.6+.6;
        const ww=Math.abs(xo-xi)*r;s+=`<rect x="${f1(d<0?xi-ww:xi)}" y="${f1(yy)}" width="${f1(ww)}" height="4.2" rx="2.1" style="fill:var(--myelin);stroke:var(--repair);stroke-width:.9;opacity:${f1(r)}"/>`})}});
      /* Nav: clustered at the node, then spread along the bare membrane */
      for(let q=-2;q<=2;q++)[-1,1].forEach(v=>{s+=`<rect x="${f1(cx+q*3.2-1.2)}" y="${f1(v<0?cy-9:cy+5)}" width="2.4" height="4" style="fill:var(--rx)"/>`});
      const spread=nv*(1-r)*ramp(sk,.5,.8);
      if(spread>0)for(let xx=x+22;xx<x+w-20;xx+=11){if(Math.abs(xx-cx)<12)continue;[-1,1].forEach(v=>{s+=`<rect x="${f1(xx-1.2)}" y="${f1(v<0?cy-9:cy+5)}" width="2.4" height="4" style="fill:var(--rx);opacity:${f1(spread)}"/>`})}
      if(t<.16)s+=`<path d="M${cx} ${cy-44}V${cy-14}" style="stroke:var(--rx);stroke-width:1.4" marker-end="url(#myNa)"/><text x="${cx+6}" y="${cy-36}" class="t-xs" style="fill:var(--rx)">Na+ enters at the node</text>`;
      if(S.inflam>0&&t<.5)s+=mac(x+w-46,y+44,10,S.inflam,1,11);
      const cap=t<.16?'Kv1 hidden under the myelin; paranodes seal it':t<.31?'macrophages strip the layers of myelin':t<.44?'bare: Kv1 exposed and leaking K+; few Nav':t<.56?'Nav1.2 and Nav1.6 spread along the bare axon':'thin new myelin; Nav regroups at nodes';
      s+=`<text x="${x+12}" y="${y+h-10}" class="t-xs" style="fill:var(--ink)">${cap}</text></g>`}
    if(oT>0){const rows=[ ['Active lesions',11236],['Chronic active lesion, edge',3138],['Chronic active lesion, centre',875],['Control white matter',0] ];
      const g=ease(ramp(t,.72,.78)),bw=w-110,dy=N2(G)?32:27;
      s+=`<g style="opacity:${f1(oT)}"><text x="${x+12}" y="${y+18}" class="t-sm">TRANSECTED AXONS PER mm³</text><text x="${x+w-12}" y="${y+18}" class="t-xs t-end">Trapp 1998</text>`;
      rows.forEach(([n,v],i)=>{const yy=y+40+i*dy,ww=Math.max(1.5,v/11236*bw*g);
        s+=`<text x="${x+12}" y="${yy}" class="t-xs" style="fill:var(--ink)">${n}</text><rect x="${x+12}" y="${yy+4}" width="${f1(ww)}" height="9" rx="3" style="fill:var(--bad);opacity:${f1(.45+.5*v/11236)}"/>`;
        s+=`<text x="${f1(x+18+ww)}" y="${yy+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${v?Math.round(v*g).toLocaleString('en-US'):'fewer than 1'}</text>`});
      s+='</g>'}
    if(oH>0){const bw=w-120,x0=x+70,thx=x0+bw/2,dy=N2(G)?30:26;
      s+=`<g style="opacity:${f1(oH)}"><text x="${x+12}" y="${y+18}" class="t-sm">SAFETY MARGIN, BARE STRETCH OF A</text>`;
      MY_TEMP.forEach((T,i)=>{const sf=1.4*T.f,yy=y+40+i*dy,on=i===ti,ok=sf>=1;
        s+=`<text x="${x+12}" y="${yy+9}" class="t-xs" style="fill:var(--ink);${on?'font-weight:700':''};opacity:${on?1:.6}">${T.n}</text><rect x="${x0}" y="${yy}" width="${f1(sf/2*bw)}" height="11" rx="4" style="fill:${ok?'var(--good)':'var(--bad)'};opacity:${on?.9:.3}"/>`;
        s+=`<text x="${f1(Math.max(x0+sf/2*bw,ok?0:thx)+6)}" y="${yy+9}" class="t-xs" style="fill:${ok?'var(--good)':'var(--bad)'};opacity:${on?1:.6}">${ok?'conducts':'blocks'}</text>`});
      const yb=y+40+3*dy;
      s+=`<line x1="${f1(thx)}" x2="${f1(thx)}" y1="${y+32}" y2="${yb-4}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3"/><text x="${f1(thx)}" y="${yb+8}" class="t-xs t-mid" style="fill:var(--ink)">needed to fire the next stretch</text>`;
      s+=`<text x="${x+12}" y="${y+h-10}" class="t-xs">Schematic. Warmth impairs conduction; cooling helps.</text></g>`}
    return s}
  const N2=G=>G.W===400;
  /* recording from the far end of axon A */
  function myRec(G,R,tau){const {x,y,w,h}=G.rec,px0=x+14,px1=x+w-14,py=y+h*.64,X=u=>lerp(px0,px1,clamp(u));
    const stC={arrives:'var(--good)',delayed:'var(--warn)',blocked:'var(--bad)',cut:'var(--bad)'}[R.status];
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<text x="${x+12}" y="${y+18}" class="t-sm">RECORDING · FAR END OF AXON A</text><text x="${x+w-12}" y="${y+18}" class="t-lbl t-end" style="fill:${stC}">${{arrives:'on time',delayed:'late',blocked:'nothing',cut:'nothing'}[R.status]}</text>`;
    const hx=X(R.ref);
    s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${py-44}" y2="${py+10}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(hx)}" y="${py-48}" class="t-xs t-mid">healthy timing</text>`;
    s+=`<line x1="${px0}" x2="${px1}" y1="${py}" y2="${py}" class="axis"/><text x="${px1}" y="${y+h-8}" class="t-xs t-end">time after the stimulus →</text>`;
    let d=`M${px0} ${py}`;const blocked=R.status==='blocked'||R.status==='cut',arr=R.total;
    if(!blocked&&tau>=arr){const ax=X(arr);d+=`H${f1(ax-4)}L${f1(ax)} ${py-36}L${f1(ax+5)} ${py+9}L${f1(ax+9)} ${py}H${f1(X(tau))}`}
    else d+=`H${f1(X(tau))}`;
    s+=`<path d="${d}" style="fill:none;stroke:var(--pulse);stroke-width:2.2;stroke-linejoin:round"/><circle cx="${f1(X(tau))}" cy="${py}" r="2.5" style="fill:var(--pulse)"/>`;
    if(blocked&&tau>R.ref*.6)s+=`<text x="${f1((px0+px1)/2)}" y="${py+26}" class="t-xs t-mid" style="fill:var(--bad)">no impulse reaches the end</text>`;
    else if(!blocked&&R.status==='delayed'&&tau>=arr)s+=`<text x="${f1(X(arr)+12)}" y="${py-24}" class="t-xs" style="fill:var(--warn)">${X(arr)>px1-90?'':'late'}</text>`;
    return s}
  const defs=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${marker('myK','var(--brand)')}${marker('myNa','var(--rx)')}</defs></svg>`;
  svg.parentNode.insertAdjacentHTML('afterbegin',defs);
  const stop=playWire(rg,$('#myPlay'),draw,48000,'Replay','myelin');
  const setSt=stepWire($('#mySteps'),MY_STEPS,rg,draw,stop);
  $('#myPlay').addEventListener('click',()=>{if(+rg.value<=.02||+rg.value>=.99)touched=false});
  $('#mySteps').addEventListener('click',()=>{touched=false;draw(+rg.value)});
  tp.addEventListener('input',()=>{touched=true;setTemp(+tp.value);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- 2. VEP: a healthy and an affected optic nerve race ---------- */
  const MY_VM=[
   {id:'h',n:'Both nerves healthy',amp:1,
    note:{k:'Both healthy',t:'The two waves line up',txt:'Each eye\'s signal reaches the visual cortex at the same time, so the positive wave about 100 ms after the flash, P100, lines up for both eyes. The test is recorded through electrodes over the back of the head (general background).',pt:'Both eyes\' messages arrive at the same moment.'}},
   {id:'d',n:'Demyelinated (optic neuritis)',amp:.72,
    note:{k:'Demyelinated optic nerve',t:'The wave comes late',txt:'Halliday, McDonald and Mushin reported in 1972 that the visual evoked response is delayed in optic neuritis: slowed conduction in the demyelinated nerve pushes P100 later. [[Halliday1972]] Some fibres also block, so the wave is smaller. [[Smith1999]] Vision can recover while some axons stay demyelinated, because restored conduction along bare axons is one route to remission. [[Smith1999]]',pt:'The damaged nerve still carries the message, but late.',hook:'Prolonged P100 latency = slowed conduction = <b>demyelination</b> of the optic nerve. [[Halliday1972]]'}},
   {id:'r',n:'Remyelinated',amp:.9,
    note:{k:'Remyelinated optic nerve',t:'The delay shrinks',txt:'Thin new sheaths restore jumping conduction, so the latency shortens, though here not back to normal (schematic). P100 latency is used as a readout of remyelination in trials: in ReBUILD, clemastine shortened the latency delay by 1.7 ms per eye (95% CI 0.5–2.9) in chronic demyelinating optic neuropathy. [[Green2017]] More in <a href="#cure" data-go="cure">Toward a cure</a>.',pt:'After repair the message gets through faster again.',hook:'VEP latency is a functional measure of remyelination. ReBUILD: <b>−1.7 ms</b> per eye with clemastine. [[Green2017]]'}},
   {id:'w',n:'Demyelinated, body warm',amp:.28,
    note:{k:'Demyelinated, warm',t:'Marginal fibres block',txt:'Uhthoff\'s phenomena were first described in optic neuritis: brief, reversible symptoms set off by exercise, fever or hot surroundings. [[Frohman2013]] Warmth tips marginal demyelinated fibres into block, [[Davis2010]] so fewer signals arrive and the wave shrinks. The size of the drop drawn here is illustrative.',pt:'When the body warms up, more of the damaged fibres stop carrying the message for a while.',hook:'Uhthoff: heat-triggered, reversible, not a relapse. [[Frohman2013]]'}}];
  const vsvg=$('#myVep'),vr=$('#myVepT');let vm=1;
  const vepRoute=(n,les,mode,x0,x1,gap)=>{const seg=(x1-x0-gap*(n+1))/n,a=i=>x0+gap+i*(seg+gap),node=i=>i>=n?x1:i<=0?x0:a(i)-gap/2;
    const segs=[];for(let i=0;i<n;i++){const xa=node(i),xb=node(i+1),inL=les.includes(i);
      if(!inL||mode==='h'){segs.push({xa,xb,c:MY_H,k:'hop'});continue}
      if(mode==='w'){segs.push({xa,xb,c:0,k:'block'});break}
      if(mode==='r'){const xm=(xa+xb)/2;segs.push({xa,xb:xm,c:.03,k:'hop'},{xa:xm,xb,c:.03,k:'hop'})}
      else segs.push({xa,xb,c:.1,k:'crawl'})}
    return{segs,total:segs.reduce((q,g)=>q+g.c,0),ref:n*MY_H,a,seg,node}};
  const gau=(x,m,sd)=>Math.exp(-.5*Math.pow((x-m)/sd,2));
  const wave=(ms,lat,amp)=>amp*(-.45*gau(ms,lat-25,8)+gau(ms,lat,11)-.6*gau(ms,lat+38,16));
  function drawVep(t){
    const N=vb(vsvg,'720 380','400 476'),M=MY_VM[vm],ms=t*250;
    const L=N?{ex:26,fx:10,fy:110,ys:[78,158],x0:46,x1:326,cx:[334,394],cy:[44,190],lab:[58,138],px0:30,px1:380,base:322,sc:58,top:240,axl:404,leg:[432,450],n:6,les:[2,3,4]}
             :{ex:58,fx:24,fy:110,ys:[78,158],x0:82,x1:560,cx:[580,700],cy:[40,196],lab:[56,136],px0:82,px1:700,base:292,sc:58,top:214,axl:370,leg:[0,0],n:8,les:[3,4,5]};
    const mode=M.id;
    const Rh=vepRoute(L.n,L.les,'h',L.x0,L.x1,7),Ra=vepRoute(L.n,L.les,mode,L.x0,L.x1,7),Rl=mode==='w'?vepRoute(L.n,L.les,'d',L.x0,L.x1,7):Ra;
    const TS=60/(L.n*MY_H),latH=Rh.total*TS+40,latA=Rl.total*TS+40;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* flash */
    const fo=1-ramp(ms,0,30);
    s+=`<path transform="translate(${L.fx} ${L.fy})" d="M0 -14L4 -4L14 -4L6 3L9 13L0 7L-9 13L-6 3L-14 -4L-4 -4Z" style="fill:var(--gold);stroke:var(--warn);stroke-width:1;opacity:${f1(.35+.65*fo)}"/>`;
    /* cortex */
    s+=`<rect x="${L.cx[0]}" y="${L.cy[0]}" width="${L.cx[1]-L.cx[0]}" height="${L.cy[1]-L.cy[0]}" rx="14" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=N?`<text x="${(L.cx[0]+L.cx[1])/2}" y="${L.cy[1]-22}" class="t-xs t-mid">visual</text><text x="${(L.cx[0]+L.cx[1])/2}" y="${L.cy[1]-10}" class="t-xs t-mid">cortex</text>`
        :`<text x="${(L.cx[0]+L.cx[1])/2}" y="${L.cy[0]+22}" class="t-sm t-mid">visual cortex</text><text x="${(L.cx[0]+L.cx[1])/2}" y="${L.cy[1]-12}" class="t-xs t-mid">recording electrode</text>`;
    const rows=[{R:Rh,lab:N?'LEFT EYE · healthy':'LEFT EYE · healthy optic nerve',col:'var(--brand)',m:'h'},{R:Ra,lab:N?'RIGHT EYE · '+{h:'healthy',d:'demyelinated',r:'remyelinated',w:'demyel., warm'}[mode]:'RIGHT EYE · '+M.n.toLowerCase(),col:'var(--attack)',m:mode}];
    rows.forEach((row,ri)=>{const y=L.ys[ri],R=row.R,hh=N?14:16;
      s+=`<text x="${L.x0}" y="${L.lab[ri]}" class="t-xs" style="fill:${row.col};font-weight:700">${row.lab}</text>`;
      s+=`<circle cx="${L.ex}" cy="${y}" r="${N?10:13}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><circle cx="${L.ex-(N?4:5)}" cy="${y}" r="${N?4:5}" style="fill:var(--nuc)"/>`;
      s+=`<line x1="${L.x0}" x2="${L.cx[0]-4}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:3.5;stroke-linecap:round"/>`;
      for(let i=0;i<L.n;i++){const inL=row.m!=='h'&&L.les.includes(i),xa=R.node(i),xb=R.node(i+1);
        const pieces=!inL?[ [xa,xb,hh,'var(--myelin-line)'] ]:row.m==='r'?[ [xa,(xa+xb)/2,hh*.55,'var(--repair)'],[(xa+xb)/2,xb,hh*.55,'var(--repair)'] ]:[];
        pieces.forEach(([a,b,h2,st])=>{const inner=b-a-7;if(inner<4)return;s+=`<rect x="${f1(a+3.5)}" y="${f1(y-h2/2)}" width="${f1(inner)}" height="${f1(h2)}" rx="${f1(h2/2)}" style="fill:var(--myelin);stroke:${st};stroke-width:1"/>`})}
      if(row.m!=='h'){const xa=R.node(L.les[0]),xb=R.node(L.les[2]+1);s+=`<path d="M${f1(xa)} ${y+hh/2+5}V${y+hh/2+9}H${f1(xb)}V${y+hh/2+5}" style="fill:none;stroke:var(--attack);stroke-width:1.2"/>`}
      /* the impulse */
      const P=myPulse(R,ms/TS);
      if(P.stop){s+=`<line x1="${L.x0}" x2="${f1(P.x)}" y1="${y}" y2="${y}" style="stroke:var(--pulse);stroke-width:2;opacity:.35"/>`;
        if(P.fade>0)s+=`<circle cx="${f1(P.x)}" cy="${y}" r="${f1(6+14*(1-P.fade))}" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(P.fade)}"/>`;
        else s+=`<text x="${f1(P.x)}" y="${y+hh/2+24}" class="t-xs" style="fill:var(--bad)">${N?'most fibres block':'most fibres block; a few get through'}</text>`}
      else if(!P.done){s+=`<line x1="${L.x0}" x2="${f1(P.x)}" y1="${y}" y2="${y}" style="stroke:var(--pulse);stroke-width:2;opacity:.45"/><circle cx="${f1(P.x)}" cy="${f1(y-(P.lift||0)*12)}" r="8" style="fill:var(--pulse);opacity:.25"/><circle cx="${f1(P.x)}" cy="${f1(y-(P.lift||0)*12)}" r="4" style="fill:var(--pulse)"/>`}
      else{const a=row.m==='w'?.35:1;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" style="stroke:var(--pulse);stroke-width:2;opacity:${f1(.3*a)}"/><circle cx="${L.cx[0]+(N?14:22)}" cy="${y}" r="${f1(6+4*Math.max(0,P.fade))}" style="fill:var(--pulse);opacity:${f1(.3+.5*a)}"/>`}});
    /* traces */
    const X=m=>lerp(L.px0,L.px1,m/250),Y=v=>L.base-v*L.sc;
    s+=`<line x1="${L.px0}" x2="${L.px1}" y1="${L.base}" y2="${L.base}" class="axis"/>`;
    s+=`<line x1="${f1(X(100))}" x2="${f1(X(100))}" y1="${L.top}" y2="${L.base+40}" class="grid"/><text x="${f1(X(100))}" y="${L.axl}" class="t-xs t-mid">≈100 ms · P100</text><text x="${L.px1}" y="${L.axl}" class="t-xs t-end">time after the flash →</text>`;
    const tr=(lat,amp,col,dash)=>{let d='';for(let m=0;m<=ms;m+=2){d+=(d?'L':'M')+f1(X(m))+' '+f1(Y(wave(m,lat,amp)))}return d?`<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linejoin:round;${dash?'stroke-dasharray:6 4':''}"/>`:''};
    s+=tr(latH,1,'var(--brand)',true)+tr(latA,M.amp,'var(--attack)',false);
    const pk=(lat,amp,col,lab,dy)=>ms>=lat?`<circle cx="${f1(X(lat))}" cy="${f1(Y(amp))}" r="3.5" style="fill:${col}"/><text x="${f1(X(lat)+8)}" y="${f1(Y(amp)+dy)}" class="t-xs" style="fill:${col};font-weight:700">${lab}</text>`:'';
    const close=Math.abs(latA-latH)<8;
    s+=pk(latH,1,'var(--brand)','left eye',-4)+pk(latA,M.amp,'var(--attack)','right eye',close?12:-4);
    s+=`<line x1="${f1(X(ms))}" x2="${f1(X(ms))}" y1="${L.top}" y2="${L.base+30}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
    if(N)s+=`<text x="${L.px0}" y="${L.leg[0]}" class="t-xs" style="fill:var(--brand)">- - left eye, healthy nerve</text><text x="${L.px0}" y="${L.leg[1]}" class="t-xs" style="fill:var(--attack)">—— right eye, ${M.n.toLowerCase()}</text>`;
    else s+=`<text x="${L.px0}" y="${L.top-6}" class="t-xs">VEP traces: dashed = left eye, solid = right eye</text>`;
    vsvg.innerHTML=s;
    const dl=latA-latH;
    $('#myVepRead').innerHTML=`<span>Left eye P100 <b>${ms>=latH?'on time':'not yet'}</b></span><span>Right eye P100 <b>${ms<latA?'not yet':dl<1?'on time':dl<8?'slightly late':'late'}${ms>=latA&&M.amp<.8?', smaller':''}</b></span><span>Right optic nerve <b>${M.n.toLowerCase()}</b></span>`;
  }
  const vstop=playWire(vr,$('#myVepPlay'),drawVep,6000,'Replay','myelin');
  $('#myModes').innerHTML=MY_VM.map((m,i)=>`<button class="btn" data-vm="${i}" aria-pressed="${i===vm}">${m.n}</button>`).join('');
  const vNote=()=>{$('#myVepNote').innerHTML=noteHTML(MY_VM[vm].note)};
  $('#myModes').addEventListener('click',e=>{const b=e.target.closest('[data-vm]');if(!b)return;vm=+b.dataset.vm;
    $$('[data-vm]',$('#myModes')).forEach(x=>x.setAttribute('aria-pressed',x===b));vNote();vstop();drawVep(+vr.value)});
  vNote();drawVep(+vr.value);

  /* ---------- 3. oligodendrocyte vs Schwann cell ---------- */
  const gsv=$('#myGlia');
  function drawGlia(){const N=vb(gsv,'720 230','400 458');
    const A=N?{x:12,y:0,w:376}:{x:16,y:0,w:330},B=N?{x:12,y:226,w:376}:{x:380,y:0,w:324};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* CNS */
    const ys=[56,98,150,192].map(v=>A.y+v),cx=A.x+A.w*.42,cy=A.y+124;
    s+=`<text x="${A.x}" y="${A.y+22}" class="t-sm" style="fill:var(--ink)">CNS · OLIGODENDROCYTE</text><text x="${A.x+A.w}" y="${A.y+22}" class="t-xs t-end" style="fill:var(--attack);font-weight:700">MS target</text>`;
    ys.forEach((y,i)=>{const sx=A.x+A.w*(.5+(i%2?.12:-.04)),sw=A.w*.2;
      s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:3"/>`;
      [-1,1].forEach(d=>{const ox=sx+d*(sw+8);if(ox<A.x||ox+sw>A.x+A.w)return;s+=`<rect x="${f1(ox)}" y="${y-6}" width="${f1(sw)}" height="12" rx="6" style="fill:none;stroke:var(--myelin-line);stroke-dasharray:3 3;opacity:.6"/>`});
      s+=`<rect x="${f1(sx)}" y="${y-6}" width="${f1(sw)}" height="12" rx="6" style="fill:var(--myelin);stroke:var(--myelin-line)"/>`;
      s+=`<path d="M${f1(cx)} ${cy}Q${f1((cx+sx+sw/2)/2)} ${f1((cy+y)/2)} ${f1(sx+sw/2)} ${y+(y<cy?6:-6)}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.6"/>`});
    s+=myOligo(cx,cy,11,1);
    s+=`<text x="${A.x}" y="${A.y+222}" class="t-xs">one cell, one internode on each of 40–60 axons</text>`;
    /* PNS */
    const y=B.y+124;
    s+=`<text x="${B.x}" y="${B.y+22}" class="t-sm" style="fill:var(--ink)">PNS · SCHWANN CELL</text><text x="${B.x+B.w}" y="${B.y+22}" class="t-xs t-end">spared in MS</text>`;
    s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${y}" y2="${y}" style="stroke:var(--axon);stroke-width:3"/>`;
    const n=4,gp=8,sw=(B.w-gp*(n+1))/n;
    for(let i=0;i<n;i++){const sx=B.x+gp+i*(sw+gp);
      s+=`<rect x="${f1(sx)}" y="${y-11}" width="${f1(sw)}" height="22" rx="11" style="fill:var(--myelin);stroke:var(--myelin-line)"/><ellipse cx="${f1(sx+sw/2)}" cy="${y-13}" rx="${f1(sw*.18)}" ry="5" style="fill:var(--nuc);opacity:.85"/>`;
      if(i===1)s+=`<path d="M${f1(sx+sw/2)} ${y-20}V${y-46}" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(sx+sw/2)}" y="${y-52}" class="t-xs t-mid">Schwann cell nucleus</text>`}
    s+=`<text x="${B.x}" y="${B.y+222}" class="t-xs">one cell, one internode of one axon</text>`;
    gsv.innerHTML=s}
  drawGlia();
  const pr=redraws.myelin;redraws.myelin=()=>{pr&&pr();drawGlia()};

  /* ---------- 4. cards ---------- */
  $('#myCards').innerHTML=`
   <div class="card"><span class="kicker">Why symptoms come and go</span><h4>Block, then recovery</h4><p>Relapse symptoms come mainly from conduction block. Remission comes from remyelination, resolving inflammation, or restored conduction along axons that stay demyelinated. [[Smith1999]] See <a href="#relapse" data-go="relapse">A relapse, week by week</a>.</p></div>
   <div class="card"><span class="kicker">Positive symptoms</span><h4>Tingling, shocks, pain</h4><p>Bare axons can fire on their own, respond to stretch and excite neighbours (ephaptic cross-talk). [[Smith1999]] Cross-talk between single fibres was recorded directly in dysmyelinated roots of dystrophic mice, crossing in 240 μs or less. That is an animal model, not MS tissue. [[Rasminsky1980]]</p></div>
   <div class="card"><span class="kicker">Fatigue in the wire</span><h4>Single impulses pass, trains fail</h4><p>Persistently demyelinated axons conduct single impulses but transmit trains of impulses poorly, which is linked to weakness and fatigue. [[Smith1999]] In demyelinated rat central axons the refractory period was typically 2–5 times normal, up to 34 times. [[Felts1997]]</p></div>
   <div class="card"><span class="kicker">4-aminopyridine</span><h4>Blocking the exposed K+ channels</h4><p>4-AP prolongs the action potential of demyelinated fibres and can restore blocked conduction. [[Sherratt1980,Rasband1998]] <span class="ev est">Established</span> In the phase III trial of prolonged-release fampridine, 35% (78/224) were timed-walk responders vs 8% (6/72) on placebo. [[Goodman2009]] <b>Debated:</b> where it acts. The label states its mechanism "has not been fully elucidated", and a review notes it may act at synaptic terminals instead. [[AmpyraLabel2026,ArancibiaCarcamo2014]]</p></div>
   <div class="card"><span class="kicker">Remyelination</span><h4>More common than once thought</h4><p>New lesions normally remyelinate unless new activity interrupts them, the 1993 authors concluded. [[Prineas1993]] 20% of patients in one autopsy series had extensive remyelination, including some with progressive MS. [[Patrikios2006]] <span class="ev early">Early evidence</span> In aged rats, precursor cells lose the ability to mature; fasting or metformin restored it. [[Neumann2019]]</p></div>
   <div class="card"><span class="kicker">Controversy</span><h4>Who rebuilds the myelin?</h4><p>Rodent work says new oligodendrocytes made from precursors. [[Franklin2017]] Carbon-14 dating found only old oligodendrocytes in human shadow plaques. [[Yeung2019]] In large-animal models, surviving mature oligodendrocytes can re-ensheath axons. [[Duncan2018]] The answer matters for drugs that push precursors to mature.</p></div>
   <div class="card"><span class="kicker">Heat</span><h4>60–80% notice it</h4><p>is the estimated share of people with MS whose symptoms worsen temporarily with heat. [[Davis2010]] A scoping review found exercise-induced heat sensitivity reported in 29–80%, and cooling before or during exercise can reduce it. [[Silarova2024]] More in <a href="#living" data-go="living">Living with MS</a>.</p></div>
   <div class="card"><span class="kicker">A blood trace of axon damage</span><h4>Neurofilament light</h4><p>Median serum NfL was 29.6 pg/ml without gadolinium-enhancing lesions, 43.4 with brain or spinal enhancing lesions and 62.5 with both. Levels above the 97.5th percentile of healthy controls predicted relapses and EDSS worsening. [[Disanto2017]]</p></div>`;
};
