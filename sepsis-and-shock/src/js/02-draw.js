/* sepsis-and-shock: its drawing kit. The shared runtime (tools/core/) supplies $, rng, lerp, clamp, ramp, f1, pathFn and marker. */
/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Everything here is schematic:
   no glyph encodes a measured value unless the caller passes one in, and the kit holds no clinical
   numbers (no qSOFA, SOFA, NEWS2 or Phoenix thresholds, no MAP or lactate targets, no fluid volumes or
   doses, no antibiotic timings): callers pass them in from the research, with the citation in the
   surrounding text. Scales below (a gauge's max, a meter's max) are drawing ranges, not criteria.
   bacterium(x,y,s,o)         a rod-shaped bacterium centred on (x,y), s = length. o: {ang (degrees), kind ('rod',
                              'coccus' a cluster of round cells, 'chain' a short chain of cocci), pili (true: short
                              surface hairs), div (0..1 dividing: the rod pinches at the waist and splits), lps (0..1
                              fragments shed from the wall, as PAMPs/endotoxin), op (opacity), col (var(--pathogen))}.
   virus(x,y,s,o)             a virus particle, s = diameter: a capsid with surface spikes. o: {op, col (var(--pathogen))}.
   neutrophil(x,y,s,o)        a neutrophil, s = diameter: a pale cell with a three-lobed nucleus and granules. o: {act
                              (0..1 the round cell flattens and puts out pseudopods), net (0..1 strands of a neutrophil
                              extracellular trap thrown out around it), ang, op, seed}.
   macrophage(x,y,s,o)        a macrophage, s = width: an irregular cell with pseudopods and a bean-shaped nucleus.
                              o: {act (0..1 longer pseudopods), tlr (true: receptor knobs on its rim, as toll-like
                              receptors), eat (0..1 a bacterium inside a vacuole), op, seed}.
   cytokines(cx,cy,r,o)       a burst of signalling particles around (cx,cy) as a cytokine release. o: {v (0..1 how
                              far they have spread: v*r), n (number, 14), seed, col (var(--fever)), op, size (2.4)}.
   vessel(x,y,w,h,o)          a small blood vessel in long section, flow left to right, in the box: tissue above and
                              below, the wall, a lining of endothelial cells with a glycocalyx fringe, and a lumen of red
                              cells. o: {flow (0..1 cells, 1), ph (0..1 phase of the moving cells: pass t times a speed),
                              o2 (0..1 red cells oxygenated red at 1, deoxygenated blue at 0; default 1), leak (0..1 gaps
                              open between the endothelial cells and fluid drops escape into the tissue), shed (0..1 the
                              glycocalyx thins; default leak), dilate (0..1 the lumen widens as the vessel relaxes),
                              clots (0..1 microclots with platelets), cells (0..1 immune cells rolling and sticking to the
                              wall), oedema (0..1 tissue swelling with fluid; default leak), seed}.
                              Returns {svg, at:{top, bot, cy} (lumen edges and centre y)}.
   capbed(x,y,w,h,o)          a capillary bed: an arteriole on the left feeding five capillaries into a venule on the
                              right. o: {perf (0..1 fraction of capillaries still perfused; blocked ones turn grey with a
                              microclot), ph (phase of the moving cells), seed}. Returns {svg, n (capillaries perfused)}.
   organ(kind,x,y,s,o)        an organ icon centred on (x,y), s = size: kind 'brain', 'lung' (both lungs and the
                              trachea), 'heart', 'liver', 'kidney' (a pair), 'gut'. o: {fail (0..1 the organ dims from
                              healthy --organ to failing grey --organ-fail), glow (0..1 an ember halo: infection or
                              inflammation here), label (text under it), lside (true: the label at the right instead)}.
   body(x,y,s,o)              a front-view person outline, (x,y) = the top of the head, s = scale (1 = 120 wide, 260
                              tall). o: {organs (true: small organ icons inside), fail ({brain,lung,heart,liver,kidney}:
                              0..1 for those icons), infect ({site:'lung'|'urine'|'abdomen'|'skin'|'line', v:0..1} an
                              ember glow at the source of infection), mottle (0..1 violet mottled patches on the knees,
                              thighs and forearms), cold (0..1 hands and feet turn pale-blue), id}.
                              Returns {svg, at:{brain,lung,heart,liver,kidney,abdomen,bladder,skin,knee,hand,arm}}.
   gauge(cx,cy,r,v,max,o)     a half-dial gauge (0 at the left, max at the right) with a needle at v: the MAP or blood
                              pressure dial, or a score dial. o: {bands ([{to, col, label}] from the caller's cited
                              source; none by default), label (under the hub), unit, big (true: v as a large number),
                              ticks (false hides 0 and max)}.
   lactateMeter(x,y,w,h,v,max,o) a vertical lactate tube in the box, filled gold to v of max. o: {bands ([{from,to,col,
                              label}] in value units from the caller's source), label ('lactate'), unit, val (true:
                              the value printed above)}.
   ivBag(x,y,s,o)             an IV bag hanging from (x,y) (top centre; s = scale, 1 = 40 wide, 64 tall) with a drip
                              chamber and a line. o: {fill (0..1 left in the bag, 1), col (var(--fluid); an antibiotic
                              bag might pass var(--rx)), ph (drip phase), drip (true), label (printed on the bag), to
                              ([x,y] where the line ends; default straight down 30*s)}. Returns {svg, end:[x,y]}.
   pump(x,y,w,h,o)            a syringe pump in the box, as used for a vasopressor infusion: the body, a syringe whose
                              plunger advances, a small screen. o: {v (0..1 how far the plunger has moved), txt (screen
                              text), on (true: a running light), col (syringe contents, var(--rx)), to ([x,y] a line to
                              the patient)}. Returns {svg, out:[x,y] (the line's start)}.
   thermometer(x,y,h,v,o)     a vertical thermometer, (x,y) = the top, h = height; the column rises to v (0..1).
                              o: {col (var(--fever)), label, w (8)}.
   clock(cx,cy,r,min,o)       a clock face with hands at min minutes past o.h0 (hours, 0) and a filled sector for the
                              time elapsed: the first hour. o: {full (minutes for a full sector, 60), col
                              (var(--brand)), label (under the face), ticks (12), marks ([{min, col, label}] dots on
                              the rim, e.g. when each bundle element was done, from the caller)}.
   tcurve(x,y,w,h,pts,o)      a time course through the caller's cited points pts [[t, value],...] (monotone, never
                              overshooting), e.g. lactate clearance or a SOFA trajectory. o: {x0, x1 (time domain;
                              default the first and last t), y0, y1 (value range), log (true: log10 value axis), ref (a
                              reference line value from the source), refLabel, upto (draw to this t), col
                              (var(--lactate)), fill, dot, dash, lw}. Returns {svg, X, Y, at, f}.
   icons(x,y,o)               an icon array: o {n (100), cols (10), k (number highlighted), size (12), gap (3),
                              col (var(--brand)), base (var(--line)), shape ('person' or 'dot')}.
                              Returns {svg, h (height), at(i)->[x,y]}.
   curve(x,y,w,h,f,o)         a plotted function f(x) in the box with axes. o: {x0,x1 (domain, default 0..1),
                              y0,y1 (range, default 0..1), upto, col (var(--brand)), fill, bands ([{from,to,
                              col,label}] horizontal shaded bands in y units from the caller's source), dot,
                              lw (2.6), dash}. Returns {svg, X(xv)->px, Y(yv)->px, at(xv)->[px,py]}.
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big (ticks
                              above)}. Returns {svg, X(v)->x}.
   ladder(x,y,w,h,steps,o)    rising stairs from bottom-left, one step per label (a treatment ladder, an escalation
                              pathway). o: {at (index highlighted), col (var(--rx)), done}. Returns {svg, top(i)}.
   pill(x,y,s,o)              a tablet centred at (x,y), s = length; o: {ang (degrees), col (var(--rx)),
                              txt (a short label printed on it), round (true: a round tablet)}.
   person(x,y,s,fill,o)       a person pictogram for icon arrays (s = height, (x,y) the top), fill a CSS
                              colour; o.op.
   marker(id,color)           an arrowhead <marker> for <defs>. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
/* a closed blob: n points round (0,0) at radius r, wobbled by the seeded rng (amp 0..1) */
function blobPts(r,n,amp,seed,sx=1,sy=1){const rr=rng(seed);const P=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*2*amp;P.push([Math.cos(a)*r*k*sx,Math.sin(a)*r*k*sy])}return P}
/* ---- microbes ---- */
function bacterium(x,y,s=16,o={}){const col=o.col||'var(--pathogen)',op=o.op==null?1:o.op,kind=o.kind||'rod',w=s*.42,rr=rng(o.seed||Math.round(x*7+y*3));
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${f1(op)}">`;
  if(kind==='coccus'||kind==='chain'){const r=s*.2,P=kind==='chain'?[[-s*.4,0],[-s*.13,0],[s*.13,0],[s*.4,0]]:[[-r*.9,-r*.5],[r*.9,-r*.5],[0,r*.9],[r*1.8,r*.6]];
    P.forEach(p=>{g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r)}" style="fill:${col};stroke:var(--pathogen-dark);stroke-width:${f1(Math.max(.6,s*.05))}"/>`})}
  else{const dv=clamp(o.div||0),gap=dv*s*.16;
    const half=(sx,len)=>`<rect x="${f1(sx)}" y="${f1(-w/2)}" width="${f1(len)}" height="${f1(w)}" rx="${f1(w/2)}" style="fill:${col};stroke:var(--pathogen-dark);stroke-width:${f1(Math.max(.6,s*.05))}"/>`;
    if(dv<.35){g+=half(-s/2,s);if(dv>0)g+=`<path d="M0 ${f1(-w/2)}v${f1(w*.3*dv/.35)}M0 ${f1(w/2)}v${f1(-w*.3*dv/.35)}" style="stroke:var(--pathogen-dark);stroke-width:${f1(s*.06)}"/>`}
    else{g+=half(-s/2-gap,s/2)+half(gap,s/2)}
    if(o.pili)for(let i=0;i<8;i++){const px=lerp(-s*.38,s*.38,i/7),up=i%2?-1:1;g+=`<line x1="${f1(px)}" y1="${f1(up*w/2)}" x2="${f1(px+(rr()-.5)*2)}" y2="${f1(up*(w/2+s*.12))}" style="stroke:var(--pathogen-dark);stroke-width:${f1(s*.04)}"/>`}
    g+=`<ellipse cx="${f1(-s*.08)}" cy="${f1(-w*.08)}" rx="${f1(s*.16)}" ry="${f1(w*.16)}" style="fill:var(--pathogen-dark);opacity:.35"/>`}
  const l=clamp(o.lps||0);if(l>0)for(let i=0;i<Math.round(3+l*6);i++){const a=rr()*Math.PI*2,d=s*(.45+l*.5*rr());const px=Math.cos(a)*d,py=Math.sin(a)*d*.8,z=s*.07;
    g+=`<path d="M${f1(px)} ${f1(py-z)}L${f1(px+z)} ${f1(py+z)}L${f1(px-z)} ${f1(py+z)}Z" style="fill:var(--pathogen-dark);opacity:${f1(l)}"/>`}
  return g+'</g>'}
function virus(x,y,s=14,o={}){const col=o.col||'var(--pathogen)',r=s*.36;let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o.op==null?1:o.op)}">`;
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2,c=Math.cos(a),sn=Math.sin(a);g+=`<line x1="${f1(c*r)}" y1="${f1(sn*r)}" x2="${f1(c*s*.5)}" y2="${f1(sn*s*.5)}" style="stroke:var(--pathogen-dark);stroke-width:${f1(s*.06)}"/><circle cx="${f1(c*s*.5)}" cy="${f1(sn*s*.5)}" r="${f1(s*.06)}" style="fill:var(--pathogen-dark)"/>`}
  g+=`<circle r="${f1(r)}" style="fill:${col};stroke:var(--pathogen-dark);stroke-width:${f1(s*.06)}"/><circle r="${f1(r*.45)}" style="fill:var(--pathogen-dark);opacity:.35"/>`;
  return g+'</g>'}
