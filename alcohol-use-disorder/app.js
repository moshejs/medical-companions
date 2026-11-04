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
const SOURCES=[];
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

/* =============== boot =============== */
const h0=location.hash.slice(1);
show(MODS.some(m=>m.id===h0)?h0:store.get('last','home'),true);
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h&&h!==cur&&MODS.some(m=>m.id===h))show(h)});
})();
