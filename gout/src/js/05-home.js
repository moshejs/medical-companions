
/* =============== home: two years, before and after urate-lowering therapy =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  /* schematic: flares on fixed days; urate steps down after allopurinol starts at month 12 */
  const FL=[{d:40,h:.9},{d:150,h:.75},{d:250,h:1},{d:330,h:.8},{d:420,h:.55},{d:505,h:.4}];
  const SU=d=>{const m=d/30.4;if(m<12)return 8.9+.35*Math.sin(d/23);const k=Math.min(5,Math.floor((m-12)/1.2));return Math.max(5.1,8.9-k*.78-.2*ramp(m,12+k*1.2,12.6+k*1.2))};
  function draw(t){const N=vb(svg,'520 300','400 340');
    const D=t*730,x0=N?34:44,x1=N?392:504,X=d=>lerp(x0,x1,d/730);let s='';
    const fy0=N?44:40,fy1=N?130:118,uy0=N?168:150,uy1=N?296:262,U=v=>lerp(uy1,uy0,(v-3)/7);
    s+=`<rect x="${f1(X(365))}" y="20" width="${f1(x1-X(365))}" height="${f1(uy1-14)}" rx="8" style="fill:var(--sea-soft);opacity:.55"/>`;
    s+=`<text x="${f1(X(365)+8)}" y="34" class="t-xs" style="fill:var(--sea)">allopurinol, titrated →</text><text x="${x0}" y="34" class="t-xs" style="fill:var(--terra)">no urate-lowering</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${fy1}" y2="${fy1}" class="axis"/>`;
    FL.forEach(e=>{if(e.d>D)return;const x=X(e.d),h=(fy1-fy0)*e.h,age=clamp((D-e.d)/25);s+=`<path d="M${f1(x-6)} ${fy1} L${f1(x)} ${f1(fy1-h)} L${f1(x+6)} ${fy1}z" style="fill:var(--terra);opacity:${f1(1-.45*age)}"/>`});
    s+=`<text x="${x0}" y="${fy1+14}" class="t-xs" style="fill:var(--terra)">FLARES</text>`;
    /* urate panel */
    s+=`<rect x="${x0}" y="${f1(U(6))}" width="${f1(x1-x0)}" height="${f1(U(3)-U(6))}" style="fill:var(--good-soft);opacity:.7"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(U(6.8))}" y2="${f1(U(6.8))}" style="stroke:var(--xtal);stroke-dasharray:4 4"/><text x="${x1}" y="${f1(U(6.8)-4)}" class="t-xs t-end" style="fill:var(--xtal)">6.8 crystals can form</text>`;
    s+=`<text x="${x1}" y="${f1(U(6)+12)}" class="t-xs t-end" style="fill:var(--good)">target &lt; 6 mg/dL</text>`;
    let p='';for(let d=0;d<=Math.min(D,730);d+=4)p+=(p?'L':'M')+f1(X(d))+' '+f1(U(SU(d)));
    s+=`<path d="${p}" style="fill:none;stroke:var(--gold);stroke-width:3"/>`;
    s+=`<text x="${x0}" y="${f1(uy0-6)}" class="t-xs" style="fill:var(--gold)">SERUM URATE, mg/dL</text>`;
    [4,6,8,10].forEach(v=>s+=`<text x="${x0-6}" y="${f1(U(v)+3)}" class="t-xs t-end">${v}</text>`);
    for(let m=0;m<=24;m+=6)s+=`<text x="${f1(X(m*30.4))}" y="${f1(uy1+14)}" class="t-xs ${m===0?'':m===24?'t-end':'t-mid'}">${m===0?'month 0':m}</text>`;
    s+=`<line x1="${f1(X(D))}" x2="${f1(X(D))}" y1="24" y2="${f1(uy1)}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    const n1=FL.filter(e=>e.d<=Math.min(D,365)).length,n2=FL.filter(e=>e.d>365&&e.d<=D).length;
    s+=`<text x="${x1}" y="${f1(fy0-6)}" class="t-sm t-end">flares: year 1 <tspan style="fill:var(--terra);font-weight:700">${n1}</tspan> · year 2 <tspan style="fill:var(--sea);font-weight:700">${n2}</tspan></text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
