<script>
(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('bpd:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('bpd:'+k,JSON.stringify(v))}catch(e){}}};
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
   moodF(o)                  an emotion-intensity curve as a function u (0..1 of the timeline) -> 0..1.
                             o: {t0 (trigger time, .1), base (resting level, .14), peak (0..1, .9), rise (time
                             constant of the climb, .02), fall (time constant of the return, .4)}. A small rise
                             and a large fall give the "fast up, slow down" shape of the biosocial model's
                             sensitivity / reactivity / slow return. Returns f with f.peakAt (u of the maximum).
   wave(x,y,w,h,f,o)         plot f over [0,1] in the box (x,y,w,h); y grows downward, so 1 is the top edge.
                             o: {upto (draw the curve only to this u; default 1), col (CSS colour, var(--mood)),
                             fill (true: soft area under the curve), thr (0..1: a dashed threshold line), thrLabel,
                             base (true: dotted baseline at f(0)), dot (true: a dot at upto), dash (dashed curve)}.
                             Returns {svg, at(u)->[x,y]}.
   thermo(x,y,h,v,o)         a vertical emotion thermometer, bulb at the bottom (x, y+h); v 0..1 fills it and
                             shifts the colour from --calm to --storm. o: {w (tube width, 12), ticks (true), label}.
   brain(x,y,s,o)            a side-view brain, front to the LEFT, centred on (x,y); s = scale (1 = 160 wide,
                             about 120 tall with the brainstem). o: {hl:{pfc,acc,insula,amyg,hippo: 0..1 glow},
                             labels (true: region names with leader lines), compact}. Returns {svg, at:{pfc,acc,
                             insula,amyg,hippo: [x,y]}} so arrows can be drawn between regions.
   synapse(x,y,s,o)          a synapse: presynaptic bouton above, the cleft, a postsynaptic membrane with
                             receptors below. o: {n (0..1 transmitter released), tx (CSS colour of the
                             transmitter dots, var(--nt)), label (text under it), block (0..1 receptors blocked),
                             seed}.
   person(x,y,s,fill,o)      a person pictogram for icon arrays (s = height), fill a CSS colour; o.op opacity.
   bond(x1,y1,x2,y2,o)       a relationship line between two people: o.k (0..1 thickness and opacity), o.rupture
                             (0..1 opens a gap in the middle, with jagged ends), o.col (var(--bond)), o.curve (bow).
   bubble(x,y,w,h,o)         a speech bubble (or a thought bubble with o.think) with its tail toward (o.tx,o.ty);
                             o.lines: text lines centred inside; o.col border colour; o.fill.
   ladder(x,y,w,h,steps,o)   rising stairs from bottom-left, one step per label in steps (a treatment ladder,
                             stepped care, a safety plan). o: {at (index highlighted), col, done (steps before at
                             drawn as done)}. Returns {svg, top(i)->[x,y] the centre of step i's tread}.
   pill(x,y,s,o)             a capsule centred at (x,y), s = length; o: {ang (degrees), cross (true: a struck-
                             through "not approved" mark), col}.
   tline(x,y,w,o)            a horizontal time axis: o {min, max, step, fmt(v)->label, label (axis title), big
                             (ticks above)}. Returns {svg, X(v)->x}.
   ped(x,y,sex,aff,o)        a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected,
                             .5 traits only (half shaded); o: {dead, proband, r}. For a twin pair, draw both
                             symbols' lines from one point on the sibship line (a bar between them for MZ).
                             Needs marker('pedArrow') in the svg's <defs> when proband is used.
   marker(id,color)          an arrowhead <marker> for <defs>. */
function moodF(o={}){const t0=o.t0==null?.1:o.t0,b=o.base==null?.14:o.base,pk=o.peak==null?.9:o.peak,r=o.rise||.02,fa=o.fall||.4;
  const g=u=>{const d=u-t0;return d<=0?0:(1-Math.exp(-d/r))*Math.exp(-d/fa)};
  let mx=0,mu=t0;for(let i=0;i<=400;i++){const u=i/400,v=g(u);if(v>mx){mx=v;mu=u}}
  const f=u=>b+(pk-b)*(mx?g(u)/mx:0);f.peakAt=mu;f.t0=t0;return f}
function wave(x,y,w,h,f,o={}){const up=o.upto==null?1:clamp(o.upto),col=o.col||'var(--mood)';
  const at=u=>[x+w*u,y+h*(1-clamp(f(u),-.05,1.05))];let s='';
  if(o.base){const b=at(0)[1];s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(b)}" y2="${f1(b)}" style="stroke:var(--calm);stroke-width:1.2;stroke-dasharray:1 4;stroke-linecap:round"/>`}
  if(o.thr!=null){const ty=y+h*(1-o.thr);s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--storm);stroke-width:1;stroke-dasharray:5 4;opacity:.7"/>`;
    if(o.thrLabel)s+=`<text x="${f1(x+w-4)}" y="${f1(ty-5)}" class="t-xs t-end" style="fill:var(--storm)">${o.thrLabel}</text>`}
  if(up>0){const N=Math.max(2,Math.round(140*up));let d='';for(let i=0;i<=N;i++){const p=at(up*i/N);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    if(o.fill)s+=`<path d="${d}L${f1(x+w*up)} ${f1(y+h)}L${f1(x)} ${f1(y+h)}Z" style="fill:${col};opacity:.12"/>`;
    s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round${o.dash?';stroke-dasharray:6 5':''}"/>`;
    if(o.dot){const p=at(up);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`}}
  return {svg:s,at}}
function thermo(x,y,h,v,o={}){const w=o.w||12,k=clamp(v),br=w*.95,top=y,bot=y+h;
  const col=k<.45?'var(--calm)':k<.72?'var(--mood)':'var(--storm)';
  let s=`<rect x="${f1(x-w/2)}" y="${f1(top)}" width="${w}" height="${f1(h)}" rx="${f1(w/2)}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.2"/>`;
  s+=`<circle cx="${f1(x)}" cy="${f1(bot)}" r="${f1(br)}" style="fill:${col};stroke:var(--line);stroke-width:1.2"/>`;
  const fh=(h-w*.5)*k;s+=`<rect x="${f1(x-w*.3)}" y="${f1(bot-fh-2)}" width="${f1(w*.6)}" height="${f1(fh+2)}" rx="${f1(w*.3)}" style="fill:${col}"/>`;
  if(o.ticks!==false)for(let i=1;i<5;i++){const ty=bot-(h-w*.5)*i/5;s+=`<line x1="${f1(x+w/2+2)}" x2="${f1(x+w/2+6)}" y1="${f1(ty)}" y2="${f1(ty)}" class="axis"/>`}
  if(o.label)s+=`<text x="${f1(x)}" y="${f1(bot+br+14)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function brain(x,y,s=1,o={}){const hl=o.hl||{},P=(a,b)=>[x+a*s,y+b*s];
  const A={pfc:P(-50,-16),acc:P(-16,-14),insula:P(-6,6),amyg:P(-14,22),hippo:P(8,24)};
  const COL={pfc:'var(--pfc)',acc:'var(--pfc)',insula:'var(--mood)',amyg:'var(--amyg)',hippo:'var(--hpa)'};
  const NM={pfc:'Prefrontal cortex',acc:'Anterior cingulate',insula:'Insula',amyg:'Amygdala',hippo:'Hippocampus'};
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M22 34C26 44 26 54 30 62L40 62C36 52 36 42 34 32Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${f1(1.4/s)}"/>`;
  g+=`<ellipse cx="50" cy="36" rx="20" ry="12" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${f1(1.4/s)}"/>`;
  g+=`<path d="M-72 6C-80 -20 -62 -48 -30 -54C-8 -60 20 -58 42 -48C66 -38 80 -16 76 6C74 22 62 30 48 30C40 40 24 42 14 36C2 44 -20 44 -32 36C-50 38 -68 28 -72 6Z" style="fill:var(--brain);stroke:var(--brain-line);stroke-width:${f1(1.6/s)}"/>`;
  /* a few gyri */
  ['M-58 -24C-46 -34 -34 -30 -26 -40','M-20 -44C-6 -36 6 -46 20 -40','M28 -36C40 -26 54 -32 62 -18','M-62 4C-50 -4 -40 6 -30 -2','M40 -10C50 0 62 -6 70 6','M-4 -22C8 -14 20 -24 32 -14'].forEach(d=>{g+=`<path d="${d}" style="fill:none;stroke:var(--brain-line);stroke-width:${f1(1.1/s)};opacity:.55;stroke-linecap:round"/>`});
  g+='</g>';
  for(const k of Object.keys(A)){const v=clamp(hl[k]||0),[cx,cy]=A[k],r=(k==='pfc'?17:k==='amyg'?8:10)*s;
    if(v>0)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*(1+v*.8))}" style="fill:${COL[k]};opacity:${f1(.1+v*.25)}"/>`;
    if(v>0||o.labels)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.55)}" style="fill:${COL[k]};opacity:${f1(.35+v*.6)}"/>`}
  if(o.labels){const L={pfc:[-1,-1],acc:[0,-1],insula:[1,-1],amyg:[-1,1],hippo:[1,1]};
    for(const k of Object.keys(A)){const [cx,cy]=A[k],[dx,dy]=L[k],lx=cx+dx*28*s+(dx===0?0:0),ly=dy<0?y-66*s+(k==='insula'?14*s:0):y+60*s+(k==='hippo'?12*s:0);
      g+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(lx)}" y2="${f1(ly+(dy<0?4:-10))}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly)}" class="t-xs t-mid">${NM[k]}</text>`}}
  return {svg:g,at:A}}
function synapse(x,y,s=1,o={}){const rr=rng(o.seed||11),n=clamp(o.n==null?.5:o.n),tx=o.tx||'var(--nt)',bl=clamp(o.block||0);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M-34 -60V-26C-34 -8 -20 0 0 0S34 -8 34 -26V-60" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<5;i++){const vx=-18+i*9,vy=-26+(i%2)*8;g+=`<circle cx="${vx}" cy="${vy}" r="5" style="fill:none;stroke:${tx};stroke-width:1.2"/><circle cx="${vx}" cy="${vy}" r="2" style="fill:${tx}"/>`}
  g+=`<path d="M-44 14Q0 6 44 14V30H-44Z" style="fill:var(--cell);stroke:var(--brain-line);stroke-width:1.6"/>`;
  for(let i=0;i<5;i++){const rx=-28+i*14;g+=`<path d="M${rx-4} 13V8M${rx+4} 13V8" style="stroke:${i/5<bl?'var(--muted)':'var(--accent)'};stroke-width:2.4;stroke-linecap:round"/>`;if(i/5<bl)g+=`<rect x="${rx-5}" y="3" width="10" height="5" rx="2" style="fill:var(--muted)"/>`}
  const k=Math.round(n*14);for(let i=0;i<k;i++){const px=(rr()-.5)*52,py=-1+rr()*8;g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="1.9" style="fill:${tx}"/>`}
  if(o.label)g+=`<text x="0" y="46" class="t-xs t-mid">${o.label}</text>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function bond(x1,y1,x2,y2,o={}){const k=o.k==null?.7:clamp(o.k),ru=clamp(o.rupture||0),col=o.col||'var(--bond)',bw=o.curve||0;
  const mx=(x1+x2)/2,my=(y1+y2)/2-bw,sw=1.2+k*3.4,op=.35+k*.6;
  if(ru<=0)return `<path d="M${f1(x1)} ${f1(y1)}Q${f1(mx)} ${f1(my)} ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${col};stroke-width:${f1(sw)};opacity:${f1(op)};stroke-linecap:round"/>`;
  const q=(t)=>[(1-t)*(1-t)*x1+2*(1-t)*t*mx+t*t*x2,(1-t)*(1-t)*y1+2*(1-t)*t*my+t*t*y2],g1=.5-ru*.22,g2=.5+ru*.22;
  let d1='',d2='';for(let i=0;i<=20;i++){const a=q(g1*i/20),b=q(g2+(1-g2)*i/20);d1+=(i?'L':'M')+f1(a[0])+' '+f1(a[1]);d2+=(i?'L':'M')+f1(b[0])+' '+f1(b[1])}
  const e1=q(g1),e2=q(g2);
  return `<path d="${d1}" style="fill:none;stroke:${col};stroke-width:${f1(sw)};opacity:${f1(op)};stroke-linecap:round"/><path d="${d2}" style="fill:none;stroke:${col};stroke-width:${f1(sw)};opacity:${f1(op)};stroke-linecap:round"/>`+
    `<path d="M${f1(e1[0])} ${f1(e1[1]-5)}l3 3l-3 3l3 3" style="fill:none;stroke:${col};stroke-width:1.4"/><path d="M${f1(e2[0])} ${f1(e2[1]-5)}l-3 3l3 3l-3 3" style="fill:none;stroke:${col};stroke-width:1.4"/>`}
function bubble(x,y,w,h,o={}){const col=o.col||'var(--line)',fill=o.fill||'var(--panel)',tx=o.tx==null?x+w*.25:o.tx,ty=o.ty==null?y+h+16:o.ty;let s='';
  if(o.think){s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h/2,18))}" style="fill:${fill};stroke:${col};stroke-width:1.4"/>`;
    const bx=x+w*.3,by=y+h;[[.35,5],[.7,3.4]].forEach(([k,r])=>{s+=`<circle cx="${f1(lerp(bx,tx,k))}" cy="${f1(lerp(by,ty,k))}" r="${r}" style="fill:${fill};stroke:${col};stroke-width:1.2"/>`})}
  else{const bx=clamp(tx,x+12,x+w-12),side=ty>y+h?1:-1,ey=side>0?y+h:y;
    s+=`<path d="M${f1(x+10)} ${f1(y)}H${f1(x+w-10)}Q${f1(x+w)} ${f1(y)} ${f1(x+w)} ${f1(y+10)}V${f1(y+h-10)}Q${f1(x+w)} ${f1(y+h)} ${f1(x+w-10)} ${f1(y+h)}`+
      (side>0?`H${f1(bx+7)}L${f1(tx)} ${f1(ty)}L${f1(bx-7)} ${f1(ey)}`:'')+`H${f1(x+10)}Q${f1(x)} ${f1(y+h)} ${f1(x)} ${f1(y+h-10)}V${f1(y+10)}Q${f1(x)} ${f1(y)} ${f1(x+10)} ${f1(y)}Z" style="fill:${fill};stroke:${col};stroke-width:1.4;stroke-linejoin:round"/>`}
  const L=o.lines||[];L.forEach((t,i)=>{s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+(i-(L.length-1)/2)*15+4)}" class="t-sm t-mid" style="fill:var(--ink)">${t}</text>`});
  return s}