/* ---- immune cells ---- */
function neutrophil(x,y,s=26,o={}){const a=clamp(o.act||0),R=s/2,seed=o.seed||Math.round(x*3+y*5),rr=rng(seed);
  const P=blobPts(R,14,.04+a*.22,seed,1+a*.18,1-a*.12);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})" style="opacity:${f1(o.op==null?1:o.op)}">`;
  const nt=clamp(o.net||0);if(nt>0)for(let i=0;i<9;i++){const an=i/9*Math.PI*2+rr()*.3,L=R*(1.1+nt*1.4);let d=`M${f1(Math.cos(an)*R*.7)} ${f1(Math.sin(an)*R*.7)}`;
    for(let k=1;k<=4;k++){const rad=R*.7+(L-R*.7)*k/4,aa=an+(rr()-.5)*.5;d+=`L${f1(Math.cos(aa)*rad)} ${f1(Math.sin(aa)*rad)}`}
    g+=`<path d="${d}" style="fill:none;stroke:var(--immune);stroke-width:${f1(Math.max(.6,s*.03))};stroke-dasharray:${f1(s*.08)} ${f1(s*.05)};opacity:${f1(nt*.85)}"/>`}
  g+=`<path d="${smoothPath(P)}" style="fill:var(--cell);stroke:var(--immune);stroke-width:${f1(Math.max(.8,s*.05))}"/>`;
  for(let i=0;i<9;i++){const an=rr()*Math.PI*2,d=R*(.35+rr()*.45);g+=`<circle cx="${f1(Math.cos(an)*d)}" cy="${f1(Math.sin(an)*d)}" r="${f1(s*.04)}" style="fill:var(--gran)"/>`}
  [[-.32,-.12],[0,.16],[.32,-.08]].forEach(p=>{g+=`<ellipse cx="${f1(p[0]*R)}" cy="${f1(p[1]*R)}" rx="${f1(R*.24)}" ry="${f1(R*.2)}" style="fill:var(--immune)"/>`});
  g+=`<path d="M${f1(-R*.18)} ${f1(-R*.02)}L${f1(-R*.08)} ${f1(R*.08)}M${f1(R*.1)} ${f1(R*.1)}L${f1(R*.2)} ${f1(-R*.02)}" style="stroke:var(--immune);stroke-width:${f1(R*.1)}"/>`;
  return g+'</g>'}
