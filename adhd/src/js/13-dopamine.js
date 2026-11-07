/* =============== 1.3 Dopamine & noradrenaline =============== */
/* one release event; t in [0,1] is schematic time */
const DA_PH=[0,.16,.32,.5,.68];
function daLevel(t){if(t<.3)return 0;if(t<.46)return ease(ramp(t,.3,.46));if(t<.68)return 1-.08*ramp(t,.46,.68);return .92*Math.exp(-(t-.68)/.085)}
const DA_COMMON=[
 {from:DA_PH[0],at:.08,k:'Step 1 · the signal',t:'An impulse arrives',
  txt:`An electrical impulse, the action potential, runs down the axon to the terminal. Dopamine neurons in the midbrain send two branches that matter for ADHD models: a mesocortical branch to the prefrontal cortex and a mesolimbic branch to the nucleus accumbens in the ventral striatum. Noradrenaline fibres reach the prefrontal cortex too. Both messengers modulate the fronto-striato-cerebellar circuits that support executive function. [[SonugaBarke2002,DelCampo2011]]`,
  pt:`Dopamine and noradrenaline are chemical messengers that help the brain focus and stay motivated. [[Faraone2018Pharm,DelCampo2011]]`},
 {from:DA_PH[1],at:.25,k:'Step 2 · release',t:'A vesicle fuses',
  txt:`The impulse makes a vesicle, a bubble packed with transmitter, fuse with the membrane and empty into the cleft. This is ordinary release by exocytosis. Amphetamines are unusual because they release catecholamines mainly by a different, non-exocytic route, which is why they are called releasers (see <a href="#stimulants" data-go="stimulants">How stimulants work</a>). [[Sulzer2005]]`,
  pt:`The message is stored in tiny bubbles. When the signal arrives, a bubble opens and pours the messenger into the gap.`,
  hook:`Normal release is exocytic (vesicle fusion). Amphetamine release is mainly non-exocytic: from the cytosol out through the transporter. [[Sulzer2005]]`},
 {from:DA_PH[2],at:.42,k:'Step 3 · the cleft',t:'Transmitter fills the gap',
  txt:`For a moment the cleft fills with transmitter (the graph). In the prefrontal cortex, networks of pyramidal cells hold goals "in mind" by exciting each other, and small changes in noradrenaline or dopamine have large effects on them. [[Arnsten2009CNS]]`,
  pt:`For a split second the gap between the two cells fills with the messenger.`}
];
const DA_STEPS={
 da:DA_COMMON.concat([
  {from:DA_PH[3],at:.6,k:'Step 4 · receptors',t:'Dopamine binds its receptors',
   txt:`Dopamine binds receptors on the next cell. In the prefrontal cortex, moderate dopamine acts at <b>D1</b> receptors, weakening irrelevant inputs. In the striatum, PET in 53 never-medicated adults with ADHD found lower D2/D3 receptor availability in the accumbens (binding potential 2.68 vs 2.85 in controls) and midbrain, and lower availability went with worse attention ratings. [[Arnsten2009CNS,Volkow2009]]`,
   pt:`The messenger fits into receptors on the next cell like a key into a lock, and that passes the message on.`,
   hook:`D1 (prefrontal): moderate dopamine weakens irrelevant inputs. Lower accumbens D2/D3 availability in never-medicated adults with ADHD. [[Arnsten2009CNS,Volkow2009]]`},
  {from:DA_PH[4],at:.84,k:'Step 5 · clean-up',t:'DAT pulls dopamine back',
   txt:`The dopamine transporter (<b>DAT</b>) pumps dopamine back into the terminal, ending the signal; in the striatum this is the main route. Methylphenidate blocks this reuptake. Whether DAT is lower or higher in ADHD is unresolved: lower in the accumbens of never-medicated adults (0.63 vs 0.71), higher in other scans, and raised 24% after a year of methylphenidate. [[FDA-RitalinC,Volkow2009,FusarPoli2012,Wang2013DAT]]`,
   pt:`A recycling pump pulls the messenger back into the first cell so the signal stops. ADHD medicines slow this pump down.`,
   hook:`DAT clears dopamine in the striatum; NET clears both dopamine and noradrenaline in the prefrontal cortex. [[Bymaster2002]]`}]),
 ne:DA_COMMON.concat([
  {from:DA_PH[3],at:.6,k:'Step 4 · receptors',t:'Noradrenaline binds alpha-2A',
   txt:`In the prefrontal cortex, noradrenaline's helpful effects act at postsynaptic <b>alpha-2A</b> receptors on dendritic spines. In monkeys, alpha-2A stimulation inhibits cAMP and closes HCN channels beside the receptors, which strengthens the firing that holds information during a delay; too much cAMP made network firing collapse. Guanfacine stimulates these same receptors. [[Arnsten2009CNS,Wang2007Cell,Arnsten2010]]`,
   pt:`Noradrenaline fits into special receptors on the thinking cells and helps them keep a thought "switched on".`,
   hook:`Noradrenaline → postsynaptic alpha-2A on prefrontal spines → less cAMP → HCN channels close → stronger network firing (monkeys). [[Wang2007Cell]]`},
  {from:DA_PH[4],at:.84,k:'Step 5 · clean-up',t:'NET clears both messengers',
   txt:`The noradrenaline transporter (<b>NET</b>) pumps noradrenaline back. In the prefrontal cortex it takes up dopamine as well: in rats, the selective NET blocker atomoxetine raised prefrontal noradrenaline about 3-fold <i>and</i> prefrontal dopamine about 3-fold, without changing dopamine in the striatum or accumbens. Amber dots in the cleft show that dopamine. [[Bymaster2002]]`,
   pt:`In the front of the brain, the noradrenaline pump also recycles dopamine, so blocking it raises both messengers there.`,
   hook:`Atomoxetine (NET blocker) raises prefrontal dopamine but not striatal dopamine (rat microdialysis). [[Bymaster2002]]`}])
};

