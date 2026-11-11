/* ---- drawing kit for the Obesity Companion ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string, or an object
   with .svg (and usually .at, named anchor points in the caller's SVG coordinates), to concatenate into an <svg>'s
   innerHTML. Everything is schematic: no glyph encodes a measured value unless the caller passes one in, and the
   kit holds no clinical numbers (no BMI cut-offs, doses, schedules, trial results or risks). Pass them in from the
   research, with the citation in the surrounding text. Clip paths use fresh ids on every call, so any number of
   glyphs can share a page. Text labels stay a fixed size whatever the scale.

   PEOPLE. person() draws every body size with the same neutral --figure colour, the same upright posture and no
   face: size is never a cue for health, mood or effort. Never draw "before and after" pairs. Body size changes,
   when a module truly needs one, are slow and neutral, and never the punchline of an animation.

   ORIENTATION. Organs are drawn in front view, as if facing the person: the person's left is on the viewer's
   right (the stomach's fundus is on the right, the pylorus and duodenum on the left, the liver's big right lobe on
   the left). The brain is seen from the side, facing left.

   ---- fat tissue ----
   adipocyte(x,y,r,o)   one fat cell centred at (x,y): a thin rim of cytoplasm, one big lipid droplet and the nucleus
                        flattened against the membrane. r = the radius at o.size .5.
     o.size     0..1 (default .5): the cell's size, from small (0) to enlarged (1): hypertrophy, or shrinkage.
     o.inflamed 0..1 a stressed cell: --fat-hot rim and tint. o.kind 'white' (default) | 'beige' | 'brown': beige
                has several droplets, brown many small ones in --brownfat cytoplasm with a central nucleus.
     o.ang      angle in degrees of the nucleus on the rim (default 40, lower right). o.seed: a slightly irregular
                outline. o.op opacity.  Returns {svg, at:{c, R, nucleus}}.
   adiposeTissue(x,y,w,h,o) a packed sheet of fat cells clipped to the box (x,y,w,h).
     o.size     0..1 cell size (hypertrophy): fewer, bigger cells as it grows. o.cell base cell diameter (28).
     o.inflamed 0..1 the share of stressed cells. o.macro 0..1 crown-like structures: macrophages gather round the
                stressed cells. o.vessel 0..1 a capillary winding through (fades as o.hypoxia 0..1 rises: the cells
                far from it turn grey-blue). o.kind as for adipocyte. o.seed. o.frame true draws a rounded border.
     Returns {svg, at:{cells:[[x,y,r],...], c}}.
   macrophage(x,y,r,o)  an amoeboid macrophage centred at (x,y): pseudopods, kidney-shaped nucleus, granules.
                        o.kind 'M1' (inflammatory: spiky, --risk outline) | 'M2' (rounded, the default). o.seed, o.op.

   ---- gut ----
   stomach(x,y,s,o)     the stomach with its oesophagus and the start of the duodenum, front view. (x,y) = top left;
                        s = scale, 1 = 130 wide, 140 tall.
     o.variant  'normal' (default) | 'sleeve' (sleeve gastrectomy: a narrow tube along the lesser curvature, the
                removed part as a dashed ghost and a staple line) | 'bypass' (Roux-en-Y: a small pouch, the bypassed
                remnant left in place and dimmed, the Roux limb leaving the pouch) | 'band' (an adjustable band round
                the top) | 'switch' (a sleeve whose duodenum is divided just past the pylorus, as in a duodenal switch).
     o.morph    0..1 how far the change from the normal stomach has gone (default 1), so it can be animated.
     o.fill     0..1 food in the stomach (or pouch). o.ghost false hides the removed part. o.labels true names parts.
     Returns {svg, at:{eso, cardia, fundus, body, antrum, pylorus, duo, pouch, out}, w, h}.
   gutTract(x,y,s,o)    oesophagus, stomach, duodenum, pancreas, small intestine and colon framing it. (x,y) = top
                        left; s = scale, 1 = 200 wide, 270 tall.
     o.variant  as for stomach; for 'bypass' and 'switch' the bowel is rerouted (Roux limb; ileal limb).
     o.morph    0..1 as for stomach. o.food 0..1: a bolus travelling the route food takes for this variant.
     o.glow     {stomach, duo, ileum, pancreas: 0..1}: a soft glow where those hormones come from (ghrelin from the
                stomach, GIP and CCK from the duodenum, GLP-1 and PYY from L cells in the ileum, insulin from the
                pancreas). o.labels true names the parts. o.dim 0..1 fades it (context drawing).
     Returns {svg, at:{eso, stomach, pylorus, duo, jejunum, ileum, colon, pancreas, pouch, join}, route:f->[x,y], w, h}.

   ---- brain ----
   brainHypothalamus(x,y,s,o) a brain seen from the side with the hypothalamus marked, and beside it a round inset
                        of the hypothalamus: the third ventricle, the arcuate nucleus at its base with POMC (fullness:
                        --pomc, circles) and AgRP/NPY (hunger: --agrp, triangles) neurons, and the paraventricular
                        nucleus (PVN) above, whose neurons carry the MC4R. (x,y) = top left; s = scale, 1 = 260 x 180.
     o.pomc 0..1 POMC activity (glow, and arrows to the PVN). o.agrp 0..1 AgRP activity (glow, and blunt-ended
     inhibitory lines to the PVN). o.mc4r 0..1 the PVN's MC4R signal (the fullness output). o.inset false draws the
     brain alone. o.labels true names the parts.
     Returns {svg, at:{hypo, brainstem, arc, pomc, agrp, pvn, bloodIn, inset:[cx,cy,r]}}.

   ---- signals ----
   hormoneDot(x,y,kind,o) one hormone molecule. Each kind has its own colour AND shape, so colour is never the only
                        cue: 'ghrelin' circle, 'leptin' diamond, 'glp1' hexagon, 'pyy' triangle, 'insulin' rounded
                        square, 'gip' pentagon, 'cck' four-point star, 'drug' (a GLP-1 medicine) hexagon in a ring.
                        o.r radius (5), o.op, o.label true writes its short name beside it.
   HORMONE_INFO         {kind:{name, col}} for legends.

   ---- organs and things ----
   liver(x,y,s,o)       a liver, front view. (x,y) = top left; s = scale, 1 = 140 x 90. o.fat 0..1 fat droplets in
                        the liver (steatosis), o.inflamed 0..1, o.scar 0..1 fibrous strands. Returns {svg, at:{c,
                        right, left, hilum}}.
   pen(x,y,s,o)         a prefilled injector pen centred at (x,y), lying flat; s = scale, 1 = 120 long. o.ang
                        rotation, o.cap true the cap is on, o.needle 0..1 needle out, o.press 0..1 the button pushed
                        in, o.dial 0..1 turns the dose dial (no numbers are drawn). Returns {svg, at:{tip, back}}.
   person(x,y,s,o)      a neutral, respectful standing figure, (x,y) the top of the head, s its height. o.size 0..1
                        body size (0 slimmer, 1 larger), o.kid true child proportions, o.col and o.line override
                        --figure and --figure-line, o.op. No face. Returns {svg, at:{head, chest, belly, liver, hip,
                        knee, foot}, w}.
   seesaw(x,y,w,o)      an energy-balance see-saw: the fulcrum's foot at (x,y), a beam w wide. o.tilt -1..1
                        (negative: the left side is heavier), o.left / o.right labels, o.lw / o.rw 0..1 loads drawn as
                        stacked blocks (left in --fat, right in --lean unless o.lcol / o.rcol). Returns {svg, at:{left,
                        right}}.

   ---- charts ----
   curveAxes(x,y,w,h,o) a chart frame: o {x0,x1,y0,y1, xt:[ticks], yt:[ticks], xfmt, yfmt, xlabel, ylabel, grid}.
                        (x,y) = top left of the plot area. Returns {svg, X, Y}.
   plotLine(P,X,Y,o)    a line through data points P [[x,y],...] in data units. o {col, lw, dash, upto (cut at this x,
                        interpolating), dot (a dot at the end), fill (area down to o.base, default the y0 of the data),
                        smooth (monotone curve)}. Returns {svg, end:[x,y]}.
   iconArray(x,y,o)     a block of people or dots: o {n (100), cols (10), k (highlighted count) or groups
                        [{k, col}, ...], size (12), gap (3), shape 'person' (default) | 'dot', col, base}.
                        Returns {svg, h, w, at:i->[x,y]}.

   ---- helpers ----
   kitLabel(x,y,text,o) a small label with a halo so it reads on any drawing: o {a:'m'|'e', halo (var(--panel))}.
   smoothPath(P,closed) Catmull-Rom path through points. crPts(P,closed,k) the points of that curve. inPoly(p,P).
   ptsD(P) polyline path. polyAt(P) arc-length sampler: f(0..1) -> [x,y] along the polyline P.
   monoFn(P)            monotone cubic through data points [[x,y],...] (sorted by x). Returns f(x).
   blob(cx,cy,r,seed,o) an irregular closed path string: o {n (18), rough (.16), sq}. kid(prefix) a fresh id. */