function macrophage(x,y,s=34,o={}){const a=clamp(o.act||0),R=s/2,seed=o.seed||Math.round(x*5+y*7),rr=rng(seed);const P=[];
  for(let i=0;i<16;i++){const an=i/16*Math.PI*2,arm=i%4===1?1+.25+a*.55:i%4===3?1+.1+a*.25:1;P.push([Math.cos(an)*R*arm*(1+(rr()-.5)*.12),Math.sin(an)*R*arm*.82*(1+(rr()-.5)*.12)])}
  let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${f1(o.op==null?1:o.op)}"><path d="${smoothPath(P)}" style="fill:var(--cell);stroke:var(--immune);stroke-width:${f1(Math.max(.8,s*.04))}"/>`;
  g+=`<path d="M${f1(-R*.42)} ${f1(-R*.05)}C${f1(-R*.42)} ${f1(-R*.42)} ${f1(R*.05)} ${f1(-R*.44)} ${f1(R*.08)} ${f1(-R*.18)}C${f1(R*.1)} ${f1(-R*.02)} ${f1(-R*.05)} ${f1(0)} ${f1(-R*.02)} ${f1(R*.14)}C${f1(0)} ${f1(R*.34)} ${f1(-R*.42)} ${f1(R*.3)} ${f1(-R*.42)} ${f1(-R*.05)}Z" style="fill:var(--immune);opacity:.9"/>`;
  const e=clamp(o.eat||0);if(e>0){g+=`<circle cx="${f1(R*.36)}" cy="${f1(R*.14)}" r="${f1(R*.26)}" style="fill:var(--pathogen-soft);stroke:var(--immune);stroke-width:${f1(s*.025)};opacity:${f1(e)}"/>`+bacterium(R*.36,R*.14,R*.36,{ang:30,op:e*(1-e*.4)})}
  if(o.tlr)for(let i=0;i<8;i++){const an=i/8*Math.PI*2+.2,px=Math.cos(an)*R*.98,py=Math.sin(an)*R*.8;g+=`<path d="M${f1(px)} ${f1(py)}l${f1(Math.cos(an)*s*.07)} ${f1(Math.sin(an)*s*.07)}" style="stroke:var(--immune);stroke-width:${f1(s*.035)};stroke-linecap:round"/><circle cx="${f1(px+Math.cos(an)*s*.09)}" cy="${f1(py+Math.sin(an)*s*.09)}" r="${f1(s*.035)}" style="fill:var(--immune)"/>`}
  return g+'</g>'}
function cytokines(cx,cy,r,o={}){const v=clamp(o.v==null?1:o.v),n=o.n||14,rr=rng(o.seed||11),col=o.col||'var(--fever)',sz=o.size||2.4,op=o.op==null?1:o.op;let s='';
  if(v<=0||op<=0)return s;
  for(let i=0;i<n;i++){const an=i/n*Math.PI*2+rr()*.6,d=r*v*(.35+.65*rr()),px=cx+Math.cos(an)*d,py=cy+Math.sin(an)*d,k=sz*(.7+rr()*.6);
    s+=i%3?`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(k*.6)}" style="fill:${col};opacity:${f1(op*(.55+.45*(1-v*.5)))}"/>`
      :`<path d="M${f1(px)} ${f1(py-k)}L${f1(px+k*.8)} ${f1(py)}L${f1(px)} ${f1(py+k)}L${f1(px-k*.8)} ${f1(py)}Z" style="fill:${col};opacity:${f1(op*.9)}"/>`}
  return s}