inits.dopamine=()=>{
  const svg=$('#daSvg'),rg=$('#daT');let nt='da',setSt=()=>{};
  const PHN=['impulse','release','cleft','bind','clear'];
  const rr=rng(77),EX=[...Array(10)].map(()=>[34+rr()*132,99+rr()*14]);
  function draw(t){const N=vb(svg,'720 380','400 600'),lv=daLevel(t),ph=phaseOf(DA_STEPS[nt],t),ne=nt==='ne',c=ne?'var(--ne)':'var(--da)';
    const L=N?{sx:50,sy:40,ss:300,ax:56,ay:356,aw:316,ah:170}:{sx:40,sy:42,ss:280,ax:404,ay:62,aw:290,ah:210};
    const k=L.ss/200,P=(px,py)=>[L.sx+px*k,L.sy+py*k];let s='';
    s+=`<text x="${N?20:40}" y="22" class="t-sm" style="fill:${c}">${ne?'NORADRENALINE TERMINAL · PREFRONTAL CORTEX':'DOPAMINE TERMINAL · STRIATUM'}</text>`;
    const S=synapse(L.sx,L.sy,L.ss,{nt,level:lv,fuse:ramp(t,.16,.34),uptake:t>=.62?ramp(t,.62,.7)*(lv>.04?1:ramp(lv,0,.04)):0,bound:lv,labels:true,tlabel:ne?'NET':'DAT',seed:5});
    s+=S.svg;
    /* the action potential: a glow travelling down the axon */
    if(t<.22){const u=ramp(t,0,.17),[ax,ay]=P(100,lerp(-4,58,u));s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(9*k)}" style="fill:var(--brand);opacity:${f1(.25*(1-ramp(t,.17,.22)))}"/><circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(4*k)}" style="fill:var(--brand);opacity:${f1(1-ramp(t,.17,.22))}"/>`;
      const [lx,ly]=P(126,8);s+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-xs" style="fill:var(--brand)">action potential</text>`}
    /* dopamine also present in the prefrontal cleft, cleared by NET */
    if(ne){const n=Math.round(lv*EX.length);for(let i=0;i<n;i++){const [px,py]=P(EX[i][0],EX[i][1]);s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.6*k)}" style="fill:var(--da);stroke:var(--panel);stroke-width:.6"/>`}}
    { const [rx,ry]=P(100,134);s+=`<text x="${f1(rx)}" y="${f1(ry)}" class="t-xs t-mid" style="fill:var(--rcpt)">${ne?'alpha-2A receptors (on dendritic spines)':'D1 / D2 receptors'}</text>`}
    if(ph===4&&ne){const [lx,ly]=P(100,170);s+=`<text x="${f1(lx)}" y="${f1(ly+14)}" class="t-xs t-mid" style="fill:var(--da)">● dopamine is cleared by NET here too</text>`}
    /* where in the brain */
    if(!N){const B=brain(40,306,86,{hl:[ne?'pfc':'str'],sulci:false});s+=B.svg;
      s+=`<text x="140" y="330" class="t-lbl">${ne?'Prefrontal cortex':'Striatum'}</text><text x="140" y="346" class="t-xs">${ne?'attention, working memory, inhibition':'caudate, putamen, nucleus accumbens'}</text><text x="140" y="360" class="t-xs">${ne?'transporter: NET (takes up NE and DA)':'transporter: DAT'}</text>`}
    /* cleft level over time */
    const A=axes(L.ax,L.ay,L.aw,L.ah,{x0:0,x1:1,y0:0,y1:1.1,yt:[0,.5,1],fy:v=>v===1?'peak':v?'half':'0',grid:true});
    s+=`<text x="${L.ax}" y="${L.ay-12}" class="t-sm" style="fill:${c}">${ne?'NORADRENALINE':'DOPAMINE'} IN THE CLEFT</text>`+A.svg;
    DA_PH.forEach((p,i)=>{const x=A.X(p);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ay}" y2="${L.ay+L.ah}" style="stroke:var(--line);stroke-width:1"/><text x="${f1(x+3)}" y="${L.ay+L.ah+14}" class="t-xs" style="fill:${i===ph?'var(--ink)':'var(--muted)'}">${PHN[i]}</text>`});
    const pts=[];for(let u=0;u<=1.0001;u+=.005)pts.push([u,daLevel(u)]);
    s+=trace(pts,A.X,A.Y,{c,upto:t,area:true,w:2.6});
    if(ne){s+=trace(pts.map(p=>[p[0],p[1]*.45]),A.X,A.Y,{c:'var(--da)',upto:t,w:1.6,dash:'4 3'});
      if(t>.4)s+=`<text x="${f1(A.X(.47))}" y="${f1(A.Y(.45)-6)}" class="t-xs" style="fill:var(--da)">dopamine</text>`}
    s+=`<circle cx="${f1(A.X(t))}" cy="${f1(A.Y(lv))}" r="4.5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<text x="${L.ax+L.aw}" y="${L.ay+L.ah+30}" class="t-xs t-end">time → (schematic)</text>`;
    svg.innerHTML=s;$('#daNote').innerHTML=noteHTML(DA_STEPS[nt][ph]);setSt(ph)}
  const stop=playWire(rg,$('#daPlay'),draw,12000,'%t:player.replay%','dopamine');
  function wire(){const old=$('#daSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,DA_STEPS[nt],rg,draw,stop)}
  wire();
  $$('[data-dant]').forEach(b=>b.addEventListener('click',()=>{nt=b.dataset.dant;$$('[data-dant]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();wire();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- inverted U [[Arnsten2009CNS,Gamo2010]] ---- */
  const usv=$('#daU'),ul=$('#daL');
  const perf=x=>Math.exp(-Math.pow((x-.5)/.22,2));
  const ZN=[{a:0,b:.3,n:'too little',c:'var(--ne)'},{a:.3,b:.7,n:'optimal',c:'var(--good)'},{a:.7,b:1,n:'too much',c:'var(--bad)'}];
  const UNOTE=[
   {k:'Too little · fatigue, boredom',t:'Under-aroused prefrontal cortex',txt:`Too little catecholamine release, as with fatigue or boredom, impairs prefrontal function. In monkeys, methylphenidate and atomoxetine at moderate doses improved working memory, and their benefits were blocked by an alpha-2 antagonist or a D1 antagonist. [[Arnsten2009CNS,Gamo2010]]`,
    pt:`The focus centre works best with a "just right" amount of these messengers. Too little, as when bored or tired, makes focusing harder. [[Arnsten2009CNS]]`},
   {k:'Optimal · alert and interested',t:'The top of the curve',txt:`Optimal levels are released when a person is alert and interested. Noradrenaline at alpha-2A receptors strengthens the right inputs and dopamine at D1 receptors weakens irrelevant ones. In monkeys, atomoxetine raised firing for the remembered direction (signal) and lowered it for other directions (noise). In rats, low oral methylphenidate doses that improved attention raised prefrontal noradrenaline and dopamine with minimal effect elsewhere. [[Arnsten2009CNS,Gamo2010,Berridge2006]]`,
    pt:`When you are interested and alert, the messengers are at the right level and the thinking cells hear the signal above the noise.`,
    hook:`Inverted U: moderate catecholamine levels improve prefrontal function; too little or too much impairs it. [[Arnsten2009CNS,Gamo2010]]`},
   {k:'Too much · stress',t:'Over-aroused: the network goes offline',txt:`Too much, as under stress, also impairs prefrontal function. Even mild, acute uncontrollable stress can cause a rapid, dramatic loss of prefrontal abilities, and prolonged stress changes prefrontal dendrites. In monkeys, higher doses of methylphenidate or atomoxetine stopped improving performance. [[Arnsten2009CNS,Arnsten2009NRN,Gamo2010]]`,
    pt:`Too much of the messengers, as under stress, also makes focusing harder. [[Arnsten2009CNS]]`,
    hook:`High end of the inverted U: acute stress rapidly impairs prefrontal cognition. [[Arnsten2009NRN]]`}];
  function uDraw(){const N=vb(usv,'720 300','400 430'),x=+ul.value,p=perf(x);
    const L=N?{x:40,y:26,w:330,h:190,bx:40,by:300,bw:330}:{x:50,y:30,w:400,h:210,bx:500,by:60,bw:190};
    const X=v=>L.x+v*L.w,Y=v=>L.y+L.h-v*L.h;let s='';
    ZN.forEach(z=>{s+=`<rect x="${f1(X(z.a))}" y="${L.y}" width="${f1(X(z.b)-X(z.a))}" height="${L.h}" style="fill:${z.c};opacity:${x>=z.a&&x<=z.b?.13:.05}"/><text x="${f1(X((z.a+z.b)/2))}" y="${L.y+14}" class="t-xs t-mid" style="fill:${z.c}">${z.n}</text>`});
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><line x1="${L.x}" x2="${L.x}" y1="${L.y}" y2="${L.y+L.h}" class="axis"/>`;
    s+=`<text x="${L.x+L.w}" y="${L.y+L.h+16}" class="t-xs t-end">catecholamine level →</text><text x="${L.x}" y="${L.y+L.h+16}" class="t-xs">low</text>`;
    s+=`<text x="${L.x-8}" y="${L.y+L.h/2}" class="t-xs t-mid" transform="rotate(-90 ${L.x-8} ${L.y+L.h/2})">prefrontal performance</text>`;
    s+=`<path d="${pathFn(u=>1-.1-perf(u)*.78,L.x,L.x+L.w,L.y,L.y+L.h)}" style="fill:none;stroke:var(--ink);stroke-width:2.4"/>`;
    const cy=L.y+L.h*(1-.1-p*.78);s+=`<line x1="${f1(X(x))}" x2="${f1(X(x))}" y1="${f1(cy)}" y2="${L.y+L.h}" style="stroke:var(--brand);stroke-dasharray:3 3"/><circle cx="${f1(X(x))}" cy="${f1(cy)}" r="8" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    /* signal and noise bars (schematic, after monkey recordings) */
    const sig=.12+.8*p,noi=x<.5?.7-.45*p:.25+.2*ramp(x,.5,1)+.25*ramp(x,.75,1);
    s+=`<text x="${L.bx}" y="${L.by-26}" class="t-sm">NETWORK FIRING (SCHEMATIC)</text>`;
    [['signal: the remembered item',sig,'var(--good)'],['noise: everything else',noi,'var(--bad)']].forEach(([n,v,cc],i)=>{const y=L.by+i*(N?44:70);
      s+=`<text x="${L.bx}" y="${y}" class="t-xs">${n}</text><rect x="${L.bx}" y="${y+6}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y+6}" width="${f1(L.bw*v)}" height="14" rx="4" style="fill:${cc}"/>`});
    const zi=x<.3?0:x<=.7?1:2;
    s+=`<text x="${L.bx}" y="${L.by+(N?104:160)}" class="t-lbl" style="fill:${ZN[zi].c}">${['Signal weak, noise high','Signal strong, noise low','Network firing collapses'][zi]}</text>`;
    usv.innerHTML=s;$('#daUNote').innerHTML=noteHTML(UNOTE[zi]);
    $$('[data-dau]').forEach(b=>b.setAttribute('aria-pressed',Math.abs(+b.dataset.dau-x)<.02))}
  ul.addEventListener('input',uDraw);
  $$('[data-dau]').forEach(b=>b.addEventListener('click',()=>{const a=+ul.value,z=+b.dataset.dau;animate(600,p=>{ul.value=lerp(a,z,ease(p));uDraw()})}));
  uDraw();

  /* ---- delay discounting (schematic hyperbolas) [[Jackson2016]] ---- */
  const dsv=$('#daDd'),dl=$('#daDel');let cur='steep';
  const K={steep:.06,shallow:.02},V=(D,k)=>100/(1+k*D);
  function dDraw(){const N=vb(dsv,'720 270','400 360'),D=+dl.value;
    const A=N?axes(52,30,320,220,{x0:0,x1:60,y0:0,y1:100,xt:[0,20,40,60],yt:[0,50,100],xl:'delay (days)',yl:'worth now (points)'}):axes(70,30,600,180,{x0:0,x1:60,y0:0,y1:100,xt:[0,10,20,30,40,50,60],yt:[0,25,50,75,100],xl:'delay to the larger reward (days)',yl:'what 100 points later is worth now'});
    let s=A.svg;
    s+=`<line x1="${f1(A.X(0))}" x2="${f1(A.X(60))}" y1="${f1(A.Y(50))}" y2="${f1(A.Y(50))}" style="stroke:var(--brand);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${f1(A.X(0)+6)}" y="${f1(A.Y(50)+14)}" class="t-xs" style="fill:var(--brand)">50 points now</text>`;
    [['shallow','var(--accent)','comparison'],['steep','var(--dz)','ADHD']].forEach(([k,c,l])=>{const pts=[];for(let d=0;d<=60;d+=.5)pts.push([d,V(d,K[k])]);
      s+=trace(pts,A.X,A.Y,{c,w:k===cur?3:1.6,dash:k===cur?'':'5 4'});
      const xe=1/K[k];if(xe<=60)s+=`<circle cx="${f1(A.X(xe))}" cy="${f1(A.Y(50))}" r="3.5" style="fill:${c}"/>`;
      s+=`<text x="${f1(A.X(k==='steep'?(N?24:30):(N?34:44)))}" y="${f1(A.Y(V(k==='steep'?(N?24:30):(N?34:44),K[k]))-8)}" class="t-xs" style="fill:${c}">${l}</text>`});
    const v=V(D,K[cur]),c=cur==='steep'?'var(--dz)':'var(--accent)';
    s+=`<line x1="${f1(A.X(D))}" x2="${f1(A.X(D))}" y1="${f1(A.Y(0))}" y2="${f1(A.Y(100))}" style="stroke:var(--ink);stroke-width:1"/><circle cx="${f1(A.X(D))}" cy="${f1(A.Y(v))}" r="7" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`;
    dsv.innerHTML=s;
    const later=v>50;
    $('#daDdRead').innerHTML=`<span>100 points in <b>${D} days</b> feels worth <b>${Math.round(v)}</b> now</span><span class="verdict ${later?'yes':'maybe'}" style="padding:4px 10px">${later?'Wait for 100 later':'Take 50 now'}</span>`}
  dl.addEventListener('input',dDraw);
  $$('[data-dadd]').forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.dadd;$$('[data-dadd]').forEach(x=>x.setAttribute('aria-pressed',x===b));dDraw()}));
  dDraw();
  const prevR=redraws.dopamine;redraws.dopamine=()=>{prevR&&prevR();uDraw();dDraw()};
};