/* ---- helpers ---- */
let _kid=0;
const kid=p=>'ob'+p+'_'+(++_kid);
function kitLabel(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${o.a==='m'?' t-mid':o.a==='e'?' t-end':''}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:${o.halo||'var(--panel)'};stroke-width:3px;stroke-linejoin:round">${t}</text>`}
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[closed?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function crPts(P,closed=true,k=6){const n=P.length,out=[],m=closed?n:n-1;
  for(let i=0;i<m;i++){const a=P[closed?(i-1+n)%n:Math.max(0,i-1)],b=P[i],c=P[(i+1)%n],d=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    for(let j=0;j<k;j++){const t=j/k,u=t*t,v=u*t,f=q=>.5*(2*b[q]+(c[q]-a[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*u+(3*b[q]-a[q]-3*c[q]+d[q])*v);out.push([f(0),f(1)])}}
  if(!closed)out.push(P[n-1]);return out}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
function polyAt(P){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const T=L[L.length-1]||1;
  return u=>{const d=clamp(u)*T;let i=1;while(i<L.length-1&&L[i]<d)i++;const s=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],s),lerp(P[i-1][1],P[i][1],s)]}}
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function blob(cx,cy,r,seed=1,o={}){const n=o.n||18,ro=o.rough==null?.16:o.rough,rr=rng(seed),P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*ro*2;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*(o.sq||1)])}
  return smoothPath(P)}
const _tr=(x,y,k)=>p=>[x+p[0]*k,y+p[1]*k];

/* ---- fat tissue ---- */
function adipocyte(x,y,r=20,o={}){const sz=o.size==null?.5:clamp(o.size),R=r*lerp(.62,1.18,sz),inf=clamp(o.inflamed||0),kind=o.kind||'white',
  A=(o.ang==null?40:o.ang)*Math.PI/180,op=o.op==null?1:o.op;
  const out=o.seed?blob(x,y,R,o.seed,{rough:.06,n:14}):null;
  let s=`<g style="opacity:${op}">`;
  s+=out?`<path d="${out}" style="fill:${kind==='brown'?'var(--brownfat)':'var(--cyto)'};stroke:var(--fat-line);stroke-width:1.3"/>`
         :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R)}" style="fill:${kind==='brown'?'var(--brownfat)':'var(--cyto)'};stroke:var(--fat-line);stroke-width:1.3"/>`;
  let nuc;
  if(kind==='white'){const dr=R*.86,ox=-Math.cos(A)*R*.07,oy=-Math.sin(A)*R*.07;
    s+=`<circle cx="${f1(x+ox)}" cy="${f1(y+oy)}" r="${f1(dr)}" style="fill:var(--fat)"/>`;
    s+=`<circle cx="${f1(x+ox-dr*.32)}" cy="${f1(y+oy-dr*.34)}" r="${f1(dr*.22)}" style="fill:var(--panel);opacity:.35"/>`;
    nuc=[x+Math.cos(A)*R*.9,y+Math.sin(A)*R*.9];
    s+=`<ellipse cx="${f1(nuc[0])}" cy="${f1(nuc[1])}" rx="${f1(Math.max(2,R*.26))}" ry="${f1(Math.max(1.2,R*.085))}" transform="rotate(${f1(A*180/Math.PI+90)} ${f1(nuc[0])} ${f1(nuc[1])})" style="fill:var(--nucleus)"/>`}
  else{const rr=rng(o.seed||11),n=kind==='brown'?11:5,big=kind==='beige'?R*.42:0;
    if(big)s+=`<circle cx="${f1(x-R*.18)}" cy="${f1(y-R*.12)}" r="${f1(big)}" style="fill:var(--fat)"/>`;
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rr(),d=R*(big?.55:.3+rr()*.38),dr=R*(kind==='brown'?.14+rr()*.06:.15+rr()*.07);
      s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(dr)}" style="fill:var(--fat)"/>`}
    nuc=kind==='brown'?[x,y]:[x+R*.42,y+R*.34];
    s+=`<circle cx="${f1(nuc[0])}" cy="${f1(nuc[1])}" r="${f1(R*.17)}" style="fill:var(--nucleus)"/>`;
    if(kind==='brown')for(let i=0;i<8;i++){const a=rr()*6.28,d=R*(.35+rr()*.45);s+=`<ellipse cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" rx="${f1(R*.07)}" ry="${f1(R*.035)}" style="fill:var(--nucleus);opacity:.55"/>`}}
  if(inf>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R*.97)}" style="fill:var(--fat-hot);opacity:${f1(inf*.3)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R)}" style="fill:none;stroke:var(--fat-hot);stroke-width:${f1(1.3+inf*1.6)}"/>`;
  return {svg:s+'</g>',at:{c:[x,y],R,nucleus:nuc}}}

