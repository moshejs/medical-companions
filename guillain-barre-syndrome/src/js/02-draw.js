/* ---- drawing kit for the GBS Companion ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string, or an object
   with .svg (and usually .at, named anchor points in the caller's SVG coordinates), to concatenate into an <svg>'s
   innerHTML. Everything is schematic: no glyph encodes a measured value unless the caller passes one in, and the
   kit holds no clinical numbers (no thresholds, doses, time windows, scores or trial results). Pass them in from
   the research, with the citation in the surrounding text. Clip paths use fresh ids on every call, so any number
   of glyphs can share a page. Text labels stay a fixed size whatever the scale.

   ORIENTATION. A nerve runs LEFT to RIGHT: the cell body (spinal cord) is off to the left, the muscle off to the
   right, so impulses travel rightwards. A body seen from the front: the person's right is on the viewer's left.

   ---- nerve ----
   nerveFibre(x,y,w,o)  a myelinated motor axon from x to x+w, centre line at y, cut lengthwise: axon core, myelin
                        internodes with lamellae and Schwann-cell nuclei, and nodes of Ranvier between them.
     o.h      outer height of a myelin segment (default 36). o.n number of internodes (default 5).
     o.demy   0..1, or an array with one value per internode: myelin stripped from the paranodes inward (AIDP).
              At 1 the segment is bare axon. o.mac (number or array, 0..1 per internode): a macrophage on it.
     o.remy   0..1 or array: thin new myelin (shorter, paler internodes) grows over the bare stretch.
     o.nodeHit 0..1, or an array with one value per node: the axolemma at that node is attacked (AMAN): antibodies,
              complement and a red, injured node. o.ab false hides the antibodies.
     o.cut    0..1: the axon breaks at that fraction of the length and the distal part degenerates (pale, beaded,
              myelin in ovoids). o.regrow 0..1: a growth cone advances from the break.
     o.pulse  0..1 or null: the impulse's position. o.snap true (default) draws it at the nearest node behind it
              (saltatory); false draws it where it is. o.block index of a node where the impulse stops (a bar).
     o.dim    0..1 fades the whole fibre (context drawing).
     Returns {svg, at:{nodes:[[x,y],...], segs:[[x0,x1],...], top, bot, cut:[x,y]}, X:fraction->x}.

   nodeZoom(x,y,s,o)    close-up of one node of Ranvier. (x,y) = top left; s = scale, 1 = 300 wide, 190 tall.
                        Myelin ends with paranodal loops on each side, the axon below, sodium channels (--nav)
                        clustered in the node gap, gangliosides standing on the membrane.
     o.mode   'aman' (default: gangliosides on the axolemma at the node) | 'aidp' (on the myelin's outer surface).
     o.ab     0..1 antibodies arrive and bind the gangliosides. o.c3 0..1 complement deposits and membrane attack
              pores. o.nav 0..1 the share of sodium channels lost. o.mac 0..1 a macrophage pushes in (in 'aidp' it
              strips myelin; in 'aman' it slides into the periaxonal space). o.labels true names the parts.
     Returns {svg, at:{node,axon,left,right,gang:[[x,y],...]}, w, h}.

   ganglioside(x,y,s,o) a ganglioside standing on a membrane at (x,y), pointing up (o.ang to rotate): a ceramide
                        tail below the line and a sugar chain above it. o.kind 'GM1' | 'GD1a' | 'GD1b' | 'GT1a' |
                        'GQ1b' sets the number of sialic acids (diamonds, 1 to 4). o.col overrides the sugar colour
                        (default --ganglioside; use var(--los) on a bacterium: the same hue on purpose).
   antibody(x,y,s,o)    an IgG molecule, arms up and stem down, with its tip at (x,y) the antigen-binding end.
                        o.ang rotation in degrees, o.col (default --antibody), o.op.
   mac(x,y,r,o)         a complement membrane attack complex, a ring pore seen from above, at (x,y).
   c3dots(x,y,w,n,seed) n small complement deposits scattered along a stretch of membrane.
   macrophage(x,y,r,o)  an amoeboid macrophage centred at (x,y): pseudopods, nucleus, granules. o.seed, o.reach
                        (0..1 how far one pseudopod stretches to the right, o.dir 'r'|'l'|'d').
   campy(x,y,s,o)       Campylobacter jejuni: a curved, spiral rod with a flagellum at each pole, coated with
                        lipo-oligosaccharide sugar beads (--los). (x,y) = centre, s = length. o.ang, o.los false hides
                        the coat, o.ph (0..1) wiggles the flagella.
   virus(x,y,r,o)       a generic enveloped virus with spikes, for CMV, EBV, Zika, influenza or SARS-CoV-2.

   ---- body ----
   bodyFront(x,y,s,o)   a front body outline, centred at x with the top of the head at y, s = height (146 local).
     o.level   0..1 ascending weakness: a --weak wash rises from the feet (0) to the top of the head (1). Hands
               hang low, so they weaken with the trunk, as in GBS. o.zones {legs,arms,trunk,face,eyes} 0..1 for
               other patterns (Miller Fisher: eyes; pharyngeal-cervical-brachial: face, arms, neck). Both may combine.
     o.tingle  0..1 sensory marks at the hands and feet. o.vent true: a breathing tube at the mouth.
     o.pain    0..1 a pain mark in the lower back. o.col overrides the wash colour. o.labels true names the zones.
     Returns {svg, at:{head,eyes,mouth,chest,hand,foot,back}, h}.

   lungs(x,y,s,o)       trachea, two lungs and the diaphragm, front view. (x,y) = top left; s = scale, 1 = 140 wide,
                        120 tall. o.fill 0..1 inflation, o.weak 0..1 the diaphragm washed --weak (a weak breathing muscle),
                        o.tube true an endotracheal tube in the trachea.
     Returns {svg, at:{trachea,left,right,diaphragm}, w, h}.

   ---- shared helpers (from the Stroke Companion's kit, unchanged) ----
   clock(cx,cy,r,min,o)  a clock face with hands at min minutes and a filled sector: o {full (60), col, label, ticks, h0}.
   icons(x,y,o)          an icon array (a 'hundred people' block): o {n (100), cols (10), k (highlighted), size, gap, col,
                         base, shape:'dot'}. Returns {svg,h,at}.
   curve(x,y,w,h,f,o)    a plotted function in a box: o {x0,x1,y0,y1,upto,col,fill,bands,dot,lw,dash}. Returns {svg,X,Y,at}.
   monoFn(P)             monotone cubic through cited points (space nested arrays: see the brief). Returns f(x).
   tline(x,y,w,o)        a horizontal time axis: o {min,max,step,fmt,label,big}. Returns {svg,X}.
   gauge(cx,cy,r,v,max,o) a half-dial gauge: o {bands,label,big}.
   ladder(x,y,w,h,steps,o) rising stairs, one per label: o {at,col,done}. Returns {svg,top(i)}.
   pill(x,y,s,o)         a tablet: o {ang,col,txt,round}.
   person(x,y,s,fill,o)  a person pictogram, (x,y) its top centre.
   smoothPath(P,closed)  Catmull-Rom path through points.   inPoly(p,P) point in polygon.   ptsD(P) polyline path.
   bezPts(segs,N)        sample a chain of cubic Beziers.   marker(id,color) (core) an arrowhead for <defs>.
   kitLabel(x,y,text,o)  a small label with a halo so it reads on any drawing: o {a:'m'|'e', halo (var(--panel))}.
   blob(cx,cy,r,seed,o)  an irregular closed path string: o {n (18), rough (.16), sq}. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[closed?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
/* sample a chain of cubic Bezier segments [[p0,c1,c2,p1],...] into points */
function bezPts(segs,N=22){const out=[];segs.forEach((g,j)=>{for(let i=j?1:0;i<=N;i++){const t=i/N,m=1-t;
  out.push([m*m*m*g[0][0]+3*m*m*t*g[1][0]+3*m*t*t*g[2][0]+t*t*t*g[3][0],m*m*m*g[0][1]+3*m*m*t*g[1][1]+3*m*t*t*g[2][1]+t*t*t*g[3][1]])}});return out}
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function clock(cx,cy,r,min,o={}){const full=o.full||60,u=clamp(min/full),col=o.col||'var(--brand)',A=v=>(v*360-90)*Math.PI/180,n=o.ticks||12;
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
  if(u>0){const a=A(u),large=u>.5?1:0;s+=u>=.999?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r-3)}" style="fill:${col};opacity:.22"/>`:`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-r+3)}A${f1(r-3)} ${f1(r-3)} 0 ${large} 1 ${f1(cx+(r-3)*Math.cos(a))} ${f1(cy+(r-3)*Math.sin(a))}Z" style="fill:${col};opacity:.22"/>`}
  for(let i=0;i<n;i++){const a=A(i/n);s+=`<line x1="${f1(cx+Math.cos(a)*r*.8)}" y1="${f1(cy+Math.sin(a)*r*.8)}" x2="${f1(cx+Math.cos(a)*r*.93)}" y2="${f1(cy+Math.sin(a)*r*.93)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  const mA=A((min%60)/60),hA=A((((o.h0||0)*60+min)/60%12)/12);
  s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(hA)*r*.5)}" y2="${f1(cy+Math.sin(hA)*r*.5)}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(mA)*r*.78)}" y2="${f1(cy+Math.sin(mA)*r*.78)}" style="stroke:${col};stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function icons(x,y,o={}){const n=o.n||100,c=o.cols||10,sz=o.size||12,gp=o.gap==null?3:o.gap,k=o.k||0,col=o.col||'var(--brand)',base=o.base||'var(--line)';
  const at=i=>[x+(i%c)*(sz+gp),y+Math.floor(i/c)*(sz+gp*1.4)];let s='';
  for(let i=0;i<n;i++){const[px,py]=at(i),f=i<k?col:base;s+=o.shape==='dot'?`<circle cx="${f1(px+sz/2)}" cy="${f1(py+sz/2)}" r="${f1(sz*.42)}" style="fill:${f}"/>`:person(px+sz/2,py,sz,f)}
  return {svg:s,h:Math.ceil(n/c)*(sz+gp*1.4),at}}
