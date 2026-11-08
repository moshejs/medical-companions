/* =============== home: a clot, a core and penumbra that spread with the clock, and what restoring flow saves =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until it is written from the research. Everything drawn here is a
   schematic with no figures: the time axis and the tissue areas have no scale. Module 1.3 tells the story with sources. */
const HOME_CAP='Schematic, not to scale: no times or volumes are shown here. Module 1.3 gives them, with sources.';
const HOME_PH=[
  {from:0,t:'Blood reaches the brain',sub:'the middle cerebral artery feeds its territory',k:'flow'},
  {from:.15,t:'A clot lodges',sub:'flow stops beyond it, and the clock starts',k:'clot'},
  {from:.3,t:'Core and penumbra',sub:'a core of dead tissue inside a rim still at risk',k:'core'},
  {from:.47,t:'The core spreads',sub:'while flow stays blocked, the penumbra is lost to it',k:'spread'},
  {from:.64,t:'Flow returns',sub:'the clot is gone, the core stops growing, the rim is saved',k:'reflow'},
  {from:.82,t:'Saved or lost',sub:'the same stroke, with flow restored and without it',k:'versus'}];
const HOME_T={clot:.2,grow:.3,reflow:.68};
/* the core's share of the tissue at risk, 0..1: one path until flow returns, then flat if it does */
function homeCore(t,reflowed){return lerp(.1,1,ramp(reflowed?Math.min(t,HOME_T.reflow):t,HOME_T.grow,.98))}
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* one comparison strip: x is time; core rises under a shrinking penumbra, and turns to 'saved' after reflow */
  function strip(x,y,w,h,t,re,lbl){const X=u=>x+u*w,Y=v=>y+h-v*h,N=50;
    const u0=HOME_T.grow,upto=clamp(t),end=Math.max(upto,u0);
    const pts=[];for(let i=0;i<=N;i++){const u=lerp(u0,end,i/N);pts.push([u,homeCore(u,re)])}
    const cd=ptsD(pts.map(p=>[X(p[0]),Y(p[1])]));
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="3" style="fill:var(--field);stroke:var(--line);stroke-width:1"/>`;
    if(upto>u0){
      /* the whole territory at risk, above the core */
      const ee=re?Math.min(end,HOME_T.reflow):end;
      s+=`<rect x="${f1(X(u0))}" y="${f1(y)}" width="${f1(X(ee)-X(u0))}" height="${f1(h)}" style="fill:var(--penumbra);opacity:.75"/>`;
      if(re&&end>HOME_T.reflow)s+=`<rect x="${f1(X(HOME_T.reflow))}" y="${f1(y)}" width="${f1(X(end)-X(HOME_T.reflow))}" height="${f1(h)}" style="fill:var(--salvage);opacity:.75"/>`;
      s+=`<path d="${cd}L${f1(X(end))} ${f1(y+h)}L${f1(X(u0))} ${f1(y+h)}Z" style="fill:var(--core);opacity:.95"/>`;
      if(re&&end>=HOME_T.reflow)s+=`<line x1="${f1(X(HOME_T.reflow))}" x2="${f1(X(HOME_T.reflow))}" y1="${f1(y-3)}" y2="${f1(y+h+3)}" style="stroke:var(--ink);stroke-width:1.4"/>`}
    s+=`<text x="${f1(x)}" y="${f1(y-5)}" class="t-xs" style="fill:var(--ink);font-weight:700">${lbl}</text>`;
    return s}
  function draw(t){const N=vb(svg,'520 300','400 532'),p=phaseOf(HOME_PH,t),P=HOME_PH[p];
    const L=N?{tx:12,ty:24,bx:60,by:44,bs:.94,ax:12,ay:300,aw:376,ah:44,cx:352,cy:82,cr:26,sx:12,sy:380,sw:300,sh:30,sg:56,mx:322,ms:.22,lx:12,ly:498,lw:376}
             :{tx:14,ty:24,bx:4,by:44,bs:.8,ax:262,ay:64,aw:246,ah:42,cx:232,cy:66,cr:0,sx:262,sy:146,sw:176,sh:30,sg:56,mx:442,ms:.22,lx:14,ly:266,lw:492};
    const re=t>=HOME_T.reflow,clotIn=ramp(t,.15,HOME_T.clot),clotGone=ramp(t,HOME_T.reflow-.05,HOME_T.reflow+.02);
    const occl=clotIn>=1&&!re,saved=ramp(t,HOME_T.reflow,HOME_T.reflow+.12);
    /* until flow returns the two paths are one: the core grows at the same rate */
    const coreNo=homeCore(t,false),cNow=homeCore(t,true);
    const appear=ramp(t,.28,.34),penR=78*appear,coreR=lerp(10,78,ramp(cNow,.1,1))*appear;
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:19px;fill:${p===4||p===5?'var(--rec)':p>=1?'var(--accent)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+15}" class="t-sm">${P.sub}</text>`;
    /* the brain */
    const lesion=appear>0?{at:[150,108],core:coreR,penumbra:penR,saved,mca:true}:null;
    const B=brainSide(L.bx,L.by,L.bs,{vessels:{occl:occl?'m1':undefined,ph:t*6,flow:occl?.8:1},lesion});
    s+=B.svg;
    if(lesion&&p>=2){const q=B.at.lesion;s+=kitLabel(q[0],q[1]+3,'core',{a:'m'})+kitLabel(q[0],q[1]+(penR*L.bs)-6,saved>.5?'saved':'penumbra',{a:'m'})}
    /* the artery close-up */
    const artW=L.aw,art=artery(L.ax,L.ay,artW,{h:L.ah,ph:t*14,clot:clotIn*(1-clotGone),at:.56,flow:occl?0:1});
    s+=`<text x="${L.ax}" y="${L.ay-5}" class="t-xs" style="fill:var(--ink);font-weight:700">inside the artery</text>`+art.svg;
    /* the clock: running while flow is blocked, stopped when flow returns */
    if(N){s+=clock(L.cx,L.cy,L.cr,ramp(Math.min(t,HOME_T.reflow),HOME_T.clot,HOME_T.reflow)*60*2.6,{full:60*2.6,col:'var(--accent)',ticks:12,label:'time'})}
    else{const cx=L.ax+artW-16,cy=38;s+=clock(cx,cy,15,ramp(Math.min(t,HOME_T.reflow),HOME_T.clot,HOME_T.reflow)*60*2.6,{full:60*2.6,col:'var(--accent)',ticks:4})+`<text x="${cx-20}" y="${cy+3}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">time</text>`}
    /* comparing the two paths */
    s+=strip(L.sx,L.sy,L.sw,L.sh,t,true,'flow restored');
    s+=strip(L.sx,L.sy+L.sg,L.sw,L.sh,t,false,'flow not restored');
    /* the two brains at the end of each strip */
    const mb1=brainSide(L.mx,L.sy-18,L.ms,{lesion:appear>0?{at:[150,108],core:coreR,penumbra:penR,saved:saved,mca:true}:null});
    const mcore=lerp(10,92,ramp(coreNo,.1,.95))*appear;
    const mb2=brainSide(L.mx,L.sy+L.sg-18,L.ms,{lesion:appear>0?{at:[150,108],core:mcore,penumbra:Math.max(penR,mcore),saved:0,mca:true}:null});
    s+=mb1.svg+mb2.svg;
    /* the legend for the strips, with words, not colour alone */
    const lg=[['var(--core)','core'],['var(--penumbra)','penumbra'],['var(--salvage)','saved']];
    const ly0=L.sy+L.sg+L.sh+14;
    lg.forEach(([c,n],i)=>{const lx=L.sx+i*(N?78:62);s+=`<rect x="${lx}" y="${ly0-8}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${lx+12}" y="${ly0}" class="t-xs">${n}</text>`});
    /* phase strip */
    const sw=L.lw/HOME_PH.length;
    HOME_PH.forEach((q,i)=>{const on=i===p,x=L.lx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ly}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ly+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.k}</text>`});
    const mx=L.lx+L.lw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ly+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    if(cap.textContent!==HOME_CAP)cap.textContent=HOME_CAP;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,20000,'%t:player.replay%','home');draw(+rg.value);
};
