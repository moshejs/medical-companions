
/* =============== home: four made-up profiles, as wheels and as one line =============== */
/* HERO_CAP: [wheel view, line view]. Schematic only; the 'what' builder may add a cited sentence. */
const HERO_CAP=['Schematic: four made-up profiles, not measurements. Each spoke is an area where autistic people can differ; the further out, the more that area shapes daily life.','Schematic: squeeze each made-up wheel into one number and four different people land in almost the same place. That is why support needs are described area by area.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),lb=$('#heroLine'),cap=$('#heroCap');let line=false;
  const AX=['Social','Sensory','Routine','Interests','Language','Movement'];
  /* made-up values chosen so that the four averages are nearly equal while the shapes differ */
  const P=[[.85,.3,.6,.9,.2,.4],[.3,.9,.7,.4,.8,.2],[.6,.62,.3,.5,.48,.8],[.45,.2,.88,.74,.35,.6]];
  const COL=['var(--brand)','var(--accent)','var(--neuro)','var(--rx)'];
  const avg=v=>v.reduce((a,b)=>a+b,0)/v.length;
  function at(t){const u=clamp(t)*3,i=Math.min(2,Math.floor(u)),f=ease(ramp(u-i,.3,.7));
    return {vals:P[i].map((v,k)=>lerp(v,P[i+1][k],f)),idx:f<.5?i:i+1}}
  function draw(t){const N=vb(svg,'520 300','400 360');const {vals,idx}=at(t);let s='';
    const cx=N?200:170,cy=N?150:150,r=N?92:100;
    const w=profile(cx,cy,r,vals,{labels:AX,col:COL[idx],fs:'t-sm'});
    s+=`<g style="opacity:${line?.22:1};transition:opacity .3s">${w.svg}</g>`;
    if(line){}
    else if(!N){s+=person(410,70,64,COL[idx]);
      s+=`<text x="410" y="160" class="t-big t-mid" style="fill:${COL[idx]}">Person ${idx+1}</text><text x="410" y="178" class="t-sm t-mid">made up, ${idx+1} of 4</text>`}
    else s+=`<text x="20" y="28" class="t-big" style="fill:${COL[idx]}">Person ${idx+1}</text><text x="20" y="44" class="t-sm">made up, ${idx+1} of 4</text>`;
    /* the one-line view: every wheel reduced to its average */
    const lx0=line?(N?40:90):(N?40:300),lx1=line?(N?360:430):(N?360:500),ly=line?150:(N?318:262),big=line;
    if(line&&!N){s+=`<rect x="${lx0-30}" y="${ly-62}" width="${lx1-lx0+60}" height="108" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`}
    if(line&&N){s+=`<rect x="${lx0-20}" y="${ly-58}" width="${lx1-lx0+40}" height="104" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`}
    s+=`<line x1="${lx0}" x2="${lx1}" y1="${ly}" y2="${ly}" style="stroke:var(--muted);stroke-width:${big?2.4:1.4}"/>`;
    s+=`<text x="${lx0}" y="${ly+18}" class="t-xs">less</text><text x="${lx1}" y="${ly+18}" class="t-xs t-end">more</text>`;
    s+=`${big?`<text x="${(lx0+lx1)/2}" y="${ly+36}" class="t-sm t-mid">Person ${idx+1} is the large dot</text>`:''}<text x="${(lx0+lx1)/2}" y="${ly-(big?36:12)}" class="${big?'t-lbl':'t-xs'} t-mid">${big?'One line: four people, one point':'one-line view'}</text>`;
    const xs=P.map(v=>lerp(lx0,lx1,avg(v)));
    P.forEach((v,k)=>{const x=xs[k],on=k===idx,dy=big?(k-1.5)*7:0;
      s+=`<circle cx="${f1(x)}" cy="${f1(ly+dy)}" r="${on?(big?7:5):(big?5:3.2)}" style="fill:${COL[k]};stroke:var(--panel);stroke-width:1.5;opacity:${on?1:.75}"/>`});
    svg.innerHTML=s}
  lb.addEventListener('click',()=>{line=!line;lb.setAttribute('aria-pressed',line);cap.innerHTML=line?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,12000,'%t:player.replay%','home');draw(+rg.value);
};