function curve(x,y,w,h,f,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1,up=o.upto==null?x1:clamp(o.upto,x0,x1),col=o.col||'var(--brand)';
  const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h-h*(clamp(v,y0-(y1-y0)*.02,y1+(y1-y0)*.02)-y0)/(y1-y0),at=v=>[X(v),Y(f(v))];
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
  (o.bands||[]).forEach(b=>{const ya=Y(Math.min(b.to,y1)),yb=Y(Math.max(b.from,y0));s+=`<rect x="${f1(x)}" y="${f1(ya)}" width="${f1(w)}" height="${f1(Math.max(0,yb-ya))}" style="fill:${b.col};opacity:.18"/>`;
    if(b.label)s+=`<text x="${f1(x+w-4)}" y="${f1(ya+11)}" class="t-xs t-end">${b.label}</text>`});
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  if(up>x0){const N=Math.max(2,Math.round(160*(up-x0)/(x1-x0)));let d='';for(let i=0;i<=N;i++){const p=at(x0+(up-x0)*i/N);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    if(o.fill)s+=`<path d="${d}L${f1(X(up))} ${f1(y+h)}L${f1(X(x0))} ${f1(y+h)}Z" style="fill:${col};opacity:.18"/>`;
    s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${o.lw||2.6};stroke-linejoin:round;stroke-linecap:round${o.dash?';stroke-dasharray:'+o.dash:''}"/>`;
    if(o.dot){const p=at(up);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`}}
  return {svg:s,X,Y,at}}
function tline(x,y,w,o={}){const mn=o.min||0,mx=o.max==null?1:o.max,st=o.step||(mx-mn)/5,fmt=o.fmt||(v=>v),X=v=>x+w*(v-mn)/(mx-mn);
  let s=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" class="axis"/>`;
  for(let v=mn;v<=mx+1e-9;v+=st){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y-4)}" y2="${f1(y+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(o.big?y-8:y+16)}" class="t-xs t-mid">${fmt(v)}</text>`}
  if(o.label)s+=`<text x="${f1(x+w)}" y="${f1(o.big?y+16:y+30)}" class="t-xs t-end">${o.label}</text>`;
  return {svg:s,X}}
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  s+=`<text x="${f1(cx-r)}" y="${f1(cy+14)}" class="t-xs t-mid">0</text><text x="${f1(cx+r)}" y="${f1(cy+14)}" class="t-xs t-mid">${max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+16)}" class="t-sm t-mid">${o.label}</text>`;
  return s}
function ladder(x,y,w,h,steps,o={}){const n=steps.length,sw=w/n,sh=h/n,at=o.at==null?-1:o.at,col=o.col||'var(--rx)';let s='';
  const top=i=>[x+sw*(i+.5),y+h-sh*(i+1)];
  steps.forEach((t,i)=>{const sx=x+sw*i,sy=y+h-sh*(i+1),on=i===at,done=o.done&&i<at;
    s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(sw-3)}" height="${f1(sh*(i+1))}" rx="6" style="fill:${on?col:done?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1.2;opacity:${on||done?1:.9}"/>`;
    s+=`<text x="${f1(sx+(sw-3)/2)}" y="${f1(sy+16)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${t}</text>`});
  return {svg:s,top}}
function pill(x,y,s=30,o={}){const col=o.col||'var(--rx)',r=s*.22;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(o.round)g+=`<circle r="${f1(s/2)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><line x1="${f1(-s*.3)}" x2="${f1(s*.3)}" y1="0" y2="0" style="stroke:${col};stroke-width:1.2;opacity:.6"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  if(o.txt)g+=`<text x="${o.round?0:f1(-s/4)}" y="${f1(r*.42)}" class="t-mid" style="font:700 ${f1(r*1.05)}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
/* ---- kit internals ---- */
let _kid=0;
const kid=p=>p+'_'+(++_kid);
function kitLabel(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${o.a==='m'?' t-mid':o.a==='e'?' t-end':''}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:${o.halo||'var(--panel)'};stroke-width:3px;stroke-linejoin:round">${t}</text>`}
/* Catmull-Rom points through P, k per span */
function crPts(P,closed=true,k=6){const n=P.length,out=[],m=closed?n:n-1;
  for(let i=0;i<m;i++){const a=P[closed?(i-1+n)%n:Math.max(0,i-1)],b=P[i],c=P[(i+1)%n],d=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    for(let j=0;j<k;j++){const t=j/k,u=t*t,v=u*t,f=q=>.5*(2*b[q]+(c[q]-a[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*u+(3*b[q]-a[q]-3*c[q]+d[q])*v);out.push([f(0),f(1)])}}
  if(!closed)out.push(P[n-1]);return out}
/* rolling bumps along a dense closed outline: rounded gyri meeting at narrow dips */
function gyrate(P,amp,per,seed=1){const n=P.length,rr=rng(seed),ph=[rr()*6,rr()*6];let s=0;const out=[];
  for(let i=0;i<n;i++){const a=P[(i-1+n)%n],b=P[i],c=P[(i+1)%n],dx=c[0]-a[0],dy=c[1]-a[1],l=Math.hypot(dx,dy)||1;s+=Math.hypot(b[0]-a[0],b[1]-a[1])/2;
    const w=s/per+.28*Math.sin(s/per*.9+ph[0]),h=Math.pow(Math.abs(Math.sin(Math.PI*w)),.55)-.55,k=amp*h*(1+.3*Math.sin(s/per*.37+ph[1]));
    out.push([b[0]+dy/l*k,b[1]-dx/l*k])}
  return out}
/* an irregular closed path, for lesions and clots */
function blob(cx,cy,r,seed=1,o={}){const n=o.n||18,ro=o.rough==null?.16:o.rough,rr=rng(seed),P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*ro*2;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*(o.sq||1)])}
  return smoothPath(P)}

/* ---- brainSide: local box 300 x 250, facing left ---- */
/* ---- nerve ---- */
const NV_SIAL={GM1:1,GD1a:2,GD1b:2,GT1a:3,GQ1b:4};
const nvArr=(v,n)=>Array.from({length:n},(_,i)=>Array.isArray(v)?clamp(v[i]||0):clamp(v||0));
function ganglioside(x,y,s=24,o={}){const k=s/24,col=o.col||'var(--ganglioside)',ns=NV_SIAL[o.kind||'GM1']||1;
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})" style="opacity:${o.op==null?1:o.op}">`;
  g+=`<path d="M-1.6 0V6M1.6 0V6" style="stroke:var(--muted);stroke-width:1.2;stroke-linecap:round"/>`;
  g+=`<path d="M0 0V-18" style="stroke:${col};stroke-width:1.4"/>`;
  [-4,-9,-14,-19].forEach((yy,i)=>{g+=`<circle cx="0" cy="${yy}" r="${i===3?2.4:2.1}" style="fill:${col}"/>`});
  for(let i=0;i<ns;i++){const yy=-7-i*4.6,xx=i%2?-4.6:4.6;g+=`<path d="M0 ${f1(yy+1)}L${f1(xx*.55)} ${f1(yy)}" style="stroke:${col};stroke-width:1"/><rect x="${f1(xx-1.9)}" y="${f1(yy-1.9)}" width="3.8" height="3.8" transform="rotate(45 ${f1(xx)} ${f1(yy)})" style="fill:var(--panel);stroke:${col};stroke-width:1.2"/>`}
  return g+'</g>'}
function antibody(x,y,s=18,o={}){const k=s/18,col=o.col||'var(--antibody)';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})" style="opacity:${o.op==null?1:o.op}"><path d="M-7 0L0 7.5L7 0M0 7.5V18" style="fill:none;stroke:${col};stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round"/><path d="M-4.4 -1.8L-8.8 2.4M4.4 -1.8L8.8 2.4" style="stroke:${col};stroke-width:2;stroke-linecap:round;opacity:.65"/></g>`}
function mac(x,y,r=5,o={}){return `<g style="opacity:${o.op==null?1:o.op}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:none;stroke:var(--complement);stroke-width:${f1(r*.55)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.38)}" style="fill:var(--panel)"/></g>`}
function c3dots(x,y,w,n,seed=3){const rr=rng(seed);let s='';for(let i=0;i<n;i++){s+=`<circle cx="${f1(x+rr()*w)}" cy="${f1(y+(rr()-.5)*6)}" r="${f1(1.6+rr()*1.2)}" style="fill:var(--complement)"/>`}return s}
function macrophage(x,y,r=16,o={}){const rr=rng(o.seed||7),P=[],n=14,reach=clamp(o.reach||0),dir=o.dir||'r',da=dir==='l'?Math.PI:dir==='d'?Math.PI/2:0;
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;let k=1+(rr()-.5)*.34+(i%4===0?.22:0);const dd=Math.cos(a-da);if(dd>.8)k+=reach*1.1*(dd-.8)/.2;P.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k*.86])}
  let s=`<path d="${smoothPath(P)}" style="fill:var(--macrophage);opacity:.92;stroke:var(--ink);stroke-width:1"/>`;
  s+=`<path d="${blob(x-r*.12,y+r*.06,r*.36,o.seed||7,{n:10,rough:.22})}" style="fill:var(--ink);opacity:.35"/>`;
  for(let i=0;i<5;i++){s+=`<circle cx="${f1(x+(rr()-.5)*r*1.1)}" cy="${f1(y+(rr()-.5)*r*.9)}" r="${f1(1.2+rr())}" style="fill:var(--ink);opacity:.3"/>`}
  return s}