function ladder(x,y,w,h,steps,o={}){const n=steps.length,sw=w/n,sh=h/n,at=o.at==null?-1:o.at,col=o.col||'var(--accent)';let s='';
  const top=i=>[x+sw*(i+.5),y+h-sh*(i+1)];
  steps.forEach((t,i)=>{const sx=x+sw*i,sy=y+h-sh*(i+1),on=i===at,done=o.done&&i<at;
    s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(sw-3)}" height="${f1(sh*(i+1))}" rx="6" style="fill:${on?col:done?'var(--accent-soft)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1.2;opacity:${on||done?1:.9}"/>`;
    s+=`<text x="${f1(sx+(sw-3)/2)}" y="${f1(sy+16)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${t}</text>`});
  return {svg:s,top}}
function pill(x,y,s=30,o={}){const col=o.col||'var(--med)',r=s*.2;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  g+='</g>';if(o.cross)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.62)}" style="fill:none;stroke:var(--bad);stroke-width:2"/><line x1="${f1(x-s*.44)}" y1="${f1(y+s*.44)}" x2="${f1(x+s*.44)}" y2="${f1(y-s*.44)}" style="stroke:var(--bad);stroke-width:2"/>`;
  return g}
function tline(x,y,w,o={}){const mn=o.min||0,mx=o.max==null?1:o.max,st=o.step||(mx-mn)/5,fmt=o.fmt||(v=>v),X=v=>x+w*(v-mn)/(mx-mn);
  let s=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" class="axis"/>`;
  for(let v=mn;v<=mx+1e-9;v+=st){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y-4)}" y2="${f1(y+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(o.big?y-8:y+16)}" class="t-xs t-mid">${fmt(v)}</text>`}
  if(o.label)s+=`<text x="${f1(x+w)}" y="${f1(o.big?y+16:y+30)}" class="t-xs t-end">${o.label}</text>`;
  return {svg:s,X}}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--storm)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--mood);stroke:none;opacity:.7"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What BPD is',g:1,n:'1.1',d:'Who it affects, how common it is, and the language we use'},
 {id:'emotion',t:'The emotion wave',g:1,n:'1.2',d:'Sensitivity, intensity and a slow return to baseline'},
 {id:'causes',t:'Causes & the biosocial model',g:1,n:'1.3',d:'Temperament, adversity, invalidation and how they interact'},
 {id:'genes',t:'Genes & families',g:1,n:'1.4',d:'Twin studies, heritability and what runs in families'},
 {id:'brain',t:'Brain & stress systems',g:1,n:'1.5',d:'Amygdala, prefrontal control, stress hormones, mentalizing'},
 {id:'criteria',t:'DSM-5-TR criteria',g:2,n:'2.1',d:'The nine criteria, five needed: a teaching counter'},
 {id:'icd',t:'ICD-11 & dimensional models',g:2,n:'2.2',d:'Severity first, the borderline pattern, and the AMPD'},
 {id:'assess',t:'Assessment & interviews',g:2,n:'2.3',d:'Screening questionnaires, structured interviews, disclosure'},
 {id:'differential',t:'BPD or something else?',g:2,n:'2.4',d:'Bipolar disorder, complex PTSD, ADHD, depression'},
 {id:'dbt',t:'Dialectical behaviour therapy',g:3,n:'3.1',d:'The four skills modules, the hierarchy and the trials'},
 {id:'mbt',t:'Mentalization-based treatment',g:3,n:'3.2',d:'Thinking about minds under stress, and the evidence'},
 {id:'schema',t:'Schema therapy & TFP',g:3,n:'3.3',d:'Modes, schemas and transference-focused psychotherapy'},
 {id:'gpm',t:'Good psychiatric management',g:3,n:'3.4',d:'A generalist approach and stepped care'},
 {id:'compare',t:'Therapies compared',g:3,n:'3.5',d:'What the meta-analyses show, side by side'},
 {id:'meds',t:'Medication: the evidence',g:4,n:'4.1',d:'No approved drug for BPD itself; what trials show'},
 {id:'crisis',t:'Suicide & self-harm safety',g:4,n:'4.2',d:'Risk, safety planning, crisis care and help-seeking'},
 {id:'frontier',t:'Research toward better care',g:4,n:'4.3',d:'New targets and trials, with evidence labels'},
 {id:'course',t:'Course & recovery',g:5,n:'5.1',d:'Remission is common; recovery takes longer'},
 {id:'families',t:'Families & carers',g:5,n:'5.2',d:'Validation, family programmes and carer wellbeing'},
 {id:'living',t:'Living with BPD',g:5,n:'5.3',d:'Relationships, work, study, parenting and stigma'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.4',d:'Therapeutic relationship, crisis care and boundaries'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Stern’s “border line” to DBT and recovery research'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['Understanding BPD','g-mind','c-mind'],2:['Diagnosis','g-dx','c-dx'],3:['Psychotherapies','g-rx','c-rx'],4:['Medication, safety & research','g-safe','c-safe'],5:['Course & living','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('bpd:tab');sessionStorage.setItem('bpd:tab','1')}catch(e){}
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