function macrophage(x,y,r=9,o={}){const rr=rng(o.seed||7),m1=o.kind==='M1',n=m1?12:10,P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=m1?(i%2?1.35+rr()*.25:.82):(1+(rr()-.5)*.3);P.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k])}
  let s=`<g style="opacity:${o.op==null?1:o.op}"><path d="${smoothPath(P)}" style="fill:var(--macro);fill-opacity:.55;stroke:${m1?'var(--risk)':'var(--macro)'};stroke-width:1.3"/>`;
  s+=`<path d="M${f1(x-r*.42)} ${f1(y-r*.1)}C${f1(x-r*.4)} ${f1(y-r*.6)} ${f1(x+r*.4)} ${f1(y-r*.6)} ${f1(x+r*.42)} ${f1(y-r*.05)}C${f1(x+r*.2)} ${f1(y+r*.05)} ${f1(x+r*.05)} ${f1(y+r*.3)} ${f1(x-r*.05)} ${f1(y+r*.12)}C${f1(x-r*.2)} ${f1(y+r*.3)} ${f1(x-r*.45)} ${f1(y+r*.2)} ${f1(x-r*.42)} ${f1(y-r*.1)}Z" style="fill:var(--nucleus)"/>`;
  for(let i=0;i<4;i++){const a=rr()*6.28,d=r*(.45+rr()*.25);s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(r*.08)}" style="fill:var(--ink);opacity:.45"/>`}
  return s+'</g>'}

function adiposeTissue(x,y,w,h,o={}){const sz=o.size==null?.5:clamp(o.size),d=(o.cell||28)*lerp(.72,1.3,sz),inf=clamp(o.inflamed||0),mc=clamp(o.macro||0),
  hyp=clamp(o.hypoxia||0),ves=o.vessel==null?0:clamp(o.vessel),id=kid('at'),rr=rng(o.seed||5),cells=[];
  const dy=d*.866;for(let j=-1;j*dy<h+d;j++)for(let i=-1;i*d<w+d;i++){const cx=x+i*d+(j%2?d/2:0)+(rr()-.5)*d*.12,cy=y+j*dy+(rr()-.5)*d*.12;cells.push([cx,cy,d*.56,rr(),rr()])}
  let s=`<defs><clipPath id="${id}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10"/></clipPath></defs><g clip-path="url(#${id})">`;
  s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--cyto)"/>`;
  const vy=u=>y+h*(.55+.25*Math.sin(u*Math.PI*2.2+1)),vP=[];for(let i=0;i<=24;i++){const u=i/24;vP.push([x-6+(w+12)*u,vy(u)])}
  cells.forEach((c,i)=>{const hot=c[3]<inf,far=Math.abs(c[1]-vy((c[0]-x)/w))/h;
    s+=adipocyte(c[0],c[1],c[2]/1.18*1.0,{size:1,kind:o.kind,inflamed:hot?.8:0,seed:3+i,ang:c[4]*360}).svg;
    if(hyp>0&&far>.25)s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(c[2]*.9)}" style="fill:var(--tx);opacity:${f1(hyp*.18*clamp((far-.25)*3))}"/>`});
  if(ves>0)s+=`<path d="${smoothPath(vP,false)}" style="fill:none;stroke:var(--vessel);stroke-width:4;stroke-linecap:round;opacity:${f1(ves*(1-hyp*.5))}"/>`;
  if(mc>0)cells.forEach((c,i)=>{if(!(c[3]<inf))return;const n=Math.round(2+mc*5);for(let k=0;k<n;k++){const a=k/n*Math.PI*2+c[4]*6;
    s+=macrophage(c[0]+Math.cos(a)*c[2]*.92,c[1]+Math.sin(a)*c[2]*.92,Math.max(3.5,d*.13),{seed:i*7+k,kind:'M1',op:clamp(mc*1.4)})}});
  s+='</g>';
  if(o.frame)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:none;stroke:var(--line);stroke-width:1.2"/>`;
  return {svg:s,at:{cells:cells.filter(c=>c[0]>x&&c[0]<x+w&&c[1]>y&&c[1]<y+h).map(c=>[c[0],c[1],c[2]]),c:[x+w/2,y+h/2]}}}

