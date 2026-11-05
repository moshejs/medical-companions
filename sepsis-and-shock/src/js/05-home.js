/* =============== home: an infection tips into sepsis and shock, and treatment turns it back =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what', builder 'intro') builder writes it
   from the research. Keep these captions free of figures: a cited one can replace them once research exists.
   The gauge and the organ score are schematic (no MAP target, no SOFA points): they show a direction of change.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the patient is getting worse. */
const HERO_CAP=['Schematic, not to scale: the gauge, the organ score and the colours show a direction of change, not measurements. Modules 1.2 to 1.4 and 4.1 to 4.3 tell the story with sources.',
  'Schematic, not to scale. Sepsis is a medical emergency: if someone with an infection becomes very unwell, call your local emergency number or go to an emergency department now and ask: could this be sepsis?'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* seven schematic phases along the scrubber */
  const PH=[{from:0,t:'An infection starts',sub:'bacteria multiply at one site, here the lungs',k:'infection'},
    {from:.13,t:'The body fights back',sub:'immune cells and cytokines respond locally',k:'response'},
    {from:.27,t:'The response turns harmful',sub:'inflammation spreads through the whole body',k:'spread'},
    {from:.41,t:'Vessels leak, pressure falls',sub:'fluid leaves the blood; the pressure gauge drops',k:'leak'},
    {from:.53,t:'Organs start to fail',sub:'one organ after another struggles',k:'organs'},
    {from:.68,t:'Treatment starts',sub:'antibiotics, fluids and a vasopressor',k:'treat'},
    {from:.84,t:'Pressure and organs recover',sub:'blood flow returns and organs relight',k:'recover'}];
  const ORG=[['brain','brain'],['lung','lungs'],['heart','heart'],['liver','liver'],['kidney','kidneys']];
  const phase=t=>phaseOf(PH,t);
  function state(t){const rx=ramp(t,.7,.86),off=1-ramp(t,.8,.95);
    return {inf:Math.max(.25,ramp(t,0,.12))*(1-rx*.85),resp:ramp(t,.12,.22),storm:ramp(t,.26,.38)*off,leak:ramp(t,.4,.5)*(1-ramp(t,.78,.94)),
      map:1-.62*ramp(t,.41,.58)+.62*ramp(t,.71,.88),fail:ORG.map((o,i)=>ramp(t,.53+i*.025,.58+i*.025)*(1-ramp(t,.82+i*.022,.9+i*.022))),
      mottle:ramp(t,.5,.62)*(1-ramp(t,.84,.95)),clots:ramp(t,.48,.58)*(1-ramp(t,.84,.95)),
      bags:ramp(t,.68,.72),pumpOn:ramp(t,.72,.76),dose:ramp(t,.72,1),temp:.3+.55*ramp(t,.14,.34)*(1-ramp(t,.78,.96)*.85)}}
  function draw(t){const N=vb(svg,'520 320','400 412'),S=state(t),p=phase(t),P=PH[p],bad=p>=2&&p<=4;
    const L=N?{tx:16,ty:28,bx:116,by:66,bs:.78,ox:222,oy:82,od:37,os:24,vx:16,vy:288,vw:368,vh:70,gx:342,gy:206,gr:36,sx:300,sy:62,sw:86,stx:16,sty:380,stw:368}
             :{tx:20,ty:30,bx:128,by:60,bs:.8,ox:212,oy:76,od:40,os:26,vx:300,vy:58,vw:200,vh:84,gx:346,gy:226,gr:40,sx:404,sy:174,sw:96,stx:20,sty:290,stw:480};
    let s=`<defs>${marker('hrA','var(--muted)')}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:${bad?'var(--brand)':p===6?'var(--good)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${P.sub}</text>`;
    /* the person: infection in the lungs, mottled skin as shock sets in */
    const B=body(L.bx,L.by,L.bs,{id:'heroB',infect:{site:'lung',v:S.inf},mottle:S.mottle,cold:S.mottle*.8});s+=B.svg;
    const lu=B.at.lung,ph=t*16;
    /* bacteria at the source, cleared by antibiotics */
    const nb=Math.round(1+S.inf*6);for(let i=0;i<nb;i++){const a=i*2.4+t*2,d=6+(i%3)*5;s+=bacterium(lu[0]+Math.cos(a)*d,lu[1]+Math.sin(a)*d*.8,8,{ang:a*40,op:Math.min(1,S.inf*1.4)})}
    /* immune cells arrive, then cytokines spread from the source through the body */
    if(S.resp>0){s+=neutrophil(lu[0]-16,lu[1]+12,12,{act:S.resp,op:S.resp,seed:4})+macrophage(lu[0]+17,lu[1]-8,14,{act:S.resp,op:S.resp,seed:9});
      s+=cytokines(lu[0],lu[1],22,{v:S.resp,n:10,seed:5,op:1-S.storm*.5})}
    if(S.storm>0){const bh=260*L.bs;s+=cytokines(lu[0],L.by+bh*.48,bh*.55,{v:.4+.6*S.storm,n:26,seed:12,op:S.storm*.9,size:2.2})}
    /* fever */
    s+=thermometer(L.bx+L.bs*34,L.by+2,34,S.temp,{w:6});
    /* treatment: an antibiotic bag, a fluid bag and a vasopressor pump run to the arm */
    if(S.bags>0){const hand=B.at.hand,arm=B.at.arm;s+=`<g style="opacity:${f1(S.bags)}">`;
      s+=ivBag(L.bx-L.bs*118,L.by+8,.58,{fill:1-S.dose*.6,col:'var(--rx)',label:'abx',ph,to:[arm[0]-3,arm[1]-4]}).svg;
      s+=ivBag(L.bx-L.bs*86,L.by+20,.62,{fill:1-S.dose*.7,col:'var(--fluid)',label:'fluid',ph:ph+.4,to:[arm[0]-1,arm[1]+8]}).svg;
      s+=`</g>`;
      if(S.pumpOn>0)s+=`<g style="opacity:${f1(S.pumpOn)}">`+pump(L.bx-L.bs*128,L.by+L.bs*190,L.bs*56,L.bs*40,{v:S.dose,txt:'pressor',on:true,to:[hand[0]-2,hand[1]+3]}).svg+`</g>`;
      s+=`<text x="${f1(L.bx-L.bs*100)}" y="${f1(L.by+L.bs*184)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600;opacity:${f1(S.bags)}">treatment</text>`}
    /* organs dim one by one as they fail, and relight as blood flow returns */
    ORG.forEach(([k,lab],i)=>{const y=L.oy+i*L.od;s+=organ(k,L.ox,y,L.os,{fail:S.fail[i],label:lab,lside:true})});
    /* the vessel: the lining leaks, red cells darken, microclots form */
    const V=vessel(L.vx,L.vy,L.vw,L.vh,{ph:t*10,leak:S.leak,dilate:S.storm*.7,clots:S.clots,cells:S.resp*(1-S.storm*.6),o2:1-.7*Math.max(S.leak,S.clots),seed:6});
    s+=V.svg+`<text x="${L.vx+L.vw-4}" y="${L.vy-5}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">small blood vessel</text>`;
    if(S.leak>.3)s+=`<text x="${L.vx+5}" y="${L.vy+L.vh-5}" class="t-xs" style="fill:var(--fluid);font-weight:600;opacity:${f1(ramp(S.leak,.3,.6))}">fluid leaks out</text>`;
    s+=`<path d="M${L.vx+8} ${f1(V.at.cy)}h22" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#hrA)"/>`;
    /* blood pressure (schematic MAP gauge, no numbers) and a schematic organ score */
    s+=gauge(L.gx,L.gy,L.gr,S.map*100,100,{ticks:false,bands:[{to:40,col:'var(--bad)'},{to:62,col:'var(--warn)'},{to:100,col:'var(--good)'}]});
    s+=`<text x="${L.gx}" y="${L.gy+30}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">blood pressure</text><text x="${L.gx-L.gr}" y="${L.gy+14}" class="t-xs t-mid">low</text><text x="${L.gx+L.gr}" y="${L.gy+14}" class="t-xs t-mid">normal</text>`;
    const score=Math.round(S.fail.reduce((a,b)=>a+b,0)*2);
    s+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="58" rx="10" style="fill:${score>3?'var(--bad-soft)':'var(--panel-2)'};stroke:var(--line)"/><text x="${L.sx+L.sw/2}" y="${L.sy+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">organ score</text><text x="${L.sx+L.sw/2}" y="${L.sy+40}" class="t-big t-mid" style="font-size:22px;fill:${score>3?'var(--bad)':'var(--ink)'}">${score}</text><text x="${L.sx+L.sw/2}" y="${L.sy+53}" class="t-xs t-mid">schematic</text>`;
    /* phase strip */
    const sw=L.stw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.stx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sty}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(i>=5?'var(--rx)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sty+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.k}</text>`});
    const mx=L.stx+L.stw*t;s+=`<circle cx="${f1(mx)}" cy="${L.sty+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[bad?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,18000,'%t:player.replay%','home');draw(+rg.value);
};
