/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme.
   fiber(x0,x1,y,o)       a myelinated axon from x0 to x1. o: {seg (internode length), gap (node width), h (sheath height),
                          demy:[ [a,b],... ] stretches (0..1 of the length) with myelin stripped, thin:[ [a,b] ] remyelinated (thin sheaths),
                          cut:a (axon transected at a), loss (0..1 fade of the myelin in demy stretches), axonW}
                          Returns {svg, nodes:[x...], at(u)->x}. Node x positions are where a saltatory signal lands.
   tcell(x,y,r,o,lbl)     a T cell (orange) with TCR spikes; lbl 'T', 'CD8', 'Th17'
   bcell(x,y,r,o)         a B cell (violet) with antibody receptors on its surface
   plasma(x,y,r,o)        a plasma cell (CD20-negative): eccentric nucleus, lots of cytoplasm
   mac(x,y,r,o,active,seed) a macrophage / activated microglia: irregular body with myelin debris vacuoles
   oligo(x,y,r,o)         an oligodendrocyte: small body with processes
   ab(x,y,s,rot,c)        a Y-shaped antibody
   lesion(x,y,r,seed,o,c) an MRI-style ovoid lesion blob (bright on dark) */
function fiber(x0,x1,y,o={}){const seg=o.seg||46,gap=o.gap||6,h=o.h||14,L=x1-x0,dm=o.demy||[],th=o.thin||[],cut=o.cut,loss=o.loss==null?1:o.loss,aw=o.axonW||4;
  const inR=(u,R)=>R.some(([a,b])=>u>=a&&u<=b);let s='',nodes=[];
  const ax=cut==null?`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/>`
    :`<line x1="${f1(x0)}" x2="${f1(x0+L*cut-4)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round"/><circle cx="${f1(x0+L*cut-4)}" cy="${f1(y)}" r="${aw*1.4}" style="fill:var(--axon)"/><line x1="${f1(x0+L*cut+6)}" x2="${f1(x1)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--axon);stroke-width:${aw};stroke-linecap:round;stroke-dasharray:3 4;opacity:.45"/>`;
  s+=ax;
  for(let x=x0+gap;x<x1-gap;x+=seg+gap){const w=Math.min(seg,x1-gap-x);if(w<8)break;const mid=(x+w/2-x0)/L;
    nodes.push(x-gap/2);
    if(inR(mid,dm)){if(loss<1)s+=`<rect x="${f1(x)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${h}" rx="${h/2}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1;opacity:${f1(1-loss)}"/>`;continue}
    const thin=inR(mid,th),hh=thin?h*.55:h,ww=thin?w*.6:w,xx=thin?x+w*.2:x;
    if(thin)nodes.push(x+w*.1,x+w*.9);
    s+=`<rect x="${f1(xx)}" y="${f1(y-hh/2)}" width="${f1(ww)}" height="${f1(hh)}" rx="${f1(hh/2)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1"/>`}
  nodes.push(x1);
  return {svg:s,nodes,at:u=>x0+L*u}}
function tcell(x,y,r=10,o=1,lbl='T'){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<8;i++){const t=i/8*Math.PI*2;g+=`<line x1="${f1(Math.cos(t)*r)}" y1="${f1(Math.sin(t)*r)}" x2="${f1(Math.cos(t)*r*1.3)}" y2="${f1(Math.sin(t)*r*1.3)}" style="stroke:var(--tcell);stroke-width:1.6;stroke-linecap:round"/>`}
  g+=`<circle r="${r}" style="fill:var(--orange-soft);stroke:var(--tcell);stroke-width:1.8"/><circle r="${f1(r*.55)}" style="fill:var(--tcell);opacity:.8"/>`;
  if(lbl)g+=`<text y="${f1(r*.3)}" class="t-mid" style="font:700 ${f1(Math.max(7,r*.75))}px var(--mono);fill:var(--panel)">${lbl}</text>`;
  return g+'</g>'}
function ab(x,y,s=6,rot=0,c='var(--bcell)'){return `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" d="M0 0V${f1(s)}M0 0L${f1(-s*.7)} ${f1(-s*.7)}M0 0L${f1(s*.7)} ${f1(-s*.7)}" style="fill:none;stroke:${c};stroke-width:1.6;stroke-linecap:round"/>`}
function bcell(x,y,r=10,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<6;i++){const t=i/6*Math.PI*2+.3;g+=ab(Math.cos(t)*r,Math.sin(t)*r,r*.42,t*180/Math.PI+90)}
  g+=`<circle r="${r}" style="fill:var(--lymph);stroke:var(--bcell);stroke-width:1.8"/><circle r="${f1(r*.55)}" style="fill:var(--bcell);opacity:.8"/><text y="${f1(r*.3)}" class="t-mid" style="font:700 ${f1(Math.max(7,r*.75))}px var(--mono);fill:var(--panel)">B</text>`;
  return g+'</g>'}
function plasma(x,y,r=11,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><ellipse rx="${f1(r*1.2)}" ry="${r}" style="fill:var(--lymph);stroke:var(--plasma);stroke-width:1.8"/><circle cx="${f1(r*.45)}" r="${f1(r*.45)}" style="fill:var(--plasma)"/>`;
  for(let i=0;i<3;i++)g+=ab(-r*1.5-i*6,-r*.6+i*5,4,-90+i*20,'var(--plasma)');return g+'</g>'}
function mac(x,y,r=12,o=1,active=1,seed=3){const rr=rng(seed);let d='';const N=14;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2,k=r*(1+(rr()-.5)*.35*(active?1:.4));d+=(i?'L':'M')+f1(Math.cos(t)*k)+' '+f1(Math.sin(t)*k)}
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="${d}z" style="fill:var(--cell);stroke:var(--mac);stroke-width:1.8;stroke-linejoin:round"/><circle cx="${f1(-r*.25)}" cy="${f1(-r*.1)}" r="${f1(r*.32)}" style="fill:var(--mac);opacity:.75"/>`;
  if(active)for(let i=0;i<3;i++)g+=`<circle cx="${f1(r*(.2+.18*i))}" cy="${f1(r*(.35-.3*i))}" r="${f1(r*.16)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:.8"/>`;
  return g+'</g>'}
function oligo(x,y,r=8,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<4;i++){const t=-Math.PI/2+(i-1.5)*.55;g+=`<path d="M0 0 Q${f1(Math.cos(t)*r*1.6)} ${f1(Math.sin(t)*r*1.2)} ${f1(Math.cos(t)*r*2.6)} ${f1(Math.sin(t)*r*2.6+r*3)}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.4"/>`}
  g+=`<circle r="${r}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/><circle r="${f1(r*.45)}" style="fill:var(--nuc)"/>`;return g+'</g>'}
function lesion(x,y,r=6,seed=1,o=1,c='var(--mri-lesion)'){const rr=rng(seed);let d='';const N=12;for(let i=0;i<=N;i++){const t=i/N*Math.PI*2,k=r*(1+(rr()-.5)*.3);d+=(i?'L':'M')+f1(Math.cos(t)*k*1.25)+' '+f1(Math.sin(t)*k*.85)}
  return `<path transform="translate(${f1(x)} ${f1(y)})" d="${d}z" style="fill:${c};opacity:${(+o).toFixed(2)}"/>`}