/* ---- gut ---- */
/* the stomach's outline in local units (130 x 140), front view: fundus on the viewer's right, pylorus on the left */
const ST_LESSER=[[68,32],[64,56],[58,72],[46,82],[32,82],[20,79]];          /* cardia down the lesser curvature to the pylorus */
const ST_GREATER=[[18,93],[32,103],[54,109],[78,103],[96,86],[106,62],[108,40],[100,22],[88,14],[76,16]]; /* pylorus round the greater curvature to the fundus */
const ST_SLEEVE=[[19,92],[32,95],[46,93],[60,86],[70,72],[75,54],[77,36],[76,24]];  /* a narrow tube beside the lesser curvature */
function stomach(x,y,s=1,o={}){const v=o.variant||'normal',m=o.morph==null?1:clamp(o.morph),T=_tr(x,y,s),fill=clamp(o.fill||0),id=kid('st'),ghost=o.ghost!==false;
  const normal=[...ST_LESSER,...ST_GREATER];
  const tube=(P,wd,col,line,op=1)=>`<path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:${line};stroke-width:${f1((wd+2.4)*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${op}"/><path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:${col};stroke-width:${f1(wd*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${op}"/>`;
  const shape=(P,extra='')=>`<path d="${smoothPath(P.map(T))}" style="fill:var(--stomach);stroke:var(--gut-line);stroke-width:1.6${extra}"/>`;
  const foodIn=P=>{if(fill<=0)return '';const ys=P.map(p=>p[1]),y0=Math.max(...ys),y1=Math.min(...ys),ly=lerp(y0,y1+6,fill);
    return `<defs><clipPath id="${id}f"><path d="${smoothPath(P.map(T))}"/></clipPath></defs><rect x="${f1(x)}" y="${f1(y+ly*s)}" width="${f1(130*s)}" height="${f1((y0-ly+4)*s)}" clip-path="url(#${id}f)" style="fill:var(--gut-line);opacity:.35"/>`};
  let g='',at={eso:T([73,-8]),cardia:T([70,30]),fundus:T([92,26]),body:T([84,64]),antrum:T([40,92]),pylorus:T([16,86]),duo:T([8,128]),pouch:null,out:T([8,128])};
  const eso=[[73,-8],[72,10],[70,30]],duo=[[16,86],[6,96],[4,112],[8,128]];
  if(v==='normal'||v==='band'){
    g+=tube(eso,9,'var(--stomach)','var(--gut-line)')+tube(duo,10,'var(--gut)','var(--gut-line)')+shape(normal)+foodIn(normal);
    g+=`<path d="${smoothPath([[66,44],[60,66],[46,78]].map(T),false)}" style="fill:none;stroke:var(--gut-line);stroke-width:1;opacity:.45"/>`;
    if(v==='band'){const b=T([71,38]);g+=`<g style="opacity:${f1(m)}"><ellipse cx="${f1(b[0])}" cy="${f1(b[1])}" rx="${f1(15*s)}" ry="${f1(5*s)}" style="fill:none;stroke:var(--device);stroke-width:${f1(5*s)}"/><path d="${smoothPath([[84,40],[100,48],[118,62]].map(T),false)}" style="fill:none;stroke:var(--device);stroke-width:${f1(1.6*s)}"/><circle cx="${f1(T([120,64])[0])}" cy="${f1(T([120,64])[1])}" r="${f1(5*s)}" style="fill:var(--device)"/></g>`;at.pouch=T([72,30])}}
  else if(v==='sleeve'||v==='switch'){
    const G2=ST_GREATER.map((p,i)=>{const q=ST_SLEEVE[Math.round(i/(ST_GREATER.length-1)*(ST_SLEEVE.length-1))];return [lerp(p[0],q[0],m),lerp(p[1],q[1],m)]});
    const P=[...ST_LESSER,...G2];
    if(ghost&&m>0)g+=`<path d="${smoothPath(normal.map(T))}" style="fill:none;stroke:var(--gut-line);stroke-width:1.2;stroke-dasharray:4 4;opacity:${f1(m*.7)}"/>`;
    g+=tube(eso,9,'var(--stomach)','var(--gut-line)');
    if(v==='switch'){g+=tube([[16,86],[8,92],[4,100]],10,'var(--gut)','var(--gut-line)');at.out=T([4,104])}
    else g+=tube(duo,10,'var(--gut)','var(--gut-line)');
    g+=shape(P)+foodIn(P);
    if(m>.5)g+=`<path d="${smoothPath(G2.slice(1,-1).map(p=>[p[0]+1.5,p[1]]).map(T),false)}" style="fill:none;stroke:var(--device);stroke-width:${f1(1.4*s)};stroke-dasharray:${f1(2*s)} ${f1(2*s)};opacity:${f1(ramp(m,.5,1))}"/>`;
    if(v==='switch')g+=`<path d="${ptsD([[0,104],[10,100]].map(T))}" style="stroke:var(--device);stroke-width:${f1(2*s)}"/>`;
    at.body=T([66,62])}
  else if(v==='bypass'){
    const pouch=[[66,24],[80,22],[84,34],[80,48],[70,52],[64,42]];
    g+=`<g style="opacity:${f1(lerp(1,.45,m))}">`+tube(duo,10,'var(--gut)','var(--gut-line)')+shape(normal.map(p=>p[1]<50&&p[0]>60&&p[0]<90?[p[0],p[1]+m*20]:p))+'</g>';
    g+=tube(eso,9,'var(--stomach)','var(--gut-line)');
    const roux=[[74,50],[76,72],[90,98],[104,122],[108,140]];
    g+=`<g style="opacity:${f1(m)}">`+tube(roux,10,'var(--gut)','var(--gut-line)')+shape(pouch)+foodIn(pouch)+'</g>';
    at.pouch=T([74,36]);at.out=T([108,140])}
  if(o.labels){const L=(p,t,a)=>kitLabel(p[0],p[1],t,{a});
    g+=L(T([92,-2]),'oesophagus')+(v==='bypass'?L(T([96,40]),'pouch','')+L(T([20,60]),'bypassed stomach','m')+L(T([112,150]),'Roux limb','m'):L(T([98,8]),'fundus','')+L(T([66,124]),v==='sleeve'||v==='switch'?'sleeve':'body','m'))+L(T([-4,86]),'pylorus','e')+(v==='switch'?'':L(T([-6,128]),'duodenum','e'))}
  return {svg:g,at,w:130*s,h:140*s}}