function campy(x,y,s=60,o={}){const k=s/60,id=kid('cj'),ph=(o.ph||0)*Math.PI*2;
  const body='M-28 4C-22 -10 -12 -10 -4 0S14 10 22 -2C25 -7 28 -8 30 -6';
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})">`;
  const fl=(sx,sy,dir)=>{let d=`M${sx} ${sy}`;for(let i=1;i<=10;i++){d+=`L${f1(sx+dir*i*2.6)} ${f1(sy+Math.sin(i*.9+ph)*3)}`}return d};
  g+=`<path d="${fl(-30,5,-1)}" style="fill:none;stroke:var(--bact);stroke-width:1.2"/><path d="${fl(31,-6,1)}" style="fill:none;stroke:var(--bact);stroke-width:1.2"/>`;
  g+=`<path d="${body}" style="fill:none;stroke:var(--ink);stroke-width:9.4;stroke-linecap:round;opacity:.5"/><path d="${body}" style="fill:none;stroke:var(--bact);stroke-width:8;stroke-linecap:round"/>`;
  if(o.los!==false){[[-24,-4,-30],[-14,-9,-10],[-4,-6,10],[8,4,170],[18,4,160],[26,-12,-20],[-20,10,180],[0,9,180]].forEach(([a,b,an])=>{g+=ganglioside(a,b,10,{ang:an,kind:'GM1',col:'var(--los)'})})}
  return g+'</g>'}