/* ---- vessels and microcirculation ---- */
function vessel(x,y,w,h,o={}){const rr=rng(o.seed||5),leak=clamp(o.leak||0),shed=clamp(o.shed==null?leak:o.shed),dil=clamp(o.dilate||0),oed=clamp(o.oedema==null?leak:o.oedema);
  const tis=h*.2,wall=h*.1*(1-dil*.35),yt=y+tis+wall-dil*h*.05,yb=y+h-tis-wall+dil*h*.05,lh=yb-yt,cy=(yt+yb)/2,ph=o.ph||0,flow=o.flow==null?1:clamp(o.flow),o2=clamp(o.o2==null?1:o.o2);
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="5" style="fill:var(--field);stroke:var(--line)"/>`;
  if(oed>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(tis)}" style="fill:var(--fluid-soft);opacity:${f1(oed)}"/><rect x="${f1(x)}" y="${f1(y+h-tis)}" width="${f1(w)}" height="${f1(tis)}" style="fill:var(--fluid-soft);opacity:${f1(oed)}"/>`;
  s+=`<rect x="${f1(x)}" y="${f1(yt-wall)}" width="${f1(w)}" height="${f1(lh+2*wall)}" style="fill:var(--wall)"/><rect x="${f1(x)}" y="${f1(yt)}" width="${f1(w)}" height="${f1(lh)}" style="fill:var(--blood-soft)"/>`;
  /* endothelial cells: a row on each wall, with gaps that open as leak rises */
  const n=Math.max(5,Math.round(w/34)),cw=w/n,gp=2+leak*cw*.22,et=Math.max(2.4,wall*.55);
  for(const side of [0,1]){const ey=side?yb-et*.2:yt-et*.8;
    for(let i=0;i<n;i++){const ex=x+i*cw+gp/2;s+=`<rect x="${f1(ex)}" y="${f1(ey)}" width="${f1(cw-gp)}" height="${f1(et)}" rx="${f1(et/2)}" style="fill:var(--endo)"/>`;
      /* glycocalyx fringe on the lumen side */
      const gl=(1-shed*.85)*Math.min(5,lh*.1);if(gl>.4)for(let k=0;k<5;k++){const gx=ex+(cw-gp)*(k+.5)/5,g0=side?ey:ey+et;s+=`<line x1="${f1(gx)}" x2="${f1(gx)}" y1="${f1(g0)}" y2="${f1(side?g0-gl:g0+gl)}" style="stroke:var(--glyco);stroke-width:1.1"/>`}}}
  /* red cells (oxygenated red to deoxygenated blue) */
  const nc=Math.max(5,Math.round(w/14*flow));
  for(let i=0;i<nc;i++){const u=((i/nc)+ph+rr()*.03)%1,bx=x+5+u*(w-10),by=yt+lh*(.25+.5*rr()),rx=Math.min(5.5,lh*.16),ry=Math.min(2.6,lh*.08);
    s+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--oxy);opacity:${f1(.3+.7*o2)}"/>`;
    if(o2<1)s+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--deoxy);opacity:${f1((1-o2)*.85)}"/>`}
  /* fluid escaping through the gaps into the tissue */
  if(leak>.05)for(let i=1;i<n;i++)for(const side of [0,1]){const gx=x+i*cw,k=((ph*2+i*.37+side*.5)%1),dist=k*tis*.9*leak+wall,yy=side?yb+dist:yt-dist;
    s+=`<path d="M${f1(gx)} ${f1(yy-2.6)}C${f1(gx+2.2)} ${f1(yy)} ${f1(gx+1.6)} ${f1(yy+2.4)} ${f1(gx)} ${f1(yy+2.4)}C${f1(gx-1.6)} ${f1(yy+2.4)} ${f1(gx-2.2)} ${f1(yy)} ${f1(gx)} ${f1(yy-2.6)}Z" style="fill:var(--fluid);opacity:${f1(leak*(1-k*.6))}"/>`}
  /* immune cells rolling along and sticking to the wall */
  const ic=clamp(o.cells||0);if(ic>0)for(let i=0;i<3;i++){const cx=x+w*(.22+i*.28)+((ph*30+i*11)%14)*(1-ic),r=Math.min(lh*.2,9);s+=neutrophil(cx,yt+r+1,r*2,{act:ic,op:ic,seed:i+3})}
  const cl=clamp(o.clots||0);if(cl>0)for(let i=0;i<Math.round(1+cl*3);i++){const cx=x+w*(.15+.27*i+rr()*.06),cyy=i%2?yb-lh*.18:yt+lh*.2,r=lh*.1*(.6+cl*.6);
    s+=`<path d="${smoothPath(blobPts(r,8,.25,i+9).map(p=>[p[0]+cx,p[1]+cyy]))}" style="fill:var(--clot);opacity:${f1(cl)}"/>`;
    for(let k=0;k<3;k++)s+=`<circle cx="${f1(cx+(rr()-.5)*r*1.6)}" cy="${f1(cyy+(rr()-.5)*r*1.4)}" r="1.5" style="fill:var(--plt);opacity:${f1(cl)}"/>`}
  return {svg:s,at:{top:yt,bot:yb,cy}}}
function capbed(x,y,w,h,o={}){const perf=clamp(o.perf==null?1:o.perf),ph=o.ph||0,rr=rng(o.seed||3),N=5,order=[2,0,4,1,3],aw=Math.max(7,h*.09);
  const open=new Set(order.slice(0,Math.round(perf*N)));
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
  const ax=x+w*.12,vx=x+w*.88;
  s+=`<path d="M${f1(ax)} ${f1(y+6)}V${f1(y+h-6)}" style="stroke:var(--oxy);stroke-width:${f1(aw)};stroke-linecap:round"/><path d="M${f1(vx)} ${f1(y+6)}V${f1(y+h-6)}" style="stroke:var(--deoxy);stroke-width:${f1(aw)};stroke-linecap:round;opacity:.85"/>`;
  for(let i=0;i<N;i++){const cy=y+h*(i+.5)/N,wob=(rr()-.5)*h*.08,d=`M${f1(ax)} ${f1(cy)}C${f1(x+w*.35)} ${f1(cy+wob)} ${f1(x+w*.65)} ${f1(cy-wob)} ${f1(vx)} ${f1(cy)}`,on=open.has(i);
    s+=`<path d="${d}" style="fill:none;stroke:${on?'var(--blood-soft)':'var(--panel-2)'};stroke-width:5;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:${on?'var(--oxy)':'var(--organ-fail)'};stroke-width:1.2;opacity:.55"/>`;
    if(on)for(let k=0;k<3;k++){const u=(ph*1.5+k/3+i*.13)%1,px=lerp(ax,vx,u);s+=`<circle cx="${f1(px)}" cy="${f1(cy+wob*Math.sin(u*Math.PI)*.6)}" r="2" style="fill:var(--oxy);opacity:${f1(1-u*.5)}"/>`}
    else s+=`<circle cx="${f1(x+w*.42)}" cy="${f1(cy)}" r="3.2" style="fill:var(--clot)"/>`}
  return {svg:s,n:open.size}}
