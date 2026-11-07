/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string to
   concatenate into an <svg>'s innerHTML (airway() and alveoli() return {svg, ...}). Everything here is
   schematic: no glyph encodes a measured value unless the caller passes one in, and the kit holds no clinical
   numbers (no FEV1 or GOLD cut-offs, no saturation targets, no doses): callers pass them in from the research,
   with the citation in the surrounding text. The kit draws no words except the optional short labels named
   below, which callers can switch off and replace with their own.
   lungs(x,y,s,o)            a front view of the chest's two lungs and the airway tree, top of the trachea at
                             (x,y), s = height. o: {hyper (0..1 over-inflation: wider, lower, a flattened
                             diaphragm), bullae (0..1 dark emphysema patches, upper zones first), lower (true:
                             patches in the lower zones instead, the alpha-1 pattern), mucus (0..1 amber in the
                             bronchi), inflam (0..1 reddened bronchi), tree (true: draw the bronchial tree),
                             breathe (0..1 the in-out phase: lungs swell slightly), fill, op}.
   airway(x,y,r,o)           a small airway cut across, centre (x,y), outer radius r. o: {wall (0..1 extra wall
                             thickness: remodelling), squeeze (0..1 smooth-muscle narrowing), mucus (0..1 mucus
                             plug filling the lumen), inflam (0..1 red wall with inflammatory cells), cilia
                             (true), tether (0..1 alveolar attachments pulling it open: 1 healthy, 0 lost to
                             emphysema), collapse (0..1 the lumen flattening on breathing out), ph (phase for
                             cell motion), seed}. Returns {svg, lumen (the open lumen radius)}.
   alveoli(x,y,s,o)          a cluster of air sacs at the end of an airway, centre (x,y), s = cluster width.
                             o: {destroy (0..1: walls break and sacs merge into one big space: emphysema),
                             cap (true: capillaries on the walls), o2 (0..1 oxygen dots crossing into the
                             blood), co2 (0..1 carbon dioxide dots leaving), trap (0..1 trapped air shading),
                             elastin (true: elastic fibres as gold springs), ph, seed}. Returns {svg, area
                             (relative gas-exchange surface, 1 healthy)}.
   inhaler(x,y,s,kind,o)     a device drawn upright, centre (x,y), s = height. kind: 'pmdi' (pressurised
                             canister in an L-shaped actuator), 'dpi' (a disc-shaped dry-powder inhaler),
                             'smi' (soft-mist cylinder), 'spacer' (a pMDI on a spacer tube), 'neb' (nebuliser
                             cup and mask). o: {col (body colour var, default --rx), puff (0..1 a plume or
                             mist leaving the mouthpiece), cap (true: cap on), rot (degrees)}.
   person(x,y,s,o)           a simple standing figure, feet at (x,y), s = height. o: {col, lean (0..1 leaning
                             forward on the hands, the tripod position), breath (0..1 a breath plume),
                             cannula (true: oxygen tubing to the nose), walk (phase: legs swing), op}.
   cig(x,y,w,o)              a cigarette lying from (x,y), length w, with o: {burn (0..1 how much has burnt),
                             smoke (0..1 smoke plume), ph}.
   smoke(x,y,w,h,o)          a drifting smoke cloud in the box; o: {amt (0..1), col (default --smoke), ph, seed}.
   dots(x,y,w,h,n,o)         n gas or particle dots scattered in the box (seeded); o: {col, r, ph (drift), seed}.
   gauge(x,y,r,v,o)          a half-dial, v in 0..1; o: {lo, hi (band colours along the arc as [[from,to,col],…]),
                             lbl (text under the needle), col}.
   chip(x,y,txt,o)           a rounded label box with its text; o: {col (border/text colour var), fill, w (fixed
                             width), anchor ('start'|'middle'), size (font px)}.
   wrapT(x,y,txt,max,o)      text wrapped to lines of at most max characters, as <tspan>s; o: {cls ('t-sm'),
                             lh (line height px, 15), anchor, style}. Returns {svg, h (height used)}.
   axes(x,y,w,h,o)           a plot frame: left axis, bottom axis, optional grid lines; o: {xt [[v,label],…],
                             yt [[v,label],…] (v in 0..1 from the origin), xl, yl (axis titles), grid (true)}.
   spiroVT(fev1,fvc)         a function u -> v for a volume-time curve (u in 0..1 of 6 seconds), v as a fraction
                             of fvc reached: pass fev1 and fvc in litres; the curve passes fev1 at 1 s.
   spiroFV(pef,fvc,scoop)    a function u -> flow (0..1 of pef) along exhaled volume u in 0..1: a fast rise to the
                             peak, then a straight fall (scoop 0) or a concave 'scooped' fall (scoop 1, obstruction).
   heart(x,y,s,o)            a heart outline; o: {right (0..1 right-ventricle enlargement), col}.