function virus(x,y,r=12,o={}){const col=o.col||'var(--virus)';let s='';
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.35)}" y2="${f1(y+Math.sin(a)*r*1.35)}" style="stroke:${col};stroke-width:1.6"/><circle cx="${f1(x+Math.cos(a)*r*1.38)}" cy="${f1(y+Math.sin(a)*r*1.38)}" r="${f1(r*.12)}" style="fill:${col}"/>`}
  return s+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${col};opacity:.55;stroke:${col};stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.5)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:.4"/>`}
function nerveFibre(x,y,w,o={}){const n=o.n||5,h=o.h||36,gap=Math.max(6,h*.24),ah=h*.36,sw=(w-gap*(n+1))/n,dim=o.dim==null?1:1-clamp(o.dim)*.7;
  const demy=nvArr(o.demy,n),remy=nvArr(o.remy,n),macs=nvArr(o.mac,n),hit=nvArr(o.nodeHit,n+1),cut=o.cut==null?null:clamp(o.cut),X=f=>x+f*w;
  const segs=[],nodes=[];for(let i=0;i<=n;i++){const nx=x+gap/2+i*(sw+gap);nodes.push([nx,y]);if(i<n)segs.push([nx+gap/2,nx+gap/2+sw])}
  const cx=cut==null?null:X(cut),regrow=clamp(o.regrow||0);
  let s=`<g style="opacity:${f1(dim)}">`;
  /* axon core */
  if(cx==null)s+=`<rect x="${f1(x)}" y="${f1(y-ah/2)}" width="${f1(w)}" height="${f1(ah)}" rx="${f1(ah/2)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
  else{s+=`<rect x="${f1(x)}" y="${f1(y-ah/2)}" width="${f1(cx-x-3)}" height="${f1(ah)}" rx="${f1(ah/2)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
    const rr=rng(11);for(let bx=cx+6;bx<x+w-4;bx+=ah*1.1){s+=`<ellipse cx="${f1(bx)}" cy="${f1(y+(rr()-.5)*2)}" rx="${f1(ah*.42)}" ry="${f1(ah*.34)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1;opacity:.45;stroke-dasharray:2 2"/>`}
    s+=`<path d="M${f1(cx-3)} ${f1(y-ah/2-3)}L${f1(cx+1)} ${f1(y-2)}L${f1(cx-4)} ${f1(y+2)}L${f1(cx)} ${f1(y+ah/2+3)}" style="fill:none;stroke:var(--damage);stroke-width:2"/>`;
    if(regrow>0){const gx=cx+regrow*(x+w-cx-10);s+=`<rect x="${f1(cx-3)}" y="${f1(y-ah*.3)}" width="${f1(gx-cx+3)}" height="${f1(ah*.6)}" rx="${f1(ah*.3)}" style="fill:var(--axon);stroke:var(--rec);stroke-width:1.4"/><path d="M${f1(gx)} ${f1(y-ah*.5)}l6 -4M${f1(gx)} ${f1(y)}l8 0M${f1(gx)} ${f1(y+ah*.5)}l6 4" style="stroke:var(--rec);stroke-width:1.6;stroke-linecap:round"/>`}}
  /* myelin internodes */
  segs.forEach(([a,b],i)=>{const mid=(a+b)/2,distal=cx!=null&&mid>cx;
    if(distal){const rr=rng(20+i);for(let k=0;k<3;k++){const ox=a+sw*(.18+k*.32);s+=`<ellipse cx="${f1(ox)}" cy="${f1(y)}" rx="${f1(sw*.12)}" ry="${f1(h*.36)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1;opacity:.6"/>`}return}
    const d=demy[i],keep=1-d,half=sw/2*keep;
    if(keep>.02){const x0=mid-half,x1=mid+half,r=Math.min(h/2,half);
      s+=`<rect x="${f1(x0)}" y="${f1(y-h/2)}" width="${f1(x1-x0)}" height="${f1(h)}" rx="${f1(r)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/>`;
      for(let l=1;l<=3;l++){const yy=h/2*(.42+l*.15);s+=`<path d="M${f1(x0+r*.7)} ${f1(y-yy)}H${f1(x1-r*.7)}M${f1(x0+r*.7)} ${f1(y+yy)}H${f1(x1-r*.7)}" style="stroke:var(--myelin-line);stroke-width:.7;opacity:.55"/>`}
      s+=`<rect x="${f1(x0+r*.35)}" y="${f1(y-ah/2)}" width="${f1(Math.max(0,x1-x0-r*.7))}" height="${f1(ah)}" style="fill:var(--axon)"/>`;
      if(keep>.5)s+=`<ellipse cx="${f1(mid)}" cy="${f1(y-h/2+h*.13)}" rx="${f1(Math.min(9,half*.4))}" ry="${f1(h*.08)}" style="fill:var(--schwann)"/>`}
    if(d>0&&d<1){/* ragged stripped ends */const rr=rng(30+i);[mid-half,mid+half].forEach(ex=>{for(let k=0;k<3;k++)s+=`<circle cx="${f1(ex+(rr()-.5)*8)}" cy="${f1(y+(rr()-.5)*h*.8)}" r="${f1(1.4+rr()*1.4)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:.7"/>`})}
    if(remy[i]>0){const rw=sw*.42*remy[i],rh=h*.66;[[a+2,a+2+rw],[b-2-rw,b-2]].forEach(([p,q])=>{if(q-p>2)s+=`<rect x="${f1(p)}" y="${f1(y-rh/2)}" width="${f1(q-p)}" height="${f1(rh)}" rx="${f1(Math.min(rh/2,(q-p)/2))}" style="fill:var(--remyelin);stroke:var(--myelin-line);stroke-width:1"/><rect x="${f1(p+2)}" y="${f1(y-ah/2)}" width="${f1(Math.max(0,q-p-4))}" height="${f1(ah)}" style="fill:var(--axon)"/>`})}
    if(macs[i]>0)s+=`<g style="opacity:${f1(macs[i])}">${macrophage(mid,y-h/2-h*.25,h*.36,{seed:5+i,reach:macs[i],dir:'d'})}</g>`});
  /* nodes */
  nodes.forEach(([nx],i)=>{const v=hit[i],distal=cx!=null&&nx>cx;if(distal)return;
    s+=`<rect x="${f1(nx-gap/2+1)}" y="${f1(y-ah/2-1.5)}" width="${f1(gap-2)}" height="${f1(ah+3)}" rx="2" style="fill:${v>.3?'var(--damage)':'var(--node)'};opacity:${f1(.55+.45*Math.max(v,.4))}"/>`;
    if(v>0){if(o.ab!==false){s+=antibody(nx-3,y-ah/2-2,11,{ang:-20,op:v})+antibody(nx+3,y+ah/2+2,11,{ang:160,op:v})}
      if(v>.5)s+=mac(nx,y-ah/2-16,3.4,{op:(v-.5)*2})}});
  /* impulse */
  let pX=null;if(o.pulse!=null){const p=clamp(o.pulse),px=X(p);pX=px;if(o.snap!==false){let best=nodes[0][0];nodes.forEach(([nx])=>{if(nx<=px+1)best=nx});pX=best}
    if(o.block!=null&&nodes[o.block]&&pX>nodes[o.block][0])pX=nodes[o.block][0];
    s+=`<circle cx="${f1(pX)}" cy="${f1(y)}" r="${f1(ah*.9)}" style="fill:var(--impulse);opacity:.35"/><circle cx="${f1(pX)}" cy="${f1(y)}" r="${f1(ah*.45)}" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`}
  if(o.block!=null&&nodes[o.block]){const bx=nodes[o.block][0]+gap*.5+2;s+=`<line x1="${f1(bx)}" x2="${f1(bx)}" y1="${f1(y-h*.7)}" y2="${f1(y+h*.7)}" style="stroke:var(--damage);stroke-width:3;stroke-linecap:round"/>`}
  s+='</g>';
  return {svg:s,at:{nodes,segs,top:y-h/2,bot:y+h/2,cut:cx==null?null:[cx,y],pulse:pX},X}}