/* ---- organs ---- */
const ORGAN_D={
  brain:([[-.46,.1],[-.44,-.18],[-.3,-.36],[-.06,-.44],[.18,-.42],[.38,-.3],[.47,-.06],[.42,.16],[.24,.26],[.02,.24],[-.2,.3],[-.38,.26]]),
  lungL:([[-.08,-.3],[-.2,-.36],[-.36,-.18],[-.44,.12],[-.42,.36],[-.24,.4],[-.1,.3],[-.07,.02]]),
  heart:([[-.04,-.3],[.14,-.38],[.32,-.3],[.4,-.1],[.34,.14],[.16,.32],[-.06,.44],[-.22,.3],[-.38,.06],[-.4,-.18],[-.24,-.32]]),
  liver:([[-.46,-.2],[-.2,-.3],[.2,-.28],[.46,-.2],[.36,-.04],[.06,.12],[-.24,.3],[-.44,.22],[-.5,0]]),
  kidL:([[-.18,-.36],[-.04,-.32],[0,-.14],[-.08,0],[0,.14],[-.04,.32],[-.18,.36],[-.32,.26],[-.38,0],[-.32,-.26]]),
  gut:([[-.4,-.3],[.4,-.3],[.44,.3],[-.44,.32]])};
function organPath(P,x,y,s,mx=1){return smoothPath(P.map(p=>[x+p[0]*s*mx,y+p[1]*s]))}
function organ(kind,x,y,s=40,o={}){const fl=clamp(o.fail||0),gw=clamp(o.glow||0),sw=f1(Math.max(1,s*.035));let g='';
  if(gw>0)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.62)}" style="fill:var(--fever);opacity:${f1(gw*.28)}"/>`;
  const shapes=[],extra=[];
  if(kind==='brain'){shapes.push(organPath(ORGAN_D.brain,x,y,s));
    extra.push(`M${f1(x)} ${f1(y-s*.42)}C${f1(x-s*.04)} ${f1(y-s*.2)} ${f1(x+s*.04)} ${f1(y)} ${f1(x)} ${f1(y+s*.2)}`,`M${f1(x-s*.34)} ${f1(y-s*.12)}C${f1(x-s*.2)} ${f1(y-s*.22)} ${f1(x-s*.14)} ${f1(y)} ${f1(x-s*.24)} ${f1(y+s*.1)}`,`M${f1(x+s*.32)} ${f1(y-s*.2)}C${f1(x+s*.16)} ${f1(y-s*.16)} ${f1(x+s*.22)} ${f1(y+s*.04)} ${f1(x+s*.12)} ${f1(y+s*.12)}`,
      `M${f1(x+s*.04)} ${f1(y+s*.24)}C${f1(x+s*.08)} ${f1(y+s*.34)} ${f1(x+s*.12)} ${f1(y+s*.4)} ${f1(x+s*.1)} ${f1(y+s*.46)}`)}
  else if(kind==='lung'){shapes.push(organPath(ORGAN_D.lungL,x,y,s),organPath(ORGAN_D.lungL,x,y,s,-1));
    extra.push(`M${f1(x)} ${f1(y-s*.48)}V${f1(y-s*.12)}M${f1(x)} ${f1(y-s*.12)}L${f1(x-s*.16)} ${f1(y+s*.06)}M${f1(x)} ${f1(y-s*.12)}L${f1(x+s*.16)} ${f1(y+s*.06)}`)}
  else if(kind==='heart'){shapes.push(organPath(ORGAN_D.heart,x,y,s));
    extra.push(`M${f1(x-s*.06)} ${f1(y-s*.26)}C${f1(x-s*.08)} ${f1(y-s*.42)} ${f1(x+s*.02)} ${f1(y-s*.5)} ${f1(x+s*.16)} ${f1(y-s*.48)}`,`M${f1(x+s*.08)} ${f1(y-s*.04)}C${f1(x+s*.04)} ${f1(y+s*.12)} ${f1(x-s*.02)} ${f1(y+s*.2)} ${f1(x)} ${f1(y+s*.3)}`)}
  else if(kind==='liver'){shapes.push(organPath(ORGAN_D.liver,x,y,s));extra.push(`M${f1(x+s*.06)} ${f1(y-s*.28)}C${f1(x)} ${f1(y-s*.1)} ${f1(x-s*.06)} ${f1(y)} ${f1(x-s*.04)} ${f1(y+s*.14)}`)}
  else if(kind==='kidney'){shapes.push(organPath(ORGAN_D.kidL,x-s*.04,y,s),organPath(ORGAN_D.kidL,x+s*.04,y,s,-1));
    extra.push(`M${f1(x-s*.1)} ${f1(y)}C${f1(x-s*.06)} ${f1(y+s*.2)} ${f1(x-s*.04)} ${f1(y+s*.36)} ${f1(x-s*.06)} ${f1(y+s*.5)}M${f1(x+s*.1)} ${f1(y)}C${f1(x+s*.06)} ${f1(y+s*.2)} ${f1(x+s*.04)} ${f1(y+s*.36)} ${f1(x+s*.06)} ${f1(y+s*.5)}`)}
  else{shapes.push(`M${f1(x-s*.38)} ${f1(y-s*.28)}H${f1(x+s*.38)}V${f1(y+s*.3)}H${f1(x-s*.38)}Z`);
    extra.push(`M${f1(x-s*.28)} ${f1(y-s*.14)}C${f1(x-s*.1)} ${f1(y-s*.3)} ${f1(x+s*.1)} ${f1(y)} ${f1(x+s*.28)} ${f1(y-s*.14)}M${f1(x-s*.28)} ${f1(y+s*.06)}C${f1(x-s*.1)} ${f1(y-s*.1)} ${f1(x+s*.1)} ${f1(y+s*.2)} ${f1(x+s*.28)} ${f1(y+s*.06)}`)}
  shapes.forEach(d=>{g+=`<path d="${d}" style="fill:var(--organ);stroke:var(--organ-dark);stroke-width:${sw}"/>`;
    if(fl>0)g+=`<path d="${d}" style="fill:var(--organ-fail);stroke:var(--organ-fail-dark);stroke-width:${sw};opacity:${f1(fl)}"/>`});
  extra.forEach(d=>{g+=`<path d="${d}" style="fill:none;stroke:var(--organ-dark);stroke-width:${sw};stroke-linecap:round;opacity:${f1(.8*(1-fl))}"/>`;
    if(fl>0)g+=`<path d="${d}" style="fill:none;stroke:var(--organ-fail-dark);stroke-width:${sw};stroke-linecap:round;opacity:${f1(.8*fl)}"/>`});
  if(o.label)g+=o.lside?`<text x="${f1(x+s*.6)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-weight:600">${o.label}</text>`:`<text x="${f1(x)}" y="${f1(y+s*.5+12)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${o.label}</text>`;
  return g}
