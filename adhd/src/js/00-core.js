<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('adhd:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('adhd:'+k,JSON.stringify(v))}catch(e){}}};
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
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Coordinates are SVG user units.
   brain(x,y,s,o)          a brain in lateral view, front (prefrontal) to the LEFT, s = width (default 200;
                           height about .72*s, plus the brainstem). Deep structures (striatum, thalamus) are
                           drawn see-through. o: {hl:['pfc','str','par','cb','thal','dmn'] regions drawn strong,
                           act:{pfc:0..1,...} extra glow per region, labels (false), sulci (true), op (opacity of
                           the regions, default .55)}. Returns {svg, at:{pfc,str,thal,par,cb,dmnF,dmnP,stem}}
                           where each is [x,y] in the caller's coordinates (for loops, arrows and zoom lines).
   synapse(x,y,s,o)        one synapse, presynaptic terminal on top, cleft, postsynaptic membrane below; s =
                           width (default 200, height .85*s). o: {nt:'da'|'ne' (colour of the transmitter),
                           level 0..1 (dots in the cleft), fuse 0..1 (a vesicle docks and opens), uptake 0..1
                           (arrows from the cleft into the transporters), block 0..1 (medicine molecules sitting
                           in the transporters), reverse 0..1 (arrows OUT of the transporters, as amphetamine
                           reverses them), bound 0..1 (receptors that are occupied), labels (false), tlabel
                           ('DAT' | 'NET'), seed}. Returns {svg, at:{cleft,post,datL,datR,top}}.
   person(x,y,s,fill,o)    a person pictogram for icon arrays (s = height), fill a CSS colour; o.op opacity.
   ped(x,y,sex,aff,o)      a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 diagnosed (rose),
                           .5 half-shaded (amber, e.g. 'some traits' or 'not assessed'); o: {dead, proband, r}.
                           The proband arrow uses marker('pedArrow') defined by the caller.
   desk(x,y,s,o)           a pupil at a school desk, side view, facing right; (x,y) = floor point under the
                           desk's front edge, s = desk width (default 60). o: {fidget 0..1 (body sways, a foot
                           taps), focus 0..1 (a teal beam from the eyes to the page), distract 0..1 (coral sparks
                           around the head), fill (the pupil's colour, default var(--muted)), t (time 0..1, drives
                           the sway)}.
   axes(x,y,w,h,o)         a plot frame with the origin at bottom-left (x, y+h). o: {x0,x1,y0,y1 (domain),
                           xt:[ticks], yt:[ticks], fx,fy (tick formatters), xl,yl (axis titles), grid (true)}.
                           Returns {svg, X(v), Y(v)} so series can be placed on it.
   trace(pts,X,Y,o)        a series [[t,v],...] on an axes() frame as a path; o: {c (colour), w (stroke width),
                           dash, area (fill down to Y(o.base||0) with o.c at .14 opacity), upto (only points with
                           t <= upto, for drawing a curve as the scrubber moves)}.
   wave(x,y,w,amp,o)       an attention / activity / mood wave along y from x to x+w: o: {freq (cycles), phase,
                           noise 0..1 (seeded jitter, a scattered trace), damp 0..1 (amplitude settles toward
                           the right), c, sw, seed}. Returns a path string.
   pill(x,y,s,kind,o)      a medicine glyph, s = length: kind 'tab' (round tablet), 'cap' (two-tone capsule),
                           'er' (oblong extended-release tablet with a laser-drilled hole), 'beads' (capsule
                           showing two bead populations). o: {c (colour, default var(--rx)), rot (degrees)}.
   bubble(x,y,w,h,text,o)  a speech bubble whose body is the box (x,y,w,h) with its tail pointing at (o.tx,o.ty);
                           o.think draws a thought bubble (round tail). text may contain '\n' for two lines.
                           o: {c (border), fill, cls (text class, default t-sm)}.
   clock(x,y,r,h,o)        a clock face with hands for h hours (0..24, 12-hour dial); o.label prints 'HH:MM'
                           under it; o.c the rim colour.
   marker(id,color,size)   an arrowhead <marker> for <defs> (size in stroke widths, default 7). */