function nodeZoom(x,y,s=1,o={}){const k=s,mode=o.mode||'aman',ab=clamp(o.ab||0),c3=clamp(o.c3||0),navL=clamp(o.nav||0),mc=clamp(o.mac||0),id=kid('nz');
  const P=(a,b)=>[x+a*k,y+b*k],q=(a,b)=>`${f1(x+a*k)} ${f1(y+b*k)}`;
  /* local: axon membrane (axolemma) top at 110, axon 110..170; myelin left 0..112, right 188..300, from 30 to 110 */
  let g=`<rect x="${f1(x)}" y="${f1(y+110*k)}" width="${f1(300*k)}" height="${f1(62*k)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
  g+=`<line x1="${f1(x)}" x2="${f1(x+300*k)}" y1="${f1(y+110*k)}" y2="${f1(y+110*k)}" style="stroke:var(--axon-line);stroke-width:2"/>`;
  const strip=mode==='aidp'?mc:0;
  [[0,112,1],[188,300,-1]].forEach(([a,b,dir])=>{const inner=dir>0?b:a;const shift=strip*40*dir;
    const x0=Math.min(a,b),x1=Math.max(a,b);
    const xa=dir>0?x0:x1+0,xb=inner-shift;const L=Math.min(xa,xb),R=Math.max(xa,xb);
    if(R-L>4)g+=`<rect x="${f1(x+L*k)}" y="${f1(y+30*k)}" width="${f1((R-L)*k)}" height="${f1(78*k)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/>`;
    for(let l=0;l<5;l++){const yy=38+l*14;g+=`<path d="M${q(L+6,yy)}H${f1(x+(R-6)*k)}" style="stroke:var(--myelin-line);stroke-width:.8;opacity:.5"/>`}
    /* paranodal loops */
    for(let l=0;l<5;l++){const yy=40+l*14,cxl=xb-dir*6;g+=`<ellipse cx="${f1(x+cxl*k)}" cy="${f1(y+yy*k)}" rx="${f1(7*k)}" ry="${f1(6*k)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1"/>`}});
  /* sodium channels in the node */
  for(let i=0;i<6;i++){const cxn=126+i*9.6,lost=i/6<navL;g+=`<rect x="${f1(x+(cxn-2.6)*k)}" y="${f1(y+104*k)}" width="${f1(5.2*k)}" height="${f1(12*k)}" rx="${f1(2*k)}" style="fill:${lost?'var(--panel-2)':'var(--nav)'};stroke:${lost?'var(--line)':'var(--ink)'};stroke-width:.8;opacity:${lost?.6:1}"/>`}
  /* gangliosides */
  const gs=mode==='aidp'?[[20,30],[60,30],[95,30],[205,30],[240,30],[280,30]]:[[124,110],[138,110],[152,110],[166,110],[178,110]];
  const gang=[];gs.forEach(([a,b],i)=>{gang.push(P(a,b));g+=ganglioside(x+a*k,y+b*k,16*k,{kind:'GM1'})});
  /* antibodies descend */
  gs.forEach(([a,b],i)=>{if(ab<=0)return;const d=(1-ab)*60;g+=antibody(x+a*k,y+(b-19-d)*k,13*k,{ang:180,op:Math.min(1,ab*1.6)})});
  if(c3>0){g+=`<g style="opacity:${f1(c3)}">`+c3dots(x+(mode==='aidp'?10:118)*k,y+(mode==='aidp'?24:100)*k,(mode==='aidp'?280:66)*k,mode==='aidp'?14:10,9);
    (mode==='aidp'?[[40,30],[260,30]]:[[132,110],[170,110]]).forEach(([a,b])=>{g+=mac(x+a*k,y+(b+2)*k,5*k)});g+='</g>';
    if(mode==='aman'&&c3>.6)g+=`<rect x="${f1(x+118*k)}" y="${f1(y+108*k)}" width="${f1(64*k)}" height="${f1(5*k)}" style="fill:var(--damage);opacity:${f1((c3-.6)*2.2)}"/>`}
  if(mc>0){const mx=mode==='aidp'?150:150,my=mode==='aidp'?14:74;g+=`<g style="opacity:${f1(Math.min(1,mc*1.5))}">${macrophage(x+mx*k,y+(my-(1-mc)*30)*k,24*k,{seed:4,reach:mc,dir:'d'})}</g>`}
  if(o.labels){g+=kitLabel(x+56*k,y+24*k,'myelin',{a:'m'})+kitLabel(x+150*k,y+(mode==='aidp'?98:92)*k-(mode==='aman'&&ab>0?0:0),'node',{a:'m'})+kitLabel(x+150*k,y+150*k,'axon',{a:'m'})+kitLabel(x+150*k,y+132*k,'sodium channels',{a:'m'})}
  return {svg:g,at:{node:P(150,110),axon:P(150,145),left:P(56,70),right:P(244,70),gang},w:300*k,h:190*k}}

