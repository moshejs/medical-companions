
/* =============== home: from a shared breath to a granuloma, contained or breaking down =============== */
/* Fact-free until the research passes land: the epidemiology builder may add a cited sentence to HERO_CAP. */
const HERO_CAP=['Schematic, not to scale; the timing is illustrative. About a quarter of the world is estimated to have TB infection, and most never develop TB disease. [[Houben2016,Cohen2019ERJ,Drain2018]] Press Weakened immunity to see the other ending.','Schematic, not to scale; the timing is illustrative. This ending shows a granuloma breaking down.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),ab=$('#heroAlt'),cap=$('#heroCap');let weak=false;
  /* the story runs t 0..1: exposure (0-.28), bacteria reach an air sac (.24-.42), a macrophage swallows them
     (.36-.52), a granuloma organises (.5-.8), then held in check or breaking down (.8-1). Timing is schematic. */
  const DROPS=Array.from({length:16},(_,i)=>{const r=rng(40+i);return{d:r()*.12,dy:(r()-.5)*36,w:r()*Math.PI*2,bac:i%4===1,r:2.6+r()*2.2}});
  function draw(t){const N=vb(svg,'520 300','400 400');let s=`<defs>${marker('heroArr','var(--muted)')}</defs>`;
    /* layout: two people (air) and a zoomed panel (lung) */
    const L=N?{ax:110,bx:290,py:56,ps:84,zx:20,zy:172,zw:360,zh:178,ry:386}:{ax:52,bx:196,py:112,ps:92,zx:256,zy:58,zw:250,zh:198,ry:286};
    const cx=L.zx+L.zw/2,cy=L.zy+L.zh/2+(N?8:10),R=Math.min(L.zw,L.zh)*.42;
    /* stage labels */
    const ph=t<.24?0:t<.36?1:t<.5?2:t<.8?3:4;
    const TT=['Breathing shared air','Bacteria reach an air sac','A macrophage swallows them','A granuloma walls them off',weak?'Breaking down: TB disease':'Held in check: TB infection'];
    const ST=['A person with TB disease in the lungs coughs','Tiny droplets carry a few rods deep into the lung','The bacteria survive inside it and multiply','Immune cells build a wall around them',weak?'The centre liquefies and opens into an airway':'The bacteria are held in check'];
    const col=ph<4?'var(--ink)':weak?'var(--tb)':'var(--good)';
    s+=`<text x="${N?20:18}" y="${N?26:24}" class="t-big" style="fill:${col}">${TT[ph]}</text><text x="${N?20:18}" y="${N?44:42}" class="t-sm">${ST[ph]}</text>`;
    /* people */
    const by=L.py,bs=L.ps,mouthA=[L.ax+bs*.2,by+bs*.2],noseB=[L.bx-bs*.16,by+bs*.2];
    const coughing=t<.26;
    s+=person(L.ax,by,bs,'var(--brand)',{cough:coughing&&Math.sin(t*90)>-.2,face:1});
    const sick=weak&&t>.88;
    s+=person(L.bx,by,bs,'var(--muted)',{cough:sick,face:-1});
    s+=`<text x="${L.ax}" y="${by+bs+16}" class="t-xs t-mid">has TB disease</text><text x="${L.bx}" y="${by+bs+16}" class="t-xs t-mid">${t<.24?'breathes in':ph<4?'TB infection':weak?'now TB disease':'TB infection'}</text>`;
    /* droplets drift across */
    DROPS.forEach(d=>{const k=ramp(t,d.d,d.d+.16);if(k<=0||k>=1)return;
      const px=lerp(mouthA[0],noseB[0],k),py=lerp(mouthA[1],noseB[1],k)+Math.sin(k*Math.PI)*d.dy+Math.sin(k*8+d.w)*3;
      s+=droplet(px,py,d.r,{bac:d.bac,op:1-ramp(k,.85,1)})});
    /* zoom ring at person B's chest, with guide lines to the panel */
    const zr=[L.bx+(N?0:2),by+bs*.66];
    s+=`<circle cx="${zr[0]}" cy="${f1(zr[1])}" r="9" style="fill:none;stroke:var(--brand);stroke-width:1.6"/>`;
    s+=N?`<path d="M${zr[0]-4} ${by+bs+22}L${L.zx+L.zw-150} ${L.zy}M${zr[0]+4} ${by+bs+22}L${L.zx+L.zw-24} ${L.zy}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`
         :`<path d="M${zr[0]+6} ${f1(zr[1]-7)}L${L.zx} ${L.zy+20}M${zr[0]+6} ${f1(zr[1]+7)}L${L.zx} ${f1(L.zy+L.zh*.55)}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`;
    s+=`<rect x="${L.zx}" y="${L.zy}" width="${L.zw}" height="${L.zh}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${L.zx+12}" y="${L.zy+18}" class="t-xs">Inside the lung, magnified</text>`;
    /* the air sac fades back as the granuloma grows */
    const gk=ramp(t,.5,.8),al=alveolus(cx,cy,R*.95);
    s+=`<g style="opacity:${f1(1-.6*gk)}">${al.svg}</g>`;
    const sac=al.sacs[1],tx=sac[0],ty=sac[1];
    /* one droplet arrives in the sac and releases three rods */
    const ar=ramp(t,.24,.34);
    if(ar>0&&ar<1)s+=droplet(lerp(cx-R*.2,tx,ar),lerp(L.zy+16,ty,ar),5,{bac:true});
    const mk=ramp(t,.36,.46),inside=t>=.44;
    if(t>=.34&&t<.5&&!inside)s+=clump(tx,ty,3,R*.16,{len:R*.12,seed:8});
    /* the macrophage crawls to the rods, engulfs them; they multiply inside */
    if(t>=.3&&t<.66){const mx=lerp(tx+R*.5,tx,mk),my=lerp(ty+R*.4,ty,mk),n=inside?Math.round(3+ramp(t,.44,.52)*5):0;
      s+=macrophage(mx,my,R*.3,{bac:n,seed:6,op:1-ramp(t,.55,.66)})}
    /* granuloma, then held in check (calcifies) or breaking down (cavity, rods escape up the airway) */
    if(gk>0){const end=ramp(t,.82,1);
      const st=weak?lerp(gk*.82,1,end):gk*.82;
      s+=`<g style="opacity:${f1(ramp(t,.5,.6))}">`+granuloma(cx,cy+(N?6:4),R*.92,st,{calc:weak?0:end,loose:weak?end*.35:0,bac:weak?0:undefined})+'</g>';
      if(weak&&end>.25){const q=rng(77);for(let i=0;i<10;i++){const k=clamp((end-.25)/.75-q()*.3),ex=cx+(q()-.5)*R*.3,ey=lerp(cy,L.zy+8,k);if(k>0)s+=bacillus(ex+(q()-.5)*R*.4*k,ey,R*.1,q()*180)}}}
    /* a ruler of the story */
    const rx0=N?20:18,rw=N?360:484,ry=L.ry;
    s+=`<line x1="${rx0}" x2="${rx0+rw}" y1="${ry}" y2="${ry}" class="axis"/>`;
    const TK=[[0,'exposure'],[.3,'infection'],[.62,'granuloma'],[1,weak?'disease':'contained']];
    TK.forEach(([u,l],i)=>{const xx=rx0+rw*u;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ry-4}" y2="${ry+4}" class="axis"/><text x="${f1(xx)}" y="${ry-8}" class="t-xs ${i===0?'':i===TK.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<circle cx="${f1(rx0+rw*t)}" cy="${ry}" r="5" style="fill:${weak&&t>.8?'var(--tb)':'var(--brand)'}"/>`;
    svg.innerHTML=s}
  ab.addEventListener('click',()=>{weak=!weak;ab.setAttribute('aria-pressed',weak);cap.innerHTML=weak?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,11000,'%t:player.replay%','home');draw(+rg.value);
};
