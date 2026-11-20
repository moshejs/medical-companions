
/* =============== home: one signal, from a brain circuit down to one synapse =============== */
/* HERO_CAP stays free of figures until the research passes exist; the epidemiology builder may give it
   a cited caption. The home lede is the <!--%HOMELEDE% ...--> comment in 10-shell.html (same builder). */
const HERO_CAP=['Schematic, not to scale: a signal travels a loop between the prefrontal cortex and the striatum, and at one synapse dopamine is released, then carried back into the terminal by transporters.','Schematic, not to scale: with the transporter blocked, dopamine stays in the gap for longer. Part 3 shows how the medicines act, with sources.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),bb=$('#heroBlk'),cap=$('#heroCap');let blk=false;
  /* the timeline: 0-.42 the pulse goes once round the loop; .34-.56 a vesicle releases dopamine;
     after .56 transporters clear the cleft (slowly, and only partly, when blocked). Illustrative timing. */
  const level=t=>{const rise=ease(ramp(t,.4,.56));if(t<.56)return rise;const k=ramp(t,.58,.92);return blk?1-.28*k:1-ease(k)};
  function draw(t){const N=vb(svg,'520 300','400 470');
    const B=N?{x:72,y:72,s:256}:{x:14,y:72,s:232},Sy=N?{x:110,y:282,s:180}:{x:318,y:66,s:186};
    let s=`<defs>${marker('hrArr','var(--brand)',3.5)}</defs>`;
    const br=brain(B.x,B.y,B.s,{hl:['pfc','str'],act:{pfc:bump(t,0,.2)*.9,str:bump(t,.14,.36),thal:bump(t,.26,.44)},labels:true});s+=br.svg;
    /* the loop: prefrontal cortex -> striatum -> thalamus -> back to the prefrontal cortex */
    const [px,py]=br.at.pfc,[sx,sy]=br.at.str,[tx,ty]=br.at.thal;
    const loop=`M${f1(px+10)} ${f1(py+6)}Q${f1((px+sx)/2)} ${f1(py+30)} ${f1(sx-8)} ${f1(sy+4)}Q${f1(tx-4)} ${f1(ty+18)} ${f1(tx+2)} ${f1(ty+4)}Q${f1((px+tx)/2+10)} ${f1(py-30)} ${f1(px+14)} ${f1(py-8)}`;
    s+=`<path id="heroLoop" d="${loop}" style="fill:none;stroke:var(--brand);stroke-width:2;stroke-dasharray:4 4;opacity:.75" marker-end="url(#hrArr)"/>`;
    /* zoom lines from the striatum to the synapse */
    const z=ramp(t,.28,.4),ZW=Sy.s,ZH=Sy.s*.85;
    s+=`<g style="opacity:${f1(.25+.75*z)}"><rect x="${f1(Sy.x-8)}" y="${f1(Sy.y-8)}" width="${f1(ZW+16)}" height="${f1(ZH+16)}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`+
      `<path d="M${f1(sx)} ${f1(sy)}L${f1(N?Sy.x-8:Sy.x-8)} ${f1(N?Sy.y-8:Sy.y-8)}M${f1(sx)} ${f1(sy)}L${f1(N?Sy.x+ZW+8:Sy.x-8)} ${f1(N?Sy.y-8:Sy.y+ZH+8)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/><circle cx="${f1(sx)}" cy="${f1(sy)}" r="5" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    const lv=level(t),clearing=t>.56;
    s+=synapse(Sy.x,Sy.y,Sy.s,{nt:'da',level:lv,fuse:ramp(t,.34,.52),uptake:clearing&&!blk?bump(t,.56,.95):0,block:blk?ramp(t,.05,.2):0,bound:lv,labels:true}).svg+'</g>';
    /* phase heading */
    const ph=t<.34?['1 · A signal travels the loop','prefrontal cortex → striatum → thalamus']:t<.58?['2 · Dopamine is released','a vesicle opens into the gap']:blk?['3 · Reuptake blocked','dopamine stays in the gap longer']:['3 · Transporters carry it back','the gap clears for the next signal'];
    const hx=N?20:14,hy=N?22:22;
    s+=`<text x="${hx}" y="${hy}" class="t-big">${ph[0]}</text><text x="${hx}" y="${hy+16}" class="t-sm">${ph[1]}</text>`;
    /* a meter: dopamine in the gap */
    const mx=N?110:318,my=N?Sy.y+ZH+24:Sy.y+ZH+28,mw=N?180:186;
    s+=`<text x="${mx}" y="${my-6}" class="t-xs">Dopamine in the gap (schematic)</text><rect x="${mx}" y="${my}" width="${mw}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my}" width="${f1(mw*lv)}" height="8" rx="4" style="fill:var(--da)"/>`;
    svg.innerHTML=s;
    const pe=svg.querySelector('#heroLoop');if(pe&&t<.42){const L=pe.getTotalLength(),p=pe.getPointAtLength(L*ramp(t,0,.42));
      const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',f1(p.x));c.setAttribute('cy',f1(p.y));c.setAttribute('r','6');c.setAttribute('style','fill:var(--brand);stroke:var(--panel);stroke-width:2');svg.appendChild(c)}}
  bb.addEventListener('click',()=>{blk=!blk;bb.setAttribute('aria-pressed',blk);cap.innerHTML=blk?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  cap.innerHTML=HERO_CAP[0];
  playWire(rg,$('#heroPlay'),draw,8000,'%t:player.replay%','home');draw(+rg.value);
};