/* ---- body ---- */
const BODY_PATH='M0 -50C7 -50 11 -45 11 -39C11 -35 9 -31 6 -29V-25C14 -24 21 -22 24 -16C26 -8 29 8 31 22C32 26 31 28 28 28C26 28 25 26 24 23L19 -2L17 6L18 24L18 52C18 60 15 72 14 90C14 94 12 96 8 96C4 96 3 94 3 90L2 52L0 34L-2 52L-3 90C-3 94 -4 96 -8 96C-12 96 -14 94 -14 90C-15 72 -18 60 -18 52L-18 24L-17 6L-19 -2L-24 23C-25 26 -26 28 -28 28C-31 28 -32 26 -31 22C-29 8 -26 -8 -24 -16C-21 -22 -14 -24 -6 -25V-29C-9 -31 -11 -35 -11 -39C-11 -45 -7 -50 0 -50Z';
function bodyFront(x,y,s=146,o={}){const k=s/146,id=kid('bf'),col=o.col||'var(--weak)',lv=clamp(o.level||0),Z=o.zones||{};
  const T=(a,b)=>[x+a*k,y+(b+50)*k];
  let g=`<g transform="translate(${f1(x)} ${f1(y+50*k)}) scale(${k.toFixed(3)})"><clipPath id="${id}"><path d="${BODY_PATH}"/></clipPath><path d="${BODY_PATH}" style="fill:var(--skin)"/><g clip-path="url(#${id})">`;
  if(lv>0){const top=lerp(97,-51,lv);g+=`<rect x="-40" y="${f1(top)}" width="80" height="${f1(97-top+2)}" style="fill:${col};opacity:.72"/><line x1="-40" x2="40" y1="${f1(top)}" y2="${f1(top)}" style="stroke:${col};stroke-width:${f1(1.6/k)}"/>`}
  const zr={legs:[[-20,30,40,70]],arms:[[-34,-20,15,50],[19,-20,15,50]],trunk:[[-18,-25,36,58]],face:[[-12,-50,24,22]],neck:[[-8,-30,16,8]]};
  Object.keys(zr).forEach(z=>{if(Z[z]>0)zr[z].forEach(([a,b,w,h])=>{g+=`<rect x="${a}" y="${b}" width="${w}" height="${h}" style="fill:${col};opacity:${f1(clamp(Z[z])*.72)}"/>`})});
  g+=`</g><path d="${BODY_PATH}" style="fill:none;stroke:var(--ink);stroke-width:${f1(1.3/k)};stroke-linejoin:round"/>`;
  /* eyes and mouth */
  const ez=clamp(Z.eyes||0);
  [-4,4].forEach(ex=>{g+=`<ellipse cx="${ex}" cy="-41" rx="1.9" ry="${f1(1.3-ez*.8)}" style="fill:var(--ink)"/>`;if(ez>0)g+=`<path d="M${ex-3} -43.5Q${ex} ${f1(-44.5+ez*2.2)} ${ex+3} -43.5" style="fill:none;stroke:${col};stroke-width:${f1(1.4/k)};opacity:${f1(ez)}"/>`});
  g+=`<path d="M-3 -34.5Q0 -33.2 3 -34.5" style="fill:none;stroke:var(--ink);stroke-width:${f1(.9/k)}"/>`;
  if(o.vent)g+=`<path d="M0 -34V-31Q0 -27 6 -27H34" style="fill:none;stroke:var(--device);stroke-width:${f1(2.4/k)};stroke-linecap:round"/>`;
  const tg=clamp(o.tingle||0);if(tg>0){[[-30,30],[30,30],[-9,99],[9,99]].forEach(([a,b])=>{g+=`<path d="M${a-4} ${b+3}l2 -3l2 3l2 -3l2 3" style="fill:none;stroke:var(--accent);stroke-width:${f1(1.3/k)};opacity:${f1(tg)}"/>`})}
  const pn=clamp(o.pain||0);if(pn>0)g+=`<path d="M-6 14l3 -4l3 4l3 -4l3 4" style="fill:none;stroke:var(--damage);stroke-width:${f1(1.6/k)};opacity:${f1(pn)}"/>`;
  g+='</g>';
  if(o.labels){g+=kitLabel(x-38*k,y+(50+60)*k,'legs',{a:'e'})+kitLabel(x+38*k,y+(50+10)*k,'arms')+kitLabel(x+16*k,y+(50-42)*k,'face')}
  return {svg:g,at:{head:T(0,-40),eyes:T(0,-41),mouth:T(0,-34),chest:T(0,-12),hand:T(30,26),foot:T(-9,94),back:T(0,14)},h:146*k}}