function brain(x,y,s=200,o={}){const k=s/200,P=(px,py)=>[x+px*k,y+py*k],hl=o.hl||[],act=o.act||{},op=o.op==null?.55:o.op;
  const T=`translate(${f1(x)} ${f1(y)}) scale(${(+k).toFixed(4)})`,ns='vector-effect="non-scaling-stroke"';
  const out='M30 95C10 80 12 40 45 25C70 8 120 5 150 20C180 32 196 60 188 86C184 99 172 106 160 108C142 116 116 120 98 113C82 125 56 122 47 109C40 106 34 101 30 95Z';
  const reg={pfc:['ellipse',{cx:44,cy:58,rx:27,ry:27},'--pfc'],par:['ellipse',{cx:140,cy:36,rx:28,ry:16},'--par'],
    cb:['path',{d:'M140 112C150 104 178 102 186 112C190 124 178 134 162 134C148 134 136 126 140 112Z'},'--cb'],
    str:['path',{d:'M78 60C84 48 104 46 112 56C116 62 110 70 102 70C96 71 94 78 98 84C92 88 82 84 80 76C76 70 76 64 78 60Z'},'--str'],
    thal:['ellipse',{cx:116,cy:78,rx:11,ry:8},'--str'],
    dmn:['g',null,'--dmn']};
  let g=`<g transform="${T}">`;
  /* brainstem first, so the hemisphere hides its top */
  g+=`<path d="M110 100C114 120 118 134 116 148L130 148C130 132 132 118 136 104Z" ${ns} style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.3"/>`;
  g+=`<path d="${out}" ${ns} style="fill:var(--brain);stroke:var(--brain-line);stroke-width:1.6;stroke-linejoin:round"/>`;
  if(o.sulci!==false)g+=`<path d="M78 24C84 44 80 60 92 72M120 14C116 30 124 44 118 58M60 92C80 96 104 94 124 100M150 24C156 46 170 58 186 66" ${ns} style="fill:none;stroke:var(--brain-line);stroke-width:1;opacity:.45;stroke-linecap:round"/>`;
  for(const [id,[tag,a,tok]] of Object.entries(reg)){
    const on=hl.includes(id),glow=clamp(act[id]||0),alpha=clamp((on?.9:op*.55)+glow*.45);
    if(id==='dmn'){if(!on&&!act.dmn)continue;[[30,66],[124,46],[164,62]].forEach(([cx,cy])=>{g+=`<circle cx="${cx}" cy="${cy}" r="${on?7:5}" ${ns} style="fill:var(${tok});opacity:${f1(alpha)};stroke:var(--brain-line);stroke-width:${on?1.2:.6}"/>`});continue}
    const attrs=Object.entries(a).map(([kk,v])=>`${kk}="${v}"`).join(' ');
    const deep=id==='str'||id==='thal';
    g+=`<${tag} ${attrs} ${ns} style="fill:var(${tok});opacity:${f1(alpha)};stroke:var(--brain-line);stroke-width:${on?1.4:.7};${deep?'stroke-dasharray:3 2':''}"/>`;
    if(glow>0)g+=`<${tag} ${attrs} ${ns} style="fill:none;stroke:var(--brand);stroke-width:${f1(1+glow*3)};opacity:${f1(glow*.8)}"/>`}
  g+='</g>';
  const at={pfc:P(44,58),str:P(95,64),thal:P(116,78),par:P(140,36),cb:P(162,120),dmnF:P(30,66),dmnP:P(124,46),stem:P(120,146)};
  /* labels sit outside the outline (cortex above, deep and hind structures below) with short leaders */
  if(o.labels){const L=[['pfc','Prefrontal cortex',40,-8,40,30],['par','Parietal cortex',150,-8,146,22],['str','Striatum',70,140,88,72],['cb','Cerebellum',172,150,166,132]];
    L.forEach(([id,t,lx,ly,ax,ay])=>{const [X1,Y1]=P(lx,ly),[X2,Y2]=P(ax,ay);
      g+=`<line x1="${f1(X1)}" y1="${f1(Y1+(ly<0?4:-11))}" x2="${f1(X2)}" y2="${f1(Y2)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(X1)}" y="${f1(Y1)}" class="t-xs t-mid" style="fill:var(--ink)">${t}</text>`})}
  return {svg:g,at}}
