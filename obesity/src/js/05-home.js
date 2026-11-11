/* =============== home: the appetite loop between gut, fat and brain, and how it pushes back =============== */
/* Everything drawn here is a schematic with no figures: the hormone particles and neuron glows show direction and
   balance, not amounts or times. Modules 1.4, 1.6 and 3.2 tell the story with sources. */
const HERO_CAP='Schematic, not to scale: no amounts or times are shown. Modules 1.4, 1.6 and 3.2 give them, with sources.';
const HERO_PH=[
  {from:0,t:'Before a meal',sub:'the stomach sends ghrelin; hunger neurons fire',k:'hungry'},
  {from:.17,t:'A meal arrives',sub:'the gut releases GLP-1 and PYY',k:'meal'},
  {from:.34,t:'Fullness',sub:'fullness neurons win; the drive to eat fades',k:'full'},
  {from:.5,t:'Stores report in',sub:'fat cells send leptin, a slow signal',k:'stores'},
  {from:.67,t:'After weight loss',sub:'leptin falls, hunger pushes back: biology',k:'after loss'},
  {from:.84,t:'A GLP-1 medicine',sub:'adds its own long-lasting fullness signal',k:'medicine'}];
/* the level of each signal along the schematic loop, 0..1 */
function heroLv(t){
  const ghr=Math.max(1-ramp(t,.14,.3),.15*bump(t,.5,.66),bump(t,.66,.86)*.95),
        glp=bump(t,.15,.5)*1,fill=Math.max(bump(t,.14,.6),0),
        size=t<.62?.62:lerp(.62,.22,ease(ramp(t,.62,.78))),
        lep=bump(t,.46,.7)*1+(t>.66?.18:0),
        drug=ramp(t,.84,.92),
        pomc=clamp(Math.max(ramp(t,.2,.36)*(1-ramp(t,.55,.7)),drug*.95)),
        agrp=clamp(Math.max(1-ramp(t,.18,.32),ramp(t,.68,.76)*(1-drug*.6))),
        mc4r=pomc*(1-agrp*.5);
  return {ghr:clamp(ghr),glp:clamp(glp),fill:clamp(fill),size,lep:clamp(lep),drug,pomc,agrp,mc4r}}
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* particles travel along a quadratic curve from a source to the brain; ph shifts them so they stream */
  const stream=(a,b,bend,kind,n,lv,ph,r)=>{if(lv<=.02)return '';let s='';const c=[(a[0]+b[0])/2+bend[0],(a[1]+b[1])/2+bend[1]];
    s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:${HORMONE_INFO[kind].col};stroke-width:1.2;stroke-dasharray:2 4;opacity:${f1(lv*.55)}"/>`;
    const m=Math.max(1,Math.round(n*lv));
    for(let i=0;i<m;i++){const u=((i/m)+ph)%1,q=1-u,x=q*q*a[0]+2*q*u*c[0]+u*u*b[0],y=q*q*a[1]+2*q*u*c[1]+u*u*b[1];s+=hormoneDot(x,y,kind,{r,op:clamp(lv*1.4)*(u<.08?u/.08:u>.92?(1-u)/.08:1)})}
    return s};
  function draw(t){const N=vb(svg,'520 300','400 560'),p=phaseOf(HERO_PH,t),P=HERO_PH[p],V=heroLv(t),ph=RM?0:(t*14)%1;
    const L=N?{tx:12,ty:24,bx:20,by:50,bs:1.3,gx:6,gy:266,gs:.92,fx:212,fy:292,fw:176,fh:96,px:300,py:426,ps:.9,kx:214,ky:454,lx:12,ly:540,lw:376,r:5.5}
             :{tx:14,ty:24,bx:252,by:30,bs:1.0,gx:18,gy:62,gs:.74,fx:178,fy:190,fw:118,fh:60,px:338,py:222,ps:.62,kx:402,ky:206,lx:14,ly:276,lw:492,r:4.6};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:19px;fill:${p===4?'var(--accent)':p===5?'var(--tx)':'var(--brand)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+15}" class="t-sm">${P.sub}</text>`;
    /* gut, fat tissue, brain */
    const G=gutTract(L.gx,L.gy,L.gs,{fill:V.fill,food:t>.15&&t<.5?ramp(t,.15,.5)*.42:null,glow:{stomach:V.ghr*.9,ileum:V.glp}});
    s+=G.svg;
    const F=adiposeTissue(L.fx,L.fy,L.fw,L.fh,{size:V.size,seed:4,frame:true,cell:N?30:24});
    s+=F.svg+kitLabel(L.fx+L.fw/2,L.fy+L.fh+13,'fat tissue',{a:'m'})+kitLabel(G.at.stomach[0]+6,G.at.stomach[1]-20,'stomach',{a:'m'})+kitLabel(G.at.ileum[0],G.at.ileum[1]+22,'gut',{a:'m'});
    const B=brainHypothalamus(L.bx,L.by,L.bs,{pomc:V.pomc,agrp:V.agrp,mc4r:V.mc4r,labels:true});
    s+=B.svg;
    const tgt=B.at.bloodIn;
    /* the signals */
    s+=stream(G.at.stomach,tgt,N?[60,-40]:[20,-70],'ghrelin',7,V.ghr,ph,L.r);
    s+=stream(G.at.ileum,tgt,N?[90,-10]:[40,-40],'glp1',6,V.glp,(ph+.33)%1,L.r);
    s+=stream([G.at.ileum[0]+10,G.at.ileum[1]+6],tgt,N?[110,10]:[60,-20],'pyy',5,V.glp*.85,(ph+.6)%1,L.r);
    s+=stream([L.fx+L.fw*.6,L.fy+4],tgt,N?[60,-30]:[40,-30],'leptin',6,V.lep,(ph+.15)%1,L.r);
    if(V.drug>0){const Pn=pen(L.px,L.py,L.ps,{needle:V.drug,press:ramp(t,.9,.96),op:V.drug});s+=`<g style="opacity:${f1(V.drug)}">${Pn.svg}</g>`;
      s+=stream(Pn.at.back,tgt,N?[-70,-60]:[30,-50],'drug',5,V.drug,(ph+.45)%1,L.r)}
    /* legend */
    const keys=[['ghrelin','ghrelin (hunger)'],['glp1','GLP-1 (fullness)'],['pyy','PYY (fullness)'],['leptin','leptin (stores)'],['drug','GLP-1 medicine']];
    keys.forEach((k,i)=>{const x=L.kx,y=L.ky+i*(N?15:13);
      s+=hormoneDot(x+5,y,k[0],{r:4})+`<text x="${f1(x+15)}" y="${f1(y+3.5)}" class="t-xs">${k[1]}</text>`});
    /* phase strip */
    const sw=L.lw/HERO_PH.length;
    HERO_PH.forEach((q,i)=>{const on=i===p,x=L.lx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ly-8}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ly+12}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.k}</text>`});
    const mx=L.lx+L.lw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ly-5}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    if(cap.textContent!==HERO_CAP)cap.textContent=HERO_CAP;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,24000,'%t:player.replay%','home');draw(+rg.value);
};