function lungs(x,y,s=1,o={}){const k=s,f=clamp(o.fill==null?.5:o.fill),wk=clamp(o.weak||0),sc=.86+.14*f,dy=(1-f)*8;
  const P=(a,b)=>`${f1(x+a*k)} ${f1(y+b*k)}`;
  const lobe=(cx,dir)=>{const w=44*sc,h=78*sc,top=22,cy=top+h/2;return `M${P(cx,top)}C${P(cx+dir*w*.9,top+4)} ${P(cx+dir*w*1.05,cy+20)} ${P(cx+dir*w*.85,top+h-dy)}C${P(cx+dir*w*.5,top+h+4-dy)} ${P(cx+dir*6,top+h-4-dy)} ${P(cx,top+h*.7)}Z`};
  let g=`<path d="${lobe(62,-1)}" style="fill:var(--lung);stroke:var(--ink);stroke-width:1.2;opacity:${f1(.65+.35*f)}"/><path d="${lobe(78,1)}" style="fill:var(--lung);stroke:var(--ink);stroke-width:1.2;opacity:${f1(.65+.35*f)}"/>`;
  g+=`<path d="M${P(70,0)}L${P(70,30)}M${P(70,30)}L${P(60,42)}M${P(70,30)}L${P(80,42)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*k)};stroke-linecap:round;opacity:.35"/>`;
  const dyd=106-dy*1.2;
  g+=`<path d="M${P(8,dyd+8)}Q${P(70,dyd-22+dy*1.6)} ${P(132,dyd+8)}" style="fill:none;stroke:${wk>0?'var(--weak)':'var(--muscle)'};stroke-width:${f1(6*k)};stroke-linecap:round;opacity:${f1(.6+.4*Math.max(wk,.5))}"/>`;
  if(o.tube)g+=`<path d="M${P(70,-14)}L${P(70,26)}" style="stroke:var(--device);stroke-width:${f1(3*k)};stroke-linecap:round"/>`;
  return {svg:g,at:{trachea:[x+70*k,y+12*k],left:[x+96*k,y+60*k],right:[x+44*k,y+60*k],diaphragm:[x+70*k,y+(dyd-6)*k]},w:140*k,h:120*k}}