function synapse(x,y,s=200,o={}){const k=s/200,P=(px,py)=>[x+px*k,y+py*k],rr=rng(o.seed||11);
  const nt=o.nt==='ne'?'var(--ne)':'var(--da)',lv=clamp(o.level||0),fz=clamp(o.fuse||0),up=clamp(o.uptake||0),bk=clamp(o.block||0),rv=clamp(o.reverse||0),bd=clamp(o.bound==null?lv:o.bound);
  const T=`translate(${f1(x)} ${f1(y)}) scale(${(+k).toFixed(4)})`,ns='vector-effect="non-scaling-stroke"';
  let g=`<g transform="${T}">`;
  /* presynaptic terminal: axon from the top swelling into a bouton with a flat membrane at y=96 */
  g+=`<path d="M86 0V20C42 26 28 58 38 86Q43 96 58 96H142Q157 96 162 86C172 58 158 26 114 20V0Z" ${ns} style="fill:var(--cell);stroke:var(--neuron);stroke-width:1.6"/>`;
  /* postsynaptic membrane and its cell */
  g+=`<path d="M14 170V130Q14 120 24 120H176Q186 120 186 130V170" ${ns} style="fill:var(--cell);stroke:var(--neuron);stroke-width:1.6"/>`;
  /* vesicles; the first one docks and opens as fuse goes 0 -> 1 */
  const V=[[70,50],[100,42],[130,52],[84,72],[118,74],[100,60]];
  V.forEach(([vx,vy],i)=>{let cx=vx,cy=vy,open=0;if(i===5){cy=lerp(vy,88,ease(clamp(fz*1.6)));open=clamp((fz-.6)/.4)}
    g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="9" ${ns} style="fill:var(--panel);stroke:var(--neuron);stroke-width:1;${open?`stroke-dasharray:${f1(56*(1-open)+.1)} 60`:''}"/>`;
    const nd=i===5?Math.round(5*(1-open)):5;for(let j=0;j<nd;j++){const a=j/5*Math.PI*2+i;g+=`<circle cx="${f1(cx+Math.cos(a)*4.2)}" cy="${f1(cy+Math.sin(a)*4.2)}" r="1.9" style="fill:${nt}"/>`}});
  /* transporters straddle the presynaptic membrane at both sides */
  const TR=[[50,93],[150,93]];
  TR.forEach(([tx,ty],i)=>{g+=`<rect x="${tx-6}" y="${ty-9}" width="12" height="16" rx="4" ${ns} style="fill:var(--dat);opacity:.9;stroke:var(--neuron);stroke-width:.8"/><line x1="${tx}" x2="${tx}" y1="${ty-7}" y2="${ty+5}" style="stroke:var(--cell);stroke-width:2.2"/>`;
    if(bk>0)g+=`<g style="opacity:${f1(bk)}"><circle cx="${tx}" cy="${ty+1}" r="5.4" ${ns} style="fill:var(--drug);stroke:var(--panel);stroke-width:1"/><circle cx="${tx+(i?-5:5)}" cy="${ty+6}" r="2.6" style="fill:var(--drug)"/></g>`;
    if(up>0&&bk<.5){const d=i?1:-1;g+=`<path d="M${tx-d*22} ${ty+18}Q${tx-d*8} ${ty+16} ${tx} ${ty+7}" ${ns} style="fill:none;stroke:var(--dat);stroke-width:1.6;opacity:${f1(up)}" marker-end="url(#synArr)"/>`}
    if(rv>0){const d=i?1:-1;g+=`<path d="M${tx} ${ty+4}Q${tx-d*6} ${ty+18} ${tx-d*20} ${ty+20}" ${ns} style="fill:none;stroke:var(--drug);stroke-width:1.8;opacity:${f1(rv)}" marker-end="url(#synArrR)"/>`}});
  g+=`<defs>${marker('synArr','var(--dat)')}${marker('synArrR','var(--drug)')}</defs>`;
  /* receptors on the postsynaptic membrane: cups that fill when occupied */
  const R=[60,84,116,140];R.forEach((rx,i)=>{const occ=bd>(i+.5)/R.length;
    g+=`<path d="M${rx-6} 114V121H${rx+6}V114" ${ns} style="fill:none;stroke:var(--rcpt);stroke-width:2.2;stroke-linejoin:round"/>`;
    if(occ)g+=`<circle cx="${rx}" cy="116" r="2.6" style="fill:${nt}"/>`});
  /* transmitter in the cleft */
  const n=Math.round(lv*22);for(let j=0;j<22;j++){const px=34+rr()*132,py=99+rr()*14;if(j<n)g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.2" style="fill:${nt}"/>`}
  g+='</g>';
  if(o.labels){const lab=(t,px,py,c='t-xs')=>{const [lx,ly]=P(px,py);return `<text x="${f1(lx)}" y="${f1(ly)}" class="${c} t-mid">${t}</text>`};
    g+=lab('Presynaptic',46,12)+lab('Postsynaptic cell',100,152)+lab(o.tlabel||'DAT',50,74)+lab(o.tlabel||'DAT',150,74)}
  return {svg:g,at:{cleft:P(100,108),post:P(100,140),datL:P(50,93),datR:P(150,93),top:P(100,0)}}}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--dz)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--da);stroke:none"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function desk(x,y,s=60,o={}){const k=s/60,fd=clamp(o.fidget||0),fc=clamp(o.focus||0),ds=clamp(o.distract||0),t=o.t||0,fill=o.fill||'var(--muted)';
  const sway=fd*Math.sin(t*Math.PI*14)*7,tap=fd*Math.abs(Math.sin(t*Math.PI*22))*3;
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${(+k).toFixed(4)})">`;
  /* desk: top, front leg, back leg; chair to the left */
  g+=`<rect x="-4" y="-34" width="54" height="5" rx="2" style="fill:var(--desk)"/><rect x="44" y="-30" width="4" height="30" style="fill:var(--desk)"/><rect x="0" y="-30" width="4" height="30" style="fill:var(--desk);opacity:.6"/>`;
  g+=`<rect x="10" y="-38" width="16" height="4" rx="1" style="fill:var(--panel);stroke:var(--line);stroke-width:.8"/>`;
  g+=`<path d="M-30 -20H-12V0M-30 -20V0M-30 -20V-46" style="fill:none;stroke:var(--desk);stroke-width:3;stroke-linecap:round"/>`;
  /* pupil, seated: torso rotates about the hip */
  g+=`<g transform="rotate(${f1(sway)} -20 -22)"><circle cx="-14" cy="-58" r="7" style="fill:${fill}"/><path d="M-26 -22Q-27 -46 -16 -48Q-8 -48 -6 -36L0 -36" style="fill:none;stroke:${fill};stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/></g>`;
  g+=`<path d="M-20 -22H-4V${f1(-2-tap)}" style="fill:none;stroke:${fill};stroke-width:5;stroke-linecap:round;stroke-linejoin:round"/>`;
  if(fc>0)g+=`<path d="M-8 -58L12 -40L26 -40Z" style="fill:var(--accent);opacity:${f1(fc*.28)}"/>`;
  if(ds>0)for(let i=0;i<5;i++){const a=-Math.PI*.9+i*.45+t*3,rr=14+ds*6;g+=`<path d="M${f1(-14+Math.cos(a)*rr)} ${f1(-58+Math.sin(a)*rr)}l${f1(Math.cos(a)*5)} ${f1(Math.sin(a)*5)}" style="stroke:var(--drug);stroke-width:2;stroke-linecap:round;opacity:${f1(ds)}"/>`}
  return g+'</g>'}