function gutTract(x,y,s=1,o={}){const v=o.variant||'normal',m=o.morph==null?1:clamp(o.morph),T=_tr(x,y,s),gl=o.glow||{},dim=o.dim==null?1:1-clamp(o.dim)*.7;
  const tube=(P,wd,col,line,op=1)=>`<path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:${line};stroke-width:${f1((wd+2.4)*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${op}"/><path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:${col};stroke-width:${f1(wd*s)};stroke-linecap:round;stroke-linejoin:round;opacity:${op}"/>`;
  const colon=[[44,246],[34,226],[30,180],[34,150],[60,144],[110,148],[160,142],[180,150],[182,190],[178,232],[160,250],[124,252],[106,266]];
  const duo=[[66,104],[54,114],[50,132],[58,148],[80,152],[100,144]];
  const small=[[100,144],[128,158],[150,166],[156,180],[134,186],[96,180],[70,184],[66,198],[92,206],[130,202],[154,210],[150,226],[120,230],[90,224],[68,226],[56,236],[46,242]];
  const SP=crPts(small,false,8),sAt=polyAt(SP);
  let g=`<g style="opacity:${f1(dim)}">`;
  /* colon behind, with haustra */
  g+=tube(colon,15,'var(--gut)','var(--gut-line)',.85);
  crPts(colon,false,4).forEach((p,i,A)=>{if(i%3||!A[i+1])return;const q=A[i+1],a=Math.atan2(q[1]-p[1],q[0]-p[0])+Math.PI/2,P=T(p);g+=`<line x1="${f1(P[0]+Math.cos(a)*7*s)}" y1="${f1(P[1]+Math.sin(a)*7*s)}" x2="${f1(P[0]-Math.cos(a)*7*s)}" y2="${f1(P[1]-Math.sin(a)*7*s)}" style="stroke:var(--gut-line);stroke-width:1;opacity:.5"/>`});
  /* pancreas, partly behind the stomach */
  const pan=[[62,118],[80,112],[110,110],[140,104],[158,100],[160,108],[140,116],[108,122],[80,128],[64,128]];
  g+=`<path d="${smoothPath(pan.map(T))}" style="fill:var(--cyto);stroke:var(--gut-line);stroke-width:1.2"/>`;
  /* small intestine */
  const join=sAt(.32);
  g+=tube(small,9,'var(--gut)','var(--gut-line)');
  g+=tube(duo,10,'var(--gut)','var(--gut-line)');
  const st=stomach(x+50*s,y+8*s,s,{variant:v,morph:m,fill:o.fill,ghost:true});
  g+=st.svg;
  if(v==='bypass'){const a=st.at.out,b=T(join);g+=`<g style="opacity:${f1(m)}">`+tube([[(a[0]-x)/s,(a[1]-y)/s],[150,160],[(b[0]-x)/s,(b[1]-y)/s]],9,'var(--gut)','var(--gut-line)')+'</g>';
    g+=`<circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="${f1(4*s)}" style="fill:var(--device);opacity:${f1(m)}"/>`}
  const ile=sAt(.84);
  if(v==='switch'){const a=st.at.out,b=T(ile);g+=`<g style="opacity:${f1(m)}">`+tube([[(a[0]-x)/s,(a[1]-y)/s],[30,120],[24,170],[(b[0]-x)/s-10,(b[1]-y)/s]],9,'var(--gut)','var(--gut-line)')+'</g>'}
  /* glows */
  const glow=(p,v2,col)=>v2>0?`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(14*s)}" style="fill:${col};opacity:${f1(v2*.35)}"/><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(6*s)}" style="fill:${col};opacity:${f1(v2*.8)}"/>`:'';
  g+=glow(st.at.fundus,clamp(gl.stomach||0),'var(--ghrelin)')+glow(T([54,124]),clamp(gl.duo||0),'var(--gip)')+glow(T(ile),clamp(gl.ileum||0),'var(--glp1)')+glow(T([128,110]),clamp(gl.pancreas||0),'var(--insulin)');
  /* the route food takes */
  const so=st.at;let R;
  const toL=p=>[(p[0]-x)/s,(p[1]-y)/s];
  if(v==='bypass')R=[toL(so.eso),toL(so.pouch),toL(so.out),[150,160],join,...SP.slice(Math.round(SP.length*.32))];
  else if(v==='switch')R=[toL(so.eso),toL(so.body),toL(so.pylorus),[30,120],[24,170],[ile[0]-10,ile[1]],...SP.slice(Math.round(SP.length*.84))];
  else R=[toL(so.eso),toL(so.body),toL(so.antrum),toL(so.pylorus),...duo,...SP];
  R=R.concat(colon);
  const RP=crPts(R,false,4).map(T),route=polyAt(RP);
  if(o.food!=null&&o.food>0&&o.food<1){const p=route(o.food);g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(5.5*s)}" style="fill:var(--gut-line);stroke:var(--panel);stroke-width:1.5"/>`}
  if(o.labels){const L=(p,t,a)=>kitLabel(p[0],p[1],t,{a});
    g+=L(T([150,14]),'stomach','')+L(T([46,108]),'duodenum','e')+L(T([150,128]),'pancreas','')+L(T([112,196]),'small intestine','m')+L(T([196,236]),'colon','e')}
  g+='</g>';
  return {svg:g,at:{eso:so.eso,stomach:so.fundus,pylorus:so.pylorus,duo:T([54,124]),jejunum:T(sAt(.15)),ileum:T(ile),colon:T([30,190]),pancreas:T([128,110]),pouch:so.pouch,join:T(join)},route,w:200*s,h:270*s}}

