(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('bip:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('bip:'+k,JSON.stringify(v))}catch(e){}}};
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
   no glyph encodes a measured value unless the caller passes one in.
   Mood is a number v from -1 (severe depression) through 0 (euthymia, steady mood) to +1 (severe
   mania). The kit's default band edges are EU=.15 (|v| below it is the steady band) and HYPO=.5
   (elevated mood between .15 and .5 is drawn in the hypomania band, above .5 in the mania band).
   They are drawing conventions, not clinical cut-offs: DSM-5-TR separates hypomania from mania by
   duration and impairment, not by height, and a builder must say so where it matters.
   moodSeries(knots)          a smooth mood course from knots [[u,v],...] (u 0..1 along the timeline,
                              v -1..1), Catmull-Rom between knots, clamped to -1..1. Returns f(u) with
                              f.pole(u) -> 'up' | 'eu' | 'down' (using the default band edges).
   lifechart(x,y,w,h,f,o)     a life chart (mood chart) in the box: the mania, hypomania, steady and
                              depression bands, a dashed midline, and f drawn as a line coloured by pole
                              with a soft fill between the line and the midline (gold above, slate-blue
                              below). o: {upto (draw to this u, default 1), id (unique prefix for its
                              clipPaths: REQUIRED when two charts share an svg), labels (true: band names at
                              the left), mixed ([[u0,u1],...] shaded mauve as mixed features), dot (true),
                              eu, hypo (band edges), lw (line width, 2.6), ghost (true: thin, faint, no fill;
                              for a comparison course)}. Returns {svg, at(u)->[x,y], Y(v)->y, X(u)->x}.
   brain(x,y,s,o)             a side-view brain, front to the LEFT, centred on (x,y); s = scale (1 = 160
                              wide, about 120 tall with the brainstem). o: {hl:{pfc,acc,amyg,hippo,scn,stri:
                              0..1 glow}, labels (true: region names with leader lines)}. scn is the
                              suprachiasmatic nucleus (body clock) in the hypothalamus; stri the striatum.
                              Returns {svg, at:{pfc,acc,amyg,hippo,scn,stri: [x,y]}}.
   synapse(x,y,s,o)           a synapse: presynaptic bouton above, the cleft, a postsynaptic membrane with
                              receptors below. o: {n (0..1 transmitter released), tx (colour of the dots,
                              var(--nt) = dopamine), label, block (0..1 receptors blocked, as by an
                              antipsychotic), seed}.
   person(x,y,s,fill,o)       a person pictogram for icon arrays (s = height), fill a CSS colour; o.op.
   clock24(cx,cy,r,o)         a 24-hour dial, midnight at the top: the sleep arc from o.sleep [bed, wake]
                              in clock hours (default [23,7]) in --night, the waking arc in --day, hour
                              ticks with 0/6/12/18 labels, and an optional hand at o.h (hour). o.label
                              (text under it), o.small (no hour labels). Returns {svg, P(h,rr)->[x,y]}.
   sleepbar(x,y,w,h,o)        a horizontal 24-hour bar from noon to noon with the sleep block shaded:
                              o.sleep [bed, wake] in clock hours, o.broken (0..1: gaps of waking in the
                              night), o.label (left text), o.hours (true: "7 h" at the right). Returns
                              {svg, X(hour)->x}.
   ion(x,y,kind,o)            an ion: kind 'li' (lithium, Li+, --li) or 'na' (sodium, Na+, --na); o.r
                              (radius, 8), o.op, o.txt (false: no symbol).
   pill(x,y,s,o)              a tablet centred at (x,y), s = length; o: {ang (degrees), col (var(--rx)),
                              txt (a short label printed on it, e.g. 'Li'), round (true: a round tablet)}.
   kidney(x,y,s,o)            a kidney with one nephron sketched inside, centred on (x,y); s = scale
                              (1 = about 90 wide, 120 tall). o: {hl (0..1: the proximal tubule glows, where
                              lithium and sodium are reabsorbed together), flow (0..1: urine output
                              arrow strength), label}. Returns {svg, at:{glom,prox,distal,out}}.
   ladder(x,y,w,h,steps,o)    rising stairs from bottom-left, one step per label (a treatment ladder, a
                              titration, a safety plan). o: {at (index highlighted), col (var(--rx)), done
                              (steps before at drawn as done)}. Returns {svg, top(i)->[x,y]}.
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big (ticks
                              above)}. Returns {svg, X(v)->x}.
   ped(x,y,sex,aff,o)         a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected
                              (bipolar disorder), .5 half shaded (another mood disorder, e.g. depression);
                              o: {dead, proband, r}. Needs marker('pedArrow') in <defs> for a proband.
   marker(id,color)           an arrowhead <marker> for <defs>. */
const EU=.15,HYPO=.5;
function moodSeries(K){const k=K.slice().sort((a,b)=>a[0]-b[0]);
  const f=u=>{if(u<=k[0][0])return k[0][1];if(u>=k[k.length-1][0])return k[k.length-1][1];
    let i=0;while(i<k.length-2&&u>k[i+1][0])i++;
    const p0=k[Math.max(0,i-1)],p1=k[i],p2=k[i+1],p3=k[Math.min(k.length-1,i+2)],t=(u-p1[0])/(p2[0]-p1[0]||1);
    const m1=(p2[1]-p0[1])/((p2[0]-p0[0])||1)*(p2[0]-p1[0]),m2=(p3[1]-p1[1])/((p3[0]-p1[0])||1)*(p2[0]-p1[0]);
    const t2=t*t,t3=t2*t;return clamp((2*t3-3*t2+1)*p1[1]+(t3-2*t2+t)*m1+(-2*t3+3*t2)*p2[1]+(t3-t2)*m2,-1,1)};
  f.pole=u=>{const v=f(u);return v>EU?'up':v<-EU?'down':'eu'};return f}
let _lc=0;
function lifechart(x,y,w,h,f,o={}){const up=o.upto==null?1:clamp(o.upto),eu=o.eu||EU,hy=o.hypo||HYPO,id=o.id||('lc'+(++_lc)),lw=o.lw||2.6;
  const Y=v=>y+h*(1-v)/2,X=u=>x+w*u,at=u=>[X(u),Y(f(u))];let s='',lab='';
  if(!o.ghost){
    s+=`<rect x="${f1(x)}" y="${f1(Y(1))}" width="${f1(w)}" height="${f1(Y(hy)-Y(1))}" style="fill:var(--up-soft)"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(Y(hy))}" width="${f1(w)}" height="${f1(Y(eu)-Y(hy))}" style="fill:var(--up-soft);opacity:.5"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(Y(eu))}" width="${f1(w)}" height="${f1(Y(-eu)-Y(eu))}" style="fill:var(--eu-soft)"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(Y(-eu))}" width="${f1(w)}" height="${f1(Y(-1)-Y(-eu))}" style="fill:var(--down-soft)"/>`;
    (o.mixed||[]).forEach(([a,b])=>{s+=`<rect x="${f1(X(a))}" y="${f1(y)}" width="${f1(X(b)-X(a))}" height="${f1(h)}" style="fill:var(--mixed-fill);opacity:.22"/><text x="${f1((X(a)+X(b))/2)}" y="${f1(y+h-6)}" class="t-xs t-mid" style="fill:var(--mixed)">mixed</text>`});
    s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--eu);stroke-width:1.2;stroke-dasharray:2 4;stroke-linecap:round"/>`;
    if(o.labels){const L=[[1,'mania','var(--up)'],[hy,'hypomania','var(--up)'],[eu,'steady (euthymia)','var(--eu)'],[-eu,'depression','var(--down)']];
      L.forEach(([v,t,c])=>{lab+=`<text x="${f1(x+6)}" y="${f1(Y(v)+12)}" class="t-xs" style="fill:${c};paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round">${t}</text>`})}}
  if(up>0){const N=Math.max(2,Math.round(180*up));let d='';for(let i=0;i<=N;i++){const p=at(up*i/N);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    if(o.ghost)return {svg:s+`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.4;opacity:.55;stroke-dasharray:5 4"/>`,at,Y,X};
    const area=`${d}L${f1(X(up))} ${f1(Y(0))}L${f1(x)} ${f1(Y(0))}Z`,yE=Y(eu),yD=Y(-eu);
    s+=`<defs><clipPath id="${id}u"><rect x="${f1(x)}" y="${f1(y-6)}" width="${f1(w)}" height="${f1(yE-y+6)}"/></clipPath><clipPath id="${id}e"><rect x="${f1(x)}" y="${f1(yE)}" width="${f1(w)}" height="${f1(yD-yE)}"/></clipPath><clipPath id="${id}d"><rect x="${f1(x)}" y="${f1(yD)}" width="${f1(w)}" height="${f1(y+h-yD+6)}"/></clipPath></defs>`;
    s+=`<path d="${area}" clip-path="url(#${id}u)" style="fill:var(--up-fill);opacity:.3"/><path d="${area}" clip-path="url(#${id}d)" style="fill:var(--down-fill);opacity:.3"/>`;
    [['u','var(--up-fill)'],['e','var(--eu)'],['d','var(--down-fill)']].forEach(([k,c])=>{s+=`<path d="${d}" clip-path="url(#${id}${k})" style="fill:none;stroke:${c};stroke-width:${lw};stroke-linejoin:round;stroke-linecap:round"/>`});
    if(o.dot){const p=at(up),pl=f.pole?f.pole(up):'eu',c=pl==='up'?'var(--up-fill)':pl==='down'?'var(--down-fill)':'var(--eu)';s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5.5" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`}}
  return {svg:s+lab,at,Y,X}}
function brain(x,y,s=1,o={}){const hl=o.hl||{},P=(a,b)=>[x+a*s,y+b*s];
  const A={pfc:P(-50,-16),acc:P(-18,-14),stri:P(-12,4),scn:P(-26,16),amyg:P(-6,24),hippo:P(14,22)};
  const COL={pfc:'var(--pfc)',acc:'var(--pfc)',stri:'var(--nt)',scn:'var(--day)',amyg:'var(--amyg)',hippo:'var(--hippo)'};
  const NM={pfc:'Prefrontal cortex',acc:'Anterior cingulate',stri:'Striatum',scn:'Body clock (SCN)',amyg:'Amygdala',hippo:'Hippocampus'};
  const sw=v=>f1(v/s);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M22 34C26 44 26 54 30 62L40 62C36 52 36 42 34 32Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.4)}"/>`;
  g+=`<ellipse cx="50" cy="36" rx="20" ry="12" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.4)}"/>`;
  g+=`<path d="M-72 6C-80 -20 -62 -48 -30 -54C-8 -60 20 -58 42 -48C66 -38 80 -16 76 6C74 22 62 30 48 30C40 40 24 42 14 36C2 44 -20 44 -32 36C-50 38 -68 28 -72 6Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${sw(1.6)}"/>`;
  ['M-58 -24C-46 -34 -34 -30 -26 -40','M-20 -44C-6 -36 6 -46 20 -40','M28 -36C40 -26 54 -32 62 -18','M-62 4C-50 -4 -40 6 -30 -2','M40 -10C50 0 62 -6 70 6','M-4 -22C8 -14 20 -24 32 -14'].forEach(d=>{g+=`<path d="${d}" style="fill:none;stroke:var(--brain-line);stroke-width:${sw(1.1)};opacity:.55;stroke-linecap:round"/>`});
  g+='</g>';
  for(const k of Object.keys(A)){const v=clamp(hl[k]||0),[cx,cy]=A[k],r=(k==='pfc'?17:k==='scn'||k==='amyg'?7:10)*s;
    if(v>0)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*(1+v*.8))}" style="fill:${COL[k]};opacity:${f1(.1+v*.25)}"/>`;
    if(v>0||o.labels)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.55)}" style="fill:${COL[k]};opacity:${f1(.35+v*.6)}"/>`}
  if(o.labels){const L={pfc:[-40,-74],acc:[-4,-74],stri:[40,-66],scn:[-60,62],amyg:[-10,70],hippo:[44,62]};
    for(const k of Object.keys(A)){const [cx,cy]=A[k],lx=x+L[k][0]*s,ly=y+L[k][1]*s,dn=ly>cy;
      g+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(lx)}" y2="${f1(ly+(dn?-10:4))}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly)}" class="t-xs t-mid">${NM[k]}</text>`}}
  return {svg:g,at:A}}
function synapse(x,y,s=1,o={}){const rr=rng(o.seed||11),n=clamp(o.n==null?.5:o.n),tx=o.tx||'var(--nt)',bl=clamp(o.block||0);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M-34 -60V-26C-34 -8 -20 0 0 0S34 -8 34 -26V-60" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<5;i++){const vx=-18+i*9,vy=-26+(i%2)*8;g+=`<circle cx="${vx}" cy="${vy}" r="5" style="fill:none;stroke:${tx};stroke-width:1.2"/><circle cx="${vx}" cy="${vy}" r="2" style="fill:${tx}"/>`}
  g+=`<path d="M-44 14Q0 6 44 14V30H-44Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<5;i++){const rx=-28+i*14;g+=`<path d="M${rx-4} 13V8M${rx+4} 13V8" style="stroke:${i/5<bl?'var(--muted)':'var(--rx)'};stroke-width:2.4;stroke-linecap:round"/>`;if(i/5<bl)g+=`<rect x="${rx-5}" y="3" width="10" height="5" rx="2" style="fill:var(--muted)"/>`}
  const k=Math.round(n*14);for(let i=0;i<k;i++){const px=(rr()-.5)*52,py=-1+rr()*8;g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="1.9" style="fill:${tx}"/>`}
  if(o.label)g+=`<text x="0" y="46" class="t-xs t-mid">${o.label}</text>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function clock24(cx,cy,r,o={}){const [b,w]=o.sleep||[23,7],P=(h,rr=r)=>{const a=(h/24)*2*Math.PI-Math.PI/2;return [cx+rr*Math.cos(a),cy+rr*Math.sin(a)]};
  const arc=(h0,h1,rr)=>{let d=(h1-h0+24)%24;if(d===0)d=24;const p0=P(h0,rr),p1=P(h0+d,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 ${d>12?1:0} 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.24,rm=r-rw/2;let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--line);stroke-width:1.2"/>`;
  s+=`<path d="${arc(w,b,rm)}" style="fill:none;stroke:var(--day);stroke-width:${f1(rw)};opacity:.7"/><path d="${arc(b,w,rm)}" style="fill:none;stroke:var(--night);stroke-width:${f1(rw)}"/>`;
  for(let h=0;h<24;h++){const a=P(h,r-rw-2),c=P(h,r-rw-(h%6?4:7));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(c[0])}" y2="${f1(c[1])}" class="axis"/>`}
  if(!o.small)[0,6,12,18].forEach(h=>{const p=P(h,r-rw-15);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+3.5)}" class="t-xs t-mid">${String(h).padStart(2,'0')}</text>`});
  if(o.h!=null){const p=P(o.h,r-rw-3);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="3" style="fill:var(--ink)"/>`}
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:s,P}}
function sleepbar(x,y,w,h,o={}){const [b,wk]=o.sleep||[23,7],X=hr=>x+w*(((hr-12)%24+24)%24)/24,dur=((wk-b)%24+24)%24;
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:var(--day);opacity:.55"/>`;
  const x0=X(b),x1=x0+w*dur/24;s+=`<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(Math.max(0,x1-x0))}" height="${f1(h)}" rx="${f1(Math.min(h/2,(x1-x0)/2))}" style="fill:var(--night)"/>`;
  const br=clamp(o.broken||0);if(br>0){const n=Math.round(1+br*4),rr=rng(7);for(let i=0;i<n;i++){const gx=lerp(x0+6,x1-6,(i+.5)/n+(rr()-.5)*.08);s+=`<rect x="${f1(gx-1.5-br*2)}" y="${f1(y+1)}" width="${f1(3+br*4)}" height="${f1(h-2)}" style="fill:var(--day)"/>`}}
  [12,18,0,6].forEach(hr=>{const tx=X(hr);s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${f1(y+h)}" y2="${f1(y+h+3)}" class="axis"/>`});
  if(o.label)s+=`<text x="${f1(x-6)}" y="${f1(y+h/2+3.5)}" class="t-xs t-end">${o.label}</text>`;
  if(o.hours)s+=`<text x="${f1(x+w+6)}" y="${f1(y+h/2+3.5)}" class="t-xs">${(Math.round(dur*(1-br*.25)*2)/2)} h</text>`;
  return {svg:s,X}}
function ion(x,y,kind='li',o={}){const r=o.r||8,c=kind==='na'?'var(--na)':'var(--li)';
  return `<g style="opacity:${o.op==null?1:o.op}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c};opacity:.9"/>${o.txt===false?'':`<text x="${f1(x)}" y="${f1(y+r*.36)}" class="t-mid" style="font:700 ${f1(r*.95)}px var(--mono);fill:var(--panel)">${kind==='na'?'Na':'Li'}</text>`}</g>`}
function pill(x,y,s=30,o={}){const col=o.col||'var(--rx)',r=s*.22;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(o.round)g+=`<circle r="${f1(s/2)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><line x1="${f1(-s*.3)}" x2="${f1(s*.3)}" y1="0" y2="0" style="stroke:${col};stroke-width:1.2;opacity:.6"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  if(o.txt)g+=`<text x="${o.round?0:f1(-s/4)}" y="${f1(r*.42)}" class="t-mid" style="font:700 ${f1(r*1.05)}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  return g+'</g>'}
function kidney(x,y,s=1,o={}){const hl=clamp(o.hl||0),fl=clamp(o.flow==null?.5:o.flow),P=(a,b)=>[x+a*s,y+b*s];
  const A={glom:P(-12,-26),prox:P(-2,-6),distal:P(14,-30),out:P(30,40)};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M-6 -58C-34 -60 -46 -30 -44 0C-42 34 -24 60 4 58C22 57 30 44 26 30C22 18 14 12 14 0C14 -12 24 -18 26 -30C30 -48 14 -57 -6 -58Z" style="fill:var(--kid-soft);stroke:var(--kid);stroke-width:${f1(1.8/s)}"/>`;
  g+=`<path d="M22 28C30 32 34 40 32 54" style="fill:none;stroke:var(--kid);stroke-width:${f1(3/s)};stroke-linecap:round"/>`;
  g+=`<circle cx="-12" cy="-26" r="7" style="fill:none;stroke:var(--kid);stroke-width:${f1(1.4/s)}"/><path d="M-15 -27c2-3 4 3 6 0s4 3 5 0" style="fill:none;stroke:var(--kid);stroke-width:${f1(1/s)}"/>`;
  if(hl>0)g+=`<path d="M-6 -22C2 -18 6 -12 0 -4C-6 4 -2 12 6 14" style="fill:none;stroke:var(--li);stroke-width:${f1(9/s)};opacity:${f1(.15+hl*.35)};stroke-linecap:round"/>`;
  g+=`<path d="M-6 -22C2 -18 6 -12 0 -4C-6 4 -2 12 6 14C12 16 12 6 10 -6C8 -18 10 -26 14 -30" style="fill:none;stroke:var(--kid);stroke-width:${f1(1.6/s)};stroke-linecap:round"/>`;
  g+=`<path d="M14 -30C20 -34 22 -24 18 -14C14 -2 20 12 24 22" style="fill:none;stroke:var(--kid);stroke-width:${f1(1.6/s)};stroke-dasharray:${f1(3/s)} ${f1(2/s)}"/>`;
  g+='</g>';
  if(fl>0){const p=A.out;g+=`<path d="M${f1(p[0])} ${f1(p[1]+6*s)}v${f1((10+fl*16)*s)}" style="stroke:var(--na);stroke-width:${f1(1.4+fl*2.4)};stroke-linecap:round;opacity:${f1(.4+fl*.5)}"/>`}
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+74*s)}" class="t-xs t-mid">${o.label}</text>`;
  return {svg:g,at:A}}
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
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--down-fill);stroke:none;opacity:.85"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What bipolar disorder is',g:1,n:'1.1',d:'Who it affects, how common it is, and the words we use'},
 {id:'episodes',t:'Mania, hypomania & depression',g:1,n:'1.2',d:'The mood episodes on a life chart, and mixed states'},
 {id:'genes',t:'Genes & family risk',g:1,n:'1.3',d:'Twin and family studies, GWAS, and risk not destiny'},
 {id:'brain',t:'Brain, sleep & the body clock',g:1,n:'1.4',d:'Circadian rhythm, sleep loss and brain networks'},
 {id:'criteria',t:'DSM-5-TR criteria',g:2,n:'2.1',d:'Manic, hypomanic and depressive episodes: a teaching counter'},
 {id:'types',t:'Bipolar I, II, cyclothymia & specifiers',g:2,n:'2.2',d:'Which episodes make which diagnosis, and rapid cycling'},
 {id:'screening',t:'Screening & rating scales',g:2,n:'2.3',d:'MDQ, HCL-32 and YMRS, and what a screen can and cannot do'},
 {id:'differential',t:'Bipolar or something else?',g:2,n:'2.4',d:'Unipolar depression, BPD, ADHD, substances, medical causes'},
 {id:'lithium',t:'Lithium: how it works and the evidence',g:3,n:'3.1',d:'Proposed mechanisms, relapse prevention and suicide data'},
 {id:'levels',t:'Lithium levels, toxicity & interactions',g:3,n:'3.2',d:'Serum levels, the kidney, interactions and monitoring'},
 {id:'stabilisers',t:'Valproate, lamotrigine & carbamazepine',g:3,n:'3.3',d:'What each is used for, warnings, and pregnancy'},
 {id:'antipsychotics',t:'Antipsychotics in bipolar disorder',g:3,n:'3.4',d:'Mania, bipolar depression, side effects and monitoring'},
 {id:'depression',t:'Treating bipolar depression',g:3,n:'3.5',d:'Antidepressants and switching, guideline ladders, ECT'},
 {id:'therapy',t:'Psychoeducation & talking therapies',g:4,n:'4.1',d:'Psychoeducation, family therapy, IPSRT and CBT'},
 {id:'crisis',t:'Suicide risk & crisis safety',g:4,n:'4.2',d:'When risk is higher, safety plans and getting help'},
 {id:'pregnancy',t:'Pregnancy & the postpartum period',g:4,n:'4.3',d:'Relapse risk, medicines and planning with the care team'},
 {id:'course',t:'Course, relapse & comorbidity',g:5,n:'5.1',d:'Recurrence, recovery and the conditions that come along'},
 {id:'living',t:'Living well: sleep, routine & mood charting',g:5,n:'5.2',d:'Early warning signs, routines and your own mood chart'},
 {id:'families',t:'Families, work & school',g:5,n:'5.3',d:'Family-focused therapy, carers, school and work'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Acute mania care, lithium teaching and monitoring'},
 {id:'frontier',t:'Research toward better treatment',g:5,n:'5.5',d:'New targets and trials, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From folie circulaire and Kraepelin to Cade’s lithium and GWAS'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
/* group colours: 1, 5 and 6 use the pine brand; 2 plum-indigo (--dx), 3 teal (--rx), 4 warm clay (--accent) */
const GROUPS={1:['Understanding bipolar disorder','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Medicines','g-rx','c-rx'],4:['Therapy, safety & pregnancy','g-care','c-care'],5:['Course & living','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('bip:tab');sessionStorage.setItem('bip:tab','1')}catch(e){}
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
const SOURCES=[{"key": "Abe2015", "text": "Abé C, Ekman CJ, Sellgren C, Petrovic P, Ingvar M, Landén M. Manic episodes are related to changes in frontal cortex: a longitudinal neuroimaging study of bipolar disorder 1. Brain. 2015;138(Pt 11):3440-8. PMID 26373602; doi:10.1093/brain/awv266.", "link": "https://doi.org/10.1093/brain/awv266", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Adityanjee2005", "text": "Adityanjee, Munshi KR, Thampy A. The syndrome of irreversible lithium-effectuated neurotoxicity. Clin Neuropharmacol. 2005;28(1):38-49. PMID 15714160; doi:10.1097/01.wnf.0000150871.52253.b7.", "link": "https://doi.org/10.1097/01.wnf.0000150871.52253.b7", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "AgnewBlais2016Lancet", "text": "Agnew-Blais J, Danese A. Childhood maltreatment and unfavourable clinical outcomes in bipolar disorder: a systematic review and meta-analysis. Lancet Psychiatry. 2016;3(4):342-9. PMID 26873185; doi:10.1016/S2215-0366(15)00544-1.", "link": "https://doi.org/10.1016/s2215-0366(15)00544-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Alda2015", "text": "Alda M. Lithium in the treatment of bipolar disorder: pharmacology and pharmacogenetics. Mol Psychiatry. 2015;20(6):661-70. PMID 25687772; PMCID PMC5125816; doi:10.1038/mp.2015.4.", "link": "https://doi.org/10.1038/mp.2015.4", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Amare2018", "text": "Amare AT, Schubert KO, Hou L, Clark SR, Papiol S, Heilbronner U, et al. Association of Polygenic Score for Schizophrenia and HLA Antigen and Inflammation Genes With Response to Lithium in Bipolar Affective Disorder: A Genome-Wide Association Study. JAMA Psychiatry. 2018;75(1):65-74. PMID 29121268; PMCID PMC5833535; doi:10.1001/jamapsychiatry.2017.3433.", "link": "https://doi.org/10.1001/jamapsychiatry.2017.3433", "areas": ["B", "C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Aminoff2022", "text": "Aminoff SR, Onyeka IN, Ødegaard M, Simonsen C, Lagerberg TV, Andreassen OA, et al. Lifetime and point prevalence of psychotic symptoms in adults with bipolar disorders: a systematic review and meta-analysis. Psychol Med. 2022;52(13):2413-2425. PMID 36016504; PMCID PMC9647517; doi:10.1017/S003329172200201X.", "link": "https://doi.org/10.1017/s003329172200201x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Angst1966", "text": "Angst J. [On the etiology and nosology of endogenous depressive psychoses. A genetic, sociologic and clinical study]. Monogr Gesamtgeb Neurol Psychiatr. 1966;112:1-118. PMID 5943846.", "link": "https://pubmed.ncbi.nlm.nih.gov/5943846/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Angst1998", "text": "Angst J. The emerging epidemiology of hypomania and bipolar II disorder. J Affect Disord. 1998;50(2-3):143-51. PMID 9858074; doi:10.1016/s0165-0327(98)00142-6.", "link": "https://doi.org/10.1016/s0165-0327(98)00142-6", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2001", "text": "Angst J, Marneros A. Bipolarity from ancient to modern times: conception, birth and rebirth. J Affect Disord. 2001;67(1-3):3-19. PMID 11869749; doi:10.1016/s0165-0327(01)00429-3.", "link": "https://doi.org/10.1016/s0165-0327(01)00429-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2003", "text": "Angst J, Gamma A, Benazzi F, Ajdacic V, Eich D, Rössler W. Toward a re-definition of subthreshold bipolarity: epidemiology and proposed criteria for bipolar-II, minor bipolar disorders and hypomania. J Affect Disord. 2003;73(1-2):133-46. PMID 12507746; doi:10.1016/s0165-0327(02)00322-1.", "link": "https://doi.org/10.1016/s0165-0327(02)00322-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2005HCL32", "text": "Angst J, Adolfsson R, Benazzi F, Gamma A, Hantouche E, Meyer TD, et al. The HCL-32: towards a self-assessment tool for hypomanic symptoms in outpatients. J Affect Disord. 2005;88(2):217-33. PMID 16125784; doi:10.1016/j.jad.2005.05.011.", "link": "https://doi.org/10.1016/j.jad.2005.05.011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2010NCSR", "text": "Angst J, Cui L, Swendsen J, Rothen S, Cravchik A, Kessler RC, et al. Major depressive disorder with subthreshold bipolarity in the National Comorbidity Survey Replication. Am J Psychiatry. 2010;167(10):1194-201. PMID 20713498; PMCID PMC3145248; doi:10.1176/appi.ajp.2010.09071011.", "link": "https://doi.org/10.1176/appi.ajp.2010.09071011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2011BRIDGE", "text": "Angst J, Azorin JM, Bowden CL, Perugi G, Vieta E, Gamma A, et al. Prevalence and characteristics of undiagnosed bipolar disorders in patients with a major depressive episode: the BRIDGE study. Arch Gen Psychiatry. 2011;68(8):791-8. PMID 21810644; doi:10.1001/archgenpsychiatry.2011.87.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.87", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Angst2020ICD11", "text": "Angst J, Ajdacic-Gross V, Rössler W. Bipolar disorders in ICD-11: current status and strengths. Int J Bipolar Disord. 2020;8(1):3. PMID 31956923; PMCID PMC6970089; doi:10.1186/s40345-019-0165-9.", "link": "https://doi.org/10.1186/s40345-019-0165-9", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "APA2022", "text": "American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR). Washington, DC: American Psychiatric Association Publishing; 2022. doi:10.1176/appi.books.9780890425787.", "link": "https://doi.org/10.1176/appi.books.9780890425787", "areas": ["A", "C", "D", "H"], "unverified": false, "validated": "Crossref"}, {"key": "Ashok2017", "text": "Ashok AH, Marques TR, Jauhar S, Nour MM, Goodwin GM, Young AH, et al. The dopamine hypothesis of bipolar affective disorder: the state of the art and implications for treatment. Mol Psychiatry. 2017;22(5):666-679. PMID 28289283; PMCID PMC5401767; doi:10.1038/mp.2017.16.", "link": "https://doi.org/10.1038/mp.2017.16", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Austin2020GC", "text": "Austin JC. Evidence-Based Genetic Counseling for Psychiatric Disorders: A Road Map. Cold Spring Harb Perspect Med. 2020;10(6):a036608. PMID 31501264; PMCID PMC7263094; doi:10.1101/cshperspect.a036608.", "link": "https://doi.org/10.1101/cshperspect.a036608", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Axelson2015", "text": "Axelson D, Goldstein B, Goldstein T, Monk K, Yu H, Hickey MB, et al. Diagnostic Precursors to Bipolar Disorder in Offspring of Parents With Bipolar Disorder: A Longitudinal Study. Am J Psychiatry. 2015;172(7):638-46. PMID 25734353; PMCID PMC4489996; doi:10.1176/appi.ajp.2014.14010035.", "link": "https://doi.org/10.1176/appi.ajp.2014.14010035", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baastrup1967", "text": "Baastrup PC, Schou M. Lithium as a prophylactic agents. Its effect against recurrent depressions and manic-depressive psychosis. Arch Gen Psychiatry. 1967;16(2):162-72. PMID 6019331; doi:10.1001/archpsyc.1967.01730200030005.", "link": "https://doi.org/10.1001/archpsyc.1967.01730200030005", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Baastrup1970", "text": "Baastrup PC, Poulsen JC, Schou M, Thomsen K, Amdisen A. Prophylactic lithium: double blind discontinuation in manic-depressive and recurrent-depressive disorders. Lancet. 1970;2(7668):326-30. PMID 4194439; doi:10.1016/s0140-6736(70)92870-9.", "link": "https://doi.org/10.1016/s0140-6736(70)92870-9", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Bahji2021", "text": "Bahji A, Ermacora D, Stephenson C, Hawken ER, Vazquez G. Comparative Efficacy and Tolerability of Adjunctive Pharmacotherapies for Acute Bipolar Depression: A Systematic Review and Network Meta-analysis. Can J Psychiatry. 2021;66(3):274-288. PMID 33174452; PMCID PMC7958200; doi:10.1177/0706743720970857.", "link": "https://doi.org/10.1177/0706743720970857", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Bahji2021NMA"]}, {"key": "BairdGunning2017", "text": "Baird-Gunning J, Lea-Henry T, Hoegberg LCG, Gosselin S, Roberts DM. Lithium Poisoning. J Intensive Care Med. 2017;32(4):249-263. PMID 27516079; doi:10.1177/0885066616651582.", "link": "https://doi.org/10.1177/0885066616651582", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Baldessarini2006", "text": "Baldessarini RJ, Tondo L, Davis P, Pompili M, Goodwin FK, Hennen J. Decreased risk of suicides and attempts during long-term lithium treatment: a meta-analytic review. Bipolar Disord. 2006;8(5 Pt 2):625-39. PMID 17042835; doi:10.1111/j.1399-5618.2006.00344.x.", "link": "https://doi.org/10.1111/j.1399-5618.2006.00344.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Baldessarini2013", "text": "Baldessarini RJ, Faedda GL, Offidani E, Vázquez GH, Marangoni C, Serra G, et al. Antidepressant-associated mood-switching and transition from unipolar major depression to bipolar disorder: a review. J Affect Disord. 2013;148(1):129-35. PMID 23219059; doi:10.1016/j.jad.2012.10.033.", "link": "https://doi.org/10.1016/j.jad.2012.10.033", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bartoli2024", "text": "Bartoli F, Bassetti C, Gazzola M, Gianfelice L, Cavaleri D, Crocamo C, et al. Prevalence and correlates of manic/hypomanic and depressive predominant polarity in bipolar disorder: systematic review and meta-analysis. BJPsych Open. 2024;10(3):e100. PMID 38708573; PMCID PMC11094450; doi:10.1192/bjo.2024.51.", "link": "https://doi.org/10.1192/bjo.2024.51", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Battino2024EURAP", "text": "Battino D, Tomson T, Bonizzoni E, Craig J, Perucca E, Sabers A, et al. Risk of Major Congenital Malformations and Exposure to Antiseizure Medication Monotherapy. JAMA Neurol. 2024;81(5):481-489. PMID 38497990; PMCID PMC10949148; doi:10.1001/jamaneurol.2024.0258.", "link": "https://doi.org/10.1001/jamaneurol.2024.0258", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bauer2006CCM", "text": "Bauer MS, McBride L, Williford WO, Glick H, Kinosian B, Altshuler L, et al. Collaborative care for bipolar disorder: Part II. Impact on clinical outcome, function, and costs. Psychiatr Serv. 2006;57(7):937-45. PMID 16816277; doi:10.1176/ps.2006.57.7.937.", "link": "https://doi.org/10.1176/ps.2006.57.7.937", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bauer2006Sleep", "text": "Bauer M, Grof P, Rasgon N, Bschor T, Glenn T, Whybrow PC. Temporal relation between sleep and mood in patients with bipolar disorder. Bipolar Disord. 2006;8(2):160-7. PMID 16542186; doi:10.1111/j.1399-5618.2006.00294.x.", "link": "https://doi.org/10.1111/j.1399-5618.2006.00294.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bauer2017Solar", "text": "Bauer M, Glenn T, Alda M, Aleksandrovich MA, Andreassen OA, Angelopoulos E, et al. Solar insolation in springtime influences age of onset of bipolar I disorder. Acta Psychiatr Scand. 2017;136(6):571-582. PMID 28722128; doi:10.1111/acps.12772.", "link": "https://doi.org/10.1111/acps.12772", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Bayes2016", "text": "Bayes AJ, McClure G, Fletcher K, Román Ruiz Del Moral YE, Hadzi-Pavlovic D, Stevenson JL, et al. Differentiating the bipolar disorders from borderline personality disorder. Acta Psychiatr Scand. 2016;133(3):187-95. PMID 26432099; doi:10.1111/acps.12509.", "link": "https://doi.org/10.1111/acps.12509", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Beaulieu2004", "text": "Beaulieu JM, Sotnikova TD, Yao WD, Kockeritz L, Woodgett JR, Gainetdinov RR, et al. Lithium antagonizes dopamine-dependent behaviors mediated by an AKT/glycogen synthase kinase 3 signaling cascade. Proc Natl Acad Sci U S A. 2004;101(14):5099-104. PMID 15044694; PMCID PMC387380; doi:10.1073/pnas.0307921101.", "link": "https://doi.org/10.1073/pnas.0307921101", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bellivier2003", "text": "Bellivier F, Golmard JL, Rietschel M, Schulze TG, Malafosse A, Preisig M, et al. Age at onset in bipolar I affective disorder: further evidence for three subgroups. Am J Psychiatry. 2003;160(5):999-1001. PMID 12727708; doi:10.1176/appi.ajp.160.5.999.", "link": "https://doi.org/10.1176/appi.ajp.160.5.999", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "BelvederiMurri2016", "text": "Belvederi Murri M, Prestia D, Mondelli V, Pariante C, Patti S, Olivieri B, et al. The HPA axis in bipolar disorder: Systematic review and meta-analysis. Psychoneuroendocrinology. 2016;63:327-42. PMID 26547798; doi:10.1016/j.psyneuen.2015.10.014.", "link": "https://doi.org/10.1016/j.psyneuen.2015.10.014", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Benazzi2006", "text": "Benazzi F, Akiskal HS. Biphasic course in bipolar II outpatients: prevalence and clinical correlates of a cyclic pattern described by Baillarger and Falret in hospitalised patients in 1854. J Affect Disord. 2006;96(3):183-7. PMID 16427131; doi:10.1016/j.jad.2004.04.005.", "link": "https://doi.org/10.1016/j.jad.2004.04.005", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Bender2011", "text": "Bender RE, Alloy LB. Life stress and kindling in bipolar disorder: review of the evidence and integration with emerging biopsychosocial theories. Clin Psychol Rev. 2011;31(3):383-98. PMID 21334286; PMCID PMC3072804; doi:10.1016/j.cpr.2011.01.004.", "link": "https://doi.org/10.1016/j.cpr.2011.01.004", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Benedetti2005", "text": "Benedetti F, Barbini B, Fulgosi MC, Colombo C, Dallaspezia S, Pontiggia A, et al. Combined total sleep deprivation and light therapy in the treatment of drug-resistant bipolar depression: acute response and long-term remission rates. J Clin Psychiatry. 2005;66(12):1535-40. PMID 16401154; doi:10.4088/jcp.v66n1207.", "link": "https://doi.org/10.4088/jcp.v66n1207", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Benedetti2014", "text": "Benedetti F, Riccaboni R, Locatelli C, Poletti S, Dallaspezia S, Colombo C. Rapid treatment response of suicidal symptoms to lithium, sleep deprivation, and light therapy (chronotherapeutics) in drug-resistant bipolar depression. J Clin Psychiatry. 2014;75(2):133-40. PMID 24345382; doi:10.4088/JCP.13m08455.", "link": "https://doi.org/10.4088/jcp.13m08455", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Benros2013", "text": "Benros ME, Waltoft BL, Nordentoft M, Ostergaard SD, Eaton WW, Krogh J, et al. Autoimmune diseases and severe infections as risk factors for mood disorders: a nationwide study. JAMA Psychiatry. 2013;70(8):812-20. PMID 23760347; doi:10.1001/jamapsychiatry.2013.1111.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.1111", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bergink2012", "text": "Bergink V, Bouvy PF, Vervoort JS, Koorengevel KM, Steegers EA, Kushner SA. Prevention of postpartum psychosis and mania in women at high risk. Am J Psychiatry. 2012;169(6):609-15. PMID 22407083; doi:10.1176/appi.ajp.2012.11071047.", "link": "https://doi.org/10.1176/appi.ajp.2012.11071047", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Berk2007", "text": "Berk M, Dodd S, Kauer-Sant'anna M, Malhi GS, Bourin M, Kapczinski F, et al. Dopamine dysregulation syndrome: implications for a dopamine hypothesis of bipolar disorder. Acta Psychiatr Scand Suppl. 2007;(434):41-9. PMID 17688462; doi:10.1111/j.1600-0447.2007.01058.x.", "link": "https://doi.org/10.1111/j.1600-0447.2007.01058.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Berk2008NAC", "text": "Berk M, Copolov DL, Dean O, Lu K, Jeavons S, Schapkaitz I, et al. N-acetyl cysteine for depressive symptoms in bipolar disorder--a double-blind randomized placebo-controlled trial. Biol Psychiatry. 2008;64(6):468-75. PMID 18534556; doi:10.1016/j.biopsych.2008.04.022.", "link": "https://doi.org/10.1016/j.biopsych.2008.04.022", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Berk2011", "text": "Berk M, Kapczinski F, Andreazza AC, Dean OM, Giorlando F, Maes M, et al. Pathways underlying neuroprogression in bipolar disorder: focus on inflammation, oxidative stress and neurotrophic factors. Neurosci Biobehav Rev. 2011;35(3):804-17. PMID 20934453; doi:10.1016/j.neubiorev.2010.10.001.", "link": "https://doi.org/10.1016/j.neubiorev.2010.10.001", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Berk2012NAC", "text": "Berk M, Dean OM, Cotton SM, Gama CS, Kapczinski F, Fernandes B, et al. Maintenance N-acetyl cysteine treatment for bipolar disorder: a double-blind randomized placebo controlled trial. BMC Med. 2012;10:91. PMID 22891797; PMCID PMC3482580; doi:10.1186/1741-7015-10-91.", "link": "https://doi.org/10.1186/1741-7015-10-91", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Berridge1989", "text": "Berridge MJ, Downes CP, Hanley MR. Neural and developmental actions of lithium: a unifying hypothesis. Cell. 1989;59(3):411-9. PMID 2553271; doi:10.1016/0092-8674(89)90026-3.", "link": "https://doi.org/10.1016/0092-8674(89)90026-3", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bertelsen1977", "text": "Bertelsen A, Harvald B, Hauge M. A Danish twin study of manic-depressive disorders. Br J Psychiatry. 1977;130:330-51. PMID 558030; doi:10.1192/bjp.130.4.330.", "link": "https://doi.org/10.1192/bjp.130.4.330", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Biazus2023", "text": "Biazus TB, Beraldi GH, Tokeshi L, Rotenberg LS, Dragioti E, Carvalho AF, et al. All-cause and cause-specific mortality among people with bipolar disorder: a large-scale systematic review and meta-analysis. Mol Psychiatry. 2023;28(6):2508-2524. PMID 37491460; PMCID PMC10611575; doi:10.1038/s41380-023-02109-9.", "link": "https://doi.org/10.1038/s41380-023-02109-9", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Birmaher2009", "text": "Birmaher B, Axelson D, Monk K, Kalas C, Goldstein B, Hickey MB, et al. Lifetime psychiatric disorders in school-aged offspring of parents with bipolar disorder: the Pittsburgh Bipolar Offspring study. Arch Gen Psychiatry. 2009;66(3):287-96. PMID 19255378; PMCID PMC2756682; doi:10.1001/archgenpsychiatry.2008.546.", "link": "https://doi.org/10.1001/archgenpsychiatry.2008.546", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Birmaher2009COBY", "text": "Birmaher B, Axelson D, Goldstein B, Strober M, Gill MK, Hunt J, et al. Four-year longitudinal course of children and adolescents with bipolar spectrum disorders: the Course and Outcome of Bipolar Youth (COBY) study. Am J Psychiatry. 2009;166(7):795-804. PMID 19448190; PMCID PMC2828047; doi:10.1176/appi.ajp.2009.08101569.", "link": "https://doi.org/10.1176/appi.ajp.2009.08101569", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Birmaher2022", "text": "Birmaher B, Hafeman D, Merranko J, Zwicker A, Goldstein B, Goldstein T, et al. Role of Polygenic Risk Score in the Familial Transmission of Bipolar Disorder in Youth. JAMA Psychiatry. 2022;79(2):160-168. PMID 34935868; PMCID PMC8696688; doi:10.1001/jamapsychiatry.2021.3700.", "link": "https://doi.org/10.1001/jamapsychiatry.2021.3700", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bolton2015BMJ", "text": "Bolton JM, Gunnell D, Turecki G. Suicide risk assessment and intervention in people with mental illness. BMJ. 2015;351:h4978. PMID 26552947; doi:10.1136/bmj.h4978.", "link": "https://doi.org/10.1136/bmj.h4978", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bourne2013", "text": "Bourne C, Aydemir Ö, Balanzá-Martínez V, Bora E, Brissos S, Cavanagh JT, et al. Neuropsychological testing of cognitive impairment in euthymic bipolar disorder: an individual patient data meta-analysis. Acta Psychiatr Scand. 2013;128(3):149-62. PMID 23617548; doi:10.1111/acps.12133.", "link": "https://doi.org/10.1111/acps.12133", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bowden1994", "text": "Bowden CL, Brugger AM, Swann AC, Calabrese JR, Janicak PG, Petty F, et al. Efficacy of divalproex vs lithium and placebo in the treatment of mania. The Depakote Mania Study Group. JAMA. 1994;271(12):918-24. PMID 8120960.", "link": "https://pubmed.ncbi.nlm.nih.gov/8120960/", "areas": ["A", "E", "F"], "unverified": false, "validated": "PubMed", "aliases": ["Bowden1994Divalproex"]}, {"key": "Bowden2000Divalproex", "text": "Bowden CL, Calabrese JR, McElroy SL, Gyulai L, Wassef A, Petty F, et al. A randomized, placebo-controlled 12-month trial of divalproex and lithium in treatment of outpatients with bipolar I disorder. Divalproex Maintenance Study Group. Arch Gen Psychiatry. 2000;57(5):481-9. PMID 10807488; doi:10.1001/archpsyc.57.5.481.", "link": "https://doi.org/10.1001/archpsyc.57.5.481", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bowden2003Lamotrigine", "text": "Bowden CL, Calabrese JR, Sachs G, Yatham LN, Asghar SA, Hompland M, et al. A placebo-controlled 18-month trial of lamotrigine and lithium maintenance treatment in recently manic or hypomanic patients with bipolar I disorder. Arch Gen Psychiatry. 2003;60(4):392-400. PMID 12695317; doi:10.1001/archpsyc.60.4.392.", "link": "https://doi.org/10.1001/archpsyc.60.4.392", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Bowers2001Observation", "text": "Bowers L, Park A. Special observation in the care of psychiatric inpatients: a literature review. Issues Ment Health Nurs. 2001;22(8):769-86. PMID 11881179; doi:10.1080/01612840152713018.", "link": "https://doi.org/10.1080/01612840152713018", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bowers2015", "text": "Bowers L, James K, Quirk A, Simpson A, Stewart D, Hodsoll J. Reducing conflict and containment rates on acute psychiatric wards: The Safewards cluster randomised controlled trial. Int J Nurs Stud. 2015;52(9):1412-22. PMID 26166187; PMCID PMC4518134; doi:10.1016/j.ijnurstu.2015.05.001.", "link": "https://doi.org/10.1016/j.ijnurstu.2015.05.001", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Brainstorm2018", "text": "Brainstorm Consortium, Anttila V, Bulik-Sullivan B, Finucane HK, Walters RK, Bras J, et al. Analysis of shared heritability in common disorders of the brain. Science. 2018;360(6395):eaap8757. PMID 29930110; PMCID PMC6097237; doi:10.1126/science.aap8757.", "link": "https://doi.org/10.1126/science.aap8757", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Brohan2011", "text": "Brohan E, Gauci D, Sartorius N, Thornicroft G; GAMIAN-Europe Study Group. Self-stigma, empowerment and perceived discrimination among people with bipolar disorder or depression in 13 European countries: the GAMIAN-Europe study. J Affect Disord. 2011;129(1-3):56-63. PMID 20888050; doi:10.1016/j.jad.2010.09.001.", "link": "https://doi.org/10.1016/j.jad.2010.09.001", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bromley2014", "text": "Bromley R, Weston J, Adab N, Greenhalgh J, Sanniti A, McKay AJ, et al. Treatment for epilepsy in pregnancy: neurodevelopmental outcomes in the child. Cochrane Database Syst Rev. 2014;2014(10):CD010236. PMID 25354543; PMCID PMC7390020; doi:10.1002/14651858.CD010236.pub2.", "link": "https://doi.org/10.1002/14651858.cd010236.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Brown2014Oxidative", "text": "Brown NC, Andreazza AC, Young LT. An updated meta-analysis of oxidative stress markers in bipolar disorder. Psychiatry Res. 2014;218(1-2):61-8. PMID 24794031; doi:10.1016/j.psychres.2014.04.005.", "link": "https://doi.org/10.1016/j.psychres.2014.04.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bruun2026", "text": "Bruun CF, Krogh HB, Zarp J, Stokholm JR, Forman JL, Miskowiak KW, et al. No Effect of Low-Dose Aspirin Versus Placebo as Add-On Treatment in Bipolar Disorder-Results From a Randomised Controlled Trial (the A-Bipolar RCT). Acta Psychiatr Scand. 2026;153(3):214-224. PMID 41319159; PMCID PMC12861576; doi:10.1111/acps.70055.", "link": "https://doi.org/10.1111/acps.70055", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Butzlaff1998", "text": "Butzlaff RL, Hooley JM. Expressed emotion and psychiatric relapse: a meta-analysis. Arch Gen Psychiatry. 1998;55(6):547-52. PMID 9633674; doi:10.1001/archpsyc.55.6.547.", "link": "https://doi.org/10.1001/archpsyc.55.6.547", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Cade1949", "text": "CADE JF. Lithium salts in the treatment of psychotic excitement. Med J Aust. 1949;2(10):349-52. PMID 18142718; doi:10.1080/j.1440-1614.1999.06241.x.", "link": "https://doi.org/10.1080/j.1440-1614.1999.06241.x", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Calabrese2003Lamotrigine", "text": "Calabrese JR, Bowden CL, Sachs G, Yatham LN, Behnke K, Mehtonen OP, et al. A placebo-controlled 18-month trial of lamotrigine and lithium maintenance treatment in recently depressed patients with bipolar I disorder. J Clin Psychiatry. 2003;64(9):1013-24. PMID 14628976; doi:10.4088/jcp.v64n0906.", "link": "https://doi.org/10.4088/jcp.v64n0906", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Calabrese2005BOLDER", "text": "Calabrese JR, Keck PE Jr, Macfadden W, Minkwitz M, Ketter TA, Weisler RH, et al. A randomized, double-blind, placebo-controlled trial of quetiapine in the treatment of bipolar I or II depression. Am J Psychiatry. 2005;162(7):1351-60. PMID 15994719; doi:10.1176/appi.ajp.162.7.1351.", "link": "https://doi.org/10.1176/appi.ajp.162.7.1351", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Calabrese2015Cariprazine", "text": "Calabrese JR, Keck PE Jr, Starace A, Lu K, Ruth A, Laszlovszky I, et al. Efficacy and safety of low- and high-dose cariprazine in acute and mixed mania associated with bipolar I disorder: a double-blind, placebo-controlled study. J Clin Psychiatry. 2015;76(3):284-92. PMID 25562205; doi:10.4088/JCP.14m09081.", "link": "https://doi.org/10.4088/jcp.14m09081", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Calabrese2017AOM", "text": "Calabrese JR, Sanchez R, Jin N, Amatniek J, Cox K, Johnson B, et al. Efficacy and Safety of Aripiprazole Once-Monthly in the Maintenance Treatment of Bipolar I Disorder: A Double-Blind, Placebo-Controlled, 52-Week Randomized Withdrawal Study. J Clin Psychiatry. 2017;78(3):324-331. PMID 28146613; doi:10.4088/JCP.16m11201.", "link": "https://doi.org/10.4088/jcp.16m11201", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Calabrese2021Lumateperone", "text": "Calabrese JR, Durgam S, Satlin A, Vanover KE, Davis RE, Chen R, et al. Efficacy and Safety of Lumateperone for Major Depressive Episodes Associated With Bipolar I or Bipolar II Disorder: A Phase 3 Randomized Placebo-Controlled Trial. Am J Psychiatry. 2021;178(12):1098-1106. PMID 34551584; doi:10.1176/appi.ajp.2021.20091339.", "link": "https://doi.org/10.1176/appi.ajp.2021.20091339", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Carvalho2015", "text": "Carvalho AF, Takwoingi Y, Sales PM, Soczynska JK, Köhler CA, Freitas TH, et al. Screening for bipolar spectrum disorders: A comprehensive meta-analysis of accuracy studies. J Affect Disord. 2015;172:337-46. PMID 25451435; doi:10.1016/j.jad.2014.10.024.", "link": "https://doi.org/10.1016/j.jad.2014.10.024", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cassidy1998", "text": "Cassidy F, Murry E, Forest K, Carroll BJ. Signs and symptoms of mania in pure and mixed episodes. J Affect Disord. 1998;50(2-3):187-201. PMID 9858078; doi:10.1016/s0165-0327(98)00016-0.", "link": "https://doi.org/10.1016/s0165-0327(98)00016-0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Cerimele2013", "text": "Cerimele JM, Chwastiak LA, Dodson S, Katon WJ. The prevalence of bipolar disorder in primary care patients with depression or other psychiatric complaints: a systematic review. Psychosomatics. 2013;54(6):515-24. PMID 23932528; PMCID PMC3830717; doi:10.1016/j.psym.2013.05.009.", "link": "https://doi.org/10.1016/j.psym.2013.05.009", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chan2022", "text": "Chan JKN, Tong CHY, Wong CSM, Chen EYH, Chang WC. Life expectancy and years of potential life lost in bipolar disorder: systematic review and meta-analysis. Br J Psychiatry. 2022;221(3):567-576. PMID 35184778; doi:10.1192/bjp.2022.19.", "link": "https://doi.org/10.1192/bjp.2022.19", "areas": ["A", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Chan2022LifeExp"]}, {"key": "Charney2019", "text": "Charney AW, Stahl EA, Green EK, Chen CY, Moran JL, Chambert K, et al. Contribution of Rare Copy Number Variants to Bipolar Disorder Risk Is Limited to Schizoaffective Cases. Biol Psychiatry. 2019;86(2):110-119. PMID 30686506; PMCID PMC6586545; doi:10.1016/j.biopsych.2018.12.009.", "link": "https://doi.org/10.1016/j.biopsych.2018.12.009", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Chatterton2017", "text": "Chatterton ML, Stockings E, Berk M, Barendregt JJ, Carter R, Mihalopoulos C. Psychosocial therapies for the adjunctive treatment of bipolar disorder in adults: network meta-analysis. Br J Psychiatry. 2017;210(5):333-341. PMID 28209591; doi:10.1192/bjp.bp.116.195321.", "link": "https://doi.org/10.1192/bjp.bp.116.195321", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2011fMRI", "text": "Chen CH, Suckling J, Lennox BR, Ooi C, Bullmore ET. A quantitative meta-analysis of fMRI studies in bipolar disorder. Bipolar Disord. 2011;13(1):1-15. PMID 21320248; doi:10.1111/j.1399-5618.2011.00893.x.", "link": "https://doi.org/10.1111/j.1399-5618.2011.00893.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2011HLA", "text": "Chen P, Lin JJ, Lu CS, Ong CT, Hsieh PF, Yang CC, et al. Carbamazepine-induced toxic effects and HLA-B1502 screening in Taiwan. N Engl J Med. 2011;364(12):1126-33. PMID 21428768; doi:10.1056/NEJMoa1009717.", "link": "https://doi.org/10.1056/nejmoa1009717", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Chesney2014", "text": "Chesney E, Goodwin GM, Fazel S. Risks of all-cause and suicide mortality in mental disorders: a meta-review. World Psychiatry. 2014;13(2):153-60. PMID 24890068; PMCID PMC4102288; doi:10.1002/wps.20128.", "link": "https://doi.org/10.1002/wps.20128", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Ching2022", "text": "Ching CRK, Hibar DP, Gurholt TP, Nunes A, Thomopoulos SI, Abé C, et al. What we learn about bipolar disorder from large-scale neuroimaging: Findings and future directions from the ENIGMA Bipolar Disorder Working Group. Hum Brain Mapp. 2022;43(1):56-82. PMID 32725849; PMCID PMC8675426; doi:10.1002/hbm.25098.", "link": "https://doi.org/10.1002/hbm.25098", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Christensen2013", "text": "Christensen J, Grønborg TK, Sørensen MJ, Schendel D, Parner ET, Pedersen LH, et al. Prenatal valproate exposure and risk of autism spectrum disorders and childhood autism. JAMA. 2013;309(16):1696-703. PMID 23613074; PMCID PMC4511955; doi:10.1001/jama.2013.2270.", "link": "https://doi.org/10.1001/jama.2013.2270", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Chung2004HLA", "text": "Chung WH, Hung SI, Hong HS, Hsih MS, Yang LC, Ho HC, et al. Medical genetics: a marker for Stevens-Johnson syndrome. Nature. 2004;428(6982):486. PMID 15057820; doi:10.1038/428486a.", "link": "https://doi.org/10.1038/428486a", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Chung2017JAMAPsych", "text": "Chung DT, Ryan CJ, Hadzi-Pavlovic D, Singh SP, Stanton C, Large MM. Suicide Rates After Discharge From Psychiatric Facilities: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2017;74(7):694-702. PMID 28564699; PMCID PMC5710249; doi:10.1001/jamapsychiatry.2017.1044.", "link": "https://doi.org/10.1001/jamapsychiatry.2017.1044", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Cipriani2011", "text": "Cipriani A, Barbui C, Salanti G, Rendell J, Brown R, Stockton S, et al. Comparative efficacy and acceptability of antimanic drugs in acute mania: a multiple-treatments meta-analysis. Lancet. 2011;378(9799):1306-15. PMID 21851976; doi:10.1016/S0140-6736(11)60873-8.", "link": "https://doi.org/10.1016/s0140-6736(11)60873-8", "areas": ["E", "F"], "unverified": false, "validated": "PubMed", "aliases": ["Cipriani2011Mania"]}, {"key": "Cipriani2013", "text": "Cipriani A, Hawton K, Stockton S, Geddes JR. Lithium in the prevention of suicide in mood disorders: updated systematic review and meta-analysis. BMJ. 2013;346:f3646. PMID 23814104; doi:10.1136/bmj.f3646.", "link": "https://doi.org/10.1136/bmj.f3646", "areas": ["A", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Citrome2014Lurasidone", "text": "Citrome L, Ketter TA, Cucchiaro J, Loebel A. Clinical assessment of lurasidone benefit and risk in the treatment of bipolar I depression using number needed to treat, number needed to harm, and likelihood to be helped or harmed. J Affect Disord. 2014;155:20-7. PMID 24246116; doi:10.1016/j.jad.2013.10.040.", "link": "https://doi.org/10.1016/j.jad.2013.10.040", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Citrome2019Cariprazine", "text": "Citrome L. Cariprazine for bipolar depression: What is the number needed to treat, number needed to harm and likelihood to be helped or harmed? Int J Clin Pract. 2019;73(10):e13397. PMID 31355510; doi:10.1111/ijcp.13397.", "link": "https://doi.org/10.1111/ijcp.13397", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Close2014", "text": "Close H, Reilly J, Mason JM, Kripalani M, Wilson D, Main J, et al. Renal failure in lithium-treated bipolar disorder: a retrospective cohort study. PLoS One. 2014;9(3):e90169. PMID 24670976; PMCID PMC3966731; doi:10.1371/journal.pone.0090169.", "link": "https://doi.org/10.1371/journal.pone.0090169", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Cloutier2018", "text": "Cloutier M, Greene M, Guerin A, Touya M, Wu E. The economic burden of bipolar I disorder in the United States in 2015. J Affect Disord. 2018;226:45-51. PMID 28961441; doi:10.1016/j.jad.2017.09.011.", "link": "https://doi.org/10.1016/j.jad.2017.09.011", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Collins2010", "text": "Collins N, Barnes TR, Shingleton-Smith A, Gerrett D, Paton C. Standards of lithium monitoring in mental health Ttrusts in the UK. BMC Psychiatry. 2010;10:80. PMID 20939864; PMCID PMC2958995; doi:10.1186/1471-244X-10-80.", "link": "https://doi.org/10.1186/1471-244x-10-80", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Collins2010Lithium"]}, {"key": "Colom2003", "text": "Colom F, Vieta E, Martinez-Aran A, Reinares M, Goikolea JM, Benabarre A, et al. A randomized trial on the efficacy of group psychoeducation in the prophylaxis of recurrences in bipolar patients whose disease is in remission. Arch Gen Psychiatry. 2003;60(4):402-7. PMID 12695318; doi:10.1001/archpsyc.60.4.402.", "link": "https://doi.org/10.1001/archpsyc.60.4.402", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Colom2009", "text": "Colom F, Vieta E, Sánchez-Moreno J, Palomino-Otiniano R, Reinares M, Goikolea JM, et al. Group psychoeducation for stabilised bipolar disorders: 5-year outcome of a randomised clinical trial. Br J Psychiatry. 2009;194(3):260-5. PMID 19252157; doi:10.1192/bjp.bp.107.040485.", "link": "https://doi.org/10.1192/bjp.bp.107.040485", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Colombo1999", "text": "Colombo C, Benedetti F, Barbini B, Campori E, Smeraldi E. Rate of switch from depression into mania after therapeutic sleep deprivation in bipolar depression. Psychiatry Res. 1999;86(3):267-70. PMID 10482346; doi:10.1016/s0165-1781(99)00036-0.", "link": "https://doi.org/10.1016/s0165-1781(99)00036-0", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Copeland2013DMDD", "text": "Copeland WE, Angold A, Costello EJ, Egger H. Prevalence, comorbidity, and correlates of DSM-5 proposed disruptive mood dysregulation disorder. Am J Psychiatry. 2013;170(2):173-9. PMID 23377638; PMCID PMC3573525; doi:10.1176/appi.ajp.2012.12010132.", "link": "https://doi.org/10.1176/appi.ajp.2012.12010132", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Correll2017CVD", "text": "Correll CU, Solmi M, Veronese N, Bortolato B, Rosson S, Santonastaso P, et al. Prevalence, incidence and mortality from cardiovascular disease in patients with pooled and specific severe mental illness: a large-scale meta-analysis of 3,211,768 patients and 113,383,368 controls. World Psychiatry. 2017;16(2):163-180. PMID 28498599; PMCID PMC5428179; doi:10.1002/wps.20420.", "link": "https://doi.org/10.1002/wps.20420", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Craddock2013", "text": "Craddock N, Sklar P. Genetics of bipolar disorder. Lancet. 2013;381(9878):1654-62. PMID 23663951; doi:10.1016/S0140-6736(13)60855-7.", "link": "https://doi.org/10.1016/s0140-6736(13)60855-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Dagani2017", "text": "Dagani J, Signorini G, Nielssen O, Bani M, Pastore A, Girolamo G, et al. Meta-analysis of the Interval between the Onset and Management of Bipolar Disorder. Can J Psychiatry. 2017;62(4):247-258. PMID 27462036; PMCID PMC5407546; doi:10.1177/0706743716656607.", "link": "https://doi.org/10.1177/0706743716656607", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Dallaspezia2026", "text": "Dallaspezia S, Attanasio F, Maruca S, Benedetti F, Colombo C. Chronotherapy shortens hospitalization for bipolar depression: a single-center replication across three decades (1994-2024). Psychiatry Res. 2026;360:117115. PMID 41887006; doi:10.1016/j.psychres.2026.117115.", "link": "https://doi.org/10.1016/j.psychres.2026.117115", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Das2005", "text": "Das AK, Olfson M, Gameroff MJ, Pilowsky DJ, Blanco C, Feder A, et al. Screening for bipolar disorder in a primary care practice. JAMA. 2005;293(8):956-63. PMID 15728166; doi:10.1001/jama.293.8.956.", "link": "https://doi.org/10.1001/jama.293.8.956", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Decker2015", "text": "Decker BS, Goldfarb DS, Dargan PI, Friesen M, Gosselin S, Hoffman RS, et al. Extracorporeal Treatment for Lithium Poisoning: Systematic Review and Recommendations from the EXTRIP Workgroup. Clin J Am Soc Nephrol. 2015;10(5):875-87. PMID 25583292; PMCID PMC4422246; doi:10.2215/CJN.10021014.", "link": "https://doi.org/10.2215/cjn.10021014", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "DeCrescenzo2017", "text": "De Crescenzo F, Economou A, Sharpley AL, Gormez A, Quested DJ. Actigraphic features of bipolar disorder: A systematic review and meta-analysis. Sleep Med Rev. 2017;33:58-69. PMID 28185811; doi:10.1016/j.smrv.2016.05.003.", "link": "https://doi.org/10.1016/j.smrv.2016.05.003", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "deJong2016", "text": "de Jong MH, Kamperman AM, Oorschot M, Priebe S, Bramer W, van de Sande R, et al. Interventions to Reduce Compulsory Psychiatric Admissions: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2016;73(7):657-64. PMID 27249180; doi:10.1001/jamapsychiatry.2016.0501.", "link": "https://doi.org/10.1001/jamapsychiatry.2016.0501", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Denicoff2000", "text": "Denicoff KD, Leverich GS, Nolen WA, Rush AJ, McElroy SL, Keck PE, et al. Validation of the prospective NIMH-Life-Chart Method (NIMH-LCM-p) for longitudinal assessment of bipolar illness. Psychol Med. 2000;30(6):1391-7. PMID 11097079; doi:10.1017/s0033291799002810.", "link": "https://doi.org/10.1017/s0033291799002810", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DePrisco2026", "text": "De Prisco M, Oliva V, Miola A, Fornaro M, Dragioti E, Croatto G, et al. Evidence based interventions for bipolar disorder across phases and age groups: living umbrella review, evaluation, analysis, and communication hub (U-REACH) project. BMJ. 2026;394:e100216. PMID 42580772; doi:10.1136/bmj-2026-100216.", "link": "https://doi.org/10.1136/bmj-2026-100216", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "deSousa2011", "text": "de Sousa RT, van de Bilt MT, Diniz BS, Ladeira RB, Portela LV, Souza DO, et al. Lithium increases plasma brain-derived neurotrophic factor in acute bipolar mania: a preliminary 4-week study. Neurosci Lett. 2011;494(1):54-6. PMID 21362460; doi:10.1016/j.neulet.2011.02.054.", "link": "https://doi.org/10.1016/j.neulet.2011.02.054", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Diazgranados2010", "text": "Diazgranados N, Ibrahim L, Brutsche NE, Newberg A, Kronstein P, Khalife S, et al. A randomized add-on trial of an N-methyl-D-aspartate antagonist in treatment-resistant bipolar depression. Arch Gen Psychiatry. 2010;67(8):793-802. PMID 20679587; PMCID PMC3000408; doi:10.1001/archgenpsychiatry.2010.90.", "link": "https://doi.org/10.1001/archgenpsychiatry.2010.90", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Dierckx2012", "text": "Dierckx B, Heijnen WT, van den Broek WW, Birkenhäger TK. Efficacy of electroconvulsive therapy in bipolar versus unipolar major depression: a meta-analysis. Bipolar Disord. 2012;14(2):146-50. PMID 22420590; doi:10.1111/j.1399-5618.2012.00997.x.", "link": "https://doi.org/10.1111/j.1399-5618.2012.00997.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Diflorio2010", "text": "Diflorio A, Jones I. Is sex important? Gender differences in bipolar disorder. Int Rev Psychiatry. 2010;22(5):437-52. PMID 21047158; doi:10.3109/09540261.2010.514601.", "link": "https://doi.org/10.3109/09540261.2010.514601", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DiFlorio2013", "text": "Di Florio A, Forty L, Gordon-Smith K, Heron J, Jones L, Craddock N, et al. Perinatal episodes across the mood disorder spectrum. JAMA Psychiatry. 2013;70(2):168-75. PMID 23247604; doi:10.1001/jamapsychiatry.2013.279.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.279", "areas": ["B", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Diniz2017", "text": "Diniz BS, Teixeira AL, Cao F, Gildengers A, Soares JC, Butters MA, et al. History of Bipolar Disorder and the Risk of Dementia: A Systematic Review and Meta-Analysis. Am J Geriatr Psychiatry. 2017;25(4):357-362. PMID 28161155; PMCID PMC5365367; doi:10.1016/j.jagp.2016.11.014.", "link": "https://doi.org/10.1016/j.jagp.2016.11.014", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dogan2018", "text": "Dogan AE, Yuksel C, Du F, Chouinard VA, Öngür D. Brain lactate and pH in schizophrenia and bipolar disorder: a systematic review of findings from magnetic resonance studies. Neuropsychopharmacology. 2018;43(8):1681-1690. PMID 29581538; PMCID PMC6006165; doi:10.1038/s41386-018-0041-9.", "link": "https://doi.org/10.1038/s41386-018-0041-9", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Dome2019", "text": "Dome P, Rihmer Z, Gonda X. Suicide Risk in Bipolar Disorder: A Brief Review. Medicina (Kaunas). 2019;55(8). PMID 31344941; PMCID PMC6723289; doi:10.3390/medicina55080403.", "link": "https://doi.org/10.3390/medicina55080403", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DOnofrio2014", "text": "D'Onofrio BM, Rickert ME, Frans E, Kuja-Halkola R, Almqvist C, Sjölander A, et al. Paternal age at childbearing and offspring psychiatric and academic morbidity. JAMA Psychiatry. 2014;71(4):432-8. PMID 24577047; PMCID PMC3976758; doi:10.1001/jamapsychiatry.2013.4525.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.4525", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Duffy2019AJP", "text": "Duffy A, Goodday S, Keown-Stoneman C, Grof P. The Emergent Course of Bipolar Disorder: Observations Over Two Decades From the Canadian High-Risk Offspring Cohort. Am J Psychiatry. 2019;176(9):720-729. PMID 30525908; doi:10.1176/appi.ajp.2018.18040461.", "link": "https://doi.org/10.1176/appi.ajp.2018.18040461", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Dunayevich2000", "text": "Dunayevich E, Keck PE Jr. Prevalence and description of psychotic features in bipolar mania. Curr Psychiatry Rep. 2000;2(4):286-90. PMID 11122970; doi:10.1007/s11920-000-0069-4.", "link": "https://doi.org/10.1007/s11920-000-0069-4", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Durgam2016Cariprazine", "text": "Durgam S, Earley W, Lipschitz A, Guo H, Laszlovszky I, Németh G, et al. An 8-Week Randomized, Double-Blind, Placebo-Controlled Evaluation of the Safety and Efficacy of Cariprazine in Patients With Bipolar I Depression. Am J Psychiatry. 2016;173(3):271-81. PMID 26541814; doi:10.1176/appi.ajp.2015.15020164.", "link": "https://doi.org/10.1176/appi.ajp.2015.15020164", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Earley2019Cariprazine", "text": "Earley W, Burgess MV, Rekeda L, Dickinson R, Szatmári B, Németh G, et al. Cariprazine Treatment of Bipolar Depression: A Randomized Double-Blind Placebo-Controlled Phase 3 Study. Am J Psychiatry. 2019;176(6):439-448. PMID 30845817; doi:10.1176/appi.ajp.2018.18070824.", "link": "https://doi.org/10.1176/appi.ajp.2018.18070824", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Earley2020Cariprazine", "text": "Earley WR, Burgess MV, Khan B, Rekeda L, Suppes T, Tohen M, et al. Efficacy and safety of cariprazine in bipolar I depression: A double-blind, placebo-controlled phase 3 study. Bipolar Disord. 2020;22(4):372-384. PMID 31628698; PMCID PMC7318333; doi:10.1111/bdi.12852.", "link": "https://doi.org/10.1111/bdi.12852", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Edvardsen2008", "text": "Edvardsen J, Torgersen S, Røysamb E, Lygren S, Skre I, Onstad S, et al. Heritability of bipolar spectrum disorders. Unity or heterogeneity? J Affect Disord. 2008;106(3):229-40. PMID 17692389; doi:10.1016/j.jad.2007.07.001.", "link": "https://doi.org/10.1016/j.jad.2007.07.001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ehlers1988", "text": "Ehlers CL, Frank E, Kupfer DJ. Social zeitgebers and biological rhythms. A unified approach to understanding the etiology of depression. Arch Gen Psychiatry. 1988;45(10):948-52. PMID 3048226; doi:10.1001/archpsyc.1988.01800340076012.", "link": "https://doi.org/10.1001/archpsyc.1988.01800340076012", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ellison2013Stigma", "text": "Ellison N, Mason O, Scior K. Bipolar disorder and stigma: a systematic review of the literature. J Affect Disord. 2013;151(3):805-20. PMID 24135506; doi:10.1016/j.jad.2013.08.014.", "link": "https://doi.org/10.1016/j.jad.2013.08.014", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Even2010", "text": "Even C, Thuile J, Kalck-Stern M, Criquillion-Doublet S, Gorwood P, Rouillon F. Psychoeducation for patients with bipolar disorder receiving lithium: short and long term impact on locus of control and knowledge about lithium. J Affect Disord. 2010;123(1-3):299-302. PMID 19815295; doi:10.1016/j.jad.2009.09.008.", "link": "https://doi.org/10.1016/j.jad.2009.09.008", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fang2026ML", "text": "Fang S, Chen S. Machine learning for early detection and mood shift prediction in bipolar disorder: a systematic review. Int J Bipolar Disord. 2026;14(1). PMID 42928073; PMCID PMC13696640; doi:10.1186/s40345-026-00436-8.", "link": "https://doi.org/10.1186/s40345-026-00436-8", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fardet2012", "text": "Fardet L, Petersen I, Nazareth I. Suicidal behavior and severe neuropsychiatric disorders following glucocorticoid therapy in primary care. Am J Psychiatry. 2012;169(5):491-7. PMID 22764363; doi:10.1176/appi.ajp.2011.11071009.", "link": "https://doi.org/10.1176/appi.ajp.2011.11071009", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "FaurholtJepsen2015", "text": "Faurholt-Jepsen M, Frost M, Ritz C, Christensen EM, Jacoby AS, Mikkelsen RL, et al. Daily electronic self-monitoring in bipolar disorder using smartphones - the MONARCA I trial: a randomized, placebo-controlled, single-blind, parallel group trial. Psychol Med. 2015;45(13):2691-704. PMID 26220802; doi:10.1017/S0033291715000410.", "link": "https://doi.org/10.1017/s0033291715000410", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "FaurholtJepsen2016", "text": "Faurholt-Jepsen M, Busk J, Frost M, Vinberg M, Christensen EM, Winther O, et al. Voice analysis as an objective state marker in bipolar disorder. Transl Psychiatry. 2016;6(7):e856. PMID 27434490; PMCID PMC5545710; doi:10.1038/tp.2016.123.", "link": "https://doi.org/10.1038/tp.2016.123", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Favre2019", "text": "Favre P, Pauling M, Stout J, Hozer F, Sarrazin S, Abé C, et al. Widespread white matter microstructural abnormalities in bipolar disorder: evidence from mega- and meta-analyses across 3033 individuals. Neuropsychopharmacology. 2019;44(13):2285-2293. PMID 31434102; PMCID PMC6898371; doi:10.1038/s41386-019-0485-6.", "link": "https://doi.org/10.1038/s41386-019-0485-6", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-AbilifyMaintena", "text": "Otsuka America Pharmaceutical. ABILIFY MAINTENA (aripiprazole) extended-release injectable suspension, US prescribing information, NDA202971, effective 2026-03-24, set id ee49f3b1-1650-47ff-9fb1-ea53fe0b92b6 (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Caplyta", "text": "Intra-Cellular Therapies. CAPLYTA (lumateperone) capsules, US prescribing information, NDA209500, effective 2025-06-20, set id db730b06-6351-47fd-8183-e61e61bbead5 (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Depakote", "text": "AbbVie. DEPAKOTE (divalproex sodium) delayed-release tablets, US prescribing information, effective 2026-03-31, set id 08a65cf4-7749-4ceb-6895-8f4805e2b01f (boxed warning and section 1 read). https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22Depakote%22", "link": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22Depakote%22", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Equetro", "text": "Validus Pharmaceuticals. EQUETRO (carbamazepine) extended-release capsules, US prescribing information, NDA021710, effective 2025-08-19, set id be478f3c-40f6-47cc-8ab9-f420a9372b1c (boxed warning, sections 1, 2.1 and 7 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lamictal", "text": "GlaxoSmithKline. LAMICTAL and LAMICTAL ODT (lamotrigine), US prescribing information, effective 2025-10-10, set id d7e3572d-56fe-4727-2bb4-013ccca22678 (boxed warning read).", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Latuda", "text": "Sumitomo Pharma America. LATUDA (lurasidone hydrochloride) tablets, US prescribing information, NDA200603, effective 2025-01-31, set id afad3051-9df2-4c54-9684-e8262a133af8 (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lithium", "text": "Hikma Pharmaceuticals USA Inc. Lithium carbonate tablets USP and capsules USP, US prescribing information (PLR format), effective 2026-08-16, set id b839ff4b-f62d-41ab-a823-550a756d58ec (boxed warning and sections 1, 2, 5, 6, 7, 8, 10, 12.3 and 14 read).", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lithobid", "text": "ANI Pharmaceuticals, Inc. LITHOBID (lithium carbonate) extended-release tablets. US prescribing information (boxed warning, actions, indications, dosage and administration, adverse reactions). Label effective 2026-08-24; set id f7f5b69a-c2a1-4586-a189-1475d41387c0. https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Lithobid\".", "link": "https://api.fda.gov/drug/label.json?search=openfda.brand_name:\"Lithobid\"", "areas": ["C", "E", "G", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-OlanzapineFluoxetine", "text": "Teva Pharmaceuticals USA. Olanzapine and fluoxetine capsules (generic of Symbyax), US prescribing information, ANDA202074/ANDA077528, effective 2026-03-31, set id 3c28cf18-01a3-468a-ab3e-8aa82f918251 (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-RisperdalConsta", "text": "Janssen Pharmaceuticals. RISPERDAL CONSTA (risperidone) long-acting injection, US prescribing information, NDA021346, effective 2025-11-05, set id bb34ee82-d2c2-43b8-ba21-2825c0954691 (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Seroquel", "text": "AstraZeneca. SEROQUEL (quetiapine fumarate) tablets, US prescribing information, NDA020639, effective 2025-01-22, set id 0584dda8-bc3c-48fe-1a90-79608f78e8a0 (boxed warning, sections 1, 2 and 5 read).", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Vraylar", "text": "Allergan. VRAYLAR (cariprazine) capsules, US prescribing information, NDA204370, effective 2025-12-18, set id 4b5f7c65-aa2d-452a-b3db-bc85c06ff12f (boxed warning, sections 1 and 2 read).", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "Feng2026", "text": "Feng YA, Lin MC, Tseng CH, Wu CS, Tsai MH, Wang SH. Paternal Valproate Exposure and Offspring Neurodevelopmental Outcomes. Neurology. 2026;107(6):e218375. PMID 42617146; doi:10.1212/WNL.0000000000218375.", "link": "https://doi.org/10.1212/wnl.0000000000218375", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ferguson2022", "text": "Ferguson M, Rhodes K, Loughhead M, McIntyre H, Procter N. The Effectiveness of the Safety Planning Intervention for Adults Experiencing Suicide-Related Distress: A Systematic Review. Arch Suicide Res. 2022;26(3):1022-1045. PMID 33913799; doi:10.1080/13811118.2021.1915217.", "link": "https://doi.org/10.1080/13811118.2021.1915217", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandes2011", "text": "Fernandes BS, Gama CS, Ceresér KM, Yatham LN, Fries GR, Colpo G, et al. Brain-derived neurotrophic factor as a state-marker of mood episodes in bipolar disorders: a systematic review and meta-regression analysis. J Psychiatr Res. 2011;45(8):995-1004. PMID 21550050; doi:10.1016/j.jpsychires.2011.03.002.", "link": "https://doi.org/10.1016/j.jpsychires.2011.03.002", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandes2015", "text": "Fernandes BS, Molendijk ML, Köhler CA, Soares JC, Leite CM, Machado-Vieira R, et al. Peripheral brain-derived neurotrophic factor (BDNF) as a biomarker in bipolar disorder: a meta-analysis of 52 studies. BMC Med. 2015;13:289. PMID 26621529; PMCID PMC4666054; doi:10.1186/s12916-015-0529-7.", "link": "https://doi.org/10.1186/s12916-015-0529-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Fernandes2016", "text": "Fernandes BS, Steiner J, Molendijk ML, Dodd S, Nardin P, Gonçalves CA, et al. C-reactive protein concentrations across the mood spectrum in bipolar disorder: a systematic review and meta-analysis. Lancet Psychiatry. 2016;3(12):1147-1156. PMID 27838212; doi:10.1016/S2215-0366(16)30370-4.", "link": "https://doi.org/10.1016/s2215-0366(16)30370-4", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ferrari2016", "text": "Ferrari AJ, Stockings E, Khoo JP, Erskine HE, Degenhardt L, Vos T, et al. The prevalence and burden of bipolar disorder: findings from the Global Burden of Disease Study 2013. Bipolar Disord. 2016;18(5):440-50. PMID 27566286; doi:10.1111/bdi.12423.", "link": "https://doi.org/10.1111/bdi.12423", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ferreira2008", "text": "Ferreira MA, O'Donovan MC, Meng YA, Jones IR, Ruderfer DM, Jones L, et al. Collaborative genome-wide association analysis supports a role for ANK3 and CACNA1C in bipolar disorder. Nat Genet. 2008;40(9):1056-8. PMID 18711365; PMCID PMC2703780; doi:10.1038/ng.209.", "link": "https://doi.org/10.1038/ng.209", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fiedorowicz2011", "text": "Fiedorowicz JG, Endicott J, Leon AC, Solomon DA, Keller MB, Coryell WH. Subthreshold hypomanic symptoms in progression from unipolar major depression to bipolar disorder. Am J Psychiatry. 2011;168(1):40-8. PMID 21078709; PMCID PMC3042431; doi:10.1176/appi.ajp.2010.10030328.", "link": "https://doi.org/10.1176/appi.ajp.2010.10030328", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Findling2015", "text": "Findling RL, Robb A, McNamara NK, Pavuluri MN, Kafantaris V, Scheffer R, et al. Lithium in the Acute Treatment of Bipolar I Disorder: A Double-Blind, Placebo-Controlled Study. Pediatrics. 2015;136(5):885-94. PMID 26459650; PMCID PMC4621794; doi:10.1542/peds.2015-0743.", "link": "https://doi.org/10.1542/peds.2015-0743", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Finley1995", "text": "Finley PR, Warner MD, Peabody CA. Clinical relevance of drug interactions with lithium. Clin Pharmacokinet. 1995;29(3):172-91. PMID 8521679; doi:10.2165/00003088-199529030-00004.", "link": "https://doi.org/10.2165/00003088-199529030-00004", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Finley1996", "text": "Finley PR, O'Brien JG, Coleman RW. Lithium and angiotensin-converting enzyme inhibitors: evaluation of a potential interaction. J Clin Psychopharmacol. 1996;16(1):68-71. PMID 8834421; doi:10.1097/00004714-199602000-00011.", "link": "https://doi.org/10.1097/00004714-199602000-00011", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "First2021", "text": "First MB, Gaebel W, Maj M, Stein DJ, Kogan CS, Saunders JB, et al. An organization- and category-level comparison of diagnostic requirements for mental disorders in ICD-11 and DSM-5. World Psychiatry. 2021;20(1):34-51. PMID 33432742; PMCID PMC7801846; doi:10.1002/wps.20825.", "link": "https://doi.org/10.1002/wps.20825", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Fornaro2015", "text": "Fornaro M, Stubbs B. A meta-analysis investigating the prevalence and moderators of migraines among people with bipolar disorder. J Affect Disord. 2015;178:88-97. PMID 25801521; doi:10.1016/j.jad.2015.02.032.", "link": "https://doi.org/10.1016/j.jad.2015.02.032", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fornaro2016", "text": "Fornaro M, Orsolini L, Marini S, De Berardis D, Perna G, Valchera A, et al. The prevalence and predictors of bipolar and borderline personality disorders comorbidity: Systematic review and meta-analysis. J Affect Disord. 2016;195:105-18. PMID 26881339; doi:10.1016/j.jad.2016.01.040.", "link": "https://doi.org/10.1016/j.jad.2016.01.040", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Frank2005IPSRT", "text": "Frank E, Kupfer DJ, Thase ME, Mallinger AG, Swartz HA, Fagiolini AM, et al. Two-year outcomes for interpersonal and social rhythm therapy in individuals with bipolar I disorder. Arch Gen Psychiatry. 2005;62(9):996-1004. PMID 16143731; doi:10.1001/archpsyc.62.9.996.", "link": "https://doi.org/10.1001/archpsyc.62.9.996", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Frans2008", "text": "Frans EM, Sandin S, Reichenberg A, Lichtenstein P, Långström N, Hultman CM. Advancing paternal age and bipolar disorder. Arch Gen Psychiatry. 2008;65(9):1034-40. PMID 18762589; doi:10.1001/archpsyc.65.9.1034.", "link": "https://doi.org/10.1001/archpsyc.65.9.1034", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Fransson2022", "text": "Fransson F, Werneke U, Harju V, Öhlund L, de Man Lapidoth J, Jonsson PA, et al. Kidney function in patients with bipolar disorder with and without lithium treatment compared with the general population in northern Sweden: results from the LiSIE and MONICA cohorts. Lancet Psychiatry. 2022;9(10):804-814. PMID 36108668; doi:10.1016/S2215-0366(22)00265-6.", "link": "https://doi.org/10.1016/s2215-0366(22)00265-6", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fransson2025", "text": "Fransson F, Werneke U, Öhlund L, Jonsson PA, Ott M. Kidney function decline improves after lithium discontinuation. J Intern Med. 2025;297(3):289-299. PMID 39829336; PMCID PMC11846072; doi:10.1111/joim.20054.", "link": "https://doi.org/10.1111/joim.20054", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fredskild2019", "text": "Fredskild MU, Mintz J, Frye MA, McElroy SL, Nolen WA, Kupka R, et al. Adding Increased Energy or Activity to Criterion (A) of the DSM-5 Definition of Hypomania and Mania: Effect on the Diagnoses of 907 Patients From the Bipolar Collaborative Network. J Clin Psychiatry. 2019;80(6). PMID 31665571; doi:10.4088/JCP.19m12834.", "link": "https://doi.org/10.4088/jcp.19m12834", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Fristad2009", "text": "Fristad MA, Verducci JS, Walters K, Young ME. Impact of multifamily psychoeducational psychotherapy in treating children aged 8 to 12 years with mood disorders. Arch Gen Psychiatry. 2009;66(9):1013-21. PMID 19736358; doi:10.1001/archgenpsychiatry.2009.112.", "link": "https://doi.org/10.1001/archgenpsychiatry.2009.112", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Gajwani2006", "text": "Gajwani P, Kemp DE, Muzina DJ, Xia G, Gao K, Calabrese JR. Acute treatment of mania: an update on new medications. Curr Psychiatry Rep. 2006;8(6):504-9. PMID 17094930; doi:10.1007/s11920-006-0058-3.", "link": "https://doi.org/10.1007/s11920-006-0058-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2019Mental", "text": "GBD 2019 Mental Disorders Collaborators. Global, regional, and national burden of 12 mental disorders in 204 countries and territories, 1990-2019: a systematic analysis for the Global Burden of Disease Study 2019. Lancet Psychiatry. 2022;9(2):137-150. PMID 35026139; PMCID PMC8776563; doi:10.1016/S2215-0366(21)00395-3.", "link": "https://doi.org/10.1016/s2215-0366(21)00395-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "GBD2023Mental", "text": "GBD 2023 Mental Disorder Collaborators. Updated trends in the global prevalence and burden of mental disorders, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023. Lancet. 2026;407(10543):2040-2064. PMID 42167272; doi:10.1016/S0140-6736(26)00519-2.", "link": "https://doi.org/10.1016/s0140-6736(26)00519-2", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Geddes2004", "text": "Geddes JR, Burgess S, Hawton K, Jamison K, Goodwin GM. Long-term lithium therapy for bipolar disorder: systematic review and meta-analysis of randomized controlled trials. Am J Psychiatry. 2004;161(2):217-22. PMID 14754766; doi:10.1176/appi.ajp.161.2.217.", "link": "https://doi.org/10.1176/appi.ajp.161.2.217", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Geddes2009Lamotrigine", "text": "Geddes JR, Calabrese JR, Goodwin GM. Lamotrigine for treatment of bipolar depression: independent meta-analysis and meta-regression of individual patient data from five randomised trials. Br J Psychiatry. 2009;194(1):4-9. PMID 19118318; doi:10.1192/bjp.bp.107.048504.", "link": "https://doi.org/10.1192/bjp.bp.107.048504", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Geddes2010BALANCE", "text": "Geddes JR, Goodwin GM, Rendell J, Azorin JM, Cipriani A, Ostacher MJ, et al. Lithium plus valproate combination therapy versus monotherapy for relapse prevention in bipolar I disorder (BALANCE): a randomised open-label trial. Lancet. 2010;375(9712):385-95. PMID 20092882; doi:10.1016/S0140-6736(09)61828-6.", "link": "https://doi.org/10.1016/s0140-6736(09)61828-6", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Gelenberg1989", "text": "Gelenberg AJ, Kane JM, Keller MB, Lavori P, Rosenbaum JF, Cole K, et al. Comparison of standard and low serum levels of lithium for maintenance treatment of bipolar disorder. N Engl J Med. 1989;321(22):1489-93. PMID 2811970; doi:10.1056/NEJM198911303212201.", "link": "https://doi.org/10.1056/nejm198911303212201", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Geoffroy2014", "text": "Geoffroy PA, Bellivier F, Scott J, Etain B. Seasonality and bipolar disorder: a systematic review, from admission rates to seasonality of symptoms. J Affect Disord. 2014;168:210-23. PMID 25063960; doi:10.1016/j.jad.2014.07.002.", "link": "https://doi.org/10.1016/j.jad.2014.07.002", "areas": ["B", "C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Geoffroy2018", "text": "Geoffroy PA, Curis E, Courtin C, Moreira J, Morvillers T, Etain B, et al. Lithium response in bipolar disorders and core clock genes expression. World J Biol Psychiatry. 2018;19(8):619-632. PMID 28095742; doi:10.1080/15622975.2017.1282174.", "link": "https://doi.org/10.1080/15622975.2017.1282174", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Geoffroy2025", "text": "Geoffroy PA, Palagini L, Henriksen TEG, Bourgin P, Garbazza C, Gronfier C, et al. Light therapy for bipolar disorders: Clinical recommendations from the international society for bipolar disorders (ISBD) Chronobiology and Chronotherapy Task Force. Dialogues Clin Neurosci. 2025;27(1):249-264. PMID 40705857; PMCID PMC12291220; doi:10.1080/19585969.2025.2533806.", "link": "https://doi.org/10.1080/19585969.2025.2533806", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gergel2021", "text": "Gergel T, Das P, Owen G, Stephenson L, Rifkin L, Hindley G, et al. Reasons for endorsing or rejecting self-binding directives in bipolar disorder: a qualitative study of survey responses from UK service users. Lancet Psychiatry. 2021;8(7):599-609. PMID 34022972; PMCID PMC8211565; doi:10.1016/S2215-0366(21)00115-2.", "link": "https://doi.org/10.1016/s2215-0366(21)00115-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ghaemi1999", "text": "Ghaemi SN, Sachs GS, Chiou AM, Pandurangi AK, Goodwin K. Is bipolar disorder still underdiagnosed? Are antidepressants overutilized? J Affect Disord. 1999;52(1-3):135-44. PMID 10357026; doi:10.1016/s0165-0327(98)00076-7.", "link": "https://doi.org/10.1016/s0165-0327(98)00076-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ghaemi2002", "text": "Ghaemi SN, Ko JY, Goodwin FK. \"Cade's disease\" and beyond: misdiagnosis, antidepressant use, and a proposed definition for bipolar spectrum disorder. Can J Psychiatry. 2002;47(2):125-34. PMID 11926074; doi:10.1177/070674370204700202.", "link": "https://doi.org/10.1177/070674370204700202", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ghaemi2014", "text": "Ghaemi SN, Dalley S, Catania C, Barroilhet S. Bipolar or borderline: a clinical overview. Acta Psychiatr Scand. 2014;130(2):99-108. PMID 24571137; doi:10.1111/acps.12257.", "link": "https://doi.org/10.1111/acps.12257", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gibbs2015", "text": "Gibbs M, Winsper C, Marwaha S, Gilbert E, Broome M, Singh SP. Cannabis use and mania symptoms: a systematic review and meta-analysis. J Affect Disord. 2015;171:39-47. PMID 25285897; doi:10.1016/j.jad.2014.09.016.", "link": "https://doi.org/10.1016/j.jad.2014.09.016", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Gigante2012", "text": "Gigante AD, Bond DJ, Lafer B, Lam RW, Young LT, Yatham LN. Brain glutamate levels measured by magnetic resonance spectroscopy in patients with bipolar disorder: a meta-analysis. Bipolar Disord. 2012;14(5):478-87. PMID 22834460; doi:10.1111/j.1399-5618.2012.01033.x.", "link": "https://doi.org/10.1111/j.1399-5618.2012.01033.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gignac2015", "text": "Gignac A, McGirr A, Lam RW, Yatham LN. Recovery and recurrence following a first episode of mania: a systematic review and meta-analysis of prospectively characterized cohorts. J Clin Psychiatry. 2015;76(9):1241-8. PMID 25845021; doi:10.4088/JCP.14r09245.", "link": "https://doi.org/10.4088/jcp.14r09245", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Gijsman2004", "text": "Gijsman HJ, Geddes JR, Rendell JM, Nolen WA, Goodwin GM. Antidepressants for bipolar depression: a systematic review of randomized, controlled trials. Am J Psychiatry. 2004;161(9):1537-47. PMID 15337640; doi:10.1176/appi.ajp.161.9.1537.", "link": "https://doi.org/10.1176/appi.ajp.161.9.1537", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Gitlin1995", "text": "Gitlin MJ, Swendsen J, Heller TL, Hammen C. Relapse and impairment in bipolar disorder. Am J Psychiatry. 1995;152(11):1635-40. PMID 7485627; doi:10.1176/ajp.152.11.1635.", "link": "https://doi.org/10.1176/ajp.152.11.1635", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gitlin2016", "text": "Gitlin M. Lithium side effects and toxicity: prevalence and management strategies. Int J Bipolar Disord. 2016;4(1):27. PMID 27900734; PMCID PMC5164879; doi:10.1186/s40345-016-0068-y.", "link": "https://doi.org/10.1186/s40345-016-0068-y", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Gitlin2017", "text": "Gitlin MJ, Miklowitz DJ. The difficult lives of individuals with bipolar disorder: A review of functional outcomes and their implications for treatment. J Affect Disord. 2017;209:147-154. PMID 27914248; PMCID PMC7213058; doi:10.1016/j.jad.2016.11.021.", "link": "https://doi.org/10.1016/j.jad.2016.11.021", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Gliddon2019", "text": "Gliddon E, Cosgrove V, Berk L, Lauder S, Mohebbi M, Grimm D, et al. A randomized controlled trial of MoodSwings 2.0: An internet-based self-management program for bipolar disorder. Bipolar Disord. 2019;21(1):28-39. PMID 29931798; doi:10.1111/bdi.12669.", "link": "https://doi.org/10.1111/bdi.12669", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Goldberg2001", "text": "Goldberg JF, Harrow M, Whiteside JE. Risk for bipolar illness in patients initially hospitalized for unipolar depression. Am J Psychiatry. 2001;158(8):1265-70. PMID 11481161; doi:10.1176/appi.ajp.158.8.1265.", "link": "https://doi.org/10.1176/appi.ajp.158.8.1265", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Goldsmith2016", "text": "Goldsmith DR, Rapaport MH, Miller BJ. A meta-analysis of blood cytokine network alterations in psychiatric patients: comparisons between schizophrenia, bipolar disorder and depression. Mol Psychiatry. 2016;21(12):1696-1709. PMID 26903267; PMCID PMC6056174; doi:10.1038/mp.2016.3.", "link": "https://doi.org/10.1038/mp.2016.3", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Goldstein2015AHA", "text": "Goldstein BI, Carnethon MR, Matthews KA, McIntyre RS, Miller GE, Raghuveer G, et al. Major Depressive Disorder and Bipolar Disorder Predispose Youth to Accelerated Atherosclerosis and Early Cardiovascular Disease: A Scientific Statement From the American Heart Association. Circulation. 2015;132(10):965-86. PMID 26260736; doi:10.1161/CIR.0000000000000229.", "link": "https://doi.org/10.1161/cir.0000000000000229", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Golic2023", "text": "Golic M, Aiff H, Attman PO, Ramsauer B, Schön S, Steingrimsson S, et al. Lifetime risk of severe kidney disease in lithium-treated patients: a retrospective study. Int J Bipolar Disord. 2023;11(1):39. PMID 38070020; PMCID PMC10710395; doi:10.1186/s40345-023-00319-2.", "link": "https://doi.org/10.1186/s40345-023-00319-2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "GonzalezPinto1998", "text": "Gonzalez-Pinto A, Gutierrez M, Mosquera F, Ballesteros J, Lopez P, Ezcurra J, et al. First episode in bipolar disorder: misdiagnosis and psychotic symptoms. J Affect Disord. 1998;50(1):41-4. PMID 9716278; doi:10.1016/s0165-0327(98)00032-9.", "link": "https://doi.org/10.1016/s0165-0327(98)00032-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Goodwin2004Lamotrigine", "text": "Goodwin GM, Bowden CL, Calabrese JR, Grunze H, Kasper S, White R, et al. A pooled analysis of 2 placebo-controlled 18-month trials of lamotrigine and lithium maintenance in bipolar I disorder. J Clin Psychiatry. 2004;65(3):432-41. PMID 15096085; doi:10.4088/jcp.v65n0321.", "link": "https://doi.org/10.4088/jcp.v65n0321", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Goodwin2016BAP", "text": "Goodwin GM, Haddad PM, Ferrier IN, Aronson JK, Barnes T, Cipriani A, et al. Evidence-based guidelines for treating bipolar disorder: Revised third edition recommendations from the British Association for Psychopharmacology. J Psychopharmacol. 2016;30(6):495-553. PMID 26979387; PMCID PMC4922419; doi:10.1177/0269881116636545. Wording read from the PMC author manuscript.", "link": "https://doi.org/10.1177/0269881116636545", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Goossens2022", "text": "Goossens PJJ, de Velde Harsenhorst R, van Lankeren JE, Testerink AE, Daggenvoorde TH. Nursing Care for Patients With Acute Mania: Exploring Experiential Knowledge and Developing a Standard of Good Care-Results of the Delphi Study. J Am Psychiatr Nurses Assoc. 2022;28(5):366-381. PMID 32964789; doi:10.1177/1078390320960519.", "link": "https://doi.org/10.1177/1078390320960519", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Gordovez2020", "text": "Gordovez FJA, McMahon FJ. The genetics of bipolar disorder. Mol Psychiatry. 2020;25(3):544-559. PMID 31907381; doi:10.1038/s41380-019-0634-7.", "link": "https://doi.org/10.1038/s41380-019-0634-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Gottesman2010", "text": "Gottesman II, Laursen TM, Bertelsen A, Mortensen PB. Severe mental disorders in offspring with 2 psychiatrically ill parents. Arch Gen Psychiatry. 2010;67(3):252-7. PMID 20194825; doi:10.1001/archgenpsychiatry.2010.1.", "link": "https://doi.org/10.1001/archgenpsychiatry.2010.1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Gould2005", "text": "Gould TD, Manji HK. Glycogen synthase kinase-3: a putative molecular target for lithium mimetic drugs. Neuropsychopharmacology. 2005;30(7):1223-37. PMID 15827567; doi:10.1038/sj.npp.1300731.", "link": "https://doi.org/10.1038/sj.npp.1300731", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Grande2016", "text": "Grande I, Berk M, Birmaher B, Vieta E. Bipolar disorder. Lancet. 2016;387(10027):1561-1572. PMID 26388529; doi:10.1016/S0140-6736(15)00241-X.", "link": "https://doi.org/10.1016/s0140-6736(15)00241-x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Grandjean2009PartII", "text": "Grandjean EM, Aubry JM. Lithium: updated human knowledge using an evidence-based approach. Part II: Clinical pharmacology and therapeutic monitoring. CNS Drugs. 2009;23(4):331-49. PMID 19374461; doi:10.2165/00023210-200923040-00005.", "link": "https://doi.org/10.2165/00023210-200923040-00005", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Grandjean2009PartIII", "text": "Grandjean EM, Aubry JM. Lithium: updated human knowledge using an evidence-based approach: part III: clinical safety. CNS Drugs. 2009;23(5):397-418. PMID 19453201; doi:10.2165/00023210-200923050-00004.", "link": "https://doi.org/10.2165/00023210-200923050-00004", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Green2016CNV", "text": "Green EK, Rees E, Walters JT, Smith KG, Forty L, Grozeva D, et al. Copy number variation in bipolar disorder. Mol Psychiatry. 2016;21(1):89-93. PMID 25560756; PMCID PMC5038134; doi:10.1038/mp.2014.174.", "link": "https://doi.org/10.1038/mp.2014.174", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Grof2002", "text": "Grof P, Duffy A, Cavazzoni P, Grof E, Garnham J, MacDougall M, et al. Is response to prophylactic lithium a familial trait? J Clin Psychiatry. 2002;63(10):942-7. PMID 12416605; doi:10.4088/jcp.v63n1013.", "link": "https://doi.org/10.4088/jcp.v63n1013", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Grozeva2010", "text": "Grozeva D, Kirov G, Ivanov D, Jones IR, Jones L, Green EK, et al. Rare copy number variants: a point of rarity in genetic risk for bipolar disorder and schizophrenia. Arch Gen Psychiatry. 2010;67(4):318-27. PMID 20368508; PMCID PMC4476027; doi:10.1001/archgenpsychiatry.2010.25.", "link": "https://doi.org/10.1001/archgenpsychiatry.2010.25", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Grunze2021", "text": "Grunze A, Born C, Fredskild MU, Grunze H. How Does Adding the DSM-5 Criterion Increased Energy/Activity for Mania Change the Bipolar Landscape?. Front Psychiatry. 2021;12:638440. PMID 33679488; PMCID PMC7930230; doi:10.3389/fpsyt.2021.638440.", "link": "https://doi.org/10.3389/fpsyt.2021.638440", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Gupta2025Cochrane", "text": "Gupta S, Astill Wright L, Onwuchekwa O, Meader N, Kenny RP, Steele R, et al. Interventions for helping people recognise early signs of recurrence in bipolar disorder. Cochrane Database Syst Rev. 2025;6(6):CD015343. PMID 40530762; PMCID PMC12175751; doi:10.1002/14651858.CD015343.pub2.", "link": "https://doi.org/10.1002/14651858.cd015343.pub2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hafeman2025", "text": "Hafeman DM, Uher R, Merranko J, Zwicker A, Goldstein B, Goldstein TR, et al. Person-level contributions of bipolar polygenic risk score to the prediction of new-onset bipolar disorder in at-risk offspring. J Affect Disord. 2025;368:359-365. PMID 39299598; PMCID PMC11869166; doi:10.1016/j.jad.2024.09.107.", "link": "https://doi.org/10.1016/j.jad.2024.09.107", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hajek2012", "text": "Hajek T, Cullis J, Novak T, Kopecek M, Höschl C, Blagdon R, et al. Hippocampal volumes in bipolar disorders: opposing effects of illness burden and lithium treatment. Bipolar Disord. 2012;14(3):261-70. PMID 22548899; PMCID PMC3525647; doi:10.1111/j.1399-5618.2012.01013.x.", "link": "https://doi.org/10.1111/j.1399-5618.2012.01013.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hajek2014", "text": "Hajek T, Bauer M, Simhandl C, Rybakowski J, O'Donovan C, Pfennig A, et al. Neuroprotective effect of lithium on hippocampal volumes in bipolar disorder independent of long-term treatment response. Psychol Med. 2014;44(3):507-17. PMID 23721695; doi:10.1017/S0033291713001165.", "link": "https://doi.org/10.1017/s0033291713001165", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hallahan2011", "text": "Hallahan B, Newell J, Soares JC, Brambilla P, Strakowski SM, Fleck DE, et al. Structural magnetic resonance imaging in bipolar disorder: an international collaborative mega-analysis of individual adult patient data. Biol Psychiatry. 2011;69(4):326-35. PMID 21030008; doi:10.1016/j.biopsych.2010.08.029.", "link": "https://doi.org/10.1016/j.biopsych.2010.08.029", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hallcher1980", "text": "Hallcher LM, Sherman WR. The effects of lithium ion and other agents on the activity of myo-inositol-1-phosphatase from bovine brain. J Biol Chem. 1980;255(22):10896-901. PMID 6253491;", "link": "https://pubmed.ncbi.nlm.nih.gov/6253491/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hamilton1960", "text": "Hamilton M. A rating scale for depression. J Neurol Neurosurg Psychiatry. 1960;23(1):56-62. PMID 14399272; PMCID PMC495331; doi:10.1136/jnnp.23.1.56.", "link": "https://doi.org/10.1136/jnnp.23.1.56", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harrison2018TINS", "text": "Harrison PJ, Geddes JR, Tunbridge EM. The Emerging Neurobiology of Bipolar Disorder. Trends Neurosci. 2018;41(1):18-30. PMID 29169634; PMCID PMC5755726; doi:10.1016/j.tins.2017.10.006.", "link": "https://doi.org/10.1016/j.tins.2017.10.006", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Harter2025", "text": "Härter M, Schneider F. Affective disorders-developments of ICD-11 in comparison with ICD-10. Nervenarzt. 2025;96(Suppl 1):6-10. PMID 40932648; PMCID PMC12638406; doi:10.1007/s00115-025-01877-9.", "link": "https://doi.org/10.1007/s00115-025-01877-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Harvey2005Sleep", "text": "Harvey AG, Schmidt DA, Scarnà A, Semler CN, Goodwin GM. Sleep-related functioning in euthymic patients with bipolar disorder, patients with insomnia, and subjects without sleep problems. Am J Psychiatry. 2005;162(1):50-7. PMID 15625201; doi:10.1176/appi.ajp.162.1.50.", "link": "https://doi.org/10.1176/appi.ajp.162.1.50", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Harvey2015CBTI", "text": "Harvey AG, Soehner AM, Kaplan KA, Hein K, Lee J, Kanady J, et al. Treating insomnia improves mood state, sleep, and functioning in bipolar disorder: a pilot randomized controlled trial. J Consult Clin Psychol. 2015;83(3):564-77. PMID 25622197; PMCID PMC4446240; doi:10.1037/a0038655.", "link": "https://doi.org/10.1037/a0038655", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Harwood2005", "text": "Harwood AJ. Lithium and bipolar mood disorder: the inositol-depletion hypothesis revisited. Mol Psychiatry. 2005;10(1):117-26. PMID 15558078; doi:10.1038/sj.mp.4001618.", "link": "https://doi.org/10.1038/sj.mp.4001618", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Haukvik2022", "text": "Haukvik UK, Gurholt TP, Nerland S, Elvsåshagen T, Akudjedu TN, Alda M, et al. In vivo hippocampal subfield volumes in bipolar disorder-A mega-analysis from The Enhancing Neuro Imaging Genetics through Meta-Analysis Bipolar Disorder Working Group. Hum Brain Mapp. 2022;43(1):385-398. PMID 33073925; PMCID PMC8675404; doi:10.1002/hbm.25249.", "link": "https://doi.org/10.1002/hbm.25249", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Haustgen2006", "text": "Haustgen T, Akiskal H. French antecedents of \"contemporary\" concepts in the American Psychiatric Association's classification of bipolar (mood) disorders. J Affect Disord. 2006;96(3):149-63. PMID 17092563; doi:10.1016/j.jad.2006.09.014.", "link": "https://doi.org/10.1016/j.jad.2006.09.014", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hawton2005Bipolar", "text": "Hawton K, Sutton L, Haw C, Sinclair J, Harriss L. Suicide and attempted suicide in bipolar disorder: a systematic review of risk factors. J Clin Psychiatry. 2005;66(6):693-704. PMID 15960561; doi:10.4088/jcp.v66n0604.", "link": "https://doi.org/10.4088/jcp.v66n0604", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hayes2015", "text": "Hayes JF, Miles J, Walters K, King M, Osborn DP. A systematic review and meta-analysis of premature mortality in bipolar affective disorder. Acta Psychiatr Scand. 2015;131(6):417-25. PMID 25735195; PMCID PMC4939858; doi:10.1111/acps.12408.", "link": "https://doi.org/10.1111/acps.12408", "areas": ["A", "G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Hayes2015Mortality", "Hayes2015SMR"]}, {"key": "Hayes2016JAMAPsychiatry", "text": "Hayes JF, Pitman A, Marston L, Walters K, Geddes JR, King M, et al. Self-harm, Unintentional Injury, and Suicide in Bipolar Disorder During Maintenance Mood Stabilizer Treatment: A UK Population-Based Electronic Health Records Study. JAMA Psychiatry. 2016;73(6):630-7. PMID 27167638; doi:10.1001/jamapsychiatry.2016.0432.", "link": "https://doi.org/10.1001/jamapsychiatry.2016.0432", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hayes2016PLoSMed", "text": "Hayes JF, Marston L, Walters K, Geddes JR, King M, Osborn DP. Adverse Renal, Endocrine, Hepatic, and Metabolic Events during Maintenance Mood Stabilizer Treatment for Bipolar Disorder: A Population-Based Cohort Study. PLoS Med. 2016;13(8):e1002058. PMID 27483368; PMCID PMC4970809; doi:10.1371/journal.pmed.1002058.", "link": "https://doi.org/10.1371/journal.pmed.1002058", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hayes2016WorldPsychiatry", "text": "Hayes JF, Marston L, Walters K, Geddes JR, King M, Osborn DP. Lithium vs. valproate vs. olanzapine vs. quetiapine as maintenance monotherapy for bipolar disorder: a population-based UK cohort study using electronic health records. World Psychiatry. 2016;15(1):53-8. PMID 26833609; PMCID PMC4780296; doi:10.1002/wps.20298.", "link": "https://doi.org/10.1002/wps.20298", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hayes2017", "text": "Hayes JF, Marston L, Walters K, King MB, Osborn DPJ. Mortality gap for people with bipolar disorder and schizophrenia: UK-based cohort study 2000-2014. Br J Psychiatry. 2017;211(3):175-181. PMID 28684403; PMCID PMC5579328; doi:10.1192/bjp.bp.117.202606.", "link": "https://doi.org/10.1192/bjp.bp.117.202606", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "He2020GBD", "text": "He H, Hu C, Ren Z, Bai L, Gao F, Lyu J. Trends in the incidence and DALYs of bipolar disorder at global, regional, and national levels: Results from the global burden of Disease Study 2017. J Psychiatr Res. 2020;125:96-105. PMID 32251918; doi:10.1016/j.jpsychires.2020.03.015.", "link": "https://doi.org/10.1016/j.jpsychires.2020.03.015", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Helmink2025", "text": "Helmink FGL, Mesman E, Hillegers MHJ. Beyond the Window of Risk? The Dutch Bipolar Offspring Study: 22-Year Follow-Up. J Am Acad Child Adolesc Psychiatry. 2025;64(5):593-601. PMID 38851383; doi:10.1016/j.jaac.2024.05.024.", "link": "https://doi.org/10.1016/j.jaac.2024.05.024", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Henderson2004BMJ", "text": "Henderson C, Flood C, Leese M, Thornicroft G, Sutherby K, Szmukler G. Effect of joint crisis plans on use of compulsory treatment in psychiatry: single blind randomised controlled trial. BMJ. 2004;329(7458):136. PMID 15240438; PMCID PMC478218; doi:10.1136/bmj.38155.585046.63.", "link": "https://doi.org/10.1136/bmj.38155.585046.63", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Henriksen2016", "text": "Henriksen TE, Skrede S, Fasmer OB, Schoeyen H, Leskauskaite I, Bjørke-Bertheussen J, et al. Blue-blocking glasses as additive treatment for mania: a randomized placebo-controlled trial. Bipolar Disord. 2016;18(3):221-32. PMID 27226262; PMCID PMC5089565; doi:10.1111/bdi.12390.", "link": "https://doi.org/10.1111/bdi.12390", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Hibar2016", "text": "Hibar DP, Westlye LT, van Erp TG, Rasmussen J, Leonardo CD, Faskowitz J, et al. Subcortical volumetric abnormalities in bipolar disorder. Mol Psychiatry. 2016;21(12):1710-1716. PMID 26857596; PMCID PMC5116479; doi:10.1038/mp.2015.227.", "link": "https://doi.org/10.1038/mp.2015.227", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hibar2018", "text": "Hibar DP, Westlye LT, Doan NT, Jahanshad N, Cheung JW, Ching CRK, et al. Cortical abnormalities in bipolar disorder: an MRI analysis of 6503 individuals from the ENIGMA Bipolar Disorder Working Group. Mol Psychiatry. 2018;23(4):932-942. PMID 28461699; PMCID PMC5668195; doi:10.1038/mp.2017.73. Lithium-cortical thickness direction and effect sizes read from the Europe PMC full text.", "link": "https://doi.org/10.1038/mp.2017.73", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hippman2016", "text": "Hippman C, Ringrose A, Inglis A, Cheek J, Albert AY, Remick R, et al. A pilot randomized clinical trial evaluating the impact of genetic counseling for serious mental illnesses. J Clin Psychiatry. 2016;77(2):e190-8. PMID 26930535; PMCID PMC4864025; doi:10.4088/JCP.14m09710.", "link": "https://doi.org/10.4088/jcp.14m09710", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hirschfeld2000MDQ", "text": "Hirschfeld RM, Williams JB, Spitzer RL, Calabrese JR, Flynn L, Keck PE Jr, et al. Development and validation of a screening instrument for bipolar spectrum disorder: the Mood Disorder Questionnaire. Am J Psychiatry. 2000;157(11):1873-5. PMID 11058490; doi:10.1176/appi.ajp.157.11.1873.", "link": "https://doi.org/10.1176/appi.ajp.157.11.1873", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hirschfeld2003", "text": "Hirschfeld RM, Lewis L, Vornik LA. Perceptions and impact of bipolar disorder: how far have we really come? Results of the national depressive and manic-depressive association 2000 survey of individuals with bipolar disorder. J Clin Psychiatry. 2003;64(2):161-74. PMID 12633125.", "link": "https://pubmed.ncbi.nlm.nih.gov/12633125/", "areas": ["A", "D"], "unverified": false, "validated": "PubMed", "aliases": ["Hirschfeld2003Perceptions"]}, {"key": "Hirschfeld2003AJP", "text": "Hirschfeld RM, Holzer C, Calabrese JR, Weissman M, Reed M, Davies M, et al. Validity of the mood disorder questionnaire: a general population study. Am J Psychiatry. 2003;160(1):178-80. PMID 12505821; doi:10.1176/appi.ajp.160.1.178.", "link": "https://doi.org/10.1176/appi.ajp.160.1.178", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hirschfeld2003Community", "text": "Hirschfeld RM, Calabrese JR, Weissman MM, Reed M, Davies MA, Frye MA, et al. Screening for bipolar disorder in the community. J Clin Psychiatry. 2003;64(1):53-9. PMID 12590624; doi:10.4088/jcp.v64n0111.", "link": "https://doi.org/10.4088/jcp.v64n0111", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Holma2014", "text": "Holma KM, Haukka J, Suominen K, Valtonen HM, Mantere O, Melartin TK, et al. Differences in incidence of suicide attempts between bipolar I and II disorders and major depressive disorder. Bipolar Disord. 2014;16(6):652-61. PMID 24636453; doi:10.1111/bdi.12195.", "link": "https://doi.org/10.1111/bdi.12195", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hou2016Lithium", "text": "Hou L, Heilbronner U, Degenhardt F, Adli M, Akiyama K, Akula N, et al. Genetic variants associated with response to lithium treatment in bipolar disorder: a genome-wide association study. Lancet. 2016;387(10023):1085-1093. PMID 26806518; PMCID PMC4814312; doi:10.1016/S0140-6736(16)00143-4.", "link": "https://doi.org/10.1016/s0140-6736(16)00143-4", "areas": ["B", "C", "E", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Hou2016", "Hou2016ConLiGen"]}, {"key": "Hunt2016Clinical", "text": "Hunt GE, Malhi GS, Cleary M, Lai HM, Sitharthan T. Prevalence of comorbid bipolar and substance use disorders in clinical settings, 1990-2015: Systematic review and meta-analysis. J Affect Disord. 2016;206:331-349. PMID 27476137; doi:10.1016/j.jad.2016.07.011.", "link": "https://doi.org/10.1016/j.jad.2016.07.011", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Hunt2016Surveys", "text": "Hunt GE, Malhi GS, Cleary M, Lai HM, Sitharthan T. Comorbidity of bipolar and substance use disorders in national surveys of general populations, 1990-2015: Systematic review and meta-analysis. J Affect Disord. 2016;206:321-330. PMID 27426694; doi:10.1016/j.jad.2016.06.051.", "link": "https://doi.org/10.1016/j.jad.2016.06.051", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Husain2020", "text": "Husain MI, Chaudhry IB, Khoso AB, Husain MO, Hodsoll J, Ansari MA, et al. Minocycline and celecoxib as adjunctive treatments for bipolar depression: a multicentre, factorial design randomised controlled trial. Lancet Psychiatry. 2020;7(6):515-527. PMID 32445690; doi:10.1016/S2215-0366(20)30138-3.", "link": "https://doi.org/10.1016/s2215-0366(20)30138-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Iacobucci2018", "text": "Iacobucci G. MHRA bans valproate prescribing for women not in pregnancy prevention programme. BMJ. 2018;361:k1823. PMID 29695479; doi:10.1136/bmj.k1823.", "link": "https://doi.org/10.1136/bmj.k1823", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Inagaki2019", "text": "Inagaki M, Kawashima Y, Yonemoto N, Yamada M. Active contact and follow-up interventions to prevent repeat suicide attempts during high-risk periods among patients admitted to emergency departments for suicidal behavior: a systematic review and meta-analysis. BMC Psychiatry. 2019;19(1):44. PMID 30683075; PMCID PMC6347824; doi:10.1186/s12888-019-2017-7.", "link": "https://doi.org/10.1186/s12888-019-2017-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Jackson2003", "text": "Jackson A, Cavanagh J, Scott J. A systematic review of manic and depressive prodromes. J Affect Disord. 2003;74(3):209-17. PMID 12738039; doi:10.1016/s0165-0327(02)00266-5.", "link": "https://doi.org/10.1016/s0165-0327(02)00266-5", "areas": ["C", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Jackson2003Prodromes"]}, {"key": "Jackson2015Smoking", "text": "Jackson JG, Diaz FJ, Lopez L, de Leon J. A combined analysis of worldwide studies demonstrates an association between bipolar disorder and tobacco smoking behaviors in adults. Bipolar Disord. 2015;17(6):575-97. PMID 26238269; doi:10.1111/bdi.12319.", "link": "https://doi.org/10.1111/bdi.12319", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Jefsen2021", "text": "Jefsen OH, Speed M, Speed D, Østergaard SD. Bipolar disorder and cannabis use: A bidirectional two-sample Mendelian randomization study. Addict Biol. 2021;26(6):e13030. PMID 33733564; doi:10.1111/adb.13030.", "link": "https://doi.org/10.1111/adb.13030", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jefsen2023", "text": "Jefsen OH, Erlangsen A, Nordentoft M, Hjorthøj C. Cannabis Use Disorder and Subsequent Risk of Psychotic and Nonpsychotic Unipolar Depression and Bipolar Disorder. JAMA Psychiatry. 2023;80(8):803-810. PMID 37223912; PMCID PMC10209828; doi:10.1001/jamapsychiatry.2023.1256.", "link": "https://doi.org/10.1001/jamapsychiatry.2023.1256", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jiang2025GBD", "text": "Jiang J, Chen Y, Lin Z, Liu S, Chen X, Chen Q. Global, regional, and national burden of bipolar disorder, 1990-2021: Analysis of data from the global burden of disease study 2021. J Affect Disord. 2025;389:119638. PMID 40499832; doi:10.1016/j.jad.2025.119638.", "link": "https://doi.org/10.1016/j.jad.2025.119638", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Johansson2019", "text": "Johansson V, Kuja-Halkola R, Cannon TD, Hultman CM, Hedman AM. A population-based heritability estimate of bipolar disorder - In a Swedish twin sample. Psychiatry Res. 2019;278:180-187. PMID 31207455; doi:10.1016/j.psychres.2019.06.010.", "link": "https://doi.org/10.1016/j.psychres.2019.06.010", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2000Goal", "text": "Johnson SL, Sandrow D, Meyer B, Winters R, Miller I, Solomon D, et al. Increases in manic symptoms after life events involving goal attainment. J Abnorm Psychol. 2000;109(4):721-7. PMID 11195996; PMCID PMC2847485; doi:10.1037//0021-843x.109.4.721.", "link": "https://doi.org/10.1037//0021-843x.109.4.721", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2008Mania", "text": "Johnson SL, Cueller AK, Ruggero C, Winett-Perlman C, Goodnick P, White R, et al. Life events as predictors of mania and depression in bipolar I disorder. J Abnorm Psychol. 2008;117(2):268-277. PMID 18489203; PMCID PMC2862221; doi:10.1037/0021-843X.117.2.268.", "link": "https://doi.org/10.1037/0021-843x.117.2.268", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2022Mania", "text": "Johnson SL, Weinberg BZS. Social and environmental variables as predictors of mania: a review of longitudinal research findings. Discov Ment Health. 2022;2(1):7. PMID 35310132; PMCID PMC8918447; doi:10.1007/s44192-022-00010-5.", "link": "https://doi.org/10.1007/s44192-022-00010-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jones2014Lancet", "text": "Jones I, Chandra PS, Dazzan P, Howard LM. Bipolar disorder, affective psychosis, and schizophrenia in pregnancy and the post-partum period. Lancet. 2014;384(9956):1789-99. PMID 25455249; doi:10.1016/S0140-6736(14)61278-2.", "link": "https://doi.org/10.1016/s0140-6736(14)61278-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Judd2002", "text": "Judd LL, Akiskal HS, Schettler PJ, Endicott J, Maser J, Solomon DA, et al. The long-term natural history of the weekly symptomatic status of bipolar I disorder. Arch Gen Psychiatry. 2002;59(6):530-7. PMID 12044195; doi:10.1001/archpsyc.59.6.530.", "link": "https://doi.org/10.1001/archpsyc.59.6.530", "areas": ["A", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Judd2003", "text": "Judd LL, Akiskal HS, Schettler PJ, Coryell W, Endicott J, Maser JD, et al. A prospective investigation of the natural history of the long-term weekly symptomatic status of bipolar II disorder. Arch Gen Psychiatry. 2003;60(3):261-9. PMID 12622659; doi:10.1001/archpsyc.60.3.261.", "link": "https://doi.org/10.1001/archpsyc.60.3.261", "areas": ["A", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Juurlink2004", "text": "Juurlink DN, Mamdani MM, Kopp A, Rochon PA, Shulman KI, Redelmeier DA. Drug-induced lithium toxicity in the elderly: a population-based study. J Am Geriatr Soc. 2004;52(5):794-8. PMID 15086664; doi:10.1111/j.1532-5415.2004.52221.x.", "link": "https://doi.org/10.1111/j.1532-5415.2004.52221.x", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Juurlink2004Lithium"]}, {"key": "Kapczinski2008", "text": "Kapczinski F, Vieta E, Andreazza AC, Frey BN, Gomes FA, Tramontina J, et al. Allostatic load in bipolar disorder: implications for pathophysiology and treatment. Neurosci Biobehav Rev. 2008;32(4):675-92. PMID 18199480; doi:10.1016/j.neubiorev.2007.10.005.", "link": "https://doi.org/10.1016/j.neubiorev.2007.10.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kato2017", "text": "Kato T. Neurobiological basis of bipolar disorder: Mitochondrial dysfunction hypothesis and beyond. Schizophr Res. 2017;187:62-66. PMID 27839913; doi:10.1016/j.schres.2016.10.037.", "link": "https://doi.org/10.1016/j.schres.2016.10.037", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Katz2022", "text": "Katz IR, Rogers MP, Lew R, Thwin SS, Doros G, Ahearn E, et al. Lithium Treatment in the Prevention of Repeat Suicide-Related Outcomes in Veterans With Major Depression or Bipolar Disorder: A Randomized Clinical Trial. JAMA Psychiatry. 2022;79(1):24-32. PMID 34787653; PMCID PMC8600458; doi:10.1001/jamapsychiatry.2021.3170.", "link": "https://doi.org/10.1001/jamapsychiatry.2021.3170", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Keck2003", "text": "Keck PE Jr, McElroy SL, Havens JR, Altshuler LL, Nolen WA, Frye MA, et al. Psychosis in bipolar disorder: phenomenology and impact on morbidity and course of illness. Compr Psychiatry. 2003;44(4):263-9. PMID 12923703; doi:10.1016/S0010-440X(03)00089-0.", "link": "https://doi.org/10.1016/s0010-440x(03)00089-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kemner2015IJBD", "text": "Kemner SM, van Haren NE, Bootsman F, Eijkemans MJ, Vonk R, van der Schot AC, et al. The influence of life events on first and recurrent admissions in bipolar disorder. Int J Bipolar Disord. 2015;3:6. PMID 25717427; PMCID PMC4339321; doi:10.1186/s40345-015-0022-4.", "link": "https://doi.org/10.1186/s40345-015-0022-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kemner2015PsycholMed", "text": "Kemner SM, Mesman E, Nolen WA, Eijckemans MJ, Hillegers MH. The role of life events and psychological factors in the onset of first and recurrent mood episodes in bipolar offspring: results from the Dutch Bipolar Offspring Study. Psychol Med. 2015;45(12):2571-81. PMID 25865058; doi:10.1017/S0033291715000495.", "link": "https://doi.org/10.1017/s0033291715000495", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kempton2008", "text": "Kempton MJ, Geddes JR, Ettinger U, Williams SC, Grasby PM. Meta-analysis, database, and meta-regression of 98 structural imaging studies in bipolar disorder. Arch Gen Psychiatry. 2008;65(9):1017-32. PMID 18762588; doi:10.1001/archpsyc.65.9.1017.", "link": "https://doi.org/10.1001/archpsyc.65.9.1017", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kendell1987", "text": "Kendell RE, Chalmers JC, Platz C. Epidemiology of puerperal psychoses. Br J Psychiatry. 1987;150:662-73. PMID 3651704; doi:10.1192/bjp.150.5.662.", "link": "https://doi.org/10.1192/bjp.150.5.662", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kendler2021", "text": "Kendler KS. Kraepelin's final views on manic-depressive Illness. J Affect Disord. 2021;282:979-990. PMID 33601743; doi:10.1016/j.jad.2020.12.200.", "link": "https://doi.org/10.1016/j.jad.2020.12.200", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kendler2026Mating", "text": "Kendler K, Sundquist J, Sundquist K, Abrahamsson L. The risk for major depression and bipolar disorder in the offspring of informative parental mating types: a Swedish population-based study. Psychol Med. 2026;56:e44. PMID 41667937; PMCID PMC12902172; doi:10.1017/S0033291726103286.", "link": "https://doi.org/10.1017/s0033291726103286", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Keramatian2023", "text": "Keramatian K, Chithra NK, Yatham LN. The CANMAT and ISBD Guidelines for the Treatment of Bipolar Disorder: Summary and a 2023 Update of Evidence. Focus (Am Psychiatr Publ). 2023;21(4):344-353. PMID 38695002; PMCID PMC11058959; doi:10.1176/appi.focus.20230009.", "link": "https://doi.org/10.1176/appi.focus.20230009", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Keramatian2025", "text": "Keramatian K, Pinto JV, Tsang VWL, Chakrabarty T, Yatham LN. Duration of untreated or undiagnosed bipolar disorder and clinical characteristics and outcomes: systematic review and meta-analysis. Br J Psychiatry. 2025;227(3):622-632. PMID 40337852; doi:10.1192/bjp.2025.63.", "link": "https://doi.org/10.1192/bjp.2025.63", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing1998Recurrence", "text": "Kessing LV, Andersen PK, Mortensen PB, Bolwig TG. Recurrence in affective disorder. I. Case register study. Br J Psychiatry. 1998;172:23-8. PMID 9534827; doi:10.1192/bjp.172.1.23.", "link": "https://doi.org/10.1192/bjp.172.1.23", "areas": ["C", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Kessing1998"]}, {"key": "Kessing2004Course", "text": "Kessing LV, Hansen MG, Andersen PK. Course of illness in depressive and bipolar disorders. Naturalistic study, 1994-1999. Br J Psychiatry. 2004;185:372-7. PMID 15516544; doi:10.1192/bjp.185.5.372.", "link": "https://doi.org/10.1192/bjp.185.5.372", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2005Suicide", "text": "Kessing LV, Søndergård L, Kvist K, Andersen PK. Suicide risk in patients treated with lithium. Arch Gen Psychiatry. 2005;62(8):860-6. PMID 16061763; doi:10.1001/archpsyc.62.8.860.", "link": "https://doi.org/10.1001/archpsyc.62.8.860", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2008Dementia", "text": "Kessing LV, Søndergård L, Forman JL, Andersen PK. Lithium treatment and risk of dementia. Arch Gen Psychiatry. 2008;65(11):1331-5. PMID 18981345; doi:10.1001/archpsyc.65.11.1331.", "link": "https://doi.org/10.1001/archpsyc.65.11.1331", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2011BJP", "text": "Kessing LV, Hellmund G, Geddes JR, Goodwin GM, Andersen PK. Valproate v. lithium in the treatment of bipolar disorder in clinical practice: observational nationwide register-based cohort study. Br J Psychiatry. 2011;199(1):57-63. PMID 21593515; doi:10.1192/bjp.bp.110.084822.", "link": "https://doi.org/10.1192/bjp.bp.110.084822", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2013Clinic", "text": "Kessing LV, Hansen HV, Hvenegaard A, Christensen EM, Dam H, Gluud C, et al. Treatment in a specialised out-patient mood disorder clinic v. standard out-patient treatment in the early course of bipolar disorder: randomised clinical trial. Br J Psychiatry. 2013;202(3):212-9. PMID 23349295; doi:10.1192/bjp.bp.112.113548.", "link": "https://doi.org/10.1192/bjp.bp.112.113548", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2015", "text": "Kessing LV, Vradi E, McIntyre RS, Andersen PK. Causes of decreased life expectancy over the life span in bipolar disorder. J Affect Disord. 2015;180:142-7. PMID 25909752; doi:10.1016/j.jad.2015.03.027.", "link": "https://doi.org/10.1016/j.jad.2015.03.027", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2017Progression", "text": "Kessing LV, Andersen PK. Evidence for clinical progression of unipolar and bipolar disorders. Acta Psychiatr Scand. 2017;135(1):51-64. PMID 27858964; doi:10.1111/acps.12667.", "link": "https://doi.org/10.1111/acps.12667", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2021LifeExp", "text": "Kessing LV, Ziersen SC, Andersen PK, Vinberg M. A nation-wide population-based longitudinal study on life expectancy and cause specific mortality in patients with bipolar disorder and their siblings. J Affect Disord. 2021;294:472-476. PMID 34325167; doi:10.1016/j.jad.2021.07.065.", "link": "https://doi.org/10.1016/j.jad.2021.07.065", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2024Physical", "text": "Kessing LV, Knudsen MB, Rytgaard HCW, Torp-Pedersen C, Berk M. Lithium versus anticonvulsants and the risk of physical disorders - Results from a comprehensive long-term nation-wide population-based study emulating a target trial. Eur Neuropsychopharmacol. 2024;84:48-56. PMID 38663126; doi:10.1016/j.euroneuro.2024.04.009.", "link": "https://doi.org/10.1016/j.euroneuro.2024.04.009", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kessing2024Why", "text": "Kessing LV. Why is lithium [not] the drug of choice for bipolar disorder? a controversy between science and clinical practice. Int J Bipolar Disord. 2024;12(1):3. PMID 38228882; PMCID PMC10792154; doi:10.1186/s40345-023-00322-7.", "link": "https://doi.org/10.1186/s40345-023-00322-7", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kessler2004CIDI", "text": "Kessler RC, Ustün TB. The World Mental Health (WMH) Survey Initiative Version of the World Health Organization (WHO) Composite International Diagnostic Interview (CIDI). Int J Methods Psychiatr Res. 2004;13(2):93-121. PMID 15297906; PMCID PMC6878592; doi:10.1002/mpr.168.", "link": "https://doi.org/10.1002/mpr.168", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kessler2005Onset", "text": "Kessler RC, Berglund P, Demler O, Jin R, Merikangas KR, Walters EE. Lifetime prevalence and age-of-onset distributions of DSM-IV disorders in the National Comorbidity Survey Replication. Arch Gen Psychiatry. 2005;62(6):593-602. PMID 15939837; doi:10.1001/archpsyc.62.6.593.", "link": "https://doi.org/10.1001/archpsyc.62.6.593", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Kessler2006CIDI", "text": "Kessler RC, Akiskal HS, Angst J, Guyer M, Hirschfeld RM, Merikangas KR, et al. Validity of the assessment of bipolar spectrum disorders in the WHO CIDI 3.0. J Affect Disord. 2006;96(3):259-69. PMID 16997383; PMCID PMC1821426; doi:10.1016/j.jad.2006.08.018.", "link": "https://doi.org/10.1016/j.jad.2006.08.018", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ketter2014", "text": "Ketter TA, Miller S, Dell'Osso B, Calabrese JR, Frye MA, Citrome L. Balancing benefits and harms of treatments for acute bipolar depression. J Affect Disord. 2014;169 Suppl 1:S24-33. PMID 25533911; doi:10.1016/S0165-0327(14)70006-0.", "link": "https://doi.org/10.1016/s0165-0327(14)70006-0", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Khanna2005Risperidone", "text": "Khanna S, Vieta E, Lyons B, Grossman F, Eerdekens M, Kramer M. Risperidone in the treatment of acute mania: double-blind, placebo-controlled study. Br J Psychiatry. 2005;187:229-34. PMID 16135859; doi:10.1192/bjp.187.3.229.", "link": "https://doi.org/10.1192/bjp.187.3.229", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kibirige2013", "text": "Kibirige D, Luzinda K, Ssekitoleko R. Spectrum of lithium induced thyroid abnormalities: a current perspective. Thyroid Res. 2013;6(1):3. PMID 23391071; PMCID PMC3568739; doi:10.1186/1756-6614-6-3.", "link": "https://doi.org/10.1186/1756-6614-6-3", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kieseppa2004", "text": "Kieseppä T, Partonen T, Haukka J, Kaprio J, Lönnqvist J. High concordance of bipolar I disorder in a nationwide sample of twins. Am J Psychiatry. 2004;161(10):1814-21. PMID 15465978; doi:10.1176/ajp.161.10.1814.", "link": "https://doi.org/10.1176/ajp.161.10.1814", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "King2026ENIGMA", "text": "King S, O'Connor J, Corley E, Tronchin G, Fontana E, Nabulsi L, et al. Psychotropic medications and their interactions with subcortical brain volume in bipolar disorder: An ENIGMA mega-analysis. Mol Psychiatry. 2026;31(5):2941-2953. PMID 41540091; PMCID PMC13099646; doi:10.1038/s41380-025-03432-z.", "link": "https://doi.org/10.1038/s41380-025-03432-z", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kishi2021", "text": "Kishi T, Ikuta T, Matsuda Y, Sakuma K, Okuya M, Mishima K, et al. Mood stabilizers and/or antipsychotics for bipolar disorder in the maintenance phase: a systematic review and network meta-analysis of randomized controlled trials. Mol Psychiatry. 2021;26(8):4146-4157. PMID 33177610; PMCID PMC8550938; doi:10.1038/s41380-020-00946-6.", "link": "https://doi.org/10.1038/s41380-020-00946-6", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kitsune2016", "text": "Kitsune GL, Kuntsi J, Costello H, Frangou S, Hosang GM, McLoughlin G, et al. Delineating ADHD and bipolar disorder: A comparison of clinical profiles in adult women. J Affect Disord. 2016;192:125-33. PMID 26724691; doi:10.1016/j.jad.2015.12.024.", "link": "https://doi.org/10.1016/j.jad.2015.12.024", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Klein1996", "text": "Klein PS, Melton DA. A molecular mechanism for the effect of lithium on development. Proc Natl Acad Sci U S A. 1996;93(16):8455-9. PMID 8710892; PMCID PMC38692; doi:10.1073/pnas.93.16.8455.", "link": "https://doi.org/10.1073/pnas.93.16.8455", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Krauthammer1978", "text": "Krauthammer C, Klerman GL. Secondary mania: manic syndromes associated with antecedent physical illness or drugs. Arch Gen Psychiatry. 1978;35(11):1333-9. PMID 757997; doi:10.1001/archpsyc.1978.01770350059005.", "link": "https://doi.org/10.1001/archpsyc.1978.01770350059005", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kupka2003", "text": "Kupka RW, Luckenbaugh DA, Post RM, Leverich GS, Nolen WA. Rapid and non-rapid cycling bipolar disorder: a meta-analysis of clinical studies. J Clin Psychiatry. 2003;64(12):1483-94. PMID 14728111; doi:10.4088/jcp.v64n1213.", "link": "https://doi.org/10.4088/jcp.v64n1213", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kutcher2026", "text": "Kutcher TP, Chakraborty I, Kostick-Quenet K, Sano A, Moukaddam N, Herron JA, et al. Digital Markers for Passive Remote Monitoring of Bipolar Disorder: Systematic Review. JMIR Ment Health. 2026;13:e94819. PMID 42594348; PMCID PMC13472530; doi:10.2196/94819.", "link": "https://doi.org/10.2196/94819", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lahteenvuo2018", "text": "Lähteenvuo M, Tanskanen A, Taipale H, Hoti F, Vattulainen P, Vieta E, et al. Real-world Effectiveness of Pharmacologic Treatments for the Prevention of Rehospitalization in a Finnish Nationwide Cohort of Patients With Bipolar Disorder. JAMA Psychiatry. 2018;75(4):347-355. PMID 29490359; PMCID PMC5875349; doi:10.1001/jamapsychiatry.2017.4711.", "link": "https://doi.org/10.1001/jamapsychiatry.2017.4711", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lam2001Prodromes", "text": "Lam D, Wong G, Sham P. Prodromes, coping strategies and course of illness in bipolar affective disorder--a naturalistic study. Psychol Med. 2001;31(8):1397-402. PMID 11722154; doi:10.1017/s003329170100472x.", "link": "https://doi.org/10.1017/s003329170100472x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lam2003CT", "text": "Lam DH, Watkins ER, Hayward P, Bright J, Wright K, Kerr N, et al. A randomized controlled study of cognitive therapy for relapse prevention for bipolar affective disorder: outcome of the first year. Arch Gen Psychiatry. 2003;60(2):145-52. PMID 12578431; doi:10.1001/archpsyc.60.2.145.", "link": "https://doi.org/10.1001/archpsyc.60.2.145", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lam2020Light", "text": "Lam RW, Teng MY, Jung YE, Evans VC, Gottlieb JF, Chakrabarty T, et al. Light Therapy for Patients With Bipolar Depression: Systematic Review and Meta-Analysis of Randomized Controlled Trials. Can J Psychiatry. 2020;65(5):290-300. PMID 31826657; PMCID PMC7265610; doi:10.1177/0706743719892471.", "link": "https://doi.org/10.1177/0706743719892471", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Large2016", "text": "Large M, Kaneson M, Myles N, Myles H, Gunaratne P, Ryan C. Meta-Analysis of Longitudinal Cohort Studies of Suicide Risk Assessment among Psychiatric Patients: Heterogeneity in Results and Lack of Improvement over Time. PLoS One. 2016;11(6):e0156322. PMID 27285387; PMCID PMC4902221; doi:10.1371/journal.pone.0156322.", "link": "https://doi.org/10.1371/journal.pone.0156322", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Laux2014", "text": "Laux G, Brunnauer A. [Driving ability with affective disorders and under psychotropic drugs]. Nervenarzt. 2014;85(7):822-8. PMID 24906535; doi:10.1007/s00115-013-3994-2. Article in German; English abstract read.", "link": "https://doi.org/10.1007/s00115-013-3994-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Leibenluft1996", "text": "Leibenluft E, Albert PS, Rosenthal NE, Wehr TA. Relationship between sleep and mood in patients with rapid-cycling bipolar disorder. Psychiatry Res. 1996;63(2-3):161-8. PMID 8878312; doi:10.1016/0165-1781(96)02854-5.", "link": "https://doi.org/10.1016/0165-1781(96)02854-5", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Leibenluft2011", "text": "Leibenluft E. Severe mood dysregulation, irritability, and the diagnostic boundaries of bipolar disorder in youths. Am J Psychiatry. 2011;168(2):129-42. PMID 21123313; PMCID PMC3396206; doi:10.1176/appi.ajp.2010.10050766.", "link": "https://doi.org/10.1176/appi.ajp.2010.10050766", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Lewis2017Sleep", "text": "Lewis KS, Gordon-Smith K, Forty L, Di Florio A, Craddock N, Jones L, et al. Sleep loss as a trigger of mood episodes in bipolar disorder: individual differences based on diagnostic subtype and gender. Br J Psychiatry. 2017;211(3):169-174. PMID 28684405; PMCID PMC5579327; doi:10.1192/bjp.bp.117.202259.", "link": "https://doi.org/10.1192/bjp.bp.117.202259", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "LewisVassos2020", "text": "Lewis CM, Vassos E. Polygenic risk scores: from research tools to clinical instruments. Genome Med. 2020;12(1):44. PMID 32423490; PMCID PMC7236300; doi:10.1186/s13073-020-00742-5.", "link": "https://doi.org/10.1186/s13073-020-00742-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Li2007GSK3", "text": "Li X, Friedman AB, Zhu W, Wang L, Boswell S, May RS, et al. Lithium regulates glycogen synthase kinase-3beta in human peripheral blood mononuclear cells: implication in the treatment of bipolar disorder. Biol Psychiatry. 2007;61(2):216-22. PMID 16806104; PMCID PMC1853347; doi:10.1016/j.biopsych.2006.02.027.", "link": "https://doi.org/10.1016/j.biopsych.2006.02.027", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lichtenstein2009", "text": "Lichtenstein P, Yip BH, Björk C, Pawitan Y, Cannon TD, Sullivan PF, et al. Common genetic determinants of schizophrenia and bipolar disorder in Swedish families: a population-based study. Lancet. 2009;373(9659):234-9. PMID 19150704; PMCID PMC3879718; doi:10.1016/S0140-6736(09)60072-6.", "link": "https://doi.org/10.1016/s0140-6736(09)60072-6", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lish1994", "text": "Lish JD, Dime-Meenan S, Whybrow PC, Price RA, Hirschfeld RM. The National Depressive and Manic-depressive Association (DMDA) survey of bipolar members. J Affect Disord. 1994;31(4):281-94. PMID 7989643; doi:10.1016/0165-0327(94)90104-x.", "link": "https://doi.org/10.1016/0165-0327(94)90104-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Liu2026GBD", "text": "Liu X, Huang Q, Chen Y, Wang F, Xie Y, Chen N, et al. Global, regional and national burden of bipolar disorder: An analysis of trends from 1990 to 2021. J Affect Disord. 2026;393(Pt B):120393. PMID 41072877; doi:10.1016/j.jad.2025.120393.", "link": "https://doi.org/10.1016/j.jad.2025.120393", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "LloydEvans2014", "text": "Lloyd-Evans B, Mayo-Wilson E, Harrison B, Istead H, Brown E, Pilling S, et al. A systematic review and meta-analysis of randomised controlled trials of peer support for people with severe mental illness. BMC Psychiatry. 2014;14:39. PMID 24528545; PMCID PMC3933205; doi:10.1186/1471-244X-14-39.", "link": "https://doi.org/10.1186/1471-244x-14-39", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Lobban2020REACT", "text": "Lobban F, Akers N, Appelbe D, Chapman L, Collinge L, Dodd S, et al. Clinical effectiveness of a web-based peer-supported self-management intervention for relatives of people with psychosis or bipolar (REACT): online, observer-blind, randomised controlled superiority trial. BMC Psychiatry. 2020;20(1):160. PMID 32290827; PMCID PMC7158157; doi:10.1186/s12888-020-02545-9.", "link": "https://doi.org/10.1186/s12888-020-02545-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Loebel2014Adj", "text": "Loebel A, Cucchiaro J, Silva R, Kroger H, Sarma K, Xu J, et al. Lurasidone as adjunctive therapy with lithium or valproate for the treatment of bipolar I depression: a randomized, double-blind, placebo-controlled study. Am J Psychiatry. 2014;171(2):169-77. PMID 24170221; doi:10.1176/appi.ajp.2013.13070985.", "link": "https://doi.org/10.1176/appi.ajp.2013.13070985", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Loebel2014Mono", "text": "Loebel A, Cucchiaro J, Silva R, Kroger H, Hsu J, Sarma K, et al. Lurasidone monotherapy in the treatment of bipolar I depression: a randomized, double-blind, placebo-controlled study. Am J Psychiatry. 2014;171(2):160-8. PMID 24170180; doi:10.1176/appi.ajp.2013.13070984.", "link": "https://doi.org/10.1176/appi.ajp.2013.13070984", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ludwig2025", "text": "Ludwig VM, Bittendorf CA, Reinhard I, Guth M, Mühlbauer E, Hartnagel LM, et al. Predicting depressive and manic episodes in patients with bipolar disorder using statistical process control methods on passive sensing data. J Psychopathol Clin Sci. 2025;134(8):971-981. PMID 40689911; doi:10.1037/abn0001002.", "link": "https://doi.org/10.1037/abn0001002", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "MachadoVieira2017", "text": "Machado-Vieira R, Luckenbaugh DA, Ballard ED, Henter ID, Tohen M, Suppes T, et al. Increased Activity or Energy as a Primary Criterion for the Diagnosis of Bipolar Mania in DSM-5: Findings From the STEP-BD Study. Am J Psychiatry. 2017;174(1):70-76. PMID 27523498; PMCID PMC5205570; doi:10.1176/appi.ajp.2016.15091132.", "link": "https://doi.org/10.1176/appi.ajp.2016.15091132", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Malhi2013CNSDrugs", "text": "Malhi GS, Tanious M, Das P, Coulston CM, Berk M. Potential mechanisms of action of lithium in bipolar disorder. Current understanding. CNS Drugs. 2013;27(2):135-53. PMID 23371914; doi:10.1007/s40263-013-0039-0.", "link": "https://doi.org/10.1007/s40263-013-0039-0", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "MalkoffSchwartz1998", "text": "Malkoff-Schwartz S, Frank E, Anderson B, Sherrill JT, Siegel L, Patterson D, et al. Stressful life events and social rhythm disruption in the onset of manic and depressive bipolar episodes: a preliminary investigation. Arch Gen Psychiatry. 1998;55(8):702-7. PMID 9707380; doi:10.1001/archpsyc.55.8.702.", "link": "https://doi.org/10.1001/archpsyc.55.8.702", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Manchia2013", "text": "Manchia M, Adli M, Akula N, Ardau R, Aubry JM, Backlund L, et al. Assessment of Response to Lithium Maintenance Treatment in Bipolar Disorder: A Consortium on Lithium Genetics (ConLiGen) Report. PLoS One. 2013;8(6):e65636. PMID 23840348; PMCID PMC3686769; doi:10.1371/journal.pone.0065636.", "link": "https://doi.org/10.1371/journal.pone.0065636", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Mann2021Suicide", "text": "Mann JJ, Michel CA, Auerbach RP. Improving Suicide Prevention Through Evidence-Based Strategies: A Systematic Review. Am J Psychiatry. 2021;178(7):611-624. PMID 33596680; PMCID PMC9092896; doi:10.1176/appi.ajp.2020.20060864.", "link": "https://doi.org/10.1176/appi.ajp.2020.20060864", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Marwaha2013", "text": "Marwaha S, Durrani A, Singh S. Employment outcomes in people with bipolar disorder: a systematic review. Acta Psychiatr Scand. 2013;128(3):179-93. PMID 23379960; doi:10.1111/acps.12087.", "link": "https://doi.org/10.1111/acps.12087", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Mason2016", "text": "Mason BL, Brown ES, Croarkin PE. Historical Underpinnings of Bipolar Disorder Diagnostic Criteria. Behav Sci (Basel). 2016;6(3). PMID 27429010; PMCID PMC5039514; doi:10.3390/bs6030014.", "link": "https://doi.org/10.3390/bs6030014", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "McCarthy2012", "text": "McCarthy MJ, Welsh DK. Cellular circadian clocks in mood disorders. J Biol Rhythms. 2012;27(5):339-52. PMID 23010657; doi:10.1177/0748730412456367.", "link": "https://doi.org/10.1177/0748730412456367", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "McCarthy2013", "text": "McCarthy MJ, Wei H, Marnoy Z, Darvish RM, McPhie DL, Cohen BM, et al. Genetic and clinical factors predict lithium's effects on PER2 gene expression rhythms in cells from bipolar disorder patients. Transl Psychiatry. 2013;3(10):e318. PMID 24150227; PMCID PMC3818008; doi:10.1038/tp.2013.90.", "link": "https://doi.org/10.1038/tp.2013.90", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "McCarthy2019", "text": "McCarthy MJ, Wei H, Nievergelt CM, Stautland A, Maihofer AX, Welsh DK, et al. Chronotype and cellular circadian rhythms predict the clinical response to lithium maintenance treatment in patients with bipolar disorder. Neuropsychopharmacology. 2019;44(3):620-628. PMID 30487653; PMCID PMC6333516; doi:10.1038/s41386-018-0273-8.", "link": "https://doi.org/10.1038/s41386-018-0273-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "McCormack2011HLA", "text": "McCormack M, Alfirevic A, Bourgeois S, Farrell JJ, Kasperavičiūtė D, Carrington M, et al. HLA-A3101 and carbamazepine-induced hypersensitivity reactions in Europeans. N Engl J Med. 2011;364(12):1134-43. PMID 21428769; PMCID PMC3113609; doi:10.1056/NEJMoa1013297.", "link": "https://doi.org/10.1056/nejmoa1013297", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "McGirr2016", "text": "McGirr A, Vöhringer PA, Ghaemi SN, Lam RW, Yatham LN. Safety and efficacy of adjunctive second-generation antidepressant therapy with a mood stabiliser or an atypical antipsychotic in acute bipolar depression: a systematic review and meta-analysis of randomised placebo-controlled trials. Lancet Psychiatry. 2016;3(12):1138-1146. PMID 28100425; doi:10.1016/S2215-0366(16)30264-4.", "link": "https://doi.org/10.1016/s2215-0366(16)30264-4", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "McGrath2023", "text": "McGrath JJ, Al-Hamzawi A, Alonso J, Altwaijri Y, Andrade LH, Bromet EJ, et al. Age of onset and cumulative risk of mental disorders: a cross-national analysis of population surveys from 29 countries. Lancet Psychiatry. 2023;10(9):668-681. PMID 37531964; PMCID PMC10529120; doi:10.1016/S2215-0366(23)00193-1.", "link": "https://doi.org/10.1016/s2215-0366(23)00193-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "McGuffin2003", "text": "McGuffin P, Rijsdijk F, Andrew M, Sham P, Katz R, Cardno A. The heritability of bipolar affective disorder and the genetic relationship to unipolar depression. Arch Gen Psychiatry. 2003;60(5):497-502. PMID 12742871; doi:10.1001/archpsyc.60.5.497.", "link": "https://doi.org/10.1001/archpsyc.60.5.497", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "McIntyre2015Mixed", "text": "McIntyre RS, Soczynska JK, Cha DS, Woldeyohannes HO, Dale RS, Alsuwaidan MT, et al. The prevalence and illness characteristics of DSM-5-defined \"mixed feature specifier\" in adults with major depressive disorder and bipolar disorder: Results from the International Mood Disorders Collaborative Project. J Affect Disord. 2015;172:259-64. PMID 25451425; doi:10.1016/j.jad.2014.09.026.", "link": "https://doi.org/10.1016/j.jad.2014.09.026", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "McIntyre2020Lancet", "text": "McIntyre RS, Berk M, Brietzke E, Goldstein BI, López-Jaramillo C, Kessing LV, et al. Bipolar disorders. Lancet. 2020;396(10265):1841-1856. PMID 33278937; doi:10.1016/S0140-6736(20)31544-0.", "link": "https://doi.org/10.1016/s0140-6736(20)31544-0", "areas": ["A", "C", "D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "McKnight2012", "text": "McKnight RF, Adida M, Budge K, Stockton S, Goodwin GM, Geddes JR. Lithium toxicity profile: a systematic review and meta-analysis. Lancet. 2012;379(9817):721-8. PMID 22265699; doi:10.1016/S0140-6736(11)61516-X.", "link": "https://doi.org/10.1016/s0140-6736(11)61516-x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Meador2013NEAD", "text": "Meador KJ, Baker GA, Browning N, Cohen MJ, Bromley RL, Clayton-Smith J, et al. Fetal antiepileptic drug exposure and cognitive outcomes at age 6 years (NEAD study): a prospective observational study. Lancet Neurol. 2013;12(3):244-52. PMID 23352199; PMCID PMC3684942; doi:10.1016/S1474-4422(12)70323-X.", "link": "https://doi.org/10.1016/s1474-4422(12)70323-x", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Meehan2015", "text": "Meehan AD, Humble MB, Yazarloo P, Järhult J, Wallin G. The prevalence of lithium-associated hyperparathyroidism in a large Swedish population attending psychiatric outpatient units. J Clin Psychopharmacol. 2015;35(3):279-85. PMID 25853371; doi:10.1097/JCP.0000000000000303.", "link": "https://doi.org/10.1097/jcp.0000000000000303", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Meehan2018", "text": "Meehan AD, Udumyan R, Kardell M, Landén M, Järhult J, Wallin G. Lithium-Associated Hypercalcemia: Pathophysiology, Prevalence, Management. World J Surg. 2018;42(2):415-424. PMID 29260296; PMCID PMC5762804; doi:10.1007/s00268-017-4328-5.", "link": "https://doi.org/10.1007/s00268-017-4328-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Melo2017", "text": "Melo MCA, Abreu RLC, Linhares Neto VB, de Bruin PFC, de Bruin VMS. Chronotype and circadian rhythm in bipolar disorder: A systematic review. Sleep Med Rev. 2017;34:46-58. PMID 27524206; doi:10.1016/j.smrv.2016.06.007.", "link": "https://doi.org/10.1016/j.smrv.2016.06.007", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Menculini2020", "text": "Menculini G, Balducci PM, Attademo L, Bernardini F, Moretti P, Tortorella A. Environmental Risk Factors for Bipolar Disorders and High-Risk States in Adolescence: A Systematic Review. Medicina (Kaunas). 2020;56(12):689. PMID 33322430; PMCID PMC7763529; doi:10.3390/medicina56120689.", "link": "https://doi.org/10.3390/medicina56120689", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mendlewicz1977", "text": "Mendlewicz J, Rainer JD. Adoption study supporting genetic transmission in manic--depressive illness. Nature. 1977;268(5618):327-9. PMID 887159; doi:10.1038/268327a0.", "link": "https://doi.org/10.1038/268327a0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Merikangas2007", "text": "Merikangas KR, Akiskal HS, Angst J, Greenberg PE, Hirschfeld RM, Petukhova M, et al. Lifetime and 12-month prevalence of bipolar spectrum disorder in the National Comorbidity Survey replication. Arch Gen Psychiatry. 2007;64(5):543-52. PMID 17485606; PMCID PMC1931566; doi:10.1001/archpsyc.64.5.543.", "link": "https://doi.org/10.1001/archpsyc.64.5.543", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Merikangas2011", "text": "Merikangas KR, Jin R, He JP, Kessler RC, Lee S, Sampson NA, et al. Prevalence and correlates of bipolar spectrum disorder in the world mental health survey initiative. Arch Gen Psychiatry. 2011;68(3):241-51. PMID 21383262; PMCID PMC3486639; doi:10.1001/archgenpsychiatry.2011.12.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.12", "areas": ["A", "B", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Mertens2015", "text": "Mertens J, Wang QW, Kim Y, Yu DX, Pham S, Yang B, et al. Differential responses to lithium in hyperexcitable neurons from patients with bipolar disorder. Nature. 2015;527(7576):95-9. PMID 26524527; PMCID PMC4742055; doi:10.1038/nature15526.", "link": "https://doi.org/10.1038/nature15526", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Mesman2013", "text": "Mesman E, Nolen WA, Reichart CG, Wals M, Hillegers MH. The Dutch bipolar offspring study: 12-year follow-up. Am J Psychiatry. 2013;170(5):542-9. PMID 23429906; doi:10.1176/appi.ajp.2012.12030401.", "link": "https://doi.org/10.1176/appi.ajp.2012.12030401", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz1988EE", "text": "Miklowitz DJ, Goldstein MJ, Nuechterlein KH, Snyder KS, Mintz J. Family factors and the course of bipolar affective disorder. Arch Gen Psychiatry. 1988;45(3):225-31. PMID 3341878; doi:10.1001/archpsyc.1988.01800270033004.", "link": "https://doi.org/10.1001/archpsyc.1988.01800270033004", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2003FFT", "text": "Miklowitz DJ, George EL, Richards JA, Simoneau TL, Suddath RL. A randomized study of family-focused psychoeducation and pharmacotherapy in the outpatient management of bipolar disorder. Arch Gen Psychiatry. 2003;60(9):904-12. PMID 12963672; doi:10.1001/archpsyc.60.9.904.", "link": "https://doi.org/10.1001/archpsyc.60.9.904", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2007", "text": "Miklowitz DJ, Otto MW, Frank E, Reilly-Harrington NA, Wisniewski SR, Kogan JN, et al. Psychosocial treatments for bipolar depression: a 1-year randomized trial from the Systematic Treatment Enhancement Program. Arch Gen Psychiatry. 2007;64(4):419-26. PMID 17404119; PMCID PMC3579612; doi:10.1001/archpsyc.64.4.419.", "link": "https://doi.org/10.1001/archpsyc.64.4.419", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2007AJP", "text": "Miklowitz DJ, Otto MW, Frank E, Reilly-Harrington NA, Kogan JN, Sachs GS, et al. Intensive psychosocial intervention enhances functioning in patients with bipolar depression: results from a 9-month randomized controlled trial. Am J Psychiatry. 2007;164(9):1340-7. PMID 17728418; PMCID PMC3579578; doi:10.1176/appi.ajp.2007.07020311.", "link": "https://doi.org/10.1176/appi.ajp.2007.07020311", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2008FFTA", "text": "Miklowitz DJ, Axelson DA, Birmaher B, George EL, Taylor DO, Schneck CD, et al. Family-focused treatment for adolescents with bipolar disorder: results of a 2-year randomized trial. Arch Gen Psychiatry. 2008;65(9):1053-61. PMID 18762591; PMCID PMC2610285; doi:10.1001/archpsyc.65.9.1053.", "link": "https://doi.org/10.1001/archpsyc.65.9.1053", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2020FFT", "text": "Miklowitz DJ, Schneck CD, Walshaw PD, Singh MK, Sullivan AE, Suddath RL, et al. Effects of Family-Focused Therapy vs Enhanced Usual Care for Symptomatic Youths at High Risk for Bipolar Disorder: A Randomized Clinical Trial. JAMA Psychiatry. 2020;77(5):455-463. PMID 31940011; PMCID PMC6990706; doi:10.1001/jamapsychiatry.2019.4520.", "link": "https://doi.org/10.1001/jamapsychiatry.2019.4520", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miklowitz2021NMA", "text": "Miklowitz DJ, Efthimiou O, Furukawa TA, Scott J, McLaren R, Geddes JR, et al. Adjunctive Psychotherapy for Bipolar Disorder: A Systematic Review and Component Network Meta-analysis. JAMA Psychiatry. 2021;78(2):141-150. PMID 33052390; PMCID PMC7557716; doi:10.1001/jamapsychiatry.2020.2993.", "link": "https://doi.org/10.1001/jamapsychiatry.2020.2993", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miller2020Suicide", "text": "Miller JN, Black DW. Bipolar Disorder and Suicide: a Review. Curr Psychiatry Rep. 2020;22(2):6. PMID 31955273; doi:10.1007/s11920-020-1130-0.", "link": "https://doi.org/10.1007/s11920-020-1130-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miola2023", "text": "Miola A, Fountoulakis KN, Baldessarini RJ, Veldic M, Solmi M, Rasgon N, et al. Prevalence and outcomes of rapid cycling bipolar disorder: Mixed method systematic meta-review. J Psychiatr Res. 2023;164:404-415. PMID 37429185; doi:10.1016/j.jpsychires.2023.06.021.", "link": "https://doi.org/10.1016/j.jpsychires.2023.06.021", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Mishra2021", "text": "Mishra HK, Ying NM, Luis A, Wei H, Nguyen M, Nakhla T, et al. Circadian rhythms in bipolar disorder patient-derived neurons predict lithium response: preliminary studies. Mol Psychiatry. 2021;26(7):3383-3394. PMID 33674753; PMCID PMC8418615; doi:10.1038/s41380-021-01048-7.", "link": "https://doi.org/10.1038/s41380-021-01048-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Mitchell2008", "text": "Mitchell PB, Goodwin GM, Johnson GF, Hirschfeld RM. Diagnostic guidelines for bipolar depression: a probabilistic approach. Bipolar Disord. 2008;10(1 Pt 2):144-52. PMID 18199233; doi:10.1111/j.1399-5618.2007.00559.x.", "link": "https://doi.org/10.1111/j.1399-5618.2007.00559.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mitchell2012Monitoring", "text": "Mitchell AJ, Delaffon V, Vancampfort D, Correll CU, De Hert M. Guideline concordant monitoring of metabolic risk in people treated with antipsychotic medication: systematic review and meta-analysis of screening practices. Psychol Med. 2012;42(1):125-47. PMID 21846426; doi:10.1017/S003329171100105X.", "link": "https://doi.org/10.1017/s003329171100105x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Miura2014", "text": "Miura T, Noma H, Furukawa TA, Mitsuyasu H, Tanaka S, Stockton S, et al. Comparative efficacy and tolerability of pharmacological treatments in the maintenance treatment of bipolar disorder: a systematic review and network meta-analysis. Lancet Psychiatry. 2014;1(5):351-9. PMID 26360999; doi:10.1016/S2215-0366(14)70314-1.", "link": "https://doi.org/10.1016/s2215-0366(14)70314-1", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Modabbernia2013", "text": "Modabbernia A, Taslimi S, Brietzke E, Ashrafi M. Cytokine alterations in bipolar disorder: a meta-analysis of 30 studies. Biol Psychiatry. 2013;74(1):15-25. PMID 23419545; doi:10.1016/j.biopsych.2013.01.007.", "link": "https://doi.org/10.1016/j.biopsych.2013.01.007", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Molenaar2021", "text": "Molenaar NM, Poels EMP, Robakis T, Wesseloo R, Bergink V. Management of lithium dosing around delivery: An observational study. Bipolar Disord. 2021;23(1):49-54. PMID 32526071; PMCID PMC7891390; doi:10.1111/bdi.12955.", "link": "https://doi.org/10.1111/bdi.12955", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Mondimore2005", "text": "Mondimore FM. Kraepelin and manic-depressive insanity: an historical perspective. Int Rev Psychiatry. 2005;17(1):49-52. PMID 16194770; doi:10.1080/09540260500080534.", "link": "https://doi.org/10.1080/09540260500080534", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Montgomery1979", "text": "Montgomery SA, Asberg M. A new depression scale designed to be sensitive to change. Br J Psychiatry. 1979;134:382-9. PMID 444788; doi:10.1192/bjp.134.4.382.", "link": "https://doi.org/10.1192/bjp.134.4.382", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Moore1999Inositol", "text": "Moore GJ, Bebchuk JM, Parrish JK, Faulk MW, Arfken CL, Strahl-Bevacqua J, et al. Temporal dissociation between lithium-induced changes in frontal lobe myo-inositol and clinical response in manic-depressive illness. Am J Psychiatry. 1999;156(12):1902-8. PMID 10588403; doi:10.1176/ajp.156.12.1902.", "link": "https://doi.org/10.1176/ajp.156.12.1902", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Moore2000Lancet", "text": "Moore GJ, Bebchuk JM, Wilds IB, Chen G, Manji HK. Lithium-induced increase in human brain grey matter. Lancet. 2000;356(9237):1241-2. PMID 11072948; doi:10.1016/s0140-6736(00)02793-8.", "link": "https://doi.org/10.1016/s0140-6736(00)02793-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Moreira2016", "text": "Moreira J, Geoffroy PA. Lithium and bipolar disorder: Impacts from molecular to behavioural circadian rhythms. Chronobiol Int. 2016;33(4):351-73. PMID 27003509; doi:10.3109/07420528.2016.1151026.", "link": "https://doi.org/10.3109/07420528.2016.1151026", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Moreno2007", "text": "Moreno C, Laje G, Blanco C, Jiang H, Schmidt AB, Olfson M. National trends in the outpatient diagnosis and treatment of bipolar disorder in youth. Arch Gen Psychiatry. 2007;64(9):1032-9. PMID 17768268; doi:10.1001/archpsyc.64.9.1032.", "link": "https://doi.org/10.1001/archpsyc.64.9.1032", "areas": ["D", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Moreno2007Youth"]}, {"key": "Morriss2016PARADES", "text": "Morriss R, Lobban F, Riste L, Davies L, Holland F, Long R, et al. Clinical effectiveness and acceptability of structured group psychoeducation versus optimised unstructured peer support for patients with remitted bipolar disorder (PARADES): a pragmatic, multicentre, observer-blind, randomised controlled superiority trial. Lancet Psychiatry. 2016;3(11):1029-1038. PMID 27688021; doi:10.1016/S2215-0366(16)30302-9.", "link": "https://doi.org/10.1016/s2215-0366(16)30302-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Mortensen2003", "text": "Mortensen PB, Pedersen CB, Melbye M, Mors O, Ewald H. Individual and familial risk factors for bipolar affective disorders in Denmark. Arch Gen Psychiatry. 2003;60(12):1209-15. PMID 14662553; doi:10.1001/archpsyc.60.12.1209.", "link": "https://doi.org/10.1001/archpsyc.60.12.1209", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mullins2021", "text": "Mullins N, Forstner AJ, O'Connell KS, Coombes B, Coleman JRI, Qiao Z, et al. Genome-wide association study of more than 40,000 bipolar disorder cases provides new insights into the underlying biology. Nat Genet. 2021;53(6):817-829. PMID 34002096; PMCID PMC8192451; doi:10.1038/s41588-021-00857-4.", "link": "https://doi.org/10.1038/s41588-021-00857-4", "areas": ["B", "C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Munkholm2013JAD", "text": "Munkholm K, Vinberg M, Vedel Kessing L. Cytokines in bipolar disorder: a systematic review and meta-analysis. J Affect Disord. 2013;144(1-2):16-27. PMID 22749156; doi:10.1016/j.jad.2012.06.010.", "link": "https://doi.org/10.1016/j.jad.2012.06.010", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Munkholm2013JPR", "text": "Munkholm K, Braüner JV, Kessing LV, Vinberg M. Cytokines in bipolar disorder vs. healthy control subjects: a systematic review and meta-analysis. J Psychiatr Res. 2013;47(9):1119-33. PMID 23768870; doi:10.1016/j.jpsychires.2013.05.018.", "link": "https://doi.org/10.1016/j.jpsychires.2013.05.018", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "MunkOlsen2006", "text": "Munk-Olsen T, Laursen TM, Pedersen CB, Mors O, Mortensen PB. New parents and mental disorders: a population-based register study. JAMA. 2006;296(21):2582-9. PMID 17148723; doi:10.1001/jama.296.21.2582.", "link": "https://doi.org/10.1001/jama.296.21.2582", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "MunkOlsen2018", "text": "Munk-Olsen T, Liu X, Viktorin A, Brown HK, Di Florio A, D'Onofrio BM, et al. Maternal and infant outcomes associated with lithium use in pregnancy: an international collaborative meta-analysis of six cohort studies. Lancet Psychiatry. 2018;5(8):644-652. PMID 29929874; PMCID PMC6077091; doi:10.1016/S2215-0366(18)30180-9.", "link": "https://doi.org/10.1016/s2215-0366(18)30180-9", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Murray2021PRS", "text": "Murray GK, Lin T, Austin J, McGrath JJ, Hickie IB, Wray NR. Could Polygenic Risk Scores Be Useful in Psychiatry?: A Review. JAMA Psychiatry. 2021;78(2):210-219. PMID 33052393; doi:10.1001/jamapsychiatry.2020.3042.", "link": "https://doi.org/10.1001/jamapsychiatry.2020.3042", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Na2021", "text": "Na KS, Kang JM, Cho SE. Prevalence of DSM-5 mixed features: A meta-analysis and systematic review. J Affect Disord. 2021;282:203-210. PMID 33418368; doi:10.1016/j.jad.2020.12.149.", "link": "https://doi.org/10.1016/j.jad.2020.12.149", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "NCT01166425", "text": "Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD). Safety and Efficacy Study of Lithium for the Treatment of Pediatric Mania. ClinicalTrials.gov NCT01166425; completed; 81 enrolled; 2010-06 to 2013-04.", "link": "", "areas": ["E"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT01928446", "text": "VA Office of Research and Development. Lithium for Suicidal Behavior in Mood Disorders. ClinicalTrials.gov NCT01928446; terminated; 519 enrolled; 2015-07-08 to 2019-08-13.", "link": "", "areas": ["E"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02703363", "text": "Minocycline and Celecoxib as Adjunctive Treatments of Bipolar Depression: A Factorial Design Randomised Controlled Trial. ClinicalTrials.gov NCT02703363 (completed; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03249376", "text": "Intra-Cellular Therapies, Inc. A Phase 3, Randomized, Double-Blind, Placebo-Controlled, Multi-Center Study to Assess the Efficacy and Safety of Lumateperone Monotherapy in the Treatment of Patients With Major Depressive Episodes Associated With Bipolar I or Bipolar II Disorder (Study 404). ClinicalTrials.gov NCT03249376 (completed; results posted; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03573297", "text": "AbbVie. A Double-blind, Placebo-controlled, Randomized Withdrawal, Multicenter Clinical Trial Evaluating the Efficacy, Safety and Tolerability of Cariprazine in a Dose-reduction Paradigm in the Prevention of Relapse in Bipolar I Disorder. ClinicalTrials.gov NCT03573297 (completed 2022; results posted; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03965871", "text": "Celon Pharma SA. A Multicentre, Double-blind, Randomised, Placebo-Controlled Phase II Study to Assess Efficacy, Safety and Pharmacokinetics of Inhaled Esketamine in Subjects With Treatment-resistant Bipolar Depression. ClinicalTrials.gov NCT03965871 (completed 2021; no results posted; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05035316", "text": "Kessing LV (sponsor-investigator). Effects of Low Dose Aspirin in Bipolar Disorder (The A-Bipolar RCT). ClinicalTrials.gov NCT05035316 (completed 2024; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT06372964", "text": "Intra-Cellular Therapies, Inc. A Randomized, Double-blind, Placebo-controlled, Multicenter Study to Evaluate the Efficacy and Safety of Lumateperone for the Treatment of Major Depressive Episodes (MDEs) Associated With Bipolar I or Bipolar II Disorder in pediatric patients. ClinicalTrials.gov NCT06372964 (recruiting; record read 2026-11-03).", "link": "", "areas": ["H"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Ng2015Sleep", "text": "Ng TH, Chung KF, Ho FY, Yeung WF, Yung KP, Lam TH. Sleep-wake disturbance in interepisode bipolar disorder and high-risk individuals: a systematic review and meta-analysis. Sleep Med Rev. 2015;20:46-58. PMID 25060968; doi:10.1016/j.smrv.2014.06.006.", "link": "https://doi.org/10.1016/j.smrv.2014.06.006", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "NICE-NG10", "text": "National Collaborating Centre for Mental Health (UK). Violence and Aggression: Short-Term Management in Mental Health, Health and Community Settings: Updated edition (NICE guideline NG10). London: British Psychological Society; 2015. PMID 26180871. Recommendation wording read from nice.org.uk/guidance/ng10/chapter/Recommendations (published 28 May 2015; accessed 2026-11-03).", "link": "https://pubmed.ncbi.nlm.nih.gov/26180871/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "NICE2014CG185", "text": "National Institute for Health and Care Excellence. Bipolar disorder: assessment and management. Clinical guideline CG185. London: NICE; 2014 (last updated 2 September 2025). Recommendation wording read at nice.org.uk/guidance/cg185 on 2026-11-03. Full guideline: National Collaborating Centre for Mental Health (UK). Bipolar Disorder: The NICE Guideline on the Assessment and Management of Bipolar Disorder in Adults, Children and Young People in Primary and Secondary Care. 2014. PMID 29718639; NBK498655.", "link": "https://pubmed.ncbi.nlm.nih.gov/29718639/", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "NICE2014CG185F", "text": "National Institute for Health and Care Excellence (NICE). Bipolar disorder: assessment and management. Clinical guideline CG185. London: NICE; published 24 September 2014, last updated 2 September 2025. NCBI Bookshelf NBK547001; PMID 31556980. Recommendation wording read from nice.org.uk/guidance/cg185/chapter/Recommendations (accessed 2026-11-03).", "link": "https://pubmed.ncbi.nlm.nih.gov/31556980/", "areas": ["F", "E"], "unverified": false, "validated": "PubMed", "aliases": ["NICE2014CG185E"]}, {"key": "NICE2014CG192", "text": "National Institute for Health and Care Excellence. Antenatal and postnatal mental health: clinical management and service guidance. NICE guideline CG192. London: NICE; 2014 (last updated 2020; recommendations 1.2.3, 1.4.27–1.4.37 and 1.9.8 read on nice.org.uk, 2026-11-03). PMID 31990493; NCBI Bookshelf NBK553127.", "link": "https://pubmed.ncbi.nlm.nih.gov/31990493/", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Niederkrotenthaler2010", "text": "Niederkrotenthaler T, Voracek M, Herberth A, Till B, Strauss M, Etzersdorfer E, et al. Role of media reports in completed and prevented suicide: Werther v. Papageno effects. Br J Psychiatry. 2010;197(3):234-43. PMID 20807970; doi:10.1192/bjp.bp.109.074633.", "link": "https://doi.org/10.1192/bjp.bp.109.074633", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Niederkrotenthaler2020", "text": "Niederkrotenthaler T, Braun M, Pirkis J, Till B, Stack S, Sinyor M, et al. Association between suicide reporting in the media and suicide: systematic review and meta-analysis. BMJ. 2020;368:m575. PMID 32188637; PMCID PMC7190013; doi:10.1136/bmj.m575.", "link": "https://doi.org/10.1136/bmj.m575", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nierenberg2016CHOICE", "text": "Nierenberg AA, McElroy SL, Friedman ES, Ketter TA, Shelton RC, Deckersbach T, et al. Bipolar CHOICE (Clinical Health Outcomes Initiative in Comparative Effectiveness): a pragmatic 6-month trial of lithium versus quetiapine for bipolar disorder. J Clin Psychiatry. 2016;77(1):90-9. PMID 26845264; doi:10.4088/JCP.14m09349.", "link": "https://doi.org/10.4088/jcp.14m09349", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nierenberg2023", "text": "Nierenberg AA, Agustini B, Köhler-Forsberg O, Cusin C, Katz D, Sylvia LG, et al. Diagnosis and Treatment of Bipolar Disorder: A Review. JAMA. 2023;330(14):1370-1380. PMID 37815563; doi:10.1001/jama.2023.18588.", "link": "https://doi.org/10.1001/jama.2023.18588", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nolen2019", "text": "Nolen WA, Licht RW, Young AH, Malhi GS, Tohen M, Vieta E, et al. What is the optimal serum level for lithium in the maintenance treatment of bipolar disorder? A systematic review and recommendations from the ISBD/IGSLI Task Force on treatment with lithium. Bipolar Disord. 2019;21(5):394-409. PMID 31112628; PMCID PMC6688930; doi:10.1111/bdi.12805.", "link": "https://doi.org/10.1111/bdi.12805", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nordentoft2011", "text": "Nordentoft M, Mortensen PB, Pedersen CB. Absolute risk of suicide after first hospital contact in mental disorder. Arch Gen Psychiatry. 2011;68(10):1058-64. PMID 21969462; doi:10.1001/archgenpsychiatry.2011.113.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.113", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nosarti2012", "text": "Nosarti C, Reichenberg A, Murray RM, Cnattingius S, Lambe MP, Yin L, et al. Preterm birth and psychiatric disorders in young adult life. Arch Gen Psychiatry. 2012;69(6):E1-8. PMID 22660967; doi:10.1001/archgenpsychiatry.2011.1374.", "link": "https://doi.org/10.1001/archgenpsychiatry.2011.1374", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Novick2010", "text": "Novick DM, Swartz HA, Frank E. Suicide attempts in bipolar I and bipolar II disorder: a review and meta-analysis of the evidence. Bipolar Disord. 2010;12(1):1-9. PMID 20148862; PMCID PMC4536929; doi:10.1111/j.1399-5618.2009.00786.x.", "link": "https://doi.org/10.1111/j.1399-5618.2009.00786.x", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Nuij2021", "text": "Nuij C, van Ballegooijen W, de Beurs D, Juniar D, Erlangsen A, Portzky G, et al. Safety planning-type interventions for suicide prevention: meta-analysis. Br J Psychiatry. 2021;219(2):419-426. PMID 35048835; doi:10.1192/bjp.2021.50.", "link": "https://doi.org/10.1192/bjp.2021.50", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nunes2026", "text": "Nunes PV, Olagunju AT, Zittema D, Dhyani A, Fu L, Chen P, et al. Towards a Safe and Effective Lithium Therapeutic Range for Older Adults With Bipolar Disorder: An ISBD Task Force Systematic Review. Bipolar Disord. 2026;28(5):e70151. PMID 42460615; PMCID PMC13373820; doi:10.1111/bdi.70151.", "link": "https://doi.org/10.1111/bdi.70151", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Oakley2001", "text": "Oakley PW, Whyte IM, Carter GL. Lithium toxicity: an iatrogenic problem in susceptible individuals. Aust N Z J Psychiatry. 2001;35(6):833-40. PMID 11990895; doi:10.1046/j.1440-1614.2001.00963.x.", "link": "https://doi.org/10.1046/j.1440-1614.2001.00963.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "OBrien2009", "text": "O'Brien WT, Klein PS. Validating GSK3 as an in vivo target of lithium action. Biochem Soc Trans. 2009;37(Pt 5):1133-8. PMID 19754466; PMCID PMC2747042; doi:10.1042/BST0371133.", "link": "https://doi.org/10.1042/bst0371133", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "OConnell2025", "text": "O'Connell KS, Koromina M, van der Veen T, Boltz T, David FS, Yang JMK, et al. Genomics yields biological and phenotypic insights into bipolar disorder. Nature. 2025;639(8056):968-975. PMID 39843750; PMCID PMC12163093; doi:10.1038/s41586-024-08468-9.", "link": "https://doi.org/10.1038/s41586-024-08468-9", "areas": ["B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ogilvie2005", "text": "Ogilvie AD, Morant N, Goodwin GM. The burden on informal caregivers of people with bipolar disorder. Bipolar Disord. 2005;7 Suppl 1:25-32. PMID 15762866; doi:10.1111/j.1399-5618.2005.00191.x.", "link": "https://doi.org/10.1111/j.1399-5618.2005.00191.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Oliva2025", "text": "Oliva V, De Prisco M, La Spina E, Paolucci S, Fico G, Anmella G, et al. Switch to mania after acute antidepressant treatment for bipolar depression: a systematic review and network meta-analysis of randomised controlled trials. EClinicalMedicine. 2025;87:103413. PMID 40823496; PMCID PMC12355415; doi:10.1016/j.eclinm.2025.103413.", "link": "https://doi.org/10.1016/j.eclinm.2025.103413", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Orlovska2014", "text": "Orlovska S, Pedersen MS, Benros ME, Mortensen PB, Agerbo E, Nordentoft M. Head injury as risk factor for psychiatric disorders: a nationwide register-based follow-up study of 113,906 persons with head injury. Am J Psychiatry. 2014;171(4):463-9. PMID 24322397; doi:10.1176/appi.ajp.2013.13020190.", "link": "https://doi.org/10.1176/appi.ajp.2013.13020190", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ott2016", "text": "Ott M, Stegmayr B, Salander Renberg E, Werneke U. Lithium intoxication: Incidence, clinical course and renal function - a population-based retrospective cohort study. J Psychopharmacol. 2016;30(10):1008-19. PMID 27307388; PMCID PMC5036078; doi:10.1177/0269881116652577.", "link": "https://doi.org/10.1177/0269881116652577", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Oud2016", "text": "Oud M, Mayo-Wilson E, Braidwood R, Schulte P, Jones SH, Morriss R, et al. Psychological interventions for adults with bipolar disorder: systematic review and meta-analysis. Br J Psychiatry. 2016;208(3):213-22. PMID 26932483; doi:10.1192/bjp.bp.114.157123.", "link": "https://doi.org/10.1192/bjp.bp.114.157123", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Pacchiarotti2013", "text": "Pacchiarotti I, Bond DJ, Baldessarini RJ, Nolen WA, Grunze H, Licht RW, et al. The International Society for Bipolar Disorders (ISBD) task force report on antidepressant use in bipolar disorders. Am J Psychiatry. 2013;170(11):1249-62. PMID 24030475; PMCID PMC4091043; doi:10.1176/appi.ajp.2013.13020185.", "link": "https://doi.org/10.1176/appi.ajp.2013.13020185", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2021", "text": "Palmer BA, Pahwa M, Geske JR, Kung S, Nassan M, Schak KM, et al. Self-report screening instruments differentiate bipolar disorder and borderline personality disorder. Brain Behav. 2021;11(7):e02201. PMID 34056864; PMCID PMC8323027; doi:10.1002/brb3.2201.", "link": "https://doi.org/10.1002/brb3.2201", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Palmer2022Exome", "text": "Palmer DS, Howrigan DP, Chapman SB, Adolfsson R, Bass N, Blackwood D, et al. Exome sequencing in bipolar disorder identifies AKAP11 as a risk gene shared with schizophrenia. Nat Genet. 2022;54(5):541-547. PMID 35410376; PMCID PMC9117467; doi:10.1038/s41588-022-01034-x.", "link": "https://doi.org/10.1038/s41588-022-01034-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PalmierClaus2016", "text": "Palmier-Claus JE, Berry K, Bucci S, Mansell W, Varese F. Relationship between childhood adversity and bipolar affective disorder: systematic review and meta-analysis. Br J Psychiatry. 2016;209(6):454-459. PMID 27758835; doi:10.1192/bjp.bp.115.179655.", "link": "https://doi.org/10.1192/bjp.bp.115.179655", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Parboosing2013", "text": "Parboosing R, Bao Y, Shen L, Schaefer CA, Brown AS. Gestational influenza and bipolar disorder in adult offspring. JAMA Psychiatry. 2013;70(7):677-85. PMID 23699867; doi:10.1001/jamapsychiatry.2013.896.", "link": "https://doi.org/10.1001/jamapsychiatry.2013.896", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Paris2015", "text": "Paris J, Black DW. Borderline personality disorder and bipolar disorder: what is the difference and why does it matter? J Nerv Ment Dis. 2015;203(1):3-7. PMID 25536097; doi:10.1097/NMD.0000000000000225.", "link": "https://doi.org/10.1097/nmd.0000000000000225", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Patorno2017", "text": "Patorno E, Huybrechts KF, Bateman BT, Cohen JM, Desai RJ, Mogun H, et al. Lithium Use in Pregnancy and the Risk of Cardiac Malformations. N Engl J Med. 2017;376(23):2245-2254. PMID 28591541; PMCID PMC5667676; doi:10.1056/NEJMoa1612222.", "link": "https://doi.org/10.1056/nejmoa1612222", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Pavlova2015", "text": "Pavlova B, Perlis RH, Alda M, Uher R. Lifetime prevalence of anxiety disorders in people with bipolar disorder: a systematic review and meta-analysis. Lancet Psychiatry. 2015;2(8):710-717. PMID 26249302; doi:10.1016/S2215-0366(15)00112-1.", "link": "https://doi.org/10.1016/s2215-0366(15)00112-1", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pavlova2017", "text": "Pavlova B, Perlis RH, Mantere O, Sellgren CM, Isometsä E, Mitchell PB, et al. Prevalence of current anxiety disorders in people with bipolar disorder during euthymia: a meta-analysis. Psychol Med. 2017;47(6):1107-1115. PMID 27995827; doi:10.1017/S0033291716003135.", "link": "https://doi.org/10.1017/s0033291716003135", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Perlick2007", "text": "Perlick DA, Rosenheck RA, Miklowitz DJ, Chessick C, Wolff N, Kaczynski R, et al. Prevalence and correlates of burden among caregivers of patients with bipolar disorder enrolled in the Systematic Treatment Enhancement Program for Bipolar Disorder. Bipolar Disord. 2007;9(3):262-73. PMID 17430301; doi:10.1111/j.1399-5618.2007.00365.x.", "link": "https://doi.org/10.1111/j.1399-5618.2007.00365.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Perlick2010", "text": "Perlick DA, Miklowitz DJ, Lopez N, Chou J, Kalvin C, Adzhiashvili V, et al. Family-focused treatment for caregivers of patients with bipolar disorder. Bipolar Disord. 2010;12(6):627-37. PMID 20868461; PMCID PMC2947337; doi:10.1111/j.1399-5618.2010.00852.x.", "link": "https://doi.org/10.1111/j.1399-5618.2010.00852.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Perlis2006STEPBD", "text": "Perlis RH, Ostacher MJ, Patel JK, Marangell LB, Zhang H, Wisniewski SR, et al. Predictors of recurrence in bipolar disorder: primary outcomes from the Systematic Treatment Enhancement Program for Bipolar Disorder (STEP-BD). Am J Psychiatry. 2006;163(2):217-24. PMID 16449474; doi:10.1176/appi.ajp.163.2.217.", "link": "https://doi.org/10.1176/appi.ajp.163.2.217", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Perris1966", "text": "Perris C. A study of bipolar (manic-depressive) and unipolar recurrent depressive psychoses. Introduction. Acta Psychiatr Scand Suppl. 1966;194:9-14. PMID 5229234.", "link": "https://pubmed.ncbi.nlm.nih.gov/5229234/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Perris1992", "text": "Perris C. The distinction between unipolar and bipolar mood disorders. A 25-years perspective. Encephale. 1992;18 Spec No 1:9-13. PMID 1600919.", "link": "https://pubmed.ncbi.nlm.nih.gov/1600919/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Perry1999BMJ", "text": "Perry A, Tarrier N, Morriss R, McCarthy E, Limb K. Randomised controlled trial of efficacy of teaching patients with bipolar disorder to identify early symptoms of relapse and obtain treatment. BMJ. 1999;318(7177):149-53. PMID 9888904; PMCID PMC27688; doi:10.1136/bmj.318.7177.149.", "link": "https://doi.org/10.1136/bmj.318.7177.149", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "PGCBD2011", "text": "Psychiatric GWAS Consortium Bipolar Disorder Working Group. Large-scale genome-wide association analysis of bipolar disorder identifies a new susceptibility locus near ODZ4. Nat Genet. 2011;43(10):977-83. PMID 21926972; PMCID PMC3637176; doi:10.1038/ng.943.", "link": "https://doi.org/10.1038/ng.943", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PGCBDSCZ2018", "text": "Bipolar Disorder and Schizophrenia Working Group of the Psychiatric Genomics Consortium. Genomic Dissection of Bipolar Disorder and Schizophrenia, Including 28 Subphenotypes. Cell. 2018;173(7):1705-1715.e16. PMID 29906448; PMCID PMC6432650; doi:10.1016/j.cell.2018.05.046.", "link": "https://doi.org/10.1016/j.cell.2018.05.046", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PGCCDG2013Lancet", "text": "Cross-Disorder Group of the Psychiatric Genomics Consortium. Identification of risk loci with shared effects on five major psychiatric disorders: a genome-wide analysis. Lancet. 2013;381(9875):1371-1379. PMID 23453885; PMCID PMC3714010; doi:10.1016/S0140-6736(12)62129-1.", "link": "https://doi.org/10.1016/s0140-6736(12)62129-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PGCCDG2013NatGenet", "text": "Cross-Disorder Group of the Psychiatric Genomics Consortium; Lee SH, Ripke S, Neale BM, Faraone SV, Purcell SM, Perlis RH, et al. Genetic relationship between five psychiatric disorders estimated from genome-wide SNPs. Nat Genet. 2013;45(9):984-94. PMID 23933821; PMCID PMC3800159; doi:10.1038/ng.2711.", "link": "https://doi.org/10.1038/ng.2711", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PGCCDG2019", "text": "Cross-Disorder Group of the Psychiatric Genomics Consortium. Genomic Relationships, Novel Loci, and Pleiotropic Mechanisms across Eight Psychiatric Disorders. Cell. 2019;179(7):1469-1482.e11. PMID 31835028; PMCID PMC7077032; doi:10.1016/j.cell.2019.11.020.", "link": "https://doi.org/10.1016/j.cell.2019.11.020", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Phillips2014", "text": "Phillips ML, Swartz HA. A critical appraisal of neuroimaging studies of bipolar disorder: toward a new conceptualization of underlying neural circuitry and a road map for future research. Am J Psychiatry. 2014;171(8):829-43. PMID 24626773; PMCID PMC4119497; doi:10.1176/appi.ajp.2014.13081008.", "link": "https://doi.org/10.1176/appi.ajp.2014.13081008", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Pichot2004", "text": "Pichot P. [Circular insanity, 150 years on]. Bull Acad Natl Med. 2004;188(2):275-84. PMID 15506718.", "link": "https://pubmed.ncbi.nlm.nih.gov/15506718/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Pigott2016Cochrane", "text": "Pigott K, Galizia I, Vasudev K, Watson S, Geddes J, Young AH. Topiramate for acute affective episodes in bipolar disorder in adults. Cochrane Database Syst Rev. 2016;9(9):CD003384. PMID 27591453; PMCID PMC6457604; doi:10.1002/14651858.CD003384.pub3.", "link": "https://doi.org/10.1002/14651858.cd003384.pub3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pillinger2020", "text": "Pillinger T, McCutcheon RA, Vano L, Mizuno Y, Arumuham A, Hindley G, et al. Comparative effects of 18 antipsychotics on metabolic function in patients with schizophrenia, predictors of metabolic dysregulation, and association with psychopathology: a systematic review and network meta-analysis. Lancet Psychiatry. 2020;7(1):64-77. PMID 31860457; PMCID PMC7029416; doi:10.1016/S2215-0366(19)30416-X.", "link": "https://doi.org/10.1016/s2215-0366(19)30416-x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Plans2019", "text": "Plans L, Barrot C, Nieto E, Rios J, Schulze TG, Papiol S, et al. Association between completed suicide and bipolar disorder: A systematic review of the literature. J Affect Disord. 2019;242:111-122. PMID 30173059; doi:10.1016/j.jad.2018.08.054.", "link": "https://doi.org/10.1016/j.jad.2018.08.054", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Plante2008", "text": "Plante DT, Winkelman JW. Sleep disturbance in bipolar disorder: therapeutic implications. Am J Psychiatry. 2008;165(7):830-43. PMID 18483132; doi:10.1176/appi.ajp.2008.08010077.", "link": "https://doi.org/10.1176/appi.ajp.2008.08010077", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Post1992", "text": "Post RM. Transduction of psychosocial stress into the neurobiology of recurrent affective disorder. Am J Psychiatry. 1992;149(8):999-1010. PMID 1353322; doi:10.1176/ajp.149.8.999.", "link": "https://doi.org/10.1176/ajp.149.8.999", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Proudfoot2012", "text": "Proudfoot J, Parker G, Manicavasagar V, Hadzi-Pavlovic D, Whitton A, Nicholas J, et al. Effects of adjunctive peer support on perceptions of illness control and understanding in an online psychoeducation program for bipolar disorder: a randomised controlled trial. J Affect Disord. 2012;142(1-3):98-105. PMID 22858215; doi:10.1016/j.jad.2012.04.007.", "link": "https://doi.org/10.1016/j.jad.2012.04.007", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Purcell2009", "text": "Purcell SM, Wray NR, Stone JL, Visscher PM, O'Donovan MC, Sullivan PF, et al. Common polygenic variation contributes to risk of schizophrenia and bipolar disorder. Nature. 2009;460(7256):748-52. PMID 19571811; PMCID PMC3912837; doi:10.1038/nature08185.", "link": "https://doi.org/10.1038/nature08185", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Quiroz2010", "text": "Quiroz JA, Yatham LN, Palumbo JM, Karcher K, Kushner S, Kusumakar V. Risperidone long-acting injectable monotherapy in the maintenance treatment of bipolar I disorder. Biol Psychiatry. 2010;68(2):156-62. PMID 20227682; doi:10.1016/j.biopsych.2010.01.015.", "link": "https://doi.org/10.1016/j.biopsych.2010.01.015", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rasic2014", "text": "Rasic D, Hajek T, Alda M, Uher R. Risk of mental illness in offspring of parents with schizophrenia, bipolar disorder, and major depressive disorder: a meta-analysis of family high-risk studies. Schizophr Bull. 2014;40(1):28-38. PMID 23960245; PMCID PMC3885302; doi:10.1093/schbul/sbt114.", "link": "https://doi.org/10.1093/schbul/sbt114", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Ratheesh2017", "text": "Ratheesh A, Davey C, Hetrick S, Alvarez-Jimenez M, Voutier C, Bechdolf A, et al. A systematic review and meta-analysis of prospective transition from major depression to bipolar disorder. Acta Psychiatr Scand. 2017;135(4):273-284. PMID 28097648; doi:10.1111/acps.12686.", "link": "https://doi.org/10.1111/acps.12686", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Reed2019", "text": "Reed GM, First MB, Kogan CS, Hyman SE, Gureje O, Gaebel W, et al. Innovations and changes in the ICD-11 classification of mental, behavioural and neurodevelopmental disorders. World Psychiatry. 2019;18(1):3-19. PMID 30600616; PMCID PMC6313247; doi:10.1002/wps.20611.", "link": "https://doi.org/10.1002/wps.20611", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Reen2020", "text": "Reen GK, Bailey J, Maughan DL, Vincent C. Systematic review of interventions to improve constant observation on adult inpatient psychiatric wards. Int J Ment Health Nurs. 2020;29(3):372-386. PMID 32048785; doi:10.1111/inm.12696.", "link": "https://doi.org/10.1111/inm.12696", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Reinares2008", "text": "Reinares M, Colom F, Sánchez-Moreno J, Torrent C, Martínez-Arán A, Comes M, et al. Impact of caregiver group psychoeducation on the course and outcome of bipolar patients in remission: a randomized controlled trial. Bipolar Disord. 2008;10(4):511-9. PMID 18452447; doi:10.1111/j.1399-5618.2008.00588.x.", "link": "https://doi.org/10.1111/j.1399-5618.2008.00588.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Riblet2017", "text": "Riblet NBV, Shiner B, Young-Xu Y, Watts BV. Strategies to prevent death by suicide: meta-analysis of randomised controlled trials. Br J Psychiatry. 2017;210(6):396-402. PMID 28428338; doi:10.1192/bjp.bp.116.187799.", "link": "https://doi.org/10.1192/bjp.bp.116.187799", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Richmond2012", "text": "Richmond JS, Berlin JS, Fishkind AB, Holloman GH Jr, Zeller SL, Wilson MP, et al. Verbal De-escalation of the Agitated Patient: Consensus Statement of the American Association for Emergency Psychiatry Project BETA De-escalation Workgroup. West J Emerg Med. 2012;13(1):17-25. PMID 22461917; PMCID PMC3298202; doi:10.5811/westjem.2011.9.6864.", "link": "https://doi.org/10.5811/westjem.2011.9.6864", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ritter2015", "text": "Ritter PS, Höfler M, Wittchen HU, Lieb R, Bauer M, Pfennig A, et al. Disturbed sleep as risk factor for the subsequent onset of bipolar disorder--Data from a 10-year prospective-longitudinal study among adolescents and young adults. J Psychiatr Res. 2015;68:76-82. PMID 26228404; doi:10.1016/j.jpsychires.2015.06.005.", "link": "https://doi.org/10.1016/j.jpsychires.2015.06.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Robinson2026FGRS", "text": "Robinson N, Ploner A, Ohlsson H, Lichtenstein P, Kendler KS, Bergen SE. Effects of family genetic risk scores and environmental factors on risk of schizophrenia and bipolar disorder. Mol Psychiatry. 2026;31(11):6456-6463. PMID 42399416; PMCID PMC13428273; doi:10.1038/s41380-026-03715-z.", "link": "https://doi.org/10.1038/s41380-026-03715-z", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rosenblat2016", "text": "Rosenblat JD, Kakar R, Berk M, Kessing LV, Vinberg M, Baune BT, et al. Anti-inflammatory agents in the treatment of bipolar depression: a systematic review and meta-analysis. Bipolar Disord. 2016;18(2):89-101. PMID 26990051; doi:10.1111/bdi.12373.", "link": "https://doi.org/10.1111/bdi.12373", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Roybal2007", "text": "Roybal K, Theobold D, Graham A, DiNieri JA, Russo SJ, Krishnan V, et al. Mania-like behavior induced by disruption of CLOCK. Proc Natl Acad Sci U S A. 2007;104(15):6406-11. PMID 17379666; PMCID PMC1851061; doi:10.1073/pnas.0609625104.", "link": "https://doi.org/10.1073/pnas.0609625104", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ruggero2010", "text": "Ruggero CJ, Zimmerman M, Chelminski I, Young D. Borderline personality disorder and the misdiagnosis of bipolar disorder. J Psychiatr Res. 2010;44(6):405-8. PMID 19889426; PMCID PMC2849890; doi:10.1016/j.jpsychires.2009.09.011.", "link": "https://doi.org/10.1016/j.jpsychires.2009.09.011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sachs2007STEPBD", "text": "Sachs GS, Nierenberg AA, Calabrese JR, Marangell LB, Wisniewski SR, Gyulai L, et al. Effectiveness of adjunctive antidepressant treatment for bipolar depression. N Engl J Med. 2007;356(17):1711-22. PMID 17392295; doi:10.1056/NEJMoa064135.", "link": "https://doi.org/10.1056/nejmoa064135", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sajatovic2015", "text": "Sajatovic M, Strejilevich SA, Gildengers AG, Dols A, Al Jurdi RK, Forester BP, et al. A report on older-age bipolar disorder from the International Society for Bipolar Disorders Task Force. Bipolar Disord. 2015;17(7):689-704. PMID 26384588; PMCID PMC4623878; doi:10.1111/bdi.12331.", "link": "https://doi.org/10.1111/bdi.12331", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Samame2013", "text": "Samamé C, Martino DJ, Strejilevich SA. A quantitative review of neurocognition in euthymic late-life bipolar disorder. Bipolar Disord. 2013;15(6):633-44. PMID 23651122; doi:10.1111/bdi.12077.", "link": "https://doi.org/10.1111/bdi.12077", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sandstrom2021", "text": "Sandstrom A, Perroud N, Alda M, Uher R, Pavlova B. Prevalence of attention-deficit/hyperactivity disorder in people with mood disorders: A systematic review and meta-analysis. Acta Psychiatr Scand. 2021;143(5):380-391. PMID 33528847; doi:10.1111/acps.13283.", "link": "https://doi.org/10.1111/acps.13283", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Satzer2016", "text": "Satzer D, Bond DJ. Mania secondary to focal brain lesions: implications for understanding the functional neuroanatomy of bipolar disorder. Bipolar Disord. 2016;18(3):205-20. PMID 27112231; doi:10.1111/bdi.12387.", "link": "https://doi.org/10.1111/bdi.12387", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schaffer2010", "text": "Schaffer A, Cairney J, Veldhuizen S, Kurdyak P, Cheung A, Levitt A. A population-based analysis of distinguishers of bipolar disorder from major depressive disorder. J Affect Disord. 2010;125(1-3):103-10. PMID 20223522; doi:10.1016/j.jad.2010.02.118.", "link": "https://doi.org/10.1016/j.jad.2010.02.118", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schaffer2015Epi", "text": "Schaffer A, Isometsä ET, Tondo L, Moreno DH, Sinyor M, Kessing LV, et al. Epidemiology, neurobiology and pharmacological interventions related to suicide deaths and suicide attempts in bipolar disorder: Part I of a report of the International Society for Bipolar Disorders Task Force on Suicide in Bipolar Disorder. Aust N Z J Psychiatry. 2015;49(9):785-802. PMID 26185269; PMCID PMC5116383; doi:10.1177/0004867415594427.", "link": "https://doi.org/10.1177/0004867415594427", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Schaffer2015Meta", "text": "Schaffer A, Isometsä ET, Tondo L, H Moreno D, Turecki G, Reis C, et al. International Society for Bipolar Disorders Task Force on Suicide: meta-analyses and meta-regression of correlates of suicide attempts and suicide deaths in bipolar disorder. Bipolar Disord. 2015;17(1):1-16. PMID 25329791; PMCID PMC6296224; doi:10.1111/bdi.12271.", "link": "https://doi.org/10.1111/bdi.12271", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Schaffer2015Risk", "text": "Schaffer A, Isometsä ET, Azorin JM, Cassidy F, Goldstein T, Rihmer Z, et al. A review of factors associated with greater likelihood of suicide attempts and suicide deaths in bipolar disorder: Part II of a report of the International Society for Bipolar Disorders Task Force on Suicide in Bipolar Disorder. Aust N Z J Psychiatry. 2015;49(11):1006-20. PMID 26175498; PMCID PMC5858693; doi:10.1177/0004867415594428.", "link": "https://doi.org/10.1177/0004867415594428", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Schiweck2021", "text": "Schiweck C, Arteaga-Henriquez G, Aichholzer M, Edwin Thanarajah S, Vargas-Cáceres S, Matura S, et al. Comorbidity of ADHD and adult bipolar disorder: A systematic review and meta-analysis. Neurosci Biobehav Rev. 2021;124:100-123. PMID 33515607; doi:10.1016/j.neubiorev.2021.01.017.", "link": "https://doi.org/10.1016/j.neubiorev.2021.01.017", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schoeyen2015", "text": "Schoeyen HK, Kessler U, Andreassen OA, Auestad BH, Bergsholm P, Malt UF, et al. Treatment-resistant bipolar depression: a randomized controlled trial of electroconvulsive therapy versus algorithm-based pharmacological treatment. Am J Psychiatry. 2015;172(1):41-51. PMID 25219389; doi:10.1176/appi.ajp.2014.13111517.", "link": "https://doi.org/10.1176/appi.ajp.2014.13111517", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Schou1954", "text": "SCHOU M, JUEL-NIELSEN N, STROMGREN E, VOLDBY H. The treatment of manic psychoses by the administration of lithium salts. J Neurol Neurosurg Psychiatry. 1954;17(4):250-60. PMID 13212414; PMCID PMC503195; doi:10.1136/jnnp.17.4.250.", "link": "https://doi.org/10.1136/jnnp.17.4.250", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Scott2006CBT", "text": "Scott J, Paykel E, Morriss R, Bentall R, Kinderman P, Johnson T, et al. Cognitive-behavioural therapy for severe and recurrent bipolar disorders: randomised controlled trial. Br J Psychiatry. 2006;188:313-20. PMID 16582056; doi:10.1192/bjp.188.4.313.", "link": "https://doi.org/10.1192/bjp.188.4.313", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Scott2009Cost", "text": "Scott J, Colom F, Popova E, Benabarre A, Cruz N, Valenti M, et al. Long-term mental health resource utilization and cost of care following group psychoeducation or unstructured group support for bipolar disorders: a cost-benefit analysis. J Clin Psychiatry. 2009;70(3):378-86. PMID 19284929; doi:10.4088/jcp.08m04333.", "link": "https://doi.org/10.4088/jcp.08m04333", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Scott2017Activation", "text": "Scott J, Murray G, Henry C, Morken G, Scott E, Angst J, et al. Activation in Bipolar Disorders: A Systematic Review. JAMA Psychiatry. 2017;74(2):189-196. PMID 28002572; doi:10.1001/jamapsychiatry.2016.3459.", "link": "https://doi.org/10.1001/jamapsychiatry.2016.3459", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Scott2022Delay", "text": "Scott J, Graham A, Yung A, Morgan C, Bellivier F, Etain B. A systematic review and meta-analysis of delayed help-seeking, delayed diagnosis and duration of untreated illness in bipolar disorders. Acta Psychiatr Scand. 2022;146(5):389-405. PMID 36018259; doi:10.1111/acps.13490.", "link": "https://doi.org/10.1111/acps.13490", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Severus2008", "text": "Severus WE, Kleindienst N, Seemüller F, Frangou S, Möller HJ, Greil W. What is the optimal serum lithium level in the long-term treatment of bipolar disorder--a review? Bipolar Disord. 2008;10(2):231-7. PMID 18271901; doi:10.1111/j.1399-5618.2007.00475.x.", "link": "https://doi.org/10.1111/j.1399-5618.2007.00475.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Severus2014", "text": "Severus E, Bauer M. The impact of treatment decisions on the diagnosis of bipolar disorders. Int J Bipolar Disord. 2014;2:3. PMID 25909048; PMCID PMC4406985; doi:10.1186/2194-7511-2-3.", "link": "https://doi.org/10.1186/2194-7511-2-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Severus2014E", "text": "Severus E, Taylor MJ, Sauer C, Pfennig A, Ritter P, Bauer M, et al. Lithium for prevention of mood episodes in bipolar disorders: systematic review and meta-analysis. Int J Bipolar Disord. 2014;2:15. PMID 25530932; PMCID PMC4272359; doi:10.1186/s40345-014-0015-8.", "link": "https://doi.org/10.1186/s40345-014-0015-8", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Shen2008", "text": "Shen GH, Alloy LB, Abramson LY, Sylvia LG. Social rhythm regularity and the onset of affective episodes in bipolar spectrum individuals. Bipolar Disord. 2008;10(4):520-9. PMID 18452448; PMCID PMC4090015; doi:10.1111/j.1399-5618.2008.00583.x.", "link": "https://doi.org/10.1111/j.1399-5618.2008.00583.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shine2015", "text": "Shine B, McKnight RF, Leaver L, Geddes JR. Long-term effects of lithium on renal, thyroid, and parathyroid function: a retrospective analysis of laboratory data. Lancet. 2015;386(9992):461-8. PMID 26003379; doi:10.1016/S0140-6736(14)61842-0.", "link": "https://doi.org/10.1016/s0140-6736(14)61842-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Shorter2009", "text": "Shorter E. The history of lithium therapy. Bipolar Disord. 2009;11 Suppl 2(Suppl 2):4-9. PMID 19538681; PMCID PMC3712976; doi:10.1111/j.1399-5618.2009.00706.x.", "link": "https://doi.org/10.1111/j.1399-5618.2009.00706.x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Shulman2026", "text": "Shulman KI, Nunes PV, Fu L, Eyler LT. An international initiative to implement recommendations for a lower therapeutic range of maintenance lithium in older adults with bipolar disorder. Curr Opin Psychiatry. 2026;39(5):406-411. PMID 42489486; doi:10.1097/YCO.0000000000001105.", "link": "https://doi.org/10.1097/yco.0000000000001105", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Simon2006Care", "text": "Simon GE, Ludman EJ, Bauer MS, Unützer J, Operskalski B. Long-term effectiveness and cost of a systematic care program for bipolar disorder. Arch Gen Psychiatry. 2006;63(5):500-8. PMID 16651507; doi:10.1001/archpsyc.63.5.500.", "link": "https://doi.org/10.1001/archpsyc.63.5.500", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sit2018", "text": "Sit DK, McGowan J, Wiltrout C, Diler RS, Dills JJ, Luther J, et al. Adjunctive Bright Light Therapy for Bipolar Depression: A Randomized Double-Blind Placebo-Controlled Trial. Am J Psychiatry. 2018;175(2):131-139. PMID 28969438; doi:10.1176/appi.ajp.2017.16101200.", "link": "https://doi.org/10.1176/appi.ajp.2017.16101200", "areas": ["C", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2017Lithium", "text": "Smith KA, Cipriani A. Lithium and suicide in mood disorders: Updated meta-review of the scientific literature. Bipolar Disord. 2017;19(7):575-586. PMID 28895269; doi:10.1111/bdi.12543.", "link": "https://doi.org/10.1111/bdi.12543", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Smoller2003", "text": "Smoller JW, Finn CT. Family, twin, and adoption studies of bipolar disorder. Am J Med Genet C Semin Med Genet. 2003;123C(1):48-58. PMID 14601036; doi:10.1002/ajmg.c.20013.", "link": "https://doi.org/10.1002/ajmg.c.20013", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Solmi2018", "text": "Solmi M, Pigato GG, Roiter B, Guaglianone A, Martini L, Fornaro M, et al. Prevalence of Catatonia and Its Moderators in Clinical Samples: Results from a Meta-analysis and Meta-regression Analysis. Schizophr Bull. 2018;44(5):1133-1150. PMID 29140521; PMCID PMC6101628; doi:10.1093/schbul/sbx157.", "link": "https://doi.org/10.1093/schbul/sbx157", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Solmi2021Inflammation", "text": "Solmi M, Suresh Sharma M, Osimo EF, Fornaro M, Bortolato B, Croatto G, et al. Peripheral levels of C-reactive protein, tumor necrosis factor-α, interleukin-6, and interleukin-1β across the mood spectrum in bipolar disorder: A meta-analysis of mean differences and variability. Brain Behav Immun. 2021;97:193-203. PMID 34332041; doi:10.1016/j.bbi.2021.07.014.", "link": "https://doi.org/10.1016/j.bbi.2021.07.014", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Solmi2022", "text": "Solmi M, Radua J, Olivola M, Croce E, Soardo L, Salazar de Pablo G, et al. Age at onset of mental disorders worldwide: large-scale meta-analysis of 192 epidemiological studies. Mol Psychiatry. 2022;27(1):281-295. PMID 34079068; PMCID PMC8960395; doi:10.1038/s41380-021-01161-7.", "link": "https://doi.org/10.1038/s41380-021-01161-7", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Solomon2010", "text": "Solomon DA, Leon AC, Coryell WH, Endicott J, Li C, Fiedorowicz JG, et al. Longitudinal course of bipolar I disorder: duration of mood episodes. Arch Gen Psychiatry. 2010;67(4):339-47. PMID 20368510; PMCID PMC3677763; doi:10.1001/archgenpsychiatry.2010.15.", "link": "https://doi.org/10.1001/archgenpsychiatry.2010.15", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Song2015Family", "text": "Song J, Bergen SE, Kuja-Halkola R, Larsson H, Landén M, Lichtenstein P. Bipolar disorder and its relation to major psychiatric disorders: a family-based study in the Swedish population. Bipolar Disord. 2015;17(2):184-93. PMID 25118125; doi:10.1111/bdi.12242.", "link": "https://doi.org/10.1111/bdi.12242", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Song2017", "text": "Song J, Sjölander A, Joas E, Bergen SE, Runeson B, Larsson H, et al. Suicidal Behavior During Lithium and Valproate Treatment: A Within-Individual 8-Year Prospective Study of 50,000 Patients With Bipolar Disorder. Am J Psychiatry. 2017;174(8):795-802. PMID 28595491; doi:10.1176/appi.ajp.2017.16050542.", "link": "https://doi.org/10.1176/appi.ajp.2017.16050542", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Song2024Twins", "text": "Song J, Pasman JA, Johansson V, Kuja-Halkola R, Harder A, Karlsson R, et al. Polygenic Risk Scores and Twin Concordance for Schizophrenia and Bipolar Disorder. JAMA Psychiatry. 2024;81(12):1246-1252. PMID 39196586; PMCID PMC11359115; doi:10.1001/jamapsychiatry.2024.2406.", "link": "https://doi.org/10.1001/jamapsychiatry.2024.2406", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Spitzer1992", "text": "Spitzer RL, Williams JB, Gibbon M, First MB. The Structured Clinical Interview for DSM-III-R (SCID). I: History, rationale, and description. Arch Gen Psychiatry. 1992;49(8):624-9. PMID 1637252; doi:10.1001/archpsyc.1992.01820080032005.", "link": "https://doi.org/10.1001/archpsyc.1992.01820080032005", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Stahl2019", "text": "Stahl EA, Breen G, Forstner AJ, McQuillin A, Ripke S, Trubetskoy V, et al. Genome-wide association study identifies 30 loci associated with bipolar disorder. Nat Genet. 2019;51(5):793-803. PMID 31043756; PMCID PMC6956732; doi:10.1038/s41588-019-0397-8.", "link": "https://doi.org/10.1038/s41588-019-0397-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Stambolic1996", "text": "Stambolic V, Ruel L, Woodgett JR. Lithium inhibits glycogen synthase kinase-3 activity and mimics wingless signalling in intact cells. Curr Biol. 1996;6(12):1664-8. PMID 8994831; doi:10.1016/s0960-9822(02)70790-2.", "link": "https://doi.org/10.1016/s0960-9822(02)70790-2", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stanley2012SPI", "text": "Stanley B, Brown GK. Safety Planning Intervention: A Brief Intervention to Mitigate Suicide Risk. Cogn Behav Pract. 2012;19(2):256-264. doi:10.1016/j.cbpra.2011.01.001. Not indexed in PubMed; no abstract available in Crossref or Europe PMC.", "link": "https://doi.org/10.1016/j.cbpra.2011.01.001", "areas": ["G"], "unverified": false, "validated": "Crossref"}, {"key": "Stanley2018ED", "text": "Stanley B, Brown GK, Brenner LA, Galfalvy HC, Currier GW, Knox KL, et al. Comparison of the Safety Planning Intervention With Follow-up vs Usual Care of Suicidal Patients Treated in the Emergency Department. JAMA Psychiatry. 2018;75(9):894-900. PMID 29998307; PMCID PMC6142908; doi:10.1001/jamapsychiatry.2018.1776.", "link": "https://doi.org/10.1001/jamapsychiatry.2018.1776", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Starzer2018", "text": "Starzer MSK, Nordentoft M, Hjorthøj C. Rates and Predictors of Conversion to Schizophrenia or Bipolar Disorder Following Substance-Induced Psychosis. Am J Psychiatry. 2018;175(4):343-350. PMID 29179576; doi:10.1176/appi.ajp.2017.17020223.", "link": "https://doi.org/10.1176/appi.ajp.2017.17020223", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Stein2020BMC", "text": "Stein DJ, Szatmari P, Gaebel W, Berk M, Vieta E, Maj M, et al. Mental, behavioral and neurodevelopmental disorders in the ICD-11: an international perspective on key changes and controversies. BMC Med. 2020;18(1):21. PMID 31983345; PMCID PMC6983973; doi:10.1186/s12916-020-1495-2.", "link": "https://doi.org/10.1186/s12916-020-1495-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Strakowski2012", "text": "Strakowski SM, Adler CM, Almeida J, Altshuler LL, Blumberg HP, Chang KD, et al. The functional neuroanatomy of bipolar disorder: a consensus model. Bipolar Disord. 2012;14(4):313-25. PMID 22631617; PMCID PMC3874804; doi:10.1111/j.1399-5618.2012.01022.x.", "link": "https://doi.org/10.1111/j.1399-5618.2012.01022.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Strandhave2026", "text": "Strandhave C, Hansen HAS, Alda M, Bauer M, Berk M, Buspavanich P, et al. Lithium effects on renal functioning: an expert opinion and management algorithm. Int J Bipolar Disord. 2026;14(1). PMID 42034872; PMCID PMC13253906; doi:10.1186/s40345-026-00423-z.", "link": "https://doi.org/10.1186/s40345-026-00423-z", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Strawbridge2022", "text": "Strawbridge R, Kurana S, Kerr-Gaffney J, Jauhar S, Kaufman KR, Yalin N, et al. A systematic review and meta-analysis of treatments for rapid cycling bipolar disorder. Acta Psychiatr Scand. 2022;146(4):290-311. PMID 35778967; PMCID PMC9796364; doi:10.1111/acps.13471.", "link": "https://doi.org/10.1111/acps.13471", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Suppes1991", "text": "Suppes T, Baldessarini RJ, Faedda GL, Tohen M. Risk of recurrence following discontinuation of lithium treatment in bipolar disorder. Arch Gen Psychiatry. 1991;48(12):1082-8. PMID 1845226; doi:10.1001/archpsyc.1991.01810360046007.", "link": "https://doi.org/10.1001/archpsyc.1991.01810360046007", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Takeshima2020", "text": "Takeshima M, Utsumi T, Aoki Y, Wang Z, Suzuki M, Okajima I, et al. Efficacy and safety of bright light therapy for manic and depressive symptoms in patients with bipolar disorder: A systematic review and meta-analysis. Psychiatry Clin Neurosci. 2020;74(4):247-256. PMID 31917880; PMCID PMC7187384; doi:10.1111/pcn.12976.", "link": "https://doi.org/10.1111/pcn.12976", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Talati2013", "text": "Talati A, Bao Y, Kaufman J, Shen L, Schaefer CA, Brown AS. Maternal smoking during pregnancy and bipolar disorder in offspring. Am J Psychiatry. 2013;170(10):1178-85. PMID 24084820; PMCID PMC4086419; doi:10.1176/appi.ajp.2013.12121500.", "link": "https://doi.org/10.1176/appi.ajp.2013.12121500", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Thase2006BOLDER2", "text": "Thase ME, Macfadden W, Weisler RH, Chang W, Paulsson B, Khan A, et al. Efficacy of quetiapine monotherapy in bipolar I and II depression: a double-blind, placebo-controlled study (the BOLDER II study). J Clin Psychopharmacol. 2006;26(6):600-9. PMID 17110817; doi:10.1097/01.jcp.0000248603.76231.b7.", "link": "https://doi.org/10.1097/01.jcp.0000248603.76231.b7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Thornicroft2013CRIMSON", "text": "Thornicroft G, Farrelly S, Szmukler G, Birchwood M, Waheed W, Flach C, et al. Clinical outcomes of Joint Crisis Plans to reduce compulsory treatment for people with psychosis: a randomised controlled trial. Lancet. 2013;381(9878):1634-41. PMID 23537606; doi:10.1016/S0140-6736(13)60105-1.", "link": "https://doi.org/10.1016/s0140-6736(13)60105-1", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tinland2022", "text": "Tinland A, Loubière S, Mougeot F, Jouet E, Pontier M, Baumstarck K, et al. Effect of Psychiatric Advance Directives Facilitated by Peer Workers on Compulsory Admission Among People With Mental Illness: A Randomized Clinical Trial. JAMA Psychiatry. 2022;79(8):752-759. PMID 35662314; PMCID PMC9171654; doi:10.1001/jamapsychiatry.2022.1627.", "link": "https://doi.org/10.1001/jamapsychiatry.2022.1627", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tohen1999", "text": "Tohen M, Sanger TM, McElroy SL, Tollefson GD, Chengappa KN, Daniel DG, et al. Olanzapine versus placebo in the treatment of acute mania. Olanzapine HGEH Study Group. Am J Psychiatry. 1999;156(5):702-9. PMID 10327902; doi:10.1176/ajp.156.5.702.", "link": "https://doi.org/10.1176/ajp.156.5.702", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Tohen2003", "text": "Tohen M, Zarate CA Jr, Hennen J, Khalsa HM, Strakowski SM, Gebre-Medhin P, et al. The McLean-Harvard First-Episode Mania Study: prediction of recovery and first recurrence. Am J Psychiatry. 2003;160(12):2099-107. PMID 14638578; doi:10.1176/appi.ajp.160.12.2099.", "link": "https://doi.org/10.1176/appi.ajp.160.12.2099", "areas": ["A", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Tohen2003McLean"]}, {"key": "Tohen2003OFC", "text": "Tohen M, Vieta E, Calabrese J, Ketter TA, Sachs G, Bowden C, et al. Efficacy of olanzapine and olanzapine-fluoxetine combination in the treatment of bipolar I depression. Arch Gen Psychiatry. 2003;60(11):1079-88. PMID 14609883; doi:10.1001/archpsyc.60.11.1079.", "link": "https://doi.org/10.1001/archpsyc.60.11.1079", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tohen2006Olanzapine", "text": "Tohen M, Calabrese JR, Sachs GS, Banov MD, Detke HC, Risser R, et al. Randomized, placebo-controlled trial of olanzapine as maintenance therapy in patients with bipolar I disorder responding to acute treatment with olanzapine. Am J Psychiatry. 2006;163(2):247-56. PMID 16449478; doi:10.1176/appi.ajp.163.2.247.", "link": "https://doi.org/10.1176/appi.ajp.163.2.247", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tomson2018", "text": "Tomson T, Battino D, Bonizzoni E, Craig J, Lindhout D, Perucca E, et al. Comparative risk of major congenital malformations with eight different antiepileptic drugs: a prospective cohort study of the EURAP registry. Lancet Neurol. 2018;17(6):530-538. PMID 29680205; doi:10.1016/S1474-4422(18)30107-8.", "link": "https://doi.org/10.1016/s1474-4422(18)30107-8", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Tondo2010", "text": "Tondo L, Vázquez G, Baldessarini RJ. Mania associated with antidepressant treatment: comprehensive meta-analytic review. Acta Psychiatr Scand. 2010;121(6):404-14. PMID 19958306; doi:10.1111/j.1600-0447.2009.01514.x.", "link": "https://doi.org/10.1111/j.1600-0447.2009.01514.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tondo2017", "text": "Tondo L, Abramowicz M, Alda M, Bauer M, Bocchetta A, Bolzani L, et al. Long-term lithium treatment in bipolar disorder: effects on glomerular filtration rate and other metabolic parameters. Int J Bipolar Disord. 2017;5(1):27. PMID 28480485; PMCID PMC5537163; doi:10.1186/s40345-017-0096-2.", "link": "https://doi.org/10.1186/s40345-017-0096-2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Tondo2020", "text": "Tondo L, Vazquez GH, Baldessarini RJ. Suicidal Behavior Associated with Mixed Features in Major Mood Disorders. Psychiatr Clin North Am. 2020;43(1):83-93. PMID 32008690; doi:10.1016/j.psc.2019.10.008.", "link": "https://doi.org/10.1016/j.psc.2019.10.008", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Torrey1997", "text": "Torrey EF, Miller J, Rawlings R, Yolken RH. Seasonality of births in schizophrenia and bipolar disorder: a review of the literature. Schizophr Res. 1997;28(1):1-38. PMID 9428062; doi:10.1016/s0920-9964(97)00092-3.", "link": "https://doi.org/10.1016/s0920-9964(97)00092-3", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tse2014", "text": "Tse S, Chan S, Ng KL, Yatham LN. Meta-analysis of predictors of favorable employment outcomes among individuals with bipolar disorder. Bipolar Disord. 2014;16(3):217-29. PMID 24219657; doi:10.1111/bdi.12148.", "link": "https://doi.org/10.1111/bdi.12148", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Turecki2016Lancet", "text": "Turecki G, Brent DA. Suicide and suicidal behaviour. Lancet. 2016;387(10024):1227-39. PMID 26385066; PMCID PMC5319859; doi:10.1016/S0140-6736(15)00234-2.", "link": "https://doi.org/10.1016/s0140-6736(15)00234-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Uher2023", "text": "Uher R, Pavlova B, Radua J, Provenzani U, Najafi S, Fortea L, et al. Transdiagnostic risk of mental disorders in offspring of affected parents: a meta-analysis of family high-risk and registry studies. World Psychiatry. 2023;22(3):433-448. PMID 37713573; PMCID PMC10503921; doi:10.1002/wps.21147.", "link": "https://doi.org/10.1002/wps.21147", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Valtonen2008", "text": "Valtonen HM, Suominen K, Haukka J, Mantere O, Leppämäki S, Arvilommi P, et al. Differences in incidence of suicide attempts during phases of bipolar I and II disorders. Bipolar Disord. 2008;10(5):588-96. PMID 18657243; doi:10.1111/j.1399-5618.2007.00553.x.", "link": "https://doi.org/10.1111/j.1399-5618.2007.00553.x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "vanBergen2019", "text": "van Bergen AH, Verkooijen S, Vreeker A, Abramovic L, Hillegers MH, Spijker AT, et al. The characteristics of psychotic features in bipolar disorder. Psychol Med. 2019;49(12):2036-2048. PMID 30303059; doi:10.1017/S0033291718002854.", "link": "https://doi.org/10.1017/s0033291718002854", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Vancampfort2013", "text": "Vancampfort D, Vansteelandt K, Correll CU, Mitchell AJ, De Herdt A, Sienaert P, et al. Metabolic syndrome and metabolic abnormalities in bipolar disorder: a meta-analysis of prevalence rates and moderators. Am J Psychiatry. 2013;170(3):265-74. PMID 23361837; doi:10.1176/appi.ajp.2012.12050620.", "link": "https://doi.org/10.1176/appi.ajp.2012.12050620", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Vancampfort2015", "text": "Vancampfort D, Stubbs B, Mitchell AJ, De Hert M, Wampers M, Ward PB, et al. Risk of metabolic syndrome and its components in people with schizophrenia and related psychotic disorders, bipolar disorder and major depressive disorder: a systematic review and meta-analysis. World Psychiatry. 2015;14(3):339-47. PMID 26407790; PMCID PMC4592657; doi:10.1002/wps.20252.", "link": "https://doi.org/10.1002/wps.20252", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "VanderKruik2017", "text": "VanderKruik R, Barreix M, Chou D, Allen T, Say L, Cohen LS. The global prevalence of postpartum psychosis: a systematic review. BMC Psychiatry. 2017;17(1):272. PMID 28754094; PMCID PMC5534064; doi:10.1186/s12888-017-1427-7.", "link": "https://doi.org/10.1186/s12888-017-1427-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VanMeter2011", "text": "Van Meter AR, Moreira AL, Youngstrom EA. Meta-analysis of epidemiologic studies of pediatric bipolar disorder. J Clin Psychiatry. 2011;72(9):1250-6. PMID 21672501; doi:10.4088/JCP.10m06290.", "link": "https://doi.org/10.4088/jcp.10m06290", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VanMeter2012", "text": "Van Meter AR, Youngstrom EA, Findling RL. Cyclothymic disorder: a critical review. Clin Psychol Rev. 2012;32(4):229-43. PMID 22459786; doi:10.1016/j.cpr.2012.02.001.", "link": "https://doi.org/10.1016/j.cpr.2012.02.001", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "VanMeter2019", "text": "Van Meter A, Moreira ALR, Youngstrom E. Updated Meta-Analysis of Epidemiologic Studies of Pediatric Bipolar Disorder. J Clin Psychiatry. 2019;80(3). PMID 30946542; doi:10.4088/JCP.18r12180.", "link": "https://doi.org/10.4088/jcp.18r12180", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Velosa2020", "text": "Velosa J, Delgado A, Finger E, Berk M, Kapczinski F, de Azevedo Cardoso T. Risk of dementia in bipolar disorder and the interplay of lithium: a systematic review and meta-analyses. Acta Psychiatr Scand. 2020;141(6):510-521. PMID 31954065; doi:10.1111/acps.13153.", "link": "https://doi.org/10.1111/acps.13153", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Vieta2007HCL32", "text": "Vieta E, Sánchez-Moreno J, Bulbena A, Chamorro L, Ramos JL, Artal J, et al. Cross validation with the mood disorder questionnaire (MDQ) of an instrument for the detection of hypomania in Spanish: the 32 item hypomania symptom check list (HCL-32). J Affect Disord. 2007;101(1-3):43-55. PMID 17189651; doi:10.1016/j.jad.2006.09.040.", "link": "https://doi.org/10.1016/j.jad.2006.09.040", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Vieta2018", "text": "Vieta E, Berk M, Schulze TG, Carvalho AF, Suppes T, Calabrese JR, et al. Bipolar disorders. Nat Rev Dis Primers. 2018;4:18008. PMID 29516993; doi:10.1038/nrdp.2018.8.", "link": "https://doi.org/10.1038/nrdp.2018.8", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Vieta2025TRBD", "text": "Vieta E, McIntyre RS, Suppes T, Van Rheenen TE, Singh B, Miskowiak KW, et al. Defining Treatment-Resistant Bipolar Depression: Recommendations From the ISBD Task Force. Bipolar Disord. 2025;27(6):411-423. PMID 40808269; PMCID PMC12393891; doi:10.1111/bdi.70048.", "link": "https://doi.org/10.1111/bdi.70048", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Viguera2000", "text": "Viguera AC, Nonacs R, Cohen LS, Tondo L, Murray A, Baldessarini RJ. Risk of recurrence of bipolar disorder in pregnant and nonpregnant women after discontinuing lithium maintenance. Am J Psychiatry. 2000;157(2):179-84. PMID 10671384; doi:10.1176/appi.ajp.157.2.179.", "link": "https://doi.org/10.1176/appi.ajp.157.2.179", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Viguera2007Breastmilk", "text": "Viguera AC, Newport DJ, Ritchie J, Stowe Z, Whitfield T, Mogielnicki J, et al. Lithium in breast milk and nursing infants: clinical implications. Am J Psychiatry. 2007;164(2):342-5. PMID 17267800; doi:10.1176/ajp.2007.164.2.342.", "link": "https://doi.org/10.1176/ajp.2007.164.2.342", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Viguera2007Pregnancy", "text": "Viguera AC, Whitfield T, Baldessarini RJ, Newport DJ, Stowe Z, Reminick A, et al. Risk of recurrence in women with bipolar disorder during pregnancy: prospective study of mood stabilizer discontinuation. Am J Psychiatry. 2007;164(12):1817-24. PMID 18056236; doi:10.1176/appi.ajp.2007.06101639.", "link": "https://doi.org/10.1176/appi.ajp.2007.06101639", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Viktorin2014", "text": "Viktorin A, Lichtenstein P, Thase ME, Larsson H, Lundholm C, Magnusson PK, et al. The risk of switch to mania in patients with bipolar disorder during treatment with an antidepressant alone and in combination with a mood stabilizer. Am J Psychiatry. 2014;171(10):1067-73. PMID 24935197; doi:10.1176/appi.ajp.2014.13111501.", "link": "https://doi.org/10.1176/appi.ajp.2014.13111501", "areas": ["B", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Viktorin2017", "text": "Viktorin A, Rydén E, Thase ME, Chang Z, Lundholm C, D'Onofrio BM, et al. The Risk of Treatment-Emergent Mania With Methylphenidate in Bipolar Disorder. Am J Psychiatry. 2017;174(4):341-348. PMID 27690517; PMCID PMC6641557; doi:10.1176/appi.ajp.2016.16040467.", "link": "https://doi.org/10.1176/appi.ajp.2016.16040467", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wagner2006", "text": "Wagner KD, Hirschfeld RM, Emslie GJ, Findling RL, Gracious BL, Reed ML. Validation of the Mood Disorder Questionnaire for bipolar disorders in adolescents. J Clin Psychiatry. 2006;67(5):827-30. PMID 16841633; doi:10.4088/jcp.v67n0518.", "link": "https://doi.org/10.4088/jcp.v67n0518", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Wehr1982", "text": "Wehr TA, Goodwin FK, Wirz-Justice A, Breitmaier J, Craig C. 48-hour sleep-wake cycles in manic-depressive illness: naturalistic observations and sleep deprivation experiments. Arch Gen Psychiatry. 1982;39(5):559-65. PMID 6124223; doi:10.1001/archpsyc.1982.04290050037008.", "link": "https://doi.org/10.1001/archpsyc.1982.04290050037008", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wehr1987", "text": "Wehr TA, Sack DA, Rosenthal NE. Sleep reduction as a final common pathway in the genesis of mania. Am J Psychiatry. 1987;144(2):201-4. PMID 3812788; doi:10.1176/ajp.144.2.201.", "link": "https://doi.org/10.1176/ajp.144.2.201", "areas": ["B", "C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Weisler2005Carbamazepine", "text": "Weisler RH, Keck PE Jr, Swann AC, Cutler AJ, Ketter TA, Kalali AH. Extended-release carbamazepine capsules as monotherapy for acute mania in bipolar disorder: a multicenter, randomized, double-blind, placebo-controlled trial. J Clin Psychiatry. 2005;66(3):323-30. PMID 15766298; doi:10.4088/jcp.v66n0308.", "link": "https://doi.org/10.4088/jcp.v66n0308", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Weisler2011Quetiapine", "text": "Weisler RH, Nolen WA, Neijber A, Hellqvist A, Paulsson B. Continuation of quetiapine versus switching to placebo or lithium for maintenance treatment of bipolar I disorder (Trial 144: a randomized controlled study). J Clin Psychiatry. 2011;72(11):1452-64. PMID 22054050; doi:10.4088/JCP.11m06878.", "link": "https://doi.org/10.4088/jcp.11m06878", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wesseloo2016", "text": "Wesseloo R, Kamperman AM, Munk-Olsen T, Pop VJ, Kushner SA, Bergink V. Risk of Postpartum Relapse in Bipolar Disorder and Postpartum Psychosis: A Systematic Review and Meta-Analysis. Am J Psychiatry. 2016;173(2):117-27. PMID 26514657; doi:10.1176/appi.ajp.2015.15010124.", "link": "https://doi.org/10.1176/appi.ajp.2015.15010124", "areas": ["B", "D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Weston2016", "text": "Weston J, Bromley R, Jackson CF, Adab N, Clayton-Smith J, Greenhalgh J, et al. Monotherapy treatment of epilepsy in pregnancy: congenital malformation outcomes in the child. Cochrane Database Syst Rev. 2016;11(11):CD010224. PMID 27819746; PMCID PMC6465055; doi:10.1002/14651858.CD010224.pub2.", "link": "https://doi.org/10.1002/14651858.cd010224.pub2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "WHO2022ICD11", "text": "World Health Organization. ICD-11 for Mortality and Morbidity Statistics: 6A60 Bipolar type I disorder; 6A61 Bipolar type II disorder; 6A62 Cyclothymic disorder. Geneva: WHO; 2022. https://icd.who.int (unverified: the icd.who.int browser is script-rendered and returned no readable content to the validation tools; codes cross-checked against Harter2025 and Stein2020BMC)", "link": "https://icd.who.int", "areas": ["D"], "unverified": true}, {"key": "Williams2002Nature", "text": "Williams RS, Cheng L, Mudge AW, Harwood AJ. A common mechanism of action for three mood-stabilizing drugs. Nature. 2002;417(6886):292-5. PMID 12015604; doi:10.1038/417292a.", "link": "https://doi.org/10.1038/417292a", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wilting2005", "text": "Wilting I, Movig KL, Moolenaar M, Hekster YA, Brouwers JR, Heerdink ER, et al. Drug-drug interactions as a determinant of elevated lithium serum levels in daily clinical practice. Bipolar Disord. 2005;7(3):274-80. PMID 15898965; doi:10.1111/j.1399-5618.2005.00199.x.", "link": "https://doi.org/10.1111/j.1399-5618.2005.00199.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Wilting2007", "text": "Wilting I, Fase S, Martens EP, Heerdink ER, Nolen WA, Egberts AC. The impact of environmental temperature on lithium serum levels. Bipolar Disord. 2007;9(6):603-8. PMID 17845275; doi:10.1111/j.1399-5618.2007.00438.x.", "link": "https://doi.org/10.1111/j.1399-5618.2007.00438.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yatham2018", "text": "Yatham LN, Kennedy SH, Parikh SV, Schaffer A, Bond DJ, Frey BN, et al. Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder. Bipolar Disord. 2018;20(2):97-170. PMID 29536616; PMCID PMC5947163; doi:10.1111/bdi.12609.", "link": "https://doi.org/10.1111/bdi.12609", "areas": ["A", "D", "E", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Yatham2021Mixed", "text": "Yatham LN, Chakrabarty T, Bond DJ, Schaffer A, Beaulieu S, Parikh SV, et al. Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) recommendations for the management of patients with bipolar disorder with mixed presentations. Bipolar Disord. 2021;23(8):767-788. PMID 34599629; doi:10.1111/bdi.13135.", "link": "https://doi.org/10.1111/bdi.13135", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Yildiz2011Mania", "text": "Yildiz A, Vieta E, Leucht S, Baldessarini RJ. Efficacy of antimanic treatments: meta-analysis of randomized, controlled trials. Neuropsychopharmacology. 2011;36(2):375-89. PMID 20980991; PMCID PMC3055677; doi:10.1038/npp.2010.192.", "link": "https://doi.org/10.1038/npp.2010.192", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Yildiz2023", "text": "Yildiz A, Siafis S, Mavridis D, Vieta E, Leucht S. Comparative efficacy and tolerability of pharmacological interventions for acute bipolar depression in adults: a systematic review and network meta-analysis. Lancet Psychiatry. 2023;10(9):693-705. PMID 37595997; doi:10.1016/S2215-0366(23)00199-2.", "link": "https://doi.org/10.1016/s2215-0366(23)00199-2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Young1978", "text": "Young RC, Biggs JT, Ziegler VE, Meyer DA. A rating scale for mania: reliability, validity and sensitivity. Br J Psychiatry. 1978;133:429-35. PMID 728692; doi:10.1192/bjp.133.5.429.", "link": "https://doi.org/10.1192/bjp.133.5.429", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Young2017GERIBD", "text": "Young RC, Mulsant BH, Sajatovic M, Gildengers AG, Gyulai L, Al Jurdi RK, et al. GERI-BD: A Randomized Double-Blind Controlled Trial of Lithium and Divalproex in the Treatment of Mania in Older Patients With Bipolar Disorder. Am J Psychiatry. 2017;174(11):1086-1093. PMID 29088928; PMCID PMC6214451; doi:10.1176/appi.ajp.2017.15050657.", "link": "https://doi.org/10.1176/appi.ajp.2017.15050657", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Zalsman2016", "text": "Zalsman G, Hawton K, Wasserman D, van Heeringen K, Arensman E, Sarchiapone M, et al. Suicide prevention strategies revisited: 10-year systematic review. Lancet Psychiatry. 2016;3(7):646-59. PMID 27289303; doi:10.1016/S2215-0366(16)30030-X.", "link": "https://doi.org/10.1016/s2215-0366(16)30030-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zarate2012", "text": "Zarate CA Jr, Brutsche NE, Ibrahim L, Franco-Chaves J, Diazgranados N, Cravchik A, et al. Replication of ketamine's antidepressant efficacy in bipolar depression: a randomized controlled add-on trial. Biol Psychiatry. 2012;71(11):939-46. PMID 22297150; PMCID PMC3343177; doi:10.1016/j.biopsych.2011.12.010.", "link": "https://doi.org/10.1016/j.biopsych.2011.12.010", "areas": ["F", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Zarate2012Ketamine"]}, {"key": "Zimmerman2008", "text": "Zimmerman M, Ruggero CJ, Chelminski I, Young D. Is bipolar disorder overdiagnosed? J Clin Psychiatry. 2008;69(6):935-40. PMID 18466044; doi:10.4088/jcp.v69n0608.", "link": "https://doi.org/10.4088/jcp.v69n0608", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2010JCP", "text": "Zimmerman M, Ruggero CJ, Chelminski I, Young D. Psychiatric diagnoses in patients previously overdiagnosed with bipolar disorder. J Clin Psychiatry. 2010;71(1):26-31. PMID 19646366; doi:10.4088/JCP.08m04633.", "link": "https://doi.org/10.4088/jcp.08m04633", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2010Screening", "text": "Zimmerman M, Galione JN, Ruggero CJ, Chelminski I, Young D, Dalrymple K, et al. Screening for bipolar disorder and finding borderline personality disorder. J Clin Psychiatry. 2010;71(9):1212-7. PMID 20361913; doi:10.4088/JCP.09m05161yel.", "link": "https://doi.org/10.4088/jcp.09m05161yel", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2011MDQ", "text": "Zimmerman M, Galione JN, Chelminski I, Young D, Dalrymple K. Psychiatric diagnoses in patients who screen positive on the Mood Disorder Questionnaire: Implications for using the scale as a case-finding instrument for bipolar disorder. Psychiatry Res. 2011;185(3):444-9. PMID 20656360; doi:10.1016/j.psychres.2010.06.025.", "link": "https://doi.org/10.1016/j.psychres.2010.06.025", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2012MDQ", "text": "Zimmerman M. Misuse of the Mood Disorders Questionnaire as a case-finding measure and a critique of the concept of using a screening scale for bipolar disorder in psychiatric practice. Bipolar Disord. 2012;14(2):127-34. PMID 22420588; doi:10.1111/j.1399-5618.2012.00994.x.", "link": "https://doi.org/10.1111/j.1399-5618.2012.00994.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zimmerman2016MIDAS", "text": "Zimmerman M. A Review of 20 Years of Research on Overdiagnosis and Underdiagnosis in the Rhode Island Methods to Improve Diagnostic Assessment and Services (MIDAS) Project. Can J Psychiatry. 2016;61(2):71-9. PMID 27253697; PMCID PMC4784239; doi:10.1177/0706743715625935.", "link": "https://doi.org/10.1177/0706743715625935", "areas": ["D"], "unverified": false, "validated": "PubMed"}];
/* =============== home: one schematic year on a mood chart, with the night's sleep beside it =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of facts: a cited one can replace them once research exists. */
const HERO_CAP='Schematic, not to scale: one illustrative year. Real courses vary widely from person to person, and many people stay well for long periods with treatment.';
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  const WEEKS=52;/* schematic weeks on the scrubber */
  /* an illustrative course: steady, a rise into elevated mood, back to steady, a longer dip into depression, recovery */
  const f=moodSeries([[0,.02],[.07,.04],[.12,.3],[.17,.72],[.21,.78],[.25,.42],[.3,.05],[.38,-.04],[.44,-.3],[.5,-.62],[.58,-.7],[.66,-.58],[.73,-.28],[.8,-.05],[.88,.02],[1,.03]]);
  /* schematic sleep: shorter nights with elevated mood, broken nights in depression */
  const sleepAt=v=>{const bed=23+(v>0?v*2.6:-v*.6),wake=7-(v>0?v*1.4:-v*.4)+(v<0?-v*1.6:0);return {sleep:[bed%24,wake],broken:v<-EU?Math.min(1,-v*1.1):0}};
  function phase(u){const v=f(u),p=f.pole(u),rising=f(Math.min(1,u+.01))>v;
    if(p==='up')return [v>HYPO?'Elevated mood: mania range':'Elevated mood',`var(--up)`,'less sleep, more energy'];
    if(p==='down')return [v<-.5?'Depression':(rising?'Lifting out of depression':'Sliding into depression'),'var(--down)','low mood, sleep disturbed'];
    return [u>.82?'Steady again: recovery':u>.3&&u<.44?'Back to steady':'Steady mood (euthymia)','var(--eu)','usual sleep and energy']}
  function draw(t){const N=vb(svg,'520 300','400 380');const v=f(t),[ph,col,sub]=phase(t),sl=sleepAt(v);
    /* layout tables: wide = clock left, chart right; narrow = clock and label on top, chart below */
    const L=N?{cx:62,cy:100,r:44,lx:126,ly:62,gx:20,gy:172,gw:364,gh:172,sx:126,sy:122,sw:220}
             :{cx:76,cy:132,r:54,lx:160,ly:34,gx:158,gy:66,gw:346,gh:176,sx:24,sy:236,sw:112};
    let s='';
    /* the night: a 24-hour dial with the sleep arc and a sleep bar under it */
    const ck=clock24(L.cx,L.cy,L.r,{sleep:sl.sleep,small:N});s+=ck.svg;
    s+=`<text x="${L.cx}" y="${f1(L.cy-L.r-10)}" class="t-xs t-mid">a typical night</text>`;
    const sb=sleepbar(L.sx,L.sy,L.sw,10,{sleep:sl.sleep,broken:sl.broken});s+=sb.svg;
    s+=`<text x="${f1(L.sx)}" y="${f1(L.sy+26)}" class="t-xs">noon</text><text x="${f1(L.sx+L.sw)}" y="${f1(L.sy+26)}" class="t-xs t-end">noon</text>`;
    /* the year */
    const lc=lifechart(L.gx,L.gy,L.gw,L.gh,f,{upto:t,id:'hero',labels:true,dot:true});s+=lc.svg;
    s+=tline(L.gx,L.gy+L.gh+4,L.gw,{min:0,max:WEEKS,step:13,fmt:w=>w?'wk '+w:'0'}).svg;
    /* phase label */
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${col}">${ph}</text>`;
    const wk=`week ${Math.round(t*WEEKS)} of ${WEEKS}`;
    s+=N?`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${wk}</text><text x="${L.lx}" y="${L.ly+34}" class="t-sm">${sub}</text>`
        :`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${wk} · ${sub}</text>`;
    svg.innerHTML=s}
  cap.textContent=HERO_CAP;
  playWire(rg,$('#heroPlay'),draw,12000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What bipolar disorder is =============== */
/* lifetime prevalence per 1,000 adults: WMH (11 countries) and NCS-R (US) */
const WH_PREV={wmh:{i:6,ii:4,sub:14},ncs:{i:10,ii:11,sub:24}};
/* weeks of a 52-week year by symptom state (Judd 2002 BP-I, Judd 2003 BP-II), rounded to whole weeks */
const WH_WEEKS=[
  {n:'Bipolar I',src:'146 people, 12.8 years of weekly ratings',pc:{dep:31.9,up:8.9,mix:5.9,well:52.7},w:{dep:17,up:5,mix:3,well:27},upName:'manic or hypomanic'},
  {n:'Bipolar II',src:'86 people, 13.4 years of weekly ratings',pc:{dep:50.3,up:1.3,mix:2.3,well:46.1},w:{dep:26,up:1,mix:1,well:24},upName:'hypomanic'}
];
const WH_STEPS=[
  {from:0,at:.15,k:'Step 1 · worldwide',t:'Worldwide',
   txt:`In the WHO World Mental Health surveys of 61,392 adults in 11 countries, 2.4% met criteria for a bipolar spectrum disorder at some point in life: 24 in every 1,000. In the past 12 months the figure was 1.5%. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup> Rates differed by country, from 4.4% lifetime in the United States to 0.1% in India, and not simply by income: Japan was low (0.7%) and Colombia high (2.6%). <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup> A 2023 review estimates about 40 million people with bipolar disorder worldwide. <sup class="c" data-ref="Nierenberg2023" title="Source 378">378</sup>`,
   pt:`Out of every 1,000 adults, about 24 will have some form of bipolar disorder in their lifetime. You almost certainly know someone living with it.`,
   hook:`WMH lifetime: whole bipolar spectrum 2.4%; 12-month 1.5%. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>`},
  {from:.25,at:.42,k:'Step 2 · types',t:'Bipolar I, II & spectrum',
   txt:`Split by type, the worldwide surveys found bipolar I in 0.6%, bipolar II in 0.4% and subthreshold bipolar disorder in 1.4%. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup> Keep scrubbing: the US survey (NCS-R) found more of each, 1.0%, 1.1% and 2.4%. <sup class="c" data-ref="Merikangas2007" title="Source 328">328</sup> The NCS-R sampled only the US, which had the highest rate of the 11 countries in the worldwide surveys. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup> In both surveys the milder, subthreshold forms outnumber bipolar I and II together, and the NCS-R authors call them clinically significant and underdetected. <sup class="c" data-ref="Merikangas2007" title="Source 328">328</sup>`,
   pt:`Bipolar I (with full mania) and bipolar II (with milder highs) together affect about 1 to 2 adults in every 100. Milder forms are even more common.`,
   hook:`WMH: BP-I 0.6%, BP-II 0.4%, subthreshold 1.4%. NCS-R (US): BP-I 1.0%, BP-II 1.1%, subthreshold 2.4%. <sup class="c" data-ref="Merikangas2011,Merikangas2007" title="Source 328,329">328,329</sup>`},
  {from:.5,at:.66,k:'Step 3 · age at onset',t:'Age at onset',
   txt:`In the worldwide surveys the mean age at onset was 18.4 years for bipolar I, 20.0 for bipolar II and 21.9 for subthreshold bipolar disorder, and about half of people with bipolar I reported onset before 25. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup> Reviews put the usual onset between 15 and 25. <sup class="c" data-ref="Nierenberg2023,Scott2022Delay" title="Source 378,450">378,450</sup> One study of 368 people with bipolar I found three onset groups with means of 17.4, 25.1 and 40.4 years, so later onset happens too. <sup class="c" data-ref="Bellivier2003" title="Source 32">32</sup> A large population meta-analysis placed the median later, at 30–35 years: studies differ in whether onset means first symptoms or first full episode. <sup class="c" data-ref="Solmi2022" title="Source 464">464</sup>`,
   pt:`Bipolar disorder usually starts in the teens or twenties, but it can begin later in life.`,
   hook:`Mean onset (WMH): 18.4 y BP-I, 20.0 y BP-II, 21.9 y subthreshold. Three BP-I onset subgroups: 17.4 / 25.1 / 40.4 y. <sup class="c" data-ref="Merikangas2011,Bellivier2003" title="Source 32,329">32,329</sup>`},
  {from:.75,at:.97,k:'Step 4 · a typical year',t:'Time spent ill',
   txt:`Mania defines bipolar I, but it is not where most time goes. Followed weekly for a mean of 12.8 years, people with bipolar I had symptoms in 47.3% of weeks: depressive in 31.9%, manic or hypomanic in 8.9% and cycling or mixed in 5.9%. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> In bipolar II the imbalance was larger: depressive symptoms in 50.3% of weeks against hypomania in 1.3%. <sup class="c" data-ref="Judd2003" title="Source 247">247</sup> Much of this time was milder, subsyndromal symptoms rather than full episodes. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> About 75% of symptomatic time is depressive, <sup class="c" data-ref="Nierenberg2023" title="Source 378">378</sup> and depression accounts for a disproportionate share of illness and deaths. <sup class="c" data-ref="McIntyre2020Lancet" title="Source 320">320</sup>`,
   pt:`For most people with bipolar disorder the low times last much longer than the highs. Treating depression well is central to living well.`,
   hook:`Judd: BP-I depressive 31.9% vs manic/hypomanic 8.9% of weeks; BP-II depressive 50.3% vs hypomanic 1.3%. <sup class="c" data-ref="Judd2002,Judd2003" title="Source 246,247">246,247</sup>`}
];
/* the words-matter flip set: [stigmatising phrase, better phrase, why (cited)] */
const WH_WORDS=[
  ['"She\'s a bipolar." "Bipolars are…"','"She has bipolar disorder." "People living with bipolar disorder…"',
   `Bipolar disorder is an illness a person has, not who they are. Self-stigma, taking on other people's negative views, is moderate to high in people with bipolar disorder. <sup class="c" data-ref="Ellison2013Stigma" title="Source 119">119</sup>`],
  ['"I\'m so bipolar today."','"My mood has been up and down today."',
   `A diagnosis needs distinct episodes that last days, such as at least 4 days for hypomania in DSM-5, not ordinary changes of mood within a day. <sup class="c" data-ref="Angst2020ICD11" title="Source 14">14</sup> Using the name casually makes the illness sound trivial.`],
  ['"He\'s acting manic."','"He seems very wound up." Or, if it is a real concern: "He may be having a manic episode."',
   `Mania is a medical state with sleeplessness, racing thoughts and often irritability, "not a purely euphoric state". <sup class="c" data-ref="Cassidy1998" title="Source 70">70</sup> Saving the word for that state keeps it accurate.`],
  ['"Crazy." "Psycho."','"Having a mood episode." "Having psychotic symptoms."',
   `Psychotic symptoms are symptoms of an episode, present at some point in about 63% of people with bipolar I, <sup class="c" data-ref="Aminoff2022" title="Source 6">6</sup> and episodes end: 98% of people treated for a first mania reached syndromal recovery within 2 years. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>`],
  ['"Non-compliant." "Off their meds."','"Not taking treatment as prescribed right now." And then: "What is getting in the way?"',
   `More than half of people with bipolar disorder do not take treatment exactly as prescribed, <sup class="c" data-ref="Nierenberg2023" title="Source 378">378</sup> so it is a common, shared problem to solve together, not a character flaw.`],
  ['"Committed suicide."','"Died by suicide." "Is having thoughts of suicide."',
   `Suicide is a health outcome, not a crime, and treatment lowers the risk: lithium reduced suicides compared with placebo in randomised trials. <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup> Talking about it plainly helps people ask for help. If you are in crisis, contact local emergency services or a crisis line (in the US call or text 988; in the UK and Ireland Samaritans 116 123).`]
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT'),note=$('#whNote'),read=$('#whRead');
  const COL={i:'var(--brand)',ii:'var(--rx)',sub:'var(--dx)',off:'var(--line)'};
  const NAME={i:'Bipolar I',ii:'Bipolar II',sub:'Subthreshold'};
  /* a fixed random scatter: order[k] is the cell of the k-th affected person */
  const order=(()=>{const a=[...Array(1000).keys()],r=rng(2011);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function counts(t){
    if(t<.25){const n=Math.round(24*ease(ramp(t,.02,.18)));return {mode:'one',n,i:0,ii:0,sub:0}}
    const sp=ease(ramp(t,.25,.31)),mv=ease(ramp(t,.33,.45)),W=WH_PREV.wmh,N=WH_PREV.ncs;
    const c={i:Math.round(lerp(W.i,N.i,mv)),ii:Math.round(lerp(W.ii,N.ii,mv)),sub:Math.round(lerp(W.sub,N.sub,mv))};
    return {mode:'split',sp,mv,...c,n:c.i+c.ii+c.sub}}
  function icons(L,c){
    const cat=new Array(1000).fill('off');
    if(c.mode==='one'){for(let k=0;k<c.n;k++)cat[order[k]]='one'}
    else{let k=0;for(const g of ['i','ii','sub'])for(let m=0;m<c[g];m++)cat[order[k++]]=g}
    let s='';
    for(let idx=0;idx<1000;idx++){const col=idx%L.cols,row=Math.floor(idx/L.cols),x=L.ix+col*L.dx+L.dx/2,y=L.iy+row*L.dy;
      const k=cat[idx];let fill=COL.off,op=1;
      if(k==='one')fill='var(--brand)';
      else if(k!=='off')fill=c.sp>.5?COL[k]:'var(--brand)';
      s+=person(x,y,L.ps,fill,{op})}
    return s}
  function bars(x,y,w,c,N){/* side panel: counts per 1,000 */
    let s='';const lab=c.mode==='one'?[['All forms',c.n,'var(--brand)']]:
      [['Bipolar I',c.i,COL.i],['Bipolar II',c.ii,COL.ii],['Subthreshold',c.sub,COL.sub]];
    const sc=w/30;
    lab.forEach(([n,v,col],k)=>{const yy=y+k*34;
      s+=`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(w)}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(Math.max(0,v*sc))}" height="12" rx="6" style="fill:${col}"/>`;
      s+=`<text x="${f1(x+w)}" y="${yy}" class="t-sm t-end" style="fill:var(--ink);font-weight:600">${v} / 1,000</text>`});
    return s}
  function sceneIcons(t,N){const c=counts(t);
    const L=N?{cols:25,dx:14,dy:11.6,ix:25,iy:96,ps:9.6}:{cols:40,dx:11,dy:11.6,ix:12,iy:52,ps:9.4};
    let s='';const ncs=c.mode==='split'&&c.mv>.5;
    const ttl=c.mode==='one'?'Lifetime, worldwide surveys (WMH)':ncs?'Lifetime, US survey (NCS-R)':'Lifetime, worldwide surveys (WMH)';
    s+=`<text x="${N?20:12}" y="${N?24:24}" class="t-big">${c.n} in 1,000 adults</text>`;
    s+=`<text x="${N?20:12}" y="${N?44:42}" class="t-sm">${ttl}</text>`;
    s+=icons(L,c);
    if(N){s+=bars(20,c.mode==='one'?562:556,360,c,N);
      if(c.mode==='one')s+=`<text x="20" y="${614}" class="t-xs">12-month: 1.5% · US 4.4% · India 0.1% (lifetime)</text>`}
    else{const px=478;
      s+=`<text x="${px}" y="76" class="t-lbl">${c.mode==='one'?'All forms together':'By type'}</text>`;
      s+=bars(px,104,226,c,N);
      if(c.mode==='one'){s+=`<text x="${px}" y="168" class="t-xs">Past 12 months: 1.5% (15 in 1,000)</text>`;
        s+=`<text x="${px}" y="214" class="t-lbl">Range by country (lifetime)</text>`;
        [['United States',4.4],['Colombia',2.6],['Japan',.7],['India',.1]].forEach(([n,v],k)=>{const yy=236+k*22,w=v/4.4*110*ease(ramp(t,.05,.2));
          s+=`<text x="${px}" y="${yy+9}" class="t-xs">${n}</text><rect x="${px+82}" y="${yy}" width="${f1(w)}" height="10" rx="5" style="fill:var(--brand);opacity:.55"/><text x="${f1(px+86+w)}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${v}%</text>`})}
      else{const W=WH_PREV.wmh,Nn=WH_PREV.ncs,y0=226;
        s+=`<text x="${px}" y="${y0}" class="t-lbl">Two surveys compared</text>`;
        s+=`<text x="${px+120}" y="${y0+22}" class="t-xs t-end">WMH</text><text x="${px+190}" y="${y0+22}" class="t-xs t-end">NCS-R</text>`;
        [['Bipolar I','i'],['Bipolar II','ii'],['Subthreshold','sub']].forEach(([n,k],r)=>{const yy=y0+42+r*20;
          s+=`<text x="${px}" y="${yy}" class="t-xs" style="fill:${COL[k]}">${n}</text><text x="${px+120}" y="${yy}" class="t-xs t-end" style="fill:var(--ink);opacity:${ncs?.55:1}">${(W[k]/10).toFixed(1)}%</text><text x="${px+190}" y="${yy}" class="t-xs t-end" style="fill:var(--ink);opacity:${ncs?1:.55}">${(Nn[k]/10).toFixed(1)}%</text>`});
        s+=`<text x="${px}" y="${y0+112}" class="t-xs">${ncs?'US only (highest of the 11 WMH countries)':'11 countries, 61,392 adults'}</text>`}}
    return {s,c}}
  function sceneOnset(t,N){const p=ease(ramp(t,.5,.68));
    const G=N?{x:34,y:130,w:340,h:330}:{x:60,y:70,w:600,h:220};
    const AGE=60,X=a=>G.x+G.w*a/AGE;
    /* schematic shape with peaks at the Bellivier subgroup means */
    const dens=a=>.55*Math.exp(-((a-17.4)**2)/(2*3.2**2))+.38*Math.exp(-((a-25.1)**2)/(2*4.8**2))+.16*Math.exp(-((a-40.4)**2)/(2*8**2));
    const mx=.62;let s='';
    s+=`<text x="${N?20:60}" y="${N?28:28}" class="t-big">When does it start?</text>`;
    s+=`<text x="${N?20:60}" y="${N?48:48}" class="t-sm">${N?'Age at onset · curve shape schematic':'Age at onset · curve shape schematic, marked ages published'}</text>`;
    /* usual 15–25 window */
    s+=`<rect x="${f1(X(15))}" y="${G.y}" width="${f1(X(25)-X(15))}" height="${G.h}" style="fill:var(--brand-soft);opacity:${f1(.4+.6*ramp(t,.52,.58))}"/>`;
    s+=`<text x="${f1((X(15)+X(25))/2)}" y="${G.y-6}" class="t-xs t-mid" style="fill:var(--brand)">usual onset 15–25</text>`;
    s+=tline(G.x,G.y+G.h,G.w,{min:0,max:60,step:10,fmt:v=>v,label:'age (years)'}).svg;
    const amax=AGE*p;
    const d=pathFn(u=>1-dens(u*amax)/mx,G.x,G.x+G.w*p,G.y+G.h*.12,G.y+G.h,140);
    if(p>0){s+=`<path d="${d}L${f1(G.x+G.w*p)} ${G.y+G.h}L${G.x} ${G.y+G.h}Z" style="fill:var(--brand);opacity:.13"/><path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.6;stroke-linejoin:round"/>`;
      s+=`<circle cx="${f1(G.x+G.w*p)}" cy="${f1(G.y+G.h*.12+(G.y+G.h-(G.y+G.h*.12))*(1-dens(amax)/mx))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`}
    /* published markers */
    const mk=[[18.4,'BP-I 18.4',0,'var(--brand)'],[20,'BP-II 20.0',1,'var(--rx)'],[21.9,'subthr. 21.9',2,'var(--dx)']];
    mk.forEach(([a,l,k,c])=>{if(amax<a)return;const x=X(a),y=G.y+G.h*.12+G.h*.88*(1-dens(a)/mx);
      const ly=G.y+(N?48:36)+k*15,lx=N?X(32):X(30);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${G.y+G.h}" style="stroke:${c};stroke-width:1.3;stroke-dasharray:3 3"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:${c}"/>`;
      s+=`<text x="${f1(lx)}" y="${ly}" class="t-xs" style="fill:${c};font-weight:600">mean onset ${l} y</text>`});
    [[17.4,'17.4'],[25.1,'25.1'],[40.4,'40.4']].forEach(([a,l])=>{if(amax<a)return;
      s+=`<text x="${f1(X(a))}" y="${G.y+G.h+(N?36:34)}" class="t-xs t-mid" style="fill:var(--ink)">▲${l}</text>`});
    if(amax>=40.4){s+=`<text x="${N?20:G.x}" y="${G.y+G.h+(N?58:52)}" class="t-xs">▲ three bipolar I onset subgroups (mean ages)${N?'':' · half of BP-I begins before 25'}</text>`;
      if(N)s+=`<text x="20" y="${G.y+G.h+78}" class="t-xs">Half of BP-I begins before 25.</text><text x="20" y="${G.y+G.h+96}" class="t-xs">Population studies place the median later (30–35 y).</text>`;
      else s+=`<text x="${G.x}" y="${G.y+G.h+68}" class="t-xs">Population studies place the median later (30–35 y): definitions of onset differ</text>`}
    return s}
  function sceneWeeks(t,N){const p=ramp(t,.76,.95);let s='';
    s+=`<text x="${N?20:24}" y="28" class="t-big">A typical year: 52 weeks</text>`;
    s+=`<text x="${N?20:24}" y="48" class="t-sm">${N?'Share of weeks by symptom state':'Share of weeks in each symptom state, averaged over 13 years of weekly ratings'}</text>`;
    const C={dep:'var(--down-fill)',up:'var(--up-fill)',mix:'var(--mixed-fill)',well:'var(--eu-soft)'};
    WH_WEEKS.forEach((g,gi)=>{
      const seq=[];['dep','up','mix','well'].forEach(k=>{for(let i=0;i<g.w[k];i++)seq.push(k)});
      const shown=Math.round(52*p);
      let x0,y0,cw,ch,cols;
      if(N){cols=13;cw=27;ch=24;x0=22;y0=100+gi*250}else{cols=52;cw=12.4;ch=40;x0=24;y0=96+gi*130}
      s+=`<text x="${x0}" y="${y0-12}" class="t-lbl">${g.n}</text><text x="${x0+(N?86:86)}" y="${y0-12}" class="t-xs">${N?g.src.replace(' of weekly ratings',''):g.src}</text>`;
      seq.forEach((k,i)=>{const cx=x0+(i%cols)*cw,cy=y0+Math.floor(i/cols)*(ch+4),on=i<shown;
        s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw-2)}" height="${ch}" rx="2.5" style="fill:${on?C[k]:'var(--panel-2)'};${k==='well'&&on?'stroke:var(--eu);stroke-width:.8;':''}"/>`});
      const by=N?y0+4*(ch+4)+20:y0+ch+22;
      const cnt=k=>{let n=0;for(let i=0;i<Math.min(shown,seq.length);i++)if(seq[i]===k)n++;return n};
      const items=[['dep','depressive'],['up',N?g.upName.replace('manic or hypomanic','manic/hypo'):g.upName],['mix',N?'mixed':'cycling / mixed'],['well','no symptoms']];
      items.forEach(([k,l],j)=>{const xx=x0+(j%2)*(N?186:300),yy=by+Math.floor(j/2)*(N?18:17);
        s+=`<rect x="${xx}" y="${yy-9}" width="10" height="10" rx="2" style="fill:${C[k]};${k==='well'?'stroke:var(--eu);stroke-width:.8':''}"/><text x="${xx+15}" y="${yy}" class="t-xs" style="fill:var(--ink)">${l} ${g.pc[k]}%${p>.02?' · '+cnt(k)+' wk':''}</text>`})});
    if(p>=1)s+=`<text x="${N?20:24}" y="${N?620:372}" class="t-sm" style="fill:var(--down);font-weight:600">${N?'Lows outlast highs: 17 vs 5 weeks (I), 26 vs 1 (II)':'Depression outlasts the highs: 17 vs 5 weeks a year in bipolar I, 26 vs 1 in bipolar II'}</text>`;
    return s}
  const setActive=stepWire($('#whSteps'),WH_STEPS,rg,draw,()=>stop());
  function draw(t){const N=vb(svg,'720 380','400 640');let s='',c=null;
    if(t<.5){const r=sceneIcons(t,N);s=r.s;c=r.c}
    else if(t<.75)s=sceneOnset(t,N);
    else s=sceneWeeks(t,N);
    svg.innerHTML=s;
    const ph=phaseOf(WH_STEPS,t);setActive(ph);note.innerHTML=noteHTML(WH_STEPS[ph]);
    if(c)read.innerHTML=c.mode==='one'?`<span>Affected: <b>${c.n}</b> per 1,000</span><span>Unaffected: <b>${1000-c.n}</b></span>`:
      `<span>Bipolar I <b>${c.i}</b></span><span>Bipolar II <b>${c.ii}</b></span><span>Subthreshold <b>${c.sub}</b></span><span>Survey <b>${c.mv>.5?'NCS-R (US)':'WMH (11 countries)'}</b></span>`;
    else if(t<.75)read.innerHTML=`<span>Mean onset <b>18.4 y</b> BP-I</span><span><b>20.0 y</b> BP-II</span><span><b>21.9 y</b> subthreshold</span>`;
    else read.innerHTML=`<span>BP-I symptomatic weeks <b>47.3%</b></span><span>BP-II <b>53.9%</b></span>`}
  const stop=playWire(rg,$('#whPlay'),draw,22000,'Replay','what');
  draw(+rg.value);

  /* ---- diagnostic delay bars ---- */
  const dsvg=$('#whDelay'),drg=$('#whDelayT');
  const DL=[['Median time to seeking help',3.5,'Scott 2022','var(--brand)'],['Median untreated illness',5.9,'Scott 2022','var(--brand)'],['Median time to diagnosis',6.7,'Scott 2022','var(--brand)'],['Pooled onset to first management',5.8,'Dagani 2017','var(--dx)'],['Pooled mean undiagnosed / untreated',9.1,'Keramatian 2025','var(--accent)']];
  function drawDelay(t){const N=vb(dsvg,'720 250','400 380'),yrs=10*t;let s='';
    const G=N?{x:20,w:350,y:30,row:62,lw:0}:{x:250,w:430,y:30,row:38,lw:240};
    const X=v=>G.x+G.w*v/10;
    DL.forEach(([n,v,src,col],i)=>{const y=N?G.y+i*G.row+18:G.y+i*G.row,w=G.w*Math.min(v,yrs)/10,done=yrs>=v;
      if(N)s+=`<text x="${G.x}" y="${y-6}" class="t-xs" style="fill:var(--ink)">${n} <tspan style="fill:var(--muted)">· ${src}</tspan></text>`;
      else s+=`<text x="${G.x-10}" y="${y+12}" class="t-xs t-end" style="fill:var(--ink)">${n}</text><text x="${G.x-10}" y="${y+24}" class="t-xs t-end">${src}</text>`;
      s+=`<rect x="${G.x}" y="${y}" width="${f1(G.w)}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${G.x}" y="${y}" width="${f1(w)}" height="16" rx="8" style="fill:${col};opacity:${done?1:.6}"/>`;
      if(done)s+=`<text x="${f1(X(v)+6)}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:600">${v} y</text>`});
    const ay=N?G.y+5*G.row+6:G.y+5*G.row+8;
    s+=tline(G.x,ay,G.w,{min:0,max:10,step:2,fmt:v=>v+' y'}).svg;
    s+=`<line x1="${f1(X(yrs))}" x2="${f1(X(yrs))}" y1="${G.y-8}" y2="${ay}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/>`;
    s+=`<text x="${f1(Math.min(X(yrs),G.x+G.w-4))}" y="${G.y-12}" class="t-xs ${yrs>8?'t-end':'t-mid'}" style="fill:var(--ink)">${f1(yrs)} years after first symptoms</text>`;
    dsvg.innerHTML=s}
  playWire(drg,$('#whDelayPlay'),drawDelay,6000,'Replay','what');
  drawDelay(+drg.value);
  const prevR=redraws.what;redraws.what=()=>{prevR&&prevR();drawDelay(+drg.value)};

  /* ---- words matter ---- */
  $('#whWords').innerHTML=WH_WORDS.map(([bad,good,why],i)=>`<div class="card wm-card"><button class="wm-flip" data-wm="${i}" aria-pressed="false"><small>Instead of</small><span class="wm-say">${bad}</span></button><p class="wm-why" hidden></p></div>`).join('');
  $('#whWords').addEventListener('click',e=>{const b=e.target.closest('[data-wm]');if(!b)return;const i=+b.dataset.wm,on=b.getAttribute('aria-pressed')!=='true';
    b.setAttribute('aria-pressed',on);const [bad,good,why]=WH_WORDS[i];
    b.innerHTML=on?`<small>Try</small><span class="wm-say">${good}</span>`:`<small>Instead of</small><span class="wm-say">${bad}</span>`;
    const p=b.parentNode.querySelector('.wm-why');p.hidden=!on;p.innerHTML=on?`<b>Why:</b> ${why}`:''});
};
/* =============== 1.2 Mania, hypomania & depression =============== */
inits.episodes=()=>{
  const WK=36;                       /* the illustrative course runs 36 weeks */
  const U=w=>w/WK;
  /* one illustrative course: knots [week, mood v] */
  const f=moodSeries([[0,.02],[1.6,-.04],[3.2,.03],[4,.06],[4.4,.22],[4.8,.37],[5.1,.38],[5.4,.22],[5.8,.05],[7.6,-.03],[9.6,.03],[10.2,.2],[10.8,.55],[11.6,.8],[12.8,.86],[13.8,.76],[14.6,.5],[15.3,.12],[16.1,-.3],[17.2,-.6],[19,-.72],[21.5,-.7],[24,-.62],[26,-.42],[27.6,-.18],[29,-.05],[31,.03],[33.5,-.02],[36,.01]].map(([w,v])=>[U(w),v]));
  const MIX=[14.1,16.4];             /* weeks drawn as a mixed stretch */
  /* episodes for the duration meter: start, end (weeks), DSM-5-TR minimum in days */
  const EPIS=[
    {k:'hypo',n:'Hypomanic episode',a:4.35,b:5.5,min:4,col:'var(--up)',fill:'var(--up-fill)'},
    {k:'mania',n:'Manic episode',a:10.2,b:15.5,min:7,col:'var(--up)',fill:'var(--up-fill)'},
    {k:'dep',n:'Major depressive episode',a:15.51,b:27.8,min:14,col:'var(--down)',fill:'var(--down-fill)'}];
  const STEPS=[
    {from:0,at:U(2.4),k:'Weeks 0–4 · steady mood',t:'Well (euthymia)',
     txt:`The line sits in the green band: mood, energy and sleep feel like the person's usual self. In bipolar disorder these well stretches are real and can be long. Over 12.8 years of weekly ratings, people with bipolar I had no symptoms in a little over half of all weeks (they had symptoms in 47.3%). <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>`,
     pt:`Bipolar disorder is not a constant state. Between episodes, many people feel like themselves.`,
     hook:`Diagnosis is about <b>episodes</b>: a change from the person's usual self that lasts a set number of days. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(4),at:U(5.3),k:'Week 4–5 · ≥4 days',t:'Hypomania',
     txt:`Mood lifts or turns irritable, and energy and activity rise with it. Sleep shortens without tiredness, talk speeds up, ideas come quickly. DSM-5-TR requires this to last at least 4 consecutive days, most of the day, nearly every day, with at least 3 of the 7 symptoms (4 if mood is only irritable). The change is clear to others but does not cause marked impairment, need hospital care or bring psychosis. Watch the meter below the chart reach day 4. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
     pt:`Hypomania is a milder high that lasts at least 4 days. Other people notice the change, but it does not wreck work or home life. It can even feel good, which is one reason it is missed.`,
     hook:`Hypomania: ≥4 consecutive days, observable change, NO marked impairment, NO hospitalisation, NO psychosis. Psychosis makes it mania by definition. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(9.8),at:U(12.6),k:'Weeks 10–15 · ≥1 week',t:'Mania',
     txt:`The same kinds of symptoms, now severe: feeling rested after very little sleep, pressured speech that is hard to interrupt, racing thoughts or flight of ideas, distractibility, grandiosity, driven activity, and risky choices with painful consequences such as spending sprees. Mania lasts at least 1 week, or any length if hospital care is needed, and causes marked impairment, needs hospitalisation, or brings psychotic features. One manic episode is enough for a diagnosis of bipolar I. <sup class="c" data-ref="APA2022,Yatham2018,McIntyre2020Lancet" title="Source 15,320,525">15,320,525</sup>`,
     pt:`Mania is a severe high that lasts a week or more and causes serious problems, needs hospital care, or comes with losing touch with reality. The person may not see the change in themselves.`,
     hook:`Mania: ≥1 week (any duration if hospitalised) + 3 of 7 B symptoms (4 if only irritable) + marked impairment, hospitalisation or psychosis. Since DSM-5, increased energy or activity is required in Criterion A. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(MIX[0]),at:U(15.2),k:'Weeks 14–16 · both poles at once',t:'Mixed features',
     txt:`As the high breaks, energy and racing thoughts can persist while mood turns dark, anxious or irritable: the mauve band. DSM-5 replaced the old "mixed episode" with a "with mixed features" specifier, used when symptoms of the opposite pole appear during a manic, hypomanic or depressive episode. In a meta-analysis, mixed features were present in 26.8% of manic or hypomanic episodes and 11.6% of major depressive episodes. ICD-11 keeps a separate mixed episode lasting at least 2 weeks. <sup class="c" data-ref="Mason2016,Yatham2018,Na2021,Stein2020BMC" title="Source 311,361,475,525">311,361,475,525</sup>`,
     pt:`In a mixed state a person can feel low and hopeless but also restless, sped-up and unable to sleep. It is a time to stay closely in touch with the care team.`,
     hook:`DSM-5/5-TR: "with mixed features" is a <b>specifier</b>; ICD-11: a mixed <b>episode</b> of ≥2 weeks. <sup class="c" data-ref="Yatham2018,Stein2020BMC" title="Source 475,525">475,525</sup>`},
    {from:U(16.6),at:U(21),k:'Weeks 16–28 · ≥2 weeks',t:'Depression',
     txt:`A major depressive episode needs 5 or more of 9 symptoms in the same 2-week period, including depressed mood or loss of interest or pleasure: weight or appetite change, sleeping too little or too much, slowing or agitation, fatigue, worthlessness or guilt, poor concentration or indecision, and recurrent thoughts of death. There are no separate criteria for bipolar depression. Notice how much longer this stretch lasts than the high: over the long term, depressive symptoms take up far more weeks than manic ones. <sup class="c" data-ref="APA2022,Yatham2018,Judd2002" title="Source 15,246,525">15,246,525</sup>`,
     pt:`The low is usually longer than the high. Energy drains, sleep goes wrong, and everything feels slow and heavy. Thoughts of death can be part of the illness; they are a reason to reach out for help straight away, and help works.`,
     hook:`Major depressive episode: 5 of 9 symptoms for ≥2 weeks, one of them depressed mood or loss of interest. In bipolar I, 31.9% of weeks were depressive vs 8.9% manic/hypomanic. <sup class="c" data-ref="APA2022,Judd2002" title="Source 15,246">15,246</sup>`},
    {from:U(27),at:U(31.5),k:'Weeks 28–36 · back to steady',t:'Recovery',
     txt:`The line returns to the steady band. After a first hospitalisation for mania, 98% of people reached syndromal recovery within 2 years, half of them by 5.4 weeks; returning to previous work and living took longer (43% by 2 years). Many people with bipolar disorder work: up to 60% of people with established illness are employed. Effective treatment exists for every phase, and lithium and other treatments help prevent the next episode (see <a href="#lithium" data-go="lithium">Lithium</a>). <sup class="c" data-ref="Tohen2003,Marwaha2013,Yatham2018" title="Source 310,486,525">310,486,525</sup>`,
     pt:`Episodes end. With treatment, most people recover from an episode, and many go on to work and live full lives. Getting back to everyday life can take longer than the symptoms do.`,
     hook:`Tohen 2003: syndromal recovery 98% by 2 years, but functional recovery only 43%; 40% had a new episode within 2 years of recovery. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>`}
  ];
  /* state of the person at week w */
  function state(w){
    const v=f(U(w)),m=w>=MIX[0]&&w<=MIX[1]?bump(w,MIX[0]-.3,MIX[1]+.3):0;
    const vp=clamp(v/.85),vn=clamp(-v/.72);
    let ph=v>HYPO?'mania':v>EU?'hypo':v<-EU?'dep':'eu';if(m>.35)ph='mixed';
    const mx=Math.max(vp,m*.8);
    return {v,m,vp,vn,ph,
      bed:23+3*mx-1*vn, wake:7-1.6*mx+2*vn, broken:clamp(vn*.7+m*.4),
      energy:clamp(.5+.5*vp-.42*vn+.3*m), speech:clamp(.5+.5*vp-.4*vn+.32*m), think:clamp(.5+.5*vp-.4*vn+.35*m)};
  }
  const WORD={
    eu:{n:'Steady mood',c:'var(--eu)',sl:'Usual sleep',en:'Usual energy',sp:'Usual pace',th:'Clear and flexible'},
    hypo:{n:'Hypomania',c:'var(--up)',sl:'Needs less sleep',en:'More energy',sp:'Chattier, quicker',th:'Quick, many ideas'},
    mania:{n:'Mania',c:'var(--up)',sl:'Rested on very little',en:'Driven, can’t sit still',sp:'Pressured, hard to interrupt',th:'Racing, jumps topic'},
    mixed:{n:'Mixed features',c:'var(--mixed)',sl:'Little, restless sleep',en:'Agitated and tired',sp:'Fast but tense',th:'Racing and dark'},
    dep:{n:'Depression',c:'var(--down)',sl:'Broken, or too much',en:'Drained',sp:'Slow, few words',th:'Slowed, hard to decide'}};
  const svg=$('#epSvg'),rg=$('#epT'),note=$('#epNote'),read=$('#epRead');
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* one side panel: kind sleep|energy|speech|think in box x,y,w,h */
  function panel(kind,x,y,w,h,S,t){
    const W=WORD[S.ph];let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const title={sleep:'Sleep',energy:'Energy & activity',speech:'Speech',think:'Thinking'}[kind];
    s+=T(x+10,y+16,title,'t-sm','font-weight:600;fill:var(--ink)');
    const word={sleep:W.sl,energy:W.en,speech:W.sp,think:W.th}[kind];
    s+=T(x+10,y+31,word,'t-xs',`fill:${W.c};font-weight:600;font-size:10px`);
    const cx=x+10,cw=w-20,cy=y+36,ch=h-42;
    if(kind==='sleep'){
      const sb=sleepbar(cx+2,cy+8,cw-44,Math.min(16,ch*.32),{sleep:[S.bed%24,S.wake],broken:S.broken,hours:true});
      s+=sb.svg;
      const lb=[[12,'12'],[18,'18'],[0,'00'],[6,'06']];
      lb.forEach(([hr,l])=>{s+=T(sb.X(hr),cy+8+Math.min(16,ch*.32)+13,l,'t-xs t-mid','font-size:8px')});
    }else if(kind==='energy'){
      const val=kind==='energy'?S.energy:0,bw=cw,by=cy+10,bh=Math.min(14,ch*.3);
      s+=`<rect x="${f1(cx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="${f1(bh/2)}" style="fill:var(--panel-2)"/>`;
      const c=S.ph==='dep'?'var(--down-fill)':S.ph==='mixed'?'var(--mixed-fill)':S.ph==='eu'?'var(--eu)':'var(--up-fill)';
      s+=`<rect x="${f1(cx)}" y="${f1(by)}" width="${f1(bw*val)}" height="${f1(bh)}" rx="${f1(bh/2)}" style="fill:${c}"/>`;
      s+=`<line x1="${f1(cx+bw*.5)}" x2="${f1(cx+bw*.5)}" y1="${f1(by-3)}" y2="${f1(by+bh+3)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      s+=T(cx+bw*.5,by+bh+13,'usual','t-xs t-mid','font-size:8px');
      /* a little walking figure whose stride follows energy */
      const px=cx+bw*val,amp=2+val*6,ph=Math.sin(t*WK*7*(.5+val*2))*amp;
      s+=`<g transform="translate(${f1(clamp(px,cx+6,cx+bw-6))} ${f1(by-1)})"><circle cx="0" cy="-12" r="3" style="fill:var(--ink)"/><path d="M0 -9V-3M0 -3L${f1(ph/2)} 1M0 -3L${f1(-ph/2)} 1M0 -7L${f1(-ph/2)} -4M0 -7L${f1(ph/2)} -4" style="stroke:var(--ink);stroke-width:1.4;stroke-linecap:round;fill:none"/></g>`;
    }else if(kind==='speech'){
      const bx=cx,by=cy+2,bw=cw*.62,bh=Math.min(30,ch-10);
      const bc=S.ph==='dep'?'var(--down-soft)':S.ph==='mixed'?'var(--mixed-soft)':S.ph==='eu'?'var(--eu-soft)':'var(--up-soft)';
      s+=`<path d="M${f1(bx+8)} ${f1(by)}H${f1(bx+bw-8)}Q${f1(bx+bw)} ${f1(by)} ${f1(bx+bw)} ${f1(by+8)}V${f1(by+bh-8)}Q${f1(bx+bw)} ${f1(by+bh)} ${f1(bx+bw-8)} ${f1(by+bh)}H${f1(bx+22)}L${f1(bx+12)} ${f1(by+bh+7)}L${f1(bx+14)} ${f1(by+bh)}H${f1(bx+8)}Q${f1(bx)} ${f1(by+bh)} ${f1(bx)} ${f1(by+bh-8)}V${f1(by+8)}Q${f1(bx)} ${f1(by)} ${f1(bx+8)} ${f1(by)}Z" style="fill:${bc};stroke:var(--line)"/>`;
      /* words as dashes: more and shorter gaps when speech is fast */
      const n=Math.round(2+S.speech*12),rr=rng(Math.floor(t*400)+3),rows=2,gap=S.speech>.7?2:5;
      for(let r=0;r<rows;r++){let xx=bx+7;const yy=by+bh*(r+1)/(rows+1);for(let i=0;i<n/rows;i++){const l=4+rr()*9;if(xx+l>bx+bw-6)break;s+=`<line x1="${f1(xx)}" x2="${f1(xx+l)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round;opacity:.65"/>`;xx+=l+gap+(1-S.speech)*8}}
      const wpm=Math.round(lerp(60,260,S.speech));
      s+=T(x+w-10,by+bh*.5+3,'rate','t-xs t-end','font-size:8px');
      s+=`<rect x="${f1(bx+bw+8)}" y="${f1(by+bh*.5+7)}" width="${f1((x+w-10-(bx+bw+8))*S.speech)}" height="5" rx="2.5" style="fill:${W.c};opacity:.7"/>`;
      void wpm;
    }else{
      /* thought bubbles: many fast ones when racing, few slow ones when low */
      const n=Math.round(2+S.think*9),rr=rng(5),sp=.4+S.think*3;
      const hx=cx+12,hy=cy+ch*.55;
      s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="9" style="fill:var(--panel-2);stroke:var(--brain-line)"/><path d="M${f1(hx-6)} ${f1(hy+8)}Q${f1(hx)} ${f1(hy+16)} ${f1(hx+6)} ${f1(hy+8)}" style="fill:var(--panel-2);stroke:var(--brain-line)"/>`;
      for(let i=0;i<n;i++){const ph=(rr()+t*WK*sp*.6)%1,ang=rr()*1.4-.7,dist=14+ph*(cw-34);
        const px=hx+dist*Math.cos(ang*.6),py=hy-8+Math.sin(ang)*ch*.35*(.3+ph*.7)-ph*4;
        if(px>x+w-8)continue;
        const c=S.ph==='dep'?'var(--down-fill)':S.ph==='mixed'?'var(--mixed-fill)':S.ph==='eu'?'var(--eu)':'var(--up-fill)';
        s+=`<circle cx="${f1(px)}" cy="${f1(clamp(py,cy+4,y+h-6))}" r="${f1(2+S.think*1.5+(1-ph)*1.5)}" style="fill:${c};opacity:${f1(.35+(1-ph)*.55)}"/>`}
    }
    return s;
  }
  function meter(x,y,w,wk){
    const E=EPIS.find(e=>wk>=e.a&&wk<=e.b+.01),past=EPIS.filter(e=>wk>e.b);
    let s='';
    if(!E){
      const lbl=past.length?'Between episodes: mood back in the steady band':'No episode: mood in the steady band';
      s+=T(x,y+11,lbl,'t-sm','fill:var(--eu);font-weight:600');
      s+=T(x,y+28,past.length?`Episodes so far: ${past.map(e=>e.n.replace(' episode','')).join(' → ')}`:'Scrub or press Play to follow the course','t-xs');
      return s;
    }
    const days=(wk-E.a)*7,span=Math.max(E.min*1.6,24),bw=w-150;
    const X=d=>x+bw*clamp(d/span);
    s+=T(x,y+11,`${E.n} · day ${Math.max(1,Math.floor(days)+1)}`,'t-sm',`fill:${E.col};font-weight:600`);
    s+=`<rect x="${f1(x)}" y="${f1(y+18)}" width="${f1(bw)}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y+18)}" width="${f1(X(days)-x)}" height="10" rx="5" style="fill:${E.fill};opacity:.85"/>`;
    s+=`<line x1="${f1(X(E.min))}" x2="${f1(X(E.min))}" y1="${f1(y+14)}" y2="${f1(y+32)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    s+=T(X(E.min),y+43,`DSM-5-TR minimum: ${E.min} days`,'t-xs t-mid');
    const met=days>=E.min;
    s+=T(x+bw+12,y+27,met?'✓ long enough':'not yet',`t-sm`,`fill:${met?'var(--good)':'var(--muted)'};font-weight:600`);
    return s;
  }
  function draw(t){
    const N=vb(svg,'720 420','400 636');
    const wk=t*WK,S=state(wk),W=WORD[S.ph];
    let s=`<defs>${marker('epAr','var(--muted)')}</defs>`;
    const C=N?{x:40,y:40,w:344,h:220}:{x:40,y:38,w:420,h:264};
    s+=T(C.x-30,22,`Week ${f1(wk)}`,'t-lbl');
    s+=T(C.x+C.w,22,W.n,'t-big t-end',`fill:${W.c}`);
    const lc=lifechart(C.x,C.y,C.w,C.h,f,{upto:t,id:'epLc',labels:true,dot:true,mixed:t*WK>=MIX[0]?[[U(MIX[0]),U(Math.min(MIX[1],wk))]]:[]});
    s+=lc.svg;
    /* episode brackets above the chart for finished or current episodes */
    EPIS.forEach(E=>{if(wk<E.a)return;const x0=lc.X(U(E.a)),x1=lc.X(U(Math.min(E.b,wk)));
      const yy=E.k==='dep'?C.y+C.h+4:C.y-4,d=E.k==='dep'?4:-4;
      s+=`<path d="M${f1(x0)} ${f1(yy-d)}V${f1(yy)}H${f1(x1)}${wk>=E.b?`V${f1(yy-d)}`:''}" style="fill:none;stroke:${E.col};stroke-width:1.4"/>`});
    const ax=tline(C.x,C.y+C.h+16,C.w,{min:0,max:WK,step:N?6:4,label:'weeks'});
    s+=ax.svg;
    /* tags on the chart for the thresholds once reached */
    EPIS.forEach(E=>{const met=E.a+E.min/7;if(wk<met)return;const [px,py]=lc.at(U(met));
      s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.5" style="fill:var(--panel);stroke:${E.col};stroke-width:1.6"/>`;
      const lbl=E.k==='dep'?'day 14':E.k==='mania'?'day 7':'day 4';
      s+=T(px+6,py+(E.k==='dep'?14:-6),lbl,'t-xs',`fill:${E.col};font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px`)});
    const my=N?C.y+C.h+52:C.y+C.h+52;
    s+=meter(C.x,my,N?C.w:C.w+250,wk);
    /* side panels */
    if(N){const px=12,py=my+60,pw=184,ph=124,g=8;
      s+=panel('sleep',px,py,pw,ph,S,t)+panel('energy',px+pw+g,py,pw,ph,S,t)+panel('speech',px,py+ph+g,pw,ph,S,t)+panel('think',px+pw+g,py+ph+g,pw,ph,S,t);
    }else{const px=488,pw=224,ph=90,g=6,py=30;
      ['sleep','energy','speech','think'].forEach((k,i)=>{s+=panel(k,px,py+i*(ph+g),pw,ph,S,t)});
    }
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);setA(i);note.innerHTML=noteHTML(STEPS[i]);
    read.innerHTML=`<span>Week <b>${f1(wk)}</b></span><span>State <b>${W.n}</b></span><span>Sleep <b>${W.sl.toLowerCase()}</b></span><span>Speech <b>${W.sp.toLowerCase()}</b></span>`;
  }
  const stop=playWire(rg,$('#epPlay'),draw,16000,'Replay','episodes');
  const setA=stepWire($('#epSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- symptom sorter ---------- */
  const CARDS=[
    {s:'Feels rested after only a few hours of sleep',a:'m',why:`Decreased need for sleep is a Criterion B symptom of mania and hypomania. In a major depressive episode the sleep symptom is insomnia or sleeping too much. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Talks much more than usual, hard to interrupt',a:'m',why:`More talkative than usual, or pressure to keep talking, is one of the 7 manic/hypomanic symptoms. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Thoughts racing, jumping from topic to topic',a:'m',why:`Flight of ideas, or the experience that thoughts are racing, is a manic/hypomanic symptom. In depression thinking slows and decisions get hard. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Feels unusually important, special or gifted',a:'m',why:`Inflated self-esteem or grandiosity is a manic/hypomanic symptom; grandiose delusions are the commonest psychotic symptom in bipolar disorder. <sup class="c" data-ref="APA2022,Dunayevich2000" title="Source 15,113">15,113</sup>`},
    {s:'Spending sprees or risky ventures out of character',a:'m',why:`Excessive involvement in activities with a high potential for painful consequences is a manic/hypomanic symptom. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Lost interest or pleasure in almost everything',a:'d',why:`Markedly diminished interest or pleasure is one of the two core symptoms of a major depressive episode (the other is depressed mood). <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Feels worthless or weighed down by guilt',a:'d',why:`Feelings of worthlessness or excessive guilt are a major depressive symptom. Guilt was also commoner in mixed than in pure mania. <sup class="c" data-ref="APA2022,Cassidy1998" title="Source 15,70">15,70</sup>`},
    {s:'Exhausted, no energy even for small tasks',a:'d',why:`Fatigue or loss of energy is a major depressive symptom. In mania and hypomania, energy and activity are increased: that is part of Criterion A. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Appetite or weight changes noticeably',a:'d',why:`Significant weight or appetite change is one of the 9 major depressive symptoms. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Irritable, snapping at people',a:'b',why:`Irritable mood can carry a manic or hypomanic episode (then 4 rather than 3 B symptoms are needed), and irritability was prominent in mania and more common in mixed mania. It turns up in depression too. <sup class="c" data-ref="APA2022,Cassidy1998" title="Source 15,70">15,70</sup>`},
    {s:'Easily distracted, cannot focus on one thing',a:'b',why:`Distractibility is a manic/hypomanic symptom, and a diminished ability to think, concentrate or decide is a depressive one. Same experience, both poles. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:'Restless, pacing, cannot sit still',a:'b',why:`Psychomotor agitation is listed for mania (with increased goal-directed activity) and for major depression (agitation or slowing). Agitation alongside low mood is a classic picture of a mixed state. <sup class="c" data-ref="APA2022,Yatham2018,Cassidy1998" title="Source 15,70,525">15,70,525</sup>`}
  ];
  const ZN={m:'Mania / hypomania',d:'Depression',b:'Both'};
  const pool=$('#epPool'),zones={m:$('#epZm'),d:$('#epZd'),b:$('#epZb')},score=$('#epScore');
  const ans=store.get('epSort',{});
  /* shuffled once, in a fixed order so the page is the same each visit */
  const order=CARDS.map((c,i)=>i).sort((a,b)=>((a*7+3)%12)-((b*7+3)%12));
  const cardEl={};
  order.forEach(i=>{const c=CARDS[i],el=document.createElement('div');el.className='ep-card';el.draggable=true;el.dataset.i=i;
    el.innerHTML=`<b>${c.s}</b><div class="ep-opts" role="group" aria-label="Where does it belong?">${['m','d','b'].map(z=>`<button type="button" data-ez="${z}" aria-pressed="false">${ZN[z]}</button>`).join('')}</div><p class="ep-fb"></p>`;
    cardEl[i]=el;pool.appendChild(el)});
  function place(i,z,save=true){const el=cardEl[i],c=CARDS[i];
    if(!z){delete ans[i];pool.appendChild(el);el.classList.remove('ok','no');$('.ep-fb',el).innerHTML='';$$('[data-ez]',el).forEach(b=>b.setAttribute('aria-pressed','false'))}
    else{ans[i]=z;zones[z].appendChild(el);const ok=z===c.a;el.classList.toggle('ok',ok);el.classList.toggle('no',!ok);
      $$('[data-ez]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.ez===z?'true':'false'));
      $('.ep-fb',el).innerHTML=(ok?'<b>Yes.</b> ':`<b>Not quite: mostly ${ZN[c.a].toLowerCase()}.</b> `)+c.why}
    if(save)store.set('epSort',ans);tally()}
  function tally(){const k=Object.keys(ans),ok=k.filter(i=>ans[i]===CARDS[i].a).length;
    score.textContent=k.length?`${k.length} of 12 sorted · ${ok} correct`:'0 of 12 sorted'}
  $('#epSort').addEventListener('click',e=>{const b=e.target.closest('[data-ez]');if(!b)return;const el=b.closest('.ep-card');place(+el.dataset.i,b.dataset.ez)});
  let dragI=null;
  $('#epSort').addEventListener('dragstart',e=>{const el=e.target.closest&&e.target.closest('.ep-card');if(!el)return;dragI=+el.dataset.i;try{e.dataTransfer.setData('text/plain',String(dragI));e.dataTransfer.effectAllowed='move'}catch(_){}});
  Object.entries(zones).forEach(([z,el])=>{
    el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('over')});
    el.addEventListener('dragleave',()=>el.classList.remove('over'));
    el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('over');if(dragI!=null)place(dragI,z);dragI=null})});
  $('#epReveal').addEventListener('click',()=>{CARDS.forEach((c,i)=>place(i,c.a,false));store.set('epSort',ans)});
  $('#epReset').addEventListener('click',()=>{order.forEach(i=>place(i,null,false));store.set('epSort',{})});
  Object.keys(ans).forEach(i=>{if(CARDS[i]&&zones[ans[i]])place(+i,ans[i],false)});tally();

  /* ---------- weeks waffle ---------- */
  const WD={
    1:{n:'Bipolar I',parts:[['Depressive symptoms',31.9,'var(--down-fill)'],['Manic or hypomanic',8.9,'var(--up-fill)'],['Cycling or mixed',5.9,'var(--mixed-fill)']],any:47.3,src:'Judd2002',
       note:{k:'NIMH CDS · 146 people · mean 12.8 years',t:'Bipolar I: lows outweigh highs',txt:`People with bipolar I had symptoms in 47.3% of weeks: depressive symptoms in 31.9%, manic or hypomanic in 8.9% and cycling or mixed in 5.9%. Milder, subsyndromal symptoms (29.9% of weeks) were nearly three times as common as full episodes (11.2%), and symptom status changed about 6 times a year. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>`,
        pt:`Even in bipolar I, which is defined by mania, people spend roughly three to four times as many weeks low as high.`,hook:`Judd 2002 (BP-I): 47.3% of weeks symptomatic; depressive 31.9% vs manic/hypomanic 8.9%. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>`}},
    2:{n:'Bipolar II',parts:[['Depressive symptoms',50.3,'var(--down-fill)'],['Hypomanic',1.3,'var(--up-fill)'],['Cycling or mixed',2.3,'var(--mixed-fill)']],any:53.9,src:'Judd2003',
       note:{k:'NIMH CDS · 86 people · mean 13.4 years',t:'Bipolar II: depression dominates',txt:`People with bipolar II had symptoms in 53.9% of weeks: depressive symptoms in 50.3%, hypomanic in only 1.3% and cycling or mixed in 2.3%. People with brief hypomanias (2–6 days) did not differ on any measure from those whose hypomanias lasted 7 days or more. CANMAT calls the idea of bipolar II as a "less severe form" discredited. <sup class="c" data-ref="Judd2003,Yatham2018" title="Source 247,525">247,525</sup>`,
        pt:`Bipolar II is not "bipolar lite". Its lows can be just as heavy and long as those in bipolar I.`,hook:`Judd 2003 (BP-II): 50.3% of weeks depressive vs 1.3% hypomanic. Depression is the main burden in both types. <sup class="c" data-ref="Judd2003,McIntyre2020Lancet" title="Source 247,320">247,320</sup>`}}};
  const wsvg=$('#epWeeks'),wnote=$('#epWNote');let wk=1,stopW=null;
  function drawW(p){
    const N=vb(wsvg,'720 300','400 470'),D=WD[wk];
    const cells=[];D.parts.forEach(([n,v,c])=>{for(let i=0;i<Math.round(v);i++)cells.push(c)});
    while(cells.length<100)cells.push('none');
    const cs=N?22:22,g=3,gx=N?(400-10*(cs+g))/2:30,gy=N?36:40;
    let s=T(N?gx:gx,22,`${D.n}: 100 squares = all follow-up weeks`,'t-lbl');
    const shown=Math.round(100*p);
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,x=gx+c*(cs+g),y=gy+r*(cs+g);const col=cells[i];
      const on=i<shown&&col!=='none';
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${cs}" height="${cs}" rx="4" style="fill:${on?col:'var(--panel-2)'};stroke:${col==='none'&&i<shown?'var(--eu)':'none'};stroke-width:1.2"/>`}
    /* legend with counters */
    const lx=N?20:gx+10*(cs+g)+40,ly=N?gy+10*(cs+g)+26:gy+20;
    const rows=D.parts.concat([['No symptoms',+(100-D.any).toFixed(1),'var(--panel-2)']]);
    let acc=0;
    rows.forEach(([n,v,c],i)=>{const yy=ly+i*(N?28:44),start=acc;acc+=Math.round(v);
      const frac=clamp((shown-start)/Math.max(1,Math.round(v))),val=i<rows.length-1?v*frac:v*clamp((p-.9)*10);
      s+=`<rect x="${f1(lx)}" y="${f1(yy-11)}" width="14" height="14" rx="3" style="fill:${c};stroke:${i===rows.length-1?'var(--eu)':'none'}"/>`;
      s+=T(lx+22,yy,n,'t-lbl');
      s+=T(lx+(N?250:300),yy,`${f1(val)}%`,'t-big t-end');
      if(!N){const bw=200;s+=`<rect x="${f1(lx+22)}" y="${f1(yy+8)}" width="${bw}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(lx+22)}" y="${f1(yy+8)}" width="${f1(bw*val/60)}" height="6" rx="3" style="fill:${c==='var(--panel-2)'?'var(--eu)':c}"/>`}
    });
    s+=T(lx,ly+rows.length*(N?28:44)+(N?0:-6),`Weeks with any symptoms: ${D.any}%`,'t-sm','fill:var(--ink);font-weight:600');
    wsvg.innerHTML=s;wnote.innerHTML=noteHTML(D.note);
  }
  function runW(){stopW&&stopW();stopW=animate(1400,p=>drawW(ease(p)),()=>{stopW=null})}
  $$('[data-ew]').forEach(b=>b.addEventListener('click',()=>{wk=+b.dataset.ew;$$('[data-ew]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));runW()}));
  drawW(1);
  onShow.episodes=()=>{};
  {const prev=onHide.episodes;onHide.episodes=()=>{prev&&prev();stopW&&stopW()}}
  {const prevR=redraws.episodes;redraws.episodes=()=>{prevR&&prevR();drawW(1)}}
};
/* =============== 1.3 Genes & family risk =============== */
/* The family scrubber: each step changes who in the tree is affected and what the
   panel beside it shows (an icon array for absolute risks, bars for relative risks
   and heritability). Every number is a published population figure. */
const GE_STEPS=[
 {from:0,at:.08,k:'Step 1 · no one affected',t:'The general population',aff:{},mode:'pct',val:.48,cap:'child of two unaffected parents',sub:'by age 52 · Danish register',
  txt:`In the WHO World Mental Health surveys of 61,392 adults in 11 countries, lifetime prevalence was 0.6% for bipolar I, 0.4% for bipolar II and 2.4% for the whole bipolar spectrum, including subthreshold forms. In the Danish register of 2.7 million people, children with neither parent admitted with bipolar disorder had a cumulative incidence of 0.48% by age 52: about 1 in 200. <sup class="c" data-ref="Merikangas2011,Gottesman2010" title="Source 189,329">189,329</sup>`,
  pt:`About 1 adult in 100 has bipolar I or II at some point in life. In a family where no one is affected, a child's risk is lower still.`,
  hook:`Population baseline (WMH surveys): bipolar I 0.6%, bipolar II 0.4%, whole spectrum 2.4%. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>`},
 {from:.17,at:.25,k:'Step 2 · a brother has it',t:'One first-degree relative',aff:{sib:1},pro:'sib',mode:'rr',
  txt:`Risk rises several-fold when a brother or sister has bipolar disorder, and falls with genetic distance. In the Swedish multi-generation register (40,487 probands), the relative risk was 7.9 for full siblings, 4.5 for maternal half-siblings and 2.4 for paternal half-siblings; shared family environment explained only 3.4% of liability. A Danish cohort of 2.1 million found a 13.63-fold risk with any affected first-degree relative. A relative risk multiplies a small baseline, so the absolute risk stays well below one in two. <sup class="c" data-ref="Lichtenstein2009,Mortensen2003" title="Source 297,354">297,354</sup>`,
  pt:`A brother or sister with bipolar disorder raises your risk several times over, but from a low starting point.`,
  hook:`First-degree relatives: relative risk about 6–14 (Sweden 5.8–7.9; Denmark 13.63). <sup class="c" data-ref="Song2015Family,Mortensen2003" title="Source 354,466">354,466</sup>`},
 {from:.34,at:.42,k:'Step 3 · a parent has it',t:'A parent with bipolar disorder',aff:{f:1},pro:'f',mode:'pct',val:4.4,cap:'child of one affected parent',sub:'by age 52 · 23,152 offspring · Denmark',
  txt:`In Danish registers, cumulative incidence of bipolar disorder by age 52 was 4.4% in 23,152 people with one parent admitted with bipolar disorder, against 0.48% with neither. A meta-analysis of 211 family high-risk and registry studies gave a relative risk of 5.1 and a lifetime risk of 5% for bipolar disorder itself, but 55% for any mental disorder; 96% of its studies were at high risk of bias. In Sweden, a mother's and a father's illness predicted offspring bipolar disorder equally. <sup class="c" data-ref="Gottesman2010,Uher2023,Kendler2026Mating" title="Source 189,258,496">189,258,496</sup>`,
  pt:`If one parent has bipolar disorder, about 4 or 5 children in 100 develop it. Most stay well, though other mood and anxiety problems are more common, so it is worth knowing the early signs.`,
  hook:`One affected parent: 4.4% by age 52 in Denmark; about 5% lifetime in a 2023 meta-analysis. <sup class="c" data-ref="Gottesman2010,Uher2023" title="Source 189,496">189,496</sup>`},
 {from:.5,at:.58,k:'Step 4 · both parents',t:'Both parents affected',aff:{f:1,m:1},pro:'f',mode:'pct',val:24.9,cap:'child of two affected parents',sub:'by age 52 · 146 offspring · Denmark',
  txt:`With both parents admitted with bipolar disorder (146 offspring of 83 couples), cumulative incidence by age 52 was 24.9%, or 36.0% if unipolar depression is counted, and 44.2% had some psychiatric disorder. In Sweden, the hazard ratio for offspring bipolar I rose from 5.59 with one affected parent to 13.61 with two. <sup class="c" data-ref="Gottesman2010,Kendler2026Mating" title="Source 189,258">189,258</sup>`,
  pt:`When both parents are affected the risk is about 1 in 4. Three children in four still do not develop bipolar disorder.`,
  hook:`Two affected parents: 24.9% by age 52 (36.0% counting unipolar depression). <sup class="c" data-ref="Gottesman2010" title="Source 189">189</sup>`},
 {from:.67,at:.75,k:'Step 5 · an identical twin',t:'An identical co-twin',aff:{sib:1},pro:'sib',twin:1,mode:'pct',val:43,cap:'identical (MZ) co-twin, bipolar I',sub:'non-identical (DZ) co-twin: 6% · Finland',
  txt:`Identical (monozygotic) twins share all their DNA. In a nationwide Finnish twin sample, probandwise concordance for bipolar I was 0.43 in monozygotic and 0.06 in dizygotic twins (heritability 0.93). An older Danish study, which grouped unipolar and bipolar forms together, found 0.67 and 0.20. A concordance well below 1 in identical twins means that non-genetic factors matter too. <sup class="c" data-ref="Kieseppa2004,Bertelsen1977" title="Source 45,278">45,278</sup>`,
  pt:`Even an identical twin, with the very same genes, more often than not does not develop bipolar I.`,
  hook:`Bipolar I concordance: MZ 0.43 vs DZ 0.06 (Finland). <sup class="c" data-ref="Kieseppa2004" title="Source 278">278</sup>`},
 {from:.84,at:.93,k:'Step 6 · the whole picture',t:'Risk, not destiny',aff:{gf:1,au:.5},pro:'gf',mode:'h2',
  txt:`Twin studies put heritability at about 60–85%; whole-population Swedish registers at 58–59%; common variants measured in GWAS explain about 16–23%. Illness can appear to skip a generation, and an aunt's depression shares part of the same liability: the genetic correlation with major depression is about 0.44–0.47. In Swedish registers, family genetic risk and environmental exposures each added to risk rather than one explaining the other. <sup class="c" data-ref="Mullins2021,Lichtenstein2009,Song2015Family,Stahl2019,PGCCDG2013NatGenet,Robinson2026FGRS" title="Source 297,355,411,431,466,470">297,355,411,431,466,470</sup>`,
  pt:`Genes raise the odds; they do not settle the outcome. Many people with an affected relative never develop bipolar disorder.`,
  hook:`Heritability about 60–85%, but shared family environment only about 3–4% of liability. <sup class="c" data-ref="Mullins2021,Lichtenstein2009" title="Source 297,355">297,355</sup>`}
];
const GE_RR=[['Paternal half-sibling',2.4],['Maternal half-sibling',4.5],['Full sibling',7.9],['Any first-degree relative (Denmark)',13.63]];
const GE_H2=[['UK twins 2003',85,'h'],['Finnish twins 2004',93,'h'],['Norwegian twins 2008',73,'h'],['Swedish twins 2019',60.4,'h'],['Swedish families 2009',59,'h'],['Common SNPs (GWAS) 2021',18.6,'s'],['Shared family environment',3.4,'e']];
const GE_LAD=[[0,.48,'0.48%','no affected parent'],[2,4.4,'4.4%','one parent'],[3,24.9,'24.9%','both parents'],[4,43,'43%','MZ co-twin']];

/* GWAS waves */
const GE_GW=[
 {y:2008,cases:4387,loci:1,k:'2008 · 4,387 cases',t:'The first hits: ANK3 and CACNA1C',
  txt:`The first collaborative genome-wide association study (4,387 cases, 6,209 controls) found genome-wide association at <b>ANK3</b>, which encodes ankyrin G (P = 9.1 × 10⁻⁹), and support for <b>CACNA1C</b>, an L-type calcium-channel subunit (P = 7.0 × 10⁻⁸, just short of the 5 × 10⁻⁸ line). The authors suggested a role for ion-channel dysfunction. <sup class="c" data-ref="Ferreira2008" title="Source 144">144</sup>`,
  pt:`Scientists scan the whole genome for spots where people with bipolar disorder differ slightly, on average, from people without it. A dot above the dashed line is a confident finding.`,
  hook:`ANK3 (ankyrin G) and CACNA1C (L-type calcium channel α1C): the classic first bipolar GWAS genes. <sup class="c" data-ref="Ferreira2008" title="Source 144">144</sup>`},
 {y:2011,cases:11974,loci:null,k:'2011 · 11,974 cases',t:'Calcium channels confirmed',
  txt:`The first Psychiatric GWAS Consortium analysis (11,974 cases, 51,792 controls) confirmed CACNA1C and found a new variant in <b>ODZ4</b> (now called TENM4); a pathway of calcium-channel subunits was enriched. A five-disorder study then found CACNA1C and CACNB2 with effects shared across psychiatric disorders. <sup class="c" data-ref="PGCBD2011,PGCCDG2013Lancet" title="Source 408,410">408,410</sup>`,
  pt:`With more people in the study, weaker signals rise above the line.`,
  hook:`ODZ4 (TENM4) joined CACNA1C in 2011; calcium-channel signalling recurs across psychiatric disorders. <sup class="c" data-ref="PGCBD2011,PGCCDG2013Lancet" title="Source 408,410">408,410</sup>`},
 {y:2019,cases:29764,loci:30,k:'2019 · PGC2',t:'30 loci',
  txt:`Stahl and colleagues studied 20,352 cases and 31,358 controls, with follow-up in 9,412 cases and 137,760 controls: 30 genome-wide significant loci, 20 of them new. Implicated genes encode ion channels such as <b>SCN2A</b>, neurotransmitter receptors such as <b>GRIN2A</b>, transporters and synaptic components. SNP-heritability was 0.17–0.23, and about twice as high for bipolar I (0.25) as bipolar II (0.11). <span class="ev hyp">Hypothesis</span> The calcium-channel findings renewed interest in calcium-channel blockers as treatments. <sup class="c" data-ref="Stahl2019" title="Source 470">470</sup>`,
  pt:`Each spot nudges risk up only a tiny amount. It takes very large studies to find them.`,
  hook:`PGC2 (2019): 30 loci; SNP-heritability 17–23%; bipolar I about twice bipolar II. <sup class="c" data-ref="Stahl2019" title="Source 470">470</sup>`},
 {y:2021,cases:41917,loci:64,k:'2021 · PGC3',t:'64 loci and drug targets',
  txt:`Mullins and colleagues studied 41,917 cases and 371,549 controls of European ancestry and found 64 loci, including CACNA1C, ANK3, ODZ4, SCN2A and <b>SHANK2</b>. Risk alleles were enriched in synaptic-signalling genes and in neurons of the prefrontal cortex and hippocampus, and in genes encoding targets of antipsychotics, calcium-channel blockers, antiepileptics and anaesthetics. <span class="ev hyp">Hypothesis</span> Fifteen expression-linked genes, such as HTR6, MCHR1, DCLK3 and FURIN, are offered as new treatment leads. Bipolar I and II correlated genetically at 0.85. <sup class="c" data-ref="Mullins2021" title="Source 355">355</sup>`,
  pt:`The genes point at the connections between nerve cells, and at the targets of medicines already in use.`,
  hook:`PGC3 (2021): 64 loci from 41,917 cases; enriched for synaptic signalling and existing drug targets. <sup class="c" data-ref="Mullins2021" title="Source 355">355</sup>`},
 {y:2025,cases:158036,loci:298,k:'2025 · four ancestries',t:'298 loci',
  txt:`O'Connell and colleagues studied 158,036 cases and about 2.8 million controls of European, East Asian, African American and Latino ancestry from 79 cohorts: 298 loci, a fourfold increase, one specific to East Asian ancestry. Fine-mapping gave 36 credible genes, 8 with synaptic roles, such as <b>CACNA1B</b>, SHANK2, <b>ERBB4</b> and <b>SORCS3</b>, and implicated GABAergic interneurons and medium spiny neurons. Even so, the 298 loci hold only 18.5% of the SNP-heritability (8.3% for the earlier 64). Self-reported diagnosis correlated only 0.47 with clinical cases. <sup class="c" data-ref="OConnell2025" title="Source 387">387</sup>`,
  pt:`Hundreds of spots are now known. Together they still explain only a small part of the genetic risk.`,
  hook:`2025: 298 loci from 158,036 multi-ancestry cases, holding 18.5% of SNP-heritability. <sup class="c" data-ref="OConnell2025" title="Source 387">387</sup>`},
 {y:2025,cases:158036,loci:298,prs:1,k:'Polygenic scores',t:'Why a score cannot diagnose',
  txt:`A polygenic score adds up a person's risk alleles. In 2021 it explained about 4.57% of liability (AUC 65%), and the top decile had an odds ratio of 3.5 against the middle decile. In 2025 the top quintile had an odds ratio of 7.06 against the middle, with a median AUC of 0.70; the authors judged the liability explained "insufficient for diagnostic prediction in the general population". <span class="ev early">Early evidence</span> In 227 high-risk offspring, adding the score to a clinical risk calculator raised the AUC to 0.81. Evidence is weaker in non-European ancestries. <sup class="c" data-ref="Mullins2021,OConnell2025,Hafeman2025,LewisVassos2020" title="Source 199,295,355,387">199,295,355,387</sup>`,
  pt:`The two groups' scores overlap so much that a score cannot tell whether one person has, or will get, bipolar disorder.`,
  hook:`PRS: AUC about 0.65–0.70. A research tool, never a diagnosis on its own. <sup class="c" data-ref="OConnell2025,Murray2021PRS" title="Source 360,387">360,387</sup>`}
];
GE_GW.forEach((s,i)=>{s.from=[0,.16,.32,.48,.64,.82][i];s.at=s.from+.12});
/* approximate chromosome lengths (Mb), for a proportional x axis */
const GE_CHR=[248,242,198,190,181,171,159,145,138,134,135,133,114,107,102,90,83,80,59,64,47,51];
/* named loci: chromosome, position along it (approximate), first wave above the line, label row */
const GE_NAMED=[{g:'ANK3',c:10,p:.45,w:0},{g:'CACNA1C',c:12,p:.04,w:1,pre:7.15},{g:'ODZ4',c:11,p:.72,w:1},{g:'SCN2A',c:2,p:.68,w:2},{g:'GRIN2A',c:16,p:.12,w:2},{g:'SHANK2',c:11,p:.52,w:3},{g:'ERBB4',c:2,p:.86,w:4},{g:'CACNA1B',c:9,p:.97,w:4},{g:'SORCS3',c:10,p:.78,w:4}];
const GE_FX={
 fam:{n:'Parent with bipolar disorder',s:'parent',d:.62,ev:'est',
  txt:`Children of one parent with bipolar disorder: 4.4% by age 52 in Denmark; a relative risk of 5.1 in a meta-analysis. Genes set where a person starts on the scale. <sup class="c" data-ref="Gottesman2010,Uher2023" title="Source 189,496">189,496</sup>`},
 adv:{n:'Childhood adversity',s:'adversity',d:.36,ev:'est',
  txt:`Childhood adversity was 2.63 times more likely in people with bipolar disorder than in non-clinical controls (emotional abuse OR 4.04), but similar to other psychiatric patients, so it is not specific. In people with bipolar disorder, maltreatment goes with earlier onset (OR 1.85) and rapid cycling (OR 1.89), one reason trauma-informed care matters. <sup class="c" data-ref="PalmierClaus2016,AgnewBlais2016Lancet" title="Source 3,396">3,396</sup>`},
 can:{n:'Cannabis use',s:'cannabis',d:.3,ev:'early',
  txt:`Cannabis use was associated with about 3-fold odds of new-onset manic symptoms (OR 2.97; 2 studies, called preliminary), and cannabis use disorder with later bipolar disorder (HR 2.96 in men, 2.54 in women). Mendelian randomisation suggests genetic liability to bipolar disorder raises cannabis use, so the direction is unresolved. <sup class="c" data-ref="Gibbs2015,Jefsen2023,Jefsen2021" title="Source 172,238,239">172,238,239</sup>`},
 slp:{n:'Sleep loss',s:'sleep loss',d:.42,ev:'hyp',
  txt:`Sleep loss has been proposed as a "final common pathway" to mania, and mania cuts sleep further, so the loop can feed itself. In 3,140 people with bipolar disorder, sleep loss triggering a high mood was reported more often in bipolar I (OR 2.81) and by women (OR 1.43); the authors flag shift work and international travel as times to plan for. <sup class="c" data-ref="Wehr1987,Lewis2017Sleep" title="Source 294,516">294,516</sup>`},
 pp:{n:'The weeks after birth',s:'postpartum',d:.52,ev:'est',
  txt:`First-time mothers' risk of psychiatric admission peaked 10–19 days after birth (RR 7.31); fathers had no increase. About half of pregnancies in women with bipolar I were followed by a perinatal mood episode. These are population figures for planning with a care team: see <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; the postpartum period</a>. <sup class="c" data-ref="MunkOlsen2006,DiFlorio2013" title="Source 107,358">107,358</sup>`}
};
const GE_EVL={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};

inits.genes=()=>{
  /* ================= family tree ================= */
  const svg=$('#geSvg'),rg=$('#geT');let stop=()=>{};
  const ink='var(--ink)';
  function tree(ox,oy,S,P,lp){
    const r=11,X=x=>f1(ox+x),Y=y=>f1(oy+y),ln=(a,b,c,d)=>`<line x1="${X(a)}" y1="${Y(b)}" x2="${X(c)}" y2="${Y(d)}" style="stroke:${ink};stroke-width:1.4"/>`;
    const tw=!!S.twin;let s='';
    /* generation labels */
    [['I',60],['II',150],['III',250]].forEach(([g,y])=>{s+=`<text x="${X(14)}" y="${Y(y+4)}" class="t-xs">${g}</text>`});
    s+=ln(111,60,179,60)+ln(145,60,145,108)+ln(70,108,190,108)+ln(70,108,70,139)+ln(190,108,190,139);
    s+=ln(201,150,259,150)+ln(230,150,230,205);
    if(tw){s+=ln(230,205,190,239)+ln(230,205,270,239)+ln(211,222,249,222)}
    else s+=ln(190,205,270,205)+ln(190,205,190,239)+ln(270,205,270,239);
    const who=[['gf',100,60,'m','grandfather'],['gm',190,60,'f','grandmother'],['au',70,150,'f','aunt'],['f',190,150,'m','father'],['m',270,150,'f','mother'],['sib',270,250,tw?'f':'m',tw?'identical twin':'brother']];
    who.forEach(([id,x,y,sx,lab])=>{const a1=S.aff[id]||0,a0=P.aff[id]||0,pro=S.pro===id;
      s+=ped(ox+x,oy+y,sx,a0,{r});
      if(a1!==a0)s+=`<g style="opacity:${f1(lp)}">${ped(ox+x,oy+y,sx,a1,{r})}</g>`;
      if(pro)s+=`<g style="opacity:${f1(ramp(lp,.3,.9))}">${ped(ox+x,oy+y,sx,a1,{r,proband:1})}</g>`;
      s+=`<text x="${X(x+6)}" y="${Y(y+32)}" class="t-xs t-mid">${lab}</text>`});
    /* the person whose risk the panel shows */
    s+=`<circle cx="${X(190)}" cy="${Y(250)}" r="17" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:3 3"/>`+ped(ox+190,oy+250,'f',0,{r})+`<text x="${X(190)}" y="${Y(255)}" class="t-lbl t-mid" style="fill:var(--accent)">?</text><text x="${X(190)}" y="${Y(278)}" class="t-xs t-mid" style="fill:var(--accent)">you</text>`;
    return s}
  function legend(ox,oy,w){const items=[['full','bipolar disorder'],['half','another mood disorder'],['q','the person asking'],['arr','first affected relative']];
    let s='',x=ox,y=oy;items.forEach(([k,l],i)=>{const cw=l.length*5.9+34;if(x+cw>ox+w){x=ox;y+=20}
      if(k==='full')s+=ped(x+7,y,'m',1,{r:6});else if(k==='half')s+=ped(x+7,y,'f',.5,{r:6});
      else if(k==='q')s+=`<circle cx="${f1(x+7)}" cy="${f1(y)}" r="7" style="fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 2"/><text x="${f1(x+7)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">?</text>`;
      else s+=`<path d="M${f1(x)} ${f1(y+6)}L${f1(x+12)} ${f1(y-5)}" style="stroke:${ink};stroke-width:1.5" marker-end="url(#pedArrow)"/>`;
      s+=`<text x="${f1(x+19)}" y="${f1(y+3.5)}" class="t-xs">${l}</text>`;x+=cw});return s}
  function icons(x,y,v,cell){let s='';const n=Math.floor(v),fr=v-n;
    for(let i=0;i<100;i++){const cx=x+(i%10)*cell,cy=y+Math.floor(i/10)*cell*1.08;
      s+=person(cx+cell/2,cy,cell*.82,i<n?'var(--brand)':'var(--muted)',{op:i<n?1:.3});
      if(i===n&&fr>.02)s+=`<g style="opacity:${f1(.25+fr*.75)}">${person(cx+cell/2,cy,cell*.82,'var(--brand)')}</g>`}
    return s}
  function panel(ox,oy,W,S,i,lp,t,N){
    let s=`<text x="${f1(ox)}" y="${f1(oy+14)}" class="t-sm" style="fill:var(--accent)">${S.mode==='pct'?'RISK FOR THE PERSON MARKED ?':S.mode==='rr'?'RISK COMPARED WITH THE POPULATION':'HOW MUCH IS GENETIC?'}</text>`;
    const g=ease(lp);
    if(S.mode==='pct'){const v=S.val*g,txt=S.val<1?v.toFixed(2):S.val<30?f1(v):Math.round(v);
      s+=`<text x="${f1(ox)}" y="${f1(oy+54)}" style="font:800 36px var(--display);fill:var(--brand)">${txt}%</text>`;
      s+=`<text x="${f1(ox)}" y="${f1(oy+74)}" class="t-lbl">${S.cap}</text><text x="${f1(ox)}" y="${f1(oy+88)}" class="t-xs">${S.sub}</text>`;
      const cell=N?15:13;s+=icons(ox,oy+100,v,cell);
      const lx=ox+cell*10+20,ly=oy+112;
      s+=person(lx+5,ly-8,12,'var(--brand)')+`<text x="${f1(lx+16)}" y="${f1(ly+1)}" class="t-xs">developed it</text>`+person(lx+5,ly+12,12,'var(--muted)',{op:.3})+`<text x="${f1(lx+16)}" y="${f1(ly+21)}" class="t-xs">did not</text>`;
      const notN=100-S.val;s+=`<text x="${f1(lx)}" y="${f1(ly+52)}" class="t-lbl" style="fill:var(--good)">${notN<99.6?Math.round(notN*10)/10:'99.5'} in 100</text><text x="${f1(lx)}" y="${f1(ly+66)}" class="t-xs">did not develop it</text>`;
      /* the ladder of absolute figures met so far */
      const L0=ox,L1=ox+W-10,LY=oy+(N?286:276),XX=v=>lerp(L0,L1,v/50);
      s+=`<line x1="${f1(L0)}" x2="${f1(L1)}" y1="${f1(LY)}" y2="${f1(LY)}" class="axis"/>`;
      [0,10,20,30,40,50].forEach(v=>{s+=`<line x1="${f1(XX(v))}" x2="${f1(XX(v))}" y1="${f1(LY-3)}" y2="${f1(LY+3)}" class="axis"/><text x="${f1(XX(v))}" y="${f1(LY+14)}" class="t-xs t-mid">${v}%</text>`});
      GE_LAD.forEach(([si,v,lab,d],j)=>{if(si>i)return;const on=si===i,op=on?ramp(lp,.2,.8):1,x=XX(v),up=j%2===0;
        s+=`<g style="opacity:${f1(op)}"><circle cx="${f1(x)}" cy="${f1(LY)}" r="${on?5:4}" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/>`;
        const ty=j===0||j===3?LY-10:LY+28,anc=j===3?' t-end':'',tx=j===3?L1:j===0?L0:x-6;
        s+=`<text x="${f1(tx)}" y="${f1(ty)}" class="t-xs${anc}" style="fill:${on?'var(--ink)':'var(--muted)'}">${lab} · ${d}</text></g>`});
    } else {
      const rows=S.mode==='rr'?GE_RR:GE_H2,mx=S.mode==='rr'?14:100,lw=N?0:150,bx=ox+lw,bw=W-lw-34,rh=N?34:30,y0=oy+40;
      rows.forEach(([l,v,c],j)=>{const yy=y0+j*rh,gv=v*ramp(lp,j*.08,.45+j*.08),w=bw*gv/mx;
        const col=c==='s'?'var(--down-fill)':c==='e'?'var(--up-fill)':'var(--brand)';
        if(N)s+=`<text x="${f1(ox)}" y="${f1(yy+2)}" class="t-xs">${l}</text>`;else s+=`<text x="${f1(bx-8)}" y="${f1(yy+12)}" class="t-xs t-end">${l}</text>`;
        const by=N?yy+6:yy+2;
        s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(Math.max(1,w))}" height="16" rx="3" style="fill:${col};opacity:.85"/><text x="${f1(bx+w+5)}" y="${f1(by+11)}" class="t-xs" style="fill:var(--ink)">${S.mode==='rr'?'×'+(gv>=10?f1(gv):gv.toFixed(1)):f1(gv)+'%'}</text>`});
      const yb=y0+rows.length*rh+(N?8:6);
      if(S.mode==='rr'){const xb=bx+bw/mx;s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${f1(y0-4)}" y2="${f1(yb-6)}" style="stroke:var(--accent);stroke-dasharray:3 3"/><text x="${f1(xb+3)}" y="${f1(yb+6)}" class="t-xs" style="fill:var(--accent)">×1 = population risk</text>`;
        s+=`<text x="${f1(ox)}" y="${f1(yb+26)}" class="t-xs">Relative risks from Sweden and Denmark, not absolute</text><text x="${f1(ox)}" y="${f1(yb+40)}" class="t-xs">risks. Risk falls with genetic distance.</text>`}
      else s+=N?`<text x="${f1(ox)}" y="${f1(yb+8)}" class="t-xs"><tspan style="fill:var(--brand)">■ twin and family heritability</tspan>  <tspan style="fill:var(--down-fill)">■ measured common SNPs</tspan></text><text x="${f1(ox)}" y="${f1(yb+22)}" class="t-xs"><tspan style="fill:var(--up-fill)">■ shared family environment</tspan></text>`:`<text x="${f1(ox)}" y="${f1(yb+10)}" class="t-xs"><tspan style="fill:var(--brand)">■ twin and family heritability</tspan>  <tspan style="fill:var(--down-fill)">■ measured common SNPs</tspan>  <tspan style="fill:var(--up-fill)">■ shared environment</tspan></text>`;
    }
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const i=phaseOf(GE_STEPS,t),S=GE_STEPS[i],P=GE_STEPS[Math.max(0,i-1)],lp=i===0?1:ramp(t,S.from,S.from+.08);
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    if(N){s+=tree(24,6,S,i?P:S,lp)+legend(20,318,370)+`<line x1="16" x2="384" y1="352" y2="352" class="grid"/>`+panel(20,364,360,S,i,lp,t,1)}
    else{s+=`<text x="16" y="18" class="t-sm" style="fill:var(--brand)">ONE ILLUSTRATIVE FAMILY</text>`+tree(6,28,S,i?P:S,lp)+legend(16,350,330)+`<line x1="356" x2="356" y1="10" y2="390" class="grid"/>`+panel(378,6,330,S,i,lp,t,0)}
    svg.innerHTML=s;setA(i);$('#geNote').innerHTML=noteHTML(S);
  }
  stop=playWire(rg,$('#gePlay'),draw,16000,'Replay','genes');
  const setA=stepWire($('#geSteps'),GE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= GWAS sketch ================= */
  const gs=$('#geGw'),gr=$('#geGwT');const R=rng(1303);
  const TOT=GE_CHR.reduce((a,b)=>a+b,0),CUM=[];GE_CHR.reduce((a,b,i)=>(CUM[i]=a,a+b),0);
  const gpos=(c,p)=>(CUM[c-1]+p*GE_CHR[c-1])/TOT;
  const pickChr=()=>{let u=R()*TOT;for(let c=0;c<22;c++){if(u<GE_CHR[c])return c+1;u-=GE_CHR[c]}return 22};
  const NOISE=[];for(let k=0;k<520;k++){const c=pickChr(),p=R();NOISE.push({x:gpos(c,p),c,v:-Math.log10(Math.max(1e-6,R()))*.95})}
  /* anonymous peaks appear wave by wave so that the drawn total matches 1, 2, 30, 64, then 150 drawn of 298 */
  const named=GE_NAMED.map(n=>Object.assign({x:gpos(n.c,n.p),s:.8,c:n.c},n));
  const tgt=[1,2,30,64,150],ANON=[];
  for(let w=0;w<5;w++){const have=named.filter(n=>n.w<=w).length+ANON.length;for(let k=have;k<tgt[w];k++){const c=pickChr();ANON.push({x:gpos(c,R()),c,s:.25+R()*.75,w})}}
  const GROW=[1.6,2.6,4.2,6,9.5];
  function hAt(pk,wf){/* -log10 P of a peak at continuous wave index wf */
    const at=w=>{if(w<pk.w-1)return 2.2+pk.s*1.2;if(w<pk.w)return(pk.pre&&w>=0?pk.pre:4.6+pk.s*1.8);return 7.6+pk.s*GROW[Math.min(4,w)]*(1+(w-pk.w)*.15)};
    if(pk.g==='ANK3'&&wf<=0)return lerp(3,8.04,clamp(wf+1));
    if(pk.g==='CACNA1C'&&wf<=0)return lerp(3,7.15,clamp(wf+1));
    const a=Math.floor(wf),b=Math.min(4,a+1),f=wf-a;return lerp(at(Math.max(a,0)),at(b),ease(clamp(f)))}
  function drawG(t){
    const N=vb(gs,'720 430','400 640');
    const i=phaseOf(GE_GW,t),S=GE_GW[i],lp=ramp(t,S.from,S.from+.1);
    const wf=i===0?lerp(-1,0,lp):i>=4?4:i-1+lp;
    const L=N?{x0:36,x1:390,yT:24,l1:44,l2:58,p0:76,p1:262,ax:278}:{x0:56,x1:704,yT:16,l1:38,l2:52,p0:70,p1:232,ax:248};
    const Ymax=24,X=u=>lerp(L.x0,L.x1,u),Y=v=>lerp(L.p1,L.p0,clamp(v/Ymax,0,1.02));
    let s=`<text x="${L.x0}" y="${L.yT}" class="t-sm" style="fill:var(--brand)">${N?'GWAS SKETCH · ':'MANHATTAN PLOT SKETCH · '}${S.prs?'2025':S.y} · ${S.cases.toLocaleString('en-US')} CASES</text>`;
    /* chromosome bands */
    for(let c=1;c<=22;c++){const a=X(CUM[c-1]/TOT),b=X((CUM[c-1]+GE_CHR[c-1])/TOT);
      if(c%2)s+=`<rect x="${f1(a)}" y="${L.p0}" width="${f1(b-a)}" height="${L.p1-L.p0}" style="fill:var(--panel-2);opacity:.55"/>`;
      if(N?(c<=12&&c%2||c>12&&c%4===0):(c<=16||c%2))s+=`<text x="${f1((a+b)/2)}" y="${L.ax}" class="t-xs t-mid">${c}</text>`}
    s+=`<text x="${L.x1}" y="${L.ax+14}" class="t-xs t-end">chromosome</text>`;
    [0,5,10,15,20].forEach(v=>{s+=`<text x="${L.x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.x0-24}" y="${f1((L.p0+L.p1)/2)}" class="t-xs t-mid" transform="rotate(-90 ${L.x0-24} ${f1((L.p0+L.p1)/2)})">−log10 P</text>`;
    const nf=i===0?.6+.4*lp:1;
    NOISE.forEach(d=>{s+=`<circle cx="${f1(X(d.x))}" cy="${f1(Y(d.v*nf))}" r="1.3" style="fill:${d.c%2?'var(--muted)':'var(--down-fill)'};opacity:.5"/>`});
    const tower=(pk,col,r0)=>{const h=hAt(pk,wf),x=X(pk.x);let o=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(Y(1.5))}" y2="${f1(Y(h))}" style="stroke:${col};stroke-width:1.3;opacity:.75"/>`;for(let k=2;k<=4;k++){const v=h*k/5;o+=`<circle cx="${f1(x+(k%2?-1.2:1.2))}" cy="${f1(Y(v))}" r="1.4" style="fill:${col};opacity:.7"/>`}o+=`<circle cx="${f1(x)}" cy="${f1(Y(h))}" r="${r0}" style="fill:${col}"/>`;return {o,h,x}};
    ANON.forEach(pk=>{if(pk.w>Math.ceil(wf)+1)return;s+=tower(pk,'var(--brand)',2).o});
    const lab=[];named.forEach(pk=>{const T=tower(pk,'var(--accent)',2.8);s+=T.o;if(T.h>=7.3)lab.push({g:pk.g,x:T.x,y:Y(T.h)})});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(7.3))}" y2="${f1(Y(7.3))}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${L.x1}" y="${f1(Y(7.3)-4)}" class="t-xs t-end" style="fill:var(--accent);paint-order:stroke;stroke:var(--panel);stroke-width:3px">P = 5 × 10⁻⁸</text>`;
    /* labels in two rows above the plot, spread so they never overlap, with leader lines */
    lab.sort((a,b)=>a.x-b.x);const gap=N?48:60;
    [0,1].forEach(row=>{const R=lab.filter((l,k)=>k%2===row);R.forEach(l=>l.row=row);
      R.forEach((l,k)=>{l.lx=Math.max(l.x,k?R[k-1].lx+gap:L.x0+18)});
      for(let k=R.length-1;k>=0;k--)R[k].lx=Math.min(R[k].lx,k<R.length-1?R[k+1].lx-gap:L.x1-22)});
    lab.forEach(l=>{const ly=l.row?L.l2:L.l1;s+=`<path d="M${f1(l.lx)} ${ly+3}L${f1(l.x)} ${f1(l.y-4)}" style="stroke:var(--accent);stroke-width:.8;opacity:.6;fill:none"/><text x="${f1(l.lx)}" y="${ly}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">${l.g}</text>`});
    /* lower panel */
    const B=N?{y0:304,y1:430,y2:476,y3:600,x0:20,x1:390}:{y0:300,y1:410,x0:30,xm:380,x1:704};
    if(!S.prs){
      const bars=(x0,x1,yT,yB,title,data,mx,fmt)=>{let o=`<text x="${x0}" y="${yT}" class="t-sm">${title}</text>`;const bw=(x1-x0)/data.length;
        data.forEach((d,k)=>{const on=k<=wf+.001,g=k<=Math.floor(wf)?1:k===Math.ceil(wf)?ease(clamp(wf-k+1)):0,v=d.v==null?0:d.v*g,h=(yB-yT-34)*v/mx,x=x0+k*bw+bw*.18,w=bw*.64;
          o+=`<rect x="${f1(x)}" y="${f1(yB-h)}" width="${f1(w)}" height="${f1(Math.max(h,on&&d.v?1:0))}" rx="3" style="fill:${k===i&&!S.prs?'var(--brand)':'var(--brand-soft)'};stroke:var(--brand);stroke-width:1"/>`;
          o+=`<text x="${f1(x+w/2)}" y="${yB+13}" class="t-xs t-mid">${d.y}</text>`;
          if(g>0)o+=`<text x="${f1(x+w/2)}" y="${f1(yB-h-4)}" class="t-xs t-mid" style="fill:var(--ink)">${d.v==null?'n/r':fmt(v)}</text>`});
        return o+`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/>`};
      const cd=GE_GW.slice(0,5).map(d=>({y:d.y,v:d.cases})),ld=GE_GW.slice(0,5).map(d=>({y:d.y,v:d.loci}));
      const fk=v=>v>=1000?Math.round(v/1000)+'k':Math.round(v);
      if(N)s+=bars(B.x0,B.x1,B.y0,B.y1,'CASES',cd,160000,fk)+bars(B.x0,B.x1,B.y2,B.y3,'GENOME-WIDE LOCI',ld,300,v=>Math.round(v));
      else s+=bars(B.x0,B.xm-20,B.y0,B.y1,'CASES',cd,160000,fk)+bars(B.xm+20,B.x1,B.y0,B.y1,'GENOME-WIDE LOCI (n/r: not reported)',ld,300,v=>Math.round(v));
    } else {
      /* two overlapping score curves, drawn so that AUC is about 0.70 (separation d = 0.74 SD) */
      const d=.74*ease(lp),x0=B.x0+10,x1=B.x1-10,yB=N?560:404,hh=N?190:96,Xs=z=>lerp(x0,x1,(z+3.4)/7.6);
      const pdf=z=>Math.exp(-z*z/2);
      const curve=(m,col,lbl,lx)=>{let p='';for(let k=0;k<=120;k++){const z=-3.4+7.6*k/120;p+=(k?'L':'M')+f1(Xs(z))+' '+f1(yB-hh*pdf(z-m))}
        return `<path d="${p}L${f1(x1)} ${yB}L${f1(x0)} ${yB}Z" style="fill:${col};opacity:.22"/><path d="${p}" style="fill:none;stroke:${col};stroke-width:2.2"/>`};
      s+=`<text x="${B.x0}" y="${N?B.y0:B.y0}" class="t-sm">${N?'POLYGENIC SCORES OVERLAP':'POLYGENIC SCORES IN TWO GROUPS OVERLAP'}</text>`;
      s+=curve(-d/2,'var(--muted)')+curve(d/2,'var(--accent)');
      s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+14}" class="t-xs t-end">polygenic score →</text>`;
      s+=`<text x="${f1(Xs(-d/2-1.3))}" y="${f1(yB-hh*.72)}" class="t-xs t-end" style="fill:var(--muted)">without</text><text x="${f1(Xs(d/2+1.3))}" y="${f1(yB-hh*.72)}" class="t-xs" style="fill:var(--accent)">with bipolar disorder</text>`;
      const ty=N?B.y0+22:B.y0+18,au=(.5+.2*ease(lp)).toFixed(2),pc=Math.round(50+20*ease(lp));
      const LN=N?[`AUC ≈ ${au}: pick one person with and one without`,`bipolar disorder at random; the one with it has`,`the higher score about ${pc}% of the time (a coin toss: 50%).`]
               :[`AUC ≈ ${au}: pick one person with and one without bipolar disorder at random; the one with it has the higher`,`score about ${pc}% of the time (a coin toss: 50%). Curves drawn to give AUC ≈ 0.70, as in the 2025 GWAS.`];
      LN.forEach((l,k)=>{s+=`<text x="${B.x0}" y="${ty+k*13}" class="t-xs">${l}</text>`});
    }
    gs.innerHTML=s;setG(i);$('#geGwNote').innerHTML=noteHTML(S);
  }
  const stopG=playWire(gr,$('#geGwPlay'),drawG,15000,'Replay','genes');
  const setG=stepWire($('#geGwSteps'),GE_GW,gr,drawG,stopG);
  drawG(+gr.value);

  /* ================= liability threshold board ================= */
  const lb=$('#geLb'),on={};let shift=0,stopL=null;
  const target=()=>Object.keys(on).filter(k=>on[k]).reduce((a,k)=>a+GE_FX[k].d,0);
  function info(){$('#geLbInfo').innerHTML=`<div class="kicker">Factors switched on: ${Object.values(on).filter(Boolean).length} of 5</div><h4>What each factor adds</h4>`+
    Object.keys(GE_FX).map(k=>{const F=GE_FX[k];return `<div class="fx${on[k]?'':' off'}"><b>${F.n} ${GE_EVL[F.ev]}</b>${F.txt}</div>`}).join('')+
    `<div class="pt"><b>In plain words</b>None of these makes bipolar disorder certain, and avoiding them does not rule it out. Some, like sleep and substance use, are things a person can work on with support.</div>`}
  function drawL(){
    const N=vb(lb,'720 300','400 380');
    const x0=N?18:40,x1=N?386:690,yB=N?300:250,hh=N?170:160,zl=-3.6,zr=4.6,X=z=>lerp(x0,x1,(z-zl)/(zr-zl)),thr=2.1;
    const pdf=z=>Math.exp(-z*z/2);let s='';
    const curve=(m,ghost)=>{let p='';for(let k=0;k<=140;k++){const z=zl+(zr-zl)*k/140;p+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-m))}return p};
    s+=`<path d="${curve(0)}" style="fill:none;stroke:var(--muted);stroke-width:1.3;stroke-dasharray:4 4;opacity:${shift>.01?.8:0}"/>`;
    const main=curve(shift);s+=`<path d="${main}L${f1(x1)} ${yB}L${f1(x0)} ${yB}Z" style="fill:var(--brand-soft);opacity:.7"/>`;
    let tail='';for(let k=0;k<=60;k++){const z=thr+(zr-thr)*k/60;tail+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-shift))}
    s+=`<path d="${tail}L${f1(X(zr))} ${yB}L${f1(X(thr))} ${yB}Z" style="fill:var(--accent);opacity:.45"/>`;
    s+=`<path d="${main}" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
    s+=`<line x1="${f1(X(thr))}" x2="${f1(X(thr))}" y1="${f1(yB-hh-20)}" y2="${yB}" style="stroke:var(--accent);stroke-width:2"/><text x="${f1(X(thr)+5)}" y="${f1(yB-hh-10)}" class="t-xs" style="fill:var(--accent);font-weight:700">threshold</text>`;
    s+=`<text x="${f1(X(thr)+5)}" y="${f1(yB-hh+4)}" class="t-xs" style="fill:var(--accent)">past it: onset or</text><text x="${f1(X(thr)+5)}" y="${f1(yB-hh+16)}" class="t-xs" style="fill:var(--accent)">an episode</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x0}" y="${yB+16}" class="t-xs">lower liability</text><text x="${x1}" y="${yB+16}" class="t-xs t-end">higher liability →</text>`;
    /* stacked arrows for the factors switched on */
    let acc=0,row=0;const ks=Object.keys(GE_FX).filter(k=>on[k]),tot=target()||1,sc=shift/tot;
    ks.forEach(k=>{const F=GE_FX[k],a=X(acc*sc)-X(0)+X(0),b=X((acc+F.d)*sc),y=(N?22:16)+row*13;
      if(b-a>2)s+=`<line x1="${f1(a)}" x2="${f1(b)}" y1="${y}" y2="${y}" style="stroke:var(--accent);stroke-width:2" marker-end="url(#geArr)"/><text x="${f1(b+6)}" y="${y+3.5}" class="t-xs" style="fill:var(--ink)">+ ${F.s}</text>`;
      acc+=F.d;row++});
    if(!ks.length)s+=`<text x="${f1(X(0))}" y="${N?30:28}" class="t-xs t-mid">Switch a factor on to see the curve move</text>`;
    s+=`<text x="${f1(X(0))}" y="${f1(yB-hh-6)}" class="t-xs t-mid">${shift>.01?'shifted population':'population'}</text>`;
    lb.innerHTML=`<defs>${marker('geArr','var(--accent)')}</defs>`+s;
  }
  function go(){const to=target(),fr=shift;if(stopL)stopL();stopL=animate(500,p=>{shift=lerp(fr,to,ease(p));drawL()},()=>{stopL=null})}
  $$('[data-gef]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.gef;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);info();go()}));
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawL()};
  info();drawL();
};
/* =============== 1.4 Brain, sleep & the body clock =============== */
/* 24 illustrative days: [bedtime, waking] in clock hours */
const BR_SLEEP=[[23,7],[23,7],[23,7],[23,7],[23.5,7],[23,7],[0,7],[1,7],[1.5,7],[2,7],[2.5,6.5],[3,6.5],[3,6],[3.5,6],[4,6],[4.5,6],[5,6],[4,6],[0.5,7],[0,7],[23.5,7],[23,7],[23,7],[23,7]];
const BR_D=BR_SLEEP.length;
const BR_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const BR_STEPS=[
 {from:0,at:2.5/24,k:'Days 1–6 · steady rhythm',t:'A regular rhythm',
  txt:`The brain's master clock, the suprachiasmatic nucleus, keeps a roughly 24-hour rhythm, and clocks also run in mood-related regions such as the ventral tegmentum and hippocampus. Daily anchors (waking, meals, work, other people) help set it: the social zeitgeber theory. Even between episodes sleep is often disturbed: 70% of euthymic people in one study had a clinically significant sleep problem, and a meta-analysis of 21 studies found longer time to fall asleep and more night-to-night variability. <sup class="c" data-ref="McCarthy2012,Ehlers1988,Harvey2005Sleep,Ng2015Sleep" title="Source 118,207,312,370">118,207,312,370</sup>`,
  pt:`Going to bed, waking and eating at about the same times each day helps keep the body clock steady.`,
  hook:`Social zeitgebers (Ehlers, Frank and Kupfer, 1988): the theory behind interpersonal and social rhythm therapy. <sup class="c" data-ref="Ehlers1988,Frank2005IPSRT" title="Source 118,152">118,152</sup>`},
 {from:6/24,at:8.5/24,k:'Days 7–10 · routine slips',t:'Late nights, lost anchors',
  txt:`${BR_EV.early} In 39 people with bipolar disorder, life events that disrupted social routines were more common in the 8 weeks before a manic onset than in a control period, but not before depression. In 414 students followed for about 33 months, less regular daily rhythms predicted a shorter time to the next episode in people with cyclothymia or bipolar II. Evening chronotype and a delayed melatonin and cortisol rhythm are more common in bipolar disorder. <sup class="c" data-ref="MalkoffSchwartz1998,Shen2008,Melo2017" title="Source 307,325,454">307,325,454</sup>`,
  pt:`Late nights, shift work, travel across time zones or a big change in routine can knock the body clock off balance. <sup class="c" data-ref="Lewis2017Sleep" title="Source 294">294</sup>`,
  hook:`Routine-disrupting events preceded manic, not depressive, onsets (Malkoff-Schwartz 1998). <sup class="c" data-ref="MalkoffSchwartz1998" title="Source 307">307</sup>`},
 {from:10/24,at:12/24,k:'Days 11–14 · sleep shrinks',t:'Less sleep, but not tired',
  txt:`Decreased need for sleep is one of the DSM-5-TR criterion symptoms of a manic or hypomanic episode. In daily ratings from 59 outpatients, sleep changes went with the next day's mood change in 41% of people, and a change of more than 3 hours from the usual pattern may signal a large mood change. Across 17 studies, sleep disturbance was the most robust early warning sign of mania (median 77%); manic prodromes lasted on average more than 20 days (range 1–120). ${BR_EV.est} for prediction. <sup class="c" data-ref="APA2022,Bauer2006Sleep,Jackson2003,Plante2008" title="Source 15,28,236,418">15,28,236,418</sup>`,
  pt:`Needing much less sleep without feeling tired is one of the clearest early signs that a high may be starting.`,
  hook:`Sleep disturbance is the most common early sign of mania (median 77% of prodromes). <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`},
 {from:14/24,at:16/24,k:'Days 15–18 · the loop',t:'Early mania feeds itself',
  txt:`${BR_EV.hyp} Wehr and colleagues proposed that sleep reduction is a "final common pathway" to mania: many triggers act by causing sleep loss, and because mania itself causes insomnia, the process can become self-reinforcing. Experiments support it: after one night awake, 7 of 9 rapid-cycling patients in a depressive phase were rated manic or hypomanic. Sleep loss as a trigger of high mood was reported more often in bipolar I (OR 2.81). The chart's bands are drawing conventions: DSM-5-TR separates hypomania from mania by duration and impairment, not by height. <sup class="c" data-ref="Wehr1987,Wehr1982,Lewis2017Sleep" title="Source 294,515,516">294,515,516</sup>`,
  pt:`Losing sleep can push mood up, and a high mood makes sleep even harder, so the two feed each other. This is the moment to contact the care team.`,
  hook:`Wehr 1987: sleep loss as a "final common pathway" to mania. One night awake switched 7 of 9 rapid-cycling depressed patients. <sup class="c" data-ref="Wehr1987,Wehr1982" title="Source 515,516">515,516</sup>`},
 {from:18/24,at:21.5/24,k:'Days 19–24 · recovery',t:'Back to a regular rhythm',
  txt:`With treatment, steady routines help. In a trial of 175 adults with bipolar I, interpersonal and social rhythm therapy in the acute phase lengthened time without a new episode over 2 years (P = .01); routines became more regular, and people whose regularity rose more were less likely to relapse. ${BR_EV.early} In 23 people in hospital with mania, orange blue-blocking glasses worn from 6 p.m. to 8 a.m. for 7 days, added to usual treatment, lowered mania scores by 14.1 points against 1.7 with clear glasses. Lithium also acts on the body clock: see <a href="#lithium" data-go="lithium">Lithium: how it works</a>. <sup class="c" data-ref="Frank2005IPSRT,Henriksen2016,Moreira2016" title="Source 152,221,351">152,221,351</sup>`,
  pt:`Treatment, steady sleep and daily routines work together, and many people with bipolar disorder stay well for long periods. <sup class="c" data-ref="Frank2005IPSRT,Jackson2003" title="Source 152,236">152,236</sup>`,
  hook:`IPSRT: making social rhythms more regular lengthened time to recurrence (Frank 2005). <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>`}
];
const BR_MOOD=[[0,0],[5/24,.02],[7/24,.07],[9/24,.18],[11/24,.36],[13/24,.5],[15/24,.7],[17/24,.8],[19/24,.55],[21/24,.22],[23/24,.06],[1,.03]];
const BR_CHAIN=[['Routine disrupted','routine'],['Sleep lost','sleep'],['Mood rises','mood'],['Less need for sleep','need']];
/* brain outline from the kit, reused here for the cortex overlay */
const BR_OUT='M-72 6C-80 -20 -62 -48 -30 -54C-8 -60 20 -58 42 -48C66 -38 80 -16 76 6C74 22 62 30 48 30C40 40 24 42 14 36C2 44 -20 44 -32 36C-50 38 -68 28 -72 6Z';
const BR_L={
 cortex:{k:'ENIGMA · cortical thickness',t:'A slightly thinner cortex',hl:{pfc:.55},thin:1,
  marks:[[-50,6,2,'left pars opercularis · d −0.29'],[-56,-24,0,'left rostral middle frontal · d −0.28'],[22,30,3,'left fusiform · d −0.29']],
  bars:[['L pars opercularis',-.293],['L fusiform',-.288],['L rostral middle frontal',-.276]],
  txt:`${BR_EV.est} In 1,837 adults with bipolar disorder and 2,582 controls, cortical grey matter was thinner in frontal, temporal and parietal regions of both hemispheres. The largest effects were in the left pars opercularis (d −0.293), left fusiform gyrus (−0.288) and left rostral middle frontal cortex (−0.276). Longer illness went with thinner cortex and a history of psychosis with smaller surface area; mood state at scanning did not matter. <sup class="c" data-ref="Hibar2018" title="Source 223">223</sup>`,
  pt:`On average, the brain's outer layer is a little thinner in some areas. The difference is small and varies a lot between people.`,
  hook:`ENIGMA cortex: largest effect in the left pars opercularis, d −0.29. <sup class="c" data-ref="Hibar2018" title="Source 223">223</sup>`},
 sub:{k:'ENIGMA · deep structures',t:'Smaller hippocampus and thalamus',hl:{hippo:.9},thal:1,vent:1,
  marks:[[14,22,3,'hippocampus · d −0.23'],[2,6,1,'thalamus · d −0.15'],[-12,-12,0,'lateral ventricles · larger']],
  bars:[['Hippocampus',-.232],['Hippocampus (2022)',-.2],['Thalamus',-.148]],
  txt:`${BR_EV.est} In 1,710 people with bipolar disorder and 2,594 controls, the hippocampus (d −0.232) and thalamus (d −0.148) were smaller and the lateral ventricles larger. Bipolar I, but not bipolar II, differed from controls. A hippocampal-subfield mega-analysis of 1,472 people found a smaller whole hippocampus (d −0.20) and smaller volumes in 9 of 12 subfields. <sup class="c" data-ref="Hibar2016,Haukvik2022" title="Source 210,222">210,222</sup>`,
  pt:`Some deeper structures, used for memory and for relaying signals, are on average slightly smaller.`,
  hook:`ENIGMA subcortical: smaller hippocampus and thalamus, larger lateral ventricles. <sup class="c" data-ref="Hibar2016" title="Source 222">222</sup>`},
 wm:{k:'ENIGMA · white matter',t:'Less organised wiring',hl:{},cc:1,
  marks:[[0,-26,1,'corpus callosum'],[-26,-34,0,'cingulum']],grid:[29,43],
  txt:`${BR_EV.est} In the largest diffusion imaging dataset (1,482 people with bipolar disorder and 1,551 controls from 26 cohorts), fractional anisotropy, a measure of white-matter integrity, was lower in 29 of 43 regions, most of all in the corpus callosum and cingulum. Lithium use, later onset and shorter illness went with higher values. A 98-study meta-analysis also found more deep white-matter hyperintensities (OR 2.49). <sup class="c" data-ref="Favre2019,Kempton2008" title="Source 125,255">125,255</sup>`,
  pt:`The wiring that links brain areas looks slightly less organised on average, most of all in the bridge between the two halves of the brain.`,
  hook:`ENIGMA white matter: lower FA in 29 of 43 regions, largest in the corpus callosum and cingulum. <sup class="c" data-ref="Favre2019" title="Source 125">125</sup>`},
 fmri:{k:'fMRI · emotion and reward',t:'Brakes weaker, accelerators stronger',hl:{pfc:.15,amyg:1,stri:.85},ctrl:1,
  marks:[[-50,-16,0,'ventrolateral PFC · under-active'],[-6,24,2,'amygdala · over-active'],[-12,4,1,'reward circuit · over-active']],
  txt:`${BR_EV.est} A meta-analysis of 65 fMRI studies (1,040 people with bipolar disorder) found under-activation of the inferior frontal gyrus and ventrolateral prefrontal cortex, linked particularly to mania, and over-activation of limbic areas including the amygdala and hippocampus. The leading circuit model adds an over-active left-sided ventral striatal reward circuit, to explain emotional lability, emotional dysregulation and heightened reward sensitivity. ${BR_EV.hyp} A consensus model proposes that disrupted development of prefrontal–limbic connections weakens top-down control of the amygdala. <sup class="c" data-ref="Chen2011fMRI,Phillips2014,Strakowski2012" title="Source 75,413,476">75,413,476</sup>`,
  pt:`The "brake" areas at the front of the brain are less active, while emotion and reward areas are more active.`,
  hook:`fMRI: under-active vlPFC / inferior frontal gyrus plus over-active amygdala; over-active reward circuit. <sup class="c" data-ref="Chen2011fMRI,Phillips2014" title="Source 75,413">75,413</sup>`},
 li:{k:'Lithium · association',t:'Measures closer to typical',hl:{hippo:.55,amyg:.35},thal:1,
  marks:[[0,-54,0,'paracentral · d +0.21'],[30,-46,1,'superior parietal · d +0.20'],[14,22,3,'hippocampus · like controls']],
  bars:[['L paracentral',.211],['L superior parietal',.202],['R superior parietal',.188]],
  txt:`${BR_EV.early} People taking lithium (n = 700) had thicker cortex than those not taking it (n = 892), most in the left paracentral gyrus (d 0.211) and the superior parietal gyri (0.202 left, 0.188 right); antipsychotics showed the opposite relationship. Lithium users also had larger thalamic volumes, hippocampal subfields like those of controls, and higher white-matter integrity. These are cross-sectional associations and may partly reflect who is prescribed lithium; no randomised imaging trial establishes neuroprotection. <sup class="c" data-ref="Hibar2018,Hibar2016,Haukvik2022,Favre2019" title="Source 125,210,222,223">125,210,222,223</sup>`,
  pt:`People taking lithium tend to have brain measures closer to people without bipolar disorder. That may mean lithium protects brain cells, but it is not proven. <sup class="c" data-ref="Hajek2014" title="Source 201">201</sup>`,
  hook:`Lithium is associated with thicker cortex, a larger hippocampus and higher white-matter integrity (association, not proof). <sup class="c" data-ref="Hibar2018,Hallahan2011,Favre2019" title="Source 125,202,223">125,202,223</sup>`}
};
const BR_K={
 data:{k:'Danish registers',t:'Recurrence rises with episode count',
  txt:`${BR_EV.est} for the association. In a Danish register of 20,350 first-admission patients (1971–1993), the rate of recurrence rose with the number of previous episodes, in both unipolar and bipolar disorder. A later register study (1,106 people with mania or bipolar disorder) found the same, and relapse rates had not fallen despite newer treatments. A 2017 review linked more episodes with higher recurrence risk, longer and more severe episodes and higher dementia risk, while noting how varied the course is. <sup class="c" data-ref="Kessing1998Recurrence,Kessing2004Course,Kessing2017Progression" title="Source 261,262,268">261,262,268</sup>`,
  pt:`On average, people who have had more episodes are more likely to have another. Why is the open question.`,
  hook:`Danish registers: recurrence rate rises with the number of prior episodes (an association). <sup class="c" data-ref="Kessing1998Recurrence" title="Source 261">261</sup>`},
 kindle:{k:'Reading 1',t:'Kindling and neuroprogression',
  txt:`${BR_EV.hyp} Post (1992) proposed that stressors and episodes leave lasting traces in gene expression, so later episodes need less stress to start and may eventually occur on their own, with possible progression to rapid cycling and treatment resistance; the model argues for early intervention. Allostatic-load and neuroprogression models add cumulative wear and tear from inflammation, oxidative stress, loss of neurotrophins and stress hormones. <sup class="c" data-ref="Post1992,Kapczinski2008,Berk2011" title="Source 42,249,419">42,249,419</sup>`,
  pt:`The idea: each episode may make the next one easier to set off. It is one reason early, steady treatment is emphasised.`,
  hook:`Kindling (Post 1992): episodes and stressors sensitise the brain, so later episodes need smaller triggers. <sup class="c" data-ref="Post1992" title="Source 419">419</sup>`},
 sev:{k:'Reading 2',t:'Severity from the start',
  txt:`${BR_EV.hyp} An association is not proof. People whose illness is more severe from the start will both have more episodes and a higher recurrence risk, so a pooled curve rises even if no one's own risk changes. A review of life stress found that the methodologically strongest studies are inconsistent with kindling in bipolar disorder. Status: contested. <sup class="c" data-ref="Kessing2017Progression,Bender2011" title="Source 35,268">35,268</sup>`,
  pt:`The rise could come from mixing people with milder and more severe illness, not from episodes changing the brain.`,
  hook:`The best life-stress studies do not support kindling; the question is open. <sup class="c" data-ref="Bender2011" title="Source 35">35</sup>`}
};

inits.brain=()=>{
  /* ================= sleep, clock and mood ================= */
  const svg=$('#brSvg'),rg=$('#brT');
  const mood=moodSeries(BR_MOOD);
  const R=rng(1404),ANCH=BR_SLEEP.map((_,d)=>{const reg=[7.5,9,13,18.5,20.5];if(d<6||d>=19)return reg.map(h=>h+(R()-.5)*.4);
    return reg.filter(()=>R()>.3).map(h=>(h+(R()-.3)*5+24)%24)});
  const fmtH=h=>{h=((h%24)+24)%24;const H=Math.floor(h),M=Math.round((h-H)*60);return String(H).padStart(2,'0')+':'+String(M===60?0:M).padStart(2,'0')};
  const dur=([b,w])=>((w-b)%24+24)%24;
  function chip(x,y,kind,anchor){const L={est:['Established','var(--good)','var(--good-soft)'],early:['Early evidence','var(--warn)','var(--warn-soft)'],hyp:['Hypothesis','var(--rx)','var(--rx-soft)']}[kind];
    const w=L[0].length*5.6+10,x0=anchor==='end'?x-w:anchor==='mid'?x-w/2:x;
    return `<rect x="${f1(x0)}" y="${f1(y-9)}" width="${f1(w)}" height="13" rx="3" style="fill:${L[2]}"/><text x="${f1(x0+5)}" y="${f1(y+1)}" style="font:600 8.5px var(--mono);fill:${L[1]};letter-spacing:.04em">${L[0].toUpperCase()}</text>`}
  function chain(N,ph,lp){
    /* which parts are lit at each step */
    const litN=[[],[0],[0,1,2],[0,1,2,3],[]][ph],litA=[[],[0],[0,1],[0,1,2,3],[]][ph];
    const P=N?[[16,592],[208,592],[208,670],[16,670]]:[[14,394],[194,394],[374,394],[554,394]],w=N?176:150,h=30;
    let s='';
    BR_CHAIN.forEach(([l],k)=>{const on=litN.includes(k),[x,y]=P[k];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${on?'var(--up-soft)':'var(--panel-2)'};stroke:${on?'var(--up-fill)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${x+w/2}" y="${y+19}" class="t-lbl t-mid" style="font-size:12px;fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`});
    const arr=(x1,y1,x2,y2,on,kind,cx,cy,anc)=>`<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:${on?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none" marker-end="url(#${on?'brA1':'brA0'})"/>`+chip(cx,cy,kind,anc);
    if(N){s+=arr(194,607,206,607,litA.includes(0),'early',200,584,'mid');
      s+=arr(296,624,296,668,litA.includes(1),'early',304,650,'');
      s+=arr(206,685,194,685,litA.includes(2),'est',200,716,'mid');
      s+=`<path d="M104 668C110 644 170 640 206 616" style="stroke:${litA.includes(3)?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none;stroke-dasharray:5 4" marker-end="url(#${litA.includes(3)?'brA1':'brA0'})"/>`+chip(98,648,'hyp','end');}
    else{s+=arr(166,409,192,409,litA.includes(0),'early',179,388,'mid');
      s+=arr(346,409,372,409,litA.includes(1),'early',359,388,'mid');
      s+=arr(526,409,552,409,litA.includes(2),'est',539,388,'mid');
      s+=`<path d="M629 426C600 452 300 452 271 428" style="stroke:${litA.includes(3)?'var(--up-fill)':'var(--line)'};stroke-width:2;fill:none;stroke-dasharray:5 4" marker-end="url(#${litA.includes(3)?'brA1':'brA0'})"/>`+chip(450,447,'hyp','mid')}
    if(ph===4){const op=f1(ramp(lp,0,.6)),x0=N?10:8,x1=N?392:712,y0=N?582:386,y1=N?726:450;
      s+=`<g style="opacity:${op}"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="10" style="fill:var(--eu-soft);opacity:.85;stroke:var(--eu);stroke-width:1.4"/><text x="${(x0+x1)/2}" y="${(y0+y1)/2-2}" class="t-lbl t-mid" style="fill:var(--eu)">Regular rhythm + treatment break the loop</text><text x="${(x0+x1)/2}" y="${(y0+y1)/2+14}" class="t-xs t-mid">steady sleep and wake times, daily anchors, care team</text></g>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 460','400 734');
    const D=Math.min(BR_D-.001,t*BR_D),di=Math.floor(D),hr=(D-di)*24,sl=BR_SLEEP[di],ph=phaseOf(BR_STEPS,t),S=BR_STEPS[ph],lp=ramp(t,S.from,S.from+.06);
    let s=`<defs>${marker('brA1','var(--up-fill)')}${marker('brA0','var(--line)')}</defs>`;
    /* clock */
    const C=N?{cx:88,cy:104,r:72}:{cx:112,cy:128,r:84};
    const ck=clock24(C.cx,C.cy,C.r,{sleep:sl,h:hr});s+=ck.svg;
    (ANCH[di]||[]).forEach(h=>{const p=ck.P(h,C.r+7);s+=`<path d="M${f1(p[0])} ${f1(p[1]-4)}l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/>`});
    const awake=!(((hr-sl[0])%24+24)%24<dur(sl));
    const info=[`Day ${di+1} of ${BR_D}`,`asleep ${fmtH(sl[0])}–${fmtH(sl[1])}`,`${dur(sl)} h of sleep`,awake?'awake now':'asleep now'];
    if(N){s+=`<text x="182" y="52" class="t-big">${info[0]}</text><text x="182" y="74" class="t-sm">${info[1]}</text><text x="182" y="92" class="t-lbl" style="fill:${dur(sl)<5?'var(--up)':'var(--ink)'}">${info[2]}</text><text x="182" y="110" class="t-xs">${info[3]} · ${fmtH(hr)}</text>`;
      s+=`<path d="M186 130l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/><text x="196" y="138" class="t-xs">daily anchors</text><text x="196" y="151" class="t-xs">(meals, work, people)</text>`}
    else{s+=`<text x="${C.cx}" y="${C.cy+C.r+28}" class="t-big t-mid">${info[0]}</text><text x="${C.cx}" y="${C.cy+C.r+46}" class="t-sm t-mid">${info[1]}</text><text x="${C.cx}" y="${C.cy+C.r+64}" class="t-lbl t-mid" style="fill:${dur(sl)<5?'var(--up)':'var(--ink)'}">${info[2]}</text>`;
      s+=`<path d="M${C.cx-78} 16l4 4l-4 4l-4 -4z" style="fill:var(--accent)"/><text x="${C.cx-70}" y="24" class="t-xs">daily anchors: meals, work, people</text>`}
    /* actogram: one row per day, noon to noon */
    const A=N?{x0:58,x1:352,y0:226,rh:6.4,lab:216}:{x0:270,x1:668,y0:40,rh:6.6,lab:30};
    s+=`<text x="${A.x0}" y="${A.lab-12}" class="t-sm" style="fill:var(--night)">${N?'SLEEP EACH NIGHT':'SLEEP EACH NIGHT (NOON TO NOON)'}</text>`;
    [[12,'noon'],[18,'18'],[0,'0:00'],[6,'06'],[12.001,'noon']].forEach(([h,l],k)=>{const x=A.x0+(A.x1-A.x0)*k/4;s+=`<text x="${f1(x)}" y="${A.lab}" class="t-xs t-mid">${l}</text>`});
    for(let d=0;d<=di;d++){const y=A.y0+d*A.rh;s+=sleepbar(A.x0,y,A.x1-A.x0,A.rh-1.6,{sleep:BR_SLEEP[d]}).svg;
      if(d===di)s+=`<rect x="${A.x0-3}" y="${f1(y-1.5)}" width="${A.x1-A.x0+6}" height="${f1(A.rh+1.4)}" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1"/><text x="${A.x1+6}" y="${f1(y+A.rh-1.5)}" class="t-xs" style="fill:var(--ink)">${dur(BR_SLEEP[d])} h</text>`;
      if(d%6===0)s+=`<text x="${A.x0-6}" y="${f1(y+A.rh-1.5)}" class="t-xs t-end">day ${d+1}</text>`}
    /* mood chart */
    const M=N?{x:20,y:410,w:356,h:132,ax:552}:{x:270,y:222,w:398,h:124,ax:352};
    s+=`<text x="${M.x}" y="${M.y-8}" class="t-sm" style="fill:var(--up)">MOOD</text>`;
    const lc=lifechart(M.x,M.y,M.w,M.h,mood,{upto:t,labels:true,dot:true,id:'brlc'});s+=lc.svg;
    [1,7,13,19,24].forEach(d=>{const x=M.x+M.w*(d-1)/(BR_D-1);s+=`<text x="${f1(x)}" y="${M.ax+2}" class="t-xs t-mid">${d}</text>`});
    s+=`<text x="${M.x+M.w}" y="${M.ax+15}" class="t-xs t-end">day</text>`;
    s+=chain(N,ph,lp);
    svg.innerHTML=s;setA(ph);$('#brNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#brPlay'),draw,16000,'Replay','brain');
  const setA=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= brain regions + dopamine synapse ================= */
  const bs=$('#brBr'),br=$('#brBrT');let layer='cortex';
  function drawB(t){
    const N=vb(bs,'720 420','400 830'),L=BR_L[layer],m=lerp(-.9,.9,t);
    const B=N?{cx:200,cy:196,s:2}:{cx:205,cy:190,s:2.05};const P=(a,b)=>[B.cx+a*B.s,B.cy+b*B.s];
    let s=`<text x="${N?16:20}" y="20" class="t-sm" style="fill:var(--brand)">${L.k.toUpperCase()}</text><text x="${N?386:396}" y="${N?38:20}" class="t-xs t-end">← front · side view · back →</text>`;
    const br0=brain(B.cx,B.cy,B.s,{hl:L.hl});s+=br0.svg;
    if(L.thin)s+=`<path d="${BR_OUT}" transform="translate(${B.cx} ${B.cy}) scale(${B.s})" style="fill:none;stroke:var(--down-fill);stroke-width:${f1(5/B.s)};stroke-dasharray:${f1(6/B.s)} ${f1(4/B.s)};opacity:.7"/>`;
    if(L.thal){const [x,y]=P(2,6);s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(9*B.s)}" ry="${f1(6*B.s)}" style="fill:var(--hippo);opacity:.35;stroke:var(--hippo);stroke-width:1.2"/>`}
    if(L.vent){const [x,y]=P(-12,-12);s+=`<path d="M${f1(x-16*B.s)} ${f1(y+2*B.s)}Q${f1(x)} ${f1(y-12*B.s)} ${f1(x+18*B.s)} ${f1(y+4*B.s)}Q${f1(x)} ${f1(y-4*B.s)} ${f1(x-16*B.s)} ${f1(y+2*B.s)}Z" style="fill:var(--down-fill);opacity:.55"/>`}
    if(L.cc){const a=P(-40,-16),c=P(0,-36),b=P(40,-14),a2=P(-36,-28),c2=P(0,-46),b2=P(34,-28);
      s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:var(--down-fill);stroke-width:9;stroke-linecap:round;opacity:.55"/><path d="M${f1(a2[0])} ${f1(a2[1])}Q${f1(c2[0])} ${f1(c2[1])} ${f1(b2[0])} ${f1(b2[1])}" style="fill:none;stroke:var(--down-fill);stroke-width:2.5;stroke-dasharray:5 3;opacity:.8"/>`}
    if(L.ctrl){const a=P(-46,-8),b=P(-10,18);s+=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(a[0]+10)} ${f1(b[1]-4)} ${f1(b[0]-8)} ${f1(b[1])}" style="fill:none;stroke:var(--pfc);stroke-width:2;stroke-dasharray:4 4" marker-end="url(#brA2)"/>`}
    const SL=N?[[14,56,''],[386,56,' t-end'],[14,340,''],[386,340,' t-end']]:[[20,50,''],[396,50,' t-end'],[20,330,''],[396,334,' t-end']];
    (L.marks||[]).forEach(([bx,by,sl,txt])=>{const [x,y]=P(bx,by),[tx,ty,anc]=SL[sl],ex=anc===''?tx+24:tx-24;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.5" style="fill:var(--ink)"/><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(ex)}" y2="${f1(ty+(ty>y?-11:4))}" style="stroke:var(--muted);stroke-width:.8"/><text x="${tx}" y="${ty}" class="t-xs${anc}" style="fill:var(--ink)">${txt}</text>`});
    /* effect sizes or the 29-of-43 grid */
    const E=N?{x:16,y:356,w:368}:{x:20,y:350,w:372};
    if(L.bars){const lx=E.x+150,sc=(E.w-150-44)/.3;
      L.bars.forEach(([l,d],k)=>{const y=E.y+k*17,w=Math.abs(d)*sc;s+=`<text x="${f1(lx-6)}" y="${y+9}" class="t-xs t-end">${l}</text><rect x="${f1(lx)}" y="${y}" width="${f1(w)}" height="11" rx="2" style="fill:${d<0?'var(--down-fill)':'var(--good)'};opacity:.85"/><text x="${f1(lx+w+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${d<0?'−':'+'}${Math.abs(d).toFixed(2)}</text>`});
      s+=`<text x="${f1(lx)}" y="${E.y+L.bars.length*17+10}" class="t-xs">Cohen's d: ${L.bars[0][1]<0?'vs controls':'lithium vs no lithium'}</text>`}
    if(L.grid){const [k,n]=L.grid;for(let i=0;i<n;i++){const x=E.x+(i%22)*15,y=E.y+Math.floor(i/22)*15;s+=`<rect x="${x}" y="${y}" width="12" height="12" rx="2" style="fill:${i<k?'var(--down-fill)':'var(--panel-2)'};stroke:var(--line)"/>`}
      s+=`<text x="${E.x}" y="${E.y+44}" class="t-xs">${k} of ${n} regions with lower fractional anisotropy</text>`}
    /* dopamine synapse */
    const Y0=N?440:0,SX=N?190:555,SY=Y0+(N?175:165),ss=N?1.8:1.8;
    s+=`<line x1="${N?16:410}" x2="${N?384:410}" y1="${N?Y0+10:14}" y2="${N?Y0+10:404}" class="grid"/>`;
    s+=`<text x="${N?16:430}" y="${Y0+32}" class="t-sm" style="fill:var(--nt)">DOPAMINE SYNAPSE (CARTOON)</text>`;
    const n=clamp(.5+.48*m),dat=Math.round(1+Math.max(0,-m)*4);
    if(m>.15)s+=`<rect x="${f1(SX-50*ss)}" y="${f1(SY+2*ss)}" width="${f1(100*ss)}" height="${f1(14*ss)}" rx="8" style="fill:var(--up-fill);opacity:${f1(m*.35)}"/>`;
    s+=synapse(SX,SY,ss,{n,seed:7});
    for(let k=0;k<dat;k++){const x=SX+(-30+k*15)*ss,y=SY-8*ss;s+=`<path d="M${f1(x-4)} ${f1(y-6)}v8a4 4 0 0 0 8 0v-8" style="fill:none;stroke:var(--down-fill);stroke-width:2.6"/>`}
    const st=m<-.3?'depression':m>.3?'mania':'steady mood';
    s+=`<text x="${f1(SX+50*ss)}" y="${f1(SY-36*ss)}" class="t-xs">nerve ending</text><text x="${f1(SX+50*ss)}" y="${f1(SY+22*ss)}" class="t-xs">receptors</text>`;
    s+=`<path d="M${f1(SX+46*ss)} ${f1(SY-12*ss)}l4 0" style="stroke:var(--down-fill);stroke-width:2.6"/><text x="${f1(SX+50*ss)}" y="${f1(SY-9*ss)}" class="t-xs">DAT</text>`;
    /* mood scale */
    const mx0=N?40:440,mx1=N?360:700,my=SY+125;
    s+=`<line x1="${mx0}" x2="${mx1}" y1="${my}" y2="${my}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    s+=`<text x="${mx0}" y="${my+18}" class="t-xs" style="fill:var(--down)">depression</text><text x="${(mx0+mx1)/2}" y="${my+18}" class="t-xs t-mid" style="fill:var(--eu)">steady</text><text x="${mx1}" y="${my+18}" class="t-xs t-end" style="fill:var(--up)">mania</text>`;
    s+=`<circle cx="${f1(lerp(mx0,mx1,t))}" cy="${my}" r="7" style="fill:${m<-.3?'var(--down-fill)':m>.3?'var(--up-fill)':'var(--eu)'};stroke:var(--panel);stroke-width:2"/>`;
    const lines=m<-.3?[['early','more DAT, less signalling'],['hyp','cycle: receptors turned down']]:m>.3?[['early','more D2/3 receptors available'],['early','over-active reward network']]:[['est','a model for 40+ years'],['hyp','evidence differs by pole']];
    lines.forEach(([kd,tx],k)=>{const y=my+62+k*20;s+=chip(mx0,y,kd,'')+`<text x="${mx0+(kd==='early'?94:kd==='hyp'?72:78)}" y="${y+1}" class="t-xs" style="fill:var(--ink)">${tx}</text>`});
    s+=`<text x="${mx0}" y="${my+38}" class="t-xs">now: <tspan style="font-weight:700;fill:var(--ink)">${st}</tspan> · dopamine release ${n>.65?'high':n<.35?'low':'moderate'}</text>`;
    bs.innerHTML=`<defs>${marker('brA2','var(--pfc)')}</defs>`+s;
    const syn=m<-.3?`${BR_EV.early} In bipolar depression, imaging shows more dopamine transporter, which would lower dopamine signalling; other dopamine findings in depression are inconsistent. <sup class="c" data-ref="Ashok2017" title="Source 16">16</sup>`
      :m>.3?`${BR_EV.early} Converging drug and imaging evidence supports raised dopamine signalling in mania: higher striatal D2/3 receptor availability and an over-active reward-processing network. <sup class="c" data-ref="Ashok2017" title="Source 16">16</sup>`
      :`The dopamine hypothesis holds that too much dopamine signalling underlies mania and too little underlies depression; it has been a key theory for over four decades (${BR_EV.est.replace('Established','Established as a model')}). <sup class="c" data-ref="Ashok2017" title="Source 16">16</sup>`;
    $('#brBrNote').innerHTML=noteHTML(L)+`<div class="kv"><div><dt>Synapse panel · ${st}</dt><dd>${syn}</dd></div><div><dt>A proposed cycle</dt><dd>${BR_EV.hyp} High dopamine in mania may turn receptor sensitivity down, leading into a low-dopamine depressive phase; high-dose dopamine drugs in Parkinson's disease give a similar mania-then-depression picture. Brain glutamate (Glx) is also raised on average. <sup class="c" data-ref="Berk2007,Gigante2012" title="Source 40,173">40,173</sup></dd></div></div>`;
  }
  playWire(br,$('#brBrPlay'),drawB,9000,'Replay','brain');
  $$('[data-brl]').forEach(b=>b.addEventListener('click',()=>{layer=b.dataset.brl;$$('[data-brl]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB(+br.value)}));
  drawB(+br.value);

  /* ================= overlap of two groups for a given d ================= */
  const ov=$('#brOv');let dd=.293;
  const erf=x=>{const s=Math.sign(x),a=Math.abs(x),t=1/(1+.3275911*a);return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-a*a))};
  const Phi=z=>.5*(1+erf(z/Math.SQRT2));
  function drawO(){
    const N=vb(ov,'480 250','400 300'),x0=16,x1=N?384:464,yB=N?250:205,hh=N?170:150,X=z=>lerp(x0,x1,(z+3.6)/7.2);
    const pdf=z=>Math.exp(-z*z/2),cur=(m)=>{let p='';for(let k=0;k<=120;k++){const z=-3.6+7.2*k/120;p+=(k?'L':'M')+f1(X(z))+' '+f1(yB-hh*pdf(z-m))}return p};
    let s=`<path d="${cur(0)}L${x1} ${yB}L${x0} ${yB}Z" style="fill:var(--muted);opacity:.18"/><path d="${cur(0)}" style="fill:none;stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="${cur(-dd)}L${x1} ${yB}L${x0} ${yB}Z" style="fill:var(--down-fill);opacity:.22"/><path d="${cur(-dd)}" style="fill:none;stroke:var(--down-fill);stroke-width:2.2"/>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+15}" class="t-xs t-end">thicker or larger →</text><text x="${x0}" y="${yB+15}" class="t-xs">← thinner or smaller</text>`;
    const ovl=Math.round(200*Phi(-dd/2));
    s+=`<text x="${x0}" y="22" class="t-lbl">The two groups overlap by about ${ovl}%</text><text x="${x0}" y="38" class="t-xs"><tspan style="fill:var(--down-fill)">■ bipolar disorder</tspan>   <tspan style="fill:var(--muted)">■ no bipolar disorder</tspan>   d = −${dd.toFixed(2)}</text>`;
    ov.innerHTML=s}
  $$('[data-brd]').forEach(b=>b.addEventListener('click',()=>{dd=+b.dataset.brd;$$('[data-brd]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawO()}));
  drawO();

  /* ================= kindling: two readings of one association ================= */
  const kd=$('#brKd');let view='data',mix=0,stopK=null;
  const LO=.24,HI=.86,pS=k=>.06+(k-1)*.105;
  function drawK(){
    const N=vb(kd,'720 300','400 440'),V=view,x0=N?40:70,x1=N?384:470,yB=N?320:250,hh=N?220:190,n=8,bw=(x1-x0)/n;
    let s=`<text x="${x0-30}" y="${yB-hh-14}" class="t-sm" style="fill:var(--brand)">RISK OF ANOTHER EPISODE (NO SCALE)</text>`;
    for(let k=1;k<=n;k++){const p=pS(k),tot=LO+(HI-LO)*p,x=x0+(k-1)*bw+bw*.18,w=bw*.64,H=hh*tot;
      if(V==='sev'){const hs=hh*HI*p,hm=hh*LO*(1-p);
        s+=`<rect x="${f1(x)}" y="${f1(yB-H)}" width="${f1(w)}" height="${f1(hs)}" rx="3" style="fill:var(--accent);opacity:.75"/><rect x="${f1(x)}" y="${f1(yB-hm)}" width="${f1(w)}" height="${f1(hm)}" rx="3" style="fill:var(--brand);opacity:.55"/>`}
      else s+=`<rect x="${f1(x)}" y="${f1(yB-H)}" width="${f1(w)}" height="${f1(H)}" rx="3" style="fill:var(--brand);opacity:.75"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${yB+14}" class="t-xs t-mid">${k===n?'8+':k}</text>`}
    s+=`<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="axis"/><text x="${x1}" y="${yB+30}" class="t-xs t-end">number of previous episodes</text>`;
    if(V==='kindle'){let p='';for(let k=1;k<=n;k++){const x=x0+(k-.5)*bw,y=yB-hh*(.98-.09*(k-1)*mix);p+=(k>1?'L':'M')+f1(x)+' '+f1(y);
        const sz=lerp(12,3,(k-1)/(n-1))*mix+3;s+=`<path d="M${f1(x+bw*.3)} ${f1(y-sz)}l${f1(-sz*.5)} ${f1(sz)}h${f1(sz*.5)}l${f1(-sz*.4)} ${f1(sz)}" style="fill:none;stroke:var(--up-fill);stroke-width:1.8;stroke-linejoin:round"/>`}
      s+=`<path d="${p}" style="fill:none;stroke:var(--up-fill);stroke-width:2;stroke-dasharray:5 4"/><text x="${x0+bw*1.6}" y="${f1(yB-hh*.98+4)}" class="t-xs" style="fill:var(--up)">trigger needed to start an episode (proposed)</text>`}
    if(V==='sev'){const yH=yB-hh*HI,yL=yB-hh*LO;
      s+=`<g style="opacity:${f1(mix)}"><line x1="${x0}" x2="${x1}" y1="${f1(yH)}" y2="${f1(yH)}" style="stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/><line x1="${x0}" x2="${x1}" y1="${f1(yL)}" y2="${f1(yL)}" style="stroke:var(--brand);stroke-width:2;stroke-dasharray:6 4"/></g>`}
    const lx=N?x0:x1+22,ly=N?yB-hh-2:yB-hh+10;
    const leg=V==='sev'?[['var(--accent)','more severe from the start: high, flat risk'],['var(--brand)','milder course: low, flat risk'],['var(--muted)','bar = the mix at that episode count']]
      :V==='kindle'?[['var(--brand)','observed: risk rises'],['var(--up-fill)','proposed: smaller triggers suffice']]:[['var(--brand)','rate of recurrence rises'],['var(--muted)','with each previous episode']];
    if(!N)leg.forEach(([c,l],k)=>{const words=l.split(': ');s+=`<rect x="${lx}" y="${ly+k*34-9}" width="10" height="10" rx="2" style="fill:${c}"/><text x="${lx+16}" y="${ly+k*34}" class="t-xs" style="fill:var(--ink)">${words[0]}${words[1]?':':''}</text>${words[1]?`<text x="${lx+16}" y="${ly+k*34+13}" class="t-xs">${words[1]}</text>`:''}`});
    else leg.forEach(([c,l],k)=>{s+=`<rect x="${x0-30}" y="${yB+48+k*16}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${x0-16}" y="${yB+56+k*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    kd.innerHTML=s;$('#brKdNote').innerHTML=noteHTML(BR_K[V]);
  }
  $$('[data-brk]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.brk;$$('[data-brk]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopK)stopK();mix=0;stopK=animate(700,p=>{mix=ease(p);drawK()},()=>{stopK=null})}));
  mix=1;drawK();
  const prevR=redraws.brain;redraws.brain=()=>{prevR&&prevR();drawO();drawK()};
};
/* =============== 2.1 DSM-5-TR criteria =============== */
/* Seven Criterion B symptoms in DIGFAST order (a memory aid, not DSM wording) */
const CR_MAN=[['D','Distractibility','Distractibility'],['I','Risky activities','Excessive involvement in activities with a high potential for painful consequences'],
 ['G','Grandiosity','Inflated self-esteem or grandiosity'],['F','Racing thoughts','Flight of ideas, or racing thoughts'],
 ['A','More activity','Increased goal-directed activity or psychomotor agitation'],['S','Less need for sleep','Decreased need for sleep'],['T','Talkative, pressured','More talkative than usual, or pressure to keep talking']];
const CR_DEP=[['Depressed mood','Depressed mood'],['Loss of interest','Markedly diminished interest or pleasure'],['Weight / appetite','Significant weight or appetite change'],
 ['Sleep too little/much','Insomnia or hypersomnia'],['Agitation or slowing','Psychomotor agitation or retardation'],['Fatigue','Fatigue or loss of energy'],
 ['Worthless or guilty','Feelings of worthlessness or excessive guilt'],['Poor concentration','Diminished ability to think, concentrate or decide'],['Thoughts of death','Recurrent thoughts of death or suicide']];
const CR_MODES={
 mania:{name:'Manic episode',col:'var(--up)',fill:'var(--up-fill)',soft:'var(--up-soft)',need:7,max:10,unit:'day',gates:[['A','Mood + energy','≥ 1 week','Mood'],['B','Symptoms','3 of 7 (4)','Sympt.'],['C','Severity','any 1 of 3','Impact'],['D','Cause','rule out causes','Cause']],
  lit:[5,6,3,4],verdict:'Manic episode: criteria met',vsub:'One lifetime manic episode = bipolar I'},
 hypo:{name:'Hypomanic episode',col:'var(--up)',fill:'var(--up-fill)',soft:'var(--up-soft)',need:4,max:10,unit:'day',gates:[['A','Mood + energy','≥ 4 days','Mood'],['B','Symptoms','3 of 7 (4)','Sympt.'],['C','Severity','seen, not severe','Impact'],['D','Cause','rule out causes','Cause']],
  lit:[5,6,3,4],verdict:'Hypomanic episode: criteria met',vsub:'With a major depression, never mania = bipolar II'},
 mde:{name:'Major depressive episode',col:'var(--down)',fill:'var(--down-fill)',soft:'var(--down-soft)',need:14,max:21,unit:'day',gates:[['A','5 of 9 symptoms','same 2 weeks','5 of 9'],['B','Distress','or impairment','Distress'],['C','Cause','rule out causes','Cause']],
  lit:[0,3,5,7,6],verdict:'Major depressive episode: criteria met',vsub:'In bipolar disorder, this is bipolar depression'}};
/* the five animation slots and which block each one builds, per mode */
const CR_SLOTS=[[0,.2],[.22,.4],[.42,.58],[.6,.76],[.78,.92]];
const CR_STEPSET={
 mania:[
  {from:0,at:.12,k:'Criterion A',t:'Mood and energy for a week',
   txt:`Two things must both be present: a distinct period of abnormally and persistently elevated, expansive or irritable mood, <b>and</b> abnormally and persistently increased activity or energy. Together they last at least 1 week and are present most of the day, nearly every day, or any duration if hospitalisation is necessary. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`A high or irritable mood on its own is not enough. Energy or activity must be up too, and it has to last about a week.`,
   hook:`Mania: at least 1 week, or any duration if hospitalised. Since DSM-5, Criterion A needs increased activity or energy as well as the mood change. <sup class="c" data-ref="Yatham2018,Grunze2021" title="Source 197,525">197,525</sup>`},
  {from:.22,at:.34,k:'Criterion B',t:'Three of seven symptoms',
   txt:`At least 3 of 7 symptoms, present to a significant degree and a noticeable change from usual behaviour: grandiosity, decreased need for sleep, more talkative or pressured, flight of ideas or racing thoughts, distractibility, increased goal-directed activity or agitation, and risky activities with painful consequences. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Sleeping much less but not feeling tired, talking fast, thoughts racing, starting many projects: a cluster of changes, not one.`,
   hook:`DIGFAST (a memory aid): Distractibility, Irresponsibility, Grandiosity, Flight of ideas, Activity, Sleep need down, Talkativeness.`},
  {from:.42,at:.52,k:'Criterion B',t:'Four if mood is only irritable',
   txt:`If the mood change is only irritable, with no elevated or expansive mood, the bar rises to 4 of the 7 symptoms. Irritability is common to many conditions, so it needs more company before it counts. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Irritability alone is less specific, so the rule asks for one more symptom.`,
   hook:`3 of 7, or 4 of 7 when the mood is irritable only.`},
  {from:.6,at:.7,k:'Criterion C',t:'Impairment, hospital or psychosis',
   txt:`At least one of: marked impairment in social or occupational functioning, hospitalisation to prevent harm to self or others, or psychotic features. This is the gate that separates mania from hypomania. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Mania is severe enough to seriously disrupt life, to need hospital care, or to come with losing touch with reality.`,
   hook:`Any psychotic features make the episode manic, never hypomanic. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
  {from:.78,at:.95,k:'Criterion D',t:'Not due to a substance or illness',
   txt:`The episode is not attributable to the physiological effects of a substance (a drug of abuse, a medication, another treatment) or to another medical condition. One exception matters: a full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's physiological effect counts, and so does bipolar I. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Doctors check that a medicine, a drug or a physical illness is not causing the high before calling it mania.`,
   hook:`At least one lifetime manic episode is required, and is enough, for bipolar I disorder. <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>`}],
 hypo:[
  {from:0,at:.12,k:'Criterion A',t:'Mood and energy for 4 days',
   txt:`The same two-part change as mania, elevated, expansive or irritable mood plus increased activity or energy, lasting at least 4 consecutive days and present most of the day, nearly every day. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Hypomania is a milder high that lasts at least 4 days in a row.`,
   hook:`Hypomania: at least 4 consecutive days. Shorter (2–3-day) hypomanias with major depressions fall under "other specified bipolar and related disorder". <sup class="c" data-ref="APA2022,Severus2014" title="Source 15,452">15,452</sup>`},
  {from:.22,at:.34,k:'Criterion B',t:'The same three of seven',
   txt:`The same Criterion B list as mania, 3 of 7 symptoms (4 if the mood is only irritable), persisting and present to a significant degree. The symptom list does not separate mania from hypomania; severity and duration do. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`The symptoms are the same kind as in mania. What differs is how long and how severe.`,
   hook:`Hypomania and mania share Criterion B; they differ in duration (4 days vs 1 week) and severity.`},
  {from:.42,at:.52,k:'Criterion B',t:'Four if mood is only irritable',
   txt:`As in mania, an irritable-only mood needs 4 of the 7 symptoms. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`With irritability alone, one more symptom is needed.`,
   hook:``},
  {from:.6,at:.7,k:'Severity',t:'Noticed by others, not severe',
   txt:`The episode brings an unequivocal change in functioning, uncharacteristic of the person, that others can observe. But it is not severe enough to cause marked impairment or to need hospitalisation. If there are psychotic features, the episode is by definition manic. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Other people notice the change, but it does not wreck work or home life.`,
   hook:`Hypomania: observable change, no marked impairment, no hospitalisation, no psychosis. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
  {from:.78,at:.95,k:'Exclusion',t:'Not due to a substance or illness',
   txt:`As for mania, the episode must not be attributable to a substance or another medical condition. A full hypomanic episode that emerges on antidepressant treatment and persists at a fully syndromal level beyond the drug's physiological effect counts as hypomania. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup> Bipolar II needs at least one hypomanic episode and at least one major depressive episode, and never a manic episode. <sup class="c" data-ref="APA2022,Yatham2018,McIntyre2020Lancet" title="Source 15,320,525">15,320,525</sup>`,
   pt:`Bipolar II is not "bipolar lite": its low periods can be just as heavy and long as in bipolar I.`,
   hook:`Bipolar II = at least one hypomanic + at least one major depressive episode, never mania. <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>`}],
 mde:[
  {from:0,at:.12,k:'Criterion A',t:'Five of nine symptoms',
   txt:`Five or more of nine symptoms during the same 2-week period, a change from previous functioning: depressed mood, loss of interest or pleasure, weight or appetite change, insomnia or hypersomnia, agitation or slowing, fatigue, worthlessness or excessive guilt, poor concentration or indecision, and recurrent thoughts of death or suicide. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`A depressive episode is a cluster of changes in mood, sleep, energy, thinking and interest that lasts at least two weeks.`,
   hook:`Major depressive episode: 5 of 9 symptoms for 2 weeks. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
  {from:.22,at:.34,k:'Criterion A',t:'One must be a core symptom',
   txt:`At least one of the five must be depressed mood or markedly diminished interest or pleasure. Five symptoms without either of these do not make a major depressive episode. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
   pt:`Low mood, or losing interest in things you usually enjoy, has to be part of the picture.`,
   hook:`Core symptoms: depressed mood or anhedonia; at least one is required.`},
  {from:.42,at:.52,k:'Criterion A',t:'The same two weeks',
   txt:`The symptoms must be present during the same 2-week period. Weeks spent mildly low, below this threshold, are common in bipolar disorder: in a bipolar I cohort, subsyndromal and minor symptoms were nearly three times as frequent as full episodes. <sup class="c" data-ref="APA2022,Judd2002" title="Source 15,246">15,246</sup>`,
   pt:`Two weeks is the minimum. Shorter or milder low patches still matter and are worth telling the care team about.`,
   hook:`Duration thresholds: mania 7 days, hypomania 4 days, major depression 14 days. <sup class="c" data-ref="APA2022" title="Source 15">15</sup>`},
  {from:.6,at:.7,k:'Criterion B',t:'Distress or impairment',
   txt:`The episode must cause clinically significant distress or impairment in social, occupational or other important areas of functioning. <sup class="c" data-ref="APA2022" title="Source 15">15</sup> In the World Mental Health surveys, 74.0% of people with bipolar depression reported severe role impairment, compared with 50.9% with mania. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>`,
   pt:`Depression in bipolar disorder often disrupts life more than the highs do.`,
   hook:``},
  {from:.78,at:.95,k:'Criterion C',t:'Not due to a substance or illness',
   txt:`The episode is not attributable to a substance or another medical condition. There is no separate criteria set for "bipolar depression": it is a major depressive episode in someone with bipolar disorder, and no single feature distinguishes it from unipolar depression. <sup class="c" data-ref="APA2022,Yatham2018,Mitchell2008" title="Source 15,342,525">15,342,525</sup>`,
   pt:`The same depression checklist is used whether or not someone has bipolar disorder. The history of highs makes the difference.`,
   hook:`No pathognomonic feature separates bipolar from unipolar depression; a probabilistic approach is proposed. <sup class="c" data-ref="Mitchell2008" title="Source 342">342</sup>`}]};
function crIco(k,x,y,on,col){const c=on?col:'var(--muted)',op=on?1:.4,st=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;let s=`<g opacity="${op}">`;
  if(k==='imp')s+=`<rect x="${f1(x-12)}" y="${f1(y-6)}" width="24" height="16" rx="3" ${st}/><path d="M${f1(x-5)} ${f1(y-6)}V${f1(y-10)}H${f1(x+5)}V${f1(y-6)}M${f1(x-12)} ${f1(y+1)}H${f1(x+12)}" ${st}/>`;
  else if(k==='hosp')s+=`<rect x="${f1(x-12)}" y="${f1(y-11)}" width="24" height="22" rx="3" ${st}/><path d="M${f1(x)} ${f1(y-6)}V${f1(y+6)}M${f1(x-6)} ${f1(y)}H${f1(x+6)}" style="stroke:${c};stroke-width:3;stroke-linecap:round"/>`;
  else if(k==='psy')s+=`<path d="M${f1(x-12)} ${f1(y+4)}C${f1(x-18)} ${f1(y-6)} ${f1(x-6)} ${f1(y-14)} ${f1(x)} ${f1(y-8)}C${f1(x+6)} ${f1(y-14)} ${f1(x+18)} ${f1(y-6)} ${f1(x+12)} ${f1(y+4)}Z" ${st}/><path d="M${f1(x-4)} ${f1(y-2)}a4 4 0 1 1 4 4" ${st}/><circle cx="${f1(x-8)}" cy="${f1(y+10)}" r="2" style="fill:${c}"/>`;
  else if(k==='eye')s+=`<path d="M${f1(x-14)} ${f1(y)}Q${f1(x)} ${f1(y-12)} ${f1(x+14)} ${f1(y)}Q${f1(x)} ${f1(y+12)} ${f1(x-14)} ${f1(y)}Z" ${st}/><circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:${c}"/>`;
  else if(k==='dist')s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="11" ${st}/><path d="M${f1(x-5)} ${f1(y-3)}h.1M${f1(x+5)} ${f1(y-3)}h.1" style="stroke:${c};stroke-width:3;stroke-linecap:round"/><path d="M${f1(x-5)} ${f1(y+6)}Q${f1(x)} ${f1(y+1)} ${f1(x+5)} ${f1(y+6)}" ${st}/>`;
  return s+'</g>'}
const crMark=(x,y,ok)=>ok?`<path d="M${f1(x-5)} ${f1(y)}l4 4l7 -8" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(x-5)} ${f1(y-5)}l10 10M${f1(x+5)} ${f1(y-5)}l-10 10" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`;
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT'),st=$('#crSteps');let mode='mania';
  const steps=CR_STEPSET.mania.slice();
  function slotP(t,i){return ramp(t,CR_SLOTS[i][0],CR_SLOTS[i][1])}
  function draw(t){
    const N=vb(svg,'720 380','400 '+(mode==='mde'?660:640)),M=CR_MODES[mode],ph=phaseOf(steps,t);setA(ph);
    const L=N?{g:[16,10,368],A:[16,68,368],B:[16,226,368],C:[16,mode==='mde'?440:418,368],D:[16,mode==='mde'?560:540,368]}:{g:[16,10,688],A:[16,70,330],B:[366,70,338],C:[16,232,330],D:[366,290,338]};
    /* block progress: which slot builds which block */
    const S=i=>slotP(t,i);
    const P=mode==='mde'?{A:S(2),B:S(0),core:S(1),irr:0,C:S(3),D:S(4)}:{A:S(0),B:S(1),core:0,irr:S(2),C:S(3),D:S(4)};
    const V=ramp(t,.9,.98);
    let s='';
    /* gates row */
    const ng=M.gates.length,gw=(L.g[2]-(ng-1)*10)/ng;
    const gp=mode==='mde'?[P.B>0&&P.A>=1&&P.core>=1?1:Math.min(P.B,.99),P.C,P.D]:[P.A,Math.max(P.B*.99,P.irr),P.C,P.D];
    M.gates.forEach((g,i)=>{const x=L.g[0]+i*(gw+10),y=L.g[1],p=gp[i],done=p>=1,act=p>0&&!done;
      s+=`<rect x="${f1(x)}" y="${y}" width="${f1(gw)}" height="46" rx="10" style="fill:${done?'var(--dx-soft)':'var(--panel)'};stroke:${act||done?'var(--dx)':'var(--line)'};stroke-width:${act?2.4:1.2}"/>`;
      s+=`<rect x="${f1(x)}" y="${y+42}" width="${f1(gw*clamp(p))}" height="4" rx="2" style="fill:var(--dx)"/>`;
      s+=`<text x="${f1(x+10)}" y="${y+21}" style="font:800 ${N?16:18}px var(--display);fill:${act||done?'var(--dx)':'var(--muted)'}">${g[0]}</text>`;
      s+=`<text x="${f1(x+(N?24:30))}" y="${y+18}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink);font-weight:700">${N?g[3]:g[1]}</text>`;
      if(!N)s+=`<text x="${f1(x+30)}" y="${y+33}" class="t-xs">${g[2]}</text>`;
      if(done)s+=crMark(x+gw-14,y+16,true);
      if(i<ng-1)s+=`<path d="M${f1(x+gw+1)} ${y+23}l7 0" style="stroke:var(--muted);stroke-width:1.4" />`});
    /* block A: mood + energy cards and the duration bar */
    {const [x,y,w]=L.A,p=P.A,on=p>0;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'DURATION · THE SAME 2-WEEK PERIOD':'A · MOOD AND ENERGY, BOTH NEEDED'}</text>`;
      let by=y+20;
      if(mode!=='mde'){const cw=(w-34)/2,irrOnly=P.irr>.3,mood=irrOnly?'Irritable mood only':'Elevated / expansive';
        [[mood,irrOnly?'(no elevated mood)':'or irritable mood'],['More activity/energy','abnormal, persistent']].forEach((c,i)=>{const cx=x+i*(cw+34),lit=p>(i?.3:.05);
          s+=`<rect x="${f1(cx)}" y="${by}" width="${f1(cw)}" height="40" rx="9" style="fill:${lit?M.soft:'var(--panel-2)'};stroke:${lit?M.fill:'var(--line)'};stroke-width:1.4"/>`;
          s+=`<text x="${f1(cx+cw/2)}" y="${by+17}" class="t-mid" style="font:700 11.5px var(--body);fill:${lit?'var(--ink)':'var(--muted)'}">${c[0]}</text><text x="${f1(cx+cw/2)}" y="${by+31}" class="t-xs t-mid">${c[1]}</text>`});
        s+=`<text x="${f1(x+cw+17)}" y="${by+25}" class="t-mid" style="font:800 12px var(--mono);fill:${p>.3?'var(--dx)':'var(--muted)'}">AND</text>`;
        by+=52}
      else{s+=`<text x="${x}" y="${by+12}" class="t-xs">symptoms cluster in one 2-week stretch</text>`;by+=26}
      /* duration bar */
      const bx=x+4,bw=w-8,X=d=>bx+bw*d/M.max,need=M.need,goal=mode==='mania'?8:mode==='hypo'?5:15,days=goal*ease(p);
      s+=`<rect x="${bx}" y="${by+8}" width="${bw}" height="16" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(days>0)s+=`<rect x="${bx}" y="${by+8}" width="${f1(Math.max(16,X(Math.min(days,M.max))-bx))}" height="16" rx="8" style="fill:${M.fill};opacity:.85"/>`;
      for(let d=0;d<=M.max;d+=(mode==='mde'?7:1)){const xx=X(d);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${by+26}" y2="${by+30}" class="axis"/>`;if(mode==='mde'||d%2===0||d===need)s+=`<text x="${f1(xx)}" y="${by+41}" class="t-xs t-mid">${d}</text>`}
      s+=`<line x1="${f1(X(need))}" x2="${f1(X(need))}" y1="${by+2}" y2="${by+30}" style="stroke:var(--dx);stroke-width:2;stroke-dasharray:3 2"/>`;
      s+=`<text x="${f1(X(need))}" y="${by}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">${need===7?'1 week':need===4?'4 days':'2 weeks'}</text>`;
      const met=days>=need;
      s+=`<text x="${bx}" y="${by+58}" class="t-sm" style="fill:${met?'var(--good)':'var(--ink)'}">${on?(met?'✓ ':'')+'day '+Math.max(1,Math.floor(days))+(met?' · duration met':''):'days, most of the day, nearly every day'}</text>`;
      if(mode==='mania')s+=`<text x="${bx}" y="${by+72}" class="t-xs">or any length if hospitalised</text>`;
      if(mode==='hypo')s+=`<text x="${bx}" y="${by+72}" class="t-xs">4 consecutive days</text>`;
      }
    /* block B: symptom tiles */
    {const [x,y,w]=L.B,list=mode==='mde'?CR_DEP:CR_MAN,n=list.length,cols=2,tw=(w-8)/2,th=N?25:24,gap=N?5:4;
      const irrOnly=P.irr>.3,thr=mode==='mde'?5:(irrOnly?4:3),thrX=mode==='mde'?5:lerp(3,4,ease(ramp(P.irr,.25,.6)));
      let lit=0;const litSet=new Set();
      const base=mode==='mde'?5:3;const kOn=Math.floor(P.B*base+1e-6)+(mode!=='mde'&&P.irr>.75?1:0);
      M.lit.slice(0,Math.min(M.lit.length,kOn)).forEach(i=>litSet.add(i));lit=litSet.size;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'A · SYMPTOMS, 5 OF 9':'B · SYMPTOMS, 3 OF 7 (4 IF ONLY IRRITABLE)'}</text>`;
      list.forEach((it,i)=>{const r=Math.floor(i/cols),c=i%cols,tx=x+c*(tw+8),ty=y+16+r*(th+gap),on=litSet.has(i),core=mode==='mde'&&i<2;
        const coreHi=core&&P.core>0;
        s+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw)}" height="${th}" rx="7" style="fill:${on?M.soft:'var(--panel)'};stroke:${coreHi?'var(--dx)':on?M.fill:'var(--line)'};stroke-width:${coreHi?2.4:1.2}"/>`;
        if(mode!=='mde')s+=`<text x="${f1(tx+12)}" y="${f1(ty+th/2+5)}" class="t-mid" style="font:800 14px var(--display);fill:${on?M.col:'var(--muted)'}">${it[0]}</text>`;
        s+=`<text x="${f1(tx+(mode==='mde'?9:24))}" y="${f1(ty+th/2+4)}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}${on?';font-weight:600':''}">${mode==='mde'?it[0]:it[1]}</text>`;
      });
      /* counter gauge */
      const gy=y+16+Math.ceil(n/cols)*(th+gap)+6,cw=(w-60)/n;
      for(let i=0;i<n;i++)s+=`<rect x="${f1(x+i*cw)}" y="${gy}" width="${f1(cw-3)}" height="12" rx="3" style="fill:${i<lit?M.fill:'var(--panel-2)'};stroke:var(--line)"/>`;
      const tX=x+thrX*cw-1.5;s+=`<line x1="${f1(tX)}" x2="${f1(tX)}" y1="${gy-5}" y2="${gy+17}" style="stroke:var(--dx);stroke-width:2.4"/>`;
      const okB=lit>=thr&&(mode!=='mde'||P.core>0||P.B<1);
      s+=`<text x="${f1(x+w)}" y="${gy+11}" class="t-end" style="font:700 15px var(--mono);fill:${lit>=thr?'var(--good)':'var(--ink)'}">${lit}/${thr}</text>`;
      if(mode!=='mde'&&P.irr>.3&&P.irr<.75)s+=`<text x="${f1(tX+6)}" y="${gy+28}" class="t-xs" style="fill:var(--bad)">irritable only: 3 is not enough</text>`;
      else if(mode!=='mde'&&P.irr>=.75)s+=`<text x="${f1(tX+6)}" y="${gy+28}" class="t-xs" style="fill:var(--good)">4th symptom: threshold met</text>`;
      if(mode==='mde'&&P.core>.2)s+=`<text x="${x}" y="${gy+28}" class="t-xs" style="fill:var(--good)">outlined = core; depressed mood is one ✓</text>`;
      void okB}
    /* block C: severity */
    {const [x,y,w]=L.C,p=P.C;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mania'?'C · AT LEAST ONE OF THESE':mode==='hypo'?'SEVERITY · NOTICED, NOT SEVERE':'B · DISTRESS OR IMPAIRMENT'}</text>`;
      const iy=y+40;
      if(mode==='mania'){const it=[['imp','Marked','impairment'],['hosp','Hospital care','to prevent harm'],['psy','Psychotic','features']],cw=w/3;
        it.forEach((c,i)=>{const cx=x+cw*i+cw/2,on=i===0&&p>.35;s+=crIco(c[0],cx,iy,on,'var(--up)')+`<text x="${f1(cx)}" y="${iy+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${c[1]}</text><text x="${f1(cx)}" y="${iy+40}" class="t-xs t-mid">${c[2]}</text>`});
        if(p>.6)s+=`<text x="${x}" y="${iy+62}" class="t-sm" style="fill:var(--good)">✓ marked impairment → mania, not hypomania</text>`}
      else if(mode==='hypo'){const on=p>.2;s+=crIco('eye',x+22,iy,on,'var(--up)')+`<text x="${x+22}" y="${iy+28}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">seen by</text><text x="${x+22}" y="${iy+40}" class="t-xs t-mid">others</text>`;
        if(on)s+=crMark(x+44,iy-12,true);
        const it=[['imp','marked impairment'],['hosp','hospital'],['psy','psychosis']],cw=(w-70)/3;
        it.forEach((c,i)=>{const cx=x+70+cw*i+cw/2,sh=p>.45+i*.12;s+=crIco(c[0],cx,iy,false,'var(--up)')+`<text x="${f1(cx)}" y="${iy+28}" class="t-xs t-mid">${c[1]}</text>`;if(sh)s+=`<path d="M${f1(cx-15)} ${iy-14}L${f1(cx+15)} ${iy+14}" style="stroke:var(--bad);stroke-width:2.4;stroke-linecap:round"/>`});
        if(p>.85)s+=`<text x="${x}" y="${iy+62}" class="t-sm" style="fill:var(--good)">✓ observable change, none of the three</text>`}
      else{const on=p>.25;s+=crIco('dist',x+22,iy,on,'var(--down)')+crIco('imp',x+70,iy,on,'var(--down)');
        s+=`<text x="${x+100}" y="${iy-4}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">clinically significant distress,</text><text x="${x+100}" y="${iy+9}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">or impairment at work, home, socially</text>`;
        if(p>.6)s+=`<text x="${x}" y="${iy+46}" class="t-sm" style="fill:var(--good)">✓ distress or impairment present</text>`}}
    /* block D: cause filter and verdict */
    {const [x,y,w]=L.D,p=P.D;
      s+=`<text x="${x}" y="${y+6}" class="t-sm" style="fill:var(--dx)">${mode==='mde'?'C':mode==='hypo'?'EXCLUSION':'D'} · RULE OUT OTHER CAUSES</text>`;
      const ch=['drugs','medicines','illness'],cw=(w-8)/3;
      ch.forEach((c,i)=>{const cx=x+i*(cw+4),sh=p>.15+i*.22;s+=`<rect x="${f1(cx)}" y="${y+14}" width="${f1(cw)}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--line);opacity:${sh?1:.45}"/><text x="${f1(cx+cw/2+(sh?6:0))}" y="${y+29}" class="t-xs t-mid" style="${sh?'text-decoration:line-through':''}">${c}</text>`;
        if(sh)s+=crMark(cx+12,y+21,false)});
      if(V>0){const vy=y+44;s+=`<g opacity="${f1(V)}"><rect x="${x}" y="${vy}" width="${w}" height="${N?40:34}" rx="9" style="fill:var(--good-soft);stroke:var(--good)"/>`+crMark(x+16,vy+(N?16:13),true)+`<text x="${x+30}" y="${vy+(N?16:15)}" style="font:700 ${N?12:12.5}px var(--body);fill:var(--good)">${M.verdict}</text><text x="${x+30}" y="${vy+(N?31:28)}" class="t-xs" style="fill:var(--ink)">${M.vsub}</text></g>`}}
    svg.innerHTML=s;
    $('#crNote').innerHTML=noteHTML(steps[ph]);
    $('#crRead').innerHTML=`<span>Episode <b>${M.name}</b></span><span>Duration needed <b>${M.need===7?'7 days':M.need===4?'4 days':'14 days'}</b></span><span>Symptoms needed <b>${mode==='mde'?'5 of 9':'3 of 7 (4)'}</b></span>`;
  }
  const stop=playWire(rg,$('#crPlay'),draw,15000,'Replay','criteria');
  const setA=stepWire(st,steps,rg,draw,stop);
  $$('[data-crm]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.crm;$$('[data-crm]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    steps.splice(0,steps.length,...CR_STEPSET[mode]);$$('[data-st] span',st).forEach((sp,i)=>{sp.textContent=steps[i].t});draw(+rg.value)}));
  draw(+rg.value);

  /* ---------------- criteria counter ---------------- */
  $('#crManBox').innerHTML=CR_MAN.map((m,i)=>`<label><input type="checkbox" data-crs="${i}"><span class="crletter">${m[0]}</span> ${m[2]}</label>`).join('');
  $('#crDepBox').innerHTML=CR_DEP.slice(2).map((m,i)=>`<label><input type="checkbox" data-crd="${i+2}"> ${m[1]}</label>`).join('');
  const form=$('#crForm'),ms=$('#crMeter');
  const chk=k=>{const e=$(`[data-cr="${k}"]`,form);return !!(e&&e.checked)};
  function evaluate(){
    const el=chk('el'),irr=chk('irr'),en=chk('en'),dep=chk('dep'),anh=chk('anh'),obs=chk('obs'),imp=chk('imp'),hosp=chk('hosp'),psy=chk('psy'),dist=chk('dist'),sub=chk('sub');
    const nB=$$('[data-crs]',form).filter(x=>x.checked).length,nDo=$$('[data-crd]',form).filter(x=>x.checked).length,nD=nDo+(dep?1:0)+(anh?1:0);
    const dur=+$('#crDur').value,up=el||irr,irrOnly=irr&&!el,needB=irrOnly?4:3;
    const A=up&&en,B=nB>=needB,D=!sub;
    const man={A:A&&(dur>=7||hosp),B,C:imp||hosp||psy,D};
    const hyp={A:A&&dur>=4,B,C:obs&&!(imp||hosp||psy),D};
    const mde={A:nD>=5&&(dep||anh),T:dur>=14,B:dist||imp,C:D};
    return {el,irr,en,dep,anh,obs,imp,hosp,psy,dist,sub,nB,nD,dur,up,irrOnly,needB,man,hyp,mde,
      manOK:man.A&&man.B&&man.C&&man.D,hypOK:hyp.A&&hyp.B&&hyp.C&&hyp.D,mdeOK:mde.A&&mde.T&&mde.B&&mde.C}}
  function drawMeter(R){const N=vb(ms,'720 150','400 196');let s='';
    const rows=[{l:'Manic symptoms (B)',n:R.nB,max:7,thr:R.needB,c:'var(--up-fill)',sub:R.irrOnly?'need 4: mood only irritable':'need 3'},
      {l:'Depressive symptoms',n:R.nD,max:9,thr:5,c:'var(--down-fill)',sub:'need 5, one of them core'}];
    const lx=N?16:16,bx=N?16:200,bw=N?368:420,rh=N?62:38;
    rows.forEach((r,i)=>{const y=N?14+i*rh:18+i*rh,yy=N?y+18:y,cw=bw/r.max;
      s+=`<text x="${lx}" y="${N?y+6:yy+11}" class="t-lbl">${r.l}</text>`;if(!N)s+=`<text x="${lx}" y="${yy+24}" class="t-xs">${r.sub}</text>`;else s+=`<text x="${lx+bw}" y="${y+6}" class="t-xs t-end">${r.sub}</text>`;
      for(let k=0;k<r.max;k++)s+=`<rect x="${f1(bx+k*cw)}" y="${yy}" width="${f1(cw-4)}" height="16" rx="4" style="fill:${k<r.n?r.c:'var(--panel-2)'};stroke:var(--line)"/>`;
      const tx=bx+r.thr*cw-2;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${yy-5}" y2="${yy+21}" style="stroke:var(--dx);stroke-width:2.4"/>`;
      s+=`<text x="${f1(N?bx+bw:bx+bw+16)}" y="${N?yy+32:yy+13}" class="${N?'t-end':''}" style="font:700 14px var(--mono);fill:${r.n>=r.thr?'var(--good)':'var(--ink)'}">${r.n}/${r.thr}</text>`});
    /* duration ruler */
    const y=N?150:104,X=d=>bx+bw*Math.min(d,15)/15;
    s+=`<text x="${lx}" y="${N?y-14:y+4}" class="t-lbl">Duration</text>`;
    s+=`<rect x="${bx}" y="${y-6}" width="${bw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${y-6}" width="${f1(Math.max(12,X(R.dur)-bx))}" height="12" rx="6" style="fill:var(--dx);opacity:.75"/>`;
    [[4,'4 d'],[7,'7 d'],[14,'14 d']].forEach(([d,l])=>{const xx=X(d);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-10}" y2="${y+10}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(xx)}" y="${y+22}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="${f1(N?lx:bx)}" y="${y+38}" class="t-xs">lines: hypomania 4 days · mania 7 days · depression 14 days</text>`;
    ms.innerHTML=s}
  function render(){const R=evaluate();drawMeter(R);
    const li=(ok,txt)=>`<li><span class="${ok?'ok':'no'}">${ok?'✓':'✗'}</span><span>${txt}</span></li>`;
    const card=(title,ok,items,extra,tagc)=>`<div class="card"><span class="tag ${tagc}">${ok?'Pattern fits':'Not met'}</span><h4>${title}</h4><ul>${items}</ul>${extra?`<p>${extra}</p>`:''}</div>`;
    const m=R.man,h=R.hyp,d=R.mde;
    let manX='',hypX='',mdeX='';
    if(R.up&&!R.en)manX=hypX='Since DSM-5, a mood change alone is not enough: increased activity or energy is needed too. <sup class="c" data-ref="Yatham2018,Grunze2021" title="Source 197,525">197,525</sup>';
    if(R.psy&&h.A&&h.B&&!R.sub)hypX='Psychotic features make an episode manic by definition, never hypomanic. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>';
    if(R.up&&R.en&&R.dur===2.5&&R.nB>=R.needB)hypX='A 2–3-day high is too short for hypomania. With major depressive episodes, DSM-5 lists it as an example of "other specified bipolar and related disorder". <sup class="c" data-ref="Severus2014,APA2022" title="Source 15,452">15,452</sup>';
    if(R.sub)manX=hypX=mdeX='When a substance, medicine or medical condition explains the episode, it is classed as substance/medication-induced or due to another medical condition. A full episode that persists beyond the substance\'s physiological effect counts towards bipolar disorder. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>';
    if(d.T&&R.nD>=5&&!(R.dep||R.anh))mdeX='Five symptoms are present, but neither depressed mood nor loss of interest: at least one core symptom is required. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>';
    let html=card('Manic episode',R.manOK,
      li(m.A,`Mood + energy for ≥ 1 week${R.hosp?' (any length: hospitalised)':''}`)+li(m.B,`${R.nB} of 7 symptoms (need ${R.needB})`)+li(m.C,'Marked impairment, hospital or psychosis')+li(m.D,'Not explained by a substance or illness'),manX,R.manOK?'good':'');
    html+=card('Hypomanic episode',R.hypOK&&!R.manOK,
      li(h.A,'Mood + energy for ≥ 4 consecutive days')+li(h.B,`${R.nB} of 7 symptoms (need ${R.needB})`)+li(h.C,'Noticed by others, but no marked impairment, hospital or psychosis')+li(h.D,'Not explained by a substance or illness'),R.manOK&&R.hypOK?'':hypX,R.hypOK&&!R.manOK?'good':'');
    html+=card('Major depressive episode',R.mdeOK,
      li(d.A,`${R.nD} of 9 symptoms, incl. depressed mood or loss of interest (need 5)`)+li(d.T,'Same 2-week period')+li(d.B,'Distress or impairment')+li(d.C,'Not explained by a substance or illness'),mdeX,R.mdeOK?'good':'');
    const both=(R.manOK||R.hypOK)&&R.nD>=3||(R.mdeOK&&R.nB>=3);
    let sum='';
    if(R.manOK)sum='This made-up pattern matches the published definition of a manic episode. In DSM-5-TR, one lifetime manic episode is enough for bipolar I disorder, but only a clinician can make that judgement. <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>';
    else if(R.hypOK)sum='This made-up pattern matches the definition of a hypomanic episode. Bipolar II also needs at least one major depressive episode and never a manic one. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>';
    else if(R.mdeOK)sum='This made-up pattern matches a major depressive episode. On its own it cannot tell unipolar from bipolar depression; the history of any highs does. <sup class="c" data-ref="Yatham2018,Mitchell2008" title="Source 342,525">342,525</sup>';
    else sum='No full episode definition is met. Symptoms below threshold still matter and are worth raising with a clinician. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>';
    if(both)sum+=' Symptoms from both poles at once: DSM-5 handles this with a "mixed features" specifier rather than a separate mixed episode. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>';
    html+=`<div class="card" style="grid-column:1/-1"><span class="tag dx">Teaching summary</span><p>${sum}</p><p class="stage-cap">A teaching tool, not a diagnosis.</p></div>`;
    $('#crOut').innerHTML=html}
  form.addEventListener('change',()=>{$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed','false'));render()});
  const EX={crEx1:{c:['el','en','imp'],s:[5,6,3,4],d:[],dur:'10'},crEx2:{c:['el','en','obs'],s:[5,6,2],d:[],dur:'5'},crEx3:{c:['dep','anh','dist'],s:[],d:[3,5,7],dur:'14'}};
  function setEx(id){const e=EX[id];$$('input[type=checkbox]',form).forEach(x=>x.checked=false);
    e.c.forEach(k=>{$(`[data-cr="${k}"]`,form).checked=true});e.s.forEach(i=>{$(`[data-crs="${i}"]`,form).checked=true});e.d.forEach(i=>{$(`[data-crd="${i}"]`,form).checked=true});
    $('#crDur').value=e.dur;$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed',b.id===id));render()}
  Object.keys(EX).forEach(id=>$('#'+id).addEventListener('click',()=>setEx(id)));
  $('#crReset').addEventListener('click',()=>{$$('input[type=checkbox]',form).forEach(x=>x.checked=false);$('#crDur').value='5';$$('#crEx1,#crEx2,#crEx3').forEach(b=>b.setAttribute('aria-pressed','false'));render()});
  render();
  const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();render()};
};
/* =============== 2.2 Bipolar I, II, cyclothymia & specifiers =============== */
inits.types=()=>{
  const MO=36,U=m=>m/MO;
  const T=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const K=a=>moodSeries(a.map(([m,v])=>[U(m),v]));
  /* cyclothymia: numerous highs and lows that never reach a full episode */
  const cyK=[[0,0]];for(let i=1;i<=24;i++){const m=i*1.5-.4,sg=i%2?1:-1;cyK.push([m,sg*(.2+.12*(((i*37)%5)/4))])}cyK.push([36,.05]);
  const LANES=[
    {k:'bp1',n:'Bipolar I disorder',f:K([[0,0],[2,.02],[3,-.3],[4,-.62],[5.5,-.6],[6.5,-.2],[7.5,0],[13,.03],[13.6,.4],[14.2,.8],[15.2,.85],[15.9,.4],[16.6,.02],[23,-.02],[24,-.4],[25,-.66],[26.5,-.6],[27.5,-.1],[28.5,0],[36,.02]]),
     marks:[{m:3.6,lab:'MDE',c:'var(--down)',note:'not required'},{m:13.6+7/30,lab:'Mania ≥7 d',c:'var(--up)',key:true}],
     rules:[{t:'≥1 manic episode',at:13.6+7/30}],dx:13.6+7/30,extra:'Depression may or may not occur'},
    {k:'bp2',n:'Bipolar II disorder',f:K([[0,0],[3.6,.02],[3.9,.3],[4.15,.36],[4.4,.3],[4.7,.03],[9,0],[9.6,-.35],[10.4,-.66],[12,-.68],[13,-.3],[13.7,-.02],[19.5,.02],[19.8,.3],[20.1,.34],[20.4,.05],[26,0],[26.6,-.4],[27.5,-.7],[29.5,-.6],[30.5,-.1],[31.5,0],[36,0]]),
     marks:[{m:3.85+4/30,lab:'Hypo ≥4 d',c:'var(--up)',key:true},{m:9.55+14/30,lab:'MDE ≥14 d',c:'var(--down)',key:true}],
     rules:[{t:'≥1 hypomanic episode',at:3.85+4/30},{t:'≥1 major depressive episode',at:9.55+14/30},{t:'never a manic episode',at:-1,keep:true}],dx:9.55+14/30},
    {k:'cy',n:'Cyclothymic disorder',f:K(cyK),marks:[{m:24,lab:'2 years',c:'var(--dx)',key:true}],
     rules:[{t:'≥2 years of numerous sub-threshold highs and lows',at:24,bar:true},{t:'never a full episode',at:-1,keep:true}],dx:24}
  ];
  const STEPS=[
    {from:0,at:U(1.2),k:'Month 0 · three people',t:'Three life charts',
     txt:`Each lane is one invented person's mood over three years. The diagnosis comes from the <b>pattern of episodes over a lifetime</b>, not from a single visit, a blood test or a scan. That is why clinicians ask about the past, and why a family member's memory of the "highs" can help. <sup class="c" data-ref="APA2022,Yatham2018,NICE2014CG185" title="Source 15,372,525">15,372,525</sup>`,
     pt:`Doctors diagnose bipolar disorder from your story over time. Telling them about any past spells of unusual energy, little need for sleep or racing thoughts helps.`,
     hook:`BP-I = ≥1 manic episode. BP-II = ≥1 hypomanic + ≥1 major depressive episode, never mania. Cyclothymia = ≥2 years of sub-threshold swings (1 year in youth). <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(3.4),at:U(4.6),k:'Months 3–5 · not yet',t:'One episode is not always enough',
     txt:`The bipolar II lane has its first hypomanic episode: 4 days have passed, so it counts as hypomania, but bipolar II also needs a major depressive episode. Meanwhile the bipolar I lane shows a major depressive episode. A depression on its own is not bipolar disorder, and most people with bipolar disorder first present with depression, which is why the diagnosis is often delayed. <sup class="c" data-ref="APA2022,Yatham2018,Grande2016" title="Source 15,191,525">15,191,525</sup>`,
     pt:`A single low, or a single short high, does not make the diagnosis. The full picture can take time to appear.`,
     hook:`The commonest misdiagnosis of bipolar disorder is unipolar depression. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`},
    {from:U(9.4),at:U(10.8),k:'Month 10 · rule met',t:'Bipolar II: hypomania + depression',
     txt:`Once a major depressive episode has lasted 2 weeks, the bipolar II lane has both building blocks: at least one hypomanic and at least one major depressive episode, and never a manic one. If a manic episode ever occurred, the diagnosis would change to bipolar I. Bipolar II is not a milder illness: in a 13.4-year follow-up, people with bipolar II had depressive symptoms in 50.3% of weeks. <sup class="c" data-ref="APA2022,Yatham2018,Judd2003" title="Source 15,247,525">15,247,525</sup>`,
     pt:`In bipolar II the highs are milder, but the lows can be long and heavy. It is a serious illness in its own right, and it is treatable.`,
     hook:`BP-II requires the depression. Hypomania alone does not make BP-II. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(13.4),at:U(14.8),k:'Month 14 · rule met',t:'Bipolar I: one manic episode is enough',
     txt:`After a week of mania (or any length, if hospital care is needed), the bipolar I lane meets its rule. Depression is not required, though most people with bipolar I also have depressive episodes. A full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's effect also counts. ICD-11 gives the same result with one manic or mixed episode. <sup class="c" data-ref="APA2022,McIntyre2020Lancet,Yatham2018,Stein2020BMC" title="Source 15,320,475,525">15,320,475,525</sup>`,
     pt:`One manic episode is enough for a diagnosis of bipolar I.`,
     hook:`Antidepressant-emergent mania that persists at full syndromal level beyond the drug's physiological effect counts toward BP-I (new in DSM-5). <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(21.5),at:U(24.6),k:'Month 24 · rule met',t:'Cyclothymia: two years of swings',
     txt:`The cyclothymia lane never reaches a full episode, yet the highs and lows keep coming. After at least 2 years of numerous hypomanic and depressive periods that do not meet episode criteria (at least 1 year in children and adolescents), cyclothymic disorder can be diagnosed. CANMAT places it at the mild end of the bipolar spectrum, but Van Meter and colleagues describe it as highly impairing and often missed. <sup class="c" data-ref="APA2022,Yatham2018,VanMeter2012" title="Source 15,503,525">15,503,525</sup>`,
     pt:`Cyclothymia means mood that goes up and down a lot for years, without reaching full mania or full depression. It can still make life hard, and it deserves care.`,
     hook:`Cyclothymic disorder: ≥2 years (adults), ≥1 year (youth); full manic, hypomanic or major depressive criteria never met. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {from:U(27),at:U(33),k:'Months 27–36 · the long view',t:'Depression dominates the long course',
     txt:`Across the three lanes, the lows take more time than the highs. Although mania defines bipolar I, depressive episodes and symptoms dominate the long-term course and account for a disproportionate share of the burden; CANMAT estimates that depression takes up to two-thirds of the time spent unwell, even with treatment. Effective treatments exist for every phase. <sup class="c" data-ref="McIntyre2020Lancet,Yatham2018" title="Source 320,525">320,525</sup>`,
     pt:`For most people the low times are the bigger challenge. That is why treatment plans focus on preventing depression as well as mania.`,
     hook:`Rapid cycling (≥4 episodes in 12 months) has a pooled lifetime prevalence of 35.5% in bipolar disorder. See the specifier overlay below. <sup class="c" data-ref="Miola2023,Strawbridge2022" title="Source 340,478">340,478</sup>`}
  ];
  const svg=$('#tySvg'),rg=$('#tyT'),note=$('#tyNote'),read=$('#tyRead');
  function lane(L,i,x,y,w,h,m,N){
    let s='';const lc=lifechart(x,y,w,h,L.f,{upto:U(m),id:'tyL'+i,dot:true,lw:2.2});
    s+=lc.svg;
    let prevX=-1e3,lv=0;
    L.marks.forEach(M=>{if(m<M.m)return;const px=lc.X(U(M.m));lv=px-prevX<95?lv+1:0;prevX=px;const oy=lv*12;
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(y)}" y2="${f1(y+h)}" style="stroke:${M.c};stroke-width:${M.key?1.6:1};stroke-dasharray:${M.key?'0':'3 3'};opacity:.9"/>`;
      const right=px<x+w-90,lx=right?px+4:px-4;
      s+=T(lx,y+11+oy,M.lab,'t-xs'+(right?'':' t-end'),`fill:${M.c};font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px`);
      if(M.note)s+=T(lx,y+22+oy,M.note,'t-xs'+(right?'':' t-end'),'paint-order:stroke;stroke:var(--panel);stroke-width:3px')});
    return s;
  }
  function rules(L,x,y,w,m,N){
    let s='';const met=m>=L.dx;
    s+=T(x,y,L.n,'t-lbl',met?'fill:var(--dx)':'');
    let yy=y+(N?16:17);
    L.rules.forEach(R=>{const ok=R.keep?true:m>=R.at;
      s+=`<rect x="${f1(x)}" y="${f1(yy-9)}" width="11" height="11" rx="2.5" style="fill:${ok?(R.keep?'var(--panel-2)':'var(--good)'):'none'};stroke:${ok&&!R.keep?'var(--good)':'var(--muted)'}"/>`;
      if(ok)s+=`<path d="M${f1(x+2.5)} ${f1(yy-3.5)}l2.5 2.5l4-5" style="fill:none;stroke:${R.keep?'var(--muted)':'var(--panel)'};stroke-width:1.6;stroke-linecap:round"/>`;
      if(R.bar){const bw=Math.min(w-18,N?150:116);s+=T(x+17,yy,`${Math.min(24,Math.floor(m))} / 24 months`,'t-xs','fill:var(--ink)');
        s+=`<rect x="${f1(x+17)}" y="${f1(yy+4)}" width="${f1(bw)}" height="5" rx="2.5" style="fill:var(--panel-2)"/><rect x="${f1(x+17)}" y="${f1(yy+4)}" width="${f1(bw*clamp(m/24))}" height="5" rx="2.5" style="fill:var(--dx)"/>`;
        yy+=14;s+=T(x+17,yy+7,N?'numerous sub-threshold highs and lows':'of sub-threshold swings','t-xs');yy+=(N?15:15)}
      else s+=T(x+17,yy,R.t,'t-xs',ok&&!R.keep?'fill:var(--ink)':'');
      yy+=N?14:15});
    s+=T(x,yy+(N?2:4),met?'✓ rule met':'not yet','t-sm',`font-weight:600;fill:${met?'var(--good)':'var(--muted)'}`);
    return s;
  }
  function tyLegend(x,y,two){const it=[['var(--up-fill)','mania / hypomania'],['var(--eu)','steady'],['var(--down-fill)','depression']];let s='',xx=x,yy=y;
    it.forEach(([c,l],i)=>{if(two&&i===1){xx=x;yy+=15}s+=`<rect x="${f1(xx)}" y="${f1(yy-7)}" width="12" height="4" rx="2" style="fill:${c}"/>`+T(xx+16,yy-3,l,'t-xs');xx+=26+l.length*6.2});return s}
  function draw(t){
    const N=vb(svg,'720 470','400 724'),m=t*MO;
    let s='';
    if(N){
      LANES.forEach((L,i)=>{const y0=10+i*226;
        s+=rules(L,14,y0+12,372,m,N);
        s+=lane(L,i,40,y0+100,346,104,m,N)});
      s+=tline(40,10+3*226-14,346,{min:0,max:MO,step:6,label:'months'}).svg;
      s+=tyLegend(14,714);
    }else{
      LANES.forEach((L,i)=>{const y0=16+i*140;
        s+=rules(L,10,y0+14,170,m,N);
        s+=lane(L,i,196,y0,510,118,m,N)});
      s+=tline(196,16+3*140-4,510,{min:0,max:MO,step:3,label:'months'}).svg;
      s+=tyLegend(10,446,true);
    }
    svg.innerHTML=s;
    const i=phaseOf(STEPS,t);setA(i);note.innerHTML=noteHTML(STEPS[i]);
    const met=LANES.filter(L=>m>=L.dx).map(L=>L.n.replace(' disorder',''));
    read.innerHTML=`<span>Month <b>${f1(m)}</b></span><span>Rules met <b>${met.length?met.join(', '):'none yet'}</b></span>`;
  }
  const stop=playWire(rg,$('#tyPlay'),draw,15000,'Replay','types');
  const setA=stepWire($('#tySteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- specifier overlay: one illustrative year ---------- */
  const SY=12,SU=m=>m/SY;
  const sf=moodSeries([[0,0],[.6,.05],[.85,.32],[1.1,.36],[1.35,.06],[1.6,0],[3.2,0],[3.6,-.4],[4.2,-.66],[5,-.6],[5.4,-.1],[5.8,0],[7.4,.02],[7.8,.5],[8.2,.84],[8.55,.6],[8.9,-.1],[9.3,-.55],[10,-.6],[10.5,-.1],[11,0],[12,0]].map(([m,v])=>[SU(m),v]));
  const SEP=[{a:.8,b:1.4,n:'Hypomanic',c:'var(--up)'},{a:3.5,b:5.5,n:'Depressive',c:'var(--down)'},{a:7.65,b:8.85,n:'Manic',c:'var(--up)'},{a:8.85,b:10.5,n:'Depressive',c:'var(--down)'}];
  const MON=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const SEAS=[[0,1,'summer','var(--up-soft)'],[1,4,'autumn','var(--accent-soft)'],[4,7,'winter','var(--down-soft)'],[7,10,'spring','var(--eu-soft)'],[10,12,'summer','var(--up-soft)']];
  const SPN={
    rapid:{k:'Course specifier',t:'With rapid cycling',
      txt:`At least 4 distinct mood episodes (manic, hypomanic or major depressive) within 12 months, in any order, each separated by partial or full remission of at least 2 months or by a switch to the opposite polarity. Here the count reaches 4 when the second depression begins straight after the mania: a switch. An umbrella meta-review of 13,698 people found a pooled 1-year prevalence of 22.3% and lifetime prevalence of 35.5%, higher in women, with strong evidence linking rapid cycling to suicide attempts and poorer response to mood stabilisers. NICE recommends offering the same interventions as for other types, as there is "no strong evidence" they should differ. <sup class="c" data-ref="Strawbridge2022,APA2022,Miola2023,NICE2014CG185" title="Source 15,340,372,478">15,340,372,478</sup>`,
      pt:`Rapid cycling means four or more mood episodes in one year. It is common at some point in the illness, and it can change over time.`,
      hook:`Rapid cycling: ≥4 episodes in 12 months, separated by ≥2 months of remission or a polarity switch. ICD-11 qualifier 6A80.5. <sup class="c" data-ref="Strawbridge2022,Harter2025" title="Source 206,478">206,478</sup>`},
    mixed:{k:'Episode specifier',t:'With mixed features',
      txt:`Symptoms of the opposite pole during an episode: depressive symptoms during mania or hypomania, or manic symptoms during a major depressive episode. DSM-5 replaced the old categorical mixed episode with this dimensional specifier, and also allows it in major depressive disorder. In the International Mood Disorders Collaborative Project it was common: during depressive episodes in 34.0% (bipolar I) and 33.8% (bipolar II), and during hypo/manic episodes in 20.4% (bipolar I) and 5.1% (bipolar II). <sup class="c" data-ref="Yatham2018,McIntyre2015Mixed" title="Source 319,525">319,525</sup>`,
      pt:`A mixed state is high and low at the same time: wired and restless but also hopeless. It is a time to stay in close touch with the care team.`,
      hook:`DSM-5: mixed features = specifier (can apply to MDD too). ICD-11: mixed episode ≥2 weeks counts toward bipolar type I. <sup class="c" data-ref="Yatham2018,Stein2020BMC" title="Source 475,525">475,525</sup>`},
    psych:{k:'Episode specifier',t:'With psychotic features',
      txt:`Delusions or hallucinations during an episode, coded as mood-congruent (for example grandiose delusions in mania) or mood-incongruent. Psychosis makes an elevated episode manic by definition. In 1,342 people with bipolar I, 73.8% had lifetime psychotic symptoms; in 352 people in the Stanley Network, no single type of psychotic symptom was diagnostically specific. <sup class="c" data-ref="APA2022,Yatham2018,vanBergen2019,Keck2003" title="Source 15,252,498,525">15,252,498,525</sup>`,
      pt:`Some people lose touch with reality during an episode, for example believing they have special powers. This is a symptom of the illness and it gets better with treatment.`,
      hook:`Psychotic features → the episode is mania, not hypomania. ICD-11 subcodes 6A60.0 / 6A60.1: current manic episode without / with psychotic symptoms. <sup class="c" data-ref="APA2022,Harter2025" title="Source 15,206">15,206</sup>`},
    peri:{k:'Episode specifier',t:'With peripartum onset',
      txt:`Used when a manic, hypomanic or depressive episode begins around pregnancy and birth. In 1,785 parous women in the UK Bipolar Disorder Research Network, women with bipolar I had about a 50% risk of a perinatal major mood episode per pregnancy, and most began in the first postpartum month. In a meta-analysis, postpartum relapse was 66% in women with bipolar disorder who were medication-free in pregnancy and 23% in those who used prophylactic medication. Pregnancy is something to plan with the care team; see <a href="#pregnancy" data-go="pregnancy">Pregnancy &amp; the postpartum period</a>. <sup class="c" data-ref="Yatham2018,DiFlorio2013,Wesseloo2016" title="Source 107,519,525">107,519,525</sup>`,
      pt:`The weeks after having a baby are a time of higher risk. Making a plan with the care team before and during pregnancy helps.`,
      hook:`Perinatal episodes: about 50% per pregnancy in BP-I (UK BDRN); most begin in the first postpartum month. <sup class="c" data-ref="DiFlorio2013" title="Source 107">107</sup>`},
    season:{k:'Course specifier',t:'With seasonal pattern',
      txt:`Describes episodes that regularly track the time of year. A systematic review of 51 papers found a seasonal pattern in about 15% of manic and 25% of depressive episodes, with mania peaking in spring and summer and depression in early winter, as in this invented year (which starts in August). One year cannot show a pattern; it takes repetition. ICD-11 has a matching qualifier, 6A80.4. <sup class="c" data-ref="Geoffroy2014,Harter2025,Yatham2018" title="Source 165,206,525">165,206,525</sup>`,
      pt:`For some people, episodes tend to come at the same time each year. Knowing your own pattern can help you and your team plan ahead.`,
      hook:`Seasonality: mania peaks spring/summer, depression early winter (Geoffroy 2014). <sup class="c" data-ref="Geoffroy2014" title="Source 165">165</sup>`}};
  const ON={rapid:true,mixed:false,psych:false,peri:false,season:false};let last='rapid';
  const ssvg=$('#tySpec'),srg=$('#tySpT'),snote=$('#tySpNote');
  function drawS(t){
    const N=vb(ssvg,'720 340','400 372'),m=t*SY;
    const C=N?{x:34,y:78,w:352,h:214}:{x:44,y:74,w:650,h:170};
    let s=`<defs>${marker('tyAr','var(--muted)')}</defs>`;
    const lc=lifechart(C.x,C.y,C.w,C.h,sf,{upto:t,id:'tySp',dot:true,labels:true,mixed:ON.mixed&&m>8.4?[[SU(8.4),SU(Math.min(9.2,m))]]:[]});
    s+=lc.svg;
    const ay=C.y+C.h+16;
    if(ON.season){SEAS.forEach(([a,b,n,c])=>{const x0=lc.X(SU(a)),x1=lc.X(SU(b));s+=`<rect x="${f1(x0)}" y="${f1(ay-8)}" width="${f1(x1-x0)}" height="16" style="fill:${c}"/>`;s+=T((x0+x1)/2,ay+3.5,(x1-x0)<n.length*6.2?n.slice(0,3):n,'t-xs t-mid','fill:var(--ink)')});
      s+=tline(C.x,ay+22,C.w,{min:0,max:SY,step:N?2:1,fmt:v=>v<12?MON[v]:'',label:''}).svg;}
    else s+=tline(C.x,ay,C.w,{min:0,max:SY,step:N?2:1,label:'months'}).svg;
    /* episode count */
    const started=SEP.filter(E=>m>=E.a);
    if(ON.rapid){
      SEP.forEach((E,i)=>{if(m<E.a)return;const x0=lc.X(SU(E.a)),x1=lc.X(SU(Math.min(E.b,m)));
        s+=`<path d="M${f1(x0)} ${f1(C.y-8)}V${f1(C.y-14)}H${f1(x1)}${m>=E.b?`V${f1(C.y-8)}`:''}" style="fill:none;stroke:${E.c};stroke-width:1.4"/>`;
        s+=`<circle cx="${f1(x0)}" cy="${f1(C.y-22)}" r="9" style="fill:${E.c}"/>`+T(x0,C.y-18.5,String(i+1),'t-sm t-mid','fill:var(--panel);font-weight:700')});
      [[1.4,3.5,'≥2 mo'],[5.5,7.65,'≥2 mo']].forEach(([a,b,l])=>{if(m<b)return;const x0=lc.X(SU(a)),x1=lc.X(SU(b)),yy=lc.Y(0)+(N?-14:-12);
        s+=`<path d="M${f1(x0+2)} ${f1(yy)}H${f1(x1-2)}" style="stroke:var(--eu);stroke-width:1.4" marker-start="url(#tyAr)" marker-end="url(#tyAr)"/>`+T((x0+x1)/2,yy-4,l,'t-xs t-mid','fill:var(--eu);font-weight:600')});
      if(m>=8.85){const px=lc.X(SU(8.85));s+=T(px+(N?4:6),lc.Y(.3),'switch','t-xs','fill:var(--mixed);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px')}
      const n=started.length,rc=n>=4;
      s+=T(C.x+C.w,22,`Episodes in 12 months: ${n}`,'t-lbl t-end');
      s+=T(C.x+C.w,38,rc?'≥4 → with rapid cycling':`${4-n} more to reach 4`,'t-sm t-end',`font-weight:600;fill:${rc?'var(--dx)':'var(--muted)'}`);
    }
    if(ON.psych&&m>=8.2){const [px,py]=lc.at(SU(8.2));
      const st=(cx,cy,r)=>{let d='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;d+=(k?'L':'M')+f1(cx+rr*Math.cos(a))+' '+f1(cy+rr*Math.sin(a))}return d+'Z'};
      s+=`<path d="${st(px,py-10,8)}" style="fill:var(--accent);stroke:var(--panel);stroke-width:1.5"/>`;
      const lx=px-16;
      s+=T(lx,py-6,'grandiose delusion','t-xs t-end','fill:var(--accent);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px');
      s+=T(lx,py+4,'(mood-congruent)','t-xs t-end','paint-order:stroke;stroke:var(--panel);stroke-width:3px')}
    if(ON.peri&&m>=3){const px=lc.X(SU(3)),y0=lc.Y(0);
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(C.y)}" y2="${f1(C.y+C.h)}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<g transform="translate(${f1(px)} ${f1(C.y+16)})"><circle r="9" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/><circle cx="0" cy="-2.5" r="2.6" style="fill:var(--accent)"/><path d="M-4 4Q0 -1 4 4" style="fill:var(--accent)"/></g>`;
      s+=T(N?px+5:px+13,N?C.y+40:C.y+20,'delivery','t-xs','fill:var(--accent);font-weight:600;paint-order:stroke;stroke:var(--panel);stroke-width:3px');
      if(m>=3.5){const x1=lc.X(SU(3.55));s+=`<path d="M${f1(px+3)} ${f1(y0+30)}Q${f1((px+x1)/2)} ${f1(y0+44)} ${f1(x1)} ${f1(lc.Y(sf(SU(3.6)))+4)}" class="arrow" marker-end="url(#tyAr)"/>`+T(px-4,y0+56,'onset after birth','t-xs t-end','fill:var(--accent);paint-order:stroke;stroke:var(--panel);stroke-width:3px')}}
    if(ON.season&&!ON.rapid){s+=T(C.x+C.w,22,'Mania in spring, depression in early winter','t-sm t-end','fill:var(--ink);font-weight:600')}
    if(!ON.rapid&&!ON.season)s+=T(C.x+C.w,22,'One illustrative year','t-sm t-end');
    ssvg.innerHTML=s;snote.innerHTML=noteHTML(SPN[last]);
  }
  const stopS=playWire(srg,$('#tySpPlay'),drawS,9000,'Replay','types');
  $$('[data-ts]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ts;ON[k]=!ON[k];b.setAttribute('aria-pressed',ON[k]?'true':'false');
    if(ON[k])last=k;else{const o=Object.keys(ON).filter(x=>ON[x]);last=o.length?o[o.length-1]:k}
    drawS(+srg.value)}));
  drawS(+srg.value);

  /* ---------- vignettes ---------- */
  const OPT={i:'Bipolar I',ii:'Bipolar II',cy:'Cyclothymic disorder',os:'Other specified / none of these'};
  const VIG=[
    {s:`A 24-year-old has 10 days of barely sleeping, racing thoughts, non-stop talking and spending far beyond their means, and is admitted to hospital. They have never had a depressive episode.`,a:'i',
     why:`One manic episode (at least a week, with marked impairment and hospital care) is enough for bipolar I. Depression is not required. <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>`},
    {s:`A 31-year-old has had two long major depressive episodes. Friends recall a 5-day spell last spring when they were unusually energetic, chatty and needed little sleep; they kept working and were not admitted.`,a:'ii',
     why:`At least one hypomanic episode (≥4 days, observable change, no marked impairment) plus at least one major depressive episode, and never mania: bipolar II. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:`For three years a 27-year-old has had frequent short highs and lows. The highs never reach hypomania and the lows never meet criteria for a major depressive episode, but the swings disrupt their life.`,a:'cy',
     why:`At least 2 years of numerous sub-threshold hypomanic and depressive periods, with full episode criteria never met: cyclothymic disorder. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:`A 32-year-old with past major depressions has a 4-day high with decreased need for sleep and grandiosity, and during it becomes convinced they have been chosen to save the world.`,a:'i',
     why:`Psychotic features make an elevated episode manic by definition, whatever its length, so this is bipolar I, not bipolar II. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup> A first manic episode after age 40, neurological signs or an atypical history should also prompt a search for medical causes (secondary mania). <sup class="c" data-ref="Satzer2016" title="Source 439">439</sup>`},
    {s:`A 35-year-old with depression starts an antidepressant. Weeks later a full manic syndrome develops and persists at full intensity well beyond the medicine's physiological effect.`,a:'i',
     why:`Since DSM-5, a full manic episode that emerges during antidepressant treatment and persists at a fully syndromal level beyond the treatment's effect counts as a manic episode, and so bipolar I. DSM-IV did not allow this. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`},
    {s:`A 29-year-old has had several major depressive episodes and, between them, highs that last 2 to 3 days with clearly more energy, talk and activity.`,a:'os',
     why:`Hypomanias shorter than 4 days do not meet DSM-5-TR hypomania, so this is not bipolar II. Short-duration hypomanic episodes (2–3 days) with major depressive episodes are a listed example of other specified bipolar and related disorder. ICD-11's "several days" and Judd's data on brief hypomanias show this line is debated. <sup class="c" data-ref="Severus2014,APA2022,Stein2020BMC,Judd2003" title="Source 15,247,452,475">15,247,452,475</sup>`}
  ];
  const vbox=$('#tyVig'),vscore=$('#tyScore'),vans=store.get('tyVig',{});
  vbox.innerHTML=VIG.map((v,i)=>`<div class="ty-v" data-v="${i}"><span class="kicker">Vignette ${i+1}</span><p>${v.s}</p><div class="ty-opts" role="group" aria-label="Your answer">${Object.keys(OPT).map(k=>`<button type="button" data-va="${k}" aria-pressed="false">${OPT[k]}</button>`).join('')}</div><div class="ty-fb" aria-live="polite"></div></div>`).join('');
  function vset(i,k,save=true){const el=$(`.ty-v[data-v="${i}"]`,vbox),v=VIG[i];
    if(!k){delete vans[i];el.classList.remove('ok','no');$('.ty-fb',el).innerHTML='';$$('[data-va]',el).forEach(b=>b.setAttribute('aria-pressed','false'))}
    else{vans[i]=k;const ok=k===v.a;el.classList.toggle('ok',ok);el.classList.toggle('no',!ok);
      $$('[data-va]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.va===k?'true':'false'));
      $('.ty-fb',el).innerHTML=(ok?'<b>Yes.</b> ':`<b>Not quite: ${OPT[v.a]}.</b> `)+v.why}
    if(save)store.set('tyVig',vans);
    const ks=Object.keys(vans),ok=ks.filter(j=>vans[j]===VIG[j].a).length;
    vscore.textContent=ks.length?`${ks.length} of 6 answered · ${ok} correct`:'0 of 6 answered'}
  vbox.addEventListener('click',e=>{const b=e.target.closest('[data-va]');if(!b)return;vset(+b.closest('.ty-v').dataset.v,b.dataset.va)});
  $('#tyVReset').addEventListener('click',()=>{VIG.forEach((v,i)=>vset(i,null,false));store.set('tyVig',{})});
  Object.keys(vans).forEach(i=>{if(VIG[i]&&OPT[vans[i]])vset(+i,vans[i],false)});
};
/* =============== 2.3 Screening & rating scales =============== */
const SC_ACC={
 mdq:[{lab:'Mood clinics (2000)',se:.73,sp:.90,src:'198 outpatients at five mood-disorder clinics, checked against a blinded SCID',c:'<sup class="c" data-ref="Hirschfeld2000MDQ" title="Source 225">225</sup>'},
      {lab:'US community (2003)',se:.281,sp:.972,src:'a US general-population sample, 695 people interviewed',c:'<sup class="c" data-ref="Hirschfeld2003AJP" title="Source 227">227</sup>'},
      {lab:'Primary care (meta-analysis)',se:.43,sp:.95,src:'summary figures for primary-care or general-population settings at a cut-off of 7',c:'<sup class="c" data-ref="Carvalho2015" title="Source 69">69</sup>'}],
 hcl:[{lab:'Psychiatric services (meta-analysis)',se:.81,sp:.67,src:'summary figures across psychiatric services at recommended cut-offs',c:'<sup class="c" data-ref="Carvalho2015" title="Source 69">69</sup>'},
      {lab:'Spanish validation (cut-off 14)',se:.85,sp:.79,src:'237 people, 14 or more "yes" answers',c:'<sup class="c" data-ref="Vieta2007HCL32" title="Source 506">506</sup>'}]};
const SC_PREV=[{v:.024,lab:'2.4%',who:'a community sample',src:'the lifetime prevalence of the whole bipolar spectrum in the World Mental Health surveys',c:'<sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>'},
 {v:.05,lab:'5%',who:'primary-care patients',src:'an assumed teaching value, inside the 3.4–9% found by structured interview in primary-care patients with depression or psychiatric complaints',c:'<sup class="c" data-ref="Cerimele2013" title="Source 71">71</sup>'},
 {v:.16,lab:'16%',who:'people with a current depressive episode',src:'the share of 5,635 adults with a current major depressive episode who met DSM-IV-TR bipolar criteria in the BRIDGE study',c:'<sup class="c" data-ref="Angst2011BRIDGE" title="Source 13">13</sup>'}];
const SC_YM=[
 {k:'Severity',t:'Where a trial starts',txt:`In a 3-week risperidone trial in 290 inpatients with mania, the mean baseline YMRS was 37.2 on the 0–60 scale. <sup class="c" data-ref="Khanna2005Risperidone" title="Source 276">276</sup> Scores like this come from a clinician rating each item, not from a questionnaire the person fills in. <sup class="c" data-ref="Young1978" title="Source 529">529</sup>`,
  pt:`The scale is a ruler for how severe mania is, used by clinicians to see whether treatment is working.`,hook:`YMRS: 11 items, 0–60, clinician-rated. MADRS: 10 items. <sup class="c" data-ref="Young1978,Pigott2016Cochrane,Montgomery1979" title="Source 348,415,529">348,415,529</sup>`},
 {k:'Change',t:'A fall over one week',txt:`<span class="ev early">Early evidence</span> In a small trial of 23 people hospitalised with mania, orange blue-blocking glasses worn from 6 p.m. to 8 a.m. for 7 days, added to usual treatment, reduced the YMRS by 14.1 points, against 1.7 with clear glasses. <sup class="c" data-ref="Henriksen2016" title="Source 221">221</sup>`,
  pt:`A rating scale lets a team see change in numbers, not just impressions.`,hook:`Rating scales are built to be sensitive to change: the YMRS separated patients before and after two weeks of treatment. <sup class="c" data-ref="Young1978" title="Source 529">529</sup>`},
 {k:'Trial result',t:'Drug against placebo',txt:`In a 3-week trial of cariprazine in 497 people with mania, the YMRS fell 6.1 points more than with placebo at 3–6 mg/day (95% CI −8.4 to −3.8). The difference between groups is smaller than either group's total fall, because people on placebo improve too. <sup class="c" data-ref="Calabrese2015Cariprazine" title="Source 66">66</sup>`,
  pt:`Trials compare how much more a medicine lowers the score than a dummy pill does.`,hook:``},
 {k:'Trial result',t:'Drug against drug',txt:`In GERI-BD, 224 people aged 60 or older with mania were randomised to lithium or divalproex for 9 weeks. YMRS improvement favoured lithium by 3.90 points (97.5% CI 1.71–6.09), while response rates were similar: 79% vs 73%. <sup class="c" data-ref="Young2017GERIBD" title="Source 530">530</sup>`,
  pt:`Two medicines can both help most people, and still differ a little on the scale.`,hook:``}];
inits.screening=()=>{
  /* ---------- icon array ---------- */
  const svg=$('#scSvg'),rg=$('#scT');let tool='mdq',src=0,pv=2;
  const R=rng(23),perm=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[perm[i],perm[j]]=[perm[j],perm[i]]}
  const jit=[...Array(1000)].map(()=>R());
  const calc=()=>{const A=SC_ACC[tool][src],P=SC_PREV[pv],cases=Math.round(1000*P.v),TP=Math.round(cases*A.se),FN=cases-TP,non=1000-cases,FP=Math.round(non*(1-A.sp)),TN=non-FP;
    return {A,P,cases,TP,FN,FP,TN,ppv:TP/Math.max(1,TP+FP),npv:TN/Math.max(1,TN+FN)}};
  const pct=x=>Math.round(x*100)+'%';
  const steps=[
   {from:0,at:.1,k:'Step 1',t:'1,000 people screened',txt:'',pt:`Each dot is a person who fills in the questionnaire.`,hook:``},
   {from:.18,at:.28,k:'Step 2',t:'Who has bipolar disorder',txt:'',pt:`How common the condition is among the people screened changes everything that follows.`,hook:`Positive predictive value depends on prevalence; sensitivity and specificity do not.`},
   {from:.36,at:.46,k:'Step 3 · sensitivity',t:'Cases the screen catches',txt:'',pt:`Sensitivity is the share of people with the condition whom the test flags. The hollow dots are missed.`,hook:`MDQ: sensitivity 0.73 in mood clinics but 0.28 in the general population. <sup class="c" data-ref="Hirschfeld2000MDQ,Hirschfeld2003AJP" title="Source 225,227">225,227</sup>`},
   {from:.56,at:.66,k:'Step 4 · specificity',t:'False alarms',txt:'',pt:`Even a small false-alarm rate produces many false positives when most people screened do not have the condition.`,hook:`MDQ false positives are linked to borderline personality disorder, PTSD, substance use and ADHD. <sup class="c" data-ref="Zimmerman2011MDQ,Zimmerman2010Screening" title="Source 535,536">535,536</sup>`},
   {from:.76,at:.95,k:'Step 5 · predictive value',t:'What a positive means',txt:'',pt:`A positive questionnaire can only say "worth a closer look". Many people who score positive turn out to have something else.`,hook:`Worked example: prevalence 5%, MDQ sensitivity 43% and specificity 95% → about 31% of positive screens are true positives. <sup class="c" data-ref="Carvalho2015" title="Source 69">69</sup>`}];
  function stepText(i,C){const A=C.A,P=C.P;
    return [`Imagine 1,000 ${P.who}. Here ${P.lab} of them have bipolar disorder: ${P.src}. ${P.c}`,
     `That makes <b>${C.cases}</b> people with bipolar disorder and ${1000-C.cases} without. Nothing has been screened yet; this is the starting mix.`,
     `With sensitivity ${A.se} (${A.src}) the ${tool==='mdq'?'MDQ':'HCL-32'} flags <b>${C.TP}</b> of the ${C.cases} (true positives) and misses <b>${C.FN}</b> (false negatives, hollow). ${A.c}`,
     `With specificity ${A.sp}, ${pct(1-A.sp)} of the ${1000-C.cases} people without bipolar disorder still screen positive: <b>${C.FP}</b> false positives (amber). ${A.c}`,
     `Of <b>${C.TP+C.FP}</b> positive screens, <b>${C.TP}</b> have bipolar disorder: a positive predictive value of <b>${pct(C.ppv)}</b>. A negative screen is right ${pct(C.npv)} of the time. Change the prevalence to watch this number move: CANMAT allows such tools only as an adjunct in clinical populations, and NICE advises against questionnaires in primary care. <sup class="c" data-ref="Yatham2018,NICE2014CG185" title="Source 372,525">372,525</sup>`][i]}
  function draw(t){
    const N=vb(svg,'720 380','400 600'),C=calc(),ph=phaseOf(steps,t);setA(ph);
    const p0=ramp(t,0,.16),p1=ramp(t,.18,.32),p2=ramp(t,.36,.52),p3=ramp(t,.56,.72),p4=ease(ramp(t,.76,.94));
    const G=N?{x:24,y:46,d:8.9,r:3.3}:{x:24,y:50,d:10.6,r:3.9},COLS=40,ROWS=25;
    const pos=(slot,cm)=>cm?[G.x+Math.floor(slot/ROWS)*G.d,G.y+(slot%ROWS)*G.d]:[G.x+(slot%COLS)*G.d,G.y+Math.floor(slot/COLS)*G.d];
    let s=`<text x="${G.x}" y="${G.y-22}" class="t-sm" style="fill:var(--dx)">${N?'1,000 PEOPLE':'1,000 PEOPLE SCREENED'} · ${tool==='mdq'?'MDQ':'HCL-32'} · PREVALENCE ${C.P.lab}</text>`;
    /* people in sorted order: TP, FP, FN, TN */
    const cat=i=>i<C.TP?0:i<C.TP+C.FP?1:i<C.TP+C.FP+C.FN?2:3;
    for(let i=0;i<1000;i++){const c=cat(i),isCase=c===0||c===2,a=pos(perm[i],false),b=pos(i,true),x=lerp(a[0],b[0],p4),y=lerp(a[1],b[1],p4),j=jit[i];
      if(p0<=(Math.floor(perm[i]/COLS)/ROWS)*.9)continue;
      let fill='var(--muted)',op=.32,stroke='';
      if(isCase&&p1>j*.8){fill='var(--dx)';op=1}
      if(c===2&&p2>.2+j*.6){fill='none';stroke='var(--dx)';op=1}
      if(c===1&&p3>j*.85){fill='var(--warn)';op=1}
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${G.r}" style="fill:${fill};opacity:${op}${stroke?`;stroke:${stroke};stroke-width:1.3`:''}"/>`;
      if(c===0&&p2>.1+j*.6&&p4<.5)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(G.r+2.2)}" style="fill:none;stroke:var(--good);stroke-width:1.2"/>`}
    const fb=G.y+ROWS*G.d+4;
    if(p4>.6){/* bracket over the positive screens */
      const colsPos=(C.TP+C.FP)/ROWS,x0=G.x-G.d/2,x1=G.x+colsPos*G.d-G.d/2,op=f1(ramp(p4,.6,1));
      s+=`<g opacity="${op}"><path d="M${f1(x0)} ${G.y-12}V${G.y-8}H${f1(x1)}V${G.y-12}" style="fill:none;stroke:var(--ink);stroke-width:1.4" transform="translate(0 0)"/>`;
      s+=`<path d="M${f1(x0)} ${fb}V${fb+5}H${f1(x1)}V${fb}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x0)}" y="${fb+18}" class="t-xs" style="fill:var(--ink);font-weight:700">← ${C.TP+C.FP} positive screens</text></g>`}
    /* legend */
    const lg=[['var(--dx)','has bipolar disorder, flagged',0],['var(--dx)','has it, missed',1],['var(--warn)','false alarm',0],['var(--muted)','no bipolar disorder',0]];
    const ly=N?fb+30:fb+36;lg.forEach((l,i)=>{const lx=G.x+(N?0:[0,170,262,350][i]),yy=N?ly+i*14:ly;
      s+=`<circle cx="${lx+4}" cy="${yy-3}" r="4" style="fill:${l[2]?'none':l[0]};stroke:${l[0]};stroke-width:1.3;opacity:${i===3?.5:1}"/><text x="${lx+12}" y="${yy}" class="t-xs">${l[1]}</text>`});
    /* the 2x2 table and the predictive value */
    const T=N?{x:24,y:370,w:352}:{x:476,y:40,w:228};
    const cw=(T.w-70)/2,rh=40;
    s+=`<text x="${T.x+70+cw/2}" y="${T.y+10}" class="t-xs t-mid" style="fill:var(--dx)">has bipolar</text><text x="${T.x+70+cw*1.5}" y="${T.y+10}" class="t-xs t-mid">does not</text>`;
    const cell=(r,c,v,lab,col,show)=>{const x=T.x+70+c*cw,y=T.y+18+r*rh;return `<rect x="${f1(x+2)}" y="${y}" width="${f1(cw-4)}" height="${rh-4}" rx="7" style="fill:var(--panel-2);stroke:${show?col:'var(--line)'};stroke-width:${show?1.6:1}"/>`+(show?`<text x="${f1(x+cw/2)}" y="${y+18}" class="t-mid" style="font:700 15px var(--mono);fill:var(--ink)">${v}</text><text x="${f1(x+cw/2)}" y="${y+30}" class="t-xs t-mid">${lab}</text>`:'')};
    s+=`<text x="${T.x}" y="${T.y+40}" class="t-xs" style="fill:var(--ink)">screen +</text><text x="${T.x}" y="${T.y+80}" class="t-xs" style="fill:var(--ink)">screen −</text>`;
    s+=cell(0,0,Math.round(C.TP*clamp(p2*1.5)),'true +','var(--good)',p2>0)+cell(0,1,Math.round(C.FP*clamp(p3*1.5)),'false +','var(--warn)',p3>0)+cell(1,0,Math.round(C.FN*clamp(p2*1.5)),'missed','var(--dx)',p2>0)+cell(1,1,Math.round(C.TN*clamp(p3*1.5)),'true −','var(--muted)',p3>0);
    const by=T.y+112;
    s+=`<text x="${T.x}" y="${by}" class="t-sm" style="fill:var(--dx)">OF THE POSITIVE SCREENS</text>`;
    const pw=T.w,pp=C.ppv,shown=ramp(p4,.3,1);
    s+=`<rect x="${T.x}" y="${by+8}" width="${pw}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    if(shown>0){s+=`<rect x="${T.x}" y="${by+8}" width="${f1(pw*pp*shown)}" height="22" rx="6" style="fill:var(--dx)"/><rect x="${f1(T.x+pw*pp*shown)}" y="${by+8}" width="${f1(pw*(1-pp)*shown)}" height="22" style="fill:var(--warn);opacity:.85"/>`;
      s+=`<text x="${T.x}" y="${by+58}" style="font:800 30px var(--display);fill:var(--dx)">${pct(pp*shown)}</text><text x="${T.x+(N?82:76)}" y="${by+46}" class="t-xs" style="fill:var(--ink)">have bipolar disorder</text><text x="${T.x+(N?82:76)}" y="${by+58}" class="t-xs">positive predictive value</text>`;
      s+=`<text x="${T.x}" y="${by+80}" class="t-xs">${pct((1-pp)*shown)} are false alarms (amber)</text>`}
    else s+=`<text x="${T.x}" y="${by+50}" class="t-xs">appears at step 5</text>`;
    if(!N){s+=`<text x="${T.x}" y="${by+112}" class="t-xs">sensitivity ${C.A.se} · specificity ${C.A.sp}</text><text x="${T.x}" y="${by+126}" class="t-xs">${C.A.lab}</text>`}
    else s+=`<text x="${T.x}" y="${by+98}" class="t-xs">sensitivity ${C.A.se} · specificity ${C.A.sp} · ${C.A.lab}</text>`;
    svg.innerHTML=s;
    const P=Object.assign({},steps[ph],{txt:stepText(ph,C)});
    $('#scNote').innerHTML=noteHTML(P);
    $('#scRead').innerHTML=`<span>True + <b>${C.TP}</b></span><span>False + <b>${C.FP}</b></span><span>Missed <b>${C.FN}</b></span><span>PPV <b>${pct(C.ppv)}</b></span><span>NPV <b>${pct(C.npv)}</b></span>`}
  const stop=playWire(rg,$('#scPlay'),draw,14000,'Replay','screening');
  const setA=stepWire($('#scSteps'),steps,rg,draw,stop);
  function srcButtons(){$('#scSrc').innerHTML=`<span class="kicker">Accuracy</span>`+SC_ACC[tool].map((a,i)=>`<button class="btn" data-scsrc="${i}" aria-pressed="${i===src}">${a.lab}</button>`).join('')}
  $('#scSrc').addEventListener('click',e=>{const b=e.target.closest('[data-scsrc]');if(!b)return;src=+b.dataset.scsrc;$$('[data-scsrc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $$('[data-sctool]').forEach(b=>b.addEventListener('click',()=>{tool=b.dataset.sctool;src=0;$$('[data-sctool]').forEach(x=>x.setAttribute('aria-pressed',x===b));srcButtons();draw(+rg.value)}));
  $$('[data-scprev]').forEach(b=>b.addEventListener('click',()=>{pv=+b.dataset.scprev;$$('[data-scprev]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  srcButtons();draw(+rg.value);

  /* ---------- YMRS ruler ---------- */
  const ys=$('#scYm');let yi=0,yp=1,yStop=null;
  function drawY(){const N=vb(ys,'720 240','400 316'),x0=N?24:40,x1=N?376:680,X=v=>x0+(x1-x0)*v/60;let s='';
    const ry=N?86:84;
    s+=`<text x="${x0}" y="20" class="t-sm" style="fill:var(--dx)">YOUNG MANIA RATING SCALE · 0–60 · CLINICIAN-RATED</text>`;
    for(let i=0;i<11;i++){const cx=x0+12+i*(N?18:22);s+=`<circle cx="${cx}" cy="40" r="6" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${cx}" y="43" class="t-mid" style="font:600 7.5px var(--mono);fill:var(--dx)">${i+1}</text>`}
    s+=`<text x="${x0+12+11*(N?18:22)}" y="44" class="t-xs">11 items</text>`;
    s+=`<rect x="${x0}" y="${ry}" width="${x1-x0}" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    for(let v=0;v<=60;v+=10)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ry+16}" y2="${ry+20}" class="axis"/><text x="${f1(X(v))}" y="${ry+31}" class="t-xs t-mid">${v}</text>`;
    const base=37.2*(yi===0?ease(yp):1);
    s+=`<rect x="${x0}" y="${ry}" width="${f1(Math.max(14,X(base)-x0))}" height="14" rx="7" style="fill:var(--up-fill);opacity:${yi===0?.9:.35}"/>`;
    s+=`<path d="M${f1(X(base))} ${ry-3}l-5 -8h10z" style="fill:var(--ink)"/><text x="${f1(X(base))}" y="${ry-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${yi===0?f1(base):'37.2'} trial baseline</text>`;
    /* change bars */
    const bars=[[1,'Blue-blocking glasses, 7 days',14.1,'var(--dx)'],[1,'Clear glasses, 7 days',1.7,'var(--muted)'],[2,'Cariprazine minus placebo, 3 wk',6.1,'var(--rx)'],[3,'Lithium minus divalproex, 9 wk',3.9,'var(--rx)']];
    const by=N?ry+56:ry+50;s+=`<text x="${x0}" y="${by}" class="t-sm" style="fill:var(--dx)">FALL IN YMRS POINTS (SAME SCALE)</text>`;
    bars.forEach((b,i)=>{const y=by+12+i*(N?40:22),on=b[0]===yi,g=on?ease(yp):yi>0&&b[0]<yi?1:on?0:.0,len=b[2]*(on?ease(yp):(b[0]<yi?1:0));
      const lx=N?x0:x0,bx=N?x0:x0+210,ly=N?y+10:y+11;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}${on?';font-weight:700':''}">${b[1]}</text>`;
      const yy=N?y+16:y;s+=`<rect x="${bx}" y="${yy}" width="${f1(X(60)-x0-(N?0:210))}" height="14" rx="4" style="fill:var(--panel-2);opacity:.5"/>`;
      if(len>0)s+=`<rect x="${bx}" y="${yy}" width="${f1((X(len)-x0))}" height="14" rx="4" style="fill:${b[3]};opacity:${on?1:.5}"/><text x="${f1(bx+(X(len)-x0)+6)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${f1(len)}</text>`;
      void g});
    ys.innerHTML=s;$('#scYmNote').innerHTML=noteHTML(SC_YM[yi])}
  $$('[data-scy]').forEach(b=>b.addEventListener('click',()=>{yi=+b.dataset.scy;$$('[data-scy]').forEach(x=>x.setAttribute('aria-pressed',x===b));yStop&&yStop();yp=0;yStop=animate(1100,p=>{yp=p;drawY()},()=>{yStop=null})}));
  drawY();

  /* ---------- mood chart ---------- */
  const ms=$('#scMc'),mr=$('#scMcT');let view='chart';
  const f=moodSeries([[0,.02],[.12,-.04],[.18,.05],[.2,.38],[.235,.42],[.26,.06],[.32,0],[.38,-.12],[.44,-.62],[.58,-.7],[.66,-.55],[.72,-.12],[.8,.02],[.9,-.03],[1,.03]]);
  const fr=moodSeries([[0,0],[.36,-.05],[.44,-.62],[.6,-.68],[.72,-.1],[.82,0],[1,0]]);fr.pole=u=>fr(u)<-EU?'down':'eu';
  const MS=[{from:0,at:.1,k:'Weeks 1–4',t:'Steady weeks',txt:`A daily chart starts in ordinary weeks. The NIMH Life Chart Method rates mood every day by how much it affects functioning. <sup class="c" data-ref="Denicoff2000" title="Source 101">101</sup>`,pt:`A mood chart is a simple daily note of mood, sleep and how the day went.`,hook:`Life-chart mania ratings correlated with the YMRS (r = 0.656), depression ratings with clinician-rated depression (r = −0.785). <sup class="c" data-ref="Denicoff2000" title="Source 101">101</sup>`},
   {from:.17,at:.23,k:'Weeks 5–6',t:'A short high',txt:`A five-day high: little sleep, lots of plans. On a chart it is a clear block; in memory it is easily lost, because insight into highs is often reduced and they can feel good. Under-diagnosis is blamed "especially" on not involving family members or other informants. <sup class="c" data-ref="Ghaemi2002" title="Source 170">170</sup>`,pt:`Family or friends often remember the highs more clearly than the person does.`,hook:`NICE asks clinicians to encourage a family member or carer to give a corroborative history. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
   {from:.36,at:.55,k:'Weeks 9–17',t:'A long low',txt:`A depression of several weeks. This is the part people seek help for, so without the earlier high the picture looks like unipolar depression, the most common misdiagnosis. <sup class="c" data-ref="Yatham2018,Hirschfeld2003" title="Source 226,525">226,525</sup>`,pt:`Most people spend much more time low than high, which is why bipolar disorder is often first mistaken for depression.`,hook:`Most frequent misdiagnosis: major depressive disorder; psychotic disorders second. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`},
   {from:.74,at:.95,k:'Weeks 18–26',t:'Seen over time',txt:`Laid out across months, the chart shows both poles, how long each lasted and what came between. Confirmation is more confident "when episodes are prospectively observed". <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,pt:`Bringing a chart to appointments helps you and your team see the pattern together.`,hook:``}];
  function drawM(t){const N=vb(ms,'720 260','400 300');const L=N?{x:16,y:34,w:368,h:220}:{x:24,y:30,w:672,h:190};
    const g=view==='chart'?f:fr;let s=`<text x="${L.x}" y="18" class="t-sm" style="fill:var(--dx)">${view==='chart'?'DAILY MOOD CHART · 26 WEEKS':'WHAT IS REMEMBERED AT THE APPOINTMENT'}</text>`;
    const lc=lifechart(L.x,L.y,L.w,L.h,g,{upto:t,id:'scmc',labels:true,dot:true});s+=lc.svg;
    if(view==='recall')s+=lifechart(L.x,L.y,L.w,L.h,f,{upto:t,ghost:true}).svg;
    for(let w=0;w<=26;w+=N?13:2){const x=lc.X(w/26);s+=`<text x="${f1(x)}" y="${L.y+L.h+14}" class="t-xs t-mid">${w}</text>`}
    if(t>.24){const [x,y]=lc.at(.22);s+=view==='chart'?`<text x="${f1(x+10)}" y="${f1(y-6)}" class="t-xs" style="fill:var(--up);font-weight:700">5-day high: partner noticed</text>`:`<text x="${f1(x+10)}" y="${f1(lc.Y(.4))}" class="t-xs" style="fill:var(--muted)">(dashed: the high, forgotten)</text>`}
    if(t>.56){const [x,y]=lc.at(.52);s+=`<text x="${f1(x)}" y="${f1(y+18)}" class="t-xs t-mid" style="fill:var(--down);font-weight:700">a long low</text>`}
    ms.innerHTML=s;$('#scMcNote').innerHTML=noteHTML(MS[phaseOf(MS,t)])}
  playWire(mr,$('#scMcPlay'),drawM,9000,'Replay','screening');
  $$('[data-scmc]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.scmc;$$('[data-scmc]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)}));
  drawM(+mr.value);
  const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();drawY()};
};
/* =============== 2.4 Bipolar or something else? =============== */
const DF_BPD_TRIG=[.07,.19,.33,.47,.58,.71,.86];
const DF_LANES=[
 {name:'Bipolar II disorder',nn:'Bipolar II',col:'var(--dx)',
  f:moodSeries([[0,0],[.05,-.04],[.1,-.6],[.22,-.62],[.27,-.05],[.36,0],[.39,.32],[.425,.34],[.455,0],[.55,0],[.6,-.55],[.74,-.6],[.79,0],[.87,.02],[.9,.32],[.93,.32],[.96,.02],[1,0]]),
  feat:'distinct episodes, weeks long, with well intervals'},
 {name:'Recurrent unipolar depression',nn:'Unipolar depression',col:'var(--down)',
  f:moodSeries([[0,0],[.12,-.03],[.18,-.58],[.38,-.64],[.45,-.02],[.62,0],[.69,-.55],[.9,-.6],[.96,-.08],[1,0]]),
  feat:'lows only; no hypomania or mania'},
 {name:'Borderline personality disorder',nn:'Borderline PD',col:'var(--mixed)',
  f:null,feat:'shifts within hours, reactive to stress'},
 {name:'ADHD',nn:'ADHD',col:'var(--rx)',
  f:null,feat:'constant, not episodic; since childhood'},
 {name:'Substance- or medication-induced',nn:'Substance-induced',col:'var(--warn)',
  f:moodSeries([[0,0],[.36,0],[.42,.08],[.48,.6],[.56,.6],[.6,.45],[.64,.08],[.68,0],[1,0]]),
  feat:'starts and stops with the substance'}];
DF_LANES[2].f=(()=>{const g=u=>{let v=-.1+.16*Math.sin(u*97)+.1*Math.sin(u*233+1);DF_BPD_TRIG.forEach(tg=>{const d=u-tg;if(d>=0&&d<.035)v-=.62*Math.exp(-d*90)*(d<.004?d/.004:1)});return clamp(v,-1,1)};g.pole=u=>{const v=g(u);return v>EU?'up':v<-EU?'down':'eu'};return g})();
DF_LANES[3].f=(()=>{const g=u=>.04+.05*Math.sin(u*61)+.03*Math.sin(u*151);g.pole=()=>'eu';return g})();
const DF_STEPS=[
 {from:0,at:.12,k:'Lane 1',t:'Bipolar II: distinct episodes',
  txt:`Bipolar mood changes are sustained episodes: lows lasting weeks and hypomanic highs of at least 4 days, with well intervals between. <sup class="c" data-ref="Paris2015,APA2022" title="Source 15,398">15,398</sup> Over 13.4 years, people with bipolar II had depressive symptoms in 50.3% of weeks and hypomanic symptoms in only 1.3%, which is why the highs are easy to miss. <sup class="c" data-ref="Judd2003" title="Source 247">247</sup>`,
  pt:`Bipolar disorder comes in episodes that last days to weeks, with steadier periods in between.`,
  hook:`Bipolar II: at least one hypomanic + one major depressive episode, never mania. Depression dominates the course. <sup class="c" data-ref="APA2022,Judd2003" title="Source 15,247">15,247</sup>`},
 {from:.15,at:.27,k:'Lane 2',t:'Unipolar depression: lows only',
  txt:`Features that favour unipolar depression include initial insomnia, weight loss, later onset, long episodes and no family history of bipolar disorder; CANMAT's working thresholds are onset after 25 and a current episode longer than 6 months. <sup class="c" data-ref="Mitchell2008,Yatham2018" title="Source 342,525">342,525</sup> But the line can move: in a meta-analysis, 22.5% of people with major depression developed bipolar disorder over 12–18 years, most often in the first 5. <sup class="c" data-ref="Ratheesh2017" title="Source 424">424</sup>`,
  pt:`A first depression can be the first sign of bipolar disorder, so doctors keep asking about highs over time.`,
  hook:`The most frequent misdiagnosis of bipolar disorder is major depressive disorder. <sup class="c" data-ref="Yatham2018,Hirschfeld2003" title="Source 226,525">226,525</sup>`},
 {from:.3,at:.42,k:'Lane 3',t:'Borderline PD: reactive shifts',
  txt:`Both involve affective instability, but in borderline personality disorder mood shifts are transient and reactive to interpersonal stress (the flashes), while bipolar mood changes are sustained. <sup class="c" data-ref="Paris2015" title="Source 398">398</sup> In borderline personality disorder "true euphoria and prolonged well-functioning intervals are extremely rare", and the pattern begins early and is long-standing. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,
  pt:`Mood that swings within hours after an argument or a rejection is a different pattern from a week-long high.`,
  hook:`Separating validators: childhood sexual abuse, family history of bipolar disorder, parasuicidal self-harm, treatment response. <sup class="c" data-ref="Ghaemi2014,Bayes2016" title="Source 30,171">30,171</sup>`},
 {from:.45,at:.57,k:'Lane 4',t:'ADHD: a lifelong pattern',
  txt:`ADHD symptoms are chronic and present since childhood rather than coming in episodes; assessing chronicity versus episodicity helped tell the two apart in adult women, while emotional lability was raised in both. <sup class="c" data-ref="Kitsune2016" title="Source 281">281</sup> The overlap is real: 17.11% of adults with bipolar disorder had ADHD, and 7.95% of adults with ADHD had bipolar disorder. <sup class="c" data-ref="Schiweck2021" title="Source 444">444</sup>`,
  pt:`ADHD is "always there"; bipolar episodes come and go.`,
  hook:`Irritability as the only mood change is controversial because it overlaps with ADHD, conduct and personality disorders. <sup class="c" data-ref="Stein2020BMC" title="Source 475">475</sup>`},
 {from:.6,at:.72,k:'Lane 5',t:'Substance-induced: tied to exposure',
  txt:`Steroids, stimulants, illicit drugs, levodopa, antidepressants and toxins can cause a mood episode during intoxication or withdrawal. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup> Oral glucocorticoids carried a hazard ratio of 4.35 for mania. <sup class="c" data-ref="Fardet2012" title="Source 122">122</sup> An episode that clears once the physiological effect wears off is substance/medication-induced; a full episode that persists beyond it counts towards bipolar disorder. <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>`,
  pt:`Some medicines, such as steroids, and some drugs, such as cannabis, can set off a manic-like state, so doctors ask about them first.`,
  hook:`Glucocorticoids: HR 4.35 for mania; cannabis: OR 2.97 for new manic symptoms. <sup class="c" data-ref="Fardet2012,Gibbs2015" title="Source 122,172">122,172</sup>`},
 {from:.76,at:.95,k:'Compare',t:'The shape tells the story',
  txt:`Seen side by side, the courses differ in what CANMAT's differential table emphasises: onset, accompanying symptoms, past course and family history. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup> Collateral history from family and a prospective mood chart make the pattern visible; confirmation is more confident "when episodes are prospectively observed". <sup class="c" data-ref="Yatham2018,NICE2014CG185" title="Source 372,525">372,525</sup>`,
  pt:`Bipolar disorder is diagnosed from a person's story over time, not from a blood test or a brain scan.`,
  hook:`Over-diagnosis comes mostly from borderline PD, substance use disorder and ADHD; CANMAT: "strictly adhere to diagnostic criteria". <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`}];
const DF_CLUES=[
 ['onset','Early onset, many episodes',`CANMAT's working thresholds favouring bipolar depression: first depression before 25 and at least 5 prior episodes. Earlier onset of depression also predicted later conversion (g = −0.33). <sup class="c" data-ref="Yatham2018,Ratheesh2017" title="Source 424,525">424,525</sup>`],
 ['fam','Family history of bipolar disorder',`It predicted transition from major depression to bipolar disorder (OR 2.89, 95% CI 2.01–4.14), and a family history of mania or hypomania was linked to bipolarity in BRIDGE (OR > 2). <sup class="c" data-ref="Ratheesh2017,Angst2011BRIDGE" title="Source 13,424">13,424</sup>`],
 ['post','Postpartum onset',`CANMAT lists postpartum depression or psychosis as raising suspicion of bipolarity, and recommends screening all women with depressive symptoms in pregnancy and postpartum, with a clinical interview after any positive screen. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`],
 ['psy','Psychotic features',`Psychotic depression predicted later bipolar disorder (OR 4.76, 1.79–12.66); in young adults hospitalised for depression, psychotic features at the index episode predicted the switch. <sup class="c" data-ref="Ratheesh2017,Goldberg2001" title="Source 180,424">180,424</sup>`],
 ['atyp','Atypical features',`Hypersomnia, increased appetite (hyperphagia) and leaden paralysis, along with psychomotor retardation, favour bipolar depression. <sup class="c" data-ref="Mitchell2008,Yatham2018" title="Source 342,525">342,525</sup>`],
 ['ad','Antidepressant-induced high',`Antidepressant-induced manic symptoms or rapid cycling should raise suspicion. Across 51 reports, switching was 2.6 times more likely with antidepressant treatment, and 4.5 times more frequent in young people than adults. <sup class="c" data-ref="Yatham2018,Baldessarini2013" title="Source 24,525">24,525</sup>`],
 ['lab','Short episodes, mood lability',`Shorter episodes and mood lability are on the list of features favouring bipolar depression. <sup class="c" data-ref="Mitchell2008,Yatham2018" title="Source 342,525">342,525</sup>`],
 ['sub','Past subthreshold highs',`In 550 people with major depression followed for 17.5 years, subthreshold decreased need for sleep, unusually high energy and more goal-directed activity predicted progression, though most who progressed had none at baseline. NICE: ask about past overactivity lasting 4 days or more. <sup class="c" data-ref="Fiedorowicz2011,NICE2014CG185" title="Source 145,372">145,372</sup>`],
 ['sui','Past suicide attempts',`CANMAT lists past suicide attempts among features that should raise suspicion of bipolarity, and lifetime suicide attempt distinguished bipolar disorder from major depression in a Canadian survey. This is a reason for kind, regular safety check-ins, and help is available. <sup class="c" data-ref="Yatham2018,Schaffer2010" title="Source 440,525">440,525</sup>`]];
inits.differential=()=>{
  const svg=$('#dfSvg'),rg=$('#dfT');
  function bolt(x,y,c){return `<path d="M${f1(x+2)} ${f1(y-7)}L${f1(x-3)} ${f1(y+1)}H${f1(x+1)}L${f1(x-2)} ${f1(y+8)}L${f1(x+4)} ${f1(y-1)}H${f1(x)}Z" style="fill:${c}"/>`}
  function draw(t){
    const N=vb(svg,'720 410','400 690'),ph=phaseOf(DF_STEPS,t);setA(ph);
    let s='';const cmp=ramp(t,.76,.9);
    const LX=N?16:168,LW=N?368:532;
    s+=`<text x="${N?16:16}" y="18" class="t-sm" style="fill:var(--dx)">${N?'FIVE COURSES · 24 MONTHS':'FIVE COURSES OVER 24 MONTHS · SAME SCALE'}</text>`;
    DF_LANES.forEach((ln,i)=>{
      const ly=N?40+i*124:34+i*68,lh=N?62:48,cy=N?ly+30:ly,up=i<5?ramp(t,DF_STEPS[i].from,DF_STEPS[i].from+.13):1,foc=ph===i||ph===5,op=foc?1:up>=1?.5:.85;
      /* label */
      if(N){s+=`<text x="16" y="${ly+12}" class="t-lbl" style="fill:${foc?ln.col:'var(--ink)'};opacity:${op}">${ln.name}</text>`}
      else{s+=`<text x="16" y="${ly+20}" class="t-lbl" style="fill:${foc?ln.col:'var(--ink)'};opacity:${op}">${ln.nn}</text>`;
        if(foc&&up>.6||cmp>0)s+=`<foreignObject x="16" y="${ly+26}" width="146" height="34"><div xmlns="http://www.w3.org/1999/xhtml" style="font:500 9.5px/1.25 var(--mono);color:var(--muted)">${ln.feat}</div></foreignObject>`}
      s+=`<g opacity="${f1(op)}">`;
      const lc=lifechart(LX,cy,LW,lh,ln.f,{upto:up,id:'df'+i,lw:2});s+=lc.svg;
      if(i===0&&up>.45){const a=lc.X(.39),b=lc.X(.455);s+=`<path d="M${f1(a)} ${f1(cy+3)}H${f1(b)}" style="stroke:var(--up);stroke-width:2"/><text x="${f1((a+b)/2)}" y="${f1(cy-1)}" class="t-xs t-mid" style="fill:var(--up)">hypomania ≥ 4 d</text>`}
      if(i===0&&up>.25){const a=lc.X(.1),b=lc.X(.25);s+=`<text x="${f1((a+b)/2)}" y="${f1(cy+lh-4)}" class="t-xs t-mid" style="fill:var(--down)">weeks-long low</text>`}
      if(i===0&&up>.56&&!N){const a=lc.X(.46),b=lc.X(.56);s+=`<text x="${f1((a+b)/2)}" y="${f1(lc.Y(0)-5)}" class="t-xs t-mid" style="fill:var(--eu)">well</text>`}
      if(i===1&&up>.5)s+=`<text x="${f1(lc.X(.5)+4)}" y="${f1(cy+11)}" class="t-xs" style="fill:var(--down)">never a high</text>`;
      if(i===2)DF_BPD_TRIG.forEach(tg=>{if(up>tg)s+=bolt(lc.X(tg),cy+6,'var(--mixed)')});
      if(i===2&&up>.4)s+=`<text x="${f1(lc.X(.36))}" y="${f1(cy+lh-3)}" class="t-xs" style="fill:var(--mixed)">⚡ stress → mood drops within hours</text>`;
      if(i===3&&up>0){const w=lc.X(up)-LX;s+=`<rect x="${LX}" y="${f1(cy+lh*.12)}" width="${f1(w)}" height="${f1(lh*.2)}" rx="3" style="fill:var(--rx);opacity:.28"/><text x="${LX+6}" y="${f1(cy+lh*.12+lh*.2-3)}" class="t-xs" style="fill:var(--rx)">${up>.3?'inattention, restlessness: every day':''}</text>`;
        s+=`<text x="${LX-2}" y="${f1(cy+lh*.22+3)}" class="t-xs t-end" style="fill:var(--rx)">${N?'':'←'}</text>`}
      if(i===4&&up>.4){const a=lc.X(.4),b=lc.X(Math.min(up,.6)/1);s+=`<rect x="${f1(a)}" y="${f1(cy+lh-9)}" width="${f1(Math.max(2,b-a))}" height="7" rx="3" style="fill:var(--warn)"/><text x="${f1(a-4)}" y="${f1(cy+lh-2)}" class="t-xs t-end" style="fill:var(--warn)">steroid course</text>`+pill(a,cy+lh-18,16,{col:'var(--warn)'});
        if(up>.7)s+=`<text x="${f1(lc.X(.66))}" y="${f1(lc.Y(0)-5)}" class="t-xs" style="fill:var(--eu)">stopped → settles</text>`}
      s+='</g>';
      if(N&&(foc&&up>.6||cmp>0))s+=`<text x="16" y="${ly+cy-ly+lh+14}" class="t-xs" style="fill:${ln.col}">${ln.feat}</text>`;
      if(i===3&&N&&up>0)s+=`<text x="384" y="${ly+12}" class="t-xs t-end" style="fill:var(--rx)">began in childhood</text>`;
    });
    /* time axis and playhead */
    const ay=N?660:376,X=m=>LX+LW*m/24;
    s+=`<line x1="${LX}" x2="${LX+LW}" y1="${ay}" y2="${ay}" class="axis"/>`;
    for(let m=0;m<=24;m+=N?6:3)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${ay-3}" y2="${ay+3}" class="axis"/><text x="${f1(X(m))}" y="${ay+15}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${LX+LW}" y="${ay+27}" class="t-xs t-end">months</text>`;
    if(ph<5){const u=ramp(t,DF_STEPS[ph].from,DF_STEPS[ph].from+.13),px=LX+LW*u;s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="30" y2="${ay}" style="stroke:var(--ink);opacity:.18"/>`}
    svg.innerHTML=s;
    $('#dfNote').innerHTML=noteHTML(DF_STEPS[ph]);
  }
  const stop=playWire(rg,$('#dfPlay'),draw,18000,'Replay','differential');
  const setA=stepWire($('#dfSteps'),DF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- clue list ---------- */
  const on=new Set(['fam','psy']),cs=$('#dfClueSvg');
  $('#dfClues').innerHTML=DF_CLUES.map(c=>`<button class="btn" data-dfc="${c[0]}" aria-pressed="${on.has(c[0])}">${c[1]}</button>`).join('');
  let glow=1,gStop=null;
  function drawC(){const N=vb(cs,'600 320','400 400');let s='';const n=DF_CLUES.length;
    const C=N?{x:200,y:62,w:200,h:64}:{x:300,y:160,w:190,h:70};
    const pos=i=>{if(N){const col=i%2,row=Math.floor(i/2);return [16+col*190+86,140+row*56]}const a=-Math.PI/2+i*2*Math.PI/n;return [300+Math.cos(a)*228,160+Math.sin(a)*130]};
    DF_CLUES.forEach((c,i)=>{const [x,y]=pos(i),lit=on.has(c[0]);if(lit)s+=`<line x1="${f1(C.x)}" y1="${f1(C.y)}" x2="${f1(x)}" y2="${f1(y)}" style="stroke:var(--dx);stroke-width:${f1(1.2+glow*1.2)};opacity:${f1(.35+.5*glow)};stroke-dasharray:4 3"/>`});
    s+=`<rect x="${f1(C.x-C.w/2)}" y="${f1(C.y-C.h/2)}" width="${C.w}" height="${C.h}" rx="14" style="fill:var(--down-soft);stroke:var(--down-fill);stroke-width:1.6"/>`;
    s+=`<text x="${C.x}" y="${f1(C.y-8)}" class="t-mid" style="font:800 15px var(--display);fill:var(--down)">A depressive episode</text><text x="${C.x}" y="${f1(C.y+10)}" class="t-xs t-mid">${on.size} of ${n} clues switched on</text><text x="${C.x}" y="${f1(C.y+23)}" class="t-xs t-mid">not a score</text>`;
    DF_CLUES.forEach((c,i)=>{const [x,y]=pos(i),lit=on.has(c[0]),w=N?172:140,h=34;
      s+=`<rect x="${f1(x-w/2)}" y="${f1(y-h/2)}" width="${w}" height="${h}" rx="17" style="fill:${lit?'var(--dx-soft)':'var(--panel)'};stroke:${lit?'var(--dx)':'var(--line)'};stroke-width:${lit?2:1}"/>`;
      const words=c[1].split(' '),half=Math.ceil(words.length/2),two=c[1].length>(N?24:22);
      if(two)s+=`<text x="${f1(x)}" y="${f1(y-2)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${words.slice(0,half).join(' ')}</text><text x="${f1(x)}" y="${f1(y+10)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${words.slice(half).join(' ')}</text>`;
      else s+=`<text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${lit?'var(--ink)':'var(--muted)'};font-weight:${lit?700:500}">${c[1]}</text>`});
    cs.innerHTML=s;
    const L=DF_CLUES.filter(c=>on.has(c[0]));
    $('#dfClueNote').innerHTML=`<div class="kicker">Clues switched on: ${L.length}</div><h4>${L.length?'What each clue is linked to':'Switch on a clue'}</h4>`+(L.length?`<ul class="dflist">${L.map(c=>`<li><b>${c[1]}</b>${c[2]}</li>`).join('')}</ul>`:`<p>Tap any clue above to see the published association behind it.</p>`)+
      `<div class="pt"><b>In plain words</b>Telling your doctor about any past times of unusual energy, little need for sleep or racing thoughts can shorten the road to the right diagnosis.</div><div class="hook"><b>Exam hook</b>Transition from depression to bipolar disorder: family history OR 2.89, psychotic depression OR 4.76, early onset. <sup class="c" data-ref="Ratheesh2017" title="Source 424">424</sup></div>`}
  $('#dfClues').addEventListener('click',e=>{const b=e.target.closest('[data-dfc]');if(!b)return;const k=b.dataset.dfc;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));gStop&&gStop();glow=0;gStop=animate(600,p=>{glow=p;drawC()},()=>{gStop=null})});
  drawC();
  const prevR=redraws.differential;redraws.differential=()=>{prevR&&prevR();drawC()};
};
/* =============== 3.1 Lithium: how it works and the evidence =============== */
/* six steps: three proposed mechanisms inside a schematic neuron (t 0–.5), then a forest plot
   that builds up the trial evidence (t .5–1). Numbers are as published in the research pass. */
const LI_STEPS=[
 {from:0,at:.1,k:'Mechanism 1 of 3 · inside the cell',t:'Inositol depletion',
  txt:`Lithium is one small ion, Li⁺. Its label says it alters sodium transport in nerve and muscle cells and shifts catecholamine metabolism, "but the specific biochemical mechanism of lithium action in mania is unknown". No single mechanism has been proven or ruled out: lithium acts on many steps of cell signalling, usually enhancing basal and damping stimulated activity. <sup class="c" data-ref="FDA-Lithobid,Alda2015" title="Source 4,133">4,133</sup> The first candidate: lithium blocks inositol monophosphatase (IMPase), the enzyme that recycles inositol; brain enzyme was 50% inhibited at 0.8 mM, and inositol 1-phosphate piles up while myo-inositol falls. <sup class="c" data-ref="Hallcher1980" title="Source 203">203</sup> Berridge's inositol-depletion hypothesis says this damps phosphoinositide signalling most in the busiest cells <span class="ev hyp">Hypothesis</span>. <sup class="c" data-ref="Berridge1989,Harwood2005" title="Source 44,209">44,209</sup> In 12 people, frontal myo-inositol fell about 30% within 5–7 days, while their clinical state had not yet changed. <sup class="c" data-ref="Moore1999Inositol" title="Source 349">349</sup>`,
  pt:`Lithium slows a recycling step inside brain cells, so the busiest signalling pathways run down a little. Whether this is why it helps is still unproven.`,
  hook:`IMPase is 50% inhibited at 0.8 mM. Brain myo-inositol falls about 30% within a week, before any clinical change, which argues against a simple inositol explanation. <sup class="c" data-ref="Hallcher1980,Moore1999Inositol" title="Source 203,349">203,349</sup>`},
 {from:.17,at:.27,k:'Mechanism 2 of 3 · inside the cell',t:'GSK-3β inhibition',
  txt:`In 1996 two groups showed that lithium directly inhibits glycogen synthase kinase-3β (GSK-3β), with a Ki of about 2 mM, without being a general kinase inhibitor; β-catenin then builds up, mimicking Wnt signalling. <sup class="c" data-ref="Klein1996,Stambolic1996" title="Source 282,471">282,471</sup> Lithium does this by competing with magnesium, an ion of similar size. <sup class="c" data-ref="Gould2005" title="Source 190">190</sup> It also switches GSK-3 off indirectly through Akt in mouse striatum <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Beaulieu2004" title="Source 31">31</sup> In people, inhibitory Ser9-phosphorylated GSK-3β was eightfold higher in blood cells of 9 people taking lithium than in 23 healthy controls <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Li2007GSK3" title="Source 296">296</sup> Final proof that GSK-3 is the therapeutic target would need trials of selective GSK-3 inhibitors <span class="ev hyp">Hypothesis</span>. <sup class="c" data-ref="Gould2005" title="Source 190">190</sup>`,
  pt:`Lithium pushes magnesium out of an enzyme called GSK-3 and slows it down. Blood tests show this happens in people taking lithium, but nobody has proven it is the reason lithium helps.`,
  hook:`GSK-3β Ki is about 2 mM, above the label's therapeutic serum range: one reason the IMPase-or-GSK-3 debate is unresolved. <sup class="c" data-ref="Klein1996,FDA-Lithobid" title="Source 133,282">133,282</sup>`},
 {from:.33,at:.43,k:'Mechanism 3 of 3 · inside the cell',t:'Neuroprotection and the body clock',
  txt:`Lithium raises protective proteins such as BDNF and Bcl-2 and reduces cell death through GSK-3 <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Malhi2013CNSDrugs" title="Source 306">306</sup> In 10 people with mania given lithium alone, plasma BDNF rose from 406 to 511 pg/mL over 28 days, though the rise did not track improvement. <sup class="c" data-ref="deSousa2011" title="Source 103">103</sup> People with at least 2 years of lithium had hippocampal volumes like healthy controls, even if they still had episodes. <sup class="c" data-ref="Hajek2012,Hajek2014" title="Source 200,201">200,201</sup> Such imaging links are cross-sectional and may partly reflect who is prescribed lithium. <sup class="c" data-ref="Hibar2018" title="Source 223">223</sup> Lithium also acts on molecular clocks: it delays and stabilises daily rhythms, firmly in animals and with <span class="ev early">Early evidence</span> in people. <sup class="c" data-ref="Moreira2016" title="Source 351">351</sup>`,
  pt:`In scans, people who have taken lithium for years tend to have brain measures closer to people without bipolar disorder. That may mean lithium protects brain cells, but it is not proven.`,
  hook:`Lithium and imaging: thicker cortex and a larger hippocampus are associations, not proof of neuroprotection; no randomised imaging trial exists. <sup class="c" data-ref="Hibar2018,Hajek2014" title="Source 201,223">201,223</sup>`},
 {from:.5,at:.6,k:'The evidence · relapse prevention',t:'Fewer new episodes than placebo',
  txt:`Each square is a pooled estimate and each line its 95% confidence interval; left of the vertical line at 1 means fewer events on lithium. Geddes 2004 (5 RCTs, 770 people): all relapses RR 0.65 (0.50–0.84), manic RR 0.62 (0.40–0.95), depressive RR 0.72 (0.49–1.07), which is uncertain. <sup class="c" data-ref="Geddes2004" title="Source 161">161</sup> The Severus 2014 update (7 trials, 1,580 people): any episode RR 0.66 (0.53–0.82), manic 0.52 (0.38–0.71), depressive 0.78 (0.59–1.03) by random effects. More people stopped lithium than placebo for reasons other than an episode (RR 1.33). <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup> A 2014 network meta-analysis concluded lithium "should remain the first-line treatment". <sup class="c" data-ref="Miura2014" title="Source 344">344</sup>`,
  pt:`Over months to years, lithium lowers the chance of a new mood episode by about a third compared with a dummy pill. The clearest effect is on highs.`,
  hook:`Lithium vs placebo for maintenance: RR 0.66 overall and 0.52 for mania; the depressive interval crosses 1. <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup>`},
 {from:.66,at:.76,k:'The evidence · head to head and acute mania',t:'BALANCE and acute mania',
  txt:`BALANCE randomised 330 people with bipolar I disorder to lithium, valproate or both, open label, for up to 24 months. A new intervention for an emerging episode was needed by 54% on the combination, 59% on lithium and 69% on valproate. Lithium vs valproate HR 0.71 (0.51–1.00, p = 0.047); combination vs valproate HR 0.59 (0.42–0.83); combination vs lithium HR 0.82 (0.58–1.17), not significant. <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup> In acute mania, a 68-trial network meta-analysis found lithium better than placebo at 3 weeks (SMD −0.37) while haloperidol was more effective than lithium (SMD −0.19). <sup class="c" data-ref="Cipriani2011" title="Source 82">82</sup> The label says lithium "may produce a normalization of symptomatology within 1 to 3 weeks". <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>`,
  pt:`In a large head-to-head trial, lithium alone or lithium plus valproate kept more people well than valproate alone.`,
  hook:`BALANCE: lithium alone or combined beat valproate alone; the combination did not clearly beat lithium alone. <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup>`},
 {from:.82,at:.94,k:'The evidence · suicide and mortality',t:'Suicide and death',
  txt:`Across 48 RCTs (6,674 people), lithium was associated with fewer suicides than placebo (OR 0.13, 0.03–0.66) and fewer deaths from any cause (OR 0.38, 0.15–0.95), with no clear effect on deliberate self-harm (OR 0.60, 0.27–1.32). <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup> In Swedish registers, suicide-related events were 14% lower during periods on lithium (HR 0.86). <sup class="c" data-ref="Song2017" title="Source 467">467</sup> But a VA trial that added lithium after a recent suicide-related event was stopped for futility (HR 1.10, 0.77–1.55), with low mean levels of about 0.5 mEq/L. <sup class="c" data-ref="Katz2022" title="Source 251">251</sup> <span class="ev est">Established</span> for the placebo-controlled evidence; uncertain as an add-on for people at high risk already in treatment. <sup class="c" data-ref="Cipriani2013,Katz2022" title="Source 83,251">83,251</sup> These are population statistics.`,
  pt:`People taking lithium have lower suicide rates in many studies. Help works: if you are struggling, contact a crisis line or emergency services (988 in the US; Samaritans 116 123 in the UK and Ireland).`,
  hook:`Cipriani 2013: suicide OR 0.13 vs placebo; deliberate self-harm not clearly reduced. <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup>`}
];
/* forest plot rows: [label, short label (phones), measure, point, low, high] */
const LI_FOREST=[
 {s:3,g:'Relapse vs placebo · Geddes 2004 (5 RCTs, 770 people)',gn:'Geddes 2004 · 5 RCTs vs placebo',rows:[['Any relapse','RR',.65,.50,.84],['Manic relapse','RR',.62,.40,.95],['Depressive relapse','RR',.72,.49,1.07]]},
 {s:3,g:'Relapse vs placebo · Severus 2014 (7 trials, 1,580 people)',gn:'Severus 2014 · 7 trials vs placebo',rows:[['Any mood episode','RR',.66,.53,.82],['Manic episode','RR',.52,.38,.71],['Depressive (random effects)','RR',.78,.59,1.03]]},
 {s:4,g:'BALANCE 2010 · 330 people, up to 24 months, open label',gn:'BALANCE 2010 · 330 people',rows:[['Lithium vs valproate','HR',.71,.51,1.00],['Lithium + valproate vs valproate','HR',.59,.42,.83],['Lithium + valproate vs lithium','HR',.82,.58,1.17]]},
 {s:5,g:'Vs placebo · Cipriani 2013 (48 RCTs, 6,674 people)',gn:'Cipriani 2013 · 48 RCTs vs placebo',rows:[['Suicide','OR',.13,.03,.66],['Death from any cause','OR',.38,.15,.95],['Deliberate self-harm','OR',.60,.27,1.32]]},
 {s:5,g:'VA trial 2022 · lithium added after a suicide-related event (519)',gn:'VA trial 2022 · added after an event',rows:[['Repeat suicide-related event','HR',1.10,.77,1.55]]}
];
/* acute mania, Cipriani 2011: standardised mean difference on a mania scale */
const LI_MANIA=[['Lithium vs placebo',-.37,-.63,-.11],['Haloperidol vs lithium',-.19,-.36,-.01]];
/* icon-array comparisons */
const LI_RR={any:[.66,.53,.82,'any new mood episode'],man:[.52,.38,.71,'a manic episode'],dep:[.78,.59,1.03,'a depressive episode']};

inits.lithium=()=>{
  const svg=$('#liSvg'),rg=$('#liT');let setSt=()=>{};
  const fmt=v=>v.toFixed(2).replace(/^(-?)0\./,'$10.'),dash=(a,b)=>`${fmt(a)}–${fmt(b)}`.replace('-','−');
  /* a small evidence chip drawn in SVG */
  const chip=(x,y,txt,kind)=>{const c=kind==='hyp'?['var(--rx-soft)','var(--rx)']:kind==='early'?['var(--warn-soft)','var(--warn)']:['var(--good-soft)','var(--good)'];
    const w=txt.length*6.1+12;return `<rect x="${f1(x)}" y="${f1(y-10)}" width="${f1(w)}" height="14" rx="3" style="fill:${c[0]}"/><text x="${f1(x+6)}" y="${f1(y+.5)}" class="t-xs" style="fill:${c[1]};font-weight:600">${txt}</text>`};
  const R=rng(31);const IONS=Array.from({length:9},(_,i)=>({x:190+R()*70,y:40+R()*180,ph:R()*6.28,tin:.004+i*.006}));
  /* ---------- the cell (local coordinates 450 × 370) ---------- */
  function cell(t,N){
    const p1=ramp(t,.02,.15),p2=ramp(t,.18,.3),p3=ramp(t,.34,.46),ph=phaseOf(LI_STEPS,t);
    const lab=N?'t-sm':'t-xs',zo=i=>ph===i?1:ph>2?1:.38;
    let s=`<rect x="0" y="0" width="450" height="370" rx="46" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:2.2"/><rect x="6" y="6" width="438" height="358" rx="41" style="fill:none;stroke:var(--brain-line);stroke-width:.8;stroke-dasharray:3 4;opacity:.7"/>`;
    /* channel in the top membrane */
    s+=`<rect x="212" y="-6" width="8" height="18" rx="3" style="fill:var(--li);opacity:.5"/><rect x="230" y="-6" width="8" height="18" rx="3" style="fill:var(--li);opacity:.5"/>`;
    s+=`<text x="26" y="30" class="${lab}" style="fill:var(--muted)">NEURON (schematic)</text>`;
    /* zone A: inositol recycling loop */
    const ax=112,ay=150,ar=58,e1=p1,P=a=>[ax+ar*Math.cos(a*Math.PI/180),ay+ar*Math.sin(a*Math.PI/180)];
    let A=`<circle cx="${ax}" cy="${ay}" r="${ar}" style="fill:none;stroke:var(--rx);stroke-width:1.6;opacity:.55"/>`;
    for(let k=0;k<14;k++){const u=(k/14+t*5)%1,ang=-90+360*u,[x,y]=P(ang),after=ang>=135&&ang<=270;
      A+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--rx);opacity:${f1(after?1-.75*e1:1)}"/>`}
    const nodes=[[-90,'PIP₂'],[0,'IP₃'],[90,'IP₁'],[180,'inositol']];
    nodes.forEach(([a,n])=>{const [x,y]=P(a),r=a===180?16*(1-.3*e1):a===90?12+5*e1:12;
      A+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--rx);stroke-width:1.6"/>`;
      const tx=a===180?x:a===0?x+17:x,ty=a===-90?y-17:a===90?y+27:a===180?y-22:y+4;
      A+=`<text x="${f1(tx)}" y="${f1(ty)}" class="${lab}${a===0?'':' t-mid'}" style="fill:var(--ink)">${n}</text>`});
    for(let k=0;k<Math.round(5*e1);k++){const [x,y]=P(90);A+=`<circle cx="${f1(x-14+k*7)}" cy="${f1(y+8+(k%2)*5)}" r="2.6" style="fill:var(--rx)"/>`}
    const ix=ax+(ar+16)*Math.cos(Math.PI*.75),iy=ay+(ar+16)*Math.sin(Math.PI*.75);A+=`<rect x="${f1(ix-24)}" y="${f1(iy-8)}" width="48" height="16" rx="8" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.2"/><text x="${f1(ix)}" y="${f1(iy+3.5)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">IMPase</text>`;
    if(e1>.25){const d=ramp(e1,.25,.6);A+=ion(lerp(ix+30,ix+18,d),lerp(iy-40,iy-14,d),'li',{r:8})+(d>.9?`<line x1="${f1(ix-20)}" y1="${f1(iy-10)}" x2="${f1(ix+20)}" y2="${f1(iy+10)}" style="stroke:var(--bad);stroke-width:2"/>`:'')}
    if(e1>.6)A+=`<text x="${ax}" y="${ay+4}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">−30%</text><text x="${ax}" y="${ay+16}" class="t-xs t-mid">inositol</text>`;
    A+=`<text x="${ax}" y="${ay-ar-36}" class="${lab} t-mid" style="fill:var(--rx);font-weight:600">INOSITOL RECYCLING</text>`;
    s+=`<g style="opacity:${zo(0)}">${A}</g>`;
    /* zone B: GSK-3β with its magnesium site */
    const bx=330,by=150,e2=p2;
    let B=`<path d="M${bx-30} ${by-14}A42 42 0 1 1 ${bx-30} ${by+14}L${bx-6} ${by}Z" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6;opacity:${f1(1-.4*e2)}"/>`;
    B+=`<text x="${bx+10}" y="${by+4}" class="${lab} t-mid" style="fill:var(--ink);font-weight:600">GSK-3β</text>`;
    const mg=ramp(e2,.1,.45),li=ramp(e2,.3,.65);
    B+=`<g style="opacity:${f1(1-.6*mg)}"><circle cx="${f1(lerp(bx-22,bx-56,mg))}" cy="${f1(lerp(by,by+46,mg))}" r="8.5" style="fill:var(--muted)"/><text x="${f1(lerp(bx-22,bx-56,mg))}" y="${f1(lerp(by,by+46,mg)+3)}" class="t-mid" style="font:700 8px var(--mono);fill:var(--panel)">Mg</text></g>`;
    if(li>0)B+=ion(lerp(bx-40,bx-22,li),lerp(by-60,by,li),'li',{r:8});
    const nb=2+Math.round(10*e2);for(let k=0;k<nb;k++){const cx=bx+56+(k%3)*13,cy=by-34+Math.floor(k/3)*15;B+=`<path d="M${cx} ${cy-5}L${cx+5} ${cy}L${cx} ${cy+5}L${cx-5} ${cy}Z" style="fill:var(--nt)"/>`}
    B+=`<text x="${bx+69}" y="${by+46}" class="t-xs t-mid" style="fill:var(--ink)">β-catenin${e2>.5?' ↑':''}</text>`;
    B+=`<text x="${bx}" y="${by-78}" class="${lab} t-mid" style="fill:var(--rx);font-weight:600">GSK-3β</text>`;
    if(e2>.55)B+=`<text x="${bx}" y="${by+70}" class="t-xs t-mid">Li⁺ takes the Mg²⁺ site</text>`;
    s+=`<g style="opacity:${zo(1)}">${B}</g>`;
    /* zone C: nucleus, BDNF and the clock */
    const cx0=196,cy0=292,e3=p3;
    let C=`<ellipse cx="${cx0}" cy="${cy0}" rx="118" ry="50" style="fill:var(--panel-2);stroke:var(--brain-line);stroke-width:1.4"/>`;
    C+=`<path d="M${cx0-70} ${cy0+6}${Array.from({length:14},(_,k)=>`Q${cx0-65+k*10} ${cy0+(k%2?-8:8)} ${cx0-60+k*10} ${cy0+6}`).join('')}" style="fill:none;stroke:var(--brain-line);stroke-width:1.4;opacity:.7"/>`;
    C+=`<text x="${cx0}" y="${cy0-20}" class="${lab} t-mid" style="fill:var(--ink);font-weight:600">NUCLEUS</text>`;
    if(e3>0){for(let k=0;k<18;k++){const u=((k/18*3)+t*4)%1,a=-170+k*9,rr=55+u*55*e3;const x=cx0+Math.cos(a*Math.PI/180)*rr*1.6,y=cy0+Math.sin(a*Math.PI/180)*rr*.9;
        if(y>8&&y<362&&x>12&&x<438)C+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--hippo);opacity:${f1(e3*(1-u*.5))}"/>`}
      C+=`<text x="${cx0}" y="${cy0+30}" class="${lab} t-mid" style="fill:var(--hippo);font-weight:600;opacity:${f1(ramp(e3,.2,.5))}">BDNF ↑  Bcl-2 ↑</text>`}
    const ck=clock24(390,300,34,{sleep:[23,7],h:(t*120)%24,small:true});C+=ck.svg+`<text x="390" y="${300-42}" class="t-xs t-mid">body clock</text>`;
    s+=`<g style="opacity:${zo(2)}">${C}</g>`;
    /* lithium ions drifting in through the channel */
    IONS.forEach((o,i)=>{const a=ramp(t,o.tin,o.tin+.05);if(a<=0)return;const x=lerp(225,o.x,a)+Math.sin(t*30+o.ph)*4*a,y=lerp(-4,o.y,a)+Math.cos(t*26+o.ph)*4*a;s+=ion(x,y,'li',{r:7,op:.85})});
    return s}
  /* ---------- mechanism cards ---------- */
  const CARDS=[
    {t:'Inositol depletion',ev:['HYPOTHESIS','hyp'],l:['Blocks IMPase: 50% at 0.8 mM','Frontal myo-inositol −30% in 5–7 days','…before mood had changed (n = 12)']},
    {t:'GSK-3β inhibition',ev:['EARLY EVIDENCE','early'],l:['Direct block, Ki ≈ 2 mM, vs Mg²⁺','Inhibited GSK-3β 8× higher (9 people)','Proof needs selective inhibitors']},
    {t:'Neuroprotection, clock',ev:['EARLY EVIDENCE','early'],l:['BDNF and Bcl-2 up, cell death down','Hippocampus like controls after 2+ y','Delays and steadies daily rhythms']}];
  function cards(t,x,y,w,h,gap,N){const ph=phaseOf(LI_STEPS,t);let s='';
    CARDS.forEach((c,i)=>{const yy=y+i*(h+gap),on=ph===i,seen=ph>=i;
      s+=`<g style="opacity:${seen?1:.45}"><rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="10" style="fill:var(--panel);stroke:${on?'var(--rx)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+12}" y="${yy+20}" class="t-lbl">${c.t}</text>`+(N?chip(x+w-c.ev[0].length*6.1-24,yy+18,c.ev[0],c.ev[1]):chip(x+12,yy+38,c.ev[0],c.ev[1]));
      c.l.forEach((l,k)=>{s+=`<text x="${x+12}" y="${yy+(N?40:60)+k*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`});s+='</g>'});
    return s}
  /* ---------- forest plot ---------- */
  function forest(t,N){const L=N?{x0:16,x1:300,vx:388,top:48,rh:30,gh:22}:{x0:300,x1:585,vx:712,top:52,rh:18,gh:21};
    const lo=Math.log(.02),hi=Math.log(3),X=v=>L.x0+(Math.log(v)-lo)/(hi-lo)*(L.x1-L.x0);
    let s='',y=L.top;
    const rowsH=LI_FOREST.reduce((a,g)=>a+L.gh+g.rows.length*L.rh,0),yEnd=L.top+rowsH;
    /* axis */
    [.05,.1,.25,.5,1,2].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.top-6}" y2="${yEnd}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);stroke-width:1.2"':''}/><text x="${f1(X(v))}" y="${L.top-10}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-6)}" y="${yEnd+14}" class="t-xs t-end" style="fill:var(--rx)">${N?'← fewer with lithium':'← fewer events with lithium (or first named)'}</text><text x="${f1(X(1)+6)}" y="${yEnd+14}" class="t-xs">more →</text>`;
    LI_FOREST.forEach(G=>{const st=LI_STEPS[G.s],gp=ramp(t,st.from,st.from+.03);
      if(gp>0)s+=`<text x="${N?L.x0:16}" y="${f1(y+15)}" class="t-sm" style="fill:var(--rx);opacity:${f1(gp)};font-weight:600">${N?G.gn:G.g}</text>`;
      y+=L.gh;
      G.rows.forEach((r,k)=>{const rp=ramp(t,st.from+.015+k*.02,st.from+.06+k*.02);const yy=N?y+17:y+9;
        if(rp>0){const [lb,m,pt,a,b]=r,sig=b<1,col=sig?'var(--rx)':'var(--muted)',la=Math.exp(lerp(Math.log(pt),Math.log(a),rp)),lb2=Math.exp(lerp(Math.log(pt),Math.log(b),rp));
          s+=`<g style="opacity:${f1(ramp(rp,0,.4))}"><text x="${N?L.x0:28}" y="${f1(N?y+9:yy+3.5)}" class="t-xs" style="fill:var(--ink)">${lb}</text>`;
          s+=`<line x1="${f1(X(la))}" x2="${f1(X(lb2))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:2;stroke-linecap:round"/><rect x="${f1(X(pt)-4.5)}" y="${f1(yy-4.5)}" width="9" height="9" style="fill:${col}"/>`;
          if(rp>.7)s+=`<text x="${L.vx}" y="${f1(N?y+9:yy+3.5)}" class="t-xs t-end" style="fill:${sig?'var(--ink)':'var(--muted)'}">${m} ${fmt(pt)} (${dash(a,b)})</text>`;s+='</g>'}
        y+=L.rh})});
    /* acute mania mini-panel (different scale) */
    const mt=N?yEnd+34:yEnd+30,mp=ramp(t,LI_STEPS[4].from+.04,LI_STEPS[4].from+.09);
    if(mp>0){const M=N?{x0:16,x1:300}:{x0:300,x1:585},MX=v=>lerp(M.x0,M.x1,(v+.8)/1.2);
      s+=`<g style="opacity:${f1(mp)}"><text x="16" y="${mt}" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'Acute mania, 3 weeks · Cipriani 2011':'Acute mania at 3 weeks · Cipriani 2011 (68 RCTs, 16,073 people) · SMD, different scale'}</text>`;
      const y0=mt+10,y1=y0+(N?2:2)*(N?30:18)+4;
      [-.8,-.4,0,.4].forEach(v=>{s+=`<line x1="${f1(MX(v))}" x2="${f1(MX(v))}" y1="${y0}" y2="${y1}" class="${v?'grid':'axis'}" ${v?'':'style="stroke:var(--ink);stroke-width:1.2"'}/><text x="${f1(MX(v))}" y="${y1+12}" class="t-xs t-mid">${v>0?'+':''}${v===0?'0':String(v).replace('-','−')}</text>`});
      LI_MANIA.forEach((r,k)=>{const yb=N?y0+k*30+22:y0+k*18+9;
        s+=`<text x="${N?M.x0:28}" y="${f1(N?yb-8:yb+3.5)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><line x1="${f1(MX(r[2]))}" x2="${f1(MX(r[3]))}" y1="${yb}" y2="${yb}" style="stroke:var(--rx);stroke-width:2"/><rect x="${f1(MX(r[1])-4.5)}" y="${yb-4.5}" width="9" height="9" style="fill:var(--rx)"/><text x="${N?388:712}" y="${f1(N?yb-8:yb+3.5)}" class="t-xs t-end" style="fill:var(--ink)">SMD ${fmt(r[1])} (${fmt(r[2])} to ${fmt(r[3])})</text>`.replace(/-0\./g,'−0.')});
      s+='</g>'}
    return s}
  function draw(t){
    const N=vb(svg,'720 490','400 680');const ph=phaseOf(LI_STEPS,t);let s='';
    const fc=ramp(t,.47,.5),ff=ramp(t,.5,.53);
    if(t<.5){
      s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">INSIDE THE CELL · THREE PROPOSED MECHANISMS</text>`;
      s+=`<g style="opacity:${f1(1-fc)}">`;
      s+=N?`<g transform="translate(8 40) scale(.853)">${cell(t,N)}</g>`+cards(t,10,370,380,90,8,N)
          :`<g transform="translate(12 52) scale(.92)">${cell(t,N)}</g>`+cards(t,446,52,266,106,14,N);
      s+='</g>';
      const lg=N?670:430,lx=N?12:20;s+=ion(lx+6,lg-4,'li',{r:6})+`<text x="${lx+16}" y="${lg}" class="t-xs">lithium ion</text><circle cx="${lx+100}" cy="${lg-4}" r="6" style="fill:var(--muted)"/><text x="${lx+110}" y="${lg}" class="t-xs">magnesium</text><path d="M${lx+188} ${lg-9}l5 5l-5 5l-5-5Z" style="fill:var(--nt)"/><text x="${lx+198}" y="${lg}" class="t-xs">β-catenin</text><circle cx="${lx+270}" cy="${lg-4}" r="3.6" style="fill:var(--hippo)"/><text x="${lx+278}" y="${lg}" class="t-xs">BDNF</text>`}
    else{
      s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'THE EVIDENCE · FOREST PLOT':'THE EVIDENCE · POINT ESTIMATE AND 95% CONFIDENCE INTERVAL'}</text>`;
      s+=`<g style="opacity:${f1(ff)}">${forest(t,N)}</g>`}
    svg.innerHTML=s;setSt(ph);$('#liNote').innerHTML=noteHTML(LI_STEPS[ph]);
  }
  const stop=playWire(rg,$('#liPlay'),draw,30000,'Replay','lithium');
  setSt=stepWire($('#liSteps'),LI_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- icon arrays ---------- */
  const isv=$('#liIcons'),txt=$('#liIconTxt');let mode='pbo',stopI=null,shown=1;
  function groups(){
    if(mode==='pbo'){const b=+$('#liBase').value,r=LI_RR[$('#liOut').value];
      return {G:[['Placebo',b],['Lithium',Math.round(b*r[0])]],col:'var(--accent)',what:'had '+r[3],
        txt:`Applying the pooled risk ratio for ${r[3]}, RR ${r[0].toFixed(2)} (95% CI ${r[1].toFixed(2)}–${r[2].toFixed(2)}), to a placebo group in which ${b} of 100 have one gives about <b>${Math.round(b*r[0])} of 100 on lithium</b> (range ${Math.round(b*r[1])}–${Math.min(100,Math.round(b*r[2]))}).${r[2]>=1?' This interval crosses 1, so lithium may make no difference to depressive episodes.':''} The placebo figure is yours to set: trials differed in length and baseline risk, and this is an illustration of a pooled relative effect, not a trial result. <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup>`}}
    if(mode==='bal')return {G:[['Lithium + valproate',54],['Lithium',59],['Valproate',69]],col:'var(--accent)',what:'needed a new intervention for an emerging episode',
        txt:`BALANCE (330 people with bipolar I disorder, up to 24 months): <b>54%</b> on the combination, <b>59%</b> on lithium and <b>69%</b> on valproate needed a new intervention for an emerging mood episode. Lithium vs valproate HR 0.71 (0.51–1.00); combination vs lithium was not significantly different. <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup>`};
    if(mode==='gel')return {G:[['Standard level 0.8–1.0',13],['Low level 0.4–0.6',38]],col:'var(--accent)',what:'relapsed',
        txt:`In a double-blind trial of 94 people, <b>13%</b> (6 of 47) kept at a "standard" level of 0.8–1.0 mmol/L relapsed, against <b>38%</b> (18 of 47) at a "low" level of 0.4–0.6 mmol/L: 2.6 times the risk (95% CI 1.3–5.2). Tremor, diarrhoea, urinary frequency, weight gain and metallic taste were more common at the standard level. Ranges are quoted as published, not as targets for anyone. See <a href="#levels" data-go="levels">Lithium levels</a>. <sup class="c" data-ref="Gelenberg1989" title="Source 164">164</sup>`};
    return {G:[['Lithium',49],['Divalproex',48],['Placebo',25]],col:'var(--good)',what:'improved by at least 50%',
        txt:`In a 21-day trial of 179 inpatients with mania, at least 50% improvement was seen in <b>49%</b> on lithium, <b>48%</b> on divalproex and <b>25%</b> on placebo. <sup class="c" data-ref="Bowden1994" title="Source 52">52</sup>`}}
  function drawI(p){const D=groups(),n=D.G.length,N=NARROW();
    const cols=N?(n>2?2:2):n,gw=N?180:(n>2?226:300),cw=N?17:(n>2?19.5:22),gh=10*cw+52,rows=Math.ceil(n/cols);
    const W=N?400:720,H=rows*gh+26;vb(isv,`${W} ${H}`,`${W} ${H}`);
    let s='';const tot=cols*gw,ox=(W-tot)/2;
    D.G.forEach(([nm,v],gi)=>{const c=gi%cols,r=Math.floor(gi/cols),gx=ox+c*gw+(gw-10*cw)/2+(rows>1&&r===rows-1&&n%cols?gw/2:0),gy=r*gh+8,k=Math.round(v*p);
      s+=`<text x="${f1(gx)}" y="${gy+12}" class="t-lbl">${nm}</text><text x="${f1(gx)}" y="${gy+22+10*cw+14}" class="t-lbl" style="fill:${D.col}">${k} of 100</text>`;
      for(let i=0;i<100;i++){const x=gx+(i%10)*cw+cw/2-2,y=gy+22+Math.floor(i/10)*cw;s+=person(x,y,cw*.82,i<k?D.col:'var(--line)')}});
    s+=`<text x="${W/2}" y="${H-6}" class="t-xs t-mid">filled = ${D.what}</text>`;
    isv.innerHTML=s;txt.innerHTML=D.txt}
  function run(){if(stopI)stopI();stopI=animate(900,p=>{shown=p;drawI(p)},()=>{stopI=null})}
  $$('[data-lic]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.lic;$$('[data-lic]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#liPboCtl').hidden=mode!=='pbo';run()}));
  $('#liOut').addEventListener('change',run);
  $('#liBase').addEventListener('input',()=>{$('#liBaseV').textContent=$('#liBase').value;if(stopI){stopI();stopI=null}drawI(1)});
  drawI(1);
  {const prev=redraws.lithium;redraws.lithium=()=>{prev&&prev();drawI(1)}}
};
/* =============== 3.2 Lithium levels, toxicity & interactions =============== */
/* A teaching model, not a dosing tool: a two-compartment, first-order model with the labelled
   half-life (18–36 h, about 24 h in LITHOBID) and labelled time to peak (IR 0.25–3 h, SR 2–6 h),
   twice-daily doses at 08:00 and 20:00, scaled so the steady 12-hour trough (IR, 24 h) is 0.7. */
const LV_STEPS=[
 {from:0,at:.012,k:'Hours 0–12 · the first tablet',t:'Absorption peak',
  txt:`Lithium is reported to be completely absorbed in the upper gut. The peak serum level comes 0.25–3 hours after an immediate-release dose and 2–6 hours after a sustained-release one. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> Sustained-release forms lower the peak by 30–50% without much change in the total exposure (the area under the curve): switch the tablet type above to compare. <sup class="c" data-ref="Grandjean2009PartII" title="Source 192">192</sup> Lithium spreads through roughly total body water, 0.7–1 L/kg, and barely binds to plasma proteins. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>`,
  pt:`After a tablet, the blood level rises within a few hours and then slowly falls. Slow-release tablets give a lower, flatter peak.`,
  hook:`Time to peak: immediate release 0.25–3 h, sustained release 2–6 h; sustained release lowers the peak by 30–50%. <sup class="c" data-ref="FDA-Lithium,Grandjean2009PartII" title="Source 132,192">132,192</sup>`},
 {from:.07,at:.16,k:'Hours 12–36 · going out',t:'Half-life and the kidney',
  txt:`Lithium is not metabolised. It leaves mainly in the urine, in proportion to its serum level: the glomerulus filters it and about 80% is reabsorbed in the proximal tubule. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> The elimination half-life is about 18–36 hours in the generic label and "approximately 24 hours" in LITHOBID. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> The dashed line shows what one dose alone would do. Clearance falls with age, and rises 30–50% in late pregnancy as filtration rises. <sup class="c" data-ref="Grandjean2009PartII" title="Source 192">192</sup> Try the 18 h and 36 h buttons: with the same doses, slower clearance means a higher level.`,
  pt:`The body does not break lithium down. The kidneys remove it, slowly: with the label's 24-hour half-life, about half of what is in the body leaves in a day.`,
  hook:`Lithium is renally excreted, not metabolised; about 80% of filtered lithium is reabsorbed in the proximal tubule. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>`},
 {from:.2,at:.29,k:'Each morning · the blood test',t:'The 12-hour trough',
  txt:`The generic label says to draw the level immediately before the next dose, about 12 hours after the previous one, when concentrations are relatively stable, and not to rely on levels alone: assessment must be clinical as well as laboratory. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> LITHOBID gives a window of 8–12 hours. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> For once-daily dosing, a review says the 24-hour level serves as the control value. <sup class="c" data-ref="Grandjean2009PartII" title="Source 192">192</sup> On the curve, a sample taken near a peak would read well above the trough, so it could not be compared with the published ranges.`,
  pt:`The blood test is usually taken about 12 hours after the last dose, often in the morning before that day's dose. Timing matters because the level moves through the day.`,
  hook:`A lithium level means a 12-hour trough, drawn just before the next dose. <sup class="c" data-ref="FDA-Lithium,Yatham2018" title="Source 132,525">132,525</sup>`},
 {from:.36,at:.55,k:'Days 1–5 · building up',t:'Steady state in about 5 days',
  txt:`With a 24-hour half-life, each day closes half the remaining gap: troughs reach about 50% of their steady value after 1 day, 75% after 2, 87.5% after 3, 93.75% after 4 and 96.9% after 5. This is a derived calculation from the labelled half-life, not a measured curve. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> That is why first levels wait: the generic label checks after 3 days, CANMAT about 5 days after a dose change, and NICE 1 week after starting and after every change. <sup class="c" data-ref="FDA-Lithium,Yatham2018,NICE2014CG185" title="Source 132,372,525">132,372,525</sup>`,
  pt:`Lithium builds up over several days before the level settles. A test taken too early shows a level that is still climbing.`,
  hook:`About 5 half-lives to steady state; CANMAT checks levels about 5 days after a dose change. <sup class="c" data-ref="FDA-Lithium,Yatham2018" title="Source 132,525">132,525</sup>`},
 {from:.62,at:.74,k:'Day 5 onward · steady state',t:'Where the published ranges sit',
  txt:`Quoted as published, not as targets for anyone. NICE: aim for 0.6–0.8 mmol/L in people prescribed lithium for the first time, and consider 0.8–1.0 for at least 6 months after a relapse on lithium. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> The generic US label titrates to 0.8–1.2 mEq/L for acute manic or mixed episodes and 0.8–1.0 for maintenance. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> CANMAT: 0.8–1.2 in acute treatment (0.4–0.8 in older adults); 0.6–1 "may be sufficient" for maintenance. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup> Both US labels give 1.5 mEq/L and above as toxic, "close to the therapeutic range". <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup>`,
  pt:`The level that helps and the level that harms are close together. That is why regular blood tests are part of lithium treatment.`,
  hook:`Narrow therapeutic index: toxic at 1.5 mEq/L or more; NICE's first target is 0.6–0.8 mmol/L. <sup class="c" data-ref="FDA-Lithium,NICE2014CG185" title="Source 132,372">132,372</sup>`},
 {from:.82,at:.93,k:'Beyond the blood test',t:'The brain lags, and people differ',
  txt:`Measured by lithium MR spectroscopy, brain lithium is about half the serum level, occasionally 75–80%, and the two correlate only weakly (dashed line, schematic). <sup class="c" data-ref="Grandjean2009PartII" title="Source 192">192</sup> Lithium "may take up to 24 hours to distribute into brain tissue", so toxicity symptoms may appear late. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> Some people "abnormally sensitive to lithium may exhibit toxic signs" inside the therapeutic range, and older people may show toxicity at levels others tolerate; NICE says neurotoxicity "can occur at therapeutic levels". <sup class="c" data-ref="FDA-Lithium,NICE2014CG185" title="Source 132,372">132,372</sup> Suspected toxicity is an emergency.`,
  pt:`A normal blood result does not rule out a problem. How the person feels and what the clinician sees count as much as the number.`,
  hook:`Treat the person, not the number: toxicity can occur at therapeutic levels. <sup class="c" data-ref="FDA-Lithium,NICE2014CG185" title="Source 132,372">132,372</sup>`}
];
/* published effects on a steady level: [low, mid, high] multipliers */
const LV_FX={
 thz:{n:'Thiazide',m:[1.25,1.325,1.40],lab:'thiazide +25–40%',
  txt:`Thiazide diuretics have the greatest potential among diuretics to raise lithium: concentrations often rise by 25–40% after a thiazide starts; loop and potassium-sparing diuretics have minor, variable effects. <sup class="c" data-ref="Finley1995" title="Source 147">147</sup> In older adults in Ontario, though, toxicity admissions were linked with starting loop diuretics (RR 5.5), not thiazides. <sup class="c" data-ref="Juurlink2004" title="Source 248">248</sup>`},
 ace:{n:'ACE inhibitor',m:[1.361,1.361,1.361],lab:'ACE inhibitor +36%',
  txt:`In 20 people stable on lithium, starting an ACE inhibitor raised the steady level by 36.1% and cut lithium clearance by 25.5%. <sup class="c" data-ref="Finley1996" title="Source 148">148</sup> In older adults, admissions for toxicity rose within a month of starting one (RR 7.6). <sup class="c" data-ref="Juurlink2004" title="Source 248">248</sup> ARBs (also renin-angiotensin system antagonists) can raise levels too; no size is given, so the chart uses the ACE inhibitor figure. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>`},
 nsaid:{n:'NSAID',m:[1.17,1.17,1.17],lab:'celecoxib +17%',
  txt:`NSAIDs reduce kidney blood flow and lithium clearance. Indomethacin and piroxicam significantly raise steady levels; the only size in the sources is about 17% for celecoxib 200 mg twice daily in healthy volunteers, used here. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> NICE warns people taking lithium not to take over-the-counter NSAIDs. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 dehy:{n:'Dehydration',m:[1,1,1],lab:'dehydration: size varies',
  txt:`A low-sodium state raises lithium retention, and protracted sweating, diarrhoea or fever lower tolerance to lithium; volume depletion is a labelled risk factor for toxicity. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> No source gives one size for this rise, so the chart shows only its direction. NICE advises seeking medical attention with diarrhoea or vomiting or any acute illness, and keeping up fluids after sweating, in heat or with fever. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`}
};
/* explainer bands (mmol/L = mEq/L) */
const LV_BANDS=[
 {a:0,b:.4,v:'maybe',t:'Below the maintenance levels named in the sources',
  txt:`An earlier review placed the minimum efficacious maintenance level at 0.4 mmol/L, with optimal response at 0.6–0.75. <sup class="c" data-ref="Severus2008" title="Source 451">451</sup> In a double-blind trial, 38% relapsed at 0.4–0.6 mmol/L against 13% at 0.8–1.0. <sup class="c" data-ref="Gelenberg1989" title="Source 164">164</sup> An abrupt fall of more than 0.2 mmol/L was linked with a higher relapse risk. <sup class="c" data-ref="Severus2008" title="Source 451">451</sup>`},
 {a:.4,b:.6,v:'yes',t:'0.4–0.6: a lower band',
  txt:`ISBD/IGSLI (2019), for adults: lower the standard 0.60–0.80 to 0.40–0.60 if response is good but tolerance poor. For older adults, most of the panel (not a consensus) endorsed 0.40–0.60 usually. <sup class="c" data-ref="Nolen2019" title="Source 379">379</sup> In the one direct trial, more people relapsed at 0.4–0.6 than at 0.8–1.0 (38% vs 13%), with fewer side effects. <sup class="c" data-ref="Gelenberg1989" title="Source 164">164</sup>`},
 {a:.6,b:.8,v:'yes',t:'0.6–0.8: the usual starting band',
  txt:`NICE: "aim for" 0.6–0.8 mmol/L in people prescribed lithium for the first time. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> ISBD/IGSLI standard level: 0.60–0.80. <sup class="c" data-ref="Nolen2019" title="Source 379">379</sup> LITHOBID: desirable long-term levels 0.6–1.2 mEq/L. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> CANMAT: 0.6–1 "may be sufficient" in maintenance. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`},
 {a:.8,b:1.0,v:'yes',t:'0.8–1.0: a higher maintenance band',
  txt:`NICE: consider 0.8–1.0 mmol/L for a trial of at least 6 months in people who relapsed on lithium before or who have subthreshold symptoms with functional impairment. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> The generic US label titrates maintenance to 0.8–1.0 mEq/L. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup> ISBD/IGSLI: raise to 0.80–1.00 if response is insufficient and tolerance good. <sup class="c" data-ref="Nolen2019" title="Source 379">379</sup> NICE keeps 3-monthly checks when the last level was 0.8 or higher. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {a:1.0,b:1.2,v:'maybe',t:'1.0–1.2: acute-treatment band',
  txt:`Acute ranges: the generic label titrates to 0.8–1.2 mEq/L for acute manic or mixed episodes; CANMAT gives 0.8–1.2 in acute treatment; LITHOBID says acute-mania doses "normally produce" 1.0–1.5. <sup class="c" data-ref="FDA-Lithium,Yatham2018,FDA-Lithobid" title="Source 132,133,525">132,133,525</sup> Side effects are more common at higher levels. <sup class="c" data-ref="Gelenberg1989" title="Source 164">164</sup>`},
 {a:1.2,b:1.5,v:'maybe',t:'1.2–1.5: close to the toxic threshold',
  txt:`Above the generic label's acute range (0.8–1.2) and close to the 1.5 mEq/L threshold that both labels call toxic; LITHOBID's acute range reaches 1.5. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> In older adults, levels of 1.20–1.25 were overtly toxic in a 2026 review. <sup class="c" data-ref="Nunes2026" title="Source 384">384</sup>`},
 {a:1.5,b:2.0,v:'no',t:'1.5 and above: toxic in both US labels',
  txt:`Both labels give 1.5 mEq/L or more as the toxic concentration. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> LITHOBID: mild to moderate toxic reactions may occur at 1.5–2.5 mEq/L; diarrhoea, vomiting, drowsiness, muscle weakness and lack of coordination may be early signs below 2.0. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>`},
 {a:2.0,b:3.0,v:'no',t:'2.0 and above: moderate to severe',
  txt:`LITHOBID: moderate to severe reactions at 2.0 mEq/L and above, and levels "should not exceed 2.0" during the acute phase. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> In 97 poisonings, severe neurotoxicity was linked with higher peak levels (2.3 vs 1.6 mmol/L). <sup class="c" data-ref="Oakley2001" title="Source 385">385</sup>`},
 {a:3.0,b:4.0,v:'no',t:'Above 3.0: multi-organ toxicity',
  txt:`LITHOBID: above 3.0 mEq/L, a complex multi-organ picture. The generic label: patients "may progress to seizures, coma, and irreversible brain damage". <sup class="c" data-ref="FDA-Lithobid,FDA-Lithium" title="Source 132,133">132,133</sup>`},
 {a:4.0,b:5.01,v:'no',t:'Above 4.0: dialysis thresholds',
  txt:`EXTRIP recommends extracorporeal treatment (haemodialysis is preferred) with impaired kidney function and a level above 4.0 mEq/L, and suggests it above 5.0, or with significant confusion, or if the level would take more than 36 hours to fall below 1.0. With reduced consciousness, seizures or dangerous dysrhythmias it is recommended at any level. <sup class="c" data-ref="Decker2015" title="Source 98">98</sup>`}
];

inits.levels=()=>{
  const DT=.1,HMAX=170;const cache={};
  /* two-compartment first-order model; returns {s: serum (scaled), b: brain (schematic)} sampled every 0.1 h */
  function sim(form,th,single){const key=form+th+(single?'s':'');if(cache[key])return cache[key];
    const ka=form==='sr'?.35:2,k12=.3,k21=.3,kel=(1+k12/k21)*Math.LN2/th,dt=.02,n=Math.round(HMAX/dt),every=Math.round(DT/dt);
    let A=0,C=0,P=0;const s=[];
    for(let i=0;i<=n;i++){const t=i*dt;if(i%every===0)s.push(C);
      if((!single||i===0)&&Math.abs(t/12-Math.round(t/12))<1e-6)A+=1;
      const dC=ka*A-k12*C+k21*P-kel*C,dP=k12*C-k21*P;A-=ka*A*dt;C+=dC*dt;P+=dP*dt}
    return cache[key]=s}
  const ref=sim('ir',24),K=.7/ref[Math.round(156/DT)];
  const lvAt=(arr,h)=>arr[clamp(Math.round(h/DT),0,arr.length-1)]*K;
  function brainOf(arr){const b=[];let v=0;for(let i=0;i<arr.length;i++){v+=(.5*arr[i]*K-v)*DT/8;b.push(v)}return b}
  const svg=$('#lvSvg'),rg=$('#lvT');let form='ir',th=24,setSt=()=>{};
  const BANDS=[[.6,.8,'var(--good-soft)','var(--good)','NICE first 0.6–0.8','NICE first 0.6–0.8'],[.8,1,'var(--rx-soft)','var(--rx)','label maint. 0.8–1.0','0.8–1.0'],[1,1.2,'var(--warn-soft)','var(--warn)','label acute ≤1.2','acute to 1.2'],[1.5,2,'var(--bad-soft)','var(--bad)','toxic ≥1.5 (labels)','toxic ≥1.5']];
  function draw(t){
    const N=vb(svg,'720 400','400 462'),H=t*168,ph=phaseOf(LV_STEPS,t);
    const L=N?{x0:40,x1:388,y0:52,y1:392}:{x0:58,x1:578,y0:48,y1:330};
    const X=h=>lerp(L.x0,L.x1,h/168),Y=v=>lerp(L.y1,L.y0,v/2);
    const S=sim(form,th);let s='';
    s+=`<text x="${N?12:20}" y="20" class="t-sm" style="fill:var(--rx);font-weight:600">${N?'SERUM LITHIUM · TEACHING MODEL':'SERUM LITHIUM OVER A WEEK · TEACHING MODEL, NOT A DOSING GUIDE'}</text>`;
    /* bands */
    BANDS.forEach(([a,b,fill,ink,lw,ln])=>{s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${L.x1-L.x0}" height="${f1(Y(a)-Y(b))}" style="fill:${fill};opacity:.85"/><line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(a))}" y2="${f1(Y(a))}" style="stroke:${ink};stroke-width:.8;opacity:.6"/>`;
      s+=N?`<text x="${L.x1-4}" y="${f1(Y(a)-4)}" class="t-xs t-end" style="fill:${ink}">${ln}</text>`:`<text x="${L.x1+6}" y="${f1((Y(a)+Y(b))/2+3)}" class="t-xs" style="fill:${ink}">${lw}</text>`});
    /* axes */
    [0,.5,1,1.5,2].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.y0-8}" class="t-xs t-end" style="fill:var(--ink)">mmol/L</text>`;
    for(let d=0;d<=7;d++){s+=`<line x1="${f1(X(d*24))}" x2="${f1(X(d*24))}" y1="${L.y0}" y2="${L.y1}" class="grid"/>`;if(d<7)s+=`<text x="${f1(X(d*24+12))}" y="${L.y1+15}" class="t-xs t-mid">day ${d+1}</text>`}
    /* doses: pills at 08:00 and 20:00 */
    for(let h=0;h<168;h+=12){const on=h<=H;s+=pill(X(h),L.y1+31,N?10:13,{round:true,col:on?'var(--rx)':'var(--line)'})}
    s+=`<text x="${L.x0-(N?9:11)}" y="${L.y1+34}" class="t-xs t-end">dose</text>`;
    /* ghost: one dose alone */
    if(ph===1){const G=sim(form,th,true);let d='';for(let h=0;h<=72;h+=.5)d+=(h?'L':'M')+f1(X(h))+' '+f1(Y(lvAt(G,h)));
      s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4"/>`;
      const v24=lvAt(G,24),v48=lvAt(G,48);s+=`<circle cx="${f1(X(24))}" cy="${f1(Y(v24))}" r="3.5" style="fill:var(--muted)"/><circle cx="${f1(X(48))}" cy="${f1(Y(v48))}" r="3.5" style="fill:var(--muted)"/><text x="${f1(X(24)+8)}" y="${f1(Y(v24)-12)}" class="t-xs">one dose alone: ${v24.toFixed(2)} → ${v48.toFixed(2)} in ${th} h${th===24?'':' (24 h shown)'}</text>`}
    /* the curve up to H */
    const n=Math.round(H/DT);let d='';for(let i=0;i<=n;i+=2)d+=(i?'L':'M')+f1(X(i*DT))+' '+f1(Y(S[i]*K));
    if(n>0)s+=`<path d="${d}" style="fill:none;stroke:var(--li);stroke-width:2.4;stroke-linejoin:round"/>`;
    /* brain (schematic) */
    if(ph===5){const B=brainOf(S);let bd='';for(let i=0;i<=n;i+=4)bd+=(i?'L':'M')+f1(X(i*DT))+' '+f1(Y(B[i]));s+=`<path d="${bd}" style="fill:none;stroke:var(--hippo);stroke-width:2;stroke-dasharray:6 4"/><text x="${f1(X(Math.min(H,150))-4)}" y="${f1(Y(B[Math.min(n,1500)])+16)}" class="t-xs t-end" style="fill:var(--hippo)">brain: about half, lagging (schematic)</text>`}
    /* trough samples at 08:00 each day, 12 h after the evening dose */
    for(let k=1;k<=7;k++){const h=24*k;if(h>H+.01||h>167)continue;const v=lvAt(S,h);
      s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${f1(Y(v))}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3;opacity:.5"/><path d="M${f1(X(h))} ${f1(Y(v)-11)}q5 6 5 9a5 5 0 0 1-10 0q0-3 5-9Z" style="fill:var(--bad);opacity:.85"/>`;
      if(ph>=2&&ph<=3&&k<=5){const lbl=ph===3?Math.round(100*(1-Math.pow(.5,h/th)))+'%':v.toFixed(2);s+=`<text x="${f1(X(h))}" y="${f1(Y(v)-15)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${lbl}</text>`}
      if(ph>=4&&k===Math.min(7,Math.floor(H/24)))s+=`<text x="${f1(X(h)+(N?-8:8))}" y="${f1(Y(v)+16)}" class="t-xs${N?' t-end':''}" style="fill:var(--ink);font-weight:600">trough ${v.toFixed(2)}</text>`}
    /* first-dose peak note */
    if(ph===0&&H>.3){let im=0;for(let i=1;i<=Math.min(n,119);i++)if(S[i]>S[im])im=i;if(im>0){const pv=S[im]*K;s+=`<text x="${f1(X(im*DT)+8)}" y="${f1(Y(pv)-8)}" class="t-xs" style="fill:var(--ink)">peak ${pv.toFixed(2)} at ${(im*DT).toFixed(1)} h (${form==='sr'?'label: 2–6 h':'label: 0.25–3 h'})</text>`}}
    if(ph===3){[[72,'label: first level after 3 days'],[120,'CANMAT: about 5 days'],[168,'NICE: 1 week']].forEach(([h,l],i)=>{if(H>=h-1)s+=`<text x="${f1(X(h)-3)}" y="${L.y0+12+i*13}" class="t-xs t-end" style="fill:var(--rx)">${l} ▸</text>`})}
    /* playhead */
    const vN=lvAt(S,H);s+=`<line x1="${f1(X(H))}" x2="${f1(X(H))}" y1="${L.y0}" y2="${L.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(H))}" cy="${f1(Y(vN))}" r="4.5" style="fill:var(--li);stroke:var(--panel);stroke-width:1.5"/>`;
    s+=`<text x="${N?12:20}" y="${N?452:392}" class="t-xs"><tspan style="fill:var(--li)">━ serum</tspan>   <tspan style="fill:var(--bad)">● 12-hour trough sample</tspan>   ${N?'':'1 mmol/L = 1 mEq/L'}</text>`;
    svg.innerHTML=s;setSt(ph);
    const hod=(8+Math.floor(H))%24,ss=Math.round(100*(1-Math.pow(.5,Math.floor(H/24)*24/th)));
    $('#lvRead').innerHTML=`<span>day <b>${Math.min(7,Math.floor(H/24)+1)}</b>, <b>${String(hod).padStart(2,'0')}:${String(Math.floor((H%1)*60)).padStart(2,'0')}</b></span><span>serum (model) <b>${vN.toFixed(2)}</b> mmol/L</span><span>troughs at <b>${ss}%</b> of steady state</span><span>half-life <b>${th} h</b>, ${form==='sr'?'sustained':'immediate'} release</span>`;
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[ph]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,24000,'Replay','levels');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  $$('[data-lvf]').forEach(b=>b.addEventListener('click',()=>{form=b.dataset.lvf;$$('[data-lvf]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-lvh]').forEach(b=>b.addEventListener('click',()=>{th=+b.dataset.lvh;$$('[data-lvh]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- kidney panel ---------- */
  const ks=$('#lvKid'),kr=$('#lvKT'),on={dehy:false,thz:false,ace:false,nsaid:false};
  const R=rng(32),PT=Array.from({length:42},(_,i)=>({o:i/42,r:R(),na:i%3===0,ur:.06+R()*.3}));
  /* tubule polyline (local nephron coordinates, 440 × 330) */
  const TUB=[[118,98],[140,138],[170,148],[200,138],[230,152],[260,138],[290,152],[320,142],[342,150],[342,262],[374,262],[374,176],[408,176],[408,304]];
  const seg=[];let tot=0;for(let i=1;i<TUB.length;i++){const l=Math.hypot(TUB[i][0]-TUB[i-1][0],TUB[i][1]-TUB[i-1][1]);seg.push(l);tot+=l}
  const proxEnd=seg.slice(0,8).reduce((a,b)=>a+b,0)/tot;
  const along=u=>{let d=clamp(u)*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const q=d/seg[i];return [lerp(TUB[i][0],TUB[i+1][0],q),lerp(TUB[i][1],TUB[i+1][1],q)]}d-=seg[i]}return TUB[TUB.length-1]};
  function mult(day,which){/* which 0 low,1 mid,2 high; rise starts on day 4 with a 24 h half-life */
    let m=1;Object.keys(on).forEach(k=>{if(on[k])m*=LV_FX[k].m[which]});if(day<=4)return 1;return 1+(m-1)*(1-Math.pow(.5,(day-4)))}
  function nephron(t,day){const f=1-.2/mult(day,1);let s='';
    s+=`<text x="10" y="40" class="t-xs">blood in</text><line x1="10" y1="64" x2="92" y2="64" style="stroke:var(--kid);stroke-width:7;stroke-linecap:round;opacity:.35"/>`;
    s+=`<circle cx="112" cy="76" r="27" style="fill:none;stroke:var(--kid);stroke-width:1.6"/><circle cx="112" cy="76" r="15" style="fill:var(--kid-soft);stroke:var(--kid);stroke-width:1.2"/><text x="112" y="24" class="t-xs t-mid">glomerulus: filters</text>`;
    s+=`<path d="M132 66L160 108H436" style="fill:none;stroke:var(--kid);stroke-width:7;stroke-linecap:round;opacity:.35"/><text x="436" y="98" class="t-xs t-end">back to the blood →</text>`;
    const tp=TUB.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join('');
    s+=`<path d="${tp}" style="fill:none;stroke:var(--kid-soft);stroke-width:13;stroke-linejoin:round;stroke-linecap:round"/><path d="${tp}" style="fill:none;stroke:var(--kid);stroke-width:1.2;stroke-linejoin:round;opacity:.7"/>`;
    s+=`<rect x="140" y="122" width="200" height="40" rx="8" style="fill:var(--li);opacity:${f1(.05+.12*(f-.8)/.2)}"/>`;
    s+=`<text x="236" y="186" class="t-xs t-mid" style="fill:var(--ink)">proximal tubule: about 80% taken back</text><text x="358" y="284" class="t-xs t-mid">loop</text><text x="400" y="324" class="t-xs t-end" style="fill:var(--ink)">urine ↓${f>.81?' less lithium leaves':''}</text>`;
    s+=ion(16,300,'li',{r:6,txt:false})+`<text x="26" y="303" class="t-xs">lithium</text>`+ion(16,318,'na',{r:6,txt:false})+`<text x="26" y="321" class="t-xs">sodium</text>`;
    PT.forEach(p=>{const u=(t*14+p.o)%1;let x,y;
      if(u<.12){const q=u/.12;x=lerp(10,112,q);y=lerp(64,76,q)}
      else{const v=(u-.12)/.88,back=p.r<f;
        if(back&&v>p.ur*proxEnd/.36){const v0=p.ur*proxEnd/.36,[bx,by]=along(v0),w=(v-v0)/(1-v0);if(w<.18){x=bx;y=lerp(by,108,w/.18)}else{x=lerp(bx,436,(w-.18)/.82);y=108}}
        else [x,y]=along(v)}
      s+=ion(x,y,p.na?'na':'li',{r:6,txt:false,op:.9})});
    return s}
  function kchart(day,x0,x1,y0,y1){const X=d=>lerp(x0,x1,d/14),Y=v=>lerp(y1,y0,v/1.6),base=.7;let s='';
    BANDS.forEach(([a,b,fill,ink,lw,ln])=>{const bb=Math.min(b,1.6);s+=`<rect x="${x0}" y="${f1(Y(bb))}" width="${x1-x0}" height="${f1(Y(a)-Y(bb))}" style="fill:${fill};opacity:.85"/><text x="${x0+4}" y="${f1(Y(a)-4)}" class="t-xs" style="fill:${ink}">${ln}</text>`});
    [0,.4,.8,1.2,1.6].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v.toFixed(1)}</text>`});
    [0,4,7,14].forEach(d=>s+=`<text x="${f1(X(d))}" y="${y1+14}" class="t-xs t-mid">${d}</text>`);s+=`<text x="${x1}" y="${y1+27}" class="t-xs t-end">days</text>`;
    s+=`<line x1="${f1(X(4))}" x2="${f1(X(4))}" y1="${y0}" y2="${y1}" style="stroke:var(--ink);stroke-dasharray:3 3;opacity:.45"/><text x="${f1(X(4)+4)}" y="${y1-6}" class="t-xs">change starts</text>`;
    const any=on.thz||on.ace||on.nsaid;
    if(any&&day>4){let lo='',hi='';const N2=40;for(let i=0;i<=N2;i++){const d=4+(day-4)*i/N2;lo+=(i?'L':'M')+f1(X(d))+' '+f1(Y(base*mult(d,0)));}for(let i=N2;i>=0;i--){const d=4+(day-4)*i/N2;hi+='L'+f1(X(d))+' '+f1(Y(base*mult(d,2)))}
      s+=`<path d="${lo}${hi}Z" style="fill:var(--li);opacity:.18"/>`}
    let ln='';const N3=80;for(let i=0;i<=N3;i++){const d=day*i/N3;ln+=(i?'L':'M')+f1(X(d))+' '+f1(Y(base*mult(d,1)))}
    s+=`<path d="${ln}" style="fill:none;stroke:var(--li);stroke-width:2.4"/>`;
    const v=base*mult(day,1);s+=`<circle cx="${f1(X(day))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--li);stroke:var(--panel);stroke-width:1.5"/>`;
    if(on.dehy&&day>4){const xx=X(day);s+=`<path d="M${f1(xx)} ${f1(Y(v)-8)}V${f1(Y(v)-46)}" style="stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3" marker-end="url(#lvArr)"/><text x="${x0}" y="${y1+27}" class="t-xs" style="fill:var(--bad)">↑ dehydration: rises, size varies</text>`}
    s+=`<text x="${x0}" y="${y0-10}" class="t-sm" style="fill:var(--rx);font-weight:600">STEADY LEVEL (illustrative)</text>`;
    return {svg:s,v}}
  function drawK(t){const N=vb(ks,'720 340','400 600'),day=t*14;let s=`<defs>${marker('lvArr','var(--bad)')}</defs>`;
    s+=N?`<g transform="translate(4 8) scale(.89)">${nephron(t,day)}</g>`:`<g transform="translate(8 6)">${nephron(t,day)}</g>`;
    const C=N?kchart(day,44,384,350,560):kchart(day,488,708,40,292);s+=C.svg;ks.innerHTML=s;
    const act=Object.keys(on).filter(k=>on[k]);
    const m=mult(day,1),pct=Math.round((m-1)*100);
    $('#lvKNote').innerHTML=noteHTML({k:`Day ${f1(day)} · level ≈ ${C.v.toFixed(2)} mmol/L (illustration)${pct?' · +'+pct+'%':''}`,
      t:act.length?act.map(k=>LV_FX[k].n).join(' + '):'Lithium follows sodium',
      txt:act.length?act.map(k=>LV_FX[k].txt).join(' ')+(act.length>1?' Together the chart multiplies the separate figures; no source gives a combined size.':''):`The glomerulus filters lithium, and about 80% of the filtered lithium is reabsorbed by passive diffusion in the proximal tubule; the rest leaves in the urine, in proportion to the serum level. Lithium reduces sodium reabsorption, and a low-sodium state makes the kidney hold on to more lithium, so the labels stress a normal salt intake and, while levels settle, adequate fluid (2500–3000 mL in the generic label). <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup> Switch on a situation or medicine above.`,
      pt:act.length?`Some ordinary medicines and being dried out can push lithium up. Anyone taking lithium is advised to tell every prescriber and pharmacist, and to contact the care team when vomiting, having diarrhoea or unable to drink.`:`The kidney cannot tell lithium from sodium very well. When the body is short of salt or water, it keeps both.`,
      hook:act.length?`Levels rise after a new interacting drug over about 5 half-lives, so the label rechecks levels after starting or stopping diuretics, NSAIDs or renin-angiotensin system antagonists. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>`:`Lithium is handled like sodium: about 80% of filtered lithium is reabsorbed in the proximal tubule. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>`})}
  playWire(kr,$('#lvKPlay'),drawK,16000,'Replay','levels');
  $$('[data-lvx]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.lvx;on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);if(+kr.value<.55){kr.value=.75}drawK(+kr.value)}));
  drawK(+kr.value);

  /* ---------- level explainer ---------- */
  const gs=$('#lvGauge'),vi=$('#lvVal'),pop=$('#lvPop'),when=$('#lvWhen'),ex=$('#lvExp');
  function gX(v,x0,x1){const w=x1-x0;return v<=2?x0+v/2*w*.7:x0+w*.7+(Math.min(v,5)-2)/3*w*.3}
  function drawG(){const v=+vi.value,N=vb(gs,'720 130','400 150'),x0=N?16:20,x1=N?384:700,yb=N?62:52,bh=22;let s='';
    const vc={yes:'var(--good-soft)',maybe:'var(--warn-soft)',no:'var(--bad-soft)'},ik={yes:'var(--good)',maybe:'var(--warn)',no:'var(--bad)'};
    LV_BANDS.forEach(B=>{s+=`<rect x="${f1(gX(B.a,x0,x1))}" y="${yb}" width="${f1(gX(Math.min(B.b,5),x0,x1)-gX(B.a,x0,x1))}" height="${bh}" style="fill:${vc[B.v]};stroke:var(--panel);stroke-width:1"/>`});
    const old=pop.value!=='adult',up=pop.value==='o80'?.7:.8;
    if(old)s+=`<rect x="${f1(gX(.4,x0,x1))}" y="${yb-6}" width="${f1(gX(up,x0,x1)-gX(.4,x0,x1))}" height="4" rx="2" style="fill:var(--rx)"/><text x="${f1(gX(.4,x0,x1))}" y="${yb-10}" class="t-xs" style="fill:var(--rx)">older-adult range 0.4–${up}</text>`;
    (N?[0,.4,.6,.8,1,1.2,1.5,2,3,4,5]:[0,.2,.4,.6,.8,1,1.2,1.5,2,2.5,3,4,5]).forEach(t=>{const x=gX(t,x0,x1);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${yb+bh}" y2="${yb+bh+5}" class="axis"/><text x="${f1(x)}" y="${yb+bh+(N&&[.6,1,1.5].includes(t)?28:17)}" class="t-xs t-mid">${t}</text>`});
    s+=`<text x="${x1}" y="${yb+bh+(N?44:32)}" class="t-xs t-end">mmol/L = mEq/L (scale compressed above 2)</text>`;
    const mx=gX(v,x0,x1),B=LV_BANDS.find(b=>v>=b.a&&v<b.b)||LV_BANDS[LV_BANDS.length-1];
    s+=`<path d="M${f1(mx)} ${yb-2}l-7 -12h14Z" style="fill:${ik[B.v]}"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="${yb}" y2="${yb+bh}" style="stroke:var(--ink);stroke-width:2.4"/>`;
    s+=`<text x="${f1(clamp(mx,x0+30,x1-30))}" y="${yb-(old?22:18)}" class="t-lbl t-mid" style="fill:${ik[B.v]}">${v.toFixed(2)}</text>`;
    gs.innerHTML=s;$('#lvValT').textContent=v.toFixed(2);
    let verdict=B.v==='no'?`<div class="verdict no">In the toxic range of the labels. A real result like this is a medical emergency: contact emergency services.</div>`
      :B.v==='maybe'&&v>=1?`<div class="verdict maybe">Above maintenance ranges and nearer the toxic threshold. Clinicians interpret this with symptoms and timing.</div>`
      :B.v==='maybe'?`<div class="verdict maybe">Below the ranges named in the sources. Clinicians interpret this with timing, adherence and how the person is.</div>`
      :`<div class="verdict yes">Inside a band named in a label or guideline. Which band applies to one person is a clinical decision, and toxicity can still occur.</div>`;
    if(old&&v>up&&B.v!=='no')verdict=`<div class="verdict maybe">Above the lower range proposed for older adults (0.4–${up}). A clinician interprets this with symptoms.</div>`;
    let extra='';
    if(old)extra+=`<p><b>Older adults.</b> An ISBD initiative recommends laboratory ranges of 0.4–0.8 mmol/L at ages 60–79 and 0.4–0.7 at 80 and over. <sup class="c" data-ref="Shulman2026" title="Source 457">457</sup> In 14 studies of 8,808 adults aged 60 or older, levels of 0.82–1.00 were linked to more side effects or early toxicity, and 1.20–1.25 were overtly toxic. <sup class="c" data-ref="Nunes2026" title="Source 384">384</sup> CANMAT gives 0.4–0.8 for acute treatment in older adults. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup> Older patients may show toxicity at levels others tolerate. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup></p>`;
    if(when.value!=='t12')extra+=`<p><b>Timing.</b> ${when.value==='early'?'A sample taken within a few hours of a dose catches the absorption peak.':'If the timing is not known, the number cannot be placed on the curve.'} The ranges are written for a level drawn immediately before the next dose, about 12 hours after the last (LITHOBID: 8–12 hours), so this value cannot be read against them. <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup></p>`;
    ex.innerHTML=`<div class="lvval">${v.toFixed(2)}<small>mmol/L</small></div><h4>${B.t}</h4>${verdict}<p>${B.txt}</p>${extra}<p class="stage-cap">Teaching tool only. A level inside any range does not rule out toxicity: some people "abnormally sensitive to lithium may exhibit toxic signs" at therapeutic levels. Symptoms of toxicity need urgent care whatever the number. <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup></p>`}
  vi.addEventListener('input',drawG);pop.addEventListener('change',drawG);when.addEventListener('change',drawG);
  drawG();
  {const prev=redraws.levels;redraws.levels=()=>{prev&&prev();drawG()}}
};
/* =============== 3.3 Valproate, lamotrigine & carbamazepine =============== */
/* Lamotrigine schedules exactly as the US Lamictal label's Table 5 (adults with bipolar disorder).
   w = mg/day for weeks 1..7 (valproate weeks 1-2 = 25 mg every other day, drawn as 12.5/day). */
const ST_SCH={
  std:{n:'Lamotrigine alone',nl:'No valproate, no enzyme inducers',w:[25,25,50,50,100,200,200],
       lab:['25 mg daily','25 mg daily','50 mg daily','50 mg daily','100 mg daily','200 mg daily','200 mg daily'],tg:200,eod:0},
  vpa:{n:'With valproate',nl:'Taking valproate',w:[12.5,12.5,25,25,50,100,100],
       lab:['25 mg every other day','25 mg every other day','25 mg daily','25 mg daily','50 mg daily','100 mg daily','100 mg daily'],tg:100,eod:2},
  ind:{n:'With enzyme inducers',nl:'Carbamazepine, phenytoin, phenobarbital or primidone, not valproate',w:[50,50,100,100,200,300,400],
       lab:['50 mg daily','50 mg daily','100 mg daily','100 mg daily','200 mg','300 mg','up to 400 mg daily'],tg:400,eod:0}
};
const ST_STEPS=[
 {from:0,at:.07,k:'Weeks 1–2',t:'A deliberately low start',
  txt:`The US Lamictal label sets out the escalation for adults with bipolar disorder in its Table 5. Without valproate or enzyme inducers it begins at 25 mg daily in weeks 1–2. With valproate it begins at 25 mg every other day; with carbamazepine, phenytoin, phenobarbital or primidone (and not valproate) at 50 mg daily. Quoted as published, not as instructions. <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>`,
  pt:`Lamotrigine starts at a small dose and rises slowly over about six weeks. The slow start is there to lower the chance of a serious rash.`,
  hook:`Lamictal label: exceeding the recommended initial dose or the recommended escalation are listed risk factors for serious rash.`},
 {from:2/7,at:.33,k:'Weeks 3–4',t:'The first step up',
  txt:`In weeks 3–4 the label's schedules reach 50 mg daily alone, 25 mg daily with valproate and 100 mg daily with an enzyme inducer. Valproate <i>"has been shown to inhibit glucuronidation and decrease the apparent clearance of lamotrigine"</i>, which is why its schedule runs at about half. Inducers such as carbamazepine speed clearance, so theirs runs at about double. <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>`,
  pt:`Some medicines change how fast the body clears lamotrigine. Valproate slows it, so the doses are smaller; carbamazepine speeds it up, so they are larger.`,
  hook:`With valproate: halve the titration. With carbamazepine: roughly double it.`},
 {from:4/7,at:.6,k:'Week 5',t:'Other medicines matter too',
  txt:`Week 5 is 100 mg daily alone, 50 mg with valproate and 200 mg with an inducer. Estrogen-containing oral contraceptives also increase lamotrigine clearance: the label says the maintenance dose <i>"will in most cases need to be increased by as much as 2-fold"</i> when they are taken, and decreased by as much as 50% when they are stopped. If valproate is stopped, the label says the lamotrigine dose <i>"should be doubled over a 2-week period in equal weekly increments"</i>. <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>`,
  pt:`Starting or stopping the contraceptive pill, valproate or carbamazepine can change lamotrigine levels a lot. That is one reason every change is planned with the prescriber.`,
  hook:`Estrogen-containing pills lower lamotrigine levels; stopping them raises levels.`},
 {from:5/7,at:.79,k:'Weeks 6–7',t:'The label’s target dose',
  txt:`The label's bipolar target is 200 mg/day: 100 mg/day with valproate, or 400 mg/day with enzyme inducers and no valproate (reached in divided doses by week 7). Trials found <i>"no additional benefit"</i> at 400 mg vs 200 mg/day, so <i>"doses above 200 mg/day are not recommended"</i> without inducers. Because of this slow climb, lamotrigine cannot be judged by an early 2-week response the way some other bipolar depression treatments can; CANMAT/ISBD 2018 suggests a target of <i>"a minimum of 200 mg/day"</i>. <sup class="c" data-ref="FDA-Lamictal,Yatham2018" title="Source 130,525">130,525</sup>`,
  pt:`Lamotrigine takes weeks to reach its working dose, so it is a medicine for keeping well over time more than for a quick fix.`,
  hook:`Label bipolar targets: 200 mg/day alone, 100 with valproate, 400 with inducers.`},
 {from:.93,at:1,k:'Boxed warning',t:'The rash window',
  txt:`The Lamictal boxed warning: serious rash, including Stevens–Johnson syndrome, occurs in about 0.08% to 0.3% of adults and 0.3% to 0.8% of patients aged 2–17. Risk factors are taking valproate, exceeding the initial dose or the escalation, and the HLA-B*1502 allele, <i>"However, cases have occurred in the absence of these factors"</i>. <i>"Nearly all cases of life-threatening rashes caused by LAMICTAL have occurred within 2 to 8 weeks of treatment initiation"</i>, and it <i>"should ordinarily be discontinued at the first sign of rash, unless the rash is clearly not drug related"</i>. NICE advises people to <i>"contact their doctor immediately if they develop a rash while the dose of lamotrigine is being increased"</i>. <sup class="c" data-ref="FDA-Lamictal,NICE2014CG185F" title="Source 130,373">130,373</sup>`,
  pt:`A new rash while the dose is going up is a reason to contact the doctor straight away. Most rashes are not dangerous, but a doctor needs to decide.`,
  hook:`Serious rash in adults: 0.08–0.3%, nearly all within 2–8 weeks of starting.`}
];
/* EURAP major congenital malformation rates (%), monotherapy, at 1 year */
const ST_PG={'2018':{src:'Tomson 2018',d:[['Valproate',10.3],['Carbamazepine',5.5],['Lamotrigine',2.9],['Levetiracetam',2.8]]},
             '2024':{src:'Battino 2024',d:[['Valproate',9.9],['Carbamazepine',5.4],['Lamotrigine',3.1],['Levetiracetam',2.5]]}};
const ST_PGN=[
 {from:0,k:'The picture',t:'100 pregnancies per medicine',
  txt:`EURAP is an international registry of pregnancies exposed to antiseizure medicines. Its 2018 analysis covered 7,355 monotherapy pregnancies (1999–2016); the 2024 update covered 9,840 (1999–2022). Each block is scaled to 100 pregnancies. <sup class="c" data-ref="Tomson2018,Battino2024EURAP" title="Source 26,489">26,489</sup>`,
  pt:`Each little figure stands for one pregnancy. Most babies are born without a major malformation on any of these medicines.`},
 {from:.3,k:'Valproate',t:'About 1 in 10',
  txt:`With valproate, major malformations at 1 year occurred in 10.3% (142 of 1,381) in EURAP 2018 and 9.9% (95% CI 8.5–11.5%) in the 2024 update, and the risk rose with dose (p<0.0001). The US label adds the NAAED registry's 9–11% at an average 1,000 mg/day. <sup class="c" data-ref="Tomson2018,Battino2024EURAP,FDA-Depakote" title="Source 26,128,489">26,128,489</sup>`,
  hook:`Valproate's major malformation rate is about 10% (EURAP 10.3%, Cochrane 10.93%), against about 3% for lamotrigine.`},
 {from:.54,k:'The others',t:'Lower, and lowest with lamotrigine',
  txt:`Carbamazepine sits in between (5.5% in 2018, 5.4% in 2024); lamotrigine (2.9%, 3.1%) and levetiracetam (2.8%, 2.5%) are lowest. A Cochrane review found that lamotrigine showed no increased risk of major malformation. <sup class="c" data-ref="Tomson2018,Battino2024EURAP,Weston2016" title="Source 26,489,520">26,489,520</sup>`,
  pt:`Of these medicines, valproate carries the biggest risk to a developing baby. That is why it needs planning long before any pregnancy.`},
 {from:.86,k:'Beyond malformations',t:'Spina bifida, IQ and autism',
  txt:`The label puts spina bifida at about 0.06–0.07% in the general population against about 1–2% after valproate. Children exposed in the womb also had lower IQ at age 6 in NEAD (97 vs 108 with lamotrigine) and a higher 14-year autism risk in Denmark (4.42% vs 1.53%). These are population statistics. <sup class="c" data-ref="FDA-Depakote,Meador2013NEAD,Christensen2013" title="Source 79,128,322">79,128,322</sup>`,
  pt:`Valproate's effects can show up later in childhood too, in learning and development. Anyone who could become pregnant should plan medicines with their care team ahead of time and not stop a medicine suddenly on their own.`,
  hook:`Depakote boxed warning: hepatotoxicity, fetal risk and pancreatitis.`}
];
/* comparator: guideline position per phase, then the detail cards */
const ST_CMP={
 vpa:{n:'Valproate (divalproex)',ph:[['First-line','good','divalproex, CANMAT/ISBD 2018'],['Second-line','warn','divalproex, bipolar I depression'],['First-line','good','level 1; weaker in BALANCE']],
  cards:[
   ['Best evidence',`Acute mania: 48% improved by ≥50% vs 25% on placebo (1994), and SMD −0.20 vs placebo in Cipriani 2011, below haloperidol, risperidone and olanzapine. Maintenance: its 12-month trial missed its primary endpoint and the US label says <i>"there are no data to support the benefits of Depakote in such longer-term treatment"</i>, yet CANMAT/ISBD still rates divalproex first-line (level 1). <sup class="c" data-ref="Bowden1994,Cipriani2011,Bowden2000Divalproex,FDA-Depakote,Yatham2018" title="Source 52,53,82,128,525">52,53,82,128,525</sup>`],
   ['Boxed warning',`<i>"Life threatening adverse reactions"</i>: hepatotoxicity (fatal liver failure usually in the first six months; higher risk under age two and with POLG mitochondrial disease), fetal risk, and pancreatitis (2 cases without another cause in 2,416 trial patients). <sup class="c" data-ref="FDA-Depakote" title="Source 128">128</sup>`],
   ['Monitoring',`Liver tests before therapy <i>"and at frequent intervals thereafter, especially during the first six months"</i> (label). NICE: weight or BMI, full blood count and liver function at the start, at 6 months, then yearly. Platelets fell to ≤75 × 10⁹/L in 27% at about 50 mg/kg/day in an epilepsy trial; the label also warns of high ammonia. <sup class="c" data-ref="FDA-Depakote,NICE2014CG185F" title="Source 128,373">128,373</sup>`],
   ['Key interactions and planning',`Valproate halves lamotrigine's schedule by slowing its clearance. NICE: <i>"Do not start valproate in primary care to treat bipolar disorder"</i>; BAP 2016 says its risk/benefit <i>"contraindicates its use in women of child bearing potential under normal circumstances"</i>. <sup class="c" data-ref="FDA-Lamictal,NICE2014CG185F,Goodwin2016BAP" title="Source 130,186,373">130,186,373</sup>`]]},
 ltg:{n:'Lamotrigine',ph:[['Not recommended','bad','level 1 negative'],['First-line','good','alone or added on'],['First-line','good','mainly prevents depression']],
  cards:[
   ['Best evidence',`Maintenance, mostly against depression: lamotrigine was <i>"predominantly effective against depression"</i> and lithium <i>"predominantly effective against mania"</i>. For acute bipolar depression the effect is modest (response RR 1.27; SMD 0.16, the smallest among agents that beat placebo). It is no better than placebo in acute mania, and the label states <i>"Treatment of acute manic or mixed episodes is not recommended"</i>. <sup class="c" data-ref="Calabrese2003Lamotrigine,Geddes2009Lamotrigine,Yildiz2023,Cipriani2011,FDA-Lamictal" title="Source 64,82,130,162,528">64,82,130,162,528</sup>`],
   ['Boxed warning',`Serious skin rash, including Stevens–Johnson syndrome: about 0.08–0.3% of adults and 0.3–0.8% of those aged 2–17, nearly all within 2–8 weeks of starting. Hence the slow published titration in the animation above. <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>`],
   ['Monitoring',`Watching for rash while the dose is rising. The label advises that people taking it for more than 16 weeks <i>"should be periodically reassessed to determine the need for maintenance treatment"</i>. Levels are not measured routinely (NICE). In Miura 2014 it was better tolerated than carbamazepine, lithium, or lithium plus valproate. <sup class="c" data-ref="FDA-Lamictal,NICE2014CG185F,Miura2014" title="Source 130,344,373">130,344,373</sup>`],
   ['Key interactions',`Valproate: about half the schedule. Carbamazepine, phenytoin, phenobarbital or primidone: about double. Estrogen-containing contraceptives can lower levels by up to half, so doses change when they start or stop. <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>`]]},
 cbz:{n:'Carbamazepine',ph:[['Second-line','warn','level 1, downgraded for safety'],['Not covered','na','not in this module’s sources'],['Not better than placebo','bad','Miura 2014 network analysis']],
  cards:[
   ['Best evidence',`Acute mania: SMD −0.36 vs placebo in Cipriani 2011, and the extended-release capsule (Equetro) is indicated for <i>"acute manic or mixed episodes associated with bipolar I disorder"</i>. CANMAT/ISBD 2018 downgrades it to second-line <i>"due to safety/tolerability risks"</i>. For maintenance it did not significantly lower relapse vs placebo (RR 0.68, 0.44–1.06). <sup class="c" data-ref="Cipriani2011,FDA-Equetro,Yatham2018,Miura2014" title="Source 82,129,344,525">82,129,344,525</sup>`],
   ['Boxed warning',`SJS/TEN in about 1–6 per 10,000 new users in mainly Caucasian populations, about 10 times higher in people of Asian descent; and aplastic anaemia and agranulocytosis at 5–8 times the general-population risk. A complete blood count is taken before starting. <sup class="c" data-ref="FDA-Equetro" title="Source 129">129</sup>`],
   ['HLA-B*15:02',`The label says to test for HLA-B*1502 before starting in people with <i>"an increased likelihood of carrying this allele"</i>, and to avoid it in carriers unless the benefit clearly outweighs the risk. In Taiwan, screening 4,877 people (7.7% carriers) gave zero SJS/TEN cases against about 10 expected. In Northern Europeans, HLA-A*3101 raised hypersensitivity risk from 5.0% to 26.0%. <sup class="c" data-ref="FDA-Equetro,Chung2004HLA,Chen2011HLA,McCormack2011HLA" title="Source 76,80,129,315">76,80,129,315</sup>`],
   ['Key interactions',`Carbamazepine induces CYP3A4 and <i>"may decrease the effectiveness of hormonal contraceptives"</i>. It roughly doubles lamotrigine's published schedule and target. <sup class="c" data-ref="FDA-Equetro,FDA-Lamictal" title="Source 129,130">129,130</sup>`]]}
};
inits.stabilisers=()=>{
  /* ---------- 1. lamotrigine titration calendar ---------- */
  const svg=$('#stSvg'),rg=$('#stT');let sch='std';
  const dose=(S,d)=>{const w=clamp(Math.floor(d/7),0,6);return S.w[w]};
  const taken=(S,d)=>!(S.eod&&d<14&&d%2===1);
  function draw(t){
    const N=vb(svg,'720 380','400 600'),S=ST_SCH[sch];
    const day=Math.min(48.99,t*49),dI=Math.floor(day),wk=Math.floor(day/7),p=phaseOf(ST_STEPS,t),rash=p===4?1:0;
    const L=N?{x0:52,x1:380,yt:262,yb:540,hy:24}:{x0:70,x1:700,yt:104,yb:318,hy:24};
    const X=d=>L.x0+(L.x1-L.x0)*d/49,Y=v=>L.yb-(L.yb-L.yt)*v/400;
    let s=`<defs>${marker('stArr','var(--bad)')}</defs>`;
    s+=`<text x="16" y="${L.hy}" class="t-lbl" style="fill:var(--rx)">${S.n}</text>`;
    s+=N?`<text x="16" y="${L.hy+16}" class="t-xs">week ${wk+1} · day ${dI+1} · ${S.lab[wk]}</text>`
        :`<text x="704" y="${L.hy}" class="t-sm t-end">week ${wk+1} · day ${dI+1} · ${S.lab[wk]}</text>`;
    /* calendar */
    for(let w=0;w<7;w++)for(let d=0;d<7;d++){const di=w*7+d,past=di<=dI,tk=taken(S,di),now=di===dI;
      let cx,cy,sz;if(N){sz=14;cx=56+d*18;cy=52+w*25}else{sz=10;cx=X(w*7)+3+d*12.4;cy=42}
      s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${sz}" height="${sz}" rx="2.5" style="fill:${past&&tk?'var(--rx)':'var(--panel)'};stroke:${now?'var(--ink)':past?'var(--rx)':'var(--line)'};stroke-width:${now?2:1};opacity:${past&&!tk?.9:1}"/>`;
      if(past&&!tk)s+=`<line x1="${f1(cx+3)}" x2="${f1(cx+sz-3)}" y1="${f1(cy+sz/2)}" y2="${f1(cy+sz/2)}" style="stroke:var(--rx);stroke-width:1.2"/>`}
    if(N){for(let w=0;w<7;w++){const cy=52+w*25+11;s+=`<text x="48" y="${cy}" class="t-xs t-end" style="${w===wk?'fill:var(--ink);font-weight:700':''}">wk ${w+1}</text>`;
        if(w<=wk)s+=`<text x="190" y="${cy}" class="t-xs" style="fill:${w===wk?'var(--rx)':'var(--muted)'};${w===wk?'font-weight:700':''}">${S.lab[w]}</text>`}
      s+=`<text x="56" y="${52+7*25+8}" class="t-xs">filled = a dose day · dash = no dose that day</text>`}
    else s+=`<text x="${L.x0-6}" y="51" class="t-xs t-end">days</text><text x="${L.x0}" y="70" class="t-xs">filled = a dose day · dash = no dose that day (every-other-day weeks)</text>`;
    /* rash window: label says weeks 2 to 8 */
    const rx0=X(7),op=.18+rash*.5;
    s+=`<rect x="${f1(rx0)}" y="${L.yt-8}" width="${f1(L.x1-rx0)}" height="${f1(L.yb-L.yt+8)}" style="fill:var(--bad-soft);opacity:${f1(op)}"/>`;
    s+=`<line x1="${f1(rx0)}" x2="${f1(rx0)}" y1="${L.yt-8}" y2="${L.yb}" style="stroke:var(--bad);stroke-width:1;stroke-dasharray:3 3;opacity:${f1(.4+rash*.6)}"/>`;
    s+=`<text x="${f1(rx0+6)}" y="${L.yt+6}" class="t-xs" style="fill:var(--bad);opacity:${f1(.6+rash*.4)}">${N?'rash window: weeks 2–8':'nearly all life-threatening rashes: weeks 2–8'}</text>`;
    s+=`<path d="M${f1(L.x1-34)} ${L.yt+16}H${f1(L.x1-4)}" style="stroke:var(--bad);stroke-width:1.4;opacity:${f1(.5+rash*.5)}" marker-end="url(#stArr)"/>`;
    /* grid */
    [0,100,200,300,400].forEach(v=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<text x="${L.x0-6}" y="${L.yt-12}" class="t-xs t-end">mg/day</text>`;
    for(let w=0;w<7;w++)s+=`<text x="${f1(X(w*7+3.5))}" y="${L.yb+16}" class="t-xs t-mid" style="${w===wk?'fill:var(--ink);font-weight:700':''}">wk ${w+1}</text>`;
    s+=`<text x="${L.x1}" y="${L.yb+32}" class="t-xs t-end">weeks since starting →</text>`;
    /* ghost schedules */
    const stepPath=(S2,upto)=>{let d='';for(let w=0;w<7;w++){const a=w*7,b=Math.min(upto,a+7);if(b<=a)break;const y=Y(S2.w[w]);d+=(w?'L':'M')+f1(X(a))+' '+f1(y)+'L'+f1(X(b))+' '+f1(y)}return d};
    Object.keys(ST_SCH).filter(k=>k!==sch).forEach(k=>{s+=`<path d="${stepPath(ST_SCH[k],49)}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.55"/>`});
    /* target */
    const ty=Y(S.tg),tOn=t>=5/7;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:2 3;opacity:${tOn?.9:.3}"/>`;
    s+=`<text x="${f1(N?L.x0+4:L.x0+6)}" y="${f1(ty-5)}" class="t-xs" style="fill:var(--rx);opacity:${tOn?1:.5}">label target ${S.tg} mg/day</text>`;
    /* active schedule */
    const ap=stepPath(S,day+.01);
    s+=`<path d="${ap}L${f1(X(day))} ${L.yb}L${L.x0} ${L.yb}Z" style="fill:var(--rx-soft);opacity:.7;stroke:none"/>`;
    s+=`<path d="${ap}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round"/>`;
    /* dose labels at each new level */
    let prev=null;for(let w=0;w<=wk;w++){const v=S.w[w];if(v===prev)continue;prev=v;let e=w;while(e<6&&S.w[e+1]===v)e++;
      const mx=X((w*7+Math.min((e+1)*7,day+1))/2+0),lx=clamp(X(w*7)+4,L.x0,L.x1-40);void mx;
      s+=`<text x="${f1(lx)}" y="${f1(Y(v)-6)}" class="t-xs" style="fill:var(--rx);font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px">${v===12.5?'25 alt. days':v}</text>`}
    /* today marker */
    const hx=X(day),hy=Y(dose(S,day));
    s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.yt-8}" y2="${L.yb}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=pill(hx,hy-16,22,{ang:-20});
    s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="4.5" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);
    $('#stRead').innerHTML=`<span>schedule <b>${S.nl}</b></span><span>week <b>${wk+1}</b></span><span>label dose <b>${S.lab[wk]}</b></span>`;
    $('#stNote').innerHTML=noteHTML(ST_STEPS[p]);
    rg.setAttribute('aria-valuetext',`Week ${wk+1}, day ${dI+1}: ${S.lab[wk]} (${S.n})`);
  }
  function legend(){$('#stLeg').innerHTML=Object.keys(ST_SCH).map(k=>`<span><i class="${k===sch?'on':''}" style="background:${k===sch?'var(--rx)':'var(--muted)'};opacity:${k===sch?1:.55}"></i>${ST_SCH[k].n}${k===sch?' (shown)':' (dashed)'}</span>`).join('')+`<span><i style="background:var(--bad-soft);height:10px;border:1px solid var(--bad)"></i>rash window</span>`}
  const stop=playWire(rg,$('#stPlay'),draw,16000,'Replay','stabilisers');
  const setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  $$('[data-stsch]').forEach(b=>b.addEventListener('click',()=>{sch=b.dataset.stsch;$$('[data-stsch]').forEach(x=>x.setAttribute('aria-pressed',x===b));legend();draw(+rg.value)}));
  legend();draw(+rg.value);

  /* ---------- 2. valproate in pregnancy: icon arrays ---------- */
  const pg=$('#stPg'),prg=$('#stPgT');let ds='2018';
  const order=[0,1,2,3].map(i=>{const r=rng(31+i*7),a=[...Array(100).keys()];for(let k=99;k>0;k--){const j=Math.floor(r()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a});
  function drawPg(t){
    const N=vb(pg,'720 340','400 640'),D=ST_PG[ds].d,p=phaseOf(ST_PGN,t);
    const show=Math.round(ramp(t,0,.25)*100);let s='';
    D.forEach(([nm,v],i)=>{
      const px=N?12+(i%2)*196:14+i*176,py=N?(i<2?16:296):16,cnt=Math.round(v);
      const hi=i===0?ramp(t,.3,.48):ramp(t,.54+(i-1)*.08,.62+(i-1)*.08),k=Math.round(hi*cnt);
      const lit=new Set(order[i].slice(0,k));
      s+=`<rect x="${px}" y="${py}" width="${N?184:166}" height="${N?268:262}" rx="12" style="fill:${i===0?'var(--bad-soft)':'var(--field)'};stroke:var(--line);opacity:${i===0?.55:1}"/>`;
      s+=`<text x="${px+10}" y="${py+22}" class="t-lbl">${nm}</text>`;
      for(let j=0;j<show;j++){const gx=px+(N?18:10)+(j%10)*15,gy=py+32+Math.floor(j/10)*16;
        s+=person(gx,gy,12,lit.has(j)?'var(--bad)':'var(--muted)',{op:lit.has(j)?1:.32})}
      const shown=hi>0?(v*hi).toFixed(1):'–';
      s+=`<text x="${px+10}" y="${py+222}" style="font:800 24px var(--display);fill:${i===0?'var(--bad)':'var(--ink)'}">${hi>0?shown+'%':''}</text>`;
      s+=`<text x="${px+10}" y="${py+242}" class="t-xs">${hi>=1?'about '+cnt+' in 100 babies':'major malformation at 1 year'}</text>`;
      s+=`<text x="${px+10}" y="${py+256}" class="t-xs">${ST_PG[ds].src}</text>`});
    const fo=ramp(t,.86,.95);
    if(fo>0){const y0=N?590:300,x0=N?12:14;
      s+=`<g style="opacity:${f1(fo)}"><text x="${x0}" y="${y0}" class="t-sm" style="fill:var(--bad)">Spina bifida (US label): about 1–2% after valproate</text><text x="${x0}" y="${y0+16}" class="t-sm">vs about 0.06–0.07% in the general population</text></g>`}
    pg.innerHTML=s;
    $('#stPgNote').innerHTML=noteHTML(ST_PGN[p]);
  }
  playWire(prg,$('#stPgPlay'),drawPg,11000,'Replay','stabilisers');
  $$('[data-stpg]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.stpg;$$('[data-stpg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawPg(+prg.value)}));
  drawPg(+prg.value);

  /* ---------- 3. comparator ---------- */
  const cs=$('#stCmpSvg');let dr='vpa';
  const COL={good:['var(--good)','var(--good-soft)'],warn:['var(--warn)','var(--warn-soft)'],bad:['var(--bad)','var(--bad-soft)'],na:['var(--muted)','var(--panel-2)']};
  function drawCmp(){
    const N=vb(cs,'720 150','400 330'),C=ST_CMP[dr],PH=['Acute mania','Acute bipolar depression','Maintenance'];let s='';
    s+=`<text x="12" y="20" class="t-lbl" style="fill:var(--rx)">${C.n}</text>`;
    C.ph.forEach(([v,c,sub],i)=>{const [fg,bg]=COL[c],x=N?12:12+i*236,y=N?32+i*98:34,w=N?376:224,h=N?88:104;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:${bg};stroke:${fg};stroke-width:1.4"/>`;
      s+=`<text x="${x+14}" y="${y+22}" class="t-sm">${PH[i].toUpperCase()}</text>`;
      s+=`<text x="${x+14}" y="${y+50}" style="font:800 20px var(--display);fill:${fg}">${v}</text>`;
      s+=`<text x="${x+14}" y="${y+72}" class="t-xs">${sub}</text>`});
    cs.innerHTML=s;
    $('#stCmp').innerHTML=C.cards.map(([h,tx])=>`<div class="card"><p class="kicker">${C.n}</p><h4>${h}</h4><p>${tx}</p></div>`).join('');
  }
  $$('[data-stdrug]').forEach(b=>b.addEventListener('click',()=>{dr=b.dataset.stdrug;$$('[data-stdrug]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCmp()}));
  drawCmp();
  redraws.stabilisers=(prevR=>()=>{prevR&&prevR();drawCmp()})(redraws.stabilisers);
};
/* =============== 3.4 Antipsychotics in bipolar disorder =============== */
/* Cipriani 2011 antimanic SMD vs placebo (magnitude), ap = antipsychotic */
const AP_MAN=[['Haloperidol',.56,1],['Risperidone',.50,1],['Olanzapine',.43,1],['Lithium',.37,0],['Quetiapine',.37,1],['Aripiprazole',.37,1],['Carbamazepine',.36,0],['Asenapine',.30,1],['Valproate',.20,0],['Ziprasidone',.20,1]];
const AP_FEW={Olanzapine:1,Risperidone:1,Quetiapine:1};
/* bipolar depression NNT for response vs placebo: Ketter 2014; cariprazine Citrome 2019. kind: 1 approved antipsychotic, 0 comparison */
const AP_DEP=[['Olanzapine–fluoxetine',4,1],['Lurasidone (alone)',5,1],['Quetiapine',6,1],['Lurasidone (add-on)',7,1],['Cariprazine',10,1],['Lumateperone',null,1],['Lamotrigine',12,0],['Add-on antidepressants',29,0]];
const AP_STEPS=[
 {from:0,at:.03,k:'Acute mania',t:'The yardstick',
  txt:`Cipriani and colleagues pooled 68 randomised trials in acute mania (16,073 participants) in a network meta-analysis, so every drug could be compared with placebo and with each other. Each dot is a standardised mean difference (SMD): how far, on average, mania scores fell beyond placebo. <sup class="c" data-ref="Cipriani2011" title="Source 82">82</sup>`,
  pt:`Each dot shows how much more a medicine helped than a dummy pill, on average. Further right means a bigger effect.`},
 {from:.08,at:.19,k:'Acute mania',t:'Top of the table',
  txt:`Haloperidol (SMD −0.56), risperidone (−0.50) and olanzapine (−0.43) came out on top. The authors concluded that <i>"antipsychotic drugs were significantly more effective than mood stabilisers"</i> and that risperidone, olanzapine and haloperidol <i>"should be considered as among the best of the available options"</i>. <sup class="c" data-ref="Cipriani2011" title="Source 82">82</sup>`,
  hook:`Most effective antimanic drugs in Cipriani 2011: haloperidol, risperidone, olanzapine.`},
 {from:.21,at:.31,k:'Acute mania',t:'A crowded middle',
  txt:`Lithium, quetiapine and aripiprazole (each −0.37) and carbamazepine (−0.36) sit close together. CANMAT/ISBD 2018 lists lithium, quetiapine, divalproex, asenapine, aripiprazole, paliperidone, risperidone and cariprazine as first-line monotherapy, with <i>"comparable efficacy (Cohen's d 0.32‐0.66)"</i>, and suggests lithium <i>"should be considered first for acute mania unless there are specific reasons not to"</i>. <sup class="c" data-ref="Cipriani2011,Yatham2018" title="Source 82,525">82,525</sup>`,
  pt:`Several medicines work about equally well for mania. The choice often depends on side effects, past response and what the person prefers.`,
  hook:`CANMAT/ISBD 2018: about 50% respond to one medicine within 3–4 weeks; adding an antipsychotic to lithium or divalproex helps about 20% more.`},
 {from:.34,at:.45,k:'Acute mania',t:'Smaller effects',
  txt:`Asenapine (−0.30), valproate (−0.20) and ziprasidone (−0.20) still beat placebo. Pooled across 38 trials, 48% responded on an active drug vs 31% on placebo, a number needed to treat (NNT) of 6. Second-generation antipsychotics did not differ from haloperidol in head-to-head trials. <sup class="c" data-ref="Cipriani2011,Yildiz2011Mania" title="Source 82,527">82,527</sup>`,
  pt:`About half of people improved clearly on a medicine within weeks, against about a third on a dummy pill.`,
  hook:`Mania: pooled response 48% vs 31%, NNT 6 (Yildiz 2011).`},
 {from:.47,at:.56,k:'Acute mania',t:'Staying on treatment',
  txt:`Olanzapine, risperidone and quetiapine led to significantly fewer discontinuations than lithium, lamotrigine, placebo, topiramate and gabapentin. Gabapentin, lamotrigine and topiramate were no better than placebo for mania. NICE: if mania develops in someone not on an antipsychotic or mood stabiliser, <i>"offer haloperidol, olanzapine, quetiapine or risperidone"</i>. <sup class="c" data-ref="Cipriani2011,NICE2014CG185F" title="Source 82,373">82,373</sup>`,
  pt:`A medicine only helps if a person can keep taking it, so how many people stop early matters as much as the average effect.`},
 {from:.6,at:.86,k:'Bipolar depression',t:'Five approved treatments',
  txt:`Quetiapine, lurasidone, cariprazine, lumateperone and olanzapine–fluoxetine are US-approved for bipolar depression. Here each is shown as an NNT: how many people need treating for one extra response compared with placebo (smaller is better). Olanzapine–fluoxetine 4, lurasidone 5 alone and 7 as an add-on, quetiapine 6, cariprazine 10; lamotrigine (12) and add-on antidepressants (29) are shown for comparison. <sup class="c" data-ref="Ketter2014,Citrome2019Cariprazine,FDA-Seroquel,FDA-Latuda,FDA-Vraylar,FDA-Caplyta,FDA-OlanzapineFluoxetine" title="Source 85,127,131,134,136,137,275">85,127,131,134,136,137,275</sup>`,
  pt:`Several antipsychotic medicines treat bipolar depression, not only mania. Each has different side effects.`,
  hook:`FDA-approved for bipolar depression: quetiapine, lurasidone, cariprazine, lumateperone, olanzapine–fluoxetine.`},
 {from:.92,at:1,k:'Bipolar depression',t:'Bipolar II and the trade-offs',
  txt:`In a 2023 network meta-analysis of 101 trials, effects ranged from SMD 0.41 (olanzapine plus fluoxetine) to 0.16 (lamotrigine). Lumateperone's NNT is not in this guide's sources; its trial effect size was 0.56, in bipolar I and II. Quetiapine is <i>"the only recommended first‐line treatment for BDII depression"</i> in CANMAT/ISBD 2018. Benefits come with harms: olanzapine–fluoxetine weight gain NNH 6, quetiapine sedation NNH 5. <sup class="c" data-ref="Yildiz2023,Calabrese2021Lumateperone,Yatham2018,Ketter2014" title="Source 68,275,525,528">68,275,525,528</sup>`,
  pt:`The most effective option is not always the best one for a person. Weight gain and sleepiness are weighed against how well a medicine works.`,
  hook:`Quetiapine is the only CANMAT/ISBD 2018 first-line treatment for bipolar II depression.`}
];
/* NICE CG185 monitoring events (weeks) for the four rows */
const AP_MROWS=[['Weight / BMI','wt'],['Glucose or HbA1c','glu'],['Blood lipids','lip'],['Pulse & blood pressure','bp']];
const AP_MEV={wt:[0,1,2,3,4,5,6,12,52],glu:[0,12,52],lip:[0,12,52],bp:[0,52]};
const AP_MN=[
 {from:0,k:'Before starting',t:'A baseline',
  txt:`NICE CG185: before starting an antipsychotic, measure and record weight or BMI, pulse, blood pressure, fasting blood glucose or HbA1c, and blood lipid profile. <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>`,
  pt:`A first set of measurements gives a starting point, so any change later can be spotted early.`},
 {from:.03,k:'Weeks 1–6',t:'Weight every week',
  txt:`NICE monitoring during treatment: weight or BMI weekly for the first 6 weeks. Pulse and blood pressure are checked after each dose change, and movement disorders and adherence are also monitored. Weight gain can start early: in the olanzapine maintenance trial, people gained a mean of 3.1 kg during the open-label phase. <sup class="c" data-ref="NICE2014CG185F,Tohen2006Olanzapine" title="Source 373,488">373,488</sup>`,
  hook:`NICE antipsychotic monitoring: weight weekly for 6 weeks, then at 12 weeks; glucose/HbA1c and lipids at 12 weeks.`},
 {from:.5,k:'Week 12',t:'Blood tests again',
  txt:`At 12 weeks NICE advises weight or BMI again, plus fasting glucose or HbA1c and lipids. In the Seroquel label, 21% of adults on quetiapine for mania gained at least 7% of body weight within 12 weeks, vs 7% on placebo. <sup class="c" data-ref="NICE2014CG185F,FDA-Seroquel" title="Source 136,373">136,373</sup>`,
  pt:`Some medicines can cause weight gain and raise blood sugar or cholesterol. Regular weight and blood checks help catch this early.`},
 {from:.9,k:'Every year',t:'The annual health check',
  txt:`NICE's annual physical health check covers weight or BMI, diet, nutrition and physical activity; pulse and blood pressure; fasting glucose or HbA1c and lipids; and liver, renal and thyroid function and calcium. Metabolic syndrome affects 37.3% of people with bipolar disorder, and 45.3% of those taking antipsychotics vs 32.4% of those not. <sup class="c" data-ref="NICE2014CG185,Vancampfort2013" title="Source 372,499">372,499</sup>`,
  pt:`A yearly check-up of the body is part of treatment for bipolar disorder, not an extra.`}
];
/* side-effect comparator: metabolic tier 0 lower, 1 middle, 2 highest; null = no ranking in the sources */
const AP_SE={
 ola:{n:'Olanzapine',tier:2,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Highest BMI change of 18 antipsychotics (1.07 kg/m²); with clozapine, the worst metabolic profile. <sup class="c" data-ref="Pillinger2020" title="Source 416">416</sup>`,
   `Maintenance trial: mean 3.1 kg gained on open-label olanzapine; another 1.0 kg in those who continued it, while those switched to placebo lost 2.0 kg. <sup class="c" data-ref="Tohen2006Olanzapine" title="Source 488">488</sup>`,
   `Effective for mania (SMD −0.43) and maintenance (relapse 46.7% vs 80.1%), but CANMAT/ISBD places it second-line for maintenance <i>"because of safety issues such as metabolic syndrome"</i>. <sup class="c" data-ref="Cipriani2011,Tohen2006Olanzapine,Yatham2018" title="Source 82,488,525">82,488,525</sup>`]},
 ofc:{n:'Olanzapine–fluoxetine',tier:2,src:'olanzapine’s ranking',f:[
   `The smallest NNT for bipolar depression response (4), and the matching weight-gain NNH is 6. <sup class="c" data-ref="Ketter2014" title="Source 275">275</sup>`,
   `The label carries the antidepressant-class boxed warning on suicidal thoughts in young people, with close monitoring. <sup class="c" data-ref="FDA-OlanzapineFluoxetine" title="Source 134">134</sup>`]},
 que:{n:'Quetiapine',tier:1,src:'CANMAT/ISBD 2018 (higher at higher doses)',f:[
   `CANMAT/ISBD ranks its metabolic risk after clozapine and olanzapine, <i>"particularly at higher doses"</i>. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,
   `Label: ≥7% weight gain in 21% vs 7% on placebo (mania, up to 12 weeks) and 8% vs 2% (bipolar depression, up to 8 weeks). <sup class="c" data-ref="FDA-Seroquel" title="Source 136">136</sup>`,
   `Sedation or somnolence: NNH 5 in bipolar depression trials. <sup class="c" data-ref="Ketter2014" title="Source 275">275</sup>`]},
 ris:{n:'Risperidone',tier:1,src:'CANMAT/ISBD 2018',f:[
   `Ranked after clozapine, olanzapine and quetiapine for metabolic risk by CANMAT/ISBD. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,
   `In a 3-week mania trial (290 inpatients), extrapyramidal (movement) symptoms were its most frequent adverse events. <sup class="c" data-ref="Khanna2005Risperidone" title="Source 276">276</sup>`,
   `Among the most effective for mania (SMD −0.50), with fewer discontinuations than lithium or placebo. <sup class="c" data-ref="Cipriani2011" title="Source 82">82</sup>`]},
 ari:{n:'Aripiprazole',tier:0,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Among the most benign metabolic profiles; CANMAT/ISBD describes <i>"more minimal impact"</i> for aripiprazole, ziprasidone, asenapine and lurasidone. <sup class="c" data-ref="Pillinger2020,Yatham2018" title="Source 416,525">416,525</sup>`,
   `Lower metabolic syndrome risk than other antipsychotics across severe mental illness. <sup class="c" data-ref="Vancampfort2015" title="Source 500">500</sup>`,
   `Not recommended alone for bipolar depression (level 1 negative): its pooled MADRS advantage of 1.12 points was judged not clinically meaningful. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`]},
 lur:{n:'Lurasidone',tier:0,src:'CANMAT/ISBD 2018; Pillinger 2020',f:[
   `Among the most benign metabolic profiles. <sup class="c" data-ref="Pillinger2020" title="Source 416">416</sup>`,
   `NNH for ≥7% weight gain: 29 at 20–60 mg/day, 5550 at 80–120 mg/day, 42 as an add-on. <sup class="c" data-ref="Citrome2014Lurasidone" title="Source 84">84</sup>`,
   `In its monotherapy trial, <i>"minimal changes in weight, lipids, and measures of glycemic control"</i>. <sup class="c" data-ref="Loebel2014Mono" title="Source 303">303</sup>`]},
 car:{n:'Cariprazine',tier:0,src:'Pillinger 2020',f:[
   `Among the most benign metabolic profiles; mean weight gain ≤0.5 kg in all groups in a bipolar depression trial. <sup class="c" data-ref="Pillinger2020,Earley2020Cariprazine" title="Source 116,416">116,416</sup>`,
   `Akathisia (an inner restlessness) was more common on cariprazine than placebo in a mania trial. <sup class="c" data-ref="Calabrese2015Cariprazine" title="Source 66">66</sup>`]},
 lum:{n:'Lumateperone',tier:null,src:'not ranked in these sources',f:[
   `In its phase 3 bipolar depression trial, weight, metabolic and endocrine changes were minimal. <sup class="c" data-ref="Calabrese2021Lumateperone" title="Source 68">68</sup>`,
   `Not included in the metabolic rankings used here, so it has no pointer on the scale.`]},
 hal:{n:'Haloperidol',tier:0,src:'Pillinger 2020 (weight)',f:[
   `The only drug with weight change below placebo in the 18-drug analysis (−0.23 kg). <sup class="c" data-ref="Pillinger2020" title="Source 416">416</sup>`,
   `The largest antimanic effect in Cipriani 2011 (SMD −0.56); second-generation antipsychotics did not differ from it in head-to-head trials. <sup class="c" data-ref="Cipriani2011,Yildiz2011Mania" title="Source 82,527">82,527</sup>`,
   `CANMAT/ISBD 2018 downgrades it to second-line for mania <i>"due to safety/tolerability risks"</i>. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`]}
};
inits.antipsychotics=()=>{
  /* ---------- 1. evidence plot ---------- */
  const svg=$('#apSvg'),rg=$('#apT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(AP_STEPS,t);
    const fm=1-ramp(t,.58,.63),fd=ramp(t,.6,.65);let s='';
    if(fm>0){/* mania dot plot */
      const L=N?{nx:118,x0:126,x1:350,y0:96,dy:40,ax:520}:{nx:150,x0:170,x1:640,y0:70,dy:24.5,ax:326};
      const X=v=>L.x0+(L.x1-L.x0)*v/.6;
      s+=`<g style="opacity:${f1(fm)}">`;
      s+=N?`<text x="12" y="26" class="t-lbl">Acute mania: effect vs placebo</text><text x="12" y="44" class="t-xs">SMD, Cipriani 2011 · 68 trials · 16,073 people</text>`
          :`<text x="12" y="26" class="t-lbl">Acute mania: effect vs placebo (SMD)</text><text x="708" y="26" class="t-xs t-end">Cipriani 2011 · 68 trials · 16,073 people</text>`;
      [0,.1,.2,.3,.4,.5,.6].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-14}" y2="${L.ax}" class="${v?'grid':'axis'}"/><text x="${f1(X(v))}" y="${L.ax+14}" class="t-xs t-mid">${v?'−'+v.toFixed(1):'0'}</text>`});
      s+=`<text x="${f1(X(0))}" y="${L.ax+28}" class="t-xs t-mid">placebo</text><text x="${L.x1}" y="${L.ax+28}" class="t-xs t-end">bigger effect →</text>`;
      AP_MAN.forEach(([nm,v,ap],i)=>{const a=ramp(t,.06+i*.039,.1+i*.039);if(a<=0)return;
        const y=L.y0+i*L.dy,x=lerp(X(0),X(v),ease(a)),c=ap?'var(--rx)':'var(--li)';
        s+=`<text x="${L.nx}" y="${f1(y+4)}" class="t-sm t-end" style="fill:var(--ink);opacity:${f1(a)}">${nm}</text>`;
        s+=`<line x1="${f1(X(0))}" x2="${f1(x)}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2;opacity:.35"/>`;
        s+=`<circle cx="${f1(x)}" cy="${y}" r="7" style="fill:${c};stroke:var(--panel);stroke-width:2"/>`;
        if(a>=1)s+=`<text x="${f1(x+12)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink)">−${v.toFixed(2)}</text>`;
        const fw=ramp(t,.47,.53);if(AP_FEW[nm]&&fw>0)s+=N?`<text x="${L.nx}" y="${f1(y+16)}" class="t-xs t-end" style="fill:var(--good);opacity:${f1(fw)};font-weight:700">✓ fewer drop-outs</text>`:`<text x="${f1(x+54)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--good);opacity:${f1(fw)};font-weight:700">✓ fewer drop-outs</text>`});
      const nb=ramp(t,.49,.55);
      if(nb>0)s+=`<text x="12" y="${L.ax+(N?50:46)}" class="t-sm" style="opacity:${f1(nb)};fill:var(--bad)">${N?'No better than placebo:':'No better than placebo: gabapentin, lamotrigine, topiramate'}</text>${N?`<text x="12" y="${L.ax+66}" class="t-sm" style="opacity:${f1(nb)};fill:var(--bad)">gabapentin, lamotrigine, topiramate</text>`:''}`;
      s+='</g>'}
    if(fd>0){/* depression NNT icon rows */
      const L=N?{nx:12,x0:12,y0:80,dy:62,sz:7,sp:8.6,lab:true}:{nx:186,x0:196,y0:70,dy:34,sz:10,sp:15.5,lab:false};
      s+=`<g style="opacity:${f1(fd)}">`;
      s+=N?`<text x="12" y="26" class="t-lbl">Bipolar depression: number needed</text><text x="12" y="44" class="t-lbl">to treat (NNT) for one extra response</text><text x="12" y="60" class="t-xs">smaller is better · Ketter 2014; Citrome 2019</text>`
          :`<text x="12" y="26" class="t-lbl">Bipolar depression: number needed to treat for one extra response</text><text x="708" y="44" class="t-xs t-end">smaller is better · Ketter 2014; Citrome 2019</text>`;
      AP_DEP.forEach(([nm,n,ap],i)=>{const a=ramp(t,.64+i*.03,.7+i*.03);if(a<=0)return;
        const y=L.y0+i*L.dy,c=ap?'var(--rx)':'var(--muted)',ty=N?y:y+4,ix0=N?L.x0:L.x0,iy=N?y+8:y-9;
        s+=`<text x="${L.nx}" y="${ty}" class="t-sm ${N?'':'t-end'}" style="fill:var(--ink);opacity:${f1(a)}">${nm}${ap?' ':''}</text>`;
        if(n==null){s+=`<text x="${N?ix0:ix0+4}" y="${N?iy+14:ty}" class="t-xs" style="opacity:${f1(a)}">NNT not in this guide's sources; trial effect size 0.56</text>`;return}
        const k=Math.round(a*n);for(let j=0;j<k;j++){const hl=j===0;s+=person(ix0+j*L.sp,iy,L.sz*1.4,hl?c:'var(--muted)',{op:hl?1:.35})}
        if(a>=1)s+=`<text x="${f1(ix0+n*L.sp+6)}" y="${N?iy+10:ty}" class="t-sm" style="fill:${c};font-weight:700">${n}</text>`});
      s+=`<text x="12" y="${N?585:370}" class="t-xs">${N?'one coloured figure = one extra responder':'each row: treat this many people for one extra person to respond (the coloured figure) compared with placebo'}</text>`;
      s+='</g>'}
    svg.innerHTML=s;setSt(p);
    $('#apNote').innerHTML=noteHTML(AP_STEPS[p]);
    $$('[data-apmode]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.apmode==='dep')===(t>=.6)));
  }
  const stop=playWire(rg,$('#apPlay'),draw,22000,'Replay','antipsychotics');
  const setSt=stepWire($('#apSteps'),AP_STEPS,rg,draw,stop);
  $$('[data-apmode]').forEach(b=>b.addEventListener('click',()=>{stop();const v=b.dataset.apmode==='dep'?1:.56;rg.value=v;draw(v)}));
  draw(+rg.value);

  /* ---------- 2. monitoring timeline ---------- */
  const ms=$('#apMon'),mr=$('#apMonT');
  const W=u=>u<=.6?u/.6*12:12+(u-.6)/.4*40,U=w=>w<=12?w/12*.6:.6+(w-12)/40*.4;
  function icon(k,x,y,c){if(k==='wt')return `<rect x="${f1(x-8)}" y="${f1(y-6)}" width="16" height="12" rx="3" style="fill:none;stroke:${c};stroke-width:1.6"/><path d="M${f1(x-3)} ${f1(y-1)}L${f1(x)} ${f1(y-4)}" style="stroke:${c};stroke-width:1.6;stroke-linecap:round"/>`;
    if(k==='glu')return `<path d="M${f1(x)} ${f1(y-8)}C${f1(x+6)} ${f1(y-1)} ${f1(x+6)} ${f1(y+6)} ${f1(x)} ${f1(y+6)}S${f1(x-6)} ${f1(y-1)} ${f1(x)} ${f1(y-8)}Z" style="fill:${c};opacity:.85"/>`;
    if(k==='lip')return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="8" ry="6" style="fill:none;stroke:${c};stroke-width:1.6"/><circle cx="${f1(x-2)}" cy="${f1(y-1)}" r="2" style="fill:${c}"/>`;
    return `<path d="M${f1(x)} ${f1(y+6)}L${f1(x-7)} ${f1(y-1)}A3.8 3.8 0 0 1 ${f1(x)} ${f1(y-5)}A3.8 3.8 0 0 1 ${f1(x+7)} ${f1(y-1)}Z" style="fill:${c};opacity:.85"/>`}
  function drawMon(t){
    const N=vb(ms,'720 300','400 430'),wk=W(t),p=phaseOf(AP_MN,t);
    const L=N?{x0:40,x1:384,y0:140,dy:62,lx:12,ly:-20,ax:392}:{x0:200,x1:700,y0:70,dy:50,lx:16,ly:4,ax:262};
    const X=u=>L.x0+(L.x1-L.x0)*u;let s='';
    s+=`<text x="12" y="24" class="t-lbl">Week ${Math.round(wk)} on an antipsychotic</text><text x="${N?12:708}" y="${N?42:24}" class="t-xs ${N?'':'t-end'}">NICE CG185 schedule</text>`;
    s+=`<rect x="${f1(X(0))}" y="${L.y0-24}" width="${f1(X(.6)-X(0))}" height="${f1(L.dy*3+48)}" rx="8" style="fill:var(--rx-soft);opacity:.35"/>`;
    s+=`<text x="${f1(X(.3))}" y="${L.y0-(N?40:30)}" class="t-xs t-mid" style="fill:var(--rx)">first 12 weeks (stretched)</text>`;
    AP_MROWS.forEach(([nm,k],i)=>{const y=L.y0+i*L.dy;
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" class="grid"/>`;
      s+=`<text x="${L.lx}" y="${y+L.ly}" class="t-sm" style="fill:var(--ink)">${nm}</text>`;
      AP_MEV[k].forEach(w=>{const u=U(w),x=X(u),done=t>=u-1e-6,now=Math.abs(t-u)<.02;
        const rr=N?8:11;s+=`<circle cx="${f1(x)}" cy="${y}" r="${now?rr+2:rr}" style="fill:${done?'var(--rx-soft)':'var(--panel)'};stroke:${done?'var(--rx)':'var(--line)'};stroke-width:${now?2:1.2}"/>`;
        s+=N?`<g transform="translate(${f1(x)} ${y}) scale(.7) translate(${f1(-x)} ${-y})">${icon(k,x,y,done?'var(--rx)':'var(--muted)')}</g>`:icon(k,x,y,done?'var(--rx)':'var(--muted)');
        if(done&&w>0)s+=`<path d="M${f1(x+6)} ${f1(y-14)}l3 3l6 -7" style="fill:none;stroke:var(--good);stroke-width:2;stroke-linecap:round"/>`})});
    if(true){const y=L.y0+3*L.dy;s+=`<text x="${f1(X(.3))}" y="${y+26}" class="t-xs t-mid">+ after each dose change</text>`}
    [0,6,12,26,52].forEach(w=>{const x=X(U(w));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ax-4}" y2="${L.ax+4}" class="axis"/><text x="${f1(x)}" y="${L.ax+16}" class="t-xs t-mid">${w===0?'start':w===52?'1 yr':'wk '+w}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    const cx=X(t);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.y0-24}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/><circle cx="${f1(cx)}" cy="${L.ax}" r="5" style="fill:var(--rx)"/>`;
    ms.innerHTML=s;$('#apMonNote').innerHTML=noteHTML(AP_MN[p]);
    mr.setAttribute('aria-valuetext',`Week ${Math.round(wk)}`);
  }
  playWire(mr,$('#apMonPlay'),drawMon,12000,'Replay','antipsychotics');drawMon(+mr.value);

  /* ---------- 3. side-effect comparator ---------- */
  const se=$('#apSe'),sel=$('#apDrug');
  function drawSe(){
    const N=vb(se,'720 150','400 190'),D=AP_SE[sel.value],TL=['Lower','Middle','Highest'],TC=['var(--good)','var(--warn)','var(--bad)'];
    const x0=N?12:20,w=N?376:680,y=N?70:66,sw=w/3;let s='';
    s+=`<text x="${x0}" y="24" class="t-lbl">${D.n}: metabolic risk ranking</text><text x="${x0}" y="42" class="t-xs">${D.src}</text>`;
    TL.forEach((l,i)=>{s+=`<rect x="${f1(x0+i*sw+2)}" y="${y}" width="${f1(sw-4)}" height="22" rx="6" style="fill:${TC[i]};opacity:${D.tier===i?.9:.22}"/><text x="${f1(x0+i*sw+sw/2)}" y="${y+40}" class="t-sm t-mid" style="${D.tier===i?'fill:var(--ink);font-weight:700':''}">${l}</text>`});
    if(D.tier!=null){const px=x0+D.tier*sw+sw/2;s+=`<path d="M${f1(px-8)} ${y-14}L${f1(px+8)} ${y-14}L${f1(px)} ${y-3}Z" style="fill:var(--ink)"/>`}
    else s+=`<text x="${f1(x0+w/2)}" y="${y+(N?70:62)}" class="t-xs t-mid">not ranked in these sources</text>`;
    se.innerHTML=s;
    $('#apSeNote').innerHTML=`<div class="kicker">Side effects</div><h4>${D.n}</h4><ul class="apfacts">${D.f.map(x=>`<li>${x}</li>`).join('')}</ul><div class="pt"><b>In plain words</b>Every medicine has trade-offs. Side effects differ a lot between antipsychotics, so if one is hard to live with, there are often others to discuss with the prescriber.</div>`;
  }
  sel.addEventListener('change',drawSe);drawSe();
  redraws.antipsychotics=(prevR=>()=>{prevR&&prevR();drawSe()})(redraws.antipsychotics);
};
/* =============== 3.5 Treating bipolar depression =============== */
const DE_STEPS=[
 {from:0,at:.06,k:'STEP-BD, 2007',t:'The question',
  txt:`STEP-BD asked whether adding an antidepressant helps bipolar depression. 366 people already taking a mood stabiliser were randomised to add an antidepressant or a placebo, for up to 26 weeks. <sup class="c" data-ref="Sachs2007STEPBD" title="Source 435">435</sup>`,
  pt:`Everyone in the trial kept their mood stabiliser. Half also got an antidepressant, half a dummy pill, and nobody knew which.`},
 {from:.12,at:.3,k:'STEP-BD, 2007',t:'No added recovery',
  txt:`Durable recovery occurred in 23.5% (42 of 179) with the antidepressant and 27.3% (51 of 187) with placebo (P = 0.40). Rates of treatment-emergent affective switch were similar in the two arms. <sup class="c" data-ref="Sachs2007STEPBD" title="Source 435">435</sup>`,
  pt:`Adding a standard antidepressant did not help more people get better than adding a dummy pill, and it did not cause more switches into mania in this trial.`,
  hook:`STEP-BD: adding an antidepressant to a mood stabiliser gave no added recovery (23.5% vs 27.3%) and no increased switch.`},
 {from:.36,at:.5,k:'ISBD task force, 2013',t:'Weak evidence, wide use',
  txt:`The ISBD task force found <i>"striking incongruity between the wide use of and the weak evidence base"</i> for antidepressants in bipolar disorder, and reached consensus on 12 statements. SSRIs and bupropion <i>"may have lower rates of manic switch"</i> than tricyclics, tetracyclics and SNRIs. In bipolar I, antidepressants <i>"should be prescribed only as an adjunct to mood-stabilizing medications"</i>. A 2004 review found switch rates of 10% with tricyclics vs 3.2% with all other antidepressants combined. <sup class="c" data-ref="Pacchiarotti2013,Gijsman2004" title="Source 175,393">175,393</sup>`,
  pt:`Standard antidepressants on their own can tip some people with bipolar disorder into mania. Doctors usually use them, if at all, only together with a mood stabiliser.`,
  hook:`Tricyclics carry the highest switch risk: 10% vs 3.2% for other antidepressants.`},
 {from:.56,at:.76,k:'CANMAT/ISBD 2018',t:'First-line for bipolar I depression',
  txt:`CANMAT/ISBD 2018 lists its first-line choices for bipolar I depression in this hierarchy order: quetiapine; lurasidone plus lithium or divalproex; lithium; lamotrigine; lurasidone; and adjunctive lamotrigine. Rankings weigh efficacy, clinical experience, and safety, tolerability and switch risk. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,
  pt:`Several medicines are recommended as a first choice. Which one suits a person depends on their past response, other conditions and side effects.`,
  hook:`CANMAT 2018 first-line bipolar I depression: quetiapine, lurasidone + Li/DVP, lithium, lamotrigine, lurasidone, adjunctive lamotrigine.`},
 {from:.8,at:.88,k:'CANMAT/ISBD 2018',t:'Second-line, and not recommended',
  txt:`Divalproex, adjunctive SSRIs or bupropion (moved down from first-line in 2013 because of weak efficacy data) and ECT are second-line. The guideline states <i>"Antidepressant monotherapy should NOT be used for the treatment of BDI depression"</i>, and aripiprazole monotherapy is not recommended (level 1 negative). Antidepressants should ideally be avoided or used cautiously after antidepressant-induced mania or hypomania, with mixed features, or with recent rapid cycling. <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>`,
  hook:`Antidepressant monotherapy should not be used in bipolar I depression (CANMAT/ISBD 2018).`},
 {from:.93,at:1,k:'Bipolar II and NICE',t:'Bipolar II, and the UK view',
  txt:`For bipolar II depression, quetiapine is <i>"the only recommended first‐line treatment"</i>; lithium, sertraline, venlafaxine, lamotrigine and ECT are second-line. NICE CG185, for moderate or severe bipolar depression in someone not on treatment: <i>"offer fluoxetine combined with olanzapine, or quetiapine on its own"</i>, with olanzapine alone or lamotrigine alone if the person prefers. <sup class="c" data-ref="Yatham2018,NICE2014CG185F" title="Source 373,525">373,525</sup>`,
  pt:`Guidelines from different countries agree on the main options but rank them a little differently.`}
];
const DE_LAD=['Quetiapine','Lurasidone + lithium or divalproex','Lithium','Lamotrigine','Lurasidone','Adjunctive lamotrigine'];
const DE_ISBD=[['“Striking incongruity” between wide use','and the weak evidence base'],['SSRIs and bupropion may switch less','than tricyclics, tetracyclics and SNRIs'],['Bipolar I: only as an adjunct','to mood-stabilising medication']];
inits.depression=()=>{
  const svg=$('#deSvg'),rg=$('#deT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(DE_STEPS,t);
    const oA=1-ramp(t,.32,.36),oB=ramp(t,.34,.38)*(1-ramp(t,.52,.56)),oC=ramp(t,.54,.58);let s='';
    if(oA>0){/* STEP-BD */
      const L=N?{ax:[60,220],bw:110,base:420,top:180,lab:440,px:[40,48]}:{ax:[140,330],bw:120,base:320,top:110,lab:342,px:[0,0]};
      const g=ramp(t,.12,.28),Hs=v=>(L.base-L.top)*v/40;
      s+=`<g style="opacity:${f1(oA)}">`;
      s+=`<text x="12" y="26" class="t-lbl">STEP-BD: durable recovery</text><text x="${N?12:708}" y="${N?44:26}" class="t-xs ${N?'':'t-end'}">366 people on a mood stabiliser, up to 26 weeks</text>`;
      [0,10,20,30,40].forEach(v=>{const y=L.base-Hs(v);s+=`<line x1="${N?40:100}" x2="${N?390:500}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/><text x="${N?34:94}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
      [['+ antidepressant',23.5,'42 of 179','var(--rx)',true],['+ placebo',27.3,'51 of 187','var(--muted)',false]].forEach(([nm,v,n,c,ad],i)=>{
        const x=(N?[70,230]:[150,330])[i],h=Hs(v)*ease(g);
        s+=`<rect x="${x}" y="${f1(L.base-h)}" width="${L.bw}" height="${f1(h)}" rx="6" style="fill:${c};opacity:.85"/>`;
        if(g>0)s+=`<text x="${x+L.bw/2}" y="${f1(L.base-h-10)}" class="t-mid" style="font:800 20px var(--display);fill:var(--ink)">${(v*ease(g)).toFixed(1)}%</text>`;
        s+=pill(x+30,(N?L.top-50:76),30,{txt:'MS'})+pill(x+80,(N?L.top-50:76),30,{col:ad?'var(--rx)':'var(--muted)',txt:ad?'AD':'P'});
        s+=`<text x="${x+L.bw/2}" y="${L.base+18}" class="t-sm t-mid" style="fill:var(--ink)">${nm}</text><text x="${x+L.bw/2}" y="${L.base+32}" class="t-xs t-mid">${g>=1?n:''}</text>`});
      const sw=ramp(t,.22,.3);
      if(sw>0){const bx=N?40:530,by=N?500:150;
        s+=`<g style="opacity:${f1(sw)}"><rect x="${bx}" y="${by}" width="${N?350:178}" height="${N?70:120}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
        s+=`<text x="${bx+12}" y="${by+24}" class="t-lbl">P = 0.40</text><text x="${bx+12}" y="${by+44}" class="t-xs">no significant difference</text>`;
        s+=`<text x="${bx+12}" y="${by+(N?60:70)}" class="t-xs" style="fill:var(--up)">${N?'switch to mania or hypomania: similar in both arms':'switch to mania or'}</text>${N?'':`<text x="${bx+12}" y="${by+84}" class="t-xs" style="fill:var(--up)">hypomania: similar</text><text x="${bx+12}" y="${by+98}" class="t-xs" style="fill:var(--up)">in both arms</text>`}</g>`}
      s+=`<text x="12" y="${N?L.top-80:370}" class="t-xs">MS mood stabiliser · AD antidepressant · P placebo</text>`;
      s+='</g>'}
    if(oB>0){/* ISBD statements */
      s+=`<g style="opacity:${f1(oB)}">`;
      s+=`<text x="12" y="26" class="t-lbl">ISBD task force on antidepressants (2013)</text><text x="12" y="44" class="t-xs">consensus on 12 statements; three of them</text>`;
      DE_ISBD.forEach((ln,i)=>{const a=ramp(t,.37+i*.035,.4+i*.035);if(a<=0)return;const x=N?12:16,y=(N?64:62)+i*(N?74:70),w=N?376:420;
        s+=`<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*-20)} 0)"><rect x="${x}" y="${y}" width="${w}" height="58" rx="10" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${x+14}" y="${y+24}" class="t-lbl">${ln[0]}</text><text x="${x+14}" y="${y+43}" class="t-sm">${ln[1]}</text></g>`});
      const b=ramp(t,.46,.5),bx=N?40:470,by=N?300:70,bh=N?220:220,sc=v=>bh*v/12;
      if(b>0){s+=`<g style="opacity:${f1(b)}"><text x="${N?12:bx}" y="${by-0}" class="t-sm" style="fill:var(--ink)">Switch rates, 2004 review</text>`;
        [['Tricyclics',10,'var(--up-fill)'],['All other',3.2,'var(--rx)']].forEach(([nm,v,c],i)=>{const x=bx+20+i*100,h=sc(v)*ease(b),yb=by+20+bh;
          s+=`<rect x="${x}" y="${f1(yb-h)}" width="64" height="${f1(h)}" rx="5" style="fill:${c};opacity:.85"/><text x="${x+32}" y="${f1(yb-h-8)}" class="t-lbl t-mid">${v}%</text><text x="${x+32}" y="${yb+16}" class="t-xs t-mid">${nm}</text>`});
        s+=`<line x1="${bx}" x2="${bx+230}" y1="${by+20+bh}" y2="${by+20+bh}" class="axis"/></g>`}
      s+='</g>'}
    if(oC>0){/* CANMAT ladder */
      s+=`<g style="opacity:${f1(oC)}">`;
      s+=`<text x="12" y="26" class="t-lbl">CANMAT/ISBD 2018: bipolar I depression</text><text x="12" y="44" class="t-xs">first-line, in hierarchy order</text>`;
      const lx=N?24:30,top=N?62:60,rh=N?40:44,n=DE_LAD.length;
      s+=`<line x1="${lx}" x2="${lx}" y1="${top-6}" y2="${top+n*rh}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/><line x1="${lx+40}" x2="${lx+40}" y1="${top-6}" y2="${top+n*rh}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/>`;
      DE_LAD.forEach((nm,i)=>{const a=ramp(t,.57+i*.028,.6+i*.028);const y=top+i*rh+14;
        s+=`<line x1="${lx}" x2="${lx+40}" y1="${y}" y2="${y}" style="stroke:${a>0?'var(--rx)':'var(--line)'};stroke-width:3;stroke-linecap:round"/>`;
        if(a>0)s+=`<g style="opacity:${f1(a)}"><circle cx="${lx+60}" cy="${y}" r="10" style="fill:var(--rx)"/><text x="${lx+60}" y="${y+4}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${i+1}</text><text x="${lx+78}" y="${y+5}" class="t-lbl">${nm}</text></g>`});
      const s2=ramp(t,.8,.84),s3=ramp(t,.93,.97);
      const bx=N?12:420,by=N?318:60,bw=N?376:290;
      if(s2>0){s+=`<g style="opacity:${f1(s2)}"><rect x="${bx}" y="${by}" width="${bw}" height="${N?120:150}" rx="12" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
        s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--warn)">SECOND-LINE (examples)</text><text x="${bx+14}" y="${by+42}" class="t-lbl">Divalproex</text><text x="${bx+14}" y="${by+60}" class="t-lbl">Adjunctive SSRIs or bupropion</text><text x="${bx+14}" y="${by+78}" class="t-lbl">ECT</text>`;
        s+=`<text x="${bx+14}" y="${by+(N?100:104)}" class="t-xs" style="fill:var(--bad)">NOT recommended: antidepressant</text><text x="${bx+14}" y="${by+(N?113:118)}" class="t-xs" style="fill:var(--bad)">monotherapy; aripiprazole monotherapy</text></g>`}
      if(s3>0){const cy=N?452:226;s+=`<g style="opacity:${f1(s3)}"><rect x="${bx}" y="${cy}" width="${bw}" height="${N?100:96}" rx="12" style="fill:var(--down-soft);stroke:var(--down)"/>`;
        s+=`<text x="${bx+14}" y="${cy+22}" class="t-sm" style="fill:var(--down)">BIPOLAR II DEPRESSION</text><text x="${bx+14}" y="${cy+42}" class="t-lbl">First-line: quetiapine only</text><text x="${bx+14}" y="${cy+62}" class="t-xs">Second-line: lithium, sertraline,</text><text x="${bx+14}" y="${cy+76}" class="t-xs">venlafaxine, lamotrigine, ECT</text></g>`}
      s+='</g>'}
    svg.innerHTML=s;setSt(p);$('#deNote').innerHTML=noteHTML(DE_STEPS[p]);
  }
  const stop=playWire(rg,$('#dePlay'),draw,22000,'Replay','depression');
  const setSt=stepWire($('#deSteps'),DE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- switch risk explainer ---------- */
  const sw=$('#deSw');let mode='mono',prog=1,stopA=null;
  const CRS={mono:moodSeries([[0,-.62],[.15,-.55],[.35,-.25],[.5,.05],[.65,.32],[.8,.42],[1,.38]]),
             ms:moodSeries([[0,-.62],[.15,-.55],[.35,-.3],[.55,-.1],[.75,.02],[1,.04]])};
  const HR={mono:[2.83,1.12,7.19,'Antidepressant alone'],ms:[.79,.54,1.15,'With a mood stabiliser']};
  const NOTES={mono:{k:'Antidepressant alone',t:'Mania hazard nearly tripled',
     txt:`In the first 3 months after starting an antidepressant without a mood stabiliser, the hazard ratio for mania was 2.83 (95% CI 1.12–7.19). Across 109 trials, mania averaged 12.5% with antidepressants vs 7.5% without. <sup class="c" data-ref="Viktorin2014,Tondo2010" title="Source 490,512">490,512</sup>`,
     pt:`Taking an antidepressant on its own raised the chance of a switch into mania in this study.`,
     hook:`Antidepressant monotherapy in bipolar disorder raises mania risk (HR 2.83); with a mood stabiliser it does not (HR 0.79).`},
   ms:{k:'With a mood stabiliser',t:'No rise in mania risk',
     txt:`With a concurrent mood stabiliser there was no rise (HR 0.79, 0.54–1.15): the interval crosses 1. NICE: if mania or hypomania develops on antidepressant monotherapy, consider stopping the antidepressant and offer an antipsychotic <i>"regardless of whether the antidepressant is stopped"</i>. <sup class="c" data-ref="Viktorin2014,NICE2014CG185F" title="Source 373,512">373,512</sup>`,
     pt:`When an antidepressant is used in bipolar disorder, it is usually alongside a mood stabiliser. Any change is planned with the prescriber.`}};
  function drawSw(){
    const N=vb(sw,'720 300','400 520'),f=CRS[mode];let s='';
    const L=N?{cx:16,cy:40,cw:370,ch:200,fx0:40,fx1:370,fy:330}:{cx:16,cy:40,cw:380,ch:220,fx0:440,fx1:700,fy:90};
    s+=`<text x="${L.cx}" y="24" class="t-lbl">After starting an antidepressant (schematic)</text>`;
    s+=lifechart(L.cx,L.cy,L.cw,L.ch,f,{upto:prog,id:'desw',labels:true,dot:true}).svg;
    s+=`<text x="${L.cx}" y="${L.cy+L.ch+16}" class="t-xs">start</text><text x="${L.cx+L.cw}" y="${L.cy+L.ch+16}" class="t-xs t-end">about 3 months →</text>`;
    /* forest plot, log scale 0.4..8 */
    const lg=v=>Math.log(v),X=v=>L.fx0+(L.fx1-L.fx0)*(lg(v)-lg(.4))/(lg(8)-lg(.4));
    s+=`<text x="${N?16:L.fx0}" y="${L.fy-46}" class="t-lbl">Mania, 0–3 months: hazard ratio</text><text x="${N?16:L.fx0}" y="${L.fy-30}" class="t-xs">Viktorin 2014, 3,240 people (log scale)</text>`;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${L.fy-14}" y2="${L.fy+106}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    [.5,1,2,4,8].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${L.fy+120}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(.5))}" y="${L.fy+136}" class="t-xs">← lower risk</text><text x="${f1(X(8))}" y="${L.fy+136}" class="t-xs t-end">higher risk →</text>`;
    ['mono','ms'].forEach((k,i)=>{const [h,lo,hi,nm]=HR[k],y=L.fy+16+i*52,on=k===mode,c=k==='mono'?'var(--up)':'var(--eu)';
      s+=`<g style="opacity:${on?1:.35}"><text x="${f1(L.fx0)}" y="${y-12}" class="t-xs" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px">${nm}</text><line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:3;stroke-linecap:round"/><rect x="${f1(X(h)-7)}" y="${y-7}" width="14" height="14" style="fill:${c}"/><text x="${f1(Math.min(X(hi)+8,L.fx1-30))}" y="${y+18}" class="t-sm" style="fill:${c};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:4px">${h.toFixed(2)}</text></g>`});
    sw.innerHTML=s;$('#deSwNote').innerHTML=noteHTML(NOTES[mode]);
  }
  $$('[data-desw]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.desw;$$('[data-desw]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopA)stopA();prog=0;stopA=animate(2200,p=>{prog=p;drawSw()},()=>{stopA=null})}));
  drawSw();
  onHide.depression=(prev=>()=>{prev&&prev();if(stopA){stopA();stopA=null;prog=1}})(onHide.depression);
  redraws.depression=(prevR=>()=>{prevR&&prevR();drawSw()})(redraws.depression);
};
/* =============== 4.1 Psychoeducation & talking therapies =============== */
/* main timeline: t 0..1 is split into the Barcelona years (0-5) and the STEP-BD months (0-12) */
const TH_C0=.14,TH_C2=.38,TH_C5=.62,TH_S0=.62,TH_S12=.9;
const TH_STEPS=[
 {from:0,at:.07,k:'Before follow-up',t:'Why add a talking therapy?',
  txt:`Medicines are the base of treatment. NICE says relapse-prevention programmes should give information about bipolar disorder, include self-monitoring of mood, thoughts and behaviour, address relapse risk and functioning, and "develop plans for relapse management and staying well". <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> In the Barcelona trial, 120 outpatients in remission for at least 6 months, all on standard medication, were randomised to 21 sessions of group psychoeducation or 21 non-structured group meetings. <sup class="c" data-ref="Colom2003" title="Source 89">89</sup>`,
  pt:`Therapy is added to medicine, not a replacement for it. The dots are the 120 people being split into two groups by chance.`,
  hook:`NICE CG185: a structured psychological intervention designed for bipolar disorder, with a published manual, in addition to medicines. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {from:TH_C0,at:.3,k:'Barcelona · years 0–2',t:'Group psychoeducation: the first two years',
  txt:`At 2 years, psychoeducation reduced the number of people who relapsed and the number of recurrences per person. It lengthened the time to depressive, manic, hypomanic and mixed recurrences, and reduced the number and length of hospital stays. <sup class="c" data-ref="Colom2003" title="Source 89">89</sup> The control group met just as often, so the benefit is not simply from attention or company.`,
  pt:`Both groups met 21 times. Only one group learned a structured course about the illness, and that group had fewer relapses.`,
  hook:`Colom 2003: 21 sessions of group psychoeducation vs 21 non-structured meetings, in people already in remission.`},
 {from:TH_C2,at:.56,k:'Barcelona · years 2–5',t:'Five years on: fewer recurrences, fewer days ill',
  txt:`Of the 120 people, 99 completed 5-year follow-up. Mean recurrences were 3.86 with psychoeducation vs 8.37 in the control group (P<0.0001). Total time acutely ill was 154 vs 586 days (P=0.0001), and time to any recurrence was longer (log rank 9.953, P<0.002). The authors call it "the first psychological intervention showing such a long-term maintained efficacy" <span class="ev early">Early evidence: one centre</span>. <sup class="c" data-ref="Colom2009" title="Source 90">90</sup> Inpatient care made up about 15% of estimated cost with psychoeducation vs 40% in the control group: "less costly and more effective". <sup class="c" data-ref="Scott2009Cost" title="Source 448">448</sup>`,
  pt:`Over 5 years, people in the class spent about 154 days unwell compared with about 586 days in the other group.`,
  hook:`Colom 2009 at 5 years: recurrences 3.86 vs 8.37; days acutely ill 154 vs 586.`},
 {from:TH_S0,at:.86,k:'STEP-BD · months 0–12',t:'Intensive therapy for bipolar depression',
  txt:`STEP-BD randomised 293 outpatients with bipolar I or II depression, all on protocol medication, to intensive psychotherapy (up to 30 sessions over 9 months of family-focused therapy, IPSRT or CBT; n=163) or collaborative care (3 sessions over 6 weeks; n=130). Year-end recovery was 64.4% vs 51.5%. Intensive therapy shortened time to recovery (HR 1.47, 95% CI 1.08–2.00), and people were 1.58 times more likely to be "clinically well" in any study month. The three therapies did not differ from one another, and drop-out was similar (35.6% vs 30.8%). <sup class="c" data-ref="Miklowitz2007" title="Source 334">334</sup>`,
  pt:`More therapy sessions helped more people recover from depression within a year: about 64 in 100 compared with about 52 in 100.`,
  hook:`STEP-BD: intensive psychotherapy (FFT, IPSRT or CBT) 64.4% year-end recovery vs 51.5% with 3-session collaborative care; HR 1.47.`},
 {from:TH_S12,at:1,k:'Pooled evidence',t:'What 39 trials say together',
  txt:`<span class="ev est">Established</span> In a network meta-analysis of 39 RCTs (3863 participants), manualised psychotherapy plus medication had lower recurrence than control treatments (OR 0.56, 95% CI 0.43–0.74). Psychoeducation with guided practice of illness-management skills worked better in a family or group format than individually (OR 0.12). <sup class="c" data-ref="Miklowitz2021NMA" title="Source 338">338</sup> In a subsample of STEP-BD, intensive therapy also improved relationships and life satisfaction, though not work functioning. <sup class="c" data-ref="Miklowitz2007AJP" title="Source 335">335</sup>`,
  pt:`Talking therapies work best alongside medicine. Learning in a group or with family seems to help most.`,
  hook:`Miklowitz 2021 NMA: therapy + medication vs control, recurrence OR 0.56; family/group skills practice OR 0.12 vs individual.`}
];
const TH_TX=[
 {id:'psy',n:'Group psychoeducation',ev:'est',evl:'Established',
  what:'Information about bipolar disorder, self-monitoring of mood, thoughts and behaviour, early warning signs, and a plan for relapse and staying well, learned with others who have the condition. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>',
  len:'21 sessions in the Barcelona trial; 21 weekly 2-hour sessions in PARADES. <sup class="c" data-ref="Colom2003,Morriss2016PARADES" title="Source 89,353">89,353</sup>',
  trial:'Barcelona: 5-year mean recurrences 3.86 vs 8.37 and 154 vs 586 days acutely ill. <sup class="c" data-ref="Colom2009" title="Source 90">90</sup> PARADES (n=304): no overall difference from optimised peer support, but a benefit in people with 1–7 previous episodes (HR 0.28). <sup class="c" data-ref="Morriss2016PARADES" title="Source 353">353</sup>',
  nma:'Family or group skills practice beat the same strategies delivered individually (OR 0.12). Brief psychoeducation kept more people in treatment than standard psychoeducation (OR 0.44). <sup class="c" data-ref="Miklowitz2021NMA" title="Source 338">338</sup>',
  bars:{u:'mean recurrences per person, 5 years',mx:9,a:['Psychoeducation',3.86],b:['Control group',8.37],f:v=>v.toFixed(2),cap:'Barcelona trial, 5-year follow-up. <sup class="c" data-ref="Colom2009" title="Source 90">90</sup>'}},
 {id:'fft',n:'Family-focused therapy (FFT)',ev:'est',evl:'Established',
  what:'The person and their family learn about the illness together, then practise communication skills and problem-solving. <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>',
  len:'21 sessions over 9 months in the adult trial; 12 sessions in the high-risk youth trial. <sup class="c" data-ref="Miklowitz2003FFT,Miklowitz2020FFT" title="Source 333,337">333,337</sup>',
  trial:'Adults recovering from an episode, all on medication: 35% relapsed over 2 years with FFT vs 54% with crisis management; mean time without relapse 73.5 vs 53.2 weeks (HR 0.38). FFT also improved medication adherence. <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>',
  nma:'People were more likely to stay in treatment with family or conjoint therapy than with standard psychoeducation (OR 0.46). Its effect on depressive symptoms pointed the right way (SMD −0.46) but the interval crossed zero. <sup class="c" data-ref="Miklowitz2021NMA" title="Source 338">338</sup>',
  bars:{u:'% relapsed over 2 years',mx:100,a:['FFT',35],b:['Crisis management',54],f:v=>Math.round(v)+'%',cap:'Miklowitz 2003, adults with bipolar disorder, intention to treat. <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>'}},
 {id:'ipsrt',n:'Interpersonal & social rhythm therapy (IPSRT)',ev:'early',evl:'Early evidence',
  what:'Interpersonal psychotherapy (relationships, roles, grief and conflict) plus a social-rhythm part: keeping daily routines such as waking, meals and activity regular. <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup> Try the rhythm grid below.',
  len:'Weekly acute treatment, then a 2-year maintenance phase in the original trial; one of the three options in STEP-BD (up to 30 sessions). <sup class="c" data-ref="Frank2005IPSRT,Miklowitz2007" title="Source 152,334">152,334</sup>',
  trial:'175 acutely ill people with bipolar I: IPSRT did not speed stabilisation, but people given IPSRT in the acute phase went longer without a new episode (P=.01). More regular routines went with fewer recurrences (P=.05). <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>',
  nma:'Interpersonal therapy pointed towards steadier depressive symptoms (SMD −0.46), but the interval crossed zero. <sup class="c" data-ref="Miklowitz2021NMA" title="Source 338">338</sup>',
  bars:{u:'% recovered at year end, STEP-BD',mx:100,a:['Intensive therapy',64.4],b:['Collaborative care',51.5],f:v=>v.toFixed(1)+'%',cap:'STEP-BD intensive arm pooled FFT, IPSRT and CBT, which did not differ. <sup class="c" data-ref="Miklowitz2007" title="Source 334">334</sup>'}},
 {id:'cbt',n:'Cognitive behavioural therapy (CBT)',ev:'early',evl:'Mixed results',
  what:'Working on thoughts and behaviours linked to mood: spotting early signs, coping strategies and routines. A version focused on insomnia (CBTI-BP) targets sleep. <sup class="c" data-ref="Lam2003CT,Harvey2015CBTI" title="Source 208,288">208,288</sup>',
  len:'About 14 sessions plus 2 booster sessions in Lam 2003. <sup class="c" data-ref="Lam2003CT" title="Source 288">288</sup>',
  trial:'Lam 2003 (n=103): fewer episodes, days in episode and admissions over 12 months. Scott 2006 (n=253): no overall difference in recurrence (HR 1.05), with benefit only in people with fewer than 12 previous episodes. <sup class="c" data-ref="Lam2003CT,Scott2006CBT" title="Source 288,447">288,447</sup> Insomnia-focused CBT pilot (n=58): 3.3 vs 25.5 days in a mood episode over 6 months <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Harvey2015CBTI" title="Source 208">208</sup>',
  nma:'CBT stabilised depressive symptoms compared with treatment as usual (SMD −0.32, 95% CI −0.64 to −0.01). Its clearest support is for depressive symptoms, not for preventing recurrence. <sup class="c" data-ref="Miklowitz2021NMA" title="Source 338">338</sup>',
  bars:{u:'days in a mood episode over 6 months (pilot)',mx:30,a:['CBTI-BP',3.3],b:['Psychoeducation',25.5],f:v=>v.toFixed(1),cap:'Pilot RCT of insomnia-focused CBT in bipolar I, between episodes. Early evidence. <sup class="c" data-ref="Harvey2015CBTI" title="Source 208">208</sup>'}},
 {id:'peer',n:'Peer support',ev:'early',evl:'Early evidence',
  what:'Meeting and learning from people with lived experience of the condition, in person or online, usually without a structured course. <sup class="c" data-ref="Morriss2016PARADES,LloydEvans2014" title="Source 300,353">300,353</sup>',
  len:'21 weekly 2-hour meetings as the PARADES comparison arm; online forums in MoodSwings 2.0. <sup class="c" data-ref="Morriss2016PARADES,Gliddon2019" title="Source 179,353">179,353</sup>',
  trial:'PARADES: 65% had a new episode by 96 weeks with optimised peer support vs 58% with psychoeducation (time to episode HR 0.83, not significant). Median attendance was 9 vs 14 sessions. <sup class="c" data-ref="Morriss2016PARADES" title="Source 353">353</sup> Across severe mental illness, peer support showed little effect on admissions or symptoms but some benefit for hope, recovery and empowerment. <sup class="c" data-ref="LloydEvans2014" title="Source 300">300</sup>',
  nma:'Not separately ranked for recurrence in the network meta-analysis. Adding online peer support raised adherence to an online course. <sup class="c" data-ref="Miklowitz2021NMA,Proudfoot2012" title="Source 338,420">338,420</sup>',
  bars:{u:'% with a new episode by 96 weeks',mx:100,a:['Psychoeducation',58],b:['Peer support',65],f:v=>Math.round(v)+'%',cap:'PARADES, 8 sites in England. The difference was not significant. <sup class="c" data-ref="Morriss2016PARADES" title="Source 353">353</sup>'}}
];
/* social-rhythm anchors: usual clock hour and a week of deviations (hours) when steady or irregular */
const TH_ANCH=[
 {n:'Out of bed',h:7,st:[0,.2,-.2,.1,0,.4,.5],ir:[0,-.5,1.6,.3,-1.2,3,3.5]},
 {n:'First meal',h:7.5,st:[.1,0,.2,-.1,.1,.5,.6],ir:[.2,-.8,2.4,0,1.6,3.5,-1.4]},
 {n:'Main activity starts',h:9,st:[0,.1,0,-.2,.1,.6,.7],ir:[0,1.8,-1.3,2.6,0,-2.2,4]},
 {n:'Evening meal',h:18.5,st:[.2,-.1,0,.3,.1,.4,-.3],ir:[1.5,-.2,2.2,-1.6,.4,2.8,-.5]},
 {n:'Lights out',h:23,st:[0,.2,-.1,.1,.3,.6,.5],ir:[.5,2,-.4,1.4,3,3.5,2.2]}
];
const TH_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
inits.therapy=()=>{
  const svg=$('#thSvg'),rg=$('#thT'),read=$('#thRead');
  const lamS=-Math.log(1-.644)/12,lamC=-Math.log(1-.515)/12;
  const fS=m=>1-Math.exp(-lamS*m),fC=m=>1-Math.exp(-lamC*m);
  const hm=n=>{const r=rng(n),a=[];for(let i=0;i<120;i++)a.push(r());return a};
  const R120=hm(41);
  /* one illustrative person per arm: recurrence times spread over 5 years (4 vs 8, the rounded means) */
  const EVP=[.55,1.6,2.9,4.2],EVC=[.3,.9,1.5,2.1,2.7,3.3,3.9,4.6];
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const yr=5*ramp(t,TH_C0,TH_C5),mo=12*ramp(t,TH_S0,TH_S12),ph=phaseOf(TH_STEPS,t);
    const A=N?{x0:52,x1:372,y0:52,y1:186,r1:234,r2:262,b0:298}:{x0:52,x1:326,y0:56,y1:220,r1:256,r2:280,b0:316};
    const B=N?{x0:52,x1:372,y0:400,y1:530,tx:566}:{x0:420,x1:694,y0:56,y1:220,tx:262};
    let s=`<defs>${marker('thAr','var(--muted)')}</defs>`;
    /* ---- panel A: Barcelona ---- */
    const AX=y=>lerp(A.x0,A.x1,y/5),AY=v=>lerp(A.y1,A.y0,v/9);
    s+=`<text x="${A.x0-36}" y="${A.y0-28}" class="t-sm" style="fill:var(--accent)">BARCELONA · GROUP PSYCHOEDUCATION</text><text x="${A.x0-36}" y="${A.y0-14}" class="t-xs">mean recurrences per person · 120 randomised</text>`;
    const split=t<TH_C0+.02;
    if(!split){[0,3,6,9].forEach(v=>{s+=`<line x1="${A.x0}" x2="${A.x1}" y1="${f1(AY(v))}" y2="${f1(AY(v))}" class="${v?'grid':'axis'}"/><text x="${A.x0-6}" y="${f1(AY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,1,2,3,4,5].forEach(y=>{s+=`<text x="${f1(AX(y))}" y="${A.y1+14}" class="t-xs t-mid">${y===5?'5 y':y}</text>`})}
    if(split){/* the 120 people split into two arms */
      const sp=ease(ramp(t,.02,.12));
      R120.forEach((r,i)=>{const arm=i%2,k=Math.floor(i/2);
        const x0=A.x0+40+(i%15)*14,y0=A.y0+14+Math.floor(i/15)*17;
        const x=lerp(x0,(arm?A.x0+(A.x1-A.x0)*.55:A.x0+12)+(k%6)*12,sp),y=lerp(y0,A.y0+6+Math.floor(k/6)*(N?13:15),sp);
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${sp>.05?(arm?'var(--muted)':'var(--accent)'):'var(--line)'}"/>`});
      if(sp>.6){const ly=A.y0+6+10*(N?13:15)+8;s+=`<text x="${f1(A.x0+42)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:var(--accent)">21 group sessions</text><text x="${f1(A.x0+(A.x1-A.x0)*.55+30)}" y="${f1(ly)}" class="t-xs t-mid">21 unstructured meetings</text>`}
    }else{
      const fP=y=>3.86*y/5,fCt=y=>8.37*y/5;
      const ln=(f,c,dash)=>{let d='';for(let i=0;i<=40;i++){const y=yr*i/40;d+=(i?'L':'M')+f1(AX(y))+' '+f1(AY(f(y)))}return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round${dash?';stroke-dasharray:6 4':''}"/>`};
      s+=ln(fCt,'var(--muted)',1)+ln(fP,'var(--accent)');
      if(yr>=1.99&&yr<4.9){s+=`<line x1="${f1(AX(2))}" x2="${f1(AX(2))}" y1="${A.y0}" y2="${A.y1}" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:2 3;opacity:.7"/><text x="${f1(AX(2)+4)}" y="${A.y0+10}" class="t-xs" style="fill:var(--accent)">2-year report: fewer relapsed</text>`}
      const ex=AX(yr);
      s+=`<circle cx="${f1(ex)}" cy="${f1(AY(fCt(yr)))}" r="4" style="fill:var(--muted)"/><circle cx="${f1(ex)}" cy="${f1(AY(fP(yr)))}" r="4" style="fill:var(--accent)"/>`;
      if(yr>=4.99){s+=`<text x="${f1(ex-6)}" y="${f1(AY(8.37)-8)}" class="t-lbl t-end" style="fill:var(--muted)">8.37</text><text x="${f1(ex-6)}" y="${f1(AY(3.86)-8)}" class="t-lbl t-end" style="fill:var(--accent)">3.86</text>`}
      else if(yr>.3){s+=`<text x="${f1(ex+7)}" y="${f1(AY(fCt(yr))+3)}" class="t-xs" style="fill:var(--muted)">control</text><text x="${f1(ex+7)}" y="${f1(AY(fP(yr))+12)}" class="t-xs" style="fill:var(--accent)">psychoeducation</text>`}
      /* illustrative people: ticks on two rows */
      [[A.r1,EVP,'var(--accent)','one person, psychoeducation'],[A.r2,EVC,'var(--muted)','one person, control']].forEach(([y,E,c,l])=>{
        s+=`<line x1="${A.x0}" x2="${f1(AX(yr))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:1.4;opacity:.6"/>`;
        E.forEach(e=>{if(e<=yr)s+=`<path d="M${f1(AX(e))} ${y-7}L${f1(AX(e)+4)} ${y}L${f1(AX(e))} ${y+7}L${f1(AX(e)-4)} ${y}Z" style="fill:${c}"/>`});
        s+=`<text x="${A.x1}" y="${y-9}" class="t-xs t-end" style="fill:${c}">${l}: ${E.filter(e=>e<=yr).length}</text>`});
      /* days acutely ill */
      const dP=154*yr/5,dC=586*yr/5,bw=v=>(A.x1-A.x0)*v/600;
      s+=`<text x="${A.x0-36}" y="${A.b0-6}" class="t-xs">days acutely ill, total over follow-up</text>`;
      s+=`<rect x="${A.x0}" y="${A.b0}" width="${f1(bw(dP))}" height="13" rx="3" style="fill:var(--accent)"/><text x="${f1(A.x0+bw(dP)+5)}" y="${A.b0+10}" class="t-xs" style="fill:var(--accent)">${Math.round(dP)}</text>`;
      s+=`<rect x="${A.x0}" y="${A.b0+18}" width="${f1(bw(dC))}" height="13" rx="3" style="fill:var(--muted);opacity:.75"/><text x="${f1(A.x0+bw(dC)+5)}" y="${A.b0+28}" class="t-xs">${Math.round(dC)}</text>`;
    }
    /* ---- panel B: STEP-BD ---- */
    const BX=m=>lerp(B.x0,B.x1,m/12),BY=v=>lerp(B.y1,B.y0,v/100),on=t>=TH_S0-.04;
    s+=`<g style="opacity:${on?1:.35}">`;
    s+=`<text x="${B.x0-36}" y="${B.y0-28}" class="t-sm" style="fill:var(--accent)">STEP-BD · BIPOLAR DEPRESSION</text><text x="${B.x0-36}" y="${B.y0-14}" class="t-xs">% recovered · 293 randomised</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${B.x0}" x2="${B.x1}" y1="${f1(BY(v))}" y2="${f1(BY(v))}" class="${v?'grid':'axis'}"/><text x="${B.x0-6}" y="${f1(BY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,3,6,9,12].forEach(m=>{s+=`<text x="${f1(BX(m))}" y="${B.y1+14}" class="t-xs t-mid">${m===12?'12 mo':m}</text>`});
    if(!on)s+=`<text x="${f1((B.x0+B.x1)/2)}" y="${f1((B.y0+B.y1)/2)}" class="t-xs t-mid">plays after the Barcelona years</text>`;
    if(mo>0){const cv=(f,c,dash)=>{let d='';for(let i=0;i<=48;i++){const m=mo*i/48;d+=(i?'L':'M')+f1(BX(m))+' '+f1(BY(100*f(m)))}return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round${dash?';stroke-dasharray:6 4':''}"/>`};
      s+=cv(fC,'var(--muted)',1)+cv(fS,'var(--accent)');
      const vS=100*fS(mo),vC=100*fC(mo),ex=BX(mo);
      s+=`<circle cx="${f1(ex)}" cy="${f1(BY(vS))}" r="4" style="fill:var(--accent)"/><circle cx="${f1(ex)}" cy="${f1(BY(vC))}" r="4" style="fill:var(--muted)"/>`;
      if(mo>=11.99){s+=`<text x="${f1(ex-6)}" y="${f1(BY(vS)-9)}" class="t-lbl t-end" style="fill:var(--accent)">64.4%</text><text x="${f1(ex-6)}" y="${f1(BY(vC)+18)}" class="t-lbl t-end" style="fill:var(--muted)">51.5%</text>`}
      else if(mo>1.5){s+=`<text x="${f1(ex-4)}" y="${f1(BY(vS)-9)}" class="t-xs t-end" style="fill:var(--accent)">intensive therapy</text><text x="${f1(ex-4)}" y="${f1(BY(vC)+16)}" class="t-xs t-end">collaborative care</text>`}
    }
    const tl=N?[B.x0-36,B.tx]:[B.x0-36,B.tx];
    s+=`<text x="${tl[0]}" y="${tl[1]}" class="t-xs">up to 30 sessions (FFT, IPSRT or CBT) vs 3 sessions</text>`;
    if(mo>=11.99)s+=`<text x="${tl[0]}" y="${tl[1]+16}" class="t-xs" style="fill:var(--accent)">time to recovery HR 1.47 · well in any month ×1.58</text>`;
    s+='</g>';
    /* ---- summary band ---- */
    if(ph===4){const o=ramp(t,TH_S12,.95),y=N?614:380,x0=N?20:60,w=N?360:600;
      s+=`<g style="opacity:${f1(o)}"><rect x="${x0}" y="${y-20}" width="${w}" height="34" rx="9" style="fill:var(--accent-soft);stroke:var(--accent)"/><text x="${x0+w/2}" y="${y+2}" class="t-lbl t-mid" style="fill:var(--accent)">${N?'39 RCTs: recurrence OR 0.56 with therapy':'39 RCTs pooled: therapy + medication vs control, recurrence OR 0.56'}</text></g>`}
    svg.innerHTML=s;
    read.innerHTML=t<TH_C0?'<span>Randomising: <b>120</b> people</span>':`<span>Barcelona: <b>year ${f1(yr)}</b></span><span>STEP-BD: <b>${mo<.05?'not started':'month '+f1(mo)}</b></span>`;
    $('#thNote').innerHTML=noteHTML(TH_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#thPlay'),draw,24000,'Replay','therapy');
  const setSt=stepWire($('#thSteps'),TH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- comparator ---- */
  const pick=$('#thPick'),cmp=$('#thCmpSvg');let cur='psy',stopB=null;
  pick.innerHTML=TH_TX.map(x=>`<button class="btn" data-tx="${x.id}" aria-pressed="${x.id===cur}">${x.n.replace(/ \(.*\)/,'')}</button>`).join('');
  function bars(B,p){const N=false;let s='';const x0=20,w=360,bw=v=>w*clamp(v/B.mx);
    s+=`<text x="${x0}" y="22" class="t-sm">${B.u.toUpperCase()}</text>`;
    [[B.a,'var(--accent)',60],[B.b,'var(--muted)',136]].forEach(([[l,v],c,y])=>{const vv=v*p;
      s+=`<text x="${x0}" y="${y-8}" class="t-lbl" style="fill:${c}">${l}</text><rect x="${x0}" y="${y}" width="${w}" height="30" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(Math.max(2,bw(vv)))}" height="30" rx="6" style="fill:${c};opacity:.9"/>`;
      const inside=bw(vv)>70;s+=`<text x="${f1(inside?x0+bw(vv)-8:x0+bw(vv)+8)}" y="${y+20}" class="t-big${inside?' t-end':''}" style="fill:${inside?'var(--panel)':c}">${B.f(vv)}</text>`});
    s+=`<text x="${x0}" y="208" class="t-xs">scale 0–${B.mx}</text>`;
    cmp.innerHTML=s}
  function show(id){cur=id;const x=TH_TX.find(q=>q.id===id);
    $$('[data-tx]',pick).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tx===id));
    $('#thCard').innerHTML=`<div class="th-head"><h4>${x.n}</h4><span class="ev ${x.ev}">${x.evl}</span></div><dl><div><dt>What happens in sessions</dt><dd>${x.what}</dd></div><div><dt>How long</dt><dd>${x.len}</dd></div><div><dt>Key trial</dt><dd>${x.trial}</dd></div><div><dt>Network meta-analysis (39 RCTs)</dt><dd>${x.nma}</dd></div></dl>`;
    $('#thCmpCap').innerHTML=x.bars.cap;
    if(stopB)stopB();bars(x.bars,0);stopB=animate(700,p=>bars(x.bars,ease(p)))}
  pick.addEventListener('click',e=>{const b=e.target.closest('[data-tx]');if(b)show(b.dataset.tx)});
  bars(TH_TX[0].bars,1);show(cur);

  /* ---- social rhythm grid ---- */
  const rs=$('#thRhythm'),irr=TH_ANCH.map(()=>false);
  $('#thRhythmBtns').innerHTML='<span class="kicker">Make irregular</span>'+TH_ANCH.map((a,i)=>`<button class="btn" data-an="${i}" aria-pressed="false">${a.n}</button>`).join('');
  const hh=h=>{const H=((Math.floor(h)%24)+24)%24,M=Math.round((h-Math.floor(h))*60);return String(H).padStart(2,'0')+':'+String(M===60?0:M).padStart(2,'0')};
  function drawR(){const N=vb(rs,'720 340','400 470');
    const L=N?{lx:10,c0:62,c1:350,top:46,rh:82,sx:392,dev:13}:{lx:16,c0:190,c1:610,top:46,rh:56,sx:700,dev:9};
    let s='',ok=0;
    TH_DAYS.forEach((d,j)=>{const x=lerp(L.c0,L.c1,j/6);s+=`<text x="${f1(x)}" y="${L.top-18}" class="t-xs t-mid">${d}</text>`});
    TH_ANCH.forEach((a,i)=>{const yc=L.top+L.rh*i+L.rh/2+(N?8:0),dv=irr[i]?a.ir:a.st;
      s+=N?`<text x="${L.lx}" y="${f1(yc-L.rh/2+4)}" class="t-xs" style="fill:var(--ink)">${a.n} · usual ${hh(a.h)}</text>`
          :`<text x="${L.lx}" y="${f1(yc-2)}" class="t-lbl">${a.n}</text><text x="${L.lx}" y="${f1(yc+12)}" class="t-xs">usual ${hh(a.h)}</text>`;
      s+=`<rect x="${L.c0-20}" y="${f1(yc-L.dev)}" width="${L.c1-L.c0+40}" height="${2*L.dev}" rx="5" style="fill:var(--eu-soft)"/><line x1="${L.c0-20}" x2="${L.c1+20}" y1="${yc}" y2="${yc}" style="stroke:var(--eu);stroke-width:1;stroke-dasharray:2 3"/>`;
      let d='',n=0;dv.forEach((v,j)=>{const x=lerp(L.c0,L.c1,j/6),y=yc-clamp(v,-3,3)/3*L.dev*2.3;d+=(j?'L':'M')+f1(x)+' '+f1(y)});
      s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      dv.forEach((v,j)=>{const x=lerp(L.c0,L.c1,j/6),y=yc-clamp(v,-3,3)/3*L.dev*2.3,in1=Math.abs(v)<=1;if(in1)n++;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${N?5:5.5}" style="fill:${in1?'var(--eu)':'var(--accent)'};stroke:var(--panel);stroke-width:1.5"><title>${TH_DAYS[j]}: ${hh(a.h+v)}</title></circle>`});
      ok+=n;s+=`<text x="${L.sx}" y="${f1(yc+4)}" class="t-lbl t-end" style="fill:${n===7?'var(--eu)':'var(--accent)'}">${n}/7</text>`});
    s+=`<text x="${N?10:L.c0-20}" y="${N?462:334}" class="t-xs">${N?'band: within 1 hour of usual · higher dot = later':'shaded band: within 1 hour of the usual time · dots above the line are later'}</text>`;
    rs.innerHTML=s;
    const pc=Math.round(100*ok/35),nIrr=irr.filter(Boolean).length;
    $('#thScore').textContent=pc+'%';$('#thScoreTxt').textContent=`${ok} of 35 anchors within an hour of the usual time (schematic)`;
    $('#thRhythmNote').innerHTML=noteHTML(nIrr===0?
      {k:'Steady week',t:'Regular anchors, steadier body clock',txt:`Every anchor stays close to its usual time, even at the weekend. IPSRT made social rhythms more regular by the end of acute treatment (P&lt;.001), and people who increased their regularity were less likely to have a recurrence (P=.05). <span class="ev early">Early evidence</span> <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>`,
       pt:`Getting up, eating and going to bed at about the same times each day can help keep moods steadier.`,hook:`IPSRT = interpersonal psychotherapy + social rhythm regularity. <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>`}:
      {k:nIrr+' irregular routine'+(nIrr>1?'s':''),t:'Shifting anchors, shifting sleep',txt:`Late nights and late mornings pull the other anchors with them. Sleep loss can trigger a switch into mania, and mania in turn reduces sleep: a proposed self-reinforcing loop (<span class="ev hyp">Hypothesis</span>, supported by sleep-deprivation data). <sup class="c" data-ref="Wehr1987" title="Source 516">516</sup> Between episodes, people with bipolar disorder already show more variable sleep-wake patterns than controls. <sup class="c" data-ref="Ng2015Sleep" title="Source 370">370</sup> Sleep disturbance is the most common early warning sign of mania (median 77%). <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`,
       pt:`A run of late nights is worth noticing. Losing sleep is often the first warning sign of a high.`,hook:`Most robust early sign of mania: sleep disturbance (median 77%). <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`})}
  $('#thRhythmBtns').addEventListener('click',e=>{const b=e.target.closest('[data-an]');if(!b)return;const i=+b.dataset.an;irr[i]=!irr[i];b.setAttribute('aria-pressed',irr[i]);drawR()});
  drawR();
  const pr=redraws.therapy;redraws.therapy=()=>{pr&&pr();drawR()};
};
/* =============== 4.2 Suicide risk & crisis safety =============== */
/* safe messaging: no methods or means anywhere in this module; help-seeking and treatability throughout */
const CS_MOOD=[[0,.03],[.08,0],[.15,.02],[.2,-.24],[.25,-.28],[.31,-.66],[.38,-.72],[.43,-.46],[.5,-.4],[.55,-.34],[.62,-.22],[.68,-.12],[.76,-.05],[.85,.02],[1,0]];
const CS_MIX=[.43,.54],CS_HOSP=[.54,.64],CS_DIS=[.64,.78];
const CS_STEPS=[
 {from:0,at:.08,k:'The starting point',t:'Risk is raised, but most people stay safe',
  txt:`Suicide is more common in bipolar disorder than in the general population: about 20–30 times higher in systematic reviews, with a suicide standardised mortality ratio of 14.44. <sup class="c" data-ref="Plans2019,Miller2020Suicide,Hayes2015" title="Source 213,339,417">213,339,417</sup> Yet in a Danish national cohort followed for up to 36 years, more than 92% of men and 95% of women with bipolar disorder did not die by suicide. Risk is serious, not inevitable. <sup class="c" data-ref="Nordentoft2011" title="Source 380">380</sup> Remission, the steady band, is the reference for the bars below.`,
  pt:`Bipolar disorder raises the risk of suicide, but most people with it never die by suicide, and treatment lowers the risk further.`,
  hook:`ISBD pooled suicide rate: 164 per 100,000 person-years; 23–26% attempt suicide in epidemiological studies. Population statistics. <sup class="c" data-ref="Schaffer2015Epi" title="Source 441">441</sup>`},
 {from:.16,at:.34,k:'Depressive phases',t:'Low mood raises risk, and lasts longer',
  txt:`In the Finnish Jorvi studies, which tracked each person's mood on a life chart, suicide attempts were 5 times more frequent in subthreshold depression and 25 times more frequent in a major depressive episode than in full remission. People with bipolar disorder spent 35% of follow-up in major depressive episodes and 39% in subthreshold depression, so much of the extra risk comes from time spent in high-risk states. <sup class="c" data-ref="Holma2014" title="Source 229">229</sup>`,
  pt:`Low moods are the times to ask for extra help, because that is when suicidal thoughts are most likely.`,
  hook:`Attempt incidence vs remission (Holma 2014): subthreshold depression ×5, major depression ×25, mixed ×65.`},
 {from:.42,at:.49,k:'Mixed states',t:'Mixed states carry the highest risk',
  txt:`A mixed state brings depressive and elevated symptoms together. Compared with other phases, suicide attempts were 37-fold more frequent during mixed states and 18-fold during major depressive phases; being in a mixed or depressive phase, plus prior attempts, accounted for 86% of attempts. <sup class="c" data-ref="Valtonen2008" title="Source 497">497</sup> Against full remission the mixed-state figure was 65-fold. <sup class="c" data-ref="Holma2014" title="Source 229">229</sup> Mixed features in either pole bring "major increases of risk of suicidal behaviors". <sup class="c" data-ref="Tondo2020" title="Source 492">492</sup> Suicide is associated with depressed or mixed states, not with mania. <sup class="c" data-ref="Miller2020Suicide" title="Source 339">339</sup>`,
  pt:`Feeling agitated and low at the same time is a warning sign. It is a good moment to contact the care team.`,
  hook:`Mixed state: 37× vs other phases (Valtonen 2008); 65× vs remission (Holma 2014).`},
 {from:.54,at:.7,k:'In hospital and after',t:'The weeks after discharge',
  txt:`Across 100 studies, the suicide rate after psychiatric discharge was highest in the first 3 months: 1132 per 100,000 person-years, falling to 654 in the rest of the first year and 277 after 10 years. It was highest of all in people admitted with suicidal thoughts or behaviour (2078). <sup class="c" data-ref="Chung2017JAMAPsych" title="Source 81">81</sup> Active contact and follow-up after an emergency visit for suicidal behaviour halved repeat attempts within 6 months (RR 0.48). <sup class="c" data-ref="Inagaki2019" title="Source 235">235</sup> A review of 97 studies concludes that active follow-up after discharge "should be routine". <sup class="c" data-ref="Mann2021Suicide" title="Source 309">309</sup>`,
  pt:`Leaving hospital is a fragile time. A follow-up appointment booked before going home is part of good care.`,
  hook:`Highest-risk time after discharge: the first 3 months, 1132 per 100,000 person-years. <sup class="c" data-ref="Chung2017JAMAPsych" title="Source 81">81</sup>`},
 {from:.8,at:.84,k:'Who is at higher risk',t:'Risk factors, early illness, and their limits',
  txt:`The strongest risk factors for suicide death in bipolar disorder were a previous suicide attempt and hopelessness. For non-fatal suicidal behaviour they included a family history of suicide, early onset, more severe depression, mixed states and rapid cycling, and alcohol or drug misuse. <sup class="c" data-ref="Hawton2005Bipolar" title="Source 212">212</sup> A 2020 review adds male gender, living alone, unemployment, younger (under 35) or older (over 75) age and predominant depressive polarity. <sup class="c" data-ref="Miller2020Suicide" title="Source 339">339</sup> Bipolar II is not milder: lifetime attempts were 32.4% vs 36.3% in bipolar I, not significantly different. <sup class="c" data-ref="Novick2010" title="Source 382">382</sup> But risk categories predict individuals poorly (56% sensitivity), so care is for everyone. <sup class="c" data-ref="Large2016" title="Source 290">290</sup>`,
  pt:`Some things raise risk, but no checklist can tell who will be safe. Everyone deserves good care and a plan.`,
  hook:`Strongest predictors of suicide death in bipolar disorder: previous attempt and hopelessness. <sup class="c" data-ref="Hawton2005Bipolar" title="Source 212">212</sup>`},
 {from:.88,at:1,k:'The counterweight',t:'What protects',
  txt:`Good social support, effective treatment of depression and regular follow-up after an attempt are protective and modifiable. <sup class="c" data-ref="Holma2014,Turecki2016Lancet" title="Source 229,495">229,495</sup> Safety-planning-type interventions reduced suicidal behaviour (RR 0.57), and in emergency departments a safety plan plus follow-up calls cut suicidal behaviour over 6 months from 5.29% to 3.03%. <sup class="c" data-ref="Nuij2021,Stanley2018ED" title="Source 383,473">383,473</sup> <span class="ev est">Established</span> Lithium is the medicine most consistently linked to fewer suicides: against placebo, OR 0.13 in a meta-analysis of 48 trials, and 14% fewer suicide-related events during lithium treatment within the same people in a Swedish register. <sup class="c" data-ref="Cipriani2013,Song2017" title="Source 83,467">83,467</sup> A trial adding lithium after a recent suicidal event in veterans found no difference. <sup class="c" data-ref="Katz2022" title="Source 251">251</sup> More in <a href="#lithium" data-go="lithium">Lithium</a>.`,
  pt:`Treatment, people around you, follow-up and a written plan all push the balance back towards safety.`,
  hook:`Lithium vs placebo for suicide: OR 0.13 (Cipriani 2013). Safety planning: RR 0.57, NNT 16 (Nuij 2021).`}
];
const CS_PLAN=[
 {k:'signs',s:'Signs',n:'My warning signs and triggers',h:'Thoughts, moods, sleep changes or situations that tell me a crisis may be building.',c:'<sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>'},
 {k:'cope',s:'Coping',n:'Things I can do on my own',h:'Coping strategies that have helped me before: activities, places, routines, things that calm me.',c:'<sup class="c" data-ref="NICE2014CG185,Stanley2012SPI" title="Source 372,472">372,472</sup>'},
 {k:'people',s:'People',n:'People who support me',h:'Friends, family or groups I can be with or call, with their phone numbers.',c:'<sup class="c" data-ref="Stanley2012SPI,NICE2014CG185" title="Source 372,472">372,472</sup>'},
 {k:'pros',s:'Services',n:'My care team and services',h:'My care team, doctor, out-of-hours and crisis services, their numbers, and what we agreed they will do.',c:'<sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>'},
 {k:'safe',s:'Safer',n:'Keeping my surroundings safer',h:'What I have agreed with my care team and the people I live with to make my surroundings safer.',c:'<sup class="c" data-ref="Zalsman2016,Mann2021Suicide" title="Source 309,531">309,531</sup>'}
];
inits.crisis=()=>{
  const svg=$('#csSvg'),rg=$('#csT'),f=moodSeries(CS_MOOD);
  const seg=(u,a,b,e=.025)=>ramp(u,a,a+e)*(1-ramp(u,b-e,b));
  const state=u=>{if(u>=CS_MIX[0]&&u<CS_MIX[1])return 'mixed';const v=f(u);return v<-.5?'major':v<-.15?'sub':'rem'};
  const HOL=[['rem','Remission',1],['sub','Subthreshold depression',5],['major','Major depression',25],['mixed','Mixed state',65]];
  const DIS=[['0–3 months',1132],['3–12 months',654],['1–5 years',494],['5–10 years',366],['over 10 years',277]];
  function draw(t){
    const N=vb(svg,'720 430','400 732'),u=t,ph=phaseOf(CS_STEPS,t),st=state(u);
    const C=N?{x:44,y:34,w:340,h:150}:{x:44,y:34,w:400,h:160};
    const Bp=N?{cx:200,cy:232,L:118,hang:150,lab:446}:{cx:580,cy:60,L:84,hang:180,lab:322};
    const P=N?{x:16,y:470,w:368,h:250}:{x:16,y:236,w:440,h:186};
    let s='';
    /* ---- life chart ---- */
    const X=v=>C.x+C.w*v;
    [[CS_HOSP,'hospital','var(--panel-2)',0],[CS_DIS,N?'3 months after':'3 months after discharge','var(--accent-soft)',1]].forEach(([[a,b],l,c,k])=>{if(u<a)return;
      s+=`<rect x="${f1(X(a))}" y="${C.y}" width="${f1(X(Math.min(u,b))-X(a))}" height="${C.h}" style="fill:${c};opacity:.9"/>`;
      if(u>=b-.01)s+=`<text x="${f1(k?X(a)+3:X(b)-3)}" y="${C.y+C.h+12}" class="t-xs${k?'':' t-end'}" style="fill:${k?'var(--accent)':'var(--muted)'}">${l}</text>`});
    const lc=lifechart(C.x,C.y,C.w,C.h,f,{upto:u,id:'csl',labels:true,mixed:u>=CS_MIX[0]?[[CS_MIX[0],Math.min(u,CS_MIX[1])]]:[],dot:true});
    s+=lc.svg;
    s+=`<text x="${C.x}" y="${C.y-12}" class="t-sm">ONE ILLUSTRATIVE COURSE</text>`;
    /* ---- balance ---- */
    const risk=[],prot=[];
    const sw=seg(u,.18,.3),mw=seg(u,.29,.44),xw=seg(u,CS_MIX[0],CS_MIX[1]),dw=seg(u,CS_DIS[0],.8,.02);
    if(sw>0)risk.push(['low mood',sw]);if(mw>0)risk.push(['depression',2*mw]);if(xw>0)risk.push(['mixed state',3*xw]);if(dw>0)risk.push(['after discharge',2*dw]);
    ['previous attempt','hopelessness','substance use'].forEach((l,i)=>{const w=ramp(u,.8+i*.015,.82+i*.015);if(w>0)risk.push([l,w])});
    prot.push(['support',1]);
    ['treatment','follow-up','safety plan','lithium'].forEach((l,i)=>{const w=ramp(u,.885+i*.025,.905+i*.025);if(w>0)prot.push([l,w])});
    const R=risk.reduce((a,b)=>a+b[1],0),Pw=prot.reduce((a,b)=>a+b[1],0),ang=clamp((R-Pw)*.075,-.3,.3);
    const lx=Bp.cx-Bp.L*Math.cos(ang),ly=Bp.cy+Bp.L*Math.sin(ang),rx=Bp.cx+Bp.L*Math.cos(ang),ry=Bp.cy-Bp.L*Math.sin(ang);
    const base=Bp.cy+Bp.hang+28;
    s+=`<path d="M${Bp.cx} ${Bp.cy}V${base}" style="stroke:var(--muted);stroke-width:3"/><path d="M${Bp.cx-26} ${base+8}L${Bp.cx} ${base-6}L${Bp.cx+26} ${base+8}Z" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(rx)}" y2="${f1(ry)}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${Bp.cx}" cy="${Bp.cy}" r="5" style="fill:var(--ink)"/>`;
    const pan=(x,y,L,col,lab,name)=>{const ty=y+Bp.hang,bw=N?100:92;let g=`<path d="M${f1(x)} ${f1(y)}L${f1(x-bw/2-4)} ${f1(ty)}M${f1(x)} ${f1(y)}L${f1(x+bw/2+4)} ${f1(ty)}" style="stroke:var(--line);stroke-width:1.2"/>`;
      g+=`<path d="M${f1(x-bw/2-8)} ${f1(ty)}H${f1(x+bw/2+8)}l-8 8H${f1(x-bw/2)}Z" style="fill:${col}"/>`;
      let yy=ty-2;L.forEach(([l,w])=>{const h=Math.max(.5,16*Math.min(w,1.6)+(w>1.6?6:0));yy-=h+2;
        g+=`<rect x="${f1(x-bw/2)}" y="${f1(yy)}" width="${bw}" height="${f1(h)}" rx="4" style="fill:${col};opacity:${f1(.25+.6*clamp(w))}"/>`;
        if(h>10)g+=`<text x="${f1(x)}" y="${f1(yy+h/2+3.4)}" class="t-xs t-mid" style="fill:var(--ink);font-size:8.6px">${l}</text>`});
      g+=`<text x="${f1(x)}" y="${f1(ty+22)}" class="t-sm t-mid" style="fill:${col}">${name}</text>`;return g};
    s+=pan(lx,ly,risk,'var(--down-fill)','r','RISK')+pan(rx,ry,prot,'var(--good)','p','PROTECTION');
    const tilt=R-Pw>.3?'risk outweighs protection':Pw-R>.3?'protection outweighs risk':'about level';
    s+=`<text x="${Bp.cx}" y="${Bp.lab+(N?0:0)}" class="t-xs t-mid" style="fill:var(--muted)">${N?'':'balance: '}${tilt}</text>`;
    /* ---- bottom panel ---- */
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const lw=N?150:156,bx=P.x+lw,bwid=P.w-lw-50;
    if(ph<=2){
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm">SUICIDE ATTEMPTS VS REMISSION</text><text x="${P.x+P.w-12}" y="${N?P.y+P.h-8:P.y+20}" class="t-xs t-end">log scale · [Holma 2014]</text>`;
      const rh=(P.h-40)/4;HOL.forEach(([k,l,v],i)=>{const y=P.y+34+i*rh,seen=k==='rem'||(k==='sub'&&u>=.19)||(k==='major'&&u>=.29)||(k==='mixed'&&u>=CS_MIX[0]),cur=st===k;
        const w=8+bwid*Math.log10(v)/Math.log10(65),col=k==='mixed'?'var(--mixed-fill)':k==='rem'?'var(--eu)':'var(--down-fill)';
        s+=`<text x="${bx-8}" y="${f1(y+rh/2+3)}" class="t-xs t-end" style="fill:${cur?'var(--ink)':'var(--muted)'};font-weight:${cur?700:500}">${l}</text>`;
        if(seen){s+=`<rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(w)}" height="${f1(rh*.6)}" rx="4" style="fill:${col};opacity:${cur?1:.5}"/><text x="${f1(bx+w+6)}" y="${f1(y+rh/2+4)}" class="t-lbl" style="fill:${cur?'var(--ink)':'var(--muted)'}">×${v}</text>`}
        else s+=`<rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(bwid)}" height="${f1(rh*.6)}" rx="4" style="fill:none;stroke:var(--line);stroke-dasharray:3 4"/>`});
    }else if(ph===3){const g=ease(ramp(u,CS_DIS[0],.7));
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm">SUICIDE RATE AFTER DISCHARGE</text><text x="${P.x+P.w-12}" y="${P.y+20}" class="t-xs t-end">per 100,000 person-years</text>`;
      const rh=(P.h-40)/5;DIS.forEach(([l,v],i)=>{const y=P.y+32+i*rh,w=bwid*v/1200*clamp(g*1.6-i*.15);
        s+=`<text x="${bx-8}" y="${f1(y+rh/2+3)}" class="t-xs t-end" style="fill:${i?'var(--muted)':'var(--accent)'}">${l}</text><rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(Math.max(1,w))}" height="${f1(rh*.6)}" rx="4" style="fill:${i?'var(--muted)':'var(--accent)'};opacity:${i?.5:.95}"/>`;
        if(w>4)s+=`<text x="${f1(bx+w+6)}" y="${f1(y+rh/2+4)}" class="t-lbl" style="fill:${i?'var(--muted)':'var(--accent)'}">${Math.round(v*clamp(g*1.6-i*.15))}</text>`});
      s+=`<text x="${P.x+12}" y="${P.y+P.h-6}" class="t-xs">all diagnoses · [Chung 2017]</text>`;
    }else{const RF=ph===4?[['previous suicide attempt','strongest'],['hopelessness','strongest'],['family history of suicide',''],['early onset',''],['mixed states, rapid cycling',''],['alcohol or drug misuse',''],['living alone, unemployment','']]
        :[['effective treatment of depression',''],['social support, connection',''],['follow-up contact','RR 0.48'],['safety planning','RR 0.57'],['safety plan + calls','3.03% vs 5.29%'],['lithium vs placebo','OR 0.13']];
      const col=ph===4?'var(--down)':'var(--good)';
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm" style="fill:${col}">${ph===4?'RISK FACTORS · POPULATION LEVEL':'WHAT PROTECTS'}</text>`;
      const rh=(P.h-34)/RF.length;RF.forEach(([l,n],i)=>{const a=ph===4?ramp(u,.8+i*.008,.81+i*.008):ramp(u,.885+i*.018,.9+i*.018),y=P.y+30+i*rh+rh/2;
        s+=`<g style="opacity:${f1(.15+.85*a)}"><circle cx="${P.x+20}" cy="${f1(y)}" r="4" style="fill:${col}"/><text x="${P.x+32}" y="${f1(y+4)}" class="t-lbl" style="font-size:${N?12.5:13}px">${l}</text>${n?`<text x="${P.x+P.w-12}" y="${f1(y+4)}" class="t-sm t-end" style="fill:${col}">${n}</text>`:''}</g>`});
    }
    svg.innerHTML=s;
    $('#csNote').innerHTML=noteHTML(CS_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#csPlay'),draw,26000,'Replay','crisis');
  const setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- safety plan builder: stored only in this browser ---- */
  const plan=Object.assign({},store.get('crisisPlan',{})),box=$('#csPlan'),lad=$('#csLadder');
  const esc=x=>String(x||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  box.innerHTML=CS_PLAN.map((p,i)=>`<div class="cs-field"><span class="n">PART ${i+1}</span><label for="csF-${p.k}">${p.n}</label><small>${p.h} ${p.c}</small><textarea id="csF-${p.k}" data-pk="${p.k}" rows="3" autocomplete="off" spellcheck="true">${esc(plan[p.k])}</textarea></div>`).join('')
    +`<div class="cs-field"><span class="n">ALWAYS ON THE PLAN</span><label>Crisis lines</label><small>Printed on every plan.</small><p>Local emergency services. US: call or text <b>988</b>. UK &amp; Ireland: Samaritans <b>116 123</b>.</p></div>`;
  function drawL(){const N=vb(lad,'400 170','400 170');const filled=CS_PLAN.map(p=>(plan[p.k]||'').trim().length>0),n=filled.filter(Boolean).length;
    const L=ladder(14,40,372,118,CS_PLAN.map(p=>p.s).concat(['Lines']),{col:'var(--accent)'});
    let s=L.svg;
    CS_PLAN.concat([{s:'Lines'}]).forEach((p,i)=>{const on=i===CS_PLAN.length||filled[i],[x,y]=L.top(i);
      s+=`<circle cx="${f1(x)}" cy="${f1(y-12)}" r="9" style="fill:${on?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.6"/>${on?`<path d="M${f1(x-4)} ${f1(y-12)}l3 3l5-6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`:''}`});
    s+=`<text x="14" y="12" class="t-sm" style="fill:var(--accent)">${n} OF ${CS_PLAN.length} PARTS FILLED IN · CRISIS LINES INCLUDED</text>`;
    lad.innerHTML=s;$('#csLadderCap').textContent=n===CS_PLAN.length?'Every part has something in it. Share a copy with someone you trust and your care team.':'Fill in what you can. A short plan is still a plan.'}
  box.addEventListener('input',e=>{const ta=e.target.closest('[data-pk]');if(!ta)return;plan[ta.dataset.pk]=ta.value;store.set('crisisPlan',plan);drawL()});
  $('#csClear').addEventListener('click',()=>{if(!confirm('Clear your safety plan from this browser?'))return;CS_PLAN.forEach(p=>{plan[p.k]='';const ta=$('#csF-'+p.k);if(ta)ta.value=''});store.set('crisisPlan',{});drawL()});
  $('#csPrint').addEventListener('click',()=>{
    const body=CS_PLAN.map((p,i)=>`<h2>${i+1}. ${p.n}</h2><p>${esc(plan[p.k]).replace(/\n/g,'<br>')||'<span class="e">(not filled in yet)</span>'}</p>`).join('');
    const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>My safety plan</title><style>body{font:16px/1.5 Georgia,serif;color:#111;max-width:680px;margin:32px auto;padding:0 20px}h1{font-size:28px;margin:0 0 6px}h2{font-size:17px;margin:22px 0 6px;border-bottom:1px solid #999;padding-bottom:3px}p{margin:0;min-height:3em}.e{color:#777}.box{border:2px solid #a24a28;border-radius:10px;padding:10px 14px;margin:18px 0}small{color:#555}</style></head><body><h1>My safety plan</h1><small>Written ${new Date().toLocaleDateString()}. Keep it somewhere easy to find, and share it with people you trust and your care team.</small><div class="box"><b>If you are in crisis or thinking about suicide, contact local emergency services or a crisis line.</b><br>US: call or text <b>988</b> · UK &amp; Ireland: Samaritans <b>116 123</b></div>${body}</body></html>`;
    const w=window.open('','_blank');if(!w){window.print();return}
    w.document.open();w.document.write(html);w.document.close();w.focus();setTimeout(()=>{try{w.print()}catch(e){}},250)});
  drawL();
};
/* =============== 4.3 Pregnancy & the postpartum period =============== */
inits.pregnancy=()=>{
  const svg=$('#pgSvg'),rg=$('#pgT'),noteEl=$('#pgNote'),read=$('#pgRead');
  const SP=.62;/* t up to SP = pregnancy weeks 0-40, after SP = postpartum weeks 0-12 */
  const wkP=t=>clamp(t/SP)*40,wkB=t=>clamp((t-SP)/(1-SP))*12;
  /* pregnancy cohort (Viguera 2007): 71% by delivery, 47% of recurrences in trimester 1 (0.47 x 71 = 33.4%) */
  const PK=[[0,0],[4,10],[8,22],[13,33.4],[20,45],[27,55],[34,64],[40,71]];
  const pl=(k,x)=>{if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* postpartum shape: most of the rise in the first month (Di Florio 2013); end points from Wesseloo 2016 */
  const g=w=>(1-Math.exp(-w/2.2))/(1-Math.exp(-12/2.2));
  /* relative risk of admission, first-time mothers: peak days 10-19 at RR 7.31 (shape between is drawn) */
  const RR=w=>{const d=w*7;if(d<10)return 1+6.31*ease(d/10);if(d<=19)return 7.31;return 1+6.31*Math.exp(-(d-19)/14)};
  const STEPS=[
   {from:0,at:.03,k:'Week 0',t:'Well at conception',
    txt:`Among 89 pregnant women with bipolar disorder who were well at conception, 71% had at least one recurrence during pregnancy. Compared with continuing mood-stabiliser treatment, stopping it doubled the recurrence risk, cut the median time to recurrence more than fourfold and made the share of weeks spent ill five times greater. <sup class="c" data-ref="Viguera2007Pregnancy" title="Source 511">511</sup>`,
    pt:`Pregnancy does not protect against mood episodes. Planning medicines before pregnancy, with the care team, is the safest start. <sup class="c" data-ref="Viguera2000,NICE2014CG192" title="Source 374,509">374,509</sup>`,
    hook:`Stopping mood stabilisers in pregnancy doubled the recurrence risk (Viguera 2007). <sup class="c" data-ref="Viguera2007Pregnancy" title="Source 511">511</sup>`},
   {from:.07,at:.2,k:'Weeks 1–13',t:'First trimester',
    txt:`47% of the recurrences came in the first trimester, and 74% were depressive or mixed. Median time to recurrence was 11 times shorter after abrupt or rapid stopping than after gradual stopping. This is when many people first learn they are pregnant, which is why NICE CG192 lists gradual options for a woman who becomes pregnant while taking lithium. <sup class="c" data-ref="Viguera2007Pregnancy,NICE2014CG192" title="Source 374,511">374,511</sup>`,
    pt:`If you find out you are pregnant, do not stop a medicine suddenly on your own. Contact your care team soon to plan together. <sup class="c" data-ref="Viguera2007Pregnancy,NICE2014CG192" title="Source 374,511">374,511</sup>`,
    hook:`In pregnancy, 74% of recurrences were depressive or mixed, and 47% came in the first trimester. <sup class="c" data-ref="Viguera2007Pregnancy" title="Source 511">511</sup>`},
   {from:.3,at:.5,k:'Weeks 14–40',t:'Later pregnancy',
    txt:`The curve keeps climbing to 71% by delivery. After stopping lithium, recurrence over the next 40 weeks was 52% in pregnant and 58% in non-pregnant women (against 21% in the year before stopping), so pregnancy itself is not protective. In late pregnancy lithium clearance rises by 30–50%; if lithium is continued, NICE CG192 advises checking plasma levels every 4 weeks, then weekly from the 36th week. Guideline wording, not instructions. <sup class="c" data-ref="Viguera2000,Grandjean2009PartII,NICE2014CG192" title="Source 192,374,509">192,374,509</sup>`,
    pt:`The body handles some medicines differently late in pregnancy, so blood levels are checked more often. <sup class="c" data-ref="Grandjean2009PartII,NICE2014CG192" title="Source 192,374">192,374</sup>`,
    hook:`Pregnancy is not protective: 52% vs 58% recurrence after stopping lithium (Viguera 2000). <sup class="c" data-ref="Viguera2000" title="Source 509">509</sup>`},
   {from:SP,at:SP+(1-SP)*2/12,k:'Weeks 0–4 after birth',t:'Birth and the first month',
    txt:`After birth the risk climbs fast. In 1,785 parous women, those with bipolar I disorder reported about a 50% risk of a perinatal major mood episode per pregnancy, and about 40% with bipolar II. Most perinatal episodes began within the first postpartum month, mania and psychosis earlier than depression. Among women who had stayed well for 40 weeks after stopping lithium, postpartum recurrence was 70%, against 24% in non-pregnant women over the same weeks. <sup class="c" data-ref="DiFlorio2013,Viguera2000" title="Source 107,509">107,509</sup>`,
    pt:`The weeks after giving birth are a time of extra risk. A plan made before the birth can protect both parent and baby. <sup class="c" data-ref="Wesseloo2016,DiFlorio2013,Bergink2012" title="Source 39,107,519">39,107,519</sup>`,
    hook:`Bipolar I: about 50% risk of a perinatal mood episode per pregnancy; bipolar II about 40%. <sup class="c" data-ref="DiFlorio2013" title="Source 107">107</sup>`},
   {from:.7,at:SP+(1-SP)*2.1/12,k:'Days 10–19 after birth',t:'Postpartum psychosis',
    txt:`Postpartum psychosis is rare: five population studies reported 0.89 to 2.6 per 1,000 women (the dots). In Denmark, severe mental disorders needing admission in the first 3 months after a first birth affected 1.03 per 1,000 mothers and 0.37 per 1,000 fathers. Mothers' risk of admission peaked 10–19 days after birth (RR 7.31 against 11–12 months after birth), with no similar rise for fathers. Most puerperal psychoses are bipolar-spectrum illnesses. <sup class="c" data-ref="VanderKruik2017,MunkOlsen2006,Kendell1987" title="Source 256,358,501">256,358,501</sup>`,
    pt:`Postpartum psychosis is rare, but it is an emergency. Sudden confusion, strange beliefs or not sleeping at all after giving birth need urgent help. <sup class="c" data-ref="VanderKruik2017,MunkOlsen2006,Jones2014Lancet" title="Source 245,358,501">245,358,501</sup>`,
    hook:`Postpartum psychosis: about 1–2 per 1,000 births, with peak onset in the first weeks. <sup class="c" data-ref="VanderKruik2017,MunkOlsen2006" title="Source 358,501">358,501</sup>`},
   {from:.8,at:1,k:'Weeks 4–12 after birth',t:'Prevention changes the picture',
    txt:`In a meta-analysis of 37 articles (5,700 deliveries), postpartum relapse was 66% (95% CI 57–75) in women with bipolar disorder who were medication-free in pregnancy and 23% (95% CI 14–37) in those who used preventive medication; 35% overall. Severe episodes occurred in 17%, and in 29% of women with a history of postpartum psychosis. In one clinic, none of 20 women with psychosis limited to the postpartum period who started preventive treatment right after delivery relapsed, against 44.4% of those who declined it. Population figures, not a prediction for one person. <sup class="c" data-ref="Wesseloo2016,Bergink2012" title="Source 39,519">39,519</sup>`,
    pt:`Planning preventive treatment with the care team before the birth was linked with far fewer relapses afterwards. <sup class="c" data-ref="Wesseloo2016" title="Source 519">519</sup>`,
    hook:`Postpartum relapse: 66% without preventive medication in pregnancy vs 23% with it. <sup class="c" data-ref="Wesseloo2016" title="Source 519">519</sup>`}
  ];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 680'),ph=phaseOf(STEPS,t),wp=wkP(t),wb=wkB(t),post=t>=SP;
    const L=N?{p0:44,p1:386,py0:50,py1:186,b0:44,b1:386,by0:258,by1:394,ax1:204,ax2:412,rx0:44,rx1:386,ry0:452,ry1:530,dx:44,dy:586,dw:342}
             :{p0:52,p1:416,py0:50,py1:226,b0:474,b1:700,by0:50,by1:226,ax1:244,ax2:244,rx0:474,rx1:700,ry0:290,ry1:370,dx:52,dy:322,dw:368};
    const PX=w=>lerp(L.p0,L.p1,w/40),BX=w=>lerp(L.b0,L.b1,w/12),PY=v=>lerp(L.py1,L.py0,v/80),BY=v=>lerp(L.by1,L.by0,v/80);
    let s='';
    /* --- pregnancy panel --- */
    s+=`<text x="${L.p0}" y="${L.py0-22}" class="t-sm" style="fill:var(--ink)">PREGNANCY</text><text x="${L.p1}" y="${L.py0-22}" class="t-xs t-end">% with a recurrence (one cohort)</text>`;
    [[0,13,'trimester 1'],[13,27,'trimester 2'],[27,40,'trimester 3']].forEach(([a,b,n],i)=>{s+=`<rect x="${f1(PX(a))}" y="${L.py0}" width="${f1(PX(b)-PX(a))}" height="${L.py1-L.py0}" style="fill:var(--accent-soft);opacity:${i%2?.35:.7}"/><text x="${f1((PX(a)+PX(b))/2)}" y="${L.py0-6}" class="t-xs t-mid">${N?'T'+(i+1):n}</text>`});
    [0,20,40,60,80].forEach(v=>{s+=`<line x1="${L.p0}" x2="${L.p1}" y1="${f1(PY(v))}" y2="${f1(PY(v))}" class="${v?'grid':'axis'}"/><text x="${L.p0-5}" y="${f1(PY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,10,20,30,40].forEach(w=>{s+=`<text x="${f1(PX(w))}" y="${L.ax1}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${L.p1}" y="${L.ax1+13}" class="t-xs t-end">weeks of pregnancy</text>`;
    {let d='';const n=Math.max(1,Math.round(wp*3));for(let i=0;i<=n;i++){const w=wp*i/n;d+=(i?'L':'M')+f1(PX(w))+' '+f1(PY(pl(PK,w)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--down-fill);stroke-width:2.6;stroke-linejoin:round"/>`;
      s+=`<circle cx="${f1(PX(wp))}" cy="${f1(PY(pl(PK,wp)))}" r="4.5" style="fill:var(--down-fill);stroke:var(--panel);stroke-width:1.8"/>`;
      if(wp>=13){s+=`<circle cx="${f1(PX(13))}" cy="${f1(PY(33.4))}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="${f1(PX(13)+6)}" y="${f1(PY(33.4)+14)}" class="t-xs">47% of recurrences by wk 13</text>`}
      if(wp>=39.5)s+=`<text x="${f1(PX(40)-4)}" y="${f1(PY(71)-8)}" class="t-lbl t-end" style="fill:var(--down)">71%</text>`}
    /* --- birth --- */
    if(!N){const xb=(L.p1+L.b0)/2;s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${L.py0-14}" y2="${L.py1}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:3 3"/><text x="${f1(xb)}" y="${L.ax1+13}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">birth</text>`}
    /* --- postpartum panel --- */
    s+=`<text x="${L.b0}" y="${L.by0-22}" class="t-sm" style="fill:var(--ink)">AFTER BIRTH</text><text x="${L.b1}" y="${L.by0-22}" class="t-xs t-end">${N?'% relapsed (meta-analysis)':'% relapsed'}</text>`;
    s+=`<rect x="${L.b0}" y="${L.by0}" width="${f1(BX(4)-L.b0)}" height="${L.by1-L.by0}" style="fill:var(--accent-soft);opacity:.7"/><text x="${f1((L.b0+BX(4))/2)}" y="${L.by0-6}" class="t-xs t-mid">first month</text>`;
    [0,20,40,60,80].forEach(v=>{s+=`<line x1="${L.b0}" x2="${L.b1}" y1="${f1(BY(v))}" y2="${f1(BY(v))}" class="${v?'grid':'axis'}"/>`;if(N||v%40===0)s+=`<text x="${L.b0-5}" y="${f1(BY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,4,8,12].forEach(w=>{s+=`<text x="${f1(BX(w))}" y="${L.ax2}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${L.b1}" y="${L.ax2+13}" class="t-xs t-end">weeks after birth</text>`;
    if(!post)s+=`<text x="${f1((L.b0+L.b1)/2)}" y="${f1((L.by0+L.by1)/2)}" class="t-xs t-mid">fills in after birth</text>`;
    else{const curve=(end,col,dash)=>{let d='';const n=Math.max(1,Math.round(wb*8));for(let i=0;i<=n;i++){const w=wb*i/n;d+=(i?'L':'M')+f1(BX(w))+' '+f1(BY(end*g(w)))}
        return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;stroke-linejoin:round${dash?';stroke-dasharray:6 4':''}"/><circle cx="${f1(BX(wb))}" cy="${f1(BY(end*g(wb)))}" r="4" style="fill:${col};stroke:var(--panel);stroke-width:1.6"/>`};
      const showP=ph>=5;
      s+=curve(66,'var(--bad)',false);
      if(showP)s+=curve(23,'var(--good)',false);
      if(wb>=11.5){s+=`<text x="${f1(BX(12)-4)}" y="${f1(BY(66)-8)}" class="t-lbl t-end" style="fill:var(--bad)">66% ${N?'no preventive medicine':'no prevention'}</text>`;
        if(showP)s+=`<text x="${f1(BX(12)-4)}" y="${f1(BY(23)-8)}" class="t-lbl t-end" style="fill:var(--good)">23% ${N?'preventive medicine':'with prevention'}</text>`;
        if(showP)s+=`<line x1="${f1(BX(12)-14)}" x2="${f1(BX(12))}" y1="${f1(BY(35))}" y2="${f1(BY(35))}" style="stroke:var(--muted);stroke-width:1.5"/><text x="${f1(BX(12)-18)}" y="${f1(BY(35)+3)}" class="t-xs t-end">35% overall</text>`}
      else if(!showP)s+=`<text x="${f1(BX(wb)+8)}" y="${f1(BY(66*g(wb))+14)}" class="t-xs" style="fill:var(--bad)">${wb<6?'no preventive medicine in pregnancy':''}</text>`}
    /* --- admission risk strip --- */
    const RY=v=>lerp(L.ry1,L.ry0+16,(v-1)/6.31);
    s+=`<text x="${L.rx0}" y="${L.ry0-10}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?'Admission risk, first-time mothers (relative)':'Admission risk, first birth (relative)'}</text>`;
    s+=`<line x1="${L.rx0}" x2="${L.rx1}" y1="${L.ry1}" y2="${L.ry1}" class="axis"/>`;
    if(post&&wb>0){let d=`M${L.rx0} ${L.ry1}`;const n=Math.max(2,Math.round(wb*10)),RX=w=>lerp(L.rx0,L.rx1,w/12);for(let i=0;i<=n;i++){const w=wb*i/n;d+=`L${f1(RX(w))} ${f1(RY(RR(w)))}`}
      d+=`L${f1(RX(wb))} ${L.ry1}Z`;s+=`<path d="${d}" style="fill:var(--mixed-fill);opacity:.35;stroke:var(--mixed);stroke-width:1.4"/>`;
      if(wb>=2.7)s+=`<text x="${f1(RX(2.05))}" y="${f1(RY(7.31)-5)}" class="t-xs t-mid" style="fill:var(--mixed);font-weight:700">RR 7.31 · days 10–19</text>`}
    else s+=`<text x="${L.rx0}" y="${L.ry1-8}" class="t-xs">after birth</text>`;
    /* --- 1,000 dots --- */
    const on=ph>=4,cols=100,sp=L.dw/cols;
    s+=`<text x="${L.dx}" y="${L.dy-12}" class="t-xs" style="fill:var(--ink);font-weight:600">${on?(N?'Postpartum psychosis: ~1–3 per 1,000':'Postpartum psychosis: 0.89–2.6 per 1,000 births'):'1,000 births'}</text>`;
    for(let i=0;i<1000;i++){const c=i%cols,r=Math.floor(i/cols),x=L.dx+sp*(c+.5),y=L.dy+sp*(r+.5),hl=on&&i<3,solid=on&&i<1;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(hl?sp*.62:sp*.32)}" style="fill:${hl?'var(--mixed)':'var(--muted)'};opacity:${hl?(solid?1:.55):.35}"/>`}
    svg.innerHTML=s;noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
    read.innerHTML=post?`<span>week <b>${f1(wb)}</b> after birth</span><span>day <b>${Math.round(wb*7)}</b></span>`:`<span>pregnancy week <b>${Math.round(wp)}</b></span><span>trimester <b>${wp<13?1:wp<27?2:3}</b></span>`;
  }
  const stop=playWire(rg,$('#pgPlay'),draw,22000,'Replay','pregnancy');
  setSt=stepWire($('#pgSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- medicine comparator ---------- */
  const med=$('#pgMed'),cap=$('#pgMedCap'),mnote=$('#pgMedNote'),opts=$('#pgLiOpts'),dose=$('#pgDose');
  const EURAP=[['valproate',10.3],['phenobarbital',6.5],['carbamazepine',5.5],['lamotrigine',2.9],['levetiracetam',2.8]];
  const DOSE=[['≤600 mg/day',1.11,.46,2.64],['601–900 mg/day',1.60,.67,3.80],['>900 mg/day',3.22,1.47,7.02]];
  const M={
   li:{card:{a:['Lithium, first trimester',24,'2.41%'],b:['Not exposed',11.5,'1.15%'],src:'Heart (cardiac) malformations · US Medicaid, 1,325,563 pregnancies, 663 lithium-exposed'},
       any:{a:['Lithium, first trimester',74,'7.4%'],b:['Reference group',43,'4.3%'],src:'Any major malformation · 6 cohorts, 22,124 pregnancies, 727 lithium-exposed'},low:'dose',
       note:{k:'Lithium',t:'A smaller risk than once thought, and dose-related',
        txt:`In 1,325,563 pregnancies, cardiac malformations occurred in 2.41% of infants exposed to lithium in the first trimester against 1.15% unexposed (adjusted RR 1.65, 95% CI 1.02–2.68), rising with dose: RR 1.11 at 600 mg/day or less, 1.60 at 601–900 and 3.22 above 900 mg/day. A six-cohort meta-analysis found major malformations in 7.4% vs 4.3% (aOR 1.71), while major cardiac malformations did not differ significantly (2.1% vs 1.6%). NICE CG192 says not to offer lithium in pregnancy "unless antipsychotic medication has not been effective". <sup class="c" data-ref="Patorno2017,MunkOlsen2018,NICE2014CG192" title="Source 359,374,399">359,374,399</sup>`,
        pt:`If you take lithium and might become pregnant, talk with your care team early. Do not stop or start lithium on your own. <sup class="c" data-ref="NICE2014CG185,Patorno2017" title="Source 372,399">372,399</sup>`,
        hook:`First-trimester lithium: cardiac malformations 2.41% vs 1.15% (aRR 1.65), dose-dependent. <sup class="c" data-ref="Patorno2017" title="Source 399">399</sup>`}},
   vpa:{x:{a:['Valproate',103,'10.3%'],b:['Lamotrigine (same registry)',29,'2.9%'],src:'Major congenital malformations · EURAP registry, 7,355 monotherapy pregnancies'},low:'iq',
       note:{k:'Valproate',t:'The highest risk, and avoided where possible',
        txt:`In EURAP, major malformations occurred in 10.3% of valproate-exposed pregnancies, rising with dose. In NEAD, mean IQ at age 6 was 97 after valproate against 108 after lamotrigine, lower with higher doses (r = −0.56). The Depakote boxed warning says valproate "should not be used to treat women with epilepsy or bipolar disorder who are pregnant or who plan to become pregnant unless other medications have failed". In 2018 the UK MHRA banned prescribing it to women and girls of childbearing potential outside its Pregnancy Prevention Programme. <sup class="c" data-ref="Tomson2018,Meador2013NEAD,FDA-Depakote,Iacobucci2018" title="Source 128,234,322,489">128,234,322,489</sup>`,
        pt:`Valproate is generally avoided in anyone who could become pregnant, unless nothing else works and a pregnancy prevention plan is in place. <sup class="c" data-ref="FDA-Depakote,NICE2014CG192" title="Source 128,374">128,374</sup>`,
        hook:`Valproate: highest malformation rate (10.3% in EURAP) and a dose-dependent fall in child IQ. <sup class="c" data-ref="Tomson2018,Meador2013NEAD" title="Source 322,489">322,489</sup>`}},
   cbz:{x:{a:['Carbamazepine',55,'5.5%'],b:['Lamotrigine (same registry)',29,'2.9%'],src:'Major congenital malformations · EURAP registry, 7,355 monotherapy pregnancies'},low:'eurap',
       note:{k:'Carbamazepine',t:'Not offered around pregnancy',
        txt:`In EURAP, 5.5% of carbamazepine-exposed pregnancies had a major malformation, and risk rose with dose at conception. Mean IQ at age 6 in NEAD was 105. NICE CG192 says not to offer carbamazepine to women planning a pregnancy, pregnant or considering breastfeeding. <sup class="c" data-ref="Tomson2018,Meador2013NEAD,NICE2014CG192" title="Source 322,374,489">322,374,489</sup>`,
        pt:`Carbamazepine is usually not used around pregnancy or breastfeeding. Plan any change with the prescriber. <sup class="c" data-ref="NICE2014CG192" title="Source 374">374</sup>`,
        hook:`EURAP malformation rates rise with dose for valproate, carbamazepine, lamotrigine and phenobarbital. <sup class="c" data-ref="Tomson2018" title="Source 489">489</sup>`}},
   ltg:{x:{a:['Lamotrigine, first trimester',14,'1.39%'],b:['Not exposed',11.5,'1.15%'],src:'Heart (cardiac) malformations · US Medicaid, 1,325,563 pregnancies'},low:'eurap',
       note:{k:'Lamotrigine',t:'Among the lowest rates, but levels shift',
        txt:`Cardiac malformations occurred in 1.39% of lamotrigine-exposed infants against 1.15% unexposed, and EURAP put major malformations at 2.9%. The US label states that registries "have not detected an increased frequency of major congenital malformations". NICE CG192 asks for lamotrigine levels to be checked often around pregnancy "because they vary substantially at these times", and the label warns that infant levels can rise if a dose raised in pregnancy is not reduced after delivery. <sup class="c" data-ref="Patorno2017,Tomson2018,FDA-Lamictal,NICE2014CG192" title="Source 130,374,399,489">130,374,399,489</sup>`,
        pt:`Lamotrigine levels change in pregnancy and after the birth, so the care team checks them more often. <sup class="c" data-ref="NICE2014CG192,FDA-Lamictal" title="Source 130,374">130,374</sup>`,
        hook:`Lamotrigine 2.9% vs valproate 10.3% major malformations in EURAP. <sup class="c" data-ref="Tomson2018" title="Source 489">489</sup>`}},
   ap:{low:'none',
       note:{k:'Antipsychotics',t:'No figure in this guide’s sources',
        txt:`The research behind this guide gives no malformation rate for antipsychotics, so no dots are drawn rather than guess. NICE CG192 puts antipsychotics ahead of lithium: lithium is not offered in pregnancy "unless antipsychotic medication has not been effective", and switching gradually to an antipsychotic is one of the listed options for a woman who becomes pregnant on lithium. For breastfeeding, NICE encourages it unless the woman takes carbamazepine, clozapine or lithium; the cariprazine label states that no human lactation studies have been done. <sup class="c" data-ref="NICE2014CG192,FDA-Vraylar" title="Source 137,374">137,374</sup>`,
        pt:`Antipsychotics are often part of the plan in pregnancy. Ask the care team what is known about your particular medicine. <sup class="c" data-ref="NICE2014CG192" title="Source 374">374</sup>`,
        hook:`NICE CG192: lithium in pregnancy only if antipsychotic medication has not been effective. <sup class="c" data-ref="NICE2014CG192" title="Source 374">374</sup>`}}};
  let cur='li',out='card',stopA=null;
  function grid(x,y,sp,k,col,cols=40){let s='';for(let i=0;i<1000;i++){const c=i%cols,r=Math.floor(i/cols),on=i<Math.round(k);
      s+=`<circle cx="${f1(x+sp*(c+.5))}" cy="${f1(y+sp*(r+.5))}" r="${f1(on?sp*.38:sp*.26)}" style="fill:${on?col:'var(--muted)'};opacity:${on?1:.3}"/>`}return s}
  function drawM(p=1){
    const N=vb(med,'720 380','400 690'),m=M[cur],P=cur==='li'?m[out]:m.x;
    const sp=N?8.4:7,G=N?[[32,58],[32,320]]:[[40,58],[400,58]],gh=sp*25;
    let s='';
    if(P){[['a','var(--bad)'],['b','var(--eu)']].forEach(([k,col],i)=>{const [n,v,pc]=P[k],[gx,gy]=G[i];
        s+=`<text x="${gx}" y="${gy-26}" class="t-lbl">${n}</text><text x="${gx}" y="${gy-9}" class="t-xs"><tspan style="font:800 15px var(--display);fill:${col}">${Math.round(v*p)}</tspan> per 1,000 (${pc})</text>`;
        s+=grid(gx,gy,sp,v*p,col)});
      s+=`<text x="${G[0][0]}" y="${f1((N?G[1][1]:G[0][1])+gh+16)}" class="t-xs">${N&&P.src.length>60?P.src.split(' · ')[0]:P.src}</text>`;
      if(N&&P.src.length>60)s+=`<text x="${G[0][0]}" y="${f1(G[1][1]+gh+29)}" class="t-xs">${P.src.split(' · ')[1]}</text>`}
    else s+=`<rect x="${N?32:40}" y="40" width="${N?336:640}" height="${N?300:190}" rx="12" style="fill:var(--panel-2);stroke:var(--line);stroke-dasharray:4 4"/><text x="${N?200:360}" y="${N?180:126}" class="t-lbl t-mid">No malformation figure in this guide’s sources</text><text x="${N?200:360}" y="${N?200:146}" class="t-xs t-mid">${N?'See NICE CG192 in the note':'See what NICE CG192 says about antipsychotics in the note'}</text>`;
    /* lower panel */
    const ly=N?(P?G[1][1]+gh+52:372):278,lx=N?32:40,lw=N?336:640;
    if(m.low==='dose'){const lab=N?96:120,x0=lx+lab,x1=lx+lw-10,LX=v=>x0+(x1-x0)*(Math.log2(v)+2)/5;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?'Heart-defect risk by dose (aRR, 95% CI)':'Heart-defect risk by first-trimester dose (adjusted RR, 95% CI)'}</text>`;
      [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(LX(v))}" x2="${f1(LX(v))}" y1="${ly+8}" y2="${ly+72}" class="${v===1?'axis':'grid'}"/><text x="${f1(LX(v))}" y="${ly+86}" class="t-xs t-mid">${v}</text>`});
      DOSE.forEach(([n,rr,lo,hi],i)=>{const y=ly+22+i*19,sel=i===+dose.value;
        s+=`<text x="${x0-8}" y="${y+3.5}" class="t-xs t-end" style="${sel?'fill:var(--ink);font-weight:700':''}">${n}</text><line x1="${f1(LX(lo))}" x2="${f1(LX(hi))}" y1="${y}" y2="${y}" style="stroke:${sel?'var(--bad)':'var(--muted)'};stroke-width:${sel?2.4:1.4}"/><rect x="${f1(LX(rr)-4)}" y="${y-4}" width="8" height="8" style="fill:${sel?'var(--bad)':'var(--muted)'}"/><text x="${f1(LX(hi)+5)}" y="${y+3.5}" class="t-xs" style="${sel?'fill:var(--ink);font-weight:700':''}">${rr.toFixed(2)}</text>`})}
    else if(m.low==='iq'||m.low==='eurap'){const rows=m.low==='iq'?[['valproate',97],['carbamazepine',105],['lamotrigine',108],['phenytoin',108]]:EURAP,mx=m.low==='iq'?120:12;
      const lab=N?96:120,x0=lx+lab,bw=lw-lab-50;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${m.low==='iq'?'Mean IQ at age 6 by fetal exposure (NEAD)':'Major malformations by medicine, % (EURAP)'}</text>`;
      rows.forEach(([n,v],i)=>{const y=ly+12+i*17,sel=n===({vpa:'valproate',cbz:'carbamazepine',ltg:'lamotrigine'})[cur];
        s+=`<text x="${x0-8}" y="${y+10}" class="t-xs t-end" style="${sel?'fill:var(--ink);font-weight:700':''}">${n}</text><rect x="${x0}" y="${y+1}" width="${f1(bw*v/mx*p)}" height="12" rx="3" style="fill:${sel?'var(--bad)':'var(--muted)'};opacity:${sel?.9:.5}"/><text x="${f1(x0+bw*v/mx*p+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${m.low==='iq'?v:f1(v)+'%'}</text>`})}
    else{s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">NICE CG192 order of preference</text>`;
      [['antipsychotic','first'],['lithium','only if antipsychotics have not worked'],['valproate','only if other options fail, with prevention programme']].forEach(([n,v],i)=>{const y=ly+20+i*18;s+=`<text x="${lx}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${n}</tspan>: ${N&&v.length>34?v.replace(', with prevention programme',''):v}</text>`})}
    med.innerHTML=s;
    cap.textContent=P?'Each dot is one birth. Dots are rounded to whole numbers; the percentages are as published.':'No dots are drawn where the sources give no number.';
  }
  function pick(id){cur=id;$$('[data-pgm]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pgm===id)));opts.hidden=id!=='li';
    mnote.innerHTML=noteHTML(M[id].note);if(stopA)stopA();stopA=animate(700,p=>drawM(ease(p)),()=>{stopA=null})}
  $$('[data-pgm]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.pgm)));
  $$('[data-pgo]').forEach(b=>b.addEventListener('click',()=>{out=b.dataset.pgo;$$('[data-pgo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(stopA)stopA();stopA=animate(700,p=>drawM(ease(p)),()=>{stopA=null})}));
  dose.addEventListener('change',()=>drawM(1));
  mnote.innerHTML=noteHTML(M.li.note);drawM(1);
  const prevR=redraws.pregnancy;redraws.pregnancy=()=>{prevR&&prevR();drawM(1)};
  const prevH=onHide.pregnancy;onHide.pregnancy=()=>{prevH&&prevH();if(stopA)stopA();stopA=null};
};
/* =============== 5.1 Course, relapse & comorbidity =============== */
/* ten illustrative years, u = year/10. Episodes are listed so the readout can count them. */
const CO_YEARS=10;
const CO_BASE={
  knots:[[0,.04],[.004,.35],[.012,.78],[.022,.86],[.03,.55],[.038,.12],[.05,.02],[.08,-.08],[.11,.03],[.14,-.06],
    [.155,-.3],[.17,-.62],[.19,-.7],[.215,-.55],[.235,-.2],[.25,-.12],[.28,-.22],[.31,-.1],[.335,.05],
    [.345,.32],[.358,.38],[.37,.12],[.4,.0],[.43,-.08],[.45,-.36],[.47,-.7],[.5,-.66],[.52,-.34],[.545,-.2],[.58,-.28],[.61,-.12],[.65,-.04],[.68,.04],
    [.695,.5],[.71,.86],[.722,.8],[.735,.15],[.75,-.4],[.77,-.6],[.795,-.5],[.82,-.18],[.86,-.08],[.9,.04],[.94,-.06],[.97,.02],[1,0]],
  eps:[{u:.004,e:.038,p:'up',n:'mania (first episode)'},{u:.15,e:.235,p:'down',n:'depression'},{u:.34,e:.37,p:'up',n:'hypomania'},
    {u:.44,e:.525,p:'down',n:'depression'},{u:.69,e:.735,p:'up',n:'mania'},{u:.738,e:.82,p:'down',n:'depression (switched without recovery)'}]};
const CO_TX={
  knots:[[0,.04],[.004,.35],[.012,.78],[.022,.86],[.03,.55],[.038,.12],[.05,.02],[.08,-.05],[.11,.02],[.14,-.04],[.2,.02],[.26,-.06],[.31,.02],[.36,.06],[.4,.0],
    [.44,-.08],[.46,-.3],[.48,-.5],[.5,-.42],[.515,-.15],[.54,-.05],[.6,.02],[.66,-.04],[.72,.06],[.78,0],[.84,-.06],[.9,.02],[.96,-.03],[1,0]],
  eps:[{u:.004,e:.038,p:'up',n:'mania (first episode)'},{u:.465,e:.51,p:'down',n:'depression, shorter and milder'}]};
const CO_STEPS=[
  {from:0,at:.025,k:'Year 0 · first episode',t:'A first mania',
   txt:`This illustration starts with a first hospital admission for mania. In the McLean-Harvard First-Episode Mania Study (166 people), 98% reached syndromal recovery within 2 years, half of them by 5.4 weeks. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup> Over up to 25 years of follow-up in another cohort, the median mood episode in bipolar I lasted 13 weeks, and more than 75% of people recovered from their episodes within a year of onset; episodes with a severe start, such as psychosis, took longer. <sup class="c" data-ref="Solomon2010" title="Source 465">465</sup>`,
   pt:`Most episodes end. For most people a first mania settles within weeks to a few months with treatment.`,
   hook:`First-episode mania: 98% syndromal recovery by 2 years, median 5.4 weeks. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>`},
  {from:.045,at:.1,k:'Year 0.5–1.5 · recovery',t:'Mood back, life not yet',
   txt:`The mood line is back in the steady band, but the strip below it, return to usual work and living, lags. In the same study only 72% reached symptomatic recovery and 43% functional recovery within 2 years. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup> Subsyndromal depression and persistent cognitive problems are the strongest correlates of poorer function. <sup class="c" data-ref="Gitlin2017" title="Source 178">178</sup>`,
   pt:`Feeling better and getting back to work or school do not always happen at the same time. Getting back to daily life can take longer.`,
   hook:`Syndromal 98% → symptomatic 72% → functional 43% within 2 years of a first mania. <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>`},
  {from:.14,at:.2,k:'Years 1.5–2.5 · recurrence',t:'The next episode',
   txt:`Recurrence is common. In STEP-BD, 858 people recovered from an episode, and 48.5% had a recurrence within up to 2 years. Depressive recurrences outnumbered manic, hypomanic or mixed ones more than two to one (34.7% vs 13.8%): it took 21.4 weeks for a quarter of people to have a depressive episode and 85.0 weeks for a quarter to have a high. <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup> After a first mania, pooled cohorts show recurrence in 41.0% by 1 year and 59.7% by 4 years. <sup class="c" data-ref="Gignac2015" title="Source 174">174</sup>`,
   pt:`After an episode ends, another one within a couple of years is common, and it is more often a low than a high. Staying in care helps lower that risk.`,
   hook:`STEP-BD: 48.5% recurrence within 2 years; depressive 34.7% vs manic/hypomanic/mixed 13.8%. <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup>`},
  {from:.24,at:.3,k:'Years 2.5–4 · between episodes',t:'The quieter symptoms in between',
   txt:`Between full episodes the line rarely sits exactly on the midline. In weekly ratings over 12.8 years, subsyndromal, minor depressive and hypomanic symptoms took up 29.9% of weeks, nearly three times as many as full major depression or mania (11.2%). <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> Residual symptoms at recovery predicted an earlier recurrence in STEP-BD, so the authors name them a target for maintenance care. <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup> A brief hypomania appears at year 3.5 in this illustration.`,
   pt:`"Not quite right" weeks between episodes are common and worth mentioning to your care team: treating leftover symptoms can protect against the next episode.`,
   hook:`Judd 2002: subsyndromal symptoms 29.9% of weeks vs syndromal 11.2%; residual symptoms predict earlier recurrence (STEP-BD). <sup class="c" data-ref="Judd2002,Perlis2006STEPBD" title="Source 246,404">246,404</sup>`},
  {from:.42,at:.55,k:'Years 4–6 · depression again',t:'Depression takes the most time',
   txt:`A second, longer depression. Over the long run people with bipolar I spent 31.9% of weeks with depressive symptoms and 8.9% with manic or hypomanic symptoms, and changed symptom status about 6 times a year. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> Comorbid drug-use disorder predicted a more chronic course. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> In a cohort of 82 outpatients on continuous maintenance treatment, the 5-year risk of a manic or depressive relapse was 73%, which is why treatment plans include what to do when early warning signs appear. <sup class="c" data-ref="Gitlin1995" title="Source 176">176</sup>`,
   pt:`Lows usually last longer than highs. A plan made while well, with your early warning signs written down, helps you act early.`,
   hook:`Bipolar I course: depressive symptoms 31.9% of weeks vs manic/hypomanic 8.9%; status changes about 6 times a year. <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>`},
  {from:.66,at:.8,k:'Years 7–10 · a switch',t:'Switching poles, and what treatment changes',
   txt:`Here a mania turns straight into depression without a well period in between. After a first mania, 19% switched to the opposite pole without recovering first, and 40% had a new episode within 2 years (20% mania, 20% depression). <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup> Press <b>With maintenance treatment</b> to compare a schematic treated course. In placebo-controlled trials lithium reduced new mood episodes (risk ratio 0.66) and manic episodes (0.52); <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup> individual psychological therapy reduced relapse at the end of treatment (RR 0.66). <sup class="c" data-ref="Oud2016" title="Source 392">392</sup> A risk ratio of 0.66 means about a third fewer episodes on average, not none.`,
   pt:`Treatment does not promise no more episodes, but it makes them less likely, and it can make them shorter and milder.`,
   hook:`Lithium vs placebo for relapse prevention: RR 0.66 overall, 0.52 for mania. <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup>`}
];
/* comorbidities: ring prevalence plus detail bars */
const CO_CM=[
  {id:'anx',n:'Anxiety disorders',short:'Anxiety',v:45,lab:'45% lifetime',col:'var(--dx)',
   bars:[['Lifetime, any anxiety disorder',45],['Current, while mood is steady',34.7]],
   why:`Across 40 studies (14,914 people), 45% of people with bipolar disorder had an anxiety disorder in their lifetime, about three times the population rate (RR 3.22), with no difference between bipolar I and II. <sup class="c" data-ref="Pavlova2015" title="Source 400">400</sup> Even while mood was steady, 34.7% met criteria for a current anxiety disorder (RR 4.60 against controls). <sup class="c" data-ref="Pavlova2017" title="Source 401">401</sup> Panic attacks were the most common comorbidity in the worldwide surveys. <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>`,
   help:`Comorbid anxiety lengthens the delay to diagnosis and is linked to suicide attempts, <sup class="c" data-ref="Keramatian2025,Schaffer2015Meta" title="Source 260,442">260,442</sup> so it is worth naming and treating in its own right.`},
  {id:'sud',n:'Alcohol & substance use',short:'Alcohol & drugs',v:42,lab:'42% alcohol (clinics)',col:'var(--accent)',
   bars:[['Alcohol use disorder, clinical samples',42],['Cannabis use disorder, clinical samples',20],['Other drug use disorder, clinical samples',17],['Any substance use disorder, population surveys',33]],
   why:`In clinical samples, alcohol use disorder was the most common substance problem (42%), then cannabis (20%) and other drugs (17%); men had a higher lifetime risk, and comorbid use was linked to earlier onset and slightly more admissions. <sup class="c" data-ref="Hunt2016Clinical" title="Source 231">231</sup> In national household surveys the odds of bipolar disorder were about 4 times higher with alcohol use disorder (OR 4.09) and 5 times higher with illicit drug use (OR 4.96). <sup class="c" data-ref="Hunt2016Surveys" title="Source 232">232</sup>`,
   help:`Drug-use disorder predicted a more chronic course in long-term follow-up, <sup class="c" data-ref="Judd2002" title="Source 246">246</sup> and cannabis use is linked to manic symptoms. <sup class="c" data-ref="Gibbs2015" title="Source 172">172</sup> Treating both together matters.`},
  {id:'mig',n:'Migraine',short:'Migraine',v:34.8,lab:'34.8%',col:'var(--rx)',
   bars:[['All bipolar disorder',34.8],['Bipolar II',54.17],['Bipolar I',32.7]],
   why:`Across 14 studies (3,976 people with bipolar disorder), the pooled prevalence of migraine was 34.8%, higher in bipolar II (54.17%) than in bipolar I (32.7%). <sup class="c" data-ref="Fornaro2015" title="Source 150">150</sup>`,
   help:`Migraine is common enough to ask about routinely, and it is one more reason to tell every prescriber about all your medicines and conditions.`},
  {id:'met',n:'Cardiometabolic disease',short:'Heart & metabolism',v:37.3,lab:'37.3% metabolic syndrome',col:'var(--kid)',
   bars:[['Metabolic syndrome, all',37.3],['Metabolic syndrome, taking antipsychotics',45.3],['Metabolic syndrome, not taking antipsychotics',32.4]],
   why:`Across 37 publications (6,983 people), 37.3% of people with bipolar disorder had metabolic syndrome, about twice the odds of general population groups (OR 1.98); it was more common with antipsychotics (45.3% vs 32.4%). <sup class="c" data-ref="Vancampfort2013" title="Source 499">499</sup> In severe mental illness, new cardiovascular disease was more frequent than in controls (adjusted HR 1.78). <sup class="c" data-ref="Correll2017CVD" title="Source 93">93</sup> An American Heart Association statement classes bipolar disorder in youth as a moderate-risk condition for early cardiovascular disease. <sup class="c" data-ref="Goldstein2015AHA" title="Source 182">182</sup>`,
   help:`NICE CG185 says people taking antipsychotics and long-term medication should be offered a combined healthy-eating and physical-activity programme. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> Regular checks of weight, blood sugar, cholesterol and blood pressure are part of good care. <sup class="c" data-ref="Vancampfort2013,Biazus2023" title="Source 46,499">46,499</sup>`},
  {id:'adhd',n:'ADHD',short:'ADHD',v:17,lab:'17% of adults',col:'var(--up-fill)',
   bars:[['Children with bipolar disorder',73],['Adolescents with bipolar disorder',43],['Adults with bipolar disorder',17]],
   why:`Across 92 studies (17,089 people), ADHD was present in 73% of children, 43% of adolescents and 17% of adults with bipolar disorder, and was 1.7 times more common in bipolar disorder than in major depression. <sup class="c" data-ref="Sandstrom2021" title="Source 438">438</sup> Telling ADHD and bipolar disorder apart is covered in <a href="#differential" data-go="differential">Bipolar or something else?</a>.`,
   help:`In 2,307 Swedish adults with bipolar disorder, starting methylphenidate alone was followed by a higher rate of mania within 3 months (HR 6.7), but not when a mood stabiliser was taken at the same time (HR 0.6). <sup class="c" data-ref="Viktorin2017" title="Source 513">513</sup> That is a registry finding about groups; decisions belong with the care team.`}
];
inits.course=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote'),read=$('#coRead'),rxB=$('#coRx');
  const fB=moodSeries(CO_BASE.knots),fT=moodSeries(CO_TX.knots);
  let rx=false;
  /* schematic function strip: 0 = not back to usual life, 1 = back; drops during episodes, returns slowly after */
  function funcAt(eps,u){let v=1;for(const e of eps){if(u<e.u)continue;if(u<=e.e){v=Math.min(v,.05);continue}
      const back=e.n.startsWith('mania (first')?.14:.07;v=Math.min(v,clamp(.05+(u-e.e)/back*.95,.05,1))}return v}
  function symShare(f,u){if(u<=0)return 0;const N=Math.max(1,Math.round(520*u));let k=0;for(let i=0;i<N;i++){const x=(i+.5)/N*u;if(Math.abs(f(x))>EU)k++}return k/N}
  const setActive=stepWire($('#coSteps'),CO_STEPS,rg,draw,()=>stop());
  function draw(t){const N=vb(svg,'720 380','400 400');
    const L=N?{x:28,y:58,w:356,h:250,fy:338,fh:14,ay:372}:{x:84,y:40,w:610,h:230,fy:292,fh:14,ay:324};
    const S=rx?CO_TX:CO_BASE,f=rx?fT:fB,o=rx?fB:fT;let s='';
    s+=`<text x="${N?14:14}" y="${N?24:24}" class="t-big">${rx?'With maintenance treatment (schematic)':'An illustrative course'}</text>`;
    if(!N)s+=`<text x="706" y="24" class="t-sm t-end">${rx?'dashed: same person without it':'10 years after a first mania'}</text>`;
    else s+=`<text x="14" y="42" class="t-sm">${rx?'dashed line: the same course without it':'10 years after a first mania'}</text>`;
    const lc=lifechart(L.x,L.y,L.w,L.h,f,{upto:t,id:'co',labels:true,dot:true});
    s+=lc.svg;
    if(rx){const g=lifechart(L.x,L.y,L.w,L.h,fB,{upto:t,ghost:true});s+=g.svg}
    /* episode markers */
    S.eps.forEach(e=>{if(t<e.u)return;const x0=lc.X(e.u),x1=lc.X(Math.min(t,e.e));const yy=e.p==='up'?L.y-2:L.y+L.h+2;
      s+=`<rect x="${f1(x0)}" y="${f1(e.p==='up'?yy-5:yy)}" width="${f1(Math.max(2,x1-x0))}" height="5" rx="2" style="fill:${e.p==='up'?'var(--up-fill)':'var(--down-fill)'}"/>`});
    /* function strip */
    s+=N?`<text x="${L.x}" y="${L.fy-6}" class="t-xs">Back to usual work and living (schematic)</text>`:`<text x="${L.x-8}" y="${L.fy+5}" class="t-xs t-end">usual life</text><text x="${L.x-8}" y="${L.fy+15}" class="t-xs t-end">back?</text>`;
    s+=`<rect x="${L.x}" y="${L.fy}" width="${L.w}" height="${L.fh}" rx="4" style="fill:var(--panel-2)"/>`;
    const M=120;for(let i=0;i<M;i++){const u=(i+.5)/M;if(u>t)break;const v=funcAt(S.eps,u);
      s+=`<rect x="${f1(L.x+L.w*i/M)}" y="${L.fy}" width="${f1(L.w/M+.4)}" height="${L.fh}" style="fill:${v>.95?'var(--good)':'var(--warn)'};opacity:${f1(v>.95?.85:.25+.5*v)}"/>`}
    s+=tline(L.x,L.ay,L.w,{min:0,max:10,step:N?2:1,fmt:v=>v+' y'}).svg;
    /* head */
    const yr=t*CO_YEARS,ph=phaseOf(CO_STEPS,t),pole=f.pole(t);
    const done=S.eps.filter(e=>t>=e.u),cur=S.eps.find(e=>t>=e.u&&t<=e.e);
    const sh=symShare(f,t);
    if(!rx&&t>=.045&&t<.14){const x=lc.X(N?.1:.12);s+=`<text x="${f1(x)}" y="${f1(L.y+L.h*.5-16)}" class="t-xs" style="fill:var(--eu);font-weight:600">mood recovered</text><text x="${f1(x)}" y="${L.fy-(N?20:6)}" class="t-xs" style="fill:var(--warn);font-weight:600">${N?'':'daily life still catching up'}</text>`}
    if(!rx&&t>=.66){const x=lc.X(.736),y=lc.Y(fB(.736));s+=`<text x="${f1(N?x-8:x+8)}" y="${f1(y-6)}" class="t-xs${N?' t-end':''}" style="fill:var(--mixed);font-weight:600">switch, no well gap</text>`}
    if(!rx&&t>=.24&&t<.42){const x=lc.X(.27),y=lc.Y(-.22);s+=`<text x="${f1(x)}" y="${f1(y+18)}" class="t-xs" style="fill:var(--down)">residual symptoms</text>`}
    svg.innerHTML=s;
    setActive(ph);note.innerHTML=noteHTML(CO_STEPS[ph]);
    const st=cur?cur.n:pole==='eu'?'steady band':pole==='up'?'raised mood, below episode level':'low mood, below episode level';
    read.innerHTML=`<span>Year <b>${f1(yr)}</b></span><span>Now: <b>${st}</b></span><span>Episodes so far: <b>${done.length}</b></span><span>Symptomatic weeks in this illustration: <b>${Math.round(sh*100)}%</b></span>`}
  const stop=playWire(rg,$('#coPlay'),draw,24000,'Replay','course');
  rxB.addEventListener('click',()=>{rx=!rx;rxB.setAttribute('aria-pressed',rx);draw(+rg.value)});
  draw(+rg.value);

  /* ---- comorbidity ring ---- */
  const ring=$('#coRing'),cmNote=$('#coCmNote'),btns=$('#coCmBtns');let sel=0;
  btns.innerHTML=CO_CM.map((c,i)=>`<button class="btn" data-cm="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  btns.addEventListener('click',e=>{const b=e.target.closest('[data-cm]');if(!b)return;sel=+b.dataset.cm;$$('[data-cm]',btns).forEach((x,k)=>x.setAttribute('aria-pressed',k===sel));drawRing()});
  function arc(cx,cy,r,p){if(p>=1)p=.9999;const a0=-Math.PI/2,a1=a0+p*2*Math.PI,x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    return `M${f1(x0)} ${f1(y0)}A${r} ${r} 0 ${p>.5?1:0} 1 ${f1(x1)} ${f1(y1)}`}
  function drawRing(){const N=vb(ring,'720 340','400 600');const C=CO_CM[sel];let s='';
    const R=N?{cx:200,cy:178,rr:118,nr:34}:{cx:178,cy:170,rr:118,nr:34};
    s+=`<circle cx="${R.cx}" cy="${R.cy}" r="${R.rr}" style="fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 5"/>`;
    s+=`<circle cx="${R.cx}" cy="${R.cy}" r="44" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.4"/><text x="${R.cx}" y="${R.cy-3}" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">bipolar</text><text x="${R.cx}" y="${R.cy+10}" class="t-xs t-mid" style="fill:var(--brand);font-weight:600">disorder</text>`;
    CO_CM.forEach((c,i)=>{const a=-Math.PI/2+i*2*Math.PI/CO_CM.length,x=R.cx+R.rr*Math.cos(a),y=R.cy+R.rr*Math.sin(a),on=i===sel;
      s+=`<line x1="${f1(R.cx+44*Math.cos(a))}" y1="${f1(R.cy+44*Math.sin(a))}" x2="${f1(x-R.nr*Math.cos(a))}" y2="${f1(y-R.nr*Math.sin(a))}" style="stroke:${on?c.col:'var(--line)'};stroke-width:${on?2.2:1.2}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${R.nr}" style="fill:var(--panel);stroke:var(--line);stroke-width:1"/>`;
      s+=`<path d="${arc(x,y,R.nr-4,c.v/100)}" style="fill:none;stroke:${c.col};stroke-width:${on?7:5};stroke-linecap:round;opacity:${on?1:.6}"/>`;
      s+=`<text x="${f1(x)}" y="${f1(y+5)}" class="t-lbl t-mid" style="font-size:${on?14:12.5}px">${c.v}%</text>`;
      const below=Math.sin(a)>.2,ly=below?y+R.nr+14:y-R.nr-7;
      s+=`<text x="${f1(x)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${c.short}</text>`});
    /* detail bars */
    const B=N?{x:20,y:372,w:360,row:52}:{x:376,y:58,w:320,row:56};
    s+=`<text x="${B.x}" y="${B.y-24}" class="t-big" style="font-size:15px">${C.n}</text>`;
    C.bars.forEach(([n,v],k)=>{const y=B.y+k*B.row,w=B.w*v/100;
      s+=`<text x="${B.x}" y="${y}" class="t-xs" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${B.x}" y="${y+7}" width="${B.w}" height="16" rx="8" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y+7}" width="${f1(w)}" height="16" rx="8" style="fill:${C.col}"/>`;
      s+=`<text x="${f1(Math.min(B.x+w+6,B.x+B.w-30))}" y="${y+19}" class="t-xs" style="fill:var(--ink);font-weight:700">${v}%</text>`});
    ring.innerHTML=s;
    cmNote.innerHTML=`<div class="kicker">Comorbidity · ${C.lab}</div><h4>${C.n}</h4><p>${C.why}</p><div class="pt"><b>Why it matters</b>${C.help}</div>`}
  drawRing();
  const prevR=redraws.course;redraws.course=()=>{prevR&&prevR();drawRing()};
};
/* =============== 5.2 Living well: sleep, routine & mood charting =============== */
inits.living=()=>{
  const svg=$('#lwSvg'),rg=$('#lwT'),noteEl=$('#lwNote'),read=$('#lwRead');
  const ND=56,DU=d=>d/(ND-1);
  /* piecewise-linear through [day,value] knots */
  const pl=(k,d)=>{if(d<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(d<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(d-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* one illustrative person: knots in rating units (-3..+3) and hours */
  const fM=moodSeries([[0,0],[6,.25],[11,-.25],[16,.1],[20,0],[24,.4],[27,.9],[30,1.5],[33,1.95],[35,1.5],[38,.8],[41,.3],[46,.1],[50,-.1],[55,.05]].map(([d,v])=>[DU(d),v/3]));
  const fG=moodSeries([[33,1.95],[36,2.5],[40,2.9],[45,3],[55,2.9]].map(([d,v])=>[DU(d),v/3]));
  const SK=[[0,7.5],[19,7.4],[21,5.9],[23,5.5],[25,5.8],[27,5.1],[30,4.7],[33,4.2],[34,5.4],[36,6.8],[38,7.4],[55,7.6]];
  const GK=[[33,4.2],[36,3.4],[40,3],[46,3.2],[55,3.3]];
  const r=rng(5202),DAY=[];
  for(let d=0;d<ND;d++){const n1=(r()-.5)*.8,n2=(r()-.5)*.9,calm=d>21&&d<40;
    DAY.push({m:clamp(Math.round(fM(DU(d))*3+n1*(calm?.3:1)),-3,3),s:Math.round(clamp(pl(SK,d)+n2*(calm?.4:1),2,10)*2)/2,
      gm:clamp(Math.round(fG(DU(d))*3),-3,3),gs:Math.round(pl(GK,d)*2)/2})}
  const EVENTS=[{d:20,t:'work deadline: late nights'},{d:44,t:'family birthday'}];
  const SIGNS=[{d:23,t:'short nights'},{d:26,t:'more plans than usual'},{d:28,t:'talking faster (partner noticed)'},{d:31,t:'spending more'}];
  const PLAN=[['call my agreed','contact'],['protect sleep:','usual bedtime'],['cut back plans','and spending'],['care team reviews','treatment']],PD=33;
  const short=(d,ghost)=>{let n=0;for(let i=Math.max(0,d-6);i<=d;i++)if((ghost&&i>=PD?DAY[i].gs:DAY[i].s)<6)n++;return n};
  const STEPS=[
   {from:0,at:DU(10),k:'Weeks 1–3',t:'A steady baseline',
    txt:`Each day gets one mood rating and one sleep figure. The NIMH prospective Life Chart Method rates mood every day by how much it impairs functioning; in 270 people its ratings correlated with clinicians' depression (r = −0.785) and mania (r = 0.656) scales. Small ups and downs inside the steady band are normal. Knowing your own baseline is what makes a change visible. <sup class="c" data-ref="Denicoff2000" title="Source 101">101</sup>`,
    pt:`A mood chart is a short daily note: how was my mood, how long did I sleep. Over weeks it shows what "normal for me" looks like.`,
    hook:`NIMH-LCM-p: daily, prospective, and rated by how much mood impairs functioning. <sup class="c" data-ref="Denicoff2000" title="Source 101">101</sup>`},
   {from:DU(19.5),at:DU(22),k:'Weeks 3–4',t:'A trigger: late nights',
    txt:`<span class="ev hyp">Hypothesis</span> A work deadline brings late nights. Sleep loss can trigger a switch into mania, and mania in turn cuts sleep: a proposed self-reinforcing loop, with sleep reduction as a "final common pathway", supported by sleep-deprivation experiments. Even between episodes, people with bipolar disorder show more variable sleep-wake patterns than controls, one reason regular routines matter. <sup class="c" data-ref="Wehr1987,Ng2015Sleep" title="Source 370,516">370,516</sup>`,
    pt:`A few short nights in a row is worth noticing, even if you feel fine, or better than fine.`,
    hook:`Sleep loss and mania feed each other (Wehr 1987). <sup class="c" data-ref="Wehr1987" title="Source 516">516</sup>`},
   {from:DU(23),at:DU(29),k:'Weeks 4–5',t:'Early warning signs',
    txt:`Sleep keeps shortening and this person's own warning signs appear one by one (the numbered triangles): more plans than usual, talking faster, spending more. In a review of 17 studies, at least 80% of people with a mood disorder could identify one or more early signs, and sleep disturbance was the most robust early sign of mania (median 77%). Manic run-ups lasted more than 20 days on average, with a wide range (1–120 days), so there is often time to act. <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`,
    pt:`Many people have a pattern of early signs that comes back each time. Writing yours down while you are well helps you and others spot it.`,
    hook:`Most robust early sign of mania: sleep disturbance (median 77%). <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`},
   {from:DU(32.5),at:DU(35),k:'Week 5',t:'The action plan',
    txt:`Short nights plus two of the listed signs are what this person wrote down as "time to act", so on day 34 they use the plan. NICE CG185 says such a plan covers triggers and early warning signs, the person's own coping strategies, how services will respond, and who to contact in a crisis. Training people to spot early symptoms and get prompt treatment lengthened the time to a first manic relapse (65 vs 17 weeks at the 25th centile) and cut manic relapses by a median 30%. Using coping strategies at the early-sign stage went with fewer relapses. <sup class="c" data-ref="NICE2014CG185,Perry1999BMJ,Lam2001Prodromes" title="Source 287,372,407">287,372,407</sup>`,
    pt:`A plan made while you are well works like a fire drill: when the signs come, you already know who to call and what to do.`,
    hook:`Early-warning-sign training (Perry 1999): fewer manic relapses, but no effect on depressive relapse. <sup class="c" data-ref="Perry1999BMJ" title="Source 407">407</sup>`},
   {from:DU(37),at:DU(47),k:'Weeks 6–7',t:'Back to steady',
    txt:`<span class="ev early">Early evidence</span> Sleep returns to its usual length and mood settles back into the steady band over about a week. The dashed lines are a schematic of the course the plan is meant to head off. Regular daily routines are the added ingredient of interpersonal and social rhythm therapy (IPSRT): people who made their daily rhythms more regular were less likely to have a recurrence. A busy family birthday in week 7 passes without trouble: not every event is a trigger. <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>`,
    pt:`Regular times to wake, eat and go to bed can help keep moods steadier.`,
    hook:`IPSRT = interpersonal psychotherapy + regular social rhythms. <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>`},
   {from:DU(50),at:1,k:'Week 8',t:'What the chart is for',
    txt:`The low side is harder to catch. A quarter of people had difficulty detecting depressive early signs, depressive run-ups were shorter (under 19 days on average), and early-sign training did not reduce depressive relapse. A chart also does not work on its own: in the MONARCA I trial, daily smartphone self-monitoring with feedback did not reduce symptoms. It earns its place when it is shared with the care team and acted on. Try your own chart below. <sup class="c" data-ref="Lam2001Prodromes,Jackson2003,Perry1999BMJ,FaurholtJepsen2015" title="Source 123,236,287,407">123,236,287,407</sup>`,
    pt:`Low moods are harder to notice from the inside. Agree with someone you trust that they will tell you what they see.`,
    hook:`Self-monitoring is part of NICE relapse-prevention therapy, but monitoring alone (MONARCA I) did not reduce symptoms. <sup class="c" data-ref="NICE2014CG185,FaurholtJepsen2015" title="Source 123,372">123,372</sup>`}
  ];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 590');
    const L=N?{x0:40,x1:386,ev:36,m0:62,m1:196,sg:212,s0:232,s1:326,ax:344,px:14,py:376,pw:372,ph:200}
             :{x0:58,x1:550,ev:34,m0:62,m1:200,sg:216,s0:236,s1:338,ax:356,px:570,py:22,pw:140,ph:352};
    const dd=t*(ND-1),di=Math.min(ND-1,Math.floor(dd+1e-6)),ph=phaseOf(STEPS,t);
    const cw=(L.x1-L.x0)/ND,X=d=>L.x0+cw*(d+.5),Y=m=>L.m1-(m+3)/6*(L.m1-L.m0),SY=h=>L.s1-h/10*(L.s1-L.s0);
    let s=`<defs>${marker('lwAr','var(--muted)')}</defs>`;
    /* mood bands */
    [[1.5,3,'var(--up-soft)',1],[.5,1.5,'var(--up-soft)',.5],[-.5,.5,'var(--eu-soft)',1],[-1.5,-.5,'var(--down-soft)',.5],[-3,-1.5,'var(--down-soft)',1]].forEach(([a,b,c,o])=>{
      s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${f1(L.x1-L.x0)}" height="${f1(Y(a)-Y(b))}" style="fill:${c};opacity:${o}"/>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--eu);stroke-width:1.1;stroke-dasharray:2 4"/>`;
    [3,2,1,0,-1,-2,-3].forEach(m=>{s+=`<text x="${L.x0-6}" y="${f1(Y(m)+3.5)}" class="t-xs t-end">${m>0?'+'+m:m<0?'−'+(-m):'0'}</text>`});
    s+=`<text x="${L.x0}" y="${L.m0-6}" class="t-sm" style="fill:var(--ink)">MOOD</text><text x="${L.x0+40}" y="${L.m0-6}" class="t-xs">${N?'−3 low … +3 high':'daily rating, −3 low to +3 high'}</text>`;
    /* sleep panel */
    [0,5,10].forEach(h=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(h))}" y2="${f1(SY(h))}" class="${h?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(SY(h)+3.5)}" class="t-xs t-end">${h}</text>`});
    s+=`<text x="${L.x0}" y="${L.s0-6}" class="t-sm" style="fill:var(--ink)">SLEEP</text><text x="${L.x0+44}" y="${L.s0-6}" class="t-xs">hours each night</text>`;
    /* weeks */
    for(let w=0;w<=8;w++){const x=L.x0+cw*w*7;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.m0}" y2="${L.s1}" class="grid" style="opacity:.6"/>`;
      if(w<8)s+=`<text x="${f1(x+cw*3.5)}" y="${L.ax}" class="t-xs t-mid">${N?'w'+(w+1):'week '+(w+1)}</text>`}
    /* action-plan band */
    if(dd>=PD-.5){const xe=X(Math.min(dd,40))+cw/2;s+=`<rect x="${f1(X(PD)-cw/2)}" y="${L.m0}" width="${f1(Math.max(2,xe-X(PD)+cw/2))}" height="${L.s1-L.m0}" style="fill:var(--brand);opacity:.09"/>`;
      s+=`<text x="${f1(X(PD)-cw/2+3)}" y="${L.m0+11}" class="t-xs" style="fill:var(--brand);font-weight:700">action plan</text>`}
    /* the 6-hour line from the person's plan */
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(6))}" y2="${f1(SY(6))}" style="stroke:var(--up);stroke-width:1.2;stroke-dasharray:5 3"/><text x="${L.x1}" y="${f1(SY(6)-4)}" class="t-xs t-end" style="fill:var(--up)">my plan: under 6 h</text>`;
    /* ghost course */
    const showG=ph>=4&&dd>PD;
    if(showG){let g='',gs='';for(let d=PD;d<=Math.min(di,ND-1);d++){g+=(g?'L':'M')+f1(X(d))+' '+f1(Y(DAY[d].gm));gs+=(gs?'L':'M')+f1(X(d))+' '+f1(SY(DAY[d].gs))}
      s+=`<path d="${g}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.8"/><path d="${gs}" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4;opacity:.8"/>`;
      if(di>=42){s+=`<text x="${f1(X(41))}" y="${f1(Y(3)+12)}" class="t-xs t-end">signs missed (schematic)</text>`}}
    /* sleep bars */
    for(let d=0;d<=di;d++){const h=DAY[d].s,lo=h<6;s+=`<rect x="${f1(X(d)-cw*.36)}" y="${f1(SY(h))}" width="${f1(cw*.72)}" height="${f1(SY(0)-SY(h))}" rx="1.2" style="fill:${lo?'var(--up-fill)':'var(--night)'};opacity:${lo?.95:.8}"/>`}
    /* mood line and dots */
    let p='';for(let d=0;d<=di;d++)p+=(d?'L':'M')+f1(X(d))+' '+f1(Y(DAY[d].m));
    s+=`<path d="${p}" style="fill:none;stroke:var(--ink);stroke-width:1.4;opacity:.55;stroke-linejoin:round"/>`;
    for(let d=0;d<=di;d++){const m=DAY[d].m,c=m>0?'var(--up-fill)':m<0?'var(--down-fill)':'var(--eu)';s+=`<circle cx="${f1(X(d))}" cy="${f1(Y(m))}" r="${d===di?4.6:2.5}" style="fill:${c};stroke:var(--panel);stroke-width:${d===di?1.8:.8}"/>`}
    /* events */
    s+=`<text x="${L.x0}" y="${L.ev-12}" class="t-sm" style="fill:var(--ink)">LIFE</text>`;
    EVENTS.forEach(E=>{if(di<E.d)return;const x=X(E.d),w=E.t.length*5.5,end=x+8+w>L.x1;
      s+=`<path d="M${f1(x)} ${L.ev+12}V${L.ev-8}l7 3.5-7 3.5" style="fill:var(--accent);stroke:var(--accent);stroke-width:1.2"/><text x="${f1(end?x-4:x+10)}" y="${L.ev}" class="t-xs${end?' t-end':''}" style="fill:var(--accent)">${E.t}</text>`});
    /* warning signs (numbered) */
    SIGNS.forEach((g,i)=>{if(di<g.d)return;const x=X(g.d);s+=`<path d="M${f1(x)} ${L.sg-6}l6 10h-12z" style="fill:var(--up-fill);stroke:var(--up);stroke-width:1"/><text x="${f1(x)}" y="${L.sg+3}" class="t-mid" style="font:700 7px var(--mono);fill:var(--ink)">${i+1}</text>`});
    /* cursor */
    s+=`<line x1="${f1(X(dd))}" x2="${f1(X(dd))}" y1="${L.m0}" y2="${L.s1+4}" style="stroke:var(--ink);stroke-width:1.2;opacity:.5"/>`;
    /* panel: this week */
    const sn=short(di),seen=SIGNS.filter(g=>g.d<=di),mood=DAY[di].m;
    let st,col;
    if(di<20){st='Steady';col='var(--eu)'}else if(di<23){st='A trigger';col='var(--accent)'}
    else if(di<PD){st=seen.length>=2&&sn>=3?'Use the plan':'Watch closely';col='var(--up)'}
    else if(di<=40){st='Plan in use';col='var(--brand)'}else{st='Steady again';col='var(--eu)'}
    const P={x:L.px,y:L.py};let q=`<rect x="${P.x}" y="${P.y}" width="${L.pw}" height="${L.ph}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const cx=P.x+12;let yy=P.y+22;
    q+=`<text x="${cx}" y="${yy}" class="t-sm">THIS WEEK</text>`;yy+=22;
    q+=`<text x="${cx}" y="${yy}" class="t-big" style="fill:${col}">${st}</text>`;yy+=22;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">short nights (last 7)</text>`;yy+=12;
    for(let i=0;i<7;i++){const d=di-6+i,on=d>=0&&DAY[d].s<6;q+=`<rect x="${cx+i*15}" y="${yy}" width="11" height="11" rx="2.5" style="fill:${d<0?'var(--panel)':on?'var(--up-fill)':'var(--night)'};opacity:${on?1:.55}"/>`}
    q+=`<text x="${cx+112}" y="${yy+9.5}" class="t-lbl">${sn}/7</text>`;yy+=28;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">mood today</text><text x="${cx+L.pw-24}" y="${yy}" class="t-lbl t-end">${mood>0?'+'+mood:mood<0?'−'+(-mood):'0'}</text>`;yy+=20;
    /* narrow: signs and plan side by side */
    const c2=N?P.x+L.pw/2+6:cx,top2=yy;
    q+=`<text x="${cx}" y="${yy}" class="t-xs">my warning signs</text>`;yy+=15;
    SIGNS.forEach((g,i)=>{const on=g.d<=di;q+=`<text x="${cx}" y="${yy}" style="font:${on?700:500} 10px var(--body);fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.55}">${i+1}. ${N&&g.t.length>20?g.t.split(' (')[0]:g.t.replace(' (partner noticed)','')}</text>`;yy+=14});
    let y2=N?top2:yy+10;
    q+=`<text x="${c2}" y="${y2}" class="t-xs">action plan</text>`;y2+=15;
    PLAN.forEach((it,i)=>{const on=dd>=PD+i*.8;q+=`<rect x="${c2}" y="${y2-9}" width="10" height="10" rx="2" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1"/>`;
      if(on)q+=`<path d="M${c2+2} ${y2-4}l2.5 2.5 4-5" style="fill:none;stroke:var(--on-brand);stroke-width:1.5"/>`;
      const fs=`font:${on?700:500} 10px var(--body);fill:${on?'var(--ink)':'var(--muted)'}`;
      q+=`<text x="${c2+15}" y="${y2}" style="${fs}">${N?it.join(' '):it[0]}</text>`;
      if(!N){y2+=13;q+=`<text x="${c2+15}" y="${y2}" style="${fs}">${it[1]}</text>`}
      y2+=15});
    s+=q;
    svg.innerHTML=s;
    noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
    read.innerHTML=`<span>day <b>${di+1}</b> · week <b>${Math.floor(di/7)+1}</b></span><span>mood <b>${mood>0?'+'+mood:mood<0?'−'+(-mood):'0'}</b></span><span>sleep <b>${DAY[di].s} h</b></span><span>short nights this week <b>${sn}/7</b></span>`;
  }
  const stop=playWire(rg,$('#lwPlay'),draw,22000,'Replay','living');
  setSt=stepWire($('#lwSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the reader's own chart ---------- */
  const mine=$('#lwMine'),cap=$('#lwMineCap'),msg=$('#lwMsg'),dateEl=$('#lwDate'),moodEl=$('#lwMood'),sleepEl=$('#lwSleep'),demoB=$('#lwDemo');
  const KEY='lwChart';
  let data=store.get(KEY,{});if(!data||typeof data!=='object'||Array.isArray(data))data={};
  const pad=n=>String(n).padStart(2,'0');
  const isoL=dt=>`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
  const parse=s=>{const a=String(s).split('-').map(Number);return new Date(a[0],a[1]-1,a[2])};
  const addD=(dt,n)=>{const x=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()+n);return x};
  const today=new Date();dateEl.value=isoL(today);dateEl.max=isoL(today);
  const say=(t,ok)=>{msg.textContent=t;msg.classList.toggle('ok',!!ok)};
  let demo=false;
  function demoData(){const o={},rr=rng(77),M=[0,0,1,0,0,-1,0,0,1,1,2,1,1,0],S=[7.5,7,7.5,8,7,7.5,7,6.5,6,5.5,5,6,6.5,7];
    for(let i=0;i<14;i++){o[isoL(addD(today,i-13))]={m:M[i],s:Math.max(3,S[i]+(rr()<.3?.5:0))}}return o}
  function fill(){const e=data[dateEl.value];if(e){moodEl.value=String(e.m);sleepEl.value=e.s}}
  function drawMine(){
    const N=vb(mine,'720 300','400 380'),D=demo?demoData():data;
    const L=N?{x0:40,x1:386,m0:30,m1:170,s0:204,s1:300,ax:322}:{x0:58,x1:704,m0:26,m1:150,s0:178,s1:254,ax:274};
    const keys=Object.keys(D).filter(k=>/^\d{4}-\d\d-\d\d$/.test(k)).sort();
    let end=today;if(keys.length){const last=parse(keys[keys.length-1]);if(last>end)end=last}
    const n=28,start=addD(end,-(n-1)),cw=(L.x1-L.x0)/n,X=i=>L.x0+cw*(i+.5),Y=m=>L.m1-(m+3)/6*(L.m1-L.m0),SY=h=>L.s1-Math.min(h,12)/12*(L.s1-L.s0);
    let s='';
    [[1.5,3,'var(--up-soft)',1],[.5,1.5,'var(--up-soft)',.5],[-.5,.5,'var(--eu-soft)',1],[-1.5,-.5,'var(--down-soft)',.5],[-3,-1.5,'var(--down-soft)',1]].forEach(([a,b,c,o])=>{
      s+=`<rect x="${L.x0}" y="${f1(Y(b))}" width="${f1(L.x1-L.x0)}" height="${f1(Y(a)-Y(b))}" style="fill:${c};opacity:${o}"/>`});
    [3,0,-3].forEach(m=>{s+=`<text x="${L.x0-6}" y="${f1(Y(m)+3.5)}" class="t-xs t-end">${m>0?'+3':m<0?'−3':'0'}</text>`});
    s+=`<text x="${L.x0}" y="${L.m0-8}" class="t-xs">mood</text>`;
    [0,6,12].forEach(h=>{s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(SY(h))}" y2="${f1(SY(h))}" class="${h?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(SY(h)+3.5)}" class="t-xs t-end">${h}</text>`});
    s+=`<text x="${L.x0}" y="${L.s0-8}" class="t-xs">sleep, hours</text>`;
    const pts=[];
    for(let i=0;i<n;i++){const dt=addD(start,i),k=isoL(dt),e=D[k];
      if(i%7===0||i===n-1)s+=`<text x="${f1(X(i))}" y="${L.ax}" class="t-xs t-mid">${dt.getDate()}/${dt.getMonth()+1}</text>`;
      if(isoL(dt)===isoL(today))s+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${L.m0}" y2="${L.s1}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 3"/>`;
      if(!e)continue;const h=+e.s,m=+e.m;
      if(isFinite(h))s+=`<rect x="${f1(X(i)-cw*.36)}" y="${f1(SY(h))}" width="${f1(cw*.72)}" height="${f1(SY(0)-SY(h))}" rx="1.2" style="fill:var(--night);opacity:.8"/>`;
      if(isFinite(m))pts.push([i,m])}
    let p='';pts.forEach(([i,m],j)=>{p+=(j&&pts[j-1][0]===i-1?'L':'M')+f1(X(i))+' '+f1(Y(m))});
    if(p)s+=`<path d="${p}" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`;
    pts.forEach(([i,m])=>{s+=`<circle cx="${f1(X(i))}" cy="${f1(Y(m))}" r="3.6" style="fill:${m>0?'var(--up-fill)':m<0?'var(--down-fill)':'var(--eu)'};stroke:var(--panel);stroke-width:1.2"/>`});
    if(!pts.length)s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${f1(Y(0)-10)}" class="t-lbl t-mid">No days saved yet</text><text x="${f1((L.x0+L.x1)/2)}" y="${f1(Y(0)+8)}" class="t-xs t-mid">${N?'Save today above, or show the example':'Save today above, or press “Show an example fortnight”'}</text>`;
    if(demo)s+=`<text x="${L.x1}" y="${L.m0-8}" class="t-xs t-end" style="fill:var(--accent)">EXAMPLE DATA, NOT YOURS</text>`;
    mine.innerHTML=s;
    const last7=keys.filter(k=>parse(k)<=end).slice(-7).map(k=>+D[k].s).filter(isFinite);
    cap.textContent=demo?'Showing a made-up fortnight. Press the button again to go back to your own chart.':
      keys.length?`${keys.length} day${keys.length>1?'s':''} saved in this browser. The last 28 days are shown${last7.length?`; average sleep over your last ${last7.length} saved night${last7.length>1?'s':''}: ${f1(last7.reduce((a,b)=>a+b,0)/last7.length)} h`:''}.`
      :'Nothing saved yet. Entries stay on this device only.';
  }
  dateEl.addEventListener('change',()=>{fill();say('')});
  $('#lwSave').addEventListener('click',()=>{
    const k=dateEl.value,h=parseFloat(sleepEl.value),m=parseInt(moodEl.value,10);
    if(!/^\d{4}-\d\d-\d\d$/.test(k)){say('Pick a date first.');return}
    if(!isFinite(h)||h<0||h>24){say('Hours of sleep should be a number from 0 to 24.');return}
    data[k]={m:clamp(m,-3,3),s:Math.round(h*2)/2};store.set(KEY,data);
    if(demo){demo=false;demoB.setAttribute('aria-pressed','false')}
    say(`Saved ${k}.`,true);drawMine()});
  $('#lwDel').addEventListener('click',()=>{const k=dateEl.value;if(data[k]){delete data[k];store.set(KEY,data);say(`Removed ${k}.`,true)}else say('Nothing saved for that date.');drawMine()});
  demoB.addEventListener('click',()=>{demo=!demo;demoB.setAttribute('aria-pressed',String(demo));say(demo?'Showing example data.':'');drawMine()});
  $('#lwCsv').addEventListener('click',()=>{const keys=Object.keys(data).sort();if(!keys.length){say('Nothing saved yet to download.');return}
    const csv='date,mood (-3 to +3),sleep hours\n'+keys.map(k=>`${k},${data[k].m},${data[k].s}`).join('\n');
    try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='my-mood-chart.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);say('Downloaded my-mood-chart.csv.',true)}catch(e){say('Download is not available in this browser.')}});
  let armed=0;const clr=$('#lwClear');
  clr.addEventListener('click',()=>{if(!armed){armed=setTimeout(()=>{armed=0;clr.textContent='Clear my chart'},4000);clr.textContent='Click again to clear all';return}
    clearTimeout(armed);armed=0;clr.textContent='Clear my chart';data={};store.set(KEY,data);say('Your chart was cleared.',true);drawMine()});
  fill();drawMine();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();drawMine()};
};
/* =============== 5.3 Families, work & school =============== */
inits.families=()=>{
  const svg=$('#faSvg'),rg=$('#faT'),noteEl=$('#faNote');
  const T0=.14,T1=.74;/* sessions run from T0 to T1, the follow-up after */
  const MODS3=[{n:'psychoeducation',c:'var(--brand)'},{n:'communication',c:'var(--accent)'},{n:'problem solving',c:'var(--rx)'}];
  const STEPS=[
   {from:0,at:.07,k:'Before therapy',t:'Expressed emotion',
    txt:`Researchers rate the family climate as <b>expressed emotion</b> (EE): critical, hostile or emotionally over-involved attitudes towards the person. In 23 recently manic inpatients, high family EE and a negative affective style predicted relapse over the 9 months after discharge, independent of whether medicines were taken. A meta-analysis found EE robustly predicts relapse, with larger effects in mood disorders than in schizophrenia. The 1988 study reports this as a prediction; its abstract gives no relapse percentage that could be checked, so none is shown. <sup class="c" data-ref="Miklowitz1988EE,Butzlaff1998" title="Source 62,332">62,332</sup>`,
    pt:`Expressed emotion describes how a family talks with and about the person. It is a pattern that can change, not a verdict on anyone.`,
    hook:`High EE = critical, hostile or over-involved; it predicted relapse in bipolar disorder (Miklowitz 1988). <sup class="c" data-ref="Miklowitz1988EE" title="Source 332">332</sup>`},
   {from:T0,at:.25,k:'Months 1–3',t:'Psycho&shy;education',
    txt:`In the 2003 trial, 101 people recovering from a manic, mixed or depressive episode were randomised to 21 sessions of family-focused therapy (FFT) over 9 months, or to crisis management, all with medication. FFT starts by learning together: what bipolar disorder is, its early warning signs and how to plan for relapse. Caring often weighs heavily: carers show high EE, and carer burden is linked to carer depression. <sup class="c" data-ref="Miklowitz2003FFT,Ogilvie2005" title="Source 333,388">333,388</sup>`,
    pt:`The whole family learns the same facts about the illness at the same time, so nobody has to guess.`,
    hook:`NICE CG185: offer a family intervention to people who live with or are in close contact with family (1.7.2). <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
   {from:.36,at:.46,k:'Months 4–6',t:'Communication training',
    txt:`The middle part practises how the family talks together, which is exactly the climate that expressed emotion measures. In the gauge, criticism and hostility fall; this is a schematic picture, because the trial reported relapse, not EE scores. Family or conjoint therapy also kept people in treatment better than standard psychoeducation (OR 0.46). <sup class="c" data-ref="Miklowitz2003FFT,Miklowitz1988EE,Miklowitz2021NMA" title="Source 332,333,338">332,333,338</sup>`,
    pt:`Families practise saying hard things calmly, and listening, so a worry can be raised without a fight.`,
    hook:`FFT = psychoeducation + communication training + problem solving, over 21 sessions in 9 months. <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>`},
   {from:.56,at:.66,k:'Months 7–9',t:'Problem solving',
    txt:`The last part works through practical problems the family faces. In a network meta-analysis of 39 trials, psychoeducation with guided practice of illness-management skills in a family or group format reduced recurrences compared with the same strategies delivered individually (OR 0.12). Another network meta-analysis found that only carer-focused interventions significantly reduced manic or depressive relapse. <sup class="c" data-ref="Miklowitz2021NMA,Chatterton2017" title="Source 74,338">74,338</sup>`,
    pt:`Instead of arguing about a problem, the family lists options together and tries one.`,
    hook:`Carer-focused interventions were the only ones to significantly cut relapse in Chatterton 2017. <sup class="c" data-ref="Chatterton2017" title="Source 74">74</sup>`},
   {from:T1,at:.97,k:'Two years later',t:'Fewer relapses',
    txt:`Over 2 years, 35% (11 of 31) relapsed with FFT against 54% (38 of 70) with crisis management, and mean time without relapse was 73.5 against 53.2 weeks (HR 0.38, intention to treat). FFT also improved medication adherence. These are trial averages, not a promise for any one family. <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>`,
    pt:`Families who took part together saw fewer relapses and longer well spells than families who only had help in a crisis.`,
    hook:`FFT 2-year relapse: 35% vs 54% (HR 0.38). <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>`}
  ];
  /* schematic climate: criticism, hostility, over-involvement fall through the three parts */
  const CL=[['criticism',.82,.3],['hostility',.62,.18],['over-involvement',.74,.32]];
  const climate=(t,i)=>{const [,a,b]=CL[i];const p=i===2?ramp(t,.18,.7):ramp(t,.3,.62);return lerp(a,b,ease(p))};
  const SAY=[
    [['You’re just being lazy again.'],['I’ll sort everything out','for you, as always.']],
    [['So short nights can be','an early warning sign?']],
    [['I noticed you’ve been up late.','I’m worried. Can we talk?']],
    [['Let’s list some options','and pick one to try.']],
    [['We know our plan,','and who to call.']]];
  let setSt=()=>{};
  function bubble(x,y,lines,col,tail){const w=Math.max(...lines.map(l=>l.length))*6.3+20,h=lines.length*15+12;
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="10" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/>`;
    s+=`<path d="M${f1(tail[0])} ${f1(y+h)}l6 9 4-9" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><path d="M${f1(tail[0]+.8)} ${f1(y+h-1)}h8.4" style="stroke:var(--panel);stroke-width:2.4"/>`;
    lines.forEach((l,i)=>{s+=`<text x="${f1(x+10)}" y="${f1(y+19+i*15)}" style="font:600 12px var(--body);fill:var(--ink)">${l}</text>`});return s}
  function draw(t){
    const N=vb(svg,'720 400','400 650'),ph=phaseOf(STEPS,t);
    const L=N?{tx0:20,tx1:380,ty:52,sx:20,sy:118,sw:360,gx:20,gy:346,gw:360,ox:20,oy:500,ow:360}
             :{tx0:40,tx1:680,ty:48,sx:30,sy:104,sw:330,gx:400,gy:100,gw:290,ox:400,oy:262,ow:290};
    let s='';
    /* timeline */
    const TX=u=>lerp(L.tx0,L.tx1,u);
    s+=`<text x="${L.tx0}" y="${L.ty-26}" class="t-sm" style="fill:var(--ink)">${N?'FFT: 21 SESSIONS, 9 MONTHS':'FAMILY-FOCUSED THERAPY · 21 SESSIONS OVER 9 MONTHS'}</text>`;
    s+=`<line x1="${f1(TX(0))}" x2="${f1(TX(1))}" y1="${L.ty}" y2="${L.ty}" class="axis"/>`;
    MODS3.forEach((m,i)=>{const a=lerp(T0,T1,i/3),b=lerp(T0,T1,(i+1)/3),on=t>=a;
      s+=`<rect x="${f1(TX(a))}" y="${L.ty-5}" width="${f1(TX(b)-TX(a)-2)}" height="10" rx="5" style="fill:${m.c};opacity:${on?.25:.08}"/>`;
      s+=`<text x="${f1((TX(a)+TX(b))/2)}" y="${L.ty+22}" class="t-xs t-mid" style="fill:${on?m.c:'var(--muted)'};font-weight:${on?700:500}">${N?['psychoed.','communic.','problems'][i]:m.n}</text>`});
    for(let i=0;i<21;i++){const u=lerp(T0,T1,(i+.5)/21),on=t>=u,c=MODS3[Math.floor(i/7)].c;s+=`<circle cx="${f1(TX(u))}" cy="${L.ty}" r="${on?3.6:2.6}" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.2"/>`}
    if(!N)s+=`<text x="${f1(TX(T0/2))}" y="${L.ty+22}" class="t-xs t-mid">before</text>`;s+=`<text x="${f1(TX((T1+1)/2))}" y="${L.ty+22}" class="t-xs t-mid">${N?'2-yr follow-up':'2-year follow-up'}</text>`;
    s+=`<path d="M${f1(TX(t))} ${L.ty-12}l-5 -7h10z" style="fill:var(--ink)"/>`;
    /* family scene */
    const fy=L.sy+(N?120:130),cxs=[L.sx+L.sw*.2,L.sx+L.sw*.5,L.sx+L.sw*.8];
    s+=`<rect x="${f1(L.sx+L.sw*.08)}" y="${f1(fy+44)}" width="${f1(L.sw*.84)}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const who=['relative','the person','relative'];
    cxs.forEach((x,i)=>{s+=person(x,fy-6,54,i===1?'var(--brand)':'var(--muted)');s+=`<text x="${f1(x)}" y="${f1(fy+70)}" class="t-xs t-mid">${who[i]}</text>`});
    const lines=SAY[ph];
    if(ph===0){s+=bubble(L.sx,L.sy,lines[0],'var(--bad)',[cxs[0]-6]);const w2=Math.max(...lines[1].map(l=>l.length))*6.3+20;s+=bubble(L.sx+L.sw-w2,L.sy+(N?40:44),lines[1],'var(--warn)',[cxs[2]-10])}
    else{const w=Math.max(...lines[0].map(l=>l.length))*6.3+20,spk=ph===1?1:ph===4?1:ph===3?2:0,bx=clamp(cxs[spk]-w/2,L.sx,L.sx+L.sw-w);s+=bubble(bx,L.sy+24,lines[0],ph===4?'var(--good)':MODS3[Math.min(2,ph-1)].c,[cxs[spk]-6])}
    /* climate gauge */
    s+=`<text x="${L.gx}" y="${L.gy}" class="t-sm" style="fill:var(--ink)">FAMILY CLIMATE</text><text x="${L.gx+L.gw}" y="${L.gy}" class="t-xs t-end">schematic</text>`;
    CL.forEach(([n],i)=>{const v=climate(t,i),y=L.gy+18+i*34,w=L.gw;
      s+=`<text x="${L.gx}" y="${y+4}" class="t-xs">${n}</text>`;
      s+=`<rect x="${L.gx}" y="${y+9}" width="${w}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.gx}" y="${y+9}" width="${f1(w*v)}" height="10" rx="5" style="fill:${v>.55?'var(--bad)':v>.4?'var(--warn)':'var(--good)'};opacity:.8"/>`});
    const ee=(climate(t,0)+climate(t,1)+climate(t,2))/3;
    s+=`<text x="${L.gx}" y="${L.gy+124}" class="t-lbl" style="fill:${ee>.55?'var(--bad)':ee>.4?'var(--warn)':'var(--good)'}">${ee>.55?'High expressed emotion':ee>.4?'Climate shifting':'Calmer, lower-EE climate'}</text>`;
    /* outcomes */
    const g=ease(ramp(t,T1+.02,.95));
    s+=`<text x="${L.ox}" y="${L.oy}" class="t-sm" style="fill:var(--ink)">TWO-YEAR RESULTS</text><text x="${L.ox+L.ow}" y="${L.oy}" class="t-xs t-end">Miklowitz 2003</text>`;
    if(g<=0)s+=`<text x="${L.ox}" y="${L.oy+24}" class="t-xs">appear after the 9 months of sessions</text>`;
    else{const rows=[['Relapsed by 2 years',[['FFT',35,'%','var(--brand)'],['crisis management',54,'%','var(--muted)']],60],['Mean weeks without relapse',[['FFT',73.5,' wk','var(--brand)'],['crisis management',53.2,' wk','var(--muted)']],80]];
      let y=L.oy+20;const lw=N?118:112,bw=L.ow-lw-44;
      rows.forEach(([h,R,mx])=>{s+=`<text x="${L.ox}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:600">${h}</text>`;y+=8;
        R.forEach(([n,v,u,c])=>{const vv=v*g;s+=`<text x="${f1(L.ox+lw-6)}" y="${y+10}" class="t-xs t-end">${n}</text><rect x="${L.ox+lw}" y="${y+1}" width="${f1(bw*vv/mx)}" height="12" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(L.ox+lw+bw*vv/mx+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${u===' wk'?f1(vv):Math.round(vv)}${u}</text>`;y+=17});y+=10});
      if(g>.95)s+=`<text x="${L.ox}" y="${y+2}" class="t-xs">HR 0.38 for relapse · adherence improved too</text>`}
    svg.innerHTML=s;noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#faPlay'),draw,20000,'Replay','families');
  setSt=stepWire($('#faSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- what helps, what hurts ---------- */
  const VL={helps:'Helps',hurts:'Can hurt',mixed:'Mixed evidence',myth:'Not so'};
  const CARDS=[
   {f:'Calling the person lazy or selfish when they are depressed',v:'hurts',b:'Critical and hostile comments are part of high expressed emotion, which predicted relapse in bipolar disorder. <sup class="c" data-ref="Miklowitz1988EE,Butzlaff1998" title="Source 62,332">62,332</sup>'},
   {f:'Learning the person’s early warning signs together',v:'helps',b:'At least 80% of people can name an early sign, and family-focused therapy, which starts with this kind of learning, cut 2-year relapse from 54% to 35%. <sup class="c" data-ref="Jackson2003,Miklowitz2003FFT" title="Source 236,333">236,333</sup>'},
   {f:'Taking over every decision “for their own good”',v:'hurts',b:'Emotional over-involvement is the third strand of expressed emotion, alongside criticism and hostility. <sup class="c" data-ref="Miklowitz1988EE" title="Source 332">332</sup>'},
   {f:'Joining a carers’ education group, even if the person does not come',v:'helps',b:'Twelve group sessions for caregivers only reduced the share of patients with any recurrence and lengthened relapse-free time, mainly for hypomania and mania. <sup class="c" data-ref="Reinares2008" title="Source 427">427</sup>'},
   {f:'Putting your own health on hold, indefinitely',v:'hurts',b:'High-burden carers reported more physical health problems and depressive symptoms and less support. Family-focused therapy for carers reduced carers’ depressive symptoms. <sup class="c" data-ref="Perlick2007,Perlick2010" title="Source 402,403">402,403</sup>'},
   {f:'Agreeing early on how information about risk will be shared',v:'helps',b:'NICE says to negotiate early how information will be shared, stressing the importance of sharing information about risk (1.1.7). <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>'},
   {f:'Writing a crisis plan together while things are calm',v:'helps',b:'NICE recommends a jointly made plan with triggers, early signs, coping strategies and crisis contacts (1.4.1). One trial of joint crisis plans halved compulsory treatment (13% vs 27%). <sup class="c" data-ref="NICE2014CG185,Henderson2004BMJ" title="Source 220,372">220,372</sup>'},
   {f:'Keeping regular household routines: meals, wake time, bedtime',v:'helps',b:'More regular daily rhythms went with fewer recurrences in IPSRT, and sleep disturbance is the most common early sign of mania. <sup class="c" data-ref="Frank2005IPSRT,Jackson2003" title="Source 152,236">152,236</sup>'},
   {f:'Learning about the medicines as a family',v:'helps',b:'Family-focused therapy improved medication adherence, and psychoeducation reduced non-adherence in a network meta-analysis. <sup class="c" data-ref="Miklowitz2003FFT,Chatterton2017" title="Source 74,333">74,333</sup>'},
   {f:'Assuming the children will develop bipolar disorder',v:'myth',b:'In a 22-year offspring study, 11–13% developed bipolar disorder, so most did not. Mood disorders overall were common (65%), so early help is worth having. <sup class="c" data-ref="Helmink2025" title="Source 219">219</sup>'},
   {f:'Relying on an online toolkit for relatives on its own',v:'mixed',b:'In the REACT trial (800 relatives), distress fell in both arms, with no difference between the online toolkit and a resource directory alone. <sup class="c" data-ref="Lobban2020REACT" title="Source 301">301</sup>'},
   {f:'Hearing a hopeful message about recovery',v:'helps',b:'NICE says carers should be offered an education and support programme “with a positive message about recovery” (1.1.8). <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>'}];
  const box=$('#faCards'),cnt=$('#faCount'),all=$('#faAll');
  box.innerHTML=CARDS.map((c,i)=>`<button class="fa-card v-${c.v}" data-fa="${i}" aria-pressed="false"><span class="fa-f">${c.f}</span><span class="fa-b"><span class="fa-v">${VL[c.v]}</span>${c.b}</span><small>Tap to turn over</small></button>`).join('');
  const upd=()=>{const n=$$('.fa-card[aria-pressed="true"]',box).length;cnt.innerHTML=`<span>turned over <b>${n}</b> of 12</span>`;all.setAttribute('aria-pressed',String(n===12));all.textContent=n===12?'Turn all cards back':'Turn all cards over'};
  box.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const b=e.target.closest('.fa-card');if(!b)return;b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));upd()});
  all.addEventListener('click',()=>{const on=all.getAttribute('aria-pressed')!=='true';$$('.fa-card',box).forEach(b=>b.setAttribute('aria-pressed',String(on)));upd()});
  upd();
};
/* =============== 5.4 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.07,k:'09:00 · admission',t:'Safety first: assessment and observation',
  txt:`The first priority is the physical and psychological safety of the person and others. <sup class="c" data-ref="NICE2014CG185,NICE-NG10" title="Source 371,372">371,372</sup> NICE NG10 sets four observation levels, from low-level intermittent (every 30–60 minutes) to continuous (within eyesight or arm's length of a designated nurse). At least once each shift a nurse should set aside time to assess mental state and engage positively with the person, and observation lasting a week or more needs a multidisciplinary review. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup> Here the nurse starts at arm's length.`,
  pt:`On arrival, staff stay close and keep everyone safe while they get to know the person.`,
  hook:`NG10 observation: low intermittent 30–60 min; high intermittent 15–30 min; continuous = eyesight or arm's length. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>`},
 {from:.17,at:.25,k:'11:00 · the room',t:'A calm, low-stimulation environment',
  txt:`NICE says people with mania or hypomania should have "access to calming environments and reduced stimulation". It also advises them not to make important decisions until they recover, and encourages them to keep up relationships with carers. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> Watch the light, noise and number of people fall. On 31 wards, the ten Safewards staff-patient interventions reduced conflict by 15% and containment by 23.2%. <sup class="c" data-ref="Bowers2015" title="Source 56">56</sup>`,
  pt:`Less noise, softer light and fewer people help a racing mind slow down.`,
  hook:`Mania nursing: calming environment, reduced stimulation, no major decisions until recovered. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {from:.33,at:.42,k:'13:00 · body needs',t:'Fluids, food and the lithium label',
  txt:`A person who is too active to sit, eat or rest can become dehydrated, and dehydration matters doubly with lithium. The lithium label advises a normal diet including salt and adequate fluid (2500–3500 mL) "at least during the initial stabilization period", and warns that volume depletion, fever and changes in sodium raise the risk of toxicity. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> After rapid tranquillisation, NG10 lists the level of hydration among the signs to monitor. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup> The observation level steps down to intermittent checks.`,
  pt:`Drinks and easy food are offered often, because someone who cannot sit still may forget to eat and drink.`,
  hook:`Priority order in teaching: safety → physiological needs (fluids, food, sleep) → calm environment and de-escalation → teaching and discharge. <sup class="c" data-ref="NICE2014CG185,NICE-NG10,FDA-Lithobid" title="Source 133,371,372">133,371,372</sup>`},
 {from:.5,at:.56,k:'16:00 · escalation',t:'De-escalation before restriction',
  txt:`Agitation rises. The Project BETA consensus sets four aims: keep the patient, staff and others safe; help the patient manage emotions and regain control; avoid restraint when at all possible; and avoid coercion that escalates agitation. Its approach is to verbally engage, build a collaborative relationship, then verbally de-escalate. <sup class="c" data-ref="Richmond2012" title="Source 429">429</sup> NICE NG10: use restrictive interventions only when de-escalation has failed, keep trying to de-escalate throughout, never use them to punish, and do not routinely use manual restraint for more than 10 minutes. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>`,
  pt:`Staff talk calmly, listen and offer choices. Holding or sedating someone is a last resort.`,
  hook:`After rapid tranquillisation (NG10): pulse, BP, respiratory rate, temperature, hydration and consciousness at least hourly; every 15 minutes if higher risk. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>`},
 {from:.67,at:.76,k:'23:00 · night',t:'Protecting sleep',
  txt:`Sleep loss can trigger a switch into mania, and mania reduces sleep: a proposed self-reinforcing loop (<span class="ev hyp">Hypothesis</span>, supported by sleep-deprivation data). <sup class="c" data-ref="Wehr1987" title="Source 516">516</sup> Sleep disturbance is the most robust early warning sign of mania, in a median 77% of people. <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup> A dark, quiet ward at night follows the same calming-environment principle; here observation steps down to low-level intermittent checks. <sup class="c" data-ref="NICE2014CG185,NICE-NG10" title="Source 371,372">371,372</sup>`,
  pt:`Sleep is part of treatment. A dark, quiet night helps the mood come down.`,
  hook:`Most robust early sign of mania: sleep disturbance (median 77%). <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>`},
 {from:.83,at:.97,k:'Later · recovery',t:'Recovery and discharge planning',
  txt:`NICE says discharge plans should include recovery goals, a crisis plan with early warning signs and triggers, a mental-state assessment, and a medication plan with review dates and monitoring; the person and GP each get a copy. Consider intensive case management for people likely to disengage. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> Suicide rates are highest in the first 3 months after discharge, so follow-up contact should be arranged before the person leaves (population statistics). <sup class="c" data-ref="Chung2017JAMAPsych,Mann2021Suicide" title="Source 81,309">81,309</sup>`,
  pt:`Before going home, the person leaves with a written plan, a follow-up appointment and people to call.`,
  hook:`Post-discharge suicide rate is highest in the first 3 months: 1132 per 100,000 person-years. <sup class="c" data-ref="Chung2017JAMAPsych" title="Source 81">81</sup>`}
];
const NU_LI=[
 {k:'Toxicity',q:'Which signs can mean lithium toxicity?',a:`The label's boxed warning: toxicity "can occur at doses close to therapeutic levels". Mild: fine tremor, lightheadedness, lack of coordination, weakness. Moderate: drowsiness, ataxia, blurred vision, tinnitus, slurred speech. Severe: confusion, seizure, coma. Also nausea, vomiting and diarrhoea. Suspected toxicity is an emergency; there is no specific antidote. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>`},
 {k:'Fluids & salt',q:'What does the label say about fluid and salt?',a:`Keep a normal diet including salt, with adequate fluid intake (2500–3500 mL) "at least during the initial stabilization period". Protracted sweating or diarrhoea lowers tolerance. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> NICE: maintain fluid intake after sweating (exercise, heat, fever) or long immobility. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {k:'Sick days',q:'What should happen with vomiting, diarrhoea or fever?',a:`NICE tells people taking lithium to seek medical attention if they develop diarrhoea or vomiting or become acutely ill. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> The label lists febrile illness, volume depletion or dehydration among the things that raise the risk of toxicity. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>`},
 {k:'Pain relief',q:'Can someone on lithium take ibuprofen from a shop?',a:`NICE says to warn people taking lithium not to take over-the-counter NSAIDs. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> The label says lithium levels should be closely monitored when NSAIDs are started or stopped. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> In an older-adult cohort NSAIDs were not independently significant, but caution remains standard teaching. <sup class="c" data-ref="Juurlink2004" title="Source 248">248</sup>`},
 {k:'Other medicines',q:'Which other medicines can raise lithium levels?',a:`The label: sodium loss from diuretics, ACE inhibitors and ARBs may increase serum lithium. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> In people aged 66 and over, starting an ACE inhibitor (RR 7.6) or a loop diuretic (RR 5.5) raised the risk of admission for lithium toxicity within a month. <sup class="c" data-ref="Juurlink2004" title="Source 248">248</sup>`},
 {k:'Blood test timing',q:'When is the blood sample for a lithium level taken?',a:`The label: just before the next dose, 8–12 hours after the previous one; maintenance levels "at least every two months" in uncomplicated cases. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup> NICE: 1 week after starting and after every dose change, weekly until stable, then every 3 months in the first year and every 6 months after (3-monthly for higher-risk groups). Initial target for people new to lithium: 0.6–0.8 mmol/L. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {k:'6-monthly checks',q:'What else does NICE list for regular checks?',a:`Every 6 months: weight or BMI, urea and electrolytes including calcium, eGFR and thyroid function. At every appointment: signs of neurotoxicity (paraesthesia, ataxia, tremor, cognitive impairment), which "can occur at therapeutic levels". <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {k:'Stopping',q:'What does NICE say about stopping lithium?',a:`If lithium is stopped, reduce it gradually over at least 4 weeks and preferably up to 3 months, with close monitoring for early signs of mania and depression for 3 months afterwards. Any change is planned with the prescriber. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>`},
 {k:'Pregnancy',q:'What if someone is planning a pregnancy?',a:`NICE tells people taking lithium to talk to their doctor promptly about pregnancy or pregnancy plans. Plan with the care team; do not stop or start a medicine on your own. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> More in Part 4.3, Pregnancy &amp; the postpartum period.`},
 {k:'Alertness',q:'Is driving affected?',a:`The label cautions that lithium "may impair mental and/or physical abilities" and advises care with activities that need alertness, such as driving. <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>`}
];
const NU_MON={
 ap:{cols:['Baseline','Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 12','Dose change','Yearly'],ncols:['Base','1','2','3','4','5','6','12','Δ dose','Year'],
  rows:[['Weight / BMI',[1,1,1,1,1,1,1,1,0,1]],['Pulse & blood pressure',[1,0,0,0,0,0,0,0,1,1]],['Glucose or HbA1c',[1,0,0,0,0,0,0,1,0,1]],['Lipids',[1,0,0,0,0,0,0,1,0,1]],['Liver, renal, thyroid, calcium',[0,0,0,0,0,0,0,0,0,1]]],
  prac:{t:'BASELINE CHECKS IN ROUTINE PRACTICE (39 STUDIES)',b:[['Blood pressure',69.8,null],['Weight',47.9,75.9],['Glucose',44.3,56.1],['Cholesterol / lipids',41.5,28.9]],leg:['before guidelines','after guidelines']},
  cap:'NICE CG185: record weight or BMI, pulse, blood pressure, fasting glucose or HbA1c and lipids before starting an antipsychotic; pulse and blood pressure after each dose change; weight weekly for 6 weeks and at 12 weeks; glucose and lipids at 12 weeks. The yearly column is the annual physical health check. <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup> Practice bars: <sup class="c" data-ref="Mitchell2012Monitoring" title="Source 343">343</sup>'},
 li:{cols:['Week 1','Weekly to stable','3 months','6 months','9 months','12 months','18 months','24 months','Dose change','Each visit'],ncols:['Wk 1','Wkly','3 m','6 m','9 m','12 m','18 m','24 m','Δ dose','Visit'],
  rows:[['Lithium level',[1,1,1,1,1,1,1,1,1,0]],['Weight / BMI',[0,0,0,1,0,1,1,1,0,0]],['U&amp;E incl. calcium, eGFR',[0,0,0,1,0,1,1,1,0,0]],['Thyroid function',[0,0,0,1,0,1,1,1,0,0]],['Neurotoxicity signs',[0,0,0,0,0,0,0,0,0,1]]],
  prac:{t:'NICE STANDARD MET, UK AUDIT (ON LITHIUM ≥1 YEAR)',b:[['Lithium level',30,null],['Renal function',55,null],['Thyroid function',50,null]],leg:['standard met']},
  cap:'NICE CG185: lithium level 1 week after starting and after each dose change, weekly until stable, then 3-monthly in year 1 and 6-monthly after (3-monthly if higher risk); weight, U&E with calcium, eGFR and thyroid every 6 months; neurotoxicity at every appointment. The US label says to sample 8–12 hours after the last dose, at least every two months in uncomplicated maintenance. <sup class="c" data-ref="NICE2014CG185,FDA-Lithobid" title="Source 133,372">133,372</sup> Audit bars: <sup class="c" data-ref="Collins2010" title="Source 88">88</sup>'}
};
const NU_Q=[
 {q:'A man taking lithium has had vomiting and diarrhoea for two days. Today he is unsteady and his speech is slurred. What is the first action?',
  o:['Give his next lithium dose and recheck the level tomorrow','Treat this as possible lithium toxicity and get urgent medical review','Encourage oral fluids and reassess at the end of the shift','Teach him about a balanced diet'],a:1,
  e:`Unsteadiness (ataxia) and slurred speech are moderate signs of toxicity on the label, and volume depletion raises the risk. Suspected toxicity is an emergency, and NICE tells people on lithium to seek medical attention with diarrhoea or vomiting. <sup class="c" data-ref="FDA-Lithobid,NICE2014CG185" title="Source 133,372">133,372</sup>`},
 {q:'A woman with mania is shouting at other patients in a busy day room. No one has been hurt and she has no object in her hands. What comes first?',
  o:['Manual restraint by the team','Request rapid tranquillisation','Approach calmly, engage her verbally and offer a quieter space','Tell her she will lose privileges if she continues'],a:2,
  e:`Project BETA: verbally engage, build collaboration, then de-escalate, and avoid coercion that escalates agitation. NG10: restrictive interventions only when de-escalation has failed, and never as punishment. NICE CG185 also supports reduced stimulation. <sup class="c" data-ref="Richmond2012,NICE-NG10,NICE2014CG185" title="Source 371,372,429">371,372,429</sup>`},
 {q:'After rapid tranquillisation, which monitoring plan matches NICE NG10?',
  o:['Pulse, blood pressure, respiratory rate, temperature, hydration and consciousness at least hourly (every 15 minutes if higher risk)','A check at the next medication round','Blood pressure once, then only if she complains','No monitoring needed if she is asleep'],a:0,
  e:`NG10 recommendation 1.4.45 lists pulse, blood pressure, respiratory rate, temperature, level of hydration and level of consciousness, at least every hour until there are no further concerns, and every 15 minutes in higher-risk situations. <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>`},
 {q:'A man with mania has slept about 2 hours a night for 3 nights and has not sat down to eat today. Which need comes first?',
  o:['Attending the afternoon education group','Fluids, easy food and a quiet place to rest','Discharge teaching about his medicines','A trip to the hospital shop to burn off energy'],a:1,
  e:`In the teaching priority order, physiological needs (sleep, nutrition and hydration in a person too active to eat or rest) come right after safety, before education and discharge planning. The lithium label's fluid advice and NICE's calming-environment advice support this. <sup class="c" data-ref="NICE2014CG185,NICE-NG10,FDA-Lithobid" title="Source 133,371,372">133,371,372</sup>`},
 {q:'A woman admitted with bipolar depression and suicidal thoughts is going home tomorrow. What matters most before she leaves?',
  o:['Give her a leaflet and tell her to call if needed','Arrange a follow-up contact and a written crisis plan before discharge','Book a routine review in 6 months','Ask her family to watch her at all times'],a:1,
  e:`The first 3 months after discharge carry the highest suicide rate, highest of all in people admitted with suicidal thoughts. Active follow-up should be routine, and NICE discharge plans include a crisis plan. <sup class="c" data-ref="Chung2017JAMAPsych,Mann2021Suicide,NICE2014CG185" title="Source 81,309,372">81,309,372</sup>`},
 {q:'A man taking lithium asks for ibuprofen for back pain. What is the best first response?',
  o:['Give it: it is sold over the counter','Explain that NSAIDs can raise lithium levels and check with the prescriber or pharmacist first','Tell him to double his fluid intake and take it','Advise him to skip his lithium that day'],a:1,
  e:`NICE says to warn people taking lithium not to take over-the-counter NSAIDs, and the label says levels should be closely monitored when NSAIDs are started or stopped. Skipping lithium is never a fix. <sup class="c" data-ref="NICE2014CG185,FDA-Lithobid" title="Source 133,372">133,372</sup>`}
];
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const HK=[[0,8],[.17,11],[.33,13],[.5,16],[.67,22],[.83,30]];
  const hour=t=>{if(t>=.83)return 10;for(let i=1;i<HK.length;i++)if(t<=HK[i][0]){const a=HK[i-1],b=HK[i];return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return 30};
  const hh=h=>{h=((h%24)+24)%24;return String(Math.floor(h)).padStart(2,'0')+':'+String(Math.floor((h%1)*60)).padStart(2,'0')};
  const PRI=['1 · Safety','2 · Fluids, food, sleep','3 · Calm space, de-escalation','4 · Teaching, discharge'];
  const PRI_ON=[[0],[2],[1],[0,2],[1],[3]];
  function room(R,S,t){let s='';const fy=R.y+R.h*.8,night=S.night;
    s+=`<rect x="${R.x}" y="${R.y}" width="${R.w}" height="${R.h}" rx="10" style="fill:${night>.5?'var(--night)':'var(--panel-2)'};opacity:${night>.5?.35:1}"/><rect x="${R.x}" y="${R.y}" width="${R.w}" height="${R.h}" rx="10" style="fill:none;stroke:var(--line)"/>`;
    s+=`<line x1="${R.x}" x2="${R.x+R.w}" y1="${f1(fy)}" y2="${f1(fy)}" style="stroke:var(--line);stroke-width:1.5"/>`;
    /* window */
    const wx=R.x+R.w-86,wy=R.y+14;s+=`<rect x="${wx}" y="${wy}" width="64" height="42" rx="4" style="fill:${night>.5?'var(--night)':'var(--day)'};opacity:.85;stroke:var(--line)"/><line x1="${wx+32}" x2="${wx+32}" y1="${wy}" y2="${wy+42}" style="stroke:var(--line)"/>`;
    if(night>.5)s+=`<circle cx="${wx+46}" cy="${wy+14}" r="7" style="fill:var(--day)"/><circle cx="${wx+50}" cy="${wy+12}" r="6" style="fill:var(--night)"/>`;
    /* ceiling light: rays = stimulation */
    const lx=R.x+R.w*.42,ly=R.y+12,nr=Math.round(S.stim*7);
    s+=`<line x1="${lx}" x2="${lx}" y1="${R.y}" y2="${ly}" style="stroke:var(--muted)"/><circle cx="${lx}" cy="${ly+5}" r="7" style="fill:${night>.5?'var(--panel-2)':'var(--day)'};stroke:var(--muted)"/>`;
    for(let i=0;i<nr;i++){const a=Math.PI*(.15+.7*i/Math.max(1,6));s+=`<line x1="${f1(lx+12*Math.cos(a))}" y1="${f1(ly+5+12*Math.sin(a))}" x2="${f1(lx+26*Math.cos(a))}" y2="${f1(ly+5+26*Math.sin(a))}" style="stroke:var(--up-fill);stroke-width:2;stroke-linecap:round;opacity:.8"/>`}
    /* noise: a speaker with arcs */
    const sx=R.x+16,sy=R.y+30,na=Math.round(S.stim*3.4);s+=`<rect x="${sx}" y="${sy}" width="14" height="20" rx="3" style="fill:var(--muted);opacity:.7"/>`;
    for(let i=1;i<=na;i++)s+=`<path d="M${sx+18+i*6} ${sy+2-i*2}Q${sx+26+i*8} ${sy+10} ${sx+18+i*6} ${sy+18+i*2}" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(.9-i*.15)}"/>`;
    /* other people: fewer as stimulation falls */
    const np=Math.round(S.stim*3);for(let i=0;i<np;i++)s+=person(R.x+22+i*20,fy-34,34,'var(--muted)',{op:.45});
    /* table and glass */
    const gx=R.x+R.w*.2,gy=fy-30;s+=`<rect x="${f1(gx-18)}" y="${f1(gy+18)}" width="40" height="5" rx="2" style="fill:var(--muted)"/><line x1="${f1(gx-12)}" x2="${f1(gx-12)}" y1="${f1(gy+23)}" y2="${f1(fy)}" style="stroke:var(--muted);stroke-width:2"/><line x1="${f1(gx+16)}" x2="${f1(gx+16)}" y1="${f1(gy+23)}" y2="${f1(fy)}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="M${f1(gx-6)} ${f1(gy-4)}L${f1(gx-4)} ${f1(gy+18)}H${f1(gx+8)}L${f1(gx+10)} ${f1(gy-4)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(gx-4.5)}" y="${f1(gy+18-20*S.hyd)}" width="13" height="${f1(20*S.hyd)}" style="fill:var(--na);opacity:.55"/>`;
    /* bed */
    const bx=R.x+R.w-112,by=fy-22;s+=`<rect x="${bx}" y="${by}" width="96" height="16" rx="4" style="fill:var(--cell);stroke:var(--muted)"/><rect x="${bx}" y="${by-14}" width="6" height="30" rx="2" style="fill:var(--muted)"/><rect x="${bx+6}" y="${by-6}" width="20" height="8" rx="4" style="fill:var(--panel);stroke:var(--line)"/>`;
    /* patient */
    let px;if(S.sleep){px=bx+48;s+=`<ellipse cx="${bx+54}" cy="${by-3}" rx="36" ry="7" style="fill:var(--accent);opacity:.7"/><circle cx="${bx+16}" cy="${by-6}" r="7" style="fill:var(--accent)"/>`;
      s+=`<text x="${bx+62}" y="${by-16}" class="t-sm" style="fill:var(--muted)">z z</text>`}
    else{const amp=R.w*.16*S.agit;px=(S.dis?R.x+R.w*.46:R.x+R.w*.52)+amp*Math.sin(t*170);s+=person(px,fy-46,46,'var(--accent)');
      const nz=Math.round(S.agit*4);for(let i=0;i<nz;i++){const zx=px-14+i*9;s+=`<path d="M${f1(zx)} ${f1(fy-54)}l3 -6l3 6l3 -6" style="fill:none;stroke:var(--accent);stroke-width:1.4"/>`}
      if(S.dis)s+=`<rect x="${f1(px+12)}" y="${f1(fy-22)}" width="20" height="16" rx="3" style="fill:var(--accent-soft);stroke:var(--accent)"/><path d="M${f1(px+17)} ${f1(fy-22)}v-4h10v4" style="fill:none;stroke:var(--accent)"/>`}
    /* nurse at the observation distance */
    const nx=S.obs==='cont'?(S.sleep?bx-20:px+30):R.x+R.w*.08+(S.obs==='low'?0:6),op=S.obs==='low'?.45+.55*Math.max(0,Math.sin(t*90)):1;
    s+=person(nx,fy-44,44,'var(--rx)',{op});
    s+=`<text x="${f1(nx)}" y="${f1(fy+14)}" class="t-xs t-mid" style="fill:var(--rx)">nurse</text>`;
    if(S.obs==='cont'&&!S.sleep)s+=`<path d="M${f1(Math.min(px,nx)+6)} ${f1(fy+4)}H${f1(Math.max(px,nx)-6)}" style="stroke:var(--rx);stroke-width:1.2;stroke-dasharray:2 3"/>`;
    s+=`<text x="${R.x+10}" y="${R.y+R.h-8}" class="t-xs">observation: ${S.obs==='cont'?'continuous, arm’s length':S.obs==='high'?'high-level intermittent, 15–30 min':'low-level intermittent, 30–60 min'}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 640'),ph=phaseOf(NU_STEPS,t),h=hour(t);
    const night=ramp(t,.66,.69)*(1-ramp(t,.82,.84)),dis=t>=.83;
    let agit=.8-.15*ramp(t,.17,.3);agit+=.3*bump(t,.5,.6);agit*=1-.6*ramp(t,.56,.65);agit*=1-.6*ramp(t,.67,.75);if(dis)agit=.08;
    const S={stim:dis?.3:lerp(1,.3,ease(ramp(t,.17,.3)))*(1-.7*night),hyd:lerp(.3,.85,ease(ramp(t,.33,.47))),agit:clamp(agit),night,sleep:night>.5&&t>.7,dis,
      obs:ph<=1?'cont':ph===2?'high':ph===3?(t<.6?'cont':'high'):'low'};
    const slp=dis?6.5:2+4.5*ramp(t,.7,.8),ready=ramp(t,.85,.97);
    const L=N?{ck:[80,94,62],m:{x:166,y:30,w:216},rm:{x:16,y:196,w:368,h:214},pr:{x:16,y:438,w:368,h:184}}
             :{ck:[116,118,84],m:{x:494,y:40,w:212},rm:{x:226,y:30,w:252,h:232},pr:{x:16,y:300,w:690,h:104}};
    let s='';
    /* clock */
    const [cx,cy,r]=L.ck,ck=clock24(cx,cy,r,{sleep:ph>=4?[23,6]:[2,4],h:h,small:N});
    s+=ck.svg+`<text x="${cx}" y="${cy+r+18}" class="t-big t-mid">${dis?'Day 12':hh(h)}</text><text x="${cx}" y="${cy+r+32}" class="t-xs t-mid">${dis?'illustrative':ph>=4?'planned sleep in blue':'sleep: about 2 hours'}</text>`;
    /* room */
    s+=room(L.rm,S,t);
    /* gauges */
    const G=[['Stimulation',S.stim,'var(--up-fill)',''],['Hydration',S.hyd,'var(--na)',''],['Agitation',S.agit,'var(--accent)',''],['Sleep last night',slp/8,'var(--night)',f1(slp)+' h'],['Ready for discharge',ready,'var(--good)','']];
    const gh=N?26:34;s+=`<text x="${L.m.x}" y="${L.m.y-10}" class="t-sm">GAUGES · SCHEMATIC</text>`;
    G.forEach(([n,v,c,lab],i)=>{const y=L.m.y+i*gh;s+=`<text x="${L.m.x}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${n}${lab?' · '+lab:''}</text><rect x="${L.m.x}" y="${y+13}" width="${L.m.w}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${L.m.x}" y="${y+13}" width="${f1(Math.max(3,L.m.w*clamp(v)))}" height="7" rx="3.5" style="fill:${c}"/>`});
    /* priority stack */
    const P=L.pr,on=PRI_ON[ph];
    s+=`<text x="${P.x}" y="${P.y-8}" class="t-sm">NURSING PRIORITY ORDER · CURRENT FOCUS HIGHLIGHTED</text>`;
    PRI.forEach((p,i)=>{let x,y,w,hh2;if(N){w=(P.w-10)/2;hh2=(P.h-24)/2;x=P.x+(i%2)*(w+10);y=P.y+4+Math.floor(i/2)*(hh2+10)}else{w=(P.w-36)/4;hh2=P.h-30;x=P.x+i*(w+12);y=P.y+4}
      const hi=on.includes(i);s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(hh2)}" rx="10" style="fill:${hi?'var(--brand-soft)':'var(--panel)'};stroke:${hi?'var(--brand)':'var(--line)'};stroke-width:${hi?2:1}"/>`;
      const [a,b]=p.split(' · '),ci=b.lastIndexOf(', '),bl=b.length>16?[b.slice(0,ci+1),b.slice(ci+2)]:[b];s+=`<text x="${f1(x+w/2)}" y="${f1(y+hh2/2-8)}" class="t-big t-mid" style="fill:${hi?'var(--brand)':'var(--muted)'}">${a}</text>`;
      bl.forEach((q,k)=>{s+=`<text x="${f1(x+w/2)}" y="${f1(y+hh2/2+10+k*13)}" class="t-xs t-mid" style="fill:${hi?'var(--ink)':'var(--muted)'};font-size:${N?10:11}px">${q}</text>`});
      if(!N&&i<3)s+=`<path d="M${f1(x+w+2)} ${f1(y+hh2/2)}h8" style="stroke:var(--muted);stroke-width:1.5" marker-end="url(#nuAr)"/>`});
    s=`<defs>${marker('nuAr','var(--muted)')}</defs>`+s;
    svg.innerHTML=s;
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,28000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- lithium flip set ---- */
  const fl=$('#nuFlips');
  fl.innerHTML=NU_LI.map((c,i)=>`<button class="nu-flip" type="button" data-fl="${i}" aria-pressed="false"><span class="k">${String(i+1).padStart(2,'0')} · ${c.k}</span><span class="q">${c.q}</span><span class="a">${c.a}</span><span class="hint">Tap to see the answer</span></button>`).join('');
  fl.addEventListener('click',e=>{if(e.target.closest('a[data-go]'))return;const b=e.target.closest('[data-fl]');if(!b||e.target.closest('sup.c'))return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  $('#nuAll').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'Hide all answers':'Show all answers';$$('[data-fl]',fl).forEach(b=>b.setAttribute('aria-pressed',on))});

  /* ---- monitoring schedules ---- */
  const mon=$('#nuMon');let mk='ap',stopM=null;
  function drawM(p){const M=NU_MON[mk],nb=M.prac.b.length,nn=NARROW(),bh=nn&&M.prac.b.some(b=>b[2]!=null)?38:26;
    const L=nn?{lx:10,c0:152,c1:388,hy:44,r0:62,rh:36,py:292}:{lx:16,c0:236,c1:700,hy:40,r0:58,rh:34,py:270};
    const H=L.py+16+nb*bh+(M.prac.leg.length>1?22:4);const N=vb(mon,'720 '+H,'400 '+H);
    let s='';const n=M.cols.length,X=j=>lerp(L.c0,L.c1,j/(n-1));
    s+=`<text x="${L.lx}" y="16" class="t-sm" style="fill:var(--accent)">${mk==='ap'?'ANTIPSYCHOTIC: NICE CG185':'LITHIUM: NICE CG185'}</text>`;
    M.cols.forEach((c,j)=>{s+=`<text x="${f1(X(j))}" y="${L.hy}" class="t-xs t-mid" style="fill:var(--ink)">${M.ncols[j]}<title>${c}</title></text>`});
    s+=`<text x="${L.c1}" y="${L.hy-16}" class="t-xs t-end">${mk==='ap'?'weeks after starting · Δ = each dose change':'Wkly = weekly until stable · m = months · Δ = each dose change'}</text>`;
    const tot=M.rows.reduce((a,r)=>a+r[1].filter(Boolean).length,0);let k=0;
    M.rows.forEach(([nm,v],i)=>{const y=L.r0+i*L.rh+L.rh/2;
      s+=`<rect x="${L.lx-4}" y="${f1(y-L.rh/2+3)}" width="${f1(L.c1-L.lx+16)}" height="${L.rh-6}" rx="6" style="fill:${i%2?'none':'var(--field)'}"/>`;
      s+=`<text x="${L.lx}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-size:${N?9:10.5}px">${N&&nm.length>22?nm.replace('Liver, renal, thyroid, calcium','Liver/renal/thyroid/Ca').replace('U&amp;E incl. calcium, eGFR','U&amp;E, Ca, eGFR'):nm}</text>`;
      v.forEach((on,j)=>{if(!on)return;k++;const a=clamp(p*tot-k+1);if(a<=0)return;const dc=M.cols[j]==='Dose change',ev=M.cols[j]==='Each visit'||M.cols[j]==='Weekly to stable';
        s+=dc?`<path d="M${f1(X(j))} ${f1(y-8*a)}L${f1(X(j)+8*a)} ${f1(y)}L${f1(X(j))} ${f1(y+8*a)}L${f1(X(j)-8*a)} ${f1(y)}Z" style="fill:var(--accent)"/>`
             :ev?`<g style="opacity:${f1(a)}">${[-8,0,8].map(d=>`<circle cx="${f1(X(j)+d)}" cy="${f1(y)}" r="3.4" style="fill:var(--rx)"/>`).join('')}</g>`
             :`<circle cx="${f1(X(j))}" cy="${f1(y)}" r="${f1(7*a)}" style="fill:var(--rx)"/>`})});
    if(mk==='li'){const y=L.r0+L.rh/2;s+=`<text x="${f1((X(6)+X(7))/2)}" y="${f1(y-12)}" class="t-xs t-mid" style="fill:var(--accent)">3-monthly if higher risk</text>`}
    s+=`<text x="${L.lx}" y="${f1(L.r0+M.rows.length*L.rh+16)}" class="t-xs">${N?'● check  ◆ after dose change  ●●● repeated':'● scheduled check  ◆ after each dose change  ●●● repeated (weekly or every visit)'}</text>`;
    /* practice bars */
    const Pp=M.prac,bx=N?150:236,bw=N?200:380;s+=`<text x="${L.lx}" y="${L.py}" class="t-sm">${Pp.t}</text>`;
    Pp.b.forEach(([nm,v,v2],i)=>{const y=L.py+16+i*bh;s+=`<text x="${L.lx}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${nm}</text><rect x="${bx}" y="${y}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y}" width="${f1(bw*v/100*p)}" height="12" rx="3" style="fill:var(--muted)"/><text x="${f1(bx+bw*v/100*p+5)}" y="${y+10}" class="t-xs">${f1(v*p)}%</text>`;
      if(v2!=null){const y2=N?y+16:y;const xx=bx+bw*v2/100*p;s+=N?`<rect x="${bx}" y="${y2}" width="${f1(bw*v2/100*p)}" height="10" rx="3" style="fill:var(--accent)"/><text x="${f1(xx+5)}" y="${y2+9}" class="t-xs" style="fill:var(--accent)">${f1(v2*p)}%</text>`
        :`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y-3}" y2="${y+15}" style="stroke:var(--accent);stroke-width:3"/><text x="${f1(xx)}" y="${y-5}" class="t-xs t-mid" style="fill:var(--accent)">${f1(v2*p)}</text>`}});
    if(Pp.leg.length>1)s+=`<text x="${L.lx}" y="${H-6}" class="t-xs"><tspan style="fill:var(--muted)">■ ${Pp.leg[0]}</tspan>   <tspan style="fill:var(--accent)">${N?'■':'|'} ${Pp.leg[1]}</tspan></text>`;
    mon.innerHTML=s;$('#nuMonCap').innerHTML=M.cap}
  function setM(k){mk=k;$$('[data-mon]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mon===k));if(stopM)stopM();drawM(1);stopM=animate(900,p=>drawM(p))}
  $$('[data-mon]').forEach(b=>b.addEventListener('click',()=>setM(b.dataset.mon)));
  drawM(1);

  /* ---- priority sorter ---- */
  const qz=$('#nuQuiz'),ans=NU_Q.map(()=>null);let qi=0;
  function drawQ(){const Q=NU_Q[qi],a=ans[qi],score=ans.filter((x,i)=>x===NU_Q[i].a).length,done=ans.filter(x=>x!=null).length;
    qz.innerHTML=`<div class="qcard"><div class="kicker">Scenario ${qi+1} of ${NU_Q.length} · score ${score}/${done}</div><div class="bar"><i style="width:${f1(100*done/NU_Q.length)}%"></i></div><div class="q">${Q.q}</div>
      <div class="opts" role="group" aria-label="Choose the first action">${Q.o.map((o,j)=>`<button class="opt${a==null?'':j===Q.a?' right':j===a?' wrong':''}" data-op="${j}" aria-pressed="${a===j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div>
      ${a==null?'':`<div class="expl"><b>${a===Q.a?'Correct.':'Not first.'}</b> The first action is ${'ABCD'[Q.a]}. ${Q.e}</div>`}
      <div class="nu-nav"><button class="btn" id="nuPrev" ${qi?'':'disabled'}>Previous</button><button class="btn primary" id="nuNext">${qi<NU_Q.length-1?'Next scenario':'Start again'}</button></div></div>`}
  qz.addEventListener('click',e=>{const o=e.target.closest('[data-op]');
    if(o){ans[qi]=+o.dataset.op;drawQ();return}
    if(e.target.closest('#nuPrev')&&qi>0){qi--;drawQ();return}
    if(e.target.closest('#nuNext')){if(qi<NU_Q.length-1)qi++;else{qi=0;ans.fill(null)}drawQ()}});
  drawQ();
  const pr=redraws.nursing;redraws.nursing=()=>{pr&&pr();drawM(1)};
};
/* ================= 5.5 RESEARCH TOWARD BETTER TREATMENT ================= */
const FR_EV={est:'<span class="ev est">Established</span>',early:'<span class="ev early">Early evidence</span>',hyp:'<span class="ev hyp">Hypothesis</span>'};
const FR_STAGE=['Idea','Lab','Early trials','Large trials','Guidelines'],FR_STAGE_N=['Idea','Lab','Early','Large','Guideline'];
/* pos: 0 idea … 4 guidelines; st: go = moving, mix = mixed results, neg = stalled after negative larger trials */
const FR_P=[
 {n:'Gene-based targets',s:'64, then 298 loci; no drug trial yet',pos:1,ev:'hyp',st:'go'},
 {n:'Lithium-response prediction',s:'one locus; small check in 73 people',pos:1.6,ev:'early',st:'go'},
 {n:'Phone monitoring',s:'accurate, not yet shown to help',pos:2.1,ev:'early',st:'mix'},
 {n:'Ketamine & esketamine',s:'fast but short-lived; small trials',pos:2.4,ev:'early',st:'go'},
 {n:'Anti-inflammatory add-ons',s:'larger trials negative',pos:3,ev:'early',st:'neg'},
 {n:'Chronotherapy & light',s:'task force: light likely helps',pos:2.75,ev:'early',st:'go'},
 {n:'Newer antipsychotics, maintenance',s:'relapse trial negative',pos:3,ev:'early',st:'neg',ghost:{pos:4,txt:'lumateperone: depression label'}}
];
const FR_STEPS=[
 {k:'Programme 1 · genes to drugs',t:'Gene-based targets',
  txt:`${FR_EV.est} A GWAS of 41,917 people with bipolar disorder and 371,549 controls found 64 loci, with risk genes enriched in synaptic signalling. <sup class="c" data-ref="Mullins2021" title="Source 355">355</sup> A 2025 multi-ancestry study raised the count to 298 loci. <sup class="c" data-ref="OConnell2025" title="Source 387">387</sup> ${FR_EV.hyp} The 2021 signal was enriched in genes targeted by antipsychotics, calcium-channel blockers and antiepileptics, and it named druggable genes such as HTR6, MCHR1, DCLK3 and FURIN as possible new leads. <sup class="c" data-ref="Mullins2021" title="Source 355">355</sup> Calcium-channel genes such as CACNA1C renewed interest in calcium-channel blockers as treatments. <sup class="c" data-ref="Stahl2019" title="Source 470">470</sup> None of these leads has reached a bipolar trial in our sources.`,
  hook:`GWAS loci for bipolar disorder: 64 (Mullins 2021), then 298 (O'Connell 2025). <sup class="c" data-ref="Mullins2021,OConnell2025" title="Source 355,387">355,387</sup>`},
 {k:'Programme 2 · who will respond?',t:'Predicting lithium response',
  txt:`${FR_EV.early} ConLiGen's GWAS of lithium response in 2,563 patients found one locus on chromosome 21. In an independent sample of 73 people on lithium alone, carriers of the other alleles relapsed more (HR 3.8, 95% CI 1.1–13.0). <sup class="c" data-ref="Hou2016Lithium" title="Source 230">230</sup> A higher schizophrenia polygenic score went with poorer lithium response in 2,586 patients. <sup class="c" data-ref="Amare2018" title="Source 5">5</sup> ${FR_EV.early} Nerve cells grown from patients' stem cells were hyperexcitable, and lithium reversed this only in cells from people who had responded to it clinically. <sup class="c" data-ref="Mertens2015" title="Source 330">330</sup> Neurons from non-responders had weakened daily rhythms that lithium did not lengthen. <sup class="c" data-ref="Mishra2021" title="Source 341">341</sup> Response also runs in families: 67% of relatives with bipolar disorder of lithium responders responded, against 35% of a comparison group. <sup class="c" data-ref="Grof2002" title="Source 195">195</sup>`,
  pt:`No gene or cell test can yet tell in advance who will respond to lithium. <sup class="c" data-ref="Hou2016Lithium,Mertens2015" title="Source 230,330">230,330</sup>`,
  hook:`Lithium response: a chromosome 21 locus (ConLiGen, Hou 2016) and responder-only rescue in stem-cell neurons (Mertens 2015). <sup class="c" data-ref="Hou2016Lithium,Mertens2015" title="Source 230,330">230,330</sup>`},
 {k:'Programme 3 · digital phenotyping',t:'Phones as mood sensors',
  txt:`${FR_EV.early} In 28 outpatients, voice features from everyday phone calls classified manic or mixed states with an AUC of 0.89 and depressive states with 0.78. <sup class="c" data-ref="FaurholtJepsen2016" title="Source 124">124</sup> A 2026 review of machine learning reported AUCs of 0.75–0.85 for predicting episodes 1–2 weeks ahead, and called for larger studies with external validation. <sup class="c" data-ref="Fang2026ML" title="Source 121">121</sup> Of 57 studies of passive digital markers, 60% had 50 participants or fewer. <sup class="c" data-ref="Kutcher2026" title="Source 285">285</sup> But in the MONARCA I trial (78 patients), daily smartphone self-monitoring with feedback did not reduce symptoms, <sup class="c" data-ref="FaurholtJepsen2015" title="Source 123">123</sup> and in the 12-month BipoSense study passive sensing did not reliably detect emerging episodes, with too many false alarms for clinical use. <sup class="c" data-ref="Ludwig2025" title="Source 304">304</sup>`,
  pt:`Phone apps can pick up patterns, but none has yet been shown to keep people well. In one study, people's own daily mood ratings did better than passive sensing. <sup class="c" data-ref="FaurholtJepsen2015,Ludwig2025" title="Source 123,304">123,304</sup>`},
 {k:'Programme 4 · fast-acting treatment',t:'Ketamine and esketamine',
  txt:`${FR_EV.early} In 18 people with treatment-resistant bipolar depression on lithium or valproate, a single ketamine infusion (published dose 0.5 mg/kg) improved depression within 40 minutes; 71% responded at some point vs 6% on placebo, and the benefit lasted through day 3. <sup class="c" data-ref="Diazgranados2010" title="Source 104">104</sup> A replication in 15 people found 79% vs 0%. <sup class="c" data-ref="Zarate2012" title="Source 532">532</sup> A network meta-analysis gave IV ketamine the largest response ratio of any add-on, RR 12.49 (95% CI 3.06–50.93), wide because the trials were few and small. <sup class="c" data-ref="Bahji2021" title="Source 21">21</sup> A 2026 umbrella review lists ketamine augmentation among effective treatments for adult bipolar depression. <sup class="c" data-ref="DePrisco2026" title="Source 102">102</sup> ${FR_EV.hyp} An inhaled esketamine trial (88 participants) finished in 2021 with no results posted. <sup class="c" data-ref="NCT03965871" title="Source 367">367</sup>`,
  pt:`Ketamine can lift depression within hours, but the effect fades within days, and longer-term and mood-switch safety in bipolar disorder still need larger trials. <sup class="c" data-ref="Diazgranados2010,Bahji2021" title="Source 21,104">21,104</sup>`,
  hook:`Ketamine in bipolar depression: 71% vs 6% response, onset in 40 minutes, lasting about 3 days (Diazgranados 2010). <sup class="c" data-ref="Diazgranados2010" title="Source 104">104</sup>`},
 {k:'Programme 5 · inflammation',t:'Anti-inflammatory add-ons',
  txt:`${FR_EV.early} A 2016 meta-analysis of 8 small trials (312 people; NSAIDs, omega-3, N-acetylcysteine, pioglitazone) found a moderate antidepressant effect, SMD −0.40, with no mood switches. <sup class="c" data-ref="Rosenblat2016" title="Source 432">432</sup> Larger trials then disappointed: in 266 adults, neither minocycline nor celecoxib beat placebo, <sup class="c" data-ref="Husain2020,NCT02703363" title="Source 233,364">233,364</sup> and in 250 people newly diagnosed, low-dose aspirin did not reduce mood instability. <sup class="c" data-ref="Bruun2026,NCT05035316" title="Source 61,368">61,368</sup> N-acetylcysteine helped depression in one 24-week trial but not in a maintenance trial. <sup class="c" data-ref="Berk2008NAC,Berk2012NAC" title="Source 41,43">41,43</sup> Status: not supported for routine use.`,
  pt:`Early small studies looked hopeful, but bigger trials did not confirm a benefit, so these are not routine treatments. <sup class="c" data-ref="Husain2020,Bruun2026" title="Source 61,233">61,233</sup>`,
  hook:`Minocycline and celecoxib (Husain 2020) and low-dose aspirin (A-Bipolar, Bruun 2026): negative trials. <sup class="c" data-ref="Husain2020,Bruun2026" title="Source 61,233">61,233</sup>`},
 {k:'Programme 6 · the body clock',t:'Chronotherapy and light',
  txt:`${FR_EV.early} In 60 inpatients with bipolar I depression, a week of repeated sleep deprivation plus light therapy (with antidepressants and lithium) brought response in 70% without and 44% with a history of drug resistance. <sup class="c" data-ref="Benedetti2005" title="Source 36">36</sup> In 141 inpatients, 70% responded within a week and 55% still responded at a month. <sup class="c" data-ref="Benedetti2014" title="Source 37">37</sup> Midday bright light gave 68.2% remission vs 22.2% with dim red light in 46 adults, <sup class="c" data-ref="Sit2018" title="Source 459">459</sup> and a meta-analysis of 7 trials found SMD 0.43. <sup class="c" data-ref="Lam2020Light" title="Source 289">289</sup> The 2025 ISBD task force judged bright light likely efficacious, with anti-manic cover. <sup class="c" data-ref="Geoffroy2025" title="Source 167">167</sup> In mania, blue-blocking glasses cut YMRS scores by 14.1 points vs 1.7 in 23 people. <sup class="c" data-ref="Henriksen2016" title="Source 221">221</sup> Shorter hospital stays across three decades come from one observational centre. <sup class="c" data-ref="Dallaspezia2026" title="Source 96">96</sup>`,
  hook:`Bright light for bipolar depression: 68.2% vs 22.2% remission (Sit 2018). <sup class="c" data-ref="Sit2018" title="Source 459">459</sup>`},
 {k:'Programme 7 · newer medicines',t:'Newer antipsychotics in maintenance',
  txt:`${FR_EV.est} For acute depression, lumateperone has reached the label: in a 6-week trial of 377 people it improved MADRS by 4.6 points more than placebo, <sup class="c" data-ref="Calabrese2021Lumateperone,NCT03249376" title="Source 68,365">68,365</sup> and its label lists bipolar I or II depression in adults. <sup class="c" data-ref="FDA-Caplyta" title="Source 127">127</sup> ${FR_EV.early} Maintenance is different. In a randomised-withdrawal trial of cariprazine in 901 people with bipolar I, time to relapse did not differ from placebo (HR 0.83 and 0.89; registry results). <sup class="c" data-ref="NCT03573297" title="Source 366">366</sup> Maintenance is not a labelled indication for cariprazine. <sup class="c" data-ref="FDA-Vraylar" title="Source 137">137</sup> ${FR_EV.hyp} A paediatric lumateperone trial for depression is recruiting, with primary completion estimated for 2031. <sup class="c" data-ref="NCT06372964" title="Source 369">369</sup>`,
  pt:`A medicine that treats an episode does not automatically prevent the next one; that needs its own long trial. <sup class="c" data-ref="NCT03573297,FDA-Vraylar" title="Source 137,366">137,366</sup>`,
  hook:`Cariprazine relapse-prevention trial (NCT03573297): negative for both doses. <sup class="c" data-ref="NCT03573297" title="Source 366">366</sup>`}
].map((s,i)=>Object.assign(s,{from:i/7,at:i/7+.115}));
const FR_TR=[
 {id:'NCT03249376',n:'Lumateperone for bipolar depression',tg:'depression',ev:'est',r:'pos',rt:'Positive',
  who:'377 adults with bipolar I or II depression, 6 weeks',
  f:`MADRS change −16.70 vs −12.12 on placebo: a difference of −4.6 (95% CI −6.34 to −2.83). Now on the label. <sup class="c" data-ref="NCT03249376,Calabrese2021Lumateperone,FDA-Caplyta" title="Source 68,127,365">68,127,365</sup>`},
 {id:'NCT03573297',n:'Cariprazine to prevent relapse',tg:'relapse',ev:'early',r:'neg',rt:'No difference',
  who:'901 enrolled with bipolar I; randomised withdrawal',
  f:`Time to first relapse: HR 0.83 (1.5 mg) and 0.89 (3.0 mg), both intervals crossing 1. Registry results; no journal paper found. <sup class="c" data-ref="NCT03573297" title="Source 366">366</sup>`},
 {id:'NCT03965871',n:'Inhaled esketamine',tg:'depression',ev:'hyp',r:'none',rt:'No results posted',
  who:'88 participants with treatment-resistant bipolar depression; phase 2',
  f:`Completed in 2021; no results posted and no publication found. <sup class="c" data-ref="NCT03965871" title="Source 367">367</sup>`},
 {id:'NCT02703363',n:'Minocycline and celecoxib',tg:'depression',ev:'early',r:'neg',rt:'No difference',
  who:'266 adults with bipolar depression, 12 weeks, Pakistan',
  f:`Neither beat placebo on HAMD-17: minocycline 1.48 (95% CI −0.41 to 3.36), celecoxib −0.74 (−2.61 to 1.14). <sup class="c" data-ref="Husain2020,NCT02703363" title="Source 233,364">233,364</sup>`},
 {id:'NCT05035316',n:'Low-dose aspirin (A-Bipolar)',tg:'relapse',ev:'early',r:'neg',rt:'No difference',
  who:'250 people newly diagnosed with bipolar disorder',
  f:`Aspirin did not reduce mood instability at 6 months or any secondary outcome. <sup class="c" data-ref="Bruun2026,NCT05035316" title="Source 61,368">61,368</sup>`},
 {id:'NCT06372964',n:'Lumateperone in children and teenagers',tg:'depression',ev:'hyp',r:'none',rt:'Recruiting',
  who:'Estimated 384 young people with bipolar I or II depression',
  f:`Primary outcome CDRS-R at week 6; primary completion estimated for 2031-10-31. <sup class="c" data-ref="NCT06372964" title="Source 369">369</sup>`},
 {id:'NCT01166425',n:'Lithium for mania in children and teenagers',tg:'mania',ev:'early',r:'pos',rt:'Positive',
  who:'Ages 7–17: lithium 53, placebo 28; 8 weeks',
  f:`YMRS fell 5.51 points more than with placebo (95% CI 0.51–10.50); no significant weight gain, but TSH rose. <sup class="c" data-ref="Findling2015,NCT01166425" title="Source 146,362">146,362</sup>`},
 {id:'NCT01928446',n:'Lithium after a suicide-related event',tg:'relapse',ev:'early',r:'neg',rt:'Stopped for futility',
  who:'519 veterans with depression or bipolar disorder',
  f:`No difference in repeat suicide-related events (HR 1.10, 0.77–1.55); mean lithium levels were low, about 0.5 mEq/L. <sup class="c" data-ref="Katz2022,NCT01928446" title="Source 251,363">251,363</sup>`}
];
const FR_TG={relapse:'Relapse prevention',depression:'Depression',mania:'Mania',prediction:'Prediction'};

inits.frontier=()=>{
  const svg=$('#frSvg'),rg=$('#frT');
  function chip(x,y,kind,anchor){const L={est:['Established','var(--good)','var(--good-soft)'],early:['Early evidence','var(--warn)','var(--warn-soft)'],hyp:['Hypothesis','var(--rx)','var(--rx-soft)']}[kind];
    const w=L[0].length*5.6+10,x0=anchor==='end'?x-w:anchor==='mid'?x-w/2:x;
    return `<rect x="${f1(x0)}" y="${f1(y-9)}" width="${f1(w)}" height="13" rx="3" style="fill:${L[2]}"/><text x="${f1(x0+5)}" y="${f1(y+1)}" style="font:600 8.5px var(--mono);fill:${L[1]};letter-spacing:.04em">${L[0].toUpperCase()}</text>`}
  const COL={go:'var(--brand)',mix:'var(--warn)',neg:'var(--bad)'};
  function draw(t){
    const N=vb(svg,'720 440','400 600'),ph=phaseOf(FR_STEPS,t),S=FR_STEPS[ph];
    const x0=N?40:268,x1=N?372:676,X=p=>lerp(x0,x1,p/4),top=N?26:40;
    const laneY=j=>N?top+40+j*72:top+42+j*50;
    let s='';
    /* stage bands and headers */
    for(let k=0;k<5;k++){const cx=X(k),bw=(x1-x0)/4;
      if(k%2===0)s+=`<rect x="${f1(cx-bw/2)}" y="${top+8}" width="${f1(bw)}" height="${f1(laneY(6)-top+(N?34:22))}" style="fill:var(--panel-2);opacity:.55"/>`;
      s+=`<text x="${f1(cx)}" y="${top}" class="t-sm t-mid" style="fill:var(--ink)">${(N?FR_STAGE_N:FR_STAGE)[k]}</text>`}
    FR_P.forEach((P,j)=>{
      const y=laneY(j),ty=N?y+26:y;
      const p=j<ph?1:j>ph?0:ease(ramp(t,S.from,S.from+.085)),pos=P.pos*p,cx=X(pos),focus=j===ph,arrived=p>.98;
      const op=j>ph?.45:1;
      if(focus)s+=`<rect x="${N?6:8}" y="${f1(N?y-16:y-19)}" width="${N?388:704}" height="${N?62:38}" rx="9" style="fill:var(--brand-soft);opacity:.55"/>`;
      s+=`<g style="opacity:${op}">`;
      /* label column */
      if(N){s+=`<text x="14" y="${y}" class="t-lbl">${j+1}. ${P.n}</text>`;
        if(arrived)s+=`<text x="14" y="${y+44}" class="t-xs">${P.s}</text>`}
      else{s+=`<text x="18" y="${y-2}" class="t-lbl">${j+1}. ${P.n}</text>`;
        if(arrived)s+=`<text x="18" y="${y+12}" class="t-xs">${P.s}</text>`}
      /* track */
      s+=`<line x1="${x0}" y1="${ty}" x2="${x1}" y2="${ty}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:2 4"/>`;
      for(let k=0;k<5;k++)s+=`<circle cx="${f1(X(k))}" cy="${ty}" r="2.5" style="fill:var(--line)"/>`;
      const col=arrived?COL[P.st]:'var(--brand)';
      s+=`<line x1="${x0}" y1="${ty}" x2="${f1(cx)}" y2="${ty}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/>`;
      if(P.ghost&&arrived){const gx=X(P.ghost.pos);
        s+=`<line x1="${f1(cx)}" y1="${ty}" x2="${f1(gx)}" y2="${ty}" style="stroke:var(--good);stroke-width:2;stroke-dasharray:4 3"/><circle cx="${f1(gx)}" cy="${ty}" r="6" style="fill:var(--good)"/>`;
        s+=`<text x="${f1(gx-(N?0:10))}" y="${N?ty-10:ty+16}" class="t-xs t-end" style="fill:var(--good)">${P.ghost.txt}</text>`}
      /* marker: a small programme card */
      if(arrived&&P.st==='neg'){s+=`<g transform="translate(${f1(cx)} ${ty})"><circle r="9" style="fill:var(--bad)"/><path d="M-4 -4L4 4M4 -4L-4 4" style="stroke:var(--panel);stroke-width:2.2;stroke-linecap:round"/></g>`}
      else s+=`<rect x="${f1(cx-9)}" y="${ty-9}" width="18" height="18" rx="5" style="fill:${col}"/><text x="${f1(cx)}" y="${ty+4}" class="t-mid" style="font:700 10px var(--mono);fill:var(--panel)">${j+1}</text>`;
      /* evidence chip */
      if(arrived){if(N)s+=chip(386,y,P.ev,'end');else s+=chip(cx+14,ty-12,P.ev,'')}
      s+=`</g>`});
    s+=`<text x="${N?14:18}" y="${N?laneY(6)+66:laneY(6)+44}" class="t-xs">${N?'✖ = stalled after negative larger trials':'✖ = stalled after negative larger trials · line colour: green moving, amber mixed, red stalled'}</text>`;
    if(N)s+=`<text x="14" y="${laneY(6)+80}" class="t-xs">line: green moving · amber mixed · red stalled</text>`;
    svg.innerHTML=s;setA(ph);$('#frNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#frPlay'),draw,21000,'Replay','frontier');
  const setA=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= trial filter ================= */
  let tg='all',ev='all';
  const lab={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
  function render(){
    const list=FR_TR.filter(T=>(tg==='all'||T.tg===tg)&&(ev==='all'||T.ev===ev));
    $('#frCount').textContent=`Showing ${list.length} of ${FR_TR.length} registered trials`;
    let h=list.map(T=>`<div class="card trial"><div class="row"><span class="ev ${T.ev}">${lab[T.ev]}</span><span class="res ${T.r}">${T.rt}</span></div><span class="tid">${T.id} · ${FR_TG[T.tg]}</span><h4>${T.n}</h4><dl><dt>Who</dt><dd>${T.who}</dd><dt>Found</dt><dd>${T.f}</dd></dl><a href="https://clinicaltrials.gov/study/${T.id}" target="_blank" rel="noopener">Registry record</a></div>`).join('');
    if(!list.length)h=tg==='prediction'
      ?`<div class="empty"><h4>No registered prediction trial in our sources</h4><p>None of the trials with a checked NCT number tests prediction. That work is still in cohorts and lab models: ConLiGen's lithium-response GWAS, phone-sensing studies such as BipoSense and stem-cell neurons. <sup class="c" data-ref="Hou2016Lithium,Ludwig2025,Mertens2015" title="Source 230,304,330">230,304,330</sup> See the pipeline above, programmes 2 and 3.</p></div>`
      :`<div class="empty"><h4>No trials match both filters</h4><p>Try another evidence level, or choose All.</p></div>`;
    $('#frTrials').innerHTML=h;
  }
  $$('[data-frt]').forEach(b=>b.addEventListener('click',()=>{tg=b.dataset.frt;$$('[data-frt]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}));
  $$('[data-fre]').forEach(b=>b.addEventListener('click',()=>{ev=b.dataset.fre;$$('[data-fre]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()}));
  render();
};
/* =============== 6.1 History & people =============== */
/* milestones: y (year, 100 = 1st century AD), yl (label), who, t (short title), k (kind), txt (cited note) */
const HI_EV=[
 {y:100,yl:'1st c. AD',who:'Aretaeus of Cappadocia',t:'Two states of one disease',k:'idea',
  txt:`The Greek physician Aretaeus of Cappadocia was perhaps the first to describe mania and melancholia as two states of one disease. <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>`},
 {y:1854,yl:'1854',who:'Falret · Baillarger',t:'Folie circulaire',k:'idea',
  txt:`Baillarger lectured on "la folie à double forme" on 31 January 1854; Falret replied that he had already described "folie circulaire" and lectured on it on 14 February. The printed record supports Falret's priority. <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup> Falret described the "regular alternation of mania and melancholia". <sup class="c" data-ref="Haustgen2006" title="Source 211">211</sup>`},
 {y:1893,yl:'1893',who:'Valentin Magnan',t:'Intermittent madness',k:'idea',
  txt:`Magnan's "intermittent madness" (1893) was a forerunner of Kraepelin's manic-depressive psychosis. <sup class="c" data-ref="Haustgen2006" title="Source 211">211</sup>`},
 {y:1899,yl:'1899',who:'Emil Kraepelin',t:'Manic-depressive insanity',k:'idea',
  txt:`Kraepelin brought all types of affective disorder together as "manic-depressive insanity", a unitary concept adopted worldwide, <sup class="c" data-ref="Angst2001" title="Source 9">9</sup> and set it apart from dementia praecox (later schizophrenia). <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>`},
 {y:1949,yl:'1949',who:'John Cade',t:'Lithium for mania',k:'rx',
  txt:`Cade published "Lithium salts in the treatment of psychotic excitement" in the Medical Journal of Australia, reintroducing lithium after its mid-19th-century use had been forgotten. <sup class="c" data-ref="Cade1949,Shorter2009" title="Source 63,456">63,456</sup>`},
 {y:1952,yl:'1952',who:'APA',t:'DSM-I',k:'dx',
  txt:`DSM-I classified "manic depressive reaction" as a psychotic disorder. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {y:1954,yl:'1954',who:'Mogens Schou and colleagues',t:'A controlled lithium trial',k:'rx',
  txt:`Schou and colleagues reported a randomly controlled trial of lithium salts in manic psychoses. <sup class="c" data-ref="Schou1954,Shorter2009" title="Source 446,456">446,456</sup>`},
 {y:1957,yl:'1957',who:'Karl Leonhard',t:'Bipolar vs monopolar',k:'idea',
  txt:`Leonhard's classification of the endogenous psychoses distinguished bipolar from unipolar ("monopolar") forms. <sup class="c" data-ref="Haustgen2006,Perris1992" title="Source 211,406">211,406</sup>`},
 {y:1966,yl:'1966',who:'Jules Angst · Carlo Perris',t:'Bipolar split from unipolar',k:'idea',
  txt:`Angst and Perris independently published family, clinical and course data separating bipolar from unipolar depression; Winokur's work supported the same split. <sup class="c" data-ref="Angst1966,Perris1966,Angst2001" title="Source 7,9,405">7,9,405</sup> Falret's illness "regained its autonomy only in 1966". <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>`},
 {y:1967,yl:'1967',who:'Baastrup · Schou',t:'Lithium to prevent episodes',k:'rx',
  txt:`Baastrup and Schou reported lithium as a preventive treatment against recurrent depression and manic-depressive psychosis, <sup class="c" data-ref="Baastrup1967" title="Source 19">19</sup> followed in 1970 by a double-blind discontinuation trial in the Lancet. <sup class="c" data-ref="Baastrup1970" title="Source 20">20</sup>`},
 {y:1968,yl:'1968',who:'APA',t:'DSM-II',k:'dx',
  txt:`DSM-II renamed the illness "manic-depressive illness" and placed it under the affective disorders. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {y:1970,yl:'1970',who:'United States',t:'Lithium reaches the US market',k:'rx',
  txt:`The United States became the 50th country to allow lithium onto the market. <sup class="c" data-ref="Shorter2009,Gajwani2006" title="Source 158,456">158,456</sup>`},
 {y:1973,yl:'1973',who:'US approval',t:'Chlorpromazine',k:'rx',
  txt:`Chlorpromazine, a typical antipsychotic, was approved for bipolar disorder in 1973. <sup class="c" data-ref="Gajwani2006" title="Source 158">158</sup>`},
 {y:1980,yl:'1980',who:'APA',t:'DSM-III: "bipolar disorder"',k:'dx',
  txt:`DSM-III introduced specific criteria and the term "bipolar disorder"; a manic episode alone became enough. "Bipolar II" appeared only as an example of atypical bipolar disorder. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {y:1994,yl:'1994',who:'APA · Bowden and colleagues',t:'DSM-IV, bipolar II, divalproex',k:'dx',
  txt:`DSM-IV introduced a stand-alone hypomanic episode, the building block of bipolar II, and a mixed episode. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup> In a 1994 trial in acute mania, 48% improved by at least half on divalproex, 49% on lithium and 25% on placebo; <sup class="c" data-ref="Bowden1994" title="Source 52">52</sup> a review dates divalproex's US approval for mania to 1994. <sup class="c" data-ref="Gajwani2006" title="Source 158">158</sup>`},
 {y:2000,yl:'2000–04',who:'US approvals',t:'Atypical antipsychotics',k:'rx',
  txt:`Olanzapine was approved for acute mania in 2000, followed by risperidone (2003), quetiapine, ziprasidone and aripiprazole (2004). <sup class="c" data-ref="Gajwani2006" title="Source 158">158</sup> In the pivotal olanzapine trial, 48.6% responded against 24.2% on placebo. <sup class="c" data-ref="Tohen1999" title="Source 485">485</sup>`},
 {y:2013,yl:'2013',who:'APA',t:'DSM-5',k:'dx',
  txt:`DSM-5 made increased activity or energy a required core symptom of mania and hypomania, and replaced the mixed episode with a "with mixed features" specifier. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {y:2019,yl:'2019',who:'PGC · WHO',t:'GWAS: 30 loci; ICD-11 approved',k:'gene',
  txt:`A genome-wide association study of 20,352 cases found 30 significant loci, 20 of them new. <sup class="c" data-ref="Stahl2019" title="Source 470">470</sup> The World Health Assembly approved ICD-11 in May 2019. <sup class="c" data-ref="Reed2019" title="Source 425">425</sup>`},
 {y:2021,yl:'2021',who:'Psychiatric Genomics Consortium',t:'GWAS: 64 loci',k:'gene',
  txt:`A GWAS of 41,917 cases and 371,549 controls found 64 loci, with risk genes enriched in synaptic signalling. <sup class="c" data-ref="Mullins2021" title="Source 355">355</sup>`},
 {y:2022,yl:'2022',who:'WHO · APA',t:'ICD-11 in use; DSM-5-TR',k:'dx',
  txt:`WHO member states began reporting with ICD-11 on 1 January 2022, <sup class="c" data-ref="Reed2019" title="Source 425">425</sup> and the APA published DSM-5-TR in March 2022. <sup class="c" data-ref="APA2022" title="Source 15">15</sup>`},
 {y:2025,yl:'2025',who:'Multi-ancestry consortium',t:'GWAS: 298 loci',k:'gene',
  txt:`A multi-ancestry GWAS of 158,036 cases and about 2.8 million controls found 298 loci, a fourfold increase. <sup class="c" data-ref="OConnell2025" title="Source 387">387</sup> See <a href="#genes" data-go="genes">Genes &amp; family risk</a>.`}
];
const HI_IX=y=>HI_EV.findIndex(e=>e.y===y)/(HI_EV.length-1);
const HI_STEPS=[
 {from:0,at:HI_IX(1854),k:'Antiquity to 1854',t:'Two states, one illness',
  txt:`An old idea gets a name. Aretaeus linked mania and melancholia in the 1st century AD, <sup class="c" data-ref="Angst2001" title="Source 9">9</sup> and in 1854 two Paris psychiatrists described the same illness within two weeks of each other: Baillarger's "folie à double forme" and Falret's "folie circulaire". <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup> Bipolar II outpatients today often show the "biphasic" pattern they described, one episode followed straight away by its opposite: 80% of 206 people in one study. <sup class="c" data-ref="Benazzi2006" title="Source 34">34</sup>`,
  pt:`Doctors have recognised for a very long time that highs and lows can belong to the same illness.`,
  hook:`1854: Falret's "folie circulaire" and Baillarger's "folie à double forme". <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>`},
 {from:HI_IX(1893)-.001,at:HI_IX(1899),k:'1893–1899',t:'Kraepelin\'s unity',
  txt:`Kraepelin's 1899 "manic-depressive insanity" grouped all affective disorders together, and he drew the great divide between it and dementia praecox, mainly by the deterioration seen in the latter. <sup class="c" data-ref="Angst2001,Pichot2004" title="Source 9,414">9,414</sup> His own case histories counted Schneiderian psychotic symptoms and catatonia as consistent with the diagnosis. <sup class="c" data-ref="Kendler2021" title="Source 257">257</sup>`,
  pt:`Kraepelin put all mood illnesses under one name and separated them from what we now call schizophrenia.`,
  hook:`Kraepelin 1899: "manic-depressive insanity", a unitary concept. <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>`},
 {from:HI_IX(1949)-.001,at:HI_IX(1954),k:'1949–1954',t:'Lithium arrives',
  txt:`In 1949 John Cade reported lithium salts for "psychotic excitement", and in 1954 Schou's group tested lithium in a randomly controlled trial. <sup class="c" data-ref="Cade1949,Schou1954,Shorter2009" title="Source 63,446,456">63,446,456</sup> Between them, DSM-I (1952) still called the illness a "manic depressive reaction", a psychotic disorder. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`,
  pt:`Lithium, first used for mania in 1949, is still one of the best-studied treatments.`,
  hook:`Cade 1949: lithium for mania. Schou 1954: a controlled trial. <sup class="c" data-ref="Cade1949,Schou1954" title="Source 63,446">63,446</sup>`},
 {from:HI_IX(1957)-.001,at:HI_IX(1966),k:'1957–1973',t:'Bipolar vs unipolar',
  txt:`Leonhard (1957) split bipolar from monopolar forms, and in 1966 Angst and Perris independently showed different heredity, clinical picture and course. <sup class="c" data-ref="Haustgen2006,Angst1966,Perris1966,Angst2001" title="Source 7,9,211,405">7,9,211,405</sup> Lithium moved from treating episodes to preventing them (Baastrup and Schou, 1967), and in 1970 the US became the 50th country to allow it. <sup class="c" data-ref="Baastrup1967,Shorter2009" title="Source 19,456">19,456</sup>`,
  pt:`Around 1966 researchers showed that illness with highs and lows behaves differently from depression alone, in families and over time.`,
  hook:`1966: Angst and Perris separate bipolar from unipolar depression. 1970: US lithium approval. <sup class="c" data-ref="Pichot2004,Shorter2009" title="Source 414,456">414,456</sup>`},
 {from:HI_IX(1980)-.001,at:HI_IX(1994),k:'1980–2013',t:'The criteria era',
  txt:`DSM-III (1980) brought the term "bipolar disorder" and explicit criteria; DSM-IV (1994) made hypomania a stand-alone episode, creating bipolar II as a diagnosis; DSM-5 (2013) required increased energy or activity. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup> New medicines followed: divalproex (1994) and the atypical antipsychotics from 2000. <sup class="c" data-ref="Bowden1994,Gajwani2006" title="Source 52,158">52,158</sup>`,
  pt:`The modern name "bipolar disorder" dates from 1980, and bipolar II became its own diagnosis in 1994.`,
  hook:`DSM-III 1980: "bipolar disorder". DSM-IV 1994: bipolar II. DSM-5 2013: energy/activity criterion. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {from:HI_IX(2019)-.001,at:HI_IX(2025),k:'2019–2025',t:'Genes and today',
  txt:`Genome-wide studies grew from 30 loci (2019) to 64 (2021) to 298 (2025). <sup class="c" data-ref="Stahl2019,Mullins2021,OConnell2025" title="Source 355,387,470">355,387,470</sup> ICD-11 came into use in 2022 and keeps the bipolar I / II split, in line with DSM-5; DSM-5-TR followed the same year. <sup class="c" data-ref="Reed2019,Angst2020ICD11,APA2022" title="Source 14,15,425">14,15,425</sup>`,
  pt:`Genes add to risk in small steps, through hundreds of common variants; no single gene causes bipolar disorder.`,
  hook:`GWAS loci: 30 (2019) → 64 (2021) → 298 (2025). <sup class="c" data-ref="Stahl2019,Mullins2021,OConnell2025" title="Source 355,387,470">355,387,470</sup>`}
];
/* names comparator: which forms each name grouped. bp = alternating mania & depression; uni = depression only; bp2 = hypomania & depression.
   st: 'in' (inside the umbrella), 'out' (named separately), 'faint' (not named), 'split' (its own diagnosis) */
const HI_NAMES=[
 {n:'Folie circulaire',yr:'1854 · Falret',um:'folie circulaire',bp:'in',uni:'faint',bp2:'faint',mix:0,
  txt:`Falret's "folie circulaire" named the "regular alternation of mania and melancholia". He hinted that brief hypomanias at the end of depressions might be mild forms of it, an early idea of the bipolar spectrum. <sup class="c" data-ref="Haustgen2006" title="Source 211">211</sup> Baillarger's "folie à double forme" described manic and depressive episodes in the same patient. <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>`},
 {n:'Manic-depressive insanity',yr:'1899 · Kraepelin',um:'manic-depressive insanity',bp:'in',uni:'in',bp2:'in',mix:1,
  txt:`Kraepelin brought all types of affective disorder together, recurrent depression included, <sup class="c" data-ref="Angst2001" title="Source 9">9</sup> and stressed mixed states and an emotional disposition seen between episodes and in relatives. <sup class="c" data-ref="Kendler2021" title="Source 257">257</sup> Falret's folie circulaire became one of its forms. <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>`},
 {n:'Manic depressive reaction',yr:'1952 · DSM-I',um:'manic depressive reaction (a psychotic disorder)',bp:'in',uni:'in',bp2:'faint',mix:0,
  txt:`DSM-I classified "manic depressive reaction" as a psychotic disorder. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {n:'Bipolar vs unipolar',yr:'1957–1966 · Leonhard, Angst, Perris',um:'bipolar',bp:'in',uni:'out',bp2:'faint',mix:0,
  txt:`Leonhard distinguished bipolar from monopolar forms in 1957, <sup class="c" data-ref="Haustgen2006,Perris1992" title="Source 211,406">211,406</sup> and Angst and Perris showed in 1966 that the two differ in heredity and course. <sup class="c" data-ref="Angst1966,Perris1966,Pichot2004" title="Source 7,405,414">7,405,414</sup>`},
 {n:'Manic-depressive illness',yr:'1968 · DSM-II',um:'manic-depressive illness (affective disorders)',bp:'in',uni:'in',bp2:'faint',mix:0,
  txt:`DSM-II renamed it "manic-depressive illness" and moved it under the affective disorders. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {n:'Bipolar disorder',yr:'1980 · DSM-III',um:'bipolar disorder',bp:'in',uni:'out',bp2:'faint',mix:0,
  txt:`DSM-III introduced the term "bipolar disorder" with specific criteria; a manic episode alone became enough. "Bipolar II" was mentioned only as an example of atypical bipolar disorder. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {n:'Bipolar I & II',yr:'1994 · DSM-IV',um:'bipolar disorders',bp:'in',uni:'out',bp2:'split',mix:1,
  txt:`DSM-IV's stand-alone hypomanic episode made bipolar II a diagnosis of its own, and it added a mixed episode. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>`},
 {n:'DSM-5 & ICD-11',yr:'2013–2022',um:'bipolar and related disorders',bp:'in',uni:'out',bp2:'split',mix:1,
  txt:`DSM-5 made increased energy or activity a core symptom and turned the mixed episode into a "with mixed features" specifier. <sup class="c" data-ref="Mason2016" title="Source 311">311</sup> ICD-11 keeps the type I / type II split based on mania versus hypomania. <sup class="c" data-ref="Angst2020ICD11" title="Source 14">14</sup>`}
];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),note=$('#hiNote'),read=$('#hiRead'),chips=$('#hiYears');
  const n=HI_EV.length;
  const KC={idea:'var(--brand)',rx:'var(--rx)',dx:'var(--dx)',gene:'var(--accent)'};
  const KN={idea:'ideas',rx:'treatment',dx:'manuals',gene:'genetics'};
  chips.innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hy="${i}" aria-pressed="false">${e.yl}</button>`).join('');
  chips.addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const t=+b.dataset.hy/(n-1);rg.value=t;draw(t)});
  /* wide axis: antiquity squeezed into a short stub, 1845–2028 linear */
  const XW=y=>y<1000?70:lerp(140,700,(y-1845)/(2028-1845));
  const setActive=stepWire($('#hiSteps'),HI_STEPS,rg,draw,()=>stop());
  let lastI=-1;
  function draw(t){const N=vb(svg,'720 320','400 640');const pos=t*(n-1),i=Math.min(n-1,Math.round(pos)),E=HI_EV[i];let s='';
    s+=`<defs>${marker('hiAr','var(--muted)')}</defs>`;
    if(!N){
      /* card */
      s+=`<rect x="20" y="18" width="680" height="128" rx="14" style="fill:var(--panel-2)"/>`;
      s+=`<text x="40" y="70" style="font:800 46px var(--display);fill:${KC[E.k]}">${E.yl}</text>`;
      s+=`<text x="${E.yl.length>6?290:200}" y="52" class="t-big" style="font-size:20px">${E.t}</text>`;
      s+=`<text x="${E.yl.length>6?290:200}" y="76" class="t-sm" style="fill:var(--ink)">${E.who}</text>`;
      s+=`<rect x="${E.yl.length>6?290:200}" y="92" width="${KN[E.k].length*7+16}" height="18" rx="5" style="fill:${KC[E.k]};opacity:.18"/><text x="${(E.yl.length>6?290:200)+8}" y="105" class="t-xs" style="fill:${KC[E.k]};font-weight:600">${KN[E.k]}</text>`;
      s+=`<text x="40" y="132" class="t-xs">milestone ${i+1} of ${n}</text>`;
      /* axis */
      const ay=240;
      s+=`<line x1="50" x2="96" y1="${ay}" y2="${ay}" class="axis"/><path d="M100 ${ay-8}l8 16M108 ${ay-8}l8 16" style="stroke:var(--muted);stroke-width:1.2"/><line x1="120" x2="706" y1="${ay}" y2="${ay}" class="axis"/>`;
      [1850,1900,1950,2000].forEach(y=>{const x=XW(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay}" y2="${ay+6}" class="axis"/><text x="${f1(x)}" y="${ay+20}" class="t-xs t-mid">${y}</text>`});
      s+=`<text x="70" y="${ay+20}" class="t-xs t-mid">AD 100</text>`;
      /* playhead year */
      const i0=Math.floor(pos),i1=Math.min(n-1,i0+1),fr=pos-i0,px=lerp(XW(HI_EV[i0].y),XW(HI_EV[i1].y),fr);
      s+=`<rect x="50" y="${ay-3}" width="${f1(px-50)}" height="6" rx="3" style="fill:var(--brand);opacity:.35"/>`;
      /* milestones: dots, with the current one labelled */
      HI_EV.forEach((e,k)=>{const x=XW(e.y),lit=k<=pos+.001,cur=k===i;
        s+=`<circle cx="${f1(x)}" cy="${ay}" r="${cur?7.5:4.5}" style="fill:${lit?KC[e.k]:'var(--panel)'};stroke:${KC[e.k]};stroke-width:1.5;opacity:${cur||lit?1:.7}"/>`});
      {const x=XW(E.y),anc=x<170?'start':x>600?'end':'middle',tx=x<170?x-8:x>600?x+8:x;
        s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay-10}" y2="${ay-44}" style="stroke:${KC[E.k]};stroke-width:1.2"/>`;
        s+=`<text x="${f1(tx)}" y="${ay-66}" style="font:800 15px var(--display);fill:${KC[E.k]};text-anchor:${anc}">${E.yl}</text>`;
        s+=`<text x="${f1(tx)}" y="${ay-50}" class="t-xs" style="fill:var(--ink);text-anchor:${anc}">${E.t}</text>`}
      s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${ay-30}" y2="${ay+14}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3"/>`;
      /* legend */
      Object.keys(KC).forEach((k,j)=>{const x=40+j*120;s+=`<circle cx="${x}" cy="300" r="5" style="fill:${KC[k]}"/><text x="${x+10}" y="304" class="t-xs">${KN[k]}</text>`});
    }else{
      /* card on top, vertical list below with a moving play head */
      s+=`<rect x="10" y="10" width="380" height="118" rx="12" style="fill:var(--panel-2)"/>`;
      s+=`<text x="24" y="54" style="font:800 34px var(--display);fill:${KC[E.k]}">${E.yl}</text>`;
      s+=`<text x="24" y="82" class="t-big">${E.t}</text>`;
      s+=`<text x="24" y="104" class="t-sm" style="fill:var(--ink)">${E.who}</text>`;
      s+=`<text x="376" y="30" class="t-xs t-end">${i+1} / ${n}</text>`;
      const y0=156,dy=22.6,ax=58;
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${y0+dy*(n-1)}" class="axis"/>`;
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${f1(y0+dy*pos)}" style="stroke:var(--brand);stroke-width:5;opacity:.35;stroke-linecap:round"/>`;
      HI_EV.forEach((e,k)=>{const y=y0+k*dy,lit=k<=pos+.001,cur=k===i;
        s+=`<circle cx="${ax}" cy="${f1(y)}" r="${cur?6.5:4}" style="fill:${lit?KC[e.k]:'var(--panel)'};stroke:${KC[e.k]};stroke-width:1.4"/>`;
        s+=`<text x="${ax-12}" y="${f1(y+3.5)}" class="t-xs t-end" style="fill:${lit?'var(--ink)':'var(--muted)'};${cur?'font-weight:700':''}">${e.yl==='1st c. AD'?'AD 100':e.yl.replace('2000–04','2000')}</text>`;
        s+=`<text x="${ax+14}" y="${f1(y+4)}" class="${cur?'t-lbl':'t-xs'}" style="${cur?'font-size:12.5px':''};fill:${lit?(cur?'var(--ink)':'var(--ink)'):'var(--muted)'};opacity:${lit?1:.6}">${e.t}</text>`});
      s+=`<path d="M${ax-20} ${f1(y0+dy*pos)}h10" style="stroke:var(--ink);stroke-width:1.4"/>`;
    }
    svg.innerHTML=s;
    const ph=phaseOf(HI_STEPS,t);setActive(ph);note.innerHTML=noteHTML(HI_STEPS[ph]);
    if(i!==lastI){lastI=i;read.innerHTML=`<b class="yr">${E.yl} · ${E.who}</b><span>${E.txt}</span>`;
      $$('[data-hy]',chips).forEach((b,k)=>b.setAttribute('aria-pressed',k===i))}}
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'Replay','history');
  draw(+rg.value);

  /* ---- how the name changed ---- */
  const nsvg=$('#hiNameSvg'),nnote=$('#hiNameNote'),nb=$('#hiNames');let sel=1,from=null,cur=null,stopN=null;
  nb.innerHTML=HI_NAMES.map((h,i)=>`<button class="btn" data-nm="${i}" aria-pressed="${i===sel}">${h.n}</button>`).join('');
  /* a layout for each state: circle centres/radii in a 720x300 (wide) or 400x420 (narrow) frame */
  function lay(h,N){const W=N?400:720,C=(x,y,r,op=1)=>({x:W*x,y,r,op});let P;
    const g=h.uni==='in',sp=h.bp2==='split';
    if(!N){
      if(g)P={bp:C(.33,118,62),uni:C(.6,118,58),bp2:C(.465,226,44,h.bp2==='faint'?.25:1)};
      else if(sp)P={bp:C(.24,150,62),bp2:C(.46,160,52),uni:C(.8,150,58)};
      else P={bp:C(.32,140,62),bp2:C(.54,214,44,.22),uni:C(.8,140,58,h.uni==='faint'?.25:1)};
    }else{
      if(g)P={bp:C(.3,110,56),uni:C(.72,110,52),bp2:C(.5,214,42,h.bp2==='faint'?.25:1)};
      else if(sp)P={bp:C(.3,120,56),bp2:C(.68,128,46),uni:C(.5,316,52)};
      else P={bp:C(.36,120,56),bp2:C(.72,190,42,.22),uni:C(.5,316,52,h.uni==='faint'?.25:1)};
    }
    return P}
  const HI_LBL={bp:['mania +','depression'],uni:['depression','only'],bp2:['hypomania +','depression']};
  function circ(c,col,k,sub){const L=HI_LBL[k];return `<g style="opacity:${f1(c.op)}"><circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r)}" style="fill:${col};fill-opacity:.18;stroke:${col};stroke-width:1.6"/><text x="${f1(c.x)}" y="${f1(c.y-8)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${L[0]}</text><text x="${f1(c.x)}" y="${f1(c.y+4)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${L[1]}</text><text x="${f1(c.x)}" y="${f1(c.y+18)}" class="t-xs t-mid">${sub}</text></g>`}
  function drawName(P,h,N){const W=N?400:720;let s='';
    const inn=['bp','uni','bp2'].filter(k=>h[k]==='in'||(k==='bp2'&&h.bp2==='split'));
    /* umbrella around grouped forms */
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;inn.forEach(k=>{const c=P[k];x0=Math.min(x0,c.x-c.r);x1=Math.max(x1,c.x+c.r);y0=Math.min(y0,c.y-c.r);y1=Math.max(y1,c.y+c.r)});
    const pad=16;s+=`<rect x="${f1(x0-pad)}" y="${f1(y0-pad-6)}" width="${f1(x1-x0+2*pad)}" height="${f1(y1-y0+2*pad+6)}" rx="26" style="fill:none;stroke:var(--brand);stroke-width:2;stroke-dasharray:7 5"/>`;
    s+=`<text x="${f1(x0-pad+12)}" y="${f1(y0-pad-12)}" class="t-sm" style="fill:var(--brand);font-weight:600">${h.um}</text>`;
    s+=circ(P.bp,'var(--up-fill)','bp',h.bp2==='split'?'bipolar I':'alternating');
    s+=circ(P.uni,'var(--down-fill)','uni',h.uni==='out'?'unipolar, apart':h.uni==='faint'?'not included':'recurrent');
    s+=circ(P.bp2,'var(--mixed-fill)','bp2',h.bp2==='split'?'bipolar II':'not yet named');
    if(h.mix)s+=`<text x="${f1(P.bp.x)}" y="${f1(P.bp.y-P.bp.r-6)}" class="t-xs t-mid" style="fill:var(--mixed);font-weight:600">${h.yr.includes('2013')?'+ mixed features specifier':h.yr.includes('1994')?'+ mixed episode':'+ mixed states'}</text>`;
    s+=`<text x="${N?20:W-20}" y="${N?408:290}" class="t-sm ${N?'':'t-end'}" style="fill:var(--ink)">${h.yr}</text>`;
    nsvg.innerHTML=s}
  function mix(A,B,p){const o={};for(const k in B)o[k]={x:lerp(A[k].x,B[k].x,p),y:lerp(A[k].y,B[k].y,p),r:lerp(A[k].r,B[k].r,p),op:lerp(A[k].op,B[k].op,p)};return o}
  function showName(i,anim){const N=vb(nsvg,'720 300','400 420'),h=HI_NAMES[i],to=lay(h,N);
    if(stopN)stopN();
    if(anim&&cur&&cur.N===N){const A=cur.P;stopN=animate(520,p=>{const P=mix(A,to,ease(p));cur={P,N};drawName(P,h,N)})}
    else{cur={P:to,N};drawName(to,h,N)}
    nnote.innerHTML=`<div class="kicker">${h.yr}</div><h4>${h.n}</h4><p>${h.txt}</p>`}
  nb.addEventListener('click',e=>{const b=e.target.closest('[data-nm]');if(!b)return;sel=+b.dataset.nm;$$('[data-nm]',nb).forEach((x,k)=>x.setAttribute('aria-pressed',k===sel));showName(sel,true)});
  showName(sel,false);
  const prevR=redraws.history;redraws.history=()=>{prevR&&prevR();showName(sel,false)};
};
/* =============== 6.2 flashcards & mnemonics =============== */
const RV_PARTN={1:"Part 1 · Understanding bipolar disorder",2:"Part 2 · Diagnosis",3:"Part 3 · Medicines",4:"Part 4 · Therapy, safety & pregnancy",5:"Part 5 · Course & living",6:"Part 6 · History"};
const RV_FC=[
 /* ---- Part 1: understanding bipolar disorder ---- */
 [1,`How common are bipolar I and bipolar II in the WHO World Mental Health surveys?`,`Lifetime prevalence 0.6% for bipolar I and 0.4% for bipolar II; 1.4% for subthreshold bipolar disorder and 2.4% for the whole spectrum (61,392 adults, 11 countries) <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>.`],
 [1,`What lifetime prevalence did the US NCS-R find?`,`Bipolar I 1.0%, bipolar II 1.1% and subthreshold bipolar disorder 2.4% (9,282 adults) <sup class="c" data-ref="Merikangas2007" title="Source 328">328</sup>.`],
 [1,`When does bipolar disorder usually begin?`,`Usually between ages 15 and 25, and depression is the most frequent first presentation <sup class="c" data-ref="Nierenberg2023" title="Source 378">378</sup>. Mean onset in the WMH surveys was 18.4 years for bipolar I and 20.0 for bipolar II <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>.`],
 [1,`Is bipolar disorder more common in women or men?`,`About equal overall. Bipolar II, rapid cycling and mixed episodes are more common in women <sup class="c" data-ref="Diflorio2010" title="Source 106">106</sup>.`],
 [1,`In bipolar I, how much of the time is spent with symptoms, and of which kind?`,`Symptoms in 47.3% of weeks over 12.8 years: depressive 31.9%, manic or hypomanic 8.9%, cycling or mixed 5.9% <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>.`],
 [1,`And in bipolar II?`,`Symptoms in 53.9% of weeks: depressive 50.3%, hypomanic only 1.3% <sup class="c" data-ref="Judd2003" title="Source 247">247</sup>. The lows dominate the long-term course <sup class="c" data-ref="McIntyre2020Lancet" title="Source 320">320</sup>.`],
 [1,`Is mania always a happy, euphoric state?`,`No. Among 316 inpatients, motor activation, racing thoughts, pressured speech and less sleep were most frequent, and irritability and dysphoria were prominent: mania is "not a purely euphoric state" <sup class="c" data-ref="Cassidy1998" title="Source 70">70</sup>.`],
 [1,`How common are psychotic symptoms over a lifetime?`,`About 63% in bipolar I and 22% in bipolar II (54 studies, N = 23,461) <sup class="c" data-ref="Aminoff2022" title="Source 6">6</sup>.`],
 [1,`How often do mood episodes carry DSM-5 mixed features?`,`Pooled 11.6% of major depressive episodes and 26.8% of manic or hypomanic episodes <sup class="c" data-ref="Na2021" title="Source 361">361</sup>.`],
 [1,`How much shorter is life expectancy, on average?`,`Pooled life expectancy 66.88 years, about 12.89 years of potential life lost <sup class="c" data-ref="Chan2022" title="Source 72">72</sup>, mostly from natural causes such as heart disease <sup class="c" data-ref="Kessing2015,Biazus2023" title="Source 46,267">46,267</sup>. These are population statistics.`],
 [1,`What are the all-cause and suicide SMRs?`,`All-cause SMR 2.05; suicide SMR 14.44 <sup class="c" data-ref="Hayes2015" title="Source 213">213</sup>. Population figures, not personal predictions; treatment lowers risk <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup>.`],
 [1,`What heritability do twin studies report?`,`About 60–85%: 85% in UK twins, 93% in Finnish twins and 60% in a large Swedish twin register <sup class="c" data-ref="McGuffin2003,Kieseppa2004,Johansson2019" title="Source 241,278,318">241,278,318</sup>.`],
 [1,`If one identical twin has bipolar I, does the other always develop it?`,`No. Finnish MZ concordance was 0.43 (DZ 0.06), so genes raise risk but do not decide it <sup class="c" data-ref="Kieseppa2004" title="Source 278">278</sup>.`],
 [1,`What is a child's risk of bipolar disorder by age 52 by number of affected parents?`,`Danish register: 0.48% with neither parent, 4.4% with one and 24.9% with both <sup class="c" data-ref="Gottesman2010" title="Source 189">189</sup>. Most children of an affected parent never develop it.`],
 [1,`How many risk loci have GWAS found?`,`30 in 2019, 64 in 2021 (41,917 cases) and 298 in 2025 (158,036 multi-ancestry cases) <sup class="c" data-ref="Stahl2019,Mullins2021,OConnell2025" title="Source 355,387,470">355,387,470</sup>.`],
 [1,`Can a polygenic risk score diagnose bipolar disorder?`,`No. It explains about 4.6% of liability (AUC about 0.65–0.70), "insufficient for diagnostic prediction" <sup class="c" data-ref="Mullins2021,OConnell2025" title="Source 355,387">355,387</sup>.`],
 [1,`Which disorder shares the most genetics with bipolar disorder?`,`Schizophrenia: SNP genetic correlation about 0.68–0.70 <sup class="c" data-ref="PGCCDG2013NatGenet,PGCCDG2019" title="Source 411,412">411,412</sup>. Bipolar II correlates more with major depression <sup class="c" data-ref="Stahl2019" title="Source 470">470</sup>.`],
 [1,`What is the "final common pathway" idea about sleep?`,`Many triggers may set off mania by causing sleep loss, and mania cuts sleep further, a self-reinforcing loop (Hypothesis with experimental support) <sup class="c" data-ref="Wehr1987" title="Source 516">516</sup>.`],
 [1,`What is the most robust early warning sign of mania?`,`Sleep disturbance, in a median 77% of prodromes; at least 80% of people can name an early warning sign <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>.`],
 [1,`What does ENIGMA show in the bipolar brain, and can a scan diagnose it?`,`Thinner frontal, temporal and parietal cortex (largest d about −0.29) and a smaller hippocampus. Effects are small and overlap with healthy people, so a scan cannot diagnose <sup class="c" data-ref="Hibar2018,Hibar2016" title="Source 222,223">222,223</sup>.`],
 /* ---- Part 2: diagnosis ---- */
 [2,`What is Criterion A for a manic episode in DSM-5-TR?`,`Abnormally and persistently elevated, expansive or irritable mood AND increased activity or energy, for at least 1 week most of the day, nearly every day, or any duration if hospitalisation is needed <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`How many Criterion B symptoms are needed?`,`At least 3 of 7, or 4 if the mood is only irritable <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`What turns an episode into mania rather than hypomania?`,`Marked impairment in functioning, hospitalisation to prevent harm, or psychotic features <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`What are the rules for a hypomanic episode?`,`At least 4 consecutive days, an unequivocal change observable by others, no marked impairment and no hospitalisation. Psychotic features make it mania by definition <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`What defines a major depressive episode?`,`5 or more of 9 symptoms over the same 2 weeks, including depressed mood or loss of interest or pleasure <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Bipolar I versus bipolar II?`,`Bipolar I needs at least one manic episode. Bipolar II needs at least one hypomanic and one major depressive episode, and never mania <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>.`],
 [2,`What is cyclothymic disorder?`,`At least 2 years (1 in youth) of numerous subthreshold hypomanic and depressive periods, never meeting full episode criteria <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Is bipolar II a "milder" form?`,`CANMAT calls that view "long-standing but discredited": disability is comparable, the economic burden can be greater and suicide-attempt rates are similar <sup class="c" data-ref="Yatham2018,Novick2010" title="Source 382,525">382,525</sup>.`],
 [2,`Does mania that starts on an antidepressant count?`,`Yes, if it persists at a full syndromal level beyond the drug's physiological effect: it counts towards bipolar I <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`What is the rapid cycling specifier?`,`At least 4 mood episodes in 12 months, separated by at least 2 months of remission or a switch to the opposite pole <sup class="c" data-ref="Strawbridge2022,APA2022" title="Source 15,478">15,478</sup>.`],
 [2,`How do DSM-5 and ICD-11 handle mixed states?`,`DSM-5 replaced the mixed episode with a "with mixed features" specifier; ICD-11 keeps a mixed episode of at least 2 weeks <sup class="c" data-ref="Yatham2018,Stein2020BMC" title="Source 475,525">475,525</sup>.`],
 [2,`What are the ICD-11 bipolar codes?`,`6A60 bipolar type I, 6A61 bipolar type II, 6A62 cyclothymic disorder. One manic or mixed episode is enough for type I <sup class="c" data-ref="Harter2025,Stein2020BMC" title="Source 206,475">206,475</sup>.`],
 [2,`What counts as a positive MDQ screen?`,`7 or more of 13 items, plus several in the same period, plus a moderate or serious problem <sup class="c" data-ref="Hirschfeld2000MDQ,Palmer2021" title="Source 225,394">225,394</sup>.`],
 [2,`Why does the MDQ perform so differently in clinics and in the community?`,`Sensitivity 0.73 and specificity 0.90 in mood clinics, but sensitivity 0.28 and specificity 0.97 in the general population <sup class="c" data-ref="Hirschfeld2000MDQ,Hirschfeld2003AJP" title="Source 225,227">225,227</sup>. A screen only says "look closer".`],
 [2,`What does NICE say about bipolar questionnaires in primary care?`,`"Do not use questionnaires in primary care to identify bipolar disorder in adults." Ask depressed adults about past overactivity lasting 4 days or more <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [2,`What is the most common misdiagnosis, and how long does diagnosis take?`,`Unipolar depression; 69% of surveyed patients had been misdiagnosed <sup class="c" data-ref="Hirschfeld2003" title="Source 226">226</sup>. Median delay to diagnosis 6.7 years <sup class="c" data-ref="Scott2022Delay" title="Source 450">450</sup>.`],
 [2,`Which features predict that depression will later turn out to be bipolar?`,`Family history of bipolar disorder (OR 2.89), psychotic symptoms (OR 4.76) and earlier onset <sup class="c" data-ref="Ratheesh2017" title="Source 424">424</sup>.`],
 [2,`How do mood shifts differ in BPD and bipolar disorder?`,`In borderline personality disorder they are transient and reactive to interpersonal stress; in bipolar disorder they are sustained episodes with well intervals <sup class="c" data-ref="Paris2015,Yatham2018" title="Source 398,525">398,525</sup>.`],
 [2,`When should secondary (medical) mania be suspected?`,`A first manic episode after age 40, neurological deficits or a history atypical for bipolar disorder <sup class="c" data-ref="Satzer2016" title="Source 439">439</sup>. Glucocorticoids raise mania risk (HR 4.35) <sup class="c" data-ref="Fardet2012" title="Source 122">122</sup>.`],
 /* ---- Part 3: medicines ---- */
 [3,`What is lithium's US label indication?`,`Monotherapy for bipolar I disorder: acute manic and mixed episodes and maintenance, in patients 7 years and older <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`Where does NICE place lithium?`,`"Offer lithium as a first-line, long-term pharmacological treatment for bipolar disorder" <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>. CANMAT calls it "the gold standard for maintenance treatment" <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`],
 [3,`How well does lithium prevent relapse versus placebo?`,`RR 0.66 for any mood episode and 0.52 for mania; the effect on depression is smaller <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup>.`],
 [3,`What did Cipriani 2013 find for suicide?`,`Lithium reduced suicides versus placebo (OR 0.13) and deaths from any cause (OR 0.38) <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup>.`],
 [3,`What did the BALANCE trial show?`,`Lithium alone or with valproate prevented relapse better than valproate alone (combination vs valproate HR 0.59) <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup>.`],
 [3,`How does lithium work?`,`The label says the specific mechanism "is unknown" <sup class="c" data-ref="FDA-Lithobid" title="Source 133">133</sup>. It inhibits inositol monophosphatase (50% at 0.8 mM) and GSK-3β (Ki about 2 mM) <sup class="c" data-ref="Hallcher1980,Klein1996" title="Source 203,282">203,282</sup>.`],
 [3,`How is lithium handled by the body?`,`Not metabolised; excreted by the kidney, with about 80% of filtered lithium reabsorbed in the proximal tubule. Half-life 18–36 hours <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`When is a lithium level drawn?`,`As a trough, immediately before the next dose, about 12 hours after the previous one <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`Which ranges are published for lithium?`,`NICE: 0.6–0.8 mmol/L for a first prescription <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>. US labels: toxic at ≥1.5 mEq/L, close to the therapeutic range <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>. Quoted as published, not instructions.`],
 [3,`What are the label's grades of lithium neurotoxicity?`,`Mild: fine tremor, light-headedness, poor coordination. Moderate: drowsiness, ataxia, blurred vision, slurred speech. Severe: clonus, confusion, seizure, coma <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>. Suspected toxicity is an emergency.`],
 [3,`Which medicines raise lithium levels?`,`Thiazides (often 25–40%) <sup class="c" data-ref="Finley1995" title="Source 147">147</sup>, ACE inhibitors (36% in one series) <sup class="c" data-ref="Finley1996" title="Source 148">148</sup> and NSAIDs <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`Which poisoning pattern causes most severe neurotoxicity?`,`Chronic poisoning during regular use, not acute overdose (OR 136) <sup class="c" data-ref="Oakley2001" title="Source 385">385</sup>.`],
 [3,`Does activated charcoal help in lithium toxicity?`,`No, it does not bind lithium. The label calls haemodialysis "the treatment of choice" for severe toxicity <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`Which glands does long-term lithium affect?`,`Thyroid (hypothyroidism OR 5.78) and parathyroid (calcium up 0.09 mmol/L), so calcium and thyroid tests are part of monitoring <sup class="c" data-ref="McKnight2012" title="Source 321">321</sup>.`],
 [3,`What happens after lithium is stopped?`,`More than 50% of new episodes came within 10 weeks <sup class="c" data-ref="Suppes1991" title="Source 479">479</sup>. NICE advises a gradual reduction over at least 4 weeks <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>.`],
 [3,`What does lamotrigine treat?`,`Maintenance, mainly against depressive relapse; "treatment of acute manic or mixed episodes is not recommended" <sup class="c" data-ref="FDA-Lamictal,Calabrese2003Lamotrigine" title="Source 64,130">64,130</sup>.`],
 [3,`Why is lamotrigine started slowly?`,`Serious rash (adults 0.08–0.3%), nearly always within 2–8 weeks; valproate raises the risk and halves the label's titration <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>.`],
 [3,`What are valproate's boxed warnings?`,`Hepatotoxicity, fetal risk and pancreatitis <sup class="c" data-ref="FDA-Depakote" title="Source 128">128</sup>. Major malformations about 10% (EURAP 10.3%) <sup class="c" data-ref="Tomson2018" title="Source 489">489</sup>.`],
 [3,`Which antipsychotic-type treatments are FDA-approved for bipolar depression?`,`Quetiapine, lurasidone, cariprazine, lumateperone and olanzapine–fluoxetine <sup class="c" data-ref="FDA-Seroquel,FDA-Latuda,FDA-Vraylar,FDA-Caplyta,FDA-OlanzapineFluoxetine" title="Source 127,131,134,136,137">127,131,134,136,137</sup>.`],
 [3,`Did adding an antidepressant help in STEP-BD?`,`No: durable recovery 23.5% with an added antidepressant vs 27.3% with placebo, and similar switch rates <sup class="c" data-ref="Sachs2007STEPBD" title="Source 435">435</sup>.`],
 /* ---- Part 4: therapy, safety & pregnancy ---- */
 [4,`What psychological care does NICE recommend for relapse prevention?`,`A structured intervention (individual, group or family) designed for bipolar disorder with a published evidence-based manual, alongside medicines <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [4,`What did Barcelona group psychoeducation achieve at 5 years?`,`Mean recurrences 3.86 vs 8.37, and 154 vs 586 days acutely ill <sup class="c" data-ref="Colom2009" title="Source 90">90</sup>.`],
 [4,`How did family-focused therapy do over 2 years?`,`Relapse 35% vs 54% with crisis management (HR 0.38), and better medication adherence <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>.`],
 [4,`What does IPSRT add to interpersonal therapy?`,`A social-rhythm component: regular daily routines. Acute-phase IPSRT lengthened time without a new episode <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>.`],
 [4,`What did the STEP-BD psychosocial trial find?`,`Intensive therapy (FFT, IPSRT or CBT) gave 64.4% year-end recovery vs 51.5% with 3-session collaborative care <sup class="c" data-ref="Miklowitz2007" title="Source 334">334</sup>.`],
 [4,`When is suicide-attempt risk highest in bipolar disorder?`,`During mixed states (37-fold) and major depressive phases (18-fold) versus other phases <sup class="c" data-ref="Valtonen2008" title="Source 497">497</sup>. Help in these phases matters most.`],
 [4,`How well does safety planning work?`,`Safety-planning-type interventions cut suicidal behaviour (RR 0.57, NNT 16) <sup class="c" data-ref="Nuij2021" title="Source 383">383</sup>.`],
 [4,`When is the highest-risk time after psychiatric discharge?`,`The first 3 months (1,132 per 100,000 person-years), so follow-up is arranged before the person leaves <sup class="c" data-ref="Chung2017JAMAPsych,Mann2021Suicide" title="Source 81,309">81,309</sup>.`],
 [4,`Can risk scores predict who will die by suicide?`,`Not well: sensitivity 56% and specificity 79%, so care is offered to everyone rather than by risk category <sup class="c" data-ref="Large2016,Turecki2016Lancet" title="Source 290,495">290,495</sup>.`],
 [4,`What is the postpartum relapse risk in bipolar disorder?`,`66% in women medication-free in pregnancy vs 23% with preventive medication <sup class="c" data-ref="Wesseloo2016" title="Source 519">519</sup>. Population figures for planning with the care team.`],
 [4,`How common is postpartum psychosis, and when does risk peak?`,`About 0.89–2.6 per 1,000 women <sup class="c" data-ref="VanderKruik2017" title="Source 501">501</sup>; admission risk for first-time mothers peaks 10–19 days after birth <sup class="c" data-ref="MunkOlsen2006" title="Source 358">358</sup>. It is an emergency.`],
 [4,`What is the cardiac risk of first-trimester lithium?`,`2.41% vs 1.15% (aRR 1.65); RVOT defects including Ebstein's anomaly 0.60% vs 0.18%, smaller than once thought <sup class="c" data-ref="Patorno2017" title="Source 399">399</sup>.`],
 /* ---- Part 5: course & living ---- */
 [5,`How often does bipolar disorder recur after recovery in STEP-BD?`,`48.5% within 2 years, with depressive recurrences more than twice as common as manic ones <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup>.`],
 [5,`Syndromal versus functional recovery after a first manic admission?`,`98% recovered syndromally by 2 years, but only 43% regained their previous work and living status <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>.`],
 [5,`How common are anxiety disorders in bipolar disorder?`,`Lifetime 45% <sup class="c" data-ref="Pavlova2015" title="Source 400">400</sup>, with 34.7% meeting criteria even during euthymia <sup class="c" data-ref="Pavlova2017" title="Source 401">401</sup>.`],
 [5,`Which substance use disorder is most common in clinical samples?`,`Alcohol use disorder, 42%; cannabis 20% <sup class="c" data-ref="Hunt2016Clinical" title="Source 231">231</sup>.`],
 [5,`How common is metabolic syndrome?`,`37.3%, about twice the general-population odds, and higher with antipsychotics (45.3%) <sup class="c" data-ref="Vancampfort2013" title="Source 499">499</sup>.`],
 [5,`What is expressed emotion, and why does it matter?`,`Critical, hostile or over-involved family attitudes; high EE predicts relapse <sup class="c" data-ref="Miklowitz1988EE,Butzlaff1998" title="Source 62,332">62,332</sup>.`],
 [5,`How heavy is caregiver burden?`,`In STEP-BD, 89% of caregivers reported moderate or higher burden from problem behaviours <sup class="c" data-ref="Perlick2007" title="Source 402">402</sup>. NICE asks services to offer carers education and support <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [5,`What does NICE say about the environment in acute mania?`,`Access to calming environments and reduced stimulation, and no important decisions until recovery <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [5,`What are the NICE NG10 observation levels?`,`Low-level intermittent (every 30–60 minutes), high-level intermittent (every 15–30 minutes), continuous, and multiprofessional continuous <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>.`],
 [5,`How does NICE monitor antipsychotic metabolic effects?`,`Weight or BMI weekly for 6 weeks, then at 12 weeks; glucose or HbA1c and lipids at 12 weeks <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [5,`What did a bright light trial in bipolar depression show?`,`Remission 68.2% with 7,000-lux midday light vs 22.2% with dim red light, with no polarity switches (n = 46) <sup class="c" data-ref="Sit2018" title="Source 459">459</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`Who first described mania and melancholia as two states of one disease?`,`Perhaps Aretaeus of Cappadocia, 1st century AD <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>.`],
 [6,`What happened in Paris in 1854?`,`Baillarger presented "folie à double forme" and Falret "folie circulaire"; the printed record supports Falret's priority <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`],
 [6,`What did Kraepelin do in 1899?`,`Brought the affective disorders together as "manic-depressive insanity" <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>, separating it from dementia praecox <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`],
 [6,`Who separated bipolar from unipolar illness in 1966?`,`Jules Angst and Carlo Perris, independently <sup class="c" data-ref="Angst1966,Perris1966,Pichot2004" title="Source 7,405,414">7,405,414</sup>.`],
 [6,`Who reintroduced lithium, and when did it reach the US?`,`John Cade in 1949 <sup class="c" data-ref="Cade1949" title="Source 63">63</sup>; Schou's controlled trial followed in 1954, and the US became the 50th country to allow lithium in 1970 <sup class="c" data-ref="Schou1954,Shorter2009" title="Source 446,456">446,456</sup>.`],
 [6,`When did "bipolar disorder" enter the DSM?`,`DSM-III in 1980; DSM-IV (1994) added the stand-alone hypomanic episode and DSM-5 (2013) made increased energy a core criterion <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>.`]
];
const RV_MN=[
 ["DIGFAST","memory aid",`The 7 manic Criterion B symptoms: <b>D</b>istractibility, <b>I</b>nsomnia (decreased need for sleep), <b>G</b>randiosity, <b>F</b>light of ideas, <b>A</b>ctivity increase, <b>S</b>peech pressure, <b>T</b>houghtlessness (risky activities). 3 needed, or 4 if mood is only irritable <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 ["Mood AND motor","memory aid",`Since DSM-5, Criterion A needs both a mood change and increased activity or energy <sup class="c" data-ref="Mason2016,APA2022" title="Source 15,311">15,311</sup>. Adding energy cut the prevalence of manic or hypomanic episodes by at least a third <sup class="c" data-ref="Grunze2021" title="Source 197">197</sup>.`],
 ["Four days, one week","memory aid",`Hypomania lasts at least 4 consecutive days; mania at least 1 week, or any duration if hospitalisation is needed <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 ["One mania makes I","memory aid",`A single lifetime manic episode is required, and enough, for bipolar I. Bipolar II needs hypomania plus a major depressive episode and never mania <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>.`],
 ["SIG E CAPS + mood","memory aid",`Depressive episode symptoms: <b>S</b>leep, <b>I</b>nterest, <b>G</b>uilt, <b>E</b>nergy, <b>C</b>oncentration, <b>A</b>ppetite, <b>P</b>sychomotor change, thoughts of death (<b>S</b>), plus depressed mood: 5 of 9 for 2 weeks <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 ["Trough at twelve","memory aid",`A lithium level is drawn just before the next dose, about 12 hours after the last one <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 ["Watch the NAT","memory aid",`<b>N</b>SAIDs, <b>A</b>CE inhibitors (and ARBs) and <b>T</b>hiazides can push lithium levels up <sup class="c" data-ref="FDA-Lithium,Finley1995,Finley1996" title="Source 132,147,148">132,147,148</sup>. Vomiting, diarrhoea, fever and heavy sweating can too <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>.`],
 ["Shaky, unsteady, sick, confused","memory aid",`Worsening tremor, unsteadiness, vomiting or diarrhoea, and confusion can signal lithium toxicity: an emergency <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup>.`],
 ["Lamotrigine lifts lows, lithium limits highs","memory aid",`Lamotrigine mainly delays depression and lithium mainly delays mania <sup class="c" data-ref="Calabrese2003Lamotrigine,Bowden2003Lamotrigine" title="Source 54,64">54,64</sup>.`],
 ["Low and mixed: lean in","memory aid",`Suicide-attempt risk is highest in mixed and depressive phases, not mania <sup class="c" data-ref="Valtonen2008,Miller2020Suicide" title="Source 339,497">339,497</sup>. Those are the times for extra support and a safety plan <sup class="c" data-ref="Nuij2021" title="Source 383">383</sup>.`]
];
/* the seven Criterion B symptoms on the DIGFAST memory aid */
const RV_B=[
 ['D','Distractibility','distractibility'],
 ['I','Insomnia','decreased need for sleep'],
 ['G','Grandiosity','inflated self-esteem or grandiosity'],
 ['F','Flight of ideas','or the feeling that thoughts race'],
 ['A','Activity','more goal-directed activity, agitation'],
 ['S','Speech','more talkative, pressure to keep talking'],
 ['T','Thoughtlessness','risky acts with painful consequences']
];
const RV_LIT=[2,1,5,3];/* order in which the counter lights rows: G, I, S, F */
const RV_STEPS=[
 {from:0,at:.12,k:'Criterion A',t:'Mood and energy, together',txt:`A manic or hypomanic episode starts with a two-part Criterion A: abnormally and persistently elevated, expansive or irritable mood, and abnormally and persistently increased activity or energy, most of the day, nearly every day <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>. DSM-5 (2013) made energy a required core symptom; before that a mood change alone was enough <sup class="c" data-ref="Mason2016" title="Source 311">311</sup>.`,pt:'A high is more than a good mood: energy and activity rise too, and other people notice.',hook:'Since DSM-5: mood change AND increased activity or energy.'},
 {from:.2,at:.33,k:'DIGFAST',t:'Seven B symptoms',txt:`As a memory aid, DIGFAST holds the seven Criterion B symptoms: distractibility, decreased need for sleep, grandiosity, flight of ideas or racing thoughts, increased goal-directed activity or agitation, more talkative or pressured speech, and excessive involvement in risky activities <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>. The letters are a teaching shortcut, not DSM wording. Decreased need for sleep is also the most common early warning sign of mania <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>.`,pt:'Seven letters, seven signs. Sleeping much less without feeling tired is often the first one.',hook:'Sleep disturbance: most robust early sign of mania (median 77%).'},
 {from:.4,at:.53,k:'3 of 7, or 4',t:'Counting the symptoms',txt:`At least 3 of the 7 symptoms must be present to a significant degree, or 4 if the mood is only irritable <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>. Irritability is common in mania, which is "not a purely euphoric state" <sup class="c" data-ref="Cassidy1998" title="Source 70">70</sup>.`,pt:'If the high shows up mostly as irritability, one more sign is needed before it counts.',hook:'Irritable mood only: 4 of 7 B symptoms instead of 3.'},
 {from:.6,at:.72,k:'Duration',t:'Four days or one week',txt:`Hypomania needs at least 4 consecutive days; mania at least 1 week, or any duration if hospitalisation is needed <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>. ICD-11 says hypomania lasts "at least several days" <sup class="c" data-ref="Stein2020BMC" title="Source 475">475</sup>. In bipolar II, brief (2–6 day) and longer hypomanias did not differ on any course measure <sup class="c" data-ref="Judd2003" title="Source 247">247</sup>.`,pt:'How long a high lasts is one part of how doctors name it.',hook:'Hypomania ≥4 consecutive days; mania ≥1 week (any length if hospitalised).'},
 {from:.8,at:.94,k:'Criterion C',t:'What makes it mania',txt:`Mania needs marked impairment, hospitalisation to prevent harm, or psychotic features; hypomania brings an observable change without these, and psychosis makes an episode manic by definition <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>. One manic episode is enough for bipolar I; hypomania plus a major depressive episode, never mania, is bipolar II <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>. These criteria are for learning, not for diagnosing yourself: diagnosis needs a clinician's assessment over time <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,pt:'Most people recover from an episode with treatment: 98% after a first manic admission recovered within 2 years <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>.',hook:'Bipolar II is not "bipolar lite": disability is comparable to bipolar I <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.'}
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
  $('#mnList').innerHTML=RV_MN.map(m=>`<div class="card"><span class="tag accent">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: DIGFAST and the episode gates ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    const L=N?{x:16,y:42,w:368}:{x:16,y:46,w:340},R=N?{x:16,y:350,w:368,h:240}:{x:372,y:20,w:332,h:344};
    const RH=N?41:42,TH=34;
    const ph=[0,.19,.39,.59,.79,1.01];
    const vis=k=>{const a=ph[k],b=ph[k+1];return ramp(t,a,a+.035)*(k===4?1:1-ramp(t,b-.02,b+.015))};
    const v0=1-ramp(t,ph[1]-.02,ph[1]+.015);
    const rev=k=>ramp(t,.2+k*.022,.23+k*.022);/* row k revealed */
    const nLit=Math.min(4,Math.floor(ramp(t,.41,.555)*4.999));
    const lit=k=>t>=.4&&RV_LIT.indexOf(k)>-1&&RV_LIT.indexOf(k)<nLit;
    let s='';
    const ttl=t<.2?'First Criterion A, then the B list':t<.4?'D-I-G-F-A-S-T: the seven B symptoms':t<.6?`Symptoms present: ${nLit} of 7`:'Criterion B met: 4 of 7';
    s+=`<text class="t-lbl" x="${L.x}" y="${L.y-14}">${ttl}</text>`;
    RV_B.forEach(([ch,w,gl],k)=>{
      const y=L.y+k*RH,on=t<.2?0:rev(k),hot=lit(k);
      const op=f1(.22+.78*on);
      s+=`<g style="opacity:${op}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${TH}" rx="8" style="fill:var(${hot?'--up-soft':'--panel'});stroke:var(${hot?'--up':'--line'});stroke-width:${hot?2:1.1}"/>`;
      s+=`<circle cx="${L.x+19}" cy="${y+TH/2}" r="12" style="fill:var(${hot?'--up-fill':'--brand'})"/><text class="t-lbl t-mid" x="${L.x+19}" y="${y+TH/2+4.5}" style="fill:var(--on-brand)">${ch}</text>`;
      s+=`<text class="t-sm" x="${L.x+40}" y="${y+14}" style="fill:var(--ink);font-weight:700;font-size:${N?12:11}px">${w}</text><text class="t-xs" x="${L.x+40}" y="${y+27}" style="font-size:${N?10.5:9.5}px">${gl}</text>`;
      if(hot)s+=`<text class="t-lbl t-end" x="${L.x+L.w-10}" y="${y+TH/2+4.5}" style="fill:var(--up)">✓</text>`;
      s+='</g>'});
    /* ---- explainer panel ---- */
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${R.w}" height="${R.h}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    const W=R.w;
    /* phase 0: the two-part gate */
    if(v0>0){const bh=N?46:58,y1=N?44:52,y2=N?124:150,c1=ramp(t,.03,.07),c2=ramp(t,.07,.11);
      s+=`<g style="opacity:${f1(v0)}"><text class="t-lbl" x="16" y="28">Criterion A: both parts</text>`;
      [[y1,'Mood','elevated, expansive or irritable',c1,'--up'],[y2,'Activity or energy','abnormally, persistently increased',c2,'--rx']].forEach(([y,h,sub,c,col])=>{
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(${col});stroke-width:${f1(1+c*1.4)}"/>`;
        s+=`<text class="t-lbl" x="30" y="${y+20}">${h}</text><text class="t-xs" x="30" y="${y+36}">${sub}</text>`;
        s+=`<circle cx="${W-40}" cy="${y+bh/2}" r="11" style="fill:var(${col});opacity:${f1(c)}"/><text class="t-lbl t-mid" x="${W-40}" y="${y+bh/2+4.5}" style="fill:var(--on-brand);opacity:${f1(c)}">✓</text>`});
      const ya=(y1+bh+y2)/2;s+=`<text class="t-big t-mid" x="${W/2}" y="${ya+6}" style="fill:var(--brand)">AND</text>`;
      const yf=N?196:240;
      s+=`<text class="t-sm" x="16" y="${yf}" style="fill:var(--ink)">most of the day, nearly every day</text><text class="t-xs" x="16" y="${yf+18}">required together since DSM-5 (2013)</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="${yf+36}">before then, a mood change alone was enough</text>`;
      s+='</g>'}
    /* phase 1: the letters */
    const a1=vis(1);
    if(a1>0){const sp=(W-32)/7,yl=N?78:92;
      s+=`<g style="opacity:${f1(a1)}"><text class="t-lbl" x="16" y="28">Memory aid: DIGFAST</text>`;
      RV_B.forEach(([ch],k)=>{s+=`<text class="t-big t-mid" x="${f1(16+sp*(k+.5))}" y="${yl}" style="fill:var(--up);font-size:${N?30:32}px;opacity:${f1(rev(k))}">${ch}</text>`});
      const lines=['7 Criterion B symptoms of mania','and hypomania, one per letter','','a teaching shortcut, not DSM wording','sleep loss is often the first sign'];
      lines.forEach((l,k)=>{if(l)s+=`<text class="${k<2?'t-sm':'t-xs'}" x="16" y="${(N?118:138)+k*(N?20:24)}" style="${k<2?'fill:var(--ink)':''}">${l}</text>`});
      s+='</g>'}
    /* phase 2: the counter */
    const a2=vis(2);
    if(a2>0){const cw=(W-32)/7;
      s+=`<g style="opacity:${f1(a2)}"><text class="t-lbl" x="16" y="28">How many are needed?</text><text class="t-big t-end" x="${W-16}" y="30" style="fill:var(--up);font-size:24px">${nLit}</text><text class="t-xs t-end" x="${W-16}" y="44">of 7 present</text>`;
      [['elevated or expansive mood',3,N?70:84],['irritable mood only',4,N?150:184]].forEach(([lab,need,y])=>{const ok=nLit>=need;
        s+=`<text class="t-sm" x="16" y="${y}" style="fill:var(--ink)">${lab}: ${need} of 7</text>`;
        for(let c=0;c<7;c++)s+=`<rect x="${f1(16+c*cw+2)}" y="${y+10}" width="${f1(cw-4)}" height="22" rx="5" style="fill:var(${c<nLit?'--up-fill':'--panel'});stroke:var(--line);opacity:${c<nLit?.85:1}"/>`;
        const mx=16+need*cw;s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${y+4}" y2="${y+38}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/>`;
        s+=`<text class="t-xs" x="16" y="${y+50}" style="fill:var(${ok?'--good':'--muted'})">${ok?'threshold met':'not yet'}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?226:290}">symptoms must be a clear change from usual</text></g>`}
    /* phase 3: the clock */
    const a3=vis(3);
    if(a3>0){const x0=24,x1=W-24,X=d=>x0+(x1-x0)*d/10,ya=N?120:150,d=10*ramp(t,.61,.76);
      s+=`<g style="opacity:${f1(a3)}"><text class="t-lbl" x="16" y="28">How long has it lasted?</text><text class="t-big t-end" x="${W-16}" y="30" style="fill:var(--brand);font-size:22px">day ${Math.min(10,Math.floor(d))}</text>`;
      s+=`<rect x="${x0}" y="${ya-26}" width="${f1(X(d)-x0)}" height="20" rx="6" style="fill:var(--up-fill);opacity:.8"/>`;
      s+=`<line x1="${x0}" x2="${x1}" y1="${ya}" y2="${ya}" class="axis"/>`;
      for(let k=0;k<=10;k+=2)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ya}" y2="${ya+5}" class="axis"/><text class="t-xs t-mid" x="${f1(X(k))}" y="${ya+17}">${k}</text>`;
      [[4,'hypomania: 4+ days','--up',ya+40],[7,'mania: 1 week+','--accent',ya+70]].forEach(([k,lab,col,yl])=>{const on=d>=k;
        s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ya-34}" y2="${yl-12}" style="stroke:var(${col});stroke-width:2;opacity:${on?1:.35}"/><text class="t-sm ${k===7?'t-end':''}" x="${f1(X(k)+(k===7?6:-6))}" y="${yl}" style="fill:var(${col});opacity:${on?1:.45};font-weight:700">${lab}</text>`});
      s+=`<text class="t-xs" x="16" y="${N?226:300}">mania: any length if hospitalisation is needed</text>`;
      if(!N)s+=`<text class="t-xs" x="16" y="318">ICD-11 hypomania: "at least several days"</text>`;
      s+='</g>'}
    /* phase 4: Criterion C and the diagnosis */
    const a4=vis(4);
    if(a4>0){const chips=['marked impairment in functioning','hospitalisation to prevent harm','psychotic features'],ch=N?24:28,y0=N?40:48;
      s+=`<g style="opacity:${f1(a4)}"><text class="t-lbl" x="16" y="28">Criterion C: any one makes it mania</text>`;
      chips.forEach((c,k)=>{const on=ramp(t,.81+k*.02,.84+k*.02),y=y0+k*(ch+6);
        s+=`<rect x="16" y="${y}" width="${W-32}" height="${ch}" rx="7" style="fill:var(--accent-soft);stroke:var(--accent);opacity:${f1(.25+.75*on)}"/><text class="t-sm" x="28" y="${y+ch/2+4}" style="fill:var(--ink);opacity:${f1(.3+.7*on)}">${c}</text>`});
      const o1=ramp(t,.88,.92),o2=ramp(t,.92,.96),yb=y0+3*(ch+6)+(N?6:14),bh=N?44:56;
      s+=`<g style="opacity:${f1(o1)}"><rect x="16" y="${yb}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--up);stroke-width:2"/><text class="t-lbl" x="28" y="${yb+19}" style="fill:var(--up)">yes: manic episode</text><text class="t-xs" x="28" y="${yb+(N?35:38)}">one is enough for bipolar I</text></g>`;
      const yc=yb+bh+(N?8:12);
      s+=`<g style="opacity:${f1(o2)}"><rect x="16" y="${yc}" width="${W-32}" height="${bh}" rx="10" style="fill:var(--panel);stroke:var(--down);stroke-width:2"/><text class="t-lbl" x="28" y="${yc+19}" style="fill:var(--down)">no: hypomanic episode</text><text class="t-xs" x="28" y="${yc+(N?35:38)}">plus major depression, no mania: bipolar II</text></g>`;
      s+='</g>'}
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,16000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const QZ_Q=[
 /* ---- Part 1 ---- */
 [1,`In the WHO World Mental Health surveys, lifetime prevalence of bipolar I disorder was:`,[`0.6%`,`6%`,`0.06%`,`16%`],0,`0.6% for bipolar I, 0.4% for bipolar II and 2.4% for the whole spectrum <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>.`],
 [1,`Bipolar disorder most often first presents with:`,[`A manic episode with psychosis`,`A depressive episode`,`A mixed episode in late life`,`Rapid cycling`],1,`Depression is the most frequent first presentation, which is why it is often mistaken for unipolar depression <sup class="c" data-ref="Nierenberg2023,Grande2016" title="Source 191,378">191,378</sup>.`],
 [1,`Over 12.8 years of follow-up in bipolar I, which symptoms took up the most weeks?`,[`Manic`,`Hypomanic`,`Depressive`,`Psychotic`],2,`Depressive 31.9% vs manic or hypomanic 8.9% of weeks <sup class="c" data-ref="Judd2002" title="Source 246">246</sup>.`],
 [1,`The sex ratio for bipolar disorder overall is best described as:`,[`5 women to 1 man`,`3 men to 1 woman`,`Seen only in women after childbirth`,`About equal, with bipolar II and rapid cycling more common in women`],3,`Near-equal overall; women have more bipolar II, rapid cycling and mixed episodes <sup class="c" data-ref="Diflorio2010" title="Source 106">106</sup>.`],
 [1,`Among 316 inpatients with mania, which statement fits the findings?`,[`Mania is not purely euphoric: irritability and dysphoria were prominent`,`Every patient was euphoric`,`Sleep was usually increased`,`Speech was usually slowed`],0,`Motor activation, racing thoughts, pressured speech and less sleep were most frequent <sup class="c" data-ref="Cassidy1998" title="Source 70">70</sup>.`],
 [1,`Lifetime psychotic symptoms occur in about what share of people with bipolar I?`,[`5%`,`63%`,`99%`,`22%`],1,`About 63% in bipolar I and 22% in bipolar II <sup class="c" data-ref="Aminoff2022" title="Source 6">6</sup>.`],
 [1,`Pooled years of potential life lost in bipolar disorder are about:`,[`1`,`40`,`13`,`0`],2,`12.89 years <sup class="c" data-ref="Chan2022" title="Source 72">72</sup>, mostly from natural causes such as cardiovascular disease <sup class="c" data-ref="Kessing2015,Biazus2023" title="Source 46,267">46,267</sup>. These are population statistics.`],
 [1,`The all-cause standardised mortality ratio for bipolar disorder is about:`,[`0.5`,`1.0`,`50`,`2`],3,`SMR 2.05; the suicide SMR is 14.44 <sup class="c" data-ref="Hayes2015" title="Source 213">213</sup>.`],
 [1,`Twin studies put the heritability of bipolar disorder at about:`,[`60–85%`,`5–10%`,`100%`,`25–30%`],0,`85% (UK), 93% (Finland) and 60% (Swedish twins) <sup class="c" data-ref="McGuffin2003,Kieseppa2004,Johansson2019" title="Source 241,278,318">241,278,318</sup>.`],
 [1,`In Finnish twins, the MZ co-twin concordance for bipolar I was 0.43. This shows:`,[`Bipolar disorder is not genetic`,`Genes raise risk but do not decide it`,`Twins never share illness`,`Environment explains everything`],1,`Fewer than half of identical co-twins developed it <sup class="c" data-ref="Kieseppa2004" title="Source 278">278</sup>.`],
 [1,`In the Danish register, the risk of bipolar disorder by age 52 with one affected parent was:`,[`0.48%`,`50%`,`4.4%`,`24.9%`],2,`0.48% with neither parent, 4.4% with one and 24.9% with both <sup class="c" data-ref="Gottesman2010" title="Source 189">189</sup>.`],
 [1,`The 2025 multi-ancestry GWAS of bipolar disorder found how many loci?`,[`2`,`30`,`64`,`298`],3,`298 loci from 158,036 cases, a fourfold increase over 64 in 2021 <sup class="c" data-ref="OConnell2025,Mullins2021" title="Source 355,387">355,387</sup>.`],
 [1,`A bipolar polygenic risk score today:`,[`Explains about 4.6% of liability and cannot diagnose an individual`,`Is the main diagnostic test`,`Explains 90% of risk`,`Predicts lithium dose`],0,`AUC about 0.65–0.70; "insufficient for diagnostic prediction" <sup class="c" data-ref="Mullins2021,OConnell2025" title="Source 355,387">355,387</sup>.`],
 [1,`The psychiatric disorder with the highest genetic correlation with bipolar disorder is:`,[`ADHD`,`Schizophrenia`,`Anorexia nervosa`,`Autism`],1,`rg about 0.68–0.70 <sup class="c" data-ref="PGCCDG2013NatGenet,PGCCDG2019" title="Source 411,412">411,412</sup>.`],
 [1,`Wehr's "final common pathway" to mania is:`,[`Dopamine excess`,`Inflammation`,`Sleep loss`,`Low lithium intake`],2,`Many triggers may act by reducing sleep, and mania worsens insomnia (Hypothesis) <sup class="c" data-ref="Wehr1987" title="Source 516">516</sup>.`],
 [1,`Which is the most robust early warning sign of mania?`,[`Headache`,`Weight loss`,`Low mood`,`Sleep disturbance`],3,`Median 77% of manic prodromes <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>.`],
 [1,`The fMRI pattern most often reported in bipolar disorder is:`,[`Under-active ventrolateral prefrontal cortex with over-active amygdala and limbic areas`,`A fully normal brain`,`Over-active prefrontal cortex with silent amygdala`,`Only cerebellar changes`],0,`From a meta-analysis of 65 studies and the circuit model <sup class="c" data-ref="Chen2011fMRI,Phillips2014" title="Source 75,413">75,413</sup>.`],
 [1,`Seasonal peaks in bipolar disorder are:`,[`Mania in early winter`,`Mania in spring and summer, depression in early winter`,`No seasonal pattern at all`,`Depression in summer only`],1,`About 15% of manic and 25% of depressive episodes show a seasonal pattern <sup class="c" data-ref="Geoffroy2014" title="Source 165">165</sup>.`],
 /* ---- Part 2 ---- */
 [2,`A manic episode must last at least:`,[`1 day`,`4 days`,`1 week, or any duration if hospitalisation is needed`,`2 weeks`],2,`DSM-5-TR Criterion A <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`If the mood is only irritable, how many Criterion B symptoms are needed?`,[`2`,`3`,`5`,`4`],3,`3 of 7 normally; 4 if the mood is only irritable <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Since DSM-5, Criterion A for mania requires a mood change plus:`,[`Increased activity or energy`,`Psychosis`,`A family history`,`Weight loss`],0,`DSM-5 (2013) added increased activity or energy <sup class="c" data-ref="Mason2016,Yatham2018" title="Source 311,525">311,525</sup>.`],
 [2,`An episode with 5 manic symptoms for 5 days, observed by family, with no impairment, hospitalisation or psychosis, is:`,[`A manic episode`,`A hypomanic episode`,`Cyclothymic disorder`,`A mixed episode`],1,`At least 4 days, an observable change and no marked impairment define hypomania <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Which feature makes an elevated-mood episode manic by definition?`,[`Talkativeness`,`Distractibility`,`Psychotic features`,`Decreased need for sleep`],2,`Psychosis, marked impairment or hospitalisation make it mania <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Bipolar II disorder requires:`,[`At least one manic episode`,`Two years of subthreshold symptoms`,`Psychotic depression`,`At least one hypomanic and one major depressive episode, and never mania`],3,`<sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>.`],
 [2,`A major depressive episode requires:`,[`5 of 9 symptoms over 2 weeks, including depressed mood or loss of interest`,`3 of 7 symptoms over 1 week`,`Any 2 symptoms for a month`,`Suicidal thoughts in every case`],0,`<sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`Cyclothymic disorder in adults requires at least:`,[`1 week`,`2 years of subthreshold highs and lows`,`6 months`,`10 years`],1,`At least 1 year in children and adolescents; full episode criteria are never met <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`CANMAT describes the idea that bipolar II is a "less severe form" as:`,[`Proven by trials`,`True only in adolescents`,`Long-standing but discredited`,`An ICD-11 rule`],2,`Disability is comparable and suicide-attempt rates are similar <sup class="c" data-ref="Yatham2018,Novick2010" title="Source 382,525">382,525</sup>.`],
 [2,`A full manic episode emerges on an antidepressant and persists at full level after the drug's effect has worn off. DSM-5-TR counts it as:`,[`Substance-induced only`,`Not a mood episode`,`Cyclothymia`,`Evidence for bipolar I`],3,`<sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`],
 [2,`The rapid cycling specifier needs at least how many episodes in 12 months?`,[`4`,`2`,`8`,`12`],0,`Separated by at least 2 months of remission or a switch of polarity <sup class="c" data-ref="Strawbridge2022,APA2022" title="Source 15,478">15,478</sup>.`],
 [2,`How does ICD-11 differ from DSM-5 on mixed states?`,[`It has no mixed category`,`It keeps a mixed episode of at least 2 weeks`,`It requires psychosis`,`It uses a 4-day rule`],1,`DSM-5 uses a "with mixed features" specifier instead <sup class="c" data-ref="Stein2020BMC,Yatham2018" title="Source 475,525">475,525</sup>.`],
 [2,`In ICD-11, code 6A61 is:`,[`Bipolar type I disorder`,`Cyclothymic disorder`,`Bipolar type II disorder`,`Schizoaffective disorder`],2,`6A60 type I, 6A61 type II, 6A62 cyclothymic disorder <sup class="c" data-ref="Harter2025" title="Source 206">206</sup>.`],
 [2,`The standard positive MDQ screen is:`,[`Any 3 items`,`A score above 20`,`A clinician's interview`,`7 or more of 13 items, plus co-occurrence, plus a moderate or serious problem`],3,`<sup class="c" data-ref="Hirschfeld2000MDQ,Palmer2021" title="Source 225,394">225,394</sup>.`],
 [2,`In the US general population, MDQ sensitivity was about:`,[`0.28`,`0.73`,`0.99`,`0.50`],0,`Specificity 0.97; in mood clinics sensitivity was 0.73 <sup class="c" data-ref="Hirschfeld2003AJP,Hirschfeld2000MDQ" title="Source 225,227">225,227</sup>.`],
 [2,`NICE advice on bipolar questionnaires in primary care is:`,[`Use the MDQ for every adult`,`Do not use questionnaires in primary care to identify bipolar disorder in adults`,`Use them only for children`,`Use them instead of referral`],1,`Ask depressed adults about past overactivity lasting 4 days or more <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [2,`The most common misdiagnosis in people later found to have bipolar disorder is:`,[`ADHD`,`Schizophrenia`,`Unipolar depression`,`Hypothyroidism`],2,`69% had been misdiagnosed, most often with unipolar depression <sup class="c" data-ref="Hirschfeld2003" title="Source 226">226</sup>.`],
 [2,`Which predicts that major depression will later convert to bipolar disorder?`,[`Late onset`,`No family history`,`Weight loss`,`Psychotic symptoms (OR 4.76)`],3,`Also family history (OR 2.89) and earlier onset <sup class="c" data-ref="Ratheesh2017" title="Source 424">424</sup>.`],
 [2,`Mood shifts lasting hours, triggered by interpersonal stress, with no well-functioning intervals, point most towards:`,[`Borderline personality disorder`,`Bipolar I mania`,`Cyclothymia`,`Seasonal pattern`],0,`Bipolar episodes are sustained; BPD shifts are transient and reactive <sup class="c" data-ref="Paris2015,Yatham2018" title="Source 398,525">398,525</sup>. The two can co-occur <sup class="c" data-ref="Fornaro2016" title="Source 151">151</sup>.`],
 [2,`A 62-year-old has a first manic episode and new neurological signs. Best next thought:`,[`Typical bipolar I, no tests needed`,`Suspect secondary mania and look for a medical cause`,`Cyclothymia`,`Borderline personality disorder`],1,`First mania after 40 and neurological deficits suggest secondary mania <sup class="c" data-ref="Satzer2016,Krauthammer1978" title="Source 283,439">283,439</sup>.`],
 [2,`Oral glucocorticoids were associated with mania at a hazard ratio of about:`,[`0.5`,`1.0`,`4.35`,`40`],2,`Compared with untreated people with the same disease; higher doses raised risk <sup class="c" data-ref="Fardet2012" title="Source 122">122</sup>.`],
 [2,`The Young Mania Rating Scale has:`,[`10 items scored 0–30`,`17 items`,`13 yes/no items`,`11 items scored 0–60`],3,`<sup class="c" data-ref="Young1978,Pigott2016Cochrane" title="Source 415,529">415,529</sup>.`],
 /* ---- Part 3 ---- */
 [3,`Lithium's relapse-prevention effect versus placebo is strongest against:`,[`Manic episodes`,`Depressive episodes only`,`Neither`,`Psychosis only`],0,`RR 0.52 for mania and 0.66 overall <sup class="c" data-ref="Severus2014E" title="Source 453">453</sup>.`],
 [3,`In Cipriani 2013, lithium versus placebo reduced suicides with an odds ratio of:`,[`1.5`,`0.13`,`0.95`,`3.0`],1,`Deaths from any cause OR 0.38 <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup>.`],
 [3,`In BALANCE, which arm did worst at preventing relapse?`,[`Lithium`,`Lithium plus valproate`,`Valproate alone`,`All were identical`],2,`Events: 54% combination, 59% lithium, 69% valproate <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup>.`],
 [3,`The lithium label describes its mechanism in mania as:`,[`Pure dopamine blockade`,`Serotonin reuptake inhibition`,`GABA agonism`,`Unknown`],3,`It inhibits IMPase and GSK-3β among other targets <sup class="c" data-ref="FDA-Lithobid,Hallcher1980,Klein1996" title="Source 133,203,282">133,203,282</sup>.`],
 [3,`Lithium is eliminated mainly by:`,[`The kidney, unchanged`,`Liver CYP3A4`,`Faeces`,`Lungs`],0,`Not metabolised; about 80% of filtered lithium is reabsorbed in the proximal tubule <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`A lithium level is drawn:`,[`At any time`,`As a trough, about 12 hours after the last dose`,`1 hour after the dose`,`Only when symptoms change`],1,`Immediately before the next dose <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`The US labels give the toxic lithium concentration as:`,[`≥0.4 mEq/L`,`≥0.8 mEq/L`,`≥1.5 mEq/L`,`≥5 mEq/L`],2,`Close to the therapeutic range of 0.8–1.2 mEq/L <sup class="c" data-ref="FDA-Lithium,FDA-Lithobid" title="Source 132,133">132,133</sup>. Quoted as published.`],
 [3,`Which is a severe sign of lithium neurotoxicity in the label?`,[`Fine tremor`,`Mild thirst`,`Light-headedness`,`Seizure`],3,`Severe: clonus, confusion, seizure, coma <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>. Suspected toxicity is an emergency.`],
 [3,`A thiazide diuretic is started in a person taking lithium. The expected effect is:`,[`Lithium levels often rise by 25–40%`,`Levels fall`,`No change`,`Lithium becomes inactive`],0,`<sup class="c" data-ref="Finley1995" title="Source 147">147</sup>.`],
 [3,`In older adults, admission for lithium toxicity rose within a month of starting:`,[`Paracetamol`,`An ACE inhibitor (RR 7.6) or loop diuretic (RR 5.5)`,`Vitamin D`,`An SSRI`],1,`<sup class="c" data-ref="Juurlink2004" title="Source 248">248</sup>.`],
 [3,`Most severe lithium neurotoxicity arises from:`,[`Acute overdose`,`Missing a dose`,`Chronic poisoning during regular use`,`Breastfeeding`],2,`Chronic vs acute OR 136 for severe neurotoxicity <sup class="c" data-ref="Oakley2001" title="Source 385">385</sup>.`],
 [3,`Which is NOT useful in lithium toxicity according to the label?`,[`Haemodialysis`,`Stopping or lowering the dose`,`Close level monitoring`,`Activated charcoal`],3,`Charcoal does not bind lithium; haemodialysis is "the treatment of choice" for severe toxicity <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`],
 [3,`Long-term lithium is associated with:`,[`Hypothyroidism and raised calcium`,`Hyperthyroidism in most people`,`Liver failure`,`Hair growth`],0,`Hypothyroidism OR 5.78; calcium up 0.09 mmol/L <sup class="c" data-ref="McKnight2012" title="Source 321">321</sup>.`],
 [3,`After stopping lithium, more than half of new episodes came within:`,[`2 years`,`10 weeks`,`1 day`,`5 years`],1,`NICE advises reducing gradually over at least 4 weeks <sup class="c" data-ref="Suppes1991,NICE2014CG185F" title="Source 373,479">373,479</sup>.`],
 [3,`Lamotrigine in bipolar disorder:`,[`Is first-line for acute mania`,`Works mainly against mania`,`Mainly delays depressive relapse and is not for acute mania`,`Is an antipsychotic`],2,`<sup class="c" data-ref="FDA-Lamictal,Calabrese2003Lamotrigine" title="Source 64,130">64,130</sup>.`],
 [3,`When lamotrigine is taken with valproate, the label's titration is:`,[`Doubled`,`Unchanged`,`Skipped`,`Halved, because valproate slows lamotrigine clearance`],3,`Serious rash risk rises with valproate <sup class="c" data-ref="FDA-Lamictal" title="Source 130">130</sup>.`],
 [3,`Valproate's boxed warning covers:`,[`Hepatotoxicity, fetal risk and pancreatitis`,`QT prolongation only`,`Agranulocytosis only`,`Weight loss`],0,`<sup class="c" data-ref="FDA-Depakote" title="Source 128">128</sup>.`],
 [3,`In EURAP, major malformations after valproate monotherapy were about:`,[`1%`,`10%`,`30%`,`0%`],1,`10.3% vs 2.9% for lamotrigine <sup class="c" data-ref="Tomson2018" title="Source 489">489</sup>.`],
 [3,`Before carbamazepine in people of Asian ancestry, the label advises testing for:`,[`HLA-B*57:01`,`CYP2D6`,`HLA-B*15:02`,`G6PD`],2,`Carriers have a high risk of SJS/TEN <sup class="c" data-ref="FDA-Equetro,Chen2011HLA" title="Source 76,129">76,129</sup>.`],
 [3,`Which is FDA-approved for bipolar II depression?`,[`Aripiprazole`,`Lamotrigine`,`Lithium`,`Lumateperone`],3,`Lumateperone covers bipolar I or II depression; quetiapine also covers bipolar II <sup class="c" data-ref="FDA-Caplyta,FDA-Seroquel,Calabrese2021Lumateperone" title="Source 68,127,136">68,127,136</sup>.`],
 [3,`In STEP-BD, adding an antidepressant to a mood stabiliser:`,[`Gave no added durable recovery`,`Doubled recovery`,`Caused mania in most`,`Was not studied`],0,`23.5% vs 27.3% with placebo <sup class="c" data-ref="Sachs2007STEPBD" title="Source 435">435</sup>.`],
 [3,`Antidepressant monotherapy in bipolar disorder was linked to:`,[`No change in mania risk`,`Higher mania risk in the first 3 months (HR 2.83)`,`Lower mania risk`,`Lithium toxicity`],1,`With a concurrent mood stabiliser, HR 0.79 <sup class="c" data-ref="Viktorin2014" title="Source 512">512</sup>.`],
 [3,`Which three drugs ranked most effective for acute mania in Cipriani 2011?`,[`Lamotrigine, gabapentin, topiramate`,`Lithium, valproate, carbamazepine`,`Haloperidol, risperidone, olanzapine`,`Fluoxetine, sertraline, bupropion`],2,`<sup class="c" data-ref="Cipriani2011" title="Source 82">82</sup>.`],
 [3,`In treatment-resistant bipolar depression, ECT versus algorithm medication gave response rates of:`,[`10% vs 50%`,`35% vs 35%`,`100% vs 0%`,`73.9% vs 35.0%`],3,`Remission did not differ <sup class="c" data-ref="Schoeyen2015" title="Source 445">445</sup>.`],
 /* ---- Part 4 ---- */
 [4,`Over 5 years, Barcelona group psychoeducation versus control gave:`,[`3.86 vs 8.37 recurrences`,`No difference`,`More hospital days`,`Only a cost increase`],0,`Days acutely ill 154 vs 586 <sup class="c" data-ref="Colom2009" title="Source 90">90</sup>.`],
 [4,`Family-focused therapy versus crisis management gave 2-year relapse rates of:`,[`80% vs 20%`,`35% vs 54%`,`50% vs 50%`,`5% vs 95%`],1,`HR 0.38 <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>.`],
 [4,`IPSRT's distinctive ingredient is:`,[`Exposure therapy`,`Medication adherence alarms`,`Regular social rhythms (daily routines)`,`Light therapy`],2,`More regular rhythms went with fewer recurrences <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>.`],
 [4,`In the large pragmatic CBT trial (Scott 2006), CBT:`,[`Prevented all recurrences`,`Worsened outcomes`,`Was not tested`,`Was negative overall but helped people with fewer than 12 prior episodes`],3,`HR 1.05 overall <sup class="c" data-ref="Scott2006CBT" title="Source 447">447</sup>.`],
 [4,`Suicide-attempt incidence in bipolar disorder is highest during:`,[`Mixed states`,`Euthymia`,`Pure mania`,`Sleep`],0,`37-fold during mixed states, 18-fold in major depression <sup class="c" data-ref="Valtonen2008" title="Source 497">497</sup>. Suicide is associated with depressed or mixed states, not mania <sup class="c" data-ref="Miller2020Suicide" title="Source 339">339</sup>.`],
 [4,`Safety-planning-type interventions reduced suicidal behaviour with an NNT of about:`,[`2`,`16`,`500`,`They had no effect`],1,`RR 0.57 <sup class="c" data-ref="Nuij2021" title="Source 383">383</sup>.`],
 [4,`A nurse plans discharge for a person admitted with bipolar depression. The highest-risk window for suicide is:`,[`Years 5–10`,`Only during admission`,`The first 3 months after discharge`,`There is no pattern`],2,`1,132 per 100,000 person-years; arrange follow-up before discharge <sup class="c" data-ref="Chung2017JAMAPsych,Mann2021Suicide" title="Source 81,309">81,309</sup>.`],
 [4,`The strongest risk factors for suicide death in bipolar disorder are:`,[`Mania and talkativeness`,`Age under 10`,`Being employed`,`A previous attempt and hopelessness`],3,`<sup class="c" data-ref="Hawton2005Bipolar" title="Source 212">212</sup>. Help works and risk can be lowered with care <sup class="c" data-ref="Cipriani2013" title="Source 83">83</sup>.`],
 [4,`Postpartum relapse in women with bipolar disorder who were medication-free in pregnancy was about:`,[`66%`,`5%`,`23%`,`100%`],0,`23% with preventive medication. Plans are made with the care team <sup class="c" data-ref="Wesseloo2016" title="Source 519">519</sup>.`],
 [4,`Psychiatric admission risk for first-time mothers peaks:`,[`In the 2nd trimester`,`10–19 days after birth`,`At 1 year`,`Before conception`],1,`RR 7.31 <sup class="c" data-ref="MunkOlsen2006" title="Source 358">358</sup>. Postpartum psychosis is an emergency <sup class="c" data-ref="Jones2014Lancet" title="Source 245">245</sup>.`],
 [4,`First-trimester lithium was associated with cardiac malformations in:`,[`50% vs 1%`,`0% vs 0%`,`2.41% vs 1.15% unexposed`,`10% vs 3%`],2,`RVOT defects including Ebstein's anomaly 0.60% vs 0.18% <sup class="c" data-ref="Patorno2017" title="Source 399">399</sup>.`],
 [4,`NICE CG192 encourages breastfeeding unless the woman is taking:`,[`Quetiapine`,`Sertraline`,`Lamotrigine`,`Carbamazepine, clozapine or lithium`],3,`<sup class="c" data-ref="NICE2014CG192" title="Source 374">374</sup>.`],
 /* ---- Part 5 ---- */
 [5,`In STEP-BD, the share of recovered people with a recurrence within 2 years was:`,[`48.5%`,`5%`,`95%`,`20%`],0,`Depressive recurrences outnumbered manic ones more than 2 to 1 <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup>.`],
 [5,`After a first manic admission, functional recovery (previous work and living) at 2 years was:`,[`98%`,`43%`,`10%`,`72%`],1,`Syndromal recovery 98% <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>.`],
 [5,`Lifetime anxiety disorder in bipolar disorder affects about:`,[`5%`,`95%`,`45%`,`1%`],2,`<sup class="c" data-ref="Pavlova2015" title="Source 400">400</sup>.`],
 [5,`The most common substance use disorder in clinical bipolar samples is:`,[`Opioid`,`Cocaine`,`Nicotine only`,`Alcohol use disorder (42%)`],3,`Cannabis 20% <sup class="c" data-ref="Hunt2016Clinical" title="Source 231">231</sup>.`],
 [5,`About what share of people with bipolar disorder have metabolic syndrome?`,[`37%`,`3%`,`90%`,`0%`],0,`Odds about twice the general population <sup class="c" data-ref="Vancampfort2013" title="Source 499">499</sup>.`],
 [5,`High expressed emotion in a family means:`,[`Warm and calm`,`Critical, hostile or over-involved attitudes that predict relapse`,`Frequent laughter`,`Talking about medicines`],1,`<sup class="c" data-ref="Miklowitz1988EE,Butzlaff1998" title="Source 62,332">62,332</sup>.`],
 [5,`For a person with acute mania, NICE CG185 advises:`,[`Busy group activities`,`Making major decisions quickly`,`A calming environment with reduced stimulation`,`Withholding contact with carers`],2,`And no important decisions until recovery <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [5,`High-level intermittent observation in NICE NG10 means checks every:`,[`2 hours`,`Day`,`30–60 minutes`,`15–30 minutes`],3,`Low-level intermittent is every 30–60 minutes <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>.`],
 [5,`NICE monitoring after starting an antipsychotic includes weight:`,[`Weekly for 6 weeks, then at 12 weeks`,`Once a year only`,`Never`,`Daily for a year`],0,`Glucose or HbA1c and lipids at 12 weeks <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`],
 [5,`ADHD is present in about what share of adults with bipolar disorder?`,[`73%`,`17%`,`0%`,`50%`],1,`73% of children and 43% of adolescents <sup class="c" data-ref="Sandstrom2021" title="Source 438">438</sup>.`],
 [5,`The ConLiGen GWAS of lithium response found:`,[`A clinical test now in routine use`,`No signal at all`,`One chromosome 21 locus with two long non-coding RNA genes`,`That response is fully genetic`],2,`Early evidence, not yet a clinical test <sup class="c" data-ref="Hou2016Lithium" title="Source 230">230</sup>.`],
 [5,`Midday bright light in bipolar depression (Sit 2018) gave remission of:`,[`0% vs 0%`,`100% vs 50%`,`10% vs 40%`,`68.2% vs 22.2% with dim light`],3,`With no mood polarity switches <sup class="c" data-ref="Sit2018" title="Source 459">459</sup>.`],
 /* ---- Part 6 ---- */
 [6,`"Folie circulaire" was described in 1854 by:`,[`Jean-Pierre Falret`,`Emil Kraepelin`,`John Cade`,`Karl Leonhard`],0,`Baillarger described "folie à double forme" the same year <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`],
 [6,`Kraepelin's 1899 unitary concept was called:`,[`Bipolar II disorder`,`Manic-depressive insanity`,`Cyclothymia`,`Dementia praecox`],1,`<sup class="c" data-ref="Angst2001" title="Source 9">9</sup>.`],
 [6,`Bipolar and unipolar illness were separated in 1966 by:`,[`Cade and Schou`,`Falret and Baillarger`,`Angst and Perris`,`Kraepelin and Leonhard`],2,`<sup class="c" data-ref="Angst1966,Perris1966,Pichot2004" title="Source 7,405,414">7,405,414</sup>.`],
 [6,`John Cade reported lithium for mania in:`,[`1899`,`1970`,`1994`,`1949`],3,`The US allowed lithium in 1970 <sup class="c" data-ref="Cade1949,Shorter2009" title="Source 63,456">63,456</sup>.`],
 [6,`The term "bipolar disorder" entered the DSM in:`,[`DSM-III, 1980`,`DSM-I, 1952`,`DSM-5, 2013`,`DSM-II, 1968`],0,`<sup class="c" data-ref="Mason2016" title="Source 311">311</sup>.`],
 [6,`DSM-IV (1994) introduced:`,[`Lithium levels`,`A stand-alone hypomanic episode, the basis of bipolar II`,`The energy criterion`,`ICD-11 codes`],1,`<sup class="c" data-ref="Mason2016" title="Source 311">311</sup>.`]
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
 ["6A60 · 6A61 · 6A62 (ICD-11)",`ICD-11 codes for bipolar type I disorder, bipolar type II disorder and cyclothymic disorder <sup class="c" data-ref="Harter2025" title="Source 206">206</sup>.`,"types"],
 ["988 Suicide & Crisis Lifeline",`The US crisis line: call or text 988. In the UK and Ireland, Samaritans can be called on 116 123. Help works, and reaching out early matters <sup class="c" data-ref="Nuij2021,Stanley2018ED" title="Source 383,473">383,473</sup>.`,"crisis"],
 ["Actigraphy",`Wrist-worn movement recording of sleep and activity; between episodes it shows lower mean activity and more variable sleep <sup class="c" data-ref="DeCrescenzo2017,Ng2015Sleep" title="Source 99,370">99,370</sup>.`,"brain"],
 ["Activated charcoal",`Not recommended in lithium toxicity because it does not bind lithium ions <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["Adherence",`Taking treatment as agreed; more than 50% of people with bipolar disorder do not take treatment as prescribed <sup class="c" data-ref="Nierenberg2023" title="Source 378">378</sup>. Psychoeducation reduced non-adherence <sup class="c" data-ref="Chatterton2017" title="Source 74">74</sup>.`,"therapy"],
 ["Advance statement",`A plan written when well about care in a future crisis; advance statements reduced compulsory admissions by 23% (RR 0.77) <sup class="c" data-ref="deJong2016" title="Source 100">100</sup>.`,"living"],
 ["AKAP11",`The first exome-wide significant risk gene shared by bipolar disorder and schizophrenia (OR 7.06); its protein interacts with GSK3B (Early evidence) <sup class="c" data-ref="Palmer2022Exome" title="Source 395">395</sup>.`,"genes"],
 ["Alda scale",`The research scale of long-term lithium response; mixture modelling suggests full, partial and non-responders <sup class="c" data-ref="Manchia2013" title="Source 308">308</sup>.`,"lithium"],
 ["Allostatic load",`The idea that repeated episodes and stress cause cumulative "wear and tear" on brain and body (Hypothesis) <sup class="c" data-ref="Kapczinski2008" title="Source 249">249</sup>.`,"brain"],
 ["ANK3",`Gene for ankyrin G, one of the first genome-wide bipolar associations (2008) <sup class="c" data-ref="Ferreira2008" title="Source 144">144</sup>.`,"genes"],
 ["Antidepressant switch",`A shift into mania, hypomania or a mixed state after starting an antidepressant; monotherapy raised early mania risk (HR 2.83) but not with a mood stabiliser (HR 0.79) <sup class="c" data-ref="Viktorin2014" title="Source 512">512</sup>.`,"depression"],
 ["Anxious distress specifier",`A DSM-5-TR specifier for manic or depressive episodes with marked anxiety, such as feeling keyed up or restless <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"types"],
 ["Aretaeus of Cappadocia",`1st-century Greek physician, perhaps the first to describe mania and melancholia as one disease <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>.`,"history"],
 ["Aripiprazole once-monthly",`A long-acting injectable; recurrence 26.5% vs 51.1% on placebo over 52 weeks, mainly manic episodes prevented <sup class="c" data-ref="Calabrese2017AOM" title="Source 67">67</sup>.`,"antipsychotics"],
 ["Atypical features",`A depressive-episode specifier (for example hypersomnia, increased appetite, leaden paralysis, rejection sensitivity) that points towards bipolar depression <sup class="c" data-ref="Mitchell2008,Yatham2018" title="Source 342,525">342,525</sup>.`,"types"],
 ["BALANCE trial",`330 people with bipolar I: lithium alone or with valproate prevented relapse better than valproate alone <sup class="c" data-ref="Geddes2010BALANCE" title="Source 163">163</sup>.`,"lithium"],
 ["Baillarger, Jules",`French psychiatrist who presented "folie à double forme" in January 1854 <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`,"history"],
 ["BDNF",`Brain-derived neurotrophic factor; falls in mania and depression and normalises in euthymia, a possible state marker (Early evidence) <sup class="c" data-ref="Fernandes2015" title="Source 141">141</sup>.`,"brain"],
 ["Biphasic course",`An episode followed straight away by one of the opposite polarity; seen in 80% of 206 people with bipolar II <sup class="c" data-ref="Benazzi2006" title="Source 34">34</sup>.`,"episodes"],
 ["Bipolar I disorder",`Requires at least one lifetime manic episode; hypomanic or depressive episodes may also occur <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>.`,"types"],
 ["Bipolar II disorder",`Requires at least one hypomanic and one major depressive episode, and never mania <sup class="c" data-ref="APA2022,McIntyre2020Lancet" title="Source 15,320">15,320</sup>. Not a "milder" form <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"types"],
 ["Bipolar spectrum",`Bipolar I, II and subthreshold forms together; lifetime 2.4% in the WMH surveys <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>. Wider "soft spectrum" proposals are research ideas, not criteria <sup class="c" data-ref="Angst2003" title="Source 10">10</sup>.`,"types"],
 ["Blue-blocking glasses",`Orange glasses worn in the evening to create "virtual darkness"; a small trial cut YMRS scores in mania (Early evidence) <sup class="c" data-ref="Henriksen2016" title="Source 221">221</sup>.`,"frontier"],
 ["Boxed warning",`The strongest US label warning. Lithium's says toxicity "can occur at doses close to therapeutic levels" <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["Bright light therapy",`Adjunctive light for bipolar depression; 68.2% vs 22.2% remission with midday light in one trial <sup class="c" data-ref="Sit2018" title="Source 459">459</sup>. ISBD suggests anti-manic cover <sup class="c" data-ref="Geoffroy2025" title="Source 167">167</sup>.`,"frontier"],
 ["Brugada syndrome",`An inherited heart rhythm condition that lithium can unmask; the label advises avoiding lithium in it <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["CACNA1C",`Gene for an L-type calcium channel subunit; a classic bipolar GWAS hit <sup class="c" data-ref="Ferreira2008,PGCBD2011" title="Source 144,408">144,408</sup>.`,"genes"],
 ["Cade, John",`Australian psychiatrist who reported "Lithium salts in the treatment of psychotic excitement" in 1949 <sup class="c" data-ref="Cade1949" title="Source 63">63</sup>.`,"history"],
 ["CANMAT/ISBD 2018",`Canadian–international guideline grading treatments first-, second- or third-line for mania, depression and maintenance <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"stabilisers"],
 ["Carbamazepine",`An anticonvulsant for acute mania (second-line in CANMAT for safety reasons); test for HLA-B*15:02 in people of Asian ancestry <sup class="c" data-ref="Yatham2018,FDA-Equetro" title="Source 129,525">129,525</sup>.`,"stabilisers"],
 ["Cariprazine",`An antipsychotic approved for bipolar I mania and bipolar I depression; akathisia is a common side effect <sup class="c" data-ref="FDA-Vraylar,Calabrese2015Cariprazine" title="Source 66,137">66,137</sup>.`,"antipsychotics"],
 ["Carer burden",`The strain on family caregivers; 89% reported moderate or higher burden from problem behaviours in STEP-BD <sup class="c" data-ref="Perlick2007" title="Source 402">402</sup>.`,"families"],
 ["Catatonia specifier",`Can be added to manic or depressive episodes <sup class="c" data-ref="Yatham2018,APA2022" title="Source 15,525">15,525</sup>; ECT is an option in catatonia <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"types"],
 ["Chronic lithium poisoning",`Toxicity during regular use when intake outstrips elimination; the most common pattern and the main cause of severe neurotoxicity <sup class="c" data-ref="BairdGunning2017,Oakley2001" title="Source 22,385">22,385</sup>.`,"levels"],
 ["Chronotherapy",`Treatments acting on the body clock, such as sleep deprivation with light; 70% responded within a week in one cohort (Early evidence) <sup class="c" data-ref="Benedetti2014" title="Source 37">37</sup>.`,"frontier"],
 ["Chronotype",`A person's preferred timing of sleep and activity; evening chronotype is more common in bipolar disorder <sup class="c" data-ref="Melo2017" title="Source 325">325</sup>.`,"brain"],
 ["CIDI",`The WHO Composite International Diagnostic Interview, fully structured and given by lay interviewers <sup class="c" data-ref="Kessler2004CIDI" title="Source 272">272</sup>.`,"screening"],
 ["Clock gene",`Genes that run the cellular clock; Clock mutant mice show a mania-like profile reversed by lithium (Early evidence) <sup class="c" data-ref="Roybal2007" title="Source 433">433</sup>.`,"brain"],
 ["Collaborative care",`Team-based care with care managers and psychoeducation; it reduced hospital admissions (RR 0.68) <sup class="c" data-ref="Oud2016" title="Source 392">392</sup>.`,"therapy"],
 ["ConLiGen",`The international Consortium on Lithium Genetics; its GWAS found a chromosome 21 locus for lithium response <sup class="c" data-ref="Hou2016Lithium" title="Source 230">230</sup>.`,"frontier"],
 ["Copy-number variant (CNV)",`A deleted or duplicated stretch of DNA; CNV burden is lower in bipolar disorder than in schizophrenia <sup class="c" data-ref="Grozeva2010,Green2016CNV" title="Source 194,196">194,196</sup>.`,"genes"],
 ["Criterion A (mania)",`Elevated, expansive or irritable mood plus increased activity or energy, at least 1 week <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Criterion B (mania)",`At least 3 of 7 symptoms, 4 if mood is only irritable <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Criterion C (mania)",`Marked impairment, hospitalisation or psychotic features, which separate mania from hypomania <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Cyclothymic disorder",`At least 2 years (1 in youth) of subthreshold highs and lows without full episodes <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>; ICD-11 code 6A62 <sup class="c" data-ref="Harter2025" title="Source 206">206</sup>.`,"types"],
 ["DALY",`Disability-adjusted life-year; bipolar disorder caused 9.9 million DALYs in GBD 2013 <sup class="c" data-ref="Ferrari2016" title="Source 143">143</sup>.`,"what"],
 ["De-escalation",`Calming an agitated person by verbal engagement and collaboration, avoiding restraint where possible <sup class="c" data-ref="Richmond2012" title="Source 429">429</sup>.`,"nursing"],
 ["Decreased need for sleep",`A manic Criterion B symptom: feeling rested after much less sleep <sup class="c" data-ref="APA2022" title="Source 15">15</sup>; sleep disturbance is the most common early sign of mania <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>.`,"criteria"],
 ["Dementia risk",`Meta-analyses link bipolar disorder to higher odds of dementia (OR 2.36–2.96), with more episodes predicting it; lithium use was associated with lower risk in observational studies (Early evidence) <sup class="c" data-ref="Diniz2017,Velosa2020" title="Source 108,505">108,505</sup>.`,"course"],
 ["Delay to diagnosis",`Median 6.7 years from onset to diagnosis in a 2022 meta-analysis <sup class="c" data-ref="Scott2022Delay" title="Source 450">450</sup>.`,"differential"],
 ["Differential diagnosis",`The other conditions considered: unipolar depression, personality disorders, ADHD, substances and physical illness such as thyroid disease <sup class="c" data-ref="NICE2014CG185,Yatham2018" title="Source 372,525">372,525</sup>.`,"differential"],
 ["Digital phenotyping",`Using smartphone and sensor data to track mood; promising but not yet reliable enough for clinical use (Early evidence) <sup class="c" data-ref="Kutcher2026,Ludwig2025" title="Source 285,304">285,304</sup>.`,"frontier"],
 ["DIGFAST",`A memory aid for the seven manic Criterion B symptoms; not DSM wording <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Divalproex",`A form of valproate; 48% responded in acute mania vs 25% on placebo <sup class="c" data-ref="Bowden1994" title="Source 52">52</sup>.`,"stabilisers"],
 ["DMDD",`Disruptive mood dysregulation disorder: a DSM-5 depressive disorder for severe chronic irritability in children, added partly against bipolar overdiagnosis <sup class="c" data-ref="Copeland2013DMDD,APA2022" title="Source 15,92">15,92</sup>.`,"differential"],
 ["Dopamine hypothesis",`Too much dopamine signalling in mania and too little in depression (model) <sup class="c" data-ref="Ashok2017" title="Source 16">16</sup>.`,"brain"],
 ["DSM-5-TR",`The text revision of DSM-5, published by the APA in March 2022 <sup class="c" data-ref="APA2022" title="Source 15">15</sup>.`,"criteria"],
 ["Early warning signs",`Personal signs that an episode may be starting; training to spot them cut manic relapses <sup class="c" data-ref="Perry1999BMJ,Jackson2003" title="Source 236,407">236,407</sup>.`,"living"],
 ["Ebstein's anomaly",`A heart defect once strongly linked to lithium; RVOT defects 0.60% vs 0.18% after first-trimester exposure <sup class="c" data-ref="Patorno2017" title="Source 399">399</sup>.`,"pregnancy"],
 ["ECT",`Electroconvulsive therapy; 73.9% vs 35.0% response in treatment-resistant bipolar depression <sup class="c" data-ref="Schoeyen2015" title="Source 445">445</sup>. Second-line in CANMAT <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"depression"],
 ["eGFR",`Estimated glomerular filtration rate, a kidney test monitored every 6 months on lithium per NICE <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>.`,"levels"],
 ["ENIGMA",`An international imaging consortium showing thinner cortex and smaller hippocampus in bipolar disorder on average <sup class="c" data-ref="Ching2022,Hibar2018" title="Source 78,223">78,223</sup>.`,"brain"],
 ["Euthymia",`A steady mood between episodes. Even in euthymia, 34.7% meet criteria for a current anxiety disorder <sup class="c" data-ref="Pavlova2017" title="Source 401">401</sup>.`,"episodes"],
 ["Expressed emotion (EE)",`Critical, hostile or over-involved family attitudes; high EE predicts relapse <sup class="c" data-ref="Miklowitz1988EE,Butzlaff1998" title="Source 62,332">62,332</sup>.`,"families"],
 ["EXTRIP",`A workgroup that grades lithium as dialysable and recommends extracorporeal treatment in severe poisoning <sup class="c" data-ref="Decker2015" title="Source 98">98</sup>.`,"levels"],
 ["Falret, Jean-Pierre",`French psychiatrist who described "folie circulaire" in 1854 <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`,"history"],
 ["Family-focused therapy (FFT)",`Psychoeducation, communication and problem-solving with the family; 2-year relapse 35% vs 54% <sup class="c" data-ref="Miklowitz2003FFT" title="Source 333">333</sup>.`,"families"],
 ["Flight of ideas",`Thoughts jumping rapidly from topic to topic, or the feeling that thoughts race; a manic B symptom <sup class="c" data-ref="APA2022" title="Source 15">15</sup>.`,"criteria"],
 ["Folie circulaire",`"Circular insanity", Falret's 1854 name for alternating mania and melancholia <sup class="c" data-ref="Pichot2004" title="Source 414">414</sup>.`,"history"],
 ["Functional recovery",`Regaining previous work and living status; only 43% at 2 years after a first manic admission <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>.`,"course"],
 ["Glucocorticoid-induced mania",`Mania after oral steroids (HR 4.35 vs untreated people with the same disease) <sup class="c" data-ref="Fardet2012" title="Source 122">122</sup>.`,"differential"],
 ["Goal-attainment events",`Exciting successes that predicted rises in manic symptoms <sup class="c" data-ref="Johnson2008Mania" title="Source 243">243</sup>.`,"genes"],
 ["GSK-3",`Glycogen synthase kinase-3, an enzyme lithium inhibits (Ki about 2 mM) <sup class="c" data-ref="Klein1996,Stambolic1996" title="Source 282,471">282,471</sup>.`,"lithium"],
 ["GWAS",`Genome-wide association study; 298 bipolar loci by 2025 <sup class="c" data-ref="OConnell2025" title="Source 387">387</sup>.`,"genes"],
 ["Haemodialysis",`"The treatment of choice" for severe lithium toxicity, per the label <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["HCL-32",`The 32-item Hypomania Checklist; sensitivity 81%, specificity 67% in psychiatric services <sup class="c" data-ref="Carvalho2015" title="Source 69">69</sup>.`,"screening"],
 ["Heritability",`The share of variation in risk explained by genes; about 60–85% in twin studies <sup class="c" data-ref="McGuffin2003,Johansson2019" title="Source 241,318">241,318</sup>.`,"genes"],
 ["HLA-B*15:02",`An allele that strongly raises carbamazepine SJS/TEN risk in people of Asian ancestry <sup class="c" data-ref="Chung2004HLA,Chen2011HLA" title="Source 76,80">76,80</sup>.`,"stabilisers"],
 ["Hopelessness",`With a previous attempt, the strongest risk factor for suicide death in bipolar disorder <sup class="c" data-ref="Hawton2005Bipolar" title="Source 212">212</sup>.`,"crisis"],
 ["Hypercalcaemia (lithium)",`Raised calcium from lithium-associated hyperparathyroidism; 26% prevalence in one Swedish cohort <sup class="c" data-ref="Meehan2018" title="Source 324">324</sup>.`,"levels"],
 ["Hypomanic episode",`At least 4 days of elevated mood and energy with an observable change but no marked impairment, hospitalisation or psychosis <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Hypothyroidism (lithium)",`An underactive thyroid; more common with lithium (OR 5.78) and treatable with thyroid hormone <sup class="c" data-ref="McKnight2012,Kibirige2013" title="Source 277,321">277,321</sup>.`,"levels"],
 ["ICD-11",`The WHO classification approved in 2019 and in use from 2022 <sup class="c" data-ref="Reed2019" title="Source 425">425</sup>; it keeps a mixed episode and gives bipolar II equal status <sup class="c" data-ref="Stein2020BMC" title="Source 475">475</sup>.`,"types"],
 ["Inositol depletion hypothesis",`Lithium blocks inositol recycling and dampens phosphoinositide signalling (Hypothesis) <sup class="c" data-ref="Berridge1989,Harwood2005" title="Source 44,209">44,209</sup>.`,"lithium"],
 ["IPSRT",`Interpersonal and social rhythm therapy, which steadies daily routines; it lengthened time without a new episode <sup class="c" data-ref="Frank2005IPSRT" title="Source 152">152</sup>.`,"therapy"],
 ["Ketamine",`An anaesthetic studied as a fast-acting add-on for bipolar depression: 71% responded at some point vs 6% on placebo, but the effect faded within days (Early evidence) <sup class="c" data-ref="Diazgranados2010" title="Source 104">104</sup>. Third-line in CANMAT <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"frontier"],
 ["Kindling",`Post's idea that episodes sensitise the brain so later ones need less trigger (Hypothesis, contested) <sup class="c" data-ref="Post1992,Bender2011" title="Source 35,419">35,419</sup>.`,"brain"],
 ["Kraepelin, Emil",`Named "manic-depressive insanity" in 1899 <sup class="c" data-ref="Angst2001" title="Source 9">9</sup>.`,"history"],
 ["Lamotrigine",`An anticonvulsant for maintenance, mainly against depression; not for acute mania <sup class="c" data-ref="FDA-Lamictal,Calabrese2003Lamotrigine" title="Source 64,130">64,130</sup>.`,"stabilisers"],
 ["Life chart",`A day-by-day record of mood and functioning; the NIMH Life Chart Method correlates well with clinician ratings <sup class="c" data-ref="Denicoff2000" title="Source 101">101</sup>.`,"living"],
 ["Lithium",`The gold-standard maintenance mood stabiliser, with anti-suicide evidence <sup class="c" data-ref="Yatham2018,Cipriani2013" title="Source 83,525">83,525</sup>.`,"lithium"],
 ["Lithium level",`Serum lithium measured as a trough about 12 hours after the last dose <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>. In 10 breastfeeding pairs, average trough levels were 0.76 mEq/L in the mother, 0.35 in milk and 0.16 in the infant <sup class="c" data-ref="Viguera2007Breastmilk" title="Source 510">510</sup>.`,"levels"],
 ["Long-acting injectable (LAI)",`An antipsychotic injection given every 2 weeks or monthly; offered when non-adherence persists <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"antipsychotics"],
 ["Lumateperone",`An antipsychotic approved for bipolar I or II depression; MADRS 4.6 points better than placebo <sup class="c" data-ref="FDA-Caplyta,Calabrese2021Lumateperone" title="Source 68,127">68,127</sup>.`,"antipsychotics"],
 ["Lurasidone",`An antipsychotic approved for bipolar I depression, taken with food; NNT about 5 <sup class="c" data-ref="FDA-Latuda,Citrome2014Lurasidone" title="Source 84,131">84,131</sup>.`,"antipsychotics"],
 ["MADRS",`Montgomery–Åsberg Depression Rating Scale, 10 items <sup class="c" data-ref="Montgomery1979" title="Source 348">348</sup>.`,"screening"],
 ["Major depressive episode",`5 of 9 symptoms for 2 weeks including depressed mood or loss of interest <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["Manic episode",`At least 1 week of elevated, expansive or irritable mood and energy with 3+ B symptoms and marked impairment, hospitalisation or psychosis <sup class="c" data-ref="APA2022,Yatham2018" title="Source 15,525">15,525</sup>.`,"criteria"],
 ["MDQ",`Mood Disorder Questionnaire: 13 yes/no items; a screen that "flags" people for assessment, never a diagnosis <sup class="c" data-ref="Hirschfeld2000MDQ,Yatham2018" title="Source 225,525">225,525</sup>.`,"screening"],
 ["Means safety",`Restricting access to lethal means, an effective suicide-prevention measure (general principle) <sup class="c" data-ref="Zalsman2016,Mann2021Suicide" title="Source 309,531">309,531</sup>.`,"crisis"],
 ["Metabolic syndrome",`Clustered weight, glucose, lipid and blood pressure problems; 37.3% in bipolar disorder <sup class="c" data-ref="Vancampfort2013" title="Source 499">499</sup>.`,"living"],
 ["Methylphenidate",`A stimulant for ADHD; in bipolar disorder, use without a mood stabiliser was followed by more mania (HR 6.7), but not with one (HR 0.6) <sup class="c" data-ref="Viktorin2017" title="Source 513">513</sup>.`,"course"],
 ["Mixed features specifier",`DSM-5 label for an episode with prominent symptoms of the opposite pole; replaced the mixed episode <sup class="c" data-ref="Mason2016,Yatham2018" title="Source 311,525">311,525</sup>.`,"episodes"],
 ["Mixed states and suicide",`Mixed features in depressive or (hypo)manic phases go with "major increases of risk of suicidal behaviors" <sup class="c" data-ref="Tondo2020" title="Source 492">492</sup>; these are times for extra support.`,"crisis"],
 ["Mood stabiliser",`A medicine that treats or prevents mood episodes, such as lithium, valproate or lamotrigine <sup class="c" data-ref="Yatham2018" title="Source 525">525</sup>.`,"stabilisers"],
 ["Mortality gap",`Shorter life expectancy, about 13 years lost on average, mostly from physical illness and suicide (population statistic) <sup class="c" data-ref="Chan2022,Biazus2023" title="Source 46,72">46,72</sup>.`,"what"],
 ["Nephrogenic diabetes insipidus",`Lithium-related inability to concentrate urine, causing thirst and much urine <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>; a risk factor for chronic toxicity <sup class="c" data-ref="Oakley2001" title="Source 385">385</sup>.`,"levels"],
 ["Neurotoxicity (lithium)",`Tremor, ataxia, paraesthesia or cognitive impairment, which "can occur at therapeutic levels" <sup class="c" data-ref="NICE2014CG185F" title="Source 373">373</sup>.`,"levels"],
 ["N-acetylcysteine",`An antioxidant tested as an add-on; one 24-week trial improved depression scores, but a maintenance trial was negative (Early evidence) <sup class="c" data-ref="Berk2008NAC,Berk2012NAC" title="Source 41,43">41,43</sup>.`,"frontier"],
 ["NICE CG185",`The UK guideline on bipolar disorder in adults, children and young people <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`,"therapy"],
 ["NSAIDs",`Anti-inflammatory painkillers that can raise lithium levels; NICE warns against over-the-counter use with lithium <sup class="c" data-ref="FDA-Lithium,NICE2014CG185F" title="Source 132,373">132,373</sup>.`,"levels"],
 ["Observation levels",`NICE NG10 levels from intermittent checks to continuous arm's-length observation <sup class="c" data-ref="NICE-NG10" title="Source 371">371</sup>.`,"nursing"],
 ["Olanzapine–fluoxetine",`A combination approved for bipolar I depression; NNT about 4, with weight gain <sup class="c" data-ref="FDA-OlanzapineFluoxetine,Ketter2014" title="Source 134,275">134,275</sup>.`,"antipsychotics"],
 ["Peer support",`Support from people with lived experience; benefits for hope and empowerment but little effect on symptoms (Early evidence) <sup class="c" data-ref="LloydEvans2014" title="Source 300">300</sup>.`,"therapy"],
 ["Polygenic risk score (PRS)",`A sum of many small genetic effects; explains about 4.6% of liability and cannot diagnose <sup class="c" data-ref="Mullins2021,Murray2021PRS" title="Source 355,360">355,360</sup>.`,"genes"],
 ["Postpartum psychosis",`A rare emergency after birth (0.89–2.6 per 1,000 women), closely tied to bipolar disorder <sup class="c" data-ref="VanderKruik2017,Kendell1987" title="Source 256,501">256,501</sup>.`,"pregnancy"],
 ["Pregnancy recurrence",`71% of 89 women well at conception had a recurrence in pregnancy; stopping a mood stabiliser, especially quickly, was linked to higher risk <sup class="c" data-ref="Viguera2007Pregnancy" title="Source 511">511</sup>. Any change is planned with the care team.`,"pregnancy"],
 ["Predominant polarity",`A tendency for most episodes to be of one pole; about 30% mainly manic and 28.5% mainly depressive <sup class="c" data-ref="Bartoli2024" title="Source 25">25</sup>.`,"episodes"],
 ["Pregnancy Prevention Programme",`The UK MHRA framework required for valproate in women and girls who could become pregnant <sup class="c" data-ref="Iacobucci2018,NICE2014CG185F" title="Source 234,373">234,373</sup>.`,"pregnancy"],
 ["Prodrome",`The early phase before an episode; manic prodromes average more than 20 days <sup class="c" data-ref="Jackson2003" title="Source 236">236</sup>.`,"living"],
 ["Proximal tubule",`The kidney segment where about 80% of filtered lithium is reabsorbed <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["Psychoeducation",`Structured teaching about the illness and self-management; group programmes cut recurrences over 5 years <sup class="c" data-ref="Colom2009" title="Source 90">90</sup>.`,"therapy"],
 ["Psychotic features",`Delusions or hallucinations; in bipolar disorder they occur only within mood episodes <sup class="c" data-ref="APA2022" title="Source 15">15</sup>. Lifetime 63% in bipolar I <sup class="c" data-ref="Aminoff2022" title="Source 6">6</sup>.`,"episodes"],
 ["Quetiapine",`An antipsychotic used for mania, bipolar depression and maintenance; the only first-line option for bipolar II depression in CANMAT <sup class="c" data-ref="FDA-Seroquel,Yatham2018" title="Source 136,525">136,525</sup>.`,"antipsychotics"],
 ["Rapid cycling",`At least 4 mood episodes in 12 months; lifetime prevalence 35.5% <sup class="c" data-ref="Strawbridge2022,Miola2023" title="Source 340,478">340,478</sup>. With lithium, 34% of people with rapid cycling had no further recurrences <sup class="c" data-ref="Kupka2003" title="Source 284">284</sup>.`,"types"],
 ["Relapse-prevention plan",`A written plan of triggers, warning signs, coping steps and contacts, made jointly with the person and carer <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`,"living"],
 ["Risperidone LAI",`A two-weekly injection that delayed elevated-mood but not depressive recurrence <sup class="c" data-ref="Quiroz2010" title="Source 422">422</sup>.`,"antipsychotics"],
 ["Safety plan",`A written, prioritised list of warning signs, coping strategies and people and services to contact in a crisis <sup class="c" data-ref="Stanley2012SPI,Stanley2018ED" title="Source 472,473">472,473</sup>.`,"crisis"],
 ["Safewards",`Ten staff–patient relationship interventions that reduced ward conflict by 15% <sup class="c" data-ref="Bowers2015" title="Source 56">56</sup>.`,"nursing"],
 ["Schizoaffective disorder",`A primary psychotic disorder in which psychosis also occurs without a mood episode; in bipolar disorder it does not <sup class="c" data-ref="Yatham2018,APA2022" title="Source 15,525">15,525</sup>.`,"differential"],
 ["Schou, Mogens",`Danish psychiatrist who reported a controlled lithium trial in mania in 1954 and preventive lithium in 1967 <sup class="c" data-ref="Schou1954,Baastrup1967" title="Source 19,446">19,446</sup>.`,"history"],
 ["Responder neurons",`Stem-cell-derived neurons from people with bipolar disorder were hyperexcitable; lithium reversed this only in cells from clinical lithium responders (Early evidence) <sup class="c" data-ref="Mertens2015" title="Source 330">330</sup>.`,"frontier"],
 ["SCID",`Structured Clinical Interview for DSM, semistructured and clinician-administered <sup class="c" data-ref="Spitzer1992" title="Source 469">469</sup>.`,"screening"],
 ["Suicide rate (ISBD)",`A pooled 164 per 100,000 person-years, about 1.7 times higher in men (population statistic) <sup class="c" data-ref="Schaffer2015Epi" title="Source 441">441</sup>. Most people with bipolar disorder do not die by suicide, and treatment lowers risk <sup class="c" data-ref="Nordentoft2011,Cipriani2013" title="Source 83,380">83,380</sup>.`,"crisis"],
 ["Seasonal pattern",`A specifier for episodes tied to seasons; mania peaks in spring and summer, depression in early winter <sup class="c" data-ref="Geoffroy2014" title="Source 165">165</sup>.`,"types"],
 ["Secondary mania",`Mania caused by a drug or medical condition, such as a brain lesion <sup class="c" data-ref="Krauthammer1978,Satzer2016" title="Source 283,439">283,439</sup>.`,"differential"],
 ["Serotonin syndrome",`A drug reaction lithium can precipitate with other serotonergic medicines <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["SILENT",`Syndrome of irreversible lithium-effectuated neurotoxicity: sequelae lasting at least 2 months, often cerebellar <sup class="c" data-ref="Adityanjee2005" title="Source 2">2</sup>.`,"levels"],
 ["Sleep deprivation (therapeutic)",`Staying awake to treat depression; in rapid cycling one night switched 7 of 9 into mania or hypomania <sup class="c" data-ref="Wehr1982" title="Source 515">515</sup>.`,"brain"],
 ["SMR",`Standardised mortality ratio; all-cause 2.05 and suicide 14.44 in bipolar disorder <sup class="c" data-ref="Hayes2015" title="Source 213">213</sup>.`,"what"],
 ["SNP-heritability",`Heritability captured by common variants, about 16–23% for bipolar disorder <sup class="c" data-ref="Stahl2019,Mullins2021" title="Source 355,470">355,470</sup>.`,"genes"],
 ["Social zeitgeber theory",`Losing social time cues disrupts body rhythms and may trigger episodes (Hypothesis) <sup class="c" data-ref="Ehlers1988" title="Source 118">118</sup>.`,"brain"],
 ["STEP-BD",`A large US effectiveness programme; 48.5% of recovered people had a recurrence within 2 years <sup class="c" data-ref="Perlis2006STEPBD" title="Source 404">404</sup>.`,"course"],
 ["Stevens–Johnson syndrome",`A severe skin reaction; the lamotrigine and carbamazepine labels carry boxed warnings <sup class="c" data-ref="FDA-Lamictal,FDA-Equetro" title="Source 129,130">129,130</sup>.`,"stabilisers"],
 ["Subthreshold bipolar disorder",`Hypomanic symptoms below full criteria; lifetime 1.4% in WMH surveys <sup class="c" data-ref="Merikangas2011" title="Source 329">329</sup>.`,"what"],
 ["Supported employment",`Help to find and keep work, recommended by NICE for people who wish to work <sup class="c" data-ref="NICE2014CG185" title="Source 372">372</sup>.`,"living"],
 ["Syndromal recovery",`No longer meeting episode criteria; 98% within 2 years after a first manic admission <sup class="c" data-ref="Tohen2003" title="Source 486">486</sup>.`,"course"],
 ["Thiazide diuretics",`Water pills that often raise lithium levels by 25–40% <sup class="c" data-ref="Finley1995" title="Source 147">147</sup>.`,"levels"],
 ["Treatment-resistant bipolar depression",`Failure of at least two approved, adequately dosed treatments (ISBD 2025) <sup class="c" data-ref="Vieta2025TRBD" title="Source 508">508</sup>.`,"depression"],
 ["Trough level",`A drug level taken just before the next dose <sup class="c" data-ref="FDA-Lithium" title="Source 132">132</sup>.`,"levels"],
 ["Valproate",`An anticonvulsant used for mania; boxed warnings for liver, pancreas and fetal harm <sup class="c" data-ref="FDA-Depakote" title="Source 128">128</sup>. About 10% malformations <sup class="c" data-ref="Tomson2018" title="Source 489">489</sup>.`,"stabilisers"],
 ["Valproate and IQ",`Mean IQ 97 at age 6 after fetal valproate vs 108 after lamotrigine <sup class="c" data-ref="Meador2013NEAD" title="Source 322">322</sup>.`,"pregnancy"],
 ["White matter (fractional anisotropy)",`A diffusion MRI measure; lower in bipolar disorder, most in the corpus callosum and cingulum <sup class="c" data-ref="Favre2019" title="Source 125">125</sup>.`,"brain"],
 ["YMRS",`Young Mania Rating Scale: 11 clinician-rated items, total 0–60 <sup class="c" data-ref="Young1978,Pigott2016Cochrane" title="Source 415,529">415,529</sup>.`,"screening"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so 'hcl 32' or 'cg185' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐]/g,'');
  function render(){const q=norm(inp.value.trim());const L=GL_T.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GL_T.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const SO_AREAN={A:'Epidemiology, presentation, burden & history',B:'Causes: genetics, family risk & environment',C:'Mechanisms: circadian rhythm, brain networks & how lithium works',D:'Diagnosis: DSM-5-TR & ICD-11, types & specifiers, screening and differential',E:'Lithium: evidence, pharmacokinetics, monitoring, toxicity & interactions',F:'Other medicines: anticonvulsants, antipsychotics, antidepressants, ECT & guidelines',G:'Psychological care, suicide safety, living well, families & nursing',H:'Course, comorbidity, pregnancy & special groups, and research toward better treatment'};
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