/* ---- the body ---- */
const BODY_TORSO=[[34,44],[60,40],[86,44],[96,58],[92,92],[88,128],[92,150],[60,158],[28,150],[32,128],[28,92],[24,58]];
const BODY_LIMBS=['M27 52C18 78 13 108 11 146','M93 52C102 78 107 108 109 146','M45 150C43 190 42 222 41 252','M75 150C77 190 78 222 79 252'];
const BODY_AT={brain:[60,18],lung:[60,74],heart:[66,84],liver:[49,104],kidney:[60,118],abdomen:[60,124],bladder:[60,146],skin:[93,92],knee:[43,204],hand:[11,146],arm:[16,110],line:[78,52]};
function body(x,y,s=1,o={}){const T=p=>[x+(p[0]-60)*s,y+p[1]*s],mo=clamp(o.mottle||0),cold=clamp(o.cold||0),id=o.id||('bd'+Math.round(x)+'_'+Math.round(y)),fail=o.fail||{};
  let g=`<g transform="translate(${f1(x-60*s)} ${f1(y)}) scale(${s})">`;const sw=v=>f1(v/s),ow=v=>f1(v+3/s),torso=smoothPath(BODY_TORSO);
  /* outline pass, then skin pass: the strokes merge into one silhouette */
  g+=`<g style="stroke:var(--muted);opacity:.55;fill:none;stroke-linecap:round"><circle cx="60" cy="20" r="17" style="stroke-width:${sw(3)}"/><path d="${torso}" style="stroke-width:${sw(3)}"/>${BODY_LIMBS.map((d,i)=>`<path d="${d}" style="stroke-width:${ow(i<2?14:19)}"/>`).join('')}<path d="M60 34V44" style="stroke-width:${ow(12)}"/></g>`;
  g+=`<g style="stroke:var(--skin);fill:none;stroke-linecap:round">${BODY_LIMBS.map((d,i)=>`<path d="${d}" style="stroke-width:${i<2?14:19}"/>`).join('')}<path d="M60 34V44" style="stroke-width:12"/></g><circle cx="60" cy="20" r="17" style="fill:var(--skin)"/><path d="${torso}" style="fill:var(--skin)"/>`;
  if(cold>0)g+=`<g style="fill:var(--deoxy);opacity:${f1(cold*.4)}"><circle cx="11" cy="146" r="7"/><circle cx="109" cy="146" r="7"/><ellipse cx="41" cy="254" rx="10" ry="5"/><ellipse cx="79" cy="254" rx="10" ry="5"/></g>`;
  if(mo>0){const rr=rng(7);g+=`<clipPath id="${id}m"><path d="M45 150C43 190 42 222 41 252M75 150C77 190 78 222 79 252M27 52C18 78 13 108 11 146M93 52C102 78 107 108 109 146" style="stroke-width:19"/></clipPath><g style="opacity:${f1(mo)}">`;
    [[43,200,24],[77,200,24],[44,176,16],[76,176,16],[18,104,10],[102,104,10]].forEach(([cx,cy,n])=>{for(let i=0;i<n/2;i++){const px=cx+(rr()-.5)*14,py=cy+(rr()-.5)*n*1.6;
      g+=`<path d="${smoothPath(blobPts(1.6+rr()*2.2,7,.35,i+cx).map(p=>[p[0]+px,p[1]+py]))}" style="fill:var(--mottle-fill);opacity:.8"/>`}});
    g+='</g>'}
  if(o.organs){[['brain',17],['lung',30],['heart',14],['liver',20],['kidney',18]].forEach(([k,z])=>{const p=BODY_AT[k];g+=organ(k,p[0],p[1],z,{fail:fail[k]||0})})}
  if(o.infect&&o.infect.v>0){const p=BODY_AT[{lung:'lung',urine:'bladder',abdomen:'abdomen',skin:'skin',line:'line'}[o.infect.site]||'lung'],v=clamp(o.infect.v);
    g+=`<circle cx="${p[0]}" cy="${p[1]}" r="${f1(6+10*v)}" style="fill:var(--fever);opacity:${f1(.18+.22*v)}"/><circle cx="${p[0]}" cy="${p[1]}" r="${f1(3+5*v)}" style="fill:var(--fever);opacity:${f1(.35*v)}"/>`}
  g+='</g>';
  const at={};Object.keys(BODY_AT).forEach(k=>at[k]=T(BODY_AT[k]));
  return {svg:g,at}}