function axes(x,y,w,h,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1;
  const X=v=>x+(v-x0)/(x1-x0)*w,Y=v=>y+h-(v-y0)/(y1-y0)*h,fx=o.fx||(v=>v),fy=o.fy||(v=>v);let s='';
  (o.yt||[]).forEach(v=>{if(o.grid!==false)s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`;s+=`<text x="${f1(x-6)}" y="${f1(Y(v)+3.5)}" class="t-xs t-end">${fy(v)}</text>`});
  (o.xt||[]).forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(y+h)}" y2="${f1(y+h+4)}" class="axis"/><text x="${f1(X(v))}" y="${f1(y+h+15)}" class="t-xs t-mid">${fx(v)}</text>`});
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  if(o.xl)s+=`<text x="${f1(x+w)}" y="${f1(y+h+29)}" class="t-xs t-end">${o.xl}</text>`;
  if(o.yl)s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-xs">${o.yl}</text>`;
  return {svg:s,X,Y}}
function trace(pts,X,Y,o={}){const P=pts.filter(p=>o.upto==null||p[0]<=o.upto);if(P.length<2)return '';
  const d=P.map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))).join('');const c=o.c||'var(--brand)';let s='';
  if(o.area){const b=Y(o.base||0);s+=`<path d="${d}L${f1(X(P[P.length-1][0]))} ${f1(b)}L${f1(X(P[0][0]))} ${f1(b)}Z" style="fill:${c};opacity:.14"/>`}
  return s+`<path d="${d}" style="fill:none;stroke:${c};stroke-width:${o.w||2.2};stroke-linejoin:round;stroke-linecap:round;${o.dash?`stroke-dasharray:${o.dash}`:''}"/>`}
