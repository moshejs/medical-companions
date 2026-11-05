/* =============== home: one schematic emotion wave, with and without skills =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of facts: a cited one can replace them once research exists. */
const HERO_CAP=['Schematic, not to scale: a trigger, a fast rise, a high peak and a slow return to baseline.','Schematic, not to scale: the sea-green wave illustrates the idea of skills helping an emotion settle sooner. It is not a measured result.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),sb=$('#heroSk'),cap=$('#heroCap');let sk=false;
  const MIN=60;/* schematic minutes on the scrubber */
  const F0=moodF({t0:.12,base:.14,peak:.93,rise:.018,fall:.42}),F1=moodF({t0:.12,base:.14,peak:.7,rise:.03,fall:.11});
  function phase(u,f){if(u<f.t0)return['Calm baseline','var(--calm)'];if(u<f.t0+.035)return['Trigger','var(--storm)'];
    if(u<f.peakAt+.06)return[u<f.peakAt?'Fast rise':'Peak intensity','var(--storm)'];
    return f(u)<.24?['Back near baseline','var(--calm)']:[sk?'Settling sooner':'Slow return to baseline','var(--mood)']}
  function draw(t){const N=vb(svg,'520 300','400 360');const f=sk?F1:F0,v=f(t);
    /* layout tables: wide = brain left, graph right; narrow = brain on top, graph below */
    const L=N?{bx:120,by:84,bs:.72,tx:24,ty:26,th:96,gx:34,gy:162,gw:346,gh:140,px:214,py:52}
             :{bx:118,by:140,bs:.92,tx:26,ty:60,th:176,gx:214,gy:62,gw:288,gh:172,px:214,py:28};
    let s=`<defs>${marker('hArr','var(--muted)')}</defs>`;
    /* thermometer and brain: the amygdala glows with the wave; prefrontal control brightens as it settles */
    s+=thermo(L.tx,L.ty,L.th,v,{label:'intensity'});
    const settle=t>f.peakAt?ramp(t,f.peakAt,f.peakAt+.25):0;
    const b=brain(L.bx,L.by,L.bs,{hl:{amyg:ramp(v,.2,.95),pfc:sk?.25+settle*.6:.15+settle*.25}});s+=b.svg;
    const a=b.at.amyg;s+=`<line x1="${f1(a[0])}" y1="${f1(a[1]+6)}" x2="${f1(a[0]-18)}" y2="${f1(L.by+64*L.bs)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(a[0]-18)}" y="${f1(L.by+64*L.bs+12)}" class="t-xs t-mid">amygdala</text>`;
    const p=b.at.pfc;s+=`<text x="${f1(p[0])}" y="${f1(L.by-62*L.bs)}" class="t-xs t-mid">prefrontal</text>`;
    /* the graph */
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" rx="8" style="fill:var(--field)"/>`;
    if(sk)s+=wave(L.gx,L.gy,L.gw,L.gh,F0,{upto:1,col:'var(--mood)',dash:true}).svg.replace(/stroke-width:2.6/,'stroke-width:1.6;opacity:.45');
    const w=wave(L.gx,L.gy,L.gw,L.gh,f,{upto:t,col:sk?'var(--calm)':'var(--mood)',fill:true,thr:.72,thrLabel:'very intense',base:true,dot:true});s+=w.svg;
    const tx=L.gx+L.gw*f.t0;s+=`<path d="M${f1(tx)} ${L.gy+L.gh+2}v-14" style="stroke:var(--storm);stroke-width:2" marker-end="url(#hArr)"/>`;
    const tl=tline(L.gx,L.gy+L.gh+(N?14:18),L.gw,{min:0,max:MIN,step:N?20:10,fmt:v=>v+'′',label:''});s+=tl.svg;
    s+=`<text x="${f1(L.gx+L.gw-8)}" y="${f1(L.gy+16)}" class="t-xs t-end">emotional intensity (schematic)</text>`;
    /* phase label */
    const [ph,col]=phase(t,f);
    s+=`<text x="${L.px}" y="${L.py}" class="t-big" style="fill:${col}">${ph}</text>`;
    s+=`<text x="${L.px}" y="${L.py+18}" class="t-sm">minute ${Math.round(t*MIN)} of ${MIN}</text>`;
    svg.innerHTML=s}
  sb.addEventListener('click',()=>{sk=!sk;sb.setAttribute('aria-pressed',sk);cap.innerHTML=sk?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,9000,'%t:player.replay%','home');draw(+rg.value);
};
