/* =============== home: a CFTR channel fails and is helped by modulators, with the airway lining and a lung-function line beside it =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the modulators act. */
const HERO_CAP=['Schematic, not to scale: the liquid layer, the mucus and the lung-function line show a direction of change, not measurements. Modules 1.4, 2.1 and 4.1 tell the story with sources.',
  'Schematic, not to scale. CFTR modulators act on some CFTR variants and not others; module 4.2 shows what the labels say, as a teaching tool, not a treatment decision.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* six schematic phases along the scrubber */
  const PH=[{from:0,t:'CFTR at work',sub:'chloride leaves the cell and water follows',k:'working'},
    {from:.14,t:'CFTR misfolds',sub:'the protein never reaches the cell surface',k:'misfold'},
    {from:.28,t:'The liquid layer shrinks',sub:'with no chloride flow, the cilia flatten',k:'dry'},
    {from:.42,t:'Mucus thickens',sub:'sticky mucus traps bacteria; the airway inflames',k:'mucus'},
    {from:.6,t:'Modulators dock',sub:'a corrector refolds CFTR, a potentiator opens it',k:'modulators'},
    {from:.78,t:'Flow returns',sub:'the liquid layer refills and the cilia beat again',k:'restored'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const fail=ramp(t,.14,.24),fix=ramp(t,.66,.8);
    const asl=1-ramp(t,.27,.4)*(1-ramp(t,.76,.9)*.85),muc=.35+.55*ramp(t,.38,.52)*(1-ramp(t,.8,.95)*.6);
    return {fail,fix,asl,muc,thick:ramp(t,.4,.54)*(1-ramp(t,.8,.95)*.75),beat:clamp(asl*1.1-.1),
      bact:ramp(t,.44,.58)*(1-ramp(t,.84,.98)*.7),inflam:ramp(t,.48,.6)*(1-ramp(t,.86,1)*.7),
      corr:ramp(t,.6,.68),pot:ramp(t,.7,.78),fold:ramp(t,.64,.74),flow:(1-fail)+fix,lung:1-ramp(t,.42,.6)*.55+ramp(t,.8,.96)*.4}}
  function draw(t){const N=vb(svg,'520 300','400 410'),S=state(t),p=phase(t),P=PH[p];
    const L=N?{tx:16,ty:26,ex:16,ey:46,ew:368,eh:150,cx:104,cy:278,cs:58,fx:220,fy:236,fw:164,fh:80,sx:16,sy:370,sw:368}
             :{tx:20,ty:28,ex:20,ey:50,ew:300,eh:180,cx:420,cy:102,cs:56,fx:350,fy:192,fw:150,fh:52,sx:20,sy:266,sw:480};
    const bad=p>=1&&p<=3;
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="fill:${bad?'var(--brand)':p>=4?'var(--rx)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${P.sub}</text>`;
    /* the airway lining */
    const cf=S.fail>.5&&S.fix<.5?0:clamp(1-S.fail+S.fix);
    const E=epithelium(L.ex,L.ey+14,L.ew,L.eh-14,{n:N?6:5,asl:S.asl,mucus:S.muc,thick:S.thick,beat:S.beat,ph:t*9,cftr:cf,bact:S.bact,inflam:S.inflam,move:S.beat>.5?S.beat:0,labels:true,seed:5});
    s+=E.svg+`<text x="${L.ex+5}" y="${L.ey+L.eh+14}" class="t-xs">airway lining, cut through</text>`;
    /* one CFTR channel in close-up */
    const st=S.fail<.5?'open':S.fix>.5?'open':'misfold';
    const C=cftr(L.cx,L.cy,L.cs,{state:st,open:st==='open'?(S.fix>.5?S.pot:1):0,flow:st==='open'?clamp(S.fix>.5?S.pot:1-S.fail*2):0,ph:t*6,hco3:true,
      water:st==='open'?clamp(S.fix>.5?S.pot:1-S.fail*2):0,fold:S.fold,corr:S.corr,pot:st==='open'&&S.fix>.5?S.pot:0,mw:N?170:150});
    s+=C.svg+`<text x="${L.cx}" y="${L.cy+L.cs*1.02+(N?14:12)}" class="t-xs t-mid">one CFTR channel, close up</text>`;
    if(st==='misfold'&&S.corr<.3)s+=`<text x="${f1(L.cx+L.cs*.55)}" y="${f1(C.at.blob[1]+4)}" class="t-xs" style="fill:var(--ink);font-weight:600">misfolded</text>`;
    if(S.corr>.2&&S.pot<.95)s+=`<g style="opacity:${f1(ramp(S.corr,.2,.5)*(1-ramp(t,.84,.92)))}">${modulator(L.cx-L.cs*1.1,L.cy-L.cs*.86,11,{kind:'corr'})}<text x="${f1(L.cx-L.cs*1.1+9)}" y="${f1(L.cy-L.cs*.86+3)}" class="t-xs" style="fill:var(--ink)">corrector</text>${modulator(L.cx-L.cs*1.1,L.cy-L.cs*.62,11,{kind:'pot'})}<text x="${f1(L.cx-L.cs*1.1+9)}" y="${f1(L.cy-L.cs*.62+3)}" class="t-xs" style="fill:var(--ink)">potentiator</text></g>`;
    /* a schematic lung-function line */
    const hist=[];for(let i=0;i<=40;i++){const u=i/40;hist.push([u,state(u).lung])}
    const fn=monoFn(hist),cv=curve(L.fx,L.fy,L.fw,L.fh,fn,{y0:.2,y1:1.08,upto:t,col:p>=4?'var(--rx)':'var(--dx)',dot:true,lw:2.2});
    s+=`<path d="${pathFn(u=>1-(fn(u)-.2)/.88,L.fx,L.fx+L.fw,L.fy,L.fy+L.fh)}" style="fill:none;stroke:var(--line);stroke-width:1.6;stroke-dasharray:3 3"/>`;
    s+=cv.svg+`<text x="${L.fx}" y="${L.fy-5}" class="t-xs" style="fill:var(--ink);font-weight:600">lung function</text><text x="${L.fx+L.fw}" y="${L.fy+L.fh+12}" class="t-xs t-end">time (schematic)</text>`;
    /* phase strip */
    const sw=L.sw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.k}</text>`});
    const mx=L.sx+L.sw*t;s+=`<circle cx="${f1(mx)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===4?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,18000,'%t:player.replay%','home');draw(+rg.value);
};