function wave(x,y,w,amp,o={}){const rr=rng(o.seed||3),N=Math.max(24,Math.round(w/3)),fr=o.freq||3,ph=o.phase||0,nz=o.noise||0,dp=o.damp||0;let d='';
  for(let i=0;i<=N;i++){const u=i/N,a=amp*(1-dp*u),v=Math.sin((u*fr+ph)*Math.PI*2)*a+(rr()-.5)*2*nz*amp;d+=(i?'L':'M')+f1(x+u*w)+' '+f1(y-v)}
  return `<path d="${d}" style="fill:none;stroke:${o.c||'var(--brand)'};stroke-width:${o.sw||2};stroke-linejoin:round;stroke-linecap:round"/>`}
function pill(x,y,s=30,kind='cap',o={}){const c=o.c||'var(--rx)',h=s*.42;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot||0)})">`;
  if(kind==='tab')g+=`<circle r="${f1(s*.36)}" style="fill:var(--panel);stroke:${c};stroke-width:1.8"/><line x1="${f1(-s*.22)}" x2="${f1(s*.22)}" y1="0" y2="0" style="stroke:${c};stroke-width:1.4"/>`;
  else if(kind==='er')g+=`<rect x="${f1(-s/2)}" y="${f1(-h/2)}" width="${f1(s)}" height="${f1(h)}" rx="${f1(h*.45)}" style="fill:${c};stroke:${c};stroke-width:1"/><circle cx="${f1(s*.32)}" cy="0" r="${f1(h*.12)}" style="fill:var(--panel)"/>`;
  else{g+=`<path d="M0 ${f1(-h/2)}H${f1(-s/2+h/2)}A${f1(h/2)} ${f1(h/2)} 0 0 0 ${f1(-s/2+h/2)} ${f1(h/2)}H0Z" style="fill:${c}"/><path d="M0 ${f1(-h/2)}H${f1(s/2-h/2)}A${f1(h/2)} ${f1(h/2)} 0 0 1 ${f1(s/2-h/2)} ${f1(h/2)}H0Z" style="fill:var(--panel);stroke:${c};stroke-width:1.4"/>`;
    if(kind==='beads'){const rr=rng(9);for(let i=0;i<9;i++){const bx=-s*.4+rr()*s*.8,by=(rr()-.5)*h*.5;g+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(h*.11)}" style="fill:${i%2?'var(--drug)':'var(--da)'};opacity:.9"/>`}}}
  return g+'</g>'}
function bubble(x,y,w,h,text,o={}){const c=o.c||'var(--line)',fill=o.fill||'var(--panel)',tx=o.tx==null?x+w*.25:o.tx,ty=o.ty==null?y+h+14:o.ty;let g='';
  if(o.think){g+=`<circle cx="${f1(lerp(x+w/2,tx,.55))}" cy="${f1(lerp(y+h,ty,.55))}" r="4" style="fill:${fill};stroke:${c};stroke-width:1.3"/><circle cx="${f1(lerp(x+w/2,tx,.9))}" cy="${f1(lerp(y+h,ty,.9))}" r="2.4" style="fill:${fill};stroke:${c};stroke-width:1.2"/>`;
    g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h/2,16))}" style="fill:${fill};stroke:${c};stroke-width:1.4"/>`}
  else{const bx=clamp(tx,x+10,x+w-24);g+=`<path d="M${f1(x+8)} ${f1(y)}H${f1(x+w-8)}Q${f1(x+w)} ${f1(y)} ${f1(x+w)} ${f1(y+8)}V${f1(y+h-8)}Q${f1(x+w)} ${f1(y+h)} ${f1(x+w-8)} ${f1(y+h)}H${f1(bx+14)}L${f1(tx)} ${f1(ty)}L${f1(bx+4)} ${f1(y+h)}H${f1(x+8)}Q${f1(x)} ${f1(y+h)} ${f1(x)} ${f1(y+h-8)}V${f1(y+8)}Q${f1(x)} ${f1(y)} ${f1(x+8)} ${f1(y)}Z" style="fill:${fill};stroke:${c};stroke-width:1.4;stroke-linejoin:round"/>`}
  const L=String(text).split('\n'),cls=o.cls||'t-sm';L.forEach((t,i)=>{g+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+4+(i-(L.length-1)/2)*13)}" class="${cls} t-mid" style="fill:var(--ink)">${t}</text>`});
  return g}
