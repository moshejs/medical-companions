/* =============== home: one small airway and its air sacs through the course of COPD, with a lung-function line =============== */
/* Captions carry no figures: the modules tell the story with sources. HERO_CAP[0] is the usual caption;
   HERO_CAP[1] is shown during the treatment phase. */
const HERO_CAP=['Schematic, not to scale: the airway, air sacs and lung-function line show a direction of change, not measurements. Modules 1.3, 1.4 and 2.1 tell the story with sources.',
  'Schematic, not to scale. Treatment and stopping smoking can ease symptoms and slow the decline, but lost air-sac walls do not grow back. Modules 3.1 to 3.6 show what the trials found.'];
const HERO_TXT={airway:'small airway, cut across',sacs:'air sacs',line:'lung function over a lifetime',age:'age',quit:'stops smoking',
  inn:'breathing in',out:'breathing out'};
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  const PH=[{from:0,t:'Healthy breathing',sub:'attachments hold the airway open; air sacs swap gases'},
    {from:.15,t:'Smoke, year after year',sub:'the airway wall becomes inflamed'},
    {from:.31,t:'Mucus and a thicker wall',sub:'the small airway narrows and air moves slowly'},
    {from:.47,t:'Air-sac walls break down',sub:'emphysema: fewer, larger spaces and lost attachments'},
    {from:.63,t:'Air gets trapped',sub:'the airway closes early on breathing out'},
    {from:.8,t:'Treatment and quitting',sub:'symptoms ease and the fall slows; lost walls stay lost'}];
  function state(t){return {smoke:bump(t,.12,.62),inflam:ramp(t,.16,.3)*(1-ramp(t,.82,.96)*.6),mucus:ramp(t,.3,.44)*.55*(1-ramp(t,.82,.95)*.55),
    wall:ramp(t,.3,.46),destroy:ramp(t,.46,.62)*.85,teth:1-ramp(t,.47,.62)*.8,squeeze:ramp(t,.3,.44)*.5*(1-ramp(t,.82,.94)*.75),trap:ramp(t,.62,.75)*(1-ramp(t,.84,.96)*.4)}}
  function draw(t){const N=vb(svg,'520 300','400 470'),S=state(t),p=phaseOf(PH,t),P=PH[p];
    const L=N?{tx:16,ty:26,ax:110,ay:150,ar:62,vx:290,vy:150,vs:150,gx:42,gy:300,gw:330,gh:120}
             :{tx:20,ty:28,ax:96,ay:136,ar:58,vx:258,vy:136,vs:140,gx:356,gy:58,gw:146,gh:160};
    const br=(Math.sin(t*Math.PI*18)+1)/2, out=br<.5;
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:${p>=5?'var(--rec)':p>=1?'var(--brand)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${P.sub}</text>`;
    if(S.smoke>.02)s+=smoke(L.ax-L.ar,L.ay-L.ar-14,L.ar*2,L.ar*.9,{amt:S.smoke,ph:t*6,seed:3});
    const A=airway(L.ax,L.ay+10,L.ar,{wall:S.wall,squeeze:S.squeeze,mucus:S.mucus,inflam:S.inflam,tether:S.teth,collapse:out?S.trap*.9:0,ph:t*10,seed:4});
    s+=A.svg+`<text x="${L.ax}" y="${L.ay+L.ar*1.5+30}" class="t-xs" text-anchor="middle">${HERO_TXT.airway}</text>`;
    const V=alveoli(L.vx,L.vy+10,L.vs,{destroy:S.destroy,o2:1-S.destroy*.6,co2:.5+S.trap*.4,trap:S.trap,elastin:true,ph:t*8,seed:6});
    s+=V.svg+`<text x="${L.vx}" y="${L.vy+L.vs*.62+28}" class="t-xs" text-anchor="middle">${HERO_TXT.sacs}</text>`;
    s+=`<text x="${L.vx}" y="${L.vy-L.vs*.55}" class="t-xs" text-anchor="middle" style="fill:var(--air-ink)">${out?HERO_TXT.out:HERO_TXT.inn}</text>`;
    /* lung-function line: a schematic decline that steepens with exposure and flattens after quitting */
    const fx=u=>{const q=.8;let v=1-.12*u;if(u>.15)v-=.55*Math.min(u-.15,q-.15)*1.2;if(u>q)v-=.18*(u-q);return clamp(v,.05,1)};
    s+=axes(L.gx,L.gy,L.gw,L.gh,{xt:[],yt:[],grid:false});
    s+=`<text x="${L.gx}" y="${L.gy-8}" class="t-xs">${HERO_TXT.line}</text><text x="${L.gx+L.gw}" y="${L.gy+L.gh+14}" class="t-xs" text-anchor="end">${HERO_TXT.age} →</text>`;
    const ghost=pathFn(u=>1-(1-.12*u),L.gx,L.gx+L.gw,L.gy,L.gy+L.gh);
    s+=`<path d="${ghost}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4"/>`;
    const tc=Math.max(clamp(t),.002);s+=`<path d="${pathFn(u=>1-fx(u*tc),L.gx,L.gx+L.gw*tc,L.gy,L.gy+L.gh,90)}" style="fill:none;stroke:var(--o2);stroke-width:2.6"/>`;
    if(t>=.8){const qx=L.gx+L.gw*.8;s+=`<line x1="${f1(qx)}" x2="${f1(qx)}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--rec);stroke-dasharray:3 3"/><text x="${f1(qx-4)}" y="${L.gy+12}" class="t-xs" text-anchor="end" style="fill:var(--rec)">${HERO_TXT.quit}</text>`}
    svg.innerHTML=s;cap.textContent=HERO_CAP[p>=5?1:0];
  }
  playWire(rg,$('#heroPlay'),draw,16000,'%t:player.replay%','home');
  draw(+rg.value);
};
