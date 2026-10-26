
/* =============== home: a polyp's fifteen years, with and without screening =============== */
const HERO_CAP=['Schematic, not to scale; the years are illustrative.','Schematic: screening finds and removes the polyp before it can become a cancer.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),sb=$('#heroScr'),cap=$('#heroCap');let scr=false;
  /* schematic stage of the lesion at year y (0..15): an adenoma appears at year 1, becomes advanced by
     about year 7 and invasive near year 11. The timing is illustrative, not a measured course. */
  const YRS=15,SNARE=6.2;
  const stageAt=y=>y<1?0:y<11?ramp(y,1,11)*.85:.85+ramp(y,11,14)*.15;
  function draw(t){const N=vb(svg,'520 300','400 360');const y=t*YRS;
    const W=N?360:460,x0=N?20:30,yl=N?190:170;let s='';
    const caught=scr&&y>=SNARE;
    /* lumen and the mucosal surface */
    s+=`<rect x="${x0}" y="${yl-120}" width="${W}" height="120" rx="12" style="fill:var(--field)"/>`;
    const w=wall(x0,yl,W,{h:N?110:96,labels:false});s+=w.svg;
    const px=x0+W*.5,ps=N?70:84;
    if(!caught&&y>=1)s+=polyp(px,yl,ps*(.35+.65*ramp(y,1,9)),stageAt(y),{ped:false,seed:4});
    if(caught){s+=`<circle cx="${f1(px)}" cy="${yl}" r="6" style="fill:var(--good);opacity:.35"/><text x="${f1(px)}" y="${yl-18}" class="t-sm t-mid" style="fill:var(--good)">polyp removed at year ${Math.round(SNARE)}</text>`}
    /* the scope comes in from the right around the screening year */
    if(scr){const k=bump(y,SNARE-1.6,SNARE+1.6),sx=lerp(x0+W+30,px+40,k),sy=yl-46;
      if(k>.02){s+=`<path d="M${f1(x0+W+40)} ${sy}H${f1(sx+14)}" style="stroke:var(--scope);stroke-width:9;stroke-linecap:round;opacity:.85"/>`+scope(sx,sy,180,{light:true});
        if(y>SNARE-.6&&y<SNARE+.4)s+=`<ellipse cx="${f1(px)}" cy="${f1(yl-ps*.22)}" rx="${f1(ps*.36)}" ry="${f1(ps*.2)}" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:3 3"/>`}}
    /* label for the current stage */
    const st=caught?'Clear bowel lining':y<1?'Normal lining':stageAt(y)<.42?'Small adenoma (polyp)':stageAt(y)<.7?'Large adenoma':stageAt(y)<.86?'Advanced adenoma, high-grade dysplasia':'Carcinoma, invading the wall';
    const col=caught||y<1?'var(--good)':stageAt(y)<.86?'var(--polyp-line)':'var(--tumour)';
    s+=`<text x="${x0+12}" y="${yl-96}" class="t-big" style="fill:${col}">${st}</text>`;
    s+=`<text x="${x0+12}" y="${yl-76}" class="t-sm">Year ${y.toFixed(1)} of a schematic 15</text>`;
    /* a year ruler */
    const ry=N?336:282;s+=`<line x1="${x0}" x2="${x0+W}" y1="${ry}" y2="${ry}" class="axis"/>`;
    for(let k=0;k<=YRS;k+=N?5:3){const xx=x0+W*k/YRS;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ry-4}" y2="${ry+4}" class="axis"/><text x="${f1(xx)}" y="${ry-8}" class="t-xs t-mid">${k}y</text>`}
    s+=`<circle cx="${f1(x0+W*y/YRS)}" cy="${ry}" r="5" style="fill:var(--brand)"/>`;
    if(scr)s+=`<path d="M${f1(x0+W*SNARE/YRS)} ${ry-14}v10" style="stroke:var(--accent);stroke-width:2"/><text x="${f1(x0+W*SNARE/YRS)}" y="${ry-18}" class="t-xs t-mid" style="fill:var(--accent)">screen</text>`;
    svg.innerHTML=s}
  sb.addEventListener('click',()=>{scr=!scr;sb.setAttribute('aria-pressed',scr);cap.innerHTML=scr?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  playWire(rg,$('#heroPlay'),draw,9000,'%t:player.replay%','home');draw(+rg.value);
};
