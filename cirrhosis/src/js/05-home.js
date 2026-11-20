/* =============== home: a liver going from healthy, through scarring, to cirrhosis, and partly back =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the scene is in the 'cause removed' phase. */
const HERO_CAP=['Schematic, not to scale: the liver, the lobule and the gauge show a direction of change, not measurements. Module 1.3 tells the story with sources.',
  'Schematic, not to scale. How far scarring can regress once its cause is treated, and for whom, is set out with sources in module 1.3.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* five schematic phases along the scrubber */
  const PH=[{from:0,t:'Healthy liver',sub:'smooth tissue, quiet stellate cells',k:'healthy',kn:'healthy'},
    {from:.18,t:'Repeated injury',sub:'stellate cells switch on and make collagen',k:'injury',kn:'injury'},
    {from:.38,t:'Fibrosis',sub:'scar spreads out from the portal areas',k:'fibrosis',kn:'fibrosis'},
    {from:.6,t:'Cirrhosis',sub:'scar bridges the liver into nodules',k:'cirrhosis',kn:'cirrhosis'},
    {from:.8,t:'Cause removed',sub:'scar can thin and pressure ease, in part',k:'cause removed',kn:'cause gone'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const reg=ramp(t,.82,.98);
    const act=ramp(t,.16,.32)*(1-.65*reg);/* stellate activation, 0 quiescent .. 1 myofibroblast */
    const fib=ramp(t,.22,.72)*4;/* METAVIR-like 0..4 for the drawing only */
    const lob=ramp(t,.26,.7);
    const pr=clamp(.1+ramp(t,.36,.74)*.8-reg*.32);/* schematic pressure, 0..1 of the dial */
    return {reg,act,fib,lob,pr}}
  function draw(t){const N=vb(svg,'520 300','400 300');const S=state(t),p=phase(t),P=PH[p];
    const L=N?{lx:20,ly:30,vx:118,vy:156,vs:.95,bx:300,by:116,br:50,gx:300,gy:224,gr:34,tx:20,ty:268,tw:360}
             :{lx:24,ly:34,vx:150,vy:162,vs:1.2,bx:352,by:118,br:56,gx:466,gy:128,gr:40,tx:24,ty:264,tw:472};
    let s=`<defs>${marker('heroA','var(--muted)')}</defs>`;
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${p===3?'var(--liver)':p===4?'var(--rx)':'var(--ink)'}">${P.t}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${P.sub}</text>`;
    /* the liver */
    s+=liver(L.vx,L.vy,L.vs,{fib:S.fib,regress:S.reg,seed:11}).svg;
    /* leader to the magnified lobule */
    s+=`<path d="M${f1(L.vx+40*L.vs)} ${f1(L.vy-14*L.vs)}L${f1(L.bx-L.br-4)} ${f1(L.by+6)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4"/><circle cx="${f1(L.vx+40*L.vs)}" cy="${f1(L.vy-14*L.vs)}" r="4" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s+=lobule(L.bx,L.by,L.br/1.16,{flow:(t*26)%1,fib:S.lob*(1-.5*S.reg),act:S.act,clip:true,id:'heroLb'}).svg;
    if(!N)s+=`<text x="${L.bx}" y="${L.by+L.br+16}" class="t-xs t-mid">one lobule, magnified</text>`;
    /* the portal-pressure gauge: a direction, not a number */
    s+=gauge(L.gx,L.gy,L.gr,S.pr,1,{lo:'low',hi:'high',label:'portal pressure',bands:[{to:.45,col:'var(--panel-2)'},{to:1,col:'var(--bile)'}]});
    /* phase strip */
    const sw=L.tw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.tx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ty}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(i===4?'var(--rx)':i===3?'var(--liver-fill)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ty+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?q.kn:q.k}</text>`});
    const mx=L.tx+L.tw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ty+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===4?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,15000,'%t:player.replay%','home');draw(+rg.value);
};
