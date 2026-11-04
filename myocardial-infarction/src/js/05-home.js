/* =============== home: a coronary artery blocks and is reopened, with the heart muscle and the ECG beside it =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the artery is blocked. */
const HERO_CAP=['Schematic, not to scale: the clot, the colours of the heart muscle and the ECG show a direction of change, not measurements. Modules 1.2, 1.3 and 2.2 tell the story with sources.',
  'Schematic, not to scale. If you think you or someone else is having a heart attack, call your local emergency number now (911 in the US, 999 in the UK, 112 in the EU).'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* six schematic phases along the scrubber */
  const PH=[{from:0,t:'Blood flows',sub:'a plaque sits in the artery wall',k:'flow'},
    {from:.14,t:'The plaque ruptures',sub:'its thin fibrous cap tears open',k:'rupture'},
    {from:.28,t:'A clot blocks the artery',sub:'platelets and fibrin stop the flow',k:'clot'},
    {from:.44,t:'Muscle at risk',sub:'downstream muscle is starved of oxygen',k:'muscle'},
    {from:.62,t:'A stent reopens it',sub:'a balloon, then a stent, restore flow',k:'stent'},
    {from:.8,t:'Flow restored',sub:'muscle reached in time is saved',k:'saved'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const clot=ramp(t,.26,.4)*(1-ramp(t,.66,.74));
    return {rup:ramp(t,.15,.24),clot,bal:bump(t,.62,.76),stent:ramp(t,.68,.74),
      isch:ramp(t,.32,.44)*(1-ramp(t,.72,.9)),scar:ramp(t,.48,.62),
      st:ramp(t,.3,.42)*3*(1-ramp(t,.74,.92)*.9),hyper:bump(t,.2,.36),min:ramp(t,.3,.7)*60}}
  function draw(t){const N=vb(svg,'520 300','400 370'),S=state(t),p=phase(t),P=PH[p];
    const L=N?{tx:16,ty:28,ax:16,ay:50,aw:368,ah:96,hx:302,hy:236,hs:.62,ex:16,ey:168,ew:212,eh:72,cx:34,cy:282,sx:16,sy:330,sw:368}
             :{tx:20,ty:30,ax:20,ay:62,aw:300,ah:96,hx:432,hy:116,hs:.68,ex:20,ey:176,ew:300,eh:72,cx:396,cy:240,sx:20,sy:270,sw:480};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:${p===2||p===3?'var(--brand)':p===5?'var(--good)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${P.sub}</text>`;
    /* the coronary artery in long section */
    const A=artery(L.ax,L.ay,L.aw,L.ah,{plaque:.8,cap:.25,px:.42,rupture:S.rup*(1-S.stent),clot:S.clot,balloon:S.bal,stent:S.stent,ph:t*14,seed:4});
    s+=A.svg+`<text x="${L.ax+L.aw-5}" y="${L.ay+10}" class="t-xs t-end" style="fill:var(--ink)">coronary artery, long section</text>`;
    const pl=A.at.plaque,lab=(x,y,txt,op=1)=>`<text x="${f1(x)}" y="${f1(y)}" class="t-xs" style="fill:var(--ink);font-weight:600;opacity:${f1(op)}">${txt}</text>`;
    s+=lab(pl[0]+L.aw*.11,A.at.bot-4,'plaque',1-S.stent);
    if(S.clot>.15)s+=lab(pl[0]+L.aw*.11,A.at.top+12,'clot',S.clot);
    if(S.stent>.2)s+=lab(pl[0]+L.aw*.18,A.at.top+12,'stent',S.stent);
    s+=`<defs>${marker('hrA','var(--muted)')}</defs><path d="M${L.ax+8} ${f1((A.at.top+A.at.bot)/2)}h26" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#hrA)"/>`;
    /* the heart: the blocked artery's territory turns ischaemic; a small scar stays after reperfusion */
    const H=heart(L.hx,L.hy,L.hs,{id:'heroH',terr:{lad:S.isch},occl:{a:'lad',at:.28,v:S.clot},stent:{a:'lad',at:.28,v:S.stent},hl:['lad'],labels:['lad']});
    s+=H.svg;
    if(S.scar>0){const c=H.at.lv;s+=`<ellipse cx="${f1(c[0]+2)}" cy="${f1(c[1]+14)}" rx="${f1(3+9*S.scar)}" ry="${f1(2+5*S.scar)}" transform="rotate(-50 ${f1(c[0]+2)} ${f1(c[1]+14)})" style="fill:var(--necro-fill);opacity:${f1(.25+.6*S.scar)}"/>`}
    const risk=S.isch>.3?ramp(S.isch,.3,.6):0;
    if(risk&&!N)s+=`<text x="${f1(L.hx-L.hs*104)}" y="${f1(L.hy-L.hs*84)}" class="t-xs t-end" style="fill:var(--isch);font-weight:600;opacity:${f1(risk)}">muscle at risk</text>`;
    s+=risk&&N?`<text x="${f1(L.hx)}" y="${f1(L.hy+L.hs*100+24)}" class="t-xs t-mid" style="fill:var(--isch);font-weight:600;opacity:${f1(risk)}">muscle at risk</text>`
      :`<text x="${f1(L.hx)}" y="${f1(L.hy+L.hs*100+(N?24:16))}" class="t-xs t-mid">heart, front view</text>`;
    /* the ECG strip scrolls on as time passes */
    s+=ecgGrid(L.ex,L.ey,L.ew,L.eh,{mm:4});
    s+=ecgTrace(L.ex,L.ey+L.eh*.62,L.ew,{mm:4,hr:72,from:t*8,st:S.st,hyper:S.hyper,r:8,lw:1.5}).svg;
    s+=`<text x="${L.ex+5}" y="${L.ey+12}" class="t-xs" style="fill:var(--ink);font-weight:600">ECG</text>`;
    if(S.st>.6)s+=`<text x="${L.ex+L.ew-5}" y="${L.ey+12}" class="t-xs t-end" style="fill:var(--brand);font-weight:600;opacity:${f1(ramp(S.st,.6,1.6))}">ST elevation</text>`;
    /* time passing while the artery is shut */
    s+=clock(L.cx,L.cy,18,S.min,{full:60});
    s+=`<text x="${L.cx+26}" y="${L.cy+4}" class="t-xs">time is muscle</text>`;
    /* phase strip */
    const sw=L.sw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.k}</text>`});
    const mx=L.sx+L.sw*t;s+=`<circle cx="${f1(mx)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===2||p===3?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,16000,'%t:player.replay%','home');draw(+rg.value);
};
