/* =============== home: the brain's balance of calming and exciting signals, before, during and after heavy drinking =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the scene is in the 'drinking stops' phase. */
const HERO_CAP=['Schematic, not to scale: receptor counts and the tilt of the beam show a direction of change, not measurements. Module 1.3 tells the story with sources.',
  'Schematic, not to scale. Stopping suddenly after long, heavy daily drinking can be dangerous: get medical help to stop safely.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* five schematic phases along the scrubber */
  const PH=[{from:0,t:'In balance',sub:'calming and exciting signals even',k:'before'},
    {from:.18,t:'Drinking',sub:'alcohol boosts calming GABA, damps glutamate',k:'drinking'},
    {from:.4,t:'The brain adapts',sub:'heavy drinking: fewer GABA-A, more NMDA',k:'adapted'},
    {from:.64,t:'Drinking stops',sub:'adapted brain, no alcohol: over-excited',k:'stopped'},
    {from:.84,t:'Rebalancing',sub:'over time without alcohol',k:'after'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const eth=ramp(t,.18,.26)*(1-ramp(t,.64,.69));
    const adapt=ramp(t,.42,.6)*(1-ramp(t,.86,1));/* 0 = baseline receptors, 1 = fully adapted */
    const ng=lerp(4,2,adapt),nn=lerp(3,5,adapt);
    const inh=ng/4*(1+eth*.8),exc=nn/3*(1-eth*.5),tilt=clamp((exc-inh)*1.2,-1,1);
    return {eth,ng,nn,inh,exc,tilt}}
  function draw(t){const N=vb(svg,'520 300','400 300');const S=state(t),p=phase(t),P=PH[p];
    const L=N?{sx:100,sy:156,ss:1.25,bx:302,by:118,bw:130,lx:20,ly:34,tx:20,ty:262,tw:360,wrap:true}
             :{sx:132,sy:150,ss:1.35,bx:392,by:118,bw:172,lx:24,ly:36,tx:24,ty:270,tw:472,wrap:false};
    let s='';
    /* phase title */
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${p===3?'var(--glu)':p===1?'var(--gaba)':'var(--ink)'}">${P.t}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${P.sub}</text>`;
    /* the synapse */
    s+=synapse(L.sx,L.sy,L.ss,{gaba:Math.round(S.ng),nmda:Math.round(S.nn),gt:.5,gl:.5,eth:S.eth,cl:clamp(S.inh*.5),ca:clamp(S.exc*.45*(1-S.eth*.6)),block:S.eth*.8,spark:ramp(S.tilt,.3,1),seed:3});
    s+=`<text x="${L.sx-60*L.ss}" y="${L.sy+52*L.ss}" class="t-xs" style="fill:var(--gaba)">GABA-A</text><text x="${L.sx+60*L.ss}" y="${L.sy+52*L.ss}" class="t-xs t-end" style="fill:var(--glu)">NMDA</text>`;
    if(S.eth>.05){const ex=L.bx-L.bw/2,ey=L.by+(N?96:92);s+=`${mol(ex,ey,'eth',{r:4.5,op:S.eth})}<text x="${f1(ex+9)}" y="${f1(ey+3.5)}" class="t-xs" style="opacity:${f1(S.eth)}">alcohol (ethanol) in the gap</text>`}
    /* the balance: calming (GABA) on the left, exciting (glutamate) on the right */
    s+=balance(L.bx,L.by,L.bw,{tilt:S.tilt,ln:Math.round(clamp(S.inh*3,1,6)),rn:Math.round(clamp(S.exc*3,1,6)),lsub:'calming',rsub:'exciting'}).svg;
    /* phase strip */
    const sw=L.tw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.tx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ty}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(i===3?'var(--glu-fill)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ty+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.k}</text>`});
    const mx=L.tx+L.tw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ty+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===3?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,14000,'%t:player.replay%','home');draw(+rg.value);
};