/* ---- brain ---- */
const BR_OUT=[[8,62],[10,38],[24,18],[48,6],[78,4],[104,12],[122,30],[128,52],[124,72],[110,84],[94,86],[86,96],[78,108],[72,104],[70,92],[54,92],[34,90],[16,80]];
function brainHypothalamus(x,y,s=1,o={}){const T=_tr(x,y,s),pomc=clamp(o.pomc||0),agrp=clamp(o.agrp||0),mc4r=clamp(o.mc4r||0),inset=o.inset!==false,id=kid('hy');
  let g=`<path d="${smoothPath(BR_OUT.map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.6"/>`;
  [[[22,40],[40,30],[58,34],[74,24],[96,28]],[[18,60],[40,54],[62,60],[84,50],[108,54]],[[40,76],[60,72],[80,76]]].forEach(P=>{g+=`<path d="${smoothPath(P.map(T),false)}" style="fill:none;stroke:var(--brain-line);stroke-width:1.1;opacity:.55"/>`});
  /* cerebellum and brainstem */
  g+=`<path d="${smoothPath([[96,78],[114,74],[124,82],[116,94],[100,94]].map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.2"/>`;
  g+=`<path d="${smoothPath([[84,90],[92,100],[94,118],[88,126],[80,118],[78,102]].map(T))}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.2"/>`;
  const hy=T([66,84]),bs=T([88,112]);
  g+=`<circle cx="${f1(hy[0])}" cy="${f1(hy[1])}" r="${f1(6*s)}" style="fill:var(--pomc);opacity:${f1(.35+.4*Math.max(pomc,agrp))}"/><circle cx="${f1(hy[0])}" cy="${f1(hy[1])}" r="${f1(6*s)}" style="fill:none;stroke:var(--ink);stroke-width:1.2"/>`;
  g+=`<path d="${ptsD([T([64,90]),T([66,100])])}" style="stroke:var(--brain-line);stroke-width:${f1(2.4*s)};stroke-linecap:round"/><circle cx="${f1(T([66,103])[0])}" cy="${f1(T([66,103])[1])}" r="${f1(3.4*s)}" style="fill:var(--brain);stroke:var(--brain-line)"/>`;
  let at={hypo:hy,brainstem:bs,arc:hy,pomc:hy,agrp:hy,pvn:hy,bloodIn:T([66,96]),inset:null};
  if(inset){const C=T([196,92]),r=64*s;
    g+=`<path d="${ptsD([[hy[0]+5*s,hy[1]-4*s],[C[0]-r*.86,C[1]-r*.5]])}${ptsD([[hy[0]+5*s,hy[1]+4*s],[C[0]-r*.86,C[1]+r*.5]])}" style="stroke:var(--line);stroke-width:1.2;fill:none"/>`;
    g+=`<defs><clipPath id="${id}"><circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(r)}"/></clipPath></defs><circle cx="${f1(C[0])}" cy="${f1(C[1])}" r="${f1(r)}" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.6"/>`;
    const P=(u,v)=>[C[0]+u*r,C[1]+v*r];
    g+=`<g clip-path="url(#${id})"><path d="${smoothPath([P(-.05,-1.1),P(.05,-1.1),P(.06,.2),P(.12,.6),P(0,.82),P(-.12,.6),P(-.06,.2)])}" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1"/>`;
    g+=`<path d="${smoothPath([P(-.5,1.2),P(-.2,.84),P(0,.9),P(.2,.84),P(.5,1.2)],false)}" style="fill:var(--vessel);fill-opacity:.12;stroke:var(--vessel);stroke-width:1.2;opacity:.7"/></g>`;
    const pv=[P(-.3,-.42),P(.3,-.42)],po=[P(-.3,.5),P(-.42,.38),P(-.2,.34)],ag=[P(.3,.5),P(.42,.38),P(.2,.34)];
    /* PVN */
    pv.forEach(p=>{g+=`<ellipse cx="${f1(p[0])}" cy="${f1(p[1])}" rx="${f1(r*.2)}" ry="${f1(r*.13)}" style="fill:var(--pomc);opacity:${f1(.12+.5*mc4r)}"/><ellipse cx="${f1(p[0])}" cy="${f1(p[1])}" rx="${f1(r*.2)}" ry="${f1(r*.13)}" style="fill:none;stroke:var(--ink);stroke-width:1;stroke-dasharray:3 2"/>`;
      for(let k=0;k<3;k++)g+=`<circle cx="${f1(p[0]+(k-1)*r*.1)}" cy="${f1(p[1]+(k%2?-1:1)*r*.03)}" r="${f1(r*.035)}" style="fill:var(--ink);opacity:.7"/>`});
    /* projections */
    po.forEach((p,i)=>{if(pomc<=0)return;const q=pv[0];g+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1(p[0]-r*.15)} ${f1((p[1]+q[1])/2)} ${f1(q[0]-r*.04)} ${f1(q[1]+r*.12)}" style="fill:none;stroke:var(--pomc);stroke-width:${f1(1+pomc*1.6)};opacity:${f1(.3+pomc*.7)}"/>`});
    ag.forEach((p,i)=>{if(agrp<=0)return;const q=pv[1],e=[q[0]+r*.04,q[1]+r*.12];g+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1(p[0]+r*.15)} ${f1((p[1]+q[1])/2)} ${f1(e[0])} ${f1(e[1])}" style="fill:none;stroke:var(--agrp);stroke-width:${f1(1+agrp*1.6)};opacity:${f1(.3+agrp*.7)}"/><path d="M${f1(e[0]-r*.06)} ${f1(e[1]+r*.01)}L${f1(e[0]+r*.06)} ${f1(e[1]-r*.01)}" style="stroke:var(--agrp);stroke-width:2.4;opacity:${f1(.3+agrp*.7)}"/>`});
    po.forEach(p=>{if(pomc>0)g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r*(.07+.06*pomc))}" style="fill:var(--pomc);opacity:${f1(pomc*.35)}"/>`;g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r*.055)}" style="fill:var(--pomc);stroke:var(--panel);stroke-width:1"/>`});
    ag.forEach(p=>{if(agrp>0)g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r*(.07+.06*agrp))}" style="fill:var(--agrp);opacity:${f1(agrp*.35)}"/>`;const k=r*.065;g+=`<path d="M${f1(p[0])} ${f1(p[1]-k)}L${f1(p[0]+k)} ${f1(p[1]+k*.8)}L${f1(p[0]-k)} ${f1(p[1]+k*.8)}Z" style="fill:var(--agrp);stroke:var(--panel);stroke-width:1"/>`});
    at={hypo:hy,brainstem:bs,arc:P(0,.45),pomc:P(-.3,.42),agrp:P(.3,.42),pvn:P(0,-.42),bloodIn:P(0,.96),inset:[C[0],C[1],r]};
    if(o.labels){g+=kitLabel(P(0,-.7)[0],P(0,-.7)[1],'PVN (MC4R)',{a:'m'})+kitLabel(P(-.62,.72)[0],P(-.62,.72)[1],'POMC',{a:'m'})+kitLabel(P(.62,.72)[0],P(.62,.72)[1],'AgRP',{a:'m'})+kitLabel(P(0,.22)[0],P(0,.22)[1],'arcuate',{a:'m'})}}
  if(o.labels){g+=kitLabel(T([66,72])[0],T([66,72])[1]-2,'hypothalamus',{a:'m'})+kitLabel(bs[0]+8*s,bs[1]+6,'brainstem',{})}
  return {svg:g,at}}

/* ---- signals ---- */
const HORMONE_INFO={ghrelin:{name:'ghrelin',col:'var(--ghrelin)'},leptin:{name:'leptin',col:'var(--leptin)'},glp1:{name:'GLP-1',col:'var(--glp1)'},
  pyy:{name:'PYY',col:'var(--pyy)'},insulin:{name:'insulin',col:'var(--insulin)'},gip:{name:'GIP',col:'var(--gip)'},cck:{name:'CCK',col:'var(--gip)'},drug:{name:'medicine',col:'var(--rx-drug)'}};
function hormoneDot(x,y,kind='glp1',o={}){const r=o.r||5,H=HORMONE_INFO[kind]||HORMONE_INFO.glp1,c=H.col,op=o.op==null?1:o.op,st=`fill:${c};stroke:var(--panel);stroke-width:1`;
  const poly=(n,rot=-Math.PI/2,rad=r)=>{let d='';for(let i=0;i<n;i++){const a=rot+i/n*Math.PI*2;d+=(i?'L':'M')+f1(x+Math.cos(a)*rad)+' '+f1(y+Math.sin(a)*rad)}return d+'Z'};
  let s;
  if(kind==='ghrelin')s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="${st}"/>`;
  else if(kind==='leptin')s=`<path d="${poly(4,-Math.PI/2,r*1.2)}" style="${st}"/>`;
  else if(kind==='pyy')s=`<path d="${poly(3,-Math.PI/2,r*1.25)}" style="${st}"/>`;
  else if(kind==='insulin')s=`<rect x="${f1(x-r*.9)}" y="${f1(y-r*.9)}" width="${f1(r*1.8)}" height="${f1(r*1.8)}" rx="${f1(r*.4)}" style="${st}"/>`;
  else if(kind==='gip')s=`<path d="${poly(5,-Math.PI/2,r*1.1)}" style="${st}"/>`;
  else if(kind==='cck'){let d='';for(let i=0;i<8;i++){const a=-Math.PI/2+i/8*Math.PI*2,rad=i%2?r*.5:r*1.25;d+=(i?'L':'M')+f1(x+Math.cos(a)*rad)+' '+f1(y+Math.sin(a)*rad)}s=`<path d="${d}Z" style="${st}"/>`}
  else if(kind==='drug')s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*1.55)}" style="fill:none;stroke:${c};stroke-width:1.4"/><path d="${poly(6,0,r)}" style="${st}"/>`;
  else s=`<path d="${poly(6,0,r*1.05)}" style="${st}"/>`;
  if(o.label)s+=`<text x="${f1(x+r*1.9)}" y="${f1(y+3.5)}" class="t-xs" style="fill:var(--ink)">${H.name}</text>`;
  return `<g style="opacity:${f1(op)}">${s}</g>`}