/* ---- gauges, meters, devices ---- */
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  if(o.ticks!==false)s+=`<text x="${f1(cx-r)}" y="${f1(cy+14)}" class="t-xs t-mid">0</text><text x="${f1(cx+r)}" y="${f1(cy+14)}" class="t-xs t-mid">${max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+16)}" class="t-sm t-mid">${o.label}${o.unit?' ('+o.unit+')':''}</text>`;
  return s}
function lactateMeter(x,y,w,h,v,max,o={}){const u=clamp(v/max),r=w/2;let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(r)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
  const Y=val=>y+h-h*clamp(val/max);
  (o.bands||[]).forEach(b=>{const ya=Y(b.to),yb=Y(b.from);s+=`<rect x="${f1(x+w+3)}" y="${f1(ya)}" width="4" height="${f1(Math.max(0,yb-ya))}" style="fill:${b.col}"/>`;if(b.label)s+=`<text x="${f1(x+w+10)}" y="${f1((ya+yb)/2+3)}" class="t-xs">${b.label}</text>`});
  if(u>0)s+=`<clipPath id="lm${Math.round(x)}_${Math.round(y)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(r)}"/></clipPath><rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(w)}" height="${f1(h*u)}" clip-path="url(#lm${Math.round(x)}_${Math.round(y)})" style="fill:var(--lactate-fill)"/>`;
  if(o.val)s+=`<text x="${f1(x+r)}" y="${f1(y-6)}" class="t-sm t-mid" style="fill:var(--lactate);font-weight:600">${(+v).toFixed(1)}${o.unit?' '+o.unit:''}</text>`;
  s+=`<text x="${f1(x+r)}" y="${f1(y+h+13)}" class="t-xs t-mid">${o.label==null?'lactate':o.label}</text>`;
  return s}
function ivBag(x,y,s=1,o={}){const bw=40*s,bh=50*s,fl=clamp(o.fill==null?1:o.fill),col=o.col||'var(--fluid)',top=y+8*s,id='iv'+Math.round(x)+'_'+Math.round(y);
  const bag=`M${f1(x-bw/2+4*s)} ${f1(top)}H${f1(x+bw/2-4*s)}Q${f1(x+bw/2)} ${f1(top)} ${f1(x+bw/2)} ${f1(top+6*s)}V${f1(top+bh-10*s)}Q${f1(x+bw/2)} ${f1(top+bh)} ${f1(x+6*s)} ${f1(top+bh+2*s)}H${f1(x-6*s)}Q${f1(x-bw/2)} ${f1(top+bh)} ${f1(x-bw/2)} ${f1(top+bh-10*s)}V${f1(top+6*s)}Q${f1(x-bw/2)} ${f1(top)} ${f1(x-bw/2+4*s)} ${f1(top)}Z`;
  let g=`<circle cx="${f1(x)}" cy="${f1(y+3*s)}" r="${f1(3*s)}" style="fill:none;stroke:var(--device);stroke-width:${f1(1.4*s)}"/>`;
  g+=`<clipPath id="${id}"><path d="${bag}"/></clipPath><path d="${bag}" style="fill:var(--panel);stroke:var(--device);stroke-width:${f1(1.4*s)}"/>`;
  const fy=top+4*s+(bh-6*s)*(1-fl);g+=`<rect x="${f1(x-bw/2)}" y="${f1(fy)}" width="${f1(bw)}" height="${f1(top+bh+4*s-fy)}" clip-path="url(#${id})" style="fill:${col};opacity:.55"/>`;
  for(let i=1;i<4;i++)g+=`<line x1="${f1(x+bw/2-9*s)}" x2="${f1(x+bw/2-3*s)}" y1="${f1(top+bh*i/4)}" y2="${f1(top+bh*i/4)}" style="stroke:var(--device);stroke-width:${f1(s)}"/>`;
  if(o.label)g+=`<text x="${f1(x-2*s)}" y="${f1(top+bh*.36)}" class="t-mid" style="font:600 ${f1(Math.max(7,7.5*s))}px var(--mono);fill:var(--ink)">${o.label}</text>`;
  const ch=top+bh+2*s,cy0=ch+5*s,chh=12*s;g+=`<rect x="${f1(x-1.5*s)}" y="${f1(ch)}" width="${f1(3*s)}" height="${f1(5*s)}" style="fill:var(--device)"/><rect x="${f1(x-4*s)}" y="${f1(cy0)}" width="${f1(8*s)}" height="${f1(chh)}" rx="${f1(2*s)}" style="fill:var(--panel);stroke:var(--device);stroke-width:${f1(s)}"/>`;
  g+=`<rect x="${f1(x-4*s)}" y="${f1(cy0+chh*.65)}" width="${f1(8*s)}" height="${f1(chh*.35)}" rx="${f1(1.5*s)}" style="fill:${col};opacity:.55"/>`;
  if(o.drip!==false&&fl>0){const k=((o.ph||0)*3)%1;g+=`<circle cx="${f1(x)}" cy="${f1(cy0+2*s+k*chh*.5)}" r="${f1(1.4*s)}" style="fill:${col};opacity:${f1(1-k*.5)}"/>`}
  const st=[x,cy0+chh],end=o.to||[x,cy0+chh+30*s];
  g+=`<path d="M${f1(st[0])} ${f1(st[1])}C${f1(st[0])} ${f1(st[1]+(end[1]-st[1])*.6)} ${f1(end[0])} ${f1(end[1]-(end[1]-st[1])*.3)} ${f1(end[0])} ${f1(end[1])}" style="fill:none;stroke:var(--device);stroke-width:${f1(1.3*s)}"/>`;
  return {svg:g,end}}
