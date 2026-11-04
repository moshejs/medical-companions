(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('aud:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('aud:'+k,JSON.stringify(v))}catch(e){}}};
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), ramp=(x,a,b)=>clamp((x-a)/(b-a));
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const bump=(x,a,b)=>Math.sin(Math.PI*ramp(x,a,b));
const f1=n=>(+n).toFixed(1);
function animate(dur,step,done){
  if(RM){step(1);done&&done();return()=>{}}
  let s=null,id;const f=ts=>{if(s==null)s=ts;const p=Math.min(1,(ts-s)/dur);step(p);if(p<1)id=requestAnimationFrame(f);else done&&done()};
  id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id);
}
/* polyline path from function over [0,1] */
function pathFn(fn,x0,x1,y0,y1,N=120){let d='';for(let i=0;i<=N;i++){const u=i/N,v=clamp(fn(u),-.05,1.05);d+=(i?'L':'M')+f1(lerp(x0,x1,u))+' '+f1(lerp(y0,y1,v))}return d}
/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Everything here is schematic:
   no glyph encodes a measured value unless the caller passes one in, and the kit holds no clinical
   numbers (no elimination rate, no r-factor, no score bands): callers pass them in from the research,
   with the citation in the surrounding text. No glyph draws a drink as attractive; a drink is only
   ever a neutral measuring beaker or grams of ethanol.
   synapse(x,y,s,o)           a synapse: presynaptic terminal above, the cleft, the postsynaptic
                              membrane below with GABA-A receptors (calm blue) on the left and NMDA
                              glutamate receptors (ember-red) on the right. s = scale (1 = 130 wide,
                              about 110 tall). o: {gaba (number of GABA-A receptors drawn, 0..6, default 3),
                              nmda (0..6, default 3), gt (0..1 GABA released, blue dots), gl (0..1 glutamate
                              released, red dots), eth (0..1 ethanol in the cleft, amber diamonds), cl (0..1
                              chloride flowing in through GABA-A: calming), ca (0..1 calcium/sodium flowing in
                              through NMDA: excitation), spark (0..1 over-excitation sparks in the cell below),
                              block (0..1 NMDA channels plugged, as ethanol does acutely), label, seed}.
   balance(x,y,w,o)           a balance beam on a fulcrum at (x,y) (the fulcrum's top), beam w wide.
                              o: {tilt (-1..1; + = the RIGHT pan sinks), left/right (pan labels, default
                              'GABA'/'glutamate'), lsub/rsub (small second lines, e.g. 'calming'),
                              lcol/rcol (default var(--gaba-fill)/var(--glu-fill)), ln/rn (0..6 weights in
                              each pan)}. Returns {svg, L:[x,y], R:[x,y]} (the pans' centres).
   brain(x,y,s,o)             a side-view brain, front to the LEFT, centred on (x,y); s = scale (1 = 160
                              wide, about 120 tall with the brainstem). o: {hl:{pfc,stri,amyg,thal,mb,hippo,
                              cbl: 0..1 glow}, labels (true: region names with leader lines), only (array of
                              region keys to label)}. pfc prefrontal cortex, stri striatum / nucleus
                              accumbens, amyg extended amygdala, thal thalamus, mb mammillary bodies,
                              hippo hippocampus, cbl cerebellum. Returns {svg, at:{key:[x,y]}}.
   liver(x,y,s,o)             a liver centred on (x,y), large right lobe on the viewer's LEFT; s = scale
                              (1 = about 170 wide, 100 tall). o: {stage (0..4, continuous: 0 healthy, 1 fat
                              droplets (steatosis), 2 inflammation dots (steatohepatitis), 3 fibrosis strands,
                              4 nodules and a shrunken bumpy outline (cirrhosis); fractional values blend in),
                              label, seed}. Returns {svg, at:[x,y]}.
   pathway(x,y,w,o)           alcohol metabolism in a liver cell, left to right: ethanol -(ADH)-> acetaldehyde
                              -(ALDH)-> acetate, each a pool whose size follows o.eth, o.acet, o.ace (0..1);
                              o.block (0..1: ALDH blocked, as by disulfiram, or slow, as with ALDH2*2: a red
                              cross on that arrow), o.nadh (0..1: an NADH build-up bar under it), o.small (no
                              enzyme names). About 64 tall. Returns {svg, at:{eth,acet,ace}}.
   curve(x,y,w,h,f,o)         a plotted time course f(x) in the box, with axes. o: {x0,x1 (domain, default
                              0..1), y0,y1 (range, default 0..1), upto (draw to this x, default x1), col
                              (var(--eth-fill)), fill (true: a soft area under the line), bands ([{from,to,
                              col,label}] horizontal shaded bands in y units, from the caller's cited
                              source), dot (true), lw (2.6), dash}. Returns {svg, X(xv)->px, Y(yv)->px,
                              at(xv)->[px,py]}.
   bacSeries(o)               a blood-alcohol time course for teaching (Widmark style: one compartment,
                              first-order absorption, zero-order elimination). o: {doses [[hour, grams of
                              ethanol],...], kg (body weight), r (distribution factor), beta (elimination,
                              g/dL per hour), ka (absorption rate per hour)}. ALL are required: the kit has no
                              defaults, the caller passes published values and cites them. Returns f(hour) ->
                              BAC in g/dL (never below 0). It is a teaching curve, never a statement that
                              anyone is safe to drive.
   bodymap(x,y,s,o)           a front-view body outline (head and trunk) with organs: brain, mouth (mouth and
                              throat), oeso (oesophagus), breast, heart, liver, stomach, panc (pancreas), bowel.
                              s = scale (1 = about 120 wide, 250 tall, (x,y) the top of the head). o: {hl:
                              {organ: 0..1 glow}, col ({organ: colour} for the glow; default var(--glu-fill)),
                              labels (true or an array of organ keys)}. Returns {svg, at:{organ:[x,y]}}.
   person(x,y,s,fill,o)       a person pictogram for icon arrays (s = height, (x,y) the top), fill a CSS
                              colour; o.op.
   symptoms(x,y,s,o)          withdrawal signs drawn around a person() of height s at (x,y): o {tremor (0..1:
                              shake lines at the hands), sweat (0..1: drops by the head), conf (0..1: a
                              confusion swirl above the head), seize (0..1: radiating alert lines), hr (a
                              heart-rate number shown in a small badge, or null)}. Schematic signs only.
   mol(x,y,kind,o)            one molecule as a small coloured mark: kind 'eth' ethanol (amber diamond), 'acet'
                              acetaldehyde, 'gaba', 'glu', 'thi' thiamine, 'da' dopamine, 'opi' endorphin; o.r
                              (radius, 5), o.op, o.txt (true: a 1-3 letter symbol beside it).
   tank(x,y,w,h,level,o)      a store drawn as a tank filled to level (0..1), e.g. the body's thiamine. o: {col
                              (var(--thi-fill)), label, sub, inflow (0..1 arrow in at the top), outflow (0..1
                              arrow out at the bottom), low (0..1: below this the fill turns warning red)}.
   gauge(cx,cy,r,v,max,o)     a half-dial score gauge (0 at the left, max at the right) with a needle at v.
                              o: {bands ([{to, col, label}] from the caller's cited source; none by default),
                              label (under the number), big (true: the score as a large number)}.
   beaker(x,y,w,h,level,o)    a neutral laboratory measuring beaker (never a drinking glass) filled to level
                              (0..1) in amber, for standard-drink sums; o: {label, ticks (number of scale
                              marks, 4)}.
   pill(x,y,s,o)              a tablet centred at (x,y), s = length; o: {ang (degrees), col (var(--rx)),
                              txt (a short label printed on it), round (true: a round tablet)}.
   ladder(x,y,w,h,steps,o)    rising stairs from bottom-left, one step per label (levels of care, a
                              decision path). o: {at (index highlighted), col (var(--rx)), done (steps before
                              at drawn as done)}. Returns {svg, top(i)->[x,y]}.
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big (ticks
                              above)}. Returns {svg, X(v)->x}.
   ped(x,y,sex,aff,o)         a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected
                              (alcohol use disorder), .5 half shaded (another substance use disorder);
                              o: {dead, proband, r}. Needs marker('pedArrow') in <defs> for a proband.
   marker(id,color)           an arrowhead <marker> for <defs>. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function synapse(x,y,s=1,o={}){const rr=rng(o.seed||11),ng=Math.round(clamp(o.gaba==null?3:o.gaba,0,6)),nn=Math.round(clamp(o.nmda==null?3:o.nmda,0,6));
  const gt=clamp(o.gt||0),gl=clamp(o.gl||0),eth=clamp(o.eth||0),cl=clamp(o.cl||0),ca=clamp(o.ca||0),sp=clamp(o.spark||0),bl=clamp(o.block||0);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  /* presynaptic terminal with vesicles: blue (GABA) on the left, red (glutamate) on the right */
  g+=`<path d="M-44 -66V-30C-44 -10 -24 -2 0 -2S44 -10 44 -30V-66" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<6;i++){const vx=-30+i*12,vy=-30+(i%2)*9,c=i<3?'var(--gaba-fill)':'var(--glu-fill)';g+=`<circle cx="${vx}" cy="${vy}" r="5" style="fill:none;stroke:${c};stroke-width:1.2"/><circle cx="${vx}" cy="${vy}" r="2" style="fill:${c}"/>`}
  /* postsynaptic membrane */
  g+=`<path d="M-62 14Q0 6 62 14V40H-62Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<ng;i++){const cx=-10-i*9;g+=`<rect x="${f1(cx-3.5)}" y="5" width="7" height="13" rx="2.5" style="fill:var(--gaba-fill)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="7" y2="16" style="stroke:var(--cell);stroke-width:1.4"/>`;
    if(cl>0)g+=`<path d="M${f1(cx)} 20v${f1(6+cl*10)}" style="stroke:var(--gaba);stroke-width:1.4;opacity:${f1(.3+cl*.7)}" marker-end="url(#synA)"/>`}
  for(let i=0;i<nn;i++){const cx=10+i*9;g+=`<rect x="${f1(cx-3.5)}" y="5" width="7" height="13" rx="1" style="fill:var(--glu-fill)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="7" y2="16" style="stroke:var(--cell);stroke-width:1.4"/>`;
    if(bl>0)g+=`<circle cx="${f1(cx)}" cy="8" r="${f1(1.5+bl*2)}" style="fill:var(--eth-fill);opacity:${f1(.4+bl*.6)}"/>`;
    if(ca>0)g+=`<path d="M${f1(cx)} 20v${f1(6+ca*10)}" style="stroke:var(--glu);stroke-width:1.4;opacity:${f1(.3+ca*.7)}" marker-end="url(#synB)"/>`}
  g+=`<defs>${marker('synA','var(--gaba)')}${marker('synB','var(--glu)')}</defs>`;
  /* transmitter and ethanol in the cleft */
  const dots=(n,c,xa,xb)=>{let t='';for(let i=0;i<n;i++)t+=`<circle cx="${f1(lerp(xa,xb,rr()))}" cy="${f1(-1+rr()*8)}" r="1.9" style="fill:${c}"/>`;return t};
  g+=dots(Math.round(gt*10),'var(--gaba-fill)',-54,-4)+dots(Math.round(gl*10),'var(--glu-fill)',4,54);
  for(let i=0;i<Math.round(eth*12);i++){const ex=lerp(-56,56,rr()),ey=-2+rr()*9;g+=`<path d="M${f1(ex)} ${f1(ey-2.6)}l2.6 2.6l-2.6 2.6l-2.6-2.6Z" style="fill:var(--eth-fill)"/>`}
  /* over-excitation sparks inside the postsynaptic cell */
  for(let i=0;i<Math.round(sp*7);i++){const sx=lerp(-50,50,rr()),sy=26+rr()*10,a=rr()*6;g+=`<path d="M${f1(sx-3)} ${f1(sy)}l3 -4l1 4l3 -4" style="fill:none;stroke:var(--glu);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;transform-origin:${f1(sx)}px ${f1(sy)}px;transform:rotate(${f1(a*15)}deg)"/>`}
  if(o.label)g+=`<text x="0" y="56" class="t-xs t-mid">${o.label}</text>`;
  return g+'</g>'}
function balance(x,y,w,o={}){const t=clamp(o.tilt||0,-1,1),a=t*14*Math.PI/180,hw=w/2,L=[x-hw*Math.cos(a),y-hw*Math.sin(a)],R=[x+hw*Math.cos(a),y+hw*Math.sin(a)];
  const lc=o.lcol||'var(--gaba-fill)',rc=o.rcol||'var(--glu-fill)';
  let s=`<path d="M${f1(x)} ${f1(y)}l-14 30h28Z" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.4"/>`;
  s+=`<line x1="${f1(L[0])}" y1="${f1(L[1])}" x2="${f1(R[0])}" y2="${f1(R[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:var(--ink)"/>`;
  const pan=(P,c,n,lab,sub)=>{const px=P[0],py=P[1]+22;let p=`<line x1="${f1(P[0])}" y1="${f1(P[1])}" x2="${f1(px-16)}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:1"/><line x1="${f1(P[0])}" y1="${f1(P[1])}" x2="${f1(px+16)}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:1"/>`;
    p+=`<path d="M${f1(px-22)} ${f1(py)}h44q-4 9 -22 9t-22 -9Z" style="fill:${c};opacity:.85"/>`;
    for(let i=0;i<Math.round(clamp(n||0,0,6));i++){const bx=px-12+(i%3)*12,by=py-5-Math.floor(i/3)*9;p+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="4.5" style="fill:${c};stroke:var(--panel);stroke-width:1.2"/>`}
    if(lab)p+=`<text x="${f1(px)}" y="${f1(py+24)}" class="t-lbl t-mid">${lab}</text>`;
    if(sub)p+=`<text x="${f1(px)}" y="${f1(py+38)}" class="t-xs t-mid">${sub}</text>`;return p};
  s+=pan(L,lc,o.ln,o.left==null?'GABA':o.left,o.lsub)+pan(R,rc,o.rn,o.right==null?'glutamate':o.right,o.rsub);
  return {svg:s,L,R}}
function brain(x,y,s=1,o={}){const hl=o.hl||{},P=(a,b)=>[x+a*s,y+b*s];
  const A={pfc:P(-50,-16),stri:P(-22,0),thal:P(2,-6),mb:P(-8,14),amyg:P(-18,24),hippo:P(14,20),cbl:P(50,36)};
  const COL={pfc:'var(--pfc)',stri:'var(--stri)',thal:'var(--thal)',mb:'var(--mb)',amyg:'var(--amyg)',hippo:'var(--nt)',cbl:'var(--cbl)'};
  const NM={pfc:'Prefrontal cortex',stri:'Striatum',thal:'Thalamus',mb:'Mammillary bodies',amyg:'Extended amygdala',hippo:'Hippocampus',cbl:'Cerebellum'};
  const sw=v=>f1(v/s);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M22 34C26 44 26 54 30 62L40 62C36 52 36 42 34 32Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.4)}"/>`;
  g+=`<ellipse cx="50" cy="36" rx="20" ry="12" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.4)}"/>`;
  g+=`<path d="M-72 6C-80 -20 -62 -48 -30 -54C-8 -60 20 -58 42 -48C66 -38 80 -16 76 6C74 22 62 30 48 30C40 40 24 42 14 36C2 44 -20 44 -32 36C-50 38 -68 28 -72 6Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.6)}"/>`;
  ['M-58 -24C-46 -34 -34 -30 -26 -40','M-20 -44C-6 -36 6 -46 20 -40','M28 -36C40 -26 54 -32 62 -18','M-62 4C-50 -4 -40 6 -30 -2','M40 -10C50 0 62 -6 70 6','M-4 -22C8 -14 20 -24 32 -14','M38 32C46 30 54 34 62 32','M36 38C46 38 54 42 64 39'].forEach(d=>{g+=`<path d="${d}" style="fill:none;stroke:var(--brain-line);stroke-width:${sw(1.1)};opacity:.55;stroke-linecap:round"/>`});
  g+='</g>';
  const R0={pfc:17,stri:10,thal:9,mb:5,amyg:7,hippo:9,cbl:11};
  for(const k of Object.keys(A)){const v=clamp(hl[k]||0),[cx,cy]=A[k],r=R0[k]*s;
    if(v>0)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*(1+v*.8))}" style="fill:${COL[k]};opacity:${f1(.1+v*.25)}"/>`;
    if(v>0||o.labels)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.55)}" style="fill:${COL[k]};opacity:${f1(.35+v*.6)}"/>`}
  if(o.labels){const L={pfc:[-46,-74],stri:[-6,-74],thal:[40,-68],mb:[-72,58],amyg:[-24,70],hippo:[30,66],cbl:[76,70]},only=o.only||Object.keys(A);
    for(const k of only){const [cx,cy]=A[k],lx=x+L[k][0]*s,ly=y+L[k][1]*s,dn=ly>cy;
      g+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(lx)}" y2="${f1(ly+(dn?-10:4))}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly)}" class="t-xs t-mid">${NM[k]}</text>`}}
  return {svg:g,at:A}}
const LIVER=[[-80,-8],[-74,-34],[-50,-47],[-12,-50],[30,-46],[64,-38],[86,-28],[90,-16],[74,-6],[44,8],[12,26],[-20,44],[-48,48],[-68,36],[-80,14]];
function liver(x,y,s=1,o={}){const st=clamp(o.stage||0,0,4),rr=rng(o.seed||5);
  const shrink=1-ramp(st,3,4)*.12,wob=ramp(st,3,4);
  const pts=LIVER.map(([a,b],i)=>{const k=shrink*(1+wob*.05*Math.sin(i*2.7));return [x+a*s*k,y+b*s*k]});
  let g=`<path d="${smoothPath(pts)}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:2"/>`;
  /* falciform ligament line between the lobes */
  g+=`<path d="M${f1(x+18*s*shrink)} ${f1(y-46*s*shrink)}Q${f1(x+10*s*shrink)} ${f1(y-14*s*shrink)} ${f1(x+4*s*shrink)} ${f1(y+18*s*shrink)}" style="fill:none;stroke:var(--liver);stroke-width:1.2;opacity:.6"/>`;
  const inside=[];let tries=0;while(inside.length<60&&tries<800){tries++;const p=[x+(rr()*170-82)*s*shrink,y+(rr()*96-50)*s*shrink];if(inPoly(p,pts.map(([a,b])=>[x+(a-x)*.86,y+(b-y)*.86])))inside.push(p)}
  const fat=ramp(st,0,1)*(1-ramp(st,3.4,4)*.5),inf=ramp(st,1,2)*(1-ramp(st,3,4)*.4),fib=ramp(st,2,3),nod=ramp(st,3,4);
  inside.slice(0,Math.round(fat*26)).forEach((p,i)=>{g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1((2.5+(i%3)*1.4)*s)}" style="fill:var(--fat);stroke:var(--panel);stroke-width:.8"/>`});
  inside.slice(26,26+Math.round(inf*16)).forEach(p=>{g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(1.8*s)}" style="fill:var(--glu-fill)"/>`});
  if(fib>0)inside.slice(42,42+Math.round(fib*12)).forEach((p,i)=>{const q=inside[(i*7+3)%inside.length];g+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1((p[0]+q[0])/2+8*s)} ${f1((p[1]+q[1])/2-6*s)} ${f1(lerp(p[0],q[0],.6))} ${f1(lerp(p[1],q[1],.6))}" style="fill:none;stroke:var(--fib);stroke-width:${f1(1.3*s)};opacity:${f1(.3+fib*.6)};stroke-linecap:round"/>`});
  if(nod>0)inside.slice(0,Math.round(nod*22)).forEach(p=>{g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(6.5*s)}" style="fill:none;stroke:var(--liver);stroke-width:${f1(1.4*s)};opacity:${f1(.35+nod*.5)}"/>`});
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+66*s)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:g,at:[x,y]}}
function pathway(x,y,w,o={}){const e=clamp(o.eth==null?.6:o.eth),c=clamp(o.acet==null?.3:o.acet),a=clamp(o.ace==null?.3:o.ace),bl=clamp(o.block||0);
  const X=[x+w*.12,x+w*.5,x+w*.88],cy=y+24,at={eth:[X[0],cy],acet:[X[1],cy],ace:[X[2],cy]};
  const pool=(px,v,col,name,sub)=>`<circle cx="${f1(px)}" cy="${f1(cy)}" r="${f1(7+v*15)}" style="fill:${col};opacity:.8"/><text x="${f1(px)}" y="${f1(cy+38)}" class="t-lbl t-mid">${name}</text>${sub?`<text x="${f1(px)}" y="${f1(cy+51)}" class="t-xs t-mid">${sub}</text>`:''}`;
  let s=`<defs>${marker('pwA','var(--muted)')}</defs>`;
  s+=pool(X[0],e,'var(--eth-fill)','ethanol')+pool(X[1],c,'var(--acet)','acetaldehyde')+pool(X[2],a,'var(--thi-fill)','acetate');
  const arr=(x0,x1,lab,bk)=>{let t=`<line x1="${f1(x0+24)}" y1="${f1(cy)}" x2="${f1(x1-26)}" y2="${f1(cy)}" class="arrow" marker-end="url(#pwA)"/>`;
    if(!o.small)t+=`<text x="${f1((x0+x1)/2)}" y="${f1(cy-8)}" class="t-sm t-mid">${lab}</text>`;
    if(bk>0){const mx=(x0+x1)/2,r=6+bk*2;t+=`<path d="M${f1(mx-r)} ${f1(cy-r)}L${f1(mx+r)} ${f1(cy+r)}M${f1(mx+r)} ${f1(cy-r)}L${f1(mx-r)} ${f1(cy+r)}" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round;opacity:${f1(.4+bk*.6)}"/>`}return t};
  s+=arr(X[0],X[1],'ADH',0)+arr(X[1],X[2],'ALDH',bl);
  if(o.nadh!=null){const n=clamp(o.nadh),bw=w*.6,bx=x+w*.2,by=y+82;s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw*n)}" height="7" rx="3.5" style="fill:var(--gaba-fill)"/><text x="${f1(bx-6)}" y="${f1(by+7)}" class="t-xs t-end">NADH</text>`}
  return {svg:s,at}}
function curve(x,y,w,h,f,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1,up=o.upto==null?x1:clamp(o.upto,x0,x1),col=o.col||'var(--eth-fill)';
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
function bacSeries(o){const need=['doses','kg','r','beta','ka'];need.forEach(k=>{if(o[k]==null)throw new Error('bacSeries needs '+k)});
  const D=o.doses.slice().sort((a,b)=>a[0]-b[0]),vd=o.r*o.kg*10;/* grams per (g/dL) */
  return h=>{/* integrate in small steps: absorbed amount minus zero-order elimination, floored at 0 */
    let bac=0,last=0;const dt=1/60;for(let t=0;t<=h+1e-9;t+=dt){let inc=0;D.forEach(([t0,g])=>{if(t>=t0)inc+=g*o.ka*Math.exp(-o.ka*(t-t0))*dt});bac=Math.max(0,bac+inc/vd-(bac>0||inc>0?o.beta*dt:0));last=bac}
    return last}}
function bodymap(x,y,s=1,o={}){const hl=o.hl||{},P=(a,b)=>[x+a*s,y+b*s];
  const A={brain:P(0,22),mouth:P(0,48),oeso:P(0,92),breast:P(-26,112),heart:P(8,118),liver:P(-18,150),stomach:P(18,150),panc:P(6,168),bowel:P(0,200)};
  const NM={brain:'Brain',mouth:'Mouth & throat',oeso:'Oesophagus',breast:'Breast',heart:'Heart',liver:'Liver',stomach:'Stomach',panc:'Pancreas',bowel:'Bowel'};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="stroke-width:${f1(1.6/s)}">`;
  g+=`<ellipse cx="0" cy="26" rx="22" ry="26" style="fill:var(--skin);stroke:var(--brain-line)"/>`;
  g+=`<path d="M-9 50V62H9V50" style="fill:var(--skin);stroke:var(--brain-line)"/>`;
  g+=`<path d="M-9 62C-30 64 -50 70 -54 86L-58 150C-58 160 -52 160 -50 150L-46 100L-44 200C-44 222 -24 236 0 236C24 236 44 222 44 200L46 100L50 150C52 160 58 160 58 150L54 86C50 70 30 64 9 62Z" style="fill:var(--skin);stroke:var(--brain-line);opacity:.9"/>`;
  /* organs, faint until highlighted */
  const org={brain:`<ellipse cx="0" cy="22" rx="15" ry="13"/>`,mouth:`<path d="M-6 44Q0 48 6 44V56H-6Z"/>`,oeso:`<rect x="-2.5" y="62" width="5" height="70" rx="2.5"/>`,
    breast:`<path d="M-38 104A10 9 0 0 0 -18 114M18 114A10 9 0 0 0 38 104"/>`,heart:`<path d="M8 128C-6 120 -4 106 4 108C6 104 14 104 16 110C22 112 20 122 8 128Z"/>`,
    liver:`<path d="M-40 138C-40 130 -20 130 2 134C6 136 4 142 -2 146C-14 156 -30 166 -38 158Z"/>`,stomach:`<path d="M8 138C18 134 32 138 32 150C32 164 18 168 10 160C14 152 8 148 8 138Z"/>`,
    panc:`<path d="M-8 168Q6 162 28 166Q24 172 -6 172Z"/>`,bowel:`<path d="M-26 182C-26 176 26 176 26 182V214C26 222 -26 222 -26 214Z"/>`};
  for(const k of Object.keys(org)){const v=clamp(hl[k]||0),c=(o.col&&o.col[k])||'var(--glu-fill)',sh=org[k].replace('/>',` style="fill:${v>0?c:'var(--panel-2)'};stroke:${k==='breast'?(v>0?c:'var(--brain-line)'):'var(--brain-line)'};${k==='breast'?'fill:none;':''}opacity:${f1(v>0?.45+v*.55:.55)}"/>`);g+=sh}
  g+='</g>';
  if(o.labels){const ks=Array.isArray(o.labels)?o.labels:Object.keys(A);const RT={brain:1,mouth:1,oeso:1,heart:1,stomach:1,panc:1,bowel:0,liver:0,breast:0};
    ks.forEach((k,i)=>{const [ax,ay]=A[k],r=RT[k],lx=x+(r?76:-76)*s,ly=ay;g+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(lx+(r?-4:4))}" y2="${f1(ly)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly+3.5)}" class="t-xs${r?'':' t-end'}">${NM[k]}</text>`})}
  return {svg:g,at:A}}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function symptoms(x,y,s,o={}){const tr=clamp(o.tremor||0),sw=clamp(o.sweat||0),cf=clamp(o.conf||0),sz=clamp(o.seize||0);let g='';
  if(tr>0)[-1,1].forEach(d=>{const hx=x+d*s*.36,hy=y+s*.7;for(let i=0;i<2;i++)g+=`<path d="M${f1(hx+d*(4+i*4))} ${f1(hy-5)}l${f1(d*2)} 3l${f1(-d*2)} 3l${f1(d*2)} 3" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1(tr*(1-i*.4))};stroke-linecap:round"/>`});
  if(sw>0)for(let i=0;i<Math.round(sw*3);i++){const dx=x+(i%2?1:-1)*s*(.24+i*.05),dy=y+s*(.08+i*.07);g+=`<path d="M${f1(dx)} ${f1(dy)}q2.4 3.6 0 5.2q-2.4 -1.6 0 -5.2Z" style="fill:var(--gaba-fill)"/>`}
  if(cf>0){const cx=x,cy=y-s*.18;g+=`<path d="M${f1(cx)} ${f1(cy)}m-6 0a6 4 0 1 1 6 4a3.5 2.5 0 1 1 -3 -2" style="fill:none;stroke:var(--dx);stroke-width:1.4;opacity:${f1(cf)}"/>`}
  if(sz>0)for(let i=0;i<8;i++){const a=i/8*2*Math.PI,r0=s*.62,r1=r0+4+sz*7,cx=x,cy=y+s*.5;g+=`<line x1="${f1(cx+r0*Math.cos(a))}" y1="${f1(cy+r0*Math.sin(a))}" x2="${f1(cx+r1*Math.cos(a))}" y2="${f1(cy+r1*Math.sin(a))}" style="stroke:var(--bad);stroke-width:1.6;opacity:${f1(sz)};stroke-linecap:round"/>`}
  if(o.hr!=null){const bx=x+s*.5,by=y+s*.1;g+=`<rect x="${f1(bx)}" y="${f1(by-10)}" width="40" height="15" rx="7.5" style="fill:var(--panel);stroke:var(--line)"/><text x="${f1(bx+20)}" y="${f1(by+1)}" class="t-xs t-mid" style="fill:var(--ink)">♥ ${o.hr}</text>`}
  return g}
function mol(x,y,kind='eth',o={}){const r=o.r||5,C={eth:'var(--eth-fill)',acet:'var(--acet)',gaba:'var(--gaba-fill)',glu:'var(--glu-fill)',thi:'var(--thi-fill)',da:'var(--nt)',opi:'var(--stri)'},T={eth:'EtOH',acet:'AcH',gaba:'GABA',glu:'Glu',thi:'B1',da:'DA',opi:'End'};
  const c=C[kind]||'var(--muted)';let g=`<g style="opacity:${o.op==null?1:o.op}">`;
  g+=kind==='eth'||kind==='acet'?`<path d="M${f1(x)} ${f1(y-r)}l${f1(r)} ${f1(r)}l${f1(-r)} ${f1(r)}l${f1(-r)} ${f1(-r)}Z" style="fill:${c}"/>`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${c}"/>`;
  if(o.txt)g+=`<text x="${f1(x+r+3)}" y="${f1(y+3.5)}" class="t-xs">${T[kind]||kind}</text>`;
  return g+'</g>'}
function tank(x,y,w,h,level,o={}){const lv=clamp(level),low=o.low==null?-1:o.low,col=lv<low?'var(--bad)':(o.col||'var(--thi-fill)'),fy=y+h*(1-lv);
  let s=`<defs>${marker('tkA','var(--muted)')}</defs><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.6"/>`;
  if(lv>0)s+=`<clipPath id="tk${Math.round(x)}_${Math.round(y)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10"/></clipPath><rect x="${f1(x)}" y="${f1(fy)}" width="${f1(w)}" height="${f1(y+h-fy)}" clip-path="url(#tk${Math.round(x)}_${Math.round(y)})" style="fill:${col};opacity:.8"/>`;
  for(let i=1;i<4;i++)s+=`<line x1="${f1(x+w-10)}" x2="${f1(x+w)}" y1="${f1(y+h*i/4)}" y2="${f1(y+h*i/4)}" class="axis"/>`;
  if(o.inflow>0)s+=`<line x1="${f1(x+w/2)}" y1="${f1(y-26)}" x2="${f1(x+w/2)}" y2="${f1(y-4)}" style="stroke:var(--muted);stroke-width:${f1(1+o.inflow*3)}" marker-end="url(#tkA)"/>`;
  if(o.outflow>0)s+=`<line x1="${f1(x+w/2)}" y1="${f1(y+h+4)}" x2="${f1(x+w/2)}" y2="${f1(y+h+26)}" style="stroke:var(--muted);stroke-width:${f1(1+o.outflow*3)}" marker-end="url(#tkA)"/>`;
  if(o.label)s+=`<text x="${f1(x+w/2)}" y="${f1(y+h+(o.outflow>0?42:18))}" class="t-lbl t-mid">${o.label}</text>`;
  if(o.sub)s+=`<text x="${f1(x+w/2)}" y="${f1(y+h+(o.outflow>0?56:32))}" class="t-xs t-mid">${o.sub}</text>`;
  return s}
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  s+=`<text x="${f1(cx-r)}" y="${f1(cy+14)}" class="t-xs t-mid">0</text><text x="${f1(cx+r)}" y="${f1(cy+14)}" class="t-xs t-mid">${max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+16)}" class="t-sm t-mid">${o.label}</text>`;
  return s}
function beaker(x,y,w,h,level,o={}){const lv=clamp(level),fy=y+h*(1-lv),n=o.ticks||4;
  let s=`<path d="M${f1(x)} ${f1(y-4)}h${f1(w+6)}" style="stroke:var(--brain-line);stroke-width:1.6;stroke-linecap:round"/>`;
  if(lv>0)s+=`<rect x="${f1(x+1.5)}" y="${f1(fy)}" width="${f1(w-3)}" height="${f1(y+h-fy-1.5)}" rx="3" style="fill:var(--eth-fill);opacity:.55"/>`;
  s+=`<path d="M${f1(x)} ${f1(y-4)}V${f1(y+h-6)}Q${f1(x)} ${f1(y+h)} ${f1(x+6)} ${f1(y+h)}H${f1(x+w-6)}Q${f1(x+w)} ${f1(y+h)} ${f1(x+w)} ${f1(y+h-6)}V${f1(y-4)}" style="fill:none;stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=1;i<=n;i++){const ty=y+h-h*i/(n+1);s+=`<line x1="${f1(x)}" x2="${f1(x+w*.3)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--brain-line);stroke-width:1"/>`}
  if(o.label)s+=`<text x="${f1(x+w/2)}" y="${f1(y+h+16)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function pill(x,y,s=30,o={}){const col=o.col||'var(--rx)',r=s*.22;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(o.round)g+=`<circle r="${f1(s/2)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><line x1="${f1(-s*.3)}" x2="${f1(s*.3)}" y1="0" y2="0" style="stroke:${col};stroke-width:1.2;opacity:.6"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  if(o.txt)g+=`<text x="${o.round?0:f1(-s/4)}" y="${f1(r*.42)}" class="t-mid" style="font:700 ${f1(r*1.05)}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  return g+'</g>'}
function ladder(x,y,w,h,steps,o={}){const n=steps.length,sw=w/n,sh=h/n,at=o.at==null?-1:o.at,col=o.col||'var(--rx)';let s='';
  const top=i=>[x+sw*(i+.5),y+h-sh*(i+1)];
  steps.forEach((t,i)=>{const sx=x+sw*i,sy=y+h-sh*(i+1),on=i===at,done=o.done&&i<at;
    s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(sw-3)}" height="${f1(sh*(i+1))}" rx="6" style="fill:${on?col:done?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1.2;opacity:${on||done?1:.9}"/>`;
    s+=`<text x="${f1(sx+(sw-3)/2)}" y="${f1(sy+16)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${t}</text>`});
  return {svg:s,top}}
function tline(x,y,w,o={}){const mn=o.min||0,mx=o.max==null?1:o.max,st=o.step||(mx-mn)/5,fmt=o.fmt||(v=>v),X=v=>x+w*(v-mn)/(mx-mn);
  let s=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" class="axis"/>`;
  for(let v=mn;v<=mx+1e-9;v+=st){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y-4)}" y2="${f1(y+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(o.big?y-8:y+16)}" class="t-xs t-mid">${fmt(v)}</text>`}
  if(o.label)s+=`<text x="${f1(x+w)}" y="${f1(o.big?y+16:y+30)}" class="t-xs t-end">${o.label}</text>`;
  return {svg:s,X}}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--brand)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--ember);stroke:none;opacity:.85"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What alcohol use disorder is',g:1,n:'1.1',d:'How common it is, who it affects, and the words we use'},
 {id:'drinks',t:'Standard drinks, blood alcohol & metabolism',g:1,n:'1.2',d:'Grams per drink, the blood alcohol curve and how the liver clears alcohol'},
 {id:'brain',t:'Alcohol and the brain: reward, adaptation, craving',g:1,n:'1.3',d:'GABA and glutamate, tolerance, and the addiction cycle'},
 {id:'genes',t:'Genes, family & risk',g:1,n:'1.4',d:'Heritability, ADH1B and ALDH2, GWAS, and risk not destiny'},
 {id:'screening',t:'Screening: AUDIT, AUDIT-C & brief intervention',g:2,n:'2.1',d:'Asking about drinking, the AUDIT zones and SBIRT'},
 {id:'criteria',t:'Diagnosis: DSM-5-TR criteria & severity',g:2,n:'2.2',d:'The 11 criteria, mild to severe, and remission: a teaching counter'},
 {id:'biomarkers',t:'Blood and urine markers of drinking',g:2,n:'2.3',d:'PEth, EtG, CDT, GGT and MCV: what each can and cannot show'},
 {id:'withdrawal',t:'Alcohol withdrawal: the timeline',g:3,n:'3.1',d:'From tremor to delirium tremens, and why to get medical help'},
 {id:'ciwa',t:'CIWA-Ar: scoring withdrawal',g:3,n:'3.2',d:'The 10 items and how symptom-triggered care uses them'},
 {id:'detox',t:'Managing withdrawal safely',g:3,n:'3.3',d:'Where, with which medicines, and what comes next, as published'},
 {id:'wernicke',t:'Thiamine, Wernicke and Korsakoff',g:3,n:'3.4',d:'Why thiamine comes first, the triad and the Caine criteria'},
 {id:'medicines',t:'Approved medicines: naltrexone, acamprosate, disulfiram',g:4,n:'4.1',d:'How each works, the trials and the label points'},
 {id:'offlabel',t:'Other medicines: topiramate, gabapentin, baclofen and more',g:4,n:'4.2',d:'The evidence for medicines not approved for AUD in the US'},
 {id:'therapy',t:'Talking therapies and mutual help',g:4,n:'4.3',d:'Brief intervention, MI, CBT, contingency management, AA and SMART'},
 {id:'recovery',t:'Course, relapse and recovery',g:4,n:'4.4',d:'How drinking changes over the years, lapses, and levels of care'},
 {id:'liver',t:'The liver: fatty liver to cirrhosis',g:5,n:'5.1',d:'Steatosis, hepatitis, fibrosis and cirrhosis, and what stopping does'},
 {id:'body',t:'Alcohol and the whole body: cancer, heart, brain',g:5,n:'5.2',d:'Risks by amount, and the J-curve debate'},
 {id:'families',t:'Families, friends and everyday life',g:5,n:'5.3',d:'CRAFT, Al-Anon, language, work and support for families'},
 {id:'pregnancy',t:'Pregnancy and fetal alcohol spectrum disorders',g:5,n:'5.4',d:'Alcohol and the developing baby, FASD, and support in pregnancy'},
 {id:'nursing',t:'Nursing care in hospital',g:5,n:'5.5',d:'Screening, CIWA-Ar checks, thiamine, safety and linking to treatment'},
 {id:'frontier',t:'Research frontier: GLP-1, psilocybin and beyond',g:5,n:'5.6',d:'Treatments under study, each with an evidence label'},
 {id:'history',t:'A history of alcohol use disorder',g:6,n:'6.1',d:'From Rush and Huss to AA, DSM-5 and today’s medicines'},
 {id:'review',t:'Flashcards & memory aids',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the olive brand; 2 plum (--dx), 3 ember (--accent), 4 teal (--rx) */
const GROUPS={1:['Understanding AUD','g-und','c-und'],2:['Screening & diagnosis','g-dx','c-dx'],3:['Withdrawal & acute care','g-acute','c-acute'],4:['Treatment & recovery','g-rx','c-rx'],5:['Body, family & care','g-body','c-body'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('aud:tab');sessionStorage.setItem('aud:tab','1')}catch(e){}
(function buildNav(){
  let h='';
  for(const g of Object.keys(GROUPS).map(Number)){
    h+=`<div class="navgroup ${GROUPS[g][1]}"><h3>${GROUPS[g][0]}</h3><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{h+=`<li><a class="navbtn" href="${href(m.id)}" data-go="${m.id}"><span class="n">${m.n}</span><span>${m.t.replace('&','&amp;')}</span></a></li>`});
    h+='</ol></div>';
  }
  $('#navgroups').innerHTML=h;
  let u='';
  Object.keys(GROUPS).map(Number).forEach(g=>{
    u+=`<div class="unit"><p class="eyebrow">Part ${g}</p><h2>${GROUPS[g][0].replace('&','&amp;')}</h2><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{u+=`<li><button data-go="${m.id}"><span class="n">${m.n}</span><b>${m.t.replace('&','&amp;')}</b><small>${m.d}</small></button></li>`});
    u+='</ol></div>';
  });
  if($('#homeUnits'))$('#homeUnits').innerHTML=u;
  MODS.forEach((m,i)=>{
    const sec=$('#m-'+m.id);if(!sec)return;
    if(m.g)sec.classList.add(GROUPS[m.g][2]);
    if(m.id==='home')return;
    const p=MODS[i-1],n=MODS[i+1];
    const pg=document.createElement('div');pg.className='pager';
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>← Previous</small><span>${p.t.replace('&','&amp;')}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>Next →</small><span>${n.t.replace('&','&amp;')}</span></button>`:'');
    sec.appendChild(pg);
  });
})();
function show(id,keepScroll){
  if(!MODS.some(m=>m.id===id))id='home';
  if(PAGE&&id!==PAGE){
    /* boot asks first: for the #module of an old link, or for the module last read */
    if(cur){go(id);return}
    if(location.hash.slice(1)===id||(PAGE==='home'&&fresh)){go(id,'',true);return}
    id=PAGE;
  }
  const first=!cur;
  if(cur&&onHide[cur])onHide[cur]();
  $$('[data-mod]').forEach(s=>s.hidden=s.dataset.mod!==id);
  $$('.navbtn').forEach(b=>b.setAttribute('aria-current',b.dataset.go===id?'page':'false'));
  cur=id;
  if(inits[id]&&!inits[id].done){inits[id].done=true;inits[id]()}
  guardLive($('#m-'+id)||document);
  if(onShow[id])onShow[id]();
  store.set('last',id);
  if(!PAGE)try{history.replaceState(null,'','#'+id)}catch(e){}
  if(!keepScroll)window.scrollTo(0,0);
  const nb=$(`.navbtn[data-go="${id}"]`);
  if(nb&&matchMedia('(max-width:900px)').matches){const side=$('#side');side.scrollTo({left:nb.offsetLeft-side.clientWidth/2+nb.offsetWidth/2,behavior:RM?'auto':'smooth'})}
  if(first&&location.hash.startsWith('#src-'))flashSrc(location.hash.slice(5));
}
function flashSrc(k){const li=document.getElementById('src-'+k);if(li){li.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'});li.classList.add('flash');setTimeout(()=>li.classList.remove('flash'),2200)}}
document.addEventListener('click',e=>{
  const sk=e.target.closest('.skip');if(sk){e.preventDefault();const m=$('#main');m&&m.focus();return}
  const c=e.target.closest('sup.c');
  if(c){e.preventDefault();const k=c.dataset.ref.split(',')[0];if(PAGE&&PAGE!=='sources'){go('sources','#src-'+k);return}show('sources');flashSrc(k);return}
  const b=e.target.closest('[data-go]');if(b){if(b.href&&(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey))return;e.preventDefault();show(b.dataset.go)}
});
/* theme: auto → light → dark */
/* language switch keeps the current module */
(function lang(){const a=$('#langBtn');if(!a)return;const base=a.getAttribute('href');
  const upd=()=>a.setAttribute('href',base+location.hash);['pointerdown','focus','click','mouseenter'].forEach(e=>a.addEventListener(e,upd));upd()})();
(function theme(){
  const btn=$('#themeBtn');const modes=['auto','light','dark'];let m=store.get('theme','auto');
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent='Theme: '+{auto:'auto',light:'light',dark:'dark'}[m]}
  btn.addEventListener('click',()=>{m=modes[(modes.indexOf(m)+1)%3];store.set('theme',m);apply()});apply();
})();
/* ---- narrow mode ----
   Phone stages are too small for the 720-wide layouts, so draw() asks NARROW()
   and lays its panels out in a tall column instead of a wide row. Modules that
   register a player are redrawn automatically when the stage crosses the
   threshold, so a rotation or a window resize re-lays-out the scene. */
const NARROW=()=>matchMedia('(max-width:820px)').matches;
const redraws={};
let _wasNarrow=NARROW(),_rt;
addEventListener('resize',()=>{clearTimeout(_rt);_rt=setTimeout(()=>{
  const n=NARROW();if(n===_wasNarrow)return;_wasNarrow=n;
  const f=redraws[cur];if(f)try{f()}catch(e){}
},160)});
/* fit the viewBox to the mode: wide|narrow are "w h" pairs */
function vb(svg,wide,narrow){const v=NARROW()?narrow:wide;svg.setAttribute('viewBox','0 0 '+v);svg.dataset.mode=NARROW()?'n':'w';return NARROW()}

/* ---- live regions ----
   Every frame of an animation rewrites its note panel, and a screen reader will
   announce an aria-live region each time its contents are replaced, even with the
   same text. Shadow innerHTML on those elements so an identical write is dropped:
   the reader hears the note once per real change, not sixty times a second. */
const _ihDesc=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
function guardLive(root=document){
  $$('[aria-live]',root).forEach(el=>{
    if(el._lguard)return;el._lguard=true;
    Object.defineProperty(el,'innerHTML',{configurable:true,
      get(){return _ihDesc.get.call(this)},
      set(v){if(v===this._lastHTML)return;this._lastHTML=v;_ihDesc.set.call(this,v)}});
  });
}

/* the shared player: a range input + a play button drive draw(t) */
function playWire(rg,pb,draw,dur,doneLabel='Replay',hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent='Play'}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
  rg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pb.click()}});
  if(!rg.getAttribute('aria-keyshortcuts'))rg.setAttribute('aria-keyshortcuts','Enter Space');
  pb.addEventListener('click',()=>{if(stopA){stop();return}let t0=+rg.value;const mx=+rg.max||1,mn=+rg.min||0;if(t0>=mx-(mx-mn)*.01)t0=mn;pb.textContent='Pause';
    stopA=animate((mx-t0)/(mx-mn)*dur,p=>{const t=t0+(mx-t0)*p;rg.value=t;draw(t)},()=>{stopA=null;pb.textContent=doneLabel})});
  if(hideKey){const prev=onHide[hideKey];onHide[hideKey]=()=>{prev&&prev();stop()}}
  if(hideKey){const prevR=redraws[hideKey];redraws[hideKey]=()=>{prevR&&prevR();stop();draw(+rg.value)}}
  return stop;
}
/* stepper buttons that jump the timeline */
function stepWire(el,steps,rg,draw,stop){
  el.innerHTML=steps.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop&&stop();const s=steps[+b.dataset.st];rg.value=s.at;draw(s.at)});
  el.setAttribute('role','group');el.setAttribute('aria-label','Steps');
  return i=>{$$('[data-st]',el).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    /* screen readers hear the step name, not a bare number, when the slider moves */
    if(rg&&steps[i])rg.setAttribute('aria-valuetext',`Step ${i+1} of ${steps.length}: ${steps[i].t}`)};
}
function phaseOf(steps,t){let p=0;steps.forEach((s,i)=>{if(t>=s.from)p=i});return p}
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>In plain words</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>Exam hook</b>${P.hook}</div>`:''}`}
const SOURCES=[{"key": "Abrahao2017", "text": "Abrahao KP, Salinas AG, Lovinger DM. Alcohol and the Brain: Neuronal Molecular Targets, Synapses, and Circuits. Neuron. 2017;96(6):1223-1238. PMID 29268093; PMCID PMC6566861; doi:10.1016/j.neuron.2017.10.032.", "link": "https://doi.org/10.1016/j.neuron.2017.10.032", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Addolorato2007Lancet", "text": "Addolorato G, Leggio L, Ferrulli A, Cardone S, Vonghia L, Mirijello A, et al. Effectiveness and safety of baclofen for maintenance of alcohol abstinence in alcohol-dependent patients with liver cirrhosis: randomised, double-blind controlled study. Lancet. 2007;370(9603):1915-1922. PMID 18068515; doi:10.1016/S0140-6736(07)61814-5.", "link": "https://doi.org/10.1016/s0140-6736(07)61814-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Aertgeerts2004CAGE", "text": "Aertgeerts B, Buntinx F, Kester A. The value of the CAGE in screening for alcohol abuse and alcohol dependence in general clinical populations: a diagnostic meta-analysis. J Clin Epidemiol. 2004;57(1):30-9. PMID 15019008; doi:10.1016/S0895-4356(03)00254-3.", "link": "https://doi.org/10.1016/s0895-4356(03)00254-3", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Afshar2017PEth", "text": "Afshar M, Burnham EL, Joyce C, Clark BJ, Yong M, Gaydos J, et al. Cut-Point Levels of Phosphatidylethanol to Identify Alcohol Misuse in a Mixed Cohort Including Critically Ill Patients. Alcohol Clin Exp Res. 2017;41(10):1745-1753. PMID 28792620; PMCID PMC5626634; doi:10.1111/acer.13471.", "link": "https://doi.org/10.1111/acer.13471", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Agabio2023Cochrane", "text": "Agabio R, Saulle R, Rösner S, Minozzi S. Baclofen for alcohol use disorder. Cochrane Database Syst Rev. 2023;1(1):CD012557. PMID 36637087; PMCID PMC9837849; doi:10.1002/14651858.CD012557.pub3.", "link": "https://doi.org/10.1002/14651858.cd012557.pub3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Alldredge1993", "text": "Alldredge BK, Lowenstein DH. Status epilepticus related to alcohol abuse. Epilepsia. 1993;34(6):1033-7. PMID 8243353; doi:10.1111/j.1528-1157.1993.tb02130.x.", "link": "https://doi.org/10.1111/j.1528-1157.1993.tb02130.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Allen2009JNCI", "text": "Allen NE, Beral V, Casabonne D, Kan SW, Reeves GK, Brown A, et al. Moderate alcohol intake and cancer incidence in women. J Natl Cancer Inst. 2009;101(5):296-305. PMID 19244173; doi:10.1093/jnci/djn514.", "link": "https://doi.org/10.1093/jnci/djn514", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Amato2010Cochrane", "text": "Amato L, Minozzi S, Vecchi S, Davoli M. Benzodiazepines for alcohol withdrawal. Cochrane Database Syst Rev. 2010;2010(3):CD005063. PMID 20238336; PMCID PMC12414628; doi:10.1002/14651858.CD005063.pub3.", "link": "https://doi.org/10.1002/14651858.cd005063.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Amato2011Cochrane", "text": "Amato L, Minozzi S, Davoli M. Efficacy and safety of pharmacological interventions for the treatment of the Alcohol Withdrawal Syndrome. Cochrane Database Syst Rev. 2011;2011(6):CD008537. PMID 21678378; PMCID PMC7173734; doi:10.1002/14651858.CD008537.pub2.", "link": "https://doi.org/10.1002/14651858.cd008537.pub2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Anderson2026", "text": "Anderson TS, Purkayastha S, Bernstein EY, Parr A, Mor MK, Bachrach RL, et al. Initiation of Medications for Alcohol Use Disorder Among Hospitalized Veterans: A Retrospective Cohort Study. Ann Intern Med. 2026;179(6):794-803. PMID 42081820; PMCID PMC13524201; doi:10.7326/ANNALS-26-00089.", "link": "https://doi.org/10.7326/annals-26-00089", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Anton2006COMBINE", "text": "Anton RF, O'Malley SS, Ciraulo DA, Cisler RA, Couper D, Donovan DM, et al. Combined pharmacotherapies and behavioral interventions for alcohol dependence: the COMBINE study: a randomized controlled trial. JAMA. 2006;295(17):2003-2017. PMID 16670409; doi:10.1001/jama.295.17.2003.", "link": "https://doi.org/10.1001/jama.295.17.2003", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Anton2008OPRM1", "text": "Anton RF, Oroszi G, O'Malley S, Couper D, Swift R, Pettinati H, et al. An evaluation of mu-opioid receptor (OPRM1) as a predictor of naltrexone response in the treatment of alcohol dependence: results from the Combined Pharmacotherapies and Behavioral Interventions for Alcohol Dependence (COMBINE) study. Arch Gen Psychiatry. 2008;65(2):135-144. PMID 18250251; PMCID PMC2666924; doi:10.1001/archpsyc.65.2.135.", "link": "https://doi.org/10.1001/archpsyc.65.2.135", "areas": ["E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Anton2008"]}, {"key": "Anton2020Gabapentin", "text": "Anton RF, Latham P, Voronin K, Book S, Hoffman M, Prisciandaro J, et al. Efficacy of Gabapentin for the Treatment of Alcohol Use Disorder in Patients With Alcohol Withdrawal Symptoms: A Randomized Clinical Trial. JAMA Intern Med. 2020;180(5):728-736. PMID 32150232; PMCID PMC7063541; doi:10.1001/jamainternmed.2020.0249.", "link": "https://doi.org/10.1001/jamainternmed.2020.0249", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Antunez1998", "text": "Antunez E, Estruch R, Cardenal C, Nicolas JM, Fernandez-Sola J, Urbano-Marquez A. Usefulness of CT and MR imaging in the diagnosis of acute Wernicke's encephalopathy. AJR Am J Roentgenol. 1998;171(4):1131-7. PMID 9763009; doi:10.2214/ajr.171.4.9763009.", "link": "https://doi.org/10.2214/ajr.171.4.9763009", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "APA2013", "text": "American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5). Arlington, VA: American Psychiatric Association; 2013. doi:10.1176/appi.books.9780890425596.", "link": "https://doi.org/10.1176/appi.books.9780890425596", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "APA2022", "text": "American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR). Washington, DC: American Psychiatric Association Publishing; 2022. doi:10.1176/appi.books.9780890425787.", "link": "https://doi.org/10.1176/appi.books.9780890425787", "areas": ["A", "C"], "unverified": false, "validated": "Crossref"}, {"key": "Arab2020", "text": "Arab JP, Sehrawat TS, Simonetto DA, Verma VK, Feng D, Tang T, et al. An Open-Label, Dose-Escalation Study to Assess the Safety and Efficacy of IL-22 Agonist F-652 in Patients With Alcohol-associated Hepatitis. Hepatology. 2020;72(2):441-453. PMID 31774566; PMCID PMC7250715; doi:10.1002/hep.31046.", "link": "https://doi.org/10.1002/hep.31046", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Arnts2021LiverBiomarkers", "text": "Arnts J, Vanlerberghe BTK, Roozen S, Crunelle CL, Masclee AAM, Olde-Damink SWM, et al. Diagnostic Accuracy of Biomarkers of Alcohol Use in Patients With Liver Disease: A Systematic Review. Alcohol Clin Exp Res. 2021;45(1):25-37. PMID 33190239; PMCID PMC7898850; doi:10.1111/acer.14512.", "link": "https://doi.org/10.1111/acer.14512", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Arts2017", "text": "Arts NJ, Walvoort SJ, Kessels RP. Korsakoff's syndrome: a critical review. Neuropsychiatr Dis Treat. 2017;13:2875-2890. PMID 29225466; PMCID PMC5708199; doi:10.2147/NDT.S130078.", "link": "https://doi.org/10.2147/ndt.s130078", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "ASAM2020Withdrawal", "text": "American Society of Addiction Medicine (no individual authors listed in PubMed). The ASAM Clinical Practice Guideline on Alcohol Withdrawal Management. J Addict Med. 2020;14(3S Suppl 1):1-72. PMID 32511109; doi:10.1097/ADM.0000000000000668.", "link": "https://doi.org/10.1097/adm.0000000000000668", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ashford2018", "text": "Ashford RD, Brown AM, Curtis B. Substance use, recovery, and linguistics: The impact of word choice on explicit and implicit bias. Drug Alcohol Depend. 2018;189:131-138. PMID 29913324; PMCID PMC6330014; doi:10.1016/j.drugalcdep.2018.05.005.", "link": "https://doi.org/10.1016/j.drugalcdep.2018.05.005", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Askgaard2015JHep", "text": "Askgaard G, Grønbæk M, Kjær MS, Tjønneland A, Tolstrup JS. Alcohol drinking pattern and risk of alcoholic liver cirrhosis: a prospective cohort study. J Hepatol. 2015;62(5):1061-7. PMID 25634330; doi:10.1016/j.jhep.2014.12.005.", "link": "https://doi.org/10.1016/j.jhep.2014.12.005", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Awissi2013", "text": "Awissi DK, Lebrun G, Coursin DB, Riker RR, Skrobik Y. Alcohol withdrawal and delirium tremens in the critically ill: a systematic review and commentary. Intensive Care Med. 2013;39(1):16-30. PMID 23184039; doi:10.1007/s00134-012-2758-y.", "link": "https://doi.org/10.1007/s00134-012-2758-y", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ayyala2022", "text": "Ayyala D, Bottyan T, Tien C, Pimienta M, Yoo J, Stager K, et al. Naltrexone for alcohol use disorder: Hepatic safety in patients with and without liver disease. Hepatol Commun. 2022;6(12):3433-3442. PMID 36281979; PMCID PMC9701476; doi:10.1002/hep4.2080.", "link": "https://doi.org/10.1002/hep4.2080", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Azrin1976", "text": "Azrin NH. Improvements in the community-reinforcement approach to alcoholism. Behav Res Ther. 1976;14(5):339-48. PMID 971207; doi:10.1016/0005-7967(76)90021-8.", "link": "https://doi.org/10.1016/0005-7967(76)90021-8", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Baan2007IARC", "text": "Baan R, Straif K, Grosse Y, Secretan B, El Ghissassi F, Bouvard V, et al. Carcinogenicity of alcoholic beverages. Lancet Oncol. 2007;8(4):292-3. PMID 17431955; doi:10.1016/s1470-2045(07)70099-2.", "link": "https://doi.org/10.1016/s1470-2045(07)70099-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Babor2007SBIRT", "text": "Babor TF, McRee BG, Kassebaum PA, Grimaldi PL, Ahmed K, Bray J. Screening, Brief Intervention, and Referral to Treatment (SBIRT): toward a public health approach to the management of substance abuse. Subst Abus. 2007;28(3):7-30. PMID 18077300; doi:10.1300/J465v28n03_03.", "link": "https://doi.org/10.1300/j465v28n03_03", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Babor2016AUDITZones", "text": "Babor TF, Robaina K. The Alcohol Use Disorders Identification Test (AUDIT): a review of graded severity algorithms and national adaptations. Int J Alcohol Drug Res. 2016;5(2):17-24. doi:10.7895/ijadr.v5i2.222. Zone table read from the open-access article PDF.", "link": "https://doi.org/10.7895/ijadr.v5i2.222", "areas": ["C"], "unverified": false, "validated": "Crossref"}, {"key": "Babor2022", "text": "Babor TF, Casswell S, Graham K, Huckle T, Livingston M, Rehm J, et al. Alcohol: No Ordinary Commodity-a summary of the third edition. Addiction. 2022;117(12):3024-3036. PMID 36321607; doi:10.1111/add.16003.", "link": "https://doi.org/10.1111/add.16003", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bagnardi2015BJC", "text": "Bagnardi V, Rota M, Botteri E, Tramacere I, Islami F, Fedirko V, et al. Alcohol consumption and site-specific cancer risk: a comprehensive dose-response meta-analysis. Br J Cancer. 2015;112(3):580-93. PMID 25422909; PMCID PMC4453639; doi:10.1038/bjc.2014.579.", "link": "https://doi.org/10.1038/bjc.2014.579", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bahji2022NMA", "text": "Bahji A, Bach P, Danilewitz M, Crockford D, Devoe DJ, El-Guebaly N, et al. Pharmacotherapies for Adults With Alcohol Use Disorders: A Systematic Review and Network Meta-analysis. J Addict Med. 2022;16(6):630-638. PMID 35653782; PMCID PMC10010623; doi:10.1097/ADM.0000000000000992.", "link": "https://doi.org/10.1097/adm.0000000000000992", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Barr2020", "text": "Barr PB, Ksinan A, Su J, Johnson EC, Meyers JL, Wetherill L, et al. Using polygenic scores for identifying individuals at increased risk of substance use disorders in clinical and population samples. Transl Psychiatry. 2020;10(1):196. PMID 32555147; PMCID PMC7303212; doi:10.1038/s41398-020-00865-8.", "link": "https://doi.org/10.1038/s41398-020-00865-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Barry2014", "text": "Barry CL, McGinty EE, Pescosolido BA, Goldman HH. Stigma, discrimination, treatment effectiveness, and policy: public views about drug addiction and mental illness. Psychiatr Serv. 2014;65(10):1269-72. PMID 25270497; PMCID PMC4285770; doi:10.1176/appi.ps.201400140.", "link": "https://doi.org/10.1176/appi.ps.201400140", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Becker1998", "text": "Becker HC. Kindling in alcohol withdrawal. Alcohol Health Res World. 1998;22(1):25-33. PMID 15706729; PMCID PMC6761822.", "link": "https://pubmed.ncbi.nlm.nih.gov/15706729/", "areas": ["B", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Becker1998Kindling"]}, {"key": "Bensley2025", "text": "Bensley KMK, Karriker-Jaffe KJ, Delk J, Li L, Ye Y, Phillips AZ, et al. Receipt of Medications for Alcohol and Opioid Use Disorders: The Importance of Service Utilization Patterns. J Behav Health Serv Res. 2025;52(1):123-138. PMID 39638958; PMCID PMC12447625; doi:10.1007/s11414-024-09918-y.", "link": "https://doi.org/10.1007/s11414-024-09918-y", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Beraha2016Baclofen", "text": "Beraha EM, Salemink E, Goudriaan AE, Bakker A, de Jong D, Smits N, et al. Efficacy and safety of high-dose baclofen for the treatment of alcohol dependence: A multicentre, randomised, double-blind controlled trial. Eur Neuropsychopharmacol. 2016;26(12):1950-1959. PMID 27842939; doi:10.1016/j.euroneuro.2016.10.006.", "link": "https://doi.org/10.1016/j.euroneuro.2016.10.006", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bernstein2026", "text": "Bernstein EY, Lebin JA, Hoppe J, Clinton I, Gritz RM, Kruse GR, et al. Variation in initiation of medications for alcohol use disorder during alcohol withdrawal hospitalizations in a large health system: A retrospective cohort study. J Hosp Med. 2026;21(5):487-494. PMID 41060248; doi:10.1002/jhm.70201.", "link": "https://doi.org/10.1002/jhm.70201", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bertholet2005BI", "text": "Bertholet N, Daeppen JB, Wietlisbach V, Fleming M, Burnand B. Reduction of alcohol consumption by brief alcohol intervention in primary care: systematic review and meta-analysis. Arch Intern Med. 2005;165(9):986-95. PMID 15883236; doi:10.1001/archinte.165.9.986.", "link": "https://doi.org/10.1001/archinte.165.9.986", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Biddinger2022JAMANetwOpen", "text": "Biddinger KJ, Emdin CA, Haas ME, Wang M, Hindy G, Ellinor PT, et al. Association of Habitual Alcohol Intake With Risk of Cardiovascular Disease. JAMA Netw Open. 2022;5(3):e223849. PMID 35333364; PMCID PMC8956974; doi:10.1001/jamanetworkopen.2022.3849.", "link": "https://doi.org/10.1001/jamanetworkopen.2022.3849", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Blocker2006", "text": "Blocker JS Jr. Did prohibition really work? Alcohol prohibition as a public health innovation. Am J Public Health. 2006;96(2):233-43. PMID 16380559; PMCID PMC1470475; doi:10.2105/AJPH.2005.065409.", "link": "https://doi.org/10.2105/ajph.2005.065409", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Blodgett2014Topiramate", "text": "Blodgett JC, Del Re AC, Maisel NC, Finney JW. A meta-analysis of topiramate's effects for individuals with alcohol use disorders. Alcohol Clin Exp Res. 2014;38(6):1481-1488. PMID 24796492; PMCID PMC4047180; doi:10.1111/acer.12411.", "link": "https://doi.org/10.1111/acer.12411", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bogenschutz2022", "text": "Bogenschutz MP, Ross S, Bhatt S, Baron T, Forcehimes AA, Laska E, et al. Percentage of Heavy Drinking Days Following Psilocybin-Assisted Psychotherapy vs Placebo in the Treatment of Adult Patients With Alcohol Use Disorder: A Randomized Clinical Trial. JAMA Psychiatry. 2022;79(10):953-962. PMID 36001306; PMCID PMC9403854; doi:10.1001/jamapsychiatry.2022.2096.", "link": "https://doi.org/10.1001/jamapsychiatry.2022.2096", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Boileau2003", "text": "Boileau I, Assaad JM, Pihl RO, Benkelfat C, Leyton M, Diksic M, et al. Alcohol promotes dopamine release in the human nucleus accumbens. Synapse. 2003;49(4):226-31. PMID 12827641; doi:10.1002/syn.10226.", "link": "https://doi.org/10.1002/syn.10226", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Borges2017", "text": "Borges G, Bagge CL, Cherpitel CJ, Conner KR, Orozco R, Rossow I. A meta-analysis of acute use of alcohol and the risk of suicide attempt. Psychol Med. 2017;47(5):949-957. PMID 27928972; PMCID PMC5340592; doi:10.1017/S0033291716002841.", "link": "https://doi.org/10.1017/s0033291716002841", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bowen2014", "text": "Bowen S, Witkiewitz K, Clifasefi SL, Grow J, Chawla N, Hsu SH, et al. Relative efficacy of mindfulness-based relapse prevention, standard relapse prevention, and treatment as usual for substance use disorders: a randomized clinical trial. JAMA Psychiatry. 2014;71(5):547-56. PMID 24647726; PMCID PMC4489711; doi:10.1001/jamapsychiatry.2013.4546.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.4546", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bradley2003Women", "text": "Bradley KA, Bush KR, Epler AJ, Dobie DJ, Davis TM, Sporleder JL, et al. Two brief alcohol-screening tests From the Alcohol Use Disorders Identification Test (AUDIT): validation in a female Veterans Affairs patient population. Arch Intern Med. 2003;163(7):821-9. PMID 12695273; doi:10.1001/archinte.163.7.821.", "link": "https://doi.org/10.1001/archinte.163.7.821", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bradley2007AUDITC", "text": "Bradley KA, DeBenedetti AF, Volk RJ, Williams EC, Frank D, Kivlahan DR. AUDIT-C as a brief screen for alcohol misuse in primary care. Alcohol Clin Exp Res. 2007;31(7):1208-17. PMID 17451397; doi:10.1111/j.1530-0277.2007.00403.x.", "link": "https://doi.org/10.1111/j.1530-0277.2007.00403.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Brathen2005EFNS", "text": "Bråthen G, Ben-Menachem E, Brodtkorb E, Galvin R, Garcia-Monco JC, Halasz P, et al. EFNS guideline on the diagnosis and management of alcohol-related seizures: report of an EFNS task force. Eur J Neurol. 2005;12(8):575-81. PMID 16053464; doi:10.1111/j.1468-1331.2005.01247.x.", "link": "https://doi.org/10.1111/j.1468-1331.2005.01247.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Breslow2015", "text": "Breslow RA, Dong C, White A. Prevalence of alcohol-interactive prescription medication use among current drinkers: United States, 1999 to 2010. Alcohol Clin Exp Res. 2015;39(2):371-9. PMID 25597432; PMCID PMC4331237; doi:10.1111/acer.12633.", "link": "https://doi.org/10.1111/acer.12633", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Brooks2009", "text": "Brooks PJ, Enoch MA, Goldman D, Li TK, Yokoyama A. The alcohol flushing response: an unrecognized risk factor for esophageal cancer from alcohol consumption. PLoS Med. 2009;6(3):e50. PMID 19320537; PMCID PMC2659709; doi:10.1371/journal.pmed.1000050.", "link": "https://doi.org/10.1371/journal.pmed.1000050", "areas": ["B", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Brooks2009PLoSMed"]}, {"key": "Brown1988Kindling", "text": "Brown ME, Anton RF, Malcolm R, Ballenger JC. Alcohol detoxification and withdrawal seizures: clinical support for a kindling hypothesis. Biol Psychiatry. 1988;23(5):507-14. PMID 3345323; doi:10.1016/0006-3223(88)90023-6.", "link": "https://doi.org/10.1016/0006-3223(88)90023-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Burns2010Pregnancy", "text": "Burns E, Gray R, Smith LA. Brief screening questionnaires to identify problem drinking during pregnancy: a systematic review. Addiction. 2010;105(4):601-14. PMID 20403013; doi:10.1111/j.1360-0443.2009.02842.x.", "link": "https://doi.org/10.1111/j.1360-0443.2009.02842.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bush1998AUDITC", "text": "Bush K, Kivlahan DR, McDonell MB, Fihn SD, Bradley KA. The AUDIT alcohol consumption questions (AUDIT-C): an effective brief screening test for problem drinking. Ambulatory Care Quality Improvement Project (ACQUIP). Alcohol Use Disorders Identification Test. Arch Intern Med. 1998;158(16):1789-95. PMID 9738608; doi:10.1001/archinte.158.16.1789.", "link": "https://doi.org/10.1001/archinte.158.16.1789", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Caine1997", "text": "Caine D, Halliday GM, Kril JJ, Harper CG. Operational criteria for the classification of chronic alcoholics: identification of Wernicke's encephalopathy. J Neurol Neurosurg Psychiatry. 1997;62(1):51-60. PMID 9010400; PMCID PMC486695; doi:10.1136/jnnp.62.1.51.", "link": "https://doi.org/10.1136/jnnp.62.1.51", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Carithers1989", "text": "Carithers RL Jr, Herlong HF, Diehl AM, Shaw EW, Combes B, Fallon HJ, et al. Methylprednisolone therapy in patients with severe alcoholic hepatitis. A randomized multicenter trial. Ann Intern Med. 1989;110(9):685-90. PMID 2648927; doi:10.7326/0003-4819-110-9-685.", "link": "https://doi.org/10.7326/0003-4819-110-9-685", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Carvalho2019Lancet", "text": "Carvalho AF, Heilig M, Perez A, Probst C, Rehm J. Alcohol use disorders. Lancet. 2019;394(10200):781-792. PMID 31478502; doi:10.1016/S0140-6736(19)31775-1.", "link": "https://doi.org/10.1016/s0140-6736(19)31775-1", "areas": ["A", "B", "C", "E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Carver2026", "text": "Carver H, King E, Greenhalgh J, Shorter GW, Pauly B, Parkes T. Realist review of managed alcohol programmes for people experiencing alcohol dependence and homelessness: what works, for whom, and in what circumstances? Harm Reduct J. 2026;23(1). PMID 41709269; PMCID PMC12961887; doi:10.1186/s12954-026-01416-y.", "link": "https://doi.org/10.1186/s12954-026-01416-y", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Cecchini2024Hypertension", "text": "Cecchini M, Filippini T, Whelton PK, Iamandii I, Di Federico S, Boriani G, et al. Alcohol Intake and Risk of Hypertension: A Systematic Review and Dose-Response Meta-Analysis of Nonexperimental Cohort Studies. Hypertension. 2024;81(8):1701-1715. PMID 38864208; PMCID PMC11251509; doi:10.1161/HYPERTENSIONAHA.124.22703.", "link": "https://doi.org/10.1161/hypertensionaha.124.22703", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Cederbaum2012", "text": "Cederbaum AI. Alcohol metabolism. Clin Liver Dis. 2012;16(4):667-85. PMID 23101976; PMCID PMC3484320; doi:10.1016/j.cld.2012.08.002.", "link": "https://doi.org/10.1016/j.cld.2012.08.002", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2003CDTGGT", "text": "Chen J, Conigrave KM, Macaskill P, Whitfield JB, Irwig L. Combining carbohydrate-deficient transferrin and gamma-glutamyltransferase to increase diagnostic accuracy for problem drinking. Alcohol Alcohol. 2003;38(6):574-82. PMID 14633645; doi:10.1093/alcalc/agg113.", "link": "https://doi.org/10.1093/alcalc/agg113", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Chisholm2018", "text": "Chisholm D, Moro D, Bertram M, Pretorius C, Gmel G, Shield K, et al. Are the \"Best Buys\" for Alcohol Control Still Valid? An Update on the Comparative Cost-Effectiveness of Alcohol Control Strategies at the Global Level. J Stud Alcohol Drugs. 2018;79(4):514-522. PMID 30079865; doi:10.15288/jsad.2018.79.514.", "link": "https://doi.org/10.15288/jsad.2018.79.514", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Cohen1979SGOTSGPT", "text": "Cohen JA, Kaplan MM. The SGOT/SGPT ratio--an indicator of alcoholic liver disease. Dig Dis Sci. 1979;24(11):835-8. PMID 520102; doi:10.1007/BF01324898.", "link": "https://doi.org/10.1007/bf01324898", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Cohen2007", "text": "Cohen E, Feinn R, Arias A, Kranzler HR. Alcohol treatment utilization: findings from the National Epidemiologic Survey on Alcohol and Related Conditions. Drug Alcohol Depend. 2007;86(2-3):214-21. PMID 16919401; doi:10.1016/j.drugalcdep.2006.06.008.", "link": "https://doi.org/10.1016/j.drugalcdep.2006.06.008", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Compton2013Crosswalk", "text": "Compton WM, Dawson DA, Goldstein RB, Grant BF. Crosswalk between DSM-IV dependence and DSM-5 substance use disorders for opioids, cannabis, cocaine and alcohol. Drug Alcohol Depend. 2013;132(1-2):387-90. PMID 23642316; PMCID PMC3748225; doi:10.1016/j.drugalcdep.2013.02.036.", "link": "https://doi.org/10.1016/j.drugalcdep.2013.02.036", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Conigrave2003Markers", "text": "Conigrave KM, Davies P, Haber P, Whitfield JB. Traditional markers of excessive alcohol use. Addiction. 2003;98 Suppl 2:31-43. PMID 14984240; doi:10.1046/j.1359-6357.2003.00581.x.", "link": "https://doi.org/10.1046/j.1359-6357.2003.00581.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Connor2017Addiction", "text": "Connor J. Alcohol consumption as a cause of cancer. Addiction. 2017;112(2):222-228. PMID 27442501; doi:10.1111/add.13477.", "link": "https://doi.org/10.1111/add.13477", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Copello2005", "text": "Copello AG, Velleman RD, Templeton LJ. Family interventions in the treatment of alcohol and drug problems. Drug Alcohol Rev. 2005;24(4):369-85. PMID 16234133; doi:10.1080/09595230500302356.", "link": "https://doi.org/10.1080/09595230500302356", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Corbin2014", "text": "Corbin WR, Zalewski S, Leeman RF, Toll BA, Fucito LM, O'Malley SS. In with the old and out with the new? A comparison of the old and new binge drinking standards. Alcohol Clin Exp Res. 2014;38(10):2657-63. PMID 25346506; PMCID PMC9328028; doi:10.1111/acer.12514.", "link": "https://doi.org/10.1111/acer.12514", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Crabb2020AASLD", "text": "Crabb DW, Im GY, Szabo G, Mellinger JL, Lucey MR. Diagnosis and Treatment of Alcohol-Associated Liver Diseases: 2019 Practice Guidance From the American Association for the Study of Liver Diseases. Hepatology. 2020;71(1):306-333. PMID 31314133; doi:10.1002/hep.30866.", "link": "https://doi.org/10.1002/hep.30866", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Crepeault2025", "text": "Crepeault H, Cowan N, Socias ME, Riazi N, Knill A, Khela A, et al. Applying a Modified Version of the Prediction of Alcohol Withdrawal Severity Scale in a Canadian Community Withdrawal Management Setting. Drug Alcohol Rev. 2025;44(5):1365-1373. PMID 40328513; PMCID PMC12228024; doi:10.1111/dar.14075.", "link": "https://doi.org/10.1111/dar.14075", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Crunelle2014HairEtG", "text": "Crunelle CL, Yegles M, Nuijs ALNV, Covaci A, De Doncker M, Maudens KE, et al. Hair ethyl glucuronide levels as a marker for alcohol use and abuse: a review of the current state of the art. Drug Alcohol Depend. 2014;134:1-11. PMID 24239414; doi:10.1016/j.drugalcdep.2013.10.008.", "link": "https://doi.org/10.1016/j.drugalcdep.2013.10.008", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Csengeri2021EHJ", "text": "Csengeri D, Sprünker NA, Di Castelnuovo A, Niiranen T, Vishram-Nielsen JK, Costanzo S, et al. Alcohol consumption, cardiac biomarkers, and risk of atrial fibrillation and adverse outcomes. Eur Heart J. 2021;42(12):1170-1177. PMID 33438022; PMCID PMC7982286; doi:10.1093/eurheartj/ehaa953.", "link": "https://doi.org/10.1093/eurheartj/ehaa953", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Daeppen2002", "text": "Daeppen JB, Gache P, Landry U, Sekera E, Schweizer V, Gloor S, et al. Symptom-triggered vs fixed-schedule doses of benzodiazepine for alcohol withdrawal: a randomized treatment trial. Arch Intern Med. 2002;162(10):1117-21. PMID 12020181; doi:10.1001/archinte.162.10.1117.", "link": "https://doi.org/10.1001/archinte.162.10.1117", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dakwar2020", "text": "Dakwar E, Levin F, Hart CL, Basaraba C, Choi J, Pavlicova M, et al. A Single Ketamine Infusion Combined With Motivational Enhancement Therapy for Alcohol Use Disorder: A Randomized Midazolam-Controlled Pilot Trial. Am J Psychiatry. 2020;177(2):125-133. PMID 31786934; doi:10.1176/appi.ajp.2019.19070684.", "link": "https://doi.org/10.1176/appi.ajp.2019.19070684", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Danpanichkul2025Older", "text": "Danpanichkul P, Duangsonk K, Tham EKJ, Tothanarungroj P, Auttapracha T, Prasitsumrit V, et al. Increased mortality from alcohol use disorder, alcohol-associated liver disease, and liver cancer from alcohol among older adults in the United States: 2000 to 2021. Alcohol Clin Exp Res (Hoboken). 2025;49(2):368-378. PMID 39701596; PMCID PMC11828968; doi:10.1111/acer.15516.", "link": "https://doi.org/10.1111/acer.15516", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Darvishi2015", "text": "Darvishi N, Farhadi M, Haghtalab T, Poorolajal J. Alcohol-related risk of suicidal ideation, suicide attempt, and completed suicide: a meta-analysis. PLoS One. 2015;10(5):e0126870. PMID 25993344; PMCID PMC4439031; doi:10.1371/journal.pone.0126870.", "link": "https://doi.org/10.1371/journal.pone.0126870", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Daviet2022", "text": "Daviet R, Aydogan G, Jagannathan K, Spilka N, Koellinger PD, Kranzler HR, et al. Associations between alcohol consumption and gray and white matter volumes in the UK Biobank. Nat Commun. 2022;13(1):1175. PMID 35246521; PMCID PMC8897479; doi:10.1038/s41467-022-28735-5.", "link": "https://doi.org/10.1038/s41467-022-28735-5", "areas": ["B", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Daviet2022NatCommun"]}, {"key": "Dawson2005", "text": "Dawson DA, Grant BF, Stinson FS, Chou PS, Huang B, Ruan WJ. Recovery from DSM-IV alcohol dependence: United States, 2001-2002. Addiction. 2005;100(3):281-92. PMID 15733237; doi:10.1111/j.1360-0443.2004.00964.x.", "link": "https://doi.org/10.1111/j.1360-0443.2004.00964.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dawson2005AUDITC", "text": "Dawson DA, Grant BF, Stinson FS, Zhou Y. Effectiveness of the derived Alcohol Use Disorders Identification Test (AUDIT-C) in screening for alcohol use disorders and risk drinking in the US general population. Alcohol Clin Exp Res. 2005;29(5):844-54. PMID 15897730; doi:10.1097/01.alc.0000164374.32229.a2.", "link": "https://doi.org/10.1097/01.alc.0000164374.32229.a2", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Day2013Cochrane", "text": "Day E, Bentham PW, Callaghan R, Kuruvilla T, George S. Thiamine for prevention and treatment of Wernicke-Korsakoff Syndrome in people who abuse alcohol. Cochrane Database Syst Rev. 2013;2013(7):CD004033. PMID 23818100; PMCID PMC7163251; doi:10.1002/14651858.CD004033.pub3.", "link": "https://doi.org/10.1002/14651858.cd004033.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Day2019Addiction", "text": "Day E, Rudd JHF. Alcohol use disorders and the heart. Addiction. 2019;114(9):1670-1678. PMID 31309639; PMCID PMC6771559; doi:10.1111/add.14703.", "link": "https://doi.org/10.1111/add.14703", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "deBeaurepaire2022TRU", "text": "de Beaurepaire R, Rolland B. Baclofen in alcohol use disorder: An analysis of the data provided by the French \"Temporary Recommendation for Use\" 2014-2017 cohort. Front Psychiatry. 2022;13:949750. PMID 36311508; PMCID PMC9597083; doi:10.3389/fpsyt.2022.949750.", "link": "https://doi.org/10.3389/fpsyt.2022.949750", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "deBejczy2026PEth", "text": "de Bejczy A, Walther L, Nilsson-Wallmark C, Askerup B, Isaksson A. Decline of phosphatidylethanol (B-PEth) during abstinence in patients with alcohol use disorder undergoing withdrawal treatment, and the correlation of B-PEth with self-reported alcohol intake. Addiction. 2026;121(6):1474-1482. PMID 41710972; PMCID PMC13155280; doi:10.1111/add.70359.", "link": "https://doi.org/10.1111/add.70359", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Degenhardt2019ICD11", "text": "Degenhardt L, Bharat C, Bruno R, Glantz MD, Sampson NA, Lago L, et al. Concordance between the diagnostic guidelines for alcohol and cannabis use disorders in the draft ICD-11 and other classification systems: analysis of data from the WHO's World Mental Health Surveys. Addiction. 2019;114(3):534-552. PMID 30370636; PMCID PMC7059958; doi:10.1111/add.14482.", "link": "https://doi.org/10.1111/add.14482", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Dennis2005", "text": "Dennis ML, Scott CK, Funk R, Foss MA. The duration and correlates of addiction and treatment careers. J Subst Abuse Treat. 2005;28 Suppl 1:S51-62. PMID 15797639; doi:10.1016/j.jsat.2004.10.013.", "link": "https://doi.org/10.1016/j.jsat.2004.10.013", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dhalla2007CAGE", "text": "Dhalla S, Kopec JA. The CAGE questionnaire for alcohol misuse: a review of reliability and validity studies. Clin Invest Med. 2007;30(1):33-41. PMID 17716538; doi:10.25011/cim.v30i1.447.", "link": "https://doi.org/10.25011/cim.v30i1.447", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Dingwall2015Mg", "text": "Dingwall KM, Delima JF, Gent D, Batey RG. Hypomagnesaemia and its potential impact on thiamine utilisation in patients with alcohol misuse at the Alice Springs Hospital. Drug Alcohol Rev. 2015;34(3):323-8. PMID 25693730; doi:10.1111/dar.12237.", "link": "https://doi.org/10.1111/dar.12237", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dingwall2022RCT", "text": "Dingwall KM, Delima JF, Binks P, Batey R, Bowden SC. What is the optimum thiamine dose to treat or prevent Wernicke's encephalopathy or Wernicke-Korsakoff syndrome? Results of a randomized controlled trial. Alcohol Clin Exp Res. 2022;46(6):1133-1147. PMID 35428992; PMCID PMC9321884; doi:10.1111/acer.14843.", "link": "https://doi.org/10.1111/acer.14843", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dominguez2024EHJ", "text": "Domínguez F, Adler E, García-Pavía P. Alcoholic cardiomyopathy: an update. Eur Heart J. 2024;45(26):2294-2305. PMID 38848133; PMCID PMC11231944; doi:10.1093/eurheartj/ehae362.", "link": "https://doi.org/10.1093/eurheartj/ehae362", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DOnofrio1999NEJM", "text": "D'Onofrio G, Rathlev NK, Ulrich AS, Fish SS, Freedland ES. Lorazepam for the prevention of recurrent seizures related to alcohol. N Engl J Med. 1999;340(12):915-9. PMID 10094637; doi:10.1056/NEJM199903253401203.", "link": "https://doi.org/10.1056/nejm199903253401203", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "DrugsFDA-AUD", "text": "U.S. Food and Drug Administration, Drugs@FDA. ANTABUSE NDA007883 (ORIG approval 1951-08-28); REVIA NDA018932 (ORIG approval 1984-11-20; efficacy supplement 10 approved 1994-12-30); CAMPRAL NDA021431 (ORIG approval 2004-07-29); VIVITROL NDA021897 (ORIG approval 2006-04-13).", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "Dube2001", "text": "Dube SR, Anda RF, Felitti VJ, Croft JB, Edwards VJ, Giles WH. Growing up with parental alcohol abuse: exposure to childhood abuse, neglect, and household dysfunction. Child Abuse Negl. 2001;25(12):1627-40. PMID 11814159; doi:10.1016/s0145-2134(01)00293-9.", "link": "https://doi.org/10.1016/s0145-2134(01)00293-9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Dunn2005MELD", "text": "Dunn W, Jamil LH, Brown LS, Wiesner RH, Kim WR, Menon KV, et al. MELD accurately predicts mortality in patients with alcoholic hepatitis. Hepatology. 2005;41(2):353-8. PMID 15660383; doi:10.1002/hep.20503.", "link": "https://doi.org/10.1002/hep.20503", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Eddie2019", "text": "Eddie D, Greene MC, White WL, Kelly JF. Medical Burden of Disease Among Individuals in Recovery From Alcohol and Other Drug Problems in the United States: Findings From the National Recovery Survey. J Addict Med. 2019;13(5):385-395. PMID 31589181; PMCID PMC6785203; doi:10.1097/ADM.0000000000000512.", "link": "https://doi.org/10.1097/adm.0000000000000512", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Eddie2022", "text": "Eddie D, Bergman BG, Hoffman LA, Kelly JF. Abstinence versus moderation recovery pathways following resolution of a substance use problem: Prevalence, predictors, and relationship to psychosocial well-being in a U.S. national sample. Alcohol Clin Exp Res. 2022;46(2):312-325. PMID 34931320; PMCID PMC8858850; doi:10.1111/acer.14765.", "link": "https://doi.org/10.1111/acer.14765", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Edenberg2007", "text": "Edenberg HJ. The genetics of alcohol metabolism: role of alcohol dehydrogenase and aldehyde dehydrogenase variants. Alcohol Res Health. 2007;30(1):5-13. PMID 17718394; PMCID PMC3860432.", "link": "https://pubmed.ncbi.nlm.nih.gov/17718394/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Edwards1976", "text": "Edwards G, Gross MM. Alcohol dependence: provisional description of a clinical syndrome. Br Med J. 1976;1(6017):1058-61. PMID 773501; PMCID PMC1639901; doi:10.1136/bmj.1.6017.1058.", "link": "https://doi.org/10.1136/bmj.1.6017.1058", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Edwards1977", "text": "Edwards G, Orford J, Egert S, Guthrie S, Hawker A, Hensman C, et al. Alcoholism: a controlled trial of \"treatment\" and \"advice\". J Stud Alcohol. 1977;38(5):1004-31. PMID 881837; doi:10.15288/jsa.1977.38.1004.", "link": "https://doi.org/10.15288/jsa.1977.38.1004", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Elder2011", "text": "Elder RW, Voas R, Beirness D, Shults RA, Sleet DA, Nichols JL, et al. Effectiveness of ignition interlocks for preventing alcohol-impaired driving and alcohol-related crashes: a Community Guide systematic review. Am J Prev Med. 2011;40(3):362-76. PMID 21335270; doi:10.1016/j.amepre.2010.11.012.", "link": "https://doi.org/10.1016/j.amepre.2010.11.012", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Elisaf2002", "text": "Elisaf M, Liberopoulos E, Bairaktari E, Siamopoulos K. Hypokalaemia in alcoholic patients. Drug Alcohol Rev. 2002;21(1):73-6. PMID 12189007; doi:10.1080/09595230220119282a.", "link": "https://doi.org/10.1080/09595230220119282a", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ely2001CAMICU", "text": "Ely EW, Inouye SK, Bernard GR, Gordon S, Francis J, May L, et al. Delirium in mechanically ventilated patients: validity and reliability of the confusion assessment method for the intensive care unit (CAM-ICU). JAMA. 2001;286(21):2703-10. PMID 11730446; doi:10.1001/jama.286.21.2703.", "link": "https://doi.org/10.1001/jama.286.21.2703", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Esser2014PCD", "text": "Esser MB, Hedden SL, Kanny D, Brewer RD, Gfroerer JC, Naimi TS. Prevalence of alcohol dependence among US adult drinkers, 2009-2011. Prev Chronic Dis. 2014;11:E206. PMID 25412029; PMCID PMC4241371; doi:10.5888/pcd11.140329.", "link": "https://doi.org/10.5888/pcd11.140329", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Esser2022JNO", "text": "Esser MB, Leung G, Sherk A, Bohm MK, Liu Y, Lu H, et al. Estimated Deaths Attributable to Excessive Alcohol Use Among US Adults Aged 20 to 64 Years, 2015 to 2019. JAMA Netw Open. 2022;5(11):e2239485. PMID 36318209; PMCID PMC9627409; doi:10.1001/jamanetworkopen.2022.39485.", "link": "https://doi.org/10.1001/jamanetworkopen.2022.39485", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Esser2024MMWR", "text": "Esser MB, Sherk A, Liu Y, Naimi TS. Deaths from Excessive Alcohol Use - United States, 2016-2021. MMWR Morb Mortal Wkly Rep. 2024;73(8):154-161. PMID 38421934; PMCID PMC10907037; doi:10.15585/mmwr.mm7308a1.", "link": "https://doi.org/10.15585/mmwr.mm7308a1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ettinger1978", "text": "Ettinger PO, Wu CF, De La Cruz C Jr, Weisse AB, Ahmed SS, Regan TJ. Arrhythmias and the \"Holiday Heart\": alcohol-associated cardiac rhythm disorders. Am Heart J. 1978;95(5):555-62. PMID 636996; doi:10.1016/0002-8703(78)90296-x.", "link": "https://doi.org/10.1016/0002-8703(78)90296-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "EverittRobbins2005", "text": "Everitt BJ, Robbins TW. Neural systems of reinforcement for drug addiction: from actions to habits to compulsion. Nat Neurosci. 2005;8(11):1481-9. PMID 16251991; doi:10.1038/nn1579.", "link": "https://doi.org/10.1038/nn1579", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ewing1984CAGE", "text": "Ewing JA. Detecting alcoholism. The CAGE questionnaire. JAMA. 1984;252(14):1905-7. PMID 6471323; doi:10.1001/jama.252.14.1905.", "link": "https://doi.org/10.1001/jama.252.14.1905", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Eyer2011", "text": "Eyer F, Schuster T, Felgenhauer N, Pfab R, Strubel T, Saugel B, et al. Risk assessment of moderate to severe alcohol withdrawal--predictors for seizures and delirium tremens in the course of withdrawal. Alcohol Alcohol. 2011;46(4):427-33. PMID 21593124; doi:10.1093/alcalc/agr053.", "link": "https://doi.org/10.1093/alcalc/agr053", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Fairbanks2020Mayo", "text": "Fairbanks J, Umbreit A, Kolla BP, Karpyak VM, Schneekloth TD, Loukianova LL, et al. Evidence-Based Pharmacotherapies for Alcohol Use Disorder: Clinical Pearls. Mayo Clin Proc. 2020;95(9):1964-1977. PMID 32446635; doi:10.1016/j.mayocp.2020.01.030.", "link": "https://doi.org/10.1016/j.mayocp.2020.01.030", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Falk2019GabapentinEnacarbil", "text": "Falk DE, Ryan ML, Fertig JB, Devine EG, Cruz R, Brown ES, et al. Gabapentin Enacarbil Extended-Release for Alcohol Use Disorder: A Randomized, Double-Blind, Placebo-Controlled, Multisite Trial Assessing Efficacy and Safety. Alcohol Clin Exp Res. 2019;43(1):158-169. PMID 30403402; PMCID PMC6317996; doi:10.1111/acer.13917.", "link": "https://doi.org/10.1111/acer.13917", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Favretto2026SoHT", "text": "Favretto D, Andraus M, Appenzeller BM, Barroso M, Binz TM, Cirimele V, et al. 2026 Consensus for the Use of Alcohol Markers in Hair for Supporting the Assessment of Abstinence and Chronic Alcohol Consumption. Drug Test Anal. 2026. PMID 42806274; doi:10.1002/dta.70158.", "link": "https://doi.org/10.1002/dta.70158", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Antabuse", "text": "Sigmapharm Laboratories, LLC. Disulfiram tablets (generic of Antabuse). US prescribing information. openFDA drug label set_id 40f5497f-fe84-43b2-8ff4-32d59edf3917, effective 2024-08-20. Boxed warning, indications, dosage, contraindications, warnings, precautions, adverse reactions and clinical pharmacology read.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Campral", "text": "Glenmark Pharmaceuticals Inc., USA. Acamprosate calcium delayed-release tablets (generic of Campral). US prescribing information. openFDA drug label set_id 43e9ef60-2d85-4394-906b-93042fea099a, effective 2026-01-23. Sections 1, 2, 4, 5, 6, 8, 12 and 14 read.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Chlordiazepoxide", "text": "PD-Rx Pharmaceuticals, Inc. Chlordiazepoxide hydrochloride capsules. US prescribing information, openFDA drug label set_id 3cbd7cee-c4d7-4c95-93d8-09428169b937, effective 2025-09-15.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-DrugsFDA-AUD", "text": "US Food and Drug Administration. Drugs@FDA application records via openFDA (api.fda.gov/drug/drugsfda.json): Antabuse NDA007883 (original approval 1951-08-28); Revia NDA018932 (original 1984-11-20; efficacy supplement 10 approved 1994-12-30); Campral NDA021431 (original 2004-07-29); Vivitrol NDA021897 (original 2006-04-13; efficacy supplement 15 approved 2010-10-12). Accessed 2026-11-04.", "link": "", "areas": ["A"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-LorazepamInj", "text": "Hospira, Inc. Lorazepam injection. US prescribing information, openFDA drug label set_id 20140b19-846b-425f-b191-670e17809945, effective 2026-07-10.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Naltrexone", "text": "SpecGx LLC. Naltrexone Hydrochloride Tablets, USP. US prescribing information (generic of ReVia). openFDA drug label set_id 06ff2d5a-e62b-4fa4-bbdb-01938535bc65, effective 2026-09-04. Indications, dosage, contraindications, warnings, precautions, adverse reactions, clinical pharmacology and pregnancy read; no boxed warning present.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Oxazepam", "text": "American Health Packaging. Oxazepam capsules. US prescribing information, openFDA drug label set_id 03440821-831c-4085-98f9-faa88e98c503, effective 2024-11-14.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-OxyContin", "text": "OXYCONTIN (oxycodone hydrochloride) extended-release tablets, US prescribing information (boxed warning: risks from concomitant use with benzodiazepines or other CNS depressants, including alcohol). NDA022272, effective 2026-06-24, set id bfdfe235-d717-4855-a3c8-a13d26dadede.", "link": "", "areas": ["G", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-ThiamineInj", "text": "HF Acquisition Co LLC, DBA HealthFirst. Thiamine hydrochloride injection, solution. US prescribing information, openFDA drug label set_id 06446e9a-0e85-0623-e063-6294a90ac403, effective 2026-05-07.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Tylenol", "text": "Kenvue Brands. TYLENOL Extra Strength (acetaminophen) OTC drug facts label (liver warning). Monograph M013, effective 2024-11-07, set id 015a6179-bacb-452d-b594-4de628ddc11d.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Valium", "text": "Roche Laboratories Inc. VALIUM (diazepam) tablets. US prescribing information, openFDA drug label set_id 554baee5-b171-4452-a50a-41a0946f956c, effective 2025-12-01.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Vivitrol", "text": "Alkermes, Inc. VIVITROL (naltrexone for extended-release injectable suspension). US prescribing information. openFDA drug label set_id cd11c435-b0f0-4bb9-ae78-60f101f3703f, effective 2026-05-31. Sections 1, 2, 4, 5, 6 (including Table 1), 8, 12 and 14 read; no boxed warning present.", "link": "", "areas": ["E", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Xanax", "text": "Pharmacia & Upjohn. XANAX (alprazolam) tablets, US prescribing information (boxed warning: abuse, misuse and addiction; concomitant use with opioids). NDA018276, effective 2023-01-18, set id 388e249d-b9b6-44c3-9f8f-880eced0239f.", "link": "", "areas": ["G", "H"], "unverified": false, "validated": "openFDA"}, {"key": "Fell2014BAC", "text": "Fell JC, Voas RB. The effectiveness of a 0.05 blood alcohol concentration (BAC) limit for driving in the United States. Addiction. 2014;109(6):869-74. PMID 24898061; PMCID PMC4448946; doi:10.1111/add.12365.", "link": "https://doi.org/10.1111/add.12365", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Fell2017", "text": "Fell JC, Scherer M. Estimation of the Potential Effectiveness of Lowering the Blood Alcohol Concentration (BAC) Limit for Driving from 0.08 to 0.05 Grams per Deciliter in the United States. Alcohol Clin Exp Res. 2017;41(12):2128-2139. PMID 29064571; PMCID PMC5790204; doi:10.1111/acer.13501.", "link": "https://doi.org/10.1111/acer.13501", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ferguson1996", "text": "Ferguson JA, Suelzer CJ, Eckert GJ, Zhou XH, Dittus RS. Risk factors for delirium tremens development. J Gen Intern Med. 1996;11(7):410-4. PMID 8842933; doi:10.1007/BF02600188.", "link": "https://doi.org/10.1007/bf02600188", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "FernandezSola2015NRC", "text": "Fernández-Solà J. Cardiovascular risks and benefits of moderate and heavy alcohol consumption. Nat Rev Cardiol. 2015;12(10):576-87. PMID 26099843; doi:10.1038/nrcardio.2015.91.", "link": "https://doi.org/10.1038/nrcardio.2015.91", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fleury2016", "text": "Fleury MJ, Djouini A, Huỳnh C, Tremblay J, Ferland F, Ménard JM, et al. Remission from substance use disorders: A systematic review and meta-analysis. Drug Alcohol Depend. 2016;168:293-306. PMID 27614380; doi:10.1016/j.drugalcdep.2016.08.625.", "link": "https://doi.org/10.1016/j.drugalcdep.2016.08.625", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Florineth2026", "text": "Florineth GA, Boeker AL, Bracht T, Wopfner A, Denier N, Adorjan K, et al. Efficacy and safety of psilocybin-assisted therapy for alcohol use disorder: A systematic review and meta-analysis. J Psychopharmacol. 2026:2698811261490221 (epub ahead of print). PMID 42850948; doi:10.1177/02698811261490221.", "link": "https://doi.org/10.1177/02698811261490221", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Foa2013", "text": "Foa EB, Yusko DA, McLean CP, Suvak MK, Bux DA Jr, Oslin D, et al. Concurrent naltrexone and prolonged exposure therapy for patients with comorbid alcohol dependence and PTSD: a randomized clinical trial. JAMA. 2013;310(5):488-95. PMID 23925619; doi:10.1001/jama.2013.8268.", "link": "https://doi.org/10.1001/jama.2013.8268", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Frezza1990", "text": "Frezza M, di Padova C, Pozzato G, Terpin M, Baraona E, Lieber CS. High blood alcohol levels in women. The role of decreased gastric alcohol dehydrogenase activity and first-pass metabolism. N Engl J Med. 1990;322(2):95-9. PMID 2248624; doi:10.1056/NEJM199001113220205.", "link": "https://doi.org/10.1056/nejm199001113220205", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fuller1986VA", "text": "Fuller RK, Branchey L, Brightwell DR, Derman RM, Emrick CD, Iber FL, et al. Disulfiram treatment of alcoholism. A Veterans Administration cooperative study. JAMA. 1986;256(11):1449-1455. PMID 3528541.", "link": "https://pubmed.ncbi.nlm.nih.gov/3528541/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Galvin2010EFNS", "text": "Galvin R, Bråthen G, Ivashynka A, Hillbom M, Tanasescu R, Leone MA. EFNS guidelines for diagnosis, therapy and prevention of Wernicke encephalopathy. Eur J Neurol. 2010;17(12):1408-18. PMID 20642790; doi:10.1111/j.1468-1331.2010.03153.x.", "link": "https://doi.org/10.1111/j.1468-1331.2010.03153.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Garbutt2005JAMA", "text": "Garbutt JC, Kranzler HR, O'Malley SS, Gastfriend DR, Pettinati HM, Silverman BL, et al. Efficacy and tolerability of long-acting injectable naltrexone for alcohol dependence: a randomized controlled trial. JAMA. 2005;293(13):1617-1625. PMID 15811981; doi:10.1001/jama.293.13.1617.", "link": "https://doi.org/10.1001/jama.293.13.1617", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2016AlcDrug", "text": "GBD 2016 Alcohol and Drug Use Collaborators. The global burden of disease attributable to alcohol and drug use in 195 countries and territories, 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet Psychiatry. 2018;5(12):987-1012. PMID 30392731; PMCID PMC6251968; doi:10.1016/S2215-0366(18)30337-7.", "link": "https://doi.org/10.1016/s2215-0366(18)30337-7", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2016Alcohol", "text": "GBD 2016 Alcohol Collaborators. Alcohol use and burden for 195 countries and territories, 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet. 2018;392(10152):1015-1035. PMID 30146330; PMCID PMC6148333; doi:10.1016/S0140-6736(18)31310-2.", "link": "https://doi.org/10.1016/s0140-6736(18)31310-2", "areas": ["A", "B", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2017Cirrhosis", "text": "GBD 2017 Cirrhosis Collaborators. The global, regional, and national burden of cirrhosis by cause in 195 countries and territories, 1990-2017: a systematic analysis for the Global Burden of Disease Study 2017. Lancet Gastroenterol Hepatol. 2020;5(3):245-266. PMID 31981519; PMCID PMC7026710; doi:10.1016/S2468-1253(19)30349-8.", "link": "https://doi.org/10.1016/s2468-1253(19)30349-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2020Alcohol", "text": "GBD 2020 Alcohol Collaborators. Population-level risks of alcohol consumption by amount, geography, age, sex, and year: a systematic analysis for the Global Burden of Disease Study 2020. Lancet. 2022;400(10347):185-235. PMID 35843246; PMCID PMC9289789; doi:10.1016/S0140-6736(22)00847-9.", "link": "https://doi.org/10.1016/s0140-6736(22)00847-9", "areas": ["A", "B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Gentilello1999Trauma", "text": "Gentilello LM, Rivara FP, Donovan DM, Jurkovich GJ, Daranciang E, Dunn CW, et al. Alcohol interventions in a trauma center as a means of reducing the risk of injury recurrence. Ann Surg. 1999;230(4):473-80; discussion 480-3. PMID 10522717; PMCID PMC1420896; doi:10.1097/00000658-199910000-00003.", "link": "https://doi.org/10.1097/00000658-199910000-00003", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Glass2015Referral", "text": "Glass JE, Hamilton AM, Powell BJ, Perron BE, Brown RT, Ilgen MA. Specialty substance use disorder services following brief alcohol intervention: a meta-analysis of randomized controlled trials. Addiction. 2015;110(9):1404-15. PMID 25913697; PMCID PMC4753046; doi:10.1111/add.12950.", "link": "https://doi.org/10.1111/add.12950", "areas": ["C", "F"], "unverified": false, "validated": "PubMed", "aliases": ["Glass2015"]}, {"key": "Gold2007CCM", "text": "Gold JA, Rimal B, Nolan A, Nelson LS. A strategy of escalating doses of benzodiazepines and phenobarbital administration reduces the need for mechanical ventilation in delirium tremens. Crit Care Med. 2007;35(3):724-30. PMID 17255852; PMCID PMC3417045; doi:10.1097/01.CCM.0000256841.28351.80.", "link": "https://doi.org/10.1097/01.ccm.0000256841.28351.80", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Goodson2014", "text": "Goodson CM, Clark BJ, Douglas IS. Predictors of severe alcohol withdrawal syndrome: a systematic review and meta-analysis. Alcohol Clin Exp Res. 2014;38(10):2664-77. PMID 25346507; doi:10.1111/acer.12529.", "link": "https://doi.org/10.1111/acer.12529", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gosdin2022MMWR", "text": "Gosdin LK, Deputy NP, Kim SY, Dang EP, Denny CH. Alcohol Consumption and Binge Drinking During Pregnancy Among Adults Aged 18-49 Years - United States, 2018-2020. MMWR Morb Mortal Wkly Rep. 2022;71(1):10-13. PMID 34990444; PMCID PMC8735564; doi:10.15585/mmwr.mm7101a2.", "link": "https://doi.org/10.15585/mmwr.mm7101a2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Grabski2022", "text": "Grabski M, McAndrew A, Lawn W, Marsh B, Raymen L, Stevens T, et al. Adjunctive Ketamine With Relapse Prevention-Based Psychological Therapy in the Treatment of Alcohol Use Disorder. Am J Psychiatry. 2022;179(2):152-162. PMID 35012326; doi:10.1176/appi.ajp.2021.21030277.", "link": "https://doi.org/10.1176/appi.ajp.2021.21030277", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2015NESARC", "text": "Grant BF, Goldstein RB, Saha TD, Chou SP, Jung J, Zhang H, et al. Epidemiology of DSM-5 Alcohol Use Disorder: Results From the National Epidemiologic Survey on Alcohol and Related Conditions III. JAMA Psychiatry. 2015;72(8):757-66. PMID 26039070; PMCID PMC5240584; doi:10.1001/jamapsychiatry.2015.0584.", "link": "https://doi.org/10.1001/jamapsychiatry.2015.0584", "areas": ["A", "C", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2016DUD", "text": "Grant BF, Saha TD, Ruan WJ, Goldstein RB, Chou SP, Jung J, et al. Epidemiology of DSM-5 Drug Use Disorder: Results From the National Epidemiologic Survey on Alcohol and Related Conditions-III. JAMA Psychiatry. 2016;73(1):39-47. PMID 26580136; PMCID PMC5062605; doi:10.1001/jamapsychiatry.2015.2132.", "link": "https://doi.org/10.1001/jamapsychiatry.2015.2132", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Grant2017JAMAPsych", "text": "Grant BF, Chou SP, Saha TD, Pickering RP, Kerridge BT, Ruan WJ, et al. Prevalence of 12-Month Alcohol Use, High-Risk Drinking, and DSM-IV Alcohol Use Disorder in the United States, 2001-2002 to 2012-2013: Results From the National Epidemiologic Survey on Alcohol and Related Conditions. JAMA Psychiatry. 2017;74(9):911-923. PMID 28793133; PMCID PMC5710229; doi:10.1001/jamapsychiatry.2017.2161.", "link": "https://doi.org/10.1001/jamapsychiatry.2017.2161", "areas": ["A", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Grant2017JAMAPsychiatry"]}, {"key": "GrantDawson1997", "text": "Grant BF, Dawson DA. Age at onset of alcohol use and its association with DSM-IV alcohol abuse and dependence: results from the National Longitudinal Alcohol Epidemiologic Survey. J Subst Abuse. 1997;9:103-10. PMID 9494942; doi:10.1016/s0899-3289(97)90009-2.", "link": "https://doi.org/10.1016/s0899-3289(97)90009-2", "areas": ["B", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Grant1997"]}, {"key": "Green2022PCP", "text": "Green PP, Cummings NA, Ward BW, McKnight-Eily LR. Alcohol Screening and Brief Intervention: Office-Based Primary Care Physicians, U.S., 2015-2016. Am J Prev Med. 2022;62(2):219-226. PMID 34774391; PMCID PMC9080450; doi:10.1016/j.amepre.2021.07.013.", "link": "https://doi.org/10.1016/j.amepre.2021.07.013", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gross2010AA", "text": "Gross M. Alcoholics Anonymous: still sober after 75 years. 1935. Am J Public Health. 2010;100(12):2361-3. PMID 21068418; PMCID PMC2978172; doi:10.2105/AJPH.2010.199349.", "link": "https://doi.org/10.2105/ajph.2010.199349", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gual2013ESENSE2", "text": "Gual A, He Y, Torup L, van den Brink W, Mann K; ESENSE 2 Study Group. A randomised, double-blind, placebo-controlled, efficacy study of nalmefene, as-needed use, in patients with alcohol dependence. Eur Neuropsychopharmacol. 2013;23(11):1432-1442. PMID 23562264; doi:10.1016/j.euroneuro.2013.02.006.", "link": "https://doi.org/10.1016/j.euroneuro.2013.02.006", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Guiraud2022SMO", "text": "Guiraud J, Addolorato G, Antonelli M, Aubin HJ, de Bejczy A, Benyamina A, et al. Sodium oxybate for the maintenance of abstinence in alcohol-dependent patients: An international, multicenter, randomized, double-blind, placebo-controlled trial. J Psychopharmacol. 2022;36(10):1136-1145. PMID 35796481; PMCID PMC9548946; doi:10.1177/02698811221104063.", "link": "https://doi.org/10.1177/02698811221104063", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Gustafson2014", "text": "Gustafson DH, McTavish FM, Chih MY, Atwood AK, Johnson RA, Boyle MG, et al. A smartphone application to support recovery from alcoholism: a randomized clinical trial. JAMA Psychiatry. 2014;71(5):566-72. PMID 24671165; PMCID PMC4016167; doi:10.1001/jamapsychiatry.2013.4642.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.4642", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "HaassKoffler2023", "text": "Haass-Koffler CL, Magill M, Cannella N, Brown JC, Aoun EG, Cioe PA, et al. Mifepristone as a pharmacological intervention for stress-induced alcohol craving: A human laboratory study. Addict Biol. 2023;28(7):e13288. PMID 37369125; PMCID PMC10313137; doi:10.1111/adb.13288.", "link": "https://doi.org/10.1111/adb.13288", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Haastrup2014BCPT", "text": "Haastrup MB, Pottegård A, Damkier P. Alcohol and breastfeeding. Basic Clin Pharmacol Toxicol. 2014;114(2):168-73. PMID 24118767; doi:10.1111/bcpt.12149.", "link": "https://doi.org/10.1111/bcpt.12149", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hagman2022", "text": "Hagman BT, Falk D, Litten R, Koob GF. Defining Recovery From Alcohol Use Disorder: Development of an NIAAA Research Definition. Am J Psychiatry. 2022;179(11):807-813. PMID 35410494; doi:10.1176/appi.ajp.21090963.", "link": "https://doi.org/10.1176/appi.ajp.21090963", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hahn2016PEth", "text": "Hahn JA, Anton RF, Javors MA. The Formation, Elimination, Interpretation, and Future Research Needs of Phosphatidylethanol for Research Studies and Clinical Practice. Alcohol Clin Exp Res. 2016;40(11):2292-2295. PMID 27716960; PMCID PMC5117827; doi:10.1111/acer.13213.", "link": "https://doi.org/10.1111/acer.13213", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hald1948", "text": "Hald J, Jacobsen E. A drug sensitizing the organism to ethyl alcohol. Lancet. 1948;2(6539):1001-4. PMID 18103475; doi:10.1016/s0140-6736(48)91514-1.", "link": "https://doi.org/10.1016/s0140-6736(48)91514-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hamajima2002BJC", "text": "Hamajima N, Hirose K, Tajima K, Rohan T, Calle EE, Heath CW Jr, et al. Alcohol, tobacco and breast cancer--collaborative reanalysis of individual data from 53 epidemiological studies, including 58,515 women with breast cancer and 95,067 women without the disease. Br J Cancer. 2002;87(11):1234-45. PMID 12439712; PMCID PMC2562507; doi:10.1038/sj.bjc.6600596.", "link": "https://doi.org/10.1038/sj.bjc.6600596", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Han2017Older", "text": "Han BH, Moore AA, Sherman S, Keyes KM, Palamar JJ. Demographic trends of binge alcohol use and alcohol use disorders among older adults in the United States, 2005-2014. Drug Alcohol Depend. 2017;170:198-207. PMID 27979428; PMCID PMC5241162; doi:10.1016/j.drugalcdep.2016.11.003.", "link": "https://doi.org/10.1016/j.drugalcdep.2016.11.003", "areas": ["A", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Han2017"]}, {"key": "Han2021JAMAPsych", "text": "Han B, Jones CM, Einstein EB, Powell PA, Compton WM. Use of Medications for Alcohol Use Disorder in the US: Results From the 2019 National Survey on Drug Use and Health. JAMA Psychiatry. 2021;78(8):922-924. PMID 34132744; PMCID PMC8209593; doi:10.1001/jamapsychiatry.2021.1271. Record validated; body text not accessible, so the 1.6% figure is unverified.", "link": "https://doi.org/10.1001/jamapsychiatry.2021.1271", "areas": ["E"], "unverified": true, "validated": "PubMed"}, {"key": "Han2026NSDUH", "text": "Han B, Compton WM, Hobin JA, Volkow ND. Trends in the Prevalence and Severity of Alcohol and Cannabis Use Disorders Among US Adults. JAMA Psychiatry. 2026;83(10):1056-1061. PMID 42616541; PMCID PMC13491236; doi:10.1001/jamapsychiatry.2026.2497.", "link": "https://doi.org/10.1001/jamapsychiatry.2026.2497", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Harel2022", "text": "Harel M, Perini I, Kämpe R, Alyagon U, Shalev H, Besser I, et al. Repetitive Transcranial Magnetic Stimulation in Alcohol Dependence: A Randomized, Double-Blind, Sham-Controlled Proof-of-Concept Trial Targeting the Medial Prefrontal and Anterior Cingulate Cortices. Biol Psychiatry. 2022;91(12):1061-1069. PMID 35067356; doi:10.1016/j.biopsych.2021.11.020.", "link": "https://doi.org/10.1016/j.biopsych.2021.11.020", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Harper1979JNNP", "text": "Harper C. Wernicke's encephalopathy: a more common disease than realised. A neuropathological study of 51 cases. J Neurol Neurosurg Psychiatry. 1979;42(3):226-31. PMID 438830; PMCID PMC490724; doi:10.1136/jnnp.42.3.226.", "link": "https://doi.org/10.1136/jnnp.42.3.226", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harper1986JNNP", "text": "Harper CG, Giles M, Finlay-Jones R. Clinical signs in the Wernicke-Korsakoff complex: a retrospective analysis of 131 cases diagnosed at necropsy. J Neurol Neurosurg Psychiatry. 1986;49(4):341-5. PMID 3701343; PMCID PMC1028756; doi:10.1136/jnnp.49.4.341.", "link": "https://doi.org/10.1136/jnnp.49.4.341", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harper1998MJA", "text": "Harper CG, Sheedy DL, Lara AI, Garrick TM, Hilton JM, Raisanen J. Prevalence of Wernicke-Korsakoff syndrome in Australia: has thiamine fortification made a difference? Med J Aust. 1998;168(11):542-5. PMID 9640303; PMCID PMC3391549; doi:10.5694/j.1326-5377.1998.tb139081.x.", "link": "https://doi.org/10.5694/j.1326-5377.1998.tb139081.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hartwell2020", "text": "Hartwell EE, Feinn R, Morris PE, Gelernter J, Krystal J, Arias AJ, et al. Systematic review and meta-analysis of the moderating effect of rs1799971 in OPRM1, the mu-opioid receptor gene, on response to naltrexone treatment of alcohol use disorder. Addiction. 2020;115(8):1426-1437. PMID 31961981; PMCID PMC7340566; doi:10.1111/add.14975.", "link": "https://doi.org/10.1111/add.14975", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hasin2013", "text": "Hasin DS, O'Brien CP, Auriacombe M, Borges G, Bucholz K, Budney A, et al. DSM-5 criteria for substance use disorders: recommendations and rationale. Am J Psychiatry. 2013;170(8):834-51. PMID 23903334; PMCID PMC3767415; doi:10.1176/appi.ajp.2013.12060782.", "link": "https://doi.org/10.1176/appi.ajp.2013.12060782", "areas": ["A", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Hasin2013DSM5"]}, {"key": "Hasin2017WHO", "text": "Hasin DS, Wall M, Witkiewitz K, Kranzler HR, Falk D, Litten R, et al. Change in non-abstinent WHO drinking risk levels and alcohol dependence: a 3 year follow-up study in the US general population. Lancet Psychiatry. 2017;4(6):469-476. PMID 28456501; PMCID PMC5536861; doi:10.1016/S2215-0366(17)30130-X.", "link": "https://doi.org/10.1016/s2215-0366(17)30130-x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hecksel2008", "text": "Hecksel KA, Bostwick JM, Jaeger TM, Cha SS. Inappropriate use of symptom-triggered therapy for alcohol withdrawal in the general hospital. Mayo Clin Proc. 2008;83(3):274-9. PMID 18315992; doi:10.4065/83.3.274.", "link": "https://doi.org/10.4065/83.3.274", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "HeiligKoob2007", "text": "Heilig M, Koob GF. A key role for corticotropin-releasing factor in alcohol dependence. Trends Neurosci. 2007;30(8):399-406. PMID 17629579; PMCID PMC2747092; doi:10.1016/j.tins.2007.06.006.", "link": "https://doi.org/10.1016/j.tins.2007.06.006", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Helander2009EtG", "text": "Helander A, Böttcher M, Fehr C, Dahmen N, Beck O. Detection times for urinary ethyl glucuronide and ethyl sulfate in heavy drinkers during alcohol detoxification. Alcohol Alcohol. 2009;44(1):55-61. PMID 18971292; doi:10.1093/alcalc/agn084.", "link": "https://doi.org/10.1093/alcalc/agn084", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Helander2019PEthDose", "text": "Helander A, Hermansson U, Beck O. Dose-Response Characteristics of the Alcohol Biomarker Phosphatidylethanol (PEth)-A Study of Outpatients in Treatment for Reduced Drinking. Alcohol Alcohol. 2019;54(6):567-573. PMID 31529064; doi:10.1093/alcalc/agz064.", "link": "https://doi.org/10.1093/alcalc/agz064", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Helander2019PEthElimination", "text": "Helander A, Böttcher M, Dahmen N, Beck O. Elimination Characteristics of the Alcohol Biomarker Phosphatidylethanol (PEth) in Blood during Alcohol Detoxification. Alcohol Alcohol. 2019;54(3):251-257. PMID 30968936; PMCID PMC7011165; doi:10.1093/alcalc/agz027.", "link": "https://doi.org/10.1093/alcalc/agz027", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hendershot2025Semaglutide", "text": "Hendershot CS, Bremmer MP, Paladino MB, Kostantinis G, Gilmore TA, Sullivan NR, et al. Once-Weekly Semaglutide in Adults With Alcohol Use Disorder: A Randomized Clinical Trial. JAMA Psychiatry. 2025;82(4):395-405. PMID 39937469; PMCID PMC11822619; doi:10.1001/jamapsychiatry.2024.4789.", "link": "https://doi.org/10.1001/jamapsychiatry.2024.4789", "areas": ["E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Hendershot2025"]}, {"key": "Hendey2011", "text": "Hendey GW, Dery RA, Barnes RL, Snowden B, Mentler P. A prospective, randomized, trial of phenobarbital versus benzodiazepines for acute alcohol withdrawal. Am J Emerg Med. 2011;29(4):382-5. PMID 20825805; doi:10.1016/j.ajem.2009.10.010.", "link": "https://doi.org/10.1016/j.ajem.2009.10.010", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hietala2006GGTCDT", "text": "Hietala J, Koivisto H, Anttila P, Niemelä O. Comparison of the combined marker GGT-CDT and the conventional laboratory markers of alcohol abuse in heavy drinkers, moderate drinkers and abstainers. Alcohol Alcohol. 2006;41(5):528-33. PMID 16799164; doi:10.1093/alcalc/agl050.", "link": "https://doi.org/10.1093/alcalc/agl050", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "HigginsBiddle2018USAUDIT", "text": "Higgins-Biddle JC, Babor TF. A review of the Alcohol Use Disorders Identification Test (AUDIT), AUDIT-C, and USAUDIT for screening in the United States: Past issues and future directions. Am J Drug Alcohol Abuse. 2018;44(6):578-586. PMID 29723083; PMCID PMC6217805; doi:10.1080/00952990.2018.1456545.", "link": "https://doi.org/10.1080/00952990.2018.1456545", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hillbom2003", "text": "Hillbom M, Pieninkeroinen I, Leone M. Seizures in alcohol-dependent patients: epidemiology, pathophysiology and management. CNS Drugs. 2003;17(14):1013-30. PMID 14594442; doi:10.2165/00023210-200317140-00002.", "link": "https://doi.org/10.2165/00023210-200317140-00002", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hingson2006", "text": "Hingson RW, Heeren T, Winter MR. Age at drinking onset and alcohol dependence: age at onset, duration, and severity. Arch Pediatr Adolesc Med. 2006;160(7):739-46. PMID 16818840; doi:10.1001/archpedi.160.7.739.", "link": "https://doi.org/10.1001/archpedi.160.7.739", "areas": ["B", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Hingson2006Arch"]}, {"key": "Hingson2006Peds", "text": "Hingson RW, Heeren T, Winter MR. Age of alcohol-dependence onset: associations with severity of dependence and seeking treatment. Pediatrics. 2006;118(3):e755-63. PMID 16950966; doi:10.1542/peds.2006-0223.", "link": "https://doi.org/10.1542/peds.2006-0223", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hodgson2002FAST", "text": "Hodgson R, Alwyn T, John B, Thom B, Smith A. The FAST Alcohol Screening Test. Alcohol Alcohol. 2002;37(1):61-6. PMID 11825859; doi:10.1093/alcalc/37.1.61.", "link": "https://doi.org/10.1093/alcalc/37.1.61", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hofer2026JHep", "text": "Hofer BS, Tonon M, Buttler L, Camões Neves J, Herms Q, Pompili E, et al. Incidence and implications of abstinence-induced recompensation in alcohol-related cirrhosis. J Hepatol. 2026;84(6):1077-1088. PMID 41580090; doi:10.1016/j.jhep.2026.01.007.", "link": "https://doi.org/10.1016/j.jhep.2026.01.007", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Holmes2014BMJ", "text": "Holmes MV, Dale CE, Zuccolo L, Silverwood RJ, Guo Y, Ye Z, et al. Association between alcohol and cardiovascular disease: Mendelian randomisation analysis based on individual participant data. BMJ. 2014;349:g4164. PMID 25011450; PMCID PMC4091648; doi:10.1136/bmj.g4164.", "link": "https://doi.org/10.1136/bmj.g4164", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Hon2018", "text": "Hon KL, Leung AK, Cheung E, Lee B, Tsang MM, Torres AR. An overview of exposure to ethanol-containing substances and ethanol intoxication in children based on three illustrated cases. Drugs Context. 2018;7:212512. PMID 29344053; PMCID PMC5764489; doi:10.7573/dic.212512.", "link": "https://doi.org/10.7573/dic.212512", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hoyme2016Pediatrics", "text": "Hoyme HE, Kalberg WO, Elliott AJ, Blankenship J, Buckley D, Marais AS, et al. Updated Clinical Guidelines for Diagnosing Fetal Alcohol Spectrum Disorders. Pediatrics. 2016;138(2):e20154256. PMID 27464676; PMCID PMC4960726; doi:10.1542/peds.2015-4256.", "link": "https://doi.org/10.1542/peds.2015-4256", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Humphreys2001Cost", "text": "Humphreys K, Moos R. Can encouraging substance abuse patients to participate in self-help groups reduce demand for health care? A quasi-experimental study. Alcohol Clin Exp Res. 2001;25(5):711-6. PMID 11371720. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/11371720/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Humphreys2007Cost", "text": "Humphreys K, Moos RH. Encouraging posttreatment self-help group involvement to reduce demand for continuing care services: two-year clinical and utilization outcomes. Alcohol Clin Exp Res. 2007;31(1):64-8. PMID 17207103; doi:10.1111/j.1530-0277.2006.00273.x.", "link": "https://doi.org/10.1111/j.1530-0277.2006.00273.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Humphreys2014IV", "text": "Humphreys K, Blodgett JC, Wagner TH. Estimating the efficacy of Alcoholics Anonymous without self-selection bias: an instrumental variables re-analysis of randomized clinical trials. Alcohol Clin Exp Res. 2014;38(11):2688-94. PMID 25421504; PMCID PMC4285560; doi:10.1111/acer.12557.", "link": "https://doi.org/10.1111/acer.12557", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hunt1973", "text": "Hunt GM, Azrin NH. A community-reinforcement approach to alcoholism. Behav Res Ther. 1973;11(1):91-104. PMID 4781962; doi:10.1016/0005-7967(73)90072-7.", "link": "https://doi.org/10.1016/0005-7967(73)90072-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hunt2016", "text": "Hunt GE, Malhi GS, Cleary M, Lai HM, Sitharthan T. Prevalence of comorbid bipolar and substance use disorders in clinical settings, 1990-2015: Systematic review and meta-analysis. J Affect Disord. 2016;206:331-349. PMID 27476137; doi:10.1016/j.jad.2016.07.011.", "link": "https://doi.org/10.1016/j.jad.2016.07.011", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Inouye1990", "text": "Inouye SK, van Dyck CH, Alessi CA, et al. Clarifying confusion: the confusion assessment method. A new method for detection of delirium. Ann Intern Med. 1990;113(12):941-948. PMID 2240918. doi:10.7326/0003-4819-113-12-941.", "link": "https://doi.org/10.7326/0003-4819-113-12-941", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Irvin1999", "text": "Irvin JE, Bowers CA, Dunn ME, Wang MC. Efficacy of relapse prevention: a meta-analytic review. J Consult Clin Psychol. 1999;67(4):563-70. PMID 10450627; doi:10.1037//0022-006x.67.4.563.", "link": "https://doi.org/10.1037//0022-006x.67.4.563", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Irving2009JOP", "text": "Irving HM, Samokhvalov AV, Rehm J. Alcohol as a risk factor for pancreatitis. A systematic review and meta-analysis. JOP. 2009;10(4):387-92. PMID 19581740; PMCID PMC3299482.", "link": "https://pubmed.ncbi.nlm.nih.gov/19581740/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "IsenbergGrzeda2012", "text": "Isenberg-Grzeda E, Kutner HE, Nicolson SE. Wernicke-Korsakoff-syndrome: under-recognized and under-treated. Psychosomatics. 2012;53(6):507-16. PMID 23157990; doi:10.1016/j.psym.2012.04.008.", "link": "https://doi.org/10.1016/j.psym.2012.04.008", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Jang2017", "text": "Jang JB, Patrick ME, Keyes KM, Hamilton AD, Schulenberg JE. Frequent Binge Drinking Among US Adolescents, 1991 to 2015. Pediatrics. 2017;139(6):e20164023. PMID 28562275; PMCID PMC5470505; doi:10.1542/peds.2016-4023.", "link": "https://doi.org/10.1542/peds.2016-4023", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Jason2007", "text": "Jason LA, Olson BD, Ferrari JR, Majer JM, Alvarez J, Stout J. An examination of main and interactive effects of substance abuse recovery housing on multiple indicators of adjustment. Addiction. 2007;102(7):1114-21. PMID 17567399; PMCID PMC2976482; doi:10.1111/j.1360-0443.2007.01846.x.", "link": "https://doi.org/10.1111/j.1360-0443.2007.01846.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Jasti2025", "text": "Jasti J, Sherman K, Gummin D, Farkas A. Prevalence of Wernicke's Encephalopathy When Receiving Dextrose Before Thiamine: A National Study of Veterans. Acad Emerg Med. 2025;32(11):1197-1202. PMID 40873301; doi:10.1111/acem.70131.", "link": "https://doi.org/10.1111/acem.70131", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Jatlow2010EtG", "text": "Jatlow P, O'Malley SS. Clinical (nonforensic) application of ethyl glucuronide measurement: are we ready? Alcohol Clin Exp Res. 2010;34(6):968-75. PMID 20374218; PMCID PMC3711108; doi:10.1111/j.1530-0277.2010.01171.x.", "link": "https://doi.org/10.1111/j.1530-0277.2010.01171.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Jatlow2014EtG", "text": "Jatlow PI, Agro A, Wu R, Nadim H, Toll BA, Ralevski E, et al. Ethyl glucuronide and ethyl sulfate assays in clinical trials, interpretation, and limitations: results of a dose ranging alcohol challenge study and 2 clinical trials. Alcohol Clin Exp Res. 2014;38(7):2056-65. PMID 24773137; PMCID PMC4107122; doi:10.1111/acer.12407.", "link": "https://doi.org/10.1111/acer.12407", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Javors2016PEth", "text": "Javors MA, Hill-Kapturczak N, Roache JD, Karns-Wright TE, Dougherty DM. Characterization of the Pharmacokinetics of Phosphatidylethanol 16:0/18:1 and 16:0/18:2 in Human Whole Blood After Alcohol Consumption in a Clinical Laboratory Study. Alcohol Clin Exp Res. 2016;40(6):1228-34. PMID 27130527; PMCID PMC4939838; doi:10.1111/acer.13062.", "link": "https://doi.org/10.1111/acer.13062", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Jesse2017", "text": "Jesse S, Bråthen G, Ferrara M, Keindl M, Ben-Menachem E, Tanasescu R, et al. Alcohol withdrawal syndrome: mechanisms, manifestations, and management. Acta Neurol Scand. 2017;135(1):4-16. PMID 27586815; PMCID PMC6084325; doi:10.1111/ane.12671.", "link": "https://doi.org/10.1111/ane.12671", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2000JAMA", "text": "Johnson BA, Roache JD, Javors MA, DiClemente CC, Cloninger CR, Prihoda TJ, et al. Ondansetron for reduction of drinking among biologically predisposed alcoholic patients: A randomized controlled trial. JAMA. 2000;284(8):963-971. PMID 10944641; doi:10.1001/jama.284.8.963.", "link": "https://doi.org/10.1001/jama.284.8.963", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2003Lancet", "text": "Johnson BA, Ait-Daoud N, Bowden CL, DiClemente CC, Roache JD, Lawson K, et al. Oral topiramate for treatment of alcohol dependence: a randomised controlled trial. Lancet. 2003;361(9370):1677-1685. PMID 12767733; doi:10.1016/S0140-6736(03)13370-3.", "link": "https://doi.org/10.1016/s0140-6736(03)13370-3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2007Topiramate", "text": "Johnson BA, Rosenthal N, Capece JA, Wiegand F, Mao L, Beyers K, et al. Topiramate for treating alcohol dependence: a randomized controlled trial. JAMA. 2007;298(14):1641-1651. PMID 17925516; doi:10.1001/jama.298.14.1641.", "link": "https://doi.org/10.1001/jama.298.14.1641", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2011Ondansetron", "text": "Johnson BA, Ait-Daoud N, Seneviratne C, Roache JD, Javors MA, Wang XQ, et al. Pharmacogenetic approach at the serotonin transporter gene as a method of reducing the severity of alcohol drinking. Am J Psychiatry. 2011;168(3):265-275. PMID 21247998; PMCID PMC3063997; doi:10.1176/appi.ajp.2010.10050755.", "link": "https://doi.org/10.1176/appi.ajp.2010.10050755", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2013", "text": "Johnson BA, Seneviratne C, Wang XQ, Ait-Daoud N, Li MD. Determination of genotype combinations that can predict the outcome of the treatment of alcohol dependence using the 5-HT(3) antagonist ondansetron. Am J Psychiatry. 2013;170(9):1020-31. PMID 23897038; PMCID PMC3809153; doi:10.1176/appi.ajp.2013.12091163.", "link": "https://doi.org/10.1176/appi.ajp.2013.12091163", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jonas2014JAMA", "text": "Jonas DE, Amick HR, Feltner C, Bobashev G, Thomas K, Wines R, et al. Pharmacotherapy for adults with alcohol use disorders in outpatient settings: a systematic review and meta-analysis. JAMA. 2014;311(18):1889-1900. PMID 24825644; doi:10.1001/jama.2014.3628.", "link": "https://doi.org/10.1001/jama.2014.3628", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jones1992Detox", "text": "Jones AW, Sternebring B. Kinetics of ethanol and methanol in alcoholics during detoxification. Alcohol Alcohol. 1992;27(6):641-7. PMID 1292437; doi:10.1093/oxfordjournals.alcalc.a045315.", "link": "https://doi.org/10.1093/oxfordjournals.alcalc.a045315", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jones1994Food", "text": "Jones AW, Jönsson KA. Food-induced lowering of blood-ethanol profiles and increased rate of elimination immediately after a meal. J Forensic Sci. 1994;39(4):1084-93. PMID 8064267; doi:10.1520/JFS13687J.", "link": "https://doi.org/10.1520/jfs13687j", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jones2010", "text": "Jones AW. Evidence-based survey of the elimination rates of ethanol from blood with applications in forensic casework. Forensic Sci Int. 2010;200(1-3):1-20. PMID 20304569; doi:10.1016/j.forsciint.2010.02.021.", "link": "https://doi.org/10.1016/j.forsciint.2010.02.021", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Jones2010Elimination"]}, {"key": "Jones2019WIREs", "text": "Jones AW. Alcohol, its absorption, distribution, metabolism, and excretion in the body and pharmacokinetic calculations. WIREs Forensic Sci. 2019;1(5):e1340. doi:10.1002/wfs2.1340. Not indexed in PubMed.", "link": "https://doi.org/10.1002/wfs2.1340", "areas": ["B"], "unverified": false, "validated": "Crossref"}, {"key": "Jones2024BiomarkerHistory", "text": "Jones AW. Brief history of the alcohol biomarkers CDT, EtG, EtS, 5-HTOL, and PEth. Drug Test Anal. 2024;16(6):570-587. PMID 37806783; doi:10.1002/dta.3584.", "link": "https://doi.org/10.1002/dta.3584", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Jophlin2024ACG", "text": "Jophlin LL, Singal AK, Bataller R, Wong RJ, Sauer BG, Terrault NA, et al. ACG Clinical Guideline: Alcohol-Associated Liver Disease. Am J Gastroenterol. 2024;119(1):30-54. PMID 38174913; PMCID PMC11040545; doi:10.14309/ajg.0000000000002572. Full text read on PMC.", "link": "https://doi.org/10.14309/ajg.0000000000002572", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Jung2014", "text": "Jung YC, Namkoong K. Alcohol: intoxication and poisoning - diagnosis and treatment. Handb Clin Neurol. 2014;125:115-21. PMID 25307571; doi:10.1016/B978-0-444-62619-6.00007-0.", "link": "https://doi.org/10.1016/b978-0-444-62619-6.00007-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kalinowski2016", "text": "Kalinowski A, Humphreys K. Governmental standard drink definitions and low-risk alcohol consumption guidelines in 37 countries. Addiction. 2016;111(7):1293-8. PMID 27073140; doi:10.1111/add.13341.", "link": "https://doi.org/10.1111/add.13341", "areas": ["A", "B"], "unverified": false, "validated": "PubMed"}, {"key": "Kamath2001MELD", "text": "Kamath PS, Wiesner RH, Malinchoc M, Kremers W, Therneau TM, Kosberg CL, et al. A model to predict survival in patients with end-stage liver disease. Hepatology. 2001;33(2):464-70. PMID 11172350; doi:10.1053/jhep.2001.22172.", "link": "https://doi.org/10.1053/jhep.2001.22172", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kaner2017Digital", "text": "Kaner EF, Beyer FR, Garnett C, Crane D, Brown J, Muirhead C, et al. Personalised digital interventions for reducing hazardous and harmful alcohol consumption in community-dwelling populations. Cochrane Database Syst Rev. 2017;9(9):CD011479. PMID 28944453; PMCID PMC6483779; doi:10.1002/14651858.CD011479.pub2.", "link": "https://doi.org/10.1002/14651858.cd011479.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kaner2018Cochrane", "text": "Kaner EF, Beyer FR, Muirhead C, Campbell F, Pienaar ED, Bertholet N, et al. Effectiveness of brief alcohol interventions in primary care populations. Cochrane Database Syst Rev. 2018;2(2):CD004148. PMID 29476653; PMCID PMC6491186; doi:10.1002/14651858.CD004148.pub4.", "link": "https://doi.org/10.1002/14651858.cd004148.pub4", "areas": ["C", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Kanny2015", "text": "Kanny D, Brewer RD, Mesnick JB, Paulozzi LJ, Naimi TS, Lu H. Vital signs: alcohol poisoning deaths - United States, 2010-2012. MMWR Morb Mortal Wkly Rep. 2015;63(53):1238-42. PMID 25577989; PMCID PMC4646044. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/25577989/", "areas": ["H", "B"], "unverified": false, "validated": "PubMed", "aliases": ["Kanny2015MMWR"]}, {"key": "Karaye2023", "text": "Karaye IM, Maleki N, Hassan N, Yunusa I. Trends in Alcohol-Related Deaths by Sex in the US, 1999-2020. JAMA Netw Open. 2023;6(7):e2326346. PMID 37505494; PMCID PMC10383009; doi:10.1001/jamanetworkopen.2023.26346.", "link": "https://doi.org/10.1001/jamanetworkopen.2023.26346", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Katcher1993", "text": "Katcher BS. Benjamin Rush's educational campaign against hard drinking. Am J Public Health. 1993;83(2):273-81. PMID 8427341; PMCID PMC1694575; doi:10.2105/ajph.83.2.273.", "link": "https://doi.org/10.2105/ajph.83.2.273", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kattimani2013", "text": "Kattimani S, Bharadwaj B. Clinical management of alcohol withdrawal: A systematic review. Ind Psychiatry J. 2013;22(2):100-8. PMID 25013309; PMCID PMC4085800; doi:10.4103/0972-6748.132914.", "link": "https://doi.org/10.4103/0972-6748.132914", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kechagias2015PEth", "text": "Kechagias S, Dernroth DN, Blomgren A, Hansson T, Isaksson A, Walther L, et al. Phosphatidylethanol Compared with Other Blood Tests as a Biomarker of Moderate Alcohol Consumption in Healthy Volunteers: A Prospective Randomized Study. Alcohol Alcohol. 2015;50(4):399-406. PMID 25882743; doi:10.1093/alcalc/agv038.", "link": "https://doi.org/10.1093/alcalc/agv038", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2010Language", "text": "Kelly JF, Westerhoff CM. Does it matter how we refer to individuals with substance-related conditions? A randomized study of two commonly used terms. Int J Drug Policy. 2010;21(3):202-7. PMID 20005692; doi:10.1016/j.drugpo.2009.10.010.", "link": "https://doi.org/10.1016/j.drugpo.2009.10.010", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Kelly2010"]}, {"key": "Kelly2011AANetwork", "text": "Kelly JF, Stout RL, Magill M, Tonigan JS. The role of Alcoholics Anonymous in mobilizing adaptive social network changes: a prospective lagged mediational analysis. Drug Alcohol Depend. 2011;114(2-3):119-26. PMID 21035276; PMCID PMC3062700; doi:10.1016/j.drugalcdep.2010.09.009.", "link": "https://doi.org/10.1016/j.drugalcdep.2010.09.009", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2012AAMech", "text": "Kelly JF, Hoeppner B, Stout RL, Pagano M. Determining the relative importance of the mechanisms of behavior change within Alcoholics Anonymous: a multiple mediator analysis. Addiction. 2012;107(2):289-99. PMID 21917054; PMCID PMC3242865; doi:10.1111/j.1360-0443.2011.03593.x.", "link": "https://doi.org/10.1111/j.1360-0443.2011.03593.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2017AASpiritual", "text": "Kelly JF. Is Alcoholics Anonymous religious, spiritual, neither? Findings from 25 years of mechanisms of behavior change research. Addiction. 2017;112(6):929-936. PMID 27718303; PMCID PMC5385165; doi:10.1111/add.13590.", "link": "https://doi.org/10.1111/add.13590", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2017Recovery", "text": "Kelly JF, Bergman B, Hoeppner BB, Vilsaint C, White WL. Prevalence and pathways of recovery from drug and alcohol problems in the United States population: Implications for practice, research, and policy. Drug Alcohol Depend. 2017;181:162-169. PMID 29055821; PMCID PMC6076174; doi:10.1016/j.drugalcdep.2017.09.028.", "link": "https://doi.org/10.1016/j.drugalcdep.2017.09.028", "areas": ["A", "H", "F"], "unverified": false, "validated": "PubMed", "aliases": ["Kelly2017NRS"]}, {"key": "Kelly2018QoL", "text": "Kelly JF, Greene MC, Bergman BG. Beyond Abstinence: Changes in Indices of Quality of Life with Time in Recovery in a Nationally Representative Sample of U.S. Adults. Alcohol Clin Exp Res. 2018;42(4):770-780. PMID 29473966; PMCID PMC5880708; doi:10.1111/acer.13604.", "link": "https://doi.org/10.1111/acer.13604", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2019Attempts", "text": "Kelly JF, Greene MC, Bergman BG, White WL, Hoeppner BB. How Many Recovery Attempts Does it Take to Successfully Resolve an Alcohol or Drug Problem? Estimates and Correlates From a National Study of Recovering U.S. Adults. Alcohol Clin Exp Res. 2019;43(7):1533-1544. PMID 31090945; PMCID PMC6602820; doi:10.1111/acer.14067.", "link": "https://doi.org/10.1111/acer.14067", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2019Jellinek", "text": "Kelly JF. E. M. Jellinek's Disease Concept of Alcoholism. Addiction. 2019;114(3):555-559. PMID 30064157; doi:10.1111/add.14400.", "link": "https://doi.org/10.1111/add.14400", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kelly2020Cochrane", "text": "Kelly JF, Humphreys K, Ferri M. Alcoholics Anonymous and other 12-step programs for alcohol use disorder. Cochrane Database Syst Rev. 2020;3(3):CD012880. PMID 32159228; PMCID PMC7065341; doi:10.1002/14651858.CD012880.pub2.", "link": "https://doi.org/10.1002/14651858.cd012880.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kendler2015Adoption", "text": "Kendler KS, Ji J, Edwards AC, Ohlsson H, Sundquist J, Sundquist K. An extended Swedish national adoption study of alcohol use disorder. JAMA Psychiatry. 2015;72(3):211-8. PMID 25565339; PMCID PMC4351126; doi:10.1001/jamapsychiatry.2014.2138.", "link": "https://doi.org/10.1001/jamapsychiatry.2014.2138", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kenna2016Doxazosin", "text": "Kenna GA, Haass-Koffler CL, Zywiak WH, Edwards SM, Brickley MB, Swift RM, et al. Role of the α1 blocker doxazosin in alcoholism: a proof-of-concept randomized controlled trial. Addict Biol. 2016;21(4):904-914. PMID 26037245; PMCID PMC4668239; doi:10.1111/adb.12275.", "link": "https://doi.org/10.1111/adb.12275", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Keyes2010", "text": "Keyes KM, Hatzenbuehler ML, McLaughlin KA, Link B, Olfson M, Grant BF, et al. Stigma and treatment for alcohol disorders in the United States. Am J Epidemiol. 2010;172(12):1364-72. PMID 21044992; PMCID PMC2998202; doi:10.1093/aje/kwq304.", "link": "https://doi.org/10.1093/aje/kwq304", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2008AEM", "text": "Khan A, Levy P, DeHorn S, Miller W, Compton S. Predictors of mortality in patients with delirium tremens. Acad Emerg Med. 2008;15(8):788-90. PMID 18638029; doi:10.1111/j.1553-2712.2008.00187.x.", "link": "https://doi.org/10.1111/j.1553-2712.2008.00187.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kiefer2003", "text": "Kiefer F, Jahn H, Tarnaske T, Helwig H, Briken P, Holzbach R, et al. Comparing and combining naltrexone and acamprosate in relapse prevention of alcoholism: a double-blind, placebo-controlled study. Arch Gen Psychiatry. 2003;60(1):92-99. PMID 12511176; doi:10.1001/archpsyc.60.1.92.", "link": "https://doi.org/10.1001/archpsyc.60.1.92", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kilian2021", "text": "Kilian C, Manthey J, Carr S, Hanschmidt F, Rehm J, Speerforck S, et al. Stigmatization of people with alcohol use disorders: An updated systematic review of population studies. Alcohol Clin Exp Res. 2021;45(5):899-911. PMID 33970504; doi:10.1111/acer.14598.", "link": "https://doi.org/10.1111/acer.14598", "areas": ["A", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Kiluk2016CBT4CBT", "text": "Kiluk BD, Devore KA, Buck MB, Nich C, Frankforter TL, LaPaglia DM, et al. Randomized Trial of Computerized Cognitive Behavioral Therapy for Alcohol Use Disorders: Efficacy as a Virtual Stand-Alone and Treatment Add-On Compared with Standard Outpatient Treatment. Alcohol Clin Exp Res. 2016;40(9):1991-2000. PMID 27488212; PMCID PMC5008977; doi:10.1111/acer.13162.", "link": "https://doi.org/10.1111/acer.13162", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kiluk2019Tech", "text": "Kiluk BD, Ray LA, Walthers J, Bernstein M, Tonigan JS, Magill M. Technology-Delivered Cognitive-Behavioral Interventions for Alcohol Use: A Meta-Analysis. Alcohol Clin Exp Res. 2019;43(11):2285-2295. PMID 31566787; PMCID PMC6824956; doi:10.1111/acer.14189.", "link": "https://doi.org/10.1111/acer.14189", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kiluk2026", "text": "Kiluk BD, Ray LA, Tartak O, Werner L, Trikalinos TA, Magill M. Digitally Delivered Cognitive Behavioral Interventions for Alcohol and Other Drug Use: Meta-Analysis Across Consumption and Psychosocial Outcomes. JMIR Ment Health. 2026;13:e82370. PMID 41842924; PMCID PMC13231115; doi:10.2196/82370.", "link": "https://doi.org/10.2196/82370", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kim2025NIBS", "text": "Kim DJ, Jeong H, Kim SY, Kim YH, Yim HW. Efficacy of non-invasive brain stimulation in reducing craving in patients with alcohol use disorder: systematic review and meta-analysis. BMC Psychiatry. 2025;25(1):496. PMID 40380172; PMCID PMC12085020; doi:10.1186/s12888-025-06883-4.", "link": "https://doi.org/10.1186/s12888-025-06883-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kirsch2025", "text": "Kirsch DE, Belnap MA, Kady A, Ray LA. A narrative review on alcohol use in women: insight into the telescoping hypothesis from a biopsychosocial perspective. Am J Drug Alcohol Abuse. 2025;51(1):14-30. PMID 39868972; PMCID PMC12206452; doi:10.1080/00952990.2024.2419540.", "link": "https://doi.org/10.1080/00952990.2024.2419540", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Klausen2022Exenatide", "text": "Klausen MK, Jensen ME, Møller M, Le Dous N, Jensen AØ, Zeeman VA, et al. Exenatide once weekly for alcohol use disorder investigated in a randomized, placebo-controlled clinical trial. JCI Insight. 2022;7(19):e159863. PMID 36066977; PMCID PMC9675448; doi:10.1172/jci.insight.159863.", "link": "https://doi.org/10.1172/jci.insight.159863", "areas": ["E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Klausen2022"]}, {"key": "Klausen2026Lancet", "text": "Klausen MK, Justesen SK, Pedersen JN, Rasmussen L, Jensen A, Jensen ME, et al. Once-weekly semaglutide versus placebo in patients with alcohol use disorder and comorbid obesity: a randomised, double-blind, placebo-controlled trial. Lancet. 2026;407(10540):1687-1698. PMID 42070571; doi:10.1016/S0140-6736(26)00305-3.", "link": "https://doi.org/10.1016/s0140-6736(26)00305-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Knight2002CRAFFT", "text": "Knight JR, Sherritt L, Shrier LA, Harris SK, Chang G. Validity of the CRAFFT substance abuse screening test among adolescent clinic patients. Arch Pediatr Adolesc Med. 2002;156(6):607-14. PMID 12038895; doi:10.1001/archpedi.156.6.607.", "link": "https://doi.org/10.1001/archpedi.156.6.607", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Knight2003ACER", "text": "Knight JR, Sherritt L, Harris SK, Gates EC, Chang G. Validity of brief alcohol screening tests among adolescents: a comparison of the AUDIT, POSIT, CAGE, and CRAFFT. Alcohol Clin Exp Res. 2003;27(1):67-73. PMID 12544008; doi:10.1097/01.ALC.0000046598.59317.3A.", "link": "https://doi.org/10.1097/01.alc.0000046598.59317.3a", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Knox2018Liver", "text": "Knox J, Wall M, Witkiewitz K, Kranzler HR, Falk D, Litten R, et al. Reduction in Nonabstinent WHO Drinking Risk Levels and Change in Risk for Liver Disease and Positive AUDIT-C Scores: Prospective 3-Year Follow-Up Results in the U.S. General Population. Alcohol Clin Exp Res. 2018;42(11):2256-2265. PMID 30204248; PMCID PMC6263142; doi:10.1111/acer.13884.", "link": "https://doi.org/10.1111/acer.13884", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Knox2019Depression", "text": "Knox J, Scodes J, Wall M, Witkiewitz K, Kranzler HR, Falk D, et al. Reduction in non-abstinent WHO drinking risk levels and depression/anxiety disorders: 3-year follow-up results in the US general population. Drug Alcohol Depend. 2019;197:228-235. PMID 30852375; PMCID PMC6440807; doi:10.1016/j.drugalcdep.2019.01.009.", "link": "https://doi.org/10.1016/j.drugalcdep.2019.01.009", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Knox2020CVD", "text": "Knox J, Scodes J, Witkiewitz K, Kranzler HR, Mann K, O'Malley SS, et al. Reduction in World Health Organization Risk Drinking Levels and Cardiovascular Disease. Alcohol Clin Exp Res. 2020;44(8):1625-1635. PMID 32619058; PMCID PMC7484295; doi:10.1111/acer.14386.", "link": "https://doi.org/10.1111/acer.14386", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kodama2011JACC", "text": "Kodama S, Saito K, Tanaka S, Horikawa C, Saito A, Heianza Y, et al. Alcohol consumption and risk of atrial fibrillation: a meta-analysis. J Am Coll Cardiol. 2011;57(4):427-36. PMID 21251583; doi:10.1016/j.jacc.2010.08.641.", "link": "https://doi.org/10.1016/j.jacc.2010.08.641", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Koob2014", "text": "Koob GF. Neurocircuitry of alcohol addiction: synthesis from animal models. Handb Clin Neurol. 2014;125:33-54. PMID 25307567; doi:10.1016/B978-0-444-62619-6.00003-3.", "link": "https://doi.org/10.1016/b978-0-444-62619-6.00003-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "KoobLeMoal2001", "text": "Koob GF, Le Moal M. Drug addiction, dysregulation of reward, and allostasis. Neuropsychopharmacology. 2001;24(2):97-129. PMID 11120394; doi:10.1016/S0893-133X(00)00195-0.", "link": "https://doi.org/10.1016/s0893-133x(00)00195-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "KoobVolkow2016", "text": "Koob GF, Volkow ND. Neurobiology of addiction: a neurocircuitry analysis. Lancet Psychiatry. 2016;3(8):760-773. PMID 27475769; PMCID PMC6135092; doi:10.1016/S2215-0366(16)00104-8.", "link": "https://doi.org/10.1016/s2215-0366(16)00104-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kopelman2009", "text": "Kopelman MD, Thomson AD, Guerrini I, Marshall EJ. The Korsakoff syndrome: clinical aspects, psychology and treatment. Alcohol Alcohol. 2009;44(2):148-54. PMID 19151162; doi:10.1093/alcalc/agn118.", "link": "https://doi.org/10.1093/alcalc/agn118", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kranzler2014GRIK1", "text": "Kranzler HR, Covault J, Feinn R, Armeli S, Tennen H, Arias AJ, et al. Topiramate treatment for heavy drinkers: moderation by a GRIK1 polymorphism. Am J Psychiatry. 2014;171(4):445-452. PMID 24525690; PMCID PMC3997125; doi:10.1176/appi.ajp.2013.13081014.", "link": "https://doi.org/10.1176/appi.ajp.2013.13081014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kranzler2019", "text": "Kranzler HR, Zhou H, Kember RL, Vickers Smith R, Justice AC, Damrauer S, et al. Genome-wide association study of alcohol consumption and use disorder in 274,424 individuals from multiple populations. Nat Commun. 2019;10(1):1499. PMID 30940813; PMCID PMC6445072; doi:10.1038/s41467-019-09480-8.", "link": "https://doi.org/10.1038/s41467-019-09480-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kranzler2019Gabapentin", "text": "Kranzler HR, Feinn R, Morris P, Hartwell EE. A meta-analysis of the efficacy of gabapentin for treating alcohol use disorder. Addiction. 2019;114(9):1547-1555. PMID 31077485; PMCID PMC6682454; doi:10.1111/add.14655.", "link": "https://doi.org/10.1111/add.14655", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "KranzlerSoyka2018", "text": "Kranzler HR, Soyka M. Diagnosis and Pharmacotherapy of Alcohol Use Disorder: A Review. JAMA. 2018;320(8):815-824. PMID 30167705; PMCID PMC7391072; doi:10.1001/jama.2018.11406. Full text (author manuscript) read on PMC.", "link": "https://doi.org/10.1001/jama.2018.11406", "areas": ["E", "A"], "unverified": false, "validated": "PubMed", "aliases": ["Kranzler2018JAMA"]}, {"key": "KranzlerVanKirk2001", "text": "Kranzler HR, Van Kirk J. Efficacy of naltrexone and acamprosate for alcoholism treatment: a meta-analysis. Alcohol Clin Exp Res. 2001;25(9):1335-1341. PMID 11584154.", "link": "https://pubmed.ncbi.nlm.nih.gov/11584154/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kriston2008AUDITC", "text": "Kriston L, Hölzel L, Weiser AK, Berner MM, Härter M. Meta-analysis: are 3 questions enough to detect unhealthy alcohol use? Ann Intern Med. 2008;149(12):879-88. PMID 19075207; doi:10.7326/0003-4819-149-12-200812160-00007.", "link": "https://doi.org/10.7326/0003-4819-149-12-200812160-00007", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kumar2009", "text": "Kumar S, Porcu P, Werner DF, Matthews DB, Diaz-Granados JL, Helfand RS, et al. The role of GABA(A) receptors in the acute and chronic effects of ethanol: a decade of progress. Psychopharmacology (Berl). 2009;205(4):529-64. PMID 19455309; PMCID PMC2814770; doi:10.1007/s00213-009-1562-z.", "link": "https://doi.org/10.1007/s00213-009-1562-z", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Laaksonen2008", "text": "Laaksonen E, Koski-Jännes A, Salaspuro M, Ahtinen H, Alho H. A randomized, multicentre, open-label, comparative trial of disulfiram, naltrexone and acamprosate in the treatment of alcohol dependence. Alcohol Alcohol. 2008;43(1):53-61. PMID 17965444; doi:10.1093/alcalc/agm136.", "link": "https://doi.org/10.1093/alcalc/agm136", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lackner2017JHep", "text": "Lackner C, Spindelboeck W, Haybaeck J, Douschan P, Rainer F, Terracciano L, et al. Histological parameters and alcohol abstinence determine long-term prognosis in patients with alcoholic liver disease. J Hepatol. 2017;66(3):610-618. PMID 27894795; doi:10.1016/j.jhep.2016.11.011.", "link": "https://doi.org/10.1016/j.jhep.2016.11.011", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "LactMed-Alcohol", "text": "Drugs and Lactation Database (LactMed). Alcohol. Bethesda (MD): National Institute of Child Health and Human Development; 2006–; record revised 2026 Oct 15. NCBI Bookshelf. PMID 30000529.", "link": "https://pubmed.ncbi.nlm.nih.gov/30000529/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lago2016ICD11", "text": "Lago L, Bruno R, Degenhardt L. Concordance of ICD-11 and DSM-5 definitions of alcohol and cannabis use disorders: a population survey. Lancet Psychiatry. 2016;3(7):673-84. PMID 27371989; doi:10.1016/S2215-0366(16)00088-2.", "link": "https://doi.org/10.1016/s2215-0366(16)00088-2", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lahteenvuo2025", "text": "Lähteenvuo M, Tiihonen J, Solismaa A, Tanskanen A, Mittendorfer-Rutz E, Taipale H. Repurposing Semaglutide and Liraglutide for Alcohol Use Disorder. JAMA Psychiatry. 2025;82(1):94-98. PMID 39535805; PMCID PMC11561716; doi:10.1001/jamapsychiatry.2024.3599.", "link": "https://doi.org/10.1001/jamapsychiatry.2024.3599", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lai2015", "text": "Lai HM, Cleary M, Sitharthan T, Hunt GE. Prevalence of comorbid substance use, anxiety and mood disorders in epidemiological surveys, 1990-2014: A systematic review and meta-analysis. Drug Alcohol Depend. 2015;154:1-13. PMID 26072219; doi:10.1016/j.drugalcdep.2015.05.031.", "link": "https://doi.org/10.1016/j.drugalcdep.2015.05.031", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Lambert2025", "text": "Lambert E, Regan S, Wakeman SE. The Impact of Addiction Consultation and Medication for Opioid or Alcohol Use Disorder on Hospital Readmission. J Gen Intern Med. 2025;40(12):2989-2996. PMID 39753803; PMCID PMC12463793; doi:10.1007/s11606-024-09301-9.", "link": "https://doi.org/10.1007/s11606-024-09301-9", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lange2017JAMAPediatr", "text": "Lange S, Probst C, Gmel G, Rehm J, Burd L, Popova S. Global Prevalence of Fetal Alcohol Spectrum Disorder Among Children and Youth: A Systematic Review and Meta-analysis. JAMA Pediatr. 2017;171(10):948-956. PMID 28828483; PMCID PMC5710622; doi:10.1001/jamapediatrics.2017.1919.", "link": "https://doi.org/10.1001/jamapediatrics.2017.1919", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lange2024", "text": "Lange S, Kim KV, Lasserre AM, Orpana H, Bagge C, Roerecke M, et al. Sex-Specific Association of Alcohol Use Disorder With Suicide Mortality: A Systematic Review and Meta-Analysis. JAMA Netw Open. 2024;7(3):e241941. PMID 38470417; PMCID PMC10933726; doi:10.1001/jamanetworkopen.2024.1941.", "link": "https://doi.org/10.1001/jamanetworkopen.2024.1941", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Larimer1999", "text": "Larimer ME, Palmer RS, Marlatt GA. Relapse prevention. An overview of Marlatt's cognitive-behavioral model. Alcohol Res Health. 1999;23(2):151-60. PMID 10890810; PMCID PMC6760427. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/10890810/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Larsson2014JACC", "text": "Larsson SC, Drca N, Wolk A. Alcohol consumption and risk of atrial fibrillation: a prospective study and dose-response meta-analysis. J Am Coll Cardiol. 2014;64(3):281-9. PMID 25034065; doi:10.1016/j.jacc.2014.03.048.", "link": "https://doi.org/10.1016/j.jacc.2014.03.048", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Larsson2016BMCMed", "text": "Larsson SC, Wallin A, Wolk A, Markus HS. Differing association of alcohol consumption with different stroke types: a systematic review and meta-analysis. BMC Med. 2016;14(1):178. PMID 27881167; PMCID PMC5121939; doi:10.1186/s12916-016-0721-4.", "link": "https://doi.org/10.1186/s12916-016-0721-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Laudet2008", "text": "Laudet AB, White WL. Recovery capital as prospective predictor of sustained recovery, life satisfaction, and stress among former poly-substance users. Subst Use Misuse. 2008;43(1):27-54. PMID 18189204; PMCID PMC2211734; doi:10.1080/10826080701681473.", "link": "https://doi.org/10.1080/10826080701681473", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lebin2026", "text": "Lebin JA, Hensen C, Lun Z, Goldberg EM, Lum HD, Hoppe JA. Characteristics of Emergency Department Visits Among Midlife and Older Adults Screening Positive for Alcohol Misuse. Acad Emerg Med. 2026;33(3):e70246. PMID 41803048; PMCID PMC13050138; doi:10.1111/acem.70246.", "link": "https://doi.org/10.1111/acem.70246", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2018Gastro", "text": "Lee BP, Mehta N, Platt L, Gurakar A, Rice JP, Lucey MR, et al. Outcomes of Early Liver Transplantation for Patients With Severe Alcoholic Hepatitis. Gastroenterology. 2018;155(2):422-430.e1. PMID 29655837; PMCID PMC6460480; doi:10.1053/j.gastro.2018.04.009.", "link": "https://doi.org/10.1053/j.gastro.2018.04.009", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2024AEM", "text": "Lee CM, Dillon DG, Tahir PM, Murphy CE 4th. Phenobarbital treatment of alcohol withdrawal in the emergency department: A systematic review and meta-analysis. Acad Emerg Med. 2024;31(5):515-524. PMID 37923363; PMCID PMC11065966; doi:10.1111/acem.14825.", "link": "https://doi.org/10.1111/acem.14825", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lees2020AJP", "text": "Lees B, Mewton L, Jacobus J, Valadez EA, Stapinski LA, Teesson M, et al. Association of Prenatal Alcohol Exposure With Psychological, Behavioral, and Neurodevelopmental Outcomes in Children From the Adolescent Brain Cognitive Development Study. Am J Psychiatry. 2020;177(11):1060-1072. PMID 32972200; PMCID PMC7924902; doi:10.1176/appi.ajp.2020.20010086.", "link": "https://doi.org/10.1176/appi.ajp.2020.20010086", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Leone2010Cochrane", "text": "Leone MA, Vigna-Taglianti F, Avanzi G, Brambilla R, Faggiano F. Gamma-hydroxybutyrate (GHB) for treatment of alcohol withdrawal and prevention of relapses. Cochrane Database Syst Rev. 2010;2010(2):CD006266. PMID 20166080; PMCID PMC13006865; doi:10.1002/14651858.CD006266.pub2.", "link": "https://doi.org/10.1002/14651858.cd006266.pub2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Levy2021S2BI", "text": "Levy S, Weitzman ER, Marin AC, Magane KM, Wisk LE, Shrier LA. Sensitivity and specificity of S2BI for identifying alcohol and cannabis use disorders among adolescents presenting for primary care. Subst Abus. 2021;42(3):388-395. PMID 32814009; doi:10.1080/08897077.2020.1803180.", "link": "https://doi.org/10.1080/08897077.2020.1803180", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Levy2023Adolescent", "text": "Levy S, Brogna M, Minegishi M, Subramaniam G, McCormack J, Kline M, et al. Assessment of Screening Tools to Identify Substance Use Disorders Among Adolescents. JAMA Netw Open. 2023;6(5):e2314422. PMID 37213103; PMCID PMC10203888; doi:10.1001/jamanetworkopen.2023.14422.", "link": "https://doi.org/10.1001/jamanetworkopen.2023.14422", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lewis2005", "text": "Lewis SJ, Smith GD. Alcohol, ALDH2, and esophageal cancer: a meta-analysis which illustrates the potentials and limitations of a Mendelian randomization approach. Cancer Epidemiol Biomarkers Prev. 2005;14(8):1967-71. PMID 16103445; doi:10.1158/1055-9965.EPI-05-0196.", "link": "https://doi.org/10.1158/1055-9965.epi-05-0196", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Li2007ADS", "text": "Li TK, Hewitt BG, Grant BF. The Alcohol Dependence Syndrome, 30 years later: a commentary. the 2006 H. David Archibald lecture. Addiction. 2007;102(10):1522-30. PMID 17680851; doi:10.1111/j.1360-0443.2007.01911.x.", "link": "https://doi.org/10.1111/j.1360-0443.2007.01911.x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Li2009ALDH2", "text": "Li H, Borinskaya S, Yoshimura K, Kal'ina N, Marusin A, Stepanov VA, et al. Refined geographic distribution of the oriental ALDH2504Lys (nee 487Lys) variant. Ann Hum Genet. 2009;73(Pt 3):335-45. PMID 19456322; PMCID PMC2846302; doi:10.1111/j.1469-1809.2009.00517.x.", "link": "https://doi.org/10.1111/j.1469-1809.2009.00517.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Li2011ADH1B", "text": "Li D, Zhao H, Gelernter J. Strong association of the alcohol dehydrogenase 1B gene (ADH1B) with alcohol dependence and alcohol-induced medical diseases. Biol Psychiatry. 2011;70(6):504-12. PMID 21497796; PMCID PMC3142297; doi:10.1016/j.biopsych.2011.02.024.", "link": "https://doi.org/10.1016/j.biopsych.2011.02.024", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Liang2026GBD", "text": "Liang X, Lyu Y, Li J, Yin C, Chi C. Global, Regional, and National Age-Sex-Specific Burden of Alcohol-Related Diseases, 1990-2021: A Comprehensive Analysis for the Global Burden of Disease Study 2021. J Stud Alcohol Drugs. 2026;87(4):642-654. PMID 41379091; doi:10.15288/jsad.25-00259.", "link": "https://doi.org/10.15288/jsad.25-00259", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lieber2004Fatty", "text": "Lieber CS. Alcoholic fatty liver: its pathogenesis and mechanism of progression to inflammation and fibrosis. Alcohol. 2004;34(1):9-19. PMID 15670660; doi:10.1016/j.alcohol.2004.07.008.", "link": "https://doi.org/10.1016/j.alcohol.2004.07.008", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lieber2004MEOS", "text": "Lieber CS. The discovery of the microsomal ethanol oxidizing system and its physiologic and pathologic role. Drug Metab Rev. 2004;36(3-4):511-29. PMID 15554233; doi:10.1081/dmr-200033441.", "link": "https://doi.org/10.1081/dmr-200033441", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lindsay2020ASAM", "text": "Lindsay DL, Freedman K, Jarvis M, Lincoln P, Williams J, Nelson LS, et al. Executive Summary of the American Society of Addiction Medicine (ASAM) Clinical Practice Guideline on Alcohol Withdrawal Management. J Addict Med. 2020;14(5):376-392. PMID 32909985; doi:10.1097/ADM.0000000000000732.", "link": "https://doi.org/10.1097/adm.0000000000000732", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lipari2017", "text": "Lipari RN, Van Horn SL. Children Living with Parents Who Have a Substance Use Disorder. The CBHSQ Report. Rockville (MD): Substance Abuse and Mental Health Services Administration (US); 2017 Aug 24. PMID 29144715. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/29144715/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Litt2016", "text": "Litt MD, Kadden RM, Tennen H, Kabela-Cormier E. Network Support II: Randomized controlled trial of Network Support treatment and cognitive behavioral therapy for alcohol use disorder. Drug Alcohol Depend. 2016;165:203-12. PMID 27354234; PMCID PMC4948060; doi:10.1016/j.drugalcdep.2016.06.010.", "link": "https://doi.org/10.1016/j.drugalcdep.2016.06.010", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Litten2013Varenicline", "text": "Litten RZ, Ryan ML, Fertig JB, Falk DE, Johnson B, Dunn KE, et al. A double-blind, placebo-controlled trial assessing the efficacy of varenicline tartrate for alcohol dependence. J Addict Med. 2013;7(4):277-286. PMID 23728065; PMCID PMC3914416; doi:10.1097/ADM.0b013e31829623f4.", "link": "https://doi.org/10.1097/adm.0b013e31829623f4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "LlamosasFalcon2023", "text": "Llamosas-Falcón L, Tran A, Jiang H, Rehm J. Liver holidays? A meta-analysis of drinking the same amount of alcohol daily or non-daily and the risk for cirrhosis. Drug Alcohol Rev. 2023;42(1):119-124. PMID 36274528; PMCID PMC10749115; doi:10.1111/dar.13563.", "link": "https://doi.org/10.1111/dar.13563", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "LoConte2018ASCO", "text": "LoConte NK, Brewster AM, Kaur JS, Merrill JK, Alberg AJ. Alcohol and Cancer: A Statement of the American Society of Clinical Oncology. J Clin Oncol. 2018;36(1):83-93. PMID 29112463; doi:10.1200/JCO.2017.76.1155.", "link": "https://doi.org/10.1200/jco.2017.76.1155", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Long2017AJEM", "text": "Long D, Long B, Koyfman A. The emergency medicine management of severe alcohol withdrawal. Am J Emerg Med. 2017;35(7):1005-1011. PMID 28188055; doi:10.1016/j.ajem.2017.02.002.", "link": "https://doi.org/10.1016/j.ajem.2017.02.002", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Louvet2007Lille", "text": "Louvet A, Naveau S, Abdelnour M, Ramond MJ, Diaz E, Fartoux L, et al. The Lille model: a new tool for therapeutic strategy in patients with severe alcoholic hepatitis treated with steroids. Hepatology. 2007;45(6):1348-54. PMID 17518367; doi:10.1002/hep.21607.", "link": "https://doi.org/10.1002/hep.21607", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lovinger1989", "text": "Lovinger DM, White G, Weight FF. Ethanol inhibits NMDA-activated ion current in hippocampal neurons. Science. 1989;243(4899):1721-4. PMID 2467382; doi:10.1126/science.2467382.", "link": "https://doi.org/10.1126/science.2467382", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Luczak2006", "text": "Luczak SE, Glatt SJ, Wall TL. Meta-analyses of ALDH2 and ADH1B with alcohol dependence in Asians. Psychol Bull. 2006;132(4):607-21. PMID 16822169; doi:10.1037/0033-2909.132.4.607.", "link": "https://doi.org/10.1037/0033-2909.132.4.607", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Maddrey1978", "text": "Maddrey WC, Boitnott JK, Bedine MS, Weber FL Jr, Mezey E, White RI Jr. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978;75(2):193-9. PMID 352788.", "link": "https://pubmed.ncbi.nlm.nih.gov/352788/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Magill2019", "text": "Magill M, Ray L, Kiluk B, Hoadley A, Bernstein M, Tonigan JS, et al. A meta-analysis of cognitive-behavioral therapy for alcohol or other drug use disorders: Treatment efficacy by contrast condition. J Consult Clin Psychol. 2019;87(12):1093-1105. PMID 31599606; PMCID PMC6856400; doi:10.1037/ccp0000447.", "link": "https://doi.org/10.1037/ccp0000447", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Mainerova2015", "text": "Mainerova B, Prasko J, Latalova K, Axmann K, Cerna M, Horacek R, et al. Alcohol withdrawal delirium - diagnosis, course and treatment. Biomed Pap Med Fac Univ Palacky Olomouc Czech Repub. 2015;159(1):44-52. PMID 24399242; doi:10.5507/bp.2013.089.", "link": "https://doi.org/10.5507/bp.2013.089", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Maisel2013", "text": "Maisel NC, Blodgett JC, Wilbourne PL, Humphreys K, Finney JW. Meta-analysis of naltrexone and acamprosate for treating alcohol use disorders: when are these medications most helpful? Addiction. 2013;108(2):275-293. PMID 23075288; PMCID PMC3970823; doi:10.1111/j.1360-0443.2012.04054.x.", "link": "https://doi.org/10.1111/j.1360-0443.2012.04054.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Malcolm2002", "text": "Malcolm R, Myrick H, Roberts J, Wang W, Anton RF, Ballenger JC. The effects of carbamazepine and lorazepam on single versus multiple previous alcohol withdrawals in an outpatient randomized trial. J Gen Intern Med. 2002;17(5):349-55. PMID 12047731; PMCID PMC1495040; doi:10.1046/j.1525-1497.2002.10201.x.", "link": "https://doi.org/10.1046/j.1525-1497.2002.10201.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Maldonado2014", "text": "Maldonado JR, Sher Y, Ashouri JF, Hills-Evans K, Swendsen H, Lolak S, et al. The \"Prediction of Alcohol Withdrawal Severity Scale\" (PAWSS): systematic literature review and pilot study of a new scale for the prediction of complicated alcohol withdrawal syndrome. Alcohol. 2014;48(4):375-90. PMID 24657098; doi:10.1016/j.alcohol.2014.01.004.", "link": "https://doi.org/10.1016/j.alcohol.2014.01.004", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Maldonado2015", "text": "Maldonado JR, Sher Y, Das S, Hills-Evans K, Frenklach A, Lolak S, et al. Prospective Validation Study of the Prediction of Alcohol Withdrawal Severity Scale (PAWSS) in Medically Ill Inpatients: A New Scale for the Prediction of Complicated Alcohol Withdrawal Syndrome. Alcohol Alcohol. 2015;50(5):509-18. PMID 25999438; doi:10.1093/alcalc/agv043.", "link": "https://doi.org/10.1093/alcalc/agv043", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Mann2004Acamprosate", "text": "Mann K, Lehert P, Morgan MY. The efficacy of acamprosate in the maintenance of abstinence in alcohol-dependent individuals: results of a meta-analysis. Alcohol Clin Exp Res. 2004;28(1):51-63. PMID 14745302; doi:10.1097/01.ALC.0000108656.81563.05.", "link": "https://doi.org/10.1097/01.alc.0000108656.81563.05", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mann2013ESENSE1", "text": "Mann K, Bladström A, Torup L, Gual A, van den Brink W. Extending the treatment options in alcohol dependence: a randomized controlled study of as-needed nalmefene. Biol Psychiatry. 2013;73(8):706-713. PMID 23237314; doi:10.1016/j.biopsych.2012.10.020.", "link": "https://doi.org/10.1016/j.biopsych.2012.10.020", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Manning2014", "text": "Manning S, Gilmour M, Weatherall M, Robinson GM. Refeeding syndrome is uncommon in alcoholics admitted to a hospital detoxification unit. Intern Med J. 2014;44(5):512-4. PMID 24816312; doi:10.1111/imj.12408.", "link": "https://doi.org/10.1111/imj.12408", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Manthey2019Lancet", "text": "Manthey J, Shield KD, Rylett M, Hasan OSM, Probst C, Rehm J. Global alcohol exposure between 1990 and 2017 and forecasts until 2030: a modelling study. Lancet. 2019;393(10190):2493-2502. PMID 31076174; doi:10.1016/S0140-6736(18)32744-2.", "link": "https://doi.org/10.1016/s0140-6736(18)32744-2", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Marcus2021AnnIntMed", "text": "Marcus GM, Vittinghoff E, Whitman IR, Joyce S, Yang V, Nah G, et al. Acute Consumption of Alcohol and Discrete Atrial Fibrillation Events. Ann Intern Med. 2021;174(11):1503-1509. PMID 34461028; doi:10.7326/M21-0228.", "link": "https://doi.org/10.7326/m21-0228", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Mark2009", "text": "Mark TL, Kassed CA, Vandivort-Warren R, Levit KR, Kranzler HR. Alcohol and opioid dependence medications: prescription trends, overall and by physician specialty. Drug Alcohol Depend. 2009;99(1-3):345-349. PMID 18819759; PMCID PMC3166770; doi:10.1016/j.drugalcdep.2008.07.018.", "link": "https://doi.org/10.1016/j.drugalcdep.2008.07.018", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Martin2014", "text": "Martin CS, Langenbucher JW, Chung T, Sher KJ. Truth or consequences in the diagnosis of substance use disorders. Addiction. 2014;109(11):1773-8. PMID 24913314; PMCID PMC4441015; doi:10.1111/add.12615.", "link": "https://doi.org/10.1111/add.12615", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Maskell2019", "text": "Maskell PD, Jones AW, Savage A, Scott-Ham M. Evidence based survey of the distribution volume of ethanol: Comparison of empirically determined values with anthropometric measures. Forensic Sci Int. 2019;294:124-131. PMID 30553124; doi:10.1016/j.forsciint.2018.10.033.", "link": "https://doi.org/10.1016/j.forsciint.2018.10.033", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mason2006Acamprosate", "text": "Mason BJ, Goodman AM, Chabac S, Lehert P. Effect of oral acamprosate on abstinence in patients with alcohol dependence in a double-blind, placebo-controlled trial: the role of patient motivation. J Psychiatr Res. 2006;40(5):383-393. PMID 16546214; doi:10.1016/j.jpsychires.2006.02.002.", "link": "https://doi.org/10.1016/j.jpsychires.2006.02.002", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mason2014Gabapentin", "text": "Mason BJ, Quello S, Goodell V, Shadan F, Kyle M, Begovic A. Gabapentin treatment for alcohol dependence: a randomized clinical trial. JAMA Intern Med. 2014;174(1):70-77. PMID 24190578; PMCID PMC3920987; doi:10.1001/jamainternmed.2013.11950.", "link": "https://doi.org/10.1001/jamainternmed.2013.11950", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mathurin2011NEJM", "text": "Mathurin P, Moreno C, Samuel D, Dumortier J, Salleron J, Durand F, et al. Early liver transplantation for severe alcoholic hepatitis. N Engl J Med. 2011;365(19):1790-800. PMID 22070476; doi:10.1056/NEJMoa1105703.", "link": "https://doi.org/10.1056/nejmoa1105703", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "May2018JAMA", "text": "May PA, Chambers CD, Kalberg WO, Zellner J, Feldman H, Buckley D, et al. Prevalence of Fetal Alcohol Spectrum Disorders in 4 US Communities. JAMA. 2018;319(5):474-482. PMID 29411031; PMCID PMC5839298; doi:10.1001/jama.2017.21896.", "link": "https://doi.org/10.1001/jama.2017.21896", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "MayoSmith1997", "text": "Mayo-Smith MF. Pharmacological management of alcohol withdrawal. A meta-analysis and evidence-based practice guideline. American Society of Addiction Medicine Working Group on Pharmacological Management of Alcohol Withdrawal. JAMA. 1997;278(2):144-51. PMID 9214531; doi:10.1001/jama.278.2.144.", "link": "https://doi.org/10.1001/jama.278.2.144", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "MayoSmith2004Delirium", "text": "Mayo-Smith MF, Beecher LH, Fischer TL, Gorelick DA, Guillaume JL, Hill A, et al. Management of alcohol withdrawal delirium. An evidence-based practice guideline. Arch Intern Med. 2004;164(13):1405-12. PMID 15249349; doi:10.1001/archinte.164.13.1405.", "link": "https://doi.org/10.1001/archinte.164.13.1405", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "McDonell2017", "text": "McDonell MG, Leickly E, McPherson S, Skalisky J, Srebnik D, Angelo F, et al. A Randomized Controlled Trial of Ethyl Glucuronide-Based Contingency Management for Outpatients With Co-Occurring Alcohol Use Disorders and Serious Mental Illness. Am J Psychiatry. 2017;174(4):370-377. PMID 28135843; PMCID PMC5378651; doi:10.1176/appi.ajp.2016.16050627.", "link": "https://doi.org/10.1176/appi.ajp.2016.16050627", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "McKnightEily2020MMWR", "text": "McKnight-Eily LR, Okoro CA, Turay K, Acero C, Hungerford D. Screening for Alcohol Use and Brief Counseling of Adults - 13 States and the District of Columbia, 2017. MMWR Morb Mortal Wkly Rep. 2020;69(10):265-270. PMID 32163383; PMCID PMC7075256; doi:10.15585/mmwr.mm6910a3.", "link": "https://doi.org/10.15585/mmwr.mm6910a3", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "McLellan2000", "text": "McLellan AT, Lewis DC, O'Brien CP, Kleber HD. Drug dependence, a chronic medical illness: implications for treatment, insurance, and outcomes evaluation. JAMA. 2000;284(13):1689-95. PMID 11015800; doi:10.1001/jama.284.13.1689.", "link": "https://doi.org/10.1001/jama.284.13.1689", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "McPheeters2023JAMA", "text": "McPheeters M, O'Connor EA, Riley S, Kennedy SM, Voisin C, Kuznacic K, et al. Pharmacotherapy for Alcohol Use Disorder: A Systematic Review and Meta-Analysis. JAMA. 2023;330(17):1653-1665. PMID 37934220; PMCID PMC10630900; doi:10.1001/jama.2023.19761.", "link": "https://doi.org/10.1001/jama.2023.19761", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McQueen2011", "text": "McQueen J, Howe TE, Allan L, Mains D, Hardy V. Brief interventions for heavy alcohol users admitted to general hospital wards. Cochrane Database Syst Rev. 2011;2011(8):CD005191. PMID 21833953; PMCID PMC10600352; doi:10.1002/14651858.CD005191.pub3.", "link": "https://doi.org/10.1002/14651858.cd005191.pub3", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Mekonen2021", "text": "Mekonen T, Chan GCK, Connor J, Hall W, Hides L, Leung J. Treatment rates for alcohol use disorders: a systematic review and meta-analysis. Addiction. 2021;116(10):2617-2634. PMID 33245581; doi:10.1111/add.15357.", "link": "https://doi.org/10.1111/add.15357", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Miller1999", "text": "Miller WR, Meyers RJ, Tonigan JS. Engaging the unmotivated in treatment for alcohol problems: a comparison of three strategies for intervention through family members. J Consult Clin Psychol. 1999;67(5):688-97. PMID 10535235; doi:10.1037//0022-006x.67.5.688.", "link": "https://doi.org/10.1037//0022-006x.67.5.688", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Millwood2019", "text": "Millwood IY, Walters RG, Mei XW, Guo Y, Yang L, Bian Z, et al. Conventional and genetic evidence on alcohol and vascular disease aetiology: a prospective study of 500 000 men and women in China. Lancet. 2019;393(10183):1831-1842. PMID 30955975; PMCID PMC6497989; doi:10.1016/S0140-6736(18)31772-0.", "link": "https://doi.org/10.1016/s0140-6736(18)31772-0", "areas": ["B", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Millwood2019Lancet"]}, {"key": "Minozzi2010Cochrane", "text": "Minozzi S, Amato L, Vecchi S, Davoli M. Anticonvulsants for alcohol withdrawal. Cochrane Database Syst Rev. 2010;2010(3):CD005064. PMID 20238337; PMCID PMC12318632; doi:10.1002/14651858.CD005064.pub3.", "link": "https://doi.org/10.1002/14651858.cd005064.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mirijello2015", "text": "Mirijello A, D'Angelo C, Ferrulli A, Vassallo G, Antonelli M, Caputo F, et al. Identification and management of alcohol withdrawal syndrome. Drugs. 2015;75(4):353-65. PMID 25666543; PMCID PMC4978420; doi:10.1007/s40265-015-0358-1.", "link": "https://doi.org/10.1007/s40265-015-0358-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mitchell2012", "text": "Mitchell JM, O'Neil JP, Janabi M, Marks SM, Jagust WJ, Fields HL. Alcohol consumption induces endogenous opioid release in the human orbitofrontal cortex and nucleus accumbens. Sci Transl Med. 2012;4(116):116ra6. PMID 22238334; doi:10.1126/scitranslmed.3002902.", "link": "https://doi.org/10.1126/scitranslmed.3002902", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Monte2010", "text": "Monte R, Rabuñal R, Casariego E, López-Agreda H, Mateos A, Pértega S. Analysis of the factors determining survival of alcoholic withdrawal syndrome patients in a general hospital. Alcohol Alcohol. 2010;45(2):151-8. PMID 20075027; doi:10.1093/alcalc/agp087.", "link": "https://doi.org/10.1093/alcalc/agp087", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Moos2006AA", "text": "Moos RH, Moos BS. Participation in treatment and Alcoholics Anonymous: a 16-year follow-up of initially untreated individuals. J Clin Psychol. 2006;62(6):735-50. PMID 16538654; PMCID PMC2220012; doi:10.1002/jclp.20259.", "link": "https://doi.org/10.1002/jclp.20259", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Moos2006Relapse", "text": "Moos RH, Moos BS. Rates and predictors of relapse after natural and treated remission from alcohol use disorders. Addiction. 2006;101(2):212-22. PMID 16445550; PMCID PMC1976118; doi:10.1111/j.1360-0443.2006.01310.x.", "link": "https://doi.org/10.1111/j.1360-0443.2006.01310.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "MoralesArraez2022", "text": "Morales-Arráez D, Ventura-Cots M, Altamirano J, Abraldes JG, Cruz-Lemini M, Thursz MR, et al. The MELD Score Is Superior to the Maddrey Discriminant Function Score to Predict Short-Term Mortality in Alcohol-Associated Hepatitis: A Global Study. Am J Gastroenterol. 2022;117(2):301-310. PMID 34962498; PMCID PMC8999152; doi:10.14309/ajg.0000000000001596.", "link": "https://doi.org/10.14309/ajg.0000000000001596", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Moyer2002", "text": "Moyer A, Finney JW, Swearingen CE, Vergun P. Brief interventions for alcohol problems: a meta-analytic review of controlled investigations in treatment-seeking and non-treatment-seeking populations. Addiction. 2002;97(3):279-92. PMID 11964101; doi:10.1046/j.1360-0443.2002.00018.x.", "link": "https://doi.org/10.1046/j.1360-0443.2002.00018.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Mueller2014", "text": "Mueller SW, Preslaski CR, Kiser TH, Fish DN, Lavelle JC, Malkoski SP, et al. A randomized, double-blind, placebo-controlled dose range study of dexmedetomidine as adjunctive therapy for alcohol withdrawal. Crit Care Med. 2014;42(5):1131-9. PMID 24351375; doi:10.1097/CCM.0000000000000141.", "link": "https://doi.org/10.1097/ccm.0000000000000141", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Myrick2009", "text": "Myrick H, Malcolm R, Randall PK, Boyle E, Anton RF, Becker HC, et al. A double-blind trial of gabapentin versus lorazepam in the treatment of alcohol withdrawal. Alcohol Clin Exp Res. 2009;33(9):1582-8. PMID 19485969; PMCID PMC2769515; doi:10.1111/j.1530-0277.2009.00986.x.", "link": "https://doi.org/10.1111/j.1530-0277.2009.00986.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "NCT04563026", "text": "Durect Corporation. A randomized, double-blind, placebo-controlled, phase 2b study to evaluate safety and efficacy of DUR-928 (larsucosterol) in subjects with alcoholic hepatitis (AHFIRM). ClinicalTrials.gov NCT04563026 (completed; n 307; primary completion 2023-09-06; no results posted).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06015893", "text": "National Institute on Drug Abuse. Semaglutide Therapy for Alcohol Reduction (STAR): a proof-of-concept phase II clinical trial. ClinicalTrials.gov NCT06015893 (active, not recruiting; n 63; estimated primary completion 2027-03-31).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07218354", "text": "VA Office of Research and Development. CSP #2041 - Cessation or Reduction of Alcohol Consumption in VEterans: a randomized, double-blind, placebo-controlled phase 3 trial of the GLP-1 receptor agonist semaglutide for alcohol use disorder. ClinicalTrials.gov NCT07218354 (recruiting; start 2026-07-28; estimated n 622; estimated primary completion 2029-03-31).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07428538", "text": "Bausch Health Americas. RE-AHFIRM: randomized study of larsucosterol in alcohol-associated hepatitis to confirm safety and efficacy of treatment. ClinicalTrials.gov NCT07428538 (recruiting; start 2026-01-29; estimated n 350; estimated primary completion 2027-11).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Ng1988NEJM", "text": "Ng SK, Hauser WA, Brust JC, Susser M. Alcohol consumption and withdrawal in new-onset seizures. N Engl J Med. 1988;319(11):666-73. PMID 3412384; doi:10.1056/NEJM198809153191102.", "link": "https://doi.org/10.1056/nejm198809153191102", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Niemela2016Biomarkers", "text": "Niemelä O. Biomarker-Based Approaches for Assessing Alcohol Use Disorders. Int J Environ Res Public Health. 2016;13(2):166. PMID 26828506; PMCID PMC4772186; doi:10.3390/ijerph13020166.", "link": "https://doi.org/10.3390/ijerph13020166", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Norberg2003", "text": "Norberg A, Jones AW, Hahn RG, Gabrielsson JL. Role of variability in explaining ethanol pharmacokinetics: research and forensic applications. Clin Pharmacokinet. 2003;42(1):1-31. PMID 12489977; doi:10.2165/00003088-200342010-00001.", "link": "https://doi.org/10.2165/00003088-200342010-00001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Nyblom2004ASTALT", "text": "Nyblom H, Berggren U, Balldin J, Olsson R. High AST/ALT ratio may indicate advanced alcoholic liver disease rather than heavy drinking. Alcohol Alcohol. 2004;39(4):336-9. PMID 15208167; doi:10.1093/alcalc/agh074.", "link": "https://doi.org/10.1093/alcalc/agh074", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "OConnor2018JAMA", "text": "O'Connor EA, Perdue LA, Senger CA, Rushkin M, Patnode CD, Bean SI, et al. Screening and Behavioral Counseling Interventions to Reduce Unhealthy Alcohol Use in Adolescents and Adults: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force. JAMA. 2018;320(18):1910-1928. PMID 30422198; PMCID PMC13585200; doi:10.1001/jama.2018.12086.", "link": "https://doi.org/10.1001/jama.2018.12086", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "OFarrell2012", "text": "O'Farrell TJ, Clements K. Review of outcome research on marital and family therapy in treatment for alcoholism. J Marital Fam Ther. 2012;38(1):122-44. PMID 22283384; PMCID PMC3270890; doi:10.1111/j.1752-0606.2011.00242.x.", "link": "https://doi.org/10.1111/j.1752-0606.2011.00242.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "OMalley1992", "text": "O'Malley SS, Jaffe AJ, Chang G, Schottenfeld RS, Meyer RE, Rounsaville B. Naltrexone and coping skills therapy for alcohol dependence. A controlled study. Arch Gen Psychiatry. 1992;49(11):881-887. PMID 1444726; doi:10.1001/archpsyc.1992.01820110045007.", "link": "https://doi.org/10.1001/archpsyc.1992.01820110045007", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Oslin2003OPRM1", "text": "Oslin DW, Berrettini W, Kranzler HR, Pettinati H, Gelernter J, Volpicelli JR, et al. A functional polymorphism of the mu-opioid receptor gene is associated with naltrexone response in alcohol-dependent patients. Neuropsychopharmacology. 2003;28(8):1546-1552. PMID 12813472; doi:10.1038/sj.npp.1300219.", "link": "https://doi.org/10.1038/sj.npp.1300219", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Oslin2015JAMAPsych", "text": "Oslin DW, Leong SH, Lynch KG, Berrettini W, O'Brien CP, Gordon AJ, et al. Naltrexone vs Placebo for the Treatment of Alcohol Dependence: A Randomized Clinical Trial. JAMA Psychiatry. 2015;72(5):430-437. PMID 25760804; doi:10.1001/jamapsychiatry.2014.3053.", "link": "https://doi.org/10.1001/jamapsychiatry.2014.3053", "areas": ["E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Oslin2015"]}, {"key": "Pagni2026", "text": "Pagni BA, Ross S, Mennenga S, Bhatt S, Zeifman RJ, Petridis PD, et al. Safety and efficacy of psilocybin-assisted therapy for alcohol use disorder: Open-label extension of a phase II randomized controlled trial. Drug Alcohol Depend. 2026;288:113387. PMID 42913354; doi:10.1016/j.drugalcdep.2026.113387.", "link": "https://doi.org/10.1016/j.drugalcdep.2026.113387", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Parmar2026StatPearls", "text": "Parmar P, Schaffer DH, Kok SJ. Ethanol Toxicity. In: StatPearls. Treasure Island (FL): StatPearls Publishing; 2026 Jan. NCBI Bookshelf NBK557381. PMID 32491313.", "link": "https://pubmed.ncbi.nlm.nih.gov/32491313/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Patrick2023HID", "text": "Patrick ME, Parks MJ, Peterson SJ. High-intensity drinking and hours spent drinking. Alcohol Clin Exp Res (Hoboken). 2023;47(11):2081-2089. PMID 38226758; PMCID PMC10792248; doi:10.1111/acer.15189.", "link": "https://doi.org/10.1111/acer.15189", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Patterson2023", "text": "Patterson C, Giles L, Whitehead R, Greci S, Ferguson K, Fraser C, et al. Evaluating the impact of minimum unit pricing for alcohol in Scotland: a theory-based synthesis of the evidence. Lancet. 2023;402 Suppl 1:S14. PMID 37997053; doi:10.1016/S0140-6736(23)02065-2.", "link": "https://doi.org/10.1016/s0140-6736(23)02065-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pauly2019", "text": "Pauly B, Brown M, Evans J, Gray E, Schiff R, Ivsins A, et al. \"There is a Place\": impacts of managed alcohol programs for people experiencing severe alcohol dependence and homelessness. Harm Reduct J. 2019;16(1):70. PMID 31842903; PMCID PMC6916004; doi:10.1186/s12954-019-0332-4.", "link": "https://doi.org/10.1186/s12954-019-0332-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Payet2026Baclofen", "text": "Payet C, Testud A, Ardillon A, Fernandez V, Delile JM, Lapeyre-Mestre M, et al. Impact of regulatory changes on the use of baclofen in alcohol use disorders between 2014 and 2021, using the French National Health Data System. Sci Rep. 2026;16(1):16467. PMID 41888295; PMCID PMC13216332; doi:10.1038/s41598-026-44889-4.", "link": "https://doi.org/10.1038/s41598-026-44889-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Peer2013DSM5", "text": "Peer K, Rennert L, Lynch KG, Farrer L, Gelernter J, Kranzler HR. Prevalence of DSM-IV and DSM-5 alcohol, cocaine, opioid, and cannabis use disorders in a largely substance dependent sample. Drug Alcohol Depend. 2013;127(1-3):215-9. PMID 22884164; PMCID PMC3727225; doi:10.1016/j.drugalcdep.2012.07.009.", "link": "https://doi.org/10.1016/j.drugalcdep.2012.07.009", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Pfefferbaum1995", "text": "Pfefferbaum A, Sullivan EV, Mathalon DH, Shear PK, Rosenbloom MJ, Lim KO. Longitudinal changes in magnetic resonance imaging brain volumes in abstinent and relapsed alcoholics. Alcohol Clin Exp Res. 1995;19(5):1177-91. PMID 8561288; doi:10.1111/j.1530-0277.1995.tb01598.x.", "link": "https://doi.org/10.1111/j.1530-0277.1995.tb01598.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Pierce2018Baclofen", "text": "Pierce M, Sutterland A, Beraha EM, Morley K, van den Brink W. Efficacy, tolerability, and safety of low-dose and high-dose baclofen in the treatment of alcohol dependence: A systematic review and meta-analysis. Eur Neuropsychopharmacol. 2018;28(7):795-806. PMID 29934090; doi:10.1016/j.euroneuro.2018.03.017.", "link": "https://doi.org/10.1016/j.euroneuro.2018.03.017", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pizon2018", "text": "Pizon AF, Lynch MJ, Benedict NJ, Yanta JH, Frisch A, Menke NB, et al. Adjunct Ketamine Use in the Management of Severe Ethanol Withdrawal. Crit Care Med. 2018;46(8):e768-e771. PMID 29742583; doi:10.1097/CCM.0000000000003204.", "link": "https://doi.org/10.1097/ccm.0000000000003204", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pollard2020", "text": "Pollard MS, Tucker JS, Green HD Jr. Changes in Adult Alcohol Use and Consequences During the COVID-19 Pandemic in the US. JAMA Netw Open. 2020;3(9):e2022942. PMID 32990735; PMCID PMC7525354; doi:10.1001/jamanetworkopen.2020.22942.", "link": "https://doi.org/10.1001/jamanetworkopen.2020.22942", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Popova2009", "text": "Popova S, Giesbrecht N, Bekmuradov D, Patra J. Hours and days of sale and density of alcohol outlets: impacts on alcohol consumption and damage: a systematic review. Alcohol Alcohol. 2009;44(5):500-16. PMID 19734159; doi:10.1093/alcalc/agp054.", "link": "https://doi.org/10.1093/alcalc/agp054", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Popova2016Lancet", "text": "Popova S, Lange S, Shield K, Mihic A, Chudley AE, Mukherjee RAS, et al. Comorbidity of fetal alcohol spectrum disorder: a systematic review and meta-analysis. Lancet. 2016;387(10022):978-987. PMID 26777270; doi:10.1016/S0140-6736(15)01345-8.", "link": "https://doi.org/10.1016/s0140-6736(15)01345-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Popova2017LancetGH", "text": "Popova S, Lange S, Probst C, Gmel G, Rehm J. Estimation of national, regional, and global prevalence of alcohol use during pregnancy and fetal alcohol syndrome: a systematic review and meta-analysis. Lancet Glob Health. 2017;5(3):e290-e299. PMID 28089487; doi:10.1016/S2214-109X(17)30021-9.", "link": "https://doi.org/10.1016/s2214-109x(17)30021-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Posey2007Widmark", "text": "Posey D, Mozayani A. The estimation of blood alcohol concentration : Widmark revisited. Forensic Sci Med Pathol. 2007;3(1):33-9. PMID 25868887; doi:10.1385/FSMP:3:1:33.", "link": "https://doi.org/10.1385/fsmp:3:1:33", "areas": ["C", "B"], "unverified": false, "validated": "PubMed", "aliases": ["Posey2007"]}, {"key": "Powers2008", "text": "Powers MB, Vedel E, Emmelkamp PM. Behavioral couples therapy (BCT) for alcohol and drug use disorders: a meta-analysis. Clin Psychol Rev. 2008;28(6):952-62. PMID 18374464; doi:10.1016/j.cpr.2008.02.002.", "link": "https://doi.org/10.1016/j.cpr.2008.02.002", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Pragst2017SoHT", "text": "Pragst F, Suesse S, Salomone A, Vincenti M, Cirimele V, Hazon J, et al. Commentary on current changes of the SoHT 2016 consensus on alcohol markers in hair and further background information. Forensic Sci Int. 2017;278:326-333. PMID 28802209; doi:10.1016/j.forsciint.2017.07.023.", "link": "https://doi.org/10.1016/j.forsciint.2017.07.023", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Prendergast2006", "text": "Prendergast M, Podus D, Finney J, Greenwell L, Roll J. Contingency management for treatment of substance use disorders: a meta-analysis. Addiction. 2006;101(11):1546-60. PMID 17034434; doi:10.1111/j.1360-0443.2006.01581.x.", "link": "https://doi.org/10.1111/j.1360-0443.2006.01581.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Probst2015", "text": "Probst C, Manthey J, Martinez A, Rehm J. Alcohol use disorder severity and reported reasons not to seek treatment: a cross-sectional study in European primary care practices. Subst Abuse Treat Prev Policy. 2015;10:32. PMID 26264215; PMCID PMC4534056; doi:10.1186/s13011-015-0028-z.", "link": "https://doi.org/10.1186/s13011-015-0028-z", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "ProjectMATCH1997", "text": "Project MATCH Research Group. Matching Alcoholism Treatments to Client Heterogeneity: Project MATCH posttreatment drinking outcomes. J Stud Alcohol. 1997;58(1):7-29. PMID 8979210. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/8979210/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "ProjectMATCH1997Secondary", "text": "Project MATCH Research Group. Project MATCH secondary a priori hypotheses. Addiction. 1997;92(12):1671-98. PMID 9581001. No DOI listed in PubMed.", "link": "https://pubmed.ncbi.nlm.nih.gov/9581001/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "ProjectMATCH1998", "text": "Project MATCH Research Group. Matching alcoholism treatments to client heterogeneity: Project MATCH three-year drinking outcomes. Alcohol Clin Exp Res. 1998;22(6):1300-11. PMID 9756046; doi:10.1111/j.1530-0277.1998.tb03912.x.", "link": "https://doi.org/10.1111/j.1530-0277.1998.tb03912.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ray2009Family", "text": "Ray GT, Mertens JR, Weisner C. Family members of people with alcohol or drug dependence: health problems and medical cost compared to family members of people with diabetes and asthma. Addiction. 2009;104(2):203-14. PMID 19149814; PMCID PMC2896239; doi:10.1111/j.1360-0443.2008.02447.x.", "link": "https://doi.org/10.1111/j.1360-0443.2008.02447.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ray2014Children", "text": "Ray GT, Mertens JR, Weisner C. Comparison of health care needs of child family members of adults with alcohol or drug dependence versus adults with asthma or diabetes. J Dev Behav Pediatr. 2014;35(4):282-91. PMID 24799266; PMCID PMC4123818; doi:10.1097/DBP.0000000000000049.", "link": "https://doi.org/10.1097/dbp.0000000000000049", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ray2020CBT", "text": "Ray LA, Meredith LR, Kiluk BD, Walthers J, Carroll KM, Magill M. Combined Pharmacotherapy and Cognitive Behavioral Therapy for Adults With Alcohol or Substance Use Disorders: A Systematic Review and Meta-analysis. JAMA Netw Open. 2020;3(6):e208279. PMID 32558914; PMCID PMC7305524; doi:10.1001/jamanetworkopen.2020.8279.", "link": "https://doi.org/10.1001/jamanetworkopen.2020.8279", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2009Lancet", "text": "Rehm J, Mathers C, Popova S, Thavorncharoensap M, Teerawattananon Y, Patra J. Global burden of disease and injury and economic cost attributable to alcohol use and alcohol-use disorders. Lancet. 2009;373(9682):2223-33. PMID 19560604; doi:10.1016/S0140-6736(09)60746-7.", "link": "https://doi.org/10.1016/s0140-6736(09)60746-7", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2010Cirrhosis", "text": "Rehm J, Taylor B, Mohapatra S, Irving H, Baliunas D, Patra J, et al. Alcohol as a risk factor for liver cirrhosis: a systematic review and meta-analysis. Drug Alcohol Rev. 2010;29(4):437-45. PMID 20636661; doi:10.1111/j.1465-3362.2009.00153.x.", "link": "https://doi.org/10.1111/j.1465-3362.2009.00153.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2015BMCFam", "text": "Rehm J, Allamani A, Elekes Z, Jakubczyk A, Manthey J, Probst C, et al. Alcohol dependence and treatment utilization in Europe - a representative cross-sectional study in primary care. BMC Fam Pract. 2015;16:90. PMID 26219430; PMCID PMC4518612; doi:10.1186/s12875-015-0308-8.", "link": "https://doi.org/10.1186/s12875-015-0308-8", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2015EurPsych", "text": "Rehm J, Manthey J, Struzzo P, Gual A, Wojnar M. Who receives treatment for alcohol use disorders in the European Union? A cross-sectional representative study in primary and specialized health care. Eur Psychiatry. 2015;30(8):885-93. PMID 26647862; doi:10.1016/j.eurpsy.2015.07.012.", "link": "https://doi.org/10.1016/j.eurpsy.2015.07.012", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rehm2017Addiction", "text": "Rehm J, Gmel GE Sr, Gmel G, Hasan OSM, Imtiaz S, Popova S, et al. The relationship between different dimensions of alcohol use and the burden of disease-an update. Addiction. 2017;112(6):968-1001. PMID 28220587; PMCID PMC5434904; doi:10.1111/add.13757.", "link": "https://doi.org/10.1111/add.13757", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Reinert2002AUDIT", "text": "Reinert DF, Allen JP. The Alcohol Use Disorders Identification Test (AUDIT): a review of recent research. Alcohol Clin Exp Res. 2002;26(2):272-9. PMID 11964568.", "link": "https://pubmed.ncbi.nlm.nih.gov/11964568/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Reoux2000", "text": "Reoux JP, Miller K. Routine hospital alcohol detoxification practice compared to symptom triggered management with an Objective Withdrawal Scale (CIWA-Ar). Am J Addict. 2000;9(2):135-44. PMID 10934575; doi:10.1080/10550490050173208.", "link": "https://doi.org/10.1080/10550490050173208", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Reus2018APA", "text": "Reus VI, Fochtmann LJ, Bukstein O, Eyler AE, Hilty DM, Horvitz-Lennon M, et al. The American Psychiatric Association Practice Guideline for the Pharmacological Treatment of Patients With Alcohol Use Disorder. Am J Psychiatry. 2018;175(1):86-90. PMID 29301420; doi:10.1176/appi.ajp.2017.1750101. Guideline text not accessible; positions taken from reviews quoting it.", "link": "https://doi.org/10.1176/appi.ajp.2017.1750101", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Reynaud2017Alpadir", "text": "Reynaud M, Aubin HJ, Trinquet F, Zakine B, Dano C, Dematteis M, et al. A Randomized, Placebo-Controlled Study of High-Dose Baclofen in Alcohol-Dependent Patients-The ALPADIR Study. Alcohol Alcohol. 2017;52(4):439-446. PMID 28525555; doi:10.1093/alcalc/agx030.", "link": "https://doi.org/10.1093/alcalc/agx030", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ridley2013AlzResTher", "text": "Ridley NJ, Draper B, Withall A. Alcohol-related dementia: an update of the evidence. Alzheimers Res Ther. 2013;5(1):3. PMID 23347747; PMCID PMC3580328; doi:10.1186/alzrt157.", "link": "https://doi.org/10.1186/alzrt157", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rigal2020Bacloville", "text": "Rigal L, Sidorkiewicz S, Tréluyer JM, Perrodeau E, Le Jeunne C, Porcher R, et al. Titrated baclofen for high-risk alcohol consumption: a randomized placebo-controlled trial in out-patients with 1-year follow-up. Addiction. 2020;115(7):1265-1276. PMID 31833590; doi:10.1111/add.14927.", "link": "https://doi.org/10.1111/add.14927", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Riper2014Depression", "text": "Riper H, Andersson G, Hunter SB, de Wit J, Berking M, Cuijpers P. Treatment of comorbid alcohol use disorders and depression with cognitive-behavioural therapy and motivational interviewing: a meta-analysis. Addiction. 2014;109(3):394-406. PMID 24304463; PMCID PMC4227588; doi:10.1111/add.12441.", "link": "https://doi.org/10.1111/add.12441", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Riper2018IPD", "text": "Riper H, Hoogendoorn A, Cuijpers P, Karyotaki E, Boumparis N, Mira A, et al. Effectiveness and treatment moderators of internet interventions for adult problem drinking: An individual patient data meta-analysis of 19 randomised controlled trials. PLoS Med. 2018;15(12):e1002714. PMID 30562347; PMCID PMC6298657; doi:10.1371/journal.pmed.1002714.", "link": "https://doi.org/10.1371/journal.pmed.1002714", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rizwan2026", "text": "Rizwan ZM, Brown D, Barry S, Guppy K, Gerberi DJ, Gajic O, et al. Phenobarbital Versus Benzodiazepine-Based Pathways for Alcohol Withdrawal Syndrome in Critically Ill Adults: A Systematic Review and Meta-Analysis. Pharmacotherapy. 2026;46(9):e70197. PMID 42634386; PMCID PMC13501059; doi:10.1002/phar.70197.", "link": "https://doi.org/10.1002/phar.70197", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Roberts2016", "text": "Roberts NP, Roberts PA, Jones N, Bisson JI. Psychological therapies for post-traumatic stress disorder and comorbid substance use disorder. Cochrane Database Syst Rev. 2016;4(4):CD010204. PMID 27040448; PMCID PMC8782594; doi:10.1002/14651858.CD010204.pub2.", "link": "https://doi.org/10.1002/14651858.cd010204.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roberts2019", "text": "Roberts E, Morse R, Epstein S, Hotopf M, Leon D, Drummond C. The prevalence of wholly attributable alcohol conditions in the United Kingdom hospital system: a systematic review, meta-analysis and meta-regression. Addiction. 2019;114(10):1726-1737. PMID 31269539; PMCID PMC6771834; doi:10.1111/add.14642.", "link": "https://doi.org/10.1111/add.14642", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roerecke2013Mortality", "text": "Roerecke M, Rehm J. Alcohol use disorders and mortality: a systematic review and meta-analysis. Addiction. 2013;108(9):1562-78. PMID 23627868; doi:10.1111/add.12231.", "link": "https://doi.org/10.1111/add.12231", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roerecke2013Reduction", "text": "Roerecke M, Gual A, Rehm J. Reduction of alcohol consumption and subsequent mortality in alcohol use disorders: systematic review and meta-analyses. J Clin Psychiatry. 2013;74(12):e1181-9. PMID 24434106; doi:10.4088/JCP.13r08379.", "link": "https://doi.org/10.4088/jcp.13r08379", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roerecke2014", "text": "Roerecke M, Rehm J. Cause-specific mortality risk in alcohol use disorder treatment patients: a systematic review and meta-analysis. Int J Epidemiol. 2014;43(3):906-19. PMID 24513684; doi:10.1093/ije/dyu018.", "link": "https://doi.org/10.1093/ije/dyu018", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Roerecke2017LPH", "text": "Roerecke M, Kaczorowski J, Tobe SW, Gmel G, Hasan OSM, Rehm J. The effect of a reduction in alcohol consumption on blood pressure: a systematic review and meta-analysis. Lancet Public Health. 2017;2(2):e108-e120. PMID 29253389; PMCID PMC6118407; doi:10.1016/S2468-2667(17)30003-8.", "link": "https://doi.org/10.1016/s2468-2667(17)30003-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rogmark2026", "text": "Rogmark C, Malmgren L, Holmgren A, Magnusson Å, Pyrhönen HS. Alcohol use is common in older patients with fall-related fractures: a secondary analysis from a prospective cohort study using PEth as an objective assessment of consumption. Acta Orthop. 2026;97:743-750. PMID 42894497; PMCID PMC13678457; doi:10.2340/17453674.2026.46961.", "link": "https://doi.org/10.2340/17453674.2026.46961", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roozen2004CRA", "text": "Roozen HG, Boulogne JJ, van Tulder MW, van den Brink W, De Jong CA, Kerkhof AJ. A systematic review of the effectiveness of the community reinforcement approach in alcohol, cocaine and opioid addiction. Drug Alcohol Depend. 2004;74(1):1-13. PMID 15072802; doi:10.1016/j.drugalcdep.2003.12.006.", "link": "https://doi.org/10.1016/j.drugalcdep.2003.12.006", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Roozen2010CRAFT", "text": "Roozen HG, de Waart R, van der Kroft P. Community reinforcement and family training: an effective option to engage treatment-resistant substance-abusing individuals in treatment. Addiction. 2010;105(10):1729-38. PMID 20626372; doi:10.1111/j.1360-0443.2010.03016.x.", "link": "https://doi.org/10.1111/j.1360-0443.2010.03016.x", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Roozen2010"]}, {"key": "Rosenson2013", "text": "Rosenson J, Clements C, Simon B, Vieaux J, Graffman S, Vahidnia F, et al. Phenobarbital for acute alcohol withdrawal: a prospective randomized double-blind placebo-controlled study. J Emerg Med. 2013;44(3):592-598.e2. PMID 22999778; doi:10.1016/j.jemermed.2012.07.056.", "link": "https://doi.org/10.1016/j.jemermed.2012.07.056", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Rosner2010Acamprosate", "text": "Rösner S, Hackl-Herrwerth A, Leucht S, Lehert P, Vecchi S, Soyka M. Acamprosate for alcohol dependence. Cochrane Database Syst Rev. 2010;2010(9):CD004332. PMID 20824837; PMCID PMC12147086; doi:10.1002/14651858.CD004332.pub2.", "link": "https://doi.org/10.1002/14651858.cd004332.pub2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rosner2010Naltrexone", "text": "Rösner S, Hackl-Herrwerth A, Leucht S, Vecchi S, Srisurapanont M, Soyka M. Opioid antagonists for alcohol dependence. Cochrane Database Syst Rev. 2010;2010(12):CD001867. PMID 21154349; PMCID PMC13590218; doi:10.1002/14651858.CD001867.pub3.", "link": "https://doi.org/10.1002/14651858.cd001867.pub3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rubinsky2010AUDITZones", "text": "Rubinsky AD, Kivlahan DR, Volk RJ, Maynard C, Bradley KA. Estimating risk of alcohol dependence using alcohol screening scores. Drug Alcohol Depend. 2010;108(1-2):29-36. PMID 20042299; PMCID PMC2835806; doi:10.1016/j.drugalcdep.2009.11.009.", "link": "https://doi.org/10.1016/j.drugalcdep.2009.11.009", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rumgay2021LancetOncol", "text": "Rumgay H, Shield K, Charvat H, Ferrari P, Sornpaisarn B, Obot I, et al. Global burden of cancer in 2020 attributable to alcohol consumption: a population-based study. Lancet Oncol. 2021;22(8):1071-1080. PMID 34270924; PMCID PMC8324483; doi:10.1016/S1470-2045(21)00279-5.", "link": "https://doi.org/10.1016/s1470-2045(21)00279-5", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sabia2018BMJ", "text": "Sabia S, Fayosse A, Dumurgier J, Dugravot A, Akbaraly T, Britton A, et al. Alcohol consumption and risk of dementia: 23 year follow-up of Whitehall II cohort study. BMJ. 2018;362:k2927. PMID 30068508; PMCID PMC6066998; doi:10.1136/bmj.k2927.", "link": "https://doi.org/10.1136/bmj.k2927", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sacks2015", "text": "Sacks JJ, Gonzales KR, Bouchery EE, Tomedi LE, Brewer RD. 2010 National and State Costs of Excessive Alcohol Consumption. Am J Prev Med. 2015;49(5):e73-e79. PMID 26477807; doi:10.1016/j.amepre.2015.05.031.", "link": "https://doi.org/10.1016/j.amepre.2015.05.031", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Saitz1994", "text": "Saitz R, Mayo-Smith MF, Roberts MS, Redmond HA, Bernard DR, Calkins DR. Individualized treatment for alcohol withdrawal. A randomized double-blind controlled trial. JAMA. 1994;272(7):519-23. PMID 8046805; doi:10.1001/jama.1994.03520070039035.", "link": "https://doi.org/10.1001/jama.1994.03520070039035", "areas": ["H", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Saitz1994JAMA"]}, {"key": "Saitz1998AHRW", "text": "Saitz R. Introduction to alcohol withdrawal. Alcohol Health Res World. 1998;22(1):5-12. PMID 15706727; PMCID PMC6761824.", "link": "https://pubmed.ncbi.nlm.nih.gov/15706727/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Saitz2010", "text": "Saitz R. Alcohol screening and brief intervention in primary care: Absence of evidence for efficacy in people with dependence or very heavy drinking. Drug Alcohol Rev. 2010;29(6):631-40. PMID 20973848; PMCID PMC2966031; doi:10.1111/j.1465-3362.2010.00217.x.", "link": "https://doi.org/10.1111/j.1465-3362.2010.00217.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Samokhvalov2015EBioMed", "text": "Samokhvalov AV, Rehm J, Roerecke M. Alcohol Consumption as a Risk Factor for Acute and Chronic Pancreatitis: A Systematic Review and a Series of Meta-analyses. EBioMedicine. 2015;2(12):1996-2002. PMID 26844279; PMCID PMC4703772; doi:10.1016/j.ebiom.2015.11.023.", "link": "https://doi.org/10.1016/j.ebiom.2015.11.023", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Saunders1993AUDIT", "text": "Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol Consumption--II. Addiction. 1993;88(6):791-804. PMID 8329970; doi:10.1111/j.1360-0443.1993.tb02093.x.", "link": "https://doi.org/10.1111/j.1360-0443.1993.tb02093.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Saunders2019ICD11", "text": "Saunders JB, Degenhardt L, Reed GM, Poznyak V. Alcohol Use Disorders in ICD-11: Past, Present, and Future. Alcohol Clin Exp Res. 2019;43(8):1617-1631. PMID 31194891; doi:10.1111/acer.14128.", "link": "https://doi.org/10.1111/acer.14128", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Schabelman2012", "text": "Schabelman E, Kuo D. Glucose before thiamine for Wernicke encephalopathy: a literature review. J Emerg Med. 2012;42(4):488-94. PMID 22104258; doi:10.1016/j.jemermed.2011.05.076.", "link": "https://doi.org/10.1016/j.jemermed.2011.05.076", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schacht2026", "text": "Schacht JP, Sakai JT, Raymond K, Shelton R. Oral Semaglutide for Alcohol Use Disorder: A Randomized Clinical Trial. Am J Psychiatry. 2026;183(9):636-645. PMID 42522065; PMCID PMC13567346; doi:10.1176/appi.ajp.20260003.", "link": "https://doi.org/10.1176/appi.ajp.20260003", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Schomerus2011", "text": "Schomerus G, Lucht M, Holzinger A, Matschinger H, Carta MG, Angermeyer MC. The stigma of alcohol dependence compared with other mental disorders: a review of population studies. Alcohol Alcohol. 2011;46(2):105-12. PMID 21169612; doi:10.1093/alcalc/agq089.", "link": "https://doi.org/10.1093/alcalc/agq089", "areas": ["A", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Schrock2017PEth", "text": "Schröck A, Wurst FM, Thon N, Weinmann W. Assessing phosphatidylethanol (PEth) levels reflecting different drinking habits in comparison to the alcohol use disorders identification test - C (AUDIT-C). Drug Alcohol Depend. 2017;178:80-86. PMID 28645063; doi:10.1016/j.drugalcdep.2017.04.026.", "link": "https://doi.org/10.1016/j.drugalcdep.2017.04.026", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Schuckit1995", "text": "Schuckit MA, Tipp JE, Reich T, Hesselbrock VM, Bucholz KK. The histories of withdrawal convulsions and delirium tremens in 1648 alcohol dependent subjects. Addiction. 1995;90(10):1335-47. PMID 8616462; doi:10.1046/j.1360-0443.1995.901013355.x.", "link": "https://doi.org/10.1046/j.1360-0443.1995.901013355.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schwarzinger2018LPH", "text": "Schwarzinger M, Pollock BG, Hasan OSM, Dufouil C, Rehm J. Contribution of alcohol use disorders to the burden of dementia in France 2008-13: a nationwide retrospective cohort study. Lancet Public Health. 2018;3(3):e124-e132. PMID 29475810; doi:10.1016/S2468-2667(18)30022-7.", "link": "https://doi.org/10.1016/s2468-2667(18)30022-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Schwenker2023", "text": "Schwenker R, Dietrich CE, Hirpa S, Nothacker M, Smedslund G, Frese T, et al. Motivational interviewing for substance use reduction. Cochrane Database Syst Rev. 2023;12(12):CD008063. PMID 38084817; PMCID PMC10714668; doi:10.1002/14651858.CD008063.pub3.", "link": "https://doi.org/10.1002/14651858.cd008063.pub3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Scouller2000CDT", "text": "Scouller K, Conigrave KM, Macaskill P, Irwig L, Whitfield JB. Should we use carbohydrate-deficient transferrin instead of gamma-glutamyltransferase for detecting problem drinkers? A systematic review and metaanalysis. Clin Chem. 2000;46(12):1894-902. PMID 11106319.", "link": "https://pubmed.ncbi.nlm.nih.gov/11106319/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Searle2015", "text": "Searle J. Alcohol calculations and their uncertainty. Med Sci Law. 2015;55(1):58-64. PMID 24644224; PMCID PMC4361698; doi:10.1177/0025802414524385.", "link": "https://doi.org/10.1177/0025802414524385", "areas": ["B", "C"], "unverified": false, "validated": "PubMed", "aliases": ["Searle2015Uncertainty"]}, {"key": "Sechi2007", "text": "Sechi G, Serra A. Wernicke's encephalopathy: new clinical settings and recent advances in diagnosis and management. Lancet Neurol. 2007;6(5):442-55. PMID 17434099; doi:10.1016/S1474-4422(07)70104-7.", "link": "https://doi.org/10.1016/s1474-4422(07)70104-7", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Seitz2007", "text": "Seitz HK, Stickel F. Molecular mechanisms of alcohol-mediated carcinogenesis. Nat Rev Cancer. 2007;7(8):599-612. PMID 17646865; doi:10.1038/nrc2191.", "link": "https://doi.org/10.1038/nrc2191", "areas": ["B", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Seitz2007NRC"]}, {"key": "Seitz2018NRDP", "text": "Seitz HK, Bataller R, Cortez-Pinto H, Gao B, Gual A, Lackner C, et al. Alcoholic liver disease. Nat Rev Dis Primers. 2018;4(1):16. PMID 30115921; doi:10.1038/s41572-018-0014-7.", "link": "https://doi.org/10.1038/s41572-018-0014-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Seshadri2022AAST", "text": "Seshadri A, Appelbaum R, Carmichael SP 2nd, Farrell MS, Filiberto DM, Jawa R, et al. Prevention of alcohol withdrawal syndrome in the surgical ICU: an American Association for the Surgery of Trauma Critical Care Committee Clinical Consensus Document. Trauma Surg Acute Care Open. 2022;7(1):e001010. PMID 36425749; PMCID PMC9680182; doi:10.1136/tsaco-2022-001010.", "link": "https://doi.org/10.1136/tsaco-2022-001010", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sessler2002RASS", "text": "Sessler CN, Gosnell MS, Grap MJ, Brophy GM, O'Neal PV, Keane KA, et al. The Richmond Agitation-Sedation Scale: validity and reliability in adult intensive care unit patients. Am J Respir Crit Care Med. 2002;166(10):1338-44. PMID 12421743; doi:10.1164/rccm.2107138.", "link": "https://doi.org/10.1164/rccm.2107138", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Shenoi2019CRAFFT", "text": "Shenoi RP, Linakis JG, Bromberg JR, Casper TC, Richards R, Mello MJ, et al. Predictive Validity of the CRAFFT for Substance Use Disorder. Pediatrics. 2019;144(2):e20183415. PMID 31341007; PMCID PMC6855834; doi:10.1542/peds.2018-3415.", "link": "https://doi.org/10.1542/peds.2018-3415", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shield2020", "text": "Shield K, Manthey J, Rylett M, Probst C, Wettlaufer A, Parry CDH, et al. National, regional, and global burdens of disease from 2000 to 2016 attributable to alcohol use: a comparative risk assessment study. Lancet Public Health. 2020;5(1):e51-e61. PMID 31910980; doi:10.1016/S2468-2667(19)30231-2.", "link": "https://doi.org/10.1016/s2468-2667(19)30231-2", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Shield2025", "text": "Shield K, Franklin A, Wettlaufer A, Sohi I, Bhulabhai M, Farkouh EK, et al. National, regional, and global statistics on alcohol consumption and associated burden of disease 2000-20: a modelling study and comparative risk assessment. Lancet Public Health. 2025;10(9):e751-e761. PMID 40883042; PMCID PMC12394792; doi:10.1016/S2468-2667(25)00174-4.", "link": "https://doi.org/10.1016/s2468-2667(25)00174-4", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Simpson2018Prazosin", "text": "Simpson TL, Saxon AJ, Stappenbeck C, Malte CA, Lyons R, Tell D, et al. Double-Blind Randomized Clinical Trial of Prazosin for Alcohol Use Disorder. Am J Psychiatry. 2018;175(12):1216-1224. PMID 30153753; PMCID PMC6395537; doi:10.1176/appi.ajp.2018.17080913.", "link": "https://doi.org/10.1176/appi.ajp.2018.17080913", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Singal2018ACG", "text": "Singal AK, Bataller R, Ahn J, Kamath PS, Shah VH. ACG Clinical Guideline: Alcoholic Liver Disease. Am J Gastroenterol. 2018;113(2):175-194. PMID 29336434; PMCID PMC6524956; doi:10.1038/ajg.2017.469.", "link": "https://doi.org/10.1038/ajg.2017.469", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Skinner2014Disulfiram", "text": "Skinner MD, Lahmek P, Pham H, Aubin HJ. Disulfiram efficacy in the treatment of alcohol dependence: a meta-analysis. PLoS One. 2014;9(2):e87366. PMID 24520330; PMCID PMC3919718; doi:10.1371/journal.pone.0087366.", "link": "https://doi.org/10.1371/journal.pone.0087366", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Slade2016", "text": "Slade T, Chapman C, Swift W, Keyes K, Tonks Z, Teesson M. Birth cohort trends in the global epidemiology of alcohol use and alcohol-related harms in men and women: systematic review and metaregression. BMJ Open. 2016;6(10):e011827. PMID 27797998; PMCID PMC5093369; doi:10.1136/bmjopen-2016-011827.", "link": "https://doi.org/10.1136/bmjopen-2016-011827", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Smedslund2011", "text": "Smedslund G, Berg RC, Hammerstrøm KT, Steiro A, Leiknes KA, Dahl HM, et al. Motivational interviewing for substance abuse. Cochrane Database Syst Rev. 2011;2011(5):CD008063. PMID 21563163; PMCID PMC8939890; doi:10.1002/14651858.CD008063.pub2.", "link": "https://doi.org/10.1002/14651858.cd008063.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2009JGIM", "text": "Smith PC, Schmidt SM, Allensworth-Davies D, Saitz R. Primary care validation of a single-question alcohol screening test. J Gen Intern Med. 2009;24(7):783-8. PMID 19247718; PMCID PMC2695521; doi:10.1007/s11606-009-0928-6.", "link": "https://doi.org/10.1007/s11606-009-0928-6", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2016PTSD", "text": "Smith SM, Goldstein RB, Grant BF. The association between post-traumatic stress disorder and lifetime DSM-5 psychiatric disorders among veterans: Data from the National Epidemiologic Survey on Alcohol and Related Conditions-III (NESARC-III). J Psychiatr Res. 2016;82:16-22. PMID 27455424; PMCID PMC5026976; doi:10.1016/j.jpsychires.2016.06.022.", "link": "https://doi.org/10.1016/j.jpsychires.2016.06.022", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Sobell2000", "text": "Sobell LC, Ellingstad TP, Sobell MB. Natural recovery from alcohol and drug problems: methodological review of the research with suggestions for future directions. Addiction. 2000;95(5):749-64. PMID 10885050; doi:10.1046/j.1360-0443.2000.95574911.x.", "link": "https://doi.org/10.1046/j.1360-0443.2000.95574911.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sokol1989TACE", "text": "Sokol RJ, Martier SS, Ager JW. The T-ACE questions: practical prenatal detection of risk-drinking. Am J Obstet Gynecol. 1989;160(4):863-8; discussion 868-70. PMID 2712118; doi:10.1016/0002-9378(89)90302-5.", "link": "https://doi.org/10.1016/0002-9378(89)90302-5", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stewart2014PEth", "text": "Stewart SH, Koch DG, Willner IR, Anton RF, Reuben A. Validation of blood phosphatidylethanol as an alcohol consumption biomarker in patients with chronic liver disease. Alcohol Clin Exp Res. 2014;38(6):1706-11. PMID 24848614; PMCID PMC4409698; doi:10.1111/acer.12442.", "link": "https://doi.org/10.1111/acer.12442", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stockwell2015", "text": "Stockwell T. The alcohol dependence syndrome: a legacy of continuing clinical and scientific importance. Addiction. 2015;110 Suppl 2:8-11. PMID 26042560; doi:10.1111/add.12901.", "link": "https://doi.org/10.1111/add.12901", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Stockwell2016JSAD", "text": "Stockwell T, Zhao J, Panwar S, Roemer A, Naimi T, Chikritzhs T. Do \"Moderate\" Drinkers Have Reduced Mortality Risk? A Systematic Review and Meta-Analysis of Alcohol Consumption and All-Cause Mortality. J Stud Alcohol Drugs. 2016;77(2):185-98. PMID 26997174; PMCID PMC4803651; doi:10.15288/jsad.2016.77.185.", "link": "https://doi.org/10.15288/jsad.2016.77.185", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Stockwell2021", "text": "Stockwell T, Zhao J, Pauly B, Chow C, Vallance K, Wettlaufer A, et al. Trajectories of Alcohol Use and Related Harms for Managed Alcohol Program Participants over 12 Months Compared with Local Controls: A Quasi-Experimental Study. Alcohol Alcohol. 2021;56(6):651-659. PMID 33418568; doi:10.1093/alcalc/agaa134.", "link": "https://doi.org/10.1093/alcalc/agaa134", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Stoddard2015", "text": "Stoddard J, Zummo J. Oral and long-acting injectable naltrexone: removal of boxed warning for hepatotoxicity. J Clin Psychiatry. 2015;76(12):1695. PMID 26717532; doi:10.4088/JCP.15lr09974.", "link": "https://doi.org/10.4088/jcp.15lr09974", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Streissguth2004JDBP", "text": "Streissguth AP, Bookstein FL, Barr HM, Sampson PD, O'Malley K, Young JK. Risk factors for adverse life outcomes in fetal alcohol syndrome and fetal alcohol effects. J Dev Behav Pediatr. 2004;25(4):228-38. PMID 15308923; doi:10.1097/00004703-200408000-00002.", "link": "https://doi.org/10.1097/00004703-200408000-00002", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sullivan1989CIWA", "text": "Sullivan JT, Sykora K, Schneiderman J, Naranjo CA, Sellers EM. Assessment of alcohol withdrawal: the revised clinical institute withdrawal assessment for alcohol scale (CIWA-Ar). Br J Addict. 1989;84(11):1353-7. PMID 2597811; doi:10.1111/j.1360-0443.1989.tb00737.x.", "link": "https://doi.org/10.1111/j.1360-0443.1989.tb00737.x", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Sundermann2019ACER", "text": "Sundermann AC, Zhao S, Young CL, Lam L, Jones SH, Velez Edwards DR, et al. Alcohol Use in Pregnancy and Miscarriage: A Systematic Review and Meta-Analysis. Alcohol Clin Exp Res. 2019;43(8):1606-1616. PMID 31194258; PMCID PMC6677630; doi:10.1111/acer.14124.", "link": "https://doi.org/10.1111/acer.14124", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tabakoff2013", "text": "Tabakoff B, Hoffman PL. The neurobiology of alcohol consumption and alcoholism: an integrative history. Pharmacol Biochem Behav. 2013;113:20-37. PMID 24141171; PMCID PMC3867277; doi:10.1016/j.pbb.2013.10.009.", "link": "https://doi.org/10.1016/j.pbb.2013.10.009", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Tang2026", "text": "Tang H, Zhang B, Lu Y, Lu Y, Wang H, Davis CN, et al. Semaglutide, Tirzepatide and Clinically Recorded Alcohol-Related Outcomes in Type 2 Diabetes: A Target Trial Emulation. Diabetes Obes Metab. 2026 (epub ahead of print). PMID 42977546; doi:10.1111/dom.71470.", "link": "https://doi.org/10.1111/dom.71470", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Tapper2018BMJ", "text": "Tapper EB, Parikh ND. Mortality due to cirrhosis and liver cancer in the United States, 1999-2016: observational study. BMJ. 2018;362:k2817. PMID 30021785; PMCID PMC6050518; doi:10.1136/bmj.k2817.", "link": "https://doi.org/10.1136/bmj.k2817", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Taylor2010DAD", "text": "Taylor B, Irving HM, Kanteres F, Room R, Borges G, Cherpitel C, et al. The more you drink, the harder you fall: a systematic review and meta-analysis of how acute alcohol consumption and injury or collision risk increase together. Drug Alcohol Depend. 2010;110(1-2):108-16. PMID 20236774; PMCID PMC2887748; doi:10.1016/j.drugalcdep.2010.02.011.", "link": "https://doi.org/10.1016/j.drugalcdep.2010.02.011", "areas": ["G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Taylor2010"]}, {"key": "Teli1995Lancet", "text": "Teli MR, Day CP, Burt AD, Bennett MK, James OF. Determinants of progression to cirrhosis or fibrosis in pure alcoholic fatty liver. Lancet. 1995;346(8981):987-90. PMID 7475591; doi:10.1016/s0140-6736(95)91685-7.", "link": "https://doi.org/10.1016/s0140-6736(95)91685-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Terpstra2020", "text": "Terpstra C, Scholey A, Verster JC, Benson S. Prevalence of Hangover Resistance According to Two Methods for Calculating Estimated Blood Alcohol Concentration (eBAC). J Clin Med. 2020;9(9):2823. PMID 32878265; PMCID PMC7564564; doi:10.3390/jcm9092823.", "link": "https://doi.org/10.3390/jcm9092823", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Thierauf2009TraceEtG", "text": "Thierauf A, Halter CC, Rana S, Auwaerter V, Wohlfarth A, Wurst FM, et al. Urine tested positive for ethyl glucuronide after trace amounts of ethanol. Addiction. 2009;104(12):2007-12. PMID 19922567; doi:10.1111/j.1360-0443.2009.02722.x.", "link": "https://doi.org/10.1111/j.1360-0443.2009.02722.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Thierauf2010BeerEtG", "text": "Thierauf A, Gnann H, Wohlfarth A, Auwärter V, Perdekamp MG, Buttler KJ, et al. Urine tested positive for ethyl glucuronide and ethyl sulphate after the consumption of \"non-alcoholic\" beer. Forensic Sci Int. 2010;202(1-3):82-5. PMID 20457499; doi:10.1016/j.forsciint.2010.04.031.", "link": "https://doi.org/10.1016/j.forsciint.2010.04.031", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Thompson2024JHEP", "text": "Thompson R, Taddei T, Kaplan D, Rabiee A. Safety of naltrexone in patients with cirrhosis. JHEP Rep. 2024;6(7):101095. PMID 38961852; PMCID PMC11220533; doi:10.1016/j.jhepr.2024.101095. Full text read on Europe PMC.", "link": "https://doi.org/10.1016/j.jhepr.2024.101095", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Thomson2002RCP", "text": "Thomson AD, Cook CC, Touquet R, Henry JA. The Royal College of Physicians report on alcohol: guidelines for managing Wernicke's encephalopathy in the accident and Emergency Department. Alcohol Alcohol. 2002;37(6):513-21. PMID 12414541; doi:10.1093/alcalc/37.6.513.", "link": "https://doi.org/10.1093/alcalc/37.6.513", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Thomson2006Natural", "text": "Thomson AD, Marshall EJ. The natural history and pathophysiology of Wernicke's Encephalopathy and Korsakoff's Psychosis. Alcohol Alcohol. 2006;41(2):151-8. PMID 16384871; doi:10.1093/alcalc/agh249.", "link": "https://doi.org/10.1093/alcalc/agh249", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Thursz2015STOPAH", "text": "Thursz MR, Richardson P, Allison M, Austin A, Bowers M, Day CP, et al. Prednisolone or pentoxifylline for alcoholic hepatitis. N Engl J Med. 2015;372(17):1619-28. PMID 25901427; doi:10.1056/NEJMoa1412278.", "link": "https://doi.org/10.1056/nejmoa1412278", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tidwell2018", "text": "Tidwell WP, Thomas TL, Pouliot JD, Canonico AE, Webber AJ. Treatment of Alcohol Withdrawal Syndrome: Phenobarbital vs CIWA-Ar Protocol. Am J Crit Care. 2018;27(6):454-460. PMID 30385536; doi:10.4037/ajcc2018745.", "link": "https://doi.org/10.4037/ajcc2018745", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Timko2013", "text": "Timko C, Cronkite R, Kaskutas LA, Laudet A, Roth J, Moos RH. Al-Anon family groups: newcomers and members. J Stud Alcohol Drugs. 2013;74(6):965-76. PMID 24172125; PMCID PMC3817053; doi:10.15288/jsad.2013.74.965.", "link": "https://doi.org/10.15288/jsad.2013.74.965", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Topiwala2017", "text": "Topiwala A, Allan CL, Valkanova V, Zsoldos E, Filippini N, Sexton C, et al. Moderate alcohol consumption as risk factor for adverse brain outcomes and cognitive decline: longitudinal cohort study. BMJ. 2017;357:j2353. PMID 28588063; PMCID PMC5460586; doi:10.1136/bmj.j2353.", "link": "https://doi.org/10.1136/bmj.j2353", "areas": ["B", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Topiwala2017BMJ"]}, {"key": "Tori2020", "text": "Tori ME, Larochelle MR, Naimi TS. Alcohol or Benzodiazepine Co-involvement With Opioid Overdose Deaths in the United States, 1999-2017. JAMA Netw Open. 2020;3(4):e202361. PMID 32271389; PMCID PMC7146101; doi:10.1001/jamanetworkopen.2020.2361.", "link": "https://doi.org/10.1001/jamanetworkopen.2020.2361", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Torvik1982", "text": "Torvik A, Lindboe CF, Rogde S. Brain lesions in alcoholics. A neuropathological study with clinical correlations. J Neurol Sci. 1982;56(2-3):233-48. PMID 7175549; doi:10.1016/0022-510x(82)90145-9.", "link": "https://doi.org/10.1016/0022-510x(82)90145-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "TsaiCoyle1998", "text": "Tsai G, Coyle JT. The role of glutamatergic neurotransmission in the pathophysiology of alcoholism. Annu Rev Med. 1998;49:173-84. PMID 9509257; doi:10.1146/annurev.med.49.1.173.", "link": "https://doi.org/10.1146/annurev.med.49.1.173", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "UKATT2005", "text": "UKATT Research Team. Effectiveness of treatment for alcohol problems: findings of the randomised UK alcohol treatment trial (UKATT). BMJ. 2005;331(7516):541. PMID 16150764; PMCID PMC1200586; doi:10.1136/bmj.331.7516.541.", "link": "https://doi.org/10.1136/bmj.331.7516.541", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "UKATT2005Cost", "text": "UKATT Research Team. Cost effectiveness of treatment for alcohol problems: findings of the randomised UK alcohol treatment trial (UKATT). BMJ. 2005;331(7516):544. PMID 16150765; PMCID PMC1200587; doi:10.1136/bmj.331.7516.544.", "link": "https://doi.org/10.1136/bmj.331.7516.544", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ulwelling2018PEth", "text": "Ulwelling W, Smith K. The PEth Blood Test in the Security Environment: What it is; Why it is Important; and Interpretative Guidelines. J Forensic Sci. 2018;63(6):1634-1640. PMID 30005144; doi:10.1111/1556-4029.13874.", "link": "https://doi.org/10.1111/1556-4029.13874", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "USPSTF2018Alcohol", "text": "US Preventive Services Task Force; Curry SJ, Krist AH, Owens DK, Barry MJ, Caughey AB, Davidson KW, et al. Screening and Behavioral Counseling Interventions to Reduce Unhealthy Alcohol Use in Adolescents and Adults: US Preventive Services Task Force Recommendation Statement. JAMA. 2018;320(18):1899-1909. PMID 30422199; doi:10.1001/jama.2018.16789.", "link": "https://doi.org/10.1001/jama.2018.16789", "areas": ["A", "C", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Vaillant2003", "text": "Vaillant GE. A 60-year follow-up of alcoholic men. Addiction. 2003;98(8):1043-51. PMID 12873238; doi:10.1046/j.1360-0443.2003.00422.x.", "link": "https://doi.org/10.1046/j.1360-0443.2003.00422.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "vanBoekel2013", "text": "van Boekel LC, Brouwers EP, van Weeghel J, Garretsen HF. Stigma among health professionals towards patients with substance use disorders and its consequences for healthcare delivery: systematic review. Drug Alcohol Depend. 2013;131(1-2):23-35. PMID 23490450; doi:10.1016/j.drugalcdep.2013.02.018.", "link": "https://doi.org/10.1016/j.drugalcdep.2013.02.018", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "vandenBrink2013Nalmefene", "text": "van den Brink W, Aubin HJ, Bladström A, Torup L, Gual A, Mann K. Efficacy of as-needed nalmefene in alcohol-dependent patients with at least a high drinking risk level: results from a subgroup analysis of two randomized controlled 6-month studies. Alcohol Alcohol. 2013;48(5):570-578. PMID 23873853; PMCID PMC3746807; doi:10.1093/alcalc/agt061.", "link": "https://doi.org/10.1093/alcalc/agt061", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "vanEmmerikvanOortmerssen2012", "text": "van Emmerik-van Oortmerssen K, van de Glind G, van den Brink W, Smit F, Crunelle CL, Swets M, et al. Prevalence of attention-deficit hyperactivity disorder in substance use disorder patients: a meta-analysis and meta-regression analysis. Drug Alcohol Depend. 2012;122(1-2):11-19. PMID 22209385; doi:10.1016/j.drugalcdep.2011.12.007.", "link": "https://doi.org/10.1016/j.drugalcdep.2011.12.007", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Vannier2022", "text": "Vannier AGL, Shay JES, Fomin V, Patel SJ, Schaefer E, Goodman RP, et al. Incidence and Progression of Alcohol-Associated Liver Disease After Medical Therapy for Alcohol Use Disorder. JAMA Netw Open. 2022;5(5):e2213014. PMID 35594048; PMCID PMC9123494; doi:10.1001/jamanetworkopen.2022.13014.", "link": "https://doi.org/10.1001/jamanetworkopen.2022.13014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Vasilaki2006", "text": "Vasilaki EI, Hosier SG, Cox WM. The efficacy of motivational interviewing as a brief intervention for excessive drinking: a meta-analytic review. Alcohol Alcohol. 2006;41(3):328-35. PMID 16547122; doi:10.1093/alcalc/agl016.", "link": "https://doi.org/10.1093/alcalc/agl016", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Vendruscolo2015", "text": "Vendruscolo LF, Estey D, Goodell V, Macshane LG, Logrip ML, Schlosburg JE, et al. Glucocorticoid receptor antagonism decreases alcohol seeking in alcohol-dependent individuals. J Clin Invest. 2015;125(8):3193-7. PMID 26121746; PMCID PMC4563748; doi:10.1172/JCI79828.", "link": "https://doi.org/10.1172/jci79828", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Verhulst2015", "text": "Verhulst B, Neale MC, Kendler KS. The heritability of alcohol use disorders: a meta-analysis of twin and adoption studies. Psychol Med. 2015;45(5):1061-72. PMID 25171596; PMCID PMC4345133; doi:10.1017/S0033291714002165.", "link": "https://doi.org/10.1017/s0033291714002165", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Viel2012PEth", "text": "Viel G, Boscolo-Berto R, Cecchetto G, Fais P, Nalesso A, Ferrara SD. Phosphatidylethanol in blood as a marker of chronic alcohol use: a systematic review and meta-analysis. Int J Mol Sci. 2012;13(11):14788-812. PMID 23203094; PMCID PMC3509610; doi:10.3390/ijms131114788.", "link": "https://doi.org/10.3390/ijms131114788", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Volkow1996", "text": "Volkow ND, Wang GJ, Fowler JS, Logan J, Hitzemann R, Ding YS, et al. Decreases in dopamine receptors but not in dopamine transporters in alcoholics. Alcohol Clin Exp Res. 1996;20(9):1594-8. PMID 8986209; doi:10.1111/j.1530-0277.1996.tb05936.x.", "link": "https://doi.org/10.1111/j.1530-0277.1996.tb05936.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "VollstadtKlein2010", "text": "Vollstädt-Klein S, Wichert S, Rabinstein J, Bühler M, Klein O, Ende G, et al. Initial, habitual and compulsive alcohol use is characterized by a shift of cue processing from ventral to dorsal striatum. Addiction. 2010;105(10):1741-9. PMID 20670348; doi:10.1111/j.1360-0443.2010.03022.x.", "link": "https://doi.org/10.1111/j.1360-0443.2010.03022.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Volpicelli1992", "text": "Volpicelli JR, Alterman AI, Hayashida M, O'Brien CP. Naltrexone in the treatment of alcohol dependence. Arch Gen Psychiatry. 1992;49(11):876-880. PMID 1345133; doi:10.1001/archpsyc.1992.01820110040006.", "link": "https://doi.org/10.1001/archpsyc.1992.01820110040006", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Voskoboinik2020NEJM", "text": "Voskoboinik A, Kalman JM, De Silva A, Nicholls T, Costello B, Nanayakkara S, et al. Alcohol Abstinence in Drinkers with Atrial Fibrillation. N Engl J Med. 2020;382(1):20-28. PMID 31893513; doi:10.1056/NEJMoa1817591.", "link": "https://doi.org/10.1056/nejmoa1817591", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wagenaar2009", "text": "Wagenaar AC, Salois MJ, Komro KA. Effects of beverage alcohol price and tax levels on drinking: a meta-analysis of 1003 estimates from 112 studies. Addiction. 2009;104(2):179-90. PMID 19149811; doi:10.1111/j.1360-0443.2008.02438.x.", "link": "https://doi.org/10.1111/j.1360-0443.2008.02438.x", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Wagenaar2010", "text": "Wagenaar AC, Tobler AL, Komro KA. Effects of alcohol tax and price policies on morbidity and mortality: a systematic review. Am J Public Health. 2010;100(11):2270-8. PMID 20864710; PMCID PMC2951962; doi:10.2105/AJPH.2009.186007.", "link": "https://doi.org/10.2105/ajph.2009.186007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wakeman2017", "text": "Wakeman SE, Metlay JP, Chang Y, Herman GE, Rigotti NA. Inpatient Addiction Consultation for Hospitalized Patients Increases Post-Discharge Abstinence and Reduces Addiction Severity. J Gen Intern Med. 2017;32(8):909-916. PMID 28526932; PMCID PMC5515798; doi:10.1007/s11606-017-4077-z.", "link": "https://doi.org/10.1007/s11606-017-4077-z", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Walitzer2009", "text": "Walitzer KS, Dermen KH, Barrick C. Facilitating involvement in Alcoholics Anonymous during out-patient treatment: a randomized clinical trial. Addiction. 2009;104(3):391-401. PMID 19207347; PMCID PMC2802221; doi:10.1111/j.1360-0443.2008.02467.x.", "link": "https://doi.org/10.1111/j.1360-0443.2008.02467.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Walters2018", "text": "Walters RK, Polimanti R, Johnson EC, McClintick JN, Adams MJ, Adkins AE, et al. Transancestral GWAS of alcohol dependence reveals common genetic underpinnings with psychiatric disorders. Nat Neurosci. 2018;21(12):1656-1669. PMID 30482948; PMCID PMC6430207; doi:10.1038/s41593-018-0275-1.", "link": "https://doi.org/10.1038/s41593-018-0275-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Walther2026PEth", "text": "Walther L, Stenton J, Hansson T, Blomgren A, Andersson A, Isaksson A. PEth Cut-Off Thresholds for Hazardous Alcohol Consumption Based on a Drinking Study. Drug Test Anal. 2026;18(1):108-117. PMID 41253128; PMCID PMC12796556; doi:10.1002/dta.3970.", "link": "https://doi.org/10.1002/dta.3970", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2024", "text": "Wang W, Volkow ND, Berger NA, Davis PB, Kaelber DC, Xu R. Associations of semaglutide with incidence and recurrence of alcohol use disorder in real-world population. Nat Commun. 2024;15(1):4548. PMID 38806481; PMCID PMC11133479; doi:10.1038/s41467-024-48780-6.", "link": "https://doi.org/10.1038/s41467-024-48780-6", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Watson1980", "text": "Watson PE, Watson ID, Batt RD. Total body water volumes for adult males and females estimated from simple anthropometric measurements. Am J Clin Nutr. 1980;33(1):27-39. PMID 6986753; doi:10.1093/ajcn/33.1.27.", "link": "https://doi.org/10.1093/ajcn/33.1.27", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Weathermon1999", "text": "Weathermon R, Crabb DW. Alcohol and medication interactions. Alcohol Res Health. 1999;23(1):40-54. PMID 10890797; PMCID PMC6761694.", "link": "https://pubmed.ncbi.nlm.nih.gov/10890797/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wei2015", "text": "Wei J, Defries T, Lozada M, Young N, Huen W, Tulsky J. An inpatient treatment and discharge planning protocol for alcohol dependence: efficacy in reducing 30-day readmissions and emergency department visits. J Gen Intern Med. 2015;30(3):365-70. PMID 25092008; PMCID PMC4351284; doi:10.1007/s11606-014-2968-9.", "link": "https://doi.org/10.1007/s11606-014-2968-9", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Westman2015", "text": "Westman J, Wahlbeck K, Laursen TM, Gissler M, Nordentoft M, Hällgren J, et al. Mortality and life expectancy of people with alcohol use disorder in Denmark, Finland and Sweden. Acta Psychiatr Scand. 2015;131(4):297-306. PMID 25243359; PMCID PMC4402015; doi:10.1111/acps.12330.", "link": "https://doi.org/10.1111/acps.12330", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "White2022JAMA", "text": "White AM, Castle IP, Powell PA, Hingson RW, Koob GF. Alcohol-Related Deaths During the COVID-19 Pandemic. JAMA. 2022;327(17):1704-1706. PMID 35302593; PMCID PMC8933830; doi:10.1001/jama.2022.4308.", "link": "https://doi.org/10.1001/jama.2022.4308", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Wielders2024CDT", "text": "Wielders JPM, Porpiglia NM, Schellenberg F, Deenmamode J, Delanghe J, Anton RF, et al. Recommendations on the measurement and use of the alcohol consumption biomarker CDT. A position paper from the IFCC Working Group on CDT standardisation. Clin Chim Acta. 2024;555:117800. PMID 38309557; doi:10.1016/j.cca.2024.117800.", "link": "https://doi.org/10.1016/j.cca.2024.117800", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Williams2015AAP", "text": "Williams JF, Smith VC. Fetal Alcohol Spectrum Disorders. Pediatrics. 2015;136(5):e1395-406. PMID 26482673; doi:10.1542/peds.2015-3113.", "link": "https://doi.org/10.1542/peds.2015-3113", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2004RP", "text": "Witkiewitz K, Marlatt GA. Relapse prevention for alcohol and drug problems: that was Zen, this is Tao. Am Psychol. 2004;59(4):224-35. PMID 15149263; doi:10.1037/0003-066X.59.4.224.", "link": "https://doi.org/10.1037/0003-066x.59.4.224", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2017WHO", "text": "Witkiewitz K, Hallgren KA, Kranzler HR, Mann KF, Hasin DS, Falk DE, et al. Clinical Validation of Reduced Alcohol Consumption After Treatment for Alcohol Dependence Using the World Health Organization Risk Drinking Levels. Alcohol Clin Exp Res. 2017;41(1):179-186. PMID 28019652; PMCID PMC5205540; doi:10.1111/acer.13272.", "link": "https://doi.org/10.1111/acer.13272", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2019", "text": "Witkiewitz K, Litten RZ, Leggio L. Advances in the science and treatment of alcohol use disorder. Sci Adv. 2019;5(9):eaax4043. PMID 31579824; PMCID PMC6760932; doi:10.1126/sciadv.aax4043.", "link": "https://doi.org/10.1126/sciadv.aax4043", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2019WHO", "text": "Witkiewitz K, Falk DE, Litten RZ, Hasin DS, Kranzler HR, Mann KF, et al. Maintenance of World Health Organization Risk Drinking Level Reductions and Posttreatment Functioning Following a Large Alcohol Use Disorder Clinical Trial. Alcohol Clin Exp Res. 2019;43(5):979-987. PMID 30951210; PMCID PMC6502682; doi:10.1111/acer.14018.", "link": "https://doi.org/10.1111/acer.14018", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2020WHO", "text": "Witkiewitz K, Heather N, Falk DE, Litten RZ, Hasin DS, Kranzler HR, et al. World Health Organization risk drinking level reductions are associated with improved functioning and are sustained among patients with mild, moderate and severe alcohol dependence in clinical trials in the United States and United Kingdom. Addiction. 2020;115(9):1668-1680. PMID 32056311; PMCID PMC7841874; doi:10.1111/add.15011.", "link": "https://doi.org/10.1111/add.15011", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Witkiewitz2021Nonabstinent", "text": "Witkiewitz K, Wilson AD, Roos CR, Swan JE, Votaw VR, Stein ER, et al. Can Individuals With Alcohol Use Disorder Sustain Non-abstinent Recovery? Non-abstinent Outcomes 10 Years After Alcohol Use Disorder Treatment. J Addict Med. 2021;15(4):303-310. PMID 33060466; PMCID PMC8044251; doi:10.1097/ADM.0000000000000760.", "link": "https://doi.org/10.1097/adm.0000000000000760", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wood2018JAMA", "text": "Wood E, Albarqouni L, Tkachuk S, Green CJ, Ahamad K, Nolan S, et al. Will This Hospitalized Patient Develop Severe Alcohol Withdrawal Syndrome?: The Rational Clinical Examination Systematic Review. JAMA. 2018;320(8):825-833. PMID 30167704; PMCID PMC6905615; doi:10.1001/jama.2018.10574.", "link": "https://doi.org/10.1001/jama.2018.10574", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wood2018Lancet", "text": "Wood AM, Kaptoge S, Butterworth AS, Willeit P, Warnakula S, Bolton T, et al. Risk thresholds for alcohol consumption: combined analysis of individual-participant data for 599 912 current drinkers in 83 prospective studies. Lancet. 2018;391(10129):1513-1523. PMID 29676281; PMCID PMC5899998; doi:10.1016/S0140-6736(18)30134-X.", "link": "https://doi.org/10.1016/s0140-6736(18)30134-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wurst2015Metabolites", "text": "Wurst FM, Thon N, Yegles M, Schrück A, Preuss UW, Weinmann W. Ethanol metabolites: their role in the assessment of alcohol intake. Alcohol Clin Exp Res. 2015;39(11):2060-72. PMID 26344403; doi:10.1111/acer.12851.", "link": "https://doi.org/10.1111/acer.12851", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wyper2023", "text": "Wyper GMA, Mackay DF, Fraser C, Lewsey J, Robinson M, Beeston C, et al. Evaluating the impact of alcohol minimum unit pricing on deaths and hospitalisations in Scotland: a controlled interrupted time series study. Lancet. 2023;401(10385):1361-1370. PMID 36963415; PMCID PMC10154457; doi:10.1016/S0140-6736(23)00497-X.", "link": "https://doi.org/10.1016/s0140-6736(23)00497-x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Xie2014HepatolRes", "text": "Xie YD, Feng B, Gao Y, Wei L. Effect of abstinence from alcohol on survival of patients with alcoholic cirrhosis: A systematic review and meta-analysis. Hepatol Res. 2014;44(4):436-49. PMID 23607793; doi:10.1111/hepr.12131.", "link": "https://doi.org/10.1111/hepr.12131", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Yadav2009ArchIntMed", "text": "Yadav D, Hawes RH, Brand RE, Anderson MA, Money ME, Banks PA, et al. Alcohol consumption, cigarette smoking, and the risk of recurrent acute and chronic pancreatitis. Arch Intern Med. 2009;169(11):1035-45. PMID 19506173; PMCID PMC6785300; doi:10.1001/archinternmed.2009.125.", "link": "https://doi.org/10.1001/archinternmed.2009.125", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zador2000", "text": "Zador PL, Krawchuk SA, Voas RB. Alcohol-related relative risk of driver fatalities and driver involvement in fatal crashes in relation to driver age and gender: an update using 1996 data. J Stud Alcohol. 2000;61(3):387-95. PMID 10807209; doi:10.15288/jsa.2000.61.387.", "link": "https://doi.org/10.15288/jsa.2000.61.387", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zahr2017", "text": "Zahr NM, Pfefferbaum A. Alcohol's Effects on the Brain: Neuroimaging Results in Humans and Animal Models. Alcohol Res. 2017;38(2):183-206. PMID 28988573; PMCID PMC5513685; doi:10.35946/arcr.v38.2.04.", "link": "https://doi.org/10.35946/arcr.v38.2.04", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zakhari2006", "text": "Zakhari S. Overview: how is alcohol metabolized by the body? Alcohol Res Health. 2006;29(4):245-54. PMID 17718403; PMCID PMC6527027.", "link": "https://pubmed.ncbi.nlm.nih.gov/17718403/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zemore2018", "text": "Zemore SE, Lui C, Mericle A, Hemberg J, Kaskutas LA. A longitudinal study of the comparative efficacy of Women for Sobriety, LifeRing, SMART Recovery, and 12-step groups for those with AUD. J Subst Abuse Treat. 2018;88:18-26. PMID 29606223; PMCID PMC5884451; doi:10.1016/j.jsat.2018.02.004.", "link": "https://doi.org/10.1016/j.jsat.2018.02.004", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zhao2017JSAD", "text": "Zhao J, Stockwell T, Roemer A, Naimi T, Chikritzhs T. Alcohol Consumption and Mortality From Coronary Heart Disease: An Updated Meta-Analysis of Cohort Studies. J Stud Alcohol Drugs. 2017;78(3):375-386. PMID 28499102; PMCID PMC5440363; doi:10.15288/jsad.2017.78.375.", "link": "https://doi.org/10.15288/jsad.2017.78.375", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zhao2020Labels", "text": "Zhao J, Stockwell T, Vallance K, Hobin E. The Effects of Alcohol Warning Labels on Population Alcohol Consumption: An Interrupted Time Series Analysis of Alcohol Sales in Yukon, Canada. J Stud Alcohol Drugs. 2020;81(2):225-237. PMID 32359054; doi:10.15288/jsad.2020.81.225.", "link": "https://doi.org/10.15288/jsad.2020.81.225", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zhao2023JAMANO", "text": "Zhao J, Stockwell T, Naimi T, Churchill S, Clay J, Sherk A. Association Between Daily Alcohol Intake and Risk of All-Cause Mortality: A Systematic Review and Meta-analyses. JAMA Netw Open. 2023;6(3):e236185. PMID 37000449; PMCID PMC10066463; doi:10.1001/jamanetworkopen.2023.6185.", "link": "https://doi.org/10.1001/jamanetworkopen.2023.6185", "areas": ["B", "G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Zhao2023JAMANetwOpen"]}, {"key": "Zheng2025", "text": "Zheng P, Chen Y, Chen F, Zhou M, Xie C. Risk factors for the development of refeeding syndrome in adults: A systematic review. Nutr Clin Pract. 2025;40(1):76-92. PMID 39187889; doi:10.1002/ncp.11203.", "link": "https://doi.org/10.1002/ncp.11203", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zhou2020NatNeurosci", "text": "Zhou H, Sealock JM, Sanchez-Roige S, Clarke TK, Levey DF, Cheng Z, et al. Genome-wide meta-analysis of problematic alcohol use in 435,563 individuals yields insights into biology and relationships with other traits. Nat Neurosci. 2020;23(7):809-818. PMID 32451486; PMCID PMC7485556; doi:10.1038/s41593-020-0643-5.", "link": "https://doi.org/10.1038/s41593-020-0643-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zhou2023NatMed", "text": "Zhou H, Kember RL, Deak JD, Xu H, Toikumo S, Yuan K, et al. Multi-ancestry study of the genetics of problematic alcohol use in over 1 million individuals. Nat Med. 2023;29(12):3184-3192. PMID 38062264; PMCID PMC10719093; doi:10.1038/s41591-023-02653-5.", "link": "https://doi.org/10.1038/s41591-023-02653-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}];
/* =============== home: the brain's balance of calming and exciting signals, before, during and after heavy drinking =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of figures: a cited one can replace them once research exists.
   HERO_CAP[0] is the usual caption; HERO_CAP[1] is shown while the scene is in the 'drinking stops' phase. */
const HERO_CAP=['Schematic, not to scale: receptor counts and the tilt of the beam show a direction of change, not measurements. Module 1.3 tells the story with sources.',
  'Schematic, not to scale. Stopping suddenly after long, heavy daily drinking can be dangerous: get medical help to stop safely.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  /* five schematic phases along the scrubber */
  const PH=[{from:0,t:'In balance',sub:'calming and exciting signals even',k:'before'},
    {from:.18,t:'Drinking',sub:'alcohol boosts calming GABA, damps glutamate',k:'drinking'},
    {from:.4,t:'The brain adapts',sub:'heavy drinking: fewer GABA-A, more NMDA',k:'adapted'},
    {from:.64,t:'Drinking stops',sub:'adapted brain, no alcohol: over-excited',k:'stopped'},
    {from:.84,t:'Rebalancing',sub:'over time without alcohol',k:'after'}];
  const phase=t=>phaseOf(PH,t);
  function state(t){const eth=ramp(t,.18,.26)*(1-ramp(t,.64,.69));
    const adapt=ramp(t,.42,.6)*(1-ramp(t,.86,1));/* 0 = baseline receptors, 1 = fully adapted */
    const ng=lerp(4,2,adapt),nn=lerp(3,5,adapt);
    const inh=ng/4*(1+eth*.8),exc=nn/3*(1-eth*.5),tilt=clamp((exc-inh)*1.2,-1,1);
    return {eth,ng,nn,inh,exc,tilt}}
  function draw(t){const N=vb(svg,'520 300','400 300');const S=state(t),p=phase(t),P=PH[p];
    const L=N?{sx:100,sy:156,ss:1.25,bx:302,by:118,bw:130,lx:20,ly:34,tx:20,ty:262,tw:360,wrap:true}
             :{sx:132,sy:150,ss:1.35,bx:392,by:118,bw:172,lx:24,ly:36,tx:24,ty:270,tw:472,wrap:false};
    let s='';
    /* phase title */
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${p===3?'var(--glu)':p===1?'var(--gaba)':'var(--ink)'}">${P.t}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${P.sub}</text>`;
    /* the synapse */
    s+=synapse(L.sx,L.sy,L.ss,{gaba:Math.round(S.ng),nmda:Math.round(S.nn),gt:.5,gl:.5,eth:S.eth,cl:clamp(S.inh*.5),ca:clamp(S.exc*.45*(1-S.eth*.6)),block:S.eth*.8,spark:ramp(S.tilt,.3,1),seed:3});
    s+=`<text x="${L.sx-60*L.ss}" y="${L.sy+52*L.ss}" class="t-xs" style="fill:var(--gaba)">GABA-A</text><text x="${L.sx+60*L.ss}" y="${L.sy+52*L.ss}" class="t-xs t-end" style="fill:var(--glu)">NMDA</text>`;
    if(S.eth>.05){const ex=L.bx-L.bw/2,ey=L.by+(N?96:92);s+=`${mol(ex,ey,'eth',{r:4.5,op:S.eth})}<text x="${f1(ex+9)}" y="${f1(ey+3.5)}" class="t-xs" style="opacity:${f1(S.eth)}">alcohol (ethanol) in the gap</text>`}
    /* the balance: calming (GABA) on the left, exciting (glutamate) on the right */
    s+=balance(L.bx,L.by,L.bw,{tilt:S.tilt,ln:Math.round(clamp(S.inh*3,1,6)),rn:Math.round(clamp(S.exc*3,1,6)),lsub:'calming',rsub:'exciting'}).svg;
    /* phase strip */
    const sw=L.tw/PH.length;
    PH.forEach((q,i)=>{const on=i===p,x=L.tx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ty}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(i===3?'var(--glu-fill)':'var(--brand)'):'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ty+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.k}</text>`});
    const mx=L.tx+L.tw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ty+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const c=HERO_CAP[p===3?1:0];if(cap.textContent!==c)cap.textContent=c;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,14000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What alcohol use disorder is =============== */
/* NESARC-III (Grant 2015) and NESARC (Grant 2017) figures, % of US adults. Icon counts are those
   percentages rounded to whole people out of 100 with the largest-remainder rule, so the three
   severity groups add up to the rounded total: 12-month 7.3/3.2/3.4 -> 7/3/4 (14); lifetime
   8.6/6.6/13.9 -> 9/6/14 (29). */
const WH_NUM={drank:72.7,m12:{mild:7.3,mod:3.2,sev:3.4,all:13.9},life:{mild:8.6,mod:6.6,sev:13.9,all:29.1},
  ic12:{mild:7,mod:3,sev:4},icLife:{mild:9,mod:6,sev:14},trLife:19.8,tr12:7.7,trWorld:17.3,trLow:9.3};
const WH_COL={none:'var(--line)',drank:'var(--eth-fill)',drankLine:'var(--eth-fill)',aud:'var(--brand)',mild:'var(--gaba-fill)',mod:'var(--brand)',sev:'var(--accent)',tr:'var(--rx)'};
function whWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),rd=$('#whRead');
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · The spectrum',t:'A spectrum, not a switch',
     txt:`Drinking runs along a spectrum. The USPSTF uses "unhealthy alcohol use" for everything from risky drinking to alcohol use disorder <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>. In 2012–2013, 72.7% of US adults drank alcohol in the past year <sup class="c" data-ref="Grant2017JAMAPsych" title="Source 148">148</sup>. Binge drinking in US federal surveys means 5 or more drinks (males) or 4 or more (females) on one occasion <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>. Most people who drink heavily do not have dependence: in NSDUH 2009–2011, 10.2% of excessive drinkers met DSM-IV dependence criteria and about 90% did not <sup class="c" data-ref="Esser2014PCD" title="Source 102">102</sup>. "Lower risk" is not "no risk": GBD 2016 found the level that minimised harm was zero drinks a week. <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`,
     pt:`Drinking is not simply "fine" or "a disorder". Most people who sometimes drink too much do not have AUD, but heavy drinking still carries risk.`,
     hook:`Unhealthy alcohol use (USPSTF) covers the whole spectrum, from risky drinking to AUD. About 90% of excessive drinkers do not meet dependence criteria. <sup class="c" data-ref="USPSTF2018Alcohol,Esser2014PCD" title="Source 102,470">102,470</sup>`},
    {from:.2,at:.3,k:'Step 2 · Past 12 months',t:'About 1 in 7 US adults',
     txt:`NESARC-III interviewed 36,309 US adults face to face in 2012–2013. Under DSM-5 criteria, <b>13.9%</b> had AUD in the past 12 months: 17.6% of men and 10.4% of women <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. AUD is diagnosed when at least 2 of 11 criteria occur within 12 months: see <a href="#criteria" data-go="criteria">Diagnosis</a> <sup class="c" data-ref="APA2022" title="Source 16">16</sup>. In the same survey 12-month drug use disorder was 3.9%, so AUD is the more common disorder. <sup class="c" data-ref="Grant2016DUD" title="Source 147">147</sup>`,
     pt:`In a given year, about 1 in 7 US adults has alcohol use disorder. It is one of the most common health conditions there is.`,
     hook:`NESARC-III 12-month DSM-5 AUD: 13.9% of US adults. Mean age at onset 26.2 years. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`},
    {from:.4,at:.5,k:'Step 3 · Severity',t:'Mild, moderate, severe',
     txt:`Severity counts the criteria met: mild 2–3, moderate 4–5, severe 6 or more <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>. Of the 13.9%, <b>7.3%</b> of adults had mild, <b>3.2%</b> moderate and <b>3.4%</b> severe AUD. Severe 12-month AUD was 4.5% in men and 2.3% in women, it was most common at the lowest income level, and disability rose with severity <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Mean age at onset fell as severity rose: 30.1 years for mild, 25.9 for moderate and 23.9 for severe AUD. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`,
     pt:`Mild AUD is the most common kind: about half of the people with AUD in a year. The more criteria a person meets, the more the condition tends to disrupt daily life.`,
     hook:`Severity by criterion count: mild 2–3, moderate 4–5, severe 6 or more of 11. Practise it with the counter in <a href="#criteria" data-go="criteria">Diagnosis</a>. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>`},
    {from:.6,at:.7,k:'Step 4 · Lifetime',t:'About 3 in 10, at some point in life',
     txt:`Counting everyone who has ever met the criteria, <b>29.1%</b> of US adults had lifetime AUD: 8.6% mild, 6.6% moderate and 13.9% severe. Lifetime AUD was 36.0% in men and 37.0% at ages 18–29 <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Lifetime figures include people whose AUD is in the past. Recovery is common at population level: 9.1% of US adults say they used to have an alcohol or drug problem and no longer do. These are group figures, not a promise for one person. <sup class="c" data-ref="Kelly2017Recovery" title="Source 230">230</sup>`,
     pt:`Over a lifetime, about 3 in 10 US adults meet the criteria at some point. That count includes many people who are no longer affected.`,
     hook:`12-month 13.9% vs lifetime 29.1% (NESARC-III). Severe AUD: 3.4% in the past 12 months but 13.9% lifetime. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`},
    {from:.8,at:.93,k:'Step 5 · The treatment gap',t:'Most never receive treatment',
     txt:`Only <b>19.8%</b> of people with lifetime AUD, and <b>7.7%</b> with 12-month AUD, had ever sought treatment or help. Treatment seeking rose with severity: 2.7% (mild), 4.9% (moderate), 21.3% (severe) <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Worldwide, a meta-analysis of 32 articles found 17.3% of people with AUD received any treatment, and 9.3% in low and lower-middle-income countries <sup class="c" data-ref="Mekonen2021" title="Source 328">328</sup>. The NESARC-III authors call DSM-5 AUD "highly prevalent, highly comorbid, disabling" and say it "often goes untreated". <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`,
     pt:`Most people with alcohol use disorder never get help, even though treatments that work exist. <sup class="c" data-ref="Carvalho2019Lancet" title="Source 56">56</sup>`,
     hook:`Treatment gap: 19.8% of lifetime and 7.7% of 12-month AUD ever treated (NESARC-III); about 1 in 6 (17.3%) worldwide. <sup class="c" data-ref="Grant2015NESARC,Mekonen2021" title="Source 146,328">146,328</sup>`}];
  const SEG=[{n:'No drinking',s:'',c:'var(--panel-2)'},{n:'Lower risk',s:'not no risk',c:'var(--eth-soft)'},{n:'Hazardous / binge',s:'≥5 (m) / ≥4 (f) drinks',c:'var(--eth-fill)'},
    {n:'AUD mild',s:'2–3 criteria',c:WH_COL.mild},{n:'AUD moderate',s:'4–5 criteria',c:WH_COL.mod},{n:'AUD severe',s:'6+ criteria',c:WH_COL.sev}];
  let setSt=()=>{};
  /* state for a time t */
  function state(t){const p=phaseOf(STEPS,t);
    const drank=ramp(t,0,.09)*(1-ramp(t,.6,.66));            /* past-year drinkers layer: fades for lifetime */
    const fill12=ramp(t,.2,.3),split=ramp(t,.4,.46),life=ramp(t,.6,.7),gap=ramp(t,.8,.9);
    const n=k=>Math.round(lerp(WH_NUM.ic12[k],WH_NUM.icLife[k],life));
    const cnt={sev:n('sev'),mod:n('mod'),mild:n('mild')};const tot=cnt.sev+cnt.mod+cnt.mild;
    const shown=Math.round(tot*fill12);
    const pct=lerp(WH_NUM.m12.all*fill12,WH_NUM.life.all,life);
    const sv=k=>lerp(WH_NUM.m12[k],WH_NUM.life[k],life)*split;
    return {p,drank,fill12,split,life,gap,cnt,tot,shown,pct,sev:sv('sev'),mod:sv('mod'),mild:sv('mild'),trN:Math.round(tot*WH_NUM.trLife/100)}}
  function draw(t){const S=state(t),N=vb(svg,'720 420','400 '+(S.gap>0?750:640));let s='';
    /* ---- spectrum strip ---- */
    const hiSeg=S.p===0?Math.min(5,Math.floor(ramp(t,0,.17)*6)):-1;
    const segBox=(i)=>{if(!N){const w=(720-48)/6;return [24+i*w,26,w-4,30]}const w=(400-32)/3;return [16+(i%3)*w,i<3?30:90,w-4,28]};
    s+=`<text x="${N?16:24}" y="${N?18:16}" class="t-sm" style="fill:var(--brand)">THE SPECTRUM OF DRINKING</text>`;
    if(N)s+=`<text x="16" y="84" class="t-sm" style="fill:var(--brand)">ALCOHOL USE DISORDER (DSM-5)</text>`;
    SEG.forEach((g,i)=>{const [x,y,w,h]=segBox(i),aud=i>=3,on=aud?(S.p>=1):(S.p===0&&i<=hiSeg),cur=S.p===0&&i===hiSeg;
      const op=S.p===0?(i<=hiSeg?1:.35):(aud?1:.35);
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="${h}" rx="7" style="fill:${g.c};opacity:${f1(op)};stroke:${cur?'var(--ink)':'none'};stroke-width:1.6"/>`;
      const dark=i>=4;s+=`<text x="${f1(x+w/2)}" y="${y+h/2+4}" class="t-xs t-mid" style="fill:${dark?'#fff':'var(--ink)'};font-weight:600;opacity:${f1(Math.max(op,.6))}">${N&&aud?g.n.replace('AUD ',''):g.n}</text>`;
      if(g.s)s+=`<text x="${f1(x+w/2)}" y="${y+h+12}" class="t-xs t-mid" style="opacity:${f1(on?1:.6)}">${g.s}</text>`});
    if(!N)s+=`<path d="M${f1(24+3*112)} 72h${f1(3*112-4)}" style="stroke:var(--brand);stroke-width:2"/><text x="${f1(24+4.5*112)}" y="84" class="t-xs t-mid" style="fill:var(--brand)">alcohol use disorder: 2 or more of 11 criteria in 12 months</text>`;
    /* ---- icon array: 100 adults ---- */
    const IA=N?{x0:47,y0:150,dx:34,dy:30,s:25}:{x0:38,y0:112,dx:26,dy:28,s:22};
    const order=[];/* severe first, then moderate, then mild: contiguous blocks read best */
    for(let i=0;i<S.cnt.sev;i++)order.push('sev');for(let i=0;i<S.cnt.mod;i++)order.push('mod');for(let i=0;i<S.cnt.mild;i++)order.push('mild');
    const trEvery=S.tot/Math.max(1,S.trN);
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=IA.x0+c*IA.dx,y=IA.y0+r*IA.dy;let fill=WH_COL.none,op=1,ring=false;
      if(i<S.shown){fill=S.split>0?WH_COL[order[i]]:WH_COL.aud;if(S.split>0&&S.split<1)fill=S.split>.5?WH_COL[order[i]]:WH_COL.aud;
        if(S.gap>0){const k=Math.floor(i/trEvery);ring=Math.floor((i)%trEvery)===0&&k<Math.round(S.trN*S.gap);op=ring?1:lerp(1,.45,S.gap)}}
      else if(i<Math.round(WH_NUM.drank*S.drank)){fill=WH_COL.drank}
      s+=person(x,y,IA.s,fill,{op:fill===WH_COL.drank?op*.6:op});
      if(i>=S.shown&&i<Math.round(WH_NUM.drank*S.drank))s+=`<circle cx="${x}" cy="${f1(y+IA.s*.17)}" r="${f1(IA.s*.17)}" style="fill:none;stroke:${WH_COL.drankLine};stroke-width:.9;opacity:.8"/>`;
      if(ring)s+=`<circle cx="${x}" cy="${f1(y+IA.s*.55)}" r="${f1(IA.s*.62)}" style="fill:none;stroke:${WH_COL.tr};stroke-width:2.2"/>`}
    const iaB=IA.y0+10*IA.dy;
    /* legend under the icon array */
    const lg=[];if(S.drank>.05)lg.push([WH_COL.drank,'drank in the past year']);
    if(S.shown>0&&S.split<.5)lg.push([WH_COL.aud,'alcohol use disorder']);
    if(S.split>=.5)lg.push([WH_COL.mild,'mild'],[WH_COL.mod,'moderate'],[WH_COL.sev,'severe']);
    if(S.gap>.05)lg.push(['ring','ever sought treatment or help']);
    let lx=N?16:24,ly=iaB+(N?4:2);
    lg.forEach(([c,l])=>{const w=l.length*5.6+22;if(lx+w>(N?390:300)&&lx>(N?16:24)){lx=N?16:24;ly+=14}
      s+=c==='ring'?`<circle cx="${lx+6}" cy="${ly}" r="5.5" style="fill:none;stroke:${WH_COL.tr};stroke-width:2"/>`:`<rect x="${lx}" y="${ly-5}" width="12" height="10" rx="3" style="fill:${c};stroke:${c===WH_COL.drank?WH_COL.drankLine:'none'};stroke-width:.8"/>`;
      s+=`<text x="${lx+17}" y="${ly+3.5}" class="t-xs">${l}</text>`;lx+=w});
    /* ---- right panel (wide) / bottom panel (narrow): the numbers ---- */
    const P=N?{x:16,y:iaB+36,w:368}:{x:340,y:112,w:356};
    const big=S.p===0?WH_NUM.drank*S.drank:S.pct;
    const bigLab=S.p===0?'of US adults drank in the past year':S.life>.5?'of US adults: AUD at some point in life':'of US adults: AUD in the past 12 months';
    const bigCol=S.p===0?'var(--eth)':'var(--brand)';
    s+=`<text x="${P.x}" y="${P.y+(N?30:40)}" class="t-big" style="font-size:${N?40:50}px;fill:${bigCol}">${f1(big)}%</text>`;
    s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?16:22)}" class="t-lbl">${bigLab.split(':')[0]}${bigLab.includes(':')?':':''}</text>`;
    if(bigLab.includes(':'))s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?32:40)}" class="t-sm">${bigLab.split(': ')[1]}</text>`;
    s+=`<text x="${P.x+(N?118:150)}" y="${P.y+(N?46:56)}" class="t-xs">${S.p===0?'NESARC 2012–2013':'NESARC-III, DSM-5'}</text>`;
    /* severity bars */
    const bx=P.x+(N?84:96),bw=P.w-(N?84:96)-48,sc=v=>bw*v/16;let by=P.y+(N?66:86);
    if(S.split>0){s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="opacity:${f1(S.split)}">BY SEVERITY · ${S.life>.5?'LIFETIME':'PAST 12 MONTHS'}</text>`;
      [['mild','Mild 2–3'],['mod','Moderate 4–5'],['sev','Severe 6+']].forEach(([k,l],i)=>{const y=by+i*24,v=S[k];
        s+=`<text x="${P.x}" y="${y+12}" class="t-xs" style="opacity:${f1(S.split)}">${l}</text><rect x="${bx}" y="${y+2}" width="${f1(bw)}" height="13" rx="4" style="fill:var(--panel-2);opacity:${f1(S.split)}"/><rect x="${bx}" y="${y+2}" width="${f1(sc(v))}" height="13" rx="4" style="fill:${WH_COL[k]}"/><text x="${f1(bx+sc(v)+6)}" y="${y+12.5}" class="t-xs" style="fill:var(--ink);opacity:${f1(S.split)}">${f1(v)}%</text>`});
      by+=3*24+18}
    else if(S.p===0){/* step 1: drinkers vs dependence among excessive drinkers */
      const a=ramp(t,.03,.09);s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="opacity:${f1(a)}">AMONG EXCESSIVE DRINKERS (NSDUH 2009–2011)</text>`;
      const W=P.w-10;s+=`<rect x="${P.x}" y="${by}" width="${f1(W)}" height="18" rx="5" style="fill:var(--eth-soft);opacity:${f1(a)}"/><rect x="${P.x}" y="${by}" width="${f1(W*.102*a)}" height="18" rx="5" style="fill:var(--brand)"/>`;
      s+=`<text x="${f1(P.x+W*.102+6)}" y="${by+13}" class="t-xs" style="fill:var(--ink);opacity:${f1(a)}">10.2% met dependence criteria · about 90% did not</text>`;by+=46}
    /* treatment-gap bars */
    if(S.gap>0){const g=S.gap;s+=`<text x="${P.x}" y="${by-8}" class="t-sm" style="fill:var(--rx);opacity:${f1(g)}">EVER SOUGHT TREATMENT OR HELP</text>`;
      [['US, lifetime AUD',WH_NUM.trLife],['US, 12-month AUD',WH_NUM.tr12],['Worldwide (32 studies)',WH_NUM.trWorld],['Low/lower-middle income',WH_NUM.trLow]].forEach(([l,v],i)=>{const y=by+i*22,W=bw;
        s+=`<text x="${P.x}" y="${y+11}" class="t-xs" style="opacity:${f1(g)}">${N?l.replace('Low/lower-middle income','Lower-income').replace(' (32 studies)',''):l}</text>`;
        const x0=P.x+(N?118:132),ww=P.w-(N?118:132)-46;s+=`<rect x="${x0}" y="${y+1}" width="${f1(ww)}" height="12" rx="4" style="fill:var(--panel-2);opacity:${f1(g)}"/><rect x="${x0}" y="${y+1}" width="${f1(ww*v/100*g)}" height="12" rx="4" style="fill:var(--rx)"/><text x="${f1(x0+ww*v/100*g+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink);opacity:${f1(g)}">${f1(v*g)}%</text>`});
      by+=4*22+8}
    if(!N&&S.p===4){s+=`<text x="${P.x}" y="${Math.min(by+10,404)}" class="t-xs">Ringed: ${S.trN} of the ${S.tot} figures, about 19.8% of lifetime AUD.</text>`}
    if(!N&&S.p>=1&&S.p<=2){s+=`<text x="${P.x}" y="${by+8}" class="t-xs">12-month drug use disorder in the same survey: 3.9%</text>`}
    svg.innerHTML=s;
    const P0=STEPS[S.p];note.innerHTML=noteHTML(P0);setSt(S.p);
    rd.innerHTML=S.p===0?`<span>Past-year drinking <b>72.7%</b></span><span>Excessive drinkers with dependence <b>10.2%</b></span>`:
      `<span>AUD <b>${f1(S.pct)}%</b> ${S.life>.5?'lifetime':'12-month'}</span>`+(S.split>0?`<span>mild <b>${f1(S.mild)}</b> · moderate <b>${f1(S.mod)}</b> · severe <b>${f1(S.sev)}</b></span>`:'')+(S.gap>0?`<span>ever treated <b>19.8%</b> lifetime · <b>7.7%</b> 12-month</span>`:'');
  }
  const stop=playWire(rg,$('#whPlay'),draw,16000,'Replay','what');
  setSt=stepWire($('#whSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- who is affected ---------- */
  const wsv=$('#whWho');let who='sex',whoK=1,whoStop=null;
  const WHO={
    sex:{title:'12-MONTH AUD BY SEX · NESARC-III',max:20,ser:[['any AUD','var(--brand)'],['severe AUD','var(--accent)']],
      rows:[['Men',[17.6,4.5]],['Women',[10.4,2.3]]],
      cap:`NESARC-III, 2012–2013, % of US adults. Lifetime AUD was 36.0% in men. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`,
      note:{k:'Who is affected · sex',t:'The gap between men and women is closing',
        txt:`In NESARC-III, 12-month AUD was 17.6% in men and 10.4% in women, and severe AUD 4.5% and 2.3% <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Across 68 studies of birth cohorts from 1891 to 2001, the male-to-female ratio for problematic alcohol use fell from 3.0 in cohorts born in the early 1900s to 1.2 in those born in the late 1900s, most clearly among young adults <sup class="c" data-ref="Slade2016" title="Source 435">435</sup>. In the US, alcohol-related deaths rose 12.5% a year in men and 14.7% a year in women from 2018 to 2020. <sup class="c" data-ref="Karaye2023" title="Source 222">222</sup>`,
        pt:`Men still have AUD more often, but women are catching up, especially among younger people.`,
        hook:`Male:female ratio for problem drinking: 3.0 (born early 1900s) to 1.2 (born late 1900s). <sup class="c" data-ref="Slade2016" title="Source 435">435</sup>`}},
    age:{title:'12-MONTH AUD BY AGE · NESARC-III',max:30,ser:[['any AUD','var(--brand)']],
      rows:[['18–29',[26.7]],['30–44',[16.2]],['45–64',[10.0]],['65 and older',[2.3]]],
      cap:`NESARC-III, 2012–2013, % of US adults in each age band. Lifetime AUD was 37.0% at ages 18–29. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`,
      note:{k:'Who is affected · age',t:'Highest in young adults, rising in older adults',
        txt:`12-month AUD was 26.7% at ages 18–29 and 2.3% at 65 and older; mean age at onset was 26.2 years <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Among US adults aged 50 and older, AUD rose 23.3% in relative terms from 2005/2006 to 2013/2014 <sup class="c" data-ref="Han2017Older" title="Source 161">161</sup>, and AUD prevalence and mortality over age 70 rose from 2000 to 2021 <sup class="c" data-ref="Danpanichkul2025Older" title="Source 75">75</sup>. Among US 8th, 10th and 12th graders, frequent binge drinking declined from 1991 to 2015. <sup class="c" data-ref="Jang2017" title="Source 197">197</sup>`,
        pt:`AUD is most common in people in their twenties, but it can start or continue at any age.`,
        hook:`12-month AUD peaks at 18–29 (26.7%) and is lowest at 65+ (2.3%). <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`}},
    grp:{title:'AUD BY GROUP · NESARC-III',max:50,ser:[['12-month','var(--brand)'],['lifetime','var(--thi-fill)']],
      rows:[['White',[14.0,32.6]],['Native American',[19.2,43.4]],['Never married',[25.0,35.5]],['Previously married',[11.4,27.1]]],
      cap:`NESARC-III, 2012–2013, % within each group. Group figures describe populations, not individuals. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`,
      note:{k:'Who is affected · groups',t:'Unequal by group and income',
        txt:`12-month and lifetime AUD were 14.0% and 32.6% among white respondents and 19.2% and 43.4% among Native American respondents; 25.0% and 35.5% among never-married adults and 11.4% and 27.1% among previously married adults. Severe AUD was most common at the lowest income level <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Binge drinking was most common at family incomes of $75,000 or more, but dependence was most common under $25,000. <sup class="c" data-ref="Esser2014PCD" title="Source 102">102</sup>`,
        pt:`Some groups carry more of the burden than others. These are averages for groups: they say nothing about any one person.`,
        hook:`Binge drinking peaks at higher incomes, dependence at lower incomes (NSDUH 2009–2011). <sup class="c" data-ref="Esser2014PCD" title="Source 102">102</sup>`}},
    trend:{title:'US TRENDS · TWO SURVEYS, TWO METHODS',max:16,ser:[['earlier','var(--muted)'],['later','var(--brand)']],
      rows:[['DSM-IV AUD, 2001–02 → 2012–13',[8.5,12.7]],['NSDUH men, 2021 → 2024',[13.3,12.6]],['NSDUH women, 2021 → 2024',[9.7,8.2]]],
      cap:`NESARC (in-person interview) and NSDUH (self-administered) use different methods: compare within a row, not between rows. <sup class="c" data-ref="Grant2017JAMAPsych,Han2026NSDUH" title="Source 148,163">148,163</sup>`,
      note:{k:'Who is affected · over time',t:'Up, then flat or slightly down',
        txt:`From 2001–2002 to 2012–2013, DSM-IV AUD rose from 8.5% to 12.7% of US adults (a relative rise of 49.4%), and high-risk drinking from 9.7% to 12.6%; the rises were greatest among women, older adults, racial and ethnic minorities and people with lower education and income <sup class="c" data-ref="Grant2017JAMAPsych" title="Source 148">148</sup>. In NSDUH 2021–2024 (DSM-5), past-year AUD went from 13.3% to 12.6% in men and from 9.7% to 8.2% in women, and the authors describe moderate-to-severe AUD as stable or declining. <sup class="c" data-ref="Han2026NSDUH" title="Source 163">163</sup>`,
        pt:`US drinking problems rose in the 2000s and have been level or slightly lower since 2021. Deaths are a different story: see the next section.`,
        hook:`DSM-IV AUD rose 49.4% in relative terms between NESARC waves (8.5% to 12.7%). <sup class="c" data-ref="Grant2017JAMAPsych" title="Source 148">148</sup>`}}};
  function drawWho(k){const D=WHO[who],nr=D.rows.length,ns=D.ser.length,N=vb(wsv,'720 '+(62+nr*(ns>1?(nr>3?54:70):52)+20),'400 '+(58+nr*(ns>1?78:62)+24));let s='';
    const L=N?{x0:16,lw:0,bx:16,bw:300,top:58,rowH:D.ser.length>1?78:62,lab:true}:{x0:24,lw:220,bx:252,bw:400,top:62,rowH:D.ser.length>1?(D.rows.length>3?54:70):52};
    s+=`<text x="${L.x0}" y="22" class="t-sm" style="fill:var(--brand)">${D.title}</text>`;
    /* legend */
    let lx=L.x0;D.ser.forEach(([n,c])=>{s+=`<rect x="${lx}" y="32" width="12" height="10" rx="3" style="fill:${c}"/><text x="${lx+17}" y="41" class="t-xs">${n}</text>`;lx+=n.length*5.8+36});
    /* grid */
    const X=v=>L.bx+L.bw*v/D.max;const gy0=L.top-6,gy1=L.top+D.rows.length*L.rowH-10;
    for(let v=0;v<=D.max;v+=D.max>=30?10:D.max>=20?5:4){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${gy0}" y2="${gy1}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${gy1+14}" class="t-xs t-mid">${v}%</text>`}
    D.rows.forEach(([lab,vals],i)=>{const y=L.top+i*L.rowH;
      if(N)s+=`<text x="${L.x0}" y="${y+4}" class="t-lbl" style="font-size:12px">${lab}</text>`;
      else s+=`<text x="${L.x0+L.lw-8}" y="${y+(vals.length>1?18:14)}" class="t-lbl t-end" style="font-size:12.5px">${lab}</text>`;
      vals.forEach((v,j)=>{const by=y+(N?10:0)+j*(N?22:20),h=N?16:15,w=L.bw*v/D.max*k,c=D.ser[j][1];
        s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(0,w))}" height="${h}" rx="4" style="fill:${c}"/><text x="${f1(L.bx+w+6)}" y="${by+h-3.5}" class="t-xs" style="fill:var(--ink);font-weight:600">${f1(v*k)}%</text>`})});
    wsv.innerHTML=s;
    $('#whWhoCap').innerHTML=D.cap;$('#whWhoNote').innerHTML=noteHTML(D.note)}
  function setWho(k){who=k;$$('#whWhoBtns [data-who]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.who===k));
    whoStop&&whoStop();whoStop=animate(650,p=>drawWho(ease(p)),()=>{whoStop=null})}
  $('#whWhoBtns').addEventListener('click',e=>{const b=e.target.closest('[data-who]');if(b)setWho(b.dataset.who)});
  drawWho(1);

  /* ---------- burden comparator ---------- */
  const bsv=$('#whBur');let bur='world',burStop=null;
  const BUR={
    world:{title:'ALCOHOL-ATTRIBUTABLE DEATHS WORLDWIDE, MILLIONS',max:3.5,unit:'M',dec:2,
      rows:[['GBD 2016 · year 2016',2.8,'var(--brand)'],['WHO model · 2016',3.0,'var(--gold)'],['WHO model · 2019',2.6,'var(--gold)'],['GBD 2020 · year 2020',1.78,'var(--brand)']],
      cap:`Totals differ because the models and risk curves differ, not because deaths fell that fast. <sup class="c" data-ref="GBD2016Alcohol,Shield2020,Shield2025,GBD2020Alcohol" title="Source 137,139,430,431">137,139,430,431</sup>`,
      note:{k:'Burden · the world',t:'Millions of deaths a year, by any model',
        txt:`GBD 2016 attributed 2.8 million deaths in 2016 to alcohol use <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>. The WHO comparative risk model gave 3.0 million for 2016, 5.3% of all deaths, with 52.4% of alcohol-attributable deaths in people under 60 and 17.7% of all injury deaths caused by alcohol <sup class="c" data-ref="Shield2020" title="Source 430">430</sup>; its update gave 2.6 million (4.7%) for 2019 <sup class="c" data-ref="Shield2025" title="Source 431">431</sup>. GBD 2020 estimated 1.78 million for 2020, and 1.34 billion people drinking harmful amounts. <sup class="c" data-ref="GBD2020Alcohol" title="Source 139">139</sup>`,
        pt:`Alcohol causes millions of deaths every year around the world. Experts disagree on the exact number, not on the scale.`,
        hook:`Pair every global figure with its model: GBD 2016 2.8 M (2016); WHO model 3.0 M (2016), 2.6 M (2019); GBD 2020 1.78 M (2020).`}},
    young:{title:'SHARE OF DEATHS ATTRIBUTABLE TO ALCOHOL, AGES 15–49 (GBD 2016)',max:14,unit:'%',dec:1,
      rows:[['Men · deaths',12.2,'var(--accent)'],['Women · deaths',3.8,'var(--accent)'],['Men · DALYs',8.9,'var(--brand)'],['Women · DALYs',2.3,'var(--brand)']],
      cap:`At ages 15–49 alcohol was the leading risk factor for death worldwide in 2016. <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`,
      note:{k:'Burden · young and middle-aged adults',t:'The leading risk factor at ages 15–49',
        txt:`In 2016, alcohol caused 12.2% of male and 3.8% of female deaths at ages 15–49, and 8.9% and 2.3% of DALYs. The leading attributable causes of death in this age group were tuberculosis (1.4% of total deaths), road injuries (1.2%) and self-harm (1.1%). At ages 50 and older, cancers made up 27.1% of alcohol-attributable female deaths and 18.9% of male deaths. <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`,
        pt:`For people aged 15 to 49, nothing else on the list of risk factors caused as many deaths as alcohol.`,
        hook:`GBD 2016: alcohol = 7th leading risk factor overall, 1st at ages 15–49 (12.2% of male deaths). <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`}},
    us:{title:'US DEATHS FROM EXCESSIVE DRINKING, PER YEAR (CDC)',max:200000,unit:'',dec:0,
      rows:[['2016–2017, all',137927,'var(--muted)'],['2020–2021, all',178307,'var(--accent)'],['2020–2021, chronic causes',117245,'var(--liver)'],['2020–2021, acute causes',61063,'var(--gold)']],
      cap:`About 488 deaths a day in 2020–2021. Among adults aged 20–64 in 2015–2019, about 1 in 8 deaths. <sup class="c" data-ref="Esser2024MMWR,Esser2022JNO" title="Source 103,104">103,104</sup>`,
      note:{k:'Burden · the United States',t:'Up 29.3% in four years',
        txt:`Average annual deaths from excessive drinking rose from 137,927 in 2016–2017 to 178,307 in 2020–2021, and the age-standardised rate from 38.1 to 47.6 per 100,000. Deaths among women rose 34.7% and among men 26.8%. Leading chronic causes were alcohol-associated liver disease (48,972 a year) and heart disease and stroke (37,317); leading acute causes were alcohol poisonings (21,806) and motor-vehicle crashes (15,055) <sup class="c" data-ref="Esser2024MMWR" title="Source 104">104</sup>. Among adults aged 20–49, about 1 in 5 deaths (20.3%) were attributable to excessive drinking. <sup class="c" data-ref="Esser2022JNO" title="Source 103">103</sup>`,
        pt:`In the US, excessive drinking causes about 1 in 8 deaths between ages 20 and 64. Alcohol poisoning is an emergency: call emergency services.`,
        hook:`CDC: 178,307 US deaths a year from excessive drinking in 2020–2021, about 488 a day. <sup class="c" data-ref="Esser2024MMWR" title="Source 104">104</sup>`}},
    life:{title:'MEN TREATED FOR AUD: STANDARDISED MORTALITY RATIO AT 10 YEARS',max:20,unit:'×',dec:1,
      rows:[['Mental disorders',18.0,'var(--dx)'],['Liver cirrhosis',14.8,'var(--liver)'],['Injury',6.6,'var(--gold)'],['Cancer, cardiovascular (about)',2,'var(--muted)']],
      cap:`Meta-analysis of 17 cohorts (28,087 patients). SMR 1 = the general-population rate. Ratios were higher still in women, from fewer studies. <sup class="c" data-ref="Roerecke2014" title="Source 397">397</sup>`,
      note:{k:'Burden · a shorter life',t:'24–28 years of life lost',
        txt:`In Nordic registers (1987–2006), people hospitalised with AUD lived 24–28 years less than the general population, an average life expectancy of 47–53 years in men and 50–58 in women, with all-cause mortality 3.0–5.2 times higher <sup class="c" data-ref="Westman2015" title="Source 494">494</sup>. Among people treated for AUD, men died of liver cirrhosis at 14.8 times and of mental disorders at 18.0 times the expected rate after 10 years. <sup class="c" data-ref="Roerecke2014" title="Source 397">397</sup> These are population statistics from people hospitalised or treated, not a prediction for anyone.`,
        pt:`On average, people treated in hospital for AUD have died decades earlier than others. Treatment and stopping or cutting down can change a person's own path.`,
        hook:`Nordic registers: life expectancy 24–28 years shorter after hospitalisation for AUD. <sup class="c" data-ref="Westman2015" title="Source 494">494</sup>`}}};
  const fmtB=(v,D)=>D.unit==='M'?f1(v)+(v===1.78?'':'')+' M':D.unit==='%'?f1(v)+'%':D.unit==='×'?f1(v)+'×':Math.round(v).toLocaleString('en-US');
  function drawBur(k){const N=vb(bsv,'720 300','400 400'),D=BUR[bur];let s='';
    const L=N?{x0:16,bx:16,bw:290,top:46,rowH:72}:{x0:24,bx:270,bw:360,top:50,rowH:54};
    s+=N?whWrap(D.title,46).map((l,i)=>`<text x="16" y="${20+i*13}" class="t-sm" style="fill:var(--brand)">${l}</text>`).join(''):`<text x="24" y="22" class="t-sm" style="fill:var(--brand)">${D.title}</text>`;
    const X=v=>L.bx+L.bw*v/D.max;
    D.rows.forEach(([lab,v,c],i)=>{const y=L.top+i*L.rowH+(N?10:0);
      if(N)s+=`<text x="16" y="${y+10}" class="t-lbl" style="font-size:12px">${lab}</text>`;else s+=`<text x="${L.bx-10}" y="${y+18}" class="t-lbl t-end" style="font-size:12.5px">${lab}</text>`;
      const by=y+(N?18:4),w=L.bw*v/D.max*k;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(L.bw)}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${by}" width="${f1(w)}" height="20" rx="5" style="fill:${c}"/>`;
      const v2=D.unit==='M'?(Math.round(v*k*100)/100):v*k;s+=`<text x="${f1(L.bx+w+7)}" y="${by+14.5}" class="t-xs" style="fill:var(--ink);font-weight:600">${D.unit==='M'?(Math.round(v2*100)/100).toFixed(v===1.78?2:1)+' M':fmtB(v2,D)}</text>`;
      if(bur==='life'&&!N)s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${by-3}" y2="${by+23}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`});
    if(bur==='life'){const yy=L.top+4*L.rowH+(N?12:4);s+=`<text x="${N?16:L.bx}" y="${yy}" class="t-xs">${N?'':'dashed line: SMR 1, the general-population rate · '}Nordic registers: life expectancy 24–28 years shorter</text>`}
    if(bur==='us'){const yy=L.top+4*L.rowH+(N?12:4);s+=`<text x="${N?16:L.bx}" y="${yy}" class="t-xs">≈ 488 deaths a day in 2020–2021 · +29.3% vs 2016–2017</text>`}
    bsv.innerHTML=s;$('#whBurCap').innerHTML=D.cap;$('#whBurNote').innerHTML=noteHTML(D.note)}
  function setBur(k){bur=k;$$('#whBurBtns [data-bur]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bur===k));
    burStop&&burStop();burStop=animate(700,p=>drawBur(ease(p)),()=>{burStop=null})}
  $('#whBurBtns').addEventListener('click',e=>{const b=e.target.closest('[data-bur]');if(b)setBur(b.dataset.bur)});
  drawBur(1);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawWho(1);drawBur(1)};
};
/* =============== 1.2 Standard drinks, blood alcohol & metabolism =============== */
/* One illustrative evening: four 14 g drinks at hours 0, 1, 2 and 3. Every model value comes from the
   research pass (cited in the stage caption); the absorption speeds are ours, chosen so the peak after
   each drink lands inside the published 10-60 minute window. */
const DR_H=12;
const DR_DOSES=[[0,14],[1,14],[2,14],[3,14]];
const DR_PERSON={m:{kg:70,r:.68,n:'man, 70 kg'},f:{kg:60,r:.55,n:'woman, 60 kg'}};
const DR_FOOD=[{ka:4,beta:.0125,n:'empty stomach'},{ka:1.5,beta:.0175,n:'after a meal'}];
/* effect ladder: Abrahao 2017 thresholds in mM, converted to g/dL by the research team */
const DR_BANDS=[
 {from:.03,to:.055,col:'var(--gaba-fill)',label:'≈0.03 effects distinguishable'},
 {from:.055,to:.08,col:'var(--thi-fill)',label:'≈0.055 anxiolytic, euphoric'},
 {from:.08,to:.23,col:'var(--eth-fill)',label:'≈0.08 slowed reactions → sedation'},
 {from:.23,to:.6,col:'var(--glu-fill)',label:'>0.23 coma, breathing stops'}];
const DR_STEPS=[
 {from:0,at:.02,k:'Hour 0 · the first drink',t:'Grams, not glasses',
  txt:`This evening is four US standard drinks of about 14 g of ethanol each, one an hour. <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup> Ethanol is absorbed quickly from the gut: peak blood alcohol after a dose usually comes 10–60 minutes later. <sup class="c" data-ref="Jones2019WIREs" title="Source 213">213</sup> How fast depends on the drinking pattern, the drink's strength and, most of all, whether the person has eaten. <sup class="c" data-ref="Norberg2003" title="Source 347">347</sup> Press <b>After a meal</b> to compare.`,
  pt:`A drink is counted by the grams of pure alcohol in it. From the stomach it reaches the blood within minutes.`,
  hook:`US standard drink = 0.6 oz ethanol (≈14 g): 12 oz beer 5%, 5 oz wine 12%, 1.5 oz spirits 40%. GBD and the WHO AUDIT use 10 g. <sup class="c" data-ref="KranzlerSoyka2018,GBD2016Alcohol" title="Source 137,261">137,261</sup>`},
 {from:.05,at:.2,k:'Hours 0.5–3 · rising',t:'Absorption outpaces the liver',
  txt:`Ethanol spreads through total body water: it has low lipid solubility and does not bind to plasma proteins. <sup class="c" data-ref="Norberg2003" title="Source 347">347</sup> Its average volume of distribution is about 0.70 L/kg in men and 0.60 L/kg in women; estimate formulas often use fixed Widmark factors of 0.68 and 0.55. <sup class="c" data-ref="Jones2019WIREs,Terpstra2020" title="Source 213,454">213,454</sup> Each new drink arrives faster than the liver can clear it, so the curve climbs in steps. Switch to <b>Woman, 60 kg</b>: the same grams in less body water give a higher curve. <sup class="c" data-ref="Frezza1990" title="Source 132">132</sup>`,
  pt:`The alcohol spreads into the water in the body. Less body water means a higher level from the same drinks.`,
  hook:`BAC ≈ grams ÷ (r × body weight). r ≈ 0.68 men, 0.55 women (Widmark). <sup class="c" data-ref="Terpstra2020" title="Source 454">454</sup>`},
 {from:.27,at:.305,k:'About hour 3.5 · the peak',t:'The peak, and what the brain feels',
  txt:`Effects follow blood level, but not exactly. Abrahao 2017 gives thresholds in millimolar: effects reliably distinguishable at about 6 mM (≈0.03 g/dL), anxiolytic and euphoric effects at about 12 mM (≈0.055), slowed reactions, poor coordination and impaired thinking around legal intoxication, 18 mM (≈0.08). Up to 50 mM (≈0.23) sedation escalates; above it, strong sedation and respiratory depression can lead to coma or death. <sup class="c" data-ref="Abrahao2017" title="Source 1">1</sup> Severity also depends on how fast alcohol is taken, tolerance and other conditions. <sup class="c" data-ref="Parmar2026StatPearls" title="Source 355">355</sup>`,
  pt:`The higher the level, the more the brain slows. At very high levels breathing can stop: that is alcohol poisoning, an emergency.`,
  hook:`100 mg/100 mL (0.1%) ≈ 22 mM ethanol. <sup class="c" data-ref="Edenberg2007" title="Source 96">96</sup>`},
 {from:.36,at:.47,k:'Hours 4–9 · falling',t:'A straight-line fall: zero-order elimination',
  txt:`Once absorption ends, BAC falls by about the same amount every hour. The rate-limiting step is cytosolic alcohol dehydrogenase (ADH), whose Km is so low (2–10 mg/100 mL) that it is saturated after the first few drinks: zero-order kinetics describe the fall above about 20 mg/100 mL. <sup class="c" data-ref="Jones2010" title="Source 212">212</sup> Typical rates are 10–15 mg/100 mL per hour fasting and 15–20 after food; 15 is a good average for moderate drinkers. <sup class="c" data-ref="Jones2010" title="Source 212">212</sup> Average liver capacity is about 7 g of ethanol an hour. <sup class="c" data-ref="Cederbaum2012" title="Source 59">59</sup>`,
  pt:`The liver works at a fixed top speed, roughly one drink an hour. Coffee, a cold shower or sleep do not change that; only time does.`,
  hook:`<b>Zero-order</b>: BAC falls by a constant amount per hour (≈0.015 g/dL/h), not a constant fraction. ADH is saturated. <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>`},
 {from:.55,at:.6,k:'Inside a liver cell',t:'Ethanol → acetaldehyde → acetate',
  txt:`ADH, with help from CYP2E1 and catalase, oxidises ethanol to acetaldehyde; mitochondrial ALDH2 then oxidises acetaldehyde to acetate. Both steps reduce NAD<sup>+</sup> to NADH. <sup class="c" data-ref="Zakhari2006,Cederbaum2012" title="Source 59,512">59,512</sup> The NADH surplus stimulates fatty-acid synthesis and opposes fat burning, which promotes fatty liver, and raises lactate. <sup class="c" data-ref="Lieber2004Fatty" title="Source 290">290</sup> Acetaldehyde, the first and most toxic metabolite, is a mutagen that damages DNA and the main focus of research into how alcohol causes cancer. <sup class="c" data-ref="Seitz2007,Brooks2009" title="Source 50,425">50,425</sup> Normally most is cleared at once, so blood acetaldehyde stays low: the small middle pool. <sup class="c" data-ref="Cederbaum2012" title="Source 59">59</sup> See <a href="#liver" data-go="liver">The liver</a>.`,
  pt:`The liver turns alcohol into acetaldehyde, a harmful substance linked to cancer, and then into harmless acetate. The process also pushes the liver to store fat.`,
  hook:`Acetaldehyde causes the <b>flush</b> (when ALDH2 is slow) and is a <b>carcinogen</b>; NADH excess → fatty liver. <sup class="c" data-ref="Brooks2009,Lieber2004Fatty" title="Source 50,290">50,290</sup>`},
 {from:.75,at:.88,k:'Hours 9–12 · the tail',t:'Back to zero, eventually',
  txt:`Below about 20 mg/100 mL ADH is no longer saturated and the line curves into the axis. <sup class="c" data-ref="Jones2010" title="Source 212">212</sup> 92–98% of ethanol is oxidised; only 2–10% leaves unchanged in breath, urine and sweat, and 0.1–0.2% becomes ethyl glucuronide and ethyl sulfate, the basis of the urine tests in <a href="#biomarkers" data-go="biomarkers">Blood and urine markers</a>. <sup class="c" data-ref="Jones2019WIREs" title="Source 213">213</sup> People who drink heavily clear faster, 25–35 mg/100 mL per hour, because CYP2E1 is induced, which also brings cross-tolerance to other drugs and more toxic paracetamol metabolites. <sup class="c" data-ref="Jones2010,Lieber2004MEOS" title="Source 212,291">212,291</sup>`,
  pt:`It can take many hours to clear an evening's drinks, often past the next morning.`,
  hook:`Chronic drinking induces CYP2E1 (MEOS): faster clearance, cross-tolerance, more toxic acetaminophen metabolites. Acute drinking <b>inhibits</b> other drugs' metabolism. <sup class="c" data-ref="Lieber2004MEOS" title="Source 291">291</sup>`}
];

/* BAC function sampled once per scenario, then looked up */
function drTable(doses,kg,r,beta,ka,H,step){const f=bacSeries({doses,kg,r,beta,ka}),n=Math.round(H/step),a=new Float64Array(n+1);for(let i=0;i<=n;i++)a[i]=f(i*step);
  return h=>{const u=clamp(h,0,H)/step,i=Math.floor(u),j=Math.min(n,i+1);return lerp(a[i],a[j],u-i)}}

inits.drinks=()=>{
  const svg=$('#drSvg'),rg=$('#drT');let sx='m',fd=0;const cache={};
  const scen=()=>{const k=sx+fd;if(!cache[k]){const P=DR_PERSON[sx],F=DR_FOOD[fd];const f=drTable(DR_DOSES,P.kg,P.r,F.beta,F.ka,DR_H,1/30);
      let pk=0,ph=0,zero=null;for(let h=0;h<=DR_H;h+=1/30){const v=f(h);if(v>pk){pk=v;ph=h}if(h>3.2&&zero==null&&v<=0)zero=h}
      cache[k]={f,P,F,pk,ph,zero,vd:P.r*P.kg*10}}return cache[k]};
  const gut=(h,ka)=>DR_DOSES.reduce((s,[t0,g])=>s+(h>=t0?g*Math.exp(-ka*(h-t0)):0),0);
  const given=h=>DR_DOSES.reduce((s,[t0,g])=>s+(h>=t0?g:0),0);
  /* fixed scatter positions for ethanol marks in the blood */
  const R=rng(77),BL=[];for(let i=0;i<40;i++){const head=i%7===0;BL.push(head?[(R()*2-1)*13,14+R()*20]:[(R()*2-1)*36,78+R()*140])}
  const SG=[];for(let i=0;i<14;i++)SG.push([8+R()*20,140+R()*20]);
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 372','400 510'),S=scen(),h=t*DR_H,b=S.f(h),gG=gut(h,S.F.ka),gv=given(h),elim=Math.max(0,gv-gG-b*S.vd);
    const db=(S.f(Math.min(DR_H,h+.05))-S.f(Math.max(0,h-.05)))/.1;
    let s=`<defs>${marker('drA','var(--muted)')}</defs>`;
    /* ---- body ---- */
    const bx=N?72:116,by=N?18:28,bs=N?.84:1.28;
    const body=bodymap(bx,by,bs,{hl:{stomach:clamp(gG/20),liver:b>.002?.55+.45*clamp(b/.1):0,brain:clamp(b/.12)},col:{stomach:'var(--eth-fill)',liver:'var(--liver)',brain:'var(--gaba-fill)'}});
    s+=body.svg;const A=body.at,P=(a,c)=>[bx+a*bs,by+c*bs];
    /* drinks travelling down: each dose shows for 0.3 h */
    DR_DOSES.forEach(([t0])=>{const u=(h-t0)/.3;if(u<0||u>1)return;
      for(let k=0;k<4;k++){const v=clamp(u*1.2-k*.07),p=v<.35?[lerp(A.mouth[0],A.oeso[0],v/.35),lerp(A.mouth[1],A.oeso[1],v/.35)]:[lerp(A.oeso[0],A.stomach[0],(v-.35)/.65),lerp(A.oeso[1],A.stomach[1],(v-.35)/.65)];
        s+=mol(p[0],p[1],'eth',{r:N?3.6:4.4})}});
    /* in the stomach and gut */
    for(let i=0;i<Math.round(clamp(gG/3,0,14));i++){const q=P(SG[i][0],SG[i][1]);s+=mol(q[0],q[1],'eth',{r:N?2.6:3})}
    /* in the blood: count follows BAC */
    for(let i=0;i<Math.round(clamp(b/.004,0,40));i++){const q=P(BL[i][0],BL[i][1]);s+=mol(q[0],q[1],'eth',{r:N?2.2:2.6,op:.8})}
    /* labels */
    const lab=(k,txt,side)=>{const [x,y]=A[k],lx=side>0?bx+(N?52:80):bx-(N?52:80);s+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(lx+(side>0?-3:3))}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(y+3.5)}" class="t-xs${side>0?'':' t-end'}">${txt}</text>`};
    if(!N){lab('stomach','stomach, gut',1);lab('liver','liver',-1);lab('brain','brain',-1)}
    if(!N)s+=`<text x="${bx}" y="${by+bs*250+6}" class="t-xs t-mid">amber marks: ethanol (schematic)</text>`;
    /* ---- BAC curve ---- */
    const cx=N?44:262,cy=N?262:28,cw=N?344:438,ch=N?210:182,Y1=.26;
    const C=curve(cx,cy,cw,ch,S.f,{x0:0,x1:DR_H,y0:0,y1:Y1,upto:h,fill:true,dot:true,bands:N?DR_BANDS.map((b,i)=>Object.assign({},b,{label:['≈0.03','≈0.055','≈0.08 impaired','>0.23 coma risk'][i]})):DR_BANDS});
    s+=C.svg;
    for(let v=0;v<=12;v+=2)s+=`<text x="${f1(C.X(v))}" y="${cy+ch+13}" class="t-xs t-mid">${v}</text>`;
    s+=`<text x="${cx+cw}" y="${cy+ch+26}" class="t-xs t-end">hours since the first drink</text>`;
    [.05,.1,.15,.2,.25].forEach(v=>s+=`<text x="${cx-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v?v.toFixed(2):'0'}</text>`);
    s+=`<text x="${cx}" y="${cy-8}" class="t-sm" style="fill:var(--eth)">BLOOD ALCOHOL, g/dL · ${S.P.n}, ${S.F.n}</text>`;
    DR_DOSES.forEach(([t0])=>{const x=C.X(t0);s+=`<path d="M${f1(x)} ${cy+ch}v-7" style="stroke:var(--eth);stroke-width:2"/>`+(h>=t0?`<circle cx="${f1(x)}" cy="${cy+ch-10}" r="2.6" style="fill:var(--eth)"/>`:'')});
    /* slope guide: the straight zero-order line */
    if(h>S.ph+.6&&b>.02){const h0=S.ph+.5,v0=S.f(h0),h1=Math.min(h,h0+(v0-.02)/S.F.beta);
      s+=`<line x1="${f1(C.X(h0))}" y1="${f1(C.Y(v0))}" x2="${f1(C.X(h1))}" y2="${f1(C.Y(v0-S.F.beta*(h1-h0)))}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 4;opacity:.7"/>`;
      const mx=C.X((h0+h1)/2),my=C.Y(v0-S.F.beta*(h1-h0)/2);
      s+=`<text x="${f1(mx+6)}" y="${f1(my+16)}" class="t-xs" style="fill:var(--ink)">−${S.F.beta.toFixed(4).replace(/0$/,'')}${N?'/h':' g/dL every hour'}</text>`}
    /* ---- liver cell inset ---- */
    const lx=N?132:262,ly=N?18:242,lw=N?260:438,lh=N?206:118;
    s+=`<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="14" style="fill:var(--cell);stroke:var(--liver);stroke-width:1.4"/>`;
    s+=`<text x="${lx+12}" y="${ly+17}" class="t-sm" style="fill:var(--liver)">INSIDE A LIVER CELL</text>`;
    const act=b>.002,sat=b>.02,acet=act?.12+.12*clamp(b/.1):0;
    const pw=pathway(lx+(N?6:40),ly+(N?52:22),lw-(N?12:80),{eth:clamp(b/.13),acet,ace:act?.35+.25*clamp(b/.1):clamp(.35-(h-(S.zero||DR_H))*.2,0,.35),nadh:act?(sat?.9:.5):0});
    s+=pw.svg;
    if(act){const e=pw.at.eth,c=pw.at.acet,a=pw.at.ace;for(let k=0;k<3;k++){const u=((h*3.2)+k/3)%1;
        s+=mol(lerp(e[0]+24,c[0]-26,u),e[1]+(N?14:13),'eth',{r:2.6})+mol(lerp(c[0]+24,a[0]-26,(u+.5)%1),c[1]+(N?14:13),'acet',{r:2.4})}}
    const st=!act?(gv?'ADH idle: no ethanol left':'waiting for the first drink'):(db>.002&&!sat)?'absorbing: ethanol reaching the liver':sat?'ADH saturated: same speed at any BAC':'below ≈0.02 g/dL: ADH no longer saturated';
    s+=`<text x="${lx+lw-12}" y="${ly+17}" class="t-xs t-end" style="fill:var(--ink)">${N?'':st}</text>`;
    if(N)s+=`<text x="${lx+lw/2}" y="${ly+lh-10}" class="t-xs t-mid" style="fill:var(--ink)">${st}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(DR_STEPS,t);setSt(ph);$('#drNote').innerHTML=noteHTML(DR_STEPS[ph]);
    $('#drRead').innerHTML=`<span>hour <b>${f1(h)}</b></span><span>BAC <b>${b.toFixed(3)}</b> g/dL (teaching value)</span><span>${db>.002?'<b>rising</b>':b>.001?'falling <b>'+(-db).toFixed(3)+'</b> g/dL/h':'<b>—</b>'}</span><span>drunk <b>${gv}</b> g · in gut <b>${f1(gG)}</b> g · cleared <b>${f1(elim)}</b> g</span><span>peak <b>${S.pk.toFixed(3)}</b> at ${f1(S.ph)} h · zero ${S.zero?'at <b>'+f1(S.zero)+' h</b>':'<b>not yet by 12 h</b>'}</span>`;
  }
  const stop=playWire(rg,$('#drPlay'),draw,22000,'Replay','drinks');
  setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  $$('[data-drsx]').forEach(b=>b.addEventListener('click',()=>{sx=b.dataset.drsx;$$('[data-drsx]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-drfd]').forEach(b=>b.addEventListener('click',()=>{fd=+b.dataset.drfd;$$('[data-drfd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- standard-drink converter ---- */
  const cv=$('#drConv'),vol=$('#drVol'),abv=$('#drAbv');
  function conv(){const N=vb(cv,'720 236','400 360'),V=+vol.value,A=+abv.value,g=V*A/100*.789;
    $('#drVolV').textContent=`${V} mL (${f1(V/29.57)} US fl oz)`;$('#drAbvV').textContent=`${A}%`;
    let s='';const bwx=N?24:30,bwy=N?30:40,bw=N?64:84,bh=N?110:150;
    s+=beaker(bwx,bwy,bw,bh,V/1000,{label:`${V} mL at ${A}%`,ticks:4});
    s+=`<text x="${bwx+bw+4}" y="${bwy+2}" class="t-xs">1 L</text>`;
    const gx=N?120:150;
    s+=`<text x="${gx}" y="${bwy+24}" class="t-big" style="font-size:${N?30:36}px;fill:var(--eth)">${f1(g)} g</text><text x="${gx}" y="${bwy+42}" class="t-xs">of pure ethanol = ${V} × ${A}/100 × 0.789</text>`;
    const rows=[[14,'US standard drinks (14 g)'],[10,'standard drinks of 10 g'],[8,'UK units (8 g)']],cap=N?16:24,ix=N?24:330,iy0=N?178:28,sp=N?22:15.5,iw=N?13:10,ihh=N?20:16,rowH=N?60:70;
    rows.forEach(([gr,nm],ri)=>{const n=g/gr,y=iy0+ri*rowH+(N?0:4);
      s+=`<text x="${ix}" y="${y}" class="t-lbl">${n<10?n.toFixed(1):Math.round(n)} <tspan class="t-sm" style="font-weight:500">${nm}</tspan></text>`;
      const full=Math.min(cap,Math.ceil(n-.02));for(let i=0;i<full;i++){const lv=i<Math.floor(n+.02)?1:n-Math.floor(n);s+=beaker(ix+i*sp,y+12,iw,ihh,lv,{ticks:1})}
      if(n>cap)s+=`<text x="${ix+cap*sp+2}" y="${y+28}" class="t-xs">+${Math.ceil(n-cap)} more</text>`});
    cv.innerHTML=s;
    $('#drConvNote').innerHTML=noteHTML({k:'The same grams, three ways of counting',t:`${f1(g)} g of ethanol`,
      txt:`That is ${f1(g/14)} US standard drinks, ${f1(g/10)} drinks of 10 g or ${f1(g/8)} UK units. Strength matters as much as size: a large 250 mL glass of 13% wine holds almost two US drinks (25.6 g). Because the WHO AUDIT assumes a 10 g drink, the US drink is 40% larger and the USAUDIT adapts its questions to it. <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup>`,
      pt:`Count grams, not glasses. A pint of strong beer or a big glass of wine is often more than one "drink".`,
      hook:`grams = mL × ABV% ÷ 100 × 0.789. National standard drinks range from 8 to 20 g; the modal one is 10 g. <sup class="c" data-ref="Kalinowski2016" title="Source 217">217</sup>`});
  }
  [vol,abv].forEach(e=>e.addEventListener('input',conv));
  $$('[data-drp]').forEach(b=>b.addEventListener('click',()=>{const [v,a]=b.dataset.drp.split(',');vol.value=v;abv.value=a;conv()}));
  conv();

  /* ---- teaching BAC calculator ---- */
  const cs=$('#drCalc'),cN=$('#drcN'),cH=$('#drcH'),cW=$('#drcW'),cG=$('#drcG'),cR=$('#drcR'),cB=$('#drcB');
  function calc(){const N=vb(cs,'720 300','400 340'),n=+cN.value,H=+cH.value,kg=+cW.value,gr=+cG.value,r=+cR.value,beta=+cB.value;
    $('#drcNV').textContent=n;$('#drcHV').textContent=H+' h';$('#drcWV').textContent=kg+' kg';
    const doses=[];for(let i=0;i<n;i++)doses.push([n>1?i*H/(n-1):0,gr]);
    const HM=16,f=drTable(doses,kg,r,beta,6,HM,1/10);let pk=0,ph=0,zero=null;for(let h=0;h<=HM+1e-9;h+=.1){const v=f(h);if(v>pk){pk=v;ph=h}if(h>H&&zero==null&&v<=0)zero=h}
    const top=Math.min(.6,Math.max(.1,Math.ceil(pk*1.3/.05)*.05));
    const x0=N?44:62,y0=N?36:30,w=N?344:630,hh=N?240:220;
    const C=curve(x0,y0,w,hh,f,{x0:0,x1:HM,y0:0,y1:top,fill:false,dot:false,bands:DR_BANDS.map(b=>Object.assign({},b,{label:N&&b.from<.05?'':b.label}))});
    let band='';for(let i=0;i<=80;i++){const hv=HM*i/80;band+=(i?'L':'M')+f1(C.X(hv))+' '+f1(C.Y(f(hv)*1.21))}for(let i=80;i>=0;i--){const hv=HM*i/80;band+='L'+f1(C.X(hv))+' '+f1(C.Y(f(hv)*.79))}
    let s=C.svg+`<path d="${band}Z" style="fill:var(--eth-fill);opacity:.22"/>`+curve(x0,y0,w,hh,f,{x0:0,x1:HM,y0:0,y1:top,col:'var(--eth)'}).svg.replace(/<rect[^>]*var\(--field\)[^>]*\/>/,'').replace(/<line[^>]*class="axis"\/>/g,'');
    for(let v=0;v<=HM;v+=2)s+=`<text x="${f1(C.X(v))}" y="${y0+hh+13}" class="t-xs t-mid">${v}</text>`;
    s+=`<text x="${x0+w}" y="${y0+hh+26}" class="t-xs t-end">hours since the first drink</text>`;
    const tk=top<=.15?.025:top<=.3?.05:.1;for(let v=0;v<=top+1e-9;v+=tk)s+=`<text x="${x0-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v?v.toFixed(tk<.05?3:2):'0'}</text>`;
    doses.forEach(([t0])=>s+=`<path d="M${f1(C.X(t0))} ${y0+hh}v-7" style="stroke:var(--eth);stroke-width:2"/>`);
    s+=`<text x="${x0}" y="${y0-10}" class="t-sm" style="fill:var(--warn)">TEACHING CURVE · not a measurement · not a guide to driving</text>`;
    cs.innerHTML=s;
    const tot=n*gr,poison=pk*1.21>.23;
    $('#drCalcNote').innerHTML=noteHTML({k:`${n} × ${gr} g = ${tot} g ethanol · ${kg} kg · r ${r} · β ${beta}`,t:`Textbook peak ≈ ${pk.toFixed(3)} g/dL`,
      txt:`On this model the peak comes about ${f1(ph)} h after the first drink and the curve reaches zero ${zero?'after about <b>'+f1(zero)+' h</b>':'<b>after more than 16 h</b>'}. With the ±21% band the peak could be ${(pk*.79).toFixed(3)}–${(pk*1.21).toFixed(3)} g/dL, and real bodies vary more. <sup class="c" data-ref="Searle2015,Posey2007Widmark" title="Source 368,423">368,423</sup> Only time lowers BAC: the liver clears about 7 g an hour on average. <sup class="c" data-ref="Cederbaum2012" title="Source 59">59</sup>${poison?` <b>The upper edge of this curve crosses ≈0.23 g/dL, the level above which published research describes strong sedation and respiratory depression that can lead to coma or death.</b> <sup class="c" data-ref="Abrahao2017" title="Source 1">1</sup> In real life, someone who cannot be woken or is breathing slowly needs emergency services now. <sup class="c" data-ref="Kanny2015" title="Source 221">221</sup>`:''}`,
      pt:`This shows the shape of the curve: up while drinks are absorbed, then down by a fixed amount each hour. It cannot tell you or anyone else whether it is safe to drive or to keep drinking.`,
      hook:`Widmark: C = A ÷ (r × W) − β × t. Halving β (a slow eliminator) roughly doubles the time to zero. <sup class="c" data-ref="Terpstra2020,Jones2010" title="Source 212,454">212,454</sup>`});
  }
  [cN,cH,cW].forEach(e=>e.addEventListener('input',calc));[cG,cR,cB].forEach(e=>e.addEventListener('change',calc));
  calc();
  const prevR=redraws.drinks;redraws.drinks=()=>{prevR&&prevR();conv();calc()};
};
/* =============== 1.3 Alcohol and the brain: reward, adaptation, craving =============== */
const BR_PH=[{a:0,b:.14,n:'before',w:'before drinking'},{a:.14,b:.36,n:'drink',w:'first drinks'},{a:.36,b:.64,n:'months',w:'months of heavy drinking'},{a:.64,b:.82,n:'stops',w:'drinking stops'},{a:.82,b:1,n:'again',w:'repeated withdrawals'}];
const BR_STEPS=[
 {from:0,at:.06,k:'Before drinking',t:'A brain in balance',
  txt:`Two signals keep neurons in check. GABA acting on GABA-A receptors opens a chloride channel and calms the cell (blue). Glutamate acting on NMDA receptors lets in positive ions and excites it (red). Ethanol acts on the brain from the low millimolar range up to about 100 mM: early stimulant effects are followed by depressant ones. <sup class="c" data-ref="Abrahao2017" title="Source 1">1</sup>`,
  pt:`The brain has a brake (GABA) and an accelerator (glutamate). Normally they balance.`,
  hook:`GABA-A = ligand-gated Cl<sup>−</sup> channel (inhibitory). NMDA = glutamate-gated cation channel (excitatory).`},
 {from:.14,at:.26,k:'A drink',t:'Brake on, accelerator off',
  txt:`Specific GABA-A receptor subtypes respond to ethanol at social-drinking doses, and ethanol also raises GABA transmission indirectly, through neuroactive steroids and more presynaptic GABA release. <sup class="c" data-ref="Kumar2009" title="Source 264">264</sup> At the same time it blocks NMDA receptors: in hippocampal neurons 50 mM ethanol cut NMDA current by 61%, against 18% for kainate and 15% for quisqualate currents, and the potency of different alcohols at this tracked how intoxicating they are. <sup class="c" data-ref="Lovinger1989" title="Source 300">300</sup> Alcohol also releases dopamine in the nucleus accumbens <sup class="c" data-ref="Boileau2003" title="Source 43">43</sup> and the brain's own opioids in the nucleus accumbens and orbitofrontal cortex <sup class="c" data-ref="Mitchell2012" title="Source 333">333</sup>: the glowing reward area.`,
  pt:`Alcohol presses the brake and eases off the accelerator, so the brain slows. It also triggers the brain's reward chemicals.`,
  hook:`Acute ethanol: <b>potentiates GABA-A</b>, <b>inhibits NMDA</b> (61% at 50 mM), releases dopamine and endogenous opioids. <sup class="c" data-ref="Kumar2009,Lovinger1989,Boileau2003,Mitchell2012" title="Source 43,264,300,333">43,264,300,333</sup>`},
 {from:.36,at:.55,k:'Months of heavy drinking',t:'The brain pushes back: tolerance',
  txt:`With alcohol nearly always present, the brain adapts. GABA-A α1 subunits are pulled into the cell and reduced in the cortex, while α4 rises (after 14 days of chronic ethanol in animals). <sup class="c" data-ref="Kumar2009" title="Source 264">264</sup> NMDA receptors are up-regulated. <sup class="c" data-ref="TsaiCoyle1998" title="Source 466">466</sup> Fewer brakes and more accelerators bring the beam back to level <i>while alcohol is there</i>: the same amount has less effect. That is tolerance. <span class="ev est">Established</span> The reward glow fades too: people with alcohol dependence had lower striatal D2 receptor availability than controls. <sup class="c" data-ref="Volkow1996" title="Source 480">480</sup>`,
  pt:`The brain rebuilds itself to work normally with alcohol in it. It now needs alcohol to feel balanced.`,
  hook:`Chronic: GABA-A α1 ↓ (internalised), α4 ↑, NMDA receptors ↑ = tolerance and dependence. <sup class="c" data-ref="Kumar2009,TsaiCoyle1998" title="Source 264,466">264,466</sup>`},
 {from:.64,at:.74,k:'Drinking stops suddenly',t:'Unopposed excitation: withdrawal',
  txt:`Take the alcohol away and the adapted brain is left with too few brakes and too many accelerators. Abrupt withdrawal produces a hyperexcitable state that leads to seizures, delirium tremens and excitotoxic neuronal death. <span class="ev est">Established</span> <sup class="c" data-ref="TsaiCoyle1998" title="Source 466">466</sup> Stress systems join in: more noradrenaline and dynorphin, less neuropeptide Y. <sup class="c" data-ref="Koob2014" title="Source 254">254</sup> This is why stopping after long, heavy daily drinking should be done with medical help. See <a href="#withdrawal" data-go="withdrawal">the withdrawal timeline</a> and <a href="#detox" data-go="detox">managing withdrawal safely</a>.`,
  pt:`Without alcohol the brain races: shaking, sweating, anxiety, and sometimes seizures or confusion. Get medical help to stop safely.`,
  hook:`Withdrawal = NMDA up-regulation + GABA-A down-regulation unmasked → seizures, delirium tremens, excitotoxic neuronal death. <sup class="c" data-ref="TsaiCoyle1998" title="Source 466">466</sup>`},
 {from:.82,at:.92,k:'Repeated withdrawals',t:'Kindling: each episode can be worse',
  txt:`Withdrawal severity can increase after repeated withdrawal episodes. Kindling may also contribute to relapse risk and alcohol-related cognitive impairment. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Becker1998" title="Source 34">34</sup> The bars show the idea, not measured sizes. Some brain changes do recover with sustained abstinence: in 58 men scanned repeatedly, fluid spaces shrank over the first weeks without alcohol. <sup class="c" data-ref="Pfefferbaum1995,Zahr2017" title="Source 361,511">361,511</sup>`,
  pt:`Each time a person goes through withdrawal without help, the next one may be harder. That is another reason to get medical support.`,
  hook:`Kindling (Becker 1998): repeated withdrawals → withdrawal severity can increase with each episode; may add to relapse risk and cognitive impairment. <sup class="c" data-ref="Becker1998" title="Source 34">34</sup>`}
];
const BR_CY=[
 {from:0,at:.12,k:'Stage 1 of 3 · basal ganglia',t:'Binge / intoxication',
  txt:`The rewarding effects of alcohol, incentive salience (alcohol cues gaining pull) and drug-seeking habits involve dopamine and opioid peptides in the basal ganglia. <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>`,
  early:`Early on, drinking is driven mainly by the reward itself: positive reinforcement.`,
  late:`Later, the "high" is smaller (tolerance and lower D2 availability <sup class="c" data-ref="Volkow1996" title="Source 480">480</sup>) and habit carries more weight: in heavy drinkers, alcohol cues activate the dorsal striatum more. <span class="ev early">Early evidence</span> <sup class="c" data-ref="VollstadtKlein2010" title="Source 481">481</sup>`,
  pt:`Drinking feels rewarding, and the brain learns to notice alcohol and the places, people and moods linked to it.`,
  hook:`Binge/intoxication = basal ganglia (nucleus accumbens, dorsal striatum); dopamine + opioid peptides. <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>`},
 {from:1/3,at:.45,k:'Stage 2 of 3 · extended amygdala',t:'Withdrawal / negative affect',
  txt:`As the effect wears off, the dopamine reward component weakens and stress transmitters, corticotropin-releasing factor (CRF) and dynorphin, are recruited in the extended amygdala: a reward deficit plus a stress surfeit. <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup> In animals, acute withdrawal from dependence raises reward thresholds, increases anxiety-like behaviour and raises CRF in the central amygdala. <sup class="c" data-ref="Koob2014" title="Source 254">254</sup>`,
  early:`Early on this dip is small and passes.`,
  late:`Later the dip is deep, and drinking comes to relieve it: negative reinforcement. <span class="ev early">Early evidence, mainly from animal models</span> <sup class="c" data-ref="Koob2014" title="Source 254">254</sup>`,
  pt:`After drinking the person feels low, irritable or anxious, and alcohol starts to be used to make that feeling go away.`,
  hook:`Withdrawal/negative affect = extended amygdala; CRF and dynorphin ↑, dopamine ↓. Drinking for relief = <b>negative reinforcement</b>. <sup class="c" data-ref="KoobVolkow2016,Koob2014" title="Source 254,256">254,256</sup>`},
 {from:2/3,at:.8,k:'Stage 3 of 3 · prefrontal cortex and insula',t:'Preoccupation / anticipation',
  txt:`Craving and weaker executive control involve dysregulated glutamate projections from the prefrontal cortex and insula to the basal ganglia and extended amygdala. <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup> This is the link to acamprosate's glutamate hypothesis and to the talking therapies: see <a href="#therapy" data-go="therapy">Talking therapies</a>.`,
  early:`Early on, the brakes of the prefrontal cortex still work well.`,
  late:`Later, the allostasis model says the reward set point itself has shifted, which would explain lasting vulnerability to relapse after drinking stops. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="KoobLeMoal2001" title="Source 255">255</sup>`,
  pt:`Thoughts keep turning to drinking, and it gets harder to stop a plan once it starts. This is a change in brain circuits, not a lack of willpower.`,
  hook:`Preoccupation/anticipation = prefrontal cortex + insula; glutamate; craving and executive dysfunction. <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>`}
];

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');let setSt=()=>{};
  function st(t){const p1=ramp(t,.14,.22),c=ramp(t,.38,.6),s=ramp(t,.64,.7),eth=p1*(1-s);
    const ng=Math.round(lerp(4,1,c)),nn=Math.round(lerp(3,6,c));
    let kind=0,ep=-1;if(t>=.82){const u=(t-.82)/.18;ep=Math.min(2,Math.floor(u*3));kind=Math.sin(Math.PI*clamp(u*3-ep))*(.6+.2*ep)}
    const sp=t<.82?s*clamp(1-ramp(t,.76,.82)*.6):kind;
    const I=ng/4*(1+eth*1.4),E=nn/3*(1-eth*.55)*(1+sp*.4);
    return {eth,ng,nn,c,s,sp,ep,kind,I,E,tilt:clamp((E-I)/1.2,-1,1),cl:clamp(.2+eth*.7*(ng/4)+.15*(ng/4)),ca:clamp(.2*(nn/3)*(1-eth*.8)+sp*.75),gl:.35+sp*.4}}
  function draw(t){
    const N=vb(svg,'720 390','400 610'),S=st(t);
    let s=`<defs>${marker('brA','var(--muted)')}</defs>`;
    /* synapse */
    const sx=N?200:200,sy=N?150:170,sc=N?2:2.15;
    s+=synapse(sx,sy,sc,{gaba:S.ng,nmda:S.nn,gt:.45,gl:S.gl,eth:S.eth,cl:S.cl,ca:S.ca,spark:S.sp,block:S.eth,seed:3+Math.floor(t*40)});
    s+=`<text x="${sx}" y="${f1(sy-66*sc-6)}" class="t-xs t-mid">presynaptic neuron</text>`;
    s+=`<text x="${sx}" y="${f1(sy+40*sc+32)}" class="t-xs t-mid">postsynaptic neuron</text>`;
    s+=`<text x="${f1(sx-32*sc)}" y="${f1(sy+40*sc+15)}" class="t-sm t-mid" style="fill:var(--gaba)">GABA-A × ${S.ng}</text>`;
    s+=`<text x="${f1(sx+38*sc)}" y="${f1(sy+40*sc+15)}" class="t-sm t-mid" style="fill:var(--glu)">NMDA × ${S.nn}</text>`;
    if(S.eth>.05)s+=`<text x="${f1(sx-62*sc-4)}" y="${f1(sy+4)}" class="t-xs t-end" style="fill:var(--eth)">◆ ethanol</text>`;
    if(S.sp>.2)s+=`<text x="${sx}" y="${f1(sy+40*sc+48)}" class="t-sm t-mid" style="fill:var(--glu);font-weight:700">over-excitation</text>`;
    /* balance */
    const bx=N?200:556,byy=N?348:84,bw=N?200:220;
    const B=balance(bx,byy,bw,{tilt:S.tilt,ln:Math.round(clamp(S.I*2,0,6)),rn:Math.round(clamp(S.E*2,0,6)),lsub:'calming',rsub:'exciting'});
    s+=B.svg;
    const verdict=S.tilt<-.3?'tipped to calm: intoxication':S.tilt>.4?'tipped to excitation: withdrawal':S.c>.5?'level again, but only with alcohol':'balanced';
    s+=`<text x="${bx}" y="${byy-30}" class="t-lbl t-mid" style="fill:${S.tilt>.4?'var(--glu)':S.tilt<-.3?'var(--gaba)':'var(--ink)'}">${verdict}</text>`;
    /* small brain: reward and stress areas */
    const rx=N?200:556,ry=N?482:262,rs=N?.78:.86;
    const rew=S.eth*(1-S.c*.55),neg=Math.max(S.s*(t<.82?1:.7),S.kind);
    const Br=brain(rx,ry,rs,{hl:{stri:rew,amyg:neg}});s+=Br.svg;
    if(rew>.1)for(let i=0;i<Math.round(rew*6);i++){const a=i*1.1+t*30;s+=mol(Br.at.stri[0]+Math.cos(a)*16,Br.at.stri[1]+Math.sin(a)*10,'da',{r:2.4})}
    s+=`<text x="${rx}" y="${f1(ry+62*rs+14)}" class="t-xs t-mid">${rew>.1?'reward area (striatum): dopamine'+(S.c>.5?', blunted':''):neg>.1?'stress area (extended amygdala) active':'reward and stress areas'}</text>`;
    /* kindling bars */
    if(t>=.8){const kx=N?14:636,ky=N?520:330,kw=N?90:78;s+=`<text x="${kx+kw}" y="${ky-48}" class="t-xs t-end" style="fill:var(--glu)">severity (schematic)</text>`;
      for(let i=0;i<3;i++){const hh=(14+i*10)*(S.ep>=i?1:.25),x=kx+i*(kw/3);s+=`<rect x="${f1(x)}" y="${f1(ky-hh)}" width="${f1(kw/3-8)}" height="${f1(hh)}" rx="3" style="fill:var(--glu-fill);opacity:${S.ep>=i?.9:.25}"/><text x="${f1(x+(kw/3-8)/2)}" y="${ky+12}" class="t-xs t-mid">${i+1}</text>`}}
    /* timeline */
    const tx0=N?20:30,tx1=N?380:700,ty=N?586:368;
    BR_PH.forEach((p,i)=>{const a=lerp(tx0,tx1,p.a),b=lerp(tx0,tx1,p.b),on=t>=p.a&&t<p.b+(i===4?.01:0);
      s+=`<rect x="${f1(a+1)}" y="${ty-6}" width="${f1(b-a-2)}" height="6" rx="3" style="fill:${['var(--panel-2)','var(--eth-fill)','var(--eth)','var(--glu-fill)','var(--glu)'][i]};opacity:${on?1:.45}"/><text x="${f1((a+b)/2)}" y="${ty+12}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?p.n:p.w}</text>`});
    s+=`<circle cx="${f1(lerp(tx0,tx1,t))}" cy="${ty-3}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const ph=phaseOf(BR_STEPS,t);setSt(ph);$('#brNote').innerHTML=noteHTML(BR_STEPS[ph]);
    $('#brRead').innerHTML=`<span>phase <b>${BR_PH.find(p=>t>=p.a&&t<=p.b).w}</b></span><span>ethanol <b>${S.eth>.05?'present':'none'}</b></span><span>GABA-A drawn <b>${S.ng}</b> · NMDA drawn <b>${S.nn}</b></span><span>beam <b>${S.tilt<-.3?'calm side down':S.tilt>.4?'excitation side down':'about level'}</b></span>`;
  }
  const stop=playWire(rg,$('#brPlay'),draw,20000,'Replay','brain');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- the addiction cycle ---- */
  const cy=$('#brCy'),cr=$('#brCyT');let mode='early',setC=()=>{};
  const NAMES=[['Binge /','intoxication'],['Withdrawal /','negative affect'],['Preoccupation /','anticipation']],KEYS=['stri','amyg','pfc'],COLS=['var(--stri)','var(--amyg)','var(--pfc)'];
  /* reward level over one cycle: rises in the binge, dips in withdrawal; later the dip deepens and the baseline sinks */
  const lvl=(u,m)=>{const L=m==='late';const up=bump(u,0,1/3)*(L?.35:.8),dn=bump(u,1/3,2/3)*(L?.85:.25),base=L?-ramp(u,1/3,.6)*.45:0;return up-dn+base-(L?0:0)};
  function drawC(t){
    const N=vb(cy,'720 350','400 640'),L=mode==='late',stg=Math.min(2,Math.floor(t*3));
    let s='';const cx=N?200:222,cc=N?160:172,R=N?112:108;
    const arc=(a0,a1,r)=>{const p=a=>[cx+r*Math.sin(a),cc-r*Math.cos(a)];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${f1(x0)} ${f1(y0)}A${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}`};
    for(let i=0;i<3;i++){const a0=i*2*Math.PI/3+.05,a1=(i+1)*2*Math.PI/3-.05,big=(L?i===1:i===0),on=i===stg;
      s+=`<path d="${arc(a0,a1,R)}" style="fill:none;stroke:${COLS[i]};stroke-width:${big?22:12};opacity:${on?.95:.35};stroke-linecap:round"/>`;
      const am=(a0+a1)/2,lr=R+(N?0:0),lx=cx+(R+(big?26:20))*Math.sin(am),ly=cc-(R+(big?26:20))*Math.cos(am);
      const anc=Math.sin(am)>.3?'':Math.sin(am)<-.3?' t-end':' t-mid';
      const ix=N?cx+(R-34)*Math.sin(am):lx,iy=N?cc-(R-34)*Math.cos(am):ly;
      s+=`<text x="${f1(ix)}" y="${f1(iy-2)}" class="t-lbl${N?' t-mid':anc}" style="fill:${on?'var(--ink)':'var(--muted)'};font-size:${N?11:13}px">${NAMES[i][0]}</text><text x="${f1(ix)}" y="${f1(iy+12)}" class="t-sm${N?' t-mid':anc}">${NAMES[i][1]}</text>`}
    /* travelling marker */
    const am=t*2*Math.PI,mx=cx+R*Math.sin(am),my=cc-R*Math.cos(am);
    s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="9" style="fill:var(--ink);stroke:var(--panel);stroke-width:3"/>`;
    if(!N){s+=`<text x="${cx}" y="${cc-6}" class="t-big t-mid" style="font-size:15px">${L?'negative':'positive'}</text><text x="${cx}" y="${cc+12}" class="t-big t-mid" style="font-size:15px">reinforcement</text><text x="${cx}" y="${cc+30}" class="t-xs t-mid">${L?'drinking for relief':'drinking for reward'}</text>`}
    else s+=`<text x="${cx}" y="${cc+4}" class="t-xs t-mid">${L?'negative':'positive'} reinforcement</text>`;
    /* brain */
    const bx=N?200:560,by=N?402:118,bs=N?1.25:1.4,hl={};KEYS.forEach((k,i)=>hl[k]=i===stg?1:.12);
    const BB=brain(bx,by,bs,{hl});s+=BB.svg;const RG=['Basal ganglia (striatum)','Extended amygdala','Prefrontal cortex'][stg],ap=BB.at[KEYS[stg]];
    s+=`<line x1="${f1(ap[0])}" y1="${f1(ap[1])}" x2="${f1(ap[0])}" y2="${f1(by-62*bs)}" style="stroke:${COLS[stg]};stroke-width:1.2"/><text x="${f1(ap[0])}" y="${f1(by-62*bs-5)}" class="t-lbl t-mid" style="fill:${COLS[stg]}">${RG}</text>`;
    s+=`<text x="${bx}" y="${f1(by+62*bs+22)}" class="t-xs t-mid">${['dopamine, opioid peptides','CRF, dynorphin ↑ · dopamine ↓','glutamate projections'][stg]}</text>`;
    /* set-point chart */
    const gx0=N?40:420,gx1=N?380:700,gy=N?572:312,gh=N?34:26;
    s+=`<text x="${gx0}" y="${gy-gh-10}" class="t-xs" style="fill:var(--muted)">REWARD / MOOD LEVEL (allostasis model, schematic)</text>`;
    s+=`<line x1="${gx0}" x2="${gx1}" y1="${gy}" y2="${gy}" style="stroke:var(--muted);stroke-dasharray:3 4"/><text x="${gx1}" y="${gy-4}" class="t-xs t-end">original set point</text>`;
    s+=`<path d="${pathFn(u=>.5+lvl(u*t,mode)/2,gx0,gx0+(gx1-gx0)*t,gy+gh,gy-gh,90)}" style="fill:none;stroke:${COLS[stg]};stroke-width:2.6"/>`;
    for(let i=1;i<3;i++){const x=lerp(gx0,gx1,i/3);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${gy-gh}" y2="${gy+gh}" class="grid"/>`}
    cy.innerHTML=s;
    const P=BR_CY[stg];setC(stg);
    $('#brCyNote').innerHTML=noteHTML({k:P.k,t:P.t,txt:P.txt+' <b>'+(L?'Later:':'Early:')+'</b> '+(L?P.late:P.early),pt:P.pt,hook:P.hook});
  }
  const stopC=playWire(cr,$('#brCyPlay'),drawC,15000,'Replay','brain');
  setC=stepWire($('#brCySteps'),BR_CY,cr,drawC,stopC);
  $$('[data-brcy]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.brcy;$$('[data-brcy]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC(+cr.value)}));
  drawC(+cr.value);
};
/* =============== 1.4 Genes, family & risk =============== */
const GE_STEPS=[
 {from:0,at:.04,k:'Everyone',t:'Starting point: how common AUD is',
  txt:`Before family or genes, the baseline. In NESARC-III, a face-to-face survey of 36,309 US adults, 29.1% met DSM-5 criteria for alcohol use disorder at some point in life and 13.9% in the past 12 months. Mean age at onset was 26.2 years. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup> These are population statistics, not anyone's personal odds.`,
  pt:`Alcohol use disorder is common. Nearly 3 in 10 US adults have met the criteria at some point.`,
  hook:`NESARC-III (DSM-5): lifetime AUD 29.1%, 12-month 13.9%. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>`},
 {from:.14,at:.2,k:'A family',t:'It runs in families: nature and nurture',
  txt:`In a Swedish national study of 18,115 adoptees, AUD was predicted by AUD in biological parents (OR 1.46) and biological siblings (OR 1.94), who share genes, but also by AUD in adoptive parents (OR 1.40), who share only the home. Genetic and environmental risk added up. <sup class="c" data-ref="Kendler2015Adoption" title="Source 235">235</sup> Genetic risk reflects both a specific liability to AUD and a wider liability to externalising disorders: hence the half-shaded uncle. <sup class="c" data-ref="Kendler2015Adoption" title="Source 235">235</sup>`,
  pt:`Children of parents with AUD are at higher risk, partly through genes and partly through the home they grow up in. Higher risk is not certainty.`,
  hook:`Adoption design separates genes (biological relatives) from rearing (adoptive relatives): both raise risk. <sup class="c" data-ref="Kendler2015Adoption" title="Source 235">235</sup>`},
 {from:.28,at:.34,k:'Twins and adoptees',t:'About half of the risk is heritable',
  txt:`A meta-analysis of 12 twin and 5 adoption studies put the heritability of AUD at 0.49 (95% CI 0.43–0.53) and the shared environment at 0.10, with no difference by sex, design or assessment method. <span class="ev est">Established</span> <sup class="c" data-ref="Verhulst2015" title="Source 478">478</sup> The remaining share (here 41%, by subtraction) is environment unique to each person. Heritability describes variation in a population; it does not say what share of one person's disorder is "genetic".`,
  pt:`Genes explain about half of why some people develop AUD and others do not. The other half is life: experiences, surroundings and choices.`,
  hook:`AUD heritability ≈ <b>0.49</b>; shared environment ≈ 0.10 (Verhulst 2015 meta-analysis). <sup class="c" data-ref="Verhulst2015" title="Source 478">478</sup>`},
 {from:.44,at:.55,k:'Two famous variants',t:'When acetaldehyde builds up',
  txt:`ALDH2*2 is a dominant-negative variant: heterozygotes keep more than 100-fold less ALDH2 activity, so acetaldehyde piles up (5- to 20-fold higher in blood) and causes flushing, nausea and a fast heart rate. <sup class="c" data-ref="Brooks2009,Cederbaum2012" title="Source 50,59">50,59</sup> About 36% of East Asians flush. <sup class="c" data-ref="Brooks2009" title="Source 50">50</sup> ADH1B*2 makes acetaldehyde faster. One copy of either protected against alcohol dependence in Asian samples, independently of the other. <sup class="c" data-ref="Edenberg2007,Luczak2006" title="Source 96,301">96,301</sup> But heterozygotes who drink anyway have higher oesophageal cancer risk (OR 3.19), while homozygotes, who drink very little, have lower risk (OR 0.36): evidence that acetaldehyde is a carcinogen. <sup class="c" data-ref="Lewis2005" title="Source 285">285</sup>`,
  pt:`Some people's bodies clear acetaldehyde slowly. Drinking makes them flush and feel ill, which tends to protect them from AUD, but if they keep drinking their cancer risk rises.`,
  hook:`ALDH2*2 heterozygote + drinking → flush and <b>~3× oesophageal cancer</b> (OR 3.19). Same mechanism as disulfiram. <sup class="c" data-ref="Lewis2005,Cederbaum2012" title="Source 59,285">59,285</sup>`},
 {from:.64,at:.79,k:'Genome-wide association studies',t:'Bigger studies, more signals',
  txt:`Scanning the whole genome in very large samples finds many variants of tiny effect. 2019: 274,424 people in the Million Veteran Program, 18 loci. <sup class="c" data-ref="Kranzler2019" title="Source 259">259</sup> 2020: 435,563 people of European ancestry, 29 risk variants (19 new). <sup class="c" data-ref="Zhou2020NatNeurosci" title="Source 518">518</sup> 2023: 1,079,947 people across five ancestry groups, 110 variants. <sup class="c" data-ref="Zhou2023NatMed" title="Source 519">519</sup> ADH1B stands out in every scan. <sup class="c" data-ref="Walters2018" title="Source 488">488</sup> Drag through the step to watch the count grow.`,
  pt:`There is no single "alcohol gene". Hundreds of small genetic differences each nudge risk a tiny amount.`,
  hook:`GWAS loci: 18 (2019, n≈274k) → 29 (2020, n≈436k) → 110 (2023, n≈1.08 million). <sup class="c" data-ref="Kranzler2019,Zhou2020NatNeurosci,Zhou2023NatMed" title="Source 259,518,519">259,518,519</sup>`},
 {from:.86,at:.94,k:'The gap',t:'Missing heritability, and why a gene test cannot diagnose',
  txt:`Twin heritability (about 49%) is far higher than SNP heritability from common variants (6.8%), the "missing heritability" gap. <sup class="c" data-ref="Verhulst2015,Zhou2020NatNeurosci" title="Source 478,518">478,518</sup> Polygenic scores explained about 2.5–3.5% of the variance in AUD and added only slightly beyond age, sex and ancestry. <span class="ev est">Established</span> <sup class="c" data-ref="Barr2020" title="Source 32">32</sup> They are research tools, not diagnostic or screening tests.`,
  pt:`A genetic risk score cannot tell you whether you have, or will get, alcohol use disorder. Risk is not destiny.`,
  hook:`Polygenic scores: ~2.5–3.5% of AUD variance, "modest, at best". <sup class="c" data-ref="Barr2020" title="Source 32">32</sup>`}
];
const GE_STUDY=[{y:2019,n:'274,424',h:18,a:.64},{y:2020,n:'435,563',h:29,a:.705},{y:2023,n:'1,079,947',h:110,a:.765}];
function geFace(x,y,r,fl){return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.4"/>`+
  `<circle cx="${f1(x-r*.35)}" cy="${f1(y-r*.15)}" r="${f1(r*.08)}" style="fill:var(--ink)"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.15)}" r="${f1(r*.08)}" style="fill:var(--ink)"/>`+
  `<path d="M${f1(x-r*.3)} ${f1(y+r*.38)}q${f1(r*.3)} ${f1(fl>.5?-r*.08:r*.12)} ${f1(r*.6)} 0" style="fill:none;stroke:var(--ink);stroke-width:1.4;stroke-linecap:round"/>`+
  `<circle cx="${f1(x-r*.55)}" cy="${f1(y+r*.15)}" r="${f1(r*.26)}" style="fill:var(--glu-fill);opacity:${f1(fl*.85)}"/><circle cx="${f1(x+r*.55)}" cy="${f1(y+r*.15)}" r="${f1(r*.26)}" style="fill:var(--glu-fill);opacity:${f1(fl*.85)}"/>`}
const GE_F={fam:{s:.4,n:'family history',txt:'Adoptees with an affected biological parent had an OR of 1.46, a biological sibling 1.94, an adoptive parent 1.40. <sup class="c" data-ref="Kendler2015Adoption" title="Source 235">235</sup>'},
 early:{s:.3,n:'first drink before 14',txt:'Starting before 14 vs at 21 or older: HR 1.78 for lifetime dependence, adjusted for family history <sup class="c" data-ref="Hingson2006" title="Source 181">181</sup>; lifetime dependence fell from more than 40% with onset at 14 or younger to about 10% at 20 or older. <sup class="c" data-ref="GrantDawson1997" title="Source 149">149</sup> These links may partly reflect shared genetic or family risk rather than a pure cause.'},
 stress:{s:.2,n:'stress and trauma',txt:'In US veterans with lifetime PTSD the adjusted OR for AUD was 2.1 <sup class="c" data-ref="Smith2016PTSD" title="Source 438">438</sup>, but in the general NESARC-III sample 12-month AUD was not associated with 12-month PTSD after adjustment. <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup> In animals, stress systems (CRF) drive dependence-related drinking. <sup class="c" data-ref="HeiligKoob2007" title="Source 172">172</sup>'},
 price:{s:.3,n:'cheap, available alcohol',txt:'Across 112 studies, higher prices went with less drinking (elasticities −0.46 beer, −0.69 wine, −0.80 spirits) and less heavy drinking <sup class="c" data-ref="Wagenaar2009" title="Source 484">484</sup>; doubling alcohol tax was estimated to cut alcohol-related deaths by 35%. <sup class="c" data-ref="Wagenaar2010" title="Source 485">485</sup> Restricting outlet density and hours of sale prevents harm. <sup class="c" data-ref="Popova2009" title="Source 365">365</sup>'},
 flush:{s:-.55,n:'ALDH2*2 or ADH1B*2',txt:'One ALDH2*2 or one ADH1B*2 allele each protected against alcohol dependence in Asian samples; a second copy added no significant protection. <sup class="c" data-ref="Luczak2006" title="Source 301">301</sup> The protection depends on the setting: it weakened in Japan as drinking rose. <sup class="c" data-ref="Brooks2009" title="Source 50">50</sup>'}};

inits.genes=()=>{
  const svg=$('#geSvg'),rg=$('#geT');let setSt=()=>{};
  /* Manhattan points, fixed */
  const R=rng(2024),BG=[],HIT=[];
  for(let c=0;c<22;c++)for(let i=0;i<40;i++)BG.push([c,(i+R())/40,Math.min(6.5,-Math.log(1-R()*.999)*1.25)]);
  HIT.push([3,.42,17]);/* ADH1B on chromosome 4 */
  for(let i=1;i<110;i++)HIT.push([Math.floor(R()*22),.05+R()*.9,7.6+R()*4.5*(R()<.3?1.6:1)]);
  function hits(t){if(t<GE_STUDY[0].a)return 0;if(t<GE_STUDY[1].a)return 18;if(t<GE_STUDY[2].a)return 29;return Math.round(lerp(29,110,ramp(t,GE_STUDY[2].a,.84)))}
  function draw(t){
    const N=vb(svg,'720 390','400 580');let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    if(t<.42){
      /* ---- pedigree ---- */
      const dx=N?-20:0,P=(x,y)=>[x+dx,N?y*.86+6:y];const a2=ramp(t,.12,.18);
      const M=[[110,70,'m',1],[170,70,'f',0],[250,70,'m',0],[310,70,'f',0],[80,170,'m',.5],[150,170,'m',1],[250,170,'f',0],[320,170,'f',0],[175,270,'m',0],[230,270,'f',0]];
      const ln=(a,b,c,d)=>{const p=P(a,b),q=P(c,d);return `<line x1="${p[0]}" y1="${f1(p[1])}" x2="${q[0]}" y2="${f1(q[1])}" style="stroke:var(--ink);stroke-width:1.4"/>`};
      s+=ln(121,70,159,70)+ln(261,70,299,70)+ln(140,70,140,120)+ln(80,120,150,120)+ln(80,120,80,159)+ln(150,120,150,159)+ln(280,70,280,120)+ln(250,120,320,120)+ln(250,120,250,159)+ln(320,120,320,159)+ln(161,170,239,170)+ln(200,170,200,225)+ln(175,225,230,225)+ln(175,225,175,259)+ln(230,225,230,259);
      M.forEach(([x,y,sx,af],i)=>{const p=P(x,y);s+=ped(p[0],p[1],sx,af*a2,{r:12,proband:i===8})});
      const pp=P(175,270);s+=`<text x="${pp[0]}" y="${f1(pp[1]+30)}" class="t-xs t-mid">you?</text>`;
      ['I','II','III'].forEach((g,i)=>{const p=P(40,70+i*100);s+=`<text x="${p[0]}" y="${f1(p[1]+4)}" class="t-sm">${g}</text>`});
      const lg=P(40,330);s+=`<rect x="${lg[0]}" y="${f1(lg[1]-9)}" width="11" height="11" style="fill:var(--brand);stroke:var(--ink)"/><text x="${lg[0]+16}" y="${f1(lg[1])}" class="t-xs">AUD</text><rect x="${lg[0]+52}" y="${f1(lg[1]-9)}" width="11" height="11" style="fill:var(--panel);stroke:var(--ink)"/><rect x="${lg[0]+52}" y="${f1(lg[1]-9)}" width="5.5" height="11" style="fill:var(--ember)"/><text x="${lg[0]+68}" y="${f1(lg[1])}" class="t-xs">other substance use disorder</text>`;
      /* ---- bars ---- */
      const bx=N?30:400,bw=N?340:290;let y=N?330:44;
      const hb=(y,lab,v,col,txt)=>`<text x="${bx}" y="${y}" class="t-xs">${lab}</text><rect x="${bx}" y="${y+5}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+5}" width="${f1(bw*v)}" height="14" rx="4" style="fill:${col}"/><text x="${f1(bx+bw*v+5)}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${txt}</text>`;
      s+=`<text x="${bx}" y="${y-12}" class="t-sm" style="fill:var(--brand)">US ADULTS WITH AUD (NESARC-III)</text>`;
      s+=hb(y+4,'lifetime',.291,'var(--brand)','29.1%')+hb(y+36,'past 12 months',.139,'var(--brand)','13.9%');
      y+=N?90:104;
      if(t>=.12){const g=ramp(t,.12,.2),X=v=>bx+bw*v/2.5;s+=`<text x="${bx}" y="${y-8}" class="t-sm" style="fill:var(--ember)">ADOPTEES: ODDS RATIO FOR AUD</text>`;
        [['biological parent',1.46],['biological sibling',1.94],['adoptive parent',1.40]].forEach(([l,v],i)=>{const yy=y+6+i*(N?22:26);s+=`<text x="${bx}" y="${yy+10}" class="t-xs">${l}</text><rect x="${f1(X(0)+(N?110:120))}" y="${yy}" width="${f1((X(v)-X(0))*(N?.65:.6)*g)}" height="12" rx="3" style="fill:${i===2?'var(--thi-fill)':'var(--ember)'}"/><text x="${f1(X(0)+(N?110:120)+(X(v)-X(0))*(N?.65:.6)*g+5)}" y="${yy+10}" class="t-sm" style="fill:var(--ink)">${g>.95?v.toFixed(2):''}</text>`});
        const x1=X(0)+(N?110:120)+(X(1)-X(0))*(N?.65:.6);s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${y}" y2="${y+(N?70:82)}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(x1)}" y="${y+(N?80:94)}" class="t-xs t-mid">OR 1 = no difference</text>`}
      y+=N?100:126;
      if(t>=.26){const g=ramp(t,.26,.33),parts=[[.49,'var(--brand)','genes 49%'],[.10,'var(--thi-fill)','shared env. 10%'],[.41,'var(--panel-2)','unique env. (rest)']];let x=bx;
        s+=`<text x="${bx}" y="${y-8}" class="t-sm" style="fill:var(--brand)">SOURCES OF VARIATION IN RISK</text>`;
        parts.forEach(([v,c,l],i)=>{const w=bw*v*g;s+=`<rect x="${f1(x)}" y="${y}" width="${f1(Math.max(0,w-2))}" height="22" rx="4" style="fill:${c};stroke:var(--line)"/>`;if(g>.9)s+=`<text x="${f1(x+3)}" y="${y+36+(i===1?12:0)}" class="t-xs" style="fill:var(--ink)">${l}</text>`;x+=w})}
    }else if(t<.62){
      /* ---- acetaldehyde pools ---- */
      const u=ramp(t,.42,.6),eth=lerp(.85,.25,u);
      const rows=[{n:'ALDH2 *1/*1 · fully active',ac:.12+.1*bump(u,0,.6),ace:lerp(.1,.75,u),bl:0},{n:'ALDH2 *1/*2 · slow (dominant negative)',ac:lerp(.1,1,ramp(u,0,.7)),ace:lerp(.05,.25,u),bl:.9}];
      rows.forEach((r,i)=>{const y=N?40+i*190:40+i*150,x=N?14:40,w=N?280:430;
        s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:${i?'var(--glu)':'var(--gaba)'}">${r.n}</text>`;
        s+=pathway(x,y+8,w,{eth,acet:r.ac,ace:r.ace,block:r.bl}).svg;
        const fx=N?352:540,fy=y+34;s+=geFace(fx,fy,N?24:30,i?clamp(r.ac*1.1):0)+`<text x="${fx}" y="${fy+(N?40:48)}" class="t-xs t-mid">${i?(r.ac>.5?(N?'flushing':'flushing, nausea, fast heart'):'…'):'no flush'}</text>`});
      if(!N)s+=`<text x="${640}" y="${200}" class="t-sm t-mid" style="fill:var(--glu)">blood</text><text x="640" y="216" class="t-sm t-mid" style="fill:var(--glu)">acetaldehyde</text><text x="640" y="238" class="t-big t-mid" style="fill:var(--glu)">5–20×</text>`;
      const L=['About 36% of East Asians flush after drinking; ≥540 million people (≈8%) are ALDH2-deficient.','Oesophageal cancer vs *1/*1: OR 3.19 for *1/*2 (who can drink), 0.36 for *2/*2 (who rarely drink).'];
      const ly=N?440:338;
      if(N){const W=['About 36% of East Asians flush after','drinking; ≥540 million people (≈8%)','are ALDH2-deficient. Blood acetaldehyde','5–20× higher in carriers.','Oesophageal cancer vs *1/*1:','OR 3.19 for *1/*2 (can still drink)','OR 0.36 for *2/*2 (rarely drink)'];W.forEach((l,i)=>s+=`<text x="14" y="${ly+i*18}" class="t-sm" style="fill:${i>3?'var(--glu)':'var(--ink)'}">${l}</text>`)}
      else L.forEach((l,i)=>s+=`<text x="40" y="${ly+i*20}" class="t-sm" style="fill:${i?'var(--glu)':'var(--ink)'}">${l}</text>`);
    }else{
      /* ---- Manhattan sketch ---- */
      const x0=N?36:56,x1=N?388:704,y0=N?40:34,y1=N?300:230,ymax=18,X=(c,p)=>lerp(x0,x1,(c+p)/22),Y=v=>lerp(y1,y0,Math.min(v,ymax)/ymax),n=hits(t);
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/>`;
      BG.forEach(([c,p,v])=>s+=`<circle cx="${f1(X(c,p))}" cy="${f1(Y(v))}" r="1.6" style="fill:${c%2?'var(--gaba-fill)':'var(--brain-line)'};opacity:.6"/>`);
      HIT.slice(0,n).forEach(([c,p,v],i)=>{for(let k=0;k<5;k++){const vv=v*(1-k*.18);s+=`<circle cx="${f1(X(c,p)+(k%2?1.5:-1.5)*k*.4)}" cy="${f1(Y(vv))}" r="${i?2.2:2.6}" style="fill:${i?'var(--ember)':'var(--glu)'}"/>`}});
      if(n){const [c,p,v]=HIT[0];s+=`<text x="${f1(X(c,p)+6)}" y="${f1(Y(v)+4)}" class="t-lbl" style="fill:var(--glu)">ADH1B</text>`}
      const th=Y(7.3);s+=`<line x1="${x0}" x2="${x1}" y1="${f1(th)}" y2="${f1(th)}" style="stroke:var(--bad);stroke-dasharray:5 4"/><rect x="${x0+2}" y="${f1(th-14)}" width="112" height="12" rx="3" style="fill:var(--panel);opacity:.85"/><text x="${x0+4}" y="${f1(th-4)}" class="t-xs" style="fill:var(--bad)">genome-wide significance</text>`;
      for(let c=0;c<22;c+=N?3:1)s+=`<text x="${f1(X(c,.5))}" y="${y1+12}" class="t-xs t-mid">${c+1}</text>`;
      s+=`<text x="${x1}" y="${y1+25}" class="t-xs t-end">chromosome</text><text x="${x0-6}" y="${y0-8}" class="t-xs">−log10 p (sketch)</text>`;
      s+=`<text x="${x1}" y="${y0-8}" class="t-big t-end" style="fill:var(--ember)">${n} ${n===18?'loci':'variants'}</text>`;
      const by=N?350:272;
      if(t<.85){GE_STUDY.forEach((S,i)=>{const on=t>=S.a&&(i===2||t<GE_STUDY[i+1].a),w=N?112:200,bx=(N?14:56)+i*(w+(N?10:24));
          s+=`<rect x="${bx}" y="${by}" width="${w}" height="${N?78:70}" rx="10" style="fill:${on?'var(--brand-soft)':'var(--panel-2)'};stroke:${on?'var(--brand)':'var(--line)'}"/><text x="${bx+10}" y="${by+22}" class="t-lbl">${S.y}</text><text x="${bx+10}" y="${by+40}" class="t-xs">n = ${S.n}</text><text x="${bx+10}" y="${by+58}" class="t-sm" style="fill:var(--ember)">${S.h} ${i?'variants':'loci'}</text>`})}
      else{const g=ramp(t,.85,.92),bw=N?250:420,bx=N?120:250;[['twin/adoption heritability',.49,'49%','var(--brand)'],['SNP heritability (GWAS)',.068,'6.8%','var(--gaba-fill)'],['polygenic score: variance explained',.03,'2.5–3.5%','var(--ember)']].forEach(([l,v,txt,c],i)=>{const yy=by+i*(N?44:34);
          s+=`<text x="${N?14:56}" y="${yy+(N?0:12)}" class="t-xs">${l}</text><rect x="${bx}" y="${yy+(N?6:2)}" width="${f1(bw*v*g/.49*.8)}" height="14" rx="4" style="fill:${c}"/><text x="${f1(bx+bw*v*g/.49*.8+6)}" y="${yy+(N?17:13)}" class="t-sm" style="fill:var(--ink)">${txt}</text>`})}
    }
    svg.innerHTML=s;
    const ph=phaseOf(GE_STEPS,t);setSt(ph);$('#geNote').innerHTML=noteHTML(GE_STEPS[ph]);
  }
  const stop=playWire(rg,$('#gePlay'),draw,30000,'Replay','genes');
  setSt=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---- liability threshold ---- */
  const ls=$('#geLiab'),on={};
  const pdf=z=>Math.exp(-z*z/2);
  function liab(){const N=vb(ls,'720 260','400 300'),m=Object.keys(on).filter(k=>on[k]).reduce((a,k)=>a+GE_F[k].s,0);
    const x0=N?20:40,x1=N?380:680,yb=N?230:200,hh=N?160:150,Z0=-4,Z1=4.5,X=z=>lerp(x0,x1,(z-Z0)/(Z1-Z0)),TH=1.8;
    let s=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    const path=(mu,a,b)=>{let d='';for(let i=0;i<=120;i++){const z=lerp(a,b,i/120);d+=(i?'L':'M')+f1(X(z))+' '+f1(yb-hh*pdf(z-mu))}return d};
    s+=`<path d="${path(0,Z0,Z1)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4"/>`;
    s+=`<path d="${path(m,TH,Z1)}L${f1(X(Z1))} ${yb}L${f1(X(TH))} ${yb}Z" style="fill:var(--ember);opacity:.55"/>`;
    s+=`<path d="${path(m,Z0,Z1)}" style="fill:none;stroke:var(--brand);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(X(TH))}" x2="${f1(X(TH))}" y1="${yb-hh-10}" y2="${yb}" style="stroke:var(--bad);stroke-width:2"/><text x="${f1(X(TH)+6)}" y="${yb-hh-2}" class="t-xs" style="fill:var(--bad)">threshold</text>`;
    s+=`<text x="${f1(X(TH)+8)}" y="${yb-12}" class="t-xs" style="fill:var(--ink)">above the threshold</text>`;
    s+=`<text x="${x0}" y="${yb+18}" class="t-xs">lower liability</text><text x="${x1}" y="${yb+18}" class="t-xs t-end">higher liability</text>`;
    s+=`<text x="${x0}" y="${N?22:20}" class="t-xs">dashed: no influences switched on · solid: with the switches below</text>`;
    ls.innerHTML=s;
    const act=Object.keys(on).filter(k=>on[k]);
    $('#geLiabNote').innerHTML=noteHTML({k:act.length?act.length+' influence'+(act.length>1?'s':'')+' on':'Nothing switched on',
      t:m>.05?'The curve moves towards the threshold':m<-.05?'The curve moves away from the threshold':'The starting curve',
      txt:(act.length?act.map(k=>`<b>${GE_F[k].n}:</b> ${GE_F[k].txt}`).join(' '):'Switch on an influence to see it shift the curve.')+' The size of each shift here is drawn, not measured.',
      pt:`Genes and life add together. None of these makes alcohol use disorder certain, and none makes anyone immune.`,
      hook:`Liability-threshold model: many small genetic and environmental influences sum; the disorder appears past a threshold. Genetic and environmental risk act additively. <sup class="c" data-ref="Kendler2015Adoption" title="Source 235">235</sup>`});
  }
  $$('[data-gef]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.gef;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);liab()}));
  liab();
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();liab()};
};
/* =============== 2.1 Screening: AUDIT, AUDIT-C & brief intervention =============== */
/* WHO AUDIT zones as published (Babor & Robaina 2016) */
const SC_ZONES=[
 {n:'Zone I',lo:0,hi:7,what:'abstinence or lower-risk drinking',sw:'lower risk',sa:'Feedback',act:'Feedback',col:'var(--good)',soft:'var(--good-soft)'},
 {n:'Zone II',lo:8,hi:15,what:'hazardous use',sw:'hazardous use',sa:'Brief intervention',act:'Brief intervention',col:'var(--warn)',soft:'var(--warn-soft)'},
 {n:'Zone III',lo:16,hi:19,what:'harmful use',sw:'harmful use',sa:'BI, monitoring, diagnostic evaluation',act:'Brief intervention, monitoring, diagnostic evaluation',col:'var(--accent)',soft:'var(--accent-soft)'},
 {n:'Zone IV',lo:20,hi:40,what:'possible dependence',sw:'possible dependence',sa:'Referral to specialist treatment',act:'Referral to specialist treatment',col:'var(--bad)',soft:'var(--bad-soft)'}];
const scZone=v=>v>=20?3:v>=16?2:v>=8?1:0;
/* the illustrative person's item scores (made up for teaching; items 9 and 10 score 0, 2 or 4) */
const SC_DEMO=[3,2,2,1,2,0,2,1,2,2];
const SC_STEPS=[
 {from:0,at:.08,k:'Step 1 · Ask everyone',t:'Ask everyone',
  txt:`The USPSTF recommends screening adults 18 and over in primary care, including pregnant women, for unhealthy alcohol use: a spectrum from risky drinking to alcohol use disorder. Asking is not yet routine enough: in 2017 survey data from 13 US states and DC, 81.4% of adults had been asked about alcohol at a checkup, but only 37.8% about binge-level drinking, and only 20.1% of current binge drinkers were advised to cut down or quit. <sup class="c" data-ref="USPSTF2018Alcohol,McKnightEily2020MMWR" title="Source 324,470">324,470</sup>`,
  pt:`Doctors and nurses ask everyone about alcohol because problems are common and easy to miss. Being asked is routine, not an accusation.`,
  hook:`USPSTF 2018: screen adults 18+ (including pregnancy) and give brief counselling = grade B; adolescents 12–17 = I statement.`},
 {from:.2,at:.34,k:'Step 2 · Pre-screen',t:'Single question or AUDIT-C',
  txt:`A quick first screen sorts people. The NIAAA single question asks how many times in the past year a person had 5 (men) or 4 (women) or more drinks in a day; 1 or more is positive (sensitivity 81.8%, specificity 79.3% for unhealthy use). The AUDIT-C is the first three AUDIT items, 0–12, positive at ≥4 in men and ≥3 in women. Our illustrative person scores 7 and goes on; another person screens negative and gets feedback. <sup class="c" data-ref="Smith2009JGIM,Bradley2007AUDITC" title="Source 47,437">47,437</sup>`,
  pt:`One or three short questions decide whether a longer conversation is worth having.`,
  hook:`AUDIT-C maximum is 12. Positive: ≥4 men (0.86 / 0.89), ≥3 women (0.73 / 0.91) in primary care.`},
 {from:.4,at:.56,k:'Step 3 · Full AUDIT',t:'The 10-item AUDIT and its zones',
  txt:`The AUDIT came from a six-country WHO project. Its 10 items cover consumption (1–3), dependence symptoms (4–6) and harms (7–10), each scored 0–4, for a total of 0–40. WHO zones: 0–7 Zone I, 8–15 Zone II, 16–19 Zone III, 20–40 Zone IV. Watch the needle cross the zones as the items add up: this person totals 17, Zone III. The zones themselves rest on little validation. <sup class="c" data-ref="Saunders1993AUDIT,HigginsBiddle2018USAUDIT,Babor2016AUDITZones" title="Source 28,179,413">28,179,413</sup>`,
  pt:`The score is a guide to how much help to offer. It is not a diagnosis.`,
  hook:`AUDIT: 10 items, 0–40; ≥8 flags hazardous or harmful use. Zones 0–7 / 8–15 / 16–19 / 20–40.`},
 {from:.6,at:.72,k:'Step 4 · Brief intervention',t:'A short, structured conversation',
  txt:`For Zones II and III the WHO response is a brief intervention: usually feedback, information on the harms of drinking and the benefits of cutting down, advice, and a personal plan, in five or fewer sessions totalling under an hour. In 69 Cochrane trials, people drank on average about 20 g a week less after one year (95% CI −28 to −12) from a baseline of 244 g a week; the USPSTF review found −1.6 drinks a week and lower odds of exceeding limits (OR 0.60). <sup class="c" data-ref="Kaner2018Cochrane,OConnor2018JAMA,Babor2016AUDITZones" title="Source 28,220,349">28,220,349</sup>`,
  pt:`A short talk with a health worker helps many people drink less, on average. It is a group result, not a promise for any one person.`,
  hook:`Brief intervention: about −20 g/week at 1 year (Cochrane) or −1.6 drinks/week (USPSTF review); ≤5 sessions, &lt;60 minutes in total.`},
 {from:.8,at:.96,k:'Step 5 · Referral to treatment',t:'Zone IV and the weakest link',
  txt:`A second illustrative person totals 23, Zone IV: possible dependence, so the published response is referral for diagnostic evaluation and specialist treatment. A high score or any dependence symptom means an assessment is needed, not that AUD is present. Referral is the weakest link of SBIRT: across 9 trials, brief interventions did not increase the use of specialty alcohol services (RR 1.08, 95% CI 0.92–1.28). <sup class="c" data-ref="Babor2016AUDITZones,HigginsBiddle2018USAUDIT,Babor2007SBIRT,Glass2015Referral" title="Source 27,28,141,179">27,28,141,179</sup>`,
  pt:`A high score means "let's look more closely together". Getting from a referral to actual care is where many people are lost.`,
  hook:`SBIRT = Screening, Brief Intervention, Referral to Treatment. Brief intervention does not reliably raise specialty-care uptake.`}];
/* AUDIT items: stems shortened, answer options and points as published (Saunders 1993) */
const SC_FREQ=['Never','Less than monthly','Monthly','Weekly','Daily or almost daily'];
const SC_YN=[['No',0],['Yes, but not in the last year',2],['Yes, during the last year',4]];
const SC_ITEMS=[
 {d:'Consumption',q:'How often do you have a drink containing alcohol?',o:['Never','Monthly or less','2–4 times a month','2–3 times a week','4 or more times a week']},
 {q:'How many drinks containing alcohol on a typical day when drinking?',o:['1 or 2','3 or 4','5 or 6','7 to 9','10 or more']},
 {q:'How often six or more drinks on one occasion?',o:SC_FREQ},
 {d:'Dependence symptoms',q:'In the last year, how often unable to stop drinking once started?',o:SC_FREQ},
 {q:'In the last year, how often failed to do what was normally expected because of drinking?',o:SC_FREQ},
 {q:'In the last year, how often needed a first drink in the morning to get going after heavy drinking?',o:SC_FREQ},
 {d:'Harms',q:'In the last year, how often a feeling of guilt or remorse after drinking?',o:SC_FREQ},
 {q:'In the last year, how often unable to remember the night before because of drinking?',o:SC_FREQ},
 {q:'Have you or someone else been injured because of your drinking?',yn:true},
 {q:'Has a relative, friend, doctor or other health worker been concerned about your drinking or suggested cutting down?',yn:true}];
/* screening tools: sensitivity / specificity as published, each against its own reference standard */
const SC_TOOLS=[
 {id:'acm',n:'AUDIT-C ≥4 (men)',se:.86,sp:.89,tgt:'alcohol misuse, primary care',c:'<sup class="c" data-ref="Bradley2007AUDITC" title="Source 47">47</sup>'},
 {id:'acw',n:'AUDIT-C ≥3 (women)',se:.73,sp:.91,tgt:'alcohol misuse, primary care',c:'<sup class="c" data-ref="Bradley2007AUDITC" title="Source 47">47</sup>'},
 {id:'sq',n:'Single question',se:.818,sp:.793,tgt:'unhealthy alcohol use, primary care',c:'<sup class="c" data-ref="Smith2009JGIM" title="Source 437">437</sup>'},
 {id:'sqa',n:'Single question for AUD',se:.879,sp:.668,tgt:'current alcohol use disorder, primary care',c:'<sup class="c" data-ref="Smith2009JGIM" title="Source 437">437</sup>'},
 {id:'cage',n:'CAGE ≥2',se:.71,sp:.90,tgt:'abuse or dependence, medical, surgical and psychiatric settings',c:'<sup class="c" data-ref="Dhalla2007CAGE" title="Source 86">86</sup>'},
 {id:'crafft',n:'CRAFFT ≥2 (age 14–18)',se:.76,sp:.94,tgt:'any alcohol or drug problem, adolescent clinic',c:'<sup class="c" data-ref="Knight2002CRAFFT" title="Source 248">248</sup>'},
 {id:'preg',n:'AUDIT-C ≥3 (pregnancy)',se:.96,sp:.71,tgt:'alcohol use disorder in pregnancy',c:'<sup class="c" data-ref="Burns2010Pregnancy" title="Source 52">52</sup>'}];

inits.screening=()=>{
  const svg=$('#scSvg'),rg=$('#scT'),note=$('#scNote');
  const box=(x,y,w,h,t1,t2,on,col)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?(col||'var(--dx)'):'var(--line)'};stroke-width:${on?2:1.2}"/><text x="${f1(x+w/2)}" y="${f1(y+h/2-3)}" class="t-lbl t-mid">${t1}</text><text x="${f1(x+w/2)}" y="${f1(y+h/2+12)}" class="t-xs t-mid">${t2}</text>`;
  const arrow=(x0,y0,x1,y1,lab,on,ly)=>`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" class="arrow" style="${on?'stroke:var(--dx);stroke-width:2.2':''}" marker-end="url(#scA)"/>${lab?`<text x="${f1((x0+x1)/2)}" y="${f1(ly==null?(y0+y1)/2-5:ly)}" class="t-xs t-mid" style="${on?'fill:var(--dx)':''}">${lab}</text>`:''}`;
  const token=(x,y,col,lab)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="16" style="fill:var(--panel);stroke:${col};stroke-width:2.2"/>${person(x,y-11,22,col)}${lab?`<text x="${f1(x)}" y="${f1(y-21)}" class="t-xs t-mid" style="fill:${col};font-weight:600">${lab}</text>`:''}`;
  const along=(P,u)=>{/* position along a polyline of waypoints, u in 0..1 */
    const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}
    let s=clamp(u)*tot;for(let i=0;i<L.length;i++){if(s<=L[i]||i===L.length-1){const k=L[i]?clamp(s/L[i]):0;return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}s-=L[i]}return P[P.length-1]};
  function layout(N){
    if(N)return {A:[14,10,372,40],B:[14,66,226,46],Neg:[258,66,128,46],C:[14,128,226,46],Z:[0,1,2,3].map(i=>[14,190+i*40,372,34]),P:[14,358,372,194],nar:true};
    return {A:[10,54,108,56],B:[134,54,136,56],Neg:[134,140,136,50],C:[318,54,104,56],Z:[0,1,2,3].map(i=>[444,14+i*47,264,40]),P:[14,214,692,156],nar:false}}
  const ctr=r=>[r[0]+r[2]/2,r[1]+r[3]/2];
  /* where a token waits at a node: above it on wide stages, at its left end on phones; at a zone's right end */
  const way=(r,N)=>N?[r[0]+22,r[1]+r[3]/2]:[r[0]+r[2]/2,r[1]-18],wayZ=(r,N)=>N?[r[0]+24,r[1]+r[3]/2]:[r[0]+r[2]-22,r[1]+r[3]/2];
  /* the lower panel, one view per step */
  function panel(L,p,t){const [x,y,w,h]=L.P,N=L.nar;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const title=tx=>`<text x="${x+14}" y="${y+20}" class="t-sm" style="fill:var(--dx);font-weight:600">${tx}</text>`;
    if(p===0){s+=title(N?'THE SCREENING GAP · US, 2017':'THE SCREENING GAP · 13 US STATES AND DC, 2017');
      const rows=[['Asked about alcohol at a checkup (past 2 years)',81.4],['Asked about binge-level drinking',37.8],['Binge drinkers advised to cut down or quit',20.1]],g=ramp(t,.02,.16);
      rows.forEach(([lab,v],i)=>{const ry=y+(N?44:42)+i*(N?50:36),bx=x+14,bw=w-(N?84:300),lx=N?bx:x+w-276;
        if(N)s+=`<text x="${bx}" y="${ry}" class="t-xs">${lab}</text>`;else s+=`<text x="${x+w-14}" y="${ry+11}" class="t-xs t-end">${lab}</text>`;
        const by=N?ry+6:ry;s+=`<rect x="${bx}" y="${by}" width="${f1(bw)}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*v/100*g)}" height="14" rx="7" style="fill:var(--dx);opacity:${i?.6:.9}"/><text x="${f1(bx+bw+8)}" y="${by+11.5}" class="t-lbl">${f1(v*g)}%</text>`});
      s+=`<text x="${x+14}" y="${y+h-10}" class="t-xs">${N?'Age-standardised survey estimates.':'Age-standardised survey estimates; BRFSS 2017.'}</text>`}
    else if(p===1){s+=title('PRE-SCREEN');
      const hx=N?x+14:x+14,hy=y+40,cw=N?w-28:w/2-28;
      s+=`<text x="${hx}" y="${hy}" class="t-lbl">Single question (NIAAA)</text>`;
      const q=N?['“How many times in the past year have you had','5 (men) / 4 (women) or more drinks in a day?”']:['“How many times in the past year have you had','5 (men) / 4 (women) or more drinks in a day?”'];
      q.forEach((l,i)=>s+=`<text x="${hx}" y="${hy+17+i*13}" class="t-xs">${l}</text>`);
      s+=`<text x="${hx}" y="${hy+52}" class="t-xs" style="fill:var(--dx);font-weight:600">1 or more = positive · sens 81.8% · spec 79.3%</text>`;
      const ax=N?x+14:x+w/2+10,ay=N?y+110:y+40,aw=N?w-28:w/2-34,v=7*ramp(t,.22,.32),X=k=>ax+aw*k/12;
      s+=`<text x="${ax}" y="${ay}" class="t-lbl">AUDIT-C (items 1–3), 0–12</text>`;
      for(let k=0;k<12;k++)s+=`<rect x="${f1(X(k)+1)}" y="${ay+14}" width="${f1(aw/12-2)}" height="16" rx="3" style="fill:${k<v?'var(--dx)':'var(--panel-2)'};opacity:${k<v?.85:1}"/>`;
      for(let k=0;k<=12;k+=3)s+=`<text x="${f1(X(k))}" y="${ay+44}" class="t-xs t-mid">${k}</text>`;
      [[3,'women ≥3'],[4,'men ≥4']].forEach(([c,l],i)=>s+=`<line x1="${f1(X(c))}" x2="${f1(X(c))}" y1="${ay+10}" y2="${ay+34}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(X(c)+(i?4:-4))}" y="${ay+58}" class="t-xs ${i?'':'t-end'}" style="fill:var(--ink)">${l}</text>`);
      s+=`<text x="${ax}" y="${ay+76}" class="t-xs" style="fill:var(--dx);font-weight:600">This person: ${Math.round(v)} / 12${v>=6.9?' → positive, go on to the full AUDIT':''}</text>`}
    else if(p===2){s+=title('FULL AUDIT · ITEM BY ITEM');
      const k=ramp(t,.42,.56)*10,tot=SC_DEMO.reduce((a,b,i)=>a+(i<Math.floor(k)?b:0),0)+(Math.floor(k)<10?SC_DEMO[Math.floor(k)]*(k-Math.floor(k)):0);
      const bx=x+14,bw=N?(w-28)/10:300/10,by=y+38,bh=46;
      SC_DEMO.forEach((v,i)=>{const cx=bx+i*bw,fl=clamp(k-i),dom=i<3?'var(--dx)':i<6?'var(--accent)':'var(--warn)';
        s+=`<rect x="${f1(cx+2)}" y="${by}" width="${f1(bw-4)}" height="${bh}" rx="4" style="fill:var(--panel);stroke:var(--line)"/>`;
        if(fl>0)s+=`<rect x="${f1(cx+2)}" y="${f1(by+bh-bh*v/4*fl)}" width="${f1(bw-4)}" height="${f1(bh*v/4*fl)}" rx="4" style="fill:${dom};opacity:.75"/>`;
        s+=`<text x="${f1(cx+bw/2)}" y="${by+bh+13}" class="t-xs t-mid">${i+1}</text>`;
        if(fl>=1)s+=`<text x="${f1(cx+bw/2)}" y="${by-4}" class="t-xs t-mid" style="fill:var(--ink)">${v}</text>`});
      [[0,3,'consumption','var(--dx)'],[3,6,'dependence','var(--accent)'],[6,10,'harms','var(--warn)']].forEach(([a,b,l,c])=>s+=`<text x="${f1(bx+(a+b)/2*bw)}" y="${by+bh+27}" class="t-xs t-mid" style="fill:${c}">${l}</text>`);
      const zx=N?x+14:x+352,zy=N?y+132:y+52,zw=N?w-28:w-372,Z=v=>zx+zw*v/40;
      SC_ZONES.forEach((z,i)=>{s+=`<rect x="${f1(Z(z.lo))}" y="${zy}" width="${f1(Z(z.hi+(i<3?1:0))-Z(z.lo))}" height="18" style="fill:${z.col};opacity:${scZone(tot)===i?.85:.28}"/><text x="${f1((Z(z.lo)+Z(Math.min(z.hi+1,40)))/2)}" y="${zy+32}" class="t-xs t-mid" style="fill:${z.col}">${N&&i===0?'I':N?['I','II','III','IV'][i]:z.n}</text>`});
      [0,8,16,20,40].forEach(v=>s+=`<text x="${f1(Z(v))}" y="${zy-5}" class="t-xs t-mid">${v}</text>`);
      const nx=Z(tot);s+=`<path d="M${f1(nx)} ${zy+20}l-6 10h12Z" style="fill:var(--ink)"/>`;
      s+=`<text x="${zx}" y="${zy+(N?50:62)}" class="t-lbl">Total ${Math.round(tot)} / 40 · ${SC_ZONES[scZone(tot)].n}: ${SC_ZONES[scZone(tot)].what}</text>`}
    else if(p===3){s+=title('BRIEF INTERVENTION · WHAT IT USUALLY CONTAINS');
      const parts=['Feedback','Harms and benefits','Advice','A personal plan'],g=ramp(t,.6,.7);
      parts.forEach((pp,i)=>{const on=g*4>i,cx=N?x+14+(i%2)*((w-28)/2):x+14+i*140,cy=N?y+34+Math.floor(i/2)*30:y+34,cw=N?(w-28)/2-8:130;
        s+=`<rect x="${f1(cx)}" y="${cy}" width="${f1(cw)}" height="24" rx="12" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'}"/><text x="${f1(cx+cw/2)}" y="${cy+16}" class="t-xs t-mid" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:600">${pp}</text>`});
      const bx=N?x+14:x+14,by=N?y+108:y+84,bw=N?w-100:w-420,G=v=>bw*v/260,e=ramp(t,.62,.7);
      s+=`<text x="${bx}" y="${by-6}" class="t-xs">Grams of ethanol a week, trial averages (Cochrane, 1 year)</text>`;
      s+=`<rect x="${bx}" y="${by}" width="${f1(G(244))}" height="16" rx="4" style="fill:var(--muted);opacity:.45"/><text x="${f1(bx+G(244)+6)}" y="${by+12}" class="t-xs" style="fill:var(--ink)">244 g baseline</text>`;
      const after=244-20*e;s+=`<rect x="${bx}" y="${by+24}" width="${f1(G(after))}" height="16" rx="4" style="fill:var(--dx);opacity:.8"/><text x="${f1(bx+G(after)+6)}" y="${by+36}" class="t-xs" style="fill:var(--dx);font-weight:600">−${Math.round(20*e)} g</text>`;
      s+=`<line x1="${f1(bx+G(244-28))}" x2="${f1(bx+G(244-12))}" y1="${by+48}" y2="${by+48}" style="stroke:var(--dx);stroke-width:2"/><text x="${f1(bx+G(244-20))}" y="${by+60}" class="t-xs t-mid">95% CI −28 to −12</text>`;
      if(!N){const rx=x+w-300;[['−1.6 drinks / week','USPSTF review, 6–12 months'],['OR 0.60','exceeding recommended limits'],['OR 2.26','reported abstinence in pregnancy']].forEach(([a,b],i)=>{s+=`<text x="${rx}" y="${y+92+i*24}" class="t-lbl" style="fill:var(--dx);opacity:${f1(ramp(t,.68+i*.02,.74+i*.02))}">${a}</text><text x="${rx+128}" y="${y+92+i*24}" class="t-xs" style="opacity:${f1(ramp(t,.68+i*.02,.74+i*.02))}">${b}</text>`})}
      else s+=`<text x="${x+14}" y="${y+h-12}" class="t-xs" style="fill:var(--dx)">USPSTF review: −1.6 drinks/week; OR 0.60 over limits</text>`}
    else {s+=title(N?'REFERRAL · SPECIALTY CARE USE':'REFERRAL · DO BRIEF INTERVENTIONS INCREASE SPECIALTY CARE USE?');
      const fx=x+(N?24:60),fw=w-(N?48:120),fy=y+(N?78:70),R=v=>fx+fw*(Math.log(v)-Math.log(.5))/(Math.log(2)-Math.log(.5)),g=ramp(t,.84,.94);
      s+=`<line x1="${fx}" x2="${fx+fw}" y1="${fy+26}" y2="${fy+26}" class="axis"/>`;
      [.5,1,2].forEach(v=>s+=`<line x1="${f1(R(v))}" x2="${f1(R(v))}" y1="${fy+22}" y2="${fy+30}" class="axis"/><text x="${f1(R(v))}" y="${fy+42}" class="t-xs t-mid">${v}</text>`);
      s+=`<line x1="${f1(R(1))}" x2="${f1(R(1))}" y1="${fy-22}" y2="${fy+26}" style="stroke:var(--ink);stroke-dasharray:3 3"/>`;
      s+=`<text x="${f1(R(.5)+4)}" y="${fy-26}" class="t-xs">fewer referrals used</text><text x="${f1(R(2)-4)}" y="${fy-26}" class="t-xs t-end">more used</text>`;
      if(g>0){s+=`<line x1="${f1(R(1.08)+(R(.92)-R(1.08))*g)}" x2="${f1(R(1.08)+(R(1.28)-R(1.08))*g)}" y1="${fy}" y2="${fy}" style="stroke:var(--dx);stroke-width:2.4"/><rect x="${f1(R(1.08)-6)}" y="${fy-6}" width="12" height="12" style="fill:var(--dx)"/>`;
        s+=`<text x="${f1(R(1.08))}" y="${fy-12}" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">RR 1.08 (0.92–1.28)</text>`}
      s+=`<text x="${x+14}" y="${y+h-(N?30:12)}" class="t-xs">${N?'9 RCTs: the interval crosses 1, so no':'9 RCTs pooled: the interval crosses 1, so no evidence that brief intervention increases specialty-care use.'}</text>`;
      if(N)s+=`<text x="${x+14}" y="${y+h-16}" class="t-xs">evidence of more specialty-care use.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 560'),L=layout(N),p=phaseOf(SC_STEPS,t);setSt(p);note.innerHTML=noteHTML(SC_STEPS[p]);
    let s=`<defs>${marker('scA','var(--muted)')}</defs>`;
    const A=ctr(L.A),B=ctr(L.B),Ng=ctr(L.Neg),C=ctr(L.C),Zc=L.Z.map(ctr);
    /* score of the main token */
    const k=ramp(t,.42,.56)*10,tot=SC_DEMO.reduce((a,b,i)=>a+(i<Math.floor(k)?b:0),0);
    const zMain=t>=.56?2:-1,z2=t>=.88?3:-1;
    /* nodes and arrows */
    s+=box(...L.A,N?'Everyone 18+ in primary care':'Everyone 18+',N?'everyone is asked about alcohol':'all are asked',p===0);
    s+=box(...L.B,'Pre-screen',N?'single question or AUDIT-C':'single Q or AUDIT-C',p===1);
    s+=box(...L.Neg,'Negative','feedback, rescreen',t>=.28&&t<.4);
    s+=box(...L.C,'Full AUDIT','10 items, 0–40',p===2||(t>=.8&&t<.9));
    if(N){s+=arrow(A[0],L.A[1]+L.A[3],A[0],L.B[1]-2,'',p<=1);s+=arrow(L.B[0]+L.B[2],B[1],L.Neg[0]-2,Ng[1],'',t>=.28&&t<.4);
      s+=arrow(B[0]-60,L.B[1]+L.B[3],B[0]-60,L.C[1]-2,'',p===1||p===2);s+=`<text x="${f1(B[0]-54)}" y="${L.C[1]-5}" class="t-xs">positive</text>`;
      s+=arrow(C[0],L.C[1]+L.C[3],C[0],L.Z[0][1]-2,'',p>=2)}
    else{s+=arrow(L.A[0]+L.A[2],A[1],L.B[0]-2,B[1],'',p<=1);s+=arrow(B[0],L.B[1]+L.B[3],B[0],L.Neg[1]-2,'',t>=.28&&t<.4);s+=`<text x="${f1(B[0]-6)}" y="${L.B[1]+L.B[3]+20}" class="t-xs t-end">negative</text>`;
      s+=arrow(L.B[0]+L.B[2],B[1],L.C[0]-2,C[1],'positive',p===1||p===2,B[1]+16);
      Zc.forEach((z,i)=>s+=arrow(L.C[0]+L.C[2],C[1],L.Z[i][0]-2,z[1],'',(zMain===i&&t<.8)||z2===i))}
    /* zone boxes */
    SC_ZONES.forEach((z,i)=>{const [zx,zy,zw,zh]=L.Z[i],on=(zMain===i&&t<.8)||z2===i;
      s+=`<rect x="${zx}" y="${zy}" width="${zw}" height="${zh}" rx="8" style="fill:${on?z.soft:'var(--panel)'};stroke:${z.col};stroke-width:${on?2.2:1};opacity:${on?1:.85}"/>`;
      s+=`<rect x="${zx}" y="${zy}" width="6" height="${zh}" rx="3" style="fill:${z.col}"/>`;
      s+=`<text x="${zx+(N?48:14)}" y="${zy+(N?14:16)}" class="t-lbl" style="font-size:12px;fill:${z.col}">${z.n} · ${z.lo}–${z.hi} · ${z.sw}</text>`;
      s+=`<text x="${zx+(N?48:14)}" y="${zy+(N?28:31)}" class="t-xs" style="${on?'fill:var(--ink);font-weight:600':''}">${z.sa}</text>`});
    /* tokens: the main person, a person who screens negative, and a second person who scores in Zone IV */
    const wA=way(L.A,N),wB=way(L.B,N),wN=way(L.Neg,N),wC=way(L.C,N),z3=wayZ(L.Z[2],N),z4=wayZ(L.Z[3],N);let mp;
    if(t<.2)mp=wA;else if(t<.3)mp=along([wA,wB],ramp(t,.2,.3));else if(t<.38)mp=wB;else if(t<.42)mp=along([wB,wC],ramp(t,.38,.42));else if(t<.56)mp=wC;
    else mp=along([wC,z3],ramp(t,.56,.62));
    const lab=t<.3?'':t<.42?'AUDIT-C 7':t<.56?`AUDIT ${tot}`:'AUDIT 17';
    if(t>=.22&&t<.5){const np=t<.3?along([wA,wB],ramp(t,.22,.3)):(N?along([wB,wN],ramp(t,.3,.36)):along([wB,[L.B[0]+L.B[2]+24,wB[1]],[L.B[0]+L.B[2]+24,L.Neg[1]+L.Neg[3]/2]],ramp(t,.3,.36)));s+=token(np[0],np[1],'var(--muted)','')}
    if(t>=.8){const q=t<.86?along([wA,wB,wC],ramp(t,.8,.86)):along([wC,z4],ramp(t,.86,.9));s+=token(q[0],q[1],'var(--bad)',t>=.86&&!N?'AUDIT 23':'')}
    s+=token(mp[0],mp[1],'var(--dx)',N?'':lab);
    s+=panel(L,p,t);
    svg.innerHTML=s}
  const stop=playWire(rg,$('#scPlay'),draw,26000,'Replay','screening');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- AUDIT teaching calculator ---------- */
  const qb=$('#scQ'),cs=$('#scCalcSvg'),cn=$('#scCalcNote');let sex=store.get('sc:sex','m');
  qb.innerHTML=SC_ITEMS.map((it,i)=>{const opts=it.yn?SC_YN:it.o.map((o,j)=>[o,j]);
    return `${it.d?`<p class="scdom">${it.d} · items ${i+1}–${i===0?3:i===3?6:10}</p>`:''}<label for="scI${i}"><span>${i+1}. ${it.q}</span><select id="scI${i}" data-sci="${i}">${opts.map(([o,v])=>`<option value="${v}">${o} (${v})</option>`).join('')}</select></label>`}).join('');
  function calc(){const v=SC_ITEMS.map((_,i)=>+$('#scI'+i).value),tot=v.reduce((a,b)=>a+b,0),ac=v[0]+v[1]+v[2],z=scZone(tot),Z=SC_ZONES[z],cut=sex==='m'?4:3,pos=ac>=cut,dep=v[3]+v[4]+v[5]>0;
    const N=vb(cs,'720 150','400 150');const x0=N?16:30,x1=N?384:690,X=s=>lerp(x0,x1,s/40);let s='';
    s+=`<text x="${x0}" y="16" class="t-sm" style="fill:var(--dx);font-weight:600">AUDIT TOTAL ${tot} / 40</text>`;
    SC_ZONES.forEach((zz,i)=>{const a=X(zz.lo),b=X(i<3?zz.hi+1:40);s+=`<rect x="${f1(a)}" y="26" width="${f1(b-a)}" height="22" style="fill:${zz.col};opacity:${i===z?.85:.25}"/><text x="${f1((a+b)/2)}" y="62" class="t-xs t-mid" style="fill:${zz.col};font-weight:${i===z?700:500}">${N?['I','II','III','IV'][i]:zz.n}</text>`});
    [0,8,16,20,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${N?76:76}" class="t-xs t-mid">${v}</text>`);
    s+=`<path d="M${f1(X(tot))} 50l-6 9h12Z" style="fill:var(--ink)"/><line x1="${f1(X(tot))}" x2="${f1(X(tot))}" y1="22" y2="50" style="stroke:var(--ink);stroke-width:2"/>`;
    const ay=N?112:104,aw=N?(x1-x0):(x1-x0)*.5,A=s2=>x0+aw*s2/12;
    s+=`<text x="${x0}" y="${ay-8}" class="t-sm" style="fill:var(--dx);font-weight:600">AUDIT-C ${ac} / 12 · ${pos?'positive':'negative'} at ≥${cut}</text>`;
    for(let k=0;k<12;k++)s+=`<rect x="${f1(A(k)+1)}" y="${ay}" width="${f1(aw/12-2)}" height="14" rx="3" style="fill:${k<ac?'var(--dx)':'var(--panel-2)'}"/>`;
    s+=`<line x1="${f1(A(cut))}" x2="${f1(A(cut))}" y1="${ay-4}" y2="${ay+18}" style="stroke:var(--ink);stroke-width:1.8;stroke-dasharray:3 2"/><text x="${f1(A(cut))}" y="${ay+30}" class="t-xs t-mid" style="fill:var(--ink)">${sex==='m'?'men ≥4':'women ≥3'}</text>`;
    if(!N){const dx=x0+aw+30;[['Consumption (1–3)',ac,12],['Dependence (4–6)',v[3]+v[4]+v[5],12],['Harms (7–10)',v[6]+v[7]+v[8]+v[9],16]].forEach(([l,val,mx],i)=>{const yy=ay-8+i*18;s+=`<text x="${dx}" y="${yy+8}" class="t-xs">${l}</text><rect x="${dx+124}" y="${yy}" width="120" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${dx+124}" y="${yy}" width="${f1(120*val/mx)}" height="9" rx="4.5" style="fill:var(--dx);opacity:.75"/><text x="${dx+252}" y="${yy+8}" class="t-xs">${val}/${mx}</text>`})}
    cs.innerHTML=s;
    cn.innerHTML=`<div class="kicker">Teaching result · not a diagnosis</div><div class="scread"><span class="scbig">${tot}</span><b style="color:${Z.col}">${Z.n} (${Z.lo}–${Z.hi}): ${Z.what}</b></div>
      <p><b>Published zone response:</b> ${Z.act.toLowerCase()}. ${z>=2?'Validation of the zones is limited: in 625 primary care patients the Zone III and IV cut-offs were 100% specific but very insensitive (men 0.16 and 0.06). ':''}<sup class="c" data-ref="Babor2016AUDITZones" title="Source 28">28</sup></p>
      <p><b>AUDIT-C ${ac}/12</b> is ${pos?'positive':'negative'} at the ${sex==='m'?'men’s ≥4':'women’s ≥3'} cut-off. Higher AUDIT-C scores mean a higher probability of dependence, but even a positive screen leaves wide uncertainty and needs a diagnostic assessment. <sup class="c" data-ref="Bradley2007AUDITC,Rubinsky2010AUDITZones" title="Source 47,405">47,405</sup></p>
      ${dep||tot>=20?`<div class="verdict maybe">${dep?'A dependence item (4–6) is endorsed':'The total is 20 or more'}: in practice this signals that a diagnostic assessment is needed. It does not mean alcohol use disorder is present. <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup></div>`:''}
      <div class="pt"><b>In plain words</b>A screening score only says “let's talk more”. If you are worried about your drinking or someone else's, talk with a health professional. <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup></div>
      <div class="hook"><b>Exam hook</b>Each item scores 0–4 (items 9 and 10 only 0, 2 or 4), total 0–40. The AUDIT assumes a 10 g drink; the US drink is 14 g. <sup class="c" data-ref="Saunders1993AUDIT,HigginsBiddle2018USAUDIT" title="Source 179,413">179,413</sup></div>`}
  const setSex=v=>{sex=v;store.set('sc:sex',v);$$('[data-scsex]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.scsex===v));calc()};
  $$('[data-scsex]').forEach(b=>b.addEventListener('click',()=>setSex(b.dataset.scsex)));
  qb.addEventListener('change',calc);
  $('#scReset').addEventListener('click',()=>{SC_ITEMS.forEach((_,i)=>$('#scI'+i).selectedIndex=0);calc()});
  setSex(sex==='f'?'f':'m');

  /* ---------- icon array comparator ---------- */
  const ic=$('#scIcon'),pv=$('#scPrev'),inote=$('#scIconNote');let tool=store.get('sc:tool','acm');if(!SC_TOOLS.some(x=>x.id===tool))tool='acm';
  $('#scTools').innerHTML='<span class="kicker">Tool</span>'+SC_TOOLS.map(x=>`<button class="btn" data-sctool="${x.id}" aria-pressed="${x.id===tool}">${x.n}</button>`).join('');
  let stopI=null,shown=null;
  function counts(T,prev){const pos=Math.round(prev*100),tp=Math.round(pos*T.se),fp=Math.round((100-pos)*(1-T.sp));return {pos,tp,fn:pos-tp,fp,tn:100-pos-fp}}
  function drawI(c,T){const N=vb(ic,'720 330','400 600');let s='';
    const cols=10,gw=N?36:30,gh=N?36:30,gx=N?20:24,gy=N?36:30;
    s+=`<text x="${gx}" y="${gy-12}" class="t-sm" style="fill:var(--dx);font-weight:600">${T.n.toUpperCase()} · 100 PEOPLE</text>`;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),cc=i%cols,x=gx+cc*gw+gw/2,y=gy+r*gh+3;
      const has=i<c.pos,tp=has&&i<c.tp,fp=!has&&i<c.pos+c.fp;
      const col=tp?'var(--dx)':has?'var(--dx)':fp?'var(--warn)':'var(--muted)';
      if(has&&!tp)s+=`<circle cx="${f1(x)}" cy="${f1(y+12)}" r="${f1(gw*.42)}" style="fill:none;stroke:var(--dx);stroke-width:1.6;stroke-dasharray:3 2"/>`;
      s+=person(x,y,gh*.78,col,{op:tp||fp?1:has?.35:.28})}
    const lx=N?20:gx+cols*gw+28,ly=N?gy+10*gh+18:gy+4,P=c.tp+c.fp,ppv=P?c.tp/P:0,nn=c.fn+c.tn,npv=nn?c.tn/nn:0;
    const rows=[['var(--dx)',1,'True positives',c.tp,'have it, flagged'],['var(--dx)',.35,'Missed (false negatives)',c.fn,'have it, not flagged'],['var(--warn)',1,'False positives',c.fp,'flagged, do not have it'],['var(--muted)',.28,'True negatives',c.tn,'correctly not flagged']];
    rows.forEach(([col,op,l,v,sub],i)=>{const yy=N?ly+Math.floor(i/2)*44:ly+i*42,xx=N?lx+(i%2)*186:lx;
      s+=person(xx+8,yy,20,col,{op})+`<text x="${xx+26}" y="${yy+9}" class="t-lbl" style="font-size:12px">${l}: ${v}</text><text x="${xx+26}" y="${yy+22}" class="t-xs">${sub}</text>`});
    const py=N?ly+104:ly+186;
    s+=`<text x="${lx}" y="${py}" class="t-lbl">Of ${P} flagged, ${c.tp} have the condition</text><text x="${lx}" y="${py+16}" class="t-xs">positive predictive value ${Math.round(ppv*100)}%</text>`;
    s+=`<text x="${lx}" y="${py+38}" class="t-lbl">Of ${nn} not flagged, ${c.tn} do not</text><text x="${lx}" y="${py+54}" class="t-xs">negative predictive value ${Math.round(npv*100)}%</text>`;
    ic.innerHTML=s}
  function drawIcon(animateIt){const T=SC_TOOLS.find(x=>x.id===tool),prev=+pv.value,c=counts(T,prev);
    if(stopI){stopI();stopI=null}
    const from=shown||c;
    if(animateIt&&shown){stopI=crAnim(500,p=>{const e=ease(p),m={};['pos','tp','fp'].forEach(k=>m[k]=Math.round(lerp(from[k],c[k],e)));m.fn=m.pos-m.tp;m.tn=100-m.pos-m.fp;drawI(m,T)},()=>{stopI=null;drawI(c,T)})}
    drawI(c,T);shown=c;
    const P=c.tp+c.fp,ppv=P?Math.round(c.tp/P*100):0;
    inote.innerHTML=`<div class="kicker">${T.n} · prevalence ${Math.round(prev*100)}%</div><h4>${c.tp} found, ${c.fn} missed, ${c.fp} false alarms</h4>
      <p>Sensitivity ${Math.round(T.se*1000)/10}% and specificity ${Math.round(T.sp*1000)/10}% for ${T.tgt}. ${T.c} With ${c.pos} of 100 people affected, ${ppv}% of positive screens are true positives. Lower the prevalence and watch the false alarms outnumber the true positives: that is why a positive screen leads to a conversation and an assessment, never straight to a label.</p>
      <div class="pt"><b>In plain words</b>Even a good screening question flags some people who do not have a problem and misses some who do. A positive result means “let's talk more”. <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup></div>
      <div class="hook"><b>Exam hook</b>${T.id==='cage'?'CAGE asks about problems, not amounts, so it misses less severe risky drinking; AUDIT-C outperformed an augmented CAGE in primary care. <sup class="c" data-ref="Dhalla2007CAGE,Bradley2007AUDITC" title="Source 47,86">47,86</sup>':'In adults, brief screening instruments commonly had sensitivity and specificity between 0.70 and 0.85. <sup class="c" data-ref="OConnor2018JAMA" title="Source 349">349</sup>'}</div>`}
  $('#scTools').addEventListener('click',e=>{const b=e.target.closest('[data-sctool]');if(!b)return;tool=b.dataset.sctool;store.set('sc:tool',tool);$$('[data-sctool]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sctool===tool));drawIcon(true)});
  pv.addEventListener('input',()=>drawIcon(false));
  drawIcon(false);
  {const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();calc();shown=null;drawIcon(false)}}
};
/* =============== 2.2 Diagnosis: DSM-5-TR criteria & severity =============== */
/* the 11 criteria, paraphrased (APA 2022), grouped in four clusters */
const CR_G=[{n:'Impaired control',c:'var(--dx)'},{n:'Social impairment',c:'var(--accent)'},{n:'Risky use',c:'var(--warn)'},{n:'Pharmacological',c:'var(--gaba)'}];
const CR_C=[
 {g:0,s:'Larger or longer',d:'than intended',l:'Drinking more, or for longer, than intended'},
 {g:0,s:'Cutting down fails',d:'persistent wish or efforts',l:'A persistent wish, or failed efforts, to cut down or control drinking'},
 {g:0,s:'Much time spent',d:'getting, using, recovering',l:'Much time spent getting alcohol, drinking or recovering'},
 {g:0,s:'Craving',d:'added in DSM-5',l:'Craving: a strong desire or urge to drink'},
 {g:1,s:'Role obligations',d:'major roles not met',l:'Failure to meet major role obligations at work, school or home'},
 {g:1,s:'Social problems',d:'continued despite them',l:'Continued drinking despite social or interpersonal problems'},
 {g:1,s:'Activities given up',d:'important ones dropped',l:'Important social, work or leisure activities given up'},
 {g:2,s:'Hazardous situations',d:'physically hazardous use',l:'Drinking in physically hazardous situations'},
 {g:2,s:'Health problems',d:'physical or psychological',l:'Continued drinking despite physical or psychological problems'},
 {g:3,s:'Tolerance',d:'pharmacological',l:'Tolerance'},
 {g:3,s:'Withdrawal',d:'pharmacological; see 3.1',l:'Withdrawal'}];
const CR_SEV=[{n:'No diagnosis',c:'var(--muted)',r:'0–1'},{n:'Mild',c:'var(--warn)',r:'2–3',p:7.3,a:30.1,tr:2.7},{n:'Moderate',c:'var(--accent)',r:'4–5',p:3.2,a:25.9,tr:4.9},{n:'Severe',c:'var(--bad)',r:'6–11',p:3.4,a:23.9,tr:21.3}];
const crSev=n=>n>=6?3:n>=4?2:n>=2?1:0;
const CR_ON=[.13,.17,.21,.25,.34,.38,.42,.5,.54,.62,.66];
const CR_MO=[1.5,3,4.5,5.5,6.5,7.5,8.5,9.2,10,10.8,11.5];
const CR_STEPS=[
 {from:0,at:.06,k:'Step 1 · The frame',t:'11 criteria, one 12-month window',
  txt:`DSM-5-TR defines alcohol use disorder as a problematic pattern of alcohol use causing clinically significant impairment or distress, shown by at least 2 of 11 criteria within a 12-month period. The work group chose 2 because it gave the best agreement with the combined prevalence of DSM-IV abuse and dependence. The criteria describe a dimensional condition with no natural cut-point, so the count itself is the severity. <sup class="c" data-ref="APA2022,Hasin2013" title="Source 16,169">16,169</sup>`,
  pt:`Alcohol use disorder is a medical condition. A clinician diagnoses it by asking about 11 kinds of problems over the past year.`,
  hook:`AUD = ≥2 of 11 criteria within 12 months.`},
 {from:.12,at:.3,k:'Step 2 · Impaired control',t:'Impaired control (1–4)',
  txt:`The first cluster is about control: drinking more or longer than intended, a persistent wish or failed efforts to cut down, much time spent getting, drinking or recovering, and craving. Watch the meter: at 2 criteria it reads mild, at 4 moderate. Craving was added in DSM-5; its psychometric benefit was equivocal, but the view that it may become a biological treatment target prevailed. <sup class="c" data-ref="APA2022,Hasin2013" title="Source 16,169">16,169</sup>`,
  pt:`Two or three criteria is mild, four or five is moderate, six or more is severe.`,
  hook:`Severity by count: mild 2–3, moderate 4–5, severe 6+. Craving was added in DSM-5.`},
 {from:.32,at:.46,k:'Step 3 · Social impairment',t:'Social impairment (5–7)',
  txt:`Failing to meet major role obligations, continuing to drink despite social or interpersonal problems, and giving up important activities. Legal problems, a DSM-IV abuse criterion, are not here: they were dropped for very low prevalence, low discrimination and poor fit with the other criteria. Seven criteria is severe AUD, which 3.4% of US adults had in the past year. <sup class="c" data-ref="APA2022,Hasin2013,Grant2015NESARC" title="Source 16,146,169">16,146,169</sup>`,
  pt:`The count says how many kinds of problems are present, not how "bad" a person is.`,
  hook:`DSM-5 removed "recurrent legal problems" and added craving: still 11 criteria.`},
 {from:.48,at:.58,k:'Step 4 · Risky use',t:'Risky use (8–9)',
  txt:`Drinking in physically hazardous situations, and continuing to drink despite physical or psychological problems. Treatment seeking rises with severity: 2.7% of people with mild, 4.9% with moderate and 21.3% with severe 12-month AUD sought treatment. <sup class="c" data-ref="APA2022,Grant2015NESARC" title="Source 16,146">16,146</sup>`,
  pt:`Most people with alcohol use disorder never get treatment, even though treatment helps.`,
  hook:`Treatment seeking: 2.7% mild, 4.9% moderate, 21.3% severe (NESARC-III).`},
 {from:.6,at:.7,k:'Step 5 · Pharmacological',t:'Tolerance and withdrawal (10–11)',
  txt:`The last two criteria are tolerance and withdrawal. They are two of eleven: neither is required, and the DSM-5 physiological specifier was eliminated. For substance use disorders in general, tolerance and withdrawal that occur only during appropriate, supervised medical use are not counted. Withdrawal after long, heavy daily drinking can be dangerous: get medical help to stop safely. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>`,
  pt:`Someone can have alcohol use disorder without withdrawal symptoms. If withdrawal does happen, it needs medical care.`,
  hook:`Tolerance and withdrawal are not required for the diagnosis; the physiological specifier was dropped in DSM-5.`},
 {from:.74,at:.95,k:'Step 6 · Remission',t:'Early and sustained remission',
  txt:`After full criteria were met, early remission means at least 3 but less than 12 months without meeting any criterion except craving; sustained remission means 12 months or more. Craving may persist in both. A further specifier, "in a controlled environment", applies when the person is somewhere access to alcohol is restricted. <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup>`,
  pt:`"Remission" means going at least 3 months without the problems on the list. Cravings can still happen, and that is common.`,
  hook:`Early remission 3 to &lt;12 months; sustained ≥12 months; craving is the one criterion allowed in both.`}];

/* animate() with a safety net: if frames are throttled (a background tab), finish anyway */
function crAnim(dur,step,done){let fin=false;const end=()=>{if(fin)return;fin=true;clearTimeout(to);done&&done()};const st=animate(dur,step,end);const to=setTimeout(()=>{st();step(1);end()},dur+200);return ()=>{fin=true;clearTimeout(to);st()}}
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');
  function tilePos(N){/* x,y of each tile and each cluster header */
    const P=[],H=[];
    if(N){const tw=180,gx=[14,206];let y=8;CR_G.forEach((g,gi)=>{H.push([14,y+11]);const idx=CR_C.map((c,i)=>c.g===gi?i:-1).filter(i=>i>=0);idx.forEach((i,k)=>P[i]=[gx[k%2],y+18+Math.floor(k/2)*34,tw]);y+=18+Math.ceil(idx.length/2)*34+6});return {P,H,end:y}}
    const tw=222,cx=[14,252],cy=[10,182];CR_G.forEach((g,gi)=>{const X=cx[gi%2],Y=cy[Math.floor(gi/2)];H.push([X,Y+11]);CR_C.forEach((c,i)=>{if(c.g===gi){const k=CR_C.slice(0,i).filter(q=>q.g===gi).length;P[i]=[X,Y+18+k*34,tw]}})});return {P,H,end:290}}
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(CR_STEPS,t);setSt(p);note.innerHTML=noteHTML(CR_STEPS[p]);
    const T=tilePos(N),rem=ramp(t,.74,.8);let s='';
    const lit=CR_ON.map(a=>ramp(t,a,a+.025));const n=lit.filter(v=>v>=1).length,cnt=rem>0?0:n;
    CR_G.forEach((g,gi)=>{const [hx,hy]=T.H[gi];s+=`<text x="${hx}" y="${hy}" class="t-sm" style="fill:${g.c};font-weight:600">${g.n.toUpperCase()}</text>`});
    CR_C.forEach((c,i)=>{const [x,y,w]=T.P[i],g=CR_G[c.g],craveKeep=i===3?.45:0,v=Math.max(lit[i]*(1-rem),lit[i]>0?craveKeep*rem:0);
      s+=`<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" style="fill:var(--panel);stroke:${v>0?g.c:'var(--line)'};stroke-width:${v>0?1.8:1}"/>`;
      if(v>0)s+=`<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" style="fill:${g.c};opacity:${f1(v*.2)}"/>`;
      s+=`<circle cx="${x+15}" cy="${y+15}" r="10" style="fill:${v>0?g.c:'var(--panel-2)'};opacity:${v>0?.4+v*.6:1}"/><text x="${x+15}" y="${y+19}" class="t-xs t-mid" style="fill:${v>0?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${x+32}" y="${y+13}" class="t-lbl" style="font-size:12px;${v>0?'':'fill:var(--muted)'}">${c.s}</text><text x="${x+32}" y="${y+25}" class="t-xs">${i===3&&rem>.5?'may persist in remission':c.d}</text>`});
    /* severity meter */
    const M=N?{x:14,y:T.end+14,w:372}:{x:494,y:14,w:212},sv=crSev(cnt),S=CR_SEV[sv];
    s+=`<rect x="${M.x-4}" y="${M.y-4}" width="${M.w+8}" height="${N?122:268}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${M.x+8}" y="${M.y+14}" class="t-sm" style="fill:var(--dx);font-weight:600">CRITERIA MET</text>`;
    s+=`<text x="${M.x+8}" y="${M.y+(N?48:54)}" style="font:800 ${N?30:36}px var(--display);fill:${rem>0?'var(--good)':S.c}">${cnt}<tspan style="font-size:${N?16:18}px;fill:var(--muted)"> / 11</tspan></text>`;
    const mo0=18*ramp(t,.8,.95),lab=rem>0?(mo0<3?'Not yet in remission':mo0<12?'Early remission':'Sustained remission'):S.n;
    s+=`<text x="${M.x+(N?110:8)}" y="${M.y+(N?46:84)}" class="t-big" style="font-size:${N?20:22}px;fill:${rem>0?'var(--good)':S.c}">${lab}</text>`;
    const sy=M.y+(N?62:100),sw=(M.w-16)/11;
    for(let k=0;k<11;k++){const bs=CR_SEV[crSev(k+1)];s+=`<rect x="${f1(M.x+8+k*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="16" rx="3" style="fill:${k<cnt?bs.c:'var(--panel-2)'};opacity:${k<cnt?.85:1}"/>`}
    [[1,3,1],[3,5,2],[5,11,3]].forEach(([a,b,si])=>{const xa=M.x+8+a*sw,xb=M.x+8+b*sw-2,bs=CR_SEV[si];s+=`<path d="M${f1(xa)} ${sy+22}v4H${f1(xb)}v-4" style="fill:none;stroke:${bs.c};stroke-width:1.2"/><text x="${f1((xa+xb)/2)}" y="${sy+(!N&&si===2?50:38)}" class="t-xs t-mid" style="fill:${bs.c}">${bs.n.toLowerCase()} ${bs.r}</text>`});
    if(!N){const by=sy+62;
      if(rem>0)s+=`<text x="${M.x+8}" y="${by}" class="t-xs">Months without any criterion</text><text x="${M.x+8}" y="${by+13}" class="t-xs">except craving: see below.</text>`;
      else if(S.p){[['US adults, past 12 months',S.p+'%'],['Mean age at onset',S.a+' y'],['Sought treatment',S.tr+'%']].forEach(([a,b],i)=>s+=`<text x="${M.x+8}" y="${by+i*30}" class="t-xs">${a}</text><text x="${M.x+M.w-8}" y="${by+i*30+14}" class="t-lbl t-end" style="fill:${S.c}">${b}</text>`);s+=`<text x="${M.x+8}" y="${by+92}" class="t-xs">NESARC-III population estimates</text>`}
      else s+=`<text x="${M.x+8}" y="${by}" class="t-xs">Fewer than 2 criteria:</text><text x="${M.x+8}" y="${by+13}" class="t-xs">no AUD diagnosis.</text>`}
    else if(S.p&&rem===0)s+=`<text x="${M.x+8}" y="${M.y+112}" class="t-xs" style="fill:${S.c}">${S.p}% of US adults · onset ${S.a} y · ${S.tr}% sought care</text>`;
    /* lower strip: the 12-month window, then the remission timeline */
    const W=N?{x:14,y:T.end+156,w:372}:{x:14,y:300,w:460};
    if(rem<1){const X=m=>W.x+W.w*m/12,op=1-rem;
      s+=`<g style="opacity:${f1(op)}"><text x="${W.x}" y="${W.y}" class="t-sm" style="fill:var(--dx);font-weight:600">THE SAME 12-MONTH WINDOW</text>`;
      s+=`<rect x="${W.x}" y="${W.y+14}" width="${W.w}" height="26" rx="6" style="fill:var(--dx-soft);opacity:.6"/>`;
      for(let m=0;m<=12;m+=3)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${W.y+40}" y2="${W.y+45}" class="axis"/><text x="${f1(X(m))}" y="${W.y+56}" class="t-xs ${m===0?'':m===12?'t-end':'t-mid'}">${m===0?'12 months ago':m===12?'now':''}</text>`;
      CR_C.forEach((c,i)=>{if(lit[i]>0)s+=`<circle cx="${f1(X(CR_MO[i]))}" cy="${W.y+27}" r="${f1(3+lit[i]*4)}" style="fill:${CR_G[c.g].c};opacity:.85"/><text x="${f1(X(CR_MO[i]))}" y="${W.y+30}" class="t-xs t-mid" style="fill:var(--panel);font-size:8px;font-weight:700">${lit[i]>=1?i+1:''}</text>`});
      s+=`<text x="${W.x}" y="${W.y+72}" class="t-xs">${N?'Months are illustrative.':'Months are illustrative: what matters is that criteria cluster within 12 months.'}</text></g>`}
    if(rem>0){const X=m=>W.x+W.w*m/18,mo=18*ramp(t,.8,.95),op=rem;
      s+=`<g style="opacity:${f1(op)}"><text x="${W.x}" y="${W.y}" class="t-sm" style="fill:var(--good);font-weight:600">MONTHS WITHOUT ANY CRITERION EXCEPT CRAVING</text>`;
      [[0,3,'var(--panel-2)','not yet'],[3,12,'var(--good-soft)','early remission'],[12,18,'var(--good)','sustained']].forEach(([a,b,c,l],i)=>s+=`<rect x="${f1(X(a))}" y="${W.y+14}" width="${f1(X(b)-X(a))}" height="26" style="fill:${c};opacity:${i===2?.5:1}"/><text x="${f1((X(a)+X(b))/2)}" y="${W.y+31}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`);
      [0,3,6,9,12,15,18].forEach(m=>s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${W.y+40}" y2="${W.y+45}" class="axis"/><text x="${f1(X(m))}" y="${W.y+56}" class="t-xs t-mid">${m}</text>`);
      const tx=X(mo);s+=`<path d="M${f1(tx)} ${W.y+12}l-6 -9h12Z" style="fill:var(--ink)"/>`;
      const spec=mo<3?'not yet in remission':mo<12?'early remission':'sustained remission';
      s+=`<text x="${W.x}" y="${W.y+74}" class="t-lbl" style="fill:var(--good)">${f1(mo)} months: ${spec}</text></g>`}
    svg.innerHTML=s}
  const stop=playWire(rg,$('#crPlay'),draw,24000,'Replay','criteria');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- criteria counter ---------- */
  const box=$('#crBox'),cs=$('#crCalcSvg'),cn=$('#crCalcNote'),rs=$('#crRem'),env=$('#crEnv');
  box.innerHTML=CR_G.map((g,gi)=>`<p class="crg" style="color:${g.c}">${g.n}</p>`+CR_C.map((c,i)=>c.g===gi?`<label for="crK${i}"><input type="checkbox" id="crK${i}" data-crk="${i}"><span><b>${i+1}.</b> ${c.l}</span></label>`:'').join('')).join('');
  function calc(){const on=CR_C.map((_,i)=>$('#crK'+i).checked),n=on.filter(Boolean).length,sv=crSev(n),S=CR_SEV[sv],r=rs.value,nonCrave=on.filter((v,i)=>v&&i!==3).length;
    const N=vb(cs,'720 96','400 110'),x0=N?16:30,x1=N?384:690,sw=(x1-x0)/11;let s='';
    s+=`<text x="${x0}" y="18" class="t-sm" style="fill:var(--dx);font-weight:600">${n} OF 11 · ${S.n.toUpperCase()}</text>`;
    for(let k=0;k<11;k++){const bs=CR_SEV[crSev(k+1)];s+=`<rect x="${f1(x0+k*sw+1)}" y="28" width="${f1(sw-2)}" height="20" rx="4" style="fill:${k<n?bs.c:'var(--panel-2)'};opacity:${k<n?.85:1}"/><text x="${f1(x0+k*sw+sw/2)}" y="${N?62:64}" class="t-xs t-mid">${k+1}</text>`}
    [[1,3,1],[3,5,2],[5,11,3]].forEach(([a,b,si])=>{const xa=x0+a*sw,xb=x0+b*sw-2,bs=CR_SEV[si];s+=`<path d="M${f1(xa)} ${N?70:72}v4H${f1(xb)}v-4" style="fill:none;stroke:${bs.c};stroke-width:1.2"/><text x="${f1((xa+xb)/2)}" y="${N?90:90}" class="t-xs t-mid" style="fill:${bs.c}">${bs.n.toLowerCase()} ${bs.r}</text>`});
    cs.innerHTML=s;
    let h=`<div class="kicker">Teaching count · not a diagnosis</div><div style="display:flex;gap:14px;align-items:baseline;flex-wrap:wrap"><span class="crbig" style="color:${S.c}">${n}</span><b style="color:${S.c}">${n<2?'Fewer than 2 criteria: the threshold is not reached':S.n+' ('+S.r+' criteria)'}</b></div>`;
    if(r==='na'){h+=n>=2?`<p>${S.n} severity is set by the count alone. As a population figure, ${S.p}% of US adults had ${S.n.toLowerCase()} AUD in the past year; mean age at onset ${S.a} years; ${S.tr}% sought treatment. <sup class="c" data-ref="Hasin2013,Grant2015NESARC" title="Source 146,169">146,169</sup></p>`:`<p>DSM-5-TR needs at least 2 criteria in the same 12 months, together with clinically significant impairment or distress. <sup class="c" data-ref="APA2022" title="Source 16">16</sup></p>`}
    else{const sp={lt3:'Under 3 months: too soon for a remission specifier.',early:'Early remission: at least 3 but less than 12 months.',sust:'Sustained remission: 12 months or more.'}[r];
      h+=nonCrave?`<div class="verdict maybe">Remission needs that no criterion except craving has been met during that time; ${nonCrave} other criterion${nonCrave>1?'a are':' is'} ticked. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup></div>`:`<div class="verdict yes">${sp}${r!=='lt3'&&env.checked?' Specifier added: in a controlled environment.':''}${on[3]&&r!=='lt3'?' Craving alone does not prevent remission.':''} <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup></div>`}
    if(n>=4)h+=`<p>DSM-IV dependence lines up best with 4 or more DSM-5 criteria, so trials of people with DSM-IV dependence apply best to moderate or severe AUD. <sup class="c" data-ref="Compton2013Crosswalk" title="Source 64">64</sup></p>`;
    h+=`<div class="pt"><b>In plain words</b>The number counts kinds of problems; it does not measure a person's worth or willpower. AUD at any severity is treatable. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup></div>`;
    h+=`<div class="hook"><b>Exam hook</b>Mild 2–3, moderate 4–5, severe 6+; craving is the one criterion allowed during early or sustained remission. <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup></div>`;
    cn.innerHTML=h}
  box.addEventListener('change',calc);rs.addEventListener('change',calc);env.addEventListener('change',calc);
  $('#crReset').addEventListener('click',()=>{CR_C.forEach((_,i)=>$('#crK'+i).checked=false);rs.selectedIndex=0;env.checked=false;calc()});
  calc();

  /* ---------- DSM-IV to DSM-5 ---------- */
  const iv=$('#crIv'),ivn=$('#crIvNote');
  const CR_IV=[/* id, label, DSM-IV home (a = abuse, d = dependence, null = not a criterion), DSM-5 number */
    ['larger','Larger or longer','d',1],['cut','Cutting down fails','d',2],['time','Much time spent','d',3],['crave','Craving',null,4],
    ['role','Role obligations','a',5],['social','Social problems','a',6],['give','Activities given up','d',7],['haz','Hazardous situations','a',8],
    ['harm','Health problems','d',9],['tol','Tolerance','d',10],['wd','Withdrawal','d',11],['legal','Legal problems','a',0]];
  function pos(N,v){/* chip positions: v 4 = DSM-IV, 5 = DSM-5 */
    const P={},cw=N?176:200;
    if(v===4){const ab=CR_IV.filter(c=>c[2]==='a'),de=CR_IV.filter(c=>c[2]==='d');
      if(N){ab.forEach((c,i)=>P[c[0]]=[22+(i%2)*184,62+Math.floor(i/2)*34]);de.forEach((c,i)=>P[c[0]]=[22+(i%2)*184,176+Math.floor(i/2)*34])}
      else{ab.forEach((c,i)=>P[c[0]]=[26,64+i*36]);de.forEach((c,i)=>P[c[0]]=[296+(i%2)*208,64+Math.floor(i/2)*36])}
      P.crave=N?[22+184,176+3*34+44]:[504,64+3*36+46]}
    else{const d5=CR_IV.filter(c=>c[3]>0).sort((a,b)=>a[3]-b[3]);
      d5.forEach((c,i)=>P[c[0]]=N?[22+(i%2)*184,62+Math.floor(i/2)*34]:[26+(i%3)*226,64+Math.floor(i/3)*36]);
      P.legal=N?[22,300]:[26,236]}
    return {P,cw}}
  let ivV=4,ivT=0,stopV=null;
  function drawV(u){const N=vb(iv,'720 272','400 350');const A=pos(N,4),B=pos(N,5),cw=A.cw;let s='';
    /* boxes cross-fade */
    const o4=1-u,o5=u;
    if(N){s+=`<g style="opacity:${f1(o4)}"><rect x="14" y="30" width="372" height="${2*34+40}" rx="12" style="fill:var(--accent-soft);opacity:.5;stroke:var(--accent)"/><text x="24" y="50" class="t-sm" style="fill:var(--accent);font-weight:600">DSM-IV ALCOHOL ABUSE (HISTORICAL TERM)</text>`;
      s+=`<rect x="14" y="144" width="372" height="${4*34+40}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="24" y="164" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-IV ALCOHOL DEPENDENCE</text></g>`;
      s+=`<g style="opacity:${f1(o5)}"><rect x="14" y="30" width="372" height="${6*34+40}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="24" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-5 ALCOHOL USE DISORDER · 11 CRITERIA</text><text x="24" y="292" class="t-sm" style="fill:var(--bad);font-weight:600">REMOVED</text></g>`}
    else{s+=`<g style="opacity:${f1(o4)}"><rect x="14" y="30" width="248" height="${4*36+44}" rx="12" style="fill:var(--accent-soft);opacity:.5;stroke:var(--accent)"/><text x="26" y="50" class="t-sm" style="fill:var(--accent);font-weight:600">DSM-IV ABUSE (HISTORICAL)</text>`;
      s+=`<rect x="284" y="30" width="422" height="${4*36+44}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="296" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-IV DEPENDENCE</text>`;
      s+=`<text x="14" y="244" class="t-xs">Hierarchy: dependence trumped abuse. Two dependence criteria and no abuse criterion = no diagnosis (a "diagnostic orphan").</text></g>`;
      s+=`<g style="opacity:${f1(o5)}"><rect x="14" y="30" width="692" height="${4*36+44}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="26" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-5 ALCOHOL USE DISORDER · 11 CRITERIA · 2 OR MORE IN 12 MONTHS</text><text x="26" y="228" class="t-sm" style="fill:var(--bad);font-weight:600">REMOVED</text></g>`}
    CR_IV.forEach(c=>{const a=A.P[c[0]],b=B.P[c[0]],e=ease(u),x=lerp(a[0],b[0],e),y=lerp(a[1],b[1],e);
      const isLegal=c[0]==='legal',isCrave=c[0]==='crave',op=isCrave?u:1,col=isLegal?(u>.5?'var(--bad)':'var(--accent)'):isCrave?'var(--good)':c[2]==='a'?'var(--accent)':'var(--dx)';
      if(op<=0.01)return;
      s+=`<g style="opacity:${f1(isLegal?1-u*.45:op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${cw-8}" height="28" rx="14" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="${f1(x+14)}" y="${f1(y+18)}" class="t-lbl" style="font-size:12px">${c[3]?(u>.5?c[3]+'. ':''):''}${c[1]}${isCrave?' (new)':''}</text>`;
      if(isLegal&&u>0)s+=`<line x1="${f1(x+10)}" x2="${f1(x+10+(cw-28)*ramp(u,.4,1))}" y1="${f1(y+14)}" y2="${f1(y+14)}" style="stroke:var(--bad);stroke-width:2"/>`;
      s+='</g>'});
    if(N&&u<.5)s+=`<text x="14" y="340" class="t-xs">Two dependence criteria, no abuse = no diagnosis.</text>`;
    iv.innerHTML=s}
  function setV(v,anim){ivV=v;$$('[data-crv]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.crv===v));const target=v===5?1:0;
    if(stopV){stopV();stopV=null}
    const from=ivT;
    if(anim&&from!==target)stopV=crAnim(900,p=>{ivT=lerp(from,target,p);drawV(ivT)},()=>{stopV=null;ivT=target;drawV(target)});
    else ivT=target;
    drawV(target);if(!stopV)ivT=target;
    ivn.innerHTML=v===4?`<div class="kicker">DSM-IV · 1994</div><h4>Two diagnoses in a hierarchy</h4><p>DSM-IV split the criteria into “alcohol abuse” (role failure, hazardous use, legal problems, social problems) and “alcohol dependence” (the other seven). The hierarchy created “diagnostic orphans”: people with two dependence criteria and no abuse criterion received no diagnosis at all. <sup class="c" data-ref="Hasin2013,Peer2013DSM5" title="Source 169,360">169,360</sup></p><div class="pt"><b>In plain words</b>The old system had two labels, and some people with real problems fell between them.</div><div class="hook"><b>Exam hook</b>Diagnostic orphan = 2 dependence criteria, 0 abuse criteria: no DSM-IV diagnosis, but mild AUD in DSM-5.</div>`
      :`<div class="kicker">DSM-5 · 2013, kept in DSM-5-TR</div><h4>One disorder, 11 criteria</h4><p>Abuse and dependence were merged; legal problems were dropped (very low prevalence, low discrimination, poor fit) and craving was added. In 7,543 people from genetic studies, the switch modestly increased prevalence, mostly by capturing diagnostic orphans; adding craving did not substantially change diagnosis rates. <sup class="c" data-ref="Hasin2013,Peer2013DSM5,APA2022" title="Source 16,169,360">16,169,360</sup></p><div class="pt"><b>In plain words</b>One label on a scale from mild to severe replaced two separate labels.</div><div class="hook"><b>Exam hook</b>DSM-5: −legal problems, +craving, still 11 criteria; threshold 2.</div>`}
  $$('[data-crv]').forEach(b=>b.addEventListener('click',()=>setV(+b.dataset.crv,true)));
  setV(4,false);
  {const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();calc();drawV(ivT)}}
};
/* =============== 3.1 Alcohol withdrawal: the timeline =============== */
const WD_H=120; /* the scrubber runs 0-120 h after the last drink */
const WD_STEPS=[
 {from:0,at:.025,k:'Hours 0–6',t:'The last drink',
  txt:`Over months of heavy, regular drinking the brain adapts to alcohol's depressant effect. When a person who is physically dependent stops or cuts down, that effect is suddenly reversed and the brain is left over-excited: that is withdrawal. Its most severe results are seizure, delirium and death. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> In the first hours the blood alcohol level is still falling and signs may not have begun; ASAM lists a positive blood alcohol level alongside withdrawal signs as a factor that may raise risk. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`If your body has got used to alcohol and you stop suddenly, your brain can be over-excited for a few days. This is called withdrawal. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  hook:`Withdrawal signs can appear while the blood alcohol level is still positive, and ASAM counts that combination as a possible added risk. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`},
 {from:.05,at:.09,k:'6–24 h',t:'Minor withdrawal',
  txt:`ASAM 2020: symptoms usually begin 6–24 h after stopping or cutting down. Early features are anxiety, sleep disturbance, loss of appetite, vivid dreams, headache and nausea, with tachycardia, brisk reflexes, sweating, raised blood pressure and hyperthermia. Mirijello's stage I (6–12 h) also lists tremor and fast breathing. <sup class="c" data-ref="ASAM2020Withdrawal,Mirijello2015" title="Source 20,332">20,332</sup> Up to 50% of people with alcohol use disorder have withdrawal symptoms, and only a minority need medical treatment. Mild to moderate withdrawal often settles within 2–7 days. <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>`,
  pt:`Early signs are shaking hands, sweating, a fast heartbeat, feeling anxious or sick, and poor sleep. They usually start 6 to 24 hours after the last drink. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  hook:`Minor withdrawal: onset 6–24 h. DSM-5 needs ≥2 of 8 signs; a pulse &gt;100 bpm counts as autonomic hyperactivity. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`},
 {from:.1,at:.14,k:'12–48 h',t:'Hallucinosis',
  txt:`Hallucinations develop within 12–24 h and usually resolve within 24–48 h, unless signs of delirium appear (ASAM 2020). Alcoholic hallucinosis means visual, tactile or auditory hallucinations without clouding of consciousness: the person stays oriented, which is what separates it from delirium tremens. <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>`,
  pt:`Some people see, hear or feel things that are not there, while still knowing where they are and what day it is. It is frightening, and it needs medical care.`,
  hook:`Hallucinosis = hallucinations with a clear sensorium at 12–24 h. Delirium tremens = hallucinations <i>with</i> confusion, later. <sup class="c" data-ref="Saitz1998AHRW,ASAM2020Withdrawal" title="Source 20,410">20,410</sup>`},
 {from:.18,at:.2,k:'8–48 h · peak ≈24 h',t:'Seizures',
  txt:`Withdrawal seizures may begin as early as 8 h after the last drink, continue for up to 48 h and peak at about 24 h (ASAM 2020); more than 90% appear within 48 h. <sup class="c" data-ref="ASAM2020Withdrawal,Jesse2017" title="Source 20,203">20,203</sup> About 10% of people with withdrawal symptoms have them: generalised tonic-clonic seizures with little or no postictal period. More than half of those affected have repeated seizures, a second one "generally happens within 6 hours of the first", and in up to 5% they progress to status epilepticus. <sup class="c" data-ref="Mirijello2015,Jesse2017,Saitz1998AHRW" title="Source 203,332,410">203,332,410</sup> In an emergency-department trial after a witnessed alcohol-related seizure, a further seizure within 6 h occurred in 3% given IV lorazepam and 24% given placebo. <sup class="c" data-ref="DOnofrio1999NEJM" title="Source 90">90</sup> ASAM adds that a mild, low-risk patient can be watched for up to 36 h, "after which more severe withdrawal is unlikely to develop". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`A seizure can come without much shaking or sweating first. A seizure is an emergency: call emergency services. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  hook:`Seizures come <b>early</b>: window 8–48 h, peak ≈24 h. Phenytoin is not used for withdrawal seizures. <sup class="c" data-ref="ASAM2020Withdrawal,Hillbom2003" title="Source 20,180">20,180</sup>`},
 {from:.4,at:.5,k:'48–96 h',t:'Delirium tremens',
  txt:`Delirium tremens (alcohol withdrawal delirium) is a disturbance of attention and awareness that develops over hours to days and fluctuates, with disorientation, usually severe agitation, tachycardia, high blood pressure and fever. <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup> Its onset is published differently: 48–72 h after the last drink (Mirijello 2015; Jesse 2017) or 72–96 h (ASAM 2020, initial-assessment section), and it "could begin up to 10 days later". <sup class="c" data-ref="Mirijello2015,Jesse2017,ASAM2020Withdrawal" title="Source 20,203,332">20,203,332</sup> It occurs in about 5% of patients with withdrawal syndrome, often as the result of no treatment or undertreatment. <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>`,
  pt:`Delirium tremens ("DTs") means severe confusion, seeing or hearing things, fever and a racing heart, usually two to four days after the last drink. It is a medical emergency. <sup class="c" data-ref="Saitz1998AHRW,Mirijello2015" title="Source 332,410">332,410</sup>`,
  hook:`DTs come <b>late</b>: 48–96 h (48–72 h Mirijello and Jesse; 72–96 h ASAM). Fluctuating attention plus autonomic overactivity. <sup class="c" data-ref="Mirijello2015,Jesse2017,ASAM2020Withdrawal" title="Source 20,203,332">20,203,332</sup>`},
 {from:.75,at:.92,k:'Days 4–5 and after',t:'Settling, or a long delirium',
  txt:`Delirium tremens normally lasts 5–7 days (Mirijello), up to 3–4 days (Saitz), or as long as 2 weeks (Jesse). <sup class="c" data-ref="Mirijello2015,Saitz1998AHRW,Jesse2017" title="Source 203,332,410">203,332,410</sup> Deaths range from about 1% or less with early detection and appropriate treatment (Jesse 2017), through 1–5% (Mirijello 2015), to about 5% in the historical series quoted by Saitz 1998 and 6.6% in a 1987–2003 Spanish hospital cohort. In controlled trials, no deaths were reported in 217 patients treated with benzodiazepines or barbiturates. These are group statistics from different eras and settings. <sup class="c" data-ref="Jesse2017,Mirijello2015,Saitz1998AHRW,Monte2010,MayoSmith2004Delirium" title="Source 203,322,332,334,410">203,322,332,334,410</sup> If delirium lasts longer than 72 h, ASAM advises looking for drug-induced delirium or withdrawal from another GABAergic agent. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`With modern hospital care, most people with DTs survive. This is a group statistic, not a promise for any one person. Getting through withdrawal is a first step; ongoing treatment is what helps recovery last. <sup class="c" data-ref="Jesse2017,MayoSmith2004Delirium,ASAM2020Withdrawal" title="Source 20,203,322">20,203,322</sup>`,
  hook:`Antipsychotics alone raise the risk of death in DT (RR 6.6 against sedative-hypnotics). <sup class="c" data-ref="MayoSmith2004Delirium" title="Source 322">322</sup>`}
];
const WD_K_STEPS=[
 {from:0,at:.1,k:'Episode 1',t:'One withdrawal',
  txt:`Kindling is a process in which a repeated weak stimulus that at first causes no behavioural effect comes to cause effects such as seizures. Clinical and experimental evidence supports a kindling mechanism in alcohol withdrawal. <sup class="c" data-ref="Becker1998" title="Source 34">34</sup> <span class="ev est">Established in animal models</span> <span class="ev early">Early evidence in humans</span>`,
  pt:`Each time withdrawal happens, the brain may become a little more easily over-excited the next time.`},
 {from:.25,at:.45,k:'Episodes 2–6',t:'Again and again',
  txt:`In animal studies, NMDA glutamate-receptor sensitivity and the severity of withdrawal seizures both increase with the number of past withdrawal episodes. <sup class="c" data-ref="Becker1998" title="Source 34">34</sup> <span class="ev est">Established in animal models</span>`,
  hook:`Kindling: NMDA sensitivity and seizure severity rise with each withdrawal in animal models. <sup class="c" data-ref="Becker1998" title="Source 34">34</sup>`},
 {from:.55,at:.75,k:'Brown 1988',t:'In people',
  txt:`Brown 1988 compared 25 men with withdrawal seizures and 25 without: 12 of 25 (48%) with seizures had 5 or more previous detoxifications, against 3 of 25 (12%) without. The authors found no link with drinking history. <sup class="c" data-ref="Brown1988Kindling" title="Source 51">51</sup> In a family study, people with a history of delirium tremens or convulsions reported more withdrawal episodes (28.2 vs 15.9). <sup class="c" data-ref="Schuckit1995" title="Source 419">419</sup> ASAM 2020 lists "numerous prior withdrawal episodes" as a risk factor for complicated withdrawal. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> <span class="ev early">Early evidence in humans</span>`,
  hook:`Brown 1988: 48% of people with withdrawal seizures had ≥5 prior detoxifications vs 12% without. <sup class="c" data-ref="Brown1988Kindling" title="Source 51">51</sup>`},
 {from:.85,at:.95,k:'An open question',t:'Can early treatment help?',
  txt:`Some experimental evidence suggests that treating early withdrawal may delay later kindled seizures; in humans this remains a hypothesis. <sup class="c" data-ref="Becker1998" title="Source 34">34</sup> <span class="ev hyp">Hypothesis</span> In a trial of 136 outpatients, among people with two or more past medicated withdrawals, those treated with carbamazepine drank less than 1 drink a day afterwards, against about 5 a day on lorazepam (P=.033); lorazepam showed rebound symptoms. <sup class="c" data-ref="Malcolm2002" title="Source 306">306</sup> <span class="ev early">Early evidence</span>`,
  pt:`Every withdrawal is worth taking seriously. Get medical help to stop safely, each time. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`}
];
/* PAWSS items as named in the AAST 2022 summary (concomitant substances split in two, as in the published scale) */
const WD_PAWS_GATE='Any alcohol in the last 30 days, or a positive blood alcohol level on admission';
const WD_PAWS_HX=['Previous episodes of alcohol withdrawal','Previous alcohol withdrawal seizures','Previous delirium tremens','Previous alcohol rehabilitation treatment','Previous blackouts','Concomitant use of other CNS depressants','Concomitant use of illicit substances','Recent intoxication'];
const WD_PAWS_CL=['Elevated blood alcohol level on admission','Evidence of increased autonomic activity'];

inits.withdrawal=()=>{
  /* ---------- main timeline ---------- */
  const svg=$('#wdSvg'),rg=$('#wdT');let src='both';
  const sig=h=>{const dtOn=src==='asam'?[74,88]:[52,66];
    const tremor=ramp(h,6,16)*(1-.3*ramp(h,104,120)),sweat=ramp(h,8,20),hallu=ramp(h,12,18)*(1-ramp(h,40,48)),
      seize=bump(h,22,26.5),conf=ramp(h,dtOn[0],dtOn[1]),
      hr=Math.round(78+28*ramp(h,6,24)+10*bump(h,20,30)+24*conf-12*ramp(h,100,120));
    return {tremor,sweat,hallu,seize,conf,hr}};
  function hallGlyph(x,y,s,v){if(v<=0)return '';let g='';[[-.5,-.05],[.52,0],[.48,.62],[-.5,.66]].forEach(([dx,dy],i)=>{const cx=x+dx*s,cy=y+dy*s,o=v*(.55+.45*Math.sin(i*1.7));
      g+=`<path d="M${f1(cx-6)} ${f1(cy)}q3 -4 6 0t6 0" style="fill:none;stroke:var(--dx);stroke-width:1.6;stroke-linecap:round;opacity:${f1(o)}"/><circle cx="${f1(cx)}" cy="${f1(cy-6)}" r="1.8" style="fill:var(--dx);opacity:${f1(o)}"/>`});return g}
  function dial(cx,cy,r,h){const A=v=>-Math.PI/2+2*Math.PI*v/WD_H,P=(v,rr)=>[cx+rr*Math.cos(A(v)),cy+rr*Math.sin(A(v))];
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--panel-2);stroke-width:10"/>`;
    if(h>0){const p0=P(0,r),p1=P(Math.min(h,WD_H-.01),r),big=h>WD_H/2?1:0;s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${r} ${r} 0 ${big} 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;opacity:.85"/>`}
    [0,24,48,72,96].forEach(v=>{const a=P(v,r-9),b=P(v,r+9),l=P(v,r+19);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" style="stroke:var(--muted);stroke-width:1.4"/><text x="${f1(l[0])}" y="${f1(l[1]+3.5)}" class="t-xs t-mid">${v===0?'0 · 120 h':v+' h'}</text>`});
    const k=P(h,r);s+=`<circle cx="${f1(k[0])}" cy="${f1(k[1])}" r="6.5" style="fill:var(--panel);stroke:var(--accent);stroke-width:2.6"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 388','400 612'),h=t*WD_H,S=sig(h);
    const L=N?{px:[8,8,392,244],dc:[102,124],dr:72,ps:70,rx:212,big:58,sub:76,pulseY:112,pw:[212,384],signY:156,tx:[22,382],rows:{mi:282,ha:346,se:416,dt:484},axY:556,dayY:588,ob:[258,546]}
           :{px:[10,10,250,378],dc:[135,112],dr:78,ps:80,rx:24,big:230,sub:247,pulseY:274,pw:[24,236],signY:312,tx:[292,704],rows:{mi:54,ha:112,se:178,dt:246},axY:330,dayY:362,ob:[30,322]};
    let s=`<defs>${marker('wdA','var(--muted)')}<pattern id="wdHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--bad);opacity:.35"/><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--bad);stroke-width:3"/></pattern></defs>`;
    /* ----- person panel ----- */
    s+=`<rect x="${L.px[0]}" y="${L.px[1]}" width="${L.px[2]-L.px[0]}" height="${L.px[3]-L.px[1]}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const [cx,cy]=L.dc;s+=dial(cx,cy,L.dr,h);
    const py=cy-L.ps*.5,jit=S.tremor*1.2*Math.sin(h*9);
    s+=person(cx+jit*.4,py,L.ps,'var(--muted)');
    s+=symptoms(cx,py,L.ps,{tremor:S.tremor,sweat:S.sweat,conf:S.conf,seize:S.seize});
    s+=hallGlyph(cx,py,L.ps,S.hallu*(1-S.conf*.6));
    const day=Math.min(5,Math.floor(h/24)+1);
    s+=`<text x="${L.rx}" y="${L.big}" style="font:800 30px var(--display);fill:var(--ink)">${Math.round(h)} h</text>`;
    s+=`<text x="${L.rx}" y="${L.sub}" class="t-sm">day ${day} after the last drink</text>`;
    /* pulse readout (schematic) with the DSM-5 >100 bpm line */
    const [p0,p1]=L.pw,PX=v=>p0+(p1-p0)*clamp((v-60)/(160-60)),pY=L.pulseY,hot=S.hr>100;
    s+=`<text x="${p0}" y="${pY-8}" class="t-xs">pulse (schematic)</text><text x="${p1}" y="${pY-8}" class="t-xs t-end" style="fill:${hot?'var(--bad)':'var(--ink)'};font-weight:700">♥ ${S.hr} bpm</text>`;
    s+=`<rect x="${p0}" y="${pY}" width="${p1-p0}" height="8" rx="4" style="fill:var(--panel-2)"/><rect x="${p0}" y="${pY}" width="${f1(PX(S.hr)-p0)}" height="8" rx="4" style="fill:${hot?'var(--glu-fill)':'var(--gaba-fill)'}"/>`;
    s+=`<line x1="${f1(PX(100))}" x2="${f1(PX(100))}" y1="${pY-3}" y2="${pY+11}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(PX(100))}" y="${pY+22}" class="t-xs t-mid">&gt;100: a DSM-5 sign</text>`;
    /* signs now */
    const now=[];if(h<5)now.push('no signs yet');
    if(S.tremor>.3)now.push('tremor');if(S.sweat>.3)now.push('sweating');if(h>=6&&h<60&&S.conf<.3)now.push('anxiety, poor sleep, nausea');
    if(S.hallu>.3&&S.conf<.3)now.push('hallucinations, still oriented');if(S.seize>.15)now.push('seizure risk at its peak');
    if(S.conf>.3)now.push('confusion, agitation, fever');if(hot)now.push('fast pulse');
    const lines=[];let ln='';now.forEach(w=>{const tr=ln?ln+' · '+w:w;if(tr.length>(N?29:38)){lines.push(ln);ln=w}else ln=tr});if(ln)lines.push(ln);
    s+=`<text x="${L.rx}" y="${L.signY}" class="t-xs" style="font-weight:600">SIGNS DRAWN NOW</text>`;
    lines.slice(0,N?5:4).forEach((l,i)=>s+=`<text x="${L.rx}" y="${L.signY+15+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    /* ----- timeline ----- */
    const [x0,x1]=L.tx,X=v=>x0+(x1-x0)*v/WD_H,R=L.rows,on=(a,b)=>h>=a&&h<=b;
    const tl=tline(x0,L.axY,x1-x0,{min:0,max:WD_H,step:12,fmt:v=>v%24===0?v+' h':''});s+=tl.svg;
    for(let d=0;d<5;d++)s+=`<text x="${f1(X(d*24+12))}" y="${L.dayY}" class="t-xs t-mid" style="${day===d+1?'fill:var(--accent);font-weight:700':''}">day ${d+1}</text>`;
    for(let v=24;v<WD_H;v+=24)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.ob[0]}" y2="${L.axY}" class="grid"/>`;
    const lab=(y,name,det,act,col)=>`<text x="${x0}" y="${y-13}" class="t-lbl" style="${act?`fill:${col}`:''}">${name}</text><text x="${x1}" y="${y-13}" class="t-xs t-end">${det}</text>`;
    const bar=(a,b,y,col,act,o={})=>`<rect x="${f1(X(a))}" y="${f1(y-(o.h||14)/2)}" width="${f1(X(b)-X(a))}" height="${o.h||14}" rx="${o.sq?2:7}" style="fill:${o.fill||col};opacity:${f1((act?.95:.35)*(o.op||1))};stroke:${col};stroke-width:${act?1.6:0}"/>`;
    const brk=(a,b,y,txt)=>`<path d="M${f1(X(a))} ${y+14}v5H${f1(X(b))}v-5" style="fill:none;stroke:var(--muted);stroke-width:1"/><text x="${f1((X(a)+X(b))/2)}" y="${y+30}" class="t-xs t-mid">${txt}</text>`;
    /* minor withdrawal: onset 6-24 h (ASAM), early withdrawal to 48 h (Jesse) */
    let act=on(6,48);s+=lab(R.mi,'Minor withdrawal',N?'onset 6–24 h':'onset 6–24 h (ASAM) · to 48 h (Jesse)',act,'var(--warn)')+bar(6,48,R.mi,'var(--warn)',act)+bar(6,24,R.mi,'var(--warn)',act&&h<=24,{h:6,op:.9,fill:'var(--panel)'})+brk(6,24,R.mi,'onset');
    act=on(12,48);s+=lab(R.ha,'Hallucinosis',N?'onset 12–24 h':'onset 12–24 h, gone by 24–48 h (ASAM)',act,'var(--dx)')+bar(12,48,R.ha,'var(--dx)',act)+bar(12,24,R.ha,'var(--dx)',act&&h<=24,{h:6,op:.9,fill:'var(--panel)'})+brk(12,24,R.ha,'onset');
    /* seizures: 8-48 h, peak about 24 h (ASAM); 6-48 h (Jesse, Hillbom) */
    act=on(8,48);s+=lab(R.se-10,'Seizures',N?'8–48 h, peak ≈24 h':'ASAM 8–48 h · dashed: Jesse, Hillbom 6–48 h',act,'var(--glu)');
    const sb=R.se+10,sp=(v)=>v<=24?Math.sin(Math.PI/2*ramp(v,8,24)):Math.cos(Math.PI/2*ramp(v,24,48));let d=`M${f1(X(8))} ${sb}`;for(let v=8;v<=48;v+=1)d+=`L${f1(X(v))} ${f1(sb-24*sp(v))}`;
    s+=`<path d="${d}Z" style="fill:var(--glu-fill);opacity:${act?.8:.3};stroke:var(--glu);stroke-width:${act?1.4:0}"/><line x1="${f1(X(6))}" x2="${f1(X(48))}" y1="${sb+5}" y2="${sb+5}" style="stroke:var(--glu);stroke-width:2;stroke-dasharray:3 3;opacity:.7"/>`;
    s+=`<text x="${f1(X(24))}" y="${sb+18}" class="t-xs t-mid">peak ≈24 h</text>`;
    /* delirium tremens: two published onset windows, and a long tail */
    const mOn=src!=='asam',aOn=src!=='mir';act=h>=48;
    s+=lab(R.dt,'Delirium tremens',N?'onset by source':'onset 48–72 h (Mirijello) or 72–96 h (ASAM)',act,'var(--bad)');
    s+=bar(48,WD_H,R.dt+10,'var(--bad)',act&&h>=72,{h:5,op:.45});
    if(mOn)s+=bar(48,72,R.dt,'var(--bad)',on(48,72),{sq:1});
    if(aOn)s+=`<rect x="${f1(X(72))}" y="${R.dt-7}" width="${f1(X(96)-X(72))}" height="14" rx="2" style="fill:url(#wdHatch);opacity:${on(72,96)?1:.45};stroke:var(--bad);stroke-width:${on(72,96)?1.6:.6}"/>`;
    if(mOn)s+=`<text x="${f1((X(48)+X(72))/2)}" y="${R.dt+28}" class="t-xs t-mid">Mirijello</text>`;
    if(aOn)s+=`<text x="${f1((X(72)+X(96))/2)}" y="${R.dt+28}" class="t-xs t-mid">ASAM</text>`;
    s+=`<text x="${f1(X(WD_H))}" y="${R.dt+28}" class="t-xs t-end">lasts days →</text>`;
    /* ASAM: low-risk observation to 36 h */
    const ob=X(36);s+=`<line x1="${f1(ob)}" x2="${f1(ob)}" y1="${L.ob[0]}" y2="${L.ob[1]}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${f1(ob+4)}" y="${L.ob[1]-4}" class="t-xs" style="fill:var(--good)">36 h: low-risk watch (ASAM)</text>`;
    /* playhead */
    const hx=X(h);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.ob[0]-8}" y2="${L.axY}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(hx-6)} ${L.ob[0]-14}h12l-6 8Z" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    const p=phaseOf(WD_STEPS,t);setSt(p);
    const open=[];if(on(6,48))open.push('minor withdrawal');if(on(12,48))open.push('hallucinosis');if(on(8,48))open.push('seizures');if((mOn&&on(48,72))||(aOn&&on(72,96)))open.push('DT onset');else if(h>72)open.push('DT may continue');
    rg.setAttribute('aria-valuetext',`${Math.round(h)} hours after the last drink: ${WD_STEPS[p].t}`);
    $('#wdRead').innerHTML=`<span>hours <b>${Math.round(h)}</b></span><span>day <b>${day}</b></span><span>windows open <b>${open.length?open.join(', '):'none yet'}</b></span>`;
    $('#wdNote').innerHTML=noteHTML(WD_STEPS[p]);
  }
  const stop=playWire(rg,$('#wdPlay'),draw,26000,'Replay','withdrawal');
  const setSt=stepWire($('#wdSteps'),WD_STEPS,rg,draw,stop);
  $$('[data-wsrc]').forEach(b=>b.addEventListener('click',()=>{src=b.dataset.wsrc;$$('[data-wsrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- kindling ---------- */
  const ks=$('#wdKSvg'),kr=$('#wdKT');
  function kdraw(t){
    const N=vb(ks,'720 320','400 600'),G=i=>clamp((t-.02-i*.08)/.07),nE=Math.max(1,[0,1,2,3,4,5].filter(i=>G(i)>.5).length),bars=ramp(t,.55,.75);
    const L=N?{c:[18,20,382,262],th:130,syn:[200,346],ss:1.15,bx:[150,370],by:[482,520],bt:462,hs:.82}
             :{c:[14,16,420,300],th:140,syn:[570,100],ss:1.15,bx:[560,700],by:[226,266],bt:206,hs:1};
    const [cx0,cy0,cx1,cy1]=L.c,base=cy1-34,sp=(cx1-cx0-40)/6;
    let s=`<rect x="${cx0}" y="${cy0}" width="${cx1-cx0}" height="${cy1-cy0}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${cx0+12}" y="${cy0+20}" class="t-sm">WITHDRAWAL SEVERITY, EPISODE BY EPISODE (SCHEMATIC)</text>`;
    s+=`<line x1="${cx0+12}" x2="${cx1-12}" y1="${base}" y2="${base}" class="axis"/>`;
    s+=`<line x1="${cx0+12}" x2="${cx1-12}" y1="${L.th}" y2="${L.th}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:5 4"/><text x="${cx0+14}" y="${L.th-6}" class="t-xs" style="fill:var(--bad)">seizure threshold (schematic)</text>`;
    for(let i=0;i<6;i++){const g=G(i),x=cx0+32+sp*i+sp/2,hh=(40+i*30)*L.hs*ease(g),w=sp*.42;
      s+=`<text x="${f1(x)}" y="${base+16}" class="t-xs t-mid" style="${i<nE?'fill:var(--ink)':''}">${i+1}</text>`;
      if(g<=0)continue;
      const top=base-hh,over=top<L.th;
      s+=`<path d="M${f1(x-w)} ${base}C${f1(x-w*.4)} ${base} ${f1(x-w*.35)} ${f1(top)} ${f1(x)} ${f1(top)}S${f1(x+w*.4)} ${base} ${f1(x+w)} ${base}Z" style="fill:${over?'var(--glu-fill)':'var(--warn)'};opacity:.75"/>`;
      if(over&&g>.9)for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*.45;s+=`<line x1="${f1(x+Math.cos(a)*6)}" y1="${f1(top-4+Math.sin(a)*6)}" x2="${f1(x+Math.cos(a)*15)}" y2="${f1(top-4+Math.sin(a)*15)}" style="stroke:var(--bad);stroke-width:1.6;stroke-linecap:round"/>`}}
    s+=`<text x="${f1((cx0+cx1)/2)}" y="${base+30}" class="t-xs t-mid">withdrawal episode number</text>`;
    /* synapse: NMDA receptors up with repeated withdrawals (animal data) */
    const [sx,sy]=L.syn;
    s+=synapse(sx,sy,L.ss,{gaba:3,nmda:Math.min(6,1+nE),gl:.3+nE*.1,ca:.2+nE*.12,spark:clamp((nE-1)/5),seed:7});
    s+=`<text x="${sx}" y="${f1(sy+L.ss*56)}" class="t-xs t-mid">NMDA receptors: ${Math.min(6,1+nE)} drawn (animal studies)</text>`;
    s+=`<text x="${sx}" y="${f1(sy+L.ss*56+13)}" class="t-xs t-mid">blue GABA-A · red NMDA</text>`;
    /* Brown 1988 bars */
    const [b0,b1]=L.bx;s+=`<text x="${N?cx0+4:b0-130}" y="${L.bt}" class="t-sm">BROWN 1988: ≥5 PRIOR DETOXES</text>`;
    [[48,'with seizures','var(--glu-fill)'],[12,'without','var(--gaba-fill)']].forEach(([v,nm,col],i)=>{const y=L.by[i],w=(b1-b0)*v/100*bars;
      s+=`<text x="${b0-8}" y="${y+10}" class="t-xs t-end">${nm}</text><rect x="${b0}" y="${y}" width="${b1-b0}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
      if(w>0)s+=`<rect x="${b0}" y="${y}" width="${f1(w)}" height="14" rx="4" style="fill:${col}"/>`;
      s+=`<text x="${f1(b0+Math.max(w,0)+6)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${bars>0?Math.round(v*bars)+'%':''}</text>`});
    s+=`<text x="${N?cx0+4:b0-130}" y="${L.by[1]+32}" class="t-xs">25 men with vs 25 without withdrawal seizures</text>`;
    ks.innerHTML=s;
    const p=phaseOf(WD_K_STEPS,t);setK(p);
    kr.setAttribute('aria-valuetext',`Episode ${nE}: ${WD_K_STEPS[p].t}`);
    $('#wdKNote').innerHTML=noteHTML(WD_K_STEPS[p]);
  }
  const kstop=playWire(kr,$('#wdKPlay'),kdraw,16000,'Replay','withdrawal');
  const setK=stepWire($('#wdKSteps'),WD_K_STEPS,kr,kdraw,kstop);
  kdraw(+kr.value);

  /* ---------- PAWSS teaching checklist ---------- */
  const box=(id,txt,cls)=>`<label class="${cls||''}"><input type="checkbox" id="${id}"><span>${txt}</span></label>`;
  $('#wdPawsGate').insertAdjacentHTML('beforeend',box('wdPg',WD_PAWS_GATE,'gate'));
  $('#wdPawsHx').insertAdjacentHTML('beforeend',WD_PAWS_HX.map((t,i)=>box('wdPh'+i,t)).join(''));
  $('#wdPawsCl').insertAdjacentHTML('beforeend',WD_PAWS_CL.map((t,i)=>box('wdPc'+i,t)).join(''));
  const pv=$('#wdPawsSvg'),out=$('#wdPawsOut');
  function paws(){
    const gate=$('#wdPg').checked,items=$$('#wdPawsHx input,#wdPawsCl input'),n=items.filter(x=>x.checked).length,score=gate?n:0;
    items.forEach(x=>x.closest('label').classList.toggle('off',!gate));
    let s=gauge(160,150,120,score,10,{bands:[{to:4,col:'var(--good)'},{to:10,col:'var(--bad)'}],big:true,label:gate?'teaching score / 10':'threshold question not ticked'});
    /* tick at the published threshold of 4 */
    const a=Math.PI*(1-.4),r0=94,r1=130;s+=`<line x1="${f1(160+r0*Math.cos(a))}" y1="${f1(150-r0*Math.sin(a))}" x2="${f1(160+r1*Math.cos(a))}" y2="${f1(150-r1*Math.sin(a))}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(160+(r1+8)*Math.cos(a)-4)}" y="${f1(150-(r1+8)*Math.sin(a))}" class="t-xs t-end" style="fill:var(--ink)">4</text>`;
    pv.innerHTML=s;
    let v;
    if(!gate)v=`<div class="verdict maybe">The scale opens with the threshold question: alcohol in the last 30 days, or a positive blood alcohol level on admission. Tick it to score the items. PAWSS can be used before any withdrawal signs appear. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup></div>`;
    else if(score>=4)v=`<div class="verdict no">Teaching result: ${score} of 10. A score of 4 or more is the published threshold for <b>higher risk of complicated withdrawal</b> (seizures, delirium tremens). <sup class="c" data-ref="Maldonado2014,Maldonado2015" title="Source 307,308">307,308</sup></div>`;
    else v=`<div class="verdict maybe">Teaching result: ${score} of 10, below the published threshold of 4. In the validation study the negative predictive value at this cut-off was 99.5%, but in a community detox unit the cut-off of 4 did not perform well, and a low score never means withdrawal is safe without help. <sup class="c" data-ref="Maldonado2015,Crepeault2025" title="Source 70,308">70,308</sup></div>`;
    v+=`<p style="font-size:14.5px">Why it matters: ASAM 2020 says withdrawal can usually be managed safely outside hospital when risk factors are limited or mitigated, aiming for the least intensive level of care that is safe and effective. A higher predicted risk is a reason for closer medical supervision. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> Any score here is a teaching example, not a reading of anyone's own risk.</p>`;
    out.innerHTML=v;
  }
  $$('#m-withdrawal .wd-list input').forEach(x=>x.addEventListener('change',paws));
  paws();
};
/* =============== 3.2 CIWA-Ar: scoring withdrawal =============== */
/* items and ranges: Mirijello 2015 table (modified from Sullivan 1989); anchors quoted only where the research has them */
const CI_ITEMS=[
 {n:'Nausea or vomiting',max:7},
 {n:'Tremor',max:7,a0:'none',aM:'severe tremors, even with arms not extended'},
 {n:'Paroxysmal sweats',max:7},
 {n:'Anxiety',max:7},
 {n:'Agitation',max:7},
 {n:'Tactile disturbances',max:7},
 {n:'Auditory disturbances',max:7},
 {n:'Visual disturbances',max:7},
 {n:'Headache',max:7},
 {n:'Orientation and clouding of sensorium',max:4,a0:'orientated, can do serial additions',aM:'disorientated for place and/or person'}
];
const CI_H=72; /* scrubber hours */
const CI_STEPS=[
 {from:0,at:.02,k:'Hour 0',t:'The first score',
  txt:`Both people start with the same withdrawal and the same CIWA-Ar score. In Saitz 1994, 101 inpatients on a VA detox unit were randomised, double-blind, to symptom-triggered or fixed-schedule chlordiazepoxide; people with a history of seizures were excluded. <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup> On a symptom-triggered regimen the score is checked often: Saitz 1998 describes hourly CIWA-Ar in such regimens. <sup class="c" data-ref="Saitz1998AHRW" title="Source 410">410</sup>`,
  pt:`Nurses ask questions and score signs on a checklist called the CIWA-Ar. That helps them give medicine only when it is needed. <sup class="c" data-ref="Saitz1994,ASAM2020Withdrawal" title="Source 20,409">20,409</sup>`,
  hook:`CIWA-Ar: 10 items, nine scored 0–7 and orientation 0–4, maximum 67. <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>`},
 {from:.03,at:.06,k:'Hours 2–8',t:'Score at threshold: a dose',
  txt:`As ASAM 2020 describes, symptom-triggered regimens give medication when scores reach the threshold set by the protocol, and not otherwise. In the fixed lane, tablets come at set times whatever the score. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> The threshold line here is the one in ASAM's published sample regimen (CIWA-Ar ≥10); local protocols set their own. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`In the top lane, medicine follows the score. In the bottom lane, it follows the clock.`,
  hook:`ASAM bands: mild &lt;10, moderate 10–18, severe ≥19. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`},
 {from:.11,at:.14,k:'About 9 h',t:'Symptom-triggered stops',
  txt:`In Saitz 1994 the median duration of symptom-triggered treatment was 9 h, against 68 h on the fixed schedule (P&lt;.001). <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup> Once stable (for example CIWA-Ar &lt;10 for 24 h), ASAM 2020 extends monitoring to every 4–8 hours; before that it re-assesses every 1–4 hours. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  hook:`Saitz 1994: 9 vs 68 h median treatment. <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>`},
 {from:.3,at:.5,k:'Hours 12–68',t:'The fixed schedule keeps going',
  txt:`On the fixed schedule, doses continue on the clock although the score has already settled. In a second trial (Daeppen 2002, oxazepam), only 39% of the symptom-triggered group needed any medicine at all, against 100% on the fixed schedule, with mean doses 37.5 vs 231.4 mg and durations 20.0 vs 62.7 h. <sup class="c" data-ref="Daeppen2002" title="Source 73">73</sup>`,
  pt:`Many people on a symptom-triggered plan need little or no medicine, because their score never reaches the threshold.`},
 {from:.9,at:1,k:'The result',t:'Same outcome, less medicine',
  txt:`Saitz 1994: 100 vs 425 mg chlordiazepoxide (P&lt;.001), with no difference in withdrawal severity, seizures or delirium tremens. <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup> A meta-analysis found that individualising therapy with withdrawal scales gives significantly less medication and shorter treatment. <sup class="c" data-ref="MayoSmith1997" title="Source 321">321</sup> ASAM 2020 calls inpatient symptom-triggered treatment "the preferred benzodiazepine dosing method". It needs a patient who can communicate and who has recently been drinking. <sup class="c" data-ref="ASAM2020Withdrawal,Hecksel2008" title="Source 20,171">20,171</sup>`,
  pt:`Scoring often and treating only when needed gave far less medicine and the same safety, in these trials.`,
  hook:`Symptom-triggered dosing: less drug, shorter course, similar safety (Saitz 1994: 100 vs 425 mg). <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>`}
];

inits.ciwa=()=>{
  /* ---------- calculator ---------- */
  const wrap=$('#ciItems');let mir=false;
  wrap.innerHTML=CI_ITEMS.map((it,i)=>`<div class="ci-item"><div class="ci-top"><label for="ciI${i}"><b>${i+1}. ${it.n}</b></label><output id="ciO${i}">0/${it.max}</output></div>
    <input type="range" id="ciI${i}" min="0" max="${it.max}" step="1" value="0" aria-valuetext="0 of ${it.max}">
    <small>${it.a0?`0 = "${it.a0}" · ${it.max} = "${it.aM}"`:`scored 0 (lowest) to ${it.max} (highest); anchors in the published scale`}</small></div>`).join('');
  const gv=$('#ciGauge'),out=$('#ciOut');
  const ASAMB=[{to:10,col:'var(--good)',n:'mild',r:'&lt;10'},{to:19,col:'var(--warn)',n:'moderate',r:'10–18'},{to:67,col:'var(--bad)',n:'severe',r:'≥19'}];
  const MIRB=[{to:8,col:'var(--good)',n:'mild',r:'&lt;8'},{to:16,col:'var(--warn)',n:'moderate',r:'8–15'},{to:67,col:'var(--bad)',n:'severe',r:'&gt;15'}];
  function calc(){
    let tot=0;CI_ITEMS.forEach((it,i)=>{const r=$('#ciI'+i),v=+r.value;tot+=v;$('#ciO'+i).textContent=v+'/'+it.max;r.setAttribute('aria-valuetext',v+' of '+it.max)});
    const B=mir?MIRB:ASAMB,bi=B.findIndex(b=>tot<b.to),b=B[bi<0?2:bi];
    let s=gauge(170,170,140,tot,67,{bands:B,big:true,label:'teaching total / 67'});
    /* band labels just outside the dial */
    let u0=0;B.forEach(bb=>{const u1=bb.to/67,um=(u0+u1)/2,a=Math.PI*(1-um),lx=170+150*Math.cos(a),ly=170-150*Math.sin(a),an=lx<150?" t-end":lx>190?"":" t-mid";
      s+=`<text x="${f1(lx)}" y="${f1(ly+3)}" class="t-xs${an}" style="fill:${bb.col};font-weight:700">${bb.n}</text>`;u0=u1});
    gv.innerHTML=s;
    out.innerHTML=`<div class="verdict ${bi===0?'yes':bi===1?'maybe':'no'}">Teaching total ${tot} of 67: ${b.n} (${b.r}) on the ${mir?'Mirijello 2015':'ASAM 2020'} bands.</div>
      <p style="font-size:14.5px">${mir?`Mirijello 2015 notes that a score above 15 also predicts seizures and delirium. <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>`:`ASAM 2020 adds a fourth class, complicated: ≥19 with seizure or signs of delirium, and says classification "is ultimately up to the judgment of clinicians". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`} As ASAM 2020 describes, symptom-triggered regimens give medication when scores reach the threshold set by the protocol. This calculator shows no medicine and no dose. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup></p>`;
  }
  $$('#ciItems input').forEach(r=>r.addEventListener('input',calc));
  $('#ciMir').addEventListener('click',e=>{mir=!mir;e.currentTarget.setAttribute('aria-pressed',mir);calc()});
  $('#ciReset').addEventListener('click',()=>{$$('#ciItems input').forEach(r=>r.value=0);calc()});
  calc();

  /* ---------- symptom-triggered vs fixed ---------- */
  const svg=$('#ciSvg'),rg=$('#ciT');
  const score=h=>4+14*Math.exp(-Math.pow((h-5)/4,2))+1.2*Math.sin(h*1.3)*Math.exp(-h/20);
  const TRIG=[];for(let h=0;h<=12;h++)if(score(h)>=10)TRIG.push(h);
  const FIX=[];for(let h=0;h<=66;h+=6)FIX.push(h);
  const doseT=100/TRIG.length,fixW=FIX.map((_,i)=>12-i*.7),fixS=425/fixW.reduce((a,b)=>a+b,0);
  function draw(t){
    const N=vb(svg,'720 400','400 640'),h=t*CI_H;
    const L=N?{x0:40,x1:384,lanes:[{y:56,h:150},{y:330,h:150}],cnt:null,ax:[214,488]}:{x0:60,x1:540,lanes:[{y:46,h:112},{y:236,h:112}],cnt:[566,712],ax:[172,342]};
    const X=v=>L.x0+(L.x1-L.x0)*v/CI_H;
    let s='';
    const lanes=[{nm:'Symptom-triggered',sub:'dose only when the score reaches the threshold',dz:TRIG,w:()=>doseT,end:9,tot:100,col:'var(--rx)'},
                 {nm:'Fixed schedule',sub:'doses on the clock, whatever the score',dz:FIX,w:i=>fixW[i]*fixS,end:68,tot:425,col:'var(--accent)'}];
    lanes.forEach((ln,li)=>{const g=L.lanes[li],Y=v=>g.y+g.h-g.h*v/25;
      s+=`<rect x="${L.x0}" y="${g.y}" width="${L.x1-L.x0}" height="${g.h}" style="fill:var(--field)"/>`;
      s+=`<text x="${L.x0}" y="${g.y-24}" class="t-lbl" style="fill:${ln.col}">${ln.nm}</text><text x="${L.x0}" y="${g.y-10}" class="t-xs">${ln.sub}</text>`;
      [0,10,20].forEach(v=>s+=`<text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(10))}" y2="${f1(Y(10))}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 4"/><text x="${L.x1-4}" y="${f1(Y(10)-5)}" class="t-xs t-end" style="fill:var(--bad)">protocol threshold (ASAM sample: ≥10)</text>`;
      /* treatment running bar */
      const run=Math.min(h,ln.end);s+=`<rect x="${L.x0}" y="${g.y+g.h+4}" width="${f1(X(run)-L.x0)}" height="5" rx="2.5" style="fill:${ln.col};opacity:.7"/>`;
      if(h>=ln.end)s+=ln.end>36?`<text x="${f1(X(ln.end))}" y="${g.y+g.h-6}" class="t-xs t-end" style="fill:${ln.col}">treatment ends ≈${ln.end} h</text>`:`<text x="${f1(X(ln.end)+4)}" y="${g.y+g.h+10}" class="t-xs" style="fill:${ln.col}">treatment ends ≈${ln.end} h</text>`;
      /* score curve up to h, with hourly check dots in the triggered lane */
      let d='';for(let v=0;v<=h+1e-9;v+=.25)d+=(d?'L':'M')+f1(X(v))+' '+f1(Y(score(v)));
      if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>`;
      if(li===0)for(let v=0;v<=Math.min(h,24);v++){const sc=score(v);s+=`<circle cx="${f1(X(v))}" cy="${f1(Y(sc))}" r="2.6" style="fill:${sc>=10?'var(--bad)':'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`}
      /* tablets */
      let cum=0;ln.dz.forEach((dh,i)=>{if(dh>h)return;cum+=ln.w(i);const age=h-dh,sz=li?(11+fixW[i])*(N?.9:1):9,py=li?g.y+16+(i%2)*14:g.y+10+(i%3)*10;
        s+=pill(X(dh),py,sz,{ang:-20,col:ln.col,round:!li});if(age<1.2)s+=`<circle cx="${f1(X(dh))}" cy="${f1(py)}" r="${f1(10+age*8)}" style="fill:none;stroke:${ln.col};opacity:${f1(1-age/1.2)}"/>`});
      ln.cum=Math.round(cum);ln.run=run;
      /* counter */
      if(L.cnt){const [c0,c1]=L.cnt,cy=g.y+10;
        s+=`<text x="${c0}" y="${cy+8}" class="t-xs">medicine so far</text><text x="${c0}" y="${cy+40}" style="font:800 30px var(--display);fill:${ln.col}">${ln.cum}</text><text x="${c0}" y="${cy+54}" class="t-xs">mg, scaled to Saitz 1994</text>`;
        s+=`<text x="${c0}" y="${cy+80}" class="t-xs">treatment running</text><text x="${c0}" y="${cy+106}" style="font:800 22px var(--display);fill:var(--ink)">${f1(run)} h</text>`;
        s+=`<rect x="${c0}" y="${cy+114}" width="${c1-c0}" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="${c0}" y="${cy+114}" width="${f1((c1-c0)*ln.cum/425)}" height="5" rx="2.5" style="fill:${ln.col}"/>`}
    });
    /* axis and playhead */
    const ay=L.lanes[1].y+L.lanes[1].h+(N?52:26),tl=tline(L.x0,ay,L.x1-L.x0,{min:0,max:CI_H,step:12,fmt:v=>v+' h'});s+=tl.svg;
    const hx=X(h);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.lanes[0].y}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.4;opacity:.6"/>`;
    if(!L.cnt){/* narrow: counters as one row each under the lane */
      lanes.forEach((ln,li)=>{const g=L.lanes[li],yy=g.y+g.h+28;s+=`<text x="${L.x0}" y="${yy}" class="t-sm" style="fill:${ln.col};font-weight:700">${ln.cum} mg so far · ${f1(ln.run)} h running</text>`})}
    svg.innerHTML=s;
    const p=phaseOf(CI_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`${Math.round(h)} hours: ${CI_STEPS[p].t}`);
    $('#ciRead').innerHTML=`<span>hour <b>${Math.round(h)}</b></span><span>score now <b>${score(h).toFixed(0)}</b></span><span>symptom-triggered <b>${lanes[0].cum} mg · ${f1(lanes[0].run)} h</b></span><span>fixed <b>${lanes[1].cum} mg · ${f1(lanes[1].run)} h</b></span>`;
    $('#ciNote').innerHTML=noteHTML(CI_STEPS[p]);
  }
  const stop=playWire(rg,$('#ciPlay'),draw,22000,'Replay','ciwa');
  const setSt=stepWire($('#ciSteps'),CI_STEPS,rg,draw,stop);
  draw(+rg.value);
};
/* =============== 3.3 Managing withdrawal safely =============== */
/* word-wrap for SVG labels: splits text into lines of at most n characters */
function dxWrap(s,n){const w=[];String(s).split(' ').forEach(x=>{if(x.length>n&&x.includes('-')){const i=x.indexOf('-');w.push(x.slice(0,i+1),x.slice(i+1))}else w.push(x)});const L=[];let c='';w.forEach(x=>{if(!c)c=x;else if((c+(c.endsWith('-')?'':' ')+x).length<=n)c+=(c.endsWith('-')?'':' ')+x;else{L.push(c);c=x}});if(c)L.push(c);return L}
const DX_COLS=[
 {k:'assess',h:'1 · Assess risk',opts:[{id:'hx',t:'Past seizure or delirium tremens'},{id:'paws',t:'PAWSS risk score'},{id:'ciwa',t:'CIWA-Ar severity now'},{id:'ill',t:'Illness, mood and support'}]},
 {k:'set',h:'2 · Setting',opts:[{id:'l1',t:'Ambulatory (Level 1-WM)',d:'CIWA-Ar <10 appropriate'},{id:'l2',t:'Extended on-site monitoring (Level 2-WM)',d:'CIWA-Ar <18 appropriate'},{id:'inp',t:'Inpatient',d:'severe, complicated, pregnancy'},{id:'icu',t:'Intensive care',d:'delirium, resistant withdrawal'}]},
 {k:'med',h:'3 · Medicines',opts:[{id:'cg',t:'Carbamazepine or gabapentin',d:'mild; moderate alternative'},{id:'bst',t:'Benzodiazepine, symptom-triggered',d:'preferred inpatient method'},{id:'bfl',t:'Benzodiazepine front loading',d:'CIWA-Ar ≥19'},{id:'icu',t:'ICU agents: phenobarbital, propofol, dexmedetomidine',d:'experienced clinicians only'}]},
 {k:'adj',h:'4 · Adjuncts',opts:[{id:'thi',t:'Thiamine (vitamin B1)'},{id:'flu',t:'Fluids'},{id:'ele',t:'Electrolytes: magnesium, phosphate'}]},
 {k:'next',h:'5 · Next steps',opts:[{id:'rx',t:'AUD medicines',d:'start when thinking is clear'},{id:'tt',t:'Therapy and mutual help',d:'MI, CBT, AA, SMART'},{id:'wh',t:'Warm handoff',d:'to treatment providers'}]}
];
const DX_NAMES={mild:'Mild, low risk',mod:'Moderate, no complications',sev:'Severe, or past seizure or DT',del:'Delirium or resistant withdrawal'};
/* the route an example person takes, from the ASAM 2020 recommendations quoted in the notes */
function dxRoute(sc,liver,preg){
  const R={sc,liver,preg,assess:{},set:'',setAlt:[],med:'',medAlt:[],adj:{},ciwa:null};
  const A={
    mild:{hx:['none',0],paws:['under 4: lower risk',0],ciwa:['example 6: mild',0],ill:['none; support at home',0]},
    mod:{hx:['none',0],paws:['under 4: lower risk',0],ciwa:['example 14: moderate',1],ill:['none; can attend daily',0]},
    sev:{hx:['past withdrawal seizure',1],paws:['4 or more: high risk',1],ciwa:['example 24: severe',1],ill:['medical illness',1]},
    del:{hx:['past delirium tremens',1],paws:['4 or more: high risk',1],ciwa:['not used in delirium: RASS, CAM-ICU',1],ill:['acute illness',1]}}[sc];
  R.assess=Object.assign({},A);
  if(preg)R.assess.ill=['pregnant: obstetric consult',1];
  R.ciwa={mild:6,mod:14,sev:24,del:null}[sc];
  R.set={mild:'l1',mod:'l2',sev:'inp',del:'icu'}[sc];
  if(sc==='mod')R.setAlt=['l1','inp'];
  if(preg&&(sc==='mild'||sc==='mod')){R.set='inp';R.setAlt=[]}
  R.med={mild:'cg',mod:'bst',sev:'bfl',del:'icu'}[sc];
  if(sc==='mod')R.medAlt=['cg'];
  if(sc==='del')R.medAlt=['bfl'];
  if(preg&&R.med==='cg'){R.med='bst';R.medAlt=[]}
  if(preg&&sc==='mod')R.medAlt=[];
  const amb=R.set==='l1'||R.set==='l2';
  R.adj={thi:amb?'oral, as published':'IV or IM preferred',flu:amb?'non-caffeinated drinks':R.set==='icu'?'immediate IV access':'intake and output',
    ele:sc==='sev'?'magnesium: past seizures':sc==='del'?'watch sodium, acidosis':'check, correct if low'};
  return R}
const DX_STEPS=[
 {from:0,at:.09,k:'Step 1 · Assess',t:'Assess the risk'},
 {from:.2,at:.29,k:'Step 2 · Setting',t:'Choose a setting'},
 {from:.4,at:.49,k:'Step 3 · Medicines',t:'Choose medicines'},
 {from:.6,at:.69,k:'Step 4 · Adjuncts',t:'Thiamine, fluids, electrolytes'},
 {from:.8,at:.92,k:'Step 5 · Next',t:'Link to AUD treatment'}];
function dxNote(i,R){const S=DX_STEPS[i],sc=R.sc,o={k:S.k+' · '+DX_NAMES[sc]+(R.liver?' · liver disease':'')+(R.preg?' · pregnant':''),t:S.t};
  if(i===0){
    o.t='Who is at risk of complicated withdrawal?';
    o.txt=`ASAM 2020 lists the risk factors: past withdrawal delirium or seizure, many prior withdrawals, medical or surgical illness (especially traumatic brain injury), age over 65, long heavy drinking, a seizure in this episode, marked autonomic overactivity, and dependence on benzodiazepines or barbiturates. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> The PAWSS can be used before any signs appear: at 4 or more it had a sensitivity of 93.1% and specificity of 99.5% in medically ill inpatients, but performed poorly in a community detox unit where severe withdrawal was common. <sup class="c" data-ref="Maldonado2015,Crepeault2025" title="Source 70,308">70,308</sup> CIWA-Ar measures how severe withdrawal is now (ASAM bands: under 10, 10–18, 19 or more); ASAM says it "should not be used as a diagnostic tool". Suicide risk is assessed at intake. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> `+
      {mild:'This example person has none of the risk factors, and an example CIWA-Ar of 6 sits in the mild band.',
       mod:'This example person has no complicating factors, but an example CIWA-Ar of 14 is in the moderate band.',
       sev:'This example person had a seizure in a past withdrawal, scores high on PAWSS, and an example CIWA-Ar of 24 is in the severe band.',
       del:'This example person is delirious. CIWA-Ar relies on what the person reports, so ASAM does not recommend it in delirium: CAM-ICU, RASS or similar tools are used instead. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>'}[sc]+
      (R.preg?' Pregnancy changes the setting: see step 2.':'');
    o.pt='Before deciding where and how, the team asks: has this person had seizures or DTs before, how strong are the symptoms now, are they ill in other ways, and is someone at home to help?';
    o.hook='The strongest predictor of DT or seizures is a past DT or seizure (OR 2.58 and 2.8). Low platelets and low potassium also predict DT. <sup class="c" data-ref="Goodson2014" title="Source 143">143</sup>'}
  if(i===1){
    o.t={l1:'Ambulatory care with daily check-ins',l2:'Ambulatory, with extended on-site monitoring',inp:'An inpatient bed',icu:'Intensive care'}[R.set];
    o.txt=`ASAM 2020: withdrawal can usually be managed safely as an outpatient when risk factors are limited, aiming for the least intensive setting that is safe and effective. Its placement table rates outpatient care (Level 1-WM) appropriate for mild withdrawal (CIWA-Ar under 10), uncertain for moderate (10–18) and inappropriate for severe or complicated (19 or more); extended on-site monitoring (Level 2-WM) is appropriate below 18. Outpatients check in daily for up to 5 days. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> `+
      {l1:'Transfer to more intensive care if agitation or tremor persist despite several doses, vomiting, hallucinations, confusion, a seizure, over-sedation, a return to drinking, fainting or unstable vital signs. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       l2:'For moderate withdrawal without complications, on-site monitoring is appropriate; plain outpatient care is "neutral or uncertain", and drinking more than 8 standard drinks a day is also flagged as uncertain. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       inp:R.preg?'ASAM: consider inpatient care for every pregnant patient who needs withdrawal management, offer it at CIWA-Ar 10 or more, and consult an obstetrician. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>':'Severe or complicated withdrawal is inappropriate for outpatient care. After a withdrawal seizure, ASAM asks for a closely monitored setting with reassessment every 1–2 hours for 6–24 hours. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       icu:'Delirium tremens should be managed in an ICU or a ward with vital-sign monitoring: untreated or late-recognised, it can be fatal through arrhythmia, respiratory arrest, sepsis, electrolyte disturbance or prolonged seizures. <sup class="c" data-ref="Mainerova2015" title="Source 304">304</sup>'}[R.set];
    o.pt='Most people can be helped to withdraw safely at home or at a clinic with daily check-ins. Some need a hospital bed, and a few need intensive care. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>';
    o.hook='Emergency-department discharge to outpatient care needs all of: mild (or uncomplicated moderate) withdrawal, not intoxicated, no past seizures or delirium in withdrawal, no significant comorbidity, able to attend follow-up. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>'}
  if(i===2){
    o.t={cg:'Carbamazepine or gabapentin',bst:'A benzodiazepine, symptom-triggered',bfl:'Benzodiazepine front loading',icu:'Specialist ICU medicines'}[R.med];
    o.txt=`Benzodiazepines are first line because they reduce both seizures and delirium (Mayo-Smith 1997: 7.7 fewer seizures and 4.9 fewer cases of delirium per 100 patients). <sup class="c" data-ref="MayoSmith1997" title="Source 321">321</sup> `+
      {cg:'For mild withdrawal, ASAM rates carbamazepine or gabapentin appropriate. In outpatient care, it also asks that benzodiazepine supplies be kept to the minimum, with these two as alternatives. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       bst:(R.preg?'In pregnancy, ASAM names benzodiazepines and barbiturates the medicines of choice, judging the risks of severe withdrawal greater than the small first-trimester risks. ':'For moderate withdrawal, benzodiazepines come first, with carbamazepine or gabapentin as alternatives. ')+'Inpatient symptom-triggered treatment "is the preferred benzodiazepine dosing method". ASAM\'s sample regimen, quoted as published and not an instruction: chlordiazepoxide "25-100 mg PO q4-6h when CIWA-Ar ≥ 10. Additional doses PRN". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       bfl:'For severe withdrawal (CIWA-Ar 19 or more) ASAM recommends front loading, preferring diazepam or chlordiazepoxide. Its sample, quoted as published and not an instruction: chlordiazepoxide "50-100 mg PO q1-2h until CIWA-Ar < 10". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>',
       icu:'In delirium, very large benzodiazepine doses may be needed. For resistant withdrawal ASAM allows phenobarbital (only by clinicians experienced with it, "given its narrow therapeutic window"), propofol in people who already need a ventilator, and dexmedetomidine in the ICU. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>'}[R.med]+
      (R.liver?' <b>Liver disease:</b> ASAM asks for an agent with less hepatic metabolism, warns of accumulation in older adults and in liver disease, and rules out valproic acid. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>':'');
    o.pt='Benzodiazepines calm the over-excited brain and lower the chance of seizures and DTs. "Symptom-triggered" means a dose is given only when the checklist score shows it is needed.';
    o.hook='Symptom-triggered dosing used less drug for a shorter time with similar safety (Saitz 1994: 100 vs 425 mg chlordiazepoxide; 9 vs 68 hours). <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>'}
  if(i===3){
    const amb=R.set==='l1'||R.set==='l2';
    o.t='Protect the brain, correct the body';
    o.txt=(amb?'In ambulatory care, ASAM says oral thiamine can be offered: "Typical dosing is 100 mg PO per day for 3-5 days" (quoted as published). Patients drink non-caffeinated fluids, and a daily multivitamin may help. ':'In inpatient care, ASAM prefers IV or IM thiamine, typically "100 mg IV/IM per day for 3-5 days" (quoted as published), and says thiamine and glucose may be given "in any order or concurrently". ')+
      `Magnesium is given for low magnesium, arrhythmias, electrolyte disturbances or past withdrawal seizures; phosphorus is supplemented below 1 mg/dL. Emergency patients get a blood count and a metabolic panel including liver enzymes and magnesium, without delaying withdrawal treatment for the results. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> `+
      (R.sc==='del'?'People given repeated high IV doses of lorazepam or diazepam are watched for low sodium and metabolic acidosis. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> ':'')+
      'The full thiamine story is in <a href="#wernicke" data-go="wernicke">Thiamine, Wernicke and Korsakoff</a>.';
    o.pt='Vitamin B1 (thiamine) protects the brain. Fluids and salts such as magnesium are checked and topped up when they are low.';
    o.hook='Magnesium given only as a treatment for withdrawal itself "has no supporting evidence": it is for low levels and specific problems. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>'}
  if(i===4){
    o.t='A way into treatment';
    o.txt='ASAM 2020: withdrawal management alone "is not an effective treatment for alcohol use disorder". The withdrawal period is used to engage the person in treatment, including starting an AUD medicine when thinking allows, and a "warm handoff" to treatment providers. Gabapentin is a favourable withdrawal choice when the clinician also plans to use it for ongoing AUD treatment. The word "withdrawal management" has replaced the older "detoxification". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> See <a href="#medicines" data-go="medicines">approved medicines</a> and <a href="#therapy" data-go="therapy">talking therapies</a>.';
    o.pt='Getting through withdrawal is a first step. Ongoing treatment for alcohol use disorder is what helps recovery last. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>';
    o.hook='Repeated withdrawals may "kindle" worse ones: in Brown 1988, 48% of people with withdrawal seizures had 5 or more prior detoxifications, against 12% without seizures. <sup class="c" data-ref="Brown1988Kindling" title="Source 51">51</sup>'}
  return o}

inits.detox=()=>{
  const svg=$('#dxSvg'),rg=$('#dxT');let sc='mild',liver=false,preg=false,setSt=()=>{};
  /* layout of the five stages: wide = columns, narrow = rows */
  function layout(N,R){const cols=[];
    if(!N){DX_COLS.forEach((C,c)=>{const x=12+c*142,w=130;let y=48;const boxes=C.opts.map(op=>{const tl=dxWrap(op.t,18),vl=dxWrap(dxVal(C,op,R),20);const h=12+tl.length*12.5+vl.length*11.5+5;const b={op,x,y,w,h,tl,vl};y+=h+7;return b});cols.push({C,x,w,hy:32,boxes,bot:y})});
      const mb=Math.max(...cols.map(c=>c.bot));return {cols,W:720,H:Math.round(mb+92),strip:{x0:56,x1:680,y:mb+40}}}
    let y=26;DX_COLS.forEach((C,c)=>{const n=C.opts.length,w=(376-(n-1)*5)/n;const hy=y+10;const boxes=C.opts.map((op,i)=>{const tl=dxWrap(op.t,Math.floor((w-8)/5.9)),vl=dxWrap(dxVal(C,op,R),Math.floor((w-8)/5.25));return {op,x:12+i*(w+5),y:y+18,w,tl,vl}});
      const h=Math.max(...boxes.map(b=>10+b.tl.length*11.5+b.vl.length*10.5+5));boxes.forEach(b=>b.h=h);cols.push({C,x:12,w:376,hy,boxes,bot:y+18+h});y+=18+h+16});
    return {cols,W:400,H:Math.round(y+96),strip:{x0:30,x1:370,y:y+40}}}
  function dxVal(C,op,R){if(C.k==='assess')return R.assess[op.id][0];if(C.k==='adj')return R.adj[op.id];if(C.k==='med'&&R.liver&&op.id===R.med&&op.id!=='cg')return op.d+'; liver: less hepatic metabolism';return op.d||''}
  function state(C,op,R){if(C.k==='assess')return R.assess[op.id][1]?'risk':'ok';if(C.k==='adj'||C.k==='next')return 'on';
    const ch=C.k==='set'?R.set:R.med,al=C.k==='set'?R.setAlt:R.medAlt;return op.id===ch?'on':al.includes(op.id)?'alt':'off'}
  function draw(t){
    const R=dxRoute(sc,liver,preg),N=NARROW(),L=layout(N,R);vb(svg,'720 '+L.H,'400 '+L.H);
    const pos=clamp((t-.06)/.86)*4,ph=phaseOf(DX_STEPS,t);let s=`<defs>${marker('dxA','var(--accent)')}</defs>`;
    /* path points: the chosen box in each stage */
    const P=L.cols.map((col,c)=>{let b;if(c===0||c===3||c===4){const a=col.boxes[0],z=col.boxes[col.boxes.length-1];return N?[(a.x+z.x+z.w)/2,a.y-4]:[a.x-1,(a.y+z.y+z.h)/2]}
      b=col.boxes.find(bb=>state(col.C,bb.op,R)==='on');return N?[b.x+b.w/2,b.y-4]:[b.x-1,b.y+b.h/2]});
    /* stage headers */
    L.cols.forEach((col,c)=>{const reached=pos>=c-.5;s+=`<text x="${f1(N?col.x:col.x+col.w/2)}" y="${f1(col.hy)}" class="t-sm${N?'':' t-mid'}" style="fill:${reached?'var(--accent)':'var(--muted)'};font-weight:600">${col.C.h.toUpperCase()}</text>`});
    /* path behind the boxes */
    let dd='';P.forEach((p,i)=>{dd+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])});
    s+=`<path d="${dd}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:4 5"/>`;
    const seg=Math.min(3,Math.floor(pos)),fr=ease(clamp(pos-seg)),tok=[lerp(P[seg][0],P[seg+1][0],fr),lerp(P[seg][1],P[seg+1][1],fr)];
    let dn='M'+f1(P[0][0])+' '+f1(P[0][1]);for(let i=1;i<=seg;i++)dn+='L'+f1(P[i][0])+' '+f1(P[i][1]);dn+='L'+f1(tok[0])+' '+f1(tok[1]);
    s+=`<path d="${dn}" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:.75"/>`;
    /* boxes */
    L.cols.forEach((col,c)=>{const reached=pos>=c-.45;col.boxes.forEach(b=>{const st=state(col.C,b.op,R);
      let fill='var(--panel-2)',stroke='var(--line)',sw=1,op=.9,dash='';
      if(reached){if(st==='on'){fill='var(--accent-soft)';stroke='var(--accent)';sw=2.2;op=1}
        else if(st==='alt'){fill='var(--panel)';stroke='var(--accent)';sw=1.4;dash='4 3';op=1}
        else if(st==='risk'){fill='var(--bad-soft)';stroke='var(--bad)';sw=1.6;op=1}
        else if(st==='ok'){fill='var(--good-soft)';stroke='var(--good)';sw=1.2;op=1}
        else op=.5}
      s+=`<rect x="${f1(b.x)}" y="${f1(b.y)}" width="${f1(b.w)}" height="${f1(b.h)}" rx="8" style="fill:${fill};stroke:${stroke};stroke-width:${sw};opacity:${op}${dash?';stroke-dasharray:'+dash:''}"/>`;
      const tx=b.x+(N?5:7);let ty=b.y+(N?13:15);
      b.tl.forEach(l=>{s+=`<text x="${f1(tx)}" y="${f1(ty)}" style="font:700 ${N?10:11}px var(--body);fill:var(--ink);opacity:${reached||st!=='off'?1:.75}">${l}</text>`;ty+=N?11.5:12.5});
      ty+=1;const vc=!reached?'var(--muted)':st==='risk'?'var(--bad)':st==='ok'?'var(--good)':st==='on'?'var(--accent)':'var(--muted)';
      b.vl.forEach(l=>{s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs" style="fill:${vc}${N?';font-size:9px':''}">${l}</text>`;ty+=N?10.5:11.5});
      if(reached&&st==='on'&&(col.C.k==='set'||col.C.k==='med'))s+=`<circle cx="${f1(b.x+b.w-9)}" cy="${f1(b.y+9)}" r="4" style="fill:var(--accent)"/>`;
      if(reached&&st==='alt')s+=`<text x="${f1(b.x+b.w-5)}" y="${f1(b.y+b.h-5)}" class="t-xs t-end" style="fill:var(--accent)">alt.</text>`;
})});
    /* token: a person in a circle */
    s+=`<circle cx="${f1(tok[0])}" cy="${f1(tok[1])}" r="9.5" style="fill:var(--ember);stroke:var(--panel);stroke-width:2"/>`+person(tok[0],tok[1]-6,12,'var(--panel)');
    /* CIWA-Ar strip */
    const S=L.strip,mx=30,X=v=>lerp(S.x0,S.x1,v/mx),y=S.y;
    s+=`<text x="${S.x0}" y="${f1(y-30)}" class="t-sm" style="font-weight:600">CIWA-Ar BANDS (ASAM 2020)${N?'':' · scale to 30 of a possible 67 · ▼ = an example score, not a real patient'}</text>`;
    [[0,10,'var(--good)','mild <10'],[10,19,'var(--warn)','moderate 10–18'],[19,30,'var(--bad)','severe ≥19']].forEach(([a,b2,c,l])=>{s+=`<rect x="${f1(X(a))}" y="${f1(y-12)}" width="${f1(X(b2)-X(a)-1)}" height="16" rx="3" style="fill:${c};opacity:.2"/><text x="${f1((X(a)+X(b2))/2)}" y="${f1(y)}" class="t-xs t-mid" style="fill:${c}">${l}</text>`});
    [0,10,19,30].forEach(v=>s+=`<text x="${f1(X(v))}" y="${f1(y+18)}" class="t-xs t-mid">${v}</text>`);
    if(R.ciwa!=null){const v=R.ciwa*ease(ramp(t,0,.1)),xm=X(v);s+=`<path d="M${f1(xm)} ${f1(y-14)}l-6 -9h12Z" style="fill:var(--ink)"/><text x="${f1(xm)}" y="${f1(y+32)}" class="t-xs t-mid" style="fill:var(--ink)">example ${Math.round(v)}</text>`}
    else s+=`<text x="${f1((S.x0+S.x1)/2)}" y="${f1(y+34)}" class="t-xs t-mid" style="fill:var(--bad)">${N?'delirium: CIWA-Ar not used; RASS or CAM-ICU':'In delirium CIWA-Ar is not recommended: RASS or CAM-ICU are used instead (ASAM VI.9)'}</text>`;
    svg.innerHTML=s;setSt(ph);
    const nm=(k,id)=>DX_COLS.find(C=>C.k===k).opts.find(o=>o.id===id).t;
    $('#dxRead').innerHTML=`<span>person <b>${DX_NAMES[sc]}${liver?' + liver disease':''}${preg?' + pregnant':''}</b></span><span>setting <b>${nm('set',R.set)}</b></span><span>medicine <b>${nm('med',R.med)}</b></span><span>thiamine <b>${R.adj.thi}</b></span>`;
    $('#dxNote').innerHTML=noteHTML(dxNote(ph,R));
  }
  const stop=playWire(rg,$('#dxPlay'),draw,16000,'Replay','detox');
  setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  $$('[data-dxs]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.dxs;$$('[data-dxs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#dxLiver').addEventListener('click',()=>{liver=!liver;$('#dxLiver').setAttribute('aria-pressed',liver);draw(+rg.value)});
  $('#dxPreg').addEventListener('click',()=>{preg=!preg;$('#dxPreg').setAttribute('aria-pressed',preg);draw(+rg.value)});
  draw(+rg.value);

  /* ---- longer- vs shorter-acting: schematic levels over 72 hours ---- */
  const bz=$('#dxBz'),br=$('#dxBzT');let mode='both',acc=false;
  const DOSES=[0,8,16,24,32,40];
  function lev(k,h){const ka=1.6;let c=0;DOSES.forEach(d=>{if(h>=d){const u=h-d;c+=ka/(ka-k)*(Math.exp(-k*u)-Math.exp(-ka*u))}});return c}
  /* normalise each agent to a schematic peak under normal clearance */
  const pk=(k)=>{let m=0;for(let h=0;h<=48;h+=.25)m=Math.max(m,lev(k,h));return m};
  const KL=.035,KS=.26,NL=.62/pk(KL),NS=.74/pk(KS);
  const fL=h=>NL*lev(acc?KL*.3:KL,h),fS=h=>NS*lev(acc?KS*.7:KS,h);
  function drawB(t){const N=vb(bz,'720 300','400 346');const H=t*72;
    const x0=N?40:58,x1=N?384:700,y0=N?52:40,y1=N?292:230,X=h=>lerp(x0,x1,h/72),Y=v=>lerp(y1,y0,clamp(v,0,1.05)/1.05);
    let s=`<rect x="${x0}" y="${f1(Y(.3))}" width="${x1-x0}" height="${f1(y1-Y(.3))}" style="fill:var(--glu-soft);opacity:.8"/><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${f1(Y(.86)-y0)}" style="fill:var(--gaba-soft);opacity:.9"/>`;
    s+=`<text x="${x1-6}" y="${f1(y0+13)}" class="t-xs t-end" style="fill:var(--gaba)">too much: over-sedation</text><rect x="${x0}" y="${y1+34}" width="10" height="9" style="fill:var(--glu-soft);stroke:var(--glu);stroke-width:.8"/><text x="${x0+15}" y="${y1+42}" class="t-xs" style="fill:var(--glu)">too little: withdrawal symptoms can return</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y1}" class="axis"/>`;
    [0,12,24,36,48,60,72].forEach(h=>s+=`<text x="${f1(X(h))}" y="${y1+14}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${x1}" y="${y1+28}" class="t-xs t-end">hours after the first dose (schematic)</text><text x="${x0-6}" y="${f1(Y(.55))}" class="t-xs t-end" transform="rotate(-90 ${x0-10} ${f1(Y(.55))})">drug effect</text>`;
    DOSES.forEach(d=>{s+=`<path d="M${f1(X(d))} ${y1+2}l-4 7h8Z" style="fill:var(--rx);opacity:${H>=d?1:.3}"/>`});
    s+=`<text x="${f1(X(20))}" y="${N?y0-26:y0-12}" class="t-xs t-mid" style="fill:var(--rx)">▲ doses, then the taper ends at 40 h</text>`;
    const line=(f,col,lab,dash)=>{if(H<=0)return '';const d=pathFn(u=>f(u*H)/1.05,x0,X(H),y1,y0,220);const e=f(H);
      return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/><circle cx="${f1(X(H))}" cy="${f1(Y(e))}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`};
    if(mode!=='short')s+=line(fL,'var(--rx)');
    if(mode!=='long'){s+=line(fS,'var(--accent)','',acc?'':'');
      /* mark dips into the symptom band */
      for(let h=4;h<=Math.min(H,72);h+=.5){const v=fS(h),p=fS(h-.5),n=fS(h+.5);if(v<.3&&v<=p&&v<=n)s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(v))}" r="6.5" style="fill:none;stroke:var(--glu);stroke-width:1.8"/>`}}
    if(mode!=='long'&&!acc&&H>=54)s+=`<text x="${x1}" y="${f1(Y(.3)-6)}" class="t-xs t-end" style="fill:var(--accent)">${N?'short: rebound':'shorter-acting: rebound'}</text>`;
    if(mode!=='short'&&H>=54)s+=`<text x="${x1}" y="${f1(Y(fL(54))-10)}" class="t-xs t-end" style="fill:var(--rx)">${N?'long: tapers itself':'longer-acting: tapers itself'}</text>`;
    if(acc&&mode!=='short'&&H>=30)s+=`<text x="${x0+6}" y="${f1(y0+13)}" class="t-xs" style="fill:var(--gaba)">both accumulate</text>`;
    s+=`<g transform="translate(${x0} ${N?18:14})"><line x1="0" x2="18" y1="0" y2="0" style="stroke:var(--rx);stroke-width:3"/><text x="24" y="3.5" class="t-xs">longer-acting</text><line x1="${N?110:120}" x2="${N?128:138}" y1="0" y2="0" style="stroke:var(--accent);stroke-width:3"/><text x="${N?134:144}" y="3.5" class="t-xs">shorter-acting</text>${N?'':'<circle cx="262" cy="0" r="5" style="fill:none;stroke:var(--glu);stroke-width:1.6"/><text x="272" y="3.5" class="t-xs">dip into the symptom band</text>'}</g>`;
    bz.innerHTML=s;
    const late=H>=44;
    $('#dxBzNote').innerHTML=noteHTML({k:`Hour ${Math.round(H)} · ${acc?'older adult or liver disease':'usual clearance'}`,t:acc?'When the drug piles up':late?'After the last dose':'During dosing',
      txt:acc?'ASAM 2020 warns that very large benzodiazepine doses can accumulate in older adults and in people with liver disease, causing over-sedation and slowed breathing, and asks for an agent with less hepatic metabolism in significant liver disease. Here both schematic curves clear more slowly, and the longer-acting one climbs into the over-sedation band. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>':
        late?'Once doses stop, a longer-acting agent fades gradually: it "tapers itself", giving a smoother course with less rebound. A shorter-acting agent falls quickly, and Saitz describes more risk of rebound symptoms with short-acting agents, including late seizures. ASAM\'s sample fixed-schedule regimen tapers the daily dose "by 25-50% per day over 3-5 days" (quoted, not an instruction). <sup class="c" data-ref="Saitz1998AHRW,ASAM2020Withdrawal" title="Source 20,410">20,410</sup>':
        'With repeated doses, a longer-acting agent builds to an even level. A shorter-acting agent peaks and dips with every dose, and between doses the effect can sink low enough for symptoms to return (circled). ASAM still finds no benzodiazepine more effective than another: duration and liver handling, not strength, guide the choice. <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>',
      pt:acc?'In an older person or someone whose liver works poorly, the medicine can build up and make them too sleepy. Teams watch for this closely.':'A longer-acting medicine is like a slow dimmer; a shorter-acting one switches on and off. The slow one gives a steadier ride.',
      hook:'ASAM prefers longer-acting benzodiazepines (diazepam, chlordiazepoxide for front loading); in significant liver disease, an agent with less hepatic metabolism. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>'});
  }
  playWire(br,$('#dxBzPlay'),drawB,9000,'Replay','detox');
  $$('[data-dxb]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.dxb;$$('[data-dxb]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB(+br.value)}));
  $('#dxAcc').addEventListener('click',()=>{acc=!acc;$('#dxAcc').setAttribute('aria-pressed',acc);drawB(+br.value)});
  drawB(+br.value);

  /* ---- trial results as bars ---- */
  const fx=$('#dxFx');let fset='ms',stopF=null;
  const FX={
   ms:{t:'Benzodiazepines prevent seizures and delirium',unit:'fewer cases per 100 patients',max:14,
     rows:[{l:'Seizures',v:7.7,lo:3.5,hi:12,txt:'7.7 (95% CI 3.5–12.0)'},{l:'Delirium',v:4.9,lo:.7,hi:9,txt:'4.9 (95% CI 0.7–9.0)'}],
     cap:'Mayo-Smith 1997 ASAM meta-analysis: benzodiazepines against control. The 2010 Cochrane review found benzodiazepines protected against seizures against placebo (RR 0.16, 95% CI 0.04–0.69). <sup class="c" data-ref="MayoSmith1997,Amato2010Cochrane" title="Source 8,321">8,321</sup>'},
   st:{t:'Symptom-triggered vs fixed schedule',pairs:true,
     rows:[{l:'Saitz 1994: hours of treatment (median)',a:9,b:68,u:'h'},{l:'Saitz 1994: chlordiazepoxide (mg)',a:100,b:425,u:'mg'},{l:'Daeppen 2002: hours (mean)',a:20.0,b:62.7,u:'h'},{l:'Daeppen 2002: oxazepam (mg, mean)',a:37.5,b:231.4,u:'mg'},{l:'Daeppen 2002: people given any drug',a:39,b:100,u:'%'}],
     la:'symptom-triggered',lb:'fixed schedule',
     cap:'Two double-blind trials. Saitz 1994 (101 inpatients, history of seizures excluded): no difference in severity, seizures or DT. Daeppen 2002 (117 patients): one seizure in the symptom-triggered group; comfort did not differ. <sup class="c" data-ref="Saitz1994,Daeppen2002" title="Source 73,409">73,409</sup>'},
   more:{t:'Seizure, ICU and ventilator outcomes',pairs:true,
     rows:[{l:'Recurrent seizure in 6 h: IV lorazepam vs placebo (RCT)',a:3,b:24,u:'%'},{l:'ICU admission: phenobarbital + protocol vs placebo + protocol (RCT)',a:8,b:25,u:'%'},{l:'On a ventilator: after vs before an ICU guideline (before-after)',a:22,b:47,u:'%'},{l:'On a ventilator: phenobarbital vs CIWA-Ar protocol (retrospective)',a:2,b:23,u:'%'}],
     la:'first-named group',lb:'comparison',
     cap:'D\'Onofrio 1999 (186 ED patients after an alcohol-related seizure), Rosenson 2013 (102 ED patients), Gold 2007 (95 ICU patients), Tidwell 2018 (retrospective ICU cohort). Only the first two are randomised; an ED meta-analysis found no significant phenobarbital benefit for ICU admission (RR 0.92). <sup class="c" data-ref="DOnofrio1999NEJM,Rosenson2013,Gold2007CCM,Tidwell2018,Lee2024AEM" title="Source 90,142,280,402,461">90,142,280,402,461</sup>'}};
  function drawF(p){const N=vb(fx,'720 300','400 '+(fset==='ms'?300:fset==='st'?470:420));const F=FX[fset];let s='';
    s+=`<text x="${N?12:20}" y="22" class="t-lbl">${F.t}</text>`;
    if(!F.pairs){const x0=N?20:150,x1=N?380:690,X=v=>lerp(x0,x1,v/F.max);
      F.rows.forEach((r,i)=>{const y=N?70+i*96:70+i*84;const v=r.v*ease(p);
        s+=`<text x="${N?x0:x0-12}" y="${N?y-10:y+20}" class="t-lbl${N?'':' t-end'}">${r.l}</text>`;
        s+=`<rect x="${x0}" y="${y}" width="${f1(X(v)-x0)}" height="30" rx="5" style="fill:var(--rx);opacity:.85"/>`;
        if(p>.9){s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y+15}" y2="${y+15}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${y+8}" y2="${y+22}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${y+8}" y2="${y+22}" style="stroke:var(--ink);stroke-width:1.6"/>`}
        s+=`<text x="${N?x0:f1(X(r.hi)+10)}" y="${N?y+48:y+19}" class="t-sm" style="fill:var(--ink)">${f1(v)} ${N?'':' · '}${N?'':r.txt.replace(/^[0-9.]+ /,'')}</text>`});
      const ya=N?260:250;[0,2,4,6,8,10,12,14].forEach(v=>s+=`<text x="${f1(X(v))}" y="${ya}" class="t-xs t-mid">${v}</text>`);
      s+=`<line x1="${x0}" x2="${x1}" y1="${ya-12}" y2="${ya-12}" class="axis"/><text x="${x1}" y="${ya+16}" class="t-xs t-end">${F.unit} · whiskers = 95% CI</text>`}
    else{const x0=N?14:300,x1=N?380:690;
      F.rows.forEach((r,i)=>{const y=N?58+i*(fset==='st'?80:86):50+i*(fset==='st'?46:56),m=Math.max(r.a,r.b),X=v=>lerp(x0,x1-(N?40:60),v/m);
        const lab=dxWrap(r.l,N?56:46);lab.forEach((l,j)=>s+=`<text x="${N?x0:x0-12}" y="${f1(N?y-6-(lab.length-1-j)*11:y+10+j*11)}" class="t-xs${N?'':' t-end'}" style="fill:var(--ink)">${l}</text>`);
        const a=r.a*ease(p),b=r.b*ease(p);
        s+=`<rect x="${x0}" y="${y}" width="${f1(Math.max(1,X(a)-x0))}" height="15" rx="3" style="fill:var(--rx)"/><text x="${f1(X(a)+5)}" y="${y+11.5}" class="t-xs" style="fill:var(--ink)">${f1(a).replace('.0','')} ${r.u}</text>`;
        s+=`<rect x="${x0}" y="${y+18}" width="${f1(Math.max(1,X(b)-x0))}" height="15" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(X(b)+5)}" y="${y+29.5}" class="t-xs" style="fill:var(--ink)">${f1(b).replace('.0','')} ${r.u}</text>`});
      const ly=N?(fset==='st'?455:405):(fset==='st'?286:282);
      s+=`<rect x="${N?14:x0}" y="${ly-9}" width="12" height="10" rx="2" style="fill:var(--rx)"/><text x="${N?30:x0+16}" y="${ly}" class="t-xs">${F.la}</text><rect x="${N?170:x0+170}" y="${ly-9}" width="12" height="10" rx="2" style="fill:var(--muted);opacity:.7"/><text x="${N?186:x0+186}" y="${ly}" class="t-xs">${F.lb}</text>`}
    fx.innerHTML=s}
  const FXN={ms:{k:'Mayo-Smith 1997 · meta-analysis',t:'Why benzodiazepines come first',txt:'Benzodiazepines reduced delirium by 4.9 cases per 100 patients (P=.04) and seizures by 7.7 per 100 (P=.003). Beta-blockers, clonidine and carbamazepine eased symptoms, but the evidence was inadequate for their effect on seizures and delirium. Phenothiazines eased symptoms but were less effective than benzodiazepines at preventing delirium and seizures. Within the first 2 days, reviews describe benzodiazepines reducing seizures by up to 84%. <sup class="c" data-ref="MayoSmith1997,Jesse2017,Mirijello2015" title="Source 203,321,332">203,321,332</sup>',
      pt:'For every 100 people treated, about 8 fewer had a seizure and about 5 fewer had delirium than without these medicines.',hook:'Benzodiazepines reduce both seizures and delirium. Alpha-2 agonists and beta-blockers only mask autonomic signs and should not be used alone. <sup class="c" data-ref="MayoSmith1997,ASAM2020Withdrawal" title="Source 20,321">20,321</sup>'},
    st:{k:'Two randomised trials',t:'Give it when it is needed',txt:'Dosing by the CIWA-Ar score meant far less medicine for a far shorter time, with no difference in severity, seizures or DT in Saitz 1994; in Daeppen 2002, only 39% of the symptom-triggered group needed any oxazepam at all. A 1997 meta-analysis found that individualising therapy with withdrawal scales gives significantly less medication and shorter treatment. Symptom-triggered dosing needs a patient who has recently been drinking and can talk: in one hospital audit only 48% of patients on a CIWA-Ar protocol met both conditions. <sup class="c" data-ref="Saitz1994,Daeppen2002,MayoSmith1997,Hecksel2008" title="Source 73,171,321,409">73,171,321,409</sup>',
      pt:'Instead of a fixed dose every few hours, the nurse checks the symptoms and gives medicine only when the score is high enough.',hook:'Saitz 1994: 100 vs 425 mg chlordiazepoxide, 9 vs 68 hours. ASAM: symptom-triggered is "the preferred benzodiazepine dosing method" in inpatients. <sup class="c" data-ref="Saitz1994,ASAM2020Withdrawal" title="Source 20,409">20,409</sup>'},
    more:{k:'Emergency department and ICU',t:'After a seizure, and in the ICU',txt:'After a witnessed alcohol-related seizure, IV lorazepam cut recurrent seizures in 6 hours to 3/100 against 21/86 on placebo, and admissions from 42% to 29%. In the ICU, a guideline of escalating benzodiazepine doses plus phenobarbital went with fewer people needing ventilation, and a retrospective phenobarbital protocol with shorter ICU stays (2.4 vs 4.4 days). Before-after and retrospective studies can mislead, and an ICU meta-analysis rated the evidence for phenobarbital pathways very low certainty. <sup class="c" data-ref="DOnofrio1999NEJM,Gold2007CCM,Tidwell2018,Rizwan2026" title="Source 90,142,392,461">90,142,392,461</sup> <span class="ev early">Early evidence</span>',
      pt:'A medicine given right after a seizure greatly lowers the chance of a second one. In intensive care, teams are still studying which plan works best.',hook:'After an alcohol withdrawal seizure: benzodiazepines prevent recurrence; phenytoin does not. <sup class="c" data-ref="DOnofrio1999NEJM,Hillbom2003,ASAM2020Withdrawal" title="Source 20,90,180">20,90,180</sup>'}};
  function setF(k){fset=k;$$('[data-dxf]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.dxf===k));$('#dxFxCap').innerHTML=FX[k].cap;$('#dxFxNote').innerHTML=noteHTML(FXN[k]);if(stopF)stopF();stopF=animate(900,drawF,()=>{stopF=null});setTimeout(()=>{if(stopF&&fset===k){stopF();stopF=null;drawF(1)}},1600)}
  $$('[data-dxf]').forEach(b=>b.addEventListener('click',()=>setF(b.dataset.dxf)));
  $('#dxFxCap').innerHTML=FX.ms.cap;$('#dxFxNote').innerHTML=noteHTML(FXN.ms);drawF(1);
  const prevR=redraws.detox;redraws.detox=()=>{prevR&&prevR();drawF(1)};
};
/* =============== 3.4 Thiamine, Wernicke and Korsakoff =============== */
const WE_STEPS=[
 {from:0,at:.1,k:'Scene 1 · The store',t:'A store that runs low'},
 {from:.2,at:.31,k:'Scene 2 · The brain',t:'Vulnerable brain regions'},
 {from:.4,at:.52,k:'Scene 3 · Glucose',t:'Glucose and thiamine'},
 {from:.6,at:.73,k:'Scene 4 · The signs',t:'The triad is rarely complete'},
 {from:.8,at:.93,k:'Scene 5 · Memory',t:'Korsakoff syndrome'}];
/* Harper 1986: 131 necropsy cases; 16% had the classic triad, 19% no documented signs, 80% not diagnosed in life */
const WE_N=131,WE_TRIAD=Math.round(WE_N*.16),WE_NONE=Math.round(WE_N*.19),WE_MISSED=Math.round(WE_N*.8);
/* small glyphs for the three classic signs */
function weGlyph(kind,x,y,s,col,op){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="opacity:${f1(op)}">`;
  if(kind==='conf')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M0 0m-7 0a7 5 0 1 1 7 5a4 3 0 1 1 -3.5 -2.4" style="fill:none;stroke:${col};stroke-width:1.8;stroke-linecap:round"/><text y="5" x="8" style="font:700 9px var(--body);fill:${col}">?</text>`;
  if(kind==='atax')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`+[[-6,7,-20],[3,1,25],[-4,-6,-15],[5,-11,20]].map(([a,b,r])=>`<ellipse cx="${a}" cy="${b}" rx="2.6" ry="4.2" transform="rotate(${r} ${a} ${b})" style="fill:${col}"/>`).join('');
  if(kind==='eye')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M-10 0Q0 -8 10 0Q0 8 -10 0Z" style="fill:none;stroke:${col};stroke-width:1.6"/><circle cx="3.5" cy="0" r="2.8" style="fill:${col}"/><path d="M-6 -10.5h-4M-10 -10.5l2 -2M-10 -10.5l2 2M6 10.5h4M10 10.5l-2 -2M10 10.5l-2 2" style="stroke:${col};stroke-width:1.2;fill:none;stroke-linecap:round"/>`;
  return g+'</g>'}
function weNote(i,thi){const o=Object.assign({},WE_STEPS[i]);o.k+=thi?' · thiamine given early':' · no thiamine yet';
  if(i===0){o.t='A store that runs low';
    o.txt=`Wernicke encephalopathy is an acute neuropsychiatric syndrome caused by thiamine deficiency. <sup class="c" data-ref="Sechi2007" title="Source 424">424</sup> In modern cohorts at least 90% of people with Wernicke encephalopathy or Korsakoff syndrome have heavy alcohol use. <sup class="c" data-ref="Arts2017" title="Source 19">19</sup> ASAM 2020 prefers thiamine by injection (IV or IM) for people with poor nutrition, malabsorption or severe complications, and the Royal College of Physicians advises B vitamins at the outset for people with chronic heavy drinking and a suspected poor diet. <sup class="c" data-ref="ASAM2020Withdrawal,Thomson2002RCP" title="Source 20,458">20,458</sup>`+(thi?' Here the toggle refills the store from scene 3 on.':' Press <b>Give thiamine early</b> to compare.');
    o.pt='Heavy drinking can use up vitamin B1 (thiamine). When too little comes in and too little is absorbed, the body\'s store runs low. <sup class="c" data-ref="Galvin2010EFNS,Sechi2007" title="Source 134,424">134,424</sup>';
    o.hook='The first Caine criterion is dietary deficiency: ask about eating, not only drinking. <sup class="c" data-ref="Caine1997" title="Source 54">54</sup>'}
  if(i===1){o.t='Vulnerable brain regions';
    o.txt=`Korsakoff syndrome is linked to lesions of the mammillary bodies and the anterior thalamus, highlighted here. <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup> In active Wernicke encephalopathy at autopsy in Oslo, stupor and coma dominated the clinical picture. <sup class="c" data-ref="Torvik1982" title="Source 465">465</sup> MRI supports the diagnosis (sensitivity 53%, specificity 93% in 15 patients), but a normal scan does not exclude it, and CT "proved not useful". <sup class="c" data-ref="Antunez1998,Galvin2010EFNS" title="Source 14,134">14,134</sup> In severe withdrawal with delirium tremens, telling DT and Wernicke encephalopathy apart can be hard. <sup class="c" data-ref="Jesse2017" title="Source 203">203</sup>`;
    o.pt='Low thiamine harms small, deep parts of the brain that help lay down new memories and keep balance and eye movements steady.';
    o.hook='Mammillary bodies + anterior thalamus = the Korsakoff lesions. A normal MRI does not rule out Wernicke encephalopathy. <sup class="c" data-ref="Arts2017,Antunez1998" title="Source 14,19">14,19</sup>'}
  if(i===2){o.t=thi?'Glucose with thiamine':'Glucose without thiamine';
    o.txt=`The older rule, kept by EFNS 2010, is thiamine before any carbohydrate-containing fluid or food. ASAM 2020 says thiamine and glucose may be given "in any order or concurrently". <sup class="c" data-ref="Galvin2010EFNS,ASAM2020Withdrawal" title="Source 20,134">20,134</sup> The evidence behind the old rule is case reports: prolonged glucose without thiamine may be a risk factor, so low blood sugar should be treated at once, with thiamine promptly after or alongside. <sup class="c" data-ref="Schabelman2012" title="Source 415">415</sup> <span class="ev early">Early evidence</span> In 120 emergency visits where dextrose came first, no Wernicke encephalopathy was found within 90 days. <sup class="c" data-ref="Jasti2025" title="Source 199">199</sup> The US injection label says people with marginal thiamine status receiving dextrose "should receive 100 mg thiamine hydrochloride in each of the first few liters of IV fluid" (quoted, not an instruction). <sup class="c" data-ref="FDA-ThiamineInj" title="Source 120">120</sup>`;
    o.pt='Low blood sugar is treated straight away. Thiamine is given promptly too: today the guidance is not to delay either one.';
    o.hook='EFNS: thiamine before carbohydrate. ASAM 2020: either order, or together. Never delay glucose for hypoglycaemia. <sup class="c" data-ref="Galvin2010EFNS,ASAM2020Withdrawal,Schabelman2012" title="Source 20,134,415">20,134,415</sup>'}
  if(i===3){o.t='The triad is rarely complete';
    o.txt=`In 131 cases diagnosed at autopsy, 80% had not been diagnosed in life, only 16% had the classic triad of confusion, ataxia and eye-movement problems, and 19% had no documented clinical signs at all. <sup class="c" data-ref="Harper1986JNNP" title="Source 166">166</sup> A later review says Wernicke encephalopathy usually (in 50–70%) has an "unobtrusive" course, and most cases are missed because the classic signs are absent. <sup class="c" data-ref="Arts2017,IsenbergGrzeda2012" title="Source 19,196">19,196</sup> That is why the Caine criteria need only 2 of 4 signs (checklist below). <sup class="c" data-ref="Caine1997" title="Source 54">54</sup>`+(thi?' The earlier thiamine is started, the faster the recovery, whatever the first presentation. <sup class="c" data-ref="Jesse2017" title="Source 203">203</sup>':'');
    o.pt='Most people with Wernicke encephalopathy do not show all three classic signs. That is why thiamine is given whenever the risk is there, without waiting for the full picture.';
    o.hook='Classic triad in only 16% at autopsy (Harper 1986); 80% missed in life. Caine: 2 of 4 (diet, eyes, cerebellum, mental state). <sup class="c" data-ref="Harper1986JNNP,Caine1997" title="Source 54,166">54,166</sup>'}
  if(i===4){o.t=thi?'A memory disorder that can be prevented':'Korsakoff syndrome';
    o.txt=`Korsakoff syndrome is a preventable memory disorder that usually follows an episode of Wernicke encephalopathy. Episodic memory (remembering events) is badly affected while implicit memory (skills, habits) is preserved, and people can learn in a calm, structured, cued setting. <sup class="c" data-ref="Kopelman2009" title="Source 257">257</sup> How often Wernicke encephalopathy leads to Korsakoff syndrome is uncertain: the often-quoted 84% comes from one monograph and was not meant as a general estimate; a later study found 56%, and Arts calls the higher figure "an unreliably high estimation". <sup class="c" data-ref="Arts2017" title="Source 19">19</sup> When the deficiency comes without heavy drinking, Korsakoff syndrome rarely follows treatment. <sup class="c" data-ref="Thomson2006Natural" title="Source 459">459</sup>`;
    o.pt='Korsakoff syndrome makes new memories slip away, but skills stay. With structure and memory aids people can still learn routines. <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup>';
    o.hook='Korsakoff = severe anterograde episodic memory loss with confabulation, a residual syndrome after Wernicke encephalopathy. <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup>'}
  return o}

inits.wernicke=()=>{
  const svg=$('#weSvg'),rg=$('#weT');let thi=false;
  const level=t=>{let v=lerp(.9,.36,ease(ramp(t,0,.2)));v=lerp(v,.22,ease(ramp(t,.2,.4)));
    if(thi)v=lerp(v,.82,ease(ramp(t,.42,.6)));else v=lerp(v,.07,ease(ramp(t,.42,.58)));return v};
  /* the grid order: triad cases first, then partial signs, then no documented signs */
  const GR=rng(34),ORD=[...Array(WE_N).keys()].sort(()=>GR()-.5);
  function draw(t){
    const N=vb(svg,'720 400','400 676'),ph=phaseOf(WE_STEPS,t),lv=level(t),glow=clamp(ramp(.4-lv,0,.3));let s='';
    /* ---- tank ---- */
    const T=N?{x:28,y:62,w:74,h:170}:{x:44,y:70,w:92,h:220};
    s+=`<text x="${T.x+T.w/2}" y="${T.y-38}" class="t-sm t-mid" style="font-weight:600">THIAMINE STORE</text>`;
    const inflow=thi&&t>.42?1:lerp(.9,.15,ramp(t,0,.2));
    s+=tank(T.x,T.y,T.w,T.h,lv,{low:.3,inflow,outflow:.2+.8*ramp(t,0,.2)*(thi&&t>.45?.3:1),label:'',sub:''});
    for(let i=0;i<Math.round(lv*14);i++){const cx=T.x+12+(i%4)*((T.w-24)/3),cy=T.y+T.h-12-Math.floor(i/4)*16;s+=mol(cx,cy,'thi',{r:4,op:.9})}
    s+=`<text x="${T.x+T.w/2}" y="${T.y+T.h+(N?50:46)}" class="t-big t-mid" style="fill:${lv<.3?'var(--bad)':'var(--ink)'}">${Math.round(lv*100)}%</text><text x="${T.x+T.w/2}" y="${T.y+T.h+(N?63:60)}" class="t-xs t-mid">schematic level</text>`;
    const lx=T.x+T.w+8;
    s+=`<text x="${T.x+T.w/2+12}" y="${T.y-12}" class="t-xs" style="fill:${thi&&t>.42?'var(--thi)':'var(--muted)'}">${thi&&t>.42?'+ thiamine IV/IM':N?'poor diet':'less in: poor diet'}</text><text x="${T.x+T.w/2+12}" y="${T.y+T.h+20}" class="t-xs">${N?'malabsorption':'less kept: malabsorption'}</text>`;
    /* ---- brain ---- */
    const B=N?{x:282,y:150,s:1.12}:{x:300,y:176,s:1.45};
    const hb=brain(B.x,B.y,B.s,{hl:{mb:glow*ramp(t,.15,.3),thal:glow*ramp(t,.15,.3)*.85}});
    s+=hb.svg;
    if(t>=.18){const lab=(k,txt,lx,ly,anc)=>{const [ax,ay]=hb.at[k];return `<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(lx)}" y2="${f1(ly-10)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly)}" class="t-xs ${anc}" style="fill:var(--ink)">${txt}</text>`};
      s+=lab('mb','Mammillary bodies',B.x-(N?62:84),B.y+(N?76:86),'t-mid')+lab('thal','Thalamus',B.x+(N?70:96),B.y+(N?76:86),'t-mid')}
    s+=`<text x="${B.x}" y="${N?B.y-92:B.y-108}" class="t-sm t-mid" style="font-weight:600">${N?'BRAIN AT RISK':'BRAIN REGIONS AT RISK'}</text>`;
    if(t>=.2&&glow>.05)s+=`<text x="${B.x}" y="${f1(B.y+(N?94:106))}" class="t-xs t-mid" style="fill:var(--bad)">${N?'low thiamine: these glow':'low thiamine: mammillary bodies and thalamus glow'}</text>`;
    if(thi&&t>.5)s+=`<text x="${B.x}" y="${f1(B.y+(N?94:106))}" class="t-xs t-mid" style="fill:var(--good)">thiamine given: glow fades (schematic)</text>`;
    /* ---- right panel: changes with the scene ---- */
    const P=N?{x:16,y:330,w:368,h:334}:{x:448,y:40,w:262,h:340};
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const px=P.x+14,pw=P.w-28;let py=P.y+24;
    if(ph===0){s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">WHY THE STORE RUNS LOW</text>`;py+=26;
      [['Heavy drinking can use up thiamine','Galvin 2010, Sechi 2007'],['Poor nutrition: less comes in','ASAM 2020'],['Malabsorption: less is taken up','ASAM 2020'],['More than 90% of Wernicke-Korsakoff cases: alcohol dependence','Dingwall 2022']].forEach(([a,b],i)=>{const op=clamp(ramp(t,i*.04,i*.04+.05));
        const L=dxWrap(a,N?50:34);s+=`<circle cx="${px+5}" cy="${py-4}" r="4" style="fill:var(--thi-fill);opacity:${f1(op)}"/>`;L.forEach((l,j)=>s+=`<text x="${px+16}" y="${py+j*14}" style="font:700 12px var(--body);fill:var(--ink);opacity:${f1(op)}">${l}</text>`);py+=L.length*14;s+=`<text x="${px+16}" y="${py}" class="t-xs" style="opacity:${f1(op)}">${b}</text>`;py+=22});}
    if(ph===1){s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">MRI IN ACUTE WE (15 PATIENTS)</text>`;py+=22;
      [['sensitivity',53,'var(--accent)'],['specificity',93,'var(--rx)']].forEach(([l,v,c])=>{const w=pw*v/100*ease(ramp(t,.2,.3));s+=`<text x="${px}" y="${py+10}" class="t-xs">${l}</text><rect x="${px+78}" y="${py}" width="${f1(pw-78)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${px+78}" y="${py}" width="${f1(w*(pw-78)/pw)}" height="14" rx="4" style="fill:${c}"/><text x="${f1(px+82+w*(pw-78)/pw)}" y="${py+11}" class="t-xs" style="fill:var(--ink)">${v}%</text>`;py+=26});
      py+=10;['A normal MRI does not exclude it;','CT "proved not useful".','Lesions linked to Korsakoff:','mammillary bodies, anterior thalamus.'].forEach((l,i)=>{s+=`<text x="${px}" y="${py}" style="font:${i===2?700:400} 12px var(--body);fill:var(--ink)">${l}</text>`;py+=17});
      s+=`<text x="${px}" y="${P.y+P.h-14}" class="t-xs">Antunez 1998; Kopelman 2009; Arts 2017</text>`}
    if(ph===2){/* glucose bag dripping toward the tank */
      const bx=px+pw-70,by=py+4;s+=`<rect x="${bx}" y="${by}" width="56" height="74" rx="10" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.5"/><rect x="${bx+4}" y="${by+26}" width="48" height="44" rx="7" style="fill:var(--eth-soft)"/><text x="${bx+28}" y="${by+18}" class="t-xs t-mid" style="fill:var(--ink)">glucose</text><line x1="${bx+28}" y1="${by+74}" x2="${bx+28}" y2="${by+104}" style="stroke:var(--brain-line);stroke-width:2"/>`;
      const u=ramp(t,.4,.6);for(let i=0;i<6;i++){const f=(u*3+i/6)%1,dy=by+80+f*24;s+=`<path d="M${bx+28} ${f1(dy)}q3 4 0 6q-3 -2 0 -6Z" style="fill:var(--eth-fill);opacity:${f1(u>0?.9:0)}"/>`}
      if(thi){s+=`<rect x="${bx-70}" y="${by+8}" width="52" height="52" rx="9" style="fill:var(--panel);stroke:var(--thi);stroke-width:1.5"/><text x="${bx-44}" y="${by+30}" class="t-xs t-mid" style="fill:var(--thi)">thiamine</text><text x="${bx-44}" y="${by+44}" class="t-xs t-mid" style="fill:var(--thi)">IV/IM</text>`}
      else s+=`<text x="${px}" y="${by+40}" style="font:700 12px var(--body);fill:var(--bad)">No thiamine yet:</text><text x="${px}" y="${by+56}" class="t-xs" style="fill:var(--bad)">the store drains further</text><text x="${px}" y="${by+70}" class="t-xs" style="fill:var(--bad)">(case-report evidence)</text>`;
      let gy=by+128;[['EFNS 2010','thiamine before any','carbohydrate','var(--accent)'],['ASAM 2020','"in any order or','concurrently"','var(--rx)']].forEach(([a,b,c,col])=>{s+=`<rect x="${px}" y="${gy}" width="${pw}" height="50" rx="9" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><text x="${px+10}" y="${gy+18}" style="font:700 12px var(--body);fill:${col}">${a}</text><text x="${px+10}" y="${gy+32}" class="t-xs" style="fill:var(--ink)">${b}</text><text x="${px+10}" y="${gy+44}" class="t-xs" style="fill:var(--ink)">${c}</text>`;gy+=58});
      if(gy<P.y+P.h-4)s+=`<text x="${px}" y="${P.y+P.h-12}" class="t-xs">Never delay glucose for low blood sugar.</text>`}
    if(ph===3){const g=[['conf','confusion'],['atax','ataxia'],['eye','eye signs']];const u=ramp(t,.6,.75);
      g.forEach(([k,l],i)=>{const gx=px+24+i*(pw-48)/2,op=clamp(ramp(t,.6+i*.02,.63+i*.02));s+=weGlyph(k,gx,py+6,1,'var(--accent)',op)+`<text x="${f1(gx)}" y="${py+36}" class="t-xs t-mid" style="opacity:${f1(op)}">${l}</text>`});
      const cols=N?16:12,cell=N?Math.min(20,pw/cols):pw/cols,gy=py+54;let nT=0,nN=0;const shown=Math.round(WE_N*u);
      ORD.forEach((id,j)=>{const cx=px+(j%cols)*cell+cell/2,cy=gy+Math.floor(j/cols)*cell+cell/2;const k=id<WE_TRIAD?'tri':id<WE_TRIAD+WE_NONE?'none':'part';const on=j<shown;
        if(on){if(k==='tri')nT++;if(k==='none')nN++}
        const fill=!on?'var(--panel-2)':k==='tri'?'var(--accent)':k==='none'?'var(--panel)':'var(--muted)';
        s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(cell*.36)}" style="fill:${fill};stroke:${on&&k==='none'?'var(--muted)':'none'};stroke-width:1;opacity:${on&&k==='part'?.45:1}"/>`});
      const ly=gy+Math.ceil(WE_N/cols)*cell+16;
      s+=`<circle cx="${px+5}" cy="${ly-4}" r="4.5" style="fill:var(--accent)"/><text x="${px+14}" y="${ly}" class="t-xs" style="fill:var(--ink)">all three: ${nT} (16%)</text><circle cx="${px+(N?140:5)}" cy="${(N?ly:ly+16)-4}" r="4.5" style="fill:var(--panel);stroke:var(--muted)"/><text x="${px+(N?149:14)}" y="${N?ly:ly+16}" class="t-xs" style="fill:var(--ink)">no signs recorded: ${nN} (19%)</text>`;
      s+=`<text x="${px}" y="${N?ly+18:ly+34}" class="t-xs" style="fill:var(--bad)">not diagnosed in life: ${Math.round(WE_MISSED*u)} of 131 (80%)</text><text x="${px}" y="${N?ly+32:ly+48}" class="t-xs">Harper 1986, 131 autopsy cases</text>`}
    if(ph===4){const u=ramp(t,.8,.95);s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">MEMORY ${thi?'(PROTECTED)':'IN KORSAKOFF SYNDROME'}</text>`;py+=26;
      s+=`<text x="${px}" y="${py}" style="font:700 12px var(--body);fill:var(--ink)">New events (episodic memory)</text>`;py+=14;
      for(let i=0;i<10;i++){const born=i/10,age=u-born;if(age<0)continue;const fade=thi?1:clamp(1-age*4.5);const cx=px+10+i*(pw-20)/9;s+=`<circle cx="${f1(cx)}" cy="${py+8}" r="7" style="fill:var(--thal);opacity:${f1(.15+.85*fade)}"/>`;if(!thi&&fade<.2)s+=`<circle cx="${f1(cx)}" cy="${py+8}" r="7" style="fill:none;stroke:var(--muted);stroke-dasharray:2 2"/>`}
      py+=32;s+=`<text x="${px}" y="${py}" style="font:700 12px var(--body);fill:var(--ink)">Skills and habits (implicit memory)</text>`;py+=10;
      s+=`<rect x="${px}" y="${py}" width="${f1(pw*u)}" height="12" rx="4" style="fill:var(--rx)"/>`;py+=30;
      s+=`<text x="${px}" y="${py}" class="t-xs" style="fill:var(--ink)">How often WE leads to Korsakoff syndrome:</text>`;py+=12;
      [['84% (one monograph; "unreliably high")',84,'var(--muted)'],['56% (a later study)',56,'var(--accent)']].forEach(([l,v,c])=>{s+=`<rect x="${px}" y="${py}" width="${f1(pw*v/100*ease(u))}" height="12" rx="3" style="fill:${c}"/><text x="${px}" y="${py+24}" class="t-xs">${l}</text>`;py+=36});
      s+=`<text x="${px}" y="${P.y+P.h-12}" class="t-xs">Kopelman 2009; Arts 2017</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#weRead').innerHTML=`<span>scene <b>${WE_STEPS[ph].t}</b></span><span>thiamine store <b>${Math.round(lv*100)}%</b> (schematic)</span><span>thiamine <b>${thi?'given early':'not yet given'}</b></span>`;
    $('#weNote').innerHTML=noteHTML(weNote(ph,thi));
  }
  const stop=playWire(rg,$('#wePlay'),draw,22000,'Replay','wernicke');
  const setSt=stepWire($('#weSteps'),WE_STEPS,rg,draw,stop);
  $('#weThi').addEventListener('click',()=>{thi=!thi;$('#weThi').setAttribute('aria-pressed',thi);draw(+rg.value)});
  draw(+rg.value);

  /* ---- Caine checklist ---- */
  const cs=$('#weCaineSvg'),CK={diet:false,eye:false,cbl:false,mind:false,he:false};
  const TILES=[['diet','Dietary','deficiency'],['eye','Eye','signs'],['cbl','Cerebellar','dysfunction'],['mind','Mental state','or memory']];
  function drawC(){const N=vb(cs,'720 230','400 330');let s='';const n=['diet','eye','cbl','mind'].filter(k=>CK[k]).length,tri=['eye','cbl','mind'].filter(k=>CK[k]).length;
    const tw=N?176:150,th=N?62:70,gap=N?12:20,x0=N?18:40,y0=N?40:50;
    const pos=i=>N?[x0+(i%2)*(tw+gap),y0+Math.floor(i/2)*(th+gap)]:[x0+i*(tw+gap),y0];
    /* triad bracket over tiles 2-4 (wide) */
    if(!N){const a=pos(1)[0],b=pos(3)[0]+tw;s+=`<path d="M${a} ${y0-8}v-8H${b}v8" style="fill:none;stroke:var(--accent);stroke-width:1.4"/><text x="${(a+b)/2}" y="${y0-22}" class="t-xs t-mid" style="fill:var(--accent)">classic triad: all three needed</text>`}
    else s+=`<text x="${x0}" y="${y0-14}" class="t-xs" style="fill:var(--accent)">classic triad = the three tiles marked ▲</text>`;
    TILES.forEach(([k,a,b],i)=>{const [x,y]=pos(i),on=CK[k];
      s+=`<rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="10" style="fill:${on?'var(--accent-soft)':'var(--panel-2)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+14}" y="${y+26}" style="font:700 13px var(--body);fill:var(--ink)">${a}</text><text x="${x+14}" y="${y+44}" class="t-xs">${b}</text>`;
      s+=`<circle cx="${x+tw-18}" cy="${y+20}" r="9" style="fill:${on?'var(--accent)':'none'};stroke:${on?'var(--accent)':'var(--muted)'};stroke-width:1.5"/>${on?`<path d="M${x+tw-22} ${y+20}l3 3l6 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`:''}`;
      if(N&&k!=='diet')s+=`<text x="${x+tw-12}" y="${y+th-8}" class="t-xs t-end" style="fill:var(--accent)">▲</text>`});
    /* two meters */
    const my=N?y0+2*(th+gap)+20:y0+th+46,mw=N?364:300;
    const meter=(x,y,lab,k,need,tot,col)=>{let m=`<text x="${x}" y="${y}" style="font:700 12px var(--body);fill:var(--ink)">${lab}</text>`;const sw=(mw-(tot-1)*6)/tot;
      for(let i=0;i<tot;i++)m+=`<rect x="${f1(x+i*(sw+6))}" y="${y+8}" width="${f1(sw)}" height="16" rx="4" style="fill:${i<k?col:'var(--panel-2)'};stroke:${i===need-1?'var(--ink)':'none'};stroke-width:1.4"/>`;
      m+=`<text x="${x}" y="${y+40}" class="t-xs" style="fill:${k>=need?col:'var(--muted)'}">${k} of ${tot} · ${k>=need?'met':'not met'} (needs ${need})</text>`;return m};
    s+=meter(x0,my,'Caine rule: 2 of 4',n,2,4,'var(--accent)');
    s+=meter(N?x0:x0+mw+60,N?my+62:my,'Classic triad: 3 of 3',tri,3,3,'var(--rx)');
    cs.innerHTML=s;
    const he=CK.he;
    $('#weCaineOut').innerHTML=`<div class="verdict ${n>=2?'yes':'no'}">Caine (2 of 4): ${n} of 4 ticked · ${n>=2?'meets the operational criteria in this imaginary case':'does not meet them'}</div>`+
      `<div class="verdict ${tri===3?'yes':'maybe'}">Classic triad: ${tri} of 3 · ${tri===3?'complete, as in only 16% of autopsy cases':'incomplete, as in most real cases'}</div>`+
      (he?`<div class="verdict maybe">Hepatic encephalopathy: in Caine's study, Wernicke encephalopathy was under-recognised only when hepatic encephalopathy was also present (50% sensitivity). <sup class="c" data-ref="Caine1997" title="Source 54">54</sup></div>`:'')+
      `<p class="stage-cap">Caine 1997 tested the rule on 106 cases from a necropsy sample; rater classification was 100% reliable. EFNS 2010 adopted the 2-of-4 rule for people with heavy alcohol use (Level B). A teaching tool only: not a diagnosis and not for checking yourself or anyone else. If someone who drinks heavily is confused, very unsteady or has odd eye movements, get medical help. <sup class="c" data-ref="Caine1997,Galvin2010EFNS" title="Source 54,134">54,134</sup></p>`}
  $$('[data-wc]').forEach(b=>b.addEventListener('change',()=>{CK[b.dataset.wc]=b.checked;b.closest('label').classList.toggle('on',b.checked);drawC()}));
  drawC();
  const prevR=redraws.wernicke;redraws.wernicke=()=>{prevR&&prevR();drawC()};
};
/* =============== 4.1 Approved medicines: naltrexone, acamprosate, disulfiram =============== */
function meWrap(s,n){const L=[];let c='';s.split(' ').forEach(w=>{const nx=c?c+' '+w:w;if(nx.length>n&&c){L.push(c);c=w}else c=nx});if(c)L.push(c);return L}
const ME_STEPS=[
 {from:0,at:.08,k:'Naltrexone · 1 of 2',t:'A drink releases the brain’s own opioids',
  txt:`PET imaging shows that drinking releases endogenous opioids (endorphins) in the nucleus accumbens and orbitofrontal cortex; in heavy drinkers the orbitofrontal change tracked problem drinking and the subjective "high". Alcohol also releases dopamine in the ventral striatum. Together these suggest why an opioid blocker could help. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Mitchell2012,Boileau2003" title="Source 43,333">43,333</sup>`,
  pt:`Part of why alcohol feels rewarding is that it makes the brain release its own opioid-like chemicals, which switch on the reward system.`,
  hook:`Alcohol → endogenous opioids → mu-opioid receptors → dopamine in the nucleus accumbens: the reward loop naltrexone targets.`},
 {from:.15,at:.27,k:'Naltrexone · 2 of 2',t:'Naltrexone sits on the receptors',
  txt:`Naltrexone is a pure opioid receptor antagonist. The label says its mechanism in AUD "is not understood", though preclinical data point to the endogenous opioid system. It "is not aversive therapy": drinking on it causes no disulfiram-like reaction. The oral label states "A dose of 50 mg once daily is recommended for most patients"; the injection is 380 mg every 4 weeks, given by a healthcare provider. <sup class="c" data-ref="FDA-Naltrexone,FDA-Vivitrol" title="Source 117,123">117,123</sup>`,
  pt:`Naltrexone fills the parking spots the brain’s opioids would use, so a drink gives less of a reward signal. It does not make a person sick if they drink.`,
  hook:`Naltrexone blocks opioids: check for opioid use first. The labels advise 7–10 opioid-free days before starting, to avoid precipitated withdrawal. <sup class="c" data-ref="FDA-Naltrexone,FDA-Vivitrol" title="Source 117,123">117,123</sup>`},
 {from:.34,at:.40,k:'Acamprosate · 1 of 2',t:'After heavy drinking stops: an over-excited brain',
  txt:`Chronic alcohol is thought to upset the balance between neuronal excitation and inhibition. With tolerance, NMDA glutamate receptors are up-regulated; when alcohol stops abruptly, this hyperexcitable state can lead to seizures and delirium tremens. <span class="ev est">Established</span> Get medical help to stop safely. The acamprosate label is clear that it "does not eliminate or diminish withdrawal symptoms". <sup class="c" data-ref="FDA-Campral,TsaiCoyle1998" title="Source 113,466">113,466</sup>`,
  pt:`After months of heavy drinking the brain’s accelerator is turned up. When alcohol stops it can race, which is why stopping after heavy daily drinking needs medical help.`,
  hook:`Withdrawal hyperexcitability: NMDA up-regulation after chronic alcohol. Acamprosate is not a withdrawal treatment.`},
 {from:.49,at:.60,k:'Acamprosate · 2 of 2',t:'Acamprosate: rebalancing, as a hypothesis',
  txt:`The label calls the mechanism "not completely understood": animal studies suggest acamprosate acts on glutamate and GABA systems, which leads to the hypothesis that it restores the balance. <span class="ev hyp">Hypothesis</span> Its indication is "maintenance of abstinence from alcohol in patients with alcohol dependence who are abstinent at treatment initiation", at two 333 mg tablets three times daily as published. <sup class="c" data-ref="FDA-Campral,KranzlerSoyka2018" title="Source 113,261">113,261</sup>`,
  pt:`Acamprosate helps people who have already stopped drinking stay stopped. It is cleared by the kidneys, not the liver, and it is taken three times a day.`,
  hook:`Acamprosate is excreted unchanged by the kidneys: label dose cut at CrCl 30–50 mL/min, contraindicated at ≤30. <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>`},
 {from:.66,at:.73,k:'Disulfiram · 1 of 2',t:'Disulfiram blocks the second enzyme',
  txt:`Alcohol is broken down to acetaldehyde, then to acetate by aldehyde dehydrogenase (ALDH). Disulfiram blocks that second step: after drinking on it, blood acetaldehyde can be 5–10 times higher than with the same alcohol alone. Its boxed warning: it "should never be administered to a patient when he is in a state of alcohol intoxication, or without his full knowledge". <sup class="c" data-ref="FDA-Antabuse,KranzlerSoyka2018" title="Source 112,261">112,261</sup>`,
  pt:`Disulfiram does not lower craving. It works as a deterrent: drinking while taking it makes a person very ill, so taking it must always be the person’s own informed choice.`,
  hook:`Disulfiram inhibits ALDH → acetaldehyde builds 5–10-fold. Boxed warning: never during intoxication or without full knowledge. <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>`},
 {from:.81,at:.96,k:'Disulfiram · 2 of 2',t:'Acetaldehyde builds: the reaction',
  txt:`The label lists flushing, throbbing headache, breathing difficulty, nausea, heavy vomiting, sweating, chest pain, palpitations, tachycardia, hypotension, fainting, vertigo, blurred vision and confusion. Severe reactions can include cardiovascular collapse, arrhythmias, heart attack, convulsions and death: a severe reaction is an emergency, so call emergency services. A reaction can happen up to 14 days after the last dose, including from hidden alcohol in sauces, vinegars, cough mixtures, aftershave lotions and back rubs. <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>`,
  pt:`For up to two weeks after the last tablet, even hidden alcohol in food, cough syrup or skin lotions can set off a reaction.`,
  hook:`Disulfiram-alcohol reactions: up to 14 days after the last dose; mild from a blood alcohol of 5–10 mg/100 mL, fully developed at 50 mg/100 mL (label). Tolerance does not develop. <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>`}
];
const ME_PH=[
 {name:'Naltrexone',appr:['1984 · ReVia, oral tablets','2006 · Vivitrol, monthly injection'],
  pts:['Opioid antagonist: blocks opioid painkillers, cough and antidiarrhoeal medicines','7–10 opioid-free days before starting','After it stops, a smaller opioid dose than before can cause overdose','No boxed warning now (liver warning removed in 2013)']},
 {name:'Acamprosate',appr:['2004 · Campral, delayed-release tablets'],
  pts:['For people already abstinent when it starts','Excreted unchanged by the kidneys','CrCl 30–50 mL/min: lower starting dose; ≤30: contraindicated','Does not treat withdrawal; watch for low mood or suicidal thoughts']},
 {name:'Disulfiram',appr:['1951 · Antabuse (earliest Drugs@FDA record)'],
  pts:['Boxed warning: never during intoxication or without the person’s full knowledge','Not until at least 12 h without alcohol','Reactions up to 14 days after the last dose','Hidden alcohol: sauces, vinegars, cough mixtures, aftershave']}
];
const ME_KV=[
 `<div class="kv"><div><dt>First US approval</dt><dd>ReVia (oral naltrexone) 20 Nov 1984, with an efficacy supplement on 30 Dec 1994; Vivitrol (extended-release injection) 13 Apr 2006. <sup class="c" data-ref="DrugsFDA-AUD" title="Source 91">91</sup></dd></div><div><dt>Label points</dt><dd>Contraindicated with current opioid painkillers, current opioid dependence (including methadone or buprenorphine maintenance) or acute opioid withdrawal. Trying to overcome the blockade with large opioid doses can cause fatal overdose, and prescribers are told to discuss naloxone or nalmefene. The current labels carry no boxed warning; an earlier hepatotoxicity boxed warning was removed in 2013. <sup class="c" data-ref="FDA-Naltrexone,FDA-Vivitrol,Thompson2024JHEP" title="Source 117,123,457">117,123,457</sup></dd></div></div>`,
 `<div class="kv"><div><dt>First US approval</dt><dd>Campral 29 Jul 2004. In 2001 it was already used in many other countries but not yet approved in the US. <sup class="c" data-ref="DrugsFDA-AUD,KranzlerVanKirk2001" title="Source 91,262">91,262</sup></dd></div><div><dt>Label points</dt><dd>Moderate renal impairment (creatinine clearance 30–50 mL/min): a starting dose of one 333 mg tablet three times daily; contraindicated at ≤30 mL/min. Suicidal events were uncommon but more frequent than on placebo (1.4% vs 0.5% in studies of 6 months or less), and the label asks families and caregivers to watch for and report depression or suicidal thinking. <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup></dd></div></div>`,
 `<div class="kv"><div><dt>First US approval</dt><dd>Antabuse 28 Aug 1951, the earliest Drugs@FDA record; one review dates the first approval to 1949. <sup class="c" data-ref="DrugsFDA-AUD,KranzlerSoyka2018" title="Source 91,261">91,261</sup></dd></div><div><dt>Label points</dt><dd>Boxed warning: never during intoxication or without the person’s full knowledge, and the physician should tell relatives this. Contraindicated with recent metronidazole, paraldehyde, alcohol or alcohol-containing preparations, severe heart disease, psychoses, or thiuram allergy. Hepatitis, sometimes fulminant, has been reported. <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup></dd></div></div>`
];
/* scene 1: the reward synapse, in a 458 x 356 local box */
function meSceneN(t){
  const rA=ramp(t,0,.06),c=ramp(t,.16,.28),rr=rng(7),X=[110,170,230,290,350],ord=[2,0,4,1,3];
  let s=`<text x="14" y="24" class="t-sm">REWARD SYNAPSE · SCHEMATIC</text>`;
  s+=mol(216,20,'opi',{r:4.5})+`<text x="224" y="23.5" class="t-xs">endorphin</text>`;
  s+=`<rect x="290" y="15" width="14" height="10" rx="3" style="fill:var(--rx)"/><text x="309" y="23.5" class="t-xs">naltrexone</text>`;
  s+=mol(388,20,'da',{r:4})+`<text x="396" y="23.5" class="t-xs">dopamine</text>`;
  s+=beaker(20,56,30,40,.55*rA+.05,{label:'a drink',ticks:3});
  s+=`<path d="M58 78H112" class="arrow" marker-end="url(#meA)"/>`;
  s+=`<path d="M120 44H340V86C340 114 300 120 230 120S120 114 120 86Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  s+=`<text x="230" y="62" class="t-xs t-mid">opioid-releasing nerve ending</text>`;
  for(let i=0;i<5;i++)s+=`<circle cx="${150+i*40}" cy="92" r="8" style="fill:none;stroke:var(--stri);stroke-width:1.2"/><circle cx="${150+i*40}" cy="92" r="3" style="fill:var(--stri);opacity:${f1(1-rA*.6)}"/>`;
  s+=`<path d="M40 208Q230 198 420 208V262H40Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  s+=`<text x="230" y="254" class="t-xs t-mid">dopamine-releasing cell · mu-opioid receptors</text>`;
  let bound=0;
  X.forEach((x,i)=>{const cap=clamp(c*5-ord.indexOf(i));let on=false;
    if(rA>0){const p=(t*14+i*.29)%1,q=p*1.6;let ex=x,ey,op=rA;
      if(q<1){ey=lerp(122,194,ease(q))}
      else if(cap>=.95){const b=clamp((q-1)/.6);ey=194-b*64;ex=x+(i%2?1:-1)*b*26;op=rA*(1-b)}
      else{ey=194;on=true}
      s+=mol(ex,ey,'opi',{r:5,op:f1(op)})}
    if(on)bound++;
    s+=`<path d="M${x-11} 190V202Q${x-11} 212 ${x} 212Q${x+11} 212 ${x+11} 202V190" style="fill:${on?'var(--stri)':'none'};fill-opacity:.35;stroke:var(--stri);stroke-width:3;stroke-linecap:round"/>`;
    if(cap>0){const y=lerp(140,196,ease(cap));s+=`<rect x="${x-9}" y="${f1(y-6)}" width="18" height="12" rx="3" style="fill:var(--rx)"/>`}});
  const m=rA*(1-.7*c);
  const nd=Math.round(20*m);
  for(let i=0;i<20;i++){const bx=rr(),by=rr();if(i<nd)s+=mol(50+((bx+t*2.5)%1)*370,276+by*40,'da',{r:3.6})}
  s+=`<text x="14" y="344" class="t-xs">dopamine → reward signal (nucleus accumbens)</text>`;
  if(c>0)s+=`<g style="opacity:${f1(c)}">${pill(404,150,40,{txt:'NTX',ang:-18})}</g>`;
  if(c>.55)s+=`<text x="230" y="236" class="t-xs t-mid" style="fill:var(--rx)">receptors occupied: endorphins bounce off</text>`;
  else if(rA>.5)s+=`<text x="230" y="236" class="t-xs t-mid" style="fill:var(--stri)">endorphins land on the receptors</text>`;
  return {svg:s,m}}
/* scene 2: the over-excited synapse and the balance */
function meSceneA(t){
  const s1=ramp(t,.34,.38),u=ramp(t,.49,.60),fl=Math.floor(t*300)%9,tilt=lerp(.85,0,u)*s1;
  let s=`<text x="14" y="24" class="t-sm">AFTER LONG, HEAVY DRINKING STOPS · SCHEMATIC</text>`;
  s+=synapse(150,192,2.1,{gaba:2,nmda:6,gt:lerp(.3,.6,u),gl:.2+lerp(.8,.25,u)*s1,cl:lerp(.25,.6,u),ca:lerp(1,.3,u)*s1,spark:lerp(1,.06,u)*s1,seed:11+fl});
  s+=`<text x="92" y="310" class="t-xs t-mid" style="fill:var(--gaba)">GABA-A · calming</text><text x="212" y="310" class="t-xs t-mid" style="fill:var(--glu)">NMDA · exciting</text>`;
  s+=`<text x="150" y="330" class="t-xs t-mid">more NMDA receptors after chronic alcohol</text>`;
  const B=balance(370,96,104,{tilt,ln:2,rn:Math.round(lerp(5,2,u)),lsub:'inhibition',rsub:'excitation'});s+=B.svg;
  s+=`<text x="370" y="192" class="t-xs t-mid" style="fill:${u>.5?'var(--good)':'var(--glu)'};font-weight:700">${u>.5?'closer to':'excitation outweighs'}</text><text x="370" y="205" class="t-xs t-mid" style="fill:${u>.5?'var(--good)':'var(--glu)'};font-weight:700">${u>.5?'balance':'inhibition'}</text>`;
  if(u>0){s+=`<g style="opacity:${f1(u)}">${pill(370,236,38,{round:true,txt:'ACA'})}`;
    s+=`<text x="370" y="276" class="t-xs t-mid">acamprosate may act on</text><text x="370" y="289" class="t-xs t-mid">glutamate and GABA</text>`;
    s+=`<rect x="330" y="298" width="80" height="16" rx="4" style="fill:var(--rx-soft)"/><text x="370" y="309.5" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">HYPOTHESIS</text></g>`}
  return {svg:s,m:tilt}}
/* scene 3: the blocked pathway and the acetaldehyde pool */
function meSceneD(t){
  const b=ramp(t,.66,.73),aL=ramp(t,.75,.95),lv=lerp(.1,.85,aL);
  let s=`<text x="14" y="24" class="t-sm">ALCOHOL BREAKDOWN · SCHEMATIC</text>`;
  s+=pathway(14,40,430,{eth:.55,acet:lerp(.12,1,aL),ace:lerp(.75,.12,b),block:b}).svg;
  if(b>.3)s+=`<text x="338" y="86" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">blocked by disulfiram</text>`;
  s+=tank(36,150,96,150,lv,{col:'var(--acet)',label:'acetaldehyde in blood'});
  [ [.1,'1×'],[.5,'5×'],[1,'10×'] ].forEach(([v,l])=>{const y=150+150*(1-v);s+=`<line x1="132" x2="140" y1="${f1(y)}" y2="${f1(y)}" class="axis"/><text x="144" y="${f1(y+3)}" class="t-xs">${l}</text>`});
  s+=`<path d="M168 150V225" style="stroke:var(--acet);stroke-width:2.4"/><text x="174" y="190" class="t-xs" style="fill:var(--acet)">5–10×</text><text x="174" y="202" class="t-xs">(label)</text>`;
  const fl=ramp(t,.80,.9),px=244,py=150;
  if(fl>0)s+=`<circle cx="${px}" cy="${f1(py+19)}" r="${f1(22+fl*6)}" style="fill:var(--glu-fill);opacity:${f1(.15+fl*.3)}"/>`;
  s+=person(px,py,110,'var(--skin)');
  s+=symptoms(px,py,110,{sweat:fl,tremor:0});
  const SY=['flushing','throbbing headache','nausea, vomiting','sweating','breathing difficulty','palpitations','chest pain','low blood pressure'];
  SY.forEach((y,i)=>{const a=ramp(aL,(i+.5)/9,(i+1.2)/9);if(a>0)s+=`<text x="${f1(300+(1-a)*10)}" y="${158+i*17}" class="t-xs" style="opacity:${f1(a)};fill:var(--ink)">• ${y}</text>`});
  if(aL>.92)['Severe reactions can be','life-threatening: call','emergency services.'].forEach((l,i)=>{s+=`<text x="196" y="${302+i*13}" class="t-xs" style="fill:var(--bad);font-weight:700">${l}</text>`});
  return {svg:s,m:lv}}
function mePanel(x,y,w,h,ph,m,t,N){const P=ME_PH[ph],n=Math.floor((w-34)/(N?6.6:5.75)),ns=Math.floor((w-24)/(N?7.2:6.7));
  let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;let yy=y+32;
  s+=`<text x="${x+12}" y="${yy}" style="font:800 24px var(--display);fill:var(--rx)">${P.name}</text>`;
  yy+=20;s+=`<text x="${x+12}" y="${yy}" class="t-xs">FIRST US APPROVAL · DRUGS@FDA</text>`;
  P.appr.forEach(a=>meWrap(a,ns).forEach((l,k)=>{yy+=15;s+=`<text x="${x+12+(k?10:0)}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`}));
  yy+=24;s+=`<text x="${x+12}" y="${yy}" class="t-xs">LABEL POINTS</text>`;yy+=2;
  P.pts.forEach((p,i)=>{const hot=ph===2&&i===0;meWrap(p,n).forEach((l,k)=>{yy+=13;s+=`${k?'':`<text x="${x+12}" y="${yy}" class="t-xs" style="fill:${hot?'var(--bad)':'var(--rx)'}">•</text>`}<text x="${x+22}" y="${yy}" class="t-xs" style="fill:${hot?'var(--bad)':'var(--ink)'}">${l}</text>`});yy+=3});
  const my=y+h-44,bx=x+12,bw=w-24;
  if(ph===0){s+=`<text x="${bx}" y="${my}" class="t-xs">REWARD / CRAVING PULL · SCHEMATIC</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${bx}" y="${my+8}" width="${f1(bw*m)}" height="12" rx="6" style="fill:var(--stri)"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs" style="fill:var(--ink)">${t<.16?(m>.5?'a drink switches the reward system on':'before the drink'):'naltrexone dims the reward signal'}</text>`}
  else if(ph===1){const cx=bx+bw/2;s+=`<text x="${bx}" y="${my}" class="t-xs">EXCITATION ↔ INHIBITION · SCHEMATIC</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(cx)}" y="${my+8}" width="${f1(bw/2*m)}" height="12" rx="3" style="fill:var(--glu-fill)"/><line x1="${f1(cx)}" x2="${f1(cx)}" y1="${my+4}" y2="${my+24}" style="stroke:var(--ink);stroke-width:1.5"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs" style="fill:var(--gaba)">GABA</text><text x="${bx+bw}" y="${my+34}" class="t-xs t-end" style="fill:var(--glu)">glutamate</text>`}
  else{s+=`<text x="${bx}" y="${my}" class="t-xs">ACETALDEHYDE VS ALCOHOL ALONE</text><rect x="${bx}" y="${my+8}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(bx+bw*.5)}" y="${my+8}" width="${f1(bw*.5)}" height="12" rx="0" style="fill:var(--acet);opacity:.2"/><rect x="${bx}" y="${my+8}" width="${f1(bw*m)}" height="12" rx="6" style="fill:var(--acet)"/>`;
    s+=`<text x="${bx}" y="${my+34}" class="t-xs">1×</text><text x="${f1(bx+bw*.5)}" y="${my+34}" class="t-xs t-mid">5×</text><text x="${bx+bw}" y="${my+34}" class="t-xs t-end">10×</text>`}
  return s}
const ME_NNT={j:{lab:'Jonas 2014 · 122 trials and 1 cohort, 22,803 people',any:{aca:[12,'8–26'],ntx:[20,'11–500']},heavy:{aca:null,ntx:[12,'8–26']}},
 m:{lab:'McPheeters 2023 · 118 trials, 20,976 people',any:{aca:[11,'1–32'],ntx:[18,'4–32']},heavy:{aca:null,ntx:[11,'5–41']}}};
const ME_COMB=[ ['CBI only, no pills, no MM',66.6,0],['Placebo pills + MM',75.1,0],['Naltrexone + CBI + MM',77.1,0],['CBI + MM + placebo pills',79.2,0],['Naltrexone + MM',80.6,1] ];
const ME_TL=[ [1951,['Antabuse','(disulfiram)'],0],[1984,['ReVia','(oral naltrexone)'],1],[1994,['ReVia efficacy','supplement'],0],[2004,['Campral','(acamprosate)'],1],[2006,['Vivitrol (injectable','naltrexone)'],2],[2013,['Liver boxed warning','removed (naltrexone)'],3] ];
inits.medicines=()=>{
  /* ---- main scrubber ---- */
  const svg=$('#meSvg'),rg=$('#meT');
  function draw(t){
    const N=vb(svg,'720 380','400 608'),ph=t<.34?0:t<.66?1:2;
    const sc=ph===0?meSceneN(t):ph===1?meSceneA(t):meSceneD(t);
    let s=`<defs>${marker('meA','var(--muted)')}</defs>`;
    s+=`<rect x="12" y="12" width="${N?376:458}" height="${N?292:356}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g class="meSc" transform="translate(12 12) scale(${N?(376/458).toFixed(4):1})">${sc.svg}</g>`;
    s+=N?mePanel(12,316,376,280,ph,sc.m,t,1):mePanel(484,12,224,356,ph,sc.m,t);
    svg.innerHTML=s;
    const p=phaseOf(ME_STEPS,t);setSt(p);
    $('#meNote').innerHTML=noteHTML(ME_STEPS[p])+ME_KV[ph];
  }
  const stop=playWire(rg,$('#mePlay'),draw,32000,'Replay','medicines');
  const setSt=stepWire($('#meSteps'),ME_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- NNT comparator ---- */
  const ns=$('#meNntSvg');let src='j',out='any',stopN=null;
  function drawN(p){const N=vb(ns,'720 300','400 610'),D=ME_NNT[src][out];let s='';
    [ ['aca','Acamprosate'],['ntx','Oral naltrexone 50 mg/day'] ].forEach(([k,name],gi)=>{
      const ox=N?14:20+gi*360,oy=N?14+gi*300:14,v=D[k],gx=ox,gy=oy+80,sp=N?19:19;
      s+=`<text x="${ox}" y="${oy+16}" class="t-lbl">${name}</text>`;
      if(v)s+=`<text x="${ox}" y="${oy+50}" style="font:800 30px var(--display);fill:var(--rx)">NNT ${v[0]}</text><text x="${ox+(String(v[0]).length>1?118:100)}" y="${oy+50}" class="t-xs">95% CI ${v[1]}</text>`;
      else s+=`<text x="${ox}" y="${oy+48}" style="font:800 22px var(--display);fill:var(--muted)">No NNT reported</text>`;
      s+=`<text x="${ox}" y="${oy+70}" class="t-xs">${out==='any'?'to prevent one return to any drinking':'to prevent one return to heavy drinking'}</text>`;
      const hi=v?Math.round(100/v[0]):0,shown=Math.round(hi*p);
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,on=i<shown;s+=person(gx+c*sp+4,gy+r*sp,15,on?'var(--rx)':'var(--brain-line)',{op:on?1:.35})}
      const tx=gx+10*sp+16,tw=N?(400-tx-10):(330-10*sp-16),nc=Math.floor(tw/(N?6.6:5.75));
      let ty=gy+14;
      if(v){s+=`<text x="${tx}" y="${ty+8}" style="font:800 26px var(--display);fill:var(--rx)">≈ ${hi}</text>`;ty+=26;
        meWrap(`in 100 treated avoid ${out==='any'?'any drinking':'heavy drinking'} who would not have on placebo`,nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs" style="fill:var(--ink)">${l}</text>`;ty+=12});
        ty+=6;meWrap(`Grey: the rest. Many of them also do well, on medicine or placebo.`,nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs">${l}</text>`;ty+=12})}
      else meWrap('The Cochrane review found acamprosate did not significantly reduce heavy drinking.',nc).forEach(l=>{s+=`<text x="${tx}" y="${ty}" class="t-xs" style="fill:var(--ink)">${l}</text>`;ty+=12});
    });
    if(!N)s+=`<line x1="360" x2="360" y1="20" y2="290" style="stroke:var(--line)"/>`;
    ns.innerHTML=s;
    const L=ME_NNT[src].lab,a=ME_NNT[src][out].aca,n=ME_NNT[src][out].ntx;
    $('#meNntNote').innerHTML=noteHTML({k:L,t:out==='any'?'Preventing a return to any drinking':'Preventing a return to heavy drinking',
      txt:(out==='any'?`Acamprosate NNT ${a[0]} (95% CI ${a[1]}) vs oral naltrexone NNT ${n[0]} (${n[1]}): a lower NNT means more people helped per 100 treated. In direct comparisons the two did not differ significantly for any drinking or heavy drinking. ${src==='m'?'<sup class="c" data-ref="Jonas2014JAMA,McPheeters2023JAMA" title="Source 209,326">209,326</sup>':'<sup class="c" data-ref="Jonas2014JAMA" title="Source 209">209</sup>'}`
        :`Oral naltrexone NNT ${n[0]} (95% CI ${n[1]}). Acamprosate has no NNT for this outcome: the Cochrane review found it did not significantly reduce heavy drinking. ${src==='m'?'<sup class="c" data-ref="McPheeters2023JAMA,Rosner2010Acamprosate" title="Source 326,403">326,403</sup>':'<sup class="c" data-ref="Jonas2014JAMA,Rosner2010Acamprosate" title="Source 209,403">209,403</sup>'}`)+` A wide interval means the true effect could be much smaller or larger than the central estimate.`,
      pt:`Out of every 100 people who take the medicine, a handful avoid going back to drinking who otherwise would not have. That is a real effect for a common, serious condition, and these medicines work best alongside counselling or support. <sup class="c" data-ref="McPheeters2023JAMA" title="Source 326">326</sup>`,
      hook:`Jonas 2014 NNTs: acamprosate 12 (any drinking); oral naltrexone 20 (any) and 12 (heavy). Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving. <sup class="c" data-ref="Jonas2014JAMA,Maisel2013" title="Source 209,305">209,305</sup>`})
      +`<div class="kv"><div><dt>Harms</dt><dd>Naltrexone: one extra trial withdrawal for adverse events per 48 treated; nausea RR 1.73. Acamprosate: adverse-event withdrawals not significantly increased; diarrhoea RR 1.58. <sup class="c" data-ref="Jonas2014JAMA,McPheeters2023JAMA" title="Source 209,326">209,326</sup></dd></div></div>`;
  }
  function redrawN(){stopN&&stopN();stopN=animate(900,drawN,()=>{stopN=null})}
  $$('[data-mesrc]').forEach(b=>b.addEventListener('click',()=>{src=b.dataset.mesrc;$$('[data-mesrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));redrawN()}));
  $$('[data-meout]').forEach(b=>b.addEventListener('click',()=>{out=b.dataset.meout;$$('[data-meout]').forEach(x=>x.setAttribute('aria-pressed',x===b));redrawN()}));
  drawN(1);

  /* ---- situation highlighter ---- */
  const SITN={liver:'Liver disease: acamprosate is not metabolised by the liver; disulfiram is contraindicated (ACG); naltrexone is used in compensated but avoided in decompensated cirrhosis (ACG). <sup class="c" data-ref="Jophlin2024ACG,FDA-Campral" title="Source 113,215">113,215</sup>',
    kidney:'Kidney disease: acamprosate is cleared by the kidneys, so its label lowers the dose and contraindicates it at creatinine clearance ≤30 mL/min. <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>',
    opioid:'Opioid use: naltrexone blocks opioids and is contraindicated with current opioid use or dependence, including methadone or buprenorphine. <sup class="c" data-ref="FDA-Naltrexone" title="Source 117">117</sup>',
    abst:'Goal of abstinence: acamprosate’s label is for people already abstinent; disulfiram needs at least 12 hours without alcohol and the person’s full knowledge. <sup class="c" data-ref="FDA-Campral,FDA-Antabuse" title="Source 112,113">112,113</sup>',
    reduce:'Goal of cutting down: naltrexone has the clearest effect on heavy drinking; acamprosate did not significantly reduce it. <sup class="c" data-ref="Rosner2010Naltrexone,Rosner2010Acamprosate" title="Source 403,404">403,404</sup>'};
  $$('[data-mesit]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.mesit,on=b.getAttribute('aria-pressed')!=='true';
    $$('[data-mesit]').forEach(x=>x.setAttribute('aria-pressed',on&&x===b));
    $$('#m-medicines tr[data-sit]').forEach(r=>r.classList.toggle('hl',on&&r.dataset.sit===k));
    $('#meSitNote').innerHTML=on?SITN[k]:'Pick a situation to highlight its row.'}));

  /* ---- COMBINE bars ---- */
  const cs=$('#meCombSvg');
  function drawC(p){const N=vb(cs,'720 250','400 330');let s='';
    const x0=N?14:250,x1=N?340:650,X=v=>x0+(x1-x0)*v/100,rh=N?58:40,top=N?24:30;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-8}" y2="${top+rh*5}" class="grid"/><text x="${f1(X(v))}" y="${top+rh*5+14}" class="t-xs t-mid">${v}%</text>`});
    ME_COMB.forEach(([l,v,hi],i)=>{const y=top+i*rh,by=N?y+18:y+6,w=(X(v)-x0)*ease(p);
      s+=`<text x="${N?x0:x0-10}" y="${N?y+12:y+18}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${l}</text>`;
      s+=`<rect x="${x0}" y="${by}" width="${f1(w)}" height="${N?18:16}" rx="4" style="fill:${hi?'var(--rx)':i===0?'var(--muted)':'var(--rx-soft)'};stroke:var(--rx);stroke-width:${hi?0:1}"/>`;
      s+=`<text x="${f1(x0+w+6)}" y="${by+(N?13:12)}" class="t-sm" style="fill:var(--ink);font-weight:600">${(v*ease(p)).toFixed(1)}</text>`});
    s+=`<text x="${N?x0:x0}" y="${top-14}" class="t-xs">PERCENT DAYS ABSTINENT DURING 16 WEEKS</text>`;
    cs.innerHTML=s}
  drawC(1);

  /* ---- underuse ---- */
  const us=$('#meUseSvg');
  function drawU(){const N=vb(us,'720 200','400 220');let s='';const cols=N?20:25,sp=N?18.5:20,ox=N?16:24,oy=N?16:20;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),c=i%cols;s+=person(ox+c*sp+6,oy+r*(sp+6),16,i<8?'var(--rx)':'var(--brain-line)',{op:i<8?1:.35})}
    const ty=N?oy+5*(sp+6)+26:oy+4*(sp+6)+30;
    s+=`<text x="${ox}" y="${ty}" style="font:800 22px var(--display);fill:var(--rx)">fewer than 9 in 100</text>`;
    meWrap('people likely to benefit are prescribed an AUD medicine',N?46:90).forEach((l,k)=>{s+=`<text x="${ox}" y="${ty+18+k*13}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
    us.innerHTML=s}
  drawU();

  /* ---- approval timeline ---- */
  const ts=$('#meTlSvg');
  function drawT(){const N=vb(ts,'720 190','400 260');let s='';
    if(N){s+=`<line x1="40" x2="40" y1="16" y2="244" style="stroke:var(--rx);stroke-width:2"/>`;
      ME_TL.forEach(([yr,l],i)=>{const y=30+i*40;s+=`<circle cx="40" cy="${y}" r="6" style="fill:${i===5?'var(--panel)':'var(--rx)'};stroke:var(--rx);stroke-width:2"/><text x="56" y="${y+4}" class="t-lbl">${yr}</text><text x="100" y="${y+4}" class="t-sm" style="fill:var(--ink)">${l.join(' ')}</text>`})}
    else{const AY=100,T=tline(40,AY,640,{min:1945,max:2020,step:5,fmt:v=>v%10?'':v});s+=T.svg;
      ME_TL.forEach(([yr,l,lv],i)=>{const x=T.X(yr),up=lv%2===0,yb=[62,132,24,166][lv],anc=i===5?' t-end':' t-mid',tx=i===5?x+40:x;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${AY}" y2="${up?yb+16:yb-12}" style="stroke:var(--rx);stroke-width:1"/><circle cx="${f1(x)}" cy="${AY}" r="5" style="fill:${i===5?'var(--panel)':'var(--rx)'};stroke:var(--rx);stroke-width:2"/>`;
        s+=`<text x="${f1(tx)}" y="${up?yb-4:yb}" class="t-sm${anc}" style="fill:var(--ink);font-weight:600">${yr} · ${l[0]}</text><text x="${f1(tx)}" y="${up?yb+9:yb+13}" class="t-xs${anc}">${l[1]}</text>`})}
    ts.innerHTML=s}
  drawT();
  const prevR=redraws.medicines;redraws.medicines=()=>{prevR&&prevR();drawN(1);drawC(1);drawU();drawT()};
};
/* =============== 4.2 Other medicines: topiramate, gabapentin, baclofen and more =============== */
const OL_ROWS=[
 {n:'Topiramate',reg:'US: approved for other uses',st:'Meta-analysis · 7 RCTs, 1,125',lv:3,eff:['Abstinence g 0.47, heavy days g 0.41','Paresthesia 50.8% vs 10.6%'],ev:'est',rev:.02,
  det:`<div><dt>Status</dt><dd>US approvals for seizures, migraine prevention and, with phentermine, weight loss; AUD is not one of them. The VA/DoD guideline lists it among first-line AUD treatments. <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup></dd></div><div><dt>Trials</dt><dd>Single-site RCT (n=150): 2.88 fewer drinks a day and 27.6% fewer heavy drinking days than placebo. Multisite RCT (n=371, 17 US sites): percent heavy drinking days 8.44 points lower (95% CI 3.07–13.80). Meta-analysis of 7 RCTs: abstinence g = 0.468, heavy drinking g = 0.406; Jonas 2014 rated the evidence moderate. <sup class="c" data-ref="Johnson2003Lancet,Johnson2007Topiramate,Blodgett2014Topiramate,Jonas2014JAMA" title="Source 41,205,206,209">41,205,206,209</sup></dd></div><div><dt>Harms</dt><dd>Paresthesia 50.8% vs 10.6%, taste change 23.0% vs 4.8%, poor appetite 19.7% vs 6.9%, difficulty concentrating 14.8% vs 3.2%; more adverse-event dropouts than placebo (RR 2.18). <sup class="c" data-ref="Johnson2007Topiramate,Bahji2022NMA" title="Source 31,206">31,206</sup></dd></div>`},
 {n:'Gabapentin',reg:'Not FDA-approved for AUD',st:'Meta-analysis · 7 RCTs',lv:3,eff:['1,800 mg/d: 17.0% vs 4.1% abstinent','Multisite prodrug trial: no benefit'],ev:'early',rev:.20,
  det:`<div><dt>Trials</dt><dd>Dose-ranging RCT (n=150, 12 weeks): complete abstinence 4.1% on placebo, 11.1% at 900 mg/day and 17.0% at 1,800 mg/day. In people with recent withdrawal symptoms (n=90), 27% vs 9% had no heavy drinking days. The extended-release prodrug gabapentin enacarbil (n=346) did not beat placebo. <sup class="c" data-ref="Mason2014Gabapentin,Anton2020Gabapentin,Falk2019GabapentinEnacarbil" title="Source 13,110,318">13,110,318</sup></dd></div><div><dt>Overall</dt><dd>In a meta-analysis of 7 RCTs every outcome pointed toward gabapentin, but only percent heavy drinking days showed clear benefit (g = −0.64). Misuse in about 1% of the general population is cited against first-line use. <sup class="c" data-ref="Kranzler2019Gabapentin,KranzlerSoyka2018" title="Source 260,261">260,261</sup></dd></div>`},
 {n:'Baclofen',reg:'France: authorised 2018',st:'Cochrane · 17 RCTs, 1,818',lv:3,eff:['Relapse RR 0.87; abstinent days up','Best dose unsettled'],ev:'est',rev:.38,
  det:`<div><dt>Status</dt><dd>A GABA-B receptor agonist approved in the US for spasticity. France allowed doses up to 300 mg/day under a temporary recommendation from March 2014, cut the maximum to 80 mg/day in July 2017 and granted a marketing authorisation in October 2018. <sup class="c" data-ref="KranzlerSoyka2018,deBeaurepaire2022TRU,Payet2026Baclofen" title="Source 82,261,359">82,261,359</sup></dd></div><div><dt>Evidence</dt><dd>Cochrane 2023: probably lowers relapse risk (RR 0.87, 95% CI 0.77–0.99; moderate certainty) and increases percent days abstinent (MD 9.07; high certainty), mainly in detoxified participants; no effect on heavy drinking days. Fatigue, dizziness, sleepiness, dry mouth and muscle problems were more common. <sup class="c" data-ref="Agabio2023Cochrane" title="Source 5">5</sup></dd></div>`},
 {n:'Nalmefene',reg:'EU: authorised to cut drinking',st:'Two RCTs · n=604 and 718',lv:2,eff:['−2.3 and −1.7 heavy days a month','NNH 12 (adverse-event dropout)'],ev:'est',rev:.56,
  det:`<div><dt>Status</dt><dd>A mu- and delta-opioid antagonist and kappa partial agonist. In the US it is approved only to reverse opioid effects; the EU authorised it, taken as needed, to reduce drinking in adults at a high drinking-risk level (men &gt;60 g/day, women &gt;40 g/day). <sup class="c" data-ref="KranzlerSoyka2018,vandenBrink2013Nalmefene" title="Source 261,473">261,473</sup></dd></div><div><dt>Trials</dt><dd>ESENSE 1: 2.3 fewer heavy drinking days a month than placebo at month 6 and 11.0 g/day less alcohol. ESENSE 2: 1.7 fewer heavy days; the fall in total alcohol was not significant. Reviewers called the approval controversial because the efficacy evidence came from a retrospectively defined subgroup. <sup class="c" data-ref="Mann2013ESENSE1,Gual2013ESENSE2,KranzlerSoyka2018" title="Source 152,261,310">152,261,310</sup></dd></div>`},
 {n:'Sodium oxybate',reg:'Italy, Austria: approved',st:'Cochrane · 13 RCTs',lv:3,eff:['Abstinence RR 5.35 (Cochrane)','Misuse risk; sedative with alcohol'],ev:'early',rev:.64,
  det:`<div><dt>Status</dt><dd>Approved in Italy since 1991 and Austria since 1999 for alcohol withdrawal and maintaining abstinence. <sup class="c" data-ref="Guiraud2022SMO" title="Source 153">153</sup></dd></div><div><dt>Evidence</dt><dd>Cochrane 2010 (13 RCTs, 11 from Italy): better than placebo at mid-term for abstinence (RR 5.35, 1.28–22.4) and relapse (RR 0.36), with concern about addiction or misuse. An international RCT (n=314) found 43.1 more days of cumulative abstinence in the prespecified analysis. It is a central nervous system depressant: with alcohol or other sedatives it is a safety concern. <sup class="c" data-ref="Leone2010Cochrane,Guiraud2022SMO" title="Source 153,282">153,282</sup></dd></div>`},
 {n:'Varenicline',reg:'Not FDA-approved for AUD',st:'One RCT · n=200',lv:1,eff:['% heavy drinking days −10.4 points','Similar in smokers and non-smokers'],ev:'early',rev:.76,
  det:`<div><dt>Trial</dt><dd>13 weeks, titrated to 2 mg/day as published: lower weekly percent heavy drinking days than placebo (adjusted mean difference 10.4), with fewer drinks per day and less craving, and similar effects in smokers and non-smokers. <sup class="c" data-ref="Litten2013Varenicline" title="Source 295">295</sup></dd></div>`},
 {n:'Ondansetron',reg:'Not FDA-approved for AUD',st:'Two RCTs · n=271, 283',lv:2,eff:['LL genotype: +11.27% days abstinent','Early-onset AUD: 70.1% vs 50.2%'],ev:'early',rev:.83,
  det:`<div><dt>Trials</dt><dd>In early-onset AUD (n=271, 11 weeks), percent days abstinent was 70.10 vs 50.20 on placebo. In a genotype trial (n=283), people with the 5-HTT LL genotype on ondansetron had 1.62 fewer drinks per drinking day and 11.27% more days abstinent. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Johnson2000JAMA,Johnson2011Ondansetron" title="Source 204,207">204,207</sup></dd></div>`},
 {n:'Prazosin',reg:'Not FDA-approved for AUD',st:'One RCT · n=92',lv:1,eff:['Drinks and heavy days fell faster','More drowsiness and oedema'],ev:'early',rev:.90,
  det:`<div><dt>Trial</dt><dd>92 people without PTSD, 12 weeks: drinks and heavy drinking days fell faster than on placebo, with more drowsiness and oedema. A related medicine, doxazosin (n=41), showed no overall difference, reducing drinking only in people with a dense family history of AUD. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Simpson2018Prazosin,Kenna2016Doxazosin" title="Source 236,432">236,432</sup></dd></div>`}
];
const OL_STEPS=[
 {from:0,at:.1,k:'Row 1 of 8',t:'Topiramate',
  txt:`An anticonvulsant thought to reduce alcohol's reinforcing effects by boosting GABA and inhibiting glutamate pathways. <span class="ev hyp">Hypothesis</span> Several RCTs and a meta-analysis show less heavy drinking and more abstinence. <sup class="c" data-ref="Johnson2007Topiramate,Blodgett2014Topiramate" title="Source 41,206">41,206</sup>`,
  pt:`Topiramate, a seizure and migraine medicine, helps some people drink less, but tingling hands and feet are common.`,
  hook:`Topiramate's signature side effect: paresthesia (50.8% vs 10.6%). <sup class="c" data-ref="Johnson2007Topiramate" title="Source 206">206</sup>`},
 {from:.19,at:.28,k:'Row 2 of 8',t:'Gabapentin',
  txt:`Positive single-site trials, including one in people with withdrawal symptoms, sit beside a negative multisite trial of the prodrug. The APA guideline places it, with topiramate, as an option for people who prefer it or for whom the approved medicines did not work. <sup class="c" data-ref="Mason2014Gabapentin,Anton2020Gabapentin,Falk2019GabapentinEnacarbil,Reus2018APA,Kranzler2019Gabapentin" title="Source 13,110,260,318,386">13,110,260,318,386</sup>`,
  pt:`Gabapentin may help, especially for people whose withdrawal symptoms linger, but it can be misused and the trials are mixed.`,
  hook:`Gabapentin dose-response (Mason 2014): 17.0% abstinent at 1,800 mg/day vs 4.1% on placebo. <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>`},
 {from:.37,at:.46,k:'Row 3 of 8',t:'Baclofen',
  txt:`A GABA-B agonist with the only randomised trial in people with cirrhosis among these medicines, and a Cochrane review showing fewer relapses. High-dose trials disagree. <sup class="c" data-ref="Addolorato2007Lancet,Agabio2023Cochrane,Rigal2020Bacloville,Reynaud2017Alpadir" title="Source 2,5,387,389">2,5,387,389</sup>`,
  pt:`Baclofen, a muscle relaxant, can help some people stay off alcohol, including people with liver scarring; it causes sleepiness.`,
  hook:`Baclofen in cirrhosis: 71% vs 29% achieved and kept abstinence over 12 weeks (Addolorato 2007). <sup class="c" data-ref="Addolorato2007Lancet" title="Source 2">2</sup>`},
 {from:.55,at:.70,k:'Rows 4–5 of 8',t:'Approved elsewhere',
  txt:`Nalmefene is authorised in the EU to reduce drinking; sodium oxybate is approved in Italy and Austria. Neither is approved for AUD in the US. Both decisions rest on trials whose interpretation is debated: a post-hoc subgroup for nalmefene, misuse risk for sodium oxybate. <sup class="c" data-ref="vandenBrink2013Nalmefene,KranzlerSoyka2018,Guiraud2022SMO,Leone2010Cochrane" title="Source 153,261,282,473">153,261,282,473</sup>`,
  pt:`Different countries approve different medicines for AUD. A medicine available in one country may not be approved in another.`,
  hook:`Nalmefene: EU-approved, taken as needed, with reduced drinking as its goal. <sup class="c" data-ref="vandenBrink2013Nalmefene,Mann2013ESENSE1" title="Source 310,473">310,473</sup>`},
 {from:.75,at:.97,k:'Rows 6–8 of 8',t:'Smaller trials',
  txt:`Varenicline, ondansetron and prazosin each have one or two randomised trials. Ondansetron's effect depended on genotype and age of onset, a lead for personalised treatment that has not been confirmed. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Litten2013Varenicline,Johnson2011Ondansetron,Simpson2018Prazosin" title="Source 207,295,432">207,295,432</sup>`,
  pt:`These medicines showed promise in a trial or two. That is a reason to study them more, not yet a reason to rely on them.`,
  hook:`Varenicline (a smoking-cessation medicine) cut heavy drinking days in smokers and non-smokers alike. <sup class="c" data-ref="Litten2013Varenicline" title="Source 295">295</sup>`}
];
const OL_AG=['Topiramate','Gabapentin','Baclofen','Nalmefene','Sodium oxybate','Varenicline','Ondansetron','Prazosin','Doxazosin','Naltrexone (OPRM1)'];
const OL_FILT={
 liver:{ag:['Baclofen','Gabapentin','Topiramate'],li:[`<b>Baclofen</b>: the RCT in cirrhosis (84 people, 12 weeks) found 71% vs 29% achieved and kept abstinence, with no hepatic side effects recorded. The ACG calls it the non-FDA-approved medicine most studied in advanced liver disease. <sup class="c" data-ref="Addolorato2007Lancet,Jophlin2024ACG" title="Source 2,215">2,215</sup>`,`<b>Gabapentin and topiramate</b>: acceptable safety in alcohol-associated liver disease (ACG), but large prospective trials are needed. In a biobank cohort, gabapentin was associated with less hepatic decompensation in cirrhosis (aOR 0.36), an observational association, not proof of cause. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Jophlin2024ACG,Vannier2022" title="Source 215,475">215,475</sup>`]},
 smoke:{ag:['Varenicline'],li:[`<b>Varenicline</b>: in the 200-person trial, the fall in heavy drinking days was similar in smokers and non-smokers. <sup class="c" data-ref="Litten2013Varenicline" title="Source 295">295</sup>`]},
 wd:{ag:['Gabapentin','Sodium oxybate'],li:[`<b>Gabapentin</b>: in people with recent withdrawal symptoms (n=90), 27% vs 9% had no heavy drinking days; the benefit appeared only in the high-withdrawal subgroup (NNT 3.1). <sup class="c" data-ref="Anton2020Gabapentin" title="Source 13">13</sup>`,`<b>Sodium oxybate</b>: approved in Italy and Austria for alcohol withdrawal and maintaining abstinence. <sup class="c" data-ref="Guiraud2022SMO" title="Source 153">153</sup>`,`Withdrawal itself needs medical care: get medical help to stop safely. See <a href="#" data-go="detox">managing withdrawal safely</a>.`]},
 ptsd:{ag:[],li:[`No trial in people with PTSD is summarised in this guide's sources. The prazosin trial summarised here enrolled 92 people <i>without</i> PTSD: drinks and heavy drinking days fell faster than on placebo. <sup class="c" data-ref="Simpson2018Prazosin" title="Source 432">432</sup>`]},
 reduce:{ag:['Nalmefene','Topiramate','Baclofen'],li:[`<b>Nalmefene</b>: its EU authorisation is to reduce drinking in people at a high drinking-risk level. <sup class="c" data-ref="vandenBrink2013Nalmefene" title="Source 473">473</sup>`,`<b>Topiramate</b>: in heavy drinkers aiming to cut down (n=138), it reduced heavy drinking days. <sup class="c" data-ref="Kranzler2014GRIK1" title="Source 258">258</sup>`,`<b>Baclofen</b>: in Bacloville, 57% vs 36% reached no or low-risk drinking in the last month. <sup class="c" data-ref="Rigal2020Bacloville" title="Source 389">389</sup>`]},
 gene:{ag:['Ondansetron','Topiramate','Doxazosin','Naltrexone (OPRM1)'],li:[`<b>Ondansetron</b>: benefit in people with the 5-HTT LL genotype. <sup class="c" data-ref="Johnson2011Ondansetron" title="Source 207">207</sup>`,`<b>Topiramate</b>: in European-American participants the effect appeared only in GRIK1 rs2832407 C-allele homozygotes. <sup class="c" data-ref="Kranzler2014GRIK1" title="Source 258">258</sup>`,`<b>Doxazosin</b>: reduced drinking only with a dense family history of AUD and increased it with a sparse one. <sup class="c" data-ref="Kenna2016Doxazosin" title="Source 236">236</sup>`,`<b>Naltrexone and OPRM1</b>: positive retrospective analyses, a negative prospective trial; gene testing to choose a medicine is not supported. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Anton2008OPRM1,Oslin2015JAMAPsych,KranzlerSoyka2018" title="Source 12,261,353">12,261,353</sup>`]}
};
const OL_GABA={abst:{t:'Complete abstinence',v:[4.1,11.1,17.0],nnt:'NNT 8 at 1,800 mg/day'},nohd:{t:'No heavy drinking',v:[22.5,29.6,44.7],nnt:'NNT 5 at 1,800 mg/day'}};
const OL_BAC=[ {n:'Cirrhosis RCT · 2007',s:'84 people · 12 weeks · abstinence',p:29,b:71,sig:1},{n:'Bacloville · 2020',s:'320 people · 12 months · no or low-risk drinking',p:36,b:57,sig:1},{n:'ALPADIR · 2017',s:'320 people · 20 weeks · abstinence',p:10.5,b:11.9,sig:0} ];
const OL_NMA=[ ['GHB (sodium oxybate)',1.90],['Baclofen',1.80],['Disulfiram',1.71],['Gabapentin',1.66],['Acamprosate',1.33],['Oral naltrexone',1.15] ];
function olChip(x,y,ev,o={}){const est=ev==='est',w=o.w||88;return `<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="17" rx="4" style="fill:${est?'var(--good-soft)':'var(--warn-soft)'};opacity:${o.op==null?1:o.op}"/><text x="${f1(x+w/2)}" y="${f1(y+12)}" class="t-xs t-mid" style="fill:${est?'var(--good)':'var(--warn)'};font-weight:700;opacity:${o.op==null?1:o.op}">${est?'ESTABLISHED':'EARLY EVIDENCE'}</text>`}
function olRungs(x,y,lv,a){let s='';for(let i=0;i<3;i++){const h=5+i*4;s+=`<rect x="${x+i*7}" y="${f1(y-h)}" width="5" height="${h}" rx="1" style="fill:${i<lv?'var(--rx)':'var(--panel-2)'};opacity:${f1(i<lv?a:1)}"/>`}return s}
inits.offlabel=()=>{
  /* ---- evidence ladder ---- */
  const svg=$('#olSvg'),rg=$('#olT');
  function draw(t){
    const N=vb(svg,'720 386','400 712');let s='',cur=0;
    OL_ROWS.forEach((r,i)=>{if(t>=r.rev)cur=i});
    if(!N){s+=`<text x="16" y="24" class="t-xs">MEDICINE · STATUS</text><text x="196" y="24" class="t-xs">STRONGEST EVIDENCE</text><text x="402" y="24" class="t-xs">HEADLINE RESULT</text><text x="618" y="24" class="t-xs">LABEL</text><line x1="10" x2="710" y1="32" y2="32" class="axis"/>`}
    else s+=`<text x="16" y="22" class="t-xs">MEDICINE · STATUS · EVIDENCE · RESULT</text><line x1="10" x2="390" y1="30" y2="30" class="axis"/>`;
    OL_ROWS.forEach((r,i)=>{const a=ramp(t,r.rev,r.rev+.05),ca=ramp(t,r.rev+.03,r.rev+.08);if(a<=0)return;
      const dx=(1-ease(a))*24,on=i===cur;
      if(!N){const y=36+i*43;
        s+=`<g transform="translate(${f1(dx)} 0)" style="opacity:${f1(a)}">`;
        if(on)s+=`<rect x="8" y="${y}" width="704" height="40" rx="8" style="fill:var(--rx-soft)"/>`;
        s+=`<text x="16" y="${y+17}" class="t-lbl">${r.n}</text><text x="16" y="${y+31}" class="t-xs">${r.reg}</text>`;
        s+=olRungs(196,y+28,r.lv,ca)+`<text x="222" y="${y+25}" class="t-xs" style="fill:var(--ink)">${r.st}</text>`;
        s+=`<text x="402" y="${y+17}" class="t-xs" style="fill:var(--ink)">${r.eff[0]}</text><text x="402" y="${y+31}" class="t-xs">${r.eff[1]}</text>`;
        s+=olChip(618,y+11,r.ev,{op:f1(ca)})+'</g>'}
      else{const y=36+i*84;
        s+=`<g transform="translate(${f1(dx)} 0)" style="opacity:${f1(a)}">`;
        if(on)s+=`<rect x="6" y="${y}" width="388" height="80" rx="8" style="fill:var(--rx-soft)"/>`;
        s+=`<text x="14" y="${y+18}" class="t-lbl">${r.n}</text>`+olChip(280,y+6,r.ev,{op:f1(ca),w:106});
        s+=`<text x="14" y="${y+33}" class="t-xs">${r.reg}</text>`;
        s+=olRungs(14,y+48,r.lv,ca)+`<text x="40" y="${y+47}" class="t-xs" style="fill:var(--ink)">${r.st}</text>`;
        s+=`<text x="14" y="${y+62}" class="t-xs" style="fill:var(--ink)">${r.eff[0]}</text><text x="14" y="${y+75}" class="t-xs">${r.eff[1]}</text></g>`}
    });
    svg.innerHTML=s;
    const p=phaseOf(OL_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`Row ${cur+1} of 8: ${OL_ROWS[cur].n}`);
    $('#olNote').innerHTML=noteHTML(OL_STEPS[p])+`<div class="kv"><div><dt>Now showing</dt><dd><b>${OL_ROWS[cur].n}</b> ${OL_ROWS[cur].ev==='est'?'<span class="ev est">Established</span>':'<span class="ev early">Early evidence</span>'}</dd></div>${OL_ROWS[cur].det}</div>`;
  }
  const stop=playWire(rg,$('#olPlay'),draw,26000,'Replay','offlabel');
  const setSt=stepWire($('#olSteps'),OL_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- situation filter ---- */
  const fs=$('#olFiltSvg');let fk='liver';
  function drawF(){const N=vb(fs,'720 110','400 230'),F=OL_FILT[fk];let s='';
    const cols=N?2:5,cw=N?186:138,ch=N?36:40,ox=N?10:12,oy=N?8:10;
    OL_AG.forEach((g,i)=>{const r=Math.floor(i/cols),c=i%cols,x=ox+c*(cw+(N?8:4)),y=oy+r*(ch+(N?8:10)),on=F.ag.includes(g);
      s+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'}"/>`;
      s+=`<text x="${x+cw/2}" y="${y+ch/2+4.5}" class="t-lbl t-mid" style="fill:${on?'var(--on-brand)':'var(--muted)'};font-size:12.5px">${g}</text>`});
    fs.innerHTML=s;
    $('#olFiltList').innerHTML=F.li.map(l=>`<li>${l}</li>`).join('')}
  $$('[data-olf]').forEach(b=>b.addEventListener('click',()=>{fk=b.dataset.olf;$$('[data-olf]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawF()}));
  drawF();

  /* ---- gabapentin dose-response ---- */
  const gs=$('#olGabaSvg');let gk='abst',gv=OL_GABA.abst.v.slice(),stopG=null;
  function drawG(v){const N=vb(gs,'720 270','400 320'),D=OL_GABA[gk];let s='';
    const x0=N?50:90,x1=N?390:560,yb=N?260:220,yt=N?62:30,mx=50,Y=u=>yb-(yb-yt)*u/mx,bw=N?70:90,gap=(x1-x0)/3;
    [0,10,20,30,40,50].forEach(u=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(u))}" y2="${f1(Y(u))}" class="grid"/><text x="${x0-8}" y="${f1(Y(u)+3)}" class="t-xs t-end">${u}%</text>`});
    ['Placebo','900 mg/day','1,800 mg/day'].forEach((l,i)=>{const cx=x0+gap*(i+.5),h=yb-Y(v[i]);
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(yb-h)}" width="${bw}" height="${f1(h)}" rx="5" style="fill:${i?'var(--rx)':'var(--muted)'};opacity:${i===1?.6:1}"/>`;
      s+=`<text x="${f1(cx)}" y="${f1(yb-h-7)}" class="t-lbl t-mid">${v[i].toFixed(1)}%</text><text x="${f1(cx)}" y="${yb+16}" class="t-sm t-mid" style="fill:var(--ink)">${l}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    s+=`<text x="${x0}" y="${N?20:18}" class="t-sm" style="fill:var(--ink);font-weight:600">${D.t.toUpperCase()} · 12 WEEKS</text>`;
    if(!N){s+=`<text x="590" y="70" style="font:800 24px var(--display);fill:var(--rx)">${D.nnt.split(' at ')[0]}</text><text x="590" y="88" class="t-xs">at 1,800 mg/day</text><text x="590" y="100" class="t-xs">vs placebo</text>`;
      s+=`<text x="590" y="122" class="t-xs">Adverse-event stops</text><text x="590" y="135" class="t-xs">did not differ</text><text x="590" y="148" class="t-xs">between groups</text>`}
    else s+=`<text x="390" y="42" class="t-sm t-end" style="fill:var(--rx);font-weight:700">${D.nnt.split(' at ')[0]} at 1,800 mg/d</text>`;
    gs.innerHTML=s;
    $('#olGabaNote').innerHTML=noteHTML({k:'Mason 2014 · 150 people · 12 weeks',t:`${D.t}: ${OL_GABA[gk].v.map(x=>x.toFixed(1)+'%').join(', ')}`,
      txt:`Complete abstinence was 4.1% on placebo, 11.1% at 900 mg/day and 17.0% at 1,800 mg/day (NNT 8); no heavy drinking was 22.5%, 29.6% and 44.7% (NNT 5). Sleep, mood and craving also improved with dose, and adverse-event terminations did not differ between groups. <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>`,
      pt:`In this one trial, more gabapentin meant more people stopped or cut down. One trial is not the last word: a larger multisite trial of a related prodrug was negative. <sup class="c" data-ref="Mason2014Gabapentin,Falk2019GabapentinEnacarbil" title="Source 110,318">110,318</sup>`,
      hook:`A rising bar from placebo to the higher dose is a dose-response: one of the signs that an effect may be real. <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>`})}
  $$('[data-olg]').forEach(b=>b.addEventListener('click',()=>{gk=b.dataset.olg;$$('[data-olg]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=gv.slice(),to=OL_GABA[gk].v;stopG&&stopG();stopG=animate(700,p=>{gv=from.map((f,i)=>lerp(f,to[i],ease(p)));drawG(gv)},()=>{gv=to.slice();drawG(gv);stopG=null})}));
  drawG(gv);

  /* ---- baclofen dumbbells ---- */
  const bs=$('#olBacSvg');
  function drawB(){const N=vb(bs,'720 270','400 390');let s='';
    const x0=N?20:300,x1=N?380:690,X=u=>x0+(x1-x0)*u/100,rh=N?92:64,top=N?50:40;
    [0,25,50,75,100].forEach(u=>{s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${top-10}" y2="${top+rh*3-8}" class="grid"/><text x="${f1(X(u))}" y="${top-14}" class="t-xs t-mid">${u}%</text>`});
    OL_BAC.forEach((r,i)=>{const y=top+i*rh,ly=N?y+14:y+14,dy=N?y+52:y+20;
      s+=`<text x="${N?20:16}" y="${ly}" class="t-lbl">${r.n}</text><text x="${N?20:16}" y="${ly+15}" class="t-xs">${r.s}</text>`;
      s+=`<line x1="${f1(X(r.p))}" x2="${f1(X(r.b))}" y1="${dy}" y2="${dy}" style="stroke:var(--rx);stroke-width:4;opacity:.45;stroke-linecap:round"/>`;
      s+=`<circle cx="${f1(X(r.p))}" cy="${dy}" r="7" style="fill:var(--muted)"/><circle cx="${f1(X(r.b))}" cy="${dy}" r="7" style="fill:var(--rx)"/>`;
      const close=Math.abs(r.b-r.p)<10;
      s+=`<text x="${f1(X(r.p)-(close?10:0))}" y="${dy+20}" class="t-xs ${close?'t-end':'t-mid'}">${r.p}%</text><text x="${f1(X(r.b)+(close?10:0))}" y="${dy+20}" class="t-xs ${close?'':'t-mid'}" style="fill:var(--rx);font-weight:700">${r.b}%${r.sig?'':' (n.s.)'}</text>`});
    const y=top+3*rh+(N?14:6);
    s+=`<text x="${N?20:16}" y="${y}" class="t-lbl">Dutch RCT · 2016</text>${(N?['151 people · no difference in time to first relapse;','only 15.5% reached 150 mg']:['151 people · no difference in time to first relapse; only 15.5% reached 150 mg']).map((l,k)=>`<text x="${N?20:16}" y="${y+15+k*13}" class="t-xs">${l}</text>`).join('')}`;
    const lx=N?220:16,ly2=14;s+=`<circle cx="${lx}" cy="${ly2-4}" r="5" style="fill:var(--muted)"/><text x="${lx+9}" y="${ly2}" class="t-xs">placebo</text><circle cx="${lx+70}" cy="${ly2-4}" r="5" style="fill:var(--rx)"/><text x="${lx+79}" y="${ly2}" class="t-xs">baclofen</text>`;
    bs.innerHTML=s}
  drawB();

  /* ---- network meta-analysis ---- */
  const nm=$('#olNmaSvg');
  function drawM(){const N=vb(nm,'720 250','400 345');let s='';
    const x0=N?14:230,x1=N?340:660,X=r=>x0+(x1-x0)*(r-1)/1.1,rh=N?48:34,top=N?34:30;
    [1,1.25,1.5,1.75,2].forEach(r=>{s+=`<line x1="${f1(X(r))}" x2="${f1(X(r))}" y1="${top-8}" y2="${top+rh*6}" class="${r===1?'axis':'grid'}"/><text x="${f1(X(r))}" y="${top+rh*6+14}" class="t-xs t-mid">${r.toFixed(2)}</text>`});
    OL_NMA.forEach(([l,v],i)=>{const y=top+i*rh,by=N?y+16:y+4,appr=l==='Disulfiram'||l==='Acamprosate'||l==='Oral naltrexone';
      s+=`<text x="${N?x0:x0-10}" y="${N?y+10:y+16}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${l}${appr?' (US-approved)':''}</text>`;
      s+=`<rect x="${x0}" y="${by}" width="${f1(X(v)-x0)}" height="16" rx="4" style="fill:${appr?'var(--rx)':'var(--rx-soft)'};stroke:var(--rx)"/><text x="${f1(X(v)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${v.toFixed(2)}</text>`});
    s+=`<text x="${x0}" y="${top-14}" class="t-xs">RISK RATIO FOR TOTAL ABSTINENCE VS PLACEBO</text>`;
    nm.innerHTML=s}
  drawM();
  const prevR=redraws.offlabel;redraws.offlabel=()=>{prevR&&prevR();drawF();drawG(gv);drawB();drawM()};
};
/* =============== 4.3 Talking therapies and mutual help =============== */
const TH_STEPS=[
 {from:0,at:.1,k:'Tool 1 · primary care, emergency care, wards',t:'Brief intervention',
  txt:`A nurse or doctor asks about drinking, gives personal feedback and advice, often in 5–15 minutes. In the 2018 Cochrane review (69 RCTs, 33,642 participants), people who had a brief intervention drank 20 g/week less at one year than people with minimal or no intervention (95% CI −28 to −12; moderate-quality evidence). Mean baseline intake was 244 g/week, so the cut is about 8%. Longer counselling added little. The USPSTF recommends screening adults 18 or older, including pregnant women, and offering brief behavioural counselling for risky drinking (B). <sup class="c" data-ref="Kaner2018Cochrane,USPSTF2018Alcohol" title="Source 220,470">220,470</sup>`,
  pt:`A short, respectful talk about drinking helps many people drink a bit less on average. It is a starting point, not the whole treatment.`,
  hook:`Brief intervention: −20 g/week at 1 year (Cochrane 2018). Not proven for dependence or very heavy drinking. <sup class="c" data-ref="Saitz2010" title="Source 411">411</sup>`},
 {from:.2,at:.31,k:'Tool 2 · a way of talking',t:'Motivational interviewing',
  txt:`Motivational interviewing (MI) helps a person voice their own reasons for change instead of being told. Picture a balance: the reasons to keep things as they are on one side, the reasons to change on the other. In the 2023 Cochrane review (93 studies, 22,776 participants), MI beat no intervention right after treatment (SMD 0.48, 95% CI 0.07–0.89; low certainty), less at short-term follow-up (0.20) and not clearly at long-term follow-up (0.12, −0.00 to 0.25). It did no better than other active treatments. Motivational enhancement therapy (MET), a manualised version, did as well as CBT and twelve-step facilitation in Project MATCH. <sup class="c" data-ref="Schwenker2023,ProjectMATCH1997" title="Source 373,421">373,421</sup>`,
  pt:`Change sticks better when the reasons are yours. MI is a conversation that helps you hear them.`,
  hook:`MI effect: largest right after, fading later (SMD 0.48 → 0.20 → 0.12). At 3 years in MATCH, readiness to change and self-efficacy best predicted outcome. <sup class="c" data-ref="Schwenker2023,ProjectMATCH1998" title="Source 375,421">375,421</sup>`},
 {from:.4,at:.52,k:'Tool 3 · skills for risky moments',t:'CBT and relapse prevention',
  txt:`Cognitive behavioural therapy (CBT) maps the chain from a high-risk situation to a thought ("a drink would help"), an urge and a choice, and practises a coping response at each link. Marlatt's relapse-prevention model adds planning for lapses and building self-efficacy. A meta-analysis of 26 studies (9,504 participants) found relapse prevention effective, especially for alcohol and with medicine. CBT beat minimal treatment but not other specific therapies; combined with medicine it beat usual care (g 0.18–0.28). <sup class="c" data-ref="Larimer1999,Irvin1999,Magill2019,Ray2020CBT" title="Source 194,274,303,378">194,274,303,378</sup>`,
  pt:`CBT is practice for the hard moments: spot your triggers, notice the thought, and have a plan ready.`,
  hook:`Relapse prevention = high-risk situations, coping, self-efficacy, outcome expectancies and the abstinence violation effect. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`},
 {from:.6,at:.73,k:'Tool 4 · rewards for verified change',t:'Contingency management',
  txt:`Contingency management (CM) gives a reward, often a prize draw, for each test that shows no recent drinking. In an RCT of 79 outpatients with alcohol dependence and serious mental illness, 12 weeks of prize draws for urine ethyl glucuronide below 150 ng/mL (tested three times a week) made a negative sample 3.1 times more likely (95% CI 2.2–4.5), about 1.5 extra weeks of abstinence. Across substances CM has a mean effect of d = 0.42, larger for opiates and cocaine, and effects fade once rewards stop. The related community reinforcement approach reduces drinking days more than usual care. <sup class="c" data-ref="McDonell2017,Prendergast2006,Roozen2004CRA" title="Source 323,371,400">323,371,400</sup>`,
  pt:`Each alcohol-free test earns a small reward. It makes progress visible, week by week.`,
  hook:`EtG-based CM: alcohol-negative sample 3.1× more likely (McDonell 2017). CM effects fade after rewards stop. <sup class="c" data-ref="McDonell2017,Prendergast2006" title="Source 323,371">323,371</sup>`},
 {from:.8,at:.9,k:'Tool 5 · community and peers',t:'Mutual help: AA, TSF and SMART',
  txt:`Twelve-step facilitation (TSF) is a manualised therapy that links people to Alcoholics Anonymous. In the 2020 Cochrane review (27 studies, 10,565 participants), manualised AA/TSF gave more continuous abstinence at 12 months than other treatments such as CBT (RR 1.21, 95% CI 1.03–1.42; high certainty), and probably large healthcare savings. AA seems to work mainly through people: changes in social networks and confidence to stay abstinent in social settings explained 43–67% of its effect. Deeper involvement in SMART Recovery, LifeRing or Women for Sobriety went with outcomes no different from 12-step groups. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Kelly2020Cochrane,Kelly2012AAMech,Zemore2018" title="Source 228,234,513">228,234,513</sup>`,
  pt:`Groups connect you with people who support change. AA is free and in most communities; SMART, LifeRing and Women for Sobriety are other choices.`,
  hook:`Cochrane 2020: AA/TSF RR 1.21 (1.03–1.42) for 12-month continuous abstinence vs CBT and others; high certainty. <sup class="c" data-ref="Kelly2020Cochrane" title="Source 234">234</sup>`}
];
/* forest-style plot: rows {lab, v, lo, hi, col}; rev 0..1 reveals the rows in turn */
function thForest(x,y,w,rows,o){const mn=o.min,mx=o.max,pw=w-60,X=v=>x+pw*(clamp(v,mn,mx)-mn)/(mx-mn),rh=o.rh||40,rev=o.rev==null?1:o.rev;
  let s=`<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink);font-weight:600">${o.title}</text>`;
  const y0=y+14,yb=y0+rows.length*rh;
  if(o.ref!=null)s+=`<line x1="${f1(X(o.ref))}" x2="${f1(X(o.ref))}" y1="${f1(y0)}" y2="${f1(yb)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
  s+=`<line x1="${f1(x)}" x2="${f1(x+pw)}" y1="${f1(yb)}" y2="${f1(yb)}" class="axis"/>`;
  (o.ticks||[]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yb)}" y2="${f1(yb+4)}" class="axis"/><text x="${f1(X(v))}" y="${f1(yb+15)}" class="t-xs t-mid">${v}</text>`});
  if(o.unit)s+=`<text x="${f1(x+w)}" y="${f1(yb+28)}" class="t-xs t-end">${o.unit}</text>`;
  if(o.left)s+=`<text x="${f1(x)}" y="${f1(yb+28)}" class="t-xs">${o.left}</text>`;
  rows.forEach((r,i)=>{const a=clamp((rev*rows.length-i)*1.4);if(a<=0)return;const ry=y0+i*rh+rh*.62,c=r.col||'var(--rx)';
    s+=`<g style="opacity:${f1(a)}"><text x="${f1(x)}" y="${f1(y0+i*rh+12)}" class="t-sm" style="fill:var(--ink)">${r.lab}</text>`;
    if(r.bar){s+=`<rect x="${f1(X(o.ref||0))}" y="${f1(ry-5)}" width="${f1(Math.max(1,(X(r.v)-X(o.ref||0))*a))}" height="10" rx="3" style="fill:${c};opacity:.8"/>`}
    else{if(r.lo!=null){const l=X(lerp(r.v,r.lo,a)),h=X(lerp(r.v,r.hi,a));s+=`<line x1="${f1(l)}" x2="${f1(h)}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:${c};stroke-width:2"/><line x1="${f1(l)}" x2="${f1(l)}" y1="${f1(ry-4)}" y2="${f1(ry+4)}" style="stroke:${c};stroke-width:1.6"/><line x1="${f1(h)}" x2="${f1(h)}" y1="${f1(ry-4)}" y2="${f1(ry+4)}" style="stroke:${c};stroke-width:1.6"/>`}
      if(r.lo2!=null)s+=`<rect x="${f1(X(r.lo2))}" y="${f1(ry-4)}" width="${f1(X(r.hi2)-X(r.lo2))}" height="8" rx="4" style="fill:${c};opacity:.45"/>`;
      if(r.v!=null&&r.lo2==null)s+=`<rect x="${f1(X(r.v)-5)}" y="${f1(ry-5)}" width="10" height="10" style="fill:${c}" transform="rotate(45 ${f1(X(r.v))} ${f1(ry)})"/>`}
    s+=`<text x="${f1(x+w)}" y="${f1(ry+4)}" class="t-sm t-end" style="fill:${c};font-weight:700">${r.val}</text></g>`});
  return s}
/* the five scenes, drawn in a 440 × 290 box */
function thScene(p,u,rr){let s='';const g='var(--rx)',ink='var(--ink)';
  s+=`<rect x="0" y="0" width="440" height="290" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
  if(p===0){/* clinician and person at a table, feedback bubble, weekly grams bar */
    s+=`<rect x="120" y="120" width="200" height="8" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=person(150,48,72,g)+person(290,48,72,'var(--muted)');
    s+=`<text x="150" y="140" class="t-xs t-mid">nurse or doctor</text><text x="290" y="140" class="t-xs t-mid">person</text>`;
    const ph=u<.3?0:u<.6?1:2,bub=['Asks about drinking (AUDIT-C)','Personal feedback','Advice and a plan'][ph];
    const bw=Math.max(150,bub.length*6.6+24);
    s+=`<rect x="${f1(220-bw/2)}" y="14" width="${f1(bw)}" height="26" rx="13" style="fill:var(--panel);stroke:${g};stroke-width:1.4"/><text x="220" y="31" class="t-sm t-mid" style="fill:${ink}">${bub}</text>`;
    s+=`<path d="M170 40L182 58" style="stroke:${g};stroke-width:1.4"/>`;
    const X=v=>40+v*360/260,base=244,now=lerp(244,224,ease(ramp(u,.35,.85)));
    s+=`<text x="40" y="172" class="t-sm" style="fill:${ink}">Average weekly alcohol in the trials (grams)</text>`;
    s+=`<rect x="40" y="182" width="${f1(X(base)-40)}" height="22" rx="4" style="fill:var(--eth-fill);opacity:.35"/><text x="${f1(X(base)-6)}" y="198" class="t-xs t-end" style="fill:${ink}">baseline 244 g</text>`;
    s+=`<rect x="40" y="214" width="${f1(X(now)-40)}" height="22" rx="4" style="fill:var(--eth-fill);opacity:.8"/><text x="${f1(X(now)-6)}" y="230" class="t-xs t-end" style="fill:${ink}">${Math.round(now)} g</text>`;
    if(u>.4)s+=`<rect x="${f1(X(now))}" y="214" width="${f1(X(base)-X(now))}" height="22" style="fill:none;stroke:var(--good);stroke-width:1.4;stroke-dasharray:3 2"/><text x="${f1(X(base)+6)}" y="230" class="t-sm" style="fill:var(--good)">−${Math.round(base-now)}</text>`;
    [0,100,200].forEach(v=>s+=`<text x="${f1(X(v))}" y="254" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="40" y="276" class="t-xs">group means, 1 year after; drawn to scale</text>`}
  else if(p===1){/* decisional balance tips toward change */
    const k=ease(ramp(u,.15,.85)),tilt=lerp(.7,-.7,k),ln=Math.round(lerp(1,5,k)),rn=Math.round(lerp(5,2,k));
    const B=balance(220,98,250,{tilt,left:'reasons to change',right:'reasons to keep drinking',lcol:'var(--rx)',rcol:'var(--eth-fill)',ln,rn});s+=B.svg;
    s+=`<text x="220" y="30" class="t-lbl t-mid">${k<.45?'"It is not that bad yet"':k<.75?'"Part of me wants things to change"':'"I want my health and sleep back"'}</text>`;
    s+=`<text x="220" y="48" class="t-xs t-mid">illustrative change talk, in the person's own words</text>`;
    const items=[['health','sleep','family','money','energy'],['relaxing','habit','friends']];
    s+=`<text x="20" y="232" class="t-sm" style="fill:var(--rx)">${items[0].slice(0,ln).join(' · ')}</text><text x="420" y="232" class="t-sm t-end" style="fill:var(--eth)">${items[1].slice(0,Math.min(3,rn)).join(' · ')}</text>`;
    s+=`<text x="220" y="270" class="t-xs t-mid">The clinician listens and reflects; the person does the weighing.</text>`}
  else if(p===2){/* trigger → thought → urge → coping skill */
    const N=[['High-risk','situation'],['Thought','"a drink would help"'],['Urge or','craving'],['Coping','response']],P=[[72,62],[220,62],[368,62],[368,158]];
    const pos=clamp(u*1.25)*3;
    P.forEach(([x,y],i)=>{const on=pos>=i-.05,c=i===3?'var(--good)':i===0?'var(--accent)':'var(--dx)';
      s+=`<rect x="${x-65}" y="${y-28}" width="130" height="56" rx="10" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x}" y="${y-5}" class="t-lbl t-mid" style="font-size:12.5px">${N[i][0]}</text><text x="${x}" y="${y+12}" class="t-xs t-mid">${N[i][1]}</text>`});
    s+=`<line x1="137" x2="153" y1="62" y2="62" class="arrow" marker-end="url(#thA)"/><line x1="285" x2="301" y1="62" y2="62" class="arrow" marker-end="url(#thA)"/><line x1="368" x2="368" y1="92" y2="126" class="arrow" marker-end="url(#thA)"/>`;
    if(pos<3){const si=Math.min(2,Math.floor(pos)),f=pos-si,A=P[si],B=P[si+1];s+=`<circle cx="${f1(lerp(A[0],B[0],f))}" cy="${f1(lerp(A[1],B[1],f))}" r="6" style="fill:var(--accent)"/>`}
    const k=ramp(u,.8,1);
    s+=`<g style="opacity:${f1(k)}"><line x1="304" x2="270" y1="158" y2="158" style="stroke:var(--good);stroke-width:1.6" marker-end="url(#thA)"/><rect x="128" y="134" width="136" height="48" rx="10" style="fill:var(--good-soft);stroke:var(--good)"/><text x="196" y="155" class="t-lbl t-mid" style="fill:var(--good);font-size:12.5px">self-efficacy grows</text><text x="196" y="171" class="t-xs t-mid">lapse risk falls</text></g>`;
    s+=`<path d="M330 92Q310 206 120 206" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3"/><text x="20" y="226" class="t-xs">no coping response: lapse risk rises</text>`;
    s+=`<text x="20" y="258" class="t-sm" style="fill:${ink}">Practised in sessions: spot triggers, challenge the thought,</text><text x="20" y="274" class="t-sm" style="fill:${ink}">ride out the urge, plan for a lapse.</text>`}
  else if(p===3){/* 12 weeks × 3 EtG tests; tokens for negatives */
    const n=Math.round(clamp(u*1.1)*36);let tok=0;
    s+=`<text x="20" y="26" class="t-sm" style="fill:${ink}">12 weeks · urine EtG test 3 times a week</text>`;
    for(let w=0;w<12;w++){s+=`<text x="${f1(46+w*31+13)}" y="46" class="t-xs t-mid">${w+1}</text>`;
      for(let d=0;d<3;d++){const i=w*3+d,cx=46+w*31+13,cy=64+d*30,neg=rr[i]<lerp(.45,.88,w/11);
        s+=`<rect x="${f1(cx-12)}" y="${f1(cy-12)}" width="24" height="24" rx="5" style="fill:var(--panel);stroke:var(--line)"/>`;
        if(i<n){if(neg){tok++;const drop=i===n-1?(1-clamp((u*1.1*36-i)))*10:0;s+=`<circle cx="${f1(cx)}" cy="${f1(cy-drop)}" r="8.5" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/><text x="${f1(cx)}" y="${f1(cy-drop+3)}" class="t-xs t-mid" style="fill:var(--gold);font-weight:700">★</text>`}
          else s+=`<path d="M${f1(cx-5)} ${f1(cy-5)}L${f1(cx+5)} ${f1(cy+5)}M${f1(cx+5)} ${f1(cy-5)}L${f1(cx-5)} ${f1(cy+5)}" style="stroke:var(--muted);stroke-width:1.6"/>`}}}
    s+=`<text x="20" y="66" class="t-xs">Mon</text><text x="20" y="96" class="t-xs">Wed</text><text x="20" y="126" class="t-xs">Fri</text>`;
    s+=`<circle cx="40" cy="168" r="8" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/><text x="54" y="172" class="t-xs">negative (EtG &lt; 150 ng/mL): a prize draw</text><path d="M36 182l8 8M44 182l-8 8" style="stroke:var(--muted);stroke-width:1.6"/><text x="54" y="190" class="t-xs">positive: no draw</text>`;
    s+=`<text x="20" y="226" style="font:800 30px var(--display);fill:var(--gold)">${tok}</text><text x="${tok>9?62:50}" y="226" class="t-sm" style="fill:${ink}">prize draws earned so far (illustrative)</text>`;
    s+=`<text x="20" y="252" class="t-xs">Pattern drawn for teaching: the trial reported odds,</text><text x="20" y="266" class="t-xs">not one person's grid.</text>`}
  else{/* circle of chairs fills; network lines */
    const cx=220,cy=136,R=92,n=9,k=clamp(u*1.15),arrived=Math.round(k*n);
    s+=`<circle cx="${cx}" cy="${cy}" r="${R+26}" style="fill:none;stroke:var(--line);stroke-dasharray:2 5"/>`;
    const P=[];for(let i=0;i<n;i++){const a=Math.PI/2+i*2*Math.PI/n;P.push([cx+R*Math.cos(a),cy+R*Math.sin(a)])}
    const net=ramp(u,.45,1);
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){if(i>=arrived||j>=arrived)continue;if((i*3+j*5)%4!==0&&i!==0)continue;s+=`<line x1="${f1(P[i][0])}" y1="${f1(P[i][1])}" x2="${f1(P[j][0])}" y2="${f1(P[j][1])}" style="stroke:var(--rx);stroke-width:1.2;opacity:${f1(net*.6)}"/>`}
    P.forEach(([x,y],i)=>{s+=`<rect x="${f1(x-13)}" y="${f1(y+2)}" width="26" height="8" rx="3" style="fill:var(--panel-2);stroke:var(--brain-line)"/>`;
      if(i<arrived)s+=person(x,y-24,30,i===0?'var(--rx)':'var(--muted)')});
    s+=`<text x="${cx}" y="${cy-4}" class="t-lbl t-mid">a meeting</text><text x="${cx}" y="${cy+12}" class="t-xs t-mid">free, peer-led</text>`;
    s+=`<text x="${f1(P[0][0])}" y="${f1(P[0][1]+26)}" class="t-xs t-mid" style="fill:var(--rx)">newcomer</text>`;
    s+=`<text x="18" y="26" class="t-sm" style="fill:${ink}">AA / TSF</text><text x="18" y="42" class="t-xs">twelve steps</text><text x="422" y="26" class="t-sm t-end" style="fill:${ink}">SMART · LifeRing · WfS</text><text x="422" y="42" class="t-xs t-end">secular alternatives</text>`;
    s+=`<text x="220" y="276" class="t-xs t-mid" style="opacity:${f1(net)}">lines = new ties with people who support not drinking</text>`}
  return s}
function thPanel(p,u){const rev=ramp(u,.1,.9);
  if(p===0)return o=>thForest(o.x,o.y,o.w,[{lab:'Brief vs minimal or none, 1 year',v:-20,lo:-28,hi:-12,val:'−20 g/wk'},{lab:'Extended vs brief, 1 year',v:2,lo:-42,hi:45,val:'+2 g/wk',col:'var(--muted)'}],{title:'Cochrane 2018 · grams per week',min:-50,max:50,ref:0,ticks:[-50,-25,0,25,50],left:'← less drinking',unit:'95% CI',rev});
  if(p===1)return o=>thForest(o.x,o.y,o.w,[{lab:'MI vs none: right after',v:.48,lo:.07,hi:.89,val:'0.48'},{lab:'MI vs none: short-term',v:.2,val:'0.20'},{lab:'MI vs none: long-term',v:.12,lo:0,hi:.25,val:'0.12',col:'var(--muted)'}],{title:'Cochrane 2023 · effect size (SMD)',min:-.2,max:1,ref:0,ticks:[0,.5,1],left:'0 = no difference',unit:'95% CI where given',rev});
  if(p===2)return o=>thForest(o.x,o.y,o.w,[{lab:'Naltrexone + medical mgmt',v:80.6,bar:1,val:'80.6'},{lab:'CBI + medical mgmt + placebo',v:79.2,bar:1,val:'79.2'},{lab:'Naltrexone + CBI + MM',v:77.1,bar:1,val:'77.1'},{lab:'Placebo + medical mgmt',v:75.1,bar:1,val:'75.1',col:'var(--muted)'},{lab:'CBI alone, no pills or MM',v:66.6,bar:1,val:'66.6',col:'var(--accent)'}],{title:'COMBINE · % days abstinent in treatment',min:0,max:100,ref:0,ticks:[0,50,100],unit:'group means',rh:36,rev});
  if(p===3)return o=>thForest(o.x,o.y,o.w,[{lab:'CM: alcohol-negative EtG sample',v:3.1,lo:2.2,hi:4.5,val:'3.1×'},{lab:'CM across substances (mean d)',v:.42,bar:1,val:'d 0.42',col:'var(--muted)'}],{title:'Contingency management',min:0,max:5,ref:0,ticks:[0,1,2,3,4,5],unit:'times more likely · 95% CI',rev});
  return o=>thForest(o.x,o.y,o.w,[{lab:'Continuous abstinence, 12 mo (RR)',v:1.21,lo:1.03,hi:1.42,val:'RR 1.21'},{lab:'% days abstinent, 12 mo (MD/100)',v:1+3.03/100,lo:1-4.36/100,hi:1+10.43/100,val:'+3.0',col:'var(--muted)'},{lab:'% days abstinent, 24 mo (MD/100)',v:1+12.91/100,val:'+12.9'},{lab:'% days abstinent, 36 mo (MD/100)',v:1+6.64/100,val:'+6.6'}],{title:'Cochrane 2020 · AA/TSF vs other treatment',min:.8,max:1.6,ref:1,ticks:[.8,1,1.2,1.4,1.6],left:'1 = no difference',unit:'MD shown as 1 + points/100',rh:36,rev})}
const TH_NOTE=['Moderate-quality evidence; most trials in general practice (55%) or emergency care (39%). <sup class="c" data-ref="Kaner2018Cochrane" title="Source 220">220</sup>','Low certainty right after; MI was no better than other active treatments. <sup class="c" data-ref="Schwenker2023" title="Source 421">421</sup>','During 16 weeks of treatment; MM = medical management, CBI = combined behavioural intervention. <sup class="c" data-ref="Anton2006COMBINE" title="Source 11">11</sup>','RCT of 79 outpatients with serious mental illness; meta-analysis d across substance use disorders. <sup class="c" data-ref="McDonell2017,Prendergast2006" title="Source 323,371">323,371</sup>','RR: high certainty; % days abstinent at 24 and 36 months: low certainty. <sup class="c" data-ref="Kelly2020Cochrane" title="Source 234">234</sup>'];
inits.therapy=()=>{
  const svg=$('#thSvg'),rg=$('#thT'),RR=(()=>{const r=rng(43);return Array.from({length:36},()=>r())})();
  function draw(t){
    const N=vb(svg,'720 270','400 500');const p=phaseOf(TH_STEPS,t),u=ramp(t,TH_STEPS[p].from,p<4?TH_STEPS[p+1].from:1);
    let s=`<defs>${marker('thA','var(--muted)')}</defs>`;
    if(N){s+=`<g transform="translate(10 6) scale(${f1(380/440)})">${thScene(p,u,RR)}</g>`;
      const ph=[150,186,258,150,214][p];svg.setAttribute('viewBox','0 0 400 '+(270+ph));
      s+=`<rect x="10" y="264" width="380" height="${ph}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=thPanel(p,u)({x:24,y:288,w:352});}
    else{s+=`<g transform="translate(10 10) scale(.86)">${thScene(p,u,RR)}</g>`;
      s+=`<rect x="398" y="10" width="312" height="250" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=thPanel(p,u)({x:412,y:34,w:284})}
    svg.innerHTML=s;setSt(p);
    $('#thNote').innerHTML=noteHTML(TH_STEPS[p])+`<p class="stage-cap">${TH_NOTE[p]}</p>`;
  }
  const stop=playWire(rg,$('#thPlay'),draw,30000,'Replay','therapy');
  const setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- relapse-prevention chain ---- */
  const RP={
   stress:{n:'A stressful day',type:'high-risk situation',start:'hrs',ex:'After a hard shift, the usual way home passes the shop where they used to buy alcohol.'},
   party:{n:'A party where others drink',type:'high-risk situation (social)',start:'hrs',ex:'Friends are drinking and someone hands them a glass.'},
   low:{n:'Feeling low or lonely',type:'high-risk situation (mood)',start:'hrs',ex:'An evening alone, feeling low, with nothing planned.'},
   imb:{n:'Life out of balance',type:'hidden antecedent: lifestyle imbalance',start:'imb',ex:'Weeks of obligations and no rest or enjoyment, so urges build before any one situation.'},
   lapse:{n:'One drink after weeks without',type:'a lapse',start:'lapse',ex:'After weeks without alcohol, they have one drink at a wedding.'}};
  let rp='stress',cope=true,pulse=1,stopP=null;
  const rs=$('#thRp');
  function drawRP(){
    const N=vb(rs,'720 340','400 600'),R=RP[rp],C=cope&&R.start!=='lapse';
    /* nodes: id -> [x,y,label1,label2,kind] */
    const Wd={imb:[80,50,'Lifestyle imbalance','urges and cravings','pre'],hrs:[80,170,'High-risk situation',R.start==='hrs'?R.n.toLowerCase():'urges meet a cue','risk'],
      cope:[250,90,'Coping response','used','good'],se1:[420,90,'Self-efficacy rises','','good'],low:[610,90,'Lower relapse','risk','good'],
      nocope:[250,250,'No coping response','','bad'],se2:[420,250,'Self-efficacy falls','"a drink would help"','bad'],lapse:[610,250,'Lapse','a single use','bad'],ave:[420,318,'Abstinence violation','effect','bad'],hi:[250,318,'Higher relapse','risk','bad'],
      ref:[610,170,'Reframe the lapse','back on track','good']};
    const Nn={imb:[200,28],hrs:[200,110],cope:[100,200],se1:[100,290],low:[100,380],nocope:[300,200],se2:[300,290],lapse:[300,380],ave:[108,470],hi:[108,560],ref:[300,470]};
    const P=k=>N?Nn[k]:Wd[k].slice(0,2);
    let path=[];
    if(R.start==='imb')path.push('imb');
    if(R.start!=='lapse'){path.push('hrs');path=path.concat(C?['cope','se1','low']:['nocope','se2','lapse',cope?'ref':'ave'].concat(cope?[]:['hi']))}
    else path=['lapse',cope?'ref':'ave'].concat(cope?[]:['hi']);
    const show=new Set(path);
    let s=`<defs>${marker('thB','var(--muted)')}${marker('thG','var(--good)')}${marker('thR','var(--bad)')}</defs>`;
    const E=[['imb','hrs'],['hrs','cope'],['cope','se1'],['se1','low'],['hrs','nocope'],['nocope','se2'],['se2','lapse'],['lapse','ave'],['ave','hi'],['lapse','ref']];
    const bw=N?172:152,bh=40;
    E.forEach(([a,b])=>{const on=show.has(a)&&show.has(b)&&path.indexOf(b)===path.indexOf(a)+1,[x1,y1]=P(a),[x2,y2]=P(b);
      const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,kx=Math.min(Math.abs(ux)>.001?(bw/2)/Math.abs(ux):1e9,Math.abs(uy)>.001?(bh/2)/Math.abs(uy):1e9)+4;
      const ax=x1+ux*kx,ay=y1+uy*kx,bx=x2-ux*(kx+2),by=y2-uy*(kx+2),col=on?(['cope','se1','low','ref'].includes(b)?'var(--good)':'var(--bad)'):'var(--line)';
      s+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(bx)}" y2="${f1(by)}" style="stroke:${col};stroke-width:${on?2.2:1.2};${on?'':'stroke-dasharray:3 4'}" ${on?`marker-end="url(#${col==='var(--good)'?'thG':'thR'})"`:''}/>`});
    Object.keys(Wd).forEach(k=>{const [x,y]=P(k),d=Wd[k],on=show.has(k),c=d[4]==='good'?'var(--good)':d[4]==='bad'?'var(--bad)':d[4]==='pre'?'var(--dx)':'var(--accent)';
      const l2=k==='cope'?(C?'used':'—'):d[3];
      s+=`<g style="opacity:${on?1:.28}"><rect x="${f1(x-bw/2)}" y="${f1(y-bh/2)}" width="${bw}" height="${bh}" rx="9" style="fill:${on?'var(--panel)':'var(--panel-2)'};stroke:${on?c:'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y-3)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">${d[2]}</text>${l2?`<text x="${f1(x)}" y="${f1(y+11)}" class="t-xs t-mid">${l2}</text>`:''}</g>`});
    /* travelling pulse along the chosen path */
    const segs=path.length-1,pp=clamp(pulse)*segs,si=Math.min(segs-1,Math.floor(pp));
    if(segs>0){const [x1,y1]=P(path[si]),[x2,y2]=P(path[si+1]),f=pp-si;s+=`<circle cx="${f1(lerp(x1,x2,f))}" cy="${f1(lerp(y1,y2,f))}" r="6" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`}
    rs.innerHTML=s;
    const steps=R.start==='lapse'?
      (cope?[`Plan for lapses ahead of time, so a slip is expected and has a response. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Reframe the lapse: a mistake in a specific situation, something to learn from, not proof of failure. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Look at what led up to it and strengthen coping for that situation. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`]
            :[`Without a plan, the abstinence violation effect can follow: guilt and the sense that "I have blown it". <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`That view of the lapse raises the chance that one drink becomes a full relapse. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Switch the coping response back on to see the reframing path.`])
      :C?[R.start==='imb'?`Notice lifestyle imbalance and the urges it builds: hidden antecedents, not only the moment itself. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`:`Identify the high-risk situation in advance. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Practise a coping response for it in sessions. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Each success builds self-efficacy, which lowers the chance of a lapse. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`]
         :[`No coping response is ready, so self-efficacy drops. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`Positive expectations of drinking ("a drink would help") pull towards a lapse. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`,`A lapse can then be reframed with a plan, or turn into the abstinence violation effect.`];
    $('#thRpNote').innerHTML=`<div class="kicker">${R.type}</div><h4>${R.n}</h4><p>${R.ex} <i>(illustrative example)</i></p><ol class="rpsteps">${steps.map(x=>`<li>${x}</li>`).join('')}</ol><div class="pt"><b>In plain words</b>${cope?'Having a plan ready turns a risky moment into practice.':'A slip does not erase progress. Relapse-prevention therapy plans for lapses and for getting back on track.'} <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup></div><div class="hook"><b>Exam hook</b>Abstinence violation effect: the guilt and loss of control after a lapse that make full relapse more likely; CBT reframes it. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup></div><p class="stage-cap">Teaching only, not a self-help plan or a substitute for care.</p>`;
  }
  function run(){if(stopP)stopP();pulse=0;stopP=animate(1600,q=>{pulse=q;drawRP()},()=>{stopP=null})}
  $$('[data-rp]').forEach(b=>b.addEventListener('click',()=>{rp=b.dataset.rp;$$('[data-rp]').forEach(x=>x.setAttribute('aria-pressed',x===b));run()}));
  const cb=$('#thCope');cb.addEventListener('click',()=>{cope=!cope;cb.setAttribute('aria-pressed',cope);cb.textContent=cope?'Coping response: used':'Coping response: not used';run()});
  const prevH=onHide.therapy;onHide.therapy=()=>{prevH&&prevH();if(stopP)stopP();stopP=null};
  const prevR=redraws.therapy;redraws.therapy=()=>{prevR&&prevR();drawRP()};
  drawRP();
};
/* =============== 4.4 Course, relapse and recovery =============== */
/* NESARC 2001-02 end proportions (Dawson 2005), 100 icons */
const RC_CAT=[
 {k:'dep',n:'Still dependent',c:'var(--accent)',v:25.0},
 {k:'part',n:'Partial remission',c:'var(--warn)',v:27.3},
 {k:'asym',n:'Asymptomatic risk drinking',c:'var(--eth-fill)',v:11.8},
 {k:'low',n:'Low-risk drinking',c:'var(--rx)',v:17.7},
 {k:'abs',n:'Abstinent',c:'var(--good)',v:18.2}];
const RC_N=[25,27,12,18,18];
const RC_STEPS=[
 {from:0,at:.02,k:'Year 0',t:'Everyone starts with AUD',
  txt:`Start with 100 people who have alcohol use disorder. Most of them will never be treated: only 25.5% of US adults with past alcohol dependence in NESARC had ever had treatment, 19.8% of people with lifetime AUD in NESARC-III, and about 1 in 6 worldwide (17.3%; 9.3% in low and lower-middle-income countries). <sup class="c" data-ref="Dawson2005,Grant2015NESARC,Mekonen2021" title="Source 78,146,328">78,146,328</sup>`,
  pt:`AUD is a medical condition that can be treated, not a moral failing. Many people never get help, so it matters that help is easy to find.`,
  hook:`Treatment gap: about 1 in 6 people with AUD worldwide are treated (17.3%). <sup class="c" data-ref="Mekonen2021" title="Source 328">328</sup>`},
 {from:.1,at:.26,k:'Years 2–8',t:'Many change course, often without treatment',
  txt:`Icons start to change colour. In NESARC, recovery happened both with and without abstinence, and much of it without formal treatment. Being married went with both abstinent and non-abstinent recovery and heavier drinking with less of both; greater severity raised the odds of abstinent recovery but lowered the odds of non-abstinent recovery. <sup class="c" data-ref="Dawson2005" title="Source 78">78</sup>`,
  pt:`People change at different times and in different ways. Some stop, some cut down a lot.`,
  hook:`Severity pushes towards abstinent rather than non-abstinent recovery (NESARC). <sup class="c" data-ref="Dawson2005" title="Source 78">78</sup>`},
 {from:.4,at:.5,k:'Years 8–12',t:'Returns to drinking are common, and not the end',
  txt:`Some icons flash back to "still dependent" and then recover again. In a 16-year cohort of 461 people who first sought help, those who got no help were less likely to reach 3-year remission and more likely to relapse; relapse was more likely with heavier drinking, not seeing drinking as a problem, low self-efficacy and avoidance coping. Yet among people who had resolved a problem, the median number of serious attempts was 2 (IQR 1–4). <sup class="c" data-ref="Moos2006Relapse,Kelly2019Attempts" title="Source 232,336">232,336</sup>`,
  pt:`A return to drinking is common on the way. It does not cancel what was learned, and most people did not need dozens of tries.`,
  hook:`Quote the median: 2 serious attempts (mean 5.35, skewed by a few people with many). <sup class="c" data-ref="Kelly2019Attempts" title="Source 232">232</sup>`},
 {from:.6,at:.75,k:'Years 12–17',t:'The population snapshot',
  txt:`The array settles on the NESARC 2001–02 snapshot of 4,422 adults whose dependence began before the past year: 25.0% still dependent, 27.3% in partial remission, 11.8% asymptomatic risk drinkers, 17.7% low-risk drinkers and 18.2% abstainers. A meta-analysis of 21 long-term studies found remission in 35.0–54.4% over a mean of 17 years, a projected 6.8–9.1% a year. <sup class="c" data-ref="Dawson2005,Fleury2016" title="Source 78,129">78,129</sup>`,
  pt:`Years later, about half of people who once had alcohol dependence no longer had symptoms. These are group numbers, not a forecast for one person.`,
  hook:`NESARC: 25% still dependent; about 36% low-risk drinkers or abstainers; only 25.5% ever treated. <sup class="c" data-ref="Dawson2005" title="Source 78">78</sup>`},
 {from:.85,at:.95,k:'Years 17–20',t:'Recovery capital and the long view',
  txt:`Recovery capital is the personal, social and community resources that support recovery; in 312 people in recovery, more of it predicted sustained recovery, better quality of life and less stress a year later. In the National Recovery Survey, quality of life, happiness, self-esteem and recovery capital rose steeply in the first 6 years after resolving a problem, then more gradually; self-esteem and happiness dipped in the first year. 9.1% of US adults report having resolved an alcohol or drug problem. <sup class="c" data-ref="Laudet2008,Kelly2018QoL,Kelly2017Recovery" title="Source 230,231,277">230,231,277</sup>`,
  pt:`The first year can feel hard. For many people life then gets steadily better, and keeps improving for years.`,
  hook:`9.1% of US adults have resolved an AOD problem; 53.9% of them used an assisted pathway, most often mutual help (45.1%). <sup class="c" data-ref="Kelly2017Recovery" title="Source 230">230</sup>`}
];
/* recovery-capital / quality-of-life shape after resolution (Kelly 2018): a first-year dip, steep rise to ~6 y, then gradual */
const rcQoL=y=>{const d=-.08*Math.sin(Math.PI*clamp(y/1.2));return clamp(.18+d+.55*(1-Math.exp(-Math.max(0,y-.6)/2.4))+.012*Math.max(0,y-6),0,1)};
const RD_STEPS=[
 {from:0,at:.06,k:'The road',t:'Recovery is a process, not a switch',
  txt:`The later version of Marlatt's model treats relapse as a dynamic process in which many risk factors and situations interact, rather than a fixed chain of events. Long-term care with continued monitoring, as for diabetes, hypertension or asthma, gives lasting benefit. <sup class="c" data-ref="Witkiewitz2004RP,McLellan2000" title="Source 325,498">325,498</sup>`,
  pt:`Recovery has bends and hills. Planning for them is part of the treatment.`,
  hook:`AUD fits a chronic-illness model: adherence and relapse rates are similar to diabetes, hypertension and asthma. <sup class="c" data-ref="McLellan2000" title="Source 325">325</sup>`},
 {from:.2,at:.3,k:'A high-risk bend',t:'High-risk situations',
  txt:`Immediate triggers in the Marlatt model are high-risk situations, coping skills and outcome expectancies; hidden antecedents include lifestyle imbalance and urges. Therapy teaches coping for a person's own high-risk situations and builds self-efficacy. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup> See the <a href="#therapy" data-go="therapy">relapse-prevention chain</a>.`,
  pt:`Some places, moods or people make drinking more likely. Knowing yours helps you plan.`,
  hook:`Self-efficacy and readiness to change were the strongest predictors of 3-year outcome in Project MATCH. <sup class="c" data-ref="ProjectMATCH1998" title="Source 375">375</sup>`},
 {from:.38,at:.44,k:'A lapse',t:'One drink is a lapse, not a relapse',
  txt:`A lapse is a single use after a period of change. Whether it becomes a relapse depends partly on how the person reads it. In a study of 1,288 people, "recurrence of use" carried a more positive association than "relapse". <sup class="c" data-ref="Larimer1999,Ashford2018" title="Source 21,274">21,274</sup>`,
  pt:`A slip does not erase progress.`,
  hook:`Lapse = a single use; relapse = return to the previous pattern. The abstinence violation effect is what links them. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`},
 {from:.5,at:.66,k:'Two ways back',t:'The abstinence violation effect, or a reframe',
  txt:`The long loop is the abstinence violation effect: guilt and a sense of having "blown it", which makes full relapse more likely. The short path is the relapse-prevention response: plan for lapses beforehand and reframe a lapse as a mistake in a specific situation to learn from. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup> After long, heavy daily drinking, get medical help to stop safely.`,
  pt:`Thinking "I have blown it" makes things worse. Thinking "this was a hard moment, what can I change?" helps you get back on track.`,
  hook:`Treatment plans for lapses and reframes them, so a lapse does not have to become a relapse. <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>`},
 {from:.82,at:.95,k:'Further on',t:'Back on the road, with more support',
  txt:`AA's benefit came mostly through changes in social networks and confidence to stay abstinent in social settings. People who took part in AA for 27 weeks or more in the first year had better 16-year outcomes. A recovery-support app cut risky drinking days after residential treatment (1.39 vs 2.75). <sup class="c" data-ref="Kelly2012AAMech,Moos2006AA,Gustafson2014" title="Source 154,228,335">154,228,335</sup>`,
  pt:`People around you, a group, an app or a counsellor all make the road easier.`,
  hook:`AA works mainly through social networks: mediators explained 43–67% of its effect. <sup class="c" data-ref="Kelly2012AAMech" title="Source 228">228</sup>`}
];
const RC_LV=[
 {s:'Mutual help',n:'Mutual help and recovery support',who:[`Anyone at any stage, alone or alongside treatment: free peer groups such as AA, SMART Recovery, LifeRing and Women for Sobriety. <sup class="c" data-ref="Kelly2020Cochrane,Zemore2018" title="Source 234,513">234,513</sup>`,`45.1% of US adults who resolved a problem used mutual help, 21.8% recovery support services and 6.2% recovery community centres. <sup class="c" data-ref="Kelly2017Recovery" title="Source 230">230</sup>`]},
 {s:'Brief advice',n:'Brief intervention in primary care',who:[`Adults with risky or hazardous drinking found by screening: the USPSTF recommends offering brief behavioural counselling (B). <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>`,`Not proven for people with dependence or very heavy drinking, who need more. <sup class="c" data-ref="Saitz2010" title="Source 411">411</sup>`]},
 {s:'Outpatient',n:'Outpatient treatment',who:[`Therapy such as CBT, MET or twelve-step facilitation (the Project MATCH outpatient trial, N = 952), often with medicine. <sup class="c" data-ref="ProjectMATCH1997,Ray2020CBT" title="Source 373,378">373,378</sup> See <a href="#medicines" data-go="medicines">medicines</a>.`,`Withdrawal can usually be managed safely as an outpatient when risk factors are limited (ASAM Level 1-WM: appropriate for CIWA-Ar &lt;10), with daily check-ins for up to 5 days. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`]},
 {s:'Day / on-site',n:'Extended on-site monitoring and day programmes',who:[`ASAM Level 2-WM, extended on-site monitoring: appropriate for CIWA-Ar &lt;18; severe but not complicated withdrawal is uncertain. Drinking more than 8 standard drinks a day is flagged as neutral or uncertain at both outpatient levels. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,`Project MATCH's aftercare trial (N = 774) enrolled people after inpatient or day-hospital care. <sup class="c" data-ref="ProjectMATCH1997" title="Source 373">373</sup>`]},
 {s:'Residential',n:'Residential treatment and continuing care',who:[`Studies of people leaving residential treatment show what helps next: a recovery-support app cut risky drinking days, and 6 months or more in a self-run Oxford House went with far less substance use at 24 months (15.6% vs 64.8% with usual aftercare). <sup class="c" data-ref="Gustafson2014,Jason2007" title="Source 154,198">154,198</sup>`,`Long-term care with continued monitoring, as in other chronic illnesses. <sup class="c" data-ref="McLellan2000" title="Source 325">325</sup>`]},
 {s:'Inpatient',n:'Medically managed inpatient care',who:[`A 1995 estimate quoted by ASAM: about 10% of people with alcohol withdrawal syndrome need inpatient treatment. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,`ASAM reasons to move up: agitation or tremor that does not resolve despite several doses; persistent vomiting, marked agitation, hallucinations, confusion or seizure; worsening illness or over-sedation; return to drinking; syncope or unstable vital signs. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,`ASAM: consider inpatient care for every pregnant patient who needs withdrawal management, and assess suicide risk at intake. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> See <a href="#detox" data-go="detox">managing withdrawal</a>.`]}
];
inits.recovery=()=>{
  /* ---- 100 people over 20 years ---- */
  const svg=$('#rcSvg'),rg=$('#rcT'),r=rng(44);
  const P=[];RC_N.forEach((n,ci)=>{for(let i=0;i<n;i++)P.push({c:ci})});
  /* shuffle positions so groups are mixed through the grid */
  const pos=P.map((_,i)=>i);for(let i=pos.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[pos[i],pos[j]]=[pos[j],pos[i]]}
  P.forEach((p,i)=>{p.g=pos[i];p.ty=p.c===0?99:1.5+r()*11.5;p.back=null;
    if(p.c>0&&r()<.22){const b=Math.max(p.ty+1,4+r()*7);p.back=[b,b+.8+r()*1.6]}});
  function state(p,y){if(y<p.ty)return 0;if(p.back&&y>=p.back[0]&&y<p.back[1])return -1;return p.c}
  function draw(t){
    const N=vb(svg,'720 400','400 740'),y=t*20,ph=phaseOf(RC_STEPS,t);
    const L=N?{ax:[30,370,22],gx:30,gy:52,cs:34,ps:26,bx:20,by:418,bw:360,qx:20,qy:600,qw:170,ax2:224,aw:156}:{ax:[20,300,22],gx:20,gy:48,cs:28,ps:21,bx:340,by:44,bw:360,qx:340,qy:250,qw:180,ax2:560,aw:140};
    let s='';
    const T=tline(L.ax[0],L.ax[2],L.ax[1]-L.ax[0],{min:0,max:20,step:5,fmt:v=>v,big:true});s+=T.svg;
    s+=`<circle cx="${f1(T.X(y))}" cy="${L.ax[2]}" r="5" style="fill:var(--rx)"/><text x="${f1(Math.min(T.X(y)+8,L.ax[1]-60))}" y="${L.ax[2]+16}" class="t-xs" style="fill:var(--rx);font-weight:700">year ${y.toFixed(1)}</text>`;
    const cnt=[0,0,0,0,0];let back=0;
    P.forEach(p=>{const st=state(p,y),gx=L.gx+(p.g%10)*L.cs+L.cs/2,gy=L.gy+Math.floor(p.g/10)*L.cs+2;
      const col=st===-1?'var(--accent)':RC_CAT[st].c;cnt[st===-1?0:st]++;if(st===-1)back++;
      s+=person(gx,gy,L.ps,col);
      if(st===-1)s+=`<circle cx="${f1(gx)}" cy="${f1(gy+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/>`});
    /* live counts */
    s+=`<text x="${L.bx}" y="${L.by}" class="t-sm" style="fill:var(--ink);font-weight:600">Of 100 people, now (illustrative timing)</text>`;
    RC_CAT.forEach((c,i)=>{const lo=N?192:172,yy=L.by+12+i*28,bw=L.bw-lo,w=bw*cnt[i]/100;
      s+=`<text x="${L.bx}" y="${yy+13}" class="t-xs" style="fill:var(--ink)">${c.n}</text>`;
      s+=`<rect x="${L.bx+lo}" y="${yy+3}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.bx+lo}" y="${yy+3}" width="${f1(Math.max(0,w))}" height="14" rx="4" style="fill:${c.c}"/>`;
      s+=`<text x="${f1(L.bx+lo+4+Math.max(w,0))}" y="${yy+14}" class="t-xs" style="fill:var(--ink);font-weight:700">${cnt[i]}${i===0&&back?` (${back} returned)`:''}</text>`});
    if(ph>=3)s+=`<text x="${L.bx}" y="${L.by+166}" class="t-xs" style="fill:var(--muted)">NESARC snapshot: 25.0 · 27.3 · 11.8 · 17.7 · 18.2%</text>`;
    /* recovery capital curve */
    const C=curve(L.qx,L.qy+18,L.qw,90,rcQoL,{x0:0,x1:20,upto:Math.max(.05,y),col:'var(--good)',fill:true,dot:true});s+=C.svg;
    s+=`<text x="${L.qx}" y="${L.qy}" class="t-sm" style="fill:var(--ink);font-weight:600">Quality of life</text><text x="${L.qx}" y="${L.qy+13}" class="t-xs">${N?'shape only':'and recovery capital: shape only'}</text>`;
    s+=`<text x="${L.qx}" y="${L.qy+122}" class="t-xs">0</text><text x="${f1(C.X(6))}" y="${L.qy+122}" class="t-xs t-mid">6</text><text x="${L.qx+L.qw}" y="${L.qy+122}" class="t-xs t-end">20</text><text x="${f1(L.qx+L.qw/2)}" y="${L.qy+136}" class="t-xs t-mid">years since resolving</text>`;
    if(y>.4&&y<4)s+=`<text x="${f1(C.X(1)+6)}" y="${f1(C.Y(rcQoL(1))+16)}" class="t-xs" style="fill:var(--accent)">first-year dip</text>`;
    /* attempts strip */
    const op=ph>=2?1:.3,ax=L.ax2,aw=L.aw,X=v=>ax+aw*v/8,ay=L.qy+60;
    s+=`<g style="opacity:${op}"><text x="${ax}" y="${L.qy}" class="t-sm" style="fill:var(--ink);font-weight:600">Serious attempts</text><text x="${ax}" y="${L.qy+13}" class="t-xs">before resolution</text>`;
    s+=`<line x1="${ax}" x2="${ax+aw}" y1="${ay+18}" y2="${ay+18}" class="axis"/>`;[0,2,4,6,8].forEach(v=>s+=`<text x="${f1(X(v))}" y="${ay+32}" class="t-xs t-mid">${v}</text>`);
    s+=`<rect x="${f1(X(1))}" y="${ay-8}" width="${f1(X(4)-X(1))}" height="16" rx="3" style="fill:var(--rx-soft);stroke:var(--rx)"/><line x1="${f1(X(2))}" x2="${f1(X(2))}" y1="${ay-12}" y2="${ay+12}" style="stroke:var(--rx);stroke-width:3"/>`;
    s+=`<text x="${f1(X(2))}" y="${ay-16}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">median 2</text><path d="M${f1(X(5.35))} ${ay-6}l5 6l-5 6l-5 -6Z" style="fill:var(--muted)"/><text x="${f1(X(5.35)+8)}" y="${ay-8}" class="t-xs">mean 5.35</text><text x="${ax}" y="${ay+46}" class="t-xs">box = IQR 1–4</text></g>`;
    svg.innerHTML=s;setSt(ph);
    $('#rcRead').innerHTML=`<span>year <b>${y.toFixed(1)}</b></span><span>still dependent <b>${cnt[0]}</b></span><span>in some remission <b>${100-cnt[0]}</b></span><span>no symptoms (risk, low-risk or abstinent) <b>${cnt[2]+cnt[3]+cnt[4]}</b></span>`;
    $('#rcNote').innerHTML=noteHTML(RC_STEPS[ph]);
    rg.setAttribute('aria-valuetext',`Year ${y.toFixed(0)}: ${cnt[0]} still dependent, ${100-cnt[0]} in some remission`);
  }
  const stop=playWire(rg,$('#rcPlay'),draw,24000,'Replay','recovery');
  const setSt=stepWire($('#rcSteps'),RC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- the winding road ---- */
  const rs=$('#rdSvg'),rr=$('#rdT');
  const bez=(a,b,c,d,u)=>{const v=1-u;return [v*v*v*a[0]+3*v*v*u*b[0]+3*v*u*u*c[0]+u*u*u*d[0],v*v*v*a[1]+3*v*v*u*b[1]+3*v*u*u*c[1]+u*u*u*d[1]]};
  function drawRD(t){
    const N=vb(rs,'720 300','400 620'),ph=phaseOf(RD_STEPS,t);
    const R=N?(u=>[200+70*Math.sin(u*Math.PI*2.4),lerp(40,590,u)]):(u=>[lerp(40,680,u),116+48*Math.sin(u*Math.PI*2.4)]);
    const off=(u,d)=>{const a=R(u),b=R(Math.min(1,u+.002)),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return [a[0]-dy/l*d,a[1]+dx/l*d]};
    let s=`<defs>${marker('rdA','var(--muted)')}</defs>`;
    let d='';for(let i=0;i<=160;i++){const p=R(i/160);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:26;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--line);stroke-width:1.5;stroke-dasharray:8 8"/>`;
    /* high-risk bend */
    const hb=R(.3),uL=.42,lp=off(uL,N?-48:46),rj=R(.5),aj=R(.8);
    s+=`<g style="opacity:${ph>=1?1:.35}"><path d="M${f1(hb[0])} ${f1(hb[1]-(N?0:30))}l-10 -18h20Z" transform="${N?`translate(46 0)`:''}" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.4"/><text x="${f1(hb[0]+(N?46:0))}" y="${f1(hb[1]-(N?24:54))}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">high-risk bend</text></g>`;
    /* detour (AVE) and reframe paths from the lapse spot */
    const A1=N?[[lp[0]+130,lp[1]+70],[aj[0]+170,aj[1]-50]]:[[lp[0]+30,lp[1]+100],[aj[0]-60,aj[1]+130]];
    const B1=N?[[lp[0]-10,lp[1]+30],[rj[0]+40,rj[1]-24]]:[[lp[0]+30,lp[1]+30],[rj[0]-20,rj[1]+40]];
    const pathOf=(c)=>{let q='';for(let i=0;i<=60;i++){const p=bez(lp,c[0],c[1],c===A1?aj:rj,i/60);q+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}return q};
    const showB=ph>=3;
    s+=`<path d="${pathOf(A1)}" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:5 4;opacity:${showB?.85:0}"/>`;
    s+=`<path d="${pathOf(B1)}" style="fill:none;stroke:var(--good);stroke-width:2.6;opacity:${showB?1:0}"/>`;
    if(showB){const ma=bez(lp,A1[0],A1[1],aj,.5),mb=bez(lp,B1[0],B1[1],rj,.55);
      if(N)s+=`<text x="392" y="${f1(aj[1]+30)}" class="t-sm t-end" style="fill:var(--bad);font-weight:600">abstinence violation</text><text x="392" y="${f1(aj[1]+46)}" class="t-xs t-end">effect: longer detour</text>`;
      else s+=`<text x="${f1(ma[0])}" y="${f1(ma[1]+16)}" class="t-sm t-mid" style="fill:var(--bad);font-weight:600">abstinence violation effect</text><text x="${f1(ma[0])}" y="${f1(ma[1]+30)}" class="t-xs t-mid">"I have blown it" → longer detour</text>`;
      s+=`<text x="${f1(mb[0]+(N?-14:12))}" y="${f1(mb[1]+4)}" class="t-sm${N?' t-end':''}" style="fill:var(--good);font-weight:600">reframe</text>`}
    if(ph>=2){s+=`<circle cx="${f1(lp[0])}" cy="${f1(lp[1])}" r="9" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/><text x="${f1(lp[0]+(N?14:-14))}" y="${f1(lp[1]+4)}" class="t-sm ${N?'':'t-end'}" style="fill:var(--accent);font-weight:700">lapse</text>`}
    /* traveller */
    let tp,ghost=null;
    if(t<.4)tp=R(lerp(0,uL,t/.4));
    else if(t<.46){const k=ramp(t,.4,.46),a=R(uL);tp=[lerp(a[0],lp[0],k),lerp(a[1],lp[1],k)]}
    else if(t<.5)tp=lp;
    else if(t<.7){const k=ease(ramp(t,.5,.7));tp=bez(lp,B1[0],B1[1],rj,k);ghost=bez(lp,A1[0],A1[1],aj,ramp(t,.5,.95))}
    else{tp=R(lerp(.5,1,ramp(t,.7,1)));if(t<.95)ghost=bez(lp,A1[0],A1[1],aj,ramp(t,.5,.95))}
    if(ghost)s+=`<g style="opacity:.45">${person(ghost[0],ghost[1]-26,24,'var(--bad)')}</g>`;
    s+=person(tp[0],tp[1]-30,28,'var(--rx)');
    const st=R(0),en=R(1);s+=`<text x="${N?f1(st[0]+40):14}" y="${f1(st[1]+(N?0:34))}" class="t-xs">start of change</text><text x="${N?f1(en[0]-40):706}" y="${f1(en[1]+(N?0:34))}" class="t-xs t-end">further on</text>`;
    rs.innerHTML=s;setRd(ph);$('#rdNote').innerHTML=noteHTML(RD_STEPS[ph]);
  }
  const stopR=playWire(rr,$('#rdPlay'),drawRD,16000,'Replay','recovery');
  const setRd=stepWire($('#rdSteps'),RD_STEPS,rr,drawRD,stopR);
  drawRD(+rr.value);

  /* ---- levels of care ---- */
  const ls=$('#rcLv');let lv=2;
  $('#rcLvBtns').innerHTML=`<span class="kicker">Level</span>`+RC_LV.map((l,i)=>`<button class="btn" data-lv="${i}" aria-pressed="${i===lv}">${l.s}</button>`).join('');
  function drawLv(){
    const N=vb(ls,'720 230','400 300'),W=N?380:690,H=N?222:162;
    const Lr=ladder(N?10:15,N?48:46,W,H,RC_LV.map(l=>N?'':l.s),{at:lv,col:'var(--rx)',done:true});let s=Lr.svg;
    if(N)RC_LV.forEach((l,i)=>{const [x,y]=Lr.top(i);s+=`<text x="${f1(x-1.5)}" y="${f1(y+16)}" class="t-xs t-mid" style="fill:${i===lv?'var(--on-brand)':'var(--ink)'}">${i+1}</text>`});
    const [tx,ty]=Lr.top(lv);s+=person(tx-1.5,ty-(N?34:40),N?30:34,'var(--ink)');
    s+=`<text x="${N?10:15}" y="${N?290:222}" class="t-xs">less intensive</text><text x="${N?390:705}" y="${N?290:222}" class="t-xs t-end">more intensive, more medical care →</text>`;
    ls.innerHTML=s;
    const L=RC_LV[lv];$('#rcLvNote').innerHTML=`<div class="kicker">Level ${lv+1} of ${RC_LV.length}</div><h4>${L.n}</h4><ul>${L.who.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>In plain words</b>The right setting is the least intensive one that is safe. It can change as needs change. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup></div><p class="stage-cap">Teaching summary of published statements, not a placement tool.</p>`;
  }
  $$('[data-lv]').forEach(b=>b.addEventListener('click',()=>{lv=+b.dataset.lv;$$('[data-lv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawLv()}));
  const prevR=redraws.recovery;redraws.recovery=()=>{prevR&&prevR();drawLv()};
  drawLv();
};
/* =============== 5.1 The liver: fatty liver to cirrhosis =============== */
const LV_STEPS=[
 {from:0,at:.05,k:'Start',t:'A healthy liver',
  txt:`The liver clears most of the alcohol a person drinks. Alcohol-associated liver disease (the AASLD’s term; older papers say “alcoholic liver disease”) is described as the most prevalent type of chronic liver disease worldwide. It is a spectrum: fatty liver, alcohol-associated hepatitis, and cirrhosis with its complications. <sup class="c" data-ref="Crabb2020AASLD,Seitz2018NRDP,Singal2018ACG" title="Source 69,426,433">69,426,433</sup>`,
  pt:`Liver damage from alcohol happens in stages: first fat builds up, then the liver can become inflamed, then scarred.`},
 {from:.12,at:.25,k:'Stage 1 · about 90%',t:'Fatty liver (steatosis)',
  txt:`Most people who drink more than 40 g of alcohol a day develop fatty liver; the ACG puts steatosis at about 90% of people who drink heavily, and it may appear within 2 weeks of heavy, regular drinking. It resolves rapidly after complete abstinence. <sup class="c" data-ref="Seitz2018NRDP,Singal2018ACG" title="Source 426,433">426,433</sup> “Pure” fatty liver is not harmless: of 88 people followed for a median 10.5 years, 9 developed cirrhosis and 7 more fibrosis, and 8 of those 9 were still drinking more than 40 units a week. <sup class="c" data-ref="Teli1995Lancet" title="Source 453">453</sup>`,
  pt:`Fat in the liver from alcohol often clears up quickly once a person stops drinking.`,
  hook:`Steatosis in ~90% of people who drink heavily; reversible with abstinence.`},
 {from:.35,at:.47,k:'Stage 2 · about one-third',t:'Steatohepatitis',
  txt:`With continued heavy drinking, about one-third of people with steatosis show inflammation on biopsy: alcohol-associated steatohepatitis. Mechanisms include fat build-up, oxidative stress, toxicity from acetaldehyde (alcohol’s first breakdown product) and inflammation driven by cytokines and chemokines <span class="ev est">Established</span>. A sudden severe flare is alcohol-associated hepatitis, with jaundice and high short-term mortality (see below). <sup class="c" data-ref="Singal2018ACG,Seitz2018NRDP" title="Source 426,433">426,433</sup>`,
  pt:`The liver becomes inflamed, like a wound that keeps being reopened. Many people feel nothing at this stage.`,
  hook:`AST:ALT above 2 suggests advanced alcohol-related liver disease, not heavy drinking itself. <sup class="c" data-ref="Cohen1979SGOTSGPT,Nyblom2004ASTALT" title="Source 62,348">62,348</sup>`},
 {from:.55,at:.66,k:'Stage 3 · 20–40% of those with steatohepatitis',t:'Fibrosis',
  txt:`Among people with steatohepatitis on biopsy, 20–40% develop fibrosis: strands of scar tissue laid down between liver cells. Genetic, epigenetic and other factors explain much of the person-to-person variation <span class="ev est">Established</span>; obesity for 10 years or more roughly doubles the risk of cirrhosis, and women have a higher risk than men at the same intake. <sup class="c" data-ref="Singal2018ACG,Seitz2018NRDP,Rehm2010Cirrhosis" title="Source 380,426,433">380,426,433</sup>`,
  pt:`Scar tissue starts to form. Two people who drink the same amount can have very different livers.`,
  hook:`Steatohepatitis → fibrosis in 20–40% and cirrhosis in 8–20% (ACG).`},
 {from:.75,at:.92,k:'Stage 4 · 8–20% of those with steatohepatitis',t:'Cirrhosis',
  txt:`Among people with steatohepatitis, 8–20% develop cirrhosis: the liver is shrunken and nodular, with bands of scar around regenerating nodules. In a biopsy cohort, liver-related mortality at 5 years was 13% in early or compensated disease and 43% once decompensated (population statistics). Abstinence predicted survival in both groups. <sup class="c" data-ref="Singal2018ACG,Lackner2017JHep" title="Source 266,433">266,433</sup> Switch on “Stops drinking” to see the group survival data.`,
  pt:`Cirrhosis is heavy scarring. Even then, people who stop drinking live longer as a group.`,
  hook:`Abstinence in alcohol-related cirrhosis: survival difference becomes significant from 1.5 years (HR about 0.5–0.6). <sup class="c" data-ref="Xie2014HepatolRes" title="Source 508">508</sup>`}
];
const LV_ABS=[
 `<b>Stopped at this stage:</b> fatty liver resolves rapidly after complete abstinence. <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>`,
 `<b>Stopped at this stage:</b> fatty liver resolves rapidly after complete abstinence. <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>`,
 `<b>Stopped at this stage:</b> abstinence is the most effective way to prevent progression and the best treatment for every stage. <sup class="c" data-ref="Singal2018ACG,Seitz2018NRDP" title="Source 426,433">426,433</sup>`,
 `<b>Stopped at this stage:</b> in a meta-analysis of 7 cohorts (1,235 people with alcohol-related cirrhosis), abstinence improved survival, significant from 1.5 years (HR 0.51, 95% CI 0.33–0.81). <sup class="c" data-ref="Xie2014HepatolRes" title="Source 508">508</sup>`,
 `<b>Stopped at this stage:</b> in 633 people with decompensated alcohol-related cirrhosis who stopped drinking, 31.1% reached “recompensation” (33.8% cumulative at 5 years); stopping within 1 month roughly doubled the chance <span class="ev early">Early evidence</span>. No recompensated person who stayed abstinent died of liver causes during follow-up. <sup class="c" data-ref="Hofer2026JHep" title="Source 184">184</sup>`
];
inits.liver=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),ab=$('#lvAbst'),rd=$('#lvRead'),note=$('#lvNote');
  let abst=false;
  const stageOf=t=>t<.12?0:t<.35?ramp(t,.12,.3):t<.55?1+ramp(t,.35,.5):t<.75?2+ramp(t,.55,.7):3+ramp(t,.75,.9);
  /* rank order of the 100 people, shuffled once so each stage is scattered across the array */
  const R=rng(41),ord=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(R()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]]}
  const rank=[];ord.forEach((p,r)=>rank[p]=r);
  const NM=['Healthy','Fatty liver','Steatohepatitis','Fibrosis','Cirrhosis'];
  const COL=['var(--muted)','var(--fat)','var(--glu-fill)','var(--fib)','var(--liver)'];
  function icon(r,st){/* returns [colour, opacity, outline] for the person ranked r */
    const fat=Math.round(90*ramp(st,0,1)),ash=Math.round(30*ramp(st,1,2)),fS=Math.round(6*ramp(st,2,3)),fR=Math.round(12*ramp(st,2,3)),cS=Math.round(2*ramp(st,3,4)),cR=Math.round(6*ramp(st,3,4));
    if(r<cS)return [4,1];if(r<cR)return [4,.45];if(r<fS)return [3,1];if(r<fR)return [3,.45];if(r<ash)return [2,1];if(r<fat)return [1,1];return [0,.35]}
  function people(L,st,ph){let s='';const cleared=abst&&ph<=1;
    for(let p=0;p<100;p++){const c=p%10,rw=Math.floor(p/10),x=L.gx+c*L.gs,y=L.gy+rw*L.gr;let [k,op]=icon(rank[p],st);
      if(cleared&&k===1){s+=`<g style="opacity:.9">${person(x,y,L.ps,'none')}</g><circle cx="${f1(x)}" cy="${f1(y+L.ps*.6)}" r="${f1(L.ps*.42)}" style="fill:none;stroke:var(--fat);stroke-width:1.2"/>`;continue}
      s+=person(x,y,L.ps,COL[k],{op:k===0?.3:op})}
    const items=[[1,'Fatty liver','≈90 of 100'],[2,'Steatohepatitis','≈30 (one-third)'],[3,'Fibrosis','20–40% of those'],[4,'Cirrhosis','8–20% of those']];
    items.forEach(([k,n,v],i)=>{const x=L.lx+(i%2)*L.lw,y=L.ly+Math.floor(i/2)*30,on=st>=k-1+.05;
      s+=`<rect x="${x}" y="${y-9}" width="10" height="10" rx="2" style="fill:${COL[k]};opacity:${on?1:.3}"/><text x="${x+16}" y="${y}" class="t-xs" style="${on?'fill:var(--ink);font-weight:600':''}">${n}</text><text x="${x+16}" y="${y+12}" class="t-xs">${v}</text>`});
    if(cleared)s+=`<text x="${L.gx-8}" y="${L.fy}" class="t-xs" style="fill:var(--good)">rings: fat cleared after stopping</text>`;
    else s+=`<text x="${L.gx-8}" y="${L.fy}" class="t-xs">faint icons: the upper end of a published range</text>`;
    return s}
  function absChart(L){/* Xie 2014 hazard ratios for death, abstinence vs continued drinking, and Hofer 2026 recompensation */
    const HR=[[.5,.48,0],[1,.58,0],[1.5,.51,1],[2,.55,1],[3,.54,1],[4,.60,1],[5,.63,1]];
    const x0=L.cx,x1=L.cx+L.cw,y0=L.cy,h=L.ch,X=v=>lerp(x0,x1,v/5),Y=v=>y0+h-h*v/1.2;let s='';
    s+=`<text x="${x0-26}" y="${y0-12}" class="t-sm">DEATH, STOPPED vs KEPT DRINKING (HR)</text>`;
    s+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${h}" style="fill:var(--field)"/>`;
    [0,.5,1].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${x1}" y="${f1(Y(1)-4)}" class="t-xs t-end">1 = no difference</text>`;
    HR.forEach(([yr,v,sig],i)=>{const px=X(yr),py=Y(v);if(i)s+=`<line x1="${f1(X(HR[i-1][0]))}" y1="${f1(Y(HR[i-1][1]))}" x2="${f1(px)}" y2="${f1(py)}" style="stroke:var(--brand);stroke-width:1.6"/>`;
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4" style="fill:${sig?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/>`;
      if(yr===.5||yr===1.5||yr===5)s+=`<text x="${f1(px)}" y="${f1(py+15)}" class="t-xs t-mid">${v.toFixed(2)}</text>`});
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y0+h+12}" class="t-xs t-mid">${v}${v===5?' y':''}</text>`);
    s+=`<text x="${x0}" y="${y0+h+26}" class="t-xs">open dots: not significant · Xie 2014</text>`;
    /* recompensation bars */
    const by=L.by,bw=L.bw,REC=[[1,12.3],[2,23.4],[5,33.8]];
    s+=`<text x="${x0-26}" y="${by-12}" class="t-sm">RECOMPENSATION AFTER STOPPING</text>`;
    REC.forEach(([yr,v],i)=>{const y=by+i*20;s+=`<text x="${x0-4}" y="${y+9}" class="t-xs t-end">${yr} y</text><rect x="${x0}" y="${y}" width="${f1(bw)}" height="11" rx="5.5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(bw*v/100)}" height="11" rx="5.5" style="fill:var(--good)"/><text x="${f1(x0+bw*v/100+6)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
    s+=`<text x="${x0}" y="${by+70}" class="t-xs">decompensated cirrhosis, n=633 · Hofer 2026</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 696'),ph=phaseOf(LV_STEPS,t),st=stageOf(t);setSt(ph);
    const L=N?{tx:16,ty:30,lx0:200,ly0:150,ls:1.42,trx:20,trw:360,try:268,px:10,py:312,pw:380,ph:374,gx:44,gy:346,gs:35,gr:25,ps:20,lx:24,ly:610,lw:190,fy:676,cx:56,cw:300,cy:354,ch:120,by:546,bw:200}
             :{tx:24,ty:34,lx0:200,ly0:172,ls:1.75,trx:30,trw:330,try:318,px:384,py:14,pw:324,ph:352,gx:414,gy:42,gs:30,gr:24,ps:18,lx:402,ly:300,lw:156,fy:356,cx:430,cw:260,cy:46,ch:130,by:262,bw:200};
    let shown=st;const stop=abst&&ph<=1;if(stop)shown=Math.min(st,.08);
    let s=`<defs>${marker('lvA','var(--muted)')}</defs>`;
    s+=`<text x="${L.tx}" y="${L.ty}" style="font:800 ${N?20:22}px var(--display);fill:var(--ink)">${stop&&st>.05?'Fat clearing':NM[ph]}</text>`;
    s+=`<text x="${L.tx}" y="${L.ty+18}" class="t-sm">${abst?'after stopping drinking':'with continued heavy drinking'}</text>`;
    s+=liver(L.lx0,L.ly0,L.ls,{stage:shown,seed:7}).svg;
    if(abst&&ph>=2){const y=L.try-(N?24:26);s+=`<rect x="${L.lx0-120}" y="${y-14}" width="240" height="20" rx="10" style="fill:var(--good-soft)"/><text x="${L.lx0}" y="${y}" class="t-xs t-mid" style="fill:var(--good)">${ph>=4?'scar remains; group survival improves':ph===3?'stopping: survival improves from 1.5 y':'stopping halts the injury'}</text>`}
    /* stage track */
    const sw=L.trw/5;
    for(let i=0;i<5;i++){const x=L.trx+i*sw,fill=clamp(st-i+1,0,1);
      s+=`<rect x="${f1(x)}" y="${L.try}" width="${f1(sw-3)}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      if(i===0||st>i-1)s+=`<rect x="${f1(x)}" y="${L.try}" width="${f1((sw-3)*(i===0?1:fill))}" height="10" rx="5" style="fill:${COL[i]};opacity:${i===0?.4:.95}"/>`;
      const lb=i===2?['Steato-','hepatitis']:i===1?['Fatty','liver']:[NM[i]],sty=ph===i?'fill:var(--ink);font-weight:700':'';lb.forEach((w,j)=>s+=`<text x="${f1(x+(sw-3)/2)}" y="${L.try+24+j*11}" class="t-xs t-mid" style="${sty}">${w}</text>`)}
    const mx=L.trx+Math.min(st+.5,4.5)*sw;s+=`<path d="M${f1(mx-6)} ${L.try-12}L${f1(mx+6)} ${L.try-12}L${f1(mx)} ${L.try-3}Z" style="fill:var(--ink)"/>`;
    /* right (or lower) panel */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    if(abst&&ph>=3)s+=absChart(L);
    else{s+=`<text x="${L.gx-8}" y="${L.gy-12}" class="t-sm">100 PEOPLE WHO DRINK HEAVILY</text>`;s+=people(L,st,ph)}
    svg.innerHTML=s;
    rd.innerHTML=`<span>Stage <b>${NM[ph]}</b></span><span>Drawn as <b>${stop?'cleared':abst?'after stopping':'continuing'}</b></span><span>Liver glyph <b>${Math.round(shown/4*100)}%</b> of the way to cirrhosis</span>`;
    const P=LV_STEPS[ph];note.innerHTML=noteHTML(P)+(abst?`<p class="callout">${LV_ABS[ph]}</p>`:'');
  }
  const stop=playWire(rg,$('#lvPlay'),draw,22000,'Replay','liver');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  ab.addEventListener('click',()=>{abst=!abst;ab.setAttribute('aria-pressed',abst);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- Maddrey / MELD / Lille teaching calculator ---------- */
  const cs=$('#lvCalcSvg'),cn=$('#lvCalcNote'),I=id=>$('#'+id);
  function calc(){
    const N=vb(cs,'720 210','400 330');
    const pt=parseFloat(I('lvPt').value),ct=parseFloat(I('lvCtl').value),b0=parseFloat(I('lvBil').value),um=I('lvUnit').value==='um';
    const ok=isFinite(pt)&&isFinite(ct)&&isFinite(b0)&&b0>=0;
    const bil=ok?(um?b0/17.1:b0):0,df=ok?4.6*(pt-ct)+bil:NaN;
    const meld=parseFloat(I('lvMeld').value),hasM=isFinite(meld),li=I('lvLille').value;
    const sev=ok&&df>=32,max=100;
    let s='';const gx=N?110:130,gy=N?120:150,gr=N?84:100;
    s+=gauge(gx,gy,gr,ok?clamp(df,0,max):0,max,{bands:[{to:32,col:'var(--brand-soft)'},{to:max,col:'var(--liver)'}]});
    s+=`<text x="${gx}" y="${gy-gr*.34}" class="t-big t-mid" style="font-size:${N?28:32}px;fill:${sev?'var(--liver)':'var(--ink)'}">${ok?f1(df):'–'}</text>`;
    s+=`<text x="${gx}" y="${gy+18}" class="t-sm t-mid">Maddrey DF</text>`;
    const A=Math.PI*(1-32/max),tx=gx+(gr+8)*Math.cos(A),ty=gy-(gr+8)*Math.sin(A);
    s+=`<line x1="${f1(gx+(gr-26)*Math.cos(A))}" y1="${f1(gy-(gr-26)*Math.sin(A))}" x2="${f1(tx)}" y2="${f1(ty)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(tx-4)}" y="${f1(ty-4)}" class="t-xs t-end" style="fill:var(--ink)">32</text>`;
    /* Lille survival bars */
    const bx=N?40:300,by=N?196:44,bw=N?300:360;
    s+=`<text x="${bx}" y="${by}" class="t-sm">6-MONTH SURVIVAL BY DAY-7 LILLE (LOUVET 2007)</text>`;
    [['r','Lille below 0.45 (response)',85],['n','Lille 0.45 or higher (nonresponse)',25]].forEach(([k,lab,v],i)=>{const y=by+18+i*44,on=li===k,dim=li&&!on;
      s+=`<text x="${bx}" y="${y}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${lab}</text><rect x="${bx}" y="${y+6}" width="${bw}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1(bw*v/100)}" height="14" rx="7" style="fill:${k==='r'?'var(--brand)':'var(--liver)'};opacity:${dim?.3:1}"/><text x="${f1(bx+bw*v/100+6)}" y="${y+17}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
    if(hasM){const y=by+112,on=meld>20;s+=`<text x="${bx}" y="${y}" class="t-xs" style="fill:var(--ink)">MELD entered: <tspan style="font-weight:700">${Math.round(meld)}</tspan> · published flag for severe AH: above 20</text>`;
      const mw=bw,X=v=>bx+mw*clamp((v-6)/34);s+=`<line x1="${bx}" x2="${bx+mw}" y1="${y+14}" y2="${y+14}" style="stroke:var(--panel-2);stroke-width:8;stroke-linecap:round"/><line x1="${f1(X(20))}" x2="${f1(X(20))}" y1="${y+6}" y2="${y+22}" style="stroke:var(--ink);stroke-dasharray:2 2"/><circle cx="${f1(X(meld))}" cy="${y+14}" r="6" style="fill:${on?'var(--liver)':'var(--brand)'}"/>`}
    cs.innerHTML=s;
    let h=`<div class="kicker">Teaching result</div><h4>${ok?'Maddrey DF '+f1(df):'Enter all three values'}</h4>`;
    if(ok){h+=`<p>4.6 × (${f1(pt)} − ${f1(ct)}) + ${f1(bil)}${um?` (${f1(b0)} µmol/L ÷ 17.1)`:''} = <b>${f1(df)}</b>. <sup class="c" data-ref="Carithers1989" title="Source 55">55</sup></p>`;
      h+=`<div class="verdict ${sev?'no':'maybe'}">${sev?'At or above 32: the range trials have called severe alcohol-associated hepatitis.':'Below 32: below the published severe threshold.'}</div>`;
      h+=`<p>${sev?'Published data: a Maddrey score of 32 or more predicts about 20–50% mortality over 30 days (a population statistic). <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>':'The ACG wording for severe AH is a Maddrey score above 32 or a MELD above 20. <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>'}</p>`}
    if(hasM)h+=`<p>MELD ${Math.round(meld)} is ${meld>20?'above':'not above'} the published flag of 20; in a Mayo cohort MELD predicted 30-day mortality at least as well as Maddrey (c-statistic 0.83 vs 0.74). <sup class="c" data-ref="Singal2018ACG,Dunn2005MELD" title="Source 93,433">93,433</sup></p>`;
    if(li==='n')h+=`<p>Lille ≥0.45 at day 7 is “nonresponse”: 25% 6-month survival versus 85% in responders. People not responding had about 30% 6-month survival historically; highly selected people have had early transplantation (see the trial cards). <sup class="c" data-ref="Louvet2007Lille,Mathurin2011NEJM" title="Source 299,319">299,319</sup></p>`;
    else if(li==='r')h+=`<p>Lille below 0.45 counts as response, with 85% 6-month survival in the 2007 cohort. <sup class="c" data-ref="Louvet2007Lille" title="Source 299">299</sup></p>`;
    h+=`<div class="hook"><b>Exam hook</b>Maddrey DF = 4.6 × (PT − control) + bilirubin (mg/dL); ≥32 = severe AH. Lille ≥0.45 at day 7 = nonresponse. <sup class="c" data-ref="Carithers1989,Louvet2007Lille" title="Source 55,299">55,299</sup></div>`;
    h+=`<p class="stage-cap">Not for interpreting anyone’s own results.</p>`;
    cn.innerHTML=h}
  ['lvPt','lvCtl','lvBil','lvMeld'].forEach(id=>I(id).addEventListener('input',calc));
  ['lvUnit','lvLille'].forEach(id=>I(id).addEventListener('change',()=>{if(id==='lvUnit'){const v=parseFloat(I('lvBil').value);if(isFinite(v))I('lvBil').value=I('lvUnit').value==='um'?Math.round(v*17.1):f1(v/17.1)}calc()}));
  const ex=(pt,ct,b,m,l)=>{I('lvPt').value=pt;I('lvCtl').value=ct;I('lvUnit').value='mg';I('lvBil').value=b;I('lvMeld').value=m;I('lvLille').value=l;calc()};
  I('lvEx1').addEventListener('click',()=>ex(14,12,3,'',''));
  I('lvEx2').addEventListener('click',()=>ex(24,12,14,26,'n'));
  calc();

  /* ---------- STOPAH bars ---------- */
  const ss=$('#lvStopSvg');const ARM=[['placebo',17],['prednisolone',14],['pentoxifylline',19],['both',13]];let q='';
  ARM.forEach(([n,v],i)=>{const y=10+i*26;q+=`<text x="96" y="${y+11}" class="t-xs t-end">${n}</text><rect x="102" y="${y}" width="160" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="102" y="${y}" width="${f1(160*v/25)}" height="14" rx="7" style="fill:${i===1||i===3?'var(--rx)':'var(--liver)'}"/><text x="${f1(106+160*v/25)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  q+=`<text x="102" y="116" class="t-xs">28-day mortality (axis to 25%)</text>`;ss.innerHTML=q;
};
/* =============== 5.2 Alcohol and the whole body: cancer, heart, brain =============== */
const BD_STEPS=[
 {from:0,at:0,k:'0 g a day',t:'No alcohol',
  txt:`Across all health outcomes together, the Global Burden of Disease 2016 study found that the level of drinking that minimised harm was zero (95% UI 0.0–0.8) standard drinks a week, with a standard drink defined as 10 g of alcohol. Alcohol was the leading risk factor for death and disability at ages 15–49. <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`,
  pt:`Research does not support drinking alcohol to improve your health.`,
  hook:`GBD 2016: harm minimised at zero drinks a week. <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>`},
 {from:.02,at:.08,k:'Light · up to 12.5 g a day',t:'Light drinking',
  txt:`Even in the light band (up to 12.5 g a day, about one 10 g standard drink), cancer risks are above those of non-drinkers: breast 1.04 (95% CI 1.01–1.07), mouth and pharynx 1.13, oesophageal squamous cell 1.26. <sup class="c" data-ref="Bagnardi2015BJC" title="Source 30">30</sup> Drinking up to 10 g a day accounted for an estimated 41,300 cancers worldwide in 2020. <sup class="c" data-ref="Rumgay2021LancetOncol" title="Source 406">406</sup>`,
  pt:`Alcohol causes at least seven kinds of cancer, including breast and bowel cancer, and the risk starts at low amounts.`,
  hook:`IARC Group 1. Seven sites: mouth, pharynx, larynx, oesophagus, liver, colorectum, female breast. <sup class="c" data-ref="Baan2007IARC,Bagnardi2015BJC" title="Source 26,30">26,30</sup>`},
 {from:.135,at:.3,k:'Moderate · up to 50 g a day',t:'Moderate band',
  txt:`In 599,912 current drinkers, all-cause mortality was lowest at or below about 100 g a week (the dashed line), and each extra 100 g a week went with more stroke (HR 1.14), heart failure (1.09) and fatal hypertensive disease (1.24). <sup class="c" data-ref="Wood2018Lancet" title="Source 505">505</sup> Atrial fibrillation risk rises about 8% per drink a day (12 g drinks); hypertension risk rises almost linearly. <sup class="c" data-ref="Larsson2014JACC,Cecchini2024Hypertension" title="Source 58,275">58,275</sup>`,
  pt:`Risks to the heart and blood vessels climb steadily with each extra drink, not just at heavy amounts.`,
  hook:`Wood 2018: lowest all-cause mortality at ≤100 g a week in current drinkers; &gt;350 g a week ≈ 4–5 years less life expectancy at 40. <sup class="c" data-ref="Wood2018Lancet" title="Source 505">505</sup>`},
 {from:.505,at:.62,k:'Heavy · over 50 g a day',t:'Heavy drinking',
  txt:`Above 50 g a day the cancer risks jump: mouth and pharynx 5.13, oesophagus 4.95, larynx 2.65, liver 2.07, breast 1.61, bowel 1.44. <sup class="c" data-ref="Bagnardi2015BJC" title="Source 30">30</sup> Heavy drinking (more than 4 drinks a day) was linked with bleeding strokes: intracerebral haemorrhage RR 1.67, subarachnoid haemorrhage 1.82. <sup class="c" data-ref="Larsson2016BMCMed" title="Source 276">276</sup> In the 2023 meta-analysis, 45–64 g a day meant all-cause RR 1.19 and 65 g or more RR 1.35. <sup class="c" data-ref="Zhao2023JAMANO" title="Source 516">516</sup>`,
  pt:`At heavy amounts, the chance of mouth and throat cancer is about five times that of people who do not drink.`,
  hook:`Breast cancer risk rises about 7% per 10 g a day. <sup class="c" data-ref="Hamajima2002BJC" title="Source 160">160</sup>`},
 {from:.8,at:.95,k:'Very heavy · 80–100 g a day',t:'Very heavy drinking',
  txt:`Chronic pancreatitis risk rises steadily, to RR 6.29 (95% CI 3.04–13.02) at 100 g a day. <sup class="c" data-ref="Samokhvalov2015EBioMed" title="Source 412">412</sup> Alcohol-related cardiomyopathy is generally considered to need more than 80 g a day for over 5 years. <sup class="c" data-ref="Dominguez2024EHJ" title="Source 89">89</sup> Alcohol use disorders were the strongest modifiable risk factor for dementia (adjusted HR about 3.3). <sup class="c" data-ref="Schwarzinger2018LPH" title="Source 420">420</sup> Cutting down helps: halving intake from 6 or more drinks a day lowered blood pressure by 5.50/3.97 mm Hg. <sup class="c" data-ref="Roerecke2017LPH" title="Source 398">398</sup>`,
  pt:`Very heavy drinking can harm the pancreas, the heart muscle and memory. Many of these harms improve when a person stops; get medical help to stop safely after long, heavy daily drinking.`,
  hook:`Alcohol use disorder: strongest modifiable dementia risk factor (HR ~3.3). <sup class="c" data-ref="Schwarzinger2018LPH" title="Source 420">420</sup>`}
];
inits.body=()=>{
  const svg=$('#bdSvg'),rg=$('#bdT'),rd=$('#bdRead'),note=$('#bdNote');
  const band=g=>g<=0?-1:g<=12.5?0:g<=50?1:2,BN=['light','moderate','heavy'];
  const rrB=(g,a)=>{const b=band(g);return b<0?1:a[b]};
  const AFP=[1,1.08,1.17,1.26,1.36,1.47];
  const afRR=g=>{const d=g/12;if(d>=5)return 1.47;const i=Math.floor(d);return lerp(AFP[i],AFP[i+1],d-i)};
  const ROWS=[
   {n:'Mouth & throat cancer',o:'mouth',c:'can',f:g=>{const v=rrB(g,[1.13,1.83,5.13]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Oesophageal cancer',o:'oeso',c:'can',f:g=>{const v=rrB(g,[1.26,2.23,4.95]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Larynx cancer',o:'mouth',c:'can',f:g=>{const v=rrB(g,[null,1.44,2.65]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Breast cancer',o:'breast',c:'can',f:g=>{const v=rrB(g,[1.04,1.23,1.61]);return [v,'RR '+v.toFixed(2)]}},
   {n:'Bowel cancer',o:'bowel',c:'can',f:g=>{const v=rrB(g,[null,1.17,1.44]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Liver cancer',o:'liver',c:'can',f:g=>{const v=rrB(g,[null,null,2.07]);return v==null?[1,'not given']:[v,'RR '+v.toFixed(2)]}},
   {n:'Atrial fibrillation',o:'heart',c:'hrt',f:g=>g<=0?[1,'RR 1']:[afRR(g),'RR '+afRR(g).toFixed(2)+(g/12>=5?'+':'')]},
   {n:'High blood pressure',o:'heart',c:'hrt',f:g=>g<24?[1,'vs 12 g: —']:g<36?[1.11,'RR 1.11 vs 12 g']:g<48?[1.22,'RR 1.22 vs 12 g']:[1.33,'RR 1.33+ vs 12 g']},
   {n:'Cardiomyopathy',o:'heart',c:'hrt',f:g=>g>80?[2,'>80 g/d for >5 y']:[1,'—']},
   {n:'Chronic pancreatitis',o:'panc',c:'pan',f:g=>g>=95?[6.29,'RR 6.29 at 100 g']:g>0?[1+g/40,'rising']:[1,'—']},
   {n:'Brain volume',o:'brain',c:'brn',f:g=>g>0?[1+Math.min(1.5,g/40),'lower']:[1,'—']}
  ];
  const CC={can:'var(--glu-fill)',hrt:'var(--ember)',pan:'var(--eth-fill)',brn:'var(--dx)'};
  /* all-cause mortality RR vs lifetime non-drinkers (Zhao 2023), as steps over g/day */
  const ZH=[[0,1.3,.96,0],[1.3,24,.93,0],[24,44,1.05,0],[44,64,1.19,1],[64,100,1.35,1]];
  const zRR=g=>{if(g<=0)return 1;for(const z of ZH)if(g<=z[1])return z[2];return 1.35};
  const life=gw=>gw<=0?'—':gw<=100?'reference (>0–100 g)':gw<=200?'≈6 months less':gw<=350?'≈1–2 years less':'≈4–5 years less';
  function draw(t){
    const N=vb(svg,'720 380','400 600'),ph=phaseOf(BD_STEPS,t),g=t*100;setSt(ph);
    const L=N?{bx:70,by:16,bs:1.0,rx:150,ry:26,rh:21.5,rv:392,cx:56,cy:312,cw:320,ch:170,lx:56,ly:540}
             :{bx:92,by:20,bs:1.32,rx:196,ry:38,rh:26.5,rv:432,cx:484,cy:56,cw:222,ch:180,lx:468,ly:290};
    const hl={},col={};
    const vals=ROWS.map(r=>{const [v,txt]=r.f(g),gl=clamp((v-1)/1.6);if(!hl[r.o]||gl>hl[r.o]){hl[r.o]=gl;col[r.o]=CC[r.c]}return [v,txt,gl]});
    if(band(g)===2){hl.stomach=.12;col.stomach=CC.can}
    let s=bodymap(L.bx,L.by,L.bs,{hl,col}).svg;
    /* list of organs */
    s+=`<text x="${L.rx}" y="${L.ry-14}" class="t-sm">${band(g)<0?'NO ALCOHOL':'CANCER BAND: '+BN[band(g)].toUpperCase()}</text>`;
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh+6,[v,txt,gl]=vals[i],on=gl>.02;
      if(i===6||i===9)s+=`<line x1="${L.rx}" x2="${L.rv}" y1="${f1(y-L.rh*.62)}" y2="${f1(y-L.rh*.62)}" class="grid"/>`;
      s+=`<circle cx="${L.rx+5}" cy="${f1(y-4)}" r="${f1(3+gl*3)}" style="fill:${CC[r.c]};opacity:${f1(on?.5+gl*.5:.25)}"/>`;
      s+=`<text x="${L.rx+16}" y="${f1(y)}" class="t-xs" style="${on?'fill:var(--ink)':''}">${r.n}</text>`;
      s+=`<text x="${L.rv}" y="${f1(y)}" class="t-xs t-end" style="${on?'fill:var(--ink);font-weight:700':''}">${txt}</text>`;
      /* leader from the body map organ to the row, only when lit */
      if(gl>.25&&!N){const o=bodymap(L.bx,L.by,L.bs,{}).at[r.o];s+=`<line x1="${f1(o[0])}" y1="${f1(o[1])}" x2="${L.rx-2}" y2="${f1(y-4)}" style="stroke:${CC[r.c]};stroke-width:.8;opacity:${f1(gl*.6)}"/>`}});
    /* all-cause curve */
    const X=v=>L.cx+L.cw*v/100,Y=v=>L.cy+L.ch-L.ch*(v-.8)/.65;
    s+=`<text x="${L.cx-30}" y="${L.cy-16}" class="t-sm">ALL-CAUSE MORTALITY, RR</text>`;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="${L.ch}" style="fill:var(--field)"/>`;
    [.9,1,1.2,1.4].forEach(v=>s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${L.cx-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`);
    [0,25,50,75,100].forEach(v=>s+=`<text x="${f1(X(v))}" y="${L.cy+L.ch+13}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.cx+L.cw}" y="${L.cy+L.ch+26}" class="t-xs t-end">g a day</text>`;
    const wx=X(100/7);s+=`<line x1="${f1(wx)}" x2="${f1(wx)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--brand);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${f1(wx+4)}" y="${L.cy+11}" class="t-xs" style="fill:var(--brand)">100 g/week</text>`;
    s+=`<circle cx="${f1(X(0))}" cy="${f1(Y(1))}" r="3.5" style="fill:var(--muted)"/>`;
    let d='';ZH.forEach(([a,b,v])=>{if(g<=a)return;const e=Math.min(g,b);d+=`M${f1(X(a))} ${f1(Y(v))}H${f1(X(e))}`});
    if(d)s+=`<path d="${d}" style="stroke:var(--glu);stroke-width:3;stroke-linecap:round;fill:none"/>`;
    ZH.forEach(([a,b,v,sig],i)=>{if(i&&g>a+(b-a)*.4)s+=`<text x="${f1(X((a+b)/2))}" y="${f1(Y(v)+(i===1?13:-6))}" class="t-xs t-mid" style="fill:var(--ink)">${v.toFixed(2)}${sig?'':'*'}</text>`});
    const zr=zRR(g);s+=`<circle cx="${f1(X(g))}" cy="${f1(Y(zr))}" r="5" style="fill:var(--glu);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-xs">* not significant; vs lifetime</text><text x="${L.lx}" y="${L.ly+12}" class="t-xs">non-drinkers (Zhao 2023)</text>`;
    s+=`<text x="${L.lx}" y="${L.ly+34}" class="t-sm">LIFE EXPECTANCY AT 40 (WOOD 2018)</text><text x="${L.lx}" y="${L.ly+52}" class="t-lbl" style="fill:${g*7>100?'var(--glu)':'var(--ink)'}">${life(g*7)}</text>`;
    if(!N)s+=`<text x="${L.lx}" y="${L.ly+68}" class="t-xs">at ${Math.round(g*7)} g a week, vs &gt;0–100 g</text>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Intake <b>${Math.round(g)} g/day</b></span><span>≈ <b>${f1(g/10)}</b> standard drinks of 10 g</span><span><b>${Math.round(g*7)} g</b> a week</span><span>Cancer band <b>${band(g)<0?'none':BN[band(g)]}</b></span>`;
    note.innerHTML=noteHTML(BD_STEPS[ph]);
  }
  const stop=playWire(rg,$('#bdPlay'),draw,20000,'Replay','body');
  const setSt=stepWire($('#bdSteps'),BD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- J-curve debate ---------- */
  const js=$('#bdJSvg'),jn=$('#bdJNote'),JB=$$('[data-bdj]');
  /* curves over u in [0,1] (schematic intake), y = relative risk; the labelled points are the published values */
  const sm=(P,u)=>{for(let i=1;i<P.length;i++)if(u<=P[i][0]){const a=P[i-1],b=P[i],k=ease(ramp(u,a[0],b[0]));return lerp(a[1],b[1],k)}return P[P.length-1][1]};
  const JC=[
   [[0,1],[.2,.86],[.42,1],[.7,1.19],[1,1.35]],
   [[0,1],[.2,.97],[.45,1.05],[.7,1.19],[1,1.35]],
   [[0,1],[1,1.58]]];
  const JN=[
   {k:'Position A · observational',t:'The classic J-curve',txt:`Without adjustment, 87 cohort studies reproduced the J: low-volume drinkers had an all-cause mortality RR of 0.86 versus “non-drinkers”. <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup> But that reference group mixed lifetime abstainers with <b>former drinkers</b>, many of whom stopped because they were already ill, and whose mortality was raised (RR 1.22). Light drinkers also tend to have healthier lifestyles. <sup class="c" data-ref="Stockwell2016JSAD,Biddinger2022JAMANetwOpen" title="Source 39,443">39,443</sup>`,
    pt:`Comparing light drinkers with a group that includes people who quit because they were sick makes light drinking look healthier than it is.`,hook:`“Abstainer bias” (sick quitters) explains much of the J-curve. <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup>`},
   {k:'Position B · corrected',t:'The dip almost disappears',txt:`After adjusting for abstainer bias, the low-volume RR was 0.97 (0.88–1.07): no mortality benefit. <span class="ev est">Established</span> for the bias; benefit itself unproven. <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup> In the 2023 update (107 cohorts, 4.8 million people), low-volume drinking was RR 0.93 (not significant) versus lifetime non-drinkers, rising to 1.19 at 45–64 g a day and 1.35 at 65 g or more. An apparent protective link with coronary death disappeared in younger cohorts and higher-quality studies. <sup class="c" data-ref="Zhao2023JAMANO,Zhao2017JSAD" title="Source 514,516">514,516</sup>`,
    pt:`When the comparison is fair, light drinking does not lower the risk of dying.`,hook:`Adjusted RR for low-volume drinkers 0.97 (no benefit). <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup>`},
   {k:'Position B · genetics',t:'Mendelian randomisation',txt:`Gene variants that make drinking unpleasant (ALDH2, ADH1B) act like a natural experiment. In the China Kadoorie Biobank (512,715 adults), self-reported drinking showed a U shape for stroke, but genotype-predicted intake did not: stroke risk rose steadily, RR 1.27 for ischaemic stroke and 1.58 for intracerebral haemorrhage per 280 g a week, with no significant effect on heart attack (0.96). The authors call the protective effect “largely non-causal”. <span class="ev est">Established</span> <sup class="c" data-ref="Millwood2019" title="Source 330">330</sup> In Europeans, ADH1B carriers drank 17.2% less and had lower odds of coronary heart disease (OR 0.90). <sup class="c" data-ref="Holmes2014BMJ" title="Source 185">185</sup> Non-linear analyses in UK Biobank suggest little added cardiovascular risk at light intake and exponential rises at heavier intake <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Biddinger2022JAMANetwOpen" title="Source 39">39</sup>`,
    pt:`Studies that use genes as a fair coin toss find that more alcohol means more stroke, with no protective dip.`,hook:`Mendelian randomisation (ALDH2/ADH1B): no protective U shape for stroke. <sup class="c" data-ref="Millwood2019" title="Source 330">330</sup>`}];
  let jm=0,jFrom=0,jK=1,jStop=null;
  function drawJ(){
    const N=vb(js,'720 320','400 460');
    const x0=N?52:80,x1=N?386:520,y0=N?40:34,h=N?260:230,X=u=>lerp(x0,x1,u),Y=v=>y0+h-h*(v-.75)/.95;
    const f=u=>lerp(sm(JC[jFrom],u),sm(JC[jm],u),jK);
    let s=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${h}" style="fill:var(--field)"/>`;
    [.8,1,1.2,1.4,1.6].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v===1?'axis':'grid'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`);
    s+=`<text x="${x0}" y="${y0-12}" class="t-sm">${jm===2?'STROKE RISK (RR)':'ALL-CAUSE MORTALITY (RR)'}</text>`;
    const xl=jm===2?['0','genetically predicted intake →','280 g/wk']:['none','low','moderate','heavy'];
    if(jm===2){s+=`<text x="${x0}" y="${y0+h+14}" class="t-xs">0</text><text x="${(x0+x1)/2}" y="${y0+h+14}" class="t-xs t-mid">genetically predicted intake</text><text x="${x1}" y="${y0+h+14}" class="t-xs t-end">280 g a week</text>`}
    else xl.forEach((w,i)=>s+=`<text x="${f1(X([0,.2,.55,.95][i]))}" y="${y0+h+14}" class="t-xs t-mid">${w}</text>`);
    if(jm===2){/* self-reported U shape (dashed, schematic) and the two genetic lines */
      s+=`<path d="${pathFn(u=>(sm([[0,1],[.3,.88],[.6,1.02],[1,1.3]],u)-.75)/.95,x0,x1,y0+h,y0)}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(jK)}"/>`;
      s+=`<text x="${f1(X(.32))}" y="${f1(Y(.86)+14)}" class="t-xs t-mid">self-reported: U shape</text>`;
      const isch=u=>lerp(1,1.27,u);s+=`<path d="M${X(0)} ${f1(Y(1))}L${X(1)} ${f1(Y(lerp(1,1.27,jK)))}" style="stroke:var(--gaba);stroke-width:2.6;stroke-linecap:round"/><text x="${X(1)-4}" y="${f1(Y(lerp(1,1.27,jK))+14)}" class="t-xs t-end" style="fill:var(--gaba)">ischaemic stroke 1.27</text>`;
      s+=`<path d="M${X(0)} ${f1(Y(1))}L${X(1)} ${f1(Y(lerp(1,1.58,jK)))}" style="stroke:var(--glu);stroke-width:2.6;stroke-linecap:round"/><text x="${X(1)-4}" y="${f1(Y(lerp(1,1.58,jK))-8)}" class="t-xs t-end" style="fill:var(--glu)">brain bleed (ICH) 1.58</text>`;
      s+=`<text x="${f1(X(.5))}" y="${f1(Y(.96)+4)}" class="t-xs t-mid">heart attack: 0.96, not significant</text>`;
    }else{
      s+=`<path d="${pathFn(u=>(f(u)-.75)/.95,x0,x1,y0+h,y0)}" style="fill:none;stroke:var(--glu);stroke-width:3;stroke-linecap:round"/>`;
      const lv=f(.2);s+=`<circle cx="${f1(X(.2))}" cy="${f1(Y(lv))}" r="5" style="fill:var(--glu);stroke:var(--panel);stroke-width:2"/><text x="${f1(X(.2))}" y="${f1(Y(lv)+20)}" class="t-lbl t-mid">${lv.toFixed(2)}</text>`;
      s+=`<text x="${f1(X(.95))}" y="${f1(Y(f(.95))-10)}" class="t-xs t-end" style="fill:var(--ink)">1.35 at ≥65 g/day</text>`}
    /* the reference group */
    const rx=N?52:560,ry=N?y0+h+34:60,rw=N?334:148;
    {s+=`<text x="${rx}" y="${ry}" class="t-sm">${jm===2?'GROUPS SET BY GENES':'THE “NON-DRINKER” GROUP'}</text>`;
      if(jm===2){s+=`<text x="${rx}" y="${ry+20}" class="t-xs">ALDH2 / ADH1B variants decide</text><text x="${rx}" y="${ry+33}" class="t-xs">who drinks less, like a</text><text x="${rx}" y="${ry+46}" class="t-xs">natural randomised trial</text>`;
        for(let i=0;i<12;i++)s+=person(rx+8+(i%6)*(N?22:22),ry+(N?58:62)+Math.floor(i/6)*26,18,i%3===0?'var(--gaba-fill)':'var(--muted)',{op:i%3===0?1:.45})}
      else{const fd=jm===0?1-jK*0:0;
        for(let i=0;i<12;i++){const former=i>=8,show=!former||jm===0;s+=person(rx+8+(i%6)*22,ry+14+Math.floor(i/6)*26,18,former?'var(--accent)':'var(--muted)',{op:show?(former?1:.6):.12})}
        s+=`<rect x="${rx}" y="${ry+70}" width="10" height="10" rx="2" style="fill:var(--muted);opacity:.6"/><text x="${rx+16}" y="${ry+79}" class="t-xs">lifetime non-drinkers</text>`;
        s+=`<rect x="${rx}" y="${ry+88}" width="10" height="10" rx="2" style="fill:var(--accent);opacity:${jm===0?1:.25}"/><text x="${rx+16}" y="${ry+97}" class="t-xs">former drinkers, RR 1.22</text>`;
        const ln=jm===0?['mixed in: the reference','group looks sicker']:['removed: a fair','reference group'];ln.forEach((w,i)=>s+=`<text x="${rx}" y="${ry+118+i*12}" class="t-xs" style="fill:${jm===0?'var(--accent)':'var(--good)'}">${w}</text>`)}}
    js.innerHTML=s;
    jn.innerHTML=noteHTML(JN[jm]);
  }
  function setJ(m){if(m===jm&&jK===1)return;if(jStop)jStop();jFrom=jK<1?jm:jm;jFrom=jm;jm=m;jK=0;JB.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.bdj===m));jStop=animate(700,p=>{jK=ease(p);drawJ()},()=>{jStop=null;jK=1;drawJ()})}
  JB.forEach(b=>b.addEventListener('click',()=>setJ(+b.dataset.bdj)));
  onHide.body=(prev=>()=>{prev&&prev();if(jStop){jStop();jStop=null;jK=1}})(onHide.body);
  const prevR=redraws.body;redraws.body=()=>{prevR&&prevR();drawJ()};
  drawJ();

  /* ---------- AF trial bars ---------- */
  const af=$('#bdAfSvg');let a='';
  a+=`<text x="0" y="12" class="t-xs">AF RECURRENCE BY 6 MONTHS</text>`;
  [['usual drinking',73,'var(--glu-fill)'],['abstinence',53,'var(--rx)']].forEach(([n,v,c],i)=>{const y=22+i*22;a+=`<text x="92" y="${y+10}" class="t-xs t-end">${n}</text><rect x="98" y="${y}" width="170" height="13" rx="6.5" style="fill:var(--panel-2)"/><rect x="98" y="${y}" width="${f1(170*v/100)}" height="13" rx="6.5" style="fill:${c}"/><text x="${f1(102+170*v/100)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  a+=`<text x="0" y="84" class="t-xs">MEDIAN TIME IN AF</text>`;
  [['usual drinking',1.2,'var(--glu-fill)'],['abstinence',.5,'var(--rx)']].forEach(([n,v,c],i)=>{const y=92+i*20;a+=`<text x="92" y="${y+10}" class="t-xs t-end">${n}</text><rect x="98" y="${y}" width="${f1(110*v/1.2)}" height="12" rx="6" style="fill:${c}"/><text x="${f1(102+110*v/1.2)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
  af.innerHTML=a;
};
/* =============== 5.3 Families, friends and everyday life =============== */
const FA_STEPS=[
 {from:0,at:.07,k:'The whole family',t:'Drinking affects everyone close',
  txt:`Family members of people with alcohol or drug dependence were more likely than family members of people with diabetes or asthma to be diagnosed with substance use disorders, depression and trauma, with similar or higher healthcare costs. Family help comes in three kinds: helping the family member get the person into treatment, involving the family in that treatment, and supporting family members in their own right. <sup class="c" data-ref="Ray2009Family,Copello2005" title="Source 67,376">67,376</sup>`,
  pt:`When someone drinks heavily, the people around them carry stress too. Their own health matters.`,
  hook:`Three kinds of family intervention: engage the person, involve the family in treatment, support the family itself. <sup class="c" data-ref="Copello2005" title="Source 67">67</sup>`},
 {from:.16,at:.25,k:'Children',t:'Children growing up with a parent\'s drinking',
  txt:`About 7.5 million US children (10.5%) aged 17 or younger lived with at least one parent with past-year AUD (2009–2014). In 8,629 adults in the ACE study, the mean number of adverse childhood experiences was 1.4 with no parental alcohol problem, 2.6 with the father only, 3.2 with the mother only and 3.8 with both. These are retrospective reports and cannot prove cause; the authors call for joined-up adult and paediatric care. <sup class="c" data-ref="Lipari2017,Dube2001" title="Source 92,293">92,293</sup>`,
  pt:`Children often feel the strain. It is never their fault, and support for the whole family helps.`,
  hook:`Parental alcohol problems raised the odds of each adverse childhood experience about 2 to 13 times (ACE study). <sup class="c" data-ref="Dube2001" title="Source 92">92</sup>`},
 {from:.33,at:.4,k:'Help for you',t:'Support in your own right',
  txt:`Al-Anon is the most widely used help for people concerned about someone else's drinking: in a national survey of 359 newcomers and 264 members, members were more satisfied with their quality of life. When the person who drinks will not seek help, Al-Anon facilitation and coping-skills training help family members cope better. Family members improved psychologically and physically whether they had CRAFT, Al-Anon or the Johnson intervention. <sup class="c" data-ref="Timko2013,OFarrell2012,Roozen2010CRAFT" title="Source 350,401,462">350,401,462</sup>`,
  pt:`You can get support even if your loved one is not ready. Looking after yourself is not giving up on them.`,
  hook:`Every family approach studied improved the family member's own wellbeing. <sup class="c" data-ref="Miller1999,Roozen2010CRAFT" title="Source 329,401">329,401</sup>`},
 {from:.5,at:.6,k:'CRAFT',t:'Community reinforcement and family training',
  txt:`CRAFT trains a concerned family member or friend, building on the community reinforcement approach, which reduces drinking days more than usual care. It works with the person who drinks still at home and not yet seeking help. In a trial of 130 family members, engagement usually came after 4 to 6 sessions. <sup class="c" data-ref="Miller1999,Roozen2004CRA,Hunt1973" title="Source 191,329,400">191,329,400</sup>`,
  pt:`CRAFT is training for you, the family member, in ways to make treatment more likely, without confrontation.`,
  hook:`CRAFT engagement typically follows 4–6 sessions with the family member. <sup class="c" data-ref="Miller1999" title="Source 329">329</sup>`},
 {from:.66,at:.8,k:'Comparing approaches',t:'Which approach gets a loved one to treatment?',
  txt:`In the RCT of 130 concerned significant others, CRAFT engaged 64% of initially unmotivated problem drinkers in treatment, against 30% for the Johnson Institute confrontational intervention and 13% for Al-Anon facilitation. 70% of families assigned to the Johnson intervention chose not to go ahead with the confrontation. A review found CRAFT about three times as effective as Al-Anon/Nar-Anon (RR 3.25; NNT 2) and twice the Johnson intervention (RR 2.15; NNT 3). <sup class="c" data-ref="Miller1999,Roozen2010CRAFT" title="Source 329,401">329,401</sup>`,
  pt:`Calm, practised skills got more loved ones into treatment than a surprise confrontation did.`,
  hook:`CRAFT 64% vs Johnson 30% vs Al-Anon facilitation 13% engaged (Miller 1999). <sup class="c" data-ref="Miller1999" title="Source 329">329</sup>`},
 {from:.86,at:.94,k:'Together in treatment',t:'Couples and family therapy',
  txt:`Once the person enters treatment, behavioural couples therapy (BCT) is "clearly more effective" than individual treatment for abstinence and relationship functioning, including in studies with women and with gay and lesbian couples. In a meta-analysis of 12 RCTs (n = 754), BCT beat individual treatment (d = 0.54), and its advantage grew over time: frequency of use d = 0.45, consequences 0.50, relationship satisfaction 0.51. <sup class="c" data-ref="OFarrell2012,Powers2008" title="Source 350,369">350,369</sup>`,
  pt:`When both partners take part, treatment often works better, for drinking and for the relationship.`,
  hook:`BCT vs individual treatment: d = 0.54 (12 RCTs). <sup class="c" data-ref="Powers2008" title="Source 369">369</sup>`}
];
const FA_LANG={
 home:{old:`I can't keep living with <mark>a drunk</mark>. He's <mark>an alcoholic</mark> and he <mark>relapsed</mark> again.`,neu:`I'm worried about my partner. He has <mark>alcohol use disorder</mark>, he <mark>had a recurrence of use</mark> this week, and I want us both to get support.`},
 clinic:{old:`Patient is <mark>an alcohol abuser</mark> who <mark>relapsed</mark> after detox.`,neu:`Patient has <mark>alcohol use disorder</mark>, severe; <mark>recurrence of use</mark> after withdrawal management. Discussed medicine and follow-up.`},
 work:{old:`We can't trust him with the team, he's <mark>an addict</mark>.`,neu:`He is <mark>a person in recovery</mark> and is getting treatment; we will support his return to work.`}};
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(FA_STEPS,t),u=ramp(t,FA_STEPS[p].from,p<5?FA_STEPS[p+1].from:1);
    /* constellation box */
    const O=N?{cx:200,cy:158,sc:1.22}:{cx:205,cy:182,sc:1.38};
    const M=[{k:'partner',n:'partner',a:-.5,d:118,s:52},{k:'kid1',n:'child',a:.45,d:120,s:38},{k:'kid2',n:'child',a:1.05,d:112,s:34},{k:'par',n:'parent',a:Math.PI+.45,d:122,s:50},{k:'fr',n:'friend',a:Math.PI-.35,d:126,s:48}];
    let s=`<defs>${marker('faA','var(--rx)')}</defs>`;
    const pos=m=>[O.cx+Math.cos(m.a)*m.d*O.sc,O.cy+Math.sin(m.a)*m.d*O.sc*.92];
    /* ripples */
    if(p===0)for(let i=0;i<3;i++){const k=(u*1.4+i/3)%1;s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${f1(30+k*140)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1((1-k)*.5)}"/>`}
    M.forEach(m=>{const [x,y]=pos(m);s+=`<line x1="${O.cx}" y1="${O.cy}" x2="${f1(x)}" y2="${f1(y)}" style="stroke:var(--line);stroke-width:1.4"/>`});
    /* CRAFT: arrow partner -> person */
    if(p===3||p===4){const [x,y]=pos(M[0]),k=p===3?ease(ramp(u,0,.8)):1;s+=`<line x1="${f1(x)}" y1="${f1(y+20)}" x2="${f1(lerp(x,O.cx+24,k))}" y2="${f1(lerp(y+20,O.cy-4,k))}" style="stroke:var(--rx);stroke-width:2.6" marker-end="url(#faA)"/>`}
    /* support circle around partner and the other adults */
    if(p===2||p===3){const k=p===2?ramp(u,0,.6):1;[M[0],M[3]].forEach(m=>{const [x,y]=pos(m);s+=`<circle cx="${f1(x)}" cy="${f1(y+m.s*.5)}" r="${f1(m.s*.85*k+1)}" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4;opacity:${f1(.9*k)}"/>`});
      const [x,y]=pos(M[0]);s+=`<text x="${f1(x)}" y="${f1(y-12)}" class="t-xs t-mid" style="fill:var(--good);opacity:${f1(k)}">support for you</text>`}
    /* couples therapy: a shared circle */
    if(p===5){const [x,y]=pos(M[0]),k=ramp(u,0,.6),mx=(x+O.cx)/2,my=(y+O.cy)/2+14;s+=`<ellipse cx="${f1(mx)}" cy="${f1(my)}" rx="${f1(30+86*k)}" ry="${f1(26+44*k)}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;opacity:${f1(.4+.5*k)}"/><text x="${f1(mx)}" y="${f1(my-(26+44*k)-6)}" class="t-sm t-mid" style="fill:var(--rx);font-weight:700;opacity:${f1(k)}">couples therapy</text>`}
    /* people */
    M.forEach(m=>{const [x,y]=pos(m),hl=(p===1&&m.k.startsWith('kid'))||((p===2||p===3||p===4)&&m.k==='partner')||(p===5&&m.k==='partner');
      s+=person(x,y,m.s*1.15,hl?'var(--rx)':'var(--muted)');
      if(p===0){const k=ramp(u,.2,.7);if(k>0)s+=`<path d="M${f1(x-8)} ${f1(y-6)}q4 -6 8 0q4 6 8 0" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1(k)}"/>`}
      s+=`<text x="${f1(x)}" y="${f1(y+m.s*1.15+14)}" class="t-xs t-mid">${m.n}</text>`});
    s+=person(O.cx,O.cy-36,72,'var(--ink)')+`<text x="${O.cx}" y="${O.cy+52}" class="t-xs t-mid" style="fill:var(--ink)">person with AUD</text>`;
    if(p===4){const ok=u>.5;s+=`<text x="${O.cx}" y="${O.cy-40}" class="t-sm t-mid" style="fill:${ok?'var(--rx)':'var(--muted)'};font-weight:700">${ok?'enters treatment?':''}</text>`}
    /* side panel */
    const B=N?{x:10,y:338,w:380,h:256}:{x:410,y:14,w:300,h:352};
    s+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const X0=B.x+16,W=B.w-32;let y=B.y+28;
    const hd=(a,b)=>{s+=`<text x="${X0}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:700">${a}</text>`;if(b)s+=`<text x="${X0}" y="${y+15}" class="t-xs">${b}</text>`;y+=b?36:22};
    const bar=(lab,v,max,col,val,k)=>{s+=`<text x="${X0}" y="${y}" class="t-xs" style="fill:var(--ink)">${lab}</text>`;const w=W-56;s+=`<rect x="${X0}" y="${y+6}" width="${f1(w)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${X0}" y="${y+6}" width="${f1(w*v/max*k)}" height="16" rx="4" style="fill:${col}"/><text x="${X0+W}" y="${y+19}" class="t-sm t-end" style="fill:${col};font-weight:700">${val}</text>`;y+=42};
    if(p===0){hd('Three kinds of family help','Copello 2005');
      ['1  Help the person get into treatment','2  Join in the person\'s treatment','3  Support family members themselves'].forEach((tx,i)=>{const k=ramp(u,i*.25,i*.25+.3);s+=`<rect x="${X0}" y="${y-14}" width="${W}" height="30" rx="8" style="fill:var(--rx-soft);opacity:${f1(k)}"/><text x="${X0+10}" y="${y+5}" class="t-sm" style="fill:var(--ink);opacity:${f1(k)}">${tx}</text>`;y+=40});
      y+=6;s+=`<text x="${X0}" y="${y}" class="t-xs">Family members had more SUD, depression</text><text x="${X0}" y="${y+15}" class="t-xs">and trauma diagnoses than families of</text><text x="${X0}" y="${y+30}" class="t-xs">people with diabetes or asthma.</text>`}
    else if(p===1){hd('Mean adverse childhood experiences','by parental alcohol problem · ACE study');
      [['None',1.4,'var(--muted)'],['Father only',2.6,'var(--warn)'],['Mother only',3.2,'var(--accent)'],['Both parents',3.8,'var(--accent)']].forEach((r,i)=>bar(r[0],r[1],4,r[2],r[1].toFixed(1),ease(ramp(u,i*.15,i*.15+.4))));
      s+=`<text x="${X0}" y="${y+2}" class="t-xs">Retrospective reports: an association,</text><text x="${X0}" y="${y+17}" class="t-xs">not proof of cause. 10.5% of US children</text><text x="${X0}" y="${y+32}" class="t-xs">lived with a parent with past-year AUD.</text>`}
    else if(p===2){hd('Al-Anon family groups','national survey · Timko 2013');
      bar('Newcomers surveyed',359,400,'var(--muted)','359',ramp(u,0,.4));bar('Members surveyed',264,400,'var(--good)','264',ramp(u,.15,.55));
      s+=`<text x="${X0}" y="${y}" class="t-sm" style="fill:var(--good);font-weight:700">Members: more satisfied with</text><text x="${X0}" y="${y+17}" class="t-sm" style="fill:var(--good);font-weight:700">their quality of life</text>`;
      s+=`<text x="${X0}" y="${y+44}" class="t-xs">Bars show sample sizes; the abstract</text><text x="${X0}" y="${y+59}" class="t-xs">reports the difference in words.</text>`}
    else if(p===3){hd('Sessions with the family member','engagement usually after 4–6 · Miller 1999');
      const n=Math.min(6,Math.floor(u*7.2));for(let i=0;i<6;i++){const cx=X0+18+i*(W-36)/5,on=i<n,band=i>=3;
        s+=`<circle cx="${f1(cx)}" cy="${y+20}" r="15" style="fill:${on?(band?'var(--rx)':'var(--rx-soft)'):'var(--panel-2)'};stroke:${band?'var(--rx)':'var(--line)'}"/><text x="${f1(cx)}" y="${y+24}" class="t-sm t-mid" style="fill:${on&&band?'var(--on-brand)':'var(--ink)'};font-weight:700">${i+1}</text>`}
      s+=`<path d="M${f1(X0+18+3*(W-36)/5-16)} ${y+48}h${f1(2*(W-36)/5+32)}" style="stroke:var(--rx);stroke-width:2"/><text x="${f1(X0+18+4*(W-36)/5)}" y="${y+64}" class="t-xs t-mid" style="fill:var(--rx)">usual window</text>`;
      y+=96;s+=`<text x="${X0}" y="${y}" class="t-xs">CRAFT builds on the community</text><text x="${X0}" y="${y+15}" class="t-xs">reinforcement approach (Hunt and Azrin, 1973),</text><text x="${X0}" y="${y+30}" class="t-xs">which cut drinking days more than usual care.</text>`}
    else if(p===4){hd('Loved ones engaged in treatment','RCT, 130 family members · Miller 1999');
      [['CRAFT',64,'var(--rx)'],['Johnson confrontation',30,'var(--warn)'],['Al-Anon facilitation',13,'var(--muted)']].forEach((r,i)=>bar(r[0],r[1],100,r[2],r[1]+'%',ease(ramp(u,.05+i*.08,.6+i*.08))));
      s+=`<text x="${X0}" y="${y}" class="t-xs">Review: CRAFT RR 3.25 vs Al-Anon (NNT 2),</text><text x="${X0}" y="${y+15}" class="t-xs">RR 2.15 vs Johnson (NNT 3).</text><text x="${X0}" y="${y+36}" class="t-xs" style="fill:var(--warn)">70% of Johnson families did not go</text><text x="${X0}" y="${y+51}" class="t-xs" style="fill:var(--warn)">ahead with the confrontation.</text>`}
    else{hd('Couples therapy vs individual','BCT meta-analysis, 12 RCTs · effect size d');
      [['Overall',.54,'var(--rx)'],['Frequency of use (follow-up)',.45,'var(--rx)'],['Consequences (follow-up)',.5,'var(--rx)'],['Relationship satisfaction',.51,'var(--good)']].forEach((r,i)=>bar(r[0],r[1],.8,r[2],'d '+r[1].toFixed(2),ease(ramp(u,i*.12,i*.12+.45))))}
    svg.innerHTML=s;setSt(p);$('#faNote').innerHTML=noteHTML(FA_STEPS[p]);
  }
  const stop=playWire(rg,$('#faPlay'),draw,30000,'Replay','families');
  const setSt=stepWire($('#faSteps'),FA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- what to say ---- */
  let neu=true;const sel=$('#faCtx'),wb=$('#faWords'),card=$('#faLang');
  function drawL(){const L=FA_LANG[sel.value];card.classList.toggle('old',!neu);
    card.innerHTML=`<div class="kicker">${neu?'Person-first, non-stigmatising':'Labels that carry blame'}</div><p class="say">${neu?L.neu:L.old}</p><p class="stage-cap">${neu?'Names the condition, not the person; describes what happened and what comes next. "Long-term recovery" and "recurrence of use" carried more positive associations. <sup class="c" data-ref="Ashford2018" title="Source 21">21</sup>':'In studies, "abuser", "addict" and "alcoholic" pushed readers toward blame and punishment. <sup class="c" data-ref="Kelly2010Language,Ashford2018" title="Source 21,226">21,226</sup> Switch back to see the alternative.'}</p>`}
  sel.addEventListener('change',drawL);
  wb.addEventListener('click',()=>{neu=!neu;wb.setAttribute('aria-pressed',neu);wb.textContent=neu?'Person-first wording':'Stigmatising wording';drawL()});
  drawL();
};
/* =============== 5.4 Pregnancy and fetal alcohol spectrum disorders =============== */
const PG_STEPS=[
 {from:0,at:.1,k:'Weeks 0–12',t:'Early pregnancy',
  txt:`The CDC states that there is no known safe amount of alcohol in pregnancy; drinking can cause FASD and might increase the risk of miscarriage and stillbirth. <sup class="c" data-ref="Gosdin2022MMWR" title="Source 144">144</sup> In a meta-analysis of 24 studies (231,808 pregnant women), alcohol exposure was linked with higher miscarriage risk (OR 1.19, 95% CI 1.12–1.28); at up to 5 drinks a week, each extra weekly drink added about 6%. <sup class="c" data-ref="Sundermann2019ACER" title="Source 448">448</sup>`,
  pt:`No amount of alcohol is known to be safe in pregnancy, at any stage. If you are pregnant or planning a pregnancy, plan with your care team.`,
  hook:`No known safe amount and no safe time to drink in pregnancy. <sup class="c" data-ref="Gosdin2022MMWR,Williams2015AAP" title="Source 144,497">144,497</sup>`},
 {from:.3,at:.45,k:'Weeks 13–27',t:'No safe trimester',
  txt:`The AAP clinical report states that no amount of alcohol should be considered safe, there is no safe trimester, all forms (beer, wine, liquor) pose similar risk, and binge drinking poses dose-related risk. <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup> In the US in 2018–2020, 13.5% of pregnant adults reported current drinking and 5.2% binge drinking; frequent mental distress and having no usual provider were linked with more drinking. <sup class="c" data-ref="Gosdin2022MMWR" title="Source 144">144</sup>`,
  pt:`Stopping at any point in pregnancy helps. Support for mental health and good access to care make stopping easier.`},
 {from:.6,at:.72,k:'Weeks 28–40',t:'A lifelong effect, fully preventable',
  txt:`Prenatal alcohol exposure is the leading preventable cause of birth defects and of intellectual and neurodevelopmental disabilities. The neurocognitive and behavioural effects are lifelong, and they are completely preventable when no alcohol is used in pregnancy. <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup> The brain is highlighted throughout the timeline because the AAP finds no safe trimester. <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup>`,
  pt:`Alcohol can affect how a baby’s brain develops, and these effects can last for life.`,
  hook:`Prenatal alcohol = leading preventable cause of birth defects and neurodevelopmental disabilities (AAP). <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup>`},
 {from:.82,at:.9,k:'After birth',t:'FAS facial features',
  txt:`The 2016 criteria for fetal alcohol syndrome need at least 2 of 3 facial features (short palpebral fissures at or below the 10th centile, a thin upper-lip vermilion and a smooth philtrum, rank 4 or 5 on a racially normed guide), plus growth deficiency, deficient brain growth or abnormal brain structure or function, and neurobehavioural impairment. FAS can be diagnosed with or without documented exposure. <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>`,
  pt:`Doctors look for a pattern: small eye openings, a smooth groove under the nose and a thin upper lip, together with growth and development checks.`,
  hook:`FAS face: short palpebral fissures, smooth philtrum, thin upper-lip vermilion (≥2 of 3). <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>`},
 {from:.96,at:1,k:'Childhood and beyond',t:'Support changes outcomes',
  txt:`FASD rarely comes alone: 428 co-occurring conditions have been described. In 415 people with FAS or fetal alcohol effects, diagnosis at a younger age and a stable, nurturing home raised the odds of avoiding adverse outcomes 2- to 4-fold. <sup class="c" data-ref="Popova2016Lancet,Streissguth2004JDBP" title="Source 366,446">366,446</sup> Early recognition and therapy improve outcomes. <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup>`,
  pt:`Children affected by alcohol before birth do better when they are diagnosed early and grow up with steady support.`,
  hook:`FASD categories (IOM): FAS, partial FAS, ARND, ARBD. <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>`}
];
inits.pregnancy=()=>{
  const svg=$('#pgSvg'),rg=$('#pgT'),rd=$('#pgRead'),note=$('#pgNote');
  const wk=t=>40*ramp(t,0,.8);
  function fetus(cx,cy,k,br){/* curled schematic fetus, k = size 0..1, br = brain highlight 0..1 */
    const s=lerp(.28,1,k);let g=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(s)})">`;
    g+=`<path d="M-6 -30C26 -34 48 -10 44 18C40 44 14 58 -12 52C-30 48 -40 34 -36 18C-32 6 -20 0 -10 6" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:${f1(1.6/s)}"/>`;
    g+=`<circle cx="-14" cy="-26" r="26" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:${f1(1.6/s)}"/>`;
    g+=`<path d="M-30 -32C-26 -46 -6 -50 4 -38C6 -28 -4 -20 -16 -22C-24 -22 -30 -26 -30 -32Z" style="fill:var(--dx);opacity:${f1(.25+br*.55)}"/>`;
    g+=`<path d="M10 10C4 18 6 28 14 32M26 24C20 34 26 44 34 42" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(1.4/s)};stroke-linecap:round"/>`;
    g+=`<circle cx="-26" cy="-18" r="2" style="fill:var(--brain-line)"/>`;
    return g+'</g>'}
  function face(cx,cy,sc,m,N){/* schematic child face; m 0 typical .. 1 the FAS facial pattern */
    let g=`<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(sc)})">`;
    g+=`<ellipse cx="0" cy="0" rx="62" ry="76" style="fill:var(--skin);stroke:var(--brain-line);stroke-width:1.6"/>`;
    g+=`<path d="M-58 -30C-50 -80 50 -80 58 -30C40 -56 -40 -56 -58 -30Z" style="fill:var(--brain-line);opacity:.5"/>`;
    const ew=lerp(16,11,m);/* palpebral fissure length */
    [-1,1].forEach(d=>{const ex=d*24;g+=`<path d="M${f1(ex-ew)} -8Q${f1(ex)} -17 ${f1(ex+ew)} -8Q${f1(ex)} 0 ${f1(ex-ew)} -8Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(ex)}" cy="-8" r="3.6" style="fill:var(--ink)"/>`;
      if(m>.05)g+=`<path d="M${ex-16} 4H${ex+16}" style="stroke:var(--muted);stroke-width:.8;stroke-dasharray:2 2;opacity:${f1(m)}"/>`});
    g+=`<path d="M-4 0Q-8 18 -8 22Q0 27 8 22Q8 18 4 0" style="fill:none;stroke:var(--brain-line);stroke-width:1.3"/>`;
    /* philtrum: two ridges that fade away */
    g+=`<path d="M-5 28V40M5 28V40" style="stroke:var(--brain-line);stroke-width:1.4;opacity:${f1(1-m)}"/>`;
    /* upper lip vermilion thins */
    const lt=lerp(6,1.6,m);
    g+=`<path d="M-18 44Q-8 ${f1(44-lt)} 0 ${f1(44-lt*.4)}Q8 ${f1(44-lt)} 18 44Q0 ${f1(44+1)} -18 44Z" style="fill:var(--glu-fill);opacity:.8"/><path d="M-16 45Q0 54 16 45" style="fill:var(--glu-fill);opacity:.6;stroke:none"/>`;
    return g+'</g>'}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),ph=phaseOf(PG_STEPS,t),w=wk(t),born=ramp(t,.8,.86);setSt(ph);
    const L=N?{tx0:24,tx1:376,ty:52,wx:200,wy:232,wr:104,fx:200,fy:236,fs:1.25,px:12,py:372,pw:376,ph:212}
             :{tx0:30,tx1:690,ty:52,wx:175,wy:228,wr:118,fx:175,fy:230,fs:1.35,px:392,py:96,pw:316,ph:270};
    let s='';
    /* timeline */
    const X=v=>lerp(L.tx0,L.tx1,v/40),TR=[[0,13,'1st trimester'],[13,27,'2nd trimester'],[27,40,'3rd trimester']];
    TR.forEach(([a,b,n],i)=>{const on=w>=a&&(w<b||(i===2&&w>=40));s+=`<rect x="${f1(X(a))}" y="${L.ty}" width="${f1(X(b)-X(a)-2)}" height="12" rx="6" style="fill:${on?'var(--brand)':'var(--panel-2)'};opacity:${on?.85:1}"/><text x="${f1((X(a)+X(b))/2)}" y="${L.ty+27}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${N?['1st','2nd','3rd'][i]:n}</text>`});
    [0,10,20,30,40].forEach(v=>s+=`<text x="${f1(X(v))}" y="${L.ty-6}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${L.tx1}" y="${L.ty-18}" class="t-xs t-end">weeks</text>`;
    const nx=X(Math.min(w,40));s+=`<path d="M${f1(nx-6)} ${L.ty-2}L${f1(nx+6)} ${L.ty-2}L${f1(nx)} ${L.ty+8}Z" style="fill:var(--ink)"/>`;
    /* the guidance band across the whole timeline */
    const bw=L.tx1-L.tx0;
    s+=`<rect x="${L.tx0}" y="${L.ty-46}" width="${f1(bw)}" height="18" rx="9" style="fill:var(--accent-soft)"/>`;
    s+=`<text x="${L.tx0+10}" y="${L.ty-33}" class="t-xs" style="fill:var(--accent);font-weight:700">${N?'no known safe amount · no safe trimester':'no known safe amount · no safe trimester · all drinks similar risk'}</text>`;
    /* womb and fetus, cross-fading to the face after birth */
    const op=1-born;
    if(op>0){s+=`<g style="opacity:${f1(op)}"><circle cx="${L.wx}" cy="${L.wy}" r="${L.wr}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:2"/><circle cx="${L.wx}" cy="${L.wy}" r="${L.wr-8}" style="fill:var(--panel);opacity:.55"/>`;
      s+=`<path d="M${L.wx+L.wr*.55} ${L.wy-L.wr*.62}C${L.wx+L.wr*.8} ${L.wy-L.wr*.4} ${L.wx+L.wr*.78} ${L.wy-L.wr*.1} ${L.wx+L.wr*.62} ${L.wy+L.wr*.05}" style="fill:none;stroke:var(--liver);stroke-width:9;stroke-linecap:round;opacity:.5"/>`;
      s+=`<text x="${L.wx+L.wr*.7}" y="${L.wy-L.wr*.7}" class="t-xs">placenta</text>`;
      s+=fetus(L.fx,L.fy,ramp(w,4,40),.5+.5*Math.sin(t*40)**2);
      s+=`<text x="${L.wx}" y="${L.wy+L.wr+18}" class="t-xs t-mid" style="fill:var(--dx)">brain developing throughout (highlighted)</text></g>`}
    if(born>0){const m=ramp(t,.84,.94),sc=N?1.15:1.1;s+=`<g style="opacity:${f1(born)}">`+face(L.wx,L.wy+6,sc,m,N);
      const lab=(x1,y1,x2,y2,a,b,anc)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:.9"/><text x="${f1(x2+(anc==='e'?-3:3))}" y="${f1(y2-2)}" class="t-xs${anc==='e'?' t-end':''}" style="fill:var(--ink)">${a}</text><text x="${f1(x2+(anc==='e'?-3:3))}" y="${f1(y2+10)}" class="t-xs${anc==='e'?' t-end':''}">${b}</text>`;
      if(m>.3){const cx=L.wx,cy=L.wy+6;
        s+=lab(cx+24*sc,cy-8*sc,cx+(N?88:96),cy-74,'short palpebral','fissures (≤10th)','s');
        s+=lab(cx,cy+34*sc,L.wx-(N?186:161),cy+(N?86:98),'smooth','philtrum (rank 4–5)','s');
        s+=lab(cx+12*sc,cy+42*sc,cx+(N?88:96),cy+88,'thin upper-lip','vermilion','s')}
      s+=`<text x="${L.wx}" y="${L.wy+L.wr+18}" class="t-xs t-mid">${m>.5?'≥2 of 3 features for the FAS facial criterion':'schematic face'}</text></g>`}
    /* facts panel */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const P=[[`OR 1.19`,'miscarriage risk with alcohol','exposure (24 studies)','+6% per extra weekly drink','(at up to 5 drinks a week)'],
             [`13.5%`,'of pregnant US adults reported','current drinking, 2018–2020','5.2% reported binge drinking','global estimate: 9.8%'],
             [`Leading`,'preventable cause of birth','defects and neurodevelopmental','disabilities; effects lifelong,','and completely preventable'],
             [`≥2 of 3`,'facial features, plus growth,','brain growth or structure, and','neurobehavioural impairment','(Hoyme 2016)'],
             [`2–4×`,'better odds of avoiding adverse','outcomes with earlier diagnosis','and a stable, nurturing home','(Streissguth 2004)']][ph];
    const SRC=['Sundermann 2019','Gosdin 2022 · Popova 2017','AAP · Williams 2015','Hoyme 2016','Streissguth 2004'][ph];
    const k=ph===0?1:ramp(t,PG_STEPS[ph].from,PG_STEPS[ph].from+.06);
    s+=`<text x="${L.px+18}" y="${L.py+26}" class="t-sm">${PG_STEPS[ph].k.toUpperCase()}</text>`;
    s+=`<text x="${L.px+18}" y="${L.py+(N?70:74)}" style="font:800 ${N?36:40}px var(--display);fill:${ph>=4?'var(--good)':'var(--accent)'};opacity:${f1(.3+.7*k)}">${P[0]}</text>`;
    P.slice(1).forEach((ln,i)=>s+=`<text x="${L.px+18}" y="${L.py+(N?100:108)+i*(N?20:22)}" class="t-lbl" style="font-weight:${i<2?700:400};opacity:${f1(.3+.7*k)}">${ln}</text>`);
    s+=`<text x="${L.px+18}" y="${L.py+L.ph-16}" class="t-xs">${SRC}</text>`;
    svg.innerHTML=s;
    rd.innerHTML=born>.5?`<span>Stage <b>after birth</b></span><span>Facial pattern drawn <b>${Math.round(ramp(t,.84,.94)*100)}%</b></span>`:`<span>Week <b>${Math.round(w)}</b> of 40</span><span>Trimester <b>${w<13?1:w<27?2:3}</b></span><span>Safe amount known: <b>none</b></span>`;
    note.innerHTML=noteHTML(PG_STEPS[ph]);
  }
  const stop=playWire(rg,$('#pgPlay'),draw,22000,'Replay','pregnancy');
  const setSt=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- prevalence icon array (per 1,000) ---------- */
  const ps=$('#pgPrevSvg'),pn=$('#pgPrevNote'),PB=$$('[data-pgp]');
  const PV=[
   {lo:7.7,hi:7.7,lab:'7.7 per 1,000',k:'Lange 2017 · global',t:'Global FASD prevalence',txt:`The estimated global prevalence of FASD among children and youth is 7.7 per 1,000 (95% CI 4.9–11.7). <sup class="c" data-ref="Lange2017JAMAPediatr" title="Source 272">272</sup>`,pt:`About 8 in every 1,000 children and young people worldwide are estimated to have FASD.`},
   {lo:19.8,hi:19.8,lab:'19.8 per 1,000',k:'Lange 2017 · Europe',t:'Highest regional estimate',txt:`The WHO European Region had the highest estimate, 19.8 per 1,000. <sup class="c" data-ref="Lange2017JAMAPediatr" title="Source 272">272</sup>`,pt:`In Europe the estimate is about 2 in every 100 children.`},
   {lo:11.3,hi:50,lab:'11.3–50.0 per 1,000',k:'May 2018 · US first-graders',t:'Four US communities',txt:`Among 6,639 first-graders assessed in 4 US communities (2010–2016), conservative FASD prevalence ranged from 11.3 to 50.0 per 1,000 (1.1% to 5.0%); weighted estimates were 31.1 to 98.5 per 1,000. <sup class="c" data-ref="May2018JAMA" title="Source 320">320</sup>`,pt:`In these US communities, between about 1 and 5 in every 100 six-year-olds had FASD by the conservative count.`,hook:`Global FASD prevalence 7.7/1,000; US first-graders 1.1–5.0%. <sup class="c" data-ref="Lange2017JAMAPediatr,May2018JAMA" title="Source 272,320">272,320</sup>`},
   {lo:1.46,hi:1.46,lab:'14.6 per 10,000',k:'Popova 2017 · FAS',t:'FAS, the most severe form',txt:`The global prevalence of fetal alcohol syndrome was estimated at 14.6 per 10,000; about one in every 67 women who drank during pregnancy would have a child with FAS, about 119,000 children a year worldwide. <sup class="c" data-ref="Popova2017LancetGH" title="Source 367">367</sup>`,pt:`The full syndrome is much rarer than the wider spectrum: about 1.5 in every 1,000 people.`}];
  let pv=0,pFrom=0,pK=1,pStop=null;
  function drawP(){const N=vb(ps,'720 300','400 520');
    const cols=N?25:50,rows=1000/cols,gap=N?14.4:13.4,r=N?4.6:4.4,x0=N?20:22,y0=N?60:52;
    const cur=PV[pv],prev=PV[pFrom],lo=lerp(prev.lo,cur.lo,pK),hi=lerp(prev.hi,cur.hi,pK);
    let s=`<text x="${x0}" y="${N?22:22}" class="t-sm">1,000 CHILDREN</text><text x="${x0}" y="${N?44:40}" style="font:800 ${N?18:20}px var(--display);fill:var(--accent)">${cur.lab}</text>`;
    for(let i=0;i<1000;i++){const c=i%cols,rw=Math.floor(i/cols),x=x0+c*gap+gap/2,y=y0+rw*gap+gap/2,solid=i<Math.round(lo),range=!solid&&i<Math.round(hi);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${solid?'var(--accent)':range?'var(--ember)':'var(--panel-2)'};opacity:${range?.4:1}"/>`}
    ps.innerHTML=s;pn.innerHTML=noteHTML(cur)}
  function setP(m){if(m===pv)return;if(pStop)pStop();pFrom=pv;pv=m;pK=0;PB.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pgp===m));pStop=animate(600,p=>{pK=ease(p);drawP()},()=>{pStop=null;pK=1;drawP()})}
  PB.forEach(b=>b.addEventListener('click',()=>setP(+b.dataset.pgp)));
  const prevR=redraws.pregnancy;redraws.pregnancy=()=>{prevR&&prevR();drawP()};
  drawP();
};
/* =============== 5.5 Nursing care in hospital =============== */
/* One illustrative 72-hour admission. The CIWA-Ar line is drawn (knots below), not measured;
   intervals, bands and windows are the published ones, cited in the notes. */
const NU_H=72;
const NU_CIWA=[[0,5],[4,7],[8,11],[12,14],[18,16],[22,14],[26,11],[29,9],[34,7],[42,5],[54,3.5],[72,2]];
function nuPL(k,x){if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]}
/* checks: every 2 h while scores are moderate or medicine is given (ASAM: 1-4 h for 24 h), every 4 h until
   the score has been < 10 for 24 h, then every 6 h (ASAM: 4-8 h) */
const NU_CHECKS=(()=>{const c=[];for(let h=0;h<=28;h+=2)c.push(h);for(let h=32;h<=52;h+=4)c.push(h);for(let h=58;h<=70;h+=6)c.push(h);return c})();
/* symptom-triggered doses: ASAM's sample regimen gives a dose "when CIWA-Ar >= 10", no more often than every 4 h here */
const NU_DOSES=(()=>{const d=[];let last=-9;NU_CHECKS.forEach(h=>{if(nuPL(NU_CIWA,h)>=10&&h-last>=4){d.push(h);last=h}});return d})();
const NU_LIST=[
 [0.5,'AUDIT-C + PAWSS screen'],
 [1,'CIWA-Ar, vitals, mood'],
 [2,'Thiamine (+ glucose, any order)'],
 [3,'Bloods: Mg, K, phosphate'],
 [4,'Falls & seizure precautions'],
 [36,'CAM delirium screen'],
 [48,'Addiction consult, AUD medicine'],
 [68,'Discharge: follow-up linked']];
const NU_STEPS=[
 {from:0,at:.5/NU_H,k:'Hour 0 · admission',t:'Screening on admission',
  txt:`In a UK meta-analysis, 19.76% of inpatients had harmful alcohol use and 10.25% alcohol dependence (GRADE: very low quality). <sup class="c" data-ref="Roberts2019" title="Source 394">394</sup> The three AUDIT-C consumption questions detected heavy drinking with an AUROC of 0.891 in their first validation. <sup class="c" data-ref="Bush1998AUDITC" title="Source 53">53</sup> The 10-item <b>PAWSS</b> then estimates who is at risk of <i>complicated</i> withdrawal: at a cut-off of 4 it had a sensitivity of 93.1% and a specificity of 99.5% in 403 medical and surgical inpatients, and ASAM 2020 says it "can be used for predicting risk" in the medically ill. <sup class="c" data-ref="Maldonado2015,ASAM2020Withdrawal" title="Source 20,308">20,308</sup> A Cochrane review notes that simply asking about drinking "may also have a positive impact". <sup class="c" data-ref="McQueen2011" title="Source 327">327</sup> These are teaching tools here, not self-tests: see <a href="#screening" data-go="screening">AUDIT and AUDIT-C</a>.`,
  pt:`Being asked about drinking is a normal part of hospital care. The answers help the team keep you safe if withdrawal starts.`,
  hook:`PAWSS predicts (before symptoms; a score of 4 or more flags high risk). CIWA-Ar measures (once withdrawal has started). <sup class="c" data-ref="Maldonado2015,Sullivan1989CIWA" title="Source 308,447">308,447</sup>`},
 {from:1.5/NU_H,at:2.5/NU_H,k:'Hours 1–4 · first hours',t:'Thiamine, glucose and the first bloods',
  txt:`ASAM 2020 states that thiamine "should be provided to prevent Wernicke encephalopathy", IV or IM for people with poor nutrition or severe complications: "Typical dosing is 100 mg IV/IM per day for 3–5 days" (quoted as published, not an instruction). On glucose, ASAM says the two "can be administered thiamine and glucose in any order or concurrently", so glucose is not delayed. That differs from the older teaching, still in the EFNS 2010 guideline, of thiamine before any carbohydrate. <sup class="c" data-ref="ASAM2020Withdrawal,Galvin2010EFNS,Sechi2007" title="Source 20,134,424">20,134,424</sup> ASAM gives magnesium for hypomagnesaemia, arrhythmias, electrolyte disturbances or past withdrawal seizures, and phosphorus below 1 mg/dL. Low potassium in AUD often comes with low magnesium. <sup class="c" data-ref="ASAM2020Withdrawal,Elisaf2002" title="Source 20,100">20,100</sup>`,
  pt:`Vitamin B1 (thiamine) protects the brain in people who drink heavily. A low blood sugar is treated straight away.`,
  hook:`Old rule: "thiamine before glucose". ASAM 2020: any order or together; never delay glucose. EFNS 2010 still says thiamine first: a real guideline difference.`},
 {from:5/NU_H,at:14/NU_H,k:'Hours 4–28 · active withdrawal',t:'CIWA-Ar every 1–4 hours',
  txt:`The CIWA-Ar has 10 items (nine scored 0–7, one 0–4; maximum 67). <sup class="c" data-ref="Sullivan1989CIWA,Mirijello2015" title="Source 332,447">332,447</sup> For moderate to severe withdrawal or anyone on medicine, ASAM 2020 says "re-assess every 1–4 hours for 24 hours, as clinically indicated"; its example bands are mild &lt;10, moderate 10–18 and severe ≥19. Symptom-triggered dosing is "the preferred benzodiazepine dosing method" in hospital; in ASAM's sample regimen a dose follows "when CIWA-Ar ≥ 10". Watch for over-sedation and respiratory depression. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> In a double-blind RCT (n = 101), symptom-triggered chlordiazepoxide cut median treatment from 68 h to 9 h and total dose from 425 mg to 100 mg, with no difference in severity, seizures or delirium tremens. <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup> The score is not a diagnosis: fever, some medicines and communication problems can raise it. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`Nurses check the shakes, sweating, anxiety and other signs often, every 1 to 4 hours at first, and give medicine when the score calls for it.`,
  hook:`Saitz 1994: symptom-triggered vs fixed schedule, 9 h vs 68 h and 100 mg vs 425 mg, with no rise in seizures or DTs. <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>`},
 {from:18/NU_H,at:24/NU_H,k:'Hours 8–48 · seizure window',t:'Seizure and fall precautions',
  txt:`ASAM 2020: withdrawal seizures may begin as early as 8 h after the last drink, can continue for up to 48 h and peak at about 24 h; hallucinations develop within 12–24 h and usually resolve within 24–48 h unless delirium appears. A second seizure "generally happens within 6 hours of the first". After a seizure ASAM says to "re-assess every 1-2 hours for 6–24 hours". Supportive care includes safety protocols, "e.g., assess risk for fall/syncope". <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup> People with mild, low-risk withdrawal "may be observed for up to 36 hours, after which more severe withdrawal is unlikely to develop". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`,
  pt:`The first two days carry the highest seizure risk. This is why stopping heavy daily drinking should happen with medical help.`,
  hook:`Seizures: from 8 h, peak about 24 h, up to 48 h (ASAM 2020). A second one usually comes within 6 h of the first. <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>`},
 {from:32/NU_H,at:44/NU_H,k:'Hours 36–72 · delirium watch',t:'Screening for delirium (CAM)',
  txt:`The Confusion Assessment Method takes under 5 minutes: (1) acute onset and fluctuating course and (2) inattention, plus (3) disorganised thinking or (4) altered consciousness. <sup class="c" data-ref="Inouye1990" title="Source 193">193</sup> ASAM does not recommend CIWA-Ar in delirium, because it relies on what the patient reports. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> When delirium tremens begins differs between sources: 48–72 h after the last drink in Mirijello's stage table, 72–96 h in ASAM's initial-assessment section (shaded on the strip). <sup class="c" data-ref="Mirijello2015,ASAM2020Withdrawal" title="Source 20,332">20,332</sup> Non-drug care as published: frequent reassurance, re-orientation, "an evenly lit, quiet room". Restraints only "when required to prevent injuries". <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> Confusion can also be Wernicke encephalopathy: see <a href="#wernicke" data-go="wernicke">module 3.4</a>.`,
  pt:`New confusion that comes and goes is a warning sign. A calm, quiet, evenly lit room and simple reminders of the day and place help.`,
  hook:`CAM = 1 + 2 + (3 or 4). DT onset: 48–72 h (Mirijello 2015) vs 72–96 h (ASAM 2020). <sup class="c" data-ref="Inouye1990,Mirijello2015,ASAM2020Withdrawal" title="Source 20,193,332">20,193,332</sup>`},
 {from:50/NU_H,at:66/NU_H,k:'Hours 48–72 · before discharge',t:'Starting treatment and linking onward',
  txt:`ASAM 2020: "When feasible, alcohol use disorder (AUD) treatment should be initiated concurrently with alcohol withdrawal management as cognitive status permits", with medicine offered or a link to services and recovery support. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup> After a discharge-planning protocol in San Francisco, AUD medicine at discharge rose from 0% to 64% and 30-day readmission fell from 23.4% to 8.2% (before-and-after design). <sup class="c" data-ref="Wei2015" title="Source 493">493</sup> Yet in 12 hospitals only 19.8% of withdrawal admissions started medicine. <sup class="c" data-ref="Bernstein2026" title="Source 37">37</sup> For injectable naltrexone the label states people "should be opioid-free before starting VIVITROL" (7–10 days) and warns of a "potentially fatal overdose" risk from lost opioid tolerance. <sup class="c" data-ref="FDA-Vivitrol" title="Source 123">123</sup> See <a href="#medicines" data-go="medicines">Approved medicines</a>.`,
  pt:`Hospital is a good place to start treatment. Leaving with a medicine and a follow-up plan was linked to fewer trips back to hospital.`,
  hook:`Wei 2015: AUD medicine 0% → 64%; 30-day readmission 23.4% → 8.2%. Naltrexone needs 7–10 opioid-free days first. <sup class="c" data-ref="Wei2015,FDA-Vivitrol" title="Source 123,493">123,493</sup>`}
];
const NU_Q=[
 {s:`On admission, a woman says she drinks heavily every day. She has no symptoms yet (CIWA-Ar 4) and her PAWSS score is 5. Which statement fits the published tools?`,
  o:[`A low CIWA-Ar means withdrawal monitoring can stop`,`PAWSS ≥4 flags high risk of complicated withdrawal, so closer monitoring is planned`,`PAWSS is a diagnostic test for alcohol use disorder`,`She should be discharged to stop drinking at home`],a:1,
  e:`PAWSS predicts risk before symptoms appear; at a cut-off of 4 it had 93.1% sensitivity and 99.5% specificity in medically ill inpatients. CIWA-Ar measures withdrawal once it has started, so a low early score does not rule out later severe withdrawal. <sup class="c" data-ref="Maldonado2015,ASAM2020Withdrawal" title="Source 20,308">20,308</sup>`},
 {s:`At 36 hours a man has a coarse tremor and says he sees insects on the wall. He knows where he is and what day it is. CIWA-Ar is 17. What do the published guidelines support?`,
  o:[`Restrain him to prevent a fall`,`Reassess with CIWA-Ar every 1–4 hours and give symptom-triggered medicine per protocol`,`Stop all monitoring: hallucinations always resolve`,`Record it as delirium tremens`],a:1,
  e:`17 is in ASAM's moderate band (10–18). Hallucinations usually develop within 12–24 h and resolve within 24–48 h unless delirium appears; he is oriented, so this is not delirium. ASAM prefers symptom-triggered dosing and reassessment every 1–4 h. Restraints are only for preventing injury. <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>`},
 {s:`At hour 20 a patient has a witnessed generalised seizure and is now drowsy but breathing. Which plan matches ASAM 2020?`,
  o:[`Return to 4–8-hourly checks once awake`,`Start long-term phenytoin`,`Close monitoring, reassessing every 1–2 hours for 6–24 hours, and watch for delirium`,`Discharge once fully awake`],a:2,
  e:`ASAM: after a withdrawal seizure, admit where close monitoring is available and "re-assess every 1-2 hours for 6–24 hours", watching for delirium and the need for IV fluids. Phenytoin should not be used unless there is a separate seizure disorder. A second seizure generally comes within 6 hours of the first. <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>`},
 {s:`A patient's blood glucose is low. Thiamine has not been given yet. What does ASAM 2020 say?`,
  o:[`Withhold glucose until thiamine has been given`,`Give thiamine and glucose in any order or together, without delaying glucose`,`Thiamine is only needed if the patient is confused`,`Give oral sugar and skip thiamine`],a:1,
  e:`ASAM 2020: thiamine and glucose "in any order or concurrently"; glucose should not be delayed. A review of 19 papers found no evidence above case-report level for the older "thiamine first" rule, which EFNS 2010 still recommends. <sup class="c" data-ref="ASAM2020Withdrawal,Schabelman2012,Galvin2010EFNS" title="Source 20,134,415">20,134,415</sup>`},
 {s:`On day 3 a patient becomes newly confused: attention drifts, it fluctuates over hours and his thinking is disorganised. What fits the guidance?`,
  o:[`Rely on CIWA-Ar to track it`,`Assess with a delirium tool such as CAM, increase observation, and consider causes including Wernicke encephalopathy`,`Assume it is normal at day 3`,`Apply restraints first`],a:1,
  e:`CAM: acute fluctuating course plus inattention plus disorganised thinking. ASAM does not recommend CIWA-Ar in delirium and asks for close observation, often in ICU. Caine criteria for Wernicke need 2 of 4 signs, one of them an altered mental state. <sup class="c" data-ref="Inouye1990,ASAM2020Withdrawal,Caine1997" title="Source 20,54,193">20,54,193</sup>`},
 {s:`Before discharge a patient wants to start injectable naltrexone. He has been taking oxycodone for a fracture. What does the label say?`,
  o:[`Start it today; opioids do not matter`,`He should be opioid-free for 7–10 days first, and lost tolerance raises overdose risk later`,`AUD medicine cannot be started in hospital`,`Naltrexone treats opioid pain`],a:1,
  e:`The Vivitrol label: patients "should be opioid-free before starting VIVITROL" (a minimum of 7–10 days) to avoid severe precipitated withdrawal, and afterwards are "vulnerable to potentially fatal overdose". ASAM supports starting AUD treatment in hospital when feasible, so another medicine or a planned start may be discussed. <sup class="c" data-ref="FDA-Vivitrol,ASAM2020Withdrawal" title="Source 20,123">20,123</sup>`}
];
const NU_LINK={
 wei:{t:'Discharge-planning protocol',cap:`San Francisco General Hospital, before and after a resident-led protocol for patients admitted with alcohol dependence. Before-and-after design: other changes over time could explain part of it. <sup class="c" data-ref="Wei2015" title="Source 493">493</sup>`,
  bars:[{l:'AUD medicine at discharge',a:0,b:64,la:'before',lb:'after'},{l:'30-day readmission',a:23.4,b:8.2,la:'before',lb:'after'},{l:'30-day ED visit',a:18.8,b:6.1,la:'before',lb:'after',ns:'p = 0.056'}],
  note:{k:'Wei 2015 · pre-post',t:'Medicine before discharge',txt:`AUD medicine rose from 0% to 64% (p &lt; 0.001); all-cause 30-day readmission fell from 23.4% to 8.2% (p = 0.042); ED visits fell from 18.8% to 6.1% (p = 0.056, not significant). In a separate quasi-experimental study of 399 inpatients, an addiction consult team gave +12.7 vs +5.6 days of abstinence at 30 days. <sup class="c" data-ref="Wei2015,Wakeman2017" title="Source 486,493">486,493</sup>`,pt:`When the hospital started medicine and booked follow-up, fewer people came back within a month.`,hook:`Wei 2015: readmission 23.4% → 8.2%.`}},
 lam:{t:'Addiction consultation',cap:`19,697 admissions for substance use disorder, 2019–2023. Observational: people who saw the consult team may differ in other ways. <sup class="c" data-ref="Lambert2025" title="Source 271">271</sup>`,
  bars:[{l:'AUD medicine during the stay',a:6.0,b:33.4,la:'no consult',lb:'consult'}],
  extra:[`Discharge prescription for AUD medicine: RR 9.48 (95% CI 8.05–11.16)`,`30-day readmission with a consult: aRR 0.82 (0.75–0.89)`,`Newly started AUD medicine: aRR 0.78 for readmission`],
  note:{k:'Lambert 2025 · retrospective',t:'A consult team changes prescribing',txt:`With an addiction consultation, 33.4% received AUD medicine during the stay against 6.0% without, and the discharge prescription rate was 9.48 times higher. Consultation was associated with lower 30-day readmission (aRR 0.82); for AUD, discharge medicine (aRR 0.84) and newly started medicine (aRR 0.78) were too. <sup class="c" data-ref="Lambert2025" title="Source 271">271</sup>`,pt:`A specialist team on the ward made it far more likely that people left with treatment.`,hook:`Consult → AUD medicine in hospital 33.4% vs 6.0%.`}},
 gap:{t:'How often medicine is started',cap:`Three recent US studies. The range across 12 hospitals was 5.1–43.2%. <sup class="c" data-ref="Anderson2026,Bernstein2026,Lebin2026" title="Source 10,37,278">10,37,278</sup>`,
  bars:[{l:'VA AUD hospitalisations (2022–23)',b:30.8,lb:'started ≤7 days'},{l:'12 hospitals, withdrawal stays',b:19.8,lb:'started',rng:[5.1,43.2]},{l:'ED, age ≥55, AUDIT-C positive',b:3,lb:'medicine prescribed'}],
  note:{k:'Anderson 2026 · Bernstein 2026 · Lebin 2026',t:'The treatment gap',txt:`In 29,041 VA hospitalisations for AUD, medicine was started in hospital or within 7 days in 30.8% (naltrexone 57.9% of starts, acamprosate 16.5%, injectable naltrexone 13.9%); age ≥65, frailty and ICU stays made starting less likely, an addiction consult more likely. Across 12 hospitals, 19.8% of withdrawal stays started medicine (5.1–43.2%). In emergency departments, older adults screening positive were prescribed AUD medicine in only 3% of encounters. <sup class="c" data-ref="Anderson2026,Bernstein2026,Lebin2026" title="Source 10,37,278">10,37,278</sup>`,pt:`Most people admitted with alcohol problems still leave hospital without a medicine for AUD.`,hook:`Starting AUD medicine varies 5–43% between hospitals. <sup class="c" data-ref="Bernstein2026" title="Source 37">37</sup>`}}
};
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560'),h=t*NU_H,sc=nuPL(NU_CIWA,h);
    const L=N?{sx:10,sy:20,lx:206,ly:34,lw:186,x0:44,x1:388,c0:252,c1:392,iv:240,dz:410,rk:428,rh:18,ax:498,axl:532,ft:552}
             :{sx:16,sy:22,lx:20,ly:196,lw:206,x0:262,x1:704,c0:44,c1:206,iv:34,dz:222,rk:240,rh:20,ax:318,axl:348,ft:372};
    const X=v=>lerp(L.x0,L.x1,v/NU_H),Y=v=>lerp(L.c1,L.c0,v/25);
    let s=`<defs>${marker('nuA','var(--muted)')}</defs>`;
    /* ---- ward scene ---- */
    const bx=L.sx+(N?60:70),by=L.sy+(N?120:118);
    s+=`<text x="${L.sx}" y="${L.sy}" class="t-sm" style="fill:var(--brand)">${N?'THE WARD':'THE WARD · BAY 4'}</text>`;
    s+=`<text x="${L.sx+(N?180:204)}" y="${L.sy}" class="t-big t-end" style="font-size:15px">Hour ${Math.floor(h)}</text>`;
    /* nurse station */
    s+=`<rect x="${L.sx}" y="${by-34}" width="34" height="34" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${L.sx+17}" y="${by+12}" class="t-xs t-mid">station</text>`;
    /* bed and patient */
    s+=`<rect x="${bx}" y="${by-8}" width="${N?112:124}" height="12" rx="4" style="fill:var(--panel-2);stroke:var(--brain-line)"/><rect x="${bx+(N?96:108)}" y="${by-40}" width="8" height="44" rx="3" style="fill:var(--panel-2);stroke:var(--brain-line)"/><line x1="${bx+6}" y1="${by+4}" x2="${bx+6}" y2="${by+14}" style="stroke:var(--brain-line);stroke-width:2"/><line x1="${bx+(N?106:118)}" y1="${by+4}" x2="${bx+(N?106:118)}" y2="${by+14}" style="stroke:var(--brain-line);stroke-width:2"/>`;
    const px=bx+(N?64:72),py=by-62,ps=56,trem=clamp((sc-5)/11),sw=clamp((sc-8)/8);
    s+=person(px,py,ps,'var(--muted)')+symptoms(px,py,ps,{tremor:trem,sweat:sw});
    /* drip with thiamine from hour 2, while it runs */
    if(h>=2){const dx=bx+(N?20:24),on=h<2+20;s+=`<line x1="${dx}" y1="${py-14}" x2="${dx}" y2="${by-8}" style="stroke:var(--brain-line);stroke-width:1.4"/><rect x="${dx-9}" y="${py-14}" width="18" height="24" rx="4" style="fill:${on?'var(--thi-soft)':'var(--panel)'};stroke:var(--thi)"/><text x="${dx}" y="${py+2}" class="t-xs t-mid" style="fill:var(--thi)">B1</text>`;
      if(on)s+=`<path d="M${dx} ${py+12}Q${dx+16} ${py+30} ${px-8} ${py+34}" style="fill:none;stroke:var(--thi-fill);stroke-width:1.2;stroke-dasharray:2 3"/>`}
    /* nurse: at the bedside within 0.6 h of a check, otherwise at the station */
    let near=0;NU_CHECKS.forEach(c=>{const d=h-c;if(d>=-.6&&d<=.9)near=Math.max(near,d<0?1-(-d/.6):d<.5?1:1-(d-.5)/.4)});
    const nx=lerp(L.sx+17,bx-8,ease(clamp(near))),ny=by-58;
    s+=person(nx,ny,54,'var(--rx)');
    if(near>.8){s+=`<rect x="${nx-30}" y="${ny-20}" width="60" height="15" rx="7.5" style="fill:var(--panel);stroke:var(--rx)"/><text x="${nx}" y="${ny-9}" class="t-xs t-mid" style="fill:var(--rx)">CIWA ${Math.round(sc)}</text>`}
    /* room light: calm, evenly lit (V.5) once withdrawal is moderate */
    s+=`<text x="${L.sx}" y="${by+30}" class="t-xs">${sc>=10?'quiet, evenly lit room':h>=34?'reorient: day, place, plan':'routine observations'}</text>`;
    /* ---- checklist ---- */
    s+=`<text x="${L.lx}" y="${L.ly-10}" class="t-sm">CHECKLIST</text>`;
    let curI=-1;NU_LIST.forEach((it,i)=>{if(h>=it[0])curI=i});
    NU_LIST.forEach((it,i)=>{const y=L.ly+i*21,done=h>=it[0],cur=i===curI&&h-it[0]<(i<5?2:8);
      if(cur)s+=`<rect x="${L.lx-4}" y="${y-2}" width="${L.lw}" height="19" rx="5" style="fill:var(--brand-soft)"/>`;
      s+=`<rect x="${L.lx}" y="${y+1}" width="13" height="13" rx="3" style="fill:${done?'var(--good)':'var(--panel)'};stroke:${done?'var(--good)':'var(--line)'};stroke-width:1.4"/>`;
      if(done)s+=`<path d="M${L.lx+3} ${y+7.5}l3 3l5 -6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>`;
      s+=`<text x="${L.lx+19}" y="${y+11}" class="t-xs" style="fill:${done?'var(--ink)':'var(--muted)'}">${it[1]}</text>`});
    /* ---- CIWA-Ar chart ---- */
    const bands=[[0,10,'var(--good)','mild <10'],[10,19,'var(--warn)','moderate 10–18'],[19,25,'var(--bad)','severe ≥19']];
    bands.forEach(b=>{s+=`<rect x="${L.x0}" y="${f1(Y(b[1]))}" width="${L.x1-L.x0}" height="${f1(Y(b[0])-Y(b[1]))}" style="fill:${b[2]};opacity:.09"/><text x="${L.x1-4}" y="${f1(Y(b[1])+11)}" class="t-xs t-end" style="fill:${b[2]}">${b[3]}</text>`});
    [0,10,19,25].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<text x="${L.x0}" y="${L.c0-(N?24:20)}" class="t-sm" style="fill:var(--accent)">${N?'CIWA-Ar (illustrative) · ASAM bands':'CIWA-Ar SCORE (illustrative) · ASAM 2020 example bands'}</text>`;
    /* interval brackets */
    const IV=[[0,28,N?'every 1–4 h (here 2-hourly)':'re-assess every 1–4 h (here 2-hourly)'],[28,52,N?'<10: keep 1–4 h for 24 h':'score <10: keep 1–4 h until 24 h stable'],[52,72,N?'4–8 h':'then every 4–8 h']];
    IV.forEach(([a,b,l],i)=>{if(h<a)return;const xb=X(Math.min(b,h));s+=`<path d="M${f1(X(a)+1)} ${L.iv+4}V${L.iv}H${f1(xb-1)}V${L.iv+4}" style="fill:none;stroke:var(--rx);stroke-width:1.2"/>`;
      if(h>=a+(i?6:4))s+=`<text x="${f1(X(a)+3)}" y="${L.iv-3}" class="t-xs" style="fill:var(--rx)">${l}</text>`});
    /* the line up to now */
    s+=`<path d="${pathFn(u=>nuPL(NU_CIWA,u*h)/25,L.x0,X(h),L.c1,L.c0,Math.max(4,Math.round(h*2)))}" style="fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round"/>`;
    NU_CHECKS.forEach(c=>{if(c>h)return;const v=nuPL(NU_CIWA,c);s+=`<circle cx="${f1(X(c))}" cy="${f1(Y(v))}" r="3.4" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`});
    s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(sc))}" r="5" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
    /* doses row */
    s+=`<text x="${L.x0-5}" y="${L.dz+4}" class="t-xs t-end">dose</text>`;
    NU_DOSES.forEach(d=>{if(d<=h)s+=pill(X(d),L.dz,14,{ang:-20,col:'var(--rx)'})});
    if(h>=8)s+=`<text x="${f1(X(NU_DOSES[NU_DOSES.length-1])+12)}" y="${L.dz+4}" class="t-xs">${N?'symptom-triggered, when ≥10':'symptom-triggered: a dose when CIWA-Ar ≥10 (ASAM sample)'}</text>`;
    /* risk windows (hours after the last drink) */
    const RK=[{a:8,b:48,pk:24,l:'seizures 8–48 h, peak ~24 h',c:'var(--bad)',src:'ASAM'},{a:12,b:48,b0:24,l:'hallucinations 12–24 h, settle by 24–48 h',c:'var(--dx)'},{a:48,b:72,l:N?'DT 48–72 h (Mirijello)':'delirium tremens 48–72 h (Mirijello)',c:'var(--accent)',more:N?'ASAM: 72–96 →':'72–96 h in ASAM →'}];
    RK.forEach((r,i)=>{const y=L.rk+i*L.rh,on=h>=r.a,x0=X(r.a),x1=X(r.b),act=h>=r.a&&h<=(r.b0||r.b);
      if(r.b0){s+=`<rect x="${f1(x0)}" y="${y}" width="${f1(X(r.b0)-x0)}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.32:.1}"/><rect x="${f1(X(r.b0))}" y="${y}" width="${f1(x1-X(r.b0))}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.12:.05}"/>`}
      else s+=`<rect x="${f1(x0)}" y="${y}" width="${f1(x1-x0)}" height="${L.rh-5}" rx="4" style="fill:${r.c};opacity:${on?.28:.1}"/>`;
      if(r.pk)s+=`<line x1="${f1(X(r.pk))}" x2="${f1(X(r.pk))}" y1="${y}" y2="${y+L.rh-5}" style="stroke:${r.c};stroke-width:2"/>`;
      s+=`<text x="${f1(r.more?x0-4:x0+4)}" y="${y+L.rh-9}" class="t-xs${r.more?' t-end':''}" style="fill:${act?'var(--ink)':'var(--muted)'};font-weight:${act?700:500}">${r.l}</text>`;
      if(r.more)s+=`<text x="${f1(x0+4)}" y="${y+L.rh-9}" class="t-xs" style="fill:var(--accent)">${r.more}</text>`});
    /* axis and playhead */
    const tl=tline(L.x0,L.ax,L.x1-L.x0,{min:0,max:72,step:12,fmt:v=>v});s+=tl.svg;
    s+=`<text x="${L.x1}" y="${L.axl}" class="t-xs t-end">${N?'hours (last drink at hour 0)':'hours since admission (last drink assumed at hour 0)'}</text>`;
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${L.c0-6}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    s+=`<text x="${N?L.x0-34:L.lx}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative admission, not a protocol</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(NU_STEPS,t);setSt(ph);
    const nC=NU_CHECKS.filter(c=>c<=h).length,nD=NU_DOSES.filter(d=>d<=h).length,band=sc<10?'mild (<10)':sc<19?'moderate (10–18)':'severe (≥19)';
    $('#nuRead').innerHTML=`<span>hour <b>${f1(h)}</b></span><span>CIWA-Ar <b>${Math.round(sc)}</b> · ${band}</span><span>checks so far <b>${nC}</b></span><span>symptom-triggered doses <b>${nD}</b></span><span>checklist <b>${NU_LIST.filter(i=>h>=i[0]).length}/${NU_LIST.length}</b></span>`;
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[ph]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,24000,'Replay','nursing');
  setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- priority questions ---- */
  const qz=$('#nuQuiz'),first={};
  function score(){const n=Object.keys(first).length,r=Object.values(first).filter(Boolean).length;$('#nuScore').innerHTML=`<span>answered <b>${n}/${NU_Q.length}</b></span><span>right first time <b>${r}</b></span>`}
  function build(){qz.innerHTML=NU_Q.map((q,i)=>`<div class="card nu-q" data-q="${i}"><span class="kicker">Question ${i+1} of ${NU_Q.length}</span><p class="scen">${q.s}</p><div class="opts">${q.o.map((o,j)=>`<button class="opt" data-nuo="${i}:${j}" aria-pressed="false"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div class="expl" hidden></div></div>`).join('');score()}
  qz.addEventListener('click',e=>{const b=e.target.closest('[data-nuo]');if(!b)return;const [i,j]=b.dataset.nuo.split(':').map(Number),q=NU_Q[i],card=b.closest('.nu-q');
    if(!(i in first))first[i]=j===q.a;
    $$('[data-nuo]',card).forEach((x,k)=>{x.setAttribute('aria-pressed',k===j);x.classList.toggle('right',k===q.a);x.classList.toggle('wrong',k===j&&j!==q.a)});
    const ex=$('.expl',card);ex.hidden=false;ex.innerHTML=`<b>${j===q.a?'Right.':'Not quite: the best answer is '+'ABCD'[q.a]+'.'}</b> ${q.e}`;score()});
  $('#nuReset').addEventListener('click',()=>{Object.keys(first).forEach(k=>delete first[k]);build()});
  build();

  /* ---- starting treatment chart ---- */
  const ls=$('#nuLink');let view='wei',cancel=null;
  function drawL(p){const N=vb(ls,'720 300','400 440'),V=NU_LINK[view];let s='';
    const x0=N?20:250,x1=N?380:700,W=x1-x0,P=v=>x0+W*v/100;
    s+=`<text x="${N?20:20}" y="24" class="t-sm" style="fill:var(--brand)">${V.t.toUpperCase()}</text>`;
    if(!N)[0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(P(v))}" x2="${f1(P(v))}" y1="40" y2="${40+V.bars.length*72}" class="grid"/><text x="${f1(P(v))}" y="${52+V.bars.length*72}" class="t-xs t-mid">${v}%</text>`);
    V.bars.forEach((b,i)=>{const y=N?54+i*96:50+i*72,lab=N?y:y+20;
      s+=`<text x="${N?20:20}" y="${N?y-6:lab}" class="t-lbl"${N?'':' style="font-size:12.5px"'}>${b.l}</text>`;
      const by=N?y+4:y+4,rows=b.a!=null?[[b.a,b.la,'var(--muted)'],[b.b,b.lb,'var(--rx)']]:[[b.b,b.lb,'var(--rx)']];
      rows.forEach(([v,lab2,c],k)=>{const yy=by+k*24,w=W*v/100*ease(p);
        s+=`<rect x="${x0}" y="${yy}" width="${f1(Math.max(1.5,w))}" height="16" rx="4" style="fill:${c};opacity:${k||rows.length===1?.85:.45}"/>`;
        s+=`<text x="${f1(x0+Math.max(1.5,w)+6)}" y="${yy+12}" class="t-xs" style="fill:var(--ink)">${lab2} ${(v*p).toFixed(v%1?1:0)}%</text>`});
      if(b.rng){const yy=by+8;s+=`<line x1="${f1(P(b.rng[0]))}" x2="${f1(P(b.rng[1]))}" y1="${yy}" y2="${yy}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/><line x1="${f1(P(b.rng[0]))}" x2="${f1(P(b.rng[0]))}" y1="${yy-5}" y2="${yy+5}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/><line x1="${f1(P(b.rng[1]))}" x2="${f1(P(b.rng[1]))}" y1="${yy-5}" y2="${yy+5}" style="stroke:var(--ink);stroke-width:1.4;opacity:${p}"/>`;
        if(p>.9)s+=`<text x="${f1(P(b.rng[1])+6)}" y="${yy-6}" class="t-xs">range ${b.rng[0]}–${b.rng[1]}% by hospital</text>`}
      if(b.ns&&p>.9)s+=`<text x="${x1}" y="${N?y-6:lab}" class="t-xs t-end" style="fill:var(--warn)">${b.ns}, not significant</text>`});
    if(V.extra){const y0=(N?54:50)+V.bars.length*(N?96:72)+(N?6:22);V.extra.forEach((e,i)=>{s+=`<text x="20" y="${y0+i*20}" class="t-xs" style="fill:var(--ink);opacity:${f1(clamp(p*1.4-i*.2))}">• ${e}</text>`})}
    ls.innerHTML=s;$('#nuLinkCap').innerHTML=V.cap;$('#nuLinkNote').innerHTML=noteHTML(V.note)}
  function showL(){if(cancel)cancel();cancel=animate(700,drawL,()=>{cancel=null})}
  $$('[data-nul]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.nul;$$('[data-nul]').forEach(x=>x.setAttribute('aria-pressed',x===b));showL()}));
  drawL(1);
  const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawL(1)};
};
/* =============== 5.6 Research frontier: GLP-1, psilocybin and beyond =============== */
/* Pipeline board: each card sits at the highest stage its evidence has reached by the year on the
   slider. Event years are publication or registry dates from the research pass; card text is short,
   the cited detail is in the note panel. */
const FR_Y0=2013,FR_Y1=2026.9,frY=y=>(y-FR_Y0)/(FR_Y1-FR_Y0);
const FR_ST=['Lab & animal','Observational','Phase 2 RCTs','Phase 3','Approved for AUD'],FR_STN=['Lab','Obs.','Phase 2','Phase 3','Approved'];
const FR_IT=[
 {n:'GLP-1 receptor agonists',ev:'early',e:[
  {y:2022.7,st:2,c:'RCT n=127',m:'2022 exenatide RCT, n=127: heavy drinking days not reduced'},
  {y:2024.4,st:1,m:'2024 cohort of 83,825 with obesity: 50–56% fewer AUD diagnoses'},
  {y:2024.9,st:1,m:'2025 Sweden, 227,866 with AUD: semaglutide aHR 0.64'},
  {y:2025.1,st:2,c:'RCT n=48',m:'2025 semaglutide RCT, n=48, 9 weeks: less lab drinking'},
  {y:2026.25,st:2,c:'RCT n=108',m:'2026 RCT, n=108 with obesity: heavy drinking days −13.7 pts'},
  {y:2026.57,st:3,c:'ph 3 n≈622',m:'July 2026: VA phase 3 (n≈622) starts recruiting'}]},
 {n:'Psilocybin + therapy',ev:'early',e:[
  {y:2022.6,st:2,c:'RCT n=95',m:'2022 RCT, n=95: heavy drinking days 9.7% vs 23.6%'},
  {y:2026.2,st:2,c:'OLE n=59',m:'2026 open-label extension: the extra benefit faded after month 1'},
  {y:2026.45,st:2,c:'meta N=202',m:'2026 meta-analysis of 6 trials: evidence "mixed"'}]},
 {n:'Ketamine + therapy',ev:'early',e:[
  {y:2020,st:2,c:'pilot n=40',m:'2020 pilot RCT, n=40: more abstinence over 21 days'},
  {y:2022.05,st:2,c:'RCT n=96',m:'2022 KARE, n=96: +10.1% days abstinent at 6 months'}]},
 {n:'Deep TMS',ev:'early',e:[
  {y:2022.3,st:2,c:'RCT n=51',m:'2022 sham-controlled RCT, n=51: heavy drinking days 2.9% vs 10.6%'},
  {y:2025.4,st:2,c:'meta 20 RCTs',m:'2025 meta of 20 stimulation RCTs: small fall in craving'}]},
 {n:'Mifepristone',ev:'early',e:[
  {y:2015.5,st:0,c:'rats',m:'2015 dependent rats drank less'},
  {y:2015.65,st:2,c:'RCT n=56',m:'2015 RCT, n=56, 1 week: less craving and drinking'},
  {y:2023.5,st:2,c:'lab n=32',m:'2023 lab study, n=32: stress craving down, drinking unchanged'}]},
 {n:'OPRM1-guided naltrexone',ev:'hyp',stall:2015.3,e:[
  {y:2013,st:2,c:'secondary',m:'2008 COMBINE secondary analysis: an Asp40 signal'},
  {y:2015.3,st:2,c:'RCT n=221 ✕',m:'2015 genotype-stratified RCT, n=221: no interaction'},
  {y:2020.4,st:2,c:'meta 7 RCTs ✕',m:'2020 meta of 7 RCTs: not significant after correction'}]},
 {n:'Alcohol hepatitis drugs',ev:'early',e:[
  {y:2020.1,st:2,c:'open n=18',m:'2020 IL-22 agonist F-652, open-label, n=18 (no control)'},
  {y:2023.7,st:2,c:'ph 2b n=307',m:'2023 larsucosterol phase 2b, n=307: completed, no results posted'},
  {y:2026.08,st:3,c:'ph 3 n≈350',m:'Jan 2026: larsucosterol phase 3 recruiting (n≈350)'}]}
];
const FR_STEPS=[
 {from:0,at:frY(2013.6),k:'2013 · the starting line',t:'How to read the board',
  txt:`Treatments move from lab and animal work, through observational studies and small randomised trials (phase 2), to large confirmatory trials (phase 3) and, only then, approval. In 2013 one idea was already on the board: in COMBINE, people with an OPRM1 Asp40 allele who received medical management had fewer heavy drinking days on naltrexone than on placebo (P = .04), a secondary analysis. <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Anton2008OPRM1" title="Source 12">12</sup> GLP-1 receptor agonists are not approved for AUD in the US. <sup class="c" data-ref="Klausen2026Lancet,Wang2024" title="Source 247,490">247,490</sup>`,
  pt:`A treatment has to pass several kinds of study before it is shown to work. Being "under study" is not the same as working.`,
  hook:`Secondary (post hoc) analyses generate hypotheses; prospective trials test them.`},
 {from:frY(2015.2),at:frY(2015.8),k:'2015',t:'One signal fades, another appears',
  txt:`The prospective genotype-stratified RCT (n = 221, naltrexone 50 mg) found no genotype × treatment interaction (P = .32); the authors called using Asn40Asp as a biomarker "premature". A 2020 meta-analysis of seven RCTs found only a nominal effect on drinks per day that did not survive correction. <span class="ev hyp">Hypothesis; not supported</span> <sup class="c" data-ref="Oslin2015JAMAPsych,Hartwell2020" title="Source 168,353">168,353</sup> The same year, mifepristone (a glucocorticoid receptor antagonist) reduced drinking in dependent rats and, at 600 mg daily for 1 week, reduced cued craving and drinking in 56 people. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Vendruscolo2015" title="Source 477">477</sup>`,
  pt:`An early clue that a gene test could pick who benefits from naltrexone did not hold up in a proper trial.`,
  hook:`OPRM1 Asn40Asp: post hoc signal (COMBINE), negative prospective RCT (Oslin 2015). Not ready for clinical use. <sup class="c" data-ref="Anton2008OPRM1,Oslin2015JAMAPsych" title="Source 12,353">12,353</sup>`},
 {from:frY(2019.8),at:frY(2022.2),k:'2020–2022',t:'Ketamine, brain stimulation, a liver drug',
  txt:`A pilot RCT (n = 40) of one ketamine infusion during motivational enhancement therapy increased abstinence over 21 days compared with midazolam. In KARE (n = 96, severe AUD), three weekly ketamine infusions gave 10.1% more days abstinent at 6 months (95% CI 1.1–19.0), with no difference in relapse rate. <sup class="c" data-ref="Dakwar2020,Grabski2022" title="Source 74,145">74,145</sup> Deep TMS to medial prefrontal and anterior cingulate cortex (n = 51) cut heavy drinking days to 2.9% vs 10.6% with sham. <sup class="c" data-ref="Harel2022" title="Source 164">164</sup> For alcohol-associated hepatitis, the IL-22 agonist F-652 lowered MELD in an open-label study of 18 people with no control group. <sup class="c" data-ref="Arab2020" title="Source 17">17</sup> <span class="ev early">Early evidence</span>`,
  pt:`Small trials of ketamine and magnetic brain stimulation showed some benefit. They need bigger trials before anyone can say they work.`,
  hook:`KARE: ketamine +10.1% days abstinent at 6 months but no difference in relapse rate. <sup class="c" data-ref="Grabski2022" title="Source 145">145</sup>`},
 {from:frY(2022.5),at:frY(2023.8),k:'2022–2023',t:'Psilocybin, exenatide, larsucosterol',
  txt:`Psilocybin with psychotherapy vs active placebo (diphenhydramine), n = 95: heavy drinking days over 32 weeks were 9.7% vs 23.6% (mean difference 13.9%, 95% CI 3.0–24.7), with no serious adverse events on psilocybin. The trial excluded people with major psychiatric and drug use disorders, which limits how far it applies. <sup class="c" data-ref="Bogenschutz2022" title="Source 42">42</sup> Exenatide (n = 127, 26 weeks) did <i>not</i> reduce heavy drinking days, though it reduced ventral-striatal cue reactivity. <sup class="c" data-ref="Klausen2022Exenatide" title="Source 246">246</sup> Mifepristone reduced stress craving but not drinking in a lab study (N = 32). <sup class="c" data-ref="HaassKoffler2023" title="Source 155">155</sup> Larsucosterol's phase 2b trial (n = 307) completed in 2023 with no results posted. <sup class="c" data-ref="NCT04563026" title="Source 341">341</sup>`,
  pt:`One careful trial found people given psilocybin with therapy had fewer heavy drinking days. A similar-looking diabetes drug, exenatide, did not help in its trial.`,
  hook:`Bogenschutz 2022: heavy drinking days 9.7% vs 23.6% over 32 weeks; n = 95. <sup class="c" data-ref="Bogenschutz2022" title="Source 42">42</sup>`},
 {from:frY(2024.2),at:frY(2025.3),k:'2024–2025',t:'GLP-1: the observational signal',
  txt:`In electronic records of 83,825 people with obesity, semaglutide was associated with a 50–56% lower risk of new and recurrent AUD diagnoses over 12 months, replicated in 598,803 people with type 2 diabetes. In a Swedish within-person cohort of 227,866 people with AUD, periods on semaglutide (aHR 0.64) and liraglutide (aHR 0.72) had fewer AUD hospitalisations. <sup class="c" data-ref="Wang2024,Lahteenvuo2025" title="Source 269,490">269,490</sup> The first semaglutide RCT (n = 48, 9 weeks, low doses) reduced laboratory drinking and drinks per drinking day, but not drinking days. <sup class="c" data-ref="Hendershot2025Semaglutide" title="Source 176">176</sup> Observational data cannot rule out confounding. <span class="ev early">Early evidence</span>`,
  pt:`People who happened to be prescribed these weight-loss and diabetes medicines had fewer alcohol problems on record. That is a clue, not proof.`,
  hook:`Cohort associations (aHR 0.64) generate the question; only RCTs answer it. <sup class="c" data-ref="Lahteenvuo2025" title="Source 269">269</sup>`},
 {from:frY(2025.9),at:frY(2026.75),k:'2026',t:'A positive RCT, and phase 3 begins',
  txt:`Semaglutide 2.4 mg weekly for 26 weeks vs placebo (n = 108, moderate to severe AUD with obesity, plus CBT): heavy drinking days fell 41.1 vs 26.4 percentage points, a difference of −13.7 (95% CI −22.0 to −5.4), with more gastrointestinal side effects. <sup class="c" data-ref="Klausen2026Lancet" title="Source 247">247</sup> Oral semaglutide (n = 50) missed its craving endpoint but reduced heavy drinking days. <sup class="c" data-ref="Schacht2026" title="Source 416">416</sup> A VA phase 3 trial (estimated n = 622) started on 28 July 2026, and NIDA's phase 2 STAR trial (n = 63) is due to complete in 2027. <sup class="c" data-ref="NCT07218354,NCT06015893" title="Source 342,343">342,343</sup> Psilocybin's benefit faded after an open-label dose, and a 2026 meta-analysis calls the evidence "mixed". <sup class="c" data-ref="Pagni2026,Florineth2026" title="Source 130,354">130,354</sup> Larsucosterol entered phase 3 in January 2026. <sup class="c" data-ref="NCT07428538" title="Source 344">344</sup>`,
  pt:`The best trial so far found semaglutide helped people with AUD and obesity drink heavily on fewer days. Bigger trials are now under way. None of these is approved for AUD yet.`,
  hook:`Klausen 2026: heavy drinking days −13.7 percentage points vs placebo, in people with obesity. Does it work without obesity? Unknown. <sup class="c" data-ref="Klausen2026Lancet" title="Source 247">247</sup>`}
];
const FR_FLIP=[
 {h:`"Weight-loss jab halves alcohol problems"`,d:'Observational cohort (electronic health records)',n:'83,825 people with obesity',l:'12 months',ep:'New or recurrent AUD diagnoses in the records',r:'50–56% lower risk with semaglutide vs other anti-obesity medicines',cv:'Not randomised: people prescribed semaglutide may differ in other ways. Cannot show cause.',c:'<sup class="c" data-ref="Wang2024" title="Source 490">490</sup>'},
 {h:`"Ozempic-type drug proven to treat alcohol use disorder"`,d:'Double-blind RCT',n:'108, all with obesity, plus CBT',l:'26 weeks',ep:'Heavy drinking days',r:'−41.1 vs −26.4 percentage points; difference −13.7',cv:'Only people with obesity; short; more gastrointestinal side effects. Phase 3 pending.',c:'<sup class="c" data-ref="Klausen2026Lancet,NCT07218354" title="Source 247,343">247,343</sup>'},
 {h:`"Diabetes drug fails for alcohol"`,d:'Placebo-controlled RCT of exenatide (not semaglutide)',n:'127 treatment-seeking adults, plus CBT',l:'26 weeks',ep:'Heavy drinking days',r:'No reduction; less cue reactivity in the ventral striatum; exploratory benefit with BMI >30',cv:'One drug in the class. Oral semaglutide later missed a craving endpoint but cut heavy drinking days.',c:'<sup class="c" data-ref="Klausen2022Exenatide,Schacht2026" title="Source 246,416">246,416</sup>'},
 {h:`"Psilocybin cures alcohol use disorder"`,d:'Double-blind RCT vs active placebo (diphenhydramine)',n:'95 adults aged 25–65',l:'32 weeks',ep:'Percentage of heavy drinking days',r:'9.7% vs 23.6% (difference 13.9%)',cv:'Excluded major psychiatric and drug use disorders; blinding is hard; later benefit faded and a meta-analysis calls the evidence "mixed". Nobody was "cured".',c:'<sup class="c" data-ref="Bogenschutz2022,Pagni2026,Florineth2026" title="Source 42,130,354">42,130,354</sup>'},
 {h:`"Ketamine keeps people sober"`,d:'Phase 2 RCT (KARE), 2×2 with therapy or education',n:'96 with severe AUD',l:'6 months',ep:'Days abstinent; relapse',r:'10.1% more days abstinent (95% CI 1.1–19.0)',cv:'No difference in relapse rate. Infusions given in a research setting.',c:'<sup class="c" data-ref="Grabski2022" title="Source 145">145</sup>'},
 {h:`"A gene test shows who naltrexone will help"`,d:'Secondary analysis (COMBINE), then a prospective RCT and a meta-analysis',n:'221 in the prospective RCT; 7 RCTs pooled',l:'Trial periods',ep:'Heavy drinking days by OPRM1 genotype',r:'Prospective RCT: no interaction (P = .32); meta-analysis: not significant after correction',cv:'The original signal was post hoc. The authors called the biomarker "premature".',c:'<sup class="c" data-ref="Anton2008OPRM1,Oslin2015JAMAPsych,Hartwell2020" title="Source 12,168,353">12,168,353</sup>'}
];
inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT');let setSt=()=>{};
  const EVC={early:'var(--warn)',hyp:'var(--rx)',est:'var(--good)'},EVL={early:'Early evidence',hyp:'Hypothesis',est:'Established'};
  function draw(t){
    const N=vb(svg,'720 440','400 614'),yr=lerp(FR_Y0,FR_Y1,t);
    const L=N?{sx:i=>40+i*80,cw:74,ch:22,r0:66,rh:76,hy:50,ft:604}:{sx:i=>250+i*102.5,cw:96,ch:26,r0:64,rh:50,hy:48,ft:432};
    let s='';
    s+=`<text x="${N?12:16}" y="22" class="t-sm" style="fill:var(--brand)">${N?'PIPELINE · not recommendations':'TREATMENTS UNDER STUDY FOR AUD · not recommendations'}</text>`;
    s+=`<text x="${N?388:704}" y="${N?26:28}" class="t-big t-end" style="font-size:${N?22:26}px">${Math.floor(yr)}</text>`;
    /* column headers and the approved column */
    FR_ST.forEach((st,i)=>{const x=L.sx(i);s+=`<text x="${f1(x)}" y="${L.hy}" class="t-xs t-mid" style="fill:${i===4?'var(--good)':'var(--ink)'};font-weight:700">${N?FR_STN[i]:st}</text>`;
      if(i===4)s+=`<rect x="${f1(x-L.cw/2-2)}" y="${L.hy+6}" width="${L.cw+4}" height="${L.rh*FR_IT.length-4}" rx="8" style="fill:var(--good-soft);opacity:.5;stroke:var(--good);stroke-dasharray:3 4"/>`});
    const xa=L.sx(4);s+=`<text x="${f1(xa)}" y="${f1(L.hy+(N?11:22))}" class="t-xs t-mid" style="fill:var(--good)">none yet</text>`;
    let onBoard=0,latest=null;
    FR_IT.forEach((it,ri)=>{const y=L.r0+ri*L.rh,ty=N?y+30:y+18,past=it.e.filter(e=>e.y<=yr);
      s+=`<text x="${N?12:16}" y="${N?y+12:y+16}" class="t-lbl"${N?' style="font-size:12.5px"':''}>${it.n}</text>`;
      s+=`<text x="${N?316:16}" y="${N?y+12:y+31}" class="t-xs${N?' t-end':''}" style="fill:${EVC[it.ev]};font-weight:700">${EVL[it.ev]}${it.stall&&yr>=it.stall?(N?' ✕':' · not supported'):''}</text>`;
      s+=`<line x1="${f1(L.sx(0))}" x2="${f1(L.sx(4))}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:2"/>`;
      FR_ST.forEach((_,i)=>{const has=past.some(e=>e.st===i);s+=`<circle cx="${f1(L.sx(i))}" cy="${ty}" r="4" style="fill:${has?EVC[it.ev]:'var(--panel)'};stroke:${has?EVC[it.ev]:'var(--line)'};stroke-width:1.4"/>`});
      if(!past.length){s+=`<text x="${f1(L.sx(0))}" y="${N?y+62:y+44}" class="t-xs" style="opacity:.7">${N?'':''}not yet on the board in ${Math.floor(yr)}</text>`;return}
      onBoard++;
      /* stage reached, with a short slide when it changes */
      let st=-1,from=-1,when=0,lab='';past.forEach(e=>{if(e.c)lab=e.c;if(e.st>st){from=st;st=e.st;when=e.y}});
      const k=ease(clamp((yr-when)/.45)),x=from<0?L.sx(st):lerp(L.sx(from),L.sx(st),k),op=from<0?clamp((yr-when)/.3):1;
      const stalled=it.stall&&yr>=it.stall,col=EVC[it.ev];
      s+=`<g style="opacity:${f1(.25+.75*op)}"><rect x="${f1(x-L.cw/2)}" y="${f1(ty-L.ch/2)}" width="${L.cw}" height="${L.ch}" rx="7" style="fill:var(--panel);stroke:${stalled?'var(--bad)':col};stroke-width:1.8${stalled?';stroke-dasharray:4 3':''}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(ty+3.5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${lab}</text></g>`;
      const last=past[past.length-1];if(!latest||last.y>latest.y)latest=Object.assign({n:it.n},last);
      const fresh=yr-last.y<1;
      s+=`<text x="${f1(N?12:L.sx(0)-L.cw/2)}" y="${N?y+62:y+44}" class="t-xs" style="fill:${fresh?'var(--ink)':'var(--muted)'}">${last.m}</text>`});
    s+=`<text x="${N?12:16}" y="${L.ft}" class="t-xs" style="fill:var(--warn)">Card = highest stage reached. A later column is not a better result.</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(FR_STEPS,t);setSt(ph);
    $('#frRead').innerHTML=`<span>year <b>${yr.toFixed(1)}</b></span><span>on the board <b>${onBoard}/${FR_IT.length}</b></span><span>in phase 3 <b>${FR_IT.filter(it=>it.e.some(e=>e.y<=yr&&e.st===3)).length}</b></span><span>approved for AUD <b>0</b></span>${latest?`<span>latest: <b>${latest.n}</b></span>`:''}`;
    $('#frNote').innerHTML=noteHTML(FR_STEPS[ph]);
  }
  const stop=playWire(rg,$('#frPlay'),draw,26000,'Replay','frontier');
  setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- read the trial ---- */
  const fl=$('#frFlips');
  fl.innerHTML=FR_FLIP.map((c,i)=>`<div class="fr-flip" data-fr="${i}"><div class="fr-in">
    <div class="fr-face"><span class="kicker">Invented headline · card ${i+1}</span><p class="hl">${c.h}</p><p>What would you want to know before believing it?</p><button class="btn" data-frf="${i}" aria-pressed="false">Show what was measured</button></div>
    <div class="fr-face fr-back" aria-hidden="true"><span class="kicker">What the study measured</span><dl><dt>Design</dt><dd>${c.d}</dd><dt>n</dt><dd>${c.n}</dd><dt>Length</dt><dd>${c.l}</dd><dt>Endpoint</dt><dd>${c.ep}</dd><dt>Result</dt><dd>${c.r}</dd><dt>Caveat</dt><dd>${c.cv} ${c.c}</dd></dl><button class="btn" data-frb="${i}" aria-pressed="true" tabindex="-1">Back to the headline</button></div></div></div>`).join('');
  function flip(i,on){const w=$(`[data-fr="${i}"]`,fl);w.classList.toggle('on',on);const f=$$('.fr-face',w);f[0].setAttribute('aria-hidden',on);f[1].setAttribute('aria-hidden',!on);
    $(`[data-frf="${i}"]`,fl).setAttribute('aria-pressed',on);$(`[data-frf="${i}"]`,fl).tabIndex=on?-1:0;$(`[data-frb="${i}"]`,fl).tabIndex=on?0:-1}
  fl.addEventListener('click',e=>{const a=e.target.closest('[data-frf]'),b=e.target.closest('[data-frb]');if(a)flip(+a.dataset.frf,true);else if(b)flip(+b.dataset.frb,false)});

  /* ---- policy chart ---- */
  const ps=$('#frPol'),pr=$('#frPr');
  const EL=[['beer',-.46],['wine',-.69],['spirits',-.80],['heavy drinking',-.28]];
  function drawP(){const N=vb(ps,'720 270','400 520'),pc=Math.round(+pr.value*30);let s='';
    /* left: observed changes */
    const A=N?{x0:20,x1:380,y0:40}:{x0:20,x1:340,y0:40},sc=v=>A.x0+170+(A.x1-A.x0-180)*(-v/20);
    s+=`<text x="${A.x0}" y="24" class="t-sm" style="fill:var(--brand)">${N?'OBSERVED POLICY EFFECTS':'OBSERVED POLICY EFFECTS (% change)'}</text>`;
    const OB=[{l:'Scotland MUP:',l2:'deaths wholly due to alcohol',v:-13.4,ci:[-18.4,-8.3]},{l:'Scotland MUP:',l2:'hospitalisations',v:-4.1,ns:1},{l:'Yukon warning',l2:'labels: sales per capita',v:-6.31}];
    [0,-5,-10,-15,-20].forEach(v=>s+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${A.y0}" y2="${A.y0+OB.length*56}" class="${v?'grid':'axis'}"/><text x="${f1(sc(v))}" y="${A.y0+OB.length*56+14}" class="t-xs t-mid">${v}%</text>`);
    OB.forEach((o,i)=>{const y=A.y0+10+i*56;s+=`<text x="${A.x0}" y="${y+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${o.l}</text><text x="${A.x0}" y="${y+23}" class="t-xs">${o.l2}</text>`;
      s+=`<rect x="${f1(sc(0))}" y="${y+2}" width="${f1(sc(o.v)-sc(0))}" height="18" rx="4" style="fill:${o.ns?'var(--muted)':'var(--brand)'};opacity:${o.ns?.45:.8}"/>`;
      if(o.ci)s+=`<line x1="${f1(sc(o.ci[0]))}" x2="${f1(sc(o.ci[1]))}" y1="${y+11}" y2="${y+11}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${f1(sc(o.ci[0]))}" x2="${f1(sc(o.ci[0]))}" y1="${y+5}" y2="${y+17}" style="stroke:var(--ink);stroke-width:1.5"/><line x1="${f1(sc(o.ci[1]))}" x2="${f1(sc(o.ci[1]))}" y1="${y+5}" y2="${y+17}" style="stroke:var(--ink);stroke-width:1.5"/>`;
      s+=`<text x="${f1(sc(0))}" y="${y+34}" class="t-xs" style="fill:var(--ink)">${o.v}%${o.ns?' (not significant)':o.ci?' (95% CI −18.4 to −8.3)':''}</text>`});
    /* right: elasticity arithmetic */
    const B=N?{x0:20,x1:380,y0:262}:{x0:390,x1:704,y0:40},bx=v=>B.x0+100+(B.x1-B.x0-110)*(-v/30);
    s+=`<text x="${B.x0}" y="${B.y0-16}" class="t-sm" style="fill:var(--accent)">${N?`IF PRICES ROSE ${pc}%: ARITHMETIC`:`IF PRICES ROSE ${pc}%: ELASTICITY ARITHMETIC`}</text>`;
    [0,-10,-20,-30].forEach(v=>s+=`<line x1="${f1(bx(v))}" x2="${f1(bx(v))}" y1="${B.y0}" y2="${B.y0+EL.length*44}" class="${v?'grid':'axis'}"/><text x="${f1(bx(v))}" y="${B.y0+EL.length*44+14}" class="t-xs t-mid">${v}%</text>`);
    EL.forEach(([n,e],i)=>{const y=B.y0+10+i*44,v=e*pc;s+=`<text x="${B.x0}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${n}</text><text x="${B.x0}" y="${y+25}" class="t-xs">elasticity ${e.toFixed(2)}</text>`;
      s+=`<rect x="${f1(bx(0))}" y="${y+2}" width="${f1(Math.max(1,bx(v)-bx(0)))}" height="16" rx="4" style="fill:var(--accent);opacity:.75"/><text x="${f1(bx(v)+5)}" y="${y+14}" class="t-xs" style="fill:var(--ink)">${v.toFixed(1)}%</text>`});
    s+=`<text x="${B.x0}" y="${B.y0+EL.length*44+32}" class="t-xs" style="fill:var(--warn)">${N?'simple mean elasticities × price: not a forecast':'mean elasticity × price change: not a forecast'}</text>`;
    ps.innerHTML=s;
    $('#frPolCap').innerHTML=`Observed: Scotland's minimum unit price (£0.50 per unit, from 1 May 2018) compared with England, and alcohol sales during Yukon's warning-label study. Arithmetic: mean price elasticities from a meta-analysis of 1,003 estimates, multiplied by a ${pc}% price rise; real responses are not this simple. <sup class="c" data-ref="Wyper2023,Zhao2020Labels,Wagenaar2009" title="Source 484,507,515">484,507,515</sup>`;
    $('#frPolNote').innerHTML=noteHTML({k:'Population policy',t:pc<8?'Price is a lever':'Bigger price rises, bigger cuts',txt:`Scotland's minimum unit pricing was associated with a 13.4% fall (95% CI −18.4 to −8.3) in deaths wholly attributable to alcohol and a non-significant 4.1% fall in such hospitalisations, driven by chronic conditions, especially alcohol-related liver disease, and largest in the four most deprived deciles. <sup class="c" data-ref="Wyper2023" title="Source 507">507</sup> A synthesis of 40 evaluation reports found no strong evidence of population-level harm, but some qualitative evidence that financially vulnerable people with alcohol dependence fared worse. <sup class="c" data-ref="Patterson2023" title="Source 357">357</sup> Raising excise taxes cost less than I$100 per healthy life year gained in a global model. <sup class="c" data-ref="Chisholm2018" title="Source 61">61</sup>`,
      pt:`When alcohol costs more, people drink less, and fewer die of alcohol-related illness. People with dependence may need extra support when prices rise.`,
      hook:`Scotland MUP: deaths wholly attributable to alcohol −13.4%. Mean price elasticity: beer −0.46, wine −0.69, spirits −0.80. <sup class="c" data-ref="Wyper2023,Wagenaar2009" title="Source 484,507">484,507</sup>`});
  }
  pr.addEventListener('input',drawP);drawP();
  const prv=redraws.frontier;redraws.frontier=()=>{prv&&prv();drawP()};
};
/* =============== 6.1 A history of alcohol use disorder =============== */
/* The timeline is piecewise linear: 1780-1930 takes the first 36% of its length, 1930-2025 the rest. */
const HI_Y0=1780,HI_YB=1930,HI_Y1=2025,HI_F=.36;
const hiU=y=>y<=HI_YB?HI_F*(y-HI_Y0)/(HI_YB-HI_Y0):HI_F+(1-HI_F)*(y-HI_YB)/(HI_Y1-HI_YB);
const hiYr=u=>u<=HI_F?HI_Y0+(HI_YB-HI_Y0)*u/HI_F:HI_YB+(HI_Y1-HI_YB)*(u-HI_F)/(1-HI_F);
/* tracks: 0 ideas & diagnosis, 1 mutual help & policy, 2 medicines */
const HI_TR=[['Ideas & diagnosis','var(--brand)'],['Help & policy','var(--dx)'],['Medicines','var(--rx)']];
const HI_EV=[
 {y:1784,tr:0,l:'Rush: an aversion remedy; loss of control'},{y:1849,tr:0,l:'Huss: "alcoholismus chronicus"'},
 {y:1933,tr:1,l:'US Prohibition repealed'},{y:1935,tr:1,l:'Alcoholics Anonymous founded, Akron'},
 {y:1948,tr:2,l:'Hald & Jacobsen: the disulfiram reaction'},{y:1951,tr:2,l:'Disulfiram: first FDA approval for AUD'},
 {y:1952,tr:0,l:'DSM-I published'},{y:1960,tr:0,l:'Jellinek: the disease concept'},{y:1976,tr:0,l:'Edwards & Gross: dependence syndrome'},
 {y:1980,tr:0,l:'DSM-III: abuse and dependence'},{y:1987,tr:0,l:'DSM-III-R'},{y:1989,tr:2,l:'Acamprosate approved in Europe'},
 {y:1994,tr:0,l:'DSM-IV: abuse and dependence kept'},{y:1994.4,tr:2,l:'Naltrexone FDA-approved for alcohol'},
 {y:2004,tr:2,l:'Acamprosate approved in the US'},{y:2006,tr:2,l:'Extended-release naltrexone'},
 {y:2013,tr:0,l:'DSM-5: one alcohol use disorder'},{y:2013.4,tr:2,l:'Nalmefene approved in Europe'},{y:2018,tr:2,l:'Baclofen approved in France'},
 {y:2019,tr:0,l:'ICD-11 published'},{y:2022,tr:0,l:'DSM-5-TR'}];
/* "what we called it": the banner name from a given year */
const HI_NAME=[{y:1780,n:'a disease of habitual heavy drinking',s:'Rush: loss of control over alcohol'},{y:1849,n:'alcoholismus chronicus',s:'Huss: the medical consequences of chronic heavy drinking'},
 {y:1952,n:'“alcoholism”',s:'the older, lay name: a disease of loss of control (Jellinek)'},{y:1976,n:'alcohol dependence syndrome',s:'Edwards & Gross: a syndrome not defined by consequences'},
 {y:1980,n:'alcohol abuse | alcohol dependence',s:'DSM-III to DSM-IV: two separate diagnoses'},{y:2013,n:'alcohol use disorder',s:'DSM-5: one disorder, mild to severe'},
 {y:2019,n:'alcohol use disorder',s:'ICD-11 instead: alcohol dependence and harmful pattern of use'}];
const HI_ERA=[{a:1780,b:1840,n:'Rush'},{a:1840,b:1880,n:'Huss'},{a:1880,b:1934.5,n:'Temperance'},{a:1934.5,b:1952,n:'Mutual help'},{a:1952,b:1980,n:'Disease concept'},{a:1980,b:2013,n:'Abuse / dependence'},{a:2013,b:2025,n:'AUD'}];
function hiWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
/* small emblems, about 80 x 80 centred on (x,y): no drinks, no bottles */
function hiEmblem(k,x,y,s=1){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  const ln='stroke:var(--ink);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round';
  if(k==='quill')g+=`<path d="M-22 30L18 -30C26 -36 32 -30 26 -22L-14 34Z" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><path d="M-22 30L24 -26" style="${ln}"/><path d="M-30 36H8" style="${ln}"/><rect x="10" y="22" width="18" height="14" rx="3" style="fill:var(--ink)"/>`;
  else if(k==='book')g+=`<path d="M0 -20C-12 -28 -28 -28 -36 -24V28C-28 24 -12 24 0 32C12 24 28 24 36 28V-24C28 -28 12 -28 0 -20Z" style="fill:var(--panel-2);stroke:var(--brand);stroke-width:2"/><path d="M0 -20V32" style="${ln}"/>`+[-12,-4,4,12].map(v=>`<path d="M-28 ${v}H-8M8 ${v}H28" style="stroke:var(--muted);stroke-width:1.4"/>`).join('');
  else if(k==='gavel')g+=`<rect x="-30" y="-26" width="34" height="18" rx="4" transform="rotate(-30)" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:2"/><path d="M-2 -6L26 26" style="stroke:var(--dx);stroke-width:5;stroke-linecap:round"/><rect x="-34" y="28" width="44" height="8" rx="3" style="fill:var(--dx)"/>`;
  else if(k==='circle'){for(let i=0;i<6;i++){const a=i/6*2*Math.PI-Math.PI/2;g+=person(26*Math.cos(a),26*Math.sin(a)-10,20,'var(--dx)')}g+=`<circle cx="0" cy="0" r="9" style="fill:none;stroke:var(--dx);stroke-width:1.5;stroke-dasharray:2 3"/>`}
  else if(k==='pill')g+=pill(-8,-4,46,{ang:-30})+pill(18,20,22,{round:true});
  else if(k==='two')g+=`<rect x="-38" y="-24" width="34" height="48" rx="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:2"/><rect x="4" y="-24" width="34" height="48" rx="6" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="-21" y="4" class="t-xs t-mid" style="fill:var(--dx);font-weight:600">abuse</text><text x="21" y="4" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">dep.</text>`;
  else if(k==='one')g+=`<rect x="-38" y="-24" width="76" height="48" rx="8" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="0" y="0" class="t-lbl t-mid" style="fill:var(--brand)">AUD</text><text x="0" y="14" class="t-xs t-mid">2+ of 11</text>`;
  return g+'</g>'}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote');let setSt=()=>{};
  const T=hiU;
  const STEPS=[
   {from:0,at:T(1784),y0:1780,y1:1840,em:['quill'],k:'1784 · Philadelphia',t:'Benjamin Rush: a disease, not a vice',
    txt:`In 1784 the Pennsylvania physician Benjamin Rush proposed an aversion remedy for problem drinking, and near the end of the 18th century he described loss of control over alcohol <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>. He described habitual heavy drinking as a disease caused by alcohol itself <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>, and ran a public health education campaign on the hazards of distilled spirits, listing more than a dozen alcohol-related health problems. <sup class="c" data-ref="Katcher1993" title="Source 223">223</sup>`,
    pt:`More than 200 years ago, a doctor argued that heavy drinking that a person cannot control is an illness, not a lack of willpower.`,
    hook:`Rush (1784): loss of control over alcohol, an early disease concept. <sup class="c" data-ref="Witkiewitz2019,Tabakoff2013" title="Source 449,500">449,500</sup>`},
   {from:T(1840),at:T(1852),y0:1840,y1:1880,em:['book'],k:'1849 · Sweden',t:'Magnus Huss names the condition',
    txt:`The Swedish physician Magnus Huss introduced the term from which the older, lay name "alcoholism" comes (cited as Huss 1849) <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>. He described "alcoholismus chronicus", emphasising the medical consequences of chronic heavy drinking: damage to the body, rather than the behaviour itself. <sup class="c" data-ref="Martin2014" title="Source 315">315</sup>`,
    pt:`Huss gave the condition a medical name and focused on the harm heavy drinking does to the body.`,
    hook:`Huss 1849: "alcoholismus chronicus", defined by medical consequences. <sup class="c" data-ref="Tabakoff2013,Martin2014" title="Source 315,449">315,449</sup>`},
   {from:T(1880),at:T(1931),y0:1880,y1:1934.5,em:['gavel'],k:'1800s – 1933 · United States',t:'Temperance and Prohibition',
    txt:`From the 1800s to the early 1900s the temperance movement laid groundwork for later mutual-help organisations <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>. US National Prohibition (the Eighteenth Amendment and the Volstead Act, which defined "intoxicating" as 0.5% alcohol by volume or more) came out of a century-long temperance campaign. Repeal became possible in 1933, mainly because the Great Depression changed the economic context. <span class="ev hyp">Disputed</span> Blocker argues Prohibition did lower consumption: after repeal, yearly intake was about 1.2 US gallons per person, less than half the pre-Prohibition level. <sup class="c" data-ref="Blocker2006" title="Source 40">40</sup>`,
    pt:`For a time the US tried banning alcohol. Historians still argue about how well it worked.`,
    hook:`Repeal of US Prohibition: 1933. Volstead Act threshold: 0.5% ABV. <sup class="c" data-ref="Blocker2006" title="Source 40">40</sup>`},
   {from:T(1934.5),at:T(1950),y0:1934.5,y1:1952,em:['circle','pill'],k:'1935 – 1951',t:'Mutual help and the first medicine',
    txt:`Alcoholics Anonymous dates its founding to 10 June 1935, the sobriety date of co-founder Dr Bob Smith, after he met Bill Wilson in Akron, Ohio; by 2010 AA reported some 2 million members in more than 160 countries <sup class="c" data-ref="Gross2010AA" title="Source 151">151</sup>. In 1948 Hald and Jacobsen reported in the Lancet a drug that sensitises the body to alcohol: disulfiram <sup class="c" data-ref="Hald1948" title="Source 159">159</sup>. In 1951 disulfiram (Antabuse) became the first medicine approved by the FDA for AUD; Drugs@FDA dates it 28 August 1951. <sup class="c" data-ref="Witkiewitz2019,FDA-DrugsFDA-AUD" title="Source 115,500">115,500</sup>`,
    pt:`People with drinking problems began helping each other in groups, and the first medicine for AUD arrived.`,
    hook:`Disulfiram: Hald & Jacobsen 1948, FDA approval 1951. AA: 1935, Akron. <sup class="c" data-ref="Hald1948,Witkiewitz2019,Gross2010AA" title="Source 151,159,500">151,159,500</sup>`},
   {from:T(1952),at:T(1972),y0:1952,y1:1980,em:['book'],k:'1952 – 1976',t:'A disease concept, then a syndrome',
    txt:`The first DSM was published in 1952 <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>. In 1960 E. M. Jellinek's "The Disease Concept of Alcoholism" codified problem drinking as a disease of loss of control over drinking <sup class="c" data-ref="Tabakoff2013,Kelly2019Jellinek" title="Source 233,449">233,449</sup>. In 1976 Griffith Edwards and Milton Gross described the "alcohol dependence syndrome" in the BMJ, a syndrome not defined by its consequences <sup class="c" data-ref="Edwards1976,Martin2014" title="Source 97,315">97,315</sup>, and were the first to use the word "salience" for this purpose <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>. Their syndrome shaped international classification and underpins brief interventions. <sup class="c" data-ref="Li2007ADS,Stockwell2015" title="Source 286,442">286,442</sup>`,
    pt:`Doctors began to describe a pattern: drinking becomes a priority, and the body adapts. That pattern is what "dependence" means.`,
    hook:`Edwards & Gross 1976: alcohol dependence syndrome. Elements were taken into DSM-IV and ICD-10. <sup class="c" data-ref="Edwards1976,Li2007ADS" title="Source 97,286">97,286</sup>`},
   {from:T(1980),at:T(2000),y0:1980,y1:2013,em:['two','pill'],k:'1980 – 2012',t:'Two diagnoses: abuse and dependence',
    txt:`DSM-III (1980) described two separate disorders, substance dependence and substance abuse; DSM-III-R (1987) kept an abuse diagnosis defined partly by consequences <sup class="c" data-ref="Martin2014" title="Source 315">315</sup>. DSM-IV (1994) kept them separate, and its hierarchy created "diagnostic orphans": people with two dependence criteria and no abuse criteria received no diagnosis <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>. Medicines followed: acamprosate in Europe in 1989, naltrexone FDA-approved for alcohol dependence in 1994, acamprosate in the US in 2004 and extended-release naltrexone in 2006. <sup class="c" data-ref="Witkiewitz2019,FDA-DrugsFDA-AUD" title="Source 115,500">115,500</sup>`,
    pt:`For about 30 years there were two labels, a milder "abuse" and a more serious "dependence". Some people with real problems fitted neither.`,
    hook:`FDA approvals for AUD: disulfiram 1951, naltrexone 1994, acamprosate 2004, extended-release naltrexone 2006. <sup class="c" data-ref="Witkiewitz2019,FDA-DrugsFDA-AUD" title="Source 115,500">115,500</sup>`},
   {from:T(2013),at:T(2022.5),y0:2013,y1:2025,em:['one'],k:'2013 – today',t:'One disorder, from mild to severe',
    txt:`DSM-5 (2013) combined abuse and dependence into a single "alcohol use disorder", on consistent findings from more than 200,000 study participants; it dropped legal problems as a criterion and added craving. AUD needs 2 or more of 11 criteria: mild 2–3, moderate 4–5, severe 6 or more <sup class="c" data-ref="APA2013,Hasin2013" title="Source 15,169">15,169</sup>. ICD-11 was formally published in May 2019, keeping alcohol dependence separate from a harmful pattern of use <sup class="c" data-ref="Saunders2019ICD11" title="Source 414">414</sup>, and DSM-5-TR followed in 2022 <sup class="c" data-ref="APA2022" title="Source 16">16</sup>. Nalmefene was approved in Europe in 2013 and baclofen in France in 2018; in the US, three medicines are FDA-approved for AUD. <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>`,
    pt:`Today AUD is one condition with degrees, from mild to severe, and it is treatable.`,
    hook:`DSM-5: merged abuse + dependence, legal problems out, craving in, threshold ≥2 of 11. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>`}];
  const EMB=STEPS.map(s=>s.em);
  function nameAt(y){let i=0;HI_NAME.forEach((n,k)=>{if(y>=n.y)i=k});return i}
  function draw(t){const N=vb(svg,'720 380','400 770'),yr=hiYr(t),p=phaseOf(STEPS,t),S=STEPS[p];let s='';
    /* ---- banner: what we called it ---- */
    const ni=nameAt(yr),nm=HI_NAME[ni],since=yr-nm.y,fade=clamp(since/4),prev=ni>0?HI_NAME[ni-1]:null;
    const bw=N?368:672,bx=N?16:24;
    s+=`<rect x="${bx}" y="10" width="${bw}" height="${N?98:66}" rx="12" style="fill:var(--brand-soft)"/>`;
    s+=`<text x="${bx+14}" y="28" class="t-sm" style="fill:var(--brand)">WHAT WE CALLED IT</text>`;
    s+=`<text x="${bx+bw-14}" y="${N?34:52}" class="t-big t-end" style="font-size:${N?24:30}px;fill:var(--brand)">${Math.round(yr)}</text>`;
    const nameLines=n=>N?(n.includes('|')?n.split(' | ').map((x,i)=>i?'| '+x:x):hiWrap(n,28)):[n];
    const putName=(n,op,dy)=>nameLines(n.n).map((l,i)=>`<text x="${bx+14}" y="${f1((N?54:54)+i*21+dy)}" class="t-big" style="font-size:${N?18:24}px;opacity:${f1(op)}">${l}</text>`).join('');
    if(prev&&fade<1&&prev.n!==nm.n)s+=putName(prev,1-fade,-6*fade);
    s+=putName(nm,prev&&prev.n!==nm.n?fade:1,prev&&prev.n!==nm.n?6*(1-fade):0);
    const subY=N?(nameLines(nm.n).length>1?98:80):70;
    s+=`<text x="${bx+14}" y="${subY}" class="t-xs" style="opacity:${f1(Math.max(.4,fade))}">${nm.s}</text>`;
    /* ---- era detail ---- */
    const D=N?{y:120,ex:52,ey:172,es:.8,tx:104,tw:36,ty:138}:{y:88,ex:76,ey:150,es:1,tx:150,tw:76,ty:110};
    S.em.forEach((k,i)=>{s+=hiEmblem(k,D.ex+(S.em.length>1?(i?20:-14):0),D.ey+(S.em.length>1?(i?22:-14):0),D.es*(S.em.length>1?.68:1))});
    s+=hiWrap(S.t,N?28:60).map((l,i)=>`<text x="${D.tx}" y="${D.ty+i*20}" class="t-big" style="font-size:${N?16:19}px">${l}</text>`).join('');
    const tl=hiWrap(S.t,N?28:60).length;s+=`<text x="${D.tx}" y="${D.ty+tl*20-2}" class="t-sm">${S.k}</text>`;
    const evs=HI_EV.filter(e=>e.y>=S.y0&&e.y<S.y1);let ly=D.ty+tl*20+18;
    const ly0=ly;evs.forEach((e,i)=>{const on=yr>=e.y-.2,c=HI_TR[e.tr][1],ex=D.tx+(!N&&i>=4?280:0),ey=N?ly0+i*15:ly0+(i%4)*14;
      s+=`<circle cx="${ex+4}" cy="${ey-4}" r="4" style="fill:${on?c:'none'};stroke:${c};stroke-width:1.5"/><text x="${ex+14}" y="${ey}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.55};font-weight:${on?600:400}">${Math.floor(e.y)} · ${e.l}</text>`});
    /* ---- timeline ---- */
    if(!N){const x0=130,x1=696,X=y=>lerp(x0,x1,hiU(y)),ty=[236,262,288],ay=312,xm=X(yr);
      HI_TR.forEach(([n,c],i)=>{s+=`<text x="24" y="${ty[i]+3.5}" class="t-xs" style="fill:${c};font-weight:600">${n}</text><line x1="${x0}" x2="${x1}" y1="${ty[i]}" y2="${ty[i]}" style="stroke:var(--line);stroke-width:1"/>`});
      /* scale break */
      s+=`<rect x="${f1(X(HI_YB)-3)}" y="${ay-6}" width="6" height="12" style="fill:var(--panel)"/><path d="M${f1(X(HI_YB)-5)} ${ay+6}l4 -12M${f1(X(HI_YB)+1)} ${ay+6}l4 -12" style="stroke:var(--muted);stroke-width:1.2"/>`;
      s+=`<line x1="${x0}" x2="${x1}" y1="${ay}" y2="${ay}" class="axis" style="stroke:var(--muted)"/>`;
      [1780,1850,1900,1930,1950,1975,2000,2025].forEach(y=>{s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${ay-3}" y2="${ay+3}" style="stroke:var(--muted)"/><text x="${f1(X(y))}" y="${ay+15}" class="t-xs t-mid">${y}</text>`});
      HI_ERA.forEach((e,i)=>{const a=X(e.a),b=X(e.b),on=i===p;s+=`<rect x="${f1(a+1)}" y="${ay+22}" width="${f1(b-a-2)}" height="18" rx="4" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1((a+b)/2)}" y="${ay+34.5}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--muted)'};font-weight:600">${e.n}</text>`});
      s+=`<rect x="${f1(X(1880))}" y="${ty[1]-5}" width="${f1(X(1933)-X(1880))}" height="10" rx="5" style="fill:var(--dx);opacity:.12"/><text x="${f1(X(1933)-4)}" y="${ty[1]+14}" class="t-xs t-end" style="fill:var(--dx)">temperance → Prohibition repealed 1933</text>`;
      HI_EV.forEach(e=>{const x=X(e.y),y=ty[e.tr],c=HI_TR[e.tr][1],on=yr>=e.y-.2,cur=e.y>=S.y0&&e.y<S.y1;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="${cur?5.5:4}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.6"/>`});
      s+=`<line x1="${f1(xm)}" x2="${f1(xm)}" y1="220" y2="${ay}" style="stroke:var(--ink);stroke-width:1.6"/><path d="M${f1(xm)} ${ay-1}l-6 -9h12Z" style="fill:var(--ink)"/>`;
      s+=`<text x="${f1(clamp(xm,150,676))}" y="216" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${Math.round(yr)}</text>`}
    else{const y0=346,y1=746,Y=y=>lerp(y0,y1,hiU(y)),ax=70,tx=[86,100,114],ym=Y(yr);
      HI_TR.forEach(([n,c],i)=>{s+=`<circle cx="${16+i*124}" cy="${y0-28}" r="4" style="fill:${c}"/><text x="${24+i*124}" y="${y0-24.5}" class="t-xs" style="fill:${c};font-weight:600">${n}</text>`;
        s+=`<line x1="${tx[i]}" x2="${tx[i]}" y1="${y0}" y2="${y1}" style="stroke:var(--line)"/>`});
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${y1}" style="stroke:var(--muted)"/>`;
      s+=`<path d="M${ax-6} ${f1(Y(HI_YB)+3)}l12 -4M${ax-6} ${f1(Y(HI_YB)+7)}l12 -4" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [1780,1850,1900,1930,1950,1975,2000,2025].forEach(y=>{s+=`<line x1="${ax-3}" x2="${ax+3}" y1="${f1(Y(y))}" y2="${f1(Y(y))}" style="stroke:var(--muted)"/><text x="${ax-7}" y="${f1(Y(y)+3.5)}" class="t-xs t-end">${y}</text>`});
      HI_ERA.forEach((e,i)=>{const a=Y(e.a),b=Y(e.b),on=i===p;s+=`<rect x="128" y="${f1(a+1)}" width="5" height="${f1(b-a-2)}" rx="2" style="fill:${on?'var(--brand)':'var(--line)'}"/><text x="142" y="${f1((a+b)/2+3.5)}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${e.n}</text>`});
      HI_EV.forEach(e=>{const y=Y(e.y),x=tx[e.tr],c=HI_TR[e.tr][1],on=yr>=e.y-.2,cur=e.y>=S.y0&&e.y<S.y1;s+=`<circle cx="${x}" cy="${f1(y)}" r="${cur?4.5:3.2}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.4"/>`});
      s+=`<line x1="${ax-4}" x2="390" y1="${f1(ym)}" y2="${f1(ym)}" style="stroke:var(--ink);stroke-width:1.3;stroke-dasharray:3 3"/><path d="M${ax-1} ${f1(ym)}l-8 -5v10Z" style="fill:var(--ink)"/><text x="388" y="${f1(ym-4)}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${Math.round(yr)}</text>`}
    svg.innerHTML=s;note.innerHTML=noteHTML(S);setSt(p);
    rg.setAttribute('aria-valuetext',`${Math.round(yr)}: ${S.t}`)}
  const stop=playWire(rg,$('#hiPlay'),draw,22000,'Replay','history');
  const setA=stepWire($('#hiSteps'),STEPS,rg,draw,stop);
  setSt=i=>{setA(i);rg.setAttribute('aria-valuetext',`${Math.round(hiYr(+rg.value))}: ${STEPS[i].t}`)};
  /* jump chips */
  const YR=[1784,1849,1933,1935,1948,1951,1960,1976,1980,1994,2004,2006,2013,2019,2022];
  const yc=$('#hiYears');yc.innerHTML=YR.map(y=>`<button class="tag" data-hy="${y}">${y}</button>`).join('');
  yc.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=clamp(hiU(+b.dataset.hy)+.002);rg.value=v;draw(v)});
  draw(+rg.value);

  /* ---------- how the diagnosis changed ---------- */
  const dsv=$('#hiDx');let dxS=0,dxStop=null;
  /* g4: 'ab' abuse, 'dep' dependence, null not a criterion; in5: false = dropped in DSM-5 */
  const CR=[['role','Role obligations failed','ab',true],['haz','Hazardous situations','ab',true],['legal','Legal problems','ab',false],['soc','Despite social problems','ab',true],
    ['tol','Tolerance','dep',true],['wd','Withdrawal','dep',true],['more','More / longer than intended','dep',true],['cut','Failed efforts to cut down','dep',true],
    ['time','Much time spent','dep',true],['give','Activities given up','dep',true],['cont','Despite physical/psych. harm','dep',true],['crave','Craving',null,true]];
  function lay(state,N){/* returns {id:[x,y,w]} plus box frames */
    const P={},cw=N?176:200,ch=N?24:24;
    if(state===0){let ia=0,id=0;
      CR.forEach(([id_,_,g])=>{if(g==='ab'){P[id_]=N?[24+(ia%2)*184,74+Math.floor(ia/2)*30,cw]:[36,70+ia*32,cw];ia++}
        else if(g==='dep'){P[id_]=N?[24+(id%2)*184,212+Math.floor(id/2)*30,cw]:[286+(id%2)*212,70+Math.floor(id/2)*32,cw];id++}
        else P[id_]=N?[24,370,cw]:[286,240,cw]})}
    else{let k=0;CR.forEach(([id_,_,g,in5])=>{if(!in5){P[id_]=N?[24,352,cw]:[36,270,cw];return}
        const order=k++;P[id_]=N?[24+(order%2)*184,74+Math.floor(order/2)*30,cw]:[36+(order%3)*218,70+Math.floor(order/3)*32,cw]})}
    return P}
  function drawDx(u){/* u: continuous state 0..2 */
    const N=vb(dsv,'720 340','400 480');let s='';s+=`<defs>${marker('hiDxA','var(--muted)')}</defs>`;
    const a=Math.min(1,u),P0=lay(0,N),P1=lay(1,N),icd=ramp(u,1,2),cv=1-icd*.85;
    const box=(x,y,w,h,c,lab,op)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:none;stroke:${c};stroke-width:1.8;opacity:${f1(op)}"/><text x="${x+10}" y="${y-6}" class="t-sm" style="fill:${c};opacity:${f1(op)}">${lab}</text>`;
    /* frames: DSM-IV two boxes fade out, DSM-5 one box fades in */
    const f4=1-ramp(a,0,.5),f5=ramp(a,.5,1)*cv;
    if(N){s+=box(16,58,368,76,'var(--dx)','DSM-IV ALCOHOL ABUSE',f4)+box(16,196,368,136,'var(--brand)','DSM-IV ALCOHOL DEPENDENCE',f4);
      s+=box(16,58,368,206,'var(--brand)','DSM-5 ALCOHOL USE DISORDER · 2 OR MORE OF 11',f5)}
    else{s+=box(24,54,226,142,'var(--dx)','DSM-IV ALCOHOL ABUSE',f4)+box(274,54,434,142,'var(--brand)','DSM-IV ALCOHOL DEPENDENCE',f4);
      s+=box(24,54,684,142,'var(--brand)','DSM-5 ALCOHOL USE DISORDER · 2 OR MORE OF 11 IN 12 MONTHS',f5)}
    if(f4>.05)s+=`<text x="${N?24:286}" y="${N?362:232}" class="t-xs" style="opacity:${f1(f4)}">not a DSM-IV criterion:</text>`;
    if(f5>.05){s+=`<text x="${N?24:36}" y="${N?344:262}" class="t-xs" style="fill:var(--bad);opacity:${f1(f5)}">${N?'dropped: low prevalence, low discrimination, poor fit':'dropped in DSM-5: very low prevalence, low discrimination, poor fit'}</text>`;
      /* severity bar */
      const sx=N?16:24,sy=N?292:222,sw=N?368:684;[['mild 2–3','var(--gaba-fill)'],['moderate 4–5','var(--brand)'],['severe 6+','var(--accent)']].forEach(([l,c],i)=>{s+=`<rect x="${f1(sx+i*sw/3)}" y="${sy}" width="${f1(sw/3-3)}" height="18" rx="5" style="fill:${c};opacity:${f1(f5)}"/><text x="${f1(sx+i*sw/3+sw/6)}" y="${sy+12.5}" class="t-xs t-mid" style="fill:#fff;font-weight:600;opacity:${f1(f5)}">${l}</text>`});
      s+=`<text x="${sx}" y="${sy-6}" class="t-sm" style="opacity:${f1(f5)}">SEVERITY BY CRITERIA COUNT</text>`}
    /* chips */
    CR.forEach(([id,lab,g,in5])=>{const p0=P0[id],p1=P1[id],e=ease(a),x=lerp(p0[0],p1[0],e),y=lerp(p0[1],p1[1],e),w=p0[2];
      const dropped=!in5&&a>.5,added=id==='crave'&&a>.5,absent=id==='crave'&&a<=.5;
      const col=dropped?'var(--bad)':added?'var(--good)':absent?'var(--muted)':g==='ab'&&a<.5?'var(--dx)':'var(--brand)';
      s+=`<g style="opacity:${f1(cv)}"><rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="24" rx="12" style="fill:${dropped||absent?'var(--panel)':'var(--panel-2)'};stroke:${col};stroke-width:${added||dropped?2:1.2};${absent?'stroke-dasharray:3 3;':''}"/>`;
      s+=`<text x="${f1(x+12)}" y="${f1(y+16)}" style="font:600 ${N?11:11.5}px var(--body);fill:${dropped?'var(--bad)':absent?'var(--muted)':'var(--ink)'}${dropped?';text-decoration:line-through':''}">${lab}</text>`;
      if(added)s+=`<text x="${f1(x+w-10)}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--good);font-weight:700">ADDED</text>`;
      if(dropped)s+=`<text x="${f1(x+w-10)}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--bad);font-weight:700">DROPPED</text>`;
      s+='</g>'});
    /* ICD-11 overlay */
    if(icd>0){const F=[['Impaired control','over onset, level, circumstances or stopping; sometimes craving'],['Increasing priority','drinking takes precedence over other parts of life'],['Physiological features','tolerance, withdrawal, or use to prevent or relieve withdrawal']];
      const o=f1(icd);s+=`<rect x="${N?8:16}" y="${N?40:34}" width="${N?384:692}" height="${N?432:300}" rx="12" style="fill:var(--panel);opacity:${f1(icd*.93)}"/>`;
      s+=N?`<text x="16" y="58" class="t-sm" style="fill:var(--brand);opacity:${o}">ICD-11 ALCOHOL DEPENDENCE</text><text x="16" y="72" class="t-sm" style="fill:var(--brand);opacity:${o}">AT LEAST 2 OF 3 ESSENTIAL FEATURES</text>`:`<text x="24" y="56" class="t-sm" style="fill:var(--brand);opacity:${o}">ICD-11 ALCOHOL DEPENDENCE · AT LEAST 2 OF 3 ESSENTIAL FEATURES</text>`;
      F.forEach(([h,d],i)=>{const x=N?16:24+i*228,y=N?84+i*84:70,w=N?368:216,hh=N?72:96;
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="10" style="fill:var(--brand-soft);opacity:${o}"/><text x="${x+12}" y="${y+22}" class="t-lbl" style="fill:var(--brand);opacity:${o}">${h}</text>`;
        s+=hiWrap(d,N?52:32).map((l,j)=>`<text x="${x+12}" y="${y+40+j*14}" class="t-xs" style="fill:var(--ink);opacity:${o}">${l}</text>`).join('')});
      const by=N?346:196;
      s+=`<rect x="${N?16:24}" y="${by}" width="${N?368:336}" height="${N?56:74}" rx="10" style="fill:var(--dx-soft);opacity:${o}"/><text x="${N?28:36}" y="${by+22}" class="t-lbl" style="fill:var(--dx);opacity:${o}">Harmful pattern of use of alcohol</text>`;
      s+=hiWrap('a separate diagnosis; it added harm to others',N?52:44).map((l,j)=>`<text x="${N?28:36}" y="${by+40+j*14}" class="t-xs" style="fill:var(--ink);opacity:${o}">${l}</text>`).join('');
      s+=`<rect x="${N?16:372}" y="${N?410:by}" width="${N?368:336}" height="${N?56:74}" rx="10" style="fill:var(--panel-2);opacity:${o}"/><text x="${N?28:384}" y="${(N?410:by)+22}" class="t-lbl" style="opacity:${o}">Hazardous alcohol use</text>`;
      s+=`<text x="${N?28:384}" y="${(N?410:by)+40}" class="t-xs" style="fill:var(--ink);opacity:${o}">listed separately: a health risk factor, not a disorder</text>`}
    dsv.innerHTML=s}
  const DXN=[
    {k:'DSM-IV · 1994',t:'Two diagnoses, and the "orphans"',
     txt:`DSM-IV kept separate alcohol abuse and alcohol dependence. Its hierarchy created "diagnostic orphans": people with two dependence criteria and no abuse criteria received no diagnosis at all <sup class="c" data-ref="Hasin2013,Peer2013DSM5" title="Source 169,360">169,360</sup>. Yet factor analyses showed the abuse and dependence criteria formed one factor or two highly correlated factors, and NESARC data suggested a continuum of severity rather than two distinct entities. <sup class="c" data-ref="Hasin2013,Li2007ADS" title="Source 169,286">169,286</sup>`,
     pt:`The old system had two boxes. Some people with real problems fell between them and got no diagnosis.`,
     hook:`DSM-IV diagnostic orphan: 2 dependence criteria, 0 abuse criteria = no diagnosis. <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>`},
    {k:'DSM-5 · 2013',t:'One disorder: legal problems out, craving in',
     txt:`DSM-5 merged the two into alcohol use disorder, based on more than 200,000 study participants. Legal problems were dropped for very low prevalence, low discrimination and poor fit; craving was added, its psychometric benefit equivocal, because it may become a biological treatment target. The 2-criterion threshold gave the best agreement with DSM-IV abuse plus dependence <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>. DSM-IV dependence agreed best with DSM-5 AUD at 4 or more criteria, so trials in dependence apply best to moderate-to-severe AUD <sup class="c" data-ref="Compton2013Crosswalk" title="Source 64">64</sup>. One review counts 2048 qualifying symptom combinations, so two people with AUD can share few symptoms. <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>`,
     pt:`Now there is one condition, rated mild, moderate or severe by how many of 11 signs a person has. Wanting a drink very strongly (craving) became one of them.`,
     hook:`DSM-5 AUD: ≥2 of 11 in 12 months. Out: legal problems. In: craving. DSM-IV dependence ≈ DSM-5 moderate (≥4). <sup class="c" data-ref="Hasin2013,Compton2013Crosswalk" title="Source 64,169">64,169</sup> Try the counter in <a href="#criteria" data-go="criteria">Diagnosis</a>.`},
    {k:'ICD-11 · 2019',t:'Dependence and harmful use, still separate',
     txt:`ICD-11 condenses the six ICD-10 dependence criteria into three essential features, and at least two are needed for alcohol dependence. Harmful pattern of use added harm to others, though endorsement was very low and its validity is questionable <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>. ICD-11 agreed closely with ICD-10 and DSM-IV, and agreement with DSM-5 was good for dependence vs severe AUD but poor for harmful use vs mild AUD <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>. Hazardous alcohol use is listed separately as a health risk factor. <sup class="c" data-ref="Saunders2019ICD11" title="Source 414">414</sup>`,
     pt:`The WHO's system still uses the word "dependence". It and DSM-5 will label some people differently, especially at the mild end.`,
     hook:`ICD-11 alcohol dependence: 2 of 3 features (impaired control, increasing priority, physiological features). <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>`}];
  function setDx(k){const from=dxS;dxS=k;$$('#hiDxBtns [data-dx]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.dx===k));
    $('#hiDxNote').innerHTML=noteHTML(DXN[k]);dxStop&&dxStop();dxStop=animate(900,p=>drawDx(lerp(from,k,ease(p))),()=>{dxStop=null})}
  $('#hiDxBtns').addEventListener('click',e=>{const b=e.target.closest('[data-dx]');if(b)setDx(+b.dataset.dx)});
  drawDx(0);$('#hiDxNote').innerHTML=noteHTML(DXN[0]);
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();drawDx(dxS)};
};
/* =============== 6.2 flashcards & memory aids =============== */
const RV_PARTN={1:"Part 1 · Understanding AUD",2:"Part 2 · Screening & diagnosis",3:"Part 3 · Withdrawal & acute care",4:"Part 4 · Treatment & recovery",5:"Part 5 · Body, family & care",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding AUD ---- */
 [1,`How common is DSM-5 alcohol use disorder in US adults?`,`13.9% in the past 12 months and 29.1% at some point in life (NESARC-III, 2012–2013; population estimates) <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>.`],
 [1,`At what age is AUD most common in the US?`,`At 18–29 years (26.7% in the past year), falling to 2.3% at 65 and older. Mean age at onset was 26.2 years <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>.`],
 [1,`How many people with AUD ever get treatment or help?`,`In NESARC-III, 19.8% of people with lifetime AUD <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. Worldwide about 1 in 6 (17.3%), and 9.3% in low and lower-middle-income countries <sup class="c" data-ref="Mekonen2021" title="Source 328">328</sup>.`],
 [1,`How much shorter is life expectancy after a hospital stay with AUD?`,`24–28 years shorter than in the general population, in Nordic registers (a population statistic) <sup class="c" data-ref="Westman2015" title="Source 494">494</sup>.`],
 [1,`Do most people who drink excessively have alcohol dependence?`,`No. About 90% of excessive drinkers did not meet dependence criteria in NSDUH 2009–2011 <sup class="c" data-ref="Esser2014PCD" title="Source 102">102</sup>.`],
 [1,`What is a US standard drink?`,`0.6 oz of ethanol: 12 oz of 5% beer, 5 oz of 12% wine or 1.5 oz of 40% spirits <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>. Elsewhere definitions run from 8 to 20 g, most often 10 g <sup class="c" data-ref="Kalinowski2016" title="Source 217">217</sup>.`],
 [1,`Why does blood alcohol fall in a straight line?`,`ADH (Km 2–10 mg/100 mL) saturates after the first few drinks, so elimination is zero-order above about 20 mg/100 mL <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>.`],
 [1,`How fast does BAC usually fall?`,`About 0.015 g/dL an hour in moderate drinkers; 25–35 mg/100 mL an hour in people with dependence during detoxification, from CYP2E1 induction <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>. The liver clears about 7 g an hour <sup class="c" data-ref="Cederbaum2012" title="Source 59">59</sup>.`],
 [1,`What are the two steps of ethanol metabolism?`,`Ethanol → acetaldehyde (ADH, also CYP2E1 and catalase), then acetaldehyde → acetate (ALDH2). Both steps make NADH <sup class="c" data-ref="Zakhari2006,Cederbaum2012" title="Source 59,512">59,512</sup>.`],
 [1,`Why does the same dose give women a higher BAC?`,`Ethanol spreads in body water: Vd is about 0.60 L/kg in women vs 0.70 in men <sup class="c" data-ref="Jones2019WIREs" title="Source 213">213</sup>. Women's first-pass metabolism was 23% of men's in the Frezza study <sup class="c" data-ref="Frezza1990" title="Source 132">132</sup>.`],
 [1,`What does ethanol do at GABA-A and NMDA receptors, acutely?`,`It potentiates GABA-A and inhibits NMDA receptors: 61% NMDA current inhibition at 50 mM <sup class="c" data-ref="Kumar2009,Lovinger1989" title="Source 264,300">264,300</sup>.`],
 [1,`Why is withdrawal a state of over-excitation?`,`With chronic drinking GABA-A α1 falls, α4 rises and NMDA receptors are up-regulated. Stopping suddenly unmasks the excitation: seizures and delirium tremens <sup class="c" data-ref="Kumar2009,TsaiCoyle1998" title="Source 264,466">264,466</sup>.`],
 [1,`Name the three Koob–Volkow stages of addiction.`,`Binge/intoxication (basal ganglia), withdrawal/negative affect (extended amygdala; CRF, dynorphin) and preoccupation/anticipation (prefrontal cortex, insula) <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`],
 [1,`What did PET show alcohol releases in the human brain?`,`Dopamine in the ventral striatum and nucleus accumbens (raclopride PET) <sup class="c" data-ref="Boileau2003" title="Source 43">43</sup>, and endogenous opioids in the nucleus accumbens and orbitofrontal cortex (carfentanil PET), the rationale for naltrexone <sup class="c" data-ref="Mitchell2012" title="Source 333">333</sup>.`],
 [1,`How heritable is AUD?`,`About 0.49 in a meta-analysis of twin and adoption studies, with shared environment 0.10 <sup class="c" data-ref="Verhulst2015" title="Source 478">478</sup>. Risk is not destiny.`],
 [1,`What does ALDH2*2 do?`,`It is dominant-negative. Heterozygotes flush and, if they drink, carry about 3 times the oesophageal cancer risk (OR 3.19). Homozygotes rarely drink (OR 0.36) <sup class="c" data-ref="Lewis2005,Li2009ALDH2" title="Source 285,287">285,287</sup>.`],
 [1,`Can a polygenic score diagnose AUD?`,`No. Polygenic scores explain only about 2.5–3.5% of the variance in AUD <sup class="c" data-ref="Barr2020" title="Source 32">32</sup>.`],
 [1,`Does first drinking early matter?`,`Starting before 14, vs at 21 or later, carried an adjusted HR of 1.78 for lifetime dependence <sup class="c" data-ref="Hingson2006" title="Source 181">181</sup>. Survey links may partly reflect shared family risk.`],
 [1,`Is there a level of drinking that protects health?`,`GBD 2016 found the level that minimised health loss was zero drinks a week (95% UI 0.0–0.8) <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>. After bias adjustment, low-volume drinkers did not live longer than lifetime non-drinkers <sup class="c" data-ref="Zhao2023JAMANO" title="Source 516">516</sup>. The research does not support drinking for health.`],
 /* ---- Part 2: screening & diagnosis ---- */
 [2,`How is the AUDIT scored?`,`10 items scored 0–4, maximum 40. A score of 8 or more flags hazardous or harmful use <sup class="c" data-ref="Saunders1993AUDIT" title="Source 413">413</sup>.`],
 [2,`What are the WHO AUDIT zones?`,`Zone I 0–7, II 8–15, III 16–19, IV 20–40, as published <sup class="c" data-ref="Babor2016AUDITZones" title="Source 28">28</sup>. A high score signals the need for assessment, not a diagnosis <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup>.`],
 [2,`When is the AUDIT-C positive?`,`At 4 or more in men (sensitivity 0.86, specificity 0.89) and 3 or more in women (0.73, 0.91) <sup class="c" data-ref="Bradley2007AUDITC" title="Source 47">47</sup>.`],
 [2,`What is the NIAAA single screening question?`,`"How many times in the past year have you had 5 (men) / 4 (women) or more drinks in a day?" One or more is positive: 81.8% sensitive, 79.3% specific <sup class="c" data-ref="Smith2009JGIM" title="Source 437">437</sup>.`],
 [2,`What does USPSTF 2018 recommend?`,`Screen adults 18 and older, including pregnant people, and give brief counselling for risky drinking (grade B). For ages 12–17: I statement <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>.`],
 [2,`How much does a brief intervention help?`,`About 20 g a week less drinking at one year (Cochrane) <sup class="c" data-ref="Kaner2018Cochrane" title="Source 220">220</sup>, or about −1.6 drinks a week (USPSTF review) <sup class="c" data-ref="OConnor2018JAMA" title="Source 349">349</sup>. It does not reliably increase specialty treatment uptake <sup class="c" data-ref="Glass2015Referral" title="Source 141">141</sup>.`],
 [2,`What do the CAGE letters stand for?`,`Cut down, Annoyed, Guilty, Eye-opener <sup class="c" data-ref="Ewing1984CAGE" title="Source 107">107</sup>. It asks about problems, not amounts, and has limited value for screening <sup class="c" data-ref="Aertgeerts2004CAGE,Dhalla2007CAGE" title="Source 3,86">3,86</sup>.`],
 [2,`What is CRAFFT, and its usual cut-off?`,`Car, Relax, Alone, Forget, Friends, Trouble <sup class="c" data-ref="Shenoi2019CRAFFT" title="Source 429">429</sup>; 2 or more is the usual adolescent cut-off <sup class="c" data-ref="Knight2002CRAFFT" title="Source 248">248</sup>.`],
 [2,`How does DSM-5 diagnose and grade AUD?`,`2 or more of 11 criteria in 12 months. Mild 2–3, moderate 4–5, severe 6 or more <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup>.`],
 [2,`What changed from DSM-IV to DSM-5?`,`Abuse and dependence merged into one disorder, legal problems were dropped and craving was added <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`],
 [2,`Early vs sustained remission?`,`Early: 3 to under 12 months with no criteria except craving. Sustained: 12 months or more. Craving may persist in both <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`],
 [2,`How does ICD-11 define alcohol dependence?`,`2 of 3 features: impaired control, increasing priority, and physiological features (tolerance, withdrawal) <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>.`],
 [2,`How long does urine EtG stay positive after heavy drinking?`,`A median of about 78 hours (range 40–130 h) above 0.5 mg/L in people in detoxification <sup class="c" data-ref="Helander2009EtG" title="Source 173">173</sup>.`],
 [2,`What is PEth, and how long does it last?`,`A phospholipid formed in red cell membranes only when ethanol is present. Average half-life about 4 days, up to 12 <sup class="c" data-ref="Hahn2016PEth" title="Source 158">158</sup>; still detectable in the fourth week of abstinence <sup class="c" data-ref="deBejczy2026PEth" title="Source 83">83</sup>.`],
 [2,`How fast do GGT and MCV return to normal?`,`GGT in 2–3 weeks; MCV in 2–4 months <sup class="c" data-ref="Niemela2016Biomarkers" title="Source 346">346</sup>.`],
 [2,`What does an AST:ALT ratio above 2 suggest?`,`Advanced alcohol-related liver disease, not heavy drinking itself <sup class="c" data-ref="Cohen1979SGOTSGPT,Nyblom2004ASTALT" title="Source 62,348">62,348</sup>.`],
 /* ---- Part 3: withdrawal & acute care ---- */
 [3,`When does alcohol withdrawal usually start?`,`6–24 h after stopping or cutting down <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. After long, heavy daily drinking, get medical help to stop safely.`],
 [3,`When do withdrawal seizures happen?`,`As early as 8 h, up to 48 h, peaking at about 24 h after the last drink <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`What is withdrawal hallucinosis?`,`Hallucinations starting at 12–24 h with a clear sensorium; it is distinct from delirium tremens <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>.`],
 [3,`When does delirium tremens begin?`,`Sources differ: 48–72 h (Mirijello; Jesse) or 72–96 h (ASAM). It brings fluctuating attention plus autonomic overactivity <sup class="c" data-ref="Mirijello2015,Jesse2017,ASAM2020Withdrawal" title="Source 20,203,332">20,203,332</sup>.`],
 [3,`What best predicts complicated withdrawal?`,`A past DT or withdrawal seizure (OR 2.58 and 2.8) <sup class="c" data-ref="Goodson2014" title="Source 143">143</sup>. Low platelets and low potassium at admission also predict DT <sup class="c" data-ref="Goodson2014,Eyer2011" title="Source 108,143">108,143</sup>.`],
 [3,`What does a PAWSS of 4 or more mean?`,`High risk of complicated withdrawal (sensitivity 93.1%, specificity 99.5%) <sup class="c" data-ref="Maldonado2015" title="Source 308">308</sup>. PAWSS predicts risk before symptoms; CIWA-Ar measures severity once they start <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`How is the CIWA-Ar built?`,`10 items: nine scored 0–7 and orientation 0–4, for a maximum of 67 <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>.`],
 [3,`What are the ASAM 2020 CIWA-Ar bands?`,`Mild <10, moderate 10–18, severe ≥19, as published <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`When is CIWA-Ar the wrong tool?`,`In delirium or when the person cannot communicate; RASS or CAM-ICU are used instead <sup class="c" data-ref="ASAM2020Withdrawal,Hecksel2008" title="Source 20,171">20,171</sup>.`],
 [3,`Symptom-triggered vs fixed dosing?`,`Saitz 1994: 100 vs 425 mg chlordiazepoxide and 9 vs 68 h of treatment, with no rise in seizures or DT <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>.`],
 [3,`Why are benzodiazepines first line in withdrawal?`,`They reduce both seizures and delirium: by 7.7 and 4.9 per 100 patients in Mayo-Smith 1997 <sup class="c" data-ref="MayoSmith1997" title="Source 321">321</sup>.`],
 [3,`Why not antipsychotics alone in DT?`,`Neuroleptics carried a relative risk of death of 6.6 compared with sedative-hypnotics <sup class="c" data-ref="MayoSmith2004Delirium" title="Source 322">322</sup>.`],
 [3,`What is kindling?`,`Repeated withdrawals make later ones worse: 48% of people with withdrawal seizures had 5 or more prior detoxifications, vs 12% without <sup class="c" data-ref="Brown1988Kindling" title="Source 51">51</sup>.`],
 [3,`How often is the full Wernicke triad seen?`,`Confusion, ataxia and ophthalmoplegia were all present in only 16% at autopsy, and 80% of cases had not been diagnosed in life <sup class="c" data-ref="Harper1986JNNP" title="Source 166">166</sup>.`],
 [3,`What are the Caine criteria?`,`2 of 4: dietary deficiency, oculomotor abnormalities, cerebellar dysfunction, and altered mental state or mild memory impairment <sup class="c" data-ref="Caine1997,Galvin2010EFNS" title="Source 54,134">54,134</sup>.`],
 [3,`Thiamine before glucose?`,`EFNS 2010: thiamine before any carbohydrate, "200 mg thrice daily, preferably intravenously" for suspected WE, as published. ASAM 2020: thiamine and glucose in any order or together <sup class="c" data-ref="Galvin2010EFNS,ASAM2020Withdrawal" title="Source 20,134">20,134</sup>.`],
 [3,`What is Korsakoff syndrome?`,`Severe anterograde memory loss with confabulation, a residual syndrome after Wernicke encephalopathy, linked to the mammillary bodies and anterior thalamus <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup>.`],
 /* ---- Part 4: treatment & recovery ---- */
 [4,`What must be checked before naltrexone?`,`Opioid use: naltrexone is a mu-opioid antagonist and precipitates opioid withdrawal. The label advises 7–10 opioid-free days <sup class="c" data-ref="FDA-Naltrexone,FDA-Vivitrol" title="Source 117,123">117,123</sup>.`],
 [4,`How does kidney function affect acamprosate?`,`It is excreted unchanged: the dose is cut at creatinine clearance 30–50 mL/min and it is contraindicated at 30 or less <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>.`],
 [4,`How does disulfiram work?`,`It inhibits aldehyde dehydrogenase, so acetaldehyde rises 5–10-fold after drinking <sup class="c" data-ref="FDA-Antabuse,KranzlerSoyka2018" title="Source 112,261">112,261</sup>.`],
 [4,`What does the disulfiram boxed warning say?`,`Never give it during intoxication or without the person's full knowledge <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>. Reactions can occur up to 14 days after the last dose.`],
 [4,`What are the NNTs for acamprosate and naltrexone?`,`To prevent return to any drinking: acamprosate 12, oral naltrexone 20. Naltrexone to prevent heavy drinking: 12 <sup class="c" data-ref="Jonas2014JAMA" title="Source 209">209</sup>.`],
 [4,`Acamprosate or naltrexone: which goal?`,`Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving <sup class="c" data-ref="Maisel2013" title="Source 305">305</sup>.`],
 [4,`What did COMBINE show?`,`Naltrexone with medical management worked; acamprosate did not, alone or combined <sup class="c" data-ref="Anton2006COMBINE" title="Source 11">11</sup>.`],
 [4,`How is extended-release naltrexone given?`,`380 mg deep intramuscular gluteal injection every 4 weeks, by a healthcare provider (label) <sup class="c" data-ref="FDA-Vivitrol" title="Source 123">123</sup>. It cut the heavy drinking day rate by 25% <sup class="c" data-ref="Garbutt2005JAMA" title="Source 135">135</sup>.`],
 [4,`Does gabapentin show a dose-response?`,`Yes: complete abstinence 4.1% on placebo, 11.1% on 900 mg and 17.0% on 1,800 mg <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>.`],
 [4,`Which medicine has an RCT in cirrhosis?`,`Baclofen: 71% vs 29% kept abstinence, with no hepatic side effects recorded <sup class="c" data-ref="Addolorato2007Lancet" title="Source 2">2</sup>.`],
 [4,`What did Project MATCH find?`,`CBT, MET and twelve-step facilitation gave similar outcomes, and the matching hypotheses were largely unsupported <sup class="c" data-ref="ProjectMATCH1997" title="Source 373">373</sup>.`],
 [4,`What did Cochrane 2020 find for AA/TSF?`,`Manualised AA/TSF beat other treatments for 12-month continuous abstinence: RR 1.21 (95% CI 1.03–1.42), high certainty <sup class="c" data-ref="Kelly2020Cochrane" title="Source 234">234</sup>.`],
 [4,`How does AA seem to work?`,`Mainly by changing a person's social network <sup class="c" data-ref="Kelly2012AAMech,Kelly2011AANetwork" title="Source 227,228">227,228</sup>.`],
 [4,`What is CRAFT, and how well does it work?`,`Community reinforcement and family training: it engaged 64% of loved ones in treatment, vs 30% (Johnson intervention) and 13% (Al-Anon facilitation) <sup class="c" data-ref="Miller1999" title="Source 329">329</sup>.`],
 [4,`How common is recovery?`,`9.1% of US adults have resolved an alcohol or drug problem; the median number of serious attempts was 2 <sup class="c" data-ref="Kelly2017Recovery,Kelly2019Attempts" title="Source 230,232">230,232</sup>. These are group statistics, not a promise.`],
 [4,`How does NIAAA (2022) define recovery?`,`Remission from DSM-5 AUD plus cessation of heavy drinking; abstinence is not required <sup class="c" data-ref="Hagman2022" title="Source 157">157</sup>.`],
 /* ---- Part 5: body, family & care ---- */
 [5,`How common is fatty liver in heavy drinking?`,`About 90%; it reverses with abstinence. Steatohepatitis leads to cirrhosis in 8–20% <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>.`],
 [5,`What is the Maddrey discriminant function?`,`4.6 × (PT − control) + bilirubin (mg/dL); 32 or more marks severe alcohol-associated hepatitis <sup class="c" data-ref="Carithers1989,Louvet2007Lille" title="Source 55,299">55,299</sup>.`],
 [5,`What does a Lille score of 0.45 or more mean?`,`Nonresponse at day 7 of steroids: 6-month survival 25% vs 85% (population statistics) <sup class="c" data-ref="Louvet2007Lille" title="Source 299">299</sup>.`],
 [5,`What did STOPAH show?`,`Prednisolone: 28-day OR 0.72 (P = 0.06), no 90-day or 1-year benefit, more infections (13% vs 7%); pentoxifylline no benefit <sup class="c" data-ref="Thursz2015STOPAH" title="Source 460">460</sup>.`],
 [5,`Name the seven cancers alcohol causes.`,`Mouth, pharynx, larynx, oesophagus, liver, colorectum and female breast. Alcohol is an IARC Group 1 carcinogen <sup class="c" data-ref="Baan2007IARC,Bagnardi2015BJC" title="Source 26,30">26,30</sup>.`],
 [5,`What is "abstainer bias"?`,`Counting former drinkers (often ill) as non-drinkers makes light drinkers look healthier: the J-curve RR 0.86 became 0.97 after adjustment <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup>.`],
 [5,`Does stopping drinking help atrial fibrillation?`,`Yes: in an RCT, abstinence cut AF recurrence from 73% to 53% <sup class="c" data-ref="Voskoboinik2020NEJM" title="Source 483">483</sup>. AF risk rises about 8% per drink a day <sup class="c" data-ref="Larsson2014JACC" title="Source 275">275</sup>.`],
 [5,`How strongly is AUD linked to dementia?`,`It was the strongest modifiable risk factor in a French cohort (adjusted HR about 3.3) <sup class="c" data-ref="Schwarzinger2018LPH" title="Source 420">420</sup>.`],
 [5,`What are the three FAS facial features?`,`Short palpebral fissures, smooth philtrum and thin upper-lip vermilion; 2 of 3 are needed <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>.`],
 [5,`Is any amount of alcohol safe in pregnancy?`,`There is no known safe amount and no safe time <sup class="c" data-ref="Gosdin2022MMWR,Williams2015AAP" title="Source 144,497">144,497</sup>. Support is planned with the care team, without blame.`],
 [5,`How common is FASD?`,`About 7.7 per 1,000 children and youth worldwide <sup class="c" data-ref="Lange2017JAMAPediatr" title="Source 272">272</sup>; 1.1–5.0% of US first-graders in 4 communities <sup class="c" data-ref="May2018JAMA" title="Source 320">320</sup>.`],
 [5,`Why is alcohol with opioids or benzodiazepines dangerous?`,`FDA boxed warnings: "profound sedation, respiratory depression, coma, and death" <sup class="c" data-ref="FDA-OxyContin,FDA-Xanax" title="Source 119,124">119,124</sup>.`],
 [5,`How common is AUD among hospital inpatients?`,`About 1 in 5 UK inpatients use alcohol harmfully and about 1 in 10 are dependent <sup class="c" data-ref="Roberts2019" title="Source 394">394</sup>.`],
 [5,`What did the semaglutide 2.4 mg trial show?`,`Heavy drinking days fell 13.7 percentage points more than with placebo in AUD with obesity <span class="ev early">Early evidence</span> <sup class="c" data-ref="Klausen2026Lancet" title="Source 247">247</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`What did Benjamin Rush describe?`,`Near the end of the 18th century, loss of control over alcohol <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>; he saw habitual heavy drinking as a disease caused by alcohol itself <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>.`],
 [6,`Who coined "alcoholism"?`,`Magnus Huss in Sweden (cited as 1849), describing "alcoholismus chronicus". It is the older, lay name for AUD <sup class="c" data-ref="Tabakoff2013,Martin2014" title="Source 315,449">315,449</sup>.`],
 [6,`When and where was AA founded?`,`10 June 1935, Akron, Ohio <sup class="c" data-ref="Gross2010AA" title="Source 151">151</sup>.`],
 [6,`Who discovered disulfiram?`,`Hald and Jacobsen (Lancet, 1948); the FDA approved it in 1951 <sup class="c" data-ref="Hald1948,Witkiewitz2019" title="Source 159,500">159,500</sup>.`],
 [6,`What did Edwards and Gross describe in 1976?`,`The alcohol dependence syndrome, not defined by consequences <sup class="c" data-ref="Edwards1976,Martin2014" title="Source 97,315">97,315</sup>.`],
 [6,`When were naltrexone, acamprosate and injectable naltrexone approved?`,`FDA approvals for AUD: naltrexone 1994, acamprosate 2004, extended-release naltrexone 2006 <sup class="c" data-ref="Witkiewitz2019,FDA-DrugsFDA-AUD" title="Source 115,500">115,500</sup>.`]
];
const RV_MN=[
 ["6 · 12 · 24 · 48","memory aid",`The withdrawal clock: shakes from 6 h, hallucinosis from 12 h, seizures peaking near 24 h <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>, delirium tremens from 48 h (48–72 h Mirijello; 72–96 h ASAM) <sup class="c" data-ref="Mirijello2015,ASAM2020Withdrawal" title="Source 20,332">20,332</sup>. Get medical help to stop safely.`],
 ["CAGE","well known",`Cut down, Annoyed, Guilty, Eye-opener <sup class="c" data-ref="Ewing1984CAGE" title="Source 107">107</sup>. It asks about problems, not amounts, and misses less severe risky drinking <sup class="c" data-ref="Dhalla2007CAGE" title="Source 86">86</sup>.`],
 ["CRAFFT","well known",`Car, Relax, Alone, Forget, Friends, Trouble: the adolescent screen, positive at 2 or more <sup class="c" data-ref="Shenoi2019CRAFFT,Knight2002CRAFFT" title="Source 248,429">248,429</sup>.`],
 ["T-ACE","well known",`Tolerance (2 points), Annoyed, Cut down, Eye-opener (1 each); 2 or more is positive in pregnancy screening <sup class="c" data-ref="Sokol1989TACE" title="Source 440">440</sup>.`],
 ["2 · 4 · 6","memory aid",`DSM-5 severity starts at 2 criteria (mild), 4 (moderate) and 6 (severe), out of 11 <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup>.`],
 ["Under 10, up to 18, 19 and over","memory aid",`ASAM 2020 CIWA-Ar bands as published: mild <10, moderate 10–18, severe ≥19, from a maximum of 67 <sup class="c" data-ref="ASAM2020Withdrawal,Mirijello2015" title="Source 20,332">20,332</sup>.`],
 ["Diet, eyes, balance, mind: any two","memory aid",`The Caine criteria for Wernicke encephalopathy: dietary deficiency, oculomotor signs, cerebellar dysfunction, altered mental state; 2 of 4 <sup class="c" data-ref="Caine1997,Galvin2010EFNS" title="Source 54,134">54,134</sup>. The full triad was seen in only 16% <sup class="c" data-ref="Harper1986JNNP" title="Source 166">166</sup>.`],
 ["A for abstinence, N for no heavy days","memory aid",`Acamprosate best supports abstinence; naltrexone best reduces heavy drinking and craving <sup class="c" data-ref="Maisel2013" title="Source 305">305</sup>. Check opioids before naltrexone <sup class="c" data-ref="FDA-Naltrexone" title="Source 117">117</sup>.`],
 ["Kidney A, liver D","memory aid",`Acamprosate depends on the kidneys (contraindicated at CrCl ≤30 mL/min) <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>; disulfiram is contraindicated in liver disease (ACG) <sup class="c" data-ref="Jophlin2024ACG" title="Source 215">215</sup>.`]
];
const RV_STEPS=[
 {from:0,at:.07,k:'6 h · shakes',t:'Minor withdrawal: from about 6 hours',txt:`Withdrawal happens in people who are physically dependent on alcohol when they stop or cut down: alcohol's depressant effect on the brain reverses suddenly <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. Symptoms usually begin 6–24 h after the last drink: tremor, sweating, anxiety, nausea, insomnia and a fast pulse <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. Get medical help to stop safely.`,pt:'Shaking, sweating and feeling anxious can start within hours of the last drink.',hook:'6 is for shakes: minor withdrawal starts 6–24 h after the last drink.'},
 {from:.1,at:.13,k:'12 h · sees',t:'Hallucinosis: from about 12 hours',txt:`Hallucinations can develop within 12–24 h and usually resolve within 24–48 h unless delirium appears <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. Consciousness stays clear, which separates hallucinosis from delirium tremens <sup class="c" data-ref="Saitz1998AHRW" title="Source 410">410</sup>.`,pt:'Some people see or hear things that are not there, while still knowing where they are.',hook:'Hallucinosis = hallucinations with a clear sensorium, at 12–24 h. It is not DT.'},
 {from:.18,at:.2,k:'24 h · seizures',t:'Seizures: peaking near 24 hours',txt:`Withdrawal seizures may begin as early as 8 h after the last drink, can continue up to 48 h and peak at about 24 h <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. About 10% of people with withdrawal symptoms have one, usually generalised tonic-clonic <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>. Repeated withdrawals make later ones worse: kindling <sup class="c" data-ref="Brown1988Kindling" title="Source 51">51</sup>.`,pt:'A seizure can happen even without other strong signs. It is an emergency.',hook:'Seizure window 8–48 h, peak about 24 h. Benzodiazepines prevent them; phenytoin is not used <sup class="c" data-ref="ASAM2020Withdrawal,Hillbom2003" title="Source 20,180">20,180</sup>.'},
 {from:.4,at:.5,k:'48 h · delirium',t:'Delirium tremens: from 48 hours',txt:`DT is the late complication, with fluctuating attention and autonomic overactivity. Sources disagree on onset: 48–72 h (Mirijello; Jesse) or 72–96 h (ASAM) <sup class="c" data-ref="Mirijello2015,Jesse2017,ASAM2020Withdrawal" title="Source 20,203,332">20,203,332</sup>. It occurs in about 5% of people with withdrawal, often after no treatment or undertreatment <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>.`,pt:'Delirium tremens means severe confusion with a racing heart, fever and sweating. It needs hospital care.',hook:'DT onset: 48–72 h (Mirijello, Jesse) vs 72–96 h (ASAM). Know both.'},
 {from:.8,at:.9,k:'Get help',t:'Most withdrawal is mild, and it is treatable',txt:`Mild to moderate withdrawal often settles within 2–7 days of the last drink <sup class="c" data-ref="Mirijello2015" title="Source 332">332</sup>. Benzodiazepines are first line because they reduce both seizures and delirium <sup class="c" data-ref="MayoSmith1997" title="Source 321">321</sup>; alcohol should never be used to treat withdrawal <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>. Withdrawal management is a way into AUD treatment, not a treatment on its own <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,pt:'Stopping after long, heavy daily drinking is safest with medical help. Afterwards, treatment for the drinking itself can start.',hook:'6 · 12 · 24 · 48: shakes, sees, seizures, delirium.'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','All cards'],...Object.keys(RV_PARTN).map(k=>[k,'Part '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=RV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=RV_PARTN[c[0]]+' · question';$('#fcTagB').textContent=RV_PARTN[c[0]]+' · answer';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag ${m[1]==='well known'?'good':'accent'}">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: the withdrawal clock, 6 · 12 · 24 · 48 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT'),HMAX=120;
  /* one row per number: [big number, title, sub-label, window start h, window end h, stroke colour, soft colour] */
  const ROWS=[
    ['6','Shakes','minor withdrawal, begins 6–24 h',6,48,'--accent','--accent-soft'],
    ['12','Sees','hallucinosis, clear mind, 12–48 h',12,48,'--dx','--dx-soft'],
    ['24','Seizures','window 8–48 h, peak about 24 h',8,48,'--bad','--bad-soft'],
    ['48','Delirium tremens','48–72 h (Mirijello, Jesse) · 72–96 h (ASAM)',48,96,'--glu','--glu-soft']];
  const status=h=>h<6?'Before symptoms usually start':h<12?'Tremor, sweats and anxiety may begin':h<20?'Hallucinosis may appear; the mind stays clear':h<30?'Seizure risk peaks near 24 hours':h<48?'The seizure window runs to about 48 hours':h<=96?'The window for delirium tremens':'Mild withdrawal often settles in 2–7 days';
  function draw(t){
    const N=vb(svg,'720 380','400 620'),h=t*HMAX;
    /* layout: person panel P, rows R, timeline axis T */
    const L=N?{px:70,py:24,ps:96,hx:150,hy:58,rx:16,rw:368,ry0:178,rdy:84,tx:44,tw:334,ty:522,safe:[574,594]}
             :{px:96,py:52,ps:118,hx:20,hy:248,rx:236,rw:470,ry0:46,rdy:66,tx:310,tw:390,ty:316,safe:[368]};
    const T=tline(L.tx,L.ty,L.tw,{min:0,max:HMAX,step:24,fmt:v=>v+' h',label:'hours since the last drink'});
    let s=`<defs><pattern id="rvHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--glu-soft)"/><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--glu-fill);stroke-width:2.2"/></pattern></defs>`;
    /* the person, with schematic signs that follow the clock */
    const tr=ramp(h,6,14)*(1-.6*ramp(h,60,110)),sw=ramp(h,8,18)*(1-.5*ramp(h,100,118)),hal=ramp(h,12,16)*(1-ramp(h,40,48)),sz=bump(h,16,32),cf=ramp(h,48,58)*(1-ramp(h,100,118));
    s+=`<circle cx="${L.px}" cy="${f1(L.py+L.ps*.5)}" r="${f1(L.ps*.62)}" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=person(L.px,L.py+4,L.ps,'var(--muted)');
    s+=symptoms(L.px,L.py+4,L.ps,{tremor:tr,sweat:sw,conf:cf,seize:sz});
    if(hal>0){const hx=L.px,hy=L.py+4+L.ps*.17;[[-34,-6],[30,-12],[36,16]].forEach(([dx,dy],k)=>{s+=`<g style="opacity:${f1(hal*(1-k*.15))}"><ellipse cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" rx="7" ry="4.5" style="fill:none;stroke:var(--dx);stroke-width:1.5;stroke-dasharray:2 2"/><circle cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" r="1.8" style="fill:var(--dx)"/></g>`})}
    /* hour readout and status */
    s+=`<text class="t-big" x="${L.hx}" y="${L.hy}" style="fill:var(--ink)">Hour ${Math.round(h)}</text>`;
    const st=status(h),words=st.split(' ');let l1='',l2='';words.forEach(w=>{if((l1+' '+w).trim().length<=26&&!l2)l1=(l1+' '+w).trim();else l2=(l2+' '+w).trim()});
    s+=`<text class="t-lbl" x="${L.hx}" y="${L.hy+22}">${l1}</text>`+(l2?`<text class="t-lbl" x="${L.hx}" y="${L.hy+40}">${l2}</text>`:'');
    s+=`<text class="t-xs" x="${L.hx}" y="${L.hy+(l2?60:42)}" style="fill:var(--muted)">schematic signs, not a real patient</text>`;
    /* rows: the four numbers of the clock */
    ROWS.forEach(([n,ti,sub,a,b,c,cs],k)=>{const y=L.ry0+k*L.rdy,on=h>=a,bx=L.rx+44,bw=L.rw-44,X=v=>L.tx+L.tw*v/HMAX;
      s+=`<circle cx="${L.rx+17}" cy="${y+8}" r="17" style="fill:var(${on?cs:'--field'});stroke:var(${on?c:'--line'});stroke-width:1.8"/><text class="t-big t-mid" x="${L.rx+17}" y="${y+15}" style="fill:var(${on?c:'--muted'})">${n}</text>`;
      s+=`<text class="t-lbl" x="${bx}" y="${y+2}" style="${on?'':'fill:var(--muted)'}">${ti}</text><text class="${N?'t-xs':'t-sm'}" x="${bx}" y="${y+18}">${sub}</text>`;
      /* the window on the shared time scale */
      const by=y+28;
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(HMAX))}" y1="${by+5}" y2="${by+5}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:2 3"/>`;
      if(k===3){s+=`<rect x="${f1(X(48))}" y="${by}" width="${f1(X(72)-X(48))}" height="10" rx="3" style="fill:var(${cs});stroke:var(--glu-fill)"/><rect x="${f1(X(72))}" y="${by}" width="${f1(X(96)-X(72))}" height="10" rx="3" style="fill:url(#rvHatch);stroke:var(--glu-fill)"/>`}
      else s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a))}" height="10" rx="3" style="fill:var(${cs});stroke:var(${c});stroke-width:1"/>`;
      const fe=Math.min(h,k===3?72:b);if(h>a)s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(fe)-X(a))}" height="10" rx="3" style="fill:var(${k===3?'--glu-fill':c});opacity:.85"/>`;
      if(k===3&&h>72)s+=`<rect x="${f1(X(72))}" y="${by+3}" width="${f1(X(Math.min(h,96))-X(72))}" height="4" rx="2" style="fill:var(--glu)"/>`;
      if(k===2)s+=`<path d="M${f1(X(24))} ${by-4}v18" style="stroke:var(--bad);stroke-width:2"/>`;
    });
    /* the clock hand */
    const cx=L.tx+L.tw*h/HMAX;
    /* drawn in pieces between the rows' labels, so it never crosses text */
    s+=T.svg;ROWS.forEach((r,k)=>{const by=L.ry0+k*L.rdy+28;s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${by-5}" y2="${k===3?L.ty:by+15}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`});
    s+=`<circle cx="${f1(cx)}" cy="${L.ty}" r="5" style="fill:var(--ink)"/>`;
    /* the safety line, always on screen */
    const sf=N?['After long, heavy daily drinking, stopping suddenly can be','dangerous. Get medical help to stop safely.']:['After long, heavy daily drinking, stopping suddenly can be dangerous. Get medical help to stop safely.'];
    sf.forEach((txt,k)=>{s+=`<text class="t-sm" x="${N?16:20}" y="${L.safe[0]+k*20}" style="fill:var(--bad);font-weight:700">${txt}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 [1,`In NESARC-III (2012–2013), the 12-month prevalence of DSM-5 alcohol use disorder in US adults was:`,[`3.9%`,`13.9%`,`45.0%`,`29.1%`],1,`13.9% in the past year and 29.1% over a lifetime (population estimates) <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>. 3.9% was the 12-month figure for drug use disorder <sup class="c" data-ref="Grant2016DUD" title="Source 147">147</sup>.`],
 [1,`In NESARC-III, 12-month AUD was most common at ages:`,[`18–29`,`30–44`,`45–64`,`65 and older`],0,`26.7% at 18–29, falling to 2.3% at 65 and older; mean age at onset was 26.2 years <sup class="c" data-ref="Grant2015NESARC" title="Source 146">146</sup>.`],
 [1,`About what share of people with AUD worldwide receive any treatment?`,[`About 1 in 3`,`About 1 in 50`,`About 1 in 6`,`About 1 in 2`],2,`17.3% pooled across 32 studies, and 9.3% in low and lower-middle-income countries <sup class="c" data-ref="Mekonen2021" title="Source 328">328</sup>.`],
 [1,`In US adults aged 20–64 (2015–2019), excessive drinking caused about:`,[`1 in 40 deaths`,`1 in 3 deaths`,`1 in 100 deaths`,`1 in 8 deaths`],3,`12.9% of deaths, about 89,697 a year, and 1 in 5 deaths at ages 20–49 <sup class="c" data-ref="Esser2022JNO" title="Source 103">103</sup>.`],
 [1,`People hospitalised with AUD in Nordic registers had a life expectancy shorter than the general population by:`,[`5–8 years`,`40–45 years`,`24–28 years`,`2–3 years`],2,`Average life expectancy was 47–53 years in men and 50–58 years in women (population statistics) <sup class="c" data-ref="Westman2015" title="Source 494">494</sup>.`],
 [1,`Among US adults who drink excessively, the share who meet alcohol dependence criteria is about:`,[`50%`,`90%`,`75%`,`10%`],3,`About 10%: roughly 90% of excessive drinkers did not meet dependence criteria in NSDUH 2009–2011 <sup class="c" data-ref="Esser2014PCD" title="Source 102">102</sup>.`],
 [1,`Above about 20 mg/100 mL, blood alcohol usually falls:`,[`In a straight line, because ADH is saturated`,`Not at all for the first 24 hours`,`Exponentially, halving every hour`,`Only once the person sleeps`],0,`Class I ADH (Km 2–10 mg/100 mL) saturates after the first few drinks, so elimination is zero-order <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>.`],
 [1,`The typical rate of fall in BAC in moderate drinkers is about:`,[`0.08 g/dL per hour`,`0.015 g/dL per hour`,`0.15 g/dL per hour`,`0.0015 g/dL per hour`],1,`15 mg/100 mL/h. In people with dependence during detoxification it is 25–35 mg/100 mL/h, because CYP2E1 is induced <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>.`],
 [1,`Which enzyme converts acetaldehyde to acetate?`,[`ADH`,`ALDH2`,`Catalase`,`CYP2E1`],1,`ADH, CYP2E1 and catalase make acetaldehyde; mitochondrial ALDH2 oxidises it to acetate. Both steps produce NADH <sup class="c" data-ref="Zakhari2006,Cederbaum2012" title="Source 59,512">59,512</sup>.`],
 [1,`Acutely, ethanol:`,[`Stops all dopamine release`,`Blocks GABA-A and activates NMDA receptors`,`Potentiates GABA-A and inhibits NMDA receptors`,`Has no action on receptors`],2,`At 50 mM ethanol inhibited NMDA current by 61% <sup class="c" data-ref="Lovinger1989" title="Source 300">300</sup>, and it enhances GABA-A function <sup class="c" data-ref="Kumar2009" title="Source 264">264</sup>.`],
 [1,`In the Koob–Volkow model, the withdrawal/negative affect stage centres on:`,[`The extended amygdala`,`The cerebellum`,`The mammillary bodies`,`The visual cortex`],0,`With CRF and dynorphin recruited. Binge/intoxication is basal ganglia; preoccupation/anticipation is prefrontal cortex and insula <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`],
 [1,`The heritability of AUD from twin and adoption studies is about:`,[`0.05`,`0.25`,`0.90`,`0.49`],3,`0.49 (95% CI 0.43–0.53), with shared environment 0.10. Risk is not destiny <sup class="c" data-ref="Verhulst2015" title="Source 478">478</sup>.`],
 [1,`A person heterozygous for ALDH2*2 who drinks has an oesophageal cancer risk:`,[`Unchanged`,`About 100 times higher`,`About 3 times higher (OR 3.19)`,`About half (OR 0.5)`],2,`ALDH2*2 acts as a dominant negative. Homozygotes rarely drink and had OR 0.36 <sup class="c" data-ref="Lewis2005,Li2009ALDH2" title="Source 285,287">285,287</sup>.`],
 [1,`Compared with first drinking at 21 or later, first drinking before 14 carried an adjusted hazard ratio for lifetime dependence of:`,[`0.78`,`1.78`,`7.8`,`1.00`],1,`HR 1.78 (1.51–2.11), adjusted for family history <sup class="c" data-ref="Hingson2006" title="Source 181">181</sup>. Such survey links may partly reflect shared family risk.`],
 [1,`GBD 2016 put the level of drinking that minimised overall health loss at:`,[`Zero standard drinks a week`,`Seven drinks a week`,`Two drinks a day`,`One drink a day`],0,`Zero (95% UI 0.0–0.8) standard drinks a week <sup class="c" data-ref="GBD2016Alcohol" title="Source 137">137</sup>. The research does not support drinking for health.`],
 [1,`After adjusting for biases, low-volume drinkers' all-cause mortality compared with lifetime non-drinkers was:`,[`Half as high`,`Twice as high`,`40% lower`,`Not significantly lower`],3,`RR 0.93 (P = 0.07) across 107 cohorts with 4.8 million people <sup class="c" data-ref="Zhao2023JAMANO" title="Source 516">516</sup>.`],
 [2,`The AUDIT has 10 items and a maximum score of:`,[`40`,`12`,`67`,`10`],0,`Each item scores 0–4; a score of 8 or more flags hazardous or harmful use <sup class="c" data-ref="Saunders1993AUDIT" title="Source 413">413</sup>.`],
 [2,`An AUDIT score of 16–19 falls in WHO zone:`,[`II`,`IV`,`III`,`I`],2,`Zones as published: I 0–7, II 8–15, III 16–19, IV 20–40 <sup class="c" data-ref="Babor2016AUDITZones" title="Source 28">28</sup>.`],
 [2,`The AUDIT-C thresholds that best balanced sensitivity and specificity in primary care were:`,[`≥10 in men, ≥8 in women`,`≥2 in men, ≥1 in women`,`≥8 for everyone`,`≥4 in men, ≥3 in women`],3,`Sensitivity and specificity 0.86 and 0.89 in men, 0.73 and 0.91 in women <sup class="c" data-ref="Bradley2007AUDITC" title="Source 47">47</sup>.`],
 [2,`The NIAAA single screening question is positive when the answer is:`,[`5 or more heavy days in a month`,`1 or more heavy days in the past year`,`Drinking alone at least once`,`Any drink in the past week`],1,`"How many times in the past year have you had 5 (men) / 4 (women) or more drinks in a day?" 81.8% sensitive, 79.3% specific <sup class="c" data-ref="Smith2009JGIM" title="Source 437">437</sup>.`],
 [2,`USPSTF 2018 recommends alcohol screening plus brief counselling (grade B) for:`,[`Adolescents 12–17 only`,`Only adults over 65`,`Adults 18 and older, including pregnant people`,`Only people who ask for help`],2,`For adolescents aged 12–17 it issued an I statement: insufficient evidence <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>.`],
 [2,`In the 2018 Cochrane review, brief intervention reduced drinking at one year by about:`,[`20 g a week`,`Half of all drinking`,`200 g a week`,`2 g a week`],0,`Moderate-quality evidence, from a mean baseline of 244 g a week <sup class="c" data-ref="Kaner2018Cochrane" title="Source 220">220</sup>.`],
 [2,`The "E" in CAGE stands for:`,[`Excess`,`Eye-opener`,`Ethanol`,`Emergency`],1,`Cut down, Annoyed, Guilty, Eye-opener <sup class="c" data-ref="Ewing1984CAGE" title="Source 107">107</sup>. At the usual cut-off it has limited value for screening <sup class="c" data-ref="Aertgeerts2004CAGE" title="Source 3">3</sup>.`],
 [2,`In adolescents, the usual CRAFFT cut-off is:`,[`4 or more`,`Any single yes`,`8 or more`,`2 or more`],3,`CRAFFT ≥2: sensitivity 0.76 and specificity 0.94 for any problem in 14–18-year-olds <sup class="c" data-ref="Knight2002CRAFFT" title="Source 248">248</sup>.`],
 [2,`DSM-5 AUD requires at least how many of the 11 criteria within 12 months?`,[`3`,`1`,`6`,`2`],3,`Mild 2–3, moderate 4–5, severe 6 or more <sup class="c" data-ref="Hasin2013,APA2022" title="Source 16,169">16,169</sup>.`],
 [2,`Which criterion did DSM-5 remove?`,[`Recurrent legal problems`,`Tolerance`,`Withdrawal`,`Craving`],0,`Legal problems were dropped (low prevalence, poor fit) and craving was added <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`],
 [2,`DSM-5 sustained remission means no criteria (except craving) for:`,[`1 month`,`12 months or more`,`3 months`,`5 years`],1,`Early remission is 3 to under 12 months; craving may persist in both <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`],
 [2,`DSM-IV alcohol dependence agrees best with DSM-5 AUD at:`,[`6 or more criteria`,`All 11 criteria`,`4 or more criteria`,`2 or more criteria`],2,`The moderate threshold, with sensitivity, specificity, PPV and NPV generally above 85% <sup class="c" data-ref="Compton2013Crosswalk" title="Source 64">64</sup>.`],
 [2,`ICD-11 alcohol dependence needs:`,[`One positive blood test`,`3 of 7 criteria`,`2 of 3 essential features`,`2 of 11 criteria`],2,`Impaired control, increasing priority, and physiological features; at least two are needed <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>.`],
 [2,`After heavy drinking, urinary EtG stayed above 0.5 mg/L for a median of about:`,[`6 hours`,`78 hours`,`3 weeks`,`3 months`],1,`Range about 40–130 hours in 32 people in detoxification <sup class="c" data-ref="Helander2009EtG" title="Source 173">173</sup>.`],
 [2,`PEth is formed:`,[`In red cell membranes, only when ethanol is present`,`From glucose during fasting`,`In hair follicles`,`From acetaldehyde in the liver`],0,`Phospholipase D makes it from phosphatidylcholine; average half-life about 4 days, up to 12 <sup class="c" data-ref="Hahn2016PEth" title="Source 158">158</sup>.`],
 [2,`After stopping heavy drinking, MCV may take how long to normalise?`,[`2–3 days`,`It never normalises`,`2–3 weeks`,`2–4 months`],3,`GGT usually returns to normal in 2–3 weeks, MCV in 2–4 months <sup class="c" data-ref="Niemela2016Biomarkers" title="Source 346">346</sup>.`],
 [2,`An AST:ALT ratio of 2 or more most suggests:`,[`A normal liver`,`Acute viral hepatitis`,`Recent light drinking`,`Advanced alcohol-related liver disease`],3,`In withdrawal admissions the ratio was usually 1.0 or less; in alcohol-related cirrhosis 69% had 2 or more <sup class="c" data-ref="Nyblom2004ASTALT,Cohen1979SGOTSGPT" title="Source 62,348">62,348</sup>.`],
 [2,`Can a laboratory test diagnose alcohol use disorder?`,[`Yes: a positive urine EtG`,`Yes: a raised GGT`,`No: AUD is a clinical diagnosis based on criteria`,`Yes: PEth above 20 ng/mL`],2,`Tests can confirm recent or heavy drinking; biomarkers were not included in the DSM-5 criteria <sup class="c" data-ref="Hasin2013,Niemela2016Biomarkers" title="Source 169,346">169,346</sup>.`],
 [3,`ASAM 2020 says withdrawal symptoms usually begin:`,[`Within 30 minutes`,`6–24 h after stopping or cutting down`,`5–7 days later`,`Only after 2 weeks`],1,`After long, heavy daily drinking, get medical help to stop safely <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`Alcohol withdrawal seizures peak at about:`,[`24 hours`,`2 hours`,`2 weeks`,`5 days`],0,`They may begin as early as 8 h and continue up to 48 h <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`Withdrawal hallucinosis differs from delirium tremens because:`,[`It needs a fever`,`Consciousness stays clear`,`It begins only after 7 days`,`It always follows a seizure`],1,`Hallucinations develop at 12–24 h with a clear sensorium <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>.`],
 [3,`Sources disagree on when delirium tremens begins. Which pair is published?`,[`6–12 h and 12–24 h`,`Day 10 and day 20`,`48–72 h (Mirijello) and 72–96 h (ASAM)`,`1–2 h and 3–4 h`],2,`DT combines fluctuating attention with autonomic overactivity <sup class="c" data-ref="Mirijello2015,Jesse2017,ASAM2020Withdrawal" title="Source 20,203,332">20,203,332</sup>.`],
 [3,`The strongest predictor of delirium tremens or seizures in withdrawal is:`,[`A past episode of DT or seizure`,`Female sex`,`A high income`,`Drinking beer rather than spirits`],0,`OR 2.58 and 2.8 in a meta-analysis of 15 studies <sup class="c" data-ref="Goodson2014" title="Source 143">143</sup>.`],
 [3,`PAWSS flags a high risk of complicated withdrawal at a score of:`,[`10 or more`,`1 or more`,`19 or more`,`4 or more`],3,`Sensitivity 93.1% and specificity 99.5% in 403 medically ill inpatients <sup class="c" data-ref="Maldonado2015" title="Source 308">308</sup>.`],
 [3,`The maximum CIWA-Ar score is:`,[`100`,`67`,`10`,`40`],1,`Nine items score 0–7 and orientation scores 0–4 <sup class="c" data-ref="Mirijello2015,Sullivan1989CIWA" title="Source 332,447">332,447</sup>.`],
 [3,`The ASAM 2020 example CIWA-Ar bands are:`,[`<10 mild, 10–18 moderate, ≥19 severe`,`<20 mild, 20–40 moderate, >40 severe`,`<4 mild, 4–6 moderate, >6 severe`,`<8 mild, 8–15 moderate, >15 severe`],0,`Bands as published by ASAM 2020 <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [3,`CIWA-Ar is not suitable for a patient who:`,[`Has a tremor`,`Drank in the past day`,`Is delirious or cannot communicate`,`Is sweating`],2,`It relies on reported symptoms; RASS or CAM-ICU are used instead <sup class="c" data-ref="ASAM2020Withdrawal,Hecksel2008" title="Source 20,171">20,171</sup>.`],
 [3,`In Saitz 1994, symptom-triggered dosing compared with a fixed schedule used:`,[`No benzodiazepine at all`,`More drug for longer`,`The same dose and time`,`Less drug for a shorter time`],3,`100 vs 425 mg chlordiazepoxide and 9 vs 68 h, with no difference in seizures or DT <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>.`],
 [3,`In Mayo-Smith 1997, benzodiazepines reduced withdrawal seizures by:`,[`They increased seizures`,`7.7 per 100 patients`,`50 per 100 patients`,`0.1 per 100 patients`],1,`And delirium by 4.9 per 100 patients <sup class="c" data-ref="MayoSmith1997" title="Source 321">321</sup>.`],
 [3,`For alcohol withdrawal seizures, phenytoin:`,[`Is first line`,`Prevents DT`,`Is not used, unless there is a separate seizure disorder`,`Replaces benzodiazepines`],2,`Lorazepam was effective for secondary prevention and phenytoin was not <sup class="c" data-ref="Hillbom2003,ASAM2020Withdrawal" title="Source 20,180">20,180</sup>.`],
 [3,`In delirium tremens, neuroleptics compared with sedative-hypnotics carried a relative risk of death of:`,[`0.5`,`1.0`,`66`,`6.6`],3,`No deaths were reported in 217 people treated with benzodiazepines or barbiturates <sup class="c" data-ref="MayoSmith2004Delirium" title="Source 322">322</sup>.`],
 [3,`In Harper's 1986 autopsy series, the full Wernicke triad was present in:`,[`16% of cases`,`90% of cases`,`Every case`,`50% of cases`],0,`80% had not been diagnosed in life <sup class="c" data-ref="Harper1986JNNP" title="Source 166">166</sup>.`],
 [3,`The Caine criteria diagnose Wernicke encephalopathy with:`,[`All 3 triad signs`,`1 of 2 signs`,`2 of 4 signs`,`An MRI alone`],2,`Dietary deficiency, oculomotor abnormality, cerebellar dysfunction, and altered mental state or mild memory impairment <sup class="c" data-ref="Caine1997,Galvin2010EFNS" title="Source 54,134">54,134</sup>.`],
 [3,`On thiamine and glucose, ASAM 2020 says:`,[`They may be given in any order or together`,`Glucose must always come first`,`Glucose must be withheld for 24 h`,`Thiamine must never be given IV`],0,`EFNS 2010 still advises thiamine before carbohydrate: a real difference between guidelines <sup class="c" data-ref="ASAM2020Withdrawal,Galvin2010EFNS" title="Source 20,134">20,134</sup>.`],
 [3,`Korsakoff syndrome is mainly:`,[`A seizure disorder`,`Severe anterograde memory loss with confabulation`,`A type of liver failure`,`A late form of delirium tremens`],1,`A residual syndrome after Wernicke encephalopathy, linked to the mammillary bodies and anterior thalamus <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup>.`],
 [3,`What does ASAM 2020 say about using alcohol to treat withdrawal?`,[`It is used for DT`,`It is first line`,`It is used in the ICU`,`It should not be used`],3,`"Oral or intravenous alcohol should not be used for the prevention or treatment of alcohol withdrawal" <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`],
 [4,`Before starting naltrexone, the label advises an opioid-free interval of at least:`,[`No interval is needed`,`7–10 days`,`6 months`,`1 day`],1,`Naltrexone is an opioid antagonist and can precipitate opioid withdrawal <sup class="c" data-ref="FDA-Naltrexone,FDA-Vivitrol" title="Source 117,123">117,123</sup>.`],
 [4,`Acamprosate is contraindicated at a creatinine clearance of:`,[`Any value`,`60 mL/min or less`,`30 mL/min or less`,`90 mL/min or less`],2,`It is excreted unchanged by the kidneys; the starting dose is cut at 30–50 mL/min <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>.`],
 [4,`Disulfiram works by inhibiting:`,[`Alcohol dehydrogenase`,`Mu-opioid receptors`,`NMDA receptors`,`Aldehyde dehydrogenase`],3,`After drinking, blood acetaldehyde can rise 5–10-fold <sup class="c" data-ref="FDA-Antabuse,KranzlerSoyka2018" title="Source 112,261">112,261</sup>.`],
 [4,`A disulfiram–alcohol reaction can occur up to how long after the last dose?`,[`14 days`,`6 months`,`1 hour`,`Never after stopping`],0,`The label also warns about hidden alcohol in sauces, vinegars and cough mixtures <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>.`],
 [4,`Disulfiram beat controls mainly in:`,[`Trials in cirrhosis`,`Blinded trials`,`Trials with no counselling`,`Open-label or supervised trials`],3,`Blinded trials showed no superiority <sup class="c" data-ref="Skinner2014Disulfiram" title="Source 434">434</sup>.`],
 [4,`In Jonas 2014, the NNT to prevent return to any drinking was:`,[`2 for both`,`100 for acamprosate, 5 for naltrexone`,`12 for acamprosate, 20 for naltrexone`,`3 for naltrexone only`],2,`Naltrexone's NNT to prevent return to heavy drinking was 12 <sup class="c" data-ref="Jonas2014JAMA" title="Source 209">209</sup>.`],
 [4,`In COMBINE, which medicine worked alongside medical management?`,[`Acamprosate`,`Naltrexone`,`Only the combination of both`,`Neither`],1,`Acamprosate showed no significant effect, alone or combined <sup class="c" data-ref="Anton2006COMBINE" title="Source 11">11</sup>.`],
 [4,`The Vivitrol label dose is:`,[`380 mg by deep gluteal injection every 4 weeks`,`666 mg three times daily`,`50 mg by mouth daily`,`250 mg daily`],0,`Prepared and given by a healthcare provider <sup class="c" data-ref="FDA-Vivitrol" title="Source 123">123</sup>. Its main trial showed a 25% fall in the heavy drinking day rate <sup class="c" data-ref="Garbutt2005JAMA" title="Source 135">135</sup>.`],
 [4,`Maisel 2013 found acamprosate had the larger effect on ___, and naltrexone on ___.`,[`Craving; abstinence`,`Liver enzymes; sleep`,`Abstinence; heavy drinking and craving`,`Withdrawal; seizures`],2,`A meta-analysis of 64 trials <sup class="c" data-ref="Maisel2013" title="Source 305">305</sup>.`],
 [4,`Topiramate's signature side effect in the multisite trial was:`,[`Weight gain`,`Hypertension`,`Hair loss`,`Paresthesia`],3,`50.8% vs 10.6% on placebo <sup class="c" data-ref="Johnson2007Topiramate" title="Source 206">206</sup>.`],
 [4,`Gabapentin 1,800 mg/day gave complete abstinence in:`,[`17.0%, vs 4.1% on placebo`,`50%, vs 49% on placebo`,`1%, vs 0% on placebo`,`90%, vs 10% on placebo`],0,`A dose-response: 11.1% on 900 mg/day <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>.`],
 [4,`In people with cirrhosis (Addolorato 2007), baclofen achieved abstinence in:`,[`20%, vs 19% on placebo`,`71%, vs 29% on placebo`,`29%, vs 71% on placebo`,`100%, vs 0% on placebo`],1,`No hepatic side effects were recorded <sup class="c" data-ref="Addolorato2007Lancet" title="Source 2">2</sup>.`],
 [4,`Nalmefene, approved in the EU, is taken:`,[`To treat withdrawal`,`As needed, with reduced drinking as the goal`,`Only in hospital`,`Monthly by injection`],1,`In ESENSE 1, 18 mg as needed cut heavy drinking days by 2.3 a month more than placebo <sup class="c" data-ref="vandenBrink2013Nalmefene,Mann2013ESENSE1" title="Source 310,473">310,473</sup>.`],
 [4,`Project MATCH found that CBT, MET and twelve-step facilitation:`,[`Differed greatly`,`Worked only when matched to the person`,`Gave similar outcomes`,`Helped no one`],2,`The matching hypotheses were largely unsupported <sup class="c" data-ref="ProjectMATCH1997" title="Source 373">373</sup>.`],
 [4,`Cochrane 2020: manualised AA/TSF improved 12-month continuous abstinence compared with other treatments with a risk ratio of:`,[`1.21 (95% CI 1.03–1.42)`,`1.00, no difference`,`3.0`,`0.50`],0,`High-certainty evidence <sup class="c" data-ref="Kelly2020Cochrane" title="Source 234">234</sup>.`],
 [4,`Research suggests AA helps mainly by:`,[`Spiritual change in most members`,`Lowering blood pressure`,`Blocking opioid receptors`,`Changing a person's social network`],3,`Spiritual change mattered mainly for a minority with high addiction severity <sup class="c" data-ref="Kelly2012AAMech,Kelly2017AASpiritual" title="Source 228,229">228,229</sup>.`],
 [4,`In Miller 1999, CRAFT engaged what share of initially unmotivated loved ones in treatment?`,[`95%`,`64%`,`13%`,`30%`],1,`Versus 30% with the Johnson intervention and 13% with Al-Anon facilitation <sup class="c" data-ref="Miller1999" title="Source 329">329</sup>.`],
 [4,`In the US National Recovery Survey, the median number of serious attempts before resolving a problem was:`,[`20`,`0`,`2`,`10`],2,`The mean was 5.35; the authors recommend sharing the median. 9.1% of US adults had resolved a problem <sup class="c" data-ref="Kelly2019Attempts,Kelly2017Recovery" title="Source 230,232">230,232</sup>.`],
 [4,`The NIAAA 2022 research definition of recovery requires:`,[`AA attendance`,`A negative PEth test`,`Lifelong abstinence`,`Remission from AUD plus cessation of heavy drinking`],3,`It does not require abstinence <sup class="c" data-ref="Hagman2022" title="Source 157">157</sup>.`],
 [5,`Fatty liver (steatosis) develops in about what share of people who drink heavily?`,[`90%`,`5%`,`30%`,`50%`],0,`It reverses with abstinence; steatohepatitis progresses to cirrhosis in 8–20% <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>.`],
 [5,`The Maddrey discriminant function threshold used for severe alcohol-associated hepatitis is:`,[`20`,`0.45`,`10`,`32`],3,`4.6 × (PT − control) + bilirubin in mg/dL <sup class="c" data-ref="Carithers1989,Louvet2007Lille" title="Source 55,299">55,299</sup>.`],
 [5,`A Lille score of 0.45 or more at day 7 of steroids means:`,[`Mild disease`,`Nonresponse`,`Cure`,`A need for alcohol testing`],1,`Six-month survival was 25%, vs 85% in responders <sup class="c" data-ref="Louvet2007Lille" title="Source 299">299</sup>.`],
 [5,`In STOPAH, prednisolone:`,[`Gave no significant mortality benefit at 90 days or 1 year`,`Halved 1-year mortality`,`Did worse than pentoxifylline`,`Caused fewer infections`],0,`28-day OR 0.72 (P = 0.06); serious infections 13% vs 7% <sup class="c" data-ref="Thursz2015STOPAH" title="Source 460">460</sup>.`],
 [5,`Early liver transplantation for nonresponding severe alcohol-associated hepatitis gave 6-month survival of:`,[`23%, vs 77% in matched controls`,`50%, vs 49% in matched controls`,`77%, vs 23% in matched controls`,`100%, vs 0% in matched controls`],2,`26 highly selected patients in France and Belgium <sup class="c" data-ref="Mathurin2011NEJM" title="Source 319">319</sup>.`],
 [5,`In alcohol-related cirrhosis, stopping drinking improved survival significantly from about:`,[`It never did`,`1 week`,`1.5 years`,`10 years`],2,`HR 0.51 at 1.5 years in 7 cohorts <sup class="c" data-ref="Xie2014HepatolRes" title="Source 508">508</sup>.`],
 [5,`Which is NOT one of the seven cancer sites causally linked to alcohol?`,[`Female breast`,`Prostate`,`Oesophagus`,`Colorectum`],1,`The seven: mouth, pharynx, larynx, oesophagus, liver, colorectum and female breast <sup class="c" data-ref="Baan2007IARC,Bagnardi2015BJC" title="Source 26,30">26,30</sup>.`],
 [5,`Breast cancer risk rises by about how much for each extra 10 g of alcohol a day?`,[`7%`,`0.1%`,`50%`,`It falls`],0,`7.1% (95% CI 5.5–8.7%), the same in women who did and did not smoke <sup class="c" data-ref="Hamajima2002BJC" title="Source 160">160</sup>.`],
 [5,`"Abstainer bias" helps explain the J-curve because:`,[`Non-drinkers under-report illness`,`It does not explain it`,`Light drinking protects the heart`,`Former drinkers in poor health are counted as non-drinkers`],3,`Adjusted RR for low-volume drinkers 0.97; former drinkers had RR 1.22 <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup>.`],
 [5,`Mendelian randomisation in the China Kadoorie Biobank found that the protective U-shape for stroke:`,[`Applied only to spirits`,`Disappeared for genotype-predicted intake`,`Was strongly confirmed`,`Applied only to women`],1,`The apparent stroke protection of moderate drinking is "largely non-causal" <sup class="c" data-ref="Millwood2019" title="Source 330">330</sup>.`],
 [5,`In an RCT of people with atrial fibrillation, abstinence cut 6-month recurrence from:`,[`20% to 10%`,`90% to 89%`,`53% to 73%`,`73% to 53%`],3,`HR 0.55 <sup class="c" data-ref="Voskoboinik2020NEJM" title="Source 483">483</sup>.`],
 [5,`In a French national cohort, alcohol use disorders were associated with dementia with an adjusted HR of about:`,[`30`,`1.1`,`3.3`,`0.5`],2,`The strongest modifiable risk factor in that cohort <sup class="c" data-ref="Schwarzinger2018LPH" title="Source 420">420</sup>.`],
 [5,`The FAS facial criteria need at least two of:`,[`Short palpebral fissures, smooth philtrum, thin upper lip`,`Small eyes, curly hair, freckles`,`High forehead, long chin, dimples`,`Cleft palate, large ears, wide nose`],0,`Hoyme 2016 criteria <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>.`],
 [5,`CDC and AAP state that the safe amount of alcohol in pregnancy is:`,[`There is no known safe amount, and no safe time`,`Wine only`,`Any amount after the first trimester`,`One drink a week`],0,`No known safe amount and no safe trimester <sup class="c" data-ref="Gosdin2022MMWR,Williams2015AAP" title="Source 144,497">144,497</sup>. Support in pregnancy is planned with the care team.`],
 [5,`Estimated global FASD prevalence among children and youth is:`,[`0.7 per 1,000`,`7.7 per 1,000`,`1 per million`,`77 per 1,000`],1,`In US first-graders the conservative range was 1.1–5.0% <sup class="c" data-ref="Lange2017JAMAPediatr,May2018JAMA" title="Source 272,320">272,320</sup>.`],
 [5,`The FDA boxed warning on combining opioids with alcohol or benzodiazepines warns of:`,[`Hair loss`,`Mild headache`,`Weight gain`,`Profound sedation, respiratory depression, coma and death`],3,`Mixing alcohol with opioids, benzodiazepines or other sedatives is dangerous <sup class="c" data-ref="FDA-OxyContin,FDA-Xanax" title="Source 119,124">119,124</sup>.`],
 [5,`In a UK meta-analysis, what share of hospital inpatients had alcohol dependence?`,[`About 1 in 1,000`,`About 1 in 2`,`About 1 in 10`,`About 1 in 100`],2,`And about 1 in 5 used alcohol harmfully <sup class="c" data-ref="Roberts2019" title="Source 394">394</sup>.`],
 [5,`In the semaglutide 2.4 mg RCT in AUD with obesity, heavy drinking days fell by how much more than with placebo?`,[`Not at all`,`50 percentage points`,`13.7 percentage points`,`1 percentage point`],2,`Early evidence; GLP-1 receptor agonists are not approved for AUD <sup class="c" data-ref="Klausen2026Lancet" title="Source 247">247</sup>.`],
 [5,`Scotland's minimum unit pricing was associated with how many fewer deaths wholly attributable to alcohol?`,[`50%`,`1%`,`None`,`13.4%`],3,`Effects were largest in the most deprived areas <sup class="c" data-ref="Wyper2023" title="Source 507">507</sup>.`],
 [6,`Who introduced the term "alcoholism"?`,[`Benjamin Rush`,`Magnus Huss`,`Bill Wilson`,`Griffith Edwards`],1,`Cited as Huss 1849, describing "alcoholismus chronicus" <sup class="c" data-ref="Tabakoff2013,Martin2014" title="Source 315,449">315,449</sup>.`],
 [6,`Alcoholics Anonymous dates its founding to 1935 in:`,[`Akron, Ohio`,`London`,`Stockholm`,`New York City`],0,`10 June 1935, the sobriety date of Dr Bob Smith <sup class="c" data-ref="Gross2010AA" title="Source 151">151</sup>.`],
 [6,`Disulfiram was first reported in the Lancet in 1948 by:`,[`Koob and Volkow`,`Hald and Jacobsen`,`Marlatt and Gordon`,`Edwards and Gross`],1,`The FDA approved it in 1951 <sup class="c" data-ref="Hald1948,Witkiewitz2019" title="Source 159,500">159,500</sup>.`],
 [6,`Edwards and Gross described the alcohol dependence syndrome in:`,[`1935`,`1849`,`2013`,`1976`],3,`A syndrome not defined by its consequences <sup class="c" data-ref="Edwards1976,Martin2014" title="Source 97,315">97,315</sup>.`],
 [6,`In which year did the FDA approve extended-release injectable naltrexone for AUD?`,[`2006`,`2004`,`1994`,`1951`],0,`Naltrexone followed in 1994 and acamprosate in 2004 <sup class="c" data-ref="Witkiewitz2019,FDA-DrugsFDA-AUD" title="Source 115,500">115,500</sup>.`],
 [6,`DSM-IV "diagnostic orphans" were people who:`,[`Had no symptoms at all`,`Had only legal problems`,`Had two dependence criteria and no abuse criteria`,`Were under 18`],2,`They received no diagnosis; DSM-5's single disorder closed the gap <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`],
 [6,`Benjamin Rush, near the end of the 18th century, described:`,[`The ALDH2 gene`,`The CIWA-Ar`,`PEth testing`,`Loss of control over alcohol`],3,`He saw habitual heavy drinking as a disease caused by alcohol itself <sup class="c" data-ref="Witkiewitz2019,Tabakoff2013" title="Source 449,500">449,500</sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(RV_PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=QZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">Finished</div><div class="q">You scored ${score} / ${list.length} (${pct}%)</div><p>${pct>=85?'Excellent work.':pct>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">Try again</button><button class="btn" data-go="review">Go to flashcards</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>question <b>${i+1} / ${list.length}</b></span><span>score <b>${score}</b></span><span>${RV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='ABCD'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'Correct.':'Not quite.'}</b> The answer is ${ansL}. ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'Next question →':'See results'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const GL_T=[
 ["Abstainer bias",`Counting former drinkers, who are often ill, as "non-drinkers", which makes light drinkers look healthier; after adjustment the J-curve's benefit disappeared (RR 0.97) <sup class="c" data-ref="Stockwell2016JSAD" title="Source 443">443</sup>.`,"body"],
 ["Acamprosate",`An approved AUD medicine for "maintenance of abstinence" in people abstinent at the start. It is excreted unchanged by the kidneys and does not treat withdrawal (label) <sup class="c" data-ref="FDA-Campral" title="Source 113">113</sup>.`,"medicines"],
 ["Acetaldehyde",`The first and most toxic product of ethanol metabolism; a mutagen and the main focus of research on how alcohol causes cancer <sup class="c" data-ref="Seitz2007,Brooks2009" title="Source 50,425">50,425</sup>.`,"drinks"],
 ["Acetaminophen and alcohol",`The US OTC label warns that severe liver damage may occur with 3 or more alcoholic drinks every day <sup class="c" data-ref="FDA-Tylenol" title="Source 121">121</sup>. Chronic drinking induces CYP2E1, which makes more toxic acetaminophen metabolites <sup class="c" data-ref="Lieber2004MEOS" title="Source 291">291</sup>.`,"body"],
 ["ADH (alcohol dehydrogenase)",`The cytosolic enzyme that oxidises ethanol to acetaldehyde. Its low Km means it saturates after a few drinks, so BAC falls at a constant rate <sup class="c" data-ref="Jones2010,Zakhari2006" title="Source 212,512">212,512</sup>.`,"drinks"],
 ["ADH1B",`A gene for a fast alcohol dehydrogenase. The rs1229984 variant protects against alcohol dependence and reaches genome-wide significance <sup class="c" data-ref="Walters2018,Li2011ADH1B" title="Source 288,488">288,488</sup>.`,"genes"],
 ["Adverse childhood experiences (ACEs)",`Childhood adversities that were 2 to 13 times more likely when a parent had alcohol problems (retrospective reports) <sup class="c" data-ref="Dube2001" title="Source 92">92</sup>.`,"families"],
 ["Al-Anon",`The most widely used mutual-help group for people concerned about someone else's drinking <sup class="c" data-ref="Timko2013" title="Source 462">462</sup>.`,"families"],
 ["ALDH2",`Mitochondrial aldehyde dehydrogenase, which turns acetaldehyde into acetate <sup class="c" data-ref="Zakhari2006" title="Source 512">512</sup>.`,"genes"],
 ["ALDH2*2",`A dominant-negative variant that causes flushing. Heterozygotes who drink have about 3 times the oesophageal cancer risk (OR 3.19) <sup class="c" data-ref="Lewis2005,Li2009ALDH2" title="Source 285,287">285,287</sup>.`,"genes"],
 ["Alcohol dependence syndrome",`Edwards and Gross's 1976 description of dependence as a syndrome not defined by its consequences <sup class="c" data-ref="Edwards1976,Martin2014" title="Source 97,315">97,315</sup>.`,"history"],
 ["Alcohol poisoning",`A medical emergency: call emergency services. Signs progress from slurred speech and vomiting to stupor, coma and death <sup class="c" data-ref="Kanny2015" title="Source 221">221</sup>.`,"drinks"],
 ["Alcohol use disorder (AUD)",`A problematic pattern of alcohol use causing clinically significant impairment or distress, shown by 2 or more of 11 criteria in 12 months <sup class="c" data-ref="APA2022,Hasin2013" title="Source 16,169">16,169</sup>. A treatable medical condition <sup class="c" data-ref="Carvalho2019Lancet" title="Source 56">56</sup>.`,"what"],
 ["Alcohol withdrawal",`Symptoms when a physically dependent person stops or cuts down, from a sudden reversal of alcohol's depressant effects; the most severe results are seizures and delirium <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"withdrawal"],
 ["Alcohol-associated hepatitis (AH)",`Rapid onset or worsening of jaundice in heavy drinking; 1-month mortality can reach 20–50% in severe cases (population statistics) <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>.`,"liver"],
 ["Alcohol-associated liver disease (ALD)",`The spectrum of steatosis, alcohol-associated hepatitis and cirrhosis; the AASLD term replacing "alcoholic liver disease" <sup class="c" data-ref="Crabb2020AASLD,Singal2018ACG" title="Source 69,433">69,433</sup>.`,"liver"],
 ["Alcohol-related brain damage",`An umbrella term covering alcohol-related dementia and Wernicke–Korsakoff syndrome; partial recovery is possible with abstinence <sup class="c" data-ref="Ridley2013AlzResTher" title="Source 388">388</sup>.`,"body"],
 ["Alcoholics Anonymous (AA)",`A mutual-help fellowship founded in 1935 in Akron, Ohio <sup class="c" data-ref="Gross2010AA" title="Source 151">151</sup>. Its effect works mainly through social-network change <sup class="c" data-ref="Kelly2012AAMech" title="Source 228">228</sup>.`,"recovery"],
 ["\"Alcoholism\"",`The older, lay name for alcohol use disorder, introduced by Magnus Huss <sup class="c" data-ref="Tabakoff2013" title="Source 449">449</sup>.`,"history"],
 ["Allostasis",`In Koob's model, a chronic shift in the reward set point kept going by stress systems, which may explain lasting relapse risk <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="KoobLeMoal2001" title="Source 255">255</sup>.`,"brain"],
 ["Alpha-2 agonists",`Clonidine and dexmedetomidine: adjuncts for autonomic signs in withdrawal, never used alone, because they do not prevent seizures or DT <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["ARND",`Alcohol-related neurodevelopmental disorder, one of the four Institute of Medicine FASD categories <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>.`,"pregnancy"],
 ["AST:ALT ratio",`A ratio above 2 suggests advanced alcohol-related liver disease rather than heavy drinking itself <sup class="c" data-ref="Cohen1979SGOTSGPT,Nyblom2004ASTALT" title="Source 62,348">62,348</sup>.`,"biomarkers"],
 ["Atrial fibrillation (AF)",`The commonest alcohol-triggered arrhythmia. Risk rises about 8% per drink a day, and abstinence cut recurrence from 73% to 53% <sup class="c" data-ref="Larsson2014JACC,Voskoboinik2020NEJM" title="Source 275,483">275,483</sup>.`,"body"],
 ["AUDIT",`The WHO 10-item Alcohol Use Disorders Identification Test, scored 0–40; 8 or more flags hazardous or harmful use <sup class="c" data-ref="Saunders1993AUDIT" title="Source 413">413</sup>.`,"screening"],
 ["AUDIT-C",`The first three AUDIT questions, scored 0–12; positive at 4 or more in men and 3 or more in women <sup class="c" data-ref="Bradley2007AUDITC" title="Source 47">47</sup>.`,"screening"],
 ["Baclofen",`A GABA-B agonist used off-label; approved for AUD in France in 2018 <sup class="c" data-ref="Witkiewitz2019" title="Source 500">500</sup>. It has a cirrhosis RCT (71% vs 29% abstinent) <sup class="c" data-ref="Addolorato2007Lancet" title="Source 2">2</sup>.`,"offlabel"],
 ["Behavioural couples therapy (BCT)",`Treatment with the partner; it beat individual treatment (d = 0.54) <sup class="c" data-ref="Powers2008" title="Source 369">369</sup>.`,"therapy"],
 ["Benzodiazepines",`First-line medicines for alcohol withdrawal, reducing both seizures and delirium <sup class="c" data-ref="MayoSmith1997,ASAM2020Withdrawal" title="Source 20,321">20,321</sup>.`,"detox"],
 ["Binge drinking",`In US surveys, 5 or more drinks (males) or 4 or more (females) on one occasion <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>; it reflects drinking to a BAC of about 0.08 g% <sup class="c" data-ref="Corbin2014" title="Source 68">68</sup>.`,"drinks"],
 ["Blood alcohol concentration (BAC)",`The amount of ethanol in the blood, often in g/dL. It peaks 10–60 minutes after a dose <sup class="c" data-ref="Jones2019WIREs" title="Source 213">213</sup>. A BAC calculation is a teaching estimate with real uncertainty <sup class="c" data-ref="Posey2007Widmark" title="Source 368">368</sup>.`,"drinks"],
 ["Brief intervention",`Five or fewer sessions totalling under 60 minutes, for hazardous and harmful drinkers who are not seeking help; about 20 g a week less drinking at one year <sup class="c" data-ref="Kaner2018Cochrane" title="Source 220">220</sup>.`,"screening"],
 ["CAGE",`Four questions: Cut down, Annoyed, Guilty, Eye-opener <sup class="c" data-ref="Ewing1984CAGE" title="Source 107">107</sup>; of limited value for screening <sup class="c" data-ref="Aertgeerts2004CAGE" title="Source 3">3</sup>.`,"screening"],
 ["Caine criteria",`Wernicke encephalopathy in people who drink heavily: 2 of dietary deficiency, oculomotor abnormality, cerebellar dysfunction, altered mental state <sup class="c" data-ref="Caine1997,Galvin2010EFNS" title="Source 54,134">54,134</sup>.`,"wernicke"],
 ["CAM (Confusion Assessment Method)",`Delirium = acute onset with fluctuating course, plus inattention, plus disorganised thinking or an altered level of consciousness <sup class="c" data-ref="Inouye1990" title="Source 193">193</sup>.`,"nursing"],
 ["CAM-ICU",`A delirium tool for ventilated ICU patients (sensitivity 93–100%, about 2 minutes) <sup class="c" data-ref="Ely2001CAMICU" title="Source 101">101</sup>, used where CIWA-Ar cannot be <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"ciwa"],
 ["Carbamazepine",`An anticonvulsant that ASAM 2020 lists as appropriate for mild withdrawal and an alternative for moderate withdrawal <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["Carbohydrate-deficient transferrin (CDT)",`A specific marker of chronic heavy drinking that needs about 50–80 g a day for weeks to rise <sup class="c" data-ref="Niemela2016Biomarkers" title="Source 346">346</sup>; half-life about 15 days <sup class="c" data-ref="Arnts2021LiverBiomarkers" title="Source 18">18</sup>.`,"biomarkers"],
 ["Chlordiazepoxide",`A long-acting benzodiazepine labelled for "withdrawal symptoms of acute alcoholism" (label wording) <sup class="c" data-ref="FDA-Chlordiazepoxide" title="Source 114">114</sup>.`,"detox"],
 ["CIWA-Ar",`The 10-item Clinical Institute Withdrawal Assessment for Alcohol, revised; maximum 67 <sup class="c" data-ref="Sullivan1989CIWA,Mirijello2015" title="Source 332,447">332,447</sup>. ASAM bands: <10, 10–18, ≥19 <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"ciwa"],
 ["Cirrhosis",`Advanced scarring of the liver. It follows steatohepatitis in 8–20% <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>; stopping drinking improves survival <sup class="c" data-ref="Xie2014HepatolRes" title="Source 508">508</sup>.`,"liver"],
 ["COMBINE",`A 1,383-person US trial: naltrexone with medical management helped; acamprosate did not <sup class="c" data-ref="Anton2006COMBINE" title="Source 11">11</sup>.`,"medicines"],
 ["Community reinforcement approach (CRA)",`A behavioural treatment that makes sober life more rewarding; first described by Hunt and Azrin in 1973 <sup class="c" data-ref="Hunt1973,Roozen2004CRA" title="Source 191,400">191,400</sup>.`,"therapy"],
 ["Confabulation",`A feature of Korsakoff syndrome, alongside severe anterograde episodic memory loss <sup class="c" data-ref="Kopelman2009" title="Source 257">257</sup>.`,"wernicke"],
 ["Contingency management (CM)",`Rewards for verified abstinence, for example EtG-negative urine; 3.1 times more negative samples in one trial <sup class="c" data-ref="McDonell2017" title="Source 323">323</sup>.`,"therapy"],
 ["Corticotropin-releasing factor (CRF)",`A brain stress transmitter recruited in the extended amygdala during the withdrawal/negative affect stage <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`,"brain"],
 ["CRAFFT",`An adolescent screen: Car, Relax, Alone, Forget, Friends, Trouble; positive at 2 or more <sup class="c" data-ref="Shenoi2019CRAFFT,Knight2002CRAFFT" title="Source 248,429">248,429</sup>.`,"screening"],
 ["CRAFT",`Community reinforcement and family training: it helps family members get a loved one into treatment, about three times as often as Al-Anon <sup class="c" data-ref="Roozen2010CRAFT" title="Source 401">401</sup>.`,"families"],
 ["Craving",`A strong desire to drink; added as a DSM-5 criterion <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`,"criteria"],
 ["CYP2E1",`An inducible liver enzyme (part of the MEOS) with a higher Km than ADH; it raises clearance in heavy drinkers <sup class="c" data-ref="Norberg2003,Cederbaum2012" title="Source 59,347">59,347</sup>.`,"drinks"],
 ["Delirium tremens (DT)",`Withdrawal delirium with fluctuating attention and autonomic overactivity, beginning 48–72 h (Mirijello) or 72–96 h (ASAM) after the last drink <sup class="c" data-ref="Mirijello2015,ASAM2020Withdrawal" title="Source 20,332">20,332</sup>.`,"withdrawal"],
 ["Diagnostic orphans",`People with two DSM-IV dependence criteria and no abuse criteria, who received no diagnosis <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`,"criteria"],
 ["Disulfiram",`An ALDH inhibitor (Antabuse) that causes an aversive reaction to alcohol <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>. It works in supervised or open-label trials <sup class="c" data-ref="Skinner2014Disulfiram" title="Source 434">434</sup>.`,"medicines"],
 ["Disulfiram–alcohol reaction",`Flushing, throbbing headache, nausea, vomiting, palpitations and hypotension after alcohol on disulfiram, possible up to 14 days after the last dose <sup class="c" data-ref="FDA-Antabuse" title="Source 112">112</sup>.`,"medicines"],
 ["Dopamine",`A reward transmitter released by alcohol in the human ventral striatum <sup class="c" data-ref="Boileau2003" title="Source 43">43</sup>.`,"brain"],
 ["DSM-5-TR",`The 2022 text revision of DSM-5, which defines AUD by 11 criteria <sup class="c" data-ref="APA2022" title="Source 16">16</sup>.`,"criteria"],
 ["Dynorphin",`A stress-related opioid peptide recruited in the extended amygdala in withdrawal <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`,"brain"],
 ["Early liver transplantation",`Transplant for a first episode of severe AH not responding to treatment, in highly selected people: 6-month survival 77% vs 23% <sup class="c" data-ref="Mathurin2011NEJM" title="Source 319">319</sup>.`,"liver"],
 ["Early remission",`3 to under 12 months with no AUD criteria except craving <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`,"criteria"],
 ["Ethyl glucuronide (EtG)",`A minor ethanol metabolite in urine, detectable for a median of about 78 h after heavy drinking <sup class="c" data-ref="Helander2009EtG" title="Source 173">173</sup>. Incidental exposure can make it positive <sup class="c" data-ref="Thierauf2009TraceEtG" title="Source 455">455</sup>.`,"biomarkers"],
 ["Ethyl sulfate (EtS)",`A minor ethanol metabolite with a urinary time course similar to EtG <sup class="c" data-ref="Helander2009EtG" title="Source 173">173</sup>.`,"biomarkers"],
 ["Extended amygdala",`The brain hub of the withdrawal/negative affect stage <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`,"brain"],
 ["Extended-release naltrexone",`Vivitrol: 380 mg by deep gluteal injection every 4 weeks, given by a healthcare provider (label) <sup class="c" data-ref="FDA-Vivitrol" title="Source 123">123</sup>.`,"medicines"],
 ["Fetal alcohol spectrum disorder (FASD)",`The umbrella term for the effects of prenatal alcohol exposure <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup>; about 7.7 per 1,000 children and youth worldwide <sup class="c" data-ref="Lange2017JAMAPediatr" title="Source 272">272</sup>.`,"pregnancy"],
 ["Fetal alcohol syndrome (FAS)",`The most severe FASD form, first described in 1973 <sup class="c" data-ref="Williams2015AAP" title="Source 497">497</sup>: facial features, growth deficiency, brain effects and neurobehavioural impairment <sup class="c" data-ref="Hoyme2016Pediatrics" title="Source 187">187</sup>.`,"pregnancy"],
 ["First-pass metabolism",`Oxidation of some alcohol in the stomach before it reaches the blood; lower in women and when fasting <sup class="c" data-ref="Frezza1990,Cederbaum2012" title="Source 59,132">59,132</sup>.`,"drinks"],
 ["Front loading",`Giving large early doses of a long-acting benzodiazepine; ASAM 2020 recommends it for severe withdrawal (CIWA-Ar ≥19) <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["GABA-A receptor",`The main inhibitory receptor; ethanol enhances it acutely, and chronic drinking changes its subunits <sup class="c" data-ref="Kumar2009" title="Source 264">264</sup>.`,"brain"],
 ["Gabapentin",`An anticonvulsant used off-label, with a dose-response for abstinence (17.0% at 1,800 mg vs 4.1% placebo) <sup class="c" data-ref="Mason2014Gabapentin" title="Source 318">318</sup>.`,"offlabel"],
 ["Gamma-glutamyltransferase (GGT)",`A liver enzyme that rises with drinking but is not specific; it normalises 2–3 weeks after stopping <sup class="c" data-ref="Niemela2016Biomarkers" title="Source 346">346</sup>.`,"biomarkers"],
 ["Genome-wide association study (GWAS)",`A scan of the genome for common variants; in AUD, ADH1B variants reach genome-wide significance <sup class="c" data-ref="Walters2018" title="Source 488">488</sup>.`,"genes"],
 ["GLP-1 receptor agonists",`Diabetes and obesity medicines under study for AUD, not approved for it <span class="ev early">Early evidence</span> <sup class="c" data-ref="Klausen2026Lancet,Wang2024" title="Source 247,490">247,490</sup>.`,"frontier"],
 ["Hair EtG",`EtG in hair, reflecting months of drinking; 30 pg/mg or more strongly suggests chronic excessive drinking (SoHT 2026) <sup class="c" data-ref="Favretto2026SoHT" title="Source 111">111</sup>.`,"biomarkers"],
 ["Hallucinosis (withdrawal)",`Hallucinations with a clear sensorium at 12–24 h, distinct from delirium tremens; the older name is alcoholic hallucinosis <sup class="c" data-ref="ASAM2020Withdrawal,Saitz1998AHRW" title="Source 20,410">20,410</sup>.`,"withdrawal"],
 ["Harm reduction",`Approaches that lower harm without requiring abstinence, such as cutting down by WHO risk levels or managed alcohol programmes <sup class="c" data-ref="Hasin2017WHO,Carver2026" title="Source 57,170">57,170</sup>.`,"recovery"],
 ["Harmful pattern of use (ICD-11)",`Drinking that has damaged physical or mental health without reaching dependence <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>.`,"criteria"],
 ["Harmful use",`WHO term used with the AUDIT for a drinking pattern already damaging health <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup>.`,"screening"],
 ["Hazardous use",`WHO term for a drinking pattern that raises the risk of harm, even without a current disorder <sup class="c" data-ref="HigginsBiddle2018USAUDIT" title="Source 179">179</sup>.`,"screening"],
 ["Heavy alcohol use",`In US surveys, binge drinking on 5 or more days in the past month <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>.`,"drinks"],
 ["Heritability",`The share of variation in a trait due to genes; about 0.49 for AUD <sup class="c" data-ref="Verhulst2015" title="Source 478">478</sup>.`,"genes"],
 ["High-intensity drinking",`8 or more drinks for women and 10 or more for men, at least twice the binge thresholds <sup class="c" data-ref="Patrick2023HID" title="Source 356">356</sup>.`,"drinks"],
 ["Holiday heart",`Alcohol-triggered heart rhythm disorder, classically AF after binge drinking, named in 1978 <sup class="c" data-ref="Ettinger1978,Day2019Addiction" title="Source 81,105">81,105</sup>.`,"body"],
 ["Hypomagnesaemia",`Low magnesium, found in 44% of one small withdrawal cohort <sup class="c" data-ref="Manning2014" title="Source 311">311</sup>; it can keep potassium low through renal wasting <sup class="c" data-ref="Elisaf2002" title="Source 100">100</sup>.`,"nursing"],
 ["ICD-11 alcohol dependence",`2 of 3 features: impaired control, increasing priority, physiological features <sup class="c" data-ref="Degenhardt2019ICD11" title="Source 84">84</sup>.`,"criteria"],
 ["Ignition interlock",`Interlocks cut re-arrest for alcohol-impaired driving while installed; re-arrest returned to comparison levels once removed <sup class="c" data-ref="Elder2011" title="Source 99">99</sup>.`,"recovery"],
 ["J-curve",`The apparent lower mortality of light drinkers in cohort studies, largely explained by bias <sup class="c" data-ref="Stockwell2016JSAD,Zhao2023JAMANO" title="Source 443,516">443,516</sup>.`,"body"],
 ["Ketamine",`An anaesthetic under study with therapy for AUD <span class="ev early">Early evidence</span> <sup class="c" data-ref="Dakwar2020" title="Source 74">74</sup>.`,"frontier"],
 ["Kindling",`Repeated withdrawals making later withdrawal worse <span class="ev early">Early evidence</span> <sup class="c" data-ref="Becker1998,Brown1988Kindling" title="Source 34,51">34,51</sup>.`,"withdrawal"],
 ["Korsakoff syndrome",`Severe anterograde episodic memory loss with confabulation, usually after Wernicke encephalopathy <sup class="c" data-ref="Kopelman2009,Arts2017" title="Source 19,257">19,257</sup>.`,"wernicke"],
 ["Lille model",`A day-7 steroid-response score; 0.45 or more means nonresponse (6-month survival 25% vs 85%) <sup class="c" data-ref="Louvet2007Lille" title="Source 299">299</sup>.`,"liver"],
 ["Maddrey discriminant function",`4.6 × (PT − control) + bilirubin (mg/dL); 32 or more marks severe AH <sup class="c" data-ref="Carithers1989,Singal2018ACG" title="Source 55,433">55,433</sup>.`,"liver"],
 ["Mammillary bodies",`Small brain structures damaged in Wernicke–Korsakoff syndrome <sup class="c" data-ref="Kopelman2009" title="Source 257">257</sup>.`,"wernicke"],
 ["Managed alcohol programme (MAP)",`Regulated doses of alcohol with housing and health support for people with alcohol dependence who are homeless <span class="ev early">Early evidence</span> <sup class="c" data-ref="Carver2026,Stockwell2021" title="Source 57,444">57,444</sup>.`,"recovery"],
 ["Mean corpuscular volume (MCV)",`Red cell size; it rises with drinking and takes 2–4 months to normalise <sup class="c" data-ref="Niemela2016Biomarkers" title="Source 346">346</sup>.`,"biomarkers"],
 ["MELD",`A score from bilirubin, creatinine and INR; above 20 flags severe AH <sup class="c" data-ref="Kamath2001MELD,Singal2018ACG" title="Source 218,433">218,433</sup>.`,"liver"],
 ["Mendelian randomisation",`Using gene variants as natural experiments; ALDH2/ADH1B studies show no protective U-shape for stroke <sup class="c" data-ref="Millwood2019" title="Source 330">330</sup>.`,"body"],
 ["MEOS",`The microsomal ethanol-oxidising system (CYP2E1), induced by chronic drinking <sup class="c" data-ref="Lieber2004MEOS" title="Source 291">291</sup>.`,"drinks"],
 ["Minimum unit pricing (MUP)",`A floor price per unit of alcohol; Scotland's £0.50 MUP was associated with 13.4% fewer wholly attributable deaths <sup class="c" data-ref="Wyper2023" title="Source 507">507</sup>.`,"recovery"],
 ["Motivational interviewing (MI)",`A counselling approach tested in 93 studies: a small-to-moderate effect vs no intervention right afterwards, shrinking at later follow-up <sup class="c" data-ref="Schwenker2023" title="Source 421">421</sup>.`,"therapy"],
 ["Mutual-help groups",`Peer groups such as AA, SMART Recovery, LifeRing and Women for Sobriety; deeper involvement in each was linked with similar outcomes <sup class="c" data-ref="Zemore2018" title="Source 513">513</sup>.`,"recovery"],
 ["NADH",`A reduced coenzyme made by ADH and ALDH2; its surplus drives fatty liver <sup class="c" data-ref="Cederbaum2012,Lieber2004Fatty" title="Source 59,290">59,290</sup>.`,"drinks"],
 ["Nalmefene",`A mu- and delta-opioid antagonist and kappa partial agonist <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>, approved in the EU and taken as needed to reduce drinking <sup class="c" data-ref="vandenBrink2013Nalmefene" title="Source 473">473</sup>.`,"offlabel"],
 ["Naltrexone",`A mu-opioid antagonist approved for AUD; it reduces heavy drinking and craving <sup class="c" data-ref="FDA-Naltrexone,Maisel2013" title="Source 117,305">117,305</sup>. Opioids must be stopped 7–10 days first (label) <sup class="c" data-ref="FDA-Naltrexone" title="Source 117">117</sup>.`,"medicines"],
 ["Negative reinforcement",`Drinking to relieve a negative emotional state <sup class="c" data-ref="Koob2014" title="Source 254">254</sup>.`,"brain"],
 ["NMDA receptor",`A glutamate receptor that ethanol inhibits acutely and that is up-regulated with tolerance <sup class="c" data-ref="Lovinger1989,TsaiCoyle1998" title="Source 300,466">300,466</sup>.`,"brain"],
 ["Number needed to treat (NNT)",`How many people must be treated for one to benefit; acamprosate 12 and naltrexone 20 to prevent any drinking <sup class="c" data-ref="Jonas2014JAMA" title="Source 209">209</sup>.`,"medicines"],
 ["Nucleus accumbens",`A reward hub in the ventral striatum where alcohol releases dopamine and endogenous opioids <sup class="c" data-ref="Boileau2003,Mitchell2012" title="Source 43,333">43,333</sup>.`,"brain"],
 ["Ondansetron",`Studied in early-onset AUD (70.1% vs 50.2% days abstinent) and by genotype <span class="ev early">Early evidence</span> <sup class="c" data-ref="Johnson2000JAMA,Johnson2011Ondansetron" title="Source 204,207">204,207</sup>.`,"offlabel"],
 ["OPRM1 Asn40Asp",`A mu-opioid receptor variant once thought to predict naltrexone response; a prospective RCT found no interaction <sup class="c" data-ref="Oslin2015JAMAPsych" title="Source 353">353</sup>.`,"frontier"],
 ["PAWSS",`The Prediction of Alcohol Withdrawal Severity Scale: 10 items, 4 or more flags high risk of complicated withdrawal <sup class="c" data-ref="Maldonado2014,Maldonado2015" title="Source 307,308">307,308</sup>.`,"withdrawal"],
 ["Phenobarbital",`A barbiturate for withdrawal, used only by experienced clinicians "given its narrow therapeutic window" <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["Phosphatidylethanol (PEth)",`A blood marker formed only when ethanol is present; average half-life about 4 days <sup class="c" data-ref="Hahn2016PEth" title="Source 158">158</sup>.`,"biomarkers"],
 ["Polygenic score",`A sum of many small genetic effects; for AUD it explains about 2.5–3.5% of the variance and cannot diagnose <sup class="c" data-ref="Barr2020" title="Source 32">32</sup>.`,"genes"],
 ["Prefrontal cortex",`Front of the brain; with the insula, the hub of the preoccupation/anticipation stage <sup class="c" data-ref="KoobVolkow2016" title="Source 256">256</sup>.`,"brain"],
 ["Project MATCH",`A large trial in which CBT, MET and twelve-step facilitation gave similar outcomes <sup class="c" data-ref="ProjectMATCH1997" title="Source 373">373</sup>.`,"therapy"],
 ["Psilocybin-assisted therapy",`Psilocybin sessions with psychotherapy; heavy drinking days 9.7% vs 23.6% in one RCT <span class="ev early">Early evidence</span> <sup class="c" data-ref="Bogenschutz2022" title="Source 42">42</sup>.`,"frontier"],
 ["RASS",`The Richmond Agitation-Sedation Scale, from +4 combative to −5 unarousable <sup class="c" data-ref="Sessler2002RASS" title="Source 428">428</sup>.`,"ciwa"],
 ["Recompensation",`Recovery from decompensated cirrhosis; 31.1% of people who stopped drinking achieved it in one cohort <sup class="c" data-ref="Hofer2026JHep" title="Source 184">184</sup>.`,"liver"],
 ["Recovery (NIAAA 2022)",`Remission from DSM-5 AUD plus cessation of heavy drinking; abstinence is not required <sup class="c" data-ref="Hagman2022" title="Source 157">157</sup>.`,"recovery"],
 ["Recovery capital",`The personal, social and community resources that support recovery <sup class="c" data-ref="Laudet2008" title="Source 277">277</sup>.`,"recovery"],
 ["Refeeding syndrome",`Dangerous shifts in electrolytes when feeding restarts after malnutrition; prior alcohol misuse is a reported risk factor <sup class="c" data-ref="Zheng2025" title="Source 517">517</sup>.`,"nursing"],
 ["Relapse prevention",`Marlatt's model built on high-risk situations, coping, self-efficacy, outcome expectancies and the abstinence violation effect <sup class="c" data-ref="Larimer1999" title="Source 274">274</sup>.`,"therapy"],
 ["Resistant alcohol withdrawal",`Withdrawal uncontrolled despite large benzodiazepine doses; ASAM 2020 notes it "is not well defined" <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["SBIRT",`Screening, Brief Intervention, and Referral to Treatment: a public-health approach built on universal screening <sup class="c" data-ref="Babor2007SBIRT" title="Source 27">27</sup>.`,"screening"],
 ["Semaglutide",`A GLP-1 receptor agonist; in AUD with obesity it cut heavy drinking days 13.7 percentage points more than placebo <span class="ev early">Early evidence</span> <sup class="c" data-ref="Klausen2026Lancet" title="Source 247">247</sup>.`,"frontier"],
 ["SMART Recovery",`A mutual-help alternative to AA; deeper involvement was linked with similar outcomes <sup class="c" data-ref="Zemore2018" title="Source 513">513</sup>.`,"recovery"],
 ["Sodium oxybate (GHB)",`Approved in Italy and Austria for alcohol withdrawal and abstinence; it carries misuse risk and is dangerous with alcohol or other sedatives <sup class="c" data-ref="Guiraud2022SMO,Leone2010Cochrane" title="Source 153,282">153,282</sup>.`,"offlabel"],
 ["Standard drink",`A set amount of ethanol: 0.6 oz in the US <sup class="c" data-ref="KranzlerSoyka2018" title="Source 261">261</sup>; 10 g in GBD, and 8–20 g across countries <sup class="c" data-ref="Kalinowski2016" title="Source 217">217</sup>.`,"drinks"],
 ["Steatohepatitis (ASH)",`Fatty liver with inflammation; about one-third of people with steatosis who keep drinking heavily <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>.`,"liver"],
 ["Steatosis",`Fatty liver; seen in about 90% of people who drink heavily and reversible with abstinence <sup class="c" data-ref="Singal2018ACG" title="Source 433">433</sup>.`,"liver"],
 ["Stigma",`Negative labels and treatment. "Substance abuser" made clinicians more likely to favour punishment <sup class="c" data-ref="Kelly2010Language" title="Source 226">226</sup>; stigma towards AUD stays high <sup class="c" data-ref="Kilian2021" title="Source 240">240</sup>.`,"families"],
 ["STOPAH",`A 1,103-person trial: prednisolone gave no significant mortality benefit and pentoxifylline none <sup class="c" data-ref="Thursz2015STOPAH" title="Source 460">460</sup>.`,"liver"],
 ["Sustained remission",`12 months or more with no AUD criteria except craving <sup class="c" data-ref="Hasin2013" title="Source 169">169</sup>.`,"criteria"],
 ["Symptom-triggered dosing",`Giving withdrawal medicine only when a CIWA-Ar score calls for it; less drug for a shorter time <sup class="c" data-ref="Saitz1994" title="Source 409">409</sup>. ASAM 2020's preferred inpatient method <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"ciwa"],
 ["T-ACE",`A pregnancy screen: Tolerance, Annoyed, Cut down, Eye-opener; 2 or more is positive <sup class="c" data-ref="Sokol1989TACE" title="Source 440">440</sup>.`,"screening"],
 ["Telescoping",`Women's apparently faster progression to AUD and its health consequences <sup class="c" data-ref="Kirsch2025" title="Source 245">245</sup>.`,"nursing"],
 ["Thiamine",`Vitamin B1; deficiency causes Wernicke encephalopathy <sup class="c" data-ref="Sechi2007" title="Source 424">424</sup>. Regimens are quoted as published by EFNS and ASAM <sup class="c" data-ref="Galvin2010EFNS,ASAM2020Withdrawal" title="Source 20,134">20,134</sup>.`,"wernicke"],
 ["Tolerance",`Needing more alcohol for the same effect; a DSM-5 criterion <sup class="c" data-ref="APA2022" title="Source 16">16</sup>, driven partly by receptor adaptation <sup class="c" data-ref="Kumar2009" title="Source 264">264</sup>.`,"brain"],
 ["Topiramate",`An anticonvulsant used off-label; it reduced heavy drinking days, with paresthesia in 50.8% <sup class="c" data-ref="Johnson2007Topiramate" title="Source 206">206</sup>.`,"offlabel"],
 ["Twelve-step facilitation (TSF)",`Manualised therapy that encourages AA involvement; it beat other treatments for 12-month continuous abstinence <sup class="c" data-ref="Kelly2020Cochrane" title="Source 234">234</sup>.`,"recovery"],
 ["UKATT",`A UK trial in which social behaviour and network therapy matched MET; both saved about five times their cost <sup class="c" data-ref="UKATT2005,UKATT2005Cost" title="Source 467,468">467,468</sup>.`,"therapy"],
 ["Unhealthy alcohol use",`The USPSTF term for a spectrum from risky drinking to AUD <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>.`,"screening"],
 ["USPSTF",`The US Preventive Services Task Force; it recommends alcohol screening and brief counselling for adults (B) <sup class="c" data-ref="USPSTF2018Alcohol" title="Source 470">470</sup>.`,"screening"],
 ["Volume of distribution (Widmark r)",`The body water ethanol spreads in: about 0.70 L/kg in men and 0.60 in women <sup class="c" data-ref="Jones2019WIREs" title="Source 213">213</sup>; fixed Widmark factors 0.68 and 0.55 <sup class="c" data-ref="Terpstra2020" title="Source 454">454</sup>.`,"drinks"],
 ["Warm handoff",`A direct, personal link from withdrawal care to AUD treatment providers (ASAM 2020) <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"nursing"],
 ["Wernicke encephalopathy (WE)",`An acute neuropsychiatric syndrome caused by thiamine deficiency, greatly underdiagnosed <sup class="c" data-ref="Sechi2007,Harper1986JNNP" title="Source 166,424">166,424</sup>.`,"wernicke"],
 ["WHO risk drinking levels",`Four levels of average daily intake; dropping 1–2 levels is linked with less dependence and liver disease <sup class="c" data-ref="Hasin2017WHO,Knox2018Liver" title="Source 170,250">170,250</sup>.`,"recovery"],
 ["Withdrawal management",`The term that replaced "detoxification"; on its own "not an effective treatment for alcohol use disorder" <sup class="c" data-ref="ASAM2020Withdrawal" title="Source 20">20</sup>.`,"detox"],
 ["Zero-order kinetics",`Elimination at a constant amount per hour, because ADH is saturated; BAC falls in a straight line <sup class="c" data-ref="Jones2010" title="Source 212">212</sup>.`,"drinks"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation and tag markup, fold Greek letters and hyphens away, so 'b-blocker' or 'cdt' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/α/g,'a').replace(/[-–"]/g,'');
  const L0=GL_T.slice().sort((a,b)=>norm(a[0]).localeCompare(norm(b[0])));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL_T.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, drinking patterns, burden & history',B:'Alcohol in the body and brain: metabolism, neurobiology & genetics',C:'Screening, diagnosis & biomarkers',D:'Alcohol withdrawal: syndrome, CIWA-Ar, management & Wernicke',E:'Medicines for AUD: approved and off-label',F:'Psychosocial treatment, mutual help, course & recovery',G:'Medical harms: liver, cancer, heart, brain, pregnancy & FASD',H:'Nursing, harm reduction, special groups & the research frontier'};
const SO_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const SO_svc=s=>s.unverified?[]:SO_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const SO_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(SO_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>SO_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=SO_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`${nAll} sources in all. ${nAll-nChk} were confirmed against a database before inclusion (some by more than one: ${svcTxt}). Marked <span class="tag warn">check</span> (not cited anywhere in the guide): ${nChk}.`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=SO_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${SO_link(s)?`<a href="${esc(SO_link(s))}" target="_blank" rel="noopener">${esc(SO_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${SO_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} of ${nAll} sources`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};

/* =============== boot =============== */
const h0=location.hash.slice(1);
show(MODS.some(m=>m.id===h0)?h0:store.get('last','home'),true);
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h&&h!==cur&&MODS.some(m=>m.id===h))show(h)});
})();