*/
const KIT_LBL={trachea:'trachea',airway:'airway',alveoli:'air sacs',mouth:'mouthpiece'};
function _sd(seed){return rng(seed||7)}
function lungs(x,y,s,o={}){
  const h=s,hy=clamp(o.hyper||0),br=clamp(o.breathe||0),w=h*(.92+.14*hy)*(1+.025*br);
  const top=y+h*.08,bot=y+h*(.92+.08*hy),cx=x,op=o.op==null?1:o.op;
  const L=(sg)=>{const xo=cx+sg*h*.06,xe=cx+sg*w*.5,dia=bot-h*.12*(1-hy*.8);
    return `M${f1(xo)} ${f1(top+h*.12)}C${f1(xo+sg*h*.12)} ${f1(top-h*.02)} ${f1(xe-sg*h*.08)} ${f1(top+h*.08)} ${f1(xe)} ${f1(top+h*.45)}`+
      `L${f1(xe-sg*h*.02)} ${f1(bot)}Q${f1(cx+sg*w*.3)} ${f1(dia)} ${f1(xo+sg*h*.04)} ${f1(bot-h*.02)}`+
      (sg<0?`L${f1(xo)} ${f1(top+h*.32)}`:`Q${f1(cx+sg*h*.16)} ${f1(top+h*.5)} ${f1(xo)} ${f1(top+h*.32)}`)+'Z'};
  let g=`<g style="opacity:${op}">`;
  g+=`<path d="${L(-1)}" style="fill:${o.fill||'var(--lung)'};stroke:var(--bronchi);stroke-width:1.6"/><path d="${L(1)}" style="fill:${o.fill||'var(--lung)'};stroke:var(--bronchi);stroke-width:1.6"/>`;
  const bu=clamp(o.bullae||0);
  if(bu>0){const R=_sd(11);for(let i=0;i<9;i++){const sg=i%2?1:-1,zy=o.lower?lerp(.62,.86,R()):lerp(.2,.48,R());
    const px=cx+sg*w*lerp(.16,.38,R()),py=y+h*zy,rr=h*lerp(.03,.065,R())*ramp(bu,i/12,i/12+.4);
    if(rr>.5)g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(rr)}" style="fill:var(--panel);stroke:var(--alv-edge);stroke-width:1;opacity:.92"/>`}}
  if(o.tree!==false){const tc=o.inflam?`color-mix(in srgb,var(--inflamed) ${Math.round(clamp(o.inflam)*80)}%,var(--bronchi))`:'var(--bronchi)';
    const sw=Math.max(1.2,h*.03);
    g+=`<path d="M${f1(cx)} ${f1(y)}V${f1(top+h*.28)}" style="stroke:${tc};stroke-width:${f1(sw*1.5)};fill:none;stroke-linecap:round"/>`;
    const br2=(sg)=>{const bx=cx+sg*w*.16,by=top+h*.42;let d=`M${f1(cx)} ${f1(top+h*.28)}Q${f1(cx+sg*h*.05)} ${f1(top+h*.34)} ${f1(bx)} ${f1(by)}`;
      d+=`M${f1(bx)} ${f1(by)}L${f1(bx+sg*w*.12)} ${f1(by-h*.12)}M${f1(bx)} ${f1(by)}L${f1(bx+sg*w*.15)} ${f1(by+h*.1)}M${f1(bx)} ${f1(by)}L${f1(bx+sg*w*.05)} ${f1(by+h*.25)}`;
      d+=`M${f1(bx+sg*w*.12)} ${f1(by-h*.12)}l${f1(sg*w*.06)} ${f1(-h*.06)}M${f1(bx+sg*w*.12)} ${f1(by-h*.12)}l${f1(sg*w*.08)} ${f1(h*.03)}`;
      d+=`M${f1(bx+sg*w*.15)} ${f1(by+h*.1)}l${f1(sg*w*.08)} ${f1(-h*.02)}M${f1(bx+sg*w*.15)} ${f1(by+h*.1)}l${f1(sg*w*.05)} ${f1(h*.08)}`;return d};
    g+=`<path d="${br2(-1)}${br2(1)}" style="stroke:${tc};stroke-width:${f1(sw)};fill:none;stroke-linecap:round"/>`;
    if(o.mucus)g+=`<path d="${br2(-1)}${br2(1)}" style="stroke:var(--mucus);stroke-width:${f1(sw*.55)};fill:none;stroke-linecap:round;stroke-dasharray:${f1(h*.03)} ${f1(h*.05)};opacity:${f1(clamp(o.mucus))}"/>`}
  return g+'</g>';
}
function airway(x,y,r,o={}){
  const wall=clamp(o.wall||0),sq=clamp(o.squeeze||0),mu=clamp(o.mucus||0),inf=clamp(o.inflam||0),
    teth=o.tether==null?1:clamp(o.tether),col=clamp(o.collapse||0),R=_sd(o.seed||3),ph=o.ph||0;
  const rw=r*(.2+.22*wall), lumen=Math.max(r*.04,(r-rw)*(1-.55*sq)*(1-.5*col*(1-teth*.7)));
  const ry=lumen*(1-.45*col*(1-teth*.6));
  let s='';
  /* alveolar attachments: spokes that hold the airway open */
  const nT=10;for(let i=0;i<nT;i++){const a=i/nT*Math.PI*2,k=clamp(teth*1.4-(i%3)*.25);if(k<=.05)continue;
    const x1=x+Math.cos(a)*r,y1=y+Math.sin(a)*r,x2=x+Math.cos(a)*r*1.45,y2=y+Math.sin(a)*r*1.45;
    s+=`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--alv-edge);stroke-width:1.4;opacity:${f1(k)}"/>`}
  const wc=inf?`color-mix(in srgb,var(--inflamed) ${Math.round(inf*70)}%,var(--airway))`:'var(--airway)';
  s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${wc};stroke:var(--bronchi);stroke-width:1.4"/>`;
  /* smooth muscle ring */
  s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r-rw*.35)}" style="fill:none;stroke:var(--muscle);stroke-width:${f1(rw*(.25+.35*sq))};stroke-dasharray:${f1(r*.18)} ${f1(r*.08)};opacity:.85"/>`;
  if(inf>0){for(let i=0;i<9;i++){const a=R()*Math.PI*2,d=lerp(lumen+rw*.25,r-rw*.2,R());
    s+=`<circle cx="${f1(x+Math.cos(a+ph*.2)*d)}" cy="${f1(y+Math.sin(a+ph*.2)*d)}" r="${f1(Math.max(1.2,r*.05))}" style="fill:${i%3?'var(--neut)':'var(--macro)'};opacity:${f1(inf)}"/>`}}
  /* lumen */
  s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(lumen)}" ry="${f1(ry)}" style="fill:var(--air-soft);stroke:var(--bronchi);stroke-width:1"/>`;
  if(o.cilia!==false&&lumen>r*.12){const n=18;let d='';for(let i=0;i<n;i++){const a=i/n*Math.PI*2,b=Math.sin(ph*6+i)*.25;
    d+=`M${f1(x+Math.cos(a)*lumen)} ${f1(y+Math.sin(a)*ry)}L${f1(x+Math.cos(a+b*.3)*lumen*.86)} ${f1(y+Math.sin(a+b*.3)*ry*.86)}`}
    s+=`<path d="${d}" style="stroke:var(--bronchi);stroke-width:1;fill:none;opacity:.7"/>`}
  if(mu>0){const mr=lumen*clamp(mu*1.05),mry=ry*clamp(mu*1.05);
    s+=`<ellipse cx="${f1(x+lumen*.12*(1-mu))}" cy="${f1(y+ry*.18*(1-mu))}" rx="${f1(mr)}" ry="${f1(mry)}" style="fill:var(--mucus);opacity:.88"/>`}
  return {svg:s,lumen:lumen*(1-mu)};
}
function alveoli(x,y,s,o={}){
  const de=clamp(o.destroy||0),ph=o.ph||0,R=_sd(o.seed||5),r=s*.16;
  const C=[[0,0],[-1.7,-.9],[1.7,-.9],[-1.8,1],[1.8,1],[0,-1.9],[0,1.95]];
  let g='';const cx=x,cy=y;
  /* the merged space grows as walls break */
  if(de>0)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*(1+2.1*de))}" style="fill:var(--alv);stroke:var(--alv-edge);stroke-width:1.6;opacity:${f1(clamp(de*1.6))}"/>`;
  C.forEach(([dx,dy],i)=>{const k=clamp(1-de*1.25+(i===0?.2:0)-(R()*.25*de));if(k<=.02)return;
    const px=cx+dx*r*(1+de*.4),py=cy+dy*r*(1+de*.4);
    g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" style="fill:var(--alv);stroke:var(--alv-edge);stroke-width:1.6;opacity:${f1(k)}"/>`;
    if(o.cap!==false)g+=`<path d="M${f1(px-r*.9)} ${f1(py+r*.35)}Q${f1(px)} ${f1(py+r*1.1)} ${f1(px+r*.9)} ${f1(py+r*.35)}" style="fill:none;stroke:var(--capillary);stroke-width:2;opacity:${f1(k*.9)}"/>`;
    if(o.elastin)g+=`<path d="M${f1(px-r*.7)} ${f1(py-r*.72)}q${f1(r*.12)} ${f1(-r*.14)} ${f1(r*.24)} 0t${f1(r*.24)} 0t${f1(r*.24)} 0t${f1(r*.24)} 0t${f1(r*.24)} 0" style="fill:none;stroke:var(--elastin);stroke-width:1.4;opacity:${f1(k)}"/>`});
  if(o.trap)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*(1.2+1.9*de))}" style="fill:var(--co2-soft);opacity:${f1(clamp(o.trap)*.6)}"/>`;
  const gas=(n,col,amt,dir)=>{let d='';for(let i=0;i<n;i++){const a=R()*Math.PI*2,u=(ph*.6+i/n)%1,rr=r*lerp(.2,1.1+de,dir>0?u:1-u);
    d+=`<circle cx="${f1(cx+Math.cos(a)*rr)}" cy="${f1(cy+Math.sin(a)*rr)}" r="${f1(Math.max(1.5,s*.018))}" style="fill:${col};opacity:${f1(amt)}"/>`}return d};
  if(o.o2)g+=gas(10,'var(--o2)',clamp(o.o2),1);
  if(o.co2)g+=gas(8,'var(--co2)',clamp(o.co2),-1);
  const area=clamp(1-de*.75,.1,1);
  return {svg:g,area};
}
function inhaler(x,y,s,kind,o={}){
  const col=o.col||'var(--rx)',pf=clamp(o.puff||0),rot=o.rot||0;let g='';
  const plume=(px,py,dir,len)=>{let d='';for(let i=0;i<7;i++){const u=i/6,rr=s*(.03+.06*u)*pf;
    d+=`<circle cx="${f1(px+dir*len*u*pf)}" cy="${f1(py+(i%2?-1:1)*s*.02*u)}" r="${f1(rr)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:.8;opacity:${f1(pf*(1-u*.5))}"/>`}return d};
  if(kind==='pmdi'||kind==='spacer'){
    g+=`<rect x="${f1(x-s*.13)}" y="${f1(y-s*.5)}" width="${f1(s*.26)}" height="${f1(s*.6)}" rx="${f1(s*.06)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
    g+=`<rect x="${f1(x-s*.17)}" y="${f1(y-s*.12)}" width="${f1(s*.34)}" height="${f1(s*.62)}" rx="${f1(s*.07)}" style="fill:${col};stroke:var(--ink);stroke-width:1.2"/>`;
    g+=`<rect x="${f1(x+s*.12)}" y="${f1(y+s*.28)}" width="${f1(s*.3)}" height="${f1(s*.2)}" rx="${f1(s*.04)}" style="fill:${col};stroke:var(--ink);stroke-width:1.2"/>`;
    if(kind==='spacer'){g+=`<rect x="${f1(x+s*.42)}" y="${f1(y+s*.2)}" width="${f1(s*.9)}" height="${f1(s*.36)}" rx="${f1(s*.18)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.2;opacity:.9"/>`;
      g+=plume(x+s*.45,y+s*.38,1,s*.8)}
    else{if(o.cap)g+=`<rect x="${f1(x+s*.4)}" y="${f1(y+s*.27)}" width="${f1(s*.06)}" height="${f1(s*.22)}" style="fill:var(--ink)"/>`;g+=plume(x+s*.45,y+s*.38,1,s*.7)}}
  else if(kind==='dpi'){
    g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(s*.4)}" ry="${f1(s*.42)}" style="fill:${col};stroke:var(--ink);stroke-width:1.2"/><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(s*.26)}" ry="${f1(s*.28)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1"/>`;
    g+=`<rect x="${f1(x-s*.1)}" y="${f1(y-s*.56)}" width="${f1(s*.2)}" height="${f1(s*.18)}" rx="${f1(s*.04)}" style="fill:${col};stroke:var(--ink);stroke-width:1.2"/>`;
    if(pf){for(let i=0;i<8;i++){const u=i/7;g+=`<circle cx="${f1(x+(i%3-1)*s*.04)}" cy="${f1(y-s*.6-u*s*.5*pf)}" r="${f1(s*.02)}" style="fill:var(--ink);opacity:${f1(pf*(1-u*.6))}"/>`}}}
  else if(kind==='smi'){
    g+=`<rect x="${f1(x-s*.14)}" y="${f1(y-s*.5)}" width="${f1(s*.28)}" height="${f1(s*.9)}" rx="${f1(s*.12)}" style="fill:${col};stroke:var(--ink);stroke-width:1.2"/><rect x="${f1(x-s*.14)}" y="${f1(y+s*.12)}" width="${f1(s*.28)}" height="${f1(s*.28)}" rx="${f1(s*.1)}" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.2"/>`;
    g+=`<rect x="${f1(x-s*.06)}" y="${f1(y-s*.62)}" width="${f1(s*.12)}" height="${f1(s*.14)}" rx="${f1(s*.03)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1"/>`;
    if(pf){for(let i=0;i<10;i++){const u=i/9;g+=`<circle cx="${f1(x+Math.sin(i*2.1)*s*.06*u)}" cy="${f1(y-s*.66-u*s*.45*pf)}" r="${f1(s*(.015+.03*u))}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:.6;opacity:${f1(pf*(1-u*.4))}"/>`}}}
  else if(kind==='neb'){
    g+=`<path d="M${f1(x-s*.2)} ${f1(y+s*.1)}h${f1(s*.4)}l${f1(-s*.06)} ${f1(s*.36)}h${f1(-s*.28)}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
    g+=`<path d="M${f1(x-s*.34)} ${f1(y-s*.12)}q${f1(s*.34)} ${f1(-s*.4)} ${f1(s*.68)} 0v${f1(s*.14)}h${f1(-s*.68)}Z" style="fill:${col};stroke:var(--ink);stroke-width:1.2;opacity:.85"/>`;
    g+=`<path d="M${f1(x)} ${f1(y+s*.46)}v${f1(s*.1)}" style="stroke:var(--muted);stroke-width:2"/>`;
    if(pf)g+=plume(x,y,0,0)+`<circle cx="${f1(x)}" cy="${f1(y-s*.02)}" r="${f1(s*.12*pf)}" style="fill:var(--air-soft);opacity:${f1(pf*.8)}"/>`}
  return rot?`<g transform="rotate(${rot} ${f1(x)} ${f1(y)})">${g}</g>`:g;
}
function person(x,y,s,o={}){
  const col=o.col||'var(--brand)',lean=clamp(o.lean||0),op=o.op==null?1:o.op,w=o.walk;
  const hx=x+lean*s*.18,hy=y-s*(.9-.08*lean),sw=Math.max(2,s*.07);
  let g=`<g style="opacity:${op}">`;
  const hipX=x,hipY=y-s*.45,shX=x+lean*s*.14,shY=y-s*(.74-.05*lean);
  const sl=w==null?0:Math.sin(w*Math.PI*2)*s*.12;
  g+=`<path d="M${f1(hipX)} ${f1(hipY)}L${f1(x-s*.1+sl)} ${f1(y)}M${f1(hipX)} ${f1(hipY)}L${f1(x+s*.1-sl)} ${f1(y)}" style="stroke:${col};stroke-width:${f1(sw)};stroke-linecap:round;fill:none"/>`;
  g+=`<path d="M${f1(hipX)} ${f1(hipY)}L${f1(shX)} ${f1(shY)}" style="stroke:${col};stroke-width:${f1(sw*1.3)};stroke-linecap:round"/>`;
  const handY=lerp(y-s*.5,hipY+s*.02,lean),handX=lerp(x+s*.16,x+s*.2,lean);
  g+=`<path d="M${f1(shX)} ${f1(shY+s*.03)}L${f1(handX)} ${f1(handY)}M${f1(shX)} ${f1(shY+s*.03)}L${f1(lerp(x-s*.15,x+s*.1,lean))} ${f1(handY)}" style="stroke:${col};stroke-width:${f1(sw*.85)};stroke-linecap:round;fill:none"/>`;
  g+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(s*.1)}" style="fill:${col}"/>`;
  if(o.cannula)g+=`<path d="M${f1(hx+s*.08)} ${f1(hy+s*.03)}q${f1(s*.06)} ${f1(s*.15)} ${f1(-s*.06)} ${f1(s*.3)}T${f1(x-s*.2)} ${f1(y-s*.2)}" style="fill:none;stroke:var(--air);stroke-width:${f1(Math.max(1.2,s*.02))}"/>`;
  if(o.breath){const b=clamp(o.breath);for(let i=0;i<3;i++)g+=`<circle cx="${f1(hx+s*(.16+i*.08))}" cy="${f1(hy+s*.02)}" r="${f1(s*(.025+i*.012)*b)}" style="fill:var(--air-soft);stroke:var(--air);stroke-width:.8;opacity:${f1(b*(1-i*.25))}"/>`}
  return g+'</g>';
}
function smoke(x,y,w,h,o={}){const amt=clamp(o.amt==null?1:o.amt),R=_sd(o.seed||9),ph=o.ph||0;let g='';
  for(let i=0;i<14;i++){const u=(R()+ph*.15)%1,px=x+w*lerp(.1,.9,R())+Math.sin(ph*2+i)*w*.04,py=y+h*(1-u),rr=Math.min(w,h)*lerp(.06,.16,R())*(.6+u*.6);
    g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(rr)}" style="fill:${o.col||'var(--smoke)'};opacity:${f1(amt*.35*(1-u*.7))}"/>`}return g}
function cig(x,y,w,o={}){const b=clamp(o.burn||0),hgt=Math.max(4,w*.09),len=w*(1-b*.6);let g='';
  g+=`<rect x="${f1(x)}" y="${f1(y-hgt/2)}" width="${f1(w*.24)}" height="${f1(hgt)}" style="fill:var(--accent);opacity:.85"/>`;
  g+=`<rect x="${f1(x+w*.24)}" y="${f1(y-hgt/2)}" width="${f1(Math.max(0,len-w*.24))}" height="${f1(hgt)}" style="fill:var(--panel);stroke:var(--line)"/>`;
  g+=`<rect x="${f1(x+len)}" y="${f1(y-hgt/2)}" width="${f1(hgt*.5)}" height="${f1(hgt)}" style="fill:var(--o2)"/>`;
  if(o.smoke)g+=smoke(x+len-w*.1,y-w*.6,w*.4,w*.58,{amt:o.smoke,ph:o.ph,seed:4});return g}
function dots(x,y,w,h,n,o={}){const R=_sd(o.seed||2),ph=o.ph||0;let g='';
  for(let i=0;i<n;i++){const px=x+((R()+ph*.1*(i%3+1))%1)*w,py=y+R()*h;g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(o.r||2)}" style="fill:${o.col||'var(--ink)'}"/>`}return g}
function gauge(x,y,r,v,o={}){const a0=Math.PI,a1=2*Math.PI;let g='';
  const arc=(f,t,col)=>{const A=lerp(a0,a1,f),B=lerp(a0,a1,t);return `<path d="M${f1(x+Math.cos(A)*r)} ${f1(y+Math.sin(A)*r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+Math.cos(B)*r)} ${f1(y+Math.sin(B)*r)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.18)}"/>`};
  (o.bands||[[0,1,'var(--panel-2)']]).forEach(([f,t,c])=>g+=arc(f,t,c));
  const A=lerp(a0,a1,clamp(v));
  g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+Math.cos(A)*r*.82)}" y2="${f1(y+Math.sin(A)*r*.82)}" style="stroke:${o.col||'var(--ink)'};stroke-width:2.4;stroke-linecap:round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:${o.col||'var(--ink)'}"/>`;
  if(o.lbl)g+=`<text x="${f1(x)}" y="${f1(y+18)}" class="t-sm" text-anchor="middle">${o.lbl}</text>`;return g}
function chip(x,y,txt,o={}){const sz=o.size||12.5,w=o.w||Math.max(30,String(txt).replace(/<[^>]+>/g,'').length*sz*.58+16),h=sz+12,an=o.anchor||'start';
  const x0=an==='middle'?x-w/2:x;
  return `<rect x="${f1(x0)}" y="${f1(y-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:${o.fill||'var(--panel)'};stroke:${o.col||'var(--line)'};stroke-width:1.2"/><text x="${f1(x0+w/2)}" y="${f1(y+sz*.36)}" text-anchor="middle" style="font:600 ${sz}px var(--body);fill:${o.tcol||o.col||'var(--ink)'}">${txt}</text>`}
function wrapT(x,y,txt,max,o={}){const words=String(txt).split(/\s+/),lines=[];let cur='';
  words.forEach(w=>{if((cur+' '+w).trim().length>max&&cur){lines.push(cur);cur=w}else cur=(cur+' '+w).trim()});if(cur)lines.push(cur);
  const lh=o.lh||15;const sv=`<text x="${f1(x)}" y="${f1(y)}" class="${o.cls||'t-sm'}"${o.anchor?` text-anchor="${o.anchor}"`:''}${o.style?` style="${o.style}"`:''}>`+lines.map((l,i)=>`<tspan x="${f1(x)}" dy="${i?lh:0}">${l}</tspan>`).join('')+'</text>';
  return {svg:sv,h:lines.length*lh}}
function axes(x,y,w,h,o={}){let g='';
  if(o.grid!==false)(o.yt||[]).forEach(([v])=>g+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h-v*h)}" y2="${f1(y+h-v*h)}" class="grid"/>`);
  g+=`<path d="M${f1(x)} ${f1(y)}V${f1(y+h)}H${f1(x+w)}" class="axis" style="fill:none"/>`;
  (o.xt||[]).forEach(([v,l])=>g+=`<text x="${f1(x+v*w)}" y="${f1(y+h+15)}" class="t-xs" text-anchor="middle">${l}</text>`);
  (o.yt||[]).forEach(([v,l])=>g+=`<text x="${f1(x-6)}" y="${f1(y+h-v*h+4)}" class="t-xs" text-anchor="end">${l}</text>`);
  if(o.xl)g+=`<text x="${f1(x+w)}" y="${f1(y+h+30)}" class="t-xs" text-anchor="end">${o.xl}</text>`;
  if(o.yl)g+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs">${o.yl}</text>`;return g}
function spiroVT(fev1,fvc){const r=clamp(fev1/fvc,.05,.99),k=-Math.log(1-r);return u=>{const ts=u*6;return 1-Math.exp(-k*ts)}}
function spiroFV(pef,fvc,scoop=0){return u=>{if(u<.08)return ease(u/.08);const v=(u-.08)/.92;const lin=1-v,sc=Math.pow(1-v,2.4);return clamp(lerp(lin,sc,scoop))}}
function heart(x,y,s,o={}){const rv=clamp(o.right||0),c=o.col||'var(--heart)';
  return `<path d="M${f1(x)} ${f1(y+s*.42)}C${f1(x-s*(.62+.18*rv))} ${f1(y+s*.05)} ${f1(x-s*(.5+.16*rv))} ${f1(y-s*.42)} ${f1(x-s*.12)} ${f1(y-s*.3)}Q${f1(x)} ${f1(y-s*.25)} ${f1(x+s*.06)} ${f1(y-s*.34)}C${f1(x+s*.45)} ${f1(y-s*.5)} ${f1(x+s*.6)} ${f1(y-s*.02)} ${f1(x)} ${f1(y+s*.42)}Z" style="fill:var(--o2-soft);stroke:${c};stroke-width:1.8"/>`+
    (rv?`<path d="M${f1(x-s*.08)} ${f1(y-s*.2)}C${f1(x-s*(.5+.16*rv))} ${f1(y-s*.15)} ${f1(x-s*(.45+.1*rv))} ${f1(y+s*.15)} ${f1(x-s*.04)} ${f1(y+s*.34)}" style="fill:var(--co2-soft);stroke:var(--co2);stroke-width:1.2;opacity:${f1(.4+.6*rv)}"/>`:'')}
