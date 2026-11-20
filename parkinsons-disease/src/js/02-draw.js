/* ---- drawing kit for this subject (neuron and microglia shared with the Alzheimer's Companion) ----
   neuron(x,y,r,o,opts)   soma + dendrites + an axon heading off at opts.axon radians (default 0);
                          opts.pig adds neuromelanin granules, as in the pigmented nigral neurons
   microglia(x,y,r,o,active)  ramified when resting, rounder with retracted processes when active
   lewyBody(x,y,r,o)      a Lewy body: dense synuclein core with a pale halo
   lewyNeurite(x0,y0,x1,y1,o)  a thread-like synuclein deposit along a process
   syn(x,y,r,o,state)     one alpha-synuclein molecule: 0 helix on a membrane, 1 misfolded sheet
   vesicle(x,y,r,o,full)  a synaptic vesicle, gold when it holds dopamine
   All colours come from CSS tokens, so they follow the theme. */
function neuron(x,y,r=12,o=1,opts={}){const a=opts.axon??0,col=opts.col||'var(--cell-line)',fill=opts.fill||'var(--cell)',dead=opts.dead||0;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  const nd=opts.dendrites??5;for(let i=0;i<nd;i++){const t=a+Math.PI*.55+i*(Math.PI*.9/(nd-1)),L=r*(1.6+.5*Math.sin(i*1.7))*(1-.6*dead);
    const mx=Math.cos(t)*L*.55,my=Math.sin(t)*L*.55,ex=Math.cos(t+.25)*L,ey=Math.sin(t+.25)*L;
    g+=`<path d="M${f1(Math.cos(t)*r*.8)} ${f1(Math.sin(t)*r*.8)} Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.16)};stroke-linecap:round"/>`}
  if(opts.axonLen!==0){const L=opts.axonLen??r*3.4;g+=`<path d="M${f1(Math.cos(a)*r*.9)} ${f1(Math.sin(a)*r*.9)} L${f1(Math.cos(a)*L)} ${f1(Math.sin(a)*L)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.2)};stroke-linecap:round;${dead?'stroke-dasharray:'+f1(r*.5)+' '+f1(r*.35*dead):''}"/>`}
  g+=`<circle r="${r}" style="fill:${fill};stroke:${col};stroke-width:${f1(Math.max(1.2,r*.12))}"/><circle r="${f1(r*.42)}" style="fill:var(--nuc)"/>`;
  if(opts.pig){const pr=rng(opts.seed||3);for(let i=0;i<7;i++){const t=pr()*Math.PI*2,d=r*(.5+pr()*.35);g+=`<circle cx="${f1(Math.cos(t)*d)}" cy="${f1(Math.sin(t)*d)}" r="${f1(r*.11)}" style="fill:var(--ink);opacity:${f1(.55*opts.pig)}"/>`}}
  return g+'</g>'}
function microglia(x,y,r=9,o=1,active=0){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<7;i++){const t=i/7*Math.PI*2+.3,L=r*(2.4-1.5*active)*(0.8+.4*((i*37)%10)/10);
    g+=`<path d="M0 0 L${f1(Math.cos(t)*L)} ${f1(Math.sin(t)*L)}" style="stroke:var(--glia);stroke-width:${f1(r*.22)};stroke-linecap:round"/>`;
    if(!active)g+=`<path d="M${f1(Math.cos(t)*L*.7)} ${f1(Math.sin(t)*L*.7)} l${f1(Math.cos(t+.8)*r*.6)} ${f1(Math.sin(t+.8)*r*.6)}" style="stroke:var(--glia);stroke-width:${f1(r*.14)};stroke-linecap:round"/>`}
  g+=`<ellipse rx="${f1(r*(1+.25*active))}" ry="${f1(r*(.8+.3*active))}" style="fill:var(--glia);opacity:.9"/>`;
  return g+'</g>'}
function lewyBody(x,y,r=10,o=1){return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><circle r="${f1(r)}" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1;opacity:.9"/><circle r="${f1(r*.62)}" style="fill:var(--rose)"/><circle r="${f1(r*.62)}" style="fill:none;stroke:var(--panel);stroke-width:${f1(r*.08)};opacity:.35;stroke-dasharray:1.5 2"/></g>`}
function lewyNeurite(x0,y0,x1,y1,o=1){const mx=(x0+x1)/2+(y1-y0)*.15,my=(y0+y1)/2-(x1-x0)*.15;return `<path d="M${f1(x0)} ${f1(y0)} Q${f1(mx)} ${f1(my)} ${f1(x1)} ${f1(y1)}" style="fill:none;stroke:var(--rose);stroke-width:3.2;stroke-linecap:round;stroke-dasharray:6 3;opacity:${(+o).toFixed(2)}"/>`}
function syn(x,y,r=6,o=1,state=0){const k=clamp(state);let d='';
  if(k<.5){d=`M${f1(-r)} 0`;for(let i=0;i<4;i++)d+=` q${f1(r*.25)} ${f1((i%2?1:-1)*r*.5)} ${f1(r*.5)} 0`}
  else{d=`M${f1(-r)} ${f1(-r*.5)} L${f1(r)} ${f1(-r*.5)} L${f1(-r)} 0 L${f1(r)} 0 L${f1(-r)} ${f1(r*.5)} L${f1(r)} ${f1(r*.5)}`}
  return `<path transform="translate(${f1(x)} ${f1(y)})" d="${d}" style="fill:none;stroke:${k<.5?'var(--sage)':'var(--rose)'};stroke-width:${f1(Math.max(1.4,r*.28))};stroke-linecap:round;stroke-linejoin:round;opacity:${(+o).toFixed(2)}"/>`}
function vesicle(x,y,r=6,o=1,full=1){return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${full?'var(--amber-soft)':'var(--panel)'};stroke:${full?'var(--amber)':'var(--line)'};stroke-width:1.4;opacity:${(+o).toFixed(2)}"/>`+(full?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.4)}" style="fill:var(--amber);opacity:${(+o*.9).toFixed(2)}"/>`:'')}
