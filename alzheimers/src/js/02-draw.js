/* ---- drawing kit for this subject ----
   neuron(x,y,r,o,opts)  soma + dendrites + an axon heading off at opts.axon radians (default 0)
   microglia(x,y,r,o,active)  ramified when resting, rounder with retracted processes when active
   plaque(x,y,r,seed,o)  an amyloid plaque: dense amber core, fibrillar halo
   tangle(x,y,r,o)       a neurofibrillary tangle: rose flame-shaped skein
   All colours come from CSS tokens, so they follow the theme. */
function neuron(x,y,r=12,o=1,opts={}){const a=opts.axon??0,col=opts.col||'var(--cell-line)',fill=opts.fill||'var(--cell)',dead=opts.dead||0;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  const nd=opts.dendrites??5;for(let i=0;i<nd;i++){const t=a+Math.PI*.55+i*(Math.PI*.9/(nd-1)),L=r*(1.6+.5*Math.sin(i*1.7))*(1-.6*dead);
    const mx=Math.cos(t)*L*.55,my=Math.sin(t)*L*.55,ex=Math.cos(t+.25)*L,ey=Math.sin(t+.25)*L;
    g+=`<path d="M${f1(Math.cos(t)*r*.8)} ${f1(Math.sin(t)*r*.8)} Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.16)};stroke-linecap:round"/>`}
  if(opts.axonLen!==0){const L=opts.axonLen??r*3.4;g+=`<path d="M${f1(Math.cos(a)*r*.9)} ${f1(Math.sin(a)*r*.9)} L${f1(Math.cos(a)*L)} ${f1(Math.sin(a)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.2)};stroke-linecap:round;${dead?'stroke-dasharray:'+f1(r*.5)+' '+f1(r*.35*dead):''}"/>`}
  g+=`<circle r="${r}" style="fill:${fill};stroke:${col};stroke-width:${f1(Math.max(1.2,r*.12))}"/><circle r="${f1(r*.42)}" style="fill:var(--nuc)"/>`;
  return g+'</g>'}
function microglia(x,y,r=9,o=1,active=0){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<7;i++){const t=i/7*Math.PI*2+.3,L=r*(2.4-1.5*active)*(0.8+.4*((i*37)%10)/10);
    g+=`<path d="M0 0 L${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="stroke:var(--glia);stroke-width:${f1(r*.22)};stroke-linecap:round"/>`;
    if(!active)g+=`<path d="M${f1(Math.cos(t)*L*.7)} ${f1(Math.sin(t)*L*.7)} l${f1(Math.cos(t+.8)*r*.6)} ${f1(Math.sin(t+.8)*r*.6)}" style="stroke:var(--glia);stroke-width:${f1(r*.14)};stroke-linecap:round"/>`}
  g+=`<ellipse rx="${f1(r*(1+.25*active))}" ry="${f1(r*(.8+.3*active))}" style="fill:var(--glia);opacity:.9"/>`;
  return g+'</g>'}
function plaque(x,y,r=14,seed=1,o=1){const rr=rng(seed);let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<18;i++){const t=rr()*Math.PI*2,L=r*(.55+rr()*.6);g+=`<path d="M${f1(Math.cos(t)*r*.3)} ${f1(Math.sin(t)*r*.3)} L${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="stroke:var(--amber);stroke-width:1.2;opacity:.55;stroke-linecap:round"/>`}
  g+=`<circle r="${f1(r*.42)}" style="fill:var(--amber)"/><circle r="${f1(r*.95)}" style="fill:none;stroke:var(--amber);stroke-width:1;opacity:.35;stroke-dasharray:2 3"/>`;
  return g+'</g>'}
function tangle(x,y,r=10,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<5;i++){const off=(i-2)*r*.18;g+=`<path d="M${f1(off-r*.2)} ${f1(r)} C${f1(off-r*.7)} ${f1(r*.3)} ${f1(off+r*.6)} ${f1(-r*.2)} ${f1(off*.4)} ${f1(-r*1.1)}" style="fill:none;stroke:var(--rose);stroke-width:${f1(r*.16)};stroke-linecap:round"/>`}
  return g+'</g>'}