/* ---- organs and things ---- */
const LV_OUT=[[4,30],[20,10],[52,4],[90,6],[122,12],[138,22],[132,34],[110,46],[86,60],[60,78],[40,86],[22,80],[8,62]];
function liver(x,y,s=1,o={}){const T=_tr(x,y,s),fat=clamp(o.fat||0),inf=clamp(o.inflamed||0),sc=clamp(o.scar||0),id=kid('lv'),P=LV_OUT.map(T),rr=rng(o.seed||17);
  let g=`<defs><clipPath id="${id}"><path d="${smoothPath(P)}"/></clipPath></defs><path d="${smoothPath(P)}" style="fill:var(--liver);stroke:var(--ink);stroke-width:1.2;stroke-opacity:.5"/>`;
  g+=`<g clip-path="url(#${id})">`;
  g+=`<path d="${smoothPath([[86,8],[80,30],[74,54]].map(T),false)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
  const n=Math.round(fat*60);for(let i=0;i<70;i++){const p=[4+rr()*134,4+rr()*82],r=2+rr()*3.5;if(i>=n||!inPoly(p,LV_OUT))continue;const q=T(p);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r*s)}" style="fill:var(--liverfat);opacity:.92"/>`}
  if(inf>0)for(let i=0;i<14;i++){const p=[10+rr()*120,8+rr()*70];if(!inPoly(p,LV_OUT))continue;const q=T(p);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(2.4*s)}" style="fill:var(--risk);opacity:${f1(inf*.8)}"/>`}
  if(sc>0)for(let i=0;i<9;i++){const a=[10+rr()*110,10+rr()*60],b=[a[0]+20+rr()*20,a[1]+(rr()-.5)*30];g+=`<path d="${ptsD([T(a),T([(a[0]+b[0])/2,(a[1]+b[1])/2+(rr()-.5)*10]),T(b)])}" style="fill:none;stroke:var(--panel);stroke-width:${f1(1.6*s)};opacity:${f1(sc*.8)}"/>`}
  g+='</g>';
  return {svg:g,at:{c:T([60,40]),right:T([34,44]),left:T([112,24]),hilum:T([70,58])}}}

function pen(x,y,s=1,o={}){const L=120*s,h=16*s,ang=o.ang||0,nd=clamp(o.needle||0),pr=clamp(o.press||0),dial=clamp(o.dial||0),cap=!!o.cap;
  const x0=-L/2,x1=L/2;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})">`;
  /* needle end on the left */
  if(nd>0&&!cap)g+=`<line x1="${f1(x0+2*s)}" y1="0" x2="${f1(x0-14*s*nd)}" y2="0" style="stroke:var(--device);stroke-width:${f1(1.2*s)}"/>`;
  g+=`<rect x="${f1(x0)}" y="${f1(-h/2)}" width="${f1(L*.82)}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:var(--pen);stroke:var(--pen-dark);stroke-width:1.2"/>`;
  g+=`<rect x="${f1(x0+L*.14)}" y="${f1(-h*.28)}" width="${f1(L*.2)}" height="${f1(h*.56)}" rx="${f1(h*.2)}" style="fill:var(--panel);stroke:var(--pen-dark);stroke-width:.8"/>`;
  g+=`<rect x="${f1(x0+L*.17)}" y="${f1(-h*.16)}" width="${f1(L*.14)}" height="${f1(h*.32)}" rx="${f1(h*.1)}" style="fill:var(--rx-drug);opacity:.55"/>`;
  g+=`<rect x="${f1(x0+L*.4)}" y="${f1(-h/2)}" width="${f1(L*.16)}" height="${f1(h)}" style="fill:var(--rx-drug);opacity:.85"/>`;
  /* dial and button */
  const dx=x0+L*.82;g+=`<rect x="${f1(dx)}" y="${f1(-h*.56)}" width="${f1(L*.1)}" height="${f1(h*1.12)}" rx="${f1(3*s)}" style="fill:var(--pen-dark)"/>`;
  for(let i=0;i<4;i++){const u=(i/4+dial)%1;g+=`<line x1="${f1(dx+L*.1*u)}" x2="${f1(dx+L*.1*u)}" y1="${f1(-h*.5)}" y2="${f1(h*.5)}" style="stroke:var(--pen);stroke-width:1;opacity:${f1(.3+.7*Math.sin(u*Math.PI))}"/>`}
  g+=`<rect x="${f1(dx+L*.1+(1-pr)*L*.06-L*.02)}" y="${f1(-h*.32)}" width="${f1(L*.06)}" height="${f1(h*.64)}" rx="${f1(2*s)}" style="fill:var(--rx-drug)"/>`;
  if(cap)g+=`<rect x="${f1(x0-L*.12)}" y="${f1(-h*.6)}" width="${f1(L*.34)}" height="${f1(h*1.2)}" rx="${f1(h*.5)}" style="fill:var(--pen-dark);opacity:.92"/>`;
  g+='</g>';
  const a=ang*Math.PI/180,P=u=>[x+Math.cos(a)*u,y+Math.sin(a)*u];
  return {svg:g,at:{tip:P(x0-14*s*nd),back:P(x1)}}}

function person(x,y,s=100,o={}){const k=s/100,w=clamp(o.size==null?.3:o.size),kidF=!!o.kid,col=o.col||'var(--figure)',line=o.line||'var(--figure-line)';
  const hr=kidF?11:8.5,hy=kidF?11.5:9,by=kidF?(v=>22+(v-19)*.82):(v=>v),bx=kidF?.9:1;
  const B=(px,py)=>[px*bx,by(py)];
  const half=[B(3.6,18.5),B(11+3*w,23),B(9.5+5.5*w,31),B(8.6+9.4*w,45),B(10+9.6*w,54),B(9.6+8.4*w,64),B(6.4+3.6*w,77),B(5.4+3*w,86),B(4.2+1.4*w,95),B(6.6+1.4*w,99.4),B(1.6+.6*w,99.6),B(1.8+.7*w,95),B(2.3+1.5*w,78),B(1.4+1.3*w,66),B(0,61+1.5*w)];
  const full=[...half,...half.slice(0,-1).reverse().map(p=>[-p[0],p[1]])].map(p=>[x+p[0]*k,y+p[1]*k]);
  /* drop the duplicate centre point at the crotch, keep the outline symmetric */
  const arm=sg=>[B(11.4+3*w,22.6),B(13.6+5.6*w,31),B(14.6+7.4*w,45),B(14+6.2*w,57),B(13.4+5.6*w,62.6),B(11.2+5*w,62.2),B(11.2+5.4*w,56),B(11.6+6.4*w,45),B(10.4+5.6*w,32)].map(p=>[x+sg*p[0]*k,y+p[1]*k]);
  let g=`<g style="opacity:${o.op==null?1:o.op}">`;
  const st=`fill:${col};stroke:${line};stroke-width:${f1(Math.max(.8,1.1*k))};stroke-linejoin:round`;
  g+=`<path d="${smoothPath(arm(1))}" style="${st}"/><path d="${smoothPath(arm(-1))}" style="${st}"/>`;
  g+=`<path d="${smoothPath(full)}" style="${st}"/>`;
  g+=`<circle cx="${f1(x)}" cy="${f1(y+hy*k)}" r="${f1(hr*k)}" style="${st}"/>`;
  g+='</g>';
  const P=(px,py)=>[x+px*k,y+by(py)*k];
  return {svg:g,at:{head:[x,y+hy*k],chest:P(0,32),belly:P(0,46),liver:P(-4,40),hip:P(0,56),knee:P(-5,77),foot:P(-5,99)},w:2*(14.6+7.4*w)*k}}