function clock(x,y,r=22,h=8,o={}){const hh=((h%12)+12)%12,mm=(h%1)*60,ah=(hh/12)*Math.PI*2-Math.PI/2,am=(mm/60)*Math.PI*2-Math.PI/2;
  let g=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:${o.c||'var(--ink)'};stroke-width:1.6"/>`;
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g+=`<line x1="${f1(x+Math.cos(a)*r*.8)}" y1="${f1(y+Math.sin(a)*r*.8)}" x2="${f1(x+Math.cos(a)*r*.92)}" y2="${f1(y+Math.sin(a)*r*.92)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  g+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+Math.cos(ah)*r*.5)}" y2="${f1(y+Math.sin(ah)*r*.5)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+Math.cos(am)*r*.76)}" y2="${f1(y+Math.sin(am)*r*.76)}" style="stroke:var(--brand);stroke-width:1.6;stroke-linecap:round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2" style="fill:var(--ink)"/>`;
  if(o.label){const H24=Math.floor(((h%24)+24)%24),M=Math.floor(mm);g+=`<text x="${f1(x)}" y="${f1(y+r+14)}" class="t-xs t-mid">${String(H24).padStart(2,'0')}:${String(M).padStart(2,'0')}</text>`}
  return g}
function marker(id,color='var(--muted)',size=7){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${size}" markerHeight="${size}" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What ADHD is',g:1,n:'1.1',d:'How common it is, in whom, and how often it lasts into adulthood'},
 {id:'brain',t:'The ADHD brain',g:1,n:'1.2',d:'Networks, cortical maturation and what brain scans can and cannot show'},
 {id:'dopamine',t:'Dopamine & noradrenaline',g:1,n:'1.3',d:'Catecholamine signalling, reward timing and the inverted-U'},
 {id:'genes',t:'Genes & heritability',g:1,n:'1.4',d:'Twin studies, many small genetic effects, and what family history means'},
 {id:'risk',t:'Environment, risk & myths',g:1,n:'1.5',d:'Prematurity, prenatal exposures, relative age, and what does not cause ADHD'},
 {id:'signs',t:'Signs across the lifespan',g:2,n:'2.1',d:'Preschool to adulthood: how ADHD looks at each age'},
 {id:'criteria',t:'DSM-5-TR criteria calculator',g:2,n:'2.2',d:'Count the symptoms, then check age, settings and impairment'},
 {id:'scales',t:'Rating scales & assessment',g:2,n:'2.3',d:'ASRS, Vanderbilt, SNAP-IV and Conners, and why a screener is not a diagnosis'},
 {id:'differential',t:'Look-alikes & co-occurring conditions',g:2,n:'2.4',d:'Anxiety, autism, sleep, learning, mood and trauma: telling apart and spotting together'},
 {id:'women',t:'Girls, women & late diagnosis',g:2,n:'2.5',d:'Why ADHD is missed in girls and adults, and what changes with diagnosis'},
 {id:'stimulants',t:'How stimulants work',g:3,n:'3.1',d:'Methylphenidate and amphetamines at the synapse'},
 {id:'release',t:'Formulations & the daily curve',g:3,n:'3.2',d:'Immediate- and extended-release, prodrugs, onset and duration'},
 {id:'nonstim',t:'Non-stimulant medicines',g:3,n:'3.3',d:'Atomoxetine, viloxazine, guanfacine and clonidine'},
 {id:'compare',t:'How well treatments work',g:3,n:'3.4',d:'Effect sizes from trials, children versus adults'},
 {id:'safety',t:'Side effects, safety & misuse',g:3,n:'3.5',d:'Appetite, sleep, growth, heart, mood, misuse and diversion'},
 {id:'parenting',t:'Parent training & classroom support',g:4,n:'4.1',d:'Behavioural parent training, school strategies and preschoolers'},
 {id:'therapy',t:'CBT, coaching & adult support',g:4,n:'4.2',d:'Psychological treatment for teens and adults, and what has evidence'},
 {id:'mta',t:'The MTA study & long-term treatment',g:4,n:'4.3',d:'Medication, behaviour therapy or both: 14 months to 16 years'},
 {id:'outcomes',t:'Course & outcomes',g:5,n:'5.1',d:'Persistence, injuries, mortality and what treatment changes'},
 {id:'living',t:'Living with ADHD',g:5,n:'5.2',d:'School, university, work, driving, money, relationships and family'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Assessment, medication safety, monitoring and teaching'},
 {id:'frontiers',t:'Research frontiers',g:5,n:'5.4',d:'New medicines, devices and digital tools, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Crichton and Still to DSM-5-TR'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['The condition','g-dz','c-dz'],2:['Recognising & diagnosing','g-dx','c-dx'],3:['Medication','g-rx','c-rx'],4:['Behavioural & psychological care','g-beh','c-beh'],5:['Living with ADHD','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('adhd:tab');sessionStorage.setItem('adhd:tab','1')}catch(e){}
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
    u+=`<div class="unit"><p class="eyebrow">%t:part%${g}</p><h2>${GROUPS[g][0].replace('&','&amp;')}</h2><ol>`;
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
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>%t:nav.prev%</small><span>${p.t.replace('&','&amp;')}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>%t:nav.next%</small><span>${n.t.replace('&','&amp;')}</span></button>`:'');
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
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent='%t:theme.label%'+{auto:'%t:theme.auto%',light:'%t:theme.light%',dark:'%t:theme.dark%'}[m]}
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
function playWire(rg,pb,draw,dur,doneLabel='%t:player.replay%',hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent='%t:player.play%'}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
  rg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pb.click()}});
  if(!rg.getAttribute('aria-keyshortcuts'))rg.setAttribute('aria-keyshortcuts','Enter Space');
  pb.addEventListener('click',()=>{if(stopA){stop();return}let t0=+rg.value;const mx=+rg.max||1,mn=+rg.min||0;if(t0>=mx-(mx-mn)*.01)t0=mn;pb.textContent='%t:player.pause%';
    stopA=animate((mx-t0)/(mx-mn)*dur,p=>{const t=t0+(mx-t0)*p;rg.value=t;draw(t)},()=>{stopA=null;pb.textContent=doneLabel})});
  if(hideKey){const prev=onHide[hideKey];onHide[hideKey]=()=>{prev&&prev();stop()}}
  if(hideKey){const prevR=redraws[hideKey];redraws[hideKey]=()=>{prevR&&prevR();stop();draw(+rg.value)}}
  return stop;
}
/* stepper buttons that jump the timeline */
function stepWire(el,steps,rg,draw,stop){
  el.innerHTML=steps.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop&&stop();const s=steps[+b.dataset.st];rg.value=s.at;draw(s.at)});
  el.setAttribute('role','group');el.setAttribute('aria-label','%t:player.steps%');
  return i=>{$$('[data-st]',el).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    /* screen readers hear the step name, not a bare number, when the slider moves */
    if(rg&&steps[i])rg.setAttribute('aria-valuetext',`%t:player.step{n:i+1,total:steps.length,name:steps[i].t}%`)};
}
function phaseOf(steps,t){let p=0;steps.forEach((s,i)=>{if(t>=s.from)p=i});return p}
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>%t:note.plain%</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>%t:note.hook%</b>${P.hook}</div>`:''}`}