function pump(x,y,w,h,o={}){const v=clamp(o.v||0),col=o.col||'var(--rx)';
  let s=`<rect x="${f1(x)}" y="${f1(y+h*.38)}" width="${f1(w)}" height="${f1(h*.62)}" rx="5" style="fill:var(--panel-2);stroke:var(--device);stroke-width:1.3"/>`;
  const bx=x+w*.08,by=y+h*.08,bw=w*.7,bh=h*.26;
  s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="2" style="fill:var(--panel);stroke:var(--device);stroke-width:1.1"/>`;
  const px=bx+bw*(.1+.75*v);s+=`<rect x="${f1(px)}" y="${f1(by+1)}" width="${f1(bx+bw-px-1)}" height="${f1(bh-2)}" style="fill:${col};opacity:.5"/><line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(by)}" y2="${f1(by+bh)}" style="stroke:var(--ink);stroke-width:1.8"/><line x1="${f1(x+w*.02)}" x2="${f1(px)}" y1="${f1(by+bh/2)}" y2="${f1(by+bh/2)}" style="stroke:var(--device);stroke-width:1.6"/>`;
  s+=`<path d="M${f1(bx+bw)} ${f1(by+bh/2)}h${f1(w*.12)}" style="stroke:var(--device);stroke-width:1.6"/>`;
  const sx=x+w*.1,sy=y+h*.5,sw=w*.55,sh=h*.36;s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(sw)}" height="${f1(sh)}" rx="2" style="fill:var(--cell);stroke:var(--line)"/>`;
  if(o.txt)s+=`<text x="${f1(sx+sw/2)}" y="${f1(sy+sh/2+3)}" class="t-mid" style="font:600 ${f1(Math.min(9,sh*.5))}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  s+=`<circle cx="${f1(x+w*.82)}" cy="${f1(sy+sh/2)}" r="${f1(Math.min(3.4,h*.08))}" style="fill:${o.on?'var(--good)':'var(--line)'}"/>`;
  const out=[bx+bw+w*.12,by+bh/2];if(o.to)s+=`<path d="M${f1(out[0])} ${f1(out[1])}C${f1(out[0]+20)} ${f1(out[1])} ${f1(o.to[0])} ${f1(o.to[1]+16)} ${f1(o.to[0])} ${f1(o.to[1])}" style="fill:none;stroke:var(--device);stroke-width:1.3"/>`;
  return {svg:s,out}}
function thermometer(x,y,h,v,o={}){const w=o.w||8,col=o.col||'var(--fever)',br=w*.95,tb=y+h-br*1.4,u=clamp(v);
  let s=`<rect x="${f1(x-w/2)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h-br)}" rx="${f1(w/2)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2"/><circle cx="${f1(x)}" cy="${f1(y+h-br)}" r="${f1(br)}" style="fill:${col};stroke:var(--muted);stroke-width:1.2"/>`;
  const top=lerp(tb,y+w*.4,u);s+=`<rect x="${f1(x-w*.22)}" y="${f1(top)}" width="${f1(w*.44)}" height="${f1(y+h-br-top)}" style="fill:${col}"/>`;
  for(let i=1;i<5;i++){const ty=lerp(tb,y+w*.4,i/5);s+=`<line x1="${f1(x+w/2)}" x2="${f1(x+w/2+3)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--muted);stroke-width:1"/>`}
  if(o.label)s+=`<text x="${f1(x)}" y="${f1(y+h+12)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function clock(cx,cy,r,min,o={}){const full=o.full||60,u=clamp(min/full),col=o.col||'var(--brand)',A=v=>(v*360-90)*Math.PI/180,n=o.ticks||12;
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
  if(u>0){const a=A(u),large=u>.5?1:0;s+=u>=.999?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r-3)}" style="fill:${col};opacity:.22"/>`:`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-r+3)}A${f1(r-3)} ${f1(r-3)} 0 ${large} 1 ${f1(cx+(r-3)*Math.cos(a))} ${f1(cy+(r-3)*Math.sin(a))}Z" style="fill:${col};opacity:.22"/>`}
  for(let i=0;i<n;i++){const a=A(i/n);s+=`<line x1="${f1(cx+Math.cos(a)*r*.8)}" y1="${f1(cy+Math.sin(a)*r*.8)}" x2="${f1(cx+Math.cos(a)*r*.93)}" y2="${f1(cy+Math.sin(a)*r*.93)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  (o.marks||[]).forEach(m=>{const a=A(clamp(m.min/full));s+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(cy+Math.sin(a)*r)}" r="${f1(Math.max(3,r*.1))}" style="fill:${m.col||col};stroke:var(--panel);stroke-width:1.5"/>`;
    if(m.label)s+=`<text x="${f1(cx+Math.cos(a)*(r+12))}" y="${f1(cy+Math.sin(a)*(r+12)+3)}" class="t-xs t-mid">${m.label}</text>`});
  const mA=A((min%60)/60),hA=A((((o.h0||0)*60+min)/60%12)/12);
  s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(hA)*r*.5)}" y2="${f1(cy+Math.sin(hA)*r*.5)}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(mA)*r*.78)}" y2="${f1(cy+Math.sin(mA)*r*.78)}" style="stroke:${col};stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
/* monotone cubic interpolation (Fritsch-Carlson) through sorted points */
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function tcurve(x,y,w,h,pts,o={}){const P=pts.slice().sort((a,b)=>a[0]-b[0]),lg=!!o.log,tv=v=>lg?Math.log10(Math.max(v,1e-9)):v;
  const x0=o.x0==null?P[0][0]:o.x0,x1=o.x1==null?P[P.length-1][0]:o.x1,ys=P.map(p=>p[1]);
  const y0=tv(o.y0==null?Math.min(...ys):o.y0),y1=tv(o.y1==null?Math.max(...ys):o.y1),g=monoFn(P.map(p=>[p[0],tv(p[1])]));
  const C=curve(x,y,w,h,g,{x0,x1,y0,y1,upto:o.upto,col:o.col||'var(--lactate)',fill:o.fill,dot:o.dot,dash:o.dash,lw:o.lw});let s=C.svg;
  if(o.ref!=null){const yy=C.Y(tv(o.ref));s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 4"/>${o.refLabel?`<text x="${f1(x+w-4)}" y="${f1(yy-5)}" class="t-xs t-end" style="fill:var(--bad)">${o.refLabel}</text>`:''}`}
  return {svg:s,X:C.X,Y:v=>C.Y(tv(v)),at:C.at,f:v=>lg?Math.pow(10,g(v)):g(v)}}
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