function seesaw(x,y,w=200,o={}){const tl=clamp(o.tilt||0,-1,1),a=tl*12*Math.PI/180,hh=22,cx=x,cy=y-hh;
  /* tilt < 0: the left end sinks (heavier) */
  const L=[cx-Math.cos(a)*w/2,cy-Math.sin(a)*w/2],R=[cx+Math.cos(a)*w/2,cy+Math.sin(a)*w/2];
  let g=`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx-14)} ${f1(y)}L${f1(cx+14)} ${f1(y)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`;
  g+=`<line x1="${f1(L[0])}" y1="${f1(L[1])}" x2="${f1(R[0])}" y2="${f1(R[1])}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="3.5" style="fill:var(--ink)"/>`;
  const stack=(p,v,col)=>{let s='';const n=Math.round(clamp(v)*5),bw=w*.16,bh=9;for(let i=0;i<n;i++)s+=`<rect x="${f1(p[0]-bw/2)}" y="${f1(p[1]-4-(i+1)*(bh+1))}" width="${f1(bw)}" height="${bh}" rx="2" style="fill:${col};stroke:var(--panel);stroke-width:1"/>`;return s};
  const lp=[lerp(L[0],cx,.18),lerp(L[1],cy,.18)],rp=[lerp(R[0],cx,.18),lerp(R[1],cy,.18)];
  g+=stack(lp,o.lw||0,o.lcol||'var(--fat)')+stack(rp,o.rw||0,o.rcol||'var(--lean)');
  if(o.left)g+=kitLabel(lp[0],lp[1]+16,o.left,{a:'m'});
  if(o.right)g+=kitLabel(rp[0],rp[1]+16,o.right,{a:'m'});
  return {svg:g,at:{left:lp,right:rp}}}

/* ---- charts ---- */
function curveAxes(x,y,w,h,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1,xf=o.xfmt||(v=>v),yf=o.yfmt||(v=>v);
  const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h-h*(v-y0)/(y1-y0);
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
  (o.yt||[]).forEach(v=>{const yy=Y(v);if(o.grid!==false)s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy)}" y2="${f1(yy)}" class="grid"/>`;s+=`<text x="${f1(x-6)}" y="${f1(yy+3.5)}" class="t-xs t-end">${yf(v)}</text>`});
  (o.xt||[]).forEach(v=>{const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y+h)}" y2="${f1(y+h+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(y+h+16)}" class="t-xs t-mid">${xf(v)}</text>`});
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  if(o.xlabel)s+=`<text x="${f1(x+w)}" y="${f1(y+h+30)}" class="t-xs t-end">${o.xlabel}</text>`;
  if(o.ylabel)s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs">${o.ylabel}</text>`;
  return {svg:s,X,Y}}
function plotLine(P,X,Y,o={}){if(!P.length)return {svg:'',end:null};const col=o.col||'var(--brand)';let Q=P.slice();
  const f=o.smooth&&P.length>2?monoFn(P):null;
  if(f){Q=[];const a=P[0][0],b=P[P.length-1][0];for(let i=0;i<=80;i++){const v=lerp(a,b,i/80);Q.push([v,f(v)])}}
  if(o.upto!=null){const u=o.upto,out=[];for(let i=0;i<Q.length;i++){if(Q[i][0]<=u)out.push(Q[i]);else{if(i>0){const p=Q[i-1],q=Q[i],t=(u-p[0])/((q[0]-p[0])||1);out.push([u,lerp(p[1],q[1],t)])}break}}Q=out}
  if(!Q.length)return {svg:'',end:null};
  const pts=Q.map(p=>[X(p[0]),Y(p[1])]);let s='';
  if(o.fill){const b=Y(o.base==null?0:o.base);s+=`<path d="${ptsD(pts)}L${f1(pts[pts.length-1][0])} ${f1(b)}L${f1(pts[0][0])} ${f1(b)}Z" style="fill:${col};opacity:.15"/>`}
  s+=`<path d="${ptsD(pts)}" style="fill:none;stroke:${col};stroke-width:${o.lw||2.6};stroke-linejoin:round;stroke-linecap:round${o.dash?';stroke-dasharray:'+o.dash:''}"/>`;
  const e=pts[pts.length-1];if(o.dot)s+=`<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="4.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`;
  return {svg:s,end:e}}
function iconArray(x,y,o={}){const n=o.n||100,c=o.cols||10,sz=o.size||12,gp=o.gap==null?3:o.gap,base=o.base||'var(--line)';
  const groups=o.groups||[{k:o.k||0,col:o.col||'var(--brand)'}];const colOf=i=>{let acc=0;for(const g of groups){acc+=g.k;if(i<acc)return g.col}return base};
  const at=i=>[x+(i%c)*(sz+gp),y+Math.floor(i/c)*(sz+gp*1.4)];let s='';
  for(let i=0;i<n;i++){const[px,py]=at(i),f=colOf(i);
    if(o.shape==='dot')s+=`<circle cx="${f1(px+sz/2)}" cy="${f1(py+sz/2)}" r="${f1(sz*.42)}" style="fill:${f}"/>`;
    else{const r=sz*.18;s+=`<circle cx="${f1(px+sz/2)}" cy="${f1(py+r)}" r="${f1(r)}" style="fill:${f}"/><path d="M${f1(px+sz*.22)} ${f1(py+sz)}V${f1(py+sz*.62)}Q${f1(px+sz*.22)} ${f1(py+sz*.42)} ${f1(px+sz/2)} ${f1(py+sz*.42)}Q${f1(px+sz*.78)} ${f1(py+sz*.42)} ${f1(px+sz*.78)} ${f1(py+sz*.62)}V${f1(py+sz)}Z" style="fill:${f}"/>`}}
  return {svg:s,h:Math.ceil(n/c)*(sz+gp*1.4),w:c*(sz+gp)-gp,at}}
